// Conquer Club - Card Counter, Card Redemption Value, Status Indicator
var versionString = "5.1.4";
// This monkey is now called:

/////    ////   /////
//  //  //  //  //  //
/////   //  //  /////
//  //  //  //  //  //
/////    ////   /////

// PLEASE READ ALL THE COMMENTS AT THE START OF THIS FILE BEFORE EDITING

//-----------------------------------------------------------------------------
// Installation
//-----------------------------------------------------------------------------
// This is a Greasemonkey user script.

// To use, first install Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.

// To uninstall, go to Tools/Manage User Scripts, select "Conquer Club - BOB", and click Uninstall.

//-----------------------------------------------------------------------------
// Meta Data - required for Greasemonkey
//-----------------------------------------------------------------------------
// ==UserScript==
// @name          Conquer Club - BOB
// @version       5.1.4
// @namespace     http://yeti_c.co.uk/conquerClub
// @description   Adds Stats, card counter, redemption value, text based map, map inspection tools
// @include       http*://*conquerclub.com*
// ==/UserScript==
// 
//-----------------------------------------------------------------------------
// DO NOT EDIT BELOW THIS ( unless you know what you are doing )
//-----------------------------------------------------------------------------
// NO REALLY, THERE IS NO NEED TO EDIT THIS FILE ALL OPTIONS ARE CONTROLLED BY THE GAME MENU

// If you are still reading then on your own head be it, however please post your modification to this thread
// http://www.conquerclub.com/forum/viewtopic.php?t=91386 so that I can look at improving the script.

// Adding JSON to firefox before 3.5, minified version of Crockford's JSON2 script.
this.JSON||(JSON=function(){function j(a){return a<10?"0"+a:a}function h(a,g){var b,c,e,d;b=/["\\\x00-\x1f\x7f-\x9f]/g;var f;switch(typeof a){case "string":return b.test(a)?'"'+a.replace(b,function(i){var k=l[i];if(k)return k;k=i.charCodeAt();return"\\u00"+Math.floor(k/16).toString(16)+(k%16).toString(16)})+'"':'"'+a+'"';case "number":return isFinite(a)?String(a):"null";case "boolean":case "null":return String(a);case "object":if(!a)return"null";if(typeof a.toJSON==="function")return h(a.toJSON()); b=[];if(typeof a.length==="number"&&!a.propertyIsEnumerable("length")){d=a.length;for(c=0;c<d;c+=1)b.push(h(a[c],g)||"null");return"["+b.join(",")+"]"}if(g){d=g.length;for(c=0;c<d;c+=1){e=g[c];if(typeof e==="string")(f=h(a[e],g))&&b.push(h(e)+":"+f)}}else for(e in a)if(typeof e==="string")(f=h(a[e],g))&&b.push(h(e)+":"+f);return"{"+b.join(",")+"}"}}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+j(this.getUTCMonth()+1)+"-"+j(this.getUTCDate())+"T"+j(this.getUTCHours())+":"+j(this.getUTCMinutes())+ ":"+j(this.getUTCSeconds())+"Z"};var l={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return{stringify:h,parse:function(a,g){function b(e,d){var f,i;if(d&&typeof d==="object")for(f in d)if(F.apply(d,[f])){i=b(f,d[f]);if(i!==undefined)d[f]=i}return g(e,d)}var c;if(/^[\],:{}\s]*$/.test(a.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){c=eval("("+ a+")");return typeof g==="function"?b("",c):c}throw new SyntaxError("parseJSON");}}}());

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
	var namespace = "BOB.";
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};

	GM_deleteValue = function(name) {
		localStorage.removeItem(namespace + name);
	};

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(namespace + name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.slice(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	};

	GM_listValues = function() {
		var i,result = [], name;
		for (i = 0; i < localStorage.length; i++) {
			name = localStorage.key(i);
			if (name.indexOf(namespace) == 0) {
				result.push(name.slice(namespace.length));
			}
		}
		return result;
	};
	GM_xmlhttpRequest=function(obj) {
		var request=new XMLHttpRequest();
		request.onreadystatechange=function() {
			if(obj.onreadystatechange) {
				obj.onreadystatechange(request);
			};
			if(request.readyState==4 && obj.onload) {
				obj.onload(request);
			}
		};
		request.onerror=function() {
			if(obj.onerror) {
				obj.onerror(request);
			}
		};
		try {
			request.open(obj.method,obj.url,true);
		} catch(e) {
			if(obj.onerror) {
				obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} );
			};
			return request;
		}
		if (obj.headers) { 
			for(var name in obj.headers) {
				request.setRequestHeader(name,obj.headers[name]);
			}
		}
		request.send(obj.data);
		return request;
	};

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(namespace + name, value);
	};
	unsafeWindow = window;
}
/*!
 * jQuery JavaScript Library v1.5
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
 * Date: Mon Jan 31 08:31:29 2011 -0500
 */
