// ==UserScript==
// @name        ChatMP
// @namespace   Mana
// @description Add new messages directly in jeuxvideo.com MP window without having to refresh
// @version     1.1.2
// @include     http://www.jeuxvideo.com/messages-prives/message.php?*
// @grant       GM_log
// @copyright   2012, Luthien Sofea Elanesse
// @copyright   <jeuxvideo.nyu@gmail.com>
// ==/UserScript==

/*
 * 1.0.0 	: Add new messages directly in jeuxvideo.com MP window without having to refresh
 * 1.1.0 	: Reload all old MP too
 */

/*! jQuery v@1.8.1 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bY(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bW.length;while(e--){b=bW[e]+c;if(b in a)return b}return d}function bZ(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function b$(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bZ(c)&&(e[f]=p._data(c,"olddisplay",cc(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b_(a,b,c){var d=bP.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function ca(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bV[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bV[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bV[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bV[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bV[e]+"Width"))||0));return f}function cb(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0||d==null){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bQ.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+ca(a,b,c||(f?"border":"content"),e)+"px"}function cc(a){if(bS[a])return bS[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bS[a]=c,c}function ci(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||ce.test(a)?d(a,e):ci(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ci(a+"["+e+"]",b[e],c,d);else d(a,b)}function cz(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cA(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cv;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cA(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cA(a,c,d,e,"*",g)),h}function cB(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cC(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cD(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cL(){try{return new a.XMLHttpRequest}catch(b){}}function cM(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cU(){return setTimeout(function(){cN=b},0),cN=p.now()}function cV(a,b){p.each(b,function(b,c){var d=(cT[b]||[]).concat(cT["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cW(a,b,c){var d,e=0,f=0,g=cS.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cN||cU(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cN||cU(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cX(k,j.opts.specialEasing);for(;e<g;e++){d=cS[e].call(j,a,k,j.opts);if(d)return d}return cV(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cX(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cY(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bZ(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cc(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cP.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cZ(a,b,c,d,e){return new cZ.prototype.init(a,b,c,d,e)}function c$(a,b){var c,d={height:a},e=0;b=b?1:0;for(;e<4;e+=2-b)c=bV[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function da(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.1",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o&&!o.call("? ")?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":a.toString().replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||f.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete")setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){var e=p.type(c);e==="function"&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&e!=="string"&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return typeof a=="object"?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length||!d)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||++p.uuid:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")===0&&(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.length,e=c.shift(),f=p._queueHooks(a,b),g=function(){p.dequeue(a,b)};e==="inprogress"&&(e=c.shift(),d--),e&&(b==="fx"&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)d=p._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)~f.indexOf(" "+b[g]+" ")||(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>-1)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,""+d),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,k,l,m,n=(p._data(this,"events")||{})[c.type]||[],o=n.delegateCount,q=[].slice.call(arguments),r=!c.exclusive&&!c.namespace,s=p.event.special[c.type]||{},t=[];q[0]=c,c.delegateTarget=this;if(s.preDispatch&&s.preDispatch.call(this,c)===!1)return;if(o&&(!c.button||c.type!=="click"))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){h={},j=[];for(d=0;d<o;d++)k=n[d],l=k.selector,h[l]===b&&(h[l]=p(l,this).index(f)>=0),h[l]&&j.push(k);j.length&&t.push({elem:f,matches:j})}n.length>o&&t.push({elem:this,matches:n.slice(o)});for(d=0;d<t.length&&!c.isPropagationStopped();d++){i=t[d],c.currentTarget=i.elem;for(e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++){k=i.matches[e];if(r||!c.namespace&&!k.namespace||c.namespace_re&&c.namespace_re.test(k.namespace))c.data=k.data,c.handleObj=k,g=((p.event.special[k.origType]||{}).handle||k.handler).apply(i.elem,q),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation()))}}return s.postDispatch&&s.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),!V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function $(a,b,c,d){c=c||[],b=b||q;var e,f,g,j,k=b.nodeType;if(k!==1&&k!==9)return[];if(!a||typeof a!="string")return c;g=h(b);if(!g&&!d)if(e=L.exec(a))if(j=e[1]){if(k===9){f=b.getElementById(j);if(!f||!f.parentNode)return c;if(f.id===j)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(j))&&i(b,f)&&f.id===j)return c.push(f),c}else{if(e[2])return u.apply(c,t.call(b.getElementsByTagName(a),0)),c;if((j=e[3])&&X&&b.getElementsByClassName)return u.apply(c,t.call(b.getElementsByClassName(j),0)),c}return bk(a,b,c,d,g)}function _(a){return function(b){var c=b.nodeName.toLowerCase();return c==="input"&&b.type===a}}function ba(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}}function bb(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}function bc(a,b,c,d){var e,g,h,i,j,k,l,m,n,p,r=!c&&b!==q,s=(r?"<s>":"")+a.replace(H,"$1<s>"),u=y[o][s];if(u)return d?0:t.call(u,0);j=a,k=[],m=0,n=f.preFilter,p=f.filter;while(j){if(!e||(g=I.exec(j)))g&&(j=j.slice(g[0].length),h.selector=l),k.push(h=[]),l="",r&&(j=" "+j);e=!1;if(g=J.exec(j))l+=g[0],j=j.slice(g[0].length),e=h.push({part:g.pop().replace(H," "),string:g[0],captures:g});for(i in p)(g=S[i].exec(j))&&(!n[i]||(g=n[i](g,b,c)))&&(l+=g[0],j=j.slice(g[0].length),e=h.push({part:i,string:g.shift(),captures:g}));if(!e)break}return l&&(h.selector=l),d?j.length:j?$.error(a):t.call(y(s,k),0)}function bd(a,b,e,f){var g=b.dir,h=s++;return a||(a=function(a){return a===e}),b.first?function(b){while(b=b[g])if(b.nodeType===1)return a(b)&&b}:f?function(b){while(b=b[g])if(b.nodeType===1&&a(b))return b}:function(b){var e,f=h+"."+c,i=f+"."+d;while(b=b[g])if(b.nodeType===1){if((e=b[o])===i)return b.sizset;if(typeof e=="string"&&e.indexOf(f)===0){if(b.sizset)return b}else{b[o]=i;if(a(b))return b.sizset=!0,b;b.sizset=!1}}}}function be(a,b){return a?function(c){var d=b(c);return d&&a(d===!0?c:d)}:b}function bf(a,b,c){var d,e,g=0;for(;d=a[g];g++)f.relative[d.part]?e=bd(e,f.relative[d.part],b,c):e=be(e,f.filter[d.part].apply(null,d.captures.concat(b,c)));return e}function bg(a){return function(b){var c,d=0;for(;c=a[d];d++)if(c(b))return!0;return!1}}function bh(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)$(a,b[e],c,d)}function bi(a,b,c,d,e,g){var h,i=f.setFilters[b.toLowerCase()];return i||$.error(b),(a||!(h=e))&&bh(a||"*",d,h=[],e),h.length>0?i(h,c,g):[]}function bj(a,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s=0,t=a.length,v=S.POS,w=new RegExp("^"+v.source+"(?!"+A+")","i"),x=function(){var a=1,c=arguments.length-2;for(;a<c;a++)arguments[a]===b&&(n[a]=b)};for(;s<t;s++){f=a[s],g="",m=e;for(h=0,i=f.length;h<i;h++){j=f[h],k=j.string;if(j.part==="PSEUDO"){v.exec(""),l=0;while(n=v.exec(k)){o=!0,p=v.lastIndex=n.index+n[0].length;if(p>l){g+=k.slice(l,n.index),l=p,q=[c],J.test(g)&&(m&&(q=m),m=e);if(r=O.test(g))g=g.slice(0,-5).replace(J,"$&*"),l++;n.length>1&&n[0].replace(w,x),m=bi(g,n[1],n[2],q,m,r)}g=""}}o||(g+=k),o=!1}g?J.test(g)?bh(g,m||[c],d,e):$(g,c,d,e?e.concat(m):m):u.apply(d,m)}return t===1?d:$.uniqueSort(d)}function bk(a,b,e,g,h){a=a.replace(H,"$1");var i,k,l,m,n,o,p,q,r,s,v=bc(a,b,h),w=b.nodeType;if(S.POS.test(a))return bj(v,b,e,g);if(g)i=t.call(g,0);else if(v.length===1){if((o=t.call(v[0],0)).length>2&&(p=o[0]).part==="ID"&&w===9&&!h&&f.relative[o[1].part]){b=f.find.ID(p.captures[0].replace(R,""),b,h)[0];if(!b)return e;a=a.slice(o.shift().string.length)}r=(v=N.exec(o[0].string))&&!v.index&&b.parentNode||b,q="";for(n=o.length-1;n>=0;n--){p=o[n],s=p.part,q=p.string+q;if(f.relative[s])break;if(f.order.test(s)){i=f.find[s](p.captures[0].replace(R,""),r,h);if(i==null)continue;a=a.slice(0,a.length-q.length)+q.replace(S[s],""),a||u.apply(e,t.call(i,0));break}}}if(a){k=j(a,b,h),c=k.dirruns++,i==null&&(i=f.find.TAG("*",N.test(a)&&b.parentNode||b));for(n=0;m=i[n];n++)d=k.runs++,k(m)&&e.push(m)}return e}var c,d,e,f,g,h,i,j,k,l,m=!0,n="undefined",o=("sizcache"+Math.random()).replace(".",""),q=a.document,r=q.documentElement,s=0,t=[].slice,u=[].push,v=function(a,b){return a[o]=b||!0,a},w=function(){var a={},b=[];return v(function(c,d){return b.push(c)>f.cacheLength&&delete a[b.shift()],a[c]=d},a)},x=w(),y=w(),z=w(),A="[\\x20\\t\\r\\n\\f]",B="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",C=B.replace("w","w#"),D="([*^$|!~]?=)",E="\\["+A+"*("+B+")"+A+"*(?:"+D+A+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+C+")|)|)"+A+"*\\]",F=":("+B+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+E+")|[^:]|\\\\.)*|.*))\\)|)",G=":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)",H=new RegExp("^"+A+"+|((?:^|[^\\\\])(?:\\\\.)*)"+A+"+$","g"),I=new RegExp("^"+A+"*,"+A+"*"),J=new RegExp("^"+A+"*([\\x20\\t\\r\\n\\f>+~])"+A+"*"),K=new RegExp(F),L=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,M=/^:not/,N=/[\x20\t\r\n\f]*[+~]/,O=/:not\($/,P=/h\d/i,Q=/input|select|textarea|button/i,R=/\\(?!\\)/g,S={ID:new RegExp("^#("+B+")"),CLASS:new RegExp("^\\.("+B+")"),NAME:new RegExp("^\\[name=['\"]?("+B+")['\"]?\\]"),TAG:new RegExp("^("+B.replace("w","w*")+")"),ATTR:new RegExp("^"+E),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+A+"*(even|odd|(([+-]|)(\\d*)n|)"+A+"*(?:([+-]|)"+A+"*(\\d+)|))"+A+"*\\)|)","i"),POS:new RegExp(G,"ig"),needsContext:new RegExp("^"+A+"*[>+~]|"+G,"i")},T=function(a){var b=q.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},U=T(function(a){return a.appendChild(q.createComment("")),!a.getElementsByTagName("*").length}),V=T(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==n&&a.firstChild.getAttribute("href")==="#"}),W=T(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),X=T(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||!a.getElementsByClassName("e").length?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length===2)}),Y=T(function(a){a.id=o+0,a.innerHTML="<a name='"+o+"'></a><div name='"+o+"'></div>",r.insertBefore(a,r.firstChild);var b=q.getElementsByName&&q.getElementsByName(o).length===2+q.getElementsByName(o+0).length;return e=!q.getElementById(o),r.removeChild(a),b});try{t.call(r.childNodes,0)[0].nodeType}catch(Z){t=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}$.matches=function(a,b){return $(a,null,null,b)},$.matchesSelector=function(a,b){return $(b,null,null,[a]).length>0},g=$.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=g(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=g(b);return c},h=$.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},i=$.contains=r.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:r.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},$.attr=function(a,b){var c,d=h(a);return d||(b=b.toLowerCase()),f.attrHandle[b]?f.attrHandle[b](a):W||d?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},f=$.selectors={cacheLength:50,createPseudo:v,match:S,order:new RegExp("ID|TAG"+(Y?"|NAME":"")+(X?"|CLASS":"")),attrHandle:V?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:e?function(a,b,c){if(typeof b.getElementById!==n&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==n&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==n&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:U?function(a,b){if(typeof b.getElementsByTagName!==n)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c},NAME:function(a,b){if(typeof b.getElementsByName!==n)return b.getElementsByName(name)},CLASS:function(a,b,c){if(typeof b.getElementsByClassName!==n&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(R,""),a[3]=(a[4]||a[5]||"").replace(R,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||$.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&$.error(a[0]),a},PSEUDO:function(a,b,c){var d,e;if(S.CHILD.test(a[0]))return null;if(a[3])a[2]=a[3];else if(d=a[4])K.test(d)&&(e=bc(d,b,c,!0))&&(e=d.indexOf(")",d.length-e)-d.length)&&(d=d.slice(0,e),a[0]=a[0].slice(0,e)),a[2]=d;return a.slice(0,3)}},filter:{ID:e?function(a){return a=a.replace(R,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(R,""),function(b){var c=typeof b.getAttributeNode!==n&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(R,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=x[o][a];return b||(b=x(a,new RegExp("(^|"+A+")"+a+"("+A+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==n&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return b?function(d){var e=$.attr(d,a),f=e+"";if(e==null)return b==="!=";switch(b){case"=":return f===c;case"!=":return f!==c;case"^=":return c&&f.indexOf(c)===0;case"*=":return c&&f.indexOf(c)>-1;case"$=":return c&&f.substr(f.length-c.length)===c;case"~=":return(" "+f+" ").indexOf(c)>-1;case"|=":return f===c||f.substr(0,c.length+1)===c+"-"}}:function(b){return $.attr(b,a)!=null}},CHILD:function(a,b,c,d){if(a==="nth"){var e=s++;return function(a){var b,f,g=0,h=a;if(c===1&&d===0)return!0;b=a.parentNode;if(b&&(b[o]!==e||!a.sizset)){for(h=b.firstChild;h;h=h.nextSibling)if(h.nodeType===1){h.sizset=++g;if(h===a)break}b[o]=e}return f=a.sizset-d,c===0?f===0:f%c===0&&f/c>=0}}return function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b,c,d){var e,g=f.pseudos[a]||f.pseudos[a.toLowerCase()];return g||$.error("unsupported pseudo: "+a),g[o]?g(b,c,d):g.length>1?(e=[a,a,"",b],function(a){return g(a,0,e)}):g}},pseudos:{not:v(function(a,b,c){var d=j(a.replace(H,"$1"),b,c);return function(a){return!d(a)}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!f.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},contains:v(function(a){return function(b){return(b.textContent||b.innerText||g(b)).indexOf(a)>-1}}),has:v(function(a){return function(b){return $(a,b).length>0}}),header:function(a){return P.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:_("radio"),checkbox:_("checkbox"),file:_("file"),password:_("password"),image:_("image"),submit:ba("submit"),reset:ba("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return Q.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b,c){return c?a.slice(1):[a[0]]},last:function(a,b,c){var d=a.pop();return c?a:[d]},even:function(a,b,c){var d=[],e=c?1:0,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},odd:function(a,b,c){var d=[],e=c?0:1,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},lt:function(a,b,c){return c?a.slice(+b):a.slice(0,+b)},gt:function(a,b,c){return c?a.slice(0,+b+1):a.slice(+b+1)},eq:function(a,b,c){var d=a.splice(+b,1);return c?a:d}}},k=r.compareDocumentPosition?function(a,b){return a===b?(l=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:function(a,b){if(a===b)return l=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,h=b.parentNode,i=g;if(g===h)return bb(a,b);if(!g)return-1;if(!h)return 1;while(i)e.unshift(i),i=i.parentNode;i=h;while(i)f.unshift(i),i=i.parentNode;c=e.length,d=f.length;for(var j=0;j<c&&j<d;j++)if(e[j]!==f[j])return bb(e[j],f[j]);return j===c?bb(a,f[j],-1):bb(e[j],b,1)},[0,0].sort(k),m=!l,$.uniqueSort=function(a){var b,c=1;l=m,a.sort(k);if(l)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},$.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},j=$.compile=function(a,b,c){var d,e,f,g=z[o][a];if(g&&g.context===b)return g;d=bc(a,b,c);for(e=0,f=d.length;e<f;e++)d[e]=bf(d[e],b,c);return g=z(a,bg(d)),g.context=b,g.runs=g.dirruns=0,g},q.querySelectorAll&&function(){var a,b=bk,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[],f=[":active"],g=r.matchesSelector||r.mozMatchesSelector||r.webkitMatchesSelector||r.oMatchesSelector||r.msMatchesSelector;T(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+A+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),T(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+A+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=e.length&&new RegExp(e.join("|")),bk=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a)))if(d.nodeType===9)try{return u.apply(f,t.call(d.querySelectorAll(a),0)),f}catch(i){}else if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){var j,k,l,m=d.getAttribute("id"),n=m||o,p=N.test(a)&&d.parentNode||d;m?n=n.replace(c,"\\$&"):d.setAttribute("id",n),j=bc(a,d,h),n="[id='"+n+"']";for(k=0,l=j.length;k<l;k++)j[k]=n+j[k].selector;try{return u.apply(f,t.call(p.querySelectorAll(j.join(",")),0)),f}catch(i){}finally{m||d.removeAttribute("id")}}return b(a,d,f,g,h)},g&&(T(function(b){a=g.call(b,"div");try{g.call(b,"[test!='']:sizzle"),f.push(S.PSEUDO.source,S.POS.source,"!=")}catch(c){}}),f=new RegExp(f.join("|")),$.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!h(b)&&!f.test(c)&&(!e||!e.test(c)))try{var i=g.call(b,c);if(i||a||b.document&&b.document.nodeType!==11)return i}catch(j){}return $(c,null,null,[b]).length>0})}(),f.setFilters.nth=f.setFilters.eq,f.filters=f.pseudos,$.attr=p.attr,p.find=$,p.expr=$.selectors,p.expr[":"]=p.expr.pseudos,p.unique=$.uniqueSort,p.text=$.getText,p.isXMLDoc=$.isXML,p.contains=$.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=b===e&&bA,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(f=0;(h=a[f])!=null;f++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{s=s||bk(b),l=b.createElement("div"),s.appendChild(l),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(g=n.length-1;g>=0;--g)p.nodeName(n[g],"tbody")&&!n[g].childNodes.length&&n[g].parentNode.removeChild(n[g])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l.parentNode.removeChild(l)}h.nodeType?t.push(h):p.merge(t,h)}l&&(h=l=s=null);if(!p.support.appendChecked)for(f=0;(h=t[f])!=null;f++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(f=0;(h=t[f])!=null;f++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[f+1,0].concat(r)),f+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^(none|table(?!-c[ea]).+)/,bO=/^margin/,bP=new RegExp("^("+q+")(.*)$","i"),bQ=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bR=new RegExp("^([-+])=("+q+")","i"),bS={},bT={position:"absolute",visibility:"hidden",display:"block"},bU={letterSpacing:0,fontWeight:400},bV=["Top","Right","Bottom","Left"],bW=["Webkit","O","Moz","ms"],bX=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return b$(this,!0)},hide:function(){return b$(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bX.apply(this,arguments):this.each(function(){(c?a:bZ(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bY(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bR.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bY(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bU&&(f=bU[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],d===""&&!p.contains(b.ownerDocument,b)&&(d=p.style(b,c)),bQ.test(d)&&bO.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bQ.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth===0&&bN.test(bH(a,"display"))?p.swap(a,bT,function(){return cb(a,b,d)}):cb(a,b,d)},set:function(a,c,d){return b_(a,c,d?ca(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bQ.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bV[d]+b]=e[d]||e[d-2]||e[0];return f}},bO.test(a)||(p.cssHooks[a+b].set=b_)});var cd=/%20/g,ce=/\[\]$/,cf=/\r?\n/g,cg=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,ch=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ch.test(this.nodeName)||cg.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(cf,"\r\n")}}):{name:b.name,value:c.replace(cf,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ci(d,a[d],c,f);return e.join("&").replace(cd,"+")};var cj,ck,cl=/#.*$/,cm=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,co=/^(?:GET|HEAD)$/,cp=/^\/\//,cq=/\?/,cr=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cs=/([?&])_=[^&]*/,ct=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,cu=p.fn.load,cv={},cw={},cx=["*/"]+["*"];try{cj=f.href}catch(cy){cj=e.createElement("a"),cj.href="",cj=cj.href}ck=ct.exec(cj.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&cu)return cu.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):c&&typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cr,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cB(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cB(a,b),a},ajaxSettings:{url:cj,isLocal:cn.test(ck[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cx},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cz(cv),ajaxTransport:cz(cw),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cC(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cD(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=""+(c||y),k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cm.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(cl,"").replace(cp,ck[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=ct.exec(l.url.toLowerCase()),l.crossDomain=!(!i||i[1]==ck[1]&&i[2]==ck[2]&&(i[3]||(i[1]==="http:"?80:443))==(ck[3]||(ck[1]==="http:"?80:443)))),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cA(cv,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!co.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cq.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cs,"$1_="+z);l.url=A+(A===l.url?(cq.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cx+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cA(cw,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cE=[],cF=/\?/,cG=/(=)\?(?=&|$)|\?\?/,cH=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cE.pop()||p.expando+"_"+cH++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cG.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cG.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cG,"$1"+f):m?c.data=i.replace(cG,"$1"+f):k&&(c.url+=(cF.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cE.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cI,cJ=a.ActiveXObject?function(){for(var a in cI)cI[a](0,1)}:!1,cK=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cL()||cM()}:cL,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cJ&&delete cI[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cK,cJ&&(cI||(cI={},p(a).unload(cJ)),cI[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cN,cO,cP=/^(?:toggle|show|hide)$/,cQ=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cR=/queueHooks$/,cS=[cY],cT={"*":[function(a,b){var c,d,e,f=this.createTween(a,b),g=cQ.exec(b),h=f.cur(),i=+h||0,j=1;if(g){c=+g[2],d=g[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&i){i=p.css(f.elem,a,!0)||c||1;do e=j=j||".5",i=i/j,p.style(f.elem,a,i+d),j=f.cur()/h;while(j!==1&&j!==e)}f.unit=d,f.start=i,f.end=g[1]?i+(g[1]+1)*c:c}return f}]};p.Animation=p.extend(cW,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cT[c]=cT[c]||[],cT[c].unshift(b)},prefilter:function(a,b){b?cS.unshift(a):cS.push(a)}}),p.Tween=cZ,cZ.prototype={constructor:cZ,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cZ.propHooks[this.prop];return a&&a.get?a.get(this):cZ.propHooks._default.get(this)},run:function(a){var b,c=cZ.propHooks[this.prop];return this.options.duration?this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cZ.propHooks._default.set(this),this}},cZ.prototype.init.prototype=cZ.prototype,cZ.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cZ.propHooks.scrollTop=cZ.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(c$(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bZ).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cW(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cR.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:c$("show"),slideUp:c$("hide"),slideToggle:c$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cZ.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cO&&(cO=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cO),cO=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c_=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j,k,l,m=this[0],n=m&&m.ownerDocument;if(!n)return;return(e=n.body)===m?p.offset.bodyOffset(m):(d=n.documentElement,p.contains(d,m)?(c=m.getBoundingClientRect(),f=da(n),g=d.clientTop||e.clientTop||0,h=d.clientLeft||e.clientLeft||0,i=f.pageYOffset||d.scrollTop,j=f.pageXOffset||d.scrollLeft,k=c.top+i-g,l=c.left+j-h,{top:k,left:l}):{top:0,left:0})},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c_.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c_.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=da(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(this);

(function () {
	"use strict";
	var kitty, system, defaultOptions;

	defaultOptions = {
		MPnewTab: false,
		reloadOldMP: true,
		sound: true,
		dynamicTitles: true,
		console: true,
		mpChat: true
	};
	function debug(message, gravity) {
		if (option("console") && console !== undefined) {
			switch (gravity) {
			case undefined:
			case 0:
			case "log":
			case "trace":
				console.log(message);
				break;
			case 1:
			case "info":
				console.info(message);
				break;
			case 2:
			case "debug":
				console.debug(message);
				break;
			case 3:
			case "warn":
				console.warn(message);
				break;
			case 4:
			case "error":
				console.error(message);
				break;
			default:
				break;
			}
		} else {
			// alert(message);
		}
	}
	function option(key) {
		switch (key) {
		case "name":
			return "Chat_MP";
		case "description":
			return "Add new messages directly in jeuxvideo.com MP window without having to refresh";
		case "source":
			return kitty;
		default:
			return defaultOptions[key];
		}
	}
	// Basic functions
	function formatInt(val, n) {
		val = val.toString();
		while (val.length < n) {
			val = "0" + val;
		}
		return val;
	}
	function inList(val, list) {
		var i;
		for (i = 0; i < list.length; i += 1) {
			if (val === list[i]) {
				return i;
			}
		}
		return -1;
	}
// Encryption functions
	function hash_SHA1(value) {
		var hex_sha1, rstr_sha1, rstr2hex, str2rstr_utf8, rstr2binb, binb2rstr, binb_sha1, sha1_ft, sha1_kt, safe_add, bit_rol, b64pad;
		b64pad = "";
		hex_sha1 = function hex_sha1(a) {
			return rstr2hex(rstr_sha1(str2rstr_utf8(a)));
		};
		rstr_sha1 = function rstr_sha1(a) {
			return binb2rstr(binb_sha1(rstr2binb(a), a.length * 8));
		};
		rstr2hex = function rstr2hex(c) {
			var f, b, a, d;
			f = "0123456789abcdef";
			b = "";
			for (d = 0; d < c.length; d += 1) {
				a = c.charCodeAt(d);
				b += f.charAt((a >>> 4) & 15) + f.charAt(a & 15);
			}
			return b;
		};
		str2rstr_utf8 = function str2rstr_utf8(c) {
			var b, d, a, e;
			b = "";
			d = 0;
			while (d < c.length) {
				a = c.charCodeAt(d);
				e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0;
				if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) {
					a = 65536 + ((a & 1023) << 10) + (e & 1023);
					d += 1;
				}
				if (a <= 127) {
					b += String.fromCharCode(a);
				} else {
					if (a <= 2047) {
						b += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63));
					} else {
						if (a <= 65535) {
							b += String.fromCharCode(224 | ((a >>> 12) & 15), 128 | ((a >>> 6) & 63), 128 | (a & 63));
						} else {
							if (a <= 2097151) {
								b += String.fromCharCode(240 | ((a >>> 18) & 7), 128 | ((a >>> 12) & 63), 128 | ((a >>> 6) & 63), 128 | (a & 63));
							}
						}
					}
				}
				d += 1;
			}
			return b;
		};
		rstr2binb = function rstr2binb(b) {
			var a, c, n;
			n = b.length >> 2;
			a = [];
			for (c = 0; c < n; c += 1) {
				a[c] = 0;
			}
			for (c = 0; c < b.length * 8; c += 8) {
				a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << (24 - c % 32);
			}
			return a;
		};
		binb2rstr = function binb2rstr(b) {
			var a, c;
			a = "";
			for (c = 0; c < b.length * 32; c += 8) {
				a += String.fromCharCode((b[c >> 5] >>> (24 - c % 32)) & 255);
			}
			return a;
		};
		binb_sha1 = function binb_sha1(v, o) {
			var y, u, s, r, q, p, l, n, m, k, h, f, g, z;
			v[o >> 5] |= 128 << (24 - o % 32);
			v[((o + 64 >> 9) << 4) + 15] = o;
			y = new Array(80);
			u = 1732584193;
			s = -271733879;
			r = -1732584194;
			q = 271733878;
			p = -1009589776;
			for (l = 0; l < v.length; l += 16) {
				n = u;
				m = s;
				k = r;
				h = q;
				f = p;
				for (g = 0; g < 80; g += 1) {
					if (g < 16) {
						y[g] = v[l + g];
					} else {
						y[g] = bit_rol(y[g - 3] ^ y[g - 8] ^ y[g - 14] ^ y[g - 16], 1);
					}
					z = safe_add(safe_add(bit_rol(u, 5), sha1_ft(g, s, r, q)), safe_add(safe_add(p, y[g]), sha1_kt(g)));
					p = q;
					q = r;
					r = bit_rol(s, 30);
					s = u;
					u = z;
				}
				u = safe_add(u, n);
				s = safe_add(s, m);
				r = safe_add(r, k);
				q = safe_add(q, h);
				p = safe_add(p, f);
			}
			return [u, s, r, q, p];
		};
		sha1_ft = function sha1_ft(e, a, g, f) {
			if (e < 20) {
				return (a & g) | ((~a) & f);
			}
			if (e < 40) {
				return a ^ g ^ f;
			}
			if (e < 60) {
				return (a & g) | (a & f) | (g & f);
			}
			return a ^ g ^ f;
		};
		sha1_kt = function sha1_kt(a) {
			return (a < 20) ? 1518500249 : (a < 40) ? 1859775393 : (a < 60) ? -1894007588 : -899497514;
		};
		safe_add = function safe_add(a, d) {
			var b, c;
			c = (a & 65535) + (d & 65535);
			b = (a >> 16) + (d >> 16) + (c >> 16);
			return (b << 16) | (c & 65535);
		};
		bit_rol = function bit_rol(a, b) {
			return (a << b) | (a >>> (32 - b));
		};

		return hex_sha1(value);
	}
	function code_b64(value, bool) {
		var alphabet, binary, code, i;
		alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + (bool ? "-_." : "+/=");
		binary = "";
		for (i = 0; i < value.length; i += 1) {
			binary += formatInt(value.charCodeAt(i).toString(2), 8);
		}
		i = "";
		while (binary.length % 6 !== 0) {
			i += alphabet[alphabet.length - 1];
			binary += "00";
		}
		code = "";
		while (binary.length > 0) {
			code += alphabet[parseInt(binary.substr(0, 6), 2)];
			binary = binary.slice(6);
		}
		return code + i;
	}
	function decode_b64(code, bool) {
		var alphabet, binary, value, i;
		alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + (bool ? "-_." : "+/=");
		value = 0;
		while (code[code.length - 1] === alphabet[alphabet.length - 1]) {
			value += 1;
			code = code.substr(0, code.length - 1);
		}
		binary = "";
		for (i = 0; i < code.length; i += 1) {
			binary += formatInt(inList(code[i], alphabet).toString(2), 6);
		}
		while (value > 0) {
			binary = binary.substr(0, binary.length - 2);
			value -= 1;
		}
		i = "";
		value = "";
		while (binary.length > 0) {
			value += String.fromCharCode(parseInt(binary.substr(0, 8), 2));
			binary = binary.slice(8);
		}
		return value;
	}
	function code_translate(value, trans) {
		var code, i;
		code = "";
		for (i = 0; i < value.length; i += 1) {
			code += String.fromCharCode(value.charCodeAt(i) + trans);
		}
		return code;
	}
// System objects
	function Reg(regexp, option) {	// RegExp data
		var reg;
		if (option) {
			reg = new RegExp(regexp, option);
		} else {
			reg = new RegExp(regexp);
		}
		this.exec = function exec(exp) {
			var data = reg.exec(exp);
			if (data !== null) {
				data.push(RegExp.rightContext);
				data.push(data.shift());
				data.unshift(RegExp.leftContext);
			}
			return data;
		};
		this.test = function test(exp) {
			return (this.exec(exp) !== null);
		};
		return this;
	}
	function Reminder(object) {	// To prevent multiple load of the same data
		var data;
		data = {};
		this.get = function get(key) {
			if (object && !data.hasOwnProperty(key)) {
				data[key] = object.get(key);
			}
			return data[key];
		};
		this.set = function set(key, value) {
			data[key] = value;
			if (object) {
				return object.set(key, value);
			}
		};
		this.del = function del(key) {
			delete data[key];
			if (object) {
				return object.del(key);
			}
		};
		this.has = function has(key) {
			return data.hasOwnProperty(key);
		};
		this.unload = function unload(key) {
			delete data[key];
		};
		this.loaded = function loaded() {
			var list, key;
			list = [];
			for (key in data) {
				if (data.hasOwnProperty(key)) {
					list.push(key);
				}
			}
			return list;
		};
		if (object) {
			this.list = function list() {
				return object.list();
			};
		}
	}
	function SystemObject(data) {	// System object (save / encoding / hash)
		var save, change, options;
		save = {};
		save.storage = function SaveStorage(storage) {
			this.get = function get(key) {
				return storage.getItem(key);
			};
			this.set = function set(key, value) {
				return storage.setItem(key, value);
			};
			this.del = function del(key) {
				return storage.removeItem(key);
			};
			this.list = function list() {
				var ans, i;
				ans = [];
				for (i = 0; i < storage.length; i += 1) {
					ans.push(storage.key(i));
				}
				return ans;
			};
		};
		save.cookie = function SaveCookie(doc, timeout, path) {
			if (!path) {
				path = "/";
			}
			this.get = function readCookie(key) {
				var list, i, c;
				key = encodeURIComponent(key) + "=";
				list = doc.cookie.split(';');
				for (i = 0; i < list.length; i += 1) {
					c = list[i];
					while (c.charAt(0) === ' ') {
						c = c.slice(1);
					}
					if (c.indexOf(key) === 0) {
						return decodeURIComponent(c.slice(key.length));
					}
				}
				return null;
			};
			this.set = function createCookie(name, value, time) {
				var date, expires, path;
				if (!time) {
					time = timeout;
				}
				expires = "";
				if (time) {
					date = new Date();
					date.setTime(date.getTime() + time);
					expires = "; expires=" + date.toGMTString();
				}
				doc.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=" + path;
			};
			this.del = function eraseCookie(name) {
				this.set(name, "", -1);
			};
			this.list = function list() {
				var liste, i, key, ans;
				ans = [];
				liste = doc.cookie;
				liste = liste.split(";");
				for (i = 0; i < liste.length; i += 1) {
					key = liste[i].split("=").shift();
					if (key) {
						while (key.charAt(0) === " ") {
							key = key.slice(1);
						}
						ans.push(decodeURIComponent(key));
					}
				}
				return ans;
			};
		};
		this.valid = true;
		switch (data.save) {
		case "session":
			this.save = new Reminder(new save.storage(sessionStorage));
			break;
		case "cookie":
			this.save = new Reminder(new save.cookie(document, 365 * 24 * 60 * 60 * 1000, "/"));
			break;
		// case "local":
		default:
			data.save = "local";
			this.save = new Reminder(new save.storage(localStorage));
			break;
		}
		this.options = {_: this};
		this.options.key = function key(data) {
			return this._.hash("option_" + option("codeName") + "_" + data);
		};
		this.options.get = function get(key) {
			return this._.save.get(this.key(key));
		};
		this.options.set = function set(key, value) {
			this._.save.set(this.key(key), value);
		};
		this.options.del = function del(key) {
			this._.save.del(this.key(key));
		};
		options = {_: this};	// Intern load
		options.key = function key(data) {
			if (this.hasOwnProperty("hash")) {
				return this.hash("option_" + option("codeName") + "_" + data);
			}
			return data;
		};
		options.get = function get(key) {
			return this._.save.get(this.key(key));
		};
		options.set = function set(key, value) {
			this._.save.set(this.key(key), value);
		};
		options.del = function del(key) {
			this._.save.del(this.key(key));
		};
		switch (data.hash) {
		case "SHA1":
			change = false;
			options.hash = function (key) {return option("codeName") + "_" + hash_SHA1(key); };
			this.hash = function (key) {return options.hash(data.salt + key); };
			if (!data.hasOwnProperty("salt")) {
				data.salt = options.get("salt");
				if (!data.salt) {
					data.salt = hash_SHA1(navigator.userAgent).substr(5, 21);
					change = true;
				}
			}
			this.valid = (this.valid && data.salt);
			if (this.valid && change) {
				options.set("salt", data.salt);
			}
			break;
		// case "none":
		default:
			data.hash = "none";
			options.hash = function (key) {return key; };
			this.hash = function (key) {return options.hash(key); };
			break;
		}
		this.encodeKey = encodeURIComponent;
		this.decodeKey = decodeURIComponent;
		switch (data.encode) {
		case "nb64":
			change = false;
			if (!data.hasOwnProperty("trans")) {
				data.trans = options.get("trans");
				if (!data.trans) {
					change = Math.floor(Math.random() * 16);
					data.trans = "";
					while (change > 0) {
						data.trans += Math.floor(Math.random() * 16).toString(16);
						change -= 1;
					}
					change = true;
				}
			}
			this.encodeValue = function (mess) {
				return encodeURIComponent(code_b64(code_translate(mess.toString(), data.trans.length - 8), true));
			};
			this.decodeValue = function (mess) {
				return code_translate(decode_b64(decodeURIComponent(mess), true), 8 - data.trans.length);
			};
			this.valid = (this.valid && data.trans);
			if (this.valid && change) {
				options.set("trans", data.trans);
			}
			break;
		case "b64":
			this.encodeValue = function (mess) {
				return encodeURIComponent(code_b64(mess.toString(), true));
			};
			this.decodeValue = function (mess) {
				return decode_b64(decodeURIComponent(mess), true);
			};
			break;
		default:
			this.encodeValue = this.encodeKey;
			this.decodeValue = this.decodeKey;
			break;
		}
		this.toString = function toString() {
			return "[" + ["System", data.save, data.encode, data.hash].join(" ") + "]";
		};
	}
// Constructors
	function Construct(ref) {	// Constructor
		var bloc;
		bloc = ref;
		this.insert = function insert(element) {
			bloc.append(element);
			return element;
		};
		this.append = function append(element) {
			this.insert(element);
			bloc = element;
			return element;
		};
		this.end = function end() {
			if (bloc !== ref) {
				bloc = bloc.parent();
			}
			return bloc;
		};
		this.get = function get() {
			return ref;
		};
		this.toString = function toString() {
			return this.get().toString();
		};
	}
	function CreateObject() {
		this.element = function element(tag, options) {
			var elem, attr;
			elem = $(document.createElement(tag));
			if (options) {
				for (attr in options) {
					if (options.hasOwnProperty(attr)) {
						elem.attr(attr, options[attr]);
					}
				}
			}
			return elem;
		};
		this.text = function text(texte) {
			return $(document.createTextNode(texte));
		};
		this.input = function input(type, options) {
			return this.element("input", options).attr("type", type);
		};
		this.list = function list(liste, options, def) {
			var select, opt;
			select = this.element("select", options);
			if (liste) {
				for (opt in liste) {
					if (liste.hasOwnProperty(opt)) {
						select.append(this.element("option", {value: opt}).text(liste[opt]));
						if (def === opt) {
							select.last().attr("selected", "selected");
						}
					}
				}
			}
			return select;
		};
		this.img = function img(src, options) {
			return this.element("img", options).attr("src", src);
		};
		this.link = function (link, options) {
			return this.element("a", options).attr("href", link);
		};
		this.script = function script(content, options) {
			var elem, attr;
			elem = document.createElement("script");
			elem.appendChild(document.createTextNode(content));
			if (options) {
				for (attr in options) {
					if (options.hasOwnProperty(attr)) {
						elem.setAttribute(attr, options[attr]);
					}
				}
			}
			return elem;
		};
		this.style = function style(content, options) {
			var elem, attr;
			elem = document.createElement("style");
			elem.appendChild(document.createTextNode(content));
			if (options) {
				for (attr in options) {
					if (options.hasOwnProperty(attr)) {
						elem.setAttribute(attr, options[attr]);
					}
				}
			}
			return elem;
		};
		this.audio = function audio(source, options) {
			var bloc;
			bloc = new Construct(this.element("audio", options));
			bloc.insert(this.element("source", {src: source}));
			return bloc.get();
		};
	}
// URL functions
	function Url(href) {
		var apply, readOptions, writeOptions, getDomain;
		getDomain = function getDomain(url) {
			var data, i, test;
			data = url.hostname.split(".");
			if (new Reg("^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$").test(url.hostname)) {
				test = true;
				for (i = 0; test && i < data.length; i += 1) {
					data[i] = parseInt(data[i], 10);
					test = (data[i] >= 0 && data[i] < 256);
				}
				if (test) {
					url.ip = true;
					return data;
				}
			}
			url.server = [];
			while (data.length > 2) {
				url.server.push(data.shift());
			}
			return data.join(".");
		};
		writeOptions = function writeOptions(options, encode) {
			var ans, key;
			ans = [];
			if (options) {
				for (key in options) {
					if (options.hasOwnProperty(key)) {
						if (encode) {
							ans.push(system.encodeKey(key) + "=" + system.encodeValue(options[key]));
						} else {
							ans.push(system.encodeKey(key) + "=" + options[key]);
						}
					}
				}
			}
			return (ans.length > 0) ? "?" + ans.join("&") : "";
		};
		readOptions = function readOptions(options) {
			var cryptedData, uncryptedData, temp, key;
			cryptedData = {};
			uncryptedData = {};
			if (options) {
				options = options.slice(1).split("&");
				while (options.length > 0) {
					temp = options.shift().split("=");
					if (temp.length > 1) {
						key = temp.shift();
						temp = temp.join("=");
						uncryptedData[system.decodeKey(key)] = temp;
						try {
							cryptedData[system.decodeKey(key)] = system.decodeValue(temp);
						} catch (e) {
							cryptedData[system.decodeKey(key)] = undefined;
						}
					}
				}
			}
			return [uncryptedData, cryptedData];
		};
		apply = function apply(url) {
			var data;
			data = new Reg("^([^:/]+):/+([^:/?#]+)(?::([^/?#]+))?(/[^?#]*)?(\\?[^#]+)?(#.*)?$").exec(href);
			if (data) {
				url.correct = true;
				url.protocol = data[1];
				url.hostname = data[2];
				url.domain = getDomain(url);
				url.port = data[3] ? parseInt(data[3], 10) : "";
				url.host = url.port ? url.hostname + ":" + url.port : url.hostname;
				url.path = data[4] ? data[4].slice(1).split("/") : [];	// First char always /
				url.options_ori = readOptions(data[5]);
				url.options = url.options_ori.pop();
				url.options_ori = url.options_ori.shift();
				url.ancre = data[6] ? data[6].slice(1) : "";
				url.href = href;
			} else {
				url.correct = false;
				url.protocol = undefined;
				url.hostname = undefined;
				url.domain = undefined;
				url.port = undefined;
				url.host = undefined;
				url.path = undefined;
				url.options_ori = undefined;
				url.options = undefined;
				url.ancre = undefined;
				url.href = href;
			}
		};
		this.alter = function alter() {
			var key, newRef;
			if (this.correct) {
				newRef = this.protocol;
				switch (this.protocol) {
				case "file":
					newRef += ":///";
					break;
				// case "http":
				// case "https":
				// case "ftp":
				default:
					newRef += "://";
					break;
				}
				newRef += this.hostname;
				newRef += this.port ? ":" + this.port : "";
				newRef += (this.path && this.path.length > 0) ? "/" + this.path.join("/") : "";
				newRef += writeOptions(this.options, true);
				newRef += (this.ancre && this.ancre.length > 0) ? "#" + this.ancre : "";
			} else {
				newRef = this.href;
			}
			for (key in this) {
				if (typeof this[key] !== "function") {
					delete this[key];
				}
			}
			href = newRef;
			apply(this);
			return this;
		};
		this.clone = function clone() {
			return new Url(href);
		};
		this.info = function info() {
			var ans, key;
			ans = [this.toString(), ""];
			for (key in this) {
				if (typeof this[key] !== "function") {
					if (key === "options" || key === "options_ori") {
						ans.push(key + " : " + writeOptions(this[key], key === "options"));
					} else {
						ans.push(key + " : " + this[key]);
					}
				}
			}
			return ans.join("\n");
		};
		this.toString = function toString() {
			return href;
		};
		apply(this);
	}
	function Where(href) {
		var url, apply, interpret, clean, describe;
		interpret = function interpret(where) {
			var writeJVCFormat;
			writeJVCFormat = function writeJVCFormat() {
				return [where.mode, where.forum, where.topic, where.page, where.hash, where.index, where.search, where.query].join("-") + ".htm";
			};
			where.correct = true;
			switch (where.node) {
			case "jvc":
				where.protocol = "http";
				where.domain = "jeuxvideo.com";
				if (where.mobile) {
					where.server = ["m"];
					where.hostname = where.server.join(".") + "." + where.domain;
					where.host = where.hostname;
					where.host += (where.port) ? ":" + where.port : "";
				} else {
					where.server = ["www"];
					where.hostname = where.server.join(".") + "." + where.domain;
					where.host = where.hostname;
					where.host += (where.port) ? ":" + where.port : "";
				}
				switch (where.type) {
				case "home":
					where.path = [];
					break;
				case "forums":
				case "commentaires":
					where.path = [where.type, writeJVCFormat()];
					break;
				case "profil":
					where.path = [where.type, where.pseudo + ".html"];
					break;
				case "cgi-bin":
					//window.alert("Non géré");	//TODO
					break;
				case "kick_user":
				case "avertir_moderateur":
					where.path = ["cgi-bin", "jvforums", where.type + ".cgi"];
					break;
				case "cgi_forums":
					where.path = ["cgi-bin", "jvforums", "forums.cgi"];
					break;
				case "moncompte":
					//window.alert("Non géré");	//TODO
					break;
				case "mp":
					switch (where.mode) {
					case "boite":
						where.path = ["messages-prives", where.mode + "-reception.php"];
						break;
					// case "message":
					default:
						where.path = ["messages-prives", where.mode + ".php"];
						break;
					}
					break;
				default:
					where.correct = false;
					break;
				}
				break;
			case "forumjv":
				where.protocol = "http";
				switch (where.type) {
				case "cgi-bin":
					//window.alert("Non géré");	//TODO
					break;
				default:
					where.path = [writeJVCFormat()];
					break;
				}
				break;
			case "dtc":
				where.protocol = "http";
				switch (where.type) {
				case "one":
					where.path = [where.page + ".html"];
					break;
				}
				break;
			default:
				where.correct = false;
				break;
			}
		};
		describe = function describe(data) {
			var key, ans;
			ans = [];
			for (key in data) {
				if (data.hasOwnProperty(key)) {
					ans.push(key + ":" + data[key]);
				}
			}
			return ans;
		};
		apply = function apply(where) {
			var analyseJVCFormat, data;
			if (where.correct) {
				if (where.protocol === "file" || where.hostname === "127.0.0.1" || where.hostname === "localhost") {
					where.local = true;
				}
				analyseJVCFormat = function analyseJVCFormat(format) {
					var data;
					data = new Reg("^([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)-([A-Za-z0-9]+)-([0-9]+)-([0-9]+)-(.+)\\.htm$").exec(format);
					if (data) {
						where.mode = parseInt(data[1], 10);
						where.forum = parseInt(data[2], 10);
						where.topic = parseInt(data[3], 10);
						where.page = parseInt(data[4], 10);
						where.hash = data[5];
						where.index = parseInt(data[6], 10);
						where.search = parseInt(data[7], 10);
						where.query = data[8];
					}
				};
				switch (where.domain) {
				case "jeuxvideo.com":
					where.node = "jvc";
					if (where.server.join(".") === "m") {
						where.mobile = true;
					}
					if (where.path.length === 0 || (where.path.length === 1 && where.path[0] === "")) {
						where.type = "home";
					} else {
						where.type = where.path[0].toLowerCase();
						switch (where.type) {
						case "forums":
						case "commentaires":
							analyseJVCFormat(where.path.join("/").slice(where.type.length + 1));
							break;
						case "profil":
							data = new Reg("^([^.]+)\\.html$").exec(where.path[where.path.length - 1]);
							if (data) {
								where.pseudo = data[1];
							}
							break;
						case "cgi-bin":
							if (where.path.length === 3 && where.path[1] === "jvforums") {
								switch (where.path[2].toLowerCase()) {
								case "kick_user.cgi":
									where.type = "kick_user";
									break;
								case "avertir_moderateur.cgi":
									where.type = "avertir_moderateur";
									break;
								case "forums.cgi":
									where.type = "cgi_forums";
									break;
								}
							}
							break;
						case "moncompte":
							break;
						case "messages-prives":
							if (where.path.length === 2) {
								where.type = "mp";
								switch (where.path[1]) {
								case "boite-reception.php":
									where.mode = "boite";
									break;
								case "message.php":
									where.mode = "message";
									break;
								case "nouveau.php":
									where.mode = "nouveau";
									break;
								case "envoyes.php":
									where.mode = "envoyes";
									break;
								case "indesirables.php":
									where.mode = "indesirables";
									break;
								case "alerte.php":
									where.mode = "alerte";
									break;
								}
							}
							break;
						}
					}
					break;
				case "forumjv.com":
					where.node = "forumjv";
					where.forumName = where.server.join(".");
					where.type = url.path[0].toLowerCase();
					switch (where.type) {
					case "cgi-bin":
						break;
					default:
						where.type = "forums";
						analyseJVCFormat(where.path.join("/"));
						break;
					}
					break;
				case "danstonchat.com":
					where.node = "bash";
					if (where.path.length === 0 || where.path[0] === "") {
						where.type = "home";
					} else {
						data = new Reg("^([0-9]+).html$").exec(where.path[0]);
						if (data) {
							where.type = "one";
							where.page = parseInt(data[1], 10);
						} else {
							where.type = "other";
						}
					}
					break;
				case "dailymotion.com":
					where.node = "daily";
					break;
				}
			}
		};
		clean = function clean(where, state) {
			var key;
			for (key in url) {
				if (typeof url[key] !== "function") {
					if (state) {
						where[key] = url[key];
					} else {
						url[key] = where[key];
						delete where[key];
					}
				}
			}
			if (!state) {
				for (key in where) {
					if (where.hasOwnProperty(key) && typeof url[key] !== "function") {
						delete where[key];
					}
				}
			}
		};
		this.alter = function alter() {
			interpret(this);
			clean(this, false);
			url.alter();
			href = url.toString();
			clean(this, true);
			apply(this);
			return this;
		};
		url = new Url(href);
		clean(this, true);
		apply(this);
		this.clone = function clone() {
			return new Where(href);
		};
		this.info = function info() {
			var ans, key;
			ans = [url.info(), ""];
			for (key in this) {
				if (this.hasOwnProperty(key) && !url.hasOwnProperty(key) && typeof this[key] !== "function") {
					if (typeof this[key] === "object") {
						ans.push(key + " : " + describe(this[key]));
					} else {
						ans.push(key + " : " + this[key]);
					}
				}
			}
			return ans.join("\n");
		};
		this.toString = function toString() {
			return url.toString();
		};
	}

	function launch(key, object) {
		var target, list, tag, i;
		if (object) {
			if (key === null) {
				target = object;
				target._ = object;
				target.$ = object;
				target.name = object.name;
			} else {
				if (object.hasOwnProperty(key)) {
					target = object[key];
					target._ = object;
					target.$ = object.$;
					target.name = key.toString();
				}
			}
			if (target) {
				target.keys = [];
				for (i = 0; i < object.keys.length; i += 1) {
					target.keys.push(object.keys[i]);
				}
				target.keys.push(target.name.toUpperCase());
				target.name = function name(key) {
					return system.hash(this.keys.join("_") + "_" + key);
				};
				target.toString = function toString() {
					return "[" + this.keys.join("_") + "]";
				};
				list = ["init", "initStyles", "initScripts", "generate"];
				while (list.length > 0) {
					tag = list.shift();
					if (target.hasOwnProperty(tag)) {
						target[tag]();
						delete target[tag];
					}
				}
				if (target.hasOwnProperty("execute")) {
					return target.execute();
				}
				return null;
			}
		}
	}

	system = new SystemObject({save: "local", encode: "nb64-", hash: "SHA1-"});

	kitty = {name: option("name")};
	option("source").init = function init() {
		this.style = new Reminder();
		this.script = new Reminder();
		this.loc = new Where(location.href);
		this.create = new CreateObject();
		this.valid = true;
	};
	option("source").initStyles = function initStyles() {};
	option("source").initScripts = function initScripts() {};
	option("source").generate = function generate() {
		this.insertStyle = function insertStyle(key) {
			var id, style, bloc;
			id = this.name("style_" + key);
			bloc = $("#" + id);
			if (bloc.length === 0) {
				style = this.style.get(key);
				if (style) {
					bloc = this.create.style(style, {id: id});
					document.head.appendChild(bloc);
				}
			}
			return bloc;
		};
		this.generateStyle = function generateStyle(classe, fun) {
			this.$.style.set(classe, fun(classe));
		};

		this.jvc = {};
		this.jvc.init = function init() {
			this.$.root = this;
			this.valid = true;
		};
		this.jvc.initStyles = function initStyles() {};
		this.jvc.initScripts = function initScripts() {};
		this.jvc.generate = function generate() {
			this.mp = {};
			this.mp.init = function init() {};
			this.mp.initStyles = function initStyles() {};
			this.mp.initScripts = function initScripts() {};
			this.mp.generate = function generate() {
				this.message = {};
				this.message.init = function init() {
					this.generic = {};
				};
				this.message.initStyles = function initStyles() {
					this.$.generateStyle(this.name("voir_all_old"), function (classe) {
						return "" +
						"." + classe + " a {" + "\n" +
						"\t" + "display:block;" + "\n" +
						"\t" + "border:solid 1px #DDD;" + "\n" +
						"\t" + "background:#F9F9F9;" + "\n" +
						"\t" + "padding:5px;" + "\n" +
						"\t" + "margin-bottom:12px;" + "\n" +
						"\t" + "font-weight:bold;" + "\n" +
						"\t" + "font-size:95%;" + "\n" +
						"\t" + "text-align:center;" + "\n" +
						"}" + "\n" +
						"." + classe + " span {" + "\n" +
						"\t" + "padding:0 12px;" + "\n" +
						"}" + "\n" +
						"";});
				};
				this.message.initScripts = function initScripts() {};
				this.message.generate = function generate() {
					this.checkForNewPosts = function checkForNewPosts(delay) {
						var self;
						self = this;
						if (delay >= 1000) {
							this.interval = setInterval(function () {
								self.hasNewPost();
							}, delay);
						}
					};
					this.hasNewPost = function hasNewPost() {
						var self;
						self = this;
						self.nb_msg_non_lu = 0;
						jQuery.ajax({
							type: "GET",
							url: "/messages-prives/get_message_nonlu.php?skipmc=1",
							dataType: "json",
							cache: false,
							async: true,
							success: function (a) {
								var newCount = parseInt(a.nb_message, 10);
								if (newCount > self.nb_msg_non_lu) {
									self.reload();
								}
								self.nb_msg_non_lu = newCount;
							}
						});
					};
					this.reload = function reload() {
						var self, xhr;
						self = this;
						xhr = new XMLHttpRequest();
						xhr.open("GET", this.$.loc, true);
						// chat.xhr.responseType = 'document';
						// chat.xhr.overrideMimeType('text/html');
						xhr.onreadystatechange = function onreadystatechange() {
							var bloc;
							if (this.readyState === 4) {
								if (this.status === 200) {
									bloc = document.createElement("div");
									bloc.innerHTML = this.responseText;
									bloc = $(bloc);
									self.addNewPostsFrom(bloc);
									bloc.html("");
								}
							}
						};
						xhr.send();
					};
					this.addNewPostsFrom = function addNewPostsFrom(bloc) {
						var self, list, form;
						self = this;
						list = $(".msg", bloc);
						list.each(this.post.newtreat(this));
						this.post.playSound();
						form = $('form[name="rep"]', bloc);
						if (form.length > 0) {
							this.form.update(form);
						}
					};

					this.incrTitle = function incrTitle() {
						// debug("incr " + this.titleCount + " " + location.href);
						this.titleCount++;
						this.rewriteTitle();
					};
					this.resetTitle = function resetTitle() {
						// debug("reset " + location.href);
						this.titleCount = 0;
						this.rewriteTitle();
					};
					this.rewriteTitle = function rewriteTitle() {
						// debug("rewrite " + [option("dynamicTitles"), this.notFocused, this.titleCount] + " " + location.href);
						if (option("dynamicTitles")) {
							if (this.titleCount > 0 && this.notFocused) {
								document.title = "(" + this.titleCount + ") " + this.title;
							} else {
								document.title = this.title;
							}
						}
					};
					this.initTitle = function initTitle() {
						// debug("init " + location.href);
						var self = this;
						this.title = document.title;
						this.resetTitle();
						this.notFocused = false;
						unsafeWindow.addEventListener("focus", function () {
							// debug("focus " + location.href);
							self.notFocused = false;
							self.resetTitle();
						}, false);
						unsafeWindow.addEventListener("blur", function () {
							// debug("blur " + location.href);
							self.notFocused = true;
							self.resetTitle();
						}, false);
					};

					this.reloadAllOldMsgControl = function reloadAllOldMsgControl() {
						var scripts, nb_clic, discussion, last_position;
						scripts = $("#col1 script");
						scripts.each(function (i, script) {
							var data;
							data = new Reg("nb_clic = ([0-9]+);").exec(script.innerHTML);
							if (data) {
								nb_clic = parseInt(data[1], 10);
							}
							data = new Reg("discussion = ([0-9]+);").exec(script.innerHTML);
							if (data) {
								discussion = parseInt(data[1], 10);
							}
							data = new Reg("last_position_message = ([0-9]+);").exec(script.innerHTML);
							if (data) {
								last_position = parseInt(data[1], 10);
							}
						});
						this.addReloadControl(discussion, nb_clic, last_position);
					};
					this.addReloadControl = function addReloadControl(discussion, nb_clic, last_position) {
						var classe, control, data;
						if (last_position > 1) {
							classe = this.name("voir_all_old");
							this.$.insertStyle(classe);
							control = new Construct(this.$.create.element("div", {}).addClass(classe));
							control.append(this.$.create.link("#", {onclick: "return false;"}));
							control.insert(this.$.create.text("^"));
							control.append(this.$.create.element("span", {}));
							control.insert(this.$.create.text("Voir les " + (last_position - 1) + " messages précédents"));
							control.end();
							control.insert(this.$.create.text("^"));
							control.end();
							$("#new_msg").before(control.get());
							data = this;
							control.get().click(function () {
								data.reloadAllOldMsg(discussion, nb_clic, last_position);
								$(this).remove();
							});
							$("#voir_debut").click(function () {
								control.get().remove();
								nb_clic++;
								last_position -= 25;
								if (last_position > 1) {
									data.addReloadControl(discussion, nb_clic, last_position);
								}
							});
						}
					};
					this.reloadAllOldMsg = function reloadAllOldMsg(discussion, nb_clic, last_position) {
						var url, xhr, data;
						$("#voir_debut").remove();
						url = this.$.loc.clone();
						url.mode = "ajax_prec_msg";
						url.ancre = "";
						url.options = {};
						url.options.idd = discussion;
						url.options.nb_clic = nb_clic;
						url.options.last_position = last_position;
						url.alter();
						xhr = new XMLHttpRequest();
						xhr.open("GET", url, true);
						data = this;
						xhr.onreadystatechange = function onreadystatechange() {
							var div;
							if (this.readyState === 4) {
								if (this.status === 200) {
									div = document.createElement("div");
									div.innerHTML = this.responseText;
									$("#new_msg").after(div);
									$(".msg", div).each(data.post.pretreat(data));
									last_position -= 25;
									nb_clic++;
									if (last_position > 1) {
										data.reloadAllOldMsg(discussion, nb_clic, last_position);
									}
								} else {
									data.addReloadControl(discussion, nb_clic, last_position);
								}
							}
						};
						xhr.send();
					};

					this.form = {};
					this.form.init = function init() {
						if (option("MPnewTab")) {
							$("#rep").attr("target", "_blank");
						}
					};
					this.form.initStyles = function initStyles() {};
					this.form.initScripts = function initScripts() {};
					this.form.generate = function generate() {
						this.update = function update(newForm) {
							var list, key;
							list = {};
							$("input", newForm).each(function (i, input) {
								if (input.type === "hidden") {
									list[input.name] = input.value;
								}
							});
							$("#rep input").each(function (i, input) {
								if (input.type === "hidden") {
									if (list.hasOwnProperty(input.name)) {
										input.value = list[input.name];
										delete list[input.name];
									} else {
										$(input).remove();
									}
								}
							});
							for (key in list) {
								if (list.hasOwnProperty(key)) {
									$("#rep fieldset").prepend(this.$.create.input("hidden", {name: key, value: list[key]}));
								}
							}
						};
					};
					this.form.execute = function execute() {
						return true;
					};

					this.post = {};
					this.post.init = function init() {
						this._.initTitle();
						this.soundActive = false;
					};
					this.post.initStyles = function initStyles() {};
					this.post.initScripts = function initScripts() {};
					this.post.generate = function generate() {
						this.parse = function parse(key, redo) {
							var self, value, i;
							self = this;
							if (redo || !self.data.hasOwnProperty(key)) {
								switch (key) {
								case "ul":
									value = $("ul", this.parse("div", redo));
									break;
								case "li_avatar":
								case "li_msg_header":
								case "li_msg_body":
									$("li", this.parse("div", redo)).each(function (i, li) {
										if (li.className) {
											self.data["li_" + li.className] = $(li);
										}
									});
									break;
								case "span_pseudo":
								case "span_generic":
								case "span_msg_infos":
									$("span", this.parse("li_msg_header", redo)).each(function (i, span) {
										if (span.className) {
											self.data["span_" + span.className] = $(span);
										}
									});
									break;
								case "bloc_pseudo":
									if (this.parse("span_pseudo", redo)) {
										value = $("strong", this.parse("span_pseudo"));
									}
									break;
								case "pseudo":
									if (this.parse("bloc_pseudo", redo) && this.parse("bloc_pseudo").length > 0) {
										value = this.parse("bloc_pseudo").text();
									}
									break;
								case "profil_link":
									if (this.parse("span_pseudo", redo)) {
										value = $("a", this.parse("span_pseudo"));
									}
									break;
								case "profil_url":
									if (this.parse("profil_link", redo) && this.parse("profil_link").length > 0) {
										value = new Where(this.parse("profil_link").attr("href"));
									}
									break;
								case "avert_link":
									if (this.parse("span_msg_infos", redo)) {
										value = $("a", this.parse("span_msg_infos"));
									}
									break;
								case "avert_url":
									if (this.parse("avert_link", redo) && this.parse("avert_link").length > 0) {
										value = new Where(this.parse("avert_link").attr("href"));
									}
									break;
								case "generic":
									if (this.parse("span_generic", redo) && this.parse("span_generic").length > 0) {
										value = this.parse("span_generic").text();
									}
									break;
								case "date":
								case "annee":
								case "mois":
								case "mois_text":
								case "jour":
								case "heure":
								case "minute":
								case "seconde":
									if (this.parse("span_msg_infos", redo)) {
										i = new Reg("([0-9]{1,2})(?:er)? ([a-zéû]+) ([0-9]{4}) à ([0-9]{2}):([0-9]{2}):([0-9]{2})").exec(this.parse("span_msg_infos").text());
										if (i) {
											self.data.seconde = parseInt(i[6], 10);
											self.data.minute = parseInt(i[5], 10);
											self.data.heure = parseInt(i[4], 10);
											self.data.jour = parseInt(i[1], 10);
											self.data.mois_text = i[2];
											self.data.mois = inList(self.data.mois_text, this.$.tools.liste_mois) + 1;
											self.data.annee = parseInt(i[3], 10);
											self.data.date = new Date(self.data.annee, self.data.mois - 1, self.data.jour, self.data.heure, self.data.minute, self.data.seconde, 0);
										}
									}
									break;
								}
								if (value === undefined && !self.data.hasOwnProperty(key)) {
									value = null;
								}
								if (value !== undefined) {
									self.data[key] = value;
								}
							}
							return self.data[key];
						};
						this.addToList = function addToList() {
							var id, bloc;
							id = this.parse("id");
							if (id) {
								bloc = $("#" + id);
								if (bloc.length === 0) {
									// debug("add");
									this._.incrTitle();
									this.toggleSound(true);
									$(".msg").last().after(this.parse("div"));
								}
							}
						};
						this.giveId = function giveId() {
							var key, url;
							key = this.parse("generic_key");
							if (!key) {
								url = this.parse("avert_url");
								if (url) {
									key = "message_" + url.options.id_message;
								}
							}
							if (key) {
								this.data.id = key;
								this.parse("div").attr("id", key);
							}
						};
						this.generic = function generic() {
							var i, generic_text, pseudo, key;
							i = this.parse("i");
							pseudo = this.parse("pseudo");
							generic_text = this.parse("generic");
							if (pseudo && generic_text) {
								switch(generic_text) {
								case "Ce pseudo vient de rejoindre la conversation.":
									key = "join";
									break;
								case "Ce pseudo vient de quitter la conversation.":
									key = "quit";
									break;
								case "La discussion est fermée.":
									key = "close";
									break;
								}
								if (key) {
									this.data.generic_key = key + "-" + pseudo;
									this._.generic[this.data.generic_key] = true;
								}
							}
						};
						this.treat = function treat(i, div, addition) {
							this.data = {i: i, div: div};
							this.generic();
							this.giveId();
							if (addition) {
								this.addToList();
							}
							return this.data;
						};
						this.pretreat = function pretreat(data, loc) {
							return function pretreat(i, div) {
								data.post.treat(i, $(div), false);
							};
						};
						this.newtreat = function newtreat(data) {
							return function newtreat(i, div) {
								data.post.treat(i, $(div), true);
							};
						};
						this.loadSound = function loadSound(url) {
							if (!this.hasOwnProperty("sounds")) {
								this.sounds = {};
							}
							if (!this.sounds.hasOwnProperty(url)) {
								this.sounds[url] = new Audio(url);
								this.sounds[url].volume = 1;
							}
							return this.sounds[url];
						};
						this.play = function play(url) {
							this.loadSound(url).play();
						};
						this.toggleSound = function toggleSound(force) {
							// debug("toggle " + force + " " + location.href);
							if (force === undefined) {
								force = !this.soundActive;
							}
							this.soundActive = force;
						};
						this.playSound = function playSound() {
							var b64;
							// debug("play " + this.soundActive + " " + location.href);
							if (/*option("sound") && */this.soundActive) {
								b64 = "data:audio/mp3;base64,";
								b64 += "SUQzAwAAAAAjFlRZRVIAAAAaAAAAMjAxMS0xMC0wNVQxNzo1MDo0OC0wNTowMFBSSVYAABEEAABYTVAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4yLjItYzA2MyA1My4zNTE3MzUsIDIwMDgvMDcvMjItMTg6MTE6MTIgICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgIHhtbG5zOnhtcERNPSJodHRwOi8vbnMuYWRvYmUuY29tL3htcC8xLjAvRHluYW1pY01lZGlhLyIKICAgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBTb3VuZGJvb3RoIENTNCAoWE1QRG9jT3BzVGVtcG9yYWw6MjAwOC4wNy4xOCkiCiAgIHhtcDpDcmVhdGVEYXRlPSIyMDExLTEwLTA1VDE3OjUwOjQ4LTA1OjAwIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDExLTEwLTA1VDE3OjUyOjI0LTA1OjAwIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAxMS0xMC0wNVQxNzo1MjoyNC0wNTowMCIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDY5MEJCMUE0RUZFMDExODkwN0NCREZEOUZBRDkxQiIKICAgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDY5MEJCMUE0RUZFMDExODkwN0NCREZEOUZBRDkxQiIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjFFNjkwQkIxQTRFRkUwMTE4OTA3Q0JERkQ5RkFEOTFCIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MUU2OTBCQjFBNEVGRTAxMTg5MDdDQkRGRDlGQUQ5MUIiCiAgICAgIHN0RXZ0OndoZW49IjIwMTEtMTAtMDVUMTc6NTI6MjQtMDU6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFNvdW5kYm9vdGggQ1M0IChYTVBEb2NPcHNUZW1wb3JhbDoyMDA4LjA3LjE4KSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLzsvbWV0YWRhdGEiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MUY2OTBCQjFBNEVGRTAxMTg5MDdDQkRGRDlGQUQ5MUIiCiAgICAgIHN0RXZ0OndoZW49IjIwMTEtMTAtMDVUMTc6NTI6MjQtMDU6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFNvdW5kYm9vdGggQ1M0IChYTVBEb2NPcHNUZW1wb3JhbDoyMDA4LjA3LjE4KSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL2NvbnRlbnQiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjA2OTBCQjFBNEVGRTAxMTg5MDdDQkRGRDlGQUQ5MUIiCiAgICAgIHN0RXZ0OndoZW49IjIwMTEtMTAtMDVUMTc6NTI6MjQtMDU6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFNvdW5kYm9vdGggQ1M0IChYTVBEb2NPcHNUZW1wb3JhbDoyMDA4LjA3LjE4KSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgIDx4bXBNTTpEZXJpdmVkRnJvbQogICAgc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxRjY5MEJCMUE0RUZFMDExODkwN0NCREZEOUZBRDkxQiIKICAgIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUU2OTBCQjFBNEVGRTAxMTg5MDdDQkRGRDlGQUQ5MUIiCiAgICBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MUU2OTBCQjFBNEVGRTAxMTg5MDdDQkRGRDlGQUQ5MUIiLz4KICAgPHhtcERNOlRyYWNrcz4KICAgIDxyZGY6QmFnPgogICAgIDxyZGY6bGkKICAgICAgeG1wRE06dHJhY2tOYW1lPSJDdWVQb2ludCBNYXJrZXJzIgogICAgICB4bXBETTp0cmFja1R5cGU9IkZMVkN1ZVBvaW50IgogICAgICB4bXBETTpmcmFtZVJhdGU9ImYyNTQwMTYwMDAwMDAiLz4KICAgIDwvcmRmOkJhZz4KICAgPC94bXBETTpUcmFja3M+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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SJACxKmAiVQ6Hg2xh/kb0ZWNIZOmLNZmXSaJPJ3F0mcxVMFEJR0DCTFTxdUAgag3Uvor8vMJpGmlyYyhQqZtWeM3U3h8DYMWwF0HBfWVi3FEYBibmtxTtp4jJ7DbzbG3NfuWwiHYOsUku3AcHQ7TRmckMivyCIS6NwiXxqfrSiJ1924jDVPO7pZ2L1t3sa+s8b1WxGcbnKuOWOWdr9913LtrDdrPKzjRFZt8t6b+/oblkjbcjSJAYlooiUhaDNMkhIDCikPFxhm9vRMiuaLratwxNriy4gwYhu1JUURFQRYRlgRxSHySYuEUOF9g5YcAaqGmbERKBeIkZutDzf+k2gf1o1JzJExNUkknZHqZSOpSlIJLZzWppaSQ+tmFgAVXeHh4fbaRIgEIrCCEIwUTylBSIgGHh0BoMBAyKbyEpcQICmonUBVAoLKoixlDUdUDhhAW1Sph1SlbrJnifovsX6xZVMHMA2lsAWtnUaQjomKmTqGvFEpWIvxYjlQ1ZfrCWWi6mqm1TlqcsNzMxXxaWLWV69k3V69prdH261x8+uoUbiQJgKEgeOpcSt7DwiWHaNf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYIgADKc1Svs4ethVQ3mPYe9JA0QRG2wwYEAvASOQ8YAE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////gqy8vERH/rjAD0wdI24s1cYxLYpNSAE8K8lmxy7oAXGqdSeO05CbJpdIPbidQ5gY0sqpPUhTlHbFbGYXG5KlXFVsyleP2W4Kgr/h3CQVDRXIy1mwlXGkQCSUATJNCQIDNFGgEe5UesJAUFkHtRVgyIkkEECOjxArq5XlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
								this.play(b64);
								this.toggleSound(false);
							}
						};
					};
					this.post.execute = function execute() {
						return true;
					};
				};
				this.message.execute = function execute() {
					var form, list, okList, okForm;
					list = $(".msg");
					if (list.length > 0 && launch("post", this)) {
						list.each(this.post.pretreat(this));
						okList = true;
						if (option("reloadOldMP")) {
							this.reloadAllOldMsgControl();
						}
					}
					form = $('form[name="rep"]');
					if (form.length > 0 && launch("form", this)) {
						okForm = true;
					}
					if (option("mpChat") && okList && okForm && this.$.loc.options.hasOwnProperty("idd")) {
						this.checkForNewPosts(5000);
					}
					return true;
				};
			};
			this.mp.execute = function execute() {
				return launch(this.$.loc.mode, this);
			};
		};
		this.jvc.execute = function execute() {
			if (this.valid) {
				return launch(this.$.loc.type, this);
			}
		};
	};
	option("source").execute = function execute() {
		if (this.valid) {
			return launch(this.$.loc.node, this);
		}
	};

	launch(null, option("source"));
}());

