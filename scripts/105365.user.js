// ==UserScript==
// @name           Dailybooth Dashboard Filter
// @namespace      http://tambl.com/
// @description    Filters comments of blacklisted people out of your dashboard. 
// @version        2.6 
// @include        http://dailybooth.com/*
// ==/UserScript==

/*

(C) 2011 mkdr
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------
2011-09-03 - v2.6 - Bug fixes.
2011-06-27 - v2.5 - Minor changes.
2011-06-27 - v2.4 - Bug fixes.
2011-06-26 - v2.3 - Bug fixes.
2011-06-26 - v2.2 - Minor changes.
2011-06-25 - v2.1 - Added favourite following.
2011-06-24 - v2.0 - Switched settings to cookie.
2011-06-24 - v1.9 - Bug fixes.
2011-06-23 - v1.8 - Bug fixes.
2011-06-23 - v1.7 - Minor changes.
2011-06-23 - v1.6 - Added cookie support.
2011-06-21 - v1.5 - Added feature to select yes/no for filtering /dashboard/comments
2011-06-21 - v1.4 - Added blockable receivers.
2011-06-21 - v1.3 - Infinite scrolling bug fixes.
2011-06-20 - v1.2 - Added infinite scrolling.
2011-06-18 - v1.1 - Bug fixes.
2011-06-18 - v1.0 - First release.
*/

//------------------------------------------------------------------------------
var enabledAll = 1;
var infiniteScrolling = 1;
var blockReceiver = 1;
var filterCommentsPage = 1;

var blackList = new Array();
var favList = new Array();
var setsList = new Array();
var stat = new Array();
var statOut2 = "";

var filterURL = new Array('comments');
var docURL = document.URL || window.location.href;
docURI = docURL.substr(docURL.indexOf("com/") + 4);     
docURICount = docURL.substr(docURL.indexOf("dashboard/") + 10);

var filterRange = false;

if ((docURI == "dashboard") || (docURI == "dashboard/")
    || (docURL.indexOf("dashboard/comments") >= 0) || (isNumeric(docURICount)))
  filterRange = true;    

var cimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNpiYGBgEAXivUCsxYAAukC8CyoHlvwPxK+gErpQ9n+oHIrAKzS2LrKRMAkUSSYG3OAvNt1YrSDoSJg3ddG8CRITBQgwALGIIG7dYZgsAAAAAElFTkSuQmCC';
var limg = 'data:image/gif;base64,R0lGODlhMQAyANUAAI2NjfDw8Nvb2/39/c3NzePj4/Ly8tHR0dPT09DQ0NnZ2enp6evr6+bm5ufn58zMzPn5+dXV1fHx8eDg4LOzs5WVlfv7+8XFxaamptTU1JOTk6Kiot/f352dnZ6enq+vr/r6+snJyf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgAAACwAAAAAMQAyAAAG/0CRcEgsGo/IpHLJbDqf0Kh0Si0aGgIEQVTZUEKFqnPAUITOZxFgvf5kQOJkQICuq9lsyiRuXBzqdnh4Hgd8RA+AgYJsGoYiCw8iiWh3iwAiDwtxAX8hkmgRBQEQIgYcFxh4nwcBVQN0lCEJDgNHFgQdl3UCtVMMiSKtSnuJDFRmdQkSTRIJgApTBokOTw6JBlINgBG9TQMRgA1SsGhhUAWAAlIIgMJPAYAIUgSApFAQgFuO+030dfZP8NXRB4VdHXdO4NWRF4XcGXNP0O3Ktq0bk2/hpEgDRM2JNUDYpCBDo4yZszrQfAFDeKRVMSqv7MiidWSAA2efzvCqwilNnVJQo0RACFAAXKwQrOJAyglsUppMjhA5ZQoo0j4/U50e0MRvziSqOlk6IjPSJ0oGFvkNuZJlCwEEAhqEVEu3rt27ePPq3cu3r9+/gAMLHky4MN0gACH5BAQKAAAALBkABAAPAA8AAAZXQAJC0DCIjshkaLlUMAZJJHMqCERF0+lhEc1OH13vUqQ5ICGBQmQqAgA8k+jAkQi13QAK6GrF4zNXIhMdfgAfgSIEhQAFgRYYhXaBF4UUiByFG4gGhRVBACH5BAQKAAAALB8ACQAJABUAAAZewJBQ9FiIjkPhIYAUCYWCAfIpZIgkCWpIcXRoQwbRIKJtHAtawTGgRRwhWsJxTj8aAHh85cjJ4zdHF34AFCIWGIMhIgSDAAUTHYMfR40ZTiJ+FCBOingeE1OKGgdzQQAh+QQECgAAACwZABQADwAPAAAGWUCRcCiEhI5HApEYQB4Ry2HBGRJERYMItXF1UEOGqCRBVUQnoi+DaCF0AGmkYCAycC4YgB5+PASEe4F6Ig8LQ4KBGkuIeh4Hi4gUaJB7HxkgVxUbFCEFV0NBACH5BAQKAAAALA4AGgAVAAkAAAZWwJBQNBEZj0hRQCRsigAdgiVpHDgSIeYQwAVgLhyDCBIoRJrZbHfN1aKdGvba/Q49Dh55uy48LIgUenRNAktGIBkfbIMKDANUIgUhFBsVIgQIAg1iSEEAIfkEBAoAAAAsCQAUAA8ADwAABlnACmA4NIiOyOOGOOQkkxQm4PJEhqQYS1VUkAIIW9FH2plsM15RoAqKEkWhhGPwnHiG8JA+UghAkAcaeXqEek8PhYlPCweJhFUBAo4hWwMMCophIgYNAggEQQAh+QQECgAAACwJAAkACQAVAAAGX0CR8KARhY7CiQcAMIZEIAqTaRRlplPhBwvoTApcAMHIxVhEUuxFuOFyhBWuQUivCwnHPESIyB8DQgJ+IQVCDYMRAyIGgyEOQgqDCRIiDI1CA4J5VSIBB0hIQgsPTiFBACH5BAQKAAAALAkABAAPAA8AAAZYQJFwSCyEKJsKcQjKfABQ6FI0oUSvy4PniiVquF3R4iECR4WBQyhUjmIuHINoIFivyx2Chciw26lTCn4hCRJTBoMhDlMiDYMRA4x1fgWMIgiDAZYEgxCWQQA7';
var blimg = 'data:image/png;base64,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';
var btnimg = 'data:image/png;base64,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';
var logoimg = 'data:image/png;base64,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';
var bl2img = 'data:image/png;base64,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';
var loadimg = 'data:image/gif;base64,R0lGODlhyABjAJEDAEZGRpaWlsrKygAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgADACwAAAAAyABjAAAC/5yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s4vwg8MCofEovHYS4qOzKbTqIx6ntQqUorNWLdcQfZr6Yqf4LJkjL6a14y0e8iOK970n/xuqNPxd/2bL+fnBhgnmEbIZoiGuKY4xmjmKAZZJtlFCWbJhfmlucWZ5WkFiiVaRSplSoUapUrGmuTqBBsry0TbY3uLu6OrxovjCwWcI1xEXGwMh3yjvMxc4ywEbSMdRB1tbYc9o73NHePtBR7uTV6ufQ4jrv7C3t7yDr8iP59Sb3+Cn1+yzz/i71+IgAI/ECzY4SDCDQoXajHncAnEiCAaUqxg8eKEjD4aI3DsCDKkyJEkS5o8iTKlypUsW7p8CTOmzJk0a9q8iTOnzp08e/r8CTSo0KFEixo9ijSp0qVMmzp9ChVoAQAh+QQFCgADACxIAAgANwA3AAACOYyPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1qCgAh+QQFFAADACyLAAgANgA3AAACOYSPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCYUVAAA7';
/*********************************
  INCLUDING jQuery 1.4.4 MINIFIED
**********************************/

/*!
 * jQ JavaScript Library v1.4.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */
(function(E,B){function ka(a,b,d){if(d===B&&a.nodeType===1){d=a.getAttribute("data-"+b);if(typeof d==="string"){try{d=d==="true"?true:d==="false"?false:d==="null"?null:!c.isNaN(d)?parseFloat(d):Ja.test(d)?c.parseJSON(d):d}catch(e){}c.data(a,b,d)}else d=B}return d}function U(){return false}function ca(){return true}function la(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function Ka(a){var b,d,e,f,h,l,k,o,x,r,A,C=[];f=[];h=c.data(this,this.nodeType?"events":"__events__");if(typeof h==="function")h=
h.events;if(!(a.liveFired===this||!h||!h.live||a.button&&a.type==="click")){if(a.namespace)A=RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)");a.liveFired=this;var J=h.live.slice(0);for(k=0;k<J.length;k++){h=J[k];h.origType.replace(X,"")===a.type?f.push(h.selector):J.splice(k--,1)}f=c(a.target).closest(f,a.currentTarget);o=0;for(x=f.length;o<x;o++){r=f[o];for(k=0;k<J.length;k++){h=J[k];if(r.selector===h.selector&&(!A||A.test(h.namespace))){l=r.elem;e=null;if(h.preType==="mouseenter"||
h.preType==="mouseleave"){a.type=h.preType;e=c(a.relatedTarget).closest(h.selector)[0]}if(!e||e!==l)C.push({elem:l,handleObj:h,level:r.level})}}}o=0;for(x=C.length;o<x;o++){f=C[o];if(d&&f.level>d)break;a.currentTarget=f.elem;a.data=f.handleObj.data;a.handleObj=f.handleObj;A=f.handleObj.origHandler.apply(f.elem,arguments);if(A===false||a.isPropagationStopped()){d=f.level;if(A===false)b=false;if(a.isImmediatePropagationStopped())break}}return b}}function Y(a,b){return(a&&a!=="*"?a+".":"")+b.replace(La,
"`").replace(Ma,"&")}function ma(a,b,d){if(c.isFunction(b))return c.grep(a,function(f,h){return!!b.call(f,h,f)===d});else if(b.nodeType)return c.grep(a,function(f){return f===b===d});else if(typeof b==="string"){var e=c.grep(a,function(f){return f.nodeType===1});if(Na.test(b))return c.filter(b,e,!d);else b=c.filter(b,e)}return c.grep(a,function(f){return c.inArray(f,b)>=0===d})}function na(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var e=c.data(a[d++]),f=c.data(this,
e);if(e=e&&e.events){delete f.handle;f.events={};for(var h in e)for(var l in e[h])c.event.add(this,h,e[h][l],e[h][l].data)}}})}function Oa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function oa(a,b,d){var e=b==="width"?a.offsetWidth:a.offsetHeight;if(d==="border")return e;c.each(b==="width"?Pa:Qa,function(){d||(e-=parseFloat(c.css(a,"padding"+this))||0);if(d==="margin")e+=parseFloat(c.css(a,
"margin"+this))||0;else e-=parseFloat(c.css(a,"border"+this+"Width"))||0});return e}function da(a,b,d,e){if(c.isArray(b)&&b.length)c.each(b,function(f,h){d||Ra.test(a)?e(a,h):da(a+"["+(typeof h==="object"||c.isArray(h)?f:"")+"]",h,d,e)});else if(!d&&b!=null&&typeof b==="object")c.isEmptyObject(b)?e(a,""):c.each(b,function(f,h){da(a+"["+f+"]",h,d,e)});else e(a,b)}function S(a,b){var d={};c.each(pa.concat.apply([],pa.slice(0,b)),function(){d[this]=a});return d}function qa(a){if(!ea[a]){var b=c("<"+
a+">").appendTo("body"),d=b.css("display");b.remove();if(d==="none"||d==="")d="block";ea[a]=d}return ea[a]}function fa(a){return c.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var t=E.document,c=function(){function a(){if(!b.isReady){try{t.documentElement.doScroll("left")}catch(j){setTimeout(a,1);return}b.ready()}}var b=function(j,s){return new b.fn.init(j,s)},d=E.jQ,e=E.$,f,h=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,l=/\S/,k=/^\s+/,o=/\s+$/,x=/\W/,r=/\d/,A=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,
C=/^[\],:{}\s]*$/,J=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,w=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,I=/(?:^|:|,)(?:\s*\[)+/g,L=/(webkit)[ \/]([\w.]+)/,g=/(opera)(?:.*version)?[ \/]([\w.]+)/,i=/(msie) ([\w.]+)/,n=/(mozilla)(?:.*? rv:([\w.]+))?/,m=navigator.userAgent,p=false,q=[],u,y=Object.prototype.toString,F=Object.prototype.hasOwnProperty,M=Array.prototype.push,N=Array.prototype.slice,O=String.prototype.trim,D=Array.prototype.indexOf,R={};b.fn=b.prototype={init:function(j,
s){var v,z,H;if(!j)return this;if(j.nodeType){this.context=this[0]=j;this.length=1;return this}if(j==="body"&&!s&&t.body){this.context=t;this[0]=t.body;this.selector="body";this.length=1;return this}if(typeof j==="string")if((v=h.exec(j))&&(v[1]||!s))if(v[1]){H=s?s.ownerDocument||s:t;if(z=A.exec(j))if(b.isPlainObject(s)){j=[t.createElement(z[1])];b.fn.attr.call(j,s,true)}else j=[H.createElement(z[1])];else{z=b.buildFragment([v[1]],[H]);j=(z.cacheable?z.fragment.cloneNode(true):z.fragment).childNodes}return b.merge(this,
j)}else{if((z=t.getElementById(v[2]))&&z.parentNode){if(z.id!==v[2])return f.find(j);this.length=1;this[0]=z}this.context=t;this.selector=j;return this}else if(!s&&!x.test(j)){this.selector=j;this.context=t;j=t.getElementsByTagName(j);return b.merge(this,j)}else return!s||s.jquery?(s||f).find(j):b(s).find(j);else if(b.isFunction(j))return f.ready(j);if(j.selector!==B){this.selector=j.selector;this.context=j.context}return b.makeArray(j,this)},selector:"",jquery:"1.4.4",length:0,size:function(){return this.length},
toArray:function(){return N.call(this,0)},get:function(j){return j==null?this.toArray():j<0?this.slice(j)[0]:this[j]},pushStack:function(j,s,v){var z=b();b.isArray(j)?M.apply(z,j):b.merge(z,j);z.prevObject=this;z.context=this.context;if(s==="find")z.selector=this.selector+(this.selector?" ":"")+v;else if(s)z.selector=this.selector+"."+s+"("+v+")";return z},each:function(j,s){return b.each(this,j,s)},ready:function(j){b.bindReady();if(b.isReady)j.call(t,b);else q&&q.push(j);return this},eq:function(j){return j===
-1?this.slice(j):this.slice(j,+j+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(N.apply(this,arguments),"slice",N.call(arguments).join(","))},map:function(j){return this.pushStack(b.map(this,function(s,v){return j.call(s,v,s)}))},end:function(){return this.prevObject||b(null)},push:M,sort:[].sort,splice:[].splice};b.fn.init.prototype=b.fn;b.extend=b.fn.extend=function(){var j,s,v,z,H,G=arguments[0]||{},K=1,Q=arguments.length,ga=false;
if(typeof G==="boolean"){ga=G;G=arguments[1]||{};K=2}if(typeof G!=="object"&&!b.isFunction(G))G={};if(Q===K){G=this;--K}for(;K<Q;K++)if((j=arguments[K])!=null)for(s in j){v=G[s];z=j[s];if(G!==z)if(ga&&z&&(b.isPlainObject(z)||(H=b.isArray(z)))){if(H){H=false;v=v&&b.isArray(v)?v:[]}else v=v&&b.isPlainObject(v)?v:{};G[s]=b.extend(ga,v,z)}else if(z!==B)G[s]=z}return G};b.extend({noConflict:function(j){E.$=e;if(j)E.jQ=d;return b},isReady:false,readyWait:1,ready:function(j){j===true&&b.readyWait--;
if(!b.readyWait||j!==true&&!b.isReady){if(!t.body)return setTimeout(b.ready,1);b.isReady=true;if(!(j!==true&&--b.readyWait>0))if(q){var s=0,v=q;for(q=null;j=v[s++];)j.call(t,b);b.fn.trigger&&b(t).trigger("ready").unbind("ready")}}},bindReady:function(){if(!p){p=true;if(t.readyState==="complete")return setTimeout(b.ready,1);if(t.addEventListener){t.addEventListener("DOMContentLoaded",u,false);E.addEventListener("load",b.ready,false)}else if(t.attachEvent){t.attachEvent("onreadystatechange",u);E.attachEvent("onload",
b.ready);var j=false;try{j=E.frameElement==null}catch(s){}t.documentElement.doScroll&&j&&a()}}},isFunction:function(j){return b.type(j)==="function"},isArray:Array.isArray||function(j){return b.type(j)==="array"},isWindow:function(j){return j&&typeof j==="object"&&"setInterval"in j},isNaN:function(j){return j==null||!r.test(j)||isNaN(j)},type:function(j){return j==null?String(j):R[y.call(j)]||"object"},isPlainObject:function(j){if(!j||b.type(j)!=="object"||j.nodeType||b.isWindow(j))return false;if(j.constructor&&
!F.call(j,"constructor")&&!F.call(j.constructor.prototype,"isPrototypeOf"))return false;for(var s in j);return s===B||F.call(j,s)},isEmptyObject:function(j){for(var s in j)return false;return true},error:function(j){throw j;},parseJSON:function(j){if(typeof j!=="string"||!j)return null;j=b.trim(j);if(C.test(j.replace(J,"@").replace(w,"]").replace(I,"")))return E.JSON&&E.JSON.parse?E.JSON.parse(j):(new Function("return "+j))();else b.error("Invalid JSON: "+j)},noop:function(){},globalEval:function(j){if(j&&
l.test(j)){var s=t.getElementsByTagName("head")[0]||t.documentElement,v=t.createElement("script");v.type="text/javascript";if(b.support.scriptEval)v.appendChild(t.createTextNode(j));else v.text=j;s.insertBefore(v,s.firstChild);s.removeChild(v)}},nodeName:function(j,s){return j.nodeName&&j.nodeName.toUpperCase()===s.toUpperCase()},each:function(j,s,v){var z,H=0,G=j.length,K=G===B||b.isFunction(j);if(v)if(K)for(z in j){if(s.apply(j[z],v)===false)break}else for(;H<G;){if(s.apply(j[H++],v)===false)break}else if(K)for(z in j){if(s.call(j[z],
z,j[z])===false)break}else for(v=j[0];H<G&&s.call(v,H,v)!==false;v=j[++H]);return j},trim:O?function(j){return j==null?"":O.call(j)}:function(j){return j==null?"":j.toString().replace(k,"").replace(o,"")},makeArray:function(j,s){var v=s||[];if(j!=null){var z=b.type(j);j.length==null||z==="string"||z==="function"||z==="regexp"||b.isWindow(j)?M.call(v,j):b.merge(v,j)}return v},inArray:function(j,s){if(s.indexOf)return s.indexOf(j);for(var v=0,z=s.length;v<z;v++)if(s[v]===j)return v;return-1},merge:function(j,
s){var v=j.length,z=0;if(typeof s.length==="number")for(var H=s.length;z<H;z++)j[v++]=s[z];else for(;s[z]!==B;)j[v++]=s[z++];j.length=v;return j},grep:function(j,s,v){var z=[],H;v=!!v;for(var G=0,K=j.length;G<K;G++){H=!!s(j[G],G);v!==H&&z.push(j[G])}return z},map:function(j,s,v){for(var z=[],H,G=0,K=j.length;G<K;G++){H=s(j[G],G,v);if(H!=null)z[z.length]=H}return z.concat.apply([],z)},guid:1,proxy:function(j,s,v){if(arguments.length===2)if(typeof s==="string"){v=j;j=v[s];s=B}else if(s&&!b.isFunction(s)){v=
s;s=B}if(!s&&j)s=function(){return j.apply(v||this,arguments)};if(j)s.guid=j.guid=j.guid||s.guid||b.guid++;return s},access:function(j,s,v,z,H,G){var K=j.length;if(typeof s==="object"){for(var Q in s)b.access(j,Q,s[Q],z,H,v);return j}if(v!==B){z=!G&&z&&b.isFunction(v);for(Q=0;Q<K;Q++)H(j[Q],s,z?v.call(j[Q],Q,H(j[Q],s)):v,G);return j}return K?H(j[0],s):B},now:function(){return(new Date).getTime()},uaMatch:function(j){j=j.toLowerCase();j=L.exec(j)||g.exec(j)||i.exec(j)||j.indexOf("compatible")<0&&n.exec(j)||
[];return{browser:j[1]||"",version:j[2]||"0"}},browser:{}});b.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(j,s){R["[object "+s+"]"]=s.toLowerCase()});m=b.uaMatch(m);if(m.browser){b.browser[m.browser]=true;b.browser.version=m.version}if(b.browser.webkit)b.browser.safari=true;if(D)b.inArray=function(j,s){return D.call(s,j)};if(!/\s/.test("\u00a0")){k=/^[\s\xA0]+/;o=/[\s\xA0]+$/}f=b(t);if(t.addEventListener)u=function(){t.removeEventListener("DOMContentLoaded",u,
false);b.ready()};else if(t.attachEvent)u=function(){if(t.readyState==="complete"){t.detachEvent("onreadystatechange",u);b.ready()}};return E.jQ=E.$=b}();(function(){c.support={};var a=t.documentElement,b=t.createElement("script"),d=t.createElement("div"),e="script"+c.now();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var f=d.getElementsByTagName("*"),h=d.getElementsByTagName("a")[0],l=t.createElement("select"),
k=l.appendChild(t.createElement("option"));if(!(!f||!f.length||!h)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(h.getAttribute("style")),hrefNormalized:h.getAttribute("href")==="/a",opacity:/^0.55$/.test(h.style.opacity),cssFloat:!!h.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:k.selected,deleteExpando:true,optDisabled:false,checkClone:false,
scriptEval:false,noCloneEvent:true,boxModel:null,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableHiddenOffsets:true};l.disabled=true;c.support.optDisabled=!k.disabled;b.type="text/javascript";try{b.appendChild(t.createTextNode("window."+e+"=1;"))}catch(o){}a.insertBefore(b,a.firstChild);if(E[e]){c.support.scriptEval=true;delete E[e]}try{delete b.test}catch(x){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function r(){c.support.noCloneEvent=
false;d.detachEvent("onclick",r)});d.cloneNode(true).fireEvent("onclick")}d=t.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=t.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var r=t.createElement("div");r.style.width=r.style.paddingLeft="1px";t.body.appendChild(r);c.boxModel=c.support.boxModel=r.offsetWidth===2;if("zoom"in r.style){r.style.display="inline";r.style.zoom=
1;c.support.inlineBlockNeedsLayout=r.offsetWidth===2;r.style.display="";r.innerHTML="<div style='width:4px;'></div>";c.support.shrinkWrapBlocks=r.offsetWidth!==2}r.innerHTML="<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";var A=r.getElementsByTagName("td");c.support.reliableHiddenOffsets=A[0].offsetHeight===0;A[0].style.display="";A[1].style.display="none";c.support.reliableHiddenOffsets=c.support.reliableHiddenOffsets&&A[0].offsetHeight===0;r.innerHTML="";t.body.removeChild(r).style.display=
"none"});a=function(r){var A=t.createElement("div"),D=A.wrappedJSObject||A;r="on"+r;var C=r in D;if(!C){A.setAttribute(r,"return;");C=typeof D[r]==="function"}return C};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=f=h=null}})();var ra={},Ja=/^(?:\{.*\}|\[.*\])$/;c.extend({cache:{},uuid:0,expando:"jQ"+c.now(),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:true},data:function(a,b,d){if(c.acceptData(a)){a=a==E?ra:a;var e=a.nodeType,f=e?a[c.expando]:null,h=
c.cache;if(!(e&&!f&&typeof b==="string"&&d===B)){if(e)f||(a[c.expando]=f=++c.uuid);else h=a;if(typeof b==="object")if(e)h[f]=c.extend(h[f],b);else c.extend(h,b);else if(e&&!h[f])h[f]={};a=e?h[f]:h;if(d!==B)a[b]=d;return typeof b==="string"?a[b]:a}}},removeData:function(a,b){if(c.acceptData(a)){a=a==E?ra:a;var d=a.nodeType,e=d?a[c.expando]:a,f=c.cache,h=d?f[e]:e;if(b){if(h){delete h[b];d&&c.isEmptyObject(h)&&c.removeData(a)}}else if(d&&c.support.deleteExpando)delete a[c.expando];else if(a.removeAttribute)a.removeAttribute(c.expando);
else if(d)delete f[e];else for(var l in a)delete a[l]}},acceptData:function(a){if(a.nodeName){var b=c.noData[a.nodeName.toLowerCase()];if(b)return!(b===true||a.getAttribute("classid")!==b)}return true}});c.fn.extend({data:function(a,b){var d=null;if(typeof a==="undefined"){if(this.length){var e=this[0].attributes,f;d=c.data(this[0]);for(var h=0,l=e.length;h<l;h++){f=e[h].name;if(f.indexOf("data-")===0){f=f.substr(5);ka(this[0],f,d[f])}}}return d}else if(typeof a==="object")return this.each(function(){c.data(this,
a)});var k=a.split(".");k[1]=k[1]?"."+k[1]:"";if(b===B){d=this.triggerHandler("getData"+k[1]+"!",[k[0]]);if(d===B&&this.length){d=c.data(this[0],a);d=ka(this[0],a,d)}return d===B&&k[1]?this.data(k[0]):d}else return this.each(function(){var o=c(this),x=[k[0],b];o.triggerHandler("setData"+k[1]+"!",x);c.data(this,a,b);o.triggerHandler("changeData"+k[1]+"!",x)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var e=
c.data(a,b);if(!d)return e||[];if(!e||c.isArray(d))e=c.data(a,b,c.makeArray(d));else e.push(d);return e}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),e=d.shift();if(e==="inprogress")e=d.shift();if(e){b==="fx"&&d.unshift("inprogress");e.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===B)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,
a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var sa=/[\n\t]/g,ha=/\s+/,Sa=/\r/g,Ta=/^(?:href|src|style)$/,Ua=/^(?:button|input)$/i,Va=/^(?:button|input|object|select|textarea)$/i,Wa=/^a(?:rea)?$/i,ta=/^(?:radio|checkbox)$/i;c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",
colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};c.fn.extend({attr:function(a,b){return c.access(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(x){var r=c(this);r.addClass(a.call(this,x,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ha),d=0,e=this.length;d<e;d++){var f=this[d];if(f.nodeType===
1)if(f.className){for(var h=" "+f.className+" ",l=f.className,k=0,o=b.length;k<o;k++)if(h.indexOf(" "+b[k]+" ")<0)l+=" "+b[k];f.className=c.trim(l)}else f.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(o){var x=c(this);x.removeClass(a.call(this,o,x.attr("class")))});if(a&&typeof a==="string"||a===B)for(var b=(a||"").split(ha),d=0,e=this.length;d<e;d++){var f=this[d];if(f.nodeType===1&&f.className)if(a){for(var h=(" "+f.className+" ").replace(sa," "),
l=0,k=b.length;l<k;l++)h=h.replace(" "+b[l]+" "," ");f.className=c.trim(h)}else f.className=""}return this},toggleClass:function(a,b){var d=typeof a,e=typeof b==="boolean";if(c.isFunction(a))return this.each(function(f){var h=c(this);h.toggleClass(a.call(this,f,h.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var f,h=0,l=c(this),k=b,o=a.split(ha);f=o[h++];){k=e?k:!l.hasClass(f);l[k?"addClass":"removeClass"](f)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,
"__className__",this.className);this.className=this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(sa," ").indexOf(a)>-1)return true;return false},val:function(a){if(!arguments.length){var b=this[0];if(b){if(c.nodeName(b,"option")){var d=b.attributes.value;return!d||d.specified?b.value:b.text}if(c.nodeName(b,"select")){var e=b.selectedIndex;d=[];var f=b.options;b=b.type==="select-one";
if(e<0)return null;var h=b?e:0;for(e=b?e+1:f.length;h<e;h++){var l=f[h];if(l.selected&&(c.support.optDisabled?!l.disabled:l.getAttribute("disabled")===null)&&(!l.parentNode.disabled||!c.nodeName(l.parentNode,"optgroup"))){a=c(l).val();if(b)return a;d.push(a)}}return d}if(ta.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Sa,"")}return B}var k=c.isFunction(a);return this.each(function(o){var x=c(this),r=a;if(this.nodeType===1){if(k)r=
a.call(this,o,x.val());if(r==null)r="";else if(typeof r==="number")r+="";else if(c.isArray(r))r=c.map(r,function(C){return C==null?"":C+""});if(c.isArray(r)&&ta.test(this.type))this.checked=c.inArray(x.val(),r)>=0;else if(c.nodeName(this,"select")){var A=c.makeArray(r);c("option",this).each(function(){this.selected=c.inArray(c(this).val(),A)>=0});if(!A.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},
attr:function(a,b,d,e){if(!a||a.nodeType===3||a.nodeType===8)return B;if(e&&b in c.attrFn)return c(a)[b](d);e=a.nodeType!==1||!c.isXMLDoc(a);var f=d!==B;b=e&&c.props[b]||b;var h=Ta.test(b);if((b in a||a[b]!==B)&&e&&!h){if(f){b==="type"&&Ua.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");if(d===null)a.nodeType===1&&a.removeAttribute(b);else a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&
b.specified?b.value:Va.test(a.nodeName)||Wa.test(a.nodeName)&&a.href?0:B;return a[b]}if(!c.support.style&&e&&b==="style"){if(f)a.style.cssText=""+d;return a.style.cssText}f&&a.setAttribute(b,""+d);if(!a.attributes[b]&&a.hasAttribute&&!a.hasAttribute(b))return B;a=!c.support.hrefNormalized&&e&&h?a.getAttribute(b,2):a.getAttribute(b);return a===null?B:a}});var X=/\.(.*)$/,ia=/^(?:textarea|input|select)$/i,La=/\./g,Ma=/ /g,Xa=/[^\w\s.|`]/g,Ya=function(a){return a.replace(Xa,"\\$&")},ua={focusin:0,focusout:0};
c.event={add:function(a,b,d,e){if(!(a.nodeType===3||a.nodeType===8)){if(c.isWindow(a)&&a!==E&&!a.frameElement)a=E;if(d===false)d=U;else if(!d)return;var f,h;if(d.handler){f=d;d=f.handler}if(!d.guid)d.guid=c.guid++;if(h=c.data(a)){var l=a.nodeType?"events":"__events__",k=h[l],o=h.handle;if(typeof k==="function"){o=k.handle;k=k.events}else if(!k){a.nodeType||(h[l]=h=function(){});h.events=k={}}if(!o)h.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,
arguments):B};o.elem=a;b=b.split(" ");for(var x=0,r;l=b[x++];){h=f?c.extend({},f):{handler:d,data:e};if(l.indexOf(".")>-1){r=l.split(".");l=r.shift();h.namespace=r.slice(0).sort().join(".")}else{r=[];h.namespace=""}h.type=l;if(!h.guid)h.guid=d.guid;var A=k[l],C=c.event.special[l]||{};if(!A){A=k[l]=[];if(!C.setup||C.setup.call(a,e,r,o)===false)if(a.addEventListener)a.addEventListener(l,o,false);else a.attachEvent&&a.attachEvent("on"+l,o)}if(C.add){C.add.call(a,h);if(!h.handler.guid)h.handler.guid=
d.guid}A.push(h);c.event.global[l]=true}a=null}}},global:{},remove:function(a,b,d,e){if(!(a.nodeType===3||a.nodeType===8)){if(d===false)d=U;var f,h,l=0,k,o,x,r,A,C,J=a.nodeType?"events":"__events__",w=c.data(a),I=w&&w[J];if(w&&I){if(typeof I==="function"){w=I;I=I.events}if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(f in I)c.event.remove(a,f+b)}else{for(b=b.split(" ");f=b[l++];){r=f;k=f.indexOf(".")<0;o=[];if(!k){o=f.split(".");f=o.shift();x=RegExp("(^|\\.)"+
c.map(o.slice(0).sort(),Ya).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(A=I[f])if(d){r=c.event.special[f]||{};for(h=e||0;h<A.length;h++){C=A[h];if(d.guid===C.guid){if(k||x.test(C.namespace)){e==null&&A.splice(h--,1);r.remove&&r.remove.call(a,C)}if(e!=null)break}}if(A.length===0||e!=null&&A.length===1){if(!r.teardown||r.teardown.call(a,o)===false)c.removeEvent(a,f,w.handle);delete I[f]}}else for(h=0;h<A.length;h++){C=A[h];if(k||x.test(C.namespace)){c.event.remove(a,r,C.handler,h);A.splice(h--,1)}}}if(c.isEmptyObject(I)){if(b=
w.handle)b.elem=null;delete w.events;delete w.handle;if(typeof w==="function")c.removeData(a,J);else c.isEmptyObject(w)&&c.removeData(a)}}}}},trigger:function(a,b,d,e){var f=a.type||a;if(!e){a=typeof a==="object"?a[c.expando]?a:c.extend(c.Event(f),a):c.Event(f);if(f.indexOf("!")>=0){a.type=f=f.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[f]&&c.each(c.cache,function(){this.events&&this.events[f]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===
8)return B;a.result=B;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(e=d.nodeType?c.data(d,"handle"):(c.data(d,"__events__")||{}).handle)&&e.apply(d,b);e=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+f]&&d["on"+f].apply(d,b)===false){a.result=false;a.preventDefault()}}catch(h){}if(!a.isPropagationStopped()&&e)c.event.trigger(a,b,e,true);else if(!a.isDefaultPrevented()){var l;e=a.target;var k=f.replace(X,""),o=c.nodeName(e,"a")&&k===
"click",x=c.event.special[k]||{};if((!x._default||x._default.call(d,a)===false)&&!o&&!(e&&e.nodeName&&c.noData[e.nodeName.toLowerCase()])){try{if(e[k]){if(l=e["on"+k])e["on"+k]=null;c.event.triggered=true;e[k]()}}catch(r){}if(l)e["on"+k]=l;c.event.triggered=false}}},handle:function(a){var b,d,e,f;d=[];var h=c.makeArray(arguments);a=h[0]=c.event.fix(a||E.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;if(!b){e=a.type.split(".");a.type=e.shift();d=e.slice(0).sort();e=RegExp("(^|\\.)"+
d.join("\\.(?:.*\\.)?")+"(\\.|$)")}a.namespace=a.namespace||d.join(".");f=c.data(this,this.nodeType?"events":"__events__");if(typeof f==="function")f=f.events;d=(f||{})[a.type];if(f&&d){d=d.slice(0);f=0;for(var l=d.length;f<l;f++){var k=d[f];if(b||e.test(k.namespace)){a.handler=k.handler;a.data=k.data;a.handleObj=k;k=k.handler.apply(this,h);if(k!==B){a.result=k;if(k===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[c.expando])return a;var b=a;a=c.Event(b);for(var d=this.props.length,e;d;){e=this.props[--d];a[e]=b[e]}if(!a.target)a.target=a.srcElement||t;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=t.documentElement;d=t.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(a.which==null&&(a.charCode!=null||a.keyCode!=null))a.which=a.charCode!=null?a.charCode:a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==B)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,Y(a.origType,a.selector),c.extend({},a,{handler:Ka,guid:a.handler.guid}))},remove:function(a){c.event.remove(this,
Y(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,d){if(c.isWindow(this))this.onbeforeunload=d},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};c.removeEvent=t.removeEventListener?function(a,b,d){a.removeEventListener&&a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent&&a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=a;this.type=a.type}else this.type=a;this.timeStamp=
c.now();this[c.expando]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=ca;var a=this.originalEvent;if(a)if(a.preventDefault)a.preventDefault();else a.returnValue=false},stopPropagation:function(){this.isPropagationStopped=ca;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=ca;this.stopPropagation()},isDefaultPrevented:U,isPropagationStopped:U,isImmediatePropagationStopped:U};
var va=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},wa=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?wa:va,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?wa:va)}}});if(!c.support.submitBubbles)c.event.special.submit={setup:function(){if(this.nodeName.toLowerCase()!==
"form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length){a.liveFired=B;return la("submit",this,arguments)}});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13){a.liveFired=B;return la("submit",this,arguments)}})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};if(!c.support.changeBubbles){var V,
xa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(e){return e.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},Z=function(a,b){var d=a.target,e,f;if(!(!ia.test(d.nodeName)||d.readOnly)){e=c.data(d,"_change_data");f=xa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",f);if(!(e===B||f===e))if(e!=null||f){a.type="change";a.liveFired=
B;return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:Z,beforedeactivate:Z,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return Z.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return Z.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,"_change_data",xa(a))}},setup:function(){if(this.type===
"file")return false;for(var a in V)c.event.add(this,a+".specialChange",V[a]);return ia.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return ia.test(this.nodeName)}};V=c.event.special.change.filters;V.focus=V.beforeactivate}t.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.trigger(e,null,e.target)}c.event.special[b]={setup:function(){ua[b]++===0&&t.addEventListener(a,d,true)},teardown:function(){--ua[b]===
0&&t.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,e,f){if(typeof d==="object"){for(var h in d)this[b](h,e,d[h],f);return this}if(c.isFunction(e)||e===false){f=e;e=B}var l=b==="one"?c.proxy(f,function(o){c(this).unbind(o,l);return f.apply(this,arguments)}):f;if(d==="unload"&&b!=="one")this.one(d,e,f);else{h=0;for(var k=this.length;h<k;h++)c.event.add(this[h],d,l,e)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&!a.preventDefault)for(var d in a)this.unbind(d,
a[d]);else{d=0;for(var e=this.length;d<e;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,e){return this.live(b,d,e,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){var d=c.Event(a);d.preventDefault();d.stopPropagation();c.event.trigger(d,b,this[0]);return d.result}},toggle:function(a){for(var b=arguments,d=
1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(e){var f=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,f+1);e.preventDefault();return b[f].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var ya={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,e,f,h){var l,k=0,o,x,r=h||this.selector;h=h?this:c(this.context);if(typeof d===
"object"&&!d.preventDefault){for(l in d)h[b](l,e,d[l],r);return this}if(c.isFunction(e)){f=e;e=B}for(d=(d||"").split(" ");(l=d[k++])!=null;){o=X.exec(l);x="";if(o){x=o[0];l=l.replace(X,"")}if(l==="hover")d.push("mouseenter"+x,"mouseleave"+x);else{o=l;if(l==="focus"||l==="blur"){d.push(ya[l]+x);l+=x}else l=(ya[l]||l)+x;if(b==="live"){x=0;for(var A=h.length;x<A;x++)c.event.add(h[x],"live."+Y(l,r),{data:e,selector:r,handler:f,origType:l,origHandler:f,preType:o})}else h.unbind("live."+Y(l,r),f)}}return this}});
c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){c.fn[b]=function(d,e){if(e==null){e=d;d=null}return arguments.length>0?this.bind(b,d,e):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});E.attachEvent&&!E.addEventListener&&c(E).bind("unload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});
(function(){function a(g,i,n,m,p,q){p=0;for(var u=m.length;p<u;p++){var y=m[p];if(y){var F=false;for(y=y[g];y;){if(y.sizcache===n){F=m[y.sizset];break}if(y.nodeType===1&&!q){y.sizcache=n;y.sizset=p}if(y.nodeName.toLowerCase()===i){F=y;break}y=y[g]}m[p]=F}}}function b(g,i,n,m,p,q){p=0;for(var u=m.length;p<u;p++){var y=m[p];if(y){var F=false;for(y=y[g];y;){if(y.sizcache===n){F=m[y.sizset];break}if(y.nodeType===1){if(!q){y.sizcache=n;y.sizset=p}if(typeof i!=="string"){if(y===i){F=true;break}}else if(k.filter(i,
[y]).length>0){F=y;break}}y=y[g]}m[p]=F}}}var d=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,e=0,f=Object.prototype.toString,h=false,l=true;[0,0].sort(function(){l=false;return 0});var k=function(g,i,n,m){n=n||[];var p=i=i||t;if(i.nodeType!==1&&i.nodeType!==9)return[];if(!g||typeof g!=="string")return n;var q,u,y,F,M,N=true,O=k.isXML(i),D=[],R=g;do{d.exec("");if(q=d.exec(R)){R=q[3];D.push(q[1]);if(q[2]){F=q[3];
break}}}while(q);if(D.length>1&&x.exec(g))if(D.length===2&&o.relative[D[0]])u=L(D[0]+D[1],i);else for(u=o.relative[D[0]]?[i]:k(D.shift(),i);D.length;){g=D.shift();if(o.relative[g])g+=D.shift();u=L(g,u)}else{if(!m&&D.length>1&&i.nodeType===9&&!O&&o.match.ID.test(D[0])&&!o.match.ID.test(D[D.length-1])){q=k.find(D.shift(),i,O);i=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]}if(i){q=m?{expr:D.pop(),set:C(m)}:k.find(D.pop(),D.length===1&&(D[0]==="~"||D[0]==="+")&&i.parentNode?i.parentNode:i,O);u=q.expr?k.filter(q.expr,
q.set):q.set;if(D.length>0)y=C(u);else N=false;for(;D.length;){q=M=D.pop();if(o.relative[M])q=D.pop();else M="";if(q==null)q=i;o.relative[M](y,q,O)}}else y=[]}y||(y=u);y||k.error(M||g);if(f.call(y)==="[object Array]")if(N)if(i&&i.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&k.contains(i,y[g])))n.push(u[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&n.push(u[g]);else n.push.apply(n,y);else C(y,n);if(F){k(F,p,n,m);k.uniqueSort(n)}return n};k.uniqueSort=function(g){if(w){h=
l;g.sort(w);if(h)for(var i=1;i<g.length;i++)g[i]===g[i-1]&&g.splice(i--,1)}return g};k.matches=function(g,i){return k(g,null,null,i)};k.matchesSelector=function(g,i){return k(i,null,null,[g]).length>0};k.find=function(g,i,n){var m;if(!g)return[];for(var p=0,q=o.order.length;p<q;p++){var u,y=o.order[p];if(u=o.leftMatch[y].exec(g)){var F=u[1];u.splice(1,1);if(F.substr(F.length-1)!=="\\"){u[1]=(u[1]||"").replace(/\\/g,"");m=o.find[y](u,i,n);if(m!=null){g=g.replace(o.match[y],"");break}}}}m||(m=i.getElementsByTagName("*"));
return{set:m,expr:g}};k.filter=function(g,i,n,m){for(var p,q,u=g,y=[],F=i,M=i&&i[0]&&k.isXML(i[0]);g&&i.length;){for(var N in o.filter)if((p=o.leftMatch[N].exec(g))!=null&&p[2]){var O,D,R=o.filter[N];D=p[1];q=false;p.splice(1,1);if(D.substr(D.length-1)!=="\\"){if(F===y)y=[];if(o.preFilter[N])if(p=o.preFilter[N](p,F,n,y,m,M)){if(p===true)continue}else q=O=true;if(p)for(var j=0;(D=F[j])!=null;j++)if(D){O=R(D,p,j,F);var s=m^!!O;if(n&&O!=null)if(s)q=true;else F[j]=false;else if(s){y.push(D);q=true}}if(O!==
B){n||(F=y);g=g.replace(o.match[N],"");if(!q)return[];break}}}if(g===u)if(q==null)k.error(g);else break;u=g}return F};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var o=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},relative:{"+":function(g,i){var n=typeof i==="string",m=n&&!/\W/.test(i);n=n&&!m;if(m)i=i.toLowerCase();m=0;for(var p=g.length,q;m<p;m++)if(q=g[m]){for(;(q=q.previousSibling)&&q.nodeType!==1;);g[m]=n||q&&q.nodeName.toLowerCase()===
i?q||false:q===i}n&&k.filter(i,g,true)},">":function(g,i){var n,m=typeof i==="string",p=0,q=g.length;if(m&&!/\W/.test(i))for(i=i.toLowerCase();p<q;p++){if(n=g[p]){n=n.parentNode;g[p]=n.nodeName.toLowerCase()===i?n:false}}else{for(;p<q;p++)if(n=g[p])g[p]=m?n.parentNode:n.parentNode===i;m&&k.filter(i,g,true)}},"":function(g,i,n){var m,p=e++,q=b;if(typeof i==="string"&&!/\W/.test(i)){m=i=i.toLowerCase();q=a}q("parentNode",i,p,g,m,n)},"~":function(g,i,n){var m,p=e++,q=b;if(typeof i==="string"&&!/\W/.test(i)){m=
i=i.toLowerCase();q=a}q("previousSibling",i,p,g,m,n)}},find:{ID:function(g,i,n){if(typeof i.getElementById!=="undefined"&&!n)return(g=i.getElementById(g[1]))&&g.parentNode?[g]:[]},NAME:function(g,i){if(typeof i.getElementsByName!=="undefined"){for(var n=[],m=i.getElementsByName(g[1]),p=0,q=m.length;p<q;p++)m[p].getAttribute("name")===g[1]&&n.push(m[p]);return n.length===0?null:n}},TAG:function(g,i){return i.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,i,n,m,p,q){g=" "+g[1].replace(/\\/g,
"")+" ";if(q)return g;q=0;for(var u;(u=i[q])!=null;q++)if(u)if(p^(u.className&&(" "+u.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))n||m.push(u);else if(n)i[q]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},CHILD:function(g){if(g[1]==="nth"){var i=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=i[1]+(i[2]||1)-0;g[3]=i[3]-0}g[0]=e++;return g},ATTR:function(g,i,n,
m,p,q){i=g[1].replace(/\\/g,"");if(!q&&o.attrMap[i])g[1]=o.attrMap[i];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,i,n,m,p){if(g[1]==="not")if((d.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,i);else{g=k.filter(g[3],i,n,true^p);n||m.push.apply(m,g);return false}else if(o.match.POS.test(g[0])||o.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===
true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,i,n){return!!k(n[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===
g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},setFilters:{first:function(g,i){return i===0},last:function(g,i,n,m){return i===m.length-1},even:function(g,i){return i%2===0},odd:function(g,i){return i%2===1},lt:function(g,i,n){return i<n[3]-0},gt:function(g,i,n){return i>n[3]-0},nth:function(g,i,n){return n[3]-
0===i},eq:function(g,i,n){return n[3]-0===i}},filter:{PSEUDO:function(g,i,n,m){var p=i[1],q=o.filters[p];if(q)return q(g,n,i,m);else if(p==="contains")return(g.textContent||g.innerText||k.getText([g])||"").indexOf(i[3])>=0;else if(p==="not"){i=i[3];n=0;for(m=i.length;n<m;n++)if(i[n]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+p)},CHILD:function(g,i){var n=i[1],m=g;switch(n){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(n===
"first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":n=i[2];var p=i[3];if(n===1&&p===0)return true;var q=i[0],u=g.parentNode;if(u&&(u.sizcache!==q||!g.nodeIndex)){var y=0;for(m=u.firstChild;m;m=m.nextSibling)if(m.nodeType===1)m.nodeIndex=++y;u.sizcache=q}m=g.nodeIndex-p;return n===0?m===0:m%n===0&&m/n>=0}},ID:function(g,i){return g.nodeType===1&&g.getAttribute("id")===i},TAG:function(g,i){return i==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===
i},CLASS:function(g,i){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(i)>-1},ATTR:function(g,i){var n=i[1];n=o.attrHandle[n]?o.attrHandle[n](g):g[n]!=null?g[n]:g.getAttribute(n);var m=n+"",p=i[2],q=i[4];return n==null?p==="!=":p==="="?m===q:p==="*="?m.indexOf(q)>=0:p==="~="?(" "+m+" ").indexOf(q)>=0:!q?m&&n!==false:p==="!="?m!==q:p==="^="?m.indexOf(q)===0:p==="$="?m.substr(m.length-q.length)===q:p==="|="?m===q||m.substr(0,q.length+1)===q+"-":false},POS:function(g,i,n,m){var p=o.setFilters[i[2]];
if(p)return p(g,n,i,m)}}},x=o.match.POS,r=function(g,i){return"\\"+(i-0+1)},A;for(A in o.match){o.match[A]=RegExp(o.match[A].source+/(?![^\[]*\])(?![^\(]*\))/.source);o.leftMatch[A]=RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[A].source.replace(/\\(\d+)/g,r))}var C=function(g,i){g=Array.prototype.slice.call(g,0);if(i){i.push.apply(i,g);return i}return g};try{Array.prototype.slice.call(t.documentElement.childNodes,0)}catch(J){C=function(g,i){var n=0,m=i||[];if(f.call(g)==="[object Array]")Array.prototype.push.apply(m,
g);else if(typeof g.length==="number")for(var p=g.length;n<p;n++)m.push(g[n]);else for(;g[n];n++)m.push(g[n]);return m}}var w,I;if(t.documentElement.compareDocumentPosition)w=function(g,i){if(g===i){h=true;return 0}if(!g.compareDocumentPosition||!i.compareDocumentPosition)return g.compareDocumentPosition?-1:1;return g.compareDocumentPosition(i)&4?-1:1};else{w=function(g,i){var n,m,p=[],q=[];n=g.parentNode;m=i.parentNode;var u=n;if(g===i){h=true;return 0}else if(n===m)return I(g,i);else if(n){if(!m)return 1}else return-1;
for(;u;){p.unshift(u);u=u.parentNode}for(u=m;u;){q.unshift(u);u=u.parentNode}n=p.length;m=q.length;for(u=0;u<n&&u<m;u++)if(p[u]!==q[u])return I(p[u],q[u]);return u===n?I(g,q[u],-1):I(p[u],i,1)};I=function(g,i,n){if(g===i)return n;for(g=g.nextSibling;g;){if(g===i)return-1;g=g.nextSibling}return 1}}k.getText=function(g){for(var i="",n,m=0;g[m];m++){n=g[m];if(n.nodeType===3||n.nodeType===4)i+=n.nodeValue;else if(n.nodeType!==8)i+=k.getText(n.childNodes)}return i};(function(){var g=t.createElement("div"),
i="script"+(new Date).getTime(),n=t.documentElement;g.innerHTML="<a name='"+i+"'/>";n.insertBefore(g,n.firstChild);if(t.getElementById(i)){o.find.ID=function(m,p,q){if(typeof p.getElementById!=="undefined"&&!q)return(p=p.getElementById(m[1]))?p.id===m[1]||typeof p.getAttributeNode!=="undefined"&&p.getAttributeNode("id").nodeValue===m[1]?[p]:B:[]};o.filter.ID=function(m,p){var q=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&q&&q.nodeValue===p}}n.removeChild(g);
n=g=null})();(function(){var g=t.createElement("div");g.appendChild(t.createComment(""));if(g.getElementsByTagName("*").length>0)o.find.TAG=function(i,n){var m=n.getElementsByTagName(i[1]);if(i[1]==="*"){for(var p=[],q=0;m[q];q++)m[q].nodeType===1&&p.push(m[q]);m=p}return m};g.innerHTML="<a href='#'></a>";if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")o.attrHandle.href=function(i){return i.getAttribute("href",2)};g=null})();t.querySelectorAll&&
function(){var g=k,i=t.createElement("div");i.innerHTML="<p class='TEST'></p>";if(!(i.querySelectorAll&&i.querySelectorAll(".TEST").length===0)){k=function(m,p,q,u){p=p||t;m=m.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!u&&!k.isXML(p))if(p.nodeType===9)try{return C(p.querySelectorAll(m),q)}catch(y){}else if(p.nodeType===1&&p.nodeName.toLowerCase()!=="object"){var F=p.getAttribute("id"),M=F||"__sizzle__";F||p.setAttribute("id",M);try{return C(p.querySelectorAll("#"+M+" "+m),q)}catch(N){}finally{F||
p.removeAttribute("id")}}return g(m,p,q,u)};for(var n in g)k[n]=g[n];i=null}}();(function(){var g=t.documentElement,i=g.matchesSelector||g.mozMatchesSelector||g.webkitMatchesSelector||g.msMatchesSelector,n=false;try{i.call(t.documentElement,"[test!='']:sizzle")}catch(m){n=true}if(i)k.matchesSelector=function(p,q){q=q.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(p))try{if(n||!o.match.PSEUDO.test(q)&&!/!=/.test(q))return i.call(p,q)}catch(u){}return k(q,null,null,[p]).length>0}})();(function(){var g=
t.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){o.order.splice(1,0,"CLASS");o.find.CLASS=function(i,n,m){if(typeof n.getElementsByClassName!=="undefined"&&!m)return n.getElementsByClassName(i[1])};g=null}}})();k.contains=t.documentElement.contains?function(g,i){return g!==i&&(g.contains?g.contains(i):true)}:t.documentElement.compareDocumentPosition?
function(g,i){return!!(g.compareDocumentPosition(i)&16)}:function(){return false};k.isXML=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false};var L=function(g,i){for(var n,m=[],p="",q=i.nodeType?[i]:i;n=o.match.PSEUDO.exec(g);){p+=n[0];g=g.replace(o.match.PSEUDO,"")}g=o.relative[g]?g+"*":g;n=0;for(var u=q.length;n<u;n++)k(g,q[n],m);return k.filter(p,m)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=k.getText;c.isXMLDoc=k.isXML;
c.contains=k.contains})();var Za=/Until$/,$a=/^(?:parents|prevUntil|prevAll)/,ab=/,/,Na=/^.[^:#\[\.,]*$/,bb=Array.prototype.slice,cb=c.expr.match.POS;c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,e=0,f=this.length;e<f;e++){d=b.length;c.find(a,this[e],b);if(e>0)for(var h=d;h<b.length;h++)for(var l=0;l<d;l++)if(b[l]===b[h]){b.splice(h--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,e=b.length;d<e;d++)if(c.contains(this,b[d]))return true})},
not:function(a){return this.pushStack(ma(this,a,false),"not",a)},filter:function(a){return this.pushStack(ma(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){var d=[],e,f,h=this[0];if(c.isArray(a)){var l,k={},o=1;if(h&&a.length){e=0;for(f=a.length;e<f;e++){l=a[e];k[l]||(k[l]=c.expr.match.POS.test(l)?c(l,b||this.context):l)}for(;h&&h.ownerDocument&&h!==b;){for(l in k){e=k[l];if(e.jquery?e.index(h)>-1:c(h).is(e))d.push({selector:l,elem:h,level:o})}h=
h.parentNode;o++}}return d}l=cb.test(a)?c(a,b||this.context):null;e=0;for(f=this.length;e<f;e++)for(h=this[e];h;)if(l?l.index(h)>-1:c.find.matchesSelector(h,a)){d.push(h);break}else{h=h.parentNode;if(!h||!h.ownerDocument||h===b)break}d=d.length>1?c.unique(d):d;return this.pushStack(d,"closest",a)},index:function(a){if(!a||typeof a==="string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var d=typeof a==="string"?c(a,b||this.context):
c.makeArray(a),e=c.merge(this.get(),d);return this.pushStack(!d[0]||!d[0].parentNode||d[0].parentNode.nodeType===11||!e[0]||!e[0].parentNode||e[0].parentNode.nodeType===11?e:c.unique(e))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,
2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,
b){c.fn[a]=function(d,e){var f=c.map(this,b,d);Za.test(a)||(e=d);if(e&&typeof e==="string")f=c.filter(e,f);f=this.length>1?c.unique(f):f;if((this.length>1||ab.test(e))&&$a.test(a))f=f.reverse();return this.pushStack(f,a,bb.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return b.length===1?c.find.matchesSelector(b[0],a)?[b[0]]:[]:c.find.matches(a,b)},dir:function(a,b,d){var e=[];for(a=a[b];a&&a.nodeType!==9&&(d===B||a.nodeType!==1||!c(a).is(d));){a.nodeType===1&&
e.push(a);a=a[b]}return e},nth:function(a,b,d){b=b||1;for(var e=0;a;a=a[d])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var za=/ jQ\d+="(?:\d+|null)"/g,$=/^\s+/,Aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Ba=/<([\w:]+)/,db=/<tbody/i,eb=/<|&#?\w+;/,Ca=/<(?:script|object|embed|option|style)/i,Da=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/\=([^="'>\s]+\/)>/g,P={option:[1,
"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};P.optgroup=P.option;P.tbody=P.tfoot=P.colgroup=P.caption=P.thead;P.th=P.td;if(!c.support.htmlSerialize)P._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==B)return this.empty().append((this[0]&&this[0].ownerDocument||t).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,e;(e=this[d])!=null;d++)if(!a||c.filter(a,[e]).length){if(!b&&e.nodeType===1){c.cleanData(e.getElementsByTagName("*"));c.cleanData([e])}e.parentNode&&e.parentNode.removeChild(e)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,e=this.ownerDocument;if(!d){d=e.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(za,"").replace(fb,'="$1">').replace($,"")],e)[0]}else return this.cloneNode(true)});if(a===true){na(this,b);na(this.find("*"),b.find("*"))}return b},html:function(a){if(a===B)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(za,""):null;
else if(typeof a==="string"&&!Ca.test(a)&&(c.support.leadingWhitespace||!$.test(a))&&!P[(Ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Aa,"<$1></$2>");try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(e){this.empty().append(a)}}else c.isFunction(a)?this.each(function(f){var h=c(this);h.html(a.call(this,f,h.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=
c(this),e=d.html();d.replaceWith(a.call(this,b,e))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){var e,f,h,l=a[0],k=[];if(!c.support.checkClone&&arguments.length===3&&typeof l==="string"&&Da.test(l))return this.each(function(){c(this).domManip(a,
b,d,true)});if(c.isFunction(l))return this.each(function(x){var r=c(this);a[0]=l.call(this,x,b?r.html():B);r.domManip(a,b,d)});if(this[0]){e=l&&l.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:c.buildFragment(a,this,k);h=e.fragment;if(f=h.childNodes.length===1?h=h.firstChild:h.firstChild){b=b&&c.nodeName(f,"tr");f=0;for(var o=this.length;f<o;f++)d.call(b?c.nodeName(this[f],"table")?this[f].getElementsByTagName("tbody")[0]||this[f].appendChild(this[f].ownerDocument.createElement("tbody")):
this[f]:this[f],f>0||e.cacheable||this.length>1?h.cloneNode(true):h)}k.length&&c.each(k,Oa)}return this}});c.buildFragment=function(a,b,d){var e,f,h;b=b&&b[0]?b[0].ownerDocument||b[0]:t;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===t&&!Ca.test(a[0])&&(c.support.checkClone||!Da.test(a[0]))){f=true;if(h=c.fragments[a[0]])if(h!==1)e=h}if(!e){e=b.createDocumentFragment();c.clean(a,b,e,d)}if(f)c.fragments[a[0]]=h?e:1;return{fragment:e,cacheable:f}};c.fragments={};c.each({appendTo:"append",
prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var e=[];d=c(d);var f=this.length===1&&this[0].parentNode;if(f&&f.nodeType===11&&f.childNodes.length===1&&d.length===1){d[b](this[0]);return this}else{f=0;for(var h=d.length;f<h;f++){var l=(f>0?this.clone(true):this).get();c(d[f])[b](l);e=e.concat(l)}return this.pushStack(e,a,d.selector)}}});c.extend({clean:function(a,b,d,e){b=b||t;if(typeof b.createElement==="undefined")b=b.ownerDocument||
b[0]&&b[0].ownerDocument||t;for(var f=[],h=0,l;(l=a[h])!=null;h++){if(typeof l==="number")l+="";if(l){if(typeof l==="string"&&!eb.test(l))l=b.createTextNode(l);else if(typeof l==="string"){l=l.replace(Aa,"<$1></$2>");var k=(Ba.exec(l)||["",""])[1].toLowerCase(),o=P[k]||P._default,x=o[0],r=b.createElement("div");for(r.innerHTML=o[1]+l+o[2];x--;)r=r.lastChild;if(!c.support.tbody){x=db.test(l);k=k==="table"&&!x?r.firstChild&&r.firstChild.childNodes:o[1]==="<table>"&&!x?r.childNodes:[];for(o=k.length-
1;o>=0;--o)c.nodeName(k[o],"tbody")&&!k[o].childNodes.length&&k[o].parentNode.removeChild(k[o])}!c.support.leadingWhitespace&&$.test(l)&&r.insertBefore(b.createTextNode($.exec(l)[0]),r.firstChild);l=r.childNodes}if(l.nodeType)f.push(l);else f=c.merge(f,l)}}if(d)for(h=0;f[h];h++)if(e&&c.nodeName(f[h],"script")&&(!f[h].type||f[h].type.toLowerCase()==="text/javascript"))e.push(f[h].parentNode?f[h].parentNode.removeChild(f[h]):f[h]);else{f[h].nodeType===1&&f.splice.apply(f,[h+1,0].concat(c.makeArray(f[h].getElementsByTagName("script"))));
d.appendChild(f[h])}return f},cleanData:function(a){for(var b,d,e=c.cache,f=c.event.special,h=c.support.deleteExpando,l=0,k;(k=a[l])!=null;l++)if(!(k.nodeName&&c.noData[k.nodeName.toLowerCase()]))if(d=k[c.expando]){if((b=e[d])&&b.events)for(var o in b.events)f[o]?c.event.remove(k,o):c.removeEvent(k,o,b.handle);if(h)delete k[c.expando];else k.removeAttribute&&k.removeAttribute(c.expando);delete e[d]}}});var Ea=/alpha\([^)]*\)/i,gb=/opacity=([^)]*)/,hb=/-([a-z])/ig,ib=/([A-Z])/g,Fa=/^-?\d+(?:px)?$/i,
jb=/^-?\d/,kb={position:"absolute",visibility:"hidden",display:"block"},Pa=["Left","Right"],Qa=["Top","Bottom"],W,Ga,aa,lb=function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){if(arguments.length===2&&b===B)return this;return c.access(this,a,b,true,function(d,e,f){return f!==B?c.style(d,e,f):c.css(d,e)})};c.extend({cssHooks:{opacity:{get:function(a,b){if(b){var d=W(a,"opacity","opacity");return d===""?"1":d}else return a.style.opacity}}},cssNumber:{zIndex:true,fontWeight:true,opacity:true,
zoom:true,lineHeight:true},cssProps:{"float":c.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,d,e){if(!(!a||a.nodeType===3||a.nodeType===8||!a.style)){var f,h=c.camelCase(b),l=a.style,k=c.cssHooks[h];b=c.cssProps[h]||h;if(d!==B){if(!(typeof d==="number"&&isNaN(d)||d==null)){if(typeof d==="number"&&!c.cssNumber[h])d+="px";if(!k||!("set"in k)||(d=k.set(a,d))!==B)try{l[b]=d}catch(o){}}}else{if(k&&"get"in k&&(f=k.get(a,false,e))!==B)return f;return l[b]}}},css:function(a,b,d){var e,f=c.camelCase(b),
h=c.cssHooks[f];b=c.cssProps[f]||f;if(h&&"get"in h&&(e=h.get(a,true,d))!==B)return e;else if(W)return W(a,b,f)},swap:function(a,b,d){var e={},f;for(f in b){e[f]=a.style[f];a.style[f]=b[f]}d.call(a);for(f in b)a.style[f]=e[f]},camelCase:function(a){return a.replace(hb,lb)}});c.curCSS=c.css;c.each(["height","width"],function(a,b){c.cssHooks[b]={get:function(d,e,f){var h;if(e){if(d.offsetWidth!==0)h=oa(d,b,f);else c.swap(d,kb,function(){h=oa(d,b,f)});if(h<=0){h=W(d,b,b);if(h==="0px"&&aa)h=aa(d,b,b);
if(h!=null)return h===""||h==="auto"?"0px":h}if(h<0||h==null){h=d.style[b];return h===""||h==="auto"?"0px":h}return typeof h==="string"?h:h+"px"}},set:function(d,e){if(Fa.test(e)){e=parseFloat(e);if(e>=0)return e+"px"}else return e}}});if(!c.support.opacity)c.cssHooks.opacity={get:function(a,b){return gb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var d=a.style;d.zoom=1;var e=c.isNaN(b)?"":"alpha(opacity="+b*100+")",f=
d.filter||"";d.filter=Ea.test(f)?f.replace(Ea,e):d.filter+" "+e}};if(t.defaultView&&t.defaultView.getComputedStyle)Ga=function(a,b,d){var e;d=d.replace(ib,"-$1").toLowerCase();if(!(b=a.ownerDocument.defaultView))return B;if(b=b.getComputedStyle(a,null)){e=b.getPropertyValue(d);if(e===""&&!c.contains(a.ownerDocument.documentElement,a))e=c.style(a,d)}return e};if(t.documentElement.currentStyle)aa=function(a,b){var d,e,f=a.currentStyle&&a.currentStyle[b],h=a.style;if(!Fa.test(f)&&jb.test(f)){d=h.left;
e=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;h.left=b==="fontSize"?"1em":f||0;f=h.pixelLeft+"px";h.left=d;a.runtimeStyle.left=e}return f===""?"auto":f};W=Ga||aa;if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=a.offsetHeight;return a.offsetWidth===0&&b===0||!c.support.reliableHiddenOffsets&&(a.style.display||c.css(a,"display"))==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var mb=c.now(),nb=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
ob=/^(?:select|textarea)/i,pb=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,qb=/^(?:GET|HEAD)$/,Ra=/\[\]$/,T=/\=\?(&|$)/,ja=/\?/,rb=/([?&])_=[^&]*/,sb=/^(\w+:)?\/\/([^\/?#]+)/,tb=/%20/g,ub=/#.*$/,Ha=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!=="string"&&Ha)return Ha.apply(this,arguments);else if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var f=a.slice(e,a.length);a=a.slice(0,e)}e="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b===
"object"){b=c.param(b,c.ajaxSettings.traditional);e="POST"}var h=this;c.ajax({url:a,type:e,dataType:"html",data:b,complete:function(l,k){if(k==="success"||k==="notmodified")h.html(f?c("<div>").append(l.responseText.replace(nb,"")).find(f):l.responseText);d&&h.each(d,[l.responseText,k,l])}});return this},serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&
!this.disabled&&(this.checked||ob.test(this.nodeName)||pb.test(this.type))}).map(function(a,b){var d=c(this).val();return d==null?null:c.isArray(d)?c.map(d,function(e){return{name:b.name,value:e}}):{name:b.name,value:d}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,e){if(c.isFunction(b)){e=e||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:e})},
getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,e){if(c.isFunction(b)){e=e||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:e})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return new E.XMLHttpRequest},accepts:{xml:"application/xml, text/xml",html:"text/html",
script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},ajax:function(a){var b=c.extend(true,{},c.ajaxSettings,a),d,e,f,h=b.type.toUpperCase(),l=qb.test(h);b.url=b.url.replace(ub,"");b.context=a&&a.context!=null?a.context:b;if(b.data&&b.processData&&typeof b.data!=="string")b.data=c.param(b.data,b.traditional);if(b.dataType==="jsonp"){if(h==="GET")T.test(b.url)||(b.url+=(ja.test(b.url)?"&":"?")+(b.jsonp||"callback")+"=?");else if(!b.data||
!T.test(b.data))b.data=(b.data?b.data+"&":"")+(b.jsonp||"callback")+"=?";b.dataType="json"}if(b.dataType==="json"&&(b.data&&T.test(b.data)||T.test(b.url))){d=b.jsonpCallback||"jsonp"+mb++;if(b.data)b.data=(b.data+"").replace(T,"="+d+"$1");b.url=b.url.replace(T,"="+d+"$1");b.dataType="script";var k=E[d];E[d]=function(m){if(c.isFunction(k))k(m);else{E[d]=B;try{delete E[d]}catch(p){}}f=m;c.handleSuccess(b,w,e,f);c.handleComplete(b,w,e,f);r&&r.removeChild(A)}}if(b.dataType==="script"&&b.cache===null)b.cache=
false;if(b.cache===false&&l){var o=c.now(),x=b.url.replace(rb,"$1_="+o);b.url=x+(x===b.url?(ja.test(b.url)?"&":"?")+"_="+o:"")}if(b.data&&l)b.url+=(ja.test(b.url)?"&":"?")+b.data;b.global&&c.active++===0&&c.event.trigger("ajaxStart");o=(o=sb.exec(b.url))&&(o[1]&&o[1].toLowerCase()!==location.protocol||o[2].toLowerCase()!==location.host);if(b.dataType==="script"&&h==="GET"&&o){var r=t.getElementsByTagName("head")[0]||t.documentElement,A=t.createElement("script");if(b.scriptCharset)A.charset=b.scriptCharset;
A.src=b.url;if(!d){var C=false;A.onload=A.onreadystatechange=function(){if(!C&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){C=true;c.handleSuccess(b,w,e,f);c.handleComplete(b,w,e,f);A.onload=A.onreadystatechange=null;r&&A.parentNode&&r.removeChild(A)}}}r.insertBefore(A,r.firstChild);return B}var J=false,w=b.xhr();if(w){b.username?w.open(h,b.url,b.async,b.username,b.password):w.open(h,b.url,b.async);try{if(b.data!=null&&!l||a&&a.contentType)w.setRequestHeader("Content-Type",
b.contentType);if(b.ifModified){c.lastModified[b.url]&&w.setRequestHeader("If-Modified-Since",c.lastModified[b.url]);c.etag[b.url]&&w.setRequestHeader("If-None-Match",c.etag[b.url])}o||w.setRequestHeader("X-Requested-With","XMLHttpRequest");w.setRequestHeader("Accept",b.dataType&&b.accepts[b.dataType]?b.accepts[b.dataType]+", */*; q=0.01":b.accepts._default)}catch(I){}if(b.beforeSend&&b.beforeSend.call(b.context,w,b)===false){b.global&&c.active--===1&&c.event.trigger("ajaxStop");w.abort();return false}b.global&&
c.triggerGlobal(b,"ajaxSend",[w,b]);var L=w.onreadystatechange=function(m){if(!w||w.readyState===0||m==="abort"){J||c.handleComplete(b,w,e,f);J=true;if(w)w.onreadystatechange=c.noop}else if(!J&&w&&(w.readyState===4||m==="timeout")){J=true;w.onreadystatechange=c.noop;e=m==="timeout"?"timeout":!c.httpSuccess(w)?"error":b.ifModified&&c.httpNotModified(w,b.url)?"notmodified":"success";var p;if(e==="success")try{f=c.httpData(w,b.dataType,b)}catch(q){e="parsererror";p=q}if(e==="success"||e==="notmodified")d||
c.handleSuccess(b,w,e,f);else c.handleError(b,w,e,p);d||c.handleComplete(b,w,e,f);m==="timeout"&&w.abort();if(b.async)w=null}};try{var g=w.abort;w.abort=function(){w&&Function.prototype.call.call(g,w);L("abort")}}catch(i){}b.async&&b.timeout>0&&setTimeout(function(){w&&!J&&L("timeout")},b.timeout);try{w.send(l||b.data==null?null:b.data)}catch(n){c.handleError(b,w,null,n);c.handleComplete(b,w,e,f)}b.async||L();return w}},param:function(a,b){var d=[],e=function(h,l){l=c.isFunction(l)?l():l;d[d.length]=
encodeURIComponent(h)+"="+encodeURIComponent(l)};if(b===B)b=c.ajaxSettings.traditional;if(c.isArray(a)||a.jquery)c.each(a,function(){e(this.name,this.value)});else for(var f in a)da(f,a[f],b,e);return d.join("&").replace(tb,"+")}});c.extend({active:0,lastModified:{},etag:{},handleError:function(a,b,d,e){a.error&&a.error.call(a.context,b,d,e);a.global&&c.triggerGlobal(a,"ajaxError",[b,a,e])},handleSuccess:function(a,b,d,e){a.success&&a.success.call(a.context,e,d,b);a.global&&c.triggerGlobal(a,"ajaxSuccess",
[b,a])},handleComplete:function(a,b,d){a.complete&&a.complete.call(a.context,b,d);a.global&&c.triggerGlobal(a,"ajaxComplete",[b,a]);a.global&&c.active--===1&&c.event.trigger("ajaxStop")},triggerGlobal:function(a,b,d){(a.context&&a.context.url==null?c(a.context):c.event).trigger(b,d)},httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===1223}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),
e=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(e)c.etag[b]=e;return a.status===304},httpData:function(a,b,d){var e=a.getResponseHeader("content-type")||"",f=b==="xml"||!b&&e.indexOf("xml")>=0;a=f?a.responseXML:a.responseText;f&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b==="json"||!b&&e.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&e.indexOf("javascript")>=0)c.globalEval(a);return a}});
if(E.ActiveXObject)c.ajaxSettings.xhr=function(){if(E.location.protocol!=="file:")try{return new E.XMLHttpRequest}catch(a){}try{return new E.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}};c.support.ajax=!!c.ajaxSettings.xhr();var ea={},vb=/^(?:toggle|show|hide)$/,wb=/^([+\-]=)?([\d+.\-]+)(.*)$/,ba,pa=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b,d){if(a||a===0)return this.animate(S("show",
3),a,b,d);else{d=0;for(var e=this.length;d<e;d++){a=this[d];b=a.style.display;if(!c.data(a,"olddisplay")&&b==="none")b=a.style.display="";b===""&&c.css(a,"display")==="none"&&c.data(a,"olddisplay",qa(a.nodeName))}for(d=0;d<e;d++){a=this[d];b=a.style.display;if(b===""||b==="none")a.style.display=c.data(a,"olddisplay")||""}return this}},hide:function(a,b,d){if(a||a===0)return this.animate(S("hide",3),a,b,d);else{a=0;for(b=this.length;a<b;a++){d=c.css(this[a],"display");d!=="none"&&c.data(this[a],"olddisplay",
d)}for(a=0;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b,d){var e=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||e?this.each(function(){var f=e?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(S("toggle",3),a,b,d);return this},fadeTo:function(a,b,d,e){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d,e)},animate:function(a,b,d,e){var f=c.speed(b,
d,e);if(c.isEmptyObject(a))return this.each(f.complete);return this[f.queue===false?"each":"queue"](function(){var h=c.extend({},f),l,k=this.nodeType===1,o=k&&c(this).is(":hidden"),x=this;for(l in a){var r=c.camelCase(l);if(l!==r){a[r]=a[l];delete a[l];l=r}if(a[l]==="hide"&&o||a[l]==="show"&&!o)return h.complete.call(this);if(k&&(l==="height"||l==="width")){h.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(c.css(this,"display")==="inline"&&c.css(this,"float")==="none")if(c.support.inlineBlockNeedsLayout)if(qa(this.nodeName)===
"inline")this.style.display="inline-block";else{this.style.display="inline";this.style.zoom=1}else this.style.display="inline-block"}if(c.isArray(a[l])){(h.specialEasing=h.specialEasing||{})[l]=a[l][1];a[l]=a[l][0]}}if(h.overflow!=null)this.style.overflow="hidden";h.curAnim=c.extend({},a);c.each(a,function(A,C){var J=new c.fx(x,h,A);if(vb.test(C))J[C==="toggle"?o?"show":"hide":C](a);else{var w=wb.exec(C),I=J.cur()||0;if(w){var L=parseFloat(w[2]),g=w[3]||"px";if(g!=="px"){c.style(x,A,(L||1)+g);I=(L||
1)/J.cur()*I;c.style(x,A,I+g)}if(w[1])L=(w[1]==="-="?-1:1)*L+I;J.custom(I,L,g)}else J.custom(I,C,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);this.each(function(){for(var e=d.length-1;e>=0;e--)if(d[e].elem===this){b&&d[e](true);d.splice(e,1)}});b||this.dequeue();return this}});c.each({slideDown:S("show",1),slideUp:S("hide",1),slideToggle:S("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){c.fn[a]=function(d,e,f){return this.animate(b,
d,e,f)}});c.extend({speed:function(a,b,d){var e=a&&typeof a==="object"?c.extend({},a):{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};e.duration=c.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in c.fx.speeds?c.fx.speeds[e.duration]:c.fx.speeds._default;e.old=e.complete;e.complete=function(){e.queue!==false&&c(this).dequeue();c.isFunction(e.old)&&e.old.call(this)};return e},easing:{linear:function(a,b,d,e){return d+e*a},swing:function(a,b,d,e){return(-Math.cos(a*
Math.PI)/2+0.5)*e+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||c.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a=parseFloat(c.css(this.elem,this.prop));return a&&a>-1E4?a:0},custom:function(a,b,d){function e(l){return f.step(l)}
var f=this,h=c.fx;this.startTime=c.now();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;this.pos=this.state=0;e.elem=this.elem;if(e()&&c.timers.push(e)&&!ba)ba=setInterval(h.tick,h.interval)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;
this.custom(this.cur(),0)},step:function(a){var b=c.now(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var e in this.options.curAnim)if(this.options.curAnim[e]!==true)d=false;if(d){if(this.options.overflow!=null&&!c.support.shrinkWrapBlocks){var f=this.elem,h=this.options;c.each(["","X","Y"],function(k,o){f.style["overflow"+o]=h.overflow[k]})}this.options.hide&&c(this.elem).hide();if(this.options.hide||
this.options.show)for(var l in this.options.curAnim)c.style(this.elem,l,this.options.orig[l]);this.options.complete.call(this.elem)}return false}else{a=b-this.startTime;this.state=a/this.options.duration;b=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||b](this.state,a,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=
c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||c.fx.stop()},interval:13,stop:function(){clearInterval(ba);ba=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===
b.elem}).length};var xb=/^t(?:able|d|h)$/i,Ia=/^(?:body|html)$/i;c.fn.offset="getBoundingClientRect"in t.documentElement?function(a){var b=this[0],d;if(a)return this.each(function(l){c.offset.setOffset(this,a,l)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);try{d=b.getBoundingClientRect()}catch(e){}var f=b.ownerDocument,h=f.documentElement;if(!d||!c.contains(h,b))return d||{top:0,left:0};b=f.body;f=fa(f);return{top:d.top+(f.pageYOffset||c.support.boxModel&&
h.scrollTop||b.scrollTop)-(h.clientTop||b.clientTop||0),left:d.left+(f.pageXOffset||c.support.boxModel&&h.scrollLeft||b.scrollLeft)-(h.clientLeft||b.clientLeft||0)}}:function(a){var b=this[0];if(a)return this.each(function(x){c.offset.setOffset(this,a,x)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d,e=b.offsetParent,f=b.ownerDocument,h=f.documentElement,l=f.body;d=(f=f.defaultView)?f.getComputedStyle(b,null):b.currentStyle;
for(var k=b.offsetTop,o=b.offsetLeft;(b=b.parentNode)&&b!==l&&b!==h;){if(c.offset.supportsFixedPosition&&d.position==="fixed")break;d=f?f.getComputedStyle(b,null):b.currentStyle;k-=b.scrollTop;o-=b.scrollLeft;if(b===e){k+=b.offsetTop;o+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&xb.test(b.nodeName))){k+=parseFloat(d.borderTopWidth)||0;o+=parseFloat(d.borderLeftWidth)||0}e=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"){k+=
parseFloat(d.borderTopWidth)||0;o+=parseFloat(d.borderLeftWidth)||0}d=d}if(d.position==="relative"||d.position==="static"){k+=l.offsetTop;o+=l.offsetLeft}if(c.offset.supportsFixedPosition&&d.position==="fixed"){k+=Math.max(h.scrollTop,l.scrollTop);o+=Math.max(h.scrollLeft,l.scrollLeft)}return{top:k,left:o}};c.offset={initialize:function(){var a=t.body,b=t.createElement("div"),d,e,f,h=parseFloat(c.css(a,"marginTop"))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",
height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";a.insertBefore(b,a.firstChild);d=b.firstChild;e=d.firstChild;f=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=e.offsetTop!==5;this.doesAddBorderForTableAndCells=
f.offsetTop===5;e.style.position="fixed";e.style.top="20px";this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15;e.style.position=e.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==h;a.removeChild(b);c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.css(a,
"marginTop"))||0;d+=parseFloat(c.css(a,"marginLeft"))||0}return{top:b,left:d}},setOffset:function(a,b,d){var e=c.css(a,"position");if(e==="static")a.style.position="relative";var f=c(a),h=f.offset(),l=c.css(a,"top"),k=c.css(a,"left"),o=e==="absolute"&&c.inArray("auto",[l,k])>-1;e={};var x={};if(o)x=f.position();l=o?x.top:parseInt(l,10)||0;k=o?x.left:parseInt(k,10)||0;if(c.isFunction(b))b=b.call(a,d,h);if(b.top!=null)e.top=b.top-h.top+l;if(b.left!=null)e.left=b.left-h.left+k;"using"in b?b.using.call(a,
e):f.css(e)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),e=Ia.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.css(a,"marginTop"))||0;d.left-=parseFloat(c.css(a,"marginLeft"))||0;e.top+=parseFloat(c.css(b[0],"borderTopWidth"))||0;e.left+=parseFloat(c.css(b[0],"borderLeftWidth"))||0;return{top:d.top-e.top,left:d.left-e.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||t.body;a&&!Ia.test(a.nodeName)&&
c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(e){var f=this[0],h;if(!f)return null;if(e!==B)return this.each(function(){if(h=fa(this))h.scrollTo(!a?e:c(h).scrollLeft(),a?e:c(h).scrollTop());else this[d]=e});else return(h=fa(f))?"pageXOffset"in h?h[a?"pageYOffset":"pageXOffset"]:c.support.boxModel&&h.document.documentElement[d]||h.document.body[d]:f[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();
c.fn["inner"+b]=function(){return this[0]?parseFloat(c.css(this[0],d,"padding")):null};c.fn["outer"+b]=function(e){return this[0]?parseFloat(c.css(this[0],d,e?"margin":"border")):null};c.fn[d]=function(e){var f=this[0];if(!f)return e==null?null:this;if(c.isFunction(e))return this.each(function(l){var k=c(this);k[d](e.call(this,l,k[d]()))});if(c.isWindow(f))return f.document.compatMode==="CSS1Compat"&&f.document.documentElement["client"+b]||f.document.body["client"+b];else if(f.nodeType===9)return Math.max(f.documentElement["client"+
b],f.body["scroll"+b],f.documentElement["scroll"+b],f.body["offset"+b],f.documentElement["offset"+b]);else if(e===B){f=c.css(f,d);var h=parseFloat(f);return c.isNaN(h)?f:h}else return this.css(d,typeof e==="string"?e:e+"px")}})})(window);

/*********************************
    END jQuery 1.4.4 MINIFIED
**********************************/

jQ.noConflict();

/***********************
  INCLUDING Facebox 1.3
************************/

/*
 * Facebox (for jQ)
 * version: 1.2 (05/05/2008)
 * @requires jQ v1.2 or later
 *
 * Examples at http://famspam.com/facebox/
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2007, 2008 Chris Wanstrath [ chris@ozmm.org ]
 *
 */
(function($) {
  $.facebox = function(data, klass) {
    $.facebox.loading()

    if (data.ajax) fillFaceboxFromAjax(data.ajax, klass)
    else if (data.image) fillFaceboxFromImage(data.image, klass)
    else if (data.div) fillFaceboxFromHref(data.div, klass)
    else if ($.isFunction(data)) data.call($)
    else $.facebox.reveal(data, klass)
  }

  /*
   * Public, $.facebox methods
   */

  $.extend($.facebox, {
    settings: {
      opacity      : 0.2,
      overlay      : true,
      loadingImage : limg,
      closeImage   : cimg,
      imageTypes   : [ 'png', 'jpg', 'jpeg', 'gif' ],
      faceboxHtml  : '\
    <div id="facebox" style="display:none;"> \
      <div class="fbpopup"> \
        <div class="fbcontent"> \
        </div> \
        <a href="#" class="fbclose"><img src="' + cimg + '" title="close" class="fbclose_image" /></a> \
      </div> \
    </div>'
    },

    loading: function() {
      init()
      if ($('#facebox .fbloading').length == 1) return true
      showOverlay()

      $('#facebox .fbcontent').empty()
      $('#facebox .fbbody').children().hide().end().
        append('<div class="fbloading"><img src="'+$.facebox.settings.loadingImage+'"/></div>')

      $('#facebox').css({
        top:	getPageScroll()[1] + (getPageHeight() / 10),
        left:	$(window).width() / 2 - 205
      }).show()

      $(document).bind('keydown.facebox', function(e) {
        if (e.keyCode == 27) $.facebox.close()
        return true
      })
      $(document).trigger('loading.facebox')
    },

    reveal: function(data, klass) {
      $(document).trigger('beforeReveal.facebox')
      if (klass) $('#facebox .fbcontent').addClass(klass)
      $('#facebox .fbcontent').append(data)
      $('#facebox .fbloading').remove()
      $('#facebox .fbbody').children().fadeIn('normal')
      $('#facebox').css('left', $(window).width() / 2 - ($('#facebox .fbpopup').width() / 2))
      $(document).trigger('reveal.facebox').trigger('afterReveal.facebox')
    },

    close: function() {
      $(document).trigger('close.facebox')
      return false
    }
  })

  /*
   * Public, $.fn methods
   */

  $.fn.facebox = function(settings) {
    if ($(this).length == 0) return

    init(settings)

    function clickHandler() {
      $.facebox.loading(true)

      // support for rel="facebox.inline_popup" syntax, to add a class
      // also supports deprecated "facebox[.inline_popup]" syntax
      var klass = this.rel.match(/facebox\[?\.(\w+)\]?/)
      if (klass) klass = klass[1]

      fillFaceboxFromHref(this.href, klass)
      return false
    }

    return this.bind('click.facebox', clickHandler)
  }

  /*
   * Private methods
   */

  // called one time to setup facebox on this page
  function init(settings) {
    if ($.facebox.settings.inited) return true
    else $.facebox.settings.inited = true

    $(document).trigger('init.facebox')
    makeCompatible()

    var imageTypes = $.facebox.settings.imageTypes.join('|')
    $.facebox.settings.imageTypesRegexp = new RegExp('\.(' + imageTypes + ')$', 'i')

    if (settings) $.extend($.facebox.settings, settings)
    if ($('#facebox').size()==0) $('body').append($.facebox.settings.faceboxHtml)

    var preload = [ new Image(), new Image() ]
    preload[0].src = $.facebox.settings.closeImage
    preload[1].src = $.facebox.settings.loadingImage

    $('#facebox').find('.b:first, .bl').each(function() {
      preload.push(new Image())
      preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1')
    })

    $('#facebox .fbclose').click($.facebox.close)
    $('#facebox .fbclose_image').attr('src', $.facebox.settings.closeImage)
  }

  // getPageScroll() by quirksmode.com
  function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }
    return new Array(xScroll,yScroll)
  }

  // Adapted from getPageSize() by quirksmode.com
  function getPageHeight() {
    var windowHeight
    if (self.innerHeight) {	// all except Explorer
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }
    return windowHeight
  }

  // Backwards compatibility
  function makeCompatible() {
    var $s = $.facebox.settings

    $s.loadingImage = $s.loading_image || $s.loadingImage
    $s.closeImage = $s.close_image || $s.closeImage
    $s.imageTypes = $s.image_types || $s.imageTypes
    $s.faceboxHtml = $s.facebox_html || $s.faceboxHtml
  }

  // Figures out what you want to display and displays it
  // formats are:
  //     div: #id
  //   image: blah.extension
  //    ajax: anything else
  function fillFaceboxFromHref(href, klass) {
    // div
    if (href.match(/#/)) {
      var url    = window.location.href.split('#')[0]
      var target = href.replace(url,'')
      if (target == '#') return
      $.facebox.reveal($(target).html(), klass)

    // image
    } else if (href.match($.facebox.settings.imageTypesRegexp)) {
      fillFaceboxFromImage(href, klass)
    // ajax
    } else {
      fillFaceboxFromAjax(href, klass)
    }
  }

  function fillFaceboxFromImage(href, klass) {
    var image = new Image()
    image.onload = function() {
      $.facebox.reveal('<div class="fbimage"><img src="' + image.src + '" /></div>', klass)
    }
    image.src = href
  }

  function fillFaceboxFromAjax(href, klass) {
    $.get(href, function(data) { $.facebox.reveal(data, klass) })
  }

  function skipOverlay() {
    return $.facebox.settings.overlay == false || $.facebox.settings.opacity === null
  }

  function showOverlay() {
    if (skipOverlay()) return

    if ($('#facebox_overlay').length == 0)
      $("body").append('<div id="facebox_overlay" class="facebox_hide"></div>')

    $('#facebox_overlay').hide().addClass("facebox_overlayBG")
      .css('opacity', $.facebox.settings.opacity)
      .click(function() { $(document).trigger('close.facebox') })
      .fadeIn(200)
    return false
  }

  function hideOverlay() {
    if (skipOverlay()) return

    $('#facebox_overlay').fadeOut(200, function(){
      $("#facebox_overlay").removeClass("facebox_overlayBG")
      $("#facebox_overlay").addClass("facebox_hide")
      $("#facebox_overlay").remove()
    })

    return false
  }

  /*
   * Bindings
   */

  $(document).bind('close.facebox', function() {
    $(document).unbind('keydown.facebox')
    $('#facebox').fadeOut(function() {
      $('#facebox .fbcontent').removeClass().addClass('fbcontent').empty()
      $('#facebox .fbloading').remove()
      $(document).trigger('afterClose.facebox')
    })
    hideOverlay()
  })

})(jQ);

var fbcss = '#facebox .fbcontent.groovy{width:800px; height:500px; overflow-y: scroll; background: #fff; opacity:1} #facebox {position: absolute;top: 0;left: 0;z-index: 2001;text-align: left;} #facebox .fbpopup{position:relative;top:100px;left:0px;border:3px solid rgba(0,0,0,0);-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:0 0 18px rgba(0,0,0,0.4);-moz-box-shadow:0 0 18px rgba(0,0,0,0.4);box-shadow:0 0 18px rgba(0,0,0,0.4);}#facebox .fbcontent {display:table;width: 190px;padding: 10px;background: #fff; opacity:0.9;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}#facebox .fbcontent > p:first-child{margin-top:0;}#facebox .fbcontent > p:last-child{margin-bottom:0;}#facebox .fbclose{position:absolute;top:5px;right:5px;padding:2px;background:#fff;}#facebox .fbclose img{opacity:0.3;}#facebox .fbclose:hover img{opacity:1.0;}#facebox .fbloading {text-align: center;}#facebox .image {text-align: center;}#facebox img {border: 0;margin: 0;}#facebox_overlay {position: fixed;top: 0px;left: 0px;height:100%;width:100%;}.facebox_hide {z-index:-100;}.facebox_overlayBG {background-color: #000;z-index: 2000;}';

/***********************
     END Facebox 1.3
************************/

jQ(document).ready(function($) {

  $('a[rel*=facebox]').facebox({
    loadingImage: limg,
    closeImage: cimg
  })
  
  updateSets();
  
  setsList = getSetCookie();
  blackList = getFilterCookie();
  favList = getFavsCookie();
  
  writeBlockList("", 0, "block");
  writeBlockList("", 0, "favs");
})

jQ(document).bind('loading.facebox', function($) {
  
  updateSets();
}) 

jQ(document).bind('afterClose.facebox', function($) {
  
  var getCookie = getFilterCookie();
  var getFavsCookieVar = getFavsCookie();
  var getCookieSets = getSetCookie();
  
  if ((blackList.length > getCookie.length)
      || (setsList.join() != getCookieSets.join())
      || (favList.join() != getFavsCookieVar.join())) {
    window.location.reload();
  } else if ((filterRange) && (getCookie.length > 0)) { 
    
    if (enabledAll == 1) {

      if (docURL.indexOf("dashboard/comments") >= 0) {
      
       if (filterCommentsPage == 1) {
       
         blackList = getCookie;
         normalScrolling();
       }
      } else {
      
        blackList = getCookie;
        normalScrolling();
      }
    }
  }
})       

function updateSets() {

  var setArray = getSetCookie();
  
  if (setArray.length == 0) {
    setCookie('dbdbfilter_sets', "1,1,1,1", 365);
  } else {
              
    enabledAll = (setArray[0] == "1") ? 1 : 0;
    infiniteScrolling = (setArray[1] == "1") ? 1 : 0;
    blockReceiver = (setArray[2] == "1") ? 1 : 0;
    filterCommentsPage = (setArray[3] == "1") ? 1 : 0;
  }
       
  if (enabledAll == 1)
    document.getElementById('chkEnabled').setAttribute("checked", "checked"); 
  else
    document.getElementById('chkEnabled').removeAttribute("checked");  
             
  if (infiniteScrolling == 1)
    document.getElementById('chkScrolling').setAttribute("checked", "checked"); 
  else
    document.getElementById('chkScrolling').removeAttribute("checked");
                  
  if (blockReceiver == 1)
    document.getElementById('chkReceiver').setAttribute("checked", "checked"); 
  else
    document.getElementById('chkReceiver').removeAttribute("checked");
    
  if (filterCommentsPage == 1)
    document.getElementById('chkComments').setAttribute("checked", "checked");
  else
    document.getElementById('chkComments').removeAttribute("checked");
}

function getElementsByClassAlt(searchClass, domNode, tagName) {
 
  if (domNode == null) domNode = document;
  if (tagName == null) tagName = "*";
	
  var el = new Array();
  var tags = domNode.getElementsByTagName(tagName);
  var tcl = " " + searchClass + " ";
	
  for (i = 0, j = 0; i < tags.length; i++) { 
	
    var test = " " + tags[i].className + " ";
		
    if (test.indexOf(tcl) != -1) {
     
      el[j++] = tags[i];
    }
  } 
	
  return el;
} 

function isNumeric(input) {

  return (input - 0) == input && input.length > 0;
}

function trim(str) { 
 
  i = 0;  
  str += '';  
  
  var whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";  
  
  l = str.length;  
  
  for (i = 0; i < l; i++) {
  
    if (whitespace.indexOf(str.charAt(i)) === -1) {  
        str = str.substring(i);  
        break;  
    }  
  }  
  
  l = str.length;  
  
  for (i = l - 1; i >= 0; i--) {  
    if (whitespace.indexOf(str.charAt(i)) === -1) {  
        str = str.substring(0, i + 1);            break;  
    }  
  }  
  
  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}  

function setCookie(c_name,value,exdays) {

  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : ";expires="+exdate.toUTCString());
  
  document.cookie=c_name + "=" + c_value + ";path=/;";
}

function getCookie(c_name) {

  var i,x,y,ARRcookies=document.cookie.split(";");

  for (i = 0; i < ARRcookies.length; i++) {
  
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    
    if (x==c_name) 
      return unescape(y);
  }
}

function getFilterCookie() {

  return parseNames(getCookie('dbdbfilter_names'));
}

function getFavsCookie() {

  return parseNames(getCookie('dbdbfavs_names'));
}

function getSetCookie() {

  return parseNames(getCookie('dbdbfilter_sets'));
}

function setFilterCookie(newlist) {

  var cookie = "";
  var i = 0;

  blackList.sort();

  for (i = 0; i < (blackList.length - 1); i++) {
    cookie += blackList[i] + ",";
  }

  if (blackList.length > 0)
    cookie += blackList[i];
   
  setCookie('dbdbfilter_names', cookie, 365);
}

function setFavsCookie(newlist) {

  var cookie = "";
  var i = 0;

  favList.sort();

  for (i = 0; i < (favList.length - 1); i++) {
    cookie += favList[i] + ",";
  }

  if (favList.length > 0)
    cookie += favList[i];
   
  setCookie('dbdbfavs_names', cookie, 365);
}

function parseNames(st) {

  if (st == undefined || st == null || st.length == 0)
    return new Array(0);
    
  return st.split(',');
}

function serializeNames(arr) {

  return arr.join(',');
}

function writeBlockList(event, mode, content) {
  
  if (content == "block") {
                 
    var blockID = document.getElementById('info_sub');
    var contentOut = "";
    
    if ((event != "") && (mode == 0)) {
                   
      //var eventNumber = event.substring(4);
      var eventNumber = event - 1;
      blackList.splice(eventNumber, 1);
    } else if (mode == 1) { 
      blackList.push(trim(event));
    }
    
    setFilterCookie(blackList);
    
    for (var i = 0; i < blackList.length; i++) {
    
      contentOut += "<tr><td style=\"width: 150px; text-align: right; font-size:12px; font-weight: bold\">" + blackList[i] + "</td><td>&nbsp;&nbsp;</td><td style=\"vertical-align: middle;\"><a href=\"#\" onClick=\"updateBlockList("+(i+1)+",0,'block');return false\"><font style=\"color: red; font-size:18px; font-weight: bold\">x</font></a></td></tr>";
    }
    
    if (contentOut == "") {
    
      contentOut = "<div style=\"font-size:16px; margin: 2px 5% 8px;\">Your block list:</div><table style=\"width: 150px; border-collapse: collapse;\"><tr><td style=\"width: 150px; text-align: right; font-size:15px; font-weight: bold\">... is empty.</td></tr></table><br>";
    } else
      contentOut = "<div style=\"font-size:16px; margin: 2px 5% 8px;\">Your block list:</div><table style=\"width: 150px; border-collapse: collapse;\">" + contentOut + "</table><br>";
    
    contentOut += "<div style=\"text-align: center; font-size:11px\">Names have to be case-sensitive</span>"
                            
    blockID.innerHTML = contentOut;
  } else if (content == "favs") {
  
    var favsID = document.getElementById('info_sub_fav');
    var contentOut = "";
    
    if ((event != "") && (mode == 0)) {
                   
      var eventNumber = event - 1;
      favList.splice(eventNumber, 1);
    } else if (mode == 1) { 
      favList.push(trim(event));
    }
    
    setFavsCookie(favList);
    
    for (var i = 0; i < favList.length; i++) {
    
      contentOut += "<tr><td style=\"width: 150px; text-align: right; font-size:12px; font-weight: bold\">" + favList[i] + "</td><td>&nbsp;&nbsp;</td><td style=\"vertical-align: middle;\"><a href=\"#\" onClick=\"updateBlockList("+(i+1)+",0,'favs');return false\"><font style=\"color: red; font-size:18px; font-weight: bold\">x</font></a></td></tr>";
    }
    
    if (contentOut == "") {
    
      contentOut = "<div style=\"font-size:16px; margin: 2px 5% 8px;\">Favourite following:</div><table style=\"width: 150px; border-collapse: collapse;\"><tr><td style=\"width: 150px; text-align: right; font-size:15px; font-weight: bold\">... nobody.</td></tr></table><br>";
    } else
      contentOut = "<div style=\"font-size:16px; margin: 2px 5% 8px;\">Favourite following:</div><table style=\"width: 150px; border-collapse: collapse;\">" + contentOut + "</table><br>";
    
    contentOut += "<div style=\"text-align: center; font-size:11px\">Names have to be case-sensitive</span>"
                            
    favsID.innerHTML = contentOut;
  }
}

function updateBlockList(event, mode, content) {
  
  if (content == "block") {
  
    if ((mode == 0) || (event == "")) {
                                 
      writeBlockList(event, mode, content);
      jQ.facebox({ div: '#infoBlock' });
    } else if ((mode == 1) && (event.inputbox.value != "")) {
      
      var valueSelect = trim(event.inputbox.value);
      
      if (jQ.inArray(valueSelect, blackList) == -1) {
  
        writeBlockList(valueSelect, mode, content);
        jQ.facebox({ div: '#infoBlock' });
      } 
    }
  } else if (content == "favs") {
  
    if ((mode == 0) || (event == "")) {
                                 
      writeBlockList(event, mode, content);
      jQ.facebox({ div: '#infoFavs' });
    } else if ((mode == 1) && (event.inputboxfavs.value != "")) {
      
      var valueSelect = trim(event.inputboxfavs.value);
      
      if (jQ.inArray(valueSelect, favList) == -1) {
  
        writeBlockList(valueSelect, mode, content);
        jQ.facebox({ div: '#infoFavs' });
      } 
    }
  }
}

function handleKPress(form, event, content) {

  var charC;
    
  if (event && event.which){
    charC = event.which;
  } else if (window.event){
    event = window.event;
    charC = event.keyCode;
  }

  if (charC == 13)
    updateBlockList(form, 1, content);      
}                                                                                                                                                                                                                                                                                                                                                                   

function updateCheckBox(form) {

  var checkValues = new Array();
  var i = 0;
  var cookie = "";
  
  for (i = 2; i <= 5; i++) {
  
    if (form.elements[i].checked) 
      checkValues.push("1");
    else 
      checkValues.push("0");
  }
  
  for (i = 0; i < (checkValues.length - 1); i++) {
  
    cookie += checkValues[i] + ",";
  }
  
  cookie += checkValues[i];
   
  setCookie('dbdbfilter_sets', cookie, 365);
}

var injDiv1 = "<div id=\"infoBlock\" style=\"display:none;\"><div id=\"info_sub\"></div><div id=\"inputFilter\" style=\"white-space: nowrap;\"><form><input type=\"text\" name=\"inputbox\" onkeypress=\"handleKPress(this.form, event, 'block')\" value=\"\" /> <input type=\"button\" size=\"5\" value=\"Add\" onClick=\"updateBlockList(this.form,1,'block')\" /><hr /><div style=\"width: 100%; margin: auto; text-align: right\"><table style=\"width: 100%;\"><tr><td>Enabled:</td><td><input type=\"checkbox\" id=\"chkEnabled\" onClick=\"updateCheckBox(this.form)\" /></td></tr><tr><td>Infinite scrolling:</td><td><input type=\"checkbox\" id=\"chkScrolling\" onClick=\"updateCheckBox(this.form)\" /></td></tr><tr><td>Block receivers:</td><td><input type=\"checkbox\" id=\"chkReceiver\" onClick=\"updateCheckBox(this.form)\" /></td></tr><tr><td>Filter comments section:</td><td><input type=\"checkbox\" id=\"chkComments\" onClick=\"updateCheckBox(this.form)\" /></td></tr></table></div></form></div></div>";
var injDiv2 = "<div id=\"infoFavs\" style=\"display:none;\"><div id=\"info_sub_fav\"></div><div id=\"inputFavs\" style=\"white-space: nowrap;\"><form><input type=\"text\" name=\"inputboxfavs\" onkeypress=\"handleKPress(this.form, event, 'favs')\" value=\"\" /> <input type=\"button\" size=\"5\" value=\"Add\" onClick=\"updateBlockList(this.form,1,'favs')\" /></form></div></div>";
//var injDiv3 = "<div id=\"favsOut\" style=\"display:none;\"><div id=\"favsout_sub\" style=\"height: 500px; overflow: auto;\"><ul class=\"feed\"></ul></div></div>";
//var injDiv4 = "<div id=\"loadingOut\" style=\"z-index: 4000; position: absolute; top: 135px; right: 345px; margin:3px; display:none; height:80px; float:left;\"><img src=\""+loadimg+"\"/><div id=\"loadingSubSub\" style=\"position:relative; bottom:40px; font-size: 50px; text-align: center;\"></div></div>";
//var injDiv4 = "<div id=\"loadingOut\" style=\"z-index: 4000; position: fixed; top: 425px; right: 55px; margin:3px; display:none; height:80px; float:left;\"><img src=\""+loadimg+"\"/><div id=\"loadingSubSub\" style=\"position:relative; bottom:40px; font-size: 50px; text-align: center;\"></div></div>";

document.getElementById("navigation").innerHTML += injDiv1 + injDiv2;

var injDiv4 = "<div id=\"loadingOut\" style=\"z-index: 4000; width:242px; text-align: center; position: fixed; bottom:75px; border-collapse: collapse; display:none; height:60px;\"><div style=\"text-align: center; font-weight: bold;\"><a style=\"color: #990000\" href=\"javascript:setFavPause()\">pause/continue</a></div><div id=\"loadingSrcPaused\" style=\"font-size:30px; font-color: #990000; text-align:center; display:none;\"><blink>PAUSED</blink></div><div id=\"loadingSrcImg\" style=\"display:none;\"><img src=\""+loadimg+"\"/><div id=\"loadingSubSub\" style=\"position:relative; bottom:40px; font-size: 50px; text-align: center;\"></div></div></div>";
var promID = document.getElementById('promotion');
promID.innerHTML += injDiv4;
//promID.appendChild(newStat);

function blockPhotoComments() {

  var commentNodes = getElementsByClassAlt("comment picture");
  
  for (var i = 0; i < commentNodes.length; i++) {
    
    var aTags = commentNodes[i].getElementsByTagName("a");
    
    for (var j = 0; j < aTags.length; j++) {
    
      var found = false;
      var aHref = aTags[j].getAttribute("href");
      var aName = "" + aTags[j].getAttribute("name");
      
      for (var k = 0; k < blackList.length; k++) {
      
        var blockReceiverFound = false;

        if (blockReceiver) {
        
          if ((commentNodes[i].innerHTML.indexOf(
              "<a href=\"/"+blackList[k]+"\">"+blackList[k]+"'s</a>") >= 0) ||
                  (commentNodes[i].innerHTML.indexOf(
                  "<a href=\"/"+blackList[k]+"\" rel=\"noreferrer\">"+blackList[k]+"'s</a>") >= 0)) {
            
            blockReceiverFound = true;
          }      
        }               
                         
        if ((commentNodes[i].innerHTML.indexOf(
            "\" href=\"/"+blackList[k]+"\">"+blackList[k]+"</a>") >= 0)
                || (commentNodes[i].innerHTML.indexOf(
                    "\" href=\"/"+blackList[k]+"\" rel=\"noreferrer\">"+blackList[k]+"</a>") >= 0)
                || (blockReceiverFound)) {
        /*
        if (blockReceiver) {
          if (commentNodes[i].innerHTML.indexOf(
              "<a href=\"/"+blackList[k]+"\">"+blackList[k]+"'s</a>") >= 0)
            blockReceiverFound = true;      
        }
      
        if ((commentNodes[i].innerHTML.indexOf(
            "\" href=\"/"+blackList[k]+"\">"+blackList[k]+"</a>") >= 0)
                || (blockReceiverFound)) {   */
          
          commentNodes[i].parentNode.removeChild(commentNodes[i]);
          
          var statFound = false;
          var l = 0;
          
          for (l = 0; l < stat.length; l++) {
            
            if (stat[l]["" + blackList[k]] != null) {
            
              stat[l][blackList[k]]++;
            
              statFound = true;
              break;
            }
          }
          
          if (statFound == false) {
          
            stat[l] = new Object();
            stat[l][blackList[k]] = 1;
          }        
          
          found = true;
          break;
        }
      }
      
      if (found) break;
    }  
  }
}
      
function normalScrolling() {
	
	if (blackList.length <= 0)
	 return;
	               
  var commentNodes = getElementsByClassAlt("comment ");
                  
  for (var i = 0; i < commentNodes.length; i++) {
                                
    var aTags = commentNodes[i].getElementsByTagName("a");
    
    for (var j = 0; j < aTags.length; j++) {
                              
      var found = false;
      var aHref = aTags[j].getAttribute("href");
      var aName = "" + aTags[j].getAttribute("name");
                                   
      for (var k = 0; k < blackList.length; k++) {
                                   
        var blockReceiverFound = false;
        
        if (blockReceiver) {
        
          if ((commentNodes[i].innerHTML.indexOf(
              "<a href=\"/"+blackList[k]+"\">"+blackList[k]+"'s</a>") >= 0) ||
                  (commentNodes[i].innerHTML.indexOf(
                  "<a href=\"/"+blackList[k]+"\" rel=\"noreferrer\">"+blackList[k]+"'s</a>") >= 0)) {
            
            blockReceiverFound = true;
          }      
        }               
                         
        if ((commentNodes[i].innerHTML.indexOf(
            "\" href=\"/"+blackList[k]+"\">"+blackList[k]+"</a>") >= 0)
                || (commentNodes[i].innerHTML.indexOf(
                    "\" href=\"/"+blackList[k]+"\" rel=\"noreferrer\">"+blackList[k]+"</a>") >= 0)
                || (blockReceiverFound)) {
                                          
          commentNodes[i].parentNode.removeChild(commentNodes[i]);
                              
          var statFound = false;
          var l = 0;
          
          for (l = 0; l < stat.length; l++) {
            
            if (stat[l]["" + blackList[k]] != null) {
            
              stat[l][blackList[k]]++;
            
              statFound = true;
              break;
            }
          }
          
          if (statFound == false) {
          
            stat[l] = new Object();
            stat[l][blackList[k]] = 1;
          }        
          
          found = true;
          break;
        }
      }
      
      if (found) break;
    }  
  }    
  
  blockPhotoComments();
  
  if (infiniteScrolling == 0) {
  
    var statOut =
        "<b><font style=\"color: #6a0000;\">Blocked</font></b> comments:<br>";
    
    for (var i = 0; i < stat.length; i++) {
    
      for (var key in stat[i]) {
      
        statOut += key + ": " + stat[i][key] + "<br>";
      }
    } 
    
    if (statOut !=
        "<b><font style=\"color: #6a0000;\">Blocked</font></b> comments:<br>") {
    
      var cont = document.createElement("p");
      cont.setAttribute("style", "text-align: center; font-size: 11px;");
      cont.innerHTML = statOut;
      
      var statSetPoint = document.getElementById("pagination");
      statSetPoint.parentNode.insertBefore(cont, statSetPoint.nextSibling);
    }
  } else {
  
    for (var i = 0; i < stat.length; i++) {
      
      for (var key in stat[i]) {
      
        statOut2 += ">,.,<" + key + ".,." + stat[i][key] + "<,.,>";
      }
    } 
  
    if (stat.length > 0) {
    
      setStat();
    }
  }
}                 

function setStat() {
  
  var statOut =
      "<b><font style=\"color: #6a0000;\">Blocked</font></b> comments:<br>";
  
  for (var i = 0; i < stat.length; i++) {
  
    for (var key in stat[i]) {
    
      statOut = statOut + key + ": " + stat[i][key] + "<br>";
    }
  } 
  
  var cont = document.createElement("p");
  cont.setAttribute("style", "text-align: center; font-size: 11px;");
  cont.innerHTML = statOut;
  
  var statSetPoint = document.getElementById("statID");
  
  if (statSetPoint.hasChildNodes()) {
    statSetPoint.removeChild(statSetPoint.firstChild);
  }
  
  statSetPoint.appendChild(cont); 
}

var keyStr
  = "ABCDEFGHIJKLMNOP" +
  "QRSTUVWXYZabcdef" +
  "ghijklmnopqrstuv" +
  "wxyz0123456789+/" +
  "=";

function decode64(input) {

  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;
  
  var base64test = /[^A-Za-z0-9\+\/\=]/g;
  
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  
  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));
  
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
  
    output = output + String.fromCharCode(chr1);
  
    if (enc3 != 64) {
       output = output + String.fromCharCode(chr2);
    }
    
    if (enc4 != 64) {
       output = output + String.fromCharCode(chr3);
    }
  
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  
  } while (i < input.length);
  
  return unescape(output);
}

var baseOutput = "dmFyIHN0YXQgPSBuZXcgQXJyYXkoKTsNCnZhciBzdGF0UHJlUmUgPSBmYWxzZTsNCnZhciBmYXZ" + 
"zRm91bmQgPSBmYWxzZTsNCnZhciBmYXZTdGFuZGJ5ID0gZmFsc2U7DQp2YXIgZmF2c0VPTCA9IGZ" + 
"hbHNlOw0KdmFyIGZhdlJ1bm5pbmcgPSBmYWxzZTsNCnZhciBwYXVzZUZhdnMgPSBmYWxzZTsNCnZ" + 
"hciBnbG9iYWxGYXZzID0gIiI7DQp2YXIgZmF2TGltaXQgPSA2MDA7DQp2YXIgZmF2TGltaXRJID0" + 
"gMDsNCnZhciBmYXZzRm91bmRBcnJheSA9IG5ldyBBcnJheSgpOw0KDQp2YXIgblNpdGUgPSAxOw0" + 
"KdmFyIHhtbEh0dHA7DQp2YXIgdXBkYXRlRG9uZSA9IG51bGw7DQp2YXIgdXBkYXRlRG9uZUZhdnM" + 
"gPSB0cnVlOw0KDQp2YXIgY2ltZyA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29" + 
"BQUFBTlNVaEVVZ0FBQUFnQUFBQUlDQVlBQUFERUQ3NkxBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJ" + 
"aRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQUVwSlJFRlVlTnBpWUdCZ0VBWGl2VUNzeFlBQXV" + 
"rQzhDeW9IbHZ3UHhLK2dFcnBROW4rb0hJckFLelMyTHJLUk1Ba1VTU1lHM09Bdk50MVlyU0RvU0p" + 
"nM2RkRzhDUklUQlFnd0FMR0lJRzdkWVpnc0FBQUFBRWxGVGtTdVFtQ0MnOw0KdmFyIGxpbWcgPSA" + 
"nZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoTVFBeUFOVUFBSTJOamZEdzhOdmIyLzM5L2M" + 
"zTnplUGo0L0x5OHRIUjBkUFQwOURRME5uWjJlbnA2ZXZyNitibTV1Zm41OHpNelBuNStkWFYxZkh" + 
"4OGVEZzRMT3pzNVdWbGZ2Nys4WEZ4YWFtcHRUVTFKT1RrNktpb3QvZjM1MmRuWjZlbnErdnIvcjY" + 
"rc25KeWYvLy93QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF" + 
"BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF" + 
"BQUFBQUFBQUFBQUNIL0MwNUZWRk5EUVZCRk1pNHdBd0VBQUFBaCtRUUVDZ0FBQUN3QUFBQUFNUUF" + 
"5QUFBRy8wQ1JjRWdzR28vSXBITEpiRHFmMEtoMFNpMGFHZ0lFUVZUWlVFS0ZxblBBVUlUT1p4Rmd" + 
"2ZjVrUU9Ka1FJQ3VxOWxzeWlSdVhCenFkbmg0SGdkOFJBK0FnWUpzR29ZaUN3OGlpV2gzaXdBaUR" + 
"3dHhBWDhoa21nUkJRRVFJZ1ljRnhoNG53Y0JWUU4wbENFSkRnTkhGZ1FkbDNVQ3RWTU1pU0t0U25" + 
"1SkRGUm1kUWtTVFJJSmdBcFRCb2tPVHc2SkJsSU5nQkc5VFFNUmdBMVNzR2hoVUFXQUFsSUlnTUp" + 
"QQVlBSVVnU0FwRkFRZ0Z1TyswMzBkZlpQOE5YUkI0VmRIWGRPNE5XUkY0WGNHWE5QME8zS3RxMGJ" + 
"rMi9ocEVnRFJNMkpOVURZcENCRG80eVpzenJRZkFGRGVLUlZNU3F2N01paWRXU0FBMmVmenZDcXd" + 
"pbE5uVkpRbzBSQUNGQUFYS3dRck9KQXlnbHNVcHBNamhBNVpRb28wajQvVTUwZTBNUnZ6aVNxT2x" + 
"rNklqUFNKMG9HRnZrTnVaSmxDd0VFQWhxRVZFdTNydDI3ZVBQcTNjdTNyOSsvZ0FNTEhreTRNTjB" + 
"nQUNINUJBUUtBQUFBTEJrQUJBQVBBQThBQUFaWFFBSkMwRENJanNoa2FMbFVNQVpKSkhNcUNFUkY" + 
"wK2xoRWMxT0gxM3ZVcVE1SUNHQlFtUXFBZ0E4aytqQWtRaTEzUUFLNkdyRjR6TlhJaE1kZmdBZmd" + 
"TSUVoUUFGZ1JZWWhYYUJGNFVVaUJ5Rkc0Z0doUlZCQUNINUJBUUtBQUFBTEI4QUNRQUpBQlVBQUF" + 
"aZXdKQlE5RmlJamtQaElZQVVDWVdDQWZJcFpJZ2tDV3BJY1hSb1F3YlJJS0p0SEF0YXdUR2dSUnd" + 
"oV3NKeFRqOGFBSGg4NWNqSjR6ZEhGMzRBRkNJV0dJTWhJZ1NEQUFVVEhZTWZSNDBaVGlKK0ZDQk9" + 
"pbmdlRTFPS0dnZHpRUUFoK1FRRUNnQUFBQ3daQUJRQUR3QVBBQUFHV1VDUmNDaUVoSTVIQXBFWVF" + 
"CNFJ5MkhCR1JKRVJZTUl0WEYxVUVPR3FDUkJWVVFub2krRGFDRjBBR21rWUNBeWNDNFlnQjUrUEF" + 
"TRWU0RjZJZzhMUTRLQkdrdUllaDRIaTRnVWFKQjdIeGtnVnhVYkZDRUZWME5CQUNINUJBUUtBQUF" + 
"BTEE0QUdnQVZBQWtBQUFaV3dKQlFOQkVaajBoUlFDUnNpZ0FkZ2lWcEhEZ1NJZVlRd0FWZ0xoeUR" + 
"DQklvUkpyWmJIZk4xYUtkR3ZiYS9RNDlEaDU1dXk0OExJZ1VlblJOQWt0R0lCa2ZiSU1LREFOVUl" + 
"nVWhGQnNWSWdRSUFnMWlTRUVBSWZrRUJBb0FBQUFzQ1FBVUFBOEFEd0FBQmxuQUNtQTROSWlPeU9" + 
"PR09PUWtreFFtNFBKRWhxUVlTMVZVa0FJSVc5RkgycGxzTTE1Um9BcUtFa1doaEdQd25IaUc4SkE" + 
"rVWdoQWtBY2FlWHFFZWs4UGhZbFBDd2VKaEZVQkFvNGhXd01NQ29waElnWU5BZ2dFUVFBaCtRUUV" + 
"DZ0FBQUN3SkFBa0FDUUFWQUFBR1gwQ1I4S0FSaFk3Q2lRY0FNSVpFSUFxVGFSUmxwbFBoQnd2b1R" + 
"BcGNBTUhJeFZoRVV1eEZ1T0Z5aEJXdVFVaXZDd25IUEVTSXlCOERRZ0orSVFWQ0RZTVJBeUlHZ3l" + 
"FT1FncURDUklpREkxQ0E0SjVWU0lCQjBoSVFnc1BUaUZCQUNINUJBUUtBQUFBTEFrQUJBQVBBQTh" + 
"BQUFaWVFKRndTQ3lFS0pzS2NRaktmQUJRNkZJMG9VU3Z5NFBuaWlWcXVGM1I0aUVDUjRXQlF5aFV" + 
"qbUl1SElOb0lGaXZ5eDJDaGNpdzI2bFRDbjRoQ1JKVEJvTWhEbE1pRFlNUkE0eDFmZ1dNSWdpREF" + 
"aWUVneENXUVFBNyc7DQoNCihmdW5jdGlvbihFLEIpe2Z1bmN0aW9uIGthKGEsYixkKXtpZihkPT0" + 
"9QiYmYS5ub2RlVHlwZT09PTEpe2Q9YS5nZXRBdHRyaWJ1dGUoImRhdGEtIitiKTtpZih0eXBlb2Y" + 
"gZD09PSJzdHJpbmciKXt0cnl7ZD1kPT09InRydWUiP3RydWU6ZD09PSJmYWxzZSI/ZmFsc2U6ZD0" + 
"9PSJudWxsIj9udWxsOiFjLmlzTmFOKGQpP3BhcnNlRmxvYXQoZCk6SmEudGVzdChkKT9jLnBhcnN" + 
"lSlNPTihkKTpkfWNhdGNoKGUpe31jLmRhdGEoYSxiLGQpfWVsc2UgZD1CfXJldHVybiBkfWZ1bmN" + 
"0aW9uIFUoKXtyZXR1cm4gZmFsc2V9ZnVuY3Rpb24gY2EoKXtyZXR1cm4gdHJ1ZX1mdW5jdGlvbiB" + 
"sYShhLGIsZCl7ZFswXS50eXBlPWE7cmV0dXJuIGMuZXZlbnQuaGFuZGxlLmFwcGx5KGIsZCl9ZnV" + 
"uY3Rpb24gS2EoYSl7dmFyIGIsZCxlLGYsaCxsLGssbyx4LHIsQSxDPVtdO2Y9W107aD1jLmRhdGE" + 
"odGhpcyx0aGlzLm5vZGVUeXBlPyJldmVudHMiOiJfX2V2ZW50c19fIik7aWYodHlwZW9mIGg9PT0" + 
"iZnVuY3Rpb24iKWg9DQpoLmV2ZW50cztpZighKGEubGl2ZUZpcmVkPT09dGhpc3x8IWh8fCFoLmx" + 
"pdmV8fGEuYnV0dG9uJiZhLnR5cGU9PT0iY2xpY2siKSl7aWYoYS5uYW1lc3BhY2UpQT1SZWdFeHA" + 
"oIihefFxcLikiK2EubmFtZXNwYWNlLnNwbGl0KCIuIikuam9pbigiXFwuKD86LipcXC4pPyIpKyI" + 
"oXFwufCQpIik7YS5saXZlRmlyZWQ9dGhpczt2YXIgSj1oLmxpdmUuc2xpY2UoMCk7Zm9yKGs9MDt" + 
"rPEoubGVuZ3RoO2srKyl7aD1KW2tdO2gub3JpZ1R5cGUucmVwbGFjZShYLCIiKT09PWEudHlwZT9" + 
"mLnB1c2goaC5zZWxlY3Rvcik6Si5zcGxpY2Uoay0tLDEpfWY9YyhhLnRhcmdldCkuY2xvc2VzdCh" + 
"mLGEuY3VycmVudFRhcmdldCk7bz0wO2Zvcih4PWYubGVuZ3RoO288eDtvKyspe3I9ZltvXTtmb3I" + 
"oaz0wO2s8Si5sZW5ndGg7aysrKXtoPUpba107aWYoci5zZWxlY3Rvcj09PWguc2VsZWN0b3ImJig" + 
"hQXx8QS50ZXN0KGgubmFtZXNwYWNlKSkpe2w9ci5lbGVtO2U9bnVsbDtpZihoLnByZVR5cGU9PT0" + 
"ibW91c2VlbnRlciJ8fA0KaC5wcmVUeXBlPT09Im1vdXNlbGVhdmUiKXthLnR5cGU9aC5wcmVUeXB" + 
"lO2U9YyhhLnJlbGF0ZWRUYXJnZXQpLmNsb3Nlc3QoaC5zZWxlY3RvcilbMF19aWYoIWV8fGUhPT1" + 
"sKUMucHVzaCh7ZWxlbTpsLGhhbmRsZU9iajpoLGxldmVsOnIubGV2ZWx9KX19fW89MDtmb3IoeD1" + 
"DLmxlbmd0aDtvPHg7bysrKXtmPUNbb107aWYoZCYmZi5sZXZlbD5kKWJyZWFrO2EuY3VycmVudFR" + 
"hcmdldD1mLmVsZW07YS5kYXRhPWYuaGFuZGxlT2JqLmRhdGE7YS5oYW5kbGVPYmo9Zi5oYW5kbGV" + 
"PYmo7QT1mLmhhbmRsZU9iai5vcmlnSGFuZGxlci5hcHBseShmLmVsZW0sYXJndW1lbnRzKTtpZih" + 
"BPT09ZmFsc2V8fGEuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSl7ZD1mLmxldmVsO2lmKEE9PT1mYWx" + 
"zZSliPWZhbHNlO2lmKGEuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSlicmVha319cmV" + 
"0dXJuIGJ9fWZ1bmN0aW9uIFkoYSxiKXtyZXR1cm4oYSYmYSE9PSIqIj9hKyIuIjoiIikrYi5yZXB" + 
"sYWNlKExhLA0KImAiKS5yZXBsYWNlKE1hLCImIil9ZnVuY3Rpb24gbWEoYSxiLGQpe2lmKGMuaXN" + 
"GdW5jdGlvbihiKSlyZXR1cm4gYy5ncmVwKGEsZnVuY3Rpb24oZixoKXtyZXR1cm4hIWIuY2FsbCh" + 
"mLGgsZik9PT1kfSk7ZWxzZSBpZihiLm5vZGVUeXBlKXJldHVybiBjLmdyZXAoYSxmdW5jdGlvbih" + 
"mKXtyZXR1cm4gZj09PWI9PT1kfSk7ZWxzZSBpZih0eXBlb2YgYj09PSJzdHJpbmciKXt2YXIgZT1" + 
"jLmdyZXAoYSxmdW5jdGlvbihmKXtyZXR1cm4gZi5ub2RlVHlwZT09PTF9KTtpZihOYS50ZXN0KGI" + 
"pKXJldHVybiBjLmZpbHRlcihiLGUsIWQpO2Vsc2UgYj1jLmZpbHRlcihiLGUpfXJldHVybiBjLmd" + 
"yZXAoYSxmdW5jdGlvbihmKXtyZXR1cm4gYy5pbkFycmF5KGYsYik+PTA9PT1kfSl9ZnVuY3Rpb24" + 
"gbmEoYSxiKXt2YXIgZD0wO2IuZWFjaChmdW5jdGlvbigpe2lmKHRoaXMubm9kZU5hbWU9PT0oYVt" + 
"kXSYmYVtkXS5ub2RlTmFtZSkpe3ZhciBlPWMuZGF0YShhW2QrK10pLGY9Yy5kYXRhKHRoaXMsDQp" + 
"lKTtpZihlPWUmJmUuZXZlbnRzKXtkZWxldGUgZi5oYW5kbGU7Zi5ldmVudHM9e307Zm9yKHZhciB" + 
"oIGluIGUpZm9yKHZhciBsIGluIGVbaF0pYy5ldmVudC5hZGQodGhpcyxoLGVbaF1bbF0sZVtoXVt" + 
"sXS5kYXRhKX19fSl9ZnVuY3Rpb24gT2EoYSxiKXtiLnNyYz9jLmFqYXgoe3VybDpiLnNyYyxhc3l" + 
"uYzpmYWxzZSxkYXRhVHlwZToic2NyaXB0In0pOmMuZ2xvYmFsRXZhbChiLnRleHR8fGIudGV4dEN" + 
"vbnRlbnR8fGIuaW5uZXJIVE1MfHwiIik7Yi5wYXJlbnROb2RlJiZiLnBhcmVudE5vZGUucmVtb3Z" + 
"lQ2hpbGQoYil9ZnVuY3Rpb24gb2EoYSxiLGQpe3ZhciBlPWI9PT0id2lkdGgiP2Eub2Zmc2V0V2l" + 
"kdGg6YS5vZmZzZXRIZWlnaHQ7aWYoZD09PSJib3JkZXIiKXJldHVybiBlO2MuZWFjaChiPT09Ind" + 
"pZHRoIj9QYTpRYSxmdW5jdGlvbigpe2R8fChlLT1wYXJzZUZsb2F0KGMuY3NzKGEsInBhZGRpbmc" + 
"iK3RoaXMpKXx8MCk7aWYoZD09PSJtYXJnaW4iKWUrPXBhcnNlRmxvYXQoYy5jc3MoYSwNCiJtYXJ" + 
"naW4iK3RoaXMpKXx8MDtlbHNlIGUtPXBhcnNlRmxvYXQoYy5jc3MoYSwiYm9yZGVyIit0aGlzKyJ" + 
"XaWR0aCIpKXx8MH0pO3JldHVybiBlfWZ1bmN0aW9uIGRhKGEsYixkLGUpe2lmKGMuaXNBcnJheSh" + 
"iKSYmYi5sZW5ndGgpYy5lYWNoKGIsZnVuY3Rpb24oZixoKXtkfHxSYS50ZXN0KGEpP2UoYSxoKTp" + 
"kYShhKyJbIisodHlwZW9mIGg9PT0ib2JqZWN0Inx8Yy5pc0FycmF5KGgpP2Y6IiIpKyJdIixoLGQ" + 
"sZSl9KTtlbHNlIGlmKCFkJiZiIT1udWxsJiZ0eXBlb2YgYj09PSJvYmplY3QiKWMuaXNFbXB0eU9" + 
"iamVjdChiKT9lKGEsIiIpOmMuZWFjaChiLGZ1bmN0aW9uKGYsaCl7ZGEoYSsiWyIrZisiXSIsaCx" + 
"kLGUpfSk7ZWxzZSBlKGEsYil9ZnVuY3Rpb24gUyhhLGIpe3ZhciBkPXt9O2MuZWFjaChwYS5jb25" + 
"jYXQuYXBwbHkoW10scGEuc2xpY2UoMCxiKSksZnVuY3Rpb24oKXtkW3RoaXNdPWF9KTtyZXR1cm4" + 
"gZH1mdW5jdGlvbiBxYShhKXtpZighZWFbYV0pe3ZhciBiPWMoIjwiKw0KYSsiPiIpLmFwcGVuZFR" + 
"vKCJib2R5IiksZD1iLmNzcygiZGlzcGxheSIpO2IucmVtb3ZlKCk7aWYoZD09PSJub25lInx8ZD0" + 
"9PSIiKWQ9ImJsb2NrIjtlYVthXT1kfXJldHVybiBlYVthXX1mdW5jdGlvbiBmYShhKXtyZXR1cm4" + 
"gYy5pc1dpbmRvdyhhKT9hOmEubm9kZVR5cGU9PT05P2EuZGVmYXVsdFZpZXd8fGEucGFyZW50V2l" + 
"uZG93OmZhbHNlfXZhciB0PUUuZG9jdW1lbnQsYz1mdW5jdGlvbigpe2Z1bmN0aW9uIGEoKXtpZig" + 
"hYi5pc1JlYWR5KXt0cnl7dC5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGwoImxlZnQiKX1jYXRjaCh" + 
"qKXtzZXRUaW1lb3V0KGEsMSk7cmV0dXJufWIucmVhZHkoKX19dmFyIGI9ZnVuY3Rpb24oaixzKXt" + 
"yZXR1cm4gbmV3IGIuZm4uaW5pdChqLHMpfSxkPUUualEsZT1FLiQsZixoPS9eKD86W148XSooPFt" + 
"cd1xXXSs+KVtePl0qJHwjKFtcd1wtXSspJCkvLGw9L1xTLyxrPS9eXHMrLyxvPS9ccyskLyx4PS9" + 
"cVy8scj0vXGQvLEE9L148KFx3KylccypcLz8+KD86PFwvXDE+KT8kLywNCkM9L15bXF0sOnt9XHN" + 
"dKiQvLEo9L1xcKD86WyJcXFwvYmZucnRdfHVbMC05YS1mQS1GXXs0fSkvZyx3PS8iW14iXFxcblx" + 
"yXSoifHRydWV8ZmFsc2V8bnVsbHwtP1xkKyg/OlwuXGQqKT8oPzpbZUVdWytcLV0/XGQrKT8vZyx" + 
"JPS8oPzpefDp8LCkoPzpccypcWykrL2csTD0vKHdlYmtpdClbIFwvXShbXHcuXSspLyxnPS8ob3B" + 
"lcmEpKD86Lip2ZXJzaW9uKT9bIFwvXShbXHcuXSspLyxpPS8obXNpZSkgKFtcdy5dKykvLG49Lyh" + 
"tb3ppbGxhKSg/Oi4qPyBydjooW1x3Ll0rKSk/LyxtPW5hdmlnYXRvci51c2VyQWdlbnQscD1mYWx" + 
"zZSxxPVtdLHUseT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLEY9T2JqZWN0LnByb3RvdHlwZS5" + 
"oYXNPd25Qcm9wZXJ0eSxNPUFycmF5LnByb3RvdHlwZS5wdXNoLE49QXJyYXkucHJvdG90eXBlLnN" + 
"saWNlLE89U3RyaW5nLnByb3RvdHlwZS50cmltLEQ9QXJyYXkucHJvdG90eXBlLmluZGV4T2YsUj1" + 
"7fTtiLmZuPWIucHJvdG90eXBlPXtpbml0OmZ1bmN0aW9uKGosDQpzKXt2YXIgdix6LEg7aWYoIWo" + 
"pcmV0dXJuIHRoaXM7aWYoai5ub2RlVHlwZSl7dGhpcy5jb250ZXh0PXRoaXNbMF09ajt0aGlzLmx" + 
"lbmd0aD0xO3JldHVybiB0aGlzfWlmKGo9PT0iYm9keSImJiFzJiZ0LmJvZHkpe3RoaXMuY29udGV" + 
"4dD10O3RoaXNbMF09dC5ib2R5O3RoaXMuc2VsZWN0b3I9ImJvZHkiO3RoaXMubGVuZ3RoPTE7cmV" + 
"0dXJuIHRoaXN9aWYodHlwZW9mIGo9PT0ic3RyaW5nIilpZigodj1oLmV4ZWMoaikpJiYodlsxXXx" + 
"8IXMpKWlmKHZbMV0pe0g9cz9zLm93bmVyRG9jdW1lbnR8fHM6dDtpZih6PUEuZXhlYyhqKSlpZih" + 
"iLmlzUGxhaW5PYmplY3Qocykpe2o9W3QuY3JlYXRlRWxlbWVudCh6WzFdKV07Yi5mbi5hdHRyLmN" + 
"hbGwoaixzLHRydWUpfWVsc2Ugaj1bSC5jcmVhdGVFbGVtZW50KHpbMV0pXTtlbHNle3o9Yi5idWl" + 
"sZEZyYWdtZW50KFt2WzFdXSxbSF0pO2o9KHouY2FjaGVhYmxlP3ouZnJhZ21lbnQuY2xvbmVOb2R" + 
"lKHRydWUpOnouZnJhZ21lbnQpLmNoaWxkTm9kZXN9cmV0dXJuIGIubWVyZ2UodGhpcywNCmopfWV" + 
"sc2V7aWYoKHo9dC5nZXRFbGVtZW50QnlJZCh2WzJdKSkmJnoucGFyZW50Tm9kZSl7aWYoei5pZCE" + 
"9PXZbMl0pcmV0dXJuIGYuZmluZChqKTt0aGlzLmxlbmd0aD0xO3RoaXNbMF09en10aGlzLmNvbnR" + 
"leHQ9dDt0aGlzLnNlbGVjdG9yPWo7cmV0dXJuIHRoaXN9ZWxzZSBpZighcyYmIXgudGVzdChqKSl" + 
"7dGhpcy5zZWxlY3Rvcj1qO3RoaXMuY29udGV4dD10O2o9dC5nZXRFbGVtZW50c0J5VGFnTmFtZSh" + 
"qKTtyZXR1cm4gYi5tZXJnZSh0aGlzLGopfWVsc2UgcmV0dXJuIXN8fHMuanF1ZXJ5PyhzfHxmKS5" + 
"maW5kKGopOmIocykuZmluZChqKTtlbHNlIGlmKGIuaXNGdW5jdGlvbihqKSlyZXR1cm4gZi5yZWF" + 
"keShqKTtpZihqLnNlbGVjdG9yIT09Qil7dGhpcy5zZWxlY3Rvcj1qLnNlbGVjdG9yO3RoaXMuY29" + 
"udGV4dD1qLmNvbnRleHR9cmV0dXJuIGIubWFrZUFycmF5KGosdGhpcyl9LHNlbGVjdG9yOiIiLGp" + 
"xdWVyeToiMS40LjQiLGxlbmd0aDowLHNpemU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGh" + 
"9LA0KdG9BcnJheTpmdW5jdGlvbigpe3JldHVybiBOLmNhbGwodGhpcywwKX0sZ2V0OmZ1bmN0aW9" + 
"uKGope3JldHVybiBqPT1udWxsP3RoaXMudG9BcnJheSgpOmo8MD90aGlzLnNsaWNlKGopWzBdOnR" + 
"oaXNbal19LHB1c2hTdGFjazpmdW5jdGlvbihqLHMsdil7dmFyIHo9YigpO2IuaXNBcnJheShqKT9" + 
"NLmFwcGx5KHosaik6Yi5tZXJnZSh6LGopO3oucHJldk9iamVjdD10aGlzO3ouY29udGV4dD10aGl" + 
"zLmNvbnRleHQ7aWYocz09PSJmaW5kIil6LnNlbGVjdG9yPXRoaXMuc2VsZWN0b3IrKHRoaXMuc2V" + 
"sZWN0b3I/IiAiOiIiKSt2O2Vsc2UgaWYocyl6LnNlbGVjdG9yPXRoaXMuc2VsZWN0b3IrIi4iK3M" + 
"rIigiK3YrIikiO3JldHVybiB6fSxlYWNoOmZ1bmN0aW9uKGoscyl7cmV0dXJuIGIuZWFjaCh0aGl" + 
"zLGoscyl9LHJlYWR5OmZ1bmN0aW9uKGope2IuYmluZFJlYWR5KCk7aWYoYi5pc1JlYWR5KWouY2F" + 
"sbCh0LGIpO2Vsc2UgcSYmcS5wdXNoKGopO3JldHVybiB0aGlzfSxlcTpmdW5jdGlvbihqKXtyZXR" + 
"1cm4gaj09PQ0KLTE/dGhpcy5zbGljZShqKTp0aGlzLnNsaWNlKGosK2orMSl9LGZpcnN0OmZ1bmN" + 
"0aW9uKCl7cmV0dXJuIHRoaXMuZXEoMCl9LGxhc3Q6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lcSg" + 
"tMSl9LHNsaWNlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKE4uYXBwbHkodGhpcyx" + 
"hcmd1bWVudHMpLCJzbGljZSIsTi5jYWxsKGFyZ3VtZW50cykuam9pbigiLCIpKX0sbWFwOmZ1bmN" + 
"0aW9uKGope3JldHVybiB0aGlzLnB1c2hTdGFjayhiLm1hcCh0aGlzLGZ1bmN0aW9uKHMsdil7cmV" + 
"0dXJuIGouY2FsbChzLHYscyl9KSl9LGVuZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnByZXZPYmp" + 
"lY3R8fGIobnVsbCl9LHB1c2g6TSxzb3J0OltdLnNvcnQsc3BsaWNlOltdLnNwbGljZX07Yi5mbi5" + 
"pbml0LnByb3RvdHlwZT1iLmZuO2IuZXh0ZW5kPWIuZm4uZXh0ZW5kPWZ1bmN0aW9uKCl7dmFyIGo" + 
"scyx2LHosSCxHPWFyZ3VtZW50c1swXXx8e30sSz0xLFE9YXJndW1lbnRzLmxlbmd0aCxnYT1mYWx" + 
"zZTsNCmlmKHR5cGVvZiBHPT09ImJvb2xlYW4iKXtnYT1HO0c9YXJndW1lbnRzWzFdfHx7fTtLPTJ" + 
"9aWYodHlwZW9mIEchPT0ib2JqZWN0IiYmIWIuaXNGdW5jdGlvbihHKSlHPXt9O2lmKFE9PT1LKXt" + 
"HPXRoaXM7LS1LfWZvcig7SzxRO0srKylpZigoaj1hcmd1bWVudHNbS10pIT1udWxsKWZvcihzIGl" + 
"uIGope3Y9R1tzXTt6PWpbc107aWYoRyE9PXopaWYoZ2EmJnomJihiLmlzUGxhaW5PYmplY3Qoeil" + 
"8fChIPWIuaXNBcnJheSh6KSkpKXtpZihIKXtIPWZhbHNlO3Y9diYmYi5pc0FycmF5KHYpP3Y6W11" + 
"9ZWxzZSB2PXYmJmIuaXNQbGFpbk9iamVjdCh2KT92Ont9O0dbc109Yi5leHRlbmQoZ2Esdix6KX1" + 
"lbHNlIGlmKHohPT1CKUdbc109en1yZXR1cm4gR307Yi5leHRlbmQoe25vQ29uZmxpY3Q6ZnVuY3R" + 
"pb24oail7RS4kPWU7aWYoailFLmpRPWQ7cmV0dXJuIGJ9LGlzUmVhZHk6ZmFsc2UscmVhZHlXYWl" + 
"0OjEscmVhZHk6ZnVuY3Rpb24oail7aj09PXRydWUmJmIucmVhZHlXYWl0LS07DQppZighYi5yZWF" + 
"keVdhaXR8fGohPT10cnVlJiYhYi5pc1JlYWR5KXtpZighdC5ib2R5KXJldHVybiBzZXRUaW1lb3V" + 
"0KGIucmVhZHksMSk7Yi5pc1JlYWR5PXRydWU7aWYoIShqIT09dHJ1ZSYmLS1iLnJlYWR5V2FpdD4" + 
"wKSlpZihxKXt2YXIgcz0wLHY9cTtmb3IocT1udWxsO2o9dltzKytdOylqLmNhbGwodCxiKTtiLmZ" + 
"uLnRyaWdnZXImJmIodCkudHJpZ2dlcigicmVhZHkiKS51bmJpbmQoInJlYWR5Iil9fX0sYmluZFJ" + 
"lYWR5OmZ1bmN0aW9uKCl7aWYoIXApe3A9dHJ1ZTtpZih0LnJlYWR5U3RhdGU9PT0iY29tcGxldGU" + 
"iKXJldHVybiBzZXRUaW1lb3V0KGIucmVhZHksMSk7aWYodC5hZGRFdmVudExpc3RlbmVyKXt0LmF" + 
"kZEV2ZW50TGlzdGVuZXIoIkRPTUNvbnRlbnRMb2FkZWQiLHUsZmFsc2UpO0UuYWRkRXZlbnRMaXN" + 
"0ZW5lcigibG9hZCIsYi5yZWFkeSxmYWxzZSl9ZWxzZSBpZih0LmF0dGFjaEV2ZW50KXt0LmF0dGF" + 
"jaEV2ZW50KCJvbnJlYWR5c3RhdGVjaGFuZ2UiLHUpO0UuYXR0YWNoRXZlbnQoIm9ubG9hZCIsDQp" + 
"iLnJlYWR5KTt2YXIgaj1mYWxzZTt0cnl7aj1FLmZyYW1lRWxlbWVudD09bnVsbH1jYXRjaChzKXt" + 
"9dC5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGwmJmomJmEoKX19fSxpc0Z1bmN0aW9uOmZ1bmN0aW9" + 
"uKGope3JldHVybiBiLnR5cGUoaik9PT0iZnVuY3Rpb24ifSxpc0FycmF5OkFycmF5LmlzQXJyYXl" + 
"8fGZ1bmN0aW9uKGope3JldHVybiBiLnR5cGUoaik9PT0iYXJyYXkifSxpc1dpbmRvdzpmdW5jdGl" + 
"vbihqKXtyZXR1cm4gaiYmdHlwZW9mIGo9PT0ib2JqZWN0IiYmInNldEludGVydmFsImluIGp9LGl" + 
"zTmFOOmZ1bmN0aW9uKGope3JldHVybiBqPT1udWxsfHwhci50ZXN0KGopfHxpc05hTihqKX0sdHl" + 
"wZTpmdW5jdGlvbihqKXtyZXR1cm4gaj09bnVsbD9TdHJpbmcoaik6Ult5LmNhbGwoaildfHwib2J" + 
"qZWN0In0saXNQbGFpbk9iamVjdDpmdW5jdGlvbihqKXtpZighanx8Yi50eXBlKGopIT09Im9iamV" + 
"jdCJ8fGoubm9kZVR5cGV8fGIuaXNXaW5kb3coaikpcmV0dXJuIGZhbHNlO2lmKGouY29uc3RydWN" + 
"0b3ImJg0KIUYuY2FsbChqLCJjb25zdHJ1Y3RvciIpJiYhRi5jYWxsKGouY29uc3RydWN0b3IucHJ" + 
"vdG90eXBlLCJpc1Byb3RvdHlwZU9mIikpcmV0dXJuIGZhbHNlO2Zvcih2YXIgcyBpbiBqKTtyZXR" + 
"1cm4gcz09PUJ8fEYuY2FsbChqLHMpfSxpc0VtcHR5T2JqZWN0OmZ1bmN0aW9uKGope2Zvcih2YXI" + 
"gcyBpbiBqKXJldHVybiBmYWxzZTtyZXR1cm4gdHJ1ZX0sZXJyb3I6ZnVuY3Rpb24oail7dGhyb3c" + 
"gajt9LHBhcnNlSlNPTjpmdW5jdGlvbihqKXtpZih0eXBlb2YgaiE9PSJzdHJpbmcifHwhailyZXR" + 
"1cm4gbnVsbDtqPWIudHJpbShqKTtpZihDLnRlc3Qoai5yZXBsYWNlKEosIkAiKS5yZXBsYWNlKHc" + 
"sIl0iKS5yZXBsYWNlKEksIiIpKSlyZXR1cm4gRS5KU09OJiZFLkpTT04ucGFyc2U/RS5KU09OLnB" + 
"hcnNlKGopOihuZXcgRnVuY3Rpb24oInJldHVybiAiK2opKSgpO2Vsc2UgYi5lcnJvcigiSW52YWx" + 
"pZCBKU09OOiAiK2opfSxub29wOmZ1bmN0aW9uKCl7fSxnbG9iYWxFdmFsOmZ1bmN0aW9uKGope2l" + 
"mKGomJg0KbC50ZXN0KGopKXt2YXIgcz10LmdldEVsZW1lbnRzQnlUYWdOYW1lKCJoZWFkIilbMF1" + 
"8fHQuZG9jdW1lbnRFbGVtZW50LHY9dC5jcmVhdGVFbGVtZW50KCJzY3JpcHQiKTt2LnR5cGU9InR" + 
"leHQvamF2YXNjcmlwdCI7aWYoYi5zdXBwb3J0LnNjcmlwdEV2YWwpdi5hcHBlbmRDaGlsZCh0LmN" + 
"yZWF0ZVRleHROb2RlKGopKTtlbHNlIHYudGV4dD1qO3MuaW5zZXJ0QmVmb3JlKHYscy5maXJzdEN" + 
"oaWxkKTtzLnJlbW92ZUNoaWxkKHYpfX0sbm9kZU5hbWU6ZnVuY3Rpb24oaixzKXtyZXR1cm4gai5" + 
"ub2RlTmFtZSYmai5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpPT09cy50b1VwcGVyQ2FzZSgpfSxlYWN" + 
"oOmZ1bmN0aW9uKGoscyx2KXt2YXIgeixIPTAsRz1qLmxlbmd0aCxLPUc9PT1CfHxiLmlzRnVuY3R" + 
"pb24oaik7aWYodilpZihLKWZvcih6IGluIGope2lmKHMuYXBwbHkoalt6XSx2KT09PWZhbHNlKWJ" + 
"yZWFrfWVsc2UgZm9yKDtIPEc7KXtpZihzLmFwcGx5KGpbSCsrXSx2KT09PWZhbHNlKWJyZWFrfWV" + 
"sc2UgaWYoSylmb3IoeiBpbiBqKXtpZihzLmNhbGwoalt6XSwNCnosalt6XSk9PT1mYWxzZSlicmV" + 
"ha31lbHNlIGZvcih2PWpbMF07SDxHJiZzLmNhbGwodixILHYpIT09ZmFsc2U7dj1qWysrSF0pO3J" + 
"ldHVybiBqfSx0cmltOk8/ZnVuY3Rpb24oail7cmV0dXJuIGo9PW51bGw/IiI6Ty5jYWxsKGopfTp" + 
"mdW5jdGlvbihqKXtyZXR1cm4gaj09bnVsbD8iIjpqLnRvU3RyaW5nKCkucmVwbGFjZShrLCIiKS5" + 
"yZXBsYWNlKG8sIiIpfSxtYWtlQXJyYXk6ZnVuY3Rpb24oaixzKXt2YXIgdj1zfHxbXTtpZihqIT1" + 
"udWxsKXt2YXIgej1iLnR5cGUoaik7ai5sZW5ndGg9PW51bGx8fHo9PT0ic3RyaW5nInx8ej09PSJ" + 
"mdW5jdGlvbiJ8fHo9PT0icmVnZXhwInx8Yi5pc1dpbmRvdyhqKT9NLmNhbGwodixqKTpiLm1lcmd" + 
"lKHYsail9cmV0dXJuIHZ9LGluQXJyYXk6ZnVuY3Rpb24oaixzKXtpZihzLmluZGV4T2YpcmV0dXJ" + 
"uIHMuaW5kZXhPZihqKTtmb3IodmFyIHY9MCx6PXMubGVuZ3RoO3Y8ejt2KyspaWYoc1t2XT09PWo" + 
"pcmV0dXJuIHY7cmV0dXJuLTF9LG1lcmdlOmZ1bmN0aW9uKGosDQpzKXt2YXIgdj1qLmxlbmd0aCx" + 
"6PTA7aWYodHlwZW9mIHMubGVuZ3RoPT09Im51bWJlciIpZm9yKHZhciBIPXMubGVuZ3RoO3o8SDt" + 
"6Kyspalt2KytdPXNbel07ZWxzZSBmb3IoO3Nbel0hPT1COylqW3YrK109c1t6KytdO2oubGVuZ3R" + 
"oPXY7cmV0dXJuIGp9LGdyZXA6ZnVuY3Rpb24oaixzLHYpe3ZhciB6PVtdLEg7dj0hIXY7Zm9yKHZ" + 
"hciBHPTAsSz1qLmxlbmd0aDtHPEs7RysrKXtIPSEhcyhqW0ddLEcpO3YhPT1IJiZ6LnB1c2goalt" + 
"HXSl9cmV0dXJuIHp9LG1hcDpmdW5jdGlvbihqLHMsdil7Zm9yKHZhciB6PVtdLEgsRz0wLEs9ai5" + 
"sZW5ndGg7RzxLO0crKyl7SD1zKGpbR10sRyx2KTtpZihIIT1udWxsKXpbei5sZW5ndGhdPUh9cmV" + 
"0dXJuIHouY29uY2F0LmFwcGx5KFtdLHopfSxndWlkOjEscHJveHk6ZnVuY3Rpb24oaixzLHYpe2l" + 
"mKGFyZ3VtZW50cy5sZW5ndGg9PT0yKWlmKHR5cGVvZiBzPT09InN0cmluZyIpe3Y9ajtqPXZbc10" + 
"7cz1CfWVsc2UgaWYocyYmIWIuaXNGdW5jdGlvbihzKSl7dj0NCnM7cz1CfWlmKCFzJiZqKXM9ZnV" + 
"uY3Rpb24oKXtyZXR1cm4gai5hcHBseSh2fHx0aGlzLGFyZ3VtZW50cyl9O2lmKGopcy5ndWlkPWo" + 
"uZ3VpZD1qLmd1aWR8fHMuZ3VpZHx8Yi5ndWlkKys7cmV0dXJuIHN9LGFjY2VzczpmdW5jdGlvbih" + 
"qLHMsdix6LEgsRyl7dmFyIEs9ai5sZW5ndGg7aWYodHlwZW9mIHM9PT0ib2JqZWN0Iil7Zm9yKHZ" + 
"hciBRIGluIHMpYi5hY2Nlc3MoaixRLHNbUV0seixILHYpO3JldHVybiBqfWlmKHYhPT1CKXt6PSF" + 
"HJiZ6JiZiLmlzRnVuY3Rpb24odik7Zm9yKFE9MDtRPEs7USsrKUgoaltRXSxzLHo/di5jYWxsKGp" + 
"bUV0sUSxIKGpbUV0scykpOnYsRyk7cmV0dXJuIGp9cmV0dXJuIEs/SChqWzBdLHMpOkJ9LG5vdzp" + 
"mdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfSx1YU1hdGNoOmZ1bmN0aW9uKGo" + 
"pe2o9ai50b0xvd2VyQ2FzZSgpO2o9TC5leGVjKGopfHxnLmV4ZWMoail8fGkuZXhlYyhqKXx8ai5" + 
"pbmRleE9mKCJjb21wYXRpYmxlIik8MCYmbi5leGVjKGopfHwNCltdO3JldHVybnticm93c2VyOmp" + 
"bMV18fCIiLHZlcnNpb246alsyXXx8IjAifX0sYnJvd3Nlcjp7fX0pO2IuZWFjaCgiQm9vbGVhbiB" + 
"OdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCIuc3BsaXQoIiA" + 
"iKSxmdW5jdGlvbihqLHMpe1JbIltvYmplY3QgIitzKyJdIl09cy50b0xvd2VyQ2FzZSgpfSk7bT1" + 
"iLnVhTWF0Y2gobSk7aWYobS5icm93c2VyKXtiLmJyb3dzZXJbbS5icm93c2VyXT10cnVlO2IuYnJ" + 
"vd3Nlci52ZXJzaW9uPW0udmVyc2lvbn1pZihiLmJyb3dzZXIud2Via2l0KWIuYnJvd3Nlci5zYWZ" + 
"hcmk9dHJ1ZTtpZihEKWIuaW5BcnJheT1mdW5jdGlvbihqLHMpe3JldHVybiBELmNhbGwocyxqKX0" + 
"7aWYoIS9ccy8udGVzdCgiXHUwMGEwIikpe2s9L15bXHNceEEwXSsvO289L1tcc1x4QTBdKyQvfWY" + 
"9Yih0KTtpZih0LmFkZEV2ZW50TGlzdGVuZXIpdT1mdW5jdGlvbigpe3QucmVtb3ZlRXZlbnRMaXN" + 
"0ZW5lcigiRE9NQ29udGVudExvYWRlZCIsdSwNCmZhbHNlKTtiLnJlYWR5KCl9O2Vsc2UgaWYodC5" + 
"hdHRhY2hFdmVudCl1PWZ1bmN0aW9uKCl7aWYodC5yZWFkeVN0YXRlPT09ImNvbXBsZXRlIil7dC5" + 
"kZXRhY2hFdmVudCgib25yZWFkeXN0YXRlY2hhbmdlIix1KTtiLnJlYWR5KCl9fTtyZXR1cm4gRS5" + 
"qUT1FLiQ9Yn0oKTsoZnVuY3Rpb24oKXtjLnN1cHBvcnQ9e307dmFyIGE9dC5kb2N1bWVudEVsZW1" + 
"lbnQsYj10LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpLGQ9dC5jcmVhdGVFbGVtZW50KCJkaXYiKSx" + 
"lPSJzY3JpcHQiK2Mubm93KCk7ZC5zdHlsZS5kaXNwbGF5PSJub25lIjtkLmlubmVySFRNTD0iICA" + 
"gPGxpbmsvPjx0YWJsZT48L3RhYmxlPjxhIGhyZWY9Jy9hJyBzdHlsZT0nY29sb3I6cmVkO2Zsb2F" + 
"0OmxlZnQ7b3BhY2l0eTouNTU7Jz5hPC9hPjxpbnB1dCB0eXBlPSdjaGVja2JveCcvPiI7dmFyIGY" + 
"9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgiKiIpLGg9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgiYSI" + 
"pWzBdLGw9dC5jcmVhdGVFbGVtZW50KCJzZWxlY3QiKSwNCms9bC5hcHBlbmRDaGlsZCh0LmNyZWF" + 
"0ZUVsZW1lbnQoIm9wdGlvbiIpKTtpZighKCFmfHwhZi5sZW5ndGh8fCFoKSl7Yy5zdXBwb3J0PXt" + 
"sZWFkaW5nV2hpdGVzcGFjZTpkLmZpcnN0Q2hpbGQubm9kZVR5cGU9PT0zLHRib2R5OiFkLmdldEV" + 
"sZW1lbnRzQnlUYWdOYW1lKCJ0Ym9keSIpLmxlbmd0aCxodG1sU2VyaWFsaXplOiEhZC5nZXRFbGV" + 
"tZW50c0J5VGFnTmFtZSgibGluayIpLmxlbmd0aCxzdHlsZTovcmVkLy50ZXN0KGguZ2V0QXR0cml" + 
"idXRlKCJzdHlsZSIpKSxocmVmTm9ybWFsaXplZDpoLmdldEF0dHJpYnV0ZSgiaHJlZiIpPT09Ii9" + 
"hIixvcGFjaXR5Oi9eMC41NSQvLnRlc3QoaC5zdHlsZS5vcGFjaXR5KSxjc3NGbG9hdDohIWguc3R" + 
"5bGUuY3NzRmxvYXQsY2hlY2tPbjpkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCJpbnB1dCIpWzBdLnZ" + 
"hbHVlPT09Im9uIixvcHRTZWxlY3RlZDprLnNlbGVjdGVkLGRlbGV0ZUV4cGFuZG86dHJ1ZSxvcHR" + 
"EaXNhYmxlZDpmYWxzZSxjaGVja0Nsb25lOmZhbHNlLA0Kc2NyaXB0RXZhbDpmYWxzZSxub0Nsb25" + 
"lRXZlbnQ6dHJ1ZSxib3hNb2RlbDpudWxsLGlubGluZUJsb2NrTmVlZHNMYXlvdXQ6ZmFsc2Usc2h" + 
"yaW5rV3JhcEJsb2NrczpmYWxzZSxyZWxpYWJsZUhpZGRlbk9mZnNldHM6dHJ1ZX07bC5kaXNhYmx" + 
"lZD10cnVlO2Muc3VwcG9ydC5vcHREaXNhYmxlZD0hay5kaXNhYmxlZDtiLnR5cGU9InRleHQvamF" + 
"2YXNjcmlwdCI7dHJ5e2IuYXBwZW5kQ2hpbGQodC5jcmVhdGVUZXh0Tm9kZSgid2luZG93LiIrZSs" + 
"iPTE7IikpfWNhdGNoKG8pe31hLmluc2VydEJlZm9yZShiLGEuZmlyc3RDaGlsZCk7aWYoRVtlXSl" + 
"7Yy5zdXBwb3J0LnNjcmlwdEV2YWw9dHJ1ZTtkZWxldGUgRVtlXX10cnl7ZGVsZXRlIGIudGVzdH1" + 
"jYXRjaCh4KXtjLnN1cHBvcnQuZGVsZXRlRXhwYW5kbz1mYWxzZX1hLnJlbW92ZUNoaWxkKGIpO2l" + 
"mKGQuYXR0YWNoRXZlbnQmJmQuZmlyZUV2ZW50KXtkLmF0dGFjaEV2ZW50KCJvbmNsaWNrIixmdW5" + 
"jdGlvbiByKCl7Yy5zdXBwb3J0Lm5vQ2xvbmVFdmVudD0NCmZhbHNlO2QuZGV0YWNoRXZlbnQoIm9" + 
"uY2xpY2siLHIpfSk7ZC5jbG9uZU5vZGUodHJ1ZSkuZmlyZUV2ZW50KCJvbmNsaWNrIil9ZD10LmN" + 
"yZWF0ZUVsZW1lbnQoImRpdiIpO2QuaW5uZXJIVE1MPSI8aW5wdXQgdHlwZT0ncmFkaW8nIG5hbWU" + 
"9J3JhZGlvdGVzdCcgY2hlY2tlZD0nY2hlY2tlZCcvPiI7YT10LmNyZWF0ZURvY3VtZW50RnJhZ21" + 
"lbnQoKTthLmFwcGVuZENoaWxkKGQuZmlyc3RDaGlsZCk7Yy5zdXBwb3J0LmNoZWNrQ2xvbmU9YS5" + 
"jbG9uZU5vZGUodHJ1ZSkuY2xvbmVOb2RlKHRydWUpLmxhc3RDaGlsZC5jaGVja2VkO2MoZnVuY3R" + 
"pb24oKXt2YXIgcj10LmNyZWF0ZUVsZW1lbnQoImRpdiIpO3Iuc3R5bGUud2lkdGg9ci5zdHlsZS5" + 
"wYWRkaW5nTGVmdD0iMXB4Ijt0LmJvZHkuYXBwZW5kQ2hpbGQocik7Yy5ib3hNb2RlbD1jLnN1cHB" + 
"vcnQuYm94TW9kZWw9ci5vZmZzZXRXaWR0aD09PTI7aWYoInpvb20iaW4gci5zdHlsZSl7ci5zdHl" + 
"sZS5kaXNwbGF5PSJpbmxpbmUiO3Iuc3R5bGUuem9vbT0NCjE7Yy5zdXBwb3J0LmlubGluZUJsb2N" + 
"rTmVlZHNMYXlvdXQ9ci5vZmZzZXRXaWR0aD09PTI7ci5zdHlsZS5kaXNwbGF5PSIiO3IuaW5uZXJ" + 
"IVE1MPSI8ZGl2IHN0eWxlPSd3aWR0aDo0cHg7Jz48L2Rpdj4iO2Muc3VwcG9ydC5zaHJpbmtXcmF" + 
"wQmxvY2tzPXIub2Zmc2V0V2lkdGghPT0yfXIuaW5uZXJIVE1MPSI8dGFibGU+PHRyPjx0ZCBzdHl" + 
"sZT0ncGFkZGluZzowO2Rpc3BsYXk6bm9uZSc+PC90ZD48dGQ+dDwvdGQ+PC90cj48L3RhYmxlPiI" + 
"7dmFyIEE9ci5nZXRFbGVtZW50c0J5VGFnTmFtZSgidGQiKTtjLnN1cHBvcnQucmVsaWFibGVIaWR" + 
"kZW5PZmZzZXRzPUFbMF0ub2Zmc2V0SGVpZ2h0PT09MDtBWzBdLnN0eWxlLmRpc3BsYXk9IiI7QVs" + 
"xXS5zdHlsZS5kaXNwbGF5PSJub25lIjtjLnN1cHBvcnQucmVsaWFibGVIaWRkZW5PZmZzZXRzPWM" + 
"uc3VwcG9ydC5yZWxpYWJsZUhpZGRlbk9mZnNldHMmJkFbMF0ub2Zmc2V0SGVpZ2h0PT09MDtyLml" + 
"ubmVySFRNTD0iIjt0LmJvZHkucmVtb3ZlQ2hpbGQocikuc3R5bGUuZGlzcGxheT0NCiJub25lIn0" + 
"pO2E9ZnVuY3Rpb24ocil7dmFyIEE9dC5jcmVhdGVFbGVtZW50KCJkaXYiKSxEPUEud3JhcHBlZEp" + 
"TT2JqZWN0fHxBO3I9Im9uIityO3ZhciBDPXIgaW4gRDtpZighQyl7QS5zZXRBdHRyaWJ1dGUociw" + 
"icmV0dXJuOyIpO0M9dHlwZW9mIERbcl09PT0iZnVuY3Rpb24ifXJldHVybiBDfTtjLnN1cHBvcnQ" + 
"uc3VibWl0QnViYmxlcz1hKCJzdWJtaXQiKTtjLnN1cHBvcnQuY2hhbmdlQnViYmxlcz1hKCJjaGF" + 
"uZ2UiKTthPWI9ZD1mPWg9bnVsbH19KSgpO3ZhciByYT17fSxKYT0vXig/Olx7LipcfXxcWy4qXF0" + 
"pJC87Yy5leHRlbmQoe2NhY2hlOnt9LHV1aWQ6MCxleHBhbmRvOiJqUSIrYy5ub3coKSxub0RhdGE" + 
"6e2VtYmVkOnRydWUsb2JqZWN0OiJjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM" + 
"1NDAwMDAiLGFwcGxldDp0cnVlfSxkYXRhOmZ1bmN0aW9uKGEsYixkKXtpZihjLmFjY2VwdERhdGE" + 
"oYSkpe2E9YT09RT9yYTphO3ZhciBlPWEubm9kZVR5cGUsZj1lP2FbYy5leHBhbmRvXTpudWxsLGg" + 
"9DQpjLmNhY2hlO2lmKCEoZSYmIWYmJnR5cGVvZiBiPT09InN0cmluZyImJmQ9PT1CKSl7aWYoZSl" + 
"mfHwoYVtjLmV4cGFuZG9dPWY9KytjLnV1aWQpO2Vsc2UgaD1hO2lmKHR5cGVvZiBiPT09Im9iamV" + 
"jdCIpaWYoZSloW2ZdPWMuZXh0ZW5kKGhbZl0sYik7ZWxzZSBjLmV4dGVuZChoLGIpO2Vsc2UgaWY" + 
"oZSYmIWhbZl0paFtmXT17fTthPWU/aFtmXTpoO2lmKGQhPT1CKWFbYl09ZDtyZXR1cm4gdHlwZW9" + 
"mIGI9PT0ic3RyaW5nIj9hW2JdOmF9fX0scmVtb3ZlRGF0YTpmdW5jdGlvbihhLGIpe2lmKGMuYWN" + 
"jZXB0RGF0YShhKSl7YT1hPT1FP3JhOmE7dmFyIGQ9YS5ub2RlVHlwZSxlPWQ/YVtjLmV4cGFuZG9" + 
"dOmEsZj1jLmNhY2hlLGg9ZD9mW2VdOmU7aWYoYil7aWYoaCl7ZGVsZXRlIGhbYl07ZCYmYy5pc0V" + 
"tcHR5T2JqZWN0KGgpJiZjLnJlbW92ZURhdGEoYSl9fWVsc2UgaWYoZCYmYy5zdXBwb3J0LmRlbGV" + 
"0ZUV4cGFuZG8pZGVsZXRlIGFbYy5leHBhbmRvXTtlbHNlIGlmKGEucmVtb3ZlQXR0cmlidXRlKWE" + 
"ucmVtb3ZlQXR0cmlidXRlKGMuZXhwYW5kbyk7DQplbHNlIGlmKGQpZGVsZXRlIGZbZV07ZWxzZSB" + 
"mb3IodmFyIGwgaW4gYSlkZWxldGUgYVtsXX19LGFjY2VwdERhdGE6ZnVuY3Rpb24oYSl7aWYoYS5" + 
"ub2RlTmFtZSl7dmFyIGI9Yy5ub0RhdGFbYS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXTtpZihiKXJ" + 
"ldHVybiEoYj09PXRydWV8fGEuZ2V0QXR0cmlidXRlKCJjbGFzc2lkIikhPT1iKX1yZXR1cm4gdHJ" + 
"1ZX19KTtjLmZuLmV4dGVuZCh7ZGF0YTpmdW5jdGlvbihhLGIpe3ZhciBkPW51bGw7aWYodHlwZW9" + 
"mIGE9PT0idW5kZWZpbmVkIil7aWYodGhpcy5sZW5ndGgpe3ZhciBlPXRoaXNbMF0uYXR0cmlidXR" + 
"lcyxmO2Q9Yy5kYXRhKHRoaXNbMF0pO2Zvcih2YXIgaD0wLGw9ZS5sZW5ndGg7aDxsO2grKyl7Zj1" + 
"lW2hdLm5hbWU7aWYoZi5pbmRleE9mKCJkYXRhLSIpPT09MCl7Zj1mLnN1YnN0cig1KTtrYSh0aGl" + 
"zWzBdLGYsZFtmXSl9fX1yZXR1cm4gZH1lbHNlIGlmKHR5cGVvZiBhPT09Im9iamVjdCIpcmV0dXJ" + 
"uIHRoaXMuZWFjaChmdW5jdGlvbigpe2MuZGF0YSh0aGlzLA0KYSl9KTt2YXIgaz1hLnNwbGl0KCI" + 
"uIik7a1sxXT1rWzFdPyIuIitrWzFdOiIiO2lmKGI9PT1CKXtkPXRoaXMudHJpZ2dlckhhbmRsZXI" + 
"oImdldERhdGEiK2tbMV0rIiEiLFtrWzBdXSk7aWYoZD09PUImJnRoaXMubGVuZ3RoKXtkPWMuZGF" + 
"0YSh0aGlzWzBdLGEpO2Q9a2EodGhpc1swXSxhLGQpfXJldHVybiBkPT09QiYma1sxXT90aGlzLmR" + 
"hdGEoa1swXSk6ZH1lbHNlIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgbz1jKHRoaXM" + 
"pLHg9W2tbMF0sYl07by50cmlnZ2VySGFuZGxlcigic2V0RGF0YSIra1sxXSsiISIseCk7Yy5kYXR" + 
"hKHRoaXMsYSxiKTtvLnRyaWdnZXJIYW5kbGVyKCJjaGFuZ2VEYXRhIitrWzFdKyIhIix4KX0pfSx" + 
"yZW1vdmVEYXRhOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtjLnJlbW9" + 
"2ZURhdGEodGhpcyxhKX0pfX0pO2MuZXh0ZW5kKHtxdWV1ZTpmdW5jdGlvbihhLGIsZCl7aWYoYSl" + 
"7Yj0oYnx8ImZ4IikrInF1ZXVlIjt2YXIgZT0NCmMuZGF0YShhLGIpO2lmKCFkKXJldHVybiBlfHx" + 
"bXTtpZighZXx8Yy5pc0FycmF5KGQpKWU9Yy5kYXRhKGEsYixjLm1ha2VBcnJheShkKSk7ZWxzZSB" + 
"lLnB1c2goZCk7cmV0dXJuIGV9fSxkZXF1ZXVlOmZ1bmN0aW9uKGEsYil7Yj1ifHwiZngiO3ZhciB" + 
"kPWMucXVldWUoYSxiKSxlPWQuc2hpZnQoKTtpZihlPT09ImlucHJvZ3Jlc3MiKWU9ZC5zaGlmdCg" + 
"pO2lmKGUpe2I9PT0iZngiJiZkLnVuc2hpZnQoImlucHJvZ3Jlc3MiKTtlLmNhbGwoYSxmdW5jdGl" + 
"vbigpe2MuZGVxdWV1ZShhLGIpfSl9fX0pO2MuZm4uZXh0ZW5kKHtxdWV1ZTpmdW5jdGlvbihhLGI" + 
"pe2lmKHR5cGVvZiBhIT09InN0cmluZyIpe2I9YTthPSJmeCJ9aWYoYj09PUIpcmV0dXJuIGMucXV" + 
"ldWUodGhpc1swXSxhKTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGQ9Yy5xdWV1ZSh" + 
"0aGlzLGEsYik7YT09PSJmeCImJmRbMF0hPT0iaW5wcm9ncmVzcyImJmMuZGVxdWV1ZSh0aGlzLGE" + 
"pfSl9LGRlcXVldWU6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe2MuZGV" + 
"xdWV1ZSh0aGlzLA0KYSl9KX0sZGVsYXk6ZnVuY3Rpb24oYSxiKXthPWMuZng/Yy5meC5zcGVlZHN" + 
"bYV18fGE6YTtiPWJ8fCJmeCI7cmV0dXJuIHRoaXMucXVldWUoYixmdW5jdGlvbigpe3ZhciBkPXR" + 
"oaXM7c2V0VGltZW91dChmdW5jdGlvbigpe2MuZGVxdWV1ZShkLGIpfSxhKX0pfSxjbGVhclF1ZXV" + 
"lOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLnF1ZXVlKGF8fCJmeCIsW10pfX0pO3ZhciBzYT0vW1x" + 
"uXHRdL2csaGE9L1xzKy8sU2E9L1xyL2csVGE9L14oPzpocmVmfHNyY3xzdHlsZSkkLyxVYT0vXig" + 
"/OmJ1dHRvbnxpbnB1dCkkL2ksVmE9L14oPzpidXR0b258aW5wdXR8b2JqZWN0fHNlbGVjdHx0ZXh" + 
"0YXJlYSkkL2ksV2E9L15hKD86cmVhKT8kL2ksdGE9L14oPzpyYWRpb3xjaGVja2JveCkkL2k7Yy5" + 
"wcm9wcz17ImZvciI6Imh0bWxGb3IiLCJjbGFzcyI6ImNsYXNzTmFtZSIscmVhZG9ubHk6InJlYWR" + 
"Pbmx5IixtYXhsZW5ndGg6Im1heExlbmd0aCIsY2VsbHNwYWNpbmc6ImNlbGxTcGFjaW5nIixyb3d" + 
"zcGFuOiJyb3dTcGFuIiwNCmNvbHNwYW46ImNvbFNwYW4iLHRhYmluZGV4OiJ0YWJJbmRleCIsdXN" + 
"lbWFwOiJ1c2VNYXAiLGZyYW1lYm9yZGVyOiJmcmFtZUJvcmRlciJ9O2MuZm4uZXh0ZW5kKHthdHR" + 
"yOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGMuYWNjZXNzKHRoaXMsYSxiLHRydWUsYy5hdHRyKX0scmV" + 
"tb3ZlQXR0cjpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7Yy5hdHRyKHR" + 
"oaXMsYSwiIik7dGhpcy5ub2RlVHlwZT09PTEmJnRoaXMucmVtb3ZlQXR0cmlidXRlKGEpfSl9LGF" + 
"kZENsYXNzOmZ1bmN0aW9uKGEpe2lmKGMuaXNGdW5jdGlvbihhKSlyZXR1cm4gdGhpcy5lYWNoKGZ" + 
"1bmN0aW9uKHgpe3ZhciByPWModGhpcyk7ci5hZGRDbGFzcyhhLmNhbGwodGhpcyx4LHIuYXR0cig" + 
"iY2xhc3MiKSkpfSk7aWYoYSYmdHlwZW9mIGE9PT0ic3RyaW5nIilmb3IodmFyIGI9KGF8fCIiKS5" + 
"zcGxpdChoYSksZD0wLGU9dGhpcy5sZW5ndGg7ZDxlO2QrKyl7dmFyIGY9dGhpc1tkXTtpZihmLm5" + 
"vZGVUeXBlPT09DQoxKWlmKGYuY2xhc3NOYW1lKXtmb3IodmFyIGg9IiAiK2YuY2xhc3NOYW1lKyI" + 
"gIixsPWYuY2xhc3NOYW1lLGs9MCxvPWIubGVuZ3RoO2s8bztrKyspaWYoaC5pbmRleE9mKCIgIit" + 
"iW2tdKyIgIik8MClsKz0iICIrYltrXTtmLmNsYXNzTmFtZT1jLnRyaW0obCl9ZWxzZSBmLmNsYXN" + 
"zTmFtZT1hfXJldHVybiB0aGlzfSxyZW1vdmVDbGFzczpmdW5jdGlvbihhKXtpZihjLmlzRnVuY3R" + 
"pb24oYSkpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihvKXt2YXIgeD1jKHRoaXMpO3gucmVtb3Z" + 
"lQ2xhc3MoYS5jYWxsKHRoaXMsbyx4LmF0dHIoImNsYXNzIikpKX0pO2lmKGEmJnR5cGVvZiBhPT0" + 
"9InN0cmluZyJ8fGE9PT1CKWZvcih2YXIgYj0oYXx8IiIpLnNwbGl0KGhhKSxkPTAsZT10aGlzLmx" + 
"lbmd0aDtkPGU7ZCsrKXt2YXIgZj10aGlzW2RdO2lmKGYubm9kZVR5cGU9PT0xJiZmLmNsYXNzTmF" + 
"tZSlpZihhKXtmb3IodmFyIGg9KCIgIitmLmNsYXNzTmFtZSsiICIpLnJlcGxhY2Uoc2EsIiAiKSw" + 
"NCmw9MCxrPWIubGVuZ3RoO2w8aztsKyspaD1oLnJlcGxhY2UoIiAiK2JbbF0rIiAiLCIgIik7Zi5" + 
"jbGFzc05hbWU9Yy50cmltKGgpfWVsc2UgZi5jbGFzc05hbWU9IiJ9cmV0dXJuIHRoaXN9LHRvZ2d" + 
"sZUNsYXNzOmZ1bmN0aW9uKGEsYil7dmFyIGQ9dHlwZW9mIGEsZT10eXBlb2YgYj09PSJib29sZWF" + 
"uIjtpZihjLmlzRnVuY3Rpb24oYSkpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihmKXt2YXIgaD1" + 
"jKHRoaXMpO2gudG9nZ2xlQ2xhc3MoYS5jYWxsKHRoaXMsZixoLmF0dHIoImNsYXNzIiksYiksYil" + 
"9KTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7aWYoZD09PSJzdHJpbmciKWZvcih2YXIgZix" + 
"oPTAsbD1jKHRoaXMpLGs9YixvPWEuc3BsaXQoaGEpO2Y9b1toKytdOyl7az1lP2s6IWwuaGFzQ2x" + 
"hc3MoZik7bFtrPyJhZGRDbGFzcyI6InJlbW92ZUNsYXNzIl0oZil9ZWxzZSBpZihkPT09InVuZGV" + 
"maW5lZCJ8fGQ9PT0iYm9vbGVhbiIpe3RoaXMuY2xhc3NOYW1lJiZjLmRhdGEodGhpcywNCiJfX2N" + 
"sYXNzTmFtZV9fIix0aGlzLmNsYXNzTmFtZSk7dGhpcy5jbGFzc05hbWU9dGhpcy5jbGFzc05hbWV" + 
"8fGE9PT1mYWxzZT8iIjpjLmRhdGEodGhpcywiX19jbGFzc05hbWVfXyIpfHwiIn19KX0saGFzQ2x" + 
"hc3M6ZnVuY3Rpb24oYSl7YT0iICIrYSsiICI7Zm9yKHZhciBiPTAsZD10aGlzLmxlbmd0aDtiPGQ" + 
"7YisrKWlmKCgiICIrdGhpc1tiXS5jbGFzc05hbWUrIiAiKS5yZXBsYWNlKHNhLCIgIikuaW5kZXh" + 
"PZihhKT4tMSlyZXR1cm4gdHJ1ZTtyZXR1cm4gZmFsc2V9LHZhbDpmdW5jdGlvbihhKXtpZighYXJ" + 
"ndW1lbnRzLmxlbmd0aCl7dmFyIGI9dGhpc1swXTtpZihiKXtpZihjLm5vZGVOYW1lKGIsIm9wdGl" + 
"vbiIpKXt2YXIgZD1iLmF0dHJpYnV0ZXMudmFsdWU7cmV0dXJuIWR8fGQuc3BlY2lmaWVkP2IudmF" + 
"sdWU6Yi50ZXh0fWlmKGMubm9kZU5hbWUoYiwic2VsZWN0Iikpe3ZhciBlPWIuc2VsZWN0ZWRJbmR" + 
"leDtkPVtdO3ZhciBmPWIub3B0aW9ucztiPWIudHlwZT09PSJzZWxlY3Qtb25lIjsNCmlmKGU8MCl" + 
"yZXR1cm4gbnVsbDt2YXIgaD1iP2U6MDtmb3IoZT1iP2UrMTpmLmxlbmd0aDtoPGU7aCsrKXt2YXI" + 
"gbD1mW2hdO2lmKGwuc2VsZWN0ZWQmJihjLnN1cHBvcnQub3B0RGlzYWJsZWQ/IWwuZGlzYWJsZWQ" + 
"6bC5nZXRBdHRyaWJ1dGUoImRpc2FibGVkIik9PT1udWxsKSYmKCFsLnBhcmVudE5vZGUuZGlzYWJ" + 
"sZWR8fCFjLm5vZGVOYW1lKGwucGFyZW50Tm9kZSwib3B0Z3JvdXAiKSkpe2E9YyhsKS52YWwoKTt" + 
"pZihiKXJldHVybiBhO2QucHVzaChhKX19cmV0dXJuIGR9aWYodGEudGVzdChiLnR5cGUpJiYhYy5" + 
"zdXBwb3J0LmNoZWNrT24pcmV0dXJuIGIuZ2V0QXR0cmlidXRlKCJ2YWx1ZSIpPT09bnVsbD8ib24" + 
"iOmIudmFsdWU7cmV0dXJuKGIudmFsdWV8fCIiKS5yZXBsYWNlKFNhLCIiKX1yZXR1cm4gQn12YXI" + 
"gaz1jLmlzRnVuY3Rpb24oYSk7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihvKXt2YXIgeD1jKHR" + 
"oaXMpLHI9YTtpZih0aGlzLm5vZGVUeXBlPT09MSl7aWYoaylyPQ0KYS5jYWxsKHRoaXMsbyx4LnZ" + 
"hbCgpKTtpZihyPT1udWxsKXI9IiI7ZWxzZSBpZih0eXBlb2Ygcj09PSJudW1iZXIiKXIrPSIiO2V" + 
"sc2UgaWYoYy5pc0FycmF5KHIpKXI9Yy5tYXAocixmdW5jdGlvbihDKXtyZXR1cm4gQz09bnVsbD8" + 
"iIjpDKyIifSk7aWYoYy5pc0FycmF5KHIpJiZ0YS50ZXN0KHRoaXMudHlwZSkpdGhpcy5jaGVja2V" + 
"kPWMuaW5BcnJheSh4LnZhbCgpLHIpPj0wO2Vsc2UgaWYoYy5ub2RlTmFtZSh0aGlzLCJzZWxlY3Q" + 
"iKSl7dmFyIEE9Yy5tYWtlQXJyYXkocik7Yygib3B0aW9uIix0aGlzKS5lYWNoKGZ1bmN0aW9uKCl" + 
"7dGhpcy5zZWxlY3RlZD1jLmluQXJyYXkoYyh0aGlzKS52YWwoKSxBKT49MH0pO2lmKCFBLmxlbmd" + 
"0aCl0aGlzLnNlbGVjdGVkSW5kZXg9LTF9ZWxzZSB0aGlzLnZhbHVlPXJ9fSl9fSk7Yy5leHRlbmQ" + 
"oe2F0dHJGbjp7dmFsOnRydWUsY3NzOnRydWUsaHRtbDp0cnVlLHRleHQ6dHJ1ZSxkYXRhOnRydWU" + 
"sd2lkdGg6dHJ1ZSxoZWlnaHQ6dHJ1ZSxvZmZzZXQ6dHJ1ZX0sDQphdHRyOmZ1bmN0aW9uKGEsYix" + 
"kLGUpe2lmKCFhfHxhLm5vZGVUeXBlPT09M3x8YS5ub2RlVHlwZT09PTgpcmV0dXJuIEI7aWYoZSY" + 
"mYiBpbiBjLmF0dHJGbilyZXR1cm4gYyhhKVtiXShkKTtlPWEubm9kZVR5cGUhPT0xfHwhYy5pc1h" + 
"NTERvYyhhKTt2YXIgZj1kIT09QjtiPWUmJmMucHJvcHNbYl18fGI7dmFyIGg9VGEudGVzdChiKTt" + 
"pZigoYiBpbiBhfHxhW2JdIT09QikmJmUmJiFoKXtpZihmKXtiPT09InR5cGUiJiZVYS50ZXN0KGE" + 
"ubm9kZU5hbWUpJiZhLnBhcmVudE5vZGUmJmMuZXJyb3IoInR5cGUgcHJvcGVydHkgY2FuJ3QgYmU" + 
"gY2hhbmdlZCIpO2lmKGQ9PT1udWxsKWEubm9kZVR5cGU9PT0xJiZhLnJlbW92ZUF0dHJpYnV0ZSh" + 
"iKTtlbHNlIGFbYl09ZH1pZihjLm5vZGVOYW1lKGEsImZvcm0iKSYmYS5nZXRBdHRyaWJ1dGVOb2R" + 
"lKGIpKXJldHVybiBhLmdldEF0dHJpYnV0ZU5vZGUoYikubm9kZVZhbHVlO2lmKGI9PT0idGFiSW5" + 
"kZXgiKXJldHVybihiPWEuZ2V0QXR0cmlidXRlTm9kZSgidGFiSW5kZXgiKSkmJg0KYi5zcGVjaWZ" + 
"pZWQ/Yi52YWx1ZTpWYS50ZXN0KGEubm9kZU5hbWUpfHxXYS50ZXN0KGEubm9kZU5hbWUpJiZhLmh" + 
"yZWY/MDpCO3JldHVybiBhW2JdfWlmKCFjLnN1cHBvcnQuc3R5bGUmJmUmJmI9PT0ic3R5bGUiKXt" + 
"pZihmKWEuc3R5bGUuY3NzVGV4dD0iIitkO3JldHVybiBhLnN0eWxlLmNzc1RleHR9ZiYmYS5zZXR" + 
"BdHRyaWJ1dGUoYiwiIitkKTtpZighYS5hdHRyaWJ1dGVzW2JdJiZhLmhhc0F0dHJpYnV0ZSYmIWE" + 
"uaGFzQXR0cmlidXRlKGIpKXJldHVybiBCO2E9IWMuc3VwcG9ydC5ocmVmTm9ybWFsaXplZCYmZSY" + 
"maD9hLmdldEF0dHJpYnV0ZShiLDIpOmEuZ2V0QXR0cmlidXRlKGIpO3JldHVybiBhPT09bnVsbD9" + 
"COmF9fSk7dmFyIFg9L1wuKC4qKSQvLGlhPS9eKD86dGV4dGFyZWF8aW5wdXR8c2VsZWN0KSQvaSx" + 
"MYT0vXC4vZyxNYT0vIC9nLFhhPS9bXlx3XHMufGBdL2csWWE9ZnVuY3Rpb24oYSl7cmV0dXJuIGE" + 
"ucmVwbGFjZShYYSwiXFwkJiIpfSx1YT17Zm9jdXNpbjowLGZvY3Vzb3V0OjB9Ow0KYy5ldmVudD1" + 
"7YWRkOmZ1bmN0aW9uKGEsYixkLGUpe2lmKCEoYS5ub2RlVHlwZT09PTN8fGEubm9kZVR5cGU9PT0" + 
"4KSl7aWYoYy5pc1dpbmRvdyhhKSYmYSE9PUUmJiFhLmZyYW1lRWxlbWVudClhPUU7aWYoZD09PWZ" + 
"hbHNlKWQ9VTtlbHNlIGlmKCFkKXJldHVybjt2YXIgZixoO2lmKGQuaGFuZGxlcil7Zj1kO2Q9Zi5" + 
"oYW5kbGVyfWlmKCFkLmd1aWQpZC5ndWlkPWMuZ3VpZCsrO2lmKGg9Yy5kYXRhKGEpKXt2YXIgbD1" + 
"hLm5vZGVUeXBlPyJldmVudHMiOiJfX2V2ZW50c19fIixrPWhbbF0sbz1oLmhhbmRsZTtpZih0eXB" + 
"lb2Ygaz09PSJmdW5jdGlvbiIpe289ay5oYW5kbGU7az1rLmV2ZW50c31lbHNlIGlmKCFrKXthLm5" + 
"vZGVUeXBlfHwoaFtsXT1oPWZ1bmN0aW9uKCl7fSk7aC5ldmVudHM9az17fX1pZighbyloLmhhbmR" + 
"sZT1vPWZ1bmN0aW9uKCl7cmV0dXJuIHR5cGVvZiBjIT09InVuZGVmaW5lZCImJiFjLmV2ZW50LnR" + 
"yaWdnZXJlZD9jLmV2ZW50LmhhbmRsZS5hcHBseShvLmVsZW0sDQphcmd1bWVudHMpOkJ9O28uZWx" + 
"lbT1hO2I9Yi5zcGxpdCgiICIpO2Zvcih2YXIgeD0wLHI7bD1iW3grK107KXtoPWY/Yy5leHRlbmQ" + 
"oe30sZik6e2hhbmRsZXI6ZCxkYXRhOmV9O2lmKGwuaW5kZXhPZigiLiIpPi0xKXtyPWwuc3BsaXQ" + 
"oIi4iKTtsPXIuc2hpZnQoKTtoLm5hbWVzcGFjZT1yLnNsaWNlKDApLnNvcnQoKS5qb2luKCIuIil" + 
"9ZWxzZXtyPVtdO2gubmFtZXNwYWNlPSIifWgudHlwZT1sO2lmKCFoLmd1aWQpaC5ndWlkPWQuZ3V" + 
"pZDt2YXIgQT1rW2xdLEM9Yy5ldmVudC5zcGVjaWFsW2xdfHx7fTtpZighQSl7QT1rW2xdPVtdO2l" + 
"mKCFDLnNldHVwfHxDLnNldHVwLmNhbGwoYSxlLHIsbyk9PT1mYWxzZSlpZihhLmFkZEV2ZW50TGl" + 
"zdGVuZXIpYS5hZGRFdmVudExpc3RlbmVyKGwsbyxmYWxzZSk7ZWxzZSBhLmF0dGFjaEV2ZW50JiZ" + 
"hLmF0dGFjaEV2ZW50KCJvbiIrbCxvKX1pZihDLmFkZCl7Qy5hZGQuY2FsbChhLGgpO2lmKCFoLmh" + 
"hbmRsZXIuZ3VpZCloLmhhbmRsZXIuZ3VpZD0NCmQuZ3VpZH1BLnB1c2goaCk7Yy5ldmVudC5nbG9" + 
"iYWxbbF09dHJ1ZX1hPW51bGx9fX0sZ2xvYmFsOnt9LHJlbW92ZTpmdW5jdGlvbihhLGIsZCxlKXt" + 
"pZighKGEubm9kZVR5cGU9PT0zfHxhLm5vZGVUeXBlPT09OCkpe2lmKGQ9PT1mYWxzZSlkPVU7dmF" + 
"yIGYsaCxsPTAsayxvLHgscixBLEMsSj1hLm5vZGVUeXBlPyJldmVudHMiOiJfX2V2ZW50c19fIix" + 
"3PWMuZGF0YShhKSxJPXcmJndbSl07aWYodyYmSSl7aWYodHlwZW9mIEk9PT0iZnVuY3Rpb24iKXt" + 
"3PUk7ST1JLmV2ZW50c31pZihiJiZiLnR5cGUpe2Q9Yi5oYW5kbGVyO2I9Yi50eXBlfWlmKCFifHx" + 
"0eXBlb2YgYj09PSJzdHJpbmciJiZiLmNoYXJBdCgwKT09PSIuIil7Yj1ifHwiIjtmb3IoZiBpbiB" + 
"JKWMuZXZlbnQucmVtb3ZlKGEsZitiKX1lbHNle2ZvcihiPWIuc3BsaXQoIiAiKTtmPWJbbCsrXTs" + 
"pe3I9ZjtrPWYuaW5kZXhPZigiLiIpPDA7bz1bXTtpZighayl7bz1mLnNwbGl0KCIuIik7Zj1vLnN" + 
"oaWZ0KCk7eD1SZWdFeHAoIihefFxcLikiKw0KYy5tYXAoby5zbGljZSgwKS5zb3J0KCksWWEpLmp" + 
"vaW4oIlxcLig/Oi4qXFwuKT8iKSsiKFxcLnwkKSIpfWlmKEE9SVtmXSlpZihkKXtyPWMuZXZlbnQ" + 
"uc3BlY2lhbFtmXXx8e307Zm9yKGg9ZXx8MDtoPEEubGVuZ3RoO2grKyl7Qz1BW2hdO2lmKGQuZ3V" + 
"pZD09PUMuZ3VpZCl7aWYoa3x8eC50ZXN0KEMubmFtZXNwYWNlKSl7ZT09bnVsbCYmQS5zcGxpY2U" + 
"oaC0tLDEpO3IucmVtb3ZlJiZyLnJlbW92ZS5jYWxsKGEsQyl9aWYoZSE9bnVsbClicmVha319aWY" + 
"oQS5sZW5ndGg9PT0wfHxlIT1udWxsJiZBLmxlbmd0aD09PTEpe2lmKCFyLnRlYXJkb3dufHxyLnR" + 
"lYXJkb3duLmNhbGwoYSxvKT09PWZhbHNlKWMucmVtb3ZlRXZlbnQoYSxmLHcuaGFuZGxlKTtkZWx" + 
"ldGUgSVtmXX19ZWxzZSBmb3IoaD0wO2g8QS5sZW5ndGg7aCsrKXtDPUFbaF07aWYoa3x8eC50ZXN" + 
"0KEMubmFtZXNwYWNlKSl7Yy5ldmVudC5yZW1vdmUoYSxyLEMuaGFuZGxlcixoKTtBLnNwbGljZSh" + 
"oLS0sMSl9fX1pZihjLmlzRW1wdHlPYmplY3QoSSkpe2lmKGI9DQp3LmhhbmRsZSliLmVsZW09bnV" + 
"sbDtkZWxldGUgdy5ldmVudHM7ZGVsZXRlIHcuaGFuZGxlO2lmKHR5cGVvZiB3PT09ImZ1bmN0aW9" + 
"uIiljLnJlbW92ZURhdGEoYSxKKTtlbHNlIGMuaXNFbXB0eU9iamVjdCh3KSYmYy5yZW1vdmVEYXR" + 
"hKGEpfX19fX0sdHJpZ2dlcjpmdW5jdGlvbihhLGIsZCxlKXt2YXIgZj1hLnR5cGV8fGE7aWYoIWU" + 
"pe2E9dHlwZW9mIGE9PT0ib2JqZWN0Ij9hW2MuZXhwYW5kb10/YTpjLmV4dGVuZChjLkV2ZW50KGY" + 
"pLGEpOmMuRXZlbnQoZik7aWYoZi5pbmRleE9mKCIhIik+PTApe2EudHlwZT1mPWYuc2xpY2UoMCw" + 
"tMSk7YS5leGNsdXNpdmU9dHJ1ZX1pZighZCl7YS5zdG9wUHJvcGFnYXRpb24oKTtjLmV2ZW50Lmd" + 
"sb2JhbFtmXSYmYy5lYWNoKGMuY2FjaGUsZnVuY3Rpb24oKXt0aGlzLmV2ZW50cyYmdGhpcy5ldmV" + 
"udHNbZl0mJmMuZXZlbnQudHJpZ2dlcihhLGIsdGhpcy5oYW5kbGUuZWxlbSl9KX1pZighZHx8ZC5" + 
"ub2RlVHlwZT09PTN8fGQubm9kZVR5cGU9PT0NCjgpcmV0dXJuIEI7YS5yZXN1bHQ9QjthLnRhcmd" + 
"ldD1kO2I9Yy5tYWtlQXJyYXkoYik7Yi51bnNoaWZ0KGEpfWEuY3VycmVudFRhcmdldD1kOyhlPWQ" + 
"ubm9kZVR5cGU/Yy5kYXRhKGQsImhhbmRsZSIpOihjLmRhdGEoZCwiX19ldmVudHNfXyIpfHx7fSk" + 
"uaGFuZGxlKSYmZS5hcHBseShkLGIpO2U9ZC5wYXJlbnROb2RlfHxkLm93bmVyRG9jdW1lbnQ7dHJ" + 
"5e2lmKCEoZCYmZC5ub2RlTmFtZSYmYy5ub0RhdGFbZC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXSk" + 
"paWYoZFsib24iK2ZdJiZkWyJvbiIrZl0uYXBwbHkoZCxiKT09PWZhbHNlKXthLnJlc3VsdD1mYWx" + 
"zZTthLnByZXZlbnREZWZhdWx0KCl9fWNhdGNoKGgpe31pZighYS5pc1Byb3BhZ2F0aW9uU3RvcHB" + 
"lZCgpJiZlKWMuZXZlbnQudHJpZ2dlcihhLGIsZSx0cnVlKTtlbHNlIGlmKCFhLmlzRGVmYXVsdFB" + 
"yZXZlbnRlZCgpKXt2YXIgbDtlPWEudGFyZ2V0O3ZhciBrPWYucmVwbGFjZShYLCIiKSxvPWMubm9" + 
"kZU5hbWUoZSwiYSIpJiZrPT09DQoiY2xpY2siLHg9Yy5ldmVudC5zcGVjaWFsW2tdfHx7fTtpZig" + 
"oIXguX2RlZmF1bHR8fHguX2RlZmF1bHQuY2FsbChkLGEpPT09ZmFsc2UpJiYhbyYmIShlJiZlLm5" + 
"vZGVOYW1lJiZjLm5vRGF0YVtlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCldKSl7dHJ5e2lmKGVba10" + 
"pe2lmKGw9ZVsib24iK2tdKWVbIm9uIitrXT1udWxsO2MuZXZlbnQudHJpZ2dlcmVkPXRydWU7ZVt" + 
"rXSgpfX1jYXRjaChyKXt9aWYobCllWyJvbiIra109bDtjLmV2ZW50LnRyaWdnZXJlZD1mYWxzZX1" + 
"9fSxoYW5kbGU6ZnVuY3Rpb24oYSl7dmFyIGIsZCxlLGY7ZD1bXTt2YXIgaD1jLm1ha2VBcnJheSh" + 
"hcmd1bWVudHMpO2E9aFswXT1jLmV2ZW50LmZpeChhfHxFLmV2ZW50KTthLmN1cnJlbnRUYXJnZXQ" + 
"9dGhpcztiPWEudHlwZS5pbmRleE9mKCIuIik8MCYmIWEuZXhjbHVzaXZlO2lmKCFiKXtlPWEudHl" + 
"wZS5zcGxpdCgiLiIpO2EudHlwZT1lLnNoaWZ0KCk7ZD1lLnNsaWNlKDApLnNvcnQoKTtlPVJlZ0V" + 
"4cCgiKF58XFwuKSIrDQpkLmpvaW4oIlxcLig/Oi4qXFwuKT8iKSsiKFxcLnwkKSIpfWEubmFtZXN" + 
"wYWNlPWEubmFtZXNwYWNlfHxkLmpvaW4oIi4iKTtmPWMuZGF0YSh0aGlzLHRoaXMubm9kZVR5cGU" + 
"/ImV2ZW50cyI6Il9fZXZlbnRzX18iKTtpZih0eXBlb2YgZj09PSJmdW5jdGlvbiIpZj1mLmV2ZW5" + 
"0cztkPShmfHx7fSlbYS50eXBlXTtpZihmJiZkKXtkPWQuc2xpY2UoMCk7Zj0wO2Zvcih2YXIgbD1" + 
"kLmxlbmd0aDtmPGw7ZisrKXt2YXIgaz1kW2ZdO2lmKGJ8fGUudGVzdChrLm5hbWVzcGFjZSkpe2E" + 
"uaGFuZGxlcj1rLmhhbmRsZXI7YS5kYXRhPWsuZGF0YTthLmhhbmRsZU9iaj1rO2s9ay5oYW5kbGV" + 
"yLmFwcGx5KHRoaXMsaCk7aWYoayE9PUIpe2EucmVzdWx0PWs7aWYoaz09PWZhbHNlKXthLnByZXZ" + 
"lbnREZWZhdWx0KCk7YS5zdG9wUHJvcGFnYXRpb24oKX19aWYoYS5pc0ltbWVkaWF0ZVByb3BhZ2F" + 
"0aW9uU3RvcHBlZCgpKWJyZWFrfX19cmV0dXJuIGEucmVzdWx0fSxwcm9wczoiYWx0S2V5IGF0dHJ" + 
"DaGFuZ2UgYXR0ck5hbWUgYnViYmxlcyBidXR0b24gY2FuY2VsYWJsZSBjaGFyQ29kZSBjbGllbnR" + 
"YIGNsaWVudFkgY3RybEtleSBjdXJyZW50VGFyZ2V0IGRhdGEgZGV0YWlsIGV2ZW50UGhhc2UgZnJ" + 
"vbUVsZW1lbnQgaGFuZGxlciBrZXlDb2RlIGxheWVyWCBsYXllclkgbWV0YUtleSBuZXdWYWx1ZSB" + 
"vZmZzZXRYIG9mZnNldFkgcGFnZVggcGFnZVkgcHJldlZhbHVlIHJlbGF0ZWROb2RlIHJlbGF0ZWR" + 
"UYXJnZXQgc2NyZWVuWCBzY3JlZW5ZIHNoaWZ0S2V5IHNyY0VsZW1lbnQgdGFyZ2V0IHRvRWxlbWV" + 
"udCB2aWV3IHdoZWVsRGVsdGEgd2hpY2giLnNwbGl0KCIgIiksDQpmaXg6ZnVuY3Rpb24oYSl7aWY" + 
"oYVtjLmV4cGFuZG9dKXJldHVybiBhO3ZhciBiPWE7YT1jLkV2ZW50KGIpO2Zvcih2YXIgZD10aGl" + 
"zLnByb3BzLmxlbmd0aCxlO2Q7KXtlPXRoaXMucHJvcHNbLS1kXTthW2VdPWJbZV19aWYoIWEudGF" + 
"yZ2V0KWEudGFyZ2V0PWEuc3JjRWxlbWVudHx8dDtpZihhLnRhcmdldC5ub2RlVHlwZT09PTMpYS5" + 
"0YXJnZXQ9YS50YXJnZXQucGFyZW50Tm9kZTtpZighYS5yZWxhdGVkVGFyZ2V0JiZhLmZyb21FbGV" + 
"tZW50KWEucmVsYXRlZFRhcmdldD1hLmZyb21FbGVtZW50PT09YS50YXJnZXQ/YS50b0VsZW1lbnQ" + 
"6YS5mcm9tRWxlbWVudDtpZihhLnBhZ2VYPT1udWxsJiZhLmNsaWVudFghPW51bGwpe2I9dC5kb2N" + 
"1bWVudEVsZW1lbnQ7ZD10LmJvZHk7YS5wYWdlWD1hLmNsaWVudFgrKGImJmIuc2Nyb2xsTGVmdHx" + 
"8ZCYmZC5zY3JvbGxMZWZ0fHwwKS0oYiYmYi5jbGllbnRMZWZ0fHxkJiZkLmNsaWVudExlZnR8fDA" + 
"pO2EucGFnZVk9YS5jbGllbnRZKyhiJiZiLnNjcm9sbFRvcHx8DQpkJiZkLnNjcm9sbFRvcHx8MCk" + 
"tKGImJmIuY2xpZW50VG9wfHxkJiZkLmNsaWVudFRvcHx8MCl9aWYoYS53aGljaD09bnVsbCYmKGE" + 
"uY2hhckNvZGUhPW51bGx8fGEua2V5Q29kZSE9bnVsbCkpYS53aGljaD1hLmNoYXJDb2RlIT1udWx" + 
"sP2EuY2hhckNvZGU6YS5rZXlDb2RlO2lmKCFhLm1ldGFLZXkmJmEuY3RybEtleSlhLm1ldGFLZXk" + 
"9YS5jdHJsS2V5O2lmKCFhLndoaWNoJiZhLmJ1dHRvbiE9PUIpYS53aGljaD1hLmJ1dHRvbiYxPzE" + 
"6YS5idXR0b24mMj8zOmEuYnV0dG9uJjQ/MjowO3JldHVybiBhfSxndWlkOjFFOCxwcm94eTpjLnB" + 
"yb3h5LHNwZWNpYWw6e3JlYWR5OntzZXR1cDpjLmJpbmRSZWFkeSx0ZWFyZG93bjpjLm5vb3B9LGx" + 
"pdmU6e2FkZDpmdW5jdGlvbihhKXtjLmV2ZW50LmFkZCh0aGlzLFkoYS5vcmlnVHlwZSxhLnNlbGV" + 
"jdG9yKSxjLmV4dGVuZCh7fSxhLHtoYW5kbGVyOkthLGd1aWQ6YS5oYW5kbGVyLmd1aWR9KSl9LHJ" + 
"lbW92ZTpmdW5jdGlvbihhKXtjLmV2ZW50LnJlbW92ZSh0aGlzLA0KWShhLm9yaWdUeXBlLGEuc2V" + 
"sZWN0b3IpLGEpfX0sYmVmb3JldW5sb2FkOntzZXR1cDpmdW5jdGlvbihhLGIsZCl7aWYoYy5pc1d" + 
"pbmRvdyh0aGlzKSl0aGlzLm9uYmVmb3JldW5sb2FkPWR9LHRlYXJkb3duOmZ1bmN0aW9uKGEsYil" + 
"7aWYodGhpcy5vbmJlZm9yZXVubG9hZD09PWIpdGhpcy5vbmJlZm9yZXVubG9hZD1udWxsfX19fTt" + 
"jLnJlbW92ZUV2ZW50PXQucmVtb3ZlRXZlbnRMaXN0ZW5lcj9mdW5jdGlvbihhLGIsZCl7YS5yZW1" + 
"vdmVFdmVudExpc3RlbmVyJiZhLnJlbW92ZUV2ZW50TGlzdGVuZXIoYixkLGZhbHNlKX06ZnVuY3R" + 
"pb24oYSxiLGQpe2EuZGV0YWNoRXZlbnQmJmEuZGV0YWNoRXZlbnQoIm9uIitiLGQpfTtjLkV2ZW5" + 
"0PWZ1bmN0aW9uKGEpe2lmKCF0aGlzLnByZXZlbnREZWZhdWx0KXJldHVybiBuZXcgYy5FdmVudCh" + 
"hKTtpZihhJiZhLnR5cGUpe3RoaXMub3JpZ2luYWxFdmVudD1hO3RoaXMudHlwZT1hLnR5cGV9ZWx" + 
"zZSB0aGlzLnR5cGU9YTt0aGlzLnRpbWVTdGFtcD0NCmMubm93KCk7dGhpc1tjLmV4cGFuZG9dPXR" + 
"ydWV9O2MuRXZlbnQucHJvdG90eXBlPXtwcmV2ZW50RGVmYXVsdDpmdW5jdGlvbigpe3RoaXMuaXN" + 
"EZWZhdWx0UHJldmVudGVkPWNhO3ZhciBhPXRoaXMub3JpZ2luYWxFdmVudDtpZihhKWlmKGEucHJ" + 
"ldmVudERlZmF1bHQpYS5wcmV2ZW50RGVmYXVsdCgpO2Vsc2UgYS5yZXR1cm5WYWx1ZT1mYWxzZX0" + 
"sc3RvcFByb3BhZ2F0aW9uOmZ1bmN0aW9uKCl7dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZD1jYTt" + 
"2YXIgYT10aGlzLm9yaWdpbmFsRXZlbnQ7aWYoYSl7YS5zdG9wUHJvcGFnYXRpb24mJmEuc3RvcFB" + 
"yb3BhZ2F0aW9uKCk7YS5jYW5jZWxCdWJibGU9dHJ1ZX19LHN0b3BJbW1lZGlhdGVQcm9wYWdhdGl" + 
"vbjpmdW5jdGlvbigpe3RoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ9Y2E7dGhpcy5" + 
"zdG9wUHJvcGFnYXRpb24oKX0saXNEZWZhdWx0UHJldmVudGVkOlUsaXNQcm9wYWdhdGlvblN0b3B" + 
"wZWQ6VSxpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDpVfTsNCnZhciB2YT1mdW5jdGlvbih" + 
"hKXt2YXIgYj1hLnJlbGF0ZWRUYXJnZXQ7dHJ5e2Zvcig7YiYmYiE9PXRoaXM7KWI9Yi5wYXJlbnR" + 
"Ob2RlO2lmKGIhPT10aGlzKXthLnR5cGU9YS5kYXRhO2MuZXZlbnQuaGFuZGxlLmFwcGx5KHRoaXM" + 
"sYXJndW1lbnRzKX19Y2F0Y2goZCl7fX0sd2E9ZnVuY3Rpb24oYSl7YS50eXBlPWEuZGF0YTtjLmV" + 
"2ZW50LmhhbmRsZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9O2MuZWFjaCh7bW91c2VlbnRlcjoibW9" + 
"1c2VvdmVyIixtb3VzZWxlYXZlOiJtb3VzZW91dCJ9LGZ1bmN0aW9uKGEsYil7Yy5ldmVudC5zcGV" + 
"jaWFsW2FdPXtzZXR1cDpmdW5jdGlvbihkKXtjLmV2ZW50LmFkZCh0aGlzLGIsZCYmZC5zZWxlY3R" + 
"vcj93YTp2YSxhKX0sdGVhcmRvd246ZnVuY3Rpb24oZCl7Yy5ldmVudC5yZW1vdmUodGhpcyxiLGQ" + 
"mJmQuc2VsZWN0b3I/d2E6dmEpfX19KTtpZighYy5zdXBwb3J0LnN1Ym1pdEJ1YmJsZXMpYy5ldmV" + 
"udC5zcGVjaWFsLnN1Ym1pdD17c2V0dXA6ZnVuY3Rpb24oKXtpZih0aGlzLm5vZGVOYW1lLnRvTG9" + 
"3ZXJDYXNlKCkhPT0NCiJmb3JtIil7Yy5ldmVudC5hZGQodGhpcywiY2xpY2suc3BlY2lhbFN1Ym1" + 
"pdCIsZnVuY3Rpb24oYSl7dmFyIGI9YS50YXJnZXQsZD1iLnR5cGU7aWYoKGQ9PT0ic3VibWl0Inx" + 
"8ZD09PSJpbWFnZSIpJiZjKGIpLmNsb3Nlc3QoImZvcm0iKS5sZW5ndGgpe2EubGl2ZUZpcmVkPUI" + 
"7cmV0dXJuIGxhKCJzdWJtaXQiLHRoaXMsYXJndW1lbnRzKX19KTtjLmV2ZW50LmFkZCh0aGlzLCJ" + 
"rZXlwcmVzcy5zcGVjaWFsU3VibWl0IixmdW5jdGlvbihhKXt2YXIgYj1hLnRhcmdldCxkPWIudHl" + 
"wZTtpZigoZD09PSJ0ZXh0Inx8ZD09PSJwYXNzd29yZCIpJiZjKGIpLmNsb3Nlc3QoImZvcm0iKS5" + 
"sZW5ndGgmJmEua2V5Q29kZT09PTEzKXthLmxpdmVGaXJlZD1CO3JldHVybiBsYSgic3VibWl0Iix" + 
"0aGlzLGFyZ3VtZW50cyl9fSl9ZWxzZSByZXR1cm4gZmFsc2V9LHRlYXJkb3duOmZ1bmN0aW9uKCl" + 
"7Yy5ldmVudC5yZW1vdmUodGhpcywiLnNwZWNpYWxTdWJtaXQiKX19O2lmKCFjLnN1cHBvcnQuY2h" + 
"hbmdlQnViYmxlcyl7dmFyIFYsDQp4YT1mdW5jdGlvbihhKXt2YXIgYj1hLnR5cGUsZD1hLnZhbHV" + 
"lO2lmKGI9PT0icmFkaW8ifHxiPT09ImNoZWNrYm94IilkPWEuY2hlY2tlZDtlbHNlIGlmKGI9PT0" + 
"ic2VsZWN0LW11bHRpcGxlIilkPWEuc2VsZWN0ZWRJbmRleD4tMT9jLm1hcChhLm9wdGlvbnMsZnV" + 
"uY3Rpb24oZSl7cmV0dXJuIGUuc2VsZWN0ZWR9KS5qb2luKCItIik6IiI7ZWxzZSBpZihhLm5vZGV" + 
"OYW1lLnRvTG93ZXJDYXNlKCk9PT0ic2VsZWN0IilkPWEuc2VsZWN0ZWRJbmRleDtyZXR1cm4gZH0" + 
"sWj1mdW5jdGlvbihhLGIpe3ZhciBkPWEudGFyZ2V0LGUsZjtpZighKCFpYS50ZXN0KGQubm9kZU5" + 
"hbWUpfHxkLnJlYWRPbmx5KSl7ZT1jLmRhdGEoZCwiX2NoYW5nZV9kYXRhIik7Zj14YShkKTtpZih" + 
"hLnR5cGUhPT0iZm9jdXNvdXQifHxkLnR5cGUhPT0icmFkaW8iKWMuZGF0YShkLCJfY2hhbmdlX2R" + 
"hdGEiLGYpO2lmKCEoZT09PUJ8fGY9PT1lKSlpZihlIT1udWxsfHxmKXthLnR5cGU9ImNoYW5nZSI" + 
"7YS5saXZlRmlyZWQ9DQpCO3JldHVybiBjLmV2ZW50LnRyaWdnZXIoYSxiLGQpfX19O2MuZXZlbnQ" + 
"uc3BlY2lhbC5jaGFuZ2U9e2ZpbHRlcnM6e2ZvY3Vzb3V0OlosYmVmb3JlZGVhY3RpdmF0ZTpaLGN" + 
"saWNrOmZ1bmN0aW9uKGEpe3ZhciBiPWEudGFyZ2V0LGQ9Yi50eXBlO2lmKGQ9PT0icmFkaW8ifHx" + 
"kPT09ImNoZWNrYm94Inx8Yi5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09InNlbGVjdCIpcmV0dXJ" + 
"uIFouY2FsbCh0aGlzLGEpfSxrZXlkb3duOmZ1bmN0aW9uKGEpe3ZhciBiPWEudGFyZ2V0LGQ9Yi5" + 
"0eXBlO2lmKGEua2V5Q29kZT09PTEzJiZiLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkhPT0idGV4dGF" + 
"yZWEifHxhLmtleUNvZGU9PT0zMiYmKGQ9PT0iY2hlY2tib3gifHxkPT09InJhZGlvIil8fGQ9PT0" + 
"ic2VsZWN0LW11bHRpcGxlIilyZXR1cm4gWi5jYWxsKHRoaXMsYSl9LGJlZm9yZWFjdGl2YXRlOmZ" + 
"1bmN0aW9uKGEpe2E9YS50YXJnZXQ7Yy5kYXRhKGEsIl9jaGFuZ2VfZGF0YSIseGEoYSkpfX0sc2V" + 
"0dXA6ZnVuY3Rpb24oKXtpZih0aGlzLnR5cGU9PT0NCiJmaWxlIilyZXR1cm4gZmFsc2U7Zm9yKHZ" + 
"hciBhIGluIFYpYy5ldmVudC5hZGQodGhpcyxhKyIuc3BlY2lhbENoYW5nZSIsVlthXSk7cmV0dXJ" + 
"uIGlhLnRlc3QodGhpcy5ub2RlTmFtZSl9LHRlYXJkb3duOmZ1bmN0aW9uKCl7Yy5ldmVudC5yZW1" + 
"vdmUodGhpcywiLnNwZWNpYWxDaGFuZ2UiKTtyZXR1cm4gaWEudGVzdCh0aGlzLm5vZGVOYW1lKX1" + 
"9O1Y9Yy5ldmVudC5zcGVjaWFsLmNoYW5nZS5maWx0ZXJzO1YuZm9jdXM9Vi5iZWZvcmVhY3RpdmF" + 
"0ZX10LmFkZEV2ZW50TGlzdGVuZXImJmMuZWFjaCh7Zm9jdXM6ImZvY3VzaW4iLGJsdXI6ImZvY3V" + 
"zb3V0In0sZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBkKGUpe2U9Yy5ldmVudC5maXgoZSk7ZS50eXB" + 
"lPWI7cmV0dXJuIGMuZXZlbnQudHJpZ2dlcihlLG51bGwsZS50YXJnZXQpfWMuZXZlbnQuc3BlY2l" + 
"hbFtiXT17c2V0dXA6ZnVuY3Rpb24oKXt1YVtiXSsrPT09MCYmdC5hZGRFdmVudExpc3RlbmVyKGE" + 
"sZCx0cnVlKX0sdGVhcmRvd246ZnVuY3Rpb24oKXstLXVhW2JdPT09DQowJiZ0LnJlbW92ZUV2ZW5" + 
"0TGlzdGVuZXIoYSxkLHRydWUpfX19KTtjLmVhY2goWyJiaW5kIiwib25lIl0sZnVuY3Rpb24oYSx" + 
"iKXtjLmZuW2JdPWZ1bmN0aW9uKGQsZSxmKXtpZih0eXBlb2YgZD09PSJvYmplY3QiKXtmb3IodmF" + 
"yIGggaW4gZCl0aGlzW2JdKGgsZSxkW2hdLGYpO3JldHVybiB0aGlzfWlmKGMuaXNGdW5jdGlvbih" + 
"lKXx8ZT09PWZhbHNlKXtmPWU7ZT1CfXZhciBsPWI9PT0ib25lIj9jLnByb3h5KGYsZnVuY3Rpb24" + 
"obyl7Yyh0aGlzKS51bmJpbmQobyxsKTtyZXR1cm4gZi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KTp" + 
"mO2lmKGQ9PT0idW5sb2FkIiYmYiE9PSJvbmUiKXRoaXMub25lKGQsZSxmKTtlbHNle2g9MDtmb3I" + 
"odmFyIGs9dGhpcy5sZW5ndGg7aDxrO2grKyljLmV2ZW50LmFkZCh0aGlzW2hdLGQsbCxlKX1yZXR" + 
"1cm4gdGhpc319KTtjLmZuLmV4dGVuZCh7dW5iaW5kOmZ1bmN0aW9uKGEsYil7aWYodHlwZW9mIGE" + 
"9PT0ib2JqZWN0IiYmIWEucHJldmVudERlZmF1bHQpZm9yKHZhciBkIGluIGEpdGhpcy51bmJpbmQ" + 
"oZCwNCmFbZF0pO2Vsc2V7ZD0wO2Zvcih2YXIgZT10aGlzLmxlbmd0aDtkPGU7ZCsrKWMuZXZlbnQ" + 
"ucmVtb3ZlKHRoaXNbZF0sYSxiKX1yZXR1cm4gdGhpc30sZGVsZWdhdGU6ZnVuY3Rpb24oYSxiLGQ" + 
"sZSl7cmV0dXJuIHRoaXMubGl2ZShiLGQsZSxhKX0sdW5kZWxlZ2F0ZTpmdW5jdGlvbihhLGIsZCl" + 
"7cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGg9PT0wP3RoaXMudW5iaW5kKCJsaXZlIik6dGhpcy5kaWU" + 
"oYixudWxsLGQsYSl9LHRyaWdnZXI6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN" + 
"0aW9uKCl7Yy5ldmVudC50cmlnZ2VyKGEsYix0aGlzKX0pfSx0cmlnZ2VySGFuZGxlcjpmdW5jdGl" + 
"vbihhLGIpe2lmKHRoaXNbMF0pe3ZhciBkPWMuRXZlbnQoYSk7ZC5wcmV2ZW50RGVmYXVsdCgpO2Q" + 
"uc3RvcFByb3BhZ2F0aW9uKCk7Yy5ldmVudC50cmlnZ2VyKGQsYix0aGlzWzBdKTtyZXR1cm4gZC5" + 
"yZXN1bHR9fSx0b2dnbGU6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPWFyZ3VtZW50cyxkPQ0KMTtkPGI" + 
"ubGVuZ3RoOyljLnByb3h5KGEsYltkKytdKTtyZXR1cm4gdGhpcy5jbGljayhjLnByb3h5KGEsZnV" + 
"uY3Rpb24oZSl7dmFyIGY9KGMuZGF0YSh0aGlzLCJsYXN0VG9nZ2xlIithLmd1aWQpfHwwKSVkO2M" + 
"uZGF0YSh0aGlzLCJsYXN0VG9nZ2xlIithLmd1aWQsZisxKTtlLnByZXZlbnREZWZhdWx0KCk7cmV" + 
"0dXJuIGJbZl0uYXBwbHkodGhpcyxhcmd1bWVudHMpfHxmYWxzZX0pKX0saG92ZXI6ZnVuY3Rpb24" + 
"oYSxiKXtyZXR1cm4gdGhpcy5tb3VzZWVudGVyKGEpLm1vdXNlbGVhdmUoYnx8YSl9fSk7dmFyIHl" + 
"hPXtmb2N1czoiZm9jdXNpbiIsYmx1cjoiZm9jdXNvdXQiLG1vdXNlZW50ZXI6Im1vdXNlb3ZlciI" + 
"sbW91c2VsZWF2ZToibW91c2VvdXQifTtjLmVhY2goWyJsaXZlIiwiZGllIl0sZnVuY3Rpb24oYSx" + 
"iKXtjLmZuW2JdPWZ1bmN0aW9uKGQsZSxmLGgpe3ZhciBsLGs9MCxvLHgscj1ofHx0aGlzLnNlbGV" + 
"jdG9yO2g9aD90aGlzOmModGhpcy5jb250ZXh0KTtpZih0eXBlb2YgZD09PQ0KIm9iamVjdCImJiF" + 
"kLnByZXZlbnREZWZhdWx0KXtmb3IobCBpbiBkKWhbYl0obCxlLGRbbF0scik7cmV0dXJuIHRoaXN" + 
"9aWYoYy5pc0Z1bmN0aW9uKGUpKXtmPWU7ZT1CfWZvcihkPShkfHwiIikuc3BsaXQoIiAiKTsobD1" + 
"kW2srK10pIT1udWxsOyl7bz1YLmV4ZWMobCk7eD0iIjtpZihvKXt4PW9bMF07bD1sLnJlcGxhY2U" + 
"oWCwiIil9aWYobD09PSJob3ZlciIpZC5wdXNoKCJtb3VzZWVudGVyIit4LCJtb3VzZWxlYXZlIit" + 
"4KTtlbHNle289bDtpZihsPT09ImZvY3VzInx8bD09PSJibHVyIil7ZC5wdXNoKHlhW2xdK3gpO2w" + 
"rPXh9ZWxzZSBsPSh5YVtsXXx8bCkreDtpZihiPT09ImxpdmUiKXt4PTA7Zm9yKHZhciBBPWgubGV" + 
"uZ3RoO3g8QTt4KyspYy5ldmVudC5hZGQoaFt4XSwibGl2ZS4iK1kobCxyKSx7ZGF0YTplLHNlbGV" + 
"jdG9yOnIsaGFuZGxlcjpmLG9yaWdUeXBlOmwsb3JpZ0hhbmRsZXI6ZixwcmVUeXBlOm99KX1lbHN" + 
"lIGgudW5iaW5kKCJsaXZlLiIrWShsLHIpLGYpfX1yZXR1cm4gdGhpc319KTsNCmMuZWFjaCgiYmx" + 
"1ciBmb2N1cyBmb2N1c2luIGZvY3Vzb3V0IGxvYWQgcmVzaXplIHNjcm9sbCB1bmxvYWQgY2xpY2s" + 
"gZGJsY2xpY2sgbW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCB" + 
"tb3VzZWVudGVyIG1vdXNlbGVhdmUgY2hhbmdlIHNlbGVjdCBzdWJtaXQga2V5ZG93biBrZXlwcmV" + 
"zcyBrZXl1cCBlcnJvciIuc3BsaXQoIiAiKSxmdW5jdGlvbihhLGIpe2MuZm5bYl09ZnVuY3Rpb24" + 
"oZCxlKXtpZihlPT1udWxsKXtlPWQ7ZD1udWxsfXJldHVybiBhcmd1bWVudHMubGVuZ3RoPjA/dGh" + 
"pcy5iaW5kKGIsZCxlKTp0aGlzLnRyaWdnZXIoYil9O2lmKGMuYXR0ckZuKWMuYXR0ckZuW2JdPXR" + 
"ydWV9KTtFLmF0dGFjaEV2ZW50JiYhRS5hZGRFdmVudExpc3RlbmVyJiZjKEUpLmJpbmQoInVubG9" + 
"hZCIsZnVuY3Rpb24oKXtmb3IodmFyIGEgaW4gYy5jYWNoZSlpZihjLmNhY2hlW2FdLmhhbmRsZSl" + 
"0cnl7Yy5ldmVudC5yZW1vdmUoYy5jYWNoZVthXS5oYW5kbGUuZWxlbSl9Y2F0Y2goYil7fX0pOw0" + 
"KKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShnLGksbixtLHAscSl7cD0wO2Zvcih2YXIgdT1tLmxlbmd" + 
"0aDtwPHU7cCsrKXt2YXIgeT1tW3BdO2lmKHkpe3ZhciBGPWZhbHNlO2Zvcih5PXlbZ107eTspe2l" + 
"mKHkuc2l6Y2FjaGU9PT1uKXtGPW1beS5zaXpzZXRdO2JyZWFrfWlmKHkubm9kZVR5cGU9PT0xJiY" + 
"hcSl7eS5zaXpjYWNoZT1uO3kuc2l6c2V0PXB9aWYoeS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT0" + 
"9aSl7Rj15O2JyZWFrfXk9eVtnXX1tW3BdPUZ9fX1mdW5jdGlvbiBiKGcsaSxuLG0scCxxKXtwPTA" + 
"7Zm9yKHZhciB1PW0ubGVuZ3RoO3A8dTtwKyspe3ZhciB5PW1bcF07aWYoeSl7dmFyIEY9ZmFsc2U" + 
"7Zm9yKHk9eVtnXTt5Oyl7aWYoeS5zaXpjYWNoZT09PW4pe0Y9bVt5LnNpenNldF07YnJlYWt9aWY" + 
"oeS5ub2RlVHlwZT09PTEpe2lmKCFxKXt5LnNpemNhY2hlPW47eS5zaXpzZXQ9cH1pZih0eXBlb2Y" + 
"gaSE9PSJzdHJpbmciKXtpZih5PT09aSl7Rj10cnVlO2JyZWFrfX1lbHNlIGlmKGsuZmlsdGVyKGk" + 
"sDQpbeV0pLmxlbmd0aD4wKXtGPXk7YnJlYWt9fXk9eVtnXX1tW3BdPUZ9fX12YXIgZD0vKCg/Olw" + 
"oKD86XChbXigpXStcKXxbXigpXSspK1wpfFxbKD86XFtbXlxbXF1dKlxdfFsnIl1bXiciXSpbJyJ" + 
"dfFteXFtcXSciXSspK1xdfFxcLnxbXiA+K34sKFxbXFxdKykrfFs+K35dKShccyosXHMqKT8oKD8" + 
"6LnxccnxcbikqKS9nLGU9MCxmPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsaD1mYWxzZSxsPXR" + 
"ydWU7WzAsMF0uc29ydChmdW5jdGlvbigpe2w9ZmFsc2U7cmV0dXJuIDB9KTt2YXIgaz1mdW5jdGl" + 
"vbihnLGksbixtKXtuPW58fFtdO3ZhciBwPWk9aXx8dDtpZihpLm5vZGVUeXBlIT09MSYmaS5ub2R" + 
"lVHlwZSE9PTkpcmV0dXJuW107aWYoIWd8fHR5cGVvZiBnIT09InN0cmluZyIpcmV0dXJuIG47dmF" + 
"yIHEsdSx5LEYsTSxOPXRydWUsTz1rLmlzWE1MKGkpLEQ9W10sUj1nO2Rve2QuZXhlYygiIik7aWY" + 
"ocT1kLmV4ZWMoUikpe1I9cVszXTtELnB1c2gocVsxXSk7aWYocVsyXSl7Rj1xWzNdOw0KYnJlYWt" + 
"9fX13aGlsZShxKTtpZihELmxlbmd0aD4xJiZ4LmV4ZWMoZykpaWYoRC5sZW5ndGg9PT0yJiZvLnJ" + 
"lbGF0aXZlW0RbMF1dKXU9TChEWzBdK0RbMV0saSk7ZWxzZSBmb3IodT1vLnJlbGF0aXZlW0RbMF1" + 
"dP1tpXTprKEQuc2hpZnQoKSxpKTtELmxlbmd0aDspe2c9RC5zaGlmdCgpO2lmKG8ucmVsYXRpdmV" + 
"bZ10pZys9RC5zaGlmdCgpO3U9TChnLHUpfWVsc2V7aWYoIW0mJkQubGVuZ3RoPjEmJmkubm9kZVR" + 
"5cGU9PT05JiYhTyYmby5tYXRjaC5JRC50ZXN0KERbMF0pJiYhby5tYXRjaC5JRC50ZXN0KERbRC5" + 
"sZW5ndGgtMV0pKXtxPWsuZmluZChELnNoaWZ0KCksaSxPKTtpPXEuZXhwcj9rLmZpbHRlcihxLmV" + 
"4cHIscS5zZXQpWzBdOnEuc2V0WzBdfWlmKGkpe3E9bT97ZXhwcjpELnBvcCgpLHNldDpDKG0pfTp" + 
"rLmZpbmQoRC5wb3AoKSxELmxlbmd0aD09PTEmJihEWzBdPT09In4ifHxEWzBdPT09IisiKSYmaS5" + 
"wYXJlbnROb2RlP2kucGFyZW50Tm9kZTppLE8pO3U9cS5leHByP2suZmlsdGVyKHEuZXhwciwNCnE" + 
"uc2V0KTpxLnNldDtpZihELmxlbmd0aD4wKXk9Qyh1KTtlbHNlIE49ZmFsc2U7Zm9yKDtELmxlbmd" + 
"0aDspe3E9TT1ELnBvcCgpO2lmKG8ucmVsYXRpdmVbTV0pcT1ELnBvcCgpO2Vsc2UgTT0iIjtpZih" + 
"xPT1udWxsKXE9aTtvLnJlbGF0aXZlW01dKHkscSxPKX19ZWxzZSB5PVtdfXl8fCh5PXUpO3l8fGs" + 
"uZXJyb3IoTXx8Zyk7aWYoZi5jYWxsKHkpPT09IltvYmplY3QgQXJyYXldIilpZihOKWlmKGkmJmk" + 
"ubm9kZVR5cGU9PT0xKWZvcihnPTA7eVtnXSE9bnVsbDtnKyspe2lmKHlbZ10mJih5W2ddPT09dHJ" + 
"1ZXx8eVtnXS5ub2RlVHlwZT09PTEmJmsuY29udGFpbnMoaSx5W2ddKSkpbi5wdXNoKHVbZ10pfWV" + 
"sc2UgZm9yKGc9MDt5W2ddIT1udWxsO2crKyl5W2ddJiZ5W2ddLm5vZGVUeXBlPT09MSYmbi5wdXN" + 
"oKHVbZ10pO2Vsc2Ugbi5wdXNoLmFwcGx5KG4seSk7ZWxzZSBDKHksbik7aWYoRil7ayhGLHAsbix" + 
"tKTtrLnVuaXF1ZVNvcnQobil9cmV0dXJuIG59O2sudW5pcXVlU29ydD1mdW5jdGlvbihnKXtpZih" + 
"3KXtoPQ0KbDtnLnNvcnQodyk7aWYoaClmb3IodmFyIGk9MTtpPGcubGVuZ3RoO2krKylnW2ldPT0" + 
"9Z1tpLTFdJiZnLnNwbGljZShpLS0sMSl9cmV0dXJuIGd9O2subWF0Y2hlcz1mdW5jdGlvbihnLGk" + 
"pe3JldHVybiBrKGcsbnVsbCxudWxsLGkpfTtrLm1hdGNoZXNTZWxlY3Rvcj1mdW5jdGlvbihnLGk" + 
"pe3JldHVybiBrKGksbnVsbCxudWxsLFtnXSkubGVuZ3RoPjB9O2suZmluZD1mdW5jdGlvbihnLGk" + 
"sbil7dmFyIG07aWYoIWcpcmV0dXJuW107Zm9yKHZhciBwPTAscT1vLm9yZGVyLmxlbmd0aDtwPHE" + 
"7cCsrKXt2YXIgdSx5PW8ub3JkZXJbcF07aWYodT1vLmxlZnRNYXRjaFt5XS5leGVjKGcpKXt2YXI" + 
"gRj11WzFdO3Uuc3BsaWNlKDEsMSk7aWYoRi5zdWJzdHIoRi5sZW5ndGgtMSkhPT0iXFwiKXt1WzF" + 
"dPSh1WzFdfHwiIikucmVwbGFjZSgvXFwvZywiIik7bT1vLmZpbmRbeV0odSxpLG4pO2lmKG0hPW5" + 
"1bGwpe2c9Zy5yZXBsYWNlKG8ubWF0Y2hbeV0sIiIpO2JyZWFrfX19fW18fChtPWkuZ2V0RWxlbWV" + 
"udHNCeVRhZ05hbWUoIioiKSk7DQpyZXR1cm57c2V0Om0sZXhwcjpnfX07ay5maWx0ZXI9ZnVuY3R" + 
"pb24oZyxpLG4sbSl7Zm9yKHZhciBwLHEsdT1nLHk9W10sRj1pLE09aSYmaVswXSYmay5pc1hNTCh" + 
"pWzBdKTtnJiZpLmxlbmd0aDspe2Zvcih2YXIgTiBpbiBvLmZpbHRlcilpZigocD1vLmxlZnRNYXR" + 
"jaFtOXS5leGVjKGcpKSE9bnVsbCYmcFsyXSl7dmFyIE8sRCxSPW8uZmlsdGVyW05dO0Q9cFsxXTt" + 
"xPWZhbHNlO3Auc3BsaWNlKDEsMSk7aWYoRC5zdWJzdHIoRC5sZW5ndGgtMSkhPT0iXFwiKXtpZih" + 
"GPT09eSl5PVtdO2lmKG8ucHJlRmlsdGVyW05dKWlmKHA9by5wcmVGaWx0ZXJbTl0ocCxGLG4seSx" + 
"tLE0pKXtpZihwPT09dHJ1ZSljb250aW51ZX1lbHNlIHE9Tz10cnVlO2lmKHApZm9yKHZhciBqPTA" + 
"7KEQ9RltqXSkhPW51bGw7aisrKWlmKEQpe089UihELHAsaixGKTt2YXIgcz1tXiEhTztpZihuJiZ" + 
"PIT1udWxsKWlmKHMpcT10cnVlO2Vsc2UgRltqXT1mYWxzZTtlbHNlIGlmKHMpe3kucHVzaChEKTt" + 
"xPXRydWV9fWlmKE8hPT0NCkIpe258fChGPXkpO2c9Zy5yZXBsYWNlKG8ubWF0Y2hbTl0sIiIpO2l" + 
"mKCFxKXJldHVybltdO2JyZWFrfX19aWYoZz09PXUpaWYocT09bnVsbClrLmVycm9yKGcpO2Vsc2U" + 
"gYnJlYWs7dT1nfXJldHVybiBGfTtrLmVycm9yPWZ1bmN0aW9uKGcpe3Rocm93IlN5bnRheCBlcnJ" + 
"vciwgdW5yZWNvZ25pemVkIGV4cHJlc3Npb246ICIrZzt9O3ZhciBvPWsuc2VsZWN0b3JzPXtvcmR" + 
"lcjpbIklEIiwiTkFNRSIsIlRBRyJdLG1hdGNoOntJRDovIygoPzpbXHdcdTAwYzAtXHVGRkZGXC1" + 
"dfFxcLikrKS8sQ0xBU1M6L1wuKCg/Oltcd1x1MDBjMC1cdUZGRkZcLV18XFwuKSspLyxOQU1FOi9" + 
"cW25hbWU9WyciXSooKD86W1x3XHUwMGMwLVx1RkZGRlwtXXxcXC4pKylbJyJdKlxdLyxBVFRSOi9" + 
"cW1xzKigoPzpbXHdcdTAwYzAtXHVGRkZGXC1dfFxcLikrKVxzKig/OihcUz89KVxzKihbJyJdKik" + 
"oLio/KVwzfClccypcXS8sVEFHOi9eKCg/Oltcd1x1MDBjMC1cdUZGRkZcKlwtXXxcXC4pKykvLEN" + 
"ISUxEOi86KG9ubHl8bnRofGxhc3R8Zmlyc3QpLWNoaWxkKD86XCgoZXZlbnxvZGR8W1xkbitcLV0" + 
"qKVwpKT8vLA0KUE9TOi86KG50aHxlcXxndHxsdHxmaXJzdHxsYXN0fGV2ZW58b2RkKSg/OlwoKFx" + 
"kKilcKSk/KD89W15cLV18JCkvLFBTRVVETzovOigoPzpbXHdcdTAwYzAtXHVGRkZGXC1dfFxcLik" + 
"rKSg/OlwoKFsnIl0/KSgoPzpcKFteXCldK1wpfFteXChcKV0qKSspXDJcKSk/L30sbGVmdE1hdGN" + 
"oOnt9LGF0dHJNYXA6eyJjbGFzcyI6ImNsYXNzTmFtZSIsImZvciI6Imh0bWxGb3IifSxhdHRySGF" + 
"uZGxlOntocmVmOmZ1bmN0aW9uKGcpe3JldHVybiBnLmdldEF0dHJpYnV0ZSgiaHJlZiIpfX0scmV" + 
"sYXRpdmU6eyIrIjpmdW5jdGlvbihnLGkpe3ZhciBuPXR5cGVvZiBpPT09InN0cmluZyIsbT1uJiY" + 
"hL1xXLy50ZXN0KGkpO249biYmIW07aWYobSlpPWkudG9Mb3dlckNhc2UoKTttPTA7Zm9yKHZhciB" + 
"wPWcubGVuZ3RoLHE7bTxwO20rKylpZihxPWdbbV0pe2Zvcig7KHE9cS5wcmV2aW91c1NpYmxpbmc" + 
"pJiZxLm5vZGVUeXBlIT09MTspO2dbbV09bnx8cSYmcS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT0" + 
"9DQppP3F8fGZhbHNlOnE9PT1pfW4mJmsuZmlsdGVyKGksZyx0cnVlKX0sIj4iOmZ1bmN0aW9uKGc" + 
"saSl7dmFyIG4sbT10eXBlb2YgaT09PSJzdHJpbmciLHA9MCxxPWcubGVuZ3RoO2lmKG0mJiEvXFc" + 
"vLnRlc3QoaSkpZm9yKGk9aS50b0xvd2VyQ2FzZSgpO3A8cTtwKyspe2lmKG49Z1twXSl7bj1uLnB" + 
"hcmVudE5vZGU7Z1twXT1uLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk9PT1pP246ZmFsc2V9fWVsc2V" + 
"7Zm9yKDtwPHE7cCsrKWlmKG49Z1twXSlnW3BdPW0/bi5wYXJlbnROb2RlOm4ucGFyZW50Tm9kZT0" + 
"9PWk7bSYmay5maWx0ZXIoaSxnLHRydWUpfX0sIiI6ZnVuY3Rpb24oZyxpLG4pe3ZhciBtLHA9ZSs" + 
"rLHE9YjtpZih0eXBlb2YgaT09PSJzdHJpbmciJiYhL1xXLy50ZXN0KGkpKXttPWk9aS50b0xvd2V" + 
"yQ2FzZSgpO3E9YX1xKCJwYXJlbnROb2RlIixpLHAsZyxtLG4pfSwifiI6ZnVuY3Rpb24oZyxpLG4" + 
"pe3ZhciBtLHA9ZSsrLHE9YjtpZih0eXBlb2YgaT09PSJzdHJpbmciJiYhL1xXLy50ZXN0KGkpKXt" + 
"tPQ0KaT1pLnRvTG93ZXJDYXNlKCk7cT1hfXEoInByZXZpb3VzU2libGluZyIsaSxwLGcsbSxuKX1" + 
"9LGZpbmQ6e0lEOmZ1bmN0aW9uKGcsaSxuKXtpZih0eXBlb2YgaS5nZXRFbGVtZW50QnlJZCE9PSJ" + 
"1bmRlZmluZWQiJiYhbilyZXR1cm4oZz1pLmdldEVsZW1lbnRCeUlkKGdbMV0pKSYmZy5wYXJlbnR" + 
"Ob2RlP1tnXTpbXX0sTkFNRTpmdW5jdGlvbihnLGkpe2lmKHR5cGVvZiBpLmdldEVsZW1lbnRzQnl" + 
"OYW1lIT09InVuZGVmaW5lZCIpe2Zvcih2YXIgbj1bXSxtPWkuZ2V0RWxlbWVudHNCeU5hbWUoZ1s" + 
"xXSkscD0wLHE9bS5sZW5ndGg7cDxxO3ArKyltW3BdLmdldEF0dHJpYnV0ZSgibmFtZSIpPT09Z1s" + 
"xXSYmbi5wdXNoKG1bcF0pO3JldHVybiBuLmxlbmd0aD09PTA/bnVsbDpufX0sVEFHOmZ1bmN0aW9" + 
"uKGcsaSl7cmV0dXJuIGkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZ1sxXSl9fSxwcmVGaWx0ZXI6e0N" + 
"MQVNTOmZ1bmN0aW9uKGcsaSxuLG0scCxxKXtnPSIgIitnWzFdLnJlcGxhY2UoL1xcL2csDQoiIik" + 
"rIiAiO2lmKHEpcmV0dXJuIGc7cT0wO2Zvcih2YXIgdTsodT1pW3FdKSE9bnVsbDtxKyspaWYodSl" + 
"pZihwXih1LmNsYXNzTmFtZSYmKCIgIit1LmNsYXNzTmFtZSsiICIpLnJlcGxhY2UoL1tcdFxuXS9" + 
"nLCIgIikuaW5kZXhPZihnKT49MCkpbnx8bS5wdXNoKHUpO2Vsc2UgaWYobilpW3FdPWZhbHNlO3J" + 
"ldHVybiBmYWxzZX0sSUQ6ZnVuY3Rpb24oZyl7cmV0dXJuIGdbMV0ucmVwbGFjZSgvXFwvZywiIil" + 
"9LFRBRzpmdW5jdGlvbihnKXtyZXR1cm4gZ1sxXS50b0xvd2VyQ2FzZSgpfSxDSElMRDpmdW5jdGl" + 
"vbihnKXtpZihnWzFdPT09Im50aCIpe3ZhciBpPS8oLT8pKFxkKiluKCg/OlwrfC0pP1xkKikvLmV" + 
"4ZWMoZ1syXT09PSJldmVuIiYmIjJuInx8Z1syXT09PSJvZGQiJiYiMm4rMSJ8fCEvXEQvLnRlc3Q" + 
"oZ1syXSkmJiIwbisiK2dbMl18fGdbMl0pO2dbMl09aVsxXSsoaVsyXXx8MSktMDtnWzNdPWlbM10" + 
"tMH1nWzBdPWUrKztyZXR1cm4gZ30sQVRUUjpmdW5jdGlvbihnLGksbiwNCm0scCxxKXtpPWdbMV0" + 
"ucmVwbGFjZSgvXFwvZywiIik7aWYoIXEmJm8uYXR0ck1hcFtpXSlnWzFdPW8uYXR0ck1hcFtpXTt" + 
"pZihnWzJdPT09In49IilnWzRdPSIgIitnWzRdKyIgIjtyZXR1cm4gZ30sUFNFVURPOmZ1bmN0aW9" + 
"uKGcsaSxuLG0scCl7aWYoZ1sxXT09PSJub3QiKWlmKChkLmV4ZWMoZ1szXSl8fCIiKS5sZW5ndGg" + 
"+MXx8L15cdy8udGVzdChnWzNdKSlnWzNdPWsoZ1szXSxudWxsLG51bGwsaSk7ZWxzZXtnPWsuZml" + 
"sdGVyKGdbM10saSxuLHRydWVecCk7bnx8bS5wdXNoLmFwcGx5KG0sZyk7cmV0dXJuIGZhbHNlfWV" + 
"sc2UgaWYoby5tYXRjaC5QT1MudGVzdChnWzBdKXx8by5tYXRjaC5DSElMRC50ZXN0KGdbMF0pKXJ" + 
"ldHVybiB0cnVlO3JldHVybiBnfSxQT1M6ZnVuY3Rpb24oZyl7Zy51bnNoaWZ0KHRydWUpO3JldHV" + 
"ybiBnfX0sZmlsdGVyczp7ZW5hYmxlZDpmdW5jdGlvbihnKXtyZXR1cm4gZy5kaXNhYmxlZD09PWZ" + 
"hbHNlJiZnLnR5cGUhPT0iaGlkZGVuIn0sZGlzYWJsZWQ6ZnVuY3Rpb24oZyl7cmV0dXJuIGcuZGl" + 
"zYWJsZWQ9PT0NCnRydWV9LGNoZWNrZWQ6ZnVuY3Rpb24oZyl7cmV0dXJuIGcuY2hlY2tlZD09PXR" + 
"ydWV9LHNlbGVjdGVkOmZ1bmN0aW9uKGcpe3JldHVybiBnLnNlbGVjdGVkPT09dHJ1ZX0scGFyZW5" + 
"0OmZ1bmN0aW9uKGcpe3JldHVybiEhZy5maXJzdENoaWxkfSxlbXB0eTpmdW5jdGlvbihnKXtyZXR" + 
"1cm4hZy5maXJzdENoaWxkfSxoYXM6ZnVuY3Rpb24oZyxpLG4pe3JldHVybiEhayhuWzNdLGcpLmx" + 
"lbmd0aH0saGVhZGVyOmZ1bmN0aW9uKGcpe3JldHVybi9oXGQvaS50ZXN0KGcubm9kZU5hbWUpfSx" + 
"0ZXh0OmZ1bmN0aW9uKGcpe3JldHVybiJ0ZXh0Ij09PWcudHlwZX0scmFkaW86ZnVuY3Rpb24oZyl" + 
"7cmV0dXJuInJhZGlvIj09PWcudHlwZX0sY2hlY2tib3g6ZnVuY3Rpb24oZyl7cmV0dXJuImNoZWN" + 
"rYm94Ij09PWcudHlwZX0sZmlsZTpmdW5jdGlvbihnKXtyZXR1cm4iZmlsZSI9PT1nLnR5cGV9LHB" + 
"hc3N3b3JkOmZ1bmN0aW9uKGcpe3JldHVybiJwYXNzd29yZCI9PT1nLnR5cGV9LHN1Ym1pdDpmdW5" + 
"jdGlvbihnKXtyZXR1cm4ic3VibWl0Ij09PQ0KZy50eXBlfSxpbWFnZTpmdW5jdGlvbihnKXtyZXR" + 
"1cm4iaW1hZ2UiPT09Zy50eXBlfSxyZXNldDpmdW5jdGlvbihnKXtyZXR1cm4icmVzZXQiPT09Zy5" + 
"0eXBlfSxidXR0b246ZnVuY3Rpb24oZyl7cmV0dXJuImJ1dHRvbiI9PT1nLnR5cGV8fGcubm9kZU5" + 
"hbWUudG9Mb3dlckNhc2UoKT09PSJidXR0b24ifSxpbnB1dDpmdW5jdGlvbihnKXtyZXR1cm4vaW5" + 
"wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbi9pLnRlc3QoZy5ub2RlTmFtZSl9fSxzZXRGaWx0ZXJ" + 
"zOntmaXJzdDpmdW5jdGlvbihnLGkpe3JldHVybiBpPT09MH0sbGFzdDpmdW5jdGlvbihnLGksbix" + 
"tKXtyZXR1cm4gaT09PW0ubGVuZ3RoLTF9LGV2ZW46ZnVuY3Rpb24oZyxpKXtyZXR1cm4gaSUyPT0" + 
"9MH0sb2RkOmZ1bmN0aW9uKGcsaSl7cmV0dXJuIGklMj09PTF9LGx0OmZ1bmN0aW9uKGcsaSxuKXt" + 
"yZXR1cm4gaTxuWzNdLTB9LGd0OmZ1bmN0aW9uKGcsaSxuKXtyZXR1cm4gaT5uWzNdLTB9LG50aDp" + 
"mdW5jdGlvbihnLGksbil7cmV0dXJuIG5bM10tDQowPT09aX0sZXE6ZnVuY3Rpb24oZyxpLG4pe3J" + 
"ldHVybiBuWzNdLTA9PT1pfX0sZmlsdGVyOntQU0VVRE86ZnVuY3Rpb24oZyxpLG4sbSl7dmFyIHA" + 
"9aVsxXSxxPW8uZmlsdGVyc1twXTtpZihxKXJldHVybiBxKGcsbixpLG0pO2Vsc2UgaWYocD09PSJ" + 
"jb250YWlucyIpcmV0dXJuKGcudGV4dENvbnRlbnR8fGcuaW5uZXJUZXh0fHxrLmdldFRleHQoW2d" + 
"dKXx8IiIpLmluZGV4T2YoaVszXSk+PTA7ZWxzZSBpZihwPT09Im5vdCIpe2k9aVszXTtuPTA7Zm9" + 
"yKG09aS5sZW5ndGg7bjxtO24rKylpZihpW25dPT09ZylyZXR1cm4gZmFsc2U7cmV0dXJuIHRydWV" + 
"9ZWxzZSBrLmVycm9yKCJTeW50YXggZXJyb3IsIHVucmVjb2duaXplZCBleHByZXNzaW9uOiAiK3A" + 
"pfSxDSElMRDpmdW5jdGlvbihnLGkpe3ZhciBuPWlbMV0sbT1nO3N3aXRjaChuKXtjYXNlICJvbmx" + 
"5IjpjYXNlICJmaXJzdCI6Zm9yKDttPW0ucHJldmlvdXNTaWJsaW5nOylpZihtLm5vZGVUeXBlPT0" + 
"9MSlyZXR1cm4gZmFsc2U7aWYobj09PQ0KImZpcnN0IilyZXR1cm4gdHJ1ZTttPWc7Y2FzZSAibGF" + 
"zdCI6Zm9yKDttPW0ubmV4dFNpYmxpbmc7KWlmKG0ubm9kZVR5cGU9PT0xKXJldHVybiBmYWxzZTt" + 
"yZXR1cm4gdHJ1ZTtjYXNlICJudGgiOm49aVsyXTt2YXIgcD1pWzNdO2lmKG49PT0xJiZwPT09MCl" + 
"yZXR1cm4gdHJ1ZTt2YXIgcT1pWzBdLHU9Zy5wYXJlbnROb2RlO2lmKHUmJih1LnNpemNhY2hlIT0" + 
"9cXx8IWcubm9kZUluZGV4KSl7dmFyIHk9MDtmb3IobT11LmZpcnN0Q2hpbGQ7bTttPW0ubmV4dFN" + 
"pYmxpbmcpaWYobS5ub2RlVHlwZT09PTEpbS5ub2RlSW5kZXg9Kyt5O3Uuc2l6Y2FjaGU9cX1tPWc" + 
"ubm9kZUluZGV4LXA7cmV0dXJuIG49PT0wP209PT0wOm0lbj09PTAmJm0vbj49MH19LElEOmZ1bmN" + 
"0aW9uKGcsaSl7cmV0dXJuIGcubm9kZVR5cGU9PT0xJiZnLmdldEF0dHJpYnV0ZSgiaWQiKT09PWl" + 
"9LFRBRzpmdW5jdGlvbihnLGkpe3JldHVybiBpPT09IioiJiZnLm5vZGVUeXBlPT09MXx8Zy5ub2R" + 
"lTmFtZS50b0xvd2VyQ2FzZSgpPT09DQppfSxDTEFTUzpmdW5jdGlvbihnLGkpe3JldHVybigiICI" + 
"rKGcuY2xhc3NOYW1lfHxnLmdldEF0dHJpYnV0ZSgiY2xhc3MiKSkrIiAiKS5pbmRleE9mKGkpPi0" + 
"xfSxBVFRSOmZ1bmN0aW9uKGcsaSl7dmFyIG49aVsxXTtuPW8uYXR0ckhhbmRsZVtuXT9vLmF0dHJ" + 
"IYW5kbGVbbl0oZyk6Z1tuXSE9bnVsbD9nW25dOmcuZ2V0QXR0cmlidXRlKG4pO3ZhciBtPW4rIiI" + 
"scD1pWzJdLHE9aVs0XTtyZXR1cm4gbj09bnVsbD9wPT09IiE9IjpwPT09Ij0iP209PT1xOnA9PT0" + 
"iKj0iP20uaW5kZXhPZihxKT49MDpwPT09In49Ij8oIiAiK20rIiAiKS5pbmRleE9mKHEpPj0wOiF" + 
"xP20mJm4hPT1mYWxzZTpwPT09IiE9Ij9tIT09cTpwPT09Il49Ij9tLmluZGV4T2YocSk9PT0wOnA" + 
"9PT0iJD0iP20uc3Vic3RyKG0ubGVuZ3RoLXEubGVuZ3RoKT09PXE6cD09PSJ8PSI/bT09PXF8fG0" + 
"uc3Vic3RyKDAscS5sZW5ndGgrMSk9PT1xKyItIjpmYWxzZX0sUE9TOmZ1bmN0aW9uKGcsaSxuLG0" + 
"pe3ZhciBwPW8uc2V0RmlsdGVyc1tpWzJdXTsNCmlmKHApcmV0dXJuIHAoZyxuLGksbSl9fX0seD1" + 
"vLm1hdGNoLlBPUyxyPWZ1bmN0aW9uKGcsaSl7cmV0dXJuIlxcIisoaS0wKzEpfSxBO2ZvcihBIGl" + 
"uIG8ubWF0Y2gpe28ubWF0Y2hbQV09UmVnRXhwKG8ubWF0Y2hbQV0uc291cmNlKy8oPyFbXlxbXSp" + 
"cXSkoPyFbXlwoXSpcKSkvLnNvdXJjZSk7by5sZWZ0TWF0Y2hbQV09UmVnRXhwKC8oXig/Oi58XHJ" + 
"8XG4pKj8pLy5zb3VyY2Urby5tYXRjaFtBXS5zb3VyY2UucmVwbGFjZSgvXFwoXGQrKS9nLHIpKX1" + 
"2YXIgQz1mdW5jdGlvbihnLGkpe2c9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZywwKTtpZih" + 
"pKXtpLnB1c2guYXBwbHkoaSxnKTtyZXR1cm4gaX1yZXR1cm4gZ307dHJ5e0FycmF5LnByb3RvdHl" + 
"wZS5zbGljZS5jYWxsKHQuZG9jdW1lbnRFbGVtZW50LmNoaWxkTm9kZXMsMCl9Y2F0Y2goSil7Qz1" + 
"mdW5jdGlvbihnLGkpe3ZhciBuPTAsbT1pfHxbXTtpZihmLmNhbGwoZyk9PT0iW29iamVjdCBBcnJ" + 
"heV0iKUFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KG0sDQpnKTtlbHNlIGlmKHR5cGVvZiBnLmx" + 
"lbmd0aD09PSJudW1iZXIiKWZvcih2YXIgcD1nLmxlbmd0aDtuPHA7bisrKW0ucHVzaChnW25dKTt" + 
"lbHNlIGZvcig7Z1tuXTtuKyspbS5wdXNoKGdbbl0pO3JldHVybiBtfX12YXIgdyxJO2lmKHQuZG9" + 
"jdW1lbnRFbGVtZW50LmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKXc9ZnVuY3Rpb24oZyxpKXtpZih" + 
"nPT09aSl7aD10cnVlO3JldHVybiAwfWlmKCFnLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9ufHwhaS5" + 
"jb21wYXJlRG9jdW1lbnRQb3NpdGlvbilyZXR1cm4gZy5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbj8" + 
"tMToxO3JldHVybiBnLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGkpJjQ/LTE6MX07ZWxzZXt3PWZ" + 
"1bmN0aW9uKGcsaSl7dmFyIG4sbSxwPVtdLHE9W107bj1nLnBhcmVudE5vZGU7bT1pLnBhcmVudE5" + 
"vZGU7dmFyIHU9bjtpZihnPT09aSl7aD10cnVlO3JldHVybiAwfWVsc2UgaWYobj09PW0pcmV0dXJ" + 
"uIEkoZyxpKTtlbHNlIGlmKG4pe2lmKCFtKXJldHVybiAxfWVsc2UgcmV0dXJuLTE7DQpmb3IoO3U" + 
"7KXtwLnVuc2hpZnQodSk7dT11LnBhcmVudE5vZGV9Zm9yKHU9bTt1Oyl7cS51bnNoaWZ0KHUpO3U" + 
"9dS5wYXJlbnROb2RlfW49cC5sZW5ndGg7bT1xLmxlbmd0aDtmb3IodT0wO3U8biYmdTxtO3UrKyl" + 
"pZihwW3VdIT09cVt1XSlyZXR1cm4gSShwW3VdLHFbdV0pO3JldHVybiB1PT09bj9JKGcscVt1XSw" + 
"tMSk6SShwW3VdLGksMSl9O0k9ZnVuY3Rpb24oZyxpLG4pe2lmKGc9PT1pKXJldHVybiBuO2Zvcih" + 
"nPWcubmV4dFNpYmxpbmc7Zzspe2lmKGc9PT1pKXJldHVybi0xO2c9Zy5uZXh0U2libGluZ31yZXR" + 
"1cm4gMX19ay5nZXRUZXh0PWZ1bmN0aW9uKGcpe2Zvcih2YXIgaT0iIixuLG09MDtnW21dO20rKyl" + 
"7bj1nW21dO2lmKG4ubm9kZVR5cGU9PT0zfHxuLm5vZGVUeXBlPT09NClpKz1uLm5vZGVWYWx1ZTt" + 
"lbHNlIGlmKG4ubm9kZVR5cGUhPT04KWkrPWsuZ2V0VGV4dChuLmNoaWxkTm9kZXMpfXJldHVybiB" + 
"pfTsoZnVuY3Rpb24oKXt2YXIgZz10LmNyZWF0ZUVsZW1lbnQoImRpdiIpLA0KaT0ic2NyaXB0Iis" + 
"obmV3IERhdGUpLmdldFRpbWUoKSxuPXQuZG9jdW1lbnRFbGVtZW50O2cuaW5uZXJIVE1MPSI8YSB" + 
"uYW1lPSciK2krIicvPiI7bi5pbnNlcnRCZWZvcmUoZyxuLmZpcnN0Q2hpbGQpO2lmKHQuZ2V0RWx" + 
"lbWVudEJ5SWQoaSkpe28uZmluZC5JRD1mdW5jdGlvbihtLHAscSl7aWYodHlwZW9mIHAuZ2V0RWx" + 
"lbWVudEJ5SWQhPT0idW5kZWZpbmVkIiYmIXEpcmV0dXJuKHA9cC5nZXRFbGVtZW50QnlJZChtWzF" + 
"dKSk/cC5pZD09PW1bMV18fHR5cGVvZiBwLmdldEF0dHJpYnV0ZU5vZGUhPT0idW5kZWZpbmVkIiY" + 
"mcC5nZXRBdHRyaWJ1dGVOb2RlKCJpZCIpLm5vZGVWYWx1ZT09PW1bMV0/W3BdOkI6W119O28uZml" + 
"sdGVyLklEPWZ1bmN0aW9uKG0scCl7dmFyIHE9dHlwZW9mIG0uZ2V0QXR0cmlidXRlTm9kZSE9PSJ" + 
"1bmRlZmluZWQiJiZtLmdldEF0dHJpYnV0ZU5vZGUoImlkIik7cmV0dXJuIG0ubm9kZVR5cGU9PT0" + 
"xJiZxJiZxLm5vZGVWYWx1ZT09PXB9fW4ucmVtb3ZlQ2hpbGQoZyk7DQpuPWc9bnVsbH0pKCk7KGZ" + 
"1bmN0aW9uKCl7dmFyIGc9dC5jcmVhdGVFbGVtZW50KCJkaXYiKTtnLmFwcGVuZENoaWxkKHQuY3J" + 
"lYXRlQ29tbWVudCgiIikpO2lmKGcuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIioiKS5sZW5ndGg+MCl" + 
"vLmZpbmQuVEFHPWZ1bmN0aW9uKGksbil7dmFyIG09bi5nZXRFbGVtZW50c0J5VGFnTmFtZShpWzF" + 
"dKTtpZihpWzFdPT09IioiKXtmb3IodmFyIHA9W10scT0wO21bcV07cSsrKW1bcV0ubm9kZVR5cGU" + 
"9PT0xJiZwLnB1c2gobVtxXSk7bT1wfXJldHVybiBtfTtnLmlubmVySFRNTD0iPGEgaHJlZj0nIyc" + 
"+PC9hPiI7aWYoZy5maXJzdENoaWxkJiZ0eXBlb2YgZy5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSE" + 
"9PSJ1bmRlZmluZWQiJiZnLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCJocmVmIikhPT0iIyIpby5" + 
"hdHRySGFuZGxlLmhyZWY9ZnVuY3Rpb24oaSl7cmV0dXJuIGkuZ2V0QXR0cmlidXRlKCJocmVmIiw" + 
"yKX07Zz1udWxsfSkoKTt0LnF1ZXJ5U2VsZWN0b3JBbGwmJg0KZnVuY3Rpb24oKXt2YXIgZz1rLGk" + 
"9dC5jcmVhdGVFbGVtZW50KCJkaXYiKTtpLmlubmVySFRNTD0iPHAgY2xhc3M9J1RFU1QnPjwvcD4" + 
"iO2lmKCEoaS5xdWVyeVNlbGVjdG9yQWxsJiZpLnF1ZXJ5U2VsZWN0b3JBbGwoIi5URVNUIikubGV" + 
"uZ3RoPT09MCkpe2s9ZnVuY3Rpb24obSxwLHEsdSl7cD1wfHx0O209bS5yZXBsYWNlKC9cPVxzKih" + 
"bXiciXF1dKilccypcXS9nLCI9JyQxJ10iKTtpZighdSYmIWsuaXNYTUwocCkpaWYocC5ub2RlVHl" + 
"wZT09PTkpdHJ5e3JldHVybiBDKHAucXVlcnlTZWxlY3RvckFsbChtKSxxKX1jYXRjaCh5KXt9ZWx" + 
"zZSBpZihwLm5vZGVUeXBlPT09MSYmcC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpIT09Im9iamVjdCI" + 
"pe3ZhciBGPXAuZ2V0QXR0cmlidXRlKCJpZCIpLE09Rnx8Il9fc2l6emxlX18iO0Z8fHAuc2V0QXR" + 
"0cmlidXRlKCJpZCIsTSk7dHJ5e3JldHVybiBDKHAucXVlcnlTZWxlY3RvckFsbCgiIyIrTSsiICI" + 
"rbSkscSl9Y2F0Y2goTil7fWZpbmFsbHl7Rnx8DQpwLnJlbW92ZUF0dHJpYnV0ZSgiaWQiKX19cmV" + 
"0dXJuIGcobSxwLHEsdSl9O2Zvcih2YXIgbiBpbiBnKWtbbl09Z1tuXTtpPW51bGx9fSgpOyhmdW5" + 
"jdGlvbigpe3ZhciBnPXQuZG9jdW1lbnRFbGVtZW50LGk9Zy5tYXRjaGVzU2VsZWN0b3J8fGcubW9" + 
"6TWF0Y2hlc1NlbGVjdG9yfHxnLndlYmtpdE1hdGNoZXNTZWxlY3Rvcnx8Zy5tc01hdGNoZXNTZWx" + 
"lY3RvcixuPWZhbHNlO3RyeXtpLmNhbGwodC5kb2N1bWVudEVsZW1lbnQsIlt0ZXN0IT0nJ106c2l" + 
"6emxlIil9Y2F0Y2gobSl7bj10cnVlfWlmKGkpay5tYXRjaGVzU2VsZWN0b3I9ZnVuY3Rpb24ocCx" + 
"xKXtxPXEucmVwbGFjZSgvXD1ccyooW14nIlxdXSopXHMqXF0vZywiPSckMSddIik7aWYoIWsuaXN" + 
"YTUwocCkpdHJ5e2lmKG58fCFvLm1hdGNoLlBTRVVETy50ZXN0KHEpJiYhLyE9Ly50ZXN0KHEpKXJ" + 
"ldHVybiBpLmNhbGwocCxxKX1jYXRjaCh1KXt9cmV0dXJuIGsocSxudWxsLG51bGwsW3BdKS5sZW5" + 
"ndGg+MH19KSgpOyhmdW5jdGlvbigpe3ZhciBnPQ0KdC5jcmVhdGVFbGVtZW50KCJkaXYiKTtnLml" + 
"ubmVySFRNTD0iPGRpdiBjbGFzcz0ndGVzdCBlJz48L2Rpdj48ZGl2IGNsYXNzPSd0ZXN0Jz48L2R" + 
"pdj4iO2lmKCEoIWcuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZXx8Zy5nZXRFbGVtZW50c0J5Q2xhc3N" + 
"OYW1lKCJlIikubGVuZ3RoPT09MCkpe2cubGFzdENoaWxkLmNsYXNzTmFtZT0iZSI7aWYoZy5nZXR" + 
"FbGVtZW50c0J5Q2xhc3NOYW1lKCJlIikubGVuZ3RoIT09MSl7by5vcmRlci5zcGxpY2UoMSwwLCJ" + 
"DTEFTUyIpO28uZmluZC5DTEFTUz1mdW5jdGlvbihpLG4sbSl7aWYodHlwZW9mIG4uZ2V0RWxlbWV" + 
"udHNCeUNsYXNzTmFtZSE9PSJ1bmRlZmluZWQiJiYhbSlyZXR1cm4gbi5nZXRFbGVtZW50c0J5Q2x" + 
"hc3NOYW1lKGlbMV0pfTtnPW51bGx9fX0pKCk7ay5jb250YWlucz10LmRvY3VtZW50RWxlbWVudC5" + 
"jb250YWlucz9mdW5jdGlvbihnLGkpe3JldHVybiBnIT09aSYmKGcuY29udGFpbnM/Zy5jb250YWl" + 
"ucyhpKTp0cnVlKX06dC5kb2N1bWVudEVsZW1lbnQuY29tcGFyZURvY3VtZW50UG9zaXRpb24/DQp" + 
"mdW5jdGlvbihnLGkpe3JldHVybiEhKGcuY29tcGFyZURvY3VtZW50UG9zaXRpb24oaSkmMTYpfTp" + 
"mdW5jdGlvbigpe3JldHVybiBmYWxzZX07ay5pc1hNTD1mdW5jdGlvbihnKXtyZXR1cm4oZz0oZz9" + 
"nLm93bmVyRG9jdW1lbnR8fGc6MCkuZG9jdW1lbnRFbGVtZW50KT9nLm5vZGVOYW1lIT09IkhUTUw" + 
"iOmZhbHNlfTt2YXIgTD1mdW5jdGlvbihnLGkpe2Zvcih2YXIgbixtPVtdLHA9IiIscT1pLm5vZGV" + 
"UeXBlP1tpXTppO249by5tYXRjaC5QU0VVRE8uZXhlYyhnKTspe3ArPW5bMF07Zz1nLnJlcGxhY2U" + 
"oby5tYXRjaC5QU0VVRE8sIiIpfWc9by5yZWxhdGl2ZVtnXT9nKyIqIjpnO249MDtmb3IodmFyIHU" + 
"9cS5sZW5ndGg7bjx1O24rKylrKGcscVtuXSxtKTtyZXR1cm4gay5maWx0ZXIocCxtKX07Yy5maW5" + 
"kPWs7Yy5leHByPWsuc2VsZWN0b3JzO2MuZXhwclsiOiJdPWMuZXhwci5maWx0ZXJzO2MudW5pcXV" + 
"lPWsudW5pcXVlU29ydDtjLnRleHQ9ay5nZXRUZXh0O2MuaXNYTUxEb2M9ay5pc1hNTDsNCmMuY29" + 
"udGFpbnM9ay5jb250YWluc30pKCk7dmFyIFphPS9VbnRpbCQvLCRhPS9eKD86cGFyZW50c3xwcmV" + 
"2VW50aWx8cHJldkFsbCkvLGFiPS8sLyxOYT0vXi5bXjojXFtcLixdKiQvLGJiPUFycmF5LnByb3R" + 
"vdHlwZS5zbGljZSxjYj1jLmV4cHIubWF0Y2guUE9TO2MuZm4uZXh0ZW5kKHtmaW5kOmZ1bmN0aW9" + 
"uKGEpe2Zvcih2YXIgYj10aGlzLnB1c2hTdGFjaygiIiwiZmluZCIsYSksZD0wLGU9MCxmPXRoaXM" + 
"ubGVuZ3RoO2U8ZjtlKyspe2Q9Yi5sZW5ndGg7Yy5maW5kKGEsdGhpc1tlXSxiKTtpZihlPjApZm9" + 
"yKHZhciBoPWQ7aDxiLmxlbmd0aDtoKyspZm9yKHZhciBsPTA7bDxkO2wrKylpZihiW2xdPT09Ylt" + 
"oXSl7Yi5zcGxpY2UoaC0tLDEpO2JyZWFrfX1yZXR1cm4gYn0saGFzOmZ1bmN0aW9uKGEpe3ZhciB" + 
"iPWMoYSk7cmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCl7Zm9yKHZhciBkPTAsZT1iLmxlbmd" + 
"0aDtkPGU7ZCsrKWlmKGMuY29udGFpbnModGhpcyxiW2RdKSlyZXR1cm4gdHJ1ZX0pfSwNCm5vdDp" + 
"mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5wdXNoU3RhY2sobWEodGhpcyxhLGZhbHNlKSwibm90Iix" + 
"hKX0sZmlsdGVyOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLnB1c2hTdGFjayhtYSh0aGlzLGEsdHJ" + 
"1ZSksImZpbHRlciIsYSl9LGlzOmZ1bmN0aW9uKGEpe3JldHVybiEhYSYmYy5maWx0ZXIoYSx0aGl" + 
"zKS5sZW5ndGg+MH0sY2xvc2VzdDpmdW5jdGlvbihhLGIpe3ZhciBkPVtdLGUsZixoPXRoaXNbMF0" + 
"7aWYoYy5pc0FycmF5KGEpKXt2YXIgbCxrPXt9LG89MTtpZihoJiZhLmxlbmd0aCl7ZT0wO2Zvcih" + 
"mPWEubGVuZ3RoO2U8ZjtlKyspe2w9YVtlXTtrW2xdfHwoa1tsXT1jLmV4cHIubWF0Y2guUE9TLnR" + 
"lc3QobCk/YyhsLGJ8fHRoaXMuY29udGV4dCk6bCl9Zm9yKDtoJiZoLm93bmVyRG9jdW1lbnQmJmg" + 
"hPT1iOyl7Zm9yKGwgaW4gayl7ZT1rW2xdO2lmKGUuanF1ZXJ5P2UuaW5kZXgoaCk+LTE6YyhoKS5" + 
"pcyhlKSlkLnB1c2goe3NlbGVjdG9yOmwsZWxlbTpoLGxldmVsOm99KX1oPQ0KaC5wYXJlbnROb2R" + 
"lO28rK319cmV0dXJuIGR9bD1jYi50ZXN0KGEpP2MoYSxifHx0aGlzLmNvbnRleHQpOm51bGw7ZT0" + 
"wO2ZvcihmPXRoaXMubGVuZ3RoO2U8ZjtlKyspZm9yKGg9dGhpc1tlXTtoOylpZihsP2wuaW5kZXg" + 
"oaCk+LTE6Yy5maW5kLm1hdGNoZXNTZWxlY3RvcihoLGEpKXtkLnB1c2goaCk7YnJlYWt9ZWxzZXt" + 
"oPWgucGFyZW50Tm9kZTtpZighaHx8IWgub3duZXJEb2N1bWVudHx8aD09PWIpYnJlYWt9ZD1kLmx" + 
"lbmd0aD4xP2MudW5pcXVlKGQpOmQ7cmV0dXJuIHRoaXMucHVzaFN0YWNrKGQsImNsb3Nlc3QiLGE" + 
"pfSxpbmRleDpmdW5jdGlvbihhKXtpZighYXx8dHlwZW9mIGE9PT0ic3RyaW5nIilyZXR1cm4gYy5" + 
"pbkFycmF5KHRoaXNbMF0sYT9jKGEpOnRoaXMucGFyZW50KCkuY2hpbGRyZW4oKSk7cmV0dXJuIGM" + 
"uaW5BcnJheShhLmpxdWVyeT9hWzBdOmEsdGhpcyl9LGFkZDpmdW5jdGlvbihhLGIpe3ZhciBkPXR" + 
"5cGVvZiBhPT09InN0cmluZyI/YyhhLGJ8fHRoaXMuY29udGV4dCk6DQpjLm1ha2VBcnJheShhKSx" + 
"lPWMubWVyZ2UodGhpcy5nZXQoKSxkKTtyZXR1cm4gdGhpcy5wdXNoU3RhY2soIWRbMF18fCFkWzB" + 
"dLnBhcmVudE5vZGV8fGRbMF0ucGFyZW50Tm9kZS5ub2RlVHlwZT09PTExfHwhZVswXXx8IWVbMF0" + 
"ucGFyZW50Tm9kZXx8ZVswXS5wYXJlbnROb2RlLm5vZGVUeXBlPT09MTE/ZTpjLnVuaXF1ZShlKSl" + 
"9LGFuZFNlbGY6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5hZGQodGhpcy5wcmV2T2JqZWN0KX19KTt" + 
"jLmVhY2goe3BhcmVudDpmdW5jdGlvbihhKXtyZXR1cm4oYT1hLnBhcmVudE5vZGUpJiZhLm5vZGV" + 
"UeXBlIT09MTE/YTpudWxsfSxwYXJlbnRzOmZ1bmN0aW9uKGEpe3JldHVybiBjLmRpcihhLCJwYXJ" + 
"lbnROb2RlIil9LHBhcmVudHNVbnRpbDpmdW5jdGlvbihhLGIsZCl7cmV0dXJuIGMuZGlyKGEsInB" + 
"hcmVudE5vZGUiLGQpfSxuZXh0OmZ1bmN0aW9uKGEpe3JldHVybiBjLm50aChhLDIsIm5leHRTaWJ" + 
"saW5nIil9LHByZXY6ZnVuY3Rpb24oYSl7cmV0dXJuIGMubnRoKGEsDQoyLCJwcmV2aW91c1NpYmx" + 
"pbmciKX0sbmV4dEFsbDpmdW5jdGlvbihhKXtyZXR1cm4gYy5kaXIoYSwibmV4dFNpYmxpbmciKX0" + 
"scHJldkFsbDpmdW5jdGlvbihhKXtyZXR1cm4gYy5kaXIoYSwicHJldmlvdXNTaWJsaW5nIil9LG5" + 
"leHRVbnRpbDpmdW5jdGlvbihhLGIsZCl7cmV0dXJuIGMuZGlyKGEsIm5leHRTaWJsaW5nIixkKX0" + 
"scHJldlVudGlsOmZ1bmN0aW9uKGEsYixkKXtyZXR1cm4gYy5kaXIoYSwicHJldmlvdXNTaWJsaW5" + 
"nIixkKX0sc2libGluZ3M6ZnVuY3Rpb24oYSl7cmV0dXJuIGMuc2libGluZyhhLnBhcmVudE5vZGU" + 
"uZmlyc3RDaGlsZCxhKX0sY2hpbGRyZW46ZnVuY3Rpb24oYSl7cmV0dXJuIGMuc2libGluZyhhLmZ" + 
"pcnN0Q2hpbGQpfSxjb250ZW50czpmdW5jdGlvbihhKXtyZXR1cm4gYy5ub2RlTmFtZShhLCJpZnJ" + 
"hbWUiKT9hLmNvbnRlbnREb2N1bWVudHx8YS5jb250ZW50V2luZG93LmRvY3VtZW50OmMubWFrZUF" + 
"ycmF5KGEuY2hpbGROb2Rlcyl9fSxmdW5jdGlvbihhLA0KYil7Yy5mblthXT1mdW5jdGlvbihkLGU" + 
"pe3ZhciBmPWMubWFwKHRoaXMsYixkKTtaYS50ZXN0KGEpfHwoZT1kKTtpZihlJiZ0eXBlb2YgZT0" + 
"9PSJzdHJpbmciKWY9Yy5maWx0ZXIoZSxmKTtmPXRoaXMubGVuZ3RoPjE/Yy51bmlxdWUoZik6Zjt" + 
"pZigodGhpcy5sZW5ndGg+MXx8YWIudGVzdChlKSkmJiRhLnRlc3QoYSkpZj1mLnJldmVyc2UoKTt" + 
"yZXR1cm4gdGhpcy5wdXNoU3RhY2soZixhLGJiLmNhbGwoYXJndW1lbnRzKS5qb2luKCIsIikpfX0" + 
"pO2MuZXh0ZW5kKHtmaWx0ZXI6ZnVuY3Rpb24oYSxiLGQpe2lmKGQpYT0iOm5vdCgiK2ErIikiO3J" + 
"ldHVybiBiLmxlbmd0aD09PTE/Yy5maW5kLm1hdGNoZXNTZWxlY3RvcihiWzBdLGEpP1tiWzBdXTp" + 
"bXTpjLmZpbmQubWF0Y2hlcyhhLGIpfSxkaXI6ZnVuY3Rpb24oYSxiLGQpe3ZhciBlPVtdO2Zvcih" + 
"hPWFbYl07YSYmYS5ub2RlVHlwZSE9PTkmJihkPT09Qnx8YS5ub2RlVHlwZSE9PTF8fCFjKGEpLml" + 
"zKGQpKTspe2Eubm9kZVR5cGU9PT0xJiYNCmUucHVzaChhKTthPWFbYl19cmV0dXJuIGV9LG50aDp" + 
"mdW5jdGlvbihhLGIsZCl7Yj1ifHwxO2Zvcih2YXIgZT0wO2E7YT1hW2RdKWlmKGEubm9kZVR5cGU" + 
"9PT0xJiYrK2U9PT1iKWJyZWFrO3JldHVybiBhfSxzaWJsaW5nOmZ1bmN0aW9uKGEsYil7Zm9yKHZ" + 
"hciBkPVtdO2E7YT1hLm5leHRTaWJsaW5nKWEubm9kZVR5cGU9PT0xJiZhIT09YiYmZC5wdXNoKGE" + 
"pO3JldHVybiBkfX0pO3ZhciB6YT0vIGpRXGQrPSIoPzpcZCt8bnVsbCkiL2csJD0vXlxzKy8sQWE" + 
"9LzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW1x" + 
"3Ol0rKVtePl0qKVwvPi9pZyxCYT0vPChbXHc6XSspLyxkYj0vPHRib2R5L2ksZWI9Lzx8JiM/XHc" + 
"rOy8sQ2E9LzwoPzpzY3JpcHR8b2JqZWN0fGVtYmVkfG9wdGlvbnxzdHlsZSkvaSxEYT0vY2hlY2t" + 
"lZFxzKig/OltePV18PVxzKi5jaGVja2VkLikvaSxmYj0vXD0oW149Iic+XHNdK1wvKT4vZyxQPXt" + 
"vcHRpb246WzEsDQoiPHNlbGVjdCBtdWx0aXBsZT0nbXVsdGlwbGUnPiIsIjwvc2VsZWN0PiJdLGx" + 
"lZ2VuZDpbMSwiPGZpZWxkc2V0PiIsIjwvZmllbGRzZXQ+Il0sdGhlYWQ6WzEsIjx0YWJsZT4iLCI" + 
"8L3RhYmxlPiJdLHRyOlsyLCI8dGFibGU+PHRib2R5PiIsIjwvdGJvZHk+PC90YWJsZT4iXSx0ZDp" + 
"bMywiPHRhYmxlPjx0Ym9keT48dHI+IiwiPC90cj48L3Rib2R5PjwvdGFibGU+Il0sY29sOlsyLCI" + 
"8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPiIsIjwvY29sZ3JvdXA+PC90YWJsZT4iXSx" + 
"hcmVhOlsxLCI8bWFwPiIsIjwvbWFwPiJdLF9kZWZhdWx0OlswLCIiLCIiXX07UC5vcHRncm91cD1" + 
"QLm9wdGlvbjtQLnRib2R5PVAudGZvb3Q9UC5jb2xncm91cD1QLmNhcHRpb249UC50aGVhZDtQLnR" + 
"oPVAudGQ7aWYoIWMuc3VwcG9ydC5odG1sU2VyaWFsaXplKVAuX2RlZmF1bHQ9WzEsImRpdjxkaXY" + 
"+IiwiPC9kaXY+Il07Yy5mbi5leHRlbmQoe3RleHQ6ZnVuY3Rpb24oYSl7aWYoYy5pc0Z1bmN0aW9" + 
"uKGEpKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oYil7dmFyIGQ9DQpjKHRoaXMpO2QudGV4dCh" + 
"hLmNhbGwodGhpcyxiLGQudGV4dCgpKSl9KTtpZih0eXBlb2YgYSE9PSJvYmplY3QiJiZhIT09Qil" + 
"yZXR1cm4gdGhpcy5lbXB0eSgpLmFwcGVuZCgodGhpc1swXSYmdGhpc1swXS5vd25lckRvY3VtZW5" + 
"0fHx0KS5jcmVhdGVUZXh0Tm9kZShhKSk7cmV0dXJuIGMudGV4dCh0aGlzKX0sd3JhcEFsbDpmdW5" + 
"jdGlvbihhKXtpZihjLmlzRnVuY3Rpb24oYSkpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihkKXt" + 
"jKHRoaXMpLndyYXBBbGwoYS5jYWxsKHRoaXMsZCkpfSk7aWYodGhpc1swXSl7dmFyIGI9YyhhLHR" + 
"oaXNbMF0ub3duZXJEb2N1bWVudCkuZXEoMCkuY2xvbmUodHJ1ZSk7dGhpc1swXS5wYXJlbnROb2R" + 
"lJiZiLmluc2VydEJlZm9yZSh0aGlzWzBdKTtiLm1hcChmdW5jdGlvbigpe2Zvcih2YXIgZD10aGl" + 
"zO2QuZmlyc3RDaGlsZCYmZC5maXJzdENoaWxkLm5vZGVUeXBlPT09MTspZD1kLmZpcnN0Q2hpbGQ" + 
"7cmV0dXJuIGR9KS5hcHBlbmQodGhpcyl9cmV0dXJuIHRoaXN9LA0Kd3JhcElubmVyOmZ1bmN0aW9" + 
"uKGEpe2lmKGMuaXNGdW5jdGlvbihhKSlyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGIpe2ModGh" + 
"pcykud3JhcElubmVyKGEuY2FsbCh0aGlzLGIpKX0pO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24" + 
"oKXt2YXIgYj1jKHRoaXMpLGQ9Yi5jb250ZW50cygpO2QubGVuZ3RoP2Qud3JhcEFsbChhKTpiLmF" + 
"wcGVuZChhKX0pfSx3cmFwOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt" + 
"jKHRoaXMpLndyYXBBbGwoYSl9KX0sdW53cmFwOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucGFyZW5" + 
"0KCkuZWFjaChmdW5jdGlvbigpe2Mubm9kZU5hbWUodGhpcywiYm9keSIpfHxjKHRoaXMpLnJlcGx" + 
"hY2VXaXRoKHRoaXMuY2hpbGROb2Rlcyl9KS5lbmQoKX0sYXBwZW5kOmZ1bmN0aW9uKCl7cmV0dXJ" + 
"uIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLHRydWUsZnVuY3Rpb24oYSl7dGhpcy5ub2RlVHlwZT0" + 
"9PTEmJnRoaXMuYXBwZW5kQ2hpbGQoYSl9KX0sDQpwcmVwZW5kOmZ1bmN0aW9uKCl7cmV0dXJuIHR" + 
"oaXMuZG9tTWFuaXAoYXJndW1lbnRzLHRydWUsZnVuY3Rpb24oYSl7dGhpcy5ub2RlVHlwZT09PTE" + 
"mJnRoaXMuaW5zZXJ0QmVmb3JlKGEsdGhpcy5maXJzdENoaWxkKX0pfSxiZWZvcmU6ZnVuY3Rpb24" + 
"oKXtpZih0aGlzWzBdJiZ0aGlzWzBdLnBhcmVudE5vZGUpcmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJ" + 
"ndW1lbnRzLGZhbHNlLGZ1bmN0aW9uKGIpe3RoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYix" + 
"0aGlzKX0pO2Vsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCl7dmFyIGE9Yyhhcmd1bWVudHNbMF0pO2E" + 
"ucHVzaC5hcHBseShhLHRoaXMudG9BcnJheSgpKTtyZXR1cm4gdGhpcy5wdXNoU3RhY2soYSwiYmV" + 
"mb3JlIixhcmd1bWVudHMpfX0sYWZ0ZXI6ZnVuY3Rpb24oKXtpZih0aGlzWzBdJiZ0aGlzWzBdLnB" + 
"hcmVudE5vZGUpcmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLGZhbHNlLGZ1bmN0aW9uKGI" + 
"pe3RoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYiwNCnRoaXMubmV4dFNpYmxpbmcpfSk7ZWx" + 
"zZSBpZihhcmd1bWVudHMubGVuZ3RoKXt2YXIgYT10aGlzLnB1c2hTdGFjayh0aGlzLCJhZnRlciI" + 
"sYXJndW1lbnRzKTthLnB1c2guYXBwbHkoYSxjKGFyZ3VtZW50c1swXSkudG9BcnJheSgpKTtyZXR" + 
"1cm4gYX19LHJlbW92ZTpmdW5jdGlvbihhLGIpe2Zvcih2YXIgZD0wLGU7KGU9dGhpc1tkXSkhPW5" + 
"1bGw7ZCsrKWlmKCFhfHxjLmZpbHRlcihhLFtlXSkubGVuZ3RoKXtpZighYiYmZS5ub2RlVHlwZT0" + 
"9PTEpe2MuY2xlYW5EYXRhKGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIioiKSk7Yy5jbGVhbkRhdGE" + 
"oW2VdKX1lLnBhcmVudE5vZGUmJmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlKX1yZXR1cm4gdGh" + 
"pc30sZW1wdHk6ZnVuY3Rpb24oKXtmb3IodmFyIGE9MCxiOyhiPXRoaXNbYV0pIT1udWxsO2ErKyl" + 
"mb3IoYi5ub2RlVHlwZT09PTEmJmMuY2xlYW5EYXRhKGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIio" + 
"iKSk7Yi5maXJzdENoaWxkOyliLnJlbW92ZUNoaWxkKGIuZmlyc3RDaGlsZCk7DQpyZXR1cm4gdGh" + 
"pc30sY2xvbmU6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5tYXAoZnVuY3Rpb24oKXtpZighYy5zdXB" + 
"wb3J0Lm5vQ2xvbmVFdmVudCYmIWMuaXNYTUxEb2ModGhpcykpe3ZhciBkPXRoaXMub3V0ZXJIVE1" + 
"MLGU9dGhpcy5vd25lckRvY3VtZW50O2lmKCFkKXtkPWUuY3JlYXRlRWxlbWVudCgiZGl2Iik7ZC5" + 
"hcHBlbmRDaGlsZCh0aGlzLmNsb25lTm9kZSh0cnVlKSk7ZD1kLmlubmVySFRNTH1yZXR1cm4gYy5" + 
"jbGVhbihbZC5yZXBsYWNlKHphLCIiKS5yZXBsYWNlKGZiLCc9IiQxIj4nKS5yZXBsYWNlKCQsIiI" + 
"pXSxlKVswXX1lbHNlIHJldHVybiB0aGlzLmNsb25lTm9kZSh0cnVlKX0pO2lmKGE9PT10cnVlKXt" + 
"uYSh0aGlzLGIpO25hKHRoaXMuZmluZCgiKiIpLGIuZmluZCgiKiIpKX1yZXR1cm4gYn0saHRtbDp" + 
"mdW5jdGlvbihhKXtpZihhPT09QilyZXR1cm4gdGhpc1swXSYmdGhpc1swXS5ub2RlVHlwZT09PTE" + 
"/dGhpc1swXS5pbm5lckhUTUwucmVwbGFjZSh6YSwiIik6bnVsbDsNCmVsc2UgaWYodHlwZW9mIGE" + 
"9PT0ic3RyaW5nIiYmIUNhLnRlc3QoYSkmJihjLnN1cHBvcnQubGVhZGluZ1doaXRlc3BhY2V8fCE" + 
"kLnRlc3QoYSkpJiYhUFsoQmEuZXhlYyhhKXx8WyIiLCIiXSlbMV0udG9Mb3dlckNhc2UoKV0pe2E" + 
"9YS5yZXBsYWNlKEFhLCI8JDE+PC8kMj4iKTt0cnl7Zm9yKHZhciBiPTAsZD10aGlzLmxlbmd0aDt" + 
"iPGQ7YisrKWlmKHRoaXNbYl0ubm9kZVR5cGU9PT0xKXtjLmNsZWFuRGF0YSh0aGlzW2JdLmdldEV" + 
"sZW1lbnRzQnlUYWdOYW1lKCIqIikpO3RoaXNbYl0uaW5uZXJIVE1MPWF9fWNhdGNoKGUpe3RoaXM" + 
"uZW1wdHkoKS5hcHBlbmQoYSl9fWVsc2UgYy5pc0Z1bmN0aW9uKGEpP3RoaXMuZWFjaChmdW5jdGl" + 
"vbihmKXt2YXIgaD1jKHRoaXMpO2guaHRtbChhLmNhbGwodGhpcyxmLGguaHRtbCgpKSl9KTp0aGl" + 
"zLmVtcHR5KCkuYXBwZW5kKGEpO3JldHVybiB0aGlzfSxyZXBsYWNlV2l0aDpmdW5jdGlvbihhKXt" + 
"pZih0aGlzWzBdJiZ0aGlzWzBdLnBhcmVudE5vZGUpe2lmKGMuaXNGdW5jdGlvbihhKSlyZXR1cm4" + 
"gdGhpcy5lYWNoKGZ1bmN0aW9uKGIpe3ZhciBkPQ0KYyh0aGlzKSxlPWQuaHRtbCgpO2QucmVwbGF" + 
"jZVdpdGgoYS5jYWxsKHRoaXMsYixlKSl9KTtpZih0eXBlb2YgYSE9PSJzdHJpbmciKWE9YyhhKS5" + 
"kZXRhY2goKTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGI9dGhpcy5uZXh0U2libGl" + 
"uZyxkPXRoaXMucGFyZW50Tm9kZTtjKHRoaXMpLnJlbW92ZSgpO2I/YyhiKS5iZWZvcmUoYSk6Yyh" + 
"kKS5hcHBlbmQoYSl9KX1lbHNlIHJldHVybiB0aGlzLnB1c2hTdGFjayhjKGMuaXNGdW5jdGlvbih" + 
"hKT9hKCk6YSksInJlcGxhY2VXaXRoIixhKX0sZGV0YWNoOmZ1bmN0aW9uKGEpe3JldHVybiB0aGl" + 
"zLnJlbW92ZShhLHRydWUpfSxkb21NYW5pcDpmdW5jdGlvbihhLGIsZCl7dmFyIGUsZixoLGw9YVs" + 
"wXSxrPVtdO2lmKCFjLnN1cHBvcnQuY2hlY2tDbG9uZSYmYXJndW1lbnRzLmxlbmd0aD09PTMmJnR" + 
"5cGVvZiBsPT09InN0cmluZyImJkRhLnRlc3QobCkpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbig" + 
"pe2ModGhpcykuZG9tTWFuaXAoYSwNCmIsZCx0cnVlKX0pO2lmKGMuaXNGdW5jdGlvbihsKSlyZXR" + 
"1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKHgpe3ZhciByPWModGhpcyk7YVswXT1sLmNhbGwodGhpcyx" + 
"4LGI/ci5odG1sKCk6Qik7ci5kb21NYW5pcChhLGIsZCl9KTtpZih0aGlzWzBdKXtlPWwmJmwucGF" + 
"yZW50Tm9kZTtlPWMuc3VwcG9ydC5wYXJlbnROb2RlJiZlJiZlLm5vZGVUeXBlPT09MTEmJmUuY2h" + 
"pbGROb2Rlcy5sZW5ndGg9PT10aGlzLmxlbmd0aD97ZnJhZ21lbnQ6ZX06Yy5idWlsZEZyYWdtZW5" + 
"0KGEsdGhpcyxrKTtoPWUuZnJhZ21lbnQ7aWYoZj1oLmNoaWxkTm9kZXMubGVuZ3RoPT09MT9oPWg" + 
"uZmlyc3RDaGlsZDpoLmZpcnN0Q2hpbGQpe2I9YiYmYy5ub2RlTmFtZShmLCJ0ciIpO2Y9MDtmb3I" + 
"odmFyIG89dGhpcy5sZW5ndGg7ZjxvO2YrKylkLmNhbGwoYj9jLm5vZGVOYW1lKHRoaXNbZl0sInR" + 
"hYmxlIik/dGhpc1tmXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgidGJvZHkiKVswXXx8dGhpc1tmXS5" + 
"hcHBlbmRDaGlsZCh0aGlzW2ZdLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgidGJvZHkiKSk" + 
"6DQp0aGlzW2ZdOnRoaXNbZl0sZj4wfHxlLmNhY2hlYWJsZXx8dGhpcy5sZW5ndGg+MT9oLmNsb25" + 
"lTm9kZSh0cnVlKTpoKX1rLmxlbmd0aCYmYy5lYWNoKGssT2EpfXJldHVybiB0aGlzfX0pO2MuYnV" + 
"pbGRGcmFnbWVudD1mdW5jdGlvbihhLGIsZCl7dmFyIGUsZixoO2I9YiYmYlswXT9iWzBdLm93bmV" + 
"yRG9jdW1lbnR8fGJbMF06dDtpZihhLmxlbmd0aD09PTEmJnR5cGVvZiBhWzBdPT09InN0cmluZyI" + 
"mJmFbMF0ubGVuZ3RoPDUxMiYmYj09PXQmJiFDYS50ZXN0KGFbMF0pJiYoYy5zdXBwb3J0LmNoZWN" + 
"rQ2xvbmV8fCFEYS50ZXN0KGFbMF0pKSl7Zj10cnVlO2lmKGg9Yy5mcmFnbWVudHNbYVswXV0paWY" + 
"oaCE9PTEpZT1ofWlmKCFlKXtlPWIuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2MuY2xlYW4oYSx" + 
"iLGUsZCl9aWYoZiljLmZyYWdtZW50c1thWzBdXT1oP2U6MTtyZXR1cm57ZnJhZ21lbnQ6ZSxjYWN" + 
"oZWFibGU6Zn19O2MuZnJhZ21lbnRzPXt9O2MuZWFjaCh7YXBwZW5kVG86ImFwcGVuZCIsDQpwcmV" + 
"wZW5kVG86InByZXBlbmQiLGluc2VydEJlZm9yZToiYmVmb3JlIixpbnNlcnRBZnRlcjoiYWZ0ZXI" + 
"iLHJlcGxhY2VBbGw6InJlcGxhY2VXaXRoIn0sZnVuY3Rpb24oYSxiKXtjLmZuW2FdPWZ1bmN0aW9" + 
"uKGQpe3ZhciBlPVtdO2Q9YyhkKTt2YXIgZj10aGlzLmxlbmd0aD09PTEmJnRoaXNbMF0ucGFyZW5" + 
"0Tm9kZTtpZihmJiZmLm5vZGVUeXBlPT09MTEmJmYuY2hpbGROb2Rlcy5sZW5ndGg9PT0xJiZkLmx" + 
"lbmd0aD09PTEpe2RbYl0odGhpc1swXSk7cmV0dXJuIHRoaXN9ZWxzZXtmPTA7Zm9yKHZhciBoPWQ" + 
"ubGVuZ3RoO2Y8aDtmKyspe3ZhciBsPShmPjA/dGhpcy5jbG9uZSh0cnVlKTp0aGlzKS5nZXQoKTt" + 
"jKGRbZl0pW2JdKGwpO2U9ZS5jb25jYXQobCl9cmV0dXJuIHRoaXMucHVzaFN0YWNrKGUsYSxkLnN" + 
"lbGVjdG9yKX19fSk7Yy5leHRlbmQoe2NsZWFuOmZ1bmN0aW9uKGEsYixkLGUpe2I9Ynx8dDtpZih" + 
"0eXBlb2YgYi5jcmVhdGVFbGVtZW50PT09InVuZGVmaW5lZCIpYj1iLm93bmVyRG9jdW1lbnR8fA0" + 
"KYlswXSYmYlswXS5vd25lckRvY3VtZW50fHx0O2Zvcih2YXIgZj1bXSxoPTAsbDsobD1hW2hdKSE" + 
"9bnVsbDtoKyspe2lmKHR5cGVvZiBsPT09Im51bWJlciIpbCs9IiI7aWYobCl7aWYodHlwZW9mIGw" + 
"9PT0ic3RyaW5nIiYmIWViLnRlc3QobCkpbD1iLmNyZWF0ZVRleHROb2RlKGwpO2Vsc2UgaWYodHl" + 
"wZW9mIGw9PT0ic3RyaW5nIil7bD1sLnJlcGxhY2UoQWEsIjwkMT48LyQyPiIpO3ZhciBrPShCYS5" + 
"leGVjKGwpfHxbIiIsIiJdKVsxXS50b0xvd2VyQ2FzZSgpLG89UFtrXXx8UC5fZGVmYXVsdCx4PW9" + 
"bMF0scj1iLmNyZWF0ZUVsZW1lbnQoImRpdiIpO2ZvcihyLmlubmVySFRNTD1vWzFdK2wrb1syXTt" + 
"4LS07KXI9ci5sYXN0Q2hpbGQ7aWYoIWMuc3VwcG9ydC50Ym9keSl7eD1kYi50ZXN0KGwpO2s9az0" + 
"9PSJ0YWJsZSImJiF4P3IuZmlyc3RDaGlsZCYmci5maXJzdENoaWxkLmNoaWxkTm9kZXM6b1sxXT0" + 
"9PSI8dGFibGU+IiYmIXg/ci5jaGlsZE5vZGVzOltdO2ZvcihvPWsubGVuZ3RoLQ0KMTtvPj0wOy0" + 
"tbyljLm5vZGVOYW1lKGtbb10sInRib2R5IikmJiFrW29dLmNoaWxkTm9kZXMubGVuZ3RoJiZrW29" + 
"dLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoa1tvXSl9IWMuc3VwcG9ydC5sZWFkaW5nV2hpdGVzcGF" + 
"jZSYmJC50ZXN0KGwpJiZyLmluc2VydEJlZm9yZShiLmNyZWF0ZVRleHROb2RlKCQuZXhlYyhsKVs" + 
"wXSksci5maXJzdENoaWxkKTtsPXIuY2hpbGROb2Rlc31pZihsLm5vZGVUeXBlKWYucHVzaChsKTt" + 
"lbHNlIGY9Yy5tZXJnZShmLGwpfX1pZihkKWZvcihoPTA7ZltoXTtoKyspaWYoZSYmYy5ub2RlTmF" + 
"tZShmW2hdLCJzY3JpcHQiKSYmKCFmW2hdLnR5cGV8fGZbaF0udHlwZS50b0xvd2VyQ2FzZSgpPT0" + 
"9InRleHQvamF2YXNjcmlwdCIpKWUucHVzaChmW2hdLnBhcmVudE5vZGU/ZltoXS5wYXJlbnROb2R" + 
"lLnJlbW92ZUNoaWxkKGZbaF0pOmZbaF0pO2Vsc2V7ZltoXS5ub2RlVHlwZT09PTEmJmYuc3BsaWN" + 
"lLmFwcGx5KGYsW2grMSwwXS5jb25jYXQoYy5tYWtlQXJyYXkoZltoXS5nZXRFbGVtZW50c0J5VGF" + 
"nTmFtZSgic2NyaXB0IikpKSk7DQpkLmFwcGVuZENoaWxkKGZbaF0pfXJldHVybiBmfSxjbGVhbkR" + 
"hdGE6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiLGQsZT1jLmNhY2hlLGY9Yy5ldmVudC5zcGVjaWFsLGg" + 
"9Yy5zdXBwb3J0LmRlbGV0ZUV4cGFuZG8sbD0wLGs7KGs9YVtsXSkhPW51bGw7bCsrKWlmKCEoay5" + 
"ub2RlTmFtZSYmYy5ub0RhdGFbay5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXSkpaWYoZD1rW2MuZXh" + 
"wYW5kb10pe2lmKChiPWVbZF0pJiZiLmV2ZW50cylmb3IodmFyIG8gaW4gYi5ldmVudHMpZltvXT9" + 
"jLmV2ZW50LnJlbW92ZShrLG8pOmMucmVtb3ZlRXZlbnQoayxvLGIuaGFuZGxlKTtpZihoKWRlbGV" + 
"0ZSBrW2MuZXhwYW5kb107ZWxzZSBrLnJlbW92ZUF0dHJpYnV0ZSYmay5yZW1vdmVBdHRyaWJ1dGU" + 
"oYy5leHBhbmRvKTtkZWxldGUgZVtkXX19fSk7dmFyIEVhPS9hbHBoYVwoW14pXSpcKS9pLGdiPS9" + 
"vcGFjaXR5PShbXildKikvLGhiPS8tKFthLXpdKS9pZyxpYj0vKFtBLVpdKS9nLEZhPS9eLT9cZCs" + 
"oPzpweCk/JC9pLA0KamI9L14tP1xkLyxrYj17cG9zaXRpb246ImFic29sdXRlIix2aXNpYmlsaXR" + 
"5OiJoaWRkZW4iLGRpc3BsYXk6ImJsb2NrIn0sUGE9WyJMZWZ0IiwiUmlnaHQiXSxRYT1bIlRvcCI" + 
"sIkJvdHRvbSJdLFcsR2EsYWEsbGI9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYi50b1VwcGVyQ2FzZSg" + 
"pfTtjLmZuLmNzcz1mdW5jdGlvbihhLGIpe2lmKGFyZ3VtZW50cy5sZW5ndGg9PT0yJiZiPT09Qil" + 
"yZXR1cm4gdGhpcztyZXR1cm4gYy5hY2Nlc3ModGhpcyxhLGIsdHJ1ZSxmdW5jdGlvbihkLGUsZil" + 
"7cmV0dXJuIGYhPT1CP2Muc3R5bGUoZCxlLGYpOmMuY3NzKGQsZSl9KX07Yy5leHRlbmQoe2Nzc0h" + 
"vb2tzOntvcGFjaXR5OntnZXQ6ZnVuY3Rpb24oYSxiKXtpZihiKXt2YXIgZD1XKGEsIm9wYWNpdHk" + 
"iLCJvcGFjaXR5Iik7cmV0dXJuIGQ9PT0iIj8iMSI6ZH1lbHNlIHJldHVybiBhLnN0eWxlLm9wYWN" + 
"pdHl9fX0sY3NzTnVtYmVyOnt6SW5kZXg6dHJ1ZSxmb250V2VpZ2h0OnRydWUsb3BhY2l0eTp0cnV" + 
"lLA0Kem9vbTp0cnVlLGxpbmVIZWlnaHQ6dHJ1ZX0sY3NzUHJvcHM6eyJmbG9hdCI6Yy5zdXBwb3J" + 
"0LmNzc0Zsb2F0PyJjc3NGbG9hdCI6InN0eWxlRmxvYXQifSxzdHlsZTpmdW5jdGlvbihhLGIsZCx" + 
"lKXtpZighKCFhfHxhLm5vZGVUeXBlPT09M3x8YS5ub2RlVHlwZT09PTh8fCFhLnN0eWxlKSl7dmF" + 
"yIGYsaD1jLmNhbWVsQ2FzZShiKSxsPWEuc3R5bGUsaz1jLmNzc0hvb2tzW2hdO2I9Yy5jc3NQcm9" + 
"wc1toXXx8aDtpZihkIT09Qil7aWYoISh0eXBlb2YgZD09PSJudW1iZXIiJiZpc05hTihkKXx8ZD0" + 
"9bnVsbCkpe2lmKHR5cGVvZiBkPT09Im51bWJlciImJiFjLmNzc051bWJlcltoXSlkKz0icHgiO2l" + 
"mKCFrfHwhKCJzZXQiaW4gayl8fChkPWsuc2V0KGEsZCkpIT09Qil0cnl7bFtiXT1kfWNhdGNoKG8" + 
"pe319fWVsc2V7aWYoayYmImdldCJpbiBrJiYoZj1rLmdldChhLGZhbHNlLGUpKSE9PUIpcmV0dXJ" + 
"uIGY7cmV0dXJuIGxbYl19fX0sY3NzOmZ1bmN0aW9uKGEsYixkKXt2YXIgZSxmPWMuY2FtZWxDYXN" + 
"lKGIpLA0KaD1jLmNzc0hvb2tzW2ZdO2I9Yy5jc3NQcm9wc1tmXXx8ZjtpZihoJiYiZ2V0ImluIGg" + 
"mJihlPWguZ2V0KGEsdHJ1ZSxkKSkhPT1CKXJldHVybiBlO2Vsc2UgaWYoVylyZXR1cm4gVyhhLGI" + 
"sZil9LHN3YXA6ZnVuY3Rpb24oYSxiLGQpe3ZhciBlPXt9LGY7Zm9yKGYgaW4gYil7ZVtmXT1hLnN" + 
"0eWxlW2ZdO2Euc3R5bGVbZl09YltmXX1kLmNhbGwoYSk7Zm9yKGYgaW4gYilhLnN0eWxlW2ZdPWV" + 
"bZl19LGNhbWVsQ2FzZTpmdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKGhiLGxiKX19KTtjLmN" + 
"1ckNTUz1jLmNzcztjLmVhY2goWyJoZWlnaHQiLCJ3aWR0aCJdLGZ1bmN0aW9uKGEsYil7Yy5jc3N" + 
"Ib29rc1tiXT17Z2V0OmZ1bmN0aW9uKGQsZSxmKXt2YXIgaDtpZihlKXtpZihkLm9mZnNldFdpZHR" + 
"oIT09MCloPW9hKGQsYixmKTtlbHNlIGMuc3dhcChkLGtiLGZ1bmN0aW9uKCl7aD1vYShkLGIsZil" + 
"9KTtpZihoPD0wKXtoPVcoZCxiLGIpO2lmKGg9PT0iMHB4IiYmYWEpaD1hYShkLGIsYik7DQppZih" + 
"oIT1udWxsKXJldHVybiBoPT09IiJ8fGg9PT0iYXV0byI/IjBweCI6aH1pZihoPDB8fGg9PW51bGw" + 
"pe2g9ZC5zdHlsZVtiXTtyZXR1cm4gaD09PSIifHxoPT09ImF1dG8iPyIwcHgiOmh9cmV0dXJuIHR" + 
"5cGVvZiBoPT09InN0cmluZyI/aDpoKyJweCJ9fSxzZXQ6ZnVuY3Rpb24oZCxlKXtpZihGYS50ZXN" + 
"0KGUpKXtlPXBhcnNlRmxvYXQoZSk7aWYoZT49MClyZXR1cm4gZSsicHgifWVsc2UgcmV0dXJuIGV" + 
"9fX0pO2lmKCFjLnN1cHBvcnQub3BhY2l0eSljLmNzc0hvb2tzLm9wYWNpdHk9e2dldDpmdW5jdGl" + 
"vbihhLGIpe3JldHVybiBnYi50ZXN0KChiJiZhLmN1cnJlbnRTdHlsZT9hLmN1cnJlbnRTdHlsZS5" + 
"maWx0ZXI6YS5zdHlsZS5maWx0ZXIpfHwiIik/cGFyc2VGbG9hdChSZWdFeHAuJDEpLzEwMCsiIjp" + 
"iPyIxIjoiIn0sc2V0OmZ1bmN0aW9uKGEsYil7dmFyIGQ9YS5zdHlsZTtkLnpvb209MTt2YXIgZT1" + 
"jLmlzTmFOKGIpPyIiOiJhbHBoYShvcGFjaXR5PSIrYioxMDArIikiLGY9DQpkLmZpbHRlcnx8IiI" + 
"7ZC5maWx0ZXI9RWEudGVzdChmKT9mLnJlcGxhY2UoRWEsZSk6ZC5maWx0ZXIrIiAiK2V9fTtpZih" + 
"0LmRlZmF1bHRWaWV3JiZ0LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUpR2E9ZnVuY3Rpb24" + 
"oYSxiLGQpe3ZhciBlO2Q9ZC5yZXBsYWNlKGliLCItJDEiKS50b0xvd2VyQ2FzZSgpO2lmKCEoYj1" + 
"hLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcpKXJldHVybiBCO2lmKGI9Yi5nZXRDb21wdXRlZFN" + 
"0eWxlKGEsbnVsbCkpe2U9Yi5nZXRQcm9wZXJ0eVZhbHVlKGQpO2lmKGU9PT0iIiYmIWMuY29udGF" + 
"pbnMoYS5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxhKSllPWMuc3R5bGUoYSxkKX1yZXR" + 
"1cm4gZX07aWYodC5kb2N1bWVudEVsZW1lbnQuY3VycmVudFN0eWxlKWFhPWZ1bmN0aW9uKGEsYil" + 
"7dmFyIGQsZSxmPWEuY3VycmVudFN0eWxlJiZhLmN1cnJlbnRTdHlsZVtiXSxoPWEuc3R5bGU7aWY" + 
"oIUZhLnRlc3QoZikmJmpiLnRlc3QoZikpe2Q9aC5sZWZ0Ow0KZT1hLnJ1bnRpbWVTdHlsZS5sZWZ" + 
"0O2EucnVudGltZVN0eWxlLmxlZnQ9YS5jdXJyZW50U3R5bGUubGVmdDtoLmxlZnQ9Yj09PSJmb25" + 
"0U2l6ZSI/IjFlbSI6Znx8MDtmPWgucGl4ZWxMZWZ0KyJweCI7aC5sZWZ0PWQ7YS5ydW50aW1lU3R" + 
"5bGUubGVmdD1lfXJldHVybiBmPT09IiI/ImF1dG8iOmZ9O1c9R2F8fGFhO2lmKGMuZXhwciYmYy5" + 
"leHByLmZpbHRlcnMpe2MuZXhwci5maWx0ZXJzLmhpZGRlbj1mdW5jdGlvbihhKXt2YXIgYj1hLm9" + 
"mZnNldEhlaWdodDtyZXR1cm4gYS5vZmZzZXRXaWR0aD09PTAmJmI9PT0wfHwhYy5zdXBwb3J0LnJ" + 
"lbGlhYmxlSGlkZGVuT2Zmc2V0cyYmKGEuc3R5bGUuZGlzcGxheXx8Yy5jc3MoYSwiZGlzcGxheSI" + 
"pKT09PSJub25lIn07Yy5leHByLmZpbHRlcnMudmlzaWJsZT1mdW5jdGlvbihhKXtyZXR1cm4hYy5" + 
"leHByLmZpbHRlcnMuaGlkZGVuKGEpfX12YXIgbWI9Yy5ub3coKSxuYj0vPHNjcmlwdFxiW148XSo" + 
"oPzooPyE8XC9zY3JpcHQ+KTxbXjxdKikqPFwvc2NyaXB0Pi9naSwNCm9iPS9eKD86c2VsZWN0fHR" + 
"leHRhcmVhKS9pLHBiPS9eKD86Y29sb3J8ZGF0ZXxkYXRldGltZXxlbWFpbHxoaWRkZW58bW9udGh" + 
"8bnVtYmVyfHBhc3N3b3JkfHJhbmdlfHNlYXJjaHx0ZWx8dGV4dHx0aW1lfHVybHx3ZWVrKSQvaSx" + 
"xYj0vXig/OkdFVHxIRUFEKSQvLFJhPS9cW1xdJC8sVD0vXD1cPygmfCQpLyxqYT0vXD8vLHJiPS8" + 
"oWz8mXSlfPVteJl0qLyxzYj0vXihcdys6KT9cL1wvKFteXC8/I10rKS8sdGI9LyUyMC9nLHViPS8" + 
"jLiokLyxIYT1jLmZuLmxvYWQ7Yy5mbi5leHRlbmQoe2xvYWQ6ZnVuY3Rpb24oYSxiLGQpe2lmKHR" + 
"5cGVvZiBhIT09InN0cmluZyImJkhhKXJldHVybiBIYS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7ZWx" + 
"zZSBpZighdGhpcy5sZW5ndGgpcmV0dXJuIHRoaXM7dmFyIGU9YS5pbmRleE9mKCIgIik7aWYoZT4" + 
"9MCl7dmFyIGY9YS5zbGljZShlLGEubGVuZ3RoKTthPWEuc2xpY2UoMCxlKX1lPSJHRVQiO2lmKGI" + 
"paWYoYy5pc0Z1bmN0aW9uKGIpKXtkPWI7Yj1udWxsfWVsc2UgaWYodHlwZW9mIGI9PT0NCiJvYmp" + 
"lY3QiKXtiPWMucGFyYW0oYixjLmFqYXhTZXR0aW5ncy50cmFkaXRpb25hbCk7ZT0iUE9TVCJ9dmF" + 
"yIGg9dGhpcztjLmFqYXgoe3VybDphLHR5cGU6ZSxkYXRhVHlwZToiaHRtbCIsZGF0YTpiLGNvbXB" + 
"sZXRlOmZ1bmN0aW9uKGwsayl7aWYoaz09PSJzdWNjZXNzInx8az09PSJub3Rtb2RpZmllZCIpaC5" + 
"odG1sKGY/YygiPGRpdj4iKS5hcHBlbmQobC5yZXNwb25zZVRleHQucmVwbGFjZShuYiwiIikpLmZ" + 
"pbmQoZik6bC5yZXNwb25zZVRleHQpO2QmJmguZWFjaChkLFtsLnJlc3BvbnNlVGV4dCxrLGxdKX1" + 
"9KTtyZXR1cm4gdGhpc30sc2VyaWFsaXplOmZ1bmN0aW9uKCl7cmV0dXJuIGMucGFyYW0odGhpcy5" + 
"zZXJpYWxpemVBcnJheSgpKX0sc2VyaWFsaXplQXJyYXk6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5" + 
"tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbGVtZW50cz9jLm1ha2VBcnJheSh0aGlzLmVsZW1" + 
"lbnRzKTp0aGlzfSkuZmlsdGVyKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubmFtZSYmDQohdGhpcy5" + 
"kaXNhYmxlZCYmKHRoaXMuY2hlY2tlZHx8b2IudGVzdCh0aGlzLm5vZGVOYW1lKXx8cGIudGVzdCh" + 
"0aGlzLnR5cGUpKX0pLm1hcChmdW5jdGlvbihhLGIpe3ZhciBkPWModGhpcykudmFsKCk7cmV0dXJ" + 
"uIGQ9PW51bGw/bnVsbDpjLmlzQXJyYXkoZCk/Yy5tYXAoZCxmdW5jdGlvbihlKXtyZXR1cm57bmF" + 
"tZTpiLm5hbWUsdmFsdWU6ZX19KTp7bmFtZTpiLm5hbWUsdmFsdWU6ZH19KS5nZXQoKX19KTtjLmV" + 
"hY2goImFqYXhTdGFydCBhamF4U3RvcCBhamF4Q29tcGxldGUgYWpheEVycm9yIGFqYXhTdWNjZXN" + 
"zIGFqYXhTZW5kIi5zcGxpdCgiICIpLGZ1bmN0aW9uKGEsYil7Yy5mbltiXT1mdW5jdGlvbihkKXt" + 
"yZXR1cm4gdGhpcy5iaW5kKGIsZCl9fSk7Yy5leHRlbmQoe2dldDpmdW5jdGlvbihhLGIsZCxlKXt" + 
"pZihjLmlzRnVuY3Rpb24oYikpe2U9ZXx8ZDtkPWI7Yj1udWxsfXJldHVybiBjLmFqYXgoe3R5cGU" + 
"6IkdFVCIsdXJsOmEsZGF0YTpiLHN1Y2Nlc3M6ZCxkYXRhVHlwZTplfSl9LA0KZ2V0U2NyaXB0OmZ" + 
"1bmN0aW9uKGEsYil7cmV0dXJuIGMuZ2V0KGEsbnVsbCxiLCJzY3JpcHQiKX0sZ2V0SlNPTjpmdW5" + 
"jdGlvbihhLGIsZCl7cmV0dXJuIGMuZ2V0KGEsYixkLCJqc29uIil9LHBvc3Q6ZnVuY3Rpb24oYSx" + 
"iLGQsZSl7aWYoYy5pc0Z1bmN0aW9uKGIpKXtlPWV8fGQ7ZD1iO2I9e319cmV0dXJuIGMuYWpheCh" + 
"7dHlwZToiUE9TVCIsdXJsOmEsZGF0YTpiLHN1Y2Nlc3M6ZCxkYXRhVHlwZTplfSl9LGFqYXhTZXR" + 
"1cDpmdW5jdGlvbihhKXtjLmV4dGVuZChjLmFqYXhTZXR0aW5ncyxhKX0sYWpheFNldHRpbmdzOnt" + 
"1cmw6bG9jYXRpb24uaHJlZixnbG9iYWw6dHJ1ZSx0eXBlOiJHRVQiLGNvbnRlbnRUeXBlOiJhcHB" + 
"saWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQiLHByb2Nlc3NEYXRhOnRydWUsYXN5bmM6dHJ" + 
"1ZSx4aHI6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEUuWE1MSHR0cFJlcXVlc3R9LGFjY2VwdHM6e3h" + 
"tbDoiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbCIsaHRtbDoidGV4dC9odG1sIiwNCnNjcmlwdDo" + 
"idGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0Iixqc29uOiJhcHBsaWNhdGl" + 
"vbi9qc29uLCB0ZXh0L2phdmFzY3JpcHQiLHRleHQ6InRleHQvcGxhaW4iLF9kZWZhdWx0OiIqLyo" + 
"ifX0sYWpheDpmdW5jdGlvbihhKXt2YXIgYj1jLmV4dGVuZCh0cnVlLHt9LGMuYWpheFNldHRpbmd" + 
"zLGEpLGQsZSxmLGg9Yi50eXBlLnRvVXBwZXJDYXNlKCksbD1xYi50ZXN0KGgpO2IudXJsPWIudXJ" + 
"sLnJlcGxhY2UodWIsIiIpO2IuY29udGV4dD1hJiZhLmNvbnRleHQhPW51bGw/YS5jb250ZXh0OmI" + 
"7aWYoYi5kYXRhJiZiLnByb2Nlc3NEYXRhJiZ0eXBlb2YgYi5kYXRhIT09InN0cmluZyIpYi5kYXR" + 
"hPWMucGFyYW0oYi5kYXRhLGIudHJhZGl0aW9uYWwpO2lmKGIuZGF0YVR5cGU9PT0ianNvbnAiKXt" + 
"pZihoPT09IkdFVCIpVC50ZXN0KGIudXJsKXx8KGIudXJsKz0oamEudGVzdChiLnVybCk/IiYiOiI" + 
"/IikrKGIuanNvbnB8fCJjYWxsYmFjayIpKyI9PyIpO2Vsc2UgaWYoIWIuZGF0YXx8DQohVC50ZXN" + 
"0KGIuZGF0YSkpYi5kYXRhPShiLmRhdGE/Yi5kYXRhKyImIjoiIikrKGIuanNvbnB8fCJjYWxsYmF" + 
"jayIpKyI9PyI7Yi5kYXRhVHlwZT0ianNvbiJ9aWYoYi5kYXRhVHlwZT09PSJqc29uIiYmKGIuZGF" + 
"0YSYmVC50ZXN0KGIuZGF0YSl8fFQudGVzdChiLnVybCkpKXtkPWIuanNvbnBDYWxsYmFja3x8Imp" + 
"zb25wIittYisrO2lmKGIuZGF0YSliLmRhdGE9KGIuZGF0YSsiIikucmVwbGFjZShULCI9IitkKyI" + 
"kMSIpO2IudXJsPWIudXJsLnJlcGxhY2UoVCwiPSIrZCsiJDEiKTtiLmRhdGFUeXBlPSJzY3JpcHQ" + 
"iO3ZhciBrPUVbZF07RVtkXT1mdW5jdGlvbihtKXtpZihjLmlzRnVuY3Rpb24oaykpayhtKTtlbHN" + 
"le0VbZF09Qjt0cnl7ZGVsZXRlIEVbZF19Y2F0Y2gocCl7fX1mPW07Yy5oYW5kbGVTdWNjZXNzKGI" + 
"sdyxlLGYpO2MuaGFuZGxlQ29tcGxldGUoYix3LGUsZik7ciYmci5yZW1vdmVDaGlsZChBKX19aWY" + 
"oYi5kYXRhVHlwZT09PSJzY3JpcHQiJiZiLmNhY2hlPT09bnVsbCliLmNhY2hlPQ0KZmFsc2U7aWY" + 
"oYi5jYWNoZT09PWZhbHNlJiZsKXt2YXIgbz1jLm5vdygpLHg9Yi51cmwucmVwbGFjZShyYiwiJDF" + 
"fPSIrbyk7Yi51cmw9eCsoeD09PWIudXJsPyhqYS50ZXN0KGIudXJsKT8iJiI6Ij8iKSsiXz0iK28" + 
"6IiIpfWlmKGIuZGF0YSYmbCliLnVybCs9KGphLnRlc3QoYi51cmwpPyImIjoiPyIpK2IuZGF0YTt" + 
"iLmdsb2JhbCYmYy5hY3RpdmUrKz09PTAmJmMuZXZlbnQudHJpZ2dlcigiYWpheFN0YXJ0Iik7bz0" + 
"obz1zYi5leGVjKGIudXJsKSkmJihvWzFdJiZvWzFdLnRvTG93ZXJDYXNlKCkhPT1sb2NhdGlvbi5" + 
"wcm90b2NvbHx8b1syXS50b0xvd2VyQ2FzZSgpIT09bG9jYXRpb24uaG9zdCk7aWYoYi5kYXRhVHl" + 
"wZT09PSJzY3JpcHQiJiZoPT09IkdFVCImJm8pe3ZhciByPXQuZ2V0RWxlbWVudHNCeVRhZ05hbWU" + 
"oImhlYWQiKVswXXx8dC5kb2N1bWVudEVsZW1lbnQsQT10LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCI" + 
"pO2lmKGIuc2NyaXB0Q2hhcnNldClBLmNoYXJzZXQ9Yi5zY3JpcHRDaGFyc2V0Ow0KQS5zcmM9Yi5" + 
"1cmw7aWYoIWQpe3ZhciBDPWZhbHNlO0Eub25sb2FkPUEub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN" + 
"0aW9uKCl7aWYoIUMmJighdGhpcy5yZWFkeVN0YXRlfHx0aGlzLnJlYWR5U3RhdGU9PT0ibG9hZGV" + 
"kInx8dGhpcy5yZWFkeVN0YXRlPT09ImNvbXBsZXRlIikpe0M9dHJ1ZTtjLmhhbmRsZVN1Y2Nlc3M" + 
"oYix3LGUsZik7Yy5oYW5kbGVDb21wbGV0ZShiLHcsZSxmKTtBLm9ubG9hZD1BLm9ucmVhZHlzdGF" + 
"0ZWNoYW5nZT1udWxsO3ImJkEucGFyZW50Tm9kZSYmci5yZW1vdmVDaGlsZChBKX19fXIuaW5zZXJ" + 
"0QmVmb3JlKEEsci5maXJzdENoaWxkKTtyZXR1cm4gQn12YXIgSj1mYWxzZSx3PWIueGhyKCk7aWY" + 
"odyl7Yi51c2VybmFtZT93Lm9wZW4oaCxiLnVybCxiLmFzeW5jLGIudXNlcm5hbWUsYi5wYXNzd29" + 
"yZCk6dy5vcGVuKGgsYi51cmwsYi5hc3luYyk7dHJ5e2lmKGIuZGF0YSE9bnVsbCYmIWx8fGEmJmE" + 
"uY29udGVudFR5cGUpdy5zZXRSZXF1ZXN0SGVhZGVyKCJDb250ZW50LVR5cGUiLA0KYi5jb250ZW5" + 
"0VHlwZSk7aWYoYi5pZk1vZGlmaWVkKXtjLmxhc3RNb2RpZmllZFtiLnVybF0mJncuc2V0UmVxdWV" + 
"zdEhlYWRlcigiSWYtTW9kaWZpZWQtU2luY2UiLGMubGFzdE1vZGlmaWVkW2IudXJsXSk7Yy5ldGF" + 
"nW2IudXJsXSYmdy5zZXRSZXF1ZXN0SGVhZGVyKCJJZi1Ob25lLU1hdGNoIixjLmV0YWdbYi51cmx" + 
"dKX1vfHx3LnNldFJlcXVlc3RIZWFkZXIoIlgtUmVxdWVzdGVkLVdpdGgiLCJYTUxIdHRwUmVxdWV" + 
"zdCIpO3cuc2V0UmVxdWVzdEhlYWRlcigiQWNjZXB0IixiLmRhdGFUeXBlJiZiLmFjY2VwdHNbYi5" + 
"kYXRhVHlwZV0/Yi5hY2NlcHRzW2IuZGF0YVR5cGVdKyIsICovKjsgcT0wLjAxIjpiLmFjY2VwdHM" + 
"uX2RlZmF1bHQpfWNhdGNoKEkpe31pZihiLmJlZm9yZVNlbmQmJmIuYmVmb3JlU2VuZC5jYWxsKGI" + 
"uY29udGV4dCx3LGIpPT09ZmFsc2Upe2IuZ2xvYmFsJiZjLmFjdGl2ZS0tPT09MSYmYy5ldmVudC5" + 
"0cmlnZ2VyKCJhamF4U3RvcCIpO3cuYWJvcnQoKTtyZXR1cm4gZmFsc2V9Yi5nbG9iYWwmJg0KYy5" + 
"0cmlnZ2VyR2xvYmFsKGIsImFqYXhTZW5kIixbdyxiXSk7dmFyIEw9dy5vbnJlYWR5c3RhdGVjaGF" + 
"uZ2U9ZnVuY3Rpb24obSl7aWYoIXd8fHcucmVhZHlTdGF0ZT09PTB8fG09PT0iYWJvcnQiKXtKfHx" + 
"jLmhhbmRsZUNvbXBsZXRlKGIsdyxlLGYpO0o9dHJ1ZTtpZih3KXcub25yZWFkeXN0YXRlY2hhbmd" + 
"lPWMubm9vcH1lbHNlIGlmKCFKJiZ3JiYody5yZWFkeVN0YXRlPT09NHx8bT09PSJ0aW1lb3V0Iik" + 
"pe0o9dHJ1ZTt3Lm9ucmVhZHlzdGF0ZWNoYW5nZT1jLm5vb3A7ZT1tPT09InRpbWVvdXQiPyJ0aW1" + 
"lb3V0IjohYy5odHRwU3VjY2Vzcyh3KT8iZXJyb3IiOmIuaWZNb2RpZmllZCYmYy5odHRwTm90TW9" + 
"kaWZpZWQodyxiLnVybCk/Im5vdG1vZGlmaWVkIjoic3VjY2VzcyI7dmFyIHA7aWYoZT09PSJzdWN" + 
"jZXNzIil0cnl7Zj1jLmh0dHBEYXRhKHcsYi5kYXRhVHlwZSxiKX1jYXRjaChxKXtlPSJwYXJzZXJ" + 
"lcnJvciI7cD1xfWlmKGU9PT0ic3VjY2VzcyJ8fGU9PT0ibm90bW9kaWZpZWQiKWR8fA0KYy5oYW5" + 
"kbGVTdWNjZXNzKGIsdyxlLGYpO2Vsc2UgYy5oYW5kbGVFcnJvcihiLHcsZSxwKTtkfHxjLmhhbmR" + 
"sZUNvbXBsZXRlKGIsdyxlLGYpO209PT0idGltZW91dCImJncuYWJvcnQoKTtpZihiLmFzeW5jKXc" + 
"9bnVsbH19O3RyeXt2YXIgZz13LmFib3J0O3cuYWJvcnQ9ZnVuY3Rpb24oKXt3JiZGdW5jdGlvbi5" + 
"wcm90b3R5cGUuY2FsbC5jYWxsKGcsdyk7TCgiYWJvcnQiKX19Y2F0Y2goaSl7fWIuYXN5bmMmJmI" + 
"udGltZW91dD4wJiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dyYmIUomJkwoInRpbWVvdXQiKX0sYi5" + 
"0aW1lb3V0KTt0cnl7dy5zZW5kKGx8fGIuZGF0YT09bnVsbD9udWxsOmIuZGF0YSl9Y2F0Y2gobil" + 
"7Yy5oYW5kbGVFcnJvcihiLHcsbnVsbCxuKTtjLmhhbmRsZUNvbXBsZXRlKGIsdyxlLGYpfWIuYXN" + 
"5bmN8fEwoKTtyZXR1cm4gd319LHBhcmFtOmZ1bmN0aW9uKGEsYil7dmFyIGQ9W10sZT1mdW5jdGl" + 
"vbihoLGwpe2w9Yy5pc0Z1bmN0aW9uKGwpP2woKTpsO2RbZC5sZW5ndGhdPQ0KZW5jb2RlVVJJQ29" + 
"tcG9uZW50KGgpKyI9IitlbmNvZGVVUklDb21wb25lbnQobCl9O2lmKGI9PT1CKWI9Yy5hamF4U2V" + 
"0dGluZ3MudHJhZGl0aW9uYWw7aWYoYy5pc0FycmF5KGEpfHxhLmpxdWVyeSljLmVhY2goYSxmdW5" + 
"jdGlvbigpe2UodGhpcy5uYW1lLHRoaXMudmFsdWUpfSk7ZWxzZSBmb3IodmFyIGYgaW4gYSlkYSh" + 
"mLGFbZl0sYixlKTtyZXR1cm4gZC5qb2luKCImIikucmVwbGFjZSh0YiwiKyIpfX0pO2MuZXh0ZW5" + 
"kKHthY3RpdmU6MCxsYXN0TW9kaWZpZWQ6e30sZXRhZzp7fSxoYW5kbGVFcnJvcjpmdW5jdGlvbih" + 
"hLGIsZCxlKXthLmVycm9yJiZhLmVycm9yLmNhbGwoYS5jb250ZXh0LGIsZCxlKTthLmdsb2JhbCY" + 
"mYy50cmlnZ2VyR2xvYmFsKGEsImFqYXhFcnJvciIsW2IsYSxlXSl9LGhhbmRsZVN1Y2Nlc3M6ZnV" + 
"uY3Rpb24oYSxiLGQsZSl7YS5zdWNjZXNzJiZhLnN1Y2Nlc3MuY2FsbChhLmNvbnRleHQsZSxkLGI" + 
"pO2EuZ2xvYmFsJiZjLnRyaWdnZXJHbG9iYWwoYSwiYWpheFN1Y2Nlc3MiLA0KW2IsYV0pfSxoYW5" + 
"kbGVDb21wbGV0ZTpmdW5jdGlvbihhLGIsZCl7YS5jb21wbGV0ZSYmYS5jb21wbGV0ZS5jYWxsKGE" + 
"uY29udGV4dCxiLGQpO2EuZ2xvYmFsJiZjLnRyaWdnZXJHbG9iYWwoYSwiYWpheENvbXBsZXRlIix" + 
"bYixhXSk7YS5nbG9iYWwmJmMuYWN0aXZlLS09PT0xJiZjLmV2ZW50LnRyaWdnZXIoImFqYXhTdG9" + 
"wIil9LHRyaWdnZXJHbG9iYWw6ZnVuY3Rpb24oYSxiLGQpeyhhLmNvbnRleHQmJmEuY29udGV4dC5" + 
"1cmw9PW51bGw/YyhhLmNvbnRleHQpOmMuZXZlbnQpLnRyaWdnZXIoYixkKX0saHR0cFN1Y2Nlc3M" + 
"6ZnVuY3Rpb24oYSl7dHJ5e3JldHVybiFhLnN0YXR1cyYmbG9jYXRpb24ucHJvdG9jb2w9PT0iZml" + 
"sZToifHxhLnN0YXR1cz49MjAwJiZhLnN0YXR1czwzMDB8fGEuc3RhdHVzPT09MzA0fHxhLnN0YXR" + 
"1cz09PTEyMjN9Y2F0Y2goYil7fXJldHVybiBmYWxzZX0saHR0cE5vdE1vZGlmaWVkOmZ1bmN0aW9" + 
"uKGEsYil7dmFyIGQ9YS5nZXRSZXNwb25zZUhlYWRlcigiTGFzdC1Nb2RpZmllZCIpLA0KZT1hLmd" + 
"ldFJlc3BvbnNlSGVhZGVyKCJFdGFnIik7aWYoZCljLmxhc3RNb2RpZmllZFtiXT1kO2lmKGUpYy5" + 
"ldGFnW2JdPWU7cmV0dXJuIGEuc3RhdHVzPT09MzA0fSxodHRwRGF0YTpmdW5jdGlvbihhLGIsZCl" + 
"7dmFyIGU9YS5nZXRSZXNwb25zZUhlYWRlcigiY29udGVudC10eXBlIil8fCIiLGY9Yj09PSJ4bWw" + 
"ifHwhYiYmZS5pbmRleE9mKCJ4bWwiKT49MDthPWY/YS5yZXNwb25zZVhNTDphLnJlc3BvbnNlVGV" + 
"4dDtmJiZhLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZT09PSJwYXJzZXJlcnJvciImJmMuZXJyb3I" + 
"oInBhcnNlcmVycm9yIik7aWYoZCYmZC5kYXRhRmlsdGVyKWE9ZC5kYXRhRmlsdGVyKGEsYik7aWY" + 
"odHlwZW9mIGE9PT0ic3RyaW5nIilpZihiPT09Impzb24ifHwhYiYmZS5pbmRleE9mKCJqc29uIik" + 
"+PTApYT1jLnBhcnNlSlNPTihhKTtlbHNlIGlmKGI9PT0ic2NyaXB0Inx8IWImJmUuaW5kZXhPZig" + 
"iamF2YXNjcmlwdCIpPj0wKWMuZ2xvYmFsRXZhbChhKTtyZXR1cm4gYX19KTsNCmlmKEUuQWN0aXZ" + 
"lWE9iamVjdCljLmFqYXhTZXR0aW5ncy54aHI9ZnVuY3Rpb24oKXtpZihFLmxvY2F0aW9uLnByb3R" + 
"vY29sIT09ImZpbGU6Iil0cnl7cmV0dXJuIG5ldyBFLlhNTEh0dHBSZXF1ZXN0fWNhdGNoKGEpe31" + 
"0cnl7cmV0dXJuIG5ldyBFLkFjdGl2ZVhPYmplY3QoIk1pY3Jvc29mdC5YTUxIVFRQIil9Y2F0Y2g" + 
"oYil7fX07Yy5zdXBwb3J0LmFqYXg9ISFjLmFqYXhTZXR0aW5ncy54aHIoKTt2YXIgZWE9e30sdmI" + 
"9L14oPzp0b2dnbGV8c2hvd3xoaWRlKSQvLHdiPS9eKFsrXC1dPSk/KFtcZCsuXC1dKykoLiopJC8" + 
"sYmEscGE9W1siaGVpZ2h0IiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwicGFkZGluZ1RvcCI" + 
"sInBhZGRpbmdCb3R0b20iXSxbIndpZHRoIiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwicGF" + 
"kZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiXSxbIm9wYWNpdHkiXV07Yy5mbi5leHRlbmQoe3Nob3c" + 
"6ZnVuY3Rpb24oYSxiLGQpe2lmKGF8fGE9PT0wKXJldHVybiB0aGlzLmFuaW1hdGUoUygic2hvdyI" + 
"sDQozKSxhLGIsZCk7ZWxzZXtkPTA7Zm9yKHZhciBlPXRoaXMubGVuZ3RoO2Q8ZTtkKyspe2E9dGh" + 
"pc1tkXTtiPWEuc3R5bGUuZGlzcGxheTtpZighYy5kYXRhKGEsIm9sZGRpc3BsYXkiKSYmYj09PSJ" + 
"ub25lIiliPWEuc3R5bGUuZGlzcGxheT0iIjtiPT09IiImJmMuY3NzKGEsImRpc3BsYXkiKT09PSJ" + 
"ub25lIiYmYy5kYXRhKGEsIm9sZGRpc3BsYXkiLHFhKGEubm9kZU5hbWUpKX1mb3IoZD0wO2Q8ZTt" + 
"kKyspe2E9dGhpc1tkXTtiPWEuc3R5bGUuZGlzcGxheTtpZihiPT09IiJ8fGI9PT0ibm9uZSIpYS5" + 
"zdHlsZS5kaXNwbGF5PWMuZGF0YShhLCJvbGRkaXNwbGF5Iil8fCIifXJldHVybiB0aGlzfX0saGl" + 
"kZTpmdW5jdGlvbihhLGIsZCl7aWYoYXx8YT09PTApcmV0dXJuIHRoaXMuYW5pbWF0ZShTKCJoaWR" + 
"lIiwzKSxhLGIsZCk7ZWxzZXthPTA7Zm9yKGI9dGhpcy5sZW5ndGg7YTxiO2ErKyl7ZD1jLmNzcyh" + 
"0aGlzW2FdLCJkaXNwbGF5Iik7ZCE9PSJub25lIiYmYy5kYXRhKHRoaXNbYV0sIm9sZGRpc3BsYXk" + 
"iLA0KZCl9Zm9yKGE9MDthPGI7YSsrKXRoaXNbYV0uc3R5bGUuZGlzcGxheT0ibm9uZSI7cmV0dXJ" + 
"uIHRoaXN9fSxfdG9nZ2xlOmMuZm4udG9nZ2xlLHRvZ2dsZTpmdW5jdGlvbihhLGIsZCl7dmFyIGU" + 
"9dHlwZW9mIGE9PT0iYm9vbGVhbiI7aWYoYy5pc0Z1bmN0aW9uKGEpJiZjLmlzRnVuY3Rpb24oYik" + 
"pdGhpcy5fdG9nZ2xlLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtlbHNlIGE9PW51bGx8fGU/dGhpcy5" + 
"lYWNoKGZ1bmN0aW9uKCl7dmFyIGY9ZT9hOmModGhpcykuaXMoIjpoaWRkZW4iKTtjKHRoaXMpW2Y" + 
"/InNob3ciOiJoaWRlIl0oKX0pOnRoaXMuYW5pbWF0ZShTKCJ0b2dnbGUiLDMpLGEsYixkKTtyZXR" + 
"1cm4gdGhpc30sZmFkZVRvOmZ1bmN0aW9uKGEsYixkLGUpe3JldHVybiB0aGlzLmZpbHRlcigiOmh" + 
"pZGRlbiIpLmNzcygib3BhY2l0eSIsMCkuc2hvdygpLmVuZCgpLmFuaW1hdGUoe29wYWNpdHk6Yn0" + 
"sYSxkLGUpfSxhbmltYXRlOmZ1bmN0aW9uKGEsYixkLGUpe3ZhciBmPWMuc3BlZWQoYiwNCmQsZSk" + 
"7aWYoYy5pc0VtcHR5T2JqZWN0KGEpKXJldHVybiB0aGlzLmVhY2goZi5jb21wbGV0ZSk7cmV0dXJ" + 
"uIHRoaXNbZi5xdWV1ZT09PWZhbHNlPyJlYWNoIjoicXVldWUiXShmdW5jdGlvbigpe3ZhciBoPWM" + 
"uZXh0ZW5kKHt9LGYpLGwsaz10aGlzLm5vZGVUeXBlPT09MSxvPWsmJmModGhpcykuaXMoIjpoaWR" + 
"kZW4iKSx4PXRoaXM7Zm9yKGwgaW4gYSl7dmFyIHI9Yy5jYW1lbENhc2UobCk7aWYobCE9PXIpe2F" + 
"bcl09YVtsXTtkZWxldGUgYVtsXTtsPXJ9aWYoYVtsXT09PSJoaWRlIiYmb3x8YVtsXT09PSJzaG9" + 
"3IiYmIW8pcmV0dXJuIGguY29tcGxldGUuY2FsbCh0aGlzKTtpZihrJiYobD09PSJoZWlnaHQifHx" + 
"sPT09IndpZHRoIikpe2gub3ZlcmZsb3c9W3RoaXMuc3R5bGUub3ZlcmZsb3csdGhpcy5zdHlsZS5" + 
"vdmVyZmxvd1gsdGhpcy5zdHlsZS5vdmVyZmxvd1ldO2lmKGMuY3NzKHRoaXMsImRpc3BsYXkiKT0" + 
"9PSJpbmxpbmUiJiZjLmNzcyh0aGlzLCJmbG9hdCIpPT09Im5vbmUiKWlmKGMuc3VwcG9ydC5pbmx" + 
"pbmVCbG9ja05lZWRzTGF5b3V0KWlmKHFhKHRoaXMubm9kZU5hbWUpPT09DQoiaW5saW5lIil0aGl" + 
"zLnN0eWxlLmRpc3BsYXk9ImlubGluZS1ibG9jayI7ZWxzZXt0aGlzLnN0eWxlLmRpc3BsYXk9Iml" + 
"ubGluZSI7dGhpcy5zdHlsZS56b29tPTF9ZWxzZSB0aGlzLnN0eWxlLmRpc3BsYXk9ImlubGluZS1" + 
"ibG9jayJ9aWYoYy5pc0FycmF5KGFbbF0pKXsoaC5zcGVjaWFsRWFzaW5nPWguc3BlY2lhbEVhc2l" + 
"uZ3x8e30pW2xdPWFbbF1bMV07YVtsXT1hW2xdWzBdfX1pZihoLm92ZXJmbG93IT1udWxsKXRoaXM" + 
"uc3R5bGUub3ZlcmZsb3c9ImhpZGRlbiI7aC5jdXJBbmltPWMuZXh0ZW5kKHt9LGEpO2MuZWFjaCh" + 
"hLGZ1bmN0aW9uKEEsQyl7dmFyIEo9bmV3IGMuZngoeCxoLEEpO2lmKHZiLnRlc3QoQykpSltDPT0" + 
"9InRvZ2dsZSI/bz8ic2hvdyI6ImhpZGUiOkNdKGEpO2Vsc2V7dmFyIHc9d2IuZXhlYyhDKSxJPUo" + 
"uY3VyKCl8fDA7aWYodyl7dmFyIEw9cGFyc2VGbG9hdCh3WzJdKSxnPXdbM118fCJweCI7aWYoZyE" + 
"9PSJweCIpe2Muc3R5bGUoeCxBLChMfHwxKStnKTtJPShMfHwNCjEpL0ouY3VyKCkqSTtjLnN0eWx" + 
"lKHgsQSxJK2cpfWlmKHdbMV0pTD0od1sxXT09PSItPSI/LTE6MSkqTCtJO0ouY3VzdG9tKEksTCx" + 
"nKX1lbHNlIEouY3VzdG9tKEksQywiIil9fSk7cmV0dXJuIHRydWV9KX0sc3RvcDpmdW5jdGlvbih" + 
"hLGIpe3ZhciBkPWMudGltZXJzO2EmJnRoaXMucXVldWUoW10pO3RoaXMuZWFjaChmdW5jdGlvbig" + 
"pe2Zvcih2YXIgZT1kLmxlbmd0aC0xO2U+PTA7ZS0tKWlmKGRbZV0uZWxlbT09PXRoaXMpe2ImJmR" + 
"bZV0odHJ1ZSk7ZC5zcGxpY2UoZSwxKX19KTtifHx0aGlzLmRlcXVldWUoKTtyZXR1cm4gdGhpc31" + 
"9KTtjLmVhY2goe3NsaWRlRG93bjpTKCJzaG93IiwxKSxzbGlkZVVwOlMoImhpZGUiLDEpLHNsaWR" + 
"lVG9nZ2xlOlMoInRvZ2dsZSIsMSksZmFkZUluOntvcGFjaXR5OiJzaG93In0sZmFkZU91dDp7b3B" + 
"hY2l0eToiaGlkZSJ9LGZhZGVUb2dnbGU6e29wYWNpdHk6InRvZ2dsZSJ9fSxmdW5jdGlvbihhLGI" + 
"pe2MuZm5bYV09ZnVuY3Rpb24oZCxlLGYpe3JldHVybiB0aGlzLmFuaW1hdGUoYiwNCmQsZSxmKX1" + 
"9KTtjLmV4dGVuZCh7c3BlZWQ6ZnVuY3Rpb24oYSxiLGQpe3ZhciBlPWEmJnR5cGVvZiBhPT09Im9" + 
"iamVjdCI/Yy5leHRlbmQoe30sYSk6e2NvbXBsZXRlOmR8fCFkJiZifHxjLmlzRnVuY3Rpb24oYSk" + 
"mJmEsZHVyYXRpb246YSxlYXNpbmc6ZCYmYnx8YiYmIWMuaXNGdW5jdGlvbihiKSYmYn07ZS5kdXJ" + 
"hdGlvbj1jLmZ4Lm9mZj8wOnR5cGVvZiBlLmR1cmF0aW9uPT09Im51bWJlciI/ZS5kdXJhdGlvbjp" + 
"lLmR1cmF0aW9uIGluIGMuZnguc3BlZWRzP2MuZnguc3BlZWRzW2UuZHVyYXRpb25dOmMuZnguc3B" + 
"lZWRzLl9kZWZhdWx0O2Uub2xkPWUuY29tcGxldGU7ZS5jb21wbGV0ZT1mdW5jdGlvbigpe2UucXV" + 
"ldWUhPT1mYWxzZSYmYyh0aGlzKS5kZXF1ZXVlKCk7Yy5pc0Z1bmN0aW9uKGUub2xkKSYmZS5vbGQ" + 
"uY2FsbCh0aGlzKX07cmV0dXJuIGV9LGVhc2luZzp7bGluZWFyOmZ1bmN0aW9uKGEsYixkLGUpe3J" + 
"ldHVybiBkK2UqYX0sc3dpbmc6ZnVuY3Rpb24oYSxiLGQsZSl7cmV0dXJuKC1NYXRoLmNvcyhhKg0" + 
"KTWF0aC5QSSkvMiswLjUpKmUrZH19LHRpbWVyczpbXSxmeDpmdW5jdGlvbihhLGIsZCl7dGhpcy5" + 
"vcHRpb25zPWI7dGhpcy5lbGVtPWE7dGhpcy5wcm9wPWQ7aWYoIWIub3JpZyliLm9yaWc9e319fSk" + 
"7Yy5meC5wcm90b3R5cGU9e3VwZGF0ZTpmdW5jdGlvbigpe3RoaXMub3B0aW9ucy5zdGVwJiZ0aGl" + 
"zLm9wdGlvbnMuc3RlcC5jYWxsKHRoaXMuZWxlbSx0aGlzLm5vdyx0aGlzKTsoYy5meC5zdGVwW3R" + 
"oaXMucHJvcF18fGMuZnguc3RlcC5fZGVmYXVsdCkodGhpcyl9LGN1cjpmdW5jdGlvbigpe2lmKHR" + 
"oaXMuZWxlbVt0aGlzLnByb3BdIT1udWxsJiYoIXRoaXMuZWxlbS5zdHlsZXx8dGhpcy5lbGVtLnN" + 
"0eWxlW3RoaXMucHJvcF09PW51bGwpKXJldHVybiB0aGlzLmVsZW1bdGhpcy5wcm9wXTt2YXIgYT1" + 
"wYXJzZUZsb2F0KGMuY3NzKHRoaXMuZWxlbSx0aGlzLnByb3ApKTtyZXR1cm4gYSYmYT4tMUU0P2E" + 
"6MH0sY3VzdG9tOmZ1bmN0aW9uKGEsYixkKXtmdW5jdGlvbiBlKGwpe3JldHVybiBmLnN0ZXAobCl" + 
"9DQp2YXIgZj10aGlzLGg9Yy5meDt0aGlzLnN0YXJ0VGltZT1jLm5vdygpO3RoaXMuc3RhcnQ9YTt" + 
"0aGlzLmVuZD1iO3RoaXMudW5pdD1kfHx0aGlzLnVuaXR8fCJweCI7dGhpcy5ub3c9dGhpcy5zdGF" + 
"ydDt0aGlzLnBvcz10aGlzLnN0YXRlPTA7ZS5lbGVtPXRoaXMuZWxlbTtpZihlKCkmJmMudGltZXJ" + 
"zLnB1c2goZSkmJiFiYSliYT1zZXRJbnRlcnZhbChoLnRpY2ssaC5pbnRlcnZhbCl9LHNob3c6ZnV" + 
"uY3Rpb24oKXt0aGlzLm9wdGlvbnMub3JpZ1t0aGlzLnByb3BdPWMuc3R5bGUodGhpcy5lbGVtLHR" + 
"oaXMucHJvcCk7dGhpcy5vcHRpb25zLnNob3c9dHJ1ZTt0aGlzLmN1c3RvbSh0aGlzLnByb3A9PT0" + 
"id2lkdGgifHx0aGlzLnByb3A9PT0iaGVpZ2h0Ij8xOjAsdGhpcy5jdXIoKSk7Yyh0aGlzLmVsZW0" + 
"pLnNob3coKX0saGlkZTpmdW5jdGlvbigpe3RoaXMub3B0aW9ucy5vcmlnW3RoaXMucHJvcF09Yy5" + 
"zdHlsZSh0aGlzLmVsZW0sdGhpcy5wcm9wKTt0aGlzLm9wdGlvbnMuaGlkZT10cnVlOw0KdGhpcy5" + 
"jdXN0b20odGhpcy5jdXIoKSwwKX0sc3RlcDpmdW5jdGlvbihhKXt2YXIgYj1jLm5vdygpLGQ9dHJ" + 
"1ZTtpZihhfHxiPj10aGlzLm9wdGlvbnMuZHVyYXRpb24rdGhpcy5zdGFydFRpbWUpe3RoaXMubm9" + 
"3PXRoaXMuZW5kO3RoaXMucG9zPXRoaXMuc3RhdGU9MTt0aGlzLnVwZGF0ZSgpO3RoaXMub3B0aW9" + 
"ucy5jdXJBbmltW3RoaXMucHJvcF09dHJ1ZTtmb3IodmFyIGUgaW4gdGhpcy5vcHRpb25zLmN1ckF" + 
"uaW0paWYodGhpcy5vcHRpb25zLmN1ckFuaW1bZV0hPT10cnVlKWQ9ZmFsc2U7aWYoZCl7aWYodGh" + 
"pcy5vcHRpb25zLm92ZXJmbG93IT1udWxsJiYhYy5zdXBwb3J0LnNocmlua1dyYXBCbG9ja3Mpe3Z" + 
"hciBmPXRoaXMuZWxlbSxoPXRoaXMub3B0aW9ucztjLmVhY2goWyIiLCJYIiwiWSJdLGZ1bmN0aW9" + 
"uKGssbyl7Zi5zdHlsZVsib3ZlcmZsb3ciK29dPWgub3ZlcmZsb3dba119KX10aGlzLm9wdGlvbnM" + 
"uaGlkZSYmYyh0aGlzLmVsZW0pLmhpZGUoKTtpZih0aGlzLm9wdGlvbnMuaGlkZXx8DQp0aGlzLm9" + 
"wdGlvbnMuc2hvdylmb3IodmFyIGwgaW4gdGhpcy5vcHRpb25zLmN1ckFuaW0pYy5zdHlsZSh0aGl" + 
"zLmVsZW0sbCx0aGlzLm9wdGlvbnMub3JpZ1tsXSk7dGhpcy5vcHRpb25zLmNvbXBsZXRlLmNhbGw" + 
"odGhpcy5lbGVtKX1yZXR1cm4gZmFsc2V9ZWxzZXthPWItdGhpcy5zdGFydFRpbWU7dGhpcy5zdGF" + 
"0ZT1hL3RoaXMub3B0aW9ucy5kdXJhdGlvbjtiPXRoaXMub3B0aW9ucy5lYXNpbmd8fChjLmVhc2l" + 
"uZy5zd2luZz8ic3dpbmciOiJsaW5lYXIiKTt0aGlzLnBvcz1jLmVhc2luZ1t0aGlzLm9wdGlvbnM" + 
"uc3BlY2lhbEVhc2luZyYmdGhpcy5vcHRpb25zLnNwZWNpYWxFYXNpbmdbdGhpcy5wcm9wXXx8Yl0" + 
"odGhpcy5zdGF0ZSxhLDAsMSx0aGlzLm9wdGlvbnMuZHVyYXRpb24pO3RoaXMubm93PXRoaXMuc3R" + 
"hcnQrKHRoaXMuZW5kLXRoaXMuc3RhcnQpKnRoaXMucG9zO3RoaXMudXBkYXRlKCl9cmV0dXJuIHR" + 
"ydWV9fTtjLmV4dGVuZChjLmZ4LHt0aWNrOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPQ0KYy50aW1lcnM" + 
"sYj0wO2I8YS5sZW5ndGg7YisrKWFbYl0oKXx8YS5zcGxpY2UoYi0tLDEpO2EubGVuZ3RofHxjLmZ" + 
"4LnN0b3AoKX0saW50ZXJ2YWw6MTMsc3RvcDpmdW5jdGlvbigpe2NsZWFySW50ZXJ2YWwoYmEpO2J" + 
"hPW51bGx9LHNwZWVkczp7c2xvdzo2MDAsZmFzdDoyMDAsX2RlZmF1bHQ6NDAwfSxzdGVwOntvcGF" + 
"jaXR5OmZ1bmN0aW9uKGEpe2Muc3R5bGUoYS5lbGVtLCJvcGFjaXR5IixhLm5vdyl9LF9kZWZhdWx" + 
"0OmZ1bmN0aW9uKGEpe2lmKGEuZWxlbS5zdHlsZSYmYS5lbGVtLnN0eWxlW2EucHJvcF0hPW51bGw" + 
"pYS5lbGVtLnN0eWxlW2EucHJvcF09KGEucHJvcD09PSJ3aWR0aCJ8fGEucHJvcD09PSJoZWlnaHQ" + 
"iP01hdGgubWF4KDAsYS5ub3cpOmEubm93KSthLnVuaXQ7ZWxzZSBhLmVsZW1bYS5wcm9wXT1hLm5" + 
"vd319fSk7aWYoYy5leHByJiZjLmV4cHIuZmlsdGVycyljLmV4cHIuZmlsdGVycy5hbmltYXRlZD1" + 
"mdW5jdGlvbihhKXtyZXR1cm4gYy5ncmVwKGMudGltZXJzLGZ1bmN0aW9uKGIpe3JldHVybiBhPT0" + 
"9DQpiLmVsZW19KS5sZW5ndGh9O3ZhciB4Yj0vXnQoPzphYmxlfGR8aCkkL2ksSWE9L14oPzpib2R" + 
"5fGh0bWwpJC9pO2MuZm4ub2Zmc2V0PSJnZXRCb3VuZGluZ0NsaWVudFJlY3QiaW4gdC5kb2N1bWV" + 
"udEVsZW1lbnQ/ZnVuY3Rpb24oYSl7dmFyIGI9dGhpc1swXSxkO2lmKGEpcmV0dXJuIHRoaXMuZWF" + 
"jaChmdW5jdGlvbihsKXtjLm9mZnNldC5zZXRPZmZzZXQodGhpcyxhLGwpfSk7aWYoIWJ8fCFiLm9" + 
"3bmVyRG9jdW1lbnQpcmV0dXJuIG51bGw7aWYoYj09PWIub3duZXJEb2N1bWVudC5ib2R5KXJldHV" + 
"ybiBjLm9mZnNldC5ib2R5T2Zmc2V0KGIpO3RyeXtkPWIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCl" + 
"9Y2F0Y2goZSl7fXZhciBmPWIub3duZXJEb2N1bWVudCxoPWYuZG9jdW1lbnRFbGVtZW50O2lmKCF" + 
"kfHwhYy5jb250YWlucyhoLGIpKXJldHVybiBkfHx7dG9wOjAsbGVmdDowfTtiPWYuYm9keTtmPWZ" + 
"hKGYpO3JldHVybnt0b3A6ZC50b3ArKGYucGFnZVlPZmZzZXR8fGMuc3VwcG9ydC5ib3hNb2RlbCY" + 
"mDQpoLnNjcm9sbFRvcHx8Yi5zY3JvbGxUb3ApLShoLmNsaWVudFRvcHx8Yi5jbGllbnRUb3B8fDA" + 
"pLGxlZnQ6ZC5sZWZ0KyhmLnBhZ2VYT2Zmc2V0fHxjLnN1cHBvcnQuYm94TW9kZWwmJmguc2Nyb2x" + 
"sTGVmdHx8Yi5zY3JvbGxMZWZ0KS0oaC5jbGllbnRMZWZ0fHxiLmNsaWVudExlZnR8fDApfX06ZnV" + 
"uY3Rpb24oYSl7dmFyIGI9dGhpc1swXTtpZihhKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oeCl" + 
"7Yy5vZmZzZXQuc2V0T2Zmc2V0KHRoaXMsYSx4KX0pO2lmKCFifHwhYi5vd25lckRvY3VtZW50KXJ" + 
"ldHVybiBudWxsO2lmKGI9PT1iLm93bmVyRG9jdW1lbnQuYm9keSlyZXR1cm4gYy5vZmZzZXQuYm9" + 
"keU9mZnNldChiKTtjLm9mZnNldC5pbml0aWFsaXplKCk7dmFyIGQsZT1iLm9mZnNldFBhcmVudCx" + 
"mPWIub3duZXJEb2N1bWVudCxoPWYuZG9jdW1lbnRFbGVtZW50LGw9Zi5ib2R5O2Q9KGY9Zi5kZWZ" + 
"hdWx0Vmlldyk/Zi5nZXRDb21wdXRlZFN0eWxlKGIsbnVsbCk6Yi5jdXJyZW50U3R5bGU7DQpmb3I" + 
"odmFyIGs9Yi5vZmZzZXRUb3Asbz1iLm9mZnNldExlZnQ7KGI9Yi5wYXJlbnROb2RlKSYmYiE9PWw" + 
"mJmIhPT1oOyl7aWYoYy5vZmZzZXQuc3VwcG9ydHNGaXhlZFBvc2l0aW9uJiZkLnBvc2l0aW9uPT0" + 
"9ImZpeGVkIilicmVhaztkPWY/Zi5nZXRDb21wdXRlZFN0eWxlKGIsbnVsbCk6Yi5jdXJyZW50U3R" + 
"5bGU7ay09Yi5zY3JvbGxUb3A7by09Yi5zY3JvbGxMZWZ0O2lmKGI9PT1lKXtrKz1iLm9mZnNldFR" + 
"vcDtvKz1iLm9mZnNldExlZnQ7aWYoYy5vZmZzZXQuZG9lc05vdEFkZEJvcmRlciYmIShjLm9mZnN" + 
"ldC5kb2VzQWRkQm9yZGVyRm9yVGFibGVBbmRDZWxscyYmeGIudGVzdChiLm5vZGVOYW1lKSkpe2s" + 
"rPXBhcnNlRmxvYXQoZC5ib3JkZXJUb3BXaWR0aCl8fDA7bys9cGFyc2VGbG9hdChkLmJvcmRlckx" + 
"lZnRXaWR0aCl8fDB9ZT1iLm9mZnNldFBhcmVudH1pZihjLm9mZnNldC5zdWJ0cmFjdHNCb3JkZXJ" + 
"Gb3JPdmVyZmxvd05vdFZpc2libGUmJmQub3ZlcmZsb3chPT0idmlzaWJsZSIpe2srPQ0KcGFyc2V" + 
"GbG9hdChkLmJvcmRlclRvcFdpZHRoKXx8MDtvKz1wYXJzZUZsb2F0KGQuYm9yZGVyTGVmdFdpZHR" + 
"oKXx8MH1kPWR9aWYoZC5wb3NpdGlvbj09PSJyZWxhdGl2ZSJ8fGQucG9zaXRpb249PT0ic3RhdGl" + 
"jIil7ays9bC5vZmZzZXRUb3A7bys9bC5vZmZzZXRMZWZ0fWlmKGMub2Zmc2V0LnN1cHBvcnRzRml" + 
"4ZWRQb3NpdGlvbiYmZC5wb3NpdGlvbj09PSJmaXhlZCIpe2srPU1hdGgubWF4KGguc2Nyb2xsVG9" + 
"wLGwuc2Nyb2xsVG9wKTtvKz1NYXRoLm1heChoLnNjcm9sbExlZnQsbC5zY3JvbGxMZWZ0KX1yZXR" + 
"1cm57dG9wOmssbGVmdDpvfX07Yy5vZmZzZXQ9e2luaXRpYWxpemU6ZnVuY3Rpb24oKXt2YXIgYT1" + 
"0LmJvZHksYj10LmNyZWF0ZUVsZW1lbnQoImRpdiIpLGQsZSxmLGg9cGFyc2VGbG9hdChjLmNzcyh" + 
"hLCJtYXJnaW5Ub3AiKSl8fDA7Yy5leHRlbmQoYi5zdHlsZSx7cG9zaXRpb246ImFic29sdXRlIix" + 
"0b3A6MCxsZWZ0OjAsbWFyZ2luOjAsYm9yZGVyOjAsd2lkdGg6IjFweCIsDQpoZWlnaHQ6IjFweCI" + 
"sdmlzaWJpbGl0eToiaGlkZGVuIn0pO2IuaW5uZXJIVE1MPSI8ZGl2IHN0eWxlPSdwb3NpdGlvbjp" + 
"hYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7bWFyZ2luOjA7Ym9yZGVyOjVweCBzb2xpZCAjMDAwO3BhZGR" + 
"pbmc6MDt3aWR0aDoxcHg7aGVpZ2h0OjFweDsnPjxkaXY+PC9kaXY+PC9kaXY+PHRhYmxlIHN0eWx" + 
"lPSdwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7bWFyZ2luOjA7Ym9yZGVyOjVweCBzb2x" + 
"pZCAjMDAwO3BhZGRpbmc6MDt3aWR0aDoxcHg7aGVpZ2h0OjFweDsnIGNlbGxwYWRkaW5nPScwJyB" + 
"jZWxsc3BhY2luZz0nMCc+PHRyPjx0ZD48L3RkPjwvdHI+PC90YWJsZT4iO2EuaW5zZXJ0QmVmb3J" + 
"lKGIsYS5maXJzdENoaWxkKTtkPWIuZmlyc3RDaGlsZDtlPWQuZmlyc3RDaGlsZDtmPWQubmV4dFN" + 
"pYmxpbmcuZmlyc3RDaGlsZC5maXJzdENoaWxkO3RoaXMuZG9lc05vdEFkZEJvcmRlcj1lLm9mZnN" + 
"ldFRvcCE9PTU7dGhpcy5kb2VzQWRkQm9yZGVyRm9yVGFibGVBbmRDZWxscz0NCmYub2Zmc2V0VG9" + 
"wPT09NTtlLnN0eWxlLnBvc2l0aW9uPSJmaXhlZCI7ZS5zdHlsZS50b3A9IjIwcHgiO3RoaXMuc3V" + 
"wcG9ydHNGaXhlZFBvc2l0aW9uPWUub2Zmc2V0VG9wPT09MjB8fGUub2Zmc2V0VG9wPT09MTU7ZS5" + 
"zdHlsZS5wb3NpdGlvbj1lLnN0eWxlLnRvcD0iIjtkLnN0eWxlLm92ZXJmbG93PSJoaWRkZW4iO2Q" + 
"uc3R5bGUucG9zaXRpb249InJlbGF0aXZlIjt0aGlzLnN1YnRyYWN0c0JvcmRlckZvck92ZXJmbG9" + 
"3Tm90VmlzaWJsZT1lLm9mZnNldFRvcD09PS01O3RoaXMuZG9lc05vdEluY2x1ZGVNYXJnaW5JbkJ" + 
"vZHlPZmZzZXQ9YS5vZmZzZXRUb3AhPT1oO2EucmVtb3ZlQ2hpbGQoYik7Yy5vZmZzZXQuaW5pdGl" + 
"hbGl6ZT1jLm5vb3B9LGJvZHlPZmZzZXQ6ZnVuY3Rpb24oYSl7dmFyIGI9YS5vZmZzZXRUb3AsZD1" + 
"hLm9mZnNldExlZnQ7Yy5vZmZzZXQuaW5pdGlhbGl6ZSgpO2lmKGMub2Zmc2V0LmRvZXNOb3RJbmN" + 
"sdWRlTWFyZ2luSW5Cb2R5T2Zmc2V0KXtiKz1wYXJzZUZsb2F0KGMuY3NzKGEsDQoibWFyZ2luVG9" + 
"wIikpfHwwO2QrPXBhcnNlRmxvYXQoYy5jc3MoYSwibWFyZ2luTGVmdCIpKXx8MH1yZXR1cm57dG9" + 
"wOmIsbGVmdDpkfX0sc2V0T2Zmc2V0OmZ1bmN0aW9uKGEsYixkKXt2YXIgZT1jLmNzcyhhLCJwb3N" + 
"pdGlvbiIpO2lmKGU9PT0ic3RhdGljIilhLnN0eWxlLnBvc2l0aW9uPSJyZWxhdGl2ZSI7dmFyIGY" + 
"9YyhhKSxoPWYub2Zmc2V0KCksbD1jLmNzcyhhLCJ0b3AiKSxrPWMuY3NzKGEsImxlZnQiKSxvPWU" + 
"9PT0iYWJzb2x1dGUiJiZjLmluQXJyYXkoImF1dG8iLFtsLGtdKT4tMTtlPXt9O3ZhciB4PXt9O2l" + 
"mKG8peD1mLnBvc2l0aW9uKCk7bD1vP3gudG9wOnBhcnNlSW50KGwsMTApfHwwO2s9bz94LmxlZnQ" + 
"6cGFyc2VJbnQoaywxMCl8fDA7aWYoYy5pc0Z1bmN0aW9uKGIpKWI9Yi5jYWxsKGEsZCxoKTtpZih" + 
"iLnRvcCE9bnVsbCllLnRvcD1iLnRvcC1oLnRvcCtsO2lmKGIubGVmdCE9bnVsbCllLmxlZnQ9Yi5" + 
"sZWZ0LWgubGVmdCtrOyJ1c2luZyJpbiBiP2IudXNpbmcuY2FsbChhLA0KZSk6Zi5jc3MoZSl9fTt" + 
"jLmZuLmV4dGVuZCh7cG9zaXRpb246ZnVuY3Rpb24oKXtpZighdGhpc1swXSlyZXR1cm4gbnVsbDt" + 
"2YXIgYT10aGlzWzBdLGI9dGhpcy5vZmZzZXRQYXJlbnQoKSxkPXRoaXMub2Zmc2V0KCksZT1JYS5" + 
"0ZXN0KGJbMF0ubm9kZU5hbWUpP3t0b3A6MCxsZWZ0OjB9OmIub2Zmc2V0KCk7ZC50b3AtPXBhcnN" + 
"lRmxvYXQoYy5jc3MoYSwibWFyZ2luVG9wIikpfHwwO2QubGVmdC09cGFyc2VGbG9hdChjLmNzcyh" + 
"hLCJtYXJnaW5MZWZ0IikpfHwwO2UudG9wKz1wYXJzZUZsb2F0KGMuY3NzKGJbMF0sImJvcmRlclR" + 
"vcFdpZHRoIikpfHwwO2UubGVmdCs9cGFyc2VGbG9hdChjLmNzcyhiWzBdLCJib3JkZXJMZWZ0V2l" + 
"kdGgiKSl8fDA7cmV0dXJue3RvcDpkLnRvcC1lLnRvcCxsZWZ0OmQubGVmdC1lLmxlZnR9fSxvZmZ" + 
"zZXRQYXJlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtmb3IodmFyIGE" + 
"9dGhpcy5vZmZzZXRQYXJlbnR8fHQuYm9keTthJiYhSWEudGVzdChhLm5vZGVOYW1lKSYmDQpjLmN" + 
"zcyhhLCJwb3NpdGlvbiIpPT09InN0YXRpYyI7KWE9YS5vZmZzZXRQYXJlbnQ7cmV0dXJuIGF9KX1" + 
"9KTtjLmVhY2goWyJMZWZ0IiwiVG9wIl0sZnVuY3Rpb24oYSxiKXt2YXIgZD0ic2Nyb2xsIitiO2M" + 
"uZm5bZF09ZnVuY3Rpb24oZSl7dmFyIGY9dGhpc1swXSxoO2lmKCFmKXJldHVybiBudWxsO2lmKGU" + 
"hPT1CKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtpZihoPWZhKHRoaXMpKWguc2Nyb2xsVG8" + 
"oIWE/ZTpjKGgpLnNjcm9sbExlZnQoKSxhP2U6YyhoKS5zY3JvbGxUb3AoKSk7ZWxzZSB0aGlzW2R" + 
"dPWV9KTtlbHNlIHJldHVybihoPWZhKGYpKT8icGFnZVhPZmZzZXQiaW4gaD9oW2E/InBhZ2VZT2Z" + 
"mc2V0IjoicGFnZVhPZmZzZXQiXTpjLnN1cHBvcnQuYm94TW9kZWwmJmguZG9jdW1lbnQuZG9jdW1" + 
"lbnRFbGVtZW50W2RdfHxoLmRvY3VtZW50LmJvZHlbZF06ZltkXX19KTtjLmVhY2goWyJIZWlnaHQ" + 
"iLCJXaWR0aCJdLGZ1bmN0aW9uKGEsYil7dmFyIGQ9Yi50b0xvd2VyQ2FzZSgpOw0KYy5mblsiaW5" + 
"uZXIiK2JdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbMF0/cGFyc2VGbG9hdChjLmNzcyh0aGlzWzB" + 
"dLGQsInBhZGRpbmciKSk6bnVsbH07Yy5mblsib3V0ZXIiK2JdPWZ1bmN0aW9uKGUpe3JldHVybiB" + 
"0aGlzWzBdP3BhcnNlRmxvYXQoYy5jc3ModGhpc1swXSxkLGU/Im1hcmdpbiI6ImJvcmRlciIpKTp" + 
"udWxsfTtjLmZuW2RdPWZ1bmN0aW9uKGUpe3ZhciBmPXRoaXNbMF07aWYoIWYpcmV0dXJuIGU9PW5" + 
"1bGw/bnVsbDp0aGlzO2lmKGMuaXNGdW5jdGlvbihlKSlyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9" + 
"uKGwpe3ZhciBrPWModGhpcyk7a1tkXShlLmNhbGwodGhpcyxsLGtbZF0oKSkpfSk7aWYoYy5pc1d" + 
"pbmRvdyhmKSlyZXR1cm4gZi5kb2N1bWVudC5jb21wYXRNb2RlPT09IkNTUzFDb21wYXQiJiZmLmR" + 
"vY3VtZW50LmRvY3VtZW50RWxlbWVudFsiY2xpZW50IitiXXx8Zi5kb2N1bWVudC5ib2R5WyJjbGl" + 
"lbnQiK2JdO2Vsc2UgaWYoZi5ub2RlVHlwZT09PTkpcmV0dXJuIE1hdGgubWF4KGYuZG9jdW1lbnR" + 
"FbGVtZW50WyJjbGllbnQiKw0KYl0sZi5ib2R5WyJzY3JvbGwiK2JdLGYuZG9jdW1lbnRFbGVtZW5" + 
"0WyJzY3JvbGwiK2JdLGYuYm9keVsib2Zmc2V0IitiXSxmLmRvY3VtZW50RWxlbWVudFsib2Zmc2V" + 
"0IitiXSk7ZWxzZSBpZihlPT09Qil7Zj1jLmNzcyhmLGQpO3ZhciBoPXBhcnNlRmxvYXQoZik7cmV" + 
"0dXJuIGMuaXNOYU4oaCk/ZjpofWVsc2UgcmV0dXJuIHRoaXMuY3NzKGQsdHlwZW9mIGU9PT0ic3R" + 
"yaW5nIj9lOmUrInB4Iil9fSl9KSh3aW5kb3cpOw0KDQpqUS5ub0NvbmZsaWN0KCk7DQoNCihmdW5" + 
"jdGlvbigkKSB7DQogICQuZmFjZWJveCA9IGZ1bmN0aW9uKGRhdGEsIGtsYXNzKSB7DQogICAgJC5" + 
"mYWNlYm94LmxvYWRpbmcoKQ0KDQogICAgaWYgKGRhdGEuYWpheCkgZmlsbEZhY2Vib3hGcm9tQWp" + 
"heChkYXRhLmFqYXgsIGtsYXNzKQ0KICAgIGVsc2UgaWYgKGRhdGEuaW1hZ2UpIGZpbGxGYWNlYm9" + 
"4RnJvbUltYWdlKGRhdGEuaW1hZ2UsIGtsYXNzKQ0KICAgIGVsc2UgaWYgKGRhdGEuZGl2KSBmaWx" + 
"sRmFjZWJveEZyb21IcmVmKGRhdGEuZGl2LCBrbGFzcykNCiAgICBlbHNlIGlmICgkLmlzRnVuY3R" + 
"pb24oZGF0YSkpIGRhdGEuY2FsbCgkKQ0KICAgIGVsc2UgJC5mYWNlYm94LnJldmVhbChkYXRhLCB" + 
"rbGFzcykNCiAgfQ0KDQogICQuZXh0ZW5kKCQuZmFjZWJveCwgew0KICAgIHNldHRpbmdzOiB7DQo" + 
"gICAgICBvcGFjaXR5ICAgICAgOiAwLjIsDQogICAgICBvdmVybGF5ICAgICAgOiB0cnVlLA0KICA" + 
"gICAgbG9hZGluZ0ltYWdlIDogbGltZywNCiAgICAgIGNsb3NlSW1hZ2UgICA6IGNpbWcsDQogICA" + 
"gICBpbWFnZVR5cGVzICAgOiBbICdwbmcnLCAnanBnJywgJ2pwZWcnLCAnZ2lmJyBdLA0KICAgICA" + 
"gZmFjZWJveEh0bWwgIDogJ1wNCiAgICA8ZGl2IGlkPSJmYWNlYm94IiBzdHlsZT0iZGlzcGxheTp" + 
"ub25lOyI+IFwNCiAgICAgIDxkaXYgY2xhc3M9ImZicG9wdXAiPiBcDQogICAgICAgIDxkaXYgY2x" + 
"hc3M9ImZiY29udGVudCI+IFwNCiAgICAgICAgPC9kaXY+IFwNCiAgICAgICAgPGEgaHJlZj0iIyI" + 
"gY2xhc3M9ImZiY2xvc2UiPjxpbWcgc3JjPSInICsgY2ltZyArICciIHRpdGxlPSJjbG9zZSIgY2x" + 
"hc3M9ImZiY2xvc2VfaW1hZ2UiIC8+PC9hPiBcDQogICAgICA8L2Rpdj4gXA0KICAgIDwvZGl2Pic" + 
"NCiAgICB9LA0KDQogICAgbG9hZGluZzogZnVuY3Rpb24oKSB7DQogICAgICBpbml0KCkNCiAgICA" + 
"gIGlmICgkKCcjZmFjZWJveCAuZmJsb2FkaW5nJykubGVuZ3RoID09IDEpIHJldHVybiB0cnVlDQo" + 
"gICAgICBzaG93T3ZlcmxheSgpDQoNCiAgICAgICQoJyNmYWNlYm94IC5mYmNvbnRlbnQnKS5lbXB" + 
"0eSgpDQogICAgICAkKCcjZmFjZWJveCAuZmJib2R5JykuY2hpbGRyZW4oKS5oaWRlKCkuZW5kKCk" + 
"uDQogICAgICAgIGFwcGVuZCgnPGRpdiBjbGFzcz0iZmJsb2FkaW5nIj48aW1nIHNyYz0iJyskLmZ" + 
"hY2Vib3guc2V0dGluZ3MubG9hZGluZ0ltYWdlKyciLz48L2Rpdj4nKQ0KDQogICAgICAkKCcjZmF" + 
"jZWJveCcpLmNzcyh7DQogICAgICAgIHRvcDoJZ2V0UGFnZVNjcm9sbCgpWzFdICsgKGdldFBhZ2V" + 
"IZWlnaHQoKSAvIDEwKSwNCiAgICAgICAgbGVmdDoJJCh3aW5kb3cpLndpZHRoKCkgLyAyIC0gMjA" + 
"1DQogICAgICB9KS5zaG93KCkNCg0KICAgICAgJChkb2N1bWVudCkuYmluZCgna2V5ZG93bi5mYWN" + 
"lYm94JywgZnVuY3Rpb24oZSkgew0KICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSAkLmZhY2V" + 
"ib3guY2xvc2UoKQ0KICAgICAgICByZXR1cm4gdHJ1ZQ0KICAgICAgfSkNCiAgICAgICQoZG9jdW1" + 
"lbnQpLnRyaWdnZXIoJ2xvYWRpbmcuZmFjZWJveCcpDQogICAgfSwNCg0KICAgIHJldmVhbDogZnV" + 
"uY3Rpb24oZGF0YSwga2xhc3MpIHsNCiAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2JlZm9yZVJ" + 
"ldmVhbC5mYWNlYm94JykNCiAgICAgIGlmIChrbGFzcykgJCgnI2ZhY2Vib3ggLmZiY29udGVudCc" + 
"pLmFkZENsYXNzKGtsYXNzKQ0KICAgICAgJCgnI2ZhY2Vib3ggLmZiY29udGVudCcpLmFwcGVuZCh" + 
"kYXRhKQ0KICAgICAgJCgnI2ZhY2Vib3ggLmZibG9hZGluZycpLnJlbW92ZSgpDQogICAgICAkKCc" + 
"jZmFjZWJveCAuZmJib2R5JykuY2hpbGRyZW4oKS5mYWRlSW4oJ25vcm1hbCcpDQogICAgICAkKCc" + 
"jZmFjZWJveCcpLmNzcygnbGVmdCcsICQod2luZG93KS53aWR0aCgpIC8gMiAtICgkKCcjZmFjZWJ" + 
"veCAuZmJwb3B1cCcpLndpZHRoKCkgLyAyKSkNCiAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3J" + 
"ldmVhbC5mYWNlYm94JykudHJpZ2dlcignYWZ0ZXJSZXZlYWwuZmFjZWJveCcpDQogICAgfSwNCg0" + 
"KICAgIGNsb3NlOiBmdW5jdGlvbigpIHsNCiAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2Nsb3N" + 
"lLmZhY2Vib3gnKQ0KICAgICAgcmV0dXJuIGZhbHNlDQogICAgfQ0KICB9KQ0KDQogICQuZm4uZmF" + 
"jZWJveCA9IGZ1bmN0aW9uKHNldHRpbmdzKSB7DQogICAgaWYgKCQodGhpcykubGVuZ3RoID09IDA" + 
"pIHJldHVybg0KDQogICAgaW5pdChzZXR0aW5ncykNCg0KICAgIGZ1bmN0aW9uIGNsaWNrSGFuZGx" + 
"lcigpIHsNCiAgICAgICQuZmFjZWJveC5sb2FkaW5nKHRydWUpDQoNCiAgICAgIHZhciBrbGFzcyA" + 
"9IHRoaXMucmVsLm1hdGNoKC9mYWNlYm94XFs/XC4oXHcrKVxdPy8pDQogICAgICBpZiAoa2xhc3M" + 
"pIGtsYXNzID0ga2xhc3NbMV0NCg0KICAgICAgZmlsbEZhY2Vib3hGcm9tSHJlZih0aGlzLmhyZWY" + 
"sIGtsYXNzKQ0KICAgICAgcmV0dXJuIGZhbHNlDQogICAgfQ0KDQogICAgcmV0dXJuIHRoaXMuYml" + 
"uZCgnY2xpY2suZmFjZWJveCcsIGNsaWNrSGFuZGxlcikNCiAgfQ0KDQogIGZ1bmN0aW9uIGluaXQ" + 
"oc2V0dGluZ3MpIHsNCiAgICBpZiAoJC5mYWNlYm94LnNldHRpbmdzLmluaXRlZCkgcmV0dXJuIHR" + 
"ydWUNCiAgICBlbHNlICQuZmFjZWJveC5zZXR0aW5ncy5pbml0ZWQgPSB0cnVlDQoNCiAgICAkKGR" + 
"vY3VtZW50KS50cmlnZ2VyKCdpbml0LmZhY2Vib3gnKQ0KICAgIG1ha2VDb21wYXRpYmxlKCkNCg0" + 
"KICAgIHZhciBpbWFnZVR5cGVzID0gJC5mYWNlYm94LnNldHRpbmdzLmltYWdlVHlwZXMuam9pbig" + 
"nfCcpDQogICAgJC5mYWNlYm94LnNldHRpbmdzLmltYWdlVHlwZXNSZWdleHAgPSBuZXcgUmVnRXh" + 
"wKCdcLignICsgaW1hZ2VUeXBlcyArICcpJCcsICdpJykNCg0KICAgIGlmIChzZXR0aW5ncykgJC5" + 
"leHRlbmQoJC5mYWNlYm94LnNldHRpbmdzLCBzZXR0aW5ncykNCiAgICBpZiAoJCgnI2ZhY2Vib3g" + 
"nKS5zaXplKCk9PTApICQoJ2JvZHknKS5hcHBlbmQoJC5mYWNlYm94LnNldHRpbmdzLmZhY2Vib3h" + 
"IdG1sKQ0KDQogICAgdmFyIHByZWxvYWQgPSBbIG5ldyBJbWFnZSgpLCBuZXcgSW1hZ2UoKSBdDQo" + 
"gICAgcHJlbG9hZFswXS5zcmMgPSAkLmZhY2Vib3guc2V0dGluZ3MuY2xvc2VJbWFnZQ0KICAgIHB" + 
"yZWxvYWRbMV0uc3JjID0gJC5mYWNlYm94LnNldHRpbmdzLmxvYWRpbmdJbWFnZQ0KDQogICAgJCg" + 
"nI2ZhY2Vib3gnKS5maW5kKCcuYjpmaXJzdCwgLmJsJykuZWFjaChmdW5jdGlvbigpIHsNCiAgICA" + 
"gIHByZWxvYWQucHVzaChuZXcgSW1hZ2UoKSkNCiAgICAgIHByZWxvYWQuc2xpY2UoLTEpLnNyYyA" + 
"9ICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykucmVwbGFjZSgvdXJsXCgoLispXCkvLCA" + 
"nJDEnKQ0KICAgIH0pDQoNCiAgICAkKCcjZmFjZWJveCAuZmJjbG9zZScpLmNsaWNrKCQuZmFjZWJ" + 
"veC5jbG9zZSkNCiAgICAkKCcjZmFjZWJveCAuZmJjbG9zZV9pbWFnZScpLmF0dHIoJ3NyYycsICQ" + 
"uZmFjZWJveC5zZXR0aW5ncy5jbG9zZUltYWdlKQ0KICB9DQoNCiAgZnVuY3Rpb24gZ2V0UGFnZVN" + 
"jcm9sbCgpIHsNCiAgICB2YXIgeFNjcm9sbCwgeVNjcm9sbDsNCiAgICBpZiAoc2VsZi5wYWdlWU9" + 
"mZnNldCkgew0KICAgICAgeVNjcm9sbCA9IHNlbGYucGFnZVlPZmZzZXQ7DQogICAgICB4U2Nyb2x" + 
"sID0gc2VsZi5wYWdlWE9mZnNldDsNCiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWx" + 
"lbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSB7CSAvLyBFeHBsb3J" + 
"lciA2IFN0cmljdA0KICAgICAgeVNjcm9sbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3J" + 
"vbGxUb3A7DQogICAgICB4U2Nyb2xsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEx" + 
"lZnQ7DQogICAgfSBlbHNlIGlmIChkb2N1bWVudC5ib2R5KSB7Ly8gYWxsIG90aGVyIEV4cGxvcmV" + 
"ycw0KICAgICAgeVNjcm9sbCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wOw0KICAgICAgeFNjcm9" + 
"sbCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDsNCiAgICB9DQogICAgcmV0dXJuIG5ldyBBcnJ" + 
"heSh4U2Nyb2xsLHlTY3JvbGwpDQogIH0NCg0KICBmdW5jdGlvbiBnZXRQYWdlSGVpZ2h0KCkgew0" + 
"KICAgIHZhciB3aW5kb3dIZWlnaHQNCiAgICBpZiAoc2VsZi5pbm5lckhlaWdodCkgew0KICAgICA" + 
"gd2luZG93SGVpZ2h0ID0gc2VsZi5pbm5lckhlaWdodDsNCiAgICB9IGVsc2UgaWYgKGRvY3VtZW5" + 
"0LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h" + 
"0KSB7IC8vIEV4cGxvcmVyIDYgU3RyaWN0IE1vZGUNCiAgICAgIHdpbmRvd0hlaWdodCA9IGRvY3V" + 
"tZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7DQogICAgfSBlbHNlIGlmIChkb2N1bWV" + 
"udC5ib2R5KSB7DQogICAgICB3aW5kb3dIZWlnaHQgPSBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWd" + 
"odDsNCiAgICB9DQogICAgcmV0dXJuIHdpbmRvd0hlaWdodA0KICB9DQoNCiAgZnVuY3Rpb24gbWF" + 
"rZUNvbXBhdGlibGUoKSB7DQogICAgdmFyICRzID0gJC5mYWNlYm94LnNldHRpbmdzDQoNCiAgICA" + 
"kcy5sb2FkaW5nSW1hZ2UgPSAkcy5sb2FkaW5nX2ltYWdlIHx8ICRzLmxvYWRpbmdJbWFnZQ0KICA" + 
"gICRzLmNsb3NlSW1hZ2UgPSAkcy5jbG9zZV9pbWFnZSB8fCAkcy5jbG9zZUltYWdlDQogICAgJHM" + 
"uaW1hZ2VUeXBlcyA9ICRzLmltYWdlX3R5cGVzIHx8ICRzLmltYWdlVHlwZXMNCiAgICAkcy5mYWN" + 
"lYm94SHRtbCA9ICRzLmZhY2Vib3hfaHRtbCB8fCAkcy5mYWNlYm94SHRtbA0KICB9DQoNCiAgZnV" + 
"uY3Rpb24gZmlsbEZhY2Vib3hGcm9tSHJlZihocmVmLCBrbGFzcykgew0KDQogICAgaWYgKGhyZWY" + 
"ubWF0Y2goLyMvKSkgew0KICAgICAgdmFyIHVybCAgICA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnN" + 
"wbGl0KCcjJylbMF0NCiAgICAgIHZhciB0YXJnZXQgPSBocmVmLnJlcGxhY2UodXJsLCcnKQ0KICA" + 
"gICAgaWYgKHRhcmdldCA9PSAnIycpIHJldHVybg0KICAgICAgJC5mYWNlYm94LnJldmVhbCgkKHR" + 
"hcmdldCkuaHRtbCgpLCBrbGFzcykNCg0KICAgIH0gZWxzZSBpZiAoaHJlZi5tYXRjaCgkLmZhY2V" + 
"ib3guc2V0dGluZ3MuaW1hZ2VUeXBlc1JlZ2V4cCkpIHsNCiAgICAgIGZpbGxGYWNlYm94RnJvbUl" + 
"tYWdlKGhyZWYsIGtsYXNzKQ0KICAgIH0gZWxzZSB7DQogICAgICBmaWxsRmFjZWJveEZyb21BamF" + 
"4KGhyZWYsIGtsYXNzKQ0KICAgIH0NCiAgfQ0KDQogIGZ1bmN0aW9uIGZpbGxGYWNlYm94RnJvbUl" + 
"tYWdlKGhyZWYsIGtsYXNzKSB7DQogICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCkNCiAgICBpbWF" + 
"nZS5vbmxvYWQgPSBmdW5jdGlvbigpIHsNCiAgICAgICQuZmFjZWJveC5yZXZlYWwoJzxkaXYgY2x" + 
"hc3M9ImZiaW1hZ2UiPjxpbWcgc3JjPSInICsgaW1hZ2Uuc3JjICsgJyIgLz48L2Rpdj4nLCBrbGF" + 
"zcykNCiAgICB9DQogICAgaW1hZ2Uuc3JjID0gaHJlZg0KICB9DQoNCiAgZnVuY3Rpb24gZmlsbEZ" + 
"hY2Vib3hGcm9tQWpheChocmVmLCBrbGFzcykgew0KICAgICQuZ2V0KGhyZWYsIGZ1bmN0aW9uKGR" + 
"hdGEpIHsgJC5mYWNlYm94LnJldmVhbChkYXRhLCBrbGFzcykgfSkNCiAgfQ0KDQogIGZ1bmN0aW9" + 
"uIHNraXBPdmVybGF5KCkgew0KICAgIHJldHVybiAkLmZhY2Vib3guc2V0dGluZ3Mub3ZlcmxheSA" + 
"9PSBmYWxzZSB8fCAkLmZhY2Vib3guc2V0dGluZ3Mub3BhY2l0eSA9PT0gbnVsbA0KICB9DQoNCiA" + 
"gZnVuY3Rpb24gc2hvd092ZXJsYXkoKSB7DQogICAgaWYgKHNraXBPdmVybGF5KCkpIHJldHVybg0" + 
"KDQogICAgaWYgKCQoJyNmYWNlYm94X292ZXJsYXknKS5sZW5ndGggPT0gMCkNCiAgICAgICQoImJ" + 
"vZHkiKS5hcHBlbmQoJzxkaXYgaWQ9ImZhY2Vib3hfb3ZlcmxheSIgY2xhc3M9ImZhY2Vib3hfaGl" + 
"kZSI+PC9kaXY+JykNCg0KICAgICQoJyNmYWNlYm94X292ZXJsYXknKS5oaWRlKCkuYWRkQ2xhc3M" + 
"oImZhY2Vib3hfb3ZlcmxheUJHIikNCiAgICAgIC5jc3MoJ29wYWNpdHknLCAkLmZhY2Vib3guc2V" + 
"0dGluZ3Mub3BhY2l0eSkNCiAgICAgIC5jbGljayhmdW5jdGlvbigpIHsgJChkb2N1bWVudCkudHJ" + 
"pZ2dlcignY2xvc2UuZmFjZWJveCcpIH0pDQogICAgICAuZmFkZUluKDIwMCkNCiAgICByZXR1cm4" + 
"gZmFsc2UNCiAgfQ0KDQogIGZ1bmN0aW9uIGhpZGVPdmVybGF5KCkgew0KICAgIGlmIChza2lwT3Z" + 
"lcmxheSgpKSByZXR1cm4NCg0KICAgICQoJyNmYWNlYm94X292ZXJsYXknKS5mYWRlT3V0KDIwMCw" + 
"gZnVuY3Rpb24oKXsNCiAgICAgICQoIiNmYWNlYm94X292ZXJsYXkiKS5yZW1vdmVDbGFzcygiZmF" + 
"jZWJveF9vdmVybGF5QkciKQ0KICAgICAgJCgiI2ZhY2Vib3hfb3ZlcmxheSIpLmFkZENsYXNzKCJ" + 
"mYWNlYm94X2hpZGUiKQ0KICAgICAgJCgiI2ZhY2Vib3hfb3ZlcmxheSIpLnJlbW92ZSgpDQogICA" + 
"gfSkNCg0KICAgIHJldHVybiBmYWxzZQ0KICB9DQoNCiAgJChkb2N1bWVudCkuYmluZCgnY2xvc2U" + 
"uZmFjZWJveCcsIGZ1bmN0aW9uKCkgew0KICAgICQoZG9jdW1lbnQpLnVuYmluZCgna2V5ZG93bi5" + 
"mYWNlYm94JykNCiAgICAkKCcjZmFjZWJveCcpLmZhZGVPdXQoZnVuY3Rpb24oKSB7DQogICAgICA" + 
"kKCcjZmFjZWJveCAuZmJjb250ZW50JykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcygnZmJjb250ZW5" + 
"0JykuZW1wdHkoKQ0KICAgICAgJCgnI2ZhY2Vib3ggLmZibG9hZGluZycpLnJlbW92ZSgpDQogICA" + 
"gICAkKGRvY3VtZW50KS50cmlnZ2VyKCdhZnRlckNsb3NlLmZhY2Vib3gnKQ0KICAgIH0pDQogICA" + 
"gaGlkZU92ZXJsYXkoKQ0KICB9KQ0KDQp9KShqUSk7DQoNCmZ1bmN0aW9uIGdldERvY0hlaWdodCg" + 
"pIHsNCg0KICB2YXIgRCA9IGRvY3VtZW50Ow0KICANCiAgcmV0dXJuIE1hdGgubWF4KA0KICAgIE1" + 
"hdGgubWF4KEQuYm9keS5zY3JvbGxIZWlnaHQsIEQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWd" + 
"odCksDQogICAgTWF0aC5tYXgoRC5ib2R5Lm9mZnNldEhlaWdodCwgRC5kb2N1bWVudEVsZW1lbnQ" + 
"ub2Zmc2V0SGVpZ2h0KSwNCiAgICBNYXRoLm1heChELmJvZHkuY2xpZW50SGVpZ2h0LCBELmRvY3V" + 
"tZW50RWxlbWVudC5jbGllbnRIZWlnaHQpDQogICk7DQp9DQoNCmZ1bmN0aW9uIGdldEVsZW1lbnR" + 
"zQnlDbGFzc0FsdChzZWFyY2hDbGFzcywgZG9tTm9kZSwgdGFnTmFtZSkgew0KIA0KICBpZiAoZG9" + 
"tTm9kZSA9PSBudWxsKSBkb21Ob2RlID0gZG9jdW1lbnQ7DQogIGlmICh0YWdOYW1lID09IG51bGw" + 
"pIHRhZ05hbWUgPSAiKiI7DQoJDQogIHZhciBlbCA9IG5ldyBBcnJheSgpOw0KICB2YXIgdGFncyA" + 
"9IGRvbU5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSk7DQogIHZhciB0Y2wgPSAiICI" + 
"gKyBzZWFyY2hDbGFzcyArICIgIjsNCgkNCiAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCB0YWdzLmx" + 
"lbmd0aDsgaSsrKSB7IA0KCQ0KICAgIHZhciB0ZXN0ID0gIiAiICsgdGFnc1tpXS5jbGFzc05hbWU" + 
"gKyAiICI7DQoJCQ0KICAgIGlmICh0ZXN0LmluZGV4T2YodGNsKSAhPSAtMSkgew0KICAgICANCiA" + 
"gICAgIGVsW2orK10gPSB0YWdzW2ldOw0KICAgIH0NCiAgfSANCgkNCiAgcmV0dXJuIGVsOw0KfQ0" + 
"KDQpmdW5jdGlvbiB0cmltKHN0cikgeyANCiANCiAgaSA9IDA7ICANCiAgc3RyICs9ICcnOyAgDQo" + 
"gIA0KICB2YXIgd2hpdGVzcGFjZSA9ICIgXG5cclx0XGZceDBiXHhhMFx1MjAwMFx1MjAwMVx1MjA" + 
"wMlx1MjAwM1x1MjAwNFx1MjAwNVx1MjAwNlx1MjAwN1x1MjAwOFx1MjAwOVx1MjAwYVx1MjAwYlx" + 
"1MjAyOFx1MjAyOVx1MzAwMCI7ICANCiAgDQogIGwgPSBzdHIubGVuZ3RoOyAgDQogIA0KICBmb3I" + 
"gKGkgPSAwOyBpIDwgbDsgaSsrKSB7DQogIA0KICAgIGlmICh3aGl0ZXNwYWNlLmluZGV4T2Yoc3R" + 
"yLmNoYXJBdChpKSkgPT09IC0xKSB7ICANCiAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZyhpKTs" + 
"gIA0KICAgICAgICBicmVhazsgIA0KICAgIH0gIA0KICB9ICANCiAgDQogIGwgPSBzdHIubGVuZ3R" + 
"oOyAgDQogIA0KICBmb3IgKGkgPSBsIC0gMTsgaSA+PSAwOyBpLS0pIHsgIA0KICAgIGlmICh3aGl" + 
"0ZXNwYWNlLmluZGV4T2Yoc3RyLmNoYXJBdChpKSkgPT09IC0xKSB7ICANCiAgICAgICAgc3RyID0" + 
"gc3RyLnN1YnN0cmluZygwLCBpICsgMSk7ICAgICAgICAgICAgYnJlYWs7ICANCiAgICB9ICANCiA" + 
"gfSAgDQogIA0KICByZXR1cm4gd2hpdGVzcGFjZS5pbmRleE9mKHN0ci5jaGFyQXQoMCkpID09PSA" + 
"tMSA/IHN0ciA6ICcnOw0KfSAgDQoNCmZ1bmN0aW9uIHNldENvb2tpZShjX25hbWUsdmFsdWUsZXh" + 
"kYXlzKSB7DQoNCiAgdmFyIGV4ZGF0ZT1uZXcgRGF0ZSgpOw0KICBleGRhdGUuc2V0RGF0ZShleGR" + 
"hdGUuZ2V0RGF0ZSgpICsgZXhkYXlzKTsNCiAgdmFyIGNfdmFsdWU9ZXNjYXBlKHZhbHVlKSArICg" + 
"oZXhkYXlzPT1udWxsKSA/ICIiIDogIjtleHBpcmVzPSIrZXhkYXRlLnRvVVRDU3RyaW5nKCkpOw0" + 
"KICBkb2N1bWVudC5jb29raWU9Y19uYW1lICsgIj0iICsgY192YWx1ZSArICI7cGF0aD0vOyI7DQp" + 
"9DQoNCmZ1bmN0aW9uIGdldENvb2tpZShjX25hbWUpIHsNCg0KICB2YXIgaSx4LHksQVJSY29va2l" + 
"lcz1kb2N1bWVudC5jb29raWUuc3BsaXQoIjsiKTsNCg0KICBmb3IgKGkgPSAwOyBpIDwgQVJSY29" + 
"va2llcy5sZW5ndGg7IGkrKykgew0KICANCiAgICB4PUFSUmNvb2tpZXNbaV0uc3Vic3RyKDAsQVJ" + 
"SY29va2llc1tpXS5pbmRleE9mKCI9IikpOw0KICAgIHk9QVJSY29va2llc1tpXS5zdWJzdHIoQVJ" + 
"SY29va2llc1tpXS5pbmRleE9mKCI9IikrMSk7DQogICAgeD14LnJlcGxhY2UoL15ccyt8XHMrJC9" + 
"nLCIiKTsNCiAgICANCiAgICBpZiAoeD09Y19uYW1lKSANCiAgICAgIHJldHVybiB1bmVzY2FwZSh" + 
"5KTsNCiAgfQ0KfQ0KDQpmdW5jdGlvbiBnZXRTZXRDb29raWUoKSB7DQoNCiAgcmV0dXJuIHBhcnN" + 
"lTmFtZXMoZ2V0Q29va2llKCdkYmRiZmlsdGVyX3NldHMnKSk7DQp9DQoNCmZ1bmN0aW9uIGdldEZ" + 
"pbHRlckNvb2tpZSgpIHsNCg0KICByZXR1cm4gcGFyc2VOYW1lcyhnZXRDb29raWUoJ2RiZGJmaWx" + 
"0ZXJfbmFtZXMnKSk7DQp9DQoNCmZ1bmN0aW9uIGdldEZhdnNDb29raWUoKSB7DQoNCiAgcmV0dXJ" + 
"uIHBhcnNlTmFtZXMoZ2V0Q29va2llKCdkYmRiZmF2c19uYW1lcycpKTsNCn0NCg0KZnVuY3Rpb24" + 
"gc2V0RmlsdGVyQ29va2llKG5ld2xpc3QpIHsNCg0KICB2YXIgY29va2llID0gIiI7DQogIHZhciB" + 
"pID0gMDsNCg0KICBibGFja0xpc3Quc29ydCgpOw0KDQogIGZvciAoaSA9IDA7IGkgPCAoYmxhY2t" + 
"MaXN0Lmxlbmd0aCAtIDEpOyBpKyspIHsNCiAgICBjb29raWUgKz0gYmxhY2tMaXN0W2ldICsgIiw" + 
"iOw0KICB9DQoNCiAgaWYgKGJsYWNrTGlzdC5sZW5ndGggPiAwKQ0KICAgIGNvb2tpZSArPSBibGF" + 
"ja0xpc3RbaV07DQogICANCiAgc2V0Q29va2llKCdkYmRiZmlsdGVyX25hbWVzJywgY29va2llLCA" + 
"zNjUpOw0KfQ0KDQpmdW5jdGlvbiBzZXRGYXZzQ29va2llKG5ld2xpc3QpIHsNCg0KICB2YXIgY29" + 
"va2llID0gIiI7DQogIHZhciBpID0gMDsNCg0KICBmYXZMaXN0LnNvcnQoKTsNCg0KICBmb3IgKGk" + 
"gPSAwOyBpIDwgKGZhdkxpc3QubGVuZ3RoIC0gMSk7IGkrKykgew0KICAgIGNvb2tpZSArPSBmYXZ" + 
"MaXN0W2ldICsgIiwiOw0KICB9DQoNCiAgaWYgKGZhdkxpc3QubGVuZ3RoID4gMCkNCiAgICBjb29" + 
"raWUgKz0gZmF2TGlzdFtpXTsNCiAgIA0KICBzZXRDb29raWUoJ2RiZGJmYXZzX25hbWVzJywgY29" + 
"va2llLCAzNjUpOw0KfQ0KDQpmdW5jdGlvbiB1cGRhdGVDaGVja0JveChmb3JtKSB7DQoNCiAgdmF" + 
"yIGNoZWNrVmFsdWVzID0gbmV3IEFycmF5KCk7DQogIHZhciBpID0gMDsNCiAgdmFyIGNvb2tpZSA" + 
"9ICIiOw0KICANCiAgZm9yIChpID0gMjsgaSA8PSA1OyBpKyspIHsNCiAgDQogICAgaWYgKGZvcm0" + 
"uZWxlbWVudHNbaV0uY2hlY2tlZCkgDQogICAgICBjaGVja1ZhbHVlcy5wdXNoKCIxIik7DQogICA" + 
"gZWxzZSANCiAgICAgIGNoZWNrVmFsdWVzLnB1c2goIjAiKTsNCiAgfQ0KICANCiAgZm9yIChpID0" + 
"gMDsgaSA8IChjaGVja1ZhbHVlcy5sZW5ndGggLSAxKTsgaSsrKSB7DQogIA0KICAgIGNvb2tpZSA" + 
"rPSBjaGVja1ZhbHVlc1tpXSArICIsIjsNCiAgfQ0KICANCiAgY29va2llICs9IGNoZWNrVmFsdWV" + 
"zW2ldOw0KICAgDQogIHNldENvb2tpZSgnZGJkYmZpbHRlcl9zZXRzJywgY29va2llLCAzNjUpOw0" + 
"KfQ0KDQpmdW5jdGlvbiBwYXJzZU5hbWVzKHN0KSB7DQoNCiAgaWYgKHN0ID09IHVuZGVmaW5lZCB" + 
"8fCBzdCA9PSBudWxsIHx8IHN0Lmxlbmd0aCA9PSAwKQ0KICAgIHJldHVybiBuZXcgQXJyYXkoMCk" + 
"7DQogICAgDQogIHJldHVybiBzdC5zcGxpdCgnLCcpOw0KfQ0KDQpmdW5jdGlvbiBzZXJpYWxpemV" + 
"OYW1lcyhhcnIpIHsNCg0KICAvL3JldHVybiBhcnIuc29ydCgpLmpvaW4oJywnKTsNCiAgcmV0dXJ" + 
"uIGFyci5qb2luKCcsJyk7DQp9DQoNCmZ1bmN0aW9uIHVwZGF0ZVNldHMoKSB7DQoNCiAgdmFyIHN" + 
"ldEFycmF5ID0gZ2V0U2V0Q29va2llKCk7DQogIA0KICBpZiAoc2V0QXJyYXkubGVuZ3RoID09IDA" + 
"pIHsNCiAgICBzZXRDb29raWUoJ2RiZGJmaWx0ZXJfc2V0cycsICIxLDEsMSwxIiwgMzY1KTsNCiA" + 
"gfSBlbHNlIHsNCiAgICAgICAgICAgICAgDQogICAgZW5hYmxlZEFsbCA9IChzZXRBcnJheVswXSA" + 
"9PSAiMSIpID8gMSA6IDA7DQogICAgaW5maW5pdGVTY3JvbGxpbmcgPSAoc2V0QXJyYXlbMV0gPT0" + 
"gIjEiKSA/IDEgOiAwOw0KICAgIGJsb2NrUmVjZWl2ZXIgPSAoc2V0QXJyYXlbMl0gPT0gIjEiKSA" + 
"/IDEgOiAwOw0KICAgIGZpbHRlckNvbW1lbnRzUGFnZSA9IChzZXRBcnJheVszXSA9PSAiMSIpID8" + 
"gMSA6IDA7DQogIH0NCiAgICAgICANCiAgaWYgKGVuYWJsZWRBbGwgPT0gMSkNCiAgICBkb2N1bWV" + 
"udC5nZXRFbGVtZW50QnlJZCgnY2hrRW5hYmxlZCcpLnNldEF0dHJpYnV0ZSgiY2hlY2tlZCIsICJ" + 
"jaGVja2VkIik7IA0KICBlbHNlDQogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Noa0VuYWJ" + 
"sZWQnKS5yZW1vdmVBdHRyaWJ1dGUoImNoZWNrZWQiKTsgIA0KICAgICAgICAgICAgIA0KICBpZiA" + 
"oaW5maW5pdGVTY3JvbGxpbmcgPT0gMSkNCiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2h" + 
"rU2Nyb2xsaW5nJykuc2V0QXR0cmlidXRlKCJjaGVja2VkIiwgImNoZWNrZWQiKTsgDQogIGVsc2U" + 
"NCiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hrU2Nyb2xsaW5nJykucmVtb3ZlQXR0cml" + 
"idXRlKCJjaGVja2VkIik7DQogICAgICAgICAgICAgICAgICANCiAgaWYgKGJsb2NrUmVjZWl2ZXI" + 
"gPT0gMSkNCiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hrUmVjZWl2ZXInKS5zZXRBdHR" + 
"yaWJ1dGUoImNoZWNrZWQiLCAiY2hlY2tlZCIpOyANCiAgZWxzZQ0KICAgIGRvY3VtZW50LmdldEV" + 
"sZW1lbnRCeUlkKCdjaGtSZWNlaXZlcicpLnJlbW92ZUF0dHJpYnV0ZSgiY2hlY2tlZCIpOw0KICA" + 
"gIA0KICBpZiAoZmlsdGVyQ29tbWVudHNQYWdlID09IDEpDQogICAgZG9jdW1lbnQuZ2V0RWxlbWV" + 
"udEJ5SWQoJ2Noa0NvbW1lbnRzJykuc2V0QXR0cmlidXRlKCJjaGVja2VkIiwgImNoZWNrZWQiKTs" + 
"NCiAgZWxzZQ0KICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGtDb21tZW50cycpLnJlbW9" + 
"2ZUF0dHJpYnV0ZSgiY2hlY2tlZCIpOw0KfQ0KDQpmdW5jdGlvbiB3cml0ZUJsb2NrTGlzdChldmV" + 
"udCwgbW9kZSwgY29udGVudCkgew0KICANCiAgaWYgKGNvbnRlbnQgPT0gImJsb2NrIikgew0KICA" + 
"gICAgICAgICAgICAgICANCiAgICB2YXIgYmxvY2tJRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUl" + 
"kKCdpbmZvX3N1YicpOw0KICAgIHZhciBjb250ZW50T3V0ID0gIiI7DQogICAgDQogICAgaWYgKCh" + 
"ldmVudCAhPSAiIikgJiYgKG1vZGUgPT0gMCkpIHsNCiAgICAgICAgICAgICAgICAgICANCiAgICA" + 
"gIC8vdmFyIGV2ZW50TnVtYmVyID0gZXZlbnQuc3Vic3RyaW5nKDQpOw0KICAgICAgdmFyIGV2ZW5" + 
"0TnVtYmVyID0gZXZlbnQgLSAxOw0KICAgICAgYmxhY2tMaXN0LnNwbGljZShldmVudE51bWJlciw" + 
"gMSk7DQogICAgfSBlbHNlIGlmIChtb2RlID09IDEpIHsgDQogICAgICBibGFja0xpc3QucHVzaCh" + 
"0cmltKGV2ZW50KSk7DQogICAgfQ0KICAgIA0KICAgIHNldEZpbHRlckNvb2tpZShibGFja0xpc3Q" + 
"pOw0KICAgIA0KICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxhY2tMaXN0Lmxlbmd0aDsgaSsrKSB" + 
"7DQogICAgDQogICAgICBjb250ZW50T3V0ICs9ICI8dHI+PHRkIHN0eWxlPVwid2lkdGg6IDE1MHB" + 
"4OyB0ZXh0LWFsaWduOiByaWdodDsgZm9udC1zaXplOjEycHg7IGZvbnQtd2VpZ2h0OiBib2xkXCI" + 
"+IiArIGJsYWNrTGlzdFtpXSArICI8L3RkPjx0ZD4mbmJzcDsmbmJzcDs8L3RkPjx0ZCBzdHlsZT1" + 
"cInZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCI+PGEgaHJlZj1cIiNcIiBvbkNsaWNrPVwidXBkYXR" + 
"lQmxvY2tMaXN0KCIrKGkrMSkrIiwwLCdibG9jaycpO3JldHVybiBmYWxzZVwiPjxmb250IHN0eWx" + 
"lPVwiY29sb3I6IHJlZDsgZm9udC1zaXplOjE4cHg7IGZvbnQtd2VpZ2h0OiBib2xkXCI+eDwvZm9" + 
"udD48L2E+PC90ZD48L3RyPiI7DQogICAgfQ0KICAgIA0KICAgIGlmIChjb250ZW50T3V0ID09ICI" + 
"iKSB7DQogICAgDQogICAgICBjb250ZW50T3V0ID0gIjxkaXYgc3R5bGU9XCJmb250LXNpemU6MTZ" + 
"weDsgbWFyZ2luOiAycHggNSUgOHB4O1wiPllvdXIgYmxvY2sgbGlzdDo8L2Rpdj48dGFibGUgc3R" + 
"5bGU9XCJ3aWR0aDogMTUwcHg7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XCI+PHRyPjx0ZCB" + 
"zdHlsZT1cIndpZHRoOiAxNTBweDsgdGV4dC1hbGlnbjogcmlnaHQ7IGZvbnQtc2l6ZToxNXB4OyB" + 
"mb250LXdlaWdodDogYm9sZFwiPi4uLiBpcyBlbXB0eS48L3RkPjwvdHI+PC90YWJsZT48YnI+Ijs" + 
"NCiAgICB9IGVsc2UNCiAgICAgIGNvbnRlbnRPdXQgPSAiPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTo" + 
"xNnB4OyBtYXJnaW46IDJweCA1JSA4cHg7XCI+WW91ciBibG9jayBsaXN0OjwvZGl2Pjx0YWJsZSB" + 
"zdHlsZT1cIndpZHRoOiAxNTBweDsgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcIj4iICsgY29" + 
"udGVudE91dCArICI8L3RhYmxlPjxicj4iOw0KICAgIA0KICAgIGNvbnRlbnRPdXQgKz0gIjxkaXY" + 
"gc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IGZvbnQtc2l6ZToxMXB4XCI+TmFtZXMgaGF2ZSB" + 
"0byBiZSBjYXNlLXNlbnNpdGl2ZTwvc3Bhbj4iDQogICAgICAgICAgICAgICAgICAgICAgICAgICA" + 
"gDQogICAgYmxvY2tJRC5pbm5lckhUTUwgPSBjb250ZW50T3V0Ow0KICB9IGVsc2UgaWYgKGNvbnR" + 
"lbnQgPT0gImZhdnMiKSB7DQogIA0KICAgIHZhciBmYXZzSUQgPSBkb2N1bWVudC5nZXRFbGVtZW5" + 
"0QnlJZCgnaW5mb19zdWJfZmF2Jyk7DQogICAgdmFyIGNvbnRlbnRPdXQgPSAiIjsNCiAgICANCiA" + 
"gICBpZiAoKGV2ZW50ICE9ICIiKSAmJiAobW9kZSA9PSAwKSkgew0KICAgICAgICAgICAgICAgICA" + 
"gIA0KICAgICAgdmFyIGV2ZW50TnVtYmVyID0gZXZlbnQgLSAxOw0KICAgICAgZmF2TGlzdC5zcGx" + 
"pY2UoZXZlbnROdW1iZXIsIDEpOw0KICAgIH0gZWxzZSBpZiAobW9kZSA9PSAxKSB7IA0KICAgICA" + 
"gZmF2TGlzdC5wdXNoKHRyaW0oZXZlbnQpKTsNCiAgICB9DQogICAgDQogICAgc2V0RmF2c0Nvb2t" + 
"pZShmYXZMaXN0KTsNCiAgICANCiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZhdkxpc3QubGVuZ3R" + 
"oOyBpKyspIHsNCiAgICANCiAgICAgIGNvbnRlbnRPdXQgKz0gIjx0cj48dGQgc3R5bGU9XCJ3aWR" + 
"0aDogMTUwcHg7IHRleHQtYWxpZ246IHJpZ2h0OyBmb250LXNpemU6MTJweDsgZm9udC13ZWlnaHQ" + 
"6IGJvbGRcIj4iICsgZmF2TGlzdFtpXSArICI8L3RkPjx0ZD4mbmJzcDsmbmJzcDs8L3RkPjx0ZCB" + 
"zdHlsZT1cInZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCI+PGEgaHJlZj1cIiNcIiBvbkNsaWNrPVw" + 
"idXBkYXRlQmxvY2tMaXN0KCIrKGkrMSkrIiwwLCdmYXZzJyk7cmV0dXJuIGZhbHNlXCI+PGZvbnQ" + 
"gc3R5bGU9XCJjb2xvcjogcmVkOyBmb250LXNpemU6MThweDsgZm9udC13ZWlnaHQ6IGJvbGRcIj5" + 
"4PC9mb250PjwvYT48L3RkPjwvdHI+IjsNCiAgICB9DQogICAgDQogICAgaWYgKGNvbnRlbnRPdXQ" + 
"gPT0gIiIpIHsNCiAgICANCiAgICAgIGNvbnRlbnRPdXQgPSAiPGRpdiBzdHlsZT1cImZvbnQtc2l" + 
"6ZToxNnB4OyBtYXJnaW46IDJweCA1JSA4cHg7XCI+RmF2b3VyaXRlIGZvbGxvd2luZzo8L2Rpdj4" + 
"8dGFibGUgc3R5bGU9XCJ3aWR0aDogMTUwcHg7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XCI" + 
"+PHRyPjx0ZCBzdHlsZT1cIndpZHRoOiAxNTBweDsgdGV4dC1hbGlnbjogcmlnaHQ7IGZvbnQtc2l" + 
"6ZToxNXB4OyBmb250LXdlaWdodDogYm9sZFwiPi4uLiBub2JvZHkuPC90ZD48L3RyPjwvdGFibGU" + 
"+PGJyPiI7DQogICAgfSBlbHNlDQogICAgICBjb250ZW50T3V0ID0gIjxkaXYgc3R5bGU9XCJmb25" + 
"0LXNpemU6MTZweDsgbWFyZ2luOiAycHggNSUgOHB4O1wiPkZhdm91cml0ZSBmb2xsb3dpbmc6PC9" + 
"kaXY+PHRhYmxlIHN0eWxlPVwid2lkdGg6IDE1MHB4OyBib3JkZXItY29sbGFwc2U6IGNvbGxhcHN" + 
"lO1wiPiIgKyBjb250ZW50T3V0ICsgIjwvdGFibGU+PGJyPiI7DQogICAgDQogICAgY29udGVudE9" + 
"1dCArPSAiPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgZm9udC1zaXplOjExcHhcIj5" + 
"OYW1lcyBoYXZlIHRvIGJlIGNhc2Utc2Vuc2l0aXZlPC9zcGFuPiINCiAgICAgICAgICAgICAgICA" + 
"gICAgICAgICAgICANCiAgICBmYXZzSUQuaW5uZXJIVE1MID0gY29udGVudE91dDsNCiAgfQ0KfQ0" + 
"KDQpmdW5jdGlvbiB1cGRhdGVCbG9ja0xpc3QoZXZlbnQsIG1vZGUsIGNvbnRlbnQpIHsNCiAgDQo" + 
"gIGlmIChjb250ZW50ID09ICJibG9jayIpIHsNCiAgDQogICAgaWYgKChtb2RlID09IDApIHx8ICh" + 
"ldmVudCA9PSAiIikpIHsNCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA0KICAgICA" + 
"gd3JpdGVCbG9ja0xpc3QoZXZlbnQsIG1vZGUsIGNvbnRlbnQpOw0KICAgICAgalEuZmFjZWJveCh" + 
"7IGRpdjogJyNpbmZvQmxvY2snIH0pOw0KICAgIH0gZWxzZSBpZiAoKG1vZGUgPT0gMSkgJiYgKGV" + 
"2ZW50LmlucHV0Ym94LnZhbHVlICE9ICIiKSkgew0KICAgICAgDQogICAgICB2YXIgdmFsdWVTZWx" + 
"lY3QgPSB0cmltKGV2ZW50LmlucHV0Ym94LnZhbHVlKTsNCiAgICAgIA0KICAgICAgaWYgKGpRLml" + 
"uQXJyYXkodmFsdWVTZWxlY3QsIGJsYWNrTGlzdCkgPT0gLTEpIHsNCiAgDQogICAgICAgIHdyaXR" + 
"lQmxvY2tMaXN0KHZhbHVlU2VsZWN0LCBtb2RlLCBjb250ZW50KTsNCiAgICAgICAgalEuZmFjZWJ" + 
"veCh7IGRpdjogJyNpbmZvQmxvY2snIH0pOw0KICAgICAgfSANCiAgICB9DQogIH0gZWxzZSBpZiA" + 
"oY29udGVudCA9PSAiZmF2cyIpIHsNCiAgDQogICAgaWYgKChtb2RlID09IDApIHx8IChldmVudCA" + 
"9PSAiIikpIHsNCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA0KICAgICAgd3JpdGV" + 
"CbG9ja0xpc3QoZXZlbnQsIG1vZGUsIGNvbnRlbnQpOw0KICAgICAgalEuZmFjZWJveCh7IGRpdjo" + 
"gJyNpbmZvRmF2cycgfSk7DQogICAgfSBlbHNlIGlmICgobW9kZSA9PSAxKSAmJiAoZXZlbnQuaW5" + 
"wdXRib3hmYXZzLnZhbHVlICE9ICIiKSkgew0KICAgICAgDQogICAgICB2YXIgdmFsdWVTZWxlY3Q" + 
"gPSB0cmltKGV2ZW50LmlucHV0Ym94ZmF2cy52YWx1ZSk7DQogICAgICANCiAgICAgIGlmIChqUS5" + 
"pbkFycmF5KHZhbHVlU2VsZWN0LCBmYXZMaXN0KSA9PSAtMSkgew0KICANCiAgICAgICAgd3JpdGV" + 
"CbG9ja0xpc3QodmFsdWVTZWxlY3QsIG1vZGUsIGNvbnRlbnQpOw0KICAgICAgICBqUS5mYWNlYm9" + 
"4KHsgZGl2OiAnI2luZm9GYXZzJyB9KTsNCiAgICAgIH0gDQogICAgfQ0KICB9DQp9DQoNCmZ1bmN" + 
"0aW9uIGhhbmRsZUtQcmVzcyhmb3JtLCBldmVudCwgY29udGVudCkgew0KDQogIHZhciBjaGFyQzs" + 
"NCiAgICANCiAgaWYgKGV2ZW50ICYmIGV2ZW50LndoaWNoKXsNCiAgICBjaGFyQyA9IGV2ZW50Lnd" + 
"oaWNoOw0KICB9IGVsc2UgaWYgKHdpbmRvdy5ldmVudCl7DQogICAgZXZlbnQgPSB3aW5kb3cuZXZ" + 
"lbnQ7DQogICAgY2hhckMgPSBldmVudC5rZXlDb2RlOw0KICB9DQoNCiAgaWYgKGNoYXJDID09IDE" + 
"zKQ0KICAgIHVwZGF0ZUJsb2NrTGlzdChmb3JtLCAxLCBjb250ZW50KTsgICAgICANCn0gDQoNCmZ" + 
"1bmN0aW9uIHNob3dGYXZDb250ZW50KGlkKSB7ICANCiAgICAgICAgICAgICAgICAgICAgICAgICA" + 
"gICAgICAgIA0KICAkKCIjZmF2TGlzdF8iK2lkKS5mYWRlSW4oInNsb3ciKTsNCn0NCg0KZnVuY3R" + 
"pb24gaGlkZUZhdkNvbnRlbnQoaWQpIHsNCg0KICAkKCIjZmF2TGlzdF8iK2lkKS5mYWRlT3V0KCJ" + 
"zbG93Iik7DQp9DQoNCmZ1bmN0aW9uIGluZmluaXR5RmF2cyhpbmZpbml0eUlucHV0KSB7DQoNCiA" + 
"gdmFyIGlucHV0ID0gaW5maW5pdHlJbnB1dCArICIiOw0KICB2YXIgb3V0cHV0ID0gIiI7DQogIA0" + 
"KICB2YXIgZmVlZENvbnRlbnQgPSBuZXcgQXJyYXkoKTsNCiAgDQogIHZhciBpbnB1dFNlYXJjaCA" + 
"9IGlucHV0LmluZGV4T2YoIjxsaSAiKTsgDQogIHZhciBvdXRwdXRTZWFyY2ggPSBpbnB1dC5pbmR" + 
"leE9mKCI8L2xpPiIpOw0KICANCiAgd2hpbGUgKChpbnB1dFNlYXJjaCA+PSAwKSAmJiAob3V0cHV" + 
"0U2VhcmNoID49IDApKSB7DQogICAgDQogICAgZmVlZENvbnRlbnQucHVzaChpbnB1dC5zdWJzdHJ" + 
"pbmcoaW5wdXRTZWFyY2gsIChvdXRwdXRTZWFyY2ggKyA1KSkpOw0KICAgIA0KICAgIGlucHV0ID0" + 
"gaW5wdXQuc3Vic3RyaW5nKChvdXRwdXRTZWFyY2ggKyA1KSkgKyAiIjsNCiAgICANCiAgICBpbnB" + 
"1dFNlYXJjaCA9IGlucHV0LmluZGV4T2YoIjxsaSAiKTsNCiAgICBvdXRwdXRTZWFyY2ggPSBpbnB" + 
"1dC5pbmRleE9mKCI8L2xpPiIpOw0KICB9DQogIA0KICBmZWVkQ29udGVudC5wdXNoKGlucHV0KTs" + 
"NCiAgICAgICAgICAgICAgDQogIGZvciAodmFyIGkgPSAwOyBpIDwgZmVlZENvbnRlbnQubGVuZ3R" + 
"oOyBpKyspIHsNCiAgICANCiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGZhdkxpc3QubGVuZ3RoOyB" + 
"qKyspIHsNCiAgICAgIA0KICAgICAgdmFyIGJsb2NrUmVjZWl2ZXJGb3VuZCA9IGZhbHNlOw0KICA" + 
"gICAgICAgICAgICAgICAgICANCiAgICAgIGlmIChibG9ja1JlY2VpdmVyKSB7DQogICAgICANCiA" + 
"gICAgICAgaWYgKChmZWVkQ29udGVudFtpXS5pbmRleE9mKA0KICAgICAgICAgICAgIjxhIGhyZWY" + 
"9XCIvIitibGFja0xpc3Rbal0rIlwiPiIrYmxhY2tMaXN0W2pdKyInczwvYT4iKSA+PSAwKSB8fA0" + 
"KICAgICAgICAgICAgICAgIChmZWVkQ29udGVudFtpXS5pbmRleE9mKA0KICAgICAgICAgICAgICA" + 
"gICI8YSBocmVmPVwiLyIrYmxhY2tMaXN0W2pdKyJcIiByZWw9XCJub3JlZmVycmVyXCI+IitibGF" + 
"ja0xpc3Rbal0rIidzPC9hPiIpID49IDApKQ0KICAgICAgICAgIGJsb2NrUmVjZWl2ZXJGb3VuZCA" + 
"9IHRydWU7ICAgICAgDQogICAgICB9ICAgICAgICAgICAgICAgDQogICAgICANCiAgICAgIGlmICg" + 
"oKGZlZWRDb250ZW50W2ldLmluZGV4T2YoDQogICAgICAgICAgImhyZWY9XCIvIitmYXZMaXN0W2p" + 
"dKyJcIj4iK2Zhdkxpc3Rbal0rIjwvYT4iKSA+PSAwKQ0KICAgICAgICAgICAgICB8fCAoZmVlZEN" + 
"vbnRlbnRbaV0uaW5kZXhPZigNCiAgICAgICAgICAgICAgICAgICJcIiBocmVmPVwiLyIrZmF2TGl" + 
"zdFtqXSsiXCIgcmVsPVwibm9yZWZlcnJlclwiPiIrZmF2TGlzdFtqXSsiPC9hPiIpID49IDApKQ0" + 
"KICAgICAgICAgICAgICAmJiAoYmxvY2tSZWNlaXZlckZvdW5kID09IGZhbHNlKSkgew0KICAgICA" + 
"gICANCiAgICAgICAgaWYgKGpRLmluQXJyYXkoZmF2TGlzdFtqXSwgZmF2c0ZvdW5kQXJyYXkpID0" + 
"9IC0xKSB7DQogICAgICAgIA0KICAgICAgICAgIGZhdnNGb3VuZEFycmF5LnB1c2goZmF2TGlzdFt" + 
"qXSk7DQogICAgICAgICAgDQogICAgICAgICAgdmFyIGZlZWRJRCA9IGdldEVsZW1lbnRzQnlDbGF" + 
"zc0FsdCgiZmVlZCIpWzBdOw0KICAgICAgICAgIA0KICAgICAgICAgIHZhciBsaVNlYXJjaCA9IGZ" + 
"lZWRDb250ZW50W2ldLmluZGV4T2YoIjwvZGl2PjwvbGk+Iik7DQogICAgICAgICAgdmFyIGxpQ2x" + 
"vc2UgPSAiIjsNCiAgICAgICAgICAgICAgICAgICAgICAgIA0KICAgICAgICAgIGlmIChsaVNlYXJ" + 
"jaCA8IDApIHsNCiAgICAgICAgICANCiAgICAgICAgICAgIGxpU2VhcmNoID0gZmVlZENvbnRlbnR" + 
"baV0uaW5kZXhPZigiPC9saT4iKTsNCiAgICAgICAgICAgIGxpQ2xvc2UgPSAiPC9saT4iOw0KICA" + 
"gICAgICAgIH0gZWxzZSB7DQogICAgICAgICAgICBsaUNsb3NlID0gIjwvZGl2PjwvbGk+IjsNCiA" + 
"gICAgICAgICB9DQogICAgICAgICAgDQogICAgICAgICAgdmFyIGZlZWRDb250ZW50U3ViID0gZmV" + 
"lZENvbnRlbnRbaV0uc3Vic3RyaW5nKDAsIGxpU2VhcmNoKTsNCiAgICAgICAgICB2YXIgZmVlZEN" + 
"vbnRlbnRTdWIyID0gZmVlZENvbnRlbnRTdWIgKyAiPGRpdiBpZD1cInBsdXNNaW51c18iK2orIlw" + 
"iIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48YnI+PHA+PGEgaHJlZj1cImphdmFzY3JpcHQ6c2h" + 
"vd0ZhdkNvbnRlbnQoIitqKyIpXCI+PGZvbnQgc3R5bGU9XCJjb2xvcjojNDQwMDAwO2ZvbnQtc2l" + 
"6ZToyNnB4XCI+KzwvZm9udD48L2E+IDxhIGhyZWY9XCJqYXZhc2NyaXB0OmhpZGVGYXZDb250ZW5" + 
"0KCIraisiKVwiPjxmb250IHN0eWxlPVwiY29sb3I6IzAwMDAwMDtmb250LXNpemU6MjZweFwiPi0" + 
"8L2ZvbnQ+PC9hPjwvcD48ZGl2IGlkPVwiZmF2UElEXyIraisiXCI+PC9kaXY+PC9kaXY+IiArIGx" + 
"pQ2xvc2U7DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA" + 
"gICAgICAgICAgICAgICAgICAgIA0KICAgICAgICAgIGZlZWRJRC5pbm5lckhUTUwgKz0gZmVlZEN" + 
"vbnRlbnRTdWIyOw0KDQogICAgICAgICAgdmFyIHVuZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWx" + 
"lbWVudCgiZGl2Iik7DQogICAgICAgICAgDQogICAgICAgICAgdW5kZXJEaXYuc2V0QXR0cmlidXR" + 
"lKCJpZCIsICJmYXZMaXN0XyIgKyBqKTsNCiAgICAgICAgICB1bmRlckRpdi5zZXRBdHRyaWJ1dGU" + 
"oInN0eWxlIiwgImRpc3BsYXk6IG5vbmU7Iik7DQogICAgICAgICAgdW5kZXJEaXYuaW5uZXJIVE1" + 
"MID0gIjxkaXY+PC9kaXY+PGRpdj48cD48YSBocmVmPVwiamF2YXNjcmlwdDpoaWRlRmF2Q29udGV" + 
"udCgiK2orIilcIj48Zm9udCBzdHlsZT1cImNvbG9yOiMwMDAwMDA7Zm9udC13ZWlnaHQ6Ym9sZDt" + 
"mb250LXNpemU6MzBweFwiPi08L2ZvbnQ+PC9hPjwvcD48L2Rpdj4iOw0KICAgICAgICAgIA0KICA" + 
"gICAgICAgIGZlZWRJRC5hcHBlbmRDaGlsZCh1bmRlckRpdik7IA0KICAgICAgICB9IGVsc2Ugew0" + 
"KICAgICAgICAgIA0KICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwbHVzTWludXN" + 
"fIiArIGopLnNldEF0dHJpYnV0ZSgic3R5bGUiLCAiIik7DQogICAgICAgICAgJCgiI3BsdXNNaW5" + 
"1c18iICsgaikuZmFkZUluKCJzbG93Iik7DQogICAgICAgICAgDQogICAgICAgICAgdmFyIGVsZUd" + 
"ldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJmYXZMaXN0XyIgKyBqKTsNCiAgICAgICAgICB" + 
"2YXIgZWxlR2V0UCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJmYXZQSURfIiArIGopOw0KICA" + 
"gICAgICAgIA0KICAgICAgICAgIGVsZUdldFAuaW5uZXJIVE1MID0gIjxmb250IHN0eWxlPVwiY29" + 
"sb3I6Izk5MDAwMDtmb250LXNpemU6MzBweFwiPiIrIChlbGVHZXQuZmlyc3RDaGlsZC5jaGlsZE5" + 
"vZGVzLmxlbmd0aCArIDEpICsiPC9mb250PiI7DQogICAgICAgICAgZWxlR2V0LmZpcnN0Q2hpbGQ" + 
"uaW5uZXJIVE1MICs9IGZlZWRDb250ZW50W2ldOyANCiAgICAgICAgfQ0KICAgICAgDQogICAgICA" + 
"gIG91dHB1dCA9ICJsb2wiOw0KICAgICAgDQogICAgICAgIGJyZWFrOw0KICAgICAgfQ0KICAgIH0" + 
"NCiAgfQ0KICANCiAgcmV0dXJuIG91dHB1dDsNCn0NCg0KZnVuY3Rpb24gc2V0TmV3RmF2Q29udGV" + 
"udCgpIHsNCg0KICBpZiAoeG1sSHR0cC5yZWFkeVN0YXRlID09IDQpIHsNCiAgICAgICAgICANCiA" + 
"gICB2YXIgZEJDb250ZW50ID0geG1sSHR0cC5yZXNwb25zZVRleHQ7DQogICAgICAgICAgICAgICA" + 
"gICAgICAgIA0KICAgIGlmIChkQkNvbnRlbnQpIHsNCiAgICAgIA0KICAgICAgZmF2TGlzdCA9IGd" + 
"ldEZhdnNDb29raWUoKTsNCiAgICAgICAgICAgICAgICAgICAgICAgICAgDQogIAkJdmFyIGRCZmV" + 
"lZE9wZW4gPSBkQkNvbnRlbnQuc2VhcmNoKCI8dWwgY2xhc3M9XCJmZWVkXCI+Iik7DQogIAkJZEJ" + 
"Db250ZW50ID0gZEJDb250ZW50LnN1YnN0cmluZygoZEJmZWVkT3BlbiArIDE3KSk7DQogIAkJdmF" + 
"yIGRCZmVlZENsb3NlID0gZEJDb250ZW50LnNlYXJjaCgiPC91bD4iKTsgICAgDQogIAkJZEJDb25" + 
"0ZW50ID0gZEJDb250ZW50LnN1YnN0cmluZygwLCAoZEJmZWVkQ2xvc2UgLSA1KSk7DQogIAkJDQo" + 
"gIAkJdmFyIGZpbHRlck1lbnVlID0gZEJDb250ZW50LnNlYXJjaCgiPGRpdiBpZD1cInBhZ2luYXR" + 
"pb25cIj4iKTsNCiAgCQkvL2RCQ29udGVudCA9IGRCQ29udGVudC5zdWJzdHJpbmcoMCwgKGZpbHR" + 
"lck1lbnVlIC0gMjEpKTsNCiAgICAgIGRCQ29udGVudCA9IGRCQ29udGVudC5zdWJzdHJpbmcoMCw" + 
"gZmlsdGVyTWVudWUpOw0KICAgICAgICAgICAgICAgICAgICAgICANCiAgICAgIHZhciBmaWx0ZXJ" + 
"lZE91dHB1dCA9IGluZmluaXR5RmF2cyhkQkNvbnRlbnQpOw0KICAgICAgDQogICAgICBpZiAoZml" + 
"sdGVyZWRPdXRwdXQgIT0gIiIpDQogICAgICAgIGZhdnNGb3VuZCA9IHRydWU7DQogICAgICANCiA" + 
"gICAgIHVwZGF0ZURvbmVGYXZzID0gdHJ1ZTsgICAgIA0KICAgIH0gDQogIH0NCn0gICAgICANCg0" + 
"KZnVuY3Rpb24gd3JpdGVJbmZpbml0eUZhdnNDbGljaygpIHsNCg0KICBpZiAoZmF2UnVubmluZyA" + 
"9PSBmYWxzZSkgeyANCiAgDQogICAgJCgiI2xvYWRpbmdTcmNJbWciKS5mYWRlSW4oInNsb3ciKTs" + 
"NCiAgICB3cml0ZUluZmluaXR5RmF2cygpOw0KICB9DQp9DQoNCmZ1bmN0aW9uIHNldEZhdlBhdXN" + 
"lKCkgew0KDQogIGlmIChwYXVzZUZhdnMpIHsNCiAgDQogICAgJCgiI2xvYWRpbmdTcmNJbWciKS5" + 
"mYWRlSW4oInNsb3ciKTsNCiAgICAkKCIjbG9hZGluZ1NyY1BhdXNlZCIpLmZhZGVPdXQoInNsb3c" + 
"iKTsNCiAgICANCiAgICBwYXVzZUZhdnMgPSBmYWxzZTsgICAgICAgICAgICAgICAgICAgIA0KICB" + 
"9IGVsc2Ugew0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICANCiAgICAkKCI" + 
"jbG9hZGluZ1NyY0ltZyIpLmZhZGVPdXQoInNsb3ciKTsNCiAgICAkKCIjbG9hZGluZ1NyY1BhdXN" + 
"lZCIpLmZhZGVJbigic2xvdyIpOw0KICAgIA0KICAgIHBhdXNlRmF2cyA9IHRydWU7DQogIH0NCn0" + 
"NCg0KZnVuY3Rpb24gd3JpdGVJbmZpbml0eUZhdnMoKSB7DQogIA0KICBpZiAoKGZhdlJ1bm5pbmc" + 
"pICYmIChwYXVzZUZhdnMpKSB7DQogIA0KICAgIHNldFRpbWVvdXQoIndyaXRlSW5maW5pdHlGYXZ" + 
"zKCkiLCA1MDApOw0KICAgIHJldHVybjsNCiAgfQ0KICANCiAgZmF2UnVubmluZyA9IHRydWU7DQo" + 
"gIHZhciBzdGF0SWRDb250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInN0YXRJRCIpOw0KICA" + 
"NCiAgaWYgKHN0YXRJZENvbnQgIT0gbnVsbCkNCiAgICBzdGF0SWRDb250LmlubmVySFRNTCA9ICI" + 
"iOw0KICANCiAgaWYgKGZhdlN0YW5kYnkgPT0gZmFsc2UpIHsNCiAgDQogICAgZ2V0RWxlbWVudHN" + 
"CeUNsYXNzQWx0KCJmZWVkIilbMF0uaW5uZXJIVE1MID0gIjxwIHN0eWxlPVwiZm9udC1zaXplOjE" + 
"4cHg7bWFyZ2luLXRvcDoxMHB4O1wiPkZhdm91cml0ZSBmb2xsb3dpbmc6PC9wPiI7DQogICAgZmF" + 
"2U3RhbmRieSA9IHRydWU7DQogIH0NCiAgDQogIGlmIChmYXZzRU9MKSB7DQogIA0KICAgIGdldEV" + 
"sZW1lbnRzQnlDbGFzc0FsdCgiZmVlZCIpWzBdLmlubmVySFRNTCA9ICI8cCBzdHlsZT1cImZvbnQ" + 
"tc2l6ZToxOHB4O21hcmdpbi10b3A6MTBweDtcIj5GYXZvdXJpdGUgZm9sbG93aW5nOjwvcD4iOw0" + 
"KICAgIGZhdnNFT0wgPSBmYWxzZTsNCiAgfQ0KICAgICAgICAgICAgICAgICAgDQogIHZhciB1cmw" + 
"gPSAiaHR0cDovL2RhaWx5Ym9vdGguY29tL2Rhc2hib2FyZC8iOw0KICAgICAgICAgICAgICANCiA" + 
"gaWYgKCh1cGRhdGVEb25lRmF2cykgJiYgKGZhdkxpbWl0SSA8IGZhdkxpbWl0KSkgew0KICAgICA" + 
"gIA0KICAgIHhtbEh0dHAgPSBudWxsOw0KICAgIA0KICAgIHRyeSB7DQogICAgICB4bWxIdHRwID0" + 
"gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7DQogICAgfSBjYXRjaChlKSB7DQogICAgICB0cnkgew0KICA" + 
"gICAgICAgIHhtbEh0dHAgID0gbmV3IEFjdGl2ZVhPYmplY3QoIk1pY3Jvc29mdC5YTUxIVFRQIik" + 
"7DQogICAgICB9IGNhdGNoKGUpIHsNCiAgICAgICAgICB0cnkgew0KICAgICAgICAgICAgICB4bWx" + 
"IdHRwICA9IG5ldyBBY3RpdmVYT2JqZWN0KCJNc3htbDIuWE1MSFRUUCIpOw0KICAgICAgICAgIH0" + 
"gY2F0Y2goZSkgew0KICAgICAgICAgICAgICB4bWxIdHRwICA9IG51bGw7DQogICAgICAgICAgfQ0" + 
"KICAgICAgfQ0KICAgIH0NCiAgICANCiAgICBpZiAoeG1sSHR0cCkgew0KICAgICAgDQogICAgICB" + 
"1cGRhdGVEb25lRmF2cyA9IGZhbHNlOw0KICAgICAgICAgICAgICAgICAgIA0KICAgICAgeG1sSHR" + 
"0cC5vcGVuKCdHRVQnLCAodXJsICsgZmF2TGltaXRJKSwgdHJ1ZSk7DQogICAgICANCiAgICAgIHh" + 
"tbEh0dHAuc2V0UmVxdWVzdEhlYWRlcigiTWV0aG9kIiwgIkdFVCAiICsgKHVybCArIGZhdkxpbWl" + 
"0SSkgKyAiIEhUVFAvMS4xIik7DQogICAgICB4bWxIdHRwLnNldFJlcXVlc3RIZWFkZXIoDQogICA" + 
"gICAgICAgJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ" + 
"nKTsNCiAgICAgICAgICANCiAgICAgIHhtbEh0dHAuc2VuZChudWxsKTsNCiAgICAgIA0KICAgICA" + 
"geG1sSHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBzZXROZXdGYXZDb250ZW50Ow0KICAgICAgDQo" + 
"gICAgICBmYXZMaW1pdEkrKzsNCiAgICAgIA0KICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQ" + 
"oImxvYWRpbmdTdWJTdWIiKS5pbm5lckhUTUwgPSAoZmF2TGltaXQgLSBmYXZMaW1pdEkpOw0KICA" + 
"gICAgJCgiI2xvYWRpbmdPdXQiKS5mYWRlSW4oInNsb3ciKTsNCiAgICAgIA0KICAgICAgc2V0VGl" + 
"tZW91dCgid3JpdGVJbmZpbml0eUZhdnMoKSIsIDEpOw0KICAgIH0NCiAgfSBlbHNlIGlmIChmYXZ" + 
"MaW1pdEkgPT0gZmF2TGltaXQpIHsNCiAgDQogICAgJCgiI2xvYWRpbmdPdXQiKS5mYWRlT3V0KCJ" + 
"zbG93Iik7DQogIA0KICAgIHVwZGF0ZURvbmVGYXZzID0gdHJ1ZTsNCiAgICBmYXZMaW1pdEkgPSA" + 
"wOyAgICAgICAgICAgIA0KICAgIA0KICAgIC8qDQogICAgaWYgKGZhdnNGb3VuZCkgIA0KICAgICA" + 
"galEuZmFjZWJveCh7ZGl2OicjZmF2c091dCd9LCdncm9vdnknKTsNCiAgICBlbHNlICANCiAgICA" + 
"gIGpRLmZhY2Vib3goJ05vIGZhdnMgZm91bmQuJyk7DQogICAgKi8NCiAgICANCiAgICBpZiAoZmF" + 
"2c0ZvdW5kID09IGZhbHNlKQ0KICAgICAgZ2V0RWxlbWVudHNCeUNsYXNzQWx0KCJmZWVkIilbMF0" + 
"uaW5uZXJIVE1MICs9ICI8cD4uLi4gbm90aGluZyBmb3VuZC48L3A+IjsNCiAgICAgIA0KICAgIGZ" + 
"hdnNGb3VuZCA9IGZhbHNlOw0KICAgIGZhdnNFT0wgPSB0cnVlOw0KICAgIGZhdlJ1bm5pbmcgPSB" + 
"mYWxzZTsNCiAgfSBlbHNlIHsNCiAgICBzZXRUaW1lb3V0KCJ3cml0ZUluZmluaXR5RmF2cygpIiw" + 
"gMSk7DQogIH0gICAgICAgICANCn0NCg0KZnVuY3Rpb24gaW5maW5pdHlGaWx0ZXIyKGluZmluaXR" + 
"5SW5wdXQpIHsNCg0KICB2YXIgaW5wdXQgPSBpbmZpbml0eUlucHV0ICsgIiI7DQogIHZhciBvdXR" + 
"wdXQgPSAiIjsNCiAgDQogIHZhciBmZWVkQ29udGVudCA9IG5ldyBBcnJheSgpOw0KICANCiAgdmF" + 
"yIGlucHV0U2VhcmNoID0gaW5wdXQuaW5kZXhPZigiPGxpICIpOyANCiAgdmFyIG91dHB1dFNlYXJ" + 
"jaCA9IGlucHV0LmluZGV4T2YoIjwvbGk+Iik7DQogIA0KICB3aGlsZSAoKGlucHV0U2VhcmNoID4" + 
"9IDApICYmIChvdXRwdXRTZWFyY2ggPj0gMCkpIHsNCiAgICANCiAgICBmZWVkQ29udGVudC5wdXN" + 
"oKGlucHV0LnN1YnN0cmluZyhpbnB1dFNlYXJjaCwgKG91dHB1dFNlYXJjaCArIDUpKSk7DQogICA" + 
"gDQogICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcoKG91dHB1dFNlYXJjaCArIDUpKSArICIiOw0" + 
"KICAgIA0KICAgIGlucHV0U2VhcmNoID0gaW5wdXQuaW5kZXhPZigiPGxpICIpOw0KICAgIG91dHB" + 
"1dFNlYXJjaCA9IGlucHV0LmluZGV4T2YoIjwvbGk+Iik7DQogIH0NCiAgDQogIGZlZWRDb250ZW5" + 
"0LnB1c2goaW5wdXQpOw0KICANCiAgaWYgKHN0YXRQcmVSZSA9PSBmYWxzZSkgew0KICANCiAgICB" + 
"2YXIgaW5wdXRQcmUgPSBzdGF0UHJlLmluZGV4T2YoIj4sLiw8Iik7IA0KICAgIHZhciBvdXRwdXR" + 
"QcmUgPSBzdGF0UHJlLmluZGV4T2YoIjwsLiw+Iik7DQogICAgdmFyIHN0YXRDb3VudCA9IDA7DQo" + 
"gICAgDQogICAgd2hpbGUgKChpbnB1dFByZSA+PSAwKSAmJiAob3V0cHV0UHJlID49IDApKSB7DQo" + 
"gICAgICANCiAgICAgIHZhciBtaWRkUHJlID0gc3RhdFByZS5zdWJzdHJpbmcoKGlucHV0UHJlICs" + 
"gNSksIG91dHB1dFByZSk7DQogICAgICB2YXIgbWlkZFByZVNlYyA9IG1pZGRQcmUuaW5kZXhPZig" + 
"iLiwuIik7DQogICAgIA0KICAgICAgdmFyIG1pZGRQcmUyID0gbWlkZFByZS5zdWJzdHJpbmcoMCw" + 
"gbWlkZFByZVNlYyk7DQogICAgICB2YXIgbWlkZFByZTMgPSBtaWRkUHJlLnN1YnN0cmluZygobWl" + 
"kZFByZVNlYyArIDMpKTsNCiAgICAgIA0KICAgICAgc3RhdFtzdGF0Q291bnRdID0gbmV3IE9iamV" + 
"jdCgpOw0KICAgICAgc3RhdFtzdGF0Q291bnRdW21pZGRQcmUyXSA9IG1pZGRQcmUzOw0KICAgICA" + 
"gDQogICAgICBzdGF0UHJlID0gc3RhdFByZS5zdWJzdHJpbmcoKG91dHB1dFByZSArIDUpKSArICI" + 
"iOw0KICAgICAgDQogICAgICBpbnB1dFByZSA9IHN0YXRQcmUuaW5kZXhPZigiPiwuLDwiKTsNCiA" + 
"gICAgIG91dHB1dFByZSA9IHN0YXRQcmUuaW5kZXhPZigiPCwuLD4iKTsNCiAgICAgIA0KICAgICA" + 
"gc3RhdENvdW50Kys7DQogICAgfQ0KICAgIA0KICAgIHN0YXRQcmVSZSA9IHRydWU7DQogIH0NCiA" + 
"gICAgICAgICAgICAgDQogIGZvciAodmFyIGkgPSAwOyBpIDwgZmVlZENvbnRlbnQubGVuZ3RoOyB" + 
"pKyspIHsNCiAgICANCiAgICBpZiAoZmVlZENvbnRlbnRbaV0uaW5kZXhPZigiPGxpIGNsYXNzPVw" + 
"iY29tbWVudCIpID49IDApIHsNCiAgICANCiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYmxhY2t" + 
"MaXN0Lmxlbmd0aDsgaisrKSB7DQogICAgICAgIA0KICAgICAgICB2YXIgYmxvY2tSZWNlaXZlckZ" + 
"vdW5kID0gZmFsc2U7DQogICAgICAgICAgICAgICAgICAgICAgDQogICAgICAgIGlmIChibG9ja1J" + 
"lY2VpdmVyKSB7DQogICAgICAgIA0KICAgICAgICAgIGlmICgoZmVlZENvbnRlbnRbaV0uaW5kZXh" + 
"PZigNCiAgICAgICAgICAgICAgIjxhIGhyZWY9XCIvIitibGFja0xpc3Rbal0rIlwiPiIrYmxhY2t" + 
"MaXN0W2pdKyInczwvYT4iKSA+PSAwKSB8fA0KICAgICAgICAgICAgICAgICAgKGZlZWRDb250ZW5" + 
"0W2ldLmluZGV4T2YoDQogICAgICAgICAgICAgICAgICAiPGEgaHJlZj1cIi8iK2JsYWNrTGlzdFt" + 
"qXSsiXCIgcmVsPVwibm9yZWZlcnJlclwiPiIrYmxhY2tMaXN0W2pdKyInczwvYT4iKSA+PSAwKSk" + 
"NCiAgICAgICAgICAgIGJsb2NrUmVjZWl2ZXJGb3VuZCA9IHRydWU7ICAgICAgDQogICAgICAgIH0" + 
"gICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgICAgICANCiAgICAgICAgaWYgKCh" + 
"mZWVkQ29udGVudFtpXS5pbmRleE9mKA0KICAgICAgICAgICAgIlwiIGhyZWY9XCIvIitibGFja0x" + 
"pc3Rbal0rIlwiPiIrYmxhY2tMaXN0W2pdKyI8L2E+IikgPj0gMCkNCiAgICAgICAgICAgICAgICB" + 
"8fCAoZmVlZENvbnRlbnRbaV0uaW5kZXhPZigNCiAgICAgICAgICAgICAgICAgICAgIlwiIGhyZWY" + 
"9XCIvIitibGFja0xpc3Rbal0rIlwiIHJlbD1cIm5vcmVmZXJyZXJcIj4iK2JsYWNrTGlzdFtqXSs" + 
"iPC9hPiIpID49IDApDQogICAgICAgICAgICAgICAgfHwgKGJsb2NrUmVjZWl2ZXJGb3VuZCkpIHs" + 
"NCiAgICAgICAgDQogICAgICAgICAgZmVlZENvbnRlbnRbaV0gPSBudWxsOw0KICAgICAgICAgIA0" + 
"KICAgICAgICAgIHZhciBzdGF0Rm91bmQgPSBmYWxzZTsNCiAgICAgICAgICB2YXIgbCA9IDA7DQo" + 
"gICAgICAgICAgDQogICAgICAgICAgZm9yIChsID0gMDsgbCA8IHN0YXQubGVuZ3RoOyBsKyspIHs" + 
"NCiAgICAgICAgICAgIA0KICAgICAgICAgICAgaWYgKHN0YXRbbF1bIiIgKyBibGFja0xpc3Rbal1" + 
"dICE9IG51bGwpIHsNCiAgICAgICAgICAgIA0KICAgICAgICAgICAgICBzdGF0W2xdW2JsYWNrTGl" + 
"zdFtqXV0rKzsNCiAgICAgICAgICAgIA0KICAgICAgICAgICAgICBzdGF0Rm91bmQgPSB0cnVlOw0" + 
"KICAgICAgICAgICAgICBicmVhazsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICB9DQogICAgICA" + 
"gICAgDQogICAgICAgICAgaWYgKHN0YXRGb3VuZCA9PSBmYWxzZSkgew0KICAgICAgICAgIA0KICA" + 
"gICAgICAgICAgc3RhdFtsXSA9IG5ldyBPYmplY3QoKTsNCiAgICAgICAgICAgIHN0YXRbbF1bYmx" + 
"hY2tMaXN0W2pdXSA9IDE7DQogICAgICAgICAgfSAgDQogICAgICAgICAgDQogICAgICAgICAgYnJ" + 
"lYWs7DQogICAgICAgIH0NCiAgICAgIH0NCiAgICB9DQogIH0NCiAgDQogIGZvciAodmFyIGsgPSA" + 
"wOyBrIDwgZmVlZENvbnRlbnQubGVuZ3RoOyBrKyspIHsNCiAgICANCiAgICBpZiAoZmVlZENvbnR" + 
"lbnRba10gIT0gbnVsbCkgew0KICAgIA0KICAgICAgb3V0cHV0ICs9IGZlZWRDb250ZW50W2tdOw0" + 
"KICAgIH0NCiAgfQ0KICANCiAgcmV0dXJuIG91dHB1dDsNCn0NCg0KZnVuY3Rpb24gc2V0U3RhdCg" + 
"pIHsNCiAgDQogIHZhciBzdGF0T3V0ID0gIjxiPjxmb250IHN0eWxlPVwiY29sb3I6ICM2YTAwMDA" + 
"7XCI+QmxvY2tlZDwvZm9udD48L2I+IGNvbW1lbnRzOjxicj4iOw0KICANCiAgZm9yICh2YXIgaSA" + 
"9IDA7IGkgPCBzdGF0Lmxlbmd0aDsgaSsrKSB7DQogIA0KICAgIGZvciAodmFyIGtleSBpbiBzdGF" + 
"0W2ldKSB7DQogICAgDQogICAgICBzdGF0T3V0ID0gc3RhdE91dCArIGtleSArICI6ICIgKyBzdGF" + 
"0W2ldW2tleV0gKyAiPGJyPiI7DQogICAgfQ0KICB9IA0KICANCiAgdmFyIGNvbnQgPSBkb2N1bWV" + 
"udC5jcmVhdGVFbGVtZW50KCJwIik7DQogIGNvbnQuc2V0QXR0cmlidXRlKCJzdHlsZSIsICJ0ZXh" + 
"0LWFsaWduOiBjZW50ZXI7IGZvbnQtc2l6ZTogMTFweDsiKTsNCiAgY29udC5pbm5lckhUTUwgPSB" + 
"zdGF0T3V0Ow0KICANCiAgdmFyIHN0YXRTZXRQb2ludCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUl" + 
"kKCJzdGF0SUQiKTsNCiAgDQogIGlmIChzdGF0U2V0UG9pbnQuaGFzQ2hpbGROb2RlcygpKSB7DQo" + 
"gICAgc3RhdFNldFBvaW50LnJlbW92ZUNoaWxkKHN0YXRTZXRQb2ludC5maXJzdENoaWxkKTsNCiA" + 
"gfQ0KICANCiAgc3RhdFNldFBvaW50LmFwcGVuZENoaWxkKGNvbnQpOw0KfQ0KDQpmdW5jdGlvbiB" + 
"zZXROZXdEQkNvbnRlbnQoKXsNCgkgICAgICAgICAgICAgICANCiAgaWYgKHhtbEh0dHAucmVhZHl" + 
"TdGF0ZSA9PSA0KSB7DQogICAgICAgICAgICAgICANCiAgICB2YXIgZEJDb250ZW50ID0geG1sSHR" + 
"0cC5yZXNwb25zZVRleHQ7DQogICAgICAgICAgICAgICAgICAgICAgIA0KICAgIGlmIChkQkNvbnR" + 
"lbnQpIHsNCiAgICAgICAgICAgICAgICAgICAgICAgICAgDQoJCQl2YXIgZEJmZWVkT3BlbiA9IGR" + 
"CQ29udGVudC5zZWFyY2goIjx1bCBjbGFzcz1cImZlZWRcIj4iKTsNCgkJCWRCQ29udGVudCA9IGR" + 
"CQ29udGVudC5zdWJzdHJpbmcoKGRCZmVlZE9wZW4gKyAxNykpOw0KCQkJdmFyIGRCZmVlZENsb3N" + 
"lID0gZEJDb250ZW50LnNlYXJjaCgiPC91bD4iKTsgICAgDQoJCQlkQkNvbnRlbnQgPSBkQkNvbnR" + 
"lbnQuc3Vic3RyaW5nKDAsIChkQmZlZWRDbG9zZSAtIDUpKTsNCgkJCQ0KCQkJdmFyIGZpbHRlck1" + 
"lbnVlID0gZEJDb250ZW50LnNlYXJjaCgiPGRpdiBpZD1cInBhZ2luYXRpb25cIj4iKTsNCgkJCS8" + 
"vZEJDb250ZW50ID0gZEJDb250ZW50LnN1YnN0cmluZygwLCAoZmlsdGVyTWVudWUgLSAyMSkpOw0" + 
"KICAgICAgZEJDb250ZW50ID0gZEJDb250ZW50LnN1YnN0cmluZygwLCBmaWx0ZXJNZW51ZSk7DQo" + 
"gICAgICAgICAgICAgICAgICAgICAgIA0KICAgICAgdmFyIGZpbHRlcmVkT3V0cHV0ID0gaW5maW5" + 
"pdHlGaWx0ZXIyKGRCQ29udGVudCk7DQogICAgICANCiAgICAgIGlmIChzdGF0Lmxlbmd0aCA+IDA" + 
"pIHsNCiAgICAgIA0KICAgICAgICBzZXRTdGF0KCk7DQogICAgICB9DQogICAgICANCiAgICAgICQ" + 
"oIiNsb2FkaW5nT3V0IikuZmFkZU91dCgic2xvdyIpOw0KICAgICAgDQogICAgICBnZXRFbGVtZW5" + 
"0c0J5Q2xhc3NBbHQoImZlZWQiKVswXS5pbm5lckhUTUwgKz0gZmlsdGVyZWRPdXRwdXQ7DQogICA" + 
"gICANCiAgICAgIHVwZGF0ZURvbmUgPSB0cnVlOyAgICAgDQogICAgfSANCiAgfQ0KfQ0KCQkJCQ0" + 
"KZnVuY3Rpb24gZ2V0TmV3REJDb250ZW50KCkgew0KICANCiAgaWYgKGZhdlN0YW5kYnkpDQogICA" + 
"gcmV0dXJuOw0KICANCiAgdmFyIGNsaWVudEhlaWdodE9mZnNldCA9IGRvY3VtZW50LmRvY3VtZW5" + 
"0RWxlbWVudC5jbGllbnRIZWlnaHQ7DQogIHZhciBzY3JvbGxQb3M7DQogIA0KICBpZiAodHlwZW9" + 
"mIHdpbmRvdy5wYWdlWU9mZnNldCAhPSAndW5kZWZpbmVkJykgew0KICAgIHNjcm9sbFBvcyA9IHd" + 
"pbmRvdy5wYWdlWU9mZnNldDsNCiAgfQ0KICBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQuY29tcGF" + 
"0TW9kZSAhPSAndW5kZWZpbmVkJyAmJg0KICAgIGRvY3VtZW50LmNvbXBhdE1vZGUgIT0gJ0JhY2t" + 
"Db21wYXQnKSB7DQogICAgc2Nyb2xsUG9zID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9" + 
"sbFRvcDsNCiAgfQ0KICBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQuYm9keSAhPSAndW5kZWZpbmV" + 
"kJykgew0KICAgIHNjcm9sbFBvcyA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wOw0KICB9DQogIA0" + 
"KICBpZiAodXBkYXRlRG9uZSA9PSBudWxsKSB7DQogIA0KICAgIHVwZGF0ZURvbmUgPSB0cnVlOw0" + 
"KICB9DQogIA0KICBpZiAoKCgoZ2V0RG9jSGVpZ2h0KCkgLSBjbGllbnRIZWlnaHRPZmZzZXQpIC0" + 
"gc2Nyb2xsUG9zKSAgPD0gNTAwKSAmJiAodXBkYXRlRG9uZSkpIHsgICAgICAgICAgICAgICAgICA" + 
"gICAgICAgICAgICAgICAgIA0KICANCiAgICAvLyQoIiNsb2FkaW5nT3V0IikuZmFkZUluKCJzbG9" + 
"3Iik7DQogIA0KICAgIHZhciBkb2NVUkwgPSBkb2N1bWVudC5VUkwgfHwgd2luZG93LmxvY2F0aW9" + 
"uLmhyZWY7DQogICAgICAgICAgICAgICAgICAgICAgICAgIA0KICAgIGlmIChkb2NVUkwuaW5kZXh" + 
"PZigiZGFzaGJvYXJkL2NvbW1lbnRzIikgPj0gMCkgew0KICAgICAgdmFyIHVybCA9ICJodHRwOi8" + 
"vZGFpbHlib290aC5jb20vZGFzaGJvYXJkL2NvbW1lbnRzLyIgKyBuU2l0ZTsNCiAgICB9IGVsc2U" + 
"gew0KICAgICAgdmFyIHVybCA9ICJodHRwOi8vZGFpbHlib290aC5jb20vZGFzaGJvYXJkLyIgKyB" + 
"uU2l0ZTsNCiAgICB9DQogICAgICAgICAgIA0KICAJeG1sSHR0cCA9IG51bGw7DQogIAkNCiAgICB" + 
"0cnkgew0KICAgICAgeG1sSHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOw0KICAgIH0gY2F0Y2g" + 
"oZSkgew0KICAgICAgdHJ5IHsNCiAgICAgICAgICB4bWxIdHRwICA9IG5ldyBBY3RpdmVYT2JqZWN" + 
"0KCJNaWNyb3NvZnQuWE1MSFRUUCIpOw0KICAgICAgfSBjYXRjaChlKSB7DQogICAgICAgICAgdHJ" + 
"5IHsNCiAgICAgICAgICAgICAgeG1sSHR0cCAgPSBuZXcgQWN0aXZlWE9iamVjdCgiTXN4bWwyLlh" + 
"NTEhUVFAiKTsNCiAgICAgICAgICB9IGNhdGNoKGUpIHsNCiAgICAgICAgICAgICAgeG1sSHR0cCA" + 
"gPSBudWxsOw0KICAgICAgICAgIH0NCiAgICAgIH0NCiAgICB9DQogICAgDQogICAgaWYgKHhtbEh" + 
"0dHApIHsNCiAgICAgIA0KICAgICAgdXBkYXRlRG9uZSA9IGZhbHNlOw0KICAgICAgICAgICAgICA" + 
"gICAgIA0KICAgICAgeG1sSHR0cC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpOw0KICAgICAgDQogICA" + 
"gICB4bWxIdHRwLnNldFJlcXVlc3RIZWFkZXIoIk1ldGhvZCIsICJHRVQgIiArIHVybCArICIgSFR" + 
"UUC8xLjEiKTsNCiAgICAgIHhtbEh0dHAuc2V0UmVxdWVzdEhlYWRlcigNCiAgICAgICAgICAnQ29" + 
"udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpOw0KICAgICA" + 
"gICAgIA0KICAgICAgeG1sSHR0cC5zZW5kKG51bGwpOw0KICAgICAgDQogICAgICB4bWxIdHRwLm9" + 
"ucmVhZHlzdGF0ZWNoYW5nZSA9IHNldE5ld0RCQ29udGVudDsNCiAgICAgIA0KICAgICAgblNpdGU" + 
"rKzsNCiAgICB9IGVsc2Ugew0KICAgICAgLy8kKCIjbG9hZGluZ091dCIpLmZhZGVPdXQoInNsb3c" + 
"iKTsNCiAgICB9DQogIH0JCQkNCn0=";

function injectHeader() {
               
  var headID = document.getElementsByTagName('head')[0];         
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
                          
  var blStart = "var blackList = new Array(";
  var blEnd = ");";
  var blMid = "";
  var blString = "";
  
  if (blackList.length == 1) {
  
    blString = 'var blackList = new Array("' + blackList[0] + '");';
  } else if (blackList.length == 0) {
  
    blString = "var blackList = new Array();";
  } else {
    
    for (var i = 0; i < (blackList.length - 1); i++) {
    
      blMid += "\"" + blackList[i] + "\",";
    }
    
    blMid += "\"" + blackList[i] + "\"";
    blString = blStart + blMid + blEnd;
  }
  
  var favStart = "var favList = new Array(";
  var favEnd = ");";
  var favMid = "";
  var favString = "";
                   
  if (favList.length == 1) {
  
    favString = 'var favList = new Array("' + favList[0] + '");';
  } else if (favList.length == 0) {
  
    favString = "var favList = new Array();";
  } else {
    
    for (var i = 0; i < (favList.length - 1); i++) {
    
      favMid += "\"" + favList[i] + "\",";
    }
    
    favMid += "\"" + favList[i] + "\"";
    favString = favStart + favMid + favEnd;
  }
  
  if (enabledAll == 1) { 
    var setEnabledAll = "var enabledAll = 1;";
  } else {
    var setEnabledAll = "var enabledAll = 0;";
  }
  
  if (infiniteScrolling == 1) { 
    var setInfiniteScrolling = "var infiniteScrolling = 1;";
  } else {
    var setInfiniteScrolling = "var infiniteScrolling = 0;";
  }
  
  if (blockReceiver == 1) { 
    var setBlkStr = "var blockReceiver = 1;";
  } else {
    var setBlkStr = "var blockReceiver = 0;";
  }
  
  if (filterCommentsPage == 1) { 
    var setFilterCommentsPage = "var filterCommentsPage = 1;";
  } else {
    var setFilterCommentsPage = "var filterCommentsPage = 0;";
  }
                       
  newScript.innerHTML = blString + favString + "var statPre = \"" + statOut2 + "\";";
  newScript.innerHTML += setEnabledAll;
  newScript.innerHTML += setInfiniteScrolling;
  newScript.innerHTML += setBlkStr;
  newScript.innerHTML += setFilterCommentsPage;           
  newScript.innerHTML += decode64(baseOutput);
            
  headID.appendChild(newScript);
}
         
blackList = getFilterCookie();
favList = getFavsCookie();

var headID = document.getElementsByTagName('head')[0];         
var newScript = document.createElement('style');

newScript.setAttribute("type", "text/css");
newScript.innerHTML = fbcss;
newScript.innerHTML += "#container #header h1 a{display:block;margin:8px 0 0 18px;text-indent:-5000px;width:122px;height:37px;background:url('" + logoimg + "') no-repeat;}";                                                                                                                                                                                    
newScript.innerHTML += "#container #header.new ul.core_actions{margin-left:5px;float:left;}#container #header.new ul.core_actions li a{text-indent:-10000px;height:30px;color:white;text-decoration:none;display:block;background-image:url('" + btnimg + "');background-repeat:no-repeat;}";
newScript.innerHTML += "#container #header.new .right{width:390px;}";
newScript.innerHTML += "#relLoadNav a:hover{background-color:rgba(55,55,55,1);}";

headID.appendChild(newScript);

var navID = document.getElementById("header_notifications");         
var newScript = document.createElement('li'); 
//newScript.setAttribute("class", "");
newScript.innerHTML = "<div id=\"relLoadNav\"><a href=\"#infoBlock\" rel=\"facebox\"><span style=\"width:25px;display:block;background:url('" + blimg + "') top center no-repeat;\">Block</span></a></div>";

var newnew = document.createElement('li'); 
newnew.innerHTML = "<div id=\"relLoadNav\"><a href=\"#infoFavs\" rel=\"facebox\"><span style=\"width:25px;display:block;background:url('" + bl2img + "') top center no-repeat;\">Favourites</span></a></div>";

navID.insertBefore(newScript, navID.childNodes[2]);
navID.insertBefore(newnew, navID.childNodes[2]);
                     
var navBar = getElementsByClassAlt("top_tabs")[0];
     
if (navBar != null) {

  var navBarFavs = document.createElement('li');

  navBarFavs.setAttribute("class", "small ");     
  navBarFavs.innerHTML = "<a href=\"javascript:writeInfinityFavsClick()\">Favourites</a>";
  navBar.appendChild(navBarFavs);
} 
             
updateSets();
           
if ((filterCommentsPage == 0) && (docURL.indexOf("dashboard/comments") >= 0))
  blackList = new Array();

if (enabledAll == 0)
  filterRange = false;
           
if (filterRange) {
               
  if (infiniteScrolling == 1) {
  
    var menuSetPoint = document.getElementById("pagination");
    menuSetPoint.parentNode.removeChild(menuSetPoint);
  
    var newStat = document.createElement('div');
    
    newStat.setAttribute("id", "statID");
    newStat.setAttribute("style", "position: fixed; bottom: 2px;" +
        "text-align: left; border-collapse: collapse;");
  
    var bodyID = document.getElementById('promotion');
    bodyID.appendChild(newStat);
    
    var headID = document.getElementsByTagName('head')[0];         
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
                            
    var blStart = "var blackList = new Array(";
    var blEnd = ");";
    var blMid = "";
    var blString = "";
    
    if (blackList.length == 1) {
    
      blString = 'var blackList = new Array("' + blackList[0] + '");';
    } else if (blackList.length == 0) {
    
      blString = "var blackList = new Array();";
    } else {
      
      for (var i = 0; i < (blackList.length - 1); i++) {
      
        blMid += "\"" + blackList[i] + "\",";
      }
      
      blMid += "\"" + blackList[i] + "\"";
      blString = blStart + blMid + blEnd;
    }
    
    var favStart = "var favList = new Array(";
    var favEnd = ");";
    var favMid = "";
    var favString = "";
                     
    if (favList.length == 1) {
    
      favString = 'var favList = new Array("' + favList[0] + '");';
    } else if (favList.length == 0) {
    
      favString = "var favList = new Array();";
    } else {
      
      for (var i = 0; i < (favList.length - 1); i++) {
      
        favMid += "\"" + favList[i] + "\",";
      }
      
      favMid += "\"" + favList[i] + "\"";
      favString = favStart + favMid + favEnd;
    }
    
    normalScrolling();
    
    if (enabledAll == 1) { 
      var setEnabledAll = "var enabledAll = 1;";
    } else {
      var setEnabledAll = "var enabledAll = 0;";
    }
    
    if (infiniteScrolling == 1) { 
      var setInfiniteScrolling = "var infiniteScrolling = 1;";
    } else {
      var setInfiniteScrolling = "var infiniteScrolling = 0;";
    }
    
    if (blockReceiver == 1) { 
      var setBlkStr = "var blockReceiver = 1;";
    } else {
      var setBlkStr = "var blockReceiver = 0;";
    }
    
    if (filterCommentsPage == 1) { 
      var setFilterCommentsPage = "var filterCommentsPage = 1;";
    } else {
      var setFilterCommentsPage = "var filterCommentsPage = 0;";
    }
                         
    newScript.innerHTML = blString + favString + "var statPre = \"" + statOut2 + "\";";
    newScript.innerHTML += setEnabledAll;
    newScript.innerHTML += setInfiniteScrolling;
    newScript.innerHTML += setBlkStr;
    newScript.innerHTML += setFilterCommentsPage;           
    newScript.innerHTML += decode64(baseOutput);
    
    headID.appendChild(newScript);

    document.body.setAttribute(
        "onload", "setInterval('getNewDBContent();', 250);");
  } else {
  
    injectHeader();
    normalScrolling();          
  }
} else 
  injectHeader();