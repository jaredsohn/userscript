// ==UserScript==
// @name  friendconnect wob
// @include 
// @description  facebook

// @version 1


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
var friendconnect_serverVersion = "0.1-266dbfbb_aa05e697_6c47871f_7ed7fb11_c185aed1.7";
var friendconnect_imageUrl = "https://www.google.com/friendconnect/scs/images";
var friendconnect_lightbox = true;
var fca=gadgets,fcb=encodeURIComponent,fcc=window,fcaa=Object,fcd=friendconnect_serverBase,fcba=setTimeout,fce=document,fcf=Array,fcg=Math,fch=Error,fcca=parseInt,fci=String;function fcj(a,b){return a.width=b}function fck(a,b){return a.innerHTML=b}function fcda(a,b){return a.length=b}function fcea(a,b){return a.className=b}function fcl(a,b){return a.height=b}
var fcm="appendChild",fcn="push",fcfa="stringify",fcga="test",fcha="shift",fco="width",fcp="round",fcq="slice",fcr="replace",fcia="data",fcs="getElementById",fct="charAt",fcu="indexOf",fcja="left",fcv="match",fcw="createElement",fcx="addEventListener",fcy="setAttribute",fcka="locale",fcla="type",fcma="auth",fcna="getSecurityToken",fcoa="bind",fcz="name",fcA="register",fcpa="toString",fcB="length",fcqa="propertyIsEnumerable",fc="prototype",fcC="document",fcD="split",fcE="location",fcF="getUrlParameters",
fcra="Dialog",fcG="style",fcH="body",fcI="call",fcJ="options",fcsa="lastIndexOf",fcK="json",fcta="charCodeAt",fcua="href",fcva="substring",fcwa="getContentElement",fcL="util",fcxa="maxHeight",fcM="apply",fcya="reset",fcN="update",fcO="height",fcP="join",fcza="toLowerCase",fcAa="right",goog=goog||{},fcQ=this,fcBa=function(a,b,c){a=a[fcD](".");c=c||fcQ;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a[fcB]&&(d=a[fcha]());)a[fcB]||void 0===b?c=c[d]?c[d]:c[d]={}:c[d]=b},fcCa=function(a){var b=
typeof a;if("object"==b)if(a){if(a instanceof fcf)return"array";if(a instanceof fcaa)return b;var c=fcaa[fc][fcpa][fcI](a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a[fcB]&&"undefined"!=typeof a.splice&&"undefined"!=typeof a[fcqa]&&!a[fcqa]("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a[fcI]&&"undefined"!=typeof a[fcqa]&&!a[fcqa]("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a[fcI])return"object";
return b},fcDa=function(a){return void 0!==a},fcEa=function(a){var b=fcCa(a);return"array"==b||"object"==b&&"number"==typeof a[fcB]},fcR=function(a){return"string"==typeof a},fcFa=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},fcS=function(a){var b=fcCa(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=fcS(a[c]);return b}return a},fcGa=function(a,b,c){return a[fcI][fcM](a[fcoa],arguments)},fcHa=function(a,b,c){if(!a)throw fch();
if(2<arguments[fcB]){var d=fcf[fc][fcq][fcI](arguments,2);return function(){var c=fcf[fc][fcq][fcI](arguments);fcf[fc].unshift[fcM](c,d);return a[fcM](b,c)}}return function(){return a[fcM](b,arguments)}},fcT=function(a,b,c){fcT=Function[fc][fcoa]&&-1!=Function[fc][fcoa][fcpa]()[fcu]("native code")?fcGa:fcHa;return fcT[fcM](null,arguments)},fcIa=function(a,b){var c=fcf[fc][fcq][fcI](arguments,1);return function(){var b=c[fcq]();b[fcn][fcM](b,arguments);return a[fcM](this,b)}},fcJa=function(a,b){for(var c in b)a[c]=
b[c]},fcKa=Date.now||function(){return+new Date},fcU=function(a,b,c){fcBa(a,b,c)},fcV=function(a,b){function c(){}c.prototype=b[fc];a.Rc=b[fc];a.prototype=new c;a[fc].constructor=a;a.base=function(a,c,f){var k=fcf[fc][fcq][fcI](arguments,2);return b[fc][c][fcM](a,k)}};Function[fc].bind=Function[fc][fcoa]||function(a,b){if(1<arguments[fcB]){var c=fcf[fc][fcq][fcI](arguments,1);c.unshift(this,a);return fcT[fcM](null,c)}return fcT(this,a)};var fcLa=function(a,b){for(var c=a[fcD]("%s"),d="",e=fcf[fc][fcq][fcI](arguments,1);e[fcB]&&1<c[fcB];)d+=c[fcha]()+e[fcha]();return d+c[fcP]("%s")},fcMa=function(a,b){var c=fci(a)[fcza](),d=fci(b)[fcza]();return c<d?-1:c==d?0:1},fcTa=function(a,b){if(b)return a[fcr](fcNa,"&amp;")[fcr](fcOa,"&lt;")[fcr](fcPa,"&gt;")[fcr](fcQa,"&quot;")[fcr](fcRa,"&#39;");if(!fcSa[fcga](a))return a;-1!=a[fcu]("&")&&(a=a[fcr](fcNa,"&amp;"));-1!=a[fcu]("<")&&(a=a[fcr](fcOa,"&lt;"));-1!=a[fcu](">")&&(a=a[fcr](fcPa,"&gt;"));
-1!=a[fcu]('"')&&(a=a[fcr](fcQa,"&quot;"));-1!=a[fcu]("'")&&(a=a[fcr](fcRa,"&#39;"));return a},fcNa=/&/g,fcOa=/</g,fcPa=/>/g,fcQa=/"/g,fcRa=/'/g,fcSa=/[&<>"']/,fcVa=function(a,b){for(var c=0,d=fci(a)[fcr](/^[\s\xa0]+|[\s\xa0]+$/g,"")[fcD]("."),e=fci(b)[fcr](/^[\s\xa0]+|[\s\xa0]+$/g,"")[fcD]("."),f=fcg.max(d[fcB],e[fcB]),k=0;0==c&&k<f;k++){var l=d[k]||"",m=e[k]||"",n=RegExp("(\\d*)(\\D*)","g"),g=RegExp("(\\d*)(\\D*)","g");do{var h=n.exec(l)||["","",""],p=g.exec(m)||["","",""];if(0==h[0][fcB]&&0==p[0][fcB])break;
var c=0==h[1][fcB]?0:fcca(h[1],10),s=0==p[1][fcB]?0:fcca(p[1],10),c=fcUa(c,s)||fcUa(0==h[2][fcB],0==p[2][fcB])||fcUa(h[2],p[2])}while(0==c)}return c},fcUa=function(a,b){return a<b?-1:a>b?1:0},fcWa=function(a){return fci(a)[fcr](/\-([a-z])/g,function(a,c){return c.toUpperCase()})},fcXa=function(a,b){var c=fcR(b)?fci(b)[fcr](/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1")[fcr](/\x08/g,"\\x08"):"\\s",c=c?"|["+c+"]+":"",c=RegExp("(^"+c+")([a-z])","g");return a[fcr](c,function(a,b,c){return b+c.toUpperCase()})};var fcYa,fcZa,fc_a,fc0a,fc1a=function(){return fcQ.navigator?fcQ.navigator.userAgent:null},fc2a=function(){fc0a=fc_a=fcZa=fcYa=!1;var a;if(a=fc1a()){var b=fcQ.navigator;fcYa=0==a[fcsa]("Opera",0);fcZa=!fcYa&&(-1!=a[fcu]("MSIE")||-1!=a[fcu]("Trident"));fc_a=!fcYa&&-1!=a[fcu]("WebKit");fc0a=!fcYa&&!fc_a&&!fcZa&&"Gecko"==b.product}};fc2a();
var fc3a=fcYa,fcW=fcZa,fc4a=fc0a,fc5a=fc_a,fc7a=function(){var a="",b;fc3a&&fcQ.opera?(a=fcQ.opera.version,a="function"==typeof a?a():a):(fc4a?b=/rv\:([^\);]+)(\)|;)/:fcW?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:fc5a&&(b=/WebKit\/(\S+)/),b&&(a=(a=b.exec(fc1a()))?a[1]:""));return fcW&&(b=fc6a(),b>parseFloat(a))?fci(b):a},fc6a=function(){var a=fcQ[fcC];return a?a.documentMode:void 0},fc8a=fc7a(),fc9a={},fc$a=function(a){return fc9a[a]||(fc9a[a]=0<=fcVa(fc8a,a))},fcab=function(){var a=fcQ[fcC];if(a&&fcW){var b=
fc6a();return b||("CSS1Compat"==a.compatMode?fcca(fc8a,10):5)}}();var fcbb=function(a){if(fch.captureStackTrace)fch.captureStackTrace(this,fcbb);else{var b=fch().stack;b&&(this.stack=b)}a&&(this.message=fci(a))};fcV(fcbb,fch);fcbb[fc].name="CustomError";var fccb=function(a,b){b.unshift(a);fcbb[fcI](this,fcLa[fcM](null,b));b[fcha]();this.messagePattern=a};fcV(fccb,fcbb);fccb[fc].name="AssertionError";var fcdb=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new fccb(""+e,f||[]);},fceb=function(a,b,c){a||fcdb("",null,b,fcf[fc][fcq][fcI](arguments,2));return a};var fcfb=fcf[fc],fcgb=fcfb[fcu]?function(a,b,c){fceb(null!=a[fcB]);return fcfb[fcu][fcI](a,b,c)}:function(a,b,c){c=null==c?0:0>c?fcg.max(0,a[fcB]+c):c;if(fcR(a))return fcR(b)&&1==b[fcB]?a[fcu](b,c):-1;for(;c<a[fcB];c++)if(c in a&&a[c]===b)return c;return-1},fchb=fcfb.forEach?function(a,b,c){fceb(null!=a[fcB]);fcfb.forEach[fcI](a,b,c)}:function(a,b,c){for(var d=a[fcB],e=fcR(a)?a[fcD](""):a,f=0;f<d;f++)f in e&&b[fcI](c,e[f],f,a)},fcib=function(a,b){return 0<=fcgb(a,b)},fcjb=function(a){var b=a[fcB];
if(0<b){for(var c=fcf(b),d=0;d<b;d++)c[d]=a[d];return c}return[]},fckb=function(a,b,c){fceb(null!=a[fcB]);return 2>=arguments[fcB]?fcfb[fcq][fcI](a,b):fcfb[fcq][fcI](a,b,c)};var fclb=function(a){for(var b=[],c=0,d=0;d<a[fcB];d++){for(var e=a[fcta](d);255<e;)b[c++]=e&255,e>>=8;b[c++]=e}return b};var fcmb=null,fcnb=null,fcob=null,fcpb=null,fcrb=function(a,b){if(!fcEa(a))throw fch("encodeByteArray takes an array as a parameter");fcqb();for(var c=b?fcob:fcmb,d=[],e=0;e<a[fcB];e+=3){var f=a[e],k=e+1<a[fcB],l=k?a[e+1]:0,m=e+2<a[fcB],n=m?a[e+2]:0,g=f>>2,f=(f&3)<<4|l>>4,l=(l&15)<<2|n>>6,n=n&63;m||(n=64,k||(l=64));d[fcn](c[g],c[f],c[l],c[n])}return d[fcP]("")},fcsb=function(a,b){fcqb();for(var c=b?fcpb:fcnb,d=[],e=0;e<a[fcB];){var f=c[a[fct](e++)],k=e<a[fcB],k=k?c[a[fct](e)]:0;++e;var l=e<a[fcB],
l=l?c[a[fct](e)]:0;++e;var m=e<a[fcB],m=m?c[a[fct](e)]:0;++e;if(null==f||null==k||null==l||null==m)throw fch();f=f<<2|k>>4;d[fcn](f);64!=l&&(f=k<<4&240|l>>2,d[fcn](f),64!=m&&(f=l<<6&192|m,d[fcn](f)))}return d},fcqb=function(){if(!fcmb){fcmb={};fcnb={};fcob={};fcpb={};for(var a=0;65>a;a++)fcmb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[fct](a),fcnb[fcmb[a]]=a,fcob[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_."[fct](a),fcpb[fcob[a]]=a}};var fctb=function(){this.blockSize=-1};var fcX=function(a,b,c){fctb[fcI](this);this.i=a;this.blockSize=c||a.blockSize||16;this.Xb=fcf(this.blockSize);this.Va=fcf(this.blockSize);this.Tb(b)};fcV(fcX,fctb);fcX[fc].Tb=function(a){a[fcB]>this.blockSize&&(this.i[fcN](a),a=this.i.digest());for(var b,c=0;c<this.blockSize;c++)b=c<a[fcB]?a[c]:0,this.Xb[c]=b^92,this.Va[c]=b^54;this.i[fcN](this.Va)};fcX[fc].reset=function(){this.i[fcya]();this.i[fcN](this.Va)};fcX[fc].update=function(a,b){this.i[fcN](a,b)};
fcX[fc].digest=function(){var a=this.i.digest();this.i[fcya]();this.i[fcN](this.Xb);this.i[fcN](a);return this.i.digest()};fcX[fc].Jb=function(a){this[fcya]();this[fcN](a);return this.digest()};var fcY=function(){fctb[fcI](this);this.blockSize=64;this.c=[];this.Ca=[];this.Ic=[];this.sa=[];this.sa[0]=128;for(var a=1;a<this.blockSize;++a)this.sa[a]=0;this.ya=this.G=0;this[fcya]()};fcV(fcY,fctb);fcY[fc].reset=function(){this.c[0]=1732584193;this.c[1]=4023233417;this.c[2]=2562383102;this.c[3]=271733878;this.c[4]=3285377520;this.ya=this.G=0};
fcY[fc].L=function(a,b){b||(b=0);var c=this.Ic;if(fcR(a))for(var d=0;16>d;d++)c[d]=a[fcta](b)<<24|a[fcta](b+1)<<16|a[fcta](b+2)<<8|a[fcta](b+3),b+=4;else for(d=0;16>d;d++)c[d]=a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3],b+=4;for(d=16;80>d;d++){var e=c[d-3]^c[d-8]^c[d-14]^c[d-16];c[d]=(e<<1|e>>>31)&4294967295}for(var f=this.c[0],k=this.c[1],l=this.c[2],m=this.c[3],n=this.c[4],g,d=0;80>d;d++)40>d?20>d?(e=m^k&(l^m),g=1518500249):(e=k^l^m,g=1859775393):60>d?(e=k&l|m&(k|l),g=2400959708):(e=k^l^m,g=3395469782),
e=(f<<5|f>>>27)+e+n+g+c[d]&4294967295,n=m,m=l,l=(k<<30|k>>>2)&4294967295,k=f,f=e;this.c[0]=this.c[0]+f&4294967295;this.c[1]=this.c[1]+k&4294967295;this.c[2]=this.c[2]+l&4294967295;this.c[3]=this.c[3]+m&4294967295;this.c[4]=this.c[4]+n&4294967295};
fcY[fc].update=function(a,b){fcDa(b)||(b=a[fcB]);for(var c=b-this.blockSize,d=0,e=this.Ca,f=this.G;d<b;){if(0==f)for(;d<=c;)this.L(a,d),d+=this.blockSize;if(fcR(a))for(;d<b;){if(e[f]=a[fcta](d),++f,++d,f==this.blockSize){this.L(e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.blockSize){this.L(e);f=0;break}}this.G=f;this.ya+=b};
fcY[fc].digest=function(){var a=[],b=8*this.ya;56>this.G?this[fcN](this.sa,56-this.G):this[fcN](this.sa,this.blockSize-(this.G-56));for(var c=this.blockSize-1;56<=c;c--)this.Ca[c]=b&255,b/=256;this.L(this.Ca);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.c[c]>>d&255,++b;return a};var fcZ=function(a){this.xb=a},fcub=/\s*;\s*/;fcZ[fc].isEnabled=function(){return navigator.cookieEnabled};fcZ[fc].Vb=function(a){return!/[;=\s]/[fcga](a)};fcZ[fc].Wb=function(a){return!/[;\r\n]/[fcga](a)};
fcZ[fc].set=function(a,b,c,d,e,f){if(!this.Vb(a))throw fch('Invalid cookie name "'+a+'"');if(!this.Wb(b))throw fch('Invalid cookie value "'+b+'"');fcDa(c)||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";f=f?";secure":"";0>c?c="":(c=0==c?new Date(1970,1,1):new Date(fcKa()+1E3*c),c=";expires="+c.toUTCString());this.wc(a+"="+b+e+d+c+f)};fcZ[fc].get=function(a,b){for(var c=a+"=",d=this.ja(),e=0,f;f=d[e];e++){if(0==f[fcsa](c,0))return f.substr(c[fcB]);if(f==a)return""}return b};
fcZ[fc].remove=function(a,b,c){var d=this.M(a);this.set(a,"",0,b,c);return d};fcZ[fc].A=function(){return this.ha().keys};fcZ[fc].F=function(){return this.ha().values};fcZ[fc].P=function(){var a=this.Na();return a?this.ja()[fcB]:0};fcZ[fc].M=function(a){return fcDa(this.get(a))};fcZ[fc].clear=function(){for(var a=this.ha().keys,b=a[fcB]-1;0<=b;b--)this.remove(a[b])};fcZ[fc].wc=function(a){this.xb.cookie=a};fcZ[fc].Na=function(){return this.xb.cookie};fcZ[fc].ja=function(){return(this.Na()||"")[fcD](fcub)};
fcZ[fc].ha=function(){for(var a=this.ja(),b=[],c=[],d,e,f=0;e=a[f];f++)d=e[fcu]("="),-1==d?(b[fcn](""),c[fcn](e)):(b[fcn](e[fcva](0,d)),c[fcn](e[fcva](d+1)));return{keys:b,values:c}};var fcvb=new fcZ(fce);fcvb.MAX_COOKIE_LENGTH=3950;var fc_=function(a,b){fcj(this,a);fcl(this,b)};fc_[fc].clone=function(){return new fc_(this[fco],this[fcO])};fc_[fc].toString=function(){return"("+this[fco]+" x "+this[fcO]+")"};fc_[fc].ceil=function(){fcj(this,fcg.ceil(this[fco]));fcl(this,fcg.ceil(this[fcO]));return this};fc_[fc].floor=function(){fcj(this,fcg.floor(this[fco]));fcl(this,fcg.floor(this[fcO]));return this};fc_[fc].round=function(){fcj(this,fcg[fcp](this[fco]));fcl(this,fcg[fcp](this[fcO]));return this};
fc_[fc].scale=function(a,b){var c="number"==typeof b?b:a;fcj(this,this[fco]*a);fcl(this,this[fcO]*c);return this};var fcwb=function(a,b,c){for(var d in a)b[fcI](c,a[d],d,a)},fcxb=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},fcyb=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},fczb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),fcAb=function(a,b){for(var c,d,e=1;e<arguments[fcB];e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<fczb[fcB];f++)c=fczb[f],fcaa[fc].hasOwnProperty[fcI](d,c)&&(a[c]=d[c])}};var fcBb=!fcW||fcW&&9<=fcab;!fc4a&&!fcW||fcW&&fcW&&9<=fcab||fc4a&&fc$a("1.9.1");fcW&&fc$a("9");var fcCb=function(a,b){fcea(a,b)},fcDb=function(a){a=a.className;return fcR(a)&&a[fcv](/\S+/g)||[]},fcFb=function(a,b){var c=fcDb(a),d=fckb(arguments,1),e=c[fcB]+d[fcB];fcEb(c,d);fcCb(a,c[fcP](" "));return c[fcB]==e},fcEb=function(a,b){for(var c=0;c<b[fcB];c++)fcib(a,b[c])||a[fcn](b[c])};var fcGb=function(a){return fcR(a)?fce[fcs](a):a},fcHb=fcGb,fcIb=function(a,b,c,d){a=d||a;b=b&&"*"!=b?b.toUpperCase():"";if(a.querySelectorAll&&a.querySelector&&(b||c))return c=b+(c?"."+c:""),a.querySelectorAll(c);if(c&&a.getElementsByClassName){a=a.getElementsByClassName(c);if(b){d={};for(var e=0,f=0,k;k=a[f];f++)b==k.nodeName&&(d[e++]=k);fcda(d,e);return d}return a}a=a.getElementsByTagName(b||"*");if(c){d={};for(f=e=0;k=a[f];f++)b=k.className,"function"==typeof b[fcD]&&fcib(b[fcD](/\s+/),c)&&(d[e++]=
k);fcda(d,e);return d}return a},fcKb=function(a,b){fcwb(b,function(b,d){"style"==d?a[fcG].cssText=b:"class"==d?fcea(a,b):"for"==d?a.htmlFor=b:d in fcJb?a[fcy](fcJb[d],b):0==d[fcsa]("aria-",0)||0==d[fcsa]("data-",0)?a[fcy](d,b):a[d]=b})},fcJb={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"},fcLb=function(a){a=a[fcC];a="CSS1Compat"==
a.compatMode?a.documentElement:a[fcH];return new fc_(a.clientWidth,a.clientHeight)},fc0=function(a,b,c){return fcMb(fce,arguments)},fcMb=function(a,b){var c=b[0],d=b[1];if(!fcBb&&d&&(d[fcz]||d[fcla])){c=["<",c];d[fcz]&&c[fcn](' name="',fcTa(d[fcz]),'"');if(d[fcla]){c[fcn](' type="',fcTa(d[fcla]),'"');var e={};fcAb(e,d);delete e[fcla];d=e}c[fcn](">");c=c[fcP]("")}c=a[fcw](c);d&&(fcR(d)?fcea(c,d):"array"==fcCa(d)?fcFb[fcM](null,[c].concat(d)):fcKb(c,d));2<b[fcB]&&fcNb(a,c,b,2);return c},fcNb=function(a,
b,c,d){function e(c){c&&b[fcm](fcR(c)?a.createTextNode(c):c)}for(;d<c[fcB];d++){var f=c[d];!fcEa(f)||fcFa(f)&&0<f.nodeType?e(f):fchb(fcOb(f)?fcjb(f):f,e)}},fcOb=function(a){if(a&&"number"==typeof a[fcB]){if(fcFa(a))return"function"==typeof a.item||"string"==typeof a.item;if("function"==fcCa(a))return"function"==typeof a.item}return!1};var fcPb="StopIteration"in fcQ?fcQ.StopIteration:fch("StopIteration"),fcQb=function(){};fcQb[fc].next=function(){throw fcPb;};fcQb[fc].__iterator__=function(){return this};var fc1=function(a,b){this.j={};this.e=[];this.$=this.u=0;var c=arguments[fcB];if(1<c){if(c%2)throw fch("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.ob(a)};fc1[fc].P=function(){return this.u};fc1[fc].F=function(){this.K();for(var a=[],b=0;b<this.e[fcB];b++){var c=this.e[b];a[fcn](this.j[c])}return a};fc1[fc].A=function(){this.K();return this.e.concat()};fc1[fc].M=function(a){return fcRb(this.j,a)};
fc1[fc].clear=function(){this.j={};fcda(this.e,0);this.$=this.u=0};fc1[fc].remove=function(a){return fcRb(this.j,a)?(delete this.j[a],this.u--,this.$++,this.e[fcB]>2*this.u&&this.K(),!0):!1};fc1[fc].K=function(){if(this.u!=this.e[fcB]){for(var a=0,b=0;a<this.e[fcB];){var c=this.e[a];fcRb(this.j,c)&&(this.e[b++]=c);a++}fcda(this.e,b)}if(this.u!=this.e[fcB]){for(var d={},b=a=0;a<this.e[fcB];)c=this.e[a],fcRb(d,c)||(this.e[b++]=c,d[c]=1),a++;fcda(this.e,b)}};
fc1[fc].get=function(a,b){return fcRb(this.j,a)?this.j[a]:b};fc1[fc].set=function(a,b){fcRb(this.j,a)||(this.u++,this.e[fcn](a),this.$++);this.j[a]=b};fc1[fc].ob=function(a){var b;a instanceof fc1?(b=a.A(),a=a.F()):(b=fcyb(a),a=fcxb(a));for(var c=0;c<b[fcB];c++)this.set(b[c],a[c])};fc1[fc].clone=function(){return new fc1(this)};
fc1[fc].__iterator__=function(a){this.K();var b=0,c=this.e,d=this.j,e=this.$,f=this,k=new fcQb;k.next=function(){for(;;){if(e!=f.$)throw fch("The map has changed since the iterator was created");if(b>=c[fcB])throw fcPb;var k=c[b++];return a?k:d[k]}};return k};var fcRb=function(a,b){return fcaa[fc].hasOwnProperty[fcI](a,b)};var fcTb=function(a,b,c){fcR(b)?fcSb(a,c,b):fcwb(b,fcIa(fcSb,a))},fcSb=function(a,b,c){(c=fcUb(a,c))&&(a[fcG][c]=b)},fcUb=function(a,b){var c=fcWa(b);if(void 0===a[fcG][c]){var d=(fc5a?"Webkit":fc4a?"Moz":fcW?"ms":fc3a?"O":null)+fcXa(b);if(void 0!==a[fcG][d])return d}return c},fcVb=function(a,b){var c=9==a.nodeType?a:a.ownerDocument||a[fcC];return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""},fcWb=function(a,b){return fcVb(a,
b)||(a.currentStyle?a.currentStyle[b]:null)||a[fcG]&&a[fcG][b]},fcXb=function(a){var b;try{b=a.getBoundingClientRect()}catch(c){return{left:0,top:0,right:0,bottom:0}}fcW&&a.ownerDocument[fcH]&&(a=a.ownerDocument,b.left=b[fcja]-(a.documentElement.clientLeft+a[fcH].clientLeft),b.top-=a.documentElement.clientTop+a[fcH].clientTop);return b},fc_b=function(a,b,c){if(b instanceof fc_)c=b[fcO],b=b[fco];else if(void 0==c)throw fch("missing height argument");fcYb(a,b);fcZb(a,c)},fc0b=function(a,b){"number"==
typeof a&&(a=(b?fcg[fcp](a):a)+"px");return a},fcZb=function(a,b){fcl(a[fcG],fc0b(b,!0))},fcYb=function(a,b){fcj(a[fcG],fc0b(b,!0))},fc1b=function(a,b){if("none"!=fcWb(b,"display"))return a(b);var c=b[fcG],d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";var k=a(b);c.display=d;c.position=f;c.visibility=e;return k},fc2b=function(a){var b=a.offsetWidth,c=a.offsetHeight,d=fc5a&&!b&&!c;return fcDa(b)&&!d||!a.getBoundingClientRect?new fc_(b,c):(a=fcXb(a),
new fc_(a[fcAa]-a[fcja],a.bottom-a.top))},fc3b=function(a,b){a[fcG].display=b?"":"none"};var fc4b={},fc5b={};var fc6b=function(a,b,c,d){b=b||"800";c=c||"550";d=d||"friendconnect";a=fcc.open(a,d,"menubar=no,toolbar=no,dialog=yes,location=yes,alwaysRaised=yes,width="+b+",height="+c+",resizable=yes,scrollbars=1,status=1");fcc.focus&&a&&a.focus()},fc7b=function(a,b){var c=fca[fcL][fcF]().communityId;fca.rpc[fcI](null,"signin",null,c,a,b)};fcU("goog.peoplesense.util.openPopup",fc6b);fcU("goog.peoplesense.util.finishSignIn",fc7b);var fc$b=function(a,b){var c=fc8b()+"/friendconnect/invite/friends",d=fcb(shindig[fcma][fcna]());fc9b(c,d,a,b)},fc9b=function(a,b,c,d){a+="?st="+b;c&&(a+="&customMessage="+fcb(c));d&&(a+="&customInviteUrl="+fcb(d));b=760;fcW&&(b+=25);fc6b(a,fci(b),"515","friendconnect_invite")};fcU("goog.peoplesense.util.invite",fc$b);fcU("goog.peoplesense.util.inviteFriends",fc9b);var fcac=function(a){this.url=a};fcac[fc].l=function(a,b){if(0<=this.url[fcu]("?"+a+"=")||0<=this.url[fcu]("&"+a+"="))throw fch("duplicate: "+a);if(null===b||void 0===b)return this;var c=0<=this.url[fcu]("?")?"&":"?";this.url+=c+a+"="+fcb(fci(b));return this};fcac[fc].toString=function(){return this.url};var fc8b=function(){return fcc.friendconnect_serverBase},fcbc=function(a,b,c,d,e,f,k){b=b||"800";c=c||"550";d=d||"friendconnect";f=f||!1;fca.rpc[fcI](null,"openLightboxIframe",k,a,shindig[fcma][fcna](),b,c,d,e,null,null,null,f)},fccc=function(a,b){var c=fca[fcL][fcF]().psinvite||"",d=new fcac(fc8b()+"/friendconnect/signin/home");d.l("st",fcc.shindig[fcma][fcna]());d.l("psinvite",c);d.l("iframeId",a);d.l("loginProvider",b);d.l("subscribeOnSignin","1");fc6b(d[fcpa]());return!1},fcdc=function(){var a=
fca[fcL][fcF]().communityId;fca.rpc[fcI](null,"signout",null,a)},fcfc=function(a,b){var c=fc8b()+"/friendconnect/settings/edit?st="+fcb(shindig[fcma][fcna]())+(a?"&iframeId="+fcb(a):"");b&&(c=c+"&"+b);fcec(c)},fcgc=function(a){a=fc8b()+"/friendconnect/settings/siteProfile?st="+fcb(a);fcec(a)},fcec=function(a){var b=800,c=510;fcW&&(b+=25);fc6b(a,fci(b),fci(c))},fchc=function(a,b,c,d){d=d||2;var e=null;if("text"==b)e=fc0("div",{"class":"gfc-button-text"},fc0("div",{"class":"gfc-icon"},fc0("a",{href:"javascript:void(0);"},
c))),a[fcm](e);else if("long"==b||"standard"==b)e=1==d?fc0("div",{"class":"gfc-inline-block gfc-primaryactionbutton gfc-button-base"},fc0("div",{"class":"gfc-inline-block gfc-button-base-outer-box"},fc0("div",{"class":"gfc-inline-block gfc-button-base-inner-box"},fc0("div",{"class":"gfc-button-base-pos"},fc0("div",{"class":"gfc-button-base-top-shadow",innerHTML:"&nbsp;"}),fc0("div",{"class":"gfc-button-base-content"},fc0("div",{"class":"gfc-icon"},c)))))):fc0("table",{"class":"gfc-button-base-v2 gfc-button",
cellpadding:"0",cellspacing:"0"},fc0("tbody",{"class":""},fc0("tr",{"class":""},fc0("td",{"class":"gfc-button-base-v2 gfc-button-1"}),fc0("td",{"class":"gfc-button-base-v2 gfc-button-2"},c),fc0("td",{"class":"gfc-button-base-v2 gfc-button-3"})))),a[fcm](e),"standard"==b&&(b=fc0("div",{"class":"gfc-footer-msg"},"with Google Friend Connect"),1==d&&a[fcm](fc0("br")),a[fcm](b));return e},fcic=function(a,b){if(!a)throw"google.friendconnect.renderSignInButton: missing options";var c=a[fcG]||"standard",
d=a.text,e=a.version;if("standard"==c)d=a.text||"Sign in";else if("text"==c||"long"==c)d=a.text||"Sign in with Friend Connect";var f=a.element;if(!f){f=a.id;if(!f)throw"google.friendconnect.renderSignInButton: options[id] and options[element] == null";f=fcHb(f);if(!f)throw"google.friendconnect.renderSignInButton: element "+a.id+" not found";}fck(f,"");c=fchc(f,c,d,e);fcc[fcx]?c[fcx]("click",b,!1):c.attachEvent("onclick",b)},fcjc=function(a,b){b=b||fcT(fccc,null,null,null,null);fcic(a,b)},fckc=function(a,
b){fca.rpc[fcI](null,"putReloadViewParam",null,a,b);var c=fca.views.getParams();c[a]=b},fclc=function(a,b){var c=new fcac("/friendconnect/gadgetshare/friends");c.l("customMessage",a);c.l("customInviteUrl",b);c.l("container","glb");var d=310;fcW&&(d+=25);fcbc(c[fcpa](),fci(d),"370")};fcU("goog.peoplesense.util.getBaseUrl",fc8b);fcU("goog.peoplesense.util.finishSignIn",fc7b);fcU("goog.peoplesense.util.signout",fcdc);fcU("goog.peoplesense.util.signin",fccc);fcU("goog.peoplesense.util.editSettings",fcfc);
fcU("goog.peoplesense.util.editSSProfile",fcgc);fcU("goog.peoplesense.util.setStickyViewParamToken",fckc);fcU("google.friendconnect.renderSignInButton",fcjc);fcU("goog.peoplesense.util.share",fclc);fcU("goog.peoplesense.util.userAgent.IE",fcW);var google={},fcmc={},fc2=function(a){this.h=new fc1;this.snippetId=a.id;this.site=a.site;a=a["view-params"];var b=a.skin;this.hc=(b?b.POSITION:"top")||"top";this.Jc={allowAnonymousPost:a.allowAnonymousPost||!1,scope:a.scope||"SITE",docId:a.docId||"",features:a.features||"video,comment",startMaximized:"true",disableMinMax:"true",skin:b};this.absoluteBottom=fcW&&!fc$a("7");this.fixedIeSizes=fcW;fcc[fcx]?fcc[fcx]("resize",fcT(this.eb,this),!1):fcc.attachEvent("onresize",fcT(this.eb,this));this.tb()};
fc2[fc].tb=function(){if(!this.site)throw fch("Must supply site ID.");if(!this.snippetId)throw fch("Must supply a snippet ID.");};fc2[fc].b=10;fc2[fc].Ba=1;fc2[fc].q="fc-friendbar-";fc2[fc].s=fc2[fc].q+"outer";fc2[fc].hb=fc2[fc].s+"-shadow";fc2[fc].render=function(){fce.write(this.Bb());var a=fcGb(this.snippetId);fck(a,this.O())};fc2[fc].Cb=function(){var a=fcGb(this.s);return a=fc1b(fc2b,a)[fco]};fc2[fc].eb=function(){for(var a=this.h.A(),b=0;b<a[fcB];b++)this.tc(a[b]);goog&&fc4b&&fc5b&&fcnc&&fcoc("resize")};
fc2[fc].n=function(){return this.hc};fc2[fc].d=function(a){return this.q+"shadow-"+a};fc2[fc].ia=function(a){return this.q+"menus-"+a};fc2[fc].R=function(a){return this.q+a+"Target"};fc2[fc].fa=function(a){return this.q+a+"Drawer"};fc2[fc].Sa=function(){return this.R("")};fc2[fc].Ta=function(){return this.q+"wallpaper"};fc2[fc].Oa=function(){return this.fa("")};
fc2[fc].Bb=function(){var a=fcc.friendconnect_imageUrl+"/",b=a+"shadow_tc.png",c=a+"shadow_bc.png",d=a+"shadow_bl.png",e=a+"shadow_tl.png",f=a+"shadow_tr.png",k=a+"shadow_br.png",a=a+"shadow_cr.png",l=function(a,b){return fcW?'filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+a+'", sizingMethod="scale");':"background-image: url("+a+");background-repeat: "+b+"; "},m="position:absolute; top:";"top"!=this.n()&&(m="position:fixed; bottom:",this.absoluteBottom&&(m="position:absolute; bottom:"));
var n=c;"top"!=this.n()&&(n=b);var g=0,h=[];h[g++]='<style type="text/css">';"top"!=this.n()&&this.absoluteBottom&&(h[g++]="html, body {height: 100%; overflow: auto; };");h[g++]="#"+this.s+" {";h[g++]="background:#E0ECFF;";h[g++]="left:0;";h[g++]="height: "+(fcW?"35px;":"36px;");"top"!=this.n()&&this.absoluteBottom&&(h[g++]="margin-right: 20px;");h[g++]="padding:0;";h[g++]=m+" 0;";h[g++]="width:100%;";h[g++]="z-index:5000;";h[g++]="}";h[g++]="#"+this.hb+" {";h[g++]=l(n,"repeat-x");h[g++]="left:0;";
h[g++]="height:"+this.b+"px;";"top"!=this.n()&&this.absoluteBottom&&(h[g++]="margin-right: 20px;");h[g++]="padding:0;";h[g++]=m+(fcW?"35px;":"36px;");h[g++]="width:100%;";h[g++]="z-index:4998;";h[g++]="}";h[g++]="."+this.Oa()+" {";h[g++]="display: block;";h[g++]="padding:0;";h[g++]=m+(fcW?"34px;":"35px;");h[g++]="z-index:4999;";h[g++]="}";h[g++]="."+this.Ta()+" {";h[g++]="background: white;";h[g++]="height: 100%;";h[g++]="margin-right: "+this.b+"px;";h[g++]="}";h[g++]="."+this.Sa()+" {";h[g++]="border: "+
this.Ba+"px solid #ccc;";h[g++]="height: 100%;";h[g++]="left: 0;";h[g++]="background-image: url("+fcc.friendconnect_imageUrl+"/loading.gif);";h[g++]="background-position: center;";h[g++]="background-repeat: no-repeat;";h[g++]="}";h[g++]="."+this.d("cr")+" {";h[g++]=l(a,"repeat-y");h[g++]="height: 100%;";h[g++]="position:absolute;";h[g++]="right: 0;";h[g++]="top: 0;";h[g++]="width:"+this.b+"px;";h[g++]="}";h[g++]="."+this.d("bl")+" {";h[g++]=l(d,"no-repeat");h[g++]="height: "+this.b+"px;";h[g++]="position:absolute;";
h[g++]="width:"+this.b+"px;";h[g++]="}";h[g++]="."+this.d("tl")+" {";h[g++]=l(e,"no-repeat");h[g++]="height: "+this.b+"px;";h[g++]="position:absolute;";h[g++]="left:0px;";h[g++]="width:"+this.b+"px;";h[g++]="}";h[g++]="."+this.d("bc")+" {";h[g++]=l(c,"repeat-x");h[g++]="height: "+this.b+"px;";h[g++]="left: "+this.b+"px;";h[g++]="position:absolute;";h[g++]="right: "+this.b+"px;";h[g++]="}";h[g++]="."+this.d("tc")+" {";h[g++]=l(b,"repeat-x");h[g++]="height: "+this.b+"px;";h[g++]="left: "+this.b+"px;";
h[g++]="margin-left: "+this.b+"px;";h[g++]="margin-right: "+this.b+"px;";h[g++]="right: "+this.b+"px;";h[g++]="}";h[g++]="."+this.d("br")+" {";h[g++]=l(k,"no-repeat");h[g++]="height: "+this.b+"px;";h[g++]="position:absolute;";h[g++]="right: 0;";h[g++]="width: "+this.b+"px;";h[g++]="}";h[g++]="."+this.d("tr")+" {";h[g++]=l(f,"no-repeat");h[g++]="height: "+this.b+"px;";h[g++]="position:absolute;";h[g++]="right: 0;";h[g++]="top: 0;";h[g++]="width: "+this.b+"px;";h[g++]="}";h[g++]="</style>";return h[fcP]("")};
fc2[fc].O=function(){var a=['<div id="'+this.s+'"></div>','<div id="'+this.hb+'"></div>','<div id="'+this.ia(this.h.P())+'"></div>'];return a[fcP]("")};fc2[fc].vb=function(a,b,c,d){this.h.M(a)||(b=new fc3(this,a,b,c,d),c=this.h.P(),d=fcGb(this.ia(c)),fck(d,b.O()+'<div id="'+this.ia(c+1)+'"></div>'),this.h.set(a,b))};fc2[fc].ma=function(a){(a=this.h.get(a))&&a.drawer&&fc3b(a.drawer,!1)};fc2[fc].jc=function(a){if(a=this.h.get(a))a.rendered=!1};
fc2[fc].refresh=function(){for(var a=this.h.A(),b=0;b<a[fcB];b++){var c=a[b];this.ma(c);this.jc(c)}};fc2[fc].dc=function(a){for(var b=this.h.F(),c=0;c<b[fcB];c++){var d=b[c];if(d.id==a){d.Gc();break}}};fc2[fc].cc=function(a){for(var b=this.h.F(),c=0;c<b[fcB];c++){var d=b[c];if(d.id==a){d.$b();break}}};fc2[fc].tc=function(a){(a=this.h.get(a))&&a.drawer&&a.oa()&&(a.da(),a.Ka(),a.Aa())};
fc2[fc].Fc=function(a,b){var c=this.h.get(a);if(c){c.drawer||(c.drawer=fcGb(this.fa(c[fcz])),c.target=fcGb(this.R(c[fcz])),c.sha_bc=fcIb(fce,"div","top"==this.n()?this.d("bc"):this.d("tc"),c.drawer)[0],c.sha_cr=fcIb(fce,"div",this.d("cr"),c.drawer)[0]);for(var d=this.h.A(),e=0;e<d[fcB];e++){var f=d[e];a!==f&&this.ma(f)}c.da(b);fc3b(c.drawer,!0);fcc.setTimeout(function(){c.Aa();c.Ka();c.render()},0)}};
var fc3=function(a,b,c,d,e){this.id=-1;this.bar=a;this.name=b;this.constraints=d;this.skin=e||{};fcl(this,this.skin.HEIGHT||"0");this.url=fcc.friendconnect_serverBase+c;this.sha_bc=this.target=this.drawer=null;this.loaded=this.rendered=!1;this.da()};
fc3[fc].da=function(a){fcAb(this.constraints,a||{});fcAb(this.skin,this.constraints);if(this.bar.fixedIeSizes&&this.constraints[fcja]&&this.constraints[fcAa]){a=this.bar.Cb();var b=this.constraints[fcja],c=this.constraints[fcAa];a-=b+c;a%2&&(a-=1,this.skin.right=this.skin[fcAa]+1);fcj(this.skin,a);delete this.skin[fcja]}};
fc3[fc].Aa=function(){if(this.drawer){if(this.skin[fco]){var a=this.bar.Ba,b=this.bar.b,c=fcW?2:0;fc_b(this.target,this.skin[fco],"");fc_b(this.sha_bc,this.skin[fco]-b+2*a-c,"");this.skin.rightShadow?fc_b(this.drawer,this.skin[fco]+b+2*a-c,""):fc_b(this.drawer,this.skin[fco]+2*a-c,"")}this.skin[fcAa]&&(this.drawer[fcG].right=this.skin[fcAa]+0+"px")}};
fc3[fc].Ka=function(){if(fcW&&this.drawer){var a=fc1b(fc2b,this.target),b=a[fco]-this.bar.b,a=a[fcO];0>b&&(b=0);this.sha_bc&&this.sha_bc[fcG]&&fc_b(this.sha_bc,b,"");this.sha_cr&&this.sha_cr[fcG]&&fc_b(this.sha_cr,"",a)}};
fc3[fc].O=function(){var a="display:none;",b="position: relative; ",c="",d="",e="",f="",k=!!this.skin.rightShadow;k||(c+="display: none; ",e+="display: none; ",d+="right: 0px; ",f+="margin-right: 0px; ");for(var l in this.skin){var m=Number(this.skin[l]);k&&0==fcMa(l,"width")&&(m+=this.bar.b);0==fcMa(l,"height")&&(b+=l+": "+m+"px; ");"rightShadow"!=l&&(0==fcMa(l,"height")&&(m+=this.bar.b),0==fcMa(l,"width")&&(m+=2),a+=l+": "+m+"px; ");fcW&&0==fcMa(l,"width")&&(m=k?m-2*this.bar.b:m-this.bar.b,d+=l+
": "+m+"px; ")}fcW&&0<(this[fcO]|0)&&(k=(this[fcO]|0)+2,c+="height: "+k+"px; ");k=0;l=[];l[k++]='<div id="'+this.bar.fa(this[fcz])+'"class="'+this.bar.Oa()+'"style="'+a+'"> ';"bottom"==this.bar.n()&&(l[k++]='<div class="'+this.bar.d("tl")+'"></div> <div class="'+this.bar.d("tc")+'"style="'+d+'"></div> <div class="'+this.bar.d("tr")+'"style="'+e+'"></div> ');l[k++]='<div style="'+b+'"> <div class="'+this.bar.Ta()+'"style="'+f+'"><div id="'+this.bar.R(this[fcz])+'"class="'+this.bar.Sa()+'"></div> <div class="'+
this.bar.d("cr")+'"style="'+c+'"></div> </div> </div> ';"top"==this.bar.n()&&(l[k++]='<div class="'+this.bar.d("bl")+'"></div> <div class="'+this.bar.d("bc")+'"style="'+d+'"></div> <div class="'+this.bar.d("br")+'"style="'+e+'"></div> ');l[k++]="</div> ";return l[fcP]("")};fc3[fc].Gc=function(){this.rendered=this.oa()};fc3[fc].$b=function(){this.loaded=this.oa()};fc3[fc].oa=function(){return!!this.drawer&&"none"!=this.drawer[fcG].display};
fc3[fc].render=function(){if(!1==this.rendered){var a={};a.url=this.url;a.id=this.bar.R(this[fcz]);a.site=this.bar.site;a["view-params"]=fcS(this.bar.Jc);"profile"==this[fcz]&&(a["view-params"].profileId="VIEWER");this.skin&&fcAb(a["view-params"].skin,this.skin);a["view-params"].menuName=this[fcz];a["view-params"].opaque="true";a["view-params"].menuPosition=this.bar.hc;fcl(a,"1px");google&&fcmc&&fc4&&(this.id=fc4.render(a))}};fcU("google.friendconnect.FriendBar",fc2);var fcpc="0123456789abcdefghijklmnopqrstuv",fcrc=function(a){a=new fcqc(a);if(a.qa()%5)throw fch();for(var b=[],c=0;0<a.qa();c++)b[c]=fcpc[fct](a.fc(5));return b[fcP]("")},fcqc=function(a){this.H=this.o=0;this.ca=a};fcqc[fc].qa=function(){return 8*(this.ca[fcB]-this.H)-this.o};
fcqc[fc].fc=function(a){var b=0;if(a>this.qa())throw fch();if(0<this.o){var b=255>>this.o&this.ca[this.H],c=8-this.o,d=fcg.min(a%8,c),c=c-d,b=b>>c;a-=d;this.o+=d;8==this.o&&(this.o=0,this.H++)}for(;8<=a;)b<<=8,b|=this.ca[this.H],this.H++,a-=8;0<a&&(b<<=a,b|=this.ca[this.H]>>8-a,this.o=a);return b};var fcsc=(new Date).getTime(),fc5=function(){},fctc=function(){},fcuc=function(){},fcvc=function(){};fcV(fcvc,fcuc);var fcwc=function(a){if(a)for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);if(this.viewParams)for(var c in this.viewParams)/^FC_RELOAD_.*$/[fcga](c)&&(this.viewParams[c]=null)};fcwc[fc].render=function(a){var b=this;a&&(b.Hc(),this.Eb(function(c){fcTb(a,"visibility","hidden");fck(a,c);b.refresh(a,c);c=function(a){fcTb(a,"visibility","visible")};c=fcIa(c,a);fcba(c,500);b.chrome=a}))};
fcwc[fc].Eb=function(a){return this.Kb(a)};var fc6=function(a){fcwc[fcI](this,a);this.V="../../";this.rpcToken=fci(fcg[fcp](2147483647*fcg.random()))};fcV(fc6,fcwc);fc6[fc].mb="gfc_iframe_";fc6[fc].nb="friendconnect";fc6[fc].La="";fc6[fc].uc="rpc_relay.html";fc6[fc].Y=function(a){this.V=a};fc6[fc].Hc=function(){return this.La=fci(fcg[fcp](2147483647*fcg.random()))};fc6[fc].ga=function(){return this.mb+this.La+"_"+this.id};
fc6[fc].refresh=function(a,b){var c=fc4.Mc,d,e={},f=fc4.Ma(this.communityId),k=f[fcD]("~"),l=fc4.wb;if(l&&1<k[fcB]){d=k[2];var k=k[1],m=[this.specUrl,this.communityId,k,l][fcP](":");e.sig=fc4.hash(d,m);e.userId=k;e.dateStamp=l}e.container=this.nb;e.mid=this.id;e.nocache=fc4.gc;e.view=this.aa;e.parent=fc4.T;this.debug&&(e.debug="1");this.specUrl&&(e.url=this.specUrl);this.communityId&&(l=fca[fcL][fcF]().profileId,e.communityId=this.communityId,(d=fca[fcL][fcF]().psinvite)&&(e.psinvite=d),l&&(e.profileId=
l));e.caller=fcxc();e.rpctoken=this.rpcToken;l=!1;d="";k=/Version\/3\..*Safari/;if((k=fc5a&&fc1a()[fcv](k))||!fc4.S[this.specUrl]&&this.viewParams)e["view-params"]=fca[fcK][fcfa](this.viewParams),d="?viewParams="+fcb(e["view-params"]),l=!0;this.prefs&&(e.prefs=fca[fcK][fcfa](this.prefs));this.viewParams&&this.sendViewParamsToServer&&(e["view-params"]=fca[fcK][fcfa](this.viewParams));this[fcka]&&(e.locale=this[fcka]);this.secureToken&&(e.st=this.secureToken);k=fc4.Ra(this.specUrl);d=k+"ifr"+d+(this.hashData?
"&"+this.hashData:"");1!=fc4.Lc||l||f||this.secureToken?f&&!e.sig&&(e.fcauth=f):e.sig||(c="get");f=this.ga();fcyc(f,d,c,e,a,b,this.rpcToken)};var fc7=function(){this.k={};this.T="http://"+fce[fcE].host;this.aa="default";this.gc=1;this.Qc=0;this.Nc="US";this.Oc="en";this.Pc=2147483647};fcV(fc7,fctc);fc7[fc].v=fcwc;fc7[fc].B=new fcvc;fc7[fc].gb=function(a){this.gc=a};fc7[fc].Ja=function(a){this.Lc=a};fc7[fc].Qa=function(a){return"gadget_"+a};fc7[fc].w=function(a){return this.k[this.Qa(a)]};
fc7[fc].N=function(a){return new this.v(a)};fc7[fc].pb=function(a){a.id=this.Lb();this.k[this.Qa(a.id)]=a};fc7[fc].ec=0;fc7[fc].Lb=function(){return this.ec++};var fcAc=function(){fc7[fcI](this);this.B=new fczc};fcV(fcAc,fc7);fcAc[fc].v=fc6;fcAc[fc].X=function(a){a[fcv](/^http[s]?:\/\//)||(a=fce[fcE][fcua][fcv](/^[^?#]+\//)[0]+a);this.T=a};fcAc[fc].J=function(a){var b=this.B.Pa(a);a.render(b)};var fczc=function(){this.Ab={}};fcV(fczc,fcuc);
fczc[fc].qb=function(a,b){this.Ab[a]=b;var c=fce[fcs](b).className;c||0!=c[fcB]||fcea(fce[fcs](b),"gadgets-gadget-container")};fczc[fc].Pa=function(a){return(a=this.Ab[a.id])?fce[fcs](a):null};var fc8=function(a){fc6[fcI](this,a);a=a||{};this.aa=a.view||"profile"};fcV(fc8,fc6);fc8[fc].sb="canvas.html";fc8[fc].yb="/friendconnect/embed/";
var fcxc=function(){var a="1"==fca[fcL][fcF]().canvas||"1"==fca[fcL][fcF]().embed,b=null;a&&(b=fca[fcL][fcF]().caller);b||(a=fce[fcE],b=a.search[fcr](/([&?]?)psinvite=[^&]*(&?)/,function(a,b,e){return e?b:""}),b=a.protocol+"//"+a.hostname+(a.port?":"+a.port:"")+a.pathname+b);return b};fc8[fc].Dc=function(a){this.aa=a};fc8[fc].la=function(){return this.aa};fc8[fc].getBodyId=function(){return this.ga()+"_body"};
fc8[fc].Kb=function(a){var b=this.specUrl;void 0===b&&(b="");var b=(fc4.Ra(b)||this.V)+this.uc,c=this.ga();fca.rpc.setRelayUrl(c,b);b='<div id="'+this.getBodyId()+'"><iframe id="'+c+'" name="'+c;b=0==this[fcO]?b+'" style="width:1px; height:1px;':b+'" style="width:100%;';this.viewParams.opaque&&(b+="background-color:white;");b+='"';b+=' frameborder="0" scrolling="no"';this.viewParams.opaque||(b+=' allowtransparency="true"');b+=this[fcO]?' height="'+this[fcO]+'"':"";b+=this[fco]?' width="'+this[fco]+
'"':"";b+="></iframe>";this.showEmbedThis&&(b+='<a href="javascript:void(0);" onclick="google.friendconnect.container.showEmbedDialog(\''+this.divId+"'); return false;\">Embed this</a>");b+="</div>";a(b)};
fc8[fc].Db=function(){var a=fcxc(),a="canvas=1&caller="+fcb(a),b=fca[fcL][fcF]().psinvite;b&&(a+="&psinvite="+fcb(b));a+="&site="+fcb(this.communityId);b=fcS(this.viewParams);if(null!=b.skin)for(var c="BG_IMAGE BG_COLOR FONT_COLOR BG_POSITION BG_REPEAT ANCHOR_COLOR FONT_FACE BORDER_COLOR CONTENT_BG_COLOR CONTENT_HEADLINE_COLOR CONTENT_LINK_COLOR CONTENT_SECONDARY_TEXT_COLOR CONTENT_SECONDARY_LINK_COLOR CONTENT_TEXT_COLOR ENDCAP_BG_COLOR ENDCAP_LINK_COLOR ENDCAP_TEXT_COLOR CONTENT_VISITED_LINK_COLOR ALTERNATE_BG_COLOR".split(" "),d=
0;d<c[fcB];d++)delete b.skin[c[d]];b=fcb(fca[fcK][fcfa](b));b=b[fcr]("\\","%5C");return fc4.T+this.sb+"?url="+fcb(this.specUrl)+(a?"&"+a:"")+"&view-params="+b};fc8[fc].D=function(a){a=a||fcd+this.yb+this.communityId;return this.Fb(a,"embed=1")};fc8[fc].C=function(a){return'<iframe src="'+this.D(a)+'" style="height:500px" scrolling="no" allowtransparency="true" border="0" frameborder="0" ></iframe>'};
fc8[fc].Fb=function(a,b){var c=fcb(fca[fcK][fcfa](this.viewParams)),c=c[fcr]("\\","%5C");return a+"?url="+fcb(this.specUrl)+(b?"&"+b:"")+"&view-params="+c};fc8[fc].Ob=function(){var a="1"==fca[fcL][fcF]().canvas||"1"==fca[fcL][fcF]().embed,b=null;a&&((b=fca[fcL][fcF]().caller)||(b="javascript:history.go(-1)"));return b};fc8[fc].Pb=function(a){var b=null;"canvas"==a?b=this.Db():"profile"==a&&(b=this.Ob());return b};
var fc9=function(){fcAc[fcI](this);fca.rpc[fcA]("signin",fc5[fc].signin);fca.rpc[fcA]("signout",fc5[fc].signout);fca.rpc[fcA]("resize_iframe",fc5[fc].fb);fca.rpc[fcA]("set_title",fc5[fc].setTitle);fca.rpc[fcA]("requestNavigateTo",fc5[fc].cb);fca.rpc[fcA]("api_loaded",fc5[fc].za);fca.rpc[fcA]("createFriendBarMenu",fc5[fc].Fa);fca.rpc[fcA]("showFriendBarMenu",fc5[fc].ib);fca.rpc[fcA]("hideFriendBarMenu",fc5[fc].Ua);fca.rpc[fcA]("putReloadViewParam",fc5[fc].Za);fca.rpc[fcA]("getViewParams",fc5[fc].Ia);
fca.rpc[fcA]("getContainerBaseTime",fc5[fc].Ha);fca.rpc[fcA]("openLightboxIframe",fc5[fc].Ya);fca.rpc[fcA]("showMemberProfile",fc5[fc].kb);fca.rpc[fcA]("closeLightboxIframe",fcT(this.t,this));fca.rpc[fcA]("setLightboxIframeTitle",fcT(this.zc,this));fca.rpc[fcA]("refreshAndCloseIframeLightbox",fcT(this.ic,this));var a=fcBc;a[fcA]();a.lb(this,"load",this.Rb);a.lb(this,"start",this.Sb);this.V="../../";this.X("");this.gb(0);this.Ja(1);this.pa=null;this.apiVersion="0.8";this.openSocialSecurityToken=null;
this.W="";this.Ga={};this.Zb=null;this.Yb=!1;this.wb=this.bc=this.lastIframeLightboxOpenArguments=this.lastLightboxCallback=this.lastLightboxDialog=null;this.Mc="post"};fcV(fc9,fcAc);fc9[fc].xc=function(a){this.wb=a};fc9[fc].v=fc8;fc9[fc].S={};fc9[fc].Bc=function(a){this.pa=a};fc9[fc].Ra=function(a){var b=fc9[fc].S[a];b||(0!==this.pa[fcu]("https://")?(a=this.ub(a),b=["https://",a,this.pa][fcP]("")):b=this.pa);return b};
fc9[fc].ub=function(a){var b=new fcY;a=fclb(a);b[fcN](a);b=b.digest();return b=fcrc(b)};
var fcCc=function(a,b){var c=b?b:fcc.top,d=c.frames;try{if(c.frameElement.id==a)return c}catch(e){}for(c=0;c<d[fcB];++c){var f=fcCc(a,d[c]);if(f)return f}return null},fcyc=function(a,b,c,d,e,f,k){var l="gfc_load_"+a;b='<html><head><style type="text/css">body {background:transparent;}</style>'+(fcW?'<script type="text/javascript">window.goback=function(){history.go(-1);};setTimeout("goback();", 0);\x3c/script>':"")+"</head><body><form onsubmit='window.goback=function(){};return false;' style='margin:0;padding:0;' id='"+
l+"' method='"+c+"' ' action='"+fca[fcL].escapeString(b)+"'>";for(var m in d)b+="<input type='hidden' name='"+m+"' value='' >";b+="</form></body></html>";c=fcCc(a);var n;try{n=c[fcC]||c.contentWindow[fcC]}catch(g){e&&f&&(fck(e,""),fck(e,f),c=fcCc(a),n=c[fcC]||c.contentWindow[fcC])}k&&fca.rpc.setAuthToken(a,k);n.open();n.write(b);n.close();a=n[fcs](l);for(m in d)a[m].value=d[m];if(fcW)a.onsubmit();a.submit()};
fc9[fc].zb=function(){var a=fca[fcL][fcF]().fcsite,b=fca[fcL][fcF]().fcprofile;a&&b&&fc4.xa(b,a)};fc9[fc].yc=function(a,b){this.S[a]=b};fc9[fc].U=function(){var a=/Version\/3\..*Safari/;if(a=fc5a&&fc1a()[fcv](a))fce[fcE].reload();else{null!=fc4.g&&fc4.g.refresh();for(var b in fc4.k)a=fc4.k[b],this.J(a);null!=this.lastIframeLightboxOpenArguments&&(b=this.lastIframeLightboxOpenArguments,this.t(),this.ra[fcM](this,b))}};
fc9[fc].X=function(a){a[fcv](/^http[s]?:\/\//)||(a=a&&0<a[fcB]&&"/"==a[fcva](0,1)?fce[fcE][fcua][fcv](/^http[s]?:\/\/[^\/]+\//)[0]+a[fcva](1):fce[fcE][fcua][fcv](/^[^?#]+\//)[0]+a);this.T=a};fc9[fc].ea=function(a){return"fcauth"+a};fc9[fc].ka=function(a){return"fcauth"+a+"-s"};fc9[fc].hash=function(a,b){var c=new fcY,d=fcsb(a,!0),c=new fcX(c,d,64),d=fclb(b),c=c.Jb(d);return fcrb(c,!0)};fc9[fc].Ma=function(a){return a=fcvb.get(this.ea(a))||fcvb.get(this.ka(a))||this.Ga[a]||""};
fc9[fc].Y=function(a){this.V=a};fc9[fc].Cc=function(a){this.W=a};fc9[fc].N=function(a){a=new this.v(a);a.Y(this.V);return a};fc9[fc].la=function(){return this.aa};fc9[fc].Ac=function(a){this.bc=a};var fc$=function(a){return(a=a[fcv](/_([0-9]+)$/))?fcca(a[1],10):null};
fc9[fc].Z=function(a,b,c,d,e,f){this.Kc||(this.ba(fcc.friendconnect_serverBase+"/friendconnect/styles/container.css?d="+this.W),this.Kc=!0);var k=fcDc(d);this.Zb!=(k?"rtl":"ltr")&&(this.ba(fcc.friendconnect_serverBase+"/friendconnect/styles/lightbox"+(k?"-rtl":"")+".css?d="+this.W),this.Zb=k?"rtl":"ltr");this.Yb||(this.rb(fcc.friendconnect_serverBase+"/friendconnect/script/lightbox.js?d="+this.W),this.Yb=!0);b=b||0;if(goog.ui&&goog.ui[fcra]){this.t();b=new goog.ui[fcra]("lightbox-dialog",!0);var l=
this;goog.events.listen(b,goog.ui[fcra].EventType.AFTER_HIDE,function(){l.lastLightboxCallback&&l.lastLightboxCallback();l.Ea()});b.setDraggable(!0);b.setDisposeOnHide(!0);b.setBackgroundElementOpacity(0.5);b.setButtonSet(new goog.ui[fcra].ButtonSet);this.lastLightboxDialog=b;this.lastLightboxCallback=c||null;c=b.getDialogElement();e=e||702;fcTb(c,"width",fci(e)+"px");f&&fcTb(c,"height",fci(f)+"px");a(b);b.getDialogElement()[fcG].direction=k?"rtl":"ltr"}else if(5>b)b++,a=fcT(this.Z,this,a,b,c,d,e,
f),fcba(a,1E3);else throw this.Ea(),fch("lightbox.js failed to load");};fc9[fc].t=function(a){var b=this.lastLightboxDialog,c=this.lastLightboxCallback;this.lastLightboxCallback=null;null!=b&&(this.lastLightboxDialog.dispatchEvent(goog.ui[fcra].EventType.AFTER_HIDE),b.dispose(),null!=c&&c(a))};fc9[fc].Ea=function(){this.lastIframeLightboxOpenArguments=this.lastLightboxCallback=this.lastLightboxDialog=null};fc9[fc].zc=function(a){this.lastLightboxDialog&&this.lastLightboxDialog.setTitle(a)};
fc9[fc].ic=function(){this.t();this.U()};fc5[fc].cb=function(a,b){var c=fc$(this.f),c=fc4.w(c),d=fcS(c.originalParams);b&&(d["view-params"]=d["view-params"]||{},d["view-params"]=b);d.locale=c[fcka];if(c.useLightBoxForCanvas)d.presentation=a,null!=fc4.lastLightboxDialog?fc4.t():fc4.jb(d);else if((c=c.Pb(a))&&fce[fcE][fcua]!=c)if("1"==fca[fcL][fcF]().embed)try{fcc.parent.location=c}catch(e){fcc.top.location=c}else fce[fcE].href=c};
fc9[fc].jb=function(a,b){a=a||{};var c=a[fcka],d=fcDc(c),e=this;this.t();this.Z(function(b){var c=fc0("div",{},fc0("div",{id:"gadget-signin",style:"background-color:#ffffff;height:32px;"}),fc0("div",{id:"gadget-lb-canvas",style:"background-color:#ffffff;"}));b.getTitleTextElement()[fcm](fc0("div",{id:"gfc-canvas-title",style:"color:#000000;"}));b[fcwa]()[fcm](c);b.setVisible(!0);var c=fcS(a),l=fcLb(fcc),m=fcg[fcp](0.7*l[fcO]),l={BORDER_COLOR:"#cccccc",ENDCAP_BG_COLOR:"#e0ecff",ENDCAP_TEXT_COLOR:"#333333",
ENDCAP_LINK_COLOR:"#0000cc",ALTERNATE_BG_COLOR:"#ffffff",CONTENT_BG_COLOR:"#ffffff",CONTENT_LINK_COLOR:"#0000cc",CONTENT_TEXT_COLOR:"#333333",CONTENT_SECONDARY_LINK_COLOR:"#7777cc",CONTENT_SECONDARY_TEXT_COLOR:"#666666",CONTENT_HEADLINE_COLOR:"#333333"};c.id="gadget-lb-canvas";fcl(c,fcg.min(498,m)+"px");c.maxHeight=m;c.keepMax&&(fcl(c,m),fcTb(b[fcwa](),"height",m+35+"px"));c["view-params"]=c["view-params"]||{};c["view-params"].opaque=!0;c["view-params"].skin=c["view-params"].skin||{};fcJa(c["view-params"].skin,
l);e.render(c);m={id:"gadget-signin",presentation:"canvas"};m.site=c.site;m.titleDivId="gfc-canvas-title";m["view-params"]={};m["view-params"].opaque=!0;m.keepMax=c.keepMax;c.securityToken&&(m.securityToken=c.securityToken);c=fcS(l);c.ALIGNMENT=d?"left":"right";e.ab(m,c);b.reposition()},void 0,b,c)};fc5[fc].ib=function(a,b){null!=fc4.g&&fc4.g.Fc(a,b)};fc5[fc].Ua=function(a){null!=fc4.g&&fc4.g.ma(a)};
fc5[fc].Ya=function(a,b,c,d,e,f,k,l,m,n){var g=this.f;a=a+(0<=a[fcu]("?")?"&":"?")+"iframeId="+g;fc4.ra(a,b,c,d,e,f,k,l,m,n,this.callback)};
fc9[fc].ra=function(a,b,c,d,e,f,k,l,m,n,g){var h=fcLb(fcc);null==d&&(d=fcg[fcp](0.7*h[fcO]));null==c&&(c=fcg[fcp](0.7*h[fco]));for(var p=[],h=0;h<arguments[fcB]&&10>h;h++)p[fcn](arguments[h]);if("/"==!a[0])throw fch("lightbox iframes must be relative to fc server");var s=this,q=f?fcS(f):{},t=fci(fcg[fcp](2147483647*fcg.random())),r="gfc_lbox_iframe_"+t;fca.rpc.setAuthToken(r,t);b||(b=fc4.openSocialSecurityToken);var u=fc4.openSocialSiteId;fc4.Z(function(c){s.lastIframeLightboxOpenArguments=p;var f=
"st="+fcb(b)+"&parent="+fcb(fc4.T)+"&rpctoken="+fcb(t);l||(q.iframeId=r,q.iurl=a,a=fcd+"/friendconnect/lightbox");var g=d-54;fcl(q,g);var h='<iframe id="'+r,h=h+('" width="100%" height="'+g+'" frameborder="0" scrolling="auto"></iframe>');c.setContent(h);e&&(c.setTitle(e),n&&(g=c.getTitleTextElement(),fcFb(g,"lightbox-dialog-title-small-text")));c.setVisible(!0);m||(q.fcauth=fc4.Ma(u));a+=(0<=a[fcu]("?")?"&":"?")+f+"&communityId="+u;fcyc(r,a,"POST",q,null,null,null)},void 0,g,void 0,c,d)};
fc5[fc].Ia=function(){var a=fc$(this.f),a=fc4.w(a);return a.viewParams};fc5[fc].Ha=function(){return fcsc};fc5[fc].Za=function(a,b){var c=fc$(this.f),c=fc4.w(c);c.viewParams[a]=b};fc9[fc].Rb=function(a,b){null!=fc4.g&&fc4.g.cc(b)};fc9[fc].Sb=function(a,b){null!=fc4.g&&fc4.g.dc(b)};fc5[fc].Fa=function(a,b,c,d){null!=fc4.g&&fc4.g.vb(a,b,c,d)};fc9[fc].J=function(a){var b=this.B.Pa(a);a.render(b);this.B.postProcessGadget&&this.B.postProcessGadget(a)};
fc5[fc].signout=function(a){fc4.$a(fc4.ea(a));fc4.$a(fc4.ka(a));fc4.Ga={};fc4.U();return!1};fc9[fc].$a=function(a){for(var b=fce[fcE].pathname,b=b[fcD]("/"),c=0;c<b[fcB];c++){for(var d=fcf(c+1),e=0;e<c+1;e++)d[e]=b[e];fcvb.remove(a,d[fcP]("/")+"/")}};
fc5[fc].fb=function(a){var b=fce[fcs](this.f);b&&0<a&&fcl(b[fcG],a+"px");(b=fce[fcs](this.f+"_body"))&&0<a&&fcl(b[fcG],a+"px");if(b=fc$(this.f)){var c=fc4.w(b);c&&((b=fce[fcs](c.divId))&&0<a&&(c&&c[fcxa]&&c[fcxa]<a&&(a=c[fcxa],b[fcG].overflowY="auto"),fcl(b[fcG],a+"px")),!c.keepMax&&"canvas"==c.la()&&fc4.lastLightboxDialog&&fc4.lastLightboxDialog.reposition(),fcTb(c.chrome,"visibility","visible"))}};fc5[fc].setTitle=function(a){var b=fc$(this.f),b=fc4.w(b);(b=b.titleDivId)&&fck(fce[fcs](b),fca[fcL].escapeString(a))};
fc5[fc].signin=function(a,b,c){fcvb.set(fc4.ea(a),b,31104E3,c);fcvb.set(fc4.ka(a),b,-1,c);fc4.Ga[a]=b;fc4.U()};var fcFc=function(a){fcic(a,fcEc)};fc9[fc].oc=function(a,b){b&&this.m(b,a);var c={};c.url=fcd+"/friendconnect/gadgets/members.xml";this.render(this.r(a,c))};fc9[fc].qc=function(a,b){b&&this.m(b,a);var c={};c.url=fcd+"/friendconnect/gadgets/review.xml";c["view-params"]={startMaximized:"true",disableMinMax:"true",features:"review"};this.render(this.r(a,c))};
fc9[fc].ta=function(a,b){b&&this.m(b,a);var c={};c.url=fcd+"/friendconnect/gadgets/wall.xml";c["view-params"]={startMaximized:"true",disableMinMax:"true",features:"comment"};this.render(this.r(a,c))};fc9[fc].ab=function(a,b){b&&this.m(b,a);var c={};c.url=fcd+"/friendconnect/gadgets/signin.xml";fcl(c,32);this.render(this.r(a,c))};
fc9[fc].lc=function(a,b){b&&this.m(b,a);a.prefs=a.prefs||{};a.sendViewParamsToServer=!0;a.prefs.hints=fcc.google_hints;var c={};c.url=fcd+"/friendconnect/gadgets/ads.xml";fcl(c,90);this.render(this.r(a,c))};fc9[fc].wa=function(a,b){if(a.id){b&&this.m(b,a);a["view-params"]=a["view-params"]||{};a["view-params"].opaque="true";this.g=new fc2(a);this.g.render();var c={};c.url=fcd+"/friendconnect/gadgets/friendbar.xml";a.id=this.g.s;fcl(a,"1");this.render(this.r(a,c))}};fc9[fc].nc=fc9[fc].wa;
fc9[fc].va=function(a,b){a=a||{};a.url=fcd+"/friendconnect/gadgets/signin.xml";a.site=a.site||fca[fcL][fcF]().site;fcl(a,32);this.ua(a,b)};fc9[fc].mc=fc9[fc].va;fc9[fc].sc=fc9[fc].ta;fc9[fc].m=function(a,b){var c=b["view-params"];c||(c={},b["view-params"]=c);c.skin=a};fc9[fc].r=function(a,b){var c=this.Xa(b,a);if(b["view-params"]){var d=b["view-params"];a["view-params"]&&(d=this.Xa(d,a["view-params"]));c["view-params"]=d}return c};fc9[fc].pc=function(a,b){b&&this.m(b,a);this.render(a)};
fc9[fc].Xa=function(a,b){var c={},d;for(d in b)c[d]=b[d];for(d in a)"undefined"==typeof c[d]&&(c[d]=a[d]);return c};
fc9[fc].render=function(a){this.openSocialSiteId=a.site;a["view-params"]=a["view-params"]||{};var b=this.N({divId:a.id,specUrl:a.url,communityId:a.site,height:a[fcO],locale:a[fcka]||this.bc,secureToken:a.securityToken,titleDivId:a.titleDivId,showEmbedThis:a.showEmbedThis,useLightBoxForCanvas:a.useLightBoxForCanvas||"undefined"==typeof a.useLightBoxForCanvas&&fcc.friendconnect_lightbox,viewParams:a["view-params"],prefs:a.prefs,originalParams:a,debug:a.debug,maxHeight:a[fcxa],sendViewParamsToServer:a.sendViewParamsToServer,
keepMax:a.keepMax});a.presentation&&b.Dc(a.presentation);this.pb(b);this.B.qb(b.id,a.id);fcba(function(){fc4.J(b)},0);return b.id};fc9[fc].rc=function(a,b){a=a||{};a.presentation="canvas";this.bb(a,b)};
fc9[fc].bb=function(a,b,c){a=a||{};a.url=fca[fcL][fcF]().url;a.site=fca[fcL][fcF]().site||a.site;var d=fca[fcL][fcF]()["view-params"];d&&(a["view-params"]=fca[fcK].parse(decodeURIComponent(d)));c&&(a["view-params"]=a["view-params"]||{},a["view-params"].useFixedHeight=!0,fcl(a["view-params"],c),b=b||{},b.HEIGHT=fci(c));this.ua(a,b)};fc9[fc].ua=function(a,b){a=a||{};b&&this.m(b,a);"1"==fca[fcL][fcF]().canvas?a.presentation="canvas":"1"==fca[fcL][fcF]().embed&&(a.presentation="embed");fc4.render(a)};
fc9[fc].Qb=function(){var a=fca[fcL][fcF]().caller;a&&fce[fcE][fcua]!=a&&8<a[fcB]&&("http://"==a.substr(0,7)[fcza]()||"https://"==a.substr(0,8)[fcza]())?fce[fcE].href=a:(a=fca[fcL][fcF]().site)?fce[fcE].href=fcd+"/friendconnect/directory/site?id="+a:fcc.history.go(-1)};fc9[fc].I="";fc9[fc].Mb=function(){return this.I};fc9[fc].vc=function(a){this.apiVersion=a};fc9[fc].ba=function(a){var b=fce[fcw]("link");b[fcy]("rel","stylesheet");b[fcy]("type","text/css");b[fcy]("href",a);fce.getElementsByTagName("head")[0][fcm](b)};
fc9[fc].rb=function(a){var b=fce[fcw]("script");b[fcy]("src",a);b[fcy]("type","text/javascript");fce.getElementsByTagName("head")[0][fcm](b)};fc9[fc].Da=function(a){fce[fcH]?a():fcc[fcx]?fcc[fcx]("load",a,!1):fcc.attachEvent("onload",a)};fc9[fc].na=function(a){if(!a.site)throw"API not loaded, please pass in a 'site'";this.ba(fcc.friendconnect_serverBase+"/friendconnect/styles/container.css?d="+this.W);this.openSocialSiteId=a.site;this.apiLoadedCallback=a.onload;this.Da(fcT(this.Wa,this,a,"fc-opensocial-api"))};
fc9[fc].ac=fc9[fc].na;fc9[fc].Ub=function(a){var b={};b.site=this.openSocialSiteId;b["view-params"]={txnId:a};this.Wa(b,"gfc-"+a)};fc9[fc].kc=function(a){var b={},c;for(c in this.k){var d=this.k[c];if(d.viewParams&&d.viewParams.txnId==a)break;else b[c]=d}this.k=b;(a=fce[fcs]("gfc-"+a))&&a.parentNode&&a.parentNode.removeChild&&a.parentNode.removeChild(a)};fc9[fc].Gb=function(){return"<Templates xmlns:fc='http://www.google.com/friendconnect/makeThisReal'>  <Namespace prefix='fc' url='http://www.google.com/friendconnect/makeThisReal'/>  <Template tag='fc:signIn'>    <div onAttach='google.friendconnect.renderSignInButton({element: this})'></div>  </Template></Templates>"};
fc9[fc].Nb=function(){return"<Templates xmlns:os='http://ns.opensocial.org/2008/markup'><Namespace prefix='os' url='http://ns.opensocial.org/2008/markup'/><Template tag='os:Name'>  <span if='${!My.person.profileUrl}'>${My.person.displayName}</span>  <a if='${My.person.profileUrl}' href='${My.person.profileUrl}'>      ${My.person.displayName}</a></Template><Template tag='os:Badge'>  <div><img if='${My.person.thumbnailUrl}' src='${My.person.thumbnailUrl}'/>   <os:Name person='${My.person}'/></div></Template><Template tag='os:PeopleSelector'>  <select onchange='google.friendconnect.PeopleSelectorOnChange(this)' name='${My.inputName}'          multiple='${My.multiple}' x-var='${My.var}' x-max='${My.max}'          x-onselect='${My.onselect}'>    <option repeat='${My.group}' value='${Cur.id}' selected='${Cur.id == My.selected}'>        ${Cur.displayName}    </option>  </select></Template></Templates>"};
var fcGc=function(a){var b;if(a.multiple){b=[];for(var c=0;c<a[fcJ][fcB];c++)a[fcJ][c].selected&&b[fcn](a[fcJ][c].value);c=a.getAttribute("x-max");try{c*=1}catch(d){c=0}if(c&&b[fcB]>c&&a["x-selected"])for(b=a["x-selected"],c=0;c<a[fcJ][fcB];c++){a[fcJ][c].selected=!1;for(var e=0;e<b[fcB];e++)if(a[fcJ][c].value==b[e]){a[fcJ][c].selected=!0;break}}}else b=a[fcJ][a.selectedIndex].value;a["x-selected"]=b;(c=a.getAttribute("x-var"))&&fcc.opensocial[fcia]&&fcc.opensocial[fcia].getDataContext().putDataSet(c,
b);if(c=a.getAttribute("x-onselect"))if(fcc[c]&&"function"==typeof fcc[c])fcc[c](b);else a["x-onselect-fn"]?a["x-onselect-fn"][fcM](a):a["x-onselect-fn"]=new Function(c)};
fc9[fc].Wa=function(a,b){fcc.opensocial.template.Loader.loadContent(this.Nb());fcc.opensocial.template.Loader.loadContent(this.Gb());fcc.opensocial[fcia].processDocumentMarkup();var c=fce[fcw]("div");c.id=b;fcl(c[fcG],"0px");fcj(c[fcG],"0px");c[fcG].position="absolute";c[fcG].visibility="hidden";fce[fcH][fcm](c);var d={};d.url=fcd+"/friendconnect/gadgets/osapi-"+this.apiVersion+".xml";fcl(d,0);d.id=c.id;d.site=a.site;d["view-params"]=a["view-params"];this.render(d)};
fc5[fc].za=function(){fc4.I=this.f;fc4.openSocialSecurityToken=this.a[0];var a=fc4.openSocialSecurityToken;fcc.opensocial[fcia].executeRequests();fcc.opensocial.template.process();fc4.apiLoadedCallback&&(a=fcIa(fc4.apiLoadedCallback,a),fcba(a,0))};fc9[fc].Q=function(a){var b=null,c;for(c in this.k)if(this.k[c].divId==a){b=this.k[c];break}return b};fc9[fc].D=function(a,b){var c=this.Q(a),d=null;c&&(d=c.D(b));return d};fc9[fc].C=function(a,b){var c=this.Q(a),d=null;c&&(d=c.C(b));return d};
fc9[fc].Ec=function(a,b){this.Z(function(c){var d=fce.createTextNode("Copy & paste this code into your site.");c[fcwa]()[fcm](d);c[fcwa]()[fcm](fce[fcw]("br"));var d=fc4.C(a,b),e=fce[fcw]("textarea");fck(e,d);e[fcy]("style","width:500px;");c[fcwa]()[fcm](e);c.setVisible(!0)})};var fcHc="ar dv fa iw he ku pa sd tk ug ur yi".split(" "),fcDc=function(a){var b=!1;a?(a=a[fcD]("_")[0],b=fcib(fcHc,a)):b=(a=fcVb(fce[fcH],"direction"))&&"rtl"==a;return b};
fc5[fc].kb=function(a,b){var c=0,d=null;try{var e=fc$(this.f),f=fc4.w(e),d=f.secureToken,c=f.communityId}catch(k){}b&&(c=b);fc4.xa(a,c,this.callback,d)};fc9[fc].xa=function(a,b,c,d){b=b||this.openSocialSiteId;a={keepMax:!0,presentation:"canvas",url:fcd+"/friendconnect/gadgets/members.xml",site:b,"view-params":{profileId:a}};d&&(a.securityToken=d);this.jb(a,c)};fc9[fc].Ib=function(a){var b=null;(a=this.Q(a))&&a.secureToken&&(b=a.secureToken);return b};
fc9[fc].Hb=function(a){var b=null;(a=this.Q(a))&&a.communityId&&(b=a.communityId);return b};var fcEc=function(a){fc4.I&&fccc(fc4.I,a)},fcIc=function(){fc5[fc].signout(fc4.openSocialSiteId)},fcJc=function(){fcfc(fc4.I)},fcKc=function(a,b){fc$b(a,b)},fcnc=function(){this.p={}};fcnc[fc].register=function(){fca.rpc[fcA]("subscribeEventType",fc5[fc].subscribe);fca.rpc[fcA]("publishEvent",fc5[fc].publish)};fc5[fc].subscribe=function(a){var b=fcBc;b.p[a]=b.p[a]||[];a=b.p[a];a[a[fcB]]={frameId:this}};
fcnc[fc].lb=function(a,b,c){var d=this;d.p[b]=d.p[b]||[];b=d.p[b];b[b[fcB]]={container:a,callback:c}};fc5[fc].publish=function(a){var b=fcBc,c=0;this.f&&(c=fc$(this.f));b.p[a]=b.p[a]||[];for(var b=b.p[a],d=0;d<b[fcB];d++)b[d].container?b[d].callback[fcI](b[d].container,a,c):fca.rpc[fcI](b[d].frameId,a,null,a,c)};var fcoc=fcT(fc5[fc].publish,new fc5),fcBc=new fcnc,fc4=new fc9;fc4.Da(fc4.zb);fcU("google.friendconnect.container",fc4);fcU("google.friendconnect.container.refreshGadgets",fc4.U);
fcU("google.friendconnect.container.setParentUrl",fc4.X);fcU("google.friendconnect.container.setServerBase",fc4.Y);fcU("google.friendconnect.container.setServerVersion",fc4.Cc);fcU("google.friendconnect.container.createGadget",fc4.N);fcU("google.friendconnect.container.openLightboxIframe",fc4.ra);fcU("google.friendconnect.container.renderGadget",fc4.J);fcU("google.friendconnect.container.render",fc4.render);fcU("google.friendconnect.container.goBackToSite",fc4.Qb);
fcU("google.friendconnect.container.renderMembersGadget",fc4.oc);fcU("google.friendconnect.container.renderReviewGadget",fc4.qc);fcU("google.friendconnect.container.renderCommentsGadget",fc4.ta);fcU("google.friendconnect.container.renderSignInGadget",fc4.ab);fcU("google.friendconnect.container.renderFriendBar",fc4.nc);fcU("google.friendconnect.container.renderSocialBar",fc4.wa);fcU("google.friendconnect.container.renderCanvasSignInGadget",fc4.mc);
fcU("google.friendconnect.container.renderUrlCanvasGadget",fc4.rc);fcU("google.friendconnect.container.renderEmbedSignInGadget",fc4.va);fcU("google.friendconnect.container.renderUrlEmbedGadget",fc4.bb);fcU("google.friendconnect.container.renderEmbedGadget",fc4.ua);fcU("google.friendconnect.container.renderWallGadget",fc4.sc);fcU("google.friendconnect.container.renderAdsGadget",fc4.lc);fcU("google.friendconnect.container.renderOpenSocialGadget",fc4.pc);
fcU("google.friendconnect.container.setNoCache",fc4.gb);fcU("google.friendconnect.container.enableProxy",fc4.Ja);fcU("google.friendconnect.container.setDomain",fc4.yc);fcU("google.friendconnect.container.setLockedDomainSuffix",fc4.Bc);fcU("google.friendconnect.container.setLocale",fc4.Ac);fcU("google.friendconnect.container.loadOpenSocialApi",fc4.ac);fcU("google.friendconnect.container.initOpenSocialApi",fc4.na);fcU("google.friendconnect.container.getOpenSocialApiIframeId",fc4.Mb);
fcU("google.friendconnect.container.setApiVersion",fc4.vc);fcU("google.friendconnect.container.getEmbedUrl",fc4.D);fcU("google.friendconnect.container.getEmbedHtml",fc4.C);fcU("google.friendconnect.container.getGadgetSecurityToken",fc4.Ib);fcU("google.friendconnect.container.getGadgetCommunityId",fc4.Hb);fcU("google.friendconnect.container.showEmbedDialog",fc4.Ec);fcU("google.friendconnect.container.showMemberProfile",fc4.xa);fcU("google.friendconnect.requestSignIn",fcEc);
fcU("google.friendconnect.requestSignOut",fcIc);fcU("google.friendconnect.requestSettings",fcJc);fcU("google.friendconnect.requestInvite",fcKc);fcU("google.friendconnect.renderSignInButton",fcFc);fcU("google.friendconnect.container.invokeOpenSocialApiViaIframe",fc4.Ub);fcU("google.friendconnect.container.removeOpenSocialApiViaIframe",fc4.kc);fcU("google.friendconnect.userAgent.WEBKIT",fc5a);fcU("google.friendconnect.userAgent.IE",fcW);fcU("google.friendconnect.PeopleSelectorOnChange",fcGc);
fcU("google.friendconnect.container.setDateStamp_",fc4.xc);
google.friendconnect.container.setServerBase('http://www-a-fc-opensocial.googleusercontent.com/ps/');google.friendconnect.container.setServerVersion('0.1-266dbfbb_aa05e697_6c47871f_7ed7fb11_c185aed1.7');google.friendconnect.container.setApiVersion('0.8');
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
google.friendconnect.container.setDateStamp_('143e8523f4d');