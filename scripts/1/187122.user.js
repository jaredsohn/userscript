// ==UserScript==
// @name		akn friend connect
// @namespace            husam alshjrh
// @description              7 akn 
// @version			1.0
// @editor			husam alshjrh

// ==/UserScript==

window.google = window["google"] || {};google.friendconnect = google.friendconnect_ || {};if (!window['__ps_loaded__']) {/*http://www-a-fc-opensocial.googleusercontent.com/gadgets/js/rpc:core.util.js?c=1*/
window['___jsl'] = window['___jsl'] || {};(window['___jsl']['ci'] = (window['___jsl']['ci'] || [])).push({"rpc":{"commSwf":"//xpc.googleusercontent.com/gadgets/xpc.swf","passReferrer":"p2c:query","parentRelayUrl":"/rpc_relay.html"}});window['___jsl']=window['___jsl']||{};(window['___jsl']['ci'] = (window['___jsl']['ci'] || [])).push({"rpc":{"commSwf":"//xpc.googleusercontent.com/gadgets/xpc.swf","passReferrer":"p2c:query","parentRelayUrl":"/rpc_relay.html"}});
/* [start] feature=taming */
var safeJSON=window.safeJSON;
var tamings___=window.tamings___||[];
var bridge___;
var caja___=window.caja___;
var ___=window.___;;

/* [end] feature=taming */

/* [start] feature=gapi-globals */
var gapi=window.gapi||{};gapi.client=window.gapi&&window.gapi.client||{};
;
;

/* [end] feature=gapi-globals */

/* [start] feature=globals */
var gadgets=window.gadgets||{},shindig=window.shindig||{},osapi=window.osapi=window.osapi||{},google=window.google||{};
;
;

/* [end] feature=globals */

/* [start] feature=core.config.base */
window['___cfg'] = window['___cfg'] || window['___gcfg'];;
if(!window.gadgets["config"]){gadgets.config=function(){var f;
var h={};
var b={};
function c(j,l){for(var k in l){if(!l.hasOwnProperty(k)){continue
}if(typeof j[k]==="object"&&typeof l[k]==="object"){c(j[k],l[k])
}else{j[k]=l[k]
}}}function i(){var j=document.scripts||document.getElementsByTagName("script");
if(!j||j.length==0){return null
}var m;
if(f.u){for(var k=0;
!m&&k<j.length;
++k){var l=j[k];
if(l.src&&l.src.indexOf(f.u)==0){m=l
}}}if(!m){m=j[j.length-1]
}if(!m.src){return null
}return m
}function a(j){var k="";
if(j.nodeType==3||j.nodeType==4){k=j.nodeValue
}else{if(j.innerText){k=j.innerText
}else{if(j.innerHTML){k=j.innerHTML
}else{if(j.firstChild){var l=[];
for(var m=j.firstChild;
m;
m=m.nextSibling){l.push(a(m))
}k=l.join("")
}}}}return k
}function e(k){if(!k){return{}
}var j;
while(k.charCodeAt(k.length-1)==0){k=k.substring(0,k.length-1)
}try{j=(new Function("return ("+k+"\n)"))()
}catch(l){}if(typeof j==="object"){return j
}try{j=(new Function("return ({"+k+"\n})"))()
}catch(l){}return typeof j==="object"?j:{}
}function g(n){var p=window.___cfg;
if(p){c(n,p)
}var o=i();
if(!o){return
}var k=a(o);
var j=e(k);
if(f.f&&f.f.length==1){var m=f.f[0];
if(!j[m]){var l={};
l[f.f[0]]=j;
j=l
}}c(n,j)
}function d(o){for(var l in h){if(h.hasOwnProperty(l)){var n=h[l];
for(var m=0,k=n.length;
m<k;
++m){o(l,n[m])
}}}}return{register:function(l,k,j,m){var n=h[l];
if(!n){n=[];
h[l]=n
}n.push({validators:k||{},callback:j,callOnUpdate:m})
},get:function(j){if(j){return b[j]||{}
}return b
},init:function(k,j){f=window.___jsl||{};
c(b,k);
g(b);
var l=window.___config||{};
c(b,l);
d(function(q,p){var o=b[q];
if(o&&!j){var m=p.validators;
for(var n in m){if(m.hasOwnProperty(n)){if(!m[n](o[n])){throw new Error('Invalid config value "'+o[n]+'" for parameter "'+n+'" in component "'+q+'"')
}}}}if(p.callback){p.callback(b)
}})
},update:function(k,p){var o=(window.gapi&&window.gapi["config"]&&window.gapi["config"]["update"]);
if(!p&&o){o(k)
}var n=[];
d(function(q,j){if(k.hasOwnProperty(q)||(p&&b&&b[q])){if(j.callback&&j.callOnUpdate){n.push(j.callback)
}}});
b=p?{}:b||{};
c(b,k);
for(var m=0,l=n.length;
m<l;
++m){n[m](b)
}}}
}()
}else{gadgets.config=window.gadgets["config"];
gadgets.config.register=gadgets.config.register;
gadgets.config.get=gadgets.config.get;
gadgets.config.init=gadgets.config.init;
gadgets.config.update=gadgets.config.update
};;

/* [end] feature=core.config.base */

/* [start] feature=core.log */
gadgets.log=(function(){var e=1;
var a=2;
var f=3;
var c=4;
var d=function(i){b(e,i)
};
gadgets.warn=function(i){b(a,i)
};
gadgets.error=function(i){b(f,i)
};
gadgets.debug=function(i){};
gadgets.setLogLevel=function(i){h=i
};
function b(k,i){if(k<h||!g){return
}if(k===a&&g.warn){g.warn(i)
}else{if(k===f&&g.error){try{g.error(i)
}catch(j){}}else{if(g.log){g.log(i)
}}}}d.INFO=e;
d.WARNING=a;
d.NONE=c;
var h=e;
var g=window.console?window.console:window.opera?window.opera.postError:undefined;
return d
})();;
;

/* [end] feature=core.log */

/* [start] feature=gapi.util-globals */
gapi.util=window.gapi&&window.gapi.util||{};
;

/* [end] feature=gapi.util-globals */

/* [start] feature=core.config */
(function(){gadgets.config.EnumValidator=function(d){var c=[];
if(arguments.length>1){for(var b=0,a;
(a=arguments[b]);
++b){c.push(a)
}}else{c=d
}return function(f){for(var e=0,g;
(g=c[e]);
++e){if(f===c[e]){return true
}}return false
}
};
gadgets.config.RegExValidator=function(a){return function(b){return a.test(b)
}
};
gadgets.config.ExistsValidator=function(a){return typeof a!=="undefined"
};
gadgets.config.NonEmptyStringValidator=function(a){return typeof a==="string"&&a.length>0
};
gadgets.config.BooleanValidator=function(a){return typeof a==="boolean"
};
gadgets.config.LikeValidator=function(a){return function(c){for(var d in a){if(a.hasOwnProperty(d)){var b=a[d];
if(!b(c[d])){return false
}}}return true
}
}
})();;

/* [end] feature=core.config */

/* [start] feature=core.util.base */
gadgets.util=gadgets.util||{};
(function(){gadgets.util.makeClosure=function(d,f,e){var c=[];
for(var b=2,a=arguments.length;
b<a;
++b){c.push(arguments[b])
}return function(){var g=c.slice();
for(var k=0,h=arguments.length;
k<h;
++k){g.push(arguments[k])
}return f.apply(d,g)
}
};
gadgets.util.makeEnum=function(b){var c,a,d={};
for(c=0;
(a=b[c]);
++c){d[a]=a
}return d
}
})();;

/* [end] feature=core.util.base */

/* [start] feature=core.util.dom */
gadgets.util=gadgets.util||{};
(function(){var c="http://www.w3.org/1999/xhtml";
function b(f,e){var h=e||{};
for(var g in h){if(h.hasOwnProperty(g)){f[g]=h[g]
}}}function d(g,f){var e=["<",g];
var i=f||{};
for(var h in i){if(i.hasOwnProperty(h)){e.push(" ");
e.push(h);
e.push('="');
e.push(gadgets.util.escapeString(i[h]));
e.push('"')
}}e.push("></");
e.push(g);
e.push(">");
return e.join("")
}function a(f){var g="";
if(f.nodeType==3||f.nodeType==4){g=f.nodeValue
}else{if(f.innerText){g=f.innerText
}else{if(f.innerHTML){g=f.innerHTML
}else{if(f.firstChild){var e=[];
for(var h=f.firstChild;
h;
h=h.nextSibling){e.push(a(h))
}g=e.join("")
}}}}return g
}gadgets.util.createElement=function(f){var e;
if((!document.body)||document.body.namespaceURI){try{e=document.createElementNS(c,f)
}catch(g){}}return e||document.createElement(f)
};
gadgets.util.createIframeElement=function(g){var i=gadgets.util.createElement("iframe");
try{var e=d("iframe",g);
var f=gadgets.util.createElement(e);
if(f&&((!i)||((f.tagName==i.tagName)&&(f.namespaceURI==i.namespaceURI)))){i=f
}}catch(h){}b(i,g);
return i
};
gadgets.util.getBodyElement=function(){if(document.body){return document.body
}try{var f=document.getElementsByTagNameNS(c,"body");
if(f&&(f.length==1)){return f[0]
}}catch(e){}return document.documentElement||document
};
gadgets.util.getInnerText=function(e){return a(e)
}
})();;

/* [end] feature=core.util.dom */

/* [start] feature=core.util.event */
gadgets.util=gadgets.util||{};
(function(){gadgets.util.attachBrowserEvent=function(c,b,d,a){if(typeof c.addEventListener!="undefined"){c.addEventListener(b,d,a)
}else{if(typeof c.attachEvent!="undefined"){c.attachEvent("on"+b,d)
}else{gadgets.warn("cannot attachBrowserEvent: "+b)
}}};
gadgets.util.removeBrowserEvent=function(c,b,d,a){if(c.removeEventListener){c.removeEventListener(b,d,a)
}else{if(c.detachEvent){c.detachEvent("on"+b,d)
}else{gadgets.warn("cannot removeBrowserEvent: "+b)
}}}
})();;

/* [end] feature=core.util.event */

/* [start] feature=core.util.onload */
gadgets.util=gadgets.util||{};
(function(){var a=[];
gadgets.util.registerOnLoadHandler=function(b){a.push(b)
};
gadgets.util.runOnLoadHandlers=function(){for(var c=0,b=a.length;
c<b;
++c){a[c]()
}}
})();;

/* [end] feature=core.util.onload */

/* [start] feature=core.util.string */
gadgets.util=gadgets.util||{};
(function(){var a={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true,65282:true,65287:true,65308:true,65310:true,65340:true};
function b(c,d){return String.fromCharCode(d)
}gadgets.util.escape=function(c,g){if(!c){return c
}else{if(typeof c==="string"){return gadgets.util.escapeString(c)
}else{if(typeof c==="Array"){for(var f=0,d=c.length;
f<d;
++f){c[f]=gadgets.util.escape(c[f])
}}else{if(typeof c==="object"&&g){var e={};
for(var h in c){if(c.hasOwnProperty(h)){e[gadgets.util.escapeString(h)]=gadgets.util.escape(c[h],true)
}}return e
}}}}return c
};
gadgets.util.escapeString=function(g){if(!g){return g
}var d=[],f,h;
for(var e=0,c=g.length;
e<c;
++e){f=g.charCodeAt(e);
h=a[f];
if(h===true){d.push("&#",f,";")
}else{if(h!==false){d.push(g.charAt(e))
}}}return d.join("")
};
gadgets.util.unescapeString=function(c){if(!c){return c
}return c.replace(/&#([0-9]+);/g,b)
}
})();;

/* [end] feature=core.util.string */

/* [start] feature=core.util.urlparams */
gadgets.util=gadgets.util||{};
(function(){var a=null;
function b(e){var f;
var c=e.indexOf("?");
var d=e.indexOf("#");
if(d===-1){f=e.substr(c+1)
}else{f=[e.substr(c+1,d-c-1),"&",e.substr(d+1)].join("")
}return f.split("&")
}gadgets.util.getUrlParameters=function(p){var d=typeof p==="undefined";
if(a!==null&&d){return a
}var l={};
var f=b(p||window.location.href);
var n=window.decodeURIComponent?decodeURIComponent:unescape;
for(var h=0,g=f.length;
h<g;
++h){var m=f[h].indexOf("=");
if(m===-1){continue
}var c=f[h].substring(0,m);
var o=f[h].substring(m+1);
o=o.replace(/\+/g," ");
try{l[c]=n(o)
}catch(k){}}if(d){a=l
}return l
};
gadgets.util.getUrlParameters()
})();;

/* [end] feature=core.util.urlparams */

/* [start] feature=gapi.util.getOrigin */
gapi.util.getOrigin=function(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a)throw Error("Invalid URI scheme in origin");var c="",d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1),b=b.substring(0,d);if("http"===
a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c};
;

/* [end] feature=gapi.util.getOrigin */

/* [start] feature=core.json */
if(window.JSON&&window.JSON.parse&&window.JSON.stringify){gadgets.json=(function(){var a=/___$/;
function b(d,e){var c=this[d];
return c
}return{parse:function(d){try{return window.JSON.parse(d)
}catch(c){return false
}},stringify:function(d){var h=window.JSON.stringify;
function f(e){return h.call(this,e,b)
}var g=(Array.prototype.toJSON&&h([{x:1}])==='"[{\\"x\\": 1}]"')?f:h;
try{return g(d,function(i,e){return !a.test(i)?e:void 0
})
}catch(c){return null
}}}
})()
};;
;
if(!(window.JSON&&window.JSON.parse&&window.JSON.stringify)){gadgets.json=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",f(this.getUTCMonth()+1),"-",f(this.getUTCDate()),"T",f(this.getUTCHours()),":",f(this.getUTCMinutes()),":",f(this.getUTCSeconds()),"Z"].join("")
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value){var a,i,k,l,r=/[\"\\\x00-\x1f\x7f-\x9f]/g,v;
switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c
}c=a.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}a=[];
if(typeof value.length==="number"&&!value.propertyIsEnumerable("length")){l=value.length;
for(i=0;
i<l;
i+=1){a.push(stringify(value[i])||"null")
}return"["+a.join(",")+"]"
}for(k in value){if(/___$/.test(k)){continue
}if(value.hasOwnProperty(k)){if(typeof k==="string"){v=stringify(value[k]);
if(v){a.push(stringify(k)+":"+v)
}}}}return"{"+a.join(",")+"}"
}return""
}return{stringify:stringify,parse:function(text){if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return eval("("+text+")")
}return false
}}
}()
};;
gadgets.json.flatten=function(c){var d={};
if(c===null||c===undefined){return d
}for(var a in c){if(c.hasOwnProperty(a)){var b=c[a];
if(null===b||undefined===b){continue
}d[a]=(typeof b==="string")?b:gadgets.json.stringify(b)
}}return d
};;

/* [end] feature=core.json */

