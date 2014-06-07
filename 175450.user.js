// ==UserScript==
// @id             cc98_reply_suite
// @name           cc98 reply suite
// @version        0.6.7
// @namespace      soda@cc98.org
// @author         soda <sodazju@gmail.com>
// @description    
// @include        http://www.cc98.org/dispbbs.asp*
// @run-at         document-end
// ==/UserScript==

// todo:
// 上传 mp3 的标签改一下

/*! jQuery v2.1.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.0",o=function(a,b){return new o.fn.init(a,b)},p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){if("object"!==o.type(a)||a.nodeType||o.isWindow(a))return!1;try{if(a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":k.call(a)},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);o.find=t,o.expr=t.selectors,o.expr[":"]=o.expr.pseudos,o.unique=t.uniqueSort,o.text=t.getText,o.isXMLDoc=t.isXML,o.contains=t.contains;var u=o.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?o(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),v.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};A.prototype=o.fn,y=o(m);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(C[a]||o.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return o.each(a.match(E)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(H.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function I(){m.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),o.ready()}o.ready.promise=function(b){return H||(H=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},o.ready.promise();var J=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}K.uid=1,K.accepts=o.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?o.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;
while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),P(f,d,e[d]));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||o.isArray(c)?d=L.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:o.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";l.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==U&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?Z:$):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=o.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[L.expando],f&&(b=L.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);L.cache[f]&&delete L.cache[f]}delete M.cache[c[M.expando]]}}}),o.fn.extend({text:function(a){return J(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(ob(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(ob(c,"script"),kb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(hb,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function tb(a){var b=m,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:0,fontWeight:400},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+R[f]+"Width",!0,e))):(g+=o.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):f[g]||(e=S(d),(c&&"none"!==c||!e)&&L.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Fb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Fb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&zb.test(o.css(a,"display"))?o.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=yb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(o.cssHooks[a+b].set=Gb)}),o.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?o(this).show():o(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}o.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Kb.prototype.init,o.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=o.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&S(a),p=L.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=tb(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=L.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;L.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Ub(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return o.map(k,Ub,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Xb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Xb(this,o.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),o.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Lb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Lb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Mb||(Mb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Mb),Mb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Yb,Zb,$b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return J(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||o.find.attr;$b[b]=function(a,b,d){var e,f;
return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return J(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(o(d).val(),f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=o.now(),dc=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=m.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,o.ajaxSettings),b):tc(o.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Dc)Dc[a]()}),l.cors=!!Fc&&"withCredentials"in Fc,l.ajax=Fc=!!Fc,o.ajaxTransport(function(a){var b;return l.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort"),f.send(a.hasContent&&a.data||null)},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||o.expando+"_"+cc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Ic=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Jc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=yb(l.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Lc=a.jQuery,Mc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Mc),b&&a.jQuery===o&&(a.jQuery=Lc),o},typeof b===U&&(a.jQuery=a.$=o),o});

// 注意，本脚本中所有storey都是以1-9表示对应楼层，0表示第十层（为了跟脚本快捷键一致╮(╯_╰)╭
// 而index表示楼层的序号，0是第一楼，1是第二楼……

// Chrome 没有sendAsBinary函数，这里是一个实现
if (!XMLHttpRequest.prototype.sendAsBinary) {
    XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
        function byteValue(x) {
            return x.charCodeAt(0) & 0xff;
        }
        var ords = Array.prototype.map.call(datastr, byteValue);
        var ui8a = new Uint8Array(ords);
        this.send(ui8a);
    };
}


// 辅助函数
// parseQS, toQS, parseURL, parseCookies, unescapeHTML, ajax, xpath, addStyles
var _lib = {

    // parse the url get parameters
    parseQS: function(url) {
        url = url.toLowerCase().split('#')[0];  // remove the hash part
        var t = url.indexOf('?');
        var params;

        var hash = {};
        if (t >= 0) {
            params = url.substring(t+1).split('&');
        } else {    // plain query string without '?' (e.g. in cookies)
            params = url.split('&');
        }
        for (var i = 0; i < params.length; ++i) {
            var val = params[i].split('=');
            hash[decodeURIComponent(val[0])] = decodeURIComponent(val[1]);
        }
        return hash;
    },

    toQS: function(obj) {
        var ret = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if ('' === obj[key]) { continue; }
                ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
            }
        }
        return ret.join('&');
    },

    parseURL: function(url) {
        // from JavaScript: The Good Parts
        var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
        var arr = parse_url.exec(url);
        var result = {};
        result['url'] = arr[0];
        result['scheme'] = arr[1];
        result['slash'] = arr[2];
        result['host'] = arr[3];
        result['port'] = arr[4];
        result['path'] = arr[5];
        result['query'] = arr[6];
        result['hash'] = arr[7];
        return result;
    },

    parseCookies: function(theCookie) {
        var cookies = {};           // The object we will return
        var all = theCookie;        // Get all cookies in one big string
        if (all === '') {            // If the property is the empty string
            return cookies;         // return an empty object
        }
        var list = all.split('; '); // Split into individual name=value pairs
        for(var i = 0; i < list.length; i++) {  // For each cookie
            var cookie = list[i];
            var p = cookie.indexOf('=');        // Find the first = sign
            var name = cookie.substring(0,p);   // Get cookie name
            var value = cookie.substring(p+1);  // Get cookie value
            value = decodeURIComponent(value);  // Decode the value
            cookies[name] = value;              // Store name and value in object
        }
        return cookies;
    },

    // 将转义后的html转回来
    unescapeHTML: function(input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
    },

    // 转成UNICODE编码（sendAsBinary不能识别中文）
    toUnicode: function(str){
        return escape(str).toLocaleLowerCase().replace(/%u/gi,'\\u');
    },

    ajax: function(opts) {
        opts = {
            type: opts.type || 'GET',
            url: opts.url || '',
            data: opts.data || null,
            contentType: opts.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
            success: opts.success || function() {},
            async: opts.async || (opts.async === undefined)
        };

        var xhr = new XMLHttpRequest();

        xhr.open(opts.type, opts.url, opts.async);
        xhr.setRequestHeader('Content-type', opts.contentType);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                opts.success(xhr.responseText);
            }
        };
        if (opts.contentType === 'application/x-www-form-urlencoded; charset=UTF-8') {
            xhr.send(_lib.toQS(opts.data));
        } else {
            xhr.sendAsBinary(opts.data);
        }
    },

    // xpath query
    //@return {Array}   返回由符合条件的DOMElement组成的数组
    xpath: function(expr, contextNode) {
        contextNode = contextNode || document;
        var xresult = document.evaluate(expr, contextNode, null,
                    XPathResult.ORDERED_NODE_ITERATOR_TYPE , null);
        var xnodes = [];
        var xres;
        while (xres = xresult.iterateNext()) {
            xnodes.push(xres);
        }

        return xnodes;
    },
    // 添加CSS
    addStyles: function(css) {
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');

        style.setAttribute('type', 'text/css');
        style.innerHTML = css;
        head.appendChild(style);
    }
};

// 98相关的函数接口，这个脚本中fami和postCount这两个函数都没用到
// fami, reply, sendPM, upload, getPostContent, parseTopicPage, postCount, pageCount, formatURL, currentPage
var _cc98 = (function() {

    var that = {};

    // 各种常量
    var FAMI_URL = 'http://www.cc98.org/master_users.asp?action=award';
    var PM_URL = 'http://www.cc98.org/messanger.asp?action=send';
    var REPLY_URL = 'http://www.cc98.org/SaveReAnnounce.asp?method=Topic';
    var EDIT_URL = 'http://www.cc98.org/SaveditAnnounce.asp?';

    var POST_COUNT_RE = /本主题贴数\s*<b>(\d+)<\/b>/ig;

    // 以下三个没有考虑被删除的帖子，因为在当前页解析的时候DisplayDel()和正常的发帖时间之类的会一起出现，导致匹配会乱掉
    // 因此引起的发米机发米楼层可能不精确的问题也没办法了……
    var NAME_RE = /(?:name="\d+">| middle;">&nbsp;)\s*<span style="color:\s*\#\w{6}\s*;"><b>([^<]+)<\/b><\/span>/g;
    var ANNOUNCEID_RE = /<a name="(\d{2,})">/g; // 注意网页上<a name="1">之类的标签是作为#1的anchor出现的，所以限定至少两个数字
    var POST_TIME_RE = /<\/a>\s*(\d+\/\d+\/\d+ \d+:\d+:\d+.*)\s*<\/td>/g;

    var POST_RE = /\s<span id="ubbcode[^>]*>(.*)<\/span>|>本楼只允许特定用户查看|>该帖子设置了楼主可见|>该账号已经被禁止|>DisplayDel()/ig;

    // 用于在getPostContent()函数中去掉回复可见的内容
    var REPLYVIEW_RE = /<hr noshade size=1>.*<hr noshade size=1>/ig;

    // 默认文件上传到的版面：论坛帮助
    // 允许 gif|docx|xlsx|pptx|pdf|xap|jpg|jpeg|png|bmp|rar|txt|zip|mid|rm|doc|mp3
    var DEFAULT_UPLOAD_BOARDID = 184;

    // 其他文件扩展名与允许上传的boardid的对应列表
    var file2boardid = {
        'ipa': 598, // iOS
        'ppt': 598,
        'xls': 598,
        'chm': 598,
        'wma': 169, // 摇滚和独立音乐
        'lrc': 169,
        'asf': 169,
        'flv': 169,
        'wmv': 169,
        'rmvb': 169,
        'mpg': 169,
        'avi': 169,
        'swf': 170, // 史海拾贝
        'rep': 200, // 星际专区
        'tar': 212, // Linux天地
        'gz': 212,
        'bz2': 212,
        'tbz': 212,
        'tgz': 212,
        'psd': 239, // 贴图工坊
        'gtp': 308, // 乱弹吉他
        'gp3': 308,
        'gp4': 308,
        'gp5': 308,
        'torrent': 499, // 多媒体技术
        'srt': 499
    };

    // 发米/扣米
    // @param {string}      opts.url 帖子地址
    // @param {Number}      opts.announceid 回帖ID
    // @param {Number}      opts.amount 发米/扣米数量[0-1000]
    // @param {string}      opts.reason 发米理由
    // @param {boolean}     opts.ismsg  站短/不站短
    // @param {boolean}     [opts.awardtype=true] 是否发米
    // @param {function(responseText)} [opts.callback=function(){}] 回调函数
    that.fami = function(opts) {
        opts.callback = opts.callback || (function() {});
        opts.awardtype = opts.awardtype || (opts.awardtype === undefined);

        var params = _lib.parseQS(opts['url']);
        var boardid = params['boardid'];
        var topicid = params['id'];

        _lib.ajax({
            'type': 'POST',
            'url': FAMI_URL,
            'data': {
                'awardtype': opts['awardtype'] ? 0 : 1,
                'boardid': boardid,
                'topicid': topicid,
                'announceid': opts['announceid'],
                'doWealth': opts['amount'],
                'content': opts['reason'],
                'ismsg': opts['ismsg'] ? 'on' : ''
            },
            'success': opts['callback'],
        });
    };

    // 回帖
    // @param {string}  opts.url 帖子地址
    // @param {string}  opts.expression 发帖心情
    // @param {string}  opts.content 回帖内容
    // @param {string}  [opts.subject] 发帖主题
    // @param {string}  [opts.password] md5加密后的密码（不提供就从cookie中获取）
    // @param {boolean} [opts.edit] 是否是在编辑已发布的帖子（是的话必须提供replyid）
    // @param {Number}  [opts.replyid] 引用的帖子的announceid
    // @param {boolean} [opts.sendsms] 站短提示
    // @param {boolean} [opts.viewerfilter] 使用指定用户可见
    // @param {string}  [opts.allowedviewers] 可见用户
    // @param {function(responseText)} [opts.callback=function(){}] 回调函数
    that.reply = function(opts) {
        var params = _lib.parseQS(opts["url"]);
        var postURL = REPLY_URL + "&boardid=" + params["boardid"];
        if (opts["edit"]) {
            postURL = EDIT_URL + "boardid=" + params["boardid"] + "&replyid=" + opts["replyid"] + "&id=" + params["id"];
        }

        if (!opts.password) {
            opts.password = _lib.parseQS(_lib.parseCookies(document.cookie)['aspsky'])['password'];
        }
        if (!opts.username) {
            opts.username = _lib.parseQS(_lib.parseCookies(document.cookie)['aspsky'])['username'];
        }

        var data = {
                'subject': opts['subject'] || '',
                'expression': opts['expression'],
                'content': opts['content'],
                'followup': opts['edit'] ? params['id'] : (opts['replyid'] || params['id']),
                'replyid': opts['replyid'] || params['id'],
                'sendsms': opts['sendsms'] ? '1' : '0',
                'rootid': params['id'],
                'star': params['star'] || '1',
                'passwd': opts['password'],
                'signflag': 'yes',
                'enableviewerfilter': opts['viewerfilter'] ? '1' : '',
            };
        if (opts['viewerfilter']) {
            data['allowedviewers'] = opts['allowedviewers'] || '';
        }

        _lib.ajax({
            'type': 'POST',
            'url': postURL,
            'data': data,
            'success': opts['callback']
        });
    };

    // 站短
    // @param {string}  opts.recipient 收件人
    // @param {string}  opts.subject 站短标题
    // @param {string}  opts.message 站短内容
    // @param {function(responseText)} [opts.callback=function(){}] 回调函数
    that.sendPM = function(opts) {
        _lib.ajax({
            "type": "POST",
            "url": PM_URL,
            "data": {
                "touser": opts["recipient"],
                "title": opts["subject"],
                "message": opts["message"]
            },
            "success": opts["callback"]
        });
    };

    that.upload = function(file, callback) {
        var reader = new FileReader();

        var ext = file.name.substring(file.name.lastIndexOf('.') + 1);    // 文件扩展名
        var boardid = file2boardid[ext] || DEFAULT_UPLOAD_BOARDID;
        var url = 'http://www.cc98.org/saveannouce_upfile.asp?boardid=' + boardid;

        reader.onload = function(e) {
            var boundary = '----------------';
            boundary += parseInt(Math.random()*98989898+1, 10);
            boundary += parseInt(Math.random()*98989898+1, 10);

            var data = [boundary,'\r\n',
                'Content-Disposition: form-data; name="act"\r\n\r\nupload',
                '\r\n',boundary,'\r\n',
                'Content-Disposition: form-data; name="fname"\r\n\r\n',_lib.toUnicode(file.name),
                '\r\n',boundary,'\r\n',
                'Content-Disposition: form-data; name="file1"; filename="',_lib.toUnicode(file.name),'"\r\n',
                'Content-Type: ',file.type,'\r\n\r\n',
                e.target.result,
                '\r\n',boundary,'\r\n',
                'Content-Disposition: form-data; name="Submit"\r\n\r\n\xc9\xcf\xb4\xab',  // 上传
                '\r\n',boundary,'--\r\n'].join('');

            _lib.ajax({
                'type': 'POST',
                'url': url,
                'contentType': 'multipart/form-data; boundary='+boundary,
                'data': data,
                'success': callback
            });

        };

        reader.readAsBinaryString(file);
    };

    // 回帖内容如果要从html转成ubb的话太麻烦，但是没有执行js的rawhtml里有包含ubb代码
    // 所以为了方便起见，把获取帖子内容的功能独立出来，为它再开一个ajax请求
    // @param {string} url 网址
    // @param {Number} storey 楼层[1-9,0]
    // @param {function(postContent)) callback 回调函数
    that.getPostContent = function(url, index, callback) {
        _lib.ajax({
            'type': 'GET',
            'url': url,
            'success': function(rawhtml) {
                var result;

                POST_RE.lastIndex = 0;  // reinitialize the regexp
                for (var i = 0; i !== index; ++i) {
                    POST_RE.exec(rawhtml);
                }
                result = POST_RE.exec(rawhtml)[1] || '';
                result = result
                    .replace(REPLYVIEW_RE, '')
                    .replace(/<br>/ig, '\n');
                callback(_lib.unescapeHTML(result));
            }
        });
    };

    // 获取页面中的用户列表，回帖时间回帖ID
    // @return {Array}  每个数组元素都有username, annouceid, posttime三个属性
    that.parseTopicPage = function(htmlText) {
        if (!htmlText) { htmlText = document.body.innerHTML; }
        var postList = [];
        
        var nameArr = htmlText.match(NAME_RE);
        nameArr.forEach(function(name) {
            var post = {};
            post['username'] = name.replace(NAME_RE, '$1');
            postList.push(post);
        });

        var idArr = htmlText.match(ANNOUNCEID_RE);
        // 考虑到心灵没有announceid，所以idArr可能为空
        if (idArr) {
            idArr.forEach(function(id, index) {
                postList[index]['announceid'] = id.replace(ANNOUNCEID_RE, '$1');
            });
        }

        var timeArr = htmlText.match(POST_TIME_RE);
        if (timeArr) {
            timeArr.forEach(function(t, index) {
                postList[index]['posttime'] = t.replace(POST_TIME_RE, '$1');
            });
        }

        return postList;
    };

    that.postCount = function(htmlText) {
        if (!htmlText) { htmlText = document.body.innerHTML; }
        return parseInt(htmlText.match(POST_COUNT_RE)[0].replace(POST_COUNT_RE, '$1'), 10);
    };

    that.pageCount = function(htmlText) {
        return Math.ceil(_cc98.postCount(htmlText) / 10);
    };

    // 格式化网址，去除无用的参数并转为相对链接
    // @param {string}  url 要格式化的网址
    // @param {boolean} maxPageFix 是否修正url中star参数的值，使其不超过当前最后页的实际值
    that.formatURL = function(url, maxPageFix) {
        var urlObj = _lib.parseURL(url);

        // 不在www.cc98.org域名下
        if (urlObj['host'] !== 'www.cc98.org') {
            return url;
        }

        // http://www.cc98.org/
        if (!urlObj['path']) {
            return '/';
        }

        var params = _lib.parseQS(urlObj['query']);
        var hash = urlObj['hash'] ? ('#' + urlObj['hash']) : '';

        // 不是dispbbs.asp开头的链接，只去掉空的get参数，转为相对链接，不做其他处理
        if (urlObj['path'] === 'dispbbs,asp') {
            return '/' + urlObj['path'] + '?' + _lib.toQS(params) + hash;
        }

        // 如果不是在追踪页面，就去掉replyid
        if (!params['trace']) {
            params['replyid'] = '';
        }
        params['page'] = '';    // 去掉page

        // 
        if (params['star'] && maxPageFix && parseInt(params['star'], 10) > _cc98.pageCount()) {
            params['star'] = _cc98.pageCount();
        }

        params['star'] = (params['star'] && params['star'] !== '1') ? params['star'] : '';    // star=1时去掉
        if (params['searchdate'] === 'all') { params['searchdate'] = 'ALL' };
        return '/' + urlObj['path'] + '?' + _lib.toQS(params) + hash;
    };

    that.currentPage = function() {
        return parseInt(/<span title="跳转到第\s*(\d+)\s*页/ig.exec(document.body.innerHTML)[1], 10);
    };

    return that;
})();


jq = jQuery.noConflict();   // 防止与98默认jQuery版本的冲突
(function($) {
// 实际代码
$(function() {

    // 暂不支持简版
    if (_lib.parseCookies(document.cookie)['cc98Simple'] === '1') { return; }

////////////////////////////////////////////////////////////////////////////////
// 配置相关
////////////////////////////////////////////////////////////////////////////////
var DEFAULT_OPTIONS = {
    autoSaveInterval: 30,           // 自动保存间隔(秒)，必须是10的倍数

    promptString: '>>查看原帖<<',   // 原帖链接的提示文字
    promptColor: 'royalblue',       //「查看原帖」的颜色

    replyTail: "",                  // 小尾巴
    defaultReplyContent: '\n',      // 文本框为空时的默认回复内容

    useRelativeURL: true,           // 使用相对链接
    disableInXinlin: false,         // 在心灵禁用这些设置
    showFastReplyButton: true,      // 显示快速回复按钮
    alwaysShowEmotions: false,      // 始终显示表情菜单
    modifierKey: "alt",            // 快速回复快捷键组合的modifier key
    hotKeyCode: 82                  // 快速回复快捷键组合中字母的keyCode
};

var DEFAULT_EMOTIONS = {
    '阿狸': [
        'http://file.cc98.org/uploadfile/2013/8/15/22191352816.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191117896.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191286203.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191293280.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191489930.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191818865.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191919656.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191487258.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191586317.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191496743.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191579241.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191612466.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191691249.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191849844.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22192039418.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191982818.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191861061.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22191998439.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22192011375.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22192071865.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22192059179.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22192028201.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22192190949.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22192123383.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22192183873.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233034508.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233096466.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233017683.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233190180.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233194321.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233192853.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233138235.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233245839.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233233154.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233111134.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233424410.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233299252.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233483432.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233279227.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233225814.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233213129.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233496117.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233460998.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233476355.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233422679.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233513721.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233421211.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233597585.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233431223.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233581023.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/2233593708.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424416672.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424592783.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424610650.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424481038.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424411063.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424468617.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424652846.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424687965.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424658454.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424640161.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424671139.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424649646.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424886084.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424645769.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424717990.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424895833.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424961504.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22425120363.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424920513.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424743097.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424792369.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424833875.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22425012496.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22425130112.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22425030789.gif',
        'http://file.cc98.org/uploadfile/2013/8/15/22424992219.gif'
    ],

    '鱼妹兔': [
        'http://file.cc98.org/uploadfile/2013/8/16/11132767374.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11131811595.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11132317496.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11142640805.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11133097063.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11133261117.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11133877409.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11132990664.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11132896422.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11135565465.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11134892987.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11134625044.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11144984412.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11135050228.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11141071306.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11151652647.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11153028995.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11153733919.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11141538787.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11141175296.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1113730230.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1113624772.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1113910433.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11133317981.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11154368817.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1113634107.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1113884021.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11131089743.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11131940692.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11132523069.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11132758302.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11133237215.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11134560576.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11134922863.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11135174922.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11131732447.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11135349466.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11135616307.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11135898667.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11153969943.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11135927224.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1114127403.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1114559137.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11135425151.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11141283164.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11141498486.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11141663959.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11141888502.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11141997838.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1115717966.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11151144355.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11152434724.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11153355120.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11144312036.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11151655319.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11153640882.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11145899464.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11152829558.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11153599689.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1115171649.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11153677996.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11173439110.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11152020229.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1115495993.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11152759795.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11144880685.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11143895344.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11145217602.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11151125120.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11152295776.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11153291593.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11151831118.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11145065442.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1115820488.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11151897893.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11144029838.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11145715222.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11152646319.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1117239341.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11174118401.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11151333598.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1115134385.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11152946761.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11152745905.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11133554005.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11134346095.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11131974343.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1114980791.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11133555473.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11134548155.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11131356271.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11142528006.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11142875361.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11143720174.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/11133126148.gif',
        'http://file.cc98.org/uploadfile/2013/8/16/1115999799.gif'
    ]
};

var options = {};
var emotion_groups = {};

// 将修改后的设置存回到localStorage
function storeOptions() {
    localStorage.setItem('reply_options', JSON.stringify(options));
}

// 载入设置
function loadOptions() {
    options = JSON.parse(localStorage.getItem('reply_options')) || {};

    for (var prop in DEFAULT_OPTIONS) {
        if (options[prop] === undefined) {
            options[prop] = DEFAULT_OPTIONS[prop];
        }
    }

    storeOptions();
}

function storeEmotions() {
    localStorage.setItem('emotion_groups', JSON.stringify(emotion_groups));
}

function loadEmotions() {
    emotion_groups = JSON.parse(localStorage.getItem('emotion_groups')) || {};

    if (!emotion_groups || jQuery.isEmptyObject(emotion_groups)) { emotion_groups = DEFAULT_EMOTIONS; }
}

loadOptions();
loadEmotions();

////////////////////////////////////////////////////////////////////////////////
// 以下是界面无关的代码
////////////////////////////////////////////////////////////////////////////////

// unique id generator
var uid = function() {
    var id = 0;
    return function() {
        return id++;
    };
}();

// simple jquery draggable div plug-in
// from https://reader-download.googlecode.com/svn/trunk/jquery-draggable/index.html
// modified by soda<sodazju@gmail.com>
$.fn.drags = function(opt) {

    opt = $.extend({
        selected: "",   // 被鼠标选中的对象（默认为this）
        draggable: "",  // 被拖动的对象（默认为this）
        cursor: "move",
        draggableClass: "draggable",
        preventDefault: false
    }, opt);

    var $draggable = (opt.draggable === "") ? this : $(document).find(opt.draggable);
    var $selected = (opt.selected === "") ? this : $(document).find(opt.selected);

    $draggable.addClass(opt.draggableClass);
    $selected.css('cursor', opt.cursor);

    $selected.on('mousedown', function(e) {
        var pos_y = $draggable.offset().top - e.pageY;
        var pos_x = $draggable.offset().left - e.pageX;

        $(document).on('mousemove', function(e) {
            $draggable.offset({
                "top": e.pageY + pos_y,
                "left": e.pageX + pos_x
            });
        }).on('mouseup', function() {
            $(this).off('mousemove'); // Unbind events from document
        });
        if (opt.preventDefault) {
            e.preventDefault(); // disable selection
        }
    });

    return this;
};


////////////////////////////////////////////////////////////////////////////////
// 以下都是跟界面有关的函数
////////////////////////////////////////////////////////////////////////////////

// 显示当前设置
function showOptions() {
    $('#prompt-string').val(options.promptString);
    $('#prompt-color').val(options.promptColor);
    $('#reply-tail').val(options.replyTail);
    $('#default-reply-content').val(options.defaultReplyContent);
    $('#disable-in-xinlin').prop('checked', options.disableInXinlin);
    $('#use-relative-link').prop('checked', options.useRelativeURL);
    $('#show-fast-reply-button').prop('checked', options.showFastReplyButton);
    $('#always-show-emotions').prop('checked', options.alwaysShowEmotions);
    $('#modifier-key option[value="ctrl"]').prop('selected', options.modifierKey==='ctrl');
    $('#modifier-key option[value="alt"]').prop('selected', options.modifierKey==='alt');
    for (var i = 65; i <= 90; ++i) {
        $('#keycode').append('<option value="' + i + '"' + ((options.hotKeyCode === i) ? 'selected' : '') + '>' +
            String.fromCharCode(i) + '</option>');
    }
}

// 保存设置
function saveOptions() {
    options.promptString = $('#prompt-string').val();
    options.promptColor = $('#prompt-color').val();
    options.replyTail = $('#reply-tail').val();
    options.defaultReplyContent = $('#default-reply-content').val();
    options.disableInXinlin = $('#disable-in-xinlin').prop('checked');
    options.useRelativeURL = $('#use-relative-link').prop('checked');
    options.showFastReplyButton = $('#show-fast-reply-button').prop('checked');
    options.alwaysShowEmotions = $('#always-show-emotions').prop('checked');
    options.modifierKey = $('#modifier-key option:selected').val();
    options.hotKeyCode = parseInt($('#keycode option:selected').val(), 10);

    storeOptions();
    $('#reply_options').fadeOut("fast", function(){ $(this).remove(); });
}

// 显示发帖心情
function showExpressionList() {
    if ($('#expression_list').length) { return; }   // 如果页面中已经存在「心情列表」则返回

    $('#subject_line').append('<div id="expression_list"></div>');

    for (var i = 1; i <= 22; ++i) {
        $('#expression_list').append('<img src="http://www.cc98.org/face/face' + i + '.gif">');
    }

    $('#expression_list > img').click(function() {
        $('#post_expression').children().eq(0).attr('src', this.src);
        $('#expression_list').fadeOut("fast", function(){ $(this).remove(); });
    });
    $('#expression_list').hide().fadeIn("fast");
}

// 添加UBB代码
function addUBBCode(key) {
    var elem = document.getElementById('post_content');
    var start = elem.selectionStart;
    var end = elem.selectionEnd;
    var open_tag = '[' + key + ']';
    var close_tag = '[/' + key + ']';
    var sel_txt = elem.value.substring(start,end);
    var replace = open_tag + sel_txt + close_tag;

    elem.value = elem.value.substring(0,start) + replace + elem.value.substring(end);

    elem.focus();
    elem.selectionStart = elem.selectionEnd = start + open_tag.length + sel_txt.length;
}

// 往输入框当前光标位置添加内容
function insertContent(content) {
    var elem = $('#post_content').get(0);
    var start = elem.selectionStart;
    var end = elem.selectionEnd;
    elem.value = elem.value.substring(0,start) + content + elem.value.substring(end);
    elem.focus();
    elem.selectionStart = elem.selectionEnd = start + content.length;
}

// 显示当前表情分组
function showCurrentEmotionGroup() {
    var current = $('.current').text();
    var default_list = $('#default_list');
    var user_defined_list = $('#user_defined_list');

    localStorage.setItem('last_emot_tab', current);

    if (current === '默认') {
        user_defined_list.hide();
        default_list.show();
        $('#delete_emot_group').hide();
        $('#edit_emot_group').hide();
        return;
    }

    // 隐藏默认表情列表，显示编辑、删除选项
    default_list.hide();
    $('#delete_emot_group').show();
    $('#edit_emot_group').show();

    // 如果选中的是之前缓存的分组就直接显示
    if (user_defined_list.data('group_name') === current) {
        user_defined_list.show();
        return;
    }

    user_defined_list.empty();
    user_defined_list.data('group_name', current);
    for (var i = 0; i !== emotion_groups[current].length; ++i) {
        if (!emotion_groups[current][i]) { continue; }  // 跳过空行
        user_defined_list.append('<img src="' + emotion_groups[current][i] + '">');
    }

    // 绑定点击事件、预览功能
    $('#user_defined_list > img').click(function() {
        insertContent('[upload=' + this.src.substring(this.src.lastIndexOf('.') + 1) +']' + this.src + '[/upload]');
    }).hover(function() {
        $('#emot_preview').attr('src', this.src);
        $('#emot_preview').show();
        if (this.offsetLeft < $('#user_defined_list').get(0).clientWidth / 2) {
            $('#emot_preview').css({
                'left': '',
                'right': '0'
            });
        } else {
            $('#emot_preview').css({
                'left': '0',
                'right': ''
            });
        }
    }, function() {
        $('#emot_preview').hide();
    });

    user_defined_list.show();
}

// 显示添加和编辑表情分组的界面
function showEmotionConfig() {
    $('body').append([
        '<div id="emotion_config">',
        '<form>',
        '<fieldset>',
            '<legend><h3 id="emotion_config_action">编辑分组</h3></legend>',
            '<label for="group_name">分组名称（不能和已有的重复）</label>',
            '<br>',
            '<input id="group_name" type="text">',
            '<br>',
            '<label for="group_content">分组表情列表（图片地址或者带[upload]标签的地址，用换行符分隔）</label>',
            '<br>',
            '<textarea id="group_content"></textarea>',
            '<br>',
            '<input type="button" id="confirm_emotion_config" value="确认">',
            '<input type="button" id="cancel_emotion_config" value="取消">',
        '</fieldset>',
        '</form>',
        '</div>',
        ].join('\n'));
    $('#emotion_config').hide().fadeIn("fast");
    $('#emotion_config').css({
        'top': (document.body.clientHeight - $('#emotion_config').height()) / 2 + $(window).scrollTop(),
        'left': (document.body.clientWidth - $('#emotion_config').width()) / 2 + $(window).scrollLeft()
    });
    $('#cancel_emotion_config').click(function() { $('#emotion_config').fadeOut("fast", function(){ $(this).remove(); }); });
}

// 添加表情分组
function addEmotionGroup() {
    showEmotionConfig();
    $('#emotion_config_action').text('添加表情分组');
    $('#confirm_emotion_config').click(function(){
        var group_name = $('#group_name').val();
        var group_content = $('#group_content').val();
        if (!group_name) {
            alert('请指定分组名称');
            return;
        }
        if (!group_content) {
            alert('请至少添加一个表情');
            return;
        }
        if (emotion_groups[group_name]) {
            alert('与其他分组重名');
            return;
        }

        emotion_groups[group_name] = group_content.replace(/((?:\[upload=.*\])(.*)(?:\[\/upload\]))/ig, '$2').split('\n');
        storeEmotions();

        // 添加表情分组
        var tab = $('<li class="tab_item">' + group_name + '</li>');
        tab.click(function() {
            if ($(this).hasClass('current')) {
                return;
            }

            $('.current').removeClass('current');
            $(this).addClass('current');
            showCurrentEmotionGroup();
        });
        $('#emot_tab').append(tab);

        $('#emotion_config').fadeOut("fast", function(){ $(this).remove(); });
    });
}

// 删除表情分组
function deleteEmotionGroup() {
    if (!confirm('确认删除该分组？')) {
        return;
    }

    delete emotion_groups[$('.current').text()];
    storeEmotions();

    $('.current').remove();
    $('#default_emotion_group').addClass('current');
    showCurrentEmotionGroup();
}

// 编辑表情分组
function editEmotionGroup() {
    showEmotionConfig();
    $('#emotion_config_action').text('编辑表情分组');

    var current = $('.current').text();
    $('#group_name').val(current);
    $('#group_content').val(emotion_groups[current].join('\n'));

    $('#confirm_emotion_config').click(function(){
        var group_name = $('#group_name').val();
        var group_content = $('#group_content').val();
        if (!group_name) {
            alert('请指定分组名称');
            return;
        }
        if (!group_content) {
            alert('请至少添加一个表情');
            return;
        }

        // 更新emotion_groups
        if (group_name !== current) {
            if (emotion_groups[group_name]) {
                alert('与其他分组重名');
                return;
            }

            delete emotion_groups[current];
            $('.current').text(group_name);
        }

        emotion_groups[group_name] = group_content.replace(/((?:\[upload=.*\])(.*)(?:\[\/upload\]))/ig, '$2').split('\n');
        storeEmotions();

        $('#emotion_config').fadeOut("fast", function(){ $(this).remove(); });

        // 刷新表情列表
        $('#user_defined_list').empty();
        $('#user_defined_list').data('group_name', '');
        showCurrentEmotionGroup();
    });
}

// 显示表情列表
function toggleEmotions() {
    if ($('#emot_panel').length) {
        $('#emot_panel').fadeToggle();
        return;
    }

    $('#reply_dialog').append([
        '<div id="emot_panel">',
            '<ul id="emot_tab">',
                '<li id="default_emotion_group" class="tab_item current">默认</li>',
            '</ul>',
            '<div id="default_list" class="emotion_list"></div>',
            '<div id="user_defined_list" class="emotion_list"></div>',
            '<img id="emot_preview"></img>',
            '<ul id="emot_action">',
                '<li id="add_emot_group">添加分组</li>',
                '<li id="edit_emot_group">编辑分组</li>',
                '<li id="delete_emot_group">删除分组</li>',
            '</ul>',
        '</div>'
        ].join('\n'));

    // 显示分组
    var emot_tab = $('#emot_tab');
    for (var group in emotion_groups) {
        if (emotion_groups.hasOwnProperty(group)) {
            emot_tab.append('<li class="tab_item">' + group + '</li>');
        }
    }

    // 显示默认分组
    for (var i = 0; i <= 91; ++i) {
        $('#default_list').append('<img src="http://www.cc98.org/emot/simpleemot/emot' + ((i < 10) ? '0' + i : i) + '.gif">');
    }
    $('#default_list > img').click(function() {
        insertContent(this.src.replace(/.*emot(\d+)\.gif/ig, '[em$1]'));
    });

    $('#add_emot_group').click(addEmotionGroup);
    // 默认分组没有编辑和删除两个选项，也没有表情预览
    $('#edit_emot_group').click(editEmotionGroup).hide();
    $('#delete_emot_group').click(deleteEmotionGroup).hide();
    $('#emot_preview').hide();

    // 切换表情分组
    $('.tab_item').click(function() {
        if ($(this).hasClass('current')) {
            return;
        }

        $('.current').removeClass('current');
        $(this).addClass('current');
        showCurrentEmotionGroup();
    });

    // 显示最后使用的表情分组
    var last = localStorage.getItem('last_emot_tab');
    $('.tab_item').each(function() {
        if ($(this).text() === last) {
            $(this).click();
        }
    });

    $('#emot_panel').hide().fadeIn("fast");   // 渐显特效
}

// 上传文件
function uploadFiles() {
    var files = document.getElementById('files').files;

    if (!files.length) {
        document.getElementById('upload_msg').textContent = '请选择要上传的文件';
        return;
    }

    document.getElementById('attach_table').style.display = 'table';
    for (var i = 0, f; i < files.length; ++i) {
        f = files[i];

        var result = document.createElement('tr');
        var name = document.createElement('td');
        var size = document.createElement('td');
        var status = document.createElement('td');

        name.id = 'file' + uid();
        name.className = 'filename';
        name.textContent = f.name;
        size.textContent = (f.size / 1024).toFixed(2) + ' kB';
        status.textContent = '正在上传…';

        result.appendChild(name);
        result.appendChild(size);
        result.appendChild(status);

        document.getElementById('attach_list').appendChild(result);

        // jQuery和原生JS夹杂的风格很不喜欢，不过没办法了
        // 采用闭包的原因是为了防止for循环结束后，上层函数（uploadFile）里各个变量都固定为最后一个
        var callback = function(file_id, image_autoshow) {
            return function(html) {
                var file = $('#' + file_id);

                var pattern = /script>insertupload\('([^']+)'\);<\/script/ig;
                var ubb = pattern.exec(html);

                if (ubb) {
                    // 要插入的ubb代码
                    ubb = ubb[1] + '\n';

                    // 自动显示图片
                    if (image_autoshow) {
                        ubb = ubb.replace(/(,1)/ig, "");
                    }
                    // mp3 替换成 audio 标签
                    if (ubb.substr(ubb.indexOf('=') + 1, 3) === 'mp3') {
                        ubb = ubb.replace(/upload/g, 'audio')
                    }

                    file.next().next().addClass('uploadsuccess').text('上传成功');

                    // 点击文件名插入ubb代码
                    file.css('cursor', 'pointer');
                    file.click(function(ubb) {
                        return function() {
                            insertContent(ubb);
                        };
                    }(ubb));

                } else if (html.indexOf('文件格式不正确') !== -1) {
                    file.next().next().addClass('uploadfail').text('文件格式不正确');
                } else {
                    file.next().next().addClass('uploadfail').text('上传失败');
                }
            };
        }(name.id, $('#image_autoshow').prop('checked'));

        _cc98.upload(f, callback);
    }

    // 关闭上传面板
    $('#upload_panel').fadeOut("fast", function(){ $(this).remove(); });
}

// 保存草稿
function saveDraft() {
    sessionStorage.setItem('cc98_editor_subject', $('#post_subject').val());
    sessionStorage.setItem('cc98_editor_content', $('#post_content').val());
    var d = new Date();
    var time = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
    $('#e_tip').text('帖子内容保存于 ' + time);
}

// 将content中的URL替换为相对链接
function makeRelativeURL(content) {
    return content.replace(/(?:\[url=)?(?:http:\/\/)?www\.cc98\.org\/[&=#%\w\+\.\?]+/g, function(match){
        if (match.indexOf('[url=') !== 0) {
            return '[url]' + _cc98.formatURL(match) + '[/url]';
        } else {
            return '[url=' + _cc98.formatURL(match.substring(5));
        } 
    });
}

// 显示发帖状态（成功、失败、10s等）
function showReplyStatus(status, color) {
    $('#submitting_status').text(status);
    if (color) { $('#submitting_status').css('color', color); }
}

// 显示@结果
function showAtStatus(username, success) {
    if (!$('#at-status').length) {
        $('#reply_dialog').append('<ul id="at-status"></ul>');
    }

    if (success) {
        $('#at-status').append('<li class="at-succeed">@' + username + '成功</li>');
    } else {
        $('#at-status').append('<li class="at-fail">@' + username + '失败</li>');
    }
}

// at用户并刷新页面（于回复成功后执行）
function atUsers() {
    // 去除引用内容（匹配规则并不十分准确不过够用了）
    var text = $('#post_content').val().replace(/(\[quote\][\s\S]*\[\/quote\])|(\[quotex\][\s\S]*\[\/quotex\])/ig, '');
    var tmp = text.match(/@@([^\s]*)(\s|$)/ig) || [];
    var users = [];
    var username;
    for (var i = 0; i !== tmp.length; ++i) {
        username = tmp[i].replace('@@', '').trim();
        if (username) {
            users.push(username);
        }
    }

    // 如果没有被@的用户则直接跳转
    if (!users.length) {
        showReplyStatus('回复成功，正在跳转…');
        location.reload();
        return;
    }

    // 否则开始@
    showReplyStatus('回复成功，正在处理@信息…');
    var title = document.title.replace(/ » CC98论坛$/ig, '');
    var message = '我在帖子' + '[url=' + _cc98.formatURL(location.href, true) + '][color=blue]' + title + '[/color][/url]' + '中@了你,快来看看吧~!';

    var pending = users.length;
    while (users.length) {
        username = users.shift();
        _cc98.sendPM({
            'recipient': username,
            'subject': '@提示',
            'message': message,
            'callback': function(username) {
                return function(html) {
                    if (html.indexOf('论坛成功信息') !== -1) {
                        showAtStatus(username, true);
                    } else {
                        showAtStatus(username, false);
                    }

                    pending--;
                    if (pending === 0) {
                        $('#at-status').append('<br><li class="at-complete">@完毕，正在跳转</li>');
                        setTimeout(function() { location.reload(); }, 1000);
                    }
                };
            }(username)
        });
    }
}

// 实际发表回复
function reply() {
    // 小表情
    var expr = $('#post_expression').children().eq(0).attr('src');
    expr = expr.substring(expr.lastIndexOf('/') + 1);

    // 考虑到用户可能把默认回复和小尾巴都去掉，所以回复内容仍可能为空
    if ($('#post_content').val() === "") {
        showReplyStatus('帖子内容不能为空');
        return;
    }

    showReplyStatus('发表帖子中…');

    _cc98.reply({
        "url": window.location.href,
        "expression": expr,
        "content": $('#post_content').val(),
        "subject": $('#post_subject').val(),
        "replyid": $('#the_reply_id').val(),
        "sendsms": $('#notfiy_user_checkbox').prop('checked'),
        "callback": function(html) {
            if (html.indexOf('状态：回复帖子成功') !== -1) {
                // 回复成功，下一步是处理@信息并刷新页面
                atUsers();
            } else if (html.indexOf('本论坛限制发贴距离时间为10秒') !== -1) {
                // 10s倒计时
                for (var i = 0; i <= 10; ++i) {
                    setTimeout(function(e) {
                        return function() { showReplyStatus('论坛限制发帖时间间隔10s，倒计时' + (10-e) + 's…'); };
                    }(i), i * 1000);
                }

                // 倒计时结束重新发帖
                setTimeout(reply, 10000);
            } else if (html.indexOf('主题长度不能超过100') !== -1) {
                showReplyStatus('主题长度不能超过100');
            } else if (html.indexOf('发言内容不得大于16240bytes') !== -1) {
                showReplyStatus('发言内容不得大于16240bytes');
            } else {
                showReplyStatus('未知错误');
            }
        }
    });
}

// 提交回复，包括对帖子内容的预处理（加小尾巴等）
function submit() {
    if (!options.disableInXinlin || _lib.parseQS(location.search)['boardid'] !== '182') {
        // 为空则添加默认回复
        if ($('#post_content').val() === '') {
            $('#post_content').val(options.defaultReplyContent);
        }

        // 添加小尾巴
        if (options.replyTail) {
            $('#post_content').val($('#post_content').val() + '\n' + options.replyTail);
        }
    }

    // 相对链接
    if (options.useRelativeURL) {
        $('#post_content').val(makeRelativeURL($('#post_content').val()));
    }

    if ($('#previewfrm').prev().children().children().children().text().indexOf('解锁') === -1 || confirm('本帖已锁定，确定要回复吗？')) {
        reply();
    }
}

// 显示回复面板，添加与其相关的各种事件绑定
function showDialog() {
    var reply_dialog_html = [
        '<div id="reply_dialog">',
        '<form id="replyform">',
        '<input id="the_reply_id" type="hidden" value="">',
        '<ul id="replytable"width="100%">',
            '<li id="dialog_header">',
                '<h3 id="replybox_title" class="box_title">',
                    '参与/回复主题',
                    '<a id="show_options" href="javascript:void(0);">[设置]</a>',
                    '<span><a id="dialog_close_btn" class="close_btn" title="关闭"></a></span>',
                '</h3>',
            '</li>',

            '<li id="subject_line" class="clearfix">',
                '<label for="post_subject"><a id="post_expression" href="javascript:void(0);"><img src="http://www.cc98.org/face/face7.gif"></a></label>',
                '<input type="text" id="post_subject" name="post_subject">',
                '<input style="display:none"',  // form中如果只有一个input元素，按下enter会导致表格提交，这个input元素是为了防止这种情况
            '</li>',

            '<li>',
                '<div id="editor">',
                    '<div id="e_control">',
                        '<a id="add_emotions" title="表情" href="javascript:void(0);"><img class="e_ctrl_btn" src="http://www.cc98.org/emot/simpleemot/emot88.gif"></a>',
                        '<a id="bold" title="加粗" href="javascript:void(0);"><img class="e_ctrl_btn" src="http://file.cc98.org/uploadfile/2013/8/7/22333264497.gif"></a>',
                        '<a id="strikethrough" title="删除线" href="javascript:void(0);"><img class="e_ctrl_btn" src="http://file.cc98.org/uploadfile/2013/8/7/22525420119.png"></a>',
                        '<a id="add_attachments" href="javascript:void(0);">| 添加附件</a>',
                        '<div id="notfiy_user" style="display:none; float: right; margin: 0px 15px 0px 0px; border-right-width: 0px; padding-right: 0px;">',
                            '<input type="checkbox" id="notfiy_user_checkbox" style="vertical-align: middle; margin: 0px 2px 0px 0px;">',
                            '<label style="vertical-align: middle;" for="notfiy_user_checkbox">站短提示 <a id="quoted_username" style="color:blue;" target="_blank" href="javascript:void(0);"></a></label>',
                        '</div>',
                    '</div>',

                    '<textarea id="post_content" role="textbox" aria-multiline="true"></textarea>',

                    '<div id="e_statusbar">',
                        '<span id="e_tip"></span>',
                        '<span id="e_autosavecount"></span>',
                        '<a id="e_save" href="javascript:void(0);">保存草稿</a>',
                        ' | ',
                        '<a id="e_recover" href="javascript:void(0);">恢复数据</a>',
                    '</div>',
                '</div>',
            '</li>',

            '<li>',
                '<table class="btn_bar">',
                    '<tbody>',
                        '<tr>',
                            '<td width="20%"><input type="button" id="submit_post" class="soda_button" value="提交回复"></td>',
                            '<td width="80%"><span id="submitting_status"></span></td>',
                        '</tr>',
                    '</tbody>',
                '</table>',
            '</li>',

        '</ul>',
        '</form>',

        '<table id="attach_table">',
            '<thead>',
                '<tr>',
                    '<th id="filenames" width="50%">点击文件名添加到帖子中（点此全部加入）</th>',
                    '<th width="20%">大小</th>',
                    '<th width="30%">状态</th>',
                '</tr>',
            '</thead>',
            '<tbody id="attach_list">',
            '</tbody>',
        '</table>',

        '</div>'
    ].join('\n');

    var upload_panel_html = [
        '<div id="upload_panel">',
            '<h3 id="upload_title" class="box_title">',
                '添加附件',
                '<span><a id="upload_close_btn" class="close_btn" title="关闭"></a></span>',
            '</h3>',
            '<input type="file" id="files" name="files[]" multiple>',
            '<br>',
            '<table class="btn_bar" width="100%">',
                '<tbody>',
                    '<tr>',
                        '<td><input type="checkbox" id="image_autoshow" name="image_autoshow" value="autoshow"><label for="image_autoshow">直接显示图片</label></td>',
                        '<td><input type="button" id="confirm_upload" class="soda_button" value="上传"></td>',
                    '</tr>',
                '</tbody>',
            '</table>',
            '<div id="upload_msg"></div>',
        '</div>'
    ].join('\n');

    // 回复设置的表单没有用fieldset，因为用了之后关闭按钮的摆放就显得很尴尬……
    var reply_options_html = [
        '<div id="reply_options">',
        '<form id="options_form">',
                '<header id="options_header" class="box_title">',
                    '<b>回复设置</b>',
                    '<span><a id="options_close_btn" class="close_btn" title="关闭"></a></span>',
                '</header>',
            '<div>',
                '<label for="prompt-string" class="desc">原帖链接提示文字</label>',
                '<div><input type="text" id="prompt-string"></div>',
            '</div>',
            '<div>',
                '<label for="prompt-color" class="desc">原帖链接文字颜色</label>',
                '<div><input type="text" id="prompt-color"></div>',
            '</div>',
            '<div>',
                '<label for="reply-tail" class="desc">回复后缀</label>',
                '<div><textarea id="reply-tail"></textarea></div>',
            '</div>',
            '<div>',
                '<label for="default-reply-content" class="desc">默认回复</label>',
                '<div><textarea id="default-reply-content"></textarea></div>',
            '</div>',
            '<fieldset>',
            '<legend></legend>',
            '<div>',
                '<input type="checkbox" id="disable-in-xinlin">',
                '<label for="disable-in-xinlin" >在心灵之约禁用以上设置</label>',
            '</div>',
            '</fieldset>',
            '<br>',

            '<fieldset>',
            '<legend>其他设置</legend>',
            '<div>',
                '<input type="checkbox" id="use-relative-link">',
                '<label for="use-relative-link" >使用相对链接</label>',
            '</div>',
            '<div>',
                '<input type="checkbox" id="show-fast-reply-button">',
                '<label for="show-fast-reply-button">显示快速回复按钮</label>',
            '</div>',
            '<div>',
                '<input type="checkbox" id="always-show-emotions">',
                '<label for="always-show-emotions">总是显示表情菜单</label>',
            '</div>',
            '</fieldset>',
            '<fieldset>',
            '<legend></legend>',
            '<div>',
                '<label class="desc">快速回复快捷键</label>',
                '<select id="modifier-key">',
                    '<option value="ctrl">Ctrl</option>',
                    '<option value="alt">Alt</option>',
                '</select>',
                '<select id="keycode">',
                '</select>',
            '</div>',
            '</fieldset>',
            '<br>',
            '<input type="button" id="save_reply_options" class="soda_button" value="保存设置">',
        '</form>',
        '</div>'
    ].join('\n');


    if ($('#reply_dialog').length) {
        return;
    }
    $('body').append(reply_dialog_html);

    // 居中（可见区域内绝对居中，不是固定居中，考虑到上传文件数量可能特别多超过可见范围）
    $('#reply_dialog').css({
        'top': (document.body.clientHeight - $('#reply_dialog').height()) / 2 + $(window).scrollTop(),
        'left': (document.body.clientWidth - $('#reply_dialog').width()) / 2 + $(window).scrollLeft()
    });

    // 如果始终显示表情菜单，则把位置右移140px
    if (options.alwaysShowEmotions) {
        $('#reply_dialog').css('left', parseInt($('#reply_dialog').css('left'), 10) + 140 + 'px');
    }

    $('#reply_dialog').hide().fadeIn("fast"); // 渐显特效

    // 显示设置界面
    $('#show_options').click(function() {
        if($('#reply_options').length) {
            return;
        }

        $('body').append(reply_options_html);
        $('#options_header').drags({'draggable': '#reply_options'});
        $('#options_close_btn').click(function() { $('#reply_options').fadeOut("fast", function(){ $(this).remove(); }); });

        $('#reply_options').hide().fadeIn("fast");
        $('#reply_options').css({
            'top': (document.body.clientHeight - $('#reply_options').height()) / 2 + $(window).scrollTop(),
            'left': (document.body.clientWidth - $('#reply_options').width()) / 2 + $(window).scrollLeft()
        });

        // 显示当前设置
        showOptions();

        $('#save_reply_options').click(saveOptions);
    });

    // 显示上传界面
    $('#add_attachments').click(function() {
        if ($('#upload_panel').length) {
            return;
        }

        $('body').append(upload_panel_html);
        $('#upload_title').drags({'draggable': '#upload_panel'});
        $('#upload_close_btn').click(function() { $('#upload_panel').fadeOut("fast", function(){ $(this).remove(); }); });

        $('#upload_panel').hide().fadeIn("fast");
        $('#upload_panel').css({
            'top': (document.body.clientHeight - $('#upload_panel').height()) / 2 + $(window).scrollTop(),
            'left': (document.body.clientWidth - $('#upload_panel').width()) / 2 + $(window).scrollLeft()
        });

        $('#confirm_upload').click(uploadFiles);
    });

    // 自动保存草稿
    var autoSaveIntervalId = setInterval(function() {
        var remained = options.autoSaveInterval;  // 剩余时间
        return function() {
            remained -= 10;
            if (remained === 0) {
                saveDraft();
                remained = options.autoSaveInterval;
            }
            $('#e_autosavecount').text(remained + ' 秒后自动保存草稿');
        };
    }(), 10000);    // 10s更改一次状态

    // 各种事件绑定
    $('#replybox_title').drags({"draggable": "#reply_dialog"});
    $('#dialog_close_btn').click(function() {
        $('#reply_dialog').fadeOut("fast", function(){ $(this).remove(); });
        $('#upload_panel').fadeOut("fast", function(){ $(this).remove(); });
        clearInterval(autoSaveIntervalId);
    });

    $('#post_expression').click(showExpressionList);

    // UBB编辑器
    $('#bold').click(function() { addUBBCode('b'); });
    $('#strikethrough').click(function() { addUBBCode('del'); });

    // 表情列表
    if (!options.alwaysShowEmotions) {
        $('#add_emotions').click(toggleEmotions);
    } else {
        toggleEmotions();
    }

    // 点击输入框时，隐藏发帖心情列表
    $('#post_content').click(function() { $('#expression_list').fadeOut("fast", function(){ $(this).remove(); }); });

    // 初始状态
    $('#e_autosavecount').text(options.autoSaveInterval + ' 秒后自动保存草稿');
    // 保存草稿
    $('#e_save').click(saveDraft);
    // 恢复数据
    $('#e_recover').click(function() {
        if ($('#post_content').val() === '' || confirm('此操作将覆盖当前帖子内容，确定要恢复数据吗？')) {
          $('#post_content').val(sessionStorage.getItem('cc98_editor_content'));
      }
    });

    // 提交
    $('#submit_post').click(submit);

    // 将所有上传文件加到帖子中
    $('#filenames').css('cursor', 'pointer').click(function() { $('.filename').click(); });

    // 打开回复时将鼠标焦点定到输入框
    $('#post_content').focus();
}

// 给引用加上查看原帖链接
function addQuoteURL(url, storey, quoteContent) {
    var insertIndex = quoteContent.indexOf('[/b]');
    var quoteURL = _cc98.formatURL(url, true).split('#')[0] + '#' + storey;
    return quoteContent.substring(0, insertIndex) + '  [url=' + quoteURL + '][color=' + options.promptColor + ']' + options.promptString +
        '[/color][/url]' + quoteContent.substring(insertIndex);
}

function showNotifyUser(storey) {
    if (_lib.parseQS(location.search)['boardid'] === '182') { return; }

    var index = ((storey-1) >= 0) ? (storey-1) : 9;
    var post = _cc98.parseTopicPage()[index];
    if (!post) { return; }

    $('#notfiy_user').css('display', '');

    $('#quoted_username').attr('href', 'http://www.cc98.org/dispuser.asp?name=' + encodeURIComponent(post['username']))
                         .text(post['username']);
    $('#the_reply_id').val(post['announceid']);
}

// 添加回复内容（这里的storey是1-9再到0,，不是从0开始的）
function addFastQuote(url, storey) {
    var replyNum = storey + 48;
    if (!document.getElementById('reply'+replyNum)) {
        return;
    }

    showDialog();
    showNotifyUser(storey);

    var replyurl = document.getElementById('reply'+replyNum).value;
    $.ajax({
        'url': replyurl,
        'success': function(html) {
            var quoteContent = _lib.unescapeHTML((/<textarea.*>([\s\S]*)<\/textarea>/ig).exec(html)[1]);

            if (!options.disableInXinlin || _lib.parseQS(location.search)['boardid'] !== '182') {
                quoteContent = addQuoteURL(url, storey, quoteContent);
            }

            $('#post_content').val($('#post_content').val() + quoteContent);
        }
    });
}

// 多重引用
function addMultiQuote(url, storey) {
    showDialog();
    showNotifyUser(storey);

    var index = ((storey-1) >= 0) ? (storey-1) : 9;
    var post = _cc98.parseTopicPage()[index];
    if (!post) { return; }

    url = _cc98.formatURL(url, true);

    _cc98.getPostContent(url, index, function(content) {
        var isXinlin = (_lib.parseQS(location.search)['boardid'] === '182');
        var quoteContent = '[quote][b]以下是引用[i]' + (isXinlin ? "匿名" : post.username) + '在' + post.posttime +
            '[/i]的发言：[/b]\n' + content + '\n[/quote]\n';

        if (!options.disableInXinlin || _lib.parseQS(location.href)['boardid'] !== '182') {
            quoteContent = addQuoteURL(url, storey, quoteContent);
        }

        $('#post_content').val($('#post_content').val() + quoteContent);
    });
}

// 给页面加上引用按钮
function addButtons() {

    // 获取所有「引用」链接
    $('a[href*="reannounce.asp"]').each(function(index) {
        var link = $(this);

        // 如果是「答复」则跳过
        if (link.attr('href').indexOf('setfilter') > 0) {
            return;
        }

        // 如果在完整版中没有引用图片作为子节点，或者在简版中文字内容不是[引用]，就不是真正的引用链接
        // 考虑到简版中纯文字的话还可能伪造[引用]链接，所以再加上对它父节点的判断
        if (link.children().first().attr('src') !== 'pic/reply.gif' &&
            (link.text() !== '[引用]' || link.parent().get(0).className !== 'usernamedisp')) {
            return;
        }

        link.addClass('quote_btn');

        link.parent().append('<a href="javascript:void(0);" title="快速引用" class="fastquote_btn"><img src="http://file.cc98.org/uploadfile/2010/4/11/2201680240.png"></a>')
            .append('<a href="javascript:void(0);" title="多重引用" class="multiquote_btn"><img src="http://file.cc98.org/uploadfile/2010/5/12/9395977181.png"></a>');
    });

    // 原生引用按钮
    $('.quote_btn').each(function (index) {
        var storey = (index === 9) ? 0 : (index + 1);
        $(this).click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            addFastQuote(location.href, storey);
        });
    });

    $('.fastquote_btn').each(function (index) {
        var storey = (index === 9) ? 0 : (index + 1);
        $(this).click(function() { addFastQuote(location.href, storey); });
    });

    $('.multiquote_btn').each(function (index) {
        var storey = (index === 9) ? 0 : (index + 1);
        $(this).click(function() { addMultiQuote(location.href, storey); });
    });

    // 显示快速回复按钮
    if (options.showFastReplyButton) {
        $('body').append('<div><a id="fast_reply" title="快速回复"></a></div>');
        $('#fast_reply').click(showDialog);
    }
}

// 处理各种键盘快捷键
// 似乎先处理keyCode再处理ctrlKey比较灵敏
function shortcutHandlers(evt) {
    // ALT + R 打开弹出回复框
    var modifierKey = (options.modifierKey === "ctrl") ? evt.ctrlKey : evt.altKey;
    if (evt.keyCode === options.hotKeyCode && modifierKey) {
        showDialog();
    }

    // CTRL + SHIFT + 0-9 快速引用
    if (evt.keyCode >= 48 && evt.keyCode <= 57 && evt.ctrlKey && evt.shiftKey) {
        addFastQuote(location.href, evt.keyCode-48);
    }
}

function submitShortcut(evt) {
    // CTRL + ENTER 提交回复
    if (evt.keyCode === 13 && evt.ctrlKey) {
        submit();
    }
    // ESC 关闭回复框和上传框
    if (evt.keyCode === 27) {
        $('#reply_dialog').fadeOut("fast", function(){ $(this).remove(); });
        $('#upload_panel').fadeOut("fast", function(){ $(this).remove(); });
    }
}

// 给界面添加图标
addButtons();

// 绑定快捷键
$(document).keyup(shortcutHandlers);
// 似乎很多快捷键必须是keydown才足够灵敏（还能防止中文输入法状态下ESC键太灵敏），只好分离出来
$(document).keydown(submitShortcut);

_lib.addStyles([
    '#reply_dialog, #reply_options {',
        'color: #222;',
        'background-color: white;',
        'font: 12px/1.4 ubuntu, "Lucida Grande", "Hiragino Sans GB W3", "Microsoft Yahei", sans-serif;',
        'width: 600px;',
        'position: absolute;',
        'border-radius: 5px;',
        'box-shadow: rgba(0, 0, 0, 0.4) 0 0 20px;',
        'padding: 15px;',
        'margin: 0 auto;',
    '}',

    '#replytable{',
        'display: block;',
        'list-style: none;',
        'padding-left: 0;',
        'margin: 0;',
    '}',

    '.clearfix { clear: both; }',

  '.box_title {',
        'cursor: move;',
        'font-size: 16px;',
        'line-height: 20px;',
        'margin: 0 0 20px 0;',
        'color: #6595D6;',
        'text-align: left;',
    '}',
    '.close_btn {',
        'cursor: pointer;',
        'width: 20px;',
        'height: 20px;',
        'background: url("http://file.cc98.org/uploadfile/2013/8/7/1954562236.gif");',
        'float: right;',
    '}',
    '.close_btn:hover { background-position: 0 -20px; }',

    '#show_options {',
        'color: #fff;',
        'display: inline-block;',
        'margin-left: 5px;',
        'padding: 0 15px;',
        'font-size: 12px;',
    '}',
    '#replybox_title:hover a {color: #222;}',
    '#reply_dialog #subject_line{',
        'height: 20px;',
        'margin: 10px 0;',
    '}',
    '#post_expression {',
        'display: inline-block;',
        'height: 15px;',
        'width: 15px;',
        'margin: 3px;',
        'vertical-align: middle;',
    '}',
    '#post_subject {',
        'margin-left: 5px;',
        'width: 400px;',
        'border: 1px solid #e0e0e0;',
    '}',
    '#post_subject:focus { outline: 1px solid #9AC0E6; }',

    '#expression_list {',
        'position: relative;',
        'background-color: #fff;',
        'z-index: 100;',
        'margin-top: -24px; /* 比原表情的位置偏离一点点，以覆盖住后面表示被选中的虚线框 */',
        'margin-left: 2px;',
    '}',
    '#expression_list img {',
        'cursor: pointer;',
        'margin: 0 10px 0 0;',
        'border: 0;',
    '}',

    '#editor {',
        'margin: 0 auto;',
        'border: 1px solid #9AC0E6;',
        'overflow: auto;',
    '}',

    '#e_control {',
        'color: grey;',

        'background-color: #F1F4F8;',
        'border-bottom: 1px solid #9AC0E6;',
        'padding: 3px;',
    '}',
    'img.e_ctrl_btn {',
        'height: 16px;',
        'width: 16px;',
        'margin: 0 3px 0 0;',
        'border: 0;',
        'vertical-align: middle;',
    '}',
    '#add_attachments {',
        'display: inline-block;',
        'margin-left: 20px;',
        'color: grey;',
        'text-decoration: none;',
        'vertical-align: middle',
    '}',


    '#emot_panel {',
        'position: absolute;',
        'top: 0;',
        'right: 635px;',
        'width: 280px;',
        'background-color: #fff;',
        'padding: 5px 8px;',
        'border-radius: 5px;',
        'box-shadow: rgba(0, 0, 0, 0.4) 0 0 5px;',
    '}',
    '#emot_panel li {',
        'display: inline-block;',
        'padding: 0 4px;',
        'height: 21px;',
        'line-height: 22px;',
        'color: #369;',
        'cursor: pointer;',
    '}',

    '#emot_tab {',
        'border-bottom: 1px solid #B8D4E8;',
        'height: 22px;',
        'margin: 0px;',
        'margin-bottom: 5px;',
        'padding: 0 3px;',
    '}',
    '.current {',
        'font-weight: bold;',
        'padding: 0 8px;',
        'border: 1px solid #B8D4E8;',
        'border-bottom: 1px solid #fff;',
        'border-radius: 3px 3px 0 0;',
    '}',

    '.emotion_list img {',
        'cursor: pointer;',
        'height: 20px;',
        'width: 20px;',
        'margin: 2px;',
        'padding: 1px;',
        'border: 1px solid #ccc;',
    '}',
    '.emotion_list img:hover {',
        'border: 1px solid #f78639;',
    '}',

    '#emot_preview {',
        'position: absolute;',
        'top: 28px;',
        'display: block;',
        'max-height: 100px;',
        'max-width: 100px;',
    '}',

    '#emot_action {',
        'padding-left: 0;',
        'margin: 10px 0 0 0;',
    '}',

    '#emotion_config {',
        'position: absolute;',
        'background-color: #fff;',
        'padding: 3px 5px;',
        'box-shadow: rgba(0, 0, 0, 0.4) 0 0 20px;',
    '}',
    '#group_name { width: 400px; }',
    '#group_content {',
        'width: 400px;',
        'min-height: 300px;',
    '}',


    '#post_content {',
        'border: 0;',
        'height: 200px;',
        'width: 100%;',
        'padding: 5px;',
        'box-sizing: border-box;',
        '-moz-box-sizing: border-box;',
        '-webkit-box-sizing: border-box;',

        'overflow: auto;',
        'resize: vertical;',
        'word-wrap: break-word;',
    '}',
    '#post_content:focus { outline: 0px solid #9AC0E6; }',

    '#e_statusbar {',
        'background-color: #f2f2f2;',
        'border-top: 1px solid #9AC0E6;',

        'color: grey;',
        'padding: 2px;',
        'text-align: right;',
    '}',
    '#e_autosavecount {',
        'display: inline-block;',
        'padding-right: 20px;',
    '}',
    '#e_save, #e_recover {',
        'text-decoration: none;',
        'color: grey;',
    '}',
    '#e_tip {',
        'width: 200px;',
        'float: left;',
        'text-align: left;',
    '}',


    '/* 一个对话框中的（末行）按钮区 */',
    '.btn_bar {',
        'margin: 10px 0 0 0;',
        'width: 100%;',
    '}',
    '/* 标准按钮样式 */',
    '.soda_button {',
        'height: 20px;',
        'width: 75px;',
        'border: 0;',
        'border-radius: 2px;',

        'cursor: pointer;',
        'color: #fff;',
        'background-color: #6595D6;',
        'padding: 0 0 2px; /* 用baseliner测试了一下，这样内部文字是居中的，不过我也不清楚为什么是这个数 */',
    '}',
    '#submitting_status {',
        'display: inline-block;',
        'padding-left: 20px;',
        'text-align: left;',
        'color: red;',

        'padding-bottom: 1px;  // 因为button中的文字也有1px的padding，因此，为了对齐，加了这一句',
        'vertical-align: middle;',
    '}',


    '#attach_table {',
        'display: none;',
        'position:relative;',
        'height:50px;',
        'width: 100%;',
        'margin-top: 10px;',

        'padding: 2px;',
        'border-collapse: collapse;',
        'overflow: visible;',
        'text-align: left;',
    '}',
    '#attach_table th, #attach_table td { border: 1px solid #fff;}',
    '#attach_table th {',
        'color: #fff;',
        'background-color: #6595D6;',
        'background-image: none;',
    '}',
    '#attach_list > *:nth-child(even) { background-color:#ddd; }',
    '#attach_list > *:nth-child(odd) { background-color:#eee; }',

    '.filename { color: #090; }',
    '.uploadfail { color:#900; }',
    '.uploadsuccess { color:#090; }',

    '#upload_panel {',
        'position: absolute;',

        'border: 0px solid #ccc;',
        'border-radius: 5px;',
        'box-shadow: rgba(0, 0, 0, 0.4) 0 0 18px;',
        'margin: 0 auto;',
        'padding: 8px;',

        'color: #000;',
        'background-color: #fff;',
        'z-index: 200;',
    '}',
    '/* 上传面板的留白要比回复面板的留白稍小，故margin要覆盖定义 */',
    '#upload_title { margin: 0 0 15px 0; }',
    '/* 这个只是用来保证各浏览器的上传按钮宽度一样 */',
    '#files { width: 250px; }',
    '/* 垂直居中显示checkbox */',
    '#image_autoshow {',
        'margin: 0 2px 2px 0;',
        'padding: 0;',
        'vertical-align: middle;',
    '}',
    '#upload_msg {',
        'color: red;',
        'padding-left: 3px;',
    '}',
    '.fastquote_btn, .multiquote_btn {',
        'display: inline-block;',
        'vertical-align: middle;',
        'margin: 0 5px;',
    '}',


    '#reply_options {',
        'border: 0;',
        'width: 400px;',
    '}',
    '#reply_options input[type="text"]{',
        'width: 50%;',
        'height: 25px;',
    '}',
    '#reply_options textarea {',
        'width: 80%;',
        'height: 50px;',
        'resize: vertical;',
    '}',
    '#reply_options input[type="checkbox"] {',
        'margin: 0 2px 2px 0;',
        'vertical-align: middle;',
    '}',
    '#fast_reply {',
        'display: inline-block;',
        'background-image: url("http://file.cc98.org/uploadfile/2013/8/13/21275287642.png");',
        'background-color: #f4f4f4;',
        'position: fixed;',
        'bottom: 30%;',
        'right: 0;',
        'width: 30px;',
        'height: 24px;',
        'border: 1px #cdcdcd solid;',
        'border-radius: 3px;',
        'padding: 3px 5px;',
        'margin: 0;',
        'cursor: pointer;',
    '}',
    '#fast_reply:hover {',
        'background-position: 40px;',
    '}',
    '#at-status {',
        'position: absolute;',
        'background-color: #fff;',
        'box-shadow: grey 0px 0px 2px 2px;',
        'opacity: 0.8;',
        'top: 88px;',
        'right: 17px;',
        'margin: 0;',
        'padding: 5px 15px;',
        'list-style: none;',
    '}',
    '.at-succeed { color: green; }',
    '.at-fail { color: brown; }',
    '.at-complete { color: blue; }',
    '#reply_options fieldset {',
        'border: medium none;',
        'margin: 0;',
        'padding: 0;',
    '}',
    '#reply_options legend {',
        'font-weight: bold;',
        'padding: 0 0 10px;',
    '}',
    '.desc {',
        'display: block;',
        'padding: 5px 0 0;',
        'font-weight: bold;',
    '}'
    ].join('\n'));

});
})(jq);
