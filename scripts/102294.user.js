// ==UserScript==
// @name           hungya fixer
// @namespace      hungya_fixer_ChowMein
// @description    hungya fixer
// @updateURL      https://userscripts.org/scripts/source/102294.meta.js
// @include        http://*bbs-tw.com/cgi-bin/bbs/postlist.pl*
// @include        http://*bbs-tw.com/cgi-bin/bbs/search.pl*
// @include        http://*bbs-tw.com/cgi-bin/bbs/postshow.pl*
// @include        http://*hung-ya.com/cgi-bin/bbs/postlist.pl*
// @include        http://*hung-ya.com/cgi-bin/bbs/search.pl*
// @include        http://*hung-ya.com/cgi-bin/bbs/postshow.pl*
// @history        "<p></p>"
// @version        1.3.1.20140329
// ==/UserScript==

/*!
 * jQuery JavaScript Library v1.5.2
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
 * Date: Thu Mar 31 15:28:23 2011 -0400
 */
(function(a,b){function ci(a){return d.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cf(a){if(!b_[a]){var b=d("<"+a+">").appendTo("body"),c=b.css("display");b.remove();if(c==="none"||c==="")c="block";b_[a]=c}return b_[a]}function ce(a,b){var c={};d.each(cd.concat.apply([],cd.slice(0,b)),function(){c[this]=a});return c}function b$(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function bZ(){try{return new a.XMLHttpRequest}catch(b){}}function bY(){d(a).unload(function(){for(var a in bW)bW[a](0,1)})}function bS(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var e=a.dataTypes,f={},g,h,i=e.length,j,k=e[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h==="string"&&(f[h.toLowerCase()]=a.converters[h]);l=k,k=e[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=f[m]||f["* "+k];if(!n){p=b;for(o in f){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=f[j[1]+" "+k];if(p){o=f[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&d.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bR(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bQ(a,b,c,e){if(d.isArray(b)&&b.length)d.each(b,function(b,f){c||bs.test(a)?e(a,f):bQ(a+"["+(typeof f==="object"||d.isArray(f)?b:"")+"]",f,c,e)});else if(c||b==null||typeof b!=="object")e(a,b);else if(d.isArray(b)||d.isEmptyObject(b))e(a,"");else for(var f in b)bQ(a+"["+f+"]",b[f],c,e)}function bP(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bJ,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l==="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bP(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bP(a,c,d,e,"*",g));return l}function bO(a){return function(b,c){typeof b!=="string"&&(c=b,b="*");if(d.isFunction(c)){var e=b.toLowerCase().split(bD),f=0,g=e.length,h,i,j;for(;f<g;f++)h=e[f],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bq(a,b,c){var e=b==="width"?bk:bl,f=b==="width"?a.offsetWidth:a.offsetHeight;if(c==="border")return f;d.each(e,function(){c||(f-=parseFloat(d.css(a,"padding"+this))||0),c==="margin"?f+=parseFloat(d.css(a,"margin"+this))||0:f-=parseFloat(d.css(a,"border"+this+"Width"))||0});return f}function bc(a,b){b.src?d.ajax({url:b.src,async:!1,dataType:"script"}):d.globalEval(b.text||b.textContent||b.innerHTML||""),b.parentNode&&b.parentNode.removeChild(b)}function bb(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function ba(a,b){if(b.nodeType===1){var c=b.nodeName.toLowerCase();b.clearAttributes(),b.mergeAttributes(a);if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(d.expando)}}function _(a,b){if(b.nodeType===1&&d.hasData(a)){var c=d.expando,e=d.data(a),f=d.data(b,e);if(e=e[c]){var g=e.events;f=f[c]=d.extend({},e);if(g){delete f.handle,f.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)d.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function $(a,b){return d.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function Q(a,b,c){if(d.isFunction(b))return d.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return d.grep(a,function(a,d){return a===b===c});if(typeof b==="string"){var e=d.grep(a,function(a){return a.nodeType===1});if(L.test(b))return d.filter(b,e,!c);b=d.filter(b,e)}return d.grep(a,function(a,e){return d.inArray(a,b)>=0===c})}function P(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function H(a,b){return(a&&a!=="*"?a+".":"")+b.replace(t,"`").replace(u,"&")}function G(a){var b,c,e,f,g,h,i,j,k,l,m,n,o,p=[],q=[],s=d._data(this,"events");if(a.liveFired!==this&&s&&s.live&&!a.target.disabled&&(!a.button||a.type!=="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var t=s.live.slice(0);for(i=0;i<t.length;i++)g=t[i],g.origType.replace(r,"")===a.type?q.push(g.selector):t.splice(i--,1);f=d(a.target).closest(q,a.currentTarget);for(j=0,k=f.length;j<k;j++){m=f[j];for(i=0;i<t.length;i++){g=t[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,e=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,e=d(a.relatedTarget).closest(g.selector)[0];(!e||e!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){f=p[j];if(c&&f.level>c)break;a.currentTarget=f.elem,a.data=f.handleObj.data,a.handleObj=f.handleObj,o=f.handleObj.origHandler.apply(f.elem,arguments);if(o===!1||a.isPropagationStopped()){c=f.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function E(a,c,e){var f=d.extend({},e[0]);f.type=a,f.originalEvent={},f.liveFired=b,d.event.handle.call(c,f),f.isDefaultPrevented()&&e[0].preventDefault()}function y(){return!0}function x(){return!1}function i(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function h(a,c,e){if(e===b&&a.nodeType===1){e=a.getAttribute("data-"+c);if(typeof e==="string"){try{e=e==="true"?!0:e==="false"?!1:e==="null"?null:d.isNaN(e)?g.test(e)?d.parseJSON(e):e:parseFloat(e)}catch(f){}d.data(a,c,e)}else e=b}return e}var c=a.document,d=function(){function G(){if(!d.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(G,1);return}d.ready()}}var d=function(a,b){return new d.fn.init(a,b,g)},e=a.jQuery,f=a.$,g,h=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,i=/\S/,j=/^\s+/,k=/\s+$/,l=/\d/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=navigator.userAgent,w,x,y,z=Object.prototype.toString,A=Object.prototype.hasOwnProperty,B=Array.prototype.push,C=Array.prototype.slice,D=String.prototype.trim,E=Array.prototype.indexOf,F={};d.fn=d.prototype={constructor:d,init:function(a,e,f){var g,i,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!e&&c.body){this.context=c,this[0]=c.body,this.selector="body",this.length=1;return this}if(typeof a==="string"){g=h.exec(a);if(!g||!g[1]&&e)return!e||e.jquery?(e||f).find(a):this.constructor(e).find(a);if(g[1]){e=e instanceof d?e[0]:e,k=e?e.ownerDocument||e:c,j=m.exec(a),j?d.isPlainObject(e)?(a=[c.createElement(j[1])],d.fn.attr.call(a,e,!0)):a=[k.createElement(j[1])]:(j=d.buildFragment([g[1]],[k]),a=(j.cacheable?d.clone(j.fragment):j.fragment).childNodes);return d.merge(this,a)}i=c.getElementById(g[2]);if(i&&i.parentNode){if(i.id!==g[2])return f.find(a);this.length=1,this[0]=i}this.context=c,this.selector=a;return this}if(d.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return d.makeArray(a,this)},selector:"",jquery:"1.5.2",length:0,size:function(){return this.length},toArray:function(){return C.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var e=this.constructor();d.isArray(a)?B.apply(e,a):d.merge(e,a),e.prevObject=this,e.context=this.context,b==="find"?e.selector=this.selector+(this.selector?" ":"")+c:b&&(e.selector=this.selector+"."+b+"("+c+")");return e},each:function(a,b){return d.each(this,a,b)},ready:function(a){d.bindReady(),x.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(C.apply(this,arguments),"slice",C.call(arguments).join(","))},map:function(a){return this.pushStack(d.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:B,sort:[].sort,splice:[].splice},d.fn.init.prototype=d.fn,d.extend=d.fn.extend=function(){var a,c,e,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i==="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!=="object"&&!d.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){e=i[c],f=a[c];if(i===f)continue;l&&f&&(d.isPlainObject(f)||(g=d.isArray(f)))?(g?(g=!1,h=e&&d.isArray(e)?e:[]):h=e&&d.isPlainObject(e)?e:{},i[c]=d.extend(l,h,f)):f!==b&&(i[c]=f)}return i},d.extend({noConflict:function(b){a.$=f,b&&(a.jQuery=e);return d},isReady:!1,readyWait:1,ready:function(a){a===!0&&d.readyWait--;if(!d.readyWait||a!==!0&&!d.isReady){if(!c.body)return setTimeout(d.ready,1);d.isReady=!0;if(a!==!0&&--d.readyWait>0)return;x.resolveWith(c,[d]),d.fn.trigger&&d(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!x){x=d._Deferred();if(c.readyState==="complete")return setTimeout(d.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",y,!1),a.addEventListener("load",d.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",y),a.attachEvent("onload",d.ready);var b=!1;try{b=a.frameElement==null}catch(e){}c.documentElement.doScroll&&b&&G()}}},isFunction:function(a){return d.type(a)==="function"},isArray:Array.isArray||function(a){return d.type(a)==="array"},isWindow:function(a){return a&&typeof a==="object"&&"setInterval"in a},isNaN:function(a){return a==null||!l.test(a)||isNaN(a)},type:function(a){return a==null?String(a):F[z.call(a)]||"object"},isPlainObject:function(a){if(!a||d.type(a)!=="object"||a.nodeType||d.isWindow(a))return!1;if(a.constructor&&!A.call(a,"constructor")&&!A.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a){}return c===b||A.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!=="string"||!b)return null;b=d.trim(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return a.JSON&&a.JSON.parse?a.JSON.parse(b):(new Function("return "+b))();d.error("Invalid JSON: "+b)},parseXML:function(b,c,e){a.DOMParser?(e=new DOMParser,c=e.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),e=c.documentElement,(!e||!e.nodeName||e.nodeName==="parsererror")&&d.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(a){if(a&&i.test(a)){var b=c.head||c.getElementsByTagName("head")[0]||c.documentElement,e=c.createElement("script");d.support.scriptEval()?e.appendChild(c.createTextNode(a)):e.text=a,b.insertBefore(e,b.firstChild),b.removeChild(e)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,e){var f,g=0,h=a.length,i=h===b||d.isFunction(a);if(e){if(i){for(f in a)if(c.apply(a[f],e)===!1)break}else for(;g<h;)if(c.apply(a[g++],e)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(var j=a[0];g<h&&c.call(j,g,j)!==!1;j=a[++g]){}return a},trim:D?function(a){return a==null?"":D.call(a)}:function(a){return a==null?"":(a+"").replace(j,"").replace(k,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var e=d.type(a);a.length==null||e==="string"||e==="function"||e==="regexp"||d.isWindow(a)?B.call(c,a):d.merge(c,a)}return c},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length==="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,b,c){var d=[],e;for(var f=0,g=a.length;f<g;f++)e=b(a[f],f,c),e!=null&&(d[d.length]=e);return d.concat.apply([],d)},guid:1,proxy:function(a,c,e){arguments.length===2&&(typeof c==="string"?(e=a,a=e[c],c=b):c&&!d.isFunction(c)&&(e=c,c=b)),!c&&a&&(c=function(){return a.apply(e||this,arguments)}),a&&(c.guid=a.guid=a.guid||c.guid||d.guid++);return c},access:function(a,c,e,f,g,h){var i=a.length;if(typeof c==="object"){for(var j in c)d.access(a,j,c[j],f,g,e);return a}if(e!==b){f=!h&&f&&d.isFunction(e);for(var k=0;k<i;k++)g(a[k],c,f?e.call(a[k],k,g(a[k],c)):e,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}d.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.subclass=this.subclass,a.fn.init=function b(b,c){c&&c instanceof d&&!(c instanceof a)&&(c=a(c));return d.fn.init.call(this,b,c,e)},a.fn.init.prototype=a.fn;var e=a(c);return a},browser:{}}),d.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){F["[object "+b+"]"]=b.toLowerCase()}),w=d.uaMatch(v),w.browser&&(d.browser[w.browser]=!0,d.browser.version=w.version),d.browser.webkit&&(d.browser.safari=!0),E&&(d.inArray=function(a,b){return E.call(b,a)}),i.test(" ")&&(j=/^[\s\xA0]+/,k=/[\s\xA0]+$/),g=d(c),c.addEventListener?y=function(){c.removeEventListener("DOMContentLoaded",y,!1),d.ready()}:c.attachEvent&&(y=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",y),d.ready())});return d}(),e="then done fail isResolved isRejected promise".split(" "),f=[].slice;d.extend({_Deferred:function(){var a=[],b,c,e,f={done:function(){if(!e){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=d.type(i),j==="array"?f.done.apply(f,i):j==="function"&&a.push(i);k&&f.resolveWith(k[0],k[1])}return this},resolveWith:function(d,f){if(!e&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(d,f)}finally{b=[d,f],c=0}}return this},resolve:function(){f.resolveWith(this,arguments);return this},isResolved:function(){return c||b},cancel:function(){e=1,a=[];return this}};return f},Deferred:function(a){var b=d._Deferred(),c=d._Deferred(),f;d.extend(b,{then:function(a,c){b.done(a).fail(c);return this},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,promise:function(a){if(a==null){if(f)return f;f=a={}}var c=e.length;while(c--)a[e[c]]=b[e[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?f.call(arguments,0):c,--g||h.resolveWith(h,f.call(b,0))}}var b=arguments,c=0,e=b.length,g=e,h=e<=1&&a&&d.isFunction(a.promise)?a:d.Deferred();if(e>1){for(;c<e;c++)b[c]&&d.isFunction(b[c].promise)?b[c].promise().then(i(c),h.reject):--g;g||h.resolveWith(h,b)}else h!==a&&h.resolveWith(h,e?[a]:[]);return h.promise()}}),function(){d.support={};var b=c.createElement("div");b.style.display="none",b.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var e=b.getElementsByTagName("*"),f=b.getElementsByTagName("a")[0],g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=b.getElementsByTagName("input")[0];if(e&&e.length&&f){d.support={leadingWhitespace:b.firstChild.nodeType===3,tbody:!b.getElementsByTagName("tbody").length,htmlSerialize:!!b.getElementsByTagName("link").length,style:/red/.test(f.getAttribute("style")),hrefNormalized:f.getAttribute("href")==="/a",opacity:/^0.55$/.test(f.style.opacity),cssFloat:!!f.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,deleteExpando:!0,optDisabled:!1,checkClone:!1,noCloneEvent:!0,noCloneChecked:!0,boxModel:null,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableHiddenOffsets:!0,reliableMarginRight:!0},i.checked=!0,d.support.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,d.support.optDisabled=!h.disabled;var j=null;d.support.scriptEval=function(){if(j===null){var b=c.documentElement,e=c.createElement("script"),f="script"+d.now();try{e.appendChild(c.createTextNode("window."+f+"=1;"))}catch(g){}b.insertBefore(e,b.firstChild),a[f]?(j=!0,delete a[f]):j=!1,b.removeChild(e)}return j};try{delete b.test}catch(k){d.support.deleteExpando=!1}!b.addEventListener&&b.attachEvent&&b.fireEvent&&(b.attachEvent("onclick",function l(){d.support.noCloneEvent=!1,b.detachEvent("onclick",l)}),b.cloneNode(!0).fireEvent("onclick")),b=c.createElement("div"),b.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";var m=c.createDocumentFragment();m.appendChild(b.firstChild),d.support.checkClone=m.cloneNode(!0).cloneNode(!0).lastChild.checked,d(function(){var a=c.createElement("div"),b=c.getElementsByTagName("body")[0];if(b){a.style.width=a.style.paddingLeft="1px",b.appendChild(a),d.boxModel=d.support.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,d.support.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",d.support.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";var e=a.getElementsByTagName("td");d.support.reliableHiddenOffsets=e[0].offsetHeight===0,e[0].style.display="",e[1].style.display="none",d.support.reliableHiddenOffsets=d.support.reliableHiddenOffsets&&e[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(a.style.width="1px",a.style.marginRight="0",d.support.reliableMarginRight=(parseInt(c.defaultView.getComputedStyle(a,null).marginRight,10)||0)===0),b.removeChild(a).style.display="none",a=e=null}});var n=function(a){var b=c.createElement("div");a="on"+a;if(!b.attachEvent)return!0;var d=a in b;d||(b.setAttribute(a,"return;"),d=typeof b[a]==="function");return d};d.support.submitBubbles=n("submit"),d.support.changeBubbles=n("change"),b=e=f=null}}();var g=/^(?:\{.*\}|\[.*\])$/;d.extend({cache:{},uuid:0,expando:"jQuery"+(d.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?d.cache[a[d.expando]]:a[d.expando];return!!a&&!i(a)},data:function(a,c,e,f){if(d.acceptData(a)){var g=d.expando,h=typeof c==="string",i,j=a.nodeType,k=j?d.cache:a,l=j?a[d.expando]:a[d.expando]&&d.expando;if((!l||f&&l&&!k[l][g])&&h&&e===b)return;l||(j?a[d.expando]=l=++d.uuid:l=d.expando),k[l]||(k[l]={},j||(k[l].toJSON=d.noop));if(typeof c==="object"||typeof c==="function")f?k[l][g]=d.extend(k[l][g],c):k[l]=d.extend(k[l],c);i=k[l],f&&(i[g]||(i[g]={}),i=i[g]),e!==b&&(i[c]=e);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[c]:i}},removeData:function(b,c,e){if(d.acceptData(b)){var f=d.expando,g=b.nodeType,h=g?d.cache:b,j=g?b[d.expando]:d.expando;if(!h[j])return;if(c){var k=e?h[j][f]:h[j];if(k){delete k[c];if(!i(k))return}}if(e){delete h[j][f];if(!i(h[j]))return}var l=h[j][f];d.support.deleteExpando||h!=a?delete h[j]:h[j]=null,l?(h[j]={},g||(h[j].toJSON=d.noop),h[j][f]=l):g&&(d.support.deleteExpando?delete b[d.expando]:b.removeAttribute?b.removeAttribute(d.expando):b[d.expando]=null)}},_data:function(a,b,c){return d.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=d.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),d.fn.extend({data:function(a,c){var e=null;if(typeof a==="undefined"){if(this.length){e=d.data(this[0]);if(this[0].nodeType===1){var f=this[0].attributes,g;for(var i=0,j=f.length;i<j;i++)g=f[i].name,g.indexOf("data-")===0&&(g=g.substr(5),h(this[0],g,e[g]))}}return e}if(typeof a==="object")return this.each(function(){d.data(this,a)});var k=a.split(".");k[1]=k[1]?"."+k[1]:"";if(c===b){e=this.triggerHandler("getData"+k[1]+"!",[k[0]]),e===b&&this.length&&(e=d.data(this[0],a),e=h(this[0],a,e));return e===b&&k[1]?this.data(k[0]):e}return this.each(function(){var b=d(this),e=[k[0],c];b.triggerHandler("setData"+k[1]+"!",e),d.data(this,a,c),b.triggerHandler("changeData"+k[1]+"!",e)})},removeData:function(a){return this.each(function(){d.removeData(this,a)})}}),d.extend({queue:function(a,b,c){if(a){b=(b||"fx")+"queue";var e=d._data(a,b);if(!c)return e||[];!e||d.isArray(c)?e=d._data(a,b,d.makeArray(c)):e.push(c);return e}},dequeue:function(a,b){b=b||"fx";var c=d.queue(a,b),e=c.shift();e==="inprogress"&&(e=c.shift()),e&&(b==="fx"&&c.unshift("inprogress"),e.call(a,function(){d.dequeue(a,b)})),c.length||d.removeData(a,b+"queue",!0)}}),d.fn.extend({queue:function(a,c){typeof a!=="string"&&(c=a,a="fx");if(c===b)return d.queue(this[0],a);return this.each(function(b){var e=d.queue(this,a,c);a==="fx"&&e[0]!=="inprogress"&&d.dequeue(this,a)})},dequeue:function(a){return this.each(function(){d.dequeue(this,a)})},delay:function(a,b){a=d.fx?d.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){d.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var j=/[\n\t\r]/g,k=/\s+/,l=/\r/g,m=/^(?:href|src|style)$/,n=/^(?:button|input)$/i,o=/^(?:button|input|object|select|textarea)$/i,p=/^a(?:rea)?$/i,q=/^(?:radio|checkbox)$/i;d.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"},d.fn.extend({attr:function(a,b){return d.access(this,a,b,!0,d.attr)},removeAttr:function(a,b){return this.each(function(){d.attr(this,a,""),this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.addClass(a.call(this,b,c.attr("class")))});if(a&&typeof a==="string"){var b=(a||"").split(k);for(var c=0,e=this.length;c<e;c++){var f=this[c];if(f.nodeType===1)if(f.className){var g=" "+f.className+" ",h=f.className;for(var i=0,j=b.length;i<j;i++)g.indexOf(" "+b[i]+" ")<0&&(h+=" "+b[i]);f.className=d.trim(h)}else f.className=a}}return this},removeClass:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.removeClass(a.call(this,b,c.attr("class")))});if(a&&typeof a==="string"||a===b){var c=(a||"").split(k);for(var e=0,f=this.length;e<f;e++){var g=this[e];if(g.nodeType===1&&g.className)if(a){var h=(" "+g.className+" ").replace(j," ");for(var i=0,l=c.length;i<l;i++)h=h.replace(" "+c[i]+" "," ");g.className=d.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,e=typeof b==="boolean";if(d.isFunction(a))return this.each(function(c){var e=d(this);e.toggleClass(a.call(this,c,e.attr("class"),b),b)});return this.each(function(){if(c==="string"){var f,g=0,h=d(this),i=b,j=a.split(k);while(f=j[g++])i=e?i:!h.hasClass(f),h[i?"addClass":"removeClass"](f)}else if(c==="undefined"||c==="boolean")this.className&&d._data(this,"__className__",this.className),this.className=this.className||a===!1?"":d._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(j," ").indexOf(b)>-1)return!0;return!1},val:function(a){if(!arguments.length){var c=this[0];if(c){if(d.nodeName(c,"option")){var e=c.attributes.value;return!e||e.specified?c.value:c.text}if(d.nodeName(c,"select")){var f=c.selectedIndex,g=[],h=c.options,i=c.type==="select-one";if(f<0)return null;for(var j=i?f:0,k=i?f+1:h.length;j<k;j++){var m=h[j];if(m.selected&&(d.support.optDisabled?!m.disabled:m.getAttribute("disabled")===null)&&(!m.parentNode.disabled||!d.nodeName(m.parentNode,"optgroup"))){a=d(m).val();if(i)return a;g.push(a)}}if(i&&!g.length&&h.length)return d(h[f]).val();return g}if(q.test(c.type)&&!d.support.checkOn)return c.getAttribute("value")===null?"on":c.value;return(c.value||"").replace(l,"")}return b}var n=d.isFunction(a);return this.each(function(b){var c=d(this),e=a;if(this.nodeType===1){n&&(e=a.call(this,b,c.val())),e==null?e="":typeof e==="number"?e+="":d.isArray(e)&&(e=d.map(e,function(a){return a==null?"":a+""}));if(d.isArray(e)&&q.test(this.type))this.checked=d.inArray(c.val(),e)>=0;else if(d.nodeName(this,"select")){var f=d.makeArray(e);d("option",this).each(function(){this.selected=d.inArray(d(this).val(),f)>=0}),f.length||(this.selectedIndex=-1)}else this.value=e}})}}),d.extend({attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,e,f){if(!a||a.nodeType===3||a.nodeType===8||a.nodeType===2)return b;if(f&&c in d.attrFn)return d(a)[c](e);var g=a.nodeType!==1||!d.isXMLDoc(a),h=e!==b;c=g&&d.props[c]||c;if(a.nodeType===1){var i=m.test(c);if(c==="selected"&&!d.support.optSelected){var j=a.parentNode;j&&(j.selectedIndex,j.parentNode&&j.parentNode.selectedIndex)}if((c in a||a[c]!==b)&&g&&!i){h&&(c==="type"&&n.test(a.nodeName)&&a.parentNode&&d.error("type property can't be changed"),e===null?a.nodeType===1&&a.removeAttribute(c):a[c]=e);if(d.nodeName(a,"form")&&a.getAttributeNode(c))return a.getAttributeNode(c).nodeValue;if(c==="tabIndex"){var k=a.getAttributeNode("tabIndex");return k&&k.specified?k.value:o.test(a.nodeName)||p.test(a.nodeName)&&a.href?0:b}return a[c]}if(!d.support.style&&g&&c==="style"){h&&(a.style.cssText=""+e);return a.style.cssText}h&&a.setAttribute(c,""+e);if(!a.attributes[c]&&(a.hasAttribute&&!a.hasAttribute(c)))return b;var l=!d.support.hrefNormalized&&g&&i?a.getAttribute(c,2):a.getAttribute(c);return l===null?b:l}h&&(a[c]=e);return a[c]}});var r=/\.(.*)$/,s=/^(?:textarea|input|select)$/i,t=/\./g,u=/ /g,v=/[^\w\s.|`]/g,w=function(a){return a.replace(v,"\\$&")};d.event={add:function(c,e,f,g){if(c.nodeType!==3&&c.nodeType!==8){try{d.isWindow(c)&&(c!==a&&!c.frameElement)&&(c=a)}catch(h){}if(f===!1)f=x;else if(!f)return;var i,j;f.handler&&(i=f,f=i.handler),f.guid||(f.guid=d.guid++);var k=d._data(c);if(!k)return;var l=k.events,m=k.handle;l||(k.events=l={}),m||(k.handle=m=function(a){return typeof d!=="undefined"&&d.event.triggered!==a.type?d.event.handle.apply(m.elem,arguments):b}),m.elem=c,e=e.split(" ");var n,o=0,p;while(n=e[o++]){j=i?d.extend({},i):{handler:f,data:g},n.indexOf(".")>-1?(p=n.split("."),n=p.shift(),j.namespace=p.slice(0).sort().join(".")):(p=[],j.namespace=""),j.type=n,j.guid||(j.guid=f.guid);var q=l[n],r=d.event.special[n]||{};if(!q){q=l[n]=[];if(!r.setup||r.setup.call(c,g,p,m)===!1)c.addEventListener?c.addEventListener(n,m,!1):c.attachEvent&&c.attachEvent("on"+n,m)}r.add&&(r.add.call(c,j),j.handler.guid||(j.handler.guid=f.guid)),q.push(j),d.event.global[n]=!0}c=null}},global:{},remove:function(a,c,e,f){if(a.nodeType!==3&&a.nodeType!==8){e===!1&&(e=x);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=d.hasData(a)&&d._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(e=c.handler,c=c.type);if(!c||typeof c==="string"&&c.charAt(0)==="."){c=c||"";for(h in t)d.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+d.map(m.slice(0).sort(),w).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!e){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))d.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=d.event.special[h]||{};for(j=f||0;j<p.length;j++){q=p[j];if(e.guid===q.guid){if(l||n.test(q.namespace))f==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(f!=null)break}}if(p.length===0||f!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&d.removeEvent(a,h,s.handle),g=null,delete t[h]}if(d.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,d.isEmptyObject(s)&&d.removeData(a,b,!0)}}},trigger:function(a,c,e){var f=a.type||a,g=arguments[3];if(!g){a=typeof a==="object"?a[d.expando]?a:d.extend(d.Event(f),a):d.Event(f),f.indexOf("!")>=0&&(a.type=f=f.slice(0,-1),a.exclusive=!0),e||(a.stopPropagation(),d.event.global[f]&&d.each(d.cache,function(){var b=d.expando,e=this[b];e&&e.events&&e.events[f]&&d.event.trigger(a,c,e.handle.elem)}));if(!e||e.nodeType===3||e.nodeType===8)return b;a.result=b,a.target=e,c=d.makeArray(c),c.unshift(a)}a.currentTarget=e;var h=d._data(e,"handle");h&&h.apply(e,c);var i=e.parentNode||e.ownerDocument;try{e&&e.nodeName&&d.noData[e.nodeName.toLowerCase()]||e["on"+f]&&e["on"+f].apply(e,c)===!1&&(a.result=!1,a.preventDefault())}catch(j){}if(!a.isPropagationStopped()&&i)d.event.trigger(a,c,i,!0);else if(!a.isDefaultPrevented()){var k,l=a.target,m=f.replace(r,""),n=d.nodeName(l,"a")&&m==="click",o=d.event.special[m]||{};if((!o._default||o._default.call(e,a)===!1)&&!n&&!(l&&l.nodeName&&d.noData[l.nodeName.toLowerCase()])){try{l[m]&&(k=l["on"+m],k&&(l["on"+m]=null),d.event.triggered=a.type,l[m]())}catch(p){}k&&(l["on"+m]=k),d.event.triggered=b}}},handle:function(c){var e,f,g,h,i,j=[],k=d.makeArray(arguments);c=k[0]=d.event.fix(c||a.event),c.currentTarget=this,e=c.type.indexOf(".")<0&&!c.exclusive,e||(g=c.type.split("."),c.type=g.shift(),j=g.slice(0).sort(),h=new RegExp("(^|\\.)"+j.join("\\.(?:.*\\.)?")+"(\\.|$)")),c.namespace=c.namespace||j.join("."),i=d._data(this,"events"),f=(i||{})[c.type];if(i&&f){f=f.slice(0);for(var l=0,m=f.length;l<m;l++){var n=f[l];if(e||h.test(n.namespace)){c.handler=n.handler,c.data=n.data,c.handleObj=n;var o=n.handler.apply(this,k);o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[d.expando])return a;var e=a;a=d.Event(e);for(var f=this.props.length,g;f;)g=this.props[--f],a[g]=e[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=c.documentElement,i=c.body;a.pageX=a.clientX+(h&&h.scrollLeft||i&&i.scrollLeft||0)-(h&&h.clientLeft||i&&i.clientLeft||0),a.pageY=a.clientY+(h&&h.scrollTop||i&&i.scrollTop||0)-(h&&h.clientTop||i&&i.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:d.proxy,special:{ready:{setup:d.bindReady,teardown:d.noop},live:{add:function(a){d.event.add(this,H(a.origType,a.selector),d.extend({},a,{handler:G,guid:a.handler.guid}))},remove:function(a){d.event.remove(this,H(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){d.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},d.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},d.Event=function(a){if(!this.preventDefault)return new d.Event(a);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?y:x):this.type=a,this.timeStamp=d.now(),this[d.expando]=!0},d.Event.prototype={preventDefault:function(){this.isDefaultPrevented=y;var a=this.originalEvent;a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=y;var a=this.originalEvent;a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=y,this.stopPropagation()},isDefaultPrevented:x,isPropagationStopped:x,isImmediatePropagationStopped:x};var z=function(a){var b=a.relatedTarget;try{if(b&&b!==c&&!b.parentNode)return;while(b&&b!==this)b=b.parentNode;b!==this&&(a.type=a.data,d.event.handle.apply(this,arguments))}catch(e){}},A=function(a){a.type=a.data,d.event.handle.apply(this,arguments)};d.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){d.event.special[a]={setup:function(c){d.event.add(this,b,c&&c.selector?A:z,a)},teardown:function(a){d.event.remove(this,b,a&&a.selector?A:z)}}}),d.support.submitBubbles||(d.event.special.submit={setup:function(a,b){if(this.nodeName&&this.nodeName.toLowerCase()!=="form")d.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&d(b).closest("form").length&&E("submit",this,arguments)}),d.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&d(b).closest("form").length&&a.keyCode===13&&E("submit",this,arguments)});else return!1},teardown:function(a){d.event.remove(this,".specialSubmit")}});if(!d.support.changeBubbles){var B,C=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?d.map(a.options,function(a){return a.selected}).join("-"):"":a.nodeName.toLowerCase()==="select"&&(c=a.selectedIndex);return c},D=function D(a){var c=a.target,e,f;if(s.test(c.nodeName)&&!c.readOnly){e=d._data(c,"_change_data"),f=C(c),(a.type!=="focusout"||c.type!=="radio")&&d._data(c,"_change_data",f);if(e===b||f===e)return;if(e!=null||f)a.type="change",a.liveFired=b,d.event.trigger(a,arguments[1],c)}};d.event.special.change={filters:{focusout:D,beforedeactivate:D,click:function(a){var b=a.target,c=b.type;(c==="radio"||c==="checkbox"||b.nodeName.toLowerCase()==="select")&&D.call(this,a)},keydown:function(a){var b=a.target,c=b.type;(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&D.call(this,a)},beforeactivate:function(a){var b=a.target;d._data(b,"_change_data",C(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in B)d.event.add(this,c+".specialChange",B[c]);return s.test(this.nodeName)},teardown:function(a){d.event.remove(this,".specialChange");return s.test(this.nodeName)}},B=d.event.special.change.filters,B.focus=B.beforeactivate}c.addEventListener&&d.each({focus:"focusin",blur:"focusout"},function(a,b){function f(a){var c=d.event.fix(a);c.type=b,c.originalEvent={},d.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var e=0;d.event.special[b]={setup:function(){e++===0&&c.addEventListener(a,f,!0)},teardown:function(){--e===0&&c.removeEventListener(a,f,!0)}}}),d.each(["bind","one"],function(a,c){d.fn[c]=function(a,e,f){if(typeof a==="object"){for(var g in a)this[c](g,e,a[g],f);return this}if(d.isFunction(e)||e===!1)f=e,e=b;var h=c==="one"?d.proxy(f,function(a){d(this).unbind(a,h);return f.apply(this,arguments)}):f;if(a==="unload"&&c!=="one")this.one(a,e,f);else for(var i=0,j=this.length;i<j;i++)d.event.add(this[i],a,h,e);return this}}),d.fn.extend({unbind:function(a,b){if(typeof a!=="object"||a.preventDefault)for(var e=0,f=this.length;e<f;e++)d.event.remove(this[e],a,b);else for(var c in a)this.unbind(c,a[c]);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){d.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){var c=d.Event(a);c.preventDefault(),c.stopPropagation(),d.event.trigger(c,b,this[0]);return c.result}},toggle:function(a){var b=arguments,c=1;while(c<b.length)d.proxy(a,b[c++]);return this.click(d.proxy(a,function(e){var f=(d._data(this,"lastToggle"+a.guid)||0)%c;d._data(this,"lastToggle"+a.guid,f+1),e.preventDefault();return b[f].apply(this,arguments)||!1}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var F={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};d.each(["live","die"],function(a,c){d.fn[c]=function(a,e,f,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:d(this.context);if(typeof a==="object"&&!a.preventDefault){for(var o in a)n[c](o,e,a[o],m);return this}d.isFunction(e)&&(f=e,e=b),a=(a||"").split(" ");while((h=a[i++])!=null){j=r.exec(h),k="",j&&(k=j[0],h=h.replace(r,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,h==="focus"||h==="blur"?(a.push(F[h]+k),h=h+k):h=(F[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)d.event.add(n[p],"live."+H(h,m),{data:e,selector:m,handler:f,origType:h,origHandler:f,preType:l});else n.unbind("live."+H(h,m),f)}return this}}),d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){d.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},d.attrFn&&(d.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!=="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,e=0,f=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,e,g){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!=="string")return e;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(f.call(n)==="[object Array]")if(u)if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&e.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&e.push(j[t]);else e.push.apply(e,n);else p(n,e);o&&(k(o,h,e,g),k.uniqueSort(e));return e};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!=="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(f){if(f===!0)continue}else g=o=!0}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b==="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1){}a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b==="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=u;typeof b==="string"&&!j.test(b)&&(b=b.toLowerCase(),d=b,g=t),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=u;typeof b==="string"&&!j.test(b)&&(b=b.toLowerCase(),d=b,g=t),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!=="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!=="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return"text"===c&&(b===c||b===null)},radio:function(a){return"radio"===a.type},checkbox:function(a){return"checkbox"===a.type},file:function(a){return"file"===a.type},password:function(a){return"password"===a.type},submit:function(a){return"submit"===a.type},image:function(a){return"image"===a.type},reset:function(a){return"reset"===a.type},button:function(a){return"button"===a.type||a.nodeName.toLowerCase()==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(f.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length==="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(a===b){g=!0;return 0}if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!=="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!=="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!=="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!=="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!=="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};d.find=k,d.expr=k.selectors,d.expr[":"]=d.expr.filters,d.unique=k.uniqueSort,d.text=k.getText,d.isXMLDoc=k.isXML,d.contains=k.contains}();var I=/Until$/,J=/^(?:parents|prevUntil|prevAll)/,K=/,/,L=/^.[^:#\[\.,]*$/,M=Array.prototype.slice,N=d.expr.match.POS,O={children:!0,contents:!0,next:!0,prev:!0};d.fn.extend({find:function(a){var b=this.pushStack("","find",a),c=0;for(var e=0,f=this.length;e<f;e++){c=b.length,d.find(a,this[e],b);if(e>0)for(var g=c;g<b.length;g++)for(var h=0;h<c;h++)if(b[h]===b[g]){b.splice(g--,1);break}}return b},has:function(a){var b=d(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(d.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(Q(this,a,!1),"not",a)},filter:function(a){return this.pushStack(Q(this,a,!0),"filter",a)},is:function(a){return!!a&&d.filter(a,this).length>0},closest:function(a,b){var c=[],e,f,g=this[0];if(d.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(e=0,f=a.length;e<f;e++)i=a[e],j[i]||(j[i]=d.expr.match.POS.test(i)?d(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:d(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=N.test(a)?d(a,b||this.context):null;for(e=0,f=this.length;e<f;e++){g=this[e];while(g){if(l?l.index(g)>-1:d.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b)break}}c=c.length>1?d.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a==="string")return d.inArray(this[0],a?d(a):this.parent().children());return d.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a==="string"?d(a,b):d.makeArray(a),e=d.merge(this.get(),c);return this.pushStack(P(c[0])||P(e[0])?e:d.unique(e))},andSelf:function(){return this.add(this.prevObject)}}),d.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return d.dir(a,"parentNode")},parentsUntil:function(a,b,c){return d.dir(a,"parentNode",c)},next:function(a){return d.nth(a,2,"nextSibling")},prev:function(a){return d.nth(a,2,"previousSibling")},nextAll:function(a){return d.dir(a,"nextSibling")},prevAll:function(a){return d.dir(a,"previousSibling")},nextUntil:function(a,b,c){return d.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return d.dir(a,"previousSibling",c)},siblings:function(a){return d.sibling(a.parentNode.firstChild,a)},children:function(a){return d.sibling(a.firstChild)},contents:function(a){return d.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:d.makeArray(a.childNodes)}},function(a,b){d.fn[a]=function(c,e){var f=d.map(this,b,c),g=M.call(arguments);I.test(a)||(e=c),e&&typeof e==="string"&&(f=d.filter(e,f)),f=this.length>1&&!O[a]?d.unique(f):f,(this.length>1||K.test(e))&&J.test(a)&&(f=f.reverse());return this.pushStack(f,a,g.join(","))}}),d.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?d.find.matchesSelector(b[0],a)?[b[0]]:[]:d.find.matches(a,b)},dir:function(a,c,e){var f=[],g=a[c];while(g&&g.nodeType!==9&&(e===b||g.nodeType!==1||!d(g).is(e)))g.nodeType===1&&f.push(g),g=g[c];return f},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var R=/ jQuery\d+="(?:\d+|null)"/g,S=/^\s+/,T=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,U=/<([\w:]+)/,V=/<tbody/i,W=/<|&#?\w+;/,X=/<(?:script|object|embed|option|style)/i,Y=/checked\s*(?:[^=]|=\s*.checked.)/i,Z={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};Z.optgroup=Z.option,Z.tbody=Z.tfoot=Z.colgroup=Z.caption=Z.thead,Z.th=Z.td,d.support.htmlSerialize||(Z._default=[1,"div<div>","</div>"]),d.fn.extend({text:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.text(a.call(this,b,c.text()))});if(typeof a!=="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return d.text(this)},wrapAll:function(a){if(d.isFunction(a))return this.each(function(b){d(this).wrapAll(a.call(this,b))});if(this[0]){var b=d(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(d.isFunction(a))return this.each(function(b){d(this).wrapInner(a.call(this,b))});return this.each(function(){var b=d(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){d(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){d.nodeName(this,"body")||d(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=d(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,d(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,e;(e=this[c])!=null;c++)if(!a||d.filter(a,[e]).length)!b&&e.nodeType===1&&(d.cleanData(e.getElementsByTagName("*")),d.cleanData([e])),e.parentNode&&e.parentNode.removeChild(e);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&d.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return d.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(R,""):null;if(typeof a!=="string"||X.test(a)||!d.support.leadingWhitespace&&S.test(a)||Z[(U.exec(a)||["",""])[1].toLowerCase()])d.isFunction(a)?this.each(function(b){var c=d(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);else{a=a.replace(T,"<$1></$2>");try{for(var c=0,e=this.length;c<e;c++)this[c].nodeType===1&&(d.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(f){this.empty().append(a)}}return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(d.isFunction(a))return this.each(function(b){var c=d(this),e=c.html();c.replaceWith(a.call(this,b,e))});typeof a!=="string"&&(a=d(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;d(this).remove(),b?d(b).before(a):d(c).append(a)})}return this.length?this.pushStack(d(d.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,e){var f,g,h,i,j=a[0],k=[];if(!d.support.checkClone&&arguments.length===3&&typeof j==="string"&&Y.test(j))return this.each(function(){d(this).domManip(a,c,e,!0)});if(d.isFunction(j))return this.each(function(f){var g=d(this);a[0]=j.call(this,f,c?g.html():b),g.domManip(a,c,e)});if(this[0]){i=j&&j.parentNode,d.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?f={fragment:i}:f=d.buildFragment(a,this,k),h=f.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&d.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)e.call(c?$(this[l],g):this[l],f.cacheable||m>1&&l<n?d.clone(h,!0,!0):h)}k.length&&d.each(k,bc)}return this}}),d.buildFragment=function(a,b,e){var f,g,h,i=b&&b[0]?b[0].ownerDocument||b[0]:c;a.length===1&&typeof a[0]==="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!X.test(a[0])&&(d.support.checkClone||!Y.test(a[0]))&&(g=!0,h=d.fragments[a[0]],h&&(h!==1&&(f=h))),f||(f=i.createDocumentFragment(),d.clean(a,i,f,e)),g&&(d.fragments[a[0]]=h?f:1);return{fragment:f,cacheable:g}},d.fragments={},d.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){d.fn[a]=function(c){var e=[],f=d(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&f.length===1){f[b](this[0]);return this}for(var h=0,i=f.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();d(f[h])[b](j),e=e.concat(j)}return this.pushStack(e,a,f.selector)}}),d.extend({clone:function(a,b,c){var e=a.cloneNode(!0),f,g,h;if((!d.support.noCloneEvent||!d.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!d.isXMLDoc(a)){ba(a,e),f=bb(a),g=bb(e);for(h=0;f[h];++h)ba(f[h],g[h])}if(b){_(a,e);if(c){f=bb(a),g=bb(e);for(h=0;f[h];++h)_(f[h],g[h])}}return e},clean:function(a,b,e,f){b=b||c,typeof b.createElement==="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var g=[];for(var h=0,i;(i=a[h])!=null;h++){typeof i==="number"&&(i+="");if(!i)continue;if(typeof i!=="string"||W.test(i)){if(typeof i==="string"){i=i.replace(T,"<$1></$2>");var j=(U.exec(i)||["",""])[1].toLowerCase(),k=Z[j]||Z._default,l=k[0],m=b.createElement("div");m.innerHTML=k[1]+i+k[2];while(l--)m=m.lastChild;if(!d.support.tbody){var n=V.test(i),o=j==="table"&&!n?m.firstChild&&m.firstChild.childNodes:k[1]==="<table>"&&!n?m.childNodes:[];for(var p=o.length-1;p>=0;--p)d.nodeName(o[p],"tbody")&&!o[p].childNodes.length&&o[p].parentNode.removeChild(o[p])}!d.support.leadingWhitespace&&S.test(i)&&m.insertBefore(b.createTextNode(S.exec(i)[0]),m.firstChild),i=m.childNodes}}else i=b.createTextNode(i);i.nodeType?g.push(i):g=d.merge(g,i)}if(e)for(h=0;g[h];h++)!f||!d.nodeName(g[h],"script")||g[h].type&&g[h].type.toLowerCase()!=="text/javascript"?(g[h].nodeType===1&&g.splice.apply(g,[h+1,0].concat(d.makeArray(g[h].getElementsByTagName("script")))),e.appendChild(g[h])):f.push(g[h].parentNode?g[h].parentNode.removeChild(g[h]):g[h]);return g},cleanData:function(a){var b,c,e=d.cache,f=d.expando,g=d.event.special,h=d.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&d.noData[j.nodeName.toLowerCase()])continue;c=j[d.expando];if(c){b=e[c]&&e[c][f];if(b&&b.events){for(var k in b.events)g[k]?d.event.remove(j,k):d.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[d.expando]:j.removeAttribute&&j.removeAttribute(d.expando),delete e[c]}}}});var bd=/alpha\([^)]*\)/i,be=/opacity=([^)]*)/,bf=/-([a-z])/ig,bg=/([A-Z]|^ms)/g,bh=/^-?\d+(?:px)?$/i,bi=/^-?\d/,bj={position:"absolute",visibility:"hidden",display:"block"},bk=["Left","Right"],bl=["Top","Bottom"],bm,bn,bo,bp=function(a,b){return b.toUpperCase()};d.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return d.access(this,a,c,!0,function(a,c,e){return e!==b?d.style(a,c,e):d.css(a,c)})},d.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bm(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{zIndex:!0,fontWeight:!0,opacity:!0,zoom:!0,lineHeight:!0},cssProps:{"float":d.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,e,f){if(a&&a.nodeType!==3&&a.nodeType!==8&&a.style){var g,h=d.camelCase(c),i=a.style,j=d.cssHooks[h];c=d.cssProps[h]||h;if(e===b){if(j&&"get"in j&&(g=j.get(a,!1,f))!==b)return g;return i[c]}if(typeof e==="number"&&isNaN(e)||e==null)return;typeof e==="number"&&!d.cssNumber[h]&&(e+="px");if(!j||!("set"in j)||(e=j.set(a,e))!==b)try{i[c]=e}catch(k){}}},css:function(a,c,e){var f,g=d.camelCase(c),h=d.cssHooks[g];c=d.cssProps[g]||g;if(h&&"get"in h&&(f=h.get(a,!0,e))!==b)return f;if(bm)return bm(a,c,g)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]},camelCase:function(a){return a.replace(bf,bp)}}),d.curCSS=d.css,d.each(["height","width"],function(a,b){d.cssHooks[b]={get:function(a,c,e){var f;if(c){a.offsetWidth!==0?f=bq(a,b,e):d.swap(a,bj,function(){f=bq(a,b,e)});if(f<=0){f=bm(a,b,b),f==="0px"&&bo&&(f=bo(a,b,b));if(f!=null)return f===""||f==="auto"?"0px":f}if(f<0||f==null){f=a.style[b];return f===""||f==="auto"?"0px":f}return typeof f==="string"?f:f+"px"}},set:function(a,b){if(!bh.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),d.support.opacity||(d.cssHooks.opacity={get:function(a,b){return be.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style;c.zoom=1;var e=d.isNaN(b)?"":"alpha(opacity="+b*100+")",f=c.filter||"";c.filter=bd.test(f)?f.replace(bd,e):c.filter+" "+e}}),d(function(){d.support.reliableMarginRight||(d.cssHooks.marginRight={get:function(a,b){var c;d.swap(a,{display:"inline-block"},function(){b?c=bm(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bn=function(a,c,e){var f,g,h;e=e.replace(bg,"-$1").toLowerCase();if(!(g=a.ownerDocument.defaultView))return b;if(h=g.getComputedStyle(a,null))f=h.getPropertyValue(e),f===""&&!d.contains(a.ownerDocument.documentElement,a)&&(f=d.style(a,e));return f}),c.documentElement.currentStyle&&(bo=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bh.test(d)&&bi.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bm=bn||bo,d.expr&&d.expr.filters&&(d.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!d.support.reliableHiddenOffsets&&(a.style.display||d.css(a,"display"))==="none"},d.expr.filters.visible=function(a){return!d.expr.filters.hidden(a)});var br=/%20/g,bs=/\[\]$/,bt=/\r?\n/g,bu=/#.*$/,bv=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bw=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bx=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,by=/^(?:GET|HEAD)$/,bz=/^\/\//,bA=/\?/,bB=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bC=/^(?:select|textarea)/i,bD=/\s+/,bE=/([?&])_=[^&]*/,bF=/(^|\-)([a-z])/g,bG=function(a,b,c){return b+c.toUpperCase()},bH=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bI=d.fn.load,bJ={},bK={},bL,bM;try{bL=c.location.href}catch(bN){bL=c.createElement("a"),bL.href="",bL=bL.href}bM=bH.exec(bL.toLowerCase())||[],d.fn.extend({load:function(a,c,e){if(typeof a!=="string"&&bI)return bI.apply(this,arguments);if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var g=a.slice(f,a.length);a=a.slice(0,f)}var h="GET";c&&(d.isFunction(c)?(e=c,c=b):typeof c==="object"&&(c=d.param(c,d.ajaxSettings.traditional),h="POST"));var i=this;d.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?d("<div>").append(c.replace(bB,"")).find(g):c)),e&&i.each(e,[c,b,a])}});return this},serialize:function(){return d.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?d.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bC.test(this.nodeName)||bw.test(this.type))}).map(function(a,b){var c=d(this).val();return c==null?null:d.isArray(c)?d.map(c,function(a,c){return{name:b.name,value:a.replace(bt,"\r\n")}}):{name:b.name,value:c.replace(bt,"\r\n")}}).get()}}),d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){d.fn[b]=function(a){return this.bind(b,a)}}),d.each(["get","post"],function(a,c){d[c]=function(a,e,f,g){d.isFunction(e)&&(g=g||f,f=e,e=b);return d.ajax({type:c,url:a,data:e,success:f,dataType:g})}}),d.extend({getScript:function(a,c){return d.get(a,b,c,"script")},getJSON:function(a,b,c){return d.get(a,b,c,"json")},ajaxSetup:function(a,b){b?d.extend(!0,a,d.ajaxSettings,b):(b=a,a=d.extend(!0,d.ajaxSettings,b));for(var c in {context:1,url:1})c in b?a[c]=b[c]:c in d.ajaxSettings&&(a[c]=d.ajaxSettings[c]);return a},ajaxSettings:{url:bL,isLocal:bx.test(bM[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":d.parseJSON,"text xml":d.parseXML}},ajaxPrefilter:bO(bJ),ajaxTransport:bO(bK),ajax:function(a,c){function v(a,c,l,n){if(r!==2){r=2,p&&clearTimeout(p),o=b,m=n||"",u.readyState=a?4:0;var q,t,v,w=l?bR(e,u,l):b,x,y;if(a>=200&&a<300||a===304){if(e.ifModified){if(x=u.getResponseHeader("Last-Modified"))d.lastModified[k]=x;if(y=u.getResponseHeader("Etag"))d.etag[k]=y}if(a===304)c="notmodified",q=!0;else try{t=bS(e,w),c="success",q=!0}catch(z){c="parsererror",v=z}}else{v=c;if(!c||a)c="error",a<0&&(a=0)}u.status=a,u.statusText=c,q?h.resolveWith(f,[t,c,u]):h.rejectWith(f,[u,c,v]),u.statusCode(j),j=b,s&&g.trigger("ajax"+(q?"Success":"Error"),[u,e,q?t:v]),i.resolveWith(f,[u,c]),s&&(g.trigger("ajaxComplete",[u,e]),--d.active||d.event.trigger("ajaxStop"))}}typeof a==="object"&&(c=a,a=b),c=c||{};var e=d.ajaxSetup({},c),f=e.context||e,g=f!==e&&(f.nodeType||f instanceof d)?d(f):d.event,h=d.Deferred(),i=d._Deferred(),j=e.statusCode||{},k,l={},m,n,o,p,q,r=0,s,t,u={readyState:0,setRequestHeader:function(a,b){r||(l[a.toLowerCase().replace(bF,bG)]=b);return this},getAllResponseHeaders:function(){return r===2?m:null},getResponseHeader:function(a){var c;if(r===2){if(!n){n={};while(c=bv.exec(m))n[c[1].toLowerCase()]=c[2]}c=n[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){r||(e.mimeType=a);return this},abort:function(a){a=a||"abort",o&&o.abort(a),v(0,a);return this}};h.promise(u),u.success=u.done,u.error=u.fail,u.complete=i.done,u.statusCode=function(a){if(a){var b;if(r<2)for(b in a)j[b]=[j[b],a[b]];else b=a[u.status],u.then(b,b)}return this},e.url=((a||e.url)+"").replace(bu,"").replace(bz,bM[1]+"//"),e.dataTypes=d.trim(e.dataType||"*").toLowerCase().split(bD),e.crossDomain==null&&(q=bH.exec(e.url.toLowerCase()),e.crossDomain=q&&(q[1]!=bM[1]||q[2]!=bM[2]||(q[3]||(q[1]==="http:"?80:443))!=(bM[3]||(bM[1]==="http:"?80:443)))),e.data&&e.processData&&typeof e.data!=="string"&&(e.data=d.param(e.data,e.traditional)),bP(bJ,e,c,u);if(r===2)return!1;s=e.global,e.type=e.type.toUpperCase(),e.hasContent=!by.test(e.type),s&&d.active++===0&&d.event.trigger("ajaxStart");if(!e.hasContent){e.data&&(e.url+=(bA.test(e.url)?"&":"?")+e.data),k=e.url;if(e.cache===!1){var w=d.now(),x=e.url.replace(bE,"$1_="+w);e.url=x+(x===e.url?(bA.test(e.url)?"&":"?")+"_="+w:"")}}if(e.data&&e.hasContent&&e.contentType!==!1||c.contentType)l["Content-Type"]=e.contentType;e.ifModified&&(k=k||e.url,d.lastModified[k]&&(l["If-Modified-Since"]=d.lastModified[k]),d.etag[k]&&(l["If-None-Match"]=d.etag[k])),l.Accept=e.dataTypes[0]&&e.accepts[e.dataTypes[0]]?e.accepts[e.dataTypes[0]]+(e.dataTypes[0]!=="*"?", */*; q=0.01":""):e.accepts["*"];for(t in e.headers)u.setRequestHeader(t,e.headers[t]);if(e.beforeSend&&(e.beforeSend.call(f,u,e)===!1||r===2)){u.abort();return!1}for(t in {success:1,error:1,complete:1})u[t](e[t]);o=bP(bK,e,c,u);if(o){u.readyState=1,s&&g.trigger("ajaxSend",[u,e]),e.async&&e.timeout>0&&(p=setTimeout(function(){u.abort("timeout")},e.timeout));try{r=1,o.send(l,v)}catch(y){status<2?v(-1,y):d.error(y)}}else v(-1,"No Transport");return u},param:function(a,c){var e=[],f=function(a,b){b=d.isFunction(b)?b():b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=d.ajaxSettings.traditional);if(d.isArray(a)||a.jquery&&!d.isPlainObject(a))d.each(a,function(){f(this.name,this.value)});else for(var g in a)bQ(g,a[g],c,f);return e.join("&").replace(br,"+")}}),d.extend({active:0,lastModified:{},etag:{}});var bT=d.now(),bU=/(\=)\?(&|$)|\?\?/i;d.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return d.expando+"_"+bT++}}),d.ajaxPrefilter("json jsonp",function(b,c,e){var f=typeof b.data==="string";if(b.dataTypes[0]==="jsonp"||c.jsonpCallback||c.jsonp!=null||b.jsonp!==!1&&(bU.test(b.url)||f&&bU.test(b.data))){var g,h=b.jsonpCallback=d.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2",m=function(){a[h]=i,g&&d.isFunction(i)&&a[h](g[0])};b.jsonp!==!1&&(j=j.replace(bU,l),b.url===j&&(f&&(k=k.replace(bU,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},e.then(m,m),b.converters["script json"]=function(){g||d.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),d.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){d.globalEval(a);return a}}}),d.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),d.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var bV=d.now(),bW,bX;d.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&bZ()||b$()}:bZ,bX=d.ajaxSettings.xhr(),d.support.ajax=!!bX,d.support.cors=bX&&"withCredentials"in bX,bX=b,d.support.ajax&&d.ajaxTransport(function(a){if(!a.crossDomain||d.support.cors){var c;return{send:function(e,f){var g=a.xhr(),h,i;a.username?g.open(a.type,a.url,a.async,a.username,a.password):g.open(a.type,a.url,a.async);if(a.xhrFields)for(i in a.xhrFields)g[i]=a.xhrFields[i];a.mimeType&&g.overrideMimeType&&g.overrideMimeType(a.mimeType),!a.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(i in e)g.setRequestHeader(i,e[i])}catch(j){}g.send(a.hasContent&&a.data||null),c=function(e,i){var j,k,l,m,n;try{if(c&&(i||g.readyState===4)){c=b,h&&(g.onreadystatechange=d.noop,delete bW[h]);if(i)g.readyState!==4&&g.abort();else{j=g.status,l=g.getAllResponseHeaders(),m={},n=g.responseXML,n&&n.documentElement&&(m.xml=n),m.text=g.responseText;try{k=g.statusText}catch(o){k=""}j||!a.isLocal||a.crossDomain?j===1223&&(j=204):j=m.text?200:404}}}catch(p){i||f(-1,p)}m&&f(j,k,m,l)},a.async&&g.readyState!==4?(bW||(bW={},bY()),h=bV++,g.onreadystatechange=bW[h]=c):c()},abort:function(){c&&c(0,1)}}}});var b_={},ca=/^(?:toggle|show|hide)$/,cb=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cc,cd=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];d.fn.extend({show:function(a,b,c){var e,f;if(a||a===0)return this.animate(ce("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)e=this[g],f=e.style.display,!d._data(e,"olddisplay")&&f==="none"&&(f=e.style.display=""),f===""&&d.css(e,"display")==="none"&&d._data(e,"olddisplay",cf(e.nodeName));for(g=0;g<h;g++){e=this[g],f=e.style.display;if(f===""||f==="none")e.style.display=d._data(e,"olddisplay")||""}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ce("hide",3),a,b,c);for(var e=0,f=this.length;e<f;e++){var g=d.css(this[e],"display");g!=="none"&&!d._data(this[e],"olddisplay")&&d._data(this[e],"olddisplay",g)}for(e=0;e<f;e++)this[e].style.display="none";return this},_toggle:d.fn.toggle,toggle:function(a,b,c){var e=typeof a==="boolean";d.isFunction(a)&&d.isFunction(b)?this._toggle.apply(this,arguments):a==null||e?this.each(function(){var b=e?a:d(this).is(":hidden");d(this)[b?"show":"hide"]()}):this.animate(ce("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,e){var f=d.speed(b,c,e);if(d.isEmptyObject(a))return this.each(f.complete);return this[f.queue===!1?"each":"queue"](function(){var b=d.extend({},f),c,e=this.nodeType===1,g=e&&d(this).is(":hidden"),h=this;for(c in a){var i=d.camelCase(c);c!==i&&(a[i]=a[c],delete a[c],c=i);if(a[c]==="hide"&&g||a[c]==="show"&&!g)return b.complete.call(this);if(e&&(c==="height"||c==="width")){b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(d.css(this,"display")==="inline"&&d.css(this,"float")==="none")if(d.support.inlineBlockNeedsLayout){var j=cf(this.nodeName);j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)}else this.style.display="inline-block"}d.isArray(a[c])&&((b.specialEasing=b.specialEasing||{})[c]=a[c][1],a[c]=a[c][0])}b.overflow!=null&&(this.style.overflow="hidden"),b.curAnim=d.extend({},a),d.each(a,function(c,e){var f=new d.fx(h,b,c);if(ca.test(e))f[e==="toggle"?g?"show":"hide":e](a);else{var i=cb.exec(e),j=f.cur();if(i){var k=parseFloat(i[2]),l=i[3]||(d.cssNumber[c]?"":"px");l!=="px"&&(d.style(h,c,(k||1)+l),j=(k||1)/f.cur()*j,d.style(h,c,j+l)),i[1]&&(k=(i[1]==="-="?-1:1)*k+j),f.custom(j,k,l)}else f.custom(j,e,"")}});return!0})},stop:function(a,b){var c=d.timers;a&&this.queue([]),this.each(function(){for(var a=c.length-1;a>=0;a--)c[a].elem===this&&(b&&c[a](!0),c.splice(a,1))}),b||this.dequeue();return this}}),d.each({slideDown:ce("show",1),slideUp:ce("hide",1),slideToggle:ce("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){d.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),d.extend({speed:function(a,b,c){var e=a&&typeof a==="object"?d.extend({},a):{complete:c||!c&&b||d.isFunction(a)&&a,duration:a,easing:c&&b||b&&!d.isFunction(b)&&b};e.duration=d.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in d.fx.speeds?d.fx.speeds[e.duration]:d.fx.speeds._default,e.old=e.complete,e.complete=function(){e.queue!==!1&&d(this).dequeue(),d.isFunction(e.old)&&e.old.call(this)};return e},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig||(b.orig={})}}),d.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(d.fx.step[this.prop]||d.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=d.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function g(a){return e.step(a)}var e=this,f=d.fx;this.startTime=d.now(),this.start=a,this.end=b,this.unit=c||this.unit||(d.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,g.elem=this.elem,g()&&d.timers.push(g)&&!cc&&(cc=setInterval(f.tick,f.interval))},show:function(){this.options.orig[this.prop]=d.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),d(this.elem).show()},hide:function(){this.options.orig[this.prop]=d.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=d.now(),c=!0;if(a||b>=this.options.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),this.options.curAnim[this.prop]=!0;for(var e in this.options.curAnim)this.options.curAnim[e]!==!0&&(c=!1);if(c){if(this.options.overflow!=null&&!d.support.shrinkWrapBlocks){var f=this.elem,g=this.options;d.each(["","X","Y"],function(a,b){f.style["overflow"+b]=g.overflow[a]})}this.options.hide&&d(this.elem).hide();if(this.options.hide||this.options.show)for(var h in this.options.curAnim)d.style(this.elem,h,this.options.orig[h]);this.options.complete.call(this.elem)}return!1}var i=b-this.startTime;this.state=i/this.options.duration;var j=this.options.specialEasing&&this.options.specialEasing[this.prop],k=this.options.easing||(d.easing.swing?"swing":"linear");this.pos=d.easing[j||k](this.state,i,0,1,this.options.duration),this.now=this.start+(this.end-this.start)*this.pos,this.update();return!0}},d.extend(d.fx,{tick:function(){var a=d.timers;for(var b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||d.fx.stop()},interval:13,stop:function(){clearInterval(cc),cc=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){d.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),d.expr&&d.expr.filters&&(d.expr.filters.animated=function(a){return d.grep(d.timers,function(b){return a===b.elem}).length});var cg=/^t(?:able|d|h)$/i,ch=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?d.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){d.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return d.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(e){}var f=b.ownerDocument,g=f.documentElement;if(!c||!d.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=f.body,i=ci(f),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||d.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||d.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:d.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){d.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return d.offset.bodyOffset(b);d.offset.initialize();var c,e=b.offsetParent,f=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(d.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===e&&(l+=b.offsetTop,m+=b.offsetLeft,d.offset.doesNotAddBorder&&(!d.offset.doesAddBorderForTableAndCells||!cg.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),f=e,e=b.offsetParent),d.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;d.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},d.offset={initialize:function(){var a=c.body,b=c.createElement("div"),e,f,g,h,i=parseFloat(d.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";d.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),e=b.firstChild,f=e.firstChild,h=e.nextSibling.firstChild.firstChild,this.doesNotAddBorder=f.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,f.style.position="fixed",f.style.top="20px",this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15,f.style.position=f.style.top="",e.style.overflow="hidden",e.style.position="relative",this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),d.offset.initialize=d.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;d.offset.initialize(),d.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(d.css(a,"marginTop"))||0,c+=parseFloat(d.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var e=d.css(a,"position");e==="static"&&(a.style.position="relative");var f=d(a),g=f.offset(),h=d.css(a,"top"),i=d.css(a,"left"),j=(e==="absolute"||e==="fixed")&&d.inArray("auto",[h,i])>-1,k={},l={},m,n;j&&(l=f.position()),m=j?l.top:parseInt(h,10)||0,n=j?l.left:parseInt(i,10)||0,d.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):f.css(k)}},d.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),e=ch.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(d.css(a,"marginTop"))||0,c.left-=parseFloat(d.css(a,"marginLeft"))||0,e.top+=parseFloat(d.css(b[0],"borderTopWidth"))||0,e.left+=parseFloat(d.css(b[0],"borderLeftWidth"))||0;return{top:c.top-e.top,left:c.left-e.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&(!ch.test(a.nodeName)&&d.css(a,"position")==="static"))a=a.offsetParent;return a})}}),d.each(["Left","Top"],function(a,c){var e="scroll"+c;d.fn[e]=function(c){var f=this[0],g;if(!f)return null;if(c!==b)return this.each(function(){g=ci(this),g?g.scrollTo(a?d(g).scrollLeft():c,a?c:d(g).scrollTop()):this[e]=c});g=ci(f);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:d.support.boxModel&&g.document.documentElement[e]||g.document.body[e]:f[e]}}),d.each(["Height","Width"],function(a,c){var e=c.toLowerCase();d.fn["inner"+c]=function(){return this[0]?parseFloat(d.css(this[0],e,"padding")):null},d.fn["outer"+c]=function(a){return this[0]?parseFloat(d.css(this[0],e,a?"margin":"border")):null},d.fn[e]=function(a){var f=this[0];if(!f)return a==null?null:this;if(d.isFunction(a))return this.each(function(b){var c=d(this);c[e](a.call(this,b,c[e]()))});if(d.isWindow(f)){var g=f.document.documentElement["client"+c];return f.document.compatMode==="CSS1Compat"&&g||f.document.body["client"+c]||g}if(f.nodeType===9)return Math.max(f.documentElement["client"+c],f.body["scroll"+c],f.documentElement["scroll"+c],f.body["offset"+c],f.documentElement["offset"+c]);if(a===b){var h=d.css(f,e),i=parseFloat(h);return d.isNaN(i)?h:i}return this.css(e,typeof a==="string"?a:a+"px")}}),a.jQuery=a.$=d})(window);

//"use strict";

//****************************************************************************
// 自定物件/原型
//****************************************************************************
var MyUtils = {
	getQuerystring: function( href, name ) {
		if ( !name ) {
			name = href;
			href = location.search || location.href;
		}

		var results = new RegExp( "[\\?&]" + name + "=([^&#]*)" ).exec( href );

		if ( results ) {
			return decodeURIComponent( results[1].replace( /\+/g, " " ) );
		}
		return "";
	},

	extend: function( destination, source ) {
		var copy;
		for ( var property in source ) {
			copy = source[property];
			if ( copy !== undefined ) {
				destination[property] = copy;
			}
		}
		return destination;
	},

	getPropertyNameByValue: function( obj, val ) {
		var it = Iterator( obj );
		for ( var pair in it ) {
			if ( pair[1] === val ) {
				return pair[0];
			}
		}
		return "";
	},

	helpContents: function() {
		return "hungya fixer v" + gVersion;
	},

	checkUpdate: function( silent, callback ) {
		var arg = arguments;

		$( ".izUpdate.izDialogBox" ).remove();

		try {
			var xhr = GM_xmlhttpRequest( {
				method: 'GET',
				url: "http://userscripts.org/scripts/source/102294.meta.js?" + +new Date(),
				headers: { 'Cache-Control': 'no-cache' },
				onload: function( resp ) {
					var rt = resp.responseText,
						conf = IzConfig,
						tmp = { "Update-UsoVersion": conf["Update-UsoVersion"], "Update-LastUpdateDate": conf["Update-LastUpdateDate"] },
						remoteVer = /@version\s*(.*?)\s*$/m.exec( rt )[1],
						remoteUsoVer = parseInt( /@uso:version\s*(.*?)\s*$/m.exec( rt )[1] );

					if ( !tmp["Update-UsoVersion"] && gVersion.substring( gVersion.length - 8, gVersion.length ) >= remoteVer.substring( remoteVer.length - 8, remoteVer.length ) ) {
						conf["Update-UsoVersion"] = tmp["Update-UsoVersion"] = remoteUsoVer;
					}

					if ( remoteVer.substring( remoteVer.length - 8, remoteVer.length ) > gVersion.substring( gVersion.length - 8, gVersion.length )  ) {
				//	if ( remoteUsoVer > tmp["Update-UsoVersion"] ) {
						var $box = $( "<div class='izUpdate'></div>" )
								.attr( "title", "更新檢查" )
								.html( "新的版本為 v" + remoteVer + "<br /><br />現有版本為 v" + gVersion + "<br /><br />你要立刻前往安裝?<br />"	)
								.izDialogBox( { isCloseBtn: false, isOKBtn: false } );

						$box.find( ".izDialogBox-ButtonPane" )
							.append(
								$( "<input type='button' value='立即安裝' id='izUpdate-Install' />" ).click( function() {
									$box.remove();
									GM_openInTab( "http://userscripts.org/scripts/source/102294.user.js" );
									conf["Update-UsoVersion"] = tmp["Update-UsoVersion"] = remoteUsoVer;
									conf["Update-LastUpdateDate"] = tmp["Update-LastUpdateDate"] = +new Date();
									MyConfig.save( MyUtils.extend( MyConfig.load(), tmp ) );
								} )
							)
							.append(
								$( "<input type='button' value='前往首頁' id='izUpdate-Homepage' />" ).click( function() {
									$box.remove();
									GM_openInTab( "http://userscripts.org/scripts/show/102294" );
									conf["Update-UsoVersion"] = tmp["Update-UsoVersion"] = remoteUsoVer;
									conf["Update-LastUpdateDate"] = tmp["Update-LastUpdateDate"] = +new Date();
									MyConfig.save( MyUtils.extend( MyConfig.load(), tmp ) );
								} )
							)
							.append(
								$( "<input type='button' value='下次再說' id='izUpdate-Later' />" ).click( function() {
									$box.remove();
									conf["Update-LastUpdateDate"] = tmp["Update-LastUpdateDate"] = +new Date();
									MyConfig.save( MyUtils.extend( MyConfig.load(), tmp ) );
								} )
							);
					} else {
						if ( !silent ) {
							alert( "你已使用最新版本：" + gVersion );
						}
					}

					conf["Update-LastUpdateDate"] = tmp["Update-LastUpdateDate"] = +new Date();
					MyConfig.save( MyUtils.extend( MyConfig.load(), tmp ) );

					if ( callback ) {
						callback.apply( this, Array.prototype.slice.call( arg, 2 ) );
					}
				}
			} );
		} catch ( e ) {
			if ( !silent ) {
				alert( "更新檢查錯誤：\n" + e );
			}
		}
	},
};

var MyConfig = {
	Greasemonkey: 0,
	localStorage: 1,
	Position_Relative: 0,
	Position_Absolute: 1,
	Position_Fixed: 2,
	Position_Static: 3,
	Place_Left: 0,
	Place_Right: 1,
	Place_Top: 2,
	Place_Bottom: 3,
	View_IntrinsicSize: 0,
	View_BestFit: 1,
	Display_ActualSize: 0,
	Display_Thumbnail: 1,
	Display_Hide: 2,

	_storage: ( function() {
		var s = 1; // Greasemonkey: 0, localStorage: 1
		if ( typeof GM_getValue === 'function' && typeof GM_setValue === 'function' ) {
			if ( GM_getValue( "IzConfig", true ) ) {
				s = 0;
			}
		}

		// debug
		//console.log( "MyConfig._storage: " + s );
		return s;
	} )(),

	load: function( bDefault ) {
		var that = this;

		var conf = {
				isNewBody: false,
				isFixedMenu: true,
				isEzSearch: false,
				"MainToolbar-Enable": true,

				isAutoTitleFilter: true,
				isAutoAuthorFilter: true,
				isFilterToolbar: true,
				isRowSort: false,
				isReplaceTitleText: true,

				"Article-Storage-Enable": false,
				"Article-AutoReload-Enable": false,

				"TableList-Enable": true,

				ezSearchList: { "all": ["電影"], "4_cg": ["[漫畫]", "中文"], "2_dvd": ["音樂"] },
				isSearchDate: true,
				dailySearch: 3,

				removeTitleList: { "all": ["公告"], "2_dvd": ["Ａ片", "18禁"], "2_cartoon": ["Ａ卡"], "3_game": ["18禁"], "3_program": ["iphone"], "4_cg": ["Ｈ漫", "Ａ漫"] },
				removeAuthorList: { "all": { "洪爺":"", "管理員": "" } },

				titleReplaceList: [ ["色情", ""], ["aa片", "謎片"], ["成人", "大人"] ],

				"MainToolbar-Position": that.Position_Fixed, // fixed, static
				"MainToolbar-Place": that.Place_Right, // left, right; top, bottom
				"MainToolbar-OffsetX": "5px",
				"MainToolbar-OffsetY": "2em",

				"EzSearchbar-Position": that.Position_Static, // fixed, static
				"EzSearchbar-Place": that.Place_Top, // left, right; top, bottom
				"EzSearchbar-OffsetX": "5px",
				"EzSearchbar-OffsetY": "20em",

				"FilterToolbar-Position": that.Position_Static, // fixed, static
				"FilterToolbar-Place": that.Place_Bottom, // left, right; top, bottom
				"FilterToolbar-OffsetX": "5px",
				"FilterToolbar-OffsetY": "20em",

				"FixedMenu-Width": "12em",
				"FixedMenu-FontSize": "18px",
				"FixedMenu-Position": "fixed", // fixed, absolute
				"FixedMenu-Place": "left", // left, right
				"FixedMenu-OffsetX": "1em",
				"FixedMenu-OffsetY": "2em",
				"FixedMenu-HideFloatMenu": true,
				"FixedMenu-HideItems": [0],
				"FixedMenu-AccessKey-Enable": true,
				"FixedMenu-AccessKey": {}, // { index: char, 1: a }
				"FixedMenu-AjaxLoad-Enable": true,

				"NewBody-Width": "950px",
				"NewBody-FontSize": "16px",
				"NewBody-Column-MinWidth": "2em",
				"NewBody-TitleColumn-MaxWidth": "500px",
				"NewBody-Cell-FontSize": "16px",
				"NewBody-Position": "relative", // relative, absolute
				"NewBody-Center": true,
				"NewBody-MarginTop": "0.5em",
				"NewBody-MarginLeft": "14em",
				"NewBody-Place": "left", // left, right
				"NewBody-OffsetX": "14em",
				"NewBody-OffsetY": "0.5em",
				"NewBody-KeyboardNavigation-Enable": true,
				"NewBody-HideOldBody": true,

				"Update-LastUpdateDate": 0,
				"Update-UsoVersion": 0,
				"Update-isAuto": false,
				"Update-Interval": 1,

				"Article-Layout-Enable": false,
				"Article-Width": "950px",
				"Article-FontSize": "16px",
				"Article-Position": that.Position_Relative, // relative, absolute
				"Article-Center": true,
				"Article-MarginTop": "0.5em",
				"Article-MarginLeft": "14em",
				"Article-Place": that.Place_Left, // left, right
				"Article-OffsetX": "14em",
				"Article-OffsetY": "0.5em",
				"Article-ImageRetry": 3,
				"Article-ExpandMarquee-Enable": true,

				"ImageToolbar-Enable": true,
				"ImageToolbar-MinWidthLimit": 200,
				"ImageToolbar-MinHeightLimit": 200,
				"ImageToolbar-View": that.Display_Thumbnail, // original, thumbnail, hide,
				"ImageToolbar-ZoomFactor": 0.25,
				"ImageToolbar-ThumbSize": 512,

				"Viewer-View": that.View_IntrinsicSize, // IntrinsicSize: 0, BestFit: 1 (izSlideShow)
				"Viewer-Retry": 3,
				"Viewer-ZoomFactor": 0.25,
				"Viewer-BgColor": "#efefef",
				"Viewer-Width": "580px",
				"Viewer-Height": "480px",
				"Viewer-Position": that.Position_Fixed, // fixed: 0, absolute: 1 (izSlideShow)
				"Viewer-Place": that.Place_Left, // left: 0, right: 1 (izSlideShow)
				"Viewer-OffsetX": "200px",
				"Viewer-OffsetY": "5em",
				"Viewer-AutoStartup-Enable": false
			};

		if ( !bDefault ) {
			switch ( this._storage ) {
				case MyConfig.Greasemonkey: {
					var jconf = GM_getValue( "IzConfig" );
					if ( jconf ) {
						MyUtils.extend( conf, JSON.parse( jconf ) );
					} else {
						GM_setValue( "IzConfig", JSON.stringify( conf ) );
					}
					break;
				}

				case MyConfig.localStorage:	{
					var jconf = localStorage.getItem( "IzConfig" );
					if ( jconf ) {
						MyUtils.extend( conf, JSON.parse( jconf ) );
					} else {
						localStorage.setItem( "IzConfig", JSON.stringify( conf ) );
					}
					break;
				}
			}
		}

		return conf;
	},

	save: function( conf ) {
		switch ( this._storage ) {
			case MyConfig.Greasemonkey:
				GM_setValue( "IzConfig", JSON.stringify( conf ) );
				break;

			case MyConfig.localStorage:
				localStorage.setItem( "IzConfig", JSON.stringify( conf ) );
				break;
		}
	}
};

//-- TaskQueue Prototype
var TaskQueue = function() {
};

TaskQueue.prototype = {
	tasks: [],
	/* eg.
	 task = {
		fn: function() {},
		args: [],
		thisArg: this,
		interval: 50
	 }
	*/
	isTasksComplete: false,
	thisArg: null,
	interval: 25,
	autoEnd: false,

	add: function( task ) {
		this.tasks.push( task );
	},

	start: function() {
		var that = this;

		window.setTimeout( function() {
			if ( that.tasks.length > 0 ) {
				var t = that.tasks.shift();
				t.fn.apply( t.thisArg ? t.thisArg : that.thisArg, t.args || [] );
			} else if ( that.autoEnd ) {
				return;
			}

			if ( !that.isTasksComplete ) {
				window.setTimeout( arguments.callee, that.tasks.length && that.tasks[0].interval !== undefined ? that.tasks[0].interval : that.interval );
			}
		}, that.tasks.length && that.tasks[0].interval !== undefined ? that.tasks[0].interval : that.interval );
	},

	end: function() {
		this.tasks.push( { thisArg: this, fn: function() { this.isTasksComplete = true } } );
	}
};
//--

//-- StorageManager Prototype
var StorageManager = function( prefix, type ) {
	if ( prefix ) {
		this.prefix = prefix;
	}

	if ( type ) {
		this.type = type;
	}

	this.init();
};

StorageManager.prototype = {
	lastIndex: 0,
	map: {},
	/* {
			id: index, ...
		}
	*/
	prefix: "StorageManager",
	type: function() {
			this.index = 0;
			this.id = 0;
		},

	init: function() {
		this.lastIndex = parseInt( localStorage.getItem( this.prefix + ":lastIndex" ), 10 );

		if ( isNaN( this.lastIndex ) ) {
			this.empty();
		} else {
			this.map = JSON.parse( localStorage.getItem( this.prefix + ":map" ) );
		}
	},

	remap: function( is ) {
		items = is || this.getAllItems();

		var item, len = items.length;
		this.map = {};
		while( len-- ) {
			item = items[len];
			this.map[item.id] = item.index;
		}

		localStorage.setItem( this.prefix + ":map", JSON.stringify( this.map ) );
	},

	destroy: function() {
		var key, len = localStorage.length, re = new RegExp( this.prefix + ":" );
		while ( len-- ) {
			key = localStorage.key( len );
			if ( re.test( key ) ) {
				localStorage.removeItem( key );
			}
		}
	},

	empty: function() {
		this.destroy();

		try {
			localStorage.setItem( this.prefix + ":lastIndex", this.lastIndex = 0 );
			localStorage.setItem( this.prefix + ":map", JSON.stringify( this.map = {} ) );
		} catch ( e ) {
			console.log( "StorageManager[" + this.prefix + "](E1): " + e );
		}
	},

	getItemByIndex: function( index ) {
		return MyUtils.extend( new this.type, JSON.parse( localStorage.getItem( this.prefix + ":" + index ) ) );
	},

	getItemById: function( id ) {
		return MyUtils.extend( new this.type, JSON.parse( localStorage.getItem( this.prefix + ":" + this.map[id] ) ) );
	},

	getAllItems: function() {
		var items = [], len = localStorage.length;
		if ( len ) {
			var key, re = new RegExp( this.prefix + ":\\d+" );
			for ( var i = 0; len > i; ++i ) {
				key = localStorage.key( i );
				if ( re.test( key ) ) {
					items.push( MyUtils.extend( new this.type, JSON.parse( localStorage.getItem( key ) ) ) );
				}
			}

			if ( items.length ) {
				items.sort(
					function( a, b ) {
						return a.index < b.index ? -1 : ( a.index > b.index ? 1 : 0 );
					}
				);
			}
		}

		return items;
	},

	setItem: function( item ) {
		try {
			if ( !( item instanceof this.type ) ) {
				throw new TypeError;
			}

			if ( item.id in this.map ) {
				item.index = this.map[item.id];
			} else if ( !item.index ) {
				item.index = ++this.lastIndex;
				localStorage.setItem( this.prefix + ":lastIndex", this.lastIndex );
				this.map[item.id] = item.index;
				localStorage.setItem( this.prefix + ":map", JSON.stringify( this.map ) );
			}

			localStorage.setItem( this.prefix + ":" +  item.index, JSON.stringify( item ) );
		} catch ( e ) {
			console.log( "StorageManager[" + this.prefix + "](E2): " + e );
		}
	},

	setItems: function( items ) {
		for ( var i = 0, len = items.length; len > i; ++i ) {
			this.setItem( items[i] );
		}
	},

	removeItem: function( item ) {
		localStorage.removeItem( this.prefix + ":" + item.index );

		delete this.map[item.id];
		localStorage.setItem( this.prefix + ":map", JSON.stringify( this.map ) );
	},

	removeAt: function( index ) {
		localStorage.removeItem( this.prefix + ":" + index );

		for ( var id in this.map ) {
			if ( this.map[id] === index ) {
				delete this.map[id];
				break;
			}
		}
		localStorage.setItem( this.prefix + ":map", JSON.stringify( this.map ) );
	}
};
//--

//-- Archives Prototype
var Archives = function() {
	var that = this, style = document.getElementById( "izStyle-Piece" );

	if ( !style ) {
		style = document.createElement( "style" )
		style.id = "izStyle-Piece";
		style.type = "text/css";
		style.textContent = '.izPiece {position:fixed;z-index:100;top:2em;left:15em;width:770px;border:3px solid #ccc;border-radius:10px 10px 0 0;background:#fcfcfc;font-family:"微軟正黑體",sans-serif;line-height:1.4em;}.izPiece-Titlebar {overflow:hidden;min-height:1em;margin:0;padding:5px;border:0px solid #CC7A00;border-radius:7px 7px 0 0;background-image:-moz-linear-gradient(center bottom, #FF9900 50%, #FF9E0D 50%);background-image:-webkit-gradient(linear, left bottom, left top, color-stop(50%, #FF9900), color-stop(50%, #FF9E0D));color:#fdfdfd;white-space:nowrap;text-align:left;-moz-user-select:-moz-none;-webkit-user-select:none;}.izPiece-Titlebar-CloseButton {position:absolute;right:1px;margin:0 2px 0 0;padding:0 2px 0 0;border:none;background-color:#FF9E0D;color:#2E86C7;white-space:nowrap;}.izPiece .izPiece-List-SwitchBox,.izPiece .izPiece-Detail-SwitchBox {margin:-10px auto 10px;padding:0;border-top:0px solid #ccc;border-bottom:0px solid #ccc;#text-align:right;-moz-user-select:-moz-none;-webkit-user-select:none;}.izPiece .izPiece-Detail {overflow:hidden;width:750px;margin:10px auto;border:1px solid #ccc;white-space:nowrap;}.izPiece .izPiece-Detail label {margin-right:5px;padding:0px 5px;}.izPiece .izPiece-Detail div:nth-child(2n+1):not(:first-child) {background-color:#f2f2f2;}.izPiece .izPiece-Detail div:nth-child(2n):not(:last-child) {background-color:#fafafa;}.izPiece .izPiece-Detail div:first-child {border-bottom:1px solid #ccc;background-image:-moz-linear-gradient(top left, #dedede 30%, #fff 100%);background-image:-webkit-linear-gradient(top left, #dedede 30%, #fff 100%);font-weight:700;}.izPiece .izPiece-Detail-CommentTxa {width:100%;min-height:150px;}.izPiece .izPiece-Detail-SaveBtn {margin:0 3px 1px;padding:2px 3px;border:1px solid #ccc;background-color:#fff;color:#2E86C7;}.izPiece .izPiece-Detail-SaveBtn:hover {background-color:#fdfdfd;border:1px solid #999;}.izGrid span.izPiece-DeleteBtn {padding-left:20px;}.izGrid span.izPiece-DeleteBtn:before {position:absolute;left:-170px;clip:rect(3px 189px 19px 173px);content:url(http://www.hotimg.com/direct/tGxWvkn.png);}.izGrid span.izPiece-DeleteBtn:hover:before {position:absolute;left:-122px;clip:rect(3px 141px 19px 125px);content:url(http://www.hotimg.com/direct/tGxWvkn.png);}';
		document.head.appendChild( style );
	}

	this.view = document.createElement( "div" );
	this.view.className = "izPiece";
	this.view.innerHTML = '<div class="izPiece-Titlebar"><span class="izPiece-TitleText">文章暫存</span><input type="button" value="╳" class="izPiece-Titlebar-CloseButton"></div><table class="izPiece-List" summary="文章暫存" border="1" cellpadding="0" cellspacing="0"><thead><tr><th class="izPiece-List-Board">看板</th><th class="izPiece-List-Subject">主題</th><th class="izPiece-List-Author">作者</th><th class="izPiece-List-Date">日期</th></tr></thead><tbody></tbody></table><div class="izPiece-List-SwitchBox"><span>暫存列表</span><span style="float:right;" class="izPiece-List-SwitchBtn" title="顯示或隱藏暫存列表">▲</span></div><div style="clear:both;"></div></div><div class="izPiece-Detail"><div>詳細資料</div><div>看板：<span class="izPiece-Detail-Board"></span></div><div>主題：<span class="izPiece-Detail-Subject"></span></div><div>作者：<span class="izPiece-Detail-Author"></span></div><div>日期：<span class="izPiece-Detail-Date"></span></div><div>網址：<span class="izPiece-Detail-Url"></span></div><div>備註：<br /><textarea  class="izPiece-Detail-CommentTxa"></textarea></div><div><label><input type="button" class="izPiece-Detail-SaveBtn" value="儲存備註" /></label></div></div><div class="izPiece-Detail-SwitchBox"><span>詳細資料</span><span  style="float:right;" class="izPiece-Detail-SwitchBtn" title="顯示或隱藏詳細資料">▲</span></div>';
	document.body.appendChild( this.view );

	this.$grid = $( ".izPiece-List" ).izGrid( {
		classname: "izPiece-Grid",
		titleText: "暫存列表",
		toolbar: true,
		buttons: [{ name: "Delete", classname: "izPiece-DeleteBtn", click:
				function() {
					var $rows = $( this ).parents( ".izGrid" ).find( ".izGrid-Selected" );
					if ( $rows.length ) {
						if ( that.detail.prop_TR && that.detail.prop_TR.prop_IsChanged ) {
							if ( !confirm( "備註已改變,\n是否繼續執行刪除?") ) {
								return;
							}
						}

						that.clearDetail();

						$rows.each( function( index, tr ) {
							that.delRow( tr );
						} );
					}
				}
			}, { separator: true }],
		fullRowSelect: false,
		checkbox: true,
		height: 200,
		width: 750,
		columnsInfo: [{ minWidth: "4.2em", textAlign: "center" },
			{ minWidth: "auto" },
			{ minWidth: "6em", textAlign: "center" },
			{ minWidth: "6em", textAlign: "center" }]
	} );

	this.grid = document.getElementsByClassName( "izPiece-Grid" )[0];
	this.detail = document.getElementsByClassName( "izPiece-Detail" )[0];
	this.gridSwitchBtn = document.getElementsByClassName( "izPiece-List-SwitchBtn" )[0];
	this.detailSwitchBtn = document.getElementsByClassName( "izPiece-Detail-SwitchBtn" )[0];

	this.view.style.display = "none";
	this.grid.style.display = "none";
	this.detail.style.display = "none";

	this.gridSwitchBtn.parentNode.style.width = this.grid.style.width;
	$( this.gridSwitchBtn ).bind( "click", function( event ) {
		if ( that.grid.style.display ) {
			that.grid.style.display = "";
			this.textContent = "▲";
			this.parentNode.getElementsByTagName( "span" )[0].style.display = "none";
			this.parentNode.style.borderWidth = "0 0 0px 0";
			this.parentNode.style.marginTop = "-10px";
		} else {
			that.grid.style.display = "none";
			this.textContent = "▼";
			this.parentNode.getElementsByTagName( "span" )[0].style.display = "";
			this.parentNode.style.borderWidth = "1px 0 0";
			this.parentNode.style.marginTop = "10px";
		}
	} );

	this.detailSwitchBtn.parentNode.style.width = this.grid.style.width;
	$( this.detailSwitchBtn ).bind( "click", function( event ) {
		if ( that.detail.style.display === "none" ) {
			that.detail.style.display = "";
			this.textContent = "▲";
			this.parentNode.getElementsByTagName( "span" )[0].style.display = "none";
			this.parentNode.style.borderWidth = "0 0 0px 0";
			this.parentNode.style.marginTop = "-10px";
		} else {
			that.detail.style.display = "none";
			this.textContent = "▼";
			this.parentNode.getElementsByTagName( "span" )[0].style.display = "";
			this.parentNode.style.borderWidth = "1px 0 0";
			this.parentNode.style.marginTop = "10px";
		}
	} );

	$( document.getElementsByClassName( "izPiece-Titlebar" )[0] ).bind( "mousedown", function( event ) {
		$( that.view ).izDraggable( event );
	} );

	$( document.getElementsByClassName( "izPiece-Titlebar-CloseButton" )[0] ).bind( "click", function() {
		that.hideView();
	} );

	$( document.getElementsByClassName( "izPiece-Detail-CommentTxa" )[0] ).bind( "keypress", function( event ) {
		if ( that.detail.prop_TR && !that.detail.prop_TR.prop_IsChanged &&
			!event.altKey && !event.ctrlKey &&
			event.keyCode !== 16 && event.keyCode !== 17 && event.keyCode !== 18
			)
		{
			that.detail.prop_TR.prop_IsChanged = true;
		}
	} );

	$( document.getElementsByClassName( "izPiece-Detail-SaveBtn" )[0] ).bind( "click", function() {
		if ( that.detail.prop_TR ) {
			that.saveComment( that.detail.prop_TR );

			var $infoText = $( "<span style='padding:0 5px;background-color:red;color:#fff;'>儲存完成</span>");
			$( this ).after( $infoText );
			window.setTimeout( function() {	$infoText.remove();	}, 1000 );
		}
	} );

	var Piece = function( opts ) {
		if ( opts ) {
			MyUtils.extend( this, opts );
		}
	};

	Piece.prototype = {
		index: 0,
		id: 0,
		board: "",
		subject: "",
		author: "",
		date: "",
		url: "",
		comment: ""
	};

	this.itemProto = Piece;

	this.init();
};

Archives.Display_All = 0;
Archives.Display_Grid = 1;
Archives.Display_Detail = 2;

Archives.prototype = {
	itemProto: null,
	storageManager: null,
	view: null,
	grid: null,
	detail: null,
	$grid: null,
	gridSwitchBtn: null,
	detailSwitchBtn: null,

	init: function() {
		if ( !this.storageManager ) {
			this.storageManager = new StorageManager( "izArticle-Piece", this.itemProto );
		} else {
			this.storageManager.init();
		}

		this.$grid.find( "tr" ).remove();

		var pieces = this.storageManager.getAllItems();

		this.storageManager.remap( pieces );

		for ( var i in pieces ) {
			this.buildRow( pieces[i] );
		}
	},

	isIncluded: function( id ) {
		return id in this.storageManager.map;
	},

	addRow: function( hyTr ) {
		if ( hyTr instanceof this.itemProto ) {
			this.storageManager.setItem( hyTr );
			this.buildRow( hyTr );
		} else {
			var cellIndex = { "title": 2, "author": 3, "date": 6 },
				p = new this.itemProto,
				url = hyTr.cells[cellIndex.title].getElementsByTagName( "a" )[0].href;

			p.id = MyUtils.getQuerystring( url, "bnum" );

			if ( this.isIncluded( p.id ) ) {
				return;
			}

			p.board = gCurrentBoard;
			p.subject = hyTr.cells[cellIndex.title].textContent;
			p.author = hyTr.cells[cellIndex.author].textContent;
			p.date = hyTr.cells[cellIndex.date].textContent;
			p.url = url;
			p.comment = "";

			this.storageManager.setItem( p );
			this.buildRow( p );
		}
	},

	delRow: function( tr ) {
		this.storageManager.removeItem( tr.prop_Piece );
		tr.prop_Piece = tr.prop_IsChanged = null;
		this.$grid.izGrid( "delete", tr );
	},

	delRowById: function( id ) {
		if ( this.isIncluded( id ) ) {
			var tr, rows = this.$grid.find( "tr" ).get(), len = rows.length;
			while ( len-- ) {
				tr = rows[len];
				if ( tr.prop_Piece.id == id ) {
					this.delRow( tr );
					break;
				}
			}
		}
	},

	saveComment: function( tr ) {
		tr.prop_Piece.comment = document.getElementsByClassName( "izPiece-Detail-CommentTxa" )[0].value;
		tr.prop_IsChanged = false;
		this.storageManager.setItem( tr.prop_Piece );
	},

	clearDetail: function() {
		this.detail.prop_TR = null;
		this.detail.prop_PieceId = null;
		this.detail.prop_Index = null;
		this.detail.prop_Comment = null;

		var spans = this.detail.getElementsByTagName( "span" ), len = spans.length;
		while ( len-- ) {
			spans[len].textContent = "";
		}

		document.getElementsByClassName( "izPiece-Detail-CommentTxa" )[0].value = "";
	},

	buildRow: function( pp ) {
		var that = this, tr = document.createElement( "tr" );

		tr.prop_Piece = pp;
		tr.prop_IsChanged = false;
		tr.innerHTML = "<td>" + gBoardList[pp.board] + "</td><td><a href='" + pp.url + "' target='_blank'>" + pp.subject + "</a></td><td>" + pp.author + "</td><td>" +	pp.date + "</td>";
		tr.addEventListener( "click", function() {
				var txa = document.getElementsByClassName( "izPiece-Detail-CommentTxa" )[0];

				if ( that.detail.prop_TR && that.detail.prop_TR.prop_IsChanged ) {
					if ( !confirm( "備註已改變,\n是否要依點選列來更新細節資料?") ) {
						return;
					}
				}

				var pp = this.prop_Piece;

				that.detail.prop_TR = this;
				that.detail.prop_PieceId = pp.id;
				that.detail.prop_Index = pp.index;

				document.getElementsByClassName( "izPiece-Detail-Board" )[0].textContent = gBoardList[pp.board];
				document.getElementsByClassName( "izPiece-Detail-Subject" )[0].textContent = pp.subject;
				document.getElementsByClassName( "izPiece-Detail-Author" )[0].textContent = pp.author;
				document.getElementsByClassName( "izPiece-Detail-Date" )[0].textContent = pp.date;
				document.getElementsByClassName( "izPiece-Detail-Url" )[0].innerHTML = "<a href='" + pp.url + "'>" + pp.url + "</a>";
				txa.value = pp.comment;

				this.prop_IsChanged = false;
			}, false );

		this.$grid.izGrid( "insert", tr );
	},

	showView: function( v, nth ) { // v = 0: Display_All, 1: Display_Grid , 2: Display_Detail
		if ( !this.hideView() ) {
			return;
		}

		this.clearDetail();
		this.$grid.find( ".izGrid-Selected" ).removeClass( "izGrid-Selected" );
		$( ".izCheckbox.izCheckAll" ).css( { 'background-color': "#ddd" } );

		this.view.style.display = "";

		switch ( v ) {
			case Archives.Display_Grid:
				this.grid.style.display = "";
				this.detail.style.display = "none";

				this.gridSwitchBtn.textContent = "▲";
				this.gridSwitchBtn.parentNode.getElementsByTagName( "span" )[0].style.display = "none";
				this.gridSwitchBtn.parentNode.style.borderWidth = "0 0 0px 0";
				this.gridSwitchBtn.parentNode.style.marginTop = "-10px";

				this.detailSwitchBtn.textContent = "▼";
				this.detailSwitchBtn.parentNode.getElementsByTagName( "span" )[0].style.display = "";
				this.detailSwitchBtn.parentNode.style.borderWidth = "1px 0 0";
				this.detailSwitchBtn.parentNode.style.marginTop = "10px";
			break;

			case Archives.Display_Detail:
				this.grid.style.display = "none";
				this.detail.style.display = "";

				this.gridSwitchBtn.textContent = "▼";
				this.gridSwitchBtn.parentNode.getElementsByTagName( "span" )[0].style.display = "";
				this.gridSwitchBtn.parentNode.style.borderWidth = "1px 0 0";
				this.gridSwitchBtn.parentNode.style.marginTop = "10px";

				this.detailSwitchBtn.textContent = "▲";
				this.detailSwitchBtn.parentNode.getElementsByTagName( "span" )[0].style.display = "none";
				this.detailSwitchBtn.parentNode.style.borderWidth = "0 0 0px 0";
				this.detailSwitchBtn.parentNode.style.marginTop = "-10px";
			break;

			case Archives.Display_All:
			default:
				this.detail.style.display = "";
				this.grid.style.display = "";

				this.gridSwitchBtn.textContent = "▲";
				this.gridSwitchBtn.parentNode.getElementsByTagName( "span" )[0].style.display = "none";
				this.gridSwitchBtn.parentNode.style.borderWidth = "0 0 0px 0";
				this.gridSwitchBtn.parentNode.style.marginTop = "-10px";

				this.detailSwitchBtn.textContent = "▲";
				this.detailSwitchBtn.parentNode.getElementsByTagName( "span" )[0].style.display = "none";
				this.detailSwitchBtn.parentNode.style.borderWidth = "0 0 0px 0";
				this.detailSwitchBtn.parentNode.style.marginTop = "-10px";
			break;
		}

		if ( !nth || nth < 1 ) {
			nth = 1
		}

		var $tr = this.$grid.find( "tr:nth-child(" + nth + ")" );
		if ( $tr.length ) {
			var evt = document.createEvent( "MouseEvents" );
			evt.initEvent( "click", true, true );
			$tr[0].dispatchEvent( evt );
		}
	},

	hideView: function( force ) {
		if ( this.detail.prop_TR ) {
			if ( !force && this.detail.prop_TR.prop_IsChanged ) {
				if ( !confirm( "備註已改變,\n確定要關閉?") ) {
					return false;
				}
			}
			this.detail.prop_TR.prop_IsChanged = false;
		}

		this.view.style.display = "none";
		return true;
	}
};
//--

//****************************************************************************
// jQuery Plugin
//****************************************************************************

//-- Draggable Plugin
( function( $ ) {

var onMouseMove_fixed = function( event ) {
	var d = event.data,
		$e = d.$elem,
		top = event.clientY - d.cursorOffsetY,
		left = event.clientX - d.cursorOffsetX;

	if ( top < 0 ) {
		$e.css( 'top', 0 );
	} else if ( top > d.lowerBound ) {
		$e.css( 'top', d.lowerBound );
	} else {
		$e.css( 'top', top );
	}

	if ( left < d.leftBound ) {
		$e.css( 'left', d.leftBound );
	} else if ( left > d.rigthBound ) {
		$e.css( 'left', d.rigthBound );
	} else {
		$e.css( 'left', left );
	}
};

var onMouseMove_abs = function( event ) {
	var d = event.data;
	d.$elem.css( { top: event.pageY - d.cursorOffsetY,	left: event.pageX - d.cursorOffsetX} );
};

var onMouseUp = function( event ) {
	var d = event.data;

	$( document ).unbind( ".izDraggable" );

	d.$elem.css( {
		'-moz-user-select': d.userSelect,
		'-webkit-user-select': d.userSelect,
		'z-index': d.zIndex,
		opacity: d.opacity,
		cursor: ""
	} )
	.unbind( "selectstart.izDraggable" )
	.trigger( "izMoveEvent.izDraggable" );
};

var methods = {

	create: function( event ) {
		return this.each( function() {
			var $target = $( this ),
				offset = $target.offset(),
				data = {
					$elem: $target,
					cursorOffsetY: event.pageY - offset.top,
					cursorOffsetX: event.pageX - offset.left,
					userSelect: $target.css( '-moz-user-select' ),
					position: $target.css( 'position' ),
					zIndex: $target.css( 'z-index' ),
					opacity: $target.css( 'opacity' ),
					cursor: $target.css( 'cursor' )
				};

			$target.css( {
				'-moz-user-select': '-moz-none',
				'-webkit-user-select': 'none',
				'z-index': 999,
				opacity: 1,
				cursor: 'move'
			} )
			.bind( "selectstart.izDraggable", function() { return false; } );

			if ( data.position !== 'fixed' ) {
				if ( data.position !== 'absolute' ) {
					$target.css( {
						position: 'absolute',
						top: offset.top - parseInt( $target.css( "margin-top" ), 10 ),
						left: offset.left
					} );
				}

				$( document )
					.bind( "mousemove.izDraggable", data, onMouseMove_abs )
					.bind( "mouseup.izDraggable", data, onMouseUp );
			} else {
				var $w = $( window );

				data.lowerBound = $w.height() - 50;
				data.leftBound = -( $target.width() - 30 );
				data.rigthBound = $w.width() - 50;

				$( document )
					.bind( "mousemove.izDraggable", data, onMouseMove_fixed )
					.bind( "mouseup.izDraggable", data, onMouseUp );
			}

			event.preventDefault();
		} );
	}
};

$.fn.izDraggable = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izDraggable' );
	}
};

$.fn.izDraggable.version = "0.2";

} )( jQuery );
//--

//-- Resizable Plugin
( function( $ ) {

var onMouseMove = function( event ) {
	var d = event.data,
		$e = d.$elem,
		len = d.direction.length,
		offsetMX,
		offsetMY;

		if ( d.oldPosition !== "fixed" ) {
			offsetMX = event.pageX - d.originalMX;
			offsetMY = event.pageY - d.originalMY;
		} else {
			offsetMX = event.clientX - d.originalMX;
			offsetMY = event.clientY - d.originalMY;
		}

	while ( len-- ) {
		switch ( d.direction.charAt( len ) ) {
			case "n": {
				var h = d.oldHeight - offsetMY;
				 if ( h < d.minHeight ) {
					h = d.minHeight;
					offsetMY = d.oldHeight - h;
				}

				$e.height( h );
				d.$client ? d.$client.height( d.oldClientHeight - offsetMY ) : null;
				$e.css( 'top', d.oldTop + offsetMY );
				break;
			}

			case "s":	{
				var h = d.oldHeight + offsetMY;
				 if ( h < d.minHeight ) {
					h = d.minHeight;
					offsetMY = h - d.oldHeight;
				}

				$e.height( h );
				d.$client ? d.$client.height( d.oldClientHeight + offsetMY ) : null;
				break;
			}
			case "w": {
				var w = d.oldWidth - offsetMX;
				if ( d.minWidth > w ) {
					w = d.minWidth;
					offsetMX = d.oldWidth - w;
				}

				$e.width( w );
				d.$client ? d.$client.width( d.oldClientWidth - offsetMX ) : null;
				$e.css( 'left', d.oldLeft + offsetMX );

				if ( d.$titleText ) {
					if ( d.oldTitleTextWidth + d.titlebarButtonsWidth > w ) {
						d.$titleText.width( w - d.titlebarButtonsWidth );
					} else {
						d.$titleText.width( "" );
					}
				}
				break;
			}

			case "e": {
				var w = d.oldWidth + offsetMX;
				if ( d.minWidth > w ) {
					w = d.minWidth;
					offsetMX = w - d.oldWidth;
				}

				$e.width( w );
				d.$client ? d.$client.width( d.oldClientWidth + offsetMX ) : null;

				if ( d.$titleText ) {
					if ( d.oldTitleTextWidth + d.titlebarButtonsWidth > w ) {
						d.$titleText.width( w - d.titlebarButtonsWidth );
					} else {
						d.$titleText.width( "" );
					}
				}
				break;
			}
		}
	}


	$( d.elem ).trigger( "izSizingEvent.izResizable" );
};

var onMouseUp = function( event ) {
	var d= event.data, $e = d.$elem;

	$( document ).unbind( ".izResizable" );

	$e.css( {
		'-moz-user-select': "",
		'-webkit-user-select': "",
		cursor: ""
	} )
	.unbind( "selectstart.izResizable" );

	if ( d.oldWidth !== $e.width() || d.oldHeight !== $e.height() ) {
		$e.trigger( "izSizeEvent.izResizable" );
	}
};

var methods = {

	create: function( event, opts ) {
		return this.each( function() {
			if (	event.target !== this ) {
				return;
			}

			var $target = $( this ),
				data = {
					$elem: $target,
					$client: null,
					$titleText: null,
					cornerSize: 4,
					minWidth: "150",
					minHeight: "100",

					direction: "",
					originalMX: 0,
					originalMY: 0,
					titlebarButtonsWidth: 0,
					oldPosition: $target.css( 'position' ),
					oldTop: this.offsetTop,
					oldLeft: this.offsetLeft,
					oldWidth: $target.width(),
					oldHeight: $target.height(),
					oldTitleTextWidth: 0,
					oldClientWidth: 0,
					oldClientHeight: 0
				};

			var x = event.layerX || event.offsetX, y = event.layerY || event.offsetY;

			if ( data.oldPosition === "fixed" || data.oldPosition === "absolute" || data.oldPosition === "relative") {
				if ( data.oldPosition === "relative" ) {
					data.oldTop = data.oldLeft = 0;
				}

				if ( y <= data.cornerSize ) {
					data.direction += "n";
				} else if ( y >= data.oldHeight - data.cornerSize ) {
					data.direction += "s";
				}

				if ( x <= data.cornerSize ) {
					data.direction += "w";
				} else if ( x >= data.oldWidth - data.cornerSize ) {
					data.direction += "e";
				}
			} else {
				if ( event.layerX ) {
					x -= data.oldLeft;
					y -= data.oldTop;
				}

				if ( y >= data.oldHeight - data.cornerSize ) {
					data.direction += "s";
				}

				if ( x >= data.oldWidth - data.cornerSize ) {
					data.direction += "e";
				}
			}

			if ( data.direction === "" ) {
				return;
			}

			if ( data.oldPosition !== "fixed" ) {
				data.originalMX = event.pageX;
				data.originalMY = event.pageY;
			} else {
				data.originalMX = event.clientX;
				data.originalMY = event.clientY;
			}

			if ( opts ) {
				if ( opts.minWidth ) {
					data.minWidth = opts.minWidth;
				}

				if ( opts.minHeight ) {
					data.minHeight = opts.minHeight;
				}

				if ( opts.client ) {
					data.$client = $( opts.client );

					data.oldClientWidth = data.$client.width();
					data.oldClientHeight = data.$client.height();
				}

				if ( opts.titleText ) {
					data.$titleText = $( opts.titleText );

					data.oldTitleTextWidth = data.$titleText.width();
					if ( data.$titleText.next().length ) {
						data.titlebarButtonsWidth = data.$titleText.next().width();
					}
				}
			}

			$target.css( {
				'-moz-user-select': '-moz-none',
				'-webkit-user-select': 'none',
				cursor: data.direction + "-resize"
			} )
			.bind( "selectstart.izResizable", function() { return false; } );

			$( document )
				.bind( "mousemove.izResizable", data, onMouseMove )
				.bind( "mouseup.izResizable", data, onMouseUp );

			event.preventDefault();
		} );
	}
};

$.fn.izResizable = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izResizable' );
	}
};

$.fn.izResizable.version = "0.2";

} )( jQuery );
//--

//-- Editable Plugin
( function( $ ) {

var methods = {

	create: function( options ) {
		return this.each( function() {
			var settings = $.extend( {}, $.fn.izEditable.defaults, options || {} );

			$( this )
				.hover( function() {
						$( this ).css( { 'background-color': "#ccc" } );
					}, function() {
						$( this ).css( { 'background-color': "" } );
					} )
				.bind( settings.trigger + ".izEditable", function() {
					var $c = $( this );

					if ( $c.find( ".izEditable" ).length ) {
						return;
					}

					var text = $c.text(),	$txt = $( "<input class='izEditable' type='text' />" );

					if ( settings.trim ) {
						$.trim( text );
					}

					$txt
						.val( text )
						.css( {
							width: settings.width || $c.width(),
							height: $c.height(),
							border: '1px dashed #ccc',
							'-moz-user-select': 'text',
							'-webkit-user-select': 'text'
						} )
						.attr( {
							maxlength: settings.maxlength
						} )
						.blur( function( event ) {
							var $t = $( this ),	val = $t.val();

							if ( settings.trim ) {
								$.trim( val );
							}

							$c.append( val !== "" ? val : settings.defaultValue );
							$t.remove();

							if ( val !== text ) {
								$c.trigger( "izChangedEvent.izEditable" );
							}
						} )
						.keyup( function( event ) {
							if ( event.keyCode === 13 ) {
								$( this ).trigger( "blur" );
							}
						} );

					$c.html( $txt );
					var t = $txt[0];
					t.focus();
					t.setSelectionRange( 0, parseInt( text.length, 10 ) );
			} );
		} );
	}
};

$.fn.izEditable = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izEditable' );
	}
};

$.fn.izEditable.version = "0.2";

$.fn.izEditable.defaults = {
	trigger: "click",
	defaultValue: "",
	trim: true,
	maxlength: 64,
	width: 0
};

} )( jQuery );
//--

//-- SpinButton Plugin
( function( $ ) {
var methods = {

	create: function( opt ) {
		return this.each( function() {
			var defaults = {
					value: 0,
					min: 0,
					max: 9,
					increment: 1
				},
				options = $.extend( {}, defaults, opt ),
				$spin = $( this ),
				$txt = $spin.find( ".izSpin-Txt" );

			$spin.data( "options", options );

			$txt
				.val( options.value )
				.before(
						$( '<input type="button" class="izSpin-Minus" value="-" />' )
							.attr( "title", "最小值為 " + options.min )
					)
				.after(
						$( '<input type="button" class="izSpin-Plus" value="+" />' )
							.attr( "title", "最大值為 " + options.max )
					)
				.change( function() {
						var o = options,
							$txt = $( this ),
							val = $txt.val();

						if ( !/\d+/.test( val ) || parseInt( val, 10 ) < o.min || parseInt( val, 10 ) > o.max ) {
							alert( "請輸入數字:\n最大值為 " + o.max + "\n最小值為 " + options.min );
							$txt.val( o.value );
						}
					} );

			$spin.find( ".izSpin-Minus" ).bind( "mousedown.izSpin", function() {
				var minus = function() {
					var $t = $txt, o = options,
						num = parseInt( $t.val(), 10 );
					if ( num > o.min ) {
						$t.val( o.value = num - o.increment );
					}
				};

				minus();

				var tid = setInterval( minus, 250 );
				$( document ).one( 'mouseup.izSpin', function() {
					clearInterval( tid );
				} );
			} );

			$spin.find( ".izSpin-Plus" ).bind( "mousedown.izSpin", function() {
				var plus = function() {
					var $t = $txt, o = options,
						num = parseInt( $t.val(), 10 );
					if ( num < o.max ) {
						$t.val( o.value = num + o.increment );
					}
				};

				plus();

				var tid = setInterval( plus, 250 );
				$( document ).one( 'mouseup.izSpin', function() {
					clearInterval( tid );
				} );
			} );
		} );
	},

	range: function( opt ) {
		return this.each( function() {
			$.extend( $( this ).data( "options" ), opt );
		} );
	},

	value: function( val ) {
		if ( arguments.length ) {
			return this.each( function() {
				var $spin = $( this ),
					num = parseInt( val, 10 ),
					o = $spin.data( "options" );

				if ( !isNaN( num ) && num > o.min && num < o.max ) {
					o.value = val;
				}
				$spin.find( ".izSpin-Txt" ).val( o.value );
			} );
		} else {
			return parseInt( $( this ).find( ".izSpin-Txt" ).val(), 10 );
		}
	}
};

$.fn.izSpinButton = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izSpinButton' );
	}
};

} )( jQuery );
//--

//-- ComboBox Plugin
( function( $ ) {

var methods = {

	create: function( opt ) {
		return this.each( function() {
			var defaults = {
					datum: null
				},
				options = $.extend( {}, defaults, opt ),
				$cbo = $( this ),
				$box = $cbo.find( ".izCombo-Box" ),
				$txt = $cbo.find( ".izCombo-Txt" ),
				$list = $cbo.find( ".izCombo-List" );

			$cbo.data( "options", options );
			$box.css( { position: 'relative', padding: 0 } );
			$txt.css( { height: "100%", margin: 0, padding: 0, border: 0 } );
			$list
				.css( { display: 'none', position: 'absolute', 'overflow-y': 'auto', 'overflow-x': 'hidden' } )
				.width( $box.width() );

			$cbo.find( ".izCombo-Dropmarker" )
				.css( { height: "100%", margin: 0, padding: 0 } )
				.bind( "click.izComboBox", function( event ) {
					$( ".izComboBox" ).not( $cbo ).find( ".izCombo-List" ).hide();

					var $ls = $list;
					if ( $ls.is( ":hidden" ) ) {
						var d = options.datum;

						$ls.empty();

						if ( d ) {
							var tmp = "";
							if ( $.isArray( d ) ) {
								var len = d.length;
								while ( len-- ) {
									tmp = "<div class='izCombo-Option'>" + d[len] + "</div>" + tmp;
								}
							} else {
								for ( var key in d ) {
									tmp += "<div class='izCombo-Option'>" + key + "</div>";
								}
							}
							$ls.append( tmp );

							$ls.find( "div" )
								.css( { overflow: 'hidden', width: "100%", 'white-space': 'pre' } )
								.hover( function() {
									$( this ).addClass( "izCombo-SelectedOption" );
								}, function() {
									$( this ).removeClass( "izCombo-SelectedOption" );
								} )
								.bind( "click.izComboBox", function() {
									$txt.val( $( this ).text() );
									$ls.hide();
								} );
						}

						var $b = $box, pos = $b.position();

						$ls
							.css( {
								left: pos.left,
								top: pos.top + $b.height() + 1,
								width: $b.width()
							} )
							.show();
					} else {
						$ls.hide();
					}

					event.stopPropagation();
				} );

		} );
	},

	hide: function() {
		return this.each( function() {
			$( this ).find( ".izCombo-List" ).hide();
		} );
	},

	value: function( str ) {
		if ( arguments.length ) {
			return this.each( function() {
				$( this ).find( ".izCombo-Txt" ).val( str );
			} );
		} else {
			return $( this ).find( ".izCombo-Txt" ).val();
		}
	}
};

$.fn.izComboBox = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izComboBox' );
	}
};

} )( jQuery );
//--

//-- MoreBox Plugin
( function( $ ) {
var methods = {

	create: function( opt ) {
		return this.each( function() {
			var defaults = {
					datum: null,
					linebreak: 4
				},
				options = $.extend( {}, defaults, opt ),
				$more = $( this ),
				$btn = $more.find( ".izMore-Btn" ),
				$list = $more.find( ".izMore-List" );

			$more.data( "options", options );
			$more.css( { position: 'relative', padding: 0 } );
			$btn.css( { margin: 0 } );
			$list.css ( { display: 'none', position: 'absolute', 'overflow-y': 'auto', 'overflow-x': 'hidden' } );

			var $wrap = $( "<div class='izMore-ItemSet'></div>" ),
				$sampleItem = $( "<span class='izMore-Item'></span>")
					.hover( function() {
							$( this ).addClass( "izMore-SelectedItem" );
						}, function() {
							$( this ).removeClass( "izMore-SelectedItem" );
						}
					)
					.bind( "click.izMoreBox", function() {
							$list.hide();
						}
					);

			var i = 0;
			for ( var key in options.datum ) {
				if ( options.linebreak > i ) {
					$sampleItem.clone( true ).data( "name", key ).html( options.datum[key] ).appendTo( $wrap );
					++i;
				} else {
					i = 0;
					$wrap.appendTo( $list );
					$wrap = $( "<div class='izMore-ItemSet'></div>" );
				}
			}
			$wrap.appendTo( $list );

			$btn.bind( "click.izMoreBox", function( event ) {
				var $m = $more, $ls = $list;

				$( ".izMoreBox" ).not( $m ).find( ".izMore-List" ).hide();

				if ( $ls.is( ":hidden" ) ) {
					var pos = $( this ).position();
					$ls
						.css( {
							'left': pos.left + $m.width(),
							'top': pos.top
						} )
						.show();
				} else {
					$ls.hide();
				}

				event.stopPropagation();
			} );
		} );
	},

	hide: function() {
		return this.each( function() {
			$( this ).find( ".izMore-List" ).hide();
		} );
	}
};

$.fn.izMoreBox = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izMoreBox' );
	}
};

} )( jQuery );
//--

//-- ListBox Plugin
( function( $ ) {

var methods = {

	update: function() {
		return this.each( function() {
			var $lst = $( this ),
				$select = $lst.find( "select.izlist-Select" ),
				datum = $lst.data( "options" ).datum,
				tmp = "";

			if ( $lst.data( "options" ).isUseObject ) {
				for ( var key in datum ) {
					tmp += "<option>" + key + "</option>";
				}
			} else {
				var len = datum.length
				while ( len-- ) {
					tmp = "<option>" + datum[len] + "</option>" + tmp;
				}
			}

			methods.empty.call( $lst );
			$select.append( tmp );
			$lst.data( "options" ).isChanged = false;
		} );
	},

	empty: function() {
		return this.each( function() {
			var $lst = $( this );
			$lst.find( "select.izlist-Select" ).empty();
			$lst.data( "options" ).isChanged = true;
		} );
	},

	add: function( sValue ) {
		return this.each( function() {
			var $lst = $( this );
			$lst.find( "select.izlist-Select" ).prepend( "<option>" + sValue + "</option>" );
			$lst.data( "options" ).isChanged = true;
		} );
	},

	del: function() {
		return this.each( function() {
			var $lst = $( this );
			$lst.find( "select.izlist-Select option:selected" ).remove();
			$lst.data( "options" ).isChanged = true;
		} );
	},

	save: function( $select ) {
		return this.each( function() {
			var $lst = $( this ),
				newDatum,
				$select = $lst.find( "select.izlist-Select" ),
				$opts = $select.find( "option" );

			if ( $lst.data( "options" ).isUseObject ) {
				newDatum = {};
				for ( var i = 0, len = $opts.length; len > i; ++i ) {
					newDatum[$( $opts[i] ).text()] = "";
				}
			} else {
				newDatum = [];
				for ( var i = 0, len = $opts.length; len > i; ++i ) {
					newDatum[i] = $( $opts[i] ).text();
				}
			}

			$lst.data( "options" ).datum = newDatum;
			$lst.data( "options" ).isChanged = false;

			//debug
			//console.log( "ListBox datum: " + Array.isArray( $lst.data("options" ).datum ) ? $lst.data("options" ).datum.toString() : Object.getOwnPropertyNames( $lst.data("options" ).datum ).toString() );
		} );
	},

	create: function( opt ) {
		return this.each( function() {
			var defaults = {
					datum: [],
					isUseObject: false,
					isUseRegExp: false,
					isChanged: false
				},
				options = $.extend( {}, defaults, opt ),
				$lst = $( this ),
				$select = $lst.find( "select.izlist-Select" );

			$lst.data( "options", options );

			methods.update.call( $lst );

			$lst.find( ".izList-Add" ).bind( "click.izListBox", function() {
				var $ls = $lst,
					$txt = $ls.find( ".izList-Txt" ),
					text = $.trim( $txt.val() );

				if ( text != "" ) {
					if ( options.isUseRegExp ) {
						try {
							new RegExp( text )
						} catch( e ) {
							alert( "RegExp: " + e.name + "\n請輸入正確的 Regular Expression" );
							return;
						}
					}

					methods.add.call( $ls, text );
					$txt.val( "" );
				}
			} );

			$lst.find( ".izList-Del" ).bind( "click.izListBox", function() {
				var $opts = $select.find( "option:selected" );
				if ( $opts.length ) {
					methods.del.call( $lst );
				}
			} );

			$lst.find( ".izList-Up" ).bind( "click.izListBox", function() {
				var $opts = $select.find( "option:selected" ),
					len = $opts.length;
				if ( len ) {
					for ( var i = 0; len > i; ++i ) {
						var $opt = $( $opts[i] );
						$opt.prev().before( $opt );
					}
					options.isChanged = true;
				}
			} );

			$lst.find( ".izList-Down" ).bind( "click.izListBox", function() {
				var $opts = $select.find( "option:selected" ),
					len = $opts.length;
				if ( len ) {
					var $opt;
					while ( len-- ) {
						$opt = $( $opts[len] );
						$opt.before( $opt.next() );
					}
					options.isChanged = true;
				}
			} );
		} );
	}
};

$.fn.izListBox = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izListBox' );
	}
};

} )( jQuery );
//--

//-- StdDialogButton Plugin
( function( $ ) {

var methods = {

	create: function( opt ) {
		return this.each( function() {
			var $sdb = $( this ),
				fn = function() {},
				defaults = {
					ok: fn,
					cancel: fn,
					apply: fn,
					help: fn
				},
				options = $.extend( {}, defaults, opt );

			( typeof options.ok !== 'function' ) ? options.ok = fn : null;
			( typeof options.cancel !== 'function' ) ? options.cancel = fn : null;
			( typeof options.apply !== 'function' ) ? options.apply = fn: null;
			( typeof options.help !== 'function' ) ? options.help = fn: null;

			$sdb.data( "options", options );
			$sdb.find( ".izOK" ).bind( "click.izStdDialogButton", options.ok );
			$sdb.find( ".izCancel" ).bind( "click.izStdDialogButton", options.cancel );
			$sdb.find( ".izApply" ).bind( "click.izStdDialogButton", options.apply );
			$sdb.find( ".izHelp" ).bind( "click.izStdDialogButton", options.help );
		} );
	},

	ok: function( fn ) {
		return this.each( function() {
			if ( typeof fn === 'function' ) {
				var $sdb = $( this );
				$sdb.find( ".izOK" ).bind( "click.izStdDialogButton", fn );
				$sdb.data( "options" ).ok = fn;
			}
		} );
	},

	cancel: function( fn ) {
		return this.each( function() {
			if ( typeof fn === 'function' ) {
				var $sdb = $( this );
				$sdb.find( ".izCancel" ).bind( "click.izStdDialogButton", fn );
				$sdb.data( "options" ).cancel = fn;
			}
		} );
	},

	apply: function( fn ) {
		return this.each( function() {
			if ( typeof fn === 'function' ) {
				var $sdb = $( this );
				$sdb.find( ".izApply" ).bind( "click.izStdDialogButton", fn );
				$sdb.data( "options" ).apply = fn;
			}
		} );
	},

	help: function( fn ) {
		return this.each( function() {
			if ( typeof fn === 'function' ) {
				var $sdb = $( this );
				$sdb.find( ".izHelp" ).bind( "click.izStdDialogButton", fn );
				$sdb.data( "options" ).help = fn;
			}
		} );
	}
};

$.fn.izStdDialogButton = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izStdDialogButton' );
	}
};

} )( jQuery );
//--

//-- NoteBook Plugin
( function( $ ) {

var methods = {

	create: function( opt ) {
		return this.each( function() {
			var $nb = $( this ),
				$tabPages = $nb.find( ".izNotebook-Page" );

			$nb.find( ".izNotebook-Tab" ).bind( "click.izNoteBook", function() {
				var $a = $( this ),
					tabNo = $a.data( "tabNo" );

				$a.siblings().removeClass( "tabSelected" );
				$a.addClass( "tabSelected" );
				$tabPages.hide();
				$( $tabPages[tabNo] ).show();
			} );
		} );
	}
};

$.fn.izNoteBook = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izNoteBook' );
	}
};

} )( jQuery );
//--

//-- DialogBox Plugin
( function( $ ) {

var curTop = 50,
	curLeft = 50;

var methods = {

	create: function( opt ) {
		if ( !$( "#izStyle-DialogBox" ).length ) {
			$( "<style id='izStyle-DialogBox' type='text/css'></style>" ).text(
				'.izDialogBox.izAbs {position:absolute;}.izDialogBox.izFixed {position:fixed;}.izDialogBox {z-index:256;top:240px;left:50px;width:300px;padding:3px;border:1px solid #ddd;background-color:#ececec;font-family:"微軟正黑體", sans-serif;}.izDialogBox input[type="button"]::-moz-focus-inner,.izDialogBox input[type="button"]::-webkit-focus-inner {border:none;}.izDialogBox-Titlebar {min-height:1em;margin:0;padding:2px;border:1px solid #CC7A00;background-image:-moz-linear-gradient(center bottom, #FF9900 50%, #FF9E0D 50%);background-image:-webkit-gradient(linear, left bottom, left top, color-stop(50%, #FF9900), color-stop(50%, #FF9E0D));color:#fdfdfd;white-space:nowrap;text-align:right;-moz-user-select:-moz-none;-webkit-user-select:none;}.izDialogBox .izDialogBox-TitleText {float:left;overflow:hidden;margin-top:-1px;white-space:nowrap;text-align:left;}input.izDialogBox-Titlebar-CloseButton {padding:0;border:none;background-color:transparent;color:#2E86C7;white-space:nowrap;}.izDialogBox-ClientArea {overflow:auto;margin:0;padding:10px 15px;background-color:#efefef;color:#090909;}.izDialogBox-ButtonPane {margin:0;padding:5px;border-top:1px solid #ddd;background-color:#f5f5f5;text-align:center;}.izDialogBox-ButtonPane input[type="button"] {margin:0 3px 1px;padding:2px 3px;border:1px solid #ccc;background-color:#fff;color:#2E86C7;}.izDialogBox-ButtonPane input[type="button"]:hover {background-color:#fdfdfd;border:1px solid #999;}'
			).appendTo( document.head );
		}

		return this.each( function() {
			var defaults = {
					position: "fixed",
					isCloseBtn: true,
					isOKBtn: true
				},
				options = $.extend( {}, defaults, opt ),
				$dlg = $( this ),
				content = $dlg.html();

			$dlg.data( "options", options ).empty();

			var $titlebar = $( "<div class='izDialogBox-Titlebar'></div>").appendTo( $dlg ),
				$titleText = $( "<span class='izDialogBox-TitleText'></span>").text( $dlg.attr( "title" ) ).appendTo( $titlebar ),
				$clientArea = $( "<div class='izDialogBox-ClientArea'></div>" ).html( content ).appendTo( $dlg ),
				$buttonPane = $( "<div class='izDialogBox-ButtonPane'></div>" ).appendTo( $dlg );

			$dlg.attr( "title", "" );

			$dlg.bind( "mousedown.izDialogBox", function( event ) {
				$( ".izDialogBox" ).css( "z-index", "" );
				$dlg.css( "z-index", 257 );
				$dlg.izResizable( event, { client: $clientArea[0], titleText: $titleText[0] } );
			} );

			$titlebar.bind( "mousedown.izDialogBox", function( event ) {
				$( ".izDialogBox" ).css( "z-index", "" );
				$dlg.css( "z-index", 257 );
				$dlg.izDraggable( event );
			} );

			if ( options.isCloseBtn ) {
				$( "<input type='button' class='izDialogBox-Titlebar-CloseButton' value='╳' />" )
					.bind( "click.izDialogBox", function() {
						$dlg.remove();
					} )
					.appendTo( $titlebar );
			}

			if ( options.isOKBtn ) {
				$( "<input type='button' class='izDialogBox-Ok' value='確定' />" )
					.bind( "click.izDialogBox", function() {
						$dlg.remove();
					} )
					.appendTo( $buttonPane );
			}

			$dlg
				.addClass( ( options.position !== "fixed") ? "izDialogBox izAbs" : "izDialogBox izFixed" )
				.offset( { top: curTop, left: curLeft } )
				.trigger( "mousedown.izDialogBox" )
				.appendTo( $( "body" )	);

			curTop += 30;
			curLeft += 30;
			if ( curTop > $( window ).height() - 300 ) {
				curTop = 50;
				curLeft = 50;
			}
		} );
	}
};

$.fn.izDialogBox = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izDialogBox' );
	}
};

} )( jQuery );
//--

//-- SlideShow Plugin
( function( $ ) {

var methods = {

	create: function( opt ) {
		if ( !$( "#izStyle-SlideShow" ).length ) {
				$( "<style id='izStyle-SlideShow' type='text/css'></style>" ).text(
				'.izSlideShow {position:fixed;top:5em;left:10em;width:580px;padding:2px;border:1px solid #ddd;background-color:#efefef;font-family:"微軟正黑體", sans-serif;-moz-user-select:-moz-none;-webkit-user-select:none;}.izSlideShow img {border:none;}.izSlideShow-Prev {position:absolute;width:50px;height:50px;top:150px;left:-28px;background:transparent url(http://udn.com/2010MAIN/img/left.png) no-repeat top left;cursor:pointer;}.izSlideShow-Next {position:absolute;width:50px;height:50px;top:150px;right:-28px;background:transparent url(http://udn.com/2010MAIN/img/right.png) no-repeat top left;cursor:pointer;}.izSlideShow-ClientArea {overflow:auto;height:480px;margin:0 auto;padding:5px 0;text-align:center;}.izSlideShow-ClientArea img {margin:0 auto;}.izSlideShow-Titlebar {overflow:hidden;min-height:1em;margin:0;padding:2px;border:1px solid #CC7A00;background-image:-moz-linear-gradient(center bottom, #FF9900 50%, #FF9E0D 50%);background-image:-webkit-gradient(linear, left bottom, left top, color-stop(50%, #FF9900), color-stop(50%, #FF9E0D));color:#fdfdfd;white-space:nowrap;text-align:left;}.izSlideShow-Titlebar-CloseButton {position:absolute;right:1px;margin:0 2px 0 0;padding:0 2px 0 0;border:none;background-color:#FF9E0D;color:#2E86C7;white-space:nowrap;}.izSlideShow-Toolbar {padding:6px 2px;background-color:#ddd;}.izSlideShow-Toolbar span.izButton {min-height:1em;margin:1px;padding:1px 2px;border:1px solid #999;border-radius:5px;background-color:#ccc;white-space:nowrap;}.izSlideShow-Toolbar span.izButton:hover {background-color:#eee;}.izSlideShow-Toolbar span.izButton.izSelected {background-color:#fafafa;}.izSlideShow-Toolbar .izSeparator {height:100%;margin:0 2px;padding:0;color:#aaa;}'
				).appendTo( document.head );
		}

		const Option = {
			IntrinsicSize: 0,
			BestFit: 1,
			Fixed: 0,
			Absolute: 1,
			Left: 0,
			Right: 1
		};

		return this.each( function() {
			var defaults = {
						images: [],
						retry: 3,
						view: 1, // IntrinsicSize: 0, BestFit: 1
						zoomFactor: 0.25,
						bgcolor: "#efefef",
						width: "580px",
						height: "480px",
						minwidth: "300px",
						minheight: "300px",
						position: 0, // fixed: 0, absolute: 1
						place: 0, // left: 0, right: 1
						offsetX: "200px",
						offsetY: "5em"
					},
					options = $.extend( {}, defaults, opt ),
					$show = $( this );

			$show.find( "img" ).each( function() {
				options.images.push( this );
			} );

			$show
				.data( "options", options )
				.addClass( "izSlideShow" )
				.html(
					"<div class='izSlideShow-Titlebar'><span class='izSlideShow-TitleText'>圖片瀏覽：</span><input type='button' class='izSlideShow-Titlebar-CloseButton' value='╳' /></div><div class='izSlideShow-Toolbar'><span class='izButton izFirst' title='最前一張'>&nbsp;|&lt;&nbsp;</span><span class='izButton izPrev' title='上一張'>&nbsp;&lt;&nbsp;</span><span class='izButton izNext' title='下一張'>&nbsp;&gt;&nbsp;</span><span class='izButton izLast' title='最後一張'>&nbsp;&gt;|&nbsp;</span><span class='izSeparator'>│</span><span class='izButton izReload' title='重新下載'>重</span><span class='izSeparator'>│</span><span class='izButton izZoomIn' title='放大'>大</span><span class='izButton izZoomOut' title='縮小'>小</span><span class='izSeparator'>│</span><span class='izButton izBestFit' title='最適大小'>適</span><span class='izButton izIntrinsicSize' title='原始大小'>原</span><span class='izSeparator'>│</span><span class='izButton izInfo' title='圖片資訊'>訊</span><span class='izLoading' style='float:right;padding-right:5px;'><img style='visibility:hidden' class='izImage-Loading' src='http://www.google.com/insights/search/resources/1964626681-loading.gif' /></span><span class='izPageCount' style='float:right;padding-right:15px;white-space:nowrap;'><span class='izPageCurrent'>0</span> / <span class='izPageTotal'>0</span></span></div><div class='izSlideShow-Prev' title='上一張'></div>	<div class='izSlideShow-Next' title='下一張'></div><div class='izSlideShow-ClientArea'></div><div class='izSlideShow-Thumbs'></div>"
				);

			var	$client = $show.find( ".izSlideShow-ClientArea" ),
				$titleText = $show.find( ".izSlideShow-TitleText" ),
				$loading = $show.find( ".izLoading img" ),
				$pageCount = $show.find( ".izPageCount" ),
				$pageCurrent = $pageCount.find( ".izPageCurrent" ),
				$pageTotal = $pageCount.find( ".izPageTotal" ).text( options.images.length ),
				$bestFit = $show.find( ".izBestFit" ),
				$intrinsicSize = $show.find( ".izIntrinsicSize" ),
				$divPrev = $show.find( ".izPrev" ),
				$divNext = $show.find( ".izNext" ),
				clientWidth = $client.width(),
				clientHeight = $client.height(),
				current = 0,
				$currentImage = null,
				timeoutID;

			if ( options.view !== Option.IntrinsicSize ) {
				$intrinsicSize.removeClass( "izSelected" );
				$bestFit.addClass( "izSelected" );
			} else {
				$bestFit.removeClass( "izSelected" );
				$intrinsicSize.addClass( "izSelected" );
			}

			var loadImage = function() {
				$loading.css( { visibility: 'visible' } );
				$client.find( ".izSlideShow-Image" ).remove();
				$pageCurrent.text( current + 1 );
				$titleText.text( "圖片瀏覽：" + options.images[current].src );
				window.clearTimeout( timeoutID );

				$currentImage = $( "<img />" )
					.addClass( "izSlideShow-Image" )
					.appendTo( $client )
					.bind( "load.izSlideShow", function() {
							this.width = this.naturalWidth;
							this.height = this.naturalHeight;

							if ( options.view === Option.BestFit ) {
								$show.find( ".izBestFit" ).trigger( "click" );
							}
							$loading.css( { visibility: 'hidden' } );
							$( this ).unbind( "load.izSlideShow" );
							window.clearTimeout( timeoutID );
						} )
					.bind( "error.izSlideShow", function() {
							if ( this.prop_Retry === undefined ) {
								this.prop_Retry = options.retry;
							}

							//debug
							//console.log( "izSlideShow this.prop_Retry: " + this.prop_Retry + ", " + this.src );
							if ( this.prop_Retry-- ) {
								$( this ).attr( 'src', options.images[current].src );
								$( this ).attr( 'src', options.images[current].src );
							} else {
								$loading.css( { visibility: 'hidden' } );
								$( this ).unbind( "error.izSlideShow" );
								window.clearTimeout( timeoutID );
							}
						} )
					.attr( 'src', options.images[current].src )
					.attr( 'src', options.images[current].src );

					( function() {
						var img = $currentImage[0];
						if ( img.naturalWidth ) {
							img.width = img.naturalWidth;
							img.height = img.naturalHeight;

							if ( options.view === Option.BestFit ) {
								$show.find( ".izBestFit" ).trigger( "click" );
							}
						} else {
							timeoutID = window.setTimeout( arguments.callee, 10 );
						}
					} )();
			};

			loadImage();

			$pageCurrent
				.izEditable( { maxlength: 3, width: "30px" } )
				.bind( "izChangedEvent.izEditable", function( event ) {
						var i = parseInt( $pageCurrent.text(), 10 );
						if ( 0 < i && i < ( options.images.length + 1 ) ) {
							current = i - 1;
							loadImage();
						} else {
							$pageCurrent.text( current + 1 );
						}
					} );

			$client.css( {
				height: parseInt( options.height, 10 ) > parseInt( options.minheight, 10 ) ? options.height : options.minheight,
				'background-color': options.bgcolor
			} );

			var mouseWheelEventHandler = function( event ) {
				var delta;
				if ( event.detail ) {
					delta = event.detail / 3;
				} else if ( event.wheelDelta ) {
					delta = -event.wheelDelta / 120;
				}

				if ( delta > 0 ) {
					$divNext.trigger( "click" );
				} else if ( delta < 0 ) {
					$divPrev.trigger( "click" );
				}
				return false;
			};

			$client.bind( 'DOMMouseScroll', mouseWheelEventHandler );
			$client.bind( 'mousewheel', mouseWheelEventHandler );

			$show
				.css( {
					position: options.position !== Option.Fixed ? "absolute" : "fixed",
					top: options.offsetY,
					right: options.place !== Option.Right ? 'auto' : options.offsetX,
					left: options.place !== Option.Left ? 'auto' : options.offsetX,
					width: parseInt( options.width, 10 ) > parseInt( options.minwidth, 10 ) ? options.width : options.minwidth
				} )
				.bind( "mousedown", function( event ) {
						$show.izResizable( event, { minWidth: "300", minHeight: "300", client: $client[0], titleText: $titleText[0] } );
					} )
				.bind( "izSizeEvent.izResizable", function( event ) {
						clientWidth = $client.width();
						clientHeight = $client.height();

						if ( $currentImage[0].naturalWidth && options.view === Option.BestFit ) {
							$show.find( ".izBestFit" ).trigger( "click" );
						}

						$show.find( ".izSlideShow-Prev" )
							.css( { top: ( $show.height() - 50 ) / 2 } );

						$show.find( ".izSlideShow-Next" )
							.css( { top: ( $show.height() - 50 ) / 2 } )
					} );

			$show.find( ".izSlideShow-Titlebar" ).bind( "mousedown", function( event ) {
				$show.izDraggable( event );
			} );

			$show.find( ".izSlideShow-Titlebar-CloseButton" ).bind( "click", function( event ) {
				$show.hide();
			} );

			$show.find( ".izFirst" ).click( function() {
				current = 0;
				loadImage();
			} );

			$show.find( ".izLast" ).click( function() {
				current = options.images.length - 1;
				loadImage();
			} );

			$divPrev.click( function() {
				var num = current - 1;

				if ( num > -1 ) {
					current = num;
					loadImage();
				}
			} );

			$divNext.click( function() {
				var num =  current + 1;

				if ( options.images.length > num ) {
					current = num;
					loadImage();
				}
			} );

			$show.find( ".izReload" ).click( function() {
				loadImage();
			} );

			$show.find( ".izZoomIn" ).click( function() {
				var img = $currentImage[0];

				if ( img.naturalWidth ) {
					img.width += Math.floor( img.width * options.zoomFactor );
					img.height += Math.floor( img.height * options.zoomFactor );
				}
			} );

			$show.find( ".izZoomOut" ).click( function() {
				var img = $currentImage[0];
				if ( img.naturalWidth ) {
					img.width -= Math.floor( img.width * options.zoomFactor );
					img.height -= Math.floor( img.height * options.zoomFactor );
				}
			} );

			$bestFit.click( function() {
				options.view = Option.BestFit;
				$intrinsicSize.removeClass( "izSelected" );
				$bestFit.addClass( "izSelected" );

				var img = $currentImage[0],
					w = img.naturalWidth,
					h = img.naturalHeight;
				if ( w ) {
					var ratio = w / h;

					img.width = clientWidth;
					img.height = Math.floor( clientWidth / ratio );

					if ( img.height > clientHeight ) {
						img.width = Math.floor( clientHeight * ratio );
						img.height = clientHeight;
					}
				}
			} );

			$intrinsicSize.click( function() {
				options.view = Option.IntrinsicSize;
				$bestFit.removeClass( "izSelected" );
				$intrinsicSize.addClass( "izSelected" );

				var img = $currentImage[0];

				if ( img.naturalWidth ) {
					img.width = img.naturalWidth;
					img.height = img.naturalHeight;
				}
			} );

			$show.find( ".izInfo" ).click( function() {
				var img = $currentImage[0];
				alert(
					"來源: " + img.src +
					"\n顯示寬度: " + img.width +
					"\n顯示高度: " + img.height +
					"\n實際寬度: " + img.naturalWidth +
					"\n實際高度: " + img.naturalHeight
				);
			} );

			$show.find( ".izSlideShow-Prev" )
				.css( { top: ( $show.height() - 50 ) / 2 } )
				.click( function() {
					$divPrev.trigger( "click" );
				} );

			$show.find( ".izSlideShow-Next" )
				.css( { top: ( $show.height() - 50 ) / 2 } )
				.click( function() {
					$divNext.trigger( "click" );
				} );

		} );
	}
};

$.fn.izSlideShow = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izSlideShow' );
	}
};

} )( jQuery );
//--

//-- Grid Plugin
( function( $ ) {

var methods = {

	insert: function( rows, index ) {
		return this.each( function() {
			var $rows = $( rows );

			methods.setRowProp.call( $( this ), $rows.get() );

			if ( !this.rows.length ) {
				$( this ).append( $rows );
			} else if ( index === -1 ) {
				$( this.rows[0] ).before( $rows );
			} else if ( typeof index === "undefined" || index < -1 || index >= this.rows.length ) {
				$( this.rows[this.rows.length - 1] ).after( $rows );
			} else {
				$( this.rows[index] ).before( $rows );
			}
		} );
	},

	"delete": function( rows ) {
		return this.each( function() {
			$( rows ).remove();

			if ( !this.rows.length ) {
				$( this ).find( "tbody:not(:first)" ).remove();
			} else {
				var tblen = this.tBodies.length;
				while ( tblen-- ) {
					if ( !this.tBodies[tblen].rows.length ) {
						$( this.tBodies[tblen] ).remove();
					}
				}
			}
		} );
	},

	clear: function() {
		return this.each( function() {
			$( this ).find( "tbody" ).empty();
			$( this ).find( "tbody:not(:first)" ).remove();
		} );
	},

	"import": function( datum, type ) { // type = array: 0, object: 1, json: 2, xml: 3
		return this.each( function() {
			switch( type ) {
				default:
				case 0: {
					var rowString = "";
					for ( var i = 0, len = datum.length; len > i; ++i ) {
						rowString += "<tr><td>" + datum[i][0] + "</td><td>" + ( datum[i][1] !== "" ? datum[i][1] : "&nbsp;" ) + "</td></tr>";
					}
					methods.insert.call( $( this ), rowString );
					break;
				}
			}

		} );
	},

	"export": function( type ) {
		var t = $( this )[0],
			settings = $( t ).data( "settings" ),
			trlen = t.rows.length,
			tdlen, tr, values, i, j, datum = [];

		if ( !trlen ) {
			return datum;
		}

		tdlen = t.rows[0].cells.length

		if ( !tdlen ) {
			return datum;
		}

		switch( type ) {
			default:
			case 0: {
				for ( i = 0; trlen > i; ++i ) {
					tr = t.rows[i];
					values = [];

					for ( ( settings.checkbox ? j = 1 : j = 0 ); tdlen > j; ++j ) {
						values.push( $.trim( tr.cells[j].textContent ) );
					}
					datum.push( values );
				}
				break;
			}
		}

		return datum;
	},

	setRowProp: function( trs ) {
		return this.each( function() {
			var settings = $( this ).data( "settings" ),
				rows = trs || this.rows,
				trlen= rows.length;

			if ( !trlen ) {
				return;
			}

			if ( !settings.editable && settings.fullRowSelect ) {
				$( rows ).bind( "click", function() {
					if ( !settings.multiselect ) {
						$( rows ).not( this ).removeClass( "izGrid-Selected" );
					}
					$( this ).toggleClass( "izGrid-Selected" );
				} );
			}

			if ( settings.checkbox ) {
				trlen = rows.length;
				while ( trlen-- ) {
					$( "<div class='izCheckbox'>&nbsp</div>" )
						.click( function() {
							var $tr = $( this.parentNode.parentNode );

							if ( !settings.multiselect ) {
								$( rows ).not( $tr ).removeClass( "izGrid-Selected" );
							}

							$tr
								.toggleClass( "izGrid-Selected" )
								.parents( ".izGrid" ).find( ".izGrid-Head .izCheckbox" )
								.css( { 'background-color': "#ddd" } );
						} )
						.appendTo(
							$( rows[trlen].insertCell( 0 ) )
								.click( function() {
									return false;
								} )
						);
				}
			}

			var tdlen = rows[0].cells.length,
				i, info, tr, td;

			trlen = rows.length;
			while ( trlen-- ) {
				tr = rows[trlen];
				for ( i = 0; tdlen > i; ++i ) {
					info = settings.columnsInfo[i];
					td = tr.cells[i];
					if ( info.minWidth ) {
						td.style.width = info.minWidth;
					}

					if (	info.textAlign ) {
						td.style.textAlign = info.textAlign;
					}

					if (	info.bgColor ) {
						td.style.backgroundColor = info.bgColor;
					}

					if (	settings.editable && info.editable ) {
						$( td ).izEditable( { defaultValue: "&nbsp;" } );
					}
				}
			}
		} );
	},

	show: function() {
		return this.each( function() {
			$( this.parentNode.parentNode ).show();
			$( this ).trigger( "izShowEvent.izGrid" );
		} );
	},

	hide: function() {
		return this.each( function() {
			$( this.parentNode.parentNode ).hide();
			$( this ).trigger( "izShowEvent.izGrid" );
		} );
	},

	destroy: function() {
		return this.each( function() {
		$( this )
				.one( "izCloseEvent.izGrid", function( event ) {
					if ( !event.veto ) {
						$( this.parentNode.parentNode ).remove();
					}
					return false;
				} )
				.trigger( "izCloseEvent.izGrid" );
		} );
	},

	create: function( options ) {
		if ( !$( "#izStyle-Grid" ).length ) {
				$( "<style id='izStyle-Grid' type='text/css'></style>" ).text(
				'.izGrid div,.izGrid span,.izGrid a,.izGrid table,.izGrid caption,.izGrid thead,.izGrid tbody,.izGrid tfoot,.izGrid tr,.izGrid th,.izGrid td {margin:0;padding:0;border:0 none;background:none;color:#000;font-size:100%;font:inherit;vertical-align:baseline;}div.izGrid {position:relative;overflow:hidden;margin:0;padding:3px;border:none;font-family:"微軟正黑體", sans-serif;}.izGrid div.izGrid-Caption {position:relative;margin:0;border:1px solid #ccc;border-bottom:none;background-color:#dedede;background-image:-moz-linear-gradient(top left, #dedede 30%, #fff 100%);background-image:-webkit-linear-gradient(top left, #dedede 30%, #fff 100%);-moz-user-select:-moz-none;-webkit-user-select:none;}.izGrid span.izGrid-CaptionText {overflow:hidden;padding:5px;color:#000;font-weight:700;white-space:nowrap;}.izGrid .izGrid-Toolbar {overflow:hidden;border:1px solid #ccc;border-bottom:none;background-color:#fafafa;white-space:nowrap;}.izGrid div.izGrid-Button {display:inline-block;position:relative;min-width:2em;margin:4px;padding:0px 2px;text-align:center;border:1px solid #f5f5f5;-moz-user-select:-moz-none;-webkit-user-select:none;}.izGrid div.izGrid-Button:hover {border-left:1px solid #ccc;border-top:1px solid #ccc;border-right:1px solid #999;border-bottom:1px solid #999;}.izGrid .izSeparator {border-right:1px solid #999;}.izGrid .izCheckbox {margin-top:2px;width:1em;height:1em;background-color:#ddd;-moz-user-select:-moz-none;-webkit-user-select:none; }.izGrid tr.izGrid-Selected td {opacity:0.8;background-image:-moz-linear-gradient(center bottom, #c5e6da 50%, #d6f7ed 100%);background-image:-webkit-gradient(linear, left bottom, left top, color-stop(50%, #d6f7ed), color-stop(70%, #eee));}.izGrid tr.izGrid-Selected .izCheckbox {background-color:#666;}.izGrid .izGrid-Head {position:relative;overflow:hidden;border:1px solid #ccc;border-bottom:none;background-color:#f5f5f5;}.izGrid .izGrid-Body {position:relative;overflow:auto;overflow-x:hidden;overflow-y:auto;border:1px solid #ccc;background-color:#fff;}.izGrid .izGrid-Head table,.izGrid .izGrid-Body table {table-layout:fixed;}.izGrid .izGrid-Head th,.izGrid .izGrid-Body td {overflow:hidden;margin:0;padding:2px 3px;border-right:1px solid #ddd;vertical-align:top;white-space:nowrap;}.izGrid .izGrid-Head th {background-image:-moz-linear-gradient(center bottom, #eee 50%, #fafafa 70%);background-image:-webkit-gradient(linear, left bottom, left top, color-stop(50%, #eee), color-stop(70%, #fafafa));}.izGrid .izGrid-Head th {height:1em;background-color:#f5f5f5;text-align:center;font-weight:normal;}.izGrid .izGrid-Head th:last-child,.izGrid .izGrid-Body td:last-child {padding-right:20px;border-right:none;}.izGrid .izGrid-Body td {border-bottom:1px solid #ccc;background-color:#fff;}.izGrid .izGrid-Body tbody:first-child tr:first-child td {border-top:none;}'
			).appendTo( document.head );
		}

		return this.each( function() {
			var $table = $( this ), settings = $.extend( {}, $.fn.izGrid.defaults, options || {} );

			var $GridDiv = $( "<div id='" + settings.id + "' title='" + settings.captionText + "' class='izGrid " + settings.classname + "'></div>" )
					.css( { width: settings.width, height: "auto" } ).insertBefore( this ),
				$headDiv = $( "<div class='izGrid-Head'></div>" ).appendTo( $GridDiv ),
				$headTable = $( "<table border='0' cellpadding='0' cellspacing='0'></table>" ).css( { width: settings.width } ).appendTo( $headDiv ),
				$bodyDiv = $( "<div class='izGrid-Body'></div>" ).css( { 'height': settings.height } ).appendTo( $GridDiv );

			// caption
			if ( settings.captionText ) {
				var $titlebarDiv = $( "<div class='izGrid-Caption'><span class='izGrid-CaptionText'>" + settings.captionText + "</span></div>" ).prependTo( $GridDiv );

				if ( settings.draggable ) {
					$titlebarDiv
						.bind( "mousedown", function( event ) {
							$GridDiv.izDraggable( event );
							return false;
						} );
				}
			}

			// resizable
			if ( settings.resizable ) {
				$GridDiv.bind( "mousedown", function( event ) {
					$GridDiv.izResizable( event, {
						client: $bodyDiv[0],
						titleText: settings.captionText ? $titlebarDiv.find( ".izGrid-CaptionText" )[0] : null,
						titlebarButtonsWidth: 0
					} );
				} );
			}

			// toolbar
			if ( settings.toolbar && settings.buttons.length ) {
				var $btn, btn, $toolbarDiv = $( "<div class='izGrid-Toolbar'></div>" );

				for ( var i = 0, btnlen = settings.buttons.length; btnlen > i; ++i ) {
					btn = settings.buttons[i];
					if ( btn.separator ) {
						$toolbarDiv.append( "<span class='izSeparator'></span>" );
					} else {
						$btn = $( "<div class='izGrid-Button'><span class='" + ( btn.classname ? btn.classname : "" )  + "'>" + btn.name + "</span></div>" );

						if ( btn.click ) {
							$btn.bind( "click", btn.click.fn );
							if ( btn.click.deselect ) {
								$btn.bind( "click", function() {
									$( $headTable[0].rows[0].cells[0] ).find( ".izCheckbox" ).css( { 'background-color': "#ddd" } );
									$table.find( "tr" ).removeClass( "izGrid-Selected" );
								} );
							}
						}

						if ( btn.dblclick ) {
							$btn.bind( "dblclick", btn.dblclick.fn );
							if ( btn.dblclick.deselect ) {
								$btn.bind( "dblclick", function() {
									$( $headTable[0].rows[0].cells[0] ).find( ".izCheckbox" ).css( { 'background-color': "#ddd" } );
									$table.find( "tr" ).removeClass( "izGrid-Selected" );
								} );
							}
						}

						$toolbarDiv.append( $btn );
					}
				}

				$headDiv.before( $toolbarDiv );
			}

			// checkbox
			if ( settings.checkbox ) {
				settings.columnsInfo.unshift( { minWidth: "1em", textAlign: "center" } );

				$( this.tHead.rows[0] ).prepend(
					$( "<th></th>" )
						.css( { width: "1em", 'text-align': "center" } )
						.click( function() {
							return false;
						} )
						.append(
							$( "<div class='izCheckbox izCheckAll'>&nbsp</div>" )
								.click( function() {
									var $rows = $table.find( "tr" );
									if ( $rows.length ) {
										if ( $rows.hasClass( "izGrid-Selected" ) ) {
											$( this ).css( { 'background-color': "#ddd" } );
											$rows.removeClass( "izGrid-Selected" );
										} else if ( settings.multiselect ) {
											$( this ).css( { 'background-color': "#666" } );
											$rows.addClass( "izGrid-Selected" );
										}
									}
								} )
						)
				);
			}

			// head
			var tr = this.tHead.rows[0], th, info;
			for ( var i = 0, thlen = tr.cells.length; thlen > i; ++i ) {
				info = settings.columnsInfo[i];
				th = tr.cells[i];
				if ( info.minWidth ) {
					th.style.width = info.minWidth;
				}
			}

			$headTable.append( this.tHead );

			// body
			if ( !this.tBodies.length  ) {
				$table.append( "<tbody></tbody>" );
			}

			$table
				.data( "settings", settings )
				.attr( { cellPadding: 0, cellSpacing: 0, border: 0 } )
				.removeAttr( "width" )
				.css( { width: settings.width } )
				.show()
				.appendTo( $bodyDiv );

			methods.setRowProp.call( $table );
		} );
	}
};

$.fn.izGrid = function( opt ) {
	if ( methods[opt] ) {
		return methods[opt].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof opt === 'object' || !opt ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + opt + ' does not exist on jQuery.izGrid' );
	}
};

$.fn.izGrid.version = "0.2";

$.fn.izGrid.defaults = {
	id: "",
	classname: "",
	captionText: "",
	toolbar: false,
	buttons:[],
		/* eg. {
			name: 'Add',
			classname: 'izAdd',
			click: { fn: function(){}, deselect: true },
			dblclick: { fn: function(){}, deselect: true }
		},
		{separator: true}
		*/
	draggable: false,
	resizable: false,
	editable: false,
	fullRowSelect: false,
	multiselect: true,
	checkbox: false,
	height: 300,
	width: 400,
	columnsInfo: [] // *required
		/* eg. {
			minWidth: 0,
			textAlign: "left",
			bgColor: #fff,
			sortable: true,
			editable: true,
			dataType: 0 // string: 0, number: 1, date:2, url: 3, e-mail: 4
		}
		*/
};

} )( jQuery );
//--


//****************************************************************************
// 全域變數
//****************************************************************************
const gVersion = "1.3.1.20140329",
	gBaseUrl = location.href,
	gBoardList = { "all": "所有看板",
		"2_av_s": "成人小檔", "2_av_b": "成人大檔", "2_cartoon": "卡通影片",
		"2_mv_s": "院線小檔", "2_mv_b": "院線大檔", "2_tv": "電視戲劇", "2_specific": "特殊影集",
		"2_dvd": "高質影音", "2_short": "綜合短片", "2_indirect": "綜合轉貼", "2_btcb": "ＢｔＣｂ",
		"4_people": "自拍寫真", "4_cg": "卡漫貼圖", "4_pd": "電子圖書", "4_other": "其他貼圖",
		"1_ad": "廣告貼圖",
		"3_music": "音樂演唱", "3_program": "軟體應用", "3_game": "遊戲程式",
		"5_text": "文學文章", "3_study": "電腦教學", "5_life": "吃喝玩樂", "5_adult": "茶魚飯後",
		"5_trade": "買賣物品", "5_politics": "政治言論", "1_mb": "會員交流"
	};


var gCurrentBoard = MyUtils.getQuerystring( gBaseUrl, "board" );
var IzConfig = MyConfig.load();

//****************************************************************************
// 處理所有頁面
//****************************************************************************

//--修改標題列的文字
if ( IzConfig.isReplaceTitleText ) {
	( function() {
		var list = IzConfig.titleReplaceList, len = list.length;
		while ( len-- ) {
			document.title = document.title.replace( list[len][0], list[len][1] );
		}
	} )();
}
//--

//****************************************************************************
// 處理 postlist 和 search 頁
//****************************************************************************
if ( /postlist\.pl/.test( gBaseUrl ) || /search\.pl/.test( gBaseUrl ) ) {

IzConfig["NewBody-KeyboardNavigation-Enable"] = false;
IzConfig["TableList-ReplySort"] = 0;


unsafeWindow.titleNth = { "no": 1, "rating": 2, "title": 3, "author": 4, "reply": 5, "view": 6, "date": 7, "archive": 8 };

var DataSource = function() {
	try {
		this.xhr = new XMLHttpRequest();
	} catch ( e ) {
		alert ( e.name + ": " + e.message + " ( E0: " + ( e.number & 0xFFFF ).toString() + " )" );
		return;
	}

	var loading = document.getElementById('izLoading');
	if ( !loading ) {
		loading = document.createElement( "div" );
		loading.id = "izLoading";
		document.body.appendChild( loading );
	}

	loading.style.display = "none";
	loading.style.zIndex = "1000";
	loading.style.position = "fixed";
	loading.style.top = "35%";
	loading.style.left = "37%";
	loading.style.width = "300px";
	loading.style.height = "2em";

	loading.style.padding = "0.8em 0";
	loading.style.border = "6px solid #660000";
	loading.style.backgroundColor = "#EEEEEE";
	loading.style.textAlign = "center";
	loading.style.fontSize = "1.5em";

	loading.innerHTML = '載入中... <img style="width:1.5em;height:1.5em;border:none;" src="http://hjchung.myweb.hinet.net/ind/loading.gif" alt="" />';

	this.loading = loading;
};

DataSource.prototype = {
	xhr: null,
	loading: null,

	postUpdateEvent: function( divElem, page ) {
		var evtMenu = document.createEvent( 'HTMLEvents' );
		evtMenu.initEvent( 'izMainToolbarUpdateEvent', false, false );

		var evtList = document.createEvent( 'HTMLEvents' );
		evtList.initEvent( 'izTableListUpdateEvent', false, false );

		//	if ( unsafeWindow.chrome ) {
			unsafeWindow.prop_Page = page;
			unsafeWindow.prop_MenuData = divElem.querySelector( "#BbsListMenu" );
			unsafeWindow.prop_ListData = divElem.querySelector( "table tbody" );
		//	} else {
			//	evtMenu.prop_Page = page;
			//	evtMenu.prop_MenuData = divElem.querySelector( "#BbsListMenu" );

			//	evtList.prop_Page = page;
			//	evtList.prop_ListData = divElem.querySelector( "table tbody" );
		//	}

		document.dispatchEvent( evtMenu );
		document.dispatchEvent( evtList );
	},

	getListPage: function( data ) {
		var that = this;

		try {
			this.xhr.abort();

			this.loading.style.display = "";

			this.xhr.addEventListener( "load", function () {
				var divElem = document.createElement( "div" );
				divElem.innerHTML = /(<!--StartReq-->(.|\n)+<!--EndReq-->)/g.exec( that.xhr.responseText )[0];

				that.postUpdateEvent(	divElem,	MyUtils.getQuerystring( data, "page" ) || 1 );
				that.loading.style.display = "none";
			}, false);

			this.xhr.addEventListener( "error", function () {
				that.loading.style.display = "none";
				alert( "Ajax Request 發生錯誤" );
			}, false );

			this.xhr.open( 'GET', "postlist.pl?" + data, true );
			if ( this.xhr.overrideMimeType ){
				this.xhr.overrideMimeType( 'text/html; charset=utf-8' );
			}
			this.xhr.send();
		} catch ( e ) {
			alert ( e.name + ": " + e.message + " ( E1: " + ( e.number & 0xFFFF ).toString() + " )" );
			return;
		}
	},

	getSearchResult: function( data ) {
		var that = this;

		try {
			this.xhr.abort();

			this.loading.style.display = "";

			this.xhr.addEventListener( "load", function () {
				var divElem = document.createElement( "div" );
				divElem.innerHTML = that.xhr.responseText;

				that.postUpdateEvent( divElem, MyUtils.getQuerystring( data, "page" ) || 1 );
				that.loading.style.display = "none";
			}, false);

			this.xhr.addEventListener( "error", function () {
				that.loading.style.display = "none";
				alert( "Ajax Request 發生錯誤" );
			}, false );

			this.xhr.open( 'POST', "search.pl", true );
			this.xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
			this.xhr.send( data );
		} catch ( e ) {
			alert ( e.name + ": " + e.message + " ( E2: " + ( e.number & 0xFFFF ).toString() + " )" );
			return;
		}
	}

};

var FilterToolbar = function( tableList ) {
	this.tableList = tableList;

	this.bar = document.createElement( "div" );
	this.bar.className = "izFilterToolbar";
	this.bar.innerHTML = "<span class='izAuthorFilterCount' style='margin:0 2px;'></span><span class='izTitleFilterCount' style='margin:0 2px;'></span><span><input type='button' class='izFilter-Switch' style='margin:0 2px;' /></span><span class='izSeparator'>│</span><span><label>快速篩選：</label></span><span><select class='izFilter-Select' style='margin:0 2px;'><option>作者</option><option>標題</option></select></span><span><input type='text' class='izFilter-Txt' value='' size='11' maxlength='300' style='margin:0 2px;' /></span><span><input type='button' class='izFilter-Add' value='新增篩選' style='margin:0 2px;' /></span><span><label style='margin:0 2px;' for='chkFilterSave'>儲存</label><input type='checkbox' name='chkFilterSave' id='chkFilterSave' style='margin:0 2px;' /></span>";

	var that = this, conf = IzConfig;;

	this.bar.getElementsByClassName( "izFilter-Switch" )[0].addEventListener( 'click', function() {
		var table = that.tableList.tableMain,
			bar = that.bar,
			hideRows = table.getElementsByClassName( "izHideRow" ),
			len = hideRows.length,
			clist = this.classList;

		if ( clist.contains( "izTurnOff" ) ) {
			while ( len-- ) {
				hideRows[len].style.display = "";
			}
			clist.remove( "izTurnOff" );
			clist.add( "izTurnOn" );
			this.value = "啟動篩選";
		} else {
			if ( len ) {
				while ( len-- ) {
					hideRows[len].style.display = "none";
				}
			} else {
				var bodyArray = that.tableList.tableBodyArray;
				for ( var page in bodyArray ) {
					bodyArray[page].hideAuthor();
					bodyArray[page].hideTitle();
				}
			}

			clist.remove( "izTurnOn" );
			clist.add( "izTurnOff" );
			this.value = "關閉篩選";
		}

		var bodyArray = that.tableList.tableBodyArray;
		for ( var page in bodyArray ) {
			bodyArray[page].alternateRowColors();
		}
	}, false );

	this.bar.getElementsByClassName( "izFilter-Add" )[0].addEventListener( 'click', function() {
		var bar = that.bar,
			table = that.tableList.tableMain,
			options = bar.getElementsByClassName( "izFilter-Select" )[0].getElementsByTagName( "option" ),
			txt = bar.getElementsByClassName( "izFilter-Txt" )[0].value = bar.getElementsByClassName( "izFilter-Txt" )[0].value.trim(),
			bSave = document.getElementById( "chkFilterSave" ).checked,
			bHide = bar.getElementsByClassName( "izFilter-Switch" )[0].classList.contains( "izTurnOff" );

		if ( options[0].selected ) {
			if ( txt === "" ) {
				alert( "請輸入完整的作者名稱" );
				return;
			}

			var tds = table.querySelectorAll( "tr:not(.izHideRow):not(:first-child) > td:nth-child(" + unsafeWindow.titleNth['author'] + ")" ),
				len = tds.length, td;
			while ( len-- ) {
				td = tds[len];
				if ( td.textContent === txt ) {
					td.parentNode.className += " izHideRow izHideAuthor";
				}
			}

			if ( bSave ) {
				var cbid = gCurrentBoard, conf = IzConfig, list = conf.removeAuthorList;
				if ( !( cbid in list ) ) {
					list[cbid] = {};
				}
				list[cbid][txt] = "";
				MyConfig.save( conf );
			}
		} else if ( options[1].selected ) {
			if ( txt === "" ) {
				alert( "請輸入正確的 Regular Expression" );
				return;
			}

			var rTitle;
			try {
				rTitle = new RegExp( txt )
			} catch( e ) {
				alert( "RegExp: " + e.name + "\n請輸入正確的 Regular Expression" );
				return;
			}

			var tds = table.querySelectorAll( "tr:not(.izHideRow):not(:first-child) > td:nth-child(" + unsafeWindow.titleNth['title'] + ")" ),
				len = tds.length, td;
			while ( len-- ) {
				td = tds[len];
				if ( rTitle.test( td.textContent ) ) {
					td.parentNode.className += " izHideRow izHideTitle";
				}
			}

			if ( bSave ) {
				var cbid = gCurrentBoard, conf = IzConfig, list = conf.removeTitleList;
				if ( !( cbid in list ) ) {
					list[cbid] = [];
				}
				list[cbid].push( txt );
				MyConfig.save( conf );
			}
		}

		if ( bHide ) {
			var trs = table.getElementsByClassName( "izHideRow" ), len = trs.length;
			while ( len-- ) {
				trs[len].style.display = "none";
			}
		}

		bar.querySelector( ".izAuthorFilterCount" ).textContent = "作者篩選數: " + table.querySelectorAll( ".izHideAuthor" ).length;
		bar.querySelector( ".izTitleFilterCount" ).textContent = "標題篩選數: " + table.querySelectorAll( ".izHideTitle" ).length;

		var bodyArray = that.tableList.tableBodyArray;
		for ( var page in bodyArray ) {
			bodyArray[page].alternateRowColors();
		}
	}, false );

	this.bar.getElementsByClassName( "izFilter-Txt" )[0].addEventListener( 'keyup', function( event ) {
		if ( event.keyCode === 13 ) {
			var evt = document.createEvent( "MouseEvents" );
			evt.initEvent( "click", true, true );
			that.bar.getElementsByClassName( "izFilter-Add" )[0].dispatchEvent( evt );
		}
	}, false );
};

FilterToolbar.prototype = {
	tableList: null,
	bar: null,

	setStyle: function() {
		var conf = IzConfig,
			styleText = ".izFilterToolbar {padding:3px 2px;font-family:'微軟正黑體', sans-serif;-moz-user-select:-moz-none;-webkit-user-select:none;";

		if ( conf["FilterToolbar-Position"] === MyConfig.Position_Fixed ) {
			styleText += "position:fixed;width:80px;background-color:#FFFFBB;text-align:center;top:" + conf["FilterToolbar-OffsetY"];

			if ( conf["FilterToolbar-Place"] !== MyConfig.Place_Left ) {
				styleText += ";right:" + conf["FilterToolbar-OffsetX"] + ";left:auto;}";
			} else {
				styleText += ";right:auto;left:" + conf["FilterToolbar-OffsetX"] + ";}";
			}

			styleText += ".izFilterToolbar span {display:block;margin:2px 0;}div.izFilterToolbar .izSeparator {display:none;}";
			styleText += ".izFilterToolbar input:not(#chkFilterSave), .izFilterToolbar select {width:75px;}";
		} else {
			styleText += "position:static;background-color:#ddd;}";

			if ( conf["FilterToolbar-Place"] !== MyConfig.Place_Bottom ) {
				this.bar.parentNode.insertBefore( this.bar, this.bar.parentNode.firstChild );
			} else {
				this.bar.parentNode.appendChild( this.bar );
			}
		}

		styleText += ".izFilterToolbar > .izSeparator {height:100%;margin:0 2px;padding:0;color:#aaa;}.izFilterToolbar > .izAuthorFilterCount,.izFilterToolbar > .izTitleFilterCount {padding:1px 5px;border:1px inset #666;vertical-align:middle;}.izFilterToolbar > .izAuthorFilterCount {background-color:#dfdfdf;color:#996;}.izFilterToolbar > .izTitleFilterCount {background-color:#d0d0d0;color:#699;}";

		var style = document.getElementById( "izStyle-FilterToolbar" );
		if ( !style ) {
			style = document.createElement( "style" );
			style.id = "izStyle-FilterToolbar";
			style.type = "text/css";
			document.head.appendChild( style );
		}
		style.textContent = styleText ;
	}
};

var TableBody = function( body, tableList ) {
	this.tableList = tableList;
	this.tbodyElement = body;
	this.theadRow = body.rows[0];
	this.theadRow.classList.add( "hyMainThead" );
	this.tbodyRows = body.querySelectorAll( "tr:not( :first-child )" );

	this.process();
};

TableBody.prototype = {
	tableList: null,
	tbodyElement: null,
	theadRow: null,
	tbodyRows: null,

	archives: null,
	isLoaded: false,

	buildNoColumn: function() {
		var no = this.theadRow.insertCell( 0 );
		no.className = "AT izThead-No";
		no.width = "30";
		no.innerHTML = "<b>No.</b>";

		var len = this.tbodyRows.length, i = len, c;
		while ( len-- ) {
			c = this.tbodyRows[len].insertCell( 0 );
			c.className = "B1";
			c.style.textAlign = "center";
			c.textContent = i--;
		}
	},

	alternateRowColors: function() {
		var trs = [];

		var tr, tbrslen = this.tbodyRows.length;
		while ( tbrslen-- ) {
			tr = this.tbodyRows[tbrslen];
			if ( tr.style.display !== 'none' ) {
				trs.push( tr );
			}
		}

		var trslen = trs.length;
		if ( trslen ) {
			var len2 = Math.floor( trslen / 2 ), tds, tdslen, clist;

			while ( len2-- ) {
				tds = trs[--trslen].cells;
				tdslen = tds.length;
				while ( tdslen-- ) {
					clist = tds[tdslen].classList;
					clist.remove( "B2" );
					clist.add( "B1" );
				}

				tds = trs[--trslen].cells;
				tdslen = tds.length;
				while ( tdslen-- ) {
					clist = tds[tdslen].classList;
					clist.remove( "B1" );
					clist.add( "B2" );
				}
			}

			if ( trslen ) {
				tds = trs[0].cells;
				tdslen = tds.length;
				while ( tdslen-- ) {
					clist = tds[tdslen].classList;
					clist.remove( "B2" );
					clist.add( "B1" );
				}
			}
		}
	},

	sortColumns: function() {
		var that = this,
			ts = unsafeWindow.titleNth,
			ths = that.theadRow.cells,
			thlen = ths.length;

		if ( !thlen ) {
			return;
		}

		ths[ts['no'] - 1].className += " izThead-No izSort-numeric";
		ths[ts['rating'] - 1].className += " izThead-Rating izSort-numeric";
		ths[ts['title'] - 1].className += " izThead-Title izSort-alpha";
		ths[ts['author'] - 1].className += " izThead-Author izSort-alpha";
		ths[ts['reply'] - 1].className += " izThead-Reply izSort-numeric";
		ths[ts['view'] - 1].className += " izThead-View izSort-numeric";
		ths[ts['date'] - 1].className += " izThead-Date izSort-numeric";

		unsafeWindow.sortColumn_Click = function() {
			var clist = this.classList,
				direction = -1,
				table = that.tableMain,
				thr = that.theadRow,
				ths = thr.cells,
				tb = that.tbodyRows[0].parentNode;
				rows = that.tbodyRows,
				trlen = rows.length;

			if ( !trlen ) {
				return;
			}

			if ( clist.contains( "izSorted-desc" ) ) {
				direction = 1;
			}

			if ( clist.contains( "izThead-Date" ) ) {
				var tr;
				while( trlen-- ) {
					tr = rows[trlen];
					tr.prop_SortKey = /([\d]{12,})/.exec( tr.querySelector( "td > a" ).href )[1];
				}
			} else {
				var tr, nth = this.nth;
				while( trlen-- ) {
					tr = rows[trlen];
					tr.prop_SortKey = this.findSortKey( tr.cells[nth] );
				}
			}

			rows = Array.prototype.slice.call( rows, 0 );

			rows.sort( function( a, b ) {
				if ( a.prop_SortKey < b.prop_SortKey ) return -direction;;
				if ( a.prop_SortKey > b.prop_SortKey ) return direction;;
				return 0;
			} );

			var tr;
			trlen = rows.length;
			while ( trlen-- ) {
				tr = rows[trlen];
				tb.insertBefore( tr, thr.nextSibling );
				tr.prop_SortKey = null;
			}
			that.alternateRowColors( rows );

			var thlen = ths.length, td, span;
			while ( thlen-- ) {
				td = ths[thlen];
				span = td.getElementsByClassName( "izSequence" )[0];
				if ( span ) {
					td.removeChild( span );
				}

				var c = td.classList;
				c.remove( "izSorted-asc" );
				c.remove( "izSorted-desc" );
			}

			var span = document.createElement( "span" );
			span.className = "izSequence";
			if ( direction !== 1 ) {
				clist.add( "izSorted-desc" )
				span.textContent = "▼";
				this.appendChild( span );
			} else {
				clist.add( "izSorted-asc" );
				span.textContent = "▲";
				this.appendChild( span );
			}
		};

		var th, clist, findSortKey;
		while ( thlen-- ) {
			th = ths[thlen];
			clist = th.classList;
			findSortKey = null;

			ths[thlen].nth = thlen;

			if ( clist.contains( "izSort-alpha" ) ) {
				findSortKey = function( cell ) {
					return cell.textContent.replace( /^\s+|\s+$/g, "").toUpperCase();
				};
			} else if ( clist.contains( "izSort-numeric" ) ) {
				findSortKey = function( cell ) {
					var key = parseFloat( cell.textContent.replace( /^[^\d.]*/, "") );
					return isNaN( key ) ? 0 : key;
				};
			} else if ( clist.contains( "izSort-date" ) ) {
				findSortKey = function( cell ) {
					return Date.parse( "1 " + cell.textContent );
				};
			}

			if ( findSortKey ) {
				th.className += " izClickable izHover";
				th.findSortKey = findSortKey;
				th.addEventListener( 'click', unsafeWindow.sortColumn_Click, false );
			}
		}
	},

	hideAuthor: function() {
		var cbid = gCurrentBoard,
			list = IzConfig.removeAuthorList,
			tds = this.tbodyElement.querySelectorAll( "tr:not(.izHideRow):not( :first-child ) > td:nth-child(" + unsafeWindow.titleNth['author'] + ")" ),
			len = tds.length;

		if ( !len ) {
			return;
		}

		if ( cbid in list ) {
			var td;
			while ( len-- ) {
				td = tds[len];
				if ( td.textContent in list[cbid] ||	td.textContent in list["all"] ) {
					td.parentNode.className += " izHideRow izHideAuthor";
					td.parentNode.style.display = "none";
				}
			}
		} else {
			var td;
			while ( len-- ) {
				td = tds[len];
				if ( td.textContent in list["all"] ) {
					td.parentNode.className += " izHideRow izHideAuthor";
					td.parentNode.style.display = "none";
				}
			}
		}
	},

	hideTitle: function() {
		var clearTitle = function( tds, rTitle ) {
			var td, len = tds.length;
			while ( len-- ) {
				td = tds[len];
				if ( rTitle.test( td.textContent ) ) {
					td.parentNode.className += " izHideRow izHideTitle";
					td.parentNode.style.display = "none";
				}
			}
		};

		var cbid = gCurrentBoard,
			list = IzConfig.removeTitleList,
			tds = this.tbodyElement.querySelectorAll( "tr:not(.izHideRow):not( :first-child ) > td:nth-child(" + unsafeWindow.titleNth['title'] + ")" );

		if ( !tds.length ) {
			return;
		}

		if ( cbid in list && list[cbid].length ) {
			clearTitle( tds, new RegExp( list[cbid].join( "|" ) + ( list["all"].length ? "|" + list["all"].join( "|" ) :	"" 	)	) );
		} else if ( list["all"].length ) {
			clearTitle( tds, new RegExp( list["all"].join( "|" ) ) );
		}
	},

	buildArchiveColumn: function() {
		var that = this,
			tbr = this.tbodyRows,
			len = tbr.length,
			actions = this.theadRow.insertCell( -1 );

		actions.className = "AT izThead-Actions";
		actions.innerHTML = "<b>暫存</b>";

		if ( !unsafeWindow.archives_AddEntry_Click ) {
			unsafeWindow.archives_AddEntry_Click = function() {
				that.archives.addRow( this.parentNode.parentNode );
				unsafeWindow.archives_buildBtn( this.parentNode.parentNode );
			};

			unsafeWindow.archives_DelEntry_Click = function() {
				var a = that.archives;
				a.delRowById( this.prop_PieceId );
				unsafeWindow.archives_buildBtn( this.parentNode.parentNode );

				if ( a.view.style.display !== "none" && a.detail.prop_PieceId == this.prop_PieceId ) {
					if ( a.grid.style.display !== "none" ) {
						a.clearDetail();
					} else {
						a.hideView();
					}
				}
			};

			unsafeWindow.archives_EditEntry_Click = function() {
				var id = this.prop_PieceId;
				if ( that.archives.isIncluded( id ) ) {
					var tr, rows = that.archives.$grid.find( "tr" ).get(), len = rows.length;
					while ( len-- ) {
						tr = rows[len];
						if ( tr.prop_Piece.id == id ) {
							that.archives.showView( Archives.Display_Detail, len + 1 );
							break;
						}
					}
				};
			}

			unsafeWindow.archives_buildBtn = function( tr ) {
				var td, id, btn,
					btnSample = document.createElement( "input" );

				btnSample.type = "button";
				btnSample.style.margin = "0";
				btnSample.style.padding = "0";

				td = tr.cells[tr.cells.length - 1];
				id = MyUtils.getQuerystring( tr.cells[2].getElementsByTagName( "a" )[0].href, "bnum" );

				td.innerHTML = "";

				if ( that.archives.isIncluded( id ) ) {
					btn = btnSample.cloneNode( true );
					btn.className = "izArticle-Storage-DelBtn ST";
					btn.value = "刪";
					btn.title = "刪除";
					btn.prop_PieceId = id;
					btn.addEventListener( "click", unsafeWindow.archives_DelEntry_Click, false );
					td.appendChild( btn );

					btn = btnSample.cloneNode( true );
					btn.className = "izArticle-Storage-EditBtn ST";
					btn.value = "編";
					btn.title = "編輯";
					btn.prop_PieceId = id;
					btn.addEventListener( "click", unsafeWindow.archives_EditEntry_Click, false );
					td.appendChild( btn );
				} else {
					btn = btnSample.cloneNode( true );
					btn.className = "izArticle-Storage-AddBtn ST";
					btn.value = "存";
					btn.title = "暫存";
					btn.prop_PieceId = id;
					btn.addEventListener( "click", unsafeWindow.archives_AddEntry_Click, false );
					td.appendChild( btn );
				}
			};
		}

		while ( len-- ) {
			tbr[len].insertCell( -1 ).className = "B1";
			unsafeWindow.archives_buildBtn( tbr[len] );
		}
	},

	process: function() {
		var conf = IzConfig;

		//-- 建立 No. 欄
		if ( conf["TableList-Enable"] ) {
			if ( this.theadRow.cells[0].classList.contains( "izThead-No" ) ) {
				this.tbodyElement.getElementsByClassName( "izThead-No" )[0].style.display = "";
				var len = this.tbodyRows.length;
				while( len-- ) {
					this.tbodyRows[len].cells[( unsafeWindow.titleNth["no"] - 1 )].style.display = "";
				}
			} else {
				this.buildNoColumn();
			}
		} else if ( this.isLoaded && this.tbodyElement.getElementsByClassName( "izThead-No" ).length ) {
			this.tbodyElement.getElementsByClassName( "izThead-No" )[0].style.display = "none";
			var len = this.tbodyRows.length;
			while( len-- ) {
				this.tbodyRows[len].cells[( unsafeWindow.titleNth["no"] - 1 )].style.display = "none";
			}
		}
		//--

		//-- 回應順序
		if ( conf["TableList-ReplySort"] ) {
			var tr, len = this.tbodyRows.length;
			while ( len-- ) {
				this.tbodyRows[len].cells[( unsafeWindow.titleNth["title"] - 1 )].querySelector( "a" ).href += "&new=1";
			}
		}
		//--

		//-- 篩選作者、篩選標題
		if ( this.isLoaded ) {
			var tr, len = this.tbodyRows.length;
			while ( len-- ) {
				tr = this.tbodyRows[len];

				//var clist = tr.classList;
				//clist.remove( "izHideRow" );
				//clist.remove( "izHideAuthor" );
				//clist.remove( "izHideTitle" );
				tr.className = "";
				tr.style.display = "";
			}
		}

		if ( conf.isAutoAuthorFilter || conf.isAutoTitleFilter ) {
			if ( conf.isAutoAuthorFilter ) {
				this.hideAuthor();
			}

			if ( conf.isAutoTitleFilter ) {
				this.hideTitle();
			}
		}

		var evt = document.createEvent( 'HTMLEvents' );
		evt.initEvent( 'izFilterToolbarUpdateEvent', false, false );
		document.dispatchEvent( evt );
		//--

		//-- 文章暫存
		this.archives = this.tableList.archives;
		if ( conf["Article-Storage-Enable"] ) {
			if ( this.tbodyElement.getElementsByClassName( "izThead-Actions" ).length ) {
				this.tbodyElement.getElementsByClassName( "izThead-Actions" )[0].style.display = "";
				var len = this.tbodyRows.length;
				while( len-- ) {
					this.tbodyRows[len].cells[( unsafeWindow.titleNth["archive"] - 1 )].style.display = "";
				}
			} else {
				this.buildArchiveColumn();
			}
		} else if ( this.isLoaded && this.tbodyElement.getElementsByClassName( "izThead-Actions" ).length ) {
			this.tbodyElement.getElementsByClassName( "izThead-Actions" )[0].style.display = "none";
			var len = this.tbodyRows.length;
			while( len-- ) {
				this.tbodyRows[len].cells[( unsafeWindow.titleNth["archive"] - 1 )].style.display = "none";
			}
		}
		//--

		//-- 欄位排序
		var theadCells = this.theadRow.cells;
		if ( conf.isRowSort ) {
			if ( theadCells.length && !theadCells[0].classList.contains( "izHover" ) ) {
				this.sortColumns();
			}
		} else if ( this.isLoaded ) {
				var td, len = unsafeWindow.titleNth["archive"] - 1; // 不含暫存欄
				while ( len-- ) {
					td = theadCells[len],
						span = td.getElementsByClassName( "izSequence" )[0];
					if ( span ) {
						td.removeChild( span );
					}

					td.className = "AT";
				}

				theadCells[0].className = "AT izThead-No";

				var ths = this.theadRow.cells,	len = ths.length;
				while ( len-- ) {
					ths[len].removeEventListener( 'click', unsafeWindow.sortColumn_Click, false );
				}
			}
		//--

		//-- 修正雙色列
		this.alternateRowColors();
		//

		this.isLoaded = true;
	}
};

var TableList = function( table ) {
	table.classList.add( "hyMainTable" );
	this.tableMain = table;

	var style = document.createElement( "style" );
	style.id = "izStyle-TableList";
	style.type = "text/css";
	style.textContent = '.izHideAuthor > td,.izHideAuthor a,.izHideAuthor font {background-color:#dfdfdf;color:#996;}.izHideTitle > td,.izHideTitle font,.izHideTitle a {background-color:#d0d0d0;color:#699;}td.izHover:hover {background-color:#999;cursor:pointer;}.izHighlight {outline:2px solid red;}.izHighlight a:focus {background-color:#333;color:#fff;}';
	document.head.appendChild( style );

	this.process();

	var that = this;
	document.addEventListener( 'izTableListUpdateEvent', function( event ) {
		//	if ( unsafeWindow.chrome ) {
			that.addBody( unsafeWindow.prop_ListData, unsafeWindow.prop_Page );
		//	} else {
			//that.addBody( event.prop_ListData, event.prop_Page );
		//	}
		return false;
	}, false );
};

TableList.prototype = {
	tableMain: null,

	tableBodyArray: { /* p1: new TableBody */},
	filterToolbar: null,
	archives: null,

	isAppend: false,
	isLoaded: false,

	buildArchives: function() {
		var that = this;

		// 建立暫存鈕
		$( "<span class='ST izArchivesBtn'>暫存<span>" )
			.css( { position:'fixed', 'z-index':257, top:"0.5em", left:"3.5em" } )
			.hover(
				function() {
					this.className = "ST_IN izArchivesBtn";
				}, function() {
					this.className = "ST izArchivesBtn";
				} )
			.click( function() {
				var pview = document.getElementsByClassName( "izPiece" )[0];
				if ( !pview ||	pview.style.display === "none" ) {
					that.archives.showView( Archives.Display_Grid );
				} else {
					that.archives.hideView( );
				}
			} )
			.appendTo( document.body );

		document.getElementsByClassName( "izPiece-DeleteBtn" )[0].parentNode.addEventListener( "click", function( event ) {
			if ( event.target.classList.contains( "izPiece-DeleteBtn" ) ) {
				var tbr = that.tableMain.querySelectorAll( "tr:not(.hyMainThead)" ), len = tbr.length;
				while ( len-- ) {
					unsafeWindow.archives_buildBtn( tbr[len] );
				}
			}
		}, false );


		window.addEventListener( "storage", function( event ) {
			var a = that.archives;
			if ( !a ) {
				return;
			}

			a.init();
			var re = new RegExp( "izArticle-Piece:\\d+" );
			if ( event.key !== null && re.test( event.key ) ) {	// !clear
				var tbr = that.tableMain.querySelectorAll( "tr:not(.hyMainThead)" ), len = tbr.length;
				var tr, pid, pp= new a.itemProto;

				if ( event.oldValue === null ) { // new item
					MyUtils.extend( pp, JSON.parse( localStorage.getItem( event.key ) ) );
				} else if ( event.newValue === null ) { // remove
					MyUtils.extend( pp, JSON.parse( event.oldValue ) );
				}

				while ( len-- ) {
					tr = tbr[len];
					pid = MyUtils.getQuerystring( tr.cells[2].getElementsByTagName( "a" )[0].href, "bnum" );
					if ( pid == pp.id ) {
						unsafeWindow.archives_buildBtn( tr );
						break;
					}
				}

				if ( event.newValue === null ) { // remove
					if ( pid = a.detail.prop_PieceId ) {
						if( a.grid.style.display === "none" ) {
							a.hideView( true );
						} else {
							a.clearDetail();
						}
					}
				}
			}
		}, false);
	},

	updateFilterToolbar: function() {
		var conf = IzConfig,
		btn = this.filterToolbar.bar.getElementsByClassName( "izFilter-Switch" )[0],
		clist = btn.classList;

		this.filterToolbar.bar.getElementsByClassName( "izAuthorFilterCount" )[0].textContent = "作者篩選數: " + this.tableMain.getElementsByClassName( "izHideAuthor" ).length;
		this.filterToolbar.bar.getElementsByClassName( "izTitleFilterCount" )[0].textContent = "標題篩選數: " + this.tableMain.getElementsByClassName( "izHideTitle" ).length;

		if ( conf.isAutoTitleFilter || conf.isAutoAuthorFilter ) {
			var tds = this.tableMain.getElementsByClassName( "izHideRow" ), len = tds.length;
			while ( len-- ) {
				tds[len].style.display = "none";
			}

			clist.remove( "izTurnOn" );
			clist.add( "izTurnOff" );
			btn.value = "關閉篩選";
		} else {
			clist.remove( "izTurnOff" );
			clist.add( "izTurnOn" );
			btn.value = "啟動篩選";
		}
	},

	process: function() {
		var that = this, conf = IzConfig;

		//-- 快速篩選工具列
		if ( conf.isFilterToolbar ) {
			if ( this.filterToolbar ) {
				this.filterToolbar.bar.style.display = "";
				this.filterToolbar.setStyle();
				this.updateFilterToolbar();
			} else {
				this.filterToolbar = new FilterToolbar( this );
				this.tableMain.parentNode.insertBefore( this.filterToolbar.bar, null );
				this.filterToolbar.setStyle();
				this.updateFilterToolbar();
			}

			if ( !unsafeWindow.filterToolbar_Update ) {
				unsafeWindow.filterToolbar_Update = function() {
					that.updateFilterToolbar();
				};
			}

			document.addEventListener( 'izFilterToolbarUpdateEvent', unsafeWindow.filterToolbar_Update, false );
		} else if ( this.isLoaded && this.filterToolbar ) {
			var tds = this.tableMain.getElementsByClassName( "izHideRow" ),	len = tds.length;
			while ( len-- ) {
				tds[len].style.display = "none";
			}

			this.filterToolbar.bar.style.display = "none";
			document.removeEventListener( 'izFilterToolbarUpdateEvent', unsafeWindow.filterToolbar_Update, false );
		}
		//--

		//-- 文章暫存
		if ( conf["Article-Storage-Enable"] ) {
			if ( this.archives ) {
				document.body.getElementsByClassName( "izArchivesBtn" )[0].style.display = "";
				this.archives.init();
			} else {
				this.archives = new Archives
				this.buildArchives();
			}
		} else if ( this.isLoaded && this.archives ) {
			this.archives.hideView();
			document.body.getElementsByClassName( "izArchivesBtn" )[0].style.display = "none";
		}
		//--

		this.isLoaded = true;
	},

	addBody: function( body, page ) {

		if ( this.isAppend ) {
			this.tableMain.appendChild( body );
		} else {
			this.tableMain.innerHTML = "";
			this.tableMain.appendChild( body );
		}

		var oTableBody = new TableBody( body, this );
		this.tableBodyArray[page] = oTableBody;
	},

	resetAll: function() {
		this.process();
		for ( var page in this.tableBodyArray ) {
			this.tableBodyArray[page].process();
		}
	}
};

var gDataSource = new DataSource;

//-- 看板頁面處理
var PageHandler = ( function() {
	var Layout = function() {
		this.tiltebar = document.body.querySelector( "#PageCenter > table.AP > tbody > tr > th.AT > table" );
		this.tiltebar.className = "hyTiltebar AT";
		this.mainContents = document.getElementById( "BbsList" );
		this.container = this.mainContents.parentNode;
	};

	Layout.prototype = {
		container: null,
		tiltebar: null,
		mainContents: null,

		oTableList: null,

		buildFixedMenu: function() {
			var style = document.getElementById( "izStyle-FixedMenu" );
			if ( !style ) {
				style = document.createElement( "style" );
				style.id = "izStyle-FixedMenu";
				style.type = "text/css";
				style.textContent = '.izFixedMenu {list-style-type:none;position:fixed;top:2em;left:15px;margin:0;padding:0;width:14em;font-family:"微軟正黑體", sans-serif;}.izFixedMenu ul {margin:0;padding:0}.izFixedMenu li {display:inline-block;margin:1px;padding:1px;width:5em;border:1px solid #ccc;background-color:#f9ffbe;color:#1C94C4;text-align:center;}';
				document.head.appendChild( style );
			}

			var items = document.body.querySelectorAll( "#AllMenu dd a" ),
				menu = document.createElement( "div" ),
				htm = "<ul>";

			var len = items.length;
			while ( len-- ) {
				htm = "<li><a href='" + items[len].href + "' target='_top'>" + items[len].textContent + "</a></li> " + htm;
			}

			menu.className = "izFixedMenu";
			menu.innerHTML = htm + "</ul>";
			document.body.appendChild( menu );

			menu.prop_IsChanged = false;

			return menu;
		},

		initFixedMenu: function() {
			var conf = IzConfig,
				menu = document.body.getElementsByClassName( "izFixedMenu" )[0],
				menuStyle = menu.style,
				inputs = menu.getElementsByTagName( "input" ),
				lis = menu.getElementsByTagName( "li" ),
				as = menu.getElementsByTagName( "a" ),
				hideItems = conf["FixedMenu-HideItems"];

			if ( conf["FixedMenu-HideFloatMenu"] ) {
				document.getElementById( "AllMenu" ).style.display = "none";
			} else {
				document.getElementById( "AllMenu" ).style.display = "";
			}

			menuStyle.width = conf["FixedMenu-Width"];
			menuStyle.backgroundColor = "transparent";
			menuStyle.position = conf["FixedMenu-Position"];
			menuStyle.zIndex = "257";
			menuStyle.fontSize = conf["FixedMenu-FontSize"];
			menuStyle.top = conf["FixedMenu-OffsetY"];
			if ( conf["FixedMenu-Place"] !== "right" ) {
				menuStyle.left = conf["FixedMenu-OffsetX"];
				menuStyle.right = 'auto';
			} else {
				menuStyle.left = 'auto';
				menuStyle.right = conf["FixedMenu-OffsetX"];
			}

			var ilen = inputs.length, input;
			while ( ilen-- ) {
				input = inputs[ilen];
				input.parentNode.removeChild( input );
			}

			var lilen = lis.length, st;
			while ( lilen-- ) {
				st = lis[lilen].style;
				st.width = "5em";
				st.display = "";
			}

			var hilen = hideItems.length;
			while ( hilen-- ) {
				lis[hideItems[hilen]].style.display = "none";
			}

			var alen = as.length, a;
			while ( alen-- ) {
				a = as[alen];
				a.removeAttribute( "accessKey" );
				a.removeAttribute( "title" );
			}

			if ( conf["FixedMenu-AccessKey-Enable"] ) {
				for ( var key in conf["FixedMenu-AccessKey"] ) {
					as[key].accessKey = conf["FixedMenu-AccessKey"][key];
					as[key].title = "Shift-Alt-" + conf["FixedMenu-AccessKey"][key];
				}
			}

			var evt = document.createEvent( 'HTMLEvents' );
			evt.initEvent( 'izRemoveFixedMenuEvent', false, false );
			document.dispatchEvent( evt );
		},

		buildSearchbar: function( bar ) {
			var cbid = gCurrentBoard,
				conf = IzConfig,
				list = conf.ezSearchList,
				days = conf.dailySearch,
				bSearchDate = conf.isSearchDate,
				sampleBtn = document.createElement( "span" );

			sampleBtn.style.padding = "1px 4px";
			sampleBtn.className = "izEzSearchBtn ST";

			var customBtn = function( words, bar, sampleBtn ) {
				var target = "target='_self'";
				if ( conf.isEzSearchOpenNew ) {
					target = "target='_blank'";
				}

				for ( var btn = null, i = 0, len = words.length; len > i; ++i ) {
					btn = sampleBtn.cloneNode( true );
					btn.addEventListener( 'mouseover', function() { this.className = "izEzSearchBtn ST_IN"; }, false );
					btn.addEventListener( 'mouseout', function() { this.className = "izEzSearchBtn ST"; }, false );
					btn.innerHTML = words[i];
					bar.appendChild( btn );
				}
			};

				// 日期鈕
			if ( bSearchDate && days > 0 ) {
				var dates = [], objDate = new Date();
				while ( days-- ) {
					dates.push( ( ( objDate.getMonth() + 1 ) + "-" + objDate.getDate() ).replace( /\b(\d)\b/g, "0$1" ) );
					objDate = new Date( objDate.getTime() - 86400000 );
				}

				customBtn( dates, bar, sampleBtn );
			}

			if ( list["all"].length ) {
				customBtn( list["all"], bar, sampleBtn );
			}

			if ( cbid in list ) {
				customBtn( list[cbid], bar, sampleBtn );
			}

			bar.addEventListener( 'click', function( event ) {
				if ( event.target.parentNode === this ) {
					document.getElementById( "kws" ).value = event.target.textContent;
					unsafeWindow.Sch( 0 );
				}
			}, false );
		},

		setSearchbarStyle: function( sbar ) {
			var conf = IzConfig,
				styleText = ".izEzSearchBar {padding:0 2px;font-family:'微軟正黑體', sans-serif;-moz-user-select:-moz-none;-webkit-user-select:none;";

			if ( conf["EzSearchbar-Position"] !== MyConfig.Position_Fixed ) {
				styleText += "position:static;background-color:#ddd;text-align:left;}.izEzSearchBar span {height:auto;}";

				if ( conf["EzSearchbar-Place"] !== MyConfig.Place_Bottom ) {
					this.container.insertBefore( sbar, this.mainContents );
				} else {
					this.container.appendChild( sbar );
				}
			} else {
				styleText += "position:fixed;z-index:100;width:80px;background-color:#FFFFBB;text-align:center;top:" + conf["EzSearchbar-OffsetY"];

				if ( conf["EzSearchbar-Place"] !== MyConfig.Place_Left ) {
					styleText += ";right:" + conf["EzSearchbar-OffsetX"] + ";left:auto;}";
				} else {
					styleText += ";right:auto;left:" + conf["EzSearchbar-OffsetX"] + ";}";
				}

				styleText += ".izEzSearchBar span {display:block;margin:2px 0;word-wrap:break-word;}";
			}

			var style = document.getElementById( "izStyle-Searchbar" );
			if ( !style ) {
				style = document.createElement( "style" );
				style.id = "izStyle-Searchbar";
				style.type = "text/css";
				document.head.appendChild( style );
			}
			style.textContent = styleText;
		},

		setMainToolbarStyle: function( mbar ) {
			var conf = IzConfig,
				styleText = "#BbsListMenu {font-family:'微軟正黑體', sans-serif;padding:1px 0;border:none;";

			if ( conf["MainToolbar-Position"] !== MyConfig.Position_Fixed ) {
				styleText += "position:static;text-align:left;}#BbsListMenu dl {display:inline-block;width:auto;height:auto;margin:0 2px;;border:none;text-align:center;white-space:nowrap}#BbsListMenu dt {height:auto;line-height:normal;text-align:inherit}";

				if ( conf["MainToolbar-Place"] !== MyConfig.Place_Bottom ) {
					this.mainContents.insertBefore( mbar, this.mainContents.firstChild );
				} else {
					this.mainContents.appendChild( mbar );
				}
			} else {
				styleText += "padding:0 2px;position:fixed;z-index:100;top:" + conf["MainToolbar-OffsetY"];

				if ( conf["MainToolbar-Place"] !== MyConfig.Place_Left ) {
					styleText += ";right:" + conf["MainToolbar-OffsetX"] + ";left:auto;}";
				} else {
					styleText += ";right:auto;left:" + conf["MainToolbar-OffsetX"] + ";}";
				}
			}

			var style = document.getElementById( "izStyle-MainToolbar" );
			if ( !style ) {
				style = document.createElement( "style" );
				style.id = "izStyle-MainToolbar";
				style.type = "text/css";
				document.head.appendChild( style );
			}
			style.textContent = styleText;
		},

		setNewBodyStyle: function() {
			var conf = IzConfig,
				styleText = "#izNewBody {width:" + conf["NewBody-Width"];

			if ( conf["NewBody-Position"] !== "absolute" ) {
				styleText += ";position:relative;margin:" + conf["NewBody-MarginTop"] + " " + ( conf["NewBody-Center"] ? 'auto': conf["NewBody-MarginLeft"] );
			} else {
				styleText += ";position:absolute;z-index:9;top:" + conf["NewBody-OffsetY"];
				if ( conf["NewBody-Place"] !== "right" ) {
					styleText += ";right:auto;left:" + conf["NewBody-OffsetX"];
				} else {
					styleText += ";left:auto;right:" + conf["NewBody-OffsetX"];
				}
			}
			styleText += ";}#izNewBody, #izNewBody th, #izNewBody td, #izNewBody input, #izNewBody select {font-family:'微軟正黑體', sans-serif;font-size:" + conf["NewBody-FontSize"] + ";}" +
				"#izNewBody .List td {white-space:nowrap;line-height:1.3em;font-size:" + conf["NewBody-Cell-FontSize"] + ";min-width:" + conf["NewBody-Column-MinWidth"] + ";}" +
				"#izNewBody .List td:nth-child(4){min-width:7em;}" +
				"#izNewBody .List td a {line-height:1.3em;} " +
				"#izNewBody .List td .ST {width:1.5em;height:1.3em;border-width:0;font-size:" + conf["NewBody-Cell-FontSize"] + ";}" +
				"#BbsListMenu dt {font-size:" + conf["NewBody-Cell-FontSize"] + ";}" +
				"#izNewBody .List td dt {width:auto;max-width:" + conf["NewBody-TitleColumn-MaxWidth"] + ";}";

			var style = document.getElementById( "izStyle-NewBody" );
			if ( !style ) {
				style = document.createElement( "style" );
				style.id = "izStyle-NewBody";
				style.type = "text/css";
				document.head.appendChild( style );
			}
			style.textContent = styleText;
		},

		buildAll: function() {
			var d = document,
				b = d.body,
				that = this,
				conf = IzConfig;

			// 看板
			var newbody = d.getElementById( "izNewBody" );
			if ( conf.isNewBody ) {
				if ( newbody ) {
					this.setNewBodyStyle();
				} else {
					b.querySelector( "#PageCenter > table.AP" ).style.display = "none";

					var newbody = d.createElement( "div" );
					newbody.id = "izNewBody"

					while ( this.container.firstElementChild ) {
						newbody.appendChild( this.container.firstElementChild );
					}

					this.container = newbody;

					// tiltebar
					this.container.insertBefore( this.tiltebar, this.container.firstElementChild );

					this.setNewBodyStyle();
					b.appendChild( newbody );
				}
			} else {
				if ( newbody ) {
					if ( confirm( "要顯示原看板，需重整頁面。\n立刻重整?" ) ) {
						window.location = gBaseUrl;
					}
				}
			}

			//-- 自訂搜尋鈕和自訂搜尋工具列
			var ezSearchbar = document.body.getElementsByClassName( "izEzSearchBar" )[0];
			if ( conf.isEzSearch ) {
				if ( ezSearchbar ) {
					while ( ezSearchbar.firstChild ) {
						ezSearchbar.removeChild( ezSearchbar.firstChild );
					}
				} else {
					ezSearchbar = document.createElement( "div" );
					ezSearchbar.className = "izEzSearchBar";
					this.container.insertBefore( ezSearchbar, this.mainContents );
				}

				this.buildSearchbar( ezSearchbar );
				this.setSearchbarStyle( ezSearchbar );

				if ( ezSearchbar.getElementsByTagName( 'span' ).length ) {
					ezSearchbar.style.display = "";
				} else {
					ezSearchbar.style.display = "none";
				}
			} else if ( this.isLoaded && ezSearchbar ) {
				ezSearchbar.style.display = "none";
			}
			//--

			// 主工具列
			var mainToolbar = d.getElementById( "BbsListMenu" );
			if ( conf["MainToolbar-Enable"] ) {
				this.setMainToolbarStyle( mainToolbar );
			} else {
				var izMainToolbarStyle = document.getElementById( "izStyle-MainToolbar" );
				if ( izMainToolbarStyle ) {
					izMainToolbarStyle.textContent = "";
				}
			}

			// 文章列表
			conf["TableList-Enable"] = conf.isFilterToolbar || conf.isAutoAuthorFilter ||
														conf.isAutoTitleFilter || conf.isRowSort || conf["Article-Storage-Enable"] ||
														( conf.isFixedMenu && conf["FixedMenu-AjaxLoad-Enable"] );

			if ( conf["TableList-Enable"] ) {
				if ( this.oTableList ) {
					this.oTableList.resetAll();
				} else {

					// 初次載入, 第一頁
					var tableMain = this.mainContents.querySelector( "table.List" );
					this.oTableList = new TableList( tableMain );
					this.oTableList.addBody( tableMain.tBodies[0], 1 );

					unsafeWindow.ListPage = function( n ) {
						gDataSource.getListPage( "board=" + gCurrentBoard + "&page=" + n );
					};

					unsafeWindow.Sch = function( n ) {
						gDataSource.getSearchResult( "hot=" + n + "&kws=" + document.getElementById('kws').value + "&board=" + gCurrentBoard );
					};

					unsafeWindow.SchPage = function( n ) {
						gDataSource.getSearchResult( n + "&board=" + gCurrentBoard );
					};

					document.addEventListener( 'izMainToolbarUpdateEvent', function( event ) {
						//	if ( unsafeWindow.chrome ) {
							that.mainContents.replaceChild( unsafeWindow.prop_MenuData, document.getElementById( "BbsListMenu" ) );
						//	} else {
							//	that.mainContents.replaceChild( event.prop_MenuData, document.getElementById( "BbsListMenu" ) );
						//	}
						return false;
					}, false );
				}
			} else {
				if ( this.oTableList ) {
					this.oTableList.resetAll();
				}
			}

			//-- 固定選單
			var fixedMenu = b.getElementsByClassName( "izFixedMenu" )[0];
			if ( conf.isFixedMenu ) {
				if ( fixedMenu ) {
					fixedMenu.style.display = "";
				} else {
					fixedMenu = this.buildFixedMenu();
				}

				if ( fixedMenu.prop_IsChanged ) {
					var evt = d.createEvent( "MouseEvents" );
					evt.initEvent( "click", true, true );
					fixedMenu.getElementsByClassName( "izMenu-OkBtn" )[0].dispatchEvent( evt );
				} else {
					this.initFixedMenu();
				}

				if ( conf["FixedMenu-AjaxLoad-Enable"] ) {
					if ( !fixedMenu.prop_isUseAjax ) {

						// 側邊選單
						if ( !unsafeWindow.fixedMenu_Click ) {
							unsafeWindow.fixedMenu_Click = function( event ) {
									var brd = MyUtils.getQuerystring( this.href, "board" )
									if ( brd && brd in gBoardList ) {
										gCurrentBoard = brd;
										unsafeWindow.ListPage( "1" );

										b.getElementsByClassName( "hyTiltebar" )[0].rows[0].cells[1].textContent = this.textContent;
										var tmpTitle = document.title.replace( /.*區｜/, this.textContent + "區｜" );
										var list = IzConfig.titleReplaceList, len = list.length;
										while ( len-- ) {
											tmpTitle = tmpTitle.replace( list[len][0], list[len][1] );
										}
										document.title = tmpTitle;
										document.querySelector( "select[name=selection]" ).selectedIndex = 0;
									}
									return false;
								}
						}

						var as = fixedMenu.getElementsByTagName( "a" ), alen = as.length, a;
						while ( alen-- ) {
							a = as[alen];
							a.onclick = unsafeWindow.fixedMenu_Click;
						}

						// 下拉式導覽選單
						if ( !unsafeWindow.OldJsUrl ) {
							unsafeWindow.OldJsUrl = unsafeWindow.JsUrl;
							unsafeWindow.JsUrl = function() {
								var oldBoard = gCurrentBoard;
								switch ( this.selectedIndex ) {
									case 09: gCurrentBoard = "2_av_b"; break;
									case 10: gCurrentBoard = "2_av_s"; break;

									case 12: gCurrentBoard = "2_dvd"; break;
									case 13: gCurrentBoard = "2_mv_b"; break;
									case 14: gCurrentBoard = "2_mv_s"; break;
									case 15: gCurrentBoard = "2_tv"; break;
									case 16: gCurrentBoard = "2_specific"; break;
									case 17: gCurrentBoard = "2_cartoon"; break;
									case 18: gCurrentBoard = "2_short"; break;
									case 19: gCurrentBoard = "2_indirect"; break;
									case 20: gCurrentBoard = "2_btcb"; break;

									case 24: gCurrentBoard = "4_people"; break;
									case 25: gCurrentBoard = "4_cg"; break;
									case 26: gCurrentBoard = "4_other"; break;
									case 27: gCurrentBoard = "1_ad"; break;
									case 28: gCurrentBoard = "4_pd"; break;
									case 29: gCurrentBoard = "3_music"; break;
									case 30: gCurrentBoard = "3_game"; break;
									case 31: gCurrentBoard = "3_program"; break;
									case 32: gCurrentBoard = "3_study"; break;
									case 33: gCurrentBoard = "5_trade"; break;
									case 34: gCurrentBoard = "5_life"; break;
									case 35: gCurrentBoard = "5_adult"; break;

									case 37: gCurrentBoard = "1_mb"; break;
									case 38: gCurrentBoard = "5_politics"; break;
									case 39: gCurrentBoard = "5_text"; break;

									default: return;
								}

								if ( oldBoard !== gCurrentBoard ) {
									unsafeWindow.ListPage( "1" );

									var boardName = this.options[this.selectedIndex].textContent.substring( 1, 5 );
									b.getElementsByClassName( "hyTiltebar" )[0].rows[0].cells[1].textContent = boardName;
									var tmpTitle = document.title.replace( /.*區｜/, boardName + "區｜" );
									var list = IzConfig.titleReplaceList, len = list.length;
									while ( len-- ) {
										tmpTitle = tmpTitle.replace( list[len][0], list[len][1] );
									}
									document.title = tmpTitle;

								} else {
									unsafeWindow.OldJsUrl();
								}
								return false;
							};
						}

						document.querySelector( "select[name=selection]" ).onchange = unsafeWindow.JsUrl;

						fixedMenu.prop_isUseAjax = true;
					}
				} else if ( this.isLoaded ) {
					if ( fixedMenu.prop_isUseAjax ) {
						// 側邊選單
						var as = fixedMenu.getElementsByTagName( "a" ), alen = as.length, a;
						while ( alen-- ) {
							a = as[alen];
							a.onclick = "";
						}

						// 下拉式看板選單
						document.querySelector( "select[name=selection]" ).onchange = unsafeWindow.OldJsUrl;

						fixedMenu.prop_isUseAjax = false;
					}
				}

			} else if ( fixedMenu ) {
				d.getElementById( "AllMenu" ).style.display = "";
				fixedMenu.style.display = "none";
			}
			//--

			//-- 自動檢查更新
			if ( conf["Update-isAuto"] ) {
				if ( +new Date() > 86400000 * conf["Update-Interval"] + conf["Update-LastUpdateDate"] ) {
					MyUtils.checkUpdate( true );
				}
			}
			//--

			this.isLoaded = true;
		},

	};

	var _instance = null;
	return ( {
		getInstance: function() {
			if ( _instance === null ) {
				_instance = new Layout();
			}
			return _instance;
		}
	} );
} )();
//--


//-- 看板偏好設定 OptionsDialog Prototype
var OptionsDialog = ( function() {
	var options = function() {
		var style = document.createElement( "style" );
		style.id = "izStyle-OptionsDialog";
		style.type = "text/css";
		style.textContent =	'#izOptionsDialog input[type="button"],#izOptionsDialog input[type="text"],#izOptionsDialog fieldset {border:1px solid #aaa;border-radius:4px;color:#666;}#izOptionsDialog input[type="button"] {margin-bottom:1px;padding:2px 3px;background:#aaa;color:#fff;}#izOptionsDialog input[type="button"]:hover {background:#999;color:#fff;}#izOptionsDialog input[type="button"]::-moz-focus-inner,#izOptionsDialog input[type="button"]::-webkit-focus-inner {border:none;}#izOptionsDialog fieldset {margin:5px 0;padding:3px;}#izOptionsDialog input:disabled,#izOptionsDialog input:disabled:hover {border:1px solid #cbcbcb;background:#cbcbcb;color:#fff;}#izOptionsDialog p {margin:3px 0;}#izOptionsDialog input[type="checkbox"],#izOptionsDialog input[type="radio"] {vertical-align:bottom;}#izOptionsDialog *:not(input) {-moz-user-select:-moz-none;-webkit-user-select:none;}#izOptionsDialog .izSwitchBox {margin:5px 2px;padding:2px;border:1px dashed #000;}#izOptionsDialog {position:fixed;z-index:254;top:20px;left:350px;min-width:26em;margin:0 auto;padding:0 10px 2px;border:1px solid #e0e0e0;border-radius:10px;background-color:#fff;color:#666;box-shadow:3px 3px 3px #ccc;font-family:"微軟正黑體", sans-serif;}#izOptionsDialog > .izTitlebar {margin:0 -10px 15px;padding:3px 10px;border-radius:10px 10px 0 0;background-image:-moz-linear-gradient(right center, #fafafa 70%, #f5f5f5 100%);background-image:-webkit-gradient(linear, left bottom, left top, color-stop(0.7, #fafafa), color-stop(0.5, #f5f5f5));color:#aaa;}#izOptionsDialog input.izTitlebar-CloseButton {float:right;padding:0;border:none;background-color:transparent;color:#aaa;}#izOptionsDialog input.izTitlebar-CloseButton:hover {background-color:transparent;color:#aaa;}#izDialogBtn {margin:5px;text-align:right;}#izDialogBtn  > .izHelp {float:left;}#izNoteBook > .izNotebook-Tabs {list-style-type:none;margin:0;padding:3px 15px;text-align:left;}#izNoteBook > .izNotebook-Tabs > .izNotebook-Tab {display:inline;}#izNoteBook > .izNotebook-Tabs > .izNotebook-Tab > a {padding:3px 8px;margin-right:0px;border:1px solid #e0e0e0;border-bottom:1px solid #aaa;border-radius:4px 4px 0 0;background-color:#aaa;color:#fff;text-decoration:none;}#izNoteBook > .izNotebook-Tabs > .izNotebook-Tab:not(.tabSelected) > a:hover {border-bottom:1px solid #999;background:#999;}#izNoteBook > .izNotebook-Tabs > .izNotebook-Tab.tabSelected {background-color:#fff;}#izNoteBook > .izNotebook-Tabs > .izNotebook-Tab.tabSelected > a {padding-bottom:4px;border-bottom:1px solid #fff;background-color:#fff;color:#666;cursor:default;}#izNoteBook > .izNotebook-Page {display:none;clear:both;min-height:20em;padding:10px 10px 8px 10px;border:1px solid #e0e0e0;border-radius:6px;line-height:1.4em;}#izNoteBook > .izNotebook-Page.izTabPage01 {display:block;}#izNoteBook .izComboBox {display:inline-block;}#izNoteBook .izComboBox > .izCombo-Box {width:7em;border:1px solid #aaa;border-radius:4px;}#izNoteBook .izComboBox > .izCombo-Box > .izCombo-Txt {width:6em;}#izNoteBook .izComboBox > .izCombo-Box > .izCombo-Dropmarker {border:2px solid #aaa;border-bottom:1px solid #aaa;background-color:#aaa;line-height:1em;}#izNoteBook .izComboBox > .izCombo-List {height:5em;border:1px solid #aaa;border-radius:4px;background-color:white;-moz-user-select:-moz-none;-webkit-user-select:none;}#izNoteBook .izComboBox > .izCombo-List > div {padding:1px;white-space:pre;}#izNoteBook .izCombo-List > .izCombo-SelectedOption {background:#999;color:#fff;}#izNoteBook .izListBox {margin:5px 0;}#izNoteBook .izListBox > .izlist-Select {float:left;width:9em;height:4em;margin:0 5px 0 0;border:1px solid #aaa;border-radius:4px;color:#666;}#izNoteBook .izListBox > .izList-Up-Down {float:left;}#izNoteBook .izListBox .izList-Up,#izNoteBook .izListBox .izList-Down {width:1.5em;height:2em;margin:0 3px 1px;padding:0;}#izNoteBook .izListBox .izList-Up {border-radius:2em 2em 0 0;}#izNoteBook .izListBox .izList-Down {border-radius:0 0 2em 2em;}#izNoteBook .izSpin > .izSpin-Txt {width:1.5em;padding-right:5px;border-left-width:0;border-right-width:0;border-radius:0;text-align:right;}#izNoteBook .izSpin > .izSpin-Minus {margin:0;padding:0;width:1.2em;border-radius:1.2em 0 0 1.2em;}#izNoteBook .izSpin > .izSpin-Plus {margin:0;padding:0;width:1.2em;border-radius:0 1.2em 1.2em 0;}#izNoteBook .izMoreBox {display:inline-block;margin:0;}#izNoteBook .izMoreBox > .izMore-Btn {margin:0;padding:0 2px;border-bottom:none;background-color:#aaa;}#izNoteBook .izMoreBox > .izMore-List {border:1px solid #aaa;border-radius:4px;background-color:white;-moz-user-select:-moz-none;-webkit-user-select:none;}#izNoteBook .izMoreBox .izMore-ItemSet {margin:5px 2px;padding:3px;white-space:nowrap;}#izNoteBook .izMoreBox .izMore-Item {margin:2px;padding:3px 2px;border:1px solid #aaa;border-radius:4px;}#izNoteBook .izMoreBox .izMore-SelectedItem {background-color:#999;color:#fff;cursor:pointer;}#izNoteBook .izGrid span.izCustomTitle-AddBtn,#izNoteBook .izGrid span.izCustomTitle-DeleteBtn {padding-left:20px;}#izNoteBook .izGrid span.izCustomTitle-AddBtn:before {content:url(http://www.hotimg.com/direct/tGxWvkn.png);position:absolute;top:1px;left:-154px;clip:rect(3px 174px 19px 158px);}#izNoteBook .izGrid span.izCustomTitle-AddBtn:hover:before {content:url(http://www.hotimg.com/direct/tGxWvkn.png);position:absolute;top:1px;left:-106px;clip:rect(3px 125px 19px 109px);}#izNoteBook .izGrid span.izCustomTitle-DeleteBtn:before {content:url(http://www.hotimg.com/direct/tGxWvkn.png);position:absolute;left:-169px;clip:rect(3px 189px 19px 173px);}#izNoteBook .izGrid span.izCustomTitle-DeleteBtn:hover:before {content:url(http://www.hotimg.com/direct/tGxWvkn.png);position:absolute;left:-121px;clip:rect(3px 141px 19px 125px);}';
		document.head.appendChild( style );

		this.dialog = document.createElement( "div" );
		this.dialog.id = "izOptionsDialog";
		this.dialog.innerHTML = '<div class="izTitlebar">偏好設定<input type="button" class="izTitlebar-CloseButton" value="╳" /></div><div id="izNoteBook" class="izNoteBook"><ul class="izNotebook-Tabs"><li data-tabNo="0" class="izNotebook-Tab izTab01 tabSelected"><a>一般</a></li>&nbsp<li data-tabNo="1" class="izNotebook-Tab izTab02"><a>看板</a></li>&nbsp<li data-tabNo="2" class="izNotebook-Tab izTab03"><a>選單</a></li>&nbsp<li data-tabNo="3" class="izNotebook-Tab izTab04"><a>工具</a></li>&nbsp<li data-tabNo="4" class="izNotebook-Tab izTab05"><a>搜尋</a></li>&nbsp<li data-tabNo="5" class="izNotebook-Tab izTab06"><a>篩選</a></li>&nbsp<li data-tabNo="6" class="izNotebook-Tab izTab07"><a>其它</a></li></ul><div class="izNotebook-Page izTabPage01"><p>主要功能設定</p><div><fieldset><legend>看板</legend><label><input type="checkbox" name="chkNewBody" id="chkNewBody" checked="checked" />編排看板　　　</label>&nbsp<label><input type="checkbox" name="chkFixedMenu" id="chkFixedMenu" checked="checked" />固定選單　　　</label><br /><label><input type="checkbox" name="chkEzSearch" id="chkEzSearch" checked="checked" />自訂搜尋工具列</label>&nbsp<label><input type="checkbox" name="chkMainToolbar" id="chkMainToolbar" checked="checked" />自訂主工具列　</label><br /></fieldset><fieldset><legend>文章列表</legend><label><input type="checkbox" name="chkAutotAuthorFilter" id="chkAutotAuthorFilter" checked="checked" />作者自動篩選　</label>&nbsp<label><input type="checkbox" name="chkAutotTitleFilter" id="chkAutotTitleFilter" checked="checked" />標題自動篩選　</label><br /><label><input type="checkbox" name="chkFilterToolbar" id="chkFilterToolbar" checked="checked" />快速篩選工具列</label>&nbsp<label><input type="checkbox" name="chkRowSort" id="chkRowSort" checked="checked" />欄位排序　　　</label><br /><label><input type="checkbox" name="chkArticleStorage" id="chkArticleStorage" checked="checked" />文章暫存　　　</label></fieldset><fieldset><legend>其它</legend><label><input type="checkbox" name="chkReplaceTitleText" id="chkReplaceTitleText" checked="checked" />取代標題文字</label><br /><label><input type="checkbox" name="chkAutoReloadText" id="chkAutoReloadText" />內頁轉頁重整</label><br /></fieldset></div><div style="float:right;margin-top:10px;margin-right:30px;"><input type="button" class="izConf-RestoreDefaults" value="回復預設值" title="將所有設定回復為預設值" /></div></div><div class="izNotebook-Page izTabPage02"><p>你必須啟用編排看板</p><div><fieldset><legend>看板</legend> <label>寬度 <input type="text" class="izBody-WidthTxt" value="950px" size="8" maxlength="8" /></label>&nbsp<label>字體大小 <input type="text" class="izBody-FontSizeTxt" value="16px" size="6" maxlength="6" /></label><br />使用 <label><input type="radio" name="izBody-PositionRad" value="relative" checked="checked" />相對坐標</label>&nbsp<label><input type="radio" name="izBody-PositionRad" value="absolute" />絕對坐標</label><br /><div class="izBody-Pos-Relative izSwitchBox">置於 <label><input type="checkbox" name="izBody-BodyCenterChk" id="izBody-BodyCenterChk" checked="checked" />中央</label><br /><label>看板上邊際 <input type="text" class="izBody-MarginTopTxt" value="0.5em" size="8" maxlength="8" /></label>&nbsp<label>看板左邊際 <input type="text" class="izBody-MarginLeftTxt" value="14em" size="8" maxlength="8" /></label></div><div class="izBody-Pos-Absolute izSwitchBox" >置於 <label><input type="radio" name="izBody-PlaceRad" value="left" checked="checked" />左側</label>&nbsp<label><input type="radio" name="izBody-PlaceRad" value="right" />右側</label><br /><label>距視窗上緣 <input type="text" class="izBody-OffsetYTxt" value="0.5em" size="8" maxlength="8" /></label>&nbsp<label>距視窗側緣 <input type="text" class="izBody-OffsetXTxt" value="14em" size="8" maxlength="8" /></label></div></fieldset><fieldset><legend>列表</legend><label>文章主題的最大寬度 <input type="text" class="izBody-TitleColumn-WidthTxt" value="500px" size="8" maxlength="8" /></label><br /><label>欄位最小寬度 <input type="text" class="izBody-Column-WidthTxt" value="4em" size="8" maxlength="8" /></label>&nbsp<label>字體大小 <input type="text" class="izBody-Cell-FontSizeTxt" value="14px" size="6" maxlength="6" /></label><br /><label><input disabled="disabled" type="checkbox" name="izBody-KeyboardNavigationChk" id="izBody-KeyboardNavigationChk" checked="checked" />啟用鍵盤瀏覽</label><br /></fieldset></div></div><div class="izNotebook-Page izTabPage03"><p>你必須啟用固定選單</p><div><fieldset><legend>選項</legend><label>寬度 <input type="text" class="izMenu-WidthTxt" value="14em" size="8" maxlength="8" /></label>&nbsp<label>字體大小 <input type="text" class="izMenu-FontSizeTxt" value="16px" size="6" maxlength="6" /></label><br />使用 <label><input type="radio" name="izMenu-PositionRad" value="fixed" checked="checked" />固定坐標</label>&nbsp<label><input type="radio" name="izMenu-PositionRad" value="absolute" />絕對坐標</label><br />置於 <label><input type="radio" name="izMenu-PlaceRad" value="left" checked="checked" />左側</label>&nbsp<label><input type="radio" name="izMenu-PlaceRad" value="right" />右側</label><br /><label>距視窗上緣 <input type="text" class="izMenu-OffsetYTxt" value="2em" size="8" maxlength="8" /></label>&nbsp<label>距視窗側緣 <input type="text" class="izMenu-OffsetXTxt" value="1em" size="8" maxlength="8" /></label><br /><label><input type="checkbox" name="izMenu-AjaxLoad" id="izMenu-AjaxLoad" checked="checked" />使用 Ajax 載入看板</label><br /><label><input type="checkbox" name="izMenu-AccessKeyChk" id="izMenu-AccessKeyChk" checked="checked" />啟用快速訪問鍵</label><br /><label><input type="checkbox" name="izMenu-HideFloatMenuChk" id="izMenu-HideFloatMenuChk" checked="checked" />隱藏原選單</label><br /></fieldset></div><div style="float:right;"><input type="button" class="izMenu-EditBtn" value="編輯選單項目" />&nbsp<input type="button" class="izMenu-RestoreBtn" value="重設選單項目" /></div></div><div class="izNotebook-Page izTabPage04"><p>你必須啟用相關的工具列</p><div><fieldset><legend>主工具列</legend><label><input type="radio" name="izMainToolbar-PositionRad" value="static" checked="checked" />嵌入</label>&nbsp<label><input type="radio" name="izMainToolbar-PositionRad" value="fixed" />浮動</label><br /><div class="izMainToolbar-Pos-Static izSwitchBox">置於 <label><input type="radio" name="izMainToolbar-PlaceRad" value="top" /> 列表上方</label>&nbsp<label><input type="radio" name="izMainToolbar-PlaceRad" value="bottom" /> 列表下方</label><br />&nbsp</div><div class="izMainToolbar-Pos-Fixed izSwitchBox" >置於 <label><input type="radio" name="izMainToolbar-PlaceRad" value="left" checked="checked" />左側</label>&nbsp<label><input type="radio" name="izMainToolbar-PlaceRad" value="right" />右側</label><br /><label>距視窗上緣 <input type="text" class="izMainToolbar-OffsetYTxt" value="1em" size="8" maxlength="8" /></label>&nbsp<label>距視窗側緣 <input type="text" class="izMainToolbar-OffsetXTxt" value="1em" size="8" maxlength="8" /></label></div></fieldset><fieldset><legend>篩選工具列</legend><label><input type="radio" name="izFilterToolbar-PositionRad" value="static" checked="checked" />嵌入</label>&nbsp<label><input type="radio" name="izFilterToolbar-PositionRad" value="fixed" />浮動</label><br /><div class="izFilterToolbar-Pos-Static izSwitchBox">置於 <label><input type="radio" name="izFilterToolbar-PlaceRad" value="top" /> 列表上方</label>&nbsp<label><input type="radio" name="izFilterToolbar-PlaceRad" value="bottom" /> 列表下方</label><br />&nbsp</div><div class="izFilterToolbar-Pos-Fixed izSwitchBox" >置於 <label><input type="radio" name="izFilterToolbar-PlaceRad" value="left" checked="checked" />左側</label>&nbsp<label><input type="radio" name="izFilterToolbar-PlaceRad" value="right" />右側</label><br /><label>距視窗上緣 <input type="text" class="izFilterToolbar-OffsetYTxt" value="0.5em" size="8" maxlength="8" /></label>&nbsp<label>距視窗側緣 <input type="text" class="izFilterToolbar-OffsetXTxt" value="14em" size="8" maxlength="8" /></label></div></fieldset></div></div><div class="izNotebook-Page izTabPage05"><p>你必須啟用自訂搜尋列</p><div><fieldset><legend>日期</legend><label><input type="checkbox" name="chkSearchDate" id="chkSearchDate" checked="checked" />日期搜尋鈕</label>：最近 <span class="izSpin izSpinSearch"><input type="text" class="izSpin-Txt" value="3" title="請輸入數字" size="1" maxlength="1" /></span> 天<br /></fieldset><fieldset><legend>搜尋關鍵字</legend><div class="izComboBox izSearch"><label>看板：</label><span class="izCombo-Box izSearch"><input class="izCombo-Txt izSearch" type="text" value="all" title="請輸入中文板名或英文代號" maxlength="30" autocomplete="off"><input type="button" class="izCombo-Dropmarker izSearch" value="▼" title="列出已有看板" /></span><div class="izCombo-List izSearch"></div></div>&nbsp<div class="izMoreBox izSearch"><input type="button" class="izMore-Btn izSearch" value=">" title="選擇看板" /><div class="izMore-List izSearch"></div></div>&nbsp<span><input type="button" class="izShowAllLists izSearch" value="檢視" title="檢視已有的關鍵字" /></span><div class="izListBox izSearch"><div class="izList-Up-Down izSearch"><input type="button" class="izList-Up izSearch" value="△" /><br /><input type="button" class="izList-Down izSearch" value="▽" /></div><select multiple="multiple" class="izlist-Select izSearch"></select><input type="button" class="izList-Add izSearch" value="新增" />&nbsp<input type="text" class="izList-Txt izSearch" value="" title="請輸入至少二個字母的字串" size="10" maxlength="300" /><br /><input type="button" class="izList-Del izSearch" value="移除" /></div></fieldset><fieldset><legend>選項</legend><label><input type="radio" name="izEzSearchbar-PositionRad" value="static" checked="checked" />嵌入</label>&nbsp<label><input type="radio" name="izEzSearchbar-PositionRad" value="fixed" />浮動</label><br /><div class="izEzSearchbar-Pos-Static izSwitchBox">置於 <label><input type="radio" name="izEzSearchbar-PlaceRad" value="top" /> 列表上方</label>&nbsp<label><input type="radio" name="izEzSearchbar-PlaceRad" value="bottom" /> 列表下方</label><br />&nbsp</div><div class="izEzSearchbar-Pos-Fixed izSwitchBox" >置於 <label><input type="radio" name="izEzSearchbar-PlaceRad" value="left" checked="checked" />左側</label>&nbsp<label><input type="radio" name="izEzSearchbar-PlaceRad" value="right" />右側</label><br /><label>距視窗上緣 <input type="text" class="izEzSearchbar-OffsetYTxt" value="1em" size="8" maxlength="8" /></label>&nbsp<label>距視窗側緣 <input type="text" class="izEzSearchbar-OffsetXTxt" value="1em" size="8" maxlength="8" /></label></div></fieldset></div></div><div class="izNotebook-Page izTabPage06"><p>你必須啟用自動篩選</p><div><fieldset><legend>標題關鍵字</legend><div class="izComboBox izTitle"><label>看板：</label><span class="izCombo-Box izTitle"><input class="izCombo-Txt izTitle" type="text" value="all" title="請輸入中文板名或英文代號" maxlength="30" autocomplete="off"><input type="button" class="izCombo-Dropmarker izTitle" value="▼" title="列出已有看板" /></span><div class="izCombo-List izTitle"></div></div>&nbsp<div class="izMoreBox izTitle"><input type="button" class="izMore-Btn izTitle" value=">" title="選擇看板" /><div class="izMore-List izTitle"></div></div>&nbsp<span><input type="button" class="izShowAllLists izTitle" value="檢視" title="檢視已有的篩選資料" /></span><div class="izListBox izTitle"><div class="izList-Up-Down izTitle"><input type="button" class="izList-Up izTitle" value="△" /><br /><input type="button" class="izList-Down izTitle" value="▽" /></div><select multiple="multiple" class="izlist-Select izTitle"></select><input type="button" class="izList-Add izTitle" value="新增" />&nbsp<input type="text" class="izList-Txt izTitle" value="" title="請輸入正確的 Regular Expression" size="10" maxlength="300" /><br /><input type="button" class="izList-Del izTitle" value="移除" /></div></fieldset></div><div><fieldset><legend>作者名稱</legend><div class="izComboBox izAuthor"><label>看板：</label><span class="izCombo-Box izAuthor"><input class="izCombo-Txt izAuthor" type="text" value="all" title="請輸入中文板名或英文代號" maxlength="30" autocomplete="off"><input type="button" class="izCombo-Dropmarker izAuthor" value="▼" title="列出已有看板" /></span><div class="izCombo-List izAuthor"></div></div>&nbsp<div class="izMoreBox izAuthor"><input type="button" class="izMore-Btn izAuthor" value=">" title="選擇看板" /><div class="izMore-List izAuthor"></div></div>&nbsp<span><input type="button" class="izShowAllLists izAuthor" value="檢視" title="檢視已有的篩選資料" /></span><div class="izListBox izAuthor"><div class="izList-Up-Down izAuthor"><input type="button" class="izList-Up izAuthor" value="△" /><br /><input type="button" class="izList-Down izAuthor" value="▽" /></div><select multiple="multiple" class="izlist-Select izAuthor"></select><input type="button" class="izList-Add izAuthor" value="新增" />&nbsp<input type="text" class="izList-Txt izAuthor" value="" title="請輸入完整的作者名稱" size="10" maxlength="300" /><br /><input type="button" class="izList-Del izAuthor" value="移除" /></div></fieldset></div></div><div class="izNotebook-Page izTabPage07"><p>其它設定</p><div><fieldset><legend>取代標題文字</legend><table class="izReplaceString"><thead><tr><th>原字串</th><th>取代為</th></tr></thead><tbody></tbody></table></fieldset></div><div><fieldset><legend>更新檢查</legend><div><label>最後檢查日期：<span class="izLastUpdateDate"></span></label><br /><label><input type="checkbox" name="chkCheckUpdate" id="chkCheckUpdate" checked="checked" />自動檢查</label>：每 <span class="izSpin izSpinUpdate"><input type="text" class="izSpin-Txt" value="3" title="請輸入數字" size="1" maxlength="1" /></span> 日檢查一次&nbsp<input type="button" class="izConf-CheckUpdates" value="立刻檢查" title="檢查是否有更新版本" /></div></fieldset></div></div></div><div id="izDialogBtn" class="izStdDialogButton"><input type="button" class="izOK" value="確定" />&nbsp<input type="button" class="izApply" value="套用" disabled="disabled" />&nbsp<input type="button" class="izCancel" value="取消" />&nbsp<input type="button" class="izHelp" value="說明" /></div>';
		document.body.appendChild( this.dialog );

		this.dialog.style.display = "none";

		var that = this,	conf = IzConfig,	dlg = this.dialog;

		this.$noteBook = $( document.getElementById( "izNoteBook" ) ).izNoteBook();
		this.$stdDialogButton = $( document.getElementById( "izDialogBtn" ) ).izStdDialogButton( {
			ok: function() { that.hide().saveConf( IzConfig ); PageHandler.getInstance().buildAll(); },
			apply: function() { that.saveConf( IzConfig ); PageHandler.getInstance().buildAll(); },
			cancel: function() { that.hide(); $( dlg.querySelector( ".izMenu-EditBtn" ) ).trigger( "click" ); },
			help: function() { alert( "hungya fixer v" + gVersion ); }
		} );

		this.chkNewBody = document.getElementById( "chkNewBody" );
		this.chkFixedMenu = document.getElementById( "chkFixedMenu" );
		this.chkEzSearch = document.getElementById( "chkEzSearch" );
		this.chkMainToolbar = document.getElementById( "chkMainToolbar" );

		this.chkAutotTitleFilter = document.getElementById( "chkAutotTitleFilter" );
		this.chkAutotAuthorFilter = document.getElementById( "chkAutotAuthorFilter" );
		this.chkFilterToolbar = document.getElementById( "chkFilterToolbar" );
		this.chkRowSort = document.getElementById( "chkRowSort" );
		this.chkArticleStorage = document.getElementById( "chkArticleStorage" );

		this.chkReplaceTitleText = document.getElementById( "chkReplaceTitleText" );
		this.chkAutoReloadText = document.getElementById( "chkAutoReloadText" );

		this.chkSearchDate = document.getElementById( "chkSearchDate" );
		this.$spinSearch = $( dlg.getElementsByClassName( "izSpinSearch" )[0] ).izSpinButton( { value: 1, max: 9, min: 1 } );
		$( dlg.getElementsByClassName( "izMoreBox" ) ).izMoreBox( { datum: gBoardList } );

		this.$cboSearch = $( dlg.getElementsByClassName( "izComboBox izSearch" )[0] ).izComboBox( { datum: conf.ezSearchList } );
		this.$cboTitle = $( dlg.getElementsByClassName( "izComboBox izTitle" )[0] ).izComboBox( { datum: conf.removeTitleList } );
		this.$cboAuthor = $( dlg.getElementsByClassName( "izComboBox izAuthor" )[0] ).izComboBox( { datum: conf.removeAuthorList } );

		this.$lstSearch = $( dlg.getElementsByClassName( "izListBox izSearch" )[0] ).izListBox( { datum: [] } );
		this.$lstTitle = $( dlg.getElementsByClassName( "izListBox izTitle" )[0] ).izListBox( { datum: [], isUseRegExp: true } );
		this.$lstAuthor = $( dlg.getElementsByClassName( "izListBox izAuthor" )[0] ).izListBox( { datum: {}, isUseObject: true } );

		this.txtMenuWidth = dlg.getElementsByClassName( "izMenu-WidthTxt" )[0];
		this.txtMenuFontSize = dlg.getElementsByClassName( "izMenu-FontSizeTxt" )[0];
		this.radMenuPos = dlg.querySelectorAll( "input[name='izMenu-PositionRad']" );
		this.radMenuPlace = dlg.querySelectorAll( "input[name='izMenu-PlaceRad']" );
		this.txtMenuOffsetX = dlg.getElementsByClassName( "izMenu-OffsetXTxt" )[0];
		this.txtMenuOffsetY = dlg.getElementsByClassName( "izMenu-OffsetYTxt" )[0];
		this.chkMenuAjaxLoad = document.getElementById( "izMenu-AjaxLoad" );
		this.chkMenuAccessKey = document.getElementById( "izMenu-AccessKeyChk" );
		this.chkHideFloatMenu = document.getElementById( "izMenu-HideFloatMenuChk" );

		this.txtBodyWidth = dlg.getElementsByClassName( "izBody-WidthTxt" )[0];
		this.txtBodyFontSize = dlg.getElementsByClassName( "izBody-FontSizeTxt" )[0];
		this.txtBodyColumnWidth = dlg.getElementsByClassName( "izBody-Column-WidthTxt" )[0];
		this.txtBodyTitleColumnWidth = dlg.getElementsByClassName( "izBody-TitleColumn-WidthTxt" )[0];
		this.txtBodyCellFontSize = dlg.getElementsByClassName( "izBody-Cell-FontSizeTxt" )[0];
		this.radBodyPos = dlg.querySelectorAll( "input[name='izBody-PositionRad']" );
		this.chkBodyCenter = document.getElementById( "izBody-BodyCenterChk" );
		this.txtBodyMarginTop = dlg.getElementsByClassName( "izBody-MarginTopTxt" )[0];
		this.txtBodyMarginLeft = dlg.getElementsByClassName( "izBody-MarginLeftTxt" )[0];
		this.radBodyPlace = dlg.querySelectorAll( "input[name='izBody-PlaceRad']" );
		this.txtBodyOffsetX = dlg.getElementsByClassName( "izBody-OffsetXTxt" )[0];
		this.txtBodyOffsetY = dlg.getElementsByClassName( "izBody-OffsetYTxt" )[0];
		this.chkBodyKeyboardNavigation = document.getElementById( "izBody-KeyboardNavigationChk" );

		this.radMainToolbarPos = dlg.querySelectorAll( "input[name='izMainToolbar-PositionRad']" );
		this.radMainToolbarPlace = dlg.querySelectorAll( "input[name='izMainToolbar-PlaceRad']" );
		this.txtMainToolbarOffsetX = dlg.querySelector( ".izMainToolbar-OffsetXTxt" );
		this.txtMainToolbarOffsetY = dlg.querySelector( ".izMainToolbar-OffsetYTxt" );

		this.radFilterToolbarPos = dlg.querySelectorAll( "input[name='izFilterToolbar-PositionRad']" );
		this.radFilterToolbarPlace = dlg.querySelectorAll( "input[name='izFilterToolbar-PlaceRad']" );
		this.txtFilterToolbarOffsetX = dlg.querySelector( ".izFilterToolbar-OffsetXTxt" );
		this.txtFilterToolbarOffsetY = dlg.querySelector( ".izFilterToolbar-OffsetYTxt" );

		this.radEzSearchbarPos = dlg.querySelectorAll( "input[name='izEzSearchbar-PositionRad']" );
		this.radEzSearchbarPlace = dlg.querySelectorAll( "input[name='izEzSearchbar-PlaceRad']" );
		this.txtEzSearchbarOffsetX = dlg.querySelector( ".izEzSearchbar-OffsetXTxt" );
		this.txtEzSearchbarOffsetY = dlg.querySelector( ".izEzSearchbar-OffsetYTxt" );

		this.$ReportCuTitle = $( dlg.querySelector( ".izReplaceString" ) ).izGrid(  {
			classname: "izCustomTitle",
			titleText: "修改標題列文字",
			toolbar: true,
			buttons: [{ name: 'Add', classname: 'izCustomTitle-AddBtn', click: { fn: function() {
						$( ".izGrid .izReplaceString" ).izGrid( "insert", "<tr><td>&nbsp;</td><td>&nbsp;</td></tr>", 0 );
					} } },
				{ separator: true },
				{ name: 'Delete', classname: 'izCustomTitle-DeleteBtn', click: { fn: function() {
						$( ".izGrid .izReplaceString" ).izGrid( "delete",  $( this ).parents( ".izGrid" ).find( ".izGrid-Selected" ) );
					} } },
				{ separator: true }],
			editable: true,
			checkbox: true,
			height: 75,
			width: "23.5em",
			columnsInfo: [ { minWidth: "9em", editable: true }, { minWidth: "auto", editable: true }]
		} );

		this.$spinUpdate = $( dlg.getElementsByClassName( "izSpinUpdate" )[0] ).izSpinButton( { value: 1, max: 9, min: 1 } );
		this.chkCheckUpdate = document.getElementById( "chkCheckUpdate" );

		options.evtHandler( this );
	};

	options.prototype = {
		dialog: null,

		$noteBook: null,
		$stdDialogButton: null,

		chkNewBody: null,
		chkFixedMenu: null,
		chkEzSearch: null,
		chkMainToolbar: null,

		chkAutotTitleFilter: null,
		chkAutotAuthorFilter: null,
		chkFilterToolbar: null,
		chkRowSort: null,
		chkArticleStorage: null,

		chkReplaceTitleText: null,
		chkAutoReloadText: null,

		chkSearchDate: null,
		$spinSearch: null,
		$lstSearch: null,
		$cboSearch: null,

		$lstTitle: null,
		$lstAuthor: null,
		$cboTitle: null,
		$cboAuthor: null,

		txtMenuWidth: null,
		txtMenuFontSize: null,
		radMenuPos: null,
		radMenuPlace: null,
		txtMenuOffsetX: null,
		txtMenuOffsetY: null,
		chkMenuAjaxLoad: null,
		chkMenuAccessKey: null,
		chkHideFloatMenu: null,

		txtBodyWidth: null,
		txtBodyFontSize: null,
		txtBodyColumnWidth: null,
		txtBodyTitleColumnWidth: null,
		txtBodyCellFontSize: null,
		radBodyPos: null,
		chkBodyCenter: null,
		txtBodyMarginTop: null,
		txtBodyMarginLeft: null,
		radBodyPlace: null,
		txtBodyOffsetX: null,
		txtBodyOffsetY: null,
		chkBodyKeyboardNavigation: null,

		radMainToolbarPos: null,
		radMainToolbarPlace: null,
		txtMainToolbarOffsetX: null,
		txtMainToolbarOffsetY: null,

		radFilterToolbarPos: null,
		radFilterToolbarPlace: null,
		txtFilterToolbarOffsetX: null,
		txtFilterToolbarOffsetY: null,

		radEzSearchbarPos: null,
		radEzSearchbarPlace: null,
		txtEzSearchbarOffsetX: null,
		txtEzSearchbarOffsetY: null,

		$ReportCuTitle: null,
		chkCheckUpdate: null,

		show: function() {
			this.$noteBook.find( ".izNotebook-Tab:first" ).trigger( "click" );
			this.loadConf( IzConfig );
			this.dialog.style.display = "";
			return this;
		},

		hide: function() {
			this.dialog.style.display = "none";
			return this;
		},

		loadConf: function( conf ) {
			var blist = gBoardList;

			this.chkNewBody.checked = conf.isNewBody;
			this.chkFixedMenu.checked = conf.isFixedMenu;
			this.chkEzSearch.checked = conf.isEzSearch;
			this.chkMainToolbar.checked = conf["MainToolbar-Enable"];

			this.chkAutotTitleFilter.checked = conf.isAutoTitleFilter;
			this.chkAutotAuthorFilter.checked = conf.isAutoAuthorFilter;
			this.chkFilterToolbar.checked = conf.isFilterToolbar;
			this.chkRowSort.checked = conf.isRowSort;
			this.chkArticleStorage.checked = conf["Article-Storage-Enable"];

			this.chkReplaceTitleText.checked = conf.isReplaceTitleText;
			this.chkAutoReloadText.checked = conf["Article-AutoReload-Enable"]

			this.chkSearchDate.checked = conf.isSearchDate;
			this.$spinSearch.izSpinButton( "value", conf.dailySearch );

			this.$cboSearch.data( "options" ).datum = conf.ezSearchList;
			this.$cboTitle.data( "options" ).datum = conf.removeTitleList;
			this.$cboAuthor.data( "options" ).datum = conf.removeAuthorList;
			this.$cboSearch.data( "bid", "all" );
			this.$cboTitle.data( "bid", "all" );
			this.$cboAuthor.data( "bid", "all" );
			this.$cboSearch.izComboBox( "value", blist["all"] );
			this.$cboTitle.izComboBox( "value", blist["all"] );
			this.$cboAuthor.izComboBox( "value", blist["all"] );

			this.$lstSearch.data( "bid", "all" );
			this.$lstTitle.data( "bid", "all" );
			this.$lstAuthor.data( "bid", "all" );
			this.$lstSearch.data( "options" ).datum = conf.ezSearchList["all"];
			this.$lstTitle.data( "options" ).datum = conf.removeTitleList["all"];
			this.$lstAuthor.data( "options" ).datum = conf.removeAuthorList["all"];
			this.$lstSearch.izListBox( "update" );
			this.$lstTitle.izListBox( "update" );
			this.$lstAuthor.izListBox( "update" );

			this.txtMenuWidth.value = conf["FixedMenu-Width"];
			this.txtMenuFontSize.value = conf["FixedMenu-FontSize"];
			conf["FixedMenu-Position"]  !== "fixed" ? this.radMenuPos[1].checked = true : this.radMenuPos[0].checked = true;
			conf["FixedMenu-Place"] !== "left" ? this.radMenuPlace[1].checked = true : this.radMenuPlace[0].checked = true;
			this.txtMenuOffsetY.value = conf["FixedMenu-OffsetY"];
			this.txtMenuOffsetX.value = conf["FixedMenu-OffsetX"];
			this.chkMenuAjaxLoad.checked = conf["FixedMenu-AjaxLoad-Enable"];
			this.chkMenuAccessKey.checked = conf["FixedMenu-AccessKey-Enable"];
			this.chkHideFloatMenu.checked = conf["FixedMenu-HideFloatMenu"];

			this.txtBodyWidth.value = conf["NewBody-Width"];
			this.txtBodyFontSize.value = conf["NewBody-FontSize"];
			this.txtBodyColumnWidth.value = conf["NewBody-Column-MinWidth"];
			this.txtBodyTitleColumnWidth.value =  conf["NewBody-TitleColumn-MaxWidth"];
			this.txtBodyCellFontSize.value = conf["NewBody-Cell-FontSize"];
			conf["NewBody-Position"]  !== "relative"  ? this.radBodyPos[1].checked = true : this.radBodyPos[0].checked = true;
			this.chkBodyCenter.checked = conf["NewBody-Center"];
			this.txtBodyMarginLeft.value = conf["NewBody-MarginLeft"];
			this.txtBodyMarginTop.value = conf["NewBody-MarginTop"];
			conf["NewBody-Place"] !== "left" ? this.radBodyPlace[1].checked = true : this.radBodyPlace[0].checked = true;
			this.txtBodyOffsetX.value = conf["NewBody-OffsetX"];
			this.txtBodyOffsetY.value = conf["NewBody-OffsetY"];
			this.chkBodyKeyboardNavigation.checked = conf["NewBody-KeyboardNavigation-Enable"];

			conf["MainToolbar-Position"] !== MyConfig.Position_Fixed  ? this.radMainToolbarPos[0].checked = true : this.radMainToolbarPos[1].checked = true;
			this.txtMainToolbarOffsetY.value = conf["MainToolbar-OffsetY"];
			this.txtMainToolbarOffsetX.value = conf["MainToolbar-OffsetX"];
			if ( conf["MainToolbar-Position"] !== MyConfig.Position_Fixed ) {
				if ( conf["MainToolbar-Place"] !== MyConfig.Place_Bottom ) {
					this.radMainToolbarPlace[0].checked = true;
				} else {
					this.radMainToolbarPlace[1].checked = true;
				}
			} else {
				if ( conf["MainToolbar-Place"] !== MyConfig.Place_Left ) {
					this.radMainToolbarPlace[3].checked = true;
				} else {
					this.radMainToolbarPlace[2].checked = true;
				}
			}

			conf["FilterToolbar-Position"] !== MyConfig.Position_Fixed  ? this.radFilterToolbarPos[0].checked = true : this.radFilterToolbarPos[1].checked = true;
			this.txtFilterToolbarOffsetY.value = conf["FilterToolbar-OffsetY"];
			this.txtFilterToolbarOffsetX.value = conf["FilterToolbar-OffsetX"];
			if ( conf["FilterToolbar-Position"] !== MyConfig.Position_Fixed ) {
				if ( conf["FilterToolbar-Place"] !== MyConfig.Place_Top ) {
					this.radFilterToolbarPlace[1].checked = true;
				} else {
					this.radFilterToolbarPlace[0].checked = true;
				}
			} else {
				if ( conf["FilterToolbar-Place"] !== MyConfig.Place_Left ) {
					this.radFilterToolbarPlace[3].checked = true;
				} else {
					this.radFilterToolbarPlace[2].checked = true;
				}
			}

			conf["EzSearchbar-Position"] !== MyConfig.Position_Fixed  ? this.radEzSearchbarPos[0].checked = true : this.radEzSearchbarPos[1].checked = true;
			this.txtEzSearchbarOffsetY.value = conf["EzSearchbar-OffsetY"];
			this.txtEzSearchbarOffsetX.value = conf["EzSearchbar-OffsetX"];
			if ( conf["EzSearchbar-Position"] !== MyConfig.Position_Fixed ) {
				if ( conf["EzSearchbar-Place"] !== MyConfig.Place_Top ) {
					this.radEzSearchbarPlace[1].checked = true;
				} else {
					this.radEzSearchbarPlace[0].checked = true;
				}
			} else {
				if ( conf["EzSearchbar-Place"] !== MyConfig.Place_Left ) {
					this.radEzSearchbarPlace[3].checked = true;
				} else {
					this.radEzSearchbarPlace[2].checked = true;
				}
			}

			this.$ReportCuTitle.izGrid( "clear" ).izGrid( "import", conf.titleReplaceList, 0 );
			this.dialog.getElementsByClassName( "izLastUpdateDate" )[0].textContent = new Date( conf["Update-LastUpdateDate"] ).toString().substring( 0, 25 );
			this.$spinUpdate.izSpinButton( "value", conf["Update-Interval"] );
			this.chkCheckUpdate.checked = conf["Update-isAuto"];

			return this;
		},

		clearEmptyList: function( lst, type ) {
			if ( type === "array" ) {
				for ( var k in lst ) {
					if ( k !== "all" && !lst[k].length ) {
						delete lst[k];
					}
				}
			} else if ( type === "object" ) {
				for ( var k in lst ) {
					if ( k !== "all" && !Object.getOwnPropertyNames( lst[k] ).length ) {
						delete lst[k];
					}
				}
			}
			return this;
		},

		saveConf: function( conf ) {
			conf.isNewBody = this.chkNewBody.checked;
			conf.isFixedMenu = this.chkFixedMenu.checked;
			conf.isEzSearch = this.chkEzSearch.checked;
			conf["MainToolbar-Enable"] = this.chkMainToolbar.checked;

			conf.isAutoTitleFilter = this.chkAutotTitleFilter.checked;
			conf.isAutoAuthorFilter = this.chkAutotAuthorFilter.checked;
			conf.isFilterToolbar = this.chkFilterToolbar.checked;
			conf.isRowSort = this.chkRowSort.checked;
			conf["Article-Storage-Enable"] = this.chkArticleStorage.checked;

			conf["TableList-Enable"] = conf.isFilterToolbar || conf.isAutoAuthorFilter ||
														conf.isAutoTitleFilter || conf.isRowSort || conf["Article-Storage-Enable"] ||
														( conf.isFixedMenu && conf["FixedMenu-AjaxLoad-Enable"] );

			conf.isReplaceTitleText = this.chkReplaceTitleText.checked;
			conf["Article-AutoReload-Enable"] = this.chkAutoReloadText.checked

			conf.isSearchDate = this.chkSearchDate.checked;
			conf.dailySearch = this.$spinSearch.izSpinButton( "value" );

			this.$lstSearch.izListBox( "save" );
			conf.ezSearchList = this.$cboSearch.data( "options" ).datum;
			conf.ezSearchList[this.$lstSearch.data( "bid" )] = this.$lstSearch.data( "options" ).datum;
			this.clearEmptyList( conf.ezSearchList, "array" )

			this.$lstTitle.izListBox( "save" );
			conf.removeTitleList = this.$cboTitle.data( "options" ).datum;
			conf.removeTitleList[this.$lstTitle.data( "bid" )] = this.$lstTitle.data( "options" ).datum;
			this.clearEmptyList( conf.removeTitleList, "array" );

			this.$lstAuthor.izListBox( "save" );
			conf.removeAuthorList = this.$cboAuthor.data( "options" ).datum;
			conf.removeAuthorList[this.$lstAuthor.data( "bid" )] = this.$lstAuthor.data( "options" ).datum;
			this.clearEmptyList( conf.removeAuthorList, "object" );

			conf["FixedMenu-Width"] = this.txtMenuWidth.value;
			conf["FixedMenu-FontSize"] = this.txtMenuFontSize.value;
			conf["FixedMenu-Position"] = this.radMenuPos[0].checked ? this.radMenuPos[0].value : this.radMenuPos[1].value;
			conf["FixedMenu-Place"] = this.radMenuPlace[0].checked ? this.radMenuPlace[0].value : this.radMenuPlace[1].value;
			conf["FixedMenu-OffsetY"] = this.txtMenuOffsetY.value;
			conf["FixedMenu-OffsetX"] = this.txtMenuOffsetX.value;
			conf["FixedMenu-AjaxLoad-Enable"] = this.chkMenuAjaxLoad.checked;
			conf["FixedMenu-AccessKey-Enable"] = this.chkMenuAccessKey.checked;
			conf["FixedMenu-HideFloatMenu"] = this.chkHideFloatMenu.checked;

			conf["NewBody-Width"] = this.txtBodyWidth.value;
			conf["NewBody-FontSize"] = this.txtBodyFontSize.value;
			conf["NewBody-Column-MinWidth"] = this.txtBodyColumnWidth.value;
			conf["NewBody-TitleColumn-MaxWidth"] = this.txtBodyTitleColumnWidth.value;
			conf["NewBody-Cell-FontSize"] = this.txtBodyCellFontSize.value;
 			conf["NewBody-Position"] = this.radBodyPos[0].checked ? this.radBodyPos[0].value : this.radBodyPos[1].value;
			conf["NewBody-Center"] = this.chkBodyCenter.checked;
			conf["NewBody-MarginLeft"] = this.txtBodyMarginLeft.value;
			conf["NewBody-MarginTop"] = this.txtBodyMarginTop.value;
 			conf["NewBody-Place"] = this.radBodyPlace[0].checked ? this.radBodyPlace[0].value : this.radBodyPlace[1].value;
			conf["NewBody-OffsetX"] = this.txtBodyOffsetX.value;
			conf["NewBody-OffsetY"] = this.txtBodyOffsetY.value;
			conf["NewBody-KeyboardNavigation-Enable"] = this.chkBodyKeyboardNavigation.checked;

			conf["MainToolbar-Position"] = this.radMainToolbarPos[0].checked ? MyConfig.Position_Static : MyConfig.Position_Fixed;
			conf["MainToolbar-OffsetY"] = this.txtMainToolbarOffsetY.value;
			conf["MainToolbar-OffsetX"] = this.txtMainToolbarOffsetX.value;
			if ( conf["MainToolbar-Position"] !== MyConfig.Position_Fixed ) {
				conf["MainToolbar-Place"] = this.radMainToolbarPlace[1].checked ? MyConfig.Place_Bottom : MyConfig.Place_Top;
			} else {
				conf["MainToolbar-Place"] = this.radMainToolbarPlace[2].checked ? MyConfig.Place_Left : MyConfig.Place_Right;
			}

			conf["FilterToolbar-Position"] = this.radFilterToolbarPos[1].checked ? MyConfig.Position_Fixed : MyConfig.Position_Static;
			conf["FilterToolbar-OffsetY"] = this.txtFilterToolbarOffsetY.value;
			conf["FilterToolbar-OffsetX"] = this.txtFilterToolbarOffsetX.value;
			if ( conf["FilterToolbar-Position"] !== MyConfig.Position_Fixed ) {
				conf["FilterToolbar-Place"] = this.radFilterToolbarPlace[0].checked ? MyConfig.Place_Top : MyConfig.Place_Bottom;
			} else {
				conf["FilterToolbar-Place"] = this.radFilterToolbarPlace[2].checked ? MyConfig.Place_Left : MyConfig.Place_Right;
			}

			conf["EzSearchbar-Position"] = this.radEzSearchbarPos[1].checked ? MyConfig.Position_Fixed : MyConfig.Position_Static;
			conf["EzSearchbar-OffsetY"] = this.txtEzSearchbarOffsetY.value;
			conf["EzSearchbar-OffsetX"] = this.txtEzSearchbarOffsetX.value;
			if ( conf["EzSearchbar-Position"] !== MyConfig.Position_Fixed ) {
				conf["EzSearchbar-Place"] = this.radEzSearchbarPlace[0].checked ? MyConfig.Place_Top : MyConfig.Place_Bottom;
			} else {
				conf["EzSearchbar-Place"] = this.radEzSearchbarPlace[2].checked ? MyConfig.Place_Left : MyConfig.Place_Right;
			}
			conf.titleReplaceList = this.$ReportCuTitle.izGrid( "export" );
			conf["Update-Interval"] = this.$spinUpdate.izSpinButton( "value" );
			conf["Update-isAuto"] = this.chkCheckUpdate.checked;

			MyConfig.save( conf );

			return this;
		}
	};

	options.evtHandler = function( self ) {
		var dlg = self.dialog,
			$dlg = $( self.dialog );

		$( dlg.getElementsByClassName( "izShowAllLists"	) ).click( function() {
			var $box = $( "<div></div>" ),
				title = "",
				content = "<table border='1' cellspacing='0' cellpadding='0' style='width:100%;border:1px solid #000;'><tr><td style='width:5em;padding:2px;background-color:#ccc;text-align:center;'>看板</td><td style='padding:2px;background-color:#ccc;text-align:center;'>關鍵字</td></tr>";

			switch( this.className ) {
				case "izShowAllLists izSearch": {
					$( ".izDialogBox.izShowAllLists.izSearch" ).remove();
					$box.addClass( "izShowAllLists izSearch" );
					title = "檢視：搜尋關鍵字";
					for ( var key in IzConfig.ezSearchList ) {
						content += "<tr><td style='padding:3px;text-align:center;'><strong>" + gBoardList[key] + "</strong></td><td style='padding:3px;'>" + IzConfig.ezSearchList[key].join( ", " ) + "</td></tr>";
					}
					break;
				}

				case "izShowAllLists izTitle": {
					$( ".izDialogBox.izShowAllLists.izTitle" ).remove();
					$box.addClass( "izShowAllLists izTitle" );
					title = "檢視：標題關鍵字";
					for ( var key in IzConfig.removeTitleList ) {
						content += "<tr><td style='padding:3px;text-align:center;'><strong>" + gBoardList[key] + "</strong></td><td style='padding:3px;'>" + IzConfig.removeTitleList[key].join( ", " ) + "</td></tr>";
					}
					break;
				}

				case "izShowAllLists izAuthor": {
					$( ".izDialogBox.izShowAllLists.izAuthor" ).remove();
					$box.addClass( "izShowAllLists izAuthor" );
					title = "檢視：作者名稱";
					for ( var key in IzConfig.removeAuthorList ) {
						content += "<tr><td style='padding:3px;text-align:center;'><strong>" + gBoardList[key] + "</strong></td><td style='padding:3px;'>" + Object.getOwnPropertyNames( IzConfig.removeAuthorList[key] ).join( ", " ) + "</td></tr>";
					}
					break;
				}
			}

			content += "</table>";

			$box
				.attr( "title", title )
				.html( content )
				.izDialogBox();
		} );

		$( dlg.getElementsByClassName( "izCombo-Txt" ) ).keyup( function( event, trigger ) {
			// 處理 enter, 中英文轉換
			if ( event.keyCode === 13 || trigger === 13 ) {
				var $cbo,
					$lst,
					datums;

				switch( this.className ) {
					case "izCombo-Txt izSearch":
						$cbo = self.$cboSearch;
						$lst = self.$lstSearch;
						datums = IzConfig.ezSearchList;
						break;
					case "izCombo-Txt izTitle":
						$cbo = self.$cboTitle;
						$lst = self.$lstTitle;
						datums = IzConfig.removeTitleList;
						break;
					case "izCombo-Txt izAuthor":
						$cbo = self.$cboAuthor;
						$lst = self.$lstAuthor;
						datums = IzConfig.removeAuthorList;
						break;
				}

				var bid, val = this.value;
				if ( val in gBoardList ) {
					bid = val;
				} else {
					bid = MyUtils.getPropertyNameByValue( gBoardList, val );
					if ( bid === "" ) {
						this.value = gBoardList[$cbo.data( "bid" )];
						return;
					}
				}

				$cbo.data( "bid", bid );
				this.value = gBoardList[bid];

				if ( $lst.data( "options" ).isChanged ) {
					if ( confirm( "項目已經修改, 是否儲存?" ) ) {
						$lst.izListBox( "save" );
						datums[$lst.data( "bid" )] = $lst.data( "options" ).datum;
					}
				}

				$lst.data( "bid", bid );
				if ( bid in datums ) {
					$lst.data( "options" ).datum = datums[bid];
				} else {
					$.isArray( datums["all"] ) ? $lst.data( "options" ).datum = [] :	$lst.data( "options" ).datum = {};
				}
				$lst.izListBox( "update" );
			}
		} );

		$( dlg.getElementsByClassName( "izCombo-Dropmarker" ) ).click( function() {
			// 將英文代號放入 bid, 並換成中文名
			$( this ).parent().parent().find( ".izCombo-List div" ).each( function() {
				$( this ).data( "bid", this.textContent );
				this.textContent = gBoardList[this.textContent];
			} );

			return false
		} );

		$( dlg.querySelectorAll( ".izListBox input[type='button']" ) ).click( function() {
			// 當 listbox 任一按鈕按下時,

			var $btn = $( this ), $cbo, $lst;

			if ( $btn.hasClass( "izSearch" ) ) {
				$cbo = self.$cboSearch;
				$lst = self.$lstSearch;
			} else if ( $btn.hasClass( "izTitle" ) ) {
				$cbo = self.$cboTitle;
				$lst = self.$lstTitle;
			} else if ( $btn.hasClass( "izAuthor" ) ) {
				$cbo = self.$cboAuthor;
				$lst = self.$lstAuthor;
			}

			// 恢復 combobox 的文字欄的值,
			$cbo.izComboBox( "value", gBoardList[$cbo.data( "bid" )] );

			// 立刻保存設定到 izCombobox 的 datum
			$lst.izListBox( "save" );
			$cbo.data( "options" ).datum[$lst.data( "bid" )] = $lst.data( "options" ).datum;
		} );

		//-- 避免重覆套用
		var btnApply = dlg.querySelector( "#izDialogBtn > .izApply" );

		$( dlg.querySelectorAll( "#izDialogBtn input:not(.izHelp)" ) ).click( function() {
			btnApply.disabled = true;
		} );

		$( dlg.querySelectorAll( "input:not(.izApply):not(.izHelp):not(.izCancel):not(.izOK)" ) ).click( function() {
			btnApply.disabled = false;
		} );
		//--

		//-- 看板編排的坐標選項
		var bodyRelOpts = dlg.getElementsByClassName( "izBody-Pos-Relative" )[0].style,
			bodyAbsOpts = dlg.getElementsByClassName( "izBody-Pos-Absolute" )[0].style;

		bodyRelOpts.margin = "5px 2px";
		bodyRelOpts.padding = "2px";
		bodyRelOpts.border = "1px dashed #000";

		bodyAbsOpts.margin = "5px 2px";
		bodyAbsOpts.padding = "2px";
		bodyAbsOpts.border = "1px dashed #000";

		if ( IzConfig["NewBody-Position"] !== "absolute" ) {
			self.radBodyPos[0].checked = true;
			bodyAbsOpts.display = "none";
			bodyRelOpts.display = "block";
		} else {
			self.radBodyPos[1].checked = true;
			bodyAbsOpts.display = "block";
			bodyRelOpts.display = "none";
		}

		$( self.radBodyPos ).click( function() {
			if ( this.value !== "absolute" ) {
				bodyAbsOpts.display = "none";
				bodyRelOpts.display = "block";
			} else {
				bodyAbsOpts.display = "block";
				bodyRelOpts.display = "none";
			}
		} );
		//--

		//-- 工具列的坐標選項
			// 主工具列
			var MainToolbarStaticOpts = dlg.querySelector( ".izMainToolbar-Pos-Static" ).style,
				MainToolbarFixedOpts = dlg.querySelector( ".izMainToolbar-Pos-Fixed" ).style;

			if ( IzConfig["MainToolbar-Position"] !== MyConfig.Position_Static ) {
				self.radMainToolbarPos[1].checked = true
				MainToolbarStaticOpts.display = "none";
				MainToolbarFixedOpts.display = "block";
			} else {
				self.radMainToolbarPos[0].checked = true;
				MainToolbarStaticOpts.display = "block";
				MainToolbarFixedOpts.display = "none";
			}

			$( self.radMainToolbarPos ).click( function() {
				if ( this.value !== "static" ) {
					if ( IzConfig["MainToolbar-Position"] !== MyConfig.Position_Fixed ) {
						self.radMainToolbarPlace[3].checked = true;
					} else {
						if ( IzConfig["MainToolbar-Place"] !== MyConfig.Place_Left ) {
							self.radMainToolbarPlace[3].checked = true;
						} else {
							self.radMainToolbarPlace[2].checked = true;
						}
					}

					MainToolbarStaticOpts.display = "none";
					MainToolbarFixedOpts.display = "block";
				} else {
					if ( IzConfig["MainToolbar-Position"] !== MyConfig.Position_Static ) {
						self.radMainToolbarPlace[0].checked = true;
					} else {
						if ( IzConfig["MainToolbar-Place"] !== MyConfig.Place_Bottom ) {
							self.radMainToolbarPlace[0].checked = true;
						} else {
							self.radMainToolbarPlace[1].checked = true;
						}
					}

					MainToolbarStaticOpts.display = "block";
					MainToolbarFixedOpts.display = "none";
				}
			} );

			// 篩選工具列
			var FilterToolbarStaticOpts = dlg.querySelector( ".izFilterToolbar-Pos-Static" ).style,
				FilterToolbarFixedOpts = dlg.querySelector( ".izFilterToolbar-Pos-Fixed" ).style;

			if ( IzConfig["FilterToolbar-Position"] !== MyConfig.Position_Fixed ) {
				self.radFilterToolbarPos[0].checked = true;
				FilterToolbarStaticOpts.display = "block";
				FilterToolbarFixedOpts.display = "none";
			} else {
				self.radFilterToolbarPos[1].checked = true;
				FilterToolbarStaticOpts.display = "none";
				FilterToolbarFixedOpts.display = "block";
			}

			$( self.radFilterToolbarPos ).click( function() {
				if ( this.value !== "fixed" ) {
					if ( IzConfig["FilterToolbar-Position"] !== MyConfig.Position_Static ) {
						self.radFilterToolbarPlace[1].checked = true;
					} else {
						if ( IzConfig["FilterToolbar-Place"] !== MyConfig.Place_Bottom ) {
							self.radFilterToolbarPlace[0].checked = true;
						} else {
							self.radFilterToolbarPlace[1].checked = true;
						}
					}

					FilterToolbarStaticOpts.display = "block";
					FilterToolbarFixedOpts.display = "none";
				} else {
					if ( IzConfig["FilterToolbar-Position"] !== MyConfig.Position_Fixed ) {
						self.radFilterToolbarPlace[3].checked = true;
					} else {
						if ( IzConfig["FilterToolbar-Place"] !== MyConfig.Place_Left ) {
							self.radFilterToolbarPlace[3].checked = true;
						} else {
							self.radFilterToolbarPlace[2].checked = true;
						}
					}

					FilterToolbarStaticOpts.display = "none";
					FilterToolbarFixedOpts.display = "block";
				}
			} );

			// 搜尋工具列
			var EzSearchbarStaticOpts = dlg.querySelector( ".izEzSearchbar-Pos-Static" ).style,
				EzSearchbarFixedOpts = dlg.querySelector( ".izEzSearchbar-Pos-Fixed" ).style;

			if ( IzConfig["EzSearchbar-Position"] !== MyConfig.Position_Fixed ) {
				self.radEzSearchbarPos[0].checked = true;
				EzSearchbarStaticOpts.display = "block";
				EzSearchbarFixedOpts.display = "none";
			} else {
				self.radEzSearchbarPos[1].checked = true;
				EzSearchbarStaticOpts.display = "none";
				EzSearchbarFixedOpts.display = "block";
			}

			$( self.radEzSearchbarPos ).click( function() {
				if ( this.value !== "fixed" ) {
					if ( IzConfig["EzSearchbar-Position"] !== MyConfig.Position_Static ) {
						self.radEzSearchbarPlace[0].checked = true;
					} else {
						if ( IzConfig["EzSearchbar-Place"] !== MyConfig.Place_Bottom ) {
							self.radEzSearchbarPlace[0].checked = true;
						} else {
							self.radEzSearchbarPlace[1].checked = true;
						}
					}

					EzSearchbarStaticOpts.display = "block";
					EzSearchbarFixedOpts.display = "none";
				} else {
					if ( IzConfig["EzSearchbar-Position"] !== MyConfig.Position_Fixed ) {
						self.radEzSearchbarPlace[2].checked = true;
					} else {
						if ( IzConfig["EzSearchbar-Place"] !== MyConfig.Place_Left ) {
							self.radEzSearchbarPlace[3].checked = true;
						} else {
							self.radEzSearchbarPlace[2].checked = true;
						}
					}

					EzSearchbarStaticOpts.display = "none";
					EzSearchbarFixedOpts.display = "block";
				}
			} );
		//--

		$dlg.click( function( event ) {
			var $target = $( event.target ),
				conf = IzConfig;

			switch( event.target.className ) {
				case "izConf-CheckUpdates": {
						MyUtils.checkUpdate( false, function( dlg, conf ) {
							dlg.getElementsByClassName( "izLastUpdateDate" )[0].textContent = new Date( conf["Update-LastUpdateDate"] ).toString().substring( 0, 25 );
						}, dlg, conf );
					break;
				}

				case "izConf-RestoreDefaults": {
					if ( confirm( "所有設定會回復為預設值，\n你將失去原有設定。\n\n若要回復，請按確定(OK)" ) ) {
						var defConf = MyConfig.load( true );

						if ( confirm( "你是否要保留文字設定，\n包含搜尋和篩選、標題。\n\n若要保留，請按確定(OK) " ) ) {
							defConf.ezSearchList = conf.ezSearchList;
							defConf.removeTitleList = conf.removeTitleList;
							defConf.removeAuthorList = conf.removeAuthorList;
							defConf.titleReplaceList = conf.titleReplaceList;
						}
						//conf["FixedMenu-AccessKey"] = defConf["FixedMenu-AccessKey"];
						//conf["Update-LastUpdateDate"] = defConf["Update-LastUpdateDate"];
						//conf["Update-UsoVersion"] = defConf["Update-UsoVersion"];

						self.loadConf( defConf );
					}
					break;
				}

				case "izTitlebar-CloseButton": {
					self.$stdDialogButton.find( ".izCancel" ).trigger( "click" );
					break;
				}

				case "izMenu-RestoreBtn": {
					if ( confirm( "選單按鈕設定會回復為預設值，\n你將失去原有設定。\n\n若要回復，請按確定(OK)" ) ) {
						conf["FixedMenu-HideItems"] = [0];
						conf["FixedMenu-AccessKey"] =  {};
					}
					break;
				}

				case "izMenu-EditBtn": {
						// 編輯選單按鈕
					var menu = document.body.getElementsByClassName( "izFixedMenu" )[0];
					if ( !menu ) {
						return;
					}

					var btn = menu.getElementsByClassName( "izMenu-CancelBtn" )[0];
					if ( btn ) {
						if ( menu.prop_IsChanged ) {
							if ( !confirm( "選單項目已變動且未儲存，\n確定結束編輯?" ) ) {
								return;
							}
						}
						$( btn ).trigger( "click" );
						return;
					}

					if ( this.style.display === "none" ) {
						return;
					}

					 // 選單元件處理
					var $ok = $( "<input type='button' class='izMenu-OkBtn' style='width:6em' value='確定' />" ),
						$cancel = $( "<input type='button' class='izMenu-CancelBtn' style='width:6em' value='取消' />" ),
						lis = menu.getElementsByTagName( "li" ),
						chk = document.createElement( "input" ),
						txt = document.createElement( "input" );

					$cancel.css( { width: "45%" } ).prependTo( menu );
					$ok.css( { width: "45%" } ).prependTo( menu );

					chk.type = "checkbox";
					chk.checked = true;
					txt.type = "text";
					txt.size = 1;
					txt.maxLength = 1;
					for ( var i = 0, len = lis.length; len > i; ++i ) {
						var c = chk.cloneNode( false ),
							t = txt.cloneNode( false );
						c.value = t.index = i;
						t.value = t.oldValue = "";
						lis[i].appendChild( c );
						lis[i].appendChild( t );
					}

					// checkbox
					var chks = menu.querySelectorAll( "input[type='checkbox']" );

					$( chks ).click( function( event ) {
						menu.prop_IsChanged = true;
					} );

					for ( var i = 0, len = conf["FixedMenu-HideItems"].length; len > i; ++i ) {
						chks[conf["FixedMenu-HideItems"][i]].checked = false;
					}

					// text
					var txts = menu.querySelectorAll( "input[type='text']" ),
						usedKeys = {}, name;

					$( txts ).change( function( event ) {
						var newVal = this.value.toUpperCase(),	oldVal = this.oldValue;

						if ( newVal in usedKeys ) {
							alert( "按鍵 " + newVal + " 已經被使用了。" );
							this.value = oldVal;
						} else {
							if ( oldVal !== "" ) {
								delete( usedKeys[oldVal] );
							}

							if ( newVal === "" ) {
								this.oldValue = "";
							} else {
								usedKeys[newVal] = 0;
								this.value = this.oldValue = newVal;
							}

							menu.prop_IsChanged = true;
						}

						//console.log( "FixedMenu usedKeys: " + Object.getOwnPropertyNames( usedKeys ).toString() );
					} );

					for ( var key in conf["FixedMenu-AccessKey"] ) {
						name = conf["FixedMenu-AccessKey"][key];
						usedKeys[name] = 0;
						txts[key].value = txts[key].oldValue = name;
					}

					// a
					var as = menu.getElementsByTagName( "a" );

					var menuAnchor_Click = function( event ) {
						var chk = this.nextElementSibling;
						chk.checked = !chk.checked;
						menu.prop_IsChanged = true;
						event.preventDefault();
					};

					var removeFixedMenuEvent = function() {
						var len = as.length;
						while ( len-- ) {
							as[len].removeEventListener( "click", menuAnchor_Click, false );
						}
						document.removeEventListener( "izRemoveFixedMenuEvent", removeFixedMenuEvent, false );
					};

					var len = as.length;
					while ( len-- ) {
						as[len].addEventListener( "click", menuAnchor_Click, false );
					}
					document.addEventListener( "izRemoveFixedMenuEvent", removeFixedMenuEvent, false );

					// 顯示
					menu.style.position = 'absolute';
					menu.style.width = "17.5em";
					menu.style.backgroundColor = "#fff";
					$( lis ).width( "8em" ).show();

					$ok.click( function() {
						var menu = document.body.getElementsByClassName( "izFixedMenu")[0],
							chks = menu.querySelectorAll( "input[type='checkbox']" ),
							txts = menu.querySelectorAll( "input[type='text']" ),
							tmp = { "FixedMenu-HideItems": [], "FixedMenu-AccessKey": {} },
							val;

						for ( var i = 0, len = chks.length; len > i; ++i ) {
							if ( !chks[i].checked ) {
								tmp["FixedMenu-HideItems"].push( chks[i].value );
							}
						}

						for ( var i = 0, len = txts.length; len > i; ++i ) {
							val = txts[i].value.toUpperCase();
							if ( val !== "" ) {
								tmp["FixedMenu-AccessKey"][i] = val;
							}
						}

							// 直接儲存設定
						MyConfig.save( $.extend( {}, MyConfig.load(), tmp ) );
						IzConfig["FixedMenu-HideItems"] = tmp["FixedMenu-HideItems"];
						IzConfig["FixedMenu-AccessKey"] = tmp["FixedMenu-AccessKey"];
						PageHandler.getInstance().initFixedMenu();
						menu.prop_IsChanged = false;
					} );

					$cancel.click( function() {
						PageHandler.getInstance().initFixedMenu();
						menu.prop_IsChanged = false;
					} );

					break;
				}

				case "izCombo-Option izCombo-SelectedOption": {
					var $cbo,	$lst;

					switch( event.target.parentNode.className ) {
						case "izCombo-List izSearch":
							$cbo = self.$cboSearch;
							$lst = self.$lstSearch;
							datums = conf.ezSearchList;
							break;
						case "izCombo-List izTitle":
							$cbo = self.$cboTitle;
							$lst = self.$lstTitle;
							datums = conf.removeTitleList;
							break;
						case "izCombo-List izAuthor":
							$cbo = self.$cboAuthor;
							$lst = self.$lstAuthor;
							datums = conf.removeAuthorList;
							break;
					}

					$cbo.data( "bid", $target.data( "bid" ) );
					if ( $lst.data( "options" ).prop_IsChanged ) {
						if ( confirm( "項目已經修改, 是否儲存?" ) ) {
							$lst.izListBox( "save" );
							datums[$lst.data( "bid" )] = $lst.data( "options" ).datum;
						}
					}
					$lst.data( "bid", $target.data( "bid" ) );
					$lst.data( "options" ).datum = datums[$target.data( "bid" )];
					$lst.izListBox( "update" );
					break;
				}

				case "izMore-Item izMore-SelectedItem": {
					var $cbo;

					switch( event.target.parentNode.parentNode.className ) {
						case "izMore-List izSearch":
							$cbo = self.$cboSearch;
							break;
						case "izMore-List izTitle":
							$cbo = self.$cboTitle;
							break;
						case "izMore-List izAuthor":
							$cbo = self.$cboAuthor;
							break;
					}

					$cbo
						.izComboBox( "value", $target.data( "name" ) )
						.find( ".izCombo-Txt" )
						.trigger( "keyup", 13 );
					break;
				}

				default: {
					$dlg.find( ".izMoreBox" ).izMoreBox( "hide" );
					$dlg.find( ".izComboBox" ).izComboBox( "hide" );
					break;
				}
			}
		} );

		$dlg.mousedown( function( event ) {
			switch( event.target.className ) {
				case "izTitlebar" :
					$( this ).izDraggable( event );
					break;
			}
		} );
	};

	var _instance = null;
	return ( {
		getInstance: function() {
			if ( _instance === null ) {
				_instance = new options();
			}
			return _instance;
		}
	} );
} )();
//--

//-- OptionsDialog 顯示按鈕
$( "<span class='ST izOptionsBtn'>設定</span>" )
	.css( { position:'fixed', 'z-index':257, top:"0.5em", left:"1em" } )
	.hover(
		function() {
			this.className = "ST_IN izOptionsBtn";
		}, function() {
			this.className = "ST izOptionsBtn";
		} )
	.click( function( event ) {
		if ( OptionsDialog.getInstance().dialog.style.display === "none" ) {
			if ( event.ctrlKey && event.button === 0 ) {
				OptionsDialog.getInstance().dialog.style.top = "10px";
				OptionsDialog.getInstance().dialog.style.left = "350px"
			}
			OptionsDialog.getInstance().show();
		} else {
			OptionsDialog.getInstance().$stdDialogButton.find( ".izCancel" ).trigger( "click" );
		}
	} )
	.appendTo( document.body );
//--

PageHandler.getInstance().buildAll();

}

//****************************************************************************
// 處理 postshow 頁 (內文頁)
//****************************************************************************
else if ( /postshow\.pl/.test( gBaseUrl ) ) {

//-- 文章頁面處理
var PageHandler = ( function() {
	var Layout = function() {
		this.mainMenu = document.getElementById( "BbsShowMenu" );
		this.mainMenu.classList.add( "hyMainMenu" );

		this.aTitle = document.body.querySelector( "#BbsShow > table.AT" );
		this.aTitle.classList.add( "hyATitle" );

		this.mainContent = this.aTitle.nextElementSibling;
		this.mainContent.classList.add( "hyMainContent" );

		// this.mainContent = document.evaluate('/html/body/div[1]/table[3]/tbody/tr[3]/td', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

	};

	Layout.prototype = {
		aTitle: null,
		mainMenu: null,
		mainContent: null,
		isLoaded: false,
		filteredImages: [],

		archives: null,

		initArticle: function() {
			var conf = IzConfig;

			this.aTitle.style.width = this.mainContent.style.width = conf["Article-Width"];

			//-- 固定內文寬度
			var bigElement = this.mainContent.querySelector( "fieldset" );
			bigElement.style.display = "table-cell";
			bigElement.style.width = parseInt( conf["Article-Width"], 10 ) - 40 + conf["Article-Width"].substr( -2, 2 );
			bigElement.style.lineHeight = "normal";
			this.mainContent.style.tableLayout = "fixed";
			//--

			document.getElementById( "BbsShow" ).parentNode.id = "izArticle";

			var style = document.getElementById( "izStyle-Article" );
			if ( !style ) {
				style = document.createElement( "style" );
				style.id = "izStyle-Article";
				style.type = "text/css";
				document.head.appendChild( style );
			}

			var styleText = "#izArticle {width:" + conf["Article-Width"];

			if ( conf["Article-Position"] !== MyConfig.Position_Relative ) {
				styleText += ";position:absolute;z-index:100;top:" + conf["Article-OffsetY"];
				if ( conf["Article-Place"] !== MyConfig.Place_Left ) {
					styleText += ";left:" + 'auto';
					styleText += ";right:" + conf["Article-OffsetX"];
				} else {
					styleText += ";left:" + conf["Article-OffsetX"];
					styleText += ";right:" + 'auto';
				}
			} else {
				styleText += ";position:relative;margin:" + conf["Article-MarginTop"] + " " + ( conf["Article-Center"] ? 'auto': conf["Article-MarginLeft"] );
			}

			styleText += ";word-wrap:break-word;}#izArticle, #izArticle th, #izArticle td, #izArticle input, #izArticle select {font-size:" + conf["Article-FontSize"] + ";}";

			style.textContent = styleText;
		},

		buildImageToolbar: function() {
			var conf = IzConfig,
				len = this.filteredImages.length,
				style = document.getElementById( "izStyle-ImageToolbar" );

			if ( !style ) {
				style = document.createElement( "style" );
				style.id = "izStyle-ImageToolbar";
				style.type = "text/css";
				style.textContent = '.izImageToolbar {width:9em;border:1px outset #bbb;border-radius:3px;background-color:#D4D0C8;color:#000;text-align:center;font-family:"微軟正黑體", sans-serif;-moz-user-select:-moz-none;-webkit-user-select:none;}.izImageToolbar span {display:inline-block;width:1.5em;height:1.2em;}.izImageToolbar span:hover {background-color:#aaa;}';
				document.head.appendChild( style );
			}

			var insertBar = function( img, sibling ) {

				img.style.border = "none";

				$( "<div class='izImageToolbar'></div>")
					.append( $( "<span class='izImageToolbar-izVisibility' title='顯示 / 隱藏'>" + ( img.style.display !== "none" ? "隱" : "顯" ) + "</span>" )
						.click( function() {
							if ( img.style.display !== "none" ) {
								img.style.display = "none";
								this.textContent = "顯";
							} else {
								img.style.display = "";
								this.textContent = "隱";
							}
							return false;
						} )
					)
					.append( $( "<span class='izImageToolbar-ZoomIn' title='放大'>大</span>" )
						.click( function() {
							if ( img.style.display !== "none" && img.naturalWidth ) {
								img.width += Math.floor( img.width * conf["ImageToolbar-ZoomFactor"] );
								img.height += Math.floor( img.height * conf["ImageToolbar-ZoomFactor"] );
							}
							return false;
						} )
					)
					.append( $( "<span class='izImageToolbar-ZoomOut' title='縮小'>小</span>" )
						.click( function() {
							if ( img.style.display !== "none" && img.naturalWidth ) {
								img.width -= Math.floor( img.width * conf["ImageToolbar-ZoomFactor"] );
								img.height -= Math.floor( img.height * conf["ImageToolbar-ZoomFactor"] );
							}
							return false;
						} )
					)
					.append( $( "<span class='izImageToolbar-izSize' title='原始大小 / 縮圖大小'>" + ( conf["ImageToolbar-View"] !== MyConfig.Display_Thumbnail ? "縮" : "原" ) + "</span>" )
						.click( function() {
							if ( img.style.display !== "none" && img.naturalWidth ) {
								if ( this.textContent !== "原" ) {
									if ( img.naturalWidth > conf["ImageToolbar-ThumbSize"] ) {
										img.width = conf["ImageToolbar-ThumbSize"];
										img.height = Math.floor( img.naturalHeight * conf["ImageToolbar-ThumbSize"] / img.naturalWidth );
									}

									if ( img.height > conf["ImageToolbar-ThumbSize"] ) {
										img.width = Math.floor( img.naturalWidth * conf["ImageToolbar-ThumbSize"] / img.naturalHeight );
										img.height = conf["ImageToolbar-ThumbSize"];
									}

									this.textContent = "原";
								} else {
									img.width = img.naturalWidth;
									img.height = img.naturalHeight;

									this.textContent = "縮";
								}
							}

							return false;
						} )
					)
					.append( $( "<span class='izImageToolbar-Reload' title='重新載入'>重</span>" )
						.click( function() {
							if ( img.style.display !== "none" ) {
								img.src = img.src;
								img.src = img.src;
							}
							return false;
						} )
					)
					.append( $( "<span class='izImageToolbar-information' title='圖片資訊'>訊</span>" )
						.click( function() {
							alert(
								"來源: " + img.src +
								"\n顯示寬度: " + img.width +
								"\n顯示高度: " + img.height +
								"\n實際寬度: " + img.naturalWidth +
								"\n實際高度: " + img.naturalHeight
							);
							return false;
						} )
					)
					.insertBefore( sibling );
			};


			while ( len-- ) {
				var img = this.filteredImages[len],
					sibling = img.parentNode.nodeName.toLowerCase() !== 'a' ? img : img.parentNode;

				insertBar( img, sibling )
			}
		},

		buildAll: function() {
			var conf = IzConfig,
				d = document,
				b = d.body;

			//-- 編排文章
			if ( conf["Article-Layout-Enable"] ) {
				this.initArticle();
			} else if ( this.isLoaded ) {
				var s = document.getElementById( "izStyle-Article" );
				if ( s ) {
					s.textContent = "";
				}
				this.aTitle.style.width = "";
				this.mainContent.style.width = "";
				this.mainContent.style.display = "";
				this.mainContent.style.width = "";
			}
			//--

			//--	重啟圖片檢視器
			var slideshow = b.getElementsByClassName( 'izSlideShow' )[0];
			if ( this.isLoaded && slideshow ) {
				slideshow.parentNode.removeChild( slideshow );
			}
			//--

			//// 啟動任務排程
			var taskQueue = new TaskQueue();
			taskQueue.thisArg = this;
			taskQueue.autoEnd = true;

			//-- 展開 marquee
			taskQueue.add( { fn: function() {
				if ( conf["Article-ExpandMarquee-Enable"] ) {
					if ( document.getElementsByClassName( "izMarquee" ).length ) {
						return;
					}

					var m, div, marquee = b.getElementsByTagName( 'marquee' ), len = marquee.length;
					while ( len-- ) {
						div = document.createElement( "div" );
						m = marquee[len];

						div.className = 'izMarquee';
						div.innerHTML = m.innerHTML;
						div.style.backgroundColor = m.getAttribute( "bgcolor" );
						m.parentNode.insertBefore( div, m.nextSibling );
						m.style.display = "none";
					}
				} else if ( this.isLoaded ) {
					var ms = b.getElementsByClassName( 'izMarquee' ), mlen = ms.length, m;
					while ( mlen-- ) {
						m = ms[mlen];
						m.parentNode.removeChild( m );
					}

					var oms = b.getElementsByTagName( 'marquee' ), omlen = oms.length;
					while ( omlen-- ) {
						oms[omlen].style.display = "";
					}
				}
			} } );
			//--

			//-- 過濾圖片, 特定網站和小圖
			taskQueue.add( { interval: 1500, fn: function() {
				var imgs = this.mainContent.getElementsByTagName( "img" ), len = imgs.length;

				this.filteredImages = [];
				for ( var i = 0, img; len > i; ++i ) {
					img = imgs[i];
					if (	/hjchung|whos/.test( img.src ) ) {
						continue;
					} else if ( img.naturalWidth !== 0 ) {
						if ( conf["ImageToolbar-MinWidthLimit"] > img.naturalWidth || conf["ImageToolbar-MinHeightLimit"] > img.naturalHeight ) {
							continue;
						}
					}
					this.filteredImages.push( img );
				}
			} } );
			//--

			//-- 圖片錯誤重試
			if ( conf["Article-ImageRetry"] ) {
				taskQueue.add( { fn: function() {
					if ( !this.filteredImages.length ) {
						return;
					}

					var errImg = function( img ) {
							if ( !img.naturalWidth ) {
								var retry = conf["Article-ImageRetry"];
								$( img ).bind( "error.izImageRetry", function() {
									//debug
									//console.log( "Article ImageRetry: " + retry + ', ' + this.src );
									if ( retry-- ) {
										this.src = this.src;
										this.src = this.src;
									} else {
										$( this ).unbind( "error.izImageRetry" );
									}
								} );

								img.src = img.src;
								img.src = img.src;
							}
						};

					for ( var i = 0, len = this.filteredImages.length; len > i; ++i ) {
						errImg( this.filteredImages[i] );
					}
				} } );
			}
			//--

			//-- 圖片的顯示方式
			if ( conf["ImageToolbar-Enable"] ) {
				taskQueue.add( { fn: function() {
					if ( !this.filteredImages.length ) {
						return;
					}

					switch ( conf["ImageToolbar-View"] ) {
						case MyConfig.Display_ActualSize: {
							var len = this.filteredImages.length;

							var img;
							while ( len-- ) {
								img = this.filteredImages[len];
								if ( img.oldWidth ) {
									img.width = img.prop_OldWidth;
									img.height = img.prop_OlddHeight;
								}
								img.style.display = "";
							}
							break;
						}

						case MyConfig.Display_Thumbnail: {
							var resizeImg = function( img ) {
								var timeoutID;

								var resize = function( im, nw, nh ) {
									im.width = nw;
									im.height = nh;

									if ( nw > IzConfig["ImageToolbar-ThumbSize"] ) {
										im.width = IzConfig["ImageToolbar-ThumbSize"];
										im.height = Math.floor( nh * IzConfig["ImageToolbar-ThumbSize"] / nw );
									}

									if ( im.height > IzConfig["ImageToolbar-ThumbSize"] ) {
										im.width = Math.floor( nw * IzConfig["ImageToolbar-ThumbSize"] / nh );
										im.height = IzConfig["ImageToolbar-ThumbSize"];
									}
								};

								$( img ).bind( "error.izImageResize", function() {
									window.clearTimeout( timeoutID );
									$( this ).unbind( "error.izImageResize" )

									$( window ).bind( "load.izImageResize", function() {
										if ( img.naturalWidth ) {
											resize( img, img.naturalWidth, img.naturalHeight );
										}
										$( this ).unbind( "load.izImageResize" );
										//debug
										//console.log( img.width + ", " + img.height + " load: " + img.src );
									} );
								} );

								timeoutID = window.setTimeout( function() {
									if ( img.naturalWidth ) {
										resize( img, img.naturalWidth, img.naturalHeight );
									} else {
										timeoutID = window.setTimeout( arguments.callee, 20 );
									}
								}, 20 );
							};

							var image, len = this.filteredImages.length;
							while ( len-- ) {
								image = this.filteredImages[len];
								if ( !image.prop_OldWidth ) {
									image.prop_OldWidth = image.width;
									image.prop_OlddHeight = image.height;
								}
								image.removeAttribute( "width" );
								image.removeAttribute( "height" );
								resizeImg( image );
								image.style.display = "";
							}

							break;
						}

						case MyConfig.Display_Hide: {
							var img, len = this.filteredImages.length;
							while ( len-- ) {
								img = this.filteredImages[len];
								if ( img.prop_OldWidth ) {
									img.width = img.prop_OldWidth;
									img.height = img.prop_OlddHeight;
								}
								img.style.display = "none";
							}

							break;
						}
					}
				} } );
			}
			//--

			//-- 文章暫存選單
			if ( conf["Article-Storage-Enable"] ) {
				if ( !this.archives ) {
					taskQueue.add( { fn: function() {
						var that = this,
							id = MyUtils.getQuerystring( gBaseUrl, "bnum" ),
							mainMenu = b.querySelector( ".izMenu > ul" ),
							li = document.createElement( "li" );

						li.className = "izMenu-ArticleStorage izHasSubMenu";
						li.innerHTML = '<span>文章<br />暫存</span><div class="izSubMenu"><ul><li class="izMenu-Add"><span>暫存<br />本文</span><div class="izHint triangle-border top">新增本文記錄</div></li><li class="izMenu-Edit"><span>編輯<br />本文</span><div class="izHint triangle-border top">編輯本文記錄</div></li><li class="izMenu-Delete"><span>刪除<br />本文</span><div class="izHint triangle-border top">刪除本文記錄</div></li></ul></div>';
						mainMenu.appendChild( li );

						this.archives = new Archives;

						var mnuAdd = li.getElementsByClassName( "izMenu-Add" )[0],
							mnuDelete = li.getElementsByClassName( "izMenu-Delete" )[0],
							mnuEdit = li.getElementsByClassName( "izMenu-Edit" )[0];

						if ( this.archives.isIncluded( id ) ) {
							mnuAdd.style.display = "none";
						} else {
							mnuDelete.style.display = "none";
							mnuEdit.style.display = "none";
						}

						mnuAdd.addEventListener( "click", function( event ) {
							var p = new that.archives.itemProto;

							p.id	= id;
							p.board = gCurrentBoard;
							p.subject = that.aTitle.rows[0].cells[0].textContent;
							p.author = that.mainContent.querySelector( "legend font" ).textContent;
							p.date = that.mainContent.querySelector( "legend br" ).nextSibling.textContent.replace( "本文：", "" );
							p.url = gBaseUrl;
							p.comment = "";

							that.archives.addRow( p );

							mnuAdd.style.display = "none";
							mnuDelete.style.display = "";
							mnuEdit.style.display = "";
						}, false );

						mnuEdit.addEventListener( "click", function( event ) {
							if ( that.archives.isIncluded( id ) ) {
								var tr, rows = that.archives.$grid.find( "tr" ).get(), len = rows.length;
								while ( len-- ) {
									tr = rows[len];
									if ( tr.prop_Piece.id == id ) {
										that.archives.showView( Archives.Display_Detail, len + 1 );
										break;
									}
								}
							}
						}, false );

						mnuDelete.addEventListener( "click", function( event ) {
							var a = that.archives;
							a.delRowById( id );

							if ( a.view.style.display !== "none" && a.detail.prop_PieceId == id ) {
								if ( a.grid.style.display !== "none" ) {
									a.clearDetail();
								} else {
									a.hideView();
								}
							}

							mnuAdd.style.display = "";
							mnuDelete.style.display = "none";
							mnuEdit.style.display = "none";
						}, false );

						window.addEventListener( "storage", function( event ) {
							that.archives.init();
							var pp, re = new RegExp( "izArticle-Piece:\\d+" );
							if ( event.key !== null && re.test( event.key ) ) {	// !clear

								pp	= new that.archives.itemProto;

								if ( event.oldValue === null ) { // new item
									MyUtils.extend( pp, JSON.parse( localStorage.getItem( event.key ) ) );

									if ( id == pp.id ) {
										mnuAdd.style.display = "none";
										mnuDelete.style.display = "";
										mnuEdit.style.display = "";
									}
								} else if ( event.newValue === null ) { // remove
									MyUtils.extend( pp, JSON.parse( event.oldValue ) );

									if ( id == pp.id ) {
										mnuAdd.style.display = "";
										mnuDelete.style.display = "none";
										mnuEdit.style.display = "none";
										that.archives.hideView( true );
									}
								}
							}
						}, false);
					} } );
				}
			}
			//--

			//-- 建立影像工具列和選單
			if ( conf["ImageToolbar-Enable"] ) {
				taskQueue.add( { interval: 500, fn: function() {
					if ( !this.filteredImages.length ) {
						return;
					}

					var it, imageToolbars = b.getElementsByClassName( 'izImageToolbar' ), len = imageToolbars.length;
					while ( len-- ) {
						it = imageToolbars[len];
						it.parentNode.removeChild( it );
					}

					this.buildImageToolbar();

					// 建立影像工具選單
					var imageToolMenu = document.body.getElementsByClassName( "izMenu-ImageTool" )[0];
					if ( imageToolMenu ) {
						imageToolMenu.style.display = "";
					} else {
						var mainMenu = b.querySelector( ".izMenu > ul" ),
							li = document.createElement( "li" );

						li.className = "izMenu-ImageTool izHasSubMenu";
						li.innerHTML = '<span>影像<br />工具</span><div class="izSubMenu"><ul><li class="izMenu-HideAll"><span>全部<br />隱藏</span><div class="izHint triangle-border top">隱藏所有圖片</div></li><li class="izMenu-ShowAll"><span>全部<br />顯示</span><div class="izHint triangle-border top">顯示所有圖片</div></li><li class="izMenu-IntrinsicSize"><span>原始<br />大小</span><div class="izHint triangle-border top">全調整為原始大小</div></li><li class="izMenu-ThumbSize"><span>縮圖<br />大小</span><div class="izHint triangle-border top">全調整為縮圖大小</div></li><li class="izMenu-Reload"><span>重新<br />載入</span><div class="izHint triangle-border top">全部重新載入</div></li></ul></div>';
						mainMenu.appendChild( li );

						li.getElementsByClassName( "izMenu-ShowAll" )[0].addEventListener( "click", function( event ) {
							var images = PageHandler.getInstance().filteredImages,
								toolbars = document.body.getElementsByClassName( "izImageToolbar"),
								len = images.length;

							while ( len-- ) {
								images[len].style.display = "";
							}

							len = toolbars.length;
							while ( len-- ) {
								toolbars[len].getElementsByClassName( "izImageToolbar-izVisibility" )[0].textContent = "隱";
							}
						}, false );

						li.getElementsByClassName( "izMenu-HideAll" )[0].addEventListener( "click", function( event ) {
							var images = PageHandler.getInstance().filteredImages,
								toolbars = document.body.getElementsByClassName( "izImageToolbar"),
								len = images.length;

							while ( len-- ) {
								images[len].style.display = "none";
							}

							len = toolbars.length;
							while ( len-- ) {
								toolbars[len].getElementsByClassName( "izImageToolbar-izVisibility" )[0].textContent = "顯";
							}
						}, false );

						li.getElementsByClassName( "izMenu-IntrinsicSize" )[0].addEventListener( "click", function( event ) {
							var images = PageHandler.getInstance().filteredImages,
								toolbars = document.body.getElementsByClassName( "izImageToolbar"),
								len = images.length,	img;

							while ( len-- ) {
								img = images[len];
								img.width = img.naturalWidth;
								img.height = img.naturalHeight;
							}

							len = toolbars.length;
							while ( len-- ) {
								toolbars[len].getElementsByClassName( "izImageToolbar-izSize" )[0].textContent = "縮";
							}
						}, false );

						li.getElementsByClassName( "izMenu-ThumbSize" )[0].addEventListener( "click", function( event ) {
							var images = PageHandler.getInstance().filteredImages,
								toolbars = document.body.getElementsByClassName( "izImageToolbar"),
								len = images.length,	conf = IzConfig, img;

							while ( len-- ) {
								img = images[len];
								if ( img.naturalWidth > conf["ImageToolbar-ThumbSize"] ) {
									img.width = conf["ImageToolbar-ThumbSize"];
									img.height = Math.floor( img.naturalHeight * conf["ImageToolbar-ThumbSize"] / img.naturalWidth );
								}

								if ( img.height > conf["ImageToolbar-ThumbSize"] ) {
									img.width = Math.floor( img.naturalWidth * conf["ImageToolbar-ThumbSize"] / img.naturalHeight );
									img.height = conf["ImageToolbar-ThumbSize"];
								}
							}

							len = toolbars.length;
							while ( len-- ) {
								toolbars[len].getElementsByClassName( "izImageToolbar-izSize" )[0].textContent = "原";
							}
						}, false );

						li.getElementsByClassName( "izMenu-Reload" )[0].addEventListener( "click", function( event ) {
							var images = PageHandler.getInstance().filteredImages, len = images.length, img;

							while ( len-- ) {
								img = images[len];
								img.src = img.src;
								img.src = img.src;
							}
						}, false );

					}
				} } );
			} else if ( this.isLoaded ) {
				var it, imageToolbars = b.getElementsByClassName( 'izImageToolbar' ), len = imageToolbars.length;
				while ( len-- ) {
					it= imageToolbars[len];
					it.parentNode.removeChild( it );
				}

				var imageToolMenu = document.body.getElementsByClassName( "izMenu-ImageTool" )[0];
				if ( imageToolMenu ) {
					imageToolMenu.style.display = "none";
				}
			}
			//--

			//-- 自動啟動圖片檢視器
			if ( conf["Viewer-AutoStartup-Enable"] ) {
				taskQueue.add( { fn: function() {
					var evt = document.createEvent( "MouseEvents" );
					evt.initEvent( "click", true, true );
					document.body.getElementsByClassName( "izMenu" )[0].getElementsByClassName( "izMenu-ShowViewer" )[0].dispatchEvent( evt );
				} } );
			}
			//--

			taskQueue.add( { fn: function() { this.isLoaded = true; } } );
			taskQueue.start();
		}
	};

	var _instance = null;
	return ( {
		getInstance: function() {
			if ( _instance === null ) {
				_instance = new Layout();
			}
			return _instance;
		}
	} );
} )();
//--

//-- 文章偏好設定 OptionsDialog Prototype
var OptionsDialog = ( function() {
	var options = function() {
		var style = document.createElement( "style" );
		style.id = "izStyle-OptionsDialog";
		style.type = "text/css";
		style.textContent =	'#izOptionsDialog input[type="button"],#izOptionsDialog input[type="text"],#izOptionsDialog fieldset {border:1px solid #aaa;border-radius:4px;color:#666;}#izOptionsDialog input[type="button"] {margin-bottom:1px;padding:2px 3px;background:#aaa;color:#fff;}#izOptionsDialog input[type="button"]:hover {background:#999;color:#fff;}#izOptionsDialog input[type="button"]::-moz-focus-inner,#izOptionsDialog input[type="button"]::-webkit-focus-inner {border:none;}#izOptionsDialog fieldset {margin:10px 0;}#izOptionsDialog input:disabled,#izOptionsDialog input:disabled:hover {border:1px solid #cbcbcb;background:#cbcbcb;color:#fff;}#izOptionsDialog p {margin:8px 0;}#izOptionsDialog input[type="checkbox"],#izOptionsDialog input[type="radio"] {vertical-align:bottom;}#izOptionsDialog *:not(input) {-moz-user-select:-moz-none;-webkit-user-select:none;}#izOptionsDialog {position:fixed;z-index:254;top:20px;left:350px;min-width:28em;margin:0 auto;padding:0 10px 2px;border:1px solid #e0e0e0;border-radius:10px;background-color:#fff;color:#666;box-shadow:3px 3px 3px #ccc;font-family:"微軟正黑體", sans-serif;}#izOptionsDialog > .izTitlebar {margin:0 -10px 5px;padding:3px 10px;border-radius:10px 10px 0 0;background-image:-moz-linear-gradient(top, #eee, #f5f5f5, #eee, #f5f5f5, #eee, #f5f5f5, #eee, #f5f5f5, #eee, #f5f5f5);background-image:-webkit-linear-gradient(top, #eee, #f5f5f5, #eee, #f5f5f5, #eee, #f5f5f5, #eee, #f5f5f5, #eee, #f5f5f5);font-weight:bold;color:#aaa;text-align:center;}#izOptionsDialog input.izTitlebar-CloseButton {float:right;padding:0;border:none;background-color:transparent;color:#aaa;}#izOptionsDialog input.izTitlebar-CloseButton:hover {background-color:transparent;color:#aaa;}#izDialogBtn {clear:both;margin:10px 5px 5px;text-align:right;}#izDialogBtn .izHelp {float:left;}#izNoteBook > .izNotebook-Tabs {list-style-type:none;float:left;margin:10px 0;padding:0px;}#izNoteBook > .izNotebook-Tabs > .izNotebook-Tab {margin:0 0 -12px 0;}#izNoteBook > .izNotebook-Tabs > .izNotebook-Tab > a {display:inline-block;margin:0px;padding:4px;width:41px;border:1px outset #999;border-right:none;border-radius:5px 0 0 5px;background-color:#999;color:#fff;text-decoration:none;text-align:center;}#izNoteBook > .izNotebook-Tabs > .izNotebook-Tab.tabSelected > a {padding-right:5px;border:1px solid #999;border-right:none;background-color:#fff;color:#666;cursor:default;}#izNoteBook > .izNotebook-Tabs > .izNotebook-Tab:not(.tabSelected) > a:hover {background:#8d8d8d;}#izNoteBook > .izNotebook-Page {display:none;min-height:19em;margin-left:50px;padding:10px;border:1px solid #999;border-radius:6px;line-height:1.4em;}#izNoteBook > .izNotebook-Page.izTabPage01 {display:block;}#izOptionsDialog .izComboBox {display:inline-block;}#izOptionsDialog .izComboBox > .izCombo-Box {width:7em;border:1px solid #aaa;border-radius:4px;}#izOptionsDialog .izComboBox > .izCombo-Box > .izCombo-Txt {width:6em;}#izOptionsDialog .izComboBox > .izCombo-Box > .izCombo-Dropmarker {border:2px solid #aaa;border-bottom:1px solid #aaa;background-color:#aaa;line-height:1em;}#izOptionsDialog .izComboBox > .izCombo-List {height:5em;border:1px solid #aaa;border-radius:4px;background-color:white;-moz-user-select:-moz-none;-webkit-user-select:none;}#izOptionsDialog .izComboBox > .izCombo-List > div {padding:1px;white-space:pre;}#izOptionsDialog .izCombo-List > .izCombo-SelectedOption {background:#999;color:#fff;}#izOptionsDialog .izListBox {margin:5px 0;}#izOptionsDialog .izListBox > .izlist-Select {float:left;width:9em;height:4em;margin:0 5px 0 0;border:1px solid #aaa;border-radius:4px;color:#666;}#izOptionsDialog .izListBox > .izList-Up-Down {float:left;}#izOptionsDialog .izListBox .izList-Up,#izOptionsDialog .izListBox .izList-Down {width:1.5em;height:2em;margin:0 3px 1px;padding:0;}#izOptionsDialog .izListBox .izList-Up {border-radius:2em 2em 0 0;}#izOptionsDialog .izListBox .izList-Down {border-radius:0 0 2em 2em;}#izOptionsDialog .izSpin > .izSpin-Txt {width:1.5em;padding-right:5px;border-left-width:0;border-right-width:0;border-radius:0;text-align:right;}#izOptionsDialog .izSpin > .izSpin-Minus {margin:0;padding:0;width:1.2em;border-radius:1.2em 0 0 1.2em;}#izOptionsDialog .izSpin > .izSpin-Plus {margin:0;padding:0;width:1.2em;border-radius:0 1.2em 1.2em 0;}#izOptionsDialog .izMoreBox {display:inline-block;margin:0;}#izOptionsDialog .izMoreBox > .izMore-Btn {margin:0;padding:0 2px;border-bottom:none;background-color:#aaa;}#izOptionsDialog .izMoreBox > .izMore-List {border:1px solid #aaa;border-radius:4px;background-color:white;-moz-user-select:-moz-none;-webkit-user-select:none;}#izOptionsDialog .izMoreBox .izMore-ItemSet {margin:5px 2px;padding:3px;white-space:nowrap;}#izOptionsDialog .izMoreBox .izMore-Item {margin:2px;padding:3px 2px;border:1px solid #aaa;border-radius:4px;}#izOptionsDialog .izMoreBox .izMore-SelectedItem {background-color:#999;color:#fff;cursor:pointer;}#izOptionsDialog .izCustomTitle {width:100%;height:7em;}#izOptionsDialog .izCustomTitle .izReportToolbar {width:266px;margin:2px 0;padding:1px 10px;border:1px solid #ccc;}#izOptionsDialog .izCustomTitle table,#izOptionsDialog .izCustomTitle th,#izOptionsDialog .izCustomTitle td {border:1px solid #ccc;background:none;}#izOptionsDialog .izCustomTitle thead th:first-child,#izOptionsDialog .izCustomTitle tbody td:first-child {padding:2px;}#izOptionsDialog .izCustomTitle thead th:not(:first-child),#izOptionsDialog .izCustomTitle tbody td:not(:first-child) {width:120px;}#izOptionsDialog .izCheckAll,#izOptionsDialog .izCheck {width:1em;height:1em;background-color:#ddd;}#izOptionsDialog .izReport-Selected {outline:1px solid #666;}#izOptionsDialog .izReport-Selected .izCheck {background-color:#666;}';
		document.head.appendChild( style );

		this.dialog = document.createElement( "div" );
		this.dialog.id = "izOptionsDialog";
		this.dialog.innerHTML = '<div class="izTitlebar">偏好設定<input type="button" class="izTitlebar-CloseButton" value="╳" /></div><div id="izNoteBook" class="izNoteBook"><ul class="izNotebook-Tabs"><li data-tabNo="0" class="izNotebook-Tab izTab01 tabSelected"><a>版面設定</a></li>&nbsp<li data-tabNo="1" class="izNotebook-Tab izTab02"><a>影像工具</a></li>&nbsp<li data-tabNo="2" class="izNotebook-Tab izTab03"><a>圖片瀏覽</a></li></ul><div class="izNotebook-Page izTabPage01"><label><input type="checkbox" class="chkArticleLayout" />啟用編排文章</label><br /><fieldset><legend>選項</legend><label>文章寬度 <input type="text" class="izArticle-WidthTxt" value="950px" size="8" maxlength="8" /></label>&nbsp<label>字體大小 <input type="text" class="izArticle-FontSizeTxt" value="18px" size="6" maxlength="6" /></label><br />使用 <label><input type="radio" name="izArticle-PositionRad" value="0" checked="checked" />相對坐標</label><label><input type="radio" name="izArticle-PositionRad" value="1" />絕對坐標</label><div class="izArticle-Pos-Relative">置於 <label><input type="checkbox" class="izArticle-CenterChk" checked="checked" />中央</label><br /><label>看板上邊際 <input type="text" class="izArticle-MarginTopTxt" value="0.5em" size="8" maxlength="8" /></label>&nbsp<label>看板左邊際 <input type="text" class="izArticle-MarginLeftTxt" value="14em" size="8" maxlength="8" /></label></div><div class="izArticle-Pos-Absolute">置於 <label><input type="radio" name="izArticle-PlaceRad" value="0" checked="checked" />左側</label>&nbsp<label><input type="radio" name="izArticle-PlaceRad" value="1" />右側</label><br /><label>距視窗上緣 <input type="text" class="izArticle-OffsetYTxt" value="0.5em" size="8" maxlength="8" /></label>&nbsp<label>距視窗側緣 <input type="text" class="izArticle-OffsetXTxt" value="14em" size="8" maxlength="8" /></label></div><label><input type="checkbox" class="izArticle-ExpandMarqueeChk" checked="checked" />展開跑馬燈</label></fieldset><label>圖片重試次數：</label><span class="izSpin izArticle-ImageRetrySpin"><input type="text" class="izSpin-Txt" value="0" title="請輸入數字" size="1" maxlength="1" /></span></div><div class="izNotebook-Page izTabPage02"><label><input type="checkbox" class="chkImageToolbar" />啟用影像工具列</label><br /><fieldset><legend>影像工具列</legend><label>限制應用大小：</label><label>寬度 <input type="text" class="izImageToolbar-MinWidthLimitTxt" value="200px" size="8" maxlength="8" /></label>&nbsp<label>高度 <input type="text" class="izImageToolbar-MinHeightLimitTxt" value="200px" size="8" maxlength="8" /></label><br /><label>檢視模式：</label><label><input type="radio" name="izImageToolbar-View" value="0" checked="checked" />預設</label>&nbsp<label><input type="radio" name="izImageToolbar-View" value="1" />縮圖</label>&nbsp<label><input type="radio" name="izImageToolbar-View" value="2" />隱藏</label><br /><label>縮圖大小：<input type="text" class="izImageToolbar-ThumbSizeTxt" value="256px" size="8" maxlength="8" /></label><br /><label>每次縮放倍數：<input type="text" class="izImageToolbar-ZoomFactorTxt" value="0.25" title="請輸入數字" size="6" maxlength="6" /></label><br /></fieldset></div><div class="izNotebook-Page izTabPage03"><fieldset><legend>圖片檢視器</legend><label>預設檢視模式：</label><label><input type="radio" name="izViewer-View" value="0" checked="checked" />原始大小</label>&nbsp<label><input type="radio" name="izViewer-View" value="1" />最適大小</label><br /><label>圖片重試次數：</label><span class="izSpin izViewer-RetrySpin"><input type="text" class="izSpin-Txt" value="0" title="請輸入數字" size="1" maxlength="1" /></span><br /><label>每次縮放倍數：<input type="text" class="izViewer-ZoomFactorTxt" value="0.25" title="請輸入數字" size="6" maxlength="6" /></label><br /><label>圖片背景顏色：<input type="text" class="izViewer-BgColorTxt" value="#efefef" title="請輸入 RGB" size="7" maxlength="7" /></label><br /><label>初始寬度 <input type="text" class="izViewer-WidthTxt" value="580px" size="8" maxlength="8" /></label>&nbsp<label>初始高度 <input type="text" class="izViewer-HeightTxt" value="480px" size="8" maxlength="8" /></label><br />使用 <label><input type="radio" name="izViewer-PositionRad" value="0" checked="checked" />固定坐標</label>&nbsp<label><input type="radio" name="izViewer-PositionRad" value="1" />絕對坐標</label><br />置於 <label><input type="radio" name="izViewer-PlaceRad" value="0" checked="checked" />左側</label>&nbsp<label><input type="radio" name="izViewer-PlaceRad" value="1" />右側</label><br /><label>距視窗上緣 <input type="text" class="izViewer-OffsetYTxt" value="2em" size="8" maxlength="8" /></label>&nbsp<label>距視窗側緣 <input type="text" class="izViewer-OffsetXTxt" value="200px" size="8" maxlength="8" /></label><br /><label><input type="checkbox" class="izViewer-AutoStartupChk" />載入後立刻啟動</label></fieldset></div></div><div id="izDialogBtn" class="izStdDialogButton"><input type="button" class="izOK" value="確定" />&nbsp<input type="button" class="izApply" value="套用" disabled="disabled" />&nbsp<input type="button" class="izCancel" value="取消" />&nbsp<input type="button" class="izHelp" value="說明" /></div>';
		document.body.appendChild( this.dialog );

		this.dialog.style.display = "none";

		var self = this, conf = IzConfig, dlg = this.dialog;

		this.$noteBook = $( document.getElementById( "izNoteBook" ) ).izNoteBook();
		this.$stdDialogButton = $( document.getElementById( "izDialogBtn" ) ).izStdDialogButton( {
			ok: function() { self.hide().saveConf( IzConfig ); PageHandler.getInstance().buildAll(); },
			apply: function() { self.saveConf( IzConfig ); PageHandler.getInstance().buildAll(); },
			cancel: function() { self.hide(); },
			help: function() { alert( "hungya fixer v" + gVersion ); }
		} );

		this.chkArticleLayout = dlg.getElementsByClassName( "chkArticleLayout" )[0];
		this.txtArticleWidth = dlg.getElementsByClassName( "izArticle-WidthTxt" )[0];
		this.txtArticleFontSize = dlg.getElementsByClassName( "izArticle-FontSizeTxt" )[0];
		this.radArticlePos = dlg.querySelectorAll( "input[name='izArticle-PositionRad']" );
		this.chkArticleCenter = dlg.getElementsByClassName( "izArticle-CenterChk" )[0];
		this.txtArticleMarginLeft = dlg.getElementsByClassName( "izArticle-MarginLeftTxt" )[0];
		this.txtArticleMarginTop = dlg.getElementsByClassName( "izArticle-MarginTopTxt" )[0];
		this.radArticlePlace = dlg.querySelectorAll( "input[name='izArticle-PlaceRad']" );
		this.txtArticleOffsetX = dlg.getElementsByClassName( "izArticle-OffsetXTxt" )[0];
		this.txtArticleOffsetY = dlg.getElementsByClassName( "izArticle-OffsetYTxt" )[0];
		this.chkArticleExpandMarquee = dlg.getElementsByClassName( "izArticle-ExpandMarqueeChk" )[0];
		this.$spinArticleImageRetry = $( dlg.getElementsByClassName( "izArticle-ImageRetrySpin" )[0] ).izSpinButton( { value: 0, max: 9, min: 0 } );

		this.chkImageToolbar = dlg.getElementsByClassName( "chkImageToolbar" )[0];
		this.txtImageToolbarMinWidthLimit = dlg.getElementsByClassName( "izImageToolbar-MinWidthLimitTxt" )[0];
		this.txtImageToolbarMinHeightLimit = dlg.getElementsByClassName( "izImageToolbar-MinHeightLimitTxt" )[0];
		this.radImageToolbarView = dlg.querySelectorAll( "input[name='izImageToolbar-View']" );
		this.txtImageToolbarThumbSize = dlg.getElementsByClassName( "izImageToolbar-ThumbSizeTxt" )[0];
		this.txtImageToolbarZoomFactor = dlg.getElementsByClassName( "izImageToolbar-ZoomFactorTxt" )[0];

		this.radViewerView = dlg.querySelectorAll( "input[name='izViewer-View']" );
		this.txtViewerZoomFactor = dlg.getElementsByClassName( "izViewer-ZoomFactorTxt" )[0];
		this.txtViewerBgColor = dlg.getElementsByClassName( "izViewer-BgColorTxt" )[0];
		this.$spinViewerRetry = $( dlg.getElementsByClassName( "izViewer-RetrySpin" )[0] ).izSpinButton( { value: 0, max: 9, min: 0 } );
		this.txtViewerWidth = dlg.getElementsByClassName( "izViewer-WidthTxt")[0];
		this.txtViewerHeight = dlg.getElementsByClassName( "izViewer-HeightTxt" )[0];
		this.radViewerPos = dlg.querySelectorAll( "input[name='izViewer-PositionRad']" );
		this.radViewerPlace = dlg.querySelectorAll( "input[name='izViewer-PlaceRad']" );
		this.txtViewerOffsetX = dlg.getElementsByClassName( "izViewer-OffsetXTxt" )[0];
		this.txtViewerOffsetY = dlg.getElementsByClassName( "izViewer-OffsetYTxt" )[0];
		this.chkViewerAutoStartup = dlg.getElementsByClassName( "izViewer-AutoStartupChk" )[0];

		options.evtHandler( this );
	};

	options.prototype = {
		dialog: null,

		$noteBook: null,
		$stdDialogButton: null,

		chkArticleLayout: null,
		txtArticleWidth: null,
		txtArticleFontSize: null,
		$spinArticleImageRetry: null,
		radArticlePos: null,
		chkArticleCenter: null,
		txtArticleMarginLeft: null,
		txtArticleMarginTop: null,
		radArticlePlace: null,
		txtArticleOffsetX: null,
		txtArticleOffsetY: null,
		chkArticleExpandMarquee: null,

		chkImageToolbar: null,
		txtImageToolbarMinWidthLimit: null,
		txtImageToolbarMinHeightLimit: null,
		radImageToolbarView: null,
		txtImageToolbarThumbSize: null,
		txtImageToolbarZoomFactor: null,

		radViewerView: null,
		txtViewerZoomFactor: null,
		txtViewerBgColor: null,
		$spinViewerRetry: null,
		txtViewerWidth: null,
		txtViewerHeight: null,
		radViewerPos: null,
		radViewerPlace: null,
		txtViewerffsetX: null,
		txtViewerffsetY: null,
		chkViewerAutoStartup: false,

		show: function() {
			this.$noteBook.find( ".izNotebook-Tab:nth-child(1)" ).trigger( "click" );
			this.loadConf( IzConfig );
			this.dialog.style.display = "";
			return this;
		},

		hide: function() {
			this.dialog.style.display = "none";
			return this;
		},

		loadConf: function( conf ) {
			this.chkArticleLayout.checked = conf["Article-Layout-Enable"];
			this.txtArticleWidth.value = conf["Article-Width"];
			this.txtArticleFontSize.value = conf["Article-FontSize"];
			conf["Article-Position"] === MyConfig.Position_Absolute ? this.radArticlePos[1].checked = true : this.radArticlePos[0].checked = true;
			this.chkArticleCenter.checked = conf["Article-Center"];
			this.txtArticleMarginLeft.value = conf["Article-MarginLeft"];
			this.txtArticleMarginTop.value = conf["Article-MarginTop"];
			conf["Article-Place"] === MyConfig.Place_Right ? this.radArticlePlace[1].checked = true : this.radArticlePlace[0].checked = true;
			this.txtArticleOffsetX.value = conf["Article-OffsetX"];
			this.txtArticleOffsetY.value = conf["Article-OffsetY"];
			this.chkArticleExpandMarquee.checked = conf["Article-ExpandMarquee-Enable"];
			this.$spinArticleImageRetry.izSpinButton( "value", conf["Article-ImageRetry"] );

			this.chkImageToolbar.checked = conf["ImageToolbar-Enable"];
			this.txtImageToolbarMinWidthLimit.value = conf["ImageToolbar-MinWidthLimit"];
			this.txtImageToolbarMinHeightLimit.value = conf["ImageToolbar-MinHeightLimit"];
			switch( conf["ImageToolbar-View"] ) {
				case MyConfig.Display_ActualSize:
					this.radImageToolbarView[0].checked = true;
					break;

				case MyConfig.Display_Hide:
					this.radImageToolbarView[2].checked = true;
					break;

				case MyConfig.Display_Thumbnail:
				default:
					this.radImageToolbarView[1].checked = true;
					break;
			}
			this.txtImageToolbarThumbSize.value = conf["ImageToolbar-ThumbSize"];
			this.txtImageToolbarZoomFactor.value = conf["ImageToolbar-ZoomFactor"];

			conf["Viewer-View"] === MyConfig.View_BestFit ? this.radViewerView[1].checked = true : this.radViewerView[0].checked = true;
			this.txtViewerZoomFactor.value = conf["Viewer-ZoomFactor"];
			this.txtViewerBgColor.value = conf["Viewer-BgColor"];
			this.$spinViewerRetry.izSpinButton( "value", conf["Viewer-Retry"] );
			this.txtViewerWidth.value = conf["Viewer-Width"];
			this.txtViewerHeight.value = conf["Viewer-Height"];

			conf["Viewer-Position"] === MyConfig.Position_Absolute ? this.radViewerPos[1].checked = true : this.radViewerPos[0].checked = true;
			conf["Viewer-Place"] === MyConfig.Place_Right  ? this.radViewerPlace[1].checked = true : this.radViewerPlace[0].checked = true;
			this.txtViewerOffsetY.value = conf["Viewer-OffsetY"];
			this.txtViewerOffsetX.value = conf["Viewer-OffsetX"];
			this.chkViewerAutoStartup.checked = conf["Viewer-AutoStartup-Enable"];

			return this;
		},

		saveConf: function( conf ) {
			conf["Article-Layout-Enable"] = this.chkArticleLayout.checked;
			conf["Article-Width"] = this.txtArticleWidth.value;
			conf["Article-FontSize"] = this.txtArticleFontSize.value;
			conf["Article-Position"] = this.radArticlePos[0].checked ? MyConfig.Position_Relative : MyConfig.Position_Absolute;
			conf["Article-Center"] = this.chkArticleCenter.checked;
			conf["Article-MarginLeft"] = this.txtArticleMarginLeft.value;
			conf["Article-MarginTop"] = this.txtArticleMarginTop.value;
			conf["Article-Place"] = this.radArticlePlace[0].checked ? MyConfig.Place_Left : MyConfig.Place_Right;
			conf["Article-OffsetX"] = this.txtArticleOffsetX.value;
			conf["Article-OffsetY"] = this.txtArticleOffsetY.value;
			conf["Article-ExpandMarquee-Enable"] = this.chkArticleExpandMarquee.checked;
			conf["Article-ImageRetry"] = this.$spinArticleImageRetry.izSpinButton( "value" );

			conf["ImageToolbar-Enable"] = this.chkImageToolbar.checked;
			conf["ImageToolbar-MinWidthLimit"] = parseInt( this.txtImageToolbarMinWidthLimit.value, 10 );
			conf["ImageToolbar-MinHeightLimit"] = parseInt( this.txtImageToolbarMinHeightLimit.value, 10 );

			if ( this.radImageToolbarView[0].checked ) {
				conf["ImageToolbar-View"] = MyConfig.Display_ActualSize;
			} else if ( this.radImageToolbarView[2].checked ) {
				conf["ImageToolbar-View"] = MyConfig.Display_Hide;
			} else {
				conf["ImageToolbar-View"] = MyConfig.Display_Thumbnail;
			}

			conf["ImageToolbar-ThumbSize"] = parseInt( this.txtImageToolbarThumbSize.value, 10 );
			conf["ImageToolbar-ZoomFactor"] = this.txtImageToolbarZoomFactor.value <= 0 || this.txtImageToolbarZoomFactor.value >= 1 ? 0.25 : this.txtImageToolbarZoomFactor.value;

			conf["Viewer-View"] = this.radViewerView[0].checked ? MyConfig.View_IntrinsicSize : MyConfig.View_BestFit;
			conf["Viewer-ZoomFactor"] = this.txtViewerZoomFactor.value <= 0 || this.txtViewerZoomFactor.value >= 1 ? 0.25 : this.txtViewerZoomFactor.value;
			conf["Viewer-BgColor"] = this.txtViewerBgColor.value;
			conf["Viewer-Retry"] = this.$spinViewerRetry.izSpinButton( "value" );
			conf["Viewer-Width"] = this.txtViewerWidth.value;
			conf["Viewer-Height"] = this.txtViewerHeight.value;

			conf["Viewer-Position"] = this.radViewerPos[0].checked ? MyConfig.Position_Fixed : MyConfig.Position_Absolute;
			conf["Viewer-Place"] = this.radViewerPlace[0].checked ? MyConfig.Place_Left : MyConfig.Place_Right;
			conf["Viewer-OffsetY"] = this.txtViewerOffsetY.value;
			conf["Viewer-OffsetX"] = this.txtViewerOffsetX.value;
			conf["Viewer-AutoStartup-Enable"] = this.chkViewerAutoStartup.checked;

			MyConfig.save( conf );
			return this;
		}
	};

	options.evtHandler = function( self ) {
		var dlg = self.dialog,
			$dlg = $( self.dialog );

		//-- 避免重覆套用
		var btnApply = dlg.querySelector( "#izDialogBtn > .izApply" );

		$( dlg.querySelectorAll( "#izDialogBtn input:not(.izHelp)" ) ).click( function() {
			btnApply.disabled = true;
		} );

		$( dlg.querySelectorAll( "input:not(.izApply):not(.izHelp):not(.izCancel):not(.izOK)" ) ).click( function() {
			btnApply.disabled = false;
		} );
		//--

		//-- 文章編排的坐標選項
		var articleRelOpts = dlg.getElementsByClassName( "izArticle-Pos-Relative" )[0].style,
			articleAbsOpts = dlg.getElementsByClassName( "izArticle-Pos-Absolute" )[0].style;

		articleRelOpts.margin = "5px 2px";
		articleRelOpts.padding = "2px";
		articleRelOpts.border = "1px dashed #000";

		articleAbsOpts.margin = "5px 2px";
		articleAbsOpts.padding = "2px";
		articleAbsOpts.border = "1px dashed #000";

		if ( IzConfig["Article-Position"] !== MyConfig.Position_Relative ) {
			articleAbsOpts.display = "block";
			articleRelOpts.display = "none";
		} else {
			articleAbsOpts.display = "none";
			articleRelOpts.display = "block";
		}

		$( self.radArticlePos ).click( function() {
			if ( parseInt( this.value, 10 ) !== MyConfig.Position_Relative ) {
				articleAbsOpts.display = "block";
				articleRelOpts.display = "none";
			} else {
				articleAbsOpts.display = "none";
				articleRelOpts.display = "block";
			}
		} );
		//--

		$dlg.click( function( event ) {
			var $target = $( event.target ),
				conf = IzConfig;

			switch( event.target.className ) {
				case "izTitlebar-CloseButton": {
					self.$stdDialogButton.find( ".izCancel" ).trigger( "click" );
					break;
				}

				default: {
					break;
				}
			}
		} );

		$dlg.mousedown( function( event ) {
			switch( event.target.className ) {
				case "izTitlebar" :
					$( this ).izDraggable( event );
					break;
			}
		} );
	};

	var _instance = null;
	return ( {
		getInstance: function() {
			if ( _instance === null ) {
				_instance = new options();
			}
			return _instance;
		}
	} );
} )();
//--

if ( IzConfig["Article-AutoReload-Enable"] && !document.getElementById( "BbsShow" ) ) {
	// 重導後自動重整
	window.location.href += "&_=" + +( new Date );
} else {

	var page = MyUtils.getQuerystring( gBaseUrl, "page" );

	//-- 建立功能選單
	var style = document.getElementById( "izStyle-Menu" );
	if ( !style ) {
		style = document.createElement( "style" );
		style.id = "izStyle-Menu";
		style.type = "text/css";
		style.textContent = '.izMenu {position:fixed;z-index:999;top:0.5em;left:1em;-moz-user-select:-moz-none;-webkit-user-select:none;}.izMenu > ul,.izSubMenu > ul {list-style-type:none;padding:0;margin:0;}.izMenu > ul > li {position:relative;}.izMenu > ul > li > span,.izSubMenu > ul > li > span {display:inline-block;margin:3px;padding:3px;width:2em;border:2px solid #ccc;border-radius:10px;opacity:0.95;background-image:-moz-linear-gradient(top left, #CFE7CE 15%, #8EBCC7);background-image:-webkit-gradient(linear, left top, right bottom, color-stop(15%, #CFE7CE), color-stop(85%, #8EC68C));color:#fff;text-decoration:none;}.izMenu > ul > li > span:hover,.izSubMenu > ul > li > span:hover {color:#eee;opacity:1;background-image:-moz-linear-gradient(top left, #FFE5DF 5%, #E78289);background-image:-webkit-gradient(linear, left top, right bottom, color-stop(5%, #FFE5DF), color-stop(95%, #E78289));}.izMenu > ul > li > span:hover + .triangle-border,.izSubMenu > ul > li > span:hover + .triangle-border {display:inline-block;}.izSubMenu {display:none;}.izSubMenu > ul > li {display:inline-block;position:relative;}li.izHasSubMenu:hover > .izSubMenu {display:inline-block;}.izMenu .izHint.triangle-border {display:none;position:absolute;top:15px;left:45px;padding:10px;margin:0 0 0 16px;width:1em;border:3px solid #5a8f00;color:#333;background:#fff;border-radius:10px;}.izMenu .izHint.triangle-border:before {display:block;position:absolute;top:5px;left:-16px;width:0;border-width:8px 16px 8px 0;border-style:solid;border-color:transparent #5a8f00;content:"";}.izMenu .izHint.triangle-border:after {display:block;position:absolute;top:8px;left:-10px;width:0;border-width:5px 10px 5px 0;border-style:solid;border-color:transparent #fff;content:"";}.izSubMenu .izHint.triangle-border {display:none;top:50px;left:0px;margin:16px 0 0 0;}.izSubMenu .izHint.triangle-border.top:before {top:-15px;left:auto;right:9px;border-width:0 8px 15px;border-color:#5a8f00 transparent;}.izSubMenu .izHint.triangle-border.top:after {top:-10px;left:auto;right:13px;border-width:0 4px 10px;border-color:#fff transparent;}';
		document.head.appendChild( style );
	}

	var $izMenu = $( '<div class="izMenu">' )
		.html( '<ul><li class="izMenu-ShowOptions"><span>偏好<br />設定</span><p class="izHint triangle-border">文章頁的選項設定</p></li><li class="izMenu-ShowViewer"><span>圖片<br />瀏覽</span><p class="izHint triangle-border">顯示圖片檢視器</p></li></ul>' )
		.appendTo( document.body );

	$izMenu.find( ".izMenu-ShowViewer" ).click( function( event ) {
		if (  PageHandler.getInstance().filteredImages.length ) {
			var $slideshow = $( ".izSlideShow" );
			if ( $slideshow.length ) {
				$slideshow.is( ":hidden" ) ? $slideshow.show() : $slideshow.hide();
			} else {
				var conf = IzConfig, pos = 0;

				// fixed: 0, absolute: 1 (izSlideShow)
				if ( conf["Viewer-Position"] === MyConfig.Position_Absolute ) {
					pos = 1;
				}


				$( "<div></div>" ).appendTo( document.body ).izSlideShow( {
					images: $( PageHandler.getInstance().filteredImages ).clone().toArray(),
					view: conf["Viewer-View"],
					retry: conf["Viewer-Retry"],
					zoomFactor: conf["Viewer-ZoomFactor"],
					bgcolor: conf["Viewer-BgColor"],
					width: conf["Viewer-Width"],
					height: conf["Viewer-Height"],
					position: pos,
					place: conf["Viewer-Place"],
					offsetX: conf["Viewer-OffsetX"],
					offsetY: conf["Viewer-OffsetY"]
				} );
			}
		} else {
			alert( "沒有圖片可供瀏覽。" );
		}
	} );

	$izMenu.find( ".izMenu-ShowOptions" ).click( function( event ) {
		if ( OptionsDialog.getInstance().dialog.style.display === "none" ) {
			if ( event.ctrlKey && event.button === 0 ) {
				OptionsDialog.getInstance().dialog.style.top = "10px";
				OptionsDialog.getInstance().dialog.style.left = "350px"
			}
			OptionsDialog.getInstance().show();
		} else {
			OptionsDialog.getInstance().$stdDialogButton.find( ".izCancel" ).trigger( "click" );
		}
	} );
	//--

	PageHandler.getInstance().buildAll();
}


}

