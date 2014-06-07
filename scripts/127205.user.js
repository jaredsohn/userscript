// ==UserScript==
// @name           Junkies Enhancer
// @namespace      PandaScripting
// @description    This script changes the layout of SerienJunkies.org and DokuJunkies.org for a better overview of series, seasons and episodes. It can also decrypt links now (Firefox only), keeps your series up to date and works with Chrome, Opera and Safari.
// @include        http://serienjunkies.org/*
// @include        http://download.serienjunkies.org/*
// @include        http://dokujunkies.org/*
// @exclude        /^http:\/\/(doku|serien)junkies\.org\/(hilfe|partner|useruploads|daily-update-archiv)\/?[^\/]*$/
// @version        2014.5.2
// @updateURL      http://userscripts.org/scripts/source/127205.meta.js
// @downloadURL    https://userscripts.org/scripts/source/127205.user.js
// @run-at         document-end
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// ==/UserScript==

/*
The names of some of the variables can be a bit confusing
at some points, sorry about that. It is not so easy to find names
that are both short and describe their meaning well enough
to understand their function easily.

(I had to import external scripts such as jQuery
because the @require tag isn't supported outside Greasemonkey)

if you have any questions, suggestions or bugs, feel free to post 'em:
https://userscripts.org/scripts/show/127205


used prefixes:
a - array or nodeList
n - DOM node
o - object
j - jQuery wrapped objects
s - string
b - boolean
i - integer
f - function
 */

// --- jQuery 2.1.0 ---

/*! jQuery v2.1.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.0",o=function(a,b){return new o.fn.init(a,b)},p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){if("object"!==o.type(a)||a.nodeType||o.isWindow(a))return!1;try{if(a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":k.call(a)},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);o.find=t,o.expr=t.selectors,o.expr[":"]=o.expr.pseudos,o.unique=t.uniqueSort,o.text=t.getText,o.isXMLDoc=t.isXML,o.contains=t.contains;var u=o.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?o(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),v.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};A.prototype=o.fn,y=o(m);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(C[a]||o.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return o.each(a.match(E)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(H.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function I(){m.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),o.ready()}o.ready.promise=function(b){return H||(H=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},o.ready.promise();var J=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}K.uid=1,K.accepts=o.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?o.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;
while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),P(f,d,e[d]));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||o.isArray(c)?d=L.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:o.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";l.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==U&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?Z:$):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=o.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[L.expando],f&&(b=L.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);L.cache[f]&&delete L.cache[f]}delete M.cache[c[M.expando]]}}}),o.fn.extend({text:function(a){return J(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(ob(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(ob(c,"script"),kb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(hb,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function tb(a){var b=m,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:0,fontWeight:400},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+R[f]+"Width",!0,e))):(g+=o.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):f[g]||(e=S(d),(c&&"none"!==c||!e)&&L.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Fb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Fb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&zb.test(o.css(a,"display"))?o.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=yb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(o.cssHooks[a+b].set=Gb)}),o.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?o(this).show():o(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}o.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Kb.prototype.init,o.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=o.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&S(a),p=L.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=tb(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=L.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;L.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Ub(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return o.map(k,Ub,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Xb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Xb(this,o.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),o.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Lb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Lb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Mb||(Mb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Mb),Mb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Yb,Zb,$b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return J(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||o.find.attr;$b[b]=function(a,b,d){var e,f;
return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return J(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(o(d).val(),f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=o.now(),dc=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=m.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,o.ajaxSettings),b):tc(o.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Dc)Dc[a]()}),l.cors=!!Fc&&"withCredentials"in Fc,l.ajax=Fc=!!Fc,o.ajaxTransport(function(a){var b;return l.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort"),f.send(a.hasContent&&a.data||null)},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||o.expando+"_"+cc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Ic=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Jc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=yb(l.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Lc=a.jQuery,Mc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Mc),b&&a.jQuery===o&&(a.jQuery=Lc),o},typeof b===U&&(a.jQuery=a.$=o),o});

// --- /jQuery 2.0.0 ---

// --- color picker ---

/*
 * jQuery MiniColors: A tiny color picker built on jQuery
 *
 * Copyright Cory LaViska for A Beautiful Site, LLC. (http://www.abeautifulsite.net/)
 *
 * Dual-licensed under the MIT and GPL Version 2 licenses
 *
 * Not needed features stripped by panda
 *
*/
if(jQuery){(function($){$.minicolors={defaultSettings:{animationSpeed:100,animationEasing:"swing",change:null,changeDelay:0,defaultValue:"",hide:null,hideSpeed:100,letterCase:"lowercase",position:"default",show:null,showSpeed:100,swatchPosition:"left"}};$.extend($.fn,{minicolors:function(method,data){switch(method){case"destroy":$(this).each(function(){destroy($(this))});return $(this);case"hide":hide();return $(this);case"rgbObject":return rgbObject($(this),method==="rgbObject");case"rgbString":return rgbString($(this),method==="rgbString");case"settings":if(data===undefined){return $(this).data("minicolors-settings")}else{$(this).each(function(){var settings=$(this).data("minicolors-settings")||{};destroy($(this));$(this).minicolors($.extend(true,settings,data))});return $(this)}case"show":show($(this).eq(0));return $(this);case"value":if(data===undefined){return $(this).val()}else{$(this).each(function(){refresh($(this).val(data))});return $(this)}case"create":default:if(method!=="create"){data=method}$(this).each(function(){init($(this),data)});return $(this)}}});function init(input,settings){var minicolors=$('<span class="minicolors" />'),defaultSettings=$.minicolors.defaultSettings;if(input.data("minicolors-initialized")){return}settings=$.extend(true,{},defaultSettings,settings);minicolors.addClass("minicolors-swatch-position-"+settings.swatchPosition).toggleClass("minicolors-swatch-left",settings.swatchPosition==="left");if(settings.position!==undefined){$.each(settings.position.split(" "),function(){minicolors.addClass("minicolors-position-"+this)})}input.addClass("minicolors-input").data("minicolors-initialized",true).data("minicolors-settings",settings).prop("size",7).prop("maxlength",7).wrap(minicolors).after('<span class="minicolors-panel"><span class="minicolors-slider"><span class="minicolors-picker"></span></span><span class="minicolors-grid"><span class="minicolors-grid-inner"></span><span class="minicolors-picker"><span></span></span></span></span>');input.parent().find(".minicolors-panel").on("selectstart",function(){return false}).end();if(settings.swatchPosition==="left"){input.before('<span class="minicolors-swatch"><span></span></span>')}else{input.after('<span class="minicolors-swatch"><span></span></span>')}updateFromInput(input,false,true)}function destroy(input){var minicolors=input.parent();input.removeData("minicolors-initialized").removeData("minicolors-settings").removeProp("size").removeProp("maxlength").removeClass("minicolors-input");minicolors.before(input).remove()}function refresh(input){updateFromInput(input)}function show(input){var minicolors=input.parent(),panel=minicolors.find(".minicolors-panel"),settings=input.data("minicolors-settings");if(!input.data("minicolors-initialized")||input.prop("disabled")||minicolors.hasClass("minicolors-focus")){return}hide();minicolors.addClass("minicolors-focus");panel.stop(true,true).fadeIn(settings.showSpeed,function(){if(settings.show){settings.show.call(input.get(0))}})}function hide(){$(".minicolors-input").each(function(){var input=$(this),settings=input.data("minicolors-settings"),minicolors=input.parent();if(settings.inline){return}minicolors.find(".minicolors-panel").fadeOut(settings.hideSpeed,function(){if(minicolors.hasClass("minicolors-focus")){if(settings.hide){settings.hide.call(input.get(0))}}minicolors.removeClass("minicolors-focus")})})}function move(target,event,animate){var input=target.parents(".minicolors").find(".minicolors-input"),settings=input.data("minicolors-settings"),picker=target.find("[class$=-picker]"),offsetX=target.offset().left,offsetY=target.offset().top,x=Math.round(event.pageX-offsetX),y=Math.round(event.pageY-offsetY),duration=animate?settings.animationSpeed:0,wx,wy,r,phi;if(event.originalEvent.changedTouches){x=event.originalEvent.changedTouches[0].pageX-offsetX;y=event.originalEvent.changedTouches[0].pageY-offsetY}if(x<0){x=0}if(y<0){y=0}if(x>target.width()){x=target.width()}if(y>target.height()){y=target.height()}if(target.is(".minicolors-grid")){picker.stop(true).animate({top:y+"px",left:x+"px"},duration,settings.animationEasing,function(){updateFromControl(input,target)})}else{picker.stop(true).animate({top:y+"px"},duration,settings.animationEasing,function(){updateFromControl(input,target)})}}function updateFromControl(input,target){function getCoords(picker,container){var left,top;if(!picker.length||!container){return null}left=picker.offset().left;top=picker.offset().top;return{x:left-container.offset().left+(picker.outerWidth()/2),y:top-container.offset().top+(picker.outerHeight()/2)}}var hue,saturation,brightness,rgb,x,y,r,phi,hex=input.val(),minicolors=input.parent(),settings=input.data("minicolors-settings"),panel=minicolors.find(".minicolors-panel"),swatch=minicolors.find(".minicolors-swatch"),grid=minicolors.find(".minicolors-grid"),slider=minicolors.find(".minicolors-slider"),gridPicker=grid.find("[class$=-picker]"),sliderPicker=slider.find("[class$=-picker]"),gridPos=getCoords(gridPicker,grid),sliderPos=getCoords(sliderPicker,slider);if(target.is(".minicolors-grid, .minicolors-slider")){hue=keepWithin(360-parseInt(sliderPos.y*(360/slider.height())),0,360);saturation=keepWithin(Math.floor(gridPos.x*(100/grid.width())),0,100);brightness=keepWithin(100-Math.floor(gridPos.y*(100/grid.height())),0,100);hex=hsb2hex({h:hue,s:saturation,b:brightness});grid.css("backgroundColor",hsb2hex({h:hue,s:100,b:100}));input.val(convertCase(hex,settings.letterCase))}swatch.find("SPAN").css({backgroundColor:hex});doChange(input,hex)}function updateFromInput(input,preserveInputValue,firstRun){var hex,hsb,x,y,r,phi,minicolors=input.parent(),settings=input.data("minicolors-settings"),swatch=minicolors.find(".minicolors-swatch"),grid=minicolors.find(".minicolors-grid"),slider=minicolors.find(".minicolors-slider"),gridPicker=grid.find("[class$=-picker]"),sliderPicker=slider.find("[class$=-picker]");hex=convertCase(parseHex(input.val(),true),settings.letterCase);if(!hex){hex=convertCase(parseHex(settings.defaultValue,true))}hsb=hex2hsb(hex);if(!preserveInputValue){input.val(hex)}swatch.find("SPAN").css("backgroundColor",hex);x=keepWithin(Math.ceil(hsb.s/(100/grid.width())),0,grid.width());y=keepWithin(grid.height()-Math.ceil(hsb.b/(100/grid.height())),0,grid.height());gridPicker.css({top:y+"px",left:x+"px"});y=keepWithin(slider.height()-(hsb.h/(360/slider.height())),0,slider.height());sliderPicker.css("top",y+"px");grid.css("backgroundColor",hsb2hex({h:hsb.h,s:100,b:100}));if(!firstRun){doChange(input,hex)}}function doChange(input,hex){var settings=input.data("minicolors-settings");if(hex!==input.data("minicolors-lastChange")){input.data("minicolors-lastChange",hex);if(settings.change){if(settings.changeDelay){clearTimeout(input.data("minicolors-changeTimeout"));input.data("minicolors-changeTimeout",setTimeout(function(){settings.change.call(input.get(0),hex)},settings.changeDelay))}else{settings.change.call(input.get(0),hex)}}}}function rgbObject(input){var hex=parseHex($(input).val(),true),rgb=hex2rgb(hex);if(!rgb){return null}return rgb}function rgbString(input){var hex=parseHex($(input).val(),true),rgb=hex2rgb(hex);if(!rgb){return null}return"rgb("+rgb.r+", "+rgb.g+", "+rgb.b+")"}function convertCase(string,letterCase){return letterCase==="uppercase"?string.toUpperCase():string.toLowerCase()}function parseHex(string,expand){string=string.replace(/[^A-F0-9]/ig,"");if(string.length!==3&&string.length!==6){return""}if(string.length===3&&expand){string=string[0]+string[0]+string[1]+string[1]+string[2]+string[2]}return"#"+string}function keepWithin(value,min,max){if(value<min){value=min}if(value>max){value=max}return value}function hsb2rgb(hsb){var rgb={};var h=Math.round(hsb.h);var s=Math.round(hsb.s*255/100);var v=Math.round(hsb.b*255/100);if(s===0){rgb.r=rgb.g=rgb.b=v}else{var t1=v;var t2=(255-s)*v/255;var t3=(t1-t2)*(h%60)/60;if(h===360){h=0}if(h<60){rgb.r=t1;rgb.b=t2;rgb.g=t2+t3}else{if(h<120){rgb.g=t1;rgb.b=t2;rgb.r=t1-t3}else{if(h<180){rgb.g=t1;rgb.r=t2;rgb.b=t2+t3}else{if(h<240){rgb.b=t1;rgb.r=t2;rgb.g=t1-t3}else{if(h<300){rgb.b=t1;rgb.g=t2;rgb.r=t2+t3}else{if(h<360){rgb.r=t1;rgb.g=t2;rgb.b=t1-t3}else{rgb.r=0;rgb.g=0;rgb.b=0}}}}}}}return{r:Math.round(rgb.r),g:Math.round(rgb.g),b:Math.round(rgb.b)}}function rgb2hex(rgb){var hex=[rgb.r.toString(16),rgb.g.toString(16),rgb.b.toString(16)];$.each(hex,function(nr,val){if(val.length===1){hex[nr]="0"+val}});return"#"+hex.join("")}function hsb2hex(hsb){return rgb2hex(hsb2rgb(hsb))}function hex2hsb(hex){var hsb=rgb2hsb(hex2rgb(hex));if(hsb.s===0){hsb.h=360}return hsb}function rgb2hsb(rgb){var hsb={h:0,s:0,b:0};var min=Math.min(rgb.r,rgb.g,rgb.b);var max=Math.max(rgb.r,rgb.g,rgb.b);var delta=max-min;hsb.b=max;hsb.s=max!==0?255*delta/max:0;if(hsb.s!==0){if(rgb.r===max){hsb.h=(rgb.g-rgb.b)/delta}else{if(rgb.g===max){hsb.h=2+(rgb.b-rgb.r)/delta}else{hsb.h=4+(rgb.r-rgb.g)/delta}}}else{hsb.h=-1}hsb.h*=60;if(hsb.h<0){hsb.h+=360}hsb.s*=100/255;hsb.b*=100/255;return hsb}function hex2rgb(hex){hex=parseInt(((hex.indexOf("#")>-1)?hex.substring(1):hex),16);return{r:hex>>16,g:(hex&65280)>>8,b:(hex&255)}}$(document).on("mousedown.minicolors touchstart.minicolors",function(event){if(!$(event.target).parents().add(event.target).hasClass("minicolors")){hide()}}).on("mousedown.minicolors touchstart.minicolors",".minicolors-grid, .minicolors-slider",function(event){var target=$(this);event.preventDefault();$(document).data("minicolors-target",target);move(target,event,true)}).on("mousemove.minicolors touchmove.minicolors",function(event){var target=$(document).data("minicolors-target");if(target){move(target,event)}}).on("mouseup.minicolors touchend.minicolors",function(){$(this).removeData("minicolors-target")}).on("mousedown.minicolors touchstart.minicolors",".minicolors-swatch",function(event){var input=$(this).parent().find(".minicolors-input"),minicolors=input.parent();if(minicolors.hasClass("minicolors-focus")){hide(input)}else{show(input)}}).on("focus.minicolors",".minicolors-input",function(event){var input=$(this);if(!input.data("minicolors-initialized")){return}show(input)}).on("blur.minicolors",".minicolors-input",function(event){var input=$(this),settings=input.data("minicolors-settings");if(!input.data("minicolors-initialized")){return}input.val(parseHex(input.val(),true));if(input.val()===""){input.val(parseHex(settings.defaultValue,true))}input.val(convertCase(input.val(),settings.letterCase))}).on("keydown.minicolors",".minicolors-input",function(event){var input=$(this);if(!input.data("minicolors-initialized")){return}switch(event.keyCode){case 9:hide();break;case 27:hide();input.blur();break}}).on("keyup.minicolors",".minicolors-input",function(event){var input=$(this);if(!input.data("minicolors-initialized")){return}updateFromInput(input,true)}).on("paste.minicolors",".minicolors-input",function(event){var input=$(this);if(!input.data("minicolors-initialized")){return}setTimeout(function(){updateFromInput(input,true)},1)})})(jQuery)};

// --- /color picker ---

// --- table drag and drop ---

/**
 * TableDnD plug-in for JQuery, allows you to drag and drop table rows
 * You can set up various options to control how the system will work
 * Copyright (c) Denis Howlett <denish@isocra.com>
 * Licensed like jQuery, see http://docs.jquery.com/License.
 */

