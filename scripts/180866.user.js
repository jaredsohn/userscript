// ==UserScript==
// @name            MMHK-Plus
// @author          Aendawyn
// @icon            http://www.mmhk-plus.eu/script/icons/icon128.png
// @version         3.1.5
// @description     Ajout de fonctionnalit?©s pour Might & Magic : Heroes Kingdoms
// @include         http://mightandmagicheroeskingdoms.ubi.com/play*
// @include         http://mightandmagicheroeskingdoms.ubi.com/play#*
// @include         http://mightandmagicheroeskingdoms.ubi.com/play
// ==/UserScript==

/*

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	
	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	Contact : aendawyn@gmail.com
	Website : http://www.mmhk-plus.eu

*/
var realWindow = window;

/*
  Old Chrome hack to retrieve unsafe window
  Since Chrome 27 it does not work. 
  //TODO find a solution?
  
	if (Boolean(window.chrome)) {
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		realWindow = div.onclick();
		div = null;
	}

*/
var JQuery = (function()
{
	var getElementById = function(id)
    {
        var element = $("#" + id);
        return (element.length > 0 ? element : null);
    };

    /*! jQuery v1.8.3 jquery.com | jquery.org/license */
    (function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);
    (function(e,t){function i(t,n){var r,i,o,u=t.nodeName.toLowerCase();return"area"===u?(r=t.parentNode,i=r.name,!t.href||!i||r.nodeName.toLowerCase()!=="map"?!1:(o=e("img[usemap=#"+i+"]")[0],!!o&&s(o))):(/input|select|textarea|button|object/.test(u)?!t.disabled:"a"===u?t.href||n:n)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().andSelf().filter(function(){return e.css(this,"visibility")==="hidden"}).length}var n=0,r=/^ui-id-\d+$/;e.ui=e.ui||{};if(e.ui.version)return;e.extend(e.ui,{version:"1.9.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({_focus:e.fn.focus,focus:function(t,n){return typeof t=="number"?this.each(function(){var r=this;setTimeout(function(){e(r).focus(),n&&n.call(r)},t)}):this._focus.apply(this,arguments)},scrollParent:function(){var t;return e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?t=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):t=this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(n){if(n!==t)return this.css("zIndex",n);if(this.length){var r=e(this[0]),i,s;while(r.length&&r[0]!==document){i=r.css("position");if(i==="absolute"||i==="relative"||i==="fixed"){s=parseInt(r.css("zIndex"),10);if(!isNaN(s)&&s!==0)return s}r=r.parent()}}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++n)})},removeUniqueId:function(){return this.each(function(){r.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,r){return!!e.data(t,r[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),r=isNaN(n);return(r||n>=0)&&i(t,!r)}}),e(function(){var t=document.body,n=t.appendChild(n=document.createElement("div"));n.offsetHeight,e.extend(n.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),e.support.minHeight=n.offsetHeight===100,e.support.selectstart="onselectstart"in n,t.removeChild(n).style.display="none"}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(n,r){function u(t,n,r,s){return e.each(i,function(){n-=parseFloat(e.css(t,"padding"+this))||0,r&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var i=r==="Width"?["Left","Right"]:["Top","Bottom"],s=r.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+r]=function(n){return n===t?o["inner"+r].call(this):this.each(function(){e(this).css(s,u(this,n)+"px")})},e.fn["outer"+r]=function(t,n){return typeof t!="number"?o["outer"+r].call(this,t):this.each(function(){e(this).css(s,u(this,t,!0,n)+"px")})}}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(n){return arguments.length?t.call(this,e.camelCase(n)):t.call(this)}}(e.fn.removeData)),function(){var t=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[];e.ui.ie=t.length?!0:!1,e.ui.ie6=parseFloat(t[1],10)===6}(),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,n,r){var i,s=e.ui[t].prototype;for(i in r)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([n,r[i]])},call:function(e,t,n){var r,i=e.plugins[t];if(!i||!e.element[0].parentNode||e.element[0].parentNode.nodeType===11)return;for(r=0;r<i.length;r++)e.options[i[r][0]]&&i[r][1].apply(e.element,n)}},contains:e.contains,hasScroll:function(t,n){if(e(t).css("overflow")==="hidden")return!1;var r=n&&n==="left"?"scrollLeft":"scrollTop",i=!1;return t[r]>0?!0:(t[r]=1,i=t[r]>0,t[r]=0,i)},isOverAxis:function(e,t,n){return e>t&&e<t+n},isOver:function(t,n,r,i,s,o){return e.ui.isOverAxis(t,r,s)&&e.ui.isOverAxis(n,i,o)}})})(jQuery);(function(e,t){var n=0,r=Array.prototype.slice,i=e.cleanData;e.cleanData=function(t){for(var n=0,r;(r=t[n])!=null;n++)try{e(r).triggerHandler("remove")}catch(s){}i(t)},e.widget=function(t,n,r){var i,s,o,u,a=t.split(".")[0];t=t.split(".")[1],i=a+"-"+t,r||(r=n,n=e.Widget),e.expr[":"][i.toLowerCase()]=function(t){return!!e.data(t,i)},e[a]=e[a]||{},s=e[a][t],o=e[a][t]=function(e,t){if(!this._createWidget)return new o(e,t);arguments.length&&this._createWidget(e,t)},e.extend(o,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),u=new n,u.options=e.widget.extend({},u.options),e.each(r,function(t,i){e.isFunction(i)&&(r[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},r=function(e){return n.prototype[t].apply(this,e)};return function(){var t=this._super,n=this._superApply,s;return this._super=e,this._superApply=r,s=i.apply(this,arguments),this._super=t,this._superApply=n,s}}())}),o.prototype=e.widget.extend(u,{widgetEventPrefix:s?u.widgetEventPrefix:t},r,{constructor:o,namespace:a,widgetName:t,widgetBaseClass:i,widgetFullName:i}),s?(e.each(s._childConstructors,function(t,n){var r=n.prototype;e.widget(r.namespace+"."+r.widgetName,o,n._proto)}),delete s._childConstructors):n._childConstructors.push(o),e.widget.bridge(t,o)},e.widget.extend=function(n){var i=r.call(arguments,1),s=0,o=i.length,u,a;for(;s<o;s++)for(u in i[s])a=i[s][u],i[s].hasOwnProperty(u)&&a!==t&&(e.isPlainObject(a)?n[u]=e.isPlainObject(n[u])?e.widget.extend({},n[u],a):e.widget.extend({},a):n[u]=a);return n},e.widget.bridge=function(n,i){var s=i.prototype.widgetFullName||n;e.fn[n]=function(o){var u=typeof o=="string",a=r.call(arguments,1),f=this;return o=!u&&a.length?e.widget.extend.apply(null,[o].concat(a)):o,u?this.each(function(){var r,i=e.data(this,s);if(!i)return e.error("cannot call methods on "+n+" prior to initialization; "+"attempted to call method '"+o+"'");if(!e.isFunction(i[o])||o.charAt(0)==="_")return e.error("no such method '"+o+"' for "+n+" widget instance");r=i[o].apply(i,a);if(r!==i&&r!==t)return f=r&&r.jquery?f.pushStack(r.get()):r,!1}):this.each(function(){var t=e.data(this,s);t?t.option(o||{})._init():e.data(this,s,new i(o,this))}),f}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,r){r=e(r||this.defaultElement||this)[0],this.element=e(r),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),r!==this&&(e.data(r,this.widgetName,this),e.data(r,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===r&&this.destroy()}}),this.document=e(r.style?r.ownerDocument:r.document||r),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,r){var i=n,s,o,u;if(arguments.length===0)return e.widget.extend({},this.options);if(typeof n=="string"){i={},s=n.split("."),n=s.shift();if(s.length){o=i[n]=e.widget.extend({},this.options[n]);for(u=0;u<s.length-1;u++)o[s[u]]=o[s[u]]||{},o=o[s[u]];n=s.pop();if(r===t)return o[n]===t?null:o[n];o[n]=r}else{if(r===t)return this.options[n]===t?null:this.options[n];i[n]=r}}return this._setOptions(i),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,e==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(t,n,r){var i,s=this;typeof t!="boolean"&&(r=n,n=t,t=!1),r?(n=i=e(n),this.bindings=this.bindings.add(n)):(r=n,n=this.element,i=this.widget()),e.each(r,function(r,o){function u(){if(!t&&(s.options.disabled===!0||e(this).hasClass("ui-state-disabled")))return;return(typeof o=="string"?s[o]:o).apply(s,arguments)}typeof o!="string"&&(u.guid=o.guid=o.guid||u.guid||e.guid++);var a=r.match(/^(\w+)\s*(.*)$/),f=a[1]+s.eventNamespace,l=a[2];l?i.delegate(l,f,u):n.bind(f,u)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return(typeof e=="string"?r[e]:e).apply(r,arguments)}var r=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,r){var i,s,o=this.options[t];r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent;if(s)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.apply(this.element[0],[n].concat(r))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(r,i,s){typeof i=="string"&&(i={effect:i});var o,u=i?i===!0||typeof i=="number"?n:i.effect||n:t;i=i||{},typeof i=="number"&&(i={duration:i}),o=!e.isEmptyObject(i),i.complete=s,i.delay&&r.delay(i.delay),o&&e.effects&&(e.effects.effect[u]||e.uiBackCompat!==!1&&e.effects[u])?r[t](i):u!==t&&r[u]?r[u](i.duration,i.easing,s):r.queue(function(n){e(this)[t](),s&&s.call(r[0]),n()})}}),e.uiBackCompat!==!1&&(e.Widget.prototype._getCreateOptions=function(){return e.metadata&&e.metadata.get(this.element[0])[this.widgetName]})})(jQuery);(function(e,t){var n=!1;e(document).mouseup(function(e){n=!1}),e.widget("ui.mouse",{version:"1.9.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(n){if(!0===e.data(n.target,t.widgetName+".preventClickEvent"))return e.removeData(n.target,t.widgetName+".preventClickEvent"),n.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(n)return;this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var r=this,i=t.which===1,s=typeof this.options.cancel=="string"&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;if(!i||s||!this._mouseCapture(t))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){r.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)){this._mouseStarted=this._mouseStart(t)!==!1;if(!this._mouseStarted)return t.preventDefault(),!0}return!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return r._mouseMove(e)},this._mouseUpDelegate=function(e){return r._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),n=!0,!0},_mouseMove:function(t){return!e.ui.ie||document.documentMode>=9||!!t.button?this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted):this._mouseUp(t)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(e){return this.mouseDelayMet},_mouseStart:function(e){},_mouseDrag:function(e){},_mouseStop:function(e){},_mouseCapture:function(e){return!0}})})(jQuery);(function(e,t){function h(e,t,n){return[parseInt(e[0],10)*(l.test(e[0])?t/100:1),parseInt(e[1],10)*(l.test(e[1])?n/100:1)]}function p(t,n){return parseInt(e.css(t,n),10)||0}e.ui=e.ui||{};var n,r=Math.max,i=Math.abs,s=Math.round,o=/left|center|right/,u=/top|center|bottom/,a=/[\+\-]\d+%?/,f=/^\w+/,l=/%$/,c=e.fn.position;e.position={scrollbarWidth:function(){if(n!==t)return n;var r,i,s=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return e("body").append(s),r=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,r===i&&(i=s[0].clientWidth),s.remove(),n=r-i},getScrollInfo:function(t){var n=t.isWindow?"":t.element.css("overflow-x"),r=t.isWindow?"":t.element.css("overflow-y"),i=n==="scroll"||n==="auto"&&t.width<t.element[0].scrollWidth,s=r==="scroll"||r==="auto"&&t.height<t.element[0].scrollHeight;return{width:i?e.position.scrollbarWidth():0,height:s?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var n=e(t||window),r=e.isWindow(n[0]);return{element:n,isWindow:r,offset:n.offset()||{left:0,top:0},scrollLeft:n.scrollLeft(),scrollTop:n.scrollTop(),width:r?n.width():n.outerWidth(),height:r?n.height():n.outerHeight()}}},e.fn.position=function(t){if(!t||!t.of)return c.apply(this,arguments);t=e.extend({},t);var n,l,d,v,m,g=e(t.of),y=e.position.getWithinInfo(t.within),b=e.position.getScrollInfo(y),w=g[0],E=(t.collision||"flip").split(" "),S={};return w.nodeType===9?(l=g.width(),d=g.height(),v={top:0,left:0}):e.isWindow(w)?(l=g.width(),d=g.height(),v={top:g.scrollTop(),left:g.scrollLeft()}):w.preventDefault?(t.at="left top",l=d=0,v={top:w.pageY,left:w.pageX}):(l=g.outerWidth(),d=g.outerHeight(),v=g.offset()),m=e.extend({},v),e.each(["my","at"],function(){var e=(t[this]||"").split(" "),n,r;e.length===1&&(e=o.test(e[0])?e.concat(["center"]):u.test(e[0])?["center"].concat(e):["center","center"]),e[0]=o.test(e[0])?e[0]:"center",e[1]=u.test(e[1])?e[1]:"center",n=a.exec(e[0]),r=a.exec(e[1]),S[this]=[n?n[0]:0,r?r[0]:0],t[this]=[f.exec(e[0])[0],f.exec(e[1])[0]]}),E.length===1&&(E[1]=E[0]),t.at[0]==="right"?m.left+=l:t.at[0]==="center"&&(m.left+=l/2),t.at[1]==="bottom"?m.top+=d:t.at[1]==="center"&&(m.top+=d/2),n=h(S.at,l,d),m.left+=n[0],m.top+=n[1],this.each(function(){var o,u,a=e(this),f=a.outerWidth(),c=a.outerHeight(),w=p(this,"marginLeft"),x=p(this,"marginTop"),T=f+w+p(this,"marginRight")+b.width,N=c+x+p(this,"marginBottom")+b.height,C=e.extend({},m),k=h(S.my,a.outerWidth(),a.outerHeight());t.my[0]==="right"?C.left-=f:t.my[0]==="center"&&(C.left-=f/2),t.my[1]==="bottom"?C.top-=c:t.my[1]==="center"&&(C.top-=c/2),C.left+=k[0],C.top+=k[1],e.support.offsetFractions||(C.left=s(C.left),C.top=s(C.top)),o={marginLeft:w,marginTop:x},e.each(["left","top"],function(r,i){e.ui.position[E[r]]&&e.ui.position[E[r]][i](C,{targetWidth:l,targetHeight:d,elemWidth:f,elemHeight:c,collisionPosition:o,collisionWidth:T,collisionHeight:N,offset:[n[0]+k[0],n[1]+k[1]],my:t.my,at:t.at,within:y,elem:a})}),e.fn.bgiframe&&a.bgiframe(),t.using&&(u=function(e){var n=v.left-C.left,s=n+l-f,o=v.top-C.top,u=o+d-c,h={target:{element:g,left:v.left,top:v.top,width:l,height:d},element:{element:a,left:C.left,top:C.top,width:f,height:c},horizontal:s<0?"left":n>0?"right":"center",vertical:u<0?"top":o>0?"bottom":"middle"};l<f&&i(n+s)<l&&(h.horizontal="center"),d<c&&i(o+u)<d&&(h.vertical="middle"),r(i(n),i(s))>r(i(o),i(u))?h.important="horizontal":h.important="vertical",t.using.call(this,e,h)}),a.offset(e.extend(C,{using:u}))})},e.ui.position={fit:{left:function(e,t){var n=t.within,i=n.isWindow?n.scrollLeft:n.offset.left,s=n.width,o=e.left-t.collisionPosition.marginLeft,u=i-o,a=o+t.collisionWidth-s-i,f;t.collisionWidth>s?u>0&&a<=0?(f=e.left+u+t.collisionWidth-s-i,e.left+=u-f):a>0&&u<=0?e.left=i:u>a?e.left=i+s-t.collisionWidth:e.left=i:u>0?e.left+=u:a>0?e.left-=a:e.left=r(e.left-o,e.left)},top:function(e,t){var n=t.within,i=n.isWindow?n.scrollTop:n.offset.top,s=t.within.height,o=e.top-t.collisionPosition.marginTop,u=i-o,a=o+t.collisionHeight-s-i,f;t.collisionHeight>s?u>0&&a<=0?(f=e.top+u+t.collisionHeight-s-i,e.top+=u-f):a>0&&u<=0?e.top=i:u>a?e.top=i+s-t.collisionHeight:e.top=i:u>0?e.top+=u:a>0?e.top-=a:e.top=r(e.top-o,e.top)}},flip:{left:function(e,t){var n=t.within,r=n.offset.left+n.scrollLeft,s=n.width,o=n.isWindow?n.scrollLeft:n.offset.left,u=e.left-t.collisionPosition.marginLeft,a=u-o,f=u+t.collisionWidth-s-o,l=t.my[0]==="left"?-t.elemWidth:t.my[0]==="right"?t.elemWidth:0,c=t.at[0]==="left"?t.targetWidth:t.at[0]==="right"?-t.targetWidth:0,h=-2*t.offset[0],p,d;if(a<0){p=e.left+l+c+h+t.collisionWidth-s-r;if(p<0||p<i(a))e.left+=l+c+h}else if(f>0){d=e.left-t.collisionPosition.marginLeft+l+c+h-o;if(d>0||i(d)<f)e.left+=l+c+h}},top:function(e,t){var n=t.within,r=n.offset.top+n.scrollTop,s=n.height,o=n.isWindow?n.scrollTop:n.offset.top,u=e.top-t.collisionPosition.marginTop,a=u-o,f=u+t.collisionHeight-s-o,l=t.my[1]==="top",c=l?-t.elemHeight:t.my[1]==="bottom"?t.elemHeight:0,h=t.at[1]==="top"?t.targetHeight:t.at[1]==="bottom"?-t.targetHeight:0,p=-2*t.offset[1],d,v;a<0?(v=e.top+c+h+p+t.collisionHeight-s-r,e.top+c+h+p>a&&(v<0||v<i(a))&&(e.top+=c+h+p)):f>0&&(d=e.top-t.collisionPosition.marginTop+c+h+p-o,e.top+c+h+p>f&&(d>0||i(d)<f)&&(e.top+=c+h+p))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,n,r,i,s,o=document.getElementsByTagName("body")[0],u=document.createElement("div");t=document.createElement(o?"div":"body"),r={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&e.extend(r,{position:"absolute",left:"-1000px",top:"-1000px"});for(s in r)t.style[s]=r[s];t.appendChild(u),n=o||document.documentElement,n.insertBefore(t,n.firstChild),u.style.cssText="position: absolute; left: 10.7432222px;",i=e(u).offset().left,e.support.offsetFractions=i>10&&i<11,t.innerHTML="",n.removeChild(t)}(),e.uiBackCompat!==!1&&function(e){var n=e.fn.position;e.fn.position=function(r){if(!r||!r.offset)return n.call(this,r);var i=r.offset.split(" "),s=r.at.split(" ");return i.length===1&&(i[1]=i[0]),/^\d/.test(i[0])&&(i[0]="+"+i[0]),/^\d/.test(i[1])&&(i[1]="+"+i[1]),s.length===1&&(/left|center|right/.test(s[0])?s[1]="center":(s[1]=s[0],s[0]="center")),n.call(this,e.extend(r,{at:s[0]+i[0]+" "+s[1]+i[1],offset:t}))}}(jQuery)})(jQuery);(function(e,t){e.widget("ui.draggable",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var n=this.options;return this.helper||n.disabled||e(t.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(t),this.handle?(e(n.iframeFix===!0?"iframe":n.iframeFix).each(function(){e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var n=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,n.cursorAt&&this._adjustOffsetFromHelper(n.cursorAt),n.containment&&this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,n){this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute");if(!n){var r=this._uiHash();if(this._trigger("drag",t,r)===!1)return this._mouseUp({}),!1;this.position=r.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var n=!1;e.ui.ddmanager&&!this.options.dropBehaviour&&(n=e.ui.ddmanager.drop(this,t)),this.dropped&&(n=this.dropped,this.dropped=!1);var r=this.element[0],i=!1;while(r&&(r=r.parentNode))r==document&&(i=!0);if(!i&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!n||this.options.revert=="valid"&&n||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,n)){var s=this;e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){s._trigger("stop",t)!==!1&&s._clear()})}else this._trigger("stop",t)!==!1&&this._clear();return!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){var n=!this.options.handle||!e(this.options.handle,this.element).length?!0:!1;return e(this.options.handle,this.element).find("*").andSelf().each(function(){this==t.target&&(n=!0)}),n},_createHelper:function(t){var n=this.options,r=e.isFunction(n.helper)?e(n.helper.apply(this.element[0],[t])):n.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return r.parents("body").length||r.appendTo(n.appendTo=="parent"?this.element[0].parentNode:n.appendTo),r[0]!=this.element[0]&&!/(fixed|absolute)/.test(r.css("position"))&&r.css("position","absolute"),r},_adjustOffsetFromHelper:function(t){typeof t=="string"&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&e.ui.ie)t={top:0,left:0};return{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t=this.options;t.containment=="parent"&&(t.containment=this.helper[0].parentNode);if(t.containment=="document"||t.containment=="window")this.containment=[t.containment=="document"?0:e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t.containment=="document"?0:e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(t.containment=="document"?0:e(window).scrollLeft())+e(t.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(t.containment=="document"?0:e(window).scrollTop())+(e(t.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(t.containment)&&t.containment.constructor!=Array){var n=e(t.containment),r=n[0];if(!r)return;var i=n.offset(),s=e(r).css("overflow")!="hidden";this.containment=[(parseInt(e(r).css("borderLeftWidth"),10)||0)+(parseInt(e(r).css("paddingLeft"),10)||0),(parseInt(e(r).css("borderTopWidth"),10)||0)+(parseInt(e(r).css("paddingTop"),10)||0),(s?Math.max(r.scrollWidth,r.offsetWidth):r.offsetWidth)-(parseInt(e(r).css("borderLeftWidth"),10)||0)-(parseInt(e(r).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(s?Math.max(r.scrollHeight,r.offsetHeight):r.offsetHeight)-(parseInt(e(r).css("borderTopWidth"),10)||0)-(parseInt(e(r).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=n}else t.containment.constructor==Array&&(this.containment=t.containment)},_convertPositionTo:function(t,n){n||(n=this.position);var r=t=="absolute"?1:-1,i=this.options,s=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(s[0].tagName);return{top:n.top+this.offset.relative.top*r+this.offset.parent.top*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():o?0:s.scrollTop())*r,left:n.left+this.offset.relative.left*r+this.offset.parent.left*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():o?0:s.scrollLeft())*r}},_generatePosition:function(t){var n=this.options,r=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,i=/(html|body)/i.test(r[0].tagName),s=t.pageX,o=t.pageY;if(this.originalPosition){var u;if(this.containment){if(this.relative_container){var a=this.relative_container.offset();u=[this.containment[0]+a.left,this.containment[1]+a.top,this.containment[2]+a.left,this.containment[3]+a.top]}else u=this.containment;t.pageX-this.offset.click.left<u[0]&&(s=u[0]+this.offset.click.left),t.pageY-this.offset.click.top<u[1]&&(o=u[1]+this.offset.click.top),t.pageX-this.offset.click.left>u[2]&&(s=u[2]+this.offset.click.left),t.pageY-this.offset.click.top>u[3]&&(o=u[3]+this.offset.click.top)}if(n.grid){var f=n.grid[1]?this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1]:this.originalPageY;o=u?f-this.offset.click.top<u[1]||f-this.offset.click.top>u[3]?f-this.offset.click.top<u[1]?f+n.grid[1]:f-n.grid[1]:f:f;var l=n.grid[0]?this.originalPageX+Math.round((s-this.originalPageX)/n.grid[0])*n.grid[0]:this.originalPageX;s=u?l-this.offset.click.left<u[0]||l-this.offset.click.left>u[2]?l-this.offset.click.left<u[0]?l+n.grid[0]:l-n.grid[0]:l:l}}return{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():i?0:r.scrollTop()),left:s-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:r.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,n,r){return r=r||this._uiHash(),e.ui.plugin.call(this,t,[n,r]),t=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,n,r)},plugins:{},_uiHash:function(e){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,n){var r=e(this).data("draggable"),i=r.options,s=e.extend({},n,{item:r.element});r.sortables=[],e(i.connectToSortable).each(function(){var n=e.data(this,"sortable");n&&!n.options.disabled&&(r.sortables.push({instance:n,shouldRevert:n.options.revert}),n.refreshPositions(),n._trigger("activate",t,s))})},stop:function(t,n){var r=e(this).data("draggable"),i=e.extend({},n,{item:r.element});e.each(r.sortables,function(){this.instance.isOver?(this.instance.isOver=0,r.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,r.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,i))})},drag:function(t,n){var r=e(this).data("draggable"),i=this,s=function(t){var n=this.offset.click.top,r=this.offset.click.left,i=this.positionAbs.top,s=this.positionAbs.left,o=t.height,u=t.width,a=t.top,f=t.left;return e.ui.isOver(i+n,s+r,a,f,o,u)};e.each(r.sortables,function(s){var o=!1,u=this;this.instance.positionAbs=r.positionAbs,this.instance.helperProportions=r.helperProportions,this.instance.offset.click=r.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(o=!0,e.each(r.sortables,function(){return this.instance.positionAbs=r.positionAbs,this.instance.helperProportions=r.helperProportions,this.instance.offset.click=r.offset.click,this!=u&&this.instance._intersectsWith(this.instance.containerCache)&&e.ui.contains(u.instance.element[0],this.instance.element[0])&&(o=!1),o})),o?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return n.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=r.offset.click.top,this.instance.offset.click.left=r.offset.click.left,this.instance.offset.parent.left-=r.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=r.offset.parent.top-this.instance.offset.parent.top,r._trigger("toSortable",t),r.dropped=this.instance.element,r.currentItem=r.element,this.instance.fromOutside=r),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),r._trigger("fromSortable",t),r.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,n){var r=e("body"),i=e(this).data("draggable").options;r.css("cursor")&&(i._cursor=r.css("cursor")),r.css("cursor",i.cursor)},stop:function(t,n){var r=e(this).data("draggable").options;r._cursor&&e("body").css("cursor",r._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,n){var r=e(n.helper),i=e(this).data("draggable").options;r.css("opacity")&&(i._opacity=r.css("opacity")),r.css("opacity",i.opacity)},stop:function(t,n){var r=e(this).data("draggable").options;r._opacity&&e(n.helper).css("opacity",r._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(t,n){var r=e(this).data("draggable");r.scrollParent[0]!=document&&r.scrollParent[0].tagName!="HTML"&&(r.overflowOffset=r.scrollParent.offset())},drag:function(t,n){var r=e(this).data("draggable"),i=r.options,s=!1;if(r.scrollParent[0]!=document&&r.scrollParent[0].tagName!="HTML"){if(!i.axis||i.axis!="x")r.overflowOffset.top+r.scrollParent[0].offsetHeight-t.pageY<i.scrollSensitivity?r.scrollParent[0].scrollTop=s=r.scrollParent[0].scrollTop+i.scrollSpeed:t.pageY-r.overflowOffset.top<i.scrollSensitivity&&(r.scrollParent[0].scrollTop=s=r.scrollParent[0].scrollTop-i.scrollSpeed);if(!i.axis||i.axis!="y")r.overflowOffset.left+r.scrollParent[0].offsetWidth-t.pageX<i.scrollSensitivity?r.scrollParent[0].scrollLeft=s=r.scrollParent[0].scrollLeft+i.scrollSpeed:t.pageX-r.overflowOffset.left<i.scrollSensitivity&&(r.scrollParent[0].scrollLeft=s=r.scrollParent[0].scrollLeft-i.scrollSpeed)}else{if(!i.axis||i.axis!="x")t.pageY-e(document).scrollTop()<i.scrollSensitivity?s=e(document).scrollTop(e(document).scrollTop()-i.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<i.scrollSensitivity&&(s=e(document).scrollTop(e(document).scrollTop()+i.scrollSpeed));if(!i.axis||i.axis!="y")t.pageX-e(document).scrollLeft()<i.scrollSensitivity?s=e(document).scrollLeft(e(document).scrollLeft()-i.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<i.scrollSensitivity&&(s=e(document).scrollLeft(e(document).scrollLeft()+i.scrollSpeed))}s!==!1&&e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(r,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,n){var r=e(this).data("draggable"),i=r.options;r.snapElements=[],e(i.snap.constructor!=String?i.snap.items||":data(draggable)":i.snap).each(function(){var t=e(this),n=t.offset();this!=r.element[0]&&r.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:n.top,left:n.left})})},drag:function(t,n){var r=e(this).data("draggable"),i=r.options,s=i.snapTolerance,o=n.offset.left,u=o+r.helperProportions.width,a=n.offset.top,f=a+r.helperProportions.height;for(var l=r.snapElements.length-1;l>=0;l--){var c=r.snapElements[l].left,h=c+r.snapElements[l].width,p=r.snapElements[l].top,d=p+r.snapElements[l].height;if(!(c-s<o&&o<h+s&&p-s<a&&a<d+s||c-s<o&&o<h+s&&p-s<f&&f<d+s||c-s<u&&u<h+s&&p-s<a&&a<d+s||c-s<u&&u<h+s&&p-s<f&&f<d+s)){r.snapElements[l].snapping&&r.options.snap.release&&r.options.snap.release.call(r.element,t,e.extend(r._uiHash(),{snapItem:r.snapElements[l].item})),r.snapElements[l].snapping=!1;continue}if(i.snapMode!="inner"){var v=Math.abs(p-f)<=s,m=Math.abs(d-a)<=s,g=Math.abs(c-u)<=s,y=Math.abs(h-o)<=s;v&&(n.position.top=r._convertPositionTo("relative",{top:p-r.helperProportions.height,left:0}).top-r.margins.top),m&&(n.position.top=r._convertPositionTo("relative",{top:d,left:0}).top-r.margins.top),g&&(n.position.left=r._convertPositionTo("relative",{top:0,left:c-r.helperProportions.width}).left-r.margins.left),y&&(n.position.left=r._convertPositionTo("relative",{top:0,left:h}).left-r.margins.left)}var b=v||m||g||y;if(i.snapMode!="outer"){var v=Math.abs(p-a)<=s,m=Math.abs(d-f)<=s,g=Math.abs(c-o)<=s,y=Math.abs(h-u)<=s;v&&(n.position.top=r._convertPositionTo("relative",{top:p,left:0}).top-r.margins.top),m&&(n.position.top=r._convertPositionTo("relative",{top:d-r.helperProportions.height,left:0}).top-r.margins.top),g&&(n.position.left=r._convertPositionTo("relative",{top:0,left:c}).left-r.margins.left),y&&(n.position.left=r._convertPositionTo("relative",{top:0,left:h-r.helperProportions.width}).left-r.margins.left)}!r.snapElements[l].snapping&&(v||m||g||y||b)&&r.options.snap.snap&&r.options.snap.snap.call(r.element,t,e.extend(r._uiHash(),{snapItem:r.snapElements[l].item})),r.snapElements[l].snapping=v||m||g||y||b}}}),e.ui.plugin.add("draggable","stack",{start:function(t,n){var r=e(this).data("draggable").options,i=e.makeArray(e(r.stack)).sort(function(t,n){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(n).css("zIndex"),10)||0)});if(!i.length)return;var s=parseInt(i[0].style.zIndex)||0;e(i).each(function(e){this.style.zIndex=s+e}),this[0].style.zIndex=s+i.length}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,n){var r=e(n.helper),i=e(this).data("draggable").options;r.css("zIndex")&&(i._zIndex=r.css("zIndex")),r.css("zIndex",i.zIndex)},stop:function(t,n){var r=e(this).data("draggable").options;r._zIndex&&e(n.helper).css("zIndex",r._zIndex)}})})(jQuery);(function(e,t){e.widget("ui.droppable",{version:"1.9.2",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var t=this.options,n=t.accept;this.isover=0,this.isout=1,this.accept=e.isFunction(n)?n:function(e){return e.is(n)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},e.ui.ddmanager.droppables[t.scope]=e.ui.ddmanager.droppables[t.scope]||[],e.ui.ddmanager.droppables[t.scope].push(this),t.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];for(var n=0;n<t.length;n++)t[n]==this&&t.splice(n,1);this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,n){t=="accept"&&(this.accept=e.isFunction(n)?n:function(e){return e.is(n)}),e.Widget.prototype._setOption.apply(this,arguments)},_activate:function(t){var n=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),n&&this._trigger("activate",t,this.ui(n))},_deactivate:function(t){var n=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),n&&this._trigger("deactivate",t,this.ui(n))},_over:function(t){var n=e.ui.ddmanager.current;if(!n||(n.currentItem||n.element)[0]==this.element[0])return;this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(n)))},_out:function(t){var n=e.ui.ddmanager.current;if(!n||(n.currentItem||n.element)[0]==this.element[0])return;this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(n)))},_drop:function(t,n){var r=n||e.ui.ddmanager.current;if(!r||(r.currentItem||r.element)[0]==this.element[0])return!1;var i=!1;return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var t=e.data(this,"droppable");if(t.options.greedy&&!t.options.disabled&&t.options.scope==r.options.scope&&t.accept.call(t.element[0],r.currentItem||r.element)&&e.ui.intersect(r,e.extend(t,{offset:t.element.offset()}),t.options.tolerance))return i=!0,!1}),i?!1:this.accept.call(this.element[0],r.currentItem||r.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(r)),this.element):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(t,n,r){if(!n.offset)return!1;var i=(t.positionAbs||t.position.absolute).left,s=i+t.helperProportions.width,o=(t.positionAbs||t.position.absolute).top,u=o+t.helperProportions.height,a=n.offset.left,f=a+n.proportions.width,l=n.offset.top,c=l+n.proportions.height;switch(r){case"fit":return a<=i&&s<=f&&l<=o&&u<=c;case"intersect":return a<i+t.helperProportions.width/2&&s-t.helperProportions.width/2<f&&l<o+t.helperProportions.height/2&&u-t.helperProportions.height/2<c;case"pointer":var h=(t.positionAbs||t.position.absolute).left+(t.clickOffset||t.offset.click).left,p=(t.positionAbs||t.position.absolute).top+(t.clickOffset||t.offset.click).top,d=e.ui.isOver(p,h,l,a,n.proportions.height,n.proportions.width);return d;case"touch":return(o>=l&&o<=c||u>=l&&u<=c||o<l&&u>c)&&(i>=a&&i<=f||s>=a&&s<=f||i<a&&s>f);default:return!1}},e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,n){var r=e.ui.ddmanager.droppables[t.options.scope]||[],i=n?n.type:null,s=(t.currentItem||t.element).find(":data(droppable)").andSelf();e:for(var o=0;o<r.length;o++){if(r[o].options.disabled||t&&!r[o].accept.call(r[o].element[0],t.currentItem||t.element))continue;for(var u=0;u<s.length;u++)if(s[u]==r[o].element[0]){r[o].proportions.height=0;continue e}r[o].visible=r[o].element.css("display")!="none";if(!r[o].visible)continue;i=="mousedown"&&r[o]._activate.call(r[o],n),r[o].offset=r[o].element.offset(),r[o].proportions={width:r[o].element[0].offsetWidth,height:r[o].element[0].offsetHeight}}},drop:function(t,n){var r=!1;return e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options)return;!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance)&&(r=this._drop.call(this,n)||r),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,n))}),r},dragStart:function(t,n){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,n)})},drag:function(t,n){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,n),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible)return;var r=e.ui.intersect(t,this,this.options.tolerance),i=!r&&this.isover==1?"isout":r&&this.isover==0?"isover":null;if(!i)return;var s;if(this.options.greedy){var o=this.options.scope,u=this.element.parents(":data(droppable)").filter(function(){return e.data(this,"droppable").options.scope===o});u.length&&(s=e.data(u[0],"droppable"),s.greedyChild=i=="isover"?1:0)}s&&i=="isover"&&(s.isover=0,s.isout=1,s._out.call(s,n)),this[i]=1,this[i=="isout"?"isover":"isout"]=0,this[i=="isover"?"_over":"_out"].call(this,n),s&&i=="isout"&&(s.isout=0,s.isover=1,s._over.call(s,n))})},dragStop:function(t,n){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,n)}}})(jQuery);(function(e,t){e.widget("ui.resizable",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var t=this,n=this.options;this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!n.aspectRatio,aspectRatio:n.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:n.helper||n.ghost||n.animate?n.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=n.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var r=this.handles.split(",");this.handles={};for(var i=0;i<r.length;i++){var s=e.trim(r[i]),o="ui-resizable-"+s,u=e('<div class="ui-resizable-handle '+o+'"></div>');u.css({zIndex:n.zIndex}),"se"==s&&u.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(u)}}this._renderAxis=function(t){t=t||this.element;for(var n in this.handles){this.handles[n].constructor==String&&(this.handles[n]=e(this.handles[n],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var r=e(this.handles[n],this.element),i=0;i=/sw|ne|nw|se|n|s/.test(n)?r.outerHeight():r.outerWidth();var s=["padding",/ne|nw|n/.test(n)?"Top":/se|sw|s/.test(n)?"Bottom":/^e$/.test(n)?"Right":"Left"].join("");t.css(s,i),this._proportionallyResize()}if(!e(this.handles[n]).length)continue}},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!t.resizing){if(this.className)var e=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);t.axis=e&&e[1]?e[1]:"se"}}),n.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){if(n.disabled)return;e(this).removeClass("ui-resizable-autohide"),t._handles.show()}).mouseleave(function(){if(n.disabled)return;t.resizing||(e(this).addClass("ui-resizable-autohide"),t._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){t(this.element);var n=this.element;this.originalElement.css({position:n.css("position"),width:n.outerWidth(),height:n.outerHeight(),top:n.css("top"),left:n.css("left")}).insertAfter(n),n.remove()}return this.originalElement.css("resize",this.originalResizeStyle),t(this.originalElement),this},_mouseCapture:function(t){var n=!1;for(var r in this.handles)e(this.handles[r])[0]==t.target&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(t){var r=this.options,i=this.element.position(),s=this.element;this.resizing=!0,this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()},(s.is(".ui-draggable")||/absolute/.test(s.css("position")))&&s.css({position:"absolute",top:i.top,left:i.left}),this._renderProxy();var o=n(this.helper.css("left")),u=n(this.helper.css("top"));r.containment&&(o+=e(r.containment).scrollLeft()||0,u+=e(r.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:o,top:u},this.size=this._helper?{width:s.outerWidth(),height:s.outerHeight()}:{width:s.width(),height:s.height()},this.originalSize=this._helper?{width:s.outerWidth(),height:s.outerHeight()}:{width:s.width(),height:s.height()},this.originalPosition={left:o,top:u},this.sizeDiff={width:s.outerWidth()-s.width(),height:s.outerHeight()-s.height()},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio=typeof r.aspectRatio=="number"?r.aspectRatio:this.originalSize.width/this.originalSize.height||1;var a=e(".ui-resizable-"+this.axis).css("cursor");return e("body").css("cursor",a=="auto"?this.axis+"-resize":a),s.addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(e){var t=this.helper,n=this.options,r={},i=this,s=this.originalMousePosition,o=this.axis,u=e.pageX-s.left||0,a=e.pageY-s.top||0,f=this._change[o];if(!f)return!1;var l=f.apply(this,[e,u,a]);this._updateVirtualBoundaries(e.shiftKey);if(this._aspectRatio||e.shiftKey)l=this._updateRatio(l,e);return l=this._respectSize(l,e),this._propagate("resize",e),t.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(l),this._trigger("resize",e,this.ui()),!1},_mouseStop:function(t){this.resizing=!1;var n=this.options,r=this;if(this._helper){var i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),o=s&&e.ui.hasScroll(i[0],"left")?0:r.sizeDiff.height,u=s?0:r.sizeDiff.width,a={width:r.helper.width()-u,height:r.helper.height()-o},f=parseInt(r.element.css("left"),10)+(r.position.left-r.originalPosition.left)||null,l=parseInt(r.element.css("top"),10)+(r.position.top-r.originalPosition.top)||null;n.animate||this.element.css(e.extend(a,{top:l,left:f})),r.helper.height(r.size.height),r.helper.width(r.size.width),this._helper&&!n.animate&&this._proportionallyResize()}return e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t=this.options,n,i,s,o,u;u={minWidth:r(t.minWidth)?t.minWidth:0,maxWidth:r(t.maxWidth)?t.maxWidth:Infinity,minHeight:r(t.minHeight)?t.minHeight:0,maxHeight:r(t.maxHeight)?t.maxHeight:Infinity};if(this._aspectRatio||e)n=u.minHeight*this.aspectRatio,s=u.minWidth/this.aspectRatio,i=u.maxHeight*this.aspectRatio,o=u.maxWidth/this.aspectRatio,n>u.minWidth&&(u.minWidth=n),s>u.minHeight&&(u.minHeight=s),i<u.maxWidth&&(u.maxWidth=i),o<u.maxHeight&&(u.maxHeight=o);this._vBoundaries=u},_updateCache:function(e){var t=this.options;this.offset=this.helper.offset(),r(e.left)&&(this.position.left=e.left),r(e.top)&&(this.position.top=e.top),r(e.height)&&(this.size.height=e.height),r(e.width)&&(this.size.width=e.width)},_updateRatio:function(e,t){var n=this.options,i=this.position,s=this.size,o=this.axis;return r(e.height)?e.width=e.height*this.aspectRatio:r(e.width)&&(e.height=e.width/this.aspectRatio),o=="sw"&&(e.left=i.left+(s.width-e.width),e.top=null),o=="nw"&&(e.top=i.top+(s.height-e.height),e.left=i.left+(s.width-e.width)),e},_respectSize:function(e,t){var n=this.helper,i=this._vBoundaries,s=this._aspectRatio||t.shiftKey,o=this.axis,u=r(e.width)&&i.maxWidth&&i.maxWidth<e.width,a=r(e.height)&&i.maxHeight&&i.maxHeight<e.height,f=r(e.width)&&i.minWidth&&i.minWidth>e.width,l=r(e.height)&&i.minHeight&&i.minHeight>e.height;f&&(e.width=i.minWidth),l&&(e.height=i.minHeight),u&&(e.width=i.maxWidth),a&&(e.height=i.maxHeight);var c=this.originalPosition.left+this.originalSize.width,h=this.position.top+this.size.height,p=/sw|nw|w/.test(o),d=/nw|ne|n/.test(o);f&&p&&(e.left=c-i.minWidth),u&&p&&(e.left=c-i.maxWidth),l&&d&&(e.top=h-i.minHeight),a&&d&&(e.top=h-i.maxHeight);var v=!e.width&&!e.height;return v&&!e.left&&e.top?e.top=null:v&&!e.top&&e.left&&(e.left=null),e},_proportionallyResize:function(){var t=this.options;if(!this._proportionallyResizeElements.length)return;var n=this.helper||this.element;for(var r=0;r<this._proportionallyResizeElements.length;r++){var i=this._proportionallyResizeElements[r];if(!this.borderDif){var s=[i.css("borderTopWidth"),i.css("borderRightWidth"),i.css("borderBottomWidth"),i.css("borderLeftWidth")],o=[i.css("paddingTop"),i.css("paddingRight"),i.css("paddingBottom"),i.css("paddingLeft")];this.borderDif=e.map(s,function(e,t){var n=parseInt(e,10)||0,r=parseInt(o[t],10)||0;return n+r})}i.css({height:n.height()-this.borderDif[0]-this.borderDif[2]||0,width:n.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var t=this.element,n=this.options;this.elementOffset=t.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var r=e.ui.ie6?1:0,i=e.ui.ie6?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+i,height:this.element.outerHeight()+i,position:"absolute",left:this.elementOffset.left-r+"px",top:this.elementOffset.top-r+"px",zIndex:++n.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(e,t,n){return{width:this.originalSize.width+t}},w:function(e,t,n){var r=this.options,i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,n){var r=this.options,i=this.originalSize,s=this.originalPosition;return{top:s.top+n,height:i.height-n}},s:function(e,t,n){return{height:this.originalSize.height+n}},se:function(t,n,r){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,n,r]))},sw:function(t,n,r){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,n,r]))},ne:function(t,n,r){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,n,r]))},nw:function(t,n,r){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,n,r]))}},_propagate:function(t,n){e.ui.plugin.call(this,t,[n,this.ui()]),t!="resize"&&this._trigger(t,n,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","alsoResize",{start:function(t,n){var r=e(this).data("resizable"),i=r.options,s=function(t){e(t).each(function(){var t=e(this);t.data("resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};typeof i.alsoResize=="object"&&!i.alsoResize.parentNode?i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)}):s(i.alsoResize)},resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.originalSize,o=r.originalPosition,u={height:r.size.height-s.height||0,width:r.size.width-s.width||0,top:r.position.top-o.top||0,left:r.position.left-o.left||0},a=function(t,r){e(t).each(function(){var t=e(this),i=e(this).data("resizable-alsoresize"),s={},o=r&&r.length?r:t.parents(n.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var n=(i[t]||0)+(u[t]||0);n&&n>=0&&(s[t]=n||null)}),t.css(s)})};typeof i.alsoResize=="object"&&!i.alsoResize.nodeType?e.each(i.alsoResize,function(e,t){a(e,t)}):a(i.alsoResize)},stop:function(t,n){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","animate",{stop:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r._proportionallyResizeElements,o=s.length&&/textarea/i.test(s[0].nodeName),u=o&&e.ui.hasScroll(s[0],"left")?0:r.sizeDiff.height,a=o?0:r.sizeDiff.width,f={width:r.size.width-a,height:r.size.height-u},l=parseInt(r.element.css("left"),10)+(r.position.left-r.originalPosition.left)||null,c=parseInt(r.element.css("top"),10)+(r.position.top-r.originalPosition.top)||null;r.element.animate(e.extend(f,c&&l?{top:c,left:l}:{}),{duration:i.animateDuration,easing:i.animateEasing,step:function(){var n={width:parseInt(r.element.css("width"),10),height:parseInt(r.element.css("height"),10),top:parseInt(r.element.css("top"),10),left:parseInt(r.element.css("left"),10)};s&&s.length&&e(s[0]).css({width:n.width,height:n.height}),r._updateCache(n),r._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(t,r){var i=e(this).data("resizable"),s=i.options,o=i.element,u=s.containment,a=u instanceof e?u.get(0):/parent/.test(u)?o.parent().get(0):u;if(!a)return;i.containerElement=e(a);if(/document/.test(u)||u==document)i.containerOffset={left:0,top:0},i.containerPosition={left:0,top:0},i.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight};else{var f=e(a),l=[];e(["Top","Right","Left","Bottom"]).each(function(e,t){l[e]=n(f.css("padding"+t))}),i.containerOffset=f.offset(),i.containerPosition=f.position(),i.containerSize={height:f.innerHeight()-l[3],width:f.innerWidth()-l[1]};var c=i.containerOffset,h=i.containerSize.height,p=i.containerSize.width,d=e.ui.hasScroll(a,"left")?a.scrollWidth:p,v=e.ui.hasScroll(a)?a.scrollHeight:h;i.parentData={element:a,left:c.left,top:c.top,width:d,height:v}}},resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.containerSize,o=r.containerOffset,u=r.size,a=r.position,f=r._aspectRatio||t.shiftKey,l={top:0,left:0},c=r.containerElement;c[0]!=document&&/static/.test(c.css("position"))&&(l=o),a.left<(r._helper?o.left:0)&&(r.size.width=r.size.width+(r._helper?r.position.left-o.left:r.position.left-l.left),f&&(r.size.height=r.size.width/r.aspectRatio),r.position.left=i.helper?o.left:0),a.top<(r._helper?o.top:0)&&(r.size.height=r.size.height+(r._helper?r.position.top-o.top:r.position.top),f&&(r.size.width=r.size.height*r.aspectRatio),r.position.top=r._helper?o.top:0),r.offset.left=r.parentData.left+r.position.left,r.offset.top=r.parentData.top+r.position.top;var h=Math.abs((r._helper?r.offset.left-l.left:r.offset.left-l.left)+r.sizeDiff.width),p=Math.abs((r._helper?r.offset.top-l.top:r.offset.top-o.top)+r.sizeDiff.height),d=r.containerElement.get(0)==r.element.parent().get(0),v=/relative|absolute/.test(r.containerElement.css("position"));d&&v&&(h-=r.parentData.left),h+r.size.width>=r.parentData.width&&(r.size.width=r.parentData.width-h,f&&(r.size.height=r.size.width/r.aspectRatio)),p+r.size.height>=r.parentData.height&&(r.size.height=r.parentData.height-p,f&&(r.size.width=r.size.height*r.aspectRatio))},stop:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.position,o=r.containerOffset,u=r.containerPosition,a=r.containerElement,f=e(r.helper),l=f.offset(),c=f.outerWidth()-r.sizeDiff.width,h=f.outerHeight()-r.sizeDiff.height;r._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:l.left-u.left-o.left,width:c,height:h}),r._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:l.left-u.left-o.left,width:c,height:h})}}),e.ui.plugin.add("resizable","ghost",{start:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.size;r.ghost=r.originalElement.clone(),r.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof i.ghost=="string"?i.ghost:""),r.ghost.appendTo(r.helper)},resize:function(t,n){var r=e(this).data("resizable"),i=r.options;r.ghost&&r.ghost.css({position:"relative",height:r.size.height,width:r.size.width})},stop:function(t,n){var r=e(this).data("resizable"),i=r.options;r.ghost&&r.helper&&r.helper.get(0).removeChild(r.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.size,o=r.originalSize,u=r.originalPosition,a=r.axis,f=i._aspectRatio||t.shiftKey;i.grid=typeof i.grid=="number"?[i.grid,i.grid]:i.grid;var l=Math.round((s.width-o.width)/(i.grid[0]||1))*(i.grid[0]||1),c=Math.round((s.height-o.height)/(i.grid[1]||1))*(i.grid[1]||1);/^(se|s|e)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c):/^(ne)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c,r.position.top=u.top-c):/^(sw)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c,r.position.left=u.left-l):(r.size.width=o.width+l,r.size.height=o.height+c,r.position.top=u.top-c,r.position.left=u.left-l)}});var n=function(e){return parseInt(e,10)||0},r=function(e){return!isNaN(parseInt(e,10))}})(jQuery);(function(e,t){e.widget("ui.selectable",e.ui.mouse,{version:"1.9.2",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch"},_create:function(){var t=this;this.element.addClass("ui-selectable"),this.dragged=!1;var n;this.refresh=function(){n=e(t.options.filter,t.element[0]),n.addClass("ui-selectee"),n.each(function(){var t=e(this),n=t.offset();e.data(this,"selectable-item",{element:this,$element:t,left:n.left,top:n.top,right:n.left+t.outerWidth(),bottom:n.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=n.addClass("ui-selectee"),this._mouseInit(),this.helper=e("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(t){var n=this;this.opos=[t.pageX,t.pageY];if(this.options.disabled)return;var r=this.options;this.selectees=e(r.filter,this.element[0]),this._trigger("start",t),e(r.appendTo).append(this.helper),this.helper.css({left:t.clientX,top:t.clientY,width:0,height:0}),r.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var r=e.data(this,"selectable-item");r.startselected=!0,!t.metaKey&&!t.ctrlKey&&(r.$element.removeClass("ui-selected"),r.selected=!1,r.$element.addClass("ui-unselecting"),r.unselecting=!0,n._trigger("unselecting",t,{unselecting:r.element}))}),e(t.target).parents().andSelf().each(function(){var r=e.data(this,"selectable-item");if(r){var i=!t.metaKey&&!t.ctrlKey||!r.$element.hasClass("ui-selected");return r.$element.removeClass(i?"ui-unselecting":"ui-selected").addClass(i?"ui-selecting":"ui-unselecting"),r.unselecting=!i,r.selecting=i,r.selected=i,i?n._trigger("selecting",t,{selecting:r.element}):n._trigger("unselecting",t,{unselecting:r.element}),!1}})},_mouseDrag:function(t){var n=this;this.dragged=!0;if(this.options.disabled)return;var r=this.options,i=this.opos[0],s=this.opos[1],o=t.pageX,u=t.pageY;if(i>o){var a=o;o=i,i=a}if(s>u){var a=u;u=s,s=a}return this.helper.css({left:i,top:s,width:o-i,height:u-s}),this.selectees.each(function(){var a=e.data(this,"selectable-item");if(!a||a.element==n.element[0])return;var f=!1;r.tolerance=="touch"?f=!(a.left>o||a.right<i||a.top>u||a.bottom<s):r.tolerance=="fit"&&(f=a.left>i&&a.right<o&&a.top>s&&a.bottom<u),f?(a.selected&&(a.$element.removeClass("ui-selected"),a.selected=!1),a.unselecting&&(a.$element.removeClass("ui-unselecting"),a.unselecting=!1),a.selecting||(a.$element.addClass("ui-selecting"),a.selecting=!0,n._trigger("selecting",t,{selecting:a.element}))):(a.selecting&&((t.metaKey||t.ctrlKey)&&a.startselected?(a.$element.removeClass("ui-selecting"),a.selecting=!1,a.$element.addClass("ui-selected"),a.selected=!0):(a.$element.removeClass("ui-selecting"),a.selecting=!1,a.startselected&&(a.$element.addClass("ui-unselecting"),a.unselecting=!0),n._trigger("unselecting",t,{unselecting:a.element}))),a.selected&&!t.metaKey&&!t.ctrlKey&&!a.startselected&&(a.$element.removeClass("ui-selected"),a.selected=!1,a.$element.addClass("ui-unselecting"),a.unselecting=!0,n._trigger("unselecting",t,{unselecting:a.element})))}),!1},_mouseStop:function(t){var n=this;this.dragged=!1;var r=this.options;return e(".ui-unselecting",this.element[0]).each(function(){var r=e.data(this,"selectable-item");r.$element.removeClass("ui-unselecting"),r.unselecting=!1,r.startselected=!1,n._trigger("unselected",t,{unselected:r.element})}),e(".ui-selecting",this.element[0]).each(function(){var r=e.data(this,"selectable-item");r.$element.removeClass("ui-selecting").addClass("ui-selected"),r.selecting=!1,r.selected=!0,r.startselected=!0,n._trigger("selected",t,{selected:r.element})}),this._trigger("stop",t),this.helper.remove(),!1}})})(jQuery);(function(e,t){e.widget("ui.sortable",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?e.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_setOption:function(t,n){t==="disabled"?(this.options[t]=n,this.widget().toggleClass("ui-sortable-disabled",!!n)):e.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(t,n){var r=this;if(this.reverting)return!1;if(this.options.disabled||this.options.type=="static")return!1;this._refreshItems(t);var i=null,s=e(t.target).parents().each(function(){if(e.data(this,r.widgetName+"-item")==r)return i=e(this),!1});e.data(t.target,r.widgetName+"-item")==r&&(i=e(t.target));if(!i)return!1;if(this.options.handle&&!n){var o=!1;e(this.options.handle,i).find("*").andSelf().each(function(){this==t.target&&(o=!0)});if(!o)return!1}return this.currentItem=i,this._removeCurrentsFromItems(),!0},_mouseStart:function(t,n,r){var i=this.options;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),i.containment&&this._setContainment(),i.cursor&&(e("body").css("cursor")&&(this._storedCursor=e("body").css("cursor")),e("body").css("cursor",i.cursor)),i.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",i.opacity)),i.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",i.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!r)for(var s=this.containers.length-1;s>=0;s--)this.containers[s]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var n=this.options,r=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<n.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+n.scrollSpeed:t.pageY-this.overflowOffset.top<n.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-n.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<n.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+n.scrollSpeed:t.pageX-this.overflowOffset.left<n.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-n.scrollSpeed)):(t.pageY-e(document).scrollTop()<n.scrollSensitivity?r=e(document).scrollTop(e(document).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<n.scrollSensitivity&&(r=e(document).scrollTop(e(document).scrollTop()+n.scrollSpeed)),t.pageX-e(document).scrollLeft()<n.scrollSensitivity?r=e(document).scrollLeft(e(document).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<n.scrollSensitivity&&(r=e(document).scrollLeft(e(document).scrollLeft()+n.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var i=this.items.length-1;i>=0;i--){var s=this.items[i],o=s.item[0],u=this._intersectsWithPointer(s);if(!u)continue;if(s.instance!==this.currentContainer)continue;if(o!=this.currentItem[0]&&this.placeholder[u==1?"next":"prev"]()[0]!=o&&!e.contains(this.placeholder[0],o)&&(this.options.type=="semi-dynamic"?!e.contains(this.element[0],o):!0)){this.direction=u==1?"down":"up";if(this.options.tolerance!="pointer"&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,n){if(!t)return;e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t);if(this.options.revert){var r=this,i=this.placeholder.offset();this.reverting=!0,e(this.helper).animate({left:i.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:i.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){r._clear(t)})}else this._clear(t,n);return!1},cancel:function(){if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var n=this._getItemsAsjQuery(t&&t.connected),r=[];return t=t||{},e(n).each(function(){var n=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[-=_](.+)/);n&&r.push((t.key||n[1]+"[]")+"="+(t.key&&t.expression?n[1]:n[2]))}),!r.length&&t.key&&r.push(t.key+"="),r.join("&")},toArray:function(t){var n=this._getItemsAsjQuery(t&&t.connected),r=[];return t=t||{},n.each(function(){r.push(e(t.item||this).attr(t.attribute||"id")||"")}),r},_intersectsWith:function(e){var t=this.positionAbs.left,n=t+this.helperProportions.width,r=this.positionAbs.top,i=r+this.helperProportions.height,s=e.left,o=s+e.width,u=e.top,a=u+e.height,f=this.offset.click.top,l=this.offset.click.left,c=r+f>u&&r+f<a&&t+l>s&&t+l<o;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?c:s<t+this.helperProportions.width/2&&n-this.helperProportions.width/2<o&&u<r+this.helperProportions.height/2&&i-this.helperProportions.height/2<a},_intersectsWithPointer:function(t){var n=this.options.axis==="x"||e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),r=this.options.axis==="y"||e.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),i=n&&r,s=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return i?this.floating?o&&o=="right"||s=="down"?2:1:s&&(s=="down"?2:1):!1},_intersectsWithSides:function(t){var n=e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),r=e.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),i=this._getDragVerticalDirection(),s=this._getDragHorizontalDirection();return this.floating&&s?s=="right"&&r||s=="left"&&!r:i&&(i=="down"&&n||i=="up"&&!n)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return e!=0&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return e!=0&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor==String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){var n=[],r=[],i=this._connectWith();if(i&&t)for(var s=i.length-1;s>=0;s--){var o=e(i[s]);for(var u=o.length-1;u>=0;u--){var a=e.data(o[u],this.widgetName);a&&a!=this&&!a.options.disabled&&r.push([e.isFunction(a.options.items)?a.options.items.call(a.element):e(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a])}}r.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var s=r.length-1;s>=0;s--)r[s][0].each(function(){n.push(this)});return e(n)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var n=0;n<t.length;n++)if(t[n]==e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var n=this.items,r=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],i=this._connectWith();if(i&&this.ready)for(var s=i.length-1;s>=0;s--){var o=e(i[s]);for(var u=o.length-1;u>=0;u--){var a=e.data(o[u],this.widgetName);a&&a!=this&&!a.options.disabled&&(r.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a))}}for(var s=r.length-1;s>=0;s--){var f=r[s][1],l=r[s][0];for(var u=0,c=l.length;u<c;u++){var h=e(l[u]);h.data(this.widgetName+"-item",f),n.push({item:h,instance:f,width:0,height:0,left:0,top:0})}}},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var n=this.items.length-1;n>=0;n--){var r=this.items[n];if(r.instance!=this.currentContainer&&this.currentContainer&&r.item[0]!=this.currentItem[0])continue;var i=this.options.toleranceElement?e(this.options.toleranceElement,r.item):r.item;t||(r.width=i.outerWidth(),r.height=i.outerHeight());var s=i.offset();r.left=s.left,r.top=s.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var n=this.containers.length-1;n>=0;n--){var s=this.containers[n].element.offset();this.containers[n].containerCache.left=s.left,this.containers[n].containerCache.top=s.top,this.containers[n].containerCache.width=this.containers[n].element.outerWidth(),this.containers[n].containerCache.height=this.containers[n].element.outerHeight()}return this},_createPlaceholder:function(t){t=t||this;var n=t.options;if(!n.placeholder||n.placeholder.constructor==String){var r=n.placeholder;n.placeholder={element:function(){var n=e(document.createElement(t.currentItem[0].nodeName)).addClass(r||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];return r||(n.style.visibility="hidden"),n},update:function(e,i){if(r&&!n.forcePlaceholderSize)return;i.height()||i.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),i.width()||i.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10))}}}t.placeholder=e(n.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),n.placeholder.update(t,t.placeholder)},_contactContainers:function(t){var n=null,r=null;for(var i=this.containers.length-1;i>=0;i--){if(e.contains(this.currentItem[0],this.containers[i].element[0]))continue;if(this._intersectsWith(this.containers[i].containerCache)){if(n&&e.contains(this.containers[i].element[0],n.element[0]))continue;n=this.containers[i],r=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0)}if(!n)return;if(this.containers.length===1)this.containers[r]._trigger("over",t,this._uiHash(this)),this.containers[r].containerCache.over=1;else{var s=1e4,o=null,u=this.containers[r].floating?"left":"top",a=this.containers[r].floating?"width":"height",f=this.positionAbs[u]+this.offset.click[u];for(var l=this.items.length-1;l>=0;l--){if(!e.contains(this.containers[r].element[0],this.items[l].item[0]))continue;if(this.items[l].item[0]==this.currentItem[0])continue;var c=this.items[l].item.offset()[u],h=!1;Math.abs(c-f)>Math.abs(c+this.items[l][a]-f)&&(h=!0,c+=this.items[l][a]),Math.abs(c-f)<s&&(s=Math.abs(c-f),o=this.items[l],this.direction=h?"up":"down")}if(!o&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[r],o?this._rearrange(t,o,null,!0):this._rearrange(t,null,this.containers[r].element,!0),this._trigger("change",t,this._uiHash()),this.containers[r]._trigger("change",t,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[r]._trigger("over",t,this._uiHash(this)),this.containers[r].containerCache.over=1}},_createHelper:function(t){var n=this.options,r=e.isFunction(n.helper)?e(n.helper.apply(this.element[0],[t,this.currentItem])):n.helper=="clone"?this.currentItem.clone():this.currentItem;return r.parents("body").length||e(n.appendTo!="parent"?n.appendTo:this.currentItem[0].parentNode)[0].appendChild(r[0]),r[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(r[0].style.width==""||n.forceHelperSize)&&r.width(this.currentItem.width()),(r[0].style.height==""||n.forceHelperSize)&&r.height(this.currentItem.height()),r},_adjustOffsetFromHelper:function(t){typeof t=="string"&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&e.ui.ie)t={top:0,left:0};return{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t=this.options;t.containment=="parent"&&(t.containment=this.helper[0].parentNode);if(t.containment=="document"||t.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e(t.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(e(t.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(t.containment)){var n=e(t.containment)[0],r=e(t.containment).offset(),i=e(n).css("overflow")!="hidden";this.containment=[r.left+(parseInt(e(n).css("borderLeftWidth"),10)||0)+(parseInt(e(n).css("paddingLeft"),10)||0)-this.margins.left,r.top+(parseInt(e(n).css("borderTopWidth"),10)||0)+(parseInt(e(n).css("paddingTop"),10)||0)-this.margins.top,r.left+(i?Math.max(n.scrollWidth,n.offsetWidth):n.offsetWidth)-(parseInt(e(n).css("borderLeftWidth"),10)||0)-(parseInt(e(n).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,r.top+(i?Math.max(n.scrollHeight,n.offsetHeight):n.offsetHeight)-(parseInt(e(n).css("borderTopWidth"),10)||0)-(parseInt(e(n).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(t,n){n||(n=this.position);var r=t=="absolute"?1:-1,i=this.options,s=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(s[0].tagName);return{top:n.top+this.offset.relative.top*r+this.offset.parent.top*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():o?0:s.scrollTop())*r,left:n.left+this.offset.relative.left*r+this.offset.parent.left*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():o?0:s.scrollLeft())*r}},_generatePosition:function(t){var n=this.options,r=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,i=/(html|body)/i.test(r[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var s=t.pageX,o=t.pageY;if(this.originalPosition){this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(s=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(s=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top));if(n.grid){var u=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1];o=this.containment?u-this.offset.click.top<this.containment[1]||u-this.offset.click.top>this.containment[3]?u-this.offset.click.top<this.containment[1]?u+n.grid[1]:u-n.grid[1]:u:u;var a=this.originalPageX+Math.round((s-this.originalPageX)/n.grid[0])*n.grid[0];s=this.containment?a-this.offset.click.left<this.containment[0]||a-this.offset.click.left>this.containment[2]?a-this.offset.click.left<this.containment[0]?a+n.grid[0]:a-n.grid[0]:a:a}}return{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():i?0:r.scrollTop()),left:s-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:r.scrollLeft())}},_rearrange:function(e,t,n,r){n?n[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var i=this.counter;this._delay(function(){i==this.counter&&this.refreshPositions(!r)})},_clear:function(t,n){this.reverting=!1;var r=[];!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var i in this._storedCSS)if(this._storedCSS[i]=="auto"||this._storedCSS[i]=="static")this._storedCSS[i]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!n&&r.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!n&&r.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(n||(r.push(function(e){this._trigger("remove",e,this._uiHash())}),r.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),r.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer))));for(var i=this.containers.length-1;i>=0;i--)n||r.push(function(e){return function(t){e._trigger("deactivate",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over&&(r.push(function(e){return function(t){e._trigger("out",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over=0);this._storedCursor&&e("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!n){this._trigger("beforeStop",t,this._uiHash());for(var i=0;i<r.length;i++)r[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!1}n||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!n){for(var i=0;i<r.length;i++)r[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var n=t||this;return{helper:n.helper,placeholder:n.placeholder||e([]),position:n.position,originalPosition:n.originalPosition,offset:n.positionAbs,item:n.currentItem,sender:t?t.element:null}}})})(jQuery);(function(e,t){var n=0,r={},i={};r.height=r.paddingTop=r.paddingBottom=r.borderTopWidth=r.borderBottomWidth="hide",i.height=i.paddingTop=i.paddingBottom=i.borderTopWidth=i.borderBottomWidth="show",e.widget("ui.accordion",{version:"1.9.2",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var t=this.accordionId="ui-accordion-"+(this.element.attr("id")||++n),r=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset"),this.headers=this.element.find(r.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),this._hoverable(this.headers),this._focusable(this.headers),this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide(),!r.collapsible&&(r.active===!1||r.active==null)&&(r.active=0),r.active<0&&(r.active+=this.headers.length),this.active=this._findActive(r.active).addClass("ui-accordion-header-active ui-state-active").toggleClass("ui-corner-all ui-corner-top"),this.active.next().addClass("ui-accordion-content-active").show(),this._createIcons(),this.refresh(),this.element.attr("role","tablist"),this.headers.attr("role","tab").each(function(n){var r=e(this),i=r.attr("id"),s=r.next(),o=s.attr("id");i||(i=t+"-header-"+n,r.attr("id",i)),o||(o=t+"-panel-"+n,s.attr("id",o)),r.attr("aria-controls",o),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false",tabIndex:-1}).next().attr({"aria-expanded":"false","aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true",tabIndex:0}).next().attr({"aria-expanded":"true","aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._on(this.headers,{keydown:"_keydown"}),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._setupEvents(r.event)},_getCreateEventData:function(){return{header:this.active,content:this.active.length?this.active.next():e()}},_createIcons:function(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this._destroyIcons(),e=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this.options.heightStyle!=="content"&&e.css("height","")},_setOption:function(e,t){if(e==="active"){this._activate(t);return}e==="event"&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),e==="collapsible"&&!t&&this.options.active===!1&&this._activate(0),e==="icons"&&(this._destroyIcons(),t&&this._createIcons()),e==="disabled"&&this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t)},_keydown:function(t){if(t.altKey||t.ctrlKey)return;var n=e.ui.keyCode,r=this.headers.length,i=this.headers.index(t.target),s=!1;switch(t.keyCode){case n.RIGHT:case n.DOWN:s=this.headers[(i+1)%r];break;case n.LEFT:case n.UP:s=this.headers[(i-1+r)%r];break;case n.SPACE:case n.ENTER:this._eventHandler(t);break;case n.HOME:s=this.headers[0];break;case n.END:s=this.headers[r-1]}s&&(e(t.target).attr("tabIndex",-1),e(s).attr("tabIndex",0),s.focus(),t.preventDefault())},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus()},refresh:function(){var t,n,r=this.options.heightStyle,i=this.element.parent();r==="fill"?(e.support.minHeight||(n=i.css("overflow"),i.css("overflow","hidden")),t=i.height(),this.element.siblings(":visible").each(function(){var n=e(this),r=n.css("position");if(r==="absolute"||r==="fixed")return;t-=n.outerHeight(!0)}),n&&i.css("overflow",n),this.headers.each(function(){t-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):r==="auto"&&(t=0,this.headers.next().each(function(){t=Math.max(t,e(this).css("height","").height())}).height(t))},_activate:function(t){var n=this._findActive(t)[0];if(n===this.active[0])return;n=n||this.active[0],this._eventHandler({target:n,currentTarget:n,preventDefault:e.noop})},_findActive:function(t){return typeof t=="number"?this.headers.eq(t):e()},_setupEvents:function(t){var n={};if(!t)return;e.each(t.split(" "),function(e,t){n[t]="_eventHandler"}),this._on(this.headers,n)},_eventHandler:function(t){var n=this.options,r=this.active,i=e(t.currentTarget),s=i[0]===r[0],o=s&&n.collapsible,u=o?e():i.next(),a=r.next(),f={oldHeader:r,oldPanel:a,newHeader:o?e():i,newPanel:u};t.preventDefault();if(s&&!n.collapsible||this._trigger("beforeActivate",t,f)===!1)return;n.active=o?!1:this.headers.index(i),this.active=s?e():i,this._toggle(f),r.removeClass("ui-accordion-header-active ui-state-active"),n.icons&&r.children(".ui-accordion-header-icon").removeClass(n.icons.activeHeader).addClass(n.icons.header),s||(i.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),n.icons&&i.children(".ui-accordion-header-icon").removeClass(n.icons.header).addClass(n.icons.activeHeader),i.next().addClass("ui-accordion-content-active"))},_toggle:function(t){var n=t.newPanel,r=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=n,this.prevHide=r,this.options.animate?this._animate(n,r,t):(r.hide(),n.show(),this._toggleComplete(t)),r.attr({"aria-expanded":"false","aria-hidden":"true"}),r.prev().attr("aria-selected","false"),n.length&&r.length?r.prev().attr("tabIndex",-1):n.length&&this.headers.filter(function(){return e(this).attr("tabIndex")===0}).attr("tabIndex",-1),n.attr({"aria-expanded":"true","aria-hidden":"false"}).prev().attr({"aria-selected":"true",tabIndex:0})},_animate:function(e,t,n){var s,o,u,a=this,f=0,l=e.length&&(!t.length||e.index()<t.index()),c=this.options.animate||{},h=l&&c.down||c,p=function(){a._toggleComplete(n)};typeof h=="number"&&(u=h),typeof h=="string"&&(o=h),o=o||h.easing||c.easing,u=u||h.duration||c.duration;if(!t.length)return e.animate(i,u,o,p);if(!e.length)return t.animate(r,u,o,p);s=e.show().outerHeight(),t.animate(r,{duration:u,easing:o,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(i,{duration:u,easing:o,complete:p,step:function(e,n){n.now=Math.round(e),n.prop!=="height"?f+=n.now:a.options.heightStyle!=="content"&&(n.now=Math.round(s-t.outerHeight()-f),f=0)}})},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}}),e.uiBackCompat!==!1&&(function(e,t){e.extend(t.options,{navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}});var n=t._create;t._create=function(){if(this.options.navigation){var t=this,r=this.element.find(this.options.header),i=r.next(),s=r.add(i).find("a").filter(this.options.navigationFilter)[0];s&&r.add(i).each(function(n){if(e.contains(this,s))return t.options.active=Math.floor(n/2),!1})}n.call(this)}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options,{heightStyle:null,autoHeight:!0,clearStyle:!1,fillSpace:!1});var n=t._create,r=t._setOption;e.extend(t,{_create:function(){this.options.heightStyle=this.options.heightStyle||this._mergeHeightStyle(),n.call(this)},_setOption:function(e){if(e==="autoHeight"||e==="clearStyle"||e==="fillSpace")this.options.heightStyle=this._mergeHeightStyle();r.apply(this,arguments)},_mergeHeightStyle:function(){var e=this.options;if(e.fillSpace)return"fill";if(e.clearStyle)return"content";if(e.autoHeight)return"auto"}})}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options.icons,{activeHeader:null,headerSelected:"ui-icon-triangle-1-s"});var n=t._createIcons;t._createIcons=function(){this.options.icons&&(this.options.icons.activeHeader=this.options.icons.activeHeader||this.options.icons.headerSelected),n.call(this)}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){t.activate=t._activate;var n=t._findActive;t._findActive=function(e){return e===-1&&(e=!1),e&&typeof e!="number"&&(e=this.headers.index(this.headers.filter(e)),e===-1&&(e=!1)),n.call(this,e)}}(jQuery,jQuery.ui.accordion.prototype),jQuery.ui.accordion.prototype.resize=jQuery.ui.accordion.prototype.refresh,function(e,t){e.extend(t.options,{change:null,changestart:null});var n=t._trigger;t._trigger=function(e,t,r){var i=n.apply(this,arguments);return i?(e==="beforeActivate"?i=n.call(this,"changestart",t,{oldHeader:r.oldHeader,oldContent:r.oldPanel,newHeader:r.newHeader,newContent:r.newPanel}):e==="activate"&&(i=n.call(this,"change",t,{oldHeader:r.oldHeader,oldContent:r.oldPanel,newHeader:r.newHeader,newContent:r.newPanel})),i):!1}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options,{animate:null,animated:"slide"});var n=t._create;t._create=function(){var e=this.options;e.animate===null&&(e.animated?e.animated==="slide"?e.animate=300:e.animated==="bounceslide"?e.animate={duration:200,down:{easing:"easeOutBounce",duration:1e3}}:e.animate=e.animated:e.animate=!1),n.call(this)}}(jQuery,jQuery.ui.accordion.prototype))})(jQuery);(function(e,t){var n=0;e.widget("ui.autocomplete",{version:"1.9.2",defaultElement:"<input>",options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var t,n,r;this.isMultiLine=this._isMultiLine(),this.valueMethod=this.element[this.element.is("input,textarea")?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(i){if(this.element.prop("readOnly")){t=!0,r=!0,n=!0;return}t=!1,r=!1,n=!1;var s=e.ui.keyCode;switch(i.keyCode){case s.PAGE_UP:t=!0,this._move("previousPage",i);break;case s.PAGE_DOWN:t=!0,this._move("nextPage",i);break;case s.UP:t=!0,this._keyEvent("previous",i);break;case s.DOWN:t=!0,this._keyEvent("next",i);break;case s.ENTER:case s.NUMPAD_ENTER:this.menu.active&&(t=!0,i.preventDefault(),this.menu.select(i));break;case s.TAB:this.menu.active&&this.menu.select(i);break;case s.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(i),i.preventDefault());break;default:n=!0,this._searchTimeout(i)}},keypress:function(r){if(t){t=!1,r.preventDefault();return}if(n)return;var i=e.ui.keyCode;switch(r.keyCode){case i.PAGE_UP:this._move("previousPage",r);break;case i.PAGE_DOWN:this._move("nextPage",r);break;case i.UP:this._keyEvent("previous",r);break;case i.DOWN:this._keyEvent("next",r)}},input:function(e){if(r){r=!1,e.preventDefault();return}this._searchTimeout(e)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){if(this.cancelBlur){delete this.cancelBlur;return}clearTimeout(this.searching),this.close(e),this._change(e)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo||"body")[0]).menu({input:e(),role:null}).zIndex(this.element.zIndex()+1).hide().data("menu"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var n=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(r){r.target!==t.element[0]&&r.target!==n&&!e.contains(n,r.target)&&t.close()})})},menufocus:function(t,n){if(this.isNewMenu){this.isNewMenu=!1;if(t.originalEvent&&/^mouse/.test(t.originalEvent.type)){this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)});return}}var r=n.item.data("ui-autocomplete-item")||n.item.data("item.autocomplete");!1!==this._trigger("focus",t,{item:r})?t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(r.value):this.liveRegion.text(r.value)},menuselect:function(e,t){var n=t.item.data("ui-autocomplete-item")||t.item.data("item.autocomplete"),r=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=r,this._delay(function(){this.previous=r,this.selectedItem=n})),!1!==this._trigger("select",e,{item:n})&&this._value(n.value),this.term=this._value(),this.close(e),this.selectedItem=n}}),this.liveRegion=e("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertAfter(this.element),e.fn.bgiframe&&this.menu.element.bgiframe(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),e==="source"&&this._initSource(),e==="appendTo"&&this.menu.element.appendTo(this.document.find(t||"body")[0]),e==="disabled"&&t&&this.xhr&&this.xhr.abort()},_isMultiLine:function(){return this.element.is("textarea")?!0:this.element.is("input")?!1:this.element.prop("isContentEditable")},_initSource:function(){var t,n,r=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(n,r){r(e.ui.autocomplete.filter(t,n.term))}):typeof this.options.source=="string"?(n=this.options.source,this.source=function(t,i){r.xhr&&r.xhr.abort(),r.xhr=e.ajax({url:n,data:t,dataType:"json",success:function(e){i(e)},error:function(){i([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){e=e!=null?e:this._value(),this.term=this._value();if(e.length<this.options.minLength)return this.close(t);if(this._trigger("search",t)===!1)return;return this._search(e)},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=this,t=++n;return function(r){t===n&&e.__response(r),e.pending--,e.pending||e.element.removeClass("ui-autocomplete-loading")}},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return typeof t=="string"?{label:t,value:t}:e.extend({label:t.label||t.value,value:t.value||t.label},t)})},_suggest:function(t){var n=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(n,t),this.menu.refresh(),n.show(),this._resizeMenu(),n.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,n){var r=this;e.each(n,function(e,n){r._renderItemData(t,n)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,n){return e("<li>").append(e("<a>").text(n.label)).appendTo(t)},_move:function(e,t){if(!this.menu.element.is(":visible")){this.search(null,t);return}if(this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)){this._value(this.term),this.menu.blur();return}this.menu[e](t)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){if(!this.isMultiLine||this.menu.element.is(":visible"))this._move(e,t),t.preventDefault()}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,n){var r=new RegExp(e.ui.autocomplete.escapeRegex(n),"i");return e.grep(t,function(e){return r.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var t;this._superApply(arguments);if(this.options.disabled||this.cancelSearch)return;e&&e.length?t=this.options.messages.results(e.length):t=this.options.messages.noResults,this.liveRegion.text(t)}})})(jQuery);(function(e,t){var n,r,i,s,o="ui-button ui-widget ui-state-default ui-corner-all",u="ui-state-hover ui-state-active ",a="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",f=function(){var t=e(this).find(":ui-button");setTimeout(function(){t.button("refresh")},1)},l=function(t){var n=t.name,r=t.form,i=e([]);return n&&(r?i=e(r).find("[name='"+n+"']"):i=e("[name='"+n+"']",t.ownerDocument).filter(function(){return!this.form})),i};e.widget("ui.button",{version:"1.9.2",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,f),typeof this.options.disabled!="boolean"?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var t=this,u=this.options,a=this.type==="checkbox"||this.type==="radio",c=a?"":"ui-state-active",h="ui-state-focus";u.label===null&&(u.label=this.type==="input"?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(o).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){if(u.disabled)return;this===n&&e(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){if(u.disabled)return;e(this).removeClass(c)}).bind("click"+this.eventNamespace,function(e){u.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}),this.element.bind("focus"+this.eventNamespace,function(){t.buttonElement.addClass(h)}).bind("blur"+this.eventNamespace,function(){t.buttonElement.removeClass(h)}),a&&(this.element.bind("change"+this.eventNamespace,function(){if(s)return;t.refresh()}),this.buttonElement.bind("mousedown"+this.eventNamespace,function(e){if(u.disabled)return;s=!1,r=e.pageX,i=e.pageY}).bind("mouseup"+this.eventNamespace,function(e){if(u.disabled)return;if(r!==e.pageX||i!==e.pageY)s=!0})),this.type==="checkbox"?this.buttonElement.bind("click"+this.eventNamespace,function(){if(u.disabled||s)return!1;e(this).toggleClass("ui-state-active"),t.buttonElement.attr("aria-pressed",t.element[0].checked)}):this.type==="radio"?this.buttonElement.bind("click"+this.eventNamespace,function(){if(u.disabled||s)return!1;e(this).addClass("ui-state-active"),t.buttonElement.attr("aria-pressed","true");var n=t.element[0];l(n).not(n).map(function(){return e(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){if(u.disabled)return!1;e(this).addClass("ui-state-active"),n=this,t.document.one("mouseup",function(){n=null})}).bind("mouseup"+this.eventNamespace,function(){if(u.disabled)return!1;e(this).removeClass("ui-state-active")}).bind("keydown"+this.eventNamespace,function(t){if(u.disabled)return!1;(t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active")}).bind("keyup"+this.eventNamespace,function(){e(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click()})),this._setOption("disabled",u.disabled),this._resetButton()},_determineButtonType:function(){var e,t,n;this.element.is("[type=checkbox]")?this.type="checkbox":this.element.is("[type=radio]")?this.type="radio":this.element.is("input")?this.type="input":this.type="button",this.type==="checkbox"||this.type==="radio"?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),n=this.element.is(":checked"),n&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",n)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(o+" "+u+" "+a).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(e,t){this._super(e,t);if(e==="disabled"){t?this.element.prop("disabled",!0):this.element.prop("disabled",!1);return}this._resetButton()},refresh:function(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),this.type==="radio"?l(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):this.type==="checkbox"&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if(this.type==="input"){this.options.label&&this.element.val(this.options.label);return}var t=this.buttonElement.removeClass(a),n=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),r=this.options.icons,i=r.primary&&r.secondary,s=[];r.primary||r.secondary?(this.options.text&&s.push("ui-button-text-icon"+(i?"s":r.primary?"-primary":"-secondary")),r.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+r.primary+"'></span>"),r.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+r.secondary+"'></span>"),this.options.text||(s.push(i?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(n)))):s.push("ui-button-text-only"),t.addClass(s.join(" "))}}),e.widget("ui.buttonset",{version:"1.9.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(e,t){e==="disabled"&&this.buttons.button("option",e,t),this._super(e,t)},refresh:function(){var t=this.element.css("direction")==="rtl";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})})(jQuery);(function($,undefined){function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function bindHover(e){var t="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.delegate(t,"mouseout",function(){$(this).removeClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!=-1&&$(this).removeClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!=-1&&$(this).removeClass("ui-datepicker-next-hover")}).delegate(t,"mouseover",function(){$.datepicker._isDisabledDatepicker(instActive.inline?e.parent()[0]:instActive.input[0])||($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),$(this).addClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!=-1&&$(this).addClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!=-1&&$(this).addClass("ui-datepicker-next-hover"))})}function extendRemove(e,t){$.extend(e,t);for(var n in t)if(t[n]==null||t[n]==undefined)e[n]=t[n];return e}$.extend($.ui,{datepicker:{version:"1.9.2"}});var PROP_NAME="datepicker",dpuuid=(new Date).getTime(),instActive;$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return extendRemove(this._defaults,e||{}),this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline=nodeName=="div"||nodeName=="span";target.id||(this.uuid+=1,target.id="dp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),nodeName=="input"?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst)},_newInst:function(e,t){var n=e[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:n,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:t,dpDiv:t?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}},_connectDatepicker:function(e,t){var n=$(e);t.append=$([]),t.trigger=$([]);if(n.hasClass(this.markerClassName))return;this._attachments(n,t),n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,n,r){t.settings[n]=r}).bind("getData.datepicker",function(e,n){return this._get(t,n)}),this._autoSize(t),$.data(e,PROP_NAME,t),t.settings.disabled&&this._disableDatepicker(e)},_attachments:function(e,t){var n=this._get(t,"appendText"),r=this._get(t,"isRTL");t.append&&t.append.remove(),n&&(t.append=$('<span class="'+this._appendClass+'">'+n+"</span>"),e[r?"before":"after"](t.append)),e.unbind("focus",this._showDatepicker),t.trigger&&t.trigger.remove();var i=this._get(t,"showOn");(i=="focus"||i=="both")&&e.focus(this._showDatepicker);if(i=="button"||i=="both"){var s=this._get(t,"buttonText"),o=this._get(t,"buttonImage");t.trigger=$(this._get(t,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:o,alt:s,title:s}):$('<button type="button"></button>').addClass(this._triggerClass).html(o==""?s:$("<img/>").attr({src:o,alt:s,title:s}))),e[r?"before":"after"](t.trigger),t.trigger.click(function(){return $.datepicker._datepickerShowing&&$.datepicker._lastInput==e[0]?$.datepicker._hideDatepicker():$.datepicker._datepickerShowing&&$.datepicker._lastInput!=e[0]?($.datepicker._hideDatepicker(),$.datepicker._showDatepicker(e[0])):$.datepicker._showDatepicker(e[0]),!1})}},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t=new Date(2009,11,20),n=this._get(e,"dateFormat");if(n.match(/[DM]/)){var r=function(e){var t=0,n=0;for(var r=0;r<e.length;r++)e[r].length>t&&(t=e[r].length,n=r);return n};t.setMonth(r(this._get(e,n.match(/MM/)?"monthNames":"monthNamesShort"))),t.setDate(r(this._get(e,n.match(/DD/)?"dayNames":"dayNamesShort"))+20-t.getDay())}e.input.attr("size",this._formatDate(e,t).length)}},_inlineDatepicker:function(e,t){var n=$(e);if(n.hasClass(this.markerClassName))return;n.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker",function(e,n,r){t.settings[n]=r}).bind("getData.datepicker",function(e,n){return this._get(t,n)}),$.data(e,PROP_NAME,t),this._setDate(t,this._getDefaultDate(t),!0),this._updateDatepicker(t),this._updateAlternate(t),t.settings.disabled&&this._disableDatepicker(e),t.dpDiv.css("display","block")},_dialogDatepicker:function(e,t,n,r,i){var s=this._dialogInst;if(!s){this.uuid+=1;var o="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+o+'" style="position: absolute; top: -100px; width: 0px;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),s=this._dialogInst=this._newInst(this._dialogInput,!1),s.settings={},$.data(this._dialogInput[0],PROP_NAME,s)}extendRemove(s.settings,r||{}),t=t&&t.constructor==Date?this._formatDate(s,t):t,this._dialogInput.val(t),this._pos=i?i.length?i:[i.pageX,i.pageY]:null;if(!this._pos){var u=document.documentElement.clientWidth,a=document.documentElement.clientHeight,f=document.documentElement.scrollLeft||document.body.scrollLeft,l=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[u/2-100+f,a/2-150+l]}return this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),s.settings.onSelect=n,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,s),this},_destroyDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();$.removeData(e,PROP_NAME),r=="input"?(n.append.remove(),n.trigger.remove(),t.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(r=="div"||r=="span")&&t.removeClass(this.markerClassName).empty()},_enableDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();if(r=="input")e.disabled=!1,n.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if(r=="div"||r=="span"){var i=t.children("."+this._inlineClass);i.children().removeClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t})},_disableDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();if(r=="input")e.disabled=!0,n.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(r=="div"||r=="span"){var i=t.children("."+this._inlineClass);i.children().addClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t}),this._disabledInputs[this._disabledInputs.length]=e},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;t<this._disabledInputs.length;t++)if(this._disabledInputs[t]==e)return!0;return!1},_getInst:function(e){try{return $.data(e,PROP_NAME)}catch(t){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,t,n){var r=this._getInst(e);if(arguments.length==2&&typeof t=="string")return t=="defaults"?$.extend({},$.datepicker._defaults):r?t=="all"?$.extend({},r.settings):this._get(r,t):null;var i=t||{};typeof t=="string"&&(i={},i[t]=n);if(r){this._curInst==r&&this._hideDatepicker();var s=this._getDateDatepicker(e,!0),o=this._getMinMaxDate(r,"min"),u=this._getMinMaxDate(r,"max");extendRemove(r.settings,i),o!==null&&i.dateFormat!==undefined&&i.minDate===undefined&&(r.settings.minDate=this._formatDate(r,o)),u!==null&&i.dateFormat!==undefined&&i.maxDate===undefined&&(r.settings.maxDate=this._formatDate(r,u)),this._attachments($(e),r),this._autoSize(r),this._setDate(r,s),this._updateAlternate(r),this._updateDatepicker(r)}},_changeDatepicker:function(e,t,n){this._optionDatepicker(e,t,n)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var n=this._getInst(e);n&&(this._setDate(n,t),this._updateDatepicker(n),this._updateAlternate(n))},_getDateDatepicker:function(e,t){var n=this._getInst(e);return n&&!n.inline&&this._setDateFromField(n,t),n?this._getDate(n):null},_doKeyDown:function(e){var t=$.datepicker._getInst(e.target),n=!0,r=t.dpDiv.is(".ui-datepicker-rtl");t._keyEvent=!0;if($.datepicker._datepickerShowing)switch(e.keyCode){case 9:$.datepicker._hideDatepicker(),n=!1;break;case 13:var i=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",t.dpDiv);i[0]&&$.datepicker._selectDay(e.target,t.selectedMonth,t.selectedYear,i[0]);var s=$.datepicker._get(t,"onSelect");if(s){var o=$.datepicker._formatDate(t);s.apply(t.input?t.input[0]:null,[o,t])}else $.datepicker._hideDatepicker();return!1;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 34:$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&$.datepicker._clearDate(e.target),n=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&$.datepicker._gotoToday(e.target),n=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,r?1:-1,"D"),n=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,-7,"D"),n=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,r?-1:1,"D"),n=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,7,"D"),n=e.ctrlKey||e.metaKey;break;default:n=!1}else e.keyCode==36&&e.ctrlKey?$.datepicker._showDatepicker(this):n=!1;n&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var t=$.datepicker._getInst(e.target);if($.datepicker._get(t,"constrainInput")){var n=$.datepicker._possibleChars($.datepicker._get(t,"dateFormat")),r=String.fromCharCode(e.charCode==undefined?e.keyCode:e.charCode);return e.ctrlKey||e.metaKey||r<" "||!n||n.indexOf(r)>-1}},_doKeyUp:function(e){var t=$.datepicker._getInst(e.target);if(t.input.val()!=t.lastVal)try{var n=$.datepicker.parseDate($.datepicker._get(t,"dateFormat"),t.input?t.input.val():null,$.datepicker._getFormatConfig(t));n&&($.datepicker._setDateFromField(t),$.datepicker._updateAlternate(t),$.datepicker._updateDatepicker(t))}catch(r){$.datepicker.log(r)}return!0},_showDatepicker:function(e){e=e.target||e,e.nodeName.toLowerCase()!="input"&&(e=$("input",e.parentNode)[0]);if($.datepicker._isDisabledDatepicker(e)||$.datepicker._lastInput==e)return;var t=$.datepicker._getInst(e);$.datepicker._curInst&&$.datepicker._curInst!=t&&($.datepicker._curInst.dpDiv.stop(!0,!0),t&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));var n=$.datepicker._get(t,"beforeShow"),r=n?n.apply(e,[e,t]):{};if(r===!1)return;extendRemove(t.settings,r),t.lastVal=null,$.datepicker._lastInput=e,$.datepicker._setDateFromField(t),$.datepicker._inDialog&&(e.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(e),$.datepicker._pos[1]+=e.offsetHeight);var i=!1;$(e).parents().each(function(){return i|=$(this).css("position")=="fixed",!i});var s={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null,t.dpDiv.empty(),t.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(t),s=$.datepicker._checkOffset(t,s,i),t.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":i?"fixed":"absolute",display:"none",left:s.left+"px",top:s.top+"px"});if(!t.inline){var o=$.datepicker._get(t,"showAnim"),u=$.datepicker._get(t,"duration"),a=function(){var e=t.dpDiv.find("iframe.ui-datepicker-cover");if(!!e.length){var n=$.datepicker._getBorders(t.dpDiv);e.css({left:-n[0],top:-n[1],width:t.dpDiv.outerWidth(),height:t.dpDiv.outerHeight()})}};t.dpDiv.zIndex($(e).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&($.effects.effect[o]||$.effects[o])?t.dpDiv.show(o,$.datepicker._get(t,"showOptions"),u,a):t.dpDiv[o||"show"](o?u:null,a),(!o||!u)&&a(),t.input.is(":visible")&&!t.input.is(":disabled")&&t.input.focus(),$.datepicker._curInst=t}},_updateDatepicker:function(e){this.maxRows=4;var t=$.datepicker._getBorders(e.dpDiv);instActive=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var n=e.dpDiv.find("iframe.ui-datepicker-cover");!n.length||n.css({left:-t[0],top:-t[1],width:e.dpDiv.outerWidth(),height:e.dpDiv.outerHeight()}),e.dpDiv.find("."+this._dayOverClass+" a").mouseover();var r=this._getNumberOfMonths(e),i=r[1],s=17;e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),i>1&&e.dpDiv.addClass("ui-datepicker-multi-"+i).css("width",s*i+"em"),e.dpDiv[(r[0]!=1||r[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e==$.datepicker._curInst&&$.datepicker._datepickerShowing&&e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&e.input[0]!=document.activeElement&&e.input.focus();if(e.yearshtml){var o=e.yearshtml;setTimeout(function(){o===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),o=e.yearshtml=null},0)}},_getBorders:function(e){var t=function(e){return{thin:1,medium:2,thick:3}[e]||e};return[parseFloat(t(e.css("border-left-width"))),parseFloat(t(e.css("border-top-width")))]},_checkOffset:function(e,t,n){var r=e.dpDiv.outerWidth(),i=e.dpDiv.outerHeight(),s=e.input?e.input.outerWidth():0,o=e.input?e.input.outerHeight():0,u=document.documentElement.clientWidth+(n?0:$(document).scrollLeft()),a=document.documentElement.clientHeight+(n?0:$(document).scrollTop());return t.left-=this._get(e,"isRTL")?r-s:0,t.left-=n&&t.left==e.input.offset().left?$(document).scrollLeft():0,t.top-=n&&t.top==e.input.offset().top+o?$(document).scrollTop():0,t.left-=Math.min(t.left,t.left+r>u&&u>r?Math.abs(t.left+r-u):0),t.top-=Math.min(t.top,t.top+i>a&&a>i?Math.abs(i+o):0),t},_findPos:function(e){var t=this._getInst(e),n=this._get(t,"isRTL");while(e&&(e.type=="hidden"||e.nodeType!=1||$.expr.filters.hidden(e)))e=e[n?"previousSibling":"nextSibling"];var r=$(e).offset();return[r.left,r.top]},_hideDatepicker:function(e){var t=this._curInst;if(!t||e&&t!=$.data(e,PROP_NAME))return;if(this._datepickerShowing){var n=this._get(t,"showAnim"),r=this._get(t,"duration"),i=function(){$.datepicker._tidyDialog(t)};$.effects&&($.effects.effect[n]||$.effects[n])?t.dpDiv.hide(n,$.datepicker._get(t,"showOptions"),r,i):t.dpDiv[n=="slideDown"?"slideUp":n=="fadeIn"?"fadeOut":"hide"](n?r:null,i),n||i(),this._datepickerShowing=!1;var s=this._get(t,"onClose");s&&s.apply(t.input?t.input[0]:null,[t.input?t.input.val():"",t]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1}},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(!$.datepicker._curInst)return;var t=$(e.target),n=$.datepicker._getInst(t[0]);(t[0].id!=$.datepicker._mainDivId&&t.parents("#"+$.datepicker._mainDivId).length==0&&!t.hasClass($.datepicker.markerClassName)&&!t.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||t.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=n)&&$.datepicker._hideDatepicker()},_adjustDate:function(e,t,n){var r=$(e),i=this._getInst(r[0]);if(this._isDisabledDatepicker(r[0]))return;this._adjustInstDate(i,t+(n=="M"?this._get(i,"showCurrentAtPos"):0),n),this._updateDatepicker(i)},_gotoToday:function(e){var t=$(e),n=this._getInst(t[0]);if(this._get(n,"gotoCurrent")&&n.currentDay)n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear;else{var r=new Date;n.selectedDay=r.getDate(),n.drawMonth=n.selectedMonth=r.getMonth(),n.drawYear=n.selectedYear=r.getFullYear()}this._notifyChange(n),this._adjustDate(t)},_selectMonthYear:function(e,t,n){var r=$(e),i=this._getInst(r[0]);i["selected"+(n=="M"?"Month":"Year")]=i["draw"+(n=="M"?"Month":"Year")]=parseInt(t.options[t.selectedIndex].value,10),this._notifyChange(i),this._adjustDate(r)},_selectDay:function(e,t,n,r){var i=$(e);if($(r).hasClass(this._unselectableClass)||this._isDisabledDatepicker(i[0]))return;var s=this._getInst(i[0]);s.selectedDay=s.currentDay=$("a",r).html(),s.selectedMonth=s.currentMonth=t,s.selectedYear=s.currentYear=n,this._selectDate(e,this._formatDate(s,s.currentDay,s.currentMonth,s.currentYear))},_clearDate:function(e){var t=$(e),n=this._getInst(t[0]);this._selectDate(t,"")},_selectDate:function(e,t){var n=$(e),r=this._getInst(n[0]);t=t!=null?t:this._formatDate(r),r.input&&r.input.val(t),this._updateAlternate(r);var i=this._get(r,"onSelect");i?i.apply(r.input?r.input[0]:null,[t,r]):r.input&&r.input.trigger("change"),r.inline?this._updateDatepicker(r):(this._hideDatepicker(),this._lastInput=r.input[0],typeof r.input[0]!="object"&&r.input.focus(),this._lastInput=null)},_updateAlternate:function(e){var t=this._get(e,"altField");if(t){var n=this._get(e,"altFormat")||this._get(e,"dateFormat"),r=this._getDate(e),i=this.formatDate(n,r,this._getFormatConfig(e));$(t).each(function(){$(this).val(i)})}},noWeekends:function(e){var t=e.getDay();return[t>0&&t<6,""]},iso8601Week:function(e){var t=new Date(e.getTime());t.setDate(t.getDate()+4-(t.getDay()||7));var n=t.getTime();return t.setMonth(0),t.setDate(1),Math.floor(Math.round((n-t)/864e5)/7)+1},parseDate:function(e,t,n){if(e==null||t==null)throw"Invalid arguments";t=typeof t=="object"?t.toString():t+"";if(t=="")return null;var r=(n?n.shortYearCutoff:null)||this._defaults.shortYearCutoff;r=typeof r!="string"?r:(new Date).getFullYear()%100+parseInt(r,10);var i=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,s=(n?n.dayNames:null)||this._defaults.dayNames,o=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,u=(n?n.monthNames:null)||this._defaults.monthNames,a=-1,f=-1,l=-1,c=-1,h=!1,p=function(t){var n=y+1<e.length&&e.charAt(y+1)==t;return n&&y++,n},d=function(e){var n=p(e),r=e=="@"?14:e=="!"?20:e=="y"&&n?4:e=="o"?3:2,i=new RegExp("^\\d{1,"+r+"}"),s=t.substring(g).match(i);if(!s)throw"Missing number at position "+g;return g+=s[0].length,parseInt(s[0],10)},v=function(e,n,r){var i=$.map(p(e)?r:n,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)}),s=-1;$.each(i,function(e,n){var r=n[1];if(t.substr(g,r.length).toLowerCase()==r.toLowerCase())return s=n[0],g+=r.length,!1});if(s!=-1)return s+1;throw"Unknown name at position "+g},m=function(){if(t.charAt(g)!=e.charAt(y))throw"Unexpected literal at position "+g;g++},g=0;for(var y=0;y<e.length;y++)if(h)e.charAt(y)=="'"&&!p("'")?h=!1:m();else switch(e.charAt(y)){case"d":l=d("d");break;case"D":v("D",i,s);break;case"o":c=d("o");break;case"m":f=d("m");break;case"M":f=v("M",o,u);break;case"y":a=d("y");break;case"@":var b=new Date(d("@"));a=b.getFullYear(),f=b.getMonth()+1,l=b.getDate();break;case"!":var b=new Date((d("!")-this._ticksTo1970)/1e4);a=b.getFullYear(),f=b.getMonth()+1,l=b.getDate();break;case"'":p("'")?m():h=!0;break;default:m()}if(g<t.length){var w=t.substr(g);if(!/^\s+/.test(w))throw"Extra/unparsed characters found in date: "+w}a==-1?a=(new Date).getFullYear():a<100&&(a+=(new Date).getFullYear()-(new Date).getFullYear()%100+(a<=r?0:-100));if(c>-1){f=1,l=c;do{var E=this._getDaysInMonth(a,f-1);if(l<=E)break;f++,l-=E}while(!0)}var b=this._daylightSavingAdjust(new Date(a,f-1,l));if(b.getFullYear()!=a||b.getMonth()+1!=f||b.getDate()!=l)throw"Invalid date";return b},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(e,t,n){if(!t)return"";var r=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,i=(n?n.dayNames:null)||this._defaults.dayNames,s=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,o=(n?n.monthNames:null)||this._defaults.monthNames,u=function(t){var n=h+1<e.length&&e.charAt(h+1)==t;return n&&h++,n},a=function(e,t,n){var r=""+t;if(u(e))while(r.length<n)r="0"+r;return r},f=function(e,t,n,r){return u(e)?r[t]:n[t]},l="",c=!1;if(t)for(var h=0;h<e.length;h++)if(c)e.charAt(h)=="'"&&!u("'")?c=!1:l+=e.charAt(h);else switch(e.charAt(h)){case"d":l+=a("d",t.getDate(),2);break;case"D":l+=f("D",t.getDay(),r,i);break;case"o":l+=a("o",Math.round(((new Date(t.getFullYear(),t.getMonth(),t.getDate())).getTime()-(new Date(t.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":l+=a("m",t.getMonth()+1,2);break;case"M":l+=f("M",t.getMonth(),s,o);break;case"y":l+=u("y")?t.getFullYear():(t.getYear()%100<10?"0":"")+t.getYear()%100;break;case"@":l+=t.getTime();break;case"!":l+=t.getTime()*1e4+this._ticksTo1970;break;case"'":u("'")?l+="'":c=!0;break;default:l+=e.charAt(h)}return l},_possibleChars:function(e){var t="",n=!1,r=function(t){var n=i+1<e.length&&e.charAt(i+1)==t;return n&&i++,n};for(var i=0;i<e.length;i++)if(n)e.charAt(i)=="'"&&!r("'")?n=!1:t+=e.charAt(i);else switch(e.charAt(i)){case"d":case"m":case"y":case"@":t+="0123456789";break;case"D":case"M":return null;case"'":r("'")?t+="'":n=!0;break;default:t+=e.charAt(i)}return t},_get:function(e,t){return e.settings[t]!==undefined?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()==e.lastVal)return;var n=this._get(e,"dateFormat"),r=e.lastVal=e.input?e.input.val():null,i,s;i=s=this._getDefaultDate(e);var o=this._getFormatConfig(e);try{i=this.parseDate(n,r,o)||s}catch(u){this.log(u),r=t?"":r}e.selectedDay=i.getDate(),e.drawMonth=e.selectedMonth=i.getMonth(),e.drawYear=e.selectedYear=i.getFullYear(),e.currentDay=r?i.getDate():0,e.currentMonth=r?i.getMonth():0,e.currentYear=r?i.getFullYear():0,this._adjustInstDate(e)},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(e,t,n){var r=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},i=function(t){try{return $.datepicker.parseDate($.datepicker._get(e,"dateFormat"),t,$.datepicker._getFormatConfig(e))}catch(n){}var r=(t.toLowerCase().match(/^c/)?$.datepicker._getDate(e):null)||new Date,i=r.getFullYear(),s=r.getMonth(),o=r.getDate(),u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,a=u.exec(t);while(a){switch(a[2]||"d"){case"d":case"D":o+=parseInt(a[1],10);break;case"w":case"W":o+=parseInt(a[1],10)*7;break;case"m":case"M":s+=parseInt(a[1],10),o=Math.min(o,$.datepicker._getDaysInMonth(i,s));break;case"y":case"Y":i+=parseInt(a[1],10),o=Math.min(o,$.datepicker._getDaysInMonth(i,s))}a=u.exec(t)}return new Date(i,s,o)},s=t==null||t===""?n:typeof t=="string"?i(t):typeof t=="number"?isNaN(t)?n:r(t):new Date(t.getTime());return s=s&&s.toString()=="Invalid Date"?n:s,s&&(s.setHours(0),s.setMinutes(0),s.setSeconds(0),s.setMilliseconds(0)),this._daylightSavingAdjust(s)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,n){var r=!t,i=e.selectedMonth,s=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),(i!=e.selectedMonth||s!=e.selectedYear)&&!n&&this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(r?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&e.input.val()==""?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(e){var t=this._get(e,"stepMonths"),n="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(n,-t,"M")},next:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(n,+t,"M")},hide:function(){window["DP_jQuery_"+dpuuid].datepicker._hideDatepicker()},today:function(){window["DP_jQuery_"+dpuuid].datepicker._gotoToday(n)},selectDay:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectDay(n,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(n,this,"M"),!1},selectYear:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(n,this,"Y"),!1}};$(this).bind(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t=new Date;t=this._daylightSavingAdjust(new Date(t.getFullYear(),t.getMonth(),t.getDate()));var n=this._get(e,"isRTL"),r=this._get(e,"showButtonPanel"),i=this._get(e,"hideIfNoPrevNext"),s=this._get(e,"navigationAsDateFormat"),o=this._getNumberOfMonths(e),u=this._get(e,"showCurrentAtPos"),a=this._get(e,"stepMonths"),f=o[0]!=1||o[1]!=1,l=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),c=this._getMinMaxDate(e,"min"),h=this._getMinMaxDate(e,"max"),p=e.drawMonth-u,d=e.drawYear;p<0&&(p+=12,d--);if(h){var v=this._daylightSavingAdjust(new Date(h.getFullYear(),h.getMonth()-o[0]*o[1]+1,h.getDate()));v=c&&v<c?c:v;while(this._daylightSavingAdjust(new Date(d,p,1))>v)p--,p<0&&(p=11,d--)}e.drawMonth=p,e.drawYear=d;var m=this._get(e,"prevText");m=s?this.formatDate(m,this._daylightSavingAdjust(new Date(d,p-a,1)),this._getFormatConfig(e)):m;var g=this._canAdjustMonth(e,-1,d,p)?'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="'+m+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"e":"w")+'">'+m+"</span></a>":i?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+m+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"e":"w")+'">'+m+"</span></a>",y=this._get(e,"nextText");y=s?this.formatDate(y,this._daylightSavingAdjust(new Date(d,p+a,1)),this._getFormatConfig(e)):y;var b=this._canAdjustMonth(e,1,d,p)?'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"w":"e")+'">'+y+"</span></a>":i?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"w":"e")+'">'+y+"</span></a>",w=this._get(e,"currentText"),E=this._get(e,"gotoCurrent")&&e.currentDay?l:t;w=s?this.formatDate(w,E,this._getFormatConfig(e)):w;var S=e.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">'+this._get(e,"closeText")+"</button>",x=r?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(n?S:"")+(this._isInRange(e,E)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">'+w+"</button>":"")+(n?"":S)+"</div>":"",T=parseInt(this._get(e,"firstDay"),10);T=isNaN(T)?0:T;var N=this._get(e,"showWeek"),C=this._get(e,"dayNames"),k=this._get(e,"dayNamesShort"),L=this._get(e,"dayNamesMin"),A=this._get(e,"monthNames"),O=this._get(e,"monthNamesShort"),M=this._get(e,"beforeShowDay"),_=this._get(e,"showOtherMonths"),D=this._get(e,"selectOtherMonths"),P=this._get(e,"calculateWeek")||this.iso8601Week,H=this._getDefaultDate(e),B="";for(var j=0;j<o[0];j++){var F="";this.maxRows=4;for(var I=0;I<o[1];I++){var q=this._daylightSavingAdjust(new Date(d,p,e.selectedDay)),R=" ui-corner-all",U="";if(f){U+='<div class="ui-datepicker-group';if(o[1]>1)switch(I){case 0:U+=" ui-datepicker-group-first",R=" ui-corner-"+(n?"right":"left");break;case o[1]-1:U+=" ui-datepicker-group-last",R=" ui-corner-"+(n?"left":"right");break;default:U+=" ui-datepicker-group-middle",R=""}U+='">'}U+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+R+'">'+(/all|left/.test(R)&&j==0?n?b:g:"")+(/all|right/.test(R)&&j==0?n?g:b:"")+this._generateMonthYearHeader(e,p,d,c,h,j>0||I>0,A,O)+'</div><table class="ui-datepicker-calendar"><thead>'+"<tr>";var z=N?'<th class="ui-datepicker-week-col">'+this._get(e,"weekHeader")+"</th>":"";for(var W=0;W<7;W++){var X=(W+T)%7;z+="<th"+((W+T+6)%7>=5?' class="ui-datepicker-week-end"':"")+">"+'<span title="'+C[X]+'">'+L[X]+"</span></th>"}U+=z+"</tr></thead><tbody>";var V=this._getDaysInMonth(d,p);d==e.selectedYear&&p==e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,V));var J=(this._getFirstDayOfMonth(d,p)-T+7)%7,K=Math.ceil((J+V)/7),Q=f?this.maxRows>K?this.maxRows:K:K;this.maxRows=Q;var G=this._daylightSavingAdjust(new Date(d,p,1-J));for(var Y=0;Y<Q;Y++){U+="<tr>";var Z=N?'<td class="ui-datepicker-week-col">'+this._get(e,"calculateWeek")(G)+"</td>":"";for(var W=0;W<7;W++){var et=M?M.apply(e.input?e.input[0]:null,[G]):[!0,""],tt=G.getMonth()!=p,nt=tt&&!D||!et[0]||c&&G<c||h&&G>h;Z+='<td class="'+((W+T+6)%7>=5?" ui-datepicker-week-end":"")+(tt?" ui-datepicker-other-month":"")+(G.getTime()==q.getTime()&&p==e.selectedMonth&&e._keyEvent||H.getTime()==G.getTime()&&H.getTime()==q.getTime()?" "+this._dayOverClass:"")+(nt?" "+this._unselectableClass+" ui-state-disabled":"")+(tt&&!_?"":" "+et[1]+(G.getTime()==l.getTime()?" "+this._currentClass:"")+(G.getTime()==t.getTime()?" ui-datepicker-today":""))+'"'+((!tt||_)&&et[2]?' title="'+et[2]+'"':"")+(nt?"":' data-handler="selectDay" data-event="click" data-month="'+G.getMonth()+'" data-year="'+G.getFullYear()+'"')+">"+(tt&&!_?"&#xa0;":nt?'<span class="ui-state-default">'+G.getDate()+"</span>":'<a class="ui-state-default'+(G.getTime()==t.getTime()?" ui-state-highlight":"")+(G.getTime()==l.getTime()?" ui-state-active":"")+(tt?" ui-priority-secondary":"")+'" href="#">'+G.getDate()+"</a>")+"</td>",G.setDate(G.getDate()+1),G=this._daylightSavingAdjust(G)}U+=Z+"</tr>"}p++,p>11&&(p=0,d++),U+="</tbody></table>"+(f?"</div>"+(o[0]>0&&I==o[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),F+=U}B+=F}return B+=x+($.ui.ie6&&!e.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),e._keyEvent=!1,B},_generateMonthYearHeader:function(e,t,n,r,i,s,o,u){var a=this._get(e,"changeMonth"),f=this._get(e,"changeYear"),l=this._get(e,"showMonthAfterYear"),c='<div class="ui-datepicker-title">',h="";if(s||!a)h+='<span class="ui-datepicker-month">'+o[t]+"</span>";else{var p=r&&r.getFullYear()==n,d=i&&i.getFullYear()==n;h+='<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';for(var v=0;v<12;v++)(!p||v>=r.getMonth())&&(!d||v<=i.getMonth())&&(h+='<option value="'+v+'"'+(v==t?' selected="selected"':"")+">"+u[v]+"</option>");h+="</select>"}l||(c+=h+(s||!a||!f?"&#xa0;":""));if(!e.yearshtml){e.yearshtml="";if(s||!f)c+='<span class="ui-datepicker-year">'+n+"</span>";else{var m=this._get(e,"yearRange").split(":"),g=(new Date).getFullYear(),y=function(e){var t=e.match(/c[+-].*/)?n+parseInt(e.substring(1),10):e.match(/[+-].*/)?g+parseInt(e,10):parseInt(e,10);return isNaN(t)?g:t},b=y(m[0]),w=Math.max(b,y(m[1]||""));b=r?Math.max(b,r.getFullYear()):b,w=i?Math.min(w,i.getFullYear()):w,e.yearshtml+='<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';for(;b<=w;b++)e.yearshtml+='<option value="'+b+'"'+(b==n?' selected="selected"':"")+">"+b+"</option>";e.yearshtml+="</select>",c+=e.yearshtml,e.yearshtml=null}}return c+=this._get(e,"yearSuffix"),l&&(c+=(s||!a||!f?"&#xa0;":"")+h),c+="</div>",c},_adjustInstDate:function(e,t,n){var r=e.drawYear+(n=="Y"?t:0),i=e.drawMonth+(n=="M"?t:0),s=Math.min(e.selectedDay,this._getDaysInMonth(r,i))+(n=="D"?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(r,i,s)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),(n=="M"||n=="Y")&&this._notifyChange(e)},_restrictMinMax:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max"),i=n&&t<n?n:t;return i=r&&i>r?r:i,i},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return t==null?[1,1]:typeof t=="number"?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return(new Date(e,t,1)).getDay()},_canAdjustMonth:function(e,t,n,r){var i=this._getNumberOfMonths(e),s=this._daylightSavingAdjust(new Date(n,r+(t<0?t:i[0]*i[1]),1));return t<0&&s.setDate(this._getDaysInMonth(s.getFullYear(),s.getMonth())),this._isInRange(e,s)},_isInRange:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max");return(!n||t.getTime()>=n.getTime())&&(!r||t.getTime()<=r.getTime())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t=typeof t!="string"?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,n,r){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var i=t?typeof t=="object"?t:this._daylightSavingAdjust(new Date(r,n,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),i,this._getFormatConfig(e))}}),$.fn.datepicker=function(e){if(!this.length)return this;$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv),$.datepicker.initialized=!0);var t=Array.prototype.slice.call(arguments,1);return typeof e!="string"||e!="isDisabled"&&e!="getDate"&&e!="widget"?e=="option"&&arguments.length==2&&typeof arguments[1]=="string"?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t)):this.each(function(){typeof e=="string"?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this].concat(t)):$.datepicker._attachDatepicker(this,e)}):$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t))},$.datepicker=new Datepicker,$.datepicker.initialized=!1,$.datepicker.uuid=(new Date).getTime(),$.datepicker.version="1.9.2",window["DP_jQuery_"+dpuuid]=$})(jQuery);(function(e,t){var n="ui-dialog ui-widget ui-widget-content ui-corner-all ",r={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},i={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};e.widget("ui.dialog",{version:"1.9.2",options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var n=e(this).css(t).offset().top;n<0&&e(this).css("top",t.top-n)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.oldPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.options.title=this.options.title||this.originalTitle;var t=this,r=this.options,i=r.title||"&#160;",s,o,u,a,f;s=(this.uiDialog=e("<div>")).addClass(n+r.dialogClass).css({display:"none",outline:0,zIndex:r.zIndex}).attr("tabIndex",-1).keydown(function(n){r.closeOnEscape&&!n.isDefaultPrevented()&&n.keyCode&&n.keyCode===e.ui.keyCode.ESCAPE&&(t.close(n),n.preventDefault())}).mousedown(function(e){t.moveToTop(!1,e)}).appendTo("body"),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(s),o=(this.uiDialogTitlebar=e("<div>")).addClass("ui-dialog-titlebar  ui-widget-header  ui-corner-all  ui-helper-clearfix").bind("mousedown",function(){s.focus()}).prependTo(s),u=e("<a href='#'></a>").addClass("ui-dialog-titlebar-close  ui-corner-all").attr("role","button").click(function(e){e.preventDefault(),t.close(e)}).appendTo(o),(this.uiDialogTitlebarCloseText=e("<span>")).addClass("ui-icon ui-icon-closethick").text(r.closeText).appendTo(u),a=e("<span>").uniqueId().addClass("ui-dialog-title").html(i).prependTo(o),f=(this.uiDialogButtonPane=e("<div>")).addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),(this.uiButtonSet=e("<div>")).addClass("ui-dialog-buttonset").appendTo(f),s.attr({role:"dialog","aria-labelledby":a.attr("id")}),o.find("*").add(o).disableSelection(),this._hoverable(u),this._focusable(u),r.draggable&&e.fn.draggable&&this._makeDraggable(),r.resizable&&e.fn.resizable&&this._makeResizable(),this._createButtons(r.buttons),this._isOpen=!1,e.fn.bgiframe&&s.bgiframe(),this._on(s,{keydown:function(t){if(!r.modal||t.keyCode!==e.ui.keyCode.TAB)return;var n=e(":tabbable",s),i=n.filter(":first"),o=n.filter(":last");if(t.target===o[0]&&!t.shiftKey)return i.focus(1),!1;if(t.target===i[0]&&t.shiftKey)return o.focus(1),!1}})},_init:function(){this.options.autoOpen&&this.open()},_destroy:function(){var e,t=this.oldPosition;this.overlay&&this.overlay.destroy(),this.uiDialog.hide(),this.element.removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},close:function(t){var n=this,r,i;if(!this._isOpen)return;if(!1===this._trigger("beforeClose",t))return;return this._isOpen=!1,this.overlay&&this.overlay.destroy(),this.options.hide?this._hide(this.uiDialog,this.options.hide,function(){n._trigger("close",t)}):(this.uiDialog.hide(),this._trigger("close",t)),e.ui.dialog.overlay.resize(),this.options.modal&&(r=0,e(".ui-dialog").each(function(){this!==n.uiDialog[0]&&(i=e(this).css("z-index"),isNaN(i)||(r=Math.max(r,i)))}),e.ui.dialog.maxZ=r),this},isOpen:function(){return this._isOpen},moveToTop:function(t,n){var r=this.options,i;return r.modal&&!t||!r.stack&&!r.modal?this._trigger("focus",n):(r.zIndex>e.ui.dialog.maxZ&&(e.ui.dialog.maxZ=r.zIndex),this.overlay&&(e.ui.dialog.maxZ+=1,e.ui.dialog.overlay.maxZ=e.ui.dialog.maxZ,this.overlay.$el.css("z-index",e.ui.dialog.overlay.maxZ)),i={scrollTop:this.element.scrollTop(),scrollLeft:this.element.scrollLeft()},e.ui.dialog.maxZ+=1,this.uiDialog.css("z-index",e.ui.dialog.maxZ),this.element.attr(i),this._trigger("focus",n),this)},open:function(){if(this._isOpen)return;var t,n=this.options,r=this.uiDialog;return this._size(),this._position(n.position),r.show(n.show),this.overlay=n.modal?new e.ui.dialog.overlay(this):null,this.moveToTop(!0),t=this.element.find(":tabbable"),t.length||(t=this.uiDialogButtonPane.find(":tabbable"),t.length||(t=r)),t.eq(0).focus(),this._isOpen=!0,this._trigger("open"),this},_createButtons:function(t){var n=this,r=!1;this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),typeof t=="object"&&t!==null&&e.each(t,function(){return!(r=!0)}),r?(e.each(t,function(t,r){var i,s;r=e.isFunction(r)?{click:r,text:t}:r,r=e.extend({type:"button"},r),s=r.click,r.click=function(){s.apply(n.element[0],arguments)},i=e("<button></button>",r).appendTo(n.uiButtonSet),e.fn.button&&i.button()}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog)):this.uiDialog.removeClass("ui-dialog-buttons")},_makeDraggable:function(){function r(e){return{position:e.position,offset:e.offset}}var t=this,n=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(n,i){e(this).addClass("ui-dialog-dragging"),t._trigger("dragStart",n,r(i))},drag:function(e,n){t._trigger("drag",e,r(n))},stop:function(i,s){n.position=[s.position.left-t.document.scrollLeft(),s.position.top-t.document.scrollTop()],e(this).removeClass("ui-dialog-dragging"),t._trigger("dragStop",i,r(s)),e.ui.dialog.overlay.resize()}})},_makeResizable:function(n){function u(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}n=n===t?this.options.resizable:n;var r=this,i=this.options,s=this.uiDialog.css("position"),o=typeof n=="string"?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:i.maxWidth,maxHeight:i.maxHeight,minWidth:i.minWidth,minHeight:this._minHeight(),handles:o,start:function(t,n){e(this).addClass("ui-dialog-resizing"),r._trigger("resizeStart",t,u(n))},resize:function(e,t){r._trigger("resize",e,u(t))},stop:function(t,n){e(this).removeClass("ui-dialog-resizing"),i.height=e(this).height(),i.width=e(this).width(),r._trigger("resizeStop",t,u(n)),e.ui.dialog.overlay.resize()}}).css("position",s).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var e=this.options;return e.height==="auto"?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(t){var n=[],r=[0,0],i;if(t){if(typeof t=="string"||typeof t=="object"&&"0"in t)n=t.split?t.split(" "):[t[0],t[1]],n.length===1&&(n[1]=n[0]),e.each(["left","top"],function(e,t){+n[e]===n[e]&&(r[e]=n[e],n[e]=t)}),t={my:n[0]+(r[0]<0?r[0]:"+"+r[0])+" "+n[1]+(r[1]<0?r[1]:"+"+r[1]),at:n.join(" ")};t=e.extend({},e.ui.dialog.prototype.options.position,t)}else t=e.ui.dialog.prototype.options.position;i=this.uiDialog.is(":visible"),i||this.uiDialog.show(),this.uiDialog.position(t),i||this.uiDialog.hide()},_setOptions:function(t){var n=this,s={},o=!1;e.each(t,function(e,t){n._setOption(e,t),e in r&&(o=!0),e in i&&(s[e]=t)}),o&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",s)},_setOption:function(t,r){var i,s,o=this.uiDialog;switch(t){case"buttons":this._createButtons(r);break;case"closeText":this.uiDialogTitlebarCloseText.text(""+r);break;case"dialogClass":o.removeClass(this.options.dialogClass).addClass(n+r);break;case"disabled":r?o.addClass("ui-dialog-disabled"):o.removeClass("ui-dialog-disabled");break;case"draggable":i=o.is(":data(draggable)"),i&&!r&&o.draggable("destroy"),!i&&r&&this._makeDraggable();break;case"position":this._position(r);break;case"resizable":s=o.is(":data(resizable)"),s&&!r&&o.resizable("destroy"),s&&typeof r=="string"&&o.resizable("option","handles",r),!s&&r!==!1&&this._makeResizable(r);break;case"title":e(".ui-dialog-title",this.uiDialogTitlebar).html(""+(r||"&#160;"))}this._super(t,r)},_size:function(){var t,n,r,i=this.options,s=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),i.minWidth>i.width&&(i.width=i.minWidth),t=this.uiDialog.css({height:"auto",width:i.width}).outerHeight(),n=Math.max(0,i.minHeight-t),i.height==="auto"?e.support.minHeight?this.element.css({minHeight:n,height:"auto"}):(this.uiDialog.show(),r=this.element.css("height","auto").height(),s||this.uiDialog.hide(),this.element.height(Math.max(r,n))):this.element.height(Math.max(i.height-t,0)),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),e.extend(e.ui.dialog,{uuid:0,maxZ:0,getTitleId:function(e){var t=e.attr("id");return t||(this.uuid+=1,t=this.uuid),"ui-dialog-title-"+t},overlay:function(t){this.$el=e.ui.dialog.overlay.create(t)}}),e.extend(e.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(e){return e+".dialog-overlay"}).join(" "),create:function(t){this.instances.length===0&&(setTimeout(function(){e.ui.dialog.overlay.instances.length&&e(document).bind(e.ui.dialog.overlay.events,function(t){if(e(t.target).zIndex()<e.ui.dialog.overlay.maxZ)return!1})},1),e(window).bind("resize.dialog-overlay",e.ui.dialog.overlay.resize));var n=this.oldInstances.pop()||e("<div>").addClass("ui-widget-overlay");return e(document).bind("keydown.dialog-overlay",function(r){var i=e.ui.dialog.overlay.instances;i.length!==0&&i[i.length-1]===n&&t.options.closeOnEscape&&!r.isDefaultPrevented()&&r.keyCode&&r.keyCode===e.ui.keyCode.ESCAPE&&(t.close(r),r.preventDefault())}),n.appendTo(document.body).css({width:this.width(),height:this.height()}),e.fn.bgiframe&&n.bgiframe(),this.instances.push(n),n},destroy:function(t){var n=e.inArray(t,this.instances),r=0;n!==-1&&this.oldInstances.push(this.instances.splice(n,1)[0]),this.instances.length===0&&e([document,window]).unbind(".dialog-overlay"),t.height(0).width(0).remove(),e.each(this.instances,function(){r=Math.max(r,this.css("z-index"))}),this.maxZ=r},height:function(){var t,n;return e.ui.ie?(t=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),n=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),t<n?e(window).height()+"px":t+"px"):e(document).height()+"px"},width:function(){var t,n;return e.ui.ie?(t=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),n=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),t<n?e(window).width()+"px":t+"px"):e(document).width()+"px"},resize:function(){var t=e([]);e.each(e.ui.dialog.overlay.instances,function(){t=t.add(this)}),t.css({width:0,height:0}).css({width:e.ui.dialog.overlay.width(),height:e.ui.dialog.overlay.height()})}}),e.extend(e.ui.dialog.overlay.prototype,{destroy:function(){e.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);(function(e,t){var n=!1;e.widget("ui.menu",{version:"1.9.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,e.proxy(function(e){this.options.disabled&&e.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(e){e.preventDefault()},"click .ui-state-disabled > a":function(e){e.preventDefault()},"click .ui-menu-item:has(a)":function(t){var r=e(t.target).closest(".ui-menu-item");!n&&r.not(".ui-state-disabled").length&&(n=!0,this.select(t),r.has(".ui-menu").length?this.expand(t):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&this.active.parents(".ui-menu").length===1&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){var n=e(t.currentTarget);n.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(t,n)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var n=this.active||this.element.children(".ui-menu-item").eq(0);t||this.focus(e,n)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){e(t.target).closest(".ui-menu").length||this.collapseAll(t),n=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){function a(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var n,r,i,s,o,u=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:u=!1,r=this.previousFilter||"",i=String.fromCharCode(t.keyCode),s=!1,clearTimeout(this.filterTimer),i===r?s=!0:i=r+i,o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())}),n=s&&n.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):n,n.length||(i=String.fromCharCode(t.keyCode),o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())})),n.length?(this.focus(t,n),n.length>1?(this.previousFilter=i,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}u&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,n=this.options.icons.submenu,r=this.element.find(this.options.menus);r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),r=t.prev("a"),i=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);r.attr("aria-haspopup","true").prepend(i),t.attr("aria-labelledby",r.attr("id"))}),t=r.add(this.element),t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),t.children(":not(.ui-menu-item)").each(function(){var t=e(this);/[^\-Ã¢â‚¬â€Ã¢â‚¬â€œ\s]/.test(t.text())||t.addClass("ui-widget-content ui-menu-divider")}),t.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},focus:function(e,t){var n,r;this.blur(e,e&&e.type==="focus"),this._scrollIntoView(t),this.active=t.first(),r=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",r.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),e&&e.type==="keydown"?this._close():this.timer=this._delay(function(){this._close()},this.delay),n=t.children(".ui-menu"),n.length&&/^mouse/.test(e.type)&&this._startOpening(n),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var n,r,i,s,o,u;this._hasScroll()&&(n=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,r=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,i=t.offset().top-this.activeMenu.offset().top-n-r,s=this.activeMenu.scrollTop(),o=this.activeMenu.height(),u=t.height(),i<0?this.activeMenu.scrollTop(s+i):i+u>o&&this.activeMenu.scrollTop(s+i-o+u))},blur:function(e,t){t||clearTimeout(this.timer);if(!this.active)return;this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active})},_startOpening:function(e){clearTimeout(this.timer);if(e.attr("aria-hidden")!=="true")return;this.timer=this._delay(function(){this._close(),this._open(e)},this.delay)},_open:function(t){var n=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(n)},collapseAll:function(t,n){clearTimeout(this.timer),this.timer=this._delay(function(){var r=n?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));r.length||(r=this.element),this._close(r),this.blur(t),this.activeMenu=r},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,n){var r;this.active&&(e==="first"||e==="last"?r=this.active[e==="first"?"prevAll":"nextAll"](".ui-menu-item").eq(-1):r=this.active[e+"All"](".ui-menu-item").eq(0));if(!r||!r.length||!this.active)r=this.activeMenu.children(".ui-menu-item")[t]();this.focus(n,r)},nextPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isLastItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r-i<0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())},previousPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isFirstItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r+i>0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item").first())},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var n={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,n)}})})(jQuery);(function(e,t){e.widget("ui.progressbar",{version:"1.9.2",options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(e){return e===t?this._value():(this._setOption("value",e),this)},_setOption:function(e,t){e==="value"&&(this.options.value=t,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),this._super(e,t)},_value:function(){var e=this.options.value;return typeof e!="number"&&(e=0),Math.min(this.options.max,Math.max(this.min,e))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var e=this.value(),t=this._percentage();this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),this.valueDiv.toggle(e>this.min).toggleClass("ui-corner-right",e===this.options.max).width(t.toFixed(0)+"%"),this.element.attr("aria-valuenow",e)}})})(jQuery);(function(e,t){var n=5;e.widget("ui.slider",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var t,r,i=this.options,s=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),o="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",u=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(i.disabled?" ui-slider-disabled ui-disabled":"")),this.range=e([]),i.range&&(i.range===!0&&(i.values||(i.values=[this._valueMin(),this._valueMin()]),i.values.length&&i.values.length!==2&&(i.values=[i.values[0],i.values[0]])),this.range=e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(i.range==="min"||i.range==="max"?" ui-slider-range-"+i.range:""))),r=i.values&&i.values.length||1;for(t=s.length;t<r;t++)u.push(o);this.handles=s.add(e(u.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(e){e.preventDefault()}).mouseenter(function(){i.disabled||e(this).addClass("ui-state-hover")}).mouseleave(function(){e(this).removeClass("ui-state-hover")}).focus(function(){i.disabled?e(this).blur():(e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),e(this).addClass("ui-state-focus"))}).blur(function(){e(this).removeClass("ui-state-focus")}),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)}),this._on(this.handles,{keydown:function(t){var r,i,s,o,u=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:t.preventDefault();if(!this._keySliding){this._keySliding=!0,e(t.target).addClass("ui-state-active"),r=this._start(t,u);if(r===!1)return}}o=this.options.step,this.options.values&&this.options.values.length?i=s=this.values(u):i=s=this.value();switch(t.keyCode){case e.ui.keyCode.HOME:s=this._valueMin();break;case e.ui.keyCode.END:s=this._valueMax();break;case e.ui.keyCode.PAGE_UP:s=this._trimAlignValue(i+(this._valueMax()-this._valueMin())/n);break;case e.ui.keyCode.PAGE_DOWN:s=this._trimAlignValue(i-(this._valueMax()-this._valueMin())/n);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(i===this._valueMax())return;s=this._trimAlignValue(i+o);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(i===this._valueMin())return;s=this._trimAlignValue(i-o)}this._slide(t,u,s)},keyup:function(t){var n=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,n),this._change(t,n),e(t.target).removeClass("ui-state-active"))}}),this._refreshValue(),this._animateOff=!1},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var n,r,i,s,o,u,a,f,l=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),n={x:t.pageX,y:t.pageY},r=this._normValueFromMouse(n),i=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var n=Math.abs(r-l.values(t));i>n&&(i=n,s=e(this),o=t)}),c.range===!0&&this.values(1)===c.min&&(o+=1,s=e(this.handles[o])),u=this._start(t,o),u===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,s.addClass("ui-state-active").focus(),a=s.offset(),f=!e(t.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=f?{left:0,top:0}:{left:t.pageX-a.left-s.width()/2,top:t.pageY-a.top-s.height()/2-(parseInt(s.css("borderTopWidth"),10)||0)-(parseInt(s.css("borderBottomWidth"),10)||0)+(parseInt(s.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,r),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},n=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,n),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,n,r,i,s;return this.orientation==="horizontal"?(t=this.elementSize.width,n=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,n=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),r=n/t,r>1&&(r=1),r<0&&(r=0),this.orientation==="vertical"&&(r=1-r),i=this._valueMax()-this._valueMin(),s=this._valueMin()+r*i,this._trimAlignValue(s)},_start:function(e,t){var n={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("start",e,n)},_slide:function(e,t,n){var r,i,s;this.options.values&&this.options.values.length?(r=this.values(t?0:1),this.options.values.length===2&&this.options.range===!0&&(t===0&&n>r||t===1&&n<r)&&(n=r),n!==this.values(t)&&(i=this.values(),i[t]=n,s=this._trigger("slide",e,{handle:this.handles[t],value:n,values:i}),r=this.values(t?0:1),s!==!1&&this.values(t,n,!0))):n!==this.value()&&(s=this._trigger("slide",e,{handle:this.handles[t],value:n}),s!==!1&&this.value(n))},_stop:function(e,t){var n={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("stop",e,n)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var n={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("change",e,n)}},value:function(e){if(arguments.length){this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0);return}return this._value()},values:function(t,n){var r,i,s;if(arguments.length>1){this.options.values[t]=this._trimAlignValue(n),this._refreshValue(),this._change(null,t);return}if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();r=this.options.values,i=arguments[0];for(s=0;s<r.length;s+=1)r[s]=this._trimAlignValue(i[s]),this._change(null,s);this._refreshValue()},_setOption:function(t,n){var r,i=0;e.isArray(this.options.values)&&(i=this.options.values.length),e.Widget.prototype._setOption.apply(this,arguments);switch(t){case"disabled":n?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.prop("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.prop("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(r=0;r<i;r+=1)this._change(null,r);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e),e},_values:function(e){var t,n,r;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t),t;n=this.options.values.slice();for(r=0;r<n.length;r+=1)n[r]=this._trimAlignValue(n[r]);return n},_trimAlignValue:function(e){if(e<=this._valueMin())return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,n=(e-this._valueMin())%t,r=e-n;return Math.abs(n)*2>=t&&(r+=n>0?t:-t),parseFloat(r.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var t,n,r,i,s,o=this.options.range,u=this.options,a=this,f=this._animateOff?!1:u.animate,l={};this.options.values&&this.options.values.length?this.handles.each(function(r){n=(a.values(r)-a._valueMin())/(a._valueMax()-a._valueMin())*100,l[a.orientation==="horizontal"?"left":"bottom"]=n+"%",e(this).stop(1,1)[f?"animate":"css"](l,u.animate),a.options.range===!0&&(a.orientation==="horizontal"?(r===0&&a.range.stop(1,1)[f?"animate":"css"]({left:n+"%"},u.animate),r===1&&a.range[f?"animate":"css"]({width:n-t+"%"},{queue:!1,duration:u.animate})):(r===0&&a.range.stop(1,1)[f?"animate":"css"]({bottom:n+"%"},u.animate),r===1&&a.range[f?"animate":"css"]({height:n-t+"%"},{queue:!1,duration:u.animate}))),t=n}):(r=this.value(),i=this._valueMin(),s=this._valueMax(),n=s!==i?(r-i)/(s-i)*100:0,l[this.orientation==="horizontal"?"left":"bottom"]=n+"%",this.handle.stop(1,1)[f?"animate":"css"](l,u.animate),o==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[f?"animate":"css"]({width:n+"%"},u.animate),o==="max"&&this.orientation==="horizontal"&&this.range[f?"animate":"css"]({width:100-n+"%"},{queue:!1,duration:u.animate}),o==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[f?"animate":"css"]({height:n+"%"},u.animate),o==="max"&&this.orientation==="vertical"&&this.range[f?"animate":"css"]({height:100-n+"%"},{queue:!1,duration:u.animate}))}})})(jQuery);(function(e){function t(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.widget("ui.spinner",{version:"1.9.2",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t={},n=this.element;return e.each(["min","max","step"],function(e,r){var i=n.attr(r);i!==undefined&&i.length&&(t[r]=i)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){if(this.cancelBlur){delete this.cancelBlur;return}this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e)},mousewheel:function(e,t){if(!t)return;if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()},"mousedown .ui-spinner-button":function(t){function r(){var e=this.element[0]===this.document[0].activeElement;e||(this.element.focus(),this.previous=n,this._delay(function(){this.previous=n}))}var n;n=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),r.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,r.call(this)});if(this._start(t)===!1)return;this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){if(!e(t.currentTarget).hasClass("ui-state-active"))return;if(this._start(t)===!1)return!1;this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var e=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=e.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(e.height()*.5)&&e.height()>0&&e.height(e.height()),this.options.disabled&&this.disable()},_keydown:function(t){var n=this.options,r=e.ui.keyCode;switch(t.keyCode){case r.UP:return this._repeat(null,1,t),!0;case r.DOWN:return this._repeat(null,-1,t),!0;case r.PAGE_UP:return this._repeat(null,n.page,t),!0;case r.PAGE_DOWN:return this._repeat(null,-n.page,t),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"},_start:function(e){return!this.spinning&&this._trigger("start",e)===!1?!1:(this.counter||(this.counter=1),this.spinning=!0,!0)},_repeat:function(e,t,n){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,n)},e),this._spin(t*this.options.step,n)},_spin:function(e,t){var n=this.value()||0;this.counter||(this.counter=1),n=this._adjustValue(n+e*this._increment(this.counter));if(!this.spinning||this._trigger("spin",t,{value:n})!==!1)this._value(n),this.counter++},_increment:function(t){var n=this.options.incremental;return n?e.isFunction(n)?n(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return this.options.min!==null&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=e.toString(),n=t.indexOf(".");return n===-1?0:t.length-n-1},_adjustValue:function(e){var t,n,r=this.options;return t=r.min!==null?r.min:0,n=e-t,n=Math.round(n/r.step)*r.step,e=t+n,e=parseFloat(e.toFixed(this._precision())),r.max!==null&&e>r.max?r.max:r.min!==null&&e<r.min?r.min:e},_stop:function(e){if(!this.spinning)return;clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e)},_setOption:function(e,t){if(e==="culture"||e==="numberFormat"){var n=this._parse(this.element.val());this.options[e]=t,this.element.val(this._format(n));return}(e==="max"||e==="min"||e==="step")&&typeof t=="string"&&(t=this._parse(t)),this._super(e,t),e==="disabled"&&(t?(this.element.prop("disabled",!0),this.buttons.button("disable")):(this.element.prop("disabled",!1),this.buttons.button("enable")))},_setOptions:t(function(e){this._super(e),this._value(this.element.val())}),_parse:function(e){return typeof e=="string"&&e!==""&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),e===""||isNaN(e)?null:e},_format:function(e){return e===""?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},_value:function(e,t){var n;e!==""&&(n=this._parse(e),n!==null&&(t||(n=this._adjustValue(n)),e=this._format(n))),this.element.val(e),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:t(function(e){this._stepUp(e)}),_stepUp:function(e){this._spin((e||1)*this.options.step)},stepDown:t(function(e){this._stepDown(e)}),_stepDown:function(e){this._spin((e||1)*-this.options.step)},pageUp:t(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:t(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){if(!arguments.length)return this._parse(this.element.val());t(this._value).call(this,e)},widget:function(){return this.uiSpinner}})})(jQuery);(function(e,t){function i(){return++n}function s(e){return e.hash.length>1&&e.href.replace(r,"")===location.href.replace(r,"").replace(/\s/g,"%20")}var n=0,r=/#.*$/;e.widget("ui.tabs",{version:"1.9.2",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_create:function(){var t=this,n=this.options,r=n.active,i=location.hash.substring(1);this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",n.collapsible).delegate(".ui-tabs-nav > li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this._processTabs();if(r===null){i&&this.tabs.each(function(t,n){if(e(n).attr("aria-controls")===i)return r=t,!1}),r===null&&(r=this.tabs.index(this.tabs.filter(".ui-tabs-active")));if(r===null||r===-1)r=this.tabs.length?0:!1}r!==!1&&(r=this.tabs.index(this.tabs.eq(r)),r===-1&&(r=n.collapsible?!1:0)),n.active=r,!n.collapsible&&n.active===!1&&this.anchors.length&&(n.active=0),e.isArray(n.disabled)&&(n.disabled=e.unique(n.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),this.options.active!==!1&&this.anchors.length?this.active=this._findActive(this.options.active):this.active=e(),this._refresh(),this.active.length&&this.load(n.active)},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(t){var n=e(this.document[0].activeElement).closest("li"),r=this.tabs.index(n),i=!0;if(this._handlePageNav(t))return;switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:r++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:i=!1,r--;break;case e.ui.keyCode.END:r=this.anchors.length-1;break;case e.ui.keyCode.HOME:r=0;break;case e.ui.keyCode.SPACE:t.preventDefault(),clearTimeout(this.activating),this._activate(r);return;case e.ui.keyCode.ENTER:t.preventDefault(),clearTimeout(this.activating),this._activate(r===this.options.active?!1:r);return;default:return}t.preventDefault(),clearTimeout(this.activating),r=this._focusNextTab(r,i),t.ctrlKey||(n.attr("aria-selected","false"),this.tabs.eq(r).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",r)},this.delay))},_panelKeydown:function(t){if(this._handlePageNav(t))return;t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus())},_handlePageNav:function(t){if(t.altKey&&t.keyCode===e.ui.keyCode.PAGE_UP)return this._activate(this._focusNextTab(this.options.active-1,!1)),!0;if(t.altKey&&t.keyCode===e.ui.keyCode.PAGE_DOWN)return this._activate(this._focusNextTab(this.options.active+1,!0)),!0},_findNextTab:function(t,n){function i(){return t>r&&(t=0),t<0&&(t=r),t}var r=this.tabs.length-1;while(e.inArray(i(),this.options.disabled)!==-1)t=n?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e},_setOption:function(e,t){if(e==="active"){this._activate(t);return}if(e==="disabled"){this._setupDisabled(t);return}this._super(e,t),e==="collapsible"&&(this.element.toggleClass("ui-tabs-collapsible",t),!t&&this.options.active===!1&&this._activate(0)),e==="event"&&this._setupEvents(t),e==="heightStyle"&&this._setupHeightStyle(t)},_tabId:function(e){return e.attr("aria-controls")||"ui-tabs-"+i()},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,n=this.tablist.children(":has(a[href])");t.disabled=e.map(n.filter(".ui-state-disabled"),function(e){return n.index(e)}),this._processTabs(),t.active===!1||!this.anchors.length?(t.active=!1,this.active=e()):this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded":"false","aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-expanded":"true","aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist"),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=e(),this.anchors.each(function(n,r){var i,o,u,a=e(r).uniqueId().attr("id"),f=e(r).closest("li"),l=f.attr("aria-controls");s(r)?(i=r.hash,o=t.element.find(t._sanitizeSelector(i))):(u=t._tabId(f),i="#"+u,o=t.element.find(i),o.length||(o=t._createPanel(u),o.insertAfter(t.panels[n-1]||t.tablist)),o.attr("aria-live","polite")),o.length&&(t.panels=t.panels.add(o)),l&&f.data("ui-tabs-aria-controls",l),f.attr({"aria-controls":i.substring(1),"aria-labelledby":a}),o.attr("aria-labelledby",a)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel")},_getList:function(){return this.element.find("ol,ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(t){e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1);for(var n=0,r;r=this.tabs[n];n++)t===!0||e.inArray(n,t)!==-1?e(r).addClass("ui-state-disabled").attr("aria-disabled","true"):e(r).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=t},_setupEvents:function(t){var n={click:function(e){e.preventDefault()}};t&&e.each(t.split(" "),function(e,t){n[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(this.anchors,n),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var n,r,i=this.element.parent();t==="fill"?(e.support.minHeight||(r=i.css("overflow"),i.css("overflow","hidden")),n=i.height(),this.element.siblings(":visible").each(function(){var t=e(this),r=t.css("position");if(r==="absolute"||r==="fixed")return;n-=t.outerHeight(!0)}),r&&i.css("overflow",r),this.element.children().not(this.panels).each(function(){n-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,n-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):t==="auto"&&(n=0,this.panels.each(function(){n=Math.max(n,e(this).height("").height())}).height(n))},_eventHandler:function(t){var n=this.options,r=this.active,i=e(t.currentTarget),s=i.closest("li"),o=s[0]===r[0],u=o&&n.collapsible,a=u?e():this._getPanelForTab(s),f=r.length?this._getPanelForTab(r):e(),l={oldTab:r,oldPanel:f,newTab:u?e():s,newPanel:a};t.preventDefault();if(s.hasClass("ui-state-disabled")||s.hasClass("ui-tabs-loading")||this.running||o&&!n.collapsible||this._trigger("beforeActivate",t,l)===!1)return;n.active=u?!1:this.tabs.index(s),this.active=o?e():s,this.xhr&&this.xhr.abort(),!f.length&&!a.length&&e.error("jQuery UI Tabs: Mismatching fragment identifier."),a.length&&this.load(this.tabs.index(s),t),this._toggle(t,l)},_toggle:function(t,n){function o(){r.running=!1,r._trigger("activate",t,n)}function u(){n.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),i.length&&r.options.show?r._show(i,r.options.show,o):(i.show(),o())}var r=this,i=n.newPanel,s=n.oldPanel;this.running=!0,s.length&&this.options.hide?this._hide(s,this.options.hide,function(){n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),u()}):(n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),s.hide(),u()),s.attr({"aria-expanded":"false","aria-hidden":"true"}),n.oldTab.attr("aria-selected","false"),i.length&&s.length?n.oldTab.attr("tabIndex",-1):i.length&&this.tabs.filter(function(){return e(this).attr("tabIndex")===0}).attr("tabIndex",-1),i.attr({"aria-expanded":"true","aria-hidden":"false"}),n.newTab.attr({"aria-selected":"true",tabIndex:0})},_activate:function(t){var n,r=this._findActive(t);if(r[0]===this.active[0])return;r.length||(r=this.active),n=r.find(".ui-tabs-anchor")[0],this._eventHandler({target:n,currentTarget:n,preventDefault:e.noop})},_findActive:function(t){return t===!1?e():this.tabs.eq(t)},_getIndex:function(e){return typeof e=="string"&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeData("href.tabs").removeData("load.tabs").removeUniqueId(),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var t=e(this),n=t.data("ui-tabs-aria-controls");n?t.attr("aria-controls",n):t.removeAttr("aria-controls")}),this.panels.show(),this.options.heightStyle!=="content"&&this.panels.css("height","")},enable:function(n){var r=this.options.disabled;if(r===!1)return;n===t?r=!1:(n=this._getIndex(n),e.isArray(r)?r=e.map(r,function(e){return e!==n?e:null}):r=e.map(this.tabs,function(e,t){return t!==n?t:null})),this._setupDisabled(r)},disable:function(n){var r=this.options.disabled;if(r===!0)return;if(n===t)r=!0;else{n=this._getIndex(n);if(e.inArray(n,r)!==-1)return;e.isArray(r)?r=e.merge([n],r).sort():r=[n]}this._setupDisabled(r)},load:function(t,n){t=this._getIndex(t);var r=this,i=this.tabs.eq(t),o=i.find(".ui-tabs-anchor"),u=this._getPanelForTab(i),a={tab:i,panel:u};if(s(o[0]))return;this.xhr=e.ajax(this._ajaxSettings(o,n,a)),this.xhr&&this.xhr.statusText!=="canceled"&&(i.addClass("ui-tabs-loading"),u.attr("aria-busy","true"),this.xhr.success(function(e){setTimeout(function(){u.html(e),r._trigger("load",n,a)},1)}).complete(function(e,t){setTimeout(function(){t==="abort"&&r.panels.stop(!1,!0),i.removeClass("ui-tabs-loading"),u.removeAttr("aria-busy"),e===r.xhr&&delete r.xhr},1)}))},_ajaxSettings:function(t,n,r){var i=this;return{url:t.attr("href"),beforeSend:function(t,s){return i._trigger("beforeLoad",n,e.extend({jqXHR:t,ajaxSettings:s},r))}}},_getPanelForTab:function(t){var n=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+n))}}),e.uiBackCompat!==!1&&(e.ui.tabs.prototype._ui=function(e,t){return{tab:e,panel:t,index:this.anchors.index(e)}},e.widget("ui.tabs",e.ui.tabs,{url:function(e,t){this.anchors.eq(e).attr("href",t)}}),e.widget("ui.tabs",e.ui.tabs,{options:{ajaxOptions:null,cache:!1},_create:function(){this._super();var t=this;this._on({tabsbeforeload:function(n,r){if(e.data(r.tab[0],"cache.tabs")){n.preventDefault();return}r.jqXHR.success(function(){t.options.cache&&e.data(r.tab[0],"cache.tabs",!0)})}})},_ajaxSettings:function(t,n,r){var i=this.options.ajaxOptions;return e.extend({},i,{error:function(e,t){try{i.error(e,t,r.tab.closest("li").index(),r.tab[0])}catch(n){}}},this._superApply(arguments))},_setOption:function(e,t){e==="cache"&&t===!1&&this.anchors.removeData("cache.tabs"),this._super(e,t)},_destroy:function(){this.anchors.removeData("cache.tabs"),this._super()},url:function(e){this.anchors.eq(e).removeData("cache.tabs"),this._superApply(arguments)}}),e.widget("ui.tabs",e.ui.tabs,{abort:function(){this.xhr&&this.xhr.abort()}}),e.widget("ui.tabs",e.ui.tabs,{options:{spinner:"<em>Loading&#8230;</em>"},_create:function(){this._super(),this._on({tabsbeforeload:function(e,t){if(e.target!==this.element[0]||!this.options.spinner)return;var n=t.tab.find("span"),r=n.html();n.html(this.options.spinner),t.jqXHR.complete(function(){n.html(r)})}})}}),e.widget("ui.tabs",e.ui.tabs,{options:{enable:null,disable:null},enable:function(t){var n=this.options,r;if(t&&n.disabled===!0||e.isArray(n.disabled)&&e.inArray(t,n.disabled)!==-1)r=!0;this._superApply(arguments),r&&this._trigger("enable",null,this._ui(this.anchors[t],this.panels[t]))},disable:function(t){var n=this.options,r;if(t&&n.disabled===!1||e.isArray(n.disabled)&&e.inArray(t,n.disabled)===-1)r=!0;this._superApply(arguments),r&&this._trigger("disable",null,this._ui(this.anchors[t],this.panels[t]))}}),e.widget("ui.tabs",e.ui.tabs,{options:{add:null,remove:null,tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},add:function(n,r,i){i===t&&(i=this.anchors.length);var s,o,u=this.options,a=e(u.tabTemplate.replace(/#\{href\}/g,n).replace(/#\{label\}/g,r)),f=n.indexOf("#")?this._tabId(a):n.replace("#","");return a.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy",!0),a.attr("aria-controls",f),s=i>=this.tabs.length,o=this.element.find("#"+f),o.length||(o=this._createPanel(f),s?i>0?o.insertAfter(this.panels.eq(-1)):o.appendTo(this.element):o.insertBefore(this.panels[i])),o.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide(),s?a.appendTo(this.tablist):a.insertBefore(this.tabs[i]),u.disabled=e.map(u.disabled,function(e){return e>=i?++e:e}),this.refresh(),this.tabs.length===1&&u.active===!1&&this.option("active",0),this._trigger("add",null,this._ui(this.anchors[i],this.panels[i])),this},remove:function(t){t=this._getIndex(t);var n=this.options,r=this.tabs.eq(t).remove(),i=this._getPanelForTab(r).remove();return r.hasClass("ui-tabs-active")&&this.anchors.length>2&&this._activate(t+(t+1<this.anchors.length?1:-1)),n.disabled=e.map(e.grep(n.disabled,function(e){return e!==t}),function(e){return e>=t?--e:e}),this.refresh(),this._trigger("remove",null,this._ui(r.find("a")[0],i[0])),this}}),e.widget("ui.tabs",e.ui.tabs,{length:function(){return this.anchors.length}}),e.widget("ui.tabs",e.ui.tabs,{options:{idPrefix:"ui-tabs-"},_tabId:function(t){var n=t.is("li")?t.find("a[href]"):t;return n=n[0],e(n).closest("li").attr("aria-controls")||n.title&&n.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF\-]/g,"")||this.options.idPrefix+i()}}),e.widget("ui.tabs",e.ui.tabs,{options:{panelTemplate:"<div></div>"},_createPanel:function(t){return e(this.options.panelTemplate).attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)}}),e.widget("ui.tabs",e.ui.tabs,{_create:function(){var e=this.options;e.active===null&&e.selected!==t&&(e.active=e.selected===-1?!1:e.selected),this._super(),e.selected=e.active,e.selected===!1&&(e.selected=-1)},_setOption:function(e,t){if(e!=="selected")return this._super(e,t);var n=this.options;this._super("active",t===-1?!1:t),n.selected=n.active,n.selected===!1&&(n.selected=-1)},_eventHandler:function(){this._superApply(arguments),this.options.selected=this.options.active,this.options.selected===!1&&(this.options.selected=-1)}}),e.widget("ui.tabs",e.ui.tabs,{options:{show:null,select:null},_create:function(){this._super(),this.options.active!==!1&&this._trigger("show",null,this._ui(this.active.find(".ui-tabs-anchor")[0],this._getPanelForTab(this.active)[0]))},_trigger:function(e,t,n){var r,i,s=this._superApply(arguments);return s?(e==="beforeActivate"?(r=n.newTab.length?n.newTab:n.oldTab,i=n.newPanel.length?n.newPanel:n.oldPanel,s=this._super("select",t,{tab:r.find(".ui-tabs-anchor")[0],panel:i[0],index:r.closest("li").index()})):e==="activate"&&n.newTab.length&&(s=this._super("show",t,{tab:n.newTab.find(".ui-tabs-anchor")[0],panel:n.newPanel[0],index:n.newTab.closest("li").index()})),s):!1}}),e.widget("ui.tabs",e.ui.tabs,{select:function(e){e=this._getIndex(e);if(e===-1){if(!this.options.collapsible||this.options.selected===-1)return;e=this.options.selected}this.anchors.eq(e).trigger(this.options.event+this.eventNamespace)}}),function(){var t=0;e.widget("ui.tabs",e.ui.tabs,{options:{cookie:null},_create:function(){var e=this.options,t;e.active==null&&e.cookie&&(t=parseInt(this._cookie(),10),t===-1&&(t=!1),e.active=t),this._super()},_cookie:function(n){var r=[this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+ ++t)];return arguments.length&&(r.push(n===!1?-1:n),r.push(this.options.cookie)),e.cookie.apply(null,r)},_refresh:function(){this._super(),this.options.cookie&&this._cookie(this.options.active,this.options.cookie)},_eventHandler:function(){this._superApply(arguments),this.options.cookie&&this._cookie(this.options.active,this.options.cookie)},_destroy:function(){this._super(),this.options.cookie&&this._cookie(null,this.options.cookie)}})}(),e.widget("ui.tabs",e.ui.tabs,{_trigger:function(t,n,r){var i=e.extend({},r);return t==="load"&&(i.panel=i.panel[0],i.tab=i.tab.find(".ui-tabs-anchor")[0]),this._super(t,n,i)}}),e.widget("ui.tabs",e.ui.tabs,{options:{fx:null},_getFx:function(){var t,n,r=this.options.fx;return r&&(e.isArray(r)?(t=r[0],n=r[1]):t=n=r),r?{show:n,hide:t}:null},_toggle:function(e,t){function o(){n.running=!1,n._trigger("activate",e,t)}function u(){t.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),r.length&&s.show?r.animate(s.show,s.show.duration,function(){o()}):(r.show(),o())}var n=this,r=t.newPanel,i=t.oldPanel,s=this._getFx();if(!s)return this._super(e,t);n.running=!0,i.length&&s.hide?i.animate(s.hide,s.hide.duration,function(){t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),u()}):(t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),i.hide(),u())}}))})(jQuery);(function(e){function n(t,n){var r=(t.attr("aria-describedby")||"").split(/\s+/);r.push(n),t.data("ui-tooltip-id",n).attr("aria-describedby",e.trim(r.join(" ")))}function r(t){var n=t.data("ui-tooltip-id"),r=(t.attr("aria-describedby")||"").split(/\s+/),i=e.inArray(n,r);i!==-1&&r.splice(i,1),t.removeData("ui-tooltip-id"),r=e.trim(r.join(" ")),r?t.attr("aria-describedby",r):t.removeAttr("aria-describedby")}var t=0;e.widget("ui.tooltip",{version:"1.9.2",options:{content:function(){return e(this).attr("title")},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(t,n){var r=this;if(t==="disabled"){this[n?"_disable":"_enable"](),this.options[t]=n;return}this._super(t,n),t==="content"&&e.each(this.tooltips,function(e,t){r._updateContent(t)})},_disable:function(){var t=this;e.each(this.tooltips,function(n,r){var i=e.Event("blur");i.target=i.currentTarget=r[0],t.close(i,!0)}),this.element.find(this.options.items).andSelf().each(function(){var t=e(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).andSelf().each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))})},open:function(t){var n=this,r=e(t?t.target:this.element).closest(this.options.items);if(!r.length||r.data("ui-tooltip-id"))return;r.attr("title")&&r.data("ui-tooltip-title",r.attr("title")),r.data("ui-tooltip-open",!0),t&&t.type==="mouseover"&&r.parents().each(function(){var t=e(this),r;t.data("ui-tooltip-open")&&(r=e.Event("blur"),r.target=r.currentTarget=this,n.close(r,!0)),t.attr("title")&&(t.uniqueId(),n.parents[this.id]={element:this,title:t.attr("title")},t.attr("title",""))}),this._updateContent(r,t)},_updateContent:function(e,t){var n,r=this.options.content,i=this,s=t?t.type:null;if(typeof r=="string")return this._open(t,e,r);n=r.call(e[0],function(n){if(!e.data("ui-tooltip-open"))return;i._delay(function(){t&&(t.type=s),this._open(t,e,n)})}),n&&this._open(t,e,n)},_open:function(t,r,i){function f(e){a.of=e;if(s.is(":hidden"))return;s.position(a)}var s,o,u,a=e.extend({},this.options.position);if(!i)return;s=this._find(r);if(s.length){s.find(".ui-tooltip-content").html(i);return}r.is("[title]")&&(t&&t.type==="mouseover"?r.attr("title",""):r.removeAttr("title")),s=this._tooltip(r),n(r,s.attr("id")),s.find(".ui-tooltip-content").html(i),this.options.track&&t&&/^mouse/.test(t.type)?(this._on(this.document,{mousemove:f}),f(t)):s.position(e.extend({of:r},this.options.position)),s.hide(),this._show(s,this.options.show),this.options.show&&this.options.show.delay&&(u=setInterval(function(){s.is(":visible")&&(f(a.of),clearInterval(u))},e.fx.interval)),this._trigger("open",t,{tooltip:s}),o={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var n=e.Event(t);n.currentTarget=r[0],this.close(n,!0)}},remove:function(){this._removeTooltip(s)}};if(!t||t.type==="mouseover")o.mouseleave="close";if(!t||t.type==="focusin")o.focusout="close";this._on(!0,r,o)},close:function(t){var n=this,i=e(t?t.currentTarget:this.element),s=this._find(i);if(this.closing)return;i.data("ui-tooltip-title")&&i.attr("title",i.data("ui-tooltip-title")),r(i),s.stop(!0),this._hide(s,this.options.hide,function(){n._removeTooltip(e(this))}),i.removeData("ui-tooltip-open"),this._off(i,"mouseleave focusout keyup"),i[0]!==this.element[0]&&this._off(i,"remove"),this._off(this.document,"mousemove"),t&&t.type==="mouseleave"&&e.each(this.parents,function(t,r){e(r.element).attr("title",r.title),delete n.parents[t]}),this.closing=!0,this._trigger("close",t,{tooltip:s}),this.closing=!1},_tooltip:function(n){var r="ui-tooltip-"+t++,i=e("<div>").attr({id:r,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return e("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),e.fn.bgiframe&&i.bgiframe(),this.tooltips[r]=n,i},_find:function(t){var n=t.data("ui-tooltip-id");return n?e("#"+n):e()},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_destroy:function(){var t=this;e.each(this.tooltips,function(n,r){var i=e.Event("blur");i.target=i.currentTarget=r[0],t.close(i,!0),e("#"+n).remove(),r.data("ui-tooltip-title")&&(r.attr("title",r.data("ui-tooltip-title")),r.removeData("ui-tooltip-title"))})}})})(jQuery);jQuery.effects||function(e,t){var n=e.uiBackCompat!==!1,r="ui-effects-";e.effects={effect:{}},function(t,n){function p(e,t,n){var r=a[t.type]||{};return e==null?n||!t.def?null:t.def:(e=r.floor?~~e:parseFloat(e),isNaN(e)?t.def:r.mod?(e+r.mod)%r.mod:0>e?0:r.max<e?r.max:e)}function d(e){var n=o(),r=n._rgba=[];return e=e.toLowerCase(),h(s,function(t,i){var s,o=i.re.exec(e),a=o&&i.parse(o),f=i.space||"rgba";if(a)return s=n[f](a),n[u[f].cache]=s[u[f].cache],r=n._rgba=s._rgba,!1}),r.length?(r.join()==="0,0,0,0"&&t.extend(r,c.transparent),n):c[e]}function v(e,t,n){return n=(n+1)%1,n*6<1?e+(t-e)*n*6:n*2<1?t:n*3<2?e+(t-e)*(2/3-n)*6:e}var r="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),i=/^([\-+])=\s*(\d+\.?\d*)/,s=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1]*2.55,e[2]*2.55,e[3]*2.55,e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],o=t.Color=function(e,n,r,i){return new t.Color.fn.parse(e,n,r,i)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},a={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},f=o.support={},l=t("<p>")[0],c,h=t.each;l.style.cssText="background-color:rgba(1,1,1,.5)",f.rgba=l.style.backgroundColor.indexOf("rgba")>-1,h(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),o.fn=t.extend(o.prototype,{parse:function(r,i,s,a){if(r===n)return this._rgba=[null,null,null,null],this;if(r.jquery||r.nodeType)r=t(r).css(i),i=n;var f=this,l=t.type(r),v=this._rgba=[];i!==n&&(r=[r,i,s,a],l="array");if(l==="string")return this.parse(d(r)||c._default);if(l==="array")return h(u.rgba.props,function(e,t){v[t.idx]=p(r[t.idx],t)}),this;if(l==="object")return r instanceof o?h(u,function(e,t){r[t.cache]&&(f[t.cache]=r[t.cache].slice())}):h(u,function(t,n){var i=n.cache;h(n.props,function(e,t){if(!f[i]&&n.to){if(e==="alpha"||r[e]==null)return;f[i]=n.to(f._rgba)}f[i][t.idx]=p(r[e],t,!0)}),f[i]&&e.inArray(null,f[i].slice(0,3))<0&&(f[i][3]=1,n.from&&(f._rgba=n.from(f[i])))}),this},is:function(e){var t=o(e),n=!0,r=this;return h(u,function(e,i){var s,o=t[i.cache];return o&&(s=r[i.cache]||i.to&&i.to(r._rgba)||[],h(i.props,function(e,t){if(o[t.idx]!=null)return n=o[t.idx]===s[t.idx],n})),n}),n},_space:function(){var e=[],t=this;return h(u,function(n,r){t[r.cache]&&e.push(n)}),e.pop()},transition:function(e,t){var n=o(e),r=n._space(),i=u[r],s=this.alpha()===0?o("transparent"):this,f=s[i.cache]||i.to(s._rgba),l=f.slice();return n=n[i.cache],h(i.props,function(e,r){var i=r.idx,s=f[i],o=n[i],u=a[r.type]||{};if(o===null)return;s===null?l[i]=o:(u.mod&&(o-s>u.mod/2?s+=u.mod:s-o>u.mod/2&&(s-=u.mod)),l[i]=p((o-s)*t+s,r))}),this[r](l)},blend:function(e){if(this._rgba[3]===1)return this;var n=this._rgba.slice(),r=n.pop(),i=o(e)._rgba;return o(t.map(n,function(e,t){return(1-r)*i[t]+r*e}))},toRgbaString:function(){var e="rgba(",n=t.map(this._rgba,function(e,t){return e==null?t>2?1:0:e});return n[3]===1&&(n.pop(),e="rgb("),e+n.join()+")"},toHslaString:function(){var e="hsla(",n=t.map(this.hsla(),function(e,t){return e==null&&(e=t>2?1:0),t&&t<3&&(e=Math.round(e*100)+"%"),e});return n[3]===1&&(n.pop(),e="hsl("),e+n.join()+")"},toHexString:function(e){var n=this._rgba.slice(),r=n.pop();return e&&n.push(~~(r*255)),"#"+t.map(n,function(e){return e=(e||0).toString(16),e.length===1?"0"+e:e}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}}),o.fn.parse.prototype=o.fn,u.hsla.to=function(e){if(e[0]==null||e[1]==null||e[2]==null)return[null,null,null,e[3]];var t=e[0]/255,n=e[1]/255,r=e[2]/255,i=e[3],s=Math.max(t,n,r),o=Math.min(t,n,r),u=s-o,a=s+o,f=a*.5,l,c;return o===s?l=0:t===s?l=60*(n-r)/u+360:n===s?l=60*(r-t)/u+120:l=60*(t-n)/u+240,f===0||f===1?c=f:f<=.5?c=u/a:c=u/(2-a),[Math.round(l)%360,c,f,i==null?1:i]},u.hsla.from=function(e){if(e[0]==null||e[1]==null||e[2]==null)return[null,null,null,e[3]];var t=e[0]/360,n=e[1],r=e[2],i=e[3],s=r<=.5?r*(1+n):r+n-r*n,o=2*r-s;return[Math.round(v(o,s,t+1/3)*255),Math.round(v(o,s,t)*255),Math.round(v(o,s,t-1/3)*255),i]},h(u,function(e,r){var s=r.props,u=r.cache,a=r.to,f=r.from;o.fn[e]=function(e){a&&!this[u]&&(this[u]=a(this._rgba));if(e===n)return this[u].slice();var r,i=t.type(e),l=i==="array"||i==="object"?e:arguments,c=this[u].slice();return h(s,function(e,t){var n=l[i==="object"?e:t.idx];n==null&&(n=c[t.idx]),c[t.idx]=p(n,t)}),f?(r=o(f(c)),r[u]=c,r):o(c)},h(s,function(n,r){if(o.fn[n])return;o.fn[n]=function(s){var o=t.type(s),u=n==="alpha"?this._hsla?"hsla":"rgba":e,a=this[u](),f=a[r.idx],l;return o==="undefined"?f:(o==="function"&&(s=s.call(this,f),o=t.type(s)),s==null&&r.empty?this:(o==="string"&&(l=i.exec(s),l&&(s=f+parseFloat(l[2])*(l[1]==="+"?1:-1))),a[r.idx]=s,this[u](a)))}})}),h(r,function(e,n){t.cssHooks[n]={set:function(e,r){var i,s,u="";if(t.type(r)!=="string"||(i=d(r))){r=o(i||r);if(!f.rgba&&r._rgba[3]!==1){s=n==="backgroundColor"?e.parentNode:e;while((u===""||u==="transparent")&&s&&s.style)try{u=t.css(s,"backgroundColor"),s=s.parentNode}catch(a){}r=r.blend(u&&u!=="transparent"?u:"_default")}r=r.toRgbaString()}try{e.style[n]=r}catch(l){}}},t.fx.step[n]=function(e){e.colorInit||(e.start=o(e.elem,n),e.end=o(e.end),e.colorInit=!0),t.cssHooks[n].set(e.elem,e.start.transition(e.end,e.pos))}}),t.cssHooks.borderColor={expand:function(e){var t={};return h(["Top","Right","Bottom","Left"],function(n,r){t["border"+r+"Color"]=e}),t}},c=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(){var t=this.ownerDocument.defaultView?this.ownerDocument.defaultView.getComputedStyle(this,null):this.currentStyle,n={},r,i;if(t&&t.length&&t[0]&&t[t[0]]){i=t.length;while(i--)r=t[i],typeof t[r]=="string"&&(n[e.camelCase(r)]=t[r])}else for(r in t)typeof t[r]=="string"&&(n[r]=t[r]);return n}function s(t,n){var i={},s,o;for(s in n)o=n[s],t[s]!==o&&!r[s]&&(e.fx.step[s]||!isNaN(parseFloat(o)))&&(i[s]=o);return i}var n=["add","remove","toggle"],r={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,n){e.fx.step[n]=function(e){if(e.end!=="none"&&!e.setAttr||e.pos===1&&!e.setAttr)jQuery.style(e.elem,n,e.end),e.setAttr=!0}}),e.effects.animateClass=function(t,r,o,u){var a=e.speed(r,o,u);return this.queue(function(){var r=e(this),o=r.attr("class")||"",u,f=a.children?r.find("*").andSelf():r;f=f.map(function(){var t=e(this);return{el:t,start:i.call(this)}}),u=function(){e.each(n,function(e,n){t[n]&&r[n+"Class"](t[n])})},u(),f=f.map(function(){return this.end=i.call(this.el[0]),this.diff=s(this.start,this.end),this}),r.attr("class",o),f=f.map(function(){var t=this,n=e.Deferred(),r=jQuery.extend({},a,{queue:!1,complete:function(){n.resolve(t)}});return this.el.animate(this.diff,r),n.promise()}),e.when.apply(e,f.get()).done(function(){u(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),a.complete.call(r[0])})})},e.fn.extend({_addClass:e.fn.addClass,addClass:function(t,n,r,i){return n?e.effects.animateClass.call(this,{add:t},n,r,i):this._addClass(t)},_removeClass:e.fn.removeClass,removeClass:function(t,n,r,i){return n?e.effects.animateClass.call(this,{remove:t},n,r,i):this._removeClass(t)},_toggleClass:e.fn.toggleClass,toggleClass:function(n,r,i,s,o){return typeof r=="boolean"||r===t?i?e.effects.animateClass.call(this,r?{add:n}:{remove:n},i,s,o):this._toggleClass(n,r):e.effects.animateClass.call(this,{toggle:n},r,i,s)},switchClass:function(t,n,r,i,s){return e.effects.animateClass.call(this,{add:n,remove:t},r,i,s)}})}(),function(){function i(t,n,r,i){e.isPlainObject(t)&&(n=t,t=t.effect),t={effect:t},n==null&&(n={}),e.isFunction(n)&&(i=n,r=null,n={});if(typeof n=="number"||e.fx.speeds[n])i=r,r=n,n={};return e.isFunction(r)&&(i=r,r=null),n&&e.extend(t,n),r=r||n.duration,t.duration=e.fx.off?0:typeof r=="number"?r:r in e.fx.speeds?e.fx.speeds[r]:e.fx.speeds._default,t.complete=i||n.complete,t}function s(t){return!t||typeof t=="number"||e.fx.speeds[t]?!0:typeof t=="string"&&!e.effects.effect[t]?n&&e.effects[t]?!1:!0:!1}e.extend(e.effects,{version:"1.9.2",save:function(e,t){for(var n=0;n<t.length;n++)t[n]!==null&&e.data(r+t[n],e[0].style[t[n]])},restore:function(e,n){var i,s;for(s=0;s<n.length;s++)n[s]!==null&&(i=e.data(r+n[s]),i===t&&(i=""),e.css(n[s],i))},setMode:function(e,t){return t==="toggle"&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var n,r;switch(e[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=e[0]/t.height}switch(e[1]){case"left":r=0;break;case"center":r=.5;break;case"right":r=1;break;default:r=e[1]/t.width}return{x:r,y:n}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var n={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},r=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),i={width:t.width(),height:t.height()},s=document.activeElement;try{s.id}catch(o){s=document.body}return t.wrap(r),(t[0]===s||e.contains(t[0],s))&&e(s).focus(),r=t.parent(),t.css("position")==="static"?(r.css({position:"relative"}),t.css({position:"relative"})):(e.extend(n,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,r){n[r]=t.css(r),isNaN(parseInt(n[r],10))&&(n[r]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(i),r.css(n).show()},removeWrapper:function(t){var n=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===n||e.contains(t[0],n))&&e(n).focus()),t},setTransition:function(t,n,r,i){return i=i||{},e.each(n,function(e,n){var s=t.cssUnit(n);s[0]>0&&(i[n]=s[0]*r+s[1])}),i}}),e.fn.extend({effect:function(){function a(n){function u(){e.isFunction(i)&&i.call(r[0]),e.isFunction(n)&&n()}var r=e(this),i=t.complete,s=t.mode;(r.is(":hidden")?s==="hide":s==="show")?u():o.call(r[0],t,u)}var t=i.apply(this,arguments),r=t.mode,s=t.queue,o=e.effects.effect[t.effect],u=!o&&n&&e.effects[t.effect];return e.fx.off||!o&&!u?r?this[r](t.duration,t.complete):this.each(function(){t.complete&&t.complete.call(this)}):o?s===!1?this.each(a):this.queue(s||"fx",a):u.call(this,{options:t,duration:t.duration,callback:t.complete,mode:t.mode})},_show:e.fn.show,show:function(e){if(s(e))return this._show.apply(this,arguments);var t=i.apply(this,arguments);return t.mode="show",this.effect.call(this,t)},_hide:e.fn.hide,hide:function(e){if(s(e))return this._hide.apply(this,arguments);var t=i.apply(this,arguments);return t.mode="hide",this.effect.call(this,t)},__toggle:e.fn.toggle,toggle:function(t){if(s(t)||typeof t=="boolean"||e.isFunction(t))return this.__toggle.apply(this,arguments);var n=i.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)},cssUnit:function(t){var n=this.css(t),r=[];return e.each(["em","px","%","pt"],function(e,t){n.indexOf(t)>0&&(r=[parseFloat(n),t])}),r}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,n){t[n]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return e===0||e===1?e:-Math.pow(2,8*(e-1))*Math.sin(((e-1)*80-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){var t,n=4;while(e<((t=Math.pow(2,--n))-1)/11);return 1/Math.pow(4,3-n)-7.5625*Math.pow((t*3-2)/22-e,2)}}),e.each(t,function(t,n){e.easing["easeIn"+t]=n,e.easing["easeOut"+t]=function(e){return 1-n(1-e)},e.easing["easeInOut"+t]=function(e){return e<.5?n(e*2)/2:1-n(e*-2+2)/2}})}()}(jQuery);(function(e,t){var n=/up|down|vertical/,r=/up|left|vertical|horizontal/;e.effects.effect.blind=function(t,i){var s=e(this),o=["position","top","bottom","left","right","height","width"],u=e.effects.setMode(s,t.mode||"hide"),a=t.direction||"up",f=n.test(a),l=f?"height":"width",c=f?"top":"left",h=r.test(a),p={},d=u==="show",v,m,g;s.parent().is(".ui-effects-wrapper")?e.effects.save(s.parent(),o):e.effects.save(s,o),s.show(),v=e.effects.createWrapper(s).css({overflow:"hidden"}),m=v[l](),g=parseFloat(v.css(c))||0,p[l]=d?m:0,h||(s.css(f?"bottom":"right",0).css(f?"top":"left","auto").css({position:"absolute"}),p[c]=d?g:m+g),d&&(v.css(l,0),h||v.css(c,g+m)),v.animate(p,{duration:t.duration,easing:t.easing,queue:!1,complete:function(){u==="hide"&&s.hide(),e.effects.restore(s,o),e.effects.removeWrapper(s),i()}})}})(jQuery);(function(e,t){e.effects.effect.bounce=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"effect"),o=s==="hide",u=s==="show",a=t.direction||"up",f=t.distance,l=t.times||5,c=l*2+(u||o?1:0),h=t.duration/c,p=t.easing,d=a==="up"||a==="down"?"top":"left",v=a==="up"||a==="left",m,g,y,b=r.queue(),w=b.length;(u||o)&&i.push("opacity"),e.effects.save(r,i),r.show(),e.effects.createWrapper(r),f||(f=r[d==="top"?"outerHeight":"outerWidth"]()/3),u&&(y={opacity:1},y[d]=0,r.css("opacity",0).css(d,v?-f*2:f*2).animate(y,h,p)),o&&(f/=Math.pow(2,l-1)),y={},y[d]=0;for(m=0;m<l;m++)g={},g[d]=(v?"-=":"+=")+f,r.animate(g,h,p).animate(y,h,p),f=o?f*2:f/2;o&&(g={opacity:0},g[d]=(v?"-=":"+=")+f,r.animate(g,h,p)),r.queue(function(){o&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}),w>1&&b.splice.apply(b,[1,0].concat(b.splice(w,c+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.clip=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=t.direction||"vertical",a=u==="vertical",f=a?"height":"width",l=a?"top":"left",c={},h,p,d;e.effects.save(r,i),r.show(),h=e.effects.createWrapper(r).css({overflow:"hidden"}),p=r[0].tagName==="IMG"?h:r,d=p[f](),o&&(p.css(f,0),p.css(l,d/2)),c[f]=o?d:0,c[l]=o?0:d/2,p.animate(c,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){o||r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.drop=function(t,n){var r=e(this),i=["position","top","bottom","left","right","opacity","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=t.direction||"left",a=u==="up"||u==="down"?"top":"left",f=u==="up"||u==="left"?"pos":"neg",l={opacity:o?1:0},c;e.effects.save(r,i),r.show(),e.effects.createWrapper(r),c=t.distance||r[a==="top"?"outerHeight":"outerWidth"](!0)/2,o&&r.css("opacity",0).css(a,f==="pos"?-c:c),l[a]=(o?f==="pos"?"+=":"-=":f==="pos"?"-=":"+=")+c,r.animate(l,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.explode=function(t,n){function y(){c.push(this),c.length===r*i&&b()}function b(){s.css({visibility:"visible"}),e(c).remove(),u||s.hide(),n()}var r=t.pieces?Math.round(Math.sqrt(t.pieces)):3,i=r,s=e(this),o=e.effects.setMode(s,t.mode||"hide"),u=o==="show",a=s.show().css("visibility","hidden").offset(),f=Math.ceil(s.outerWidth()/i),l=Math.ceil(s.outerHeight()/r),c=[],h,p,d,v,m,g;for(h=0;h<r;h++){v=a.top+h*l,g=h-(r-1)/2;for(p=0;p<i;p++)d=a.left+p*f,m=p-(i-1)/2,s.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-p*f,top:-h*l}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:f,height:l,left:d+(u?m*f:0),top:v+(u?g*l:0),opacity:u?0:1}).animate({left:d+(u?0:m*f),top:v+(u?0:g*l),opacity:u?1:0},t.duration||500,t.easing,y)}}})(jQuery);(function(e,t){e.effects.effect.fade=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"toggle");r.animate({opacity:i},{queue:!1,duration:t.duration,easing:t.easing,complete:n})}})(jQuery);(function(e,t){e.effects.effect.fold=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=s==="hide",a=t.size||15,f=/([0-9]+)%/.exec(a),l=!!t.horizFirst,c=o!==l,h=c?["width","height"]:["height","width"],p=t.duration/2,d,v,m={},g={};e.effects.save(r,i),r.show(),d=e.effects.createWrapper(r).css({overflow:"hidden"}),v=c?[d.width(),d.height()]:[d.height(),d.width()],f&&(a=parseInt(f[1],10)/100*v[u?0:1]),o&&d.css(l?{height:0,width:a}:{height:a,width:0}),m[h[0]]=o?v[0]:a,g[h[1]]=o?v[1]:0,d.animate(m,p,t.easing).animate(g,p,t.easing,function(){u&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()})}})(jQuery);(function(e,t){e.effects.effect.highlight=function(t,n){var r=e(this),i=["backgroundImage","backgroundColor","opacity"],s=e.effects.setMode(r,t.mode||"show"),o={backgroundColor:r.css("backgroundColor")};s==="hide"&&(o.opacity=0),e.effects.save(r,i),r.show().css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),n()}})}})(jQuery);(function(e,t){e.effects.effect.pulsate=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"show"),s=i==="show",o=i==="hide",u=s||i==="hide",a=(t.times||5)*2+(u?1:0),f=t.duration/a,l=0,c=r.queue(),h=c.length,p;if(s||!r.is(":visible"))r.css("opacity",0).show(),l=1;for(p=1;p<a;p++)r.animate({opacity:l},f,t.easing),l=1-l;r.animate({opacity:l},f,t.easing),r.queue(function(){o&&r.hide(),n()}),h>1&&c.splice.apply(c,[1,0].concat(c.splice(h,a+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.puff=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"hide"),s=i==="hide",o=parseInt(t.percent,10)||150,u=o/100,a={height:r.height(),width:r.width(),outerHeight:r.outerHeight(),outerWidth:r.outerWidth()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:i,complete:n,percent:s?o:100,from:s?a:{height:a.height*u,width:a.width*u,outerHeight:a.outerHeight*u,outerWidth:a.outerWidth*u}}),r.effect(t)},e.effects.effect.scale=function(t,n){var r=e(this),i=e.extend(!0,{},t),s=e.effects.setMode(r,t.mode||"effect"),o=parseInt(t.percent,10)||(parseInt(t.percent,10)===0?0:s==="hide"?0:100),u=t.direction||"both",a=t.origin,f={height:r.height(),width:r.width(),outerHeight:r.outerHeight(),outerWidth:r.outerWidth()},l={y:u!=="horizontal"?o/100:1,x:u!=="vertical"?o/100:1};i.effect="size",i.queue=!1,i.complete=n,s!=="effect"&&(i.origin=a||["middle","center"],i.restore=!0),i.from=t.from||(s==="show"?{height:0,width:0,outerHeight:0,outerWidth:0}:f),i.to={height:f.height*l.y,width:f.width*l.x,outerHeight:f.outerHeight*l.y,outerWidth:f.outerWidth*l.x},i.fade&&(s==="show"&&(i.from.opacity=0,i.to.opacity=1),s==="hide"&&(i.from.opacity=1,i.to.opacity=0)),r.effect(i)},e.effects.effect.size=function(t,n){var r,i,s,o=e(this),u=["position","top","bottom","left","right","width","height","overflow","opacity"],a=["position","top","bottom","left","right","overflow","opacity"],f=["width","height","overflow"],l=["fontSize"],c=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],h=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=e.effects.setMode(o,t.mode||"effect"),d=t.restore||p!=="effect",v=t.scale||"both",m=t.origin||["middle","center"],g=o.css("position"),y=d?u:a,b={height:0,width:0,outerHeight:0,outerWidth:0};p==="show"&&o.show(),r={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},t.mode==="toggle"&&p==="show"?(o.from=t.to||b,o.to=t.from||r):(o.from=t.from||(p==="show"?b:r),o.to=t.to||(p==="hide"?b:r)),s={from:{y:o.from.height/r.height,x:o.from.width/r.width},to:{y:o.to.height/r.height,x:o.to.width/r.width}};if(v==="box"||v==="both")s.from.y!==s.to.y&&(y=y.concat(c),o.from=e.effects.setTransition(o,c,s.from.y,o.from),o.to=e.effects.setTransition(o,c,s.to.y,o.to)),s.from.x!==s.to.x&&(y=y.concat(h),o.from=e.effects.setTransition(o,h,s.from.x,o.from),o.to=e.effects.setTransition(o,h,s.to.x,o.to));(v==="content"||v==="both")&&s.from.y!==s.to.y&&(y=y.concat(l).concat(f),o.from=e.effects.setTransition(o,l,s.from.y,o.from),o.to=e.effects.setTransition(o,l,s.to.y,o.to)),e.effects.save(o,y),o.show(),e.effects.createWrapper(o),o.css("overflow","hidden").css(o.from),m&&(i=e.effects.getBaseline(m,r),o.from.top=(r.outerHeight-o.outerHeight())*i.y,o.from.left=(r.outerWidth-o.outerWidth())*i.x,o.to.top=(r.outerHeight-o.to.outerHeight)*i.y,o.to.left=(r.outerWidth-o.to.outerWidth)*i.x),o.css(o.from);if(v==="content"||v==="both")c=c.concat(["marginTop","marginBottom"]).concat(l),h=h.concat(["marginLeft","marginRight"]),f=u.concat(c).concat(h),o.find("*[width]").each(function(){var n=e(this),r={height:n.height(),width:n.width(),outerHeight:n.outerHeight(),outerWidth:n.outerWidth()};d&&e.effects.save(n,f),n.from={height:r.height*s.from.y,width:r.width*s.from.x,outerHeight:r.outerHeight*s.from.y,outerWidth:r.outerWidth*s.from.x},n.to={height:r.height*s.to.y,width:r.width*s.to.x,outerHeight:r.height*s.to.y,outerWidth:r.width*s.to.x},s.from.y!==s.to.y&&(n.from=e.effects.setTransition(n,c,s.from.y,n.from),n.to=e.effects.setTransition(n,c,s.to.y,n.to)),s.from.x!==s.to.x&&(n.from=e.effects.setTransition(n,h,s.from.x,n.from),n.to=e.effects.setTransition(n,h,s.to.x,n.to)),n.css(n.from),n.animate(n.to,t.duration,t.easing,function(){d&&e.effects.restore(n,f)})});o.animate(o.to,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){o.to.opacity===0&&o.css("opacity",o.from.opacity),p==="hide"&&o.hide(),e.effects.restore(o,y),d||(g==="static"?o.css({position:"relative",top:o.to.top,left:o.to.left}):e.each(["top","left"],function(e,t){o.css(t,function(t,n){var r=parseInt(n,10),i=e?o.to.left:o.to.top;return n==="auto"?i+"px":r+i+"px"})})),e.effects.removeWrapper(o),n()}})}})(jQuery);(function(e,t){e.effects.effect.shake=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"effect"),o=t.direction||"left",u=t.distance||20,a=t.times||3,f=a*2+1,l=Math.round(t.duration/f),c=o==="up"||o==="down"?"top":"left",h=o==="up"||o==="left",p={},d={},v={},m,g=r.queue(),y=g.length;e.effects.save(r,i),r.show(),e.effects.createWrapper(r),p[c]=(h?"-=":"+=")+u,d[c]=(h?"+=":"-=")+u*2,v[c]=(h?"-=":"+=")+u*2,r.animate(p,l,t.easing);for(m=1;m<a;m++)r.animate(d,l,t.easing).animate(v,l,t.easing);r.animate(d,l,t.easing).animate(p,l/2,t.easing).queue(function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}),y>1&&g.splice.apply(g,[1,0].concat(g.splice(y,f+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.slide=function(t,n){var r=e(this),i=["position","top","bottom","left","right","width","height"],s=e.effects.setMode(r,t.mode||"show"),o=s==="show",u=t.direction||"left",a=u==="up"||u==="down"?"top":"left",f=u==="up"||u==="left",l,c={};e.effects.save(r,i),r.show(),l=t.distance||r[a==="top"?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(r).css({overflow:"hidden"}),o&&r.css(a,f?isNaN(l)?"-"+l:-l:l),c[a]=(o?f?"+=":"-=":f?"-=":"+=")+l,r.animate(c,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.transfer=function(t,n){var r=e(this),i=e(t.to),s=i.css("position")==="fixed",o=e("body"),u=s?o.scrollTop():0,a=s?o.scrollLeft():0,f=i.offset(),l={top:f.top-u,left:f.left-a,height:i.innerHeight(),width:i.innerWidth()},c=r.offset(),h=e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(t.className).css({top:c.top-u,left:c.left-a,height:r.innerHeight(),width:r.innerWidth(),position:s?"fixed":"absolute"}).animate(l,t.duration,t.easing,function(){h.remove(),n()})}})(jQuery);

    (function(e,t,n,r,i,s,o,u,a){function f(){}function l(e){e?H(P,e):l.prefs=P=f.prototype=H({},D);return this}function c(e){return e&&e.getContext?e.getContext("2d"):u}function h(e,t){e.fillStyle=t.fillStyle;e.strokeStyle=t.strokeStyle;e.lineWidth=t.strokeWidth;t.rounded?(e.lineCap="round",e.lineJoin="round"):(e.lineCap=t.strokeCap,e.lineJoin=t.strokeJoin,e.miterLimit=t.miterLimit);e.shadowOffsetX=t.shadowX;e.shadowOffsetY=t.shadowY;e.shadowBlur=t.shadowBlur;e.shadowColor=t.shadowColor;e.globalAlpha=t.opacity;e.globalCompositeOperation=t.compositing;t.imageSmoothing&&(e.webkitimageSmoothingEnabled=e.webkitimageSmoothingEnabled=t.imageSmoothing)}function p(e,t,n){n.closed&&t.closePath();t.fill();"transparent"!==n.fillStyle&&(t.shadowColor="transparent");0!==n.strokeWidth&&t.stroke();n.closed||t.closePath();n._transformed&&t.restore();n.mask&&(n.autosave&&(t.save(),e=y(e),e.transforms.mask=s,e.savedTransforms=H({},e.transforms)),t.clip())}function d(e,t,n){t._toRad=t.inDegrees?j/180:1;e.translate(t.x,t.y);e.rotate(t.rotate*t._toRad);e.translate(-t.x,-t.y);n.rotate+=t.rotate*t._toRad}function v(e,t,n){1!==t.scale&&(t.scaleX=t.scaleY=t.scale);e.translate(t.x,t.y);e.scale(t.scaleX,t.scaleY);e.translate(-t.x,-t.y);n.scaleX*=t.scaleX;n.scaleY*=t.scaleY}function m(e,t,n){t.translate&&(t.translateX=t.translateY=t.translate);e.translate(t.translateX,t.translateY);n.translateX+=t.translateX;n.translateY+=t.translateY}function g(e,t,n,r){t._toRad=t.inDegrees?j/180:1;t._transformed=s;e.save();r===a&&(r=n);!t.fromCenter&&!t._centered&&(t.x+=n/2,t.y+=r/2,t._centered=s);t.rotate&&d(e,t,{});(1!==t.scale||1!==t.scaleX||1!==t.scaleY)&&v(e,t,{});(t.translate||t.translateX||t.translateY)&&m(e,t,{})}function y(t){var n;W.canvas===t&&W._data?n=W._data:(n=e.data(t,"jCanvas"),n||(n={layers:[],intersects:[],drag:{},event:{},transforms:{rotate:0,scaleX:1,scaleY:1,translateX:0,translateY:0,mask:o},animating:o,animated:u},n.savedTransforms=H({},n.transforms),e.data(t,"jCanvas",n)),W.canvas=t,W._data=n);return n}function b(t,n,r){r&&r.visible&&(r.method===e.fn.draw?r.fn.call(t[0],n):r.method&&r.method.call(t,r))}function w(t,n,r,i){var o,u={},c,h;n._args=r;n.canvas=t;if(n.layer&&!n._layer){o=e(t);r=o.getLayers();n.method=!n.method&&n.type?e.fn[z[n.type]]:e.fn[n.method]||i;h=y(t);u=H(new f,n);for(c in l.events)l.events.hasOwnProperty(c)&&u[c]&&(c=N(c),l.events[c](o,h),u._event=s);if(u.draggable||u.cursor){u._event=s;t=["mousedown","mousemove","mouseup"];for(n=0;n<t.length;n+=1)c=N(t[n]),l.events[c](o,h);h.mouseout||(o.bind("mouseout.jCanvas",function(){h.drag={};o.drawLayers()}),h.mouseout=s)}u.layer=s;u._layer=s;u.index===a&&(u.index=r.length);r.splice(u.index,0,u)}return u}function E(e){var t;for(t=0;t<X.length;t+=1)e[X[t]]=e["_"+X[t]]}function S(e,t){var n;for(n=0;n<X.length;n+=1)e["_"+X[n]]=e[X[n]],V[X[n]]=1,t&&delete e[X[n]]}function x(n){var r,s,o=[],u=1;n.match(/^#?\w+$/i)&&("transparent"===n&&(n="rgba(0,0,0,0)"),s=t.head,r=s.style.color,s.style.color=n,n=e.css(s,"color"),s.style.color=r);n.match(/^rgb/i)&&(o=n.match(/\d+/gi),n.match(/%/gi)&&(u=2.55),o[0]*=u,o[1]*=u,o[2]*=u,o[3]=o[3]!==a?i(o[3]):1);return o}function T(e){var t=3,n;"object"!==typeof e.start&&(e.start=x(e.start),e.end=x(e.end));e.now=[];if(1!==e.start[3]||1!==e.end[3])t=4;for(n=0;n<t;n+=1)e.now[n]=e.start[n]+(e.end[n]-e.start[n])*e.pos,3>n&&(e.now[n]=B(e.now[n]));1!==e.start[3]||1!==e.end[3]?e.now="rgba("+e.now.join(",")+")":(e.now.slice(0,3),e.now="rgb("+e.now.join(",")+")");e.elem.nodeName?e.elem.style[e.prop]=e.now:e.elem[e.prop]=e.now}function N(e){"ontouchstart"in window&&R[e]&&(e=R[e]);return e}function C(e){l.events[e]=function(t,n){e=N(e);var r="mouseover"===e||"mouseout"===e?"mousemove":e,i=n.event;n[r]||(t.bind(r+".jCanvas",function(e){i.x=e.offsetX;i.y=e.offsetY;i.type=r;i.event=e;console.log("FIRE");t.drawLayers(s);e.preventDefault()}),n[r]=s)}}function k(e,t,n){var r,i,o,u;n=n._args;n._event&&(e=y(e),r=e.event,t=t.isPointInPath(r.x,r.y),i=e.transforms,n.eventX=n.mouseX=r.x,n.eventY=n.mouseY=r.y,n.event=r.event,u=e.transforms.rotate,r=n.eventX,o=n.eventY,n._eventX=r*I(-u)-o*F(-u),n._eventY=o*I(-u)+r*F(-u),n._eventX/=i.scaleX,n._eventY/=i.scaleY,!t&&n._hovered&&!n._fired&&(n._mousedout=s),t&&e.intersects.push(n))}function L(t){"function"===typeof t&&(t={method:e.fn.draw,fn:t});return t}function A(e,t,n,r,i){t.save();t.beginPath();t.rect(r[0],i[0],r[1]-r[0],i[1]-i[0]);t.clip();g(t,n,0);t.beginPath()}function O(e,t,n){n._event&&k(e,t,n);t.restore();p(e,t,n)}function M(e,t){t.font?e.font=t.font:(isNaN(Number(t.fontSize))||(t.fontSize+="px"),e.font=t.fontStyle+" "+t.fontSize+" "+t.fontFamily)}function _(t,n,r,s,o){var u=/\b(\d*\.?\d*)\w\w\b/gi,a;if(W.text===s.text&&W.font===s.font&&W.fontStyle===s.fontStyle&&W.fontSize===s.fontSize&&W.fontFamily===s.fontFamily&&W.maxWidth===s.maxWidth&&W.lineHeight===s.lineHeight)s.width=W.width,s.height=W.height;else if(!n){s.width=r.measureText(o[0]).width;for(n=1;n<o.length;n+=1)a=r.measureText(o[n]).width,a>s.width&&(s.width=a);r=t.style.fontSize;if(s.font){if(n=s.font.match(u))t.style.fontSize=s.font.match(u)[0]}else t.style.fontSize=s.fontSize;s.height=i(e.css(t,"fontSize"))*o.length*s.lineHeight;t.style.fontSize=r}}var D,P,H=e.extend,B=r.round,j=r.PI,F=r.sin,I=r.cos,q=e.event.fix,R,U,z,W={},X,V;e.fn.jCanvas=l;l.events={};D={align:"center",autosave:s,baseline:"middle",bringToFront:o,ccw:o,closed:o,compositing:"source-over",cornerRadius:0,cropFromCenter:s,disableDrag:o,disableEvents:o,domain:u,draggable:o,data:{},each:u,end:360,fillStyle:"transparent",font:"",fontStyle:"normal",fontSize:"12pt",fontFamily:"sans-serif",fromCenter:s,fn:u,graph:"y",height:u,imageSmoothing:s,inDegrees:s,lineHeight:1,load:u,mask:o,maxWidth:u,miterLimit:10,opacity:1,projection:0,r1:u,r2:u,radius:0,range:u,repeat:"repeat",rotate:0,rounded:o,scale:1,scaleX:1,scaleY:1,shadowBlur:0,shadowColor:"transparent",shadowX:0,shadowY:0,sHeight:u,sides:3,source:"",start:0,strokeCap:"butt",strokeJoin:"miter",strokeStyle:"transparent",strokeWidth:1,sWidth:u,sx:u,sy:u,text:"",translate:0,translateX:0,translateY:0,type:u,visible:s,width:u,x:0,y:0};l();l.extend=function(t){l.defaults=H(D,t.props);l();t.name&&(e.fn[t.name]=function n(e){var r,i,s,o=H(new f,e);for(i=0;i<this.length;i+=1)if(r=this[i],s=c(r))e=w(r,o,e,n),h(s,o),t.fn.call(r,s,o);return this});return e.fn[t.name]};e.fn.getLayers=function(){var e=this[0];return!e||!e.getContext?[]:y(e).layers};e.fn.getLayer=function(t){var n=this.getLayers(),r=e.type(t),i,s;if(t&&t.layer)i=t;else if("number"===r)0>t&&(t=n.length+t),i=n[t];else for(s=0;s<n.length;s+=1)if(n[s].index=s,n[s].name===t||"regexp"===r&&n[s].name.match(t)){i=n[s];break}return i};e.fn.setLayer=function(t,n){var r,i;for(r=0;r<this.length;r+=1)(i=e(this[r]).getLayer(t))&&H(i,n);return this};e.fn.moveLayer=function(t,n){var r,i,s;for(i=0;i<this.length;i+=1)if(r=e(this[i]),s=r.getLayers(),r=r.getLayer(t))s.splice(r.index,1),s.splice(n,0,r),0>n&&(n=s.length+n),r.index=n;return this};e.fn.removeLayer=function(t){var n,r,i;for(r=0;r<this.length;r+=1)n=e(this[r]),i=n.getLayers(),(n=n.getLayer(t))&&i.splice(n.index,1);return this};e.fn.removeLayers=function(){var t,n;for(t=0;t<this.length;t+=1)n=e(this[t]).getLayers(),n.length=0;return this};e.fn.getLayerGroup=function(t){var n=this.getLayers(),r=e.type(t),i=[],s;if("array"===r)return t;for(s=0;s<n.length;s+=1)n[s].index=s,(n[s].group===t||"regexp"===r&&n[s].group.match(t))&&i.push(n[s]);return i};e.fn.setLayerGroup=function(t,n){var r,i,s;for(i=0;i<this.length;i+=1){r=e(this[i]);r=r.getLayerGroup(t);for(s=0;s<r.length;s+=1)H(r[s],n)}return this};e.fn.removeLayerGroup=function(t){var n,r,i=e.type(t),s;if(t!==a)for(r=0;r<this.length;r+=1){n=e(this[r]);n=n.getLayers();for(s=0;s<n.length;s+=1)if(n[s].index=s,n[s].group===t||"regexp"===i&&n[s].group.match(t))n.splice(s,1),s-=1}return this};e.fn.drawLayer=function(t){var n,r,i,s;for(n=0;n<this.length;n+=1)i=e(this[n]),r=c(this[n]),s=i.getLayer(t),b(i,r,s);return this};e.fn.drawLayers=function(t){var n,r,i,a,f,l,h,p,d;for(r=0;r<this.length;r+=1)if(n=e(this[r]),i=c(this[r])){h=y(this[r]);n.clearCanvas();a=h.layers;for(l=0;l<a.length;l+=1)f=a[l],f.index=l,t&&(f._fired=o),f._event=!f.disableEvents,b(n,i,f),f._mousedout&&(f._mousedout=o,f._fired=s,f._hovered=o,f.mouseout&&f.mouseout.call(this[r],f),f.cursor&&f._cursor&&n.css({cursor:f._cursor}));f=h.intersects[h.intersects.length-1]||{};i=h.event;l=i.type;f[l]||U[l]&&(l=U[l]);d=f[l];p=h.drag;if(f._event){if((f.mouseover||f.mouseout||f.cursor)&&!f._hovered&&!f._fired)f._fired=s,f._hovered=s,f.mouseover&&f.mouseover.call(this[r],f),f.cursor&&(f._cursor=n.css("cursor"),n.css({cursor:f.cursor}));d&&!f._fired&&(f._fired=s,d.call(this[r],f),i.type=u);if(f.draggable&&!f.disableDrag&&("mousedown"===l||"touchstart"===l))f.bringToFront&&(a.splice(f.index,1),f.index=a.push(f)),p.layer=f,p.dragging=s,p.startX=f.startX=f.x,p.startY=f.startY=f.y,p.endX=f.endX=f._eventX,p.endY=f.endY=f._eventY,f.dragstart&&f.dragstart.call(this[r],f)}if(p.layer){if(p.dragging&&("mouseup"===l||"touchend"===l))p.layer.dragstop&&p.layer.dragstop.call(this[r],p.layer),h.drag={};if(p.dragging&&("mousemove"===l||"touchmove"===l))p.layer.x=p.layer._eventX-(p.endX-p.startX),p.layer.y=p.layer._eventY-(p.endY-p.startY),p.layer.drag&&p.layer.drag.call(this[r],p.layer)}h.intersects=[]}return this};e.fn.addLayer=function(e){var t,n;e=L(e);var r=H(new f,e);for(t=0;t<this.length;t+=1)if(n=c(this[t]))r.layer=s,e=w(this[t],r,e);return this};X=["width","height","opacity","lineHeight"];V={};e.fn.animateLayer=function(){function t(e,t,n){return function(){E(n);(!t.animating||t.animated===n)&&e.drawLayers();l[4]&&l[4].call(e[0],n);n._animating=o;t.animating=o;t.animated=u}}function n(e,t,n){return function(r,i){E(n);!n._animating&&!t.animating&&(n._animating=s,t.animating=s,t.animated=n);(!t.animating||t.animated===n)&&e.drawLayers();l[5]&&l[5].call(e[0],r,i,n)}}var r,i,f,l=[].slice.call(arguments,0),h;"object"===typeof l[0]&&!l[0].layer&&l.unshift(0);"object"===typeof l[2]?(l.splice(2,0,l[2].duration||u),l.splice(3,0,l[3].easing||u),l.splice(4,0,l[4].complete||u),l.splice(5,0,l[5].step||u)):(l[2]===a?(l.splice(2,0,u),l.splice(3,0,u),l.splice(4,0,u)):"function"===typeof l[2]&&(l.splice(2,0,u),l.splice(3,0,u)),l[3]===a?(l[3]=u,l.splice(4,0,u)):"function"===typeof l[3]&&l.splice(3,0,u));l[1]=H({},l[1]);S(l[1],s);for(i=0;i<this.length;i+=1)if(r=e(this[i]),f=c(this[i]))if(f=y(this[i]),(h=r.getLayer(l[0]))&&h.method!==e.fn.draw)S(h),h.style=V,e(h).animate(l[1],{duration:l[2],easing:e.easing[l[3]]?l[3]:u,complete:t(r,f,h),step:n(r,f,h)});return this};e.fn.animateLayerGroup=function(t){var n,r,i=[].slice.call(arguments,0),s,o;for(r=0;r<this.length;r+=1){n=e(this[r]);s=n.getLayerGroup(t);for(o=0;o<s.length;o+=1)n.animateLayer.apply(n,[s[o]].concat(i.slice(1)))}};e.fn.delayLayer=function(t,n){var r,i;n=n||0;for(r=0;r<this.length;r+=1)i=e(this[r]).getLayer(t),e(i).delay(n);return this};e.fn.delayLayerGroup=function(t,n){var r,i,s,o;n=n||0;for(i=0;i<this.length;i+=1){r=e(this[i]);s=r.getLayerGroup(t);for(o=0;o<s.length;o+=1)r.delayLayer.call(r,s[o],n)}};e.fn.stopLayer=function(t,n){var r,i;for(r=0;r<this.length;r+=1)i=e(this[r]).getLayer(t),e(i).stop(n);return this};e.fn.stopLayerGroup=function(t,n){var r,i,s,o;for(i=0;i<this.length;i+=1){r=e(this[i]);s=r.getLayerGroup(t);for(o=0;o<s.length;o+=1)r.stopLayer.call(r,s[o],n)}};var $="color backgroundColor borderColor borderTopColor borderRightColor borderBottomColor borderLeftColor fillStyle outlineColor strokeStyle shadowColor".split(" "),J;for(J=0;J<$.length;J+=1)e.fx.step[$[J]]=T;R={mousedown:"touchstart",mouseup:"touchend",mousemove:"touchmove"};U={touchstart:"mousedown",touchend:"mouseup",touchmove:"mousemove"};C("click");C("dblclick");C("mousedown");C("mouseup");C("mousemove");C("mouseover");C("mouseout");C("touchstart");C("touchmove");C("touchend");e.event.fix=function(t){var n,r;t=q.call(e.event,t);if(n=t.originalEvent)if(r=n.changedTouches,t.pageX!==a&&t.offsetX===a){if(n=e(t.target).offset())t.offsetX=t.pageX-n.left,t.offsetY=t.pageY-n.top}else if(r&&(n=e(n.target).offset()))t.offsetX=r[0].pageX-n.left,t.offsetY=r[0].pageY-n.top;return t};z={arc:"drawArc",bezier:"drawBezier",circle:"drawArc",ellipse:"drawEllipse","function":"draw",image:"drawImage",line:"drawLine",polygon:"drawPolygon",quadratic:"drawQuadratic",rectangle:"drawRect",text:"drawText",vector:"drawVector"};e.fn.draw=function K(e){var t,n;e=L(e);var r=H(new f,e);for(t=0;t<this.length;t+=1)if((n=c(this[t]))&&r.fn)e=w(this[t],r,e,K),r.visible&&r.fn.call(this[t],n);return this};e.fn.clearCanvas=function(e){var t,n=H(new f,e);for(e=0;e<this.length;e+=1)if(t=c(this[e]))t.setTransform(1,0,0,1,0,0),!n.x||!n.y||!n.width||!n.height?t.clearRect(0,0,this[e].width,this[e].height):t.clearRect(n.x-n.width/2,n.y-n.height/2,n.width,n.height),t.restore();return this};e.fn.saveCanvas=function(){var e,t,n;for(e=0;e<this.length;e+=1)if(t=c(this[e]))n=y(this[e]),t.save(),n.savedTransforms=H({},n.transforms);return this};e.fn.restoreCanvas=function(){var e,t,n;for(e=0;e<this.length;e+=1)if(t=c(this[e]))n=y(this[e]),t.restore(),n.transforms=H({},n.savedTransforms);return this};e.fn.restoreCanvasOnRedraw=function(t){var n={layer:s,fn:function(){e(this).restoreCanvas()}};H(n,t);return this.draw(n)};e.fn.translateCanvas=function(e){var t,n=H(new f,e),r;for(e=0;e<this.length;e+=1)if(t=c(this[e]))r=y(this[e]),n.autosave&&t.save(),m(t,n,r.transforms);return this};e.fn.scaleCanvas=function(e){var t,n=H(new f,e),r;for(e=0;e<this.length;e+=1)if(t=c(this[e]))r=y(this[e]),n.autosave&&t.save(),v(t,n,r.transforms);return this};e.fn.rotateCanvas=function(e){var t,n=H(new f,e),r;for(e=0;e<this.length;e+=1)if(t=c(this[e]))r=y(this[e]),n.autosave&&t.save(),d(t,n,r.transforms);return this};e.fn.drawRect=function Q(e){var t,n,r=H(new f,e),i,u,a,l,d;for(t=0;t<this.length;t+=1)if(n=c(this[t]))e=w(this[t],r,e,Q),r.visible&&(h(n,r),g(n,r,r.width,r.height),n.beginPath(),i=r.x-r.width/2,u=r.y-r.height/2,(d=r.cornerRadius)?(r.closed=s,a=r.x+r.width/2,l=r.y+r.height/2,0>a-i-2*d&&(d=(a-i)/2),0>l-u-2*d&&(d=(l-u)/2),n.moveTo(i+d,u),n.lineTo(a-d,u),n.arc(a-d,u+d,d,3*j/2,2*j,o),n.lineTo(a,l-d),n.arc(a-d,l-d,d,0,j/2,o),n.lineTo(i+d,l),n.arc(i+d,l-d,d,j/2,j,o),n.lineTo(i,u+d),n.arc(i+d,u+d,d,j,3*j/2,o)):n.rect(i,u,r.width,r.height),r._event&&k(this[t],n,r),p(this[t],n,r));return this};e.fn.drawArc=function G(e){var t,n,r=H(new f,e);e=e||{};!r.inDegrees&&360===r.end&&(e.end=r.end=2*j);for(t=0;t<this.length;t+=1)if(n=c(this[t]))e=w(this[t],r,e,G),r.visible&&(h(n,r),g(n,r,2*r.radius),n.beginPath(),n.arc(r.x,r.y,r.radius,r.start*r._toRad-j/2,r.end*r._toRad-j/2,r.ccw),r._event&&k(this[t],n,r),p(this[t],n,r));return this};e.fn.drawEllipse=function Y(e){var t,n,r=H(new f,e),i=4*r.width/3,o=r.height;r.closed=s;for(t=0;t<this.length;t+=1)if(n=c(this[t]))e=w(this[t],r,e,Y),r.visible&&(h(n,r),g(n,r,r.width,r.height),n.beginPath(),n.moveTo(r.x,r.y-o/2),n.bezierCurveTo(r.x-i/2,r.y-o/2,r.x-i/2,r.y+o/2,r.x,r.y+o/2),n.bezierCurveTo(r.x+i/2,r.y+o/2,r.x+i/2,r.y-o/2,r.x,r.y-o/2),r._event&&k(this[t],n,r),p(this[t],n,r));return this};e.fn.drawPolygon=function Z(e){var t,n,r=H(new f,e),i=2*j/r.sides,o=j/r.sides,u=o+j/2,a=r.radius*I(i/2),l,d,v;r.closed=s;for(t=0;t<this.length;t+=1)if(n=c(this[t]))if(e=w(this[t],r,e,Z),r.visible){h(n,r);g(n,r,2*r.radius);n.beginPath();for(v=0;v<r.sides;v+=1)l=r.x+B(r.radius*I(u)),d=r.y+B(r.radius*F(u)),n.lineTo(l,d),r.projection&&(l=r.x+B((a+a*r.projection)*I(u+o)),d=r.y+B((a+a*r.projection)*F(u+o)),n.lineTo(l,d)),u+=i;r._event&&k(this[t],n,r);p(this[t],n,r)}return this};e.fn.drawLine=function et(e){var t,n,r=H(new f,e),i,o,u;for(t=0;t<this.length;t+=1)if(n=c(this[t]))if(e=w(this[t],r,e,et),r.visible){h(n,r);g(n,r,0);i=1;for(n.beginPath();s;)if(o=r["x"+i],u=r["y"+i],o!==a&&u!==a)n.lineTo(o+r.x,u+r.y),i+=1;else break;r._event&&k(this[t],n,r);p(this[t],n,r)}return this};e.fn.drawQuadratic=e.fn.drawQuad=function tt(e){var t,n,r=H(new f,e),i,o,u,l,d;for(t=0;t<this.length;t+=1)if(n=c(this[t]))if(e=w(this[t],r,e,tt),r.visible){h(n,r);g(n,r,0);i=2;n.beginPath();for(n.moveTo(r.x1+r.x,r.y1+r.y);s;)if(o=r["x"+i],u=r["y"+i],l=r["cx"+(i-1)],d=r["cy"+(i-1)],o!==a&&u!==a&&l!==a&&d!==a)n.quadraticCurveTo(l+r.x,d+r.y,o+r.x,u+r.y),i+=1;else break;r._event&&k(this[t],n,r);p(this[t],n,r)}return this};e.fn.drawBezier=function nt(e){var t,n,r=H(new f,e),i,o,u,l,d,v,m,y;for(t=0;t<this.length;t+=1)if(n=c(this[t]))if(e=w(this[t],r,e,nt),r.visible){h(n,r);g(n,r,0);i=2;o=1;n.beginPath();for(n.moveTo(r.x1+r.x,r.y1+r.y);s;)if(u=r["x"+i],l=r["y"+i],d=r["cx"+o],v=r["cy"+o],m=r["cx"+(o+1)],y=r["cy"+(o+1)],u!==a&&l!==a&&d!==a&&v!==a&&m!==a&&y!==a)n.bezierCurveTo(d+r.x,v+r.y,m+r.x,y+r.y,u+r.x,l+r.y),i+=1,o+=2;else break;r._event&&k(this[t],n,r);p(this[t],n,r)}return this};e.fn.drawVector=function rt(e){var t,n,i=H(new f,e),o,u,l,d,v;for(t=0;t<this.length;t+=1)if(n=c(this[t]))if(e=w(this[t],i,e,rt),i.visible){h(n,i);g(n,i,0);o=1;n.beginPath();d=i.x;v=i.y;for(n.moveTo(i.x,i.y);s;)if(u=i["a"+o],l=i["l"+o],u!==a&&l!==a)u=u*i._toRad-j/2,d+=l*r.cos(u),v+=l*r.sin(u),n.lineTo(d,v),o+=1;else break;i._event&&k(this[t],n,i);p(this[t],n,i)}return this};e.fn.drawGraph=function it(e){var t,n,r=H(new f,e),i,s,o,a,l;for(t=0;t<this.length;t+=1)if((n=c(this[t]))&&r.fn)if(e=w(this[t],r,e,it),r.visible){h(n,r);i=r.graph;s=r.domain;o=r.range;a=this[t].width;l=this[t].height;s===u&&(s=[u,u]);s[0]===u&&(s[0]=0);s[1]===u&&(s[1]=a);o===u&&(o=[u,u]);o[0]===u&&(o[0]=0);o[1]===u&&(o[1]=l);A(t,n,r,s,o);if("y"===i)for(i=s[0]-r.x;i<=s[1]-r.x;i+=1)l=r.fn(i,r),l===u?(O(this[t],n,r),A(t,n,r,s,o)):n.lineTo(i+r.x,l+r.y);else if("x"===i)for(l=o[0]-r.y;l<=o[1]-r.y;l+=1)i=r.fn(l,r),i===u?(O(this[t],n,r),A(t,n,r,s,o)):n.lineTo(i+r.x,l+r.y);else if("r"===i)for(a=0;a<2*j;a+=j/180)l=r.fn(a,r),i=l*I(a),l*=F(a),i===u||l===u?(O(this[t],n,r),A(n,r,s,o)):n.lineTo(i+r.x,l+r.y);O(this[t],n,r)}};e.fn.drawText=function st(t){var n,r,i=H(new f,t),s,o,a,l;for(n=0;n<this.length;n+=1)if(e(this[n]),r=c(this[n]))if(t=w(this[n],i,t,st),i.visible){h(r,i);r.textBaseline=i.baseline;r.textAlign=i.align;M(r,i);if(!n&&i.maxWidth!==u){s=r;o=i.text;l=i.maxWidth;var p=o.split(" "),d=void 0,v=[],m="";if(s.measureText(o).width<l||1===p.length)v=[o];else{for(d=0;d<p.length;d+=1)s.measureText(m+p[d]).width>l&&(""!==m&&v.push(m),m=""),m+=p[d],d!==p.length-1&&(m+=" ");v.push(m)}s=v;s=s.join("\n").replace(/( (\n))|( $)/gi,"$2").split("\n")}else n||(s=String(i.text).split("\n"));_(this[n],n,r,i,s);g(r,i,i.width,i.height);n||(a=i.x,"left"===i.align?a-=i.width/2:"right"===i.align&&(a+=i.width/2));for(o=0;o<s.length;o+=1)r.shadowColor=i.shadowColor,l=i.y+o*i.height/s.length-(s.length-1)*i.height/s.length/2,r.fillText(s[o],a,l),"transparent"!==i.fillStyle&&(r.shadowColor="transparent"),r.strokeText(s[o],a,l);i._event?(r.beginPath(),r.rect(i.x-i.width/2,i.y-i.height/2,i.width,i.height),r.restore(),k(this[n],r,i),r.closePath()):r.restore()}W=i;return this};e.fn.measureText=function(e){var t;t=e!==a&&("object"!==typeof e||e.layer)?this.getLayer(e):H(new f,e);if((e=c(this[0]))&&t.text!==a)M(e,t),_(this[0],0,e,t,t.text.split("\n"));return t};e.fn.drawImage=function ot(e){function t(t,n,i){return function(){0===n&&(v=l.width/l.height,a.width===u&&a.sWidth===u&&(e.width=a.width=a.sWidth=l.width),a.height===u&&a.sHeight===u&&(e.height=a.height=a.sHeight=l.height),a.width===u&&a.sWidth!==u&&(a.width=a.sWidth),a.height===u&&a.sHeight!==u&&(a.height=a.sHeight),a.sWidth===u&&a.width!==u&&(e.sWidth=a.sWidth=l.width),a.sHeight===u&&a.height!==u&&(e.sHeight=a.sHeight=l.height),a.sx===u&&(a.sx=a.cropFromCenter?l.width/2:0),a.sy===u&&(a.sy=a.cropFromCenter?l.height/2:0),a.cropFromCenter||(a.sx+=a.sWidth/2,a.sy+=a.sHeight/2),a.sx+a.sWidth/2>l.width&&(a.sx=l.width-a.sWidth/2),0>a.sx-a.sWidth/2&&(a.sx=a.sWidth/2),0>a.sy-a.sHeight/2&&(a.sy=a.sHeight/2),a.sy+a.sHeight/2>l.height&&(a.sy=l.height-a.sHeight/2),a.width!==u&&a.height===u?e.height=a.height=a.width/v:a.width===u&&a.height!==u?e.width=a.width=a.height*v:a.width===u&&a.height===u&&(e.width=a.width=l.width,e.height=a.height=l.height));g(i,a,a.width,a.height);i.drawImage(l,a.sx-a.sWidth/2,a.sy-a.sHeight/2,a.sWidth,a.sHeight,a.x-a.width/2,a.y-a.height/2,a.width,a.height);i.fillStyle="transparent";i.beginPath();i.rect(a.x-a.width/2,a.y-a.height/2,a.width,a.height);a._event&&k(r[n],i,a);p(r[n],i,a);a.load&&a.load.call(t,e)}}var r=this,i,s,o,a=H(new f,e),l,d,v;i=a.source;d=i.getContext;i.src||d?l=i:i&&(l=new n,l.src=i);for(s=0;s<r.length;s+=1)if(i=r[s],o=c(r[s]))e=w(r[s],a,e,ot),a.visible&&(h(o,a),l&&(l.complete||d?t(i,s,o)():(l.onload=t(i,s,o),l.src=l.src)));return r};e.fn.createPattern=e.fn.pattern=function(e){function r(){l=s.createPattern(a,o.repeat);o.load&&o.load.call(i[0],l)}var i=this,s,o=H(new f,e),a,l,h;(s=c(i[0]))?(h=o.source,"function"===typeof h?(a=t.createElement("canvas"),a.width=o.width,a.height=o.height,e=c(a),h.call(a,e),r()):(e=h.getContext,h.src||e?a=h:(a=new n,a.src=h),a.complete||e?r():(a.onload=r,a.src=a.src))):l=u;return l};e.fn.createGradient=e.fn.gradient=function(e){var t;e=H(new f,e);var n=[],r,i,s,o,l,h,p;if(t=c(this[0])){e.x1=e.x1||0;e.y1=e.y1||0;e.x2=e.x2||0;e.y2=e.y2||0;t=e.r1!==u||e.r2!==u?t.createRadialGradient(e.x1,e.y1,e.r1,e.x2,e.y2,e.r2):t.createLinearGradient(e.x1,e.y1,e.x2,e.y2);for(o=1;e["c"+o]!==a;o+=1)e["s"+o]!==a?n.push(e["s"+o]):n.push(u);r=n.length;n[0]===u&&(n[0]=0);n[r-1]===u&&(n[r-1]=1);for(o=0;o<r;o+=1){if(n[o]!==u){h=1;p=0;i=n[o];for(l=o+1;l<r;l+=1)if(n[l]!==u){s=n[l];break}else h+=1;i>s&&(n[l]=n[o])}else n[o]===u&&(p+=1,n[o]=i+p*((s-i)/h));t.addColorStop(n[o],e["c"+(o+1)])}}else t=u;return t};e.fn.setPixels=function ut(e){var t,n,r,i=H(new f,e),s={},o,u,a,l;for(n=0;n<this.length;n+=1)if(t=this[n],r=c(t)){e=w(t,i,e,ut);g(r,i,i.width,i.height);if(!i.x||!i.y||!i.width||!i.height)i.width=t.width,i.height=t.height,i.x=i.width/2,i.y=i.height/2;o=r.getImageData(i.x-i.width/2,i.y-i.height/2,i.width,i.height);u=o.data;l=u.length;s=[];if(i.each)for(a=0;a<l;a+=4)s.r=u[a],s.g=u[a+1],s.b=u[a+2],s.a=u[a+3],i.each.call(t,s),u[a]=s.r,u[a+1]=s.g,u[a+2]=s.b,u[a+3]=s.a;r.putImageData(o,i.x-i.width/2,i.y-i.height/2);r.restore()}return this};e.fn.getCanvasImage=function(e,t){var n=this[0];t===a&&(t=1);return n&&n.toDataURL?n.toDataURL("image/"+e,t):u};e.support.canvas=t.createElement("canvas").getContext!==a;l.defaults=D;l.detectEvents=k;l.closePath=p;e.jCanvas=l})(jQuery,document,Image,Math,parseFloat,!0,!1,null)

	var draggable = $.ui.dialog.prototype._makeDraggable;
    $.ui.dialog.prototype._makeDraggable = function() 
    { 
        draggable.apply(this,arguments);
        this.uiDialog.draggable(
            {
                containment: false
            }
        );
    };

    var fClosable = function(self)
    {
        if (self.options.closable === true) 
        {
            var unclosable_lis = $('li:has(a[href])', self.element.children("ul")).filter(function() 
                {
                    return $('span.ui-icon-circle-close', this).length === 0;
                }
            );
            unclosable_lis.each(function(li)
            {
                if($(this).find("a:first").attr("href") != "#MMHKPLUS_ChatTab_MMHK_Alliance")
                    $(this)
                        .append('<a href="#"><span class="ui-icon ui-icon-circle-close"></span></a>')
                        .find('a:last')
                            .hover(
                                function() 
                                {
                                    $(this).css('cursor', 'pointer');
                                },
                                function() 
                                {
                                    $(this).css('cursor', 'default');
                                }
                            )
                            .click(function() 
                                {
                                    var index = $('li:has(a[href])', self.element.children("ul")).index($(this).parent());
                                    if (index > -1) 
                                    {
                                        if (false === self._trigger("closableClick", null, self._ui( $($('li:has(a[href])', self.element.children("ul"))[index]).find( "a" )[ 0 ], self.panels[index] ))) return;

                                        self.remove(index);
                                    }
                                    return false;
                                }
                            )
                        .end();
            });
        }
    };
    
    (function() 
    {
        var ui_tabs_create = $.ui.tabs.prototype._create;
        var ui_tabs_add = $.ui.tabs.prototype.add;
		var ui_tabs_refresh = $.ui.tabs.prototype.refresh;
        $.extend($.ui.tabs.prototype, 
        {
            _create: function()
            {
                var self = this;
                ui_tabs_create.apply(this, arguments);
                
                fClosable(self);
            }
        });
        
        $.extend($.ui.tabs.prototype, 
        {
            add: function()
            {
                var self = this;
                ui_tabs_add.apply(this, arguments);
                
                fClosable(self);
            }
        });
		
		$.extend($.ui.tabs.prototype, 
        {
            refresh: function()
            {
                var self = this;
                ui_tabs_refresh.apply(this, arguments);
                
                fClosable(self);
            }
        });
    })(jQuery);
    
    (function( $ ) {
        $.widget( "ui.combobox", {
            width : function(w)
            {
                console.log("here");
                input.css({width : w + "px"});
            },
            _create: function() {
                var input,
                    that = this,
                    select = this.element.hide(),
                    selected = select.children( ":selected" ),
                    value = selected.val() ? selected.text() : "",
                    wrapper = this.wrapper = $( "<span>" )
                        .addClass( "ui-combobox" )
                        .insertAfter( select );

                function removeIfInvalid(element) {
                    var value = $( element ).val(),
                        matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( value ) + "$", "i" ),
                        valid = false;
                    select.children( "option" ).each(function() {
                        if ( $( this ).text().match( matcher ) ) {
                            this.selected = valid = true;
                            return false;
                        }
                    });
                    if ( !valid ) {
                        // remove invalid value, as it didn't match anything
                        $( element )
                            .val( "" )
                            .attr( "title", value + " didn't match any item" )
                            .tooltip( "open" );
                        select.val( "" );
                        setTimeout(function() {
                            input.tooltip( "close" ).attr( "title", "" );
                        }, 2500 );
                        input.data( "autocomplete" ).term = "";
                        return false;
                    }
                }

                input = $( "<input>" ).prop("disabled", true)
                    .css({"z-index" : "100001"})
                    .appendTo( wrapper )
                    .val( value )
                    .attr( "title", "" )
                    .addClass( "ui-state-default ui-combobox-input" )
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: function( request, response ) {
                            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
                            response( select.children( "option" ).map(function() {
                                var text = $( this ).text();
                                if ( this.value && ( !request.term || matcher.test(text) ) )
                                    return {
                                        label: text.replace(
                                            new RegExp(
                                                "(?![^&;]+;)(?!<[^<>]*)(" +
                                                $.ui.autocomplete.escapeRegex(request.term) +
                                                ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                            ), "<strong>$1</strong>" ),
                                        value: text,
                                        option: this
                                    };
                            }) );
                        },
                        select: function( event, ui ) {
                            ui.item.option.selected = true;
                            that._trigger( "selected", event, {
                                item: ui.item.option
                            });
                        },
                        change: function( event, ui ) {
                            if ( !ui.item )
                                return removeIfInvalid( this );
                        }
                    })
                    .addClass( "ui-widget ui-widget-content ui-corner-left" );

                input.data( "autocomplete" )._renderItem = function( ul, item ) {
                    return $( "<li>" )
                        .data( "item.autocomplete", item )
                        .append( "<a>" + item.label + "</a>" )
                        .appendTo( ul );
                };

                $( "<a>" )
                    .attr( "tabIndex", -1 )
                    .attr( "title", "DÃ©rouler" )
                    .tooltip()
                    .appendTo( wrapper )
                    .button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: false
                    })
                    .removeClass( "ui-corner-all" )
                    .addClass( "ui-corner-right ui-combobox-toggle" )
                    .click(function() {
                        // close if already visible
                        if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                            input.autocomplete( "close" );
                            removeIfInvalid( input );
                            return;
                        }

                        // work around a bug (likely same cause as #5265)
                        $( this ).blur();

                        // pass empty string as value to search for, displaying all results
                        input.autocomplete( "search", "" );
                        input.focus();
                    });

                    input
                        .tooltip({
                            position: {
                                of: this.button
                            },
                            tooltipClass: "ui-state-highlight"
                        });
            },

            destroy: function() {
                this.wrapper.remove();
                this.element.show();
                $.Widget.prototype.destroy.call( this );
            }
        });
    })( jQuery );
    	
    if(window.jQuery === window.$)
    {
        window.jQuery.noConflict();
    }
    $ = window.jQuery; 
    
    return {
        jquery : window.jQuery
    }
})();
realWindow.jQuery = JQuery.jquery;

(function(window, $) {

Array.prototype.remove = function (value) {
	for (var i = 0; i < this.length; ) 
	{
		if (this[i] === value) 
		{
			this.splice(i, 1);
		} 
		else 
		{
		   ++i;
		}
	}
};

Array.prototype.filter = function (d, f) {
	var c = [];
	for (var b = 0, a = this.length; b < a; b++) {
		if (d.call(f, this[b], b, this)) {
			c.push(this[b]);
		}
	}
	return c;
};

Array.prototype.map = function (d, f) {
	var c = [];
	for (var b = 0, a = this.length; b < a; b++) {
		c[b] = d.call(f, this[b], b, this);
	}
	return c;
};

Array.prototype.every = function (c, d) {
	for (var b = 0, a = this.length; b < a; b++) {
		if (!c.call(d, this[b], b, this)) {
			return false;
		}
	}
	return true;
};

Array.prototype.some = function (c, d) {
	for (var b = 0, a = this.length; b < a; b++) {
		if (c.call(d, this[b], b, this)) {
			return true;
		}
	}
	return false;
};

Array.prototype.indexOf = function (c, d) {
	var a = this.length;
	for (var b = (d < 0) ? Math.max(0, a + d) : d || 0; b < a; b++) {
		if (this[b] === c) {
			return b;
		}
	}
	return -1;
};

Array.prototype.copy = function (d, c) {
	d = d || 0;
	if (d < 0) {
		d = this.length + d;
	}
	c = c || (this.length - d);
	var a = [];
	for (var b = 0; b < c; b++) {
		a[b] = this[d++];
	}
	return a;
};

Array.prototype.contains = function (a, b) {
	return this.indexOf(a, b) != -1;
};

Array.prototype.associate = function (c) {
	var d = {}, b = Math.min(this.length, c.length);
	for (var a = 0; a < b; a++) {
		d[c[a]] = this[a];
	}
	return d;
};

Array.prototype.extend = function (c) {
	for (var b = 0, a = c.length; b < a; b++) {
		this.push(c[b]);
	}
	return this;
};

Array.prototype.merge = function (c) {
	for (var b = 0, a = c.length; b < a; b++) {
		this.include(c[b]);
	}
	return this;
};

Array.prototype.include = function (a) {
	if (!this.contains(a)) {
		this.push(a);
	}
	return this;
};

Array.prototype.getRandom = function () {
	return this[$random(0, this.length - 1)] || null;
};

Array.prototype.getLast = function () {
	return this[this.length - 1] || null;
};

Array.prototype.each = Array.prototype.forEach;

Array.each = Array.forEach;

function blink(selector){
    window.jQuery(selector).fadeOut('slow', function(){
        window.jQuery(this).fadeIn('slow', function(){
            blink(this);
        });
    });
};

Date.prototype.toHoursMinFormat = function()
{
	var hours = this.getHours();
	var minutes = this.getMinutes();
	var output = "";
	if (hours < 10)
	{
		output += "0";
	}
	output += hours + ":";
	if (minutes < 10)
	{
		output += "0";
	}
	output += minutes;
	return output;
};

Date.prototype.toHoursMinSecFormat = function()
{
    var hours = this.getHours();
    var minutes = this.getMinutes();
    var seconds = this.getSeconds();
    var output = "";
    if (hours < 10)
    {
        output += "0";
    }
    output += hours + ":";
    if (minutes < 10)
    {
        output += "0";
    }
    output += minutes + ":";
    if (seconds < 10)
    {
        output += "0";
    }
    output += seconds;
    return output;
};

var defaultDiacriticsRemovalMap = [
    {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
    {'base':'AA','letters':/[\uA732]/g},
    {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
    {'base':'AO','letters':/[\uA734]/g},
    {'base':'AU','letters':/[\uA736]/g},
    {'base':'AV','letters':/[\uA738\uA73A]/g},
    {'base':'AY','letters':/[\uA73C]/g},
    {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
    {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
    {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
    {'base':'DZ','letters':/[\u01F1\u01C4]/g},
    {'base':'Dz','letters':/[\u01F2\u01C5]/g},
    {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
    {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
    {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
    {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
    {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
    {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
    {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
    {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
    {'base':'LJ','letters':/[\u01C7]/g},
    {'base':'Lj','letters':/[\u01C8]/g},
    {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
    {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
    {'base':'NJ','letters':/[\u01CA]/g},
    {'base':'Nj','letters':/[\u01CB]/g},
    {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
    {'base':'OI','letters':/[\u01A2]/g},
    {'base':'OO','letters':/[\uA74E]/g},
    {'base':'OU','letters':/[\u0222]/g},
    {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
    {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
    {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
    {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
    {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
    {'base':'TZ','letters':/[\uA728]/g},
    {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
    {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
    {'base':'VY','letters':/[\uA760]/g},
    {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
    {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
    {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
    {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
    {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
    {'base':'aa','letters':/[\uA733]/g},
    {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
    {'base':'ao','letters':/[\uA735]/g},
    {'base':'au','letters':/[\uA737]/g},
    {'base':'av','letters':/[\uA739\uA73B]/g},
    {'base':'ay','letters':/[\uA73D]/g},
    {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
    {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
    {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
    {'base':'dz','letters':/[\u01F3\u01C6]/g},
    {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
    {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
    {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
    {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
    {'base':'hv','letters':/[\u0195]/g},
    {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
    {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
    {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
    {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
    {'base':'lj','letters':/[\u01C9]/g},
    {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
    {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
    {'base':'nj','letters':/[\u01CC]/g},
    {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
    {'base':'oi','letters':/[\u01A3]/g},
    {'base':'ou','letters':/[\u0223]/g},
    {'base':'oo','letters':/[\uA74F]/g},
    {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
    {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
    {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
    {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
    {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
    {'base':'tz','letters':/[\uA729]/g},
    {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
    {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
    {'base':'vy','letters':/[\uA761]/g},
    {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
    {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
    {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
    {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
];
var changes;
function removeDiacritics (str) {
    if(!changes) {
        changes = defaultDiacriticsRemovalMap;
    }
    for(var i=0; i<changes.length; i++) {
        str = str.replace(changes[i].letters, changes[i].base);
    }
    return str;
};

Date.prototype.toShortFrenchFormat = function()
{
	var date = this.getDate();
	var month = this.getMonth()+1;
	var hours = this.getHours();
	var minutes = this.getMinutes();
	var seconds = this.getSeconds();
	if (date < 10)
	{
		date = "0" + date;
	}
	if (month < 10)
	{
		month = "0" + month;
	}
	var output = "";
	if(MMHKPLUS.locale == "fr")
	{
		output += date + "/" ;
		output += month + "/" + this.getFullYear() + " ";
	}
	else
	{
		output += month + "/" ;
		output += date + "/" + this.getFullYear() + " ";
	}
	if (hours < 10)
	{
		output += "0";
	}
	output += hours + MMHKPLUS.localize("HOUR_SMALL");
	if (minutes < 10)
	{
		output += "0";
	}
	output += minutes + MMHKPLUS.localize("MINUTE_SMALL");
	if (seconds < 10)
	{
		output += "0";
	}
	output += seconds + MMHKPLUS.localize("SECOND_SMALL");
	return output;
};

Date.prototype.countDown = function()
{
	var hours = parseInt(this.getTime() / 1000 / 3600);
	var minutes = parseInt(((this.getTime() / 1000 / 3600) % 1) * 60);
	var seconds = parseInt((this.getTime() / 1000) % 60);
	var output = "";
	if (hours < 10)
	{
		output += "0";
	}
	output += hours + MMHKPLUS.localize("HOUR_SMALL");
	if (minutes < 10)
	{
		output += "0";
	}
	output += minutes + MMHKPLUS.localize("MINUTE_SMALL");
	if (seconds < 10)
	{
		output += "0";
	}
	output += seconds + MMHKPLUS.localize("SECOND_SMALL");
	return output;
};

Date.prototype.longCountDown = function()
{
	var days = parseInt(this.getTime() / 1000 / 3600 / 24);
	var hours = parseInt(this.getTime() / 1000 / 3600) - (days * 24);
	var minutes = parseInt(((this.getTime() / 1000 / 3600) % 1) * 60);
	var seconds = parseInt((this.getTime() / 1000) % 60);
	var output = days + MMHKPLUS.localize("DAY_SMALL");
	if (hours < 10)
	{
		output += "0";
	}
	output += hours + MMHKPLUS.localize("HOUR_SMALL");
	if (minutes < 10)
	{
		output += "0";
	}
	output += minutes + MMHKPLUS.localize("MINUTE_SMALL");
	if (seconds < 10)
	{
		output += "0";
	}
	output += seconds + MMHKPLUS.localize("SECOND_SMALL");
	return output;
};

var injectAfter = function(origine, addon)
{
	return function()
	{
		var arg = Array.prototype.slice.call(arguments, 0);
		arg.unshift(origine.apply(this, arguments));
		return addon.apply(this, arg);
	};
};

var formatNumber = function(nStr) 
{
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) 
	{
		x1 = x1.replace(rgx, '$1' + (MMHKPLUS.locale == "fr" ? " " : ",") + '$2');
	}
	return x1 + x2;
};

var getColor = function(colorId)
{
	if(colorId == -1 || colorId > 21)
	{
		return "#FFFFFF";
	}
	var colors = 
		[
			"#FF5900", "#FF8900", "#FFC000", "#FADB01", "#DDDD00", "#BAF809", "#80E410",
			"#4CCF1A", "#00BE64", "#00CF90", "#00E0F5", "#00BCEB", "#0097E1", "#005DBF",
			"#002AA2", "#100493", "#4901A0", "#6100A6", "#8A00B3", "#B300C0", "#F800BD",
			"#FF0017"
		];
	return colors[colorId];
};

var isDefined = function(variable)
{
	return (typeof variable != 'undefined' && variable != null);
};

var hasProperty = function(object, property)
{
	return (object && object.hasOwnProperty(property) && object[property] != undefined && object[property] != null);
};

var destroy = function(object)
{
	if(typeof object == "array")
	{
		object.forEach(function(item)
			{
				destroy(item);
			}
		);
		delete object;
	}
	else if(typeof object == "object")
	{
		for(var i in object)
		{
			destroy(object[i]);
		}
		delete object;
	}
};

var showHideOnMouse = function($elem, $ref)
{
	$ref.mouseleave(function()
		{
			$elem.toggleClass("hidden");
		}
	);
	$ref.mouseenter(function()
		{
			$elem.toggleClass("hidden");
		}
	);
};

if (typeof Object.create !== "function") 
{
	Object.create = function (o) 
	{
		function F() {}
		F.prototype = o;
		return new F();
	};
}
var MMHKPLUS = {};
MMHKPLUS.version = "3.1.5";
MMHKPLUS.contact = "aendawyn@gmail.com";
MMHKPLUS.HOMMK = window.HOMMK;
MMHKPLUS.locale = "fr";
MMHKPLUS.URL = "http://www.mmhk-plus.eu";

MMHKPLUS.URL_JACTARI = "http://jactari.mmhk-plus.eu";
MMHKPLUS.URL_IMAGES = MMHKPLUS.URL + "/script/images/";
MMHKPLUS.URL_PHP = MMHKPLUS.URL + "/script/php/";

MMHKPLUS.elementPool = {};
MMHKPLUS.resources = [ "GOLD", "WOOD", "ORE", "MERCURY", "CRYSTAL", "SULFUR", "GEM" ];
MMHKPLUS.factions = [ "ACADEMY", "HAVEN", "INFERNO", "NECROPOLIS", "SYLVAN", "DUNGEON", "DWELLING", "NEUTRAL", "FORTRESS", "COMMON"];

MMHKPLUS.translations = {
	// Commun
	DAY :			{fr : "Jour", en : "Day", ru : "День"},
	HOUR :			{fr : "Heure", en : "Hour", ru : "Час"},
	MINUTE :		{fr : "Minute", en : "Minute", ru : "Минута"},
	SECONDE :		{fr : "Seconde", en : "Second", ru : "Секунда"},
	DAY_SMALL :		{fr : "j", en : "d", ru : "д"},
	HOUR_SMALL :	{fr : "h", en : "h", ru : "ч"},
	MINUTE_SMALL :	{fr : "m", en : "m", ru : "м"},
	SECOND_SMALL :	{fr : "s", en : "s", ru : "с"},
    YES:            {fr : "Oui", en : "Yes", ru : "Да"},
    NO:             {fr : "Non", en : "No", ru : "Нет"},
    CLOSE:          {fr : "Fermer", en : "Close", ru : "Закрыть"},
    DOWNLOAD:       {fr : "Téléchargement", en : "Download", ru : "Загрузка"},
    RUIN :          {fr : "Ruine", en : "Ruin", ru : "Поломка скрипта"},

    // Update
    UPDATE_TITLE :  {fr : "Mise à jour", en : "Update", ru : "Обновление"},
    UPDATE_TEXT  :  {fr : "Une mise à jour est disponible. Rendez-vous sur le site web du script pour l'obtenir.", 
                     en : "An update is available. Please go on the script website.", ru : "Обновление доступно. Пожалуйста, перейдите на страницу скрипта."},

	// EnhanceUi
	CENTER :		{fr : "Centrer", en : "Go to", ru : "Перейти в"},
    IN_PROGRESS :   {fr : "En cours...", en : "In progress...", ru : "Подождите..."},
    CHECK :         {fr : "Cocher", en : "Check", ru : "Проверка"},
    FROM_MSG :      {fr : "De", en : "From", ru : "Из"},
    TO_MSG :        {fr : "À", en : "To", ru : "В"},
	
	// Store
	QUOTA_REACHED :		{fr : "Quota de stockage atteint", en : "Storage quota reached", ru : "Заполнено место хранения данных"},
	QUOTA_REACHED_TEXT :{fr : "Veuillez supprimer des données via le menu <i>Options</i>.<br/><br/> \
								Si le problème persiste, videz la cache de votre navigateur \
								<i>(supprimera toutes vos préférences).</i>", 
						 en : "Please delete some data via the <i>Options</i> menu.<br/><br/> \
								If the problem persists, please clear the browser cache \
								<i>(will delete all your preferences).</i>", 
						 ru : "Пожалуйста, удалите данные через меню <i>Опции</i>.<br/><br/> \
								Если проблема сохранилась, почистите кэш браузера"},

    // WorldSwitch
    CONFIRM :       {fr : "Confirmer", en : "Confirm", ru : "Подтвердите"},
    CONFIRM_TEXT :  {fr : "Confirmez-vous la remise à zéro?", en : "Do you confirm reset?", ru : "Очистить список?"},
    OK :            {fr : "Ok", en : "Ok", ru : "Да"},
    CANCEL :        {fr : "Annuler", en : "Cancel", ru : "Нет"},

	// Menu
	ALLIANCE : 		{fr : "Alliance", en : "Alliance", ru : "Альянс"},
	KINGDOM : 		{fr : "Royaume", en : "Kingdom", ru : "Королевство"},
	TOOLS : 		{fr : "Outils", en : "Tools", ru : "Инструменты"},
	OPTIONS : 		{fr : "Options", en : "Options", ru : "Опции"},
	
    ONLINE_MEMBERS :{fr : "Membres en ligne ", en : "Online members", ru : "Игроки онлайн"},
	ALLIANCE_SPYS : {fr : "Rapports ", en : "Reports", ru : "Отчеты разведки"},
	ALLIANCE_HEROES:{fr : "Héros", en : "Heroes", ru : "Герои"},
	ARMIES : 		{fr : "Armées", en : "Armies", ru : "Войска"},
	RECRUITMENT : 	{fr : "Recrutement", en : "Recruitment", ru : "Доступно для найма"},
	RESOURCES : 	{fr : "Ressources", en : "Resources", ru : "Ресурсы"},
	HEROES : 		{fr : "Héros", en : "Heroes", ru : "Герои"},
	ARTIFACTS : 	{fr : "Artéfacts", en : "Artifacts", ru : "Артефакты"},
	ACTIONS : 		{fr : "Actions", en : "Actions", ru : "Действия"},
	HEROES_SPELLS : {fr : "Sorts (héros)", en : "Spells (heroes)", ru : "Заклинания у героев"},
	CITIES_SPELLS : {fr : "Sorts (villes)", en : "Spells (cities)", ru : "Заклинания в городах"},
    CITIES_BUILDINGS :{fr : "Bâtiments", en : "Buildings", ru : "Строения в городе"},
    REGIONS :       {fr : "Régions", en : "Regions", ru : "Регионы"},
    ATTACKS_SIEGES :{fr : "Sièges", en : "Sieges", ru : "Осады"},
	LOOKOUT : 		{fr : "Vigie", en : "Lookout", ru : "Передвижения"},
	MAPFINDER : 	{fr : "MapFinder", en : "MapFinder", ru : "Поиск ресурсов"},
	CARTO : 		{fr : "Cartographe", en : "Cartographer", ru : "Карта мира"},
	DISTANCES : 	{fr : "Distances", en : "Distances", ru : "Расстояния"},
	MARKS : 		{fr : "Repères", en : "Marks", ru : "Пометки"},
	NOTEPAD : 		{fr : "Bloc-notes", en : "Notepad", ru : "Блокнот"},
	ABOUT : 		{fr : "A propos de", en : "About", ru : "О программе"},

    // SpyReport    
    SPY_REPORT :    {fr : "Rapport d'espionnage", en : "Scouting report", ru : "Отчеты разведки"},
    IG_PERMALINK :  {fr : "Permalien in-game", en : "In-game permalink", ru : "Постоянная ссылка в игре"},
    LOCATION :      {fr : "Lieu", en : "Location", ru : "Местонахождение"},
	HALT :          {fr : "Halte", en : "Halt", ru : "Привал"},
    POWER :         {fr : "Puissance", en : "Power", ru : "Сила армии"},
    My_HERO :       {fr : "Mon héros", en : "My hero", ru : "Мой герой"},
    ENNEMY_HERO :   {fr : "Héros ennemi", en : "Ennemy hero", ru : "Герой противника"},
    ATTACKER :      {fr : "Attaquant", en : "Attacker", ru : "Атакующий"},
    DEFENDER :      {fr : "Défenseur", en : "Defender", ru : "Защищающийся"},
    ATTACK_CITY :   {fr : "Attaquer la ville", en : "Attack city", ru : "Атаковать город"},
    FIGHT :         {fr : "Combat!", en : "Fight!", ru : "Сражаться!"},
    FORTIFICATION : {fr : "Fortification", en : "Fortification", ru : "Укрепления"},
    PROTECTED :     {fr : "Protégé", en : "Protected", ru : "Защищен"},
    IMPROVEMENTS :  {fr : "perfectionnements", en : "improvements", ru : "улучшение"},

    SCOUT_LVL :     {fr : "Niveau d'espionnage", en : "Scouting level", ru : "Результат разведки"},
    SCOUT_LVL2 :    {fr : "Médiocre", en : "Poor", ru : "Неудачно"},
    SCOUT_LVL3 :    {fr : "Presque bonne", en : "Almost good", ru : "Вполне успешно"},
    SCOUT_LVL4 :    {fr : "Bonne", en : "Good", ru : "Успешно"},
    SCOUT_LVL5 :    {fr : "Succès relatif", en : "Relative success", ru : "Достаточно хорошо"},
    SCOUT_LVL6 :    {fr : "Succès", en : "Success", ru : "Хорошо"},
    SCOUT_LVL7 :    {fr : "Succès total", en : "Total success", ru : "Очень хорошо"},

    ARCANE_MAGE :           {fr : "Mage des arcanes", en : "Arcane mage", ru : "Искатель знаний"},
    DISTURBED_WIZARD :      {fr : "Magicien dérangé", en : "Disturbed Wizard", ru : "Безумный маг"},
    FANATIC_SORCERER :      {fr : "Sorcier fanatique", en : "Fanatic Sorcerer", ru : "Чародей-фанатик"},
    ILLUMINATED_PROTECTOR : {fr : "Protecteur illuminé", en : "Illuminated Protector", ru : "Преданый защитник"},
    MERCENARY :             {fr : "Mercenaire", en : "Mercenary", ru : "Наемник"},
    OUTLAND_WARRIOR :       {fr : "Guerrier des confins", en : "Outland Warrior", ru : "Воин пустошей"},
    PALADIN :               {fr : "Baron", en : "Paladin", ru : "Паладин"},
    PIT_WARRIOR :           {fr : "Guerrier d'arène", en : "Pit Warrior", ru : "Воин Бездны"},
    PROTECTOR :             {fr : "Protecteur", en : "Protector", ru : "Защитник"},
    WARMAGE :               {fr : "Mage de guerre", en : "Warmage", ru : "Боевой маг"},
    WARMASTER :             {fr : "Maître de guerre", en : "Warmaster", ru : "Мастер оружия"},
    WARRIOR_MAGE :          {fr : "Mage guerrier", en : "Warrior Mage", ru : "Воин-маг"},
    SENACHAL :              {fr : "Sénéchal", en : "Senachal", ru : "Сенешаль"},
    SOBERED_WIZARD :        {fr : "Magicien assagi", en : "Sobered Wizard", ru : "Мудрый волшебник"},
    EXPLORER :              {fr : "Explorateur", en : "Explorer", ru : "Первооткрыватель"},

    FIST_OF_WRATH:          {fr : "Poing de la colère", en : "Fist of Wrath", ru : "Волшебный кулак"}, 
    WASP_SWARM:             {fr : "Essaim", en : "Wasp Swarm", ru : "Призыв осиного роя"}, 
    FIRE_TRAP:              {fr : "Piège de feu", en : "Fire Trap", ru : "Огненная ловушка"}, 
    RAISE_DEAD:             {fr : "Animation de cadavre", en : "Raise Dead", ru : "Поднятие мертвых"}, 
    EARTHQUAKE:             {fr : "Séisme", en : "Earthquake", ru : "Землетрясение"}, 
    PHANTOM_FORCES:         {fr : "Forces fantomatiques", en : "Phantom Forces", ru : "Создание фантома"}, 
    SUMMON_ELEMENTALS:      {fr : "Invocation d'élémentaires", en : "Summon Elementals", ru : "Призыв элементалей"}, 
    FIREWALL:               {fr : "Mur de flammes", en : "Firewall", ru : "Стена огня"}, 
    CONJURE_PHOENIX:        {fr : "Invocation de phénix", en : "Conjure Phoenix", ru : "Призыв феникса"}, 
    WEAKNESS:               {fr : "Hex de faiblesse", en : "Weakness", ru : "Ослабление"}, 
    SICKNESS:               {fr : "Infection", en : "Sickness", ru : "Зараза"}, 
    GUARD_BREAK:            {fr : "Hex de contracture", en : "Guard Break", ru : "Уязвимость"}, 
    DISEASE:                {fr : "Maladie", en : "Disease", ru : "Мор"}, 
    VULNERABILITY:          {fr : "Hex de vulnérabilité", en : "Vulnerability", ru : "Разрушающий луч"}, 
    SLOW:                   {fr : "Hex d'épuisement", en : "Slow", ru : "Замедление"}, 
    PLAGUE:                 {fr : "Peste", en : "Plague", ru : "Чума"}, 
    DEATH_TOUCH:            {fr : "Hex de défaillance", en : "Death Touch", ru : "Прикосновение смерти"}, 
    WORD_OF_DEATH:          {fr : "Fléau", en : "Scourge", ru : "Проказа"}, 
    SCOURGE:                {fr : "Fléau", en : "Scourge", ru : "Проказа"}, 
    DIVINE_STRENGTH:        {fr : "Grâce de force", en : "Divine Strength", ru : "Божественная сила"}, 
    BLESS:                  {fr : "Grâce d'endurance", en : "Bless", ru : "Благословение"}, 
    MYSTIC_SHIELD:          {fr : "Grâce d'immunité", en : "Mystic Shield", ru : "Небесный щит"}, 
    HASTE:                  {fr : "Grâce de rapidité", en : "Haste", ru : "Ускорение"}, 
    RIGHTEOUS_MIGHT:        {fr : "Grâce de puissance", en : "Righteous Might", ru : "Карающийудар"}, 
    DEFLECT_MISSILE:        {fr : "Grâce de déflection", en : "Deflect Missile", ru : "Уклонение"}, 
    TELEPORTATION:          {fr : "Téléportation", en : "Teleportation", ru : "Телепорт"}, 
    WORD_OF_LIGHT:          {fr : "Mot de lumière", en : "Word of Light", ru : "Святое слово"}, 
    RESURRECTION:           {fr : "Résurrection", en : "Resurrection", ru : "Воскрешение"}, 
    STONE_SPIKES:           {fr : "Stalagmites", en : "Stone Spikes", ru : "Каменные шипы"}, 
    ELDERTICH_ARROW:        {fr : "Flèches des arcanes", en : "Eldritch Arrow", ru : "Магическая стрела"}, 
    ICE_BOLT:               {fr : "Trait de glace", en : "Ice Bolt", ru : "Ледяная глыба"}, 
    LIGHTNING_BOLT:         {fr : "Foudre", en : "Lightning Bolt", ru : "Молния"}, 
    CIRCLE_OF_WINTER:       {fr : "Cercle d'hiver", en : "Circle of Winter", ru : "Кольцо холода"}, 
    FIREBALL:               {fr : "Boule de feu", en : "Fireball", ru : "Огненный шар"}, 
    METEOR_SHOWER:          {fr : "Pluie de météores", en : "Meteor Shower", ru : "Метеоритный дождь"}, 
    CHAIN_LIGHTNING:        {fr : "Chaine de foudre", en : "Chain Lightning", ru : "Цепь молний"}, 
    IMPLOSION:              {fr : "Choc terrestre", en : "Implosion", ru : "Шок земли"}, 

    FIST_OF_WRATH_DESC:          {fr : "Inflige 0.7 point de dégâts par point de magie à chaque unité du peloton ennemi au cours du tour choisi.", en : "Causes 0.7 points damage per magic point on each member of the enemy stack during the targeted round.", ru : "Наносит 0.7 очков урона за каждую единицу магии каждому бойцу вражеского отряда в выбранном раунде."}, 
    WASP_SWARM_DESC:             {fr : "Invoque un peloton de cavalerie d'une puissance équivalente à 110 par point de magie.", en : "A cavalry stack is summoned. Its power is 110 points per magic point.", ru : "На поле боя появляется отряд кавалерии. Его сила составляет 110 за каждую единицу магии."}, 
    FIRE_TRAP_DESC:              {fr : "Réduit de 0.3% par point de magie la puissance du peloton ennemi au cours du tour choisi. Ce sort est 50% moins efficace lorsqu'il est lancé sur des tireurs.", en : "The enemy stack loses 0.3% of its total power per magic point during the targeted round. This spell is 50% less efficient if cast against shooters.", ru : "Вражеский отряд теряет 0.3% от своей общей силы за каждую единицу магии в выбранном раунде. Это заклинание на 50% менее эффективно, если его целью являются стрелки."}, 
    RAISE_DEAD_DESC:             {fr : "Ressuscite un montant égal à 0.45% par point de magie du nombre de créatures dispersées au cours d'un tour. Le sort ne fonctionne que si au moins une créature du peloton est vivante à la fin du tour. Les créatures invoquées disparaissent à la fin du combat.", en : "0.45% of the routed troops per magic point are resurrected at the end of the round if at least one of the stack members is still alive. The raised creatures disappear at the end of the battle.", ru : "0.45% солдат за каждую единицу магии возвращаются к жизни в конце раунда при условии, что их отряд не был уничтожен. Заклинание используется в том случае, если хотя бы один солдат из каждого отряда остался в живых. Возвращенные к жизни существа исчезают после окончания битвы."}, 
    EARTHQUAKE_DESC:             {fr : "Réduit de 0.5% par point de magie l'efficacité des défenses d'une cité ou d'une région pendant tout le restant d'une bataille.", en : "The efficiency of the city or region defences is reduced by 0.5% per magic point during the rest of the battle.", ru : "Эффективность всех оборонительных сооружений в регионе уменьшается на 0.5% за каждую единицу магии до конца битвы."}, 
    PHANTOM_FORCES_DESC:         {fr : "Invoque un peloton de tireurs d'une puissance équivalente à 130 par point de magie.", en : "A shooter stack is summoned. Its power is 130 points per magic point.", ru : "На поле боя появляется отряд стрелков. Его сила составляет 130 за каждую единицу магии."}, 
    SUMMON_ELEMENTALS_DESC:      {fr : "Invoque un peloton d'infanterie d'une puissance équivalente à 200 par point de magie.", en : "An infantry stack is summoned. Its power is 200 points per magic point.", ru : "На поле боя появляется отряд пехоты. Его сила составляет 200 за каждую единицу магии."}, 
    FIREWALL_DESC:               {fr : "Inflige 1.35 point de dégâts par point de magie à chaque unité du peloton ennemi au cours du tour choisi.", en : "Causes 1.35 damage points per magic point on each member of the enemy stack during the targeted round.", ru : "Наносит 1.35 очков урона за каждую единицу магии каждому бойцу вражеского отряда в выбранном раунде."}, 
    CONJURE_PHOENIX_DESC:        {fr : "Invoque un peloton de cavalerie d'une puissance équivalente à 0.22% de la puissance de l'armée ennemie, par point de magie.", en : "A cavalry stack is summoned. Its power is 0.22% points per magic point of the enemy army power.", ru : "На поле боя появляется отряд кавалерии. Его сила составляет 0.22% за каждую единицу магии силы армии противника."}, 
    WEAKNESS_DESC:               {fr : "Réduit de 0.35 par point de magie l'attaque du héros ennemi.", en : "Reduces the enemy hero attack characteristic by 0.35 points per magic point.", ru : "Снижает навык атаки вражеского героя на 0.35 за каждую единицу магии."}, 
    SICKNESS_DESC:               {fr : "Inflige 0.5 point de dégâts par point de magie à toutes les unités de tous les pelotons ennemis.", en : "All members of all remaining enemy stacks lose 0.5 hit points per magic point.", ru : "Все бойцы вражеских отрядов теряют 0.5 здоровья за каждую единицу магии."}, 
    GUARD_BREAK_DESC:            {fr : "Réduit de 0.25 par point de magie la défense du héros ennemi.", en : "Reduces the enemy hero defense characteristic by 0.25 points per magic point.", ru : "Снижает навык защиты вражеского героя на 0.25 за каждую единицу магии."}, 
    DISEASE_DESC:                {fr : "Inflige 0.7 point de dégâts par point de magie à toutes les unités de tous les pelotons ennemis.", en : "All members of all remaining enemy stacks lose 0.7 hit points per magic point.", ru : "Все бойцы вражеских отрядов теряют 0.7 здоровья за каждую единицу магии."}, 
    VULNERABILITY_DESC:          {fr : "Réduit de 0.25 par point de magie la défense du héros ennemi.", en : "Reduces the enemy hero defense characteristic by 0.25 points per magic point.", ru : "Снижает навык защиты вражеского героя на 0.25 за каждую единицу магии."}, 
    SLOW_DESC:                   {fr : "Réduit de 0.5 par point de magie l'attaque du héros ennemi.", en : "Reduces the enemy hero attack characteristic by 0.5 points per magic point.", ru : "Снижает навык атаки вражеского героя на 0.5 за каждую единицу магии."}, 
    PLAGUE_DESC:                 {fr : "Inflige 0.9 point de dégâts par point de magie à toutes les unités de tous les pelotons ennemis.", en : "All members of all enemy remaining stacks lose 0.9 hit points per magic point.", ru : "Все бойцы вражеских отрядов теряют 0.9 здоровья за каждую единицу магии."}, 
    DEATH_TOUCH_DESC:            {fr : "Réduit de 0.6 par point de magie l'attaque du héros ennemi.", en : "Reduces the enemy hero attack characteristic by 0.6 points per magic point.", ru : "Снижает навык атаки вражеского героя на 0.6 за каждую единицу магии."}, 
    WORD_OF_DEATH_DESC:          {fr : "Anéantit 0.2% par point de magie des unités de tous les pelotons ennemis.", en : "All enemy stacks suffer 0.2% losses per magic point.", ru : "Все бойцы вражеских отрядов теряют 0.2% здоровья за каждую единицу магии."}, 
    DIVINE_STRENGTH_DESC:        {fr : "Augmente de 0.3 par point de magie l'attaque de toutes les unités d'un peloton au cours du tour choisi.", en : "Increases the attack value of all the members of the stack by 0.3 points per magic point during the targeted round.", ru : "Увеличивает значение атаки всех членов отряда на 0.3 за каждую единицу магии в выбранном раунде."}, 
    BLESS_DESC:                  {fr : "Augmente de 0.35% par point de magie la défense d'un peloton au cours du tour choisi.", en : "Increases the defensive value of the entire stack by 0.35% per magic point during the targeted round.", ru : "Увеличивает навык защиты всего отряда на 0.35% за каждую единицу магии в выбранном раунде."}, 
    MYSTIC_SHIELD_DESC:          {fr : "Augmente de 0.6 par point de magie la défense de toutes les unités d'un peloton au cours du tour choisi. Ce sort est 50% plus efficace sur les pelotons de cavalerie.", en : "Increases the defence value of all the members of the stack by 0.6 points per magic point during the targeted round. This spell is 50% more efficient if it affects a cavalry stack.", ru : "Увеличивает навык защиты всех членов отряда на 0.6 за каждую единицу магии в выбранном раунде. Это заклинание на 50% процентов более эффективно, если его целью является кавалерия."}, 
    HASTE_DESC:                  {fr : "Augmente de 0.21 % par point de magie l'attaque d'un peloton au cours du tour choisi.", en : "Increases the attack value of the entire stack by 0.21% per magic point during the targeted round.", ru : "Увеличивает навык атаки отряда на 0.21 за каждую единицу магии в выбранном раунде."}, 
    RIGHTEOUS_MIGHT_DESC:        {fr : "Augmente de 0.6 par point de magie l'attaque de toutes les unités d'un peloton au cours du tour choisi.", en : "Increases the attack value of all the members of the stack by 0.6 points per magic point during the targeted round.", ru : "Увеличивает навык атаки всех членов отряда на 0.6 за каждую единицу магии в выбранном раунде."}, 
    DEFLECT_MISSILE_DESC:        {fr : "Augmente de 0.45% par point de magie la défense d'un peloton au cours du tour choisi. Ce sort est 50% plus efficace face à un peloton de tireurs ennemis.", en : "Increases the defensive value of the entire stack by 0.45% per magic point during the targeted round. This spell is 50% more efficient if the stack is attacked by shooters.", ru : "Увеличивает навык защиты отряда на 0.45% за каждую единицу магии в выбранном раунде. Это заклинание на 50% эффективнее, если отряд атаковали стрелки."}, 
    TELEPORTATION_DESC:          {fr : "Augmente de 0.28% par point de magie l'attaque d'un peloton au cours du tour choisi. Ce sort est 50% moins efficace sur les pelotons de tireurs.", en : "Increases the attack value of the entire stack by 0.28% per magic point during the targeted round. This spell is 50% less efficient if it affects a shooter stack.", ru : "Увеличивает навык атаки отряда на 0.28% за каждую единицу магии в выбранном раунде. Это заклинание на 50% менее эффективно, если его целью являются стрелки."}, 
    WORD_OF_LIGHT_DESC:          {fr : "Inflige 160 points de dégâts par point de magie au peloton ennemi au cours du tour choisi.", en : "Causes 160 damage points per magic point on the enemy stack during the targeted round.", ru : "Наносит 160 очков урона за каждую единицу магии вражескому отряду в выбранном раунде."}, 
    RESURRECTION_DESC:           {fr : "Ressuscite un montant égal à 0,4% des créatures encore en vie à la fin du tour. Le sort n'est lancé que si au moins une créature du peloton est vivante à la fin du tour.", en : "0.4% of the units still alive at the end of the round are resurrected. The spell is cast only if at least one of the stack members is still alive.", ru : "0.4% солдат возвращаются к жизни при условии, что их отряд не был уничтожен. Заклинание используется в том случае, если хотя бы один солдат из каждого отряда остался в живых."}, 
    STONE_SPIKES_DESC:           {fr : "Inflige 0.7 point de dégâts par point de magie à chaque unité du peloton ennemi au cours du tour choisi.", en : "Causes 0.7 damage points per magic point on each member of the enemy stack during the targeted round.", ru : "Наносит 0.7 очков урона за каждую единицу магии каждому бойцу вражеского отряда в выбранном раунде."}, 
    ELDERTICH_ARROW_DESC:        {fr : "Inflige 130 points de dégâts par point de magie au peloton ennemi au cours du tour choisi.", en : "Causes 130 damage points per magic point on the enemy stack during the targeted round.", ru : "Наносит 130 очков урона за каждую единицу магии вражескому отряду в выбранном раунде."}, 
    ICE_BOLT_DESC:               {fr : "Réduit de 0.25% par point de magie la puissance du peloton ennemi au cours du tour choisi.", en : "The enemy stack loses 0.25% of its total power per magic point during the targeted round.", ru : "Вражеский отряд теряет 0.25% от своей общей силы за каждую единицу магии в выбранном раунде."}, 
    LIGHTNING_BOLT_DESC:         {fr : "Inflige 0.9 point de dégâts par point de magie à chaque unité du peloton ennemi au cours du tour choisi.", en : "Causes 0.9 damage points per magic point on each member of the enemy stack during the targeted round.", ru : "Наносит 0.9 очков урона за каждую единицу магии каждому бойцу вражеского отряда в выбранном раунде."}, 
    CIRCLE_OF_WINTER_DESC:       {fr : "Inflige 1.2 point de dégâts par point de magie à chaque unité du peloton ennemi au cours du tour choisi.", en : "Causes 1.2 damage points per magic point on each member of the enemy stack during the targeted round.", ru : "Наносит 1.2 очков урона за каждую единицу магии каждому бойцу вражеского отряда в выбранном раунде."}, 
    FIREBALL_DESC:               {fr : "Réduit de 0.325% par point de magie la puissance du peloton ennemi au cours du tour choisi.", en : "The enemy stack loses 0.325% of its total power per magic point during the targeted round.", ru : "Вражеский отряд теряет 0.325% от своей общей силы за каждую единицу магии в выбранном раунде."}, 
    METEOR_SHOWER_DESC:          {fr : "Inflige 1.7 point de dégâts par point de magie à chaque unité du peloton ennemi au cours du tour choisi.", en : "Causes 1.7 damage points per magic point on each member of the enemy stack during the targeted round.", ru : "Наносит 1.7 очков урона за каждую единицу магии каждому бойцу вражеского отряда в выбранном раунде."}, 
    CHAIN_LIGHTNING_DESC:        {fr : "Inflige 180 points de dégâts par point de magie au peloton ennemi au cours du tour choisi.", en : "Causes 180 damage points per magic point on the enemy stack during the targeted round.", ru : "Наносит 180 очков урона за каждую единицу магии вражескому отряду в выбранном раунде."}, 
    IMPLOSION_DESC:              {fr : "Réduit de 0.4% par point de magie la puissance du peloton ennemi au cours du tour choisi.", en : "The enemy stack loses 0.4% of its total power per magic point during the targeted round.", ru : "Вражеский отряд теряет 0.4% от своей общей силы за каждую единицу магии в выбранном раунде."},
    
    ARCHITECT :                     {fr : "Architecte", en : "Architect", ru : "Архитектор"},
    LANDLORD :                      {fr : "Bâtisseur", en : "Landlord", ru : "Помещик"},
    KNIGHT :                        {fr : "Tenancier", en : "Knight", ru : "Рыцарь"},
    BARBARIAN :                     {fr : "Barbare", en : "Barbarian", ru : "Варвар"},
    FIGHTER :                       {fr : "Combattant", en : "Fighter", ru : "Боец"},
    BUILDER :                       {fr : "Architecte", en : "Builder", ru : "Строитель"},
    MERCHANT :                      {fr : "Marchant", en : "Merchant", ru : "Торговец"},
    LEADER :                        {fr : "Meneur", en : "Leader", ru : "Предводитель"},
    RANGER :                        {fr : "Rôdeur", en : "Ranger", ru : "Следопыт"},
    DESTRUCTIVE_WIZARD :            {fr : "Magicien de la Destruction", en : "Destructive Wizard", ru : "Маг-разрушитель"},
    DARK_WIZARD :                   {fr : "Magicien des Ténèbres", en : "Dark Wizard", ru : "Темный воин"},
    LIGHT_WIZARD :                  {fr : "Clerc", en : "Priest", ru : "Священник"},
    SUMMONING_WIZARD :              {fr : "Invocateur", en : "Summoner", ru : "Мастер призыва"},
    INFILTRATION :                  {fr : "Infiltrateur", en : "Infiltrator", ru : "Инфильтратор"},
    SHEOGH_SOVEREIGN :              {fr : "Souverain de Sheogh", en : "Sovereign of Sheogh", ru : "Властелин Шио"},
    LEGENDARY_WARRIOR :             {fr : "Guerrier Légendaire", en : "Legendary Warrior", ru : "Опытный воин"},
    LEGENDARY_MAGES_HUNTER :        {fr : "Chasseur de Mages", en : "Mage Hunter", ru : "Убийца магов"},
    LEGENDARY_EGERIA :              {fr : "Égérie Légendaire", en : "Legendary Muse", ru : "Муза"},
    LEGENDARY_PALADIN :             {fr : "Paladin Légendaire", en : "Legendary Paladin", ru : "Опытный паладин"},
    ETERNAL_NIGHT :                 {fr : "Nuit Éternelle", en : "Eternal Night", ru : "Вечная ночь"},
    KING_OF_THE_UNDEAD :            {fr : "Roi des Non-Morts", en : "King of the undead", ru : "Владыка нежити"},
    LORD_OF_THE_SILVER_CITIES :     {fr : "Seigneur des Citées d'Argent", en : "Lord of the Silver Cities", ru : "Правитель Серебряных городов"},
    LEGENDARY_WIZARD :              {fr : "Magicien Légendaire", en : "Legendary Magician", ru : "Опытный чародей"},
    LEGENDARY_SPY :                 {fr : "Espion Légendaire", en : "Legendary Spy", ru : "Опытный шпион"},
    DRAGON_KNIGHT :                 {fr : "Chevalier Dragon", en : "Dragon Knight", ru : "Рыцарь драконов"},

    ARCHITECT_DESC :                    {fr : "Plus efficace pour attaquer et défendre les cités, ainsi que pour la construction. Permet de fabriquer des Catapultes.", en : "Efficient in town attack, defense and construction. Allows catapult building.", ru : "Обладает знаниями, которые позволяют ему особенно эффективно нападать на города, оборонять поселения и возводить здания. Позволяет строить катапульты."},
    LANDLORD_DESC :                     {fr : "Réduit le coût des actions à la Taverne et augmente leur efficacité. Réduit les coûts de maintenance.", en : "Tavern actions cheaper or more effective. Reduces maintenance costs.", ru : "Все действия в тавернах обходятся дешевле или более эффективны. Снижает расходы на содержание строений."},
    KNIGHT_DESC :                       {fr : "Unités plus puissantes en défense. Permet de construire des forts. Aucun royaume n'est vraiment protégé sans un Chevalier.", en : "Units are more powerful in defense. Can build fort towers. No kingdom is truly protected without a knight.", ru : "Войска становятся эффективнее в защите. Может возводить форты. Ни одно королевство не может быть по-настоящему защищенным, если в нем нет рыцарей."},
    BARBARIAN_DESC :                    {fr : "Formé pour repérer les Éclaireurs ennemis. Bonnes capacités de pillage et d'interception de troupes ennemies en déroute. Permet de capturer les Éclaireurs ennemis.", en : "Trained in spotting enemy scouts. Has talents in pillaging and slaying routed enemy units. Allows the capture of enemy scouts.", ru : "Способен обнаружвать вражеских разведчиков и брать их в плен. Не знает себе равных в грабеже и убивает отступающих солдат противника."},
    FIGHTER_DESC :                      {fr : "Unités plus puissantes en attaque. Très utile pour éliminer les monstres autour d'une cité.", en : "Units are more powerful in attack. Very useful for killing monsters around your city.", ru : "Войска становятся эффективнее в нападении. Незаменим, если город окружают чудовища."},
    BUILDER_DESC :                      {fr : "Augmente les revenus. Permet de construire des ateliers d'exploitation. Un bon choix pour donner un coup de pouce à votre économie.", en : "Improves income. Able to build research towers. A good choice for boosting your economy.", ru : "Улучшает доход и может возводить исследовательские строения, тем самым способствуя развитию экономики вашего королевства."},
    MERCHANT_DESC :                     {fr : "Très habile dans la manipulation des caravanes et les arcanes du commerce, le marchand augmente la vitesse et la capacité de vos caravanes tout en maximisant les bénéfices de vos ventes directes.", en : "More efficient with caravans. Gains more gold when selling resources to the merchant.", ru : "Караваны более эффективны. Получают большую прибыль, продавая ресурсы нейтральным торговцам."},
    LEADER_DESC :                       {fr : "Produit et recrute les unités plus rapidement. Permet de recruter les unités de rang 7.", en : "Produces and recruits units faster. Allows tier 7 recruiting.", ru : "Нанимает войска быстрее других. Позволяет наниматься существ 7 тира."},
    RANGER_DESC :                       {fr : "Meilleur Éclaireur. Peut effectuer des reconnaissances de cités ou de régions. Utile pour garder un œil sur ses voisins.", en : "Improved scout. Can scout towns or regions. Excellent if you wish to keep an eye on your neighbors.", ru : "Умелый разведчик, способный собирать информацию о городах или регионах. Полезен, если вы хотите быть в курсе дел ваших соседей."},
    DESTRUCTIVE_WIZARD_DESC :           {fr : "Capable de lancer des sorts de l'École de la Destruction, très efficaces pour tuer les troupes ennemies.", en : "Allows casting of destructive magic spells. This magic school is efficient for killing enemy troops.", ru : "Может использовать заклинания школы Разрушения. Они как нельзя лучше подходят для уничтожения солдат противника."},
    DARK_WIZARD_DESC :                  {fr : "Capable de lancer des sorts de l'École des Ténèbres, très efficaces pour tuer les troupes faibles et pour affaiblir les héros ennemis.", en : "Can cast dark magic spells. Dark magic is very efficient in killing weak troops and in reducing enemy heroes' effectiveness.", ru : "Может использовать заклинания школы Тьмы. Они как нельзя лучше подходят для убийства слабых солдат и снижения эффективности действий героев противника."},
    LIGHT_WIZARD_DESC :                 {fr : "Capable de lancer des sorts de l'École de la Lumière, efficaces pour améliorer vos troupes.", en : "Allows casting of light magic spells. Light magic is good for boosting troop efficiency.", ru : "Может использовать заклинания школы Света. Чаще всего они используются для того, чтобы повысить эффективность войск героя."},
    SUMMONING_WIZARD_DESC :             {fr : "Capable de lancer des sorts de l'École de l'Invocation. Invoquer des troupes est un bon moyen pour tuer des monstres sans mettre en danger vos troupes.", en : "Allows casting summoning magic spells. Summoning troops is a good way to kill monsters without endangering your own armies.", ru : "Может использовать заклинания школы Призыва. Призванные существа помогут вам избежать потерь в рядах вашей собственной армии."},
    INFILTRATION_DESC :                 {fr : "Meneur de troupes accélérant le déplacement de son armée par sa seule présence.", en : "Troop leader that increases movement speed of his army just by his presence.", ru : "Предводитель, который своим присутствием увеличивает скорость передвижения армии."},
    SHEOGH_SOVEREIGN_DESC :             {fr : "Guerrier démoniaque spécialisé dans l'aggravation des pertes ennemies.", en : "Demonic warrior specialized in increasing enemy losses.", ru : "Демонический воин ,вынуждающий противника нести опустошительные потери."},
    LEGENDARY_WARRIOR_DESC :            {fr : "Puissant guerrier connaissant toutes les finesses du combat.", en : "Powerful warrior versed in the finer skills of combat.", ru : "Могучий воитель, овладевший многими боевыми приемами и знающий о сражениях все."},
    LEGENDARY_MAGES_HUNTER_DESC :       {fr : "Guerrier spécialisé dans la neutralisation de la magie ennemie.", en : "Warrior specialized in neutralizing enemy magic.", ru : "Воин, способности которого позволяют нейтрализовать волшебство противника."},
    LEGENDARY_EGERIA_DESC :             {fr : "Héros apprécié de la population augmentant le recrutement et le moral des troupes.", en : "Hero beloved of the people, increasing troop recruitment and moral.", ru : "Вдохновенный предводитель ,способный поднять боевой дух армии или пополнить ее ряды новыми воинами."},
    LEGENDARY_PALADIN_DESC :            {fr : "Défenseur expérimenté utilisant la magie de la lumière.", en : "Experienced defender using Light magic.", ru : "Опытный защитник, владеющий магией света."},
    ETERNAL_NIGHT_DESC :                {fr : "Mage des ténèbres spécialisé en défense.", en : "Dark wizard specialized in defense.", ru : "Темный волшебник, отлично владеющий защитными чарами."},
    KING_OF_THE_UNDEAD_DESC :           {fr : "Magicien supérieur utilisant des sorts d'invocation et des ténèbres.", en : "Expert magician using summoning and dark spells.", ru : "Опытный чародей, владеющий темной магией и заклинаниями призыва."},
    LORD_OF_THE_SILVER_CITIES_DESC :    {fr : "Grand gestionnaire pouvant ramener des ressources supplémentaires à son royaume.", en : "Proficient administrator capable of procuring extra resources for his kingdom.", ru : "Талантливый правитель, способный обеспечить свое королевство дополнительными ресурсами."},
    LEGENDARY_WIZARD_DESC :             {fr : "Magicien suprême de la lumière et de l'invocation utilisant sa magie pour défendre ses troupes.", en : "Supreme magician of light spells and summoning using his magic to defend his troops.", ru : "Непревзойденный чародей, владеющий магией света и заклинаниями призыва, с помощью которых защищает свои войска."},
    LEGENDARY_SPY_DESC :                {fr : "Éclaireur exceptionnel pouvant obtenir des informations détaillées quelles que soient les circonstances.", en : "Exceptionally talented scout who can obtain detailed information, whatever the circumstances.", ru : "Необыкновенно одаренный разведчик, способный добыть подробнейшую информацию о противнике при любых обстоятельствах."},
    DRAGON_KNIGHT_DESC :                {fr : "Guerrier offensif utilisant la magie de la destruction pour détruire les troupes adverses.", en : "Offensive warrior using destructive magic  to annihilate opposing forces.", ru : "Неудержимый агрессор, использующий магию разрушения, чтобы уничтожать противостоящие ему войска."},

    // AllianceSpys
    REFRESH :       {fr : "Actualiser", en : "Refresh", ru : "Обновить"},
    PREVIOUS :      {fr : "Précédent", en : "Previous", ru : "Назад"},
    NEXT :          {fr : "Suivant", en : "Next", ru : "Вперед"},
    BEGIN :         {fr : "Début", en : "Begin", ru : "В начало"},

    // AllianceHeroes
    NOT_FOUND_AH_TITLE : {fr : "Héros non trouvé", en : "Hero not found", ru : "Герой не найден"},
    NOT_FOUND_AH_TEXT :  {fr : "Aucune information disponible", en : "No information available", ru : "Информация недоступна"},

	// Ressources
	GOLD :			{fr : "Or", en : "Gold", ru : "Золото"},
	WOOD :			{fr : "Bois", en : "Wood", ru : "Дерево"},
	ORE :			{fr : "Minerai", en : "Ore", ru : "Руда"},
	MERCURY :		{fr : "Mercure", en : "Mercury", ru : "Ртуть"},
	CRYSTAL :		{fr : "Cristaux", en : "Crystal", ru : "Кристаллы"},
	SULFUR :		{fr : "Soufre", en : "Sulfur", ru : "Сера"},
	GEM :			{fr : "Gemmes", en : "Gem", ru : "Самоцветы"},
	
	// KingdomResources
	TOTAL: 			{fr : "Total", en : "Total", ru : "Всего ресурсов"},
	FULL_IN : 		{fr : "Plein dans", en : "Full in", ru : "Заполнится за"},
	EMPTY_IN : 		{fr : "Vide dans", en : "Empty in", ru : "Опустеет за"},
	MAINTENANCE : 	{fr : "Maintenance", en : "Maintenance", ru : "Расходы"},
	AMOUNT : 		{fr : "Quantité", en : "Amount", ru : "Количество"},
	DAILY_INCOME : 	{fr : "Revenu quotidien", en : "Daily income", ru : "Ежедневный доход"},
	HOURLY_INCOME : {fr : "Revenu horaire", en : "Hourly income", ru : "Почасовый доход"},
	STORAGE : 		{fr : "Capacité de stockage", en : "Storage capacity", ru : "Вместимость"},
	
	// KingdomArmies, KingdomRecruitment
	UNIT_POWER :	{fr : "Puissance de l'unité", en : "Unit power", ru : "Сила отряда"},
	UNIT_AMOUNT :	{fr : "Nombre de créatures", en : "Number of units", ru : "Количество отрядов"},
	STACK_POWER :	{fr : "Puissance du peloton", en : "Stack power", ru : "Сила стека"},
	DAILY_POWER :	{fr : "Puissance quotidienne", en : "Daily power", ru : "Сила ежедневного прироста"},
	DAILY_COST :	{fr : "Coût quotidien", en : "Daily cost", ru : "Стоимость покупки ежедневного прироста"},
	UNIT_COST :		{fr : "Coût de la créature", en : "Unit cost", ru : "Цена отряда"},
	STACK_COST :	{fr : "Coût du peloton", en : "Stack cost", ru : "Стоимость всех отрядов"},
	DAILY_RECRUIT :	{fr : "Temps de recrutement quotidien", en : "Daily recruit time", ru : "Время найма ежедневного прироста"},
	UNIT_RECRUIT :	{fr : "Temps de recrutement de la créature", en : "Unit recruit time", ru : "Время найма отряда"},
	STACK_RECRUIT :	{fr : "Temps de recrutement du peloton", en : "Stack recruit time", ru : "Время найма всех отрядов"},
	DAILY_PROD :	{fr : "Production quotidienne", en : "Daily production", ru : "Ежедневный прирост"},
	
	// KingdomHeroes
	LEVEL :			{fr : "Niveau", en : "Level", ru : "Уровень"},
	SKILLS :		{fr : "Talents", en : "Skills", ru : "Навыки"},
	BODY_PART :		{fr : "Équipement", en : "Body part", ru : "Слот"},
	
	// KingdomArtifacts
	SEARCH_HEROES :	{fr : "Recherche des artéfacts sur les héros", en : "Search artifacts on heroes", ru : "Поиск артефактов у героев"},
	SEARCH_CITIES :	{fr : "Recherche des artéfacts dans les cités", en : "Search artifacts in cities", ru : "Поиск артефактов в городах"},
	ARTIFACT :		{fr : "Artéfact", en : "Artifact", ru : "Артефакт"},
	CITY :			{fr : "Cité", en : "City", ru : "Город"},
	OWNER :			{fr : "Possesseur", en : "Owner", ru : "владелец"},
	EQUIPPED :		{fr : "Équipé", en : "Equipped", ru : "Одет"},
	BACKPACK :		{fr : "Sac à dos", en : "Backpack", ru : "В рюкзаке"},
	UNBIND_IN :		{fr : "Délié dans", en : "Unbind in", ru : "Отвяжется в"},
	
	// KingdomActions
	ACTION :		{fr : "Action", en : "Action", ru : "Действие"},
	END_DATE :		{fr : "Fin le", en : "End date", ru : "Время заверешения"},
	END_IN :		{fr : "Fin dans", en : "End in", ru : "Завершится через"},
	
	// KingdomHeroesSpells
	SPELL :			{fr : "Sort", en : "Spell", ru : "Заклинание"},
	READY :			{fr : "Prêt", en : "Ready", ru : "Будет готово в"},
	READY_IN :		{fr : "Prêt dans", en : "Ready in", ru : "Будет готово через"},

    // KingdomCityBuildings
    SUPPORT :       {fr : "Support", en : "Support", ru : "Административное здание, склад"},
    MAGICAL :       {fr : "Magique", en : "Magical", ru : "Гильдия магов"},
    DEFENSE :       {fr : "Défense", en : "Defense", ru : "Оборонительное строение"},
    OTHER :         {fr : "Autre", en : "Other", ru : "Другие здания"},

    // KingdomRegions
    MINES :         {fr : "Mines", en : "Mines", ru : "Шахты"},
    RESEARCH_BUILDINGS :{fr : "Ateliers", en : "Research buildings", ru : "Исследовательские строения"},
    LEVEL_SHORT :   {fr : "niv.", en : "lvl.", ru : "урв."},
    IMPROVE_SHORT : {fr : "perf.", en : "imp.", ru : "расш."},
    FIELDS :        {fr : "Champs", en : "Fields", ru : "Поля"},
    STOREHOUSES :   {fr : "Entrepôts", en : "Storehouses", ru : "Склады"},

    // AttacksSieges
    ATTACKS :       {fr : "Attaques", en : "Attacks", ru : "Нападения"},
    SIEGES :        {fr : "Sièges", en : "Sieges", ru : "Осады"},
    COORDINATES:    {fr : "Coordonnées", en : "Coordinates", ru : "Координаты"},

    // Lookout
	FILTER :		{fr : "Filtre", en : "Filter", ru : "Фильтр"},
	HIDE_ALLIANCE :	{fr : "Cacher les mouvements de l'alliance", en : "Hide alliance movements", ru : "Скрыть передвижения игроков альянса"},
	NONE :			{fr : "Aucune", en : "None", ru : "Без альянса"},
	HERO :			{fr : "Héros", en : "Hero", ru : "Герой"},
	SPEED :			{fr : "Vitesse", en : "Speed", ru : "Скорость"},
	FROM :			{fr : "Depuis", en : "From", ru : "Из"},
	TO :			{fr : "Vers", en : "To", ru : "В"},
	NEXT_HALT :		{fr : "Prochaine halte", en : "Next halt", ru : "Следующий привал"},
    START_HALT :    {fr : "Début de la halte", en : "Halt start", ru : "Привал начнется в"},
    END_HALT :      {fr : "Fin de la halte", en : "Halt end", ru : "Привал закончится в"},
	PLAYER :		{fr : "Joueur", en : "Player", ru : "Игрок"},
	END :			{fr : "Fin", en : "End", ru : "Время окончания"},
	DOMINATION :	{fr : "Domination", en : "Domination", ru : "Господство"},
	WEALTH :		{fr : "Richesse", en : "Wealth", ru : "Богатство"},
	HONOR :			{fr : "Honneur", en : "Honor", ru : "Честь"},
	CITY_COUNT :	{fr : "Nombre de cités", en : "City count", ru : "Количество городов"},
	LOOKOUT_SPEED_1 :	{fr : "Inconnue (en halte)", en : "Unknown (in halt)", ru : "На привале"},
	LOOKOUT_SPEED_2 :	{fr : "Rapide (Héros seul ou départ d'une cité avec Graal)", en : "Fast (Single hero or starting from city with Grail)", ru : "Быстрая (Герой вышел из города с Граалем)"},
	LOOKOUT_SPEED_3 :	{fr : "Normale", en : "Regular", ru : "Обычная"},
	LOOKOUT_SPEED_4 :	{fr : "Lente (Armes de siège)", en : "Slow (Siege weapons)", ru : "Медленная (Герой идет с осадными орудиями)"},
    STARTED_SINCE : {fr : "Commencé depuis", en : "Started since", ru : "Вышел в"},
	
	// Cartographer
	CURSOR :		{fr : "Curseur", en : "Cursor", ru : "Курсор"},
	ACTUAL :		{fr : "Actuel", en : "Actual", ru : "положение"},
    DETAILS :       {fr : "Détails", en : "Details", ru : "Детали"},
    CENTER_FIRST_CITY : {fr : "Center la vue sur la cité d'origine", en : "Center view on home city", ru : "Центрировать на первом городе"},
	
	// Distances
	SQUARES :		{fr : "Cases", en : "Squares", ru : "Количество клеток"},
	
	// Marks
	DESCRIPTION :	{fr : "Description", en : "Description", ru : "Описание"},
	ADD :			{fr : "Ajouter", en : "Add", ru : "Добавить"},
	
	// Notepad      ru : "Блокнот"
	NEW :  			{fr : "Nouveau", en : "New", ru : "Новая запись"},
	TITLE :  		{fr : "Titre", en : "Title", ru : "Название"},
	CONTENT :  		{fr : "Contenu", en : "Content", ru : "Содержание"},
	CANCEL :  		{fr : "Annuler", en : "Cancel", ru : "Отменить"},

    // Maintenance     ru : "Расходы"  
    MAINTENANCE_W : {fr : "Attention : simulateur en beta", en : "Warning : simulator in beta test", ru : "Внимание, симулятор на стадии бета-тестирования"},
    ARMY_POWER :    {fr : "Puissance de l'armée", en : "Army power", ru : "Сила армии"},
    CITY_BUILDING : {fr : "Bâtiment principal", en : "Main building", ru : "Административное здание"},
    LANDLORD :      {fr : "Tavernier", en : "Landlord", ru : "Помещик"},
    MUSE :          {fr : "Égerie légendaire", en : "Legendary Muse", ru : "Муза"},
    FIELDS :        {fr : "Champs", en : "Fields", ru : "Количество полей"},
    SPHINX :        {fr : "Sphinx", en : "Sphinx", ru : "Количество сфинксов"},
    GRAIL :         {fr : "Graal", en : "Grail", ru : "Грааль"},
    CITY_0 :        {fr : "Conseil des Anciens", en : "Village Hall", ru : "Дом старейшин"},
    CITY_1 :        {fr : "Mairie", en : "Town Hall", ru : "Ратуша"},
    CITY_2 :        {fr : "Hôtel de ville", en : "City Hall", ru : "Магистрат"},
    CITY_3 :        {fr : "Capitole", en : "Capitol", ru : "Капитолий"},

    // Options
    MENU_TYPE :     {fr : "Type de menu du script", en : "Script menu type ", ru : "Тип меню скрипта"},
    MENU_TOPBAR :   {fr : "Bandeau (topbar)", en : "Topbar", ru : "Верхняя панель"},
    MENU_FLOAT :    {fr : "Flottant déplaçable", en : "Floating and movable", ru : "Всплывающая и передвижная панель"},
    D_BUYABLE :     {fr : "Afficher les éléments payants", en : "Display buyable elements", ru : "Отображать покупаемые компоненты"},
    D_INFLUENCE :   {fr : "Afficher l'influence des villes", en : "Display cities influence", ru : "Отображать влияние города"},
    D_PANELS :      {fr : "Afficher les alertes sur la carte", en : "Display map alerts", ru : "Отображать оповещения на карте"},
    D_MOVEMENTS :   {fr : "Afficher les trajets déjà parcourus", en : "Display already travelled moves", ru : "Отображать пройденный путь"},
    D_GAMETOLEFT :  {fr : "Décaler le cadre de jeu à gauche", en : "Shift game to left", ru : "Сдвинуть окно игры влево"},
    U_CHAT :        {fr : "Système de discussion", en : "Chat system", ru : "Чат"},
    U_CHAT1 :       {fr : "Système de MMHK-Plus", en : "MMHK-Plus chat system", ru : "Чат MMHK-Plus"},
    U_CHAT2 :       {fr : "Système du jeu amélioré", en : "Improved game chat system", ru : "Улучшенный игровой чат"},
    U_CHAT3 :       {fr : "Système original du jeu", en : "Game chat system", ru : "Игровой чат"},
    U_SPACE :       {fr : "Espace disque utilisé", en : "Disk space used", ru : "Использовано дискового пространства"},
    CLEAN :         {fr : "Nettoyer", en : "Clean", ru : "Очистить"},
    CLEAN_MARKS:    {fr : "Nettoyer les repères", en : "Clean marks", ru : "Очистить пометки"},
    CLEAN_NOTEPAD:  {fr : "Nettoyer les bloc-notes", en : "Clean notepads", ru : "Очистить блокноты"},
    WARNING:        {fr : "Attention", en : "Warning", ru : "Предупреждение"},
    RESTART_GAME:   {fr : "Un redémarrage du jeu est nécessaire.", en : "Please restart the game.", ru : "Пожалуйста, перезапустите игру"},

    // About
    SITE :          {fr : "Site web", en : "Web site", ru : "Сайт скрипта"},
    ABOUT_TEXT :    {fr : "Version courante : " + MMHKPLUS.version + "<br/>"
                            + "Créateur : Aendawyn (<a class='MMHKPLUS_Link' target='_blank' href='mailto:" + MMHKPLUS.contact + "'>" + MMHKPLUS.contact + "</a>) <br/>"
                            + "Un grand merci aux Nains Chatouilleux pour les tests et leur patience!", 
                     en : "Current version : " + MMHKPLUS.version + "<br/>"
                            + "Author : Aendawyn (<a class='MMHKPLUS_Link' target='_blank' href='mailto:" + MMHKPLUS.contact + "'>" + MMHKPLUS.contact + "</a>) <br/>"
                            + "A big Thank You to the 'Nains Chatouilleux' for their patience and for testing this script!",
                     ru : "Текущая версия : " + MMHKPLUS.version + "<br/>"
                            + "Автор : Aendawyn (<a class='MMHKPLUS_Link' target='_blank' href='mailto:" + MMHKPLUS.contact + "'>" + MMHKPLUS.contact + "</a>) <br/>"
                            + "Огромная благодарность 'Nains Chatouilleux' за их терпение и за тестирование этого скрипта!"},
	
	// Chat
	CHAT :  		{fr : "Chat", en : "Chat", ru : "Чат"},
	CHAT_BUTTON :  	{fr : "Dialoguez avec d'autres joueurs!", en : "Chat with other players!", ru : "Общайтесь с другими игроками"},
    NEW_CHAT :      {fr : "Nouv. conv.", en : "New chat", ru : "Новый чат"},
    PLAYER_NAME :   {fr : "Nom du joueur", en : "Player name", ru : "Имя игрока"},
    OPEN :          {fr : "Ouvrir", en : "Ouvrir", ru : "Открыть"},
    ONLINE :        {fr : "En ligne", en : "Online", ru : "Онлайн"}
};

MMHKPLUS.translationsUnits = {
    ACADEMY : {
        T1  : {fr : "Gremlin", en : "Gremlin", ru : "Гремлин"},
        T1P : {fr : "Ingénieur gremlin", en : "Master Gremlin", ru : "Старший гремлин"},
        T2  : {fr : "Gargouille de pierre", en : "Stone Gargoyle", ru : "Каменная горгулья"},
        T2P : {fr : "Gargouille d'obsidienne", en : "Obsidian Gargoyle", ru : "Обсидиановая горгулья"},
        T3  : {fr : "Golem de fer", en : "Iron Golem", ru : "Железный голем"},
        T3P : {fr : "Goldem d'acier", en : "Steel Golem", ru : "Стальной голем"},
        T4  : {fr : "Mage", en : "Mage", ru : "Маг"},
        T4P : {fr : "Archimage", en : "Archmage", ru : "Архимаг"},
        T5  : {fr : "Djinn", en : "Djinn", ru : "Джинн"},
        T5P : {fr : "Sultan djinn", en : "Djinn Sultant", ru : "Султан джиннов"},
        T6  : {fr : "Rani Rakshasa", en : "Rakshasa Rani", ru : "Принцесса ракшас"},
        T6P : {fr : "Raja Rakshasa", en : "Rakshasa Raja", ru : "Раджа ракшас"},
        T7  : {fr : "Géant", en : "Colossus", ru : "Колосс"},
        T7P : {fr : "Titan", en : "Titan", ru : "Титан"},
        T8  : {fr : "Baliste", en : "Ballista", ru : "Баллиста"},
        T8P : {fr : "Catapulte", en : "Catapult", ru : "Катапульта"}
    },

    HAVEN : {
        T1  : {fr : "Payson", en : "Peasant", ru : "Крестьянин"},
        T1P : {fr : "Conscrit", en : "Conscript", ru : "Ополченец"},
        T2  : {fr : "Archer", en : "Archer", ru : "Лучник"},
        T2P : {fr : "Arbalétrier", en : "Marksman", ru : "Арбалетчик"},
        T3  : {fr : "Fantassin", en : "Footman", ru : "Мечник"},
        T3P : {fr : "Champion", en : "Squire", ru : "Латник"},
        T4  : {fr : "Griffon", en : "Griffin", ru : "Грифон"},
        T4P : {fr : "Griffon impérial", en : "Imperial Griffin", ru : "Королевский грифон"},
        T5  : {fr : "Prêtre", en : "Priest", ru : "Монах"},
        T5P : {fr : "Inquisiteur", en : "Inquisitor", ru : "Инквизитор"},
        T6  : {fr : "Cavalier", en : "Cavalier", ru : "Рыцарь"},
        T6P : {fr : "Paladin", en : "Paladin", ru : "Паладин"},
        T7  : {fr : "Ange", en : "Angel", ru : "Ангел"},
        T7P : {fr : "Archange", en : "Archangel", ru : "Архангел"},
        T8  : {fr : "Baliste", en : "Ballista", ru : "Баллиста"},
        T8P : {fr : "Catapulte", en : "Catapult", ru : "Катапульта"}
    },

    INFERNO : {          
        T1  : {fr : "Diablotin", en : "Imp", ru : "Бес"},
        T1P : {fr : "Familier", en : "Familiar", ru : "Черт"},
        T2  : {fr : "Démon cornu", en : "Horned Demon", ru : "Демон"},
        T2P : {fr : "Démon gardien", en : "Horned Overseer", ru : "Огненный демон"},
        T3  : {fr : "Chien des enfers", en : "Hell Hound", ru : "Адская гончая"},
        T3P : {fr : "Cerbère", en : "Cerberus", ru : "Цербер"},
        T4  : {fr : "Succube", en : "Succubus", ru : "Суккуб"},
        T4P : {fr : "Maitresse ssuccube", en : "Succubus Mistress", ru : "Демонесса"},
        T5  : {fr : "Cheval infernal", en : "Hell Charger", ru : "Адский жеребец"},
        T5P : {fr : "Destrier de cauchemar", en : "Nightmare", ru : "Кошмар"},
        T6  : {fr : "Fiélon des abimes", en : "Pit Fiend", ru : "Пещерный демон"},
        T6P : {fr : "Seigneur des abimes", en : "Pit Lord", ru : "Пещерный владыка"},
        T7  : {fr : "Diable", en : "Devil", ru : "Дьявол"},
        T7P : {fr : "Archidiable", en : "Arch Devil", ru : "Архидьявол"},
        T8  : {fr : "Baliste", en : "Ballista", ru : "Баллиста"},
        T8P : {fr : "Catapulte", en : "Catapult", ru : "Катапульта"}
    },

    NECROPOLIS : {
        T1  : {fr : "Squelette", en : "Skeleton", ru : "Костяной воин"},
        T1P : {fr : "Archer squelette", en : "Skeleton Archer", ru : "Костяной лучник"},
        T2  : {fr : "Zombie", en : "Zombie", ru : "Зомби"},
        T2P : {fr : "Zombie pestilentiel", en : "Plague Zombie", ru : "Чумной зомби"},
        T3  : {fr : "Fantôme", en : "Ghost", ru : "Привидение"},
        T3P : {fr : "Spectre", en : "Specter", ru : "Призрак"},
        T4  : {fr : "Vampire", en : "Vampire", ru : "Вампир"},
        T4P : {fr : "Seigneur vampire", en : "Vampire Lord", ru : "Высший вампир"},
        T5  : {fr : "Liche", en : "Lich", ru : "Лич"},
        T5P : {fr : "Archiliche", en : "Archlich", ru : "Архилич"},
        T6  : {fr : "Revenant", en : "Wight", ru : "Умертвие"},
        T6P : {fr : "Apparition", en : "Wraith", ru : "Вестник смерти"},
        T7  : {fr : "Dragon squelette", en : "Bone Dragon", ru : "Костяной дракон"},
        T7P : {fr : "Dragon spectral", en : "Spectral Dragon", ru : "Призрачный дракон"},
        T8  : {fr : "Baliste", en : "Ballista", ru : "Баллиста"},
        T8P : {fr : "Catapulte", en : "Catapult", ru : "Катапульта"}
    },

    SYLVAN : {
        T1  : {fr : "Nymphe", en : "Pixie", ru : "Фея"},
        T1P : {fr : "Dryade", en : "Sprite", ru : "Дриада"},
        T2  : {fr : "Fine-lame", en : "Silver Blade", ru : "Танцующая с клинками"},
        T2P : {fr : "Lame-de-guerre", en : "War Blade", ru : "Танцующая со смертью"},
        T3  : {fr : "Chasseur", en : "Hunter", ru : "Эльфийский лучник"},
        T3P : {fr : "Maitre chasseur", en : "Master Hunter", ru : "Мастер лука"},
        T4  : {fr : "Druide", en : "Druid", ru : "Друид"},
        T4P : {fr : "Druide séculaire", en : "Druid Elder", ru : "Верховный друид"},
        T5  : {fr : "Licorne", en : "Unicorn", ru : "Единорог"},
        T5P : {fr : "Licorne d'argent", en : "Silver Unicorn", ru : "Боевой единорог"},
        T6  : {fr : "Tréant", en : "Treant", ru : "Энт"},
        T6P : {fr : "Tréant séculaire", en : "Ancient Treant", ru : "Древний энт"},
        T7  : {fr : "Dragon vert", en : "Green Dragon", ru : "Зеленый дракон"},
        T7P : {fr : "Dragon d'émeraude", en : "Emerald Dragon", ru : "Изумрудный дракон"},
        T8  : {fr : "Baliste", en : "Ballista", ru : "Баллиста"},
        T8P : {fr : "Catapulte", en : "Catapult", ru : "Катапульта"}
    },

    DUNGEON : {
        T1  : {fr : "Éclaireur", en : "Scout", ru : "Лазутчик"},
        T1P : {fr : "Assassin", en : "Assassin", ru : "Ассасин"},
        T2  : {fr : "Vierge sanglante", en : "Blood Maiden", ru : "Бестия"},
        T2P : {fr : "Furie sanglante", en : "Blood Fury", ru : "Фурия"},
        T3  : {fr : "Minotaure", en : "Minotaur", ru : "Минотавр"},
        T3P : {fr : "Champion minotaure", en : "Minotaur Guard", ru : "Минотавр-страж"},
        T4  : {fr : "Maraudeur noir", en : "Dark Raider", ru : "Наездник на ящерах"},
        T4P : {fr : "Mauraudeur sinistre", en : "Grim Raider", ru : "Темный всадник"},
        T5  : {fr : "Hydre", en : "Hydra", ru : "Гидра"},
        T5P : {fr : "Hydre des abysses", en : "Deep Hydra", ru : "Пещерная гидра"},
        T6  : {fr : "Sorcière de l'ombre", en : "Shadow Witch", ru : "Сумеречная ведьма"},
        T6P : {fr : "Matriarche de l'ombre", en : "Shadow Matriarch", ru : "Владычица тени"},
        T7  : {fr : "Dragon d'ombre", en : "Shadow Dragon", ru : "Сумеречный дракон"},
        T7P : {fr : "Dragon noir", en : "Black Dragon", ru : "Черный дракон"},
        T8  : {fr : "Baliste", en : "Ballista", ru : "Баллиста"},
        T8P : {fr : "Catapulte", en : "Catapult", ru : "Катапульта"}
    },

    DWELLING : {
        T1  : {fr : "Défenseur", en : "Defender", ru : "Защитник гор"},
        T1P : {fr : "Garde bouclier", en : "Shieldguard", ru : "Воитель"},
        T2  : {fr : "Manieur de lance", en : "Spearwielder", ru : "Метатель копья"},
        T2P : {fr : "Escarmoucheur", en : "Skirmisher", ru : "Мастер копья"},
        T3  : {fr : "Chevaucheur d'ours", en : "Bear Rider", ru : "Наездник на медведях"},
        T3P : {fr : "Chevaucheur d'ours noir", en : "Blackbear Rider", ru : "Хозяин медведей"},
        T4  : {fr : "Batailleur", en : "Brawler", ru : "Костолом"},
        T4P : {fr : "Berserker", en : "Berserker", ru : "Берсерк"},
        T5  : {fr : "Prêtre des runes", en : "Rune Priest", ru : "Жрец Рун"},
        T5P : {fr : "Patriarche des runes", en : "Rune Patriarch", ru : "Жрец Арката"},
        T6  : {fr : "Thane", en : "Thane", ru : "Тан"},
        T6P : {fr : "Seigneur des tempêtes", en : "Warlord", ru : "Ярл"},
        T7  : {fr : "Dragon de feu", en : "Fire Dragon", ru : "Огненный дракон"},
        T7P : {fr : "Dragon de magma", en : "Magma Dragon", ru : "Лавовый дракон"},
        T8  : {fr : "Baliste", en : "Ballista", ru : "Баллиста"},
        T8P : {fr : "Catapulte", en : "Catapult", ru : "Катапульта"}
    },

    NEUTRAL : {
        WIND : {fr : "Élémentaire d'air", en : "Wind Elemental", ru : "Воздушный элементаль"},
        WATER : {fr : "Élémentaire d'eau", en : "Water Elemental", ru : "Водный элементаль"},
        EARTH : {fr : "Élémentaire de terre", en : "Earth Elemental", ru : "Земной элементаль"},
        FIRE : {fr : "Élémentaire de feu", en : "Fire Elemental", ru : "Огненный элементаль"},
        DEATHKNIGHT : {fr : "Chevalier de la mort", en : "Death Knight", ru : "Рыцарь смерти"},
        GNOMESHOOTER : {fr : "Tireur gnome", en : "Gnome shooter", ru : "[en] Gnome shooter"},
        GNOME : {fr : "Gnome", en : "Gnome", ru : "[en] Gnome"},
        WOLF : {fr : "Loup", en : "Wolf", ru : "Волк"},
        CENTAURI : {fr : "Centaure", en : "Centauri", ru : "Кентавр"},
        WANDERINGGHOST : {fr : "Fantôme errant", en : "Wandering Ghost", ru : "[en] Wandering Ghost"},
        MANTICORE : {fr : "Manticore", en : "Manticore", ru : "Мантикора"},
        MINOTAUR : {fr : "Minotaure", en : "Minotaur", ru : "Минотавр"},
        HIGHDRUID : {fr : "haut druide", en : "High druid", ru : "[en] High druid"},
        WHITEUNICORN : {fr : "Licorne blanche", en : "White unicorn", ru : "[en] White unicorn"},
        ANGERTREANT : {fr : "Tréant coléreux", en : "Anger treant", ru : "[en] Anger treant"}
    }
};

MMHKPLUS.translationsText = [
    {fr : "Aucun", en : "None", ru : "Ничего"},
    {fr : "Aucune", en : "None", ru : "Ничего"},
    {fr : "Fortin", en : "Fort", ru : "Форт"},
    {fr : "Citadelle", en : "Citadel", ru : "Цитадель"},
    {fr : "Château", en : "Castle", ru : "Замок"},

    {fr : "Mine d'or", en : "Gold mine", ru : "Золотая шахта"},
    {fr : "Mine de minerai", en : "Ore mine", ru : "Рудная шахта"},
    {fr : "Scierie", en : "Wood mine", ru : "Лесопилка"},
    {fr : "Mine de gemmes", en : "Gem mine", ru : "Самоцветная шахта"},
    {fr : "Mine de soufre", en : "Sulfur mine", ru : "Серная шахта"},
    {fr : "Mine de cristaux", en : "Crystal mine", ru : "Кристальная шахта"},
    {fr : "mine de mercure", en : "Mercury mine", ru : "Ртутная шахта"},

    {fr : "Conseil du village", en : "Village Hall", ru : "Дом старейшин"},
    {fr : "Mairie", en : "Town Hall", ru : "Ратуша"},
    {fr : "Hôtel de ville", en : "City Hall", ru : "Магистрат"},
    {fr : "Capitole", en : "Capitol", ru : "Капитолий"},
    {fr : "Nef céleste", en : "Skyship", ru : "Небесный корабль"},
    {fr : "Taverne", en : "Tavern", ru : "Таверна"},
    {fr : "Forge", en : "Blacksmith", ru : "Кузница"},
    {fr : "Forge de guerre", en : "Advanced Blacksmith", ru : "Улучшенная кузница"},
    {fr : "Marché", en : "Marketplace", ru : "Рынок"},
    {fr : "Silo à ressources niveau 1", en : "Resource Silo Level 1", ru : "Склад 1 уровня"},
    {fr : "Silo à ressources niveau 2", en : "Resource Silo Level 2", ru : "Склад 2 уровня"},
    {fr : "Silo à ressources niveau 3", en : "Resource Silo Level 3", ru : "Склад 3 уровня"},
    {fr : "Silo à ressources niveau 4", en : "Resource Silo Level 4", ru : "Склад 4 уровня"},
    {fr : "Silo à ressources niveau 5", en : "Resource Silo Level 5", ru : "Склад 5 уровня"},
    {fr : "Silo à ressources niveau 6", en : "Resource Silo Level 6", ru : "Склад 6 уровня"},
    {fr : "Silo à ressources niveau 7", en : "Resource Silo Level 7", ru : "Склад 7 уровня"},
    {fr : "Silo à ressources niveau 8", en : "Resource Silo Level 8", ru : "Склад 8 уровня"},
    {fr : "Silo à ressources niveau 9", en : "Resource Silo Level 9", ru : "Склад 9 уровня"},
    {fr : "Silo à ressources niveau 10", en : "Resource Silo Level 10", ru : "Склад 10 уровня"},
    {fr : "Atelier des gremlins", en : "Gremlin Workshop", ru : "Мастерская гремлинов"},
    {fr : "Manufacture des gremlins", en : "Gremlin Manufactory", ru : "Мануфактура гремлинов"},
    {fr : "Parapet de pierre", en : "Stone Parapet", ru : "Каменный парапет"},
    {fr : "Parapet d'obsidienne", en : "Obsidian Parapet", ru : "Обсидиановый парапет"},
    {fr : "Forge de golems", en : "Golem Forge", ru : "Кузница големов"},
    {fr : "Fonderie de golems", en : "Golem Foundry", ru : "Литейный цех"},
    {fr : "Tour des mages", en : "Mage Tower", ru : "Башня магов"},
    {fr : "Tour des archimages", en : "Archmage Tower", ru : "Башня архимагов"},
    {fr : "Autel des voeux", en : "Altar of Wishes", ru : "Алтарь желаний"},
    {fr : "Autel des vœux", en : "Altar of Wishes", ru : "Алтарь желаний"},
    {fr : "Pinacle des voeux", en : "Pinnacle of Wishes", ru : "Башенка желаний"},
    {fr : "Pinacle des vœux", en : "Pinnacle of Wishes", ru : "Башенка желаний"},
    {fr : "Caverne au trésor", en : "Treasure Cave", ru : "Пещера сокровищ"},
    {fr : "Pavillon d'argent", en : "Silver Pavilion", ru : "Серебряный павильон"},
    {fr : "Pavillon d'or", en : "Golden Pavilion", ru : "Золотой павильон"},
    {fr : "Colisée des nuages", en : "Cloud Coliseum", ru : "Облачный храм"},
    {fr : "Colisée des tempêtes", en : "Thundercloud Coliseum", ru : "Храм грозы"},
    {fr : "Guilde des mages niveau 1", en : "Magic Guild Level 1", ru : "Гильдия магов 1 уровня"},
    {fr : "Guilde des mages niveau 2", en : "Magic Guild Level 2", ru : "Гильдия магов 2 уровня"},
    {fr : "Guilde des mages niveau 3", en : "Magic Guild Level 3", ru : "Гильдия магов 3 уровня"},
    {fr : "Guilde des mages niveau 4", en : "Magic Guild Level 4", ru : "Гильдия магов 4 уровня"},
    {fr : "Guilde des mages niveau 5", en : "Magic Guild Level 5", ru : "Гильдия магов 5 уровня"},
    {fr : "Sentinelle d'Elrath", en : "Elrath's Sentinel", ru : "Часовой Эльрата"},
    {fr : "Huttes de paysans", en : "Peasant Huts", ru : "Крестьянские хижины"},
    {fr : "Chaumières de paysans", en : "Peasant Cabins", ru : "Крестьянские дома"},
    {fr : "Fermes", en : "Farms", ru : "Фермы"},
    {fr : "Tour des archers", en : "Archer Tower", ru : "Башня лучников"},
    {fr : "Tour des arbalétriers", en : "Marksman Tower", ru : "Башня арбалетчиков"},
    {fr : "Caserne", en : "Barracks", ru : "Казармы"},
    {fr : "Garnison", en : "Garrison", ru : "Гарнизон"},
    {fr : "Tour des griffons", en : "Griffin Tower", ru : "Башня грифонов"},
    {fr : "Bastion des griffons", en : "Griffin Bastion", ru : "Бастион грифонов"},
    {fr : "Monastère", en : "Monastery", ru : "Монастырь"},
    {fr : "Cathédrale", en : "Cathedral", ru : "Собор"},
    {fr : "Lice", en : "Jousting Arena", ru : "Рыцарская арена"},
    {fr : "Ordre des paladins", en : "Order of paladins", ru : "Орден паладинов"},
    {fr : "Autel de la Lumière", en : "Altar of Light", ru : "Алтарь света"},
    {fr : "Autel des Cieux", en : "Altar of Heaven", ru : "Небесный алтарь"},
    {fr : "Maitre des supplices", en : "Lord of Torments", ru : "Владыка страданий"},
    {fr : "Creuset de diablotins", en : "Imp Crucible", ru : "Котел бесов"},
    {fr : "Creuset de familiers", en : "Familiar Crucible", ru : "Котел чертей"},
    {fr : "Tour des cornus", en : "Demon Tower", ru : "Дьявольская башня"},
    {fr : "Bastion des cornus", en : "Demon Bastion", ru : "Бастион ада"},
    {fr : "Chenils", en : "Howling Kennels", ru : "Адская псарня"},
    {fr : "Chenils corrompus", en : "Raging Kennels", ru : "Псарня церберов"},
    {fr : "Hall des tentations", en : "Hall of Temptations", ru : "Залы искушений"},
    {fr : "Hall des péchés", en : "Hall of Sins", ru : "Залы греха"},
    {fr : "Ecuries infernales", en : "Burning Stables", ru : "Огненные конюшни"},
    {fr : "Ecuries de cauchemar", en : "Blazing Stables", ru : "Пылающие конюшни"},
    {fr : "Hall des horreurs", en : "Halls of Horror", ru : "Залы ужаса"},
    {fr : "Antichambre des abimes", en : "Heart of the Pit", ru : "Пылающий разлом"},
    {fr : "Coeur des abimes", en : "Heart of the Abyss", ru : "Сердце Бездны"},
    {fr : "Cœur des abimes", en : "Heart of the Abyss", ru : "Сердце Бездны"},
    {fr : "Palais des tourments", en : "Temple of the Fallen", ru : "Храм Падших"},
    {fr : "Palais des tortures", en : "Temple of the Forsaken", ru : "Храм Покинутых"},
    {fr : "Tombeau des maudits", en : "Tomb of the Lost", ru : "Могила Забытого"},
    {fr : "Cimetière", en : "Graveyard", ru : "Погост"},
    {fr : "Ossuaire", en : "Boneyard", ru : "Кладбище"},
    {fr : "Tombes profanées", en : "Unearthed Graves", ru : "Разоренные могилы"},
    {fr : "Crypte", en : "Crypt", ru : "Склеп"},
    {fr : "Crypte putride", en : "Festering Crypt", ru : "Проклятый склеп"},
    {fr : "Tour en ruines", en : "Ruined Tower", ru : "Разрушенная башня"},
    {fr : "Tour hantée", en : "Haunted Tower", ru : "Башня духов"},
    {fr : "Manoir des vampires", en : "Vampire Mansion", ru : "Особняк вампиров"},
    {fr : "Château de vampire", en : "Vampire Palace", ru : "Поместье вампиров"},
    {fr : "Caveau", en : "Sepulcher", ru : "Усыпальница"},
    {fr : "Mausolée", en : "Mausoleum", ru : "Мавзолей"},
    {fr : "Hall des lamentations", en : "Forlorn Hall", ru : "Покинутый замок"},
    {fr : "Cathédrale des lamentations", en : "Forlorn Cathedral", ru : "Покинутый собор"},
    {fr : "Cimetière des dragons", en : "Dragon Graveyard", ru : "Кладбище драконов"},
    {fr : "Sépulcre des dragons", en : "Dragon Vault", ru : "Гробница драконов"},
    {fr : "Fille de Sylanna", en : "Daughter of Sylanna", ru : "Дочь Силанны"},
    {fr : "Arbre des fées", en : "The Faerie Trees", ru : "Деревья фей"},
    {fr : "Bois des fées", en : "Faerie Wood", ru : "Волшебный лес"},
    {fr : "Terrasse de la lame dansante", en : "Battledance Terrace", ru : "Площадка боевого танца"},
    {fr : "Arène de la lame dansante", en : "Battledance Arena", ru : "Арена боевого танца"},
    {fr : "Loge de chasse", en : "Hunters Cabins", ru : "Дома на деревьях"},
    {fr : "Pavillon de chasse", en : "Hunter Lodges", ru : "Высокие чертоги"},
    {fr : "Cercle des pierres", en : "Stone Ring", ru : "Стоунхендж"},
    {fr : "Cromlech", en : "Stone Circle", ru : "Круг камней"},
    {fr : "Clairière des licornes", en : "Unicorn Glade", ru : "Поляна единорогов"},
    {fr : "Jardin des licornes", en : "Unicorn Garden", ru : "Сад единорогов"},
    {fr : "Arche de tréant", en : "Treant Arches", ru : "Своды энтов"},
    {fr : "Alcôve de tréant", en : "Treant Alcove", ru : "Альковы энтов"},
    {fr : "Pousses de tréant", en : "Treant Saplings", ru : "Саженцы энтов"},
    {fr : "Autel des dragons", en : "Dragon Altar", ru : "Алтарь драконов"},
    {fr : "Sanctuaire des dragons", en : "Dragon Shrine", ru : "Святилище драконов"},

    {fr : "Mage des arcanes", en : "Arcane mage", ru : "Искатель знаний"},
    {fr : "Magicien dérangé", en : "Disturbed Wizard", ru : "Безумный маг"},
    {fr : "Sorcier fanatique", en : "Fanatic Sorcerer", ru : "Чародей-фанатик"},
    {fr : "Protecteur illuminé", en : "Illuminated Protector", ru : "Преданый защитник"},
    {fr : "Mercenaire", en : "Mercenary", ru : "Наемник"},
    {fr : "Guerrier des confins", en : "Outland Warrior", ru : "Воин пустошей"},
    {fr : "Baron", en : "Paladin", ru : "Паладин"},
    {fr : "Guerrier d'arène", en : "Pit Warrior", ru : "Воин Бездны"},
    {fr : "Protecteur", en : "Protector", ru : "Защитник"},
    {fr : "Mage de guerre", en : "Warmage", ru : "Боевой маг"},
    {fr : "Maître de guerre", en : "Warmaster", ru : "Мастер оружия"},
    {fr : "Mage guerrier", en : "Warrior Mage", ru : "Воин-маг"},
    {fr : "Sénéchal", en : "Senachal", ru : "Сенешаль"},
    {fr : "Magicien assagi", en : "Sobered Wizard", ru : "Мудрый волшебник"},
    {fr : "Explorateur", en : "Explorer", ru : "Первооткрыватель"}
];MMHKPLUS.css = [
	// jQuery UI
	'.ui-helper-hidden { display: none; } .ui-helper-hidden-accessible { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; } .ui-helper-reset { margin: 0; padding: 0; border: 0; outline: 0; line-height: 1.3; text-decoration: none; font-size: 100%; list-style: none; } .ui-helper-clearfix:before, .ui-helper-clearfix:after { content: ""; display: table; } .ui-helper-clearfix:after { clear: both; } .ui-helper-clearfix { zoom: 1; } .ui-helper-zfix { width: 100%; height: 100%; top: 0; left: 0; position: absolute; opacity: 0; filter:Alpha(Opacity=0); }    .ui-state-disabled { cursor: default !important; }      .ui-icon { display: block; text-indent: -99999px; overflow: hidden; background-repeat: no-repeat; }    .ui-widget-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } .ui-resizable { position: relative;} .ui-resizable-handle { position: absolute;font-size: 0.1px; display: block; } .ui-resizable-disabled .ui-resizable-handle, .ui-resizable-autohide .ui-resizable-handle { display: none; } .ui-resizable-n { cursor: n-resize; height: 7px; width: 100%; top: -5px; left: 0; } .ui-resizable-s { cursor: s-resize; height: 7px; width: 100%; bottom: -5px; left: 0; } .ui-resizable-e { cursor: e-resize; width: 7px; right: -5px; top: 0; height: 100%; } .ui-resizable-w { cursor: w-resize; width: 7px; left: -5px; top: 0; height: 100%; } .ui-resizable-se { cursor: se-resize; width: 12px; height: 12px; right: 1px; bottom: 1px; } .ui-resizable-sw { cursor: sw-resize; width: 9px; height: 9px; left: -5px; bottom: -5px; } .ui-resizable-nw { cursor: nw-resize; width: 9px; height: 9px; left: -5px; top: -5px; } .ui-resizable-ne { cursor: ne-resize; width: 9px; height: 9px; right: -5px; top: -5px;}.ui-selectable-helper { position: absolute; z-index: 100; border:1px dotted black; } .ui-accordion .ui-accordion-header { display: block; cursor: pointer; position: relative; margin-top: 2px; padding: .5em .5em .5em .7em; zoom: 1; } .ui-accordion .ui-accordion-icons { padding-left: 2.2em; } .ui-accordion .ui-accordion-noicons { padding-left: .7em; } .ui-accordion .ui-accordion-icons .ui-accordion-icons { padding-left: 2.2em; } .ui-accordion .ui-accordion-header .ui-accordion-header-icon { position: absolute; left: .5em; top: 50%; margin-top: -8px; } .ui-accordion .ui-accordion-content { padding: 1em 2.2em; border-top: 0; overflow: auto; zoom: 1; } .ui-autocomplete { 	position: absolute; 	top: 0; 	left: 0; 	cursor: default; }   * html .ui-autocomplete { width:1px; } /* without this, the menu expands to 100% in IE6 */ .ui-button { display: inline-block; position: relative; padding: 0; margin-right: .1em; cursor: pointer; text-align: center; zoom: 1; overflow: visible; } /* the overflow property removes extra width in IE */ .ui-button, .ui-button:link, .ui-button:visited, .ui-button:hover, .ui-button:active { text-decoration: none; } .ui-button-icon-only { width: 2.2em; } /* to make room for the icon, a width needs to be set here */ button.ui-button-icon-only { width: 2.4em; } /* button elements seem to need a little more width */ .ui-button-icons-only { width: 3.4em; }  button.ui-button-icons-only { width: 3.7em; }    .ui-button .ui-button-text { display: block; line-height: 1.4;  } .ui-button-text-only .ui-button-text { padding: .1em 1em; } .ui-button-icon-only .ui-button-text, .ui-button-icons-only .ui-button-text { padding: .4em; text-indent: -9999999px; } .ui-button-text-icon-primary .ui-button-text, .ui-button-text-icons .ui-button-text { padding: .4em 1em .4em 2.1em; } .ui-button-text-icon-secondary .ui-button-text, .ui-button-text-icons .ui-button-text { padding: .4em 2.1em .4em 1em; } .ui-button-text-icons .ui-button-text { padding-left: 2.1em; padding-right: 2.1em; }  input.ui-button { padding: .4em 1em; }   .ui-button-icon-only .ui-icon, .ui-button-text-icon-primary .ui-icon, .ui-button-text-icon-secondary .ui-icon, .ui-button-text-icons .ui-icon, .ui-button-icons-only .ui-icon { position: absolute; top: 50%; margin-top: -8px; } .ui-button-icon-only .ui-icon { left: 50%; margin-left: -8px; } .ui-button-text-icon-primary .ui-button-icon-primary, .ui-button-text-icons .ui-button-icon-primary, .ui-button-icons-only .ui-button-icon-primary { left: .5em; } .ui-button-text-icon-secondary .ui-button-icon-secondary, .ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary { right: .5em; } .ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary { right: .5em; }   .ui-buttonset { margin-right: 7px; } .ui-buttonset .ui-button { margin-left: 0; margin-right: -.3em; }   button.ui-button::-moz-focus-inner { border: 0; padding: 0; } /* reset extra padding in Firefox */ .ui-datepicker { width: 17em; padding: .2em .2em 0; display: none; } .ui-datepicker .ui-datepicker-header { position:relative; padding:.2em 0; } .ui-datepicker .ui-datepicker-prev, .ui-datepicker .ui-datepicker-next { position:absolute; top: 2px; width: 1.8em; height: 1.8em; } .ui-datepicker .ui-datepicker-prev-hover, .ui-datepicker .ui-datepicker-next-hover { top: 1px; } .ui-datepicker .ui-datepicker-prev { left:2px; } .ui-datepicker .ui-datepicker-next { right:2px; } .ui-datepicker .ui-datepicker-prev-hover { left:1px; } .ui-datepicker .ui-datepicker-next-hover { right:1px; } .ui-datepicker .ui-datepicker-prev span, .ui-datepicker .ui-datepicker-next span { display: block; position: absolute; left: 50%; margin-left: -8px; top: 50%; margin-top: -8px;  } .ui-datepicker .ui-datepicker-title { margin: 0 2.3em; line-height: 1.8em; text-align: center; } .ui-datepicker .ui-datepicker-title select { font-size:1em; margin:1px 0; } .ui-datepicker select.ui-datepicker-month-year {width: 100%;} .ui-datepicker select.ui-datepicker-month,  .ui-datepicker select.ui-datepicker-year { width: 49%;} .ui-datepicker table {width: 100%; font-size: .9em; border-collapse: collapse; margin:0 0 .4em; } .ui-datepicker th { padding: .7em .3em; text-align: center; font-weight: bold; border: 0;  } .ui-datepicker td { border: 0; padding: 1px; } .ui-datepicker td span, .ui-datepicker td a { display: block; padding: .2em; text-align: right; text-decoration: none; } .ui-datepicker .ui-datepicker-buttonpane { background-image: none; margin: .7em 0 0 0; padding:0 .2em; border-left: 0; border-right: 0; border-bottom: 0; } .ui-datepicker .ui-datepicker-buttonpane button { float: right; margin: .5em .2em .4em; cursor: pointer; padding: .2em .6em .3em .6em; width:auto; overflow:visible; } .ui-datepicker .ui-datepicker-buttonpane button.ui-datepicker-current { float:left; }   .ui-datepicker.ui-datepicker-multi { width:auto; } .ui-datepicker-multi .ui-datepicker-group { float:left; } .ui-datepicker-multi .ui-datepicker-group table { width:95%; margin:0 auto .4em; } .ui-datepicker-multi-2 .ui-datepicker-group { width:50%; } .ui-datepicker-multi-3 .ui-datepicker-group { width:33.3%; } .ui-datepicker-multi-4 .ui-datepicker-group { width:25%; } .ui-datepicker-multi .ui-datepicker-group-last .ui-datepicker-header { border-left-width:0; } .ui-datepicker-multi .ui-datepicker-group-middle .ui-datepicker-header { border-left-width:0; } .ui-datepicker-multi .ui-datepicker-buttonpane { clear:left; } .ui-datepicker-row-break { clear:both; width:100%; font-size:0em; }   .ui-datepicker-rtl { direction: rtl; } .ui-datepicker-rtl .ui-datepicker-prev { right: 2px; left: auto; } .ui-datepicker-rtl .ui-datepicker-next { left: 2px; right: auto; } .ui-datepicker-rtl .ui-datepicker-prev:hover { right: 1px; left: auto; } .ui-datepicker-rtl .ui-datepicker-next:hover { left: 1px; right: auto; } .ui-datepicker-rtl .ui-datepicker-buttonpane { clear:right; } .ui-datepicker-rtl .ui-datepicker-buttonpane button { float: left; } .ui-datepicker-rtl .ui-datepicker-buttonpane button.ui-datepicker-current { float:right; } .ui-datepicker-rtl .ui-datepicker-group { float:right; } .ui-datepicker-rtl .ui-datepicker-group-last .ui-datepicker-header { border-right-width:0; border-left-width:1px; } .ui-datepicker-rtl .ui-datepicker-group-middle .ui-datepicker-header { border-right-width:0; border-left-width:1px; }   .ui-datepicker-cover {     position: absolute; /*must have*/     z-index: -1; /*must have*/     filter: mask(); /*must have*/     top: -4px; /*must have*/     left: -4px; /*must have*/     width: 200px; /*must have*/     height: 200px; /*must have*/ }.ui-dialog { position: absolute; top: 0; left: 0; padding: .2em; width: 300px; overflow: hidden; } .ui-dialog .ui-dialog-titlebar { padding: .4em 1em; position: relative;  } .ui-dialog .ui-dialog-title { float: left; margin: .1em 16px .1em 0; } .ui-dialog .ui-dialog-titlebar-close { position: absolute; right: .3em; top: 50%; width: 19px; margin: -10px 0 0 0; padding: 1px; height: 18px; } .ui-dialog .ui-dialog-titlebar-close span { display: block; margin: 1px; } .ui-dialog .ui-dialog-titlebar-close:hover, .ui-dialog .ui-dialog-titlebar-close:focus { padding: 0; } .ui-dialog .ui-dialog-content { position: relative; border: 0; padding: .5em 1em; overflow: auto; zoom: 1; } .ui-dialog .ui-dialog-buttonpane { text-align: left; border-width: 1px 0 0 0; background-image: none; margin: .5em 0 0 0; padding: .3em 1em .5em .4em; } .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset { float: right; } .ui-dialog .ui-dialog-buttonpane button { margin: .5em .4em .5em 0; cursor: pointer; } .ui-dialog .ui-resizable-se { width: 14px; height: 14px; right: 3px; bottom: 3px; } .ui-draggable .ui-dialog-titlebar { cursor: move; } .ui-menu { list-style:none; padding: 2px; margin: 0; display:block; outline: none; } .ui-menu .ui-menu { margin-top: -3px; position: absolute; } .ui-menu .ui-menu-item { margin: 0; padding: 0; zoom: 1; width: 100%; } .ui-menu .ui-menu-divider { margin: 5px -2px 5px -2px; height: 0; font-size: 0; line-height: 0; border-width: 1px 0 0 0; } .ui-menu .ui-menu-item a { text-decoration: none; display: block; padding: 2px .4em; line-height: 1.5; zoom: 1; font-weight: normal; } .ui-menu .ui-menu-item a.ui-state-focus, .ui-menu .ui-menu-item a.ui-state-active { font-weight: normal; margin: -1px; }  .ui-menu .ui-state-disabled { font-weight: normal; margin: .4em 0 .2em; line-height: 1.5; } .ui-menu .ui-state-disabled a { cursor: default; }   .ui-menu-icons { position: relative; } .ui-menu-icons .ui-menu-item a { position: relative; padding-left: 2em; }   .ui-menu .ui-icon { position: absolute; top: .2em; left: .2em; }   .ui-menu .ui-menu-icon { position: static; float: right; } .ui-progressbar { height:2em; text-align: left; overflow: hidden; } .ui-progressbar .ui-progressbar-value {margin: -1px; height:100%; }.ui-slider { position: relative; text-align: left; } .ui-slider .ui-slider-handle { position: absolute; z-index: 2; width: 1.2em; height: 1.2em; cursor: default; } .ui-slider .ui-slider-range { position: absolute; z-index: 1; font-size: .7em; display: block; border: 0; background-position: 0 0; }  .ui-slider-horizontal { height: .8em; } .ui-slider-horizontal .ui-slider-handle { top: -.3em; margin-left: -.6em; } .ui-slider-horizontal .ui-slider-range { top: 0; height: 100%; } .ui-slider-horizontal .ui-slider-range-min { left: 0; } .ui-slider-horizontal .ui-slider-range-max { right: 0; }  .ui-slider-vertical { width: .8em; height: 100px; } .ui-slider-vertical .ui-slider-handle { left: -.3em; margin-left: 0; margin-bottom: -.6em; } .ui-slider-vertical .ui-slider-range { left: 0; width: 100%; } .ui-slider-vertical .ui-slider-range-min { bottom: 0; } .ui-slider-vertical .ui-slider-range-max { top: 0; }.ui-spinner { position:relative; display: inline-block; overflow: hidden; padding: 0; vertical-align: middle; } .ui-spinner-input { border: none; background: none; padding: 0; margin: .2em 0; vertical-align: middle; margin-left: .4em; margin-right: 22px; } .ui-spinner-button { width: 16px; height: 50%; font-size: .5em; padding: 0; margin: 0; text-align: center; position: absolute; cursor: default; display: block; overflow: hidden; right: 0; } .ui-spinner a.ui-spinner-button { border-top: none; border-bottom: none; border-right: none; } /* more specificity required here to overide default borders */ .ui-spinner .ui-icon { position: absolute; margin-top: -8px; top: 50%; left: 0; } /* vertical centre icon */ .ui-spinner-up { top: 0; } .ui-spinner-down { bottom: 0; }   .ui-spinner .ui-icon-triangle-1-s { 	/* need to fix icons sprite */ 	background-position:-65px -16px; } .ui-tabs { position: relative; padding: .2em; zoom: 1; } /* position: relative prevents IE scroll bug (element with position: relative inside container with overflow: auto appear as "fixed") */ .ui-tabs .ui-tabs-nav { margin: 0; padding: .2em .2em 0; } .ui-tabs .ui-tabs-nav li { list-style: none; float: left; position: relative; top: 0; margin: 1px .2em 0 0; border-bottom: 0; padding: 0; white-space: nowrap; } .ui-tabs .ui-tabs-nav li a { float: left; padding: .5em 1em; text-decoration: none; } .ui-tabs .ui-tabs-nav li.ui-tabs-active { margin-bottom: -1px; padding-bottom: 1px; } .ui-tabs .ui-tabs-nav li.ui-tabs-active a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-tabs-loading a { cursor: text; } .ui-tabs .ui-tabs-nav li a, .ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-active a { cursor: pointer; } /* first selector in group seems obsolete, but required to overcome bug in Opera applying cursor: text overall if defined elsewhere... */ .ui-tabs .ui-tabs-panel { display: block; border-width: 0; padding: 1em 1.4em; background: none; } .ui-tooltip { 	padding: 8px; 	position: absolute; 	z-index: 9999; 	max-width: 300px; 	-webkit-box-shadow: 0 0 5px #aaa; 	box-shadow: 0 0 5px #aaa; } /* Fades and background-images dont work well together in IE6, drop the image */ * html .ui-tooltip { 	background-image: none; } body .ui-tooltip { border-width: 2px; }  /* Component containers ----------------------------------*/ .ui-widget { font-family: Verdana,Arial,sans-serif; font-size: 1.0em; } .ui-widget .ui-widget { font-size: 0.9em; } .ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button { font-family: Verdana,Arial,sans-serif; font-size: 0.9em; } .ui-widget-content { border: 1px solid #555555; background: rgba(0, 0, 0, 0.90); color: #ffffff; } .ui-widget-content a { color: #ffffff; } .ui-widget-header { border: 1px solid #333333; background: #444444 url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-bg_highlight-soft_44_444444_1x100.png) 50% 50% repeat-x; color: #ffffff; font-weight: bold; } .ui-widget-header a { color: #ffffff; }  /* Interaction states ----------------------------------*/ .ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default { border: 1px solid #444444; background: #222222 url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-bg_highlight-soft_35_222222_1x100.png) 50% 50% repeat-x; font-weight: normal; color: #eeeeee; } .ui-state-default a, .ui-state-default a:link, .ui-state-default a:visited { color: #eeeeee; text-decoration: none; } .ui-state-hover, .ui-widget-content .ui-state-hover, .ui-widget-header .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus, .ui-widget-header .ui-state-focus { border: 1px solid #0b93d5; background: #003147 url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-bg_highlight-soft_33_003147_1x100.png) 50% 50% repeat-x; font-weight: normal; color: #ffffff; } .ui-state-hover a, .ui-state-hover a:hover, .ui-state-hover a:link, .ui-state-hover a:visited { color: #ffffff; text-decoration: none; } .ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active { border: 1px solid #26b3f7; background: #0972a5 url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-bg_highlight-hard_20_0972a5_1x100.png) 50% 50% repeat-x; font-weight: normal; color: #ffffff; } .ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited { color: #ffffff; text-decoration: none; }  /* Interaction Cues ----------------------------------*/ .ui-state-highlight, .ui-widget-content .ui-state-highlight, .ui-widget-header .ui-state-highlight  {border: 1px solid #cccccc; background: #eeeeee url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-bg_highlight-soft_80_eeeeee_1x100.png) 50% top repeat-x; color: #2e7db2; } .ui-state-highlight a, .ui-widget-content .ui-state-highlight a,.ui-widget-header .ui-state-highlight a { color: #2e7db2; } .ui-state-error, .ui-widget-content .ui-state-error, .ui-widget-header .ui-state-error {border: 1px solid #ffb73d; background: #ffc73d url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-bg_glass_40_ffc73d_1x400.png) 50% 50% repeat-x; color: #111111; } .ui-state-error a, .ui-widget-content .ui-state-error a, .ui-widget-header .ui-state-error a { color: #111111; } .ui-state-error-text, .ui-widget-content .ui-state-error-text, .ui-widget-header .ui-state-error-text { color: #111111; } .ui-priority-primary, .ui-widget-content .ui-priority-primary, .ui-widget-header .ui-priority-primary { font-weight: bold; } .ui-priority-secondary, .ui-widget-content .ui-priority-secondary,  .ui-widget-header .ui-priority-secondary { opacity: .7; filter:Alpha(Opacity=70); font-weight: normal; } .ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled { opacity: .35; filter:Alpha(Opacity=35); background-image: none; } .ui-state-disabled .ui-icon { filter:Alpha(Opacity=35); } /* For IE8 - See #6059 */  /* Icons ----------------------------------*/  /* states and images */ .ui-icon { width: 16px; height: 16px; background-image: url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-icons_cccccc_256x240.png); } .ui-widget-content .ui-icon {background-image: url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-icons_cccccc_256x240.png); } .ui-widget-header .ui-icon {background-image: url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-icons_ffffff_256x240.png); } .ui-state-default .ui-icon { background-image: url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-icons_cccccc_256x240.png); } .ui-state-hover .ui-icon, .ui-state-focus .ui-icon {background-image: url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-icons_ffffff_256x240.png); } .ui-state-active .ui-icon {background-image: url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-icons_222222_256x240.png); } .ui-state-highlight .ui-icon {background-image: url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-icons_4b8e0b_256x240.png); } .ui-state-error .ui-icon, .ui-state-error-text .ui-icon {background-image: url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-icons_a83300_256x240.png); }  /* positioning */ .ui-icon-carat-1-n { background-position: 0 0; } .ui-icon-carat-1-ne { background-position: -16px 0; } .ui-icon-carat-1-e { background-position: -32px 0; } .ui-icon-carat-1-se { background-position: -48px 0; } .ui-icon-carat-1-s { background-position: -64px 0; } .ui-icon-carat-1-sw { background-position: -80px 0; } .ui-icon-carat-1-w { background-position: -96px 0; } .ui-icon-carat-1-nw { background-position: -112px 0; } .ui-icon-carat-2-n-s { background-position: -128px 0; } .ui-icon-carat-2-e-w { background-position: -144px 0; } .ui-icon-triangle-1-n { background-position: 0 -16px; } .ui-icon-triangle-1-ne { background-position: -16px -16px; } .ui-icon-triangle-1-e { background-position: -32px -16px; } .ui-icon-triangle-1-se { background-position: -48px -16px; } .ui-icon-triangle-1-s { background-position: -64px -16px; } .ui-icon-triangle-1-sw { background-position: -80px -16px; } .ui-icon-triangle-1-w { background-position: -96px -16px; } .ui-icon-triangle-1-nw { background-position: -112px -16px; } .ui-icon-triangle-2-n-s { background-position: -128px -16px; } .ui-icon-triangle-2-e-w { background-position: -144px -16px; } .ui-icon-arrow-1-n { background-position: 0 -32px; } .ui-icon-arrow-1-ne { background-position: -16px -32px; } .ui-icon-arrow-1-e { background-position: -32px -32px; } .ui-icon-arrow-1-se { background-position: -48px -32px; } .ui-icon-arrow-1-s { background-position: -64px -32px; } .ui-icon-arrow-1-sw { background-position: -80px -32px; } .ui-icon-arrow-1-w { background-position: -96px -32px; } .ui-icon-arrow-1-nw { background-position: -112px -32px; } .ui-icon-arrow-2-n-s { background-position: -128px -32px; } .ui-icon-arrow-2-ne-sw { background-position: -144px -32px; } .ui-icon-arrow-2-e-w { background-position: -160px -32px; } .ui-icon-arrow-2-se-nw { background-position: -176px -32px; } .ui-icon-arrowstop-1-n { background-position: -192px -32px; } .ui-icon-arrowstop-1-e { background-position: -208px -32px; } .ui-icon-arrowstop-1-s { background-position: -224px -32px; } .ui-icon-arrowstop-1-w { background-position: -240px -32px; } .ui-icon-arrowthick-1-n { background-position: 0 -48px; } .ui-icon-arrowthick-1-ne { background-position: -16px -48px; } .ui-icon-arrowthick-1-e { background-position: -32px -48px; } .ui-icon-arrowthick-1-se { background-position: -48px -48px; } .ui-icon-arrowthick-1-s { background-position: -64px -48px; } .ui-icon-arrowthick-1-sw { background-position: -80px -48px; } .ui-icon-arrowthick-1-w { background-position: -96px -48px; } .ui-icon-arrowthick-1-nw { background-position: -112px -48px; } .ui-icon-arrowthick-2-n-s { background-position: -128px -48px; } .ui-icon-arrowthick-2-ne-sw { background-position: -144px -48px; } .ui-icon-arrowthick-2-e-w { background-position: -160px -48px; } .ui-icon-arrowthick-2-se-nw { background-position: -176px -48px; } .ui-icon-arrowthickstop-1-n { background-position: -192px -48px; } .ui-icon-arrowthickstop-1-e { background-position: -208px -48px; } .ui-icon-arrowthickstop-1-s { background-position: -224px -48px; } .ui-icon-arrowthickstop-1-w { background-position: -240px -48px; } .ui-icon-arrowreturnthick-1-w { background-position: 0 -64px; } .ui-icon-arrowreturnthick-1-n { background-position: -16px -64px; } .ui-icon-arrowreturnthick-1-e { background-position: -32px -64px; } .ui-icon-arrowreturnthick-1-s { background-position: -48px -64px; } .ui-icon-arrowreturn-1-w { background-position: -64px -64px; } .ui-icon-arrowreturn-1-n { background-position: -80px -64px; } .ui-icon-arrowreturn-1-e { background-position: -96px -64px; } .ui-icon-arrowreturn-1-s { background-position: -112px -64px; } .ui-icon-arrowrefresh-1-w { background-position: -128px -64px; } .ui-icon-arrowrefresh-1-n { background-position: -144px -64px; } .ui-icon-arrowrefresh-1-e { background-position: -160px -64px; } .ui-icon-arrowrefresh-1-s { background-position: -176px -64px; } .ui-icon-arrow-4 { background-position: 0 -80px; } .ui-icon-arrow-4-diag { background-position: -16px -80px; } .ui-icon-extlink { background-position: -32px -80px; } .ui-icon-newwin { background-position: -48px -80px; } .ui-icon-refresh { background-position: -64px -80px; } .ui-icon-shuffle { background-position: -80px -80px; } .ui-icon-transfer-e-w { background-position: -96px -80px; } .ui-icon-transferthick-e-w { background-position: -112px -80px; } .ui-icon-folder-collapsed { background-position: 0 -96px; } .ui-icon-folder-open { background-position: -16px -96px; } .ui-icon-document { background-position: -32px -96px; } .ui-icon-document-b { background-position: -48px -96px; } .ui-icon-note { background-position: -64px -96px; } .ui-icon-mail-closed { background-position: -80px -96px; } .ui-icon-mail-open { background-position: -96px -96px; } .ui-icon-suitcase { background-position: -112px -96px; } .ui-icon-comment { background-position: -128px -96px; } .ui-icon-person { background-position: -144px -96px; } .ui-icon-print { background-position: -160px -96px; } .ui-icon-trash { background-position: -176px -96px; } .ui-icon-locked { background-position: -192px -96px; } .ui-icon-unlocked { background-position: -208px -96px; } .ui-icon-bookmark { background-position: -224px -96px; } .ui-icon-tag { background-position: -240px -96px; } .ui-icon-home { background-position: 0 -112px; } .ui-icon-flag { background-position: -16px -112px; } .ui-icon-calendar { background-position: -32px -112px; } .ui-icon-cart { background-position: -48px -112px; } .ui-icon-pencil { background-position: -64px -112px; } .ui-icon-clock { background-position: -80px -112px; } .ui-icon-disk { background-position: -96px -112px; } .ui-icon-calculator { background-position: -112px -112px; } .ui-icon-zoomin { background-position: -128px -112px; } .ui-icon-zoomout { background-position: -144px -112px; } .ui-icon-search { background-position: -160px -112px; } .ui-icon-wrench { background-position: -176px -112px; } .ui-icon-gear { background-position: -192px -112px; } .ui-icon-heart { background-position: -208px -112px; } .ui-icon-star { background-position: -224px -112px; } .ui-icon-link { background-position: -240px -112px; } .ui-icon-cancel { background-position: 0 -128px; } .ui-icon-plus { background-position: -16px -128px; } .ui-icon-plusthick { background-position: -32px -128px; } .ui-icon-minus { background-position: -48px -128px; } .ui-icon-minusthick { background-position: -64px -128px; } .ui-icon-close { background-position: -80px -128px; } .ui-icon-closethick { background-position: -96px -128px; } .ui-icon-key { background-position: -112px -128px; } .ui-icon-lightbulb { background-position: -128px -128px; } .ui-icon-scissors { background-position: -144px -128px; } .ui-icon-clipboard { background-position: -160px -128px; } .ui-icon-copy { background-position: -176px -128px; } .ui-icon-contact { background-position: -192px -128px; } .ui-icon-image { background-position: -208px -128px; } .ui-icon-video { background-position: -224px -128px; } .ui-icon-script { background-position: -240px -128px; } .ui-icon-alert { background-position: 0 -144px; } .ui-icon-info { background-position: -16px -144px; } .ui-icon-notice { background-position: -32px -144px; } .ui-icon-help { background-position: -48px -144px; } .ui-icon-check { background-position: -64px -144px; } .ui-icon-bullet { background-position: -80px -144px; } .ui-icon-radio-on { background-position: -96px -144px; } .ui-icon-radio-off { background-position: -112px -144px; } .ui-icon-pin-w { background-position: -128px -144px; } .ui-icon-pin-s { background-position: -144px -144px; } .ui-icon-play { background-position: 0 -160px; } .ui-icon-pause { background-position: -16px -160px; } .ui-icon-seek-next { background-position: -32px -160px; } .ui-icon-seek-prev { background-position: -48px -160px; } .ui-icon-seek-end { background-position: -64px -160px; } .ui-icon-seek-start { background-position: -80px -160px; } /* ui-icon-seek-first is deprecated, use ui-icon-seek-start instead */ .ui-icon-seek-first { background-position: -80px -160px; } .ui-icon-stop { background-position: -96px -160px; } .ui-icon-eject { background-position: -112px -160px; } .ui-icon-volume-off { background-position: -128px -160px; } .ui-icon-volume-on { background-position: -144px -160px; } .ui-icon-power { background-position: 0 -176px; } .ui-icon-signal-diag { background-position: -16px -176px; } .ui-icon-signal { background-position: -32px -176px; } .ui-icon-battery-0 { background-position: -48px -176px; } .ui-icon-battery-1 { background-position: -64px -176px; } .ui-icon-battery-2 { background-position: -80px -176px; } .ui-icon-battery-3 { background-position: -96px -176px; } .ui-icon-circle-plus { background-position: 0 -192px; } .ui-icon-circle-minus { background-position: -16px -192px; } .ui-icon-circle-close { background-position: -32px -192px; } .ui-icon-circle-triangle-e { background-position: -48px -192px; } .ui-icon-circle-triangle-s { background-position: -64px -192px; } .ui-icon-circle-triangle-w { background-position: -80px -192px; } .ui-icon-circle-triangle-n { background-position: -96px -192px; } .ui-icon-circle-arrow-e { background-position: -112px -192px; } .ui-icon-circle-arrow-s { background-position: -128px -192px; } .ui-icon-circle-arrow-w { background-position: -144px -192px; } .ui-icon-circle-arrow-n { background-position: -160px -192px; } .ui-icon-circle-zoomin { background-position: -176px -192px; } .ui-icon-circle-zoomout { background-position: -192px -192px; } .ui-icon-circle-check { background-position: -208px -192px; } .ui-icon-circlesmall-plus { background-position: 0 -208px; } .ui-icon-circlesmall-minus { background-position: -16px -208px; } .ui-icon-circlesmall-close { background-position: -32px -208px; } .ui-icon-squaresmall-plus { background-position: -48px -208px; } .ui-icon-squaresmall-minus { background-position: -64px -208px; } .ui-icon-squaresmall-close { background-position: -80px -208px; } .ui-icon-grip-dotted-vertical { background-position: 0 -224px; } .ui-icon-grip-dotted-horizontal { background-position: -16px -224px; } .ui-icon-grip-solid-vertical { background-position: -32px -224px; } .ui-icon-grip-solid-horizontal { background-position: -48px -224px; } .ui-icon-gripsmall-diagonal-se { background-position: -64px -224px; } .ui-icon-grip-diagonal-se { background-position: -80px -224px; }   /* Misc visuals ----------------------------------*/  /* Corner radius */ .ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl { -moz-border-radius-topleft: 6px; -webkit-border-top-left-radius: 6px; -khtml-border-top-left-radius: 6px; border-top-left-radius: 6px; } .ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr { -moz-border-radius-topright: 6px; -webkit-border-top-right-radius: 6px; -khtml-border-top-right-radius: 6px; border-top-right-radius: 6px; } .ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl { -moz-border-radius-bottomleft: 6px; -webkit-border-bottom-left-radius: 6px; -khtml-border-bottom-left-radius: 6px; border-bottom-left-radius: 6px; } .ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br { -moz-border-radius-bottomright: 6px; -webkit-border-bottom-right-radius: 6px; -khtml-border-bottom-right-radius: 6px; border-bottom-right-radius: 6px; }  /* Overlays */ .ui-widget-overlay { background: #5c5c5c url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-bg_flat_50_5c5c5c_40x100.png) 50% 50% repeat-x; opacity: .8;filter:Alpha(Opacity=80); } .ui-widget-shadow { margin: -7px 0 0 -7px; padding: 7px; background: #cccccc url(' + MMHKPLUS.URL + '/script/jqueryui/css/images/ui-bg_flat_30_cccccc_40x100.png) 50% 50% repeat-x; opacity: .6;filter:Alpha(Opacity=60); -moz-border-radius: 8px; -khtml-border-radius: 8px; -webkit-border-radius: 8px; border-radius: 8px; }.ui-combobox { position: relative; display: inline-block; } .ui-combobox-toggle { position: absolute; top: 0; bottom: 0; margin-left: -1px; padding: 0; /* adjust styles for IE 6/7 */ *height: 1.7em; *top: 0.1em; } .ui-combobox-input { margin: 0; padding: 0.3em; }',
	
    // Ubi fix
    ".battleResultDetailedMessageModelCompleteDetailedViewZone { width:600px; }",
    ".chatlatestmessage { color:#000000; }",

	// Jactari
	'#permalien_jactari:hover{} #permalien_jactari { font-size:smaller; background-color:beige; padding-left: 26px; position: absolute; top: 50px; left: 320px; width: 65px; border: solid black 1px; background-repeat:no-repeat; height: 16px; background-image: url(' + MMHKPLUS.URL_JACTARI + '/images/icone-combat.png); z-index: 1000; }',
	'#permalien_jactari_defencer:hover{} #permalien_jactari_defencer { font-size:smaller; background-color:beige; padding-left: 26px; position: absolute; top: 50px; left: 320px; width: 65px; border: solid black 1px; background-repeat:no-repeat; height: 16px; background-image: url(' + MMHKPLUS.URL_JACTARI + '/images/icone-combat.png); z-index: 1000; }',
	
	// Common
	".MMHKPLUS_alert { padding: 1em; text-align: center; white-space: nowrap; width: auto; word-wrap: normal; }",
	".MMHKPLUS_MaxZIndex { z-index : 1000000; }",
	".MMHKPLUS_5000ZIndex { z-index : 5000; }",
	".MMHKPLUS_BlackBg { background-color : rgba(0, 0, 0, 0.65); color : #FFFFFF; }",
	".MMHKPLUS_WhiteBorder { border : 1px solid #FFFFFF; }",
	".MMHKPLUS_WhiteText { color: #FFFFFF; }",
	".MMHKPLUS_TextCenter { text-align : center; }",
	".MMHKPLUS_100Width { width : 100%; }",
    ".MMHKPLUS_Title { color : #00CCFF; }",
	".MMHKPLUS_AutoCenter { margin-left : auto; margin-right : auto; }",
	"a.MMHKPLUS_Link:link, a.MMHKPLUS_Link:visited { text-decoration:none; color:#FFFFFF; } a.MMHKPLUS_Link:hover, a.MMHKPLUS_Link:active { text-decoration:none; color:#00CCFF; }",

	".MMHKPLUS_Table { border-collapse:collapse; }",
	".MMHKPLUS_Cell { border-bottom:1px solid #FFFFFF; padding-top:5px; }",
	".MMHKPLUS_CellHeader { color:#00CCFF; text-align:center; font-weight:bold; padding:5px; }",
		
	// EnhanceUi
	"body.MMHKPLUS_UiBuyable .heroTrainingContainer,  body.MMHKPLUS_UiBuyable .heroPortraitContainer,  body.MMHKPLUS_UiBuyable .cityOptionsTitle,  body.MMHKPLUS_UiBuyable .avatarFriendsBox,  body.MMHKPLUS_UiBuyable .avatarPortrait,  body.MMHKPLUS_UiBuyable .avatarFoldButton,  body.MMHKPLUS_UiBuyable .regionViewRegionNameTop,  body.MMHKPLUS_UiBuyable .regionViewRegionNameContentBg,  body.MMHKPLUS_UiBuyable .requisitionChoice { display:none }",
	".MMHKPLUS_UiCenterOn { position:relative; top:4px; left:410px; width:240px; height:25px; line-height:25px; }",
	".MMHKPLUS_UiChatButton { position:absolute; right:-350px; width:310px; height:25px; line-height:25px; }",
    "body.MMHKPLUS_UiPanels .worldMapAlertImage_zoom1, body.MMHKPLUS_UiPanels .worldMapAlertImage_zoom2 { display:none }",
    "body.MMHKPLUS_UiMovements .MMHKPLUS_UiBigPlot { display:none; }",
    ".MMHKPLUS_UiGameToLeft { float:left; background-position-x:-295px !important; }",
	
	// Tooltip
	".MMHKPLUS_Tooltip { position : absolute; z-index : 100000; padding : 10px; border : 1px solid #FFFFFF; border-radius : 10px; background-color : rgba(0, 0, 0, 0.85); color : #FFFFFF; }",
	
	// Menu et SousMenu
	".MMHKPLUS_MenuWidth { width:140px; }",
	".MMHKPLUS_MainMenuTopbar { position : absolute; top : 0px; width : 100%; height : 25px; max-height : 21px; } body.MMHKPLUS_BodyMainMenuTopbar { padding-top : 60px !important; background-position : 50% 10px!important; }",
	".MMHKPLUS_MainMenuFloatting { position : absolute; top : 0px; width : 100px; height : 22px;} body.MMHKPLUS_BodyMainMenuFloatting { padding-top : 40px !important; background-position : 50% 10px!important; }",
	".MMHKPLUS_MainMenuIcons { position : relative; float : left; width : 17px; height : 17px;  }",
	".MMHKPLUS_SubMenu { position : absolute; top : 22px; }",

    // AllianceSpys
    ".MMHKPLUS_AllianceSpysHover {  }",
    ".MMHKPLUS_AllianceSpysHover:hover { background-color:rgba(255,0,0,0.3) !important; }",
	
	// KingdomResources
	".MMHKPLUS_KingdomResourcesCell { width:10%; border-bottom:1px solid #FFFFFF; padding-top:5px; }",
	".MMHKPLUS_KingdomResourcesImage { position : relative; top : 10px; left : 2px; }",
	".MMHKPLUS_KingdomResourcesCellAmount { position : relative; padding-left : 32px; top : -15px; font-size : 90%; }",
	".MMHKPLUS_KingdomResourcesCellAmountSmall { position : relative; padding-left : 32px; top : -15px; font-size : 75%; }",
	
	// KingdomArmies, KingdomRecruitment
	".MMHKPLUS_KingdomArmiesCell { width:15%; border-bottom:1px solid #FFFFFF; padding-top:5px; }",
	".MMHKPLUS_KingdomArmiesCellImage { float:left; margin-left:5px; width:23px; }",
	".MMHKPLUS_KingdomArmiesCellAmount { font-weight:bold; width:23px; text-align:center; font-size:85%; }",
	".MMHKPLUS_KingdomArmiesCellTooltipName { position:relative; top:-17px; left:35px; font-style:bold; }",
	".MMHKPLUS_KingdomRecruitmentCellImageTotal { float:left; margin-left:5px; }",
	
	// KingdomHeroes
	".MMHKPLUS_KingdomHeroesStats { background-repeat:no-repeat; padding-left:30px; width:20px; height:20px; color:#FFFFFF; line-height:20px; margin:5; }",
	".MMHKPLUS_KingdomHeroesCompImage { width:70px; height:70px; }",
	".MMHKPLUS_KingdomHeroesSkillsTable { width:100%; border:1px solid #FFFFFF; padding:5px; border-collapse:collapse; }",
	".MMHKPLUS_KingdomHeroesSkillImage { border-bottom:1px solid #FFFFFF; padding:5px; width:200px; }",
	".MMHKPLUS_KingdomHeroesSpellNameCell { font-weight:bold; margin-top:5px; margin-right:10px; padding:5px; }",
	".MMHKPLUS_KingdomHeroesArtifactsBg { background-image : url(" + MMHKPLUS.URL_IMAGES + "kingdom/background_artefacts.png); background-repeat:no-repeat; background-position:0px 0px; padding-left:30px; width:350px; height:47px; color:#FFFFFF; line-height:47px; margin:5px; }",
	
	// KingdomActions
	".MMHKPLUS_KingdomActionsCell { border-top:1px solid #FFFFFF; color:#FFFFFF; padding: 10px 5px 10px 5px; }",

    // Lookout
    ".MMHKPLUS_LookoutSpot { border:3px solid #000000; z-index:1700; }",

    // Cartographer
    ".MMHKPLUS_CartographerRotate { -moz-transform:rotate(180deg); -webkit-transform:rotate(180deg);}",
	
	// Marks
	".MMHKPLUS_MarksContainer { width:270px; height:175px; overflow-y:auto; overflow-x:hidden; border:1px solid #FFFFFF; }",
	".MMHKPLUS_MarksTable { font-width:90%, width:270px; }",
	
	// Chat
	".MMHKPLUS_ChatContent { position:relative; width:100%; background-color:#FFFFFF; overflow-y:auto; overflow-x:hidden; }",
	".MMHKPLUS_ChatTextArea { height:50px; resize:none; width:100%; font-size:100%; margin-top:5px; }",
	".MMHKPLUS_ChatMessage { min-height:40px; padding:0px; border-bottom:1px solid #000000; color:#000000; }",
	".MMHKPLUS_ChatNewMessage { background:#FF3333 !important;font-style:italic !important;} }"
];
MMHKPLUS.LZW = {
    compress: function (uncompressed) {
        "use strict";
        // Build the dictionary.
        var i,
            dictionary = {},
            c,
            wc,
            w = "",
            result = [],
            dictSize = 256;
        for (i = 0; i < 256; i += 1) {
            dictionary[String.fromCharCode(i)] = i;
        }
 
        for (i = 0; i < uncompressed.length; i += 1) {
            c = uncompressed.charAt(i);
            wc = w + c;
            //Do not use dictionary[wc] because javascript arrays 
            //will return values for array['pop'], array['push'] etc
           // if (dictionary[wc]) {
            if (dictionary.hasOwnProperty(wc)) {
                w = wc;
            } else {
                result.push(dictionary[w]);
                // Add wc to the dictionary.
                dictionary[wc] = dictSize++;
                w = String(c);
            }
        }
 
        // Output the code for w.
        if (w !== "") {
            result.push(dictionary[w]);
        }
        return result;
    },
 
 
    decompress: function (compressed) {
        "use strict";
        // Build the dictionary.
        var i,
            dictionary = [],
            w,
            result,
            k,
            entry = "",
            dictSize = 256;
        for (i = 0; i < 256; i += 1) {
            dictionary[i] = String.fromCharCode(i);
        }
 
        w = String.fromCharCode(compressed[0]);
        result = w;
        for (i = 1; i < compressed.length; i += 1) {
            k = compressed[i];
            if (dictionary[k]) {
                entry = dictionary[k];
            } else {
                if (k === dictSize) {
                    entry = w + w.charAt(0);
                } else {
                    return null;
                }
            }
 
            result += entry;
 
            // Add w+entry[0] to the dictionary.
            dictionary[dictSize++] = w + entry.charAt(0);
 
            w = entry;
        }
        return result;
    }
};

MMHKPLUS.exportToImage = function($selector) {
	var htmlContent = "";
	htmlContent +="<html><head>";
	htmlContent += "<style type='text/css'>.battleResultDetailedMessageModelCompleteDetailedViewZone { width:600px; } body {background-color:white;}</style>";
	$("head > link[rel='stylesheet']").each(function(i, elem)
		{
			htmlContent += elem.outerHTML;
		}
	);
	htmlContent += "</head><body>";
	htmlContent += $selector[0].outerHTML;
	htmlContent += "</body></html>";
	
	var compressedHTMLContent = MMHKPLUS.LZW.compress(htmlContent);
	MMHKPLUS.getElement("Ajax").exportToImage(compressedHTMLContent);
};

MMHKPLUS.clearInterval = function(interval) {
	if(interval)
	{
		clearInterval(interval);
		interval = null;
	}
};

MMHKPLUS.resetElement = function($element) {
	$element.remove().removeAttr("style").removeClass().off().empty();
};

MMHKPLUS.addElement = function(element) {
	MMHKPLUS.elementPool[element.elementType] = element;
};

MMHKPLUS.getElement = function(type, createIfNull) {
	var elem = MMHKPLUS.elementPool[type] || null;
	if(!elem && isDefined(createIfNull) && createIfNull && hasProperty(MMHKPLUS, type))
	{
		MMHKPLUS.addElement(Object.create(MMHKPLUS[type]).init());
		elem = MMHKPLUS.elementPool[type] || null;
	}
	return elem;
};

MMHKPLUS.removeElement = function(type) {
	if(hasProperty(MMHKPLUS.elementPool, type))
	{
		MMHKPLUS.elementPool[type].unload();
		delete MMHKPLUS.elementPool[type];
	}
};

MMHKPLUS.openDisplayable = function(type) {
	if(!hasProperty(MMHKPLUS, type))
	{
		MMHKPLUS.alert("Error", "Element <b>" + type + "</b> not found!");
		return;
	}
	var element = MMHKPLUS.getElement(type);
	if(!element)
	{
		MMHKPLUS.addElement(Object.create(MMHKPLUS[type]).init());
	}
	MMHKPLUS.getElement(type).display();
};

MMHKPLUS.openHiddenDisplayable = function(type) {
    var $sel = $("ul.MMHKPLUS_SubMenu > li:contains('" + type + "')");
    $sel[0].click();
};

MMHKPLUS.alert = function(title, message) {
    $("<div>")
        .attr({title: title, "class": "MMHKPLUS_alert"})
        .html(message)
        .dialog(
			{
				buttons: {OK: function(){$(this).dialog('close');}},
				close: function(){$(this).remove();},
				draggable: false,
				modal: true,
				resizable: false,
				width: "auto", height : "auto",
				zIndex : 1000000
			}
		);
};

MMHKPLUS.getCssSprite = function (l, c) {
	var d = $("<div>");
    try {
		var d = $("<div>");
        var css = MMHKPLUS.HOMMK.CSSSPRITE_CONF[l];
        var k = css.sprites[c];
        var x = k.x;
        var y = k.y;
        var h = (hasProperty(css, "eventFile") && css.eventFile && hasProperty(MMHKPLUS.HOMMK, "EVENT_IMG_URL") ? MMHKPLUS.HOMMK.EVENT_IMG_URL : MMHKPLUS.HOMMK.IMG_URL) 
					+ "css_sprite/" + (hasProperty(css, "file") ? css.file : l) + "." + css.ext;
        if (x == 0 && y == 0) 
		{
            x = css.width;
            y = css.height;
        }
		d.css(
			{
				"background-image": "url('" + h + "')",
				"background-position": "-" + x + "px -" + y + "px",
				"background-repeat": "repeat",
				"width": k.w + "px",
				"height": k.h + "px"
			}
		);
    } catch (g) {
		console.log("Error : ", g);
		console.log("spriteConf : ", l);
		console.log("spriteType : ", c);
        console.trace();
    }
	return d;
};

MMHKPLUS.getPlayerAvatar = function(backgroundId, patternId, iconId) {
	var $image = $("<div/>").css( { width : "40px", height : "40px" } );
	$image
		.append(
			MMHKPLUS.getCssSprite("playerIconBackground", "BACKGROUND" + backgroundId));
			
	$image
		.append(
			MMHKPLUS.getCssSprite("playerIconPattern", "PATTERN" + patternId)
				.css({position : "relative", top : "-40px", left : "0px"}));
	
	$image
		.append(
			MMHKPLUS.getCssSprite("playerIcon", "ICON" + iconId)
				.css({position : "relative", top : "-80px", left : "0px"}));

	return $image;
}

MMHKPLUS.openPlayerFrame = function(id) {
	MMHKPLUS.HOMMK.openPlayerProfileFrame(id);
};

MMHKPLUS.centerOn = function(x, y) {
	if(isNaN(x) || isNaN(y) || x < 0 || y < 0 || x > MMHKPLUS.getElement("Player").get("worldSize") || y > MMHKPLUS.getElement("Player").get("worldSize"))
	{
		return;
	}
	if(MMHKPLUS.HOMMK.currentView.viewType >= 3)
	{
		MMHKPLUS.HOMMK.setCurrentView(MMHKPLUS.HOMMK.REGION_WORLDMAP_ZOOM_13X13);
	}
	MMHKPLUS.wait(function() 
		{
			return MMHKPLUS.HOMMK.runningJsonRequestCount == 0 && !MMHKPLUS.HOMMK.currentView.isLoading;
		},
		function()
		{
			MMHKPLUS.HOMMK.worldMap.center(parseInt(x), parseInt(y));
		}
	);
};

MMHKPLUS.distance = function(x1, y1, x2, y2) {
	var dx = Math.abs(x2 - x1) || 0; 
	var dy = Math.abs(y2 - y1) || 0;
	var s = MMHKPLUS.getElement("Player").get("worldSize");
	if (dx > s / 2) 
	{
		dx = s - dx;
	}
	if (dy > s / 2) 
	{
		dy = s - dy;
	}
	return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
};

MMHKPLUS.getRegionId = function(x, y) {
	return (parseInt(y) - 1) * MMHKPLUS.getElement("Player").get("worldSize") + parseInt(x);
};

MMHKPLUS.openURL = function(url) {
	window.open(url, "_blank");
};

MMHKPLUS.wait = function(exec, callback, count) {
	if(exec() || count == 0)
	{
		callback();
	}
	else
	{
		if(!count) count = 30;
		if(count > 0)
		{
			setTimeout(MMHKPLUS.wait, 200, exec, callback, count - 1);
		}
	}
};

MMHKPLUS.worldSizeMod = function(a) {
    var s = MMHKPLUS.getElement("Player").get("worldSize");
    return ((s + a -1 ) % s) + 1;
};
        
MMHKPLUS.worldRange = function(a, b) {
    var result = [];
    var dep = a;
    while(MMHKPLUS.worldSizeMod(dep) != b)
    {
        result.push(MMHKPLUS.worldSizeMod(dep));
        dep++;
    }
    result.push(b);
    return result;
};

MMHKPLUS.previousCurrentViewX = -1;
MMHKPLUS.previousCurrentViewY = -1;
MMHKPLUS.previousCurrentView = [];
MMHKPLUS.currentView = function() {
    var player = MMHKPLUS.getElement("Player");
    var x = player.getCurrentViewX();
    var y = player.getCurrentViewY();

    if(x == MMHKPLUS.previousCurrentViewX && y == MMHKPLUS.previousCurrentViewY)
    {
        return MMHKPLUS.previousCurrentView;
    }
    MMHKPLUS.previousCurrentViewX = x;
    MMHKPLUS.previousCurrentViewY = y;

    var result = [];
    
    MMHKPLUS.worldRange(MMHKPLUS.worldSizeMod(x - 6), MMHKPLUS.worldSizeMod(x + 6)).forEach(function(xx)
        {
            MMHKPLUS.worldRange(MMHKPLUS.worldSizeMod(y - 3), MMHKPLUS.worldSizeMod(y + 3)).forEach(function(yy)
                {
                    result.push(xx + "_" + yy);
                }
            );
        }
    );
    MMHKPLUS.worldRange(MMHKPLUS.worldSizeMod(x - 5), MMHKPLUS.worldSizeMod(x + 6)).forEach(function(xx)
        {
            result.push(xx + "_" + MMHKPLUS.worldSizeMod(y - 4));
        }
    );
    MMHKPLUS.worldRange(MMHKPLUS.worldSizeMod(x - 4), MMHKPLUS.worldSizeMod(x + 5)).forEach(function(xx)
        {
            result.push(xx + "_" + MMHKPLUS.worldSizeMod(y - 5));
        }
    );
    MMHKPLUS.worldRange(MMHKPLUS.worldSizeMod(x - 3), MMHKPLUS.worldSizeMod(x + 4)).forEach(function(xx)
        {
            result.push(xx + "_" + MMHKPLUS.worldSizeMod(y - 6));
        }
    );
    MMHKPLUS.worldRange(MMHKPLUS.worldSizeMod(x - 6), MMHKPLUS.worldSizeMod(x + 5)).forEach(function(xx)
        {
            result.push(xx + "_" + MMHKPLUS.worldSizeMod(y + 4));
        }
    );
    MMHKPLUS.worldRange(MMHKPLUS.worldSizeMod(x - 5), MMHKPLUS.worldSizeMod(x + 4)).forEach(function(xx)
        {
            result.push(xx + "_" + MMHKPLUS.worldSizeMod(y + 5));
        }
    );
    MMHKPLUS.worldRange(MMHKPLUS.worldSizeMod(x - 4), MMHKPLUS.worldSizeMod(x + 3)).forEach(function(xx)
        {
            result.push(xx + "_" + MMHKPLUS.worldSizeMod(y + 6));
        }
    );
    
    MMHKPLUS.previousCurrentView = result;
    
    return result;
};

MMHKPLUS.hoursToCountdown = function(hours) {
	var d = new Date();
	d.setTime(hours * 3600 * 1000);
	return d.countDown();
};

MMHKPLUS.localize = function(id) {
    if(hasProperty(MMHKPLUS.translations, id))
	   return MMHKPLUS.translations[id][MMHKPLUS.locale] || "NotFound_" + id;
    else
        return "NotFound_" + id;
};

MMHKPLUS.localizeUnit = function(faction, tier) {
    if(hasProperty(MMHKPLUS.translationsUnits, faction) 
        && hasProperty(MMHKPLUS.translationsUnits[faction], tier))
        return MMHKPLUS.translationsUnits[faction][tier][MMHKPLUS.locale] || "NotFound_" + faction + "_" + tier;
    else
        return "NotFound_" + faction + "_" + tier;
};

MMHKPLUS.localizeText = function(text) {
    var languages = ["fr", "en", "ru"];
    var result = "NotFound_(" + text + ")";
    MMHKPLUS.translationsText.forEach(function(t)
        {
            languages.forEach(function(l)
                {
                    if(removeDiacritics(t[l]).replace(/[ ,‚'"]/g, "").toUpperCase().trim() == removeDiacritics(text).replace(/[ ,‚'"]/g, "").trim().toUpperCase())
                        result = t[MMHKPLUS.locale];
                }
            );
        }
    );
    return result;
};

MMHKPLUS.checkUpdate = function() {
    $.getScript(MMHKPLUS.URL_PHP + "check_update.php", function(e)
    // $.getScript("http://hommknav.fr/mmhk-plus/check_update.php", function(e)
        {
            var local = MMHKPLUS.version.split(".");
            
            var LNV_Major = parseInt(local[0]);
            var LNV_Minor = parseInt(local[1]);
            var LNV_Build = parseInt(local[2]);
            
            var NV_Major = localStorage.getItem('MMHKPLUS_NEXT_VERSION_MAJOR');
            var NV_Minor = localStorage.getItem('MMHKPLUS_NEXT_VERSION_MINOR');
            var NV_Build = localStorage.getItem('MMHKPLUS_NEXT_VERSION_BUILD');

            localStorage.removeItem("MMHKPLUS_NEXT_VERSION_MAJOR");
            localStorage.removeItem("MMHKPLUS_NEXT_VERSION_MINOR");
            localStorage.removeItem("MMHKPLUS_NEXT_VERSION_BUILD");
            
            var need = (LNV_Major < NV_Major) || ((LNV_Major == NV_Major) && (LNV_Minor < NV_Minor)) || ((LNV_Major == NV_Major) && (LNV_Minor == NV_Minor) && (LNV_Build < NV_Build));
            if(need)
            {
                panel = $("<div/>");
                $("<p style='width:100%'/>").addClass("center").html("MMHK-Plus").appendTo(panel);
                $("<br/>").appendTo(panel);
                $("<p style='width:100%'/>").addClass("center").html(MMHKPLUS.localize("UPDATE_TEXT")).appendTo(panel);
                $("<br/>").appendTo(panel);
                $("<p><a class='MMHKPLUS_Link' href='" + MMHKPLUS.URL + "' target='_blank' style='font-size:140%;'>" + MMHKPLUS.localize("SITE") + "</a></p>").addClass("center").appendTo(panel);
                $("<p><a class='MMHKPLUS_Link' href='" + MMHKPLUS.URL + "/script/download.php?.user.js" + "' target='_blank' style='font-size:140%;'>" + MMHKPLUS.localize("DOWNLOAD") + "</a></p>").addClass("center").appendTo(panel);
                panel.dialog(
                    {
                        autoOpen : false,
                        title : MMHKPLUS.localize("UPDATE_TITLE"),
                        zIndex : 90000,
                        resizable : false,
                        width : 370,
                        height : 190,
                        position : ["center", "center"]
                    }
                );
                
                panel.dialog("open");
            }
        }
    );
};

MMHKPLUS.init = function() {
	window.MMHKPLUS = MMHKPLUS;
	MMHKPLUS.locale = (MMHKPLUS.HOMMK.getLanguage() == "fr" ? "fr" : (MMHKPLUS.HOMMK.getLanguage() == "ru" ? "ru" : "en")) || "en";
	$("<style/>").attr("type", "text/css").html(MMHKPLUS.css.join("")).appendTo($("head"));
	
	MMHKPLUS.addElement(Object.create(MMHKPLUS.Ajax).init());
	MMHKPLUS.addElement(Object.create(MMHKPLUS.Store).init());
	MMHKPLUS.addElement(Object.create(MMHKPLUS.Player).init());
	MMHKPLUS.addElement(Object.create(MMHKPLUS.Menu).init());
    MMHKPLUS.addElement(Object.create(MMHKPLUS.WorldSwitch).init());
	MMHKPLUS.addElement(Object.create(MMHKPLUS.Jactari).init());
    MMHKPLUS.addElement(Object.create(MMHKPLUS.EnhancedUI).init());
    MMHKPLUS.addElement(Object.create(MMHKPLUS.Cartographer).init());
	
	var preferences = MMHKPLUS.getElement("Store").get("MMHKPLUS_PREFERENCES");
	for(var i in preferences)
	{
		if(hasProperty(preferences[i], "o") && preferences[i].o)
		{
            if(i != "Chat" || (i == "Chat" && MMHKPLUS.getElement("EnhancedUI").options.chatType == 2))
			    MMHKPLUS.openDisplayable(i);
		}
	}

    MMHKPLUS.checkUpdate();

    MMHKPLUS.HOMMK.JsonRequestHandler.prototype.onOKResponse = injectAfter(MMHKPLUS.HOMMK.JsonRequestHandler.prototype.onOKResponse, function(a, b, c) { console.log(arguments);});
};

MMHKPLUS.unload = function() {
	for(var i in MMHKPLUS.elementPool)
	{
		MMHKPLUS.elementPool[i].unload();
	}
};
MMHKPLUS.ExtendableElement = {
	elementType : "ExtendableElement",
	
	store : null,
	
	save : function(property, value)
	{
		if(!this.store)
		{
			this.store = MMHKPLUS.getElement("Store");
		}
		this.store.setProperty(this.elementType, property, value);
	},
	
	load : function(property)
	{
		if(!this.store)
		{
			this.store = MMHKPLUS.getElement("Store");
		}
		return this.store.getProperty(this.elementType, property);
	},
	
	extend : function()
	{
		var newClass = {};
		$.extend(newClass, newClass, this);
		for(var i = 0 ; i < arguments.length ; i++)
		{
			$.extend(newClass, newClass, arguments[i]);
		}
		return newClass;
	},
	
	isset : function (property) 
	{
        return hasProperty(this, property);
    },
	
	get : function(property)
	{
		if(!this.isset(property))
			return null;
		return this[property];
	},
	
	set : function(property, value)
	{
		this[property] = value;
	},
	
	unload : function()
	{
		// Nothing
	}
};
MMHKPLUS.RefreshableElement = MMHKPLUS.ExtendableElement.extend({
	elementType : "RefreshableElement",
	
	options : {
		refreshInterval : 60000, // 60 seconds
		lastRefreshTime : null,
		nextRefreshTime : null
	},
	
	get : function(property)
	{
		this._update();
		if(!this.isset(property))
			return null;
		return this[property];
	},
	
	set : function(property, value)
	{
		this[property] = value;
	},
	
	_update : function()
	{
		var now = $.now();
		if(!this.options.nextRefreshTime || this.options.nextRefreshTime < now)
		{
			this.options.lastRefreshTime = now;
			this.options.nextRefreshTime = this.options.lastRefreshTime + this.options.refreshInterval;
			this._refresh();
		}
	},

	_refresh : function()
	{
		// Nothing
	}
});
MMHKPLUS.PanelElement = MMHKPLUS.ExtendableElement.extend({
	elementType : "PanelElement",
	
	isProgressContentRunning : false,
	currentRequests : [],
	
	options : {
		title : "",
		resizable : false,
		opened : false,
		x : "center",
		y : "center",
		w : 100,
		h : 100,
		savePos : true,
		saveWidth : true,
		saveHeight : true,
		saveOpened : false
	},

	display : function()
	{
		this._setupPanel();
		if(!this.$elem.dialog("isOpen"))
		{
			this.$elem.dialog("open");
		}
	},
	
	onSetup    : function() {},
	onClose    : function(event, ui) {},
	onOpen     : function(event, ui) {},
    onDragStart : function(event, ui) {},
	onDragStop : function(event, ui) {},
	onResize   : function(event, ui) {},
	
	setProgressContent : function(referer, ajaxRequestFunction, ajaxArgArray, AjaxCallback, endFunction, abordFunction)
	{
		try {
			if(this.isProgressContentRunning)
				return;
			
			this.isProgressContentRunning = true;
			
			var $progress = $("<div/>")
				.progressbar({max : ajaxArgArray.length, value : 0})
				.appendTo(this.$elem);
			
			var newCallback = function(json)
			{
				if(referer.options.opened)
				{
					AjaxCallback.call(referer, json);
					$progress.progressbar( "option", "value", $progress.progressbar( "option", "value" ) + 1 );
					if($progress.progressbar( "option", "value" ) == ajaxArgArray.length)
					{
						MMHKPLUS.resetElement($progress);
						$progress = null;
						endFunction.call(referer);
						referer.currentRequests = null ; referer.currentRequests = [];
						referer.isProgressContentRunning = false;
					}
				}
				else
				{
					referer.currentRequests.forEach(function(r)
						{
							r.abort();
						}
					);
					referer.currentRequests = null ; referer.currentRequests = [];
					abordFunction.call(referer);
					referer.isProgressContentRunning = false;
				}
				
			};
			ajaxArgArray.forEach(function(iteration)
				{
					iteration.push(newCallback);
					referer.currentRequests.push(ajaxRequestFunction.apply(MMHKPLUS.getElement("Ajax"), iteration));
				}
			);
		} 
		catch (g) 
		{
			abordFunction.call(referer);
			console.log("Error in setProgressContent : " + (referer.elementType || ""));
			MMHKPLUS.alert("Error", "Error while getting informations for element " +  (referer.elementType || "") + "<br/>" + (g.message || ""));
			console.trace();
		}
	},
	
	_setupPanel : function()
	{
		if(this.options.savePos)
		{
			this.options.x = this.load("x") || this.options.x;
			this.options.y = this.load("y") || this.options.y;
		}
		if(this.options.saveWidth)
		{
			this.options.w = this.load("w") || this.options.w;
		}
		if(this.options.saveHeight)
		{
			this.options.h = this.load("h") || this.options.h;
		}
		if(this.options.saveOpened)
		{
			this.options.opened = this.load("o") || this.options.opened;
		}
		var self = this;

		this.$elem.dialog(
			{
				autoOpen : false,
                title : self.options.title,
                zIndex : 90000,
                resizable : self.options.resizable,
                stack : true,
                tolerance : "pointer",
				
				open : function(event, ui)
				{
					self.options.opened = true;
					if(self.options.saveOpened)
					{
						self.save("o", self.options.opened);
					}
					$(this).dialog(
						{
							position : [self.options.x, self.options.y],
							width : self.options.w,
							height : self.options.h
						}
					);
					self.onOpen(event, ui);
				},
				
				close : function(event, ui)
				{
					self.onClose(event, ui);
					self.options.opened = false;
					if(self.options.saveOpened)
					{
						self.save("o", self.options.opened);
					}
					$(this).dialog("destroy");
					MMHKPLUS.resetElement($(this));
				},
				
				resize : function(event, ui)
				{
					self.onResize(event, ui);
				},
				
				resizeStop : function(event, ui)
				{
					self.options.w = ui.size.width;
					self.options.h = ui.size.height;
					self.options.y = ui.position.top;
					self.options.x = ui.position.left;
					if(self.options.saveWidth)
					{
						self.save("w", parseInt(self.options.w));
					}
					if(self.options.saveHeight)
					{
						self.save("h", parseInt(self.options.h));
					}
					if(self.options.savePos)
					{
						self.save("x", parseInt(self.options.x));
						self.save("y", parseInt(self.options.y));
					}
				},

                dragStart : function(event, ui)
                {
                    self.onDragStart(event, ui);
                },
				
				dragStop : function(event, ui)
				{
					self.options.y = ui.position.top;
					self.options.x = ui.position.left;
					if(self.options.savePos)
					{
						self.save("x", parseInt(self.options.x));
						self.save("y", parseInt(self.options.y));
					}
					self.onDragStop(event, ui);
				}
			}
		);
		this.$elem.addClass("MMHKPLUS_BlackBg");
		this.onSetup();
	}
});
MMHKPLUS.ArmiesPanelElement = MMHKPLUS.PanelElement.extend({
	elementType : "ArmiesPanelElement",
	
	sortStack : function(a, b)
	{
		if(a.tier == b.tier)
		{
			if(a.factionEntityTagName < b.factionEntityTagName)
				return -1;
			if(a.factionEntityTagName > b.factionEntityTagName)
				return 1;
			return 0;
		}
		else
		{   
			if(a.tier < b.tier)
				return -1;
			if(a.tier > b.tier)
				return 1;
		}
	},
	
	pushStack : function(stack, armies)
	{
		var rank = -1; var i = 0;
		armies.forEach(function(army)
			{
				if(army.tier == stack.tier && army.factionEntityTagName == stack.factionEntityTagName)
				{
					rank = i;
				}
				i++;
			}
		);
		if(rank == -1)
		{
			armies.push(
				{
					factionEntityTagName : stack.factionEntityTagName,
					tier : stack.tier,
					quantity : stack.quantity,
					unitEntityBombardPower : stack.unitEntityBombardPower,
					unitEntityName : stack.unitEntityName,
					unitEntityTagName : stack.unitEntityTagName,
					unitEntityPower : stack.unitEntityPower,
					unitEntityType : stack.unitEntityType
				}
			);
		}
		else
		{
			armies[rank].quantity += stack.quantity;
		}
	},
	
	getStacks : function(tier, armies)
	{
		var result = [];
		armies.forEach(function(army)
			{
				if(army.tier.indexOf(tier + "") != -1)
				{
					result.push(army);
				}
			}
		);
		result.sort(this.sortStack);
		return result;
	},
	
	getPower : function(armies)
	{
		var result = 0;
		armies.forEach(function(stack)
			{
				result += (hasProperty(stack, "avail") ? stack.avail : stack.quantity) * (hasProperty(stack, "power") ? stack.power : stack.unitEntityPower);
			}
		);
        return result;
	}
});
MMHKPLUS.About = MMHKPLUS.PanelElement.extend({
    elementType : "About",
    
    options : {
        title : "",
        resizable : false,
        opened : false,
        x : "center",
        y : "center",
        w : 500,
        h : 180,
        savePos : true,
        saveWidth : false,
        saveHeight : false,
        saveOpened : false
    },
    
    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.options.title = MMHKPLUS.localize("ABOUT");
        this.$elem = $("<div>");

        this._setupPanel();
        
        return this;
    },

    onOpen : function()
    {
        this._createView();
    },

    _createView : function()
    {
        $("<p>")
            .addClass("center").css("fontSize", 20)
            .html("<a class='MMHKPLUS_Link' target='_blank' href='" + MMHKPLUS.URL  + "'>" + MMHKPLUS.localize("SITE") + "</a>")
            .appendTo(this.$elem);

        $("<br>").appendTo(this.$elem);

        $("<p>")
            .addClass("center")
            .html(MMHKPLUS.localize("ABOUT_TEXT"))
            .appendTo(this.$elem);
    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
    }
});
MMHKPLUS.Ajax = MMHKPLUS.PanelElement.extend({
	elementType : "Ajax",
    jsonHandler : null,
	
	options : {
		url : "http://" + window.location.host, 
		getContentUrl : "/ajaxRequest/getContent"
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
        this.jsonHandler = new MMHKPLUS.HOMMK.JsonRequestHandler(MMHKPLUS.HOMMK.JSON_GETCONTENT_URL, {});
		return this;
	},
	
	getProfileFrame :  function(id, callback, sync)
	{
		return this._send(
			this.options.url + this.options.getContentUrl,
			{ "elParamList" : [ { "elementType" : "ProfileFrame", "elementId" : id } ] },
			callback,
			sync
		);
	},
	
	getAllianceFrame : function(id, callback, sync)
	{
		return this._send(
			this.options.url + this.options.getContentUrl,
			{ "elParamList" : [ { "elementType" : "ViewAllianceFrame", "elementId" : id} ] },
			callback,
			sync
		);
		
	},
	
	getHeroFrame : function(id, callback, sync)
	{
		return this._send(
			this.options.url + this.options.getContentUrl,
			{ "elParamList" : [ { "elementType" : "HeroFrame", "elementId" : id } ] },
			callback,
			sync
		);
	},
	
	getCityRecruitmentFrame : function(id, callback, sync)
	{
		return this._send(
			this.options.url + this.options.getContentUrl,
			{ "elParamList" : [ { "elementType" : "RecruitmentFrame", "elementId" : id } ] },
			callback,
			sync
		);
	},
	
	getMagicGuildFrame : function(id, callback, sync)
	{
		return this._send(
			this.options.url + this.options.getContentUrl,
			{ "elParamList" : [ { "elementType" : "MagicGuildFrame", "elementId" : id } ] },
			callback,
			sync
		);
	},

    getCityBuildings : function(id, callback, sync)
    {
        return this._send(
            this.options.url + this.options.getContentUrl,
            { "elParamList" : [ { "elementType" : "CityView", "elementId" : id } ] },
            callback,
            sync
        );
    },

    getRegionMap : function(id, callback, sync)
    {
        return this._send(
            this.options.url + this.options.getContentUrl,
            { "elParamList" : [ { "elementId" : id, "elementType" : "RegionMap" } ] },
            callback,
            sync
        );
    },

    getRegionMapXY : function(x, y, callback, sync)
    {
        return this._send(
            this.options.url + this.options.getContentUrl,
            { "elParamList" : [ { "elementId" : 0, "x" : x, "y" : y, "elementType" : "RegionMap"}]},
            callback,
            sync
        );
    },
	
	getHeroMove : function(worldId, x, y, w, h, callback, sync)
	{
		return this._send(
			this.options.url + this.options.getContentUrl,
			{"elParamList": [ {"elementType":"HeroMove", "ownerType":"WorldMap", "ownerId":  worldId, "x": Math.floor( x ), "y": Math.floor( y ), "w": Math.floor( w ), "h": Math.floor( h ) } ] },
			callback,
			sync
		);
	},
	
	getRegion : function(worldId, x, y, w, h, callback, sync)
	{
		return this._send(
			this.options.url + this.options.getContentUrl,
			{"elParamList": [ {"elementType":"Region", "ownerType":"WorldMap", "ownerId":  worldId, "x": Math.floor( x ), "y": Math.floor( y ), "w": Math.floor( w ), "h": Math.floor( h ) } ] },
			callback,
			sync
		);
	},

    getWorldmap : function(x, y, w, h, callback, sync)
    {
        return this._send(
            this.options.url + this.options.getContentUrl,
            { "elParamList" : [ { "elementType" : "WorldMap", "elementId" :  MMHKPLUS.getElement("Player").get("worldId"), "x": x,"y": y,"w": w,"h": w,"regionId":null}]},
            callback,
            sync
        );
    },
	
	getRiftRegionBuildingFrame : function(id, callback, sync)
	{
		return this._send(
			this.options.url + this.options.getContentUrl,
			{ "elParamList" : [ { "elementType" : "RiftRegionBuildingFrame", "elementId" : id } ] },
			callback,
			sync
		);
	},
	
	getMarketPlaceFrame : function(id, callback, sync)
	{
		return this._send(
			this.options.url + this.options.getContentUrl,
			{ "elParamList" : [ { "elementType" : "MarketPlaceFrame", "elementId" : id } ] },
			callback,
			sync
		);
	},

    getSpyReportsForSelectedRegion : function()
    {
        $.getScript(MMHKPLUS.URL_PHP + "get_spy_report.php?" 
            + "worldId=" + MMHKPLUS.getElement("Player").get("worldId")
            + "&allianceId=" + MMHKPLUS.getElement("Player").get("allianceId")
            + "&curX=" + MMHKPLUS.HOMMK.worldMap.selectedRegion.content.x
            + "&curY=" + MMHKPLUS.HOMMK.worldMap.selectedRegion.content.y
            + "&referenceId=" + MMHKPLUS.HOMMK.worldMap.selectedRegion.content.id
        );
    },

    getSpyReportContent : function(reportId)
    {
        $.getScript(MMHKPLUS.URL_PHP + "get_spy_report.php?" 
            + "worldId=" + MMHKPLUS.getElement("Player").get("worldId")
            + "&allianceId=" + MMHKPLUS.getElement("Player").get("allianceId")
            + "&reportId=" + reportId
        );
    },

    getHeroes : function(targetedPlayerId)
    {
        $.getScript(MMHKPLUS.URL_PHP + "heroes.php?" 
            + "worldId=" + MMHKPLUS.getElement("Player").get("worldId")
            + "&allianceId=" + MMHKPLUS.getElement("Player").get("allianceId")
            + "&playerId=" + targetedPlayerId
        );
    },

    getSpyHeroContent : function(targetedPlayerId, heroId)
    {
        $.getScript(MMHKPLUS.URL_PHP + "heroes.php?" 
            + "worldId=" + MMHKPLUS.getElement("Player").get("worldId")
            + "&allianceId=" + MMHKPLUS.getElement("Player").get("allianceId")
            + "&targetedPlayerId=" + targetedPlayerId
            + "&heroId=" + heroId
        );
    },

    getCartographerData : function()
    {
        $.getScript(MMHKPLUS.URL_PHP + "get_cartographer_data.php?" 
            + "worldId=" + MMHKPLUS.getElement("Player").get("worldId")
        );
    },

    sendSpyReport : function(content)
    {
        var time = $.now();
        var myIframeSender = document.createElement('iframe');
        myIframeSender.id = "MMHKPLUS_AjaxHackIFrame" + time ;
        myIframeSender.style.position = "absolute";
        myIframeSender.style.top = "1px";
        myIframeSender.style.left = "-15px";
        myIframeSender.style.width = "1px";
        myIframeSender.style.height = "1px";
        document.body.appendChild(myIframeSender);
        var doc = myIframeSender.document;
        if(myIframeSender.contentDocument)
            doc = myIframeSender.contentDocument;
        else if(myIframeSender.contentWindow)
            doc = myIframeSender.contentWindow.document;
        var player = MMHKPLUS.getElement("Player");
        doc.open();
        doc.write(
            "<form action='" + MMHKPLUS.URL_PHP + "insert_spy_report.php' method='post'>" 
                + "<input type='hidden' name='worldId' value='" + player.get("worldId") + "' />" 
                + "<input type='hidden' name='allianceId' value='" + player.get("allianceId") + "' />" 
                + "<input type='hidden' name='allianceName' value='" + player.get("allianceName") + "' />" 
                + "<input type='hidden' name='worldSize' value='" + player.get("worldSize") + "'  />" 
                + "<input type='hidden' name='content' value='" + JSON.stringify(content).replace(/'/g, "&#130;") + "'  />" 
                + "<input type='hidden' name='onlySpy' value='true'  />" 
                + "<input type=submit />" 
            + "</form>" 
            + "<script type='text/javascript'>document.forms[0].submit();</script>");
        doc.close();
        setTimeout(function(){$("#MMHKPLUS_AjaxHackIFrame" + time).remove();}, 15000);
    },
    
    exportToImage : function(content)
    {
    	/*
    	 * Content must be compressed with LZW
    	 */
    	var time = $.now();
    	var filename = "toImage_" + time + "_" + Math.floor((Math.random()*100000000)+1);
        var myIframeSender = document.createElement('iframe');
        myIframeSender.id = "MMHKPLUS_AjaxHackIFrame" + filename ;
        myIframeSender.style.position = "absolute";
        myIframeSender.style.top = "1px";
        myIframeSender.style.left = "-15px";
        myIframeSender.style.width = "1px";
        myIframeSender.style.height = "1px";
        document.body.appendChild(myIframeSender);
        var doc = myIframeSender.document;
        if(myIframeSender.contentDocument)
            doc = myIframeSender.contentDocument;
        else if(myIframeSender.contentWindow)
            doc = myIframeSender.contentWindow.document;
        var player = MMHKPLUS.getElement("Player");
        
        doc.open();
        doc.write(
            "<html><body><form action='" + MMHKPLUS.URL_PHP + "export_to_image.php' method='post'>" 
                + "<input type='hidden' name='HTMLContent' value='" + content + "'  />" 
                + "<input type='hidden' name='filename' value='" + filename + "'  />" 
                + "<input type=submit style='display:none;'/>" 
            + "</form>" 
            + "<script type='text/javascript'>document.forms[0].submit();</script></body></html>");
        doc.close();
        setTimeout(function(){$("#MMHKPLUS_AjaxHackIFrame" + filename).remove(); $("div.MMHKPLUS_PNGButton").css("display", "inline");}, 15000);
    },

    sendCartographerData: function(content)
    {
        var time = $.now();
        var myIframeSender = document.createElement('iframe');
        myIframeSender.id = "MMHKPLUS_AjaxHackIFrame" + time ;
        myIframeSender.style.position = "absolute";
        myIframeSender.style.top = "1px";
        myIframeSender.style.left = "-15px";
        myIframeSender.style.width = "1px";
        myIframeSender.style.height = "1px";
        document.body.appendChild(myIframeSender);
        var doc = myIframeSender.document;
        if(myIframeSender.contentDocument)
            doc = myIframeSender.contentDocument;
        else if(myIframeSender.contentWindow)
            doc = myIframeSender.contentWindow.document;
        var player = MMHKPLUS.getElement("Player");
        doc.open();
        doc.write(
            "<form action='" + MMHKPLUS.URL_PHP + "insert_cartographer_data.php' method='post'>" 
                + "<input type='hidden' name='worldId' value='" + player.get("worldId") + "' />"  
                + "<input type='hidden' name='content' value='" + JSON.stringify(content).replace(/'/g, "&#130;") + "'  />" 
                + "<input type=submit />" 
            + "</form>" 
            + "<script type='text/javascript'>document.forms[0].submit();</script>");
        doc.close();
        setTimeout(function(){$("#MMHKPLUS_AjaxHackIFrame" + time).remove();}, 15000);
    },

    getAllianceSpyReports : function(allianceId, playerId, location, x, y, page)
    {
        $.getScript(MMHKPLUS.URL_PHP + "spy_archives.php?" 
            + "worldId=" + MMHKPLUS.getElement("Player").get("worldId")
            + "&allianceId=" + MMHKPLUS.getElement("Player").get("allianceId")
            + "&allianceName=" + allianceId
            + "&playerName=" + playerId
            + "&location=" + location
            + "&x=" + x
            + "&y=" + y
            + "&page=" + page
        );
    },

    getAlliances : function()
    {
        $.getScript(MMHKPLUS.URL_PHP + "get_alliances.php?" 
            + "worldId=" + MMHKPLUS.getElement("Player").get("worldId")
            + "&allianceId=" + MMHKPLUS.getElement("Player").get("allianceId")
        );
    },

    getPlayers : function(allianceId)
    {
        $.getScript(MMHKPLUS.URL_PHP + "get_players.php?" 
            + "worldId=" + MMHKPLUS.getElement("Player").get("worldId")
            + "&allianceId=" + allianceId
        );
    },
	
	_send : function(url, json, callback, sync)
	{
		var self = this;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url, !(isDefined(sync) && sync));
        xmlhttp.onreadystatechange=function() 
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
            {
                var result = JSON.parse(xmlhttp.responseText);
                callback( result );
                // self._processData( result );
                self.jsonHandler.defaultOnComplete(result);

                delete xmlhttp;
            }
        };
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlhttp.setRequestHeader("X-Request", "JSON");
        xmlhttp.send('json=' + JSON.stringify(json));
        return xmlhttp;
	},
	
	_processData : function(d)
	{
        var b = d[MMHKPLUS.HOMMK.JSON_RESPONSE_DATA_PARAM_NAME];
        var f = d[MMHKPLUS.HOMMK.JSON_RESPONSE_TIME_PARAM_NAME];
        var a = d[MMHKPLUS.HOMMK.JSON_RESPONSE_ERROR_PARAM_NAME];
        var g = d[MMHKPLUS.HOMMK.JSON_RESPONSE_UPDATEPUSH_PARAM_NAME] || new Array();
        if (!a || a == 0) {
            g.each(function (k) {
                console.log("Update element : ",  k)
                if (MMHKPLUS.HOMMK.issetElement(k.elementType, k.elementId)) {
                    var j = MMHKPLUS.HOMMK.getElement(k.elementType, k.elementId)
                }
                console.log("            j = ", j);
                switch (k.type) {
                case MMHKPLUS.HOMMK.UPDATEPUSH_TYPE_CONTENT_UPDATE:
                    if (j && j.options && j.options.acceptsPush) {
                        j.updateRefreshable(k.content, f);

                        if(typeof j.getParentElement == "function" && k.elementType && k.elementType.indexOf("RegionCitySummary") != -1)
                        {
                            var f = j;
                            var maxLoop = 20;
                            while(typeof f.getParentElement == "function" && f.getParentElement() && maxLoop != 0)
                            {
                                f = f.getParentElement();
                                console.log("             parent elementType = " + f.elementType);
                                if(f.elementType && f.elementType == "RegionCity")
                                {
                                    console.log("             parent RegionCity found, updating...");

                                    var region = MMHKPLUS.HOMMK.elementPool.obj.RegionCity.obj[f.content.id];
                                    setTimeout(function() { new window.HOMMK.JsonRequestHandler(region.options.refreshablePage, {
                                        onOKResponse: function (l, k) {
                                            window.HOMMK.elementJsonRequestPool[region.getJsonRequestId()] = false;
                                            region.update(l[region.getJsonRequestId()], k);
                                        },
                                        onKOResponse: function (k) {
                                            window.HOMMK.elementJsonRequestPool[region.getJsonRequestId()] = false;
                                        }
                                    }).send({
                                        elParamList: [region.options.refreshableParams]
                                    });}, 3000);


                                    break;
                                }
                                maxLoop --;
                            }
                        }
                        console.log("             done");
                    }
                    break;
                case MMHKPLUS.HOMMK.UPDATEPUSH_TYPE_UPDATE:
                    if (j && j.options && j.options.acceptsPush) {
                        j.updateRefreshable();
                        console.log("             done");
                    }
                    break;
                case MMHKPLUS.HOMMK.UPDATEPUSH_TYPE_LIST_CONTENT_UPDATE:
                    if (j && j.options && j.options.acceptsPush) {
                        j[k.elementListName].updateRefreshable(k.content, f);
                        console.log("             done");
                    }
                    break;
                case MMHKPLUS.HOMMK.UPDATEPUSH_TYPE_LIST_UPDATE:
                    if (j && j.options && j.options.acceptsPush) {
                        j[k.elementListName].updateRefreshable();
                        console.log("             done");
                    }
                    break;
                case MMHKPLUS.HOMMK.UPDATEPUSH_TYPE_DELETE:
                    if (j && j.options && j.options.acceptsPush) {
                        j.immediateTrash();
                        console.log("             done");
                    }
                    break;
                case MMHKPLUS.HOMMK.UPDATEPUSH_TYPE_ADD:
                    if (!j) {
                        var h = window.$A([]);
                        if (k.parentId) {
                            if (MMHKPLUS.HOMMK.issetElement(k.parentType, k.parentId)) {
                                h.include(MMHKPLUS.HOMMK.getElement(k.parentType, k.parentId))
                            }
                        } else {
                            h = MMHKPLUS.HOMMK.getElementListArray(k.parentType)
                        }
                        h.each(function (l) {
                            if (l.isValid) {
                                l["add" + k.elementType + "Content"](k.content, f, true)
                            }
                        });
                        console.log("             done");
                    }
                    break;
                case MMHKPLUS.HOMMK.UPDATEPUSH_TYPE_ACTION:
                    if (j && j.options && j.options.acceptsPush) {
                        j[k.actionName].attempt(k.actionParams ? k.actionParams.split(MMHKPLUS.HOMMK.UPDATEPUSH_ACTION_PARAMS_SEPARATOR) : null, j);
                        console.log("             done");
                    }
                    break;
                default:
                    console.log("Invalid update push type : " + k.type);
                    break
                }
            });
        }
	},

    unload : function()
    {
        delete this.jsonHandler ;
        this.jsonHandler = null;
    }
});
MMHKPLUS.EnhancedUI = MMHKPLUS.ExtendableElement.extend({
	elementType : "EnhancedUI",
	$elemCenterOn : null,
	$elemChat : null,
    originalWorldmapTooltip : null,
    originalTooltipContentFunction : null,
    intervalClockUpdate : null,
    chatType2Injected : false,
    previousChatType : 0,
    intervalUpdateOnline : null,
    isHeroMoveInjected : false,
	
	options : {
		showBuyable : false,
        showPanels : true,
        showInfluence : false,
        showResources : true,
        showMovements : true,
        gameToleft : false,
		chatType : 2 // 0 : normal, 1 : amélioré, 2 : MMHK+ Chat
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		
		this.options.showBuyable = this.load("sB") || this.options.showBuyable;
        this.options.showPanels = (this.load("sP") != null ? this.load("sP") : this.options.showPanels);
        this.options.showInfluence = this.load("sI") || this.options.showInfluence;
        this.options.showResources = this.load("sR") || this.options.showResources;
        this.options.showMovements = (this.load("sM") != null ? this.load("sM") : this.options.showMovements);
        this.options.gameToleft = (this.load("gP") != null ? this.load("gP") : this.options.gameToleft);

		this.options.chatType = (this.load("cT") != null ? this.load("cT") : this.options.chatType);
		
		this._enhanceUi();
		
		return this;
	},
	
	toggleBuyable : function()
	{
		this.options.showBuyable = !this.options.showBuyable;
		this.save("sB", this.options.showBuyable);
		this._setupBuyable();
	},
	
	toggleChat : function(type)
	{
        this.previousChatType = this.options.chatType;
		this.options.chatType = type || 0;
		this.save("cT", this.options.chatType);
        if(MMHKPLUS.getElement("Chat", true).options.opended)
            MMHKPLUS.getElement("Chat").$elem.dialog("close");
		this._setupChat();
	},

    togglePanels : function()
    {
        this.options.showPanels = !this.options.showPanels;
        this.save("sP", this.options.showPanels);
        this._setupPanels();
    },

    toggleInfluence : function()
    {
        this.options.showInfluence = !this.options.showInfluence;
        this.save("sI", this.options.showInfluence);
        this._setupInfluence();
    },

    toggleResources : function()
    {
        this.options.showResources = !this.options.showResources;
        this.save("sR", this.options.showResources);
        this._setupResources();
    },

    toggleGamePosition : function()
    {
        this.options.gameToleft = !this.options.gameToleft;
        this.save("gP", this.options.gameToleft);
        this._setupGamePosition();
    },

    toggleMovements : function()
    {
        this.options.showMovements = !this.options.showMovements;
        this.save("sM", this.options.showMovements);
        this._setupMovements();
    },
	
	_enhanceUi : function()
	{
		this._setupCenterOn();
		this._setupBuyable();
		this._setupChat();
        this._setupPanels();
        this._setupClearMessages();
        this._setupInfluence();
        this._setupResources();
        this._setupBuildEndTime();
        this._setupAllianceReports();
        this._setupClock();
        this._setupMovements();
        this._setupMarketPlaceFrame();
        this._setupGamePosition();
        this._setupSiegeFrame();
        this._setupTimelineCaravansTooltip();
        this._setupBattleRoundBonus();
        this._setupExportToImageButtons();
	},
	
	_setupBuyable : function()
	{
		(this.options.showBuyable ? $("body").removeClass("MMHKPLUS_UiBuyable") :  $("body").addClass("MMHKPLUS_UiBuyable"));
	},

    _setupPanels : function()
    {
        if(!this.options.showPanels)
            $("body").addClass("MMHKPLUS_UiPanels");
        else
            $("body").removeClass("MMHKPLUS_UiPanels");
    },

    _setupInfluence : function()
    {   
        var self = this; 

        var newTooltip = function(a, e)
        {
            var result = self.originalWorldmapTooltip.apply(this,arguments);
            
            if(MMHKPLUS.HOMMK.currentView.viewType == 2)
            {
                var influenced = this.content.aRL;
                var s = MMHKPLUS.HOMMK.worldMap.content._size;

                var e = MMHKPLUS.HOMMK.getRegionLeftFromXY(this.getRelativeX(), this.getRelativeY());
                var d = MMHKPLUS.HOMMK.getRegionTopFromXY(this.getRelativeX(), this.getRelativeY());
                var $container = $("#WorldMapContainer");
                var view = MMHKPLUS.currentView();
                var color = this.content._iaCol || this.content._ipCol || 0;
                influenced.forEach(function(r)
                    {
                        if($.inArray(r[0] + "_" + r[1], view) != -1)
                        {
                            var q = MMHKPLUS.HOMMK.getMapRelativeX(r[0]);
                            var n = MMHKPLUS.HOMMK.getMapRelativeY(r[1]);
                            var j = MMHKPLUS.HOMMK.getRegionLeftFromXY(q, n) - e;
                            var m = MMHKPLUS.HOMMK.getRegionTopFromXY(q, n) - d;
                            m++;
                            
                            var divColor = $("<div/>").css(
                                {
                                    "position" : "absolute",
                                    "top" : 341- ((q - 6) * 32/2) + ((n - 6) * 32/2) + 1 +"px",
                                    "left" : 302 + ((q - 6) * 65/2) + ((n - 6) * 65/2) + "px",
                                    "background-image" : "url(" + MMHKPLUS.URL_IMAGES + "map/color_" + color + ".png)",
                                    "opacity" : "0.75",
                                    "width" : "65px",
                                    "height" : "32px"
                                }
                            ).addClass("MMHKPLUS_UiMapInfluence").appendTo($container);
                        }
                        
                    }
                );
                view.forEach(function(a) { delete a;});
                view = null;
                color = null;
            }

            return result;
        };

        var removeInfluence = function()
        {
            $(".MMHKPLUS_UiMapInfluence").empty();
            $(".MMHKPLUS_UiMapInfluence").remove();
        };

        if(this.options.showInfluence)
        {
            this.originalWorldmapTooltip = MMHKPLUS.HOMMK.Region.prototype.getTooltipContent;
            MMHKPLUS.HOMMK.Region.prototype.getTooltipContent = newTooltip;

            MMHKPLUS.HOMMK.worldMap.setZoomLevel = injectAfter(MMHKPLUS.HOMMK.worldMap.setZoomLevel, removeInfluence);
            MMHKPLUS.HOMMK.setCurrentView = injectAfter(MMHKPLUS.HOMMK.setCurrentView, removeInfluence);
            MMHKPLUS.HOMMK.worldMap.tooltip.onMouseLeave = injectAfter(MMHKPLUS.HOMMK.worldMap.tooltip.onMouseLeave,removeInfluence);
            MMHKPLUS.HOMMK.worldMap.tooltip.hide = injectAfter(MMHKPLUS.HOMMK.worldMap.tooltip.hide,removeInfluence);
        }
        else
        {
            if(this.originalWorldmapTooltip)
                MMHKPLUS.HOMMK.Region.prototype.getTooltipContent = this.originalWorldmapTooltip;
            this.originalWorldmapTooltip = null;
        }
    },

    _setupResources : function()
    {
        var self = this;
        var isRunning = false;

        var ressourcesImages = [
                MMHKPLUS.URL_IMAGES + "ressources/gold.png",
                MMHKPLUS.URL_IMAGES + "ressources/wood.png",
                MMHKPLUS.URL_IMAGES + "ressources/ore.png",
                MMHKPLUS.URL_IMAGES + "ressources/mercury.png",
                MMHKPLUS.URL_IMAGES + "ressources/crystal.png",
                MMHKPLUS.URL_IMAGES + "ressources/sulfure.png",
                MMHKPLUS.URL_IMAGES + "ressources/gem.png",
            ];
        
        var getRessourcesAt = function(x, y)
        {
            var id = "MMHKPLUS_UiResourcePool_" + MMHKPLUS.getElement("Player").get("worldId");
            if(!sessionStorage[id])
                return null;
            return JSON.parse(sessionStorage.getItem(id))[MMHKPLUS.getRegionId(x, y) + ''];
        };

        var putRessourcesInCache = function(regionId)
        {
            if(isRunning)
                return;

            isRunning = true;
            console.log("Getting ressources for " + regionId);
            var size = MMHKPLUS.getElement("Player").get("worldSize");
            $.getScript(MMHKPLUS.URL_PHP + "map_ressources.php?worldId=" 
                    + MMHKPLUS.getElement("Player").get("worldId")
                    + "&regionId=" + regionId 
                    + "&worldSize=" + size, 
                function(e)
                {
                    isRunning = false;
                    var currentX = MMHKPLUS.HOMMK.worldMap.getGoodPosition(MMHKPLUS.HOMMK.worldMap.x + MMHKPLUS.HOMMK.worldMap.lastTooltipX);
                    var currentY = MMHKPLUS.HOMMK.worldMap.getGoodPosition(MMHKPLUS.HOMMK.worldMap.y + MMHKPLUS.HOMMK.worldMap.lastTooltipY);
                    var rAt = getRessourcesAt(currentX, currentY);
                    if(rAt == null)
                    {
                        askForSingleRegion(currentX, currentY);
                    }
                    var tip = $("#MMHKPLUS_UiResources");
                    if(tip.length > 0)
                    {
                        tip.html(createRessourcesToolTip(currentX, currentY));
                    }
                }
            );
        };

        var askForSingleRegion = function(x, y)
        {
            MMHKPLUS.getElement("Ajax").getRegionMapXY(x, y, function(json)
                {
                    var cases = json.d.RegionMap0.attachedZoneList;
                    var result = []; 
                    cases.forEach(function(c)
                        {
                            if(hasProperty(c, "attachedMine"))
                            {
                                (c.attachedMine.ressourceEntityTagName=="GOLD")?result.push(1):0;
                                (c.attachedMine.ressourceEntityTagName=="WOOD")?result.push(2):0;
                                (c.attachedMine.ressourceEntityTagName=="ORE")?result.push(3):0;
                                (c.attachedMine.ressourceEntityTagName=="MERCURY")?result.push(4):0;
                                (c.attachedMine.ressourceEntityTagName=="CRYSTAL")?result.push(5):0;
                                (c.attachedMine.ressourceEntityTagName=="SULFUR")?result.push(6):0;
                                (c.attachedMine.ressourceEntityTagName=="GEM")?result.push(7):0;
                            }
                        }
                    );
                    result = result.sort();
                    var resources = JSON.parse(sessionStorage.getItem("MMHKPLUS_UiResourcePool_" + MMHKPLUS.getElement("Player").get("worldId")));
                    resources[MMHKPLUS.getRegionId(x, y)] = result;
                    sessionStorage.setItem("MMHKPLUS_UiResourcePool_" + MMHKPLUS.getElement("Player").get("worldId"), JSON.stringify(resources));
                    var tip = $("#MMHKPLUS_UiResources");
                    if(tip.length > 0)
                    {
                        var currentX = MMHKPLUS.HOMMK.worldMap.getGoodPosition(MMHKPLUS.HOMMK.worldMap.x + MMHKPLUS.HOMMK.worldMap.lastTooltipX);
                        var currentY = MMHKPLUS.HOMMK.worldMap.getGoodPosition(MMHKPLUS.HOMMK.worldMap.y + MMHKPLUS.HOMMK.worldMap.lastTooltipY);
                        if(currentX == x && currentY == y)
                            tip.html(createRessourcesToolTip(x, y));
                    }
                }
            );
        };
        
        var createRessourcesToolTip = function(x, y)
        {
            var rAt = getRessourcesAt(x, y);
            if(!rAt)
            {
                putRessourcesInCache(MMHKPLUS.getRegionId(x, y));
                return "<i>" + MMHKPLUS.localize("IN_PROGRESS") + "</i>";
            }
            if(rAt.length == 0)
            {
                return MMHKPLUS.localize("NONE");
            }
            else
            {
                return "<img src='" + ressourcesImages[rAt[0]-1] + "' style='width:20px;height:20px'/>&nbsp;&nbsp;"
                     + "<img src='" + ressourcesImages[rAt[1]-1] + "' style='width:20px;height:20px'/>&nbsp;&nbsp;"
                     + "<img src='" + ressourcesImages[rAt[2]-1] + "' style='width:20px;height:20px'/>&nbsp;&nbsp;"
                     + "<img src='" + ressourcesImages[rAt[3]-1] + "' style='width:20px;height:20px'/>";
            }
        };

        var newToolTipContent = function()
        {
            var originalTip = self.originalTooltipContentFunction.apply(this,arguments);
            if(originalTip && !originalTip.match(/id='MMHKPLUS_UiResources/))
            {
                var currentX = MMHKPLUS.HOMMK.worldMap.getGoodPosition(MMHKPLUS.HOMMK.worldMap.x + MMHKPLUS.HOMMK.worldMap.lastTooltipX);
                var currentY = MMHKPLUS.HOMMK.worldMap.getGoodPosition(MMHKPLUS.HOMMK.worldMap.y + MMHKPLUS.HOMMK.worldMap.lastTooltipY);
                
                originalTip += "<div id='MMHKPLUS_UiResources'>" + createRessourcesToolTip(currentX, currentY) + "</div>"
            }
            return originalTip;
        };

        if(this.options.showResources)
        {
            this.originalTooltipContentFunction = MMHKPLUS.HOMMK.worldMap.tooltip.htmlContentFunction; 

            MMHKPLUS.HOMMK.worldMap.tooltip.htmlContentFunction = newToolTipContent;
        }
        else
        {
            if(this.originalTooltipContentFunction)
                MMHKPLUS.HOMMK.worldMap.tooltip.htmlContentFunction = this.originalTooltipContentFunction;
            this.originalTooltipContentFunction = null;
        }
    },

    _setupMovements : function()
    {
        var onUpdatePlots = function(result, X, Y)
        {
            var i, p, x, y;
            var zoom = this.getParentElement().zoomLevel, 
                size = MMHKPLUS.getElement("Player").get("worldSize"),
                size2 = size / 2, 
                plots = this.plotList[zoom], 
                length = plots.length;
            
            for ( i = 0; i < length; i++)
            {
                p = plots[i];
                p.element.className = p.element.className.replace("MMHKPLUS_UiBigPlot", "");

                x = X; y = Y;
                if ( (p.x - X) > size2 ) { x += size; } else if ( (X - p.x) > size2 ) { x -= size; }
                if ( (p.y - Y) > size2 ) { y += size; } else if ( (Y - p.y) > size2 ) { y -= size; }
                if (((this.xDir >= 0 && x >= p.x) || (this.xDir <= 0 && x <= p.x)) 
                    && ((this.yDir >= 0 && y >= p.y) || (this.yDir <= 0 && y <= p.y)))
                {
                    p.element.className += " MMHKPLUS_UiBigPlot";
                }
            }
            return result;
        };

        if(!this.isHeroMoveInjected)
        {
            MMHKPLUS.HOMMK.HeroMove.prototype.updatePlotSize = injectAfter(MMHKPLUS.HOMMK.HeroMove.prototype.updatePlotSize, onUpdatePlots);

            this.isHeroMoveInjected = true;   
        }
        if(this.options.showMovements)
        {
            $("body").removeClass("MMHKPLUS_UiMovements");
        }
        else
        {
            $("body").addClass("MMHKPLUS_UiMovements");
        }
    },

    _setupGamePosition : function()
    {
        var y = "10px";
        if(MMHKPLUS.getElement("Menu").options.type != 0)
            y = "0px";
        if(this.options.gameToleft)
            $("body").attr("style", "float:left; background-position:-295px " + y + " !important;");
        else
            $("body").attr("style","");
    },
	
	_setupCenterOn : function()
	{
		var $container = $("<div>").addClass("MMHKPLUS_UiCenterOn").appendTo($("div.toolbarBg"));
		
		$("<label>").html("X : ").appendTo($container);
		$("<input maxlength='3' style='width:35px;'>").appendTo($container);
		$("<label>").html(" Y : ").appendTo($container);
		$("<input maxlength='3' style='width:35px;'>").appendTo($container);
		$("<div>").button()
			.css({height : "20px", width : "80px", marginLeft : "10px", marginTop : "3px", lineHeight : "20px"})
			.html(MMHKPLUS.localize("CENTER"))
			.click(function()
				{
					var $x = $container.find("input:first");
					var $y = $container.find("input:last");
					var x = parseInt($x.val());
					var y = parseInt($y.val());
					
					$x.val(""); $y.val("");
					
					MMHKPLUS.centerOn(x, y);
				})
			.appendTo($container);
		this.$elemCenterOn = $container;
	},

	_setupChat : function()
	{
        var self = this;
        MMHKPLUS.HOMMK.Chat.prototype.renderMessage = injectAfter(MMHKPLUS.HOMMK.Chat.prototype.renderMessage, function(result, f, h)
            {
                if(!f.toBePaid && typeof result == "string")
                {
                    result = result.replace("background-image: url('%avatar%');", "");
                    var contentText = result.match("<span class=\"chatsystemspeakcontent\">(.*)</span>");
                    if(contentText && contentText[1])
                    {
                        var content = contentText[1];
                        content = content.replace(new RegExp("(((f|ht){1}tp(s)?://)[-a-zA-Z0-9@:%_\+.~#?&//=]+)", "gi"),"<a href='$1' target='_blank' style='color:blue;'>$1</a> ");
                        content = content.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");
                        content = content.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*\-\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");
                        content = content.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*\.\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");
                        content = content.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*:\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");     
                        content = content.replace(/MMHKPLUS_ScoutPL\(([0-9]+),([A-Za-z0-9_\-\s'"\?\!\w]+)\)/,"<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.getElement(\"Ajax\").getSpyReportContent($1);'>$2</span>");
                        content = content.replace(/MMHKPLUS_HeroPL\(([0-9]+),([0-9]+),([A-Za-z0-9_\-\s'"\?\!\w]+)\)/,"<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.openDisplayable(\"AllianceHeroes\");MMHKPLUS.getElement(\"AllianceHeroes\")._loadHero($1,$2);'>$3</span>");
                        result = result.replace(/<span class=\"chatsystemspeakcontent\">(.*)<\/span>/, "<span class=\"chatsystemspeakcontent\">" + content + "</span>");
                    }
                }
                return result;
            }
        );
        if(this.previousChatType == 1)
        {
            $("div.chatsystem").resizable().resizable("destroy");
        }

		if(this.options.chatType == 2)
		{
			this.$elemChat = $("<div>").button()
				.html(MMHKPLUS.localize("CHAT_BUTTON"))
				.addClass("MMHKPLUS_UiChatButton")
				.click(function()
					{
						MMHKPLUS.openDisplayable("Chat");
					})
				.appendTo($("div.toolbarBg").children());
			
			$(".chatsystemmincontainer").addClass("hidden");
            $(".chatsystem").addClass("hidden");
		}
        else if(this.options.chatType == 1)
        {
            var previsousIsP2P = false; 

            var $chatsystemp2ptab = $("ul.chatsystemp2ptab");
            var $chatsystemcontent = $("div.chatsystemcontent");
            var $chatsysteminput = $("div.chatsysteminput");
            var $chatsystemtab = $("ul.chatsystemtab");
            var $chatmessageslistcontainer = $("div.chatmessageslistcontainer");
            var $chatsysteminputbar = $("input.chatsysteminputbar");
            var $chatsystemcontainer = $("div.chatsystemcontainer");

            var onTabChanged = function()
            {
                if(MMHKPLUS.getElement("EnhancedUI").options.chatType == 1 && this.tab == "p2p")
                {
                    $chatmessageslistcontainer.css("height", parseInt($chatsystemcontent.css("height").replace("px", "")) - 28 + "px");
                    $chatsystemcontent.css("height", parseInt($chatsystemcontent.css("height").replace("px", "")) - 28 + "px");
                    previsousIsP2P = true;
                }
                else if(MMHKPLUS.getElement("EnhancedUI").options.chatType == 1 && previsousIsP2P)
                {
                    previsousIsP2P = false;
                    $chatmessageslistcontainer.css("height", parseInt($chatsystemcontent.css("height").replace("px", "")) + 28 + "px");
                    $chatsystemcontent.css("height", parseInt($chatsystemcontent.css("height").replace("px", "")) + 28 + "px");
                }
            };
            var onDragComplete = function()
            {
                if(MMHKPLUS.getElement("EnhancedUI").options.chatType == 1)
                {
                    MMHKPLUS.getElement("EnhancedUI").save("cT1x", parseInt($chatsystemcontainer.css("left").replace("px", "")));
                    MMHKPLUS.getElement("EnhancedUI").save("cT1y", parseInt($chatsystemcontainer.css("top").replace("px", "")));
                }
            };
            var onOpen = function()
            {
                $chatsystemcontainer.css("top", MMHKPLUS.getElement("EnhancedUI").load("cT1y") || -260);
                $chatsystemcontainer.css("left", MMHKPLUS.getElement("EnhancedUI").load("cT1x") || -328);
                $rez.css("width", MMHKPLUS.getElement("EnhancedUI").load("cT1w") || 320);
                $rez.css("height", MMHKPLUS.getElement("EnhancedUI").load("cT1h") || 260);
                $chatsystemcontent.css("width", MMHKPLUS.getElement("EnhancedUI").load("cT1w") || 320);
                $chatsystemcontent.css("height", (MMHKPLUS.getElement("EnhancedUI").load("cT1h") || 260) - 106);
                onResize();
                MMHKPLUS.getElement("EnhancedUI").save("cT1o", true);
                self.intervalUpdateOnline = setInterval(updateOnlineMembers, 30000);
                updateOnlineMembers();
            };
            var onClose = function()
            {
                MMHKPLUS.getElement("EnhancedUI").save("cT1o", false);
                MMHKPLUS.clearInterval(self.intervalUpdateOnline); self.intervalUpdateOnline = null;
            };
            var onResize = function(e, ui)
            {
                $chatsysteminput.css("width",$chatsystemcontent.css("width"));
                $chatsystemtab.css("width", $chatsystemcontent.css("width"));
                $chatmessageslistcontainer.css("width", parseInt($chatsystemcontent.css("width").replace("px", "")) - 19 + "px");
                $chatmessageslistcontainer.css("height", parseInt($chatsystemcontent.css("height").replace("px", "")) + "px");
                $chatsystemp2ptab.css("width", $chatsystemcontent.css("width"));
                $chatsysteminputbar.css("width",  parseInt($chatsystemcontent.css("width").replace("px", "")) - 55 - 75 - 25 + "px");
                
                MMHKPLUS.HOMMK.elementPool.obj.Chat.values()[0].updateSlider();

                MMHKPLUS.getElement("EnhancedUI").save("cT1w", parseInt($rez.css("width").replace("px", "")));
                MMHKPLUS.getElement("EnhancedUI").save("cT1h", parseInt($rez.css("height").replace("px", "")));
            };
            var updateOnlineMembers = function()
            {
                if($online.is(":visible"))
                {
                    MMHKPLUS.getElement("Ajax").getAllianceFrame(MMHKPLUS.getElement("Player").get("allianceId"),
                        function(json)
                        {
                            $online.find("p.MMHKPLUS_Chat1Online").remove();

                            var members = json.d[Object.keys(json.d)[0]].attachedPlayerList;
                                members.forEach(function(member)
                                {
                                    if(member.status == "ONLINE" && member.id != MMHKPLUS.getElement("Player").get("playerId"))
                                    {
                                        $online.append(
                                            $("<p>")
                                                .addClass("MMHKPLUS_Chat1Online")
                                                .css("marginLeft", "8px")
                                                .css("cursor", "pointer")
                                                .html("● " + member.name)
                                                .click(function()
                                                    {
                                                        MMHKPLUS.HOMMK.elementPool.obj.Chat.values()[0].chatWithPlayer(member.name);
                                                    }));
                                    }
                                }
                            );
                        }
                    );
                }
            };

            if(!this.chatType2Injected)
            {
                MMHKPLUS.HOMMK.Chat.prototype.setType = injectAfter(MMHKPLUS.HOMMK.Chat.prototype.setType, onTabChanged);
                MMHKPLUS.HOMMK.Chat.prototype.moveBackToScreen = injectAfter(MMHKPLUS.HOMMK.Chat.prototype.moveBackToScreen, onDragComplete);
                MMHKPLUS.HOMMK.Chat.prototype.open = injectAfter(MMHKPLUS.HOMMK.Chat.prototype.open, onOpen);
                MMHKPLUS.HOMMK.Chat.prototype.close = injectAfter(MMHKPLUS.HOMMK.Chat.prototype.close, onClose);

                this.chatType2Injected = true;
            }
            
            var $rez = $("div.chatsystem").resizable();
            $chatsysteminput.css({background : "url(http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/4.0.17-MTR/img/chat/chatsystem.gif) left -102px repeat-x"});
            $("div.chatsystemmorebutton").css({background : "url(http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/4.0.17-MTR/img/chat/chatsystem.gif) left -78px repeat-x"});
            $rez.resizable( 
                {
                    alsoResize :  "div.chatsystemcontent,div.chatsystem", 
                    minWidth: 320,
                    minHeight : 250,

                    stop : onResize
                } 
            );
            $chatsysteminputbar.removeAttr("maxlength");

            var $online = $("<div>")
                .css({position:"absolute", top:"0px",right:"-133px", width:"130px", height:"100%"})
                .css({background:"rgba(169,141,120,1)", borderRadius:"0 10px 10px 0", border:"1px solid rgba(81,50,39,1)", borderLeft:"none"})
                .css({color:"#FFFFFF", overflowX:"hidden", overflowY:"auto"});
            $online
                .append(
                    $("<p>")
                        .addClass("MMHKPLUS_TextCenter")
                        .html(MMHKPLUS.localize("ONLINE"))
                        .css("fontSize", "120%"))
                .append($("<br>"));

            $rez.append($online);
            $rez.append(
                $("<div>")
                    .css({position:"absolute",top:"6px",left:"10px", color:"#FFFFFF", cursor:"pointer"})
                    .html(MMHKPLUS.localize("ONLINE"))
                    .click(function()
                        {
                            if($online.is(":visible"))
                                $online.hide();
                            else
                            {
                                $online.show();
                                updateOnlineMembers();
                            }
                        }));
            $online.hide();

            if(this.load("cT1o"))
                setTimeout(function() { MMHKPLUS.HOMMK.elementPool.obj.Chat.values()[0].open(); }, 250);
        }
		else if(this.options.chatType == 0)
		{
			if(this.$elemChat) MMHKPLUS.resetElement(this.$elemChat);
			this.$elemChat = null;
			$(".chatsystemmincontainer").removeClass("hidden");
            $(".chatsystem").removeClass("hidden");
			var chat = MMHKPLUS.getElement("Chat");
			if(chat && chat.options.opened)
			{
				chat.$elem.dialog("close");
			}
		}
	},

    _setupClearMessages : function()
    {
        var simplifiedMessages = function()
        {
            var content = this.getChildElement("Content");
            if(content)
            {
                var newContent = content.innerHTML.replace(/------------------------------<br>/g, '<br><hr style="clear:none;border-top:1px solid #666">');
                // newContent = newContent.replace(/>([0-9]{1,2}\/[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}) De :([\u0000-\uFFFF]+?)<br>(À : [\u0000-\uFFFF]+?)<br>Sujet :([\u0000-\uFFFF]+?)<br>/g, '><span style="font-size:11px;font-weight:bold;color:#990033;">$1<\/span><span style="font-size:11px;font-weight:bold;color:#990033;"> ' + MMHKPLUS.localize("FROM_MSG") + ' $2<\/span><br/><span style="font-size:11px;font-style:italic;color:#990033;">$3<\/span><br/>');
                newContent = newContent.replace(/>([0-9]{1,2}\/[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}) De :([\u0000-\uFFFF]+?)<br>(À : [\u0000-\uFFFF]+?)<br>Sujet :([\u0000-\uFFFF]+?)<br>/g, '><span style="font-size:11px;font-weight:bold;color:#990033;">$1<\/span><span style="font-size:11px;font-weight:bold;color:#990033;"> ' + MMHKPLUS.localize("FROM_MSG") + ' $2<\/span><br/><span style="font-size:11px;color:#990033;">$3<\/span><br/>');
                newContent = newContent.replace(/>([0-9]{1,2}\/[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}) From :([\u0000-\uFFFF]+?)<br>(To : [\u0000-\uFFFF]+?)<br>Subject :([\u0000-\uFFFF]+?)<br>/g, '><span style="font-size:11px;font-weight:bold;color:#990033;">$1<\/span><span style="font-size:11px;font-weight:bold;color:#990033;"> ' + MMHKPLUS.localize("FROM_MSG") + ' $2<\/span><br/><span style="font-size:11px;color:#990033;">$3<\/span><br/>');
                newContent = newContent.replace(new RegExp("(((f|ht){1}tp(s)?://)[-a-zA-Z0-9@:%_\+.~#?&//=]+)", "gi"),"<a href='$1' target='_blank' style='color:blue;'>$1</a> ");
                newContent = newContent.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");
                newContent = newContent.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*\-\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");
                newContent = newContent.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*\.\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");
                newContent = newContent.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*:\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");
                newContent = newContent.replace(/MMHKPLUS_ScoutPL\(([0-9]+),([A-Za-z0-9_\-\s'"\?\!\w]+)\)/,"<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.getElement(\"Ajax\").getSpyReportContent($1);'>$2</span>");
                newContent = newContent.replace(/MMHKPLUS_HeroPL\(([0-9]+),([0-9]+),([A-Za-z0-9_\-\s'"\?\!\w]+)\)/,"<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.openDisplayable(\"AllianceHeroes\");MMHKPLUS.getElement(\"AllianceHeroes\")._loadHero($1,$2);'>$3</span>");

                content.innerHTML = newContent;
                newContent = null;
            }
        };
        var types = 
            [
                'DetailedMessage', 'BattleResultDetailedMessage', 'CityScoutingResultDetailedMessage', 
                'RegionScoutingResultDetailedMessage', 'TroopScoutingResultDetailedMessage', 'AcceptDeclineDetailedMessage', 
                'MultiChoiceDetailedMessage', 'PlayerInvitationKeyDetailedMessage', 'CrmDetailedMessage'
            ];
        types.forEach(function(t)
            {
                MMHKPLUS.HOMMK[t].prototype.display = injectAfter(MMHKPLUS.HOMMK[t].prototype.display, simplifiedMessages);
            }
        );

        var filter = function(self, pattern, check)
        {
            pattern = pattern.trim().toUpperCase();
            check = isDefined(check) || false;
            if(hasProperty(self, "currentMessageList"))
            {
                if(hasProperty(self.currentMessageList, "elementList"))
                {
                    self.currentMessageList.elementList.forEach(function(e)
                        {
                            if(pattern == ""
                                || e.content.subject.toUpperCase().indexOf(pattern) != -1
                                || (hasProperty(e.content, "exp_playerName") ? e.content.exp_playerName.toUpperCase().indexOf(pattern) != -1 : false))
                            {
                                $(e.mainElement).removeClass("hidden");
                                if(check && pattern != "")
                                    //$(e.checkBox).attr("checked", true);
                                    e.check();
                                else
                                    //$(e.checkBox).attr("checked", false);
                                    e.uncheck();
                            }
                            else
                            {
                                $(e.mainElement).addClass("hidden");
                                //$(e.checkBox).attr("checked", false);
                                e.uncheck();
                            }
                            e.checkBoxChange();
                        }
                    );
                }
            }
        };

        var contentFilter = function()
        {
            var self = this;
            var tb = self.getChildElement('ToolBar');
            var $input = $("<input>").css("width", "150px");
            $(tb).append(
                $("<div>")
                    .css({paddingTop:"5px", marginLeft:"140px"})
                    .append(
                        $("<span>")
                            .html(MMHKPLUS.localize("FILTER") + " : "))
                    .append(
                        $input
                            .keyup(function() { filter(self, $input.val());}))
                    .append(
                        $("<div>")
                            .button()
                            .css({padding:"2px",marginLeft:"10px"})
                            .click(function() { filter(self, $input.val(), true);})
                            .html(MMHKPLUS.localize("CHECK")))
                    .append(
                        $("<div>")
                            .button()
                            .css({padding:"2px",marginLeft:"10px"})
                            .click(function() { $input.val(""); filter(self, ""); })
                            .html(MMHKPLUS.localize("CLEAN"))));
        };
        MMHKPLUS.HOMMK.MessageBoxFrame.prototype.setContent = injectAfter(MMHKPLUS.HOMMK.MessageBoxFrame.prototype.setContent, contentFilter);
    },

    _setupBuildEndTime : function()
    {
        var intervalRefresh = null; 

        var getEndDate = function(slider)
        {
            var d = new Date(); d.setTime(d.getTime() + slider.baseDuration * slider.timeRatio * 1000);
            return d.toShortFrenchFormat();
        };
        
        var injectEndTime = function(type)
        {
            return function()
            {
                var slider = this.actionDurationSlider;
                var frame = $(this.mainElement);
                
                if(!slider || !frame)
                    return;
                
                if(!type ||
                    (type == "mine" && this.selectedAction && (this.selectedAction === 'IMPROVE_MINE' || this.selectedAction === 'UPGRADE_MINE') && MMHKPLUS.HOMMK.selectedHeroId))
                {
                    var $container = $("#MMHKPLUS_UiEndTime");
                    if($container.length == 0)
                    {
                        $container = $("<div>").attr("id", "MMHKPLUS_UiEndTime").css(
                            {
                                "position" : "relative",
                                "bottom" : "85px",
                                "right" : "15px",
                                "float" : "right",
                                "width" : "80px",
                                "background" : "rgba(0,0,0,0.75)",
                                "border" : "1px solid #FFFFFF",
                                "border-radius" : "10px",
                                "padding" : "5px",
                                "color" : "#FFFFFF",
                                "text-align" : "center"
                                
                            }
                        ).appendTo(frame);
                    }
                    else
                    {
                        $container.remove();
                        $container.appendTo(frame);
                    }
                    
                    $container.html(getEndDate(slider));
                    if(intervalRefresh)
                    {
                        clearInterval(intervalRefresh);
                        intervalRefresh = null;
                    }
                    intervalRefresh = setInterval(function()
                        {
                            $container.html(getEndDate(slider));
                        }, 
                        1000
                    );
                }
            }
        };

        var clearRefreshInterval = function()
        {
            if(intervalRefresh)
            {
                clearInterval(intervalRefresh);
                intervalRefresh = null;
            }
            if($("#MMHKPLUS_UiEndTime").length > 0)
            {
                $("#MMHKPLUS_UiEndTime").empty();
                $("#MMHKPLUS_UiEndTime").remove();
            }
        };

        MMHKPLUS.HOMMK.MineUpgradeFrame.prototype.showActionChoiceZone = injectAfter(MMHKPLUS.HOMMK.MineUpgradeFrame.prototype.showActionChoiceZone, injectEndTime("mine"));
        MMHKPLUS.HOMMK.ZoneBuildingUpgradeFrame.prototype.showActionChoiceZone = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingUpgradeFrame.prototype.showActionChoiceZone, injectEndTime());
        MMHKPLUS.HOMMK.ZoneBuildingFrame.prototype.showActionChoiceZone = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingFrame.prototype.showActionChoiceZone, injectEndTime());
        MMHKPLUS.HOMMK.CityBuildingFrame.prototype.displayRefreshable = injectAfter(MMHKPLUS.HOMMK.CityBuildingFrame.prototype.displayRefreshable, injectEndTime());
        
        MMHKPLUS.HOMMK.MineUpgradeFrame.prototype.hide = injectAfter(MMHKPLUS.HOMMK.MineUpgradeFrame.prototype.hide, clearRefreshInterval);
        MMHKPLUS.HOMMK.ZoneBuildingUpgradeFrame.prototype.hide = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingUpgradeFrame.prototype.hide, clearRefreshInterval);
        MMHKPLUS.HOMMK.ZoneBuildingStorehouseUpgradeFrame.prototype.hide = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingStorehouseUpgradeFrame.prototype.hide, clearRefreshInterval);
        MMHKPLUS.HOMMK.ZoneBuildingFrame.prototype.hide = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingFrame.prototype.hide, clearRefreshInterval);
        MMHKPLUS.HOMMK.CityBuildingFrame.prototype.hide = injectAfter(MMHKPLUS.HOMMK.CityBuildingFrame.prototype.hide, clearRefreshInterval);
        
        MMHKPLUS.HOMMK.MineUpgradeFrame.prototype.unsetAction = injectAfter(MMHKPLUS.HOMMK.MineUpgradeFrame.prototype.unsetAction, clearRefreshInterval);
        MMHKPLUS.HOMMK.ZoneBuildingUpgradeFrame.prototype.resetActionSelector = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingUpgradeFrame.prototype.resetActionSelector, clearRefreshInterval);
        MMHKPLUS.HOMMK.ZoneBuildingFrame.prototype.resetActionSelector = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingFrame.prototype.resetActionSelector, clearRefreshInterval);
        MMHKPLUS.HOMMK.ZoneBuildingStorehouseUpgradeFrame.prototype.selectUnspecializationAction = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingStorehouseUpgradeFrame.prototype.selectUnspecializationAction, clearRefreshInterval);
        MMHKPLUS.HOMMK.ZoneBuildingStorehouseUpgradeFrame.prototype.resetResourceSelector = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingStorehouseUpgradeFrame.prototype.resetResourceSelector, clearRefreshInterval);
        MMHKPLUS.HOMMK.ZoneBuildingStorehouseUpgradeFrame.prototype.resetActionSelector = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingStorehouseUpgradeFrame.prototype.resetActionSelector, clearRefreshInterval);
    },

    _setupAllianceReports : function()
    {
        if(MMHKPLUS.getElement("Player").isInAlliance())
        {
            var lastMessage = -1; 

            var checkScoutingMessage = function()
            {
                if(this.openedMessageType == "TroopScoutingResultDetailedMessage" 
                    || this.openedMessageType == "RegionScoutingResultDetailedMessage" 
                    || this.openedMessageType == "CityScoutingResultDetailedMessage")
                {
                    var message = this.getOpenedDetailedMessage();
                    if(message.content.id != lastMessage)
                    {
                        var content = $.extend(true, {}, message.content);
                        // Remove some unecessary values
                        if(hasProperty(content, "summaryContent")) delete content.summaryContent;
                        if(hasProperty(content, "exp_playerId")) delete content.exp_playerId;
                        if(hasProperty(content, "exp_playerName")) delete content.exp_playerName;
                        if(hasProperty(content, "exp_backgroundNb")) delete content.exp_backgroundNb;
                        if(hasProperty(content, "exp_iconNb")) delete content.exp_iconNb;
                        if(hasProperty(content, "exp_patternNb")) delete content.exp_patternNb;
                        if(hasProperty(content, "exp_avatar")) delete content.exp_avatar;
                        if(hasProperty(content, "exp_allianceId")) delete content.exp_allianceId;
                        if(hasProperty(content, "exp_allianceName")) delete content.exp_allianceName;
                        if(hasProperty(content, "recptPlayerNameList")) delete content.recptPlayerNameList;
                        if(hasProperty(content, "isRead")) delete content.isRead;
                        if(hasProperty(content, "isArchived")) delete content.isArchived;
                        if(hasProperty(content, "isAllianceChiefMessage")) delete content.isAllianceChiefMessage;
                        if(hasProperty(content, "subject")) delete content.subject;
                        if(hasProperty(content, "isArchived")) delete content.isArchived;
                        if(hasProperty(content, "patrol_heroId")) delete content.patrol_heroId;
                        if(hasProperty(content, "XPGainedStr")) delete content.XPGainedStr;

                        if(hasProperty(content, "contentJSON"))
                        {
                            if(hasProperty(content.contentJSON, "message")) delete content.contentJSON.message;

                            if(hasProperty(content.contentJSON, "defenseUnitStackList"))
                            {
                                content.contentJSON.defenseUnitStackList.forEach(function(d, di)
                                    {
                                        delete content.contentJSON.defenseUnitStackList[di].id;
                                        delete content.contentJSON.defenseUnitStackList[di].unitEntityName;
                                        delete content.contentJSON.defenseUnitStackList[di].unitEntityTypeName;
                                    }
                                );
                            }

                            if(hasProperty(content.contentJSON, "regionUnitStackList"))
                            {
                                content.contentJSON.regionUnitStackList.forEach(function(d, di)
                                    {
                                        delete content.contentJSON.regionUnitStackList[di].id;
                                        delete content.contentJSON.regionUnitStackList[di].unitEntityName;
                                        delete content.contentJSON.regionUnitStackList[di].unitEntityTypeName;
                                        delete content.contentJSON.regionUnitStackList[di].powerPosition;
                                    }
                                );
                            }

                            if(hasProperty(content.contentJSON, "heroList"))
                            {
                                content.contentJSON.heroList.forEach(function(h, hi)
                                    {
                                        if(hasProperty(h, "attachedUnitStackList"))
                                        {
                                            h.attachedUnitStackList.forEach(function(u, ui)
                                                {
                                                    delete content.contentJSON.heroList[hi].attachedUnitStackList[ui].id;
                                                    delete content.contentJSON.heroList[hi].attachedUnitStackList[ui].unitEntityName;
                                                    delete content.contentJSON.heroList[hi].attachedUnitStackList[ui].powerPosition;
                                                }
                                            );
                                        }

                                        if(hasProperty(h, "artefactList"))
                                        {
                                            h.artefactList.forEach(function(a, ai)
                                                {
                                                    delete content.contentJSON.heroList[hi].artefactList[ai].id;
                                                    delete content.contentJSON.heroList[hi].artefactList[ai].heroId;
                                                    delete content.contentJSON.heroList[hi].artefactList[ai].binded;
                                                    delete content.contentJSON.heroList[hi].artefactList[ai].associated;
                                                    delete a.position

                                                    delete content.contentJSON.heroList[hi].artefactList[ai].artefactEntity.isSellable;
                                                    delete content.contentJSON.heroList[hi].artefactList[ai].artefactEntity.discounted;
                                                    delete content.contentJSON.heroList[hi].artefactList[ai].artefactEntity.isApiEnabled;
                                                    
                                                    var i = 1;
                                                    while(hasProperty(a.artefactEntity, "effect" + i + "_effectEntityId"))
                                                    {
                                                        delete content.contentJSON.heroList[hi].artefactList[ai].artefactEntity["effect" + i + "_effectEntityId"];
                                                        delete content.contentJSON.heroList[hi].artefactList[ai].artefactEntity["effect" + i + "_effectEntityTagName"];
                                                        delete content.contentJSON.heroList[hi].artefactList[ai].artefactEntity["effect" + i + "_level"];
                                                        i++;
                                                    }
                                                }
                                            );
                                        }

                                        if(hasProperty(h, "heroClassList"))
                                        {
                                            h.heroClassList.forEach(function(c, ci)
                                                {
                                                    delete content.contentJSON.heroList[hi].heroClassList[ci].id; 
                                                    delete content.contentJSON.heroList[hi].heroClassList[ci].heroId; 
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }

                        MMHKPLUS.getElement("Ajax").sendSpyReport(content);
                        lastMessage = message.content.id;
                    }
                }
            };

            MMHKPLUS.HOMMK.WorldMap.prototype.selectRegion = injectAfter(MMHKPLUS.HOMMK.WorldMap.prototype.selectRegion, MMHKPLUS.getElement("Ajax").getSpyReportsForSelectedRegion);
            MMHKPLUS.HOMMK.MessageBoxFrame.prototype.displayMessage = injectAfter(MMHKPLUS.HOMMK.MessageBoxFrame.prototype.displayMessage, checkScoutingMessage);   
        }
    },

    _setupClock : function()
    {
        var time = new Date(); time.setTime($.now());

        var $clock = $("<div>").addClass("MMHKPLUS_Clock").css({position:"absolute", top:"35px", left:"140px", zIndex:1000}).appendTo($("#Container"));
        this.intervalClockUpdate = setInterval(function()
            {
                time.setTime($.now());
                $("div.MMHKPLUS_Clock").html(time.toHoursMinSecFormat());
            },
            1000
        );
    },

    _setupMarketPlaceFrame : function()
    {
        var onArtefactAuctionDisplay = function()
        {
            var self = this;
            MMHKPLUS.HOMMK.ARTEFACT_BODYPART_LIST.forEach(function(a) 
                { 
                    if(self.artefactAuctionOfferList.bodyPartFilterList.indexOf(a) == -1)
                        self.artefactAuctionOfferList.bodyPartFilterList.push(a); 
                } 
            );
            self.artefactAuctionOfferList.setBodyPartFilter(self.artefactAuctionBodyPartFilterList);
            self.artefactAuctionOfferListSlider.updateDimensions();
        };

        MMHKPLUS.HOMMK.MarketPlaceFrame.prototype.displayArtefactAuctionTab = injectAfter(MMHKPLUS.HOMMK.MarketPlaceFrame.prototype.displayArtefactAuctionTab, onArtefactAuctionDisplay);
    },

    _setupSiegeFrame : function()
    {
        var onSiegeFrameDisplay = function()
        {
            var x = this.content.targetedRegion.x;
            var y = this.content.targetedRegion.y;
            var $header = $(this.mainElement).find("div.siegeFrameRegionCityZone");
            $header.append(
                $("<div>")
                    .button()
                    .html(MMHKPLUS.localize("CENTER"))
                    .css("padding", 3)
                    .css("float", "right")
                    .click(function() 
                        {
                            MMHKPLUS.centerOn(x, y);
                        }));
        };

        MMHKPLUS.HOMMK.SiegeFrame.prototype.display = injectAfter(MMHKPLUS.HOMMK.SiegeFrame.prototype.display, onSiegeFrameDisplay);
    },
    
    _setupTimelineCaravansTooltip : function() 
    {
    	var caravansContent = function(result) 
    	{
    		var newResult = result;
    		if(this.content.type == "CARAVAN_DELIVERY") 
			{
    			var $content = $(newResult);
    			for(var i = 1; i <=7; i++)
    			{
    				$content
    					.append(
    							MMHKPLUS.getCssSprite("Ressources", MMHKPLUS.resources[i-1]).addClass("MMHKPLUS_KingdomResourcesImage").css("display", "inline-block").css("margin-bottom", "10px").css("margin-left", "10px"))
    					.append(
    						$("<span/>")
    							.html(formatNumber(parseInt(this.content.paramList[i])))
    							.css("padding-left", "4px").css("top", "-4px").css("position", "relative"));
    			}
    			newResult = $content.append("<br/>").html();
    			var $content = $(newResult);
			}
    		return newResult;
    	};
    	
    	MMHKPLUS.HOMMK.MasterAction.prototype.getTooltipContent = injectAfter(MMHKPLUS.HOMMK.MasterAction.prototype.getTooltipContent, caravansContent);
    	MMHKPLUS.getElement("Player").getActions().forEach(function(a)
    		{
    			a.display();
    		}
    	);
    },
    
    _setupBattleRoundBonus : function() 
    {
    	/*
    	 * From Heroes Kinfdom Evolution
    	 * http://amroth.free.fr/MMHK/extension/
    	 */
    	var computeBonus = function(round, type) 
    	{
    		var totalBonus = round[ type + "TotalBonus" ] ? round[ type + "TotalBonus" ] : 0;
    		var typeBonus = round[ type + "UnitStackUnitTypeBonus" ] ? round[ type + "UnitStackUnitTypeBonus" ] : 0;
    		if( totalBonus > typeBonus ) {
    			var bonus = totalBonus - typeBonus;
    			return "+" + Math.round( 1000*bonus/round[ type + 'UnitStackPower' ] )/10 + "%";
    		}
    		return false;
    	};
    	
    	var addPowerBonus = function() 
    	{
    		var obj = this;
    		// get the full battle report object
    		var id = obj.elementId.substring( 0, obj.elementId.indexOf('_') );
    		var battle = MMHKPLUS.HOMMK.elementPool.get( "BattleResultDetailedMessage" ).get( id );

    		var attackBonus = false, defenseBonus = false;

    		// determine the attack and defense bonus
    		var attackBonus = computeBonus( obj.content, 'attacker' );
    		var defenseBonus = computeBonus( obj.content, 'defender' );

    		// display it all
    		function displayBonus( type, bonus ) {
    			var before = $( "#"+obj.elementType + obj.elementId + type + "QuantityBefore" );	
    			var div = $("<div></div>", {
    				id: obj.elementType + obj.elementId + type + "Bonus",
    				style: "font-size:12px;"
    			})
    			.html( bonus );
    			div.prependTo( before.parent() );
    			before.css( "display", "inline" )
    				.remove()
    				.prependTo( div );			
    		}
    		if ( battle.content.type == MMHKPLUS.HOMMK.MESSAGE_TYPE_BATTLE_RESULT_DEFENDER ) {
    			if( attackBonus ) displayBonus( "Enemy", attackBonus );
    			if( defenseBonus ) displayBonus( "Ally", defenseBonus );
    		}
    		else {
    			if( attackBonus ) displayBonus( "Ally", attackBonus );
    			if( defenseBonus ) displayBonus( "Enemy", defenseBonus );
    		}
    	};
    	
    	MMHKPLUS.HOMMK.BattleRound.prototype.addToDOM = injectAfter(MMHKPLUS.HOMMK.BattleRound.prototype.addToDOM, addPowerBonus);

    },
    
    _setupExportToImageButtons : function() 
    {
    	var addExportButtonsBattle = function() 
    	{
    		var self = this;
    		$(this.allyResultTextElement).append(
    			$("<div/>")
    				.html("PNG")
    				.addClass("MMHKPLUS_PNGButton")
    				.button()
    				.css({float:"left", fontSize:"50%"})
    				.click(function()
    					{
    						$("div.MMHKPLUS_PNGButton").css("display", "none");
    						var $toExport = $("#BattleResultDetailedMessage" + self.elementId + "Body").clone()
    						$toExport.find("#BattleResultDetailedMessage" + self.elementId + "Content").remove();;
    						$toExport.find("div.MMHKPLUS_PNGButton").remove();
    						MMHKPLUS.exportToImage($toExport);
    						
    					}));
    	};
    	
    	var addExportButtonsSpys = function() 
    	{
    		var self = this;
    		$("#" + self.elementType + self.elementId + "Description").append(
    			$("<div/>")
    				.html("PNG")
    				.addClass("MMHKPLUS_PNGButton")
    				.button()
    				.css({float:"right"})
    				.click(function()
    					{
    						$("div.MMHKPLUS_PNGButton").css("display", "none");
    						var $toExport = $("#" + self.elementType + self.elementId + "Body").clone()
    						$toExport.find("#" + self.elementType + self.elementId + "Content").remove();;
    						$toExport.find("div.MMHKPLUS_PNGButton").remove();
    						MMHKPLUS.exportToImage($toExport);
    						
    					}));
    	};
    	
    	MMHKPLUS.HOMMK.BattleResultDetailedMessage.prototype.display = injectAfter(MMHKPLUS.HOMMK.BattleResultDetailedMessage.prototype.display, addExportButtonsBattle);
    	MMHKPLUS.HOMMK.TroopScoutingResultDetailedMessage.prototype.display = injectAfter(MMHKPLUS.HOMMK.TroopScoutingResultDetailedMessage.prototype.display, addExportButtonsSpys);
    	MMHKPLUS.HOMMK.RegionScoutingResultDetailedMessage.prototype.display = injectAfter(MMHKPLUS.HOMMK.RegionScoutingResultDetailedMessage.prototype.display, addExportButtonsSpys);
    	MMHKPLUS.HOMMK.CityScoutingResultDetailedMessage.prototype.display = injectAfter(MMHKPLUS.HOMMK.CityScoutingResultDetailedMessage.prototype.display, addExportButtonsSpys);
    },
	
	unload : function()
	{
		if(this.$elemCenterOn) MMHKPLUS.resetElement(this.$elemCenterOn);
		if(this.$elemChat) MMHKPLUS.resetElement(this.$elemChat);
        MMHKPLUS.clearInterval(this.intervalClockUpdate); this.intervalClockUpdate = null;
        MMHKPLUS.clearInterval(this.intervalUpdateOnline); this.intervalUpdateOnline = null;
	}
});
MMHKPLUS.Jactari = MMHKPLUS.ExtendableElement.extend({
	elementType : "Jactari",
	internalLastPermalien : "",
	bonus : { data : {graal:0,dolmen:0,cri:0,def:0,ecoles:[0,0,0,0]}},
	heredite : { cv : {d:0, w:0, h:0}, competences : []},
	
	options : {
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		
		var self = this;
		self.bonusFunction();
		var lang = MMHKPLUS.locale;
		switch (lang) 
		{
			case 'de': self.url_combat = self.base_url + 'Kampf'; break;
			case 'ru': self.url_combat = self.base_url + 'fight_ru'; break;
			case 'fr': self.url_combat = self.base_url + 'combat'; break;
			default: self.url_combat = self.base_url + 'fight'; break;
		};

        //self.url_combat = self.base_url;
		self.herediteFunction();
		
		function ajout_bouton(r) 
		{
			var c,frame = this;
			function createJactariButton(id,def,container,left,top)
			{
				var n = document.getElementById(id);
				if(n) n.parentNode.removeChild(n);
				n = document.createElement('a');
				n.id = id;
				n.href = self.url_combat + ".html";
				n.target = '_blank';
				n.title = def?'simulation as defencer':'simulation';
				n.innerHTML = def?'Defencer':'jactari';
				n.addEventListener('click', function(E) { return self.permalien(frame,def); }, true);
				if(left) n.style.left=left+'px';
				if(top) n.style.top=top+'px';
				if(container) container.appendChild(n);
				return n;
			}
			switch(frame.mainElementId.substring(0,4))
			{
				case "Hero":
					c = document.getElementById('HeroFrame'+frame.content.id+'HeroContainer');
					createJactariButton('permalien_jactari',0,c,15,30);
					createJactariButton('permalien_jactari_defencer',1,c,15,55);
					break;
				case "Zone":
					c = frame.contentMainElement;
					createJactariButton('permalien_jactari',undefined,c,280,30);
					break;
				case "Halt":
					c = frame.contentMainElement;
					createJactariButton('permalien_jactari',undefined,c,100,20);
					createJactariButton('permalien_jactari_defencer',1,c,220,20);
					break;
				default: //fight
					c = frame.getChildElement('Defender');	
					createJactariButton('permalien_jactari',undefined,c); 
			}
			return r;
		};
		MMHKPLUS.HOMMK.BattlePrepFrame.prototype.show = injectAfter(MMHKPLUS.HOMMK.BattlePrepFrame.prototype.show, ajout_bouton);
		MMHKPLUS.HOMMK.ZoneBuildingPortalUpgradeFrame.prototype.show = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingPortalUpgradeFrame.prototype.show, ajout_bouton);
		MMHKPLUS.HOMMK.HeroFrame.prototype.show = injectAfter(MMHKPLUS.HOMMK.HeroFrame.prototype.show, ajout_bouton);
		if(MMHKPLUS.HOMMK.ZoneBuildingDungeonUpgradeFrame) // saison < 3
			MMHKPLUS.HOMMK.ZoneBuildingDungeonUpgradeFrame.prototype.show = injectAfter(MMHKPLUS.HOMMK.ZoneBuildingDungeonUpgradeFrame.prototype.show, ajout_bouton);
		if ( MMHKPLUS.HOMMK.isPveWorld )
			MMHKPLUS.HOMMK.HaltFrame.prototype.show = injectAfter(MMHKPLUS.HOMMK.HaltFrame.prototype.show, ajout_bouton);
			
		return this;
	},
	
	//set_artefacts_fixer : {_143:524,_144:525,_145:506,_146:507,_147:508,_148:509,_149:510,_150:511,_508:519,_509:521,_510:535,_511:518,_512:522,_513:520,_514:523,_515:512,_516:513,_517:514,_518:515,_519:516,_520:517,_521:532,_522:533,_523:536,_524:537,_525:538,_526:539,_527:540,_528:541,_529:542,_530:543,_531:544,_532:545,_533:546,_534:547,_535:548,_536:549,_537:528,_538:530,_539:531,_540:527,_541:526,_542:529,_543:534,_544:550,_545:551,_546:552,_547:553},
	// base_url : 'http://jactari.info/mmhk/',
    base_url : MMHKPLUS.URL_JACTARI + "/",
    
	url_combat : '',

	_base64 : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
	_camps : ['attaquant','defenseur'],
	_camps_abr : ['a','d'],
	_factions : 
	{
		ACADEMY:0,HAVEN:1,INFERNO:2,NECROPOLIS:3,SYLVAN:4,FORTRESS:5,DUNGEON:6,NEUTRAL:7,SYLVAN_S:4
	},
	_special_factions :
	{
		SYLVAN_S:122
	},
	_ecoles : 
	{
		SUMMON:0,DARK:1,LIGHT:2,DESTRUCTION:3
	},
	_rangs : 
	{
		T1:0, T1P:1, T2:2, T2P:3, T3:4, T3P:5, T4:6, T4P:7, T5:8, T5P:9, T6:10, T6P:11, T7:12, T7P:13, T8:14, T8P:15, T1S:1,  T2S:2,  T3S:3,  T4S:4,  T5S:5,  T6S:6,  T7S:7
	},
	_neutres : 
	{
		WIND:64, WATER:65, EARTH:66, FIRE:67, DEATHKNIGHT:68, WOLF:86, GNOMESHOOTER:87, GNOME:85, WANDERINGGHOST:88, MANTICORE:89, MINOTAUR:90
	},
	_archetypes : 
	{   
		ARCANE_MAGE:0, DISTURBED_WIZARD:1, FANATIC_SORCERER:2, ILLUMINATED_PROTECTOR:3, MERCENARY:4, OUTLAND_WARRIOR:5, PALADIN:6, PIT_WARRIOR:7,
		PROTECTOR:8, WARMAGE:9, WARMASTER:10, WARRIOR_MAGE:11, SENACHAL:12, SOBERED_WIZARD:13, EXPLORER:14
	},
	_slots : 
	{
		HEAD:0, NECKLACE:1, RING:2, LEFT_HAND:3, CHEST:4, RIGHT_HAND:5, FEET:6, CAPE:7
	},
	_sorts :
	{
		FIST_OF_WRATH:0, WASP_SWARM:1, FIRE_TRAP:2, RAISE_DEAD:3, EARTHQUAKE:4, PHANTOM_FORCES:5, SUMMON_ELEMENTALS:6, FIREWALL:7, CONJURE_PHOENIX:8,
		WEAKNESS:9, SICKNESS:10, GUARD_BREAK:11, DISEASE:12, VULNERABILITY:13, SLOW:14, PLAGUE:15, DEATH_TOUCH:16, WORD_OF_DEATH:17,
		DIVINE_STRENGTH:18, BLESS:19, MYSTIC_SHIELD:20, HASTE:21, RIGHTEOUS_MIGHT:22, DEFLECT_MISSILE:23, TELEPORTATION:24, WORD_OF_LIGHT:25, RESURRECTION:26,
		STONE_SPIKES:27, ELDERTICH_ARROW:28, ICE_BOLT:29, LIGHTNING_BOLT:30, CIRCLE_OF_WINTER:31, FIREBALL:32, METEOR_SHOWER:33, CHAIN_LIGHTNING:34, IMPLOSION:35
	},
	_competences_hereditaires : 
	{
		BARRAGE_FIRE: 'tir_de_barrage', MAGIC_RESISTANCE: 'resistance_magique', SPELL_MASTERY: 'maitrise_des_sorts', RESURRECTION: 'resurrection',
		BATTLE_LOOT: 'butin_de_guerre', CHARACTERISTICS_ILLUMINATION: 'revelation_de_caracteristiques', MORAL_BOOST: 'moral_eleve', TOUGHER_HERO: 'heros_superieur', RAISE_DEAD: 'relever_les_morts'
	},
	_fortifications : 
	{
		FORT:1, CITADEL:2, CASTLE:3
	},

	prepare_troupe : function(donnees) 
	{
		var self = this;
		var u = 0;
		if (donnees.factionEntityTagName == 'NEUTRAL' ) 
		{
			u = self._neutres[donnees.tier];
		}
		else 
		{
			var rang = self._rangs[donnees.tier];
			var faction = self._factions[donnees.factionEntityTagName];
			if(donnees.tier.indexOf("S") != -1)
				u = self._special_factions[donnees.factionEntityTagName + "_S"] + rang;
			else
				u = (faction * 16) + (rang & 15) + (faction == 4 ? 5 : 0) + (faction >= 5 ? 11 : 0);
		}
		return {unite:u, nombre:donnees.quantity};
	},
	
	prepare_talent : function(a,talent) 
	{
		/*
		 
		In Jactari by Aspirin, IDs of Legendary skills ares like this: 
		 
		triplets[36]|=(donnees.a.legendary_sovereign_a&3)<<21;
		triplets[36]|=(donnees.a.legendary_sovereign_b&3)<<18;
		triplets[36]|=(donnees.a.legendary_sovereign_c&3)<<15;
		triplets[36]|=(donnees.a.legendary_legwarrior_a&3)<<12;
		triplets[36]|=(donnees.a.legendary_legwarrior_b&3)<<9;
		triplets[36]|=(donnees.a.legendary_legwarrior_c&3)<<6;
		triplets[36]|=(donnees.a.legendary_magehunter_a&3)<<3;
		triplets[36]|=(donnees.a.legendary_magehunter_b&3);
		
		triplets[37]|=(donnees.a.legendary_magehunter_c&3)<<21;
		triplets[37]|=(donnees.a.legendary_legpaladin_a&3)<<18;
		triplets[37]|=(donnees.a.legendary_legpaladin_b&3)<<15;
		triplets[37]|=(donnees.a.legendary_legpaladin_c&3)<<12;
		triplets[37]|=(donnees.a.legendary_ethernalnight_a&3)<<9;
		triplets[37]|=(donnees.a.legendary_ethernalnight_b&3)<<6;
		triplets[37]|=(donnees.a.legendary_ethernalnight_c&3)<<3;
		triplets[37]|=(donnees.a.legendary_kingundead_a&3);
		
		triplets[38]|=(donnees.a.legendary_kingundead_b&3)<<21;
		triplets[38]|=(donnees.a.legendary_kingundead_c&3)<<18;
		triplets[38]|=(donnees.a.legendary_legmagician_a&3)<<15;
		triplets[38]|=(donnees.a.legendary_legmagician_b&3)<<12;
		triplets[38]|=(donnees.a.legendary_legmagician_c&3)<<9;
		triplets[38]|=(donnees.a.legendary_dragonkinght_a&3)<<6;
		triplets[38]|=(donnees.a.legendary_dragonkinght_b&3)<<3;
		triplets[38]|=(donnees.a.legendary_dragonkinght_c&3);

		*/
		var self = this;
		switch (talent.heroClassSkillEntityTagName) 
		{
			case 'ARMY_ATTACK_POWER_INCREASE': a.tacticien = talent.level; break;
			case 'CAVALRY_ATTACK_POWER_INCREASE': a.ecuyer = talent.level; break;
			case 'SHOOTER_ATTACK_POWER_INCREASE': a.tireur_elite = talent.level; break;
			case 'INFANTRY_ATTACK_POWER_INCREASE': a.commandant_infanterie = talent.level; break;
			case 'ARMY_DEFENSE_POWER_INCREASE': a.tacticien_defenseur = talent.level; break;
			case 'CAVALRY_DEFENSE_POWER_INCREASE': a.ecuyer_defenseur = talent.level; break;
			case 'SHOOTER_DEFENSE_POWER_INCREASE': a.expert_tirs_barrage = talent.level; break;
			case 'INFANTRY_DEFENSE_POWER_INCREASE': a.inebranlable = talent.level; break;
			case 'ATTRITION_RATE_DECREASE': a.logisticien = talent.level; break;
			case 'SUMMON_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
			case 'SUMMON_SPELLBOOK_SPELL_NUMBER': break;
			case 'SUMMON_SPELL_EFFICIENCY': a.expert[0] = talent.level; break;
			case 'SUMMON_ADDED_MAGIC_POINTS': a.instinct[0] = talent.level; break;
			case 'DARK_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
			case 'DARK_SPELLBOOK_SPELL_NUMBER': break;
			case 'DARK_SPELL_EFFICIENCY': a.expert[1] = talent.level; break;
			case 'DARK_ADDED_MAGIC_POINTS': a.instinct[1] = talent.level; break;
			case 'LIGHT_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
			case 'LIGHT_SPELLBOOK_SPELL_NUMBER': break;
			case 'LIGHT_SPELL_EFFICIENCY': a.expert[2] = talent.level; break;
			case 'LIGHT_ADDED_MAGIC_POINTS': a.instinct[2] = talent.level; break;
			case 'DESTRUCTION_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
			case 'DESTRUCTION_SPELLBOOK_SPELL_NUMBER': break;
			case 'DESTRUCTION_SPELL_EFFICIENCY': a.expert[3] = talent.level; break;
			case 'DESTRUCTION_ADDED_MAGIC_POINTS': a.instinct[3] = talent.level; break;
			case 'UNIT_PRODUCTION_INCREASE': break;
			case 'UNIT_RECRUITMENT_SPEED_INCREASE': break;
			case 'NEUTRAL_STACK_RECRUITMENT_INCREASE': break;
			case 'ATTACK_POWER_PER_UNIT_INCREASE': a.harangueur = talent.level; break;
			case 'SCOUTING_DETECT_LEVEL_INCREASE': break;
			case 'ATTRITION_RATE_INCREASE': a.massacreur = talent.level; break;
			case 'PILLAGE_INCREASE': break;
			case 'DEFENSE_POWER_PER_UNIT_INCREASE': a.bon_payeur = talent.level; break;
			
			// Legendary classes
			case 'MASTER_HARANGUER' : a.legendary_sovereign_a = talent.level; break
			case 'MASTER_FIGHTER' : a.legendary_sovereign_b = talent.level; break
			case 'RUTHLESS' : a.legendary_sovereign_c = talent.level; break
			
			case 'MASTER_FIGHTER_2' : a.legendary_legwarrior_a = talent.level; break
			case 'MASTER_DEFENDER' : a.legendary_legwarrior_b = talent.level; break
			case 'WALL_BREAKER' : a.legendary_legwarrior_c = talent.level; break
			
			case 'HERO_ATTACK_DECREASE' : a.legendary_magehunter_a = talent.level; break
			case 'HERO_MAGIC_DECREASE' : a.legendary_magehunter_b = talent.level; break
			case 'HERO_MAGIC_RESISTANCE' : a.legendary_magehunter_c = talent.level; break
			
			case 'GUARDIAN' : a.legendary_legpaladin_a = talent.level; break
			case 'MASTER_DEFENDER_2' : a.legendary_legpaladin_b = talent.level; break
			case 'DIVINE_INSPIRATION' : a.legendary_legpaladin_c = talent.level; break
			
			case 'GUARDIAN_2' : a.legendary_ethernalnight_a = talent.level; break
			case 'MILITARY_ENGINEERING' : a.legendary_ethernalnight_b = talent.level; break
			case 'ETERNAL_DARKNESS' : a.legendary_ethernalnight_c = talent.level; break
			
			case 'ETERNAL_DARKNESS_2' : a.legendary_kingundead_a = talent.level; break
			case 'SUPREME_SUMMONER' : a.legendary_kingundead_b = talent.level; break
			case 'RUTHLESS_3' : a.legendary_kingundead_c = talent.level; break
			
			case 'SUPREME_SUMMONER_2' : a.legendary_legmagician_a = talent.level; break
			case 'DIVINE_INSPIRATION_2' : a.legendary_legmagician_b = talent.level; break
			case 'GUARDIAN_3' : a.legendary_legmagician_c = talent.level; break
			
			case 'RUTHLESS_2' : a.legendary_dragonkinght_a = talent.level; break
			case 'GREAT_DESTROYER' : a.legendary_dragonkinght_b = talent.level; break
			case 'MASTER_FIGHTER_3' : a.legendary_dragonkinght_c = talent.level; break
		}
	},
	
	prepare_heros : function(a,heros) 
	{
		var self = this;
		a.faction = self._factions[heros.factionEntityTagName];
		a.statut = 1;
		a.heros = 1;
		a.niveau = heros._level;
		a.archetype = self._archetypes[heros.heroTrainingEntityTagName];
		a.malus_attaque = 0;
	},
	
	prepare_artefacts : function(a,artefacts) 
	{
		var self = this;
		var id, slot, artefacts = artefacts || [];
		artefacts.forEach(function(artefact)
			{
				slot = self._slots[artefact.artefactEntity.bodyPart];
				id = artefact.artefactEntity.id;
				/*if(self.set_artefacts_fixer['_'+id])
				{
					id = self.set_artefacts_fixer['_'+id];
				}*/
				a.artefacts[slot] = id;
			}
		);
	},
	
	herediteFunction : function() 
	{
		var self = this;
		MMHKPLUS.getElement("Ajax").getProfileFrame(MMHKPLUS.getElement("Player").get("playerId"),
			function(json)
			{
				json.d[Object.keys(json.d)[0]].playerHeredityAbilityList.forEach(function(comp)
					{
						self.heredite.competences.push(comp);
						var voie = comp.heredityAbilityEntity.rankingPath.substr(0,1).toLowerCase();
						if (comp.bonus == true) 
						{
							self.heredite.cv[voie] = 3;
						}
						else if (comp.malus == true)  
						{
							self.heredite.cv[voie] = 1;
						}
						else  
						{
							self.heredite.cv[voie] = 2;
						}
					}
				);
			}
		);
	},
		
	bonusFunction : function() 
	{
		var self = this;
		if(MMHKPLUS.getElement("Player").isInAlliance())
		{
			MMHKPLUS.getElement("Ajax").getAllianceFrame(MMHKPLUS.getElement("Player").get("allianceId"),
				function(json)
				{
					var key = Object.keys(json.d)[0];
					self.bonus.data.graal = json.d[key].cumulTear || 0;
					var ability = json.d[key].runningAbility;
					self.bonus.data.cri = (ability && ability.abilityEntityId==1)?ability.level:0;
					self.bonus.data.def = (ability && ability.abilityEntityId==2)?ability.level:0;
				}
			);
		}
		var cities = MMHKPLUS.getElement("Player").getCities();

		cities.forEach(function(city)
			{
				if(city.content)
				{
					city = city.content;
					if(city && city.id && city.tmpBuiltCityBuilding && city.tmpBuiltCityBuilding[23])
					{
						MMHKPLUS.getElement("Ajax").getMagicGuildFrame(city.id,
							function(json)
							{
								var skills = json.d[Object.keys(json.d)[0]].spellStackList;
								if(skills[8] && skills[8].attachedSpellEntity.magicSchoolLevel == 5)
								{
									self.bonus.data.ecoles[self._ecoles[skills[8].attachedSpellEntity.magicSchoolEntityTagName]]++;
								}
							}
						);
					}
				}
				
			}
		);
	},

	encode_donnees_combat : function(donnees) 
	{
		var self = this;
        var triplets=[];
        var version=5;
        triplets[0]|=(version&63)<<18;
        triplets[0]|=(donnees.d.lieu&3)<<16;
        triplets[0]|=(donnees.a.statut&1)<<15;
        triplets[0]|=(donnees.a.heros&1)<<14;
        triplets[0]|=(donnees.a.cri_de_guerre&3)<<12;
        triplets[0]|=(donnees.a.inspiration&3)<<10;
        triplets[0]|=(donnees.a.dolmens&15)<<6;
        triplets[0]|=(donnees.a.niveau&63);
        triplets[1]|=(donnees.a.artefacts[0]&2047)<<13;
        triplets[1]|=(donnees.a.tacticien&3)<<11;
        triplets[1]|=(donnees.a.artefacts[1]&2047);
        triplets[2]|=(donnees.a.artefacts[2]&2047)<<13;
        triplets[2]|=(donnees.a.ecuyer&3)<<11;
        triplets[2]|=(donnees.a.artefacts[3]&2047);
        triplets[3]|=(donnees.a.artefacts[4]&2047)<<13;
        triplets[3]|=(donnees.a.tireur_elite&3)<<11;
        triplets[3]|=(donnees.a.artefacts[5]&2047);
        triplets[4]|=(donnees.a.artefacts[6]&2047)<<13;
        triplets[4]|=(donnees.a.commandant_infanterie&3)<<11;
        triplets[4]|=(donnees.a.artefacts[7]&2047);
        triplets[5]|=(donnees.a.logisticien&3)<<22;
        triplets[5]|=(donnees.a.harangueur&3)<<20;
        triplets[5]|=(donnees.a.sapeur&3)<<18;
        triplets[5]|=(donnees.a.massacreur&3)<<16;
        triplets[5]|=(donnees.a.instinct[0]&3)<<14;
        triplets[5]|=(donnees.a.expert[0]&3)<<12;
        triplets[5]|=(donnees.a.instinct[1]&3)<<10;
        triplets[5]|=(donnees.a.expert[1]&3)<<8;
        triplets[5]|=(donnees.a.instinct[2]&3)<<6;
        triplets[5]|=(donnees.a.expert[2]&3)<<4;
        triplets[5]|=(donnees.a.instinct[3]&3)<<2;
        triplets[5]|=(donnees.a.expert[3]&3);
        triplets[6]|=(donnees.a.bonus_ecole[0]&15)<<20;
        triplets[6]|=(donnees.a.bonus_ecole[1]&15)<<16;
        triplets[6]|=(donnees.a.bonus_ecole[2]&15)<<12;
        triplets[6]|=(donnees.a.bonus_ecole[3]&15)<<8;
        triplets[6]|=(donnees.a.larmes&31)<<3;
        triplets[6]|=(donnees.a.faction&7);
        triplets[7]|=(donnees.a.mhr.signe&1)<<23;
        triplets[7]|=(donnees.a.mhr.valeur&131071)<<6;
        triplets[7]|=(donnees.a.archetype&15)<<2;
        triplets[7]|=(donnees.a.arcanes&3);
        triplets[8]|=(donnees.d.mhr.signe&1)<<23;
        triplets[8]|=(donnees.d.mhr.valeur&131071)<<6;
        triplets[8]|=(donnees.d.larmes&31)<<1;
        triplets[9]|=(donnees.d.statut&1)<<23;
        triplets[9]|=(donnees.d.heros&1)<<22;
        triplets[9]|=(donnees.d.fortification&3)<<20;
        triplets[9]|=(donnees.d.dolmens&15)<<16;
        triplets[9]|=(donnees.d.forts&7)<<13;
        triplets[9]|=(donnees.d.fort_principal&1)<<12;
        triplets[9]|=(donnees.d.ralliement&3)<<10;
        triplets[9]|=(donnees.d.inspiration&3)<<8;
        triplets[9]|=(donnees.d.archetype&15)<<4;
        triplets[9]|=(donnees.d.faction&7)<<1;
        triplets[10]|=(donnees.d.bonus_ecole[0]&15)<<20;
        triplets[10]|=(donnees.d.bonus_ecole[1]&15)<<16;
        triplets[10]|=(donnees.d.bonus_ecole[2]&15)<<12;
        triplets[10]|=(donnees.d.bonus_ecole[3]&15)<<8;
        triplets[10]|=(donnees.d.arcanes&3)<<6;
        triplets[10]|=(donnees.d.niveau&63);
        triplets[11]|=(donnees.d.artefacts[0]&2047)<<13;
        triplets[11]|=(donnees.d.tacticien_defenseur&3)<<11;
        triplets[11]|=(donnees.d.artefacts[1]&2047);
        triplets[12]|=(donnees.d.artefacts[2]&2047)<<13;
        triplets[12]|=(donnees.d.ecuyer_defenseur&3)<<11;
        triplets[12]|=(donnees.d.artefacts[3]&2047);
        triplets[13]|=(donnees.d.artefacts[4]&2047)<<13;
        triplets[13]|=(donnees.d.expert_tirs_barrage&3)<<11;
        triplets[13]|=(donnees.d.artefacts[5]&2047);
        triplets[14]|=(donnees.d.artefacts[6]&2047)<<13;
        triplets[14]|=(donnees.d.inebranlable&3)<<11;
        triplets[14]|=(donnees.d.artefacts[7]&2047);
        triplets[15]|=(donnees.d.logisticien&3)<<22;
        triplets[15]|=(donnees.d.bon_payeur&3)<<20;
        triplets[15]|=(donnees.d.batisseur_fortifications&3)<<18;
        triplets[15]|=(donnees.d.massacreur&3)<<16;
        triplets[15]|=(donnees.d.instinct[0]&3)<<14;
        triplets[15]|=(donnees.d.expert[0]&3)<<12;
        triplets[15]|=(donnees.d.instinct[1]&3)<<10;
        triplets[15]|=(donnees.d.expert[1]&3)<<8;
        triplets[15]|=(donnees.d.instinct[2]&3)<<6;
        triplets[15]|=(donnees.d.expert[2]&3)<<4;
        triplets[15]|=(donnees.d.instinct[3]&3)<<2;
        triplets[15]|=(donnees.d.expert[3]&3);
        for (var c=0;c<self._camps_abr.length;c++) 
        {
            for (var p = 1; p < 8; p++)
            {
                var u = donnees[self._camps_abr[c]].troupes[p].unite;
                if (u == -1) u = 255;
                triplets[15+p+(c*7)] |= (u & 255) << 16;
                triplets[15+p+(c*7)] |= (donnees[self._camps_abr[c]].troupes[p].nombre & 65535);
            }
        }
        triplets[30]|=(donnees.a.sort[0].id&63)<<18;
        triplets[30]|=(donnees.a.sort[0].tour&15)<<14;
        triplets[30]|=(donnees.a.sort[1].id&63)<<6;
        triplets[30]|=(donnees.a.sort[1].tour&15)<<2;
        triplets[30]|=(donnees.saison&12) >> 2;
        triplets[31]|=(donnees.d.sort[0].id&63)<<18;
        triplets[31]|=(donnees.d.sort[0].tour&15)<<14;
        triplets[31]|=(donnees.d.sort[1].id&63)<<6;
        triplets[31]|=(donnees.d.sort[1].tour&15)<<2;
        triplets[31]|=(donnees.saison&3);
        triplets[32]|=(donnees.a.butin_de_guerre&15)<<20;
        triplets[32]|=(donnees.a.relever_les_morts&15)<<16;
        triplets[32]|=(donnees.a.resistance_magique&15)<<12;
        triplets[32]|=(donnees.a.moral_eleve&15)<<8;
        triplets[32]|=(donnees.a.resurrection&15)<<4;
        triplets[32]|=(donnees.a.tir_de_barrage&15);
        triplets[33]|=(donnees.a.heros_superieur&15)<<20;
        triplets[33]|=(donnees.a.maitrise_des_sorts&15)<<16;
        triplets[33]|=(donnees.a.revelation_de_caracteristiques&15)<<12;
        triplets[33]|=(donnees.d.butin_de_guerre&15)<<8;
        triplets[33]|=(donnees.d.relever_les_morts&15)<<4;
        triplets[33]|=(donnees.d.resistance_magique&15);
        
        triplets[34]|=(donnees.d.moral_eleve&15)<<20;
        triplets[34]|=(donnees.d.resurrection&15)<<16;
        triplets[34]|=(donnees.d.tir_de_barrage&15)<<12;
        triplets[34]|=(donnees.d.heros_superieur&15)<<8;
        triplets[34]|=(donnees.d.maitrise_des_sorts&15)<<4;
        triplets[34]|=(donnees.d.revelation_de_caracteristiques&15);
        
        triplets[35]|=(donnees.a.classement_voies&7)<<21; // D > W > H
        triplets[35]|=(donnees.d.classement_voies&7)<<18; // D > W > H
        triplets[35]|=(donnees.a.malus_attaque&63)<<12; // attack malus
        if(donnees.a.statut==0){
            triplets[35]|=(donnees.a.antimagie&15)<<8;
            triplets[35]|=(donnees.a.baliste&15)<<4;
            triplets[35]|=(donnees.a.pieges&15)
        }
        
        if(donnees.d.statut==0){
            triplets[35]|=(donnees.d.antimagie&15)<<8;
            triplets[35]|=(donnees.d.baliste&15)<<4;
            triplets[35]|=(donnees.d.pieges&15)
        }

        triplets[36]|=(donnees.a.legendary_sovereign_a&3)<<21;
        triplets[36]|=(donnees.a.legendary_sovereign_b&3)<<18;
        triplets[36]|=(donnees.a.legendary_sovereign_c&3)<<15;
        triplets[36]|=(donnees.a.legendary_legwarrior_a&3)<<12;
        triplets[36]|=(donnees.a.legendary_legwarrior_b&3)<<9;
        triplets[36]|=(donnees.a.legendary_legwarrior_c&3)<<6;
        triplets[36]|=(donnees.a.legendary_magehunter_a&3)<<3;
        triplets[36]|=(donnees.a.legendary_magehunter_b&3);

        triplets[37]|=(donnees.a.legendary_magehunter_c&3)<<21;
        triplets[37]|=(donnees.a.legendary_legpaladin_a&3)<<18;
        triplets[37]|=(donnees.a.legendary_legpaladin_b&3)<<15;
        triplets[37]|=(donnees.a.legendary_legpaladin_c&3)<<12;
        triplets[37]|=(donnees.a.legendary_ethernalnight_a&3)<<9;
        triplets[37]|=(donnees.a.legendary_ethernalnight_b&3)<<6;
        triplets[37]|=(donnees.a.legendary_ethernalnight_c&3)<<3;
        triplets[37]|=(donnees.a.legendary_kingundead_a&3);

        triplets[38]|=(donnees.a.legendary_kingundead_b&3)<<21;
        triplets[38]|=(donnees.a.legendary_kingundead_c&3)<<18;
        triplets[38]|=(donnees.a.legendary_legmagician_a&3)<<15;
        triplets[38]|=(donnees.a.legendary_legmagician_b&3)<<12;
        triplets[38]|=(donnees.a.legendary_legmagician_c&3)<<9;
        triplets[38]|=(donnees.a.legendary_dragonkinght_a&3)<<6;
        triplets[38]|=(donnees.a.legendary_dragonkinght_b&3)<<3;
        triplets[38]|=(donnees.a.legendary_dragonkinght_c&3);

        triplets[39]|=(donnees.d.legendary_sovereign_a&3)<<21;
        triplets[39]|=(donnees.d.legendary_sovereign_b&3)<<18;
        triplets[39]|=(donnees.d.legendary_sovereign_c&3)<<15;
        triplets[39]|=(donnees.d.legendary_legwarrior_a&3)<<12;
        triplets[39]|=(donnees.d.legendary_legwarrior_b&3)<<9;
        triplets[39]|=(donnees.d.legendary_legwarrior_c&3)<<6;
        triplets[39]|=(donnees.d.legendary_magehunter_a&3)<<3;
        triplets[39]|=(donnees.d.legendary_magehunter_b&3);

        triplets[40]|=(donnees.d.legendary_magehunter_c&3)<<21;
        triplets[40]|=(donnees.d.legendary_legpaladin_a&3)<<18;
        triplets[40]|=(donnees.d.legendary_legpaladin_b&3)<<15;
        triplets[40]|=(donnees.d.legendary_legpaladin_c&3)<<12;
        triplets[40]|=(donnees.d.legendary_ethernalnight_a&3)<<9;
        triplets[40]|=(donnees.d.legendary_ethernalnight_b&3)<<6;
        triplets[40]|=(donnees.d.legendary_ethernalnight_c&3)<<3;
        triplets[40]|=(donnees.d.legendary_kingundead_a&3);

        triplets[41]|=(donnees.d.legendary_kingundead_b&3)<<21;
        triplets[41]|=(donnees.d.legendary_kingundead_c&3)<<18;
        triplets[41]|=(donnees.d.legendary_legmagician_a&3)<<15;
        triplets[41]|=(donnees.d.legendary_legmagician_b&3)<<12;
        triplets[41]|=(donnees.d.legendary_legmagician_c&3)<<9;
        triplets[41]|=(donnees.d.legendary_dragonkinght_a&3)<<6;
        triplets[41]|=(donnees.d.legendary_dragonkinght_b&3)<<3;
        triplets[41]|=(donnees.d.legendary_dragonkinght_c&3);

        var code='';
        for (var t=0;t<=41;t++) {
            code+=self._base64.charAt((triplets[t]>>18)&63);
            code+=self._base64.charAt((triplets[t]>>12)&63);
            code+=self._base64.charAt((triplets[t]>>6)&63);
            code+=self._base64.charAt((triplets[t])&63);
        }
        return code;
	},
	
	isHeroAtackuer : function( frame, isDefence ) 
	{
		var self = this;
		var heroAttaqant = true;
		if ( frame && frame.unitStackLevelSelectElement && frame.content && frame.content.unitStackByLevel ) 
		{	
			var selectedLevel = frame.unitStackLevelSelectElement.value;
			if ( selectedLevel >= 0 ) 
			{
				var levelParams = frame.content.unitStackByLevel[selectedLevel];
				if ( levelParams.combatType == "DEFENSE" )
					heroAttaqant = false;
			}
		}
		if ( frame && isDefence == 1 )
			heroAttaqant = false;
		return heroAttaqant;
	},
	
	getJactariButtonLink : function( frame, isDefence )
	{
		var self = this;
		if ( frame ) 
		{
			if ( isDefence != 1 )
				var n = document.getElementById('permalien_jactari');
			else
				var n = document.getElementById('permalien_jactari_defencer');
		}
		return n;
	},

	permalien : function(frame,spy_attaquer,spy_defenser,spy_city_defense)
	{
		var self = this;
		var heroAttaqant = self.isHeroAtackuer( frame, spy_attaquer );
		var jactariButton = self.getJactariButtonLink( frame, spy_attaquer );
		var donnees = 
			{
				saison:0,
				a : 
					{ statut:1, dolmens:0, cri_de_guerre:0, inspiration:0, heros:0, niveau:1, faction:0, archetype:0, artefacts:[0,0,0,0,0,0,0,0],
						tacticien:0, ecuyer:0, tireur_elite:0, commandant_infanterie:0, logisticien:0, harangueur:0, sapeur:0, massacreur:0,
						instinct:[0,0,0,0], expert:[0,0,0,0], arcanes:0, bonus_ecole:[0,0,0,0], larmes:0, mhr:{signe:0, valeur:0},
						sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
						troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
						butin_de_guerre:0, relever_les_morts:0, resistance_magique:0, moral_eleve:0, resurrection:0, tir_de_barrage:0, heros_superieur:0,
						maitrise_des_sorts:0, revelation_de_caracteristiques:0, classement_voies:0
					},
				d : 
					{
						statut:0, lieu:0, fortification:0, forts:0, fort_principal:0, dolmens:0, ralliement:0, inspiration:0, heros:0, niveau:1,
						faction:0, archetype:0, artefacts:[0,0,0,0,0,0,0,0],
						tacticien_defenseur:0, ecuyer_defenseur:0, expert_tirs_barrage:0, inebranlable:0, logisticien:0, bon_payeur:0, batisseur_fortifications:0, massacreur:0,
						instinct:[0,0,0,0], expert:[0,0,0,0], arcanes:0, bonus_ecole:[0,0,0,0], larmes:0, mhr:{signe:0, valeur:0},
						sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
						troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
						butin_de_guerre:0, relever_les_morts:0, resistance_magique:0, moral_eleve:0, resurrection:0, tir_de_barrage:0, heros_superieur:0,
						maitrise_des_sorts:0, revelation_de_caracteristiques:0, classement_voies:0
					}
			};
		
		donnees.saison = MMHKPLUS.getElement("Player").get("season");	
		if(donnees.saison < 3)
			donnees.saison = 3;
		if ( !heroAttaqant )
		{
			donnees.a.statut = 0;	
			donnees.d.statut = 1;
		}
		
		if ( heroAttaqant ) 
		{
			var playerHero = donnees.a;
			var versusHero = donnees.d;
		} 
		else 
		{
			var playerHero = donnees.d;
			var versusHero = donnees.a;
		}
		

		if ( self.bonus.data && self.bonus.data.graal ) 
			playerHero.larmes = self.bonus.data.graal;
		if ( self.bonus.data && self.bonus.data.cri )
			playerHero.cri_de_guerre = self.bonus.data.cri;
		if ( self.bonus.data && self.bonus.data.def )
			playerHero.ralliement = self.bonus.data.def;
		if ( frame )		
			playerHero.bonus_ecole = self.bonus.data.ecoles;
		else 
		{
			if ( spy_attaquer.bonus )
				donnees.a.bonus_ecole = self.bonus.data.ecoles;
			else
				donnees.d.bonus_ecole = self.bonus.data.ecoles;
		}
		
		if ( frame )
			var hero = (frame.linkedHero || frame.hero || frame.selectedHero);	
		var heros = frame ? hero.content : (spy_attaquer.hero || spy_attaquer);
		self.prepare_heros( playerHero, heros );
		
        // dont understand how correctly apply this code, try here
        heros.isMainHero = heros.id ? ($('#Hero' + heros.id + ' .heroMainHeroBorder').length > 0) : undefined;
        
		if ( !frame ) 
		{
			if ( spy_attaquer.bonus ) 
			{
				var talents = spy_attaquer.bonus.skills;
				if ( talents !== undefined ) 
				{
					for (var t = 0; t < talents.length; t++)
					{
						var talent = talents[t];
						self.prepare_talent(donnees.a, talent);
					}
				}
				var artefacts = spy_attaquer.bonus.artefacts;    
				self.prepare_artefacts(donnees.a, artefacts);
			}
		}
		else if  ( heros.heroBonuses )
		{
			var talents = heros.heroBonuses.skills.local;
			if ( talents !== undefined ) 
			{
				for (var t = 0; t < talents.length; t++) 
				{
					var talent = talents[t];
					self.prepare_talent(playerHero, talent);
				}
			}
			var artefacts = heros.heroBonuses.artefacts.local; 
			self.prepare_artefacts(playerHero, artefacts);
		}
		else if ( MMHKPLUS.HOMMK.elementPool.obj.HeroFrame && MMHKPLUS.HOMMK.elementPool.obj.HeroFrame.obj[heros.id] ) 
		{
			var h = MMHKPLUS.HOMMK.elementPool.obj.HeroFrame.obj[heros.id].content;
			var talents = h.heroSkillList;
			if (talents !== undefined) 
			{
				for (var t = 0; t < talents.length; t++)
				{
					var talent = talents[t];
					self.prepare_talent(playerHero, talent);
				}
			}
			var artefacts = h.equipedArtefacts;
			self.prepare_artefacts(playerHero, artefacts);
		}
		
		if ( heros.isMainHero ) 
		{
			self.heredite.competences.forEach(function(competence)
				{
					var c_nom = competence.heredityAbilityEntity.tagName;
					var c_niveau = competence.level;
					playerHero[self._competences_hereditaires[c_nom]] = c_niveau;
				}
			);
			var cv = self.heredite.cv;
			var c = 0;
			if (cv.d == 0 && cv.w > 0 && cv.h > 0) cv.d = 6 - cv.w - cv.h;
			if (cv.d > 0 && cv.w == 0 && cv.h > 0) cv.w = 6 - cv.d - cv.h;
			if (cv.d > 0 && cv.w > 0 && cv.h == 0) cv.h = 6 - cv.w - cv.d;
			if (cv.d > 0 && cv.w == 0 && cv.h == 0 && cv.d != 2) c = ((cv.d == 3)?1:6);
			if (cv.d == 0 && cv.w > 0 && cv.h == 0 && cv.w != 2) c = ((cv.w == 3)?3:5);
			if (cv.d == 0 && cv.w == 0 && cv.h > 0 && cv.h != 2) c = ((cv.h == 3)?6:1);
			if (cv.d > 0 && cv.w > 0 && cv.h > 0) {
				if (cv.d == 3) c = ((cv.w == 2)?1:2);
				if (cv.w == 3) c = ((cv.d == 2)?3:4);
				if (cv.h == 3) c = ((cv.d == 2)?5:6);
			}
			playerHero.classement_voies = c;
		}
		
		if ( frame )
			var sorts = frame.RoundSpellStackList ? frame.RoundSpellStackList.elementList : [];
		else
			var sorts = heros.spellStackList || heros.spellBookSpellStackList || []; 
			
		for (var i = 0; i < sorts.length; i++)
		{
			var sort = sorts[i].content;
			if(sort)
			{
				playerHero.sort[i].id = self._sorts[sort.spellEntityTagName];
				playerHero.sort[i].tour = sort.roundPosition;
			}
		}
		
		if(sorts.length == 2)
		{
			if(hasProperty(sorts[0], "content") && hasProperty(sorts[1], "content"))
			{
				if(sorts[0].content.attachedSpellEntity.magicSchoolLevel < sorts[1].content.attachedSpellEntity.magicSchoolLevel )
				{
					var tmp = playerHero.sort[0];
					playerHero.sort[0] = playerHero.sort[1];
					playerHero.sort[1] = tmp;
				}
			}
			else if(hasProperty(sorts[0], "attachedSpellEntity") && hasProperty(sorts[1], "attachedSpellEntity"))
			{
				if(sorts[0].attachedSpellEntity.magicSchoolLevel < sorts[1].attachedSpellEntity.magicSchoolLevel )
				{
					var tmp = {content : playerHero.sort[0]};
					playerHero.sort[0] = {content : playerHero.sort[1]};
					playerHero.sort[1] = tmp;
				}
			}
		}
		
		if ( frame )
			var troupes = (frame.attackerUnitStackList || frame.heroUnitStackList || hero.unitStackList).elementList;
		else
			var troupes = heros.attachedUnitStackList0 || heros.attachedUnitStackList || [];
				
		for (var t = 0; t < troupes.length; t++)
		{
			var troupe = troupes[t].content || troupes[t];
			var troupePosition = troupe.stackPosition || troupe.powerPosition || t+1;
			playerHero.troupes[troupePosition] = self.prepare_troupe(troupe);
		}
		
		var troupes = [];
		if ( MMHKPLUS.HOMMK.isPveWorld && frame.mainElementId.substring(0,8) == "HaltFrame".substring(0,8) ) 
		{
			var heroMoveId = frame.haltList.options[frame.haltList.options.selectedIndex].value;
			var worldMoveId = 0;
			
			for ( var i in frame.content.heroMoves ) 
			{
				if(i != undefined)
					if ( frame.content.heroMoves[i].id == heroMoveId ) 
					{
						worldMoveId = frame.content.heroMoves[i].masterHeroMoveId;
						break;
					}
			}
		
			var regionListAnswer = 0;
			var masterMoveId = 0;
			if ( worldMoveId ) 
			{
				if ( MMHKPLUS.HOMMK.elementPool.obj.HeroMove.obj[heroMoveId] )
					masterMoveId = MMHKPLUS.HOMMK.elementPool.obj.HeroMove.obj[heroMoveId].content.masterHeroMove;
				else 
				{
					var moveListsAnswer ;
					MMHKPLUS.getElement("Ajax").getHeroMove(
						MMHKPLUS.getElement("Player").get("worldId"), 
						frame.content.heroMoves[i].haltX, 
						frame.content.heroMoves[i].haltY,
						2, 2, 
						function(json)
						{
							moveListsAnswer = json;
						},
						true
					);
					MMHKPLUS.getElement("Ajax").getRegion(
						MMHKPLUS.getElement("Player").get("worldId"), 
						Math.floor( frame.content.heroMoves[i].haltX ) - 5,
						Math.floor( frame.content.heroMoves[i].haltY ) - 5,
						10, 10, 
						function(json)
						{
							$.extend(moveListsAnswer, moveListsAnswer, json);
						},
						true
					);

					regionListAnswer = moveListsAnswer.d['WorldMap' + MMHKPLUS.getElement("Player").get("worldId") + 'RegionList'];
					var moveList = moveListsAnswer.d['WorldMap' + MMHKPLUS.getElement("Player").get("worldId") + 'HeroMoveList'];
					for ( var curMove = 0; curMove < moveList.length; curMove++ ) 
					{
						if ( moveList[curMove].masterHeroMoveId == worldMoveId ) 
						{
							masterMoveId = moveList[curMove].masterHeroMove;
							break;
						}
					}
				}
			}
			var creviceRegionId = 0;
			if ( masterMoveId ) 
			{
				var regionsList = MMHKPLUS.HOMMK.elementPool.obj.Region.obj;
				for ( var i in regionsList ) 
				{
					if(i != undefined)
						if ( (regionsList[i].content.x == masterMoveId.x1 && regionsList[i].content.y == masterMoveId.y1 ) || (regionsList[i].content.x == masterMoveId.x2 && regionsList[i].content.y == masterMoveId.y2 ) ) 
						{
							if ( regionsList[i].content && regionsList[i].content.rB && regionsList[i].content.rB.rBE && regionsList[i].content.rB.rBE.tN ) 
							{
								if ( regionsList[i].content.rB.rBE.tN.substring(0,12) == "RIFT_PILLAGE".substring(0,12) ) 
								{
									creviceRegionId = regionsList[i].content;
									break;
								}
							}
						}
				}
				if ( !creviceRegionId ) 
				{
					for ( var i in regionListAnswer ) 
					{
						if(i != undefined)
							if ( (regionListAnswer[i].x == masterMoveId.x1 && regionListAnswer[i].y == masterMoveId.y1 ) || (regionListAnswer[i].x == masterMoveId.x2 && regionListAnswer[i].y == masterMoveId.y2 ) ) 
							{
								if ( regionListAnswer[i].rB && regionListAnswer[i].rB.rBE && regionListAnswer[i].rB.rBE.tN ) 
								{
									if ( regionListAnswer[i].rB.rBE.tN.substring(0,12) == "RIFT_PILLAGE".substring(0,12) ) 
									{
										creviceRegionId = regionListAnswer[i];
										break;
									}
								}
							}
					}
				}
			}
			
			if ( creviceRegionId ) 
			{
				MMHKPLUS.getElement("Ajax").getRiftRegionBuildingFrame(creviceRegionId.id, function(json) { creviceInfo = json ; }, true);
				if ( creviceInfo && creviceInfo.d && creviceInfo.d['RiftRegionBuildingFrame'+creviceRegionId.id] && creviceInfo.d['RiftRegionBuildingFrame'+creviceRegionId.id].regionBuildingHeroList ) 
				{
					var creviceHeroList = creviceInfo.d['RiftRegionBuildingFrame'+creviceRegionId.id].regionBuildingHeroList;
					for ( var curHero in creviceHeroList ) 
					{
						if(curHero != undefined)
							if ( creviceHeroList[curHero].id == masterMoveId.heroId ) 
							{
								for ( var t = 0; t < creviceHeroList[curHero].attachedUnitStackList.length; t++ ) 
								{
									var troupe = creviceHeroList[curHero].attachedUnitStackList[t];
									var position = t + 1;
									versusHero.troupes[position] = self.prepare_troupe(troupe);
								}
								versusHero.faction = self._factions["DUNGEON"];
								versusHero.statut = 1;
								versusHero.heros = 1;
								versusHero.niveau = 30;
								versusHero.archetype = self._archetypes["MERCENARY"];
								versusHero.malus_attaque = 0;
								
								if ( heroAttaqant )
									donnees.d.lieu = 3;
								break;
							}
					}
				}
			}
		} 
		else if ( frame ) 
		{
			var troupes = (tmp=(frame.defenderUnitStackList || frame.npcUnitStackList))?tmp.elementList:[];
			if ( frame.content && frame.content.zoneBuilding && frame.content.zoneBuilding.attachedUnitStackList )
				troupes = frame.content.zoneBuilding.attachedUnitStackList;
		}
		else 
		{
			var defenderHero = (spy_defenser.hero || spy_defenser);
			var troupes = defenderHero.attachedUnitStackList0 || defenderHero.attachedUnitStackList || [];
		}

		var reconnaissances;
		if ( frame )
			reconnaissances = frame.content.scoutingResultList;
		else 
		{		
			donnees.d.statut = 1;
			if (spy_city_defense)
				donnees.d.fortification = self._fortifications[spy_city_defense];
            var talents = defenderHero.heroSkillList || defenderHero.skills || [];
            if (talents !== undefined) 
            {
                for (var t = 0; t < talents.length; t++)
                {
                    var talent = talents[t];
                    self.prepare_talent(defenderHero, talent);
                }
            }
			self.prepare_heros(donnees.d, defenderHero);
			self.prepare_artefacts(donnees.d, defenderHero.artefactList);
		}
		if ( reconnaissances && reconnaissances.length >= 1 )
		{
			var reco = reconnaissances[0].contentJSON;
			donnees.d.statut = 1;
			if ( reco.cityFortificationTagName )
				donnees.d.fortification = self._fortifications[reco.cityFortificationTagName];
			if ( reco.heroList && reco.heroList.length >= 1 ) 
			{
				var heros = reco.heroList[0];
				for (var h = 0; h < reco.heroList.length; h++)
				{
					if (reco.heroList[h].defense > heros.defense)
						heros = reco.heroList[h];
				}
				self.prepare_heros(donnees.d, heros);
				self.prepare_artefacts(donnees.d, heros.artefactList);
			}
		}
		
		if ( frame && frame.content && frame.content.unitStackList && frame.content.unitStackList[0] ) 
		{
			if ( frame.content.unitStackList[0].heroId ) 
			{
				versusHero.statut = 1;
				versusHero.heros = 1;
				if ( frame.content.unitStackList[0].factionEntityTagName)
					versusHero.faction = self._factions[frame.content.unitStackList[0].factionEntityTagName];
			}
		}
		for ( var t = 0; t < troupes.length; t++ )
		{
			var troupe = troupes[t].content || troupes[t];
			var position = troupe.powerPosition || troupe.stackPosition || t+1;
			versusHero.troupes[position] = self.prepare_troupe(troupe);
		}
		
		if ( frame && frame.unitStackLevelSelectElement && frame.content && frame.content.unitStackByLevel ) 
		{
			
			var selectedLevel = frame.unitStackLevelSelectElement.value;
			if ( selectedLevel >= 0 ) 
			{
				var levelParams = frame.content.unitStackByLevel[selectedLevel];
				var defenceName = String( levelParams.defenseName );
				
				versusHero.antimagie = levelParams.spellEfficiencyDecrease / 10;
				versusHero.pieges = levelParams.traps/3;
				if ( versusHero.antimagie == 0 && versusHero.pieges == 0 )
					versusHero.baliste = defenceName.match( /\d+/g );
			}
		}

		self.internalLastPermalien = self.url_combat + '.html?info=' + self.encode_donnees_combat(donnees);
		if(jactariButton)
			jactariButton.href = self.internalLastPermalien;
		return true;
	},
	
	lastPermalien : function()
	{
		return this.internalLastPermalien;
	},
	
	unload : function()
	{
		//this.set_artefacts_fixer = null;
		this.base_url = null;
		this.url_combat = null;

		this._base64 = null;
		this._camps = null;
		this._camps_abr = null;
		this._factions = null;
		this._ecoles = null;
		this._rangs = null;
		this._neutres = null;
		this._archetypes = null;
		this._slots = null;
		this._sorts = null;
		this._competences_hereditaires = null;
		this._fortifications = null;
		this.internalLastPermalien = null;
	}
});
MMHKPLUS.Menu = MMHKPLUS.ExtendableElement.extend({
	elementType : "Menu",
	
	options : {
		type : 0, // 0 = topbar, 1 = floating div,
		showText : true,
		images : MMHKPLUS.URL_IMAGES + "icons/",
		menuWidth : 140,
		x : 0,
		y : 0
	},
	
	subItems : null,
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.$elem = $("<div>");
		
		this.options.type = this.load("type") || this.options.type;
		this.options.x = this.load("x") || this.options.x;
		this.options.y = this.load("y") || this.options.y;
		
		this.subItems = [
			{i : "alliance.png", t : MMHKPLUS.localize("ALLIANCE"), ra : true, s :
				[
                    {t : MMHKPLUS.localize("ONLINE_MEMBERS"), ref : "AllianceOnlineMembers"},
					{t : MMHKPLUS.localize("ALLIANCE_SPYS"), ref : "AllianceSpys"},
					{t : MMHKPLUS.localize("ALLIANCE_HEROES"), ref : "AllianceHeroes"},
                    {t : MMHKPLUS.SpyReport.elementType, ref : "SpyReport", v : false}
				]
			},
			{i : "kingdom.png", t : MMHKPLUS.localize("KINGDOM"), ra : false, s : 
				[
					{t : MMHKPLUS.localize("ARMIES"), ref : "KingdomArmies"},
					{t : MMHKPLUS.localize("RECRUITMENT"), ref : "KingdomRecruitment"},
					{t : MMHKPLUS.localize("RESOURCES"), ref : "KingdomResources"},
					{t : MMHKPLUS.localize("HEROES"), ref : "KingdomHeroes"},
					{t : MMHKPLUS.localize("ARTIFACTS"), ref : "KingdomArtifacts"},
					{t : MMHKPLUS.localize("ACTIONS"), ref : "KingdomActions"},
					{t : MMHKPLUS.localize("HEROES_SPELLS"), ref : "KingdomHeroesSpells"},
					{t : MMHKPLUS.localize("CITIES_SPELLS"), ref : "KingdomCitiesSpells"},
                    {t : MMHKPLUS.localize("CITIES_BUILDINGS"), ref : "KingdomCitiesBuildings"},
                    {t : MMHKPLUS.localize("REGIONS"), ref : "KingdomRegions"}
				]
			},
			{i : "tools.png", t : MMHKPLUS.localize("TOOLS"), ra : false, s : 
				[
                    {t : MMHKPLUS.localize("ATTACKS_SIEGES"), ref : "AttacksSieges"},
					{t : MMHKPLUS.localize("LOOKOUT"), ref : "Lookout"},
					{t : MMHKPLUS.localize("MAPFINDER"), ref : "MapFinder"},
					{t : MMHKPLUS.localize("CARTO"), ref : "Cartographer"},
					{t : MMHKPLUS.localize("DISTANCES"), ref : "Distances"},
					{t : MMHKPLUS.localize("MARKS"), ref : "Marks"},
					{t : MMHKPLUS.localize("NOTEPAD"), ref : "Notepad"},
                    {t : MMHKPLUS.localize("MAINTENANCE"), ref : "Maintenance"}
				]
			},
			{i : "settings.png", t : MMHKPLUS.localize("OPTIONS"), ra : false, s : 
			[
				{t : MMHKPLUS.localize("OPTIONS"), ref : "Options"},
				{t : MMHKPLUS.localize("ABOUT"), ref : "About"}
			],
		}
		];
		
		this.display();
		
		return this;
	},

	display : function()
	{
		this._clearMenu();
		this.$elem.appendTo($("#MainContainer"));
		this.$elem.addClass(
			(this.options.type == 0 ? 
				"MMHKPLUS_MainMenuTopbar MMHKPLUS_BlackBg MMHKPLUS_MaxZIndex" : "MMHKPLUS_MainMenuFloatting MMHKPLUS_BlackBg MMHKPLUS_MaxZIndex"));
		(this.options.type == 0 ? $("body").addClass("MMHKPLUS_BodyMainMenuTopbar") : $("body").removeClass("MMHKPLUS_BodyMainMenuTopbar"));
        
		this._createMenu();
		var self = this;
        if(this.options.type == 0)
    		$(window.document).scroll(function() 
    			{
    				var scrollLeft = $(this).scrollLeft();
    				var scrollTop = $(this).scrollTop();
    				
    				self.$elem.css("top", scrollTop + "px");
    				self.$elem.css("left", scrollLeft + "px");
    				if(self.options.type == 0)
    				{
    					var $submenus = $("body > ul.MMHKPLUS_SubMenu");
    					$submenus.eq(0).css({left : 1 * self.options.menuWidth + 1 * 4 + scrollLeft + "px", top : 22 + scrollTop + "px"});
    					$submenus.eq(1).css({left : 2 * self.options.menuWidth + 2 * 4 + scrollLeft + "px", top : 22 + scrollTop + "px"});
    					$submenus.eq(2).css({left : 3 * self.options.menuWidth + 3 * 4 + scrollLeft + "px", top : 22 + scrollTop + "px"});
    					$submenus.eq(3).css({left : 4 * self.options.menuWidth + 4 * 4 + scrollLeft + "px", top : 22 + scrollTop + "px"});
    				}
    			}
    		);
	},
	
	toggleType : function()
	{
		this.options.type = (this.options.type == 0 ? 1 : 0);
		this.save("type", this.options.type);
		this.display();
        if(MMHKPLUS.getElement("EnhancedUI"))
            MMHKPLUS.getElement("EnhancedUI")._setupGamePosition();
	},
	
	_createMenu : function()
	{
		if(this.options.type == 0)
		{
			$("<table>").append($("<tr>")).appendTo(this.$elem);
			var $container = this.$elem.find("tr");
			$("<td>").addClass("MMHKPLUS_MenuWidth").append("MMHK-Plus").click(function()
				{
					MMHKPLUS.openURL(MMHKPLUS.URL);
				}
			).button().appendTo($container);
			
			var baseURL = this.options.images;
			var showText = this.options.showText;
			var isInAlliance = MMHKPLUS.getElement("Player").isInAlliance();
			$.each(this.subItems, function(index, item)
				{
					if(!item.ra || (item.ra && isInAlliance))
					{
						var $cell = $("<td>").addClass("MMHKPLUS_MenuWidth")
										.append("<img src='" + baseURL + item.i + "' class='MMHKPLUS_MainMenuIcons'/>")
										.append((showText ? "<a href='#'>" + item.t + "</a>": ""))
										.button()
										.appendTo($container);
						if(hasProperty(item, "ref"))
						{
							$cell.click(function()
								{
									MMHKPLUS.openDisplayable(item.ref);
								}
							);
						}
						if(hasProperty(item, "s"))
						{
							var $submenu = $("<ul>").addClass("MMHKPLUS_SubMenu MMHKPLUS_MaxZIndex MMHKPLUS_MenuWidth hidden").css({left : $cell.offset().left + "px"}).appendTo($("body"));
							$.each(item.s, function(index, item)
								{
									$("<li>").append("<a href='#'>" + item.t + "</a>").on("click", function()
										{
											MMHKPLUS.openDisplayable(item.ref);
										}
									).addClass(hasProperty(item, "v") && !item.v ? "hidden" : "").appendTo($submenu);
								}
							);
							showHideOnMouse($submenu, $cell);
							showHideOnMouse($submenu, $submenu);
							$submenu.menu();
						}
					}
				}
			);
		}
		else
		{
			this.$elem.append("MMHK-Plus").button()
				.css({top : this.options.y, left : this.options.x, cursor : "move"});
			
			var $menu = $("<ul>").addClass("MMHKPLUS_MaxZIndex MMHKPLUS_MenuWidth").hide()
				.css({position : "absolute", left : this.options.x + "px", top : this.options.y + 20 + "px"})
				.appendTo($("body"));
			
			var self = this; 
			var baseURL = this.options.images;
			var showText = this.options.showText;
			var isInAlliance = MMHKPLUS.getElement("Player").isInAlliance();
			$.each(this.subItems, function(index, item)
				{
					if(!item.ra || (item.ra && isInAlliance))
					{
						var $cell = $("<li>")
							.append("<img src='" + baseURL + item.i + "' class='MMHKPLUS_MainMenuIcons' style='margin-left:5px; margin-right:5px;padding-top:3px;'/>")
							.append((showText ? "<a href='#'>" + item.t + "</a>": ""))
							.appendTo($menu);
						if(hasProperty(item, "ref"))
						{
							$cell.click(function()
								{
									MMHKPLUS.openDisplayable(item.ref);
								}
							);
						}
						if(hasProperty(item, "s"))
						{
							var $submenu = $("<ul>").addClass("MMHKPLUS_SubMenu MMHKPLUS_MaxZIndex MMHKPLUS_MenuWidth").appendTo($cell);
							$.each(item.s, function(index, item)
								{
									$("<li>").append("<a href='#'>" + item.t + "</a>").click(function()
										{
											MMHKPLUS.openDisplayable(item.ref);
										}
									).addClass(hasProperty(item, "v") && !item.v ? "hidden" : "").appendTo($submenu);
								}
							);
						}
						
					}
				}
			);
			this.$elem.draggable(
				{
					start : function(event, ui)
					{
						$menu.toggleClass("hidden");
					},
					
					drag : function(event, ui)
					{
						if(ui.offset.top < 0 || ui.offset.left < 0)
						{
							if(ui.offset.top < 0)
								$(this).css({top : "0px", left : ui.offset.left + "px"});
							if(ui.offset.left < 0)
								$(this).css({left : "0px", top : ui.offset.top + "px"});
							
							event.preventDefault();
							return false;
						}
					},
					stop : function(event, ui)
					{
						self.options.x = self.$elem.offset().left;
						self.options.y = self.$elem.offset().top;
						self.save("x", self.options.x);
						self.save("y", self.options.y);
						$menu.css({left : self.options.x + "px", top : self.options.y + 20 + "px"});
						$menu.toggleClass("hidden");
					}
				}
			);
			this.$elem.mouseenter(function()
				{
					$menu.show();
				}
			);
			this.$elem.mouseleave(function()
				{
					$menu.hide();
				}
			);
			$menu.mouseenter(function()
				{
					$menu.show();
				}
			);
			$menu.mouseleave(function()
				{
					$menu.hide();
				}
			);
			$menu.menu();
		}
	},
	
	_clearMenu : function()
	{
		$(window.document).off("scroll");
		this.$elem.draggable().draggable("destroy");
		MMHKPLUS.resetElement(this.$elem);
		MMHKPLUS.resetElement($("body > ul.MMHKPLUS_MaxZIndex"));
	},
	
	unload : function()
	{
		this._clearMenu();
		destroy(this.subItems);
	}
});
MMHKPLUS.Options = MMHKPLUS.PanelElement.extend({
    elementType : "Options",
    
    options : {
        title : "",
        resizable : false,
        opened : false,
        x : "center",
        y : "center",
        w : 250,
        h : 580,
        savePos : true,
        saveWidth : false,
        saveHeight : false,
        saveOpened : true
    },
    
    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.options.title = MMHKPLUS.localize("OPTIONS");
        this.$elem = $("<div>");

        this._setupPanel();
        
        return this;
    },

    onOpen : function()
    {
        this._createView();
    },

    _createView : function()
    {
        var self = this;
        this.$elem.empty();

        $("<br>").appendTo(this.$elem);

        // Menu type
        $("<p>").html(MMHKPLUS.localize("MENU_TYPE") + " : ").appendTo(this.$elem);
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "menuFormat")
            .attr("value", 0)
            .attr("checked", MMHKPLUS.getElement("Menu").options.type == 0)
            .change(function() { MMHKPLUS.getElement("Menu").toggleType();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("MENU_TOPBAR") + "<br/>");
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "menuFormat")
            .attr("value", 1)
            .attr("checked", MMHKPLUS.getElement("Menu").options.type == 1)
            .change(function() { MMHKPLUS.getElement("Menu").toggleType();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("MENU_FLOAT") + "<br/>");

        $("<br>").appendTo(this.$elem);

        // Buyable
        $("<p>").html(MMHKPLUS.localize("D_BUYABLE") + " : ").appendTo(this.$elem);
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "displayBuyable")
            .attr("value", 0)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.showBuyable == 1)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").toggleBuyable();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("YES") + "<br/>");
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "displayBuyable")
            .attr("value", 1)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.showBuyable == 0)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").toggleBuyable();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("NO") + "<br/>");

        $("<br>").appendTo(this.$elem);

        // Influence
        $("<p>").html(MMHKPLUS.localize("D_INFLUENCE") + " : ").appendTo(this.$elem);
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "displayInfluence")
            .attr("value", 0)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.showInfluence == 1)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").toggleInfluence();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("YES") + "<br/>");
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "displayInfluence")
            .attr("value", 1)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.showInfluence == 0)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").toggleInfluence();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("NO") + "<br/>");

        $("<br>").appendTo(this.$elem);


        // Alerts
        $("<p>").html(MMHKPLUS.localize("D_PANELS") + " : ").appendTo(this.$elem);
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "displayPanels")
            .attr("value", 0)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.showPanels == 1)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").togglePanels();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("YES") + "<br/>");
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "displayPanels")
            .attr("value", 1)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.showPanels == 0)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").togglePanels();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("NO") + "<br/>");

        $("<br>").appendTo(this.$elem);

        // Movements
        $("<p>").html(MMHKPLUS.localize("D_MOVEMENTS") + " : ").appendTo(this.$elem);
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "displayMovements")
            .attr("value", 0)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.showMovements == 1)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").toggleMovements();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("YES") + "<br/>");
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "displayMovements")
            .attr("value", 1)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.showMovements == 0)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").toggleMovements();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("NO") + "<br/>");

        $("<br>").appendTo(this.$elem);

        // Game to left
        $("<p>").html(MMHKPLUS.localize("D_GAMETOLEFT") + " : ").appendTo(this.$elem);
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "gameToleft")
            .attr("value", 0)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.gameToleft == true)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").toggleGamePosition();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("YES") + "<br/>");
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "gameToleft")
            .attr("value", 1)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.gameToleft == false)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").toggleGamePosition();})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("NO") + "<br/>");

        $("<br>").appendTo(this.$elem);

        // Chat
        $("<p>").html(MMHKPLUS.localize("U_CHAT") + " : ").appendTo(this.$elem);
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "chatType")
            .attr("value", 2)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.chatType == 2)
            .mouseup(function() { if($rb2.is(":checked")) { MMHKPLUS.alert(MMHKPLUS.localize("WARNING"), MMHKPLUS.localize("RESTART_GAME")); }})
            .change(function() { MMHKPLUS.getElement("EnhancedUI").toggleChat(2);})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("U_CHAT1") + "<br/>");
        var $rb2 = $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "chatType")
            .attr("value", 1)
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.chatType == 1)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").toggleChat(1);})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("U_CHAT2") + "<br/>");
        $("<input>").attr("type", "radio")
            .css("margin-right", "10px")
            .css("margin-left", "25px")
            .attr("name", "chatType")
            .attr("value", 0)
            .mouseup(function() { if($rb2.is(":checked")) { MMHKPLUS.alert(MMHKPLUS.localize("WARNING"), MMHKPLUS.localize("RESTART_GAME")); }})
            .attr("checked", MMHKPLUS.getElement("EnhancedUI").options.chatType == 0)
            .change(function() { MMHKPLUS.getElement("EnhancedUI").toggleChat(0);})
            .appendTo(this.$elem);
        this.$elem.append(
            MMHKPLUS.localize("U_CHAT3") + "<br/>");

        $("<br>").appendTo(this.$elem);

        // Space used
        var store = MMHKPLUS.getElement("Store");
        $("<p>").html(MMHKPLUS.localize("U_SPACE") + " : ").appendTo(this.$elem);
        $("<p>")
            .css("margin-left", "25px")
            .html(Math.floor(store.spaceUsed()/1000) + "/" + Math.floor(store.options.quota/1000) + " (" + Math.floor(store.spaceUsed() / store.options.quota) + "%)").appendTo(this.$elem);
        $("<div>").button()
            .css("padding", "5px")
            .css("margin-left", "25px")
            .css("margin-top", "5px")
            .html(MMHKPLUS.localize("CLEAN"))
            .click(function()
                {
                    self._cleanSpace();
                })
            .appendTo(this.$elem);
    },

    _cleanSpace : function()
    {
        var self = this;
        var $panel = $("<div>").dialog(
            {
                title : MMHKPLUS.localize("CLEAN"),
                modal : true,
                resizable : false,
                width : 500,
                height : 180,

                close : function()
                {
                    $(this).empty();
                    $(this).remove();
                    MMHKPLUS.getElement("Options")._createView();
                }
            }
        ).dialog("open");

        $("<p>")
            .html(MMHKPLUS.localize("CLEAN_NOTEPAD"))
            .appendTo($panel);
        var $selectNotepad = $("<select>")
            .css("margin-left", "25px")
            .css("margin-right", "10px")
            .css("width", "360px")
            .appendTo($panel);
        $("<div>").button()
            .css("padding", "5px")
            .html(MMHKPLUS.localize("CLEAN"))
            .click(function()
                {
                    self._deleteNotepad($selectNotepad.val());
                    self._loadDatas($panel);
                })
            .appendTo($panel);
        $("<br>").appendTo($panel);

        $("<p>")
            .html(MMHKPLUS.localize("CLEAN_MARKS"))
            .appendTo($panel);
        var $selectMarks = $("<select>")
            .css("margin-left", "25px")
            .css("margin-right", "10px")
            .css("width", "360px")
            .appendTo($panel);
        $("<div>").button()
            .css("padding", "5px")
            .html(MMHKPLUS.localize("CLEAN"))
            .click(function()
                {
                    self._deleteMarks($selectMarks.val());
                    self._loadDatas($panel);
                })
            .appendTo($panel);

        this._loadDatas($panel);
    },

    _deleteNotepad : function(id)
    {
        var store = MMHKPLUS.getElement("Store");
        var notepadSName = store.options.prefix + store.options.notepadName;
        
        var notepads = store.get(notepadSName);
        if(hasProperty(notepads, id))
        {
            delete notepads[id];
            store.set(notepadSName, notepads);
        }
    },

    _deleteMarks : function(id)
    {
        var store = MMHKPLUS.getElement("Store");
        var marksSName = store.options.prefix + store.options.marksName;
        
        var marks = store.get(marksSName);
        if(hasProperty(marks, id))
        {
            delete marks[id];
            store.set(marksSName, marks);
        }
    },

    _loadDatas : function($parent)
    {
        var $selectNotepad = $parent.find("select").eq(0);
        var $selectMarks = $parent.find("select").eq(1);

        $selectNotepad.empty();
        $selectMarks.empty();

        var store = MMHKPLUS.getElement("Store");
        var notepads = store.get("MMHKPLUS_NOTEPAD") || {};
        var marks = store.get("MMHKPLUS_MARKS") || {};

        for(var i in notepads)
        {
            if(hasProperty(notepads[i], "memos") && notepads[i].memos.length > 0)
                $selectNotepad.append(
                    $("<option>").attr("value", i).html(notepads[i].id + " - " + notepads[i].name))
        }

        for(var i in marks)
        {
            if(hasProperty(marks[i], "marks") && marks[i].marks.length > 0)
                $selectMarks.append(
                    $("<option>").attr("value", i).html(marks[i].id + " - " + marks[i].name))
        }
    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
    }
});
MMHKPLUS.Player = MMHKPLUS.RefreshableElement.extend({
	elementType : "Player",
	
	options : {
		refreshInterval : 5 * 60 * 1000 // 20 minutes
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this._refresh();
		
		return this;
	},
	
	isInAlliance : function()
	{
		return (isDefined(this.allianceId) && this.allianceId != -1);
	},
	
	getCities : function()
	{
		return MMHKPLUS.HOMMK.elementPool.obj.RegionCity.values().sort(function(a,b)
			{
				return a.content.captureDate - b.content.captureDate;
			}
		);
	},
	
	getCity : function(id)
	{
		return MMHKPLUS.HOMMK.elementPool.obj.RegionCity.obj[id] || null;
	},
	
	getHeroes : function()
	{
		var result = [];
		MMHKPLUS.HOMMK.elementPool.obj.Hero.values().forEach(function(h)
			{
				if(!hasProperty(h.content, "capture_playerId") && !hasProperty(h.content, "capture_region_id"))
					result.push(h);
			}
		);
		return result.sort(function(a, b)
			{
				return b._level - a._level;
			}
		);
	},
	
	getHero : function(id)
	{
		return MMHKPLUS.HOMMK.elementPool.obj.Hero.obj[id] || null;
	},
	
	getActions : function()
	{
		return  MMHKPLUS.HOMMK.elementPool.obj.MasterAction.values().sort(function(a, b)
			{
				return a.content.endDate - b.content.endDate;
			}
		);
	},
	
	getAction : function(id)
	{
		return  MMHKPLUS.HOMMK.elementPool.obj.MasterAction.obj[id] || null;
	},
	
	getRegions : function()
	{
		return MMHKPLUS.HOMMK.elementPool.obj.Region.values();
	},
	
	getRegion : function(id)
	{
		return MMHKPLUS.HOMMK.elementPool.obj.Region.obj[id] || null;
	},
	
	getChatMessages : function()
	{
		return MMHKPLUS.HOMMK.elementPool.obj.Chat.obj[this.playerId].log.values();
	},
	
	getCurrentViewX : function()
	{
		return MMHKPLUS.HOMMK.currentView.regionX || 1;
	},
	
	getCurrentViewY : function()
	{
		return MMHKPLUS.HOMMK.currentView.regionY || 1;
	},
	
	_refresh : function()
	{
		this.playerId = MMHKPLUS.HOMMK.player.content.id;
		this.playerName = MMHKPLUS.HOMMK.player.content.name;
		this.allianceId = MMHKPLUS.HOMMK.player.content.allianceId || -1;
		this.allianceName = MMHKPLUS.HOMMK.player.content.allianceName || "";
		this.color = (this.isInAlliance() ? MMHKPLUS.HOMMK.player.content.allianceColor : MMHKPLUS.HOMMK.player.content.color);
		this.background = MMHKPLUS.HOMMK.player.content.backgroundNb;
		this.pattern = MMHKPLUS.HOMMK.player.content.patternNb;
		this.iconNb = MMHKPLUS.HOMMK.player.content.iconNb;
		
		this.worldId = MMHKPLUS.HOMMK.player.content.worldId;
		this.worldSize = MMHKPLUS.HOMMK.worldMap.content._size || 280;
		this.worldName = MMHKPLUS.HOMMK.WORLD_NAME;
		this.season = MMHKPLUS.HOMMK.WORLD_SEASON_NUMBER;
	}
});
MMHKPLUS.Store = MMHKPLUS.ExtendableElement.extend({
	elementType : "Store",
	
	options : {
		oldName : "MMHKPLUS_LOCAL_STORAGE",
		version : 1,
		prefix : "MMHKPLUS_",
		pStorageName : "PREFERENCES",
		worldsName : "WORLDS",
		marksName : "MARKS",
		notepadName : "NOTEPAD",
		quota : 2.3 * 1024 * 1024
	},
	
	cache : {},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this._initStorage();
		
		return this;
	},
	
	get : function(id)
	{
		var object = null;
		if(hasProperty(this.cache, id))
		{
			object = this.cache[id];
		}
		else
		{
			object = JSON.parse(localStorage.getItem(id));
			this.cache[id] = object;
		}
		return object;
	},
	
	set : function(id, value)
	{
		if(this._isQuotaReached())
		{
			this._displayQuotaError();
			return;
		}
		try 
		{
			localStorage.setItem(id, JSON.stringify(value));
			if(hasProperty(this.cache, id))
			{
				delete this.cache[id];
			}
		}
		catch(e)
		{
			console.log(e);
			this._displayQuotaError();
		}
	},
	
	getProperty : function(id, property)
	{
		var object = null;
		if(hasProperty(this.cache, id))
		{
			object = this.cache[id];
			if(object && isDefined(property))
			{
				object = (object[property] != null ? object[property] :  null);
			}
		}
		else
		{
			object = localStorage.getItem(this.options.prefix + this.options.pStorageName);
			object = JSON.parse(object)[id] || null;
			this.cache[id] = object;
			if(object && isDefined(property))
			{
				object = (object[property] != null ? object[property] :  null);
			}
		}
		return object;
	},
	
	setProperty : function(id, property, value)
	{
		if(this._isQuotaReached())
		{
			this._displayQuotaError();
			return;
		}
		if(!isDefined(value))
		{
			value = property;
			property = null;
		}
		
		var object = JSON.parse(localStorage.getItem(this.options.prefix + this.options.pStorageName));
		if(!object) object = {};
		if(isDefined(property))
		{
			if(!object[id]) object[id] = {};
			object[id][property] = value;
		}
		else
		{
			object[id] = value;
		}
		try 
		{
			localStorage.setItem(this.options.prefix + this.options.pStorageName, JSON.stringify(object));
			if(hasProperty(this.cache, id))
			{
				delete this.cache[id];
			}
		}
		catch(e)
		{
			console.log(e);
			this._displayQuotaError();
		}
	},

    spaceUsed : function()
    {
        return unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
    },
	
	_initStorage : function()
	{
		var needDeletion = [];
		var keep  = 
			[
				this.options.prefix + this.elementType + "_" + this.options.version,
				this.options.prefix + this.options.pStorageName,  
				this.options.prefix + this.options.worldsName, 
				this.options.prefix + this.options.marksName, 
				this.options.prefix + this.options.notepadName
			];
		for(var i = 0 ; i < localStorage.length ; i++)
		{
			if(keep.indexOf(localStorage.key(i)) == -1)
				needDeletion.push(localStorage.key(i));
		}
		needDeletion.forEach(function(k)
			{
				localStorage.removeItem(k);
			}
		);
	
		var storeName = this.options.prefix + this.elementType + "_" + this.options.version;
		if(!localStorage.getItem(storeName))
		{
			this.set(storeName, storeName);
		}
		if(!localStorage.getItem(this.options.prefix + this.options.pStorageName))
		{
			this.set(this.options.prefix + this.options.pStorageName, {});
		}
		if(!localStorage.getItem(this.options.prefix + this.options.worldsName))
		{
			this.set(this.options.prefix + this.options.worldsName, {});
		}
		if(!localStorage.getItem(this.options.prefix + this.options.marksName))
		{
			this.set(this.options.prefix + this.options.marksName, {});
		}
		if(!localStorage.getItem(this.options.prefix + this.options.notepadName))
		{
			this.set(this.options.prefix + this.options.notepadName, {});
		}
	},

	_isQuotaReached : function()
	{
		return this.options.quota - this.spaceUsed() < 1000; 
	},
	
	_displayQuotaError : function()
	{
		MMHKPLUS.alert(MMHKPLUS.localize("QUOTA_REACHED"), MMHKPLUS.localize("QUOTA_REACHED_TEXT"));
	},
	
	unload : function()
	{
		destroy(this.cache);
	}
});
MMHKPLUS.Tooltip = MMHKPLUS.ExtendableElement.extend({
	elementType : "Tooltip",
	
	options : {
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.$elem = $("<div>").addClass("MMHKPLUS_Tooltip");
		
		return this;
	},
	
	setContent : function($parent, contentFunction)
	{
		var self = this; 
		$parent.off("mousemove mouseleave mouseenter");
		$parent.mouseenter(function(event)
			{
				self.$elem.empty();
				contentFunction($parent, self.$elem);
				self.$elem.appendTo($("body"));
			}
		);
		$parent.mousemove(function(event)
			{
				self.$elem.css(
					{
						top : event.pageY + 10 + "px",
						left : event.pageX + 10 + "px"
					}
				);
			}
		);
		$parent.mouseleave(function(event)
			{
				self.$elem.empty().css({width : "", minWidth : "", height : "", minHeight : ""});
				self.$elem.remove();
			}
		);
	},

	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
	}
});
MMHKPLUS.WorldSwitch = MMHKPLUS.ExtendableElement.extend({
    elementType : "WorldSwitch",
    
    options : {

    },
    
    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.$elem = $("<div>");
        
        this.display();
        
        return this;
    },

    display : function()
    {
        this._addCurrentWorld();
        var self = this;
        this.$elem.empty();
        this.$elem.remove();
        this.$elem.addClass("center").appendTo($("#Container"));
        this.$elem.css(
            {
                "border-radius" : "10px 10px 0 0",
                "border" : "1px solid #FFFFFF",
                "border-bottom" : "none",
                "color" : "#FFFFFF",
                "width" : "400px",
                "height" : "30px",
                "position" : "absolute",
                "top" : "-30px",
                "left" : "305px",
                "background-color" : "background-color: rgba(0, 0, 0, 0.75)",
                "line-height" : "30px",
                "margin-left" : "auto",
                "margin-right" : "auto",
                "z-index": "3000"
            }
        );
        var $cb = $("<select>").appendTo(this.$elem);
        var worlds = MMHKPLUS.getElement("Store").get("MMHKPLUS_WORLDS") || {list : []};
        worlds.list.forEach(function(w)
            {
                $("<option>").attr("value", self._createUrl(w)).html(self._createText(w)).appendTo($cb);
            }
        );
        $("<option>").attr("value", "").html("-----------------").appendTo($cb);
        $("<option>").attr("value", "reset").html("Reset").appendTo($cb);

        $cb.bind("change", function(e)
            {
                if($cb.val() == "reset")
                {

                    var $panel = $("<div>").dialog(
                        {
                            title : MMHKPLUS.localize("CONFIRM"),
                            width : 220,
                            height : 100, 
                            resizable : false,
                            position : ["center", 30],

                            close : function()
                            {
                                $(this).empty();
                                $(this).remove();
                                $cb[0].selectedIndex = -1;
                            }
                        }
                    );

                    $panel.css(
                        {
                            textAlign : "center",

                        }
                    );

                    $panel.append($("<p/>").html(MMHKPLUS.localize("CONFIRM_TEXT")));
                    $panel.append(
                        $("<p/>")
                            .append(
                                $("<div/>").button().css("padding", "3px")
                                    .html(MMHKPLUS.localize("OK"))
                                    .click(function()
                                        {
                                            var allWorlds = MMHKPLUS.getElement("Store").get("MMHKPLUS_WORLDS");
                                            allWorlds.list = [];
                                            MMHKPLUS.getElement("Store").set("MMHKPLUS_WORLDS", allWorlds);

                                            self.display();
                                            $panel.dialog("close");
                                        }))
                            .append(
                                $("<span>&nbsp;&nbsp;&nbsp;</span>"))
                            .append(
                                $("<div/>").button().css("padding", "3px")
                                    .html(MMHKPLUS.localize("CANCEL"))
                                    .click(function()
                                        {
                                            $panel.dialog("close");
                                            $cb.attr('selectedIndex', -1);
                                        })));
                    $panel.dialog("open");
                }
                else if($cb.val() == "")
                {
                    //separator
                    $cb[0].selectedIndex = -1;
                }
                else
                {
                    if($cb.val() != document.referrer)
                        document.location.href = $cb.val();
                    else
                        $cb[0].selectedIndex = -1;
                }
                
            }
        );
        $cb[0].selectedIndex = -1;
    },

    _isAlreadyPresent : function(array, object)
    {
        var isPresent = false;
        array.forEach(function(o)
            {
                if(o.id == object.id && o.name == object.name && o.coge == object.coge &&
                        o.cogeId == object.cogeId && o.cogeName == object.cogeName)
                {
                    isPresent = true;
                }
            }
        );
        return isPresent;
    },

    _addCurrentWorld : function()
    {
        if(MMHKPLUS.getElement("Player").get("worldName").toUpperCase() != "TRAINING WORLD")
        {
            var referer = document.referrer;
            var playerId = document.referrer.split();
            var worlds = MMHKPLUS.getElement("Store").get("MMHKPLUS_WORLDS") || {};
            if(!hasProperty(worlds, "list"))
                worlds.list = [];
            
            var cogePlayerId = referer.split("playForPlayerId=")[1];
            var thisWorld = 
                {
                    id : MMHKPLUS.getElement("Player").get("worldId"), 
                    name : MMHKPLUS.getElement("Player").get("worldName"), 
                    coge : (cogePlayerId != undefined), 
                    cogeId : (cogePlayerId != undefined ? cogePlayerId : -1), 
                    cogeName : (cogePlayerId != undefined ? MMHKPLUS.getElement("Player").get("playerName") : "")
                };
            
            if(!this._isAlreadyPresent(worlds.list, thisWorld))
            {
                worlds.list.push(thisWorld);
            }
            MMHKPLUS.getElement("Store").set("MMHKPLUS_WORLDS", worlds);
        }
    },
    
    _createUrl : function(object)
    {
        var url = "http://" + window.location.hostname + "/selectWorld?worldId=" + object.id; 
        if(object.coge)
        {
            url += "&playForPlayerId=" + object.cogeId;
        }
        return url;
    },
    
    _createText : function(object)
    {
        var text = object.name;
        if(object.coge)
        {
            text += " (" + object.cogeName + ")";
        }
        return text;
    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
    }
});
MMHKPLUS.AllianceHeroes = MMHKPLUS.PanelElement.extend({
    elementType : "AllianceHeroes",
    
    options : {
        title : "",
        resizable : false,
        opened : false,
        x : "center",
        y : "center",
        w : 760,
        h : 540,
        savePos : true,
        saveWidth : false,
        saveHeight : false,
        saveOpened : true
    },
    
    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.options.title = MMHKPLUS.localize("ALLIANCE_HEROES");
        this.$elem = $("<div>");
        this._setupPanel();
        
        return this;
    },
    
    onOpen : function()
    {
        this._createView();
        this._getAlliances();
    },

    onSetup : function()
    {
        this.$elem.css(
            {
                overflow : "hidden"
            }
        );
    },

    _createView : function()
    {
        var self = this;
        $("<div>")
            .addClass("MMHKPLUS_TextCenter")
            .append(
                $("<label>")
                    .html(MMHKPLUS.localize("ALLIANCE") + " : "))
            .append(
                $("<select>")
                    .css("width", "230px")
                    .change(function()
                        {
                            self.$elem.find("div.MMHKPLUS_AllianceHeroesHero").empty();
                            self.$elem.find("div.MMHKPLUS_AllianceHeroesHeroContent").empty().remove();
                            self._getPlayers();
                        }))
            .append("&nbsp;&nbsp;&nbsp;&nbsp;")
            .append(
                $("<label>")
                    .html(MMHKPLUS.localize("PLAYER") + " : "))
            .append(
                $("<select>")
                    .css("width", "150px")
                    .change(function()
                        {
                            self.$elem.find("div.MMHKPLUS_AllianceHeroesHero").empty();
                            self.$elem.find("div.MMHKPLUS_AllianceHeroesHeroContent").empty().remove();
                            self._getHeroes();
                        }))
            .appendTo(this.$elem);

        $("<br>").appendTo(this.$elem);

        $("<table>").addClass("MMHKPLUS_Table MMHKPLUS_100Width").appendTo(
            $("<div>")
                .css({width:"430px", height:"260px", overflowX:"hidden", overflowY:"auto"})
                .appendTo(this.$elem));

        $("<div>")
            .addClass("MMHKPLUS_AllianceHeroesHero")
            .css(
                {
                    border : "1px solid #FFFFFF",
                    borderRadius : "10px",
                    width : "295px",
                    minHeight : "35px",
                    marginTop : "20px",
                    position : "absolute",
                    marginLeft : "440px",
                    top : "20px"
                })
            .appendTo(this.$elem);
    },

    _getAlliances : function()
    {
        var $selectAlliances = this.$elem.find("select").eq(0);
        $selectAlliances.empty();

        sessionStorage.removeItem("MMHKPLUS_Alliances");
        MMHKPLUS.getElement("Ajax").getAlliances();
        MMHKPLUS.wait(function()
            {
                return sessionStorage.getItem("MMHKPLUS_Alliances") != null;   
            },
            function()
            {
                var alliances = JSON.parse(sessionStorage.getItem("MMHKPLUS_Alliances")) || [];
                sessionStorage.removeItem("MMHKPLUS_Alliances");

                $selectAlliances.append(
                            $("<option>")
                                .attr("value", "%")
                                .html(""));
                $selectAlliances.append(
                            $("<option>")
                                .attr("value", -1)
                                .html(MMHKPLUS.localize("NONE")));

                alliances.forEach(function(a)
                    {
                        $selectAlliances.append(
                            $("<option>")
                                .attr("value", a[1])
                                .html(a[0]));
                    }
                );
            },
            8
        );  
    },

    _getPlayers : function()
    {
        var $selectPlayers = this.$elem.find("select").eq(1);
        $selectPlayers.empty();
        var filterAlliance = this.$elem.find("select").eq(0).val() || "%";

        if(filterAlliance == "%")
            return;

        sessionStorage.removeItem("MMHKPLUS_Players");
        MMHKPLUS.getElement("Ajax").getPlayers(filterAlliance);
        MMHKPLUS.wait(function()
            {
                return sessionStorage.getItem("MMHKPLUS_Players") != null;   
            },
            function()
            {
                var players = JSON.parse(sessionStorage.getItem("MMHKPLUS_Players")) || [];
                sessionStorage.removeItem("MMHKPLUS_Players");

                $selectPlayers.append(
                    $("<option>")
                        .attr("value", "%")
                        .html(""));

                players.forEach(function(p)
                    {
                        $selectPlayers.append(
                            $("<option>")
                                .attr("value", p[1])
                                .html(p[0]));
                    }
                );
            },
            8
        );
    },

    _getHeroes : function()
    {
        var self = this;
        var $table = this.$elem.find("table");
        $table.empty();
        var playerId = this.$elem.find("select").eq(1).val() || null;
        if(playerId)
        {
            sessionStorage.removeItem("MMHKPLUS_Heroes");
            MMHKPLUS.getElement("Ajax").getHeroes(playerId);
            MMHKPLUS.wait(
                function()
                {  
                    return sessionStorage.getItem("MMHKPLUS_Heroes") != null;
                },
                function()
                {
                    var heroes = JSON.parse(sessionStorage.getItem("MMHKPLUS_Heroes")) || [];
                    sessionStorage.removeItem("MMHKPLUS_Heroes");

                    heroes.forEach(function(h)
                        {
                            $table.append(
                                $("<tr>").addClass("MMHKPLUS_100Width MMHKPLUS_AllianceSpysHover")
                                    .css("cursor", "pointer")
                                    .append(
                                        $("<td>").addClass("MMHKPLUS_TextCenter")
                                            .html(h[2]))
                                    .append(
                                        $("<td>").addClass("MMHKPLUS_TextCenter")
                                            .html(MMHKPLUS.localize("LEVEL") + " " + h[3]))
                                    .append(
                                        $("<td>").addClass("MMHKPLUS_TextCenter")
                                            .html((h[4].trim() == "" ? "" : MMHKPLUS.localizeText(h[4]))))
                                    .click(function()
                                        {
                                            self._loadHero(h[0], h[1]);
                                        }));
                        }
                    );
                    $table.find("tr:odd").css({backgroundColor:"rgba(0,191,255,0.2)"});
                },
                8
            );
        }
    },

    _loadHero : function(playerId, heroId)
    {
        var self = MMHKPLUS.getElement("AllianceHeroes");
        sessionStorage.removeItem("MMHKPLUS_Hero");
        MMHKPLUS.getElement("Ajax").getSpyHeroContent(playerId, heroId);
        MMHKPLUS.wait(
            function()
            {  
                return sessionStorage.getItem("MMHKPLUS_Hero") != null;
            },
            function()
            {
                var hero = JSON.parse(sessionStorage.getItem("MMHKPLUS_Hero"));
                sessionStorage.removeItem("MMHKPLUS_Hero");
                if(!hero)
                {
                    MMHKPLUS.alert(MMHKPLUS.localize("NOT_FOUND_AH_TITLE"), MMHKPLUS.localize("NOT_FOUND_AH_TEXT"));
                    self.$elem.dialog("close");
                    return;
                }

                self._createHeroContent(playerId, hero);
            },
            8
        );
    },

    _getHeroBackgroundImage : function(faction, picture)
    {
        var factionLower = faction.toLowerCase();
        var factionCapitalize = faction.charAt(0).toUpperCase() + faction.slice(1).toLowerCase();
        picture = (picture < 10 ? "0" + picture : "" + picture);
        
        return $("<div/>").css(
            {
                "margin-left" : "auto",
                "margin-right" : "auto",
                "background-image" : "url(" + MMHKPLUS.HOMMK.IMG_URL + "hero/portraits/" + factionCapitalize + "/" + factionLower + "_" + picture + ".jpg)",
                "width" : "295px",
                "height" : "350px",
                "background-position" : "0px 0px"
            }
        );
    },

    _createHeroContent : function(playerId, hero)
    {
        var self = MMHKPLUS.getElement("AllianceHeroes");
        var $heroContent = self.$elem.find("div.MMHKPLUS_AllianceHeroesHero");
        $heroContent.empty();
            
        var heroImage = self._getHeroBackgroundImage(hero[2], hero[3]).css(
            {
                "position" : "relative",
                "float" : "left",
                "height" : "450px",
                "top" : "0px",
                "left" : "0px",
                "border-radius" : "10px"
            }
        ).appendTo($heroContent);
        
        var divSummary = $("<div>").css(
            {
                "position" : "absolute",
                "left" : "10px",
                "bottom" : "15px",
                "right" : "10px",
                "top" : "344px",
                "background-color" : "#E7D5B9",
                "border" : "1px solid #50332B",
                "border-radius" : "10px",
                "color" : "#50332B",
                "text-align" : "center",
                "padding" : "7px"
            }
        ).appendTo($heroContent);
        
        var divHeroName = $("<div/>").css(
            {
                "position" : "absolute",
                "left" : "35px",
                "bottom" : "105px",
                "right" : "100px",
                "top" : "320px",
                "background-color" : "#EEEBE9",
                "border" : "1px solid #50332B",
                "border-bottom" : "none",
                "border-radius" : "10px 10px 0 0",
                "border-color" : "#50332B",
                "line-height" : "25px",
                "color" : "#50332B",
                "font-weight" : "bold",
                "padding-left" : "10px"
            }
        ).html(hero[1].toUpperCase()).appendTo($heroContent);
        
        $("<p style='font-weight:bold;'/>").html(MMHKPLUS.localize("LEVEL") + " : " + hero[4]).appendTo(divSummary);
        $("<p style='font-weight:bold;'/>").html((hero[5].trim() == "" ? "" : MMHKPLUS.localizeText(hero[5]))).appendTo(divSummary);
        
        var statsSummary = $("<div/>").css({"margin-top" : "10px"}).appendTo(divSummary);
        $("<img/>").attr("src", MMHKPLUS.URL_IMAGES + "kingdom/heroAttack.png").css({"padding-right" : "10px"}).appendTo(statsSummary);
        $("<span/>").css({"font-weight":"bold", "font-size":"135%", "margin-right" : "20px"}).html(hero[6]).appendTo(statsSummary);
        $("<img/>").attr("src", MMHKPLUS.URL_IMAGES + "kingdom/heroDefense.png").css({"padding-right" : "10px"}).appendTo(statsSummary);
        $("<span/>").css({"font-weight":"bold", "font-size":"135%", "margin-right" : "20px"}).html(hero[7]).appendTo(statsSummary);
        $("<img/>").attr("src", MMHKPLUS.URL_IMAGES + "kingdom/heroMagic.png").css({"padding-right" : "10px"}).appendTo(statsSummary);
        $("<span/>").css({"font-weight":"bold", "font-size":"135%"}).html(hero[8]).appendTo(statsSummary);
        
        $("<div/>").addClass("MMHKPLUS_AllianceHeroesHeroContent MMHKPLUS_TextCenter").css(
            {
                "position" : "absolute",
                "left" : "-440px",
                "bottom" : "0px",
                "right" : "310px",
                "top" : "270px",
                "padding-left" : "10px"
            }
        ).append(
            $("<label>").html(MMHKPLUS.localize("IG_PERMALINK")))
        .append($("<input readonly>").css({width: "220px", marginLeft:"15px"}).val("MMHKPLUS_HeroPL(" + playerId + "," + hero[0] + "," + removeDiacritics(hero[1])+ ")").click(function() {this.select();}))
        .appendTo($heroContent);

        var divDetailContent = $("<div/>").addClass("MMHKPLUS_AllianceHeroesHeroContent").css(
            {
                "position" : "absolute",
                "left" : "-440px",
                "bottom" : "0px",
                "right" : "310px",
                "top" : "300px",
                "border" : "1px solid #FFFFFF",
                "border-radius" : "10px",
                "color" : "#50332B",
                "padding-left" : "10px"
            }
        ).appendTo($heroContent);
        MMHKPLUS.getElement("SpyReport", true)._createClassesContent(hero[9]).css(
            {
                "margin-left" : "40px"
            }
        ).appendTo(divDetailContent);
        MMHKPLUS.getElement("SpyReport", true)._createSpellsContent(hero[10]).css(
            {
                "position" : "relative",
                "top" : "-60px",
                "right" : "10px",
                "left" : "250px"
            }
        ).appendTo(divDetailContent);
        MMHKPLUS.getElement("SpyReport", true)._createArtefactsContent(hero[11]).css(
            {
                "position" : "relative",
                "top" : "-50px",
                "left" : "25px"
            }
        ).appendTo(divDetailContent);
        
        
        $("<div/>").html("<p style='height:17px;line-height:17px;'><img src='" + MMHKPLUS.URL_JACTARI + "images/icone-combat.png' style='margin-right:10px;'/><span style='position:relative;margin-top:-5px;top:-4px;padding-right:7px;'>" + MMHKPLUS.localize("ATTACKER") + "</span></p>").css(
            {
                "position" : "absolute",
                "top" : "10px",
                "left" : "10px",
                "line-height" : "17px",
                "height" : "17px",
                "border" : "1px solid #50332B",
                "color" : "#50332B",
                "font-weight" : "bold",
                "cursor" : "pointer",
                "background-color" : "#E7D5B9"
            }
        ).click(function()
            {
                var heroJac =
                    {
                        defense : hero[7],
                        attack : hero[6],
                        magic : hero[8],
                        factionEntityTagName : hero[2],
                        id : hero[0],
                        name : hero[1],
                        _level : hero[4],
                        heroTrainingEntityTagName : MMHKPLUS.getElement("SpyReport", true)._stringToArchetype(hero[5]),
                        bonus : 
                            {
                                artefacts : hero[11],
                                skills : [],
                                spells : []
                            }
                    };
                MMHKPLUS.getElement("Jactari").permalien(null, heroJac, {});
                MMHKPLUS.openURL(MMHKPLUS.getElement("Jactari").lastPermalien());
            }
        ).appendTo($heroContent);
        
        $("<div/>").html("<p style='height:17px;line-height:17px;'><img src='" + MMHKPLUS.URL_JACTARI + "/images/icone-combat.png' style='margin-right:10px;'/><span style='position:relative;margin-top:-5px;top:-4px;padding-right:5px;'>" + MMHKPLUS.localize("DEFENDER") + "</span></p>").css(
            {
                "position" : "absolute",
                "top" : "35px",
                "left" : "10px",
                "line-height" : "17px",
                "height" : "17px",
                "border" : "1px solid #50332B",
                "color" : "#50332B",
                "font-weight" : "bold",
                "cursor" : "pointer",
                "background-color" : "#E7D5B9"
            }
        ).click(function()
            {
                var heroJac =
                    {
                        defense : hero[7],
                        attack : hero[6],
                        magic : hero[8],
                        factionEntityTagName : hero[2],
                        id : hero[0],
                        name : hero[1],
                        _level : hero[4],
                        heroTrainingEntityTagName : MMHKPLUS.getElement("SpyReport", true)._stringToArchetype(hero[5]),
                        bonus : 
                            {
                                artefacts : hero[11],
                                skills : [],
                                spells : []
                            }
                    };
                heroJac.artefactList = heroJac.bonus.artefacts;
                MMHKPLUS.getElement("Jactari").permalien(null, {}, heroJac);
                MMHKPLUS.openURL(MMHKPLUS.getElement("Jactari").lastPermalien());
            }
        ).appendTo($heroContent);
    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
    }
});
MMHKPLUS.AllianceOnlineMembers = MMHKPLUS.PanelElement.extend({
    elementType : "AllianceOnlineMembers",
    intervalOnlineUpdate : null,
    
    options : {
        title : "",
        resizable : true,
        opened : false,
        x : "center",
        y : "center",
        w : 300,
        h : 250,
        savePos : true,
        saveWidth : false,
        saveHeight : true,
        saveOpened : true,
        refresh : 60000
    },
    
    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.options.title = MMHKPLUS.localize("ONLINE_MEMBERS");
        this.$elem = $("<div>");
        this._setupPanel();
        
        return this;
    },
    
    onSetup : function()
    {
        this.$elem.dialog(
            {
                minWidth : 300,
                maxWidth : 300, 
                minHeight : 150
            }
        ).css(
            {
                overflow : "hidden"
            }
        );
    },
    
    onOpen : function()
    {
        this.intervalOnlineUpdate = setInterval((function(self) { return function() { self._createView(); } })(this), this.options.refresh);
        this._createView();
    },

    onClose : function()
    {
        MMHKPLUS.clearInterval(this.intervalOnlineUpdate); this.intervalOnlineUpdate = null;
    },

    _createView : function()
    {
        var self = this;
        
        MMHKPLUS.getElement("Ajax").getAllianceFrame(MMHKPLUS.getElement("Player").get("allianceId"),
            function(json)
            {
                self.$elem.empty();
                var $content = $("<div>")
                    .css({height:"100%", borderRadius:"10px", overflowX:"hidden", overflowY:"auto"})
                    .addClass("MMHKPLUS_100Width MMHKPLUS_WhiteBorder")
                    .appendTo(self.$elem);
                var $table = $("<table>").addClass("MMHKPLUS_Table MMHKPLUS_100Width").appendTo($content);

                var members = json.d[Object.keys(json.d)[0]].attachedPlayerList;
                    members.forEach(function(member)
                    {
                        if(member.status == "ONLINE" && member.id != MMHKPLUS.getElement("Player").get("playerId"))
                        {
                            var $avatar = MMHKPLUS.getPlayerAvatar(member.backgroundNb, member.patternNb, member.iconNb).css("marginLeft", "10px");
                            $("<tr>")
                                .addClass("MMHKPLUS_100Width")
                                .append(
                                    $("<td>")
                                        .css({width:"70px",height:"44px", maxHeight:"44px"})
                                        .append($avatar.addClass("MMHKPLUS_AutoCenter")))
                                .append(
                                    $("<td>")
                                        .css({lineHeight:"44px", height:"44px", maxHeight:"44px", paddingLeft:"5px", fontWeight:"bold", cursor:"pointer"})
                                        .html(member.name)
                                        .click(function()
                                            {
                                                if(MMHKPLUS.getElement("EnhancedUI").options.chatType == 2)
                                                {
                                                    if(!MMHKPLUS.getElement("Chat").options.opened)
                                                        MMHKPLUS.getElement("Chat").display();
                                                    MMHKPLUS.getElement("Chat")._getChatContent(member.name, member.name, true);
                                                }
                                            }))
                                .appendTo($table);
                        }
                    }
                );
            }
        );

    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
        MMHKPLUS.clearInterval(this.intervalOnlineUpdate); this.intervalOnlineUpdate = null;
    }
});
MMHKPLUS.AllianceRegionReports = MMHKPLUS.ExtendableElement.extend({
    elementType : "AllianceRegionReports",
    
    options : {
        oneDay : 24 * 3600 * 1000,
        twoDays : 2 * 24 * 3600 * 1000,
        fiveDays : 5 * 24 * 3600 * 1000
    },

    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.$elem = $("<div>").addClass("MMHKPLUS_AllianceRegionReports");
        
        return this;
    },

    displayReports : function(data)
    {
        var self = this;
        this.$elem.empty();
        this.$elem.remove();

        if(data && data.length > 0)
        {
            var regionView = MMHKPLUS.HOMMK.worldMap.selectedRegion;
            if(regionView && regionView.content.id == MMHKPLUS.HOMMK.worldMap.selectedRegion.content.id)
            {
                var $box = $("#WorldMap" + MMHKPLUS.getElement("Player").get("worldId") + "PlayerName").parent();
                $box.append(this.$elem);
                $("<br>").appendTo(self.$elem);
                var $list = $("<ul>").appendTo(this.$elem);
                data.forEach(function(r)
                    {
                        var d = new Date(); d.setTime(r.date * 1000);
                        var type = "";
                        if(r.referenceType <= 1)
                            type = "T"
                        if(r.referenceType == 2)
                            type = "C"
                        if(r.referenceType == 3)
                            type = "R"
                        if(r.referenceType == 4)
                            type = "S"
                        var $li = $("<li style='font-size:90%; cursor:pointer;'>")
                            .html("<a>" + d.toShortFrenchFormat() + " (" + type + ")</a>")
                            .click(function()
                                {
                                    MMHKPLUS.getElement("Ajax").getSpyReportContent(r.reportId);
                                })
                            .appendTo(self.$elem);

                        if($.now() - d.getTime() >= self.options.fiveDays)
                            $li.css("color", "red");
                        else if($.now() - d.getTime() >= self.options.oneDay && $.now() - d.getTime() <= self.options.fiveDays)
                            $li.css("color", "orange");
                        else 
                            $li.css("color", "green");
                    }
                );
            }
            destroy(data); 
            data = null;
        }
    },

    openSpyReport : function(data)
    {
        MMHKPLUS.openHiddenDisplayable("SpyReport");
        MMHKPLUS.getElement("SpyReport").loadReport(data);
    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
    }
});
MMHKPLUS.AllianceSpys = MMHKPLUS.PanelElement.extend({
    elementType : "AllianceSpys",
    currentPage : 1,
    $btnNext : null,
    $btnPrevious : null,
    $btnBegin : null,
    
    options : {
        title : "",
        resizable : false,
        opened : false,
        x : "center",
        y : "center",
        w : 820,
        h : 540,
        savePos : true,
        saveWidth : false,
        saveHeight : false,
        saveOpened : true
    },
    
    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.options.title = MMHKPLUS.localize("ALLIANCE_SPYS");
        this.$elem = $("<div>");
        this._setupPanel();
        
        return this;
    },
    
    onOpen : function()
    {
        this._createView();
        this._getAlliances();
    },

    onClose : function()
    {
        this.$btnNext = null;
        this.$btnPrevious = null;
        this.$btnBegin = null;
    },

    _createView : function()
    {
        var self = this;
        $("<div>").addClass("MMHKPLUS_TextCenter")
            .append(
                $("<label>")
                    .html(MMHKPLUS.localize("ALLIANCE") + " : "))
            .append(
                $("<select>")
                    .css("width", "230px")
                    .change(function()
                        {
                            self._getPlayers();
                        }))
            .append("&nbsp;&nbsp;&nbsp;&nbsp;")
            .append(
                $("<label>")
                    .html(MMHKPLUS.localize("PLAYER") + " : "))
            .append(
                $("<select>")
                    .css("width", "150px"))
            .append("<br>")
            .append(
                $("<label>")
                    .html(MMHKPLUS.localize("LOCATION") + " : "))
            .append(
                $("<input>")
                    .css("marginTop", "10px")
                    .css("width", "90px")
                    .attr("maxlength", 25))
            .append("&nbsp;&nbsp;&nbsp;&nbsp;")
            .append(
                $("<label>")
                    .html("X : "))
            .append(
                $("<input>")
                    .css("width", "40px")
                    .attr("maxlength", 3))
            .append("&nbsp;&nbsp;&nbsp;&nbsp;")
            .append(
                $("<label>")
                    .html("Y : "))
            .append(
                $("<input>")
                    .css("width", "40px")
                    .attr("maxlength", 3))
            .append("&nbsp;&nbsp;&nbsp;&nbsp;")
            .append(
                $("<div>")
                    .button()
                    .html(MMHKPLUS.localize("REFRESH"))
                    .css("padding", "5px")
                    .click(function()
                        {
                            self.currentPage = 1;
                            self._reloadContent();
                        }))
            .append("&nbsp;&nbsp;&nbsp;&nbsp;")
            .append(
                $("<div>")
                    .button()
                    .html(MMHKPLUS.localize("CLEAN"))
                    .css("padding", "5px")
                    .click(function()
                        {
                            self.$elem.find("select").empty();
                            self.$elem.find("input").val("");
                            self._getAlliances();
                            self._reloadContent();
                        }))
            .appendTo(this.$elem);

            $("<br>").appendTo(this.$elem);

            $("<div>").addClass("MMHKPLUS_TextCenter")
                .append(
                    self.$btnBegin = $("<div>").addClass("MMHKPLUS_Previous")
                        .button().button("disable")
                        .css("padding", "5px")
                        .html(MMHKPLUS.localize("BEGIN"))
                        .click(function()
                            {
                                self.currentPage = 1; 
                                self._reloadContent();
                            }))
                .append("&nbsp;&nbsp;&nbsp;&nbsp;")
                .append(
                    self.$btnPrevious = $("<div>").addClass("MMHKPLUS_Previous")
                        .button().button("disable")
                        .css("padding", "5px")
                        .html(MMHKPLUS.localize("PREVIOUS"))
                        .click(function()
                            {
                                self.currentPage--; 
                                self._reloadContent();
                            }))
                .append("&nbsp;&nbsp;&nbsp;&nbsp;")
                .append(
                    self.$btnNext = $("<div>").addClass("MMHKPLUS_Next")
                        .button().button("disable")
                        .css("padding", "5px")
                        .html(MMHKPLUS.localize("NEXT"))
                        .click(function()
                            {
                                self.currentPage++; 
                                self._reloadContent();
                            }))
                .appendTo(this.$elem);

            $("<br>").appendTo(this.$elem);
            
            $("<table>")
                .addClass("MMHKPLUS_100Width MMHKPLUS_Table")
                .appendTo(this.$elem);

            this._reloadContent();
    },

    _reloadContent : function()
    {
        var $table = this.$elem.find("table");
        $table.empty();
        this.$btnPrevious.button("disable")
        this.$btnNext.button("disable")
        this.$btnBegin.button("disable");

        var filterAlliance = this.$elem.find("select").eq(0).val() || "%";
        var filterPlayer = this.$elem.find("select").eq(1).val() || "%";
        var filterLocation = this.$elem.find("input").eq(0).val() || "%";
        var filterX = parseInt(this.$elem.find("input").eq(1).val()) || "%";
        var filterY = parseInt(this.$elem.find("input").eq(2).val()) || "%";

        if(filterLocation != "%")
            filterLocation = "%" + filterLocation + "%";

        MMHKPLUS.getElement("Ajax").getAllianceSpyReports(filterAlliance, filterPlayer, filterLocation, filterX, filterY, this.currentPage);
    },

    _setContent : function(count, data)
    {
        var $table = this.$elem.find("table");

        data.forEach(function(r)
            {
                var d = new Date(); d.setTime(r[8] * 1000);
                $("<tr>").addClass("MMHKPLUS_100Width MMHKPLUS_AllianceSpysHover")
                    .append(
                        $("<td>").addClass("MMHKPLUS_TextCenter")
                            .css("width", "230px")
                            .html(r[4]))
                    .append(
                        $("<td>").addClass("MMHKPLUS_TextCenter")
                            .css("width", "150px")
                            .html(r[3]))
                    .append(
                        $("<td>").addClass("MMHKPLUS_TextCenter")
                            .css("width", "120px")
                            .html((r[7] == "Halte" ? MMHKPLUS.localize("HALT") : (r[7] == "Ruine" ? MMHKPLUS.localize("RUIN") : r[7]))))
                    .append(
                        $("<td>").addClass("MMHKPLUS_TextCenter")
                            .css("width", "80px")
                            .html("(" + r[5] + "," + r[6] + ")"))
                    .append(
                        $("<td>").addClass("MMHKPLUS_TextCenter")
                            .css("width", "150px")
                            .html(d.toShortFrenchFormat()))
                    .css("cursor", "pointer")
                    .click(function()
                        {
                            MMHKPLUS.getElement("Ajax").getSpyReportContent(r[0]);
                        })
                    .appendTo($table);
            }
        );

        if(this.currentPage > 1)
        {
            this.$btnPrevious.button("enable");
            this.$btnBegin.button("enable");
        }

        if(this.currentPage * 20 < count)
        {
            this.$btnNext.button("enable");
        }

        $table.find("tr:odd").css({backgroundColor:"rgba(0,191,255,0.2)"});
    },

    _getAlliances : function()
    {
        var $selectAlliances = this.$elem.find("select").eq(0);
        $selectAlliances.empty();

        sessionStorage.removeItem("MMHKPLUS_Alliances");
        MMHKPLUS.getElement("Ajax").getAlliances();
        MMHKPLUS.wait(function()
            {
                return sessionStorage.getItem("MMHKPLUS_Alliances") != null;   
            },
            function()
            {
                var alliances = JSON.parse(sessionStorage.getItem("MMHKPLUS_Alliances")) || [];
                sessionStorage.removeItem("MMHKPLUS_Alliances");

                $selectAlliances.append(
                            $("<option>")
                                .attr("value", "%")
                                .html(""));
                $selectAlliances.append(
                            $("<option>")
                                .attr("value", -1)
                                .html(MMHKPLUS.localize("NONE")));

                alliances.forEach(function(a)
                    {
                        $selectAlliances.append(
                            $("<option>")
                                .attr("value", a[1])
                                .html(a[0]));
                    }
                );
            },
            8
        );  
    },

    _getPlayers : function()
    {
        var $selectPlayers = this.$elem.find("select").eq(1);
        $selectPlayers.empty();
        var filterAlliance = this.$elem.find("select").eq(0).val() || "%";

        if(filterAlliance == "%")
            return;

        sessionStorage.removeItem("MMHKPLUS_Players");
        MMHKPLUS.getElement("Ajax").getPlayers(filterAlliance);
        MMHKPLUS.wait(function()
            {
                return sessionStorage.getItem("MMHKPLUS_Players") != null;   
            },
            function()
            {
                var players = JSON.parse(sessionStorage.getItem("MMHKPLUS_Players")) || [];
                sessionStorage.removeItem("MMHKPLUS_Players");

                $selectPlayers.append(
                    $("<option>")
                        .attr("value", "%")
                        .html(""));

                players.forEach(function(p)
                    {
                        $selectPlayers.append(
                            $("<option>")
                                .attr("value", p[1])
                                .html(p[0]));
                    }
                );
            },
            8
        );
    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
        this.$btnNext = null;
        this.$btnPrevious = null;
        this.$btnBegin = null;
    }
});
MMHKPLUS.SpyReport = MMHKPLUS.ArmiesPanelElement.extend({
    elementType : "SpyReport",
    currentReport : null,

    options : {
        title : "",
        resizable : true,
        opened : false,
        x : "center",
        y : "center",
        w : 700,
        h : 500,
        savePos : true,
        saveWidth : true,
        saveHeight : true,
        saveOpened : false,
        images : MMHKPLUS.URL_IMAGES + "kingdom/",

        troop : "TROOP_SCOUTING",
        city : "CITY_SCOUTING",
        region : "REGION_SCOUTING"
    },

    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.options.title = MMHKPLUS.localize("SPY_REPORT");
        this.$elem = $("<div>");
        this._setupPanel();

        return this;
    },

    onSetup : function()
    {
        this.$elem.dialog(
            {
                minWidth : 700,
                maxWidth : 700,
                minHeight : 350,
            }
        );
    },
    
    onOpen : function()
    {
        this._createView();
    },

    onClose : function()
    {
        this.currentReport = null;
    },

    _createView : function()
    {
        this.$elem.empty();

        if(!this.currentReport)
            return;

        if(this.currentReport.type == this.options.troop)
        {
            this._createTroopScoutingReport();
        }
        else if(this.currentReport.type == this.options.city)
        {
            this._createCityScoutingReport();
        }
        else if(this.currentReport.type == this.options.region)
        {
            this._createRegionScoutingReport();
        }
    },

    loadReport : function(report)
    {
        this.currentReport = report;
        this._createView();
    },

    _createTroopScoutingReport : function()
    {
        this._createReportHeader(true);
        this._createTroopScoutingCityPart();
        this._createTroopScoutingHeroPart();
    },

    _createCityScoutingReport : function()
    {
        this._createReportHeader(false);
        var content = this.currentReport.contentJSON;

        var $table = $("<table>").addClass("MMHKPLUS_100Width").appendTo(this.$elem);
        var $header = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
        var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
        
        var $tdRessources = $("<td style='width:25%;'>").addClass("center").appendTo($line);
        var $tdTroops = $("<td style='width:25%;'>").addClass("center").appendTo($line);
        var $tdMagic = $("<td style='width:25%;'>").addClass("center").appendTo($line);
        var $tdOther = $("<td style='width:25%;'>").addClass("center").appendTo($line);
        
        var ressources = (hasProperty(content, "cityBuildingResourcesEntityList") ? content.cityBuildingResourcesEntityList : []);
        var troops = (hasProperty(content, "cityBuildingTroopsEntityList") ? content.cityBuildingTroopsEntityList : []);
        var magic = (hasProperty(content, "cityBuildingMagicEntityList") ? content.cityBuildingMagicEntityList : []);
        var other = (hasProperty(content, "cityBuildingMixedEntityList") ? content.cityBuildingMixedEntityList : []);   

        /**
         * Ressources
         */
        $("<td style='width:25%;padding:15px;'>")
            .addClass("center")
            .append(
                $("<img>").attr("src", MMHKPLUS.URL_IMAGES + "spy/ressourcesBuildingIcon.png"))
            .appendTo($header);
        ressources.forEach(function(r)
            {
                $("<p>").html(MMHKPLUS.localizeText(r.name)).appendTo($tdRessources);
            }
        );
        
        /**
         * Troupes
         */
        $("<td style='width:25%;padding:15px;'>")
            .addClass("center")
            .append(
                $("<img>").attr("src", MMHKPLUS.URL_IMAGES + "spy/troopBuildingIcon.png"))
            .appendTo($header);
        troops.forEach(function(t)
            {
                $("<p>").html(MMHKPLUS.localizeText(t.name)).appendTo($tdTroops);
            }
        );
        
        /**
         * Magie
         */
        $("<td style='width:25%;padding:15px;'>")
            .addClass("center")
            .append(
                $("<img>").attr("src", MMHKPLUS.URL_IMAGES + "spy/magicBuildingIcon.png"))
            .appendTo($header);
        magic.forEach(function(m)
            {
                $("<p>").html(MMHKPLUS.localizeText(m.name)).appendTo($tdMagic);
            }
        );
        
        /**
         * Autre
         */
        $("<td style='width:25%;padding:15px;'>")
            .addClass("center")
            .append(
                $("<img>").attr("src", MMHKPLUS.URL_IMAGES + "spy/otherBuildingIcon.png"))
            .appendTo($header);
        other.forEach(function(o)
            {
                $("<p>").html(MMHKPLUS.localizeText(o.name)).appendTo($tdOther);
            }
        );
    },

    _createRegionScoutingReport : function()
    {
        this._createReportHeader(false);
        var content = this.currentReport.contentJSON;

        var $table = $("<table>").addClass("MMHKPLUS_100Width").appendTo(this.$elem);
        var $header = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
        var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
        
        var mines = (hasProperty(content, "minesList") ? content.minesList : []);
        mines.forEach(function(m)
            {
                if(hasProperty(m, "mineEntityTagName"))
                    $header.append($("<td style='width:25%;'>").addClass("center").append(MMHKPLUS.getCssSprite("Zone_NEUTRAL", m.mineEntityTagName).addClass("MMHKPLUS_AutoCenter")));
                var $block = $("<td style='width:25%;'>").addClass("center").appendTo($line);
                if(hasProperty(m, "name"))
                    $block.append($("<p>").html(MMHKPLUS.localizeText(m.name)));
                if(hasProperty(m, "upgradeLevel"))
                    $block.append($("<p>").html(MMHKPLUS.localize("LEVEL") + " " + m.upgradeLevel));
                if(hasProperty(m, "improveLevel"))
                    $block.append($("<p>").html(m.improveLevel + " " + MMHKPLUS.localize("IMPROVEMENTS")));
                if(hasProperty(m, "amountProtected"))
                    $block.append($("<p>").html(MMHKPLUS.localize("PROTECTED") + " : " + m.amountProtected + "%"));
            }
        );
    },

    _createReportHeader : function(isTroopScouting)
    {
        isTroopScouting = isTroopScouting || false;
        var self = this;
        var content = this.currentReport.contentJSON;
            
        var $header = $("<div>").css(
            {
                "border-bottom" : "1px solid #FFFFFF",
                "text-align" : "center",
                "color" : "#FFFFFF",
                "padding-bottom" : "10px"
            }
        ).appendTo(this.$elem);
        var $table = $("<table>").addClass("MMHKPLUS_100Width").appendTo($header);
        var $line = $("<tr>").appendTo($table);
        $("<td>")
            .html(MMHKPLUS.localize("PLAYER") +  " : " + content.targetedPlayerName)
            .css(
                {
                    "font-weight" : "bold",
                    "cursor" : "pointer"
                })
            .click(function()
                {
                    MMHKPLUS.openPlayerFrame(content.targetedPlayerId);
                })
            .appendTo($line);
        if(hasProperty(content, "targetedPlayerAlliance"))
        {
            $("<td>")
                .html(MMHKPLUS.localize("ALLIANCE") + " : " + content.targetedPlayerAlliance)
                .appendTo($line);
        }
        var location = "";
        if(hasProperty(content, "targetedHaltX"))
            location = MMHKPLUS.localize("HALT")
        else if(hasProperty(content, "siegedRegionName"))
            location = content.siegedRegionName;
        else if(content.ScoutingLevelStr.indexOf("<location") != -1)
            location = MMHKPLUS.localize("RUIN");
        else
            location = content.cityName;

        var rX = 1;
        var rY = 1;
        if(hasProperty(content, "targetedHaltX"))
        {
            rX = content.targetedHaltX;
            rY = content.targetedHaltY;
        }
        else if(hasProperty(content, "siegedRegionX"))
        {
            rX = content.siegedRegionX;
            rY = content.siegedRegionY;
        }
        else if(content.ScoutingLevelStr.indexOf("<location") != -1)
        {
            var matches = content.ScoutingLevelStr.match(/<location:(\d+),(\d+)>/);
            rX = matches[1];
            rY = matches[2];
        }
        else
        {
            rX = content.targetedRegionNumber % MMHKPLUS.getElement("Player").get("worldSize");
            rY = (((content.targetedRegionNumber - rX) / MMHKPLUS.getElement("Player").get("worldSize")) + 1);
        }

        $("<td/>")
            .append(
                $("<p>")
                    .html(MMHKPLUS.localize("LOCATION") + " : " + location)
                    .click(function()
                        {
                            var x = Math.round(rX);
                            var y = Math.round(rY);
                            
                            MMHKPLUS.centerOn(x, y);
                        })
                    .css(
                        {
                            "font-weight" : "bold",
                            "cursor" : "pointer"
                        }))
            .appendTo($line);
        if(isTroopScouting)
        {
            $("<td>")
                .append(
                    $("<div/>")
                        .html("Jactari").button()
                        .click(self._openJactariFight))
                .appendTo($line);
        }
        $("<br>").appendTo($header);
        if(hasProperty(content, "scoutingLevel"))
        {
            $("<p>").addClass("center")
                .html(MMHKPLUS.localize("SCOUT_LVL") + " : " + MMHKPLUS.localize("SCOUT_LVL" + content.scoutingLevel))
                .appendTo($header);
        }
        if(hasProperty(this.currentReport, "creationDate"))
        {
            var d = new Date(); d.setTime(this.currentReport.creationDate * 1000);
            $("<p>").addClass("center")
                .html(d.toShortFrenchFormat())
                .appendTo($header);
        }
        $("<p>")
            .append()
            .append(MMHKPLUS.localize("IG_PERMALINK") + " : ")
            .append(
                $("<input readonly>")
                    .css("width", "250px")
                    .val("MMHKPLUS_ScoutPL(" + (hasProperty(self.currentReport, "linked_messageId") ? self.currentReport.linked_messageId : self.currentReport.id) + "," + removeDiacritics(self.currentReport.contentJSON.targetedPlayerName) + ")")
                    .click(function() { this.select();}))
            .appendTo($header);
    },

    _createTroopScoutingCityPart : function()
    {
        var content = this.currentReport.contentJSON;
        if(hasProperty(content, "cityName"))
        {
            var $city = $("<div/>").css(
                {
                    "border-bottom" : "1px solid #FFFFFF",
                    "min-height" : "105px"
                }
            ).appendTo(this.$elem);
            
            MMHKPLUS.getCssSprite("City_" + content.cityFactionEntityTagName, "Level" + content.cityDisplayLevel).css(
                {
                    "float" : "left",
                    "margin-left" : "150px",
                    "margin-right" : "15px"
                }
            ).appendTo($city);
            var $infos = $("<div>").css(
                {
                    "padding-top" : "15px",
                    "padding-bottom" : "15px",
                    "color" : "#FFFFFF"
                }
            ).appendTo($city);
            var cityStacks = (hasProperty(content, "regionUnitStackList") ? content.regionUnitStackList : []);
            var cityStacksPower = (cityStacks ? formatNumber(this.getPower(cityStacks)) : "?");
            $("<p>")
                .html(content.cityName + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(" + MMHKPLUS.localize("POWER") + " : " + cityStacksPower + ")")
                .css({"font-weight" : "bold"})
                .appendTo($infos);
            $("<p>")
                .html(MMHKPLUS.localize("FORTIFICATION") + " : " + (hasProperty(content, "cityFortificationName") ? MMHKPLUS.localizeText(content.cityFortificationName) : "?"))
                .appendTo($infos);
            if(cityStacks)
            {
                $infos.append(this._createUnitStackContent(cityStacks));
            }
        }
    },

    _createTroopScoutingHeroPart : function()
    {
        var self = this;
        var content = this.currentReport.contentJSON;
        if(hasProperty(content, "heroList"))
        {
            var heroList = content.heroList;
            var div = $("<div/>").css(
                {
                    "margin-top" : "10px"
                }
            ).appendTo(this.$elem);
            var table = $("<table style='border:collapse;'/>").appendTo(div);
            
            heroList.forEach(function(hero)
                {
                    var line = $("<tr/>").appendTo(table);
                    var heroLeft = $("<td style='border-bottom:1px solid #FFFFFF;'/>").css(
                        {
                            "width" : "300px"
                        }
                    ).appendTo(line);
                    var heroRight = $("<td style='border-bottom:1px solid #FFFFFF;'/>").css(
                        {
                            "width" : "380px"
                        }
                    ).appendTo(line);
                    
                    var avatar = MMHKPLUS.getCssSprite("Hero_" + hero.factionEntityTagName, "Hero" + hero.picture).appendTo(heroLeft);
                    avatar.css(
                        {
                            "margin" : "0",
                            "position" : "relative",
                            "top" : "10px",
                            "left" : "10px"
                        }
                    );
                    var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent(avatar, function($container, tip)
                        {
                            $("<p class='center' style='font-weight:bold;'/>").html((hasProperty(hero, "name") ? hero.name : "")+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + MMHKPLUS.localize("LEVEL") + " " + (hasProperty(hero, "_level") ? hero._level : "?")).appendTo(tip);
                            $("<br/>").appendTo(tip);
                            $("<p/>").html(MMHKPLUS.localize("ARMY_POWER") + " : " + (hasProperty(hero, "attachedUnitStackList") ? formatNumber(self.getPower(hero.attachedUnitStackList)) : "0")).appendTo(tip);
                            $("<div/>").css(
                                {
                                    "background-image" : "url(" + self.options.images + "heroAttack_20.png)",
                                    "padding-left" : "30px",
                                    "width" : "20px",
                                    "height" : "20px",
                                    "color" : "#FFFFFF",
                                    "line-height" : "20px",
                                    "margin": "5px",
                                    "background-repeat" : "no-repeat no-repeat"
                                }
                            ).html((hasProperty(hero, "attack") ? hero.attack : "?")).appendTo(tip);
                            $("<div/>").css(
                                {
                                    "background-image" : "url(" + self.options.images + "heroDefense_20.png)",
                                    "padding-left" : "30px",
                                    "width" : "20px",
                                    "height" : "20px",
                                    "color" : "#FFFFFF",
                                    "line-height" : "20px",
                                    "margin": "5px",
                                    "background-repeat" : "no-repeat no-repeat"
                                }
                            ).html((hasProperty(hero, "defense") ? hero.defense : "?")).appendTo(tip);
                            $("<div/>").css(
                                {
                                    "background-image" : "url(" + self.options.images + "heroMagic_20.png)",
                                    "padding-left" : "30px",
                                    "width" : "20px",
                                    "height" : "20px",
                                    "color" : "#FFFFFF",
                                    "line-height" : "20px",
                                    "margin": "5px",
                                    "background-repeat" : "no-repeat no-repeat"
                                }
                            ).html((hasProperty(hero, "magic") ? hero.magic : "?")).appendTo(tip);
                            $container = null;
                            tip = null;
                        }
                    );     
                    
                    $("<p/>").html((hasProperty(hero, "name") ? hero.name : "")+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + MMHKPLUS.localize("LEVEL") + " " + (hasProperty(hero, "_level") ? hero._level : "?")).css(
                        {
                            "position" : "relative",
                            "top" : "-40px",
                            "left" : "72px",
                            "font-weight" : "bold"
                        }
                    ).click(function() { MMHKPLUS.openDisplayable("AllianceHeroes");MMHKPLUS.getElement("AllianceHeroes")._loadHero(self.currentReport.contentJSON.targetedPlayerId,hero.id);}).css("cursor", "pointer").appendTo(heroLeft);
                    
                    $("<p/>").html((hasProperty(hero, "heroTrainingEntityTagName") ? MMHKPLUS.localize(hero.heroTrainingEntityTagName) : "")).css(
                        {
                            "position" : "relative",
                            "top" : "-40px",
                            "left" : "72px",
                        }
                    ).appendTo(heroLeft);
                    
                    var heroUnitStackList = (hasProperty(hero, "attachedUnitStackList") ? hero.attachedUnitStackList : []);

                    var heroClassList = (hasProperty(hero, "heroClassList") ? hero.heroClassList : []);
                    var heroSpellList = (hasProperty(hero, "spellStackList") ? hero.spellStackList : []);
                    var heroArtefactList = (hasProperty(hero, "artefactList") ? hero.artefactList : []);
                    
                    var tableRight = $("<table style='width:360px'/>").appendTo(heroRight);
                    var classSpellLine = $("<tr/>").appendTo(tableRight);
                    var tableClassSpellLine = $("<table style='width:360px'/>").appendTo($("<td/>").appendTo(classSpellLine));
                    var lineTableClassSpellLine = $("<tr/>").appendTo(tableClassSpellLine);
                    var arteLine = $("<tr/>").appendTo(tableRight);
                    
                    var tdClasses = $("<td style='width:175px'/>").appendTo(lineTableClassSpellLine);
                    var tdSpells = $("<td style='width:120px'/>").appendTo(lineTableClassSpellLine);
                    var tdArte = $("<td style='width:295px'/>").appendTo(arteLine);
                    
                    self._createUnitStackContent(heroUnitStackList).appendTo(heroLeft);
                    self._createClassesContent(heroClassList).appendTo(tdClasses);
                    self._createSpellsContent(heroSpellList).appendTo(tdSpells);
                    self._createArtefactsContent(heroArtefactList).appendTo(tdArte);
                }
            );
        }
    },

    _createUnitStackContent : function(army)
    {
        var $div = $("<div/>").css(
            {
                "margin-top" : "10px"
            }
        );
        var $table = $("<table style='width:" + army.length * 40 + "px;'>").appendTo($div);
        var $line = $("<tr/>").appendTo($table);
        army.forEach(function(stack)
            {
                
                var $block = $("<td>").css(
                    {
                        "width" : "40px",
                        "text-align" : "center",
                        "font-size" : "80%"
                    }
                ).append(MMHKPLUS.getCssSprite("UnitStack_" + stack.factionEntityTagName, stack.tier)).appendTo($line);
                $block.append($("<p/>").html(stack.quantity));
                var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent($block, function($container, $tip)
                    {
                        MMHKPLUS.getCssSprite("UnitStack_types", stack.unitEntityType).css("float", "left").css("margin-right", "10px").appendTo($tip);
                        $("<p/>").html(MMHKPLUS.localizeUnit(stack.factionEntityTagName, stack.tier)).appendTo($tip);
                        $("<br/>").appendTo($tip);
                        $("<p/>").html(MMHKPLUS.localize("UNIT_POWER") + " : " + formatNumber(stack.unitEntityPower)).appendTo($tip);
                        $("<p/>").html(MMHKPLUS.localize("UNIT_AMOUNT") + " : "  + formatNumber(stack.quantity)).appendTo($tip);
                        $("<br/>").appendTo($tip);
                        $("<p/>").html(MMHKPLUS.localize("STACK_POWER") + " : " + formatNumber(stack.quantity * stack.unitEntityPower)).appendTo($tip);
                        
                        $tip = null;
                        $container = null;
                    }
                );
            }
        );
        return $div;
    },

    _createClassesContent : function(classes)
    {
        var div = $("<div/>").css(
            {
                "margin-top" : "10px",
                "background-image" : "url(" + MMHKPLUS.URL_IMAGES + "spy/background_class.png)",
                "width" : "165px",
                "height" : "52px",
                "background-repeat" : "no-repeat no-repeat"
            }
        );
        
        var i = 0;
        classes.forEach(function(classe)
            {
                var img = MMHKPLUS.getCssSprite("HeroClass", classe.heroClassEntityTagName).css(
                    {
                        "position" : "relative",
                        "top" : (4 - 44*i) + "px",
                        "left" : (5 + 54*i) + "px"
                    }
                );
                img.appendTo(div);
                var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent(img, function($container, tip)
                    {
                        $("<p style='font-weight:bold;'>").addClass("center").html(MMHKPLUS.localize(classe.heroClassEntityTagName)).appendTo(tip);
                        $("<br>").appendTo(tip);
                        $("<p>").html(MMHKPLUS.localize(classe.heroClassEntityTagName + "_DESC")).appendTo(tip);
                    }
                );
                i++;
            }
        );
        return div;
    }, 

    _createSpellsContent : function(spells)
    {
        var div = $("<div/>").css(
            {
                "margin-top" : "10px",
                "background-image" : "url(" + MMHKPLUS.URL_IMAGES + "spy/background_spells.png)",
                "width" : "100px",
                "height" : "48px",
                "background-repeat" : "no-repeat no-repeat"
            }
        );
        
        var i = 0;
        spells.forEach(function(spell)
            {
                var img = MMHKPLUS.getCssSprite('SpellStack_' + spell.attachedSpellEntity.magicSchoolEntityTagName, spell.attachedSpellEntity.tagName).css(
                    {
                        "position" : "relative",
                        "top" : (4 - 40*i) + "px",
                        "left" : (5 + 51*i) + "px"
                    }
                );
                img.appendTo(div);
                var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent(img, function($container, tip)
                    {
                        $("<p style='font-weight:bold;'>").addClass("center").html(MMHKPLUS.localize(spell.spellEntityTagName)).appendTo(tip);
                        $("<p>").addClass("center").html(MMHKPLUS.localize("LEVEL") + " " + spell.attachedSpellEntity.magicSchoolLevel).appendTo(tip);
                        $("<br/>").appendTo(tip);
                        $("<p/>").html(MMHKPLUS.localize(spell.spellEntityTagName + "_DESC")).appendTo(tip);
                    }
                );
                i++;
            }
        );
        return div;
    },
        
    _createArtefactsContent : function(artefacts)
    {
        var div = $("<div/>").css(
            {
                "margin-top" : "10px",
                "background-image" : "url(" + MMHKPLUS.URL_IMAGES + "spy/background_artefacts.png)",
                "width" : "350px",
                "height" : "47px",
                "background-repeat" : "no-repeat no-repeat"
            }
        );
        
        var i = 0;
        var correctY = -1;
        var correctX = 12;
        var positions =
            {
                HEAD : {x : 6, y : 6},
                NECKLACE : {x : 49, y : 6},
                RING : {x : 92, y : 6},
                LEFT_HAND : {x : 135, y : 6},
                CHEST : {x : 178, y : 6},
                RIGHT_HAND : {x : 221, y : 6},
                FEET : {x : 264, y : 6},
                CAPE : {x : 307, y : 6}
            };

        artefacts.forEach(function(artefact)
            {
                var name = "" ;
                if (artefact.artefactEntity.artefactType == MMHKPLUS.HOMMK.ARTEFACT_TYPE_REWARD || artefact.artefactType == MMHKPLUS.HOMMK.ARTEFACT_TYPE_REGION_BUILDING_LOOT) 
                {
                    name = "Artefact_REWARD";
                } else 
                {
                    if (artefact.artefactEntity.artefactType == MMHKPLUS.HOMMK.ARTEFACT_TYPE_HEREDITY) 
                    {
                        name = "Artefact_HEREDITY";
                    } else 
                    {
                        if (artefact.artefactEntity.artefactType == "event" || artefact.artefactSetEntityId != null) 
                        {
                            name = "Artefact_SET";
                        } else 
                        {
                            name = "Artefact_COMMON";
                        }
                    }
                }
                var currentTop = i * 36;
                var img = MMHKPLUS.getCssSprite(name, artefact.artefactEntity.tagName).css(
                    {
                        "position" : "relative",
                        "top" : (positions[artefact.artefactEntity.bodyPart].y + correctY - currentTop) + "px",
                        "left" : (positions[artefact.artefactEntity.bodyPart].x + correctX - 13)+ "px"
                    }
                );
                img.appendTo(div);
                var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent(img, function($container, tip)
                    {
                        $("<p style='font-weight:bold;'>").addClass("center").html(artefact.artefactEntity.name).appendTo(tip);
                        $("<br/>").appendTo(tip);
                        var j = 1;
                        while(hasProperty(artefact.artefactEntity, "effect" + j))
                        {
                            $("<p>").html("- " + artefact.artefactEntity["effect" + j].desc).appendTo(tip);
                            j++;
                        }
                    }
                );
                i++;
            }
        );
        return div;
    },

    _openJactariFight : function()
    {
        var self = MMHKPLUS.getElement("SpyReport");
        var $panel = $("<div>").dialog(
            {
                title : "Jactari",
                modal : true,
                resizable : false,
                width : 350,
                height : 210,
                position : ["center", "center"],
                draggable : false,
                close : function() { $(this).empty(); $(this).remove();}
            }
        );

        var myHeroes = MMHKPLUS.getElement("Player").getHeroes() || [];
        var ennemyHeroes = self.currentReport.contentJSON.heroList || [];
        
        var $content = $("<div>").addClass("center").appendTo($panel);
        
        $("<p style='font-weight:bold;font-size:115%;margin-bottom:10px;'>")
            .addClass("center")
            .html(MMHKPLUS.localize("My_HERO"))
            .appendTo($content);
        var $cbMyHeroes = $("<select>").appendTo($content);
        myHeroes.forEach(function(hero)
            {
                $("<option>")
                    .attr("value", hero.content.id)
                    .html(hero.content.name).appendTo($cbMyHeroes);
            }
        );
        var $cbIsAtt = $("<input>").attr("type", "radio").attr("name", "attdef").attr("checked", true);
        var $cbIsDef = $("<input>").attr("type", "radio").attr("name", "attdef").attr("checked", false);
        $("<span style='padding-left:20px;'/>").append($cbIsAtt).append(MMHKPLUS.localize("ATTACKER")).appendTo($content);
        $("<span style='padding-left:10px;'/>").append($cbIsDef).append(MMHKPLUS.localize("DEFENDER")).appendTo($content);
        
        $("<p style='font-weight:bold;font-size:115%;margin-bottom:10px;margin-top:30px;'>")
            .addClass("center")
            .html(MMHKPLUS.localize("ENNEMY_HERO")).appendTo($content);
        var $cbEnnemyHeroes = $("<select>").appendTo($content);
        ennemyHeroes.forEach(function(hero)
            {
                $("<option>")
                    .attr("value", hero.id)
                    .html(hero.name)
                    .appendTo($cbEnnemyHeroes);
            }
        );
        var $cbCityunits = $("<input>").attr("type", "checkbox").attr("checked", false);
        $("<span style='padding-left:20px;'>")
            .append($cbCityunits)
            .append(MMHKPLUS.localize("ATTACK_CITY"))
            .appendTo($content);
        
        $("<p style='margin-top:15px;'>")
            .append(
                $("<div/>").button()
                .css("padding", "5px")
                .html(MMHKPLUS.localize("FIGHT"))
                .click(function()
                    {
                        var myHeroId = $cbMyHeroes.val();
                        var ennemyHeroId = $cbEnnemyHeroes.val();

                        var myHero = MMHKPLUS.getElement("Player").getHero(myHeroId);
                        
                        if(hasProperty(myHero.content, "heroBonuses"))
                        {
                            var artefacts = myHero.content.heroBonuses.artefacts.local || [];
                            var skills = myHero.content.heroBonuses.skills.local || [];
                            
                            self._openJactariWebsite(self, myHeroId, ennemyHeroId, artefacts, skills, $cbCityunits.is(":checked"), $cbIsAtt.is(":checked"));
                        }
                        else
                        {
                            MMHKPLUS.getElement("Ajax").getHeroFrame(myHeroId, function(json)
                                {
                                    var artefacts = json.d["HeroFrame" + myHeroId].equipedArtefacts || [];
                                    var skills = json.d["HeroFrame" + myHeroId].heroSkillList || [];
                                    
                                    self._openJactariWebsite(self, myHeroId, ennemyHeroId, artefacts, skills, $cbCityunits.is(":checked"), $cbIsAtt.is(":checked"));
                                }
                            );
                        }
                    }))
            .appendTo($content);

        $panel.dialog("open");
    },

    _openJactariWebsite : function(self, heroId, ennemyId, artefacts, skills, vsCity, isAtt)
    {
        var fortif = self.currentReport.contentJSON.cityFortificationTagName || null;
        var heroContent = MMHKPLUS.getElement("Player").getHero(heroId).content;
        if(heroContent.attachedUnitStackList && !isAtt)
        {
            heroContent.attachedUnitStackList.sort(function(a, b)
                {
                    return (b.quantity * b.unitEntityPower) - (a.quantity * a.unitEntityPower);
                }
            );
        }
        heroContent.artefactList = artefacts;
        var myHero =
            {
                hero : heroContent,
                bonus : 
                    {
                        skills : skills,
                        artefacts : artefacts,
                        spells : []
                    }
            };
        myHero.skills = myHero.bonus.skills;
        myHero.hero.attachedUnitStackList = MMHKPLUS.getElement("Player").getHero(heroId).unitStackList.getContent().copy();
        var ennemyHero = self._getHero(self.currentReport.contentJSON.heroList, ennemyId);
        if(!ennemyHero)
        {
            ennemyHero = {};
        }
        
        var regionUSL = (hasProperty(self.currentReport.contentJSON, "defenseUnitStackList") ? self.currentReport.contentJSON.defenseUnitStackList : null);
        var enHeroUSL = (hasProperty(ennemyHero, "attachedUnitStackList") ? ennemyHero.attachedUnitStackList : null);
        var originalStackList = ennemyHero.attachedUnitStackList;
        ennemyHero.attachedUnitStackList0 = (vsCity ? regionUSL : enHeroUSL);
        ennemyHero.attachedUnitStackList = ennemyHero.attachedUnitStackList0;
        var ennBonus = 
            {
                skills : [],
                artefacts : (hasProperty(ennemyHero, "artefactList") ? ennemyHero.artefactList : []),
                spells : []
            };
        ennemyHero.bonus = ennBonus;
        ennemyHero.artefactList = ennemyHero.bonus.artefacts;
        sessionStorage.removeItem("MMHKPLUS_Hero");
        MMHKPLUS.getElement("Ajax").getSpyHeroContent(self.currentReport.contentJSON.targetedPlayerId, ennemyId);
        MMHKPLUS.wait(
            function()
            {  
                return sessionStorage.getItem("MMHKPLUS_Hero") != null;
            },
            function()
            {
                var received = JSON.parse(sessionStorage.getItem("MMHKPLUS_Hero"));
                sessionStorage.removeItem("MMHKPLUS_Hero");
                if(received && received.length > 0)
                {
                    ennemyHero.bonus.artefacts = received[11];
                    ennemyHero.bonus.spells = received[10];
                    ennemyHero.bonus.skills = received[9];
                    ennemyHero.artefactList = ennemyHero.bonus.artefacts;
                    ennemyHero._level = received[4];

                    var archetype = received[5];
                    ennemyHero.heroTrainingEntityTagName = self._stringToArchetype(archetype);

                    sessionStorage.removeItem("MMHKPLUS_Hero");
                }
                if(isAtt)
                {
                    MMHKPLUS.getElement("Jactari").permalien(null,myHero,ennemyHero, fortif);
                }
                else
                {
                    MMHKPLUS.getElement("Jactari").permalien(null,ennemyHero, myHero);
                }

                MMHKPLUS.openURL(MMHKPLUS.getElement("Jactari").lastPermalien());
                ennemyHero.attachedUnitStackList = originalStackList;
                myHero = null;
                ennemyHero = null;  
            },
            7
        );      
    },

    _getHero : function(list, id)
    {
        var result = null;
        list.forEach(function(h)
            {
                if(parseInt(h.id) == parseInt(id))
                {
                    result = h;
                }
            }
        );
        return result;
    },

    _stringToArchetype : function(name)
    {
        var languages = ["fr", "en"];
        var newName = removeDiacritics(name).replace(/[ ,‚'"]/g,"").toUpperCase();
        var archetypes = 
            {
                ARCANE_MAGE :           MMHKPLUS.translations.ARCANE_MAGE,
                DISTURBED_WIZARD :      MMHKPLUS.translations.DISTURBED_WIZARD,
                FANATIC_SORCERER :      MMHKPLUS.translations.FANATIC_SORCERER,
                ILLUMINATED_PROTECTOR : MMHKPLUS.translations.ILLUMINATED_PROTECTOR,
                MERCENARY :             MMHKPLUS.translations.MERCENARY,
                OUTLAND_WARRIOR :       MMHKPLUS.translations.OUTLAND_WARRIOR,
                PALADIN :               MMHKPLUS.translations.PALADIN,
                PIT_WARRIOR :           MMHKPLUS.translations.PIT_WARRIOR,
                PROTECTOR :             MMHKPLUS.translations.PROTECTOR,
                WARMAGE :               MMHKPLUS.translations.WARMAGE,
                WARMASTER :             MMHKPLUS.translations.WARMASTER,
                WARRIOR_MAGE :          MMHKPLUS.translations.WARRIOR_MAGE,
                SENACHAL :              MMHKPLUS.translations.SENACHAL,
                SOBERED_WIZARD :        MMHKPLUS.translations.SOBERED_WIZARD,
                EXPLORER :              MMHKPLUS.translations.EXPLORER
            };
        var result = "ARCANE_MAGE";
        for(var i in archetypes)
        {
            languages.forEach(function(l)
                {
                    if(newName == removeDiacritics(archetypes[i][l]).replace(/[ ,‚'"]/g, "").toUpperCase())
                        result = i;
                }
            );
        }
        console.log(result);
        return result;
    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
        //destroy(this.currentReport) ; this.currentReport = null;
    }
});
MMHKPLUS.KingdomActions = MMHKPLUS.PanelElement.extend({
	elementType : "KingdomActions",
	
	options : {
		title : "",
		resizable : true,
		opened : false,
		x : "center",
		y : "center",
		w : 800,
		h : 350,
		savePos : true,
		saveWidth : true,
		saveHeight : true,
		saveOpened : true
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("ACTIONS");
		this.$elem = $("<div>");
		this._setupPanel();
		
		return this;
	},
	
	onSetup : function()
	{
		this.$elem.dialog(
			{
				minWidth : 650,
                minHeight : 120
			}
		);
	},
	
	onOpen : function()
	{
		this._createView();
	},
	
	_createView : function()
	{
		var self = this;
		this.$elem.empty();
		var $table = $("<table>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo(this.$elem);
		$(
			"<tr>\
				<th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("ACTION") + "</th>\
				<th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("END_DATE") + "</th>\
				<th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("END_IN") + "</th>\
			</tr>"
		).appendTo($table);
		
		var actions = MMHKPLUS.getElement("Player").getActions();
		
		actions.forEach(function(action)
			{
				action = action.content;
				var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
				var d1 = new Date(); d1.setTime(action.endDate * 1000);
				var d2 = new Date(); d2.setTime(d1.getTime() - d2.getTime());
				
				$("<td class='MMHKPLUS_KingdomActionsCell'>")
					.append(
						MMHKPLUS.getCssSprite("TimeLineAction", action.type)
							.css({"float" : "left", "margin-right" : "10px"}))
					.append(
						$("<p>")
							.html("<a href='#' class='MMHKPLUS_Link'>" + action.actionDescription + "</a>"))
					.click(function()
						{
							$(".MMHKPLUS_Action_" + action.id).toggleClass("hidden");
						}
					).appendTo($line);
				$("<td class='MMHKPLUS_KingdomActionsCell MMHKPLUS_TextCenter' style='width:170px;'/>")
					.append(
						$("<p>")
							.html(d1.toShortFrenchFormat()))
					.appendTo($line);
				$("<td class='MMHKPLUS_KingdomActionsCell MMHKPLUS_TextCenter' style='width:100px;'/>")
					.append(
						$("<p>")
							.html(d2.countDown()))
					.appendTo($line);
				
				if(hasProperty(action, "attachedSlaveActionList") && action.attachedSlaveActionList.length > 0)
				{
					action.attachedSlaveActionList.forEach(function(slave)
						{
							if((slave.endDate * 1000) > new Date().getTime())
							{
								var $specificContent = "";
								if(slave.type == "CARAVAN_DELIVERY_MOVE")
								{
									$specificContent = $("<div/>");
					    			for(var i = 1; i <=7; i++)
					    			{
					    				$specificContent
					    					.append(
					    							MMHKPLUS.getCssSprite("Ressources", MMHKPLUS.resources[i-1]).addClass("MMHKPLUS_KingdomResourcesImage").css("display", "inline-block").css("margin-bottom", "10px").css("margin-left", "10px"))
					    					.append(
					    						$("<span/>")
					    							.html(formatNumber(parseInt(slave.paramList[i])))
					    							.css("padding-left", "4px").css("top", "-4px").css("position", "relative"));
					    			}
								}
								var $lineS = $("<tr style='color:lightgray;' class='MMHKPLUS_Action_" + action.id + "'/>").appendTo($table);
								var d3 = new Date(); d3.setTime(slave.endDate * 1000 - new Date().getTime());
								var d4 = new Date(); d4.setTime(slave.endDate * 1000);
								$("<td style='padding-left:45px;border-top:1px solid gray;'/>").append($("<p/>").html(slave.typeName).append($specificContent)).appendTo($lineS);
								$("<td style='width:170px;border-top:1px solid gray;' class='MMHKPLUS_TextCenter'/>")
									.html(d4.toShortFrenchFormat())
									.appendTo($lineS);
								$("<td style='width:100px;border-top:1px solid gray;' class='MMHKPLUS_TextCenter'/>")
									.append(
										$("<p/>")
											.html(d3.countDown()))
									.appendTo($lineS);
								$lineS.addClass("hidden");
							}
						}
					);
				}
			}
		);
	},
	
	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
	}
});
MMHKPLUS.KingdomArmies = MMHKPLUS.ArmiesPanelElement.extend({
	elementType : "KingdomArmies",
	
	options : {
		title : "",
		resizable : true,
		opened : false,
		x : "center",
		y : "center",
		w : 800,
		h : 350,
		savePos : true,
		saveWidth : true,
		saveHeight : true,
		saveOpened : true
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("ARMIES");
		this.$elem = $("<div>");
		this._setupPanel();
		
		return this;
	},
	
	onSetup : function()
	{
		this.$elem.dialog(
			{
				minWidth : 650,
                minHeight : 120
			}
		);
	},
	
	onOpen : function()
	{
		this._createView();
	},
	
	_createCellContent : function(units, totalArmies, $parent)
	{
		var self = this;
		units.forEach(function (u)
			{
				if(totalArmies != null)
				{
					self.pushStack(u, totalArmies);
				}
				var $t = $("<div>").addClass("MMHKPLUS_KingdomArmiesCellImage").appendTo($parent);
				var $img = MMHKPLUS.getCssSprite("UnitStack_" + u.factionEntityTagName, u.tier).appendTo($t);
				var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent($img, function($container, $tip)
					{
						MMHKPLUS.getCssSprite("UnitStack_types", u.unitEntityType).appendTo($tip);
						$("<p/>").html(u.unitEntityName).addClass("MMHKPLUS_KingdomArmiesCellTooltipName").appendTo($tip);
						$("<p/>").html(MMHKPLUS.localize("UNIT_POWER") + " : " + formatNumber(u.unitEntityPower)).appendTo($tip);
						$("<p/>").html(MMHKPLUS.localize("UNIT_AMOUNT") + " : "  + formatNumber(u.quantity)).appendTo($tip);
						$("<br/>").appendTo($tip);
						$("<p/>").html(MMHKPLUS.localize("STACK_POWER") + " : " + formatNumber(u.quantity * u.unitEntityPower)).appendTo($tip);
						
						$tip = null;
						$container = null;
					}
				);
							
				$("<div>").addClass("MMHKPLUS_KingdomArmiesCellAmount").html(u.quantity).appendTo($t);
			}
		);
	},
	
	_createView : function()
	{
		this.$elem.empty();
		var self = this;
		var table = $("<table/>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo(this.$elem);
		
		var totalArmies = [];
		var cities = MMHKPLUS.getElement("Player").getCities();
		
		cities.forEach(function(city)
			{
				var armies = [];
				for(var i = 1 ; i < 8; i++)
				{
					var stack = city.completeView_unitStackList.getUnitStackByPosition(i);
					if(stack)
						self.pushStack(stack.content, armies);
				}

				city.content.attachedHeroList.forEach(function (hero)
					{
						if(hasProperty(hero, "attachedUnitStackList"))
                        {
                            MMHKPLUS.getElement("Player").getHero(hero.id).unitStackList.getContent().forEach (function(stack)
                            // hero.attachedUnitStackList.forEach (function(stack)
                                {
                                    self.pushStack(stack, armies);
                                }
                            );
                        }
					}
				);

				var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo(table);
				$("<td>").addClass("MMHKPLUS_KingdomArmiesCell MMHKPLUS_TextCenter")
					.html("<b>" + city.content.cityName + "</b><br/><i>" + formatNumber(self.getPower(armies)) + "</i>")
					.appendTo($line);
				for(var i = 1 ; i < 9 ; i++)
				{
					var units = self.getStacks(i, armies);
					var $tUnits = $("<td>").addClass("MMHKPLUS_KingdomResourcesCell").appendTo($line);
					self._createCellContent(units, totalArmies, $tUnits);
				}
			}
		);
		
		totalArmies.sort(self.sortStack);
		
		var $totalLine = $("<tr>").addClass("MMHKPLUS_100Width").appendTo(table);
		$("<td>").addClass("MMHKPLUS_KingdomArmiesCell MMHKPLUS_TextCenter")
			.html("<b style='text-transform:uppercase;'>" + MMHKPLUS.localize("TOTAL") + "</b><br/><i>" + formatNumber(self.getPower(totalArmies)) + "</i>")
			.appendTo($totalLine);
		for(var i = 1 ; i < 9 ; i++)
		{
			var units = self.getStacks(i, totalArmies);
            var $tUnits = $("<td>").addClass("MMHKPLUS_KingdomResourcesCell").appendTo($totalLine);
			self._createCellContent(units, null, $tUnits);
		}
	},
	
	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
	}
});
MMHKPLUS.KingdomArtifacts = MMHKPLUS.PanelElement.extend({
	elementType : "KingdomArtifacts",
	informations : [],
	
	options : {
		title : "",
		resizable : true,
		opened : false,
		x : "center",
		y : "center",
		w : 800,
		h : 350,
		savePos : true,
		saveWidth : true,
		saveHeight : true,
		saveOpened : true
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("ARTIFACTS");
		this.$elem = $("<div>");
		this._setupPanel();
		
		return this;
	},
	
	onSetup : function()
	{
		this.$elem.dialog(
			{
				minWidth : 700,
                minHeight : 120
			}
		);
	},
	
	onOpen : function()
	{
		this._createView();
	},
	
	_isInInformations : function(id)
	{
		var found = false;
		this.informations.forEach(function(i)
			{
				if(i.id == id)
					found = true;
			}
		);
		return found;
	},
	
	_createView : function()
	{
		var self = this;
		var params = $.map(MMHKPLUS.getElement("Player").getHeroes(), function(elem, i) { return [[elem.content.id]] ; });
		$("<p style='margin-bottom:10px;font-style:italic;'>").addClass("MMHKPLUS_TextCenter MMHKPLUS_100_Width").html(MMHKPLUS.localize("SEARCH_HEROES")).appendTo(self.$elem);
		this.setProgressContent(this, MMHKPLUS.getElement("Ajax").getHeroFrame, params, self._pushHeroInformation, self._getCitiesInformations, self._abort);
	},
	
	_getCitiesInformations : function()
	{
		var self = this;
		var params = $.map(MMHKPLUS.getElement("Player").getCities(), function(elem, i) { return [[elem.content.id]] ; });
		var toRemove = [];
		params.forEach(function(p)
			{
				if(self._isInInformations(p[0]))
					toRemove.push(p);
			}
		);
		toRemove.forEach(function(p)
			{
				params.remove(p);
			}
		);

        if(params.length != 0)
        {
            setTimeout(function() 
                {
                    self.$elem.empty();
                    $("<p style='margin-bottom:10px;font-style:italic;'>").addClass("MMHKPLUS_TextCenter MMHKPLUS_100_Width").html(MMHKPLUS.localize("SEARCH_CITIES")).appendTo(self.$elem);
                    self.setProgressContent(self, MMHKPLUS.getElement("Ajax").getMarketPlaceFrame, params, self._pushCityInformation, self._createViewContent, self._abort);
                },
                100
            );
        }
        else
        {
            self._createViewContent();
        }
		
	},
	
	_pushHeroInformation : function(json)
	{
		var found = false;
		var heroFrame = json.d[Object.keys(json.d)[0]];
		if((hasProperty(heroFrame, "regionArtefacts") && heroFrame.regionArtefacts.length > 0)
			|| (hasProperty(heroFrame, "backpackArtefacts") && heroFrame.backpackArtefacts.length > 0)
			|| (hasProperty(heroFrame, "equipedArtefacts") && heroFrame.equipedArtefacts.length > 0))
		{
			this.informations.forEach(function(i)
				{
					if(i.id == heroFrame.regionId)
					{
						found = true;
						i[heroFrame.id] = heroFrame;
					}
				}
			);
			if(!found)
			{
				var i = { id : heroFrame.regionId || -1 };
				i[heroFrame.id] = heroFrame;
				i.artefacts = (hasProperty(heroFrame, "regionArtefacts") ? heroFrame.regionArtefacts : []);
				this.informations.push(i);
			}
		}
	},
	
	_pushCityInformation : function(json)
	{
		var key = Object.keys(json.d)[0];
		this.informations.push({id : key.replace("MarketPlaceFrame", ""),  artefacts : json.d[key].cityArtefactList || [] });
	},
	
	_createLineContent : function(self, $parent, artefact, name, owner, color)
	{
		var $line = $("<tr style='background-color:" + color + ";'>").addClass("MMHKPLUS_100Width").appendTo($parent);
		$("<td>").addClass("MMHKPLUS_Cell")
			.append(
				MMHKPLUS.getCssSprite(self._getArtefactSpriteName(artefact), artefact.artefactEntity.tagName).addClass("MMHKPLUS_AutoCenter"))
			.appendTo($line);
		var $desc = $("<td>").addClass("MMHKPLUS_Cell")
			.append(
				$("<p>").html("<b>" + artefact.artefactEntity.name + "</b>"))
			.append(
				$("<br>"))
			.appendTo($line);
		var eff = 1;
		while(hasProperty(artefact.artefactEntity, "effect" + eff))
		{
			$("<p style='margin-left=10px'>").addClass("MMHKPLUS_100Width").html("- " + artefact.artefactEntity["effect" + eff].desc).appendTo($desc);
			eff++;
		}
		$desc
			.append(
				$("<br>"))
			.append(
				$("<p style='padding-bottom:5px;'>").html("<i>" + MMHKPLUS.localize("BODY_PART") + " : " + artefact.artefactEntity.bodyPartLoc + "</i>"));
		$("<td>").addClass("MMHKPLUS_Cell center")
			.append(
				$("<p>").html(name))
			.appendTo($line);
		$("<td>").addClass("MMHKPLUS_Cell center")
			.append(
				$("<p>").html(owner))
			.appendTo($line);
	},
	
	_createViewContent : function()
	{
		var self = this;
		this.$elem.empty();
		
		var $table = $("<table>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo(this.$elem);
		$("<tr>\
				<th class='MMHKPLUS_CellHeader' style='width:55px;'>" + "" + "</th>\
				<th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("ARTIFACT") + "</th>\
				<th class='MMHKPLUS_CellHeader' style='width:120px;'>" + MMHKPLUS.localize("CITY") + "</th>\
				<th class='MMHKPLUS_CellHeader' style='width:120px;'>" + MMHKPLUS.localize("OWNER") + "</th>\
			</tr>"
		).appendTo($table);
		
		
		this.informations.forEach(function(info)
			{
				var city = MMHKPLUS.getElement("Player").getCity(info.id);
				var name = "?";
				if(city)
				{
					name = city.content.cityName;
				}
				
				info.artefacts.forEach(function(artefact)
					{
						self._createLineContent(self, $table, artefact, name, name, "rgba(50, 205, 50, 0.25)");
					}
				);
				
				for(var i in info)
				{
					if(i != "artefacts" && i != "id")
					{
						var equiped = info[i].equipedArtefacts || [];
						var backpack = info[i].backpackArtefacts || [];
						
						equiped.forEach(function(artefact)
							{
								self._createLineContent(self, $table, artefact, name, info[i].name + "<br/>(" + MMHKPLUS.localize("EQUIPPED") + ")", "rgba(166, 42, 42, 0.25)");
							}
						);
						backpack.forEach(function(artefact)
							{
								var binded = "";
								if(hasProperty(artefact, "binded") && artefact.binded == 1 && (!hasProperty(artefact, "unbindDate") || artefact.unbindDate * 1000 - $.now() > 0))
								{
									binded += "<br/>";
									var d = new Date(); d.setTime(artefact.unbindDate * 1000 - d.getTime());
									binded += MMHKPLUS.localize("UNBIND_IN") + " " + d.countDown();
								}
								self._createLineContent(self, $table, artefact, name, info[i].name + "<br/>(" + MMHKPLUS.localize("BACKPACK") + ")" + binded, "rgba(0, 0, 156, 0.25)");
							}
						);
					}
				}
			}
		);
		
		this.informations = null;
		this.informations = [];
	},
	
	_getArtefactSpriteName : function(artefact)
	{
		var name = "" ;
		if (artefact.artefactEntity.artefactType == MMHKPLUS.HOMMK.ARTEFACT_TYPE_REWARD || artefact.artefactType == MMHKPLUS.HOMMK.ARTEFACT_TYPE_REGION_BUILDING_LOOT) 
		{
			name = "Artefact_REWARD";
		} else 
		{
			if (artefact.artefactEntity.artefactType == MMHKPLUS.HOMMK.ARTEFACT_TYPE_HEREDITY) 
			{
				name = "Artefact_HEREDITY";
			} else 
			{
				if (artefact.artefactEntity.artefactType == "event" || artefact.artefactSetEntityId != null) 
				{
					name = "Artefact_SET";
				} else 
				{
					name = "Artefact_COMMON";
				}
			}
		}
		return name;
	},
	
	_abort : function()
	{
		this.informations = null;
		this.informations = [];
	},
	
	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
		destroy(this.informations); this.informations = null;
	}
});
MMHKPLUS.KingdomCitiesBuildings = MMHKPLUS.PanelElement.extend({
    elementType : "KingdomCitiesBuildings",
    buildings : [],
    
    options : {
        title : "",
        resizable : true,
        opened : false,
        x : "center",
        y : "center",
        w : 800,
        h : 350,
        savePos : true,
        saveWidth : true,
        saveHeight : true,
        saveOpened : true
    },
    
    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.options.title = MMHKPLUS.localize("CITIES_BUILDINGS");
        this.$elem = $("<div>");
        this._setupPanel();
        
        return this;
    },
    
    onSetup : function()
    {
        this.$elem.dialog(
            {
                minWidth : 500,
                minHeight : 170
            }
        );
    },
    
    onOpen : function()
    {
        this._createView();
    },

    onClose : function()
    {
        this.buildings = null;
        this.buildings = [];
    },
    
    _createView : function()
    {
        var self = this;
        var params = $.map(MMHKPLUS.getElement("Player").getCities(), function(elem, i) { return [[elem.content.id]] ; });
        this.setProgressContent(this, MMHKPLUS.getElement("Ajax").getCityBuildings, params, self._pushCityBuilding, self._createViewContent, self._abort);
    },

    _pushCityBuilding : function(json)
    {
        var key = Object.keys(json.d)[0];
        this.buildings.push(
            {
                id : json.d[key].id || -1,
                buildings : json.d[key].builtCityBuildingEntityList || []
            }
        );
    },

    _createViewContent : function()
    {
        var self = this;
        var $table = $("<table>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo(this.$elem);
        $("<tr>\
                <th class='MMHKPLUS_CellHeader' style='width:17%;'>" + MMHKPLUS.localize("CITY") + "</th>\
                <th class='MMHKPLUS_CellHeader' style='width:17%;'>" + MMHKPLUS.localize("SUPPORT") + "</th>\
                <th class='MMHKPLUS_CellHeader' style='width:17%;'>" + MMHKPLUS.localize("RECRUITMENT") + "</th>\
                <th class='MMHKPLUS_CellHeader' style='width:17%;'>" + MMHKPLUS.localize("DEFENSE") + "</th>\
                <th class='MMHKPLUS_CellHeader' style='width:17%;'>" + MMHKPLUS.localize("MAGICAL") + "</th>\
                <th class='MMHKPLUS_CellHeader' style='width:17%;'>" + MMHKPLUS.localize("OTHER") + "</th>\
            </tr>"
        ).appendTo($table);

        this.buildings.sort(function(a, b) { return MMHKPLUS.getElement("Player").getCity(a.id).content.captureDate - MMHKPLUS.getElement("Player").getCity(b.id).content.captureDate;});
        this.buildings.forEach(function(c)
            {
                var city = MMHKPLUS.getElement("Player").getCity(c.id);
                var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);

                $("<td style='width:17%;'>").addClass("MMHKPLUS_Cell")
                        .append(
                            MMHKPLUS.getCssSprite("City_" + city.content.factionEntityTagName, "Level" + city.content.displayLevel).addClass("MMHKPLUS_AutoCenter"))
                        .append(
                            $("<p style='margin-bottom:10px;'>").addClass("MMHKPLUS_TextCenter").html(city.content.cityName))
                        .appendTo($line);

                var $tdSupport = $("<td style='width:17%;'>").addClass("MMHKPLUS_Cell").appendTo($line);
                var $tdRecruit = $("<td style='width:17%;'>").addClass("MMHKPLUS_Cell").appendTo($line);
                var $tdDefense = $("<td style='width:17%;'>").addClass("MMHKPLUS_Cell").appendTo($line);
                var $tdMagical = $("<td style='width:17%;'>").addClass("MMHKPLUS_Cell").appendTo($line);
                var $tdOther = $("<td style='width:17%;'>").addClass("MMHKPLUS_Cell").appendTo($line);

                self._getBuildings(c.buildings, "HALL").forEach(function(b)
                    {
                        $tdSupport.append(
                            $("<p>")
                                .addClass("MMHKPLUS_TextCenter")
                                .html(b.name));
                    }
                );
                self._getBuildings(c.buildings, "SUPPORT").forEach(function(b)
                    {
                        $tdSupport.append(
                            $("<p>")
                                .addClass("MMHKPLUS_TextCenter")
                                .html(b.name));
                    }
                );
                self._getBuildings(c.buildings, "RECRUITMENT").forEach(function(b)
                    {
                        $tdRecruit.append(
                            $("<p>")
                                .addClass("MMHKPLUS_TextCenter")
                                .html(b.name));
                    }
                );
                self._getBuildings(c.buildings, "DEFENSE").forEach(function(b)
                    {
                        $tdDefense.append(
                            $("<p>")
                                .addClass("MMHKPLUS_TextCenter")
                                .html(b.name));
                    }
                );
                self._getBuildings(c.buildings, "MAGICAL").forEach(function(b)
                    {
                        $tdMagical.append(
                            $("<p>")
                                .addClass("MMHKPLUS_TextCenter")
                                .html(b.name));
                    }
                );
                self._getOtherBuildings(c.buildings).forEach(function(b)
                    {
                        $tdOther.append(
                            $("<p>")
                                .addClass("MMHKPLUS_TextCenter")
                                .html(b.name));
                    }
                );
            }
        );
    },

    _getBuildings : function(buildings, type)
    {
        var result = [];
        buildings.forEach(function(b)
            {
                if(b.buildingTypeEntityTagName == type)
                    result.push(b);
            }
        );
        return result;
    },

    _getOtherBuildings : function(buildings)
    {
        var result = [];
        buildings.forEach(function(b)
            {
                if(b.buildingTypeEntityTagName != "HALL" && b.buildingTypeEntityTagName != "SUPPORT" && b.buildingTypeEntityTagName != "RECRUITMENT" 
                    && b.buildingTypeEntityTagName != "DEFENSE" && b.buildingTypeEntityTagName != "MAGICAL")
                    result.push(b);
            }
        );
        return result;
    },

    _abort : function()
    {
        this.buildings = null;
        this.buildings = [];
    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
        destroy(this.buildings); this.buildings = null;
    }
});
MMHKPLUS.KingdomCitiesSpells = MMHKPLUS.PanelElement.extend({
	elementType : "KingdomCitiesSpells",
	cities : [],
	
	options : {
		title : "",
		resizable : true,
		opened : false,
		x : "center",
		y : "center",
		w : 800,
		h : 350,
		savePos : true,
		saveWidth : true,
		saveHeight : true,
		saveOpened : true
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("CITIES_SPELLS");
		this.$elem = $("<div>");
		this._setupPanel();
		
		return this;
	},
	
	onSetup : function()
	{
		this.$elem.dialog(
			{
				minWidth : 500,
                minHeight : 170
			}
		);
	},
	
	onOpen : function()
	{
		this._createView();
	},
	
	_createView : function()
	{
		var self = this;
		var params = $.map(MMHKPLUS.getElement("Player").getCities(), function(elem, i) { return [[elem.content.id]] ; });
		this.setProgressContent(this, MMHKPLUS.getElement("Ajax").getMagicGuildFrame, params, self._pushCityGuild, self._createViewContent, self._abort);
	},

	_pushCityGuild : function(json)
	{
		var key = Object.keys(json.d)[0];
		this.cities.push(
			{
				id : json.d[key].id || -1,
				captureDate : MMHKPLUS.getElement("Player").getCity(json.d[key].id).content.captureDate || 0,
				spellsList : json.d[key].spellStackList || []
			}
		);
	},
	
	getMagicSchools : function(spellsList)
	{
		var result = [];
		spellsList.forEach(function(s)
			{
				if(result.indexOf(s.attachedSpellEntity.magicSchoolEntityTagName) == -1)
					result.push(s.attachedSpellEntity.magicSchoolEntityTagName);
			}
		);
		return result;
	},
	
	getSpell : function(magicSchool, level, spellsList)
	{
		var spell = null;
		spellsList.forEach(function(s)
			{
				if(level == 5 && s.attachedSpellEntity.magicSchoolLevel == level)
					spell = s
				else if(s.attachedSpellEntity.magicSchoolEntityTagName == magicSchool && s.attachedSpellEntity.magicSchoolLevel == level)
					spell = s;
			}
		);
		
		if(spell == null)
			return "";
		
		var $result = MMHKPLUS.getCssSprite("SpellStack_" + spell.attachedSpellEntity.magicSchoolEntityTagName, spell.spellEntityTagName).addClass("MMHKPLUS_AutoCenter");
		var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent($result, function($container, $tip)
			{
				$("<p>").addClass("MMHKPLUS_TextCenter")
					.html("<b>" + spell.spellEntityName + " - " + MMHKPLUS.localize("LEVEL") + " " + spell.attachedSpellEntity.magicSchoolLevel + "</b>")
					.appendTo($tip);
				$("<br>").appendTo($tip);
				$("<p>").addClass("MMHKPLUS_TextCenter")
					.html(spell.attachedSpellEntity.description)
					.appendTo($tip);
				
				$tip = null;
				$container = null;
			}
		);
		return $result;
	},
	
	_createTableContent : function(self, $parent, spellsList)
	{
		var $firstLine = $parent.find("tr");
		var $secondLine = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($parent);
		
		var magicSchools = self.getMagicSchools(spellsList);
		
		for(var i = 0 ; i < 4 ; i++)
		{
			$("<td style='width:20%; padding:10px;'>")
				.append(self.getSpell(magicSchools[0], i+1, spellsList))
				.appendTo($firstLine);
		}
		for(var i = 0 ; i < 4 ; i++)
		{
			$("<td style='width:20%; padding:10px;'>")
				.append(self.getSpell(magicSchools[1], i+1, spellsList))
				.appendTo($secondLine);
		}
		$("<td style='width:20%; padding:10px;' rowspan='2'>")
			.append(self.getSpell("", 5, spellsList))
			.appendTo($firstLine);
	},
	
	_createViewContent : function()
	{
		var self = this;
		this.cities.sort(function(a, b) { return a.captureDate - b.captureDate ; });
		
		this.cities.forEach(function(c)
			{
				if(c.spellsList.length > 0)
				{
					var city = MMHKPLUS.getElement("Player").getCity(c.id);
					
					var $table = $("<table style='background-color:rgba(0, 255, 255, 0.05);'>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo(self.$elem);
					var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
					$("<td style='width:20%;' rowspan='2'>").addClass("MMHKPLUS_Cell").css({border : "none"})
						.append(
							MMHKPLUS.getCssSprite("City_" + city.content.factionEntityTagName, "Level" + city.content.displayLevel).addClass("MMHKPLUS_AutoCenter"))
						.append(
							$("<p style='margin-bottom:10px;'>").addClass("MMHKPLUS_TextCenter").html(city.content.cityName))
						.appendTo($line);
					
					self._createTableContent(self, $table, c.spellsList);
					
					self.$elem.append($("<br/><br/>"));
				}
			}
		);

		this.cities = null;
		this.cities = [];
	},
	
	_abort : function()
	{
		this.cities = null;
		this.cities = [];
	},
	
	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
		destroy(this.cities); this.cities = null;
	}
});
MMHKPLUS.KingdomHeroes = MMHKPLUS.PanelElement.extend({
	elementType : "KingdomHeroes",
	heroes : [],
	
	options : {
		title : "",
		resizable : true,
		opened : false,
		x : "center",
		y : "center",
		w : 800,
		h : 350,
		savePos : true,
		saveWidth : true,
		saveHeight : true,
		saveOpened : true,
		images : MMHKPLUS.URL_IMAGES + "kingdom/"
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("HEROES");
		this.$elem = $("<div>");
		this._setupPanel();
		
		return this;
	},
	
	onSetup : function()
	{
		this.$elem.dialog(
			{
				minWidth : 700,
                minHeight : 120
			}
		);
	},
	
	onOpen : function()
	{
		this._createView();
	},
	
	_createView : function()
	{
		var self = this;
		var params = $.map(MMHKPLUS.getElement("Player").getHeroes(), function(elem, i) { return [[elem.content.id]] ; });
		this.setProgressContent(this, MMHKPLUS.getElement("Ajax").getHeroFrame, params, self._pushHero, self._createViewContent, self._abort);    
	},
	
	_pushHero : function(json)
	{
		var key = Object.keys(json.d)[0];
		this.heroes.push(json.d[key]);
	},
	
	_createHeroStatContent : function(self, $parent, hero)
	{
		var bonusAtt = 0; var bonusDef = 0; var bonusMag = 0;
		hero.equipedArtefacts.forEach(function(a)
			{
				if(hasProperty(a, "defenseBonusAdd"))
					bonusDef += a.defenseBonusAdd;
				if(hasProperty(a, "attackBonusAdd"))
					bonusAtt += a.attackBonusAdd;
				if(hasProperty(a, "magicBonusAdd"))
					bonusMag += a.magicBonusAdd;
					
				if(hasProperty(a, "defenseBonusMult"))
					bonusDef += hero.defense * a.defenseBonusMult / 100;
				if(hasProperty(a, "attackBonusMult"))
					bonusAtt += hero.attack * a.attackBonusMult / 100;
				if(hasProperty(a, "magicBonusMult"))
					bonusMag += hero.magic * a.magicBonusMult / 100;
			}
		);
		
		$("<div>").addClass("MMHKPLUS_KingdomHeroesStats").css(
			{
				"background-image" : "url(" + self.options.images + "heroAttack_20.png)",
			}
		).html(parseInt(hero.attack + bonusAtt)).appendTo($parent);
		$("<div>").addClass("MMHKPLUS_KingdomHeroesStats").css(
			{
				"background-image" : "url(" + self.options.images + "heroDefense_20.png)",
			}
		).html(parseInt(hero.defense + bonusDef)).appendTo($parent);
		$("<div>").addClass("MMHKPLUS_KingdomHeroesStats").css(
			{
				"background-image" : "url(" + self.options.images + "heroMagic_20.png)",
			}
		).html(parseInt(hero.magic + bonusMag)).appendTo($parent);
		
		if(hasProperty(hero, "effectListAndOrigin"))
		{
			var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent($parent, function($container, $tip)
				{
					var isFirst = true;
					hero.effectListAndOrigin.forEach(function(effect)
						{
							if(hasProperty(effect, "effects") && effect.effects.length > 0)
							{
								if(!isFirst)
								{
									$("<br>").appendTo($tip);
								}
								$("<p>").addClass("MMHKPLUS_TextCenter").html((effect.id == -1 ? MMHKPLUS.localize("ARTIFACTS") : effect.name)).appendTo($tip);
								$("<br>").appendTo($tip);
								effect.effects.forEach(function(e)
									{
										$("<p style='margin-left=10px'>").addClass("MMHKPLUS_100Width").html("- " + e.effectName).appendTo($tip);
									}
								);
								
								isFirst = false;
							}
						}
					);
					$tip = null;
					$container = null;
				}
			);
		}
	},
	
	_createClassContent : function(self, $parent, hero)
	{
		var $comp_img = $("<img>")
			.attr("src", self.options.images + "skills" + (hasProperty(hero, "learntClasses") && hero.learntClasses.length > 0 ? '' : "_disable") + ".png")
			.addClass("MMHKPLUS_KingdomHeroesCompImage")
			.appendTo($parent);
		if(hasProperty(hero, "learntClasses") && hero.learntClasses.length > 0)
		{
			var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent($comp_img, function($container, $tip)
				{
					var $skillsTable = $("<table>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo($tip);
					hero.learntClasses.forEach(function(classe)
						{
							var $line = $("<tr>").appendTo($skillsTable);
							var $classImgBlock = $("<td>").appendTo($line);
							MMHKPLUS.getCssSprite("HeroClass", classe.heroClassEntityTagName).addClass("MMHKPLUS_AutoCenter").appendTo($classImgBlock);
							$("<p>").addClass("center").html(classe.heroClassEntityName).appendTo($classImgBlock);
							var $classCompBlock = $("<td style='padding:5px';/>").appendTo($line);
							var $compTable = $("<table>").addClass("MMHKPLUS_KingdomHeroesSkillsTable").appendTo($classCompBlock);
							classe.skillList.forEach(function(skill)
								{
									if(skill.level > 0)
									{
										var $skillLine = $("<tr>").appendTo($compTable);
										var $skillImgBlock = $("<td>").addClass("MMHKPLUS_KingdomHeroesSkillImage").appendTo($skillLine);
										MMHKPLUS.getCssSprite("HeroClassSkill", skill.heroClassSkillEntityTagName).addClass("MMHKPLUS_AutoCenter").appendTo($skillImgBlock);
										$("<p>").addClass("center").html(skill.heroClassSkillEntityName + " (" + skill.level + ")").appendTo($skillImgBlock);
										$("<td>").addClass("MMHKPLUS_Cell").css({maxWidth : "350px"}).html(skill.currentLevelEffect.desc).appendTo($skillLine);
									}
								}
							);
						}
					);
					$tip = null;
					$container = null;
				}
			);
		}
	},
	
	_createSpellContent : function(self, $parent, hero)
	{
		var $spells_img = $("<img>")
			.attr("src", self.options.images + "spells" + (hasProperty(hero, "magicAllowed") && hero.magicAllowed ? "" : "_disable") + ".png")
			.addClass("MMHKPLUS_KingdomHeroesCompImage")
			.appendTo($parent);
		if(hasProperty(hero, "magicAllowed") && hero.magicAllowed && hasProperty(hero, "spellBookSpellStackList") && hero.spellBookSpellStackList.length > 0)
		{
			var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent($spells_img, function($container, $tip)
				{
					var $spellTable = $("<table>").addClass("MMHKPLUS_100Width").appendTo($tip);
					hero.spellBookSpellStackList.forEach(function(s)
						{
							var $line = $("<tr>").appendTo($spellTable);
							var $spellImgBlock = $("<td>").addClass("MMHKPLUS_Cell").appendTo($line);
							MMHKPLUS.getCssSprite("SpellStack_" + s.attachedSpellEntity.magicSchoolEntityTagName, s.attachedSpellEntity.tagName)
								.addClass("MMHKPLUS_AutoCenter")
								.appendTo($spellImgBlock);
							$("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_KingdomHeroesSpellNameCell center").html(s.spellEntityName).appendTo($line);
							$("<td>").addClass("MMHKPLUS_Cell").html(s.spellEffectText).appendTo($line);
						}
					);
					$tip = null;
					$container = null;
				}
			);
		}
	},
	
	_createArtefactContent : function(self, $parent, hero)
	{
		var $bg = $("<div/>").addClass("MMHKPLUS_KingdomHeroesArtifactsBg").appendTo($parent);
		var num = 0;
		hero.equipedArtefacts.forEach(function(artefact)
			{
				var $arteDiv = self._createArtefactImage(artefact, num).appendTo($bg);
				var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent($arteDiv, function($container, $tip)
					{
						$("<p>").addClass("MMHKPLUS_100Width center").html(artefact.artefactEntity.name).appendTo($tip);
						$("<br>").appendTo($tip);
						var eff = 1;
						while(hasProperty(artefact.artefactEntity, "effect" + eff))
						{
							$("<p style='margin-left=10px'>").addClass("MMHKPLUS_100Width").html("- " + artefact.artefactEntity["effect" + eff].desc).appendTo($tip);
							eff++;
						}
						$("<br>").appendTo($tip);
						$("<p>").addClass("MMHKPLUS_100Width center").html("<i>" + MMHKPLUS.localize("BODY_PART") + " : " + artefact.artefactEntity.bodyPartLoc + "</i>").appendTo($tip);
						
						$tip = null;
						$container = null;
					}
				);
				num++; 
			}
		);
	},
	
	_createArtefactImage : function(artefact, num)
	{
		var name = "" ;
		if (artefact.artefactEntity.artefactType == MMHKPLUS.HOMMK.ARTEFACT_TYPE_REWARD || artefact.artefactType == MMHKPLUS.HOMMK.ARTEFACT_TYPE_REGION_BUILDING_LOOT) 
		{
			name = "Artefact_REWARD";
		} else 
		{
			if (artefact.artefactEntity.artefactType == MMHKPLUS.HOMMK.ARTEFACT_TYPE_HEREDITY) 
			{
				name = "Artefact_HEREDITY";
			} else 
			{
				if (artefact.artefactEntity.artefactType == "event" || artefact.artefactSetEntityId != null) 
				{
					name = "Artefact_SET";
				} else 
				{
					name = "Artefact_COMMON";
				}
			}
		}
		var $image = MMHKPLUS.getCssSprite(name, artefact.artefactEntity.tagName);
		var correctY = -1;
		var correctX = 12;
		var currentTop = num * 36;
		var positions =
			{
				HEAD : {x : 5, y : 6},
				NECKLACE : {x : 48, y : 6},
				RING : {x : 91, y : 6},
				LEFT_HAND : {x : 134, y : 6},
				CHEST : {x : 177, y : 6},
				RIGHT_HAND : {x : 221, y : 6},
				FEET : {x : 264, y : 6},
				CAPE : {x : 307, y : 6}
			};
		$image.css(
			{
				"position" : "relative",
				"top" : (positions[artefact.artefactEntity.bodyPart].y + correctY - currentTop) + "px",
				"left" : (positions[artefact.artefactEntity.bodyPart].x + correctX - 41)+ "px"
			}
		);
		return $image;
	},
	
	_createViewContent : function()
	{
		this.heroes.sort(function(a, b)
			{
				return b._level - a._level;
			}
		);

		var self = this;
		this.$elem.empty();
		var $table = $("<table>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo(this.$elem);
		
		this.heroes.forEach(function(hero)
			{
				var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
		
				var $heroAvatar = $("<td>").addClass("MMHKPLUS_KingdomArmiesCell MMHKPLUS_TextCenter").appendTo($line);
				MMHKPLUS.getCssSprite("Hero_" + hero.factionEntityTagName, "Hero" + hero.picture)
					.addClass("MMHKPLUS_AutoCenter")
					.appendTo($heroAvatar);
				$("<p>").html(hero.name).appendTo($heroAvatar);
				$("<p>").html(MMHKPLUS.localize("LEVEL") + " " + hero._level).appendTo($heroAvatar);
				
				var $stats = $("<td>").addClass("MMHKPLUS_Cell").appendTo($line);
				self._createHeroStatContent(self, $stats, hero);
				
				var $comp = $("<td>").addClass("MMHKPLUS_Cell").appendTo($line);
				self._createClassContent(self, $comp, hero);

				var $spells = $("<td>").addClass("MMHKPLUS_Cell").appendTo($line);
				self._createSpellContent(self, $spells, hero);
				
				var $arte = $("<td>").addClass("MMHKPLUS_Cell").appendTo($line);
				self._createArtefactContent(self, $arte, hero);
				
			}
		);

		
		this.heroes = null;
		this.heroes = [];
	},
	
	_abort : function()
	{
		this.heroes = null;
		this.heroes = [];
	},
	
	
	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
		destroy(this.heroes); this.heroes = null;
	}
});
MMHKPLUS.KingdomHeroesSpells = MMHKPLUS.PanelElement.extend({
	elementType : "KingdomHeroesSpells",
	heroes : [],
	
	options : {
		title : "",
		resizable : true,
		opened : false,
		x : "center",
		y : "center",
		w : 800,
		h : 350,
		savePos : true,
		saveWidth : true,
		saveHeight : true,
		saveOpened : true
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("HEROES_SPELLS");
		this.$elem = $("<div>");
		this._setupPanel();
		
		return this;
	},
	
	onSetup : function()
	{
		this.$elem.dialog(
			{
				minWidth : 650,
                minHeight : 120
			}
		);
	},
	
	onOpen : function()
	{
		this._createView();
	},
	
	_createView : function()
	{
		var self = this;
		var params = $.map(MMHKPLUS.getElement("Player").getHeroes(), function(elem, i) { return (hasProperty(elem.content, "isWizard") && elem.content.isWizard ? [[elem.content.id]] : null);  });
		params.remove([]);
		this.setProgressContent(this, MMHKPLUS.getElement("Ajax").getHeroFrame, params, self._pushHero, self._createViewContent, self._abort);
	},
	
	_pushHero : function(json)
	{
		this.heroes.push(json.d[Object.keys(json.d)[0]]);
	},
	
	_createViewContent : function()
	{
		var self = this;
		this.$elem.empty();
		var isFirst = true;
		this.heroes.sort(function(a, b) { return b._level - a._level;});
		
		this.heroes.forEach(function(hero)
			{
				if(hasProperty(hero, "magicAllowed") && hero.magicAllowed && hasProperty(hero, "spellBookSpellStackList") && hero.spellBookSpellStackList.length > 0)
				{
					var $table = $("<table style='background-color:rgba(0, 255, 255, 0.05);'>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo(self.$elem);
					var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
					$("<td style='width:10%;'>").addClass("MMHKPLUS_Cell").css({border : "none"})
						.append(
							MMHKPLUS.getCssSprite("Hero_" + hero.factionEntityTagName, "Hero" + hero.picture).addClass("MMHKPLUS_AutoCenter"))
						.append(
							$("<p>").addClass("MMHKPLUS_TextCenter").html(hero.name))
						.append(
							$("<p>").addClass("MMHKPLUS_TextCenter").html(MMHKPLUS.localize("LEVEL") + " " + hero._level))
						.appendTo($line);
					var $iTable = $("<table>").addClass("MMHKPLUS_100Width MMHKPLUS_Table")
						.appendTo(
							$("<td style='width:90%;'>").addClass("MMHKPLUS_Cell").css({border : "none"})
								.appendTo($line));
					
					$("<tr>\
							<th class='MMHKPLUS_CellHeader' style='width:55px;'></th>\
							<th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("SPELL") + "</th>\
							<th class='MMHKPLUS_CellHeader' style='width:100px;'>" + MMHKPLUS.localize("READY_IN") + "</th>\
							<th class='MMHKPLUS_CellHeader' style='width:100px;'>" + MMHKPLUS.localize("READY") + "</th>\
						</tr>"
					).appendTo($iTable);
					
								
					hero.spellBookSpellStackList.forEach(function(spell)
						{
							var $iLine = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($iTable);
							$("<td style='width:55px;'>").addClass("MMHKPLUS_Cell")
								.append(
									MMHKPLUS.getCssSprite("SpellStack_" + spell.attachedSpellEntity.magicSchoolEntityTagName, spell.attachedSpellEntity.tagName)
										.addClass("MMHKPLUS_AutoCenter"))
								.appendTo($iLine);
							$("<td>").addClass("MMHKPLUS_Cell")
								.append(
									$("<p>").html("<b>" + spell.spellEntityName + "</b>"))
								.append(
									$("<br>"))
								.append(
									$("<p style='padding-bottom:7px;'>").html(spell.spellEffectText))
								.appendTo($iLine);
								
							var cooldownDate = new Date();
							cooldownDate.setTime(spell.cooldownDate * 1000);
							if(spell.hasOwnProperty('cooldownDate') && cooldownDate > $.now())
							{
								var d = new Date();
								var d2 = new Date();
								d.setTime(spell.cooldownDate * 1000);
								d2.setTime(spell.cooldownDate * 1000 - d2.getTime());
								$("<td style='width:100px;'>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
									.append(
										$("<p>").html(d2.countDown()))
									.appendTo($iLine);
								$("<td style='width:100px;'>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
									.append(
										$("<p>").html(d.toShortFrenchFormat().replace(" ", "<br/>")))
									.appendTo($iLine);
							}
							else
							{
								$("<td style='width:100px;'>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
									.append(
										$("<p>").html(MMHKPLUS.localize("READY")))
									.appendTo($iLine);
								$("<td style='width:100px;'>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
									.append(
										$("<p>").html(MMHKPLUS.localize("READY")))
									.appendTo($iLine);
							}
						}
					);
					self.$elem.append($("<br/><br/>"));
					isFirst = false;
				}
			}
		);
		
		this.heroes = null;
		this.heroes = [];
	},
	
	_abort : function()
	{
		this.heroes = null;
		this.heroes = [];
	},
	
	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
		destroy(this.heroes); this.heroes = null;
	}
});
MMHKPLUS.KingdomRecruitment = MMHKPLUS.ArmiesPanelElement.extend({
	elementType : "KingdomRecruitment",
	cities : [],
	
	options : {
		title : "",
		resizable : true,
		opened : false,
		x : "center",
		y : "center",
		w : 800,
		h : 350,
		savePos : true,
		saveWidth : true,
		saveHeight : true,
		saveOpened : true,
		images : MMHKPLUS.URL_IMAGES + "ressources/"
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("RECRUITMENT");
		this.$elem = $("<div>");
		this._setupPanel();
		
		return this;
	},
	
	pushStack : function(stack, armies)
	{
		var rank = -1; var i = 0;
		armies.forEach(function(army)
			{
				if(army.tier == stack.tier && army.factionEntityTagName == stack.factionEntityTagName)
				{
					rank = i;
				}
				i++;
			}
		);
		if(rank == -1)
		{
			armies.push(
				{
					factionEntityTagName : stack.factionEntityTagName,
					unitEntityName : stack.unitEntityName,
					type : stack.type,
					tier : stack.tier,
					avail : stack.avail,
					power : stack.power,
					baseDuration : stack.baseDuration,
					baseIncome : stack.baseIncome,
					income : stack.income,
					goldCost : stack.goldCost || 0,
					mercuryCost : stack.mercuryCost || 0,
					crystalCost : stack.crystalCost || 0,
					sulfurCost : stack.sulfurCost || 0,
					gemCost : stack.gemCost || 0
					
				}
			);
		}
		else
		{
			armies[rank].avail += stack.avail;
			armies[rank].baseIncome += stack.baseIncome;
			armies[rank].income += stack.income;
		}
	},
	
	onSetup : function()
	{
		this.$elem.dialog(
			{
				minWidth : 650,
                minHeight : 120
			}
		);
	},
	
	onOpen : function()
	{
		this._createView();
	},
	
	_createView : function()
	{
		var self = this;
		var params = $.map(MMHKPLUS.getElement("Player").getCities(), function(elem, i) { return [[elem.content.id]] ; });
		this.setProgressContent(this, MMHKPLUS.getElement("Ajax").getCityRecruitmentFrame, params, self._pushCity, self._createViewContent, self._abort);
	},
	
	_pushCity : function(json)
	{
		var key = Object.keys(json.d)[0];
		var cityId = key.replace("RecruitmentFrame", "");
		var city = MMHKPLUS.getElement("Player").getCity(cityId);
		
		this.cities.push(
			{
				id : city.content.id,
				name : city.content.cityName,
				date : city.content.captureDate,
				content : json.d[key].recruitableUnitList || []
			}
		);
	},
	
	_resourceImageText : function(resource)
	{
		return "<img src='" + this.options.images + resource + ".png' style='width:14px;height:14px;padding-left:3px;padding-right:3px;'/>";
	},
	
	_createLineContent : function(self, $parent, toRecruit, isTotal)
	{
		for(var i = 1 ; i < 9 ; i++)
		{
			var units = self.getStacks(i, toRecruit);
			var textIncome = "";
			var textAvail = "";
			var $tUnits = $("<td>").addClass("MMHKPLUS_KingdomResourcesCell").appendTo($parent);
			var $inlineTable = $("<table>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo($tUnits);
			var $inlineLine = $("<td>").addClass("MMHKPLUS_100Width").appendTo($("<tr>").addClass("MMHKPLUS_100Width").appendTo($inlineTable));
			var first = true;
			units.forEach(function (u)
				{
					var $t = $("<div/>").addClass((isTotal ? "MMHKPLUS_KingdomRecruitmentCellImageTotal" : "MMHKPLUS_KingdomArmiesCellImage")).appendTo($inlineLine);
					first = false;
					var $img = MMHKPLUS.getCssSprite("UnitStack_" + u.factionEntityTagName, u.tier).appendTo($t);
					var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent($img, function($container, $tip)
						{
							var time = new Date(); time.setTime(u.baseDuration * 1000);
							var time2 = new Date(); time2.setTime(u.baseDuration * u.avail * 1000);
							var time3 = new Date(); time3.setTime(u.baseDuration * Math.ceil(u.income) * 1000);
							var unitPrice = "";
							var dayPrice = "";
							var totalPrice = "";
							if(u.goldCost != 0)
							{
								var img = self._resourceImageText("gold");
								unitPrice += img + formatNumber(u.goldCost);
								totalPrice += img + formatNumber(u.avail * u.goldCost);
								dayPrice += img + formatNumber(Math.ceil(u.income) * u.goldCost);
							}
							if(u.mercuryCost != 0)
							{
								var img = self._resourceImageText("mercury");
								unitPrice += img + formatNumber(u.mercuryCost);
								totalPrice += img + formatNumber(u.avail * u.mercuryCost);
								dayPrice += img + formatNumber(Math.ceil(u.income) * u.mercuryCost);
							}
							if(u.crystalCost != 0)
							{
								var img = self._resourceImageText("crystal");
								unitPrice += img + formatNumber(u.crystalCost);
								totalPrice += img + formatNumber(u.avail * u.crystalCost);
								dayPrice += img + formatNumber(Math.ceil(u.income) * u.crystalCost);
							}
							if(u.sulfurCost != 0)
							{
								var img = self._resourceImageText("sulfure");
								unitPrice += img + formatNumber(u.sulfurCost);
								totalPrice += img + formatNumber(u.avail * u.sulfurCost);
								dayPrice += img + formatNumber(Math.ceil(u.income) * u.sulfurCost);
							}
							if(u.gemCost != 0)
							{
								var img = self._resourceImageText("gem");
								unitPrice += img + formatNumber(u.gemCost);
								totalPrice += img + formatNumber(u.avail * u.gemCost);
								dayPrice += img + formatNumber(Math.ceil(u.income) * u.gemCost);
							}
							
							MMHKPLUS.getCssSprite("UnitStack_types", u.type).appendTo($tip);
							$("<p/>").html(u.unitEntityName).addClass("MMHKPLUS_KingdomArmiesCellTooltipName").appendTo($tip);
							$("<p/>").html(MMHKPLUS.localize("UNIT_AMOUNT") + " : " + formatNumber(u.avail)).appendTo($tip);
							$("<br/>").appendTo($tip);
							$("<p/>").html(MMHKPLUS.localize("UNIT_POWER") + " : "  + formatNumber(u.power)).appendTo($tip);
							$("<p/>").html(MMHKPLUS.localize("DAILY_POWER") + " : " + formatNumber(u.power * Math.ceil(u.income))).appendTo($tip);
							$("<p/>").html(MMHKPLUS.localize("STACK_POWER") + " : " + formatNumber(u.avail * u.power)).appendTo($tip);
							$("<br/>").appendTo($tip);
							$("<p/>").html(MMHKPLUS.localize("UNIT_COST") + " : " + unitPrice).appendTo($tip);
							$("<p/>").html(MMHKPLUS.localize("DAILY_COST") + " : " + dayPrice).appendTo($tip);
							$("<p/>").html(MMHKPLUS.localize("STACK_COST") + " : " + totalPrice).appendTo($tip);
							$("<br/>").appendTo($tip);
							$("<p/>").html(MMHKPLUS.localize("UNIT_RECRUIT") + " : " + time.countDown()).appendTo($tip);
							$("<p/>").html(MMHKPLUS.localize("DAILY_RECRUIT") + " : " + time3.countDown()).appendTo($tip);
							$("<p/>").html(MMHKPLUS.localize("STACK_RECRUIT") + " : " + time2.countDown()).appendTo($tip);
							$("<br/>").appendTo($tip);
							$("<p/>").html(MMHKPLUS.localize("DAILY_PROD") + " : " + u.income + " / " + u.baseIncome).appendTo($tip);
						}
					);
								
								
								
					textIncome = "+ " + Math.ceil(u.income);
					textAvail = u.avail;
					if(isTotal)
						$("<div style='font-weight:bold;text-align:center;font-size:90%;'/>")
							.html(u.avail + " <span style='font-weight:normal;font-size:80%;text-decoration:italic;'><br/>" + "+ " + Math.ceil(u.income) + "</span>")
							.appendTo($t);
				}
			);
			if(!isTotal && textIncome.trim() != "")
				$("<div style='font-weight:bold;text-align:left;'/>")
					.html(textAvail + "&nbsp;&nbsp;<span style='font-weight:normal;font-size:80%;text-decoration:italic;'>(" + textIncome + ")</span>")
					.appendTo(
						$("<td>").addClass("MMHKPLUS_100Width")
							.appendTo($("<tr>").addClass("MMHKPLUS_100Width")
							.appendTo($inlineTable)
					)
				);
		}
	},
	
	_createViewContent : function()
	{
		var self = this;
		var $table = $("<table>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo(this.$elem);	
		this.cities.sort(function(a, b)
			{
				return a.date - b.date;
			}
		);
		
		var totalRecruitments = [];
		
		this.cities.forEach(function(city)
			{
				var toRecruit = [];
				city.content.forEach(function(unit)
					{
						if(unit.available || (unit.avail > 0 && hasProperty(unit, "power")))
						{
							self.pushStack(unit, toRecruit);
							self.pushStack(unit, totalRecruitments);
						}
						if(unit.upgraded.available || (unit.upgraded.avail > 0 && hasProperty(unit.upgraded, "power")))
						{
							self.pushStack(unit.upgraded, toRecruit);
							self.pushStack(unit.upgraded, totalRecruitments);
						}
					}
				);
				
				var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
				$("<td>")
					.addClass("MMHKPLUS_KingdomArmiesCell MMHKPLUS_TextCenter")
					.html("<b>" + city.name + "</b><br/><i>" + formatNumber(self.getPower(toRecruit)) + "</i>")
					.appendTo($line);
				
				self._createLineContent(self, $line, toRecruit, false);
			}
		);
		
		var $totalLine = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
		$("<td>")
			.addClass("MMHKPLUS_KingdomArmiesCell MMHKPLUS_TextCenter")
			.html("<b style='text-transform:uppercase;'>" + MMHKPLUS.localize("TOTAL") + "</b><br/><i>" + formatNumber(this.getPower(totalRecruitments)) + "</i>")
			.appendTo($totalLine);
		
		self._createLineContent(self, $totalLine, totalRecruitments, true);
		
		this.cities = null;
		this.cities = [];
	},
	
	_abort : function()
	{
		this.cities = null;
		this.cities = [];
	},
	
	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
		destroy(this.cities); this.cities = null;
	}
});
MMHKPLUS.KingdomRegions = MMHKPLUS.PanelElement.extend({
    elementType : "KingdomRegions",
    regions : [],
    
    options : {
        title : "",
        resizable : true,
        opened : false,
        x : "center",
        y : "center",
        w : 800,
        h : 350,
        savePos : true,
        saveWidth : true,
        saveHeight : true,
        saveOpened : true
    },
    
    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.options.title = MMHKPLUS.localize("REGIONS");
        this.$elem = $("<div>");
        this._setupPanel();
        
        return this;
    },
    
    onSetup : function()
    {
        this.$elem.dialog(
            {
                minWidth : 500,
                minHeight : 170
            }
        );
    },
    
    onOpen : function()
    {
        this._createView();
    },

    onClose : function()
    {
        this.regions = null;
        this.regions = [];
    },
    
    _createView : function()
    {
        var self = this;
        var params = $.map(MMHKPLUS.getElement("Player").getCities(), function(elem, i) { return [[elem.content.id]] ; });
        this.setProgressContent(this, MMHKPLUS.getElement("Ajax").getRegionMap, params, self._pushRegion, self._createViewContent, self._abort);
    },

    _pushRegion : function(json)
    {
        var key = Object.keys(json.d)[0];
        this.regions.push(
            {
                id : json.d[key].id || -1,
                zones : json.d[key].attachedZoneList || []
            }
        );
    },

    _createViewContent : function()
    {
        var self = this;
        var $table = $("<table>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo(this.$elem);
        $("<tr>\
                <th class='MMHKPLUS_CellHeader' style='width:20%;'>" + MMHKPLUS.localize("CITY") + "</th>\
                <th class='MMHKPLUS_CellHeader' style='width:20%;'>" + MMHKPLUS.localize("MINES") + "</th>\
                <th class='MMHKPLUS_CellHeader' style='width:20%;'>" + MMHKPLUS.localize("RESEARCH_BUILDINGS") + "</th>\
                <th class='MMHKPLUS_CellHeader' style='width:20%;'>" + MMHKPLUS.localize("RECRUITMENT") + "</th>\
                <th class='MMHKPLUS_CellHeader' style='width:20%;'>" + MMHKPLUS.localize("OTHER") + "</th>\
            </tr>"
        ).appendTo($table);

        this.regions.sort(function(a, b) { return MMHKPLUS.getElement("Player").getCity(a.id).content.captureDate - MMHKPLUS.getElement("Player").getCity(b.id).content.captureDate;});
        this.regions.forEach(function(c)
            {
                var city = MMHKPLUS.getElement("Player").getCity(c.id);
                var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);

                $("<td style='width:20%;'>").addClass("MMHKPLUS_Cell")
                        .append(
                            MMHKPLUS.getCssSprite("City_" + city.content.factionEntityTagName, "Level" + city.content.displayLevel).addClass("MMHKPLUS_AutoCenter"))
                        .append(
                            $("<p style='margin-bottom:10px;'>").addClass("MMHKPLUS_TextCenter").html(city.content.cityName))
                        .appendTo($line);

                var $tdMines = $("<td style='width:20%;'>").addClass("MMHKPLUS_Cell").appendTo($line);
                var $tdResearch = $("<td style='width:20%;'>").addClass("MMHKPLUS_Cell").appendTo($line);
                var $tdRecruit = $("<td style='width:20%;'>").addClass("MMHKPLUS_Cell").appendTo($line);
                var $tdOther = $("<td style='width:20%;'>").addClass("MMHKPLUS_Cell").appendTo($line);

                self._getMines(c.zones).forEach(function(m)
                    {
                        $tdMines.append(
                            $("<p>")
                                .addClass("MMHKPLUS_TextCenter")
                                .html(m.name + " " + MMHKPLUS.localize("LEVEL_SHORT") + " " + m.upgradeLevel
                                    + " (" + MMHKPLUS.localize("IMPROVE_SHORT") + " " + m.improveLevel + ")"));
                    }
                );

                self._getResearchBuildings(c.zones).forEach(function(m)
                    {
                        $tdResearch.append(
                            $("<p>")
                                .addClass("MMHKPLUS_TextCenter")
                                .html(m.zoneBuildingEntityName));
                    }
                );

                self._getRecruitmentBuildings(c.zones).forEach(function(m)
                    {
                        $tdRecruit.append(
                            $("<p>")
                                .addClass("MMHKPLUS_TextCenter")
                                .html(m.zoneBuildingEntityName));
                    }
                );

                $tdOther.append(self._getFields(c.zones));
                $tdOther.append(self._getStorehouses(c.zones));
                self._getOthers(c.zones).forEach(function(m)
                    {
                        $tdOther.append(
                            $("<p>")
                                .addClass("MMHKPLUS_TextCenter")
                                .html(m.zoneBuildingEntityName));
                    }
                );
            }
        );
    },

    _getMines : function(zones)
    {
        var result = [];
        zones.forEach(function(z)
            {
                if(hasProperty(z, "attachedMine"))
                    result.push(z.attachedMine);
            }
        );
        return result;
    },

    _getResearchBuildings : function(zones)
    {
        var result = [];
        zones.forEach(function(z)
            {
                if(hasProperty(z, "attachedZoneBuilding") && z.attachedZoneBuilding.zoneBuildingEntityTagName.indexOf("RESEARCH_BUILDING") != -1)
                    result.push(z.attachedZoneBuilding);
            }
        );
        return result;
    },

    _getRecruitmentBuildings : function(zones)
    {
        var result = [];
        zones.forEach(function(z)
            {
                if(hasProperty(z, "attachedZoneBuilding") && z.attachedZoneBuilding.zoneBuildingEntityTagName.indexOf("RECRUITMENT") != -1)
                    result.push(z.attachedZoneBuilding);
            }
        );
        return result;
    },

    _getFields : function(zones)
    {
        var count = 0;
        zones.forEach(function(z)
            {
                if(hasProperty(z, "attachedZoneBuilding") && z.attachedZoneBuilding.zoneBuildingEntityTagName == "FIELDS")
                    count++;
            }
        );
        return $("<p>").addClass("MMHKPLUS_TextCenter").html(count + " " + MMHKPLUS.localize("FIELDS"));
    },

    _getStorehouses : function(zones)
    {
        var count = 0;
        zones.forEach(function(z)
            {
                if(hasProperty(z, "attachedZoneBuilding") && z.attachedZoneBuilding.zoneBuildingEntityTagName == "STOREHOUSE")
                    count++;
            }
        );
        return $("<p>").addClass("MMHKPLUS_TextCenter").html(count + " " + MMHKPLUS.localize("STOREHOUSES"));
    },

    _getOthers : function(zones)
    {
        var result = [];
        zones.forEach(function(z)
            {
                if(hasProperty(z, "attachedZoneBuilding") && z.attachedZoneBuilding.zoneBuildingEntityTagName.indexOf("RECRUITMENT") == -1
                    && z.attachedZoneBuilding.zoneBuildingEntityTagName.indexOf("RESEARCH_BUILDING") == -1
                    && z.attachedZoneBuilding.zoneBuildingEntityTagName != "FIELDS"
                    && z.attachedZoneBuilding.zoneBuildingEntityTagName != "STOREHOUSE")
                    result.push(z.attachedZoneBuilding);
            }
        );
        return result;
    },

    _abort : function()
    {
        this.regions = null;
        this.regions = [];
    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
        destroy(this.regions); this.regions = null;
    }
});
MMHKPLUS.KingdomResources = MMHKPLUS.PanelElement.extend({
	elementType : "KingdomResources",
	intervalResourcesUpdate : null,
	
	options : {
		title : "",
		resizable : true,
		opened : false,
		x : "center",
		y : "center",
		w : 800,
		h : 350,
		savePos : true,
		saveWidth : true,
		saveHeight : true,
		saveOpened : true,
		refresh : 30000
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("RESOURCES");
		this.$elem = $("<div>");
		this._setupPanel();
		
		return this;
	},
	
	onSetup : function()
	{
		this.$elem.dialog(
			{
				minWidth : 650,
                minHeight : 120
			}
		);
	},
	
	onOpen : function()
	{
		this.intervalResourcesUpdate = setInterval((function(self) { return function() { self._createView(); } })(this), this.options.refresh);
		this._createView();
	},

	onClose : function()
	{
		MMHKPLUS.clearInterval(this.intervalResourcesUpdate); 
		this.intervalResourcesUpdate = null;
	},
	
	_getResourceColorDisplay : function(quantity, max)
	{
		if(quantity >= max)
		{
			return "#FF0000";
		}
		else if(quantity >= max * 0.8)
		{
			return "#FDBA1A";
		}
		else
		{
			return "#FFFFFF";
		}
	},

	_createResourceCell : function(self, $cell, tag, amount, income, storage)
	{	
		var color = (storage != null ? self._getResourceColorDisplay(amount, storage) : "#FFFFFF");
		var ressourceImage = MMHKPLUS.getCssSprite("Ressources", tag)
			.addClass("MMHKPLUS_KingdomResourcesImage")
			.appendTo($cell);
		$("<p/>").html(formatNumber(Math.floor(amount)))
			.addClass("MMHKPLUS_KingdomResourcesCellAmount")
			.css({ color : color })
			.appendTo($cell);
		$("<p/>").html((income >= 0 ? "+ " : "") + formatNumber(Math.floor(income / 24 * 100) / 100) + " / " + MMHKPLUS.localize("HOUR_SMALL"))
			.addClass("MMHKPLUS_KingdomResourcesCellAmountSmall")
			.css({ color : color })
			.appendTo($cell);
		$("<p/>").html((income >= 0 ? "+ " : "") + formatNumber(Math.floor(income)) + " / " + MMHKPLUS.localize("DAY_SMALL"))
			.addClass("MMHKPLUS_KingdomResourcesCellAmountSmall")
			.css({ color : color })
			.appendTo($cell);
	},
	
	_createView : function()
	{
		this.$elem.empty();
		var self = this;
		var table = $("<table>").addClass("MMHKPLUS_100Width MMHKPLUS_Table").appendTo(this.$elem);
		
		var totalRessources = [0, 0, 0, 0, 0, 0, 0];
		var totalIncomeRessources = [0, 0, 0, 0, 0, 0, 0];
		
		var cities = MMHKPLUS.getElement("Player").getCities();
		cities.forEach(function(city)
			{
				var line = $("<tr/>").addClass("MMHKPLUS_100Width MMHKPLUS_5000ZIndex").appendTo(table);
				$("<td>")
					.addClass("MMHKPLUS_TextCenter MMHKPLUS_KingdomResourcesCell")
					.html("<b>" + city.content.cityName + "</b>")
					.appendTo(line);
				
				city.content.attachedRessourceStackList.forEach(function(ressource)
					{
						totalRessources[MMHKPLUS.resources.indexOf(ressource.ressourceEntityTagName)] += city.getRessourceQuantity(ressource.ressourceEntityTagName);
						totalIncomeRessources[MMHKPLUS.resources.indexOf(ressource.ressourceEntityTagName)] += ressource.income;
						
						var $block = $("<td>").addClass("MMHKPLUS_KingdomResourcesCell").appendTo(line);
						var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent($block, function($container, $tip)
							{
								var amount = formatNumber(Math.floor(city.getRessourceQuantity(ressource.ressourceEntityTagName)));
								var maintenance = formatNumber(Math.floor(city.getResourceStack(MMHKPLUS.HOMMK.RESOURCE_GOLD).content.maintenanceGoldCost));
								var hIncome = (ressource.income >= 0 ? "+ " : "") + formatNumber(Math.floor(ressource.income));
								var dIncome = (ressource.income >= 0 ? "+ " : "") + formatNumber(Math.floor(ressource.income / 24 * 100) / 100);
								var storage = formatNumber(ressource._storageLimit);
								
								$("<p>").html(MMHKPLUS.localize("AMOUNT") + " : " + amount).appendTo($tip);
								if(ressource.ressourceEntityTagName == MMHKPLUS.HOMMK.RESOURCE_GOLD)
									$("<p>").html(MMHKPLUS.localize("MAINTENANCE") + " : "  + maintenance).appendTo($tip);
								$("<p>").html(MMHKPLUS.localize("DAILY_INCOME") + " : "  + hIncome).appendTo($tip);
								$("<p>").html(MMHKPLUS.localize("HOURLY_INCOME") + " : "  + dIncome).appendTo($tip);
								$("<p>").html(MMHKPLUS.localize("STORAGE") + " : "  + storage).appendTo($tip);
								$("<br>").appendTo($tip);
								
								if(ressource.income == 0)
								{
									$("<p/>").html(MMHKPLUS.localize("FULL_IN") + " : --").appendTo($tip);
								}
								else
								{
									var result = "";
									var need = (ressource.income >= 0 ? (ressource._storageLimit - city.getRessourceQuantity(ressource.ressourceEntityTagName)) : (city.getRessourceQuantity(ressource.ressourceEntityTagName)));
									var time = (need / ressource.income) * 24 * 3600;
									
									var d = new Date(); d.setTime(Math.abs(time * 1000));
									$("<p/>").html((time > 0 ? MMHKPLUS.localize("FULL_IN"): MMHKPLUS.localize("EMPTY_IN")) + " : " + d.longCountDown()).appendTo($tip);
									
								}
								$tip = null;
								$container = null;
							}
						);

						self._createResourceCell(self, $block, 
												 ressource.ressourceEntityTagName, city.getRessourceQuantity(ressource.ressourceEntityTagName), 
												 ressource.income, ressource._storageLimit);
					}
				);
			}
		);
		
		var $totalLine = $("<tr>").addClass("MMHKPLUS_100Width MMHKPLUS_5000ZIndex").appendTo(table);
		$("<td>").addClass("MMHKPLUS_KingdomResourcesCell MMHKPLUS_TextCenter").html("<b style='text-transform:uppercase;'>" + MMHKPLUS.localize("TOTAL") + "</b>").appendTo($totalLine);
		for(var i = 0 ; i < 7 ; i++)
		{
			var $block = $("<td>").addClass("MMHKPLUS_KingdomResourcesCell").appendTo($totalLine);
			self._createResourceCell(self, $block, 
									 MMHKPLUS.resources[i], totalRessources[i], 
									 totalIncomeRessources[i], null);
		}
	},
	
	unload : function()
	{
		MMHKPLUS.clearInterval(this.intervalResourcesUpdate); 
		this.intervalResourcesUpdate = null;
		MMHKPLUS.resetElement(this.$elem);
	}
});
MMHKPLUS.AttacksSieges = MMHKPLUS.PanelElement.extend({
    elementType : "AttacksSieges",
    attacks : {},
    sieges : {},
    
    options : {
        title : "",
        resizable : true,
        opened : false,
        x : "center",
        y : "center",
        w : 830,
        h : 350,
        savePos : true,
        saveWidth : false,
        saveHeight : true,
        saveOpened : true,
    },
    
    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.options.title = MMHKPLUS.localize("ATTACKS_SIEGES");
        this.$elem = $("<div>");
        this._setupPanel();

        MMHKPLUS.HOMMK.SiegeBreakFrame.prototype.display = injectAfter(MMHKPLUS.HOMMK.SiegeBreakFrame.prototype.display, this._onSiegeFrameOpen);
        MMHKPLUS.HOMMK.Region.prototype.drawInfluence = injectAfter(MMHKPLUS.HOMMK.Region.prototype.drawInfluence, this._onDrawInfluence);

        this._initInformations();
        
        return this;
    },
    
    onSetup : function()
    {
        var self = this;
        this.$elem.dialog(
            {
                minWidth : self.options.w,
                maxWidth: self.options.w,
                minHeight : 150
            }
        );
    },
    
    onOpen : function()
    {
        this._createView();
        this._updateView();
    },

    _createView : function()
    {
        // $("<p>")
        //     .html(MMHKPLUS.localize("ATTACKS"))
        //     .addClass("MMHKPLUS_TextCenter MMHKPLUS_Title")
        //     .appendTo(this.$elem);

        // $("<table>")
        //     .addClass("MMHKPLUS_Table MMHKPLUS_100Width")
        //     .appendTo(this.$elem);

        // $("<br>").appendTo(this.$elem);

        // $("<p>")
        //     .html(MMHKPLUS.localize("SIEGES"))
        //     .addClass("MMHKPLUS_TextCenter MMHKPLUS_Title")
        //     .appendTo(this.$elem);

        $("<table>")
            .addClass("MMHKPLUS_Table MMHKPLUS_100Width")
            .appendTo(this.$elem);
    },

    _initInformations : function()
    {
        var self = this;
        MMHKPLUS.HOMMK.elementPool.obj.Region.values().forEach(function(r)
            {
                if(r.isSieged())
                    self._addSiege(r);
                if(r.isUnderAttack())
                    self._addAttack(r);
            }
        );
    },

    _onDrawInfluence : function(result)
    {
        if(this.isSieged())
            MMHKPLUS.getElement("AttacksSieges")._addSiege(this);
        if(this.isUnderAttack())
            MMHKPLUS.getElement("AttacksSieges")._addAttack(this);
        MMHKPLUS.getElement("AttacksSieges")._updateView();

        return result;
    },

    _getXYFromCityName : function(name) 
    {
        for ( var k in this.sieges ) 
        {
            if ( this.sieges[k].cityName == name ) 
            {
                return { x: this.sieges[k].x, y: this.sieges[k].y}; 
            } 
        } 
        return null; 
    },

    _onSiegeFrameOpen : function(result)
    {
        var coord = MMHKPLUS.getElement("AttacksSieges")._getXYFromCityName(this.content.siegedCityName);
        if(!coord)
            return;

        MMHKPLUS.getElement("AttacksSieges").sieges[coord.x + "_" + coord.y].endDate = this.content.siegeEndDate;
        MMHKPLUS.getElement("AttacksSieges").sieges[coord.x + "_" + coord.y].attacker = this.content.siegingPlayerName;
        MMHKPLUS.getElement("AttacksSieges").sieges[coord.x + "_" + coord.y].attackerAllianceName = (hasProperty(this.content, "siegingAllianceName") ? this.content.siegingAllianceName : MMHKPLUS.localize("NONE"));
        MMHKPLUS.getElement("AttacksSieges")._updateView();
    
        return result;
    },

    _addSiege : function(region)
    {
        if(!hasProperty(this.sieges, region.content.x + "_" + region.content.y))
            this.sieges[region.content.x + "_" + region.content.y] = 
                {
                    x : region.content.x,
                    y : region.content.y,
                    cityName : region.content.cN,
                    playerName : region.content.pN,
                    allianceName : hasProperty(region.content, "iAN") ? region.content.iAN : MMHKPLUS.localize("NONE"),
                    attacker : "?",
                    attackerAllianceName : "?",
                    endDate : 0
                };
    },

    _addAttack : function(region)
    {
        if(!hasProperty(this.attacks, region.content.x + "_" + region.content.y))
            this.attacks[region.content.x + "_" + region.content.y] = 
                {
                    x : region.content.x,
                    y : region.content.y,
                    cityName : region.content.cN,
                    playerName : region.content.pN,
                    allianceName : hasProperty(region.content, "iAN") ? region.content.iAN : MMHKPLUS.localize("NONE"),
                };
    },

    _updateView : function()
    {
        if(this.options.opened)
        {
            var self = this;
            //var $a = this.$elem.find("table").eq(0);
            var $s = this.$elem.find("table").eq(0);

            // $a.empty(); 
            $s.empty();

            // $("<tr>\
            //     <th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("PLAYER") + "</td>\
            //     <th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("CITY") + "</td>\
            //     <th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("COORDINATES") + "</td>\
            // </tr>").appendTo($s);

            // for(var a in this.attacks)
            // {
            //     $("<tr>")
            //         .addClass("MMHKPLUS_100Width").css("cursor", "pointer")
            //         .append(
            //             $("<td>").addClass("MMHKPLUS_TextCenter")
            //                 .html(this.attacks[a].playerName + " (" + this.attacks[a].allianceName + ")"))
            //         .append(
            //             $("<td>").addClass("MMHKPLUS_TextCenter")
            //                 .html(this.attacks[a].cityName))
            //         .append(
            //             $("<td>").addClass("MMHKPLUS_TextCenter")
            //                 .html("(" + this.attacks[a].x + "," + this.attacks[a].y + ")"))
            //         .click(function() { MMHKPLUS.centerOn(self.attacks[a].x, self.attacks[a].y); })
            //         .appendTo($a);
            // }
            // $a.find("tr:odd").css({backgroundColor:"rgba(0,191,255,0.2)"});

            $("<tr>\
                <th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("PLAYER") + "</td>\
                <th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("CITY") + "</td>\
                <th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("COORDINATES") + "</td>\
                <th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("ATTACKER") + "</td>\
                <th class='MMHKPLUS_CellHeader'>" + MMHKPLUS.localize("END_DATE") + "</td>\
            </tr>").appendTo($s);

            $.each(this.sieges, function(i, e)
                {
                    var d = new Date() ; d.setTime(e.endDate * 1000);
                    $("<tr>").css("cursor", "pointer")
                        .addClass("MMHKPLUS_100Width")
                        .append(
                            $("<td>").addClass("MMHKPLUS_TextCenter")
                                .html(e.playerName + " (" + e.allianceName + ")"))
                        .append(
                            $("<td>").addClass("MMHKPLUS_TextCenter")
                                .html(e.cityName))
                        .append(
                            $("<td>").addClass("MMHKPLUS_TextCenter")
                                .html("(" + e.x + "," + e.y + ")"))
                        .append(
                            $("<td>").addClass("MMHKPLUS_TextCenter")
                                .html(e.attacker + " (" + e.attackerAllianceName + ")"))
                        .append(
                            $("<td>").addClass("MMHKPLUS_TextCenter")
                                .html((e.endDate != 0 ? d.toShortFrenchFormat() : "?")))
                        .click(function() { MMHKPLUS.centerOn(e.x, e.y);})
                        .appendTo($s);
                }
            );
            $s.find("tr:odd").css({backgroundColor:"rgba(0,191,255,0.2)"});
        }
    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
        delete this.attacks ; 
        delete this.sieges;
    }
});
MMHKPLUS.Cartographer = MMHKPLUS.PanelElement.extend({
    elementType : "Cartographer",
    $canvas : null,
    $container : null,
    $content : null,
    $marker : null,
    coords : [],
    wS : 0,
    baseSize : 2,
    zoomLevel : 1,
    intervalRequest : null,
    cache : {},
    order : [{x:2,y:-2}, 
             {x:1,y:-2}, {x:2,y:-1}, 
             {x:0,y:-2}, {x:1,y:-1}, {x:2,y:0}, 
             {x:-1,y:-2}, {x:0,y:-1}, {x:1,y:0}, {x:2,y:1}, 
             {x:-2,y:-2}, {x:-1,y:-1}, {x:0,y:0}, {x:1,y:1}, {x:2,y:2}, 
             {x:-2,y:-1}, {x:-1,y:0}, {x:0,y:1}, {x:1,y:2}, 
             {x:-2,y:0}, {x:-1,y:1}, {x:0,y:2}, 
             {x:-2,y:1}, {x:-1,y:2}, 
             {x:-2,y:2}],
    initLoad : false,
    intervalPos : null,
    xOrigin : 0,
    yOrigin : 0,
    coeff : 0,
    canvasWidth : 0,
    canvasHeight : 0,
    
    options : {
        title : "",
        resizable : false,
        opened : false,
        x : "center",
        y : "center",
        w : 425,
        h : 505,
        savePos : true,
        saveWidth : false,
        saveHeight : false,
        saveOpened : true,
        hop : 35,
        showDetails : false,
        centerOnFirstCity : false,
        images : MMHKPLUS.URL_IMAGES + "carto/"
    },
    
    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.options.title = MMHKPLUS.localize("CARTO");
        this.$elem = $("<div>");

        this.options.centerOnFirstCity = (this.load("cFC") != null ? this.load("cFC") : this.options.centerOnFirstCity);
        this.xOrigin = MMHKPLUS.getElement("Player").getCities()[0].content.x;
        this.yOrigin = MMHKPLUS.getElement("Player").getCities()[0].content.y;
        
        this._setupPanel();

        this.wS = MMHKPLUS.getElement("Player").get("worldSize");
        for(var x = 1 ; x <= this.wS ; x += this.options.hop - 1)
            for(var y = 1; y <= this.wS; y += this.options.hop - 1)
                this.coords.push({x : x, y : y});
        this.baseSize = Math.floor(400 / this.wS);
        this.coeff = this.baseSize * this.zoomLevel;

        var self = this;
        setTimeout((function(self) { return function() { self._initRequests(); }})(this), 1000);
        
        return this;
    },
    
    onSetup : function()
    {
        var self = this;
        this.$elem.dialog(
            {
                minWidth : self.options.w,
                maxWidth: self.options.w,
                minHeight : self.options.h,
                maxHeight : self.options.h
            }
        ).css("overflow", "hidden");
    },
    
    onOpen : function()
    {
        this._createView();
        this.zoomLevel = 1;
        this._redraw(true);

        if(!this.initLoad)
        {
            MMHKPLUS.getElement("Ajax").getCartographerData();
            this.initLoad = true;
        }

        this.intervalPos = setInterval((function(self) { return function() { self._updatePos(); }})(this), 1000);
        this._updatePos();
    },

    onClose : function()
    {
        MMHKPLUS.clearInterval(this.intervalPos);
        this.intervalPos = null;
    },

    onDragStart : function(e, ui)
    {
        this.$canvas.hide();
    },

    onDragStop : function(e, ui)
    {
        this.$canvas.show();
    },

    _updatePos : function()
    {
        var self = MMHKPLUS.getElement("Cartographer");
        if(self.options.centerOnFirstCity)
        {
            // var xStart =  self.xOrigin + self.wS / 2; if(xStart > self.wS) xStart -= self.wS;
            // var yStart =  self.wS / 2 - self.yOrigin; if(yStart < 1) yStart += self.wS;
            var xStart =  self.wS / 2 - self.xOrigin; if(xStart < 1) xStart += self.wS; if(xStart > self.wS) xStart -= self.wS;
            var yStart =  self.wS / 2 - self.yOrigin; if(yStart < 1) yStart += self.wS; if(yStart > self.wS) yStart -= self.wS;
            xStart--; yStart--;
        }
        else
        {
            var xStart = 0;
            var yStart = 0;
        }
        
        var x = (MMHKPLUS.HOMMK.currentView.regionX + xStart) * self.baseSize * self.zoomLevel;
        if(x > self.$canvas.width()) x -= self.$canvas.width();
        var y = (MMHKPLUS.HOMMK.currentView.regionY + yStart) * self.baseSize * self.zoomLevel;
        if(y > self.$canvas.height()) y -= self.$canvas.height();

        
        if(!self.$marker)
            return;

        if(-400 + y - 50 + self.padding - 2 < -400)
        {
            self.$marker.addClass("MMHKPLUS_CartographerRotate");
        }
        else
        {
            self.$marker.removeClass("MMHKPLUS_CartographerRotate");
        }

        self.$marker.css(
            {
                top : -400 + y - (self.$marker.hasClass("MMHKPLUS_CartographerRotate") ? 5 : 50) + self.padding - 2, 
                left : x - 25 + self.padding
            }
        );
        self.$elem.find("p").eq(0).html(MMHKPLUS.localize("ACTUAL") + " (" + MMHKPLUS.HOMMK.currentView.regionX + "," + MMHKPLUS.HOMMK.currentView.regionY + ")");
    },

    _dataReceived : function(data)
    {
        var self = MMHKPLUS.getElement("Cartographer");
        data.forEach(function(r)
            {
                if(!hasProperty(self.cache, r.x + "_" + r.y))
                    self.cache[r.x + "_" + r.y] = r;
            }
        );
        if(self.options.opened)
            self._redraw(true);
    },
    
    _createView : function()
    {
        var self = this;
        $("<p>")
            .css("marginLeft", "10px")
            .css("height", "25px")
            .html(MMHKPLUS.localize("ACTUAL") + " (" + MMHKPLUS.HOMMK.currentView.regionX + "," + MMHKPLUS.HOMMK.currentView.regionY + ")")
            .appendTo(this.$elem);
        $("<p>")
            .css({position:"absolute", "top":"7px", left:"170px"})
            .css("height", "25px")
            .appendTo(this.$elem);
        $("<div>").button()
            .css("padding", 3)
            .css({position:"absolute",top:"5px", left:"350px"})
            .html(MMHKPLUS.localize("DETAILS"))
            .click(function() { self._toggleDetails();})
            .appendTo(this.$elem);
        this.$container = $("<div>")
            .css("border", "1px solid #FFFFFF")
            .css("width", "400px")
            .css("height", "400px")
            .appendTo(this.$elem);
        this.$canvas = $("<canvas>")
            .appendTo(this.$container);

        this.$marker = $("<img>")
                .attr("src", MMHKPLUS.URL_IMAGES + "carto/marker.png")
                .css({position:"relative", width:"50px", height:"50px"}).appendTo(this.$container);
        this.$marker.mousemove(this._onMouseMove);
        this.$marker.mouseleave(this._onMouseLeave);
        this.$marker.click(this._onClick);

        this.$canvas.mousemove(this._onMouseMove);
        this.$canvas.mouseleave(this._onMouseLeave);
        this.$canvas.click(this._onClick);
        //this._redraw();

        this.$content = $("<div>")
            .css({position:"absolute", left:"425px", top:"45px", width:"320px"})
            .appendTo(this.$elem);

        $("<div>")
            .css({position:"absolute", bottom:"10px", left: "1Opx", width: "400px"})
            .addClass("MMHKPLUS_TextCenter")
            .append(
                $("<input>")
                    .attr("type", "checkbox")
                    .attr("checked", self.options.centerOnFirstCity)
                    .change(function()
                        {
                            self.options.centerOnFirstCity = $(this).is(":checked");
                            self.save("cFC", self.options.centerOnFirstCity);
                            self._redraw(true);
                        }))
            .append(
                $("<label>")
                    .html(MMHKPLUS.localize("CENTER_FIRST_CITY")))
            .appendTo(this.$elem);
    },

    _toggleDetails : function()
    {
        this.options.showDetails = !this.options.showDetails;
        if(this.options.showDetails)
        {
            this.$elem.dialog({width:750});
        }
        else
        {
            this.$elem.dialog({width:425});
        }
    },

    _onMouseMove : function(event)
    {
        var self = MMHKPLUS.getElement("Cartographer");
        var xx = event.pageX - self.$canvas.offset().left;
        var yy = event.pageY - self.$canvas.offset().top;
        xx = parseInt(xx/(self.coeff));
        yy = parseInt(yy/(self.coeff));

        if(xx <= 0) xx = 1; if(xx > self.wS) xx = self.wS;
        if(yy <= 0) yy = 1; if(yy > self.wS) yy = self.wS;

        if(self.options.centerOnFirstCity)
        {
            var xStart =  xx + self.xOrigin + self.wS / 2;
            var yStart = yy + 1 - (self.wS / 2 - self.yOrigin); 

            if(yStart > self.wS) yStart -= self.wS; if(yStart < 1) yStart += self.wS;
            if(xStart > self.wS) xStart -= self.wS; if(xStart < 1) xStart += self.wS;
            var x = 1;
            if(xStart > self.wS) x = xStart - self.wS;

            self._setContent((xStart > self.wS ? x : xStart), yStart);
        }
        else
        {
            self._setContent(xx, yy);
        }
    },

    _setContent : function(x, y)
    {
        var self = MMHKPLUS.getElement("Cartographer");
        self.$content.empty();
        
        var $bg = $("<div>")
            .addClass("MMHKPLUS_AutoCenter")
            .css({backgroundImage:"url(" + self.options.images + "block.png)", width:"320px", height:"160px"})
            .appendTo(self.$content);

        self.$elem.find("p").eq(0).html(MMHKPLUS.localize("ACTUAL") + " (" + MMHKPLUS.HOMMK.currentView.regionX + "," + MMHKPLUS.HOMMK.currentView.regionY + ")");
        self.$elem.find("p").eq(1).html(MMHKPLUS.localize("CURSOR") + " (" + (x) + "," + (y) + ")");
        self.order.forEach(function(o)
            {
                self.$content.append(self._drawRegionContent(self, x, y, o.x, o.y));   
            }
        );

        $("<br>").appendTo(self.$content);

        if(hasProperty(this.cache, x + "_" + y))
        {
            var region = this.cache[x + "_" + y];
            $("<p>")
                .css("paddingLeft", 25)
                .html(MMHKPLUS.localize("PLAYER") + " : " + (hasProperty(region, "pN") ? region.pN : self.cache[region.ref].pN))
                .appendTo(self.$content);
            $("<p>")
                .css("paddingLeft", 25)
                .html(MMHKPLUS.localize("ALLIANCE") + " : " + (hasProperty(region, "aN") ? region.aN : self.cache[region.ref].aN))
                .appendTo(self.$content);

            $("<br>").appendTo(self.$content);
            if(self._hasCity(region))
            {
                $("<p>")
                    .css("paddingLeft", 25)
                    .html(MMHKPLUS.localize("CITY") + " : " + region.cN)
                    .appendTo(self.$content);
            }
            $("<p>")
                .css("paddingLeft", 25)
                .html("X : " + region.x)
                .appendTo(self.$content);
             $("<p>")
                .css("paddingLeft", 25)
                .html("Y : " + region.y)
                .appendTo(self.$content);
        }
    },

    _onMouseLeave : function()
    {
        var self = MMHKPLUS.getElement("Cartographer");
        if(self.$content)
            self.$content.empty();
        self.$elem.find("p").eq(1).html("");
    },

    _onClick : function(event)
    {
        var self = MMHKPLUS.getElement("Cartographer");
        var xx = event.pageX - self.$canvas.offset().left;
        var yy = event.pageY - self.$canvas.offset().top;
        xx = parseInt(xx/(self.baseSize*self.zoomLevel));
        yy = parseInt(yy/(self.baseSize*self.zoomLevel));

        if(xx <= 0) xx = 1; if(xx > self.wS) xx = self.wS;
        if(yy <= 0) yy = 1; if(yy > self.wS) yy = self.wS;

        if(self.options.centerOnFirstCity)
        {
            var xStart =  xx + self.xOrigin + self.wS / 2;
            var yStart = yy + 1 - (self.wS / 2 - self.yOrigin); 

            if(yStart > self.wS) yStart -= self.wS; if(yStart < 1) yStart += self.wS;
            if(xStart > self.wS) xStart -= self.wS; if(xStart < 1) xStart += self.wS;
            var x = 1;
            if(xStart > self.wS) x = xStart - self.wS;

            MMHKPLUS.centerOn((xStart > self.wS ? x : xStart), yStart);
        }
        else
        {
            MMHKPLUS.centerOn(xx, yy);
        }
    },

    _drawRegionContent : function(self, x, y, relx, rely)
    {
        var $result = $("<div>")
            .css({position:"absolute", left: 128 + relx*32 + rely*32 + "px", top : 32 - 15*relx + rely*15 + "px"});

        var realX = x + relx ; if(realX < 1) realX += this.wS; if(realX > this.wS) realX -= this.wS;
        var realY = y + rely ; if(realY < 1) realY += this.wS; if(realY > this.wS) realY -= this.wS;

        if(hasProperty(this.cache, realX + "_" + realY))
        {
            var region = this.cache[realX + "_" + realY];

            // Influence
            if(self._hasInfluence(region) || (hasProperty(region, "ref") && self._hasInfluence(self.cache[region.ref])))
            {
                $("<div>").css(
                    {
                        "position" : "absolute",
                        "top" : "31px",
                        "left" : "0px",
                        "background-image" : "url(" + MMHKPLUS.URL_IMAGES + "map/color_" + (hasProperty(region, "c") ? region.c : self.cache[region.ref].c)+ ".png)",
                        "opacity" : "0.7",
                        "width" : "62px",
                        "height" : "32px"
                    }
                ).appendTo($result);
            }

            // City Image
            if(self._hasCity(region))
            {
                MMHKPLUS.getCssSprite("Region_Zoom2", MMHKPLUS.factions[region.f] + "_cityLevel" + region.d + (self._isInactive(region) ? "_neutral" : "") + (self._hasGrail(region) ? "_tear" : ""))
                    .css({position:"absolute",left:"0px", top:"0px", zIndex:1000})
                    .appendTo($result);
            }

            // Region building
            if(self._hasRegionBuilding(region))
            {
                MMHKPLUS.getCssSprite("regionBuildingsZoom2", "NEUTRAL_" + region.rB)
                    .css({position:"absolute",left:"0px", top:"0px", zIndex:1000})
                    .appendTo($result);
            }

            // Decors
            if(self._hasDecoration(region))
            {
                MMHKPLUS.getCssSprite("Region_Zoom2", "NEUTRAL_" + region.t)
                    .css({position:"absolute",left:"0px", top:"0px", zIndex:1000})
                    .appendTo($result);
            }
        }

        return $result;
    },

    _redraw : function(now)
    {
        if(this.$content)
            this.$content.empty();
        this.$canvas[0].getContext("2d").clearRect(0, 0, this.$canvas.attr("width"), this.$canvas.attr("height"));
        this.$canvas.attr("width", this.baseSize * this.zoomLevel * this.wS).attr("height", this.baseSize * this.zoomLevel * this.wS);
        this.canvasWidth = this.$canvas.width();
        this.canvasHeight = this.$canvas.height();
        if(this.baseSize * this.zoomLevel * this.wS >= 400)
        {
            this.$canvas.css("margin", 0);
            this.$container.css("overflow", "auto");
            this.padding = 0;
        }
        else
        {
            this.$canvas.css("margin", (400 - this.baseSize * this.zoomLevel * this.wS) / 2);
            this.$container.css("overflow", "hidden");
            this.padding = (400 - this.baseSize * this.zoomLevel * this.wS) / 2;
        }

        var self = this;
        if(isDefined(now) && now)
        {
            if(self.options.centerOnFirstCity)
            {
                var xStart =  self.wS / 2 - self.xOrigin; if(xStart < 1) xStart += self.wS; if(xStart > self.wS) xStart -= self.wS;
                var yStart =  self.wS / 2 - self.yOrigin; if(yStart < 1) yStart += self.wS; if(yStart > self.wS) yStart -= self.wS;

                $.each(this.cache, function(i, r)
                    {
                        self._drawRegion(r, xStart, yStart);
                    }
                );
            }
            else
            {
                $.each(this.cache, function(i, r)
                    {
                        self._drawRegionWithoutCenter(r);
                    }
                );
            }
            
        }
    },

    _drawRegion : function(region, xStart, yStart)
    {
        xStart--; yStart--;
        var self = this;

        var x = (region.x - 1 + xStart) * self.coeff;
        if(x > self.canvasWidth) x -= self.canvasWidth;
        var y = (region.y - 1 + yStart) * self.coeff;
        if(y > self.canvasHeight) y -= self.canvasHeight;
        this.$canvas.drawRect(
            {
                fillStyle: getColor(hasProperty(region, "c") ? region.c : self.cache[region.ref].c),
                x: x,
                y: y,
                width: self.coeff,
                height: self.coeff,
                fromCenter: false
            }
        );
    },

    _drawRegionWithoutCenter : function(region)
    {
        var self = this;
        this.$canvas.drawRect(
            {
                fillStyle: getColor(hasProperty(region, "c") ? region.c : self.cache[region.ref].c),
                x: (region.x - 1) * self.coeff,
                y: (region.y - 1) * self.coeff,
                width: self.coeff,
                height: self.coeff,
                fromCenter: false
            }
        );
    },

    _initRequests : function()
    {
        this.intervalRequest = setInterval((function(self) { return function() { self._doRequest(); } })(this), 25 * 60 * 1000);
        this._doRequest();
    },

    _doRequest : function()
    {
        if(this.coords.length == 0)
        {
            MMHKPLUS.clearInterval(this.intervalRequest); 
            this.intervalRequest = null;
            return;
        }

        var c = this.coords[Math.floor(Math.random() * this.coords.length)];
        this.coords.remove(c);
        MMHKPLUS.getElement("Ajax").getWorldmap(c.x, c.y, this.options.hop, this.options.hop, this._extractAndSend);
    },

    _extractAndSend : function(json)
    {
        var self = MMHKPLUS.getElement("Cartographer");
        var regions = json.d[Object.keys(json.d)[0]].attachedRegionList;
        var toSend = [];
        regions.forEach(function(r)
            {
                self.cache[r.x + "_" + r.y] = 
                    {
                        f : (hasProperty(r, "fctN") ? MMHKPLUS.factions.indexOf(r.fctN) : -1),
                        d : (hasProperty(r, "dL") ? r.dL : -1),
                        cN : (hasProperty(r, "cN") ? "" + r.cN : ""),
                        pN : (hasProperty(r, "pN") ? "" + r.pN : ""),
                        aN : (hasProperty(r, "iAN") ? "" + r.iAN : ""),
                        pId : (hasProperty(r, "pId") ? r.pId : -1),
                        aId : (hasProperty(r, "_iaId") ? r._iaId : -1),
                        g : (hasProperty(r, "hG") ? r.hG : -1),
                        pbId : (hasProperty(r, "pBgNb") ? r.pBgNb : -1),
                        ppId : (hasProperty(r, "pPNb") ? r.pPNb : -1),
                        piId : (hasProperty(r, "pINb") ? r.pINb : -1),
                        t : r.type,
                        c : (hasProperty(r, "_iaCol") ? r._iaCol : (hasProperty(r, "_ipCol") ? r._ipCol : -1)),
                        x : r.x,
                        y : r.y,
                        rB : (hasProperty(r, "rB") ? r.rB.rBE.tN : ""),
                        a : hasProperty(r, "iN") && r.iN == true
                    };
                toSend.push(self.cache[r.x + "_" + r.y]);
                // if(self.options.opened)
                //     self._drawRegion(self.cache[r.x + "_" + r.y], 1, 1);
                if(hasProperty(r, "aRL"))
                {
                    r.aRL.forEach(function(a)
                        {
                            if(!hasProperty(self.cache, a[0] + "_" + a[1]))
                            {
                                self.cache[a[0] + "_" + a[1]] = {x : a[0], y: a[1], ref : r.x + "_" + r.y};
                                // if(self.options.opened)
                                //     self._drawRegion(self.cache[a[0] + "_" + a[1]], 1, 1);
                                toSend.push(self.cache[a[0] + "_" + a[1]]);
                            }
                        }
                    );
                }
            }
        );
        MMHKPLUS.getElement("Ajax").sendCartographerData(toSend);
    },

    _hasInfluence : function(region)
    {
        return hasProperty(region, "c") && region.c != -1;
    },

    _hasCity : function(region)
    {
        return hasProperty(region, "cN") && ("" + region.cN).trim() != "";
    },

    _isInactive : function(region)
    {
        return this._hasCity(region) && hasProperty(region, "a") && region.a;
    },

    _hasGrail : function(region)
    {
        return this._hasCity(region) && hasProperty(region, "g") && region.g == 1;
    },

    _hasRegionBuilding : function(region)
    {
        return hasProperty(region, "rB") && region.rB.trim() != "";
    },

    _hasDecoration : function(region)
    {
        return hasProperty(region, "t") && region.t != "plain";
    },
    
    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
        MMHKPLUS.clearInterval(this.intervalRequest); 
        this.intervalRequest = null;
        delete this.cache;
        MMHKPLUS.clearInterval(this.intervalPos);
        this.intervalPos = null;
    }
});
MMHKPLUS.Chat = MMHKPLUS.PanelElement.extend({
	elementType : "Chat",
	originalAddToLog : null,
    originalShowLatest : null,
	chatRequest : null,
    cache : {},
	
	options : {
		title : "",
		resizable : true,
		opened : false,
		x : "center",
		y : "center",
		w : 450,
		h : 300,
		savePos : true,
		saveWidth : true,
		saveHeight : true,
		saveOpened : true,
		injected : false,
		allianceTab : "MMHK_Alliance",
		ulHeight : 31,
		inputHeight : 60
	},
	
	init : function(options)
	{
        var self = this;
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("CHAT");
		this.$elem = $("<div>");
		
		this.chatRequest = new MMHKPLUS.HOMMK.JsonRequestHandler(MMHKPLUS.HOMMK.CHAT_URL,{});

		this._setupPanel();

        this.originalShowLatest = MMHKPLUS.HOMMK.Chat.prototype.showLatest;
        MMHKPLUS.HOMMK.Chat.prototype.showLatest = injectAfter(MMHKPLUS.HOMMK.Chat.prototype.showLatest, function()
            {
                if(!self.options.opened && MMHKPLUS.getElement("EnhancedUI").options.chatType == 2)
                {
                    $("div.chatsystemmincontainer").removeClass("hidden").css("width", "1px");
                    $("div.chatsystemmin").addClass("hidden");
                    setTimeout(function() { $("div.chatsystemmincontainer").addClass("hidden").css("width", "");; $("div.chatsystemmin").removeClass("hidden"); }, 10000);
                }
            }
        );
		
		return this;
	},

	onSetup : function()
	{
		var self = this;
		this.$elem.dialog(
			{
				minWidth: 250,
                minHeight: 250
			}
		).css(
			{
				overflow : "hidden"
			}
		);
	},
	
	onOpen : function()
	{
		$("div.toolbarBg").children().find("div.MMHKPLUS_UiChatButton").toggleClass("hidden");
		this._createView();
		this._initChatContent();
		this._inject();
        $("div.chatsystemmincontainer").addClass("hidden");
	},
	
	onResize : function()
	{
		this._adjustHeight(this.$elem.find("ul.MMHKPLUS_ChatContent"));
		this._scrollToBottom();
	},
	
	onClose : function()
	{
		this._inject();
		$("div.toolbarBg").children().find("div.MMHKPLUS_UiChatButton").toggleClass("hidden");
	},
	
	_createView : function()
	{
		var self = this;
		this.$elem.empty();
		this.$elem.append($("<ul>"));
		this.$elem.tabs(
			{
				closable : true,
				
				add : function(e, ui)
				{
					self.options.ulHeight = self.$elem.find("ul")[0].offsetHeight || self.options.ulHeight;
					self._adjustHeight(self.$elem.find("ul.MMHKPLUS_ChatContent"));
					self._scrollToBottom();
				},

				select : function(e, ui)
				{
                    self.$elem.find("ul > li > a[href=#" + ui.panel.id + "]").parent().removeClass("MMHKPLUS_ChatNewMessage");
					self._getTextArea().appendTo($("#" + ui.panel.id));
					self._scrollToBottom();
					self._getTextArea().focus();
				},
				
				show : function(e, ui)
				{
					self._getTextArea().appendTo($("#" + ui.panel.id));
					self._scrollToBottom();
					self._getTextArea().focus();
				},
				
				remove: function(e, ui)
				{
					self.options.ulHeight = self.$elem.find("ul")[0].offsetHeight || self.options.ulHeight;
					self._adjustHeight(self.$elem.find("ul.MMHKPLUS_ChatContent"));
					self._scrollToBottom();	
				}
			}
		);

        $("<div/>").html(MMHKPLUS.localize("NEW_CHAT")).button().css(
            {
                "position" : "absolute",
                "top" : "4px",
                "right" : "30px"
            }
        ).bind("click", function()
            {
                var container = $("<div/>").appendTo(self.$elem.parent().find(".ui-dialog-titlebar"));
                container.css(
                    {
                        "position" : "absolute",
                        "top" : "20px",
                        "right" : "30px",
                        "width" : "175px",
                        "height" : "70px",
                        "background" : "rgba(0,0,0,0.75)",
                        "border" : "1px solid #FFFFFF",
                        "border-radius" : "10px",
                        "cursor" : "default",
                        "text-align" : "center",
                        "z-index" : self.$elem.parent().css("z-index") + 1
                    }
                );
                
                var $input = $('<input value="' + MMHKPLUS.localize("PLAYER_NAME") + '" style="width:130px;top:10px;font-style: italic;margin-top:10px;margin-bottom:10px;"/>').bind("click", function()
                    {
                        if($(this).val() == MMHKPLUS.localize("PLAYER_NAME"))
                            $(this).val("");
                        $(this).focus();
                    }
                ).focus().bind("keypress", function()
                    {
                        if($(this).val() == MMHKPLUS.localize("PLAYER_NAME"))
                            $(this).val("");
                    }
                ).autocomplete({source:[]})
                .bind("keyup", function(e)
                    {
                        var names = [];
                        if($(this).val().length > 1)
                            $.get(
                                "http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/playerNameAutocompletion?start=" + $(this).val(),
                                function(data)
                                    {
                                        names = JSON.parse(data);
                                        $input.autocomplete({source:names});
                                    }
                            );
                        if (e.which != 13) 
                        {
                            return;
                        } 
                        e.preventDefault();

                        if($input.autocomplete("option", "source").length == 0)
                            return;
                        
                        $.get(
                            "http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/playerNameAutocompletion?start=" + $(this).val(),
                            function(data)
                                {
                                    var n = JSON.parse(data) || [];
                                    $input.autocomplete({source:n});
                                    if(n.length >= 1 && $input.val().trim().length >= 3 && n[0] == $input.val().trim())
                                    {
                                        self._getChatTab($input.val(), $input.val(), true);
                                        $input.val("");
                                        $input.autocomplete({source:[]});
                                        names = [];
                                        container.empty();
                                        container.remove();
                                        container = null;
                                    }
                                }
                        );

                        return false;
                    }
                ).appendTo(container);

                var buttons = $("<span/>").appendTo(container);
                $("<div/>").html(MMHKPLUS.localize("OPEN")).button().bind("click", function()
                    {
                        if($input.val().length >= 3)
                        {
                            self._getChatTab($input.val(), $input.val(), true);
                            $input.val("");
                            $input.autocomplete({source:[]});

                            container.empty();
                            container.remove();
                            container = null;
                        }
                    }
                ).appendTo(buttons);
                var buttons = $("<span/>").appendTo(container);
                $("<div/>").html(MMHKPLUS.localize("CANCEL")).button().bind("click", function()
                    {
                        container.empty();
                        container.remove();
                        container = null;
                    }
                ).appendTo(buttons);

                $input.focus();
                
            }
        ).appendTo(self.$elem.parent().find(".ui-dialog-titlebar"));

		this._getChatTab(this.options.allianceTab, MMHKPLUS.localize("ALLIANCE"));
	},
	
	_inject : function()
	{
		var self = this;
		if(!this.options.injected)
		{
			this.originalAddToLog = MMHKPLUS.HOMMK.Chat.prototype.addToLog;
            // this.originalShowLatest = MMHKPLUS.HOMMK.Chat.prototype.showLatest;
			MMHKPLUS.HOMMK.Chat.prototype.addToLog = injectAfter(MMHKPLUS.HOMMK.Chat.prototype.addToLog, self._messageAdded);
            // MMHKPLUS.HOMMK.Chat.prototype.showLatest = injectAfter(MMHKPLUS.HOMMK.Chat.prototype.showLatest, function()
            //     {
            //         if(!self.options.opened)
            //         {
            //             $("div.chatsystemmincontainer").removeClass("hidden");
            //             setTimeout(function() { $("div.chatsystemmincontainer").addClass("hidden"); console.log("done"); }, 7000);
            //         }
            //     }
            // );
		}
		else
		{
            // MMHKPLUS.HOMMK.Chat.prototype.showLatest = this.originalShowLatest;
            MMHKPLUS.HOMMK.Chat.prototype.addToLog = this.originalAddToLog;
			this.originalAddToLog = null;
		}
		this.options.injected = !this.options.injected;
	},
	
	_initChatContent : function()
	{
		var self = this;
		var messages = MMHKPLUS.getElement("Player").getChatMessages();
		
		messages.forEach(function(message)
			{
				self._messageAdded("", message, true);
			}
		);
		this.$elem.tabs("select", 0);
		this._getChatTab(this.options.allianceTab, MMHKPLUS.localize("ALLIANCE")).append(self._getTextArea());
		this.$elem.trigger("resize");
	},
	
	_messageAdded : function(a, message, isFirst)
	{
		var self = MMHKPLUS.getElement("Chat");
		var $msgBox = null;
        var name = "";
		var blink = false;
		if(message.type == "alliance")
		{
			$msgBox = self._getChatContent(self.options.allianceTab, MMHKPLUS.localize("ALLIANCE"));
			blink = self._getSelectedChatTab().attr("id").indexOf(self.options.allianceTab) == -1
						&& message.from_playerId != MMHKPLUS.getElement("Player").get("playerId");
            name = self.options.allianceTab;
		}
		else if(message.type == "p2p")
		{
			if(message.from_playerId == MMHKPLUS.getElement("Player").get("playerId"))
			{
				$msgBox = self._getChatContent(message.to_playerName, message.to_playerName);
                name = message.to_playerName;
			}
			else
			{
				$msgBox = self._getChatContent(message.from_playerName, message.from_playerName);
                name = message.from_playerName;
				blink = self.cache[self._getSelectedChatTab().attr("id").replace("MMHKPLUS_ChatTab_", "")].to != message.from_playerName;
			}
		}
		
		if($msgBox)
		{
			blink = blink && (!isDefined(isFirst) || !isFirst);
			$msgBox.append(self._messageRenderer(message));
			if(blink)
			{
                self.cache[self._normalizeName(name)].selector.addClass("MMHKPLUS_ChatNewMessage");
			}
		}
		self._scrollToBottom();
		
	},
	
	_messageRenderer : function(message)
	{
		var self = this;
		var $content = $("<li style='display:block;'>").addClass("MMHKPLUS_ChatMessage");
		var d = new Date(); d.setTime(message.sentDate * 1000);
        var messageContent = message.text.replace(new RegExp("(((f|ht){1}tp(s)?://)[-a-zA-Z0-9@:%_\+.~#?&//=]+)", "gi"),"<a href='$1' target='_blank' style='color:blue;'>$1</a> ");
		messageContent = messageContent.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*\-\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");
        messageContent = messageContent.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*\.\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");
        messageContent = messageContent.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*:\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");     
        messageContent = messageContent.replace(new RegExp("(\\(\\s*([0-9]{1,3})\\s*\,\\s*([0-9]{1,3}\\s*)\\))", "gi"), "<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.centerOn($2, $3, false);'>$1</span>");
        messageContent = messageContent.replace(/MMHKPLUS_ScoutPL\(([0-9]+),([A-Za-z0-9_\-\s'"\?\!\w]+)\)/,"<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.getElement(\"Ajax\").getSpyReportContent($1);'>$2</span>");
        messageContent = messageContent.replace(/MMHKPLUS_HeroPL\(([0-9]+),([0-9]+),([A-Za-z0-9_\-\s'"\?\!\w]+)\)/,"<span style='color:blue;cursor:pointer;' onClick='MMHKPLUS.openDisplayable(\"AllianceHeroes\");MMHKPLUS.getElement(\"AllianceHeroes\")._loadHero($1,$2);'>$3</span>");
        $content
			.append(
				MMHKPLUS.getPlayerAvatar(message.from_backgroundNb, message.from_patternNb, message.from_iconNb)
					.css({"float": "left", marginRight:"10px"}))
			.append(
				$("<span>")
					.css({fontWeight:"bold", cursor:"pointer"})
					.html(message.from_playerName)
					.click(function()
						{
							self._getChatContent(message.from_playerName, message.from_playerName, true);
						}))
			.append(
				$("<span>")
					.css({fontSize:"90%", fontStyle:"italic", "float":"right", marginRight:"10px"})
					.html(d.toHoursMinFormat()))
			.append($("<br>"))
			.append(
				$("<p>")
					.css({wordWrap : "break-word", marginTop:"5px", marginBottom:"5px", paddingLeft: "50px"})
					.html(messageContent));
		return $content;
	},

	_sendMessage : function(text)
	{
		var self = this;
        var infoPlayer = this.cache[this._getSelectedChatTab().attr("id").replace("MMHKPLUS_ChatTab_", "")];
		var data = 
			{
				text : text,
				to: infoPlayer.to || "",
				type: infoPlayer.type || "alliance"
			}
		;
		this.chatRequest.send(data);
	},
	
	_getChatTab : function(id, label, select)
	{
		if(!isDefined(select))
		{
			select = false;
		}
		var self = MMHKPLUS.getElement("Chat");
		var nId = this._normalizeName(id);
		var $tab = $("#MMHKPLUS_ChatTab_" + nId);
		if($tab.length == 0)
		{
			this.$elem.tabs("add", "#MMHKPLUS_ChatTab_" + nId, label);
			this.options.ulHeight = this.$elem.find("ul")[0].offsetHeight || this.options.ulHeight;
			$tab = $("#MMHKPLUS_ChatTab_" + nId);
            self.cache[nId] = 
                {
                    type : (nId == self.options.allianceTab ? "alliance" : "p2p"),
                    to : label,
                    selector : self.$elem.find("ul > li > a[href=#MMHKPLUS_ChatTab_" + nId + "]").parent()
                };
			$tab.css({padding : ".2em .2em 0"})
				.append(
					$("<ul>").addClass("MMHKPLUS_ChatContent"))
			this._adjustHeight($tab.find("ul.MMHKPLUS_ChatContent"));
		}
		if(select)
		{
			this.$elem.tabs("select", $tab.attr("id"));
		}
		return $tab;
	},
	
	_getChatContent : function(id, label, select)
	{
		return this._getChatTab(id, label, select).find("ul:first");
	},
	
	_getSelectedChatTab : function()
	{
        return $(this.$elem.find("ul:first > li.ui-tabs-active.ui-state-active > a").attr("href"));
	},
	
	_getTextArea : function()
	{
		var self = this;
		var $ta = this.$elem.find("textarea.MMHKPLUS_ChatTextArea");
		if($ta.length == 0)
		{
			$ta = $("<textarea>").addClass("MMHKPLUS_ChatTextArea")
				.css({"font-size" : "100%"})
				.keyup(function(e)
					{
						if (e.which != 13) 
						{
							return;
						} 
						e.preventDefault();
						if(!(!$ta.val() || /^\s*$/.test($ta.val())))
						{
							self._sendMessage($ta.val());
							$ta.val("");
						}
					}); 
		}
		$ta.focus();
		return $ta;
	},
	
	_selectedChatTabNumber : function()
	{
		return this.$elem.tabs("option", "selected");
	},
	
	_scrollToBottom : function()
	{
		$.each(this.$elem.find("ul.MMHKPLUS_ChatContent"), function()
			{
				$(this).scrollTop($(this)[0].scrollHeight);
			}
		);
	},
	
	_normalizeName : function(name)
	{
		var forbid = 
			[
				" ", "	", "'"
			];
		var result = name;
		forbid.forEach(function(f)
			{
				result = result.split(f).join("_");
			}
		);
		return result;
	},
	
	_adjustHeight : function($selector)
	{
		var self = this;
		var $parent = $selector.parent();
		$selector.css({height : $parent.parent().height() - self.options.ulHeight - self.options.inputHeight - 5});
	},
	
	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
		destroy(this.openedChats); this.openedChats = null;
	}
	
});
MMHKPLUS.Distances = MMHKPLUS.PanelElement.extend({
	elementType : "Distances",
	intervalRefresh : null,
	lastPosX : -1,
	lastPosY : -1,
	
	options : {
		title : "",
		resizable : true,
		opened : false,
		x : "center",
		y : "center",
		w : 300,
		h : 300,
		savePos : true,
		saveWidth : false,
		saveHeight : true,
		saveOpened : true,
		refresh : 1000,
		images : MMHKPLUS.URL_IMAGES + "side/"
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("DISTANCES");
		this.$elem = $("<div>");

		this._setupPanel();
		
		return this;
	},
	
	onSetup : function()
	{
		var self = this;
		this.$elem.dialog(
			{
				minWidth : self.options.w,
				maxWidth: self.options.w
			}
		);
	},
	
	onOpen : function()
	{
		this.intervalRefresh = setInterval((function(self) { return function() { self._createView(); } })(this), this.options.refresh);
		this._createView();
	},
	
	onClose : function()
	{
		MMHKPLUS.clearInterval(this.intervalRefresh);
		this.intervalRefresh = null;
        this.lastPosX = -1;
        this.lastPosY = -1;
	},
	
	_createView : function()
	{
		var self = this;
		var player = MMHKPLUS.getElement("Player");
		var currentX = player.getCurrentViewX();
		var currentY = player.getCurrentViewY();
		
		if(this.lastPosX != currentX || this.lastPosY != currentY)
		{
			this.lastPosX = currentX;
			this.lastPosY = currentY;
			
			this.$elem.empty();
			var $table = $("<table>")
				.addClass("MMHKPLUS_Table MMHKPLUS_100Width MMHKPLUS_WhiteBorder MMHKPLUS_TextCenter")
				.css({borderCollapse : "collapse"})
				.appendTo(this.$elem);
			$("<tr>\
				<td class='MMHKPLUS_Cell MMHKPLUS_WhiteBorder' style='padding:3px;width:120px;'><b>" + MMHKPLUS.localize("CITY") + "</b></td>\
				<td class='MMHKPLUS_Cell MMHKPLUS_WhiteBorder' style='padding:3px;font-size:80%'>" + MMHKPLUS.localize("SQUARES") + "</td>\
				<td class='MMHKPLUS_Cell MMHKPLUS_WhiteBorder' style='padding:3px;'><img style='width:20px;height:20px' src='" + self.options.images + "hero.png'/></td>\
				<td class='MMHKPLUS_Cell MMHKPLUS_WhiteBorder' style='padding:3px;'><img style='width:20px;height:20px' src='" + self.options.images + "army.png'/></td>\
				<td class='MMHKPLUS_Cell MMHKPLUS_WhiteBorder' style='padding:3px;'><img style='width:20px;height:20px' src='" + self.options.images + "caravan.png'/></td>\
			</tr>").appendTo($table);
			
			var cities = player.getCities();
			cities.forEach(function(city)
				{
					var $line = $("<tr/>").appendTo($table);
					
					var dist = MMHKPLUS.distance(city.content.x, city.content.y, currentX, currentY);
					
					$("<td style='padding:3px;'>")
						.addClass("MMHKPLUS_Cell MMHKPLUS_WhiteBorder")
						.css({cursor : "pointer"})
						.html("<b>" + city.content.cityName + "</b>")
						.click(function()
							{
								MMHKPLUS.centerOn(city.content.x, city.content.y);
							})
						.appendTo($line);
					
					$("<td style='width:15px;padding:3px;'/>")
						.addClass("MMHKPLUS_Cell MMHKPLUS_WhiteBorder")
						.html(parseInt(dist))
						.appendTo($line);
						
					$("<td style='width:15px;padding:3px;'/>")
						.addClass("MMHKPLUS_Cell MMHKPLUS_WhiteBorder")
						.html("...")
						.mouseenter(function(e)
							{
								$(this).css({"width" : "80px;", "font-size" : "90%"});
								$(this).html(MMHKPLUS.hoursToCountdown(dist/12));
							})
						.mouseleave(function(e)
							{
								$(this).css({"width" : "15px;", "font-size" : "90%"});
								$(this).html("...");
							})
						.appendTo($line);
					
					$("<td style='width:15px;padding:3px;'/>")
						.addClass("MMHKPLUS_Cell MMHKPLUS_WhiteBorder")
						.html("...")
						.mouseenter(function(e)
							{
								$(this).css({"width" : "80px;", "font-size" : "90%"});
								$(this).html(MMHKPLUS.hoursToCountdown(dist/4));
							})
						.mouseleave(function(e)
							{
								$(this).css({"width" : "15px;", "font-size" : "90%"});
								$(this).html("...");
							})
						.appendTo($line);
					
					$("<td style='width:15px;padding:3px;'/>")
						.addClass("MMHKPLUS_Cell MMHKPLUS_WhiteBorder")
						.html("...")
						.mouseenter(function(e)
							{
								$(this).css({"width" : "80px;", "font-size" : "90%"});
								$(this).html(MMHKPLUS.hoursToCountdown(dist/9.375));
							})
						.mouseleave(function(e)
							{
								$(this).css({"width" : "15px;", "font-size" : "90%"});
								$(this).html("...");
							})
						.appendTo($line);
				}
			);
		}
	},
	
	unload : function()
	{
		MMHKPLUS.clearInterval(this.intervalRefresh);
		this.intervalRefresh = null;
		MMHKPLUS.resetElement(this.$elem);
	}
});
MMHKPLUS.Maintenance = MMHKPLUS.PanelElement.extend({
    elementType : "Maintenance",
    costMatrice : [],
    
    options : {
        title : "",
        resizable : false,
        opened : false,
        x : "center",
        y : "center",
        w : 350,
        h : 310,
        savePos : true,
        saveWidth : false,
        saveHeight : false,
        saveOpened : true
    },
    
    init : function(options)
    {
        this.options = $.extend({}, this.options, options);
        this.options.title = MMHKPLUS.localize("MAINTENANCE");
        this.$elem = $("<div>");

        var prev = 0;
        for(var i = 0 ; i < 16 ; i++)
            this.costMatrice.push((prev = prev + 0.015));
        for(var i = 0 ; i < 16 ; i++)
            this.costMatrice.push((prev = prev + 0.025));
        for(var i = 0 ; i < 250 ; i++)
            this.costMatrice.push((prev = prev + 0.04));

        this._setupPanel();
        
        return this;
    },

    onOpen : function()
    {
        this._createView();
    },

    onSetup : function()
    {
        this.$elem.css("text-align", "center");
    },

    _createView : function()
    {
        var self = this;
        $("<p>").html(MMHKPLUS.localize("MAINTENANCE_W")).css("color", "#33CCFF").appendTo(this.$elem);
        $("<br>").appendTo(this.$elem);

        $("<label>")
            .html(MMHKPLUS.localize("ARMY_POWER") + " : ")
            .appendTo(this.$elem);
        var $inputPower = $("<input>")
            .attr("maxLength", 8)
            .keyup(function() {self._updateMaintenance.call(self, self)})
            .css("width", "120px")
            .appendTo(this.$elem);
        $("<br>").appendTo(this.$elem);

        $("<label>")
            .html(MMHKPLUS.localize("CITY_BUILDING") + " : ")
            .appendTo(this.$elem);
        var $selectBuilding = $("<select>")
            .change(function() {self._updateMaintenance.call(self, self)})
            .append(
                $("<option>").attr("value", 0).html(MMHKPLUS.localize("CITY_0")))
            .append(
                $("<option>").attr("value", 1).html(MMHKPLUS.localize("CITY_1")))
            .append(
                $("<option>").attr("value", 2).html(MMHKPLUS.localize("CITY_2")))
            .append(
                $("<option>").attr("value", 3).html(MMHKPLUS.localize("CITY_3")))
            .appendTo(this.$elem);
        $("<br>").appendTo(this.$elem);

        $("<label>")
            .html(MMHKPLUS.localize("LANDLORD") + " : ")
            .appendTo(this.$elem);
        var $selectLandlord = $("<select>")
            .change(function() {self._updateMaintenance.call(self, self)})
            .append(
                $("<option>").attr("value", 0).html(MMHKPLUS.localize("LEVEL") + " 0"))
            .append(
                $("<option>").attr("value", 1).html(MMHKPLUS.localize("LEVEL") + " 1"))
            .append(
                $("<option>").attr("value", 2).html(MMHKPLUS.localize("LEVEL") + " 2"))
            .append(
                $("<option>").attr("value", 3).html(MMHKPLUS.localize("LEVEL") + " 3"))
            .appendTo(this.$elem);
        $("<br>").appendTo(this.$elem);

        $("<label>")
            .html(MMHKPLUS.localize("MUSE") + " : ")
            .appendTo(this.$elem);
        var $selectLandlord = $("<select>")
            .change(function() {self._updateMaintenance.call(self, self)})
            .append(
                $("<option>").attr("value", 0).html(MMHKPLUS.localize("LEVEL") + " 0"))
            .append(
                $("<option>").attr("value", 1).html(MMHKPLUS.localize("LEVEL") + " 1"))
            .append(
                $("<option>").attr("value", 2).html(MMHKPLUS.localize("LEVEL") + " 2"))
            .append(
                $("<option>").attr("value", 3).html(MMHKPLUS.localize("LEVEL") + " 3"))
            .appendTo(this.$elem);
        $("<br>").appendTo(this.$elem);

        $("<label>")
            .html(MMHKPLUS.localize("FIELDS") + " : ")
            .appendTo(this.$elem);
        var $selectFields = $("<select>")
            .change(function() {self._updateMaintenance.call(self, self)})
            .css("width", "120px")
            .appendTo(this.$elem);
        $("<br>").appendTo(this.$elem);

        $("<label>")
            .html(MMHKPLUS.localize("SPHINX") + " : ")
            .appendTo(this.$elem);
        var $selectSphinx = $("<select>")
            .change(function() {self._updateMaintenance.call(self, self)})
            .css("width", "120px")
            .appendTo(this.$elem);
        $("<br>").appendTo(this.$elem);

        $("<label>")
            .html(MMHKPLUS.localize("GRAIL") + " : ")
            .appendTo(this.$elem);
        var $selectGrail = $("<select>")
            .change(function() {self._updateMaintenance.call(self, self)})
            .css("width", "120px")
            .append(
                $("<option>").attr("value", 0).html(MMHKPLUS.localize("NO")))
            .append(
                $("<option>").attr("value", 1).html(MMHKPLUS.localize("YES")))
            .appendTo(this.$elem);
        $("<br>").appendTo(this.$elem);
        $("<br>").appendTo(this.$elem);

        var $result = $("<p>")
            .html(MMHKPLUS.localize("MAINTENANCE") + " : 0")
            .css("font-size", "120%")
            .appendTo(this.$elem);

        for(var i = 0; i< 11; i++)
        {
            $selectFields.append($("<option>").attr("value", i).html(i));
            $selectSphinx.append($("<option>").attr("value", i).html(i));
        }

        this.$elem.children().css("margin-top", "5px");
    },

    _updateMaintenance : function(self)
    {
        var $selector = self.$elem;

        var power = parseInt($selector.find("input:first").val() || "0") || 0;
        var building = parseInt($selector.find("select").eq(0).val() || "0") || 0;
        var landlord = parseInt($selector.find("select").eq(1).val() || "0") || 0;
        var muse = parseInt($selector.find("select").eq(2).val() || "0") || 0;
        var fields = parseInt($selector.find("select").eq(3).val() || "0") || 0;
        var sphinx = parseInt($selector.find("select").eq(4).val() || "0") || 0;
        var grail = (parseInt($selector.find("select").eq(5).val() || "0") == 0 ? 0 : 125000) || 0;

        //var base = [62500, 125000, 281250, 500000];
        var limit = [31250, 75000, 187500, 250000];
        var base = [250000, 500000, 750000, 1000000];

        // var ratio = power / (base[building] * (1 + 0.1 * fields) + grail);
        // var tax = 0;
        // for (i=0; i<ratio; i++)
        // { 
        //     if (i < 16) 
        //         tax += 0.015; 
        //     else if(i < 32) 
        //         tax += 0.025; 
        //     else 
        //         tax += 0.04; 
        // }
        // console.log(ratio);

        var ratio =(1+(power-(base[building]*(1+fields*0.1)))/((base[building]+grail)*(1+fields*0.1)))*base[building];
        //var ratio = (1 + ((power - (base[building] * (1 + 0.1 * fields)))))/(base[building] * (1 + 0.1 * fields)) * base[building];
        var tax = self.costMatrice[Math.floor(ratio/limit[building])-1] || 0.015;

        var bonus = Math.min(sphinx * 0.05 + landlord * 0.03 + muse * 0.05, 0.5);
        var maintenance = tax * power * (1 - bonus);

        if(power <= limit[building] * (1 + 0.1 * fields))
            maintenance = 0;

        var $result = $selector.find("p:last");
        $result
            .html(MMHKPLUS.localize("MAINTENANCE") + " : " + formatNumber(Math.floor(maintenance)));
    },

    unload : function()
    {
        MMHKPLUS.resetElement(this.$elem);
        destroy(this.costMatrice); this.costMatrice = null;
    }
});
MMHKPLUS.MapFinder = MMHKPLUS.PanelElement.extend({
	elementType : "MapFinder",
	
	options : {
		title : "",
		resizable : false,
		opened : false,
		x : "center",
		y : "center",
		w : 460,
		h : 490,
		savePos : true,
		saveWidth : false,
		saveHeight : false,
		saveOpened : true,
		url : "http://www.hommk.net/index.php"
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("MAPFINDER");
		this.$elem = $("<div>");
		this._setupPanel();
		
		return this;
	},
	
	onSetup : function()
	{
		var self = this;
		this.$elem.dialog(
			{
				minWidth : self.options.w,
				maxWidth: self.options.w,
                minHeight : self.options.h,
				maxHeight : self.options.h
			}
		);
		this.$elem.css(
			{
				overflow : "hidden"
			}
		);
	},
	
	onOpen : function()
	{
		this._createView();
	},
	
	_createView : function()
	{
		var player = MMHKPLUS.getElement("Player");
		var worldId = player.get("worldId");
		var curX = player.getCurrentViewX();
		var curY = player.getCurrentViewY();
		var link = this.options.url 
						+ "?SERVER=" + worldId
						+ "&ID="+ MMHKPLUS.getRegionId(curX, curY);
		$("<iframe>").attr("src", link).css(
			{
				position : "relative",
				top : "-200px",
				left : "-150px",
				width : "750px",
				height : "830px"
			}
		).appendTo(this.$elem);
	},
	
	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
	}
});
MMHKPLUS.Marks = MMHKPLUS.PanelElement.extend({
	elementType : "Marks",
    isInjected : false,
	
	options : {
		title : "",
		resizable : false,
		opened : false,
		x : "center",
		y : "center",
		w : 300,
		h : 300,
		savePos : true,
		saveWidth : false,
		saveHeight : false,
		saveOpened : true,
		images : MMHKPLUS.URL_IMAGES + "marks/"
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("MARKS");
		this.$elem = $("<div>");
		this._setupPanel();

        if(!this.isInjected)
        {
            MMHKPLUS.HOMMK.WorldMap.prototype.move = injectAfter(MMHKPLUS.HOMMK.WorldMap.prototype.move, this._updateCoordinates);
            MMHKPLUS.HOMMK.WorldMap.prototype.center = injectAfter(MMHKPLUS.HOMMK.WorldMap.prototype.center, this._updateCoordinates);
            MMHKPLUS.HOMMK.setCurrentView = injectAfter(MMHKPLUS.HOMMK.setCurrentView, this._updateCoordinates);

            this.isInjected = true;
        }
		
		return this;
	},
	
	onSetup : function()
	{
		var self = this;
		this.$elem.dialog(
			{
				minWidth : self.options.w,
				maxWidth: self.options.w,
                minHeight : self.options.h,
				maxHeight : self.options.h
			}
		).css(
			{
				overflow : "hidden"
			}
		);
	},
	
	onOpen : function()
	{
		this._createView();
		this._loadMarks();
	},
	
	_createView : function()
	{
		var self = this;
		this.$elem.empty();
		var $header = $("<div>").css({height : "70px"}).appendTo(this.$elem);

		$("<label>").html("X :")
			.css({paddingRight : "10px"})
			.appendTo($header);
		var $x = $("<input>")
			.css({width : "45px"})
			.appendTo($header);
		
		$("<label>").html("Y :")
			.css({paddingLeft : "10px", marginTop : "10px", paddingRight : "10px"})
			.appendTo($header);
		var $y = $("<input>")
			.css({width : "45px", "margin-top" : "10px"})
			.appendTo($header);
		
		$("<br>").appendTo($header);
		
		$("<label>").html(MMHKPLUS.localize("DESCRIPTION") + " :")
			.css({marginTop : "10px", paddingRight : "10px"})
			.appendTo($header);
		var $desc = $("<input>")
			.attr("maxlength", 25)
			.css({width : "180px", marginTop : "10px"})
			.appendTo($header);
		
		$("<div>").button()
			.html(MMHKPLUS.localize("ADD"))
			.css({position:"relative", top : "-50px", left : "205px", height : "20px", width : "65px", lineHeight : "20px"})
			.click(function()
				{
					var coordx = parseInt($x.val());
					var coordy = parseInt($y.val());
					var description = $desc.val();
					
					$x.val(""); $y.val(""); $desc.val("");
					
					var s = MMHKPLUS.getElement("Player").get("worldSize");
					if(!coordx|| !coordy|| coordx < 1 || coordy < 1 || coordx > s || coordy > s)
					{
						return;
					}
					
					self._addMark(coordx, coordy, description);
					self._loadMarks();
				})
			.appendTo($header);

			
		$("<div>").addClass("MMHKPLUS_MarksContainer")
			.append(
				$("<table cellpadding='3'>").addClass("MMHKPLUS_Table MMHKPLUS_MarksTable"))
			.appendTo(this.$elem);
        this._updateCoordinates();
	},
	
	_addMark : function(x, y, description)
	{
		var store = MMHKPLUS.getElement("Store");
		var marksSName = store.options.prefix + store.options.marksName;
		
		var player = MMHKPLUS.getElement("Player");
		var worldId = player.get("worldId");
		var worldName = player.get("worldName");
		
		var marks = store.get(marksSName);
		if(!hasProperty(marks, worldId))
		{
			marks[worldId] = 
				{
					id : worldId,
					name : worldName,
					marks : []
				};
		}
		marks[worldId].marks.push(
			{
				date : $.now(),
				x : x,
				y : y,
				d : description
			}
		);
		store.set(marksSName, marks);
	},
	
	_removeMark : function(x, y, date)
	{
		var store = MMHKPLUS.getElement("Store");
		var marksSName = store.options.prefix + store.options.marksName;
		
		var player = MMHKPLUS.getElement("Player");
		var worldId = player.get("worldId");
		
		var marks = store.get(marksSName);
		if(hasProperty(marks, worldId))
		{
			var worldMarks = marks[worldId].marks;
			$.each(worldMarks, function(i)
                {
                    if(worldMarks[i].x == x && worldMarks[i].y == y && worldMarks[i].date == date)
                    {
                        worldMarks.splice(i,1);
                        return false;
                    }
                }
            );
			store.set(marksSName, marks);
		}
	},
	
	_loadMarks : function()
	{
		var self = this;
		var $table = this.$elem.find("table");
		$table.empty();
		
		var store = MMHKPLUS.getElement("Store");
		var marksSName = store.options.prefix + store.options.marksName;
		
		var player = MMHKPLUS.getElement("Player");
		var worldId = player.get("worldId");
		
		var marks = store.get(marksSName);
		if(hasProperty(marks, worldId))
		{
			var worldMarks = marks[worldId].marks;
			worldMarks.forEach(function(mark)
				{
					var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
					
					$("<td style='width:15px;'/>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
						.html("<img src='" + self.options.images + "delete.png' style='width:12px;height:12px;cursor:pointer;'/>")
						.click(function()
							{
								self._removeMark(mark.x, mark.y, mark.date);
								self._loadMarks();
							})
						.appendTo($line);
					$("<td style='width:65px;font-weight:bold;cursor:pointer;'/>")
						.addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
						.html("(" + mark.x + "," + mark.y + ")")
						.click(function()
							{
								MMHKPLUS.centerOn(mark.x, mark.y);
							})
						.appendTo($line);
					$("<td style='width:190px;'>").addClass("MMHKPLUS_Cell")
						.html(mark.d)
						.appendTo($line);
				}
			);
		}
	},

    _updateCoordinates : function()
    {
        var self = MMHKPLUS.getElement("Marks");
        if(self.options.opened)
        {
            setTimeout(function() 
                {
                    var $x = self.$elem.find("input").eq(0);
                    var $y = self.$elem.find("input").eq(1);
                    var $n = self.$elem.find("input").eq(2);
                    var x = MMHKPLUS.HOMMK.currentView.regionX || 1;
                    var y = MMHKPLUS.HOMMK.currentView.regionY || 1;
                    var details = MMHKPLUS.HOMMK.getRegionFromXY(x,y);
                    var n = "";
                    if(hasProperty(details, "content") && hasProperty(details.content, "cN"))
                        n = details.content.cN;
                    $x.val(x); $y.val(y); $n.val(n);
                },
                1200
            );
        }
    },
	
	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
	}
});
MMHKPLUS.Notepad = MMHKPLUS.PanelElement.extend({
	elementType : "Notepad",
	
	options : {
		title : "",
		resizable : false,
		opened : false,
		x : "center",
		y : "center",
		w : 650,
		h : 300,
		savePos : true,
		saveWidth : false,
		saveHeight : false,
		saveOpened : true,
		limit : 500,
		images : MMHKPLUS.URL_IMAGES + "marks/"
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("NOTEPAD");
		this.$elem = $("<div>");
		this._setupPanel();
		
		return this;
	},
	
	onSetup : function()
	{
		var self = this;
		this.$elem.dialog(
			{
				minWidth : self.options.w,
				maxWidth: self.options.w,
				minHeight : self.options.h,
				maxHeight: self.options.h
			}
		).css(
			{
				overflow : "hidden"
			}
		);
	},
	
	onOpen : function()
	{
		this._createView();
		this._loadMemos();
	},
	
	_createView : function()
	{
		var self = this;
		this.$elem.empty();
		
		var $table = $("<table>")
			.addClass("MMHKPLUS_Table MMHKPLUS_100Width")
			.css({height : "100%"})
			.appendTo(this.$elem);
		$("<tr>")
			.addClass("MMHKPLUS_100Width")
			.append(
				$("<td>")
					.css({width : "40%", height : "100%", borderRight : "1px solid #FFFFFF"}))
			.append(
				$("<td>")
					.css({width : "60%", height : "100%"}))
			.appendTo($table);
		
		var $list = this.$elem.find("td:first");
		var $content = this.$elem.find("td:last");
		
		$("<div>").button()
			.html(MMHKPLUS.localize("NEW"))
			.css({position : "absolute", top : "10px", width : "90px", left : "150px", height : "20px", lineHeight : "20px", marginBottom : "10px"})
			.click(function()
				{
					self._createNewMemo();
				})
			.appendTo($list);
		
		$("<div>")
			.css({position : "absolute", top : "40px", width : "235px",  height : "210px", overflowY : "auto", overflowX : "hidden"})
			.append($("<table cellpadding='3'>")
				.addClass("MMHKPLUS_Table MMHKPLUS_WhiteBorder")
				.css({width : "100%"}))
			.appendTo($list);
	},
	
	_createNewMemo : function()
	{
		var self = this;
		var $content = this.$elem.find("td:last");
		$content.empty();
		
		$("<label>")
			.css({ marginLeft : "10px" })
			.html(MMHKPLUS.localize("TITLE"))
			.appendTo($content);
		var $title = $("<input>")
			.css({ marginLeft : "10px", marginRight : "10px", width : "310px", marginBottom : "10px"})
			.attr("maxlength", 25).appendTo($content);
			
		$("<br>").appendTo($content);
		$("<label>")
			.css({ marginLeft : "10px"})
			.html(MMHKPLUS.localize("CONTENT"))
			.appendTo($content);
		$("<br>").appendTo($content);
		
		var $textarea = $("<textarea>")
			.css({marginLeft : "10px",resize : "none", width : "355px", height : "145px", marginBottom : "10px", marginTop : "10px"})
			.attr("maxlength", 500).appendTo($content);
			
		$("<div>").button()
			.html(MMHKPLUS.localize("CANCEL"))
			.css({width : "90px", left : "285px", height : "20px", lineHeight : "20px", marginBottom : "10px"})
			.click(function()
				{
					$content.empty();
				})
			.appendTo($content);
		$("<div>").button()
			.html(MMHKPLUS.localize("ADD"))
			.css({width : "90px", left : "80px", height : "20px", lineHeight : "20px", marginBottom : "10px"})
			.click(function()
				{
					var title = $title.val();
					var content = $textarea.val();
					
					if(title.trim().length > 0 && content.trim().length > 0)
					{
						$title.val("");
						$textarea.val("");
						self._addMemo(title, content);
						self._loadMemos();
						$content.empty();
					}
				})
			.appendTo($content);
		
		var $count = $("<div>")
			.css({position : "absolute", right : "15px", top : "35px", fontStyle : "italic"})
			.html("0/" + self.options.limit)
			.appendTo($content);
		
		$textarea.keyup(function()
			{
				$count.html($textarea.val().length + "/" + self.options.limit);
			}
		);
	},
	
	_addMemo : function(title, content)
	{
		var store = MMHKPLUS.getElement("Store");
		var notepadSName = store.options.prefix + store.options.notepadName;
		
		var player = MMHKPLUS.getElement("Player");
		var worldId = player.get("worldId");
		var worldName = player.get("worldName");
		
		var memos = store.get(notepadSName);
		if(!hasProperty(memos, worldId))
		{
			memos[worldId] = 
				{
					id : worldId,
					name : player.get("worldName"),
					memos : []
				};
		}
		memos[worldId].memos.push(
			{
				date : $.now(),
				title : title,
				content : content
			}
		);
		store.set(notepadSName, memos);
	},
	
	_loadMemos : function()
	{
		var self = this;
		var store = MMHKPLUS.getElement("Store");
		var notepadSName = store.options.prefix + store.options.notepadName;
		
		var player = MMHKPLUS.getElement("Player");
		var worldId = player.get("worldId");
		
		var memos = store.get(notepadSName);
		
		if(hasProperty(memos, worldId))
		{
			var $table = this.$elem.find("td:first").find("table");
			$table.empty();
			memos[worldId].memos.forEach(function(memo)
				{
					var $line = $("<tr>").addClass("MMHKPLUS_100Width").appendTo($table);
					$("<td style='width:15px;'/>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
						.html("<img src='" + self.options.images + "delete.png' style='width:12px;height:12px;cursor:pointer;'/>")
						.click(function()
							{
								self._removeMemo(memo.title, memo.date);
								self._loadMemos();
							})
						.appendTo($line);
					$("<td style='width:65px;font-weight:bold;cursor:pointer;'/>")
						.addClass("MMHKPLUS_Cell")
						.html(memo.title)
						.click(function()
							{
								self._showMemo(memo);
							})
						.appendTo($line);
				}
			);
		}
	},
	
	_removeMemo : function(title, date)
	{
		var $content = this.$elem.find("td:last");
		$content.empty();
		var store = MMHKPLUS.getElement("Store");
		var notepadSName = store.options.prefix + store.options.notepadName;
		
		var player = MMHKPLUS.getElement("Player");
		var worldId = player.get("worldId");
		
		var memos = store.get(notepadSName);
		
		if(hasProperty(memos, worldId))
		{
			var worldMemo = memos[worldId].memos;
			$.each(worldMemo, function(i)
                {
                    if(worldMemo[i].title == title && worldMemo[i].date == date)
                    {
                        worldMemo.splice(i,1);
                        return false;
                    }
                }
            );
			store.set(notepadSName, memos);
		}
	},
	
	_showMemo : function(memo)
	{
		var self = this;
		var $content = this.$elem.find("td:last");
		$content.empty();
		var d = new Date(); d.setTime(memo.date);
		
		var $container = $("<div>")
			.css({width : "355px", height : "225px"})
			.appendTo($content);
		
		$("<p>").addClass("MMHKPLUS_WhiteText")
			.css({marginLeft : "10px", marginTop : "10px", fontWeight : "bold"})
			.html(memo.title)
			.appendTo($container);
		$("<p>").addClass("MMHKPLUS_WhiteText")
			.css({marginLeft : "10px", marginTop : "5px", fontStyle : "italic", fontSize : "90%"})
			.html(d.toShortFrenchFormat())
			.appendTo($container);
		$("<p>").addClass("MMHKPLUS_WhiteText")
			.css({marginLeft : "10px", marginTop : "15px"})
			.html(memo.content)
			.appendTo($container);
	},
	
	unload : function()
	{
		MMHKPLUS.resetElement(this.$elem);
	}
});
MMHKPLUS.Lookout = MMHKPLUS.PanelElement.extend({
	elementType : "Lookout",
	intervalUpdate : null,
	moves : [],
	cachePlayers : {},
	cacheAlliances : {},
    currentPlot : "",
	
	options : {
		title : "",
		resizable : true,
		opened : false,
		x : "center",
		y : "center",
		w : 880,
		h : 350,
		savePos : true,
		saveWidth : false,
		saveHeight : true,
		saveOpened : true,
		refresh : 30000,
		size : 30,
		images : MMHKPLUS.URL_IMAGES + "vigie/"
	},
	
	init : function(options)
	{
		this.options = $.extend({}, this.options, options);
		this.options.title = MMHKPLUS.localize("LOOKOUT");
		this.$elem = $("<div>");
		this._setupPanel();
		
		return this;
	},
	
	onSetup : function()
	{
        var self = this;
		this.$elem.dialog(
			{
				minWidth : self.options.w,
				maxWidth: self.options.w,
                minHeight : 150
			}
		);
	},
	
	onOpen : function()
	{
		var self = this;
		var $filters = $("<div style='padding:5px;text-align:center;'/>").appendTo(this.$elem);
		$("<label>").html(MMHKPLUS.localize("FILTER") + " : ").appendTo($filters);
		$("<input>").css({marginRight : "25px"}).keyup(function() {self._createView.call(self);}).appendTo($filters);

		$("<input>").css({marginTop : "3px", marginRight : "5px"}).attr("type", "checkbox").change(function() {self._createView.call(self);}).appendTo($filters);
		$("<label>").html(MMHKPLUS.localize("HIDE_ALLIANCE")).appendTo($filters);
		
		this.intervalUpdate = setInterval((function(self) { return function() { self._request(); } })(this), this.options.refresh);
		this._request();
	},
	
	onClose : function()
	{
		MMHKPLUS.clearInterval(this.intervalUpdate); this.intervalUpdate = null;
	},
	
	_request : function()
	{
		var player = MMHKPLUS.getElement("Player");
		var worldId = player.get("worldId");
		var s = player.get("worldSize");
		var x = parseInt(((player.getCurrentViewX() - ((this.options.size - 1)/2)) % s) + 1); if(x < 1) x += s;
		var y = parseInt(((player.getCurrentViewY() - ((this.options.size - 1)/2)) % s) + 1); if(y < 1) y += s;
		MMHKPLUS.getElement("Ajax").getHeroMove(worldId, x, y, this.options.size, this.options.size, (function(self) { return function(json) { self._requestAnswer(json); } })(this));
	},
	
	_requestAnswer : function(json)
	{
		this.moves = null;
		this.moves = json.d[Object.keys(json.d)[0]] || [];
		this._createView();
	},
	
	_createView : function()
	{
		var self = this;
		
		this.$elem.find("table").remove();
		
		var player = MMHKPLUS.getElement("Player");
		var filterText = this.$elem.find("input[type!=checkbox]").val().toUpperCase();
		var filterAlliance = this.$elem.find("input[type=checkbox]").is(":checked");
		var filterMoves = $.grep(this.moves, function(item, index)
			{
				return (!player.isInAlliance() 
							|| (player.isInAlliance() && !filterAlliance) 
							|| (player.isInAlliance() && filterAlliance && self._getPlayerInfo(item.masterHeroMove.playerId).allianceName != player.get("allianceName")))
						&& ((self._getPlayerInfo(item.masterHeroMove.playerId).playerName.toUpperCase().indexOf(filterText) != -1)
								|| (self._getPlayerInfo(item.masterHeroMove.playerId).allianceName.toUpperCase().indexOf(filterText) != -1)
								|| (filterText == ""));
			}
		);
		filterMoves.sort(function(m, n)
			{
				return m.masterHeroMove.endDate - n.masterHeroMove.endDate;
			}
		);

		var $table = $("<table>").addClass("MMHKPLUS_Table").appendTo(this.$elem);
		$(
			"<tr>\
				<th class='MMHKPLUS_CellHeader' style='width:200px;'>" + MMHKPLUS.localize("ALLIANCE") + "</th>\
				<th class='MMHKPLUS_CellHeader' style='width:120px;'>" + MMHKPLUS.localize("PLAYER") + "</th>\
				<th class='MMHKPLUS_CellHeader' style='width:80px;'>" + MMHKPLUS.localize("FROM") + "</th>\
				<th class='MMHKPLUS_CellHeader' style='width:80px;'>" + MMHKPLUS.localize("TO") + "</th>\
				<th class='MMHKPLUS_CellHeader' style='width:80px;'>" + MMHKPLUS.localize("NEXT_HALT") + "</th>\
				<th class='MMHKPLUS_CellHeader' style='width:150px;'>" + MMHKPLUS.localize("END") + "</th>\
				<th class='MMHKPLUS_CellHeader' style='width:80px;'>" + MMHKPLUS.localize("HERO") + "</th>\
				<th class='MMHKPLUS_CellHeader' style='width:50px;'>" + MMHKPLUS.localize("SPEED") + "</th>\
                <th class='MMHKPLUS_CellHeader' style='width:50px;'>" + "" + "</th>\
			</tr>"
		).appendTo($table);
		filterMoves.forEach(function(move)
			{
				var playerId = move.masterHeroMove.playerId || 0;
				var startDate = move.masterHeroMove.creationDate;
				var endDate = new Date();
				endDate.setTime(move.masterHeroMove.endDate * 1000);
				var from = { x : parseInt(move.masterHeroMove.x1), y : parseInt(move.masterHeroMove.y1) };
				var to = { x : parseInt(move.masterHeroMove.x2), y : parseInt(move.masterHeroMove.y2) };
				var speedText = "";
				var hasHalt = (move.x2p != to.x || move.y2p != to.y);
				var halt = { };
				if(hasHalt)
				{
					halt.x = parseInt(move.x2p);
					halt.y = parseInt(move.y2p);
				}
				
				if(endDate.getTime() > $.now())
				{
					var data = self._getPlayerInfo(playerId);

					var $line = $("<tr>").appendTo($table);

					$("<td>").addClass("MMHKPLUS_Cell clickable")
						.css({textAlign : "left", paddingLeft : "15px"})
						.addClass("MMHKPLUS_LookoutAlliance" + data.allianceId)
						.append(self._createBlockColor(self, playerId) + data.allianceName)
						.appendTo($line);
					$("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter clickable")
						.addClass("MMHKPLUS_LookoutPlayer" + playerId)
						.click(function() {MMHKPLUS.openPlayerFrame(playerId);})
						.html(data.playerName)
						.appendTo($line);
					$("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter clickable")
						.addClass("MMHKPLUS_Lookout" + from.x + "_" + from.y)
						.html("(" + from.x + "," + from.y + ")")
						.click(function() {MMHKPLUS.centerOn(from.x, from.y);})
						.appendTo($line);
					$("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter clickable")
						.addClass("MMHKPLUS_Lookout" + to.x + "_" + to.y)
						.html("(" + to.x + "," + to.y + ")")
						.click(function() {MMHKPLUS.centerOn(to.x, to.y);})
						.appendTo($line);
					$("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter " + (hasHalt ? "clickable" : ""))
						.html((hasHalt ? "(" + parseInt(halt.x + 0.49) + "," + parseInt(halt.y + 0.49) + ")" : MMHKPLUS.localize("NONE")))
						.click(function() {if(hasHalt) MMHKPLUS.centerOn( halt.x + 0.49, halt.y + 0.49);})
						.appendTo($line);
					$("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
						.html(endDate.toShortFrenchFormat())
						.appendTo($line);
					
					$("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter clickable")
						// .css({width : "45px"})
						.html(move.masterHeroMove.heroId)
						.click(function() {MMHKPLUS.openDisplayable("AllianceHeroes");MMHKPLUS.getElement("AllianceHeroes",true)._loadHero(playerId,move.masterHeroMove.heroId)})
						.appendTo($line);
					
					var diff = move.dur;
					var s = MMHKPLUS.getElement("Player").get("worldSize");
					var dx = Math.abs(move.x2p - move.x1p); var dy = Math.abs(move.y2p - move.y1p);
					if (dx > s / 2) 
					{
						dx = s - dx;
					}
					if (dy > s / 2) 
					{
						dy = s - dy;
					}
					var dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
					var neededTime = dist /4 * 3600;
					
					if(move.x2p == move.x1p && move.y2p == move.y1p)
					{
						$("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
							// .css({width : "45px"})
							.html("<img src='" + self.options.images  + "unknow.png' style='width:15px;height:15px;'/>")
							.appendTo($line);
						speedText = MMHKPLUS.localize("LOOKOUT_SPEED_1");
					}
					else if(neededTime * 0.97 > diff)
					{
						$("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
							// .css({width : "45px"})
							.html("<img src='" + self.options.images  + "increase.png' style='width:15px;height:15px;'/>")
							.appendTo($line);
						speedText = MMHKPLUS.localize("LOOKOUT_SPEED_2");
					}
					else if(neededTime * 0.97 < diff && neededTime * 1.03 > diff)
					{
						$("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
							// .css({width : "45px"})
							.html("<img src='" + self.options.images  + "normal.png' style='width:15px;height:15px;'/>")
							.appendTo($line);
						speedText = MMHKPLUS.localize("LOOKOUT_SPEED_3");
					}
					else if(neededTime * 0.35 < diff)
					{
						$("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
							// .css({width : "45px"})
							.html("<img src='" + self.options.images  + "decrease.png' style='width:15px;height:15px;'/>")
							.appendTo($line);
						speedText = MMHKPLUS.localize("LOOKOUT_SPEED_4");
					}

                    $("<td>").addClass("MMHKPLUS_Cell MMHKPLUS_TextCenter")
                        .click(function() {  })
                        .append(
                            $("<div>")
                                .button()
                                .html("● ● ●")
                                .css("lineHeight", "15px")
                                .css("padding", "2px")
                                .click(function()
                                    {
                                        $("div.MMHKPLUS_LookoutSpot").removeClass("MMHKPLUS_LookoutSpot");
                                        if(self.currentPlot != "HeroMove" + move.id + "Plot")
                                        {
                                            $("div[id^='HeroMove" + move.id + "Plot']").addClass("MMHKPLUS_LookoutSpot");
                                            self.currentPlot = "HeroMove" + move.id + "Plot";
                                        }
                                        else
                                        {
                                            self.currentPlot = "";
                                        }
                                        
                                    }))
                        .appendTo($line);
					
					var $tooltip = MMHKPLUS.getElement("Tooltip", true).setContent($line, function($container, $tip)
						{
							$tip.css({minWidth : "210px"});
							var data = self._getPlayerInfo(playerId);
							if(hasProperty(data, "playerBGNb"))
							{
								var $avatar = MMHKPLUS.getPlayerAvatar(data.playerBGNb, data.playerPatternNb, data.playerIconNb)
									.css( { position : "relative"} )
									.appendTo($tip);
								var pName = data.playerName + " (" + data.allianceName + ")";
								$("<p>")
									.html(pName)
									.css(
										{
											"position" : "relative",
											"width" : "150px",
											"padding-left" : "50px",
											"top" : "-115px",
											"font-weight" : "bold"
										})
									.appendTo($avatar);
								
								$("<p style='margin-top:10px;'/>")
									.html(MMHKPLUS.localize("DOMINATION") + " : " + data.dominationPosition + " (" + formatNumber(data.dominationScore) + ")")
									.appendTo($tip);
								$("<p/>")
									.html(MMHKPLUS.localize("WEALTH") + " : " + data.wealthPosition+ " (" + formatNumber(data.wealthScore) + ")")
									.appendTo($tip);
								$("<p/>")
									.html(MMHKPLUS.localize("HONOR") + " : " + data.honorPosition+ " (" + formatNumber(data.honorScore) + ")")
									.appendTo($tip);
								$("<br/>").appendTo($tip);
								$("<p/>")
									.html(MMHKPLUS.localize("CITY_COUNT") + " : " + data.cityList.length)
									.appendTo($tip);
								var d = new Date(); var tmp = new Date(); tmp.setTime(move.masterHeroMove.endDate * 1000 - d.getTime());
                                var tmp2 = new Date(); tmp2.setTime(d.getTime() - move.masterHeroMove.startDate * 1000);
								var endCD = (d > endDate ? "Terminé" : tmp.countDown());
                                var startCD = tmp2.countDown();
								$("<br/>").appendTo($tip);
								$("<p/>")
									.html(MMHKPLUS.localize("SPEED") + " : " + speedText)
									.appendTo($tip);

                                if(move.endDate != move.masterHeroMove.endDate)
                                {
                                    // var startHalt = new Date() ; startHalt.setTime(move.startDate * 1000);
                                    var endHalt = new Date() ; endHalt.setTime(move.endDate * 1000);
                                    $("<br/>").appendTo($tip);
                                    // $("<p/>")
                                    //     .html(MMHKPLUS.localize("START_HALT") + " : "  + startHalt.toShortFrenchFormat())
                                    //     .appendTo($tip);
                                    $("<p/>")
                                        .html((move.x2p == move.x1p && move.y2p == move.y1p ? MMHKPLUS.localize("END_HALT") : MMHKPLUS.localize("START_HALT")) + " : "  + endHalt.toShortFrenchFormat())
                                        .appendTo($tip);
                                }

								$("<br/>").appendTo($tip);
                                $("<p/>")
                                    .html(MMHKPLUS.localize("STARTED_SINCE") + " : "  + startCD)
                                    .appendTo($tip);
								$("<p/>")
									.html(MMHKPLUS.localize("END_IN") + " : "  + endCD)
									.appendTo($tip);
							}
							
							$tip = null;
							$container = null;
						}
					);
				}
			}
		);
		MMHKPLUS.getElement("Player").getRegions().map(function(r)
			{
				if(r.content && r.content.x && r.content.y)
				{
					if(r.content.cN)
						$(".MMHKPLUS_Lookout" + r.content.x + "_" + r.content.y).html("(" + r.content.x + "," + r.content.y + ")<br/><i>" + r.content.cN + "</i>");
				} 
			}
		);
	},
	
	_createBlockColor : function(self, id)
	{
		var data = self._getPlayerInfo(id);
		var color = "#FFFFFF";
		if(hasProperty(self.cacheAlliances, data.allianceId))
			color = getColor(self.cacheAlliances[data.allianceId].color) || color;
		else
			color = data.color || color;
		return "<div class='MMHKPLUS_Color" 
					+ self._getPlayerInfo(id).allianceId 
					+ "' style='float:left; background-color:" 
					+ color + ";width:14px; height:14px; margin:5px 5px 5px 5px;'>&nbsp&nbsp&nbsp&nbsp&nbsp</div>";
	},
	
	_getPlayerInfo : function(id)
	{
		var self = this;
		if(!hasProperty(this.cachePlayers, id))
		{
			this.cachePlayers[id] = 
				{
					id : id,
					playerName : "?",
					allianceId : "None",
					allianceName : "?",
					color : -1
				}
			;
			MMHKPLUS.getElement("Ajax").getProfileFrame(id, function(json)
				{
					var data = json.d[Object.keys(json.d)[0]];
					self.cachePlayers[id] = data;
					if(hasProperty(data, "allianceName") && !(hasProperty(self.cacheAlliances, data.allianceId)))
					{
						self.cacheAlliances[data.allianceId] = { color : -1 };
						MMHKPLUS.getElement("Ajax").getAllianceFrame(data.allianceId, function(json)
							{
								var aData = json.d[Object.keys(json.d)[0]];
								self.cacheAlliances[data.allianceId] = aData;
								self.cachePlayers[id].color = aData.color;
								self._updateDisplayedInformations(self, self.cachePlayers[id].id);
							}
						);
					}
					else if(!hasProperty(data, "allianceName"))
					{
						self.cachePlayers[id].allianceName = MMHKPLUS.localize("NONE");
					}
					self._updateDisplayedInformations(self, self.cachePlayers[id].id);
				}
			);
		}
		return this.cachePlayers[id];
	},
	
	_updateDisplayedInformations : function(self, id)
	{
		var data = self.cachePlayers[id];
		self.$elem.find("td.MMHKPLUS_LookoutPlayer" + id)
			.parent()
			.find("td:first")
			.removeClass()
			.addClass("MMHKPLUS_Cell clickable MMHKPLUS_LookoutAlliance" + data.allianceId);
		self.$elem.find("td.MMHKPLUS_LookoutPlayer" + id).html(data.playerName);
		self.$elem.find("td.MMHKPLUS_LookoutAlliance" + data.allianceId).html(self._createBlockColor(self, id) + data.allianceName);
		$("div.MMHKPLUS_Color" + data.allianceId).css({backgroundColor : getColor(data.color)});;
	},
	
	unload : function()
	{

		MMHKPLUS.clearInterval(this.intervalUpdate); this.intervalUpdate = null;
		MMHKPLUS.resetElement(this.$elem);
		destroy(this.moves); this.moves = null;
		destroy(this.cachePlayers); this.cachePlayers = null;
		destroy(this.cacheAlliances); this.cacheAlliances = null;
	}
});
var readyStateCheckInterval = setInterval(function() 
	{
		if(!!window.HOMMK && window.HOMMK.worldMap && window.HOMMK.worldMap.content && window.HOMMK.worldMap.content._size)
		{
			clearInterval(readyStateCheckInterval);
			readyStateCheckInterval = null;

			MMHKPLUS.init();
			console.log("MMHK-Plus : load complete");
		}
	}, 
	200
);

function onBeforeUnload() {
  MMHKPLUS.unload();
    console.log("MMHK-Plus : Unload complete");
};
window.addEventListener("beforeunload", onBeforeUnload, true);

})(realWindow, JQuery.jquery);