/* [start] feature=core.util */
gadgets.util=gadgets.util||{};
(function(){var b={};
var a={};
function c(d){b=d["core.util"]||{}
}if(gadgets.config){gadgets.config.register("core.util",null,c)
}gadgets.util.getFeatureParameters=function(d){return typeof b[d]==="undefined"?null:b[d]
};
gadgets.util.hasFeature=function(d){return typeof b[d]!=="undefined"
};
gadgets.util.getServices=function(){return a
}
})();;

/* [end] feature=core.util */

/* [start] feature=rpc */
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.wpm){gadgets.rpctx.wpm=function(){var e,d;
var c=true;
function b(h,j,g){if(typeof window.addEventListener!="undefined"){window.addEventListener(h,j,g)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("on"+h,j)
}}if(h==="message"){window.___jsl=window.___jsl||{};
var i=window.___jsl;
i.RPMQ=i.RPMQ||[];
i.RPMQ.push(j)
}}function a(h,i,g){if(window.removeEventListener){window.removeEventListener(h,i,g)
}else{if(window.detachEvent){window.detachEvent("on"+h,i)
}}}function f(h){var i=gadgets.json.parse(h.data);
if(!i||!i.f){return
}gadgets.debug("gadgets.rpc.receive("+window.name+"): "+h.data);
var g=gadgets.rpc.getTargetOrigin(i.f);
if(c&&(typeof h.origin!=="undefined"?h.origin!==g:h.domain!==/^.+:\/\/([^:]+).*/.exec(g)[1])){gadgets.error("Invalid rpc message origin. "+g+" vs "+(h.origin||""));
return
}e(i,h.origin)
}return{getCode:function(){return"wpm"
},isParentVerifiable:function(){return true
},init:function(h,i){function g(k){var j=k&&k.rpc||{};
if(String(j.disableForceSecure)==="true"){c=false
}}gadgets.config.register("rpc",null,g);
e=h;
d=i;
b("message",f,false);
d("..",true);
return true
},setup:function(h,g){d(h,true);
return true
},call:function(h,k,j){var g=gadgets.rpc.getTargetOrigin(h);
var i=gadgets.rpc._getTargetWin(h);
if(g){window.setTimeout(function(){var l=gadgets.json.stringify(j);
gadgets.debug("gadgets.rpc.send("+window.name+"): "+l);
i.postMessage(l,g)
},0)
}else{if(h!=".."){gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message")
}}return true
}}
}()
};;

       gadgets.rpctx.ifpc = gadgets.rpctx.wpm;
    ;
if(!window.gadgets||!window.gadgets["rpc"]){gadgets.rpc=function(){var M="__cb";
var S="";
var T="__ack";
var f=500;
var G=10;
var b="|";
var u="callback";
var g="origin";
var r="referer";
var s="legacy__";
var q={};
var W={};
var D={};
var B={};
var z=0;
var l={};
var m={};
var d={};
var n={};
var E={};
var e=null;
var p=null;
var A=(window.top!==window.self);
var v=window.name;
var J=function(){};
var P=0;
var Y=1;
var a=2;
var x=window.console;
var V=x&&x.log&&function(ae){x.log(ae)
}||function(){};
var R=(function(){function ae(af){return function(){V(af+": call ignored")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:ae("init"),setup:ae("setup"),call:ae("call")}
})();
if(gadgets.util){d=gadgets.util.getUrlParameters()
}function K(){if(d.rpctx=="flash"){return gadgets.rpctx.flash
}if(d.rpctx=="rmr"){return gadgets.rpctx.rmr
}var ae=typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?(gadgets.rpctx.flash?gadgets.rpctx.flash:(gadgets.rpctx.nix?gadgets.rpctx.nix:gadgets.rpctx.ifpc)):navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc;
if(!ae){ae=R
}return ae
}function k(aj,ah){if(n[aj]){return
}var af=H;
if(!ah){af=R
}n[aj]=af;
var ae=E[aj]||[];
for(var ag=0;
ag<ae.length;
++ag){var ai=ae[ag];
ai.t=F(aj);
af.call(aj,ai.f,ai)
}E[aj]=[]
}var I=false,U=false;
function N(){if(U){return
}function ae(){I=true
}if(typeof window.addEventListener!="undefined"){window.addEventListener("unload",ae,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onunload",ae)
}}U=true
}function j(ae,ai,af,ah,ag){if(!B[ai]||B[ai]!==af){gadgets.error("Invalid gadgets.rpc token. "+B[ai]+" vs "+af);
J(ai,a)
}ag.onunload=function(){if(m[ai]&&!I){J(ai,Y);
gadgets.rpc.removeReceiver(ai)
}};
N();
ah=gadgets.json.parse(decodeURIComponent(ah))
}function Z(ak,af){if(ak&&typeof ak.s==="string"&&typeof ak.f==="string"&&ak.a instanceof Array){if(B[ak.f]){if(B[ak.f]!==ak.t){gadgets.error("Invalid gadgets.rpc token. "+B[ak.f]+" vs "+ak.t);
J(ak.f,a)
}}if(ak.s===T){window.setTimeout(function(){k(ak.f,true)
},0);
return
}if(ak.c){ak[u]=function(al){var am=ak.g?s:"";
gadgets.rpc.call(ak.f,am+M,null,ak.c,al)
}
}if(af){var ag=t(af);
ak[g]=af;
var ah=ak.r,aj;
try{aj=t(ah)
}catch(ai){}if(!ah||aj!=ag){ah=af
}ak[r]=ah
}var ae=(q[ak.s]||q[S]).apply(ak,ak.a);
if(ak.c&&typeof ae!=="undefined"){gadgets.rpc.call(ak.f,M,null,ak.c,ae)
}}}function t(ag){if(!ag){return""
}ag=((ag.split("#"))[0].split("?"))[0];
ag=ag.toLowerCase();
if(ag.indexOf("//")==0){ag=window.location.protocol+ag
}if(ag.indexOf("://")==-1){ag=window.location.protocol+"//"+ag
}var ah=ag.substring(ag.indexOf("://")+3);
var ae=ah.indexOf("/");
if(ae!=-1){ah=ah.substring(0,ae)
}var aj=ag.substring(0,ag.indexOf("://"));
if(aj!=="http"&&aj!=="https"&&aj!=="chrome-extension"&&aj!=="file"){throw Error("Invalid URI scheme in origin")
}var ai="";
var ak=ah.indexOf(":");
if(ak!=-1){var af=ah.substring(ak+1);
ah=ah.substring(0,ak);
if((aj==="http"&&af!=="80")||(aj==="https"&&af!=="443")){ai=":"+af
}}return aj+"://"+ah+ai
}function C(af,ae){return"/"+af+(ae?b+ae:"")
}function y(ah){if(ah.charAt(0)=="/"){var af=ah.indexOf(b);
var ag=af>0?ah.substring(1,af):ah.substring(1);
var ae=af>0?ah.substring(af+1):null;
return{id:ag,origin:ae}
}else{return null
}}function ad(ag){if(typeof ag==="undefined"||ag===".."){return window.parent
}var af=y(ag);
if(af){return window.top.frames[af.id]
}ag=String(ag);
var ae=window.frames[ag];
if(ae){return ae
}ae=document.getElementById(ag);
if(ae&&ae.contentWindow){return ae.contentWindow
}return null
}function L(ah){var ag=null;
var ae=O(ah);
if(ae){ag=ae
}else{var af=y(ah);
if(af){ag=af.origin
}else{if(ah==".."){ag=d.parent
}else{ag=document.getElementById(ah).src
}}}return t(ag)
}var H=K();
q[S]=function(){V("Unknown RPC service: "+this["s"])
};
q[M]=function(af,ae){var ag=l[af];
if(ag){delete l[af];
ag.call(this,ae)
}};
function X(ag,ae){if(m[ag]===true){return
}if(typeof m[ag]==="undefined"){m[ag]=0
}var af=ad(ag);
if(ag===".."||af!=null){if(H.setup(ag,ae)===true){m[ag]=true;
return
}}if(m[ag]!==true&&m[ag]++<G){window.setTimeout(function(){X(ag,ae)
},f)
}else{n[ag]=R;
m[ag]=true
}}function O(af){var ae=W[af];
if(ae&&ae.substring(0,1)==="/"){if(ae.substring(1,2)==="/"){ae=document.location.protocol+ae
}else{ae=document.location.protocol+"//"+document.location.host+ae
}}return ae
}function ac(af,ae,ag){if(ae&&!/http(s)?:\/\/.+/.test(ae)){if(ae.indexOf("//")==0){ae=window.location.protocol+ae
}else{if(ae.charAt(0)=="/"){ae=window.location.protocol+"//"+window.location.host+ae
}else{if(ae.indexOf("://")==-1){ae=window.location.protocol+"//"+ae
}}}}W[af]=ae;
if(typeof ag!=="undefined"){D[af]=!!ag
}}function F(ae){return B[ae]
}function c(ae,af){af=af||"";
B[ae]=String(af);
X(ae,af)
}function ab(af){var ae=af.passReferrer||"";
var ag=ae.split(":",2);
e=ag[0]||"none";
p=ag[1]||"origin"
}function aa(ae){if(Q(ae)){H=gadgets.rpctx.ifpc||R;
H.init(Z,k)
}}function Q(ae){return String(ae.useLegacyProtocol)==="true"
}function h(af,ae){function ag(aj){var ai=aj&&aj.rpc||{};
ab(ai);
var ah=ai.parentRelayUrl||"";
ah=t(d.parent||ae)+ah;
ac("..",ah,Q(ai));
aa(ai);
c("..",af)
}if(!d.parent&&ae){ag({});
return
}gadgets.config.register("rpc",null,ag)
}function o(af,aj,al){var ai=null;
if(af.charAt(0)!="/"){if(!gadgets.util){return
}ai=document.getElementById(af);
if(!ai){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+af+", element not found.")
}}var ae=ai&&ai.src;
var ag=aj||gadgets.rpc.getOrigin(ae);
ac(af,ag);
var ak=gadgets.util.getUrlParameters(ae);
var ah=al||ak.rpctoken;
c(af,ah)
}function i(ae,ag,ah){if(ae===".."){var af=ah||d.rpctoken||d.ifpctok||"";
h(af,ag)
}else{o(ae,ag,ah)
}}function w(ag){if(e==="bidir"||(e==="c2p"&&ag==="..")||(e==="p2c"&&ag!=="..")){var af=window.location.href;
var ah="?";
if(p==="query"){ah="#"
}else{if(p==="hash"){return af
}}var ae=af.lastIndexOf(ah);
ae=ae===-1?af.length:ae;
return af.substring(0,ae)
}return null
}return{config:function(ae){if(typeof ae.securityCallback==="function"){J=ae.securityCallback
}},register:function(af,ae){if(af===M||af===T){throw new Error("Cannot overwrite callback/ack service")
}if(af===S){throw new Error("Cannot overwrite default service: use registerDefault")
}q[af]=ae
},unregister:function(ae){if(ae===M||ae===T){throw new Error("Cannot delete callback/ack service")
}if(ae===S){throw new Error("Cannot delete default service: use unregisterDefault")
}delete q[ae]
},registerDefault:function(ae){q[S]=ae
},unregisterDefault:function(){delete q[S]
},forceParentVerifiable:function(){if(!H.isParentVerifiable()){H=gadgets.rpctx.ifpc
}},call:function(ae,ag,al,aj){ae=ae||"..";
var ak="..";
if(ae===".."){ak=v
}else{if(ae.charAt(0)=="/"){ak=C(v,gadgets.rpc.getOrigin(window.location.href))
}}++z;
if(al){l[z]=al
}var ai={s:ag,f:ak,c:al?z:0,a:Array.prototype.slice.call(arguments,3),t:B[ae],l:!!D[ae]};
var af=w(ae);
if(af){ai.r=af
}if(ae!==".."&&y(ae)==null&&!document.getElementById(ae)){return
}var ah=n[ae];
if(!ah&&y(ae)!==null){ah=H
}if(ag.indexOf(s)===0){ah=H;
ai.s=ag.substring(s.length);
ai.c=ai.c?ai.c:z
}ai.g=true;
ai.r=ak;
if(!ah){if(!E[ae]){E[ae]=[ai]
}else{E[ae].push(ai)
}return
}if(D[ae]){ah=gadgets.rpctx.ifpc
}if(ah.call(ae,ak,ai)===false){n[ae]=R;
H.call(ae,ak,ai)
}},getRelayUrl:O,setRelayUrl:ac,setAuthToken:c,setupReceiver:i,getAuthToken:F,removeReceiver:function(ae){delete W[ae];
delete D[ae];
delete B[ae];
delete m[ae];
delete n[ae]
},getRelayChannel:function(){return H.getCode()
},receive:function(af,ae){if(af.length>4){H._receiveMessage(af,Z)
}else{j.apply(null,af.concat(ae))
}},receiveSameDomain:function(ae){ae.a=Array.prototype.slice.call(ae.a);
window.setTimeout(function(){Z(ae)
},0)
},getOrigin:t,getTargetOrigin:L,init:function(){if(H.init(Z,k)===false){H=R
}if(A){i("..")
}else{gadgets.config.register("rpc",null,function(af){var ae=af.rpc||{};
ab(ae);
aa(ae)
})
}},_getTargetWin:ad,_parseSiblingId:y,ACK:T,RPC_ID:v||"..",SEC_ERROR_LOAD_TIMEOUT:P,SEC_ERROR_FRAME_PHISH:Y,SEC_ERROR_FORGED_MSG:a}
}();
gadgets.rpc.init()
}else{if(typeof gadgets.rpc=="undefined"||!gadgets.rpc){gadgets.rpc=window.gadgets["rpc"];
gadgets.rpc.config=gadgets.rpc.config;
gadgets.rpc.register=gadgets.rpc.register;
gadgets.rpc.unregister=gadgets.rpc.unregister;
gadgets.rpc.registerDefault=gadgets.rpc.registerDefault;
gadgets.rpc.unregisterDefault=gadgets.rpc.unregisterDefault;
gadgets.rpc.forceParentVerifiable=gadgets.rpc.forceParentVerifiable;
gadgets.rpc.call=gadgets.rpc.call;
gadgets.rpc.getRelayUrl=gadgets.rpc.getRelayUrl;
gadgets.rpc.setRelayUrl=gadgets.rpc.setRelayUrl;
gadgets.rpc.setAuthToken=gadgets.rpc.setAuthToken;
gadgets.rpc.setupReceiver=gadgets.rpc.setupReceiver;
gadgets.rpc.getAuthToken=gadgets.rpc.getAuthToken;
gadgets.rpc.removeReceiver=gadgets.rpc.removeReceiver;
gadgets.rpc.getRelayChannel=gadgets.rpc.getRelayChannel;
gadgets.rpc.receive=gadgets.rpc.receive;
gadgets.rpc.receiveSameDomain=gadgets.rpc.receiveSameDomain;
gadgets.rpc.getOrigin=gadgets.rpc.getOrigin;
gadgets.rpc.getTargetOrigin=gadgets.rpc.getTargetOrigin;
gadgets.rpc._getTargetWin=gadgets.rpc._getTargetWin;
gadgets.rpc._parseSiblingId=gadgets.rpc._parseSiblingId
}};;