!function(e,y,h){var k,p,q;function u(a,b){var c=Math.max(0,a[0]-b[0],b[0]-a[1]),d=Math.max(0,a[2]-b[1],b[1]-a[3]);return c+d}function v(a,b,c){for(var d=a.length,c=c?"offset":"position";d--;){var f=a[d].el?a[d].el:e(a[d]),l=f[c]();b[d]=[l.left,l.left+f.outerWidth(!0),l.top,l.top+f.outerHeight(!0)]}}function m(a,b){var c=b.offset();return{left:a.left-c.left,top:a.top-c.top}}function w(a,b,c){for(var b=[b.left,b.top],c=c&&[c.left,c.top],d,f=a.length,e=[];f--;)d=a[f],e[f]=[f,u(d,b),c&&u(d,c)];return e=
e.sort(function(a,b){return b[1]-a[1]||b[2]-a[2]||b[0]-a[0]})}function n(a,b,c,d){a=a.find(b);for(b=a.length;b--;){var f=a.eq(b).data(i);if(f)f[c](d)}}function o(a){this.options=e.extend({},j,a);this.containers=[];this.childGroups=[];this.scrolledProxy=e.proxy(this.scrolled,this);this.dragProxy=e.proxy(this.drag,this);this.dropProxy=e.proxy(this.drop,this);this.options.parentGroup?this.options.parentGroup.childGroups.push(this):(this.placeholder=e(this.options.placeholder),a.isValidTarget||(this.options.isValidTarget=
h))}function r(a,b){this.el=a;this.childGroups=[];this.floatRight=!1;this.dragInitProxy=e.proxy(this.dragInit,this);this.options=e.extend({},z,b);this.group=o.get(this.options);this.rootGroup=this.options.rootGroup=this.options.rootGroup||this.group;this.parentGroup=this.options.parentGroup=this.options.parentGroup||this.group;this.handle=this.rootGroup.options.handle||this.rootGroup.options.itemSelector;this.enable(!0)}var i="sortable",z={drag:!0,drop:!0,exclude:"",nested:!0,vertical:!0},j={afterMove:function(){},
containerSelector:"ol, ul",distance:0,handle:"",itemSelector:"li",isValidTarget:function(){return!0},onCancel:function(){},onDrag:function(a,b){a.css(b)},onDragStart:function(a){a.css({height:a.height(),width:a.width()});a.addClass("dragged");e("body").addClass("dragging")},onDrop:function(a){a.removeClass("dragged").removeAttr("style");e("body").removeClass("dragging")},placeholder:'<li class="placeholder"/>',pullPlaceholder:!0,serialize:function(a,b){var c=e.extend({},a.data());b[0]&&(c.children=
b);delete c.sortable;return c},tolerance:0},s={},x=0;"ontouchstart"in y?(k="touchstart.sortable",p="touchend.sortable touchcancel.sortable",q="touchmove.sortable"):(k="mousedown.sortable",p="mouseup.sortable",q="mousemove.sortable");o.get=function(a){if(!s[a.group]){if(!a.group)a.group=x++;s[a.group]=new o(a)}return s[a.group]};o.prototype={dragInit:function(a,b){this.$document=e(b.el[0].ownerDocument);this.toggleListeners("on");this.item=e(a.target).closest(this.options.itemSelector);this.itemContainer=
b;this.setPointer(a)},drag:function(a){a.preventDefault();if(!this.dragging){if(!this.distanceMet(a))return;n(this.item,this.options.containerSelector,"disable",true);this.options.onDragStart(this.item,this.itemContainer,j.onDragStart);this.item.before(this.placeholder);this.dragging=true}this.setPointer(a);this.options.onDrag(this.item,m(this.pointer,this.item.offsetParent()),j.onDrag);var b=a.pageX,a=a.pageY,c=this.sameResultBox,d=this.options.tolerance;if(!c||c.top-d>a||c.bottom+d<a||c.left-d>
b||c.right+d<b)this.searchValidTarget()||this.placeholder.detach()},drop:function(a){a.preventDefault();this.toggleListeners("off");if(this.dragging){if(this.placeholder.closest("html")[0])this.placeholder.before(this.item).detach();else this.options.onCancel(this.item,this.itemContainer,j.onCancel);this.options.onDrop(this.item,this.getContainer(this.item),j.onDrop);n(this.item,this.options.containerSelector,"enable",true);this.clearDimensions();this.clearOffsetParent();this.lastAppendedItem=this.sameResultBox=
h;this.dragging=false}},searchValidTarget:function(a,b){if(!a){a=this.relativePointer||this.pointer;b=this.lastRelativePointer||this.lastPointer}for(var c=w(this.getContainerDimensions(),a,b),d=c.length;d--;){var f=c[d][0];if(!c[d][1]||this.options.pullPlaceholder){f=this.containers[f];if(!this.$getOffsetParent())var e=f.getItemOffsetParent(),a=m(a,e),b=m(b,e);if(f.searchValidTarget(a,b))return true}}},movePlaceholder:function(a,b,c,d){var f=this.lastAppendedItem;if(d||!(f&&f[0]===b[0])){b[c](this.placeholder);
this.lastAppendedItem=b;this.sameResultBox=d;this.options.afterMove(this.placeholder,a)}},getContainerDimensions:function(){if(!this.containerDimensions)v(this.containers,this.containerDimensions=[],!this.$getOffsetParent());return this.containerDimensions},getContainer:function(a){return a.closest(this.options.containerSelector).data(i)},$getOffsetParent:function(){if(this.offsetParent===h){var a=this.containers.length-1,b=this.containers[a].getItemOffsetParent();if(!this.options.parentGroup)for(;a--;)if(b[0]!=
this.containers[a].getItemOffsetParent()[0]){b=false;break}this.offsetParent=b}return this.offsetParent},clearOffsetParent:function(){this.offsetParent=h},setPointer:function(a){a={left:a.pageX,top:a.pageY};if(this.$getOffsetParent()){var b=m(a,this.$getOffsetParent());this.lastRelativePointer=this.relativePointer;this.relativePointer=b}this.lastPointer=this.pointer;this.pointer=a},distanceMet:function(a){return Math.max(Math.abs(this.pointer.left-a.pageX),Math.abs(this.pointer.top-a.pageY))>=this.options.distance},
addContainer:function(a){this.containers.push(a)},removeContainer:function(a){var b=this.containers,a=this.containers.indexOf(a),c=b.slice(a+1||b.length);b.length=a<0?b.length+a:a;b.push.apply(b,c)},scrolled:function(){this.clearDimensions();this.clearOffsetParent()},toggleListeners:function(a){this.$document[a](q,this.dragProxy)[a](p,this.dropProxy)[a]("scroll.sortable",this.scrolledProxy)},clearDimensions:function(){this.containerDimensions=h;for(var a=this.containers.length;a--;)this.containers[a].itemDimensions=
h;for(a=this.childGroups.length;a--;)this.childGroups[a].clearDimensions()}};r.prototype={dragInit:function(a){if(!(a.which!==1||!this.options.drag||e(a.target).is(this.options.exclude))){a.preventDefault();a.stopPropagation();this.rootGroup.dragInit(a,this)}},searchValidTarget:function(a,b){var c=w(this.getItemDimensions(),a,b),d=c.length,f=this.rootGroup,e=!f.options.isValidTarget||f.options.isValidTarget(f.item,this);if(!d&&e){f.movePlaceholder(this,this.el,"append");return true}for(;d--;){f=c[d][0];
if(!c[d][1]&&this.options.nested&&this.getContainerGroup(f)){if(this.getContainerGroup(f).searchValidTarget(a,b))return true}else if(e){this.movePlaceholder(f,a);return true}}},movePlaceholder:function(a,b){var c=e(this.items[a]),d=this.itemDimensions[a],f="after",h=c.outerWidth(),i=c.outerHeight(),g=c.offset(),g={left:g.left,right:g.left+h,top:g.top,bottom:g.top+i};if(this.options.vertical)if(b.top<=(d[2]+d[3])/2){f="before";g.bottom=g.bottom-i/2}else g.top=g.top+i/2;else if(b.left<=(d[0]+d[1])/
2!=this.floatRight){f="before";g.right=g.right-h/2}else g.left=g.left+h/2;this.rootGroup.movePlaceholder(this,c,f,g)},getItemDimensions:function(){if(!this.itemDimensions){this.items=this.$getChildren(this.el,"item").filter(":not(.dragged)").get();v(this.items,this.itemDimensions=[])}return this.itemDimensions},getItemOffsetParent:function(){var a=this.el;return a.css("position")==="relative"||a.css("position")==="absolute"||a.css("position")==="fixed"?a:a.offsetParent()},getContainerGroup:function(a){var b=
e.data(this.items[a],"subContainer");if(b===h){var c=this.$getChildren(this.items[a],"container"),b=false;if(c[0]){b=e.extend({},this.options,{parentGroup:this.group,group:x++});b=c[i](b).data(i).group}e.data(this.items[a],"subContainer",b)}return b},$getChildren:function(a,b){return e(a).children(this.rootGroup.options[b+"Selector"])},_serialize:function(a,b){var c=this,d=this.$getChildren(a,b?"item":"container").not(this.options.exclude).map(function(){return c._serialize(e(this),!b)}).get();return this.rootGroup.options.serialize(a,
d,b)}};var t={enable:function(a){this.options.drop&&this.group.addContainer(this);a||n(this.el,this.options.containerSelector,"enable",true);this.el.on(k,this.handle,this.dragInitProxy)},disable:function(a){this.options.drop&&this.group.removeContainer(this);a||n(this.el,this.options.containerSelector,"disable",true);this.el.off(k,this.handle,this.dragInitProxy)},serialize:function(){return this._serialize(this.el,true)}};e.extend(r.prototype,t);e.fn[i]=function(a){var b=Array.prototype.slice.call(arguments,
1);return this.map(function(){var c=e(this),d=c.data(i);if(d&&t[a])return t[a].apply(d,b)||this;!d&&(a===h||typeof a==="object")&&c.data(i,new r(c,a));return this})}}(jQuery,window);


// --- /table drag and drop ---

// --- scrollTo ---

/*!
 * Smooth Scroll - v1.4.10 - 2013-02-20
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (/blob/master/LICENSE-MIT)
 */