(function(H,z){function va(a,b,d){if(d===z&&a.nodeType===1){d=a.getAttribute("data-"+b);if(typeof d==="string"){try{d=d==="true"?true:d==="false"?false:d==="null"?null:!c.isNaN(d)?parseFloat(d):Ya.test(d)?c.parseJSON(d):d}catch(e){}c.data(a,b,d)}else d=z}return d}function Y(){return false}function ea(){return true}function wa(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function Za(a){var b,d,e,f,h,i,k,m,t,y,A,C=[];f=[];h=c._data(this,W);if(typeof h==="function")h=h.events;if(!(a.liveFired=== this||!h||!h.live||a.target.disabled||a.button&&a.type==="click")){if(a.namespace)A=RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)");a.liveFired=this;var G=h.live.slice(0);for(k=0;k<G.length;k++){h=G[k];h.origType.replace(fa,"")===a.type?f.push(h.selector):G.splice(k--,1)}f=c(a.target).closest(f,a.currentTarget);m=0;for(t=f.length;m<t;m++){y=f[m];for(k=0;k<G.length;k++){h=G[k];if(y.selector===h.selector&&(!A||A.test(h.namespace))){i=y.elem;e=null;if(h.preType==="mouseenter"|| h.preType==="mouseleave"){a.type=h.preType;e=c(a.relatedTarget).closest(h.selector)[0]}if(!e||e!==i)C.push({elem:i,handleObj:h,level:y.level})}}}m=0;for(t=C.length;m<t;m++){f=C[m];if(d&&f.level>d)break;a.currentTarget=f.elem;a.data=f.handleObj.data;a.handleObj=f.handleObj;A=f.handleObj.origHandler.apply(f.elem,arguments);if(A===false||a.isPropagationStopped()){d=f.level;if(A===false)b=false;if(a.isImmediatePropagationStopped())break}}return b}}function ga(a,b){return(a&&a!=="*"?a+".":"")+b.replace($a, "`").replace(ab,"&")}function xa(a,b,d){if(c.isFunction(b))return c.grep(a,function(f,h){return!!b.call(f,h,f)===d});else if(b.nodeType)return c.grep(a,function(f){return f===b===d});else if(typeof b==="string"){var e=c.grep(a,function(f){return f.nodeType===1});if(bb.test(b))return c.filter(b,e,!d);else b=c.filter(b,e)}return c.grep(a,function(f){return c.inArray(f,b)>=0===d})}function ya(a,b){if(!(b.nodeType!==1||!c.hasData(a))){var d=c.expando,e=c.data(a),f=c.data(b,e);if(e=e[d]){var h=e.events; f=f[d]=c.extend({},e);if(h){delete f.handle;f.events={};for(var i in h){d=0;for(e=h[i].length;d<e;d++)c.event.add(b,i,h[i][d],h[i][d].data)}}}}}function za(a,b){if(b.nodeType===1){var d=b.nodeName.toLowerCase();b.clearAttributes();b.mergeAttributes(a);if(d==="object")b.outerHTML=a.outerHTML;else if(d==="input"&&(a.type==="checkbox"||a.type==="radio")){if(a.checked)b.defaultChecked=b.checked=a.checked;if(b.value!==a.value)b.value=a.value}else if(d==="option")b.selected=a.defaultSelected;else if(d=== "input"||d==="textarea")b.defaultValue=a.defaultValue;b.removeAttribute(c.expando)}}function cb(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function Aa(a,b,d){var e=b==="width"?a.offsetWidth:a.offsetHeight;if(d==="border")return e;c.each(b==="width"?db:eb,function(){d||(e-=parseFloat(c.css(a,"padding"+this))||0);if(d==="margin")e+=parseFloat(c.css(a,"margin"+this))||0;else e-=parseFloat(c.css(a, "border"+this+"Width"))||0});return e}function Ba(a){return function(b,d){if(typeof b!=="string"){d=b;b="*"}if(c.isFunction(d))for(var e=b.toLowerCase().split(Ca),f=0,h=e.length,i,k;f<h;f++){i=e[f];if(k=/^\+/.test(i))i=i.substr(1)||"*";i=a[i]=a[i]||[];i[k?"unshift":"push"](d)}}}function ha(a,b,d,e,f,h){f=f||b.dataTypes[0];h=h||{};h[f]=true;f=a[f];for(var i=0,k=f?f.length:0,m=a===ma,t;i<k&&(m||!t);i++){t=f[i](b,d,e);if(typeof t==="string")if(h[t])t=z;else{b.dataTypes.unshift(t);t=ha(a,b,d,e,t,h)}}if((m|| !t)&&!h["*"])t=ha(a,b,d,e,"*",h);return t}function na(a,b,d,e){if(c.isArray(b)&&b.length)c.each(b,function(f,h){d||fb.test(a)?e(a,h):na(a+"["+(typeof h==="object"||c.isArray(h)?f:"")+"]",h,d,e)});else if(!d&&b!=null&&typeof b==="object")c.isArray(b)||c.isEmptyObject(b)?e(a,""):c.each(b,function(f,h){na(a+"["+f+"]",h,d,e)});else e(a,b)}function Z(a,b){var d={};c.each(Da.concat.apply([],Da.slice(0,b)),function(){d[this]=a});return d}function Ea(a){if(!oa[a]){var b=c("<"+a+">").appendTo("body"),d=b.css("display"); b.remove();if(d==="none"||d==="")d="block";oa[a]=d}return oa[a]}function pa(a){return c.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var x=H.document,c=function(){function a(){if(!b.isReady){try{x.documentElement.doScroll("left")}catch(j){setTimeout(a,1);return}b.ready()}}var b=function(j,q){return new b.fn.init(j,q,f)},d=H.jQuery,e=H.$,f,h=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,i=/\S/,k=/^\s+/,m=/\s+$/,t=/\d/,y=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,A=/^[\],:{}\s]*$/,C=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, G=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,J=/(?:^|:|,)(?:\s*\[)+/g,L=/(webkit)[ \/]([\w.]+)/,O=/(opera)(?:.*version)?[ \/]([\w.]+)/,g=/(msie) ([\w.]+)/,l=/(mozilla)(?:.*? rv:([\w.]+))?/,n=navigator.userAgent,r=false,o,p="then done fail isResolved isRejected promise".split(" "),u,w=Object.prototype.toString,D=Object.prototype.hasOwnProperty,Q=Array.prototype.push,M=Array.prototype.slice,N=String.prototype.trim,F=Array.prototype.indexOf,P={};b.fn=b.prototype={constructor:b, init:function(j,q,s){var v;if(!j)return this;if(j.nodeType){this.context=this[0]=j;this.length=1;return this}if(j==="body"&&!q&&x.body){this.context=x;this[0]=x.body;this.selector="body";this.length=1;return this}if(typeof j==="string")if((v=h.exec(j))&&(v[1]||!q))if(v[1]){s=(q=q instanceof b?q[0]:q)?q.ownerDocument||q:x;if(j=y.exec(j))if(b.isPlainObject(q)){j=[x.createElement(j[1])];b.fn.attr.call(j,q,true)}else j=[s.createElement(j[1])];else{j=b.buildFragment([v[1]],[s]);j=(j.cacheable?b.clone(j.fragment): j.fragment).childNodes}return b.merge(this,j)}else{if((q=x.getElementById(v[2]))&&q.parentNode){if(q.id!==v[2])return s.find(j);this.length=1;this[0]=q}this.context=x;this.selector=j;return this}else return!q||q.jquery?(q||s).find(j):this.constructor(q).find(j);else if(b.isFunction(j))return s.ready(j);if(j.selector!==z){this.selector=j.selector;this.context=j.context}return b.makeArray(j,this)},selector:"",jquery:"1.5",length:0,size:function(){return this.length},toArray:function(){return M.call(this, 0)},get:function(j){return j==null?this.toArray():j<0?this[this.length+j]:this[j]},pushStack:function(j,q,s){var v=this.constructor();b.isArray(j)?Q.apply(v,j):b.merge(v,j);v.prevObject=this;v.context=this.context;if(q==="find")v.selector=this.selector+(this.selector?" ":"")+s;else if(q)v.selector=this.selector+"."+q+"("+s+")";return v},each:function(j,q){return b.each(this,j,q)},ready:function(j){b.bindReady();o.done(j);return this},eq:function(j){return j===-1?this.slice(j):this.slice(j,+j+1)}, first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(M.apply(this,arguments),"slice",M.call(arguments).join(","))},map:function(j){return this.pushStack(b.map(this,function(q,s){return j.call(q,s,q)}))},end:function(){return this.prevObject||this.constructor(null)},push:Q,sort:[].sort,splice:[].splice};b.fn.init.prototype=b.fn;b.extend=b.fn.extend=function(){var j,q,s,v,E,B=arguments[0]||{},I=1,K=arguments.length,T=false;if(typeof B==="boolean"){T= B;B=arguments[1]||{};I=2}if(typeof B!=="object"&&!b.isFunction(B))B={};if(K===I){B=this;--I}for(;I<K;I++)if((j=arguments[I])!=null)for(q in j){s=B[q];v=j[q];if(B!==v)if(T&&v&&(b.isPlainObject(v)||(E=b.isArray(v)))){if(E){E=false;s=s&&b.isArray(s)?s:[]}else s=s&&b.isPlainObject(s)?s:{};B[q]=b.extend(T,s,v)}else if(v!==z)B[q]=v}return B};b.extend({noConflict:function(j){H.$=e;if(j)H.jQuery=d;return b},isReady:false,readyWait:1,ready:function(j){j===true&&b.readyWait--;if(!b.readyWait||j!==true&&!b.isReady){if(!x.body)return setTimeout(b.ready, 1);b.isReady=true;if(!(j!==true&&--b.readyWait>0)){o.resolveWith(x,[b]);b.fn.trigger&&b(x).trigger("ready").unbind("ready")}}},bindReady:function(){if(!r){r=true;if(x.readyState==="complete")return setTimeout(b.ready,1);if(x.addEventListener){x.addEventListener("DOMContentLoaded",u,false);H.addEventListener("load",b.ready,false)}else if(x.attachEvent){x.attachEvent("onreadystatechange",u);H.attachEvent("onload",b.ready);var j=false;try{j=H.frameElement==null}catch(q){}x.documentElement.doScroll&& j&&a()}}},isFunction:function(j){return b.type(j)==="function"},isArray:Array.isArray||function(j){return b.type(j)==="array"},isWindow:function(j){return j&&typeof j==="object"&&"setInterval"in j},isNaN:function(j){return j==null||!t.test(j)||isNaN(j)},type:function(j){return j==null?String(j):P[w.call(j)]||"object"},isPlainObject:function(j){if(!j||b.type(j)!=="object"||j.nodeType||b.isWindow(j))return false;if(j.constructor&&!D.call(j,"constructor")&&!D.call(j.constructor.prototype,"isPrototypeOf"))return false; for(var q in j);return q===z||D.call(j,q)},isEmptyObject:function(j){for(var q in j)return false;return true},error:function(j){throw j;},parseJSON:function(j){if(typeof j!=="string"||!j)return null;j=b.trim(j);if(A.test(j.replace(C,"@").replace(G,"]").replace(J,"")))return H.JSON&&H.JSON.parse?H.JSON.parse(j):(new Function("return "+j))();else b.error("Invalid JSON: "+j)},parseXML:function(j,q,s){if(H.DOMParser){s=new DOMParser;q=s.parseFromString(j,"text/xml")}else{q=new ActiveXObject("Microsoft.XMLDOM"); q.async="false";q.loadXML(j)}s=q.documentElement;if(!s||!s.nodeName||s.nodeName==="parsererror")b.error("Invalid XML: "+j);return q},noop:function(){},globalEval:function(j){if(j&&i.test(j)){var q=x.getElementsByTagName("head")[0]||x.documentElement,s=x.createElement("script");s.type="text/javascript";if(b.support.scriptEval())s.appendChild(x.createTextNode(j));else s.text=j;q.insertBefore(s,q.firstChild);q.removeChild(s)}},nodeName:function(j,q){return j.nodeName&&j.nodeName.toUpperCase()===q.toUpperCase()}, each:function(j,q,s){var v,E=0,B=j.length,I=B===z||b.isFunction(j);if(s)if(I)for(v in j){if(q.apply(j[v],s)===false)break}else for(;E<B;){if(q.apply(j[E++],s)===false)break}else if(I)for(v in j){if(q.call(j[v],v,j[v])===false)break}else for(s=j[0];E<B&&q.call(s,E,s)!==false;s=j[++E]);return j},trim:N?function(j){return j==null?"":N.call(j)}:function(j){return j==null?"":j.toString().replace(k,"").replace(m,"")},makeArray:function(j,q){var s=q||[];if(j!=null){var v=b.type(j);j.length==null||v==="string"|| v==="function"||v==="regexp"||b.isWindow(j)?Q.call(s,j):b.merge(s,j)}return s},inArray:function(j,q){if(q.indexOf)return q.indexOf(j);for(var s=0,v=q.length;s<v;s++)if(q[s]===j)return s;return-1},merge:function(j,q){var s=j.length,v=0;if(typeof q.length==="number")for(var E=q.length;v<E;v++)j[s++]=q[v];else for(;q[v]!==z;)j[s++]=q[v++];j.length=s;return j},grep:function(j,q,s){var v=[],E;s=!!s;for(var B=0,I=j.length;B<I;B++){E=!!q(j[B],B);s!==E&&v.push(j[B])}return v},map:function(j,q,s){for(var v= [],E,B=0,I=j.length;B<I;B++){E=q(j[B],B,s);if(E!=null)v[v.length]=E}return v.concat.apply([],v)},guid:1,proxy:function(j,q,s){if(arguments.length===2)if(typeof q==="string"){s=j;j=s[q];q=z}else if(q&&!b.isFunction(q)){s=q;q=z}if(!q&&j)q=function(){return j.apply(s||this,arguments)};if(j)q.guid=j.guid=j.guid||q.guid||b.guid++;return q},access:function(j,q,s,v,E,B){var I=j.length;if(typeof q==="object"){for(var K in q)b.access(j,K,q[K],v,E,s);return j}if(s!==z){v=!B&&v&&b.isFunction(s);for(K=0;K<I;K++)E(j[K], q,v?s.call(j[K],K,E(j[K],q)):s,B);return j}return I?E(j[0],q):z},now:function(){return(new Date).getTime()},_Deferred:function(){var j=[],q,s,v,E={done:function(){if(!v){var B=arguments,I,K,T,U,R;if(q){R=q;q=0}I=0;for(K=B.length;I<K;I++){T=B[I];U=b.type(T);if(U==="array")E.done.apply(E,T);else U==="function"&&j.push(T)}R&&E.resolveWith(R[0],R[1])}return this},resolveWith:function(B,I){if(!v&&!q&&!s){s=1;try{for(;j[0];)j.shift().apply(B,I)}finally{q=[B,I];s=0}}return this},resolve:function(){E.resolveWith(b.isFunction(this.promise)? this.promise():this,arguments);return this},isResolved:function(){return!!(s||q)},cancel:function(){v=1;j=[];return this}};return E},Deferred:function(j){var q=b._Deferred(),s=b._Deferred(),v;b.extend(q,{then:function(E,B){q.done(E).fail(B);return this},fail:s.done,rejectWith:s.resolveWith,reject:s.resolve,isRejected:s.isResolved,promise:function(E,B){if(E==null){if(v)return v;v=E={}}for(B=p.length;B--;)E[p[B]]=q[p[B]];return E}});q.then(s.cancel,q.cancel);delete q.cancel;j&&j.call(q,q);return q}, when:function(j){var q=arguments,s=q.length,v=s<=1&&j&&b.isFunction(j.promise)?j:b.Deferred(),E=v.promise(),B;if(s>1){B=Array(s);b.each(q,function(I,K){b.when(K).then(function(T){B[I]=arguments.length>1?M.call(arguments,0):T;--s||v.resolveWith(E,B)},v.reject)})}else v!==j&&v.resolve(j);return E},uaMatch:function(j){j=j.toLowerCase();j=L.exec(j)||O.exec(j)||g.exec(j)||j.indexOf("compatible")<0&&l.exec(j)||[];return{browser:j[1]||"",version:j[2]||"0"}},sub:function(){function j(s,v){return new j.fn.init(s, v)}b.extend(true,j,this);j.superclass=this;j.fn=j.prototype=this();j.fn.constructor=j;j.subclass=this.subclass;j.fn.init=function(s,v){if(v&&v instanceof b&&!(v instanceof j))v=j(v);return b.fn.init.call(this,s,v,q)};j.fn.init.prototype=j.fn;var q=j(x);return j},browser:{}});o=b._Deferred();b.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(j,q){P["[object "+q+"]"]=q.toLowerCase()});n=b.uaMatch(n);if(n.browser){b.browser[n.browser]=true;b.browser.version=n.version}if(b.browser.webkit)b.browser.safari= true;if(F)b.inArray=function(j,q){return F.call(q,j)};if(i.test("\u00a0")){k=/^[\s\xA0]+/;m=/[\s\xA0]+$/}f=b(x);if(x.addEventListener)u=function(){x.removeEventListener("DOMContentLoaded",u,false);b.ready()};else if(x.attachEvent)u=function(){if(x.readyState==="complete"){x.detachEvent("onreadystatechange",u);b.ready()}};return H.jQuery=H.$=b}();(function(){c.support={};var a=x.createElement("div");a.style.display="none";a.innerHTML=" <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>"; var b=a.getElementsByTagName("*"),d=a.getElementsByTagName("a")[0],e=x.createElement("select"),f=e.appendChild(x.createElement("option"));if(!(!b||!b.length||!d)){c.support={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/red/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.55$/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:a.getElementsByTagName("input")[0].value=== "on",optSelected:f.selected,deleteExpando:true,optDisabled:false,checkClone:false,_scriptEval:null,noCloneEvent:true,boxModel:null,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableHiddenOffsets:true};e.disabled=true;c.support.optDisabled=!f.disabled;c.support.scriptEval=function(){if(c.support._scriptEval===null){var i=x.documentElement,k=x.createElement("script"),m="script"+c.now();k.type="text/javascript";try{k.appendChild(x.createTextNode("window."+m+"=1;"))}catch(t){}i.insertBefore(k, i.firstChild);if(H[m]){c.support._scriptEval=true;delete H[m]}else c.support._scriptEval=false;i.removeChild(k)}return c.support._scriptEval};try{delete a.test}catch(h){c.support.deleteExpando=false}if(a.attachEvent&&a.fireEvent){a.attachEvent("onclick",function i(){c.support.noCloneEvent=false;a.detachEvent("onclick",i)});a.cloneNode(true).fireEvent("onclick")}a=x.createElement("div");a.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";b=x.createDocumentFragment();b.appendChild(a.firstChild); c.support.checkClone=b.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var i=x.createElement("div"),k=x.getElementsByTagName("body")[0];if(k){i.style.width=i.style.paddingLeft="1px";k.appendChild(i);c.boxModel=c.support.boxModel=i.offsetWidth===2;if("zoom"in i.style){i.style.display="inline";i.style.zoom=1;c.support.inlineBlockNeedsLayout=i.offsetWidth===2;i.style.display="";i.innerHTML="<div style='width:4px;'></div>";c.support.shrinkWrapBlocks=i.offsetWidth!==2}i.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>"; var m=i.getElementsByTagName("td");c.support.reliableHiddenOffsets=m[0].offsetHeight===0;m[0].style.display="";m[1].style.display="none";c.support.reliableHiddenOffsets=c.support.reliableHiddenOffsets&&m[0].offsetHeight===0;i.innerHTML="";k.removeChild(i).style.display="none"}});c.support.submitBubbles=true;c.support.changeBubbles=true;a=b=d=null}})();var Ya=/^(?:\{.*\}|\[.*\])$/;c.extend({cache:{},uuid:0,expando:"jQuery"+(c.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet:true},hasData:function(a){a=a.nodeType?c.cache[a[c.expando]]:a[c.expando];return!!a&&!c.isEmptyObject(a)},data:function(a,b,d,e){if(c.acceptData(a)){var f=c.expando,h=typeof b==="string",i=a.nodeType,k=i?c.cache:a,m=i?a[c.expando]:a[c.expando]&&c.expando;if(!((!m||e&&m&&!k[m][f])&&h&&d===z)){if(!m)if(i)a[c.expando]=m=++c.uuid;else m=c.expando;k[m]||(k[m]={});if(typeof b==="object")if(e)k[m][f]=c.extend(k[m][f],b);else k[m]=c.extend(k[m],b);a=k[m];if(e){a[f]||(a[f]={});a=a[f]}if(d!==z)a[b]= d;if(b==="events"&&!a[b])return a[f]&&a[f].events;return h?a[b]:a}}},removeData:function(a,b,d){if(c.acceptData(a)){var e=c.expando,f=a.nodeType,h=f?c.cache:a,i=f?a[c.expando]:c.expando;if(h[i]){if(b){var k=d?h[i][e]:h[i];if(k){delete k[b];if(!c.isEmptyObject(k))return}}if(d){delete h[i][e];if(!c.isEmptyObject(h[i]))return}b=h[i][e];if(c.support.deleteExpando||h!=H)delete h[i];else h[i]=null;if(b){h[i]={};h[i][e]=b}else if(f)if(c.support.deleteExpando)delete a[c.expando];else if(a.removeAttribute)a.removeAttribute(c.expando); else a[c.expando]=null}}},_data:function(a,b,d){return c.data(a,b,d,true)},acceptData:function(a){if(a.nodeName){var b=c.noData[a.nodeName.toLowerCase()];if(b)return!(b===true||a.getAttribute("classid")!==b)}return true}});c.fn.extend({data:function(a,b){var d=null;if(typeof a==="undefined"){if(this.length){d=c.data(this[0]);if(this[0].nodeType===1)for(var e=this[0].attributes,f,h=0,i=e.length;h<i;h++){f=e[h].name;if(f.indexOf("data-")===0){f=f.substr(5);va(this[0],f,d[f])}}}return d}else if(typeof a=== "object")return this.each(function(){c.data(this,a)});var k=a.split(".");k[1]=k[1]?"."+k[1]:"";if(b===z){d=this.triggerHandler("getData"+k[1]+"!",[k[0]]);if(d===z&&this.length){d=c.data(this[0],a);d=va(this[0],a,d)}return d===z&&k[1]?this.data(k[0]):d}else return this.each(function(){var m=c(this),t=[k[0],b];m.triggerHandler("setData"+k[1]+"!",t);c.data(this,a,b);m.triggerHandler("changeData"+k[1]+"!",t)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a, b,d){if(a){b=(b||"fx")+"queue";var e=c._data(a,b);if(!d)return e||[];if(!e||c.isArray(d))e=c._data(a,b,c.makeArray(d));else e.push(d);return e}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),e=d.shift();if(e==="inprogress")e=d.shift();if(e){b==="fx"&&d.unshift("inprogress");e.call(a,function(){c.dequeue(a,b)})}d.length||c.removeData(a,b+"queue",true)}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===z)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this, a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Fa=/[\n\t\r]/g,qa=/\s+/,gb=/\r/g,hb=/^(?:href|src|style)$/,ib=/^(?:button|input)$/i,jb=/^(?:button|input|object|select|textarea)$/i,kb=/^a(?:rea)?$/i,Ga=/^(?:radio|checkbox)$/i; c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};c.fn.extend({attr:function(a,b){return c.access(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(t){var y=c(this);y.addClass(a.call(this, t,y.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(qa),d=0,e=this.length;d<e;d++){var f=this[d];if(f.nodeType===1)if(f.className){for(var h=" "+f.className+" ",i=f.className,k=0,m=b.length;k<m;k++)if(h.indexOf(" "+b[k]+" ")<0)i+=" "+b[k];f.className=c.trim(i)}else f.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(m){var t=c(this);t.removeClass(a.call(this,m,t.attr("class")))});if(a&&typeof a==="string"||a===z)for(var b=(a||"").split(qa), d=0,e=this.length;d<e;d++){var f=this[d];if(f.nodeType===1&&f.className)if(a){for(var h=(" "+f.className+" ").replace(Fa," "),i=0,k=b.length;i<k;i++)h=h.replace(" "+b[i]+" "," ");f.className=c.trim(h)}else f.className=""}return this},toggleClass:function(a,b){var d=typeof a,e=typeof b==="boolean";if(c.isFunction(a))return this.each(function(f){var h=c(this);h.toggleClass(a.call(this,f,h.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var f,h=0,i=c(this),k=b,m=a.split(qa);f=m[h++];){k= e?k:!i.hasClass(f);i[k?"addClass":"removeClass"](f)}else if(d==="undefined"||d==="boolean"){this.className&&c._data(this,"__className__",this.className);this.className=this.className||a===false?"":c._data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Fa," ").indexOf(a)>-1)return true;return false},val:function(a){if(!arguments.length){var b=this[0];if(b){if(c.nodeName(b,"option")){var d=b.attributes.value;return!d|| d.specified?b.value:b.text}if(c.nodeName(b,"select")){var e=b.selectedIndex;d=[];var f=b.options;b=b.type==="select-one";if(e<0)return null;var h=b?e:0;for(e=b?e+1:f.length;h<e;h++){var i=f[h];if(i.selected&&(c.support.optDisabled?!i.disabled:i.getAttribute("disabled")===null)&&(!i.parentNode.disabled||!c.nodeName(i.parentNode,"optgroup"))){a=c(i).val();if(b)return a;d.push(a)}}return d}if(Ga.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(gb, "")}return z}var k=c.isFunction(a);return this.each(function(m){var t=c(this),y=a;if(this.nodeType===1){if(k)y=a.call(this,m,t.val());if(y==null)y="";else if(typeof y==="number")y+="";else if(c.isArray(y))y=c.map(y,function(C){return C==null?"":C+""});if(c.isArray(y)&&Ga.test(this.type))this.checked=c.inArray(t.val(),y)>=0;else if(c.nodeName(this,"select")){var A=c.makeArray(y);c("option",this).each(function(){this.selected=c.inArray(c(this).val(),A)>=0});if(!A.length)this.selectedIndex=-1}else this.value= y}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,e){if(!a||a.nodeType===3||a.nodeType===8||a.nodeType===2)return z;if(e&&b in c.attrFn)return c(a)[b](d);e=a.nodeType!==1||!c.isXMLDoc(a);var f=d!==z;b=e&&c.props[b]||b;if(a.nodeType===1){var h=hb.test(b);if((b in a||a[b]!==z)&&e&&!h){if(f){b==="type"&&ib.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");if(d===null)a.nodeType===1&&a.removeAttribute(b); else a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:jb.test(a.nodeName)||kb.test(a.nodeName)&&a.href?0:z;return a[b]}if(!c.support.style&&e&&b==="style"){if(f)a.style.cssText=""+d;return a.style.cssText}f&&a.setAttribute(b,""+d);if(!a.attributes[b]&&a.hasAttribute&&!a.hasAttribute(b))return z;a=!c.support.hrefNormalized&&e&&h?a.getAttribute(b,2):a.getAttribute(b);return a=== null?z:a}if(f)a[b]=d;return a[b]}});var fa=/\.(.*)$/,ra=/^(?:textarea|input|select)$/i,$a=/\./g,ab=/ /g,lb=/[^\w\s.|`]/g,mb=function(a){return a.replace(lb,"\\$&")},W="events";c.event={add:function(a,b,d,e){if(!(a.nodeType===3||a.nodeType===8)){if(c.isWindow(a)&&a!==H&&!a.frameElement)a=H;if(d===false)d=Y;else if(!d)return;var f,h;if(d.handler){f=d;d=f.handler}if(!d.guid)d.guid=c.guid++;if(h=c._data(a)){var i=h[W],k=h.handle;if(typeof i==="function"){k=i.handle;i=i.events}else if(!i){a.nodeType|| (h[W]=h=function(){});h.events=i={}}if(!k)h.handle=k=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(k.elem,arguments):z};k.elem=a;b=b.split(" ");for(var m,t=0,y;m=b[t++];){h=f?c.extend({},f):{handler:d,data:e};if(m.indexOf(".")>-1){y=m.split(".");m=y.shift();h.namespace=y.slice(0).sort().join(".")}else{y=[];h.namespace=""}h.type=m;if(!h.guid)h.guid=d.guid;var A=i[m],C=c.event.special[m]||{};if(!A){A=i[m]=[];if(!C.setup||C.setup.call(a,e,y,k)===false)if(a.addEventListener)a.addEventListener(m, k,false);else a.attachEvent&&a.attachEvent("on"+m,k)}if(C.add){C.add.call(a,h);if(!h.handler.guid)h.handler.guid=d.guid}A.push(h);c.event.global[m]=true}a=null}}},global:{},remove:function(a,b,d,e){if(!(a.nodeType===3||a.nodeType===8)){if(d===false)d=Y;var f,h,i=0,k,m,t,y,A,C,G=c.hasData(a)&&c._data(a),J=G&&G[W];if(G&&J){if(typeof J==="function"){G=J;J=J.events}if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(f in J)c.event.remove(a,f+b)}else{for(b=b.split(" ");f= b[i++];){y=f;k=f.indexOf(".")<0;m=[];if(!k){m=f.split(".");f=m.shift();t=RegExp("(^|\\.)"+c.map(m.slice(0).sort(),mb).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(A=J[f])if(d){y=c.event.special[f]||{};for(h=e||0;h<A.length;h++){C=A[h];if(d.guid===C.guid){if(k||t.test(C.namespace)){e==null&&A.splice(h--,1);y.remove&&y.remove.call(a,C)}if(e!=null)break}}if(A.length===0||e!=null&&A.length===1){if(!y.teardown||y.teardown.call(a,m)===false)c.removeEvent(a,f,G.handle);delete J[f]}}else for(h=0;h<A.length;h++){C= A[h];if(k||t.test(C.namespace)){c.event.remove(a,y,C.handler,h);A.splice(h--,1)}}}if(c.isEmptyObject(J)){if(b=G.handle)b.elem=null;delete G.events;delete G.handle;if(typeof G==="function")c.removeData(a,W,true);else c.isEmptyObject(G)&&c.removeData(a,z,true)}}}}},trigger:function(a,b,d,e){var f=a.type||a;if(!e){a=typeof a==="object"?a[c.expando]?a:c.extend(c.Event(f),a):c.Event(f);if(f.indexOf("!")>=0){a.type=f=f.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[f]&&c.each(c.cache, function(){var A=this[c.expando];A&&A.events&&A.events[f]&&c.event.trigger(a,b,A.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return z;a.result=z;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(e=d.nodeType?c._data(d,"handle"):(c._data(d,W)||{}).handle)&&e.apply(d,b);e=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+f]&&d["on"+f].apply(d,b)===false){a.result=false;a.preventDefault()}}catch(h){}if(!a.isPropagationStopped()&&e)c.event.trigger(a, b,e,true);else if(!a.isDefaultPrevented()){var i;e=a.target;var k=f.replace(fa,""),m=c.nodeName(e,"a")&&k==="click",t=c.event.special[k]||{};if((!t._default||t._default.call(d,a)===false)&&!m&&!(e&&e.nodeName&&c.noData[e.nodeName.toLowerCase()])){try{if(e[k]){if(i=e["on"+k])e["on"+k]=null;c.event.triggered=true;e[k]()}}catch(y){}if(i)e["on"+k]=i;c.event.triggered=false}}},handle:function(a){var b,d,e,f;d=[];var h=c.makeArray(arguments);a=h[0]=c.event.fix(a||H.event);a.currentTarget=this;b=a.type.indexOf(".")< 0&&!a.exclusive;if(!b){e=a.type.split(".");a.type=e.shift();d=e.slice(0).sort();e=RegExp("(^|\\.)"+d.join("\\.(?:.*\\.)?")+"(\\.|$)")}a.namespace=a.namespace||d.join(".");f=c._data(this,W);if(typeof f==="function")f=f.events;d=(f||{})[a.type];if(f&&d){d=d.slice(0);f=0;for(var i=d.length;f<i;f++){var k=d[f];if(b||e.test(k.namespace)){a.handler=k.handler;a.data=k.data;a.handleObj=k;k=k.handler.apply(this,h);if(k!==z){a.result=k;if(k===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result}, props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[c.expando])return a;var b=a;a=c.Event(b);for(var d=this.props.length,e;d;){e=this.props[--d];a[e]=b[e]}if(!a.target)a.target=a.srcElement||x; if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=x.documentElement;d=x.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(a.which==null&&(a.charCode!=null||a.keyCode!=null))a.which=a.charCode!=null?a.charCode:a.keyCode; if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==z)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,ga(a.origType,a.selector),c.extend({},a,{handler:Za,guid:a.handler.guid}))},remove:function(a){c.event.remove(this,ga(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,d){if(c.isWindow(this))this.onbeforeunload=d},teardown:function(a,b){if(this.onbeforeunload=== b)this.onbeforeunload=null}}}};c.removeEvent=x.removeEventListener?function(a,b,d){a.removeEventListener&&a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent&&a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=a;this.type=a.type;this.isDefaultPrevented=a.defaultPrevented||a.returnValue===false||a.getPreventDefault&&a.getPreventDefault()?ea:Y}else this.type=a;this.timeStamp=c.now();this[c.expando]=true};c.Event.prototype= {preventDefault:function(){this.isDefaultPrevented=ea;var a=this.originalEvent;if(a)if(a.preventDefault)a.preventDefault();else a.returnValue=false},stopPropagation:function(){this.isPropagationStopped=ea;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=ea;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y};var Ha=function(a){var b=a.relatedTarget; try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ia=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ia:Ha,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ia:Ha)}}});if(!c.support.submitBubbles)c.event.special.submit={setup:function(){if(this.nodeName&&this.nodeName.toLowerCase()!== "form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length){a.liveFired=z;return wa("submit",this,arguments)}});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13){a.liveFired=z;return wa("submit",this,arguments)}})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};if(!c.support.changeBubbles){var ba, Ja=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(e){return e.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},ia=function(a,b){var d=a.target,e,f;if(!(!ra.test(d.nodeName)||d.readOnly)){e=c._data(d,"_change_data");f=Ja(d);if(a.type!=="focusout"||d.type!=="radio")c._data(d,"_change_data",f);if(!(e===z||f===e))if(e!=null||f){a.type="change";a.liveFired= z;return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:ia,beforedeactivate:ia,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return ia.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return ia.call(this,a)},beforeactivate:function(a){a=a.target;c._data(a,"_change_data",Ja(a))}}, setup:function(){if(this.type==="file")return false;for(var a in ba)c.event.add(this,a+".specialChange",ba[a]);return ra.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return ra.test(this.nodeName)}};ba=c.event.special.change.filters;ba.focus=ba.beforeactivate}x.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.handle.call(this,e)}c.event.special[b]={setup:function(){this.addEventListener(a, d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,e,f){if(typeof d==="object"){for(var h in d)this[b](h,e,d[h],f);return this}if(c.isFunction(e)||e===false){f=e;e=z}var i=b==="one"?c.proxy(f,function(m){c(this).unbind(m,i);return f.apply(this,arguments)}):f;if(d==="unload"&&b!=="one")this.one(d,e,f);else{h=0;for(var k=this.length;h<k;h++)c.event.add(this[h],d,i,e)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a=== "object"&&!a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var e=this.length;d<e;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,e){return this.live(b,d,e,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){var d=c.Event(a);d.preventDefault();d.stopPropagation();c.event.trigger(d,b,this[0]);return d.result}}, toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(e){var f=(c._data(this,"lastToggle"+a.guid)||0)%d;c._data(this,"lastToggle"+a.guid,f+1);e.preventDefault();return b[f].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ka={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,e,f,h){var i,k=0,m,t,y=h||this.selector; h=h?this:c(this.context);if(typeof d==="object"&&!d.preventDefault){for(i in d)h[b](i,e,d[i],y);return this}if(c.isFunction(e)){f=e;e=z}for(d=(d||"").split(" ");(i=d[k++])!=null;){m=fa.exec(i);t="";if(m){t=m[0];i=i.replace(fa,"")}if(i==="hover")d.push("mouseenter"+t,"mouseleave"+t);else{m=i;if(i==="focus"||i==="blur"){d.push(Ka[i]+t);i+=t}else i=(Ka[i]||i)+t;if(b==="live"){t=0;for(var A=h.length;t<A;t++)c.event.add(h[t],"live."+ga(i,y),{data:e,selector:y,handler:f,origType:i,origHandler:f,preType:m})}else h.unbind("live."+ ga(i,y),f)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){c.fn[b]=function(d,e){if(e==null){e=d;d=null}return arguments.length>0?this.bind(b,d,e):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});(function(){function a(g,l,n,r,o,p){o=0;for(var u=r.length;o<u;o++){var w=r[o];if(w){var D=false;for(w=w[g];w;){if(w.sizcache=== n){D=r[w.sizset];break}if(w.nodeType===1&&!p){w.sizcache=n;w.sizset=o}if(w.nodeName.toLowerCase()===l){D=w;break}w=w[g]}r[o]=D}}}function b(g,l,n,r,o,p){o=0;for(var u=r.length;o<u;o++){var w=r[o];if(w){var D=false;for(w=w[g];w;){if(w.sizcache===n){D=r[w.sizset];break}if(w.nodeType===1){if(!p){w.sizcache=n;w.sizset=o}if(typeof l!=="string"){if(w===l){D=true;break}}else if(k.filter(l,[w]).length>0){D=w;break}}w=w[g]}r[o]=D}}}var d=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, e=0,f=Object.prototype.toString,h=false,i=true;[0,0].sort(function(){i=false;return 0});var k=function(g,l,n,r){n=n||[];var o=l=l||x;if(l.nodeType!==1&&l.nodeType!==9)return[];if(!g||typeof g!=="string")return n;var p,u,w,D,Q,M=true,N=k.isXML(l),F=[],P=g;do{d.exec("");if(p=d.exec(P)){P=p[3];F.push(p[1]);if(p[2]){D=p[3];break}}}while(p);if(F.length>1&&t.exec(g))if(F.length===2&&m.relative[F[0]])u=O(F[0]+F[1],l);else for(u=m.relative[F[0]]?[l]:k(F.shift(),l);F.length;){g=F.shift();if(m.relative[g])g+= F.shift();u=O(g,u)}else{if(!r&&F.length>1&&l.nodeType===9&&!N&&m.match.ID.test(F[0])&&!m.match.ID.test(F[F.length-1])){p=k.find(F.shift(),l,N);l=p.expr?k.filter(p.expr,p.set)[0]:p.set[0]}if(l){p=r?{expr:F.pop(),set:C(r)}:k.find(F.pop(),F.length===1&&(F[0]==="~"||F[0]==="+")&&l.parentNode?l.parentNode:l,N);u=p.expr?k.filter(p.expr,p.set):p.set;if(F.length>0)w=C(u);else M=false;for(;F.length;){p=Q=F.pop();if(m.relative[Q])p=F.pop();else Q="";if(p==null)p=l;m.relative[Q](w,p,N)}}else w=[]}w||(w=u);w|| k.error(Q||g);if(f.call(w)==="[object Array]")if(M)if(l&&l.nodeType===1)for(g=0;w[g]!=null;g++){if(w[g]&&(w[g]===true||w[g].nodeType===1&&k.contains(l,w[g])))n.push(u[g])}else for(g=0;w[g]!=null;g++)w[g]&&w[g].nodeType===1&&n.push(u[g]);else n.push.apply(n,w);else C(w,n);if(D){k(D,o,n,r);k.uniqueSort(n)}return n};k.uniqueSort=function(g){if(J){h=i;g.sort(J);if(h)for(var l=1;l<g.length;l++)g[l]===g[l-1]&&g.splice(l--,1)}return g};k.matches=function(g,l){return k(g,null,null,l)};k.matchesSelector=function(g, l){return k(l,null,null,[g]).length>0};k.find=function(g,l,n){var r;if(!g)return[];for(var o=0,p=m.order.length;o<p;o++){var u,w=m.order[o];if(u=m.leftMatch[w].exec(g)){var D=u[1];u.splice(1,1);if(D.substr(D.length-1)!=="\\"){u[1]=(u[1]||"").replace(/\\/g,"");r=m.find[w](u,l,n);if(r!=null){g=g.replace(m.match[w],"");break}}}}r||(r=typeof l.getElementsByTagName!=="undefined"?l.getElementsByTagName("*"):[]);return{set:r,expr:g}};k.filter=function(g,l,n,r){for(var o,p,u=g,w=[],D=l,Q=l&&l[0]&&k.isXML(l[0]);g&& l.length;){for(var M in m.filter)if((o=m.leftMatch[M].exec(g))!=null&&o[2]){var N,F,P=m.filter[M];F=o[1];p=false;o.splice(1,1);if(F.substr(F.length-1)!=="\\"){if(D===w)w=[];if(m.preFilter[M])if(o=m.preFilter[M](o,D,n,w,r,Q)){if(o===true)continue}else p=N=true;if(o)for(var j=0;(F=D[j])!=null;j++)if(F){N=P(F,o,j,D);var q=r^!!N;if(n&&N!=null)if(q)p=true;else D[j]=false;else if(q){w.push(F);p=true}}if(N!==z){n||(D=w);g=g.replace(m.match[M],"");if(!p)return[];break}}}if(g===u)if(p==null)k.error(g);else break; u=g}return D};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var m=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},relative:{"+":function(g,l){var n=typeof l==="string",r=n&&!/\W/.test(l);n=n&&!r;if(r)l=l.toLowerCase();r=0;for(var o=g.length,p;r<o;r++)if(p=g[r]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[r]=n||p&&p.nodeName.toLowerCase()=== l?p||false:p===l}n&&k.filter(l,g,true)},">":function(g,l){var n,r=typeof l==="string",o=0,p=g.length;if(r&&!/\W/.test(l))for(l=l.toLowerCase();o<p;o++){if(n=g[o]){n=n.parentNode;g[o]=n.nodeName.toLowerCase()===l?n:false}}else{for(;o<p;o++)if(n=g[o])g[o]=r?n.parentNode:n.parentNode===l;r&&k.filter(l,g,true)}},"":function(g,l,n){var r,o=e++,p=b;if(typeof l==="string"&&!/\W/.test(l)){r=l=l.toLowerCase();p=a}p("parentNode",l,o,g,r,n)},"~":function(g,l,n){var r,o=e++,p=b;if(typeof l==="string"&&!/\W/.test(l)){r= l=l.toLowerCase();p=a}p("previousSibling",l,o,g,r,n)}},find:{ID:function(g,l,n){if(typeof l.getElementById!=="undefined"&&!n)return(g=l.getElementById(g[1]))&&g.parentNode?[g]:[]},NAME:function(g,l){if(typeof l.getElementsByName!=="undefined"){for(var n=[],r=l.getElementsByName(g[1]),o=0,p=r.length;o<p;o++)r[o].getAttribute("name")===g[1]&&n.push(r[o]);return n.length===0?null:n}},TAG:function(g,l){if(typeof l.getElementsByTagName!=="undefined")return l.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g, l,n,r,o,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var u;(u=l[p])!=null;p++)if(u)if(o^(u.className&&(" "+u.className+" ").replace(/[\t\n\r]/g," ").indexOf(g)>=0))n||r.push(u);else if(n)l[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},CHILD:function(g){if(g[1]==="nth"){g[2]||k.error(g[0]);g[2]=g[2].replace(/^\+|\s*/g,"");var l=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&& "0n+"+g[2]||g[2]);g[2]=l[1]+(l[2]||1)-0;g[3]=l[3]-0}else g[2]&&k.error(g[0]);g[0]=e++;return g},ATTR:function(g,l,n,r,o,p){l=g[1]=g[1].replace(/\\/g,"");if(!p&&m.attrMap[l])g[1]=m.attrMap[l];g[4]=(g[4]||g[5]||"").replace(/\\/g,"");if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,l,n,r,o){if(g[1]==="not")if((d.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,l);else{g=k.filter(g[3],l,n,true^o);n||r.push.apply(r,g);return false}else if(m.match.POS.test(g[0])||m.match.CHILD.test(g[0]))return true; return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,l,n){return!!k(n[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},text:function(g){return"text"===g.type},radio:function(g){return"radio"=== g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},setFilters:{first:function(g,l){return l===0},last:function(g,l,n,r){return l=== r.length-1},even:function(g,l){return l%2===0},odd:function(g,l){return l%2===1},lt:function(g,l,n){return l<n[3]-0},gt:function(g,l,n){return l>n[3]-0},nth:function(g,l,n){return n[3]-0===l},eq:function(g,l,n){return n[3]-0===l}},filter:{PSEUDO:function(g,l,n,r){var o=l[1],p=m.filters[o];if(p)return p(g,n,l,r);else if(o==="contains")return(g.textContent||g.innerText||k.getText([g])||"").indexOf(l[3])>=0;else if(o==="not"){l=l[3];n=0;for(r=l.length;n<r;n++)if(l[n]===g)return false;return true}else k.error(o)}, CHILD:function(g,l){var n=l[1],r=g;switch(n){case "only":case "first":for(;r=r.previousSibling;)if(r.nodeType===1)return false;if(n==="first")return true;r=g;case "last":for(;r=r.nextSibling;)if(r.nodeType===1)return false;return true;case "nth":n=l[2];var o=l[3];if(n===1&&o===0)return true;var p=l[0],u=g.parentNode;if(u&&(u.sizcache!==p||!g.nodeIndex)){var w=0;for(r=u.firstChild;r;r=r.nextSibling)if(r.nodeType===1)r.nodeIndex=++w;u.sizcache=p}r=g.nodeIndex-o;return n===0?r===0:r%n===0&&r/n>=0}}, ID:function(g,l){return g.nodeType===1&&g.getAttribute("id")===l},TAG:function(g,l){return l==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===l},CLASS:function(g,l){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(l)>-1},ATTR:function(g,l){var n=l[1];n=m.attrHandle[n]?m.attrHandle[n](g):g[n]!=null?g[n]:g.getAttribute(n);var r=n+"",o=l[2],p=l[4];return n==null?o==="!=":o==="="?r===p:o==="*="?r.indexOf(p)>=0:o==="~="?(" "+r+" ").indexOf(p)>=0:!p?r&&n!==false:o==="!="?r!==p:o==="^="?r.indexOf(p)=== 0:o==="$="?r.substr(r.length-p.length)===p:o==="|="?r===p||r.substr(0,p.length+1)===p+"-":false},POS:function(g,l,n,r){var o=m.setFilters[l[2]];if(o)return o(g,n,l,r)}}},t=m.match.POS,y=function(g,l){return"\\"+(l-0+1)},A;for(A in m.match){m.match[A]=RegExp(m.match[A].source+/(?![^\[]*\])(?![^\(]*\))/.source);m.leftMatch[A]=RegExp(/(^(?:.|\r|\n)*?)/.source+m.match[A].source.replace(/\\(\d+)/g,y))}var C=function(g,l){g=Array.prototype.slice.call(g,0);if(l){l.push.apply(l,g);return l}return g};try{Array.prototype.slice.call(x.documentElement.childNodes, 0)}catch(G){C=function(g,l){var n=0,r=l||[];if(f.call(g)==="[object Array]")Array.prototype.push.apply(r,g);else if(typeof g.length==="number")for(var o=g.length;n<o;n++)r.push(g[n]);else for(;g[n];n++)r.push(g[n]);return r}}var J,L;if(x.documentElement.compareDocumentPosition)J=function(g,l){if(g===l){h=true;return 0}if(!g.compareDocumentPosition||!l.compareDocumentPosition)return g.compareDocumentPosition?-1:1;return g.compareDocumentPosition(l)&4?-1:1};else{J=function(g,l){var n,r,o=[],p=[];n= g.parentNode;r=l.parentNode;var u=n;if(g===l){h=true;return 0}else if(n===r)return L(g,l);else if(n){if(!r)return 1}else return-1;for(;u;){o.unshift(u);u=u.parentNode}for(u=r;u;){p.unshift(u);u=u.parentNode}n=o.length;r=p.length;for(u=0;u<n&&u<r;u++)if(o[u]!==p[u])return L(o[u],p[u]);return u===n?L(g,p[u],-1):L(o[u],l,1)};L=function(g,l,n){if(g===l)return n;for(g=g.nextSibling;g;){if(g===l)return-1;g=g.nextSibling}return 1}}k.getText=function(g){for(var l="",n,r=0;g[r];r++){n=g[r];if(n.nodeType=== 3||n.nodeType===4)l+=n.nodeValue;else if(n.nodeType!==8)l+=k.getText(n.childNodes)}return l};(function(){var g=x.createElement("div"),l="script"+(new Date).getTime(),n=x.documentElement;g.innerHTML="<a name='"+l+"'/>";n.insertBefore(g,n.firstChild);if(x.getElementById(l)){m.find.ID=function(r,o,p){if(typeof o.getElementById!=="undefined"&&!p)return(o=o.getElementById(r[1]))?o.id===r[1]||typeof o.getAttributeNode!=="undefined"&&o.getAttributeNode("id").nodeValue===r[1]?[o]:z:[]};m.filter.ID=function(r, o){var p=typeof r.getAttributeNode!=="undefined"&&r.getAttributeNode("id");return r.nodeType===1&&p&&p.nodeValue===o}}n.removeChild(g);n=g=null})();(function(){var g=x.createElement("div");g.appendChild(x.createComment(""));if(g.getElementsByTagName("*").length>0)m.find.TAG=function(l,n){var r=n.getElementsByTagName(l[1]);if(l[1]==="*"){for(var o=[],p=0;r[p];p++)r[p].nodeType===1&&o.push(r[p]);r=o}return r};g.innerHTML="<a href='#'></a>";if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&& g.firstChild.getAttribute("href")!=="#")m.attrHandle.href=function(l){return l.getAttribute("href",2)};g=null})();x.querySelectorAll&&function(){var g=k,l=x.createElement("div");l.innerHTML="<p class='TEST'></p>";if(!(l.querySelectorAll&&l.querySelectorAll(".TEST").length===0)){k=function(r,o,p,u){o=o||x;if(!u&&!k.isXML(o)){var w=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(r);if(w&&(o.nodeType===1||o.nodeType===9))if(w[1])return C(o.getElementsByTagName(r),p);else if(w[2]&&m.find.CLASS&&o.getElementsByClassName)return C(o.getElementsByClassName(w[2]), p);if(o.nodeType===9){if(r==="body"&&o.body)return C([o.body],p);else if(w&&w[3]){var D=o.getElementById(w[3]);if(D&&D.parentNode){if(D.id===w[3])return C([D],p)}else return C([],p)}try{return C(o.querySelectorAll(r),p)}catch(Q){}}else if(o.nodeType===1&&o.nodeName.toLowerCase()!=="object"){D=(w=o.getAttribute("id"))||"__sizzle__";var M=o.parentNode,N=/^\s*[+~]/.test(r);if(w)D=D.replace(/'/g,"\\$&");else o.setAttribute("id",D);if(N&&M)o=o.parentNode;try{if(!N||M)return C(o.querySelectorAll("[id='"+ D+"'] "+r),p)}catch(F){}finally{w||o.removeAttribute("id")}}}return g(r,o,p,u)};for(var n in g)k[n]=g[n];l=null}}();(function(){var g=x.documentElement,l=g.matchesSelector||g.webkitMatchesSelector||g.msMatchesSelector,n=false;try{l.call(x.documentElement,"[test!='']:sizzle")}catch(r){n=true}if(l)k.matchesSelector=function(o,p){p=p.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(o))try{if(n||!m.match.PSEUDO.test(p)&&!/!=/.test(p))return l.call(o,p)}catch(u){}return k(p,null,null,[o]).length> 0}})();(function(){var g=x.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){m.order.splice(1,0,"CLASS");m.find.CLASS=function(l,n,r){if(typeof n.getElementsByClassName!=="undefined"&&!r)return n.getElementsByClassName(l[1])};g=null}}})();k.contains=x.documentElement.contains?function(g,l){return g!==l&&(g.contains?g.contains(l): true)}:x.documentElement.compareDocumentPosition?function(g,l){return!!(g.compareDocumentPosition(l)&16)}:function(){return false};k.isXML=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false};var O=function(g,l){for(var n,r=[],o="",p=l.nodeType?[l]:l;n=m.match.PSEUDO.exec(g);){o+=n[0];g=g.replace(m.match.PSEUDO,"")}g=m.relative[g]?g+"*":g;n=0;for(var u=p.length;n<u;n++)k(g,p[n],r);return k.filter(o,r)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique= k.uniqueSort;c.text=k.getText;c.isXMLDoc=k.isXML;c.contains=k.contains})();var nb=/Until$/,ob=/^(?:parents|prevUntil|prevAll)/,pb=/,/,bb=/^.[^:#\[\.,]*$/,qb=Array.prototype.slice,rb=c.expr.match.POS,sb={children:true,contents:true,next:true,prev:true};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,e=0,f=this.length;e<f;e++){d=b.length;c.find(a,this[e],b);if(e>0)for(var h=d;h<b.length;h++)for(var i=0;i<d;i++)if(b[i]===b[h]){b.splice(h--,1);break}}return b},has:function(a){var b= c(a);return this.filter(function(){for(var d=0,e=b.length;d<e;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(xa(this,a,false),"not",a)},filter:function(a){return this.pushStack(xa(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){var d=[],e,f,h=this[0];if(c.isArray(a)){var i,k={},m=1;if(h&&a.length){e=0;for(f=a.length;e<f;e++){i=a[e];k[i]||(k[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;h&&h.ownerDocument&& h!==b;){for(i in k){e=k[i];if(e.jquery?e.index(h)>-1:c(h).is(e))d.push({selector:i,elem:h,level:m})}h=h.parentNode;m++}}return d}i=rb.test(a)?c(a,b||this.context):null;e=0;for(f=this.length;e<f;e++)for(h=this[e];h;)if(i?i.index(h)>-1:c.find.matchesSelector(h,a)){d.push(h);break}else{h=h.parentNode;if(!h||!h.ownerDocument||h===b)break}d=d.length>1?c.unique(d):d;return this.pushStack(d,"closest",a)},index:function(a){if(!a||typeof a==="string")return c.inArray(this[0],a?c(a):this.parent().children()); return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var d=typeof a==="string"?c(a,b):c.makeArray(a),e=c.merge(this.get(),d);return this.pushStack(!d[0]||!d[0].parentNode||d[0].parentNode.nodeType===11||!e[0]||!e[0].parentNode||e[0].parentNode.nodeType===11?e:c.unique(e))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a, "parentNode",d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a, "iframe")?a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,e){var f=c.map(this,b,d),h=qb.call(arguments);nb.test(a)||(e=d);if(e&&typeof e==="string")f=c.filter(e,f);f=this.length>1&&!sb[a]?c.unique(f):f;if((this.length>1||pb.test(e))&&ob.test(a))f=f.reverse();return this.pushStack(f,a,h.join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return b.length===1?c.find.matchesSelector(b[0],a)?[b[0]]:[]:c.find.matches(a,b)},dir:function(a, b,d){var e=[];for(a=a[b];a&&a.nodeType!==9&&(d===z||a.nodeType!==1||!c(a).is(d));){a.nodeType===1&&e.push(a);a=a[b]}return e},nth:function(a,b,d){b=b||1;for(var e=0;a;a=a[d])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var tb=/ jQuery\d+="(?:\d+|null)"/g,sa=/^\s+/,La=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Ma=/<([\w:]+)/,ub=/<tbody/i,vb=/<|&#?\w+;/,Na=/<(?:script|object|embed|option|style)/i, Oa=/checked\s*(?:[^=]|=\s*.checked.)/i,S={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};S.optgroup=S.option;S.tbody=S.tfoot=S.colgroup=S.caption=S.thead;S.th=S.td;if(!c.support.htmlSerialize)S._default=[1,"div<div>","</div>"]; c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==z)return this.empty().append((this[0]&&this[0].ownerDocument||x).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&& d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments, true,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments, false,function(b){this.parentNode.insertBefore(b,this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,e;(e=this[d])!=null;d++)if(!a||c.filter(a,[e]).length){if(!b&&e.nodeType===1){c.cleanData(e.getElementsByTagName("*"));c.cleanData([e])}e.parentNode&&e.parentNode.removeChild(e)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild); return this},clone:function(a,b){a=a==null?true:a;b=b==null?a:b;return this.map(function(){return c.clone(this,a,b)})},html:function(a){if(a===z)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(tb,""):null;else if(typeof a==="string"&&!Na.test(a)&&(c.support.leadingWhitespace||!sa.test(a))&&!S[(Ma.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(La,"<$1></$2>");try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML= a}}catch(e){this.empty().append(a)}}else c.isFunction(a)?this.each(function(f){var h=c(this);h.html(a.call(this,f,h.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),e=d.html();d.replaceWith(a.call(this,b,e))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)? a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){var e,f,h,i=a[0],k=[];if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&Oa.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(y){var A=c(this);a[0]=i.call(this,y,b?A.html():z);A.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:c.buildFragment(a, this,k);h=e.fragment;if(f=h.childNodes.length===1?h=h.firstChild:h.firstChild){b=b&&c.nodeName(f,"tr");f=0;for(var m=this.length,t=m-1;f<m;f++)d.call(b?c.nodeName(this[f],"table")?this[f].getElementsByTagName("tbody")[0]||this[f].appendChild(this[f].ownerDocument.createElement("tbody")):this[f]:this[f],e.cacheable||m>1&&f<t?c.clone(h,true,true):h)}k.length&&c.each(k,cb)}return this}});c.buildFragment=function(a,b,d){var e,f,h;b=b&&b[0]?b[0].ownerDocument||b[0]:x;if(a.length===1&&typeof a[0]==="string"&& a[0].length<512&&b===x&&a[0].charAt(0)==="<"&&!Na.test(a[0])&&(c.support.checkClone||!Oa.test(a[0]))){f=true;if(h=c.fragments[a[0]])if(h!==1)e=h}if(!e){e=b.createDocumentFragment();c.clean(a,b,e,d)}if(f)c.fragments[a[0]]=h?e:1;return{fragment:e,cacheable:f}};c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var e=[];d=c(d);var f=this.length===1&&this[0].parentNode;if(f&&f.nodeType===11&& f.childNodes.length===1&&d.length===1){d[b](this[0]);return this}else{f=0;for(var h=d.length;f<h;f++){var i=(f>0?this.clone(true):this).get();c(d[f])[b](i);e=e.concat(i)}return this.pushStack(e,a,d.selector)}}});c.extend({clone:function(a,b,d){var e=a.cloneNode(true),f,h,i;if(!c.support.noCloneEvent&&(a.nodeType===1||a.nodeType===11)&&!c.isXMLDoc(a)){f=a.getElementsByTagName("*");h=e.getElementsByTagName("*");for(i=0;f[i];++i)za(f[i],h[i]);za(a,e)}if(b){ya(a,e);if(d&&"getElementsByTagName"in a){f= a.getElementsByTagName("*");h=e.getElementsByTagName("*");if(f.length)for(i=0;f[i];++i)ya(f[i],h[i])}}return e},clean:function(a,b,d,e){b=b||x;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||x;for(var f=[],h=0,i;(i=a[h])!=null;h++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!vb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(La,"<$1></$2>");var k=(Ma.exec(i)||["",""])[1].toLowerCase(),m=S[k]||S._default,t=m[0],y=b.createElement("div"); for(y.innerHTML=m[1]+i+m[2];t--;)y=y.lastChild;if(!c.support.tbody){t=ub.test(i);k=k==="table"&&!t?y.firstChild&&y.firstChild.childNodes:m[1]==="<table>"&&!t?y.childNodes:[];for(m=k.length-1;m>=0;--m)c.nodeName(k[m],"tbody")&&!k[m].childNodes.length&&k[m].parentNode.removeChild(k[m])}!c.support.leadingWhitespace&&sa.test(i)&&y.insertBefore(b.createTextNode(sa.exec(i)[0]),y.firstChild);i=y.childNodes}if(i.nodeType)f.push(i);else f=c.merge(f,i)}}if(d)for(h=0;f[h];h++)if(e&&c.nodeName(f[h],"script")&& (!f[h].type||f[h].type.toLowerCase()==="text/javascript"))e.push(f[h].parentNode?f[h].parentNode.removeChild(f[h]):f[h]);else{f[h].nodeType===1&&f.splice.apply(f,[h+1,0].concat(c.makeArray(f[h].getElementsByTagName("script"))));d.appendChild(f[h])}return f},cleanData:function(a){for(var b,d,e=c.cache,f=c.expando,h=c.event.special,i=c.support.deleteExpando,k=0,m;(m=a[k])!=null;k++)if(!(m.nodeName&&c.noData[m.nodeName.toLowerCase()]))if(d=m[c.expando]){if((b=e[d]&&e[d][f])&&b.events){for(var t in b.events)h[t]? c.event.remove(m,t):c.removeEvent(m,t,b.handle);if(b.handle)b.handle.elem=null}if(i)delete m[c.expando];else m.removeAttribute&&m.removeAttribute(c.expando);delete e[d]}}});var Pa=/alpha\([^)]*\)/i,wb=/opacity=([^)]*)/,xb=/-([a-z])/ig,yb=/([A-Z])/g,Qa=/^-?\d+(?:px)?$/i,zb=/^-?\d/,Ab={position:"absolute",visibility:"hidden",display:"block"},db=["Left","Right"],eb=["Top","Bottom"],ca,Ra,ja,Bb=function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){if(arguments.length===2&&b===z)return this;return c.access(this, a,b,true,function(d,e,f){return f!==z?c.style(d,e,f):c.css(d,e)})};c.extend({cssHooks:{opacity:{get:function(a,b){if(b){var d=ca(a,"opacity","opacity");return d===""?"1":d}else return a.style.opacity}}},cssNumber:{zIndex:true,fontWeight:true,opacity:true,zoom:true,lineHeight:true},cssProps:{"float":c.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,d,e){if(!(!a||a.nodeType===3||a.nodeType===8||!a.style)){var f,h=c.camelCase(b),i=a.style,k=c.cssHooks[h];b=c.cssProps[h]||h;if(d!==z){if(!(typeof d=== "number"&&isNaN(d)||d==null)){if(typeof d==="number"&&!c.cssNumber[h])d+="px";if(!k||!("set"in k)||(d=k.set(a,d))!==z)try{i[b]=d}catch(m){}}}else{if(k&&"get"in k&&(f=k.get(a,false,e))!==z)return f;return i[b]}}},css:function(a,b,d){var e,f=c.camelCase(b),h=c.cssHooks[f];b=c.cssProps[f]||f;if(h&&"get"in h&&(e=h.get(a,true,d))!==z)return e;else if(ca)return ca(a,b,f)},swap:function(a,b,d){var e={},f;for(f in b){e[f]=a.style[f];a.style[f]=b[f]}d.call(a);for(f in b)a.style[f]=e[f]},camelCase:function(a){return a.replace(xb, Bb)}});c.curCSS=c.css;c.each(["height","width"],function(a,b){c.cssHooks[b]={get:function(d,e,f){var h;if(e){if(d.offsetWidth!==0)h=Aa(d,b,f);else c.swap(d,Ab,function(){h=Aa(d,b,f)});if(h<=0){h=ca(d,b,b);if(h==="0px"&&ja)h=ja(d,b,b);if(h!=null)return h===""||h==="auto"?"0px":h}if(h<0||h==null){h=d.style[b];return h===""||h==="auto"?"0px":h}return typeof h==="string"?h:h+"px"}},set:function(d,e){if(Qa.test(e)){e=parseFloat(e);if(e>=0)return e+"px"}else return e}}});if(!c.support.opacity)c.cssHooks.opacity= {get:function(a,b){return wb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var d=a.style;d.zoom=1;var e=c.isNaN(b)?"":"alpha(opacity="+b*100+")",f=d.filter||"";d.filter=Pa.test(f)?f.replace(Pa,e):d.filter+" "+e}};if(x.defaultView&&x.defaultView.getComputedStyle)Ra=function(a,b,d){var e;d=d.replace(yb,"-$1").toLowerCase();if(!(b=a.ownerDocument.defaultView))return z;if(b=b.getComputedStyle(a,null)){e=b.getPropertyValue(d); if(e===""&&!c.contains(a.ownerDocument.documentElement,a))e=c.style(a,d)}return e};if(x.documentElement.currentStyle)ja=function(a,b){var d,e=a.currentStyle&&a.currentStyle[b],f=a.runtimeStyle&&a.runtimeStyle[b],h=a.style;if(!Qa.test(e)&&zb.test(e)){d=h.left;if(f)a.runtimeStyle.left=a.currentStyle.left;h.left=b==="fontSize"?"1em":e||0;e=h.pixelLeft+"px";h.left=d;if(f)a.runtimeStyle.left=f}return e===""?"auto":e};ca=Ra||ja;if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=a.offsetHeight; return a.offsetWidth===0&&b===0||!c.support.reliableHiddenOffsets&&(a.style.display||c.css(a,"display"))==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var Cb=/%20/g,fb=/\[\]$/,Sa=/\r?\n/g,Db=/#.*$/,Eb=/^(.*?):\s*(.*?)\r?$/mg,Fb=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,Gb=/^(?:GET|HEAD)$/,Hb=/^\/\//,Ta=/\?/,Ib=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,Jb=/^(?:select|textarea)/i,Ca=/\s+/,Kb=/([?&])_=[^&]*/, Lb=/^(\w+:)\/\/([^\/?#:]+)(?::(\d+))?/,Ua=c.fn.load,ma={},Va={};c.fn.extend({load:function(a,b,d){if(typeof a!=="string"&&Ua)return Ua.apply(this,arguments);else if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var f=a.slice(e,a.length);a=a.slice(0,e)}e="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);e="POST"}var h=this;c.ajax({url:a,type:e,dataType:"html",data:b,complete:function(i,k,m){m=i.responseText;if(i.isResolved()){i.done(function(t){m= t});h.html(f?c("<div>").append(m.replace(Ib,"")).find(f):m)}d&&h.each(d,[m,k,i])}});return this},serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||Jb.test(this.nodeName)||Fb.test(this.type))}).map(function(a,b){var d=c(this).val();return d==null?null:c.isArray(d)?c.map(d,function(e){return{name:b.name,value:e.replace(Sa, "\r\n")}}):{name:b.name,value:d.replace(Sa,"\r\n")}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.each(["get","post"],function(a,b){c[b]=function(d,e,f,h){if(c.isFunction(e)){h=h||f;f=e;e=null}return c.ajax({type:b,url:d,data:e,success:f,dataType:h})}});c.extend({getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},ajaxSetup:function(a){c.extend(true, c.ajaxSettings,a);if(a.context)c.ajaxSettings.context=a.context},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":H.String,"text html":true,"text json":c.parseJSON,"text xml":c.parseXML}}, ajaxPrefilter:Ba(ma),ajaxTransport:Ba(Va),ajax:function(a,b){function d(o,p,u,w){if(g!==2){g=2;G&&clearTimeout(G);C=z;y=w||"";n.readyState=o?4:0;var D,Q,M;if(u){w=e;var N=n,F=w.contents,P=w.dataTypes,j=w.responseFields,q,s,v,E;for(s in j)if(s in u)N[j[s]]=u[s];for(;P[0]==="*";){P.shift();if(q===z)q=N.getResponseHeader("content-type")}if(q)for(s in F)if(F[s]&&F[s].test(q)){P.unshift(s);break}if(P[0]in u)v=P[0];else{for(s in u){if(!P[0]||w.converters[s+" "+P[0]]){v=s;break}E||(E=s)}v=v||E}if(v){v!== P[0]&&P.unshift(v);u=u[v]}else u=void 0}else u=z;u=u;if(o>=200&&o<300||o===304){if(e.ifModified){if(q=n.getResponseHeader("Last-Modified"))c.lastModified[e.url]=q;if(q=n.getResponseHeader("Etag"))c.etag[e.url]=q}if(o===304){p="notmodified";D=true}else try{q=e;u=u;if(q.dataFilter)u=q.dataFilter(u,q.dataType);var B=q.dataTypes,I=q.converters,K,T=B.length,U,R=B[0],$,ta,V,X,aa;for(K=1;K<T;K++){$=R;R=B[K];if(R==="*")R=$;else if($!=="*"&&$!==R){ta=$+" "+R;V=I[ta]||I["* "+R];if(!V){aa=z;for(X in I){U=X.split(" "); if(U[0]===$||U[0]==="*")if(aa=I[U[1]+" "+R]){X=I[X];if(X===true)V=aa;else if(aa===true)V=X;break}}}V||aa||c.error("No conversion from "+ta.replace(" "," to "));if(V!==true)u=V?V(u):aa(X(u))}}Q=u;p="success";D=true}catch(Mb){p="parsererror";M=Mb}}else{M=p;if(o){p="error";if(o<0)o=0}}n.status=o;n.statusText=p;D?i.resolveWith(f,[Q,p,n]):i.rejectWith(f,[n,p,M]);n.statusCode(m);m=z;if(e.global)h.trigger("ajax"+(D?"Success":"Error"),[n,e,D?Q:M]);k.resolveWith(f,[n,p]);if(e.global){h.trigger("ajaxComplete", [n,e]);--c.active||c.event.trigger("ajaxStop")}}}if(typeof b!=="object"){b=a;a=z}b=b||{};var e=c.extend(true,{},c.ajaxSettings,b),f=(e.context=("context"in b?b:c.ajaxSettings).context)||e,h=f===e?c.event:c(f),i=c.Deferred(),k=c._Deferred(),m=e.statusCode||{},t={},y,A,C,G,J=x.location,L=J.protocol||"http:",O,g=0,l,n={readyState:0,setRequestHeader:function(o,p){if(g===0)t[o.toLowerCase()]=p;return this},getAllResponseHeaders:function(){return g===2?y:null},getResponseHeader:function(o){var p;if(g=== 2){if(!A)for(A={};p=Eb.exec(y);)A[p[1].toLowerCase()]=p[2];p=A[o.toLowerCase()]}return p||null},abort:function(o){o=o||"abort";C&&C.abort(o);d(0,o);return this}};i.promise(n);n.success=n.done;n.error=n.fail;n.complete=k.done;n.statusCode=function(o){if(o){var p;if(g<2)for(p in o)m[p]=[m[p],o[p]];else{p=o[n.status];n.then(p,p)}}return this};e.url=(""+(a||e.url)).replace(Db,"").replace(Hb,L+"//");e.dataTypes=c.trim(e.dataType||"*").toLowerCase().split(Ca);if(!e.crossDomain){O=Lb.exec(e.url.toLowerCase()); e.crossDomain=!!(O&&(O[1]!=L||O[2]!=J.hostname||(O[3]||(O[1]==="http:"?80:443))!=(J.port||(L==="http:"?80:443))))}if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);ha(ma,e,b,n);e.type=e.type.toUpperCase();e.hasContent=!Gb.test(e.type);e.global&&c.active++===0&&c.event.trigger("ajaxStart");if(!e.hasContent){if(e.data)e.url+=(Ta.test(e.url)?"&":"?")+e.data;if(e.cache===false){J=c.now();L=e.url.replace(Kb,"$1_="+J);e.url=L+(L===e.url?(Ta.test(e.url)?"&":"?")+"_="+ J:"")}}if(e.data&&e.hasContent&&e.contentType!==false||b.contentType)t["content-type"]=e.contentType;if(e.ifModified){if(c.lastModified[e.url])t["if-modified-since"]=c.lastModified[e.url];if(c.etag[e.url])t["if-none-match"]=c.etag[e.url]}t.accept=e.dataTypes[0]&&e.accepts[e.dataTypes[0]]?e.accepts[e.dataTypes[0]]+(e.dataTypes[0]!=="*"?", */*; q=0.01":""):e.accepts["*"];for(l in e.headers)t[l.toLowerCase()]=e.headers[l];if(e.beforeSend&&(e.beforeSend.call(f,n,e)===false||g===2)){d(0,"abort");n=false}else{for(l in{success:1, error:1,complete:1})n[l](e[l]);if(C=ha(Va,e,b,n)){g=n.readyState=1;e.global&&h.trigger("ajaxSend",[n,e]);if(e.async&&e.timeout>0)G=setTimeout(function(){n.abort("timeout")},e.timeout);try{C.send(t,d)}catch(r){status<2?d(-1,r):c.error(r)}}else d(-1,"No Transport")}return n},param:function(a,b){var d=[],e=function(h,i){i=c.isFunction(i)?i():i;d[d.length]=encodeURIComponent(h)+"="+encodeURIComponent(i)};if(b===z)b=c.ajaxSettings.traditional;if(c.isArray(a)||a.jquery)c.each(a,function(){e(this.name,this.value)}); else for(var f in a)na(f,a[f],b,e);return d.join("&").replace(Cb,"+")}});c.extend({active:0,lastModified:{},etag:{}});var Nb=c.now(),ka=/(\=)\?(&|$)|()\?\?()/i;c.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return c.expando+"_"+Nb++}});c.ajaxPrefilter("json jsonp",function(a,b,d){d=typeof a.data==="string";if(a.dataTypes[0]==="jsonp"||b.jsonpCallback||b.jsonp!=null||a.jsonp!==false&&(ka.test(a.url)||d&&ka.test(a.data))){var e,f=a.jsonpCallback=c.isFunction(a.jsonpCallback)?a.jsonpCallback(): a.jsonpCallback,h=H[f];b=a.url;var i=a.data,k="$1"+f+"$2";if(a.jsonp!==false){b=b.replace(ka,k);if(a.url===b){if(d)i=i.replace(ka,k);if(a.data===i)b+=(/\?/.test(b)?"&":"?")+a.jsonp+"="+f}}a.url=b;a.data=i;H[f]=function(m){e=[m]};a.complete=[function(){if(H[f]=h)e&&c.isFunction(h)&&H[f](e[0]);else try{delete H[f]}catch(m){}},a.complete];a.converters["script json"]=function(){e||c.error(f+" was not called");return e[0]};a.dataTypes[0]="json";return"script"}});c.ajaxSetup({accepts:{script:"text/javascript, application/javascript"}, contents:{script:/javascript/},converters:{"text script":function(a){c.globalEval(a);return a}}});c.ajaxPrefilter("script",function(a){if(a.cache===z)a.cache=false;if(a.crossDomain){a.type="GET";a.global=false}});c.ajaxTransport("script",function(a){if(a.crossDomain){var b,d=x.getElementsByTagName("head")[0]||x.documentElement;return{send:function(e,f){b=x.createElement("script");b.async="async";if(a.scriptCharset)b.charset=a.scriptCharset;b.src=a.url;b.onload=b.onreadystatechange=function(h,i){if(!b.readyState|| /loaded|complete/.test(b.readyState)){b.onload=b.onreadystatechange=null;d&&b.parentNode&&d.removeChild(b);b=z;i||f(200,"success")}};d.insertBefore(b,d.firstChild)},abort:function(){b&&b.onload(0,1)}}}});var Ob=c.now(),ua={},Wa,da;c.ajaxSettings.xhr=H.ActiveXObject?function(){if(H.location.protocol!=="file:")try{return new H.XMLHttpRequest}catch(a){}try{return new H.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}:function(){return new H.XMLHttpRequest};try{da=c.ajaxSettings.xhr()}catch(Sb){}c.support.ajax= !!da;c.support.cors=da&&"withCredentials"in da;da=z;c.support.ajax&&c.ajaxTransport(function(a){if(!a.crossDomain||c.support.cors){var b;return{send:function(d,e){if(!Wa){Wa=1;c(H).bind("unload",function(){c.each(ua,function(k,m){m.onreadystatechange&&m.onreadystatechange(1)})})}var f=a.xhr(),h;a.username?f.open(a.type,a.url,a.async,a.username,a.password):f.open(a.type,a.url,a.async);if(!(a.crossDomain&&!a.hasContent)&&!d["x-requested-with"])d["x-requested-with"]="XMLHttpRequest";try{c.each(d,function(k, m){f.setRequestHeader(k,m)})}catch(i){}f.send(a.hasContent&&a.data||null);b=function(k,m){if(b&&(m||f.readyState===4)){b=0;if(h){f.onreadystatechange=c.noop;delete ua[h]}if(m)f.readyState!==4&&f.abort();else{var t=f.status,y,A=f.getAllResponseHeaders(),C={},G=f.responseXML;if(G&&G.documentElement)C.xml=G;C.text=f.responseText;try{y=f.statusText}catch(J){y=""}t=t===0?!a.crossDomain||y?A?304:0:302:t==1223?204:t;e(t,y,C,A)}}};if(!a.async||f.readyState===4)b();else{h=Ob++;ua[h]=f;f.onreadystatechange= b}},abort:function(){b&&b(0,1)}}}});var oa={},Pb=/^(?:toggle|show|hide)$/,Qb=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,la,Da=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b,d){if(a||a===0)return this.animate(Z("show",3),a,b,d);else{d=0;for(var e=this.length;d<e;d++){a=this[d];b=a.style.display;if(!c._data(a,"olddisplay")&&b==="none")b=a.style.display="";b===""&&c.css(a,"display")=== "none"&&c._data(a,"olddisplay",Ea(a.nodeName))}for(d=0;d<e;d++){a=this[d];b=a.style.display;if(b===""||b==="none")a.style.display=c._data(a,"olddisplay")||""}return this}},hide:function(a,b,d){if(a||a===0)return this.animate(Z("hide",3),a,b,d);else{a=0;for(b=this.length;a<b;a++){d=c.css(this[a],"display");d!=="none"&&!c._data(this[a],"olddisplay")&&c._data(this[a],"olddisplay",d)}for(a=0;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b,d){var e=typeof a=== "boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||e?this.each(function(){var f=e?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(Z("toggle",3),a,b,d);return this},fadeTo:function(a,b,d,e){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d,e)},animate:function(a,b,d,e){var f=c.speed(b,d,e);if(c.isEmptyObject(a))return this.each(f.complete);return this[f.queue===false?"each":"queue"](function(){var h=c.extend({}, f),i,k=this.nodeType===1,m=k&&c(this).is(":hidden"),t=this;for(i in a){var y=c.camelCase(i);if(i!==y){a[y]=a[i];delete a[i];i=y}if(a[i]==="hide"&&m||a[i]==="show"&&!m)return h.complete.call(this);if(k&&(i==="height"||i==="width")){h.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(c.css(this,"display")==="inline"&&c.css(this,"float")==="none")if(c.support.inlineBlockNeedsLayout)if(Ea(this.nodeName)==="inline")this.style.display="inline-block";else{this.style.display="inline"; this.style.zoom=1}else this.style.display="inline-block"}if(c.isArray(a[i])){(h.specialEasing=h.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(h.overflow!=null)this.style.overflow="hidden";h.curAnim=c.extend({},a);c.each(a,function(A,C){var G=new c.fx(t,h,A);if(Pb.test(C))G[C==="toggle"?m?"show":"hide":C](a);else{var J=Qb.exec(C),L=G.cur()||0;if(J){var O=parseFloat(J[2]),g=J[3]||"px";if(g!=="px"){c.style(t,A,(O||1)+g);L=(O||1)/G.cur()*L;c.style(t,A,L+g)}if(J[1])O=(J[1]==="-="?-1:1)*O+L;G.custom(L, O,g)}else G.custom(L,C,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);this.each(function(){for(var e=d.length-1;e>=0;e--)if(d[e].elem===this){b&&d[e](true);d.splice(e,1)}});b||this.dequeue();return this}});c.each({slideDown:Z("show",1),slideUp:Z("hide",1),slideToggle:Z("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){c.fn[a]=function(d,e,f){return this.animate(b,d,e,f)}});c.extend({speed:function(a,b,d){var e=a&&typeof a=== "object"?c.extend({},a):{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};e.duration=c.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in c.fx.speeds?c.fx.speeds[e.duration]:c.fx.speeds._default;e.old=e.complete;e.complete=function(){e.queue!==false&&c(this).dequeue();c.isFunction(e.old)&&e.old.call(this)};return e},easing:{linear:function(a,b,d,e){return d+e*a},swing:function(a,b,d,e){return(-Math.cos(a*Math.PI)/2+0.5)*e+d}},timers:[],fx:function(a, b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||c.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return parseFloat(c.css(this.elem,this.prop))||0},custom:function(a,b,d){function e(i){return f.step(i)}var f=this,h=c.fx;this.startTime=c.now();this.start= a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;this.pos=this.state=0;e.elem=this.elem;if(e()&&c.timers.push(e)&&!la)la=setInterval(h.tick,h.interval)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b= c.now(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var e in this.options.curAnim)if(this.options.curAnim[e]!==true)d=false;if(d){if(this.options.overflow!=null&&!c.support.shrinkWrapBlocks){var f=this.elem,h=this.options;c.each(["","X","Y"],function(k,m){f.style["overflow"+m]=h.overflow[k]})}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var i in this.options.curAnim)c.style(this.elem, i,this.options.orig[i]);this.options.complete.call(this.elem)}return false}else{a=b-this.startTime;this.state=a/this.options.duration;b=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||b](this.state,a,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length|| c.fx.stop()},interval:13,stop:function(){clearInterval(la);la=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};var Rb=/^t(?:able|d|h)$/i, Xa=/^(?:body|html)$/i;c.fn.offset="getBoundingClientRect"in x.documentElement?function(a){var b=this[0],d;if(a)return this.each(function(i){c.offset.setOffset(this,a,i)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);try{d=b.getBoundingClientRect()}catch(e){}var f=b.ownerDocument,h=f.documentElement;if(!d||!c.contains(h,b))return d?{top:d.top,left:d.left}:{top:0,left:0};b=f.body;f=pa(f);return{top:d.top+(f.pageYOffset||c.support.boxModel&&h.scrollTop|| b.scrollTop)-(h.clientTop||b.clientTop||0),left:d.left+(f.pageXOffset||c.support.boxModel&&h.scrollLeft||b.scrollLeft)-(h.clientLeft||b.clientLeft||0)}}:function(a){var b=this[0];if(a)return this.each(function(t){c.offset.setOffset(this,a,t)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d,e=b.offsetParent,f=b.ownerDocument,h=f.documentElement,i=f.body;d=(f=f.defaultView)?f.getComputedStyle(b,null):b.currentStyle;for(var k= b.offsetTop,m=b.offsetLeft;(b=b.parentNode)&&b!==i&&b!==h;){if(c.offset.supportsFixedPosition&&d.position==="fixed")break;d=f?f.getComputedStyle(b,null):b.currentStyle;k-=b.scrollTop;m-=b.scrollLeft;if(b===e){k+=b.offsetTop;m+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&Rb.test(b.nodeName))){k+=parseFloat(d.borderTopWidth)||0;m+=parseFloat(d.borderLeftWidth)||0}e=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"){k+=parseFloat(d.borderTopWidth)|| 0;m+=parseFloat(d.borderLeftWidth)||0}d=d}if(d.position==="relative"||d.position==="static"){k+=i.offsetTop;m+=i.offsetLeft}if(c.offset.supportsFixedPosition&&d.position==="fixed"){k+=Math.max(h.scrollTop,i.scrollTop);m+=Math.max(h.scrollLeft,i.scrollLeft)}return{top:k,left:m}};c.offset={initialize:function(){var a=x.body,b=x.createElement("div"),d,e,f,h=parseFloat(c.css(a,"marginTop"))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}); b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";a.insertBefore(b,a.firstChild);d=b.firstChild;e=d.firstChild;f=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=e.offsetTop!==5;this.doesAddBorderForTableAndCells=f.offsetTop===5;e.style.position= "fixed";e.style.top="20px";this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15;e.style.position=e.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==h;a.removeChild(b);c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.css(a,"marginTop"))||0;d+=parseFloat(c.css(a, "marginLeft"))||0}return{top:b,left:d}},setOffset:function(a,b,d){var e=c.css(a,"position");if(e==="static")a.style.position="relative";var f=c(a),h=f.offset(),i=c.css(a,"top"),k=c.css(a,"left"),m=e==="absolute"&&c.inArray("auto",[i,k])>-1;e={};var t={};if(m)t=f.position();i=m?t.top:parseInt(i,10)||0;k=m?t.left:parseInt(k,10)||0;if(c.isFunction(b))b=b.call(a,d,h);if(b.top!=null)e.top=b.top-h.top+i;if(b.left!=null)e.left=b.left-h.left+k;"using"in b?b.using.call(a,e):f.css(e)}};c.fn.extend({position:function(){if(!this[0])return null; var a=this[0],b=this.offsetParent(),d=this.offset(),e=Xa.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.css(a,"marginTop"))||0;d.left-=parseFloat(c.css(a,"marginLeft"))||0;e.top+=parseFloat(c.css(b[0],"borderTopWidth"))||0;e.left+=parseFloat(c.css(b[0],"borderLeftWidth"))||0;return{top:d.top-e.top,left:d.left-e.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||x.body;a&&!Xa.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}}); c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(e){var f=this[0],h;if(!f)return null;if(e!==z)return this.each(function(){if(h=pa(this))h.scrollTo(!a?e:c(h).scrollLeft(),a?e:c(h).scrollTop());else this[d]=e});else return(h=pa(f))?"pageXOffset"in h?h[a?"pageYOffset":"pageXOffset"]:c.support.boxModel&&h.document.documentElement[d]||h.document.body[d]:f[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?parseFloat(c.css(this[0], d,"padding")):null};c.fn["outer"+b]=function(e){return this[0]?parseFloat(c.css(this[0],d,e?"margin":"border")):null};c.fn[d]=function(e){var f=this[0];if(!f)return e==null?null:this;if(c.isFunction(e))return this.each(function(i){var k=c(this);k[d](e.call(this,i,k[d]()))});if(c.isWindow(f)){var h=f.document.documentElement["client"+b];return f.document.compatMode==="CSS1Compat"&&h||f.document.body["client"+b]||h}else if(f.nodeType===9)return Math.max(f.documentElement["client"+b],f.body["scroll"+ b],f.documentElement["scroll"+b],f.body["offset"+b],f.documentElement["offset"+b]);else if(e===z){f=c.css(f,d);h=parseFloat(f);return c.isNaN(h)?f:h}else return this.css(d,typeof e==="string"?e:e+"px")}})})(window);

var test = window.location.toString();
test = test.slice(0,test.lastIndexOf('/'));
// global vars so refresh function still has scope on them.
var allCountries, allContinents, logFixed, allObjectives = [], allPlayers = [];

var images = {
	attackonly:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00SIDAT8Ocd%60%60%F8%0F%C4%14%83w%EF%DE1%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%08%14%04I%90%8B!.%94%94%94%84%BB%90%02%C3h%E8B%E40%1Cu!%A9%B1%8D%99%0EG%C3p%10%86!%25%05%05%7DJ%1Bj%B8%10%00%F6%99%89%EE%AE%84%9A%9C%00%00%00%00IEND%AEB%60%82",
	bombarded:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00%5BIDAT8Ocd%60%60%F8%0F%C4%60%F0%EE%DD%3B%18%93(ZHH%08%AE%EE%FF%FF%FF%8C0%0E%C8%400%06%1AH%12%86%E9%03%D1%40%00%22%C0f%8E%1AH%7C8%8E%86%E1h%B2%19%99Y%0F9%E5%93%CA%C6Z%DA%90j%08%C1%AC%C7%C2%C2%F2%9F%9D%9D%1D%5E%9C%91b%01%CC%85%00%16%23rE%C7(%B7)%00%00%00%00IEND%AEB%60%82",
	bombard:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00IIDAT8Ocd%60%60%F8%0F%C4%14%83%FF%FF%FF3%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%F8%EE%DD%BB%FF%A4%60d%C7%8C%1A%08%89%18R%C2%0F%A4v4%0C1%13%F6h%18%12LF%A3%C9%06%9Cl%00x%E0%90%9C%EB%B7%F2%06%00%00%00%00IEND%AEB%60%82",
	defendonly:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00JIDAT8O%ED%94%C1%0A%000%08B%ED%FF%FF%B5_p%C9%D8%D8%B9%DA-%C1c%8F%10%D1%000%5C%16I%3B%10%01%CB%0E%20d%A9%0C%13%E3%02%DD%9DY%BF%CF%0C0%97%E3d%B8%8B%9D%ED%A0%EE%26%C3O%E3%D0%BE6%DD%C0%05%90%82%90%9C%E5%9D%92.%00%00%00%00IEND%AEB%60%82",
	mutualbomb:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00IIDAT8Ocd%60%60%F8%0F%C4%60%F0%EE%DD%3B%18%93(ZHH%08%AE%EE%FF%FF%FF%8C0%0E%C8%400%06%1AH%12%86%E9%03%D1%40%00%22%C0f%8E%1AH%7C8%8E%86!E%C9%E6%3D(%CD%8E%86%E1h%18%0E%D6%E2%0B%00%3C%03%D6l4%B8H%5D%00%00%00%00IEND%AEB%60%82",
	normal:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00NIDAT8Ocd%60%60%F8%0F%C4%14%83w%EF%DE1%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%8Aa%E7%A1%EA%EF%A3%EB%83%1B%08d%FC%A7%12%86%B8%90J%86%81%1C5j%20%E5%913%1A%86%23'%0CI%2C%1Cp%16%24%E4%966%F47%10%00%AB%88%ED%BB%03%F0'%AC%00%00%00%00IEND%AEB%60%82",
	safe:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00PIDAT8Ocd%60%60%F8%0F%C4%14%83%FF%FF%FF3%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%F8%EE%DD%BB%FF%A4%60d%C7%8C%1A%08%89%18R%C2%0F%A4v4%0C1%13%F6h%18%12LF%04%93%0D%25%05%05%7DJ%1Bj%B8%10%00%0A%D1%2C4%3D%FCt%15%00%00%00%00IEND%AEB%60%82"
};

//---- Prototyping ----
String.prototype.has = function(key) {
	return this.indexOf(key) > -1;
};
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
};
String.prototype.normalizeSpaces = function() {
	return this.replace(/\s+/g," ").trim();
};
String.prototype.startsWith = function(str){
	return (this.match("^"+str)==str);
};
String.prototype.endsWith = function(str){
	return (this.match(str+"$")==str);
};
Array.map = function(array, fn) {
	var r = [], l = array.length, i;
	for(i=0;i<l;i++) {
		r.push(fn(array[i]));
	}
	return r;
};
Array.intersect =function(array1, array2) {
	var temp = [], i;
	for (i = 0; i < array1.length; i++){
		if ($.inArray(array1[i], array2) != -1) {
			temp.push(array1[i]);
		}
	}
	return temp;
};
Array.removeAll =function(array1, array2) {
	var temp = [], i;
	for(i = 0; i < array1.length; i++){
		if ($.inArray(array1[i], array2)== -1) {
			temp.push(array1[i]);
		}
	}
	return temp;
};


$.fn.exists = function(){
	return $(this).length>0;
};
//-----------------------------------------------------------------------------
// Please Wait coding - creates a Div that gets in the way of people doing things!
//-----------------------------------------------------------------------------

// Start/stop please wait
function stopWaiting(){
	showPopup(false);
}

// Start please wait with custom message
function customStartWaiting(msg){
	showPopup(true);
	var popup = $('#popup');
	if (!popup.find('#pleaseWaitImage').exists()) {
		popup.append($('<img id="pleaseWaitImage" src="http://static.conquerclub.com/loading.gif"/>')
			.css('paddingRight','2px')
			.css("vertical-align","middle"));
	}
	if (!popup.find('#pleaseWaitMessage').exists()) {
		popup.append($('<span id="pleaseWaitMessage"></span>'));
	}
	$('#pleaseWaitMessage').html(msg);
}

// Functions for showing/hiding please wait message
function showPopup(show){
	var popup = $('#popup').add('#popupBackground');
	if (!popup.exists()) {
		popup = createPopup();
	}
	popup.toggle(show);
	return popup;
}

function createPopup(){
	var opacity = "0.5", backColour = "#000000", frontColour = "#FFFFFF";
	var popupBackground = $('<div id="popupBackground"></div>').css({
		position:'absolute',
		height:'100%',
		width:'100%',
		display:'none',
		opacity: opacity,
		backgroundColor: backColour,
		zIndex:98,
		top:0,
		left:0
	});
	var popup = $('<div id="popup"></div').css({
		backgroundColor: frontColour,
		opacity: 1,
		position: 'absolute',
		top: "20%",
		left: "30%",
		zIndex:99,
		padding: "10px",
		verticalAlign: "middle",
		border: '1px solid black'
	});

	// Show please wait over central column only.
	$('#middleColumn').append(popup);
	$('#middleColumn').append(popupBackground);
	return popup.add(popupBackground);
}

var startLogTime = (new Date()).getTime();

//Game Enumerations
var eGameType = {
	TERMINATOR:0,
	STANDARD:1,
	DOUBLES:2,
	TRIPLES:3,
	QUADRUPLES:4,
	ASSASSIN:5
};
var ePlayOrder = {
	FREESTYLE:0,
	SEQUENTIAL:1
};
var eBonusCards = {
	"NO SPOILS":0,
	"FLAT RATE":1,
	ESCALATING:2,
	NUCLEAR:3
};
var eFortifications = {
	ADJACENT:0,
	CHAINED:1,
	UNLIMITED:2
};

function GameSettings(){
	this.gamenr = $("#game2").val();
	// ---- determine fog ----
	if (dashboard.exists()) {
		var options = {};
		dashboard.find("dl > dt").each(function() {
			var dt = $(this);
			options[dt.html()] = dt.next().html();
		});

		this.fog = options["Fog of War"] == "Yes";
		//determine speed
		this.speed = dashboard.find("h3").html().startsWith("Speed");
		// ---- Get Game Modes ----
		this.playOrder = ePlayOrder[options["Play Order"].toUpperCase()];
		this.type = eGameType[options["Game Type"].toUpperCase()];
		this.fortifications = eFortifications[options["Reinforcements"].toUpperCase()];
		this.spoils = eBonusCards[options["Spoils"].toUpperCase()];
	}
}

//-------------------------------------------------------------------------
// OBJECTS
//-------------------------------------------------------------------------

//Player Class
function Player(pid, name){
	this.name = name;
	this.pid = pid;
	this.cards = 0;
	this.armies = 0;
	this.countries = 0;
	this.calculatedCountries = 0;
	this.continentBonus = 0;
	this.territoryBonus = 0;
	this.armiesLastTurn = 0;
	this.lastTerritoryBonus = 0;
	this.lastContinentBonus = 0;
	this.isHandingInCards = false;
	this.lastBonusFixed = false;
	this.points = 0;
	this.deferred = 0;
	this.skipped = 0;
	this.total_skipped = 0;
	this.continents = [];

	this.killToReduce = function() {
		var countries = this.countries, rem;
		if (gameSettings.fog) {
			countries = this.calculatedCountries;
		}
		if (countries < 12 ) {
			return "-";
		}
		rem = countries % 3;
		return (rem===0)?"*": ( rem == 1 ? "**" : "***") ;
	};
	this.ContinentsDisplay = function() {
		var ret = "", index, continent, country,
			template = "<span class='%clazz%' title='%title%'>%name%&nbsp%bonus% </span>";
		for (index = 0; index < this.continents.length; index++) {
			continent = allContinents[this.continents[index]];
			ret += fillTemplate(template, {
				name:continent.name.replace(" ","&nbsp;"),
				bonus:"(" +continent.bonus + ")",
				title: this.continents[index] + ".) " + continent.name,
				clazz: "continent"
			});
		}
		for (index = 0; index < allCountries.length; index++) {
			country = allCountries[index];
			if ((country.bonus!==0) && (country.pid == this.pid)) {
				ret += fillTemplate(template, {
					bonus:"[" + country.bonus + "]",
					name:country.name.replace(" ","&nbsp;"),
					title:country.name,
					clazz:"country"
				});
			}
		}
		return ret;
	};
}
function fillTemplate(template, filling) {
	return template.replace(/%(\w*)%/g,function(){return filling[arguments[1]] || "";});
}

function lightUpNeighbours (country) {
	lightupCountries(country.borders, "BORDER");
	lightupCountries(country.attackedBy, "DEFEND");
	lightupCountries(country.attacks, "ATTACK");
	lightupCountries(country.bombards, "BOMBARDS");
	lightupCountries(country.bombardedBy, "BOMBARDED");
	lightupCountries(country.bombardments, "MUTUAL");
}

function createDivs() {
	var toAdd = "", i;
	for (i = 0; i < allCountries.length; i++) {
		toAdd += "<div id='" + i + "m' class='off'></div>";
	}
	return $(toAdd);
}
function updateDivs() {
	var i, country;
	for (i = 0; i < allCountries.length; i++) {
		country = allCountries[i];
		$('#' + i +"m").css({
			width: (12 + (("" + country.quantity).length)*8),
			left: country['x' + mapSize] - 11,
			top: country['y' + mapSize] - 37
		});
	}
}

function displayCountry(country) {
	var pid = country.pid, result;
	if (pid == UID) {
		pid = NID;
	}
	result = '<span class="pColor' + pid + ' country" title="' + country.name + '">' + replaceSpace(country.name) + '(' + (country.quantity ==-1?"?":country.quantity) + ') ';
	if (country.bonus != 0) {
		result += '['+country.bonus+'] ';
	}
	result += '</span>';
	return result;
}

function getInspectCountry(country) {
	var result = displayCountry(country);
	result += getInspectRepresentation(country.attacks, images.attackonly, "Attacks");
	result += getInspectRepresentation(country.borders, images.normal, "Borders");
	result += getInspectRepresentation(country.attackedBy, images.defendonly, "Attacked By");
	result += getInspectRepresentation(country.bombards, images.bombard, "Bombards");
	result += getInspectRepresentation(country.bombardedBy, images.bombarded, "Bombarded by");
	result += getInspectRepresentation(country.bombardments, images.mutualbomb, "Mutual Bombardment");
	return result;
}
function getInspectRepresentation(countries, image, text) {
	var result = "", index;
	if (countries.length > 0) {
		result +='<br><img class="attackhovers" src='+image+'>';
		result += '<span> ' + text + ' </span>';
		result += '[ ';
		for (index = 0; index < countries.length; index++) {
			result += displayCountry(allCountries[countries[index]]);
		}
		result += ' ]';
	}
	return result;
}

function lightupCountries(countries, type) {
	for (var i = 0; i < countries.length; i++) {
		lightUp(countries[i], type);
	}
}
function lightUp(index, type) {
	var country = allCountries[index], pid = country.pid, clazz, safe;
	if (pid == UID) {
		pid = NID;
	}
	clazz = 'player' + pid;
	if (type) { // show attack type
		if (type=="BORDER") {
			clazz += " typeborder";
		} else if (type=="ATTACK") {
			clazz += " typeattack";
		} else if (type=="DEFEND") {
			clazz += " typedefend";
		} else if (type=="BOMBARDS") {
			clazz += " typebombards";
		} else if (type=="BOMBARDED") {
			clazz += " typebombarded";
		} else if (type=="MUTUAL") {
			clazz += " typemutualbombard";
		}
	} else {
		safe = isSafe(country);
		if (safe === 0) {
			clazz += " h";
		} else if (safe == 1) {
			clazz += " i";
		} else {
			clazz += " j";
		}
	}
	$("#" + index + "m").attr("class", clazz).width((12 + (("" + country.quantity).length)*8));
}
function checkBorders(howSafe, pid, countries) {
	if (howSafe == 0) {
		return 0;
	}
	var k,bb;
	for (k=0; k < countries.length; k++){
		bb = allCountries[countries[k]];
		if (bb.pid == NID) {
			if (bb.armies == '?') {
				return 0;
			} else {
				continue;
			}
		}
		if (bb.pid != pid) {
			// it's not mine
			howSafe = 1;
			// Or team?
			if (teamNumber(bb.pid) != teamNumber(pid)) {
				return 0;
			}
		}
	}
	return howSafe;
}
		
function isSafe(country) {
	if (this.armies == '?') {
		return 0;
	}
	var howSafe = 2;
	howSafe = checkBorders(howSafe, country.pid, country.attackedBy);
	howSafe = checkBorders(howSafe, country.pid, country.borders);
	howSafe = checkBorders(howSafe, country.pid, country.bombardedBy);
	howSafe = checkBorders(howSafe, country.pid, country.bombardments);
	return howSafe;
}

function displayContinent(continent, index) {
	var result = "", i;
	for (i = 0; i < continent.owners.length; i++) {
		if (!continent.overriden[i]) {
			result += '<span class="pColor' + continent.owners[i] + ' continent" title="' + index + ".) " + continent.name + '">' + replaceSpace(continent.name) + '&nbsp;';
			if (continent.bonus !== 0) {
				result += '['+continent.bonus+']';
			}
			result += '</span>';
		}
	}
	if (continent.owners.length<1) {
		result += '<span class="pColor' + NID + ' continent" title="' + index + ".) " + continent.name + '">' + replaceSpace(continent.name) + '&nbsp;';
		if (continent.bonus !== 0) {
			result += '['+continent.bonus+']';
		}
		result += '</span>';
	}
	return result;
}

function Objective (name, realname) {
	this.name = name;
	this.realname = realname;
	this.countrys = [];
	this.continents = [];
	this.required = 0;
	this.owners = []; // hold the owners of this objective (note could be many more than one)
}
function lightUpContinent(continent) {
	for (var i = 0; i < continent.territories.length; i++) {
		lightUp(continent.territories[i]);
	}
	for (i = 0; i < continent.subcontinents.length; i++) {
		lightUpContinent(allContinents[continent.subcontinents[i]]);
	}
}


//-------------------------------------------------------------------------
// FUNCTIONS
//-------------------------------------------------------------------------

// Add in "Start BOB" button
function addStartBOB(){
	if ($('#startBobLink').exists()) {
		return; //already there
	}
	var bobLink = $('<a id="startBobLink">Start Bob</a>'), bobSpan = $('<span id="startbob"></span>');
	bobLink.click(startBOB);
	bobSpan.append('] [').append(bobLink).append();
	$('#right_hand_side > a').last().after(bobSpan);
}

function startBOB(){
	$('#startbob').hide();
	forceInit = true;
	gm_ConquerClubGame();
}

function addConfirmDropGameClickHandlers(){
	var dropGameLinks = $('#middleColumn table.listing a').filter(function() {
		return this.innerHTML == 'Drop Game';
	});
	if (!dropGameLinks || dropGameLinks.length == 0) {
		return;
	}

	if (myOptions.confirm_drop == "On") {
		dropGameLinks.click(function() {
			var gameNr = this.href.split('=')[2];
			if (confirm('Drop Game #' + gameNr + '?')) {
				return true;
			}
			return false;
		});
	} else {
		dropGameLinks.unbind('click');
	}
}

function createGamesTogether(){
	if (!location.href.has("mode=viewprofile") || myOptions.games_together=="Off" || $('#gamesTogether').exists()) {
		return;
	}
	var allLinks = $('dl.details.left-box').find('a'), i, link;
	for(i = 0; i < allLinks.size(); i++) {
		if (allLinks.eq(i).text().has("Find all games")) {
				link = allLinks.get(i).href + "&p2=" + $("#leftColumn .vnav").find("p:first a b").html();
				allLinks.eq(i).parent().after(' | <strong><a id="gamesTogether" href="' + link + '">Show all games together</a></strong>');
		}
	}
}

function showMoreTextMap() {
	var sml = $('#showMoreLink');
	if (sml.html()=="fixed text map") {
		$('#textMap').css({
			height:"",
			overflowY:"hidden"
		});
		sml.html("scrollable text map");
	} else {
		if ($('#textMap').height()>=200) {
			$('#textMap').css({
				height:"200px",
				overflowY:"auto"
			});
			sml.html("fixed text map");
		} else {
			sml.parent().hide();
		}
	}
	updateMenuHiderHeight();
}

function showMoreStats() {
	var sml = $('#showMoreStatsLink');
	if (sml.html()=="fixed statistics") {
		$("#statsbody").css({
			height:"",
			overflowY:"hidden"
		});
		sml.html("scrollable statistics");
	} else {
		if ($('#statsTable').height()>=200) {
			$("#statsbody").css({
				height:"200px",
				overflowY:"auto"
			});
			sml.html("fixed statistics");
		}
	}
	updateMenuHiderHeight();
}

function replaceSpace(text) {
	return text.trim().replace(/( +)/g, "&nbsp;");
}

function deserialize(name) {
	return JSON.parse(GM_getValue(name, '{}'));
}

function serialize(name, val) {
	GM_setValue(name, JSON.stringify(val));
}

//-----------------------------------------------------------------------------
// DEFAULT OPTIONS SETTINGS
//-----------------------------------------------------------------------------
// THERE IS NO POINT IN EDITING THESE: CHANGES HERE WILL HAVE NO EFFECT

DEFAULT_OPTIONS = {
	jumptomap:false,
	textMapType:'Off',
	fadeMap:1,
	'24hourClockFormat':'am/pm',
	mapInspect:"On",
	confirmEnds:true,
	confirmAutoAttack:false,
	confirmDeploy:false,
	statsMode:'Extended',
	floatActions:'Off',
	hideMenu:'Off',
	MinimumFormWidth:600,
	ccdd:'On',
	fulllog:'Off',
	swapavas:'Off',
	smallavas:'Off',
	hidesigs:'Off',
	confirm_drop:'Off',
	continent_overview:'Off',
	autobob:'On',
	games_together: 'On',
	chatOnTop: 'Off',
	sideStats: true,
	showSnapsOnTop:true
};

// Load Options
var myOptions = $.extend({}, DEFAULT_OPTIONS, deserialize("OPTIONS") || {});
// Changing historic values
if (myOptions.mapInspect === true) {
	myOptions.mapInspect = "On";
} else if (myOptions.mapInspect === false){
	myOptions.mapInspect = "Off";
}
serialize("OPTIONS", myOptions);

function showKillers() {
	var ret="", index, country;
	for (index = 0; index < allCountries.length;index++) {
		country = allCountries[index];
		if (country.killer) {
			ret += '<span class="country" title="' + country.name + '">' + country.name.replace(" ","&nbsp;") + "&nbsp[" + country.neutral + "] </span>";
		}
	}
	return ret;
}


function updatePlayerCards(){
	// --- Get Player Card Counts ---
	if (gameSettings.spoils != eBonusCards.NOCARDS) {
		var players = $('#players li[id^=player]');
		players.each(function(index) {			
			var cards = $(this).find('span[id*=player_cards]').html();
			allPlayers[index + 1].cards=parseInt(cards,10);
		});
	}
}

function getLoadFullLog() {
	var result = myOptions["loadFullLog" + gameSettings.gamenr];
	if ((typeof(result)) == 'undefined') {
		result = true;
	}
	return result;
}

function getMinFormWidth() {
	return myOptions.MinimumFormWidth|| 600;
}

function getMinFormWidthMap() {
	return myOptions["MinimumFormWidth:" + mapName] || getMinFormWidth();
}

function checkFloatDice(){
	if (myOptions.floatActions == "On") {
		$('#rolls').css({
			position:'fixed',
			backgroundColor:"#EEEEEE",
			top:0,
			zIndex:4
		});
		if ($('#action-form').exists()) {
			if ($('#from_country').exists()) {
				$('#actionWrapper').css('paddingTop',"24px");
			} else {
				$('#actionWrapper').css('paddingTop',"0px");
			}
		}
	}
}

function showMapInspectDiv(){
	var mapInspectHTML = (myOptions.mapInspect == "On") ? "Map Inspect: <b><span id=hoverInfo /></b>":"";
	$('#mapinspect').html(mapInspectHTML);
}

var newfilterTo = unsafeWindow.filterTo;

unsafeWindow.filterTo =
	function(selected) {
		newfilterTo(selected);
		colourCodeDD();
	};

// code to find the country in the drop down.
function findCountry(title){
	for (var i = 0; i < allCountries.length;i++) {
		if (title == allCountries[i].name) {
			return allCountries[i];
		}
	}
	// if we can't find the country - then we need to remove the brackets.
	var bracket = title.lastIndexOf("(");
	if (bracket != -1) {
		title = title.slice(0,bracket).trim(); // remove stuff after the bracket so that we can find the country OK.
	}
	for (i = 0; i < allCountries.length;i++) {
		if (title == allCountries[i].name) {
			return allCountries[i];
		}
	}
	return null;
}

// Colour codes & Adds army counts to the Dropdown. (Note if Colour Codes is off - then sets class name back to default)
function colourCodeDD(){
	cc_log("Color Coding the dropdowns");
	// --- Color Code the drop down ---
	if (allCountries) { // checking whether BOB was started.
		$('#to_country option').add('#from_country option').each(function() {
			var country = findCountry($(this).text());
			if (country) {
				this.innerHTML = country.name + " (" + country.quantity + ")";
				if (myOptions.ccdd=="On") {
					this.className = "itemBg"+country.pid;
				} else {
					this.className = "";
				}
			}
		});
	}
}

function prepareMenuHider(init){
	if (menuIsHidden()) {
		if (init) {
			hideSideBar();
		}
		if (!showDiv) {
			var showDiv = $('<div id="showDiv"></div>').css({
				position:'absolute',
				width:'2.1%',
				left:0,
				top:0,
				height:document.height
			});
			$("body").append(showDiv);
			showDiv.hover(showSideBar, hideSideBar);
			// add div to show the menu.
			$('#leftColumn').mouseenter(showSideBar).mouseleave(hideSideBar);
		}
	} else {
		$('#showDiv').remove();
		$('#leftColumn').unbind();
	}
}

function updateMenuHiderHeight(){
	if (menuIsHidden()) {
		$("#showDiv").css('height',document.height + 'px');
	}
}

function menuIsHidden() {
	return (myOptions.hideMenu=="On" ||
		(myOptions.hideMenu=="Game" && $("#inner-map").exists()) ||
		(myOptions.hideMenu=="Site" && !$("#inner-map").exists()));
}

function hideSideBar() {
	if (!menuIsHidden()) {
		return;
	}
	var leftMenu = $("#leftColumn");
	if (isGamePage() || !leftMenu.find('span.inbox').exists()) {
		// Don't hide the menu if you have a PM and are not on a game page!
		leftMenu.hide();
		$("#outerColumnContainer").css('borderLeft',"0em solid #DDEEDD");
	}
}

function showSideBar(){
	$("#outerColumnContainer").css("borderLeft", "14em solid #DDEEDD");
	$("#leftColumn").show();
}

function setFormWidth(){
	$('#action-form').width(Math.max(getMinFormWidthMap(), $('#outer-map').width()));
}

function toggleConfDrop() {
	if (myOptions.confirm_drop == "Off") {
		myOptions.confirm_drop = "On";
	} else {
		myOptions.confirm_drop = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_confirm_drop b').html(myOptions.confirm_drop);
	addConfirmDropGameClickHandlers();
}

function toggleGamesTogether() {
	if (myOptions.games_together == 'Off') {
		myOptions.games_together = 'On';
	} else {
		myOptions.games_together = 'Off';
	}
	serialize("OPTIONS", myOptions);
	$('#menu_games_together b').html(myOptions.games_together);
	createGamesTogether();
}

function toggleColourCodeDD() {
	if (myOptions.ccdd == "Off") {
		myOptions.ccdd = "On";
	} else {
		myOptions.ccdd = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_colourcode_dd b').html(myOptions.ccdd);
	colourCodeDD();
}

function toggleFullLog() {
	if (myOptions.fulllog == "Off") {
		myOptions.fulllog = "On";
	} else {
		myOptions.fulllog = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_fulllog b').html(myOptions.fulllog);
}

function toggleSwapAvas() {
	if (myOptions.swapavas == "Off") {
		myOptions.swapavas = "On";
	} else {
		myOptions.swapavas = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_swapavas b').html(myOptions.swapavas);
	swapAvatars();
}

function toggleSmallAvas(){
	if (myOptions.smallavas == "Off") {
		myOptions.smallavas = "On";
	} else {
		myOptions.smallavas = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_smallavas b').html(myOptions.smallavas);
	smallAvatars();
}

function toggleHideSigs(){
	if (myOptions.hidesigs == "Off") {
		myOptions.hidesigs = "On";
	} else {
		myOptions.hidesigs = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_hidesigs b').html(myOptions.hidesigs);
	hideSigs();
}


function showContOver() {
	if (myOptions.continent_overview == "On") {
		$("#contOverviewWrapper").show();
		$("#objectives").show();
		if (num_players<=8) { // only need to do this if players less than or equal to 8.
			rightside.height($('#outer-map').height());
			rightside.css({
				overflow:"auto"
			});
		}
	} else {
		$("#contOverviewWrapper").hide();
	  $("#objectives").hide();
		if (num_players<=8) { // only need to do this if players less than or equal to 8.
			rightside.css({
				height:"",
				overflow:"none"
			});
		}
	}
}

function toggleContOver() {
	if (myOptions.continent_overview == "Off") {
		myOptions.continent_overview = "On";
	} else {
		myOptions.continent_overview = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_contoverview b').html(myOptions.continent_overview);
	showContOver();
}
	
function moveChatToTop() {
	var chat = $('#chat');
	if (myOptions.chatOnTop == "On") {
		dashboard.before(chat.prev()).before(chat).before($("#full-chat")).before($('form.ccform').not('#action-form'));
	} else {
		$('#middleColumn .insidegame').append(chat.prev()).append(chat).append($("#full-chat")).append($('form.ccform').not('#action-form'));
	}
	chat[0].scrollTop = chat[0].scrollHeight;
}

function toggleChatOnTop() {
	if (myOptions.chatOnTop == "On") {
		myOptions.chatOnTop = "Off";
	} else {
		myOptions.chatOnTop = "On";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_chatOnTop b').html(myOptions.chatOnTop);
	moveChatToTop();
}

function toggleFloatingActionForm(){
	// Code below stolen from edthemaster
	var actionForm = $('#action-form'), outerRolls = $('#rolls'), cards = $('#cards'), mapInspect = $('#mapinspect');
	if (myOptions.floatActions == "Off") {
		myOptions.floatActions = "On";
		showMenuOption("menu_hudWidth");
		showMenuOption("menu_hudWidthMap");
		actionForm.css({
			position:'fixed',
			bottom:0,
			zIndex:4
		});
		if (actionForm.exists()) {
			var wrapperDiv = $('<div id="actionWrapper"></div>');
			if ($('#from_country').exists()) {
				wrapperDiv.css('paddingTop',"24px");
			} else {
				wrapperDiv.css('paddingTop',"0px");
			}
			wrapperDiv.append(mapInspect).append(cards.parent().parent().css("backgroundColor","#EEEEEE"));
			actionForm.find('fieldset').append(wrapperDiv);
			setFormWidth();
		}
		outerRolls.css({
			position: 'fixed',
			backgroundColor: "#EEEEEE",
			top: 0,
			zIndex:4
		});
	} else {
		myOptions.floatActions = "Off";
		hideMenuOption("menu_hudWidth");
		hideMenuOption("menu_hudWidthMap");
		if (actionForm.exists()) {
			$('#outer-rolls').parent().before(cards.parent().parent());
			dashboard.after(mapInspect);
			actionForm.css({
				position:'relative',
				bottom:0,
				width:"100%"
			});
		}
		outerRolls.css({
			position: 'relative',
			backgroundColor: "#EEEEEE",
			top: 0
		});
	}
	serialize("OPTIONS", myOptions);
	$('#menu_hud b').html(myOptions.floatActions);
	updateMenuHiderHeight();
}
function toggleTextMapMap() {
	var current = myOptions["textMapType:" + mapName];
	if (!current) {
		myOptions["textMapType:" + mapName] = "Off";
	} else if (current == "Off") {
		myOptions["textMapType:" + mapName] = "Standard";
	} else if (current == "Standard") {
		myOptions["textMapType:" + mapName] = "Extended";
	} else {
		delete myOptions["textMapType:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	var option = $('#menu_textMap_map b');
	if (myOptions["textMapType:" + mapName]) {
		option.html(myOptions["textMapType:" + mapName]);
	} else {
		option.html("Default</b>");
	}
	setTimeout(doTextMap,100);
}

function toggleTextMap() {
	var current = myOptions.textMapType;
	if (current == "Off") {
		myOptions.textMapType = "Standard";
	} else if (current == "Standard") {
		myOptions.textMapType = "Extended";
	} else {
		myOptions.textMapType = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_textMap b').html(myOptions.textMapType);
	setTimeout(doTextMap,100);
}

function doTextMap() {
	updateTextMap();
	updateMagicMap(true);
	updateMenuHiderHeight();
	stopWaiting();
}

function toggleJumpToMap() {
	myOptions.jumptomap=!myOptions.jumptomap;
	serialize("OPTIONS", myOptions);
	$('#menu_jtm b').html(myOptions.jumptomap ? " On" : " Off");
}

function toggleStatsMode() {
	if (myOptions.statsMode == "Off") {
		myOptions.statsMode = "Standard";
	} else if (myOptions.statsMode == "Standard") {
		myOptions.statsMode = "Extended";
	} else {
		myOptions.statsMode = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_stats b').html(myOptions.statsMode);
	$('#showMoreStatsLink').html("scrollable statistics");
	updateStats();
	updateMenuHiderHeight();
	stopWaiting();
}

function toggleSideStats() {
	myOptions.sideStats = !myOptions.sideStats;
	serialize("OPTIONS", myOptions);
	$('#menu_sideStats b').html(myOptions.sideStats?"On":"Off");
	updateSideStats();
}

function updateSideStats() {
	var on = myOptions.sideStats;
	$('#stats').toggle(on).prev().toggle(on);
}

function toggleMagicMap() {
	if (myOptions.mapInspect == "On") {
		myOptions.mapInspect = "Images only";
	} else if (myOptions.mapInspect == "Off") {
		myOptions.mapInspect = "On";
	} else {
		myOptions.mapInspect = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_mapInspect b').html(myOptions.mapInspect);
	showMapInspectDiv();
	updateMagicMap(false);
	updateMenuHiderHeight();
	stopWaiting();
}
function toggleLoadFullLog() {
	if (getLoadFullLog()) {
		myOptions["loadFullLog"  + gameSettings.gamenr] = false ;
	} else {
		delete myOptions["loadFullLog"  + gameSettings.gamenr];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_load_full_log b').html(getLoadFullLog()? " Yes" : " No");
}

function toggleConfirmActionsAA() {
	myOptions.confirmAutoAttack =! myOptions.confirmAutoAttack;
	serialize("OPTIONS", myOptions);
	$('#menu_conf_attack b').html(myOptions.confirmAutoAttack ? " On" : " Off");
}
function toggleConfirmActionsDeploy() {
	myOptions.confirmDeploy =! myOptions.confirmDeploy;
	serialize("OPTIONS", myOptions);
	$('#menu_conf_deploy b').html(myOptions.confirmDeploy ? " On" : " Off");
}

function toggleConfirmEnds() {
	myOptions.confirmEnds =! myOptions.confirmEnds;
	serialize("OPTIONS", myOptions);
	$('#menu_conf_phase b').html(myOptions.confirmEnds ? " On" : " Off");
}

function toggleFadeMap() {
	var cur = getMapfade();
	cur = Math.round((cur*10) - 1);
	if (cur >= 11) {
		cur = 1;
	}
	if (cur <= 0) {
		cur = 10;
	}
	myOptions["fadeMap:" + mapName] = cur/10;
	if (myOptions["fadeMap:" + mapName] == myOptions.fadeMap) {
		delete myOptions["fadeMap:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_fade b').html(Math.round(cur*10) + '%');
	applyFades();
}

function toggleFadeCircles() {
	var cur = getCirclesfade();
	cur += 1;
	if (cur >= 11) {
		cur = 0;
	}
	if (cur < 0) {
		cur = 10;
	}
	myOptions["fadeCircles:" + mapName] = cur;
	if (myOptions["fadeCircles:" + mapName] === 0) {
		delete myOptions["fadeCircles:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_circles_fade b').html(Math.round(cur*10) + '%');
	applyFades();
}

function toggleFormWidth() {
	var cur = getMinFormWidth() - 50;
	if (cur >= 1000) {
		cur = 1000;
	}
	if (cur >= 1200 || cur <= 599) {
		cur = 1200;
	}
	myOptions.MinimumFormWidth = cur;
	serialize("OPTIONS", myOptions);
	$('#menu_hudWidth b').html(cur);
	$('#menu_hudWidthMap b').html(getMinFormWidthMap());
	if (myOptions.floatActions == "On") {
		setFormWidth();
	}
}

function toggleFormWidthMap() {
	var cur = getMinFormWidthMap() - 50;
	if (cur >= 1000) {
		cur = 1000;
	}
	if (cur >= 1200 || cur <= 599) {
		cur = 1200;
	}
	myOptions["MinimumFormWidth:" + mapName] = cur;
	if (myOptions["MinimumFormWidth:" + mapName] == myOptions.MinimumFormWidth) {
		delete myOptions["MinimumFormWidth:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_hudWidthMap b').html(cur);
	if (myOptions.floatActions == "On") {
		setFormWidth();
	}
}

function resetMap() {
	delete myOptions["fadeMap:" + mapName];
	delete myOptions["fadeCircles:" + mapName];
	$('#menu_fade b').html('100%');
	$('#menu_circles_fade b').html('0%');
	applyFades();
	serialize("OPTIONS", myOptions);
}

function createOption(id, text, func, bgcolour) {
	var option = $('<li></li>'), anchor = $('<a></a>').css("color","black").html(text).attr("id", id).click(func);
	if (bgcolour) {
		anchor.css("backgroundColor", bgcolour);
	}
	option.append(anchor);
	return option;
}

function hideMenuOption(id) {
	$("#" + id).parent().hide();
}

function showMenuOption(id) {
	$("#" + id).parent().show();
}

function removeMenuOption(id) {
	$("#" + id).parent().remove();
}

function createGameMenu() {
	var ul = setupMenu();
	ul.append(createMapMenu('menu_sub_map', 'Map Options'));
	ul.append(createViewMenu('menu_sub_view', 'View Options'));
	ul.append(createSnapshotMenu('menu_sub_snapshots', 'Snapshots'));
	ul.append(createConfMenu('menu_sub_conf', 'Confirmations'));
	ul.find('.submenu').click(clickSubMenuItem);
	addSiteWideMenuOptions(ul);
}
function createSubmenu(id, text, ul) {
	var subAnchor = $('<a class="submenu">').html(text).attr("id",id);
	return $('<li>').append(subAnchor).append(ul);
}

function clickSubMenuItem() {
	var ulToShow = $(this).parent().find('ul');
	ulToShow.toggle();
	ulToShow.parent().parent().find('li ul').each(function() {
		if (this != ulToShow[0]) {
			$(this).hide();
		}
	});
	return false;
}

function createMapMenu(id, text) {
	var ul = $('<ul>');
	ul.append(createOption("menu_fade", "Map Opacity: <b>" + Math.round(getMapfade()*100) + '%</b>', toggleFadeMap));
	ul.append(createOption("menu_circles_fade", "Circle Whiteness: <b>" + getCirclesfade()*10 + "%</b>", toggleFadeCircles));
	ul.append(createOption("menu_textMap_map", "Text Map: <b>" + getTextMapText() + '</b>', toggleTextMapMap));
	ul.append(createOption("menu_load_full_log", "Load full log: <b>" + (getLoadFullLog()? " Yes" : " No") + '</b>', toggleLoadFullLog));
	ul.append(createOption("menu_map_reset", "Reset Map Options", resetMap));

	ul.hide();
	return createSubmenu(id, text, ul);
}

function createViewMenu(id, text) {
	var ul = $('<ul>');
	ul.append(createOption("menu_stats", "Stats: <b>" + myOptions.statsMode + '</b>', toggleStatsMode));
	ul.append(createOption("menu_sideStats", "Default stats: <b>" + (myOptions.sideStats? "On":"Off") + '</b>', toggleSideStats));
	ul.append(createOption("menu_mapInspect", "Map Inspect: <b>" + myOptions.mapInspect + '</b>', toggleMagicMap));
	ul.append(createOption("menu_textMap", "Text Map: <b>" + myOptions.textMapType + '</b>', toggleTextMap));
	ul.append(createOption("menu_contoverview", "Continent Overview: <b>" + (myOptions.continent_overview )+ '</b>', toggleContOver));
	ul.append(createOption("menu_chatOnTop", "Chat on top: <b>" + myOptions.chatOnTop + '</b>', toggleChatOnTop));
	ul.append(createOption("menu_clockformat", "Clock Format: <b>" + myOptions["24hourClockFormat"] + '</b>', toggle24HourClock));
	ul.append(createOption("menu_jtm", "Jump to Map: <b>" + (myOptions.jumptomap ? " On" : " Off")+ '</b>', toggleJumpToMap));
	ul.append(createOption("menu_hud", "HUD: <b>" + myOptions.floatActions + '</b>', toggleFloatingActionForm));
	ul.append(createOption("menu_hudWidth", "Min HUD Width: <b>"+getMinFormWidth()+'</b>', toggleFormWidth));
	ul.append(createOption("menu_hudWidthMap", "Min HUD Width(map): <b>"+getMinFormWidthMap()+'</b>', toggleFormWidthMap));
	ul.append(createOption("menu_colourcode_dd", "Colour DropDown: <b>" + myOptions.ccdd + '</b>', toggleColourCodeDD));
	if (myOptions.floatActions == "Off") {
		ul.find("#menu_hudWidth").parent().hide();
		ul.find("#menu_hudWidthMap").parent().hide();
	}
	ul.hide();
	return createSubmenu(id, text, ul);
}

function createConfMenu(id, text){
	var ul = $('<ul>');
	ul.append(createOption("menu_conf_phase", "Confirm Phase End: <b>" + (myOptions.confirmEnds ? " On" : " Off")+ '</b>', toggleConfirmEnds));
	ul.append(createOption("menu_conf_attack", "Confirm AutoAssault: <b>" + (myOptions.confirmAutoAttack ? " On" : " Off")+ '</b>', toggleConfirmActionsAA));
	ul.append(createOption("menu_conf_deploy", "Confirm Deploy: <b>" + (myOptions.confirmDeploy ? " On" : " Off")+ '</b>', toggleConfirmActionsDeploy));
	ul.hide();
	return createSubmenu(id, text, ul);
}

function createSnapshotMenu(id, text){
	var ul = $('<ul>');
	ul.append(createOption("menu_show_snaps_on_top", "Snapshots on top:<b>" + (myOptions.showSnapsOnTop ? " On" : " Off") + '</b>', switchShowSnaps));
	ul.append(createOption("menu_takesnap", "Take Snapshot", takeSnapshot));
	ul.append(createOption("menu_analyse", "Analyse Snapshot", analyse));
	var refresh = createOption("menu_refresh", "Revert To Live", reloadToLive);
	ul.append(refresh);
	ul.append(createOption("menu_delete_snaps_game", "Delete game snapshots", deleteGameSnaps));
	ul.append(createOption("menu_delete_snaps_finished", "Delete snapshots of finished games", removeFinishedGames));
	ul.append(createOption("menu_delete_snaps_all", "Delete all snapshots",deleteAllSnapshots));
	loadSnapshots(refresh);
	ul.hide();
	return createSubmenu(id, text, ul);
}
function createSideSettingsMenu(id, text) {
	var ul = $('<ul></ul>');
	ul.append(createOption("menu_fulllog", "Full Log: <b>" + myOptions.fulllog + '</b>', toggleFullLog));
	ul.append(createOption("menu_swapavas", "Swap Avatars: <b>" + myOptions.swapavas + '</b>', toggleSwapAvas));
	ul.append(createOption("menu_smallavas", "Small Avatars: <b>" + myOptions.smallavas + '</b>', toggleSmallAvas));
	ul.append(createOption("menu_hidesigs", "Hide Signatures: <b>" + myOptions.hidesigs + '</b>', toggleHideSigs));
	ul.append(createOption("menu_confirm_drop", "Confirm drop game: <b>" + myOptions.confirm_drop + '</b>', toggleConfDrop));
	ul.append(createOption("menu_games_together", "Show games together: <b>" + myOptions.games_together + '</b>', toggleGamesTogether));
	ul.append(createOption("menu_clockformat", "Clock Format: <b>" + myOptions["24hourClockFormat"] + '</b>', toggle24HourClock));
	ul.hide();
	return createSubmenu(id, text, ul);
}

function toggleAutoBob() {
	if (myOptions.autobob == "Off") {
		myOptions.autobob = "On";
	} else {
		myOptions.autobob = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_auto b').html(myOptions.autobob);
}

function toggleHideMenu() {
	if (myOptions.hideMenu == "Off") {
		myOptions.hideMenu = "Game";
	} else if (myOptions.hideMenu == "Game") {
		myOptions.hideMenu = "Site";
	} else if (myOptions.hideMenu == "Site") {
		myOptions.hideMenu = "On";
	} else {
		myOptions.hideMenu = "Off";
	}
	serialize("OPTIONS", myOptions);
	prepareMenuHider(false);
	$('#menu_hider').html("Hide Menu: <b>" + myOptions.hideMenu + '</b>');
}
function switchShowSnaps() {
	myOptions.showSnapsOnTop = !myOptions.showSnapsOnTop;
	serialize("OPTIONS", myOptions);
	showSnapshots();
	$('#menu_show_snaps_on_top').html("Snapshots on top: <b>" + (myOptions.showSnapsOnTop?"On":"Off") + '</b>');
}

function toggleUpdateAvailable(newVersionAvailable) {
	$('#menu_upgrader').html(newVersionAvailable?"<span class='attention'>Update Available</span>":"Latest Version Installed");
}

function toggle24HourClock() {
	if (myOptions["24hourClockFormat"] == "Off") {
		myOptions["24hourClockFormat"] = "am/pm";
	} else if (myOptions["24hourClockFormat"] == "am/pm") {
		myOptions["24hourClockFormat"] = "24h";
	} else {
		myOptions["24hourClockFormat"] = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_clockformat b').html(myOptions["24hourClockFormat"]);
	updateMyGamesClocks();
	adjustClock();
}

function checkForUpdate() {
	var lastversion = GM_getValue('lastupdate', 0);
	if (lastversion < new Date().getTime() - 60*60*1000) {
		GM_setValue('lastupdate', new Date().getTime() + "");
		var scriptURL = 'http://userscripts.org/scripts/source/52341.meta.js'; // ?nocache=' + Math.random();
		GM_xmlhttpRequest({
			method: 'GET',
			url: scriptURL,
			onload: updateServerNumber
		});
	}
	toggleUpdateAvailable();
}

function updateServerNumber(response) {
	try {
	 var serverVersion = /@version\s+(\d+.\d+.\d+)/.exec(response.responseText)[1];
	 GM_setValue('updateavailable', serverVersion);
	 toggleUpdateAvailable();
	}catch(e){}
}

function toggleUpdateAvailable() {
	$('#menu_upgrader').html(isNewVersion()?"<span class='attention'>Update Available</span>":"Latest version installed");
}
function isNewVersion() {
	var serverVersion = GM_getValue('updateavailable', false), newVersion, thisVersion;
	if (serverVersion) {
		newVersion = Array.map(serverVersion.split('.'), function(string) {
				return parseInt(string,10);
		 });
		 thisVersion = Array.map(versionString.split('.'), function(string) {
				return parseInt(string,10);
		 });
		 return (newVersion[0]>thisVersion[0] || (newVersion[0]==thisVersion[0] && (newVersion[1]>thisVersion[1] || (newVersion[1]==thisVersion[1] && newVersion[2]>thisVersion[2]))));
	}
	return false;
}

function setupMenu() {
	// setup menu headings.
	var gmMenu = $('<div id="bobmenu">'),
		t = $("<h3>BOB Menu <span style='font-size:7pt;' ><a href='http://www.conquerclub.com/forum/viewtopic.php?t=91386'> " + versionString + "</a></span></h3>"),
		ul = $('<ul id="bobmenuUl">');
	gmMenu.append(t).append(ul);
	$('#leftColumn').find('ul:first').parent().append(gmMenu);
	return ul;
}

function addSiteMenuOptions(ul) {
	ul.append(createSideSettingsMenu('menu_sub_sitemenu','Site Options'));
}

function addSiteWideMenuOptions(ul) {
	ul.append(createOption("menu_hider", "Hide Menu: <b>" + myOptions.hideMenu + '</b>', toggleHideMenu))
		.append(createOption("menu_auto", "Auto BOB: <b>" + myOptions.autobob + '</b>', toggleAutoBob))
		.append(createOption("menu_help", "Help/Info", showHelp	))
		.append(createOption("menu_upgrader", "Latest Version Installed", doUpgrade));
}

function hideSigs() {
	if (!location.href.has("mode=viewprofile")) {
		$("#page-body div[class*=signature]").toggle(myOptions.hidesigs!="On");
	}
}

function smallAvatars() {
	var body = $("#page-body");
	if (location.href.has("mode=viewprofile") || !body.exists()) {
		return;
	}
	var avas = body.find('dl.postprofile'), expand, smallavas = myOptions.smallavas=="On", i, dds, j, profIcons;
	for (i=0;i<avas.length;i++) {
		dds = $(avas[i]).find("dd");
		for (j=0;j<dds.length;j++) {
			profIcons = $(dds[j]).find('ul[class*=profile]');
			if (!profIcons.exists()) {
				if (dds[j].id) {
					$(dds[j]).find('#expander' + i).val(smallavas?"Expand":"Collapse");
				} else {
					$(dds[j]).toggle(!smallavas);
				}
			}
		}
		if (!dds.find('[id*=expander]').exists()) { // only add if we don't already have a button
			expand = createButtonDD(smallavas?"Expand":"Collapse", i);
			$(avas[i]).append(expand);
		}
	}
}

function expander() {
	var expand = $(this), dds = expand.parent().parent().find('dd');
	dds.each(function() {
		if ($(this).find('.profile-icons').exists() || this.id) {
			return;
		}
		$(this).toggle(expand.val()=="Expand");
	});
	if (expand.val()=="Expand") {
		expand.val("Collapse");
	} else {
		expand.val("Expand");
	}
	return false;
}

function createButtonDD(text, which) {
	var expandButton = $('<input type="Button" class="button1"></input>')
			.attr('id',"expander"+which)
			.val(text)
			.click(expander);
	return $('<dd></dd>')
			.attr('id', "expanderdd"+which)
			.append(expandButton);
}

function swapAvatars() {
	if (location.href.has("mode=viewprofile") || location.href.has("viewtopic.php")) {
		var body = $("#page-body");
		if (body.exists()) {
			var avas = body.find('dl.postprofile');
			if (myOptions.swapavas=="On") {
				avas.css({
					"float":"left",
					"border-right":"1px solid #FFFFFF",
					"border-left":"0px solid #FFFFFF"
				});
				if (avas.exists()) {
					body.find('div.postbody').css("float", "right");
					body.find('div.online').css('background-position','100% 17pt');
				}
			} else {
				avas.css({
					"float":"left",
					"border-right":"0px solid #FFFFFF",
					"border-left":"1px solid #FFFFFF"
				});
				if (avas.exists()) {
					body.find('div.postbody').css("float", "left");
					body.find('div.online').css('background-position','100% 0pt');
				}
			}
		}
	}
}

// function to change game links to load full log.
function updateGameLinks() {
	if (myOptions.fulllog=="On") {
		var hrefs = $('#middleColumn a'), i, link;
		for (i=0;i<hrefs.length;i++) { 
			link = hrefs.get(i);
			if (link.href.has("game.php")) {
				link.href += "&full_log=Y";
			}
		}
	}
}

function updateMyGamesClocks() {
	if (location.href.indexOf("mygames")>=0 || location.href.indexOf("mode=next")>=0 || location.href.indexOf("submit=Accept")>=0) { // if in mygames
		if (location.href.indexOf("mygames2")>=0 || location.href.indexOf("mygames3")>=0 || location.href.indexOf("mygames4")>=0) { // but if not in active
			return;
		}
		var elements = $('#middleColumn tr.even,tr.odd').find('td:eq(4)');
		updateMyGamesClock(elements);
	}
}

function updateMyGamesClock(elements) {
	$(elements).each(function (){
		var currentHTML = this.innerHTML,
			time = currentHTML.split('<br>')[1].split(':'),
			targetDate = new Date(),
			secondsLeft = parseInt(time[2],10) + parseInt(time[1],10) * 60 + parseInt(time[0],10) * 60 * 60,
			additionalClock = $(this).find('.additionalClock');
		targetDate.setTime(targetDate.getTime() + (secondsLeft * 1000));
		if (!additionalClock.exists()) {
			additionalClock = $('<span class="additionalClock"></span>');
			$(this).append('<br />').append(additionalClock);
		}
		additionalClock.html(getAdditionalClockInfo(targetDate));
	});
}

function showHelp() {
	window.open("http://www.hometag.net/downloads/CC/BOB/help_4.6.1.htm","bobHelp","height=600, width=600px, toolbar=no, scrollbars=yes, menubar=no").focus();
}

function doUpgrade() {
	GM_setValue('updateavailable', false);
	GM_setValue('lastupdate', new Date().getTime() + "");
	this.href = "http://userscripts.org/scripts/source/52341.user.js";
}

function cc_log(text) {
	if (unsafeWindow.console && unsafeWindow.console.log) {
		if (typeof text == "string" || typeof text == 'number') {
			text = "BOB," + ((new Date()).getTime() - startLogTime) + " ms:" + cc_log.caller.toString().split(/{/)[0].split('function')[1]+': '+text;
		}
		unsafeWindow.console.log(text);
	}
}

function padDigits(n, totalDigits){
	n = n.toString();
	var pd = '', i;
	if (totalDigits > n.length){
		for (i=0; i < (totalDigits-n.length); i++){
			pd += '0';
		}
	}
	return pd + n.toString();
}

function countDown(targetDate) {
	if (myOptions['24hourClockFormat'] !="Off") {
		var additionalClock = $('#additionalClock');
		if (!additionalClock.exists()) {
			additionalClock = $('<span id="additionalClock"></span>');
			$("#clock").after(additionalClock);
		}
		additionalClock.html(' [' + getAdditionalClockInfo(targetDate)+ ']');
	}
}

function getAdditionalClockInfo(targetDate) {
	if (myOptions['24hourClockFormat']=="Off") {
		return "";
	}
	var day = ' @ ', ampm = '', currentDate = new Date();
	if (currentDate.getDate() != targetDate.getDate()) {
		day = "Tomorrow @ ";
	} else {
		day = "Today @ ";
	}
	var hours = targetDate.getHours(), minutes = targetDate.getMinutes();
	if (myOptions['24hourClockFormat'] == "am/pm") {
		ampm = " am";
		if (hours >= 12) {
			ampm = " pm";
			hours = hours - 12;
		}
		if (hours === 0) {
			hours = 12;
		}
	} 
	return day + "<b>" + padDigits(hours, 2) + ":" + padDigits(minutes, 2) + ampm + "</b>";
}

function calcRedemption() {
	if( gameSettings.spoils == eBonusCards.ESCALATING ) {
		if( num_turnins < 5 ) {
			return num_turnins * 2 + 4;
		} else {
			return num_turnins * 5 - 10;
		}
	} else if( gameSettings.spoils == eBonusCards.FLATRATE) {
		return 7;
	}
	return 0; //no cards or nuclear
}

function calcArmiesNextTurn(countries) {
	var ret = 0;
	if (map.reinforcements.length===0) { // old school.
		if(countries < 12 ) {
			return 3;
		}
		ret = Math.floor(countries/3);
	} else { // new territory array stuff.
		var armiesAwarded = 0;
		for (var i=0;i<map.reinforcements.length;i++) {
			var lower = map.reinforcements[i].lower;
			var upper = map.reinforcements[i].upper;
			var divisor = map.reinforcements[i].divisor;
			if (countries>=lower) {
				armiesAwarded += Math.floor((Math.min(countries, upper)-(lower-1))/divisor);
			}
		}
		ret = Math.max(armiesAwarded,map.min_reinforcement);
	}
	return ret;
}

// START TAHITIWAHINI ARMIES FROM CARDS CALCULATIONS
// Source: http://www.conquerclub.com/forum/viewtopic.php?t=15620

// Returns the probability of having a set
// when holding the given number of cards.
function getSetProbability(cards) {
	if (cards < 3) {
		return 0;
	}
	if (cards == 3){
		return 1/3;
	}
	if (cards == 4){
		return 7/9;
	}
	return 1;
}

// Returns the number of armies expected from cashing in
// a set when holding the given number of cards.
function getArmiesFromCardSet(cards) {
	if (gameSettings.spoils != eBonusCards.FLATRATE) {
		return getSetProbability(cards) * calcRedemption();
	} else {
		if (cards < 3) {
			return 0;
		}
		if (cards == 3){
			return 2 + 8/9;
		}
		if (cards == 4){
			return 5 + 1/3;
		}
		return 7 + 1/3;
	}
}

// Returns the number of armies received from owning countries.
function getArmiesFromCountries(countries, continentBonus, missedTurns) {
	return (calcArmiesNextTurn(countries) + continentBonus) * (missedTurns + 1);
}

// Returns the estimated number of armies due for cashing in a set
// of cards.
function getEstimatedArmiesFromCards(cards, countries, totalCountries) {
	return getArmiesFromCardSet(cards) + (gameSettings.spoils != eBonusCards.NUCLEAR?(6 * getSetProbability(cards) * (countries / totalCountries)):0);
}

// Returns the calculated strength of a players position rounded to the nearest hundreth.
function getStrength(currentArmies, expectedArmies, countries) {
	return Math.round ((currentArmies + expectedArmies - ((2 / 3) * countries)) * 100) / 100;
}
// END TAHITIWAHINI ARMIES FROM CARDS CALCULATIONS

function getMapfade() {
	var fade = 1;
	if (typeof(myOptions["fadeMap:"+mapName])=="undefined") {
		fade = myOptions.fadeMap;
	} else {
		fade = myOptions["fadeMap:" + mapName];
	}
	// force Opacity to not be 0.
	if (fade===0) {
		return 1;
	} else {
		return fade;
	}
}
function getCirclesfade() {
	var fade = myOptions["fadeCircles:" + mapName];
	if (typeof(fade)=="undefined") {
		fade = 0;
	}
	return fade;
}

function getTextMapText() {
	if (typeof(myOptions["textMapType:"+mapName])=="undefined") {
		return "Default";
	}
	return myOptions["textMapType:" + mapName];
}
	
function getTextMap() {
	if (typeof(myOptions["textMapType:"+mapName])=="undefined") {
		return myOptions.textMapType;
	}
	return myOptions["textMapType:" + mapName];
}

function applyFades() {
	var fade = getCirclesfade()/10, i, country, x, y;
	// no canvas and no fade->no need to create a canvas
	if (fade === 0 && getMapfade() == 1) {
		$('#myCanvas').remove();
		return;
	}
	var canvas = getCanvas();
	canvas.css('background-color', 'rgba(255,255,255,' + (1 - getMapfade()) + ')');
	if (fade !== 0) {
		if (canvas[0].getContext) {
			var context = canvas[0].getContext('2d');
			context.clearRect(0,0,canvas.width(),canvas.height());
			context.strokeStyle = "rgba(0,0,0,1)";
			context.fillStyle = "rgba(255,255,255," + fade + ")";
			context.beginPath();
			for (i = 0; i < allCountries.length;i++) {
				country = allCountries[i];
				x = country['x' + mapSize] + 4;
				y = country['y' + mapSize] - 22;
				context.moveTo(x, y);
				context.arc(x, y, (mapSize=='L'?12:10), 0, 2 * Math.PI, false);
			}
			context.fill();
		}
	}
}
function getCanvas() {
	var canvas = $('#myCanvas'), outerMap = $('#outer-map');
	if (canvas[0]) {
		if (canvas.height() != outerMap.height()) {
			canvas.remove();
		} else {
			return canvas;
		}
	}
	canvas = $('<canvas id="myCanvas"></canvas>').css('background-color', 'rgba(255,255,255,' + (1 - getMapfade()) + ')');
	canvas.attr('height', outerMap.height());
	canvas.attr('width', outerMap.width());
	canvas.css({
		top:'0px',
		left:'0px',
		zIndex: 1,
		position:'absolute'
	});
	$("#outer-map").prepend(canvas);
	return canvas;
}

function updateTextMap() {
	var wrapper = $('#textMapWrapper'), textMap = $('#textMap');
	if (getTextMap()!="Off") {
		if (getTextMap()=="Standard") {
			textMap.children().remove();
			textMap.html(createTextMap(false));
		} else {
			textMap.children().remove();
			textMap.html(createTextMap(true));
		}
		$('#showMoreLink').parent().show();
		wrapper.show();
	} else {
		textMap.children().remove();
		textMap.html("");
		wrapper.hide();
	}
}

function teamNumber(pid) {
	// pid=0->neutrals, otherwise just split them up.
	if (pid==UID || pid === 0) {
		return 0;
	}
	if (gameSettings.type == eGameType.DOUBLES) {
		return Math.ceil(pid/2);
	} else if (gameSettings.type == eGameType.TRIPLES) {
		return Math.ceil(pid/3);
	} else if (gameSettings.type == eGameType.QUADRUPLES) {
		return Math.ceil(pid/4);
	}
	return pid;
}

function isTeamGame() {
	return gameSettings.type == eGameType.DOUBLES || gameSettings.type == eGameType.TRIPLES || gameSettings.type == eGameType.QUADRUPLES;
}

function updateStats() {
	var wrapper = $('#statsWrapper');
	if (myOptions.statsMode == "Off") {
		$('#statsTable').html("");
		wrapper.hide();
	} else {
		if (myOptions.statsMode == "Standard") {
			$('#statsTable').html(createStats(false));
		} else { // Extended
			var text = createStats(true);
			$('#statsTable').html(text);

		}
		$('#showMoreStatsLink').click(showMoreStats).parent().show();
		$('#hideEliminated').click(function() {
			$('#statsTable').find('tr.eliminated').toggle();
			if ($(this).html().has("Hide")) {
				$(this).html('Show eliminated players');
			} else {
				$(this).html('Hide eliminated players');
			}
		});
		wrapper.show();
		$("td.popup").hover(function() {
			var div = $('<div id="tempPopup"></div>'), that=$(this), pos = that.position();
			div.html(that.data('popup'));
			pos.top = pos.top - 15;
			div.css({
				position:'absolute',
				backgroundColor:'white',
				opacity:1,
				top:pos.top,
				left:pos.left
			});
			$('#statsWrapper').append(div);
		}, function() {
			$('#tempPopup').remove();
		});
		$('#hideConts').click(hideContinents);
	}
}

function getFullLog() {
	//if we aren't at a game-page any more, don't try to get the log
	if (!window.location.toString().has("conquerclub.com/") || !window.location.toString().has("game.php")) {
		return "";
	}
	var logHtml = $('#log').html(), thisLog, url, response, lastSend, toMatch, i, temp;
	if (logHtml.has('<br>')) {
		thisLog = logHtml.split('<br>'); //Get logs on screen
	} else {
		thisLog = logHtml.split('<BR>');// IE and Opera use BR
	}
	thisLog.pop();// remove last element, not relevant
	if (currentLog=="" && thisLog[0].has("Game has been initialized") || !getLoadFullLog()) {
		currentLog = thisLog;
	} else if (currentLog=="") {
		lastSend = new Date();
		url = test + "/game.php?game=" + gameSettings.gamenr + "&ajax=1&map_key=" + unsafeWindow.mapKey + "&chat_number=" + unsafeWindow.chatNumber+"&lastSend="+lastSend.getTime()+"&full_log=Y";
		cc_log("requesting full log");
		$.ajax({
			url: url,
			success: function(result) {
				response = result.split("&");
			},
			error: function() {
				turnOffFullLog();
			},
			async: false
		});
		if (typeof(response)=="undefined") {
			currentLog = thisLog;//best guess we have.
		} else {
			currentLog = unescape(response[16]).split('<br />');
		}
	} else {
		while (currentLog[currentLog.length - 1].length == 0) {
			currentLog.pop();
		}
		toMatch = currentLog[currentLog.length - 1];
		toMatch = toMatch.split(' - ')[1];
		i = thisLog.length;
		temp = [];
		while (thisLog[--i] && !thisLog[i].has(toMatch)) {
			temp.push(thisLog[i]);
		}

		for (i=temp.length;i>0;i--) {
			currentLog.push(temp[i - 1]);
		}
	}
	return currentLog;
}

function turnOffFullLog() {
	if (confirm("Log Downloading Failed - Would you like to retry?")) {
		location.href = location.href + "&full_log=Y";
	}
}

function getStartingLength() {
	
	var i, country, amountOfPlayers = allPlayers.length - 2, positionsPerPlayer, positionsFilled, countriesToFill = 0, extra = 0;

	if (map.positions.length) {
		positionsPerPlayer = Math.floor(map.positions.length/amountOfPlayers);
		for (i = 0; i < map.positions[0].territories.length; i++) {
			if (!allCountries[map.positions[0].territories[i]].neutral) {
				countriesToFill -= positionsPerPlayer * amountOfPlayers;
			}
		}
		extra = map.positions[0].territories.length * positionsPerPlayer;
	}

	for (i = 0; i < allCountries.length; i++) {
		country = allCountries[i];
		if (!(country.neutral)) {
			countriesToFill++;
		}
	}
	return Math.floor((countriesToFill)/(amountOfPlayers == 2? 3 : amountOfPlayers)) + extra;
}
function getDateFromLine(line) {
	  var splitted = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/.exec(line);
		if (length > 6) {
			return new Date(splitted[1],splitted[2]-1,splitted[3],splitted[4],splitted[5],splitted[6]);
		}
		return null;
}

function processLog(start, init, showProgress) {
	if (showProgress) {
		customStartWaiting("Processing Log");
	}
	var log = getFullLog(),i,player, end, index;
	cc_log("Starting Log Processing");
	if (currentSnapshot != -1) {
		end = currentSnapshot.date;
		start=0;
		init=true;
	}
	if (!init) {
		rounds = stored_rounds;
		num_turnins = stored_num_turnins;
		for (index = 0; index < allPlayers.length; index++) {
			player = allPlayers[index];
			player.skipped = stored_skipped[index];
			player.total_skipped = stored_total_skipped[index];
			player.total_skipped = stored_total_skipped[index];
			player.lastTerritoryBonus = stored_lastTerritoryBonus[index];
			player.lastContinentBonus = stored_lastContinentBonus[index];
			player.points = stored_terminator_counter[index];
			if (gameSettings.fog) {
				player.calculatedCountries = stored_countries[index];
			}
		}
		TerminatorSummary = stored_terminator_summary;
	} else {
		rounds = stored_rounds = 0;
		num_turnins = stored_num_turnins = 0;
		for (index = 0; index < allPlayers.length; index++) {
			player = allPlayers[index];
			player.skipped = stored_skipped[index] = 0;
			player.total_skipped = stored_total_skipped[index] = 0;
			player.lastTerritoryBonus = stored_lastTerritoryBonus[index] = 0;
			player.lastContinentBonus = stored_lastContinentBonus[index] = 0;
			player.armiesLastTurn = stored_armiesLastTurn[index] = 0;
			player.points = stored_terminator_counter[index] = 0;
			if (gameSettings.fog) {
				player.calculatedCountries = stored_countries[index] = getStartingLength();
			}
		}
		TerminatorSummary = stored_terminator_summary = "";
	}

	//-------------------------------------------------------------------------
	// LOGGING PATTERNS
	//-------------------------------------------------------------------------
	var str_receiveCard = " got spoils";
	var str_outOfTime = " ran out of time";
	var str_fortified = " reinforced ";
	var str_deployed = " deployed ";
	var str_attacked = " assaulted ";
	var str_conquered = "conquered";
	var str_bombarded = " bombarded ";
	var str_missedTurn = " missed a turn";
	var str_cashed = " cashed";
	var str_eliminated = " eliminated ";
	var str_holding = " holding ";
	var str_deferred = " deferred ";
	var str_armiesFor = "troops for";
	var str_territories = "regions";
	var str_annihilated = "annihilated";
	var str_receives = "received";
	var str_armies = "troops";
	var str_lost = " lost ";
	var str_gained = " gained ";
	var str_points = "points";
	var str_kickedOut = " was kicked out ";
	var str_incrementedRound = "Incrementing game to round";
	var str_initGame = "Game has been initialized";
	var str_autoDeploy = " got bonus of ";
	var str_wonGame = "won the game";

	var lossname, armies2 ;
	/*---- Process Log ----*/
	for(i = start; i < log.length; i++ ) {
		var line = log[i];
		if (end) {
			if (getDateFromLine(line) >= end.getTime()) {
				break;
			}
		}
		if (line.has('<span class="player')) {
			var num = parseInt(line.split(/"/)[1].split(/player/)[1], 10);
			player = allPlayers[num];
			if (num == 0) { //neutral player
				continue;
			}
		}
		// Process the log
		if( line.has(str_receiveCard)|| line.has(str_outOfTime) || line.has(str_fortified)){
			player.skipped = 0;
			player.deferred = 0;
		} else if(line.has(str_deployed) ) {
			player.skipped = 0;
		} else if(line.has(str_attacked)) {
			player.skipped = 0;
			if (gameSettings.fog) { //add 1 to player who conquered
				player.calculatedCountries++;
				// then minus 1 from player who lost, if not neutral
				var conquered = line.slice(line.indexOf(str_conquered));
				if (conquered.has('<span class="player')) {
					// Player Rename mid game?
					var numb = parseInt(conquered.split(/"/)[1].split(/player/)[1], 10);
					lossname = numb;
				}
				if (lossname!=NID) {
					allPlayers[lossname].calculatedCountries--;
				}
			}
		} else if(line.has(str_bombarded)) {
			player.skipped = 0;
			if (gameSettings.fog) {
				var bombarded = line.slice(line.indexOf(str_annihilated));
				if (bombarded.has('<span class="player')) {
					// Player Rename mid game?
					var numbr = parseInt(bombarded.split(/"/)[1].split(/player/)[1], 10);
					lossname = numbr;
				}
				if (lossname!=NID) { // don't minus from neutral player.
					allPlayers[lossname].calculatedCountries--;
				}
			}
		} else if( line.has(str_missedTurn) ){
			player.skipped += 1;
			player.total_skipped += 1;
		} else if( line.has(str_cashed) ){
			player.skipped = 0;
			num_turnins++;
			player.isHandingInCards = true;
		} else if( line.has(str_eliminated) ) {
			player.skipped = 0;
			TerminatorSummary += line + " in round - "+rounds+"<br/>";
		} else if (line.has(str_autoDeploy)) {
			if (!player.isHandingInCards) {
				if (player.lastBonusFixed) {
					player.lastTerritoryBonus = 0;
					player.armiesLastTurn = 0;
					player.lastContinentBonus = 0;
					player.lastBonusFixed = false;
				}
				armies2 = parseInt(/got\sbonus\sof\s(-?\d+)\stroops/.exec(line)[1],10);
				if (armies2 > 0) {
					player.lastTerritoryBonus += armies2;
				}
			}
		} else if( line.has(str_receives) ) {
			if(gameSettings.fog && !line.has(str_holding) && !line.has(str_deferred)) { // territory count calculation we know this is correct thus force correction.
				var terrCount = line.slice(line.indexOf(str_armiesFor)+11,line.indexOf(str_territories)-1);
				terrCount = parseInt(terrCount,10);
				player.calculatedCountries = terrCount;
				player.isHandingInCards = false;
			}
			player.skipped = 0; // Copied from above as receives was previously checked for and did this.
			//calculate how many armies received, and add to last bonus.
			if (player.lastBonusFixed) {
				player.lastTerritoryBonus = 0;
				player.armiesLastTurn = 0;
				player.lastContinentBonus = 0;
				player.lastBonusFixed = false;
			}
			armies2 = line.slice(line.indexOf(str_receives)+8,line.indexOf(str_armies)-1);
			armies2 = parseInt(armies2,10);
			if (line.has(str_deferred)) {
				player.deferred = armies2;
			} else {
				if (line.has(str_holding)) {
					player.lastContinentBonus += armies2;
				} else {
					player.armiesLastTurn += armies2;
				}
			}
		} else if(line.has(str_lost)) {
			if (!line.has(str_points)) {
				if (gameSettings.fog) {
					player.calculatedCountries--;
				}
			} else {
				player.deferred = 0;
				TerminatorSummary += line + " in round - "+rounds+"<br/>";
				var pointsLost = line.slice(line.indexOf(str_lost)+str_lost.length,line.indexOf(str_points)-1);
				pointsLost = parseInt(pointsLost,10);
				player.points -= pointsLost;
			}
		} else if( line.has(str_gained) ){
			player.skipped = 0;
			TerminatorSummary += line + " in round - "+rounds+"<br/>";
			var points = line.slice(line.indexOf(str_gained)+str_gained.length,line.indexOf(str_points)-1);
			points = parseInt(points,10);
			player.points += points;
		} else if(line.has(str_kickedOut)) {
			player.skipped = -1;
			TerminatorSummary += line + " in round - "+rounds+"<br/>";
			if (gameSettings.fog && isTeamGame()) {
				//work out where the armies go to after DB gives territories to team mate.
				var togo = calculateBenficiary(player);
				if (togo!=-1) {
					togo.calculatedCountries+=player.calculatedCountries;
				}
				player.calculatedCountries = 0;
			} else if (gameSettings.type != eGameType.TERMINATOR) { // if player kicked out and not terminator then blat this to 0.
				player.calculatedCountries = 0;
			}
		} else if( line.has(str_incrementedRound) || line.has(str_initGame) ) {
			stored_rounds = rounds++;
			// update starter place - and stored vars.
			logFixed=i;
			stored_num_turnins = num_turnins;
			stored_skipped = [];
			stored_total_skipped = [];
			stored_lastTerritoryBonus = [];
			stored_lastContinentBonus = [];
			stored_armiesLastTurn = [];
			stored_terminator_counter = [];
			if (gameSettings.fog) {
				stored_countries = [];
			}
			for (index = 0; index < allPlayers.length; index++) {
				player = allPlayers[index];
				stored_skipped.push(player.skipped);
				stored_total_skipped.push(player.total_skipped);
				stored_lastTerritoryBonus.push(player.lastTerritoryBonus);
				stored_lastContinentBonus.push(player.lastContinentBonus);
				stored_armiesLastTurn.push(player.armiesLastTurn);
				player.lastBonusFixed = true;
				player.deferred = 0;
				stored_terminator_counter.push(player.points);
				if (gameSettings.fog) {
					stored_countries.push(player.calculatedCountries);
				}
			}
			stored_terminator_summary = TerminatorSummary;
		} else if (line.has(str_wonGame)) {
			showDeleteAll = true;
			if (!end && !start) {
				logFixed=i+1; // Only show this on initial load.
			}
		}
	} // end of processing loops
	cc_log("Log Processing Info - Length :" + log.length);
	var termDiv = $('#summary');
	if (!termDiv.exists()) {
		termDiv = $('<div id="summary"></div>');
		$('#termWrapper').append(termDiv);
	}
	termDiv.html(TerminatorSummary + extraTerminatorInfo());
}

function extraTerminatorInfo() {
	var termCounter = "<b>Points Totals</b><br/>";
	var index,player,found = false;
	for (index = 0; index < allPlayers.length; index++) {
		player = allPlayers[index];
		if (player.pid!==0 && player.pid!=UID) {
			var nameStr = "<span class='pColor"+ player.pid +"'>"+player.name+"</span>";
			termCounter += nameStr+" scored <b>"+player.points+"</b> points in this game<br/>";
			if (player.points!==0) {
				found = true;
			}
		}
	}
	return found?termCounter:"";
}

function calculateBenficiary(curPlayer) {
	var curTeam = teamNumber(curPlayer.pid);
	for (var index = 0; index < allPlayers.length; index++) { // loop through from top to bottom.
		if (index != curPlayer.pid) { // ensure not the same player.
			if (teamNumber(index)==curTeam) { // ensure on the same team.
				var possPlayer = allPlayers[index];
				if (possPlayer.skipped!=-1) { // ensure teammate not a DB already!
					return possPlayer;
				}
			}
		}
	}
	return -1;
}

function hideContinents() {
	var button = $("#hideConts"), title = $("#conts");
	if (button.val() == "Hide") {
		button.val("Show");
		title.css('color',"#999999");
	} else {
		button.val("Hide");
		title.css('color',"#000000");
	}
	$(".continents").toggle();
}

function createStats(extended) {	
	var toReturn = "<table align=center style='width:100%;border:1px solid #FFF;background:#eee;' class='listing' rules=rows><thead><tr style='font-weight:normal;' ><th><b>P</b>layer&nbsp;</th>" + (gameSettings.spoils?"<th><b>S</b>poils&nbsp;</th>":"" )+"<th><b>M</b>issed<br><b>T</b>urns&nbsp;";
	toReturn += (extended? "(Total)":"") + "</th><th><b>T</b>roops&nbsp;</th><th><b>R</b>egions&nbsp;" + (gameSettings.fog?"/ Calc":"") + "</th>";
	if (extended) {
		toReturn += "<th><b>S</b>trength&nbsp;</th><th><b>L</b>ast<br><b>B</b>onus&nbsp;</th><th><b>T</b>roops due<br>(<b>R</b> + <b>Z</b> + <b>RB</b>)&nbsp;</th><th><b>D</b>eferred<br><b>T</b>roops&nbsp;</th>" + ((gameSettings.spoils && gameSettings.spoils != eBonusCards.NUCLEAR)?"<th><b>S</b>poils <br><b>E</b>stimate&nbsp;</th>":"" );
	} else {
		toReturn += "<th><b>L</b>ast<br><b>B</b>onus&nbsp;</th><th><b>T</b>roops<br><b>D</b>ue&nbsp;</th><th><b>D</b>eferred<br><b>T</b>roops&nbsp;</th>";
	}
	toReturn += "<th><span id='conts'><b>Z</b>ones&nbsp;</span><input type='button' value='Hide' id='hideConts'></th></tr></thead><tbody id=statsbody>";

	var LastTeamID = -1,teamArmies = 0, teamTerritories = 0, teamCalcedTerrs = 0, teamStrength =0, teamID = 0, pid, pctCalcCountries, pctArmies, pctCountries, curpid,nameStr,isEliminated, i,tmp = "", unk = "";

	for (i = 0; i < allPlayers.length; i++) {
		var player = allPlayers[i];
		var tid = teamNumber(i);
		if (tid!==0) {
			teamID = tid;
		}
		if (isTeamGame() && LastTeamID != -1 && LastTeamID != teamID && i!= UID) {
			pctArmies = Math.round(teamArmies*100/totalArmies);
			pctCountries = Math.round(teamTerritories*100/totalCountries);
			pctCalcCountries = Math.round(teamCalcedTerrs*100/totalCountries);

			curpid = 0;
			nameStr = "Team " + LastTeamID;
			isEliminated = false;
			if (LastTeamID !== 0 ) {
				toReturn += "<tr class='pColor" + curpid + (isEliminated?" eliminated":"") + "'><td>" + nameStr + "</td>" + (gameSettings.spoils? "<td></td>" :"") + "<td></td>";
				if (extended) {
					toReturn += "<td>" + teamArmies +" ( " + pctArmies +"% )</td>";
					toReturn += "<td>" + teamTerritories + (gameSettings.fog?" / "+teamCalcedTerrs:"") + " (" + (gameSettings.fog?pctCalcCountries:pctCountries) +"%)</td>";
					toReturn += "<td>" + roundNumber(teamStrength, 2) + "</td><td></td><td></td><td></td></tr>\n";
				} else {
					toReturn += "<td>" + teamArmies + "</td><td>" + teamTerritories + (gameSettings.fog?" / "+teamCalcedTerrs:"") + "</td><td></td><td></td></tr>\n";
				}
			}
			teamArmies = 0;
			teamTerritories = 0;
			teamStrength =0;
			teamCalcedTerrs = 0;
		}

		curpid = i;
		nameStr = '<span class="player">'+player.name+'</span>';

		var cardStr = gameSettings.spoils ? '<img width="18px" height="16px" title="' + player.cards + ' Bonus Cards" alt="' + player.cards + ' Bonus Cards" class="i3 icon" src="http://static.conquerclub.com/cards.gif"/>' + player.cards + ' ' : '';

		pctArmies = (totalArmies!==0)?Math.round(player.armies*100/totalArmies):0;
		pctCountries = Math.round(player.countries*100/totalCountries);
		pctCalcCountries = Math.round(player.calculatedCountries*100/totalCountries);
		var numArmiesNextTurn = ( player.pid )?calcArmiesNextTurn(player.countries):0;
		if (gameSettings.fog) {
			numArmiesNextTurn = ( player.pid )?calcArmiesNextTurn(player.calculatedCountries):0;
		}
		isEliminated = (player.skipped == -1) || (player.countries === 0 && player.calculatedCountries === 0);
		var pl_Strength = Math.round( ( player.armies + (((numArmiesNextTurn + player.continentBonus + player.territoryBonus)*(player.skipped+1))) + getArmiesFromCardSet(player.cards) - (2*player.countries/3) ) * 100 )/100;

		if (curpid!=UID) {
			teamArmies += player.armies;
			teamTerritories += player.countries;
			teamCalcedTerrs += player.calculatedCountries;
			teamStrength += pl_Strength;
		}

		var estimatedArmiesFromCards = Math.round(getEstimatedArmiesFromCards(player.cards, player.countries, totalCountries) * 100) / 100;
		if(curpid) { // if not neutral
			if (curpid!=UID) { // if not UNKNOWN
				toReturn += "<tr class='pColor" + curpid + (isEliminated?" eliminated":"") + "'><td>" + nameStr + "</td>" + (gameSettings.spoils? "<td>" + cardStr + "</td>" :"" );
				if (extended) {
					toReturn += "<td>" + player.skipped+"&nbsp;("+player.total_skipped+")</td><td>" + player.armies +" ( " + pctArmies +"% )" + "</td>";
					toReturn += "<td>" + player.countries + (gameSettings.fog?" / " + player.calculatedCountries:"") + " (" + (gameSettings.fog?pctCalcCountries:pctCountries) +"%)" + player.killToReduce() +"</td>";
					toReturn += "<td>" + pl_Strength + "</td><td class='popup' data-popup='("+ player.armiesLastTurn +" + " + player.lastContinentBonus + " + " + player.lastTerritoryBonus + ")'>" + (player.armiesLastTurn + player.lastContinentBonus) + "</td><td>" + "("+ numArmiesNextTurn +" + " + player.continentBonus + " + " + player.territoryBonus + ") = ";
				} else {
					toReturn += "<td>" + player.skipped + "</td><td>" + player.armies + "</td>";
					toReturn += "<td>" + player.countries + (gameSettings.fog? " / " + player.calculatedCountries+"":"") + "</td>";
					toReturn += "<td>" + (player.armiesLastTurn + player.lastContinentBonus) + "</td><td>";
				}
				toReturn += (numArmiesNextTurn + player.continentBonus + player.territoryBonus) + "</td>";
				if (player.skipped===0) {
					toReturn += "<td>" + player.deferred + "</td>";
				} else {
					toReturn += "<td>" + ((numArmiesNextTurn + player.continentBonus)*(player.skipped)) + "</td>";
				}
				if (extended) {
					toReturn += ((gameSettings.spoils && gameSettings.spoils != eBonusCards.NUCLEAR)? "<td>" + estimatedArmiesFromCards + "</td>" : "");
				}
				toReturn += "<td class='continents'>" + player.ContinentsDisplay() + "</td></tr>\n";
			} else {
				pid = 0;
				unk += "<tr class='pColor"+ pid +"'><td>"+ nameStr + "</td>" +
				( gameSettings.spoils?"<td></td>":"" ) + "<td></td><td>";
				if (extended) {
					unk += player.armies +" ( " + pctArmies +"% )</td><td>"+ player.countries + " ( " + pctCountries +"% )</td><td></td>" + (gameSettings.spoils ?"<td></td>":"");
				} else {
					unk += player.armies +" </td><td>"+ player.countries + "</td>";
				}
				unk += "<td></td><td></td><td></td></tr>\n";
			}
		} else { //neutral
			tmp = "<tr class='pColor"+ player.pid +"'><td>"+ nameStr + "</td>" +
			( gameSettings.spoils?"<td></td>":"" )+ "<td></td><td>" + player.armies;
			if (extended) {
				tmp += " ( " + pctArmies +"% )</td><td>"+ player.countries + " ( " + pctCountries +"% )</td>" +
				"<td>"+ pl_Strength +"</td>" +
				((gameSettings.spoils && gameSettings.spoils != eBonusCards.NUCLEAR) ?"<td></td>":"" );
			} else {
				tmp += "</td><td>"+ player.countries + "</td>";
			}
			tmp += "<td></td><td></td><td></td><td>"+showKillers()+"</td></tr>\n";
		}
		LastTeamID = teamID;
	}
	if (isTeamGame()) {
		pctArmies = (totalArmies!==0)?Math.round(teamArmies*100/totalArmies):0;
		pctCountries = Math.round(teamTerritories*100/totalCountries);
		pctCalcCountries = Math.round(teamCalcedTerrs*100/totalCountries);

		curpid = 0;
		nameStr = "Team " + teamID;
		isEliminated = false;

		toReturn += "<tr class='pColor" + curpid + (isEliminated?" eliminated":"") + "'><td>" + nameStr + "</td>" +
		(gameSettings.spoils? "<td></td>" :"" ) + "<td></td><td>" + teamArmies + (extended?" ( " + pctArmies +"% )":"") + "</td>";
		if (extended) {
			toReturn += "<td>" + teamTerritories + (gameSettings.fog?" / "+teamCalcedTerrs:"") + " (" + (gameSettings.fog?pctCalcCountries:pctCountries) +"%)</td>";
			toReturn += "<td>" + roundNumber(teamStrength, 2) + "</td><td>";
		} else {
			toReturn += "<td>" + teamTerritories + (gameSettings.fog?" / "+teamCalcedTerrs:"" );
		}
		toReturn+= "</td><td></td><td></td><td></td></tr>\n";
	}

	toReturn += unk + tmp; //neutral & Unknowns
	toReturn+="</tbody>";
	if (extended) {
		toReturn += "<tfoot><tr style='font-weight:bold;color:#000;'><td>Totals</td>" + ( gameSettings.spoils?"<td></td>":"" )+"<td></td><td>" + totalArmies + " ( 100% )</td><td>" + totalCountries + " ( 100% )</td><td> - </td>" + ( (gameSettings.spoils && gameSettings.spoils != eBonusCards.NUCLEAR) ?"<td> - </td>":"" )+"<td> - </td></tr></tfoot>\n";
	}
	toReturn+= "</table>";
	return toReturn;
}

function roundNumber(num, dec) {
	return Math.round( Math.round( num * Math.pow( 10, dec + 1 ) ) / Math.pow( 10, 1 ) ) / Math.pow(10,dec);
}

function analyseMap() {
	var tmpArmies = [], tmpCountries = [], i, pid, player;
	for (i = 0; i < allPlayers.length; i++) {
		tmpArmies.push(0);
		tmpCountries.push(0);
	}
	totalCountries = 0;
	totalArmies = 0;

	//Get individual scores
	for(i = 0; i < armies.length;i++ ) {
		if (armies[i].player == "?") {
			pid = UID;
			tmpCountries[pid]++;
		} else {
			pid = parseInt(armies[i].player, 10);
			tmpArmies[pid] += armies[i].quantity;
			tmpCountries[pid]++;
		}
	}

	for (i = 0; i < allPlayers.length; i++) {
		player = allPlayers[i];
		totalArmies += tmpArmies[i];
		player.armies = tmpArmies[i];
		totalCountries += tmpCountries[i];
		player.countries = tmpCountries[i];
		// init ownership and bonuses out for all players.
		player.continents = [];
		player.continentBonus = 0;
		player.territoryBonus = 0;
	}
}

function updateCountries() {
	var countryIndex, country, pid, player;
	for (countryIndex = 0; countryIndex < allCountries.length; countryIndex++) {
		country = allCountries[countryIndex];
		pid;
		if (armies[countryIndex].player=="?") {
			pid = UID;
		} else {
			pid = parseInt(armies[countryIndex].player, 10);
		}
		country.pid = pid;
		country.quantity = armies[countryIndex].quantity;
		if (country.bonus!==0 && pid>=0 && pid != UID) {
			player = allPlayers[pid];
			if (country.bonus<0) {
				if (country.quantity + country.bonus > 1) { // if decay leaves more than 1 then bonus stands.
					player.territoryBonus = player.territoryBonus + country.bonus;
				} else { // if decay goes beyond 1 then the bonus is negative the rest plus 1.
					player.territoryBonus = (player.territoryBonus - country.quantity) + 1;
				}
			} else { // if positive always happens.
				player.territoryBonus = player.territoryBonus + country.bonus;
			}
		}
	}
}

function updateObjectives() {
	var owner, objSummary = "", obj, objective, obSummary, i;
	for (obj = 0; obj < allObjectives.length; obj++) {
		objective = allObjectives[obj];
		objective.owner=-1;
		obSummary = "";
		objective.owners = [];

		var pids = [];
		for (i = 0; i < allPlayers.length; i++) { // set up empty array for holding player counts of countries.
			pids.push(0);
		}
		for (i = 0; i < objective.territories.length; i++ ) {
			var country = allCountries[objective.territories[i]];
			pids[country.pid]++;
			obSummary += displayCountry(country);
		}
		for (i = 0; i < objective.continents.length; i++ ) {
			var continent = allContinents[objective.continents[i]];
			for (owner in continent.owners) {
				pids[continent.owners[owner]]++;
			}
			obSummary += displayContinent(continent);
		}
		var leng = pids.length;
		if (gameSettings.fog) {
			leng--;
		}
		for (i=1;i<leng;i++) { // 1 to start to avoid Neutral player
			if (pids[i]>=(objective.required == 0?(objective.territories.length + objective.continents.length):objective.required)) {
				objective.owners.push(i);
			}
		}

		if (objective.owners.length>0) {
			for (owner in objective.owners) {
				objSummary += '<span title="' + objective.name + '" class="objective pColor' + objective.owners[owner] + '">'+objective.name+" ==> </span>";
				objSummary += obSummary + '<span class="pColor' + objective.owners[owner] + '">'+" - Held by "+allPlayers[objective.owners[owner]].name+"</span><br/>";
			}
		} else {
			objSummary += '<span title="' + objective.name + '" class="objective">'+objective.name+' ==> </span>';
			objSummary += obSummary;
		}
	}
	if (objSummary.length == 0) {
		return;
	}
	var objWrapperDiv = $('#objectives');
	if (!objWrapperDiv[0]) {
		objWrapperDiv = $('<div id="objectives"><h4>Objective Summary</h4></div>');
		var objDiv =$('<div id="objectivessummary"></div>');
		objWrapperDiv.append(objDiv);
		$('#right_hand_side').append(objWrapperDiv);
	}
	var objectiveDiv = objWrapperDiv.find('#objectivessummary');
	objectiveDiv.html(objSummary);
}

// a three phase function.
// First loop through all the continents to see if who they are owned by.
// Next loop through all the continents to see if any should be overriden.
// Once we've decided whether or not a continent is overriden - then we can assign it to the player.
function updateContinents() {
	// roll through all the continents and assign ownership to each continent.
	var i, index, continent, owner, pids;
	for (index = 0; index < allContinents.length; index++) {
		continent = allContinents[index];
		continent.owners = [];
		continent.overriden = [];

		pids = [];
		for (i = 0; i < allPlayers.length; i++) { // set up empty array for holding player counts of countries.
			pids.push(0);
		}
		for (i = 0; i < continent.territories.length; i++ ) {
			var country = allCountries[continent.territories[i]];
			country.inContinent = true;
			pids[country.pid]++;
		}
		for (i = 0; i < continent.subcontinents.length; i++ ) {
			var subcontinent = allContinents[continent.subcontinents[i]];
			for (var j = 0; j < subcontinent.owners.length; j++) {
				pids[subcontinent.owners[j]]++;
			}
		}
		var leng = pids.length;
		if (gameSettings.fog) {
			leng--;
		}
		for (i=1;i<leng;i++) { // 1 to start to avoid Neutral player
			if (pids[i]>=continent.required) {
				continent.owners.push(i);
				continent.overriden.push(false);
			}
		}
	}

	// now we have all the owners we need to loop back through and work out if any continents need to override.
	for (index = 0; index <allContinents.length; index++) {
		continent = allContinents[index];
		// if this continent is owned by anyone then we need to see if it's overriden.
		if (continent.owners.length > 0) {
			for (i = 0; i <allContinents.length; i++) {
				var continent2 = allContinents[i];
				// don't compare the same continents.
				if (continent!=continent2) {
					// loop through overrides for this continent.
					for (var over = 0; over < continent2.overrides.length;over++) {
						// found a match.
						if (continent2.overrides[over]==index) {
							for (owner = 0; owner < continent.owners.length; owner++) {
								for (var owner2 = 0; owner2 < continent2.owners.length; owner2++) {
									if (continent.owners[owner]==continent2.owners[owner2]) {
										continent.overriden[owner]=true;
									}
								}
							}
						}
					}
				}
			}
		}
		// now we've established ownership and overriden ness we then need to assign the bonuses and owner ship to the players.
		for (owner = 0; owner < continent.owners.length; owner++) {
			var player = allPlayers[continent.owners[owner]];
			if (!continent.overriden[owner]) {
				player.continents.push(index);
				player.continentBonus += continent.bonus;
			}
		}
	}
	var contOutput = "";
	for (i = 0; i < allContinents.length; i++) {
		var cnt = allContinents[i];
		contOutput += displayContinent(cnt, i);
		contOutput += " ";
	}
	var total=0;
	$("#right_hand_side").children().each(function () {
		total += $(this).outerHeight();
	});
	$("#contOverview").html(contOutput);
	showContOver();
	var h = $('#outer-map').height(), currentHeight = $("#contOverviewWrapper").height();
	$("#contOverviewWrapper").height(Math.min(Math.max((h-total),100), currentHeight));
}

function createTextMap(extended) {
	var toReturn = "";
	// init for Text Based Map
	if (!extended) {
		toReturn += "<table align=center style='width:100%;border:1px solid #FFF;background:#eee;' rules=rows >";
	}
	var txtMapSmallHtml2 = "", txtMapSmallOwner = "", bDone = false, country, subcontinent, targetName, index, name, continentName, i;

	for (continentName = 0; continentName < allContinents.length;continentName++) {
		txtMapSmallOwner = "";
		var continent = allContinents[continentName];
		bDone = true;
		if (extended) {
			toReturn += '<h4 ><span class="continent" title="' + continentName + ".) " + continent.name + '">' + continent.name + ' (' + continent.bonus + ')</span></h4>';
		}
		txtMapSmallHtml2 = "";

		for (index = 0; index < continent.territories.length; index++ ) {
			country = allCountries[continent.territories[index]];
			country.inContinent = true;
			if (extended) {
				toReturn += displayCountry(country) + ' ==> [';
				for (i =0; i < country.borders.length; i++) {
					targetName = allCountries[country.borders[i]];
					toReturn += displayCountry(targetName);
				}
				for (i = 0; i < country.attacks.length; i++) {
					targetName = allCountries[country.attacks[i]];
					toReturn += displayCountry(targetName);
				}
				toReturn += ']';
				if ((country.bombards.length + country.bombardments.length)>0) {
					toReturn += ' __> [';
					for (i =0; i < country.bombards.length; i++) {
						targetName = allCountries[country.bombards[i]];
						toReturn += displayCountry(targetName);
					}
					toReturn += ']';
				}
				toReturn += '<br>';
			} else {
				txtMapSmallHtml2 += displayCountry(country);
			}
		}
		for (i = 0; i < continent.subcontinents.length; i++ ) {
			subcontinent = allContinents[continent.subcontinents[i]];
			for (index = 0; index < subcontinent.owners.length; index++) {
				if (extended) {
					toReturn += '<span class="pColor' + subcontinent.owners[index] + '"><span class="continent" title="' + continent.subcontinents[i] + ".) " + subcontinent.name + '">' + subcontinent.name +' ('+subcontinent.bonus+')</span></span>';
				} else {
					var txtMapSmallContOwner = 'class="pColor' + subcontinent.owners[index] +'"';
					txtMapSmallHtml2 += '<span ' + txtMapSmallContOwner + '><span class="continent" title="' + continent.subcontinents[i] + ".) " + subcontinent.name + '">' + subcontinent.name + ' ('+subcontinent.bonus+')</span></span>&nbsp;';
				}
			}
			if (subcontinent.owners.length<1) {
				if (extended) {
					toReturn += '<span class="pColor0"><span class="continent" title="' + continent.subcontinents[i] + ".) " + subcontinent.name + '">' + subcontinent.name + ' ('+subcontinent.bonus+')</span></span>';
				} else {
					txtMapSmallHtml2 += '<span class="pColor0"><span class="continent" title="' + continent.subcontinents[i] + ".) " + subcontinent.name + '">' + subcontinent.name + ' ('+subcontinent.bonus+')</span></span>&nbsp;';
				}
			}
			if (extended) {
				toReturn += '<br>';
			}
		}
		for (index = 0; index < continent.owners.length; index++) {
			if (!continent.overriden[index]) {
				if (extended) {
					toReturn += '<br><span class="pColor' + index + '"> BONUS for ' + allPlayers[continent.owners[index]].name + ' : ' + continent.bonus + ' </span>';
				} else {
					txtMapSmallOwner = 'class="pColor' + continent.owners[index] +'"';
					toReturn += '<tr><td><span ' + txtMapSmallOwner + '><b><span class="continent" title="' + continentName + ".) " + continent.name + '">' + continent.name + ' (' + continent.bonus + ')</span></b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
				}
			}
		}
		if (continent.owners.length<1 && !extended) {
			toReturn += '<tr><td><span ' + txtMapSmallOwner + '><b><span class="continent" title="' + continentName + ".) " + continent.name + '">' + continent.name + ' (' + continent.bonus + ')</span></b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
		}
	}
	//Add Text Map
	cc_log("Adding Text Map");

	if (bDone) {
		var txtMapHtml2 = "";
		var hasCountriesWithoutContinent = false;
		txtMapHtml2 += '<h4>No Continent</h4>';
		txtMapSmallHtml2 = "";

		for (index = 0; index < allCountries.length; index++) {
			country = allCountries[index];
			if (!country.inContinent) {
				if (!extended) {
					txtMapSmallHtml2 += displayCountry(country);
				} else {
					txtMapHtml2 += displayCountry(country) + '==> [';
					for (i =0; i < country.borders.length; i++) {
						targetName = allCountries[country.borders[i]];
						txtMapHtml2 += displayCountry(targetName);
					}
					txtMapHtml2 += ']';
					if (country.bombards.length>1) {
						txtMapHtml2 += ' __> [';
						for (i =0; i < country.bombards.length; i++) {
							targetName = allCountries[country.bombards[i]];
							txtMapHtml2 += displayCountry(targetName);
						}
					}
					txtMapHtml2 += '<br>';
				}
				hasCountriesWithoutContinent = true;
			}
		}
		if (hasCountriesWithoutContinent) {
			if (extended) {
				toReturn += txtMapHtml2;
			} else {
				toReturn += '<tr><td><span><b>No Continent</b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
			}
		}
	} else {
		if (extended) {
			toReturn += '<h2>No Continents</h2>';
		}
		for (index = 0; index < allCountries.length; index++) {
			country = allCountries[index];
			if (!extended) {
				txtMapSmallHtml2 += displayCountry(country);
			} else {
				toReturn += displayCountry(country) + ' ==> [';

				for (i =0; i < country.borders.length; i++) {
					targetName = allCountries[cc.borders[i]];
					toReturn += displayCountry(targetName);
				}
				toReturn += ' ]<br>';
			}
		}
		if (!extended) {
			toReturn += '<tr><td><span><b>No Continent</b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
		}
	}
	if (!extended) {
		toReturn += "</table>";
	}
	return toReturn;
}

function updateMagicMap(showProgress) {
	if (showProgress) {
		customStartWaiting("Updating Magic Map");
	}
	var cou, toAdd, playerNumber;
	applyFades();
	var magicmap = $("#magicmap");
	if (myOptions.mapInspect == "Off") {
		if (magicmap.find("div").length != 0){ // if map inspect is turned off, remove some stuff.
			magicmap.find("div").remove();
			for (cou = 0; cou < allCountries.length; cou++) {
				allCountries[cou].light = null;
			}
			$('#players span[class*=player]').add($('#stats span[class*=player]')).unbind();
			$("#stats tr td:first-child").not('[class*=status]').unbind();
			$("#players li").not('[class*=status]').unbind();
			$('#cards, #teammates, #contOverview, #magicmap, #textMap, #statsTable').unbind();
		}
		return;
	}
	
	if (magicmap.find("div").length == 0){ //happens once if all goes well
		magicmap.append(createDivs());
		updateDivs();
		cc_log("Attaching the hover handlers over the map");
		magicmap.mouseover(magicmapOver);
		// Add Hovers to player names
		toAdd = $('#players span[class*=player]').add($('#stats span[class*=player]'));
		toAdd.hover(onMouseOverPlayername, onMouseOutHover);
		if (isTeamGame()) {
			// Add Hovers to Team.
			// once for the stats
			toAdd = $("#stats tr td:first-child").not('[class*=status]');
			playerNumber = 1;
			toAdd.each(function() {
				$(this).hover(handler(playerNumber, gameSettings.type), onMouseOutHover);
				playerNumber+=gameSettings.type;
			});
			// and once for the player list
			toAdd = $("#players li").not('[class*=status]');
			playerNumber = 1;
			toAdd.each(function() {
				$(this).hover(handler(playerNumber, gameSettings.type), onMouseOutHover);
				playerNumber+=gameSettings.type;
			});
			$("#players").mouseover(lightCards);
			$("#stats").mouseover(lightCards);
		}
		cc_log("Attaching the handlers");
		$('#cards, #teammates').mouseover(mouseOverCards);
		$('#contOverview').mouseover(mouseOverContinent);
		$('#objectivessummary').mouseover(mouseOverObjective);
		$('#cards, #teammates, #contOverview, #magicmap, #objectivessummary').mouseout(onMouseOutHover);
		$('#textMap, #statsTable').click(jumpClicked);
	} else {
		updateDivs();
	}
}

function handler(start, amount){
	return function() {
		for (var pid = 0; pid < amount; pid++) {
			onMouseOverPlayer(pid + start);
		}
	};
}
function mouseOverObjective(e) {
	onMouseOutHover();
	var target, title, i, j;
	title = e.target.title;
	target = $(e.target);
	if (target.is('span.continent')) {
		i = title.split(".) ")[0];
		lightUpContinent(allContinents[i]);
	} else if (target.is('span.country')) {
		for (i = 0; i < allCountries.length;i++) {
			if (allCountries[i].name == title) {
				lightUp(i);
			}
		}
	} else if (target.is('span.objective')) {
		title = e.target.title;
		for (i = 0; i < allObjectives.length;i++) {
			if (allObjectives[i].name == title) {
				var selected = allObjectives[i];
				for (j = 0; j < selected.continents.length; j++) {
					lightUpContinent(allContinents[selected.continents[j]]);
				}
				for (j = 0; j < selected.territories.length;j++) {
					lightUp(selected.territories[j]);
				}
			}
		}
	}
}

function mouseOverContinent(e) {
	onMouseOutHover();
	if ($(e.target).hasClass('continent')) {
		var i =  e.target.title.split(".) ")[0];
		lightUpContinent(allContinents[i]);
	}
}

function mouseOverCards(e) {
	if (e.target.nodeName === 'SPAN' && e.target.className.has('card')) {
		var countryName = $(e.target).text();
		if (countryName[1]==":") {
			countryName = countryName.slice(2);
		}
		for (var index = 0;index < allCountries.length;index++) {
			var country = allCountries[index];
			if (country.name == countryName) {
				lightUp(index);
				$("#hoverInfo").html(getInspectCountry(country));
			}
		}
	}
}

function magicmapOver(e) {
	var targetId = e.target.id;
	if (targetId.endsWith('m')) {
		var id = parseInt(targetId.slice(0,targetId.length-1));		
		var country = allCountries[id];
		lightUpNeighbours(country);
		$("#hoverInfo").html(getInspectCountry(country));
	} else {
		onMouseOutHover();
	}
}
function lightCards(e) {
	var target = $(e.target);
	if (target.is("img.icon")) {
		var countryName = target.attr('title');
		countryName = countryName.slice(countryName.indexOf(':') + 2);
		countryName = countryName.replace(" (Owned)", "");
		for (var index = 0;index < allCountries.length;index++) {
			var country = allCountries[index];
			if (country.name == countryName) {
				lightUp(index);
				$("#hoverInfo").html(getInspectCountry(country));
			}
		}
	}
}

function jumpClicked(e) {
	if (e.target.nodeName === 'SPAN') {
		if (e.target.className.has('continent')) {
			var i =  e.target.title.split(".) ")[0];
			var continent = allContinents[i];
			cntryClickHandler(function() {
				lightUpContinent(continent);
			});
		} else if (e.target.className.has('country')) {
			for (i = 0; i < allCountries.length; i++) {
				if (allCountries[i].name == e.target.title) {
					var index = i;
					cntryClickHandler(function() {
						lightUp(index);
					});
				}
			}

		} else if (e.target.className.has('player')) {
			for (i = 0; i < allPlayers.length; i++) {
				if (allPlayers[i].name == e.target.innerHTML) {
					index = i;
					cntryClickHandler(function() {
						onMouseOverPlayer(index);
					});
				}
			}
		}
	}
}

// various map inspect functions
function onMouseOverPlayername() {
	var pattern = /(\d+)$/;
	var result = pattern.exec(this.className);
	onMouseOverPlayer(result ? result[1] : 0);
}
function onMouseOverPlayer(pid) {
	for (var i = 0; i < allCountries.length; i++) {
		var country = allCountries[i];
		if (country.pid == pid)
			lightUp(i);
	}
}

function onMouseOutHover() {
	$("#magicmap div").attr('class', 'off');
	$("#hoverInfo").html("");
};

function cntryClickHandler(handler) {
	if (myOptions.mapInspect == "Off") { // only do stuff if map inspect is on!!
		return;
	}
	window.setTimeout(jtm,100);
	window.setTimeout(handler,500);
	window.setTimeout(onMouseOutHover,1000);
	window.setTimeout(handler,1500);
	window.setTimeout(onMouseOutHover,2000);
	window.setTimeout(handler,2500);
	window.setTimeout(onMouseOutHover,3000);
	window.setTimeout(handler,3500);
	window.setTimeout(onMouseOutHover,4000);
	window.setTimeout(handler,4500);
	window.setTimeout(onMouseOutHover,5000);
	window.setTimeout(handler,5500);
	window.setTimeout(onMouseOutHover,6000);
	window.setTimeout(handler,6500);
	window.setTimeout(onMouseOutHover,7000);
	window.setTimeout(handler,7500);
	window.setTimeout(onMouseOutHover,8000);
	window.setTimeout(handler,8500);
	window.setTimeout(onMouseOutHover,9000);
	window.setTimeout(handler,9500);
	window.setTimeout(onMouseOutHover,10000);
};

function checkElimSummary() {
	$('#termWrapper').toggle(TerminatorSummary!="");
}

function snapshotToObjects(snapshotArmies, length) {
	var toReturn = [];
	var items = snapshotArmies.split(',');
	for (var i = 0; i < items.length; i++) {
		var ter = items[i].split('-');
		var toAdd = {};
		if (ter[0] == "?") {
			toAdd.quantity = -1;
			toAdd.pid = UID;
		} else {
			if (length == 1) {
				toAdd.quantity = parseInt(ter[0],10);
				toAdd.pid = parseInt(ter[1],10);
			} else {
				toAdd.quantity = parseInt(ter[1],10);
				toAdd.pid = parseInt(ter[0],10);
			}
		}
		toReturn.push(toAdd);
	}
	return toReturn;
}
function currentToSnapshotarray() {
	var toReturn = "";
	for (var i = 0; i < allCountries.length; i++) {
		var country = allCountries[i];
		if (country.quantity == -1) {
			toReturn += "?-?,";
    } else {
			toReturn += country.quantity + "-" + country.pid + ",";
    }
	}
	return toReturn.slice(0,toReturn.length - 1);
}

function stringToObjects(text) {
	var arrMatch, i, pattern = new RegExp("[A-Z]+([a-z]+)|[\?]","g"), toReturn = [];
	while (arrMatch = pattern.exec(text)){
		var toAdd = {pid:0,quantity:0};
		var playerString = /^[\?A-Z]+/.exec(arrMatch[0])[0];
		if (playerString == "?") {
			 toAdd.pid = UID;
			 toAdd.quantity = -1;
		} else {
			for(i = 0; i < playerString.length;i++) {
				toAdd.quantity = toAdd.quantity * 26 + playerString.charCodeAt(i) - 'A'.charCodeAt(0);
			}
			for(i = 0; i < arrMatch[1].length;i++) {
				toAdd.pid = toAdd.pid * 26 + arrMatch[1].charCodeAt(i) - 'a'.charCodeAt(0);
			}
		}
		toReturn.push(toAdd);
	}
	return toReturn;
}
function snapToChat() {
	var text = "snap :: " + getRounds() + "~" + currentToString();
	if (text.length > 255) {
		alert("Too much information.. Sorry, can't take snapshot");
		return;
	}
	$('#message').val(text);
	$('#team').attr('checked', true);
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("submit", true, true);
	$('form').not('#action-form').get(0).dispatchEvent(evt);
}
function chatToSnap() {
	var chat = $("#chat");
	if (chat.html().has(": snap :: ")) {
		cc_log("checking for snaps..");
		chat.contents().each(testForSnaps);
	}
}
function testForSnaps() {
	var that = $(this);
	if (that.is("span") && that.children().size() > 0) {
		that.contents().each(testForSnaps);
	} else {
		var html = this.textContent;
		if (html.startsWith(": snap :: ")) {
			var base = html.slice(10).split("~");
			html = ': <a class="snapshot">snapshot round ' +  base[base.length - 2] + '<span class="hide">' + base[base.length - 1] + '</span></a>';
			that.replaceWith(html);
		}
	}
}

function currentToString() {
	var toReturn = "", i;
	for (i = 0; i < allCountries.length; i++) {
		var country = allCountries[i];
		if (country.quantity == -1) {
			toReturn += "?";
		} else {
			toReturn += switchToBase26(country.quantity, true);
			toReturn += switchToBase26(country.pid, false);
		}
	}
	return toReturn;
}
function switchToBase26(number, upperCase) {
	var result="";
	while (number > 0 || result.length == 0) {
		result = String.fromCharCode((upperCase?65:97) + number%26) + result;
		number = Math.floor(number/26);
	}
	return result;
}

function takeSnapshot() {
	// get date
	var arms = currentToSnapshotarray(), savename = gameSettings.gamenr+"~"+ new Date().getTime() +"~"+getRounds();
	cc_log('taking snapshot');
	GM_setValue(savename, arms);
	addSnapshot(savename, $('#menu_refresh').parent());
}
function getRounds() {
	if (!getLoadFullLog()) {
		return rounds;
	}
	return $('#round').html();
}

function onSnapShot(loadName,id) {
	var data = GM_getValue(loadName), option;
	if (currentSnapshot != -1) {
		option = $("#menu_snapshot_"+currentSnapshot.id);
		option.html(option.find("b").html());
	}
	option = $("#menu_snapshot_"+id);
	if (!option.find('b').exists()) {
		option.html('<b>' + option.html() + '</b>');
	}
	currentSnapshot = getSnapshotData(loadName);
	currentSnapshot.id = id;
	// splitting in case of old snapshot
	currentSnapshot.data = snapshotToObjects(data.split("~~~~~~~~~~")[0], data.split("~~~~~~~~~~").length);
	redrawArmies(currentSnapshot.data);
	var display = currentSnapshot.date.getHours()+":"+padDigits(currentSnapshot.date.getMinutes(), 2)+" - "+currentSnapshot.date.getDate()+"/"+(currentSnapshot.date.getMonth()+1)+"/"+currentSnapshot.date.getFullYear();
	$('#snapshotState').text("Round " + currentSnapshot.round + ", date/time: " + display );
	updateBOB(true);
}
function redrawArmies(countryArray) {
	var colorArray = "nrgbypcosadefhijklmqtuvwxyz",colourCode = isColourCodeOn(),i,country, quantity, base;
	for (i = 0; i < countryArray.length; i++) {
		country = countryArray[i];
		quantity = (country.quantity == -1?"?":country.quantity);
		if (colourCode) {
			if (country.pid == UID && UID != NID) {
				quantity = "?" + quantity;
			} else {
				quantity = colorArray[country.pid] + quantity;
			}
		}
		base = $("#country" + i).css("color", col0[country.pid == UID?0:country.pid]);
		if (base.text() != quantity) {
			base.add("#country" + i + "t").add("#country" + i + "b").add("#country" + i + "l").add("#country" + i + "r").text(quantity);
		}
	}
}
function isColourCodeOn() {
	return $('#player_prefix_1').is(":visible") || $('#stat_prefix_1').is(":visible");
}

function reloadToLive() {
	var option = $("#menu_snapshot_"+currentSnapshot.id);
	option.html(option.find("b").html());
	$('#snapshotState').text("Live");
	currentSnapshot = -1;
	redrawArmies(allCountries);
}

function analyse() {
	if (currentSnapshot==-1) {
		return;
	}
	// loop through arrays
	if (currentSnapshot.data.length==allCountries.length){
		var changedCountries = [], i, live, snap;
		for (i = 0; i < allCountries.length; i++) {
			live = allCountries[i];
			snap = currentSnapshot.data[i];
			if (snap.pid!=live.pid || snap.quantity!=live.quantity) {
				changedCountries.push(i);
			}
		}
		cntryClickHandler(function() {
			lightupCountries(changedCountries);
		});
	} else {
		alert("error army arrays are different lengths - This Snapshot is invalid");
	}
}

var makeOSS = function (n,i) {
	return function () {
		onSnapShot(n,i);
	};
};

function deleteGameSnaps() {
	if (confirm("Are you sure you wish to delete this games Snapshots?")) {
		delGameSnaps();
	}
}
function getSnapshots() {
	cc_log("getting snapshots")
	var allValues = GM_listValues();

	return $.grep(allValues, function(val) {
		return (/^\d{1,9}~/).test(val);
	});
	return toReturn;
}

function removeSnapshots(gamenrs, keep) {
	var newSnapshotsArray = [], snapshots = getSnapshots(), amountDeleted = 0, i, snapshot, game, loadname;
	for (i=0;i<snapshots.length;i++) {
		snapshot = snapshots[i].split("~");
		game = snapshot[0];
		loadname = snapshots[i];
		if ($.inArray(game, gamenrs) < 0 == keep) {
			GM_deleteValue(loadname);// Remove image and data for the snapshot.
			amountDeleted++;
		} else {
			newSnapshotsArray.push(loadname);
		}
	}
	if (amountDeleted > 0) {
		alert('Deleted ' + amountDeleted + ' snapshots. Amount left: ' + newSnapshotsArray.length);
	}
	GM_setValue("SNAPSHOTS", newSnapshotsArray.toString());
}

function delGameSnaps() {
	var newSnapshotsArray = [], snapshots = getSnapshots(), i, snapshot, game, loadname;
	for (i=0;i<snapshots.length;i++) {
		snapshot = snapshots[i].split("~");
		game = snapshot[0];
		loadname = snapshots[i];
		if (game==gameSettings.gamenr) {
			GM_deleteValue(loadname);// Remove image and data for the snapshot.
		} else {
			newSnapshotsArray.push(loadname);
		}
	}
	GM_setValue("SNAPSHOTS", newSnapshotsArray.toString());
	currentSnapshot=-1;
	removeSnapshotsFromMenu();
}

function removeFinishedGames() {
	var username = $("#leftColumn .vnav").find("p:first a b").html();
	$.get('http://www.conquerclub.com/api.php', {
		mode: "gamelist",
		un: username,
		gs: "A"
	}, removeFinishedGamesInXml , 'xml');
}

// gets the current user, and removes snapshots based on the active games of that user
function removeFinishedGamesInXml(xml) {
	var x = $(xml).find('page').text().split(' of '),
		gameNrTags = $(xml).find('game_number'),
		gameNrs = $.map(gameNrTags, function(tag) {
			return $(tag).text();
		});
	// if someone has more than 1 page (=200) of active games.. add those.)
	if (x[1] > 1 && x[0] == 1) {
		for (var i = 2; i <= x[1]; i++) {
			var username = $("#leftColumn .vnav").find("p:first a b").html();
			$.ajax({
				url: 'http://www.conquerclub.com/api.php',
				data: ({
					mode: "gamelist",
					un: username,
					gs: "A",
					page: i
				}),
				success: function (xml) {
					var gameNrTags = $(xml).find('game_number');
					var gamesToAdd = $.map(gameNrTags, function(tag) {
						return $(tag).text();
					});
					gameNrs = $.merge(gameNrs, gamesToAdd);
				},
				async: false,
				dataType: 'xml'
			});
		}
	}
	removeSnapshots(gameNrs,true);
}

function removeSnapshotsFromMenu() {
	for (var i=0;i<snapshotsMenuLength;i++) {
		removeMenuOption("menu_snapshot_"+i);
	}
	snapshotsMenuLength=0;
}

function deleteAllSnapshots() {
	var snapshots = getSnapshots();
	if (snapshots.length > 0) {
		if (confirm("Are you sure you wish to delete all your Snapshots?")) {
			for (var i=snapshots.length-1;i>=0;i--) {
				var loadname = snapshots[i];
				GM_deleteValue(loadname);// Remove image and data for the snapshot.
			}
			currentSnapshot=-1;
		}
	}
	removeSnapshotsFromMenu();
}

function loadSnapshots(refresh) {

	var snapshots = getSnapshots().sort(function(a,b) {
		a = a.split("~");
		b = b.split("~");
		if (a.length < 2 || b.length < 2) {
			return 0;
		}
		return a[1] - b[1];
	});
	for (var i=0;i<snapshots.length;i++) {
		addSnapshot(snapshots[i], refresh);
	}
}
function getSnapshotData(snapshotString) {
	var snapshot = snapshotString.split("~"),
		toReturn = {},
		date = new Date(), round;
	date.setTime(snapshot[1]);
	if (snapshot.length > 2) {
		round = snapshot[2];
	}
	return {
		date:date,
		gameNr: snapshot[0],
		round: round
	};
}
function addSnapshot(snapshotString, before) {
	var snapshot = getSnapshotData(snapshotString);
	if (snapshot.gameNr == gameSettings.gamenr) {// 1st element of snapshot -> game nr.
		var display = snapshot.date.getHours()+":"+padDigits(snapshot.date.getMinutes(), 2)+" - "+snapshot.date.getDate()+"/"+(snapshot.date.getMonth()+1)+"/"+snapshot.date.getFullYear();
		if (snapshot.round) { // round number is present, add to display
			display = snapshot.round + " - "+display;
		}
		if (currentSnapshot.id == snapshotsMenuLength) { // if selected
			display = '<b>' + display + '</b>';
		}
		$(before).after(createOption("menu_snapshot_" + snapshotsMenuLength, display, makeOSS(snapshotString, snapshotsMenuLength), "#77AA77"));
		snapshotsMenuLength++;
	}
}

function showDeleteSnapshots() {
	var snapshots = getSnapshots();
	for (var i=snapshots.length-1;i>=0;i--) {
		var snapshot = snapshots[i].split("~");
		var game = snapshot[0];
		if (game==gameSettings.gamenr) {
			if (confirm("Would you like to delete Snapshots from this game?")) {
				delGameSnaps();
			}
			break; // once we found one - drop out of the loop.
		}
	}
}
function showSnapshots() {
	var snapshots = $("#snapshots");
	if (myOptions.showSnapsOnTop) {
		if (!snapshots.exists()) {
			$('#dashboard tr:first').after("<tr><td id='snapshots' colspan=2></td></tr>");
			snapshots = $("#snapshots");
			snapshots.append("<div id='snapNormal'><button id='snapToChat'>take snapshot in chat</button>" +
					"<button id='normalSnap'>take snapshot</button>" +
					"<button id='revert'>Revert to live</button>" +
					"<button id='showDifferences'>Show differences</button>" +
					" <span id='snapshotState' style='margin-left:12px'>Live</span></div>");
			var hide = $('<span><a>hide</a></span>').css({
				"float":"right",
				"margin-left": "20px"
			}).click(function() {
				$('#snapshots').hide();
				return false;
			});
			snapshots.find("#snapNormal").append(hide);
			$('#snapToChat').click(snapToChat);
			$('#normalSnap').click(takeSnapshot);
			$('#revert').click(reloadToLive);
			$('#showDifferences').click(analyse);
			$('#chat').click(function(e) {
				target = $(e.target);
				if (target.hasClass('snapshot')) {
					var data = target.find(".hide").text();
					var toDraw = stringToObjects(data);
					if (toDraw.length != allCountries.length) {
						alert("wrong format for snapshot.");
						return;
					}
					currentSnapshot = {
						data:toDraw,
						id:-1
					};
					$('#snapshotState').text("From chat.");
					redrawArmies(toDraw);
				}
			});
		} else {
			snapshots.show();
		}
	} else {
		snapshots.hide();
	}
	chatToSnap();
}

var jtm = function jtm() {
	if( myOptions.jumptomap ) {
		window.location.hash = "#map-cell";
	}
};

//-------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//-------------------------------------------------------------------------
var rightside = $('#right_hand_side');
var dashboard = $('#dashboard');
var gameSettings = new GameSettings();

//---- Log Processing ----
var currentLog = "";
var rounds = 0;
var stored_rounds = 0;
var num_turnins = 0;
var stored_num_turnins = 0;
var stored_skipped = [];
var stored_total_skipped = [];
var stored_countries = [];
var stored_terminator_summary;
var stored_terminator_counter = [];
var stored_lastContinentBonus = [];
var stored_lastTerritoryBonus = [];
var stored_armiesLastTurn = [];

//---- Gameplay ----
var TerminatorSummary = "";
var num_players = 0;
var pIndxs;

//---- Player ----
var NID = 0; // Neutral ID
var UID = 0; // Unknown ID <-- set to 0 here to ensure a value always set

// -- Various
var map, mapName, armies, mapsize;

var totalArmies = 0;
var totalCountries = 0;
var totalStartCountries = 0;
var startCountriesInPosition = 0;
var totalPositionCountries = 0;

var snapshotsMenuLength = 0;
var currentSnapshot = -1;
var forceInit = false;

var showDeleteAll = false;

function createSiteWideMenu() {
	prepareMenuHider(true);
	var ul = setupMenu();
	addSiteMenuOptions(ul);
	addSiteWideMenuOptions(ul);
	ul.find('.submenu').click(clickSubMenuItem);
	updateMenuHiderHeight();
}
function performSiteWideAlterations() {
	updateMyGamesClocks();
	updateGameLinks();
	addConfirmDropGameClickHandlers();
	swapAvatars();
	smallAvatars();
	hideSigs();
	createGamesTogether();
	checkForUpdate();
}

function adjustClock() {
	var timeStr = $("#clock").html();
	if (!timeStr) {
		return;
	}
	var time = timeStr.split(':');
	var targetDate = new Date();
	var hoursLeft = parseInt(time[0],10);
	var minutesLeft = parseInt(time[1],10) + hoursLeft * 60;
	var secondsLeft = parseInt(time[2],10) + minutesLeft * 60;
	targetDate.setTime(targetDate.getTime() + (secondsLeft * 1000));
	countDown(targetDate);
}

// --- Add Styles ---
// Colour Defs
var col0 = ["#FFFFFF", // Neutral
"#FF0000", // Red
"#009A04", // Blue
"#0000FF", // Green
"#FFFF00", // Yellow
"#FF00FF", // Magenta/Pink
"#00FFFF", // Cyan (bright)
"#FF9922", // Gray
"#7F7F7F", // Orange
"#000000" // BR colour
];
//Log
var col1 = ["#000000", // Neutral has always been black in the logs
"#FF0000", "#009A04", "#0000FF", "#CCCC00", "#FF00FF", "#00CCCC", // Cyan (Muted)
"#FF9922", "#7F7F7F", "#BBBBBB" // BR colour
];

function getMap() {
	var json = /map = (.+);/.exec($("#middleColumn script:first").html())[1];
	return JSON.parse(json);
}
function getArmies() {
	var json = $('#armies').html();
	if (json.length == 0) {
		json = /armies = (.+);/.exec($("#middleColumn script:first").html())[1];
	}
	return JSON.parse(json);
}
function getMapSize() {
	return Math.round($("#outer-map").width()) == map.widthL ? "L": "S";
}
function isGamePage() {
	return /game.php\?game=[0-9]*/.test(window.location.href);
}

// this function is run ONCE on initial INIT of the script.
function gm_ConquerClubGame() {
	cc_log("Starting");
		var styles = ' .vnav ul li a {color:#000000; background-color: #CCDDCC}' +
			' .vnav ul ul li a {background-color:#77AA77}';
	// ---- Check for Required Components ----
	//If we cannot find any of the following then we're not in a game.
	if(!isGamePage()) {
		if ($('#middleColumn').exists()) { // check center exists - this may be a page within a page.
			if ($('#leftColumn ul').exists()) { // check ul exists - user may not be logged in.
				createSiteWideMenu();
				performSiteWideAlterations();
				GM_addStyle(styles);
			}
		}
		stopWaiting();
		return;
	}
	// GAME BOB
	if (myOptions.autobob=="Off" && !forceInit) {
		addStartBOB();
		return;
	}
	customStartWaiting("Initializing BOB");
	//-------------------------------------------------------------------------
	// INIT
	//-------------------------------------------------------------------------

	cc_log("Building the Settings Menu");
	// ID THE MAP
	map = getMap();
	mapName = map.title;
	mapSize = getMapSize();
		
	createGameMenu();
	prepareMenuHider(true);
	adjustClock();

	// ---- Create Divisions ----
	var statsWrapper = $("<div id='statsWrapper'><span style='float:right;margin-right:20px'>[<a id='hideEliminated'>Hide eliminated players</a>][<a id='showMoreStatsLink'>scrollable statistics</a>]</span><H3>Statistics</H3></div>");
	statsWrapper.hide();

	statsWrapper.append($('<div id="statsTable"></div>').css("margin",'10px 0 0 0'));
	$('#log').prev().before(statsWrapper);

	// Create text map
	var textMapWrapper = $('<div id="textMapWrapper"><span style="float:right;margin-right:20px">[<a id="showMoreLink">scrollable text map</a>]</span><H3>Text Map</H3></div').hide();

	var textMap = $('<div id="textMap"></div>').css("backgroundColor","#EEEEEE").css('margin','10px 0 0 0');

	textMapWrapper.append(textMap);
	$('#log').prev().before(textMapWrapper);
	$('#showMoreLink').click(showMoreTextMap);

	dashboard.after($('<div id="mapinspect"></div>').css("backgroundColor","#EEEEEE").css("clear","right"));

	if (gameSettings.spoils == eBonusCards.FLATRATE) {
		var redemption = $('<div id="redemption"></div>')
		.css("backgroundColor","#EEEEEE")
		.html("<table><tr><td colspan=2><font color=red><b>Red:</b></font> 4&nbsp;<font color=green><b>Green:</b></font> 6&nbsp;<font color=blue><b>Blue:</b></font> 8&nbsp;<b>Mixed:</b> 10</td></tr></table>");
		dashboard.after(redemption);
	}
	showSnapshots();

	var termWrapper = $('<div id="termWrapper"></div>').css("margin",'10px 0 0 0');
	if (gameSettings.type == eGameType.TERMINATOR) {
		termWrapper.html("<h3>Terminator Points Summary</h3>");
	} else {
		termWrapper.html("<h3>Elimination Summary</h3>");
	}
	$('#full-log').after(termWrapper);

	var contOverviewWrapper = $('<div id="contOverviewWrapper"><H4>Continents Overview</H4></div>').css({
		display:"none",
		overflowY:"auto",
		overflowX:"hidden"
	});

	contOverviewWrapper.append('<div id="contOverview"></div>');
	rightside.append(contOverviewWrapper);

	if (myOptions.floatActions == "On") {
		var actionForm = $('#action-form');
		if (actionForm.exists()) {
			actionForm.css({
				position:'fixed',
				bottom:0,
				zIndex:4
			});
			var wrapperDiv = $('<div id="actionWrapper"></div>');
			if ($('#from_country').exists()) {
				wrapperDiv.css('paddingTop',"22px");
			} else {
				wrapperDiv.css('paddingTop',"0px");
			}
			wrapperDiv.append($('#mapinspect'));
			wrapperDiv.append($('#cards').parent().parent().css('backgroundColor',"#EEEEEE"));
			actionForm.find('fieldset').append(wrapperDiv);
			setFormWidth();
		}
		$('#rolls').css({
			position:'fixed',
			backgroundColor:"#EEEEEE",
			top:0,
			zIndex:4
		});
	}

	styles += ' #outer-map {position:relative;} ' +
	' #inner-map img {position:absolute;} ' +
	' .attackhovers {vertical-align:middle;padding-top:1px;padding-bottom:1px;} ' +
	' #summary {height:150px;overflow:auto;background-color:#eee;margin:10px 0 0 0;} ' +
	' #magicmap div {height:18px;position:absolute;z-index:3;} ' +
	' #inner-map .army_circle {z-index:10} ' +
	' #inner-map div.army_circle_shadow {z-index:2}' +
	' div.h {opacity:1.0;padding-left:4px;padding-right:4px;border-top:thick solid ;border-bottom:thick solid;} ' +
	' div.i {opacity:0.7;border:thick solid;} ' +
	' div.j {opacity:1.0;border:thick solid;} ' +
	' div.off {opacity:0.0;border:medium dotted #FFFFFF;} ' +
	' div.typeborder {opacity:1.0;padding-left:4px;padding-right:4px;border-top:thick solid;border-bottom:thick solid;} ' +
	' div.typeattack {opacity:1.0;padding-right:4px;border-left:thick solid;border-top:thick solid;border-bottom:thick solid;} ' +
	' div.typedefend {opacity:1.0;padding-left:4px;border-right:thick solid;border-top:thick solid;border-bottom:thick solid;} ' +
	' div.typebombards {opacity:1.0;padding-bottom:4px;border-left:thick solid;border-top:thick solid;border-right:thick solid;} ' +
	' div.typebombarded {opacity:1.0;padding-top:4px;border-left:thick solid;border-right:thick solid;border-bottom:thick solid;} ' +
	' div.typemutualbombard {opacity:1.0;padding-top:4px;padding-bottom:4px;border-left:thick solid;border-right:thick solid;} ' +
	' #statsbody td {white-space: nowrap;}' +
	' #statsbody td.continents {white-space: normal}' +
	' tr.eliminated td {text-decoration: line-through}' +
	' #statsbody tr {border-bottom: 1px solid #445544}' +
	' #statsbody tr:nth-child(2n) {background-color:#DDDDDD}'
	' table.listing th {vertical-align:middle; font-weight:normal}' +
	' .hide {display:none}';


	for (var i = 0; i < 9; i++) {
		styles += ' #magicmap .player'+i+' {border-color:' + col0[i] + ';} ' +
		' .pColor'+i+' {color:' + col1[i] + (i===0?'':'; font-weight: bold') +'} ' +
		' .itemBg'+i+' {background-color:' + (i===0?col0[i]:col1[i]) + ';} ';
	}

	// ---- Get Player Names ----
	cc_log("Player IDs");
	allPlayers.push(new Player(NID, "Neutral"));

	pIndxs = $('#players span[class*=player]');
	for(i = 0; i < pIndxs.length; i++) {
		var name = pIndxs.eq(i).contents().eq(1).text();
		if (name) {
			allPlayers.push(new Player(++num_players, name));
		}
		if (i>7) { // create styles for this player. (BR Coding!)
			var num = i+1;
			styles += ' #magicmap .player'+num+' { border-color:' + col0[9] + ';} ' +
			' .pColor'+num+' { color: ' + col0[9] + ';font-weight: bold} ' +
			' .itemBg'+num+' { background-color: ' + col1[9] + '; } ';
		}
	}
	GM_addStyle(styles);
	updatePlayerCards();
	updateSideStats();
	moveChatToTop();
	$('#inner-map').after('<div id="magicmap">').css('zIndex', '2').css('position','absolute');
	showMapInspectDiv();

	if (gameSettings.fog) { // create extra player for Unknown territories.
		UID = allPlayers.length;
		allPlayers.push(new Player(allPlayers.length, 'Unknown'));
	}
	expandMap();

	/* Ishiro's Confirm Commands code */
	var newsendRequest = unsafeWindow.sendRequest;
	unsafeWindow.sendRequest = function(command) {
		/* --- Confirmation Popups --- */
		if (((command == 'End Assaults' || command == 'End Reinforcement' || (command == 'Reinforce' && gameSettings.fortifications != eFortifications.UNLIMITED)) && myOptions.confirmEnds) || (command == 'Auto-Assault' && myOptions.confirmAutoAttack) || (command == 'Deploy' && myOptions.confirmDeploy)) {
			var message = command;
			if (message == "Reinforce") {
				message = "End Reinforcement";
			}
			if (confirm("Are you sure you wish to "+message+"?")) {
				return newsendRequest(command);
			} else {
				return false;
			}
		} else {
			return newsendRequest(command);
		}
	};
	$('body').bind('CCGameRefresh', updateBOB);

	if (num_players>8) { // make the right hand side scrollable for BR's
		rightside.height($('#outer-map').height());
		rightside.css({
			overflow:"auto"
		});
	}

	//Auto Scroll to Game
	if( myOptions.jumptomap ) {
		window.setTimeout(jtm,1000);
	}

	processLog(0, true, true);
	// ---- Map Analysis ----
	cc_log("Map Analysis");
	armies = getArmies();
	analyseMap();
	checkElimSummary();
	updateCountries();
	updateContinents();
	updateObjectives();
	updateTextMap();
	updateStats();
	updateMagicMap(false);
	colourCodeDD();
	updateMenuHiderHeight();
	if (myOptions.floatActions == "On") {
		setFormWidth();
	}
	if (showDeleteAll) {
		showDeleteSnapshots();
	}
	stopWaiting();
	cc_log("Done after request");
	updateMenuHiderHeight();
	checkForUpdate();
}

function expandMap() {
	var i,j,country, attackedCountry, continent;
	allCountries = map.countries;
	allContinents = map.continents;
	allObjectives = map.objectives;
	if (!allObjectives) { // in case this ever becomes acceptable.
		allObjectives = [];
	}
	// adjust minimum reinforcements - default is 3.
	if (!map.min_reinforcement) {
		map.min_reinforcement = 3;
	}
	for (i = 0; i < allCountries.length; i++) {
		country = allCountries[i];
		country.attackedBy = [];
		country.bombardedBy = [];
	}
	for (i = 0; i < allCountries.length; i++) {
		country = allCountries[i];
		for (j = 0; j < country.borders.length; j++) {
			attackedCountry = allCountries[country.borders[j]];
			attackedCountry.attackedBy.push(i);
		}
		for (j = 0; j < country.bombardments.length; j++) {
			attackedCountry = allCountries[country.bombardments[j]];
			attackedCountry.bombardedBy.push(i);
		}
	}
	for (i = 0; i < allCountries.length; i++) {
		country = allCountries[i];
		country.attacks = Array.removeAll(country.borders, country.attackedBy);
		country.borders = Array.intersect(country.borders, country.attackedBy);
		country.attackedBy = Array.removeAll(country.attackedBy, country.borders);
		country.bombards = Array.removeAll(country.bombardments, country.bombardedBy);
		country.bombardments = Array.intersect(country.bombardments, country.bombardedBy);
		country.bombardedBy = Array.removeAll(country.bombardedBy, country.bombardments);
	}
	for (i = 0; i < allContinents.length; i++) {
		continent = allContinents[i];
		if (continent.required == 0) {
			continent.required = continent.territories.length + continent.subcontinents.length;
		}
	}
}
function updateBOB(fromSnapshot) {
	if (myOptions.autobob=="Off" && !forceInit) {
		addStartBOB();
		return;
	}
	if (fromSnapshot !== true && currentSnapshot != -1) {
		var option = $("#menu_snapshot_"+currentSnapshot.id);
		option.html(option.find("b").html());
		currentSnapshot = -1;
		$('#snapshotState').text("Live");
	}
	chatToSnap();
	armies = getArmies();
	updatePlayerCards();
	mapSize = getMapSize();
	processLog(logFixed, false, false);
	if (myOptions.floatActions == "On") { // only change the form width if HUD is on.
		setFormWidth();
	}
	checkFloatDice();
	checkElimSummary();
	
	analyseMap(); // reread the armies array back into the players array
	updateCountries();
	updateContinents();
	updateObjectives();

	updateTextMap();
	updateStats();
	updateMagicMap(false);

	colourCodeDD();
	updateMenuHiderHeight();
	stopWaiting();
}

// Run init on first load.
gm_ConquerClubGame();