/* [end] feature=rpc */
gadgets.config.init({"rpc":{"commSwf":"//xpc.googleusercontent.com/gadgets/xpc.swf","passReferrer":"p2c:query","parentRelayUrl":"/rpc_relay.html"}});
(function(){var j=window['___jsl']=window['___jsl']||{};j['l']=(j['l']||[]).concat(['rpc','core.util']);})();(function(){var j=window['___jsl']=window['___jsl']||{};if(j['c']){j['c']();delete j['c'];}})();var friendconnect_serverBase = "https://www.google.com";var friendconnect_loginUrl = "https://www.google.com/accounts";var friendconnect_gadgetPrefix = "http://www-a-fc-opensocial.googleusercontent.com/gadgets";
var friendconnect_serverVersion = "0.1-e2827b02_8a025607_217d4300_43d914a9_668b6b35.7";
var friendconnect_imageUrl = "https://www.google.com/friendconnect/scs/images";
var friendconnect_lightbox = true;
var fca=gadgets,fcb=Error,fcc=friendconnect_serverBase,fcd=encodeURIComponent,fcaa=parseInt,fce=String,fcf=window,fcba=setTimeout,fcca=Object,fcg=document,fch=Array,fci=Math;function fcda(a,b){return a.length=b}function fcea(a,b){return a.className=b}function fcj(a,b){return a.width=b}function fck(a,b){return a.innerHTML=b}function fcl(a,b){return a.height=b}
var fcm="appendChild",fcn="push",fcfa="toString",fco="length",fcga="propertyIsEnumerable",fcha="stringify",fc="prototype",fcia="test",fcja="shift",fcp="width",fcq="round",fcr="slice",fcs="replace",fct="document",fcka="data",fcu="split",fcv="getElementById",fcw="charAt",fcx="location",fcy="getUrlParameters",fcz="indexOf",fcla="Dialog",fcA="style",fcB="body",fcma="left",fcC="call",fcD="match",fcE="options",fcna="lastIndexOf",fcoa="random",fcF="createElement",fcG="json",fcH="charCodeAt",fcI="addEventListener",
fcJ="setAttribute",fcpa="href",fcqa="substring",fcra="getContentElement",fcK="util",fcsa="maxHeight",fcta="type",fcL="apply",fcua="auth",fcva="reset",fcwa="getSecurityToken",fcxa="bind",fcM="name",fcN="height",fcO="register",fcP="join",fcya="toLowerCase",fcza="right",goog=goog||{},fcQ=this,fcAa=function(a,b,c){a=a[fcu](".");c=c||fcQ;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a[fco]&&(d=a[fcja]());)a[fco]||void 0===b?c=c[d]?c[d]:c[d]={}:c[d]=b},fcBa=function(a){var b=typeof a;if("object"==
b)if(a){if(a instanceof fch)return"array";if(a instanceof fcca)return b;var c=fcca[fc][fcfa][fcC](a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a[fco]&&"undefined"!=typeof a.splice&&"undefined"!=typeof a[fcga]&&!a[fcga]("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a[fcC]&&"undefined"!=typeof a[fcga]&&!a[fcga]("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a[fcC])return"object";return b},fcCa=function(a){return void 0!==
a},fcDa=function(a){var b=fcBa(a);return"array"==b||"object"==b&&"number"==typeof a[fco]},fcR=function(a){return"string"==typeof a},fcEa=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};fci[fcoa]();
var fcS=function(a){var b=fcBa(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=fcS(a[c]);return b}return a},fcFa=function(a,b,c){return a[fcC][fcL](a[fcxa],arguments)},fcGa=function(a,b,c){if(!a)throw fcb();if(2<arguments[fco]){var d=fch[fc][fcr][fcC](arguments,2);return function(){var c=fch[fc][fcr][fcC](arguments);fch[fc].unshift[fcL](c,d);return a[fcL](b,c)}}return function(){return a[fcL](b,arguments)}},fcT=function(a,b,c){fcT=Function[fc][fcxa]&&
-1!=Function[fc][fcxa][fcfa]()[fcz]("native code")?fcFa:fcGa;return fcT[fcL](null,arguments)},fcHa=function(a,b){var c=fch[fc][fcr][fcC](arguments,1);return function(){var b=c[fcr]();b[fcn][fcL](b,arguments);return a[fcL](this,b)}},fcIa=function(a,b){for(var c in b)a[c]=b[c]},fcJa=Date.now||function(){return+new Date},fcU=function(a,b,c){fcAa(a,b,c)},fcV=function(a,b){function c(){}c.prototype=b[fc];a.Qc=b[fc];a.prototype=new c;a[fc].constructor=a};
Function[fc].bind=Function[fc][fcxa]||function(a,b){if(1<arguments[fco]){var c=fch[fc][fcr][fcC](arguments,1);c.unshift(this,a);return fcT[fcL](null,c)}return fcT(this,a)};var fcKa=function(a,b){for(var c=a[fcu]("%s"),d="",e=fch[fc][fcr][fcC](arguments,1);e[fco]&&1<c[fco];)d+=c[fcja]()+e[fcja]();return d+c[fcP]("%s")},fcLa=function(a,b){var c=fce(a)[fcya](),d=fce(b)[fcya]();return c<d?-1:c==d?0:1},fcRa=function(a,b){if(b)return a[fcs](fcMa,"&amp;")[fcs](fcNa,"&lt;")[fcs](fcOa,"&gt;")[fcs](fcPa,"&quot;");if(!fcQa[fcia](a))return a;-1!=a[fcz]("&")&&(a=a[fcs](fcMa,"&amp;"));-1!=a[fcz]("<")&&(a=a[fcs](fcNa,"&lt;"));-1!=a[fcz](">")&&(a=a[fcs](fcOa,"&gt;"));-1!=a[fcz]('"')&&
(a=a[fcs](fcPa,"&quot;"));return a},fcMa=/&/g,fcNa=/</g,fcOa=/>/g,fcPa=/\"/g,fcQa=/[&<>\"]/,fcTa=function(a,b){for(var c=0,d=fce(a)[fcs](/^[\s\xa0]+|[\s\xa0]+$/g,"")[fcu]("."),e=fce(b)[fcs](/^[\s\xa0]+|[\s\xa0]+$/g,"")[fcu]("."),f=fci.max(d[fco],e[fco]),k=0;0==c&&k<f;k++){var l=d[k]||"",m=e[k]||"",n=RegExp("(\\d*)(\\D*)","g"),g=RegExp("(\\d*)(\\D*)","g");do{var h=n.exec(l)||["","",""],p=g.exec(m)||["","",""];if(0==h[0][fco]&&0==p[0][fco])break;var c=0==h[1][fco]?0:fcaa(h[1],10),s=0==p[1][fco]?0:fcaa(p[1],
10),c=fcSa(c,s)||fcSa(0==h[2][fco],0==p[2][fco])||fcSa(h[2],p[2])}while(0==c)}return c},fcSa=function(a,b){return a<b?-1:a>b?1:0};fci[fcoa]();var fcUa=function(a){return fce(a)[fcs](/\-([a-z])/g,function(a,c){return c.toUpperCase()})},fcVa=function(a,b){var c=fcR(b)?fce(b)[fcs](/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1")[fcs](/\x08/g,"\\x08"):"\\s",c=c?"|["+c+"]+":"",c=RegExp("(^"+c+")([a-z])","g");return a[fcs](c,function(a,b,c){return b+c.toUpperCase()})};var fcWa,fcXa,fcYa,fcZa,fc_a=function(){return fcQ.navigator?fcQ.navigator.userAgent:null},fc0a=function(){return fcQ.navigator},fc1a=function(){fcZa=fcYa=fcXa=fcWa=!1;var a;if(a=fc_a()){var b=fc0a();fcWa=0==a[fcna]("Opera",0);fcXa=!fcWa&&(-1!=a[fcz]("MSIE")||-1!=a[fcz]("Trident"));(fcYa=!fcWa&&-1!=a[fcz]("WebKit"))&&a[fcz]("Mobile");fcZa=!fcWa&&!fcYa&&!fcXa&&"Gecko"==b.product}};fc1a();
var fc2a=fcWa,fcW=fcXa,fc3a=fcZa,fc4a=fcYa,fc5a=function(){var a=fc0a();return a&&a.platform||""},fc6a=fc5a(),fc7a=function(){fc6a[fcz]("Mac");fc6a[fcz]("Win");fc6a[fcz]("Linux");fc0a()&&(fc0a().appVersion||"")[fcz]("X11");var a=fc_a();a&&a[fcz]("Android");a&&a[fcz]("iPhone");a&&a[fcz]("iPad")};fc7a();
var fc9a=function(){var a="",b;fc2a&&fcQ.opera?(a=fcQ.opera.version,a="function"==typeof a?a():a):(fc3a?b=/rv\:([^\);]+)(\)|;)/:fcW?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:fc4a&&(b=/WebKit\/(\S+)/),b&&(a=(a=b.exec(fc_a()))?a[1]:""));return fcW&&(b=fc8a(),b>parseFloat(a))?fce(b):a},fc8a=function(){var a=fcQ[fct];return a?a.documentMode:void 0},fc$a=fc9a(),fcab={},fcbb=function(a){return fcab[a]||(fcab[a]=0<=fcTa(fc$a,a))},fccb=function(){var a=fcQ[fct];if(a&&fcW){var b=fc8a();return b||("CSS1Compat"==
a.compatMode?fcaa(fc$a,10):5)}}();var fcdb=function(a){fcb.captureStackTrace?fcb.captureStackTrace(this,fcdb):this.stack=fcb().stack||"";a&&(this.message=fce(a))};fcV(fcdb,fcb);fcdb[fc].name="CustomError";var fceb=function(a,b){b.unshift(a);fcdb[fcC](this,fcKa[fcL](null,b));b[fcja]();this.messagePattern=a};fcV(fceb,fcdb);fceb[fc].name="AssertionError";var fcfb=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new fceb(""+e,f||[]);},fcgb=function(a,b,c){a||fcfb("",null,b,fch[fc][fcr][fcC](arguments,2));return a};var fchb=fch[fc],fcib=fchb[fcz]?function(a,b,c){fcgb(null!=a[fco]);return fchb[fcz][fcC](a,b,c)}:function(a,b,c){c=null==c?0:0>c?fci.max(0,a[fco]+c):c;if(fcR(a))return fcR(b)&&1==b[fco]?a[fcz](b,c):-1;for(;c<a[fco];c++)if(c in a&&a[c]===b)return c;return-1},fcjb=fchb.forEach?function(a,b,c){fcgb(null!=a[fco]);fchb.forEach[fcC](a,b,c)}:function(a,b,c){for(var d=a[fco],e=fcR(a)?a[fcu](""):a,f=0;f<d;f++)f in e&&b[fcC](c,e[f],f,a)},fckb=function(a,b){return 0<=fcib(a,b)},fclb=function(a){var b=a[fco];
if(0<b){for(var c=fch(b),d=0;d<b;d++)c[d]=a[d];return c}return[]},fcmb=function(a,b,c){fcgb(null!=a[fco]);return 2>=arguments[fco]?fchb[fcr][fcC](a,b):fchb[fcr][fcC](a,b,c)};var fcnb=function(a){for(var b=[],c=0,d=0;d<a[fco];d++){for(var e=a[fcH](d);255<e;)b[c++]=e&255,e>>=8;b[c++]=e}return b};var fcob=null,fcpb=null,fcqb=null,fcrb=null,fctb=function(a,b){if(!fcDa(a))throw fcb("encodeByteArray takes an array as a parameter");fcsb();for(var c=b?fcqb:fcob,d=[],e=0;e<a[fco];e+=3){var f=a[e],k=e+1<a[fco],l=k?a[e+1]:0,m=e+2<a[fco],n=m?a[e+2]:0,g=f>>2,f=(f&3)<<4|l>>4,l=(l&15)<<2|n>>6,n=n&63;m||(n=64,k||(l=64));d[fcn](c[g],c[f],c[l],c[n])}return d[fcP]("")},fcub=function(a,b){fcsb();for(var c=b?fcrb:fcpb,d=[],e=0;e<a[fco];){var f=c[a[fcw](e++)],k=e<a[fco],k=k?c[a[fcw](e)]:0;++e;var l=e<a[fco],
l=l?c[a[fcw](e)]:0;++e;var m=e<a[fco],m=m?c[a[fcw](e)]:0;++e;if(null==f||null==k||null==l||null==m)throw fcb();f=f<<2|k>>4;d[fcn](f);64!=l&&(f=k<<4&240|l>>2,d[fcn](f),64!=m&&(f=l<<6&192|m,d[fcn](f)))}return d},fcsb=function(){if(!fcob){fcob={};fcpb={};fcqb={};fcrb={};for(var a=0;65>a;a++)fcob[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[fcw](a),fcpb[fcob[a]]=a,fcqb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_."[fcw](a),fcrb[fcqb[a]]=a}};var fcvb=function(){};var fcX=function(a,b,c){this.i=a;this.ba=c||16;this.Wb=fch(this.ba);this.Ua=fch(this.ba);this.Sb(b)};fcV(fcX,fcvb);fcX[fc].Sb=function(a){a[fco]>this.ba&&(this.i.update(a),a=this.i.digest());for(var b,c=0;c<this.ba;c++)b=c<a[fco]?a[c]:0,this.Wb[c]=b^92,this.Ua[c]=b^54;this.i.update(this.Ua)};fcX[fc].reset=function(){this.i[fcva]();this.i.update(this.Ua)};fcX[fc].update=function(a,b){this.i.update(a,b)};
fcX[fc].digest=function(){var a=this.i.digest();this.i[fcva]();this.i.update(this.Wb);this.i.update(a);return this.i.digest()};fcX[fc].Ib=function(a){this[fcva]();this.update(a);return this.digest()};var fcY=function(){this.c=[];this.Ba=[];this.Hc=[];this.sa=[];this.sa[0]=128;for(var a=1;64>a;++a)this.sa[a]=0;this[fcva]()};fcV(fcY,fcvb);fcY[fc].reset=function(){this.c[0]=1732584193;this.c[1]=4023233417;this.c[2]=2562383102;this.c[3]=271733878;this.c[4]=3285377520;this.kb=this.Q=0};
fcY[fc].J=function(a,b){b||(b=0);var c=this.Hc;if(fcR(a))for(var d=0;16>d;d++)c[d]=a[fcH](b)<<24|a[fcH](b+1)<<16|a[fcH](b+2)<<8|a[fcH](b+3),b+=4;else for(d=0;16>d;d++)c[d]=a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3],b+=4;for(d=16;80>d;d++){var e=c[d-3]^c[d-8]^c[d-14]^c[d-16];c[d]=(e<<1|e>>>31)&4294967295}for(var f=this.c[0],k=this.c[1],l=this.c[2],m=this.c[3],n=this.c[4],g,d=0;80>d;d++)40>d?20>d?(e=m^k&(l^m),g=1518500249):(e=k^l^m,g=1859775393):60>d?(e=k&l|m&(k|l),g=2400959708):(e=k^l^m,g=3395469782),e=
(f<<5|f>>>27)+e+n+g+c[d]&4294967295,n=m,m=l,l=(k<<30|k>>>2)&4294967295,k=f,f=e;this.c[0]=this.c[0]+f&4294967295;this.c[1]=this.c[1]+k&4294967295;this.c[2]=this.c[2]+l&4294967295;this.c[3]=this.c[3]+m&4294967295;this.c[4]=this.c[4]+n&4294967295};
fcY[fc].update=function(a,b){fcCa(b)||(b=a[fco]);for(var c=b-64,d=0,e=this.Ba,f=this.Q;d<b;){if(0==f)for(;d<=c;)this.J(a,d),d+=64;if(fcR(a))for(;d<b;){if(e[f]=a[fcH](d),++f,++d,64==f){this.J(e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,64==f){this.J(e);f=0;break}}this.Q=f;this.kb+=b};
fcY[fc].digest=function(){var a=[],b=8*this.kb;56>this.Q?this.update(this.sa,56-this.Q):this.update(this.sa,64-(this.Q-56));for(var c=63;56<=c;c--)this.Ba[c]=b&255,b/=256;this.J(this.Ba);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.c[c]>>d&255,++b;return a};var fcZ=function(a){this.wb=a},fcwb=/\s*;\s*/;fcZ[fc].Ub=function(a){return!/[;=\s]/[fcia](a)};fcZ[fc].Vb=function(a){return!/[;\r\n]/[fcia](a)};fcZ[fc].set=function(a,b,c,d,e,f){if(!this.Ub(a))throw fcb('Invalid cookie name "'+a+'"');if(!this.Vb(b))throw fcb('Invalid cookie value "'+b+'"');fcCa(c)||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";f=f?";secure":"";0>c?c="":(c=0==c?new Date(1970,1,1):new Date(fcJa()+1E3*c),c=";expires="+c.toUTCString());this.vc(a+"="+b+e+d+c+f)};
fcZ[fc].get=function(a,b){for(var c=a+"=",d=this.ja(),e=0,f;f=d[e];e++){if(0==f[fcna](c,0))return f.substr(c[fco]);if(f==a)return""}return b};fcZ[fc].remove=function(a,b,c){var d=this.K(a);this.set(a,"",0,b,c);return d};fcZ[fc].z=function(){return this.ha().keys};fcZ[fc].D=function(){return this.ha().values};fcZ[fc].N=function(){var a=this.Ma();return a?this.ja()[fco]:0};fcZ[fc].K=function(a){return fcCa(this.get(a))};fcZ[fc].clear=function(){for(var a=this.ha().keys,b=a[fco]-1;0<=b;b--)this.remove(a[b])};
fcZ[fc].vc=function(a){this.wb.cookie=a};fcZ[fc].Ma=function(){return this.wb.cookie};fcZ[fc].ja=function(){return(this.Ma()||"")[fcu](fcwb)};fcZ[fc].ha=function(){for(var a=this.ja(),b=[],c=[],d,e,f=0;e=a[f];f++)d=e[fcz]("="),-1==d?(b[fcn](""),c[fcn](e)):(b[fcn](e[fcqa](0,d)),c[fcn](e[fcqa](d+1)));return{keys:b,values:c}};var fcxb=new fcZ(fcg);fcxb.MAX_COOKIE_LENGTH=3950;var fc_=function(a,b){fcj(this,a);fcl(this,b)};fc_[fc].clone=function(){return new fc_(this[fcp],this[fcN])};fc_[fc].toString=function(){return"("+this[fcp]+" x "+this[fcN]+")"};fc_[fc].ceil=function(){fcj(this,fci.ceil(this[fcp]));fcl(this,fci.ceil(this[fcN]));return this};fc_[fc].floor=function(){fcj(this,fci.floor(this[fcp]));fcl(this,fci.floor(this[fcN]));return this};fc_[fc].round=function(){fcj(this,fci[fcq](this[fcp]));fcl(this,fci[fcq](this[fcN]));return this};
fc_[fc].scale=function(a,b){var c="number"==typeof b?b:a;fcj(this,this[fcp]*a);fcl(this,this[fcN]*c);return this};var fcyb=function(a,b,c){for(var d in a)b[fcC](c,a[d],d,a)},fczb=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},fcAb=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},fcBb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),fcCb=function(a,b){for(var c,d,e=1;e<arguments[fco];e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<fcBb[fco];f++)c=fcBb[f],fcca[fc].hasOwnProperty[fcC](d,c)&&(a[c]=d[c])}};var fcDb=!fcW||fcW&&9<=fccb;!fc3a&&!fcW||fcW&&fcW&&9<=fccb||fc3a&&fcbb("1.9.1");fcW&&fcbb("9");var fcEb=function(a,b){fcea(a,b)},fcFb=function(a){a=a.className;return fcR(a)&&a[fcD](/\S+/g)||[]},fcHb=function(a,b){var c=fcFb(a),d=fcmb(arguments,1),e=c[fco]+d[fco];fcGb(c,d);fcEb(a,c[fcP](" "));return c[fco]==e},fcGb=function(a,b){for(var c=0;c<b[fco];c++)fckb(a,b[c])||a[fcn](b[c])};var fcJb=function(a){return fcIb(fcg,a)},fcIb=function(a,b){return fcR(b)?a[fcv](b):b},fcKb=fcJb,fcLb=function(a,b,c,d){a=d||a;b=b&&"*"!=b?b.toUpperCase():"";if(a.querySelectorAll&&a.querySelector&&(b||c))return c=b+(c?"."+c:""),a.querySelectorAll(c);if(c&&a.getElementsByClassName){a=a.getElementsByClassName(c);if(b){d={};for(var e=0,f=0,k;k=a[f];f++)b==k.nodeName&&(d[e++]=k);fcda(d,e);return d}return a}a=a.getElementsByTagName(b||"*");if(c){d={};for(f=e=0;k=a[f];f++)b=k.className,"function"==typeof b[fcu]&&
fckb(b[fcu](/\s+/),c)&&(d[e++]=k);fcda(d,e);return d}return a},fcNb=function(a,b){fcyb(b,function(b,d){"style"==d?a[fcA].cssText=b:"class"==d?fcea(a,b):"for"==d?a.htmlFor=b:d in fcMb?a[fcJ](fcMb[d],b):0==d[fcna]("aria-",0)||0==d[fcna]("data-",0)?a[fcJ](d,b):a[d]=b})},fcMb={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"},fcOb=
function(a){a=a[fct];a="CSS1Compat"==a.compatMode?a.documentElement:a[fcB];return new fc_(a.clientWidth,a.clientHeight)},fc0=function(a,b,c){return fcPb(fcg,arguments)},fcPb=function(a,b){var c=b[0],d=b[1];if(!fcDb&&d&&(d[fcM]||d[fcta])){c=["<",c];d[fcM]&&c[fcn](' name="',fcRa(d[fcM]),'"');if(d[fcta]){c[fcn](' type="',fcRa(d[fcta]),'"');var e={};fcCb(e,d);delete e[fcta];d=e}c[fcn](">");c=c[fcP]("")}c=a[fcF](c);d&&(fcR(d)?fcea(c,d):"array"==fcBa(d)?fcHb[fcL](null,[c].concat(d)):fcNb(c,d));2<b[fco]&&
fcQb(a,c,b,2);return c},fcQb=function(a,b,c,d){function e(c){c&&b[fcm](fcR(c)?a.createTextNode(c):c)}for(;d<c[fco];d++){var f=c[d];!fcDa(f)||fcEa(f)&&0<f.nodeType?e(f):fcjb(fcRb(f)?fclb(f):f,e)}},fcRb=function(a){if(a&&"number"==typeof a[fco]){if(fcEa(a))return"function"==typeof a.item||"string"==typeof a.item;if("function"==fcBa(a))return"function"==typeof a.item}return!1};var fcSb="StopIteration"in fcQ?fcQ.StopIteration:fcb("StopIteration"),fcTb=function(){};fcTb[fc].next=function(){throw fcSb;};fcTb[fc].__iterator__=function(){return this};var fc1=function(a,b){this.j={};this.e=[];this.Z=this.u=0;var c=arguments[fco];if(1<c){if(c%2)throw fcb("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.nb(a)};fc1[fc].N=function(){return this.u};fc1[fc].D=function(){this.I();for(var a=[],b=0;b<this.e[fco];b++){var c=this.e[b];a[fcn](this.j[c])}return a};fc1[fc].z=function(){this.I();return this.e.concat()};fc1[fc].K=function(a){return fcUb(this.j,a)};
fc1[fc].clear=function(){this.j={};fcda(this.e,0);this.Z=this.u=0};fc1[fc].remove=function(a){return fcUb(this.j,a)?(delete this.j[a],this.u--,this.Z++,this.e[fco]>2*this.u&&this.I(),!0):!1};fc1[fc].I=function(){if(this.u!=this.e[fco]){for(var a=0,b=0;a<this.e[fco];){var c=this.e[a];fcUb(this.j,c)&&(this.e[b++]=c);a++}fcda(this.e,b)}if(this.u!=this.e[fco]){for(var d={},b=a=0;a<this.e[fco];)c=this.e[a],fcUb(d,c)||(this.e[b++]=c,d[c]=1),a++;fcda(this.e,b)}};
fc1[fc].get=function(a,b){return fcUb(this.j,a)?this.j[a]:b};fc1[fc].set=function(a,b){fcUb(this.j,a)||(this.u++,this.e[fcn](a),this.Z++);this.j[a]=b};fc1[fc].nb=function(a){var b;a instanceof fc1?(b=a.z(),a=a.D()):(b=fcAb(a),a=fczb(a));for(var c=0;c<b[fco];c++)this.set(b[c],a[c])};fc1[fc].clone=function(){return new fc1(this)};
fc1[fc].__iterator__=function(a){this.I();var b=0,c=this.e,d=this.j,e=this.Z,f=this,k=new fcTb;k.next=function(){for(;;){if(e!=f.Z)throw fcb("The map has changed since the iterator was created");if(b>=c[fco])throw fcSb;var k=c[b++];return a?k:d[k]}};return k};var fcUb=function(a,b){return fcca[fc].hasOwnProperty[fcC](a,b)};var fcWb=function(a,b,c){fcR(b)?fcVb(a,c,b):fcyb(b,fcHa(fcVb,a))},fcVb=function(a,b,c){(c=fcXb(a,c))&&(a[fcA][c]=b)},fcXb=function(a,b){var c=fcUa(b);if(void 0===a[fcA][c]){var d=(fc4a?"Webkit":fc3a?"Moz":fcW?"ms":fc2a?"O":null)+fcVa(b);if(void 0!==a[fcA][d])return d}return c},fcYb=function(a,b){var c=9==a.nodeType?a:a.ownerDocument||a[fct];return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""},fcZb=function(a,b){return fcYb(a,
b)||(a.currentStyle?a.currentStyle[b]:null)||a[fcA]&&a[fcA][b]},fc_b=function(a){var b;try{b=a.getBoundingClientRect()}catch(c){return{left:0,top:0,right:0,bottom:0}}fcW&&a.ownerDocument[fcB]&&(a=a.ownerDocument,b.left=b[fcma]-(a.documentElement.clientLeft+a[fcB].clientLeft),b.top-=a.documentElement.clientTop+a[fcB].clientTop);return b},fc2b=function(a,b,c){if(b instanceof fc_)c=b[fcN],b=b[fcp];else if(void 0==c)throw fcb("missing height argument");fc0b(a,b);fc1b(a,c)},fc3b=function(a,b){"number"==
typeof a&&(a=(b?fci[fcq](a):a)+"px");return a},fc1b=function(a,b){fcl(a[fcA],fc3b(b,!0))},fc0b=function(a,b){fcj(a[fcA],fc3b(b,!0))},fc4b=function(a,b){if("none"!=fcZb(b,"display"))return a(b);var c=b[fcA],d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";var k=a(b);c.display=d;c.position=f;c.visibility=e;return k},fc5b=function(a){var b=a.offsetWidth,c=a.offsetHeight,d=fc4a&&!b&&!c;return fcCa(b)&&!d||!a.getBoundingClientRect?new fc_(b,c):(a=fc_b(a),
new fc_(a[fcza]-a[fcma],a.bottom-a.top))},fc6b=function(a,b){a[fcA].display=b?"":"none"};var fc7b={},fc8b={};var fc9b=function(a,b,c,d){b=b||"800";c=c||"550";d=d||"friendconnect";a=fcf.open(a,d,"menubar=no,toolbar=no,dialog=yes,location=yes,alwaysRaised=yes,width="+b+",height="+c+",resizable=yes,scrollbars=1,status=1");fcf.focus&&a&&a.focus()},fc$b=function(a,b){var c=fca[fcK][fcy]().communityId;fca.rpc[fcC](null,"signin",null,c,a,b)};fcU("goog.peoplesense.util.openPopup",fc9b);fcU("goog.peoplesense.util.finishSignIn",fc$b);var fccc=function(a,b){var c=fcac()+"/friendconnect/invite/friends",d=fcd(shindig[fcua][fcwa]());fcbc(c,d,a,b)},fcbc=function(a,b,c,d){a+="?st="+b;c&&(a+="&customMessage="+fcd(c));d&&(a+="&customInviteUrl="+fcd(d));b=760;fcW&&(b+=25);fc9b(a,fce(b),"515","friendconnect_invite")};fcU("goog.peoplesense.util.invite",fccc);fcU("goog.peoplesense.util.inviteFriends",fcbc);var fcdc=function(a){this.url=a};fcdc[fc].l=function(a,b){if(0<=this.url[fcz]("?"+a+"=")||0<=this.url[fcz]("&"+a+"="))throw fcb("duplicate: "+a);if(null===b||void 0===b)return this;var c=0<=this.url[fcz]("?")?"&":"?";this.url+=c+a+"="+fcd(b);return this};fcdc[fc].toString=function(){return this.url};var fcac=function(){return fcf.friendconnect_serverBase},fcec=function(a,b,c,d,e,f,k){b=b||"800";c=c||"550";d=d||"friendconnect";f=f||!1;fca.rpc[fcC](null,"openLightboxIframe",k,a,shindig[fcua][fcwa](),b,c,d,e,null,null,null,f)},fcfc=function(a,b){var c=fca[fcK][fcy]().psinvite||"",d=new fcdc(fcac()+"/friendconnect/signin/home");d.l("st",fcf.shindig[fcua][fcwa]());d.l("psinvite",c);d.l("iframeId",a);d.l("loginProvider",b);d.l("subscribeOnSignin","1");fc9b(d[fcfa]());return!1},fcgc=function(){var a=
fca[fcK][fcy]().communityId;fca.rpc[fcC](null,"signout",null,a)},fcic=function(a,b){var c=fcac()+"/friendconnect/settings/edit?st="+fcd(shindig[fcua][fcwa]())+(a?"&iframeId="+fcd(a):"");b&&(c=c+"&"+b);fchc(c)},fcjc=function(a){a=fcac()+"/friendconnect/settings/siteProfile?st="+fcd(a);fchc(a)},fchc=function(a){var b=800,c=510;fcW&&(b+=25);fc9b(a,fce(b),fce(c))},fckc=function(a,b,c,d){d=d||2;var e=null;if("text"==b)e=fc0("div",{"class":"gfc-button-text"},fc0("div",{"class":"gfc-icon"},fc0("a",{href:"javascript:void(0);"},
c))),a[fcm](e);else if("long"==b||"standard"==b)e=1==d?fc0("div",{"class":"gfc-inline-block gfc-primaryactionbutton gfc-button-base"},fc0("div",{"class":"gfc-inline-block gfc-button-base-outer-box"},fc0("div",{"class":"gfc-inline-block gfc-button-base-inner-box"},fc0("div",{"class":"gfc-button-base-pos"},fc0("div",{"class":"gfc-button-base-top-shadow",innerHTML:"&nbsp;"}),fc0("div",{"class":"gfc-button-base-content"},fc0("div",{"class":"gfc-icon"},c)))))):fc0("table",{"class":"gfc-button-base-v2 gfc-button",
cellpadding:"0",cellspacing:"0"},fc0("tbody",{"class":""},fc0("tr",{"class":""},fc0("td",{"class":"gfc-button-base-v2 gfc-button-1"}),fc0("td",{"class":"gfc-button-base-v2 gfc-button-2"},c),fc0("td",{"class":"gfc-button-base-v2 gfc-button-3"})))),a[fcm](e),"standard"==b&&(b=fc0("div",{"class":"gfc-footer-msg"},"with Google Friend Connect"),1==d&&a[fcm](fc0("br")),a[fcm](b));return e},fclc=function(a,b){if(!a)throw"google.friendconnect.renderSignInButton: missing options";var c=a[fcA]||"standard",
d=a.text,e=a.version;if("standard"==c)d=a.text||"Sign in";else if("text"==c||"long"==c)d=a.text||"Sign in with Friend Connect";var f=a.element;if(!f){f=a.id;if(!f)throw"google.friendconnect.renderSignInButton: options[id] and options[element] == null";f=fcKb(f);if(!f)throw"google.friendconnect.renderSignInButton: element "+a.id+" not found";}fck(f,"");c=fckc(f,c,d,e);fcf[fcI]?c[fcI]("click",b,!1):c.attachEvent("onclick",b)},fcmc=function(a,b){b=b||fcT(fcfc,null,null,null,null);fclc(a,b)},fcnc=function(a,
b){fca.rpc[fcC](null,"putReloadViewParam",null,a,b);var c=fca.views.getParams();c[a]=b},fcoc=function(a,b){var c=new fcdc("/friendconnect/gadgetshare/friends");c.l("customMessage",a);c.l("customInviteUrl",b);c.l("container","glb");var d=310;fcW&&(d+=25);fcec(c[fcfa](),fce(d),"370")};fcU("goog.peoplesense.util.getBaseUrl",fcac);fcU("goog.peoplesense.util.finishSignIn",fc$b);fcU("goog.peoplesense.util.signout",fcgc);fcU("goog.peoplesense.util.signin",fcfc);fcU("goog.peoplesense.util.editSettings",fcic);
fcU("goog.peoplesense.util.editSSProfile",fcjc);fcU("goog.peoplesense.util.setStickyViewParamToken",fcnc);fcU("google.friendconnect.renderSignInButton",fcmc);fcU("goog.peoplesense.util.share",fcoc);fcU("goog.peoplesense.util.userAgent.IE",fcW);var fcpc={},fcqc={},fc2=function(a){this.h=new fc1;this.snippetId=a.id;this.site=a.site;a=a["view-params"];var b=a.skin;this.gc=(b?b.POSITION:"top")||"top";this.Ic={allowAnonymousPost:a.allowAnonymousPost||!1,scope:a.scope||"SITE",docId:a.docId||"",features:a.features||"video,comment",startMaximized:"true",disableMinMax:"true",skin:b};this.absoluteBottom=fcW&&!fcbb("7");this.fixedIeSizes=fcW;fcf[fcI]?fcf[fcI]("resize",fcT(this.cb,this),!1):fcf.attachEvent("onresize",fcT(this.cb,this));this.sb()};
fc2[fc].sb=function(){if(!this.site)throw fcb("Must supply site ID.");if(!this.snippetId)throw fcb("Must supply a snippet ID.");};fc2[fc].b=10;fc2[fc].Aa=1;fc2[fc].q="fc-friendbar-";fc2[fc].s=fc2[fc].q+"outer";fc2[fc].fb=fc2[fc].s+"-shadow";fc2[fc].render=function(){fcg.write(this.Ab());var a=fcJb(this.snippetId);fck(a,this.M())};fc2[fc].Bb=function(){var a=fcJb(this.s);return a=fc4b(fc5b,a)[fcp]};fc2[fc].cb=function(){for(var a=this.h.z(),b=0;b<a[fco];b++)this.sc(a[b]);goog&&fc7b&&fc8b&&fcrc&&fcsc("resize")};
fc2[fc].n=function(){return this.gc};fc2[fc].d=function(a){return this.q+"shadow-"+a};fc2[fc].ia=function(a){return this.q+"menus-"+a};fc2[fc].P=function(a){return this.q+a+"Target"};fc2[fc].fa=function(a){return this.q+a+"Drawer"};fc2[fc].Ra=function(){return this.P("")};fc2[fc].Sa=function(){return this.q+"wallpaper"};fc2[fc].Na=function(){return this.fa("")};
fc2[fc].Ab=function(){var a=fcf.friendconnect_imageUrl+"/",b=a+"shadow_tc.png",c=a+"shadow_bc.png",d=a+"shadow_bl.png",e=a+"shadow_tl.png",f=a+"shadow_tr.png",k=a+"shadow_br.png",a=a+"shadow_cr.png",l=function(a,b){return fcW?'filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+a+'", sizingMethod="scale");':"background-image: url("+a+");background-repeat: "+b+"; "},m="position:absolute; top:";"top"!=this.n()&&(m="position:fixed; bottom:",this.absoluteBottom&&(m="position:absolute; bottom:"));
var n=c;"top"!=this.n()&&(n=b);var g=0,h=[];h[g++]='<style type="text/css">';"top"!=this.n()&&this.absoluteBottom&&(h[g++]="html, body {height: 100%; overflow: auto; };");h[g++]="#"+this.s+" {";h[g++]="background:#E0ECFF;";h[g++]="left:0;";h[g++]="height: "+(fcW?"35px;":"36px;");"top"!=this.n()&&this.absoluteBottom&&(h[g++]="margin-right: 20px;");h[g++]="padding:0;";h[g++]=m+" 0;";h[g++]="width:100%;";h[g++]="z-index:5000;";h[g++]="}";h[g++]="#"+this.fb+" {";h[g++]=l(n,"repeat-x");h[g++]="left:0;";
h[g++]="height:"+this.b+"px;";"top"!=this.n()&&this.absoluteBottom&&(h[g++]="margin-right: 20px;");h[g++]="padding:0;";h[g++]=m+(fcW?"35px;":"36px;");h[g++]="width:100%;";h[g++]="z-index:4998;";h[g++]="}";h[g++]="."+this.Na()+" {";h[g++]="display: block;";h[g++]="padding:0;";h[g++]=m+(fcW?"34px;":"35px;");h[g++]="z-index:4999;";h[g++]="}";h[g++]="."+this.Sa()+" {";h[g++]="background: white;";h[g++]="height: 100%;";h[g++]="margin-right: "+this.b+"px;";h[g++]="}";h[g++]="."+this.Ra()+" {";h[g++]="border: "+
this.Aa+"px solid #ccc;";h[g++]="height: 100%;";h[g++]="left: 0;";h[g++]="background-image: url("+fcf.friendconnect_imageUrl+"/loading.gif);";h[g++]="background-position: center;";h[g++]="background-repeat: no-repeat;";h[g++]="}";h[g++]="."+this.d("cr")+" {";h[g++]=l(a,"repeat-y");h[g++]="height: 100%;";h[g++]="position:absolute;";h[g++]="right: 0;";h[g++]="top: 0;";h[g++]="width:"+this.b+"px;";h[g++]="}";h[g++]="."+this.d("bl")+" {";h[g++]=l(d,"no-repeat");h[g++]="height: "+this.b+"px;";h[g++]="position:absolute;";
h[g++]="width:"+this.b+"px;";h[g++]="}";h[g++]="."+this.d("tl")+" {";h[g++]=l(e,"no-repeat");h[g++]="height: "+this.b+"px;";h[g++]="position:absolute;";h[g++]="left:0px;";h[g++]="width:"+this.b+"px;";h[g++]="}";h[g++]="."+this.d("bc")+" {";h[g++]=l(c,"repeat-x");h[g++]="height: "+this.b+"px;";h[g++]="left: "+this.b+"px;";h[g++]="position:absolute;";h[g++]="right: "+this.b+"px;";h[g++]="}";h[g++]="."+this.d("tc")+" {";h[g++]=l(b,"repeat-x");h[g++]="height: "+this.b+"px;";h[g++]="left: "+this.b+"px;";
h[g++]="margin-left: "+this.b+"px;";h[g++]="margin-right: "+this.b+"px;";h[g++]="right: "+this.b+"px;";h[g++]="}";h[g++]="."+this.d("br")+" {";h[g++]=l(k,"no-repeat");h[g++]="height: "+this.b+"px;";h[g++]="position:absolute;";h[g++]="right: 0;";h[g++]="width: "+this.b+"px;";h[g++]="}";h[g++]="."+this.d("tr")+" {";h[g++]=l(f,"no-repeat");h[g++]="height: "+this.b+"px;";h[g++]="position:absolute;";h[g++]="right: 0;";h[g++]="top: 0;";h[g++]="width: "+this.b+"px;";h[g++]="}";h[g++]="</style>";return h[fcP]("")};
fc2[fc].M=function(){var a=['<div id="'+this.s+'"></div>','<div id="'+this.fb+'"></div>','<div id="'+this.ia(this.h.N())+'"></div>'];return a[fcP]("")};fc2[fc].ub=function(a,b,c,d){this.h.K(a)||(b=new fc3(this,a,b,c,d),c=this.h.N(),d=fcJb(this.ia(c)),fck(d,b.M()+'<div id="'+this.ia(c+1)+'"></div>'),this.h.set(a,b))};fc2[fc].ma=function(a){(a=this.h.get(a))&&a.drawer&&fc6b(a.drawer,!1)};fc2[fc].ic=function(a){if(a=this.h.get(a))a.rendered=!1};
fc2[fc].refresh=function(){for(var a=this.h.z(),b=0;b<a[fco];b++){var c=a[b];this.ma(c);this.ic(c)}};fc2[fc].cc=function(a){for(var b=this.h.D(),c=0;c<b[fco];c++){var d=b[c];if(d.id==a){d.Fc();break}}};fc2[fc].bc=function(a){for(var b=this.h.D(),c=0;c<b[fco];c++){var d=b[c];if(d.id==a){d.Zb();break}}};fc2[fc].sc=function(a){(a=this.h.get(a))&&a.drawer&&a.oa()&&(a.da(),a.Ja(),a.za())};
fc2[fc].Ec=function(a,b){var c=this.h.get(a);if(c){c.drawer||(c.drawer=fcJb(this.fa(c[fcM])),c.target=fcJb(this.P(c[fcM])),c.sha_bc=fcLb(fcg,"div","top"==this.n()?this.d("bc"):this.d("tc"),c.drawer)[0],c.sha_cr=fcLb(fcg,"div",this.d("cr"),c.drawer)[0]);for(var d=this.h.z(),e=0;e<d[fco];e++){var f=d[e];a!==f&&this.ma(f)}c.da(b);fc6b(c.drawer,!0);fcf.setTimeout(function(){c.za();c.Ja();c.render()},0)}};
var fc3=function(a,b,c,d,e){this.id=-1;this.bar=a;this.name=b;this.constraints=d;this.skin=e||{};fcl(this,this.skin.HEIGHT||"0");this.url=fcf.friendconnect_serverBase+c;this.sha_bc=this.target=this.drawer=null;this.loaded=this.rendered=!1;this.da()};
fc3[fc].da=function(a){fcCb(this.constraints,a||{});fcCb(this.skin,this.constraints);if(this.bar.fixedIeSizes&&this.constraints[fcma]&&this.constraints[fcza]){a=this.bar.Bb();var b=this.constraints[fcma],c=this.constraints[fcza];a-=b+c;a%2&&(a-=1,this.skin.right=this.skin[fcza]+1);fcj(this.skin,a);delete this.skin[fcma]}};
fc3[fc].za=function(){if(this.drawer){if(this.skin[fcp]){var a=this.bar.Aa,b=this.bar.b,c=fcW?2:0;fc2b(this.target,this.skin[fcp],"");fc2b(this.sha_bc,this.skin[fcp]-b+2*a-c,"");this.skin.rightShadow?fc2b(this.drawer,this.skin[fcp]+b+2*a-c,""):fc2b(this.drawer,this.skin[fcp]+2*a-c,"")}this.skin[fcza]&&(this.drawer[fcA].right=this.skin[fcza]+0+"px")}};
fc3[fc].Ja=function(){if(fcW&&this.drawer){var a=fc4b(fc5b,this.target),b=a[fcp]-this.bar.b,a=a[fcN];0>b&&(b=0);this.sha_bc&&this.sha_bc[fcA]&&fc2b(this.sha_bc,b,"");this.sha_cr&&this.sha_cr[fcA]&&fc2b(this.sha_cr,"",a)}};
fc3[fc].M=function(){var a="display:none;",b="position: relative; ",c="",d="",e="",f="",k=!!this.skin.rightShadow;k||(c+="display: none; ",e+="display: none; ",d+="right: 0px; ",f+="margin-right: 0px; ");for(var l in this.skin){var m=Number(this.skin[l]);k&&0==fcLa(l,"width")&&(m+=this.bar.b);0==fcLa(l,"height")&&(b+=l+": "+m+"px; ");"rightShadow"!=l&&(0==fcLa(l,"height")&&(m+=this.bar.b),0==fcLa(l,"width")&&(m+=2),a+=l+": "+m+"px; ");fcW&&0==fcLa(l,"width")&&(m=k?m-2*this.bar.b:m-this.bar.b,d+=l+
": "+m+"px; ")}fcW&&0<(this[fcN]|0)&&(k=(this[fcN]|0)+2,c+="height: "+k+"px; ");k=0;l=[];l[k++]='<div id="'+this.bar.fa(this[fcM])+'"class="'+this.bar.Na()+'"style="'+a+'"> ';"bottom"==this.bar.n()&&(l[k++]='<div class="'+this.bar.d("tl")+'"></div> <div class="'+this.bar.d("tc")+'"style="'+d+'"></div> <div class="'+this.bar.d("tr")+'"style="'+e+'"></div> ');l[k++]='<div style="'+b+'"> <div class="'+this.bar.Sa()+'"style="'+f+'"><div id="'+this.bar.P(this[fcM])+'"class="'+this.bar.Ra()+'"></div> <div class="'+
this.bar.d("cr")+'"style="'+c+'"></div> </div> </div> ';"top"==this.bar.n()&&(l[k++]='<div class="'+this.bar.d("bl")+'"></div> <div class="'+this.bar.d("bc")+'"style="'+d+'"></div> <div class="'+this.bar.d("br")+'"style="'+e+'"></div> ');l[k++]="</div> ";return l[fcP]("")};fc3[fc].Fc=function(){this.rendered=this.oa()};fc3[fc].Zb=function(){this.loaded=this.oa()};fc3[fc].oa=function(){return!!this.drawer&&"none"!=this.drawer[fcA].display};
fc3[fc].render=function(){if(!1==this.rendered){var a={};a.url=this.url;a.id=this.bar.P(this[fcM]);a.site=this.bar.site;a["view-params"]=fcS(this.bar.Ic);"profile"==this[fcM]&&(a["view-params"].profileId="VIEWER");this.skin&&fcCb(a["view-params"].skin,this.skin);a["view-params"].menuName=this[fcM];a["view-params"].opaque="true";a["view-params"].menuPosition=this.bar.gc;fcl(a,"1px");fcpc&&fcqc&&fc4&&(this.id=fc4.render(a))}};fcU("google.friendconnect.FriendBar",fc2);var fctc="0123456789abcdefghijklmnopqrstuv",fcvc=function(a){a=new fcuc(a);if(a.qa()%5)throw fcb();for(var b=[],c=0;0<a.qa();c++)b[c]=fctc[fcw](a.ec(5));return b[fcP]("")},fcuc=function(a){this.F=this.o=0;this.ca=a};fcuc[fc].qa=function(){return 8*(this.ca[fco]-this.F)-this.o};
fcuc[fc].ec=function(a){var b=0;if(a>this.qa())throw fcb();if(0<this.o){var b=255>>this.o&this.ca[this.F],c=8-this.o,d=fci.min(a%8,c),c=c-d,b=b>>c;a-=d;this.o+=d;8==this.o&&(this.o=0,this.F++)}for(;8<=a;)b<<=8,b|=this.ca[this.F],this.F++,a-=8;0<a&&(b<<=a,b|=this.ca[this.F]>>8-a,this.o=a);return b};var fcwc=(new Date).getTime(),fc5=function(){},fcxc=function(){},fcyc=function(){},fczc=function(){};fcV(fczc,fcyc);var fcAc=function(a){if(a)for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);if(this.viewParams)for(var c in this.viewParams)/^FC_RELOAD_.*$/[fcia](c)&&(this.viewParams[c]=null)};fcAc[fc].render=function(a){var b=this;a&&(b.Gc(),this.Db(function(c){fcWb(a,"visibility","hidden");fck(a,c);b.refresh(a,c);c=function(a){fcWb(a,"visibility","visible")};c=fcHa(c,a);fcba(c,500);b.chrome=a}))};
fcAc[fc].Db=function(a){return this.Jb(a)};var fc6=function(a){fcAc[fcC](this,a);this.U="../../";this.rpcToken=fce(fci[fcq](2147483647*fci[fcoa]()))};fcV(fc6,fcAc);fc6[fc].lb="gfc_iframe_";fc6[fc].mb="friendconnect";fc6[fc].Ka="";fc6[fc].tc="rpc_relay.html";fc6[fc].X=function(a){this.U=a};fc6[fc].Gc=function(){return this.Ka=fce(fci[fcq](2147483647*fci[fcoa]()))};fc6[fc].ga=function(){return this.lb+this.Ka+"_"+this.id};
fc6[fc].refresh=function(a,b){var c=fc4.Lc,d,e={},f=fc4.La(this.communityId),k=f[fcu]("~"),l=fc4.vb;if(l&&1<k[fco]){d=k[2];var k=k[1],m=[this.specUrl,this.communityId,k,l][fcP](":");e.sig=fc4.hash(d,m);e.userId=k;e.dateStamp=l}e.container=this.mb;e.mid=this.id;e.nocache=fc4.fc;e.view=this.$;e.parent=fc4.S;this.debug&&(e.debug="1");this.specUrl&&(e.url=this.specUrl);this.communityId&&(l=fca[fcK][fcy]().profileId,e.communityId=this.communityId,(d=fca[fcK][fcy]().psinvite)&&(e.psinvite=d),l&&(e.profileId=
l));e.caller=fcBc();e.rpctoken=this.rpcToken;l=!1;d="";k=/Version\/3\..*Safari/;if((k=fc4a&&fc_a()[fcD](k))||!fc4.R[this.specUrl]&&this.viewParams)e["view-params"]=fca[fcG][fcha](this.viewParams),d="?viewParams="+fcd(e["view-params"]),l=!0;this.prefs&&(e.prefs=fca[fcG][fcha](this.prefs));this.viewParams&&this.sendViewParamsToServer&&(e["view-params"]=fca[fcG][fcha](this.viewParams));this.locale&&(e.locale=this.locale);this.secureToken&&(e.st=this.secureToken);k=fc4.Qa(this.specUrl);d=k+"ifr"+d+(this.hashData?
"&"+this.hashData:"");1!=fc4.Kc||l||f||this.secureToken?f&&!e.sig&&(e.fcauth=f):e.sig||(c="get");f=this.ga();fcCc(f,d,c,e,a,b,this.rpcToken)};var fc7=function(){this.k={};this.S="http://"+fcg[fcx].host;this.$="default";this.fc=1;this.Pc=0;this.Mc="US";this.Nc="en";this.Oc=2147483647};fcV(fc7,fcxc);fc7[fc].v=fcAc;fc7[fc].A=new fczc;fc7[fc].eb=function(a){this.fc=a};fc7[fc].Ia=function(a){this.Kc=a};fc7[fc].Pa=function(a){return"gadget_"+a};fc7[fc].w=function(a){return this.k[this.Pa(a)]};
fc7[fc].L=function(a){return new this.v(a)};fc7[fc].ob=function(a){a.id=this.Kb();this.k[this.Pa(a.id)]=a};fc7[fc].dc=0;fc7[fc].Kb=function(){return this.dc++};var fcEc=function(){fc7[fcC](this);this.A=new fcDc};fcV(fcEc,fc7);fcEc[fc].v=fc6;fcEc[fc].W=function(a){a[fcD](/^http[s]?:\/\//)||(a=fcg[fcx][fcpa][fcD](/^[^?#]+\//)[0]+a);this.S=a};fcEc[fc].H=function(a){var b=this.A.Oa(a);a.render(b)};var fcDc=function(){this.zb={}};fcV(fcDc,fcyc);
fcDc[fc].pb=function(a,b){this.zb[a]=b;var c=fcg[fcv](b).className;c||0!=c[fco]||fcea(fcg[fcv](b),"gadgets-gadget-container")};fcDc[fc].Oa=function(a){return(a=this.zb[a.id])?fcg[fcv](a):null};var fc8=function(a){fc6[fcC](this,a);a=a||{};this.$=a.view||"profile"};fcV(fc8,fc6);fc8[fc].rb="canvas.html";fc8[fc].xb="/friendconnect/embed/";
var fcBc=function(){var a="1"==fca[fcK][fcy]().canvas||"1"==fca[fcK][fcy]().embed,b=null;a&&(b=fca[fcK][fcy]().caller);b||(a=fcg[fcx],b=a.search[fcs](/([&?]?)psinvite=[^&]*(&?)/,function(a,b,e){return e?b:""}),b=a.protocol+"//"+a.hostname+(a.port?":"+a.port:"")+a.pathname+b);return b};fc8[fc].Cc=function(a){this.$=a};fc8[fc].la=function(){return this.$};fc8[fc].getBodyId=function(){return this.ga()+"_body"};
fc8[fc].Jb=function(a){var b=this.specUrl;void 0===b&&(b="");var b=(fc4.Qa(b)||this.U)+this.tc,c=this.ga();fca.rpc.setRelayUrl(c,b);b='<div id="'+this.getBodyId()+'"><iframe id="'+c+'" name="'+c;b=0==this[fcN]?b+'" style="width:1px; height:1px;':b+'" style="width:100%;';this.viewParams.opaque&&(b+="background-color:white;");b+='"';b+=' frameborder="0" scrolling="no"';this.viewParams.opaque||(b+=' allowtransparency="true"');b+=this[fcN]?' height="'+this[fcN]+'"':"";b+=this[fcp]?' width="'+this[fcp]+
'"':"";b+="></iframe>";this.showEmbedThis&&(b+='<a href="javascript:void(0);" onclick="google.friendconnect.container.showEmbedDialog(\''+this.divId+"'); return false;\">Embed this</a>");b+="</div>";a(b)};
fc8[fc].Cb=function(){var a=fcBc(),a="canvas=1&caller="+fcd(a),b=fca[fcK][fcy]().psinvite;b&&(a+="&psinvite="+fcd(b));a+="&site="+fcd(this.communityId);b=fcS(this.viewParams);if(null!=b.skin)for(var c="BG_IMAGE BG_COLOR FONT_COLOR BG_POSITION BG_REPEAT ANCHOR_COLOR FONT_FACE BORDER_COLOR CONTENT_BG_COLOR CONTENT_HEADLINE_COLOR CONTENT_LINK_COLOR CONTENT_SECONDARY_TEXT_COLOR CONTENT_SECONDARY_LINK_COLOR CONTENT_TEXT_COLOR ENDCAP_BG_COLOR ENDCAP_LINK_COLOR ENDCAP_TEXT_COLOR CONTENT_VISITED_LINK_COLOR ALTERNATE_BG_COLOR".split(" "),d=
0;d<c[fco];d++)delete b.skin[c[d]];b=fcd(fca[fcG][fcha](b));b=b[fcs]("\\","%5C");return fc4.S+this.rb+"?url="+fcd(this.specUrl)+(a?"&"+a:"")+"&view-params="+b};fc8[fc].C=function(a){a=a||fcc+this.xb+this.communityId;return this.Eb(a,"embed=1")};fc8[fc].B=function(a){return'<iframe src="'+this.C(a)+'" style="height:500px" scrolling="no" allowtransparency="true" border="0" frameborder="0" ></iframe>'};
fc8[fc].Eb=function(a,b){var c=fcd(fca[fcG][fcha](this.viewParams)),c=c[fcs]("\\","%5C");return a+"?url="+fcd(this.specUrl)+(b?"&"+b:"")+"&view-params="+c};fc8[fc].Nb=function(){var a="1"==fca[fcK][fcy]().canvas||"1"==fca[fcK][fcy]().embed,b=null;a&&((b=fca[fcK][fcy]().caller)||(b="javascript:history.go(-1)"));return b};fc8[fc].Ob=function(a){var b=null;"canvas"==a?b=this.Cb():"profile"==a&&(b=this.Nb());return b};
var fc9=function(){fcEc[fcC](this);fca.rpc[fcO]("signin",fc5[fc].signin);fca.rpc[fcO]("signout",fc5[fc].signout);fca.rpc[fcO]("resize_iframe",fc5[fc].db);fca.rpc[fcO]("set_title",fc5[fc].setTitle);fca.rpc[fcO]("requestNavigateTo",fc5[fc].bb);fca.rpc[fcO]("api_loaded",fc5[fc].ya);fca.rpc[fcO]("createFriendBarMenu",fc5[fc].Ea);fca.rpc[fcO]("showFriendBarMenu",fc5[fc].gb);fca.rpc[fcO]("hideFriendBarMenu",fc5[fc].Ta);fca.rpc[fcO]("putReloadViewParam",fc5[fc].Ya);fca.rpc[fcO]("getViewParams",fc5[fc].Ha);
fca.rpc[fcO]("getContainerBaseTime",fc5[fc].Ga);fca.rpc[fcO]("openLightboxIframe",fc5[fc].Xa);fca.rpc[fcO]("showMemberProfile",fc5[fc].ib);fca.rpc[fcO]("closeLightboxIframe",fcT(this.t,this));fca.rpc[fcO]("setLightboxIframeTitle",fcT(this.yc,this));fca.rpc[fcO]("refreshAndCloseIframeLightbox",fcT(this.hc,this));var a=fcFc;a[fcO]();a.jb(this,"load",this.Qb);a.jb(this,"start",this.Rb);this.U="../../";this.W("");this.eb(0);this.Ia(1);this.pa=null;this.apiVersion="0.8";this.openSocialSecurityToken=null;
this.V="";this.Fa={};this.Yb=null;this.Xb=!1;this.vb=this.ac=this.lastIframeLightboxOpenArguments=this.lastLightboxCallback=this.lastLightboxDialog=null;this.Lc="post"};fcV(fc9,fcEc);fc9[fc].wc=function(a){this.vb=a};fc9[fc].v=fc8;fc9[fc].R={};fc9[fc].Ac=function(a){this.pa=a};fc9[fc].Qa=function(a){var b=fc9[fc].R[a];b||(0!==this.pa[fcz]("https://")?(a=this.tb(a),b=["https://",a,this.pa][fcP]("")):b=this.pa);return b};
fc9[fc].tb=function(a){var b=new fcY;a=fcnb(a);b.update(a);b=b.digest();return b=fcvc(b)};
var fcGc=function(a,b){var c=b?b:fcf.top,d=c.frames;try{if(c.frameElement.id==a)return c}catch(e){}for(c=0;c<d[fco];++c){var f=fcGc(a,d[c]);if(f)return f}return null},fcCc=function(a,b,c,d,e,f,k){var l="gfc_load_"+a;b='<html><head><style type="text/css">body {background:transparent;}</style>'+(fcW?'<script type="text/javascript">window.goback=function(){history.go(-1);};setTimeout("goback();", 0);\x3c/script>':"")+"</head><body><form onsubmit='window.goback=function(){};return false;' style='margin:0;padding:0;' id='"+
l+"' method='"+c+"' ' action='"+fca[fcK].escapeString(b)+"'>";for(var m in d)b+="<input type='hidden' name='"+m+"' value='' >";b+="</form></body></html>";c=fcGc(a);var n;try{n=c[fct]||c.contentWindow[fct]}catch(g){e&&f&&(fck(e,""),fck(e,f),c=fcGc(a),n=c[fct]||c.contentWindow[fct])}k&&fca.rpc.setAuthToken(a,k);n.open();n.write(b);n.close();a=n[fcv](l);for(m in d)a[m].value=d[m];if(fcW)a.onsubmit();a.submit()};
fc9[fc].yb=function(){var a=fca[fcK][fcy]().fcsite,b=fca[fcK][fcy]().fcprofile;a&&b&&fc4.xa(b,a)};fc9[fc].xc=function(a,b){this.R[a]=b};fc9[fc].T=function(){var a=/Version\/3\..*Safari/;if(a=fc4a&&fc_a()[fcD](a))fcg[fcx].reload();else{null!=fc4.g&&fc4.g.refresh();for(var b in fc4.k)a=fc4.k[b],this.H(a);null!=this.lastIframeLightboxOpenArguments&&(b=this.lastIframeLightboxOpenArguments,this.t(),this.ra[fcL](this,b))}};
fc9[fc].W=function(a){a[fcD](/^http[s]?:\/\//)||(a=a&&0<a[fco]&&"/"==a[fcqa](0,1)?fcg[fcx][fcpa][fcD](/^http[s]?:\/\/[^\/]+\//)[0]+a[fcqa](1):fcg[fcx][fcpa][fcD](/^[^?#]+\//)[0]+a);this.S=a};fc9[fc].ea=function(a){return"fcauth"+a};fc9[fc].ka=function(a){return"fcauth"+a+"-s"};fc9[fc].hash=function(a,b){var c=new fcY,d=fcub(a,!0),c=new fcX(c,d,64),d=fcnb(b),c=c.Ib(d);(new Date).getTime();return fctb(c,!0)};fc9[fc].La=function(a){return a=fcxb.get(this.ea(a))||fcxb.get(this.ka(a))||this.Fa[a]||""};
fc9[fc].X=function(a){this.U=a};fc9[fc].Bc=function(a){this.V=a};fc9[fc].L=function(a){a=new this.v(a);a.X(this.U);return a};fc9[fc].la=function(){return this.$};fc9[fc].zc=function(a){this.ac=a};var fc$=function(a){return(a=a[fcD](/_([0-9]+)$/))?fcaa(a[1],10):null};
fc9[fc].Y=function(a,b,c,d,e,f){this.Jc||(this.aa(fcf.friendconnect_serverBase+"/friendconnect/styles/container.css?d="+this.V),this.Jc=!0);var k=fcHc(d);this.Yb!=(k?"rtl":"ltr")&&(this.aa(fcf.friendconnect_serverBase+"/friendconnect/styles/lightbox"+(k?"-rtl":"")+".css?d="+this.V),this.Yb=k?"rtl":"ltr");this.Xb||(this.qb(fcf.friendconnect_serverBase+"/friendconnect/script/lightbox.js?d="+this.V),this.Xb=!0);b=b||0;if(goog.ui&&goog.ui[fcla]){this.t();b=new goog.ui[fcla]("lightbox-dialog",!0);var l=
this;goog.events.listen(b,goog.ui[fcla].EventType.AFTER_HIDE,function(){l.lastLightboxCallback&&l.lastLightboxCallback();l.Da()});b.setDraggable(!0);b.setDisposeOnHide(!0);b.setBackgroundElementOpacity(0.5);b.setButtonSet(new goog.ui[fcla].ButtonSet);this.lastLightboxDialog=b;this.lastLightboxCallback=c||null;c=b.getDialogElement();e=e||702;fcWb(c,"width",fce(e)+"px");f&&fcWb(c,"height",fce(f)+"px");a(b);b.getDialogElement()[fcA].direction=k?"rtl":"ltr"}else if(5>b)b++,a=fcT(this.Y,this,a,b,c,d,e,
f),fcba(a,1E3);else throw this.Da(),fcb("lightbox.js failed to load");};fc9[fc].t=function(a){var b=this.lastLightboxDialog,c=this.lastLightboxCallback;this.lastLightboxCallback=null;null!=b&&(this.lastLightboxDialog.dispatchEvent(goog.ui[fcla].EventType.AFTER_HIDE),b.dispose(),null!=c&&c(a))};fc9[fc].Da=function(){this.lastIframeLightboxOpenArguments=this.lastLightboxCallback=this.lastLightboxDialog=null};fc9[fc].yc=function(a){this.lastLightboxDialog&&this.lastLightboxDialog.setTitle(a)};
fc9[fc].hc=function(){this.t();this.T()};fc5[fc].bb=function(a,b){var c=fc$(this.f),c=fc4.w(c),d=fcS(c.originalParams);b&&(d["view-params"]=d["view-params"]||{},d["view-params"]=b);d.locale=c.locale;if(c.useLightBoxForCanvas)d.presentation=a,null!=fc4.lastLightboxDialog?fc4.t():fc4.hb(d);else if((c=c.Ob(a))&&fcg[fcx][fcpa]!=c)if("1"==fca[fcK][fcy]().embed)try{fcf.parent.location=c}catch(e){fcf.top.location=c}else fcg[fcx].href=c};
fc9[fc].hb=function(a,b){a=a||{};var c=a.locale,d=fcHc(c),e=this;this.t();this.Y(function(b){var c=fc0("div",{},fc0("div",{id:"gadget-signin",style:"background-color:#ffffff;height:32px;"}),fc0("div",{id:"gadget-lb-canvas",style:"background-color:#ffffff;"}));b.getTitleTextElement()[fcm](fc0("div",{id:"gfc-canvas-title",style:"color:#000000;"}));b[fcra]()[fcm](c);b.setVisible(!0);var c=fcS(a),l=fcOb(fcf),m=fci[fcq](0.7*l[fcN]),l={BORDER_COLOR:"#cccccc",ENDCAP_BG_COLOR:"#e0ecff",ENDCAP_TEXT_COLOR:"#333333",
ENDCAP_LINK_COLOR:"#0000cc",ALTERNATE_BG_COLOR:"#ffffff",CONTENT_BG_COLOR:"#ffffff",CONTENT_LINK_COLOR:"#0000cc",CONTENT_TEXT_COLOR:"#333333",CONTENT_SECONDARY_LINK_COLOR:"#7777cc",CONTENT_SECONDARY_TEXT_COLOR:"#666666",CONTENT_HEADLINE_COLOR:"#333333"};c.id="gadget-lb-canvas";fcl(c,fci.min(498,m)+"px");c.maxHeight=m;c.keepMax&&(fcl(c,m),fcWb(b[fcra](),"height",m+35+"px"));c["view-params"]=c["view-params"]||{};c["view-params"].opaque=!0;c["view-params"].skin=c["view-params"].skin||{};fcIa(c["view-params"].skin,
l);e.render(c);m={id:"gadget-signin",presentation:"canvas"};m.site=c.site;m.titleDivId="gfc-canvas-title";m["view-params"]={};m["view-params"].opaque=!0;m.keepMax=c.keepMax;c.securityToken&&(m.securityToken=c.securityToken);c=fcS(l);c.ALIGNMENT=d?"left":"right";e.$a(m,c);b.reposition()},void 0,b,c)};fc5[fc].gb=function(a,b){null!=fc4.g&&fc4.g.Ec(a,b)};fc5[fc].Ta=function(a){null!=fc4.g&&fc4.g.ma(a)};
fc5[fc].Xa=function(a,b,c,d,e,f,k,l,m,n){var g=this.f;a=a+(0<=a[fcz]("?")?"&":"?")+"iframeId="+g;fc4.ra(a,b,c,d,e,f,k,l,m,n,this.callback)};
fc9[fc].ra=function(a,b,c,d,e,f,k,l,m,n,g){var h=fcOb(fcf);null==d&&(d=fci[fcq](0.7*h[fcN]));null==c&&(c=fci[fcq](0.7*h[fcp]));for(var p=[],h=0;h<arguments[fco]&&10>h;h++)p[fcn](arguments[h]);if("/"==!a[0])throw fcb("lightbox iframes must be relative to fc server");var s=this,q=f?fcS(f):{},t=fce(fci[fcq](2147483647*fci[fcoa]())),r="gfc_lbox_iframe_"+t;fca.rpc.setAuthToken(r,t);b||(b=fc4.openSocialSecurityToken);var u=fc4.openSocialSiteId;fc4.Y(function(c){s.lastIframeLightboxOpenArguments=p;var f=
"st="+fcd(b)+"&parent="+fcd(fc4.S)+"&rpctoken="+fcd(t);l||(q.iframeId=r,q.iurl=a,a=fcc+"/friendconnect/lightbox");var g=d-54;fcl(q,g);var h='<iframe id="'+r,h=h+('" width="100%" height="'+g+'" frameborder="0" scrolling="auto"></iframe>');c.setContent(h);e&&(c.setTitle(e),n&&(g=c.getTitleTextElement(),fcHb(g,"lightbox-dialog-title-small-text")));c.setVisible(!0);m||(q.fcauth=fc4.La(u));a+=(0<=a[fcz]("?")?"&":"?")+f+"&communityId="+u;fcCc(r,a,"POST",q,null,null,null)},void 0,g,void 0,c,d)};
fc5[fc].Ha=function(){var a=fc$(this.f),a=fc4.w(a);return a.viewParams};fc5[fc].Ga=function(){return fcwc};fc5[fc].Ya=function(a,b){var c=fc$(this.f),c=fc4.w(c);c.viewParams[a]=b};fc9[fc].Qb=function(a,b){null!=fc4.g&&fc4.g.bc(b)};fc9[fc].Rb=function(a,b){null!=fc4.g&&fc4.g.cc(b)};fc5[fc].Ea=function(a,b,c,d){null!=fc4.g&&fc4.g.ub(a,b,c,d)};fc9[fc].H=function(a){var b=this.A.Oa(a);a.render(b);this.A.postProcessGadget&&this.A.postProcessGadget(a)};
fc5[fc].signout=function(a){fc4.Za(fc4.ea(a));fc4.Za(fc4.ka(a));fc4.Fa={};fc4.T();return!1};fc9[fc].Za=function(a){for(var b=fcg[fcx].pathname,b=b[fcu]("/"),c=0;c<b[fco];c++){for(var d=fch(c+1),e=0;e<c+1;e++)d[e]=b[e];fcxb.remove(a,d[fcP]("/")+"/")}};
fc5[fc].db=function(a){var b=fcg[fcv](this.f);b&&0<a&&fcl(b[fcA],a+"px");(b=fcg[fcv](this.f+"_body"))&&0<a&&fcl(b[fcA],a+"px");if(b=fc$(this.f)){var c=fc4.w(b);c&&((b=fcg[fcv](c.divId))&&0<a&&(c&&c[fcsa]&&c[fcsa]<a&&(a=c[fcsa],b[fcA].overflowY="auto"),fcl(b[fcA],a+"px")),!c.keepMax&&"canvas"==c.la()&&fc4.lastLightboxDialog&&fc4.lastLightboxDialog.reposition(),fcWb(c.chrome,"visibility","visible"))}};fc5[fc].setTitle=function(a){var b=fc$(this.f),b=fc4.w(b);(b=b.titleDivId)&&fck(fcg[fcv](b),fca[fcK].escapeString(a))};
fc5[fc].signin=function(a,b,c){fcxb.set(fc4.ea(a),b,31104E3,c);fcxb.set(fc4.ka(a),b,-1,c);fc4.Fa[a]=b;fc4.T()};var fcJc=function(a){fclc(a,fcIc)};fc9[fc].nc=function(a,b){b&&this.m(b,a);var c={};c.url=fcc+"/friendconnect/gadgets/members.xml";this.render(this.r(a,c))};fc9[fc].pc=function(a,b){b&&this.m(b,a);var c={};c.url=fcc+"/friendconnect/gadgets/review.xml";c["view-params"]={startMaximized:"true",disableMinMax:"true",features:"review"};this.render(this.r(a,c))};
fc9[fc].ta=function(a,b){b&&this.m(b,a);var c={};c.url=fcc+"/friendconnect/gadgets/wall.xml";c["view-params"]={startMaximized:"true",disableMinMax:"true",features:"comment"};this.render(this.r(a,c))};fc9[fc].$a=function(a,b){b&&this.m(b,a);var c={};c.url=fcc+"/friendconnect/gadgets/signin.xml";fcl(c,32);this.render(this.r(a,c))};
fc9[fc].kc=function(a,b){b&&this.m(b,a);a.prefs=a.prefs||{};a.sendViewParamsToServer=!0;a.prefs.hints=fcf.google_hints;var c={};c.url=fcc+"/friendconnect/gadgets/ads.xml";fcl(c,90);this.render(this.r(a,c))};fc9[fc].wa=function(a,b){if(a.id){b&&this.m(b,a);a["view-params"]=a["view-params"]||{};a["view-params"].opaque="true";this.g=new fc2(a);this.g.render();var c={};c.url=fcc+"/friendconnect/gadgets/friendbar.xml";a.id=this.g.s;fcl(a,"1");this.render(this.r(a,c))}};fc9[fc].mc=fc9[fc].wa;
fc9[fc].va=function(a,b){a=a||{};a.url=fcc+"/friendconnect/gadgets/signin.xml";a.site=a.site||fca[fcK][fcy]().site;fcl(a,32);this.ua(a,b)};fc9[fc].lc=fc9[fc].va;fc9[fc].rc=fc9[fc].ta;fc9[fc].m=function(a,b){var c=b["view-params"];c||(c={},b["view-params"]=c);c.skin=a};fc9[fc].r=function(a,b){var c=this.Wa(b,a);if(b["view-params"]){var d=b["view-params"];a["view-params"]&&(d=this.Wa(d,a["view-params"]));c["view-params"]=d}return c};fc9[fc].oc=function(a,b){b&&this.m(b,a);this.render(a)};
fc9[fc].Wa=function(a,b){var c={},d;for(d in b)c[d]=b[d];for(d in a)"undefined"==typeof c[d]&&(c[d]=a[d]);return c};
fc9[fc].render=function(a){this.openSocialSiteId=a.site;a["view-params"]=a["view-params"]||{};var b=this.L({divId:a.id,specUrl:a.url,communityId:a.site,height:a[fcN],locale:a.locale||this.ac,secureToken:a.securityToken,titleDivId:a.titleDivId,showEmbedThis:a.showEmbedThis,useLightBoxForCanvas:a.useLightBoxForCanvas||"undefined"==typeof a.useLightBoxForCanvas&&fcf.friendconnect_lightbox,viewParams:a["view-params"],prefs:a.prefs,originalParams:a,debug:a.debug,maxHeight:a[fcsa],sendViewParamsToServer:a.sendViewParamsToServer,
keepMax:a.keepMax});a.presentation&&b.Cc(a.presentation);this.ob(b);this.A.pb(b.id,a.id);fcba(function(){fc4.H(b)},0);return b.id};fc9[fc].qc=function(a,b){a=a||{};a.presentation="canvas";this.ab(a,b)};
fc9[fc].ab=function(a,b,c){a=a||{};a.url=fca[fcK][fcy]().url;a.site=fca[fcK][fcy]().site||a.site;var d=fca[fcK][fcy]()["view-params"];d&&(a["view-params"]=fca[fcG].parse(decodeURIComponent(d)));c&&(a["view-params"]=a["view-params"]||{},a["view-params"].useFixedHeight=!0,fcl(a["view-params"],c),b=b||{},b.HEIGHT=fce(c));this.ua(a,b)};fc9[fc].ua=function(a,b){a=a||{};b&&this.m(b,a);"1"==fca[fcK][fcy]().canvas?a.presentation="canvas":"1"==fca[fcK][fcy]().embed&&(a.presentation="embed");fc4.render(a)};
fc9[fc].Pb=function(){var a=fca[fcK][fcy]().caller;a&&fcg[fcx][fcpa]!=a&&8<a[fco]&&("http://"==a.substr(0,7)[fcya]()||"https://"==a.substr(0,8)[fcya]())?fcg[fcx].href=a:(a=fca[fcK][fcy]().site)?fcg[fcx].href=fcc+"/friendconnect/directory/site?id="+a:fcf.history.go(-1)};fc9[fc].G="";fc9[fc].Lb=function(){return this.G};fc9[fc].uc=function(a){this.apiVersion=a};fc9[fc].aa=function(a){var b=fcg[fcF]("link");b[fcJ]("rel","stylesheet");b[fcJ]("type","text/css");b[fcJ]("href",a);fcg.getElementsByTagName("head")[0][fcm](b)};
fc9[fc].qb=function(a){var b=fcg[fcF]("script");b[fcJ]("src",a);b[fcJ]("type","text/javascript");fcg.getElementsByTagName("head")[0][fcm](b)};fc9[fc].Ca=function(a){fcg[fcB]?a():fcf[fcI]?fcf[fcI]("load",a,!1):fcf.attachEvent("onload",a)};fc9[fc].na=function(a){if(!a.site)throw"API not loaded, please pass in a 'site'";this.aa(fcf.friendconnect_serverBase+"/friendconnect/styles/container.css?d="+this.V);this.openSocialSiteId=a.site;this.apiLoadedCallback=a.onload;this.Ca(fcT(this.Va,this,a,"fc-opensocial-api"))};
fc9[fc].$b=fc9[fc].na;fc9[fc].Tb=function(a){var b={};b.site=this.openSocialSiteId;b["view-params"]={txnId:a};this.Va(b,"gfc-"+a)};fc9[fc].jc=function(a){var b={},c;for(c in this.k){var d=this.k[c];if(d.viewParams&&d.viewParams.txnId==a)break;else b[c]=d}this.k=b;(a=fcg[fcv]("gfc-"+a))&&a.parentNode&&a.parentNode.removeChild&&a.parentNode.removeChild(a)};fc9[fc].Fb=function(){return"<Templates xmlns:fc='http://www.google.com/friendconnect/makeThisReal'>  <Namespace prefix='fc' url='http://www.google.com/friendconnect/makeThisReal'/>  <Template tag='fc:signIn'>    <div onAttach='google.friendconnect.renderSignInButton({element: this})'></div>  </Template></Templates>"};
fc9[fc].Mb=function(){return"<Templates xmlns:os='http://ns.opensocial.org/2008/markup'><Namespace prefix='os' url='http://ns.opensocial.org/2008/markup'/><Template tag='os:Name'>  <span if='${!My.person.profileUrl}'>${My.person.displayName}</span>  <a if='${My.person.profileUrl}' href='${My.person.profileUrl}'>      ${My.person.displayName}</a></Template><Template tag='os:Badge'>  <div><img if='${My.person.thumbnailUrl}' src='${My.person.thumbnailUrl}'/>   <os:Name person='${My.person}'/></div></Template><Template tag='os:PeopleSelector'>  <select onchange='google.friendconnect.PeopleSelectorOnChange(this)' name='${My.inputName}'          multiple='${My.multiple}' x-var='${My.var}' x-max='${My.max}'          x-onselect='${My.onselect}'>    <option repeat='${My.group}' value='${Cur.id}' selected='${Cur.id == My.selected}'>        ${Cur.displayName}    </option>  </select></Template></Templates>"};
var fcKc=function(a){var b;if(a.multiple){b=[];for(var c=0;c<a[fcE][fco];c++)a[fcE][c].selected&&b[fcn](a[fcE][c].value);c=a.getAttribute("x-max");try{c*=1}catch(d){c=0}if(c&&b[fco]>c&&a["x-selected"])for(b=a["x-selected"],c=0;c<a[fcE][fco];c++){a[fcE][c].selected=!1;for(var e=0;e<b[fco];e++)if(a[fcE][c].value==b[e]){a[fcE][c].selected=!0;break}}}else b=a[fcE][a.selectedIndex].value;a["x-selected"]=b;(c=a.getAttribute("x-var"))&&fcf.opensocial[fcka]&&fcf.opensocial[fcka].getDataContext().putDataSet(c,
b);if(c=a.getAttribute("x-onselect"))if(fcf[c]&&"function"==typeof fcf[c])fcf[c](b);else a["x-onselect-fn"]?a["x-onselect-fn"][fcL](a):a["x-onselect-fn"]=new Function(c)};
fc9[fc].Va=function(a,b){fcf.opensocial.template.Loader.loadContent(this.Mb());fcf.opensocial.template.Loader.loadContent(this.Fb());fcf.opensocial[fcka].processDocumentMarkup();var c=fcg[fcF]("div");c.id=b;fcl(c[fcA],"0px");fcj(c[fcA],"0px");c[fcA].position="absolute";c[fcA].visibility="hidden";fcg[fcB][fcm](c);var d={};d.url=fcc+"/friendconnect/gadgets/osapi-"+this.apiVersion+".xml";fcl(d,0);d.id=c.id;d.site=a.site;d["view-params"]=a["view-params"];this.render(d)};
fc5[fc].ya=function(){fc4.G=this.f;fc4.openSocialSecurityToken=this.a[0];var a=fc4.openSocialSecurityToken;fcf.opensocial[fcka].executeRequests();fcf.opensocial.template.process();fc4.apiLoadedCallback&&(a=fcHa(fc4.apiLoadedCallback,a),fcba(a,0))};fc9[fc].O=function(a){var b=null,c;for(c in this.k)if(this.k[c].divId==a){b=this.k[c];break}return b};fc9[fc].C=function(a,b){var c=this.O(a),d=null;c&&(d=c.C(b));return d};fc9[fc].B=function(a,b){var c=this.O(a),d=null;c&&(d=c.B(b));return d};
fc9[fc].Dc=function(a,b){this.Y(function(c){var d=fcg.createTextNode("Copy & paste this code into your site.");c[fcra]()[fcm](d);c[fcra]()[fcm](fcg[fcF]("br"));var d=fc4.B(a,b),e=fcg[fcF]("textarea");fck(e,d);e[fcJ]("style","width:500px;");c[fcra]()[fcm](e);c.setVisible(!0)})};var fcLc="ar dv fa iw he ku pa sd tk ug ur yi".split(" "),fcHc=function(a){var b=!1;a?(a=a[fcu]("_")[0],b=fckb(fcLc,a)):b=(a=fcYb(fcg[fcB],"direction"))&&"rtl"==a;return b};
fc5[fc].ib=function(a,b){var c=0,d=null;try{var e=fc$(this.f),f=fc4.w(e),d=f.secureToken,c=f.communityId}catch(k){}b&&(c=b);fc4.xa(a,c,this.callback,d)};fc9[fc].xa=function(a,b,c,d){b=b||this.openSocialSiteId;a={keepMax:!0,presentation:"canvas",url:fcc+"/friendconnect/gadgets/members.xml",site:b,"view-params":{profileId:a}};d&&(a.securityToken=d);this.hb(a,c)};fc9[fc].Hb=function(a){var b=null;(a=this.O(a))&&a.secureToken&&(b=a.secureToken);return b};
fc9[fc].Gb=function(a){var b=null;(a=this.O(a))&&a.communityId&&(b=a.communityId);return b};var fcIc=function(a){fc4.G&&fcfc(fc4.G,a)},fcMc=function(){fc5[fc].signout(fc4.openSocialSiteId)},fcNc=function(){fcic(fc4.G)},fcOc=function(a,b){fccc(a,b)},fcrc=function(){this.p={}};fcrc[fc].register=function(){fca.rpc[fcO]("subscribeEventType",fc5[fc].subscribe);fca.rpc[fcO]("publishEvent",fc5[fc].publish)};fc5[fc].subscribe=function(a){var b=fcFc;b.p[a]=b.p[a]||[];a=b.p[a];a[a[fco]]={frameId:this}};
fcrc[fc].jb=function(a,b,c){var d=this;d.p[b]=d.p[b]||[];b=d.p[b];b[b[fco]]={container:a,callback:c}};fc5[fc].publish=function(a){var b=fcFc,c=0;this.f&&(c=fc$(this.f));b.p[a]=b.p[a]||[];for(var b=b.p[a],d=0;d<b[fco];d++)b[d].container?b[d].callback[fcC](b[d].container,a,c):fca.rpc[fcC](b[d].frameId,a,null,a,c)};var fcsc=fcT(fc5[fc].publish,new fc5),fcFc=new fcrc,fc4=new fc9;fc4.Ca(fc4.yb);fcU("google.friendconnect.container",fc4);fcU("google.friendconnect.container.refreshGadgets",fc4.T);
fcU("google.friendconnect.container.setParentUrl",fc4.W);fcU("google.friendconnect.container.setServerBase",fc4.X);fcU("google.friendconnect.container.setServerVersion",fc4.Bc);fcU("google.friendconnect.container.createGadget",fc4.L);fcU("google.friendconnect.container.openLightboxIframe",fc4.ra);fcU("google.friendconnect.container.renderGadget",fc4.H);fcU("google.friendconnect.container.render",fc4.render);fcU("google.friendconnect.container.goBackToSite",fc4.Pb);
fcU("google.friendconnect.container.renderMembersGadget",fc4.nc);fcU("google.friendconnect.container.renderReviewGadget",fc4.pc);fcU("google.friendconnect.container.renderCommentsGadget",fc4.ta);fcU("google.friendconnect.container.renderSignInGadget",fc4.$a);fcU("google.friendconnect.container.renderFriendBar",fc4.mc);fcU("google.friendconnect.container.renderSocialBar",fc4.wa);fcU("google.friendconnect.container.renderCanvasSignInGadget",fc4.lc);
fcU("google.friendconnect.container.renderUrlCanvasGadget",fc4.qc);fcU("google.friendconnect.container.renderEmbedSignInGadget",fc4.va);fcU("google.friendconnect.container.renderUrlEmbedGadget",fc4.ab);fcU("google.friendconnect.container.renderEmbedGadget",fc4.ua);fcU("google.friendconnect.container.renderWallGadget",fc4.rc);fcU("google.friendconnect.container.renderAdsGadget",fc4.kc);fcU("google.friendconnect.container.renderOpenSocialGadget",fc4.oc);
fcU("google.friendconnect.container.setNoCache",fc4.eb);fcU("google.friendconnect.container.enableProxy",fc4.Ia);fcU("google.friendconnect.container.setDomain",fc4.xc);fcU("google.friendconnect.container.setLockedDomainSuffix",fc4.Ac);fcU("google.friendconnect.container.setLocale",fc4.zc);fcU("google.friendconnect.container.loadOpenSocialApi",fc4.$b);fcU("google.friendconnect.container.initOpenSocialApi",fc4.na);fcU("google.friendconnect.container.getOpenSocialApiIframeId",fc4.Lb);
fcU("google.friendconnect.container.setApiVersion",fc4.uc);fcU("google.friendconnect.container.getEmbedUrl",fc4.C);fcU("google.friendconnect.container.getEmbedHtml",fc4.B);fcU("google.friendconnect.container.getGadgetSecurityToken",fc4.Hb);fcU("google.friendconnect.container.getGadgetCommunityId",fc4.Gb);fcU("google.friendconnect.container.showEmbedDialog",fc4.Dc);fcU("google.friendconnect.container.showMemberProfile",fc4.xa);fcU("google.friendconnect.requestSignIn",fcIc);
fcU("google.friendconnect.requestSignOut",fcMc);fcU("google.friendconnect.requestSettings",fcNc);fcU("google.friendconnect.requestInvite",fcOc);fcU("google.friendconnect.renderSignInButton",fcJc);fcU("google.friendconnect.container.invokeOpenSocialApiViaIframe",fc4.Tb);fcU("google.friendconnect.container.removeOpenSocialApiViaIframe",fc4.jc);fcU("google.friendconnect.userAgent.WEBKIT",fc4a);fcU("google.friendconnect.userAgent.IE",fcW);fcU("google.friendconnect.PeopleSelectorOnChange",fcKc);
fcU("google.friendconnect.container.setDateStamp_",fc4.wc);
google.friendconnect.container.setServerBase('http://www-a-fc-opensocial.googleusercontent.com/ps/');google.friendconnect.container.setServerVersion('0.1-e2827b02_8a025607_217d4300_43d914a9_668b6b35.7');google.friendconnect.container.setApiVersion('0.8');
google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/activities.xml', 'https://umvqpbsra7b9da3v73i9b1f1h35v9875-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/ads.xml', 'https://j6lffavqsi2m3kfqc547r54q1roai14a-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/ask.xml', 'https://c5n5mdkbldclvs9c4cmka1i473qj7347-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/friendbar.xml', 'https://tc1gsfg1bpg3dh74e58frg31jhrlijmb-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/content_reveal.xml', 'https://vpkdf3e9ad3mo1u6rf6q8mkvlfh4nhb8-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/chat.xml', 'https://ensh8e52b69562jd5dd9d9fej214p35j-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/donate.xml', 'https://gdp3j78c303214vet22si9nv69isi5so-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/lamegame.xml', 'https://6odruuecb3fkc62vkrn46k05ar324r65-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/map.xml', 'https://42v8m9qahgskau24qus2aa8llgtoj86r-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/members.xml', 'https://4t4qjto8n6vcba9cabf6v2lrng9ast6r-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/newsletterSubscribe.xml', 'https://grcrlo3milo17raaukkj6qnod5edu0v0-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/poll.xml', 'https://0a3ga3vn4gfsdhlqn7pruh1qtq66jpl4-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/recommended_pages.xml', 'https://9pn9h0ef3oqan95jq679oms4lbrhvqkf-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/review.xml', 'https://bvb14dk05gfgdvof7iqdkoufuclkqhg6-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/sample.xml', 'https://kl1m4ltugaae61po1k12eouge39oohh6-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/signin.xml', 'https://9fruo8jik01ke9p21si44s2pu0vt6kk4-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/wall.xml', 'https://fp8527dih8ahqgno54vjfjeju73lvgf4-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setDomain('https://www.google.com/friendconnect/gadgets/osapi-0.8.xml', 'https://3lijfq2nn4jrph2q8dn9vdup48cr0vv5-a-fc-opensocial.googleusercontent.com/ps/');

google.friendconnect.container.setLockedDomainSuffix('-a-fc-opensocial.googleusercontent.com/ps/');
window['__ps_loaded__'] = true; 
 }google.friendconnect_ = google.friendconnect;
google.friendconnect.container.setDateStamp_('14342e5e0f5');