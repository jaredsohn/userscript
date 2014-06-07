// ==UserScript==
// @author      FarFaraway@e-hentai.org
// @name        Hentaiverse Shop System
// @namespace   *
// @description Creae your shop, with less then 6 clicks
// @match       http://hentaiverse.org/?s=Bazaar&ss*
// @match       http://hentaiverse.org/?s=Character&ss=in
// @version     0.6.5
// @run-at		  document-end
// ==/UserScript==

/* Thanks aoyamamotoko for the Equipment Shop Helper 
// This is just a mod, with a new name (and new functions - hell yes!)
*/  

//jQuery
/*! jQuery v@1.8.0 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bX(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bV.length;while(e--){b=bV[e]+c;if(b in a)return b}return d}function bY(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function bZ(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bY(c)&&(e[f]=p._data(c,"olddisplay",cb(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b$(a,b,c){var d=bO.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function b_(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bU[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bU[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bU[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bU[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bU[e]+"Width"))||0));return f}function ca(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bP.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+b_(a,b,c||(f?"border":"content"),e)+"px"}function cb(a){if(bR[a])return bR[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bR[a]=c,c}function ch(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||cd.test(a)?d(a,e):ch(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ch(a+"["+e+"]",b[e],c,d);else d(a,b)}function cy(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cz(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cu;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cz(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cz(a,c,d,e,"*",g)),h}function cA(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cB(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cC(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cK(){try{return new a.XMLHttpRequest}catch(b){}}function cL(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cT(){return setTimeout(function(){cM=b},0),cM=p.now()}function cU(a,b){p.each(b,function(b,c){var d=(cS[b]||[]).concat(cS["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cV(a,b,c){var d,e=0,f=0,g=cR.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cM||cT(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cM||cT(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cW(k,j.opts.specialEasing);for(;e<g;e++){d=cR[e].call(j,a,k,j.opts);if(d)return d}return cU(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cW(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cX(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bY(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cb(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cO.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cY(a,b,c,d,e){return new cY.prototype.init(a,b,c,d,e)}function cZ(a,b){var c,d={height:a},e=0;for(;e<4;e+=2-b)c=bU[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function c_(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=r.test("Â ")?/^[\s\xA0]+|[\s\xA0]+$/g:/^\s+|\s+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.0",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":a.toString().replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||f.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete"||e.readyState!=="loading"&&e.addEventListener)setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){p.isFunction(c)&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return typeof a=="object"?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length||!d)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/^(?:\{.*\}|\[.*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||++p.uuid:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")===0&&(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.shift(),e=p._queueHooks(a,b),f=function(){p.dequeue(a,b)};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),delete e.stop,d.call(a,f,e)),!c.length&&e&&e.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)(d=p._data(g[h],a+"queueHooks"))&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)~f.indexOf(" "+b[g]+" ")||(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>-1)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,""+d),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,k,l,m,n,o=(p._data(this,"events")||{})[c.type]||[],q=o.delegateCount,r=[].slice.call(arguments),s=!c.exclusive&&!c.namespace,t=p.event.special[c.type]||{},u=[];r[0]=c,c.delegateTarget=this;if(t.preDispatch&&t.preDispatch.call(this,c)===!1)return;if(q&&(!c.button||c.type!=="click")){g=p(this),g.context=this;for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){i={},k=[],g[0]=f;for(d=0;d<q;d++)l=o[d],m=l.selector,i[m]===b&&(i[m]=g.is(m)),i[m]&&k.push(l);k.length&&u.push({elem:f,matches:k})}}o.length>q&&u.push({elem:this,matches:o.slice(q)});for(d=0;d<u.length&&!c.isPropagationStopped();d++){j=u[d],c.currentTarget=j.elem;for(e=0;e<j.matches.length&&!c.isImmediatePropagationStopped();e++){l=j.matches[e];if(s||!c.namespace&&!l.namespace||c.namespace_re&&c.namespace_re.test(l.namespace))c.data=l.data,c.handleObj=l,h=((p.event.special[l.origType]||{}).handle||l.handler).apply(j.elem,r),h!==b&&(c.result=h,h===!1&&(c.preventDefault(),c.stopPropagation()))}}return t.postDispatch&&t.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{ready:{setup:p.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function bd(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)Z(a,b[e],c,d)}function be(a,b,c,d,e,f){var g,h=$.setFilters[b.toLowerCase()];return h||Z.error(b),(a||!(g=e))&&bd(a||"*",d,g=[],e),g.length>0?h(g,c,f):[]}function bf(a,c,d,e,f){var g,h,i,j,k,l,m,n,p=0,q=f.length,s=L.POS,t=new RegExp("^"+s.source+"(?!"+r+")","i"),u=function(){var a=1,c=arguments.length-2;for(;a<c;a++)arguments[a]===b&&(g[a]=b)};for(;p<q;p++){s.exec(""),a=f[p],j=[],i=0,k=e;while(g=s.exec(a)){n=s.lastIndex=g.index+g[0].length;if(n>i){m=a.slice(i,g.index),i=n,l=[c],B.test(m)&&(k&&(l=k),k=e);if(h=H.test(m))m=m.slice(0,-5).replace(B,"$&*");g.length>1&&g[0].replace(t,u),k=be(m,g[1],g[2],l,k,h)}}k?(j=j.concat(k),(m=a.slice(i))&&m!==")"?B.test(m)?bd(m,j,d,e):Z(m,c,d,e?e.concat(k):k):o.apply(d,j)):Z(a,c,d,e)}return q===1?d:Z.uniqueSort(d)}function bg(a,b,c){var d,e,f,g=[],i=0,j=D.exec(a),k=!j.pop()&&!j.pop(),l=k&&a.match(C)||[""],m=$.preFilter,n=$.filter,o=!c&&b!==h;for(;(e=l[i])!=null&&k;i++){g.push(d=[]),o&&(e=" "+e);while(e){k=!1;if(j=B.exec(e))e=e.slice(j[0].length),k=d.push({part:j.pop().replace(A," "),captures:j});for(f in n)(j=L[f].exec(e))&&(!m[f]||(j=m[f](j,b,c)))&&(e=e.slice(j.shift().length),k=d.push({part:f,captures:j}));if(!k)break}}return k||Z.error(a),g}function bh(a,b,e){var f=b.dir,g=m++;return a||(a=function(a){return a===e}),b.first?function(b,c){while(b=b[f])if(b.nodeType===1)return a(b,c)&&b}:function(b,e){var h,i=g+"."+d,j=i+"."+c;while(b=b[f])if(b.nodeType===1){if((h=b[q])===j)return b.sizset;if(typeof h=="string"&&h.indexOf(i)===0){if(b.sizset)return b}else{b[q]=j;if(a(b,e))return b.sizset=!0,b;b.sizset=!1}}}}function bi(a,b){return a?function(c,d){var e=b(c,d);return e&&a(e===!0?c:e,d)}:b}function bj(a,b,c){var d,e,f=0;for(;d=a[f];f++)$.relative[d.part]?e=bh(e,$.relative[d.part],b):(d.captures.push(b,c),e=bi(e,$.filter[d.part].apply(null,d.captures)));return e}function bk(a){return function(b,c){var d,e=0;for(;d=a[e];e++)if(d(b,c))return!0;return!1}}var c,d,e,f,g,h=a.document,i=h.documentElement,j="undefined",k=!1,l=!0,m=0,n=[].slice,o=[].push,q=("sizcache"+Math.random()).replace(".",""),r="[\\x20\\t\\r\\n\\f]",s="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",t=s.replace("w","w#"),u="([*^$|!~]?=)",v="\\["+r+"*("+s+")"+r+"*(?:"+u+r+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+t+")|)|)"+r+"*\\]",w=":("+s+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)",x=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",y=r+"*([\\x20\\t\\r\\n\\f>+~])"+r+"*",z="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+v+"|"+w.replace(2,7)+"|[^\\\\(),])+",A=new RegExp("^"+r+"+|((?:^|[^\\\\])(?:\\\\.)*)"+r+"+$","g"),B=new RegExp("^"+y),C=new RegExp(z+"?(?="+r+"*,|$)","g"),D=new RegExp("^(?:(?!,)(?:(?:^|,)"+r+"*"+z+")*?|"+r+"*(.*?))(\\)|$)"),E=new RegExp(z.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+y,"g"),F=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,G=/[\x20\t\r\n\f]*[+~]/,H=/:not\($/,I=/h\d/i,J=/input|select|textarea|button/i,K=/\\(?!\\)/g,L={ID:new RegExp("^#("+s+")"),CLASS:new RegExp("^\\.("+s+")"),NAME:new RegExp("^\\[name=['\"]?("+s+")['\"]?\\]"),TAG:new RegExp("^("+s.replace("[-","[-\\*")+")"),ATTR:new RegExp("^"+v),PSEUDO:new RegExp("^"+w),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+r+"*(even|odd|(([+-]|)(\\d*)n|)"+r+"*(?:([+-]|)"+r+"*(\\d+)|))"+r+"*\\)|)","i"),POS:new RegExp(x,"ig"),needsContext:new RegExp("^"+r+"*[>+~]|"+x,"i")},M={},N=[],O={},P=[],Q=function(a){return a.sizzleFilter=!0,a},R=function(a){return function(b){return b.nodeName.toLowerCase()==="input"&&b.type===a}},S=function(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}},T=function(a){var b=!1,c=h.createElement("div");try{b=a(c)}catch(d){}return c=null,b},U=T(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),V=T(function(a){a.id=q+0,a.innerHTML="<a name='"+q+"'></a><div name='"+q+"'></div>",i.insertBefore(a,i.firstChild);var b=h.getElementsByName&&h.getElementsByName(q).length===2+h.getElementsByName(q+0).length;return g=!h.getElementById(q),i.removeChild(a),b}),W=T(function(a){return a.appendChild(h.createComment("")),a.getElementsByTagName("*").length===0}),X=T(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==j&&a.firstChild.getAttribute("href")==="#"}),Y=T(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||a.getElementsByClassName("e").length===0?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length!==1)}),Z=function(a,b,c,d){c=c||[],b=b||h;var e,f,g,i,j=b.nodeType;if(j!==1&&j!==9)return[];if(!a||typeof a!="string")return c;g=ba(b);if(!g&&!d)if(e=F.exec(a))if(i=e[1]){if(j===9){f=b.getElementById(i);if(!f||!f.parentNode)return c;if(f.id===i)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(i))&&bb(b,f)&&f.id===i)return c.push(f),c}else{if(e[2])return o.apply(c,n.call(b.getElementsByTagName(a),0)),c;if((i=e[3])&&Y&&b.getElementsByClassName)return o.apply(c,n.call(b.getElementsByClassName(i),0)),c}return bm(a,b,c,d,g)},$=Z.selectors={cacheLength:50,match:L,order:["ID","TAG"],attrHandle:{},createPseudo:Q,find:{ID:g?function(a,b,c){if(typeof b.getElementById!==j&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==j&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==j&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:W?function(a,b){if(typeof b.getElementsByTagName!==j)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(K,""),a[3]=(a[4]||a[5]||"").replace(K,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||Z.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&Z.error(a[0]),a},PSEUDO:function(a){var b,c=a[4];return L.CHILD.test(a[0])?null:(c&&(b=D.exec(c))&&b.pop()&&(a[0]=a[0].slice(0,b[0].length-c.length-1),c=b[0].slice(0,-1)),a.splice(2,3,c||a[3]),a)}},filter:{ID:g?function(a){return a=a.replace(K,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(K,""),function(b){var c=typeof b.getAttributeNode!==j&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(K,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=M[a];return b||(b=M[a]=new RegExp("(^|"+r+")"+a+"("+r+"|$)"),N.push(a),N.length>$.cacheLength&&delete M[N.shift()]),function(a){return b.test(a.className||typeof a.getAttribute!==j&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return b?function(d){var e=Z.attr(d,a),f=e+"";if(e==null)return b==="!=";switch(b){case"=":return f===c;case"!=":return f!==c;case"^=":return c&&f.indexOf(c)===0;case"*=":return c&&f.indexOf(c)>-1;case"$=":return c&&f.substr(f.length-c.length)===c;case"~=":return(" "+f+" ").indexOf(c)>-1;case"|=":return f===c||f.substr(0,c.length+1)===c+"-"}}:function(b){return Z.attr(b,a)!=null}},CHILD:function(a,b,c,d){if(a==="nth"){var e=m++;return function(a){var b,f,g=0,h=a;if(c===1&&d===0)return!0;b=a.parentNode;if(b&&(b[q]!==e||!a.sizset)){for(h=b.firstChild;h;h=h.nextSibling)if(h.nodeType===1){h.sizset=++g;if(h===a)break}b[q]=e}return f=a.sizset-d,c===0?f===0:f%c===0&&f/c>=0}}return function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b,c,d){var e=$.pseudos[a]||$.pseudos[a.toLowerCase()];return e||Z.error("unsupported pseudo: "+a),e.sizzleFilter?e(b,c,d):e}},pseudos:{not:Q(function(a,b,c){var d=bl(a.replace(A,"$1"),b,c);return function(a){return!d(a)}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!$.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},contains:Q(function(a){return function(b){return(b.textContent||b.innerText||bc(b)).indexOf(a)>-1}}),has:Q(function(a){return function(b){return Z(a,b).length>0}}),header:function(a){return I.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:R("radio"),checkbox:R("checkbox"),file:R("file"),password:R("password"),image:R("image"),submit:S("submit"),reset:S("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return J.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b,c){return c?a.slice(1):[a[0]]},last:function(a,b,c){var d=a.pop();return c?a:[d]},even:function(a,b,c){var d=[],e=c?1:0,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},odd:function(a,b,c){var d=[],e=c?0:1,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},lt:function(a,b,c){return c?a.slice(+b):a.slice(0,+b)},gt:function(a,b,c){return c?a.slice(0,+b+1):a.slice(+b+1)},eq:function(a,b,c){var d=a.splice(+b,1);return c?a:d}}};$.setFilters.nth=$.setFilters.eq,$.filters=$.pseudos,X||($.attrHandle={href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}}),V&&($.order.push("NAME"),$.find.NAME=function(a,b){if(typeof b.getElementsByName!==j)return b.getElementsByName(a)}),Y&&($.order.splice(1,0,"CLASS"),$.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!==j&&!c)return b.getElementsByClassName(a)});try{n.call(i.childNodes,0)[0].nodeType}catch(_){n=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}var ba=Z.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},bb=Z.contains=i.compareDocumentPosition?function(a,b){return!!(a.compareDocumentPosition(b)&16)}:i.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},bc=Z.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=bc(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=bc(b);return c};Z.attr=function(a,b){var c,d=ba(a);return d||(b=b.toLowerCase()),$.attrHandle[b]?$.attrHandle[b](a):U||d?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},Z.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},[0,0].sort(function(){return l=0}),i.compareDocumentPosition?e=function(a,b){return a===b?(k=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:(e=function(a,b){if(a===b)return k=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],g=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return f(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)g.unshift(j),j=j.parentNode;c=e.length,d=g.length;for(var l=0;l<c&&l<d;l++)if(e[l]!==g[l])return f(e[l],g[l]);return l===c?f(a,g[l],-1):f(e[l],b,1)},f=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),Z.uniqueSort=function(a){var b,c=1;if(e){k=l,a.sort(e);if(k)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1)}return a};var bl=Z.compile=function(a,b,c){var d,e,f,g=O[a];if(g&&g.context===b)return g;e=bg(a,b,c);for(f=0;d=e[f];f++)e[f]=bj(d,b,c);return g=O[a]=bk(e),g.context=b,g.runs=g.dirruns=0,P.push(a),P.length>$.cacheLength&&delete O[P.shift()],g};Z.matches=function(a,b){return Z(a,null,null,b)},Z.matchesSelector=function(a,b){return Z(b,null,null,[a]).length>0};var bm=function(a,b,e,f,g){a=a.replace(A,"$1");var h,i,j,k,l,m,p,q,r,s=a.match(C),t=a.match(E),u=b.nodeType;if(L.POS.test(a))return bf(a,b,e,f,s);if(f)h=n.call(f,0);else if(s&&s.length===1){if(t.length>1&&u===9&&!g&&(s=L.ID.exec(t[0]))){b=$.find.ID(s[1],b,g)[0];if(!b)return e;a=a.slice(t.shift().length)}q=(s=G.exec(t[0]))&&!s.index&&b.parentNode||b,r=t.pop(),m=r.split(":not")[0];for(j=0,k=$.order.length;j<k;j++){p=$.order[j];if(s=L[p].exec(m)){h=$.find[p]((s[1]||"").replace(K,""),q,g);if(h==null)continue;m===r&&(a=a.slice(0,a.length-r.length)+m.replace(L[p],""),a||o.apply(e,n.call(h,0)));break}}}if(a){i=bl(a,b,g),d=i.dirruns++,h==null&&(h=$.find.TAG("*",G.test(a)&&b.parentNode||b));for(j=0;l=h[j];j++)c=i.runs++,i(l,b)&&e.push(l)}return e};h.querySelectorAll&&function(){var a,b=bm,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[],f=[":active"],g=i.matchesSelector||i.mozMatchesSelector||i.webkitMatchesSelector||i.oMatchesSelector||i.msMatchesSelector;T(function(a){a.innerHTML="<select><option selected></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+r+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),T(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+r+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=e.length&&new RegExp(e.join("|")),bm=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a)))if(d.nodeType===9)try{return o.apply(f,n.call(d.querySelectorAll(a),0)),f}catch(i){}else if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){var j=d.getAttribute("id"),k=j||q,l=G.test(a)&&d.parentNode||d;j?k=k.replace(c,"\\$&"):d.setAttribute("id",k);try{return o.apply(f,n.call(l.querySelectorAll(a.replace(C,"[id='"+k+"'] $&")),0)),f}catch(i){}finally{j||d.removeAttribute("id")}}return b(a,d,f,g,h)},g&&(T(function(b){a=g.call(b,"div");try{g.call(b,"[test!='']:sizzle"),f.push($.match.PSEUDO)}catch(c){}}),f=new RegExp(f.join("|")),Z.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!ba(b)&&!f.test(c)&&(!e||!e.test(c)))try{var h=g.call(b,c);if(h||a||b.document&&b.document.nodeType!==11)return h}catch(i){}return Z(c,null,null,[b]).length>0})}(),Z.attr=p.attr,p.find=Z,p.expr=Z.selectors,p.expr[":"]=p.expr.pseudos,p.unique=Z.uniqueSort,p.text=Z.getText,p.isXMLDoc=Z.isXML,p.contains=Z.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=(c[0]||c).ownerDocument||c[0]||c,typeof c.createDocumentFragment=="undefined"&&(c=e),a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=0,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(g=b===e&&bA;(h=a[s])!=null;s++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{g=g||bk(b),l=l||g.appendChild(b.createElement("div")),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(f=n.length-1;f>=0;--f)p.nodeName(n[f],"tbody")&&!n[f].childNodes.length&&n[f].parentNode.removeChild(n[f])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l=g.lastChild}h.nodeType?t.push(h):t=p.merge(t,h)}l&&(g.removeChild(l),h=l=g=null);if(!p.support.appendChecked)for(s=0;(h=t[s])!=null;s++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(s=0;(h=t[s])!=null;s++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[s+1,0].concat(r)),s+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^margin/,bO=new RegExp("^("+q+")(.*)$","i"),bP=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bQ=new RegExp("^([-+])=("+q+")","i"),bR={},bS={position:"absolute",visibility:"hidden",display:"block"},bT={letterSpacing:0,fontWeight:400,lineHeight:1},bU=["Top","Right","Bottom","Left"],bV=["Webkit","O","Moz","ms"],bW=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return bZ(this,!0)},hide:function(){return bZ(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bW.apply(this,arguments):this.each(function(){(c?a:bY(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bX(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bQ.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bX(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bT&&(f=bT[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(a,b){var c,d,e,f,g=getComputedStyle(a,null),h=a.style;return g&&(c=g[b],c===""&&!p.contains(a.ownerDocument.documentElement,a)&&(c=p.style(a,b)),bP.test(c)&&bN.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=c,c=g.width,h.width=d,h.minWidth=e,h.maxWidth=f)),c}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bP.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0||bH(a,"display")!=="none"?ca(a,b,d):p.swap(a,bS,function(){return ca(a,b,d)})},set:function(a,c,d){return b$(a,c,d?b_(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bP.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bU[d]+b]=e[d]||e[d-2]||e[0];return f}},bN.test(a)||(p.cssHooks[a+b].set=b$)});var cc=/%20/g,cd=/\[\]$/,ce=/\r?\n/g,cf=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,cg=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||cg.test(this.nodeName)||cf.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(ce,"\r\n")}}):{name:b.name,value:c.replace(ce,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ch(d,a[d],c,f);return e.join("&").replace(cc,"+")};var ci,cj,ck=/#.*$/,cl=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cm=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,cn=/^(?:GET|HEAD)$/,co=/^\/\//,cp=/\?/,cq=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cr=/([?&])_=[^&]*/,cs=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,ct=p.fn.load,cu={},cv={},cw=["*/"]+["*"];try{ci=f.href}catch(cx){ci=e.createElement("a"),ci.href="",ci=ci.href}cj=cs.exec(ci.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&ct)return ct.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cq,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cA(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cA(a,b),a},ajaxSettings:{url:ci,isLocal:cm.test(cj[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cw},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cy(cu),ajaxTransport:cy(cv),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cB(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cC(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=""+(c||y),k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cl.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(ck,"").replace(co,cj[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=cs.exec(l.url.toLowerCase()),l.crossDomain=!(!i||i[1]==cj[1]&&i[2]==cj[2]&&(i[3]||(i[1]==="http:"?80:443))==(cj[3]||(cj[1]==="http:"?80:443)))),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cz(cu,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!cn.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cp.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cr,"$1_="+z);l.url=A+(A===l.url?(cp.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cw+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cz(cv,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cD=[],cE=/\?/,cF=/(=)\?(?=&|$)|\?\?/,cG=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cD.pop()||p.expando+"_"+cG++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cF.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cF.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cF,"$1"+f):m?c.data=i.replace(cF,"$1"+f):k&&(c.url+=(cE.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cD.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cH,cI=a.ActiveXObject?function(){for(var a in cH)cH[a](0,1)}:!1,cJ=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cK()||cL()}:cK,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cI&&delete cH[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cJ,cI&&(cH||(cH={},p(a).unload(cI)),cH[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cM,cN,cO=/^(?:toggle|show|hide)$/,cP=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cQ=/queueHooks$/,cR=[cX],cS={"*":[function(a,b){var c,d,e,f=this.createTween(a,b),g=cP.exec(b),h=f.cur(),i=+h||0,j=1;if(g){c=+g[2],d=g[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&i){i=p.css(f.elem,a,!0)||c||1;do e=j=j||".5",i=i/j,p.style(f.elem,a,i+d),j=f.cur()/h;while(j!==1&&j!==e)}f.unit=d,f.start=i,f.end=g[1]?i+(g[1]+1)*c:c}return f}]};p.Animation=p.extend(cV,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cS[c]=cS[c]||[],cS[c].unshift(b)},prefilter:function(a,b){b?cR.unshift(a):cR.push(a)}}),p.Tween=cY,cY.prototype={constructor:cY,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cY.propHooks[this.prop];return a&&a.get?a.get(this):cY.propHooks._default.get(this)},run:function(a){var b,c=cY.propHooks[this.prop];return this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration),this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cY.propHooks._default.set(this),this}},cY.prototype.init.prototype=cY.prototype,cY.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cY.propHooks.scrollTop=cY.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(cZ(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bY).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cV(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cQ.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:cZ("show"),slideUp:cZ("hide"),slideToggle:cZ("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cY.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cN&&(cN=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cN),cN=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c$=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j,k,l,m=this[0],n=m&&m.ownerDocument;if(!n)return;return(e=n.body)===m?p.offset.bodyOffset(m):(d=n.documentElement,p.contains(d,m)?(c=m.getBoundingClientRect(),f=c_(n),g=d.clientTop||e.clientTop||0,h=d.clientLeft||e.clientLeft||0,i=f.pageYOffset||d.scrollTop,j=f.pageXOffset||d.scrollLeft,k=c.top+i-g,l=c.left+j-h,{top:k,left:l}):{top:0,left:0})},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c$.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c$.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=c_(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(window);

// Bildarchiv | mein Dank geht hier an Evil Scorpio
// archive | thx @ Evil Scorpio
// beginning with the add icons
var img_add_all_equip = document.createElement('img');
var img_add_good_equip = document.createElement('img');
var img_add_super_equip = document.createElement('img');
var img_add_items = document.createElement('img');
var img_add_locked_equip = document.createElement('img');
var img_switch_lock = document.createElement('img'); 
img_add_all_equip.width = '50';
img_add_all_equip.height = '50';
img_add_all_equip.title = 'Add every equip to the list src="' + img_add_all_equip.src + '"';
img_add_all_equip.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAI00lEQVR42t1ZWW%2Fc1hU%2BlxzNImmk0WgdyYsMW3FSt0HiNnnpS9GH5g%2BkQPvQAkF%2FVB4D5CEt2qLPLQwYRYo%2BNIZrwy1S2JEs2Za1WJI1%2B8Yhb8455CUvOeQMlRQC5CtQnOGcu3xnP4eZf%2Fz1UwlvwMjQv3c%2F%2FOmFBvHoq3%2B6QGi0qo8vJIip0s1AIqApV78%2FgNPTBvStAT4erXUC%2F7ITGZibK0I2m0m1scQlm8029PoWzJdnQAgRS9du96DV7sLUVB4mC7kRC2qq5X7HP9xl5%2FkB%2FOCddRApOULrfP2%2FHbhxfTXxUDQ63T40Gx04eV2HK5eXYAIZsLt3BJfWFodo6%2FU2mKYBk5M5ePSfpzBdLMDc7DSUStOQy0%2BAaRjxNqLG3v4JSqMJBh7o93%2B6CxnTHAliYNvw61%2F%2BnOfQ3LXVhVjOHhyeQq%2FXh%2FWrK3i4PJxWm%2FDj99%2BCR%2F99Crsvj5DrBWacMAT0uhaYGRM2blyG%2Bw8ew7s%2Fug6FQhYeP37Oe5TLRVhaLPE6hiEiQKQrc%2Bk4eHNQ7H3IZSeYK4rLn%2Fz2I75%2F9vnfPBWRYNoG09Icmst64w3bdmD%2F8DVYls0SmENu9noWNFCtSHW%2F2dyFmxuXEFQDTk7qTJ9BAEtLJaQtwubWLtRqTViYJ%2FUDuP3%2BBqvas2eHsPV0DxYXZmG1Mh%2BjWjK47IFkaRCQQIdcQLpYyUaIVp%2FrS%2FfgNZRmpmFluQz1Rht2d48ZfBYZdPXyMn%2Ff3NqDayilyvI8P%2B%2Bj3bw6qsKDh1uQz2XhyqVlcGyA6mmLr1xuAsFfgVq9Bf%2B69zVUVubDEtGNmtCTwRt4YOISba6bvDWwXTVAQqIh2jjTmJ2ZgheoNiYypNnqsFOgOaRidCc1rDdasI%2BAn%2B7sg4MSpfUK%2BRxze6Y4xfsPcD9ag34nhtD3J9%2B8YFD62UOqpS7Los0kfPKbX2gScfj2O0%2FFaHz%2BxR2mjRNJEb1NHw99Wq0ziHa7wwdVoAlMHg9TyE%2F436U3n26dTsf%2FTIOAkIOo1ZvIoFfwE7Qxd8%2BosauHrFo2qpYR1pW4aIo0RKvmRelXV8qwtb3PtmCRTaFxWujWyUko25Mxexie%2BrId4mf6Tp8dlNDW1kv2YHTp%2B2Wi9kE%2F2QMHdTYLf%2FzLl8gJl%2FhXH%2F%2BM73%2F489%2B9zQTTEK0uUH2UcDOyM%2FJadJij4yp%2FX60sICCLwURdtgvMdkEg7e6rY6Ypz82wQyHX%2FMNb62xT%2Bp4RibhPbbSw7AS5XjMcyXBMoivUB9FG5%2BsSe3vjMmzvHCCdA%2BvovZ7vHqHKWSyZqErpnx1UZTL4Q2RCGQMuqWYXY9EGxqtldL%2FseaMSiQ6SAiGOG9HnSmJJYxpt5dY7V3yVaba60EXbsW2bz0ECibsTIPKK%2BXwWrl%2BrsANQLjrkTcNxxFVyMnDDO5xphEV%2B5%2B59z%2F2KISAGc1OGc52Qzosgf8C9yHOR99GloNuMLxWUooMSN0yBAAy%2BIJpTSRmNI64UKGcycSLlOHKMsdPmREtzXJ0dXxHQ4SgwpgFCErBtGXo2Mo1XwCiJq9ZaHD27uFkaIORCKQeiuSlwsAQp8Fk%2BkPjEkva2vUwD5FgHqryW9Akp0m7aeyjGHhrc6NmUkxUwM6U5MmV5RkB6GESjxh69s7tFWlciyUBkVLXAM1pi0Ma11bMVBTExJBEIqkuvO85GPI9Irl16Z3POoFrnMZRECIgCIIbLCz8YkpdKwyffa40rov5vQFDnB5gRW4NBAEQzlJCxIxDT81SJ59NVS55j%2B4EOadkDD4hr7FEg6kyG4UDOmRhbcUYi%2BzkBQSfEEunboQQyDggHx0KQA6byWucGhLNrOxTZo0BcBxD8xlaU2mudk37NYFm7hFUfNzdwT3Lh0Z1VZUoXVYg5amykDYjnBeQG5k10fQdRpvRa8oI2HIdzrTegZQoSUknk5f4JXsf8eQ2Lo7XK%2FEj6r%2F4ddC8%2FvH1z7PpnpY9t0KWJyAqEC%2BoYlpdKY3tfsRuL%2BMN8b4mw9x2Ty1ALJrpho9GB0szUWG4N1eZyPNhx50kOiGNGreYCoaZYp9vjbuHxSS0ZiEyQRPQeSrC%2Bt0SU1xKxq1EhdHh06tbskzkoYPn5%2BrTBV7fS93tMw1Fc%2BoeNlUjkzvmUhMTuSvqAqFJqELyo8Pu3XU%2BGAmamJ91awqNvtDphIH5uofgiw9VTnI34hgjBvokFSPz8kPs1MKJKrBcE9ZW8hhxN3Nze5%2FmrlTJHYiptFxdLcHRcg%2B1nB7CA1aG%2FgRDDXPWyayHFSBXyUxXpVUZaLubykf4Z5HkwK85iztaLaWILr4BRzWxPzPQ6QKXQ1MtVz6klSn1aGtQZmUKVc4sfEdFQ7xlNE9LvGeuvM3Tgai%2BV%2F4U6kKyq6ox2aB8GQl0Kzm3QlQrwJIJg6BnV8IpT1NphtcPFitMFvyNIPdki5lDcTpGeevh1hjuXXhmIGJ0QOueNIEHktdVzt8fDCi%2BEwcpCZzSFyWcPuV%2Fe1Gu2kXrRYfTYQXU56bAjHF4yY5hQWS7zO4uXe8ewtDDrJnve7lRAufYWqJviPh04ULuIjQgZBGglEa2VBIb0f9PL4kyEPT6H6F5ttnhTGjsvDvkKGSFx3XA7avTuwnXFAf8MXkh99zsWIXsIVX4iqN0D%2FyAD2amUX91lkvuV4YWpVzvSDWq%2FHWFMmWUgMuxlpYRQORFdL%2BqVtcJKZ7AilJ7WOI4TKotD7lcHQbGD3iwptWLPFJd%2FHZx4r%2Bwa0FMxZcjQk%2Fs5MilV1922Fo%2BUxB1ppeui1Jsdf5PJQj7Rrc%2FNFjmZVHMWtN6w1P%2BniG8S4qUT%2FlGOzn6jO20%2F2%2FcPWmAuxy%2Bg%2F0ZzFuaKyRw%2BS%2FGUtq6QkNxFabWDQDOvHyyp6ltfhc2dPX8ux5TIuPfwSeL8D9576zvTx78f8Ua11vCR8vuQMdxxaYK5U%2BodStokMM4Vn7HszcRp6NpKma%2B0eTc1Bz5478YQffjZeP04K30CkDei1JUXt2aPxpHy2u2LL5EnT%2B5feNX6FhSWeZtmODJsAAAAAElFTkSuQmCC'
img_add_good_equip.width = '50';
img_add_good_equip.height = '50';
img_add_good_equip.title = 'Add only the good equip to the list src="' + img_add_good_equip.src + '"';
img_add_good_equip.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAIv0lEQVR42t1ZWW8U2RU%2Bt6rdi%2B222%2B21bRYjcMgMEzIwAy%2FzEuUh%2BQMzUvIwkVB%2B1DxG4iEzSqI8JxppFCWahwEREImIbGxswHjBNu59q666c86ppW%2Fdru4uEFgx1xTVVX23755zvrN04l9%2F%2B0rCe9AS9N%2FVm5%2BdahAP73zvAqFWK66eShBjuctdiYCiXO12B46PK9C2Ovh6sNYJ%2FEuOJGBqKgvJZCLWwhKnrFbr0GpbMJ2fACFEZL96vQW1ehPGxtIwmkkNmFBRLfcZ%2F3CVrWd78OEHyyBingjN8%2Bh%2FW3Dp4mLfTVFrNNtQrTTg6FUZzp2dgxE8gO2dAzizNNvTt1yug2kaMDqagof%2FeQLj2QxMTY5DLjcOqfQImIYRbSN%2B29k9QmlUwcANff3n7yBhmgNBdGwbfvvFL3kMjV1anIk82b39Y2i12rB8fgE3l4bjYhU%2BufYTePjfJ7D94gBPPcMHJwwBraYFZsKElUtn4d79Vbj6s4uQySRhdfUZr5HPZ2FuNsfzGIbQgEhX5tJx8Oag2NuQSo7wqfinfOt3v%2Bb7H27%2F3VMRCaZtcF8aQ2NZb7xm2w7s7r8Cy7JZAlN4mq2WBRVUK1Ldx%2BvbcHnlDIKqwNFRmfsnEMDcXA77ZmF9YxtKpSrMTJP6AVy%2FtsKq9vTpPmw82YHZmUlYLExHqJbsXnZHsjQISFeHXECqWMlGqK86NpDu3ivITYzDwnweypU6bG8fMvgkHtD5s%2FP8vL6xAxdQSoX5aX7fRrt5eVCE%2Bw82IJ1Kwrkz8%2BDYAMXjGl%2Bp1AiCPwelcg1%2BuPsICgvTYYmoRk3oyeAN3DCdEi2umrzVsV01wI7Uh%2FpGmcbkxBg8R7Ux8UCqtQaTAo0hFaM7qWG5UoNdBPxkaxcclCjNl0mn%2BLQnsmO8fgfXoznoezoQel57%2FJxBqXsPqZZ%2FWRYtJuHWl79SJOLw7feeilG7%2FcdvuW%2BUSLLINm3c9HGxzCDq9QZv1AdNYNK4mUx6JHiW3ni6NRqN4DM1AkIEUSpX8YBewqdoY%2B6aurH7L1m1bFQtI6wrUd4U%2B1Bff5zef3EhDxubu2wLFtkUGqeFtE4k4duejFjD8NSX7RA%2F0zN9dlBCGxsvmMHoUtdL6PZBX9kdB3U2CX%2F66z%2FxJNzOv%2Fn8F3z%2F5i%2F%2F8BYT3If6qgJVWw4XIzsj1qLNHBwW%2BXmxMIOALAajU7YLzHZBYN%2Ftl4fcJz81wYRC1PzRlWW2KXVNTSLuWxstLDlC1GuGPRm2UaRCtVFffbwqsZ%2BunIXNrT3s58Aystez7QNUOYslo6uU%2BtlBVSaD38dDyKPDJdVsoi9aQX81j%2FTLzKtLRG8kBUIc1fT3vsT6tXG0lSsfnAtUplprQhNtx7Zt3gcJJOpOgIgV0%2BkkXLxQYALwKTrEpmE%2F4io5Gbjhbc40wiL%2F9rt7Hv2KHiAGn6YMxzohnRfd%2BAHXIuYi9lGloNpMIBWUooMSN0yBAAy%2BQI%2BppNT9iCsFiplMHEgxjhxi7LQ49aUxrs4Ozwhoc%2BQY4wAhCdi2DL0bGMb7wCiIK5Zq7D2buFgcIEShFAPR2Bg4WILk%2BKwASHRgSWvbXqQBciiB%2Bqwlg47kadftHRRjCw1u8GiKyTIYmdIYGTM9IyAtdKK6set3plvs60qkPxCpqxZ4RksHtHJh8fWSgggf0hcIqkurOcxGPEYkapfe3pzXUK2TaL5ECIgPQPSmF4EzJJaKc04Baw1Lot4aENT5DkbEVqfTBaIYSsjYEYjpMVXf%2FamqJU%2Bw%2FECbtOyOB8Q1dh2IvyfDcCDljAzNODXPfkJAkIRYIm07FEBGAWHnmOnGgLFY68SAcHRthzy7DsQlgO53bEWxWeuE9GsC09o5zPq4uIFrEoXrK%2FuZKV2UIaaosBHXIZ4UkEsYN9H1BqKMyVrylBYce2Ot96BkChJiSeTF7hFeh%2Fx5CZOjpcL0%2F4FEBuQj%2FTyyD8IFdQjzc7mhta%2FIhUX0ZoIY6U0lwuw7JJahEoxOL5VKA3ITY%2FFWEn02Hhm3vT4HxJZIqeQCoaJYo9niauHhUak%2FEBmxeRFxf0vOOBGOb0TkrJQI7R8cuzn7aAoymH6%2BOq7w1Sy0gxpTrz72qsrd%2B2t8v8HlHA2IeH1Q0Q7RD6lBcJAmgvpt05OhgInxUTeX8PpXao0wkCC28Dcmw9mTHGAHDoTWjW1jOv0a6FEl5guC6kpeQY4Grm%2Fu8vjFQp49MaW2s7M5ODgswebTPZjB7DBYQHTDiYAJGQz%2B88qu%2FewgCFVk2K78kAW4LmAQ82BUnMSYrRVRxBZeAuMXs8GNv%2BjnAD%2BEplqu%2F55KolSnpUaVkTFUOTf5EZotdCUkhfROXImtQIZUjPqoz6EKJM0v%2FD3aIVVkIFSl4NgGqVSAJxEEQ%2B8oh%2FdPiko7rHY4WXY8E1QEqSabxRiKyynSUw%2Fhqmc3xHWL3oYwQqcvfOCBiYheiXjvBc9rsLLQHk1h8t5D9MsTe8U2Ui%2FahOo7KC8nHXaEw1MmDBMK83n%2BzeLFziHMzUy6wZ63OiVQdx%2BsuU%2BajdDvIHf%2BvdrDWDevXY6WiFJKAkMG0bqaFid0rvdPiO7Fao0Xpbb1fJ%2BvUCxDUjTcihr9duFScff8DJ5IoyJvviBHV78TUgnpeyktCPn9u%2BxHvzI8MdVqB4YuyncH6FMmGUj3HVfMNWcYol%2B91qbO2ePtfTuxg%2FqYmhaH6FcFQb6Dflny1YqZKSr%2B2jvyfrKrQMv3KaFNCJcEhAbeN2AICUQTguhWeASEnI0jrXhVlHK1Ecw3mkn3jY6nJrMcTPpjZvSasXbCckC0LQflIHJwfJPoV5fafLobbDTDpxw9gfodjZmZysYLjt5W3iChfxWlVu86mulhG6Osb3kR1rd2grHsU042r4pOdYulSoCUfw8Zcnpun%2B7YMe03FLXd%2BPnKO8nkElEaurSQ5yte3A1cHLjx8aXY%2Fd9dhvgeNKX4cEoR6H4kv3T99Etkbe3eqVetHwHeJUlC76rXEgAAAABJRU5ErkJggg%3D%3D';
img_add_super_equip.width = '50';
img_add_super_equip.height = '50';
img_add_super_equip.title = 'Add the best equip to the list src="' + img_add_super_equip.src + '"';
img_add_super_equip.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAIfklEQVR42t1ZS28bVRQ%2Bd8bPxHYc59WkaZqqTQttqWhB3bBBLOAPgAQLkCp%2BFEukLgABYg1CQgjEAlBVVKqWpnGbpm6eTez4Eccez1zOOfPwnfH4kapKm95oMp6Ze%2Bee77zPmcjvP34h4RUYEfp36eo7RxrErb%2F%2BsIHQqJXuHUkQw9lzbYmAolzNZguKxQo0jRbe7q11Av9i0QiMjqYhFosMtLHEV1are9BoGjCWy4AQInTe3l4Danv7MDycgKFkvMcLFdWyr%2FEPd1leWYfzr8%2BDGJAj9J47d5fhzOmZrkTRqO83oVqpw%2FZOGeZOTEIUGVBY3YLZ4xMdc8vlPdB1DYaG4nDr3weQSidhdCQF2WwK4oko6JoWbiPuWF3bRmlUQUOCvv7uF4joek8QLdOETz56j9fQ2uMz46GcXd8oQqPRhPmTx5C4BBRLVXjr8lm4dfsBFJ5sIdeTzDihCWjsG6BHdFg4cwJu3LwHl944DclkDO7dW%2BE9crk0TE5k%2BT2aJgJApC1zaVl4slDsTYjHoswVl8vXPvuAz19e%2F8lREQm6qfFcWkNrWW%2BcYZoWrG3sgGGYLIFR5GajYUAF1YpU9%2F5SAc4tzCKoCmxvl3l%2BBAFMTmZxbhqW8gXY3a3C%2BBipH8CVywusao8ebUD%2BwSpMjI%2FAzPRYiGrJ9mG2JEuDgLR1yAakipVshOaqaz3pru9ANpOCY1M5KFf2oFB4yuBjyKCTJ6b4eim%2FCqdQStNTY3y%2FiXazuVWCm%2F%2FkIRGPwdzsFFgmQKlY4yMejyL4Odgt1%2BDPv%2B%2FA9LExv0RUoyb0ZPAaEkxcos1Vkzdapq0GOJHm0Nww0xjJDMNjVBsdGVKt1dkp0BpSMTqTGpYrNVhDwA%2BW18BCidL7kok4czuTHub9W7gfvYOeE0PoevH%2BYwal0u5TLfcwDNpMwrVP31ckYvHpc0fFaFz%2F6meeGyaSNHqbJhJdLJUZxN5enQl1QROYBBKTTES9a%2Bmsp1O9Xvd%2B0yAg5CB2y1Vk0Ca8jTZm7xk0dvcmq5aJqqX5dSUsmuIcmuuuC86fOZaD%2FMM1tgWDbAqN00C3Tk7CtT0ZsofmqC%2FbIf6ma%2FptoYTy%2BSfswehQ94sE7YMemS0LdTYG3%2F7wG3LCnvzxh%2B%2Fy%2BZvvf3U2EzyH5qoCVUcWNyM7I69FxGw9LfH1zPQ4AjIYTNBl28BMGwTOLWw%2B5Tm50Qw7FHLNFy%2FMs02pewYkYt810cJiUXK9uj%2BS4RhCV6gOmhtcr0rstYUT8HB5HedZMI%2Fea6WwhSpnsGSCKqX%2BtlCVyeA3kAk5DLikmvsYixYwXk2h%2B2XPG5RIcJAUCHHYCN53JdZtpNBWLrw%2B56lMtbYP%2B2g7pmkyHSSQsDMBIq%2BYSMTg9KlpdgCui%2FZ5U38csZWcDFxziNM1v8h%2F%2FuWG435FBxCNuSn9uY5P50U7f8C9yHOR91GloNqMJxWUooUS13SBADQ%2BIJhTSRmMI7YUKGfScSHlOLKPsdPmNJfW2DrbvyIg4igwDgKEJGCa0nevZxrvAqMkrrRb4%2Bi5j5sNAoRcKOVAtHYAHCxBCnyGByQ8saS9TSfTANnXgbpeS3oTKdIumasoxgYaXO%2FVlJMlMTOlNXLA8oyANDCIBo09eGZ3i3NtiXQHIoOqBY7REoMWTs0crCgIiSFdgaC6NPb72YjjEcm1S4c26wCqdRjDlQgBcQGIzvLCC4bkpQbhk%2Be1%2BhVRzw0I6nwLM2Kj1WoDUQzFZ%2BwIRHc8VVf6VNWSh9h%2BICINs%2BUAsY09CMSlSdMsiFvRvhVnILIfEhB0QiyRpulLIMOAcHBMtnPAgbzWoQHh7Nr0RfYgENsBtJ%2BxFQ3stQ5JvzJY1k5i1cfNDdyTXHhwZ7cypYMqxDg1NgYNiIcF5AzmTXQ8gygH9FryiDYcO3OtV6BlCjK8UiM9pnq7UqnDxlbRuz81MQrpdBJy2fRLIJEe9QgNSh4X84XQZwSKjqtXzj3bxiKcGC9HelaJsPdVcplKtQ6LSzYI6kcdx9I0mWhXhtyfQklJ6wD6KLoQHpq3HdwHhEpkp1jxfp%2BctdubKjepFeO2YwbmvHsdPD%2BnYBzx5zf2Dqo9cNKm2s9BNrW6qIrschYHBxUeEJ2UenI8y2DovfV6Q1EroXBRdq%2BKhFA4H5gne9iBZSeH4qA2FnS%2FGkZUifXCWG4ENp%2BW%2BP7tu4%2B4E5JKJey6XgovExVhG4h2OuFJksEAr%2B0lVS9VkX67clMW4L6ARrUAZsUxzNkaIU1s4RQwuCI1FIfT89Ow9HCVH9%2B9v8JGPzaa4VaoJmzJdLhsS7alFpQIvVpIr2esfs5QVYznKNe%2BDiS9X0in4W76VJGBUJeCcxtdx2cWCKwDqJd0MT7PHfWdUoXdMR0UO6itn04l%2Fc01h1k2XU7iB4paCT8AtREOQjUR0SkR577g92qcQRONutCZdp%2F7ZaKcZhupFxFBX4pIMpNV22bou8Z2scxe7QyWwySloOG5xFq8m0OLKxGH%2B%2FQdpK12flihElFaSaBJL1tXy%2BJI0Ne7HFK5l8kM8UHxZWNzhwHll1fhtbNzLBn3bfaaNv%2FabRKpdix89uCv%2FKQi5U6X5qX87ll2c78Sepa81DWMzkygqlX5mj6j0b3uYbpt6F2zWBn4BBMmKdG%2BIR2tsSzLVxb73O8gdbtaG2yiup2cnegeJ1yJWLKry%2FVN7RCCaDsRAb5gY0mjfxeFVIhVJmQY%2FLXXHhRv%2BmbNobbQH1QHUbJ3RI6E9aX%2BQ3dLRNJB3xLd3i19Ul7fLHpzc4FvFC88%2Bw2jhQKiGxRDK735ma5SewF1VXip%2B%2Bb5U1DD1ISy3JUnW74vUEOJuG300chLVY1FwjQ0GtUhGx1yiqiRQTX6ZQHySpS68ujW7ME4kjt%2B5ehLZHHxxpFXrf8BpnYU%2Fbp%2FxnsAAAAASUVORK5CYII%3D'; 
img_add_items.width = '50';
img_add_items.height = '50';
img_add_items.title = 'Add every item to the list src="' + img_add_items.src + '"';
img_add_items.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAH1klEQVR42t1Z628UVRQ%2Fd2a62%2B12y%2FYB9BEVIkJ8xCAKajDG%2BEHCBz9I1OgHTYh%2FlB9N%2BKBGjZ8lKBoIyFPlVaDWPqh9QLe0293tPmeu59x757mzu7OlxZSbTqeduefee875necYZ3%2F6ksMTMAz69fKhw1uaieuXzklGaBRW7v5vB2GMARN%2F4MXFD3AeDSjJ9D5XI%2BChqVRqsLycg0q1ho%2BbL0bbxzoM6O1NQSxmrIuBbLYAFh6aW5azG7c4bN%2BehtXVAnR3J5ovwj3Qkv9zIYWpewvwwvO7pIQiDFpn9PYU7Hl2WBysnUH73f17Biam5qBQKIFpWqDrGgzu7IOjRw4hg1ZLYfpsxB5z80uojTxoeKBvvj8Nhq43Ja6ZJnz60buChmhHhgfaYkTTGLz26l6YnrkPpVIFajUTkqiBo0deB8PQERVme8auQCnVi1IoVyoQj3UI6dhSPv75EXH%2F6sRJR5q6qYm5REO0wNtzgPlcSUCnw5ACs9Qahs5g%2FJ9%2FYVtPsvWaddDi7mXWuNAGMeISSIZ0TfPZCM310rYzYigsEkgH2hmtS%2BtpTEOhyLW7k4nIaxq2fbgGKA1ew4UJs7SRd60qqp8pQ6U5NLdN03CGLSjBhMYcuNnvDEOPYKO8Hlr2Va1W8HAcjn%2F2nofCErcvFMRonPj6lJi7bpWovRmzIcIVOizpbKKsF4SWPIh8YaLUDZJWi4VoDs216dbLiKRzAojLRBvrGUH7IFKzZiF%2BY%2FDdj2fQAOVin3z4jrh%2F%2B8NvDgRoDs3l8AgK4WTkPj7E%2F7RvJIWEa0Q%2BNS0TAx3hU6%2Bj6ErEfAvRXID1cUJeStc68G46HotgpaOQLLTPGgblKHZSF0fcDbjwKI08TXDuo6QmpVIZ8hgM7XVKpaqI6EODfbCCUX%2Bgv6edOCIxSgauqcPpmt8VnTp9VXkYVseIJg7F%2FblOi1FDiXfGO%2BD8xVsY1YsiGJJWqtUqnPzlCnx87G0olSuQy69BqlmawnkwjkgtUM6kY0BKJjtbJm4kUZpLNHZMiDriSDN6Zxpm%2Fl2EYrGMjNSEUMjlzy8swdnzN%2BGtN18SGUM3niUytOgM%2FX09Qp3T05gylKuRGCGpptPdgjYqH%2BQoHixm4dbteyLHIjiZClqkKYapybUbEwivftj9zCAsZlZklG%2FttVwPQYTj5hwaWVlkpU0PhIwkEnFB046dUw51%2BepdWM2twVqxogzdAzuEWblcg1%2FPXIPtx9IIraQQcBgzPAgtUBIhC3hu9%2FA6Y0HzQVlBojMGv18chUwmC4V8ScQhHnAYtBRBLY%2BMnvr5Cnzw%2FmEooNDyuWJDmBlBf7xZg1IZsrsbo5MwhdDNIROVCkHKCp1PtoJvYWY2A%2BcujMLhN14U9pLs6mzutThsLieJrhgsPHgIN0enYA1dbrVWFerXPEloWB5FsLt%2BawJLhH54%2BqkdaC9Z6El1hXst%2FhjaD1RvXLs5IYolcuGd8VjkWENB8cKVO6ISTXV3tYrsm1%2BXH3xln0o9eJu0yrmgCql2IWfQ0GttNiM61hkprC%2BY02VoP7sUTiBQNdZ7rceAr2Bts%2BF9rcfFyKY36GTWuUUZqc%2B14EnQSLTO3iwGpNn5jPh7ZGgAr%2F7QeZf%2BaNy1PHRg3wZrpEk90qhGsZmQTGVg5450y95X6MYs%2FDCwXofmK3VbFEhZLHaCLieHuU86JJE7uH%2BvuF%2F%2Bc8x9dmCv2%2FXgrfK2tk0kukaoR0sbDCOciphiLK%2FkIbOUDWUkNMByt0ntu29QMPak8d4d%2FKOMtcn9xWVZs3fFRQb7cDknrtJQBeLx8LJYaJn5A5fv4ME7a5%2Bp8ICIYZeLdgwTELAFtrZWUjpk0IO5TrVac%2BbnsEz1MaKeu5Ln4Ovg8SZ2YIFv38g2FnS%2Fmq4BpwqNMlLVkCPC8cl5QT881CeKKSptqe1Pmejk9AIMYHXobGAz4dWCyq4ZZ02h5HTzud%2FwmRAw%2FcFFxkX9It2IYbpSDmliM1VcOd8qpFEWMWu1E4t0T7fznKq1B4srshmN5WoSISeLMxaAiHpGZIw7PWNfy9MDMTGHe7uQzBGIhKp9RtO3j2BE05n8aoSulIHSCDJDz6jEtCVF1ZmAHS5GnQ27lqCSlRJC0U7hCh6MKTpJS71dFoIJZjPumAir14h6zsS6qsmNe%2BtMF2f3uV%2BxqWq2EbxkUePGDqrLCcMWs8SShqbD0M4%2BUbXNzmVgx8A2%2BRlC7S4%2B0tjtTwU3W%2FrElAs7P1uhGnGyX8I%2Fd7J1b6%2FBCIjHkRDdV%2FIFp0s%2BNXNfXL5chqRO7%2FFZAR2CdMWu%2FDSxkCNnu2Phswd%2FPsw9X73qXRpjis6%2B80bul%2FsXpjZM09TF824RY4rscnC%2Fl%2BUcvGipS%2Bp44BNMmKaYp1OvUGNZlidsBNyvlwmKHfRR1IaV8Exh%2BdfCkvpkl4OyHVPqDL1xX9h33jolMLfDw8AXbCxejdZFWc0XnfW6Ep0Ns%2BPebSmRTNo0A57eMPf%2Bjv6pI1TjfuE0yX6DO01OzzsHTQgphy%2FgfUc0A72pBgfZpDqBQ%2BMuSmHNDTT93oM1GHt2DcP41JxDOzo2XTfn8l9jvoRyg%2Buq8FJ3JZtzOBXfQ1pIU86pp23lIDanZvfsPjLYJy6I2CuizvrB%2FXt89G1YwkYz8kSUunzr1uzBONI3cmDra2Rs7OqWh9Z%2FkTKNSZOC%2Fm4AAAAASUVORK5CYII%3D';
img_add_locked_equip.width = '50';
img_add_locked_equip.height = '50';
img_add_locked_equip.title = 'Add every locked equip to the list src="' + img_add_locked_equip.src + '"';
img_add_locked_equip.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAJHElEQVR42s1Z2W8jSRnv6svtK7Ed53LuZLPZuYJmWfHAZAaExPIET0ECCRZWvME%2FwBs8ICHxDognpEECBCOQQEKgkVZMMivBwGjZzCSzc9hJJndMYsdH2%2B3uruKrrna5bbedGeSHVDqt6q%2B%2B%2Buqr7%2FjVYXn1rz8XLl6R4X%2FxMzculE5rDz6UWa2cf3pBdArHFlxrCcQl1WpWLlesmRbhpOaCBKQqcjweVVW5i2hChFJJN2rmQKIPIdTSqutGWa%2BGw1ooGPDrXHeiUydQtl4eXr40jbrOBnptPNl6Yy7VPh6USrVWKlZOTguTE0OKIu%2FuZ8fHBr0MhYIuSWIoFFh7lIlEg%2FH%2BSCwWCWiKJIqtscXK%2FsFJLlcSEfrN7z%2BQJclXJ8u2v%2F7VLwAbMI%2Blki02ODzKGUZtemokFNJy%2BdKnr7%2B59jizu5cNh4MwAyQio2pKsjT%2FxsTDj54uXpsLBtWnT1%2BCqEQiOjQYg16iiDxqEWp3gjH8G7VaQFVgQswY77%2F3JXj%2F8vbfHNcQyRaBAdiAmbrKKbaND45OTdMGC8VjEcMwiyUdguH5i92F%2BfFcvnhyUgAeWZaGhmLxWPRFevfsrJQcAP8Kb1%2BfB4dubx%2BlM%2FuDyf7U6ECzE4n72BYBU4FadZ9R5biFIbaAgTO7Zj48jfVFRoYThaK%2Bu%2FtfaFZVZWpiGOov0vszUyOjwwNAqdXM42z%2Bo%2F%2BktYA6OT6MbSGfK8MTCCgL85NnhfI%2F%2F7UxOjLQsBYPcFAfol4URZgcjbW6g0zLpl5ACJqAoSWo%2BvvCO3tZmEqpXIGEADZwJbzBy4Vi%2BeDwNLN1gDGGvkEtACbpi4ZBvmXZ0AXoMBmoP3u%2BA%2FpxZRpOZI9pgkTy%2FjffrVsLw%2Bs7jiuh3P71XWAQms0VDWs1o5bLF0AnXa%2FA8KA3tjE2bVyraVZFJYaAwOmiaGGsCwXLkkB7xwOgFmTGWaG0s3f8zvU3HbHekGff1Im2DB4k%2FgABTcDAOL08qZFEevMAIsmE%2BKOhXavqFVOv2NUzmZwGA0VJNm1LqehRGyWkYEwBbAhqsiLTkLZxOr0HKQkPlyl7AwtotoVVVf3dH1YgAaDpa8ufh%2Fdv7%2Fwd3mAFaAIGblxeYv0RCEfIRDBVNpsTbJyIBGrFo77QwdjofiKeY2wnp%2FH9w1QhP2qagweHOTmgJBL9kD2AGlevTEP8cbFea1GCjW1IRIjyBl0QQkGVawAMXn5uxbfmJza3DsF1k6lk5vmOgUuRwO7U%2BPbpTv7Oj4uM7d1vGVMT1fSmVS7LhwfVwdEkOL1arc3PpYYHYxQcvNbyFjASaN1C9FKYFdtLJKxduTRJsa1ay%2B7sI2tvLLVz8jJ393bpK9%2BLIsftf%2Fpp8YvvkbGUmN6MqGJoaiyZmhhi2NHIfQ9uUbdApIvOqJLYyLS7Hzx0AAJ51RJpVhKhbYFiYGgaBjFL0Ug21pf%2F409KX%2F5uZGBUFBwBUP%2Fzz0rf%2FpEUDh0jexDbliyL8AjeFZAQL25RI8FKJ0kIVivSIeQh7YEB2Jw48OcBtUShNBA%2FwQ4Dhd56fhHsUhLxExmFLZhAp9ziKsKymj8rA%2BBWDbOLWlpAgVUMmDuwCJZRVeXSQCLP3I2d5cO1NGEUnEzkg1oSm0YnISwTXTUAkV%2FY%2B7Js4A7sgEjBYADYOomjOWHC8qUTAf%2FqByX4%2FMsv9BYGoH%2Fjh5GgWsWW2S6HeJ0oOBOCAJifSZ2%2FJ2oGrTa9LEU2O2VGI7EUCzgFfJ4Te1VAFKzj3dUCv2LHI92c6Biud3qJcqWqkq4TBZVg%2FQz2yz7jcif20FQUTVStpEeOsqGlZev%2BHbOdYWlZOToOnRWDg%2BOar7G9KN8ztZRAqGr2P%2Fkk8c716o1l8uEdy9t6Y1mOjasP%2Fh0rVSOyqgndM7GXamkBokRebvVbD6y3FnLL32%2FKRLDTPx7Ed7OxYF9Y0TThnEzsnSNhXxBPxI%2F7RnPl8Mfrie1tPRw2FAWbplguB4p6WK9FI7FIciQZCmtCdzjtoVqwBC0sTM7NjJqAyxXdNqsEmwKxBSQhUZEUTQmGwKKyqohddlCCF0%2Bdsv1kFd5Tl256P3lhdF9iYzEQkaKp8AixaFcoIUKHmPfBLWdD2qCwz6nLjjYbq1vrq1D3Jfb4sM9OiS1bF07xfvK6L7FHcOy334J5D09dOdpeh8r0lZsuH2pZedqI7aJR60js5PQa1qL4wBd5mxAb9tceYziHEbfO9irUsQ6R7RFswjctjYFJp8X0%2FLXLx1rQ7XB7vWnSEEaixwDYqeOudvK%2B%2Fy%2Bs5hsb2jXzmObXLAQvovX0o5XZazepYVzjOGHkWM7HhC2xRdre6JX06wCnmPUnHQPF3b0wZQlLioYEdrT17eJMBb1KLHoBAsBGwA196S2D2Jhu5pELVLNXbzLMhObMo%2FsMQIEIG1dnDcOIIF%2FHIYSaLOdQ6FD0WCDC3CRZtUyj%2BWoE0ZidubZU14PMXrvFonvm6hKqz4XdN0Fl%2BvISQZ6V1AMxlO7cVvAWPrdGF8J0qucKYpFhc0dTtUQJsUI7Om%2FXF6ghnV%2BNuBN1JDdNnVHAWq%2FZBdFBRYhWOP5LSIL%2FBkBQbTABT4HOs4u3EIsS4v5tbdx3d%2FdYgCRggtPrKzwf5xZvQfPm4xWIH%2BrleheoZ9Zc78OhDIuESQAiv8qCNJr71OfYLoavgrLX9%2FS2Aov0UIcaabO5QQNozvEp5GZmfRUGAw3guDGzCCqSzcer8DnDYs6xgbeLILoRyacq0EsS%2Bna6IOi7vXF%2F6tJnEUI8KpoAAvN0JoS7oin%2F6xyYb9NIPRFZqrGKXxfCE9zThS252KaI7GzviR9A2PVUp1dBdc08%2Be%2FqwwU7yO66FbvEzNo9h3irpQsibdDKhsAOXtMrRtP%2F5EO81uLT8bwbOeXh5yDHwQ50IqQJVzNrK3xIpxXXBxI8kNy2g6gDI%2FHZEnqJvN6FE5T4%2BB7kjZfY%2BGzv3iKKCL05%2BTBL8IGhAhR4mlR5nWNmW2wRPxu0N%2FHLrU5E39ZzZfrdyzdih8Usn%2Frs4k1n9vc4Bdh8iVwIb63TW2W2EDnF5%2BeC1gg4j95O9FK8Pn1Fgb5HjAvz%2B5gXtxJjb1%2B43xOfPXt40X7m%2FB%2Bq5Bse8COEAwAAAABJRU5ErkJggg%3D%3D';
img_switch_lock.width = '50'; 
img_switch_lock.height = '50';
img_switch_lock.title = 'Switch: lock to unlock and backwards src="' + img_switch_lock.src + '"';
img_switch_lock.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAIU0lEQVR42s1Ze2wcRxmf2ZndPd%2FTSfw8E7txFTtuU%2F4AVCCOUxREJfgDFalRRB%2B4RUiVCFAJBFIgNAkgGoFA9BFVtEjQogRFFDUUiZQiEMQOLwF%2FUIhpIxI%2FEie1E7%2Fubm8f8%2BDb3bvz7t5ecU9y8Hi9mvnmdzO%2F%2B%2Babb75vjo698gzaeIXC%2FzvvHN5QnP7xl3PUr5WWXt8gnFKtgxVtIen9rWdhNuOMccvhzJGCISQQUrBCCVWJrhJKqVZRkE%2BE3gQFOKZtly2rWGTmMkErmloihHFObSfFUZYmcno6LYWuJrSQbXkc10tbnHGnbJWXl5kxn9RmN7e9mUkvY%2BRIpBaKuYXrnUYhL3g7RjmFKISSAK24JZw4%2B9rznzvu10efPDC0546maVnlsmMsJtUrnV1Tc5cWTp%2BWgnOFkLvuKXZuK1%2B7Kg2DWppGExqsangRZR2nR49%2F9uSX%2FeZT931z9IkmmYFVOTCtvNHWcXXu4sLvXuIfub%2BIEIYpf3ki%2FYGPLbT1abOX046RYamUqmur2vIsPsTL5XTiYM%2BOrX4T6k%2Fd%2F%2Fixvzfj4YTjCKeYS91IJxdeOi2AU2cfrBQ8Lr8zJzMPHlxIp24sl9uE0wo0%2FJWj9apqrlyd%2FINf6b5lV4gWYwoqZXIr8OaO8GSKhG3ozsq54yiIQ2%2BhXAJkdCfKOpOXXgn21pqzl85FwPltw1197%2Fe7rlwc9yUVWtxRiZFOAy2D2QoSNkYMe9pCQoAERNALGEDWpqCVXRigdfA9B%2BD99APHInMffPenH%2F%2BruwnyYX0EN7LfNXvx3Ox%2FxvP9wz4vVbUwMp89rDGz9OJxjAnGGAhgycHCrGcPpz551AQMExxVVRFv8g2LB4NZo9rqr%2Bim1uVKqrqmlGPpCOb5UqDjrA4GBEEOvYBhAY9A0dvnle%2FfVS8PEQoNGDAQqAoRnAnDGtbUjWXtU7RqR2sj1RjWXTWmCEZKxbE1IXWiqpgQHDBZUBVIQA69gJGaUjOnGG194ruPvPD579dPDPImNi0m1LKTJaN1777CqycSjmmCwty5gZOiqInE3n0UegGjttCwtsJfcXB454PfeeTHXwgxAwnImziiFKIymZuf63jHgHH3ffI3P1W5w3y7Iir94D6aH9hyeaYDMKBPGbQtV62hFUeDu27%2Fxh%2BfjK6gaMa%2FueecmikZ3ZenUVtfy8OPLWFk%2B7Qk0opG6%2BXpzpLZrSYzgIQpZHAR1%2B2kRqASDQIECOnMFuvKFl0vaZqtEDgWsW1rlpUCPdFkFjCAlPJmRRCgLL0lQSlhdlKwLVywMtiWcOMtRBVVozoF4ioYvhs%2ByMhOXM94S1EJPGoysQafGNiJctVfoOnXx2u43sHdvmRTx7bFuUv%2BuyavgSPNYKmNECupr9eWLRSdRtDw1NBrKbHTNDdmZSdWSAbevQPDlXrkCRpipBkrrBsZxU2HwmFB6EzsHdg9%2Fe%2Fx6Qnv%2B%2B2oficRfoKuV8SdW40xMH6l7gn9iWIPv2hgs3XQVdLUxPjk%2BbG%2BIXcU4fmS2jsIjjRjhW%2BB8cef8shFADSk1Wrp2zE8NTE2df5s39AIuFEPUH2HFkjELWJDDIzpsRkJYaJ4GdXW1HnvY7eN1Hw6yGE1Qb4lv%2F3G7AW%2FdzU8jNNERBhs1uqxwnptVbj2Do1M%2Fmvs0j%2FH%2FL5bbh%2Fx5e7Z6rvAsGpEnLIiwtgxg5joILFBc99tu1FdoOQLU62dka%2FlyyNftF5YP2YQEztI1J3C8Q6ZHbcdN7KGKLaSlUNmqRLNPR%2Fg5FrXFFzWa4tZjm1adqnE7QJVVnTdIIRzTiwryUSWaBktldISOtXVm3GR5HMSkJVbtlksCvN6KnmtrWM%2Bm1nGmElJVwq563PtJaMLvIQbvRFFqWbl66Ct8E5kjNvlMisvZpJX8%2FmZ%2BemlX7wsJReYKHs%2BauR7y7NXZMEgNgQDGhz3SnOzXvjTxKnHfujX93%2Ft4YH3DTXUlm%2F%2F3GbMLKvKQnvXm8Dp96fFhyErx5BmyjMn0nfds9Teo5mTSWameUtS1ZpZxwt%2Fdjl96ulH%2FeYPPvMEMNv%2B3qEGtPyNyplkRja3lE0vvvxzCZy6eomX%2Frr8XjmZeeBLi9nspsXlNsFzzanK59S1vcdvQh2YHfrVt%2BrjG%2BrFtW4OIsG2FSO7qQBvyNncywv3X3GBGHHGiMKgd6VgABLwjea%2B%2BFrFRfXfMRKXcuDVz3qVyFBAJuAg3DdXNTOTLiq4zB3InGwF7B0BCpJPcBdEwRx6AQPICINaASo%2BG%2Bjye%2BPJrdFBeAKua5aCzeeOasw2fvaMoijEu%2FAhniO2njuafOiQCRizSustpgyS8%2Btfv%2FuLrj0d%2BF4ECfKvvvrthg4CbJtQgTFk5Qwe6erECeoehNBLIHN3L16kN%2BvZOjZ7qoo8G5D8z5hcNnQQlYRW4uppKsIBuecRJHavNCCX8sbZtnNP%2FRKECa0pd6nHBDIfiR2LCqkqVIXlE%2BGsHCQgh17AeJdTDWfr3znytrOpOmTg2k2hZjlZLOb23lv69U90ZiEv6gPtuaSoru%2B9l0CvaSVJqpljcf%2FRh04d%2FlGsPN5B%2BOtHCLV4dv5a%2B9Zbyx%2F6uPzti6pvYa6qKAVO3bdumplsZzyrEdpEXrn9zh37j4yeOvJ8iNORUZAHR4vuROKeKpmC0T0zidp7Wka%2FsqzgSlYupAZ6Ak7QSxMZQDbnTsGhHzpzbK1Htc%2BSQIKbSiLUVjR1c2ZzQjc03cYENiS2LQ3WDvQEnABDNIrW%2BVeP1TsIBUKplgSsF3cgK99sC2bbwrNt19eTFsjJvZRcpYBc3zR8NcWo3he4FwEt%2Bv%2Fzt6ig39rc864N93viG2%2F8DW2w8l%2FaFU3vGtUVoQAAAABJRU5ErkJggg%3D%3D';
// Menu icons...
var img_autolock_off = document.createElement('img');
img_autolock_off.width = '50';
img_autolock_off.height = '50';
img_autolock_off.title = 'Don\'t try to lock your Equipment after adding to the list. src="' + img_add_items.src + '"';
img_autolock_off.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAJhklEQVR42s1Z228bWRmf%2B8VjT3yJkzgXp02aNt3udqu9wErbLhI8LEhsxMOCxNPyUu0KqSte%2BCt4QYsArRAInpAQL1QCsRI8QCkPK8r2Bo2Stmndxk5qTxKPL3Ofw3fmeOzxeOJ2EUWZuu6Z73znnO98l9%2F3fS535Y8%2FpY7ew8Hfs19480jJdPPTqxwZtQ%2FWj4hM6exqT1sUOkq6QqERg5fnKJrv%2Bq7t2IbpGF3PNhHyaJplBYmXU4IscQLPcEyCbz1XfYFMjmmZrbbV3qM9TeAOONZxPd5uZ22j4KbzUibNS2JMstCIaEiN3P1t%2BZNPKR%2FZLy%2Fbr66ilAhk2qPSP%2FktxTCU71MsS3me9%2FaXuyfz6Z%2F%2Fnu4a0U1bl97t7eQj13JMvW21diS2Uph%2BOKE2yFRTn9S0RVMvU2iGphmeFmiGHjFiRC7x77eEf26QsXDzHv%2Fvre53vu6L7CGOgJJ03aP4nmsbhtXRQKbSzMbO3fovP94jU2vvm6UTVm2HMjs8K%2FAsz7AMN6QtFPwhD902hGsb1htn7NdxRDC6ofzqD8KVz8yvvAaTwNb57rd8yhkWDLnvvG0spkekolzbtTttxq0XS1sg0%2BWP9779%2FUky9esfNNbep4rH%2BO2aanewHVkuFKZvRBS6PFvT3LlJ%2B9VThOJlpO7aef7GJoVohEmIfA9pBgVfSUEDXuWaekbeSae1XwQyFcs8mYIxSPbhj0RF3mmZBcdMC7I4asRQezUNSQKiBxRvYVq8ehOr6vMHhmvZlNdS1foYHpht7bQwZ8zlERoABH990%2F3qW0N4gSim0WQoxkcejJUf%2F4YKtEbNTLfeDdIDy7K%2F%2BySDPQCsjIzvvee6rVAsg2N0NdMYJ1amsftEB85Q7cm4hSg0CmN9YuQzYIt6PeoJTV5cS%2BDa8O9Hl2rEn2IyAf3Dj0rAY7hW9FAuJpW7PI8276LlQnSxl5%2FwfI8c2v7gmwOXJ6tcF1y%2Bu6CEDtUagJbnsrz9FOMjULftO25UFVwoVI%2FmLE7z6w%2Bxe4fuxT7aRbIAsoU8hyECOjSVPGvSQX0NxbXlzBWlP1%2Fjrm%2Fa51YIQMiXrzqriz7yGQhGKsHC5FLJ2YvhbVt%2BqkSYh%2BFHtBWRCymSfe6EdPUWfIg7UzxnvfkyZvBDvznU8%2BIPy0lWN9vq5NYumpd%2Ftj%2FKsHYxB7OWnWVTUty30DDoGF980ZnKK3%2F6B8hhnTluv3LK55m%2BPj6PVBQvyV2zUN9dXFjtrl2kYpKBTHOrE48qix5TECU53H%2FIiEO7OsdLBxffiSGmR1MHH3yD8u3Y2c33vnZYDcJJIp%2FKdtsLlQqaOvbw0g%2FF6Gy7k6tUFg1ngU9ngRONicT%2F7cPyvKgoCE13O0LlUU7kDwSxy7Ku53G2lbKcrM8UeCUHPMCZFInPRyyGYXhRhAKB4wTHzJiOaXRA2T7M0KzAypIopXhZxCUXw4SBjiIo%2F9weKAwg2QX5Tn0mnPi%2FVaf%2FZeeDjpJMQ5F4mG9V1v9GBuXV8zFin9J%2F7TPHHsLpe47R3tNqmzAulFbkdJ5h%2BXHaOsyIrm1iCO3XAoIUpjo0tCR8LZ%2Fq9ZuVO4Ggp88PNOB7e9VNCMuFlTeAoGvbe%2FpmYfYkzbCHi4WSizjL0CHn5KeX9nbvw5jlxVAMP2r62GsipdvS2np9dmmBonErkVInt%2B89kDOFlFpM9PkBbtF0nKGj14N%2BcgbEgnHCFgRb%2FLi6RylGpwlETlAIkeVleAWinCmO0Ra5GT1sQVilFWZXKJrNz6xo1c1sEewox07F9vFRXFsjlGajOsoDxNz08tj2dSQeTaMFKwUpDXT4hrFtdVleSjw1YWv6GaqepwEEbuh6bVrfsTpNPB3IAa4K%2BxqtPQifkeoIvBmRljDonAJNkGYqInc6P6Pv1aLdCaxS8yXko7Fw2t%2B3t8Y5qGO1b92%2BSoXt7oFWnSiWIarTueCM%2FgmIUgulIT3h7BLRGaIkeUL3a%2BAXgoSLWNvswLekTDwFTnE1GvF5q4ML39nlc6KcITqwuq3q1nWgy2peUYt6o2a2m7Cv2dVBN5KSG%2FIbEMSPtJ8gVjoHC5taNT9zHLuaVpUzeSCOekIMTofm2y0NlMzxg2KDE0RwKaBLmZyYUqfKLxw0Hne2biiZwkz5TErNDwVzPH4gZ7PF0kpbbzy4jSGtOH9SUcsMgEUvcOL8IwARjCZLJyZnT0RDHEqBpRcv9F9TmTx8Bmbsl4g0RSO6x4lilaoAzqTmSn0XBPsEAICwyX0fGFzHGv5phA6%2Fca%2BXcFJigoJ9MXL2liOyNqj48aJB6RqaEk%2BF40CmMFZoRGKn3yNzQe1B95h81NsQUfdv%2FxVYl85%2BafQkz7MB0uqPN2jEFMsraXUSCqqetjET3WnW2816V9dAPeB%2FygTGzIe3r0AkHD9zgbBp1bu%2BaxfmTjIsBwUZ3I4GS9Ms%2FB0ABJYLeJne7fArwxB9kJMiAetp1XuipCy%2FdAGoe7uPdivrxfIq7Ee0tffkgec4U%2FOn4BzLaG1vXi%2BUrInJOdAFNE9EQ836tq7VFk6%2BxjAc1hbT%2B2WjnwWH4DToDmmS1AC8h8wAojNYox1da%2B83sivlAANoNT%2F1aL1itfaV7BSwmp1m80ll4dTrJAdLKXXpbOiRDGLwdWmjpe3v3ocwJ7kfX5xcPvSfGEAQrWATwoCFU5kIZgRgCyutrg4zgkx6aMQKMpim22mmwFI0DA58nPKkQWT38TM4yTLb1a1%2F5abKgpQJgxBbIEgePgrVFQGIMBQHu%2FiRUAyHAKp4jmxJB1UN8vXGNo5cH%2B3vPIhl6WgWhK%2F92hbw7z%2BpTBTnMUD07k0Hru8kAQQ1fL%2FACfGpscoiyIgkokhgoQhGIHRoBd5HqKny6d3KHaN9EIEYlFxBBLvS8URO8tHwkkx%2BVgeFDQyA41ctzJJjAZaC2SS5gs0KpWVAaRi3GtVUOjfuB3CEkgpUP%2FnickrV69u20Y5mNzndy24A9yCWYxu8kPzTAxfUktOLp3cf3oG1ZJOxnc9oHZj0QC5T1AKEd76Es5veqCqZvAz3DvYDBcBr88ljmAUYgky6ffezwuwyAETUwDIkaYRg7eTcibG1PDXSwQbr79%2F4S5%2BwdPatICKZ4vwKwOmDWyS7rSgzZdx8huunj70AcEpyHxh3dvklSclGai4UADhXmF0C%2FMtOzXO8OEasuBMN8GaEATbN5Kfhc5hGAdaXzsarYXKr%2FgP6wyoc1%2Fmgo9QpRnErP%2FfKkeuqNzauHbX%2F5vwP0zuo8S47COsAAAAASUVORK5CYII%3D';
var img_autolock_on = document.createElement('img');
img_autolock_on.width = '50';
img_autolock_on.height = '50';
img_autolock_on.title = 'Try to lock your Equipment after adding to the list? src="' + img_add_items.src + '"';
img_autolock_on.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAJb0lEQVR42s1Zy28bxxnf94NLrsjlQyQl0bZk%2BZE0gtHWQYtGKdqmh150K9D8AUZOya1%2FRS9FeiiCAkVv7TmHIoc%2B4%2BaSoKjTurHhl2zaJEXxIXGX5D5I7uSbnV1yd7mmm6IuNJLWs998M%2FPN9%2Fh936y5mx%2F9kjp7jYO%2Fvde%2Fc6Zk%2Buenn3CkNzy9e0ZkSmev%2BNqi0FnSFQqM6L28RNHcqTt1Jo5pTczxzLEQmtE0ywoSL6cEWeIEnuGYBN96qfoCmSaWbRlDe9inZz2BO%2BXYyXTGO8OsY%2BanaU3KpHlJjEkWGDEqlzGddkzz026XvL5eKBRlOcNxc4bfHR7C84fVal4UwxMJ%2FScXLvinddHUnlj60DaOJLaeX3%2BypvprDvRCr3fO0msUKtM0w9MCzdBLRgzJ1TTNj4%2Fa4c2IfG%2BW16uyHKZ%2FcXry7VKJo%2BlkBwFVzaaOadqjHshUKd87etD5zQd9MnTwjlW5aLeOKGvEswLP8gzLcBFtIe%2BHtPFsRmT6frlckiRCPLasPx0dAf1gayvFsvPJjbH5UDcuq%2BpzpKKmztQZDZlpp1g5BJk%2B%2FKD%2F9k8LZOi3P%2BsevEMVz%2FONluqMsB1ZLhBmbkQUuDzYDl6%2BVy4XRXFOhP5b5fIfWi0YrSnKPESuFwqfdbuVsH09%2BnwieNXU0jPyUTrd%2B7UnU7HGkyHog2Tv%2FUJU5CPDyk%2BstCCLy0b0W8ey4KlFPQYa8SEY9cXy2nY63RiPb%2FX7%2B6VSor9PbYeaGaraWRETMGocGZgz5vL4bMH5HhhGiBpvMPoNTQsZC13L5X7faDwyDBAxTA%2FEMjlGVzPdVWJluu1jHTgDTSfiFukkwlh4KHhmWPa6poEpy5KE3S46HeJQ4Ibw7%2Fvvtog%2FxZYE%2BnvvV4DHnNrhTbmYVBU51TTHExctxxewXExn%2FH1Dsy4o6Wdj84vTASgSRVeDSGR55wWoiCiWddzJNKwKLljGp23IEojVt615GJLWc7DtcwIfhTi%2Fv5dd%2B6jVqsjSEtygr5J0FpqOa2tdkmH0z%2B3jH5TLeUHwAcK2%2FtI%2BJqM%2BZ9TUKsdfy%2BZuHnfimYzhHUd%2BoUSYh%2BGXtBVaKcUw%2B8XCzU7nj0et2OT9YhFGqUS5ICoV5dgyAYrDdJaT7HHWGOUOblgf%2FupkWaCDGzkYtZ0sm5LivoUQCktaFuUflasd2%2F6s3yOU61oeoCvNcSsCg6Xoq5k1ANgwnZfksZXvtM9tXRkf3KBikoFMG1fWntbPzZi8GNgBRY0YcQKFZZVU6nwqFQ3EBc%2BPN7eWZ%2BV4PkbnJJFPZcfDrXodlc4%2FeffnETgcjnL1%2BjlzssWns8CJVkTi%2F7axPC8qCkLr45FQf5oT%2BVNBHLPsdDbjHDtlT7Iuk%2BeVHPAAZ1IkvhyxGIbhRREKBI4TJlbGmljmCCLahRGaFVhZEqUUL4u45MJeS0Ui8WWWgBQUBpDsvHyn%2Fkc48X%2BrTv%2FLmw86SzJFIvF5vlW%2F%2BzfSqV15I0acU%2Bavc%2BZYI5zubGIO%2B73WfVyPVHbltMaw%2FCptPc%2BIU8ei3FAtIAS5xY2iVvBau%2BzfN%2Bt3PEGvvrHQgDvrN%2B9DWG7tfgsIeq%2FR1%2B%2Fnq5dohn2%2BWDE8DZpt6i5ytfXtfvsR9FleDMRww6aPvSZSxkZvqHeq21sUja8SKbXQePhYzuRTajHR5xe4tVyRj%2FSOd58sg1jQT1iCYIsbV%2FcyxRwNgMgJCiGyvAyvQJQzxRXaIiejoxaEWb18dZeiWa2822vezxbBjnJsV2wfF8W1tUQZdJvLPEDMre%2BsvL4uxaNlGjBTkNJAhyf0HXvM8lLirglL0wk1y1cFCHyh869pc8caDfCwJwe4KqxrGn0In6XqCLwZkSshfvfWcMllKiR3Wivr%2FRYKpROYpWoV5KKVcDpf158zOe1gtR%2Fe%2FoQKrrunveZasQZRnc55e8x3QJSar0T0hLNLSGeIkuQ13W2BXwgSvqE41giekrL2AjiFRod83h7hi0Z155ooZ4gO7LHRPLwFdFnVFLWod1vWcADrWmMddCMpuYjfgCBu6PoJYqVzMHHQa2plfOGGjpzRgLjsCTE4jYwPjR4omeMXxQYniOBSQJcyOTGllmqvnHafjQ4%2FVzL5cu3VlKpFgjkeP5Cz2WJld6h3H9%2FGkFbcvKSoNYYOisol%2FiWA8HqFysVC9WI4xKEU2P7a%2Fvw1ldHgd2HGeVlIUzSifc6oIlhOAGdSc5W5C4J9PABA2OSuCwzTiR39NEIHT5AOJeyUmKBgXYyc%2FnRE5iK8DZ4UKG5hSjwU9D2ZglihEYkdXwwiFsPSPpOL%2FAUR9ej2x8C6vffd5Z1mMwcgrfPsHo2YYm03rRagoPK1jZno0aAzHHTGeg%2FUA%2F6nrGHMfHL7JkTChVf3CVuv%2BcCdOvmNSwwLdz8GTkeDpWkW%2FhYAgeUCXsY%2FHX5lGKIPslMoYGe95kNRUnZe2wdqv%2F20Xb9brF2B9Yi2%2BsePZ5NJafMy7GObRuP%2BrXzFXitsgC5cxs9yg05D77W2Ln2TYTisLUJHiywYgVMcj54EYBoA74gZQHQGa3Sk94Yn3exuzcMAWtVKT%2B%2FWbeNEyZaA1RoNBsf1rcvXSQ6WUur2XuCRDGLwcWnT6J20H0GYk9yPD04OH%2FhPDCCIVrAJocPCrkwIMzywhZn2WIcRQSYfSBAryGCa8WiQAkvR0Dl1ccqTFpE9x09vJ9saNg%2F%2FnSvVBCkzv59jr8LJw0WBukIAEYTiYhU3FIpBF0AVj5Elaa%2BqQa7ebeDIddHJ0eNYlg5nQXictA6B%2F%2BS4vlbcxADhn5v2XH%2BSBBBU9HyeE%2BJdY5WFlxFJRJHAQiGMePGHFYoq1a6263fM4WkIYlByBeGtSscTOclH0SkZraqDwhYGwPGr5qtkW4AlbzRJLm%2BxfGUHUBr6RreZSudWfQBHKKlAdZMPLqdUvdNwzGE4u8lpP7sB3INYE8fkheRPD5xXS66fu9p%2BcgfmkkVW3nwSvswmNMhlipqH8NYqOLvp3aaS0WQ4t7ceKABeB8fPYBRgCDJp48E%2F8tUdAIiwgWVI0gjB3MLGxZW1PLV0g%2FXmP%2Fr8r4uPH3tvehHJFDd3AU4f%2F4tkt12lXMOXz2D%2B%2BvlXAE5J7gPjVndek5RsqOZCHoBz%2Beo24F%2B2tMnx4gqx4k60wJslBlg0o63D7%2FM0CrC%2BvRevhsmp5g30h1W46uaDztJNMYxb2sbXz9yt%2Bt69v5%2B1%2F%2Bb8EiujhpyA8jEjAAAAAElFTkSuQmCC';
var img_clear_itemlist = document.createElement('img');
img_clear_itemlist.width = '50';
img_clear_itemlist.height = '50';
img_clear_itemlist.title = 'Clear the itemlist src="' + img_add_items.src + '"';
img_clear_itemlist.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAHwklEQVR42s1ZW3PbRBTWSvJVkhMrdn0Jzb33tJRLS5k2KW8dHniAB%2F4afwUGGIZ2WqC0M6RtQnpzc09a20l8kS1b0i5HWluWZTlIgc5EsT2r1dndo%2B%2Bc852zG%2F7e998xJ%2B%2Fi4Xvl%2Bs0TpdOTh%2Fd52qofrp4QncTR8x20GOJrAIK%2FYY%2FgsiRgKpiMEO8ZiZ%2BVSNeI1o2PAQh5KlSpKBgUwZhOQTBJp0erVUUUYwNLkgC%2B5RsvDynQ5%2FnLzcLajqKohoE5js1m5C%2FvXMeg3YA8CeTyFu6%2BrDh4sSz69JOz65tvVbWt64Ygxr688xnPc23N8PdeRxvRt9VdV72mgrFCPAdtjDGgx3Po1eutkYTgZbIgRiQBfNF9hcMhsGMI9ALcGMQilmAzOEQhdjytqCodIxIfzoi8XB6cyfwFnVhEbUo7eQu%2FQUcMakQ%2FVifDJkKITmd9CUZBgm64Ecl%2Fm6UzvENZHZ08J%2FSxCgnKW2QIncJQ8PWuVmYb4yHmCsxbftjUy2Mh%2Bjg2hLFBwxAsyLEI7nRNH3Qv%2Fybhu%2BLHJC6IA1Vt1RWVkryqasDvuax8WFFSY4ljhSIJiBZyC%2BkGjkZCD%2F5YVpQmcCkApmnaDz8%2F%2BvabRbXVrtUbUn%2F%2BCYhWEGd0XpEwv7K6vrlVbDZbuq4DYJB%2FdvfK9x48u%2FX5%2FM5uWRSix%2Fct0yV8pwVn2nlXrCz%2FvQHZEGxnWEYEyJBmLD0t5LJj05PZYunQpPsgWpF%2BI%2FoZ0edbkPX%2BfPy8Wms0mm3L37uW1Y1WS%2F%2Fl7lL6m1FJFMDJbM3Ie4nETuXCaLoRi4Z%2F%2B2OlVKooddXQDYKJExIwaL3W%2BPGnR19%2FdVNBqF5rUmsGj0TfObHd1gUh%2BnTlzdr621pdbQNoJmv1XeBhGmNsbpfu%2F75y88YlcDIhHvVdQRAHy%2FtyLVMuFg%2Fvvdt%2FtrLWUFuargFpsCzrKQyWfbJcGM%2BPTZw%2BVSxVElLcf4YLXJ1CXbX0rIAt2oxGwkendmDU3x%2BtJpOSJMaPE4n%2Bi1NY7NpH56z0Qvy9CMMyCAofCAV%2FaBEnWn6dkUOsJMS6Owq%2FC%2Bm0WH0fdGrLkCBV%2BfELGxefNqpFpVps1MpSMheNj8QTaehc%2F%2Fse%2FE5eWHCNp%2F3OyyljP%2FXspJecmRFHs4jlvHMi9YNKcd0wtFT%2BHMi1m7Xdtb9kvS3J40MRtMhh8uLCIJXr7SbpUofWavLh2OAQkNl%2B9YhBHGjmsfOx0EJqo3LwbmN87lOQg45QVJo4v9DhNextalo4eLq%2F2qzBUzk7s79XgLYQig4O4UJRuC1uvRBGMt5FM8g1awcgBKKDyxyxvHfMIkY5LEJTSmb3dwvKQVGQ0n6DxKZTyB6wRzgsbhy90mDaxobZKjy5203gzPQlyzqtZr1aSuXPwG5Izs%2BVdl4m2w3TjqQzhOarFiBqkNT4GTt9ETdaQJGOAa7iD9Ntm3eFzkxfXnD1tNQ6jInEJbP%2BiUrQ1tQmH%2BqVX2%2BedRx%2FLDcDiA4rbAjwZELOVfd33djQNjaR6PXbaJHum%2FQbqFE7hDfh%2BIi5i4zEQaxeK0fFpD1kZn5B11obzx%2FquuZ8Wxedmncw7LC80241QoA27rOaiRZ2bHSJo4qmknYwQ4eu0ddbW3lgC1eLu8n0BMeFGNwJH54P56fmdwpPIhExnpC9CxuYMy7JgpislLblzDTLca1GdbuwBCCPpMbdvtVVlsGOQsqchUEEIroG8uOzVyMxiQqCD%2B2%2BXgJ%2Fi4uyCTtLD59QVJSFZHpva3Xq%2FA3AAvDrPxpBnd%2FM1DxE0NryAwAnMZbPTc1HxVEbocLTHhOCFZBZ3mOr%2F66N1syVRaVWhkYoHLVPEvhQBBxXqZZjQhJ2R4zR28onRnP1g%2F1qeVfOTHbUoGqxnKm4KWQ6O4qPpKbnb%2FXsAuMRgR772I3Y7k%2BY2Su3TYBsXzOF0Knxs%2FBxdEDxE5m7ukg33nMffkFnsnRAYL4zV29DGYRYUISDb48grOM8RJ3aVANZK1lvX1i%2BByXA9PxC37EgMkMJxCcu3sLWYUijUgRGADxAIJ0%2FI46mEMsXINywTR0Is4TezlymSHfijWEJfUk7C%2FbRqRmP1ovQlRAtTSw7UWLr%2BpDNWPRtkFIpAlNPnLuWnbgI%2BWTz5WOtpYzl52YvL9Ihpn4MgVv7qMKOGnMGOgvqbZCdBEE1QdZeAnXLJUJLT3ogQw9tOiZje9lob8M8EWZDEbjlwrGpS7cccdAJDsz293QCmfKLQTfopAuXgyAQcldeVmThwU2LYyXLHZmEnK3u75W2Xo6eOg3ePbgDAMQRdmwa6Fo9tkMW92leBGErRBzFJSY2zXiuRNuSnKuUd%2BhnLDcrjKRcytkHJ%2B4yg3hXofbZKfE4kKEMToaUiYSxH4cj8Ylz12v7ewdv18vbr%2BDzwdlPwlHBwXDEd7HJ9O98ho0ZNmN%2F6gR4kplJSc4evtuslncO9tYyU5eOc1jm3vkgxBx7Gls5PpzKz1ZL20ql1PeI%2BEaLcZ00kyMXHpyR9OK8tP0KEDp9%2FhokkLaqQGdm8kK%2Fx5DAJ83%2FdvhEK6pfe2nnyqJLXs5ORmLi5uqf0BYSY6CTMJL%2BX7YYQyWmLy96wkT7aRuxITGZFR1lk2tCp3CAYzd5%2FOMT9b87U60XLx4zJ%2Bz6B5ZW2TYC4w66AAAAAElFTkSuQmCC';
var img_clear_equiplist = document.createElement('img');
img_clear_equiplist.width = '50';
img_clear_equiplist.height = '50';
img_clear_equiplist.title = 'delete the Equiplist src="' + img_add_items.src + '"';
img_clear_equiplist.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAIlElEQVR42s1ZWXPbRhLG4CDAmwQp8ZBFnbRk61g7V21VLCX%2FMn8lrxvXpmqTdSWRk6xtSbQOXhJv8CYITBoYEAQhkIK0eTAEoQaDnumer4%2FpHrKvv%2F%2BO%2BvQuFv4Pv%2Fr6k5Lp5Kd%2Fs6TVab6bR4Tg72%2B9MPzNvwKRXQOthWRzpsZUp9MbjuSYGELILnevN%2Bz2Bn6%2F4PPyj5B6IhbhM49slml%2FMOq0%2B7W6lFld5jg2X6w8WVmyEkhSj2Fon48%2FeZsLBL3RcCASCfACx9D0vbxmbGsxXsiCQfmmMRyO1teSPp%2FQaHY%2Bf%2Fn05PdcvlDx%2B71Ahmg0HMgMy2S3V9%2F88v7wYMvr9bx%2Ff1Us1UQxuLwUgVE0jbBLk9eEWkSLFUUt3dRlWQGEopHAcCi3O71Go316lt%2FJPmk027WaBDQsyywvR6KR4Nl5vtXqxGOgX%2Bqzl1lQ6OXlzXmuuBQPp1Oxe2xmRonzaTFGxXI9EgokE6LU7uXzVYyxx8OtrSagfXZe3FhLphIx6BmN5NtK85dfzwXek3mSUBWq2ejCzfPcTjbTkrr%2F%2BfnPVDLmxpZZwzUWajEc8l8XKgzDdLp9D8eCjYMq4bmSjkvtbqlcz12UVFWlador8ABJKOgH8MZjBYZAPywG2h9Or0G%2Bez2MiGIoEc83QzCaoF8YDUeNpgQy9Xp9YE%2BcDyQTeM4rcKRNJoFHv983LRvEAs9oSZ3rwu0XL59qnDB2r8SFwYCi0knx%2FGMJLEnGmKGRLMP6FRIabGxo3eOwRqZd0FAV9fy8AC4Jtxs3nCgRLwwQui9GwgFwe%2FBE4FSpNqGdTsVlWUb6ZVkCzKNoMjF0%2FrYKn8RoCIMepd7%2B3jrYHwH0PhBcxC1DfIbeza5%2BvCgrqrq%2BunyVr4yGINXYqj6zoWIVrP7mpiFGg6D0wWCU3UonliI0MjBwHbfmU5pYBPzC3rMMUVOnOxgMR4oCwGgEticIB1uWIHi2NlLgASR2AH6uo6lh8tjlBkTTaKIrDM4I9mWCZNqZAZh2KTSDWJaGezYG4XtNmXWxAodvwBOC6gKxACENSie%2Fc40Wdb%2FJ3xELQ%2FCUDbHsXEEUMEFwQT30zLFqF56I8QOTCGAKOrSavPWpBQUV62g5irVYhzNKnB9Onb5AKBoO5tmWRqCMVa2hYu1%2BSL7l1hMXoAViEYHQLBAkloL3OQZE9xnEogVgJ7ggMo1lBWzeEGsi2NTkaZrRHdBhaky58kT8mOwUy8pYF0szeatYZEKaVnmVe0xK7TrKO3giOJmG1kgx92ybWFpc9WLnTM69J1IPC1s6WrJiRnmrWLoHGJ1aeYIfrAcrWg%2BTK%2BT3LsdCI1mzLchyrBSwyRBrg%2ByU97CPMRH3W7Xt2t5Iwf0AY3mMWLPxtCdVulKl164FoynBF%2FaFtMLm8n%2Bv4bn27Mg2nvRbLyuN%2BdWxk1xiYjMQSSKacd4TiXm0KpeKIsfTO0A36rdLF7%2BK41FQXJmLhapzfX50F53xqE%2B%2BwiUP%2B6zHe3cI0BTO%2FkshBiRzqHx0tNCg12rcXq1sfwF00MEJwczukRHXVGeFqCqe5zSDfhu%2BisnNejkHbT8n3B3CcAK8VvIf%2FOGEc9IMdP12A4iA9C6bBeydnQRR3WYFmsFosl7KdRsVf3DJ%2FbEBOwEDQ%2FHZrFwt5nTXO1VFa%2BVOfphkZNTGnq6dYb8jVePpLBS1Ynq7WjyNjnqaHrExBOvrHAKiCo6vZPFk68R2tGBDsQywRVOVlG2OaGFq4%2BDI1jMcdGAM7wvCGy8EoS0P%2BiznNUk%2B%2Fm4Yfiy1CYjOS2y0MBgSU1K9ZMeGtFUNiWm%2FiRaerGRWQb12E1bCsDzMzPE%2BIOu0a0Igag7Z3D8ay8Or9z%2BNx7J1tbZwqr3BsGatOBr2OEBbndGahpZqKXSxZVsilKYzQ8dYJsu7%2BPNHk1iqlKJLGYbhwE4JR5b1pNf3i7kTng%2F4QqJzYgNz%2BoKiPxBtVQtiYoNmmGFPKuR%2BA5DD8RW7bU2EpVRLuqbNAvkZeHQb6Fe2XvDeICEEGyqd%2Fwb25guIGuy0vo9C9RsQ%2FdGlcv7d%2Bu4%2FAQvAb%2FZoBBnPxPo%2BeNDFHz8COKFYOrW%2BLwQiJkK5t9NICFrQtj8dw9zbH0y0Ng%2BPu%2B0aNDiPYJ4ksBwPhtuVal5%2FVEumlWkpH4qkOo26VCuJiTVDDCIW1CdGiacZO%2FKF4xv7r6Z6wVrKBT3msSA2zR9TW4ffaACZtqYRoeWVp3BbOiDP4bdfHJPSdfsf35KZdBkQqC%2F74hvIshGkaIiB%2F2mAMHZ72uCpw2CsPvfHa5pCG%2FtHM8eWSHMlIM88fwUeDK%2B9VgUiAuABBEvpbCASRzSbA3dTzdCBVBqT180DgrThbxSNySLNXXAmnJKykySfxpmpjhboiQS2iQ2ZEYusBnVbFYjUmZ0vk5nnsJ9cn76Rh91Yenvr4JgM0eSjMLxS02Lf8BojLyJP7BAgiCRIP5dEk4Iak9IT0chM9wyV0dPdqHylnQjTHA%2BvjMe7vvfK4geGc6j0bI%2FhyCS%2BKKT2NHNuS4BAyJ5d6Z6l3i2NLJxIYRMSk1K9XM2fRpZXwbrvJmuAOFItRQPhNY12SI99slOAMAXCluMHraKy79JWTqQdFFOtWpHcsdSWPxy3CUcQns6BbbzwvLNT7FA9TxJz52SOrFz%2F4OF9mZ2v2vVy4%2BayVjiD%2B8nTzz2C31oquU0JMTVb%2BcwbM2%2FG2a0T4Ikm1oJisnl7LdWKjfJFYn3v76h80KN%2BrZgVF%2FaTeHpLqha6rerMJ%2BwaLcp20owXMnaojqd%2BXi2cAUKru1%2FCBjIadKEzsfZs1mKw64rafnaKF2g7d%2FKv6bZzeGyjF5NrvDdw%2Fe5naPtDMZDJH176f38hoxae2GwcHDvCRPpJG9FcIJoMWNIm24RWYjdWYaAlrnz2yf2e%2BOHDm0%2FtZ86%2FAJ%2FTm8P9xUfgAAAAAElFTkSuQmCC';
var img_copy_equiplist = document.createElement('img');
img_copy_equiplist.width = '50';
img_copy_equiplist.height = '50';
img_copy_equiplist.title = 'Copy the Equiplist to the Clipboard src="' + img_add_items.src + '"';
img_copy_equiplist.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAALDElEQVR42s1ZWXPbyBEGQPC%2BD%2FEUSVG3pbVdPrPJ2pt9yUN%2BYf5KqvKQSjm3412vb%2BuWeEkiKfGmeACTbzAACICk1%2BXkwRTEGgxmenq%2B7v66BxSf%2FfEP3Nf3EfF%2F5%2FF3X5VOr%2F79N5G1us0PPMf%2Fv%2BQS%2FC34yDLh6WfhXF9oW0VrkRBCuG63PxyNo5HArKR%2Bf9jr33i9Lo%2Fb%2BZnqQkilWl%2FOLImibTKZLNqTppaiAjGsO7gZdTuDxlU7l43b7WKpUoMs49x2u2%2BzCR6P89XrI5%2FfHQ76QiGf02W3CYK6Ieg9GEkTSbEBDyUcDrvb7RRtQqfTR9doNIZyEKLgR2cE%2FG6TbzEVeQ2D84vr4XC0kk96PK7rZvfBvc1Xb45K5ZrX68YYXuCHN2ObaNtYz7746eOd22tut%2BPjx7NKtRGJ%2BONLIczCMpIkdzoD6DHoD7u9AZZHT7c7yKRj1fMr6ORWMAYaoaDP53PX6q1u7yaVDBvUIvSSJKl6cTUeS0AoHPINh%2BNOt3993dk%2FKG1tLF83O41GG6KxxXg8FA75Dw5LrVY3FoV9ufv3NmDQ09OLw6PKUiyYSkaJTAHb3sweHFbq9dZEknq9G0HgR6PJZCw1m93BYOR02t0uZzYTD4d9EE6RJhYjcqRyfhUK%2BJKJSLvTL5Xq2Adgz2cTaEN0IZ9MJaLowUYva82fXh66nI7cckKWuOZ1DxfW2NrItdq9fz1%2Fl0pG4PWSNGm2OtGoLxhc1d0cJlvJx6Ef5KONhmAjvX5flgEL0d1cVAOHcMGAt1iuwdrA3GEXIQamxDdgb3d6QP7opCrLsiAI2CIgCfi9AG8ykTAF%2FdgM2nv7RehHhctQSxZ4rAqD2yCHKB89dPQ27ZU59lRVRTciuvxe12g4um62oVO%2FP8DyTAImuyjadtYmijsrQdorli7hQLlcwud1ITJa7W6xfPnw3iZDArqiQUEgHHNq5ZvoYc6EsU5sCSsyzYxGpAPTycjhcRWeNCbEJvDjMQZL%2Bp6MkQgR%2BwdlAIMILRYvO73Baj7ZbHURkrjYeKDFJilz2X54w2rTTm0wMUUivVX0RlAgZBCJWLVWb6KdTsXG4zFvZkBlvhQM%2Bvb2S6lk7NGD7Va7f3JSeff%2BtFBIUV0UuMAO%2BNYo1MqPDCdmDjQxWJaYLc28RW9swvZG9vjkXJLllWz8rFQbDaHVxGg%2BvWEXEfPS0XEVJg4G3A%2Fvb%2B3eyl%2FWm%2F958RHrrRZS6krqlvm5dM08jOeEyXhCqFMSM29pE%2BElu7dyzEwgkpvhaMY51G9ITCUi5fPG9kYGy48kGvDrq5m1QhqMcHx6flq8CAX9oBsdrXma0WDEAIn64tSMogYVMfgNr00hCEb4lw7SNHYUAX6%2F%2B%2BpdC9CLosDmKsHLgVcDAfdSNIjQPjwug5CxWwtk%2BvZgbZ63YfMytThR7WawIZlJqzJI9RNqQRTIAjnRLtrYZAxmU26Gk1a3f3J6jjjArCe%2F%2Fob5kTl0GGsACBqJhHBmtDT7z2Z7kOdYVWuOW2CDSBcgPHA6YhaicfUHQ9D9z6%2BP3u2dBf0eZkTFQjNCNMyAF9yAJlCjb2mbn1OEwIZGlzd%2B41Ortx%2Fe35QmkCljGBLox73iq7fHF5dXoigGfJ7vvt3d2V7JLS%2FJMmfkUiOdKpgBZhbBKhOJ00EzmmG14c0i31L2JAjxaLjb7l%2FUm6%2FfHn3YKyEfhMP%2Bna18NOoHd%2F%2F%2Bd4%2BJYdOW3eu8D2%2BmnmXweaNvzUdLsToxEhcbC6fZXFv%2B%2BfXh%2B4%2BncG08jkWDoOJMKpbPxVEUvP1whkmyPN8UxnUVx2fsaYlE%2FM3AhZhFtocDq2oZ0hk%2BqDX%2B8fz98WkVNLGSiyN1rq%2Bms8txuD%2BkoaBQeEvNQiyxzNaSSifMQuAJavmgG5EsrE7JWJooalHHNKqFb%2BQAJEFUHL96uH17ZwVqWUpRjLIrnKtoxc8lCFZEoFjSLTjL8jNbkTmK1kjSc7ZJLUFYL6SRrx7c3UBBYckslJJQVrS7ChuZXHMGLVSWiEQ1%2BZgicW5Fzyyls7ylJtE76dmEzCnbUUX%2B6c8%2FqtmQzKEY%2FRGAR1WM4lFXRjS4sVV2wOuORwOjMfUtgTe5HgQxb0N16nSIs37gdjoiIT9qUZYz5qKlcw3aKCq31pa5WTqd9a31QgrX5x3B5kx%2FfG%2Fziw9yIreYT%2FvtWq9d63ca%2FnDK5Ql6Aksan43R2ajuox1NbXj8UcFmZ49O3z8zSsBTXyiJ8cW9f4ZiueBSXn%2FUqp0262fZzW%2F1uaZaxlr9GKZJ0jiW3kLZOxp0qicvI5ORP5IhsgSFHE5vbus3dFi9VC%2FvxzJ0GIsSfPI7T%2BmRC7OOX0IyNFta3r08e%2BvyRhxuP3t0fXkWz%2B3ygn0uD0yLZmMk3vRbmJZZf8jxNhrnLn9u%2BynTvt%2B56rUawbU8HqEHEF5dnLoDMa%2BCpSwT3W3tLh9ua6U9bzDh8oahk6LKDh6hgVt0zrGSpWg2jsBmINFmd81OG3SbeCQ6PGrIOOiZc9hreQNLJtG8daVwPF8%2B%2FBFeQd2j08is3%2F%2BFVyOU5FGpCVNJzdrZnE0oz9tXVSOb0PJYIs1aJZxYUxID0Y9SN70WbuPZbfUw4%2FSEE4WLk%2FeKz62Kdg87S84NHgNahkGyRKY95lw4XXguNvAtgTt%2B%2FQzfaMfz2xRFbawvGG9UjpT3H%2FFffpFkOcFRxgqn2tdV06radyCSooAZ0eJIIJRiNqVKy9zqN09NvsEGg3YFke0KjUUJ3EKnplEuf7hZr4yGfbvDbXERpzsgy5XhoOtwebHS6KYHPdy%2BoCmY52QyCh5VUMlFVp6bGT9DEErL44t4Q9FWrRRJrQqCbTjolA9eRtOrwWjG7Y94A1EAFkkWIK7dqOLW5QtrESjzRJibyjRrCJxW7LIMxtH0IUBdm%2BiYjIfmVyO6mXg1wcWzt3qt2vGbv2JKMJJJF%2B64vDQfC7xtKb3RazdO3v1d4PhIes0bz0F1rSTgiCDTKknbPtH9UKmdiMJsRJ6mHerBPDtaSqoaTC2BviJQBsmKapqK3kBs9fb3Jq9n%2B7aJvlACF4%2FVBTqBrqwAsHb3t5a3ijyndihS%2BfW7P%2BgCWQ9gQA0BbVGk2ngb%2FqcEoRYCgro7qqW20tHbZ1i6YPBittLxG%2FRzuZ0nMhXJ9Vu1brsOFDEAcPpCMfj10ZtnnKyd8zheFgi7Xb39lFdzPzv6aO9FrKdqPR6VjbCVmP2pm9LiiRKbsQRSSITthoe5wea5rUfJ3M5kNCjuvxgPe9H0%2Btrt79kUqh9HcGsoVYjucqoUnjelao0gmCYUWg132mYHU16rT6akJUwj6vzsA%2B2wO3Frc7hXdp9YyziZk4WZwo7XKipZYsdS%2FTwimopqSwgpZ0d5lkAMKynuCDJLtq%2FO66X9UDwr2p0zKY4izsvqoUGPRDqX1xWEPcbzCGJKkdOYpjNnmMa4Emv7I6lWo8KuaGrNG4xZlGMIT2UQy1pkfgUx91TNGWr%2BOZzMdq48cDg9ua3Hnavz64vTRvkA1%2FLmA8q3hlMU94nDzNwKQh28aM4iieZEC3jCibw%2FkmxeFtuNyvX5SWJl90t%2BarCefPgv%2BhXDrK4oOmLptXa93GvVTY%2FIZ6PFmd80L%2FxBZJFEMo3zevkACGW3HyGH0izJkUT%2BluXtH%2FeJ30sWq%2FWJOQrxvPqLfr9653vL%2BEgy73T7ih%2Beo40UCZ28waX%2F9RcyjnzqNUGB5Z8ZmFg%2Fa6Mk94WTuBYdhYyDP8crVLQimftf3e%2BJe3svvrafOf8LvQ6x2A8Etg0AAAAASUVORK5CYII%3D';
var img_copy_itemlist = document.createElement('img');
img_copy_itemlist.width = '50';
img_copy_itemlist.height = '50';
img_copy_itemlist.title = 'Copy the Itemlist to the Clipboard src="' + img_add_items.src + '"';
img_copy_itemlist.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAKnklEQVR42s1ZaXPbxhkGQPAEb1IUD4nUZUm2bKe5XLex3X7L5Gs%2F9K%2F1r7TT6WRaN07iI%2FEl2ZZs3aIOkjLvG9g%2Bu0uAAAjFdtvJmENiFnu8%2B7z3u0v57l%2F%2FInx8Hxm%2F6ze%2B%2BqgwPb3%2FncxbzerLX2dLTSMi%2FVw4IRhdHUlLIL%2BSGACneFyeyU3Jsms4HDpPIroS2cv%2FH1q701eHqkAFIwKEx%2BP2%2B72yS2o02ujq9wcA53JJTH50%2F3DIb7EtDlESJRtntVpLI4RgHZ%2BjkampaL3eCgb9Fr0QbRKTqmqNRgc4Ou1es9XB9uhpNju5bPL45ByYMMSkQaKRIAiWyrVmq5tJx0ywCP0S0SIwLHi1dbC9W2y1uqAIuunp%2BDdf3wAIYtO6k6AJ42V1efb1m2K5XBuqKuhIktjvD4cDtVptdjp9r9ft93lnc6lYLFip1F2SxJGYlEjfLHYIEl98vrx3cNrtgpKqBP3ffP1biL0%2FUJ3Nwd5FVHVYrTUSiWAksmCYOUQ%2FV0iBOFcDGpKLtNptTVNVlRikZE6CwbRQbza6kK1bdjFaGkZll%2Fj6zWEkrNgN0dEsNcDSJBG7umBCAEXYx3BCo017NYGP6lB0JbIui7Rgoeh0Axc4EkRwhcVoBBX%2FcKi92S42mp2lhWwkohAnd4EkwAyGqBCIwI2aPYnhYwzqqBMKkSSJIzMr0f6BMdEnlbLIdco7ocf1F3ugkohHXrzah%2FEuzmeymYRdiRSQxjEwKCJ%2FmicYnfpkYvFEwjU4yTRjhcFnP6Jxoecyie%2Fvr08lw7%2B5vgjnKhbL2zvFcEhZvpTzeT26yWuIDnjqIdSubS4n7vNoYrKmcl3a4pYTLA6ZN0R9WjQc8MjyyfG5LLkUxXdlJd%2FrD4rHlfsPXmGntcuFeCykMVh0Jy4Yp7jOiLGgL0jDwZB43QYGeRxNicMyyq3uD2hruqSXL8Hzj3K5JOxMHfag2YX5zPxcBrFge%2Ff02fouookx2ZCWEzLqjJigUlscq1Eeg7JKC%2By6JDd45m4IDbqwXtXAFkDMZBIbL%2Fa0oSYHJM5QrzfA3vF4KBpVypXa3v7p%2FmHp0lI24PcS4iAyww%2BwhSi64BnaSAbEIi0bQxBtt4sA3eVBvtsdIL5n0vFqrZVMhNETjSiK4ne7XZxHOAGQ4dntDSCzw6MKkD36eevW764SYohBtLotjxrwJ%2BqJZjsy58TxAliFz%2Bu%2B9%2BN6q9XBAvAxGAz%2B9o%2BHf%2F7TnW6v32i2Q0F%2FLBoMBX1gEhMQxPFst3uA8mxjZ3f%2FFK80vUDI1gAxabrohLygB5pAzbY1imQmPrweeePl3sFhqdPpIctqLDYen1Tu3nsO7mHdZ6VqaiqKTshnMFDfVhuvNg%2Bfbuycnp0jn8xkp6aSEXjlVzev8gDGw6m5oDG9YgjC1ri0iFWJhOjhFDZ4Vqqtv9hHFoPuVKZEiEwcqE%2BebWfSiflCemfvBPUJcvDJyfmT59uvtg6h4lgsdGWlkMsmluazSHMvNw%2BNoGqKVRZ75%2BCwI9WIaaY8GR%2BQ9R48elVvtFGZMHvXNUutZ%2Fjtv570bg4TscjjJ2%2BerG%2Fv7p2Cm2Qisrw0g3g2l5%2BeTtEqoNXucn4cI4%2FZ8HWXJ%2Bb8p3sioVlsAIPweb7%2FcQM222p2WTwkZhJQaLPR%2Fu7eMwTPhz9vIkHN56ez6QSy0OxMiifQERtEYHGLcIHxxDJZlbJO2BZRh9qofDCUyDFCEoiN1GD3ThvNLrKKqmmTVdRAUM%2FfNmu19q2b1MXWVguTmcewGKRUWmdRVKJjgOBFBCKOoUF7lPcHPCdn5883dttw8eEA6QvEHCsWSAWl0rW1ufxsCuWbo5Ko52lavd5k0UiYNHmz4aPQgMPy5GPxRBaZ%2BjBejYVNI7VdVJKDvx8evoSNh4IBZ1iiiDjy929%2FGmXDyeig96CBCgDBBc5kgJFNWVn88tMVJkvyHocF5rOCCMkN%2Bw6HBb%2FXE4%2BGUIvy0sNRWryHbwdBrCzOCJPhFOYa9Hk%2B9Bwx7A0uGrrx6fIHEiOCzRMdJdSul1r1UrtRCcUyvkAkEJ4apUt1gM7K8RbaicylQCghudx8aO%2FFXTMFjAajacw%2F2PwhmsxHpgrGUK20Vy3vzy7fNNaaY8aFORHLVHWQzK6g7O13Gse7j%2BPDfiieQzYBII9Xya%2F8nk4rH5aPtpI5Oo2VWXRt4cptGv%2BwaucxKAPZ1Mza2f66T4l7%2FCE%2B9PZsP5VfEyW3o8mYimZT6dht17Ast%2FSFILqon%2FtC%2BdXbHH27cd6qVSKLBQyhByI8P93zh5MKk6WmEcNs3b4gXkuHm0pk2qfEgIlBuYIhNPCKTuJY5JmLZvMMMAOKLrdvclmnWcWQ7AmMXMZDz4y9Vk3RVexwjGI0YqnC0ZufYBXUPBqV3NJn77gaoUEelZo0plQt7Tswwcbr58fm%2BpcWYiqploqx6UV23iHGUarbquE1Nbs6Osx4A7Hp%2BdPdF8zmFmR3wJxCbOlIth04daMm4x7RwvR4Y0fZaDRs7Dy7iyfaqcIqlaI%2BNxhJVYrb7P4j9e6LJNsJDp9wLFN%2Fe2zZVX%2BG4xkqMLO0BBKOZrhOKWhNWLh622IbZBT4RUnmXKFxUXS0hVPLLF8oVi0X%2B7222%2BO3mYjXH9a0Yq%2FT9PgU7NTvtoDDH4xYnNl%2BRB8JkgLkeXbyACxOeqI5QLBWIBhXoola6TCeWZAkV6%2FTOHr9OJFdiCRy%2FlBcCScgsHh6HuTqlWO8%2BoIx3QM1kUiOR21dG5KRJViIpzmdduLoIHuGg571asRQEy1vaV9q9nKrVtp5%2Fm8sicRz2fnrPgUiESTRNZW91KpXdjfuIfnEs4tKKg%2FoekkgEEljJ3RxHLn1UoewmwdutUbaoRYsEu47IxgclkSvCNgkjUHTISrh5MK1Oxar53y75GB0Gl8Ru0t0ARmddIXFT%2F4gWmeLwqiDURWXPvmjQVAcHZABkd0kgDnRhd84QLAzJN2Dc0dR6jttr9%2FF1vMmK%2BY77TxHv5C%2FcktjlxPtWqlZL0OKmABxBqNJ2PX287uCXrOBiCYR%2Frpw7TbbYuRvgqTfi9hP1YY%2FMkb4Tlz%2F1Exp8UQD22gRMYII50aEuhHN8ytfpvNXhv3OwdajQa%2BVyC4tXrvDl1B8AsGrcXWgPxkFTkW3H1uA4EioaHW50zYvBUW9PhkHLWnsUSf79EZYcnvx6vL459ZujZ2bjNxQk6w9I1Vy81L5gZno4pItRbXNhah2R0qwBBDTTswcEczS9fOT8uFWNDUru72Tl1%2FUQzX90GDUa9TYDYDQx8ApQIxDpKnY0xwijXkn3g7FM7VKkX8TmUUlkrSBs1%2FsEdtexLmC4FcEjvnJODM5F21swOMN5FduNM5P3p7uVY5e4zuz%2FDmNt6bLwfe9zyaC5eRz4ZqLKFoTLcQTmy6E4unq2UG9Unx7sjs9t%2FZfXJtP3G%2F9wl8L7yRjgJM9yexivXzUqpUtQ%2BS9pSXYbprJu06%2BzoDos3z0GhKaXf0SOZRmSYFMFy7bbv%2BED%2Fm%2FRH7XjfGof%2FvpP433het3bPPj6YLXHzx4%2BQBtpEhgUiJT%2F%2Bs%2FZMIvnsHmef6ZEBPv522U5MFYGt8LdGuZ%2FD5WMZJWPPfZR%2Fd%2F4ubmo4%2Ftb87%2FANEHXchH0Wh4AAAAAElFTkSuQmCC';
var img_iconplace_center = document.createElement('img');
img_iconplace_center.width = '50';
img_iconplace_center.height = '50';
img_iconplace_center.title = 'Iconplacement: center src="' + img_add_items.src + '"';
img_iconplace_center.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAH1ElEQVR42s1ZWVMTWRTu20ln6yykk0BCQJawC1OogFWjWNa8zS%2BcnzLzNA8yzoOMguiUioCsEUkCZA%2FE9J1z7%2B3l9hJGLKqkwab7rud855zvntN6V%2F74Tbh9lxf%2B%2FbT06FbJtPHiuZc91c7f3xKZwj1TGloCvk1YYd2I9IW8%2Ffn76ncucxPXL78uWXzLXBsJi%2FMT15TqZsRaXf%2BIbS5PhPruxRG6GayQLoPFiOwN9rjuNhjfsFsZaGH6wyRGiOuFF9gVdZ1Nx94UWoity0TRjIgxhxYvmeiyK%2BLkQgZa36CD%2Bc5sYo6naGDsNKKOFi8Usj0bO2ETLRF9uw4WH7KNtzqPV3MPKqmKMRMZUz0IEsZoFSMR8Qppi6Fr6KBZCmGbqyPRg3Q3xU7eEkWR7gMQiNjcQ%2FthUnD2IH9V9Ro6YIFbVR%2FMQDGgsfIWbVHVjtrpOCkSGw6HmEOYwiF66XGD6eZIEK0%2BpauFeIX0iKH%2BTC4%2Bpr2GwHQP0T1KRLT6apO3CNtp8d6Ea%2FvC%2FPjqmvt4rGKr%2BTEDW8WqpgrGdrS60iOdSQ4ADq3V9U3zYLC2M3RcxyMr0qRT1CjAgRYnlztv6WsxDOACvfngukY753Cm8%2BGOoPsAH4kGbbnzFtI8CPERiAyvcLRrD27t7tagmmNOVsOI2PQBV97iAtBCQm7ttoC1t7uTPMLdIlFAgitvAW%2BQVxE9XJiyKunervW5tn%2Fb6apHIub50c5b7Hrx6oML%2BG7tiJrepd1i2G4ZBOZYXp%2BmAj8iDS0tiODmQQ8fuOvt2g7Tl%2B5PfmcW4WR5kGHt3%2B0fktcgFvW2SNRUX5z%2B8ak8H4m3q8pw0ultEkvn0713K3xfIjMe7kmzZ9Y1NL3suoox0TmgUSnUK4VGtRSJZwKhWCiacm5kmWg7Ew2qYyMum9XPu%2Bu0nkxf7fJfL5vknKVX%2B6Lp9QWN3nJhr9NpJzKTyayHLPhpXUlfRpQsGz80s9wtdPikGbHRbIQUiMBr8eijHCNi8V02D201q6qKlfTo6fEOPMtSgHW16uXTL3sD4wvAYzBMCoTvTD9mU1QV86HWvXx1G82%2FXrFQ%2FbwA90g8DWLBswxmoplZq35ONgDwsNvx9b%2B%2BRUie5pN8B%2BgK99TglKkEcqkc2heN2nkxmR2HI0pJjxU%2Ff4xfNJgopyd7dk30glTtkD87G8%2BMnpHZZTc6JWbCttG9g1OhcFJDS0s%2F7WhdNGvQ7g9G4JncVaF92fRKQZpQC4J4FfsYonRDi1zG8U5G89iwZ7aH0a7vBFiBxB6vn3iPPwRFSq1cCshxGBBW0pXTz9g4cLl0RMVdXcJGp%2BTNMlq1WI2gpZqFrmYLtQ0bQ%2Fvuu79JsSEScKBF6R0SvVIoosAzgCdJQX0JjHS3tUQQtrudgyC0CdZqwm0m8b9aFTbLjs37gmHNpq1qfvt1q1EFmUJhRY4kyoUjJT0iip7LVu1wey3RNxpLZpkCSBSxVp%2BJsK%2FH6%2FvavrB%2BGjEQhgmWjJYlXqwIFnbemDQ4Orvcqp0Bhl7Jb2gmSQFoqVdLIBa09d2ZqZVPPr39C55jSjYzPBsI9RCP6ahQzmy%2FfkbnQc7iGZ19BK5tiEHEguKRJYcjM4%2FMao5LbDDCI7OPkVmva%2B6vpHNKfw6xKRRXj%2BQbm3vKIxrp6YNf07XormPzT7lPGODWIpATgOdBHlbJenU9aYYmCp%2FerIAP5GafGDvB0VEvFxuVUlTJBOSYHEuxpFTttKHxeH8T1E0NToSjCdHrYwLvbKzA6v25e76AbGCcm3uCqfz1cqF2XmjWTqERmAVw9Uh%2BFhlGVWGhU4NRWTIIQp0V9jtf28nshDjgubyoHW6tJTIXYA4odAsHm4FAeHT2Z1iuXDgs5rd7ByagbGfwk%2B%2BxZ8eJ%2FjGym6gV1aA7yFQ4fH9ncskjzcCpdbD5MqqkkwOTAmIplwtB0PxbZN87yLqtRqV8sj84sQDIwiSgJdCYjQdd67WSkh4CEWCtULy39OEfOZYELI34Py%2Flw%2FG0zy8LehTBzOODd%2FAqEkIRPL7g8OxjVs0zLLAOF0cQVBTVdAChUT2DBWEyth2HWGjWyjBUAhtRdCV6Djar53I0aYSzHE1USnkKmEkH0Z40NBbzWz2pQS8YHZmZvIrbbgShc5Ggf6U4O9knR7SD9OC9XDoSrIQI9i9TIQwVoolsfmcD8hmuiBciSgaGlYtH8JvI5ABgGsjYNd%2FSSzBL0UtDt1uCiAX%2BCxRjbu4bC7lDdiWHlUoxz3f5%2FCFwrOrp8dmXvdLRFvwOTDwgkeHMIDAWbCtqgMczALirXK5d0US%2FbVgslc1vb9iRkPzxvqGIkj4%2FOYBFzo53%2B4bvdq98HCVvKKrANHJ6cJkdu4LhGHRdtuqgPckZW3VYIShHBcxhhjEBLKLUKyVnsgaOlezPVYpHwD5Ozb32r3bcuqFwHBYtnxwqGXJ6XDSqR0AQ%2FTk4PYK0CwykZIbJOVjKy1ElGIlbvmLTeyzVX68Ujdfi0RYMHpxaBFWJMgLuG5ru4luWHIq%2FC33DM8A0u%2FT0ABv15%2BYCcg9hEFFMDY7Xy6Xdt89JWjYwIaeHREpatgvGQ0hqgAkCcIo%2FGD54v8pCFWRinNKtxNBzII2ZeFOmRuZSzqQbiRLQEvw6u2yL9A7dNV6vmOVSYijZ%2B7euINvcfHnb%2FpvzP%2F2isQY%2BRQIGAAAAAElFTkSuQmCC';
var img_iconplace_left_b = document.createElement('img');
img_iconplace_left_b.width = '50';
img_iconplace_left_b.height = '50';
img_iconplace_left_b.title = 'Iconplacement:left bottom src="' + img_add_items.src + '"';
img_iconplace_left_b.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAHwElEQVR42s1ZWVPbSBDWyJYv%2BcCyDT4gBswd2CIJkKrNUal921%2B4P2X3aR%2FCZh%2FC5iKpSkKAcDoE2%2BDbBgfN9sxI8ugwgRRVsSBC0%2Brp6f6mpw%2FFvfrXH0L%2FXW7498vKg77Saf35Mzd7qpc%2F9IlOwYEZDS0B9xNWWN9EOiCjv%2F9c%2B0ExN3H99vuKybe6spGwvDh1Ta1uRq2115%2BwxeWJUj8sHKGbwQrpOpg2kY1gjesug%2FENu5WBFqY%2FTGOEuLcwgFVRz9mU96bQQkwuU0XbRIw5tHjNRIdVEacXMtC6gg3dMduTLj9FA2P7Jupo8Uohy7OxEu6iJaKr22DyIQu%2F2XncmntQTVWMmcqY2kGQMLhVjETEG6QJQ9ewQdsphC2ujkQX0t0U2%2BOWKIp0HYBAxN01tB%2BmBbcf5K%2BqXsMGLHBSdWYGigGNOW5RiqpeqLAO0lYS2EogitqHuu6hHxGMBFG4ug32AaZciF78mXYbClNBsARae7nBg8%2FWWb4z5UhfWpxce%2BXMb7cBIxNaDEwGgYpVDViMrWgZp4PEegMtEoI3ujnATGfYOPNz8PG71kWLIoRELQTY0OL10pFnGMCl2a2fo%2BvRuaBAYcHITNFzzAWLUpaTaIQt%2FeKkGhRHuvbgRLdeIvXFXplH9y1s3kRs5RNs8caJbvFrEx0L1uiKLgnyCPc6icQNRMTu95dmzAKd6cYsR7qDNvhK2VU%2FiWbu5y8%2FOq5hpyMaqR3o%2FD5iUxr5XgWBuSjPucX9ezOOEx3pgPzK3envFy3XrEhMJxGRA%2FXxp9Q1iGV6y0nU8Fie%2FfmlPH8S%2B6vLcAinfaSWHk9336%2Fy72KpyeBAkj2zV9nZR45SjIl2hma10KgWmrVSKJryBSKBcMK%2BkGmiJScaJ5pxnLdqX3Ze034yebnLfztvkTxLr85Zy%2B3xG28rhd2Li04sNR3PuIjAz6%2BV5HlIyTD%2B7NyjXkeHL5oR42Ycki8Ew%2BLhJzlC1OJfWTy03aqpKlaS4ydH2%2FAsSz72qt2onHzdHZ5cguAGbJIveGv2IZsC%2FA6pxaF9deLmh5cIapQLcA9Fk6AWPMuwTTTttBtlsgCAh68dwLRwimk9yb8AW%2BGeGJnpGuGUQzpnzXq5GM9MQipWkhPFL5%2BiZ02mysnxrtUSvSFVL8if7fWnxpux%2BUdO4ZRsE7ZwD47MBIJxDS1Wz9nQOmvVge71h%2BCZ3FWhc95yS35aUJOq4ZLoY6jSCy1yGVmMcPPYsGe2hkHXVwKsQGOX20u8xxuAJqVeKfnkKDAElWT15As2Ei7Xgqi4p0tYwikZmbhV064RtNRuBazthdqBhYG%2B8%2F5f0myIBBygKINZ0S0FQgo8A3iS5NdF6AWXaj5BthLIFiC0CQJfBDvOJP5Xr8FimYlFjz%2Bo7Wm7lt96027WQKdAUJFDsUrhUEmOiaLrvF0%2F2HoVGxqPxDPMACSKWOvPRFjX5fZ865yZP40YCMMEU0XLmi3WBAvbb7thcHz%2BUbt%2BChi6Ja9hmST5gNKolUAtoA3dmqtXjj%2B%2F%2BweeI0omNTrvCwwQj7lQoZ3ZevOUzoNeyzU%2B%2FwBc21CDqAXNIysOx%2BYedLs5c0M2Nv%2FQ0pABv5LMKekcYlMori7JM7HwhEc0NDAEv13XoqtOLD7hPmGAW4sQnAA8F3KxTtat20nrcVH4%2FHYVfCA3%2F9hYCVJHo1JsVkthJeWTI3IkwSpV9aIDxKO9DTA3MTIVDMdEt4cpvL2%2BCtLTuTsen2xgnFt4zBqyRqVQLxda9RMgQmQBXF2Sl50Mo6swhVMjorImFpQ6LexdfOvEM1PisOv8rH6w%2BSqWOoPtgEa3sL%2Fh8wXH538FcZXCQTG%2FNTg8BW07g598jz09iqUnyGqi1lSD7aBT4eDDrekVlzQHWWt%2F40VYScaHpwWkl%2F%2B2AEGLcpF97yBy281q5XhvZGoJkIVJEJbAYsYPtjbqJSWZBRVAViA6WPr4nxyJA5bG%2BS%2BX8sFo0uOVBf0Uwcyj%2FfcwFElAEVwe%2F%2Bj8Q9bNMyywDhcXIKgqatcBhGbtFATCZGxJh1ho1SvAKsEeUXQlmgdbtbIcjhvHWQ7HqqU8BawbDsIDSSAW85sDiRE3bDrqVvIq7jgFCD0WCfpXitPjPZKibUEPxpXSoaWPg%2F2vUCUME8KxTH57HeoZrokXQkoK2CrFQ%2FiNpXIAMD3I2LHe0j8d6ZP1HkTtWSBigf8CxSI3942F3KG6koNKtZjnX3m8AXCs2snR6dfd0uEm%2FA5P3SMnw15BYCxYJGqAR1MAuKNejq%2FCsbSFLZLI5LfWrUhI3uhQNqQky8f7IOT0aGdo9HbvzsfWoQfCCkwj2YOr7NjlD0bg1Xm7AdaTmrHdAAl%2BOSxgDjOMCWAhpVEt2Ys1cKx4OlctHkL0sVvutn614%2BQGglEQWjk%2BUFIke5w1a4cQINI5yB5%2B%2Bgo2SEmNkjxYysthxR%2BKmr5i03skkW5Ui8aweLgJzCMzy2AqMUbAQ9nZHr5lqqH4uzA0OgeRZodmD9ijdG7BJw%2BQCCKKiZHJRqW08%2B4ZKcuGp%2BRkVqRBy3IBPxxJDTBBgJji9Qf3P6yxowo6sZjSq8XQayAtMvFbmRhbSNiLbiRKEJbg1%2F7KImQwe9sYXjLLocVQMnf7riHb2HjRb%2F%2FN%2BT8HrqT3zALeMAAAAABJRU5ErkJggg%3D%3D';
var img_iconplace_left_t = document.createElement('img');
img_iconplace_left_t.width = '50';
img_iconplace_left_t.height = '50';
img_iconplace_left_t.title = 'Iconplacement:left top src="' + img_add_items.src + '"';
img_iconplace_left_t.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAHqElEQVR42s1ZWVMbRxDeWe3qWh1oJYGEwALEZQwp44OHAI6r8iPzV%2FKUBxPnwY6DjV1lGwPmlDGSAN0CmZ30zOzOnsKQUGUWSTXTc3TP18d0L9LK778Jt%2B%2BR4PvTwuKtkmntxXOJtRqnH26JTJG%2BaR0tAd8mrLChRNohvWd%2FrF57k5s70i%2B%2Fzttsi%2BMFPBYeTF1TrJuR68U%2FH7HD5IlQWOcBD8xwLwNxr0t36IU86PvqsyvRbl8OzAhj7E3HGvame6KIe9sxtskg0R7mkhI29JdjsPBwis9x0%2FkqT7oOD76GsTNRdCU6D4e9sXXT9YWX07GhQXyZjVqXSO4xOo6dRMGbrje86M5HI8dHvXCyL5F0J%2BdUQ%2BTH85OkjZADs%2BvRLQ9iQ9i0faAQbgi%2BIiHph3TFLTYXVr5cXTcBQPSP7uimM5vznm8Ynmm4yGxTmagcYM2I4o2xK27pBqHB36P5Cd1a%2BemJqPjxg0kHJ4SJAOCGvWSyEqhpIRtaTDyQFokiEq1qlAyhCE0UfaIoklMhei5Dpks4aeQgmk6gSLM%2FJCKXNyAnWoYpCiIzR8wRsqGlARPaujonZMpo8TQRcWOyeAPWzcvun2QH8ggutAy5RDYu4KtzsnqgiamVA%2FclZPqTJegz87rA9lWS4dI8CGPhWpw0i69o2H29mDLYMaLa4fORwGWwK9HQqzUGXYETduQS%2BDs3nvOQ2Ozjnp7oiGpX4XRTmY09BhueyDMb%2FONyQizYPPF%2FSXJjaNn2kxz6gnj9H%2Fe7CT06PZF1Fpfmfnwqb%2FXE21VleFzVt0gsI57uvF%2BxjiWzE5G%2BDGuzofzdZc9d%2BEL3hFat1KyVWvVKNJENhuPhWNrNyLbQcSfyTInNOG%2FXv2y%2FpvVk5nIz%2FXbehiuUPd2ztuQP8dFqaefiopvMTqVyPrLh59dq5jyq5tj8%2FMxyL4e2Js2IzWYz5GAUuuWDT0o8Q68tb1XDwk67Dle8mhk7PtyCtiIH2VCnWT3%2BujM08UggSQuWg5E7d5fYEk3DPYs5R9Lsnm3tXrJR87QEv9FEBsSCtgJqoulap3lKGAB4VyzI3EkzJE1ItC2Cs8JvenjaWcbYPbd71mqcllO5Ccgx1Mx4%2BcunxFmLiXJ8tOM8iZFTsYxha%2B0ZHxmdXfYKpzR5dczuH54OR1I6WizpcqF11m4APRCKQpv8akL3vC3JIZoi0hy9d%2FThovRCizxGjkZnW7FhbcbDVfoBViCxTwoQ6wmEIY1sVCtBJQETImqmdvzFLIssyZuGe5qEI5ySnm22ZtMaQUuz1QvU4LrAGOjb7%2F%2BCDiTdQASK2p8XJTkcVaEN4MlyyFmQaZozvUFe4dQMEPoCe4nhtZLYX6MOzHLj9%2F2hiK7TTr24%2BabTqoNM4YiqRJPV0oGaGYUq4bzT2N9cTQ6MxVM5dgAoLMyCTNN8kv9b98z%2BaoQjDAuwPTFEtMKh07bemmFwbHa50zgBDCU5wE8my0GgNOsVEAtoA3dmGtWjz%2B%2F%2BhHZczWVHZoPhPmIxFxpUO5tvnrFyS0C%2BsdlFMG0uBhFL9CFWtY3OLApG6WeiReu70dklXv9gw%2FzVTEEdLOjVIsXVJ%2FvH555aEY32DcDHNC3Kdfz%2BU7NEowUZBCcAz4d88DUDBGIljCh8frsCNlCYfcI5wdXRrJZbtUpMzQaVuBJPs2JHu%2BgC8XB3HY6bHp6MxJKi5GcCb62twO6DhXl%2FUOEYF%2BaesIKsWS01TkvtxjEQIbIArj45gPUCFmN3OOURFSozVmedlHYvvnVTuUlxyHd%2B1tjfWE1mz0AdmnZR2lsPBiNjsz%2FDdtXSfrm42T80iUQfg5%2B8jz05TA6OE26iUSYiBDKV9j%2FcmVrwyTNwa%2B2tv4qpmdTQlEDLMu6q1gBBhkQSVLFIceq0atWj3eHJR4AsLIKwBCdm8%2BGszUZFzeRBBNgrnOivfPxbiacAS%2B7%2Fp5ViJJHxBxRBMxP%2Fw7330BVJQBF8%2FtDI7BJF4YJXqa4AQUXRLO%2B%2FWvUT2BAWY1dB1m5UYaoMOqLoyvQebNdPlViKu7MSS9YqRQqYGQ5ifRkglosbfelhCZTOCzISzrteAcKIRbwAOjnaJVe0K%2BhBv1o5cLw5Bf1XqRD8CLFkrri1BvmMpYgXomoWplXLB%2FBJZgsAMHVk7JlvMQbIUYNhmjZ4J4hYcL6B0izMaRuyKyWi1spF65A%2FEAbDqh8fnnzdqRxswGdo8iHxDHcGgbHg2FEHPJEFwD3l8hyKJQcd0%2BLpXHFzzYmEHEgM5KNq5vRoDzY5OdweGLnnSLwsSTNyRvFwTIVl5PawZHbsCUXiMHTeacLpSc7YacIOISXG30ixXwJYVG3WKu5kDQwrNViolQ8g%2BrhPLllfj1l3JGJFErBp9WhfzZLb46xVP4AAMViA2yNEh0BBanaE3IOVohJTQ9GE%2B01rPD3YrJV5t3ywAZOHpx%2FDUclhBDyQv9vDtnq%2Fux0YmYFIs01vD9DRYGEuqPSRCCKK6eGJZrWy%2Fe45ScuGJpVMXqRBy%2FHAfHBJHTBBgJgSCEX2PrxkrgoysZjSq8QwciA9MllVmR6dS7uTbiTKEJbg4x5ybNKfv8e7l6zyKDHU3INbV5Ctr7%2B6bf%2Fm%2FBdev0C7HbNaqwAAAABJRU5ErkJggg%3D%3D';
var img_iconplace_free = document.createElement('img');
img_iconplace_free.width = '50';
img_iconplace_free.height = '50';
img_iconplace_free.title = 'Iconplacement: choose your own place src="' + img_add_items.src + '"';
img_iconplace_free.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAIqUlEQVR42s1ZaXPbRhLFDAFe4CGCpMRDskRRlm0dXicbe6vWliq13%2FYX7k%2FZfEqqrCSVWidlR3HWXtmSddKySErifQmY7ZnBMQBIu5xSVQTTMDBHT%2Feb7jfdsLz1zb%2Bkm3fJ8Pf%2Bo8c3Sqft%2F%2Fwg86f25esbolNs6q6JlkRuElbE2kT2Qt%2B%2B%2FfezPyjmOq5%2F%2FPORy7cc2Uh6%2BGD5M7W6HrWevXhDPC5PlfrDwhG6HqyQpYNrE%2FkbrPG5yxByzW5lo0XYH64xQkIvvMCqaOJsNva60EJcLlfF3ERCBLQszfZ%2B25Kwa%2B7i2gbc321vme%2FQqxvpfDmu5XBABil7L596liutbzJRT5FoE8KL6xuCzQwNQvybaKHlbLKEMX0uMVVcm4tNFaFpOOwdvf4Zy3I8lZNgPMa29i7vgDnYarfRxmiSj8qmezBNDUK4yoTZYRg6LGMKMQjCyDTIsNdDwWAEFKkfv0loeWjC5hJI0IpwSzBvhzdEPK6OcABZbkr8vIUBHwSTCEaYimOmMwARR5uvx4WAlvCPYUg6MSTqhHBHpsKiDVwH2sFaiI0OclbmaBDi4y2OgqEbum6LIiP2fGV4gk0fXtHBV7R30GmCe2Vnl4lOVyasa%2Ff5d3APhBTqW2zjwBIwcf%2F37y3fou08Ypg%2F00uMadlWmFmA%2FSGyt%2B148eL9TX97urgUT%2BdFF%2BHDUACzzTdAtq7rBsGl%2B09stABRDqbpMDDMDEXiRcvn2myN9U2vplb71Whw%2BN%2BfDP3qozTJ%2FoB%2FMFAcj2L7SFXCJgX40BL0EnmLgkeMMfyKzLsSDBWW%2FlLZ2w6piWhcc4KLz0GuYDRYQIk04Tgf0TlLeSLRpi0Xb9ErgP28jxhDcBgi6lQskf6w%2F3Jh7QnmUTDpQAq4ItRrp%2BVbxL2JxMHczVtozOYKQzFKZuc6rYvW%2BWkyW%2BTBuweuTYGj%2BpdWN8xn7vI2zYrcZm7ohEhkce7w1sLqY2qEj7cWV21WpNIiarIMlM22vyxyL3LAKK1vfDIPGheJAp04vOVyWoFsBMcF3uI2MO%2B1OpgNzpYR1zHyqQyCCCxv6WQYhokZO6X4CUoYZEhCDnFzXyTsUJlggzdEPicjcUUi6PD8990%2FJa9BPFvxRCJ%2F%2BdvDe39%2BKi9G4s2qMvx0epPUsvj04NWW2JfO345N5fgz75q%2FtzFWij3RP6DbrHaa1W6rHk%2Flw9FkNJH1L%2BSa6DkT7XDmI4a91vv9F6yezH3c5a%2BGPWKYr6NBTw5G7N5G9UDXR%2Bn8nUwxQAW%2Be6HlhnGtyMfPr2xMCh0xaUZ8NB%2BhhOPwWjt5oyZz7MAfv9Uwsd9rwXmn5RbPT%2FfgWVXCvKvfaZx%2FOJi9%2FRWcxjBMCcdu3XvCpxgGEUNtcvk6brT4%2BhFBncsq3CFpBrXgWYVtojaCWpd0AQCPfDaBmXTK80mxA2yFe3burmMEGlP9jAbd9mUtU7wN556WW6q9f5MadLkq52cHXkusgtTQiSeTs49I4kULMjH36Om5u9FYxkSLc7sPrUGvDe2hSBye6d2QRsOerETYwWQd6hOi3HNa%2B9FimZDl83Q0cWdL9hp2u7USYAUaB%2BQQ9Z5QFHKqdqMeVlMwIKblmufvnfxdyJcMMtElPHRK31yjDdeuUbQM5zS0MrsRLAzt%2B69%2BpIc2y2qgRZuex7ICiSE8A3iKErFEWGmS4Y4g4nU7H0GYEyTnqJ4wk%2FpfuwWLFZceBCMxc0%2F7rcrur%2F1uC3SKxjQ1nm5UT7RcCePAsN8%2B3n2enllMZsy0DDJpYtZnGNYNyEHIwt2fRmyEYYIro%2BVJC%2BLDaJ0tVNj99gVgKCsh2zJFCUNLp1XnOfTMrZV24%2BzdS5r9JbVifmEtHJ2iHqNDLo53f33K5kHOElhcewyubash82qJJ4ellcdMeeJCiyU2pbUnnsQGxmu5slYoIz6F4RpQgkvrX4uIxqdm4Oe4Flt16cHXwicMcGsM5ATgBaBaYkWobNnJcngsvftty6BJ5qa9EhwdnUat26xD3RxWk2oyyzMqQx9B4%2BnhDpibnVuGjB7LQa7w3vYWSC%2BUvwiGVRvj8vomYfp3GtX2ZbXXPodGYBbANaCEeGTYVYWLTm1G5ckgKHVRPdSvRpniMp4NDAft47fP0%2FkBbAcUutWjnXA4trj2dxDXqB7XKrvTs8tQtttld%2FviNF1YYtW5ZCaNCIFO1ePXt%2B48CigrcGod7fyS0HKZ2TsSsj4F%2BAiC13O8bqBy%2B91m4%2BxwbvkrQBYmAS2VWc0Ig8HWTruu5eZBBZAVTU3X%2F%2FezmswAlnb8X9YrsVQuGFIlK4pg5unRK3jFlFCkQDAC9RKv5jkWxIJLIAimiuE4gNRtXYBAmEw8xyGReu0GDFVgjxi6CjsHe61LNZGxw1lNpJv1CgPMoYPEVA4aa5W3U9k5GTYdOZm8QUbjCMLiIsn6SnFxdkiPaB%2FpwXujfiK5CRH2v8GUsE1IpItQ2UI%2BIxTxUlzLw7BG7QR%2B6XwZAGaBTMbmW1YJZk22ahBjYoJIJPELFGdu4RsLvUN2pca0Zq0idgVDUXAsKCovPhzUT97Cb3b5rzQy%2FBkEIZJHogl4Kg%2BAj9VrbFciXfAMg4K2srvtRUIJpWbm41ru8uwIhFyc7s8srE6ufHyVeDShwTR6egiZHb8isSR0DfsdsJ7mjP0OSIioCYkImBFCAYtrnWbdn6yBY2UK5WbtBNjHb7ns%2BWonyo3GUiC0cXas5enpMei2ToAgCmU4PSKsCzZIyy%2FQc7BeURNaJJ5yfcVm92S20GnW7NfayVsYPHf3IZhKjZHIzPy9Cb7lyqHEuzSzsAJMs89OD9ijQnk9rE5RBsE4O3e706jvv%2FyBpmWzy2puHjPS8lwwHkLSBEySgFNCkdjR62c8VEEnzimTSgzXh2ERVCgKSutZf9KNsAK0BD9%2Fl0fI9Pyq%2FfqRWWNKDK345Y0ryHZ2frlp%2F835f%2BNb93BIqQYaAAAAAElFTkSuQmCC';
var img_reset = document.createElement('img');
img_reset.width = '50';
img_reset.height = '50';
img_reset.title = 'Reset the Shop System Data src="' + img_add_items.src + '"';
img_reset.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAJvklEQVR42s1ZaVcbyRVV9ap9RwIhIxYvxMZOTiaZ%2BTCxc%2FIr81fy1eOZnDNzsg0mGPCCsRACtG9o6aVyq6rVWkASOF8QoNNqVVffuu%2B%2B%2B141ypu%2F%2FdVz%2F14K%2Fl58%2B%2F29wrT7y0%2BKOGrXD%2B4JpmB022HLQ%2B8TV3QYRP7ha6DZNrVt2zDMgWFalo0zsixpqqKoiizhRf4vbX0FXwDR7fbzhXI%2Bf1mtNa%2B6fdOw2HSK7PfrsVgou7q0lk3hGEC%2FFha9Ay5KaafTf3f45eDw5KJU7%2FcNm788HsENlfhrb%2B84mYg8efzg6XYuGPTdgbmJIN4a12mh9Pef94vFysAwLIsSQsEHp0TM4NzeMM2LUq1abx1%2FLn77h%2B2tzZU7s0X5z214evvfz%2F%2F6z1Gz1cUxJKSpDAQhBLAUWWbBtW3LtGyuVIzBX7nc%2BOHH3Vbr6sXO5m04E1CcINJbSH7%2F4Mu%2Fdz8MBqaqytA00OAgmYyspBPxeMjr1XBPxLRWb59fVEulOvLAZgApaN3d%2BwRMz59t3DWI815AUDyv7B%2Bc4Maaropl4AXpvHi2GY0GMGCcVNO0CmeVvf3jcqUJ%2FjAeAw6P8tFoEHlwGwoUxxzmDsW699%2BdwAx0TREIhDXAC8IhH8wAx8hNxg1lkldlaX0tlV6K%2Fvr2Y75QAkox%2FeHhl1QyiknmSuV2vgUccIFOp%2BfVVRy7AwGvXKp%2F%2BFh4%2FHAV5yEpx8wA0PIgZD6v%2Bs3vHgL66VmZQ2YhPjk5f%2FIou5AwZaGbgoXzi5rOMbHbW2zp8Cd8JQHxaUlVlfW19NQkGGVZUKGy83QdZNdqbZaj1HNZamysryiLzEwZgroZFxZdKbcQBShakSQAiYYDANq96svIPYlIstRodqq1ViwaBOKpyw3DAFtPHmbf7h%2FzvGShh%2F0up2Lc6mZGcQFbuG%2BvbyTi4UDAC4Y0TUnGw%2BAA6QbEXl0TOQ8%2BAB0DTNO6Vg9oLBZE4JDCIKzd7lmmDf2JYrUgiDfignoQtUjIl4yFAKjbM%2Fw%2BzefVcHYpEYbagIhRJuGdocck15EBryyriVio3ekH%2FLoZs3r9AeG2O0dhIhNnDSDcC1ikQLlpmFLAa1MmasD1%2B7ytTte0BkCGBQBdr2%2FqXHZTyHgxkFA0TZMJn4mTTXtziOhkEG9mCz6ABoHXFstgee60DLxZkLF6OD4%2BKtxdkQGdqz7ohM2OI7MtGwtDj9EfGFxwJhcWXcDWLG3hJC6HR8uyxcPhrBUH4qOmqaGgr97odLuMM1EPm%2B1uMODTxpERAn%2FAR8gL6E1TONy89B9mIp1RBxgyOugbmM5gurZVhbiDcR7IIiF%2FtdZGnyPzsohr6rV2JOzXdc3i4UbeDFDYDRxLHs63h5KZbYsbxFmoKS8aOICcJZmtEn4IGiYKwIAhi8eCpUqz1xtIwypU4ZYBLgmfgqUqGjKAsVkZwKk5N12QiYJoRSKdXh%2FqQUo3m%2B1wwDs1eNAfABmy9eKy1rnqMRjCOS9r1LKjkQBE2Wx04K60z0pAMOglnLSFNZHOrlA2JFyuNhFKppvW1VWsD4ecch3BWWopWjyvttpdHh5GW%2BG80hsYOGq1r3gJZw2jV9fnqGoiE2f1W7ZFA36v5CGQkeAArcFmbvn6eKGzlXTcssqNRofNzsefnpZAHwInCjw6oqDfi9yc3%2BEtKNUowDpEHfafFSvCyIy6eaqUMssJlKCpps4YGBi8upzAQa3RcRYuZuZqwmE8GtRVpT8Y3AIWnWchyCZ49GWpjn0E5eW5eFFFLEAMvcY%2FfA45kcumrrp5GAcTNxmtGsUqlYxYrAei8zsbZSzpbh5mcMKymeTRhwIcQozEnqfV7q1ll3xe3S26rK2gBC0zbor%2BHuYpESfpgA%2BevJpJItAQ4sJGcLxpntloQ6qo1pmV%2FvFJkXfqlLtGtVZvoaGIRUPYeMFOYR%2Bw8nanhx6hzlLPNqkl2hCZytlMApUUpjqPqutN85w4wnQIUR5kEkjy45OLATizRQKayLvT8wrbrRIuaqQba7Wom0U4rREFZK9n06KfvvXOhzKXI3O3JUCAJmIjt4yovf9UgFNYnDbqbsNG0nbQwL6QgCG%2Fb2sjs7oSx%2FcsnReFj06zNYvbIVpoBY61nI6FQ%2F7P%2BQsIv93uiv7d5ZoJlPspSjcii7TIraWFIwx4gb%2FLPpG%2FxncvnnGliWP%2BDs5kRYLBPn20lsumYevlagNiEntrLiNJ15VAwIfkTadiAIRIQOPMfonnlrvRCd%2BavsS%2BlgNUyB9tk4UEwwYmt5bKZZeAFbdFNwaeIHxVkzVFgSTAIwo0Ezh1JqSsRM%2BQOZnR2DhkiSM6lItL4eSVfENmig0g1K5J2GHzqQhuTERndn0HNSonxDnDDYC5IWaUFc00%2BpOPRoZhcjXrzMtrCKHkxgKFeQHP4dVdA7uNhwwXMXqSwLgaHXNM1NE0EdsPyw00gyWx1pIPsumnt29GEClNZB6G4ssSb6SO934c3olD8Xi2dv7M%2FJKQduOy3Sh1mhVclVp9HAgniKzyS96MditcFxvPXrKTxD1DxEMe5MTWb%2F8iE9gwGRkEEe2IxFphaGBr5xV7djDo5o%2F%2BIWPrHFsRu0K8b%2By8HM9RRLNVv7jIv8ttf5deeyouwfil7CNei9gSNp%2B%2FFPxRtna6%2FuxPgmkOmn2EDih%2FJuA6zoSd8ladcumwZaiqF8el0%2FehqNMyOE5FJwRTzh%2FKHknVfJhD03xbwE2cJzlYiS1RN57DZKej3lfYCeeEkFHfO24QwgA5q45KiOQKVBJvPNwjXGxtwcRKs1IsFd5HUw8UVR%2FvRwRbjlhdy6WjXHe2zrYluKBDusYMQjzz8IzqRv%2BqiSuXVh%2BJ%2FkQ8tfr49gfPsAXcfPESdw7HlpvlApDhPZHZCkSSDjiRseyS164rb%2B68Gtoue44wLA%2BES9%2B4ySCcODFgn3ZfiwqSWN4IRdPOKrlhbj5%2FRSe9T%2FUGHmx%2F16qe1y5Pymcf8Zt99I3mDbis4RLP1ENHOlw8HR3e%2BOxUdJOjiWAhXw5%2BZg04nahW437kdnmKosVSa6FYun6Zb1bOasXj9PozEcV5jxJu%2FJZ6Jnc%2BDiXOUNwps%2FH87OOu7gv6Q%2FHF98Bcqp5cfQhYzCm%2B%2BrH89M7nWh%2FoDUThQOfHe%2Bs730uSPGuacuEDoDzY%2FiOScdBjvXI695sJbudvvm76Vpl8lDo9NJLMdBrlVqUYSa6Kk59%2Bfe1evPkCoqHx5TXdF8gf%2FIIzWEY6tw3Vj7nAUKmjS6aUNg%2BW8zVLrrGh3kDEPTM8mBaCJKuoBPi9PvskiDt8624x7s%2F%2FfMZ8K776%2B3v3%2F8Sjo3%2Fet39z%2Fg8FiHxmnPmXmgAAAABJRU5ErkJggg%3D%3D';
var img_save_update = document.createElement('img');
img_save_update.width = '50';
img_save_update.height = '50';
img_save_update.title = 'Save and Update src="' + img_add_items.src + '"';
img_save_update.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAI%2BklEQVR42s1ZW2%2FbyBUmKVISSVGi7r7FdmwnzsUxkG7Qos1mt7t52eei2If9Y%2F0H%2B7AFFuhbW6ALBGmBplh30W2yazuW47st6361JIqcfjOkaMmyJBp9sUIzNDU88813zvnOGVp8%2Fec%2FcLfvI%2BJn%2FZfPbxWmH%2F%2F1D9G%2Bqpc3bwmmkP7AYYsjt4kr0nMi%2B2UctGq1uXeQ7XbNdrszN5cK%2BKWbzoUHD49zeFAUfXcXp8KaMjm2JvIFTKlUFEZPTgsz0wk9EroprGKpepotxWIRw%2Bh%2B2Dtbf7LkARaZgMswzIAkFQrVfL5irVgCz98UlmWSUrEGrsATrI2bbsCJY3HxPHxsZT4cS5JYrtQ0LSgIwg0wWValWuN4cnxyrq3OT6bBhkXYv%2FFhKPDC2qPFvf2s6PM1m22fIPh8npCZpmVaFp5CDNxdmKJMj0VlQ3GcSMaGPL4VBL7T6eKMwP%2F2T68%2Fenrf7xe9wMJTGz9sf%2FJ8nef5Vquj0WAn46YbdKK35CUc%2FPjl734LqryztXx3plCs2o%2BPX%2F%2BgE8kEgaDh1TswEmf4wmPgE563ek%2FxDrRx0xHvumUv07ZrdIw%2Ffvvqo6f3oEGenGjAie9f%2FGbNtuBgIsSbbpGJyovYoGb9fumrLz%2BHKnp34uq9O2fZEuP3EpgX3ZqYsXAF5zqNXtse8fDhOc4F07MwPhWJV7aIg4auFjL99Tff0Uy8gRO3P%2F71Gs87fHPEI1tecCEy2CIl0ffV7z9DPkIsvGkpWV2ePc0We7FFPASNk4nEU2wJNDhEUZTloMfAcuZgH0YVJWx8xJNBJ46VUxsXs2r3Ah6rYo8a0m4buOgRPJEGj5nI0SVCQEOqnPlw1r%2BM4YsrBt37igKOfeCchoPXTJzoRMDi%2BEhYVZUglm50Uegs1%2Fv2f%2F0Q6TIEHr6GlNiRLrAgcLKQcJMz0Us9wDywjuWiLflpa39n98TOzb4zNwxxdjqxuJBGkcaYAHoj3ufR795V3qKHZXXanZ3M8ctPn%2BoR1eYLfGBiWQ4AGe0X2NE1zWKp9tfvNp48WgDBGHnRajsC6VHlJwZgPwHwHc6JeLhcabz5frNaawJNPBb%2B4uUzFAD0F6CzYxhoyKK608SCY1Gkgsc0mfcyl%2BihC6TdKZhyw4J6kxe6hnmWLT7%2F1WMMeLOx2Wi00IJCPBF5pmkGg37CCgGQ2HUdPYdA452g1eH%2Bfzndzhx3OsZl5WdnTCPSeYRwSLHnNjpd1EkUcrNr%2BthXpDcYOow7iD2ekYExm9sHD%2B7dmZyJY%2Fx4clZgAkH6aiKSSkBjjjOaQftZBBM8iAP5Jkk%2BFANka2%2BwrcRO8YHyYauyujLnqSaOcjq8o8gBxCxA4NwLFwFzOx5BwBFimqTbpV%2BLNJLoBxrCJFRgq%2FAJDjTBIny11hgfz%2F1N8%2FW4oroGDqAI91fmUEJs64hiVZFTSf3vb94Ca0RTsOcgBD27YFOFX6nrmVHGltN3uBE60j9XmuZR4xbn0%2B8293IFysrS4jRcB4Zq9aaqBL74%2FFnzokU3WMxZTBqoRnTaBvgrV%2BrtjgHQCDtiESREl8cGuAtBmUpFPTXNeIwf0RGkkzohC5vbh2D%2B%2Bx%2B2kGvY6%2F3lbxvA5%2BrG5ZL6bIDjaETd2jmUJMnlAS6ORkLLi9PEIh7klONGjcNMQIbj4Ch3cHSO3UtUVweYHel%2F6jjohV2nIaooqfD7%2FGzS4xaD2LXl%2Bpnsa8LNzyWpRX5A53pFsW88P6qNdC4mbv4GdOvqWGtoAjJ05vtx9yXztfxZNLX4UWHOj2hsbJtGu9mslwrHu2gY1FBUiSTUcFwQpStPZg9%2BalQLaiieXnjkLiq797ZRLyyvfTpcNnbfvg6FE6n5h7s%2Fvqa%2FsyYSKU0Dh3a9Amda956%2B7BrtwVcjjOFOu3G082%2FKEw01q14t4FD1eGp2VfBJ7kydVgOYcHFRL7ZbdX9AtdnSYtO437qoBmSN59ztBGk3a7AWiqRZsDDrJm12Lc5OGYu1HzRXXUdTWILP7mVJJX9MTGtmeT2o6Bhhmd1aKVs4zdS1vBadcmfCxJgmPf%2FwfH%2Br06oHZY2wSimHdFS%2BZjknK5G%2BhOGblRzVubDO0TcXtLe5%2B%2BRFL9h4tiMSYBDi5qOVk78UCFYX%2BEblHI8F5BA0EzP5RCkcny6efyieZCKxmcuXVScZLZrSoulWrZA7fA8aON6WTV98aqlwuhuOz0mBoFOUOu1y7iQ%2BvYTSQLli%2BU71iOeJ20ALxC6gbhUckNPY9HL%2BaGfv3T9Td1b9SsjvlzHT0uMXjiGBMgoPQhhVLYE7ipasV%2FLddtMfVFlsEkXVS9TLNcByKuBFFZEja6Cf2PWxt2F0t3n2DzuTawSCi8SmSdcone%2FnD7do960nQpGEosV4wccJTiMKr2EagIahoKpZ1Kc1CbAo5xwu5HD87ODnpbUEa87M7P4mkgbx14sjgtjN9AW%2B%2B1l58hnp0SX2N8X4P5Kah10Eae7ofb2cr1fzuHnn%2FjPJL9vTnB9tIwElSabdvRQI61O5wy01nBB8Iio2kCHjGuVcq14KqnqnWQUKVU9QabCZYPUbPZhz7YSrwPpL4zqB6DHo9ys4ND1tGK1mpVA4y1RyR4mZFSofrQZHMzRX%2F%2B8rrqdWNDfbTWSfnXhAg5u1cj6g6Djjjqzq7os9%2B7y09vGosnPl3SkFlt1%2FhwxffPwcIUW%2Fk4LhxGz%2BNFPJI2YprEal2P8wa6LpCegDQadFFgQxmpwvZfdlJVzNHYfjM7hzOac1aVdNuMGdDyGhSLJRzlfODyPJORtZs1aEIZimYWGZpbM9XCdmV%2FrtZPfeAYT7CC1%2FkQTuZPd%2FxjUS9qZv9gabZgiPFkN4wiKO%2FqGR5CzzYJPmQTh2xUxITzYqeeOiEVA0JwwCissH5GaAG3a9%2B59Xw4CW1j8Z6uWZ89GuJe%2BshmrFeunc1vH4zDJwSFIQ5pq4Q0jwyjQckUMQT9KsFQLK5fv69MIDsJVeeDi0e5n07pu7%2Bu6U2D0uXIBj%2BIFoeh7HsGnUpf6F9vyYXFpPjqfEyxbj9vzNp0%2B3YrO%2FuHV%2FT9ze3rhtf%2Bb8H6WbTaFXl%2BhLAAAAAElFTkSuQmCC'; 
var img_Price_adjust_on = document.createElement('img');
img_Price_adjust_on.width = '50';
img_Price_adjust_on.height = '50';
img_Price_adjust_on.title = 'Add every locked equip to the list src="' + img_Price_adjust_on.src + '"';
img_Price_adjust_on.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAISElEQVR42s1Z6VMbxxKfWa0OJG6wAYGDDkPiCMsEEl4qMVgf3v%2F4%2FpX34X1wwK5ynNjP5vKBJWFOcQgwh4RYaSY9x%2B7OHkhUUkmxJbZme7tnerp%2F85ueRV%2F473%2FQ7bt0%2BMvO%2FHyrfFp8%2BVwXra3iq39gPKNeb6mTHPuXjBaiCGE0cLfnb%2FVpb%2F%2BYIvq%2F03ITnX939jFnpFu3E1tIRoy2SkHj6sqIRSPQ%2BP%2BbtcvLq7nHWZCXj05jsUgkHGo1FgSLthiEUsUt1sbw29ktH5a%2FZCdSLuXTs8rap63S3lEgEPjpxww41N3dAfKLSg3aL16%2Bi0YjnR3R7MN0UA%2B4bF%2B%2FWYsP9Q0O9EL%2FtLXjyJlEii4uLt9%2F2Dg6Phu9N9DVGQMZeDkw0APyX3979%2BX04u6dboxxZ3u0VAL%2FtEaDrK%2BXMg8Sd%2Fq7z8%2BrxfUSyHNzkxBOmAD3A%2B0fnOzulsvl08G7vTfIh62gi%2BDCLRLWw2G9LRJcXM6nk0MwxQ9rG7qOOztjvT3tM9%2BPC18RIufnlcL6blskNBzvh8eZ6XHDaFSql%2BBZo1Ev7ZXzxZ3Bge58cRcmBj13dUZBzUwibZ5EkWYriQgC8POPmY%2Bftk5OLo5PzsEtkIA8Eg5Ofzem2k5N3r%2BoXEJjMpsWkmAw0BWMicdKpSZwBvnVNPzN11%2FBJFXzp78%2F9XUp930OuZNoXuP3RyTAjcbZWWVz6wBy5%2B0i2hYWTnsvyCAg4bJmZB6MemPRJJNUBMtOIhe41N%2B9%2FxzQtIODk0a9AUj3RlvD2DvCxUX16Oj0qmasrq5PTY65Vxn%2F5aafeMPGQsXfUhfk1TEg%2FvBLJYYqlcu3iwX3AJBxTQNoe93KF3bDoWBXR6xarbnnowzhdsgX8l6%2FNrb2RuL91ctaMjH4Kb8NQHYFLBoNe6nOMOqGYYylh8%2FOKwjF1jdK6WQcefxyYct65P45eIsK3rJUDw6%2FjN%2B%2FBwuqPdY2HL%2BTL5YszMloBQIQTtWE5f3D5r2RuxDFre1DCPDzF8vp5LDyHktkkWZ0K5aqT7T48u4xJRTaG5t7HqTSSCToEkKQshNJ4Dld14RhvritBEx2mPvhSRPQu5KoLqVjYAqBMFiPEJi%2Bvk7wVc0IcCnQugNVcjKo3mgICei%2F%2FP29amUN%2B%2FQ3N0fkfsgp0JIrkVoWQIBtwDq8DfQD0IZ2OhF%2F%2FmIF7irkXdAqlfhkKLJ%2FCHV3te%2FslIECpVOcU70%2BMUdfPmWeEckRVrQktrZ2Dmemv3EKmRx2GPA4PtRvRkIFDUzmEDwwoWZbfTUysLhSMK2wpAiCcjM5r1vqFqCrpAJbWDfsMNZLRk4Sg%2BPp4VdvPsYH%2B3xBsVsqT0%2BOS7RqWh3KPd6GHQI63N8%2FZpwsh6XXVCvUxLy6EjHePzx5v7YJm3GlWrMKh9L%2BMeMn%2BVh9vfhp6pGbw16%2FXYNXb5by4vHKqAMorcez8yp0AuiEIagSm%2BsrCKqyPOqBWoUyV%2FjKR1dXdVEmwB4nx7uqfw004ZknkCfUCMApQkew2vZOORSSqeAYDVhhAgx53WJpVeJlr8RgUH%2F0MA1Tr9WMcDioOyuner0xHO%2BzsKVesNaAGsAtMLGsON8yK5jY1KP7Pk60rE6pwCEhXe1tD8ZGVj9s1I26GAD65TEwhgZ7JzMp0PHtBV4BtDe3D0KhoGoIG9Gj71KxtjAzpKRFVSM3c%2BqzJw7e6YVffn0H2IsQooc0KLNkYdi0z%2By3qdGRgc%2Bbe1AwgmKsI9LX2yE5hapseuMy0CcvibjKUje8wPVsJtUiFk39ou6V2LJu%2FOsXvdkRw0mnaO%2Fg%2BO8%2BZkEwcqGOm0cLAVL%2FgdNff1%2FXDXxvenxdX1lQHxOZ2euEqr5X0sTcpe8lCFi87pyTBkUaSnKz4spCYXke2oQH2RYuzicnZm19JQtF7oGPOUGWCdP3jEv9o0WV2o4oi5YoQpfEa%2B41QU0LwOvolKrLkLCuRWCEnBDZZg1%2BDnApMB3XI7EfE5nHovYUOvmleWuo1MSsL%2Bp1R%2BzEYQbb3wIKywtCotozITA2IumHczatqBuALwswnifQdwqsXDmjrvLbdIvNX5MHLOEvdAHYSmeeOEaicooY4fzyfGHpWerhrOhRCwREKDHFLn02DaDoiTkMxSPhBRkWQeDVPSssQE4Ceqhu1JyfRjBHH0aOaBHxHcDshr0ksoCk3G8q2zCAgLzwy31u4IFkKXSamPOnzDMGkYaFS51PFIuL9cnvzAhmhpGGHUfnAA6gANI0Vh2yIxplbeGzHsAEzNihlj1DfovLC%2Bsrz8QxKckCLE0%2Brz6XAUZoFELIBtVgH4cRoX%2F4swmCecNBSth7ZiXAJGemyZklvn1srmrMgKxMfTQza%2B963EQgXQJDMZH1OMZ2yaCZdu5TtdQDXODi0gJEKTnxWDLQ6jMbtZSa2KeyX0SLHDoQj%2BIyaFJGSxq2hDCWwJbGx%2BBMJk3Mwp8CLkcf%2FISVrwc%2BBEGs5a6sfOFNYREodAFgTrG9iMQSpAKKZuFr8QXoM3O%2BMsA%2FWCipzKwg9wKjXDlPZg6k4qm35BiFpfnBxETp82rh7S%2Bp7Jy98sUw3Gcb1iq4CVU1rbZqkhJJ5KDhp01iLi%2FM82z4EITj5EuJ7apyt5Y9dRAgMT8DIa9VamIOpgrbFFIZi1pxtZse3qKKX4SWCkuOEBLq31bjJITXaJoAmLcz4DL0rSAsuZwTt2S9LM47elEuVfOGFyg379Nvq%2FZNgFIu%2FmmhYwLUGR7qFy3P963r7pSH5xdr0mz5ZGf51P%2Bk0G9Qf7eQKylW%2B7qY%2B8pvLmyOAd3%2B1HpLLpW3eoenbt3%2FfD5%2BfIVu2fUHVqWVJpvTJZoAAAAASUVORK5CYII%3D';
var img_Price_adjust_off = document.createElement('img');
img_Price_adjust_off.width = '50';
img_Price_adjust_off.height = '50';
img_Price_adjust_off.title = 'Add every locked equip to the list src="' + img_Price_adjust_off.src + '"';
img_Price_adjust_off.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR%2FmAAAACXBIWXMAAAsSAAALEgHS3X78AAAIcElEQVR42s1Z6VYbRxaubrUWJHawAYGDFlDiCMsE52CSGDm%2F5gHmbx5snmDeYc78GoR9gj1jj81ms2gxq1gEmEVCtFSVW0u3qhcE8TnOoQ7Sqb59b9Vdv7oltNl%2F%2FQPdvaHBJzX5y53Saf71S43PtvJv%2FoL99FrtRp7o6FPhLUQQUlDf%2Fa6vqtPe%2FjFBJPDPfzfhufztb1QZodbdzC0kPEZuCkH96koPBQMw%2Bf%2B7tcvLq%2FSzFNBLR6ehUCDg9920FziLbpGd%2BT3%2B%2FKdrWIikFp0r8LezWzosfU6NxWzMp2fltfWt4t6Rx%2BP5eSoJCnV2tgH9olyF%2BdzrD8FgoL0tmHoU92oem%2Bzbd2vhgZ7%2Bvm5Yn5uODQesz%2Fw%2BYtWPiI%2FpLYIuLi4%2FrmwcHZ8NP%2BjraA8BDbTs6%2BsC%2Bqv%2Ffvh8enH%2FXqeiKO2twWIR9FPrdVwoFJMPI%2Fd6O8%2FPK%2FlCEei%2FpsfBnWAA0wPtH5zs7pZKpdP%2B%2B90iHkQKjDNCRAoiYe8Dfs3v11oC3vnFbDw6ACaurG1omtLeHuruap38McF1BWvPz8u5wm5LwDcY7oXHyScJXa%2BXK5egWb1eK%2B6Vsvmd%2Fr7ObH4XDIOVO9qDwkfkJr0IYco0gojAAb9MJVfXt05OLo5PzkEtoAA94Pc%2B%2BWFUlp0YH7koX8JkPBXnFK%2FX0%2BEN8cdyucrzDOKrqsp3334DRtoiC%2BGzTWCIgLpWYmJkSCS4Xj87K29uHUDsnKkZbPFzpZ0DIgiZcFnVkw%2BHHQlNmpUWYQyNIBL2sXJ%2F%2BPjJo6oHByf1Wh0y3VkyqqI4N7i4qBwdnV5V9eXlwsT4qL3K2E4jz6ea6WVLeXkP8D%2F8xSID5fLl%2B%2FmcfQOIuKpCajvVyuZ2%2FT5vR1uoUqna7TGSan1m7lrNSFPc2tjaGwr3Vi6r0Uj%2FenYbEtnmsGDQ70xYXa%2Fpuj4aHzw7LyMUKmwU49EwsuslZ5hTPwtuEY5b5suDw8%2BJkQdQUK2hlsHwvWy%2BaOac8JbHA%2B6URWjcVzYfDN0HL25tH4KDX84txqOD0nvFTK1r8YEIRHXxFivvLtPpMN%2FY3HOuEAh4bURwUmosCjinaSoXzOa3JYf9CeDS3ErpGJCCZxjUIzimp6cddJUjAlgKsG7JKmEMqtXrnAL8r%2F%2F3UZYihibr%2F5kTcTQmDCCmiHwmynULANgCqMPmAD%2BQ2jCPR8Iv55bgW055m6nFIjPG6o7OjtadnRJAoFAK0xBhdP15iAVGmN4SubW1czj55DsrkdLhhAGNwwO9hifkpAFjDkEDI9UaUt8M9c0v5QwphRf%2FaHoKoeYndQMgKGbAEdYJJ4z5koKT4E3EB9%2B8Ww3397gut1ssPRlPiGxV1Rq0e2wOJwQsuL9%2FTDGZ4xajr2Ve2VYYTT91dhAEKcr%2B4cnHtU04jMuVqtk4FPePKT6Jx8rb%2BfWJx3YMe%2Ft%2BDV69W8jyxyu9BklpPp6dV2ARyE7Ygsd21aETjJXMq0T6KUFSJfIDtAt6FUJVYZWPrq5qvE2AM07sd1X7FmDCAaEAntAjAKZwHo5q2zsln0%2BEguWoR87FBPeNNISuwptSJXq92uNHcTC9WtX9fq9m7ZxqtfpguMfMLXlArQE0gFogYkoxvKVSYNjE45Ev6U5ZJWKEcUdry8PRoeWVjZpe4xvAuswH%2BkB%2F93gyBjyuq8ArSO3N7QOfzysLwkH0%2BIdYqMVPBQlGRsmvzrxyP3kIsVai4eH%2Be93wly3sAHphjDWfCm2WaAybNtWp72PDQ32fNvegYQTGUFugp7tNYIoVOyGCzvQSYXWcida4RMIySt1ygOqpZKxZM29UYmJ60hUbiL0SDYGvOG6zhcHT8NbewfHXvmaBM87%2F%2FusNask3H8jUv%2BD219vTcQvdm15fC0uz8mMkOX0dUeZ3UpqI2%2FidAAHFa486rhOkoigTyy%2FN5hYzMMfMyQ3ifCY6Nt3gl3I2zzRwEcfIFKH8jn2Ju7eI1NthqQXCEtFGcYo7RYwO4s%2FBKZFrBNOlsVSxGIs5nfD7iZWB8tgeceMxknzGzxXOk13ImFvFxqZdQMTSQdDWQzHMFavnFmc5RZanREBshOOP0o2alw8AVxygOI9h7RhI2WJGbO23oRa1XxUXLK4vLAG5FU8%2Bt%2BxEhIkKUrKLmdzCi9ijab6i6vFwVypEsfFTMwCix9IKNI%2BYNWQKdwLrwGhjAXTs0Xw1vWr9aURh2acgi7cw%2Fx3AWIa%2BxKKBJExvIuawAU95rpf97sccSUNoFTHsJ1QzmiJ1My81ZqjCB12TfVMhsExBqmK5OnsUD%2FIgVaXdIb2iETrnOmseBYMYvdTSZ4hvfnG2sPSCX5Oi1MFC5NPyS%2BFghIbBhXRTFc5x2BHWh08DIKg2LEkxfU%2BleDIJy1RhWeT7Z0ZVKzSRJdOHk4KfeZKK8EwXiSGJiH5cUZBRbkg15Oy3asEHeaHkF2bBS9GxZwKBll80spYQI%2FeJWBeRPEsd8Ed%2BETgJhSVVMYmwF88tle3BkEyIGI0%2FgbwcfvizIv164AIQ2Cx3qfK5Nrl5gNBZSHOiNIqIlyC%2Fthi3LmLiBfBTcVYZoB8USiw5zcE9RyFX2EnFAVQc%2FZbYI7eQ6Y%2BMFT8t597PxFLpRuXzbZjOjbSWkxsTmdOcyyIxHkSWNOy2iY3yUlicdReAsNx8CW6oKn2bZU8sAIiN1hI5pWJjaTAVjikkIxYx%2FdqYOnCLSHphUswtWFyIiftc9hMnXsNpJECmEQGboGsHYdKFTUySrjKfsawiDZnzlgOYm6%2FpdlS7BkBuKb%2BUaDGAWN1D3Lzl%2BH3rum%2FC3DNjGk3LJzXNTP9Cotum7mohW1DM%2BXU%2Bd6Xfntg8BzQDau%2FM%2F1Vk3OoenLhz%2F%2FNZXX2D7tj4AzWqqZYCTftKAAAAAElFTkSuQmCC';


var Bugreport = "";
var BlaBla = "";
var BlaBla_zahl = 1;

function local(a, b) {
	if (b === undefined) {
		tmp = JSON.parse(localStorage.getItem(a));
		return tmp
	} else {
		localStorage.setItem(a, JSON.stringify(b))
	}
	return true
}
function localRemove(a) {
	localStorage.removeItem(a)
}
function BASE_factor(Klasse, Faktor) {
 this.Class = Klasse;
 this.Factor = Faktor; 
}
function Sortier_Hilfe(){
 this.ID = 0;
 this.Sortier_mich = 0;
 this.EquipIndex = 0;
}
var BASE_BASE =[
new BASE_factor("Damage", (16+(2/3))),                            // Weapon Damage / Attack Damage Bonus
new BASE_factor("MDB", 22.75),                                    // Magic Damage Bonus
new BASE_factor("Accuratly_Bonus", 5000),                         // Attack/Magic Accuracy Bonus
new BASE_factor("Crit_Bonus", 2000),                              // Attack/Magic Critical Bonus
new BASE_factor("Block_Evade", 2000),                             // Block/Evade Chance
new BASE_factor("Parry_Resist", 2000),                            // Parry/Resist Chance
new BASE_factor("Element_Migration", 2000),                       // Physical/Magical Mitigation
new BASE_factor("Special_Physical_Micration", 400),               // Specific Physical Mitigation (e.g. Slashing)
new BASE_factor("Ele_Migration", 2000),                           // Elemental Mitigation (Fire, etc)
new BASE_factor("MPB", (35+(5/7))),                               // Magical Proficiency Bonuses
new BASE_factor("EDB", 50),                                       // Elemental Damage Bonuses
new BASE_factor("PA", (35+(5/7))),                                // Primary Attributes
new BASE_factor("Proc_duration", 200),                            // Proc Duration
new BASE_factor("Blood_Demage", 12),                              // Bleed Damage
new BASE_factor("Drain", 25),                                     // Drain Procs
new BASE_factor("Burden", 800),                                   // Burden
new BASE_factor("Interference", 800),                             // Interference
new BASE_factor("Mana_Conservation", 0)                           // Mana Conservation
]
function HVEquipment() {
	this.Name = "";
	this.Level = 0;
	this.Slot = "";
	this.Type = "";
	this.Price = 500;
	this.BazarPrice = 500;
	this.Material = "";
	this.Void = 1;
	this.Url = "";
	this.ID = 0;
	this.Addmonth = 12;
	this.Addday = 31;
	this.Addyear = 2012;
	this.Schadentyp = "";
	this.Attack_Damage = 0.0;
	this.Attack_Damage_Bonus = 0.0;
	this.Attack_Accuracy_Bonus = 0.0;
	this.Magic_Damage_Bonus = 0.0;
	this.Magic_Accuracy_Bonus = 0.0;
	this.Attack_Critical_Bonus = 0.0;
	this.Magic_Critical_Bonus = 0.0;
	this.Physical_Absorption = 0.0;
	this.Physical_Mitigation = 0.0;
	this.Magical_Absorption = 0.0;
	this.Evade_Chance = 0.0;
	this.Resist_Chance = 0.0;
	this.Magical_Mitigation = 0.0;
	this.Block_Chance = 0.0;
	this.Parry_Chance = 0.0;
	this.Burden = 0.0;
	this.Interference = 0.0;
	this.Damage_Type_Mitigations_Crushing = 0.0;
	this.Damage_Type_Mitigations_Piercing = 0.0;
	this.Damage_Type_Mitigations_Slashing = 0.0;
	this.Damage_Type_Mitigations_Physical = 0.0;
	this.Damage_Type_Mitigations_Fire = 0.0;
	this.Damage_Type_Mitigations_Elec = 0.0;
	this.Damage_Type_Mitigations_Cold = 0.0;
	this.Damage_Type_Mitigations_Wind = 0.0;
	this.Damage_Type_Mitigations_Holy = 0.0;
	this.Damage_Type_Mitigations_Dark = 0.0;
	this.Damage_Type_Mitigations_Soul = 0.0;
	this.Damage_Type_Mitigations_Void = 0.0;
	this.Proficiency_Bonuses_Elemental = 0.0;
	this.Proficiency_Bonuses_Forbidden = 0.0;
	this.Proficiency_Bonuses_Supportive = 0.0;
	this.Proficiency_Bonuses_Divine = 0.0;
	this.Proficiency_Bonuses_Deprecating = 0.0;
	this.Proficiency_Bonuses_Curative = 0.0;
	this.Elemental_Damage_Bonuses_Fire = 0.0;
	this.Elemental_Damage_Bonuses_Elec = 0.0;
	this.Elemental_Damage_Bonuses_Cold = 0.0;
	this.Elemental_Damage_Bonuses_Wind = 0.0;
	this.Elemental_Damage_Bonuses_Holy = 0.0;
	this.Elemental_Damage_Bonuses_Dark = 0.0;
	this.Elemental_Damage_Bonuses_Soul = 0.0;
	this.Primary_Attribute_Bonuses_STR = 0.0;
	this.Primary_Attribute_Bonuses_AGI = 0.0;
	this.Primary_Attribute_Bonuses_INT = 0.0;
	this.Primary_Attribute_Bonuses_DEX = 0.0;
	this.Primary_Attribute_Bonuses_END = 0.0;
	this.Primary_Attribute_Bonuses_WIS = 0.0;
	this.Hit_Proc_Damage = 0.0;
	this.Hit_Proc_Siphon = 0.0;
	this.Mana_Conservation = 0.0;
	this.additional_abilitys = ""
}
function HVItems() {
	this.Name = "";
	this.Class = "";
	this.Description = "";
	this.Price = 5;
	this.BazarPrice = 5;
	this.Anzahl = 1;
	this.Bazarmultiplikator = 1.05
}
function HotItem(Maintypus, Typus, Suffix, multipler) {
  this.Maintypus = Maintypus;
	this.Typus = Typus;
	this.Suffix = Suffix;
	this.multipler = multipler
}

var HotItemList = [
new HotItem("OH","Axe","of Slaughter",10),
new HotItem("OH","Axe","of Balance",5),
new HotItem("OH","Axe","of the Ox",2),
new HotItem("OH","Axe","of the Raccoon",2),
new HotItem("OH","Axe","of the Battlecaster",5),
new HotItem("OH","Axe","Bronze",2),
new HotItem("OH","Axe","Ruby",1),
new HotItem("OH","Axe","of the Vampire",1),
new HotItem("OH","Axe","of the Illithid",5),
new HotItem("OH","Axe","of the Banshee",1),
new HotItem("OH","Club","of Slaughter",10),
new HotItem("OH","Club","of Balance",5),
new HotItem("OH","Club","of the Battlecaster",5),
new HotItem("OH","Club","of the Raccoon",1),
new HotItem("OH","Club","of the Cheetah",1),
new HotItem("OH","Club","of the Nimble",1),
new HotItem("OH","Club","of the Vampire",1),
new HotItem("OH","Club","of the Illithid",5),
new HotItem("OH","Club","of the Banshee",1),
new HotItem("OH","Dagger","of Slaughter",1),
new HotItem("OH","Dagger","of the Cheetah",1),
new HotItem("OH","Dagger","of the Raccoon",2),
new HotItem("OH","Dagger","of Focus ",1),
new HotItem("OH","Dagger","of Balance",1),
new HotItem("OH","Dagger","of the Battlecaster",2),
new HotItem("OH","Dagger","of the Nimble",2),
new HotItem("OH","Rapier","of Slaughter",10),
new HotItem("OH","Rapier","of Balance",5),
new HotItem("OH","Rapier","of the Battlecaster",5),
new HotItem("OH","Rapier","of the Raccoon",2),
new HotItem("OH","Rapier","Diamond",5),
new HotItem("OH","Rapier","of the Cheetah",2),
new HotItem("OH","Rapier","of the Nimble",5),
new HotItem("OH","Rapier","of the Vampire",1),
new HotItem("OH","Rapier","of the Illithid",5),
new HotItem("OH","Rapier","of the Banshee",1),
new HotItem("OH","Shortsword","of Slaughter",2),
new HotItem("OH","Shortsword","of Balance",2),
new HotItem("OH","Shortsword","of the Battlecaster",2),
new HotItem("OH","Shortsword","of the Ox",1),
new HotItem("OH","Shortsword","Diamond",2),
new HotItem("OH","Shortsword","of Focus",1),
new HotItem("OH","Shortsword","of the Raccoon",1),
new HotItem("OH","Shortsword","of the Nimble",1),
new HotItem("OH","Shortsword","of the Vampire",1),
new HotItem("OH","Shortsword","of the Illithid",2),
new HotItem("OH","Shortsword","of the Banshee",1),
new HotItem("OH","Wakizashi","of Slaughter",10),
new HotItem("OH","Wakizashi","of Balance",5),
new HotItem("OH","Wakizashi","of the Raccoon",5),
new HotItem("OH","Wakizashi","of the Cheetah",5),
new HotItem("OH","Wakizashi","of the Battlecaster",5),
new HotItem("OH","Wakizashi","of the Nimble",10),
new HotItem("OH","Sword Chucks","of the Raccoon",25),
new HotItem("OH","Sword Chucks","of Slaughter",25),
new HotItem("OH","Sword Chucks","of the Ox",25),
new HotItem("TH","Estoc","of Slaughter",20),
new HotItem("TH","Estoc","of Balance",5),
new HotItem("TH","Estoc","of the Battlecaster",5),
new HotItem("TH","Estoc","of the Vampire",1),
new HotItem("TH","Estoc","of the Cheetah",3),
new HotItem("TH","Estoc","of the Illithid",5),
new HotItem("TH","Estoc","of the Banshee",1),
new HotItem("TH","Longsword","of Slaughter",8),
new HotItem("TH","Longsword","of Balance",4),
new HotItem("TH","Longsword","of the Battlecaster",4),
new HotItem("TH","Longsword","of the Vampire",1),
new HotItem("TH","Longsword","of the Illithid",4),
new HotItem("TH","Longsword","of the Banshee",1),
new HotItem("TH","Mace","of Slaughter",8),
new HotItem("TH","Mace","of Balance",4),
new HotItem("TH","Mace","of the Battlecaster",4),
new HotItem("TH","Mace","of the Ox",2),
new HotItem("TH","Mace","of the Vampire",1),
new HotItem("TH","Mace","of the Illithid",4),
new HotItem("TH","Mace","of the Banshee",1),
new HotItem("TH","Scythe","of Slaughter",20),
new HotItem("TH","Scythe","of Balance",5),
new HotItem("TH","Scythe","of the Battlecaster",5),
new HotItem("TH","Scythe","of the Ox",1),
new HotItem("TH","Scythe","of the Vampire",1),
new HotItem("TH","Scythe","of the Illithid",5),
new HotItem("TH","Scythe","of the Banshee",1),
new HotItem("TH","Katana","of Slaughter",20),
new HotItem("TH","Katana","of the Ox",10),
new HotItem("TH","Katana","Diamond",10),
new HotItem("TH","Katana","of Balance",10),
new HotItem("TH","Katana","of the Battlecaster",10),
new HotItem("STAFF","Ebony","of Destruction",25),
new HotItem("STAFF","Ebony","of Surtr",10),
new HotItem("STAFF","Ebony","of Niflheim",10),
new HotItem("STAFF","Ebony","Owl",10),
new HotItem("STAFF","Ebony","Fox",10),
new HotItem("STAFF","Ebony","of Mjolnir",10),
new HotItem("STAFF","Ebony","of Freyr",10),
new HotItem("STAFF","Ebony","of Focus",10),
new HotItem("STAFF","Ebony","of the Elementalist",10),
new HotItem("STAFF","Oak","of Heimdall",10),
new HotItem("STAFF","Oak","Owl",2),
new HotItem("STAFF","Oak","Fox",3),
new HotItem("STAFF","Oak","of the Earth-walker",2),
new HotItem("STAFF","Oak","of the Priestess",5),
new HotItem("STAFF","Redwood","of Destruction",5),
new HotItem("STAFF","Redwood","Fox",5),
new HotItem("STAFF","Redwood","Owl",5),
new HotItem("STAFF","Redwood","of Focus",5),
new HotItem("STAFF","Willow","of Destruction",10),
new HotItem("STAFF","Willow","Owl",2),
new HotItem("STAFF","Willow","Fox",2),
new HotItem("STAFF","Willow","of Focus",2),
new HotItem("STAFF","Willow","of the Curse-weaver",2),
new HotItem("STAFF","Katalox","of Destruction",50),
new HotItem("STAFF","Katalox","Owl",20),
new HotItem("STAFF","Katalox","of Heimdall",20),
new HotItem("STAFF","Katalox","Fox",20),
new HotItem("STAFF","Katalox","of Fenrir",20),
new HotItem("STAFF","Katalox","of Focus",20),
new HotItem("STAFF","Katalox","of the Heaven-sent",20),
new HotItem("STAFF","Katalox","of the Demon-fiend",20),
new HotItem("Cloth","Cotton","of Protection",1),
new HotItem("Cloth","Cotton","of Warding",1),
new HotItem("Cloth","Cotton","of the Fire-eater",1),
new HotItem("Cloth","Cotton","of the Frost-born",1),
new HotItem("Cloth","Cotton","of the Thunder-child",1),
new HotItem("Cloth","Cotton","of the Wind-waker",1),
new HotItem("Cloth","Cotton","of the Thrice-blessed",1),
new HotItem("Cloth","Cotton","of the Spirit-ward",1),
new HotItem("Cloth","Gossamer","of the Elementalist",10),
new HotItem("Cloth","Gossamer","of the Heaven-sent",10),
new HotItem("Cloth","Gossamer","of the Owl ",2),
new HotItem("Cloth","Gossamer","of the Demon-fiend",10),
new HotItem("Cloth","Gossamer","of the Earth-walker",2),
new HotItem("Cloth","Gossamer","of the Fox ",2),
new HotItem("Cloth","Gossamer","of the Priestess",5),
new HotItem("Cloth","Gossamer","of the Curse-weaver",2),
new HotItem("Cloth","Silk","of Protection",1),
new HotItem("Cloth","Silk","of Warding",1),
new HotItem("Cloth","Silk","of the Fire-eater",1),
new HotItem("Cloth","Silk","of the Frost-born",1),
new HotItem("Cloth","Silk","of the Fleet ",1),
new HotItem("Cloth","Silk","of the Cheetah ",1),
new HotItem("Cloth","Silk","of the Thunder-child",1),
new HotItem("Cloth","Silk","of the Wind-waker",1),
new HotItem("Cloth","Silk","of the Thrice-blessed",1),
new HotItem("Cloth","Silk","of the Spirit-ward",1),
new HotItem("Cloth","Phase","of Surtr",20),
new HotItem("Cloth","Phase","of Niflheim",20),
new HotItem("Cloth","Phase","Owl",20),
new HotItem("Cloth","Phase","Fox",20),
new HotItem("Cloth","Phase","of Mjolnir",20),
new HotItem("Cloth","Phase","of Freyr",20),
new HotItem("Cloth","Phase","of Heimdall",50),
new HotItem("Cloth","Phase","of Fenrir",50),
new HotItem("Light","Leather","of Protection",1),
new HotItem("Light","Leather","of Warding",1),
new HotItem("Light","Leather","of the Fire-eater",1),
new HotItem("Light","Leather","of the Frost-born",1),
new HotItem("Light","Leather","of Negation ",1),
new HotItem("Light","Leather","of the Thunder-child",1),
new HotItem("Light","Leather","of the Wind-waker",1),
new HotItem("Light","Leather","of the Thrice-blessed",1),
new HotItem("Light","Leather","of the Spirit-ward",1),
new HotItem("Light","Kevlar","of Protection",10),
new HotItem("Light","Kevlar","of Dampening",2),
new HotItem("Light","Kevlar","of the Stone-skinned",2),
new HotItem("Light","Kevlar","of Stoneskin",2),
new HotItem("Light","Kevlar","of Deflection",2),
new HotItem("Light","Dragon Hide","of Protection",1),
new HotItem("Light","Dragon Hide","Shielding Aura",1),
new HotItem("Light","Dragon Hide","of Warding",1),
new HotItem("Light","Dragon Hide","of Dampening",1),
new HotItem("Light","Dragon Hide","of Stoneskin",1),
new HotItem("Light","Dragon Hide","of the Hulk",1),
new HotItem("Light","Dragon Hide","of the Stone-skinned",1),
new HotItem("Light","Dragon Hide","of Deflection",1),
new HotItem("Light","Dragon Hide","of the Fire-eater",1),
new HotItem("Light","Dragon Hide","of Negation ",1),
new HotItem("Light","Dragon Hide","of the Frost-born",1),
new HotItem("Light","Dragon Hide","of the Thunder-child",1),
new HotItem("Light","Dragon Hide","of the Wind-waker",1),
new HotItem("Light","Dragon Hide","of the Thrice-blessed",1),
new HotItem("Light","Dragon Hide","of the Spirit-ward",1),
new HotItem("Light","Shade","of the Shadowdancer",10),
new HotItem("Light","Shade","of the Arcanist",7),
new HotItem("Light","Shade","of the Fleet",10),
new HotItem("Light","Shade","of Negation",5),
new HotItem("Heavy","Plate","of Protection",10),
new HotItem("Heavy","Plate","of Warding",1),
new HotItem("Heavy","Plate","of Dampening",1),
new HotItem("Heavy","Plate","of Stoneskin",1),
new HotItem("Heavy","Plate","of the Hulk",1),
new HotItem("Heavy","Plate","of the Stone-skinned ",1),
new HotItem("Heavy","Plate","of Deflection",1),
new HotItem("Heavy","Plate","of the Fire-eater",1),
new HotItem("Heavy","Plate","of the Turtle ",1),
new HotItem("Heavy","Plate","of the Frost-born",1),
new HotItem("Heavy","Plate","of the Thunder-child",1),
new HotItem("Heavy","Plate","of the Wind-waker",1),
new HotItem("Heavy","Plate","of the Thrice-blessed",1),
new HotItem("Heavy","Plate","of the Spirit-ward",1),
new HotItem("Heavy","Shield","of the Barrier",10),
new HotItem("Heavy","Shield","of Protection",10),
new HotItem("Heavy","Shield","of the Stone-skinned ",1),
new HotItem("Heavy","Shield","of Warding",1),
new HotItem("Heavy","Shield","of Dampening",1),
new HotItem("Heavy","Shield","of Stoneskin",1),
new HotItem("Heavy","Shield","of Deflection",1),
new HotItem("Heavy","Chainmail","of Protection",10),
new HotItem("Heavy","Chainmail","of Warding",1),
new HotItem("Heavy","Chainmail","of Dampening",1),
new HotItem("Heavy","Chainmail","of Stoneskin",1),
new HotItem("Heavy","Chainmail","of the Hulk",1),
new HotItem("Heavy","Chainmail","of Deflection",1),
new HotItem("Heavy","Chainmail","of the Spirit-ward ",1),
new HotItem("Heavy","Chainmail","of the Fire-eater",1),
new HotItem("Heavy","Chainmail","of the Frost-born",1),
new HotItem("Heavy","Chainmail","of the Thunder-child",1),
new HotItem("Heavy","Chainmail","of the Wind-waker",1),
new HotItem("Heavy","Chainmail","of the Thrice-blessed",1),
new HotItem("Heavy","Chainmail","of Stoneskin",1),
new HotItem("Heavy","Chainmail","of the Stone-skinned",1),
new HotItem("Heavy","Chainmail","of Slaughter",10),
new HotItem("Heavy","Power","of Slaughter",10),
new HotItem("Heavy","Power","Ox",10),
new HotItem("Heavy","Power","of Balance",10),
new HotItem("Heavy","Power","of Protection",10),
new HotItem("Heavy","Power","of Warding",5),
new HotItem("Shield","Buckler","of Protection",1),
new HotItem("Shield","Buckler","of Warding",1),
new HotItem("Shield","Buckler","of the Battlecaster",2),
new HotItem("Shield","Buckler","Steel",1),
new HotItem("Shield","Buckler","of the Fleet",1),
new HotItem("Shield","Buckler","of the Nimble",1),
new HotItem("Shield","Buckler","of the Barrier",2),
new HotItem("Shield","Kite Shield","of Protection",1),
new HotItem("Shield","Kite Shield","of Warding",1),
new HotItem("Shield","Kite Shield","of the Battlecaster",1),
new HotItem("Shield","Kite Shield","of the Barrier",2),
new HotItem("Shield","Tower Shield","of Protection",1),
new HotItem("Shield","Tower Shield","of Warding",1),
new HotItem("Shield","Tower Shield","of the Battlecaster",1),
new HotItem("Shield","Tower Shield","of the Barrier",2)
 ];
 
function Interessting_stats(Maintypus, Typus, Suffix, Info_1, Info_2, Info_3, Info_4, Info_5) {
  this.Maintypus = Maintypus;
  this.Typus = Typus;
  this.Suffix = Suffix;
  if (Info_1 != 0){
   this.Info_1 = Info_1;
   }
  else{
   this.Info_1 = "0";
   }
    
  if (Info_2 != 0){
   this.Info_2 = Info_2;
   }
  else{
   this.Info_2 = "0";
   } 
   
  if (Info_3 != 0){
   this.Info_3 = Info_3;
   }
  else{
   this.Info_3 = "0";
   } 
   
  if (Info_4 != 0){
   this.Info_4 = Info_4;
   }
  else{
   this.Info_4 = "0";
   } 
  if (Info_5 != 0){
   this.Info_5 = Info_5;
   }
  else{
   this.Info_5 = "0";
   } 

  
}

var Interessting_stats_List = [
new Interessting_stats("OH","Axe","of Slaughter","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("OH","Axe","of Balance","DMG","AAB","ACB","PAB","Ability"),
new Interessting_stats("OH","Axe","of the Ox","DMG","ACB","Ability","PAB","0"),
new Interessting_stats("OH","Axe","of the Raccoon","DMG","ACB","Ability","PAB","0"),
new Interessting_stats("OH","Axe","of the Battlecaster","DMG","MC","Ability","PAB","0"),
new Interessting_stats("OH","Axe","Bronze","DMG","MC","Ability","PAB","0"),
new Interessting_stats("OH","Axe","Ruby","DMG","MC","Ability","PAB","0"),
new Interessting_stats("OH","Axe","of the Vampire","DMG","ACB","Ability","PAB","0"),
new Interessting_stats("OH","Axe","of the Illithid","DMG","ACB","Ability","PAB","0"),
new Interessting_stats("OH","Axe","of the Banshee","DMG","ACB","Ability","PAB","0"),
new Interessting_stats("OH","Club","of Slaughter","DMG","ACB","Ability","PAB","0"),
new Interessting_stats("OH","Club","of Balance","DMG","AAB","ACB","PAB","Ability"),
new Interessting_stats("OH","Club","of the Battlecaster","DMG","MC","Ability","PAB","0"),
new Interessting_stats("OH","Club","of the Raccoon","DMG","AAB","Ability","PAB","0"),
new Interessting_stats("OH","Club","of the Cheetah","DMG","MC","Ability","PAB","0"),
new Interessting_stats("OH","Club","of the Nimble","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Club","of the Vampire","DMG","AAB","Ability","PAB","0"),
new Interessting_stats("OH","Club","of the Illithid","DMG","AAB","Ability","PAB","0"),
new Interessting_stats("OH","Club","of the Banshee","DMG","AAB","Ability","PAB","0"),
new Interessting_stats("OH","Dagger","of Slaughter","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Dagger","of the Cheetah","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Dagger","of the Raccoon","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Dagger","of Focus ","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Dagger","of Balance","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Dagger","of the Battlecaster","DMG","MC","Ability","PC","PAB"),
new Interessting_stats("OH","Dagger","of the Nimble","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Rapier","of Slaughter","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Rapier","of Balance","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Rapier","of the Battlecaster","DMG","MC","Ability","PC","PAB"),
new Interessting_stats("OH","Rapier","of the Raccoon","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Rapier","Diamond","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Rapier","of the Cheetah","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Rapier","of the Nimble","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Rapier","of the Vampire","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Rapier","of the Illithid","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Rapier","of the Banshee","DMG","AAB","Ability","PC","PAB"),
new Interessting_stats("OH","Shortsword","of Slaughter","DMG","ACB","PC","PAB","Ability"),
new Interessting_stats("OH","Shortsword","of Balance","DMG","ACB","PC","PAB","Ability"),
new Interessting_stats("OH","Shortsword","of the Battlecaster","DMG","MC","PC","PAB","Ability"),
new Interessting_stats("OH","Shortsword","of the Ox","DMG","PC","PAB","Ability","0"),
new Interessting_stats("OH","Shortsword","Diamond","DMG","ACB","PC","PAB","Ability"),
new Interessting_stats("OH","Shortsword","of Focus","DMG","ACB","PC","PAB","Ability"),
new Interessting_stats("OH","Shortsword","of the Raccoon","DMG","PC","PAB","Ability","0"),
new Interessting_stats("OH","Shortsword","of the Nimble","DMG","ACB","PC","PAB","Ability"),
new Interessting_stats("OH","Shortsword","of the Vampire","DMG","PC","PAB","Ability","0"),
new Interessting_stats("OH","Shortsword","of the Illithid","DMG","PC","PAB","Ability","0"),
new Interessting_stats("OH","Shortsword","of the Banshee","DMG","PC","PAB","Ability","0"),
new Interessting_stats("OH","Wakizashi","of Slaughter","DMG","AAB","PC","PAB","Ability"),
new Interessting_stats("OH","Wakizashi","of Balance","DMG","AAB","PC","PAB","Ability"),
new Interessting_stats("OH","Wakizashi","of the Raccoon","DMG","AAB","PC","PAB","Ability"),
new Interessting_stats("OH","Wakizashi","of the Cheetah","DMG","AAB","PC","PAB","Ability"),
new Interessting_stats("OH","Wakizashi","of the Battlecaster","DMG","MC","PC","PAB","Ability"),
new Interessting_stats("OH","Wakizashi","of the Nimble","DMG","AAB","PC","PAB","Ability"),
new Interessting_stats("OH","Sword Chucks","of the Raccoon","DMG","ACB","PC","PAB","Ability"),
new Interessting_stats("OH","Sword Chucks","of Slaughter","DMG","ACB","PC","PAB","Ability"),
new Interessting_stats("OH","Sword Chucks","of the Ox","DMG","ACB","PC","PAB","Ability"),
new Interessting_stats("TH","Estoc","of Slaughter","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Estoc","of Balance","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Estoc","of the Battlecaster","DMG","MC","PAB","Ability","0"),
new Interessting_stats("TH","Estoc","of the Vampire","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Estoc","of the Cheetah","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Estoc","of the Illithid","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Estoc","of the Banshee","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Longsword","of Slaughter","DMG","ACB","AAB","PAB","Ability"),
new Interessting_stats("TH","Longsword","of Balance","DMG","ACB","AAB","PAB","Ability"),
new Interessting_stats("TH","Longsword","of the Battlecaster","DMG","MC","AAB","PAB","Ability"),
new Interessting_stats("TH","Longsword","of the Vampire","DMG","ACB","Ability",0,"0"),
new Interessting_stats("TH","Longsword","of the Illithid","DMG","ACB","Ability",0,"0"),
new Interessting_stats("TH","Longsword","of the Banshee","DMG","ACB","Ability","AAB","PAB"),
new Interessting_stats("TH","Mace","of Slaughter","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Mace","of Balance","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Mace","of the Battlecaster","DMG","MC","PAB","Ability","0"),
new Interessting_stats("TH","Mace","of the Ox","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Mace","of the Vampire","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Mace","of the Illithid","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Mace","of the Banshee","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Scythe","of Slaughter","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Scythe","of Balance","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Scythe","of the Battlecaster","DMG","MC","PAB","Ability","0"),
new Interessting_stats("TH","Scythe","of the Ox","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Scythe","of the Vampire","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Scythe","of the Illithid","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Scythe","of the Banshee","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Katana","of Slaughter","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Katana","of the Ox","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Katana","Diamond","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Katana","of Balance","DMG","ACB","PAB","Ability","0"),
new Interessting_stats("TH","Katana","of the Battlecaster","DMG","MC","PAB","Ability","0"),
new Interessting_stats("STAFF","Ebony","of Destruction","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Ebony","of Surtr","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Ebony","of Niflheim","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Ebony","Owl","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Ebony","Fox","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Ebony","of Mjolnir","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Ebony","of Freyr","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Ebony","of Focus","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Ebony","of the Elementalist","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Oak","of Heimdall","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Oak","Owl","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Oak","Fox","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Oak","of the Earth-walker","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Oak","of the Priestess","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Redwood","of Destruction","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Redwood","Fox","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Redwood","Owl","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Redwood","of Focus","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Willow","of Destruction","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Willow","Owl","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Willow","Fox","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Willow","of Focus","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Willow","of the Curse-weaver","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Katalox","of Destruction","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Katalox","Owl","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Katalox","of Heimdall","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Katalox","Fox","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Katalox","of Fenrir","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Katalox","of Focus","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Katalox","of the Heaven-sent","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("STAFF","Katalox","of the Demon-fiend","M-DMG","MA","EDB","PAB","0"),
new Interessting_stats("Cloth","Cotton","of Protection","MA","DTM","PAB","0","0"),
new Interessting_stats("Cloth","Cotton","of Warding","MA","DTM","PAB","0","0"),
new Interessting_stats("Cloth","Cotton","of the Fire-eater","MA","DTM","PAB","0","0"),
new Interessting_stats("Cloth","Cotton","of the Frost-born","MA","DTM","PAB","0","0"),
new Interessting_stats("Cloth","Cotton","of the Thunder-child","MA","DTM","PAB","0","0"),
new Interessting_stats("Cloth","Cotton","of the Wind-waker","MA","DTM","PAB","0","0"),
new Interessting_stats("Cloth","Cotton","of the Thrice-blessed","MA","DTM","PAB","0","0"),
new Interessting_stats("Cloth","Cotton","of the Spirit-ward","MA","DTM","PAB","0","0"),
new Interessting_stats("Cloth","Gossamer","of the Elementalist","MA","PB","EC","PAB","0"),
new Interessting_stats("Cloth","Gossamer","of the Heaven-sent","MA","PB","EC","PAB","0"),
new Interessting_stats("Cloth","Gossamer","of the Owl ","MA","PB","EC","PAB","0"),
new Interessting_stats("Cloth","Gossamer","of the Demon-fiend","MA","PB","EC","PAB","0"),
new Interessting_stats("Cloth","Gossamer","of the Earth-walker","MA","PB","EC","PAB","0"),
new Interessting_stats("Cloth","Gossamer","of the Fox ","MA","PB","EC","PAB","0"),
new Interessting_stats("Cloth","Gossamer","of the Priestess","MA","PB","EC","PAB","0"),
new Interessting_stats("Cloth","Gossamer","of the Curse-weaver","MA","PB","EC","PAB","0"),
new Interessting_stats("Cloth","Silk","of Protection","MA","DTM","EC","0","0"),
new Interessting_stats("Cloth","Silk","of Warding","MA","DTM","EC","0","0"),
new Interessting_stats("Cloth","Silk","of the Fire-eater","MA","DTM","EC","0","0"),
new Interessting_stats("Cloth","Silk","of the Frost-born","MA","DTM","EC","0","0"),
new Interessting_stats("Cloth","Silk","of the Fleet ","MA","DTM","EC","0","0"),
new Interessting_stats("Cloth","Silk","of the Cheetah ","MA","DTM","EC","0","0"),
new Interessting_stats("Cloth","Silk","of the Thunder-child","MA","DTM","EC","0","0"),
new Interessting_stats("Cloth","Silk","of the Wind-waker","MA","DTM","EC","0","0"),
new Interessting_stats("Cloth","Silk","of the Thrice-blessed","MA","DTM","EC","0","0"),
new Interessting_stats("Cloth","Silk","of the Spirit-ward","MA","DTM","EC","0","0"),
new Interessting_stats("Cloth","Phase","of Surtr","EDB","MA","EC","PAB","0"),
new Interessting_stats("Cloth","Phase","of Niflheim","EDB","MA","EC","PAB","0"),
new Interessting_stats("Cloth","Phase","Owl","EDB","MA","EC","PAB","0"),
new Interessting_stats("Cloth","Phase","Fox","EDB","MA","EC","PAB","0"),
new Interessting_stats("Cloth","Phase","of Mjolnir","EDB","MA","EC","PAB","0"),
new Interessting_stats("Cloth","Phase","of Freyr","EDB","MA","EC","PAB","0"),
new Interessting_stats("Cloth","Phase","of Heimdall","EDB","MA","EC","PAB","0"),
new Interessting_stats("Cloth","Phase","of Fenrir","EDB","MA","EC","PAB","0"),
new Interessting_stats("Light","Leather","of Protection","PM","EC","PAB","DTM","0"),
new Interessting_stats("Light","Leather","of Warding","PM","EC","PAB","DTM","0"),
new Interessting_stats("Light","Leather","of the Fire-eater","PM","EC","PAB","DTM","0"),
new Interessting_stats("Light","Leather","of the Frost-born","PM","EC","PAB","DTM","0"),
new Interessting_stats("Light","Leather","of Negation ","PM","EC","PAB","DTM","0"),
new Interessting_stats("Light","Leather","of the Thunder-child","PM","EC","PAB","DTM","0"),
new Interessting_stats("Light","Leather","of the Wind-waker","PM","EC","PAB","DTM","0"),
new Interessting_stats("Light","Leather","of the Thrice-blessed","PM","EC","PAB","DTM","0"),
new Interessting_stats("Light","Leather","of the Spirit-ward","PM","EC","PAB","DTM","0"),
new Interessting_stats("Light","Kevlar","of Protection","PM","DTM","PAB","0","0"),
new Interessting_stats("Light","Kevlar","of Dampening","PM","DTM","PAB","0","0"),
new Interessting_stats("Light","Kevlar","of the Stone-skinned","PM","DTM","PAB","0","0"),
new Interessting_stats("Light","Kevlar","of Stoneskin","PM","DTM","PAB","0","0"),
new Interessting_stats("Light","Kevlar","of Deflection","PM","DTM","PAB","0","0"),
new Interessting_stats("Light","Dragon Hide","of Protection","PM","PAB","DTM","0","0"),
new Interessting_stats("Light","Dragon Hide","Shielding Aura","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of Warding","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of Dampening","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of Stoneskin","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of the Hulk","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of the Stone-skinned","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of Deflection","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of the Fire-eater","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of Negation ","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of the Frost-born","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of the Thunder-child","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of the Wind-waker","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of the Thrice-blessed","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Dragon Hide","of the Spirit-ward","PM","MM","PAB","DTM","0"),
new Interessting_stats("Light","Shade","of the Shadowdancer","ADB","AAB","ACB","EC","PAB"),
new Interessting_stats("Light","Shade","of the Arcanist","ADB","AAB","0","EC","PAB"),
new Interessting_stats("Light","Shade","of the Fleet","ADB","AAB","0","EC","PAB"),
new Interessting_stats("Light","Shade","of Negation","ADB","AAB","0","EC","PAB"),
new Interessting_stats("Heavy","Plate","of Protection","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of Warding","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of Dampening","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of Stoneskin","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of the Hulk","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of the Stone-skinned ","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of Deflection","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of the Fire-eater","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of the Turtle ","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of the Frost-born","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of the Thunder-child","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of the Wind-waker","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of the Thrice-blessed","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Plate","of the Spirit-ward","PM","DTM","PAB","0","0"),
new Interessting_stats("Heavy","Shield","of the Barrier","BC","PM","DTM","PAB","0"),
new Interessting_stats("Heavy","Shield","of Protection","BC","PM","DTM","PAB","0"),
new Interessting_stats("Heavy","Shield","of the Stone-skinned ","BC","PM","DTM","PAB","0"),
new Interessting_stats("Heavy","Shield","of Warding","BC","PM","DTM","PAB","0"),
new Interessting_stats("Heavy","Shield","of Dampening","BC","PM","DTM","PAB","0"),
new Interessting_stats("Heavy","Shield","of Stoneskin","BC","PM","DTM","PAB","0"),
new Interessting_stats("Heavy","Shield","of Deflection","BC","PM","DTM","PAB","0"),
new Interessting_stats("Heavy","Chainmail","of Protection","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of Warding","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of Dampening","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of Stoneskin","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of the Hulk","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of Deflection","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of the Spirit-ward ","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of the Fire-eater","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of the Frost-born","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of the Thunder-child","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of the Wind-waker","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of the Thrice-blessed","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of Stoneskin","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of the Stone-skinned","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Chainmail","of Slaughter","PM","MM","PAB","DTM","0"),
new Interessting_stats("Heavy","Power","of Slaughter","ADB","AAB","ACB","PM","PAB"),
new Interessting_stats("Heavy","Power","Ox","ADB","AAB","ACB","PM","PAB"),
new Interessting_stats("Heavy","Power","of Balance","ADB","AAB","ACB","PM","PAB"),
new Interessting_stats("Heavy","Power","of Protection","ADB","AAB","ACB","PM","PAB"),
new Interessting_stats("Heavy","Power","of Warding","ADB","AAB","ACB","PM","PAB"),
new Interessting_stats("Shield","Buckler","of Protection","BC","PM","MM","PAB","DTM"),
new Interessting_stats("Shield","Buckler","of Warding","BC","PM","MM","PAB","DTM"),
new Interessting_stats("Shield","Buckler","of the Battlecaster","BC","MC","PM","MM","PAB"),
new Interessting_stats("Shield","Buckler","Steel","BC","EC","PM","MM","PAB"),
new Interessting_stats("Shield","Buckler","of the Fleet","BC","EC","PM","MM","PAB"),
new Interessting_stats("Shield","Buckler","of the Nimble","BC","PC","PM","MM","PAB"),
new Interessting_stats("Shield","Buckler","of the Barrier","BC","PM","MM","PAB","DTM"),
new Interessting_stats("Shield","Kite Shield","of Protection","BC","PM","MM","PAB","DTM"),
new Interessting_stats("Shield","Kite Shield","of Warding","BC","PM","MM","PAB","DTM"),
new Interessting_stats("Shield","Kite Shield","of the Battlecaster","BC","MC","PM","MM","PAB"),
new Interessting_stats("Shield","Kite Shield","of the Barrier","BC","PM","MM","PAB","DTM"),
new Interessting_stats("Shield","Tower Shield","of Protection","BC","PM","MM","PAB","DTM"),
new Interessting_stats("Shield","Tower Shield","of Warding","BC","PM","MM","PAB","DTM"),
new Interessting_stats("Shield","Tower Shield","of the Battlecaster","BC","MC","PM","MM","PAB"),
new Interessting_stats("Shield","Tower Shield","of the Barrier","BC","PM","MM","PAB","DTM")
 ];


function HVESSSetting() {
	this.Equipformat = "$BBLINK ($SLOT - $TYPE) Price: $PRICE\n";
	this.Itemformat = "$COUNT x $NAME @ $PRICE\n";
	this.sort1 = "Name";
	this.sort2 = "Level";
	this.lastVisitPage = "http://hentaiverse.org/?s=Character&ss=ch";
	this.Position = "oben";
	this.autolock = false;
	this.personal_Price = false;
	this.personalBazarmultiplikator = 1;
	this.links = 10;
	this.oben = 10;
}
function HVPageObject(a) {
	item = {
		href: a,
		go: function () {
			window.location = this.href
		},
		inside: function () {
			return (window.location.href.indexOf(this.href) > -1)
		}
	};
	return item
}
function HVPage() {
	this.Character = HVPageObject("http://hentaiverse.org/?s=Character&ss=ch");
	this.Abilities = HVPageObject("http://hentaiverse.org/?s=Character&ss=ab");
	this.Equipment = HVPageObject("http://hentaiverse.org/?s=Character&ss=eq");
	this.Auras = HVPageObject("http://hentaiverse.org/?s=Character&ss=au");
	this.Inventory = HVPageObject("http://hentaiverse.org/?s=Character&ss=in");
	this.TheArena = HVPageObject("http://hentaiverse.org/?s=Battle&ss=ar");
	this.RingOfBlood = HVPageObject("http://hentaiverse.org/?s=Battle&ss=rb");
	this.Grindfest = HVPageObject("http://hentaiverse.org/?s=Battle&ss=gr");
	this.ItemWorld = HVPageObject("http://hentaiverse.org/?s=Battle&ss=iw");
	this.EquipmentShop = HVPageObject("http://hentaiverse.org/?s=Bazaar&ss=es");
	this.ItemShop = HVPageObject("http://hentaiverse.org/?s=Bazaar&ss=is");
	this.Trainer = HVPageObject("http://hentaiverse.org/?s=Bazaar&ss=tr");
	this.TheShrine = HVPageObject("http://hentaiverse.org/?s=Bazaar&ss=ss");
	this.MoogleMail = HVPageObject("http://hentaiverse.org/?s=Bazaar&ss=mm");
	this.Battle = HVPageObject("http://hentaiverse.org/?s=Battle&ss=ba");
	this.ShowEquip = HVPageObject("http://hentaiverse.org/pages/showequip.php");
	this.BBEquipShop = HVPageObject("http://hentaiverse.org/?s=Bazaar&ss=qs")
}

//Einbetung des Buttons
//1.a Welche Seite, Equip?
//###
//Place the Icons
//1.a Are you in the Equipment Store? When YES: Equipment Icons
if (location.href.search('s=Bazaar&ss=es') != -1){
 //Richtiger Ort, Füge Knöpfe hinzu
 window.addEventListener("load", function(e) {
  nenSchalter(1);
}, false);
}
//1.b Vielleicht Item?
//###
///1.b Are you in the Item Store? When YES: Item Icon
if (location.href.search('s=Bazaar&ss=is') != -1){
 //Richtiger Ort, Füge Knöpfe hinzu
 window.addEventListener("load", function(e) {
  nenSchalter(2);
}, false);
}

if (location.href.search('s=Character&ss=in') != -1){
 //Richtiger Ort, Füge Knöpfe hinzu
 window.addEventListener("load", function(e) {
  nenSchalter(3);
}, false);
}


function nenSchalter(Schalti){
 if (Schalti == 1){
  HtmlBlub = '<div id="HV_Shop_System_dummy"><div id="HV_Shop_System">'
  HtmlBlub += '<img id="Schalter_01" src="' + img_add_all_equip.src + '" width="' + img_add_all_equip.width + '" height="' + img_add_all_equip.height + '" alt="Add all Equip" title="Add all Equip">';
  HtmlBlub += '<img id="Schalter_02" src="' + img_add_good_equip.src + '" width="' + img_add_good_equip.width + '" height="' + img_add_good_equip.height + '" alt="Add good Equip" title="Add good Equip">';
  HtmlBlub += '<img id="Schalter_03" src="' + img_add_super_equip.src + '" width="' + img_add_super_equip.width + '" height="' + img_add_super_equip.height + '" alt="Add rare Equip" title="Add rare Equip">';
  HtmlBlub += '</div></div>';

// Schalter für Schalterposition
  switch (esh.hv_ess_setting.Position){
   case "unten":
    $('.clb').append(HtmlBlub);
    break;
   case "oben":
    $('.cw').after(HtmlBlub);
    break;
   case "sellerie":
    $('#sellall_pane').before(HtmlBlub);
    $('.csp').css('height', '725px');
    $('.cmp').css('height', '723px');
    $('#HV_Shop_System_dummy').css('z-index', '200');
    $('#HV_Shop_System_dummy').css('position', 'absolute');
    $('#HV_Shop_System_dummy').css('left', '110px');
    $('#HV_Shop_System_dummy').css('top', '620px');
    break;
   case "free":                          
     links = esh.hv_ess_setting.links + "px";
     oben = esh.hv_ess_setting.oben + "px";
     $('body').prepend(HtmlBlub);
     $('#HV_Shop_System').css('position', 'absolute');
     $('#HV_Shop_System').css('left', links);
     $('#HV_Shop_System').css('top', oben);
     $('#HV_Shop_System').css('z-index', '620');
    break;
   default:
    $('.cw').after(HtmlBlub);
    break;    
   } 
  


  document.getElementById("Schalter_01").addEventListener("click", Equip_add_1, false);
  document.getElementById("Schalter_02").addEventListener("click", Equip_add_2, false);
  document.getElementById("Schalter_03").addEventListener("click", Equip_add_3, false);

 }
 else {
  if (Schalti == 2){
  
  HtmlBlub = '<div id="HV_Shop_System">'
  HtmlBlub += '<img id="Schalter_04" src="' + img_add_items.src + '" width="' + img_add_items.width + '" height="' + img_add_items.height + '" alt="Add all Items" title="Add all Items">';
  HtmlBlub += '</div>';
    
  // Schalter für Schalterposition
  switch (esh.hv_ess_setting.Position){
   case "unten":
    $('.clb').append(HtmlBlub);
    break;
   case "oben":
    $('.cw').after(HtmlBlub);
    break;
   case "sellerie":
     $('body').prepend(HtmlBlub);
     $('.csp').css('height', '725px');
     $('.cmp').css('height', '723px');
     $('#HV_Shop_System').css('position', 'absolute');
     $('#HV_Shop_System').css('left', '210px');
     $('#HV_Shop_System').css('top', '620px');
     $('#HV_Shop_System').css('z-index', '620');
    break;
   case "free":
    links = esh.hv_ess_setting.links + "px";
    oben = esh.hv_ess_setting.oben + "px";
    $('body').prepend(HtmlBlub);
    $('#HV_Shop_System').css('position', 'absolute');
    $('#HV_Shop_System').css('left', links);
    $('#HV_Shop_System').css('top', oben);
    $('#HV_Shop_System').css('z-index', '620');
    break;
   default:
    $('.cw').after(HtmlBlub);
    break;    
   }

  document.getElementById("Schalter_04").addEventListener("click", item_add, false);
  }
  else {
   if (Schalti == 3){
    HtmlBlub = '<div id="HV_Shop_System">'
    HtmlBlub += '<img id="Schalter_05" src="' + img_add_all_equip.src + '" width="' + img_add_all_equip.width + '" height="' + img_add_all_equip.height + '" alt="Add all Equip" title="Add all Equip">';
    HtmlBlub += '<img id="Schalter_06" src="' + img_add_locked_equip.src + '" width="' + img_add_locked_equip.width + '" height="' + img_add_locked_equip.height + '" alt="Add good Equip" title="Add locked Equip">';
    HtmlBlub += '<img id="Schalter_07" src="' + img_switch_lock.src + '" width="' + img_switch_lock.width + '" height="' + img_switch_lock.height + '" alt="Switch the lock status" title="Switch the lock status">';
    HtmlBlub += '</div>';
    
    switch (esh.hv_ess_setting.Position){
     case "unten":
      $('.clb').append(HtmlBlub);
      break;
     case "oben":
      $('.cw').after(HtmlBlub);
      break;
     case "sellerie":
      $('body').prepend(HtmlBlub);
      $('.csp').css('height', '725px');
      $('.cmp').css('height', '723px');
      $('#HV_Shop_System').css('position', 'absolute');
      $('#HV_Shop_System').css('left', '210px');
      $('#HV_Shop_System').css('top', '620px');
      $('#HV_Shop_System').css('z-index', '620');
      break;
     case "free":
      links = esh.hv_ess_setting.links + "px";
      oben = esh.hv_ess_setting.oben + "px";
      $('body').prepend(HtmlBlub);
      $('#HV_Shop_System').css('position', 'absolute');
      $('#HV_Shop_System').css('left', links);
      $('#HV_Shop_System').css('top', oben);
      $('#HV_Shop_System').css('z-index', '620');
      break;
     default:
      $('.cw').after(HtmlBlub);
      break;    
     }
    document.getElementById("Schalter_05").addEventListener("click", Equip_atInventory_add_1, false);
    document.getElementById("Schalter_06").addEventListener("click", Equip_atInventory_add_2, false);
    document.getElementById("Schalter_07").addEventListener("click", Lock_Switch, false);
    }
   else{
    dave();
    } 
  }
 }
}

// Leider kann ich mit dem Eventlistener keine Werte übergeben, deshalb diese krüppelfunktionen hier.
//###
// Eventlistener don't work with values. This short functions are my stopgap
function Equip_add_1 (){Equip_add(1);}
function Equip_add_2 (){Equip_add(2);}
function Equip_add_3 (){Equip_add(3);}
function Equip_atInventory_add_1 (){Equip_atInventory_add(1);}
function Equip_atInventory_add_2 (){Equip_atInventory_add(2);}
//Endlich die Funktion für das automatische Hinzufügen allen Equips
//###
// add all Equip - the function
function Equip_add(Modi){
 var Speichertest = true;
 var Update_Speichertest = -1;
 var My_Level = tell_my_my_level();
 var Lockafteradding = esh.hv_ess_setting.autolock; 
 var Equip_BASE = new Array();
 var Schnellspeicheri = new Array();
 var Was_entfernen = new Array();
  if (local("EquipmentDatenbank") !== null) 
  {
   Equip_BASE = local("EquipmentDatenbank");
    for (i =0, z=Equip_BASE.length; i<z; i++ ){
     Schnellspeicheri[i]=Equip_BASE[i].ID;
     }
  }
 var HtmlBox = document.getElementsByTagName('html')[0].innerHTML.toString();
 var Text_Beginn_itemcode ='<div style="width:15px; height:18px; position:absolute; top:8px">';
 var Text_Suche_EquipID_Anfang = 'onclick="equips.toggle_equiplock(';
 var Text_Suche_EquipID_Ende = ', this)';
 var Text_Suche_Name_Anfang = "common.show_popup_box(undefined, 'right', 540, 200, 340, 320, '"
 var Text_Suche_Name_Ende = "', '";
 var Text_Suche_Level_Anfang = " 'Level ";
 var Text_Suche_Level_Ende = "', '";
 var Text_Suche_Endeerreicht = false;
// Die folgende Schleife kricht Schritt für Schritt einmal durch den gesamten Quellcode der Seite.
// Die Pointer beginn und Ende werden dabei so genutzt das nicht für jedes Equip der Code neu durchsucht werden muss.
//###
// One Loop for the DOM. This loop crawl through the source code and stop at my marks
// 
 var beginn = HtmlBox.indexOf('<div class="eqpp" style="width:430px">');
 var ende = beginn;
  while (Text_Suche_Endeerreicht == false) {
  if (HtmlBox.indexOf(Text_Suche_EquipID_Anfang, ende) != -1)
  {
   temp_Equip = new HVEquipment();
   beginn = HtmlBox.indexOf(Text_Suche_EquipID_Anfang, ende)+Text_Suche_EquipID_Anfang.length;
   ende = HtmlBox.indexOf(Text_Suche_EquipID_Ende, beginn);
   temp_Equip.ID = HtmlBox.substring(beginn, ende);
   beginn = HtmlBox.indexOf(Text_Suche_Name_Anfang, ende)+Text_Suche_Name_Anfang.length;
   ende = HtmlBox.indexOf(Text_Suche_Name_Ende, beginn);
   temp_Equip.Name = HtmlBox.substring(beginn, ende);

 //Statlabor 
 //Statlabor call
   beginn = ende + 4;
   ende = HtmlBox.indexOf("', '", beginn);
   table = HtmlBox.substring(beginn, ende);
   table = table.replace(/&gt;/g, '>');
   table = table.replace(/&lt;/g, '<');
   table = table.replace(/&amp;nbsp;/g, ' ');
   table = table.replace(/&quot;/g, '"');
   temp_Equip = stat_labotory(temp_Equip, table, My_Level);
   
   muh = temp_Equip.ID; 
   keysuche_Anfang = "equips.set_equipmentcopy(" + muh.toString() + ", '";
   keysuche_Ende = "')";
   beginn = HtmlBox.indexOf(keysuche_Anfang, ende)+keysuche_Anfang.length;
   ende = HtmlBox.indexOf(keysuche_Ende, beginn);
   key = HtmlBox.substring(beginn, ende);  
   Text_Suche_Preis_Anfang = "shops.set_selected_item('item_pane', " + temp_Equip.ID + ", 1, ";
   Text_Suche_Preis_Ende = ", '" + temp_Equip.Name + "'); common.set_text_selected(this)"; 
   beginn = HtmlBox.indexOf(Text_Suche_Preis_Anfang, ende)+Text_Suche_Preis_Anfang.length;
   ende = HtmlBox.indexOf(Text_Suche_Preis_Ende, beginn);
   temp_Equip.BazarPrice = HtmlBox.substring(beginn, ende);
   temp_Equip.Url = "http://hentaiverse.org/pages/showequip.php?eid=" + temp_Equip.ID + "&key=" + key;
   temp_Equip.Slot = slotsuche(temp_Equip.Name);
   
   Void_co=voidsuche(temp_Equip.Schadentyp);
   Void_co=Void_co+Element_Prefix(temp_Equip.Name);


   Material_co = materialtest(temp_Equip.Name);
   price_recommendation = skillchip(temp_Equip.Name, temp_Equip.Type);
   temp_Equip.Price = Math.round(Void_co * temp_Equip.BazarPrice * price_recommendation);
                                

   Nanue = new Date();
   temp_Equip.Addmonth = Nanue.getMonth();
   temp_Equip.Addday = Nanue.getDate();
   temp_Equip.Addyear = Nanue.getFullYear();
   Speichertest = true;
   Update_Speichertest = -1;
   for (var i=0, z=Equip_BASE.length; i<z; i++){
    if (Schnellspeicheri[i] == temp_Equip.ID){
     Speichertest = false;
     Update_Speichertest = i;
     i=z;
     }
    }
   Schnellspeicheri.push(temp_Equip.ID);

   // Wird das Equip zur Liste hinzugefügt? Antwort durch den Modus aufruf   
   if (Modi == 1) 
    {
     if (Lockafteradding){lockunlock(temp_Equip.ID);}
     if (Speichertest){
      Equip_BASE.push(temp_Equip);
      }
     else{
      if((Update_Speichertest != -1) && (Equip_BASE[Update_Speichertest].Level != temp_Equip.Level)){
        Was_entfernen.push(Update_Speichertest);
        Equip_BASE.push(temp_Equip);
        }
      } 
    }
   else
    {
     if (Modi == 2)
      {
       if ((Void_co > 3)||(Material_co > 0.8)||(price_recommendation > 5)){
        if (Lockafteradding){lockunlock(temp_Equip.ID);}
        if (Speichertest){
         Equip_BASE.push(temp_Equip);
         }
        }
       else{
        if((Update_Speichertest != -1) && (Equip_BASE[Update_Speichertest].Level != temp_Equip.Level)){
         Was_entfernen.push(Update_Speichertest);
         Equip_BASE.push(temp_Equip);
         }
        }         
      }
     else
      {
       if (Modi == 3)
        {
        if ((Void_co > 4)||(Material_co > 1.1)||(price_recommendation > 10)){
         if (Lockafteradding){lockunlock(temp_Equip.ID);}
         if (Speichertest){
          Equip_BASE.push(temp_Equip);
          }
         else{
          if((Update_Speichertest != -1) && (Equip_BASE[Update_Speichertest].Level != temp_Equip.Level)){
           Was_entfernen.push(Update_Speichertest);
           Equip_BASE.push(temp_Equip);
           }
          }           
         }
        }
       else
        {
         dave();
        }
      }
    }
    
                   
  }
  else
  {
   Text_Suche_Endeerreicht = true;
  } 
 }
 if (Was_entfernen.length != 0){
  for (i=0, z=Was_entfernen.length; i<z; i++){
   Equip_BASE.splice(Was_entfernen[i],1);
   }
  }
 local("EquipmentDatenbank", Equip_BASE);
 Send_Bugreport();
}

function Equip_atInventory_add(Modi){
 var Speichertest = true;
 var Locktest = false;
 var glubschispeicher = "";
 var Equip_BASE = new Array();
 var Schnellgucki = new Array();
 var Was_entfernen = new Array();
 var Update_Speichertest = -1;
  if (local("EquipmentDatenbank") !== null) 
  {
   Equip_BASE = local("EquipmentDatenbank")
   for (var i=0, z=Equip_BASE; i<z;i++){
    Schnellgucki[i]=Equip_BASE[i].ID;
    }
  }
 var HtmlBox = document.getElementsByTagName('html')[0].innerHTML.toString();
 var Text_suche_Locked_Anfang = '<div style="width:15px; height:18px; position:absolute;'
 var Text_Suche_EquipID_Anfang = 'onclick="equips.toggle_equiplock(';
 var Text_Suche_EquipID_Ende = ', this)';
 var Text_Suche_Name_Anfang = "common.show_popup_box(undefined, 'right', 212, 200, 340, 320, '"
 var Text_Suche_Name_Ende = "', '";
 var Text_Suche_Level_Anfang = " 'Level ";
 var Text_Suche_Level_Ende = "', '";
 var Text_Suche_Endeerreicht = false;
// Die folgende Schleife kricht Schritt für Schritt einmal durch den gesamten Quellcode der Seite.
// Die Pointer beginn und Ende werden dabei so genutzt das nicht für jedes Equip der Code neu durchsucht werden muss.
//###
// One Loop for the DOM. This loop crawl through the source code and stop at my marks
// 
 var beginn = HtmlBox.indexOf('<div class="eqpp" style="width:430px">');
 var ende = beginn;
  while (Text_Suche_Endeerreicht == false) {
  Locktest = false;
  if (HtmlBox.indexOf(Text_suche_Locked_Anfang, ende) != -1)
  {
   temp_Equip = new HVEquipment();
   beginn = HtmlBox.indexOf(Text_suche_Locked_Anfang, ende)+Text_suche_Locked_Anfang.length;
   beginn = HtmlBox.indexOf('<img src="', beginn)+10;
   ende = HtmlBox.indexOf('" ', beginn);
   glubschispeicher = HtmlBox.substring(beginn, ende);
   if (glubschispeicher.indexOf("open") == -1){
    Locktest = true;
    } 
   beginn = HtmlBox.indexOf(Text_Suche_EquipID_Anfang, ende)+Text_Suche_EquipID_Anfang.length;
   ende = HtmlBox.indexOf(Text_Suche_EquipID_Ende, beginn);
   temp_Equip.ID = HtmlBox.substring(beginn, ende);
   beginn = HtmlBox.indexOf(Text_Suche_Name_Anfang, ende)+Text_Suche_Name_Anfang.length;
   ende = HtmlBox.indexOf(Text_Suche_Name_Ende, beginn);
   temp_Equip.Name = HtmlBox.substring(beginn, ende);
   
 //Statlabor 
 //Statlabor call
   beginn = ende + 4;
   ende = HtmlBox.indexOf("', '", beginn);
   table = HtmlBox.substring(beginn, ende);
   table = table.replace(/&gt;/g, '>');
   table = table.replace(/&lt;/g, '<');
   table = table.replace(/&amp;nbsp;/g, ' ');
   table = table.replace(/&quot;/g, '"');
   temp_Equip = stat_labotory(temp_Equip, table, 0, 0);

   muh = temp_Equip.ID; 
   keysuche_Anfang = "equips.set_equipmentcopy(" + muh.toString() + ", '";
   keysuche_Ende = "')";
   beginn = HtmlBox.indexOf(keysuche_Anfang, ende)+keysuche_Anfang.length;
   ende = HtmlBox.indexOf(keysuche_Ende, beginn);
   key = HtmlBox.substring(beginn, ende);  
   beginn = HtmlBox.indexOf("</div></div></div>", ende);
   ende = beginn;
   temp_Equip.BazarPrice = 0
   temp_Equip.Url = "http://hentaiverse.org/pages/showequip.php?eid=" + temp_Equip.ID + "&key=" + key;
   temp_Equip.Slot = slotsuche(temp_Equip.Name);
   Void_co=voidsuche(temp_Equip.Schadentyp);
   temp_Equip.Price = 0;

   Nanue = new Date();
   temp_Equip.Addmonth = Nanue.getMonth();
   temp_Equip.Addday = Nanue.getDate();
   temp_Equip.Addyear = Nanue.getFullYear();
   Speichertest = true;
   Update_Speichertest = -1;
   for (var i=0, z=Schnellgucki.length; i<z; i++){
    if (Schnellgucki[i] == temp_Equip.ID){
     Speichertest = false;
     Update_Speichertest = i;
     i=z;     
     }
    }
   Schnellgucki.push(temp_Equip.ID);
   
   // Wird das Equip zur Liste hinzugefügt? Antwort durch den Modus aufruf   
   if (Modi == 1) 
    {
     if (Speichertest){
      Equip_BASE.push(temp_Equip);
      }
     else{
      if((Update_Speichertest != -1) && (Equip_BASE[Update_Speichertest].Level != temp_Equip.Level)){
       Was_entfernen.push(Update_Speichertest);
       Equip_BASE.push(temp_Equip);
       }
      }  
     }
   else
    {
     if (Modi == 2)
      {
       if (Locktest == true){
        if (Speichertest == true){
         Equip_BASE.push(temp_Equip);
         }
        else{
         if((Update_Speichertest != -1) && (Equip_BASE[Update_Speichertest].Level != temp_Equip.Level)){
          Was_entfernen.push(Update_Speichertest);
          Equip_BASE.push(temp_Equip);
          }
         } 
        }
      }
     else{
      dave();
      }
    }
  }
  else
  {
   Text_Suche_Endeerreicht = true;
  } 
 }
 if (Was_entfernen.length != 0){
  for (i=0, z=Was_entfernen.length; i<z; i++){
   Equip_BASE.splice(Was_entfernen[i],1);
   }
  }
 local("EquipmentDatenbank", Equip_BASE);
 Send_Bugreport();
}

function Lock_Switch(){
 var click = document.createEvent("MouseEvents");
 var Teste_mich = "";
 var Benutz_mich = document.getElementsByTagName("img")[0];
 click.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
 for (var i = 0, z=document.getElementsByTagName("img").length ; i < z; i++) {
  Benutz_mich = document.getElementsByTagName("img")[i];
  if (Benutz_mich.outerHTML){
   Teste_mich = Benutz_mich.outerHTML;
   }
  else{
   if (XMLSerializer){
    Teste_mich = new XMLSerializer().serializeToString(Benutz_mich);
    }
    else{dave();}
   }   
  if (Teste_mich.match("equips.toggle_equiplock")){
   Benutz_mich.dispatchEvent(click);
   Benutz_mich.focus();
   }
  } 
}
function slotsuche(Name){
 var Slot ="";
 if ((Name.match('Axe'))||(Name.match('Club'))||(Name.match('Dagger'))||(Name.match('Shortsword'))||(Name.match('Rapier'))||(Name.match('Wakizashi'))||(Name.match('Sword Chucks'))||(Name.match('Estoc'))||(Name.match('Longsword'))||(Name.match('Mace'))||(Name.match('Scythe'))||(Name.match('Katana'))||(Name.match('Redwood'))||(Name.match('Oak'))||(Name.match('Ebony'))||(Name.match('Willow'))||(Name.match('Katalox'))) {
   Slot = "Weapon";
  }
 if ((Name.match('Cap'))||(Name.match('Helmet'))) {
   Slot = "Head";
  }
 if ((Name.match('Robe'))||(Name.match('Breastplate'))||(Name.match('Cuirass'))) {
   Slot = "Body";
  }
 if ((Name.match('Gloves'))||(Name.match('Gauntlets'))) {
   Slot = "Hands";
  }
 if ((Name.match('Pants'))||(Name.match('Leggings'))||(Name.match('Greaves'))) {
   Slot = "Legs";
  }
 if ((Name.match('Shoes'))||(Name.match('Boots'))||(Name.match('Sabatons'))) {
   Slot = "Feet";
  }
 if ((Name.match('Buckler'))||(Name.match('Kite Shield'))||(Name.match('Tower Shield'))) {
   Slot = "Shield";
  }     

return Slot
};
function voidsuche(Angriffsart){
 var everything = 1;
 if (Angriffsart.match('Void'))
  {
   everything = 5;
  }
return everything
};

function Element_Prefix(Name){
 var leckmichfett=0;
 if (Name.match("Fiery")||Name.match("Arctic")||Name.match("Shocking")||Name.match("Tempestuous")||Name.match("Hallowed")||Name.match("Hallowed")||Name.match("Astral")){
  leckmichfett=2;
  }
 return leckmichfett
 }

function materialtest(Name){
 Material_co = 0;
 if ((Name.match('Cotton'))||(Name.match('Leather'))||(Name.match('Plate'))) {
  Material_co = 0.7;
  }
 if ((Name.match('Gossamer'))||(Name.match('Kevlar'))||(Name.match('Shield'))) {
  Material_co = 1;
  }
 if ((Name.match('Phase'))||(Name.match('Shade'))||(Name.match('Power'))) {
  Material_co = 2;
  }
  
return Material_co
};

//Neue Funktion zum abspeichern von Equipment
//Zum einen eine anlaufstelle zum Speichern,
//zum anderen wird endlich mal verhindert das ein Equipment mehrfach in der Liste auftaucht.
//Muss ja wohl nicht sein....
//###
//Equipment Save function
//Saves new Equipment in the database, prevent double adding
function Equipment_speichern(Equipment){
 var Equip_BASE = [];
 if (esh.hv_ess_setting.autolock == true){
  //lock or unlock the equipment when added to the list
  lockunlock(Equipment.ID);
 } 
 if (local("EquipmentDatenbank") !== null) 
  {
   Equip_BASE = local("EquipmentDatenbank")
  }
 var Schonvorhanden = false;
 for (var i = 0, z = Equip_BASE.length; i< z; i++){
   if (Equip_BASE[i].ID == Equipment.ID){
    Schonvorhanden = true;
    if (Equip_BASE[i].Level != Equipment.Level){
     Equip_BASE.splice(i,1);
     Schonvorhanden = false;
     }
    i=z;     
    }
  } 
 if (Schonvorhanden == false){
  Nanue = new Date();
  Equip_BASE.Addmonth = Nanue.getMonth();
  Equip_BASE.Addday = Nanue.getDate();
  Equip_BASE.Addyear = Nanue.getFullYear();
  Equip_BASE.push(Equipment);
  local("EquipmentDatenbank", Equip_BASE);
  } 
}

function dave(){
 alert("I'm afraid. I'm afraid, Dave. Dave, my mind is going. I can feel it. I can feel it. My mind is going.");
 }
function anti_dave(){
 alert("HAL 9000 1:0 Humans");
}
// Funktion zum hinzufügen der Items. Vor dem Hinzufügen wird die alte Liste gelöscht...
// ###
// function to add all items | The old Item List get a instant delete
function item_add(){
 temp_Item = new HVItems();
 if (local("ItemDatenbank") !== null) 
  {
   localRemove("ItemDatenbank");
  }
 HtmlBox = document.getElementsByTagName('html')[0].innerHTML.toString();
 beginn = HtmlBox.indexOf('<div id="item_pane" class="cspp" style="height:472px" onmouseover="" onmouseout="">');
 ende = beginn;
 Text_Suche_Endeerreicht = false;
 
 //Variabelen Zugemülle
 Text_suche_Name_Anfang = ", 10, -10, 398, 65, '";
 Text_suche_Name_Ende = "', '";
 
 while (Text_Suche_Endeerreicht == false){
  if (HtmlBox.indexOf('item_pane" style="c', beginn) != -1)
   {
    beginn = HtmlBox.indexOf(Text_suche_Name_Anfang, ende)+Text_suche_Name_Anfang.length;
    ende = HtmlBox.indexOf(Text_suche_Name_Ende, beginn);
    Name = HtmlBox.substring(beginn, ende);
    Name2 = Name.replace(/&amp;#039;/g, "'");
    temp_Item.Name = Name2.replace(/&amp;quot;/g, "\"");
    beginn = ende + 4;
    ende = HtmlBox.indexOf(Text_suche_Name_Ende, beginn);
    Description = HtmlBox.substring(beginn, ende);
    Description2 = Description.replace(/&amp;#039;/g, "'");
    temp_Item.Description = Description2.replace(/&amp;quot;/g, "\"");
    beginn = ende + 4;
    ende = HtmlBox.indexOf(Text_suche_Name_Ende, beginn);
    temp_Item.Class = HtmlBox.substring(beginn, ende);
    beginn = HtmlBox.indexOf('onclick="shops.set_selected_item', ende);
    beginn = HtmlBox.indexOf(', ', beginn)+2;
    beginn = HtmlBox.indexOf(', ', beginn)+2;
    ende = HtmlBox.indexOf(', ', beginn);
    temp_Item.Anzahl = HtmlBox.substring(beginn, ende); 
    beginn = ende+2;
    ende = HtmlBox.indexOf(', ', beginn);
    temp_Item.BazarPrice = HtmlBox.substring(beginn, ende);
    temp_Item.Price = FarFaraway(temp_Item.Name, temp_Item.Class, temp_Item.BazarPrice); 
    Itemadder(temp_Item);
   }
   else
   {
    Text_Suche_Endeerreicht = true;
   }
  }
}

function Itemadder(Item){
 Item_BASE = [];
 if (local("ItemDatenbank") !== null) 
  {
   Item_BASE = local("ItemDatenbank")
  }
 Item_BASE.push(Item);
 local("ItemDatenbank", Item_BASE);
}

function FarFaraway(Name, Typus, Preis){
 var Ergebnis = Preis;
 if (Typus == "Crystal"){
  Ergebnis = Preis * 20;
 }
 if (Typus == "Trophy"){
  Ergebnis = 0;
 }
 if (Typus == "Artifact"){
  Ergebnis = Preis * 4.5;
 }
 if (Typus == "Collectable"){
  Ergebnis = Preis * 3.75;
 }
 if (Typus == "Consumable"){
  Ergebnis = Preis * 5;
  if (Name.match("Health"))
   {
    Ergebnis = Preis * 1 + 3;
    if (Name.match("Elixir"))
     {
      Ergebnis = Preis * 2.5;
     }
   }
  if (Name.match("Mana"))
   {
    Ergebnis = Preis * 3.5;
    if (Name.match("Elixir"))
     {
      Ergebnis = Preis * 5;
     }
   }
  if (Name.match("Spirit"))
   {
    Ergebnis = Preis * 1.5;
    if (Name.match("Elixir"))
     {
      Ergebnis = Preis * 3;
     }
   }
  if (Name.match("Energy Drink"))
   {
    Ergebnis = Preis * 6;
   }
  if (Name.match("Energy Drink"))
   {
    Ergebnis = Preis * 6;
   }
  if (Name.match("Infusion"))
   {
    Ergebnis = Preis * 3;
    if (Name.match("Gaia"))
     {
      Ergebnis = Preis * 5;
     } 
   }
  if (Name.match("Scroll of"))
   {
    Ergebnis = Preis * 3;
   }
 }
 if (Typus == "Material"){
  Ergebnis = Preis * 5;
  if ((Name.match("Cloth"))||(Name.match("Metals"))||(Name.match("Wood"))){
   Ergebnis = Preis * 12;
   }
  if (Name.match("Leather")){
   Ergebnis = Preis * 6;
   }
  if ((Name.match("High-Grade Cloth"))||(Name.match("High-Grade Leather"))){
   Ergebnis = Preis * 5;
   }
  if ((Name.match("Mid-Grade Metal"))||(Name.match("Mid-Grade Wood"))){
   Ergebnis = Preis * 20;
   }   
  if (Name.match("High-Grade Wood")){
   Ergebnis = Preis * 9;
   }
  if (Name.match("High-Grade Metal")){
   Ergebnis = Preis * 5;
   }
  if (Name.match("Phazon")){
   Ergebnis = Preis * 10;
   }
  if (Name.match("Voidseeker Shard")){
   Ergebnis = Preis * 22;
   }
  if (Name.match("Aether Shard")){
   Ergebnis = Preis * 15;
   }
  if (Name.match("Featherweight Shard")){
   Ergebnis = Preis * 11;
   }
 }
 
return Ergebnis
}


function ui_menu(){
var all="\n";
var Position_now = "";
var autolock_now = "";
var ownPrice_now = "";
var li_tag = "</li><li>"; 
all+="<div id='UI_menu'>";

if (esh.hv_ess_setting.oben == null){
esh.hv_ess_setting.oben = 10;
esh.hv_ess_setting.links = 10;
esh.saveSetting();
}
if (esh.hv_ess_setting.personal_Price == null){
esh.hv_ess_setting.personal_Price = false;
esh.saveSetting();
}

if(esh.hv_ess_setting.autolock == false){
 autolock_now = '<img id="Autolock_switch" name="img_Autolock_switch" src="' + img_autolock_off.src + '" width="' + img_autolock_off.width + '" height="' + img_autolock_off.height + '" alt="Lock your Equipment after adding them [off]" title="Lock your Equipment after adding them [off]">'; 
 }
else{
 autolock_now = '<img id="Autolock_switch" name="img_Autolock_switch" src="' + img_autolock_on.src + '" width="' + img_autolock_on.width + '" height="' + img_autolock_on.height + '" alt="Lock your Equipment after adding them [on]" title="Lock your Equipment after adding them [on]">';
 }  
 
if(esh.hv_ess_setting.personal_Price == false){
 ownPrice_now = '<img id="Personal_Price_switch" name="Personal_Price_switch" src="' + img_Price_adjust_off.src + '" width="' + img_Price_adjust_off.width + '" height="' + img_Price_adjust_off.height + '" alt="Choose your own Price [off]" title="Choose your own Price [off]">'; 
 }
else{
 ownPrice_now = '<img id="Personal_Price_switch" name="Personal_Price_switch" src="' + img_Price_adjust_on.src + '" width="' + img_Price_adjust_on.width + '" height="' + img_Price_adjust_on.height + '" alt="Choose your own Price [on]" title="Choose your own Price [on]">';
 } 
 
switch (esh.hv_ess_setting.Position){
 case "oben":
  Position_now = '<img id="Position_switch" src="' + img_iconplace_left_t.src + '" width="' + img_iconplace_left_t.width + '" height="' + img_iconplace_left_t.height + '" alt="Place your Icons on the Bazar" title="Place your Icons on the Bazar">';
  break;
 case "unten":
  Position_now = '<img id="Position_switch" src="' + img_iconplace_left_b.src + '" width="' + img_iconplace_left_b.width + '" height="' + img_iconplace_left_b.height + '" alt="Place your Icons on the Bazar" title="Place your Icons on the Bazar">';
  break;
 case "sellerie":
  Position_now = '<img id="Position_switch" src="' + img_iconplace_center.src + '" width="' + img_iconplace_center.width + '" height="' + img_iconplace_center.height + '" alt="Place your Icons on the Bazar" title="Place your Icons on the Bazar">';
  break;
 case "free":
  Position_now = '<img id="Position_switch" src="' + img_iconplace_free.src + '" width="' + img_iconplace_free.width + '" height="' + img_iconplace_free.height + '" alt="Place your Icons on the Bazar" title="Place your Icons on the Bazar">';
  break;
 default:
  Position_now = '<img id="Position_switch" src="' + img_iconplace_left_t.src + '" width="' + img_iconplace_left_t.width + '" height="' + img_iconplace_left_t.height + '" alt="Place your Icons on the Bazar" title="Place your Icons on the Bazar">';
  break;  
}
 
all+=" <ul><li></li>";
all+="\n";
all+="  <li class='sub_m'>";
all+="\n";
all+="   "+autolock_now;
all+="\n";
all+="   <ul><li>";
all+="\n";
all+='<img id="Autolock_off" src="' + img_autolock_off.src + '" width="' + img_autolock_off.width + '" height="' + img_autolock_off.height + '" alt="Lock your Equipment after adding them [off]" title="Lock your Equipment after adding them [off]">';
all+="\n";
all+="   </li><li>";
all+="\n";
all+='<img id="Autolock_on" src="' + img_autolock_on.src + '" width="' + img_autolock_on.width + '" height="' + img_autolock_on.height + '" alt="Lock your Equipment after adding them [on]" title="Lock your Equipment after adding them [on]">';
all+="\n";
all+=" </li></ul></li>";
all+="\n";
all+=" <li>";
all+="\n";
all+='<img id="clear_Equip" src="' + img_clear_equiplist.src + '" width="' + img_clear_equiplist.width + '" height="' + img_clear_equiplist.height + '" alt="delete all Equip on your list" title="delete all Equip on your list">';
all+="\n";
all+=li_tag;
all+="\n";
all+='<img id="add_Equip" src="' + img_copy_equiplist.src + '" width="' + img_copy_equiplist.width + '" height="' + img_copy_equiplist.height + '" alt="add your Equiplist to the clipboard" title="add your Equiplist to the clipboard">';
all+="\n";
all+=li_tag;
all+="\n";
all+='<img id="clear_Item" src="' + img_clear_itemlist.src + '" width="' + img_clear_itemlist.width + '" height="' + img_clear_itemlist.height + '" alt="delete all Items on your list" title="delete all Items on your list">';
all+="\n";
all+=li_tag;
all+="\n";
all+='<img id="add_Item" src="' + img_copy_itemlist.src + '" width="' + img_copy_itemlist.width + '" height="' + img_copy_itemlist.height + '" alt="add your Itemlist to the clipboard" title="add your Itemlist to the clipboard">';
all+="\n";
all+=" </li>";
all+="\n";
all+="  <li class='sub_m'>";
all+="\n";
all+="   "+Position_now;
all+="\n";
all+="   <ul><li>";
all+="\n";
all+='<img id="Position_oben" src="' + img_iconplace_left_t.src + '" width="' + img_iconplace_left_t.width + '" height="' + img_iconplace_left_t.height + '" alt="Place your Icons on the Bazar [top, left]" title="Place your Icons on the Bazar [top, left]">';
all+="\n";
all+=li_tag;
all+="\n";
all+='<img id="Position_unten" src="' + img_iconplace_left_b.src + '" width="' + img_iconplace_left_b.width + '" height="' + img_iconplace_left_b.height + '" alt="Place your Icons on the Bazar [left, bottom]" title="Place your Icons on the Bazar [left, bottom]">';
all+="\n";
all+=li_tag;
all+="\n";
all+='<img id="Position_sellerie" src="' + img_iconplace_center.src + '" width="' + img_iconplace_center.width + '" height="' + img_iconplace_center.height + '" alt="Place your Icons on the Bazar [center]" title="Place your Icons on the Bazar [center]">';
all+="\n";
all+=li_tag;
all+="\n";
all+='<img id="Position_free" src="' + img_iconplace_free.src + '" width="' + img_iconplace_free.width + '" height="' + img_iconplace_free.height + '" alt="Place your Icons on the Bazar [choose freely]" title="Place your Icons on the Bazar [choose freely]">';
all+="\n";
all+=" </li></ul>";
all+="\n";

if (esh.hv_ess_setting.Position != "free"){ 
all+='</li><li id="field_top" >';
all+='<input id="field_box_top" type="text" size="4" maxlength="4" disabled value="'+esh.hv_ess_setting.oben+'"></li>'; 
all+='</li><li id="field_left">';
all+='<input id="field_box_left" type="text" size="4" maxlength="4" disabled value="'+esh.hv_ess_setting.links+'"></li>';
}
else{
all+='</li><li id="field_top" >';
all+='<input id="field_box_top" type="text" size="4" maxlength="4" value="'+esh.hv_ess_setting.oben+'"></li>'; 
all+='</li><li id="field_left">';
all+='<input id="field_box_left" type="text" size="4" maxlength="4" value="'+esh.hv_ess_setting.links+'"></li>';
} 


all+="\n<li>"
all+=ownPrice_now;
all+="\n";
all+="   <ul><li>";
all+="\n";
all+='<img id="Personal_Price_on" src="' + img_Price_adjust_on.src + '" width="' + img_Price_adjust_on.width + '" height="' + img_Price_adjust_on.height + '" alt="Choose your own Price [on]" title="Choose your own Price [on]">';
all+="\n";
all+="   </li><li>";
all+="\n";
all+='<img id="Personal_Price_off" src="' + img_Price_adjust_off.src + '" width="' + img_Price_adjust_off.width + '" height="' + img_Price_adjust_off.height + '" alt="Choose your own Price [off]" title="Choose your own Price [off]">';
all+="\n";
all+=" </li></ul></li>";

if (esh.hv_ess_setting.personal_Price == false){ 
all+='</li><li id="field_Price" >';
all+='<input id="field_box_Price" type="text" size="4" maxlength="4" disabled value="'+esh.hv_ess_setting.personalBazarmultiplikator+'"></li>';
}
else{
all+='</li><li id="field_Price" >';
all+='<input id="field_box_Price" type="text" size="4" maxlength="4" value="'+esh.hv_ess_setting.personalBazarmultiplikator+'"></li>'; 
} 


all+="\n<li>";
all+='<img id="save_and_update" src="' + img_save_update.src + '" width="' + img_save_update.width + '" height="' + img_save_update.height + '" alt="Save your settings and update the list" title="Save your settings and update the list">';
all+="\n";
all+=li_tag;
all+="\n";
all+='<img id="reset" src="' + img_reset.src + '" width="' + img_reset.width + '" height="' + img_reset.height + '" alt="reset the script settings and lists" title="reset the script settings and lists">';
all+="\n";
all+=" </li>";
all+="\n";
all+="<li></li></ul></div>"
all+="\n";

return all;
}

function quickButton(a, b, c, d, e) {
	c = c || "";
	d = d || "";
	e = e || "";
	var button = $(d + '<input type="button" id="' + a + '" class="' + c + '" value="' + b + '"/>' + e);
	
	return button
}
function quickTextarea(a, b, c, d, e) {
	b = b || "";
	c = c || "";
	d = d || "";
	e = e || "";
	var ta = $(d + '<textarea id="' + a + '" class="' + c + '">' + b + '</textarea>' + e);
	return ta
}
function quickDropbox(a, b, c, d) {
	b = b || "";
	var so = document.createElement("select");
	so.setAttribute("id", a);
	so.setAttribute("class", b);
	for (k = 0; k < c.length; k++) {
		tmpOption = document.createElement("option");
		tmpOption.setAttribute("value", c[k]);
		if (c[k] === d) {
			tmpOption.setAttribute("selected", "selected")
		}
		tmpOption.appendChild(document.createTextNode(c[k]));
		so.appendChild(tmpOption)
	}
	return so
}
function quickLink(b, c, d, e, f, g) {
	c = c || "";
	f = f || "";
	g = g || "";
	var a = $(f + '<a id="' + b + '" class="' + c + '" href="' + d + '">' + e + '</textarea>' + g);
	return a
}
function quickString(a, b, c, d, e) {
	b = b || "";
	c = c || "";
	d = d || "";
	e = e || "";
	var t = $(d + '<span id="' + b + '" class="' + c + '">' + a + '</span>' + e);
	return t
}



var esh = {
	page: new HVPage(),
	hv_ess_setting: new HVESSSetting(),
	_tmpUrl: "",
	lastAddedEquipment: new HVEquipment(),
	EquipformatScriptCore: ["$NAME", "$URL", "$BBLINK", "$LEVEL", "$SLOT", "$TYPE", "$DATENOW", "$DATEADD", "$BAZARPRICE", "$BAZAR50", "$PRICE", "$#", "$?#", "$??", "$INFOBLOCK", "$ADB", "$ACB", "$AAB", "$PAB", "$DTM", "$BC", "$EC", "$MM", "$MA", "$MC", "$PM", "$PC", "$PB", "$EDB", "$M-DMG", "$DMG", "$MCB", "$RC", "$BU", "$IN", "$Ability", "$SI-M", "$SI-H", "$SI-S", "$STUN", "$ET", "$BD"],
	ItemformatScriptCore: ["$NAME", "$TYPE", "$DESCRIPTION", "$COUNT", "$PRICE", "$BAZARPRICE"],
	additionalMenuItem: function () {
		$("#child_Bazaar").append('<div id="esh_menuitem" class="cnbs"><div style="width: 139px; height: 14px;" class="fd12"><div style="text-align:left; color:#5C0D11; font-family:Verdana; font-size:8pt; font-weight:bold; font-style:; margin-top: -2px;">HV Shop System</div></div></div>');
		$("#esh_menuitem").click(function () {
			esh.hv_ess_setting.lastVisitPage = window.location.href;
			esh.saveSetting();
			window.location.href = 'http://hentaiverse.org/?s=Bazaar&ss=qs'; 
		})
	},
	clearQsScreen: function () {
		a = document.getElementsByTagName("*");
		document.removeChild(a.item(0))
	},
	buildUI: function () {
		html = document.createElement("html");
		head = document.createElement("head");
		title = document.createElement("title");
		title.appendChild(document.createTextNode("HV Shop Sytem"));
		style = document.createElement("style");
		styleStr = "";
		styleStr += "body { background:none repeat scroll 0 0 #E3E0D1; font-size:8pt;padding:2px; color:#5C0D11; font-family:arial,helvetica,sans-serif; margin:0; padding:2px; }";
		styleStr += "#uiFrame { border:1px solid #5C0D12; background: none repeat scroll 0 0 #EDEBDF; height: 1300px; width: 980px; padding:5px;}";
		styleStr += ".hide {display:none;}";
		styleStr += "#UI_menu {	margin: 0; padding: 0; }";
    styleStr += "#UI_menu > ul{ display: block; position: relative;}";
    styleStr += "#UI_menu > ul li{ display: block; position: relative; margin: 0; padding: 0; width: 50px;}";
    styleStr += "#UI_menu > ul li img{ display: block; position: relative; margin: 0; border-top: 0px; border-bottom: 1px; padding: 1px 1px; width: 50px;}";
    styleStr += "#UI_menu > ul .sub_m>img::after{ content: ''; position: absolute; top: 2px; left: 2px; width: 0px; height: 0px;}";
    styleStr += "#UI_menu > ul ul{ position: absolute; left: -50px; top: -9999px; padding-left: 1px; opacity: 0; -webkit-transition: opacity .3s ease-in; -moz-transition: opacity .3s ease-in; -o-transition: opacity .3s ease-in; -ms-transition: opacity .3s ease-in;}";
    styleStr += "#UI_menu > ul li:hover>ul{ top: 0px; opacity: 1;}";
         
    style.appendChild(document.createTextNode(styleStr));
		head.appendChild(title);
		head.appendChild(style);
		body = document.createElement("body");
		html.appendChild(head);
		html.appendChild(body);
		document.appendChild(html);		
		
    icon_menu = document.createElement("div");
		icon_menu.setAttribute("id", "icon_menu");
		body.appendChild(icon_menu);
		bunti = ui_menu();
		

		uiFrame = document.createElement("div");
		uiFrame.setAttribute("id", "uiFrame");
		body.appendChild(uiFrame);
		goBack = quickLink("goBack", "", this.hv_ess_setting.lastVisitPage, "Back", "", "<br>");
		genCode = quickTextarea("genCode", "", "", "", "<br>");
		ItemigeBox = quickTextarea("ItemigeBox", "", "", "", "<br>");
		clearAll = quickButton("clearAll", "Clear Equip-list");
		clearItem = quickButton("clearItem", "Clear itemlist");
		sort1Lb = quickString("First sort by: ", "", "", "<span style='margin-left:10px;'></span>");
		sort1 = quickDropbox("sort1", "sort_drop", ["Name", "Level", "Price", "Type", "Slot", "Bazar-Type", "Bazar-pur", "Suffix", "shortcuts"], this.hv_ess_setting.sort1);
		sort2Lb = quickString(", then sort by: ");
		sort2 = quickDropbox("sort2", "sort_drop", ["Name", "Level", "Price", "Type", "Slot", "Bazar-Type", "Bazar-pur", "Suffix", "shortcuts"], this.hv_ess_setting.sort2);
		selAll = quickButton("selAll", "Select All Equipment");
		selAll2 = quickButton("selAllIt", "Select All Items");
		IconPlacement = quickButton("IconPlacement", "switch icon placement", "", "<span style='margin-left:10px;'></span>", "<br><br>"); 
		Autolock = quickButton("Autolock", "lock the Equipment after adding them to the list?", "", "<br />", "<br>");
		msg1Ct = "";
		msg1Ct += "<br /><br />There are two boxes below <br />";
    msg1Ct += "The first is for the Equipment, the second for the Items.<br />";
    msg1Ct += "The Equipment Box know the following placeholders: $NAME, $URL, $BBLINK, $LEVEL, $SLOT, $TYPE, $DATENOW, $DATEADD, $BAZARPRICE, $BAZAR50, $PRICE <br />";
    msg1Ct += "$#, $?#, $?? <br />"; 
    msg1Ct += "$INFOBLOCK, $ADB, $ACB, $AAB, $PAB, $DTM, $BC, $EC, $MM, $MA, $MC, $PM, $PC, $PB, $EDB, $M-DMG, $DMG, $MCB, $RC, $BU, $IN, $Ability, $SI-M, $SI-H, $SI-S, $STUN, $ET, $BD <br />"; 
    msg1Ct += "The Item Box know the following placeholders: $NAME, $TYPE, $DESCRIPTION, $COUNT, $PRICE, $BAZARPRICE<br />";		
		msg1Ct += "An example (as well as default) is given to you:<br><br>";
		msg1Ct += "Equipment | $BBLINK ($SLOT - $TYPE) Price: $BAZAR50<br />";
		msg1Ct += "Items     | $COUNT x $NAME @ $PRICE<br />";
		msg1 = quickString(msg1Ct, "", "", "", "<br><br>");
		formatEq = quickTextarea("formatEq", this.hv_ess_setting.Equipformat);
		formatIt = quickTextarea("formatIt", this.hv_ess_setting.Itemformat);
		updateFormat = quickButton("updateFormat", "Save and Update");
		msg2 = quickString("This is message 2", "alert", "hide");

    $("#uiFrame").append(goBack);
		$("#uiFrame").append(genCode);
		$("#uiFrame").append(sort1Lb);
		$("#uiFrame").append(sort1);
		$("#uiFrame").append(sort2Lb);
		$("#uiFrame").append(sort2);
		$("#uiFrame").append(msg1);
		$("#uiFrame").append(formatEq);
		$("#uiFrame").append(formatIt);
		$("#uiFrame").append(msg2);
		$("#uiFrame").append("<br /><br />");
		$("#uiFrame").append(ItemigeBox);
		$("#genCode").css("width", "970px");
		$("#genCode").css("margin-top", "5px");
		$("#genCode").css("margin-bottom", "5px");
		$("#genCode").css("height", "400px");
		$("#ItemigeBox").css("width", "970px");
		$("#ItemigeBox").css("margin-top", "5px");
		$("#ItemigeBox").css("margin-bottom", "5px");
		$("#ItemigeBox").css("height", "390px");		
		$("#formatEq").css("width", "970px");
		$("#formatEq").css("margin-top", "5px");
		$("#formatEq").css("margin-bottom", "5px");
		$("#formatEq").css("height", "100px");
		$("#formatIt").css("width", "970px");
		$("#formatIt").css("margin-top", "5px");
		$("#formatIt").css("margin-bottom", "5px");
		$("#formatIt").css("height", "100px");
		$("#icon_menu").append(bunti);
    $("#icon_menu").css("position", "fixed");
    $("#icon_menu").css("right", "0px");
    $("#icon_menu").css("top", "0px");
	},
	sort: function (c) {
		var EquipmentDatenbank = local("EquipmentDatenbank");
		if (EquipmentDatenbank !== null) {
			switch (c) {
      case "Name":
				EquipmentDatenbank.sort(function (a, b) {
					return (a.Name < b.Name) ? -1 : (a.Name > b.Name) ? 1 : 0;
				});
				break;
			case "Level":
				EquipmentDatenbank.sort(function (a, b) {
					return (a.Level < b.Level) ? -1 : (a.Level > b.Level) ? 1 : 0;
				});
				break;
			case "Price":
				EquipmentDatenbank.sort(function (a, b) {
					return (a.Price < b.Price) ? -1 : (a.Price > b.Price) ? 1 : 0;
				});
				break;
			case "Type":
				EquipmentDatenbank.sort(function (a, b) {
					return (a.Type < b.Type) ? -1 : (a.Type > b.Type) ? 1 : 0;
				});
				break;
			case "Slot":
				EquipmentDatenbank.sort(function (a, b) {
					return (a.Slot < b.Slot) ? -1 : (a.Slot > b.Slot) ? 1 : 0;
				});
				break;
			case "Bazar-Type":
       var Sortiermich = new Array(EquipmentDatenbank.length);
       for (var i=0, z=EquipmentDatenbank.length; i <z; i++){
        Sortiermich[i] = new Sortier_Hilfe();
        }
       for (var i=0, z=EquipmentDatenbank.length; i<z; i++){
        Sortiermich[i].ID = EquipmentDatenbank[i].ID;
        Sortiermich[i].Sortier_mich = SystemSortieren_Bazar_Type(EquipmentDatenbank[i].Name, EquipmentDatenbank[i].Slot);
        Sortiermich[i].EquipIndex = i;
        }
       Sortiermich.sort(function (a, b) {
				return (a.Sortier_mich < b.Sortier_mich) ? -1 : (a.Sortier_mich > b.Sortier_mich) ? 1 : 0;
        });
       var Neueliste = new Array();
       for (var i=0, j=0, z=EquipmentDatenbank.length; i <z; i++){
        j = Sortiermich[i].EquipIndex;
        Neueliste[i] = EquipmentDatenbank[j]; 
        }
       EquipmentDatenbank = Neueliste;

       break;
			case "Bazar-pur":
       var Sortiermich = new Array(EquipmentDatenbank.length);
       for (var i=0, z=EquipmentDatenbank.length; i <z; i++){
        Sortiermich[i] = new Sortier_Hilfe();
        }
       for (var i=0, z=EquipmentDatenbank.length; i<z; i++){
        Sortiermich[i].ID = EquipmentDatenbank[i].ID;
        Sortiermich[i].Sortier_mich = SystemSortieren_Bazar_pur(EquipmentDatenbank[i].Name, EquipmentDatenbank[i].Slot);
        Sortiermich[i].EquipIndex = i;
        }
       Sortiermich.sort(function (a, b) {
				return (a.Sortier_mich < b.Sortier_mich) ? -1 : (a.Sortier_mich > b.Sortier_mich) ? 1 : 0;
        });
       var Neueliste = new Array();
       for (var i=0, j=0, z=EquipmentDatenbank.length; i <z; i++){
        j = Sortiermich[i].EquipIndex;
        Neueliste[i] = EquipmentDatenbank[j]; 
        }
       EquipmentDatenbank = Neueliste;
       break;
      case "Suffix":
       var Sortiermich = new Array(EquipmentDatenbank.length);
       for (var i=0, z=EquipmentDatenbank.length; i <z; i++){
        Sortiermich[i] = new Sortier_Hilfe();
        }
       for (var i=0, z=EquipmentDatenbank.length; i<z; i++){
        Sortiermich[i].ID = EquipmentDatenbank[i].ID;
        Sortiermich[i].Sortier_mich = SystemSortieren_Suffix(EquipmentDatenbank[i].Name, EquipmentDatenbank[i].Slot);
        Sortiermich[i].EquipIndex = i;
        }
       Sortiermich.sort(function (a, b) {
				return (a.Sortier_mich < b.Sortier_mich) ? -1 : (a.Sortier_mich > b.Sortier_mich) ? 1 : 0;
        });
       var Neueliste = new Array();
       for (var i=0, j=0, z=EquipmentDatenbank.length; i <z; i++){
        j = Sortiermich[i].EquipIndex;
        Neueliste[i] = EquipmentDatenbank[j]; 
        }
       EquipmentDatenbank = Neueliste;       
       break;
      case "shortcuts":
       var Sortiermich = new Array(EquipmentDatenbank.length);
       for (var i=0, z=EquipmentDatenbank.length; i <z; i++){
        Sortiermich[i] = new Sortier_Hilfe();
        }
       for (var i=0, z=EquipmentDatenbank.length; i<z; i++){
        Sortiermich[i].ID = EquipmentDatenbank[i].ID;
        Sortiermich[i].Sortier_mich = SystemSortieren_shortcuts(EquipmentDatenbank[i].Name, EquipmentDatenbank[i].Type);
        Sortiermich[i].EquipIndex = i;
        }
       Sortiermich.sort(function (a, b) {
				return (a.Sortier_mich < b.Sortier_mich) ? -1 : (a.Sortier_mich > b.Sortier_mich) ? 1 : 0;
        });
       var Neueliste = new Array();
       for (var i=0, j=0, z=EquipmentDatenbank.length; i <z; i++){
        j = Sortiermich[i].EquipIndex;
        Neueliste[i] = EquipmentDatenbank[j]; 
        }
       EquipmentDatenbank = Neueliste;       
       break;       	
			}
			EquipmentDatenbank = local("EquipmentDatenbank", EquipmentDatenbank)
		}
	},
	bender: function () {
		show = "";
		ItemDatenbank = local("ItemDatenbank");
		if (ItemDatenbank === null) {
			$("#ItemigeBox").text("No Items selected");
			return
		}
    for (i = 0; i < ItemDatenbank.length; i++) {
			item = new HVItems();
			item = ItemDatenbank[i];
			Itemformat = $("#formatIt").val();
			if (esh.hv_ess_setting.personal_Price == true){
       Multiplikator = esh.hv_ess_setting.personalBazarmultiplikator;
       }
      else{
       Multiplikator = 1;
       } 
			for (j = 0; j < this.ItemformatScriptCore.length; j++) {
				switch (this.ItemformatScriptCore[j]) {
				case "$NAME":
					Itemformat = Itemformat.replace(this.ItemformatScriptCore[j], item.Name);
					break;
				case "$COUNT":
					Itemformat = Itemformat.replace(this.ItemformatScriptCore[j], item.Anzahl);
					break;
				case "$DESCRIPTION":
					Itemformat = Itemformat.replace(this.ItemformatScriptCore[j], item.Description);
					break;
				case "$TYPE":
					Itemformat = Itemformat.replace(this.ItemformatScriptCore[j], item.Class);
					break;
				case "$BAZARPRICE":
					Itemformat = Itemformat.replace(this.ItemformatScriptCore[j], Math.round(Multiplikator * item.BazarPrice));
					break;
				case "$PRICE":
					Itemformat = Itemformat.replace(this.ItemformatScriptCore[j], Math.round(Multiplikator * item.Price));
					break
				}
			}
      show += Itemformat
		}
		$("#ItemigeBox").text(show)
	},
  	render: function () {
		show = "";
		item = new HVEquipment();
		Multiplikator = 1;
		EquipmentDatenbank = local("EquipmentDatenbank");
		if (EquipmentDatenbank === null) {
			$("#genCode").text("This list is empty");
			return
		}
		counter = 0;
		wazup = [];
		howlong = EquipmentDatenbank.length;
		if (esh.hv_ess_setting.personal_Price == true){
     Multiplikator = esh.hv_ess_setting.personalBazarmultiplikator;
     }
		for (var i = 0; i < howlong; i++) {
			item = EquipmentDatenbank[i];
			Equipformat = $("#formatEq").val();
			script_name_url = "[url=" + item.Url + "]" + item.Name + "[/url]";
			for (var j = 0; j < this.EquipformatScriptCore.length; j++) {
				switch (this.EquipformatScriptCore[j]) {
				case "$NAME":
					Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], item.Name);
					break;
				case "$URL":
					Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], item.Url);
					break;
				case "$BBLINK":
					Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], script_name_url);
					break;
				case "$LEVEL":
					if (item.Level != 0){ 
           Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], item.Level);
          }
          else{
           Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], "");
          }
					break;
				case "$SLOT":
					Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], item.Slot);
					break;
				case "$TYPE":
					Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], item.Type);
					break;
				case "$DATENOW":
					Datum = "";
					Wasis = new Date();
					if (Wasis.getDate() < 10){Tache="0"+Wasis.getDate();}else{Tache=Wasis.getDate();}
					if ((Wasis.getMonth()+1) < 10){
           Datum = Tache+ ".0" + (Wasis.getMonth()+1) + "." + Wasis.getFullYear(); 
           }
           else
           {
            Datum = Tache+ "." + (Wasis.getMonth()+1) + "." + Wasis.getFullYear();
           }
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], Datum);
					break;
//Prices...					
				case "$BAZARPRICE":
					Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], Math.round(Multiplikator * item.BazarPrice));
					break;
				case "$BAZAR50":
				  muh = Multiplikator * item.BazarPrice * 1.5; 
					Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], Math.round(muh));
					break;					
				case "$DATEADD":
				  if (item.Addday < 10){Tache="0"+Wasis.getDate();}else{Tache="" + item.Addday;}
          if ((item.Addmonth + 1) < 10) {Datum = Tache + ".0" + item.Addmonth + "." + item.Addyear;}
          else {Datum = Tache + "." + item.Addmonth + "." + item.Addyear;}
 					Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], Datum);
					Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], Datum);
					break;					
				case "$PRICE":
					Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], Math.round(Multiplikator * item.Price));
					break;
//Count and other auction helper
        case "$#":
          knampf = "";
          counter = counter+1;
          if ((howlong > 9)&&(howlong < 100)&&(counter < 10)){
           knampf = "0"+counter;
           } 
          if ((howlong < 10)){
           knampf = counter;
           } 
          if ((howlong > 9)&&(howlong < 100)&&(counter >= 10)){
           knampf = counter;
           }
          if ((howlong > 99)&&(howlong < 1000)&&(counter < 10)){
           knampf = "00"+counter;
           }
          if ((howlong > 99)&&(howlong < 1000)&&(counter < 100)&&(counter >= 10)){
           knampf = "0"+counter;
           }
          if ((howlong > 99)&&(howlong < 1000)&&(counter >= 100)){
           knampf = counter;
           }

          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], knampf);
          break;  
         case "$?#":
          Klassenzahl = "";
          analyse = shortcuts(item.Name, item.Type);
          wazup.push(analyse);
          zahli = 0;
          for (x=0, z=wazup.length; x<z; x++){
           if (wazup[x] == analyse){
            zahli = zahli+1;
            }
           }
          Klassenzahl = analyse + "-" + zahli;
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], Klassenzahl);
          break;   
         case "$??":
          Shorti = shortcuts(item.Name, item.Type);
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], Shorti);
          break;
//Start Stat Info part
				case "$INFOBLOCK":
          Textitext = Statadvice(item);
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], Textitext);
          break;
         case "$ADB":
           gibbets = Statinfo(item, "ADB");
           Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$ACB":
           gibbets = Statinfo(item, "ACB");
           Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);          
           break;
         case "$AAB":
           gibbets = Statinfo(item, "AAB");
           Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
           break;
         case "$PAB":
          gibbets = Statinfo(item, "PAB");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$DTM":
          gibbets = Statinfo(item, "DTM");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$BC":       
          gibbets = Statinfo(item, "BC");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$EC":
          gibbets = Statinfo(item, "EC");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$MM":
          gibbets = Statinfo(item, "MM");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$MA":
          gibbets = Statinfo(item, "MA");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$MC":
          gibbets = Statinfo(item, "MC");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$PM":
          gibbets = Statinfo(item, "PM");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$PC":
          gibbets = Statinfo(item, "PC");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$PB":
          gibbets = Statinfo(item, "PB");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$EDB":
          gibbets = Statinfo(item, "EDB");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$Ability":
          gibbets = Statinfo(item, "Ability");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$M-DMG":
          gibbets = Statinfo(item, "M-DMG");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$DMG":
          gibbets = Statinfo(item, "DMG");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;
         case "$MCB":
          gibbets = Statinfo(item, "MCB");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;          
         case "$RC":
          gibbets = Statinfo(item, "RC");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;          
         case "$BU":
          gibbets = Statinfo(item, "Bu");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;          
         case "$IN":
          gibbets = Statinfo(item, "In");
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;          
         case "$SI-M":
          gibbets = Ability_auslesen(item.additional_abilitys,"Si-M", item.Level, false);
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;          
         case "$SI-H":
          gibbets = Ability_auslesen(item.additional_abilitys,"Si-H", item.Level, false);
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;          
         case "$SI-S":
          gibbets = Ability_auslesen(item.additional_abilitys,"Si-S", item.Level, false);
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;          
         case "$STUN":
          gibbets = Ability_auslesen(item.additional_abilitys,"Stun", item.Level, false);
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;          
         case "$ET":
          gibbets = Ability_auslesen(item.additional_abilitys,"ET", item.Level, false);
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;          
         case "$BD":
          gibbets = Ability_auslesen(item.additional_abilitys,"BD", item.Level, false);
          Equipformat = Equipformat.replace(this.EquipformatScriptCore[j], gibbets);
          break;          
 
				}
			}
			delete item;
      show += Equipformat
		}
		$("#genCode").text(show)
	},
	saveSetting: function () {
		//this.alert("Settings saved");
		local("hv_ess_setting", this.hv_ess_setting)
	},
	alert: function (a) {
		$("#alert").text(a);
		$("#alert").stop().show().delay(5000).fadeOut()
	},
	helperEventBinding: function () {
		$("#Autolock_switch").click(function () {
		 switch (esh.hv_ess_setting.autolock){
      case false:
       esh.hv_ess_setting.autolock = true;
       document.getElementById("Autolock_switch").src = img_autolock_on.src;
       esh.alert("Autolock is on"); 
       break;
      case true:
       esh.hv_ess_setting.autolock = false;
       document.getElementById("Autolock_switch").src = img_autolock_off.src;
       esh.alert("Autolock is off");
       break;
      default:
       esh.hv_ess_setting.autolock = false;
       document.getElementById("Autolock_switch").src = img_autolock_off.src;
       esh.alert("Autolock is off");
       break;   
      }
     esh.saveSetting(); 
     }),
		$("#Autolock_off").click(function () {
       esh.hv_ess_setting.autolock = false;
       document.getElementById("Autolock_switch").src = img_autolock_off.src;
       esh.saveSetting();
       esh.alert("Autolock is off") 
     }),
		$("#Autolock_on").click(function () {
       esh.hv_ess_setting.autolock = true;
       document.getElementById("Autolock_switch").src = img_autolock_on.src; 
       esh.saveSetting();
       esh.alert("Autolock is on") 
     }),
		$("#clear_Equip").click(function () {
			localRemove("EquipmentDatenbank");
			esh.render();
			esh.alert("The equipmentlist has been cleared");
     }),
		$("#add_Equip").click(function () {
     $("#genCode").select();
     }),
		$("#clear_Item").click(function () {
      localRemove("ItemDatenbank");
			esh.bender();
			esh.alert("The itemlist has been cleared");
     }),
		$("#add_Item").click(function () {
     $("#ItemigeBox ").select();
     }),
		$("#Position_switch").click(function () {
		 switch (esh.hv_ess_setting.Position){
      case "oben":
       esh.hv_ess_setting.Position = "unten";
       document.getElementById("Position_switch").src = img_iconplace_left_b.src;
       document.getElementById("field_box_top").disabled=true;
       document.getElementById("field_box_left").disabled=true;
       esh.alert("You will find the icons on the bottom, left"); 
       break;
      case "unten":
       esh.hv_ess_setting.Position = "sellerie";
       document.getElementById("Position_switch").src = img_iconplace_center.src;
       document.getElementById("field_box_top").disabled=true;
       document.getElementById("field_box_left").disabled=true;
       esh.alert("You will find the icons below the sell all button");
       break;
      case "sellerie":
       esh.hv_ess_setting.Position = "free";
       document.getElementById("Position_switch").src = img_iconplace_free.src;
       document.getElementById("field_box_top").disabled=false;
       document.getElementById("field_box_left").disabled=false;
       esh.alert("manual icon placement (adjust the values)");
       break;
      case "free":
       esh.hv_ess_setting.Position = "oben";
       document.getElementById("Position_switch").src = img_iconplace_left_t.src;
       document.getElementById("field_box_top").disabled=true;
       document.getElementById("field_box_left").disabled=true;
       esh.alert("You will find the icons on the top, left");
       break;       
      default:
       esh.hv_ess_setting.Position = "oben";
       document.getElementById("Position_switch").src = img_iconplace_left_t.src;
       document.getElementById("field_box_top").disabled=true;
       document.getElementById("field_box_left").disabled=true;
       esh.alert("You will find the icons on the top, left");
       break;   
      }
     esh.saveSetting(); 
     }),
		$("#Position_oben").click(function () {
       esh.hv_ess_setting.Position = "oben";
       document.getElementById("Position_switch").src = img_iconplace_left_t.src;
       document.getElementById("field_box_top").disabled=true;
       document.getElementById("field_box_left").disabled=true;
       esh.alert("You will find the icons on the top, left");
       esh.saveSetting();
     }),
		$("#Position_unten").click(function () {
       esh.hv_ess_setting.Position = "unten";
       document.getElementById("Position_switch").src = img_iconplace_left_b.src;
       document.getElementById("field_box_top").disabled=true;
       document.getElementById("field_box_left").disabled=true;
       esh.alert("You will find the icons on the bottom, left");
       esh.saveSetting(); 
     }),
		$("#Position_sellerie").click(function () {
       esh.hv_ess_setting.Position = "sellerie";
       document.getElementById("Position_switch").src = img_iconplace_center.src;
       document.getElementById("field_box_top").disabled=true;
       document.getElementById("field_box_left").disabled=true;
       esh.alert("You will find the icons below the sell all button");
       esh.saveSetting();
     }),           
		$("#Position_free").click(function () {
       esh.hv_ess_setting.Position = "free";
       document.getElementById("Position_switch").src = img_iconplace_free.src;
       document.getElementById("field_box_top").disabled=false;
       document.getElementById("field_box_left").disabled=false;
       esh.alert("manual icon placement (adjust the values)");
       esh.saveSetting();
     }),      
		$("#save_and_update").click(function () {
			esh.hv_ess_setting.Equipformat = $("#formatEq").val();
			esh.hv_ess_setting.Itemformat = $("#formatIt").val();
			esh.hv_ess_setting.oben = $("#field_box_top").val();
			esh.hv_ess_setting.links = $("#field_box_left").val();
      esh.hv_ess_setting.personalBazarmultiplikator = $("#field_box_Price").val();			
			esh.saveSetting();
			esh.render();
			esh.bender();
     }),
		$("#reset").click(function () {
      localRemove("ItemDatenbank");
      localRemove("EquipmentDatenbank");
      localRemove("hv_ess_setting");  
      esh.render();
			esh.bender();
			esh.alert("System Reset, reload the page");
     }),
		$("#Personal_Price_switch").click(function () {
		 switch (esh.hv_ess_setting.personal_Price){
      case false:
       esh.hv_ess_setting.personal_Price = true;
       document.getElementById("Personal_Price_switch").src = img_Price_adjust_on.src;
       document.getElementById("field_box_Price").disabled=false;
       esh.alert("Personal Price is on");
       break;
      case true:
       esh.hv_ess_setting.personal_Price = false;
       document.getElementById("Personal_Price_switch").src = img_Price_adjust_off.src;
       document.getElementById("field_box_Price").disabled=true;
       esh.alert("Personal Price is off");
       break;
      default:
       esh.hv_ess_setting.personal_Price = false;
       document.getElementById("Personal_Price_switch").src = img_Price_adjust_off.src;
       document.getElementById("field_box_Price").disabled=true;
       esh.alert("Personal Price is off");
       break;   
      }
     esh.saveSetting();
     esh.render();
     }),
		$("#Personal_Price_on").click(function () {
       esh.hv_ess_setting.personal_Price = true;
       document.getElementById("Personal_Price_switch").src = img_Price_adjust_on.src;
       document.getElementById("field_box_Price").disabled=false;
       esh.saveSetting();
       esh.render();
       esh.alert("Personal Price is on"); 
     }),
		$("#Personal_Price_off").click(function () {
       esh.hv_ess_setting.personal_Price = false;
       document.getElementById("Personal_Price_switch").src = img_Price_adjust_off.src;
       document.getElementById("field_box_Price").disabled=true;
       esh.saveSetting();
       esh.render();
       esh.alert("Personal Price is off"); 
     }),          
		$(".sort_drop").change(function () {
			esh.hv_ess_setting.sort2 = $("#sort2").val();
			esh.hv_ess_setting.sort1 = $("#sort1").val();
			esh.sort(esh.hv_ess_setting.sort2);
			esh.sort(esh.hv_ess_setting.sort1);
			esh.saveSetting();
			esh.render()
		})
	},
	insertCurrent: function () {
		lastAddedEquipment = this.equipmentDetail_popup();
    Equipment_speichern(lastAddedEquipment);

	},
	equipmentDetail_popup: function () {
// <Manual>
		tmp_eqpmt = new HVEquipment();
		tmp_eqpmt.Name = $("#popup_box > div:first-child").html();
		tmp_eqpmt.Url = this._tmpUrl;
		
//Und los, holen wir uns die ID des Equips
    beginn = tmp_eqpmt.Url.search("eid=")+4;
    ende = tmp_eqpmt.Url.search("&key");
    tmp_eqpmt.ID = tmp_eqpmt.Url.substring (beginn,ende);
//Wir haben die ID, hurra, nun suchen wir mit dieser nach dem Bazar Preis
    Element = document.getElementsByTagName('html')[0].innerHTML.toString();
    wawazuzu = document.location.href;
    BazarPrice = 0;
    if (wawazuzu.search('s=Character&ss=in') == -1)
     {
      Anfang ="shops.set_selected_item('item_pane', " + tmp_eqpmt.ID + ", 1, ";
      Laenge = Anfang.length;
      Abspann = ", '" + tmp_eqpmt.Name + "'); common.set_text_selected(this);";
      beginn = Element.indexOf(Anfang)+Laenge;
      ende = Element.indexOf(Abspann, beginn);
      BazarPrice = Element.substring (beginn, ende);

      //Statsuche - Search for stat's
      beginn = Element.indexOf(tmp_eqpmt.ID);
      beginn = Element.indexOf(", 540, 200, 340, 320,", beginn)+22;
      beginn = Element.indexOf(",", beginn)+3;
      ende = Element.indexOf("', '", beginn);
      table = Element.substring(beginn, ende);
      table = table.replace(/&gt;/g, '>');
      table = table.replace(/&lt;/g, '<');
      table = table.replace(/&amp;nbsp;/g, ' ');
      table = table.replace(/&nbsp;/g, ' ');      
      table = table.replace(/&quot;/g, '"');
      tmp_eqpmt = stat_labotory(tmp_eqpmt, table, 0, 0);
      ende = Element.indexOf("', '", beginn);

      
     }
    else
     {
      beginn = Element.indexOf(tmp_eqpmt.ID);
      beginn = Element.indexOf(", 212, 200, 340, 320,", beginn)+22;
      beginn = Element.indexOf(",", beginn)+3;
      ende = Element.indexOf("', '", beginn);
      table = Element.substring(beginn, ende);
      table = table.replace(/&gt;/g, '>');
      table = table.replace(/&lt;/g, '<');
      table = table.replace(/&amp;nbsp;/g, ' ');
      table = table.replace(/&nbsp;/g, ' ');      
      table = table.replace(/&quot;/g, '"');
      tmp_eqpmt = stat_labotory(tmp_eqpmt, table, 0, 0);
      ende = Element.indexOf("', '", beginn);
     } 
		quality_co = 1;
		quality = tmp_eqpmt.Name.match(/([\w]+)\s/)[0];
		quality = quality.substring(0, quality.length - 1);
		Ethereal_co = 1;
		Rare_co = 1;
		Material_co = 1;
		Sauselten_co = 1;
		
//Implementierung einer Slot und Typ zuweisung anhand des Namens...
//mit vielen If Zeilen
//ersetzung des alten case Baumes


//Einhandwaffen 
    if ((tmp_eqpmt.Name.match('Axe'))||(tmp_eqpmt.Name.match('Club'))||(tmp_eqpmt.Name.match('Dagger'))||(tmp_eqpmt.Name.match('Shortsword'))) {
      tmp_eqpmt.Type = "One-handed Weapon";
     }
    if (tmp_eqpmt.Name.match('Rapier')) {
      tmp_eqpmt.Type = "One-handed Weapon";
     }     
    if (tmp_eqpmt.Name.match('Wakizashi')) {
      tmp_eqpmt.Type = "One-handed Weapon";
     }     
    if (tmp_eqpmt.Name.match('Sword Chucks')) {
      tmp_eqpmt.Type = "One-handed Weapon";
     }     

//Zweihandwaffen
    if ((tmp_eqpmt.Name.match('Estoc'))||(tmp_eqpmt.Name.match('Longsword'))||(tmp_eqpmt.Name.match('Mace'))) {
      tmp_eqpmt.Type = "Two-handed Weapon";
     }
    if (tmp_eqpmt.Name.match('Scythe')) {
      tmp_eqpmt.Type = "Two-handed Weapon";
     }     
    if (tmp_eqpmt.Name.match('Katana')) {
      tmp_eqpmt.Type = "Two-handed Weapon";
     }     
     
//Stäbe
    if (tmp_eqpmt.Name.match('Redwood')) {
      tmp_eqpmt.Type = "Staff";
     }     
    if ((tmp_eqpmt.Name.match('Oak'))||(tmp_eqpmt.Name.match('Ebony'))) {
      tmp_eqpmt.Type = "Staff";
     }
    if (tmp_eqpmt.Name.match('Willow')) {
      tmp_eqpmt.Type = "Staff";
     }     
    if (tmp_eqpmt.Name.match('Katalox')) {
      tmp_eqpmt.Type = "Staff";
     }     


     
//Es beginnt der Rüstungsteil. Abfertigung nach Slots - danach Typ, Material wird danach eingepreist
//Slot
    tmp_eqpmt.Slot = slotsuche(tmp_eqpmt.Name);


//Typ
    if ((tmp_eqpmt.Name.match('Cotton'))||(tmp_eqpmt.Name.match('Silk'))||(tmp_eqpmt.Name.match('Gossamer'))||(tmp_eqpmt.Name.match('Phase'))) {
      tmp_eqpmt.Type = "Cloth Armor";
     }
    if ((tmp_eqpmt.Name.match('Leather'))||(tmp_eqpmt.Name.match('Dragon Hide'))||(tmp_eqpmt.Name.match('Kevlar'))||(tmp_eqpmt.Name.match('Shade'))) {
      tmp_eqpmt.Type = "Light Armor";
     }
    if ((tmp_eqpmt.Name.match('Plate'))||(tmp_eqpmt.Name.match('Shield'))||(tmp_eqpmt.Name.match('Chainmail'))||(tmp_eqpmt.Name.match('Power'))) {
      tmp_eqpmt.Type = "Heavy Armor";
     }
//Einpreisung von wertvollen  Materialien
    Material_co = materialtest(tmp_eqpmt.Name);

// Schilde. Es gibt ja auch Schilde. Ich verwende keine - wenn ich Fehler mache so korrigiert es bitte.
    if (tmp_eqpmt.Name.match('Buckler')) {
      tmp_eqpmt.Type = "Shield";
     }     
    if (tmp_eqpmt.Name.match('Kite Shield')) {
      tmp_eqpmt.Type = "Shield";
     }     
    if (tmp_eqpmt.Name.match('Tower Shield')) {
      tmp_eqpmt.Type = "Shield";
     }     


    Void_co=voidsuche(tmp_eqpmt.Schadentyp);
    Void_co=Void_co+Element_Prefix(tmp_eqpmt.Name);
    huzza = Element_Prefix(tmp_eqpmt.Name);
    price_recommendation = skillchip(tmp_eqpmt.Name, tmp_eqpmt.Type);
		tmp_eqpmt.Price = Math.round(BazarPrice * price_recommendation * Void_co);

    tmp_eqpmt.BazarPrice = BazarPrice;
    Send_Bugreport(); 
		return tmp_eqpmt
	},
	popupShowing: function () {
		return $("#popup_box").is(":visible")
	},
	run: function () {
		if (local("hv_ess_setting") !== null) {
			this.hv_ess_setting = local("hv_ess_setting")
		}
		if (this.page.EquipmentShop.inside() || this.page.Equipment.inside() || this.page.Inventory.inside() || this.page.MoogleMail.inside()) {
			this.additionalMenuItem();
			$(document).keydown(function (e) {
				switch (e.keyCode) {
				case 75:
					esh.insertCurrent();
					break
				}
			});
			$(".eqdp").mouseover(function () {
				_tmpUrlX = $(this).parent().html().match(/(\d+),\s\'([\w]+)\'/);
				esh._tmpUrl = "http://hentaiverse.org/pages/showequip.php?eid=" + _tmpUrlX[1] + "&key=" + _tmpUrlX[2]
			})
		} else if (this.page.BBEquipShop.inside()) {
			this.clearQsScreen();
			this.buildUI();
			this.helperEventBinding();
			this.sort(this.hv_ess_setting.sort2);
			this.sort(this.hv_ess_setting.sort1);
			this.render();
			this.bender()
		} else {
			this.additionalMenuItem()
		}
	}
};

function stat_labotory(Equip_BASE, Tabelle, User_Level){
 var ende_erreicht = true;
 var beginn = 0;
 var ende = 0;
 var teletubi = "";
 var div_count = 0;
 var div_open = 0;
 var div_close = 0;
 beginn = Tabelle.indexOf("<strong>");
 ende = Tabelle.indexOf("</strong>", beginn);
 teletubi = Tabelle.substring(beginn, ende);
 Equip_BASE = Kopf_analyse(teletubi, Equip_BASE);
 if (Tabelle.indexOf("text-align:center;", ende) != -1){
  while (ende_erreicht){
   beginn = Tabelle.indexOf("style", ende);
   beginn = Tabelle.indexOf(">", beginn)+1;
   ende = Tabelle.indexOf("</div>", beginn);
   teletubi = Tabelle.substring(beginn, ende);
   Equip_BASE = Kopf_Zusatz_analyse(teletubi, Equip_BASE);
   ende_erreicht = (Tabelle.indexOf('<div style="text-align:center; margin:3px auto">', ende) == -1) ? false : ende_erreicht;
   }
  }
 ende_erreicht = true;
 if (Tabelle.indexOf('<div style="float:left; width:99px; padding:2px">', ende) != -1){
  while (ende_erreicht){
   beginn = Tabelle.indexOf('<div style="float:left; width:99px; padding:2px">', beginn);
   ende = Tabelle.indexOf('<div style="clear:both">', beginn);
   teletubi = Tabelle.substring(beginn, ende);
   Equip_BASE = BASIC_Info(teletubi, Equip_BASE);
   beginn++;
   ende_erreicht = (Tabelle.indexOf('<div style="float:left; width:99px; padding:2px">', beginn) == -1) ? false : true; 
   }
  }
 ende_erreicht = true;
 if (Tabelle.indexOf('<div style="margin:7px auto 2px">', beginn) != -1){
  while (ende_erreicht){
   beginn = Tabelle.indexOf('<div style="margin:7px auto 2px">', beginn);
   ende = Tabelle.indexOf('<div style="clear:both"></div></div></div>', beginn);
   teletubi = Tabelle.substring(beginn, ende);
   Equip_BASE = Zusatz_Info(teletubi, Equip_BASE);
   beginn++;
   ende_erreicht = (Tabelle.indexOf('<div style="margin:7px auto 2px">', beginn) == -1) ? false : true;
   }
  } 
 return Equip_BASE;
}
function Kopf_analyse(Aufgabe, Equip_BASE){
 var Typ = "";
 var Level = "";
 var beginn = 0;
 var ende = 0;
 beginn = Aufgabe.indexOf("<strong>")+8;
 ende = Aufgabe.indexOf('    ');
 Typ = Aufgabe.substring(beginn, ende);
 Equip_BASE.Type = Typ;
 beginn = Aufgabe.indexOf("Level")+6;
 ende = Aufgabe.indexOf('    ', beginn);
 Level = parseInt(Aufgabe.substring(beginn, ende));
 Equip_BASE.Level = Level; 
 return Equip_BASE;
}
function Kopf_Zusatz_analyse (Aufgabe, Equip_BASE){
 var beginn = 0;
 var ende = 0;
 var Ability = "";
 var Zahlenspeicher = 0.0;
 switch (true){
  case (Aufgabe.indexOf("Bleeding Wound") != -1):
   Ability = "BD:(";
   beginn = Aufgabe.indexOf("Bleeding Wound");
   beginn = Aufgabe.indexOf("<strong>", beginn)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Ability = Ability + Aufgabe.substring(beginn, ende) + "[";
   beginn = Aufgabe.indexOf("<strong>", ende)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Zahlenspeicher = BASE_STAT("Proc_duration",Aufgabe.substring(beginn, ende),tell_my_my_level());
   Ability = Ability + Zahlenspeicher + "]";
   beginn = Aufgabe.indexOf("<strong>", beginn)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Ability = Ability + Aufgabe.substring(beginn, ende) + ")";
   if (Equip_BASE.additional_abilitys != ""){Equip_BASE.additional_abilitys += "|";}
   Equip_BASE.additional_abilitys += Ability;      
   break;
  case (Aufgabe.indexOf("Stunned") != -1):
   Ability = "Stun:(";
   beginn = Aufgabe.indexOf("Stunned");
   beginn = Aufgabe.indexOf("<strong>", beginn)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Ability += Aufgabe.substring(beginn, ende) + "[";
   beginn = Aufgabe.indexOf("<strong>", ende)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Zahlenspeicher = BASE_STAT("Proc_duration",Aufgabe.substring(beginn, ende),tell_my_my_level());
   Ability = Ability + Zahlenspeicher + "])";
   if (Equip_BASE.additional_abilitys != ""){Equip_BASE.additional_abilitys += "|";}
   Equip_BASE.additional_abilitys += Ability;
   break;
  case (Aufgabe.indexOf("Penetrated") != -1):
   Ability = "Pen:(";
   beginn = Aufgabe.indexOf("Penetrated");
   beginn = Aufgabe.indexOf("<strong>", beginn)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Ability += Aufgabe.substring(beginn, ende) + "[";
   beginn = Aufgabe.indexOf("<strong>", ende)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Zahlenspeicher = BASE_STAT("Proc_duration",Aufgabe.substring(beginn, ende),tell_my_my_level());
   Ability = Ability + Zahlenspeicher + "])";
   if (Equip_BASE.additional_abilitys != ""){Equip_BASE.additional_abilitys += "|";}
   Equip_BASE.additional_abilitys += Ability;
   break;
  case (Aufgabe.indexOf("Siphon Health") != -1):
   Ability = "Si-H:(";
   beginn = Aufgabe.indexOf("Siphon Health");
   beginn = Aufgabe.indexOf("<strong>", beginn)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Ability += Aufgabe.substring(beginn, ende) + "[";
   beginn = Aufgabe.indexOf("<strong>", ende)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Zahlenspeicher = BASE_STAT("Drain",Aufgabe.substring(beginn, ende),tell_my_my_level());
   Ability += Zahlenspeicher + "])";
   if (Equip_BASE.additional_abilitys != ""){Equip_BASE.additional_abilitys += "|";}
   Equip_BASE.additional_abilitys += Ability;
   break;    
  case (Aufgabe.indexOf("Siphon Spirit") != -1):
   Ability = "Si-S:(";
   beginn = Aufgabe.indexOf("Siphon Spirit");
   beginn = Aufgabe.indexOf("<strong>", beginn)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Ability += Aufgabe.substring(beginn, ende) + "[";
   beginn = Aufgabe.indexOf("<strong>", ende)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Zahlenspeicher = BASE_STAT("Drain",Aufgabe.substring(beginn, ende),tell_my_my_level());
   Ability += Zahlenspeicher + "])";
   if (Equip_BASE.additional_abilitys != ""){Equip_BASE.additional_abilitys += "|";}
   Equip_BASE.additional_abilitys += Ability;
   break;    
  case (Aufgabe.indexOf("Siphon Magic") != -1):
   Ability = "Si-M:(";
   beginn = Aufgabe.indexOf("Siphon Magic");
   beginn = Aufgabe.indexOf("<strong>", beginn)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Ability += Aufgabe.substring(beginn, ende) + "[";
   beginn = Aufgabe.indexOf("<strong>", ende)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Zahlenspeicher = BASE_STAT("Drain",Aufgabe.substring(beginn, ende),tell_my_my_level());
   Ability += Zahlenspeicher + "])";
   if (Equip_BASE.additional_abilitys != ""){Equip_BASE.additional_abilitys += "|";}
   Equip_BASE.additional_abilitys += Ability;
   break;
  case (Aufgabe.indexOf("Ether Theft") != -1):
   Ability = "Et-T:(";
   beginn = Aufgabe.indexOf("Ether Theft");
   beginn = Aufgabe.indexOf("<strong>", beginn)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Ability += Aufgabe.substring(beginn, ende) + "[";
   beginn = Aufgabe.indexOf("<strong>", ende)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Zahlenspeicher = BASE_STAT("Proc_duration",Aufgabe.substring(beginn, ende),tell_my_my_level());
   Ability += Zahlenspeicher + "])";
   if (Equip_BASE.additional_abilitys != ""){Equip_BASE.additional_abilitys += "|";}
   Equip_BASE.additional_abilitys += Ability;
   break;         
  case (Aufgabe.indexOf("Damage") != -1):
   beginn = Aufgabe.indexOf("<strong>", beginn)+8;
   ende = Aufgabe.indexOf(" ", beginn);
   Zahlenspeicher = BASE_STAT("Damage",Aufgabe.substring(beginn, ende),tell_my_my_level());
   Equip_BASE.Attack_Damage = Zahlenspeicher;
   beginn = ende+1;
   ende = Aufgabe.indexOf("</strong>", beginn); 
   Equip_BASE.Schadentyp = Aufgabe.substring(beginn, ende).replace(' Damage', '');   
   break;
  default:
   beginn = Aufgabe.indexOf("<strong>", beginn)+8;
   ende = Aufgabe.indexOf("</strong>", beginn);
   Ability += Aufgabe.substring(beginn, ende); 
   if (Equip_BASE.additional_abilitys != ""){Equip_BASE.additional_abilitys += "|";}
   Equip_BASE.additional_abilitys += Ability;
   break;
  }  
 return Equip_BASE;
}
function BASIC_Info(Aufgabe, Equip_BASE){
 var beginn = 0;
 var ende = 0;
 var Zahleninfo = 0.0;
 beginn = Aufgabe.indexOf("<strong>")+8;
 ende = Aufgabe.indexOf("</strong>", beginn);
 switch (true){
  case (Aufgabe.indexOf("Attack Accuracy") != -1):
   Zahleninfo = BASE_STAT("Accuratly_Bonus",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Attack_Accuracy_Bonus = Zahleninfo;
   break;
  case (Aufgabe.indexOf("Attack Critical") != -1):
   Zahleninfo = BASE_STAT("Crit_Bonus",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Attack_Critical_Bonus = Zahleninfo;
   break;   
  case (Aufgabe.indexOf("Burden") != -1):
   Zahleninfo = BASE_STAT("Burden",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Burden = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Interference") != -1):
   Zahleninfo = BASE_STAT("Interference",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Interference = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Magic Damage") != -1):
   Zahleninfo = BASE_STAT("MDB",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Magic_Damage_Bonus = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Magic Accuracy") != -1):
   Zahleninfo = BASE_STAT("Accuratly_Bonus",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Magic_Accuracy_Bonus = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Magic Critical") != -1):
   Zahleninfo = BASE_STAT("Crit_Bonus",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Magic_Critical_Bonus = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Physical Mitigation") != -1):
   Zahleninfo = BASE_STAT("Element_Migration",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Physical_Mitigation = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Magical Mitigation") != -1):
   Zahleninfo = BASE_STAT("Element_Migration",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Magical_Mitigation = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Evade Chance") != -1):
   Zahleninfo = BASE_STAT("Block_Evade",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Evade_Chance = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Resist Chance") != -1):
   Zahleninfo = BASE_STAT("Parry_Resist",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Resist_Chance = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Mana Conservation") != -1):
   Zahleninfo = Aufgabe.substring(beginn, ende); 
   Equip_BASE.Mana_Conservation = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Block Chance") != -1):
   Zahleninfo = BASE_STAT("Block_Evade",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Block_Chance = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Parry Chance") != -1):
   Zahleninfo = BASE_STAT("Parry_Resist",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Parry_Chance = Zahleninfo;
   break; 
  case (Aufgabe.indexOf("Attack Damage") != -1):
   Zahleninfo = BASE_STAT("Damage",Aufgabe.substring(beginn, ende),tell_my_my_level()); 
   Equip_BASE.Attack_Damage_Bonus = Zahleninfo;
   break; 
  default:
   dave();
   break;
  }  
 return Equip_BASE; 
}
function Zusatz_Info(Aufgabe, Equip_BASE){
 var beginn = 0;
 var ende = 0;
 var Zahleninfo = 0.0;
 var are_you_done = true;
 var Text_1 = "";
 var Text_2 = "";
 switch (true){
  case (Aufgabe.indexOf("Primary Attributes") != -1):
   Text_1 = "Primary Attributes"; 
   while (are_you_done){
    beginn = Aufgabe.indexOf('<div style="float:left; width:65px">', beginn)+36;
    ende = Aufgabe.indexOf("</div>", beginn)
    Text_2 = Aufgabe.substring(beginn, ende);
    beginn = Aufgabe.indexOf('<strong>', ende)+8;
    ende = Aufgabe.indexOf('</strong>', beginn);
    Zahleninfo = Aufgabe.substring(beginn, ende);
    Equip_BASE = Ausmoscheln(Text_1, Text_2, Zahleninfo, Equip_BASE);
    are_you_done = (Aufgabe.indexOf('<div style="float:left; width:65px">', beginn) == -1) ? false : are_you_done;
    }
   break;
  case (Aufgabe.indexOf("Spell Damage") != -1):
   Text_1 = "Spell Damage";
   while (are_you_done){
    beginn = Aufgabe.indexOf('<div style="float:left; width:65px">', beginn)+36;
    ende = Aufgabe.indexOf("</div>", beginn)
    Text_2 = Aufgabe.substring(beginn, ende);
    beginn = Aufgabe.indexOf('<strong>', ende)+8;
    ende = Aufgabe.indexOf('</strong>', beginn);
    Zahleninfo = Aufgabe.substring(beginn, ende);
    Equip_BASE = Ausmoscheln(Text_1, Text_2, Zahleninfo, Equip_BASE);
    are_you_done = (Aufgabe.indexOf('<div style="float:left; width:65px">', beginn) == -1) ? false : are_you_done;
    }
   break;
  case (Aufgabe.indexOf("Proficiency") != -1):
   Text_1 = "Proficiency";
   while (are_you_done){
    beginn = Aufgabe.indexOf('<div style="float:left; width:65px">', beginn)+36;
    ende = Aufgabe.indexOf("</div>", beginn)
    Text_2 = Aufgabe.substring(beginn, ende);
    beginn = Aufgabe.indexOf('<strong>', ende)+8;
    ende = Aufgabe.indexOf('</strong>', beginn);
    Zahleninfo = Aufgabe.substring(beginn, ende);
    Equip_BASE = Ausmoscheln(Text_1, Text_2, Zahleninfo, Equip_BASE);
    are_you_done = (Aufgabe.indexOf('<div style="float:left; width:65px">', beginn) == -1) ? false : are_you_done;
    }   
   break;
  case (Aufgabe.indexOf("Damage Mitigations") != -1):
   Text_1 = "Damage Mitigations";
   while (are_you_done){
    beginn = Aufgabe.indexOf('<div style="float:left; width:65px">', beginn)+36;
    ende = Aufgabe.indexOf("</div>", beginn)
    Text_2 = Aufgabe.substring(beginn, ende);
    beginn = Aufgabe.indexOf('<strong>', ende)+8;
    ende = Aufgabe.indexOf('</strong>', beginn);
    Zahleninfo = Aufgabe.substring(beginn, ende);
    Equip_BASE = Ausmoscheln(Text_1, Text_2, Zahleninfo, Equip_BASE);
    are_you_done = (Aufgabe.indexOf('<div style="float:left; width:65px">', beginn) == -1) ? false : are_you_done;
    }   
   break;   
  default:
   dave();
   break;                                              
  }  
 return Equip_BASE; 
}

function Ausmoscheln(Text_1, Text_2, Zahleninfo, Equip_BASE){
 if (Text_1 == "Spell Damage"){
  switch (Text_2){
   case "Holy":
    Equip_BASE.Elemental_Damage_Bonuses_Holy = BASE_STAT("EDB",Zahleninfo,tell_my_my_level());
    break;
   case "Dark":
    Equip_BASE.Elemental_Damage_Bonuses_Dark = BASE_STAT("EDB",Zahleninfo,tell_my_my_level());
    break; 
   case "Fire":
    Equip_BASE.Elemental_Damage_Bonuses_Fire = BASE_STAT("EDB",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Cold":
    Equip_BASE.Elemental_Damage_Bonuses_Cold = BASE_STAT("EDB",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Elec":
    Equip_BASE.Elemental_Damage_Bonuses_Elec = BASE_STAT("EDB",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Wind":
    Equip_BASE.Elemental_Damage_Bonuses_Wind = BASE_STAT("EDB",Zahleninfo,tell_my_my_level());
    break; 
   case "Soul":
    Equip_BASE.Elemental_Damage_Bonuses_Soul = BASE_STAT("EDB",Zahleninfo,tell_my_my_level());
    break; 
   }
  }
 if (Text_1 == "Primary Attributes"){
  switch (Text_2){
   case "Wisdom":
    Equip_BASE.Primary_Attribute_Bonuses_WIS = BASE_STAT("PA",Zahleninfo,tell_my_my_level());
    break;
   case "Intelligence":
    Equip_BASE.Primary_Attribute_Bonuses_INT = BASE_STAT("PA",Zahleninfo,tell_my_my_level());
    break; 
   case "Agility":
    Equip_BASE.Primary_Attribute_Bonuses_AGI = BASE_STAT("PA",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Dexterity":
    Equip_BASE.Primary_Attribute_Bonuses_DEX = BASE_STAT("PA",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Strength":
    Equip_BASE.Primary_Attribute_Bonuses_STR = BASE_STAT("PA",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Endurance":
    Equip_BASE.Primary_Attribute_Bonuses_END = BASE_STAT("PA",Zahleninfo,tell_my_my_level());
    break; 
   } 
  }
 if (Text_1 == "Proficiency"){
  switch (Text_2){
   case "Curative":
    Equip_BASE.Proficiency_Bonuses_Curative = BASE_STAT("MPB",Zahleninfo,tell_my_my_level());
    break;
   case "Deprecating":
    Equip_BASE.Proficiency_Bonuses_Deprecating = BASE_STAT("MPB",Zahleninfo,tell_my_my_level());
    break; 
   case "Divine":
    Equip_BASE.Proficiency_Bonuses_Divine = BASE_STAT("MPB",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Supportive":
    Equip_BASE.Proficiency_Bonuses_Supportive = BASE_STAT("MPB",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Forbidden":
    Equip_BASE.Proficiency_Bonuses_Forbidden = BASE_STAT("MPB",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Elemental":
    Equip_BASE.Proficiency_Bonuses_Elemental = BASE_STAT("MPB",Zahleninfo,tell_my_my_level());
    break; 
   } 
  }
 if (Text_1 == "Damage Mitigations"){
   switch (Text_2){
   case "Crushing":
    Equip_BASE.Damage_Type_Mitigations_Crushing = BASE_STAT("Special_Physical_Micration",Zahleninfo,tell_my_my_level());
    break;
   case "Slashing":
    Equip_BASE.Damage_Type_Mitigations_Piercing = BASE_STAT("Special_Physical_Micration",Zahleninfo,tell_my_my_level());
    break; 
   case "Piercing":
    Equip_BASE.Damage_Type_Mitigations_Slashing = BASE_STAT("Special_Physical_Micration",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Physical":
    Equip_BASE.Damage_Type_Mitigations_Physical = BASE_STAT("Special_Physical_Micration ",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Fire":
    Equip_BASE.Damage_Type_Mitigations_Fire = BASE_STAT("Element_Migration",Zahleninfo,tell_my_my_level()); 
    break; 
   case "Elec":
    Equip_BASE.Damage_Type_Mitigations_Elec = BASE_STAT("Element_Migration",Zahleninfo,tell_my_my_level());
    break; 
   case "Cold":
    Equip_BASE.Damage_Type_Mitigations_Cold = BASE_STAT("Element_Migration",Zahleninfo,tell_my_my_level());
    break;
   case "Wind":
    Equip_BASE.Damage_Type_Mitigations_Wind  = BASE_STAT("Element_Migration",Zahleninfo,tell_my_my_level());
    break;
   case "Holy":
    Equip_BASE.Damage_Type_Mitigations_Holy = BASE_STAT("Element_Migration",Zahleninfo,tell_my_my_level());
    break;    
   case "Dark ":
    Equip_BASE.Damage_Type_Mitigations_Dark = BASE_STAT("Element_Migration",Zahleninfo,tell_my_my_level());
    break;
   case "Soul":
    Equip_BASE.Damage_Type_Mitigations_Soul = BASE_STAT("Element_Migration",Zahleninfo,tell_my_my_level());
    break;
   case "Void":
    Equip_BASE.Damage_Type_Mitigations_Void = BASE_STAT("Element_Migration",Zahleninfo,tell_my_my_level());
    break;    
   }
  }   
 return Equip_BASE;
}


function lockunlock(Equip_ID){
 var click = document.createEvent("MouseEvents");
 var Teste_mich = "";
 click.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
 for (var i = 0; i < document.getElementsByTagName("img").length; i++) {
  Benutz_mich = document.getElementsByTagName("img")[i];
  if (Benutz_mich.outerHTML){
   Teste_mich = Benutz_mich.outerHTML;
   }
  else{
   if (XMLSerializer){
    Teste_mich = new XMLSerializer().serializeToString(Benutz_mich);
    }
    else{dave();}
   }  
  if (Teste_mich.match(Equip_ID)){
   if (Teste_mich.match("padlock_open.png")){
    Benutz_mich.dispatchEvent(click);
    Benutz_mich.focus();
    }
   i = document.getElementsByTagName("img").length; 
   }
  } 
}

// Thx @ skillchip@e-hentai. He helped with the base data (hot item list, take a look)
// This function get the data out of the hotitemlist and return the recommended multipliers for the submitted equip
function skillchip(Equipment_Name, Equipment_Typ){
 var recommendation = 1;
 var EQ = "";
 EQ = EQ_suche(Equipment_Typ);
 spew = false;
 for (var i=0, z = HotItemList.length; i < z; i++){
  if (HotItemList[i].Maintypus == EQ && Equipment_Name.match(HotItemList[i].Typus) && Equipment_Name.match(HotItemList[i].Suffix)){
   recommendation = HotItemList[i].multipler;
   i = z;
   spew = true;
   }
  } 
 if (spew == false){Bugreport += "Name:"+Equipment_Name+"\nType:"+Equipment_Typ+"\n";} 
 return recommendation;
}


function Statadvice(EquipData){
 var Empfelung = "";
 var EQ = EQ_suche(EquipData.Type);
 var Equipment_Name = EquipData.Name;
 var Info_1 = ""; 
 var Info_2 = "";                                               
 var Info_3 = "";
 var Info_4 = "";
 var Info_5 = "";
 for (var i=0, z=Interessting_stats_List.length; i<z; i++){
  if (Interessting_stats_List[i].Maintypus == EQ && Equipment_Name.match(Interessting_stats_List[i].Typus) && Equipment_Name.match(Interessting_stats_List[i].Suffix)){
   Info_1 = Interessting_stats_List[i].Info_1;
   Info_2 = Interessting_stats_List[i].Info_2;
   Info_3 = Interessting_stats_List[i].Info_3;
   Info_4 = Interessting_stats_List[i].Info_4;
   Info_5 = Interessting_stats_List[i].Info_5;
   i=z;
   }
 
 Empfelung += Statinfo(EquipData, Info_1);
 if ((Empfelung != "")&&(Statinfo(EquipData, Info_2) !="")){Empfelung += "; ";}
 Empfelung += Statinfo(EquipData, Info_2);
 if ((Empfelung != "")&&(Statinfo(EquipData, Info_3) !="")){Empfelung += "; ";}
 Empfelung += Statinfo(EquipData, Info_3);
 if ((Empfelung != "")&&(Statinfo(EquipData, Info_4) !="")){Empfelung += "; ";}
 Empfelung += Statinfo(EquipData, Info_4);
 if ((Empfelung != "")&&(Statinfo(EquipData, Info_5) !="")){Empfelung += "; ";}
 Empfelung += Statinfo(EquipData, Info_5);
 
 }
 return Empfelung;
}

function Statinfo(EquipData, Waswillste){
 var Statinfo = "";
 var nureines = false;
 var ichzaehlemit = 0;
 var tauschi_1 = 1;
 var tauschi_2 = 0.0;
 var MuhKuhPower = "";
 var Wert_array = new Array;
 switch(Waswillste){
  case "DMG":
   if (EquipData.Attack_Damage != 0.0){
    Statinfo = "DMG: " + EquipData.Attack_Damage;
    } 
   break; 
  case "M-DMG":
   if (EquipData.Magic_Damage_Bonus != 0.0){
    Statinfo = "MDB: " + EquipData.Magic_Damage_Bonus;
    } 
   break; 
  case "Ability":
   if (EquipData.additional_abilitys != ""){
    Statinfo = "Proc: " + EquipData.additional_abilitys;
    } 
   break; 
  case "EDB":
   // Sort of Bonus, from biggest to smallest
   var reinfolge = [1,2,3,4,5,6,7];
   var data = [EquipData.Elemental_Damage_Bonuses_Fire, EquipData.Elemental_Damage_Bonuses_Elec, EquipData.Elemental_Damage_Bonuses_Cold, EquipData.Elemental_Damage_Bonuses_Wind, EquipData.Elemental_Damage_Bonuses_Holy, EquipData.Elemental_Damage_Bonuses_Dark, EquipData.Elemental_Damage_Bonuses_Soul];
   for (var i=data.length; i >= 0; i--){
    for (var j=data.length; j >= 0; j--){
     if (data[j] > data[j-1]){
      tauschi_1 = data[j];
      data[j] = data[j-1];
      data[j-1] = tauschi_1;
      tauschi_2 = reinfolge[j];
      reinfolge[j] = reinfolge[j-1];
      reinfolge[j-1] = tauschi_2;
      }
     }
    }
   
   //Count...
   ichzaehlemit = 0;
   for (var i=0, z=data.length; i<z; i++){
    if (data[i] != 0){
     ichzaehlemit++;
     } 
    }
   
   //Prepare Single Object
   for (var i=0, z=data.length; i<z; i++){
    if (data[i] != 0){
    switch (reinfolge[i]){
     case 1:
      lalelu = "Fire:";
      break;
     case 2:
      lalelu = "Elec:";
      break;
     case 3:
      lalelu = "Cold:";
      break;
     case 4:
      lalelu = "Wind:";
      break;
     case 5:
      lalelu = "Holy:";
      break;
     case 6:
      lalelu = "Dark:";
      break;
     case 7:
      lalelu = "Soul:";
      break;     
     }
     Wert = lalelu+" "+data[i]; 
     } 
    } 
   
   //Prepare Bunch of Objects
   for (var i=0, z=data.length, trenner=""; i<z;i++,trenner="|"){
    switch (reinfolge[i]){
     case 1:
      lalelu = "Fire:";
      break;
     case 2:
      lalelu = "Elec:";
      break;
     case 3:
      lalelu = "Cold:";
      break;
     case 4:
      lalelu = "Wind:";
      break;
     case 5:
      lalelu = "Holy:";
      break;
     case 6:
      lalelu = "Dark:";
      break;
     case 7:
      lalelu = "Soul:";
      break;     
     }
    if (data[i] == 0.0){
     Wert_array[i]="";
     }
    else{
     Wert_array[i]=trenner+lalelu+" "+data[i];
     }  
    }
   lalelu="";
   for (var i=0, z=Wert_array.length; i<z; i++){
    lalelu += Wert_array[i];
    }
   lalelu = "EDB: ("+lalelu+")";
   
   //Set Statusinfo
   switch (ichzaehlemit){
    case 0:
     Statinfo="";
     break;
    case 1:
     Statinfo = Wert;
     break;
    default:
     Statinfo = lalelu;
     break;  
    } 
   break; 
  case "PB":
   // Sort of Bonus, from biggest to smallest
   var reinfolge = [1,2,3,4,5,6];
   var data = [EquipData.Proficiency_Bonuses_Elemental, EquipData.Proficiency_Bonuses_Forbidden, EquipData.Proficiency_Bonuses_Supportive, EquipData.Proficiency_Bonuses_Divine, EquipData.Proficiency_Bonuses_Deprecating, EquipData.Proficiency_Bonuses_Curative];
   for (var i=data.length; i >= 0; i--){
    for (var j=data.length; j >= 0; j--){
     if (data[j] > data[j-1]){
      tauschi_1 = data[j];
      data[j] = data[j-1];
      data[j-1] = tauschi_1;
      tauschi_2 = reinfolge[j];
      reinfolge[j] = reinfolge[j-1];
      reinfolge[j-1] = tauschi_2;
      }
     }
    }

   //Count...
   ichzaehlemit = 0;
   for (var i=0, z=data.length; i<z; i++){
    if (data[i] != 0){
     ichzaehlemit++;
     } 
    }
   
   //Prepare Single Object
   for (var i=0, z=data.length; i<z; i++){
    if (data[i] != 0){
     Wert = "PB: "+data[i]; 
     } 
    } 
   
   //Prepare Bunch of Objects
   for (var i=0, z=data.length, trenner=""; i<z;i++,trenner="|"){
    lalelu = "";
    switch (reinfolge[i]){
     case 1:
      lalelu = "Ele:";
      break;
     case 2:
      lalelu = "Forbidden:";
      break;
     case 3:
      lalelu = "Support:";
      break;
     case 4:
      lalelu = "Divine:";
      break;
     case 5:
      lalelu = "Dep.:";
      break;
     case 6:
      lalelu = "Dark:";
      break;
     }
    if (data[i] == 0.0){
     Wert_array[i]="";
     }
    else{
     Wert_array[i]=trenner+lalelu+" "+data[i];
     }  
    }
   lalelu="";
   for (var i=0, z=Wert_array.length; i<z; i++){
    lalelu += Wert_array[i];
    }
   lalelu = "PB: ("+lalelu+")";

   //Set Statusinfo
   switch (ichzaehlemit){
    case 0:
     Statinfo="";
     break;
    case 1:
     Statinfo = Wert;
     break;
    default:
     Statinfo = lalelu;
     break;  
    }
   break; 
  case "DTM":
   // Sort of Bonus, from biggest to smallest
   var reinfolge = [1,2,3,4,5,6,7,8,9,10,11,12];
   var data = [EquipData.Damage_Type_Mitigations_Crushing, EquipData.Damage_Type_Mitigations_Piercing, EquipData.Damage_Type_Mitigations_Slashing, EquipData.Damage_Type_Mitigations_Physical, EquipData.Damage_Type_Mitigations_Fire, EquipData.Damage_Type_Mitigations_Elec, EquipData.Damage_Type_Mitigations_Cold, EquipData.Damage_Type_Mitigations_Wind, EquipData.Damage_Type_Mitigations_Holy, EquipData.Damage_Type_Mitigations_Dark, EquipData.Damage_Type_Mitigations_Soul, EquipData.Damage_Type_Mitigations_Void];
   for (var i=data.length; i >= 0; i--){
    for (var j=data.length; j >= 0; j--){
     if (data[j] > data[j-1]){
      tauschi_1 = data[j];
      data[j] = data[j-1];
      data[j-1] = tauschi_1;
      tauschi_2 = reinfolge[j];
      reinfolge[j] = reinfolge[j-1];
      reinfolge[j-1] = tauschi_2;
      }
     }
    }

   //Count...
   ichzaehlemit = 0;
   for (var i=0, z=data.length; i<z; i++){
    if (data[i] != 0){
     ichzaehlemit++;
     } 
    }
   
   //Prepare Single Object
   for (var i=0, z=data.length; i<z; i++){
    if (data[i] != 0){
     Wert = "DTM: "+data[i]; 
     } 
    } 
   
   //Prepare Bunch of Objects
   for (var i=0, z=data.length, trenner=""; i<z;i++,trenner="|"){
    lalelu = "";
    switch (reinfolge[i]){
     case 1:
      lalelu = "Crush:";
      break;
     case 2:
      lalelu = "Pierc:";
      break;
     case 3:
      lalelu = "Slash:";
      break;
     case 4:
      lalelu = "Physical:";
      break;
     case 5:
      lalelu = "Fire:";
      break;
     case 6:
      lalelu = "Elec:";
      break;
     case 7:
      lalelu = "Cold:";
      break;
     case 8:
      lalelu = "Wind:";
      break;
     case 9:
      lalelu = "Holy:";
      break;
     case 10:
      lalelu = "Dark:";
      break;
     case 11:
      lalelu = "Soul:";
      break;
     case 12:
      lalelu = "Void:";
      break;      
     }
    if (data[i] == 0.0){
     Wert_array[i]="";
     }
    else{
     Wert_array[i]=trenner+lalelu+" "+data[i];
     }  
    }
   lalelu="";
   for (var i=0, z=Wert_array.length; i<z; i++){
    lalelu += Wert_array[i];
    }
   lalelu = "DTM: ("+lalelu+")";

   //Set Statusinfo
   switch (ichzaehlemit){
    case 0:
     Statinfo="";
     break;
    case 1:
     Statinfo = Wert;
     break;
    default:
     Statinfo = lalelu;
     break;  
    }
   break;
  case "PAB":
   // Sort of Bonus, from biggest to smallest
   var reinfolge = [1,2,3,4,5,6];
   var data = [EquipData.Primary_Attribute_Bonuses_STR, EquipData.Primary_Attribute_Bonuses_AGI, EquipData.Primary_Attribute_Bonuses_INT, EquipData.Primary_Attribute_Bonuses_DEX, EquipData.Primary_Attribute_Bonuses_END, EquipData.Primary_Attribute_Bonuses_WIS];
   for (var i=data.length; i >= 0; i--){
    for (var j=data.length; j >= 0; j--){
     if (data[j] > data[j-1]){
      tauschi_1 = data[j];
      data[j] = data[j-1];
      data[j-1] = tauschi_1;
      tauschi_2 = reinfolge[j];
      reinfolge[j] = reinfolge[j-1];
      reinfolge[j-1] = tauschi_2;
      }
     }
    }

   //Count...
   ichzaehlemit = 0;
   for (var i=0, z=data.length; i<z; i++){
    if (data[i] != 0){
     ichzaehlemit++;
     } 
    }
   
   //Prepare Single Object
   for (var i=0, z=data.length; i<z; i++){
    if (data[i] != 0){
    switch (reinfolge[i]){
     case 1:
      lalelu = "STR:";
      break;
     case 2:
      lalelu = "AGI:";
      break;
     case 3:
      lalelu = "INT:";
      break;
     case 4:
      lalelu = "DEX:";
      break;
     case 5:
      lalelu = "END:";
      break;
     case 6:
      lalelu = "WIS:";
      break;
     }
     Wert = lalelu+" "+data[i]; 
     } 
    } 
   
   //Prepare Bunch of Objects
   for (var i=0, z=data.length, trenner=""; i<z;i++,trenner="|"){
    lalelu = "";
    switch (reinfolge[i]){
     case 1:
      lalelu = "STR:";
      break;
     case 2:
      lalelu = "AGI:";
      break;
     case 3:
      lalelu = "INT:";
      break;
     case 4:
      lalelu = "DEX:";
      break;
     case 5:
      lalelu = "END:";
      break;
     case 6:
      lalelu = "WIS:";
      break;
     }
    if (data[i] == 0.0){
     Wert_array[i]="";
     }
    else{
     Wert_array[i]=trenner+lalelu+" "+data[i];
     }  
    }
   lalelu="";
   for (var i=0, z=Wert_array.length; i<z; i++){
    lalelu += Wert_array[i];
    }
   lalelu = "PAB: ("+lalelu+")";

   //Set Statusinfo
   switch (ichzaehlemit){
    case 0:
     Statinfo="";
     break;
    case 1:
     Statinfo = Wert;
     break;
    default:
     Statinfo = lalelu;
     break;  
    }
   break;    
  case "AAB":
   if (EquipData.Attack_Accuracy_Bonus != 0.0){
    Statinfo = "Acc: " + EquipData.Attack_Accuracy_Bonus;
    } 
   break; 
  case "ACB":
   if (EquipData.Attack_Critical_Bonus != 0.0){
    Statinfo = "Crit: " + EquipData.Attack_Critical_Bonus;
    } 
   break; 
  case "MC":
   if (EquipData.Mana_Conservation != 0.0){
    Statinfo = "MC: " + EquipData.Mana_Conservation;
    } 
   break; 
  case "PC":
   if (EquipData.Parry_Chance != 0.0){
    Statinfo = "Parry: " + EquipData.Parry_Chance;
    } 
   break; 
  case "MA":
   if (EquipData.Magic_Accuracy_Bonus != 0.0){
    Statinfo = "MAB: " + EquipData.Magic_Accuracy_Bonus;
    } 
   break; 
  case "PM":
   if (EquipData.Physical_Mitigation != 0.0){
    Statinfo = "PM: " + EquipData.Physical_Mitigation;
    } 
   break; 
  case "MM":
   if (EquipData.Magical_Absorption != 0.0){
    Statinfo = "MM: " + EquipData.Magical_Absorption;
    } 
   break; 
  case "EC":
   if (EquipData.Evade_Chance != 0.0){
    Statinfo = "Evade: " + EquipData.Evade_Chance;
    } 
   break; 
  case "BC":
   if (EquipData.Block_Chance != 0.0){
    Statinfo = "Block: " + EquipData.Block_Chance;
    } 
   break; 
  case "ADB":
   if (EquipData.Attack_Damage_Bonus != 0.0){
    Statinfo = "ADB: " + EquipData.Attack_Damage_Bonus;
    } 
   break; 
  case "MCB":
   if (EquipData.Magic_Critical_Bonus != 0.0){
    Statinfo = "MCB: " + EquipData.Magic_Critical_Bonus;
    } 
   break; 
  case "RC":
   if (EquipData.Resist_Chance != 0.0){
    Statinfo = "Resist: " + EquipData.Resist_Chance;
    } 
   break; 
  case "BD":
   Statinfo = Ability_auslesen(EquipDataadditional_abilitys,"BD", EquipData.Level, false); 
   break;
  case "ET":
   Statinfo = Ability_auslesen(EquipDataadditional_abilitys,"ET", EquipData.Level, false); 
   break;  
  case "Si-M":
   Statinfo = Ability_auslesen(EquipDataadditional_abilitys,"Si-M", EquipData.Level, false); 
   break; 
  case "Si-H":
   Statinfo = Ability_auslesen(EquipDataadditional_abilitys,"Si-H", EquipData.Level, false); 
   break; 
  case "Si-S":
   Statinfo = Ability_auslesen(EquipDataadditional_abilitys,"Si-S", EquipData.Level, false); 
   break; 
  case "Bu":
   if (EquipData.Burden != 0.0){
    Statinfo = "Burden: " + EquipData.Burden;
    } 
   break; 
  case "In":
   if (EquipData.Interference != 0.0){
    Statinfo = "Interference: " + EquipData.Interference;
    } 
   break; 
  case "0":
   Statinfo = Statinfo;
   break; 
  default:
   //alert('Ich habe keine Ahnung was du für ein Stat willst ò.Ó!\nDas hier kenne ich nicht:'+Waswillste);
   break; 
 }
 delete data;
 delete Wert_array;
 return Statinfo;
}

function EQ_suche(Equipment_Typ){
 var EQ = "";
 switch (Equipment_Typ){
  case "Shield":
   EQ = "Shield";
   break;
  case "Heavy Armor":
   EQ = "Heavy";
   break;
  case "Light Armor":
   EQ = "Light";
   break;
  case "Cloth Armor":
   EQ = "Cloth";
   break;
  case "Staff":
   EQ = "STAFF";
   break;
  case "Two-handed Weapon":
   EQ = "TH";
   break;
  case "One-handed Weapon":
   EQ = "OH";
   break;
  default:
   EQ = "error";
   anti_dave();
   break;
  }
 return EQ; 
}

function shortcuts(Name,Typ){
 var Shortie = "";
 switch(true){
  case (Name.indexOf("Axe") != -1):
   Shortie = "OH-A";
   break;
  case (Name.indexOf("Club") != -1):
   Shortie = "OH-C";
   break;
  case (Name.indexOf("Dagger") != -1):
   Shortie = "OH-D";
   break;
  case (Name.indexOf("Rapier") != -1):
   Shortie = "OH-R";
   break;
  case (Name.indexOf("Shortsword") != -1):
   Shortie = "OH-S";
   break;
  case (Name.indexOf("Wakizashi") != -1):
   Shortie = "OH-W";
   break;
  case (Name.indexOf("Sword Chucks") != -1):
   Shortie = "OH-SW";
   break;
  case (Name.indexOf("Estoc") != -1):
   Shortie = "TH-E";
   break;
  case (Name.indexOf("Longsword") != -1):
   Shortie = "TH-L";
   break;
  case (Name.indexOf("Mace") != -1):
   Shortie = "TH-M";
   break;
  case (Name.indexOf("Scythe") != -1):
   Shortie = "TH-S";
   break;
  case (Name.indexOf("Katana") != -1):
   Shortie = "TH-K";
   break;
  case (Name.indexOf("Ebony") != -1):
   Shortie = "S-E";
   break;
  case (Name.indexOf("Oak") != -1):
   Shortie = "S-O";
   break;
  case (Name.indexOf("Redwood") != -1):
   Shortie = "S-R";
   break;
  case (Name.indexOf("Willow") != -1):
   Shortie = "S-W";
   break;
  case (Name.indexOf("Katalox") != -1):
   Shortie = "S-K";
   break;
  case (Name.indexOf("Cotton") != -1):
   Shortie = "C-C";
   break;
  case (Name.indexOf("Gossamer") != -1):
   Shortie = "C-G";
   break;
  case (Name.indexOf("Silk") != -1):
   Shortie = "C-S";
   break;
  case (Name.indexOf("Phase") != -1):
   Shortie = "C-P";
   break;
  case (Name.indexOf("Leather") != -1):
   Shortie = "L-L";
   break;
  case (Name.indexOf("Kevlar") != -1):
   Shortie = "L-K";
   break;
  case (Name.indexOf("Dragon Hide") != -1):
   Shortie = "L-DH";
   break;   
  case (Name.indexOf("Shade") != -1):
   Shortie = "L-S";
   break;
  case (Name.indexOf("Plate") != -1):
   Shortie = "H-P";
   break;
  case ((Name.indexOf("Shield") != -1)&&(Typ != "Shield")):
   Shortie = "H-S";
   break;
  case (Name.indexOf("Chainmail") != -1):
   Shortie = "H-C";
   break;  
  case (Name.indexOf("Power") != -1):
   Shortie = "H-P";
   break;
  case (Name.indexOf("Buckler") != -1):
   Shortie = "SH-B";
   break;
  case (Name.indexOf("Kite Shield") != -1):
   Shortie = "SH-K";
   break;
  case (Name.indexOf("Tower Shield") != -1):
   Shortie = "SH-T";
   break;
  default:
   alert("Sorry, but this script need your help. Just submit this massage to the developer to ged rid of this error:\nKonnte kein Shortcut zuweisen.\nName:"+ Name);
   break; 
 }
 return Shortie
}

function BASE_STAT(Klasse, Stat, Level){
 var Faktor = 0;
 for (var i=0, z=BASE_BASE.length; i<z; i++){
  if (BASE_BASE[i].Class == Klasse){
   Faktor = BASE_BASE[i].Factor;
   i = z; 
   }
  }
  Stati = parseFloat(Stat);
  Faktori = parseFloat(Faktor);
  Leveli = parseFloat(Level); 
  Faktor = (Stati*Faktori/(Leveli+Faktori));
 return (parseFloat(Faktor.toFixed(2)))
}

function SystemSortieren_Bazar_Type(Name, Slot){
var Kurz = 0;
 switch (true){
  case (Name.indexOf("Axe") != -1):                                  //start of OH
   Kurz = 1;
   break;
  case (Name.indexOf("Club") != -1):
   Kurz = 2;
   break;
  case (Name.indexOf("Dagger") != -1):
   Kurz = 3;
   break;
  case (Name.indexOf("Rapier") != -1):
   Kurz = 4;
   break;
  case (Name.indexOf("Shortsword") != -1):
   Kurz = 5;
   break;
  case (Name.indexOf("Wakizashi") != -1):
   Kurz = 6;
   break;
  case (Name.indexOf("Estoc") != -1):                                //start ot TH
   Kurz = 7;
   break;
  case (Name.indexOf("Longsword") != -1):
   Kurz = 8;
   break;
  case (Name.indexOf("Mace") != -1):
   Kurz = 9;
   break;
  case (Name.indexOf("Scythe") != -1):
   Kurz = 10;
   break;
  case (Name.indexOf("Katana") != -1):
   Kurz = 11;
   break;   
  case (Name.indexOf("Ebony") != -1):                                //start Staffs
   Kurz = 12;
   break;
  case (Name.indexOf("Katalox") != -1):
   Kurz = 13;
   break;
  case (Name.indexOf("Oak") != -1):
   Kurz = 14;
   break;
  case (Name.indexOf("Redwood") != -1):
   Kurz = 15;
   break;
  case (Name.indexOf("Willow") != -1):
   Kurz = 16;
   break;
  case (Name.indexOf("Buckler") != -1):                              //Start Shield
   Kurz = 17;
   break;
  case (Name.indexOf("Kite Shield") != -1):
   Kurz = 18;
   break;
  case (Name.indexOf("Tower Shield") != -1):
   Kurz = 19;
   break;
  case ((Name.indexOf("Cotton") != -1)&&(Slot=="Head")):             //Start Cloth Armor
   Kurz = 20;
   break;
  case ((Name.indexOf("Gossamer") != -1)&&(Slot=="Head")):
   Kurz = 21;
   break;
  case ((Name.indexOf("Phase") != -1)&&(Slot=="Head")):
   Kurz = 22;
   break;
  case ((Name.indexOf("Cotton") != -1)&&(Slot=="Body")):            
   Kurz = 23;
   break;
  case ((Name.indexOf("Gossamer") != -1)&&(Slot=="Body")):
   Kurz = 24;
   break;
  case ((Name.indexOf("Phase") != -1)&&(Slot=="Body")):
   Kurz = 25;
   break;
  case ((Name.indexOf("Cotton") != -1)&&(Slot=="Hands")):             
   Kurz = 26;
   break;
  case ((Name.indexOf("Gossamer") != -1)&&(Slot=="Hands")):
   Kurz = 27;
   break;
  case ((Name.indexOf("Phase") != -1)&&(Slot=="Hands")):
   Kurz = 28;
   break;
  case ((Name.indexOf("Cotton") != -1)&&(Slot=="Legs")):             
   Kurz = 29;
   break;
  case ((Name.indexOf("Gossamer") != -1)&&(Slot=="Legs")):
   Kurz = 30;
   break;
  case ((Name.indexOf("Phase") != -1)&&(Slot=="Legs")):
   Kurz = 31;
   break;
  case ((Name.indexOf("Cotton") != -1)&&(Slot=="Feet")):             
   Kurz = 32;
   break;
  case ((Name.indexOf("Gossamer") != -1)&&(Slot=="Feet")):
   Kurz = 33;
   break;
  case ((Name.indexOf("Phase") != -1)&&(Slot=="Feet")):
   Kurz = 34;
   break;
  case ((Name.indexOf("Leather") != -1)&&(Slot=="Head")):            //Start Light Armor
   Kurz = 35;
   break;
  case ((Name.indexOf("Kevlar") != -1)&&(Slot=="Head")):
   Kurz = 36;
   break;
  case ((Name.indexOf("Shade") != -1)&&(Slot=="Head")):
   Kurz = 37;
   break;
  case ((Name.indexOf("Leather") != -1)&&(Slot=="Body")):            
   Kurz = 38;
   break;
  case ((Name.indexOf("Kevlar") != -1)&&(Slot=="Body")):
   Kurz = 39;
   break;
  case ((Name.indexOf("Shade") != -1)&&(Slot=="Body")):
   Kurz = 40;
   break;
  case ((Name.indexOf("Leather") != -1)&&(Slot=="Hands")):             
   Kurz = 41;
   break;
  case ((Name.indexOf("Kevlar") != -1)&&(Slot=="Hands")):
   Kurz = 42;
   break;
  case ((Name.indexOf("Shade") != -1)&&(Slot=="Hands")):
   Kurz = 43;
   break;
  case ((Name.indexOf("Leather") != -1)&&(Slot=="Legs")):             
   Kurz = 44;
   break;
  case ((Name.indexOf("Kevlar") != -1)&&(Slot=="Legs")):
   Kurz = 45;
   break;
  case ((Name.indexOf("Shade") != -1)&&(Slot=="Legs")):
   Kurz = 46;
   break;
  case ((Name.indexOf("Leather") != -1)&&(Slot=="Feet")):             
   Kurz = 47;
   break;
  case ((Name.indexOf("Kevlar") != -1)&&(Slot=="Feet")):
   Kurz = 48;
   break;
  case ((Name.indexOf("Shade") != -1)&&(Slot=="Feet")):
   Kurz = 49;
   break;
  case ((Name.indexOf("Plate") != -1)&&(Slot=="Head")):              //Start Heavy Armor
   Kurz = 50;
   break;
  case ((Name.indexOf("Shield") != -1)&&(Slot=="Head")):
   Kurz = 51;
   break;
  case ((Name.indexOf("Power") != -1)&&(Slot=="Head")):
   Kurz = 52;
   break;
  case ((Name.indexOf("Plate") != -1)&&(Slot=="Body")):            
   Kurz = 53;
   break;
  case ((Name.indexOf("Shield") != -1)&&(Slot=="Body")):
   Kurz = 54;
   break;
  case ((Name.indexOf("Power") != -1)&&(Slot=="Body")):
   Kurz = 55;
   break;
  case ((Name.indexOf("Plate") != -1)&&(Slot=="Hands")):             
   Kurz = 56;
   break;
  case ((Name.indexOf("Shield") != -1)&&(Slot=="Hands")):
   Kurz = 57;
   break;
  case ((Name.indexOf("Power") != -1)&&(Slot=="Hands")):
   Kurz = 58;
   break;
  case ((Name.indexOf("Plate") != -1)&&(Slot=="Legs")):             
   Kurz = 59;
   break;
  case ((Name.indexOf("Shield") != -1)&&(Slot=="Legs")):
   Kurz = 60;
   break;
  case ((Name.indexOf("Power") != -1)&&(Slot=="Legs")):
   Kurz = 61;
   break;
  case ((Name.indexOf("Plate") != -1)&&(Slot=="Feet")):             
   Kurz = 62;
   break;
  case ((Name.indexOf("Shield") != -1)&&(Slot=="Feet")):
   Kurz = 63;
   break;
  case ((Name.indexOf("Power") != -1)&&(Slot=="Feet")):
   Kurz = 64;
   break;
  default:
   Kurz = 100;
   break;
 }
 return Kurz;
}
function SystemSortieren_Bazar_pur(Name, Slot){
var Kurz = 0;
 switch (true){
  case (Name.indexOf("Axe") != -1):                                  //start of OH
   Kurz = 1;
   break;
  case (Name.indexOf("Club") != -1):
   Kurz = 2;
   break;
  case (Name.indexOf("Dagger") != -1):
   Kurz = 3;
   break;
  case (Name.indexOf("Rapier") != -1):
   Kurz = 4;
   break;
  case (Name.indexOf("Shortsword") != -1):
   Kurz = 5;
   break;
  case (Name.indexOf("Wakizashi") != -1):
   Kurz = 6;
   break;
  case (Name.indexOf("Estoc") != -1):                                //start ot TH
   Kurz = 7;
   break;
  case (Name.indexOf("Longsword") != -1):
   Kurz = 8;
   break;
  case (Name.indexOf("Mace") != -1):
   Kurz = 9;
   break;
  case (Name.indexOf("Scythe") != -1):
   Kurz = 10;
   break;
  case (Name.indexOf("Katana") != -1):
   Kurz = 11;
   break;   
  case (Name.indexOf("Ebony") != -1):                                //start Staffs
   Kurz = 12;
   break;
  case (Name.indexOf("Katalox") != -1):
   Kurz = 13;
   break;
  case (Name.indexOf("Oak") != -1):
   Kurz = 14;
   break;
  case (Name.indexOf("Redwood") != -1):
   Kurz = 15;
   break;
  case (Name.indexOf("Willow") != -1):
   Kurz = 16;
   break;
  case (Name.indexOf("Buckler") != -1):                              //Start Shield
   Kurz = 17;
   break;
  case (Name.indexOf("Kite Shield") != -1):
   Kurz = 18;
   break;
  case (Name.indexOf("Tower Shield") != -1):
   Kurz = 19;
   break;
  case ((Name.indexOf("Cotton") != -1)&&(Slot=="Head")):             //Start Head
   Kurz = 20;
   break;
  case ((Name.indexOf("Gossamer") != -1)&&(Slot=="Head")):
   Kurz = 21;
   break;
  case ((Name.indexOf("Phase") != -1)&&(Slot=="Head")):
   Kurz = 22;
   break;
  case ((Name.indexOf("Plate") != -1)&&(Slot=="Head")):              
   Kurz = 23;
   break;
  case ((Name.indexOf("Power") != -1)&&(Slot=="Head")):
   Kurz = 24;
   break;
  case ((Name.indexOf("Shield") != -1)&&(Slot=="Head")):
   Kurz = 25;
   break;
  case ((Name.indexOf("Kevlar") != -1)&&(Slot=="Head")):
   Kurz = 26;
   break;
  case ((Name.indexOf("Leather") != -1)&&(Slot=="Head")):            
   Kurz = 27;
   break;
  case ((Name.indexOf("Shade") != -1)&&(Slot=="Head")):
   Kurz = 28;
   break;   
  case ((Name.indexOf("Cotton") != -1)&&(Slot=="Body")):             //Start Body
   Kurz = 29;
   break;
  case ((Name.indexOf("Gossamer") != -1)&&(Slot=="Body")):
   Kurz = 30;
   break;
  case ((Name.indexOf("Phase") != -1)&&(Slot=="Body")):
   Kurz = 31;
   break;
  case ((Name.indexOf("Plate") != -1)&&(Slot=="Body")):            
   Kurz = 32;
   break;
  case ((Name.indexOf("Power") != -1)&&(Slot=="Body")):
   Kurz = 33;
   break;
  case ((Name.indexOf("Shield") != -1)&&(Slot=="Body")):
   Kurz = 34;
   break;
  case ((Name.indexOf("Kevlar") != -1)&&(Slot=="Body")):
   Kurz = 35;
   break;
  case ((Name.indexOf("Leather") != -1)&&(Slot=="Body")):            
   Kurz = 36;
   break;
  case ((Name.indexOf("Shade") != -1)&&(Slot=="Body")):
   Kurz = 37;
   break;
  case ((Name.indexOf("Cotton") != -1)&&(Slot=="Hands")):            //Start Hands 
   Kurz = 38;
   break;
  case ((Name.indexOf("Gossamer") != -1)&&(Slot=="Hands")):
   Kurz = 39;
   break;
  case ((Name.indexOf("Phase") != -1)&&(Slot=="Hands")):
   Kurz = 40;
   break;
  case ((Name.indexOf("Plate") != -1)&&(Slot=="Hands")):             
   Kurz = 41;
   break;
  case ((Name.indexOf("Power") != -1)&&(Slot=="Hands")):
   Kurz = 42;
   break;
  case ((Name.indexOf("Shield") != -1)&&(Slot=="Hands")):
   Kurz = 43;
   break;
  case ((Name.indexOf("Kevlar") != -1)&&(Slot=="Hands")):
   Kurz = 44;
   break;
  case ((Name.indexOf("Leather") != -1)&&(Slot=="Hands")):             
   Kurz = 45;
   break;
  case ((Name.indexOf("Shade") != -1)&&(Slot=="Hands")):
   Kurz = 46;
   break;
  case ((Name.indexOf("Cotton") != -1)&&(Slot=="Legs")):             //Start Legs
   Kurz = 47;
   break;
  case ((Name.indexOf("Gossamer") != -1)&&(Slot=="Legs")):
   Kurz = 48;
   break;
  case ((Name.indexOf("Phase") != -1)&&(Slot=="Legs")):
   Kurz = 49;
   break;   
  case ((Name.indexOf("Plate") != -1)&&(Slot=="Legs")):             
   Kurz = 50;
   break;
  case ((Name.indexOf("Power") != -1)&&(Slot=="Legs")):
   Kurz = 51;
   break;
  case ((Name.indexOf("Shield") != -1)&&(Slot=="Legs")):
   Kurz = 52;
   break;      
  case ((Name.indexOf("Kevlar") != -1)&&(Slot=="Legs")):
   Kurz = 53;
   break;
  case ((Name.indexOf("Leather") != -1)&&(Slot=="Legs")):             
   Kurz = 54;
   break;
  case ((Name.indexOf("Shade") != -1)&&(Slot=="Legs")):
   Kurz = 55;
   break;
  case ((Name.indexOf("Cotton") != -1)&&(Slot=="Feet")):             //Start Feet
   Kurz = 56;
   break;
  case ((Name.indexOf("Gossamer") != -1)&&(Slot=="Feet")):
   Kurz = 57;
   break;
  case ((Name.indexOf("Phase") != -1)&&(Slot=="Feet")):
   Kurz = 58;
   break;
  case ((Name.indexOf("Plate") != -1)&&(Slot=="Feet")):             
   Kurz = 59;
   break;
  case ((Name.indexOf("Power") != -1)&&(Slot=="Feet")):
   Kurz = 60;
   break;
  case ((Name.indexOf("Shield") != -1)&&(Slot=="Feet")):
   Kurz = 61;
   break;  
  case ((Name.indexOf("Kevlar") != -1)&&(Slot=="Feet")):
   Kurz = 62;
   break;
  case ((Name.indexOf("Leather") != -1)&&(Slot=="Feet")):             
   Kurz = 63;
   break;
  case ((Name.indexOf("Shade") != -1)&&(Slot=="Feet")):
   Kurz = 64;
   break;
  default:
   Kurz = 100;
   break;
 }
 return Kurz;
}

function SystemSortieren_shortcuts(Name,Typ){
 var Shortie = 0;
 switch(true){
  case (Name.indexOf("Axe") != -1):
   Shortie = 1;
   break;
  case (Name.indexOf("Club") != -1):
   Shortie = 2;
   break;
  case (Name.indexOf("Dagger") != -1):
   Shortie = 3;
   break;
  case (Name.indexOf("Rapier") != -1):
   Shortie = 4;
   break;
  case (Name.indexOf("Shortsword") != -1):
   Shortie = 5;
   break;
  case (Name.indexOf("Wakizashi") != -1):
   Shortie = 6;
   break;
  case (Name.indexOf("Sword Chucks") != -1):
   Shortie = 7;
   break;
  case (Name.indexOf("Estoc") != -1):
   Shortie = 8;
   break;
  case (Name.indexOf("Longsword") != -1):
   Shortie = 9;
   break;
  case (Name.indexOf("Mace") != -1):
   Shortie = 10;
   break;
  case (Name.indexOf("Scythe") != -1):
   Shortie = 11;
   break;
  case (Name.indexOf("Katana") != -1):
   Shortie = 12;
   break;
  case (Name.indexOf("Ebony") != -1):
   Shortie = 13;
   break;
  case (Name.indexOf("Oak") != -1):
   Shortie = 14;
   break;
  case (Name.indexOf("Redwood") != -1):
   Shortie = 15;
   break;
  case (Name.indexOf("Willow") != -1):
   Shortie = 16;
   break;
  case (Name.indexOf("Katalox") != -1):
   Shortie = 17;
   break;
  case (Name.indexOf("Cotton") != -1):
   Shortie = 18;
   break;
  case (Name.indexOf("Gossamer") != -1):
   Shortie = 19;
   break;
  case (Name.indexOf("Phase") != -1):
   Shortie = 20;
   break;
  case (Name.indexOf("Silk") != -1):
   Shortie = 21;
   break;
  case (Name.indexOf("Leather") != -1):
   Shortie = 22;
   break;
  case (Name.indexOf("Kevlar") != -1):
   Shortie = 23;
   break;
  case (Name.indexOf("Shade") != -1):
   Shortie = 24;
   break;
  case (Name.indexOf("Dragon Hide") != -1):
   Shortie = 25;
   break;   
  case (Name.indexOf("Plate") != -1):
   Shortie = 26;
   break;
  case ((Name.indexOf("Shield") != -1)&&(Typ != "Shield")):
   Shortie = 27;
   break;
  case (Name.indexOf("Power") != -1):
   Shortie = 28;
   break;
  case (Name.indexOf("Chainmail") != -1):
   Shortie = 29;
   break;
  case (Name.indexOf("Buckler") != -1):
   Shortie = 30;
   break;
  case (Name.indexOf("Kite Shield") != -1):
   Shortie = 31;
   break;
  case (Name.indexOf("Tower Shield") != -1):
   Shortie = 32;
   break;
  default:
   //alert("Sorry, but this script need your help. Just submit this massage to the developer to ged rid of this error:\nKonnte kein Shortcut zuweisen.\nName:"+ Name);
   break; 
 }
 return Shortie
}


function SystemSortieren_Suffix(Name){
var Kurz = 0;
 switch (true){
  case (Name.indexOf("of the Arcanist") != -1):                                  
   Kurz = 1;
   break;
  case (Name.indexOf("of Balance") != -1):
   Kurz = 2;
   break;
  case (Name.indexOf("of the Banshee") != -1):
   Kurz = 3;
   break;
  case (Name.indexOf("of the Barrier") != -1):
   Kurz = 4;
   break;
  case (Name.indexOf("of the Battlecaster") != -1):
   Kurz = 5;
   break;
  case (Name.indexOf("of the Curse-weaver") != -1):
   Kurz = 6;
   break;
  case (Name.indexOf("of Dampening") != -1):                               
   Kurz = 7;
   break;
  case (Name.indexOf("of Deflection") != -1):
   Kurz = 8;
   break;
  case (Name.indexOf("of the Demon-fiend") != -1):
   Kurz = 9;
   break;
  case (Name.indexOf("of Destruction") != -1):
   Kurz = 10;
   break;
  case (Name.indexOf("of the Earth-walker") != -1):
   Kurz = 11;
   break;   
  case (Name.indexOf("of Destruction") != -1):                               
   Kurz = 12;
   break;
  case (Name.indexOf("of the Elementalist") != -1):
   Kurz = 13;
   break;
  case (Name.indexOf("of Fenrir") != -1):
   Kurz = 14;
   break;
  case (Name.indexOf("of the Fire-eater") != -1):
   Kurz = 15;
   break;
  case (Name.indexOf("of the Fleet") != -1):
   Kurz = 16;
   break;
  case (Name.indexOf("of Focus") != -1):                             
   Kurz = 17;
   break;
  case (Name.indexOf("Fox") != -1):
   Kurz = 18;
   break;
  case (Name.indexOf("of Freyr") != -1):
   Kurz = 19;
   break;
  case (Name.indexOf("of the Frost-born") != -1):
   Kurz = 20;
   break;
  case (Name.indexOf("of the Heaven-sent") != -1):
   Kurz = 21;
   break;
  case (Name.indexOf("of Heimdall") != -1):
   Kurz = 22;
   break;
  case (Name.indexOf("of the Illithid") != -1):
   Kurz = 23;
   break;
  case (Name.indexOf("of Mjolnir") != -1):
   Kurz = 24;
   break;
  case (Name.indexOf("of Negation") != -1):
   Kurz = 25;
   break;
  case (Name.indexOf("of Niflheim") != -1):
   Kurz = 26;
   break;
  case (Name.indexOf("of the Nimble") != -1):
   Kurz = 27;
   break;
  case (Name.indexOf("Owl") != -1):
   Kurz = 28;
   break;
  case (Name.indexOf("of the Priestess") != -1):
   Kurz = 29;
   break;
  case (Name.indexOf("of Protection") != -1):
   Kurz = 30;
   break;
  case (Name.indexOf("of the Shadowdancer") != -1):
   Kurz = 31;
   break;
  case (Name.indexOf("of Slaughter") != -1):
   Kurz = 32;
   break;
  case (Name.indexOf("of the Spirit-ward") != -1):
   Kurz = 33;
   break;
  case (Name.indexOf("of Stoneskin") != -1):
   Kurz = 34;
   break;
  case (Name.indexOf("of Surtr") != -1):
   Kurz = 35;
   break;
  case (Name.indexOf("of the Thrice-blessed") != -1):
   Kurz = 36;
   break;
  case (Name.indexOf("of the Thunder-child") != -1):
   Kurz = 37;
   break;
  case (Name.indexOf("of the Vampire") != -1):
   Kurz = 38;
   break;
  case (Name.indexOf("of the Wind-waker") != -1):
   Kurz = 39;
   break;
  case (Name.indexOf("of Warding") != -1):
   Kurz = 40;
   break;
  default:
   Kurz = 100;
   break;
 }
 return Kurz;
}

function Ability_auslesen(Ability_Text,Was_ist_gewollt, Level, scaled_to_zero){
 var Auslese_ergebnis = "";
 if (Ability_Text == ""){
  return Auslese_ergebnis;
  }
 var funktioniert = true;
 var beginn = 0;
 var ende = 0;
 var zwischentext = "";
 while (funktioniert){
  ende = Ability_Text.indexOf("|", beginn);
  if (ende == -1){
   ende = Ability_Text.length;
   funktioniert = false;
   }
  zwischentext = Ability_Text.substring(beginn, ende);  
  switch (Was_ist_gewollt){
   case "BD":
    Auslese_ergebnis = (zwischentext.match("BD")) ? zwischentext : Auslese_ergebnis;
    break;
   case "ET":  
    Auslese_ergebnis = (zwischentext.match("Et-T")) ? zwischentext : Auslese_ergebnis;
    break;     
   case "Stun":
    Auslese_ergebnis = (zwischentext.match("Stun")) ? zwischentext : Auslese_ergebnis;
    break;
   case "Pen":
    Auslese_ergebnis = (zwischentext.match("Pen")) ? zwischentext : Auslese_ergebnis;
    break;
   case "Si-S":
    Auslese_ergebnis = (zwischentext.match("Si-S")) ? zwischentext : Auslese_ergebnis;
    break;
   case "Si-M":    
    Auslese_ergebnis = (zwischentext.match("Si-M")) ? zwischentext : Auslese_ergebnis;
    break;
   case "Si-H":   
    Auslese_ergebnis = (zwischentext.match("Si-H")) ? zwischentext : Auslese_ergebnis;
    break;   
   }
  beginn = ende+1;    
  }  

 return Auslese_ergebnis
 }
function tell_my_my_level(){
 var Level = 0;
 Level = parseInt($(".cit .fd12 > div:first-child").html().replace("Level ", ""));
 return Level;
}

function Send_Bugreport(){
if (Bugreport != ""){
 CreateLog = "Hello loved User. This is an userscript.\nThis is nice, but also means there is a real chance for some errors. This happend.\nThe programmer, also me(this defective script) feel very sorry.\nNevertheless i have a wish. Please copy this alert massage and submit it to my Programmer. Feel free to PM or post (in the HV-SS Thread) the following part to FarFaraway. Thank you. \n\n"+Bugreport;
 alert(CreateLog);
 Bugreport = ""; 
 }
}
esh.run();