(function(l){function t(l){return l.replace(/(:|\.)/g,"\\$1")}var e="1.4.10",o={exclude:[],excludeWithin:[],offset:0,direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficent:2},r=function(t){var e=[],o=!1,r=t.dir&&"left"==t.dir?"scrollLeft":"scrollTop";return this.each(function(){if(this!=document&&this!=window){var t=l(this);t[r]()>0?e.push(this):(t[r](1),o=t[r]()>0,o&&e.push(this),t[r](0))}}),e.length||this.each(function(){"BODY"===this.nodeName&&(e=[this])}),"first"===t.el&&e.length>1&&(e=[e[0]]),e};l.fn.extend({scrollable:function(l){var t=r.call(this,{dir:l});return this.pushStack(t)},firstScrollable:function(l){var t=r.call(this,{el:"first",dir:l});return this.pushStack(t)},smoothScroll:function(e){e=e||{};var o=l.extend({},l.fn.smoothScroll.defaults,e),r=l.smoothScroll.filterPath(location.pathname);return this.unbind("click.smoothscroll").bind("click.smoothscroll",function(e){var n=this,s=l(this),c=o.exclude,i=o.excludeWithin,a=0,f=0,h=!0,u={},d=location.hostname===n.hostname||!n.hostname,m=o.scrollTarget||(l.smoothScroll.filterPath(n.pathname)||r)===r,p=t(n.hash);if(o.scrollTarget||d&&m&&p){for(;h&&c.length>a;)s.is(t(c[a++]))&&(h=!1);for(;h&&i.length>f;)s.closest(i[f++]).length&&(h=!1)}else h=!1;h&&(e.preventDefault(),l.extend(u,o,{scrollTarget:o.scrollTarget||p,link:n}),l.smoothScroll(u))}),this}}),l.smoothScroll=function(t,e){var o,r,n,s,c=0,i="offset",a="scrollTop",f={},h={};"number"==typeof t?(o=l.fn.smoothScroll.defaults,n=t):(o=l.extend({},l.fn.smoothScroll.defaults,t||{}),o.scrollElement&&(i="position","static"==o.scrollElement.css("position")&&o.scrollElement.css("position","relative"))),o=l.extend({link:null},o),a="left"==o.direction?"scrollLeft":a,o.scrollElement?(r=o.scrollElement,c=r[a]()):r=l("html, body").firstScrollable(),o.beforeScroll.call(r,o),n="number"==typeof t?t:e||l(o.scrollTarget)[i]()&&l(o.scrollTarget)[i]()[o.direction]||0,f[a]=n+c+o.offset,s=o.speed,"auto"===s&&(s=f[a]||r.scrollTop(),s/=o.autoCoefficent),h={duration:s,easing:o.easing,complete:function(){o.afterScroll.call(o.link,o)}},o.step&&(h.step=o.step),r.length?r.stop().animate(f,h):o.afterScroll.call(o.link,o)},l.smoothScroll.version=e,l.smoothScroll.filterPath=function(l){return l.replace(/^\//,"").replace(/(index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},l.fn.smoothScroll.defaults=o})(jQuery);

// --- /scrollTo ---

// --- quick each ---

jQuery.fn.quickEach=function(){var a=jQuery([1]);return function(b){var c=-1,d,e=this.length;try{while(++c<e&&(d=a[0]=this[c])&&b.call(a,c,d)!==false);}catch(f){delete a[0];throw f}delete a[0];return this}}()

// --- /quick each ---

// --- MurmurHash3 ---

/**
* JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
*
* @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
* @see http://github.com/garycourt/murmurhash-js
* @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
* @see http://sites.google.com/site/murmurhash/
*
* @param {string} key ASCII only
* @param {number} seed Positive integer only
* @return {number} 32-bit positive integer hash
*/
function murmurhash3_32_gc(a,b){var c,d,e,f,g,h,i,j,k,l;c=a.length&3;d=a.length-c;e=b;g=3432918353;i=461845907;l=0;while(l<d){k=a.charCodeAt(l)&255|(a.charCodeAt(++l)&255)<<8|(a.charCodeAt(++l)&255)<<16|(a.charCodeAt(++l)&255)<<24;++l;k=(k&65535)*g+(((k>>>16)*g&65535)<<16)&4294967295;k=k<<15|k>>>17;k=(k&65535)*i+(((k>>>16)*i&65535)<<16)&4294967295;e^=k;e=e<<13|e>>>19;f=(e&65535)*5+(((e>>>16)*5&65535)<<16)&4294967295;e=(f&65535)+27492+(((f>>>16)+58964&65535)<<16)}k=0;switch(c){case 3:k^=(a.charCodeAt(l+2)&255)<<16;case 2:k^=(a.charCodeAt(l+1)&255)<<8;case 1:k^=a.charCodeAt(l)&255;k=(k&65535)*g+(((k>>>16)*g&65535)<<16)&4294967295;k=k<<15|k>>>17;k=(k&65535)*i+(((k>>>16)*i&65535)<<16)&4294967295;e^=k}e^=a.length;e^=e>>>16;e=(e&65535)*2246822507+(((e>>>16)*2246822507&65535)<<16)&4294967295;e^=e>>>13;e=(e&65535)*3266489909+(((e>>>16)*3266489909&65535)<<16)&4294967295;e^=e>>>16;return e>>>0}

// --- /MurmurHash3 ---

// --- browser support ---

function emulateGmFunctions()
{
  // local storage imitation
  // see https://developer.mozilla.org/en-US/docs/DOM/Storage
  
  if (window.localStorage === undefined)
  {
    window.localStorage =
    {
      getItem : function (sKey)
      {
        if (!sKey || !this.hasOwnProperty(sKey))
        {
          return null;
        }
        return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
      },
      key : function (nKeyId)
      {
        return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
      },
      setItem : function (sKey, sValue)
      {
        if (!sKey)
        {
          return;
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
        this.length = document.cookie.match(/\=/g).length;
      },
      length : 0,
      removeItem : function (sKey)
      {
        if (!sKey || !this.hasOwnProperty(sKey))
        {
          return;
        }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        this.length--;
      },
      hasOwnProperty : function (sKey)
      {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
      }
    };
    window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
  }
  
  var fSerial = JSON.stringify || eval,
  fDeserial = JSON.parse || uneval;
  
  GM_setValue = function (sName, oValue)
  {
    return window.localStorage[sName] = fSerial(oValue);
  }
  
  GM_getValue = function (sName, oDefault)
  {
    var oVal = window.localStorage[sName];
    if (oVal === undefined)
      return oDefault;
    else if (oVal === "undefined")
      return undefined;
    return fDeserial(oVal);
  }
  
  GM_deleteValue = function (sName)
  {
    return delete window.localStorage[sName];
  }
  
  GM_addStyle = function (sCss)
  {
    var oHead = document.getElementsByTagName("head"),
    oStyleNode = document.createElement("style");
    with (oStyleNode)
    {
      type = "text/css";
      appendChild(document.createTextNode(sCss));
    }
    if (oHead[0])
      oHead[0].appendChild(oStyleNode);
    else
      document.documentElement.insertBefore(oStyleNode, document.documentElement.firstChild);
  }
}

// --- /browser support ---

// --- global variables ---

var sBrowser = getBrowser(),
bOnHomePage = location.pathname == "/" || location.pathname == "/index.php",
bOnSeriesPageOne = /^\/(serie\/)?[^\/]+\/?(page\/1\/)?$/.test(location.pathname),
bOnDownloadPage = location.host == "download.serienjunkies.org",
bOnDokuJunkies = location.host == "dokujunkies.org",
bOnArchivePage = /^\/[0-9]{4}\/[0-9]{2}\/?$/.test(location.pathname),
bOnSeasonPage = !bOnHomePage && !bOnSeriesPageOne &&
  !/^\/serie\/[^\/]+\/page\/[0-9]+\/$/.test(location.pathname) && $(".post").length == 1,

bTransitionSupported =
  document.body.style.MozTransition !== undefined ||
  document.body.style.OTransition !== undefined ||
  document.body.style.webkitTransition !== undefined,
bDecryptionSupported = sBrowser == "Firefox",
// update check works only without cookie size limitation
bUpdateCheckSupported = sBrowser == "Firefox" || window.localStorage !== undefined,

sSeriesId = unescape(
    location.pathname.toLowerCase()
    .replace(/^\/(serie\/)?([^\/]+)\/?.*$/, "$2")).replace(/[+ ]+/g, "-"),
oSeries = null,

aBlacklistedHosters =
  // blacklist currently offline or non-sharing hosting services
  ["megaupload.com", "filesonic.com", "fileserve.com", "storage.to", "x7.to", "wupload.com", "ryushare.com", "hotfile.com"],

// all blacklisted hosters have to be also in the general hosters list
aHostersPref = aBlacklistedHosters.slice(),
oBlacklistedSeasons = new Object(),
oBlacklistedReleases = new Object(),

// decryption stuff
jMirrorSectionToDecrypt = $(),
jNextLinkToDecrypt = $(),
aLvl1UrlsToDecrypt = new Array(),

// update stuff
oTrackedSeries = new Object(),
oLastTimesChecked = new Object(),

oLangs =
{
  english :
  {
    settings : "settings",
    updateAlert : "update alert",
    hostPref : "hoster preference",
    trackedList : "tracked series",
    showSettings : "show enhancement settings",
    showHref : "show url as text",
    showPrefHost : "show prefered hoster",
    showLogos : "show hoster logos",
    timeout : "hoster timeout [s]",
    singleColumn : "single release column",
    colorLinks : "color links",
    linkColor :
    {
      link : "normal",
      visited : "visited",
      hover : "hover",
      active : "active",
    },
    save : "save",
    cancel : "cancel",
    decrypt : "decrypt",
    submitCaptcha : "submit",
    limitExceeded : "You've exceeded the download limit!\n" +
    "Please try again later.",
    decryptError : "Link could not be decrypted.\n" +
    "Error Code: ",
    decryptAbort : "Decryption timed out.\n" +
    "Either the server is not responsive, or you are logged in as premium user.\n" +
    "If so, please log out and try again.",
    captchaError : "Did not receive a captcha, please try again later.",
    update : "update",
    updateInterval : "update interval [m]",
    updateType :
    {
      link : "link",
      mirror : "mirror",
      release : "release",
      season : (bOnDokuJunkies ? "show" : "season"),
    },
    loading : "loading...",
    error : "error",
    nextCheck : "no updates, next update check",
    pleaseReload : "please reload",
    nextLoad : "next reload",
    clear : "clear",
    pleaseRetrack : "please retrack",
  },
  german :
  {
    settings : "Einstellungen",
    updateAlert : "Update-Nachricht",
    hostPref : "Hoster Priorität",
    trackedList : "Verfolgte Serien",
    showSettings : "Zeige Layout-Einstellungen",
    showHref : "Zeige Url als Text",
    showPrefHost : "Zeige bevorzugten Hoster",
    showLogos : "Zeige Hoster-Logos",
    timeout : "Hoster-Timeout [s]",
    singleColumn : "Einzelne Release-Spalte",
    colorLinks : "Färbe Links",
    linkColor :
    {
      link : "normal",
      visited : "besucht",
      hover : "ausgewählt",
      active : "geklickt",
    },
    save : "Speichern",
    cancel : "Abbrechen",
    decrypt : "Decrypten",
    submitCaptcha : "Senden",
    limitExceeded : "Sie haben das Download-Limit überschritten!\n" +
    "Bitte versuchen Sie es später noch einmal.",
    decryptError : "Link konnte nicht entschlüsselt werden.\n" +
    "Error-Code: ",
    decryptAbort : "Die Entschlüsselung schlug fehl.\n" +
    "Entweder antwortet der Server momentan nicht, oder Sie sind als Premium-Benutzer angemeldet.\n" +
    "Falls ja, bitte loggen Sie sich aus und probieren es noch einmal.",
    captchaError : "Kein Captcha empfangen, bitte versuchen Sie es später noch einmal.",
    update : "Update",
    updateInterval : "Update Interval [m]",
    updateType :
    {
      link : "Link",
      mirror : "Mirror",
      release : "Release",
      season : (bOnDokuJunkies ? "Sendung" : "Staffel"),
    },
    loading : "lade...",
    error : "Fehler",
    nextCheck : "keine Updates, nächster Update-Check",
    pleaseReload : "bitte neu laden",
    nextLoad : "nächstes Neuladen",
    clear : "leeren",
    pleaseRetrack : "bitte neu hinzufügen",
  }
},

oHosterLogos =
{
  uploadednet : "https://uploaded.net/favicon.ico",
  shareonlinebiz : "http://www.share-online.biz/favicon.ico",
  rapidsharecom : "https://images3.rapidshare.com/img/favicon.ico",
  depositfilescom : "http://img3.depositfiles.com/images/favicon.ico",
  netloadin : "http://rehost.to/img/hoster/netload.in.png",
  filefactorycom : "http://filefactory.com/favicon.ico",
  freaksharecom : "http://freakshare.com/images/favicon.ico",
  fileservecom : "http://fileserve.com/images/favicon.ico",
  filejunglecom : "http://filejungle.com/favicon.ico",
  firstloadcom : "http://staticcdn.firstload.com/favicon.ico",
  qsharecom : "http://s1.qshare.com/favicon.ico",
  cloudzernet : "https://www.free-way.me/images/hoster/cloudzer.net.png",
  filemonkeyin : "https://www.filemonkey.in/img/favicon.ico",
},

oIcons =
{
  remove : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDMtMjRUMTk6MDA6NDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUdUmQAAADUSURBVDiNjVOrDsJAEJwNJE1IeAgUDoXiB3AoFA7Fz+FQOBQKxw+gULgqBI8E0oSkmG0zbPeuHTOX29nZR68AIQdy1MBqpDhkFEjonuFpBABeTuWuMQlp5BZpe6gmMY0AQNpgdg8jQMo2r47JV7ntJI95BwUuxiRTTkzyhPIq2z6TyVu5Q/Gpyal0l9H5o9yyIsKf28mM8FTumaSZN8LRWeJDue9UnvMSD4HPeFceeEEAC0BkH3kDSy0Q0wgA7BzByuwnpClFWxKsAz9TrWbT4ElbzQ/7LzTaY4OapAAAAABJRU5ErkJggg==",
  add : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDMtMjRUMTk6MDA6NDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUdUmQAAADOSURBVDiNpZLNDcIwDIWf+wdCDNAdYAIkNoCdulPZAIkJYAIu3NJDDxCahEPMAbD7I3KJZTufnp1HEE5ZU5Dyt32g71wmNQLAeffJWB9+3vYDTKdVRgIa9ydgtAJtYUZQIPVSWVOoNiIDntOJvD9UJ4ojaHKdj3eayHWAdyDJBQDH+TQdADSagicDch1A2hK3qwBvY5wUwPGiGEmyZ1lTMA4gBgQeYZKVTQdkNvZ3ufxLg4A5K7jP1Pf9Vl4+YtwugGIqoLgS7DtuFScBeAGcSkWflDlu6gAAAABJRU5ErkJggg==",
  eng : "data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAAAUbRgrjjxSrFBlsWRztWGDwXGEx3ubxIUbN5hLaaxhf/g0Nf5RTupgVf5jYvmFfL+ZtYqZz5C206Gt1rrP7fmRjfyur+G+38LE3c3V6tnd7dvh9P/r6v39+/7+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiuAP8JHEiwoMGDBCVUQGCg4YYFCzYQIDDAgAIEFC584ECBwgcLFj5IkJABgocJBipc0Cjhw4MHHw5cCElBgAEKEjBA+OCygcsOGgYcELCBp9EPDXwe/aBhgYWXSaMymDq1QYKiS6ca9cA1qAQCGjrA1PqBQQQBBAIM8AjBQoGyDDwM8GDBgYQAEz5AyHDgANIGHiZm8OCgAAIFBAQo1pAggYYAkAVMEICwsuXLlgMCADs=",
  ger : "data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAD8/Lz8/Omk5OUpIOmZJPEpKR1hYWHhMS2loaXh4eKU/L513L71BMah9L4NbW4xlZZVycp18fOoeHu0pKe8zM/E8PPNHR/ZSUvdZWflgYPpmZvtsbPx1dZuEL6iGL7OKL7akL5mLfeiCHeuJJ++SNvKbRPKAcPWmVvayaebNHejPIurTLO7YOvLcSPDcbvXhV+/gbfjlZfPgeoCBgZSUh5yckKSkma2to7W1q7q6scq4r/yyqfzVpPblh/nrl/vxogAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiwAP8JHEiwoMGDBA0QWEhAQICHECMS0EExRw4cGG/csGGjRo0AE2nQUKAggckDBwwYECAiQIEdEiREiAABwgMEOAcMaNmAR4cOHDZoyIDhwgULFSicWNATqFCiRpFSUMqUR9ChRY8mpTBhqYMeKVKgGGvCRIkSJEiMSLEgBBAZMmDAcOGiRQsWLFaoiOEhxI+/P3wInkH4heEXDEAoBuHAwYfHHhwwkMyAAcLLmDNjDggAOw==",
  loading : "data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7",
  settings : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVHjapFO5iiJRFL3l1iIq7hi4NIgKIjSCiqCgDYbm/oCYGhqq/2Bi2KGZgaHgDAqtKEhj5pooiLuRuE+dh8oMMx3Ng1t16t5zXt165xZXKBTom5XlI3PHufvzX0twvV4pGo0Sf8/yUQW+P2e+wVVw75i4fD7/fJvP56PhcEgajYbUajVptVq63W60Xq9ps9mwu81mo1ar9exKdLlc8BD2er2k0+lIqVQy4mKxYBgLGBtarVaSSCTk8Xio3W6H2Sdgg1gs9t7v92m/35NAIGBku91OYrGYBTByqIEDLjTQis7nM3uLQqGg+XxOer2eXl5eqNFoUL1eZ7VQKESBQIAOhwPrBlwsaAX8JVssFm9IoigUCtEe4kc6neYQwMih9tgAGmixQSYej5PRaCSz2UwikYi63S6lUqn3h1XAyKEGDrjQQCs6nU40mUz+8PbR4r9y4MMRBLAwGAxyg8EgghOfTqdkMBhILpfT5+dnxOFwfEBULperbrf7VSqVsu5weLVaDXOQY2eQSCS45XLJhLvdjtnlcrkilUrlhgBGDjVwwIUG2qcLOByTycQcmM1mzDZMGxbaRU4mk7ENYOPDBaHf76dms1l1Op2vGKbRaMTIvV6Pjscjs/br64tZiNb5T6HtdkulUinCT+nHYxJ/8jZFgMfjMXu7SqWi32dktVoRf1as/U6nwzTPSQyHw1n+noPfb29vnMVigffsZ0EAI4caOODeNcQlk8n/+p1/CTAASVxppUgA6l4AAAAASUVORK5CYII=",
  colorSlider : "data:image/png;base64,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",
  colorGrid : "data:image/png;base64,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",
  update : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAACiElEQVQ4y5WTTUhUYRSGn/s3d2ZSc0atTMssxIJWYlOaTopFLaOoXbSJoFZtgjbRKgpEMohqISQFBYYbaaGQNKmlqRgVLQbDwR9yaq63MrzOfOPcr41OFlH5woHz9x7OOZyjsIyR0bHudHrJBtRllwnMAdsAm1UwDJ091VUnARSAl4PDr8rKtuw0PR4/IFeJyR+QEoLJyen3tTWh3cqDmXtywO6jLhhGVwz67Qih/H302RHW6/l4VS9FZhF1gQMkxGcA0jJNvx2hPtiAPmD3caXiKm3Td4inZrm04zLtM21cq2zh29JXUm4SS1jcnbpFKH8fAOMLUc5uPc/NWAuqcAWGqnNmyzmSbhJT9VLu307KTdIaa+ZGrJnKdbtoLGiiKq+aqrxqSrylmKoXTdHQFUXBlZLX86M0FjRl5/Rr67hQfhEns8Db76+pDzYgXIFH9XCo8Ajx1CwbzI3ZjdMZ76Cp4HC2gJNZoDXWTGe8g4cf75Oj5TInLGLOBCXeUh7PPiIcbPhZAKB3rgevZv7SwfFNJ9HQkbhY6QQxZwJN0fiU+sT8oOhQ2qfbZJ8dIbzc4or+4ks/QaOAHD2Hct8O+u0IewM1qKjZnOJ32zuU3t7np4o2FB4rKiw8yhqQsKzhxGerWQHo7nl6PRgMng4E8jd5PJ5fEoUQCJFeMRddNyMWF5NDtm13HTl88LayEolGx5/NzHysL95crBmGASATCSuz6DhRn9/nB0YB1zD0D3m5uUOVlRVPsqcMIKUMDQ6NdJmmGfD5fNi2LTKZzJsD4f11fxtF/82WS0sZLZGwVJDxf5FZ9XkoijIM5DqOswCyN1xfe2ItS0VKGYpGx6dGRse6pJSh/+X9AHA6D3zIsLYuAAAAAElFTkSuQmCC",
  coverEdit : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6MTE6NDEgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wMi0xN1QwMjozNjo0NVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wNC0wOVQwMjowNjo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCMBo4gAAABV0RVh0Q3JlYXRpb24gVGltZQAyLzE3LzA4IJyqWAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAGrSURBVCiRpZO/S1tRHMU/9zWamkDVKtRFceksgmlLwIKDkyDoFBej1B+Dm+AfIE4d3xIobSAZKgkoZNBBVFDkDTaKmIetdIsgSaqkrwqBy/vV4bUv2qYd2i+c4XLPOV/OuVyRSqVc/mMCALFY7J/EmUzGM7g7m6cXfxWN9PXcOyuNSEpvD1eOJLG8SGJ5kZuWJpReTxgMBn3E4/E/GDgOH3JZjEoJo1Li4H0SxXEYf/aUq7dLFKeGKE4NAfwe4aeBuFOtcGG0q4VycQepHQHw5PCoHsG2bR+O44Bl8WJkjHBrO+HWdt69XsH6lqSreZit6IQv9g2klD5M08SWkq+lSx497mB/dxvrJknAmoEHMMc8+ZfdPPx0Szqd9iJIKX1H0zQ5P9Q4yGXYWMti3SYJMOOtygECBt98pFwu1zuoVqvUajUAritfCIfb2FjLcrK3QP/zBNjA+o8Nsy75fJ5QKFQ3MAyDaDQKwMAAaJoGgH68in7cxmSn4Ylfec1GIhGfowAUCgVUVQVAVVV0XQdga8cG4PNZM0y7DTmi0TMCuK57748IIcQv9wB8B4AntmHhlNhOAAAAAElFTkSuQmCC",
  titleEdit : "data:image/png;base64,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",
  error : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDMtMjRUMTk6MDA6NDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUdUmQAAAEcSURBVDiNjZOxasMwEIY/mUCfolNLodAn6JYnib3Iz6QsdreO2fIU3gqFQpdsHk2gWDT0OvhkznWwe3DIOv3f8Z+EwYRALiArWVnGpY8ecqDahMBSXMoSoL4RKZxTvIO8A4khSAeLaTSDkxbyFuQrBGnhX2m0FSeQcwhygjFFZLK/VktMFoEfIGreioCuS7XEbHrgMlwiAG/O8aTAva6Ys/EylZk5iEBjhCka5yaa0UEEuqYhLj4es/PEZFHt2O7Pf6yjNatJTNYD3zpPD2wNfHSOoxlnKzLqEjNzcFDgYGa+VkuMe4UdUN95z+d+v3ITQxht7QBetMmD93ysNDGaegfFOGDQJo/eLzZ4V9jrzzR58NRkZYK6hCJtfgHwOvJ+kjEe3QAAAABJRU5ErkJggg==",
  clock : "data:image/png;base64,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",
};

// settings, see loadSettings()
oMsgs = oLangs.english,
bShowHref = false,
bShowPreferedHoster = true,
bShowHosterLogos = true,
iResponseTimeout = 20000,
iUpdateInterval = 3600000, // one hour
bColorLinks = false,
bSingleColumn = false,
sLinkColor = "#8A3207",
sVisitedColor = "#8A3207",
sHoverColor = "#753206",
sActiveColor = "#753206";

// --- /global variables ---

// --- main ---

// console.time("overall");

if (sBrowser != "Firefox")
  emulateGmFunctions();

if (bOnDokuJunkies)
  setupForDokuJunkies();

loadSettings();
insertButtonSection();
addStyles();

if (bOnDownloadPage)
{
  if (bDecryptionSupported && wasCaptchaSolved())
  {
    insertDecrButtonIntoDlPage();
  }
}
else
{
  insertSettings();
  
  if (bOnHomePage)
  {
    parseMainPage();
    insertTrackOverview();
    checkTrackedSeriesForUpdates();
  }
  else
  {
    oSeries = parseSeries(document.documentElement, sSeriesId);
    buildSeries(oSeries);
    addEventListeners();
    
    if (bDecryptionSupported)
      insertCaptchaOverlay();
    
    if (bUpdateCheckSupported && (!bOnDokuJunkies || !bOnArchivePage))
    {
      insertSpotOverlay();
      
      if (/\?spotOn=([^&]+)&type=(.+)$/.exec(location.search) !== null)
      {
        // was redirected by clicking on an update link, highlight the update
        
        var sId = RegExp.$1,
        sType = RegExp.$2;
        
        $(document).ready(function ()
        {
          setTimeout(function ()
          {
            updateLinkClicked(sId, sType);
          }, 1000);
        }
        );
      }
      
      if (contains(oTrackedSeries, sSeriesId))
      {
        insertTrackButton(true);
        insertUpdateAlertBar(false);
        $(document).ready(function ()
        {
          var jUpdateList = $(".updateList"),
          jUpdateCount = $("#updateCount");
          
          if (bOnSeriesPageOne)
            checkSeriesForUpdates(sSeriesId, jUpdateCount, jUpdateList, oSeries);
          else if (isItUpdateCheckTime(sSeriesId))
            checkSeriesForUpdates(sSeriesId, jUpdateCount, jUpdateList);
          else
            insertUpdateCache(sSeriesId, jUpdateCount, jUpdateList);
        }
        );
      }
      else
        insertTrackButton(false);
    }
  }
  
  saveObject("hosters", aHostersPref);
  saveObject("blacklisted hosters", aBlacklistedHosters);
  
  insertLinkMap();
  
  if (!bOnDokuJunkies)
  {
    if (location.pathname.substr(0, 13) != "/die-neusten/")
      fixPageLinks();
    fixToTopLink();
  }
}

// console.timeEnd("overall");

// --- /main ---

// --- classes ---

function MirrorLink(sTitle, sUrl)
{
  /*
  one mirror link of an episode
  http://download.serienjunkies.org/f-[...].html
   */
  
  this.getUrl = function ()
  {
    return sUrl;
  }
  this.getId = function ()
  {
    return sId;
  }
  this.getTitle = function ()
  {
    return sTitle;
  }
  this.toHtml = function (bIsDecrypted)
  {
    return "<a " +
    "id='" + sId + "' " +
    "href='" + sUrl + "' " +
    "target='_blank' " +
    "title='" + sTitle + "' " +
    "class='" + (bIsDecrypted ? "decrMirrorLink'>" : (bIsDecryptable ? "decryptable mirrorLink'>" : "mirrorLink'>")) +
    (bShowHref || bOnDownloadPage ? sUrl : sTitle) + "<br /></a>";
  }
  var sId = murmurhash3_32_gc(sUrl, 0).toString();
  var bIsDecryptable = /^http:\/\/download\.serienjunkies\.org\//.test(sUrl);
}

function DecrMirrorLink(sId)
{
  /*
  a decrypted mirror link of an episode consists of several links
  http://uploaded.to/file/[...].part1
  http://uploaded.to/file/[...].part2
  (stored in aParts as MirrorLinks)
   */
  
  this.addPart = function (oMirrorLink)
  {
    aParts.push(oMirrorLink);
  }
  this.toHtml = function ()
  {
    var sHtml = "<div id='" + sId + "' class='decrMirrorLinkList'>";
    
    for (var i = 0, iLen = aParts.length; i < iLen; i++)
      sHtml += aParts[i].toHtml(true);
    
    return sHtml + "</div>";
  }
  var aParts = new Array();
}

function Entry(sContent)
{
  /*
  a table entry that isn't a list of episodes
  for example, the season's cover, description or metadata
   */
  
  this.getContent = function ()
  {
    return sContent;
  }
  this.isMetadata = function ()
  {
    return bIsMetadata;
  }
  this.isHomePageCaption = function ()
  {
    return bOnDokuJunkies && /^<span[^>]*>(Doku|Lernen|Reality\/Entertainment|Sport|ReUps|MirrorUpdates\/ReUps)<\/span>$/.test(sContent) ||
    /^<strong[^>]*>(Deutsche Episoden|Englische Episoden mit deutschem Untertitel|TV-Filme|Englische Episoden|Deutsche Staffeln|Englische Staffeln)<\/strong>$/.test(sContent);
  }
  this.toHtml = function (bBlacklistable, bBlacklisted)
  {
    var sHtml = "<div class='entry'" +
      (bBlacklisted ? " style='display: none;'" : "") + ">";
    
    if (bBlacklistable)
      sHtml += "<div class='blacklistButton'></div>";
    
    return sHtml + sContent + "</div>";
  }
  var bIsMetadata = /<strong>Dauer:?<\/strong>/.test(sContent);
}

function MirrorSection(sReleaseId, sHosterName)
{
  /*
  a list of all the links of one hoster,
  can be hidden and shown when switching
  mirror by clicking a hoster button
   */
  
  this.addMirrorLink = function (oMirrorLink)
  {
    aMirrorLinks.push(oMirrorLink);
  }
  this.getId = function ()
  {
    return sReleaseId + sHosterId;
  }
  this.getHosterName = function ()
  {
    return sHosterName;
  }
  this.getMirrorLinks = function ()
  {
    return aMirrorLinks;
  }
  this.toHtml = function (bShow)
  {
    var sHtml = "<div " +
      "class='mirrorSection' id='" + sReleaseId + sHosterId + "'" +
      "style='display: " + (bShow ? "block" : "none") + ";'>";
    
    if (bDecryptionSupported)
      sHtml += createDecryptButtonHtml();
    
    for (i = 0, iLen = aMirrorLinks.length; i < iLen; i++)
      sHtml += aMirrorLinks[i].toHtml();
    
    return sHtml + "</div>";
  }
  var aMirrorLinks = new Array(),
  sHosterId = clean(sHosterName);
}

function ReleaseSection(iSeasonId, oIdList, sSeriesId)
{
  /*
  Definition of a release section: as soon as an episode list is followed by a non-episode entry,
  a new section is created. I did that to prevent splitting
  between entries that belong together, like the season cover, metadata and the episode list.
  
  It later turned out that the sections can also to used to tell the different releases
  apart and to make an alert system for new releases.
   */
  
  this.addEntry = function (oEntry)
  {
    if (oEntry.isMetadata())
      oMetadataEntry = oEntry;
    else
      aEntries.push(oEntry);
    
    this.addId(murmurhash3_32_gc(oEntry.getContent(), 0));
  }
  this.addMirrorLink = function (oMirrorLink, sHosterName)
  {
    var oMirrorSection = oMirrorSections[sHosterName];
    
    if (oMirrorSection === undefined)
    {
      aHosterNames.push(sHosterName);
      
      oMirrorSection =
        oMirrorSections[sHosterName] = new MirrorSection(iId.toString(), sHosterName);
    }
    
    oMirrorSection.addMirrorLink(oMirrorLink);
    bHasEpisodes = true;
  }
  this.getId = function ()
  {
    return iId.toString();
  }
  this.getMirrorSections = function ()
  {
    sortHosterNames();
    return $(aHosterNames).map(function ()
    {
      return oMirrorSections[this];
    }
    ).get();
  }
  this.hasEpisodes = function ()
  {
    return bHasEpisodes;
  }
  this.isBlacklisted = function ()
  {
    return bBlacklisted || contains(oBlacklistedReleases[sSeriesId], iId);
  }
  this.addId = function (iIdToAdd)
  {
    if (!bHasEpisodes)
    {
      // the ID is used by the mirror sections, so only change while there are none
      delete oIdList[iId];
      iId += iIdToAdd;
      while (oIdList[iId] !== undefined)
        iId++;
      oIdList[iId] = null;
    }
  }
  this.toHtml = function ()
  {
    bBlacklisted = contains(oBlacklistedReleases[sSeriesId], iId);
    
    var sHtml = "<div id='" + iId + "' " +
      "class='releaseSection" + (bBlacklisted ? " blacklisted'>" : "'>") +
      "<div class='entrySection'>",
    iEntryCount = aEntries.length;
    
    for (var i = 0; i < iEntryCount - 1; i++)
      sHtml += aEntries[i].toHtml(false, bBlacklisted);
    
    if (iEntryCount != 0)
      with (aEntries[iEntryCount - 1])
      sHtml += toHtml(!bOnHomePage && oMetadataEntry == null, bBlacklisted);
    
    if (oMetadataEntry != null)
      sHtml += oMetadataEntry.toHtml(true, false);
    
    if (!bHasEpisodes)
      sHtml += "</div>";
    else
    {
      sortHosterNames(); // sort buttons by hoster preferation
      
      var iHosterCount = aHosterNames.length,
      sPrefHosterName = undefined;
      
      if (bShowPreferedHoster)
      {
        // find first hoster on the preferation list
        // that is also on this section's hoster list
        for (var i = 0, iLen = aHostersPref.length; i < iLen; i++)
          if (contains(aHosterNames, aHostersPref[i]))
          {
            sPrefHosterName = aHostersPref[i];
            break;
          }
      }
      
      sHtml += "<div class='hosterButtonList'" +
      (bBlacklisted ? " style='display: none;'>" : ">");
      
      for (var i = iHosterCount; i--; )
      {
        var sHosterName = aHosterNames[i];
        sHtml += createHosterButtonHtml(iId.toString(),
          sHosterName, sHosterName === sPrefHosterName);
      }
      
      sHtml += "</div></div><div class='mirrorSectionList'" +
      (bBlacklisted ? " style='display: none;'>" : ">");
      
      for (var i = iHosterCount; i--; )
      {
        var sHosterName = aHosterNames[i];
        sHtml += oMirrorSections[sHosterName]
        .toHtml(sHosterName === sPrefHosterName);
      }
      
      sHtml += "</div>";
    }
    
    return sHtml + "</div>";
  }
  function sortHosterNames()
  {
    aHosterNames.sort(function (a, b)
    {
      return aHostersPref.indexOf(a) - aHostersPref.indexOf(b);
    }
    );
  }
  var aEntries = new Array(),
  oMetadataEntry = null,
  oMirrorSections = new Object(),
  aHosterNames = new Array(),
  bHasEpisodes = false,
  iId = iSeasonId;
  bBlacklisted = false;
}

function Season(sTitle, sUrl, sSeriesId)
{
  /*
  a season, coordinates the creation of new releaseSections
  and appends the new links to the respective mirrorSections
   */
  
  this.addEntry = function (oEntry)
  {
    // oLastSection: the last release section, the one where the new entry is to be appended to
    
    var iSecCount = aRelSections.length;
    if (iSecCount == 0 || oEntry.isHomePageCaption())
      var oLastSection = addReleaseSection();
    else
      var oLastSection = aRelSections[iSecCount - 1];
    
    if (oEntry.isMetadata() && oLastSection.hasEpisodes())
      var oLastSection = addReleaseSection();
    
    oLastSection.addEntry(oEntry);
  }
  this.addMirrorLink = function (oMirrorLink, sHosterName)
  {
    if (aRelSections.length == 0)
      addReleaseSection();
    
    var oLastSection = aRelSections[aRelSections.length - 1];
    oLastSection.addMirrorLink(oMirrorLink, sHosterName);
  }
  this.setFooter = function (sHtml)
  {
    sFootHtml = sHtml;
  }
  this.setCover = function (sHtml)
  {
    sCoverHtml = sHtml;
    if (aRelSections.length == 0)
      addReleaseSection();
    aRelSections[0].addId(murmurhash3_32_gc(sHtml, 0));
  }
  this.getTitle = function ()
  {
    return sTitle;
  }
  this.getId = function ()
  {
    return sId;
  }
  this.getReleaseSections = function ()
  {
    return aRelSections;
  }
  this.getUrl = function ()
  {
    return sUrl;
  }
  this.isBlacklisted = function ()
  {
    return bBlacklisted || contains(oBlacklistedSeasons[sSeriesId], sId);
  }
  this.toHtml = function ()
  {
    bBlacklisted = !bOnSeasonPage && contains(oBlacklistedSeasons[sSeriesId], sId);
    
    var sHtml = "<div class='season" +
    (bBlacklisted ? " blacklisted" : "") +
    "' id='" + sId + "'>";
    
    if (sTitle !== undefined)
    {
      sHtml += "<div class='seasonTitle'>" +
        (!bOnHomePage && !bOnSeasonPage ? "<div class='blacklistButton'></div>" : "");
      if (sUrl !== undefined)
        sHtml += "<a href='" + sUrl + "'>" + sTitle + "</a>";
      else
        sHtml += sTitle;
      sHtml += "</div>";
    }
    
    sHtml += "<div class='seasonContent'" +
      (bBlacklisted ? " style='display: none;'>" : ">");
    
    if (sCoverHtml !== undefined)
      sHtml += "<div class='seasonCover'>" + sCoverHtml + "</div>";
    
    for (var i = 0, iLen = aRelSections.length; i < iLen; i++)
      sHtml += aRelSections[i].toHtml();
    
    if (sFootHtml !== undefined)
      sHtml += "</div><div class='seasonFooter'" +
      (bBlacklisted ? " style='display: none;'>" : ">") +
      sFootHtml;
    
    return sHtml + "</div></div>";
  }
  function addReleaseSection()
  {
    var iId = murmurhash3_32_gc(sId, 0),
    oNewSec = new ReleaseSection(iId, oIdList, sSeriesId);
    aRelSections.push(oNewSec);
    return oNewSec;
  }
  var aRelSections = new Array(),
  sId = clean(sTitle),
  sCoverHtml = undefined,
  sFootHtml = undefined, // usually the series link, "Dead Link" link and a Usenet link
  oIdList = new Object(),
  bBlacklisted = false;
}

function Series(sId)
{
  /*
  a series, contains everything needed for creating the overview or the update state
   */
  
  this.addSeason = function (oSeason)
  {
    aSeasons.push(oSeason);
  }
  this.getId = function ()
  {
    return sId;
  }
  this.getSeasons = function ()
  {
    return aSeasons;
  }
  this.toHtml = function ()
  {
    var sHtml = "";
    
    for (var i = 0, iSeasonCount = aSeasons.length; i < iSeasonCount; i++)
      sHtml += aSeasons[i].toHtml();
    
    return sHtml;
  }
  var aSeasons = new Array();
}

function Update(sId, sType, sText, sUrl, oUpdateStateFragment)
{
  /*
  an Update is created when a new season/release/mirror/link is found by comparing update states.
  It is saved in the update cache of the series and shown in the update list on every page load
  if it is not yet time to check for new updates
  
  oUpdateStateFragment: part of the new update state, which is inserted
  into the old update state when clicking the remove icon,
  so that it is no longer detected as a new update when checking the next time
   */
  
  this.sId = sId;
  this.sType = sType;
  this.sText = sText;
  this.sUrl = sUrl;
  this.oUpdateStateFragment = oUpdateStateFragment;
}

// --- /classes ---

// --- helper functions ---

function contains(oSearchee, oSearched)
{
  if (oSearchee instanceof Array)
  {
    for (var i = oSearchee.length; i--; )
      if (oSearchee[i] === oSearched)
        return true;
    
    return false;
  }
  else if (typeof oSearchee == "object")
    return oSearchee[oSearched] !== undefined;
  else if (typeof oSearchee == "string")
    return oSearchee.indexOf(oSearched) != -1;
  
  return false;
}

function getText(nNode)
{
  if (!nNode)
    return "";
  
  return nNode.textContent || nNode.innerText || "";
}

function clean(sStr)
{
  // converts to a string which is used as index, class name or ID
  if (!sStr)
    return "";
  // damn, that should be "/^[^a-zA-Z]/+", I will correct this once it becomes a problem,
  // because it will reset series starting with more than one non-alphabetic character.
  // seems to work with modern browsers, though
  return sStr.replace(/[^a-zA-Z0-9]/g, "").replace(/^[^a-zA-Z]/, "");
};

function isEmpty(oObj)
{
  if (typeof oObj != "object")
    return false;
  for (var o in oObj)
    return false;
  return true;
}

// --- /helper functions ---

// --- general functions ---

function setupForDokuJunkies()
{
  sSeriesId = location.pathname.substr(1).replace(/(\/page\/[0-9]+)?\/?$/, "");
  bOnSeriesPageOne = !/\/page\/[^1]+\/?$/.test(location.pathname);
  
  // change settings context
  var fGet = GM_getValue,
  fSet = GM_setValue,
  fDelete = GM_deleteValue;
  
  GM_getValue = function (sName, oDefault)
  {
    return fGet("Doku : " + sName, oDefault);
  }
  
  GM_setValue = function (sName, oValue)
  {
    return fSet("Doku : " + sName, oValue);
  }
  
  GM_deleteValue = function (sName)
  {
    return fDelete("Doku : " + sName);
  }
}

function getBrowser()
{
  var sAgent = navigator.userAgent;
  if (contains(sAgent, "Firefox"))
    return "Firefox";
  if (contains(sAgent, "Opera"))
    return "Opera";
  if (contains(sAgent, "Chrome"))
    return "Chrome";
  if (contains(sAgent, "Safari"))
    return "Safari";
  return "other";
}

function getSeriesTitle()
{
  var sSeriesTitle = document.title;
  with (sSeriesTitle)
  sSeriesTitle = substr(indexOf(" » ") + 3);
  with (sSeriesTitle)
  if (indexOf(" » ") != -1)
    sSeriesTitle = substr(0, indexOf(" » ") + 3);
  if (sSeriesTitle == "%area%")
    return "Updates"; // I hope that's the only page with that bug
  return sSeriesTitle;
}

function fixToTopLink()
{
  $("a#totop").click(function ()
  {
    $.smoothScroll({
      scrollTarget: "#header",
      speed: 200,
      offset: -30
    });
  }
  );
}

function fixPageLinks()
{
  $("a.page").each(function ()
  {
    with (this)
    {
      if (href.substr(0, 25) == "http://serienjunkies.org/" &&
        href.substr(25, 6) != "serie/")
        href = "http://serienjunkies.org/serie/" + href.substr(25);
    }
  }
  );
}

function insertLinkMap()
{
  $("body").append("<map name='linkMap'><area " +
    (bOnDokuJunkies ?
      "title='Serienjunkies - Hier findest zu jede Serie zum Download' alt='SerienJunkies.org' href='http://serienjunkies.org'" :
      "title='Serienjunkies - Hier findest Dokus / Shows / Magazine zum Download' alt='DokuJunkies.org' href='http://dokujunkies.org'") +
    " shape='poly' coords='0,0, 50,0, 198,148, 198,198' target='_blank' /></map>");
  $("#pBadge img").attr("usemap", "#linkMap").unwrap().wrap("<div></div>");
}

function addStyles()
{
  GM_addStyle(
    // main stuff
    ".releaseSection { width: 100%; display: inline-block; position: relative; z-index: 0; }" +
    ".hosterButtonList { padding-right: 5px; display: block; margin-top: -5px; height: 20px; pointer-events: none; }" +
    ".hosterButton { pointer-events: auto; float: right; background-color: white; padding: 0 5px; cursor: pointer; font-weight: bold; height: 20px; border-radius: 5px 5px 0 0; }" +
    ".checked.hosterButton { background-color: lightGray !important; }" +
    ".hosterButton img { vertical-align: bottom; margin: 2px; width: 16px; height: 16px; }" +
    ".hosterButton:hover { background-color: #E4E4E4; }" +
    ".season { background-color: white; padding: 1%; margin-bottom: 1%; }" +
    ".season[id=''] { text-align: center; }" +
    ".season[id=''] .releaseSection { display: block; }" +
    ".season[id=''] .entrySection { border: none; margin-top: 0; }" +
    ".seasonContent { " + (!bOnHomePage && bSingleColumn ? "" : "-moz-column-count: 2; column-count: 2; -webkit-column-count: 2; ") + "clear: left; overflow: auto; padding: 5px 0; }" +
    ".seasonTitle { font-size: 20px; padding: 5px; text-align: center; border-width: 2px 0; border-style: solid none; margin: 5px 0; }" +
    ".seasonTitle:hover .blacklistButton { opacity: 1; }" +
    ".seasonTitle span { font-weight: bold; }" +
    ".seasonFooter { padding: 5px 0; }" +
    ".entry, .seasonCover { padding: 5px 0; overflow: auto; word-wrap: break-word; }" +
    ".entry span { color: black !important; font-weight: bold; }" +
    ".entrySection { border-width: 1px; border-style: solid none; border-color: #CCCCCC; }" +
    ":not(.seasonCover) + .releaseSection { margin-top: " + (bOnDokuJunkies && sBrowser != "Chrome" ? (bOnHomePage ? "-4px" : "-5px") : "-1px") + "; }" +
    ".releaseSection .blacklistButton, .seasonTitle .blacklistButton { cursor: pointer; float: left; background-image: url('" + oIcons.remove + "'); background-repeat: no-repeat; background-position: center center; width: 26px; height: 21px; opacity: 0; }" +
    ".blacklisted.releaseSection .blacklistButton, .blacklisted.season .blacklistButton { background-image: url('" + oIcons.add + "'); }" +
    ".entry:hover .blacklistButton { opacity: 1; }" +
    ".releaseSection:before { left: 10px; top: 10px; right: 10px; bottom: 10px; opacity: 0; border-radius: 5px; content: ''; position: absolute; z-index: -1; box-shadow: 0 0 5px 10px " + (bColorLinks ? sLinkColor : "black") + "; background-color: " + (bColorLinks ? sLinkColor : "black") + "; }" +
    ".previewBlacklisted.releaseSection:not(.blacklisted):before { opacity: 0.08; }" +
    ".blacklisted.season, .blacklisted.releaseSection { opacity: 0.5; }" +
    ".mirrorSectionList { padding: 5px 10px; border-bottom: 1px solid #CCCCCC; overflow: auto; word-wrap: break-word; }" +
    ".mirrorLink { position: relative; }" +
    "#buttonSection { position: fixed; height: auto; right: 0; bottom: 20%; z-index: 0; }" +
    "#buttonSection > .bar, #buttonSection > .button { overflow: hidden; float: right; clear: right; margin: 5px 0; opacity: 0.5; border-radius: 5px 0 0 5px; border: 2px solid black; border-right-width: 0; }" +
    "#buttonSection > .bar:hover, #buttonSection > .button:hover { opacity: 1; box-shadow: 0 0 3px white; background-size: 20px; }" +
    "#buttonSection > .button { background-repeat: no-repeat; background-position: center center; background-size: 16px; height: 32px; width: 32px; cursor: pointer; right; 0; }" +
    "#buttonSection > .bar { min-width: 32px; }" +
    
    // decryption
    ".decrMirrorLink { display: table; }" +
    ".decrLinkSection { display: block; padding-top: 5px; }" +
    ".decrMirrorLinkList { display: inline-block; margin: 0 20px 10px 0; vertical-align: top; overflow: hidden; }" +
    ".decryptButton { float: right; padding: 0 10px; cursor: pointer; border-color: #CCCCCC; border-style: solid; border-width: 0 1px 1px 1px; opacity: 0; background-color: white; margin: -5px -5px 2px 2px; border-radius: 0 0 5px 5px; }" +
    ".mirrorSection:hover .decryptButton { opacity: 1; }" +
    ".decryptButton:hover { background-color: #EEEEEE; }" +
    ".decryptButton:active { background-color: lightGray; }" +
    ".decryptButton:disabled { color: #CCCCCC; }" +
    ".decryptedContainer { margin: 5px; }" +
    "#dlPageDecryptButton { display: block; font-size: 18px; margin: 5px 0; }" +
    "#dlPageLoadingIcon { margin-left: 10px; }" +
    "#dlPageDecrLinkList { font-size: 12pt; background-color: #F3F3F3; border: 2px solid #E6E6E6; margin: 10px; display: inline-block; text-align: left; max-width: 50%; padding: 5px; }" +
    "#dlPageDecrLinkList .mirrorLink { font-size: 10pt; margin: 2px 5px; word-wrap: break-word; display: inline-block; float: left; clear: left; width: 100%; }" +
    ".loading.mirrorLink:before { border-radius: 12px; box-shadow: 0 0 5px 2px white; background-color: white; content: ''; width: 21px; height: 23px; position: absolute; top: -4px; right: -26px; background-image: url('" + oIcons.loading + "'); background-repeat: no-repeat; background-position: center; }" +
    "#captchaOverlay, #spotOverlay { z-index: 2; position: fixed; left: 0; top: 0; width: 100%; height: 100%; }" +
    "#captchaOverlay { background-color: rgba(0, 0, 0, 0.7); text-align: center; }" +
    "#captchaForm { background-color: rgba(0, 0, 0, 0.7); padding: 10px; position: relative; display: inline-block; top: 30%; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); }" +
    "#captchaImg { width: 100px; height: 60px; float: left; border-radius: 2px; }" +
    "#captchaInput { width: 110px; height: 50px; font-size: 35px; text-align: center; margin: 5px 10px; float: left; }" +
    "#captchaSubmit, #captchaCancel { margin: 3px 0; width: 95px; height: 25px; }" +
    
    // settings
    "#settings { max-height: 90%; z-index: 1; position: fixed; bottom: 10px; width: 450px; border: 2px solid black; padding: 5px; background-color: white; overflow: auto; box-shadow: 0 0 6px black; font-family: Trebuchet MS,Georgia,Arial,serif; font-size: 10.5pt; text-align: center; }" +
    "#settingsTable { margin: 0; padding: 0; width: 100%; }" +
    "#settingsTable td { margin: 0; padding: 0; width: 50%; vertical-align: top; }" +
    "#langIconWrapper { position: relative; margin: 0 auto; }" +
    "#settings label { margin: 5px; display: block; text-align: left; }" +
    "#settings input[type='checkbox'] { margin: 3px; float: right; }" +
    "#timeoutInput, #updateIntervalInput { width: 40px; text-align: center; margin: 0 3px; float: right; }" +
    "#colorSection { text-align: right; padding: 0 2px; line-height: 25px; }" +
    "#colorSection span { cursor: default; display: block; }" +
    "#colorSection div { display: inline-block; float: left; }" +
    "#colorSection input { margin-left: 5px; width: 70px; text-align: center; }" +
    "#hosterPrefListCaption, #trackedListCaption { display: block; margin-top: 15px; font-size: 9pt; font-weight: bold; position: relative; }" +
    "#clearHostersLink { position: absolute; bottom: 0; right: 5px; padding: 0 5px; }" +
    "#hosterPrefList, #trackedList { width: 98%; margin: 0 2%; padding: 0; list-style-position: inside; text-indent: 5px; text-align: left; }" +
    "#hosterPrefList li, #trackedList li { border: 1px solid #CCCCCC; line-height: 18px; padding: 1px 10px; margin: 2px 0; cursor: move; }" +
    "#hosterPrefList li.placeholder, #trackedList li.placeholder { position: relative; background-color: #CCCCCC !important; padding: 1px 5px 1px 15px; }" +
    "#hosterPrefList li.blacklisted { background-color: darkgray; color: white; text-decoration: line-through; }" +
    "#hosterPrefList li.blacklisted .blacklistButton { background-image: url(\"" + oIcons.add + "\"); }" +
    "#hosterPrefList.dragging, , #trackedList.dragging { cursor: move !important; }" +
    "#hosterPrefList.dragging .blacklistButton { visibility: hidden; }" +
    "#settingsButtonWrapper { position: relative; margin: 0 auto; width: 60%; }" +
    "#saveButton, #cancelButton { font-weight: bold; width: 48%; float: left; height: 22px; margin: 10px 1% 5px 1%; }" +
    ".langIcon { margin: 5px; cursor: pointer; width: 16px; height: 16px; }" +
    "#hosterPrefList .blacklistButton { float: right; margin: 1px; cursor: pointer; opacity: 0; width: 16px; height: 16px; background-image: url(\"" + oIcons.remove + "\"); background-repeat: no-repeat; }" +
    "#hosterPrefList li:hover:not(.dragged) .blacklistButton { opacity: 1; }" +
    "#settingsButton { background-image: url(\"" + oIcons.settings + "\"); background-color: white; }" +
    
    // update stuff
    "#trackButton { background-image: url(\"" + oIcons.update + "\"); background-color: white; }" +
    ".checked#trackButton { background-color: " + (bColorLinks ? sLinkColor : (bOnDokuJunkies ? "#226CA8" : "#8A3207")) + " !important; box-shadow: 0 0 3px " + (bColorLinks ? sLinkColor : (bOnDokuJunkies ? "#226CA8" : "#8A3207")) + " !important; }" +
    "#spotOverlay > div { float: left; }" +
    "#spotOverlay #top, #spotOverlay #left, #spotOverlay #right, #spotOverlay #bottom { pointer-events: auto; background-color: rgba(0, 0, 0, 0.7); }" +
    "#spotOverlay #top, #spotOverlay #bottom { width: 100%; }" +
    "#spotOverlay #spotlight { background-color: transparent; border-radius: 10px; margin: -5px; border: 5px solid black; } " +
    "#spotOverlay { pointer-events: none; }" +
    "#updateAlertBar { background-color: white; }" +
    "#updateCount { text-align: center; line-height: 32px; background-repeat: no-repeat; background-position: center center; background-size: 16px; font-family: Trebuchet MS; font-size: 25px; height: 32px; min-width: 32px; overflow: visible; font-weight: bold; cursor: default; }" +
    "#updateAlertBar #updateCount { float: left; }" +
    ".updateListWrapper { overflow-y: auto; overflow-x: hidden; }" +
    "#updateAlertBar .updateListWrapper { float: left; padding: 0 10px; border-style: solid; border-color: white; border-width: 5px 0; }" +
    ".updateLinkData { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }" +
    ".loading#updateCount { background-image: url('" + oIcons.loading + "'); }" +
    ".failed#updateCount { background-image: url('" + oIcons.error + "'); }" +
    ".waiting#updateCount { background-image: url('" + oIcons.clock + "'); }" +
    ".updateList { text-align: left; font-weight: bold; font-size: 10pt; table-layout: fixed; }" +
    ".updateList .removeButton { cursor: pointer; background-image: url('" + oIcons.remove + "'); background-repeat: no-repeat; background-position: center center; width: 21px; height: 18px; opacity: 0; padding-left: 5px; }" +
    ".updateType { padding-right: 5px; width: 65px; text-align: right; }" +
    ".updateItem:hover .removeButton { opacity: 1 !important; }" +
    
    // main site track overview
    "#trackOverview { background-color: white; padding: 1%; -moz-column-count: 2; column-count: 2; -webkit-column-count: 2; clear: left; overflow: auto; width: 98%; }" +
    ".trackedSeries { position: relative; height: 150px; width: 100%; overflow: hidden; display: inline-block; background-repeat: no-repeat; background-position: 0 0; margin: 5px 0; }" +
    ".trackedSeries:not(.hasUpdates) .updateListWrapper { display: none; }" +
    ".trackedSeriesLink, .titleEdit { font-family: Trebuchet MS,Georgia,Arial,serif; display: inline-block; margin-top: 10px; font-size: 20pt; font-weight: bold; background-color: white; border-radius: 0 5px 5px 0; }" +
    ".trackedSeriesLink { line-height: 20px; padding: 10px; height: 20px; opacity: 0.8; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 70%; }" +
    ".titleEdit { height: 36px; text-indent: 5px; width: 70%; }" +
    ".titleEditButton, .coverEditButton { height: 21px; width: 21px; background-color: white; border-radius: 5px; margin: 5px; cursor: pointer; background-repeat: no-repeat; background-position: center center; opacity: 0; }" +
    ".titleEditButton { display: inline-block; vertical-align: bottom; background-image: url('" + oIcons.titleEdit + "'); }" +
    ".coverEditButton { position: absolute; background-image: url('" + oIcons.coverEdit + "'); right: 5px; top: 5px; }" +
    ".trackedSeries:hover .titleEditButton, .trackedSeries:hover .coverEditButton { opacity: 0.8; }" +
    ".titleEditButton:hover, .coverEditButton:hover, .trackedSeries:hover .trackedSeriesLink, .trackedSeries:hover #updateCount, .trackedSeries:hover .updateListWrapper { opacity: 1 !important; }" +
    ".coverEdit { text-indent: 5px; margin: 1% 0 0 1%; width: 98%; }" +
    "#trackOverview #updateCount { opacity: 0.8; line-height: 20px; background-color: white; border-radius: 5px 0 0 5px; margin: 10px 0 0 10px; float: left; height: 20px; padding: 10px 5px; }" +
    "#trackOverview .updateListWrapper { opacity: 0.8; max-height: 90px; width: 98%; background-color: white; border-style: solid; border-width: 5px 0; border-color: white; padding: 0 1%; border-radius: 5px; " + (bOnDokuJunkies ? "margin-top: -4px; " : "") + "}" +
    "#trackOverview .updateList { width: 100%; }" +
    ".trackedSeries.hasUpdates .trackedSeriesLink { border-radius: 0 5px 0 0 !important; }" +
    ".trackedSeries.hasUpdates #updateCount { border-radius: 5px 0 0 0 !important; }" +
    
    // manipulation
    (bColorLinks ?
      "a:link, #sidebar li a:link { color: " + sLinkColor + "; }" +
      "a:visited, #sidebar li a:visited { color: " + sVisitedColor + "; }" +
      "a:hover, #sidebar li a:hover { color: " + sHoverColor + "; border-color: " + sHoverColor + "; }" +
      "a:active, #sidebar li a:active { color: " + sActiveColor + "; border-color: " + sActiveColor + "; }"
       : "") +
    "html, body { font-family: Trebuchet MS,Georgia,Arial,serif; }" +
    ".streams { width: 100%; }" +
    ".streams table td.lang { text-indent: 25px; }" +
    ".wp-paginate { border-top: 1px solid #CCCCCC; padding: 10px 5px 0; font-weight: bold; }" +
    "#caption { line-height: 20px; height: 35px; }" +
    "#more_posts { margin-top: 1%; }" +
    "#caption .wp-paginate, #more_posts .wp-paginate { padding: 0; border-width: 0; }" +
    "#caption:first-child { margin-bottom: 1%; }" +
    "#header { background-position: center center; }" +
    "#menu .page_item { text-align: center; min-width: 125px; }" +
    "#menu .page_item a { padding: 0 10px; margin: 0; }" +
    "#page_desc { padding-bottom: 1%; margin-bottom: -1%; position: relative; }" +
    "#page_desc #text { padding: 0 0 0 2%; width: 98%; }" +
    "#page_desc p { padding: 10px 0 0 0; }" +
    "#search_top { position: absolute; right: 0; }" +
    "#sidebar { width: 17%; overflow: auto; padding: 1%; margin: 0; }" +
    "#content { width: 80%; padding: 0; }" +
    "#content_wrap { width: 98%; padding: 1% 1% 0 1%;}" +
    "#rap, #wrap { width: 90%; border-bottom: 4px solid black; font-size: 0.9em; }" +
    ".post { margin: 5px 0; padding: 0; background-color: transparent; }" +
    "div#ct_container_outer { padding: 1% 1% 0 1%; width: 98%; }" +
    "#gnav { text-align: left; }" +
    "#leftdiv, iframe { display: none; }" +
    "#cnlbtn { cursor: pointer; }" +
    "#totop { background-color: white; border-left: 4px solid black; border-right: 4px solid black; padding: 5px 10px; }" +
    
    // miniColors
    ".minicolors { position: relative; display: inline-block; z-index: 1 }" +
    ".minicolors-focus { z-index: 2 }" +
    ".minicolors .minicolors-input { margin: 0; margin-right: 3px; border: solid 1px #CCC; width: 65px; height: 16px; border-radius: 0; box-shadow: inset 0 2px 4px rgba(0, 0, 0, .04); padding: 2px; margin-right: -1px }" +
    ".minicolors .minicolors-input { vertical-align: top; outline: 0 }" +
    ".minicolors-swatch-left .minicolors-input { margin-left: -1px; margin-right: auto }" +
    ".minicolors-focus .minicolors-input, minicolors-focus .minicolors-swatch { border-color: #999 }" +
    ".minicolors-swatch { position: relative; width: 20px; height: 20px; text-align: left; background: transparent; border: solid 1px #CCC; vertical-align: middle; display: inline !important; float: right; }" +
    ".minicolors-swatch SPAN { position: absolute; width: 100%; height: 100%; background: 0; box-shadow: inset 0 9px 0 rgba(255, 255, 255, .1); display: inline-block }" +
    ".minicolors-panel { position: absolute; top: 26px; left: 0; width: 173px; height: 152px; background: white; border: solid 1px #CCC; box-shadow: 0 0 20px rgba(0, 0, 0, .2); display: none }" +
    ".minicolors-position-top .minicolors-panel { top: -156px }" +
    ".minicolors-position-left .minicolors-panel { left: -83px }" +
    ".minicolors .minicolors-grid { position: absolute; top: 1px; left: 1px; width: 150px; height: 150px; background: url(" + oIcons.colorGrid + "); cursor: crosshair }" +
    ".minicolors .minicolors-grid-inner { position: absolute; top: 0; left: 0; width: 150px; height: 150px; background: 0 }" +
    ".minicolors-slider { position: absolute; top: 1px; left: 152px; width: 20px; height: 150px; background: white url(" + oIcons.colorSlider + "); cursor: crosshair }" +
    ".minicolors-grid .minicolors-picker { position: absolute; top: 70px; left: 70px; width: 10px; height: 10px; border: solid 1px black; border-radius: 10px; margin-top: -6px; margin-left: -6px; background: 0 }" +
    ".minicolors-grid .minicolors-picker SPAN { position: absolute; top: 0; left: 0; width: 6px; height: 6px; border-radius: 6px; border: solid 2px white }" +
    ".minicolors-picker { position: absolute; top: 0; left: 0; width: 18px; height: 2px; background: white; border: solid 1px black; margin-top: -2px }" +

    
    // animations
    ".hosterButton { -moz-transition: background-color 0.2s; -o-transition: background-color 0.2s; -webkit-transition: background-color 0.2s; }" +
    ".seasonTitle .blacklistButton, .releaseSection, .releaseSection:before, .releaseSection .blacklistButton, .decryptButton, #captchaOverlay, #spotOverlay, #hosterPrefList .blacklistButton, .updateList .removeButton, .trackedSeriesLink, .titleEditButton, .coverEditButton, #updateCount, .trackedSeriesLink { -moz-transition: opacity 0.2s; -o-transition: opacity 0.2s; -webkit-transition: opacity 0.2s; }" +
    ".season { -moz-transition: opacity 0.5s; -o-transition: opacity: 0.5s; -webkit-transition: opacity: 0.5s; }" +
    ".updateListWrapper { -moz-transition: background-color 0.2s, border-color 0.2s, opacity 0.2s; -o-transition: background-color 0.2s, border-color 0.2s, opacity 0.2s; -webkit-transition: background-color 0.2s, border-color 0.2s, opacity 0.2s; }" +
    "#buttonSection { -moz-transition: right 0.2s ease 0.2s; -o-transition: right 0.2s ease 0.2s; -webkit-transition: right 0.2s ease 0.2s; }" +
    "#buttonSection > .bar, #buttonSection > .button { -moz-transition: opacity 0.2s, background-color 0.2s, box-shadow 0.2s, background-size 0.2s; -o-transition: opacity 0.2s, background-color 0.2s, box-shadow 0.2s, background-size 0.2s; -webkit-transition: opacity 0.2s, background-color 0.2s, box-shadow 0.2s, background-size 0.2s; }" +
    "#buttonSection #updateAlertBar { -moz-transition: opacity 0.2s, background-color 0.2s, box-shadow 0.2s, background-size 0.2s, border-color 0.2s; -o-transition: opacity 0.2s, background-color 0.2s, box-shadow 0.2s, background-size 0.2s, border-color 0.2s; -webkit-transition: opacity 0.2s, background-color 0.2s, box-shadow 0.2s, background-size 0.2s, border-color 0.2s; }" +
    "#settings { -moz-transition: right 1s; -o-transition: right 1s; -webkit-transition: right 1s; }");
}

function addEventListeners()
{
  $(".hosterButtonList").mousedown(function (oEvent)
  {
    if (oEvent.button != 0)
      return;
    
    var jClicked = $(oEvent.target);
    
    if (!jClicked.hasClass("hosterButtonList"))
      hosterButtonClicked(jClicked);
  }
  );
  
  $(".decryptButton").click(function ()
  {
    var jMirrorSection = $(this.parentNode);
    decryptButtonClicked(jMirrorSection);
  }
  );
  
  $(".seasonTitle .blacklistButton")
  .click(function ()
  {
    var jBlacklistButton = $(this),
    jSeason = jBlacklistButton.parents(".season");
    blacklistButtonClicked(jSeason, "season");
  }
  );
  
  $(".releaseSection .blacklistButton")
  .click(function ()
  {
    var jBlacklistButton = $(this),
    jReleaseSection = jBlacklistButton.parents(".releaseSection");
    blacklistButtonClicked(jReleaseSection, "release");
  }
  )
  .hover(function ()
  {
    var jBlacklistButton = $(this),
    jReleaseSection = jBlacklistButton.parents(".releaseSection");
    jReleaseSection.toggleClass("previewBlacklisted");
  }
  );
}

function insertButtonSection()
{
  $("body").append("<div id='buttonSection' style='display: block;'></div>");
}

function hideHoster(jHosterButton, jMirrorSection)
{
  jHosterButton.removeClass("checked");
  jMirrorSection.slideUp(200);
}

function showHoster(jHosterButton, jMirrorSection, bSlide)
{
  jHosterButton
  .addClass("checked")
  .siblings()
  .removeClass("checked");
  
  with (jMirrorSection)
  {
    siblings().hide();
    
    if (bSlide)
      slideDown(200);
    else
      show();
  }
}

function switchHoster(jHosterButton, jMirrorSection, jPrevMirrorSection)
{
  var iOldHeight = jPrevMirrorSection.outerHeight(),
  iNewHeight = jMirrorSection.outerHeight();
  
  if (iOldHeight != iNewHeight)
  {
    jHosterButton
    .addClass("checked")
    .siblings()
    .removeClass("checked");
    
    with (jMirrorSection.parent())
    {
      css("height", iOldHeight)
      .animate(
      {
        height : iNewHeight
      }, 200, function ()
      {
        css("height", "");
      }
      );
    }
    jMirrorSection.show();
    jPrevMirrorSection.hide();
  }
  else
    showHoster(jHosterButton, jMirrorSection, false);
}

function hosterButtonClicked(jHosterButton)
{
  var jReleaseSection = jHosterButton.parents(".releaseSection");
  
  if (!jHosterButton.hasClass("hosterButton"))
    // clicked hoster logo
    jHosterButton = jHosterButton.parent();
  
  var sHosterId = jHosterButton.attr("id").substr(6), // cut "button"
  jMirrorSection = jReleaseSection.find(".mirrorSection#" + sHosterId);
  
  if (jHosterButton.hasClass("checked"))
    hideHoster(jHosterButton, jMirrorSection);
  else if (jHosterButton.siblings(".checked").length == 0)
    showHoster(jHosterButton, jMirrorSection, true);
  else
    switchHoster(jHosterButton, jMirrorSection, jMirrorSection.siblings(":visible"));
}

function blacklistButtonClicked(jTarget, sType)
{
  switch (sType)
  {
  case "release":
    var jReleaseSection = jTarget,
    sReleaseId = jReleaseSection.attr("id")
    oList = oBlacklistedReleases[sSeriesId];
    
    if (jReleaseSection.hasClass("blacklisted"))
    {
      // un-blacklisted
      delete oBlacklistedReleases[sSeriesId][sReleaseId];
      if (isEmpty(oList))
        delete oBlacklistedReleases[sSeriesId];
    }
    else
    {
      // newly blacklisted
      if (oList === undefined)
        oList = oBlacklistedReleases[sSeriesId] = new Object();
      oList[sReleaseId] = null;
    }
    
    jReleaseSection
    .toggleClass("blacklisted")
    .find(".mirrorSectionList, .hosterButtonList, .entry:not(:has(.blacklistButton))")
    .slideToggle(500);
    
    saveObject("blacklisted releases", oBlacklistedReleases);
    break;
  
  case "season":
    var jSeason = jTarget,
    sSeasonId = jSeason.attr("id"),
    oList = oBlacklistedSeasons[sSeriesId];
    
    if (jSeason.hasClass("blacklisted"))
    {
      delete oList[sSeasonId];
      if (isEmpty(oList))
        delete oBlacklistedSeasons[sSeriesId];
    }
    else
    {
      if (oList === undefined)
        oList = oBlacklistedSeasons[sSeriesId] = new Object();
      oList[sSeasonId] = null;
    }
    
    jSeason
    .toggleClass("blacklisted")
    .find(".seasonContent, .seasonFooter")
    .slideToggle(500);
    
    saveObject("blacklisted seasons", oBlacklistedSeasons);
    break;
  }
  
  removeUnspottableUpdates();
}

function getSeriesUrl(sSeriesId)
{
  sSeriesId = escape(sSeriesId);
  
  if (bOnDokuJunkies)
    return "http://dokujunkies.org/" + sSeriesId;
  else
    return "http://serienjunkies.org/serie/" + sSeriesId + "/";
}

// --- /general functions ---

// --- settings functions ---

function insertSettings()
{
  var jSettings = $("<div id='settings' style='right: -500px;'>" +
      "<div id='langIconWrapper'>" +
      "<img class='langIcon' id='engIcon' src='" + oIcons.eng + "' />" +
      "<img class='langIcon' id='gerIcon' src='" + oIcons.ger + "' />" +
      "</div>" +
      "<table id='settingsTable'><tbody><tr><td>" +
      "<label>" + oMsgs.showHref + "<input id='showHrefCheckBox' type='checkbox' /></label>" +
      "<label>" + oMsgs.showPrefHost + "<input id='showPrefCheckBox' type='checkbox' /></label>" +
      "<label>" + oMsgs.showLogos + "<input id='showLogosCheckBox' type='checkbox' /></label>" +
      "<label" + (bDecryptionSupported ? "" : " style='display: none;'") + ">" + oMsgs.timeout + "<input id='timeoutInput' type='text' /></label>" +
      "<label>" + oMsgs.updateInterval + "<input id='updateIntervalInput' type='text' /></label>" +
      "<label>" + oMsgs.singleColumn + "<input id='singleColumnCheckBox' type='checkbox' /></label>" +
      "</td><td>" +
      "<label>" + oMsgs.colorLinks + "<input id='colorLinksCheckBox' type='checkbox' /></label>" +
      "<div id='colorSection'>" +
      "<span><div><input id='linkColor' type='text' /></div>" + oMsgs.linkColor.link + "</span>" +
      "<span><div><input id='visitedColor' type='text' /></div>" + oMsgs.linkColor.visited + "</span>" +
      "<span><div><input id='hoverColor' type='text' /></div>" + oMsgs.linkColor.hover + "</span>" +
      "<span><div><input id='activeColor' type='text' /></div>" + oMsgs.linkColor.active + "</span>" +
      "</div>" +
      "</td></tr><tr><td>" +
      "<span id='hosterPrefListCaption'>" + oMsgs.hostPref +
      "<a id='clearHostersLink' href='javascript:void(0);'>" + oMsgs.clear + "</a>" +
      "</span>" +
      "<ol id='hosterPrefList' />" +
      "</td><td>" +
      "<span id='trackedListCaption'>" + oMsgs.trackedList + "</span>" +
      "<ol id='trackedList' />" +
      "</td></tr></tbody></table>" +
      "<div id='settingsButtonWrapper'>" +
      "<input id='cancelButton' type='button' value='" + oMsgs.cancel + "'>" +
      "<input id='saveButton' type='button' value='" + oMsgs.save + "'>" +
      "</div>" +
      "</div>")
    .change(function (oEvent)
    {
      switch (oEvent.target.id)
      {
      case "colorLinksCheckBox":
        $("#colorSection").slideToggle();
        break;
      }
    }
    )
    .click(function (oEvent)
    {
      switch (oEvent.target.id)
      {
      case "engIcon":
        GM_setValue("language", "english");
        location.reload();
        break;
      case "gerIcon":
        GM_setValue("language", "german");
        location.reload();
        break;
      case "saveButton":
        saveSettings();
      case "cancelButton":
        closeSettings();
        break;
      }
    }
    );
  
  $("body").append(jSettings);
  
  $("#clearHostersLink")
  .click(function ()
  {
    var jList = $("#hosterPrefList");
    jList.slideUp(500, function ()
    {
      jList.empty();
    }
    );
  }
  );
  
  $("#buttonSection")
  .append(
    $("<div id='settingsButton' class='button' title='" + oMsgs.settings + "'></div>")
    .click(function ()
    {
      openSettings();
    }
    ));
  
  $("#colorSection input")
  .minicolors("create",
  {
    swatchPosition : "right",
    letterCase : "uppercase"
  }
  );
}

function updateSettingsNode()
{
  // sync settings UI with settings variables
  
  var sNewListHtml = "<ol id='hosterPrefList'>";
  for (var i = 0, iLen = aHostersPref.length; i < iLen; i++)
  {
    var sHoster = aHostersPref[i];
    
    sNewListHtml += "<li" + (contains(aBlacklistedHosters, sHoster) ? " class='blacklisted'>" : ">") +
    sHoster + "<div class='blacklistButton'></div></li>";
  }
  sNewListHtml += "</ol>";
  
  var jNewHosterList = $(sNewListHtml)
    .click(function (oEvent)
    {
      var jClicked = $(oEvent.target);
      if (jClicked.hasClass("blacklistButton"))
        jClicked.parent().toggleClass("blacklisted");
    }
    )
    .sortable({
      pullPlaceholder : false,
      onDragStart : function(item, container)
      {
        container.el.addClass("dragging");
        var jPlaceholder = container.group.placeholder;
        jPlaceholder.text(item.text());
        if (item.is(".blacklisted"))
          jPlaceholder.addClass("blacklisted");
        item.hide();
      },
      onDrop : function(item, container)
      {
        container.el.removeClass("dragging");
        container.group.placeholder.removeClass("blacklisted");
        item.show();
      }
    });
  
  sNewListHtml = "<ol id='trackedList'>";
  for (var sId in oTrackedSeries)
  {
    sNewListHtml += "<li id='" + sId + "'>" + oTrackedSeries[sId].sTitle + "</li>";
  }
  sNewListHtml += "</ol>";
  
  var jNewTrackedList = $(sNewListHtml)
    .sortable({
      pullPlaceholder : false,
      onDragStart : function(item, container)
      {
        container.el.addClass("dragging");
        var jPlaceholder = container.group.placeholder;
        jPlaceholder.text(item.text());
        item.hide();
      },
      onDrop : function(item, container)
      {
        container.el.removeClass("dragging");
        item.show();
      }
    });
  
  with ($("#settings"))
  {
    find("#showHrefCheckBox").prop("checked", bShowHref);
    find("#showPrefCheckBox").prop("checked", bShowPreferedHoster);
    find("#showLogosCheckBox").prop("checked", bShowHosterLogos);
    find("#timeoutInput").val(iResponseTimeout / 1000);
    find("#updateIntervalInput").val(iUpdateInterval / 60000);
    find("#singleColumnCheckBox").prop("checked", bSingleColumn);
    find("#colorLinksCheckBox").prop("checked", bColorLinks);
    find("#colorSection").toggle(bColorLinks);
    find("#linkColor").minicolors("value", sLinkColor);
    find("#visitedColor").minicolors("value", sVisitedColor);
    find("#hoverColor").minicolors("value", sHoverColor);
    find("#activeColor").minicolors("value", sActiveColor);
    
    find("#hosterPrefList").replaceWith(jNewHosterList);
    find("#trackedList").replaceWith(jNewTrackedList);
  }
}

function saveSettings()
{
  with ($("#settings"))
  {
    bShowHref = find("#showHrefCheckBox").prop("checked");
    GM_setValue("show href", bShowHref);
    
    bShowPreferedHoster = find("#showPrefCheckBox").prop("checked");
    GM_setValue("show prefered hoster", bShowPreferedHoster);
    
    bShowHosterLogos = find("#showLogosCheckBox").prop("checked");
    GM_setValue("show hoster logos", bShowHosterLogos);
    
    iResponseTimeout = find("#timeoutInput").val() * 1000;
    GM_setValue("response timeout", iResponseTimeout);
    
    iUpdateInterval = Number(find("#updateIntervalInput").val() * 60000);
    GM_setValue("update interval", iUpdateInterval);
    
    bSingleColumn = find("#singleColumnCheckBox").prop("checked");
    GM_setValue("single column", bSingleColumn);
    
    bColorLinks = find("#colorLinksCheckBox").prop("checked");
    GM_setValue("color links", bColorLinks);
    
    sLinkColor = find("#linkColor").val();
    GM_setValue("link color", sLinkColor);
    
    sVisitedColor = find("#visitedColor").val();
    GM_setValue("visited color", sVisitedColor);
    
    sHoverColor = find("#hoverColor").val();
    GM_setValue("hover color", sHoverColor);
    
    sActiveColor = find("#activeColor").val();
    GM_setValue("active color", sActiveColor);
    
    var jHosterElems = find("#hosterPrefList li");
    if (jHosterElems.length == 0)
    {
      GM_deleteValue("hosters");
      GM_deleteValue("blacklisted hosters");
    }
    else
    {
      aHostersPref = new Array();
      aBlacklistedHosters = new Array();
      
      jHosterElems.quickEach(function ()
      {
        var sText = this.text();
        
        aHostersPref.push(sText);
        
        if (this.hasClass("blacklisted"))
          aBlacklistedHosters.push(sText);
      }
      );
      
      saveObject("hosters", aHostersPref);
      saveObject("blacklisted hosters", aBlacklistedHosters);
    }
    
    var jTrackedElems = find("#trackedList li");
    var oOrderedTrackedSeries = new Object();
    jTrackedElems.each(function ()
    {
      var sId = this.id;
      oOrderedTrackedSeries[sId] = oTrackedSeries[sId];
    }
    );
    saveObject("tracked series", oOrderedTrackedSeries);
  }
  
  location.reload();
}

function loadSettings()
{
  oMsgs = oLangs[GM_getValue("language", "english")];
  bShowHref = GM_getValue("show href", bShowHref);
  bShowPreferedHoster = GM_getValue("show prefered hoster", bShowPreferedHoster);
  bShowHosterLogos = GM_getValue("show hoster logos", bShowHosterLogos);
  iResponseTimeout = GM_getValue("response timeout", iResponseTimeout);
  iUpdateInterval = GM_getValue("update interval", iUpdateInterval);
  bSingleColumn = GM_getValue("single column", bSingleColumn);
  bColorLinks = GM_getValue("color links", bColorLinks);
  sLinkColor = GM_getValue("link color", sLinkColor);
  sVisitedColor = GM_getValue("visited color", sVisitedColor);
  sHoverColor = GM_getValue("hover color", sHoverColor);
  sActiveColor = GM_getValue("active color", sActiveColor);
  
  aHostersPref = loadObject("hosters", aHostersPref);
  aBlacklistedHosters = loadObject("blacklisted hosters", aBlacklistedHosters);
  oTrackedSeries = loadObject("tracked series", oTrackedSeries);
  if (oTrackedSeries instanceof Array)
  {
    // backwards compatibility, array to object conversion
    var aTrackedSeries = oTrackedSeries;
    oTrackedSeries = new Object();
    for (var i = aTrackedSeries.length; i--; )
      oSeries = oTrackedSeries[aTrackedSeries[i]] = new Object();
    saveObject("tracked series", oTrackedSeries);
  }
  oBlacklistedReleases = loadObject("blacklisted releases", oBlacklistedReleases);
  if (oBlacklistedReleases instanceof Array)
  {
    oBlacklistedReleases = new Object();
    saveObject("blacklisted releases", oBlacklistedReleases);
  }
  oBlacklistedSeasons = loadObject("blacklisted seasons", oBlacklistedSeasons);
  oLastTimesChecked = loadObject("last times checked", oLastTimesChecked);
}

function loadObject(sName, oDefault)
{
  var oValue = GM_getValue(sName);
  
  if (oValue === undefined)
    return oDefault;
  
  if (typeof oValue == "string" &&
    !/[\{\}\[\]]/.test(oValue))
    //backwards compatibility
    return oValue.split(";");
  
  try
  {
    return JSON.parse(oValue);
  }
  catch (ex)
  {
    return oDefault;
  }
}

function saveObject(sName, oValue)
{
  if (oValue !== undefined)
    GM_setValue(sName, JSON.stringify(oValue));
}

function openSettings()
{
  updateSettingsNode();
  
  if (bTransitionSupported)
  {
    $("#settings").css("right", "10px");
    $("#buttonSection").css("right", "-42px");
  }
  else
  {
    $("#settings").animate(
    {
      right : "10px"
    }, 1000);
    setTimeout(function ()
    {
      $("#buttonSection").animate(
      {
        right : "-42px"
      }, 200);
    }, 300);
  }
}

function closeSettings()
{
  if (bTransitionSupported)
  {
    $("#settings").css("right", "-500px");
    $("#buttonSection").css("right", "0px");
  }
  else
  {
    $("#settings").animate(
    {
      right : "-500px"
    }, 1000);
    setTimeout(function ()
    {
      $("#buttonSection").animate(
      {
        right : "0px"
      }, 200);
    }, 300);
  }
}

// --- /settings functions ---

// --- new link checking functions ---

/*
update state (most IDs are Murmur3 hashes):
{
    sSeasonId:
    {
        sReleaseId:
        {
            sHosterId: [sLinkId, sLinkId, ...],
            ...
        },
        sReleaseId:
        {
            ...
        },
        ...
    },
    sSeasonId:
    {
        ...
    },
    ...
}
 */

function insertTrackButton(bChecked)
{
  var jTrackButton =
    $("<div id='trackButton' class='button" +
      (bChecked ? " checked " : "") + "' title='" + oMsgs.updateAlert + "'></div>")
    .click(function ()
    {
      trackButtonClicked(jTrackButton)
    }
    );
  
  $("#buttonSection").prepend(jTrackButton);
}

function insertUpdateAlertBar(bAnimated)
{
  var jBar = $("<div id='updateAlertBar' class='bar'>" +
      "<div id='updateCount' class='waiting' " +
      "title='" + oMsgs.nextCheck + ": " + getNextCheckTime(sSeriesId) + "'></div>" +
      "<div class='updateListWrapper' style='display: none;'>" +
      "<table cellpadding='0' cellspacing='0' class='updateList'><tbody /></table>" +
      "</div>" +
      "</div>")
    .hover(function ()
    {
      openUpdateAlertBar();
    }, function ()
    {
      closeUpdateAlertBar();
    }
    );
  
  if (bAnimated)
    jBar
    .css(
    {
      height : "0px",
      "margin-right" : "-42px"
    }
    )
    .insertAfter("#trackButton")
    .animate(
    {
      height : "32px"
    }, 200)
    .animate(
    {
      marginRight : "0px"
    }, 200, function ()
    {
      jBar.css("height", "");
    }
    );
  else
    jBar.insertAfter("#trackButton");
}

function removeUpdateAlertBar()
{
  closeUpdateAlertBar();
  var jBar = $("#updateAlertBar")
    .animate(
    {
      marginRight : "-42px"
    }, 200)
    .animate(
    {
      height : "0px"
    }, 200, function ()
    {
      jBar.remove();
    }
    );
}

function openUpdateAlertBar()
{
  with ($(".updateListWrapper"))
  {
    if (find(".updateItem").length == 0 || is(":visible"))
      return;
    
    var jWindow = $(window),
    iWidth = Math.min(jWindow.width(), width() + 60),
    iHeight = height(),
    iMaxHeight = jWindow.height() / 3;
    
    if (iHeight > iMaxHeight)
    {
      iHeight = iMaxHeight;
      iWidth += 20;
    }
    
    show()
    .css(
    {
      height : "0px",
      width : "0px"
    });
    
    find(".updateList")
    .css("width", "100%");
    
    animate(
    {
      width : iWidth + "px",
      height : iHeight + "px"
    }, 500, function ()
    {
      css("overflow-y", "auto");
    });
  }
}

function closeUpdateAlertBar()
{
  with ($(".updateListWrapper"))
  {
    stop().hide(500, function ()
    {
      css(
      {
        width : "",
        height : ""
      }
      );
      
      find(".updateList")
      .css("width", "");
    }
    );
  }
}

function getCoverUrl()
{
  var aImgs = document.getElementsByTagName("img");
  for (var i = 0, iLen = aImgs.length; i < iLen; i++)
  {
    var nImg = aImgs[i];
    if (nImg.alt === "Cover")
      return nImg.src;
  }
}

function trackButtonClicked(jTrackButton)
{
  if (jTrackButton.hasClass("checked"))
  {
    removeUpdateAlertBar();
    
    delete oTrackedSeries[sSeriesId];
    
    deleteUpdateCache(sSeriesId);
    deleteUpdateState(sSeriesId);
  }
  else
  {
    if (bOnSeriesPageOne)
    {
      saveUpdateState(sSeriesId, createUpdateState(oSeries));
      oLastTimesChecked[sSeriesId] = new Date().getTime();
      saveObject("last times checked", oLastTimesChecked);
      
      insertUpdateAlertBar(true);
    }
    else
    {
      insertUpdateAlertBar(true);
      
      var jUpdateCount = $("#updateCount")
        .attr(
        {
          class : "loading",
          title : oMsgs.loading
        }
        );
      
      requestSeries(sSeriesId, function (oSeries)
      {
        var iNow = new Date().getTime();
        
        saveUpdateState(sSeriesId, createUpdateState(oSeries));
        oLastTimesChecked[sSeriesId] = iNow;
        saveObject("last times checked", oLastTimesChecked);
        
        jUpdateCount.attr(
        {
          class : "waiting",
          title : oMsgs.nextCheck + ": " + getNextCheckTime(sSeriesId)
        }
        );
      }
      );
    }
    
    oTrackedSeries[sSeriesId] =
    {
      "sTitle" : getSeriesTitle(),
      "sCoverUrl" : getCoverUrl()
    };
  }
  
  jTrackButton.toggleClass("checked");
  
  saveObject("tracked series", oTrackedSeries);
}

function setUpdateCount(iUpdateCount, jUpdateCount)
{
  if (iUpdateCount == 0)
    jUpdateCount
    .text("")
    .attr(
    {
      class : "waiting",
      title : oMsgs.nextCheck + ": " + getNextCheckTime(sSeriesId)
    }
    );
  else
    jUpdateCount
    .text(iUpdateCount)
    .attr(
    {
      class : "",
      title : iUpdateCount + " " + oMsgs.update + (iUpdateCount != 1 ? "s" : "")
    }
    );
}

function allUpdateItemsRemoved(jUpdateList)
{
  if (bOnHomePage)
    jUpdateList
    .parent()
    .slideUp(200, function ()
    {
      jUpdateList.parents(".trackedSeries").removeClass("hasUpdates");
    });
  else
    closeUpdateAlertBar();
}

function addUpdateToList(sSeriesId, sId, sType, sText, sUrl, jUpdateCount, jUpdateList, fOnRemove)
{
  if (bOnHomePage)
  {
    var sLinkHtml = "<a class='updateLink' " +
      "href='" + sUrl + "?spotOn=" + sId + "&type=" + sType + "' " +
      "title='" + sText + "' " +
      "target='_blank'>" + sText + "</a>";
  }
  else
  {
    var sLinkHtml = "<a class='updateLink' " +
      "href='javascript:void(0);' " +
      "title='" + sText + "'>" + sText + "</a>";
  }
  
  var jUpdateItem = $("<tr class='updateItem' id='update" + sId + "'>" +
      "<td class='updateType'>[" + oMsgs.updateType[sType] + "]</td>" +
      "<td class='updateLinkData'>" + sLinkHtml + "</td>" +
      "<td class='removeButton' />" +
      "</tr>");
  
  function onRemoveButtonClick()
  {
    fOnRemove();
    var iNewUpdateCount = jUpdateList.find(".updateItem").length - 1;
    
    setUpdateCount(iNewUpdateCount, jUpdateCount);
    
    if (iNewUpdateCount == 0)
      allUpdateItemsRemoved(jUpdateList);
    else
      jUpdateItem
      .fadeOut(200);
    
    jUpdateItem.attr("class", "byUserRemovedUpdateItem");
  }
  
  if (bOnHomePage)
  {
      jUpdateItem.children(".removeButton").click(onRemoveButtonClick);
  }
  else
  {
    jUpdateItem.click(function (oEvent)
    {
      var nTarget = oEvent.target;
      
      if (nTarget.nodeType != 1)
        return;
      
      switch (nTarget.className)
      {
      case "updateLink":
        updateLinkClicked(sId, sType, sUrl);
        break;
      case "removeButton":
        onRemoveButtonClick();
        break;
      }
    }
    );
  }
  
  jUpdateList.append(jUpdateItem);
}

function storeUpdate(oCache, oUpdate)
{
  var iKey = 0;
  while (oCache[iKey] !== undefined)
    iKey++;
  
  oCache[iKey] = oUpdate;
  
  return iKey.toString();
}

function deleteUpdate(oCache, sSeriesId, sUpdateKey, bDeleteAll)
{
  if (bDeleteAll)
    GM_deleteValue("update cache : " + sSeriesId);
  else
  {
    delete oCache[sUpdateKey];
    saveUpdateCache(sSeriesId, oCache)
  }
}

function updateLinkClicked(sId, sType, sUrl)
{
  var jTarget = $("#" + sId);
  
  if (jTarget.length == 0)
  {
    if (sUrl !== undefined)
    {
      var sGet = "?spotOn=" + sId + "&type=" + sType;
      
      location.href = sUrl + sGet;
      closeUpdateAlertBar();
    }
    return;
  }
  
  if (!bOnHomePage)
    closeUpdateAlertBar();
  
  var bIsLink = sType == "link";
  if (sType == "mirror" || bIsLink)
  {
    var jMirrorSection = jTarget;
    
    if (bIsLink)
      jMirrorSection = jMirrorSection.parent();
    
    var sHosterId = jMirrorSection.attr("id"),
    jReleaseSection = jMirrorSection.parents(".releaseSection"),
    jHosterButton = jReleaseSection.find(".hosterButton#button" + sHosterId);
    
    showHoster(jHosterButton, jMirrorSection);
  }
  
  spotElement(jTarget);
}

function isItUpdateCheckTime(sSeriesId)
{
  var iNow = new Date().getTime(),
  iLastTimeChecked = oLastTimesChecked[sSeriesId];
  
  if (iLastTimeChecked !== undefined)
  {
    var iNextPlannedCheck = iLastTimeChecked + iUpdateInterval;
    return iNow >= iNextPlannedCheck;
  }
  return true;
}

function getNextCheckTime(sSeriesId)
{
  var oNow = new Date(),
  iLastTimeChecked = oLastTimesChecked[sSeriesId],
  sNextCheckTime = oMsgs.nextLoad;
  
  if (iLastTimeChecked === undefined)
    var oNextCheckTime = new Date(oNow.getTime() + iUpdateInterval);
  else
    var oNextCheckTime = new Date(iLastTimeChecked + iUpdateInterval);
  
  if (oNextCheckTime > oNow)
    sNextCheckTime = oNextCheckTime.toLocaleString();
  
  return sNextCheckTime;
}

function checkSeriesForUpdates(sSeriesId, jUpdateCount, jUpdateList, oSeries)
{
  if (oSeries === undefined)
  {
    jUpdateCount
    .attr(
    {
      class : "loading",
      title : oMsgs.loading
    }
    )
    .text("");
    
    requestSeries(sSeriesId, function (oSeries)
    {
      checkSeriesForUpdates(sSeriesId, jUpdateCount, jUpdateList, oSeries);
    }, function (sStatus)
    {
      jUpdateCount
      .attr(
      {
        class : "failed",
        title : oMsgs.error + ": " + sStatus
      }
      )
      .text("");
    }
    );
    return;
  }
  
  var oPrevUpdateState = loadUpdateState(sSeriesId);
  
  if (oPrevUpdateState === undefined)
  {
    // something went wrong with saving the last time
    jUpdateCount
    .attr(
    {
      class : "failed",
      title : oMsgs.error + ", " + oMsgs.pleaseReload
    }
    )
    .text("");
    var oUpdateState = createUpdateState(oSeries);
    saveUpdateState(sSeriesId, oUpdateState);
    return;
  }
  
  var oUpdateCounts = compareSeriesWithUpdateState(oSeries, oPrevUpdateState, jUpdateCount, jUpdateList);
  iUpdateCount = oUpdateCounts.iUpdateCount,
  iOldUpdateCount = oUpdateCounts.iOldUpdateCount;
  
  setUpdateCount(iUpdateCount, jUpdateCount);
  
  
  if (iUpdateCount != 0)
  {
    if (bOnHomePage)
    {
      var jUpdateListWrapper = jUpdateList.parent();
      
      jUpdateListWrapper
      .slideDown(500,
      function ()
      {
        $(this).css("display", "");
      })
      .parents(".trackedSeries")
      .addClass("hasUpdates");
    }
    
    if (iUpdateCount > iOldUpdateCount)
      setTimeout(function ()
      {
        // blink only if we have new updates
        if (bOnHomePage)
          flashElement(jUpdateListWrapper);
        else
          flashElement($("#updateAlertBar"));
      }, 1000);
  }
  
  oLastTimesChecked[sSeriesId] = new Date().getTime();
  saveObject("last times checked", oLastTimesChecked);
}

function flashElement(jElement)
{
  var  sHighlightColor = bColorLinks ? sActiveColor : (bOnDokuJunkies ? "#226CA8" : "#8A3207");
  
  function lightOn()
  {
    jElement
    .css(
    {
      backgroundColor : sHighlightColor,
      borderColor : sHighlightColor,
      boxShadow : "0 0 3px " + sHighlightColor
    }
    );
  }
  
  function lightOff()
  {
    jElement
    .css(
    {
      backgroundColor : "white",
      borderColor : "white",
      boxShadow : "0 0 3px white"
    }
    );
  }
  
  jElement.css(
  {
    backgroundColor : "white",
    borderColor : "white",
    opacity : "1"
  }
  );
  
  for (var i = 1; i <= 5; i += 2)
  {
    setTimeout(lightOn, i * 250);
    setTimeout(lightOff, (i + 1) * 250);
  }
  
  setTimeout(function ()
  {
    jElement.css(
    {
      backgroundColor : "",
      borderColor : "",
      opacity : "",
      boxShadow : ""
    }
    );
  }, i * 250);
}

function compareSeriesWithUpdateState(oSeries, oOldUpdateState, jUpdateCount, jUpdateList)
{
  var sSeriesId = oSeries.getId(),
  iUpdateCount = 0,
  oNewUpdateState = createUpdateState(oSeries),
  oCache = new Object(),
  bAddedLinks = false,
  jUpdateListBody = jUpdateList.first();
  
  $(oSeries.getSeasons()).each(function ()
  {
    var oSeason = this,
    sSeasonId = oSeason.getId();
    
    if (oSeason.isBlacklisted())
    {
      oOldUpdateState[sSeasonId] = oNewUpdateState[sSeasonId];
      bAddedLinks = true;
      return true;
    }
    
    var sSeasonTitle = oSeason.getTitle(),
    sSeasonUrl = oSeason.getUrl(),
    oReleases = oOldUpdateState[sSeasonId];
    
    if (oReleases === undefined)
    {
      // found new season!
      
      var sUpdateKey = storeUpdate(oCache,
          new Update(sSeasonId, "season", sSeasonTitle, sSeasonUrl,
          {
            "sSeasonId" : sSeasonId,
            "oSeason" : oNewUpdateState[sSeasonId]
          }
          ));
      
      addUpdateToList(sSeriesId, sSeasonId, "season", sSeasonTitle, sSeasonUrl, jUpdateCount, jUpdateListBody,
        function ()
      {
        deleteUpdate(oCache, sSeriesId, sUpdateKey, --iUpdateCount == 0)
        
        oOldUpdateState[sSeasonId] = oNewUpdateState[sSeasonId];
        saveUpdateState(sSeriesId, oOldUpdateState);
      }
      );
      
      iUpdateCount++;
      return true;
    }
    
    $(oSeason.getReleaseSections()).each(function ()
    {
      var oReleaseSection = this,
      sReleaseId = oReleaseSection.getId();
      
      if (oReleaseSection.isBlacklisted())
      {
        oReleases[sReleaseId] = oNewUpdateState[sSeasonId][sReleaseId];
        bAddedLinks = true;
        return true;
      }
      
      var oRelease = oReleases[sReleaseId];
      
      if (oRelease === undefined)
      {
        // found a new release!
        
        var sUpdateKey = storeUpdate(oCache,
            new Update(sReleaseId, "release", sSeasonTitle, sSeasonUrl,
            {
              "sSeasonId" : sSeasonId,
              "sReleaseId" : sReleaseId,
              "oRelease" : oNewUpdateState[sSeasonId][sReleaseId]
            }
            ));
        
        addUpdateToList(sSeriesId, sReleaseId, "release", sSeasonTitle, sSeasonUrl, jUpdateCount, jUpdateListBody,
          function ()
        {
          deleteUpdate(oCache, sSeriesId, sUpdateKey, --iUpdateCount == 0)
          
          oReleases[sReleaseId] = oNewUpdateState[sSeasonId][sReleaseId];
          saveUpdateState(sSeriesId, oOldUpdateState);
        }
        );
        
        iUpdateCount++;
        return true;
      }
      
      var oAddedLinks = new Object();
      
      $(oReleaseSection.getMirrorSections()).each(function ()
      {
        var oMirrorSection = this;
        
        if (oMirrorSection.getHosterName() == "firstload.com")
          return true;
        
        var sHosterId = oMirrorSection.getId(),
        aLinkIds = oRelease[sHosterId];
        
        if (aLinkIds == undefined)
        {
          // found a new mirror section!
          
          var sTitle = sSeasonTitle + " - [" + oMirrorSection.getHosterName() + "]",
          sUpdateKey = storeUpdate(oCache,
              new Update(sHosterId, "mirror", sTitle, sSeasonUrl,
              {
                "sSeasonId" : sSeasonId,
                "sReleaseId" : sReleaseId,
                "sHosterId" : sHosterId,
                "oMirror" : oNewUpdateState[sSeasonId][sReleaseId][sHosterId]
              }
              ));
          
          addUpdateToList(sSeriesId, sHosterId, "mirror", sTitle, sSeasonUrl, jUpdateCount, jUpdateListBody,
            function ()
          {
            deleteUpdate(oCache, sSeriesId, sUpdateKey, --iUpdateCount == 0)
            
            oRelease[sHosterId] = oNewUpdateState[sSeasonId][sReleaseId][sHosterId];
            saveUpdateState(sSeriesId, oOldUpdateState);
          }
          );
          
          iUpdateCount++;
          return true;
        }
        
        $(oMirrorSection.getMirrorLinks()).each(function ()
        {
          var oMirrorLink = this,
          sLinkId = oMirrorLink.getId(),
          sLinkTitle = oMirrorLink.getTitle();
          
          if (!contains(aLinkIds, sLinkId))
          {
            // found new link!
            
            if (oAddedLinks[sLinkTitle] !== undefined)
            {
              // got a less-preferred mirror of an episode that is already added,
              // just ignore it and append it to the update state
              aLinkIds.push(sLinkId);
              bAddedLinks = true;
              return true;
            }
            
            var sUpdateKey = storeUpdate(oCache,
                new Update(sLinkId, "link", sLinkTitle, sSeasonUrl,
                {
                  "sSeasonId" : sSeasonId,
                  "sReleaseId" : sReleaseId,
                  "sHosterId" : sHosterId,
                  "sLinkId" : sLinkId
                }
                ));
            
            addUpdateToList(sSeriesId, sLinkId, "link", sLinkTitle, sSeasonUrl, jUpdateCount, jUpdateListBody,
              function ()
            {
              deleteUpdate(oCache, sSeriesId, sUpdateKey, --iUpdateCount == 0)
              
              aLinkIds.push(sLinkId);
              saveUpdateState(sSeriesId, oOldUpdateState);
            }
            );
            
            oAddedLinks[sLinkTitle] = null;
            
            iUpdateCount++;
          }
        }
        );
      }
      );
    }
    );
  }
  );
  
  if (bAddedLinks)
    saveUpdateState(sSeriesId, oOldUpdateState);
  
  var oOldCache = loadUpdateCache(sSeriesId),
  iOldUpdateCount = 0;
  
  if (oOldCache !== undefined)
    for (var sKey in oOldCache)
      iOldUpdateCount++;
  
  if (iUpdateCount == 0)
    deleteUpdateCache(sSeriesId);
  else
    saveUpdateCache(sSeriesId, oCache);
  
  return {
    "iUpdateCount" : iUpdateCount,
    "iOldUpdateCount" : iOldUpdateCount
  };
}

function insertSpotOverlay()
{
  var jOverlay = $("<div id='spotOverlay' style='display: none; opacity: 0;'>" +
      "<div id='top' style='height: 0px'></div>" +
      "<div id='left' style='width: 0px; height: 0px;'></div>" +
      "<div id='spotlight'></div>" +
      "<div id='right' style='width: 0px; height: 0px;'></div>" +
      "<div id='bottom' style='height: 0px'></div>" +
      "</div>");
  
  // I don't know why bind doesn't work here
  function onTransitionEnd()
  {
    if (jOverlay.css("opacity") == "0")
      jOverlay.hide();
  }
  
  with (jOverlay[0])
  {
    addEventListener("transitionend", onTransitionEnd, false);
    addEventListener("oTransitionEnd", onTransitionEnd, false);
    addEventListener("webkitTransitionEnd", onTransitionEnd, false);
  }
  
  $("body").append(jOverlay);
}

function hideSpotOverlay()
{
  with ($("#spotOverlay"))
  {
    if (bTransitionSupported)
      css("opacity", "0");
    else
      fadeOut(200);
  }
}

function spotElement(jTarget)
{
  var jWindow = $(window),
  jOverlay = $("#spotOverlay");
  
  with (jOverlay)
  {
    if (bTransitionSupported)
    {
      show();
      setTimeout(function ()
      {
        css("opacity", "1");
      }, 0);
    }
    else
    {
      css("opacity", "1");
      fadeIn(200);
    }
  }
  
  function moveSpotToTarget()
  {
    moveSpot(jTarget);
  }
  
  jWindow.on("scroll resize", moveSpotToTarget);
  
  var iTargetHeight = jTarget.outerHeight(),
  iScreenHeight = jWindow.height(),
  iScrollOffset = -20;
  
  if (iTargetHeight < iScreenHeight)
    // center target vertically if smaller than screen
    iScrollOffset = iTargetHeight / 2 - iScreenHeight / 2;
  
  var iTimeoutId = -1,
  bCleanedUp = false;
  
  function cleanUp()
  {
    bCleanedUp = true;
    jOverlay.off("click", cleanUp);
    if (iTimeoutId != -1)
      clearTimeout(iTimeoutId);
    hideSpotOverlay();
    setTimeout(function ()
    {
      jWindow.off("scroll resize", moveSpotToTarget);
    }, 200);
  }
  
  $.smoothScroll(
  {
    scrollTarget: jTarget,
    speed: 1000,
    offset : iScrollOffset,
    afterScroll : function ()
    {
      if (!bCleanedUp)
      {
        iTimeoutId = setTimeout(function()
        {
          cleanUp();
        }, 2000);
      }
    }
  }
  );
  
  jOverlay.on("click", cleanUp);
}

function moveSpot(jTarget)
{
  var iSpotPadding = 5,
  jWindow = $(window),
  jOverlay = $("#spotOverlay");
  
  with (jOverlay)
  var jSpotlight = children("#spotlight"),
  jTop = children("#top"),
  jBottom = children("#bottom"),
  jLeft = children("#left"),
  jRight = children("#right");
  
  with (jWindow)
  var iScreenWidth = width(),
  iScreenHeight = height();
  
  with (jTarget.offset())
  var iSpotLeft = left - iSpotPadding,
  iSpotTop = top - jWindow.scrollTop() - iSpotPadding;
  
  var iSpotWidth = jTarget.outerWidth() + iSpotPadding * 2,
  iSpotHeight = jTarget.outerHeight() + iSpotPadding * 2;
  
  if (iSpotTop < 0)
  {
    // spot is on top of the screen
    iSpotHeight = Math.max(iSpotHeight + iSpotTop, 0);
    iSpotTop = 0;
  }
  else if (iSpotTop > iScreenHeight)
  {
    // spot is below the screen
    jTop.height(iScreenHeight);
    return;
  }
  
  if (iSpotLeft < 0)
  {
    iSpotWidth = Math.max(iSpotWidth + iSpotLeft, 0);
    iSpotLeft = 0;
  }
  
  jSpotlight.css(
  {
    width : iSpotWidth,
    height : iSpotHeight
  }
  );
  jTop.height(iSpotTop);
  jLeft.width(iSpotLeft);
  jRight.width(iScreenWidth - iSpotWidth - iSpotLeft);
  jLeft.add(jRight).height(iSpotHeight);
  jBottom.height(iScreenHeight - iSpotHeight - iSpotTop);
}

function saveUpdateState(sSeriesId, oUpdateState)
{
  return saveObject("update state : " + sSeriesId, oUpdateState);
}

function loadUpdateState(sSeriesId)
{
  return loadObject("update state : " + sSeriesId);
}

function deleteUpdateState(sSeriesId)
{
  return GM_deleteValue("update state : " + sSeriesId);
}

function saveUpdateCache(sSeriesId, oCache)
{
  return saveObject("update cache : " + sSeriesId, oCache);
}

function loadUpdateCache(sSeriesId, oDefault)
{
  return loadObject("update cache : " + sSeriesId, oDefault);
}

function deleteUpdateCache(sSeriesId)
{
  return GM_deleteValue("update cache : " + sSeriesId);
}

function createUpdateState(oSeries)
{
  var oUpdateState = new Object();
  
  $(oSeries.getSeasons()).each(function ()
  {
    var oSeason = this,
    sSeasonId = oSeason.getId(),
    oReleases = oUpdateState[sSeasonId] = new Object();
    
    $(oSeason.getReleaseSections()).each(function ()
    {
      var oReleaseSection = this,
      sReleaseId = oReleaseSection.getId(),
      oMirrors = oReleases[sReleaseId] = new Object();
      
      $(oReleaseSection.getMirrorSections()).each(function ()
      {
        var oMirrorSection = this,
        sHosterId = oMirrorSection.getId();
        
        if (oMirrorSection.getHosterName() == "firstload.com")
          return true;
        
        var aLinks = $(oMirrorSection.getMirrorLinks())
          .map(function ()
          {
            return this.getId();
          }
          ).get();
        
        oMirrors[sHosterId] = aLinks;
      }
      );
    }
    );
  }
  );
  
  return oUpdateState;
}

function insertUpdateCache(sSeriesId, jUpdateCount, jUpdateList)
{
  var oUpdates = loadUpdateCache(sSeriesId);
  
  if (oUpdates === undefined)
    return;
  
  var oUpdateState = loadUpdateState(sSeriesId, new Object()),
  iUpdateCount = 0,
  jUpdateListBody = jUpdateList.first();
  
  $.each(oUpdates, function (sKey, oCashUpdate)
  {
    with (oCashUpdate)
    {
      addUpdateToList(sSeriesId, sId, sType, sText, sUrl, jUpdateCount, jUpdateListBody,
        function ()
      {
        // remove the update from the cache ...
        if (--iUpdateCount == 0)
          deleteUpdateCache(sSeriesId);
        else
        {
          delete oUpdates[sKey];
          saveUpdateCache(sSeriesId, oUpdates)
        }
        
        // ... and insert the update state fragment into the update state
        with (oUpdateStateFragment)
        switch (sType)
        {
        case "season":
          oUpdateState[sSeasonId] = oSeason;
          break;
        case "release":
          oUpdateState[sSeasonId][sReleaseId] = oRelease;
          break;
        case "mirror":
          oUpdateState[sSeasonId][sReleaseId][sHosterId] = oMirror;
          break;
        case "link":
          oUpdateState[sSeasonId][sReleaseId][sHosterId].push(sLinkId);
          break;
        }
        
        saveUpdateState(sSeriesId, oUpdateState);
      }
      );
    }
    
    iUpdateCount++;
  }
  );
  
  if (bOnHomePage && iUpdateCount != 0)
  {
    jUpdateList
    .parents(".trackedSeries")
    .addClass("hasUpdates");
  }
  
  setUpdateCount(iUpdateCount, jUpdateCount);
}

function insertTrackOverview()
{
  function fOnClick()
  {
    var jButton = $(this);
    
    jSeries = jButton.parents(".trackedSeries");
    jTitle = jSeries.find(".trackedSeriesLink");
    
    jTitleEdit = jSeries.find(".titleEdit")
    .val(jTitle.text());
    
    jCoverEdit = jSeries.find(".coverEdit")
    .val(jSeries.css("background-image").replace(/url\(["']?([^)"']*)["']?\)/, "$1"));
    
    jTitleEdit.add(jCoverEdit).on("blur keypress", fOnBlurPress);
    
    if (jButton.hasClass("titleEditButton"))
    {
      jTitleEditButton = jButton.hide(),
      jCoverEditButton = jSeries.find(".coverEditButton").hide();
      
      jTitle.hide();
      jTitleEdit.show().focus();
    }
    else if (jButton.hasClass("coverEditButton"))
    {
      jTitleEditButton = jSeries.find(".titleEditButton").hide(),
      jCoverEditButton = jButton.hide();
      
      jCoverEdit.slideDown(200).focus();
    }
  }
  
  function fOnBlurPress(oEvent)
  {
    if (oEvent.type == "keypress")
    {
      var iKeyCode = oEvent.keyCode;
      if (iKeyCode == 27) // escape
      {
        jTitleEdit.add(jCoverEdit).off("blur keypress", fOnBlurPress);
        jTitle.show();
        jTitleEdit.hide();
        jCoverEdit.slideUp(200);
        jTitleEditButton.show();
        jCoverEditButton.show();
        return;
      }
      if (iKeyCode != 13) // return
        return;
    }
    
    jTitleEdit.add(jCoverEdit).off("blur keypress", fOnBlurPress);
    
    var sNewTitle = jTitleEdit.val(),
    sNewUrl = jCoverEdit.val();
    
    var oTrS = oTrackedSeries[jSeries.attr("id")];
    oTrS.sTitle = sNewTitle;
    oTrS.sCoverUrl = sNewUrl;
    saveObject("tracked series", oTrackedSeries);
    
    jTitleEdit.hide();
    jTitle.text(sNewTitle).show();
    jTitleEditButton.show();
    
    jCoverEdit.slideUp(200);
    jSeries.css("background-image", "url('" + sNewUrl + "')");
    jCoverEditButton.show();
  }
  
  var iTrackedSeries = 0;
  for (var o in oTrackedSeries)
    iTrackedSeries++;
  if (iTrackedSeries == 0)
    return;
  
  var sHtml = "<div id='trackOverview'>";
  for (var sId in oTrackedSeries)
  {
    var oTrS = oTrackedSeries[sId],
    sTitle = oTrS.sTitle;
    sHtml += "<div class='trackedSeries' id='" + escape(sId) + "' style='background-image: url(\"" + oTrS.sCoverUrl + "\");'>" +
      "<input type='text' class='coverEdit' style='display: none;' />" +
      "<div id='updateCount' class='waiting' " +
      "title='" + oMsgs.nextCheck + ": " + getNextCheckTime(sSeriesId) + "'></div>" +
      "<a target='_blank' class='trackedSeriesLink' href='" + getSeriesUrl(sId) + "'>" +
      (sTitle !== undefined ? sTitle : sId + " (" + oMsgs.pleaseRetrack + ")") +
      "</a>" +
      "<input type='text' class='titleEdit' style='display: none;' />" +
      "<div class='titleEditButton'></div>" +
      "<div class='coverEditButton'></div>" +
      "<div class='updateListWrapper'>" +
      "<table cellpadding='0' cellspacing='0' class='updateList'><tbody /></table>" +
      "</div>" +
      "</div>";
  }
  sHtml += "</div>";
  
  var jTrackOverview = $(sHtml),
  jSeries = null,
  jTitle = null,
  jTitleEditButton = null,
  jCoverEditButton = null,
  jTitleEdit = null,
  jCoverEdit = null;
  
  jTrackOverview.find(".titleEditButton, .coverEditButton").click(fOnClick);
  jTrackOverview.find(".titleEdit, .coverEdit").on("blur keypress", fOnBlurPress);
  
  if (bOnDokuJunkies)
    $("#page_desc").after(jTrackOverview);
  else
    $("#header").after(jTrackOverview);
}

function checkTrackedSeriesForUpdates()
{
  $(".trackedSeries").each(function ()
  {
    with ($(this))
    {
      var sId = unescape(attr("id")),
      jUpdateCount = find("#updateCount"),
      jUpdateList = find(".updateList");
    }
    
    if (isItUpdateCheckTime(sId))
      checkSeriesForUpdates(sId, jUpdateCount, jUpdateList);
    else
      insertUpdateCache(sId, jUpdateCount, jUpdateList);
  }
  );
}

function removeUnspottableUpdates()
{
  $(".updateListWrapper").each(function()
  {
    var jListWrapper = $(this),
    iNewCount = 0;
    jListWrapper.find(".updateItem, .removedUpdateItem")
    .quickEach(function()
    {
      var jItem = this,
      sId = jItem.attr("id").substr(6),
      jTarget = $("#" + sId);
      if (jTarget.length != 0 &&
        !jTarget.add(jTarget.parents()).is(".blacklisted.releaseSection, .blacklisted.season"))
      {
        jItem.attr("class", "updateItem").show();
        iNewCount++;
      }
      else
        jItem.attr("class", "removedUpdateItem").hide();
    });
    setUpdateCount(iNewCount, jListWrapper.siblings("#updateCount"));
  });
}

// --- /new link checking functions ---

// --- decrypting functions ---

/*
level 1 encrypted url: one episode, consisting of several parts
example: http://download.serienjunkies.org/f-b2a29b33b8a30a27/ul_FG10i-01.html

level 2 encrypted url: one part of an episode
example: http://download.serienjunkies.org/go-76744a397d954ba706682e14...

currently, it's one download per captcha
 */

function createDecryptButtonHtml()
{
  return "<button class='decryptButton'>" + oMsgs.decrypt + "</button>";
}

function decryptButtonClicked(jMirrorSection)
{
  setDecryptButtonsState(false);
  
  aLvl1UrlsToDecrypt = new Array();
  
  jMirrorSection.find("a.decryptable.mirrorLink").each(function ()
  {
    aLvl1UrlsToDecrypt.push(this.href);
  }
  );
  
  jMirrorSectionToDecrypt = jMirrorSection;
  jNextLinkToDecrypt = jMirrorSection.find("a.decryptable.mirrorLink").eq(0);
  decryptNextLvl1Url();
}

function setDecryptButtonsState(bEnabled)
{
  // for disabling all decryption buttons while decryption is running
  $(".decryptButton").prop("disabled", !bEnabled);
}

function decryptNextLvl1Url()
{
  var iConsecutiveCaptchaErrors = 0;
  
  var sUrl = aLvl1UrlsToDecrypt.shift();
  if (!sUrl)
  {
    // all links are decrypted
    jMirrorSectionToDecrypt.find(".decryptButton").remove();
    setDecryptButtonsState(true);
    return;
  }
  
  jNextLinkToDecrypt.addClass("loading");
  
  function request(sUrl)
  {
    GM_xmlhttpRequest(
    {
      method : "GET",
      url : sUrl,
      onload : checkDownloadPage,
      onerror : onError
    }
    );
  }
  
  function onCancel(sReason)
  {
    if (sReason == "limit")
      alert(oMsgs.limitExceeded);
    jNextLinkToDecrypt.removeClass("loading");
    setDecryptButtonsState(true);
  }
  
  function onError(oResponse)
  {
    alert(oResponse.finalUrl + "\n\n" + oMsgs.decryptError +
      oResponse.status + "\n" + oResponse.statusText);
    onCancel("error");
  }
  
  function checkDownloadPage(oResponse)
  {
    var sRespText = oResponse.responseText; // HTML of download page
    if (contains(sRespText, "Download-Limit &uuml;berschritten!"))
    {
      // download limit exceeded
      onCancel("limit");
    }
    else if (contains(sRespText, "Du hast die Seite zu schnell neu geladen!"))
    {
      if (++iConsecutiveCaptchaErrors == 5)
      {
        alert(oMsgs.captchaError);
        jNextLinkToDecrypt.removeClass("loading");
        setDecryptButtonsState(true);
        return;
      }
      
      // Script was too fast?! Trying again in a second...
      setTimeout(function ()
      {
        request(sUrl);
      }, 1000);
    }
    else if (contains(sRespText, "\"CINPUT\""))
    {
      // found a captcha
      iConsecutiveCaptchaErrors = 0;
      var sCaptchaUrl = "http://download.serienjunkies.org/";
      with (sRespText)
      sCaptchaUrl += substr(indexOf("/secure/") + 1);
      with (sCaptchaUrl)
      sCaptchaUrl = substr(0, indexOf('"'));
      
      with (sRespText)
      var sHash = substr(indexOf("NAME=\"s\" VALUE=\"") + 16);
      with (sHash)
      sHash = substr(0, indexOf('"'));
      
      promptForCaptcha(sCaptchaUrl, function (sCaptcha)
      {
        // submitting captcha
        GM_xmlhttpRequest(
        {
          method : "POST",
          url : sUrl,
          headers :
          {
            "Content-Type" : "application/x-www-form-urlencoded"
          },
          data : "s=" + sHash + "&c=" + sCaptcha + "&action=Download",
          
          // checking page again with submitted captcha,
          // in case it was wrong
          onload : checkDownloadPage,
          onerror : onError
        }
        );
      }, onCancel)
    }
    else
    {
      // captcha was solved earlier
      decryptLvl2Urls(filterLvl2Urls(sRespText), function (aDecryptedUrls)
      {
        // all level 2 urls are decrypted
        replaceNextEncrLink(aDecryptedUrls, filterFileNames(sRespText));
        decryptNextLvl1Url();
      },
        function ()
      {
        // an error occured
        onCancel("abort");
      }
      );
    }
  }
  
  request(sUrl);
}

function filterLvl2Urls(sRespText)
{
  var aUrls = sRespText.split("http://download.serienjunkies.org/go-");
  aUrls.shift(); // remove first item, the HTML before the first link
  for (var i = aUrls.length; i--; )
    aUrls[i] = aUrls[i].replace(/^([^"]*)"[\s\S]*/,
        "http://download.serienjunkies.org/go-$1");
  return aUrls;
}

function filterFileNames(sRespText)
{
  var aFileNames = sRespText.split("class=\"wrap filename\"");
  aFileNames.shift(); // remove first item, the HTML before the first link
  for (var i = aFileNames.length; i--; )
    aFileNames[i] = aFileNames[i].replace(/^[^>]*>([^<]*)<[\s\S]*/, "$1");
  return aFileNames;
}

function decryptLvl2Urls(aLvl2Urls, fOnFinished, fOnAbort)
{
  // decrypt the (level 2) urls of one episode;
  var iLvl2UrlCount = aLvl2Urls.length,
  aDecryptedUrls = new Array(iLvl2UrlCount),
  iDecrypted = 0,
  iThreads = Math.min(5, iLvl2UrlCount),
  
  aTimeoutIds = new Array(iThreads),
  aRequests = new Array(iThreads);
  
  function request(iThread, iUrlIndex)
  {
    // this has to be in a function, or else i would always be
    // aLvl2Urls.length, because of the asynchronous request
    aRequests[iThread] = GM_xmlhttpRequest(
      {
        method : "HEAD",
        url : aLvl2Urls[iUrlIndex],
        onload : function (oResponse)
        {
          clearTimeout(aTimeoutIds[iThread]);
          
          aDecryptedUrls[iUrlIndex] = oResponse.finalUrl;
          if (++iDecrypted == iLvl2UrlCount)
            fOnFinished(aDecryptedUrls);
          else if (iUrlIndex + iThreads < iLvl2UrlCount)
            request(iThread, iUrlIndex + iThreads);
        },
        onerror : function (oResponse)
        {
          abortAllRequests();
          alert(aLvl2Urls[iUrlIndex] + "\n" + oResponse.finalUrl + "\n\n" +
            oMsgs.decryptError + oResponse.status + "\n" + oResponse.statusText);
          fOnAbort();
        }
      }
      );
    
    aTimeoutIds[iThread] = setTimeout(function ()
      {
        // timed out
        abortAllRequests();
        alert(oMsgs.decryptAbort);
        fOnAbort();
      }, iResponseTimeout);
  }
  
  function abortAllRequests()
  {
    for (var i = iThreads; i--; )
    {
      clearTimeout(aTimeoutIds[i]);
      aRequests[i].abort();
    }
  }
  
  for (var i = iThreads; i--; )
    request(i, i);
}

function promptForCaptcha(sCaptchaUrl, fOnSubmit, fOnCancel)
{
  function cleanUp(fOnCleanedUp)
  {
    if (bTransitionSupported)
      jOverlay
        .on("transitionend", function onTransEnd()
        {
          if (jOverlay.css("opacity") == "0")
          {
            // clean up after transition
            jOverlay.hide();
            setTimeout(function ()
            {
              jCaptchaForm.remove();
              jOverlay.off("transitionend", onTransEnd);
              fOnCleanedUp();
            }, 0);
          }
        }
        )
        .css("opacity", "0");
    else
      jOverlay.fadeOut(200, function ()
      {
        jCaptchaForm.remove();
        fOnCleanedUp();
      }
      );
  }
  
  function onSubmit()
  {
    cleanUp(function ()
    {
      fOnSubmit(jCaptchaInput.val());
    }
    );
  }
  
  function onCancel()
  {
    cleanUp(function ()
    {
      fOnCancel("user");
    }
    );
  }
  
  function onLoad()
  {
   if (bTransitionSupported)
    {
      jOverlay.show();
      setTimeout(function ()
      {
        jOverlay.css("opacity", "1");
      }, 0);
    }
    else
    {
      jOverlay.css("opacity", "1");
      jOverlay.fadeIn(200);
    }
    
    jCaptchaInput.focus();
  }
  
  var jCaptchaForm = createCaptchaForm(onCancel, onSubmit),
  jCaptchaImg = jCaptchaForm.find("#captchaImg"),
  jCaptchaInput = jCaptchaForm.find("#captchaInput"),
  jOverlay = $("#captchaOverlay").append(jCaptchaForm);

  jCaptchaImg
  .load(onLoad)
  .attr("src", sCaptchaUrl);
}

function createCaptchaForm(fOnCancel, fOnSubmit)
{
  return $("<div id='captchaForm'>" +
    "<img id='captchaImg' />" +
    "<input id='captchaInput' type='text' maxLength='3' />" +
    "<button id='captchaSubmit'>" + oMsgs.submitCaptcha + "</button>" +
    "<br />" +
    "<button id='captchaCancel'>" + oMsgs.cancel + "</button>" +
    "</div>")
  .click(function (oEvent)
  {
    var jClicked = $(oEvent.target);
    
    switch (jClicked.attr("id"))
    {
    case "captchaSubmit":
      fOnSubmit();
      break;
    case "captchaCancel":
      fOnCancel();
      break;
    }
  }
  )
  .keypress(function (oEvent)
  {
    if (oEvent.keyCode == 13)
      // return key
      fOnSubmit();
    if (oEvent.keyCode == 27)
      // escape key
      fOnCancel();
  }
  );
}

function insertCaptchaOverlay()
{
  $("body").append("<div id='captchaOverlay' style='display: none; opacity: 0;'></div>");
}

function replaceNextEncrLink(aDecryptedUrls, aFileNames)
{
  if (jNextLinkToDecrypt.length == 0)
    return;
  
  var oDecrMirrorLink = new DecrMirrorLink(jNextLinkToDecrypt.attr("id"));
  
  for (var i = 0; i < aDecryptedUrls.length; i++)
  {
    // parts of episode
    var oMirror = new MirrorLink(aFileNames[i], aDecryptedUrls[i]);
    oDecrMirrorLink.addPart(oMirror);
  }
  
  var jDecrLinkSection = jMirrorSectionToDecrypt.find(".decrLinkSection");
  if (jDecrLinkSection.length == 0)
  {
    jDecrLinkSection = $("<div class='decrLinkSection'></div>");
    jNextLinkToDecrypt.before(jDecrLinkSection);
  }
  
  var jDecrLink = $(oDecrMirrorLink.toHtml())
    .css(
    {
      display : "none",
      margin : "0"
    }
    );
  
  jDecrLinkSection.append(jDecrLink);
  
  var iFullWidth = jDecrLink.outerWidth(),
  iFullHeight = jDecrLink.outerHeight();
  
  jDecrLink
  .css(
  {
    width : "1px",
    height : "0px",
    marginRight : iFullWidth + "px",
    marginBottom : "0px",
    opacity : "0",
    display : "",
  }
  )
  .animate(
  {
    height : iFullHeight + "px"
  }, 500)
  .animate(
  {
    width : iFullWidth + "px",
    marginRight : "20px",
    marginBottom : "10px",
    opacity : "1"
  }, 500, function ()
  {
    jDecrLink.css(
    {
      width : "",
      height : "",
      margin : "",
      opacity : "",
    }
    );
  }
  );
  
  var jOldNextLink = jNextLinkToDecrypt;
  jNextLinkToDecrypt = jNextLinkToDecrypt.next("a.decryptable.mirrorLink");
  
  jOldNextLink.removeClass("loading");
  jOldNextLink.slideUp(1000, function ()
  {
    jOldNextLink.remove();
  }
  );
}

function wasCaptchaSolved()
{
  return $("#CINPUT").length == 0;
}

function insertDecrButtonIntoDlPage()
{
  $("#cnlbtn").after(
    $("<button id='dlPageDecryptButton'>" + oMsgs.decrypt + "</button>")
    .click(function ()
    {
      with ($(this))
      {
        prop("disabled", true);
        append($("<img id='dlPageLoadingIcon' src='" + oIcons.loading + "' />"));
      }
      
      decryptDownloadPage();
    }
    ));
}

function decryptDownloadPage()
{
  var aUrls = new Array(),
  jTable = $("table").eq(0);
  
  $("form").each(function ()
  {
    if (this.action.substr(0, 37) == "http://download.serienjunkies.org/go-")
      aUrls.push(this.action);
  }
  );
  
  decryptLvl2Urls(aUrls, function (aDecrUrls)
  {
    // decryption finished
    
    var aTitles = $(".filename")
      
      .map(function ()
      {
        return getText(this);
      }
      ).get();
    
    var jButton = $("#dlPageDecryptButton").slideUp(200, function ()
      {
        jButton.remove();
      }
      );
    var jWrap = jTable.wrap("<div></div>").parent()
      .slideUp(500, function ()
      {
        var jList = createDlPageLinkList(aTitles, aDecrUrls);
        jTable.replaceWith(jList);
        jWrap.slideDown(500);
      }
      );
  }, function ()
  {
    // aborted due to error
    $("#dlPageDecryptButton").prop("disabled", false);
    $("#dlPageLoadingIcon").remove();
  }
  );
}

function createDlPageLinkList(aTitles, aUrls)
{
  var sHtml = "<div id='dlPageDecrLinkList'>";
  
  for (var i = 0; i < aUrls.length; i++)
    sHtml += new MirrorLink(aTitles[i], aUrls[i]).toHtml();
  
  return $(sHtml + "</div>");
}

// --- /decrypting functions ---

// --- parsing and rebuilding functions ---

function parseSeries(nContext, sSeriesId)
{
  // this has to be fast, so no jQuery
  
  var aPosts = nContext.getElementsByClassName("post"),
  oSeries = new Series(sSeriesId);
  
  for (var i = 0, iPostCount = aPosts.length; i < iPostCount; i++)
  {
    var nPost = aPosts[i];
    
    var nTitleLink = nPost.getElementsByTagName("a")[0],
    sSeasonTitle = "",
    sSeasonUrl = undefined;
    
    if (nTitleLink !== undefined)
    {
      sSeasonTitle = getText(nTitleLink);
      sSeasonUrl = nTitleLink.href;
    }
    
    var nPostContent = nPost.getElementsByClassName("post-content")[0] || nPost,
    oSeason = new Season(sSeasonTitle, sSeasonUrl, sSeriesId),
    aContainers = nPostContent.getElementsByTagName("p");
    
    oSeries.addSeason(oSeason);
    
    if (aContainers.length == 0)
    {
      oSeason.addEntry(new Entry(nPost.innerHTML));
      continue;
    }
    
    var nEntry = null;
    
    for (var j = 0, iLen = aContainers.length; j < iLen; j++)
    {
      nEntry = aContainers[j];
      var sText = getText(nEntry);
      
      if (contains(sText, "Download:") ||
        /Mirror #[0-9]+/.test(sText) ||
        // in case this script is executed after full page load
        nEntry.getElementsByTagName("div")[0] &&
        nEntry.getElementsByTagName("div")[0].id == "download_mirrors")
      {
        parseEpisode(nEntry, oSeason)
      }
      else if (nEntry.className != "post-info-co" &&
        nEntry.innerHTML != "<font size=\"4\"></font>")
      {
        var sEntryHtml = nEntry.innerHTML;
        if (contains(sEntryHtml, "alt=\"Cover\""))
          oSeason.setCover(sEntryHtml);
        else
          oSeason.addEntry(new Entry(sEntryHtml.replace(/(<font size="4"><\/font>)/g, "")));
      }
    }
    
    var sFooterHtml = "";
    
    if (nEntry !== null)
      while (nEntry = nEntry.nextSibling)
      {
        if (nEntry.nodeType == 3)
          // is text node
          sFooterHtml += nEntry.nodeValue;
        else
          sFooterHtml += nEntry.outerHTML;
      }
    
    var nPostDetails = nPost.nextSibling;
    if (nPostDetails !== null)
    {
      nPostDetails = nPostDetails.nextSibling;
      if (nPostDetails !== null && nPostDetails.nodeType == 1 &&
        nPostDetails.className == "post_details")
        sFooterHtml += nPostDetails.outerHTML;
    }
    
    if (sFooterHtml.length != 0)
      oSeason.setFooter(sFooterHtml);
  }
  
  return oSeries;
}

function parseEpisode(nEntry, oSeason)
{
  // sub entries: either an episode title (the first sub entry)
  // or a mirror link title ("Download:", "Mirror:")
  var aSubEntries = nEntry.getElementsByTagName("strong");
  
  if (aSubEntries.length == 0)
  {
    oSeason.addEntry(new Entry(nEntry.innerHTML));
    return;
  }
  
  var sEpisodeTitle = getText(aSubEntries[0]),
  iMirrorCount = 0,
  aMirrorLinks = nEntry.getElementsByTagName("a");
  
  for (var i = 1, iLen = aSubEntries.length; i < iLen; i++)
  {
    var sText = getText(aSubEntries[i]);
    
    if (sText == "Download:" ||
      sText.substr(0, 6) == "Mirror")
    {
      var nMirrorLink = // "hier" link
        aMirrorLinks[iMirrorCount++];
        
      if (nMirrorLink === undefined)
        continue;
      
      var sHosterName = getText(nMirrorLink.nextSibling).trim(); // text node after the "hier" link
      
      if (sHosterName.length == 0 || sHosterName == "hier")
        sHosterName = getText(nMirrorLink);
      
      var iDelimIndex = sHosterName.indexOf("| ");
      if (iDelimIndex != -1)
        sHosterName = sHosterName.substr(iDelimIndex + 2); // skip " | "
      
      iDelimIndex = sHosterName.indexOf(" ");
      if (iDelimIndex != -1)
        sHosterName = sHosterName.substr(0, iDelimIndex);
      
      sHosterName = correctHosterTitle(sHosterName); // unify synonyms
      
      if (!contains(aHostersPref, sHosterName))
        aHostersPref.push(sHosterName);
      
      if (!contains(aBlacklistedHosters, sHosterName))
      {
        oSeason.addMirrorLink(
          new MirrorLink(sEpisodeTitle, nMirrorLink.href),
          sHosterName);
      }
    }
  }
}

function buildSeries(oSeries)
{
  
  $("#content")
  .find(".post, .post_details")
  .eq(0).replaceWith(oSeries.toHtml())
  .end().remove();
}

function correctHosterTitle(sTitle)
{
  switch (sTitle)
  {
  case "Highspeed":
  case "Mirror":
    return "firstload.com";
  case "ul.to":
  case "uploaded.to":
    return "uploaded.net";
  case "freakshare.net":
    return "freakshare.com"
  }
  
  return sTitle;
}

function parseMainPage()
{
  // in this context, season means the set of episodes of one update
  
  var nPost = document.getElementsByClassName("post")[0];
  if (!nPost)
    return;
  
  var nPostContent = nPost.getElementsByClassName("post-content")[0];
  if (nPostContent === undefined)
    nPostContent = nPost;
  
  var aUpdateSets = nPostContent.children || nPostContent.childNodes,
  sHtml = "",
  oSeason = null,
  iParsed = 0;
  
  for (var i = 0, iLen = aUpdateSets.length; i < iLen; i++)
  {
    var nUpdateSet = aUpdateSets[i];
    
    if (nUpdateSet.nodeType != 1)
      continue;
    
    var sText = getText(nUpdateSet);
    if (sText == "spacer" || sText == "Updates")
      continue;
    
    var nTitle = nUpdateSet.getElementsByTagName("legend")[0];
    if (nTitle !== undefined)
    {
      
      if (oSeason !== null)
        sHtml += oSeason.toHtml();
      
      oSeason = new Season(nTitle.innerHTML);
      var aElements = nUpdateSet.children || nUpdateSet.childNodes;
      
      for (var j = 0, iLen2 = aElements.length; j < iLen2; j++)
      {
        var nElem = aElements[j];
        
        if (nElem.nodeType != 1 ||
          nElem.firstChild === null ||
          getText(nElem) == "spacer" ||
          nElem == nTitle)
          continue;
        
        oSeason.addEntry(new Entry(nElem.innerHTML));
      }
      
      sHtml += oSeason.toHtml();
      
      if (++iParsed == 5)
        break;
      
      oSeason = null;
    }
    else
    {
      // set is no update
      if (oSeason === null)
        oSeason = new Season();
      oSeason.addEntry(new Entry(nUpdateSet.innerHTML));
    }
    
  }
  
  nPost.innerHTML = sHtml;
}

function requestSeries(sSeriesId, fOnComplete, fOnError)
{
  var sUrl = getSeriesUrl(sSeriesId);
  
  if (!bOnDokuJunkies)
    sUrl += "page/1/";
  
  $.ajax(
  {
    url : sUrl,
    cache : false,
    success : function (sResponseText)
    {
      var jTempDoc = $(sResponseText),
      nContext = jTempDoc.find("#content")[0],
      oParsedSeries = parseSeries(nContext, sSeriesId);
      jTempDoc.remove();
      
      fOnComplete(oParsedSeries);
    },
    error : function (oReq, sStatus, sErrorThrown)
    {
      if (fOnError !== undefined)
        fOnError(sStatus + " (" + sErrorThrown + ")");
    }
  }
  );
}

function createHosterButtonHtml(sReleaseId, sHosterName, bCheck)
{
  var sCleanTitle = clean(sHosterName),
  sLogo = oHosterLogos[sCleanTitle],
  sHtml = "<div " +
    "class='hosterButton " + (bCheck ? "checked" : "") + "' " +
    "title='" + sHosterName + "' " +
    "id='button" + sReleaseId + sCleanTitle + "'>";
  
  if (bShowHosterLogos && sLogo !== undefined)
  {
    sHtml += "<img " +
    "alt='" + sHosterName + "' " +
    "src='" + sLogo + "' />";
  }
  else
    sHtml += sHosterName;
  
  return sHtml + "</div>";
}

// --- /parsing and rebuilding functions ---
