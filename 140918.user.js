// ==UserScript==
// @id             banki.ru_plus_beta
// @name           Банки.ру + BETA
// @version        0.92.5.7
// @namespace      
// @author         rebelion76
// @description    Расширение возможностей сайта banki.ru. Дальше - больше!
// @include        http://*.banki.ru/*
// @include        https://*.banki.ru/*
// @include        http://banki.ru/*
// @include        https://banki.ru/*
// @match          *://banki.ru/*   
// @match          *://*.banki.ru/*   
// ==/UserScript==

//---------------------- Библиотеки ----------------------------------------------

/*! jQuery v1.11.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
// ,a.addEventListener("load",K,!1)  удалено 
// оно же // A fallback to window.onload, that will always work  Illegal invocation 
//        window.addEventListener( "load", completed, false );
// В Chrome+TamperMonkey через раз вызывало Illegal invocation
// 
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m="1.11.0",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(l.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:k&&!k.call("\ufeff\xa0")?function(a){return null==a?"":k.call(a)}:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||n.guid++,e):void 0},now:function(){return+new Date},support:l}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=a.document,A=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,B=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:A.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:z,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=z.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return y.find(a);this.length=1,this[0]=d}return this.context=z,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};B.prototype=n.fn,y=n(z);var C=/^(?:parents|prev(?:Until|All))/,D={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!n(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function E(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return E(a,"nextSibling")},prev:function(a){return E(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(D[a]||(e=n.unique(e)),C.test(a)&&(e=e.reverse())),this.pushStack(e)}});var F=/\S+/g,G={};function H(a){var b=G[a]={};return n.each(a.match(F)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?G[a]||H(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&n.each(arguments,function(a,c){var d;while((d=n.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){if(a===!0?!--n.readyWait:!n.isReady){if(!z.body)return setTimeout(n.ready);n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(z,[n]),n.fn.trigger&&n(z).trigger("ready").off("ready"))}}});function J(){z.addEventListener?(z.removeEventListener("DOMContentLoaded",K,!1),a.removeEventListener("load",K,!1)):(z.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(z.addEventListener||"load"===event.type||"complete"===z.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===z.readyState)setTimeout(n.ready);else if(z.addEventListener)z.addEventListener("DOMContentLoaded",K,!1);else{z.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&z.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!n.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}J(),n.ready()}}()}return I.promise(b)};var L="undefined",M;for(M in n(l))break;l.ownLast="0"!==M,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c=z.getElementsByTagName("body")[0];c&&(a=z.createElement("div"),a.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",b=z.createElement("div"),c.appendChild(a).appendChild(b),typeof b.style.zoom!==L&&(b.style.cssText="border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1",(l.inlineBlockNeedsLayout=3===b.offsetWidth)&&(c.style.zoom=1)),c.removeChild(a),a=b=null)}),function(){var a=z.createElement("div");if(null==l.deleteExpando){l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}}a=null}(),n.acceptData=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(n.acceptData(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f
}}function S(a,b,c){if(n.acceptData(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d]));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},W=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},X=/^(?:checkbox|radio)$/i;!function(){var a=z.createDocumentFragment(),b=z.createElement("div"),c=z.createElement("input");if(b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a>",l.leadingWhitespace=3===b.firstChild.nodeType,l.tbody=!b.getElementsByTagName("tbody").length,l.htmlSerialize=!!b.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==z.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,a.appendChild(c),l.appendChecked=c.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,a.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){l.noCloneEvent=!1}),b.cloneNode(!0).click()),null==l.deleteExpando){l.deleteExpando=!0;try{delete b.test}catch(d){l.deleteExpando=!1}}a=b=c=null}(),function(){var b,c,d=z.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),l[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var Y=/^(?:input|select|textarea)$/i,Z=/^key/,$=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,ab=/^([^.]*)(?:\.(.+)|)$/;function bb(){return!0}function cb(){return!1}function db(){try{return z.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof n===L||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(F)||[""],h=b.length;while(h--)f=ab.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(F)||[""],j=b.length;while(j--)if(h=ab.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,m,o=[d||z],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||z,3!==d.nodeType&&8!==d.nodeType&&!_.test(p+n.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[n.expando]?b:new n.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),k=n.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!n.isWindow(d)){for(i=k.delegateType||p,_.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||z)&&o.push(l.defaultView||l.parentWindow||a)}m=0;while((h=o[m++])&&!b.isPropagationStopped())b.type=m>1?i:k.bindType||p,f=(n._data(h,"events")||{})[b.type]&&n._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&n.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&n.acceptData(d)&&g&&d[p]&&!n.isWindow(d)){l=d[g],l&&(d[g]=null),n.event.triggered=p;try{d[p]()}catch(r){}n.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((n.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?n(c,this).index(i)>=0:n.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=$.test(e)?this.mouseHooks:Z.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||z),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||z,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==db()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===db()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=z.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===L&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&(a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault())?bb:cb):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:cb,isPropagationStopped:cb,isImmediatePropagationStopped:cb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=bb,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=bb,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submitBubbles||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?b.form:void 0;c&&!n._data(c,"submitBubbles")&&(n.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),n._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.changeBubbles||(n.event.special.change={setup:function(){return Y.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),n.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),n.event.simulate("change",this,a,!0)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;Y.test(b.nodeName)&&!n._data(b,"changeBubbles")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a,!0)}),n._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!Y.test(this.nodeName)}}),l.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=cb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return n().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=cb),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});function eb(a){var b=fb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var fb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gb=/ jQuery\d+="(?:null|\d+)"/g,hb=new RegExp("<(?:"+fb+")[\\s/>]","i"),ib=/^\s+/,jb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,kb=/<([\w:]+)/,lb=/<tbody/i,mb=/<|&#?\w+;/,nb=/<(?:script|style|link)/i,ob=/checked\s*(?:[^=]|=\s*.checked.)/i,pb=/^$|\/(?:java|ecma)script/i,qb=/^true\/(.*)/,rb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,sb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},tb=eb(z),ub=tb.appendChild(z.createElement("div"));sb.optgroup=sb.option,sb.tbody=sb.tfoot=sb.colgroup=sb.caption=sb.thead,sb.th=sb.td;function vb(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==L?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==L?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,vb(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function wb(a){X.test(a.type)&&(a.defaultChecked=a.checked)}function xb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function yb(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function zb(a){var b=qb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ab(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}function Bb(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Cb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(yb(b).text=a.text,zb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&X.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}n.extend({clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!hb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ub.innerHTML=a.outerHTML,ub.removeChild(f=ub.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=vb(f),h=vb(a),g=0;null!=(e=h[g]);++g)d[g]&&Cb(e,d[g]);if(b)if(c)for(h=h||vb(a),d=d||vb(f),g=0;null!=(e=h[g]);g++)Bb(e,d[g]);else Bb(a,f);return d=vb(f,"script"),d.length>0&&Ab(d,!i&&vb(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k,m=a.length,o=eb(b),p=[],q=0;m>q;q++)if(f=a[q],f||0===f)if("object"===n.type(f))n.merge(p,f.nodeType?[f]:f);else if(mb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(kb.exec(f)||["",""])[1].toLowerCase(),k=sb[i]||sb._default,h.innerHTML=k[1]+f.replace(jb,"<$1></$2>")+k[2],e=k[0];while(e--)h=h.lastChild;if(!l.leadingWhitespace&&ib.test(f)&&p.push(b.createTextNode(ib.exec(f)[0])),!l.tbody){f="table"!==i||lb.test(f)?"<table>"!==k[1]||lb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)n.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}n.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),l.appendChecked||n.grep(vb(p,"input"),wb),q=0;while(f=p[q++])if((!d||-1===n.inArray(f,d))&&(g=n.contains(f.ownerDocument,f),h=vb(o.appendChild(f),"script"),g&&Ab(h),c)){e=0;while(f=h[e++])pb.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.deleteExpando,m=n.event.special;null!=(d=a[h]);h++)if((b||n.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k?delete d[i]:typeof d.removeAttribute!==L?d.removeAttribute(i):d[i]=null,c.push(f))}}}),n.fn.extend({text:function(a){return W(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||z).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(vb(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&Ab(vb(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(vb(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return W(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(gb,""):void 0;if(!("string"!=typeof a||nb.test(a)||!l.htmlSerialize&&hb.test(a)||!l.leadingWhitespace&&ib.test(a)||sb[(kb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(jb,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(vb(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(vb(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,o=k-1,p=a[0],q=n.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&ob.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(i=n.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=n.map(vb(i,"script"),yb),f=g.length;k>j;j++)d=i,j!==o&&(d=n.clone(d,!0,!0),f&&n.merge(g,vb(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,n.map(g,zb),j=0;f>j;j++)d=g[j],pb.test(d.type||"")&&!n._data(d,"globalEval")&&n.contains(h,d)&&(d.src?n._evalUrl&&n._evalUrl(d.src):n.globalEval((d.text||d.textContent||d.innerHTML||"").replace(rb,"")));i=c=null}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],g=n(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Db,Eb={};function Fb(b,c){var d=n(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:n.css(d[0],"display");return d.detach(),e}function Gb(a){var b=z,c=Eb[a];return c||(c=Fb(a,b),"none"!==c&&c||(Db=(Db||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Db[0].contentWindow||Db[0].contentDocument).document,b.write(),b.close(),c=Fb(a,b),Db.detach()),Eb[a]=c),c}!function(){var a,b,c=z.createElement("div"),d="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],a.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(a.style.opacity),l.cssFloat=!!a.style.cssFloat,c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===c.style.backgroundClip,a=c=null,l.shrinkWrapBlocks=function(){var a,c,e,f;if(null==b){if(a=z.getElementsByTagName("body")[0],!a)return;f="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",c=z.createElement("div"),e=z.createElement("div"),a.appendChild(c).appendChild(e),b=!1,typeof e.style.zoom!==L&&(e.style.cssText=d+";width:1px;padding:1px;zoom:1",e.innerHTML="<div></div>",e.firstChild.style.width="5px",b=3!==e.offsetWidth),a.removeChild(c),a=c=e=null}return b}}();var Hb=/^margin/,Ib=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Jb,Kb,Lb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Jb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),Ib.test(g)&&Hb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):z.documentElement.currentStyle&&(Jb=function(a){return a.currentStyle},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ib.test(g)&&!Lb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Mb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h=z.createElement("div"),i="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",j="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";h.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",b=h.getElementsByTagName("a")[0],b.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(b.style.opacity),l.cssFloat=!!b.style.cssFloat,h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,b=h=null,n.extend(l,{reliableHiddenOffsets:function(){if(null!=c)return c;var a,b,d,e=z.createElement("div"),f=z.getElementsByTagName("body")[0];if(f)return e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=z.createElement("div"),a.style.cssText=i,f.appendChild(a).appendChild(e),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",b=e.getElementsByTagName("td"),b[0].style.cssText="padding:0;margin:0;border:0;display:none",d=0===b[0].offsetHeight,b[0].style.display="",b[1].style.display="none",c=d&&0===b[0].offsetHeight,f.removeChild(a),e=f=null,c},boxSizing:function(){return null==d&&k(),d},boxSizingReliable:function(){return null==e&&k(),e},pixelPosition:function(){return null==f&&k(),f},reliableMarginRight:function(){var b,c,d,e;if(null==g&&a.getComputedStyle){if(b=z.getElementsByTagName("body")[0],!b)return;c=z.createElement("div"),d=z.createElement("div"),c.style.cssText=i,b.appendChild(c).appendChild(d),e=d.appendChild(z.createElement("div")),e.style.cssText=d.style.cssText=j,e.style.marginRight=e.style.width="0",d.style.width="1px",g=!parseFloat((a.getComputedStyle(e,null)||{}).marginRight),b.removeChild(c)}return g}});function k(){var b,c,h=z.getElementsByTagName("body")[0];h&&(b=z.createElement("div"),c=z.createElement("div"),b.style.cssText=i,h.appendChild(b).appendChild(c),c.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%",n.swap(h,null!=h.style.zoom?{zoom:1}:{},function(){d=4===c.offsetWidth}),e=!0,f=!1,g=!0,a.getComputedStyle&&(f="1%"!==(a.getComputedStyle(c,null)||{}).top,e="4px"===(a.getComputedStyle(c,null)||{width:"4px"}).width),h.removeChild(b),c=h=null)}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Nb=/alpha\([^)]*\)/i,Ob=/opacity\s*=\s*([^)]*)/,Pb=/^(none|table(?!-c[ea]).+)/,Qb=new RegExp("^("+T+")(.*)$","i"),Rb=new RegExp("^([+-])=("+T+")","i"),Sb={position:"absolute",visibility:"hidden",display:"block"},Tb={letterSpacing:0,fontWeight:400},Ub=["Webkit","O","Moz","ms"];function Vb(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ub.length;while(e--)if(b=Ub[e]+c,b in a)return b;return d}function Wb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=n._data(d,"olddisplay",Gb(d.nodeName)))):f[g]||(e=V(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Xb(a,b,c){var d=Qb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Yb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Zb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Jb(a),g=l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Kb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ib.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Yb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Kb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=Vb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Rb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]="",i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Vb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Kb(a,b,d)),"normal"===f&&b in Tb&&(f=Tb[b]),""===c||c?(e=parseFloat(f),c===!0||n.isNumeric(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&Pb.test(n.css(a,"display"))?n.swap(a,Sb,function(){return Zb(a,b,d)}):Zb(a,b,d):void 0},set:function(a,c,d){var e=d&&Jb(a);return Xb(a,c,d?Yb(a,b,d,l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Ob.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Nb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Nb.test(f)?f.replace(Nb,e):f+" "+e)}}),n.cssHooks.marginRight=Mb(l.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},Kb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Hb.test(a)||(n.cssHooks[a+b].set=Xb)}),n.fn.extend({css:function(a,b){return W(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Jb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)
},a,b,arguments.length>1)},show:function(){return Wb(this,!0)},hide:function(){return Wb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function $b(a,b,c,d,e){return new $b.prototype.init(a,b,c,d,e)}n.Tween=$b,$b.prototype={constructor:$b,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=$b.propHooks[this.prop];return a&&a.get?a.get(this):$b.propHooks._default.get(this)},run:function(a){var b,c=$b.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):$b.propHooks._default.set(this),this}},$b.prototype.init.prototype=$b.prototype,$b.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},$b.propHooks.scrollTop=$b.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=$b.prototype.init,n.fx.step={};var _b,ac,bc=/^(?:toggle|show|hide)$/,cc=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),dc=/queueHooks$/,ec=[jc],fc={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=cc.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&cc.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function gc(){return setTimeout(function(){_b=void 0}),_b=n.now()}function hc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=U[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function ic(a,b,c){for(var d,e=(fc[b]||[]).concat(fc["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function jc(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&V(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k=Gb(a.nodeName),"none"===j&&(j=k),"inline"===j&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==k?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],bc.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}if(!n.isEmptyObject(o)){r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=ic(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function kc(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function lc(a,b,c){var d,e,f=0,g=ec.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=_b||gc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:_b||gc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(kc(k,j.opts.specialEasing);g>f;f++)if(d=ec[f].call(j,a,k,j.opts))return d;return n.map(k,ic,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(lc,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],fc[c]=fc[c]||[],fc[c].unshift(b)},prefilter:function(a,b){b?ec.unshift(a):ec.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=lc(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&dc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(hc(b,!0),a,d,e)}}),n.each({slideDown:hc("show"),slideUp:hc("hide"),slideToggle:hc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(_b=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),_b=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ac||(ac=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(ac),ac=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e=z.createElement("div");e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=e.getElementsByTagName("a")[0],c=z.createElement("select"),d=c.appendChild(z.createElement("option")),b=e.getElementsByTagName("input")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==e.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=d.selected,l.enctype=!!z.createElement("form").enctype,c.disabled=!0,l.optDisabled=!d.disabled,b=z.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value,a=b=c=d=e=null}();var mc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(mc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.text(a)}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var nc,oc,pc=n.expr.attrHandle,qc=/^(?:checked|selected)$/i,rc=l.getSetAttribute,sc=l.input;n.fn.extend({attr:function(a,b){return W(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===L?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?oc:nc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(F);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?sc&&rc||!qc.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(rc?c:d)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),oc={set:function(a,b,c){return b===!1?n.removeAttr(a,c):sc&&rc||!qc.test(c)?a.setAttribute(!rc&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=pc[b]||n.find.attr;pc[b]=sc&&rc||!qc.test(b)?function(a,b,d){var e,f;return d||(f=pc[b],pc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,pc[b]=f),e}:function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),sc&&rc||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):nc&&nc.set(a,b,c)}}),rc||(nc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},pc.id=pc.name=pc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:nc.set},n.attrHooks.contenteditable={set:function(a,b,c){nc.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var tc=/^(?:input|select|textarea|button|object)$/i,uc=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return W(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):tc.test(a.nodeName)||uc.test(a.nodeName)&&a.href?0:-1}}}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var vc=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(F)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===L||"boolean"===c)&&(this.className&&n._data(this,"__className__",this.className),this.className=this.className||a===!1?"":n._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(vc," ").indexOf(b)>=0)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var wc=n.now(),xc=/\?/,yc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(yc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var zc,Ac,Bc=/#.*$/,Cc=/([?&])_=[^&]*/,Dc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ec=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Fc=/^(?:GET|HEAD)$/,Gc=/^\/\//,Hc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ic={},Jc={},Kc="*/".concat("*");try{Ac=location.href}catch(Lc){Ac=z.createElement("a"),Ac.href="",Ac=Ac.href}zc=Hc.exec(Ac.toLowerCase())||[];function Mc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(F)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nc(a,b,c,d){var e={},f=a===Jc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Oc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Pc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Qc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ac,type:"GET",isLocal:Ec.test(zc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Oc(Oc(a,n.ajaxSettings),b):Oc(n.ajaxSettings,a)},ajaxPrefilter:Mc(Ic),ajaxTransport:Mc(Jc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Dc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||Ac)+"").replace(Bc,"").replace(Gc,zc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(F)||[""],null==k.crossDomain&&(c=Hc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===zc[1]&&c[2]===zc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(zc[3]||("http:"===zc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),Nc(Ic,k,b,v),2===t)return v;h=k.global,h&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Fc.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(xc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Cc.test(e)?e.replace(Cc,"$1_="+wc++):e+(xc.test(e)?"&":"?")+"_="+wc++)),k.ifModified&&(n.lastModified[e]&&v.setRequestHeader("If-Modified-Since",n.lastModified[e]),n.etag[e]&&v.setRequestHeader("If-None-Match",n.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Kc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Nc(Jc,k,b,v)){v.readyState=1,h&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Pc(k,v,c)),u=Qc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(n.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!l.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||n.css(a,"display"))},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var Rc=/%20/g,Sc=/\[\]$/,Tc=/\r?\n/g,Uc=/^(?:submit|button|image|reset|file)$/i,Vc=/^(?:input|select|textarea|keygen)/i;function Wc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Sc.test(a)?d(a,e):Wc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Wc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Wc(c,a[c],b,e);return d.join("&").replace(Rc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Vc.test(this.nodeName)&&!Uc.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Tc,"\r\n")}}):{name:b.name,value:c.replace(Tc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&$c()||_c()}:$c;var Xc=0,Yc={},Zc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Yc)Yc[a](void 0,!0)}),l.cors=!!Zc&&"withCredentials"in Zc,Zc=l.ajax=!!Zc,Zc&&n.ajaxTransport(function(a){if(!a.crossDomain||l.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Xc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Yc[g],b=void 0,f.onreadystatechange=n.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Yc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function $c(){try{return new a.XMLHttpRequest}catch(b){}}function _c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=z.head||n("head")[0]||z.documentElement;return{send:function(d,e){b=z.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var ad=[],bd=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=ad.pop()||n.expando+"_"+wc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(bd.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&bd.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(bd,"$1"+e):b.jsonp!==!1&&(b.url+=(xc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,ad.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||z;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var cd=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&cd)return cd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h,a.length),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&n.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var dd=a.document.documentElement;function ed(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?(typeof e.getBoundingClientRect!==L&&(d=e.getBoundingClientRect()),c=ed(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||dd;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||dd})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return W(this,function(a,d,e){var f=ed(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Mb(l.pixelPosition,function(a,c){return c?(c=Kb(a,b),Ib.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return W(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var fd=a.jQuery,gd=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=gd),b&&a.jQuery===n&&(a.jQuery=fd),n},typeof b===L&&(a.jQuery=a.$=n),n});

// --------------------- Основные переменные --------------------------------------

/** Префикс для переменных */
var prefix = "banki_ru_plus_"; 
/** Версия  */
var version = "0.92.5.7";
/** Новая версия */
var new_version = getParam('new_version');
/** Адрес обновления */
var UPDATE_URL = "http://rawgithub.com/rebelion76/bankiru_plus/master/bankiru_plus_beta.user.js";
/** Адрес скрипта с версией */
var VERSION_URL = "http://rawgithub.com/rebelion76/bankiru_plus/master/version.js";
/** Объект класса-страницы */
var page = new BankiruPage; 
/** Иконка для меню скрипта */
var favicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkI2OTZCMzIzQzlFMTFFM0E5QUNCMTYzQkQ4NUQxNzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkI2OTZCMzMzQzlFMTFFM0E5QUNCMTYzQkQ4NUQxNzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQjY5NkIzMDNDOUUxMUUzQTlBQ0IxNjNCRDg1RDE3MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQjY5NkIzMTNDOUUxMUUzQTlBQ0IxNjNCRDg1RDE3MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrUsCVIAAAAMUExURf///zSY22y0TfOcErQw86oAAAABdFJOUwBA5thmAAAAIUlEQVQI12NgYAgNdWAAAfLoVWDQQDHNwPD//wGwuWTRAFefRZ32+6jbAAAAAElFTkSuQmCC";
/** Иконка ожидания */
var waiticon = "data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYiIiHd3d2ZmZlVVVURERDMzMyIiIhEREQARAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAQACwAAAAAEAAQAAAFdyAkQgGJJOWoQgIjBM8jkKsoPEzgyMGsCjPDw7ADpkQBxRDmSCRetpRA6Rj4kFBkgLC4IlUGhbNQIwXOYYWCXDufzYPDMaoKGBoKb886OjAKdgZAAgQkfCwzAgsDBAUCgl8jAQkHEAVkAoA1AgczlyIDczUDA2UhACH5BAUHABAALAAAAAAPABAAAAVjICSO0IGIATkqIiMKDaGKC8Q49jPMYsE0hQdrlABCGgvT45FKiRKQhWA0mPKGPAgBcTjsspBCAoH4gl+FmXNEUEBVAYHToJAVZK/XWoQQDAgBZioHaX8igigFKYYQVlkCjiMhACH5BAUHABAALAAAAAAQAA8AAAVgICSOUGGQqIiIChMESyo6CdQGdRqUENESI8FAdFgAFwqDISYwPB4CVSMnEhSej+FogNhtHyfRQFmIol5owmEta/fcKITB6y4choMBmk7yGgSAEAJ8JAVDgQFmKUCCZnwhACH5BAUHABAALAAAAAAQABAAAAViICSOYkGe4hFAiSImAwotB+si6Co2QxvjAYHIgBAqDoWCK2Bq6A40iA4yYMggNZKwGFgVCAQZotFwwJIF4QnxaC9IsZNgLtAJDKbraJCGzPVSIgEDXVNXA0JdgH6ChoCKKCEAIfkEBQcAEAAsAAAAABAADgAABUkgJI7QcZComIjPw6bs2kINLB5uW9Bo0gyQx8LkKgVHiccKVdyRlqjFSAApOKOtR810StVeU9RAmLqOxi0qRG3LptikAVQEh4UAACH5BAUHABAALAAAAAAQABAAAAVxICSO0DCQKBQQonGIh5AGB2sYkMHIqYAIN0EDRxoQZIaC6bAoMRSiwMAwCIwCggRkwRMJWKSAomBVCc5lUiGRUBjO6FSBwWggwijBooDCdiFfIlBRAlYBZQ0PWRANaSkED1oQYHgjDA8nM3kPfCmejiEAIfkEBQcAEAAsAAAAABAAEAAABWAgJI6QIJCoOIhFwabsSbiFAotGMEMKgZoB3cBUQIgURpFgmEI0EqjACYXwiYJBGAGBgGIDWsVicbiNEgSsGbKCIMCwA4IBCRgXt8bDACkvYQF6U1OADg8mDlaACQtwJCEAIfkEBQcAEAAsAAABABAADwAABV4gJEKCOAwiMa4Q2qIDwq4wiriBmItCCREHUsIwCgh2q8MiyEKODK7ZbHCoqqSjWGKI1d2kRp+RAWGyHg+DQUEmKliGx4HBKECIMwG61AgssAQPKA19EAxRKz4QCVIhACH5BAUHABAALAAAAAAQABAAAAVjICSOUBCQqHhCgiAOKyqcLVvEZOC2geGiK5NpQBAZCilgAYFMogo/J0lgqEpHgoO2+GIMUL6p4vFojhQNg8rxWLgYBQJCASkwEKLC17hYFJtRIwwBfRAJDk4ObwsidEkrWkkhACH5BAUHABAALAAAAQAQAA8AAAVcICSOUGAGAqmKpjis6vmuqSrUxQyPhDEEtpUOgmgYETCCcrB4OBWwQsGHEhQatVFhB/mNAojFVsQgBhgKpSHRTRxEhGwhoRg0CCXYAkKHHPZCZRAKUERZMAYGMCEAIfkEBQcAEAAsAAABABAADwAABV0gJI4kFJToGAilwKLCST6PUcrB8A70844CXenwILRkIoYyBRk4BQlHo3FIOQmvAEGBMpYSop/IgPBCFpCqIuEsIESHgkgoJxwQAjSzwb1DClwwgQhgAVVMIgVyKCEAIfkECQcAEAAsAAAAABAAEAAABWQgJI5kSQ6NYK7Dw6xr8hCw+ELC85hCIAq3Am0U6JUKjkHJNzIsFAqDqShQHRhY6bKqgvgGCZOSFDhAUiWCYQwJSxGHKqGAE/5EqIHBjOgyRQELCBB7EAQHfySDhGYQdDWGQyUhADs=";

/** Список адресов страниц и функций, которые должны быть выполнены на этих страницах
 *  Формат : { address: '<регулярка адреса, \ нужен двойной!>', functions: '<список функций через пробел запятая>', isLast: <true, если после выполнения закончить> }
 */
var functionsSequence = [
       /* Все страницы */  
       { address : 'banki\\.ru\\/', functions : 'loadFilesEtc, updateUserScript, addUserScriptMenu, addOptionsWindow, addLinkInMainMenu, deleteAutoSave, removeRedirect, addSelectToSearchInTop, addToUserMenu, removeUpButton, changeLinkToPM, repairRightBlock', isLast : false },
       /* НР */
       { address: 'banki\\.ru\\/services\\/responses\\/$', functions: 'addRSSToListOfBanks', isLast: true },
       { address: 'banki\\.ru\\/services\\/responses\\/bank\\/.*responseID.*', functions: 'deleteHRRigthBlock, recollapseResponses, addForumFormToHP, addHrefsToHP', isLast: true },
       { address: 'banki\\.ru\\/services\\/responses\\/bank\\/.*?', functions: 'deleteHRRigthBlock, addRSSToResponces, recollapseResponses, hiddenResponse, addAdditionalSearchToResponces', isLast: true },
       { address: 'banki\\.ru\\/services\\/responses\\/bank\\/#add', functions: 'deleteHRRigthBlock', isLast: true },
       /* ВИО */ 
       { address: 'banki\\.ru\\/services\\/questions-answers', functions: 'addRSSToQA', isLast: true },
       /* Новости */
       { address: 'banki\\.ru(\\/.*?)*\\/news\\/.*?id=.*', functions: 'changeNewsCommentsHref, repairNewsCommentsAuthorAndCitateHrefs', isLast: false },
       { address: 'banki\\.ru\\/news\\/lenta\\/.+\\/', functions: 'addRSSToLenta', isLast: true },
       { address: 'banki\\.ru\\/banks\\/bank\\/.*?\\/news\\/', functions: 'addRSSToBankNews', isLast: true },
       /* Профиль */
       { address: 'banki\\.ru\/profile\/\\?UID=\\d+#\\d', functions: 'filterThanksByUserId', isLast: false },
       { address: 'banki\\.ru\/profile\/\\?UID=\\d+', functions: 'addUserCoeffToProfile, addHrefsToProfile, change10ThanksToAll', isLast: true },
       /* Поиск по темам форума */
       { address: 'banki\\.ru\\/forum\\/.*?'+prefix+'searchInTheme', functions : 'changeSearchInForumPage', isLast: true }, 
       /* Форум */
       // , addAdditionalSmiles
       { address: 'banki\\.ru\\/forum\\/', functions : 'forumPage, addCutBBCodeToForum', isLast : false },
       { address: 'banki\\.ru\\/forum\\/(\\?modern=\\d|#|$|.*?'+prefix+'theme_search.*|.*?PAGE_NAME=(list|forum).*)', functions: 'addThemeSearchToForum', isLast : true },
       { address: 'banki\\.ru\\/forum\\/.*?TOPIC_SUBSCRIBE=Y&.*', functions: 'repairPageHrefsIfSubscribe', isLast : false },
       { address: 'banki\\.ru\\/forum\\/.*?PAGE_NAME=read&FID=10&TID=100712&banki_ru_plus_hidden_rid=.*', functions: 'addUrlToRecovery', isLast: false },
       { address: 'banki\\.ru\\/forum\\/.*?PAGE_NAME=(read|message).*', functions: 'addOpenCloseAllSpoilers, addUserCoeffToForum, addLinksToHiddenUserInfo, addHotKeysToForum, addGotoPage, addSpacesToSmallThank, addAditionalSearchToForum, addUserPostSearch, addHrefToQuotes', isLast: true }, 
       { address: 'banki\\.ru\\/forum\\/.*?PAGE_NAME=pm_edit.*', functions: 'enableSmilesInPM', isLast: true },
       /* Поиск по депозитам */
       { address: 'banki\\.ru\\/products\\/deposits\\/search\\/', functions: 'addRSSToDepositsSearch', isLast : true },
       /* Перегрузка друзей, не понятно работает ли */
       // { address: 'banki\\.ru\\/friends\\/group\\/.*?\\/forum\\/.*', functions: 'reloadFriendsToForum', isLast: true },
       // { address: 'banki\\.ru\\/(.*)FID=72', functions: 'addCommentFormToForum', isLast: true },
    ];

// ------------------- Вспомогательные функции ------------------------------------

/** Сохранить параметр в localStorage, при невозможности в cookie
 * @param {string} name Имя параметра
 * @param {string} value Значение параметра
 */
function setParam(name, value) {
   if (typeof(localStorage)=='undefined') { document.cookie = prefix+name+'='+value+';'+'expires=Tue, 19 Jan 2038 00:00:00 GMT'; }
   else { localStorage.setItem(prefix+name, value); }
}

/** Получить параметр из localStorage, при невозможности из cookie
 * @param {string} name Имя параметра
 * @return string
 */
function getParam(name) {
    if (typeof(localStorage)=='undefined') { return getCookie(prefix+name); }
    else { return localStorage.getItem(prefix+name); }
}

/** Прочитать параметр из cookie
 * @param {string} cookie_name Имя параметра
 */
function getCookie(cookie_name)
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
    if (results) return (unescape(results[2]));
    else return null;
}

/** Подгрузить css или js файл 
 * @param {string} filename URL для подключения
 * @param {'js'|'css'} filetype Тип файла
 */
function loadJsOrCssFile(filename, filetype) {
    switch (filetype) {
        case 'js' :  $('body').append('<script type="text/javascript" src="'+filename+'"></script>');
        case 'css' : $('body').append('<link href="'+filename+'" type="text/css" rel="stylesheet" />')
    }
}

/** Кодирует из win-1251 в escape-строку 
 * @param {string} str Строка для кодирования
 * @return {string}
 */
function escape1251(str)
{
    var ret = '';
    var i;
    for (i=0; i<str.length; i++)
    {
        var n = str.charCodeAt(i);
        
        if (n >= 0x410 && n <= 0x44F) n -= 0x350;
        else if (n == 0x451) n = 0xB8;
        else if (n == 0x401) n = 0xA8;
        else if (n == 8230) n = 133; // троеточие
        
        if ((n < 65 || n > 90) && (n < 97 || n > 122) && n < 256) {
            if (n < 16) ret += '%0'+n.toString(16);
            else ret += '%'+n.toString(16);
        }
        else ret += String.fromCharCode(n);
    }

    return ret;
}

/** Кодирует из escape-строки в win-1251 
 * @param {string} str Строка для раскодирования
 * @return {string}
 */
function unescape1251(str)
{
    var convTable = [0x402,0x403,0x201A,0x453,0x201E,0x2026,0x2020,0x2021,0x20AC,0x2030,0x409,0x2039,0x40A,0x40C,0x40B,0x40F,0x452,0x2018,0x2019,0x201C,0x201D,0x2022,0x2013,0x2014,0x20,0x2122,0x459,0x203A,0x45A,0x45C,
	0x45B,0x45F,0xA0,0x40E,0x45E,0x408,0xA4,0x490,0xA6,0xA7,0x401,0xA9,0x404,0xAB,0xAC,0xAD,0xAE,0x407,0xB0,0xB1,0x406,0x456,0x491,0xB5,0xB6,0xB7,0x451,0x2116,0x454,0xBB,0x458,0x405,0x455,0x457,0x410,
	0x411,0x412,0x413,0x414,0x415,0x416,0x417,0x418,0x419,0x41A,0x41B,0x41C,0x41D,0x41E,0x41F,0x420,0x421,0x422,0x423,0x424,0x425,0x426,0x427,0x428,0x429,0x42A,0x42B,0x42C,0x42D,0x42E,0x42F,0x430,0x431,
	0x432,0x433,0x434,0x435,0x436,0x437,0x438,0x439,0x43A,0x43B,0x43C,0x43D,0x43E,0x43F,0x440,0x441,0x442,0x443,0x444,0x445,0x446,0x447,0x448,0x449,0x44A,0x44B,0x44C,0x44D,0x44E,0x44F];
    return str.replace(/\+/g, '%20').replace(/%([0-9A-F]{2})/gi, 
	function(nothing, charCodeStr)
	{
	   var charCode = parseInt(charCodeStr, 16);
	   if (charCode < 0x7f){ return String.fromCharCode(charCode); }
	   else { return String.fromCharCode(convTable[charCode - 128]); }
	}
	);
}

/** Выполняет код скрипта
 * @param {string} source Код скрипта
 */ 
function contentEval(source) 
{
    if ('function' == typeof source) { source = '(' + source + ')();' }
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = source;
    document.getElementsByTagName("body")[0].appendChild(script);
//  document.body.removeChild(script);
}

/** Возвращает целое случайное число в промежутке от min до max
 * @param {int} min 
 * @param {int} max
 * @return {int} 
 */ 
function random(min, max) {
    var rand = min - 0.5 + Math.random()*(max-min+1);
    return Math.round(rand);
}

// --------------------- Основные функции ----------------------------------------------

/** Значек "вниз" для заголовка блока спойлера */
var CUT_SYMBOL = '&#9660;'; 
/** Возвращает текст, обрамленный соотв. BB-кодом
 * @param {string} string Текст   
 * @param {string} type Тип BB-кода   
 * @param {string} string_extra Дополнительный текст   
 * @param {string} string url URL   
 * @return {string}
 */
function frame(string, type, string_extra, url)
{
    switch (type) {
        case "form_b" : string="[B]"+string+"[/B]"; break;
        case "form_i" : string="[I]"+string+"[/I]"; break;
        case "form_u" : string="[U]"+string+"[/U]"; break;
        case "form_s" : string="[S]"+string+"[/S]"; break;
        case "form_quote" : string="[QUOTE]"+string+"[/QUOTE]"; break;
        case "name": string="[B]"+string_extra+", [/B]"; break;;
        case "name_quote": if (url) { string="[QUOTE]"+string_extra+" [URL="+url+"]написал(а)[/URL]: \n"+string+"[/QUOTE]"; } 
                           else { string="[QUOTE]"+string_extra+" написал(а): \n"+string+"[/QUOTE]"; }
                           break;
        case "smiles": string=" "+string_extra+" "; break;
        case "form_url": string="[URL="+url+"]"+string+"[/URL]"; break;  
        case "form_img": string="[IMG]"+url+"[/IMG]"; break;
        case "form_video": string="[VIDEO]"+url+"[/VIDEO]"; break;
        case "cut" : string="[CUT "+string_extra+" "+CUT_SYMBOL+"]"+string+"[/CUT]";
    }
    return string;
}

function insertIntoTextarea (type, string_extra, area_name, url)
{ 
    var area = document.getElementsByName(area_name).item(0);

    // if ((area.selectionStart)||(area.selectionStart=='0'))
    var pos_start = area.selectionStart;
    var pos_end = area.selectionEnd;
    var selection = (pos_start==pos_end) ? document.getSelection() : area.value.substring(pos_start,pos_end);
    var selection_text = selection.toString();
    
    if ((type==="form_url") || (type==="form_img") || (type==="form_video"))
    {
        url=prompt("Введите полный адрес (URL)","");
        if (!url) { return; }
      
        if (type==="form_url") 
        { 
            selection_text = prompt("Введите название сайта", selection_text);
            if (!selection_text) { return; }
        }
    }
    else if (type==="cut") {
        string_extra = prompt("Введите заголовок спойлера","");
        if (!string_extra) { return; }
    }
    
    var string_to_ins = frame(selection_text, type, string_extra, url); 
  
    area.value = area.value.substring(0,pos_start)+string_to_ins+area.value.substring(pos_end,area.value.legth);
    
    // area.focus();
    // area.selectionStart = pos_start;
    // area.selectionEnd = pos_start + string_to_ins.length;
    
    /*function (ibTag, ibClsTag, postText) {
ibTag = (ibTag && ibTag.length > 0 ? ibTag : "");
ibClsTag = (ibClsTag && ibClsTag.length > 0 ? ibClsTag : "");
postText = (postText && postText.length > 0 ? postText : "");
if (ibTag.length <= 0 && ibClsTag.length <= 0 && postText.length <= 0)
return true;
var bReplaceText = (!postText ? false : true);
var sSelectionText = this.GetSelection();
if (!this.form["POST_MESSAGE"].hasfocus) {
this.form["POST_MESSAGE"].focus();
}
var isSelect = (sSelectionText ? 'select' : bReplaceText ? 'after' : 'in');
if (bReplaceText)
postText = ibTag + postText + ibClsTag;
else if (sSelectionText)
postText = ibTag + sSelectionText + ibClsTag;
else
postText = ibTag + ibClsTag;
if (typeof(this.form["POST_MESSAGE"].selectionStart) != 'undefined') {
var currentScroll = this.form["POST_MESSAGE"].scrollTop;
var selection = {
"start" : this.form["POST_MESSAGE"].selectionStart,
"end" : this.form["POST_MESSAGE"].selectionEnd};
this.form["POST_MESSAGE"].value = this.form["POST_MESSAGE"].value.substr(0, selection["start"]) +
postText + this.form["POST_MESSAGE"].value.substr(selection["end"]);
if (isSelect == 'select') {
this.form["POST_MESSAGE"].selectionStart = selection["start"];
this.form["POST_MESSAGE"].selectionEnd = selection["start"] + postText.length;
}
else if (isSelect == 'in') {
this.form["POST_MESSAGE"].selectionStart = selection["start"] + ibTag.length;
this.form["POST_MESSAGE"].selectionEnd = selection["start"] + ibTag.length;
}
else {
this.form["POST_MESSAGE"].selectionStart = selection["start"] + postText.length;
this.form["POST_MESSAGE"].selectionEnd = selection["start"] + postText.length;
}
this.form["POST_MESSAGE"].scrollTop = currentScroll;
}
else if (document.selection && document.selection.createRange) {
var sel = document.selection.createRange();
var selection_copy = sel.duplicate();
postText = postText.replace(/\r?\n/g, '\r\n');
sel.text = postText;
sel.setEndPoint('StartToStart', selection_copy);
sel.setEndPoint('EndToEnd', selection_copy);
if (isSelect == 'select') {
sel.collapse(true);
postText = postText.replace(/\r\n/g, '1');
sel.moveEnd('character', postText.length);
}
else if (isSelect == 'in') {
sel.collapse(false);
sel.moveEnd('character', ibTag.length);
sel.collapse(false);
}
else {
sel.collapse(false);
sel.moveEnd('character', postText.length);
sel.collapse(false);
}
sel.select();
}
else {
// failed - just stuff it at the end of the message
this.form["POST_MESSAGE"].value += text;
}
return true;
}, */
 }

// добавление ссылок на RSS каналы на разных страницах banki.ru
function addRSS(typeOfRSS)
{
    var bankId;
    var filter;
    if (page.oldDesign) { filter = ".b-breadCrumbs"; }
    else filter = "nav.bread-crumbs";
    $(filter).html(function (index, oldhtml) {
        switch (typeOfRSS) {
            // ВИО конретного банка
            case 'qa' : bankId = getBankIdFromUrl(window.location.href); oldhtml += "&nbsp;<a title=\"Горячая линия\" href=\"http://pipes.yahoo.com/pipes/pipe.run?_id=c0131f2941e66ba399e563b7202d33f1&_render=rss&textinput2="+bankId+"\"><img src=\"/com/rss.gif\" alt=\"Горячая линия\" style=\"position: relative; top: 1px; z-index: 1;\"></a>&nbsp;"; break;
            // отзывы к конкретному банку в НР
            case 'responces' :  bankId = getBankIdFromUrlResponces(window.location.href); 
            oldhtml += "&nbsp;<a title=\"Отзывы клиентов\" href=\"http://pipes.yahoo.com/pipes/pipe.run?_id=6717699aabb56f168884843eab60fb9d&_render=rss&numberinput1="+bankId+"\"><img src=\"/com/rss.gif\" alt=\"Отзывы клиентов\" style=\"position: relative; top: 1px; z-index: 1;\"></a>&nbsp;"+"<a title=\"Ответы представителей банка\" href=\"http://pipes.yahoo.com/pipes/pipe.run?_id=fb400833eda6b01d31a36ad5c5c6da83&_render=rss&numberinput1="+bankId+"\"><img src=\"/com/rss.gif\" alt=\"Ответы представителей банка\" style=\"position: relative; top: 1px; z-index: 1;\"></a>";   break;       
            // ленты новостей
            case 'lenta':
            case 'banknews':
            oldhtml += "&nbsp;<a title=\"RSS\" href=\"http://pipes.yahoo.com/pipes/pipe.run?_id=e69930df2b71407745d3c8b4cbe2e4dd&_render=rss&urlinput1="+window.location.href+"\"><img src=\"/com/rss.gif\" alt=\"RSS\" style=\"position: relative; top: 1px; z-index: 1;\"></a>&nbsp;"; break;
        }
        return oldhtml;
    });    
}

function reloadFriendsToForum()
{
    var tid;
    var mid;
    var page;
    var location = page.href;
     
    if (/\/forum\/message\/(\d+)\//.test(location)) { tid = /\/forum\/message\/(\d+)\//.exec(location)[1] ; }
    else if (/\/forum\/(\d+)\//.test(location)) { tid = /\/forum\/(\d+)\//.exec(location)[1] ; }
    else return false;

    var groupName;
    
    if (/\/group\/(.*?)\//.test(location)) { groupName = /\/group\/(.*?)\//.exec(location)[1]; }
    else return false;
    
    var isFriend = "no";
    if (document.getElementsByClassName("b-notation").length > 0) { isFriend ="no"; }
    else { isFriend = "yes"; }
    
    var bankName = encodeURI($(".b-fr-bank-header__name").text());
    
    var sessionId = document.getElementById("sessid").value;
    if (!sessionId) return false; 
    
    var newLocation = "http://www.banki.ru/forum/index.php?PAGE_NAME=message"+"&bankname="+bankName+"&sessid="+sessionId+"&isfr="+isFriend+"&group="+groupName+"&FID=72&TID="+tid;
    
    if (/\/message\/(\d+)\/(\d+)\/.*/.test(location)) { mid = /.*message\/(\d+)\/(\d+)\/.*/.exec(location)[2]; }
    else if (/PAGEN_1=(\d+)&#(\d+)/.test(location)) { mid = /PAGEN_1=(\d+)&#(\d+)/.exec(location)[2]; }  
    else if (/#(.*)$/.test(location)) { mid = /#(.*)$/.exec(location)[1]; }
    if (mid)  { newLocation = newLocation+"&MID="+mid+"#message"+mid; } 
    else if (/PAGEN_1=(\d+?)/.test(location)) { page = /PAGEN_1=(\d+?)/.exec(location)[1]; newLocation = newLocation +"&PAGEN_1="+page; }
        
    window.location.href = newLocation;
}

function fromForumToFriends(href,group)
{
    href = "/friends/group/"+group+"/forum/";
    
    var tid;
    if (/TID=(\d+)/.test(location)) { tid = /TID=(\d+)/.exec(location)[1] ; href = href + tid+ "/";}
    href = href + "#postform";
    return href;
}

function fromForumToFriendsMess(href,group)
{
    newHref = "/friends/group/"+group+"/forum/message/";
        
    var tid, mid;
    
    if (/TID=(\d+)/.test(href)) { tid = /TID=(\d+)/.exec(href)[1] ; newHref = newHref + tid+ "/";}

    if (/MID=(\d+)/.test(href)) { mid = /MID=(\d+)/.exec(href)[1] ; newHref = newHref + mid+ "/#"+mid;}
   
    return newHref;
}

function addCommentFormToForum()
{
    var href = location.href; 
    if (location.hash) { href = href.replace(/#(.*)$/,"#postform"); }
    else { href= href + "#postform"; }
    href = href.replace(/http:\/\/.*banki\.ru/,"");
   
    var groupName, isFriend, nonMember = "", bankName = "неизвестного сообщества", sessid;
   
    var tid;   
    if (/TID=(\d+)/.test(location)) { tid = /TID=(\d+)/.exec(location)[1]; } 
    
    var noImportantData = false;
    
    if (/group=(.*?)&/.test(href)) { groupName = /group=(.*?)&/.exec(href)[1]; href = href.replace(/group=(.*?)&/,""); }
    else { noImportantData = true; }
    if (/isfr=(.*?)&/.test(href)) { isFriend = /isfr=(.*?)&/.exec(href)[1]; href = href.replace(/isfr=(.*?)&/,""); }
    if (/bankname=(.*?)&/.test(href)) {
        bankName = decodeURI(/bankname=(.*?)&/.exec(href)[1]);
        bankName = bankName.replace(/\+/g," ");
        href = href.replace(/bankname=(.*?)&/,""); 
    }
   
    
    if (/sessid=(.*?)&/.test(href)) { sessid = /sessid=(.*?)&/.exec(href)[1]; href = href.replace(/sessid=(.*?)&/,""); }
    else { noImportantData = true; };
    
    if (noImportantData) {
        if (tid == localStorage.getItem("banki.ru.plus_tid")) {
            groupName = localStorage.getItem("banki.ru.plus_groupName");
            isFriend = localStorage.getItem("banki.ru.plus_isFriend");
            bankName = localStorage.getItem("banki.ru.plus_bankName");
            sessid = localStorage.getItem("banki.ru.plus_sessid");
            if ((!groupName) && (!sessid)) return;
        }
        else return;
    }
    else {   
        localStorage.setItem("banki.ru.plus_groupName", groupName);
        localStorage.setItem("banki.ru.plus_isFriend", isFriend);
        localStorage.setItem("banki.ru.plus_bankName", bankName);
        localStorage.setItem("banki.ru.plus_sessid", sessid);
        localStorage.setItem("banki.ru.plus_tid", tid);
    }
    
    var areaValue="";
    if ( document.getElementsByClassName("forum-info-box forum-post-preview").length>0) {
        areaValue = localStorage.getItem("banki.ru.plus_preview");
    }
    
       
    if (isFriend === "yes") { isFriend = "";  }
    else { isFriend = "disabled"; nonMember = '<span><b>Комментирование доступно только участникам сообщества.</b> <a href="http://www.banki.ru/friends/">Вступить?</a></span>'; }
  
   var script = 'var smallEngLettersReg = new Array(/e\'/g, /ch/g, /sh/g, /yo/g, /jo/g, /zh/g, /yu/g, /ju/g, /ya/g, /ja/g, /a/g, /b/g, /v/g, /g/g, /d/g, /e/g, /z/g, /i/g, /j/g, /k/g, /l/g, /m/g, /n/g, /o/g, /p/g, /r/g, /s/g, /t/g, /u/g, /f/g, /h/g, /c/g, /w/g, /~/g, /y/g, /\'/g); var smallRusLetters = new Array("э", "ч", "ш", "ё", "ё", "ж", "ю", "ю", "я", "я", "а", "б", "в", "г", "д", "е", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "щ", "ъ", "ы", "ь");  var capitEngLettersReg = new Array(  /Ch/g, /Sh/g,   /Yo/g, /Zh/g,   /Yu/g, /Ya/g,   /E\'/g, /CH/g, /SH/g, /YO/g, /JO/g, /ZH/g, /YU/g, /JU/g, /YA/g, /JA/g, /A/g, /B/g, /V/g, /G/g, /D/g, /E/g, /Z/g, /I/g, /J/g, /K/g, /L/g, /M/g, /N/g, /O/g, /P/g, /R/g, /S/g, /T/g, /U/g, /F/g, /H/g, /C/g, /W/g, /Y/g); var capitRusLetters = new Array(  "Ч", "Ш",  "Ё", "Ж",  "Ю", "Я",  "Э", "Ч", "Ш", "Ё", "Ё", "Ж", "Ю", "Ю", "\Я", "\Я", "А", "Б", "В", "Г", "Д", "Е", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Щ", "Ы");  var smallRusLettersReg = new Array(/э/g, /ч/g, /ш/g, /ё/g, /ё/g,/ж/g, /ю/g, /ю/g, /я/g, /я/g, /а/g, /б/g, /в/g, /г/g, /д/g, /е/g, /з/g, /и/g, /й/g, /к/g, /л/g, /м/g, /н/g, /о/g, /п/g, /р/g, /с/g, /т/g, /у/g, /ф/g, /х/g, /ц/g, /щ/g, /ъ/g, /ы/g, /ь/g ); var smallEngLetters = new Array("e", "ch", "sh", "yo", "jo", "zh", "yu", "ju", "ya", "ja", "a", "b", "v", "g", "d", "e", "z", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "h", "c", "w", "~", "y", "\'");  var capitRusLettersReg = new Array(  /Ч(?=[^А-Я])/g, /Ш(?=[^А-Я])/g,   /Ё(?=[^А-Я])/g, /Ж(?=[^А-Я])/g,   /Ю(?=[^А-Я])/g, /Я(?=[^А-Я])/g,   /Э/g, /Ч/g, /Ш/g, /Ё/g, /Ё/g, /Ж/g, /Ю/g, /Ю/g, /Я/g, /Я/g, /А/g, /Б/g, /В/g, /Г/g, /Д/g, /Е/g, /З/g, /И/g, /Й/g, /К/g, /Л/g, /М/g, /Н/g, /О/g, /П/g, /Р/g, /С/g, /Т/g, /У/g, /Ф/g, /Х/g, /Ц/g, /Щ/g, /Ъ/g, /Ы/g, /Ь/g); var capitEngLetters = new Array(  "Ch", "Sh",  "Yo", "Zh",  "Yu", "Ya",  "E", "CH", "SH", "YO", "JO", "ZH", "YU", "JU", "YA", "JA", "A", "B", "V", "G", "D", "E", "Z", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "F", "H", "C", "W", "~", "Y", "\'"); function AttachFile(iNumber, iCount, sIndex, oObj) { var element = null;  var bFined = false;  iNumber = parseInt(iNumber);  iCount = parseInt(iCount);  document.getElementById("upload_files_info_" + sIndex).style.display = "block";  for (var ii = iNumber; ii < (iNumber + iCount); ii++)  {  element = document.getElementById("upload_files_" + ii + "_" + sIndex);  if (!element || typeof(element) == null)    break;   if (element.style.display == "none")   {    bFined = true;    element.style.display = "block";    break;   }   }  var bHide = (!bFined ? true : (ii >= (iNumber + iCount - 1)));  if (bHide == true)   oObj.style.display = "none"; } function AddTags(a) {  if (a != null)  {   var div = a.parentNode.previousSibling;  div.style.display = "block";    a.parentNode.style.display = "none";  var inputs = div.getElementsByTagName("INPUT");    for (var i = 0 ; i < inputs.length ; i++ )        {    if (inputs[i].type.toUpperCase() == "TEXT")    {     CorrectTags(inputs[i]);     inputs[i].focus();     break;    }   }        if (a.parentNode.lastChild && a.parentNode.lastChild.name == "from_tag")       {    a.parentNode.lastChild.style.display = "none";          if (document.getElementById("vote_switcher"))        {     document.getElementById("vote_switcher").style.display = "";}        }       }  return false; }  function CorrectTags(oObj) {  if (document.getElementById("TAGS_div_frame"))   document.getElementById("TAGS_div_frame").id = oObj.id + "_div_frame"; }  var bSendForm = false;  if (typeof oText != "object")  var oText = {}; oText["author"] = " пишет:\\n"; oText["enter_url"] = "Введите полный адрес (URL)"; oText["enter_url_name"] = "Введите название сайта";  oText["enter_image"] = "Введите полный адрес (URL) изображения";     oText["list_prompt"] = "Введите пункт списка. Нажмите Отмена или оставьте пробел для завершения списка";        oText["video"] = "Видео";        oText["path"] = "Путь (http://):";       oText["preview"] = "Картинка (http://):";       oText["width"] = "Ширина:";        oText["height"] = "Высота:";        oText["vote_drop_answer_confirm"] = "Вы действительно хотите удалить вариант ответа?:";        oText["vote_drop_question_confirm"] = "Вы действительно хотите удалить вопрос?:";       oText["BUTTON_OK"] = "Вставить";        oText["BUTTON_CANCEL"] = "Отмена";       oText["smile_hide"] = "Скрыть"; if (typeof oErrors != "object")  var oErrors = {}; oErrors["no_topic_name"] = "Вы должны ввести название темы. "; oErrors["no_message"] = "Вы должны ввести сообщение. "; oErrors["max_len"] = "Максимальная длина сообщения #MAX_LENGTH# символов. Всего символов: #LENGTH#."; oErrors["no_url"] = "Вы должны ввести адрес (URL)";  oErrors["no_title"] = "Ведите название."; oErrors["no_path"] = "Укажите путь к видео."; ';
   
   // клизму пока уберем <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/klizma.gif" class="smiles" alt=":klizma:" title="и тебя вылечат" width="42" border="0" height="25"></a></span>     
   var html = '<a name="postform"></a> <div class="forum-header-box">  <div class="forum-header-options">   <span class="forum-option-bbcode"><a href="/forum/index.php?PAGE_NAME=help#bbcode">BBCode</a></span>&nbsp;&nbsp;   <span class="forum-option-rules"><a href="/forum/index.php?PAGE_NAME=rules">Правила</a></span>  </div>  <div class="forum-header-title"><span>Форма ответов</span></div> </div> <div class="forum-reply-form"> <form name="REPLIER" id="REPLIER" action="@banki.ru.plus_action@" method="POST" enctype="multipart/form-data" onsubmit="return ValidateForm(this, \'N\');" onkeydown="if(null != init_form){init_form(this)}" onmouseover="if(init_form){init_form(this)}" class="forum-form">  <input name="PAGE_NAME" value="read" type="hidden">  <input name="FID" value="14" type="hidden">  <input name="TID" value="4272" type="hidden">  <input name="MID" value="0" type="hidden">  <input name="MESSAGE_TYPE" value="REPLY" type="hidden">  <input name="AUTHOR_ID" value="" type="hidden">  <input name="forum_post_action" value="save" type="hidden">  <input name="MESSAGE_MODE" value="NORMAL" type="hidden">  <input name="sessid" id="sessid" value="@banki.ru.plus_sessid@" type="hidden">  <div class="forum-reply-header">Текст сообщения<span class="forum-required-field">*</span></div>   <div class="forum-reply-fields">    <div class="forum-reply-field forum-reply-field-bbcode">     <div class="forum-bbcode-line" id="forum_bbcode_line">     <a href="#postform" class="forum-bbcode-button forum-bbcode-bold" id="form_b" title="Полужирный (alt+b)">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <a href="#postform" class="forum-bbcode-button forum-bbcode-italic" id="form_i" title="Курсив (alt+i)">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <a href="#postform" class="forum-bbcode-button forum-bbcode-underline" id="form_u" title="Подчеркнутый (alt+u)">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <a href="#postform" class="forum-bbcode-button forum-bbcode-strike" id="form_s" title="Перечеркнутый (alt+s)">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <a href="#postform" class="forum-bbcode-button forum-bbcode-quote" id="form_quote" title="Оформление текста в виде цитаты (alt+q)">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <a href="#postform" class="forum-bbcode-button forum-bbcode-code" id="form_code" title="Оформление текста в виде кода (alt+p)">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <a href="#postform" class="forum-bbcode-button forum-bbcode-url" id="form_url" title="Ввод гиперссылки (alt+h)">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <a href="#postform" class="forum-bbcode-button forum-bbcode-img" id="form_img" title="Подключение изображения (alt+g)">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <a href="#postform" class="forum-bbcode-button forum-bbcode-video" id="form_video" title="Подключение видео (alt+v)">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <a href="#postform" class="forum-bbcode-button forum-bbcode-list" id="form_list" title="Оформление текста в виде списка (alt+l)">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <a href="#postform" class="forum-bbcode-button forum-bbcode-color" id="form_palette" title="Цвет">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <a href="#postform" class="forum-bbcode-button forum-bbcode-translit" id="form_translit" title="Перекодировка транслит/латиница (alt+t)">      <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a>     <select name="FONT" class="forum-bbcode-font" id="form_font" title="Шрифт">      <option value="none">Шрифт</option>      <option value="Arial" style="font-family: Arial;">Arial</option>      <option value="Times" style="font-family: Times;">Times</option>      <option value="Courier" style="font-family: Courier;">Courier</option>      <option value="Impact" style="font-family: Impact;">Impact</option>      <option value="Geneva" style="font-family: Geneva;">Geneva</option>      <option value="Optima" style="font-family: Optima;">Optima</option>      <option value="Verdana" style="font-family: Verdana;">Verdana</option>     </select>    </div>    <div class="forum-clear-float"></div>    <div class="forum-smiles-line" id="forum_smiles_showed" style="display: none;">     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ab.gif" class="smiles" alt=":)" title="улыбка" width="20" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ad.gif" class="smiles" alt=";)" title="шутливо" width="20" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/ag.gif" class="smiles" alt=":D" title="широкая улыбка" width="20" border="0" height="20"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/ai.gif" class="smiles" alt=":o" title="удивленно" width="20" border="0" height="20"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/bl.gif" class="smiles" alt=":|" title="скептически" width="36" border="0" height="26"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/af.gif" class="smiles" alt="8)" title="круто" width="21" border="0" height="21"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ac.gif" class="smiles" alt=":(" title="печально" width="20" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/evil.gif" class="smiles" alt=":evil:" title="злюсь" width="35" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/qr.gif" class="smiles" alt=":wall:" title="бешусь" width="31" border="0" height="26"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ah.gif" class="smiles" alt=":oops:" title="смущенно" width="25" border="0" height="25"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/aj.gif" class="smiles" alt=":{}" title="поцелуй" width="34" border="0" height="23"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/ak.gif" class="smiles" alt=":cry:" title="очень грустно" width="31" border="0" height="22"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/facepalm.gif" class="smiles" alt=":omg:" title="только не это" width="28" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/inlove.gif" class="smiles" alt=":inlove:" title="влюбленный" width="22" border="0" height="29"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/23247378e1dac5dd917b2695aad1baa8.gif" class="smiles" alt=":notiam:" title="я?! нет." width="42" border="0" height="26"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/197.gif" class="smiles" alt=":shuffle:" title="а чего я?" width="18" border="0" height="23"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/bp.gif" class="smiles" alt=":ura:" title="ура!" width="42" border="0" height="27"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/am.gif" class="smiles" alt=":nunu:" title="ну-ну" width="36" border="0" height="27"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/aa.gif" class="smiles" alt=":angel:" title="просто ангел!" width="27" border="0" height="23"></a></span>     <div class="forum-smiles-item" style="height: 46px;">      <a href="#postform" id="form_smiles_static" name="smile_show" style="margin-top: 15px;">       Еще</a>     </div>    </div><div class="forum-smiles-line" id="forum_smiles_hidden" style="display: block;">     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ab.gif" class="smiles" alt=":)" title="улыбка" width="20" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ad.gif" class="smiles" alt=";)" title="шутливо" width="20" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/ag.gif" class="smiles" alt=":D" title="широкая улыбка" width="20" border="0" height="20"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/ai.gif" class="smiles" alt=":o" title="удивленно" width="20" border="0" height="20"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/bl.gif" class="smiles" alt=":|" title="скептически" width="36" border="0" height="26"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/af.gif" class="smiles" alt="8)" title="круто" width="21" border="0" height="21"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ac.gif" class="smiles" alt=":(" title="печально" width="20" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/evil.gif" class="smiles" alt=":evil:" title="злюсь" width="35" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/qr.gif" class="smiles" alt=":wall:" title="бешусь" width="31" border="0" height="26"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ah.gif" class="smiles" alt=":oops:" title="смущенно" width="25" border="0" height="25"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/aj.gif" class="smiles" alt=":{}" title="поцелуй" width="34" border="0" height="23"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/ak.gif" class="smiles" alt=":cry:" title="очень грустно" width="31" border="0" height="22"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/facepalm.gif" class="smiles" alt=":omg:" title="только не это" width="28" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/inlove.gif" class="smiles" alt=":inlove:" title="влюбленный" width="22" border="0" height="29"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/23247378e1dac5dd917b2695aad1baa8.gif" class="smiles" alt=":notiam:" title="я?! нет." width="42" border="0" height="26"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/197.gif" class="smiles" alt=":shuffle:" title="а чего я?" width="18" border="0" height="23"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/bp.gif" class="smiles" alt=":ura:" title="ура!" width="42" border="0" height="27"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/am.gif" class="smiles" alt=":nunu:" title="ну-ну" width="36" border="0" height="27"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/aa.gif" class="smiles" alt=":angel:" title="просто ангел!" width="27" border="0" height="23"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ae.gif" class="smiles" alt=":-p" title="дразнится" width="20" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/secret.gif" class="smiles" alt=":-X" title="секрет" width="22" border="0" height="26"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/fool.gif" class="smiles" alt=":fool:" title="ты чё, дурак?!" width="29" border="0" height="23"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/boredom.gif" class="smiles" alt=":tired:" title="скучно" width="26" border="0" height="22"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/good.gif" class="smiles" alt=":thumbsup:" title="отлично!" width="26" border="0" height="23"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/ok.gif" class="smiles" alt=":ок:" title="Ок!" width="40" border="0" height="26"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 8px;"><img src="/bitrix/images/forum/smile/bx.gif" class="smiles" alt=":yes!!!:" title="Yes!!!" width="42" border="0" height="30"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/cg.gif" class="smiles" alt=":painful:" title="больно!" width="23" border="0" height="20"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/yep.gif" class="smiles" alt=":yep:" title="угу" width="20" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/dj.gif" class="smiles" alt=":zzz:" title="сплю" width="29" border="0" height="29"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 8px;"><img src="/bitrix/images/forum/smile/dl.gif" class="smiles" alt=":bonk:" title="подзатыльник" width="48" border="0" height="30"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/mosking.gif" class="smiles" alt=":jokingly:" title="хи-хи" width="25" border="0" height="25"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/crazy.gif" class="smiles" alt=":crazy:" title="crazy!" width="20" border="0" height="27"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/scratch_one-s_head.gif" class="smiles" alt=":scratch:" title="Хмм..." width="27" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/pardon.gif" class="smiles" alt=":pardon:" title="пардон!" width="36" border="0" height="26"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/beee.gif" class="smiles" alt=":fi:" title="зазнался" width="28" border="0" height="28"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/ponty.gif" class="smiles" alt=":vnature:" title="чистА-кАнкретнА" width="35" border="0" height="26"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 1px;"><img src="/bitrix/images/forum/smile/d_daisy.gif" class="smiles" alt=":flowers:" title="вам букет!" width="43" border="0" height="44"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 8px;"><img src="/bitrix/images/forum/smile/dm.gif" class="smiles" alt=":magic:" title="колдунство!" width="42" border="0" height="31"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/stop.gif" class="smiles" alt=":stop:" title="стоп!" width="36" border="0" height="23"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 7px;"><img src="/bitrix/images/forum/smile/help.gif" class="smiles" alt=":help:" title="помогите!" width="30" border="0" height="33"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/rofl.gif" class="smiles" alt=":rofl:" title="я валяюсь!" width="29" border="0" height="25"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/cd.gif" class="smiles" alt=":quotes:" title="кавычки" width="36" border="0" height="26"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 7px;"><img src="/bitrix/images/forum/smile/cj.gif" class="smiles" alt=":relax:" title="relax" width="34" border="0" height="33"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/dh.gif" class="smiles" alt=":gramercy:" title="благодарю" width="36" border="0" height="29"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 4px;"><img src="/bitrix/images/forum/smile/cl.gif" class="smiles" alt=":achtung:" title="ахтунг!" width="48" border="0" height="38"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 6px;"><img src="/bitrix/images/forum/smile/dr.gif" class="smiles" alt=":nightmare:" title="а-а-а, кошмар!" width="42" border="0" height="34"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/drinks.gif" class="smiles" alt=":drink:" title="выпьем!" width="51" border="0" height="28"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/bt.gif" class="smiles" alt=":uncap:" title="здрасти!" width="42" border="0" height="28"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/cm.gif" class="smiles" alt=":dramatics:" title="я в истерике" width="38" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/bad.gif" class="smiles" alt=":puke:" title="тошнит" width="21" border="0" height="21"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ar.gif" class="smiles" alt=":music:" title="тын-тыдын, парам-пам-пам" width="28" border="0" height="25"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/2.gif" class="smiles" alt=":?:" title="Вопрос" width="20" border="0" height="20"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/1.gif" class="smiles" alt=":!:" title="восклицание" width="20" border="0" height="20"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 14px;"><img src="/bitrix/images/forum/smile/idea.gif" class="smiles" alt=":idea:" title="идея" width="18" border="0" height="18"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/bomb.gif" class="smiles" alt="@=" title="бомба" width="28" border="0" height="24"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/wiki_go.gif" class="smiles" alt=":wikigo:" title="Пиши в словарь!" width="72" border="0" height="25"></a></span>     <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 0px;"><img src="/bitrix/images/forum/smile/nr_table.gif" class="smiles" alt=":write_nr:" title="Пиши в народный рейтинг!" width="48" border="0" height="46"></a></span>     <div class="forum-smiles-item" style="height: 46px;">      <a href="#postform" id="form_smiles_static" name="smile_hide" style="margin-top: 15px;">Скрыть</a>     </div>    </div>    <div class="forum-clear-float"></div>   </div>   <div class="forum-reply-field forum-reply-field-text">    <textarea name="POST_MESSAGE" class="post_message" cols="55" rows="14" tabindex="10" @banki.ru.plus_isfr@>@banki.ru.plus_areavalue@</textarea>   </div>   <div class="forum-reply-field forum-reply-field-upload">    <div class="forum-upload-info" style="display: none;" id="upload_files_info_">     <span>Разрешенные расширения файлов: gif, jpg, jpeg, png, doc, rtf, xls, ppt, pps.</span>     <span>Размер файла не должен превышать 512 КБ.</span>    </div>     <div class="forum-upload-file" style="display: none;" id="upload_files_0_">     <input name="FILE_NEW_0" value="" size="30" type="file">    </div>     <div class="forum-upload-file" style="display: none;" id="upload_files_1_">     <input name="FILE_NEW_1" value="" size="30" type="file">    </div>     <div class="forum-upload-file" style="display: none;" id="upload_files_2_">     <input name="FILE_NEW_2" value="" size="30" type="file">    </div>     <div class="forum-upload-file" style="display: none;" id="upload_files_3_">     <input name="FILE_NEW_3" value="" size="30" type="file">    </div>     <div class="forum-upload-file" style="display: none;" id="upload_files_4_">     <input name="FILE_NEW_4" value="" size="30" type="file">    </div>  @banki.ru.plus_nonmember@ <!-- <a href="javascript:void(0);" onclick="AttachFile(\’0\’, \’5\’, \’\’, this); return false;">     <span>Прикрепить файл</span>    </a> -->  </div>   <div class="forum-reply-field forum-reply-field-settings">    <div class="forum-reply-field-setting">     <input name="USE_SMILES" id="USE_SMILES" value="Y" checked="checked" tabindex="11" type="checkbox">&nbsp;<label for="USE_SMILES">Показывать графические смайлы в этом сообщении</label></div>    <div class="forum-reply-field-setting">     <input name="TOPIC_SUBSCRIBE" id="TOPIC_SUBSCRIBE" value="Y" disabled="disabled" tabindex="12" type="checkbox">&nbsp;<label for="TOPIC_SUBSCRIBE">Подписаться на новые сообщения этой темы</label></div>    <div class="forum-reply-field-setting">     <input name="FORUM_SUBSCRIBE" id="FORUM_SUBSCRIBE" value="Y" tabindex="13" type="checkbox" disabled="disabled">&nbsp;<label for="FORUM_SUBSCRIBE">Подписаться на новые сообщения этого форума</label></div>   </div>   <div class="forum-reply-buttons">    <input name="send_button" value="Ответить" tabindex="14" onclick="this.form.MESSAGE_MODE.value = \'NORMAL\';" type="submit" @banki.ru.plus_isfr@>    <input name="view_button" value="Просмотр" tabindex="15" onclick="localStorage.setItem(\'banki.ru.plus_preview\',this.form.POST_MESSAGE.value); this.form.action=\'@banki.ru.plus_action_view@\'; this.form.MESSAGE_MODE.value = \'VIEW\'; " type="submit">   </div>   </div> </form></div>';
   
   html = html.replace("@banki.ru.plus_action_view@",href); 
   href = fromForumToFriends(href,groupName);
   html = html.replace("@banki.ru.plus_action@",href);
   html = html.replace("@banki.ru.plus_sessid@",sessid);
   html = html.replace(/@banki.ru.plus_isfr@/g,isFriend);
   html = html.replace("@banki.ru.plus_nonmember@",nonMember);
   html = html.replace("@banki.ru.plus_areavalue@",areaValue);

   tempSPAN = document.createElement("span");
   tempSPAN.innerHTML = html;
  
   loadjscssfile("/bitrix/templates/.default/components/bitrix/forum.post_form/.default/script.js","js");

   var tempDIV = document.getElementsByClassName("forum-info-box forum-users-online")[0];
   tempDIV.parentNode.insertBefore(tempSPAN,tempDIV.nextSibling);
   contentEval(script);
   
   if (document.getElementsByClassName("forum-action-edit").length>0)
   {
        var tempA = document.getElementsByClassName("forum-action-edit")[0].firstChild.firstChild;
        tempA.href = tempA.href.replace(/forum\/index\.php\?PAGE_NAME=topic_new&FID=72&TID=(\d+)&/,"friends/group/"+groupName+"/forum/edit/$1/?"); 
    }
   var tempArrayDIV = document.getElementsByClassName("forum-breadcrumb forum-breadcrumb-top");
   var i; var length = tempArrayDIV.length; var bankSPAN; 
   for  (i=0;i<length;i++)
   {
        
        bankSPAN = document.createElement("span");
        bankSPAN.className= "forum-crumb-item";
        bankSPAN.innerHTML = '&nbsp;<span>&raquo;&nbsp;</span><a href="/friends/group/'+groupName+'/#nav_start" title="Форум '+bankName+'">Форум '+bankName+'</a>';
        tempArrayDIV[i].appendChild(bankSPAN);
   }
  
   tempArrayDIV =  document.getElementsByClassName("forum-post-number");
  
   length = tempArrayDIV.length; var tempNOINDEX; 
   
   for  (i=0;i<length;i++)   
   {
        tempNOINDEX = tempArrayDIV[i].getElementsByTagName("noindex")[0];
        tempNOINDEX.children[0].href = fromForumToFriendsMess(tempNOINDEX.children[0].href, groupName);
   }
  
   tempArrayDIV =  document.getElementsByClassName("forum-action-links");
  
   length = tempArrayDIV.length; var linksSPAN; 
   
   for  (i=0;i<length;i++)
   {
        //tempArrayDIV[i].innerHTML="";
        var messageId = tempArrayDIV[i].parentNode.parentNode.parentNode.parentNode.parentNode.id.replace("message","");
        
        var userName = tempArrayDIV[i].parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[2].children[0].children[0].innerHTML;
              
        linksSPAN = document.createElement("span");
        linksSPAN.className = "forum-action-quote";
        linksSPAN.innerHTML = "<a href=\"#postform\" onmousedown=\"if (window['quoteMessageEx']){quoteMessageEx('"+userName+"', 'message_text_"+messageId+"')}\">Цитировать</a>&nbsp;&nbsp;";
        tempArrayDIV[i].appendChild(linksSPAN);
        linksSPAN = document.createElement("span");
        linksSPAN.className = "forum-action-reply";
        linksSPAN.innerHTML = "<a href=\"#postform\" title=\"Вставить в ответ имя\" onmousedown=\"reply2author('"+userName+",', 'message_text_"+messageId+"')\">Имя</a>";
        tempArrayDIV[i].appendChild(linksSPAN);
  }
  
  
  if (!page.isLogged) return false;
   
  document.getElementsByName("AUTHOR_ID")[0].value = page.userId;
  document.getElementsByName("PAGE_NAME")[0].value = "group_forum_message";
  
  // http://www.banki.ru/forum/index.php?PAGE_NAME=topic_new&FID=72&TID=87239&MID=1690602&MESSAGE_TYPE=EDIT&sessid=f14eb8268689ddbd83adea4784c02440
  // http://www.banki.ru/friends/group/avangard/forum/edit/87239/?MID=1690602&ACTION=EDIT&MESSAGE_TYPE=EDIT&sessid=f14eb8268689ddbd83adea4784c02440
   
}

// автодобавление просьбы восстановить отзыв с responseID таким-то TODO
function addUrlToRecovery()
{
    var responseId = /&banki_ru_plus_hidden_rid=(\d*)#/.exec(page.href)[1]; // заменить на выбор параметра
    $("textarea.post_message").val("Прошу восстановить скрытый отзыв http://www.banki.ru/services/responses/bank/?responseID="+responseId);
}


function getUserIdFromUrl(url)
{
    if  (/.*UID=(\d+).*/.test(url)) return /.*UID=(\d+).*/.exec(url)[1];
    else return null;
}

function getBankIdFromUrl(url) {
    if (/id=(\d*)[^\d]*$/.test(url)) return /id=(\d*)[^\d]*$/.exec(url)[1]
    else return null;
}

function getBankIdFromUrlResponces(url) {
    if (/\/bank\/(.*)\/$/.test(url))  return /\/bank\/(.*)\/$/.exec(url)[1]
    else return null;
}

function getSearchInUserCommentsHref(name, id)
{
    return  "http://www.banki.ru/forum/index.php?PAGE_NAME=user_post&UID="+id+"&mode=all&fid=0&date_create=&date_create1=&topic=&message="+name+"&sort=message";
}

function getUserProfileHref(id1, id2, name)
{
    return "http://www.banki.ru/profile/?UID="+id1+"#"+id2+"&"+name;    
} 

function getUserNameAndIdFromProfile(url)
{
    var userA = document.getElementsByClassName("nickName");
    if (userA.length == 0) return false;
    var userName = userA[0].innerHTML;       
    var userId = getUserIdFromUrl(url);
    return {id:userId, name:userName};
}


// дополнительный поиск по теме форума и НР
function addAditionalSearch (type)
{

    var googleSearchQuery = 'http://google.ru/search?hl=ru&output=search&filter=1&pws=0&sclient=psy-ab&as_q=site:banki.ru ';
    var bankiSearchQuery = 'http://www.banki.ru/forum/?PAGE_NAME=search&where=forum&'+prefix+'searchInTheme='+prefix+'themeName&how=d&q=';
    var searchType; if ((searchType=getParam('inThemeSearchType')) === null) { searchType='banki'; setParam('inThemeSearchType','banki'); }
    var searchQuery = googleSearchQuery;
    var searchWindow;
    var titlePiece=page.title;
    function getSearchIcon(searchType) {
        return (searchType === 'banki') ? '/favicon.ico' : 'http://google.com/favicon.ico';
    }
    switch (type) { 
        case 'forum_search': 
            var searchElemsHTML = "<a href='javascript:'><img src='"+prefix+"src' id="+prefix+"inThemeSearchType style='position:relative; top:2px; right:5px'></a><input placeholder='Поиск по теме' name='"+prefix+"input_search' type='text' style='height: 24px;' size=30><input type='button' style='position:relative; left:-32px; height: 20px' class='input-search__button input-search__button--enabled' name='"+prefix+"button_search'>&nbsp;&nbsp;&nbsp;&nbsp;"; 
            searchElemsHTML = searchElemsHTML.replace(prefix+'src',getSearchIcon(searchType));
            $(".forum-header-options").first().prepend(searchElemsHTML);
            if (searchType === 'banki') { 
                searchQuery = bankiSearchQuery + page.params['TID']+' '; 
                searchQuery = searchQuery.replace(prefix+'themeName',escape1251(page.themeName));
            }
            else { searchQuery = googleSearchQuery + 'inurl:TID=' + page.params['TID']+' '; }    
            break;
        case 'responces' : 
            var searchElemsHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name='"+prefix+"input_search' placeholder='Поиск по отзывам' size='30'><input type='button' style='position:relative; left:-38px' class='input-search__button input-search__button--enabled' name='"+prefix+"button_search'>"; 
            $("DIV.bank-responses-review > a.bank-button-add").before(searchElemsHTML);
            //("div.b-customFilter").
            //$("[name='bankiruplus_input_search']").addClass('input--search');
            if (/(Отзывы.*?),/.test(titlePiece)) { titlePiece =/(Отзывы.*?),/.exec(titlePiece)[1]; }
            searchQuery = searchQuery + 'intitle:"' + titlePiece + '"' + ' inurl:"responseID" ';
            break;    
        /* case 'qa' : 
            $("[name='nav_start']").first().prev().append(searchElemsHTML); 
            if (/:(.*):/.test(titlePiece)) { titlePiece =/:(.*):/.exec(titlePiece)[1]; }
            searchQuery = searchQuery + 'intitle:"' + titlePiece + '"' + ' inurl:"questions-answers" ';
            break; */
    }
    $("[name='"+prefix+"input_search']").attr('data-src',searchQuery);
    
    function additionalSearchSubmit(e) {
        if ((e.type=='keydown') && (e.keyCode!=13)) return;
        searchWindow = window.open($("[name='"+prefix+"input_search']").attr('data-src')+escape1251($("[name='"+prefix+"input_search']").val()));
        searchWindow.focus();
    }
    
    $("[name='"+prefix+"input_search']").bind("keydown", additionalSearchSubmit);
    page.oldDesign ? $("[name='"+prefix+"button_search']").hide() : $("[name='"+prefix+"button_search']").bind("click", additionalSearchSubmit);
    
    $('#'+prefix+'inThemeSearchType').on('click', function() {
        var searchType = getParam('inThemeSearchType'); 
        (searchType === 'banki') ? searchType = 'google' : searchType = 'banki';
        setParam('inThemeSearchType', searchType);
        $(this).attr('src', getSearchIcon(searchType));
        if (searchType === 'banki') { 
            searchQuery = bankiSearchQuery + page.params['TID']+' ';
            searchQuery = searchQuery.replace(prefix+'themeName',escape1251(page.themeName));
        }
        else { searchQuery = googleSearchQuery + 'inurl:TID=' + page.params['TID']+' '; } 
        $("[name='"+prefix+"input_search']").attr('data-src',searchQuery);
    });
    
}

// переход по страницам форума
function changePage(href, oldpageRegexp, messageRegexp, newPage, currentPage)
// запутанно, надо переделать

// href - текущий url
// oldpageRegexp - параметр номера страницы (с номером)
// messageRegexp - параметр номера конретного сообщения (с номером)
// newPage - параметр номера страницы (без номера)
// currentPage - номер страницы, на которую надо переключить
{
    temp = href;
    temp = temp.replace(/#.*/,"");
    newPage = newPage + currentPage;
    if (oldpageRegexp.test(temp)) { temp = temp.replace(oldpageRegexp,newPage); }
    else { temp = temp + newPage; }
    if (messageRegexp.test(temp)) {temp = temp.replace(messageRegexp,""); }
    window.location.href = temp;
}

// Обработка сркытзх отзывов 
page.hiddenResponse = function() {
    // может быть мы попали на эту страницу, потому  что отзыв скрыт? 
    $("div.b-errors").html(function(index, oldhtml) {
        // если мы можем определить, о каком отзыве идет речь, добавим ссылку на тему, где просят отзывы восстановить и передадим id скрытого отзыва
        if (/\(ID (\d*)\)/.test(oldhtml)) {
            oldhtml += "  Вы можете <a style='color: rgb(204, 51, 51);' href='http://www.banki.ru/forum/index.php?PAGE_NAME=read&FID=10&TID=100712&banki_ru_plus_hidden_rid="+/\(ID (\d*)\)/.exec(oldhtml)[1]+"#postform'>сделать запрос</a> на восстановление отзыва.";
        }
        return oldhtml;
    });
}

// дополнительные параметры для страниц форума
page.forumPage = function() {
    this.gid = this.params['GID'];
    this.fid = this.params['FID']; 
    this.tid = this.params['TID'];
    this.mid = this.params['MID'];
    this.themeName = $.trim($("h1.topic-page__title:first").text());
    this.isClosed = ($('.post_message').length === 0); 
}

// Считает коэфициент полезности пользователя, null если не удовлетворяет условиям (больше 100 сообщений, положительное число спасибо)
function userCoeff (messages, thanks) {
    messages = +messages; thanks = +thanks; 
    if ((messages<100) || (thanks<=0)) return null
    else return (thanks/messages*100).toFixed(2);
} 

// вырезает лишнее из ответа тем поиска по форуму
function themeSearchAfterLoadParce(responce) {
    responce = /<body.*?>([\s\S]*?)<\/body>/.exec(responce)[1];
    responce = responce.replace(/([\s\S]*?)<script>[\s\S]*?<\/script>([\s\S]*)/,'$1$2');
    responce = responce.replace(/<\\*form.*?>/,'');
    responce = responce.replace(/<div class="forum-filter-field clearfix">[\s\S]*?for="user_city"[\s\S]*?<div class="forum-filter-field clearfix search-input">/,'<div class="forum-filter-field clearfix search-input">');
    return responce;
}

// УЖЕ НЕАКТУАЛЬНО
// Исправляет ошибку с ссылками в коментариях к некоторым новостным колонкам http://www.banki.ru/forum/index.php?PAGE_NAME=message&FID=10&TID=12&MID=2427451#message2427451
page.repairNewsCommentsAuthorAndCitateHrefs = function() { 
    $(".control").css({"background-image" : "none", "width":"auto"});
}

/** Изменяет страницу поиска по форуму, когда это поиcк по теме */
page.changeSearchInForumPage = function() {
    var query = $('#searchTextInput').val();

    if (!(/\d+.*/.test(query))) return;
    
    var themeId = /(\d+).*/.exec(query)[1];
    
    query = $.trim(/\d+(.*)$/.exec(query)[1]);
    $('#searchTextInput').val(query);
    
    var themeName = unescape1251(this.params[prefix+'searchInTheme']);
    $("h1.b-el-h1:contains('Поиск по форуму')").html("Поиск по теме <a href='/forum/?PAGE_NAME=read&TID="+themeId+"'>"+themeName+"</a>");
    $(".b-search__form").append("<input type='hidden' value='"+themeName+"' name='"+prefix+"searchInTheme'/>");
        
    $('.input-search__field, .b-searchForm__question').val('');
    
    $('.b-search__form').on("submit", function() {
        $(this).find('#searchTextInput').val(function (i,val){return themeId+' '+val;})
    }); 
    
    $(".b-searchList__url:not([href*='"+themeId+"'])").parent().parent().css({"opacity":"0.1"});
    
    $('.b-pagination__list>li>a, .nav_page>span>a, a.b-el-line__link').each(function() {
        $(this).attr('href', function(i,val) { return val+'&'+prefix+'searchInTheme='+escape1251(themeName)});   
    })
    
}    

// --------------------------- Функции, доступные для отключения пользователю ----------------------- 

// исправляет ошибку с правым блоком в старом дизайне  http://www.banki.ru/forum/index.php?PAGE_NAME=message&FID=10&TID=12&MID=2640928#message2640928
page.repairRightBlock = function() {
    if (!this.oldDesign) return; 
    var FILTER_RIGTH_COLUMN = ".l-bigR-column";
    $(FILTER_RIGTH_COLUMN).css({"display":"block"});
} 
page.repairRightBlock.nameForUser = 'Исправлять ошибку с правым блоком (только для старого дизайна)';

/** Вывод ошибок  */                                
page.showErrors = function(err, global) {
    var showErrors = getParam('showErrors');
    err.stack = err.stack.replace(/file([\s\S]*?)bankiru_plus_beta\.user\.js/gi, 'bankiru_plus_beta.user.js');
    var errorText = version+'\n'+this.href.replace(/sessid=.*?(&|$)/,'')+'\n'+err.name+'\n'+err.message+'\n'+err.stack;
    if (global || (+showErrors === 1) || (showErrors === null)) { alert('Возникла необработанная ошибка. Пожалуйста, сообщите автору в форуме (ссылка "Подержка" в меню скрипта) или на e-mail rebelion76@gmail.com текст ошибки:\n'+errorText); }
    else console.log(errorText);
}    
page.showErrors.nameForUser = 'Выводить сообщения об ошибках';

// принудительная установка галочки "разрешить смайлы" в личных сообщениях
page.enableSmilesInPM = function()
{
    $("#USE_SMILES:not(:checked)").click();
}
page.enableSmilesInPM.nameForUser = 'Принудительно разрешить смайлы в ЛС';

/** подменяет ссылку на новые ЛС  */
page.changeLinkToPM = function() {
   
    var CLASS_TEMP_DIV = prefix + 'tempHrefPM';
    var FILTER_PM_A = 'a:has(span.user__notification), a.b-userbar__mailCounter';
    var FILTER_PM_SPAN = '.user__notification';
    var CLASS_PMWAIT = prefix + 'pmWait';
   
    if ($(FILTER_PM_A).length>0) {
        $('body').append('<div class='+CLASS_TEMP_DIV+' style="display:none"></div>');
        $('<img src="'+waiticon+'">').insertAfter(FILTER_PM_SPAN).addClass(CLASS_PMWAIT);
        $('.'+CLASS_TEMP_DIV).load('/forum/?PAGE_NAME=pm_list&FID=1 .forum-pmessage-new:last', function() {
               $(FILTER_PM_A).attr('href', $('.'+CLASS_TEMP_DIV+'>a').attr('href'));
               $('.'+CLASS_PMWAIT).hide();
        });
    }    
   
}
page.changeLinkToPM.nameForUser = 'Подменять ссылку-оповещении о новых ЛС';

page.addRSSToDepositsSearch = function() {
    var FILTER_DIV_SEARCHED_COUNTS = 'div.b-note';
    var CLASS_INPUT_DEPOSITE_PERCENT = prefix+'deposite_percents';
    var CLASS_A_DEPOSITE_RSS = prefix+'deposite_rss';
    var hrefPart1 = encodeURIComponent(page.href.split('?')[0]);
    console.log(hrefPart1);
    var hrefPart2 = encodeURIComponent(page.href.split('?')[1]);
    console.log(hrefPart2);
    $(FILTER_DIV_SEARCHED_COUNTS).append('<br><span><a class="'+CLASS_A_DEPOSITE_RSS+'" href="http://pipes.yahoo.com/pipes/pipe.run?_id=6dd465ea1c0852d0891c5aee029d62b7&_render=rss&numberinput1=&textinput1='+hrefPart1+'&textinput2='+hrefPart2+'"><img src="/com/rss.gif"></a> со  ставкой не ниже <input size="4" class='+CLASS_INPUT_DEPOSITE_PERCENT+'>% (разделитель строго точка).');
    $('.'+CLASS_INPUT_DEPOSITE_PERCENT).on("input", function () {
       var $percent = $(this).val();
       $('.'+CLASS_A_DEPOSITE_RSS).attr('href', function(i, val) { return val.replace(/numberinput1=.*?&/,'numberinput1='+$percent+'&'); });
    });
}
page.addRSSToDepositsSearch.nameForUser = 'RSS на выборку в поиске по вкладам';

// В новостях меняет ссылку на комментарии на форумскую и исправляет недоработку с #comments http://www.banki.ru/forum/index.php?PAGE_NAME=message&FID=10&TID=51734&MID=2451541#message2451541
page.changeNewsCommentsHref = function() {
    // исправляет недобработку
    $(".b-pagination__list>li>a, .nav_page>span>a").attr('href', 
        function(index, attr) {
            return attr+'#comments';
        });
    // менят и добаляет ссылку на комментарии в форуме                
    var needLoadTheme = true; 
    var themeHref = '';
    var messageString = $(".date>a[href*='message']:first").attr('href');
    if (/.*message(\d+)/.test(messageString))  {
        needLoadTheme = false;
        themeHref = '/forum/?PAGE_NAME=read&MID='+/.*message(\d+)/.exec(messageString)[1];
    }
    
    function addLinks(themeHref) { 
        var $commentsHref = $(".b-el-link[href*='comments'], .b-el-link[href*='reviewArea']");
        if ($commentsHref.length === 0) { 
            $commentsHref = $("<a class='b-el-link' title='Комментарии' href='#comments'><i class='comments'></i>Комментарии</a><span class='delimiter'></span>")
                            .insertBefore("span.b-el-link"); 
            $commentsHref = $(".b-el-link[href*='comments']");        
        }
        $commentsHref.attr('href', function(index, attr) { 
            $(this).html(function (index, html) { return html+' в форуме'; }); 
            return themeHref;
        });
        $("h2.comment").html(function(i, old) {
            if (/\d+.*?<a/.test(old)) return old.replace(/(\d+.*?)<a/,'<a class="goForm" href="'+themeHref+'">$1 в форуме</a> • <a');
            else if (/\d+.*$/.test(old)) return old.replace(/(\d+.*$)/,'<a class="goForm" href="'+themeHref+'">$1 в форуме</a>'); 
            else return old;
        });
    }
    
    
    if (needLoadTheme) {
        var searchUrl = '/forum/?PAGE_NAME=topic_search&do_search=Y&FID=35&search_template='+escape1251($(".b-el-h1, .b-el-article__h1").first().text()); //вызываемому скрипту обязательно нужна win-1251 escape 
        $.get(searchUrl, function(responce) {
            responce = themeSearchAfterLoadParce(responce);   
            $("<div class='"+prefix+"search_temp' style='display:none'>").appendTo('body').html(responce);
            var themeA = $('.'+prefix+'search_temp').find('.forum-info-box-inner>ol>li>a:first');
            if (themeA.length !== 0) {
                var themeHref = '/forum/'+themeA.attr('href');
                $('.'+prefix+'search_temp').remove();
                addLinks(themeHref);
            }
        });       
    }
    else addLinks(themeHref); 
  
  
   /*$(".b-el-link[href*='comments'], .b-el-link[href*='reviewArea']").attr('href', function(index, attr)  {
        $(this).html(function (index, html) { return html+' в форуме'; }); 
        return themeHref;
   });*/
    
}
page.changeNewsCommentsHref.nameForUser = "В новостях менять ссылку на комментарии на форум";

page.addRSSToLenta = function() {
    addRSS('lenta');
}
page.addRSSToLenta.nameForUser = "RSS на разделы новостей в 'хлебных крошках'";

page.addRSSToBankNews = function() {
    addRSS('banknews');
}
page.addRSSToBankNews.nameForUser = "RSS новостей банка в 'хлебных крошках'";

page.addRSSToQA = function() {
    addRSS('qa');
}
page.addRSSToQA.nameForUser = "RSS на ответы в 'хлебных крошках' ВИО";

// показывает спасибо от пользователя с uid и именем в hash TODO ERR
page.filterThanksByUserId = function()
{
    hash = page.afterHash;
    
    var userId = /(.*)&(.*)/.exec(hash)[1];
    var userName = /(.*)&(.*)/.exec(hash)[2];

    // сначала скрываем все - и штрафы, и спасибо
    $("tr.event-ban, tr.event-thank").hide();
    // теперь открываем только тех, у кого в ссылке соотв. uid
    $('a.name[href*="UID='+userId+'"]').parents("tr.event-thank").show();
    // теперь меняем слово Репутация на Спасибо от ...
    $("#user-reputation ~ h2").html(function (index, oldhtml) {
        return oldhtml.replace("Репутация", "Спасибо от " + userName+" (всего "+$('tr.event-thank a.name[href*="UID='+userId+'"]').length+")");
    });
    // когда нажимаем "показать все записи", надо вернуть слово "Репутация" обратно 
    $("div.switch_page.linck > a.pseudo_link").bind("click", function () {
        $("#user-reputation ~ h2").html(function (index, oldhtml) {
            return oldhtml.replace(/(.*?)(<span)/,"Репутация $2"); 
        });
    });
    // меняем обратно хэш - убрать после перевода 
    window.location.hash = "user-reputation";
}

// Добавляет коэффициент полезности сообщений в профиле
page.addUserCoeffToProfile = function() {
    $(".aboutUser").append(function(){
        var coeff = userCoeff($("a[title='Посмотреть на сообщения пользователя']").text(), $("a#user-reputation-btn").text());
        if (coeff === null) return;
        return "<div class='reputation'>полезность: <b>"+coeff+"%</b></div>";
    });
}
page.addUserCoeffToProfile.nameForUser = 'Коэффициент полезности сообщений в профиле';

// заменяем вывод +10 спасибо на вывод всех спасибо TODO ERR
page.change10ThanksToAll = function()
{
    $("div.switch_page.linck > a.pseudo_link").attr("onclick","$('tr.event-ban, tr.event-thank').show();").attr("href","#user-reputation").html(function (i, old) {
        return old.replace("еще 10", "все записи");
    }); 
    
    //<div class="b-array__paginator load-more-events">
    //<div class="switch_page linck"><a 
    //class="pseudo_link" href="#" onclick="return LoadMoreUserDetails()">Показать еще 10</a></div>
}
page.change10ThanksToAll.nameForUser = 'Замена в профиле "еще 10 спасибо" на "все записи"';

page.addHrefsToProfile = function()
{
    if (!page.isLogged) return false;

    var userNameAndId = { 'id': page.userId, 'name' : page.userName };
   
    var oppNameAndId = getUserNameAndIdFromProfile(page.href);
    if (!oppNameAndId) return false;
    
    if (userNameAndId.id == oppNameAndId.id) return false; 
       
    var forumInfoDIV = document.getElementsByClassName("forumInfo");
    if (forumInfoDIV.length == 0) return false;
    
    oppAboutUserA = document.createElement("span");
    oppAboutUserA.innerHTML = '<a href="'+getSearchInUserCommentsHref(userNameAndId.name, oppNameAndId.id)+'" class="b-el-button b-el-button_icon">'+'<i style="background: url(/favicon.ico)"></i>Комментарии тебе</a> ';

    userAboutOppA = document.createElement("span");
    userAboutOppA.innerHTML = '<a href="'+getSearchInUserCommentsHref(oppNameAndId.name, userNameAndId.id)+'" class="b-el-button b-el-button_icon">'+'<i style="background: url(/favicon.ico)"></i>Комментарии ему(ей)</a> ';
    
    oppThanksUserA = document.createElement("span");
    oppThanksUserA.innerHTML = '<a href="'+getUserProfileHref(userNameAndId.id, oppNameAndId.id, oppNameAndId.name)+'" class="b-el-button b-el-button_icon">'+'<i style="background: url(/bitrix/components/custom/user.thank.forum/templates/.default/images/f_icon.png) -118px 0"></i>Спасибо тебе</a> ';

    userThanksOppA = document.createElement("span");
    userThanksOppA.innerHTML = '<a href="'+getUserProfileHref(oppNameAndId.id, userNameAndId.id, userNameAndId.name)+'" id="banki.ru.plus.reloadPage" class="b-el-button b-el-button_icon">'+'<i style="background: url(/bitrix/components/custom/user.thank.forum/templates/.default/images/f_icon.png) -118px 0"></i>Спасибо ему(ей)</a> ';
        
    forumInfoDIV[0].appendChild(oppAboutUserA);
    forumInfoDIV[0].appendChild(userAboutOppA);
    forumInfoDIV[0].appendChild(oppThanksUserA);
    forumInfoDIV[0].appendChild(userThanksOppA);
    
    document.getElementById("banki.ru.plus.reloadPage").onclick =  function (e)
    {  
        location.href = getUserProfileHref(oppNameAndId.id, userNameAndId.id, userNameAndId.name); 
        location.reload();
    }
}
page.addHrefsToProfile.nameForUser = 'Дополнительные кнопки в профиле';

page.addRSSToResponces = function() {
    addRSS('responces'); 
}
page.addRSSToResponces.nameForUser = "RSS на отзывы и ответы ПБ в 'хлебных крошках' НР";

// переносим правый блок в НР наверх
page.deleteHRRigthBlock = function() {
    if (!page.oldDesign) return;
    $("div.b-deposit__wrap__header")
    .after($("div.b-pr-phone"))
    .after($("div.b-BankShortRating"))
    .after($("div.b-BankShortInfo"))
    .after($("div.b-outer-card-adv"));
    $("div.l-r-column").remove();
    $("div.l-c-column").css("width","95%");
}
page.deleteHRRigthBlock.nameForUser = 'Перенос правого блока в НР на верх (только для старого дизайна)';

page.addForumFormToHP = function() {
    loadJsOrCssFile("/bitrix/templates/.default/components/bitrix/forum/banki/style.css","css");
    // подгрузка файлы выше 'портит' некоторые стили, вернем как было 
    $(".productList li span.count").css({'color' : '#939393', 'font-size': '11px','display' : 'inline', 'top' :'auto', 'left': 'auto', 'position': 'static', 'width' :'auto', 'height':'auto'});

    var responce_comment_div = document.getElementById("response_comment_form");
    var edit_comment_div = document.getElementById("edit_comment_form"); 
   
    if ((!responce_comment_div)&&(!edit_comment_div)) { return;}
    
    // клизму пока уберем <span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/klizma.gif" class="smiles" alt=":klizma:" title="и тебя вылечат" width="42" border="0" height="25"></a></span>     
    var bbcodes='<div class="forum-bbcode-line" id="forum_bbcode_line"><a href="#postform" class="forum-bbcode-button forum-bbcode-bold" id="form_b" title="Жирный (alt+b)"> <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif" /></a> <a href="#postform" class="forum-bbcode-button forum-bbcode-italic" id="form_i" title="Курсив (alt+i)"> <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif" /></a> <a href="#postform" class="forum-bbcode-button forum-bbcode-underline" id="form_u" title="Подчеркнутый (alt+u)"> <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif" /></a> <a href="#postform" class="forum-bbcode-button forum-bbcode-strike" id="form_s" title="Перечеркнутый (alt+s)"> <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif" /></a> <a href="#postform" class="forum-bbcode-button forum-bbcode-quote" id="form_quote" title="Оформление текста в виде цитаты (alt+q)"> <img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif" /></a>		<a href="#postform" class="forum-bbcode-button forum-bbcode-url" id="form_url" title="Ввод гиперссылки (alt+h)"><img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif" /></a><a href="#postform" class="forum-bbcode-button forum-bbcode-img " id="form_img" title="Подключение изображения (alt+g)"><img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a><a href="#postform" class="forum-bbcode-button forum-bbcode-video " id="form_video" title="Подключение видео (alt+v)"><img src="/bitrix/components/bitrix/forum.post_form/templates/.default/images/bbcode/empty_for_ie.gif"></a></div><div class="forum-smiles-line" id="forum_smiles_hidden" style="display: block; padding-top: 20px;"><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ab.gif" class="smiles" alt=":)" title="улыбка" height="24" width="20" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ad.gif" class="smiles" alt=";)" title="шутливо" height="24" width="20" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/ag.gif" class="smiles" alt=":D" title="широкая улыбка" height="20" width="20" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/ai.gif" class="smiles" alt=":o" title="удивленно" height="20" width="20" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/bl.gif" class="smiles" alt=":|" title="скептически" height="26" width="36" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/af.gif" class="smiles" alt="8)" title="круто" height="21" width="21" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ac.gif" class="smiles" alt=":(" title="печально" height="24" width="20" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/evil.gif" class="smiles" alt=":evil:" title="злюсь" height="24" width="35" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/qr.gif" class="smiles" alt=":wall:" title="бешусь" height="26" width="31" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ah.gif" class="smiles" alt=":oops:" title="смущенно" height="25" width="25" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/aj.gif" class="smiles" alt=":{}" title="поцелуй" height="23" width="34" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/ak.gif" class="smiles" alt=":cry:" title="очень грустно" height="22" width="31" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/facepalm.gif" class="smiles" alt=":omg:" title="только не это" height="24" width="28" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/inlove.gif" class="smiles" alt=":inlove:" title="влюбленный" height="29" width="22" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/23247378e1dac5dd917b2695aad1baa8.gif" class="smiles" alt=":notiam:" title="я?! нет." height="26" width="42" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/197.gif" class="smiles" alt=":shuffle:" title="а чего я?" height="23" width="18" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/bp.gif" class="smiles" alt=":ura:" title="ура!" height="27" width="42" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/am.gif" class="smiles" alt=":nunu:" title="ну-ну" height="27" width="36" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/aa.gif" class="smiles" alt=":angel:" title="просто ангел!" height="23" width="27" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ae.gif" class="smiles" alt=":-p" title="дразнится" height="24" width="20" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/secret.gif" class="smiles" alt=":-X" title="секрет" height="26" width="22" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/fool.gif" class="smiles" alt=":fool:" title="ты чё, дурак?!" height="23" width="29" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/boredom.gif" class="smiles" alt=":tired:" title="скучно" height="22" width="26" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/good.gif" class="smiles" alt=":thumbsup:" title="отлично!" height="23" width="26" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/ok.gif" class="smiles" alt=":ок:" title="Ок!" height="26" width="40" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 8px;"><img src="/bitrix/images/forum/smile/bx.gif" class="smiles" alt=":yes!!!:" title="Yes!!!" height="30" width="42" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/cg.gif" class="smiles" alt=":painful:" title="больно!" height="20" width="23" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/yep.gif" class="smiles" alt=":yep:" title="угу" height="24" width="20" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/dj.gif" class="smiles" alt=":zzz:" title="сплю" height="29" width="29" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 8px;"><img src="/bitrix/images/forum/smile/dl.gif" class="smiles" alt=":bonk:" title="подзатыльник" height="30" width="48" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/mosking.gif" class="smiles" alt=":jokingly:" title="хи-хи" height="25" width="25" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/crazy.gif" class="smiles" alt=":crazy:" title="crazy!" height="27" width="20" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/scratch_one-s_head.gif" class="smiles" alt=":scratch:" title="Хмм..." height="24" width="27" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/pardon.gif" class="smiles" alt=":pardon:" title="пардон!" height="26" width="36" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/beee.gif" class="smiles" alt=":fi:" title="зазнался" height="28" width="28" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/ponty.gif" class="smiles" alt=":vnature:" title="чистА-кАнкретнА" height="26" width="35" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 1px;"><img src="/bitrix/images/forum/smile/d_daisy.gif" class="smiles" alt=":flowers:" title="вам букет!" height="44" width="43" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 8px;"><img src="/bitrix/images/forum/smile/dm.gif" class="smiles" alt=":magic:" title="колдунство!" height="31" width="42" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 12px;"><img src="/bitrix/images/forum/smile/stop.gif" class="smiles" alt=":stop:" title="стоп!" height="23" width="36" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 7px;"><img src="/bitrix/images/forum/smile/help.gif" class="smiles" alt=":help:" title="помогите!" height="33" width="30" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/rofl.gif" class="smiles" alt=":rofl:" title="я валяюсь!" height="25" width="29" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 10px;"><img src="/bitrix/images/forum/smile/cd.gif" class="smiles" alt=":quotes:" title="кавычки" height="26" width="36" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 7px;"><img src="/bitrix/images/forum/smile/cj.gif" class="smiles" alt=":relax:" title="relax" height="33" width="34" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/dh.gif" class="smiles" alt=":gramercy:" title="благодарю" height="29" width="36" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 4px;"><img src="/bitrix/images/forum/smile/cl.gif" class="smiles" alt=":achtung:" title="ахтунг!" height="38" width="48" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 6px;"><img src="/bitrix/images/forum/smile/dr.gif" class="smiles" alt=":nightmare:" title="а-а-а, кошмар!" height="34" width="42" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/drinks.gif" class="smiles" alt=":drink:" title="выпьем!" height="28" width="51" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 9px;"><img src="/bitrix/images/forum/smile/bt.gif" class="smiles" alt=":uncap:" title="здрасти!" height="28" width="42" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/cm.gif" class="smiles" alt=":dramatics:" title="я в истерике" height="24" width="38" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/bad.gif" class="smiles" alt=":puke:" title="тошнит" height="21" width="21" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/ar.gif" class="smiles" alt=":music:" title="тын-тыдын, парам-пам-пам" height="25" width="28" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/2.gif" class="smiles" alt=":?:" title="Вопрос" height="20" width="20" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 13px;"><img src="/bitrix/images/forum/smile/1.gif" class="smiles" alt=":!:" title="восклицание" height="20" width="20" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 14px;"><img src="/bitrix/images/forum/smile/idea.gif" class="smiles" alt=":idea:" title="идея" height="18" width="18" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/bomb.gif" class="smiles" alt="@=" title="бомба" height="24" width="28" border="0"></a></span><span class="forum-smiles-item" style="height: 46px;"><a href="#postform" name="smiles" style="margin-top: 11px;"><img src="/bitrix/images/forum/smile/wiki_go.gif" class="smiles" alt=":wikigo:" title="Пиши в словарь!" height="25" width="72" border="0"></a></span><span style="height:46px;" class="forum-smiles-item"><a style="margin-top:9px;" name="smiles" href="#postform"><img width="34" height="28" border="0" title="обалдеть!" alt=":shock&amp;fall:" class="smiles" src="/bitrix/images/forum/smile/c110.gif"></a></span></div></div>'; 
 
    if (responce_comment_div)
    {
        var form_table=responce_comment_div.children[0];
             
        var post_form = document.createElement("a");
        post_form.setAttribute("name","postform");
        responce_comment_div.insertBefore(post_form, form_table);

        var forum_bbcode_line = document.createElement("div");
        forum_bbcode_line.innerHTML = bbcodes;

        form_table.children[1].children[0].insertBefore(forum_bbcode_line,form_table.children[1].children[0].children[3]);
        form_table.children[1].children[0].children[4].removeChild(form_table.children[1].children[0].children[4].children[0]);
      
        forum_bbcode_line.onclick =
        function (e)
        {  
            e = e || event;
            target = e.target || e.src;
            insertIntoTextarea(target.id || target.className , target.alt, "REVIEW_TEXT",""); 
         };
    } 
    if (edit_comment_div)
    { 
        var div_edit = edit_comment_div.children[0].children[0];
   
        var edit_bbcode_line = document.createElement("div");

        edit_bbcode_line.innerHTML = bbcodes;

        div_edit.insertBefore(edit_bbcode_line,div_edit.childNodes[0]); 
      
        edit_bbcode_line.onclick =
        function (e)
        {  
            e = e || event;
            target = e.target || e.src;
            insertIntoTextarea(target.id || target.className , target.alt, "edit_comment_editing_text", ""); 
        };
    } 
    
    // исправление ошибки http://www.banki.ru/forum/index.php?PAGE_NAME=message&FID=10&TID=191017&MID=2341244#message2341244
    $("#REVIEW_TEXT").on('keydown', function(e){
        if ((e.ctrlKey) && ((e.keyCode == 37) || (e.keyCode == 39))) {
            e.stopImmediatePropagation();
        }
    });
}
page.addForumFormToHP.nameForUser = 'Замена формы ответа в комментариях НР на "как в форуме"';

page.addHrefsToHP = function() {
    
    if (!page.isLogged) return;
    var i;
    var area_name;
    var url;

    var comments = document.getElementsByClassName("respcomment");
    var responce_comment_div = document.getElementById("response_comment_form");
    var edit_comment_div = document.getElementById("edit_comment_form"); 
      
    for (i=0;i<comments.length;i++)
    {
        url = "";
        var nick = comments[i].children[0].children[0].children[0].children[0].innerHTML;
        
        
        
        var comment = comments[i].children[0].children[0].children[1];
        
        var comment_link_arr = comment.getElementsByClassName("warn-link");
        var comment_id = "";
        if (comment_link_arr[0])
        {
            if (/.*(#.*)$/.test(location.href)) { location_href = location.href.replace(/(.*)(#.*)$/,"$1"); }
            else { location_href=location.href; }
            comment_id = comment_link_arr[0].id.substring(5);
            url = location_href+'#respcomment'+comment_id; 
        }
        div_action_links = document.createElement("div"); 
        div_action_links.setAttribute("class","forum-action-links"); 
        div_action_links.innerHTML = '<span class="forum-action-quote"><a href="#postform" id="name_quote" comment="'+comment_id+'" name="'+nick+'">Цитировать</a></span>&nbsp;&nbsp;<span class="forum-action-reply"><a href="#postform" title="Вставить в ответ имя" id="name" name="'+nick+'">Имя</a></span>';    
        if (comment_link_arr[0]) { div_action_links.innerHTML = div_action_links.innerHTML + '&nbsp;&nbsp;<span class="forum-action-reply"><a href='+url+' title="Ссылка на комментарий">#'+comment_id+'</a></span>'; }
        comment.appendChild(div_action_links);
        
        div_action_links.onclick =
        function (e)
        {  
            e = e || event;
            target = e.target || e.src;
            url= "";
            comment_id = target.getAttribute("comment");
            if (comment_id)
            {
                if (/.*(#.*)$/.test(location.href)) { location_href = location.href.replace(/(.*)(#.*)$/,"$1"); }
                else { location_href=location.href; }
                url = location_href+'#respcomment'+comment_id; 
            }    
            if (responce_comment_div && (responce_comment_div.style.display!='none')) { insertIntoTextarea(target.id || target.className , target.getAttribute("name"), "REVIEW_TEXT", ""); } 
            if (edit_comment_div && (edit_comment_div.style.display!='none')) { insertIntoTextarea(target.id || target.className , target.getAttribute("name"), "edit_comment_editing_text", ""); }    
        };
    }
}
page.addHrefsToHP.nameForUser = 'Цитата, имя и ссылка на сообщения в комментариях HP';

// раскрытие "свернутых" отзывов и ответов ПБ
page.recollapseResponses = function() {
    $(".response_collapse").removeClass("response_collapse").addClass("response_collapse minus");
    $(".no_credited").removeClass("no_credited");
    $("tr.bankComment div.text-block").toggle();
    $("tr[id*='resp_text'] div.text-block").toggle();
    $(".b-el-toggle").toggleClass("b-el-toggle_opened");
}
page.recollapseResponses.nameForUser = 'Разворачивать отзывы и ответы ПБ в НР';

page.addAdditionalSearchToResponces = function() {
    addAditionalSearch('responces');
}
page.addAdditionalSearchToResponces.nameForUser="Поиск по отзывам в НР";

// добавление ссылок на rss-каналы на отзывы и ответы ПБ в списке банков в НР
page.addRSSToListOfBanks = function() {
    // ориентируясь по имеющимся классам, выходим на поля в столбце название банка
    $("td.solves").parent().find("td:first-child + td").html(function(index, oldhtml) {
        // если это не последняя строка с итогами
        if (/(.*)<a(.*)/.test(oldhtml)) {
            // добавляем 2 ссылки на rss
            bankId = getBankIdFromUrlResponces($(oldhtml).attr('href'));
            oldhtml += "<a title=\"Отзывы клиентов\" href=\"http://pipes.yahoo.com/pipes/pipe.run?_id=6717699aabb56f168884843eab60fb9d&_render=rss&numberinput1="+bankId+"\"><img src=\"/com/rss.gif\" alt=\"Отзывы клиентов\" style=\"position: relative; top: 1px; z-index: 1;\"></a>&nbsp;";        
            oldhtml += "<a title=\"Ответы представителей банка\" href=\"http://pipes.yahoo.com/pipes/pipe.run?_id=fb400833eda6b01d31a36ad5c5c6da83&_render=rss&numberinput1="+bankId+"\"><img src=\"/com/rss.gif\" alt=\"Ответы представителей банка\" style=\"position: relative; top: 1px; z-index: 1;\"></a>";
        }
        return oldhtml;
    });
}
page.addRSSToListOfBanks.nameForUser = 'RSS на отзывы и ответы ПБ в списке банков НР';

/** Исправление ошибки в ссылках в случае подписки http://www.banki.ru/forum/index.php?PAGE_NAME=message&FID=10&TID=51734&MID=2501456#message2501456  */
page.repairPageHrefsIfSubscribe = function() {
    $(".forum-page-navigation>a").attr('href', function(i, val) {
        if (/TOPIC_SUBSCRIBE=Y&/.test(val)) val = val.replace('TOPIC_SUBSCRIBE=Y&','');    
        return val;
    });
}
page.repairPageHrefsIfSubscribe.nameForUser = 'Исправление ошибки в ссылках на страницы форума при подписке';

/** Добавляет дополнительные смайлы  */
page.addAdditionalSmiles = function() {
    
    if (!page.isLogged) return;
    var aS = new AdditionalSmiles();
    
}
page.addAdditionalSmiles.nameForUser = 'Добавлять смайлы пользователя';

function AdditionalSmiles() {
    this.HIDDEN_SIMLES_FILTER = '#forum_smiles_hidden';
    this.SMILE_SPAN_CLASS = prefix + 'smiles'; 
    this.SMILE_ADD_A_CLASS = prefix + 'add_smiles';
    this.SMILE_ADD_A_TEXT = 'Добавить';
    this.SMILE_DELETE_A_TOGGLE_CLASS = prefix + 'smiles_delete_toggle'; 
    this.SMILE_DELETE_A_TEXT = [];
    this.SMILE_DELETE_A_TEXT['show'] = 'Удалить';
    this.SMILE_DELETE_A_TEXT['hide'] = 'Использовать';
    this.SMILE_STORAGE_NAME = prefix + 'smileStorage';
    this.smileStorage = getParam(this.SMILE_STORAGE_NAME);
    
    if (this.smileStorage === null) { 
        this.smileStorage = { 0:"http://www.banki.ru/bitrix/components/bitrix/forum.interface/show_file.php?fid=263644", 1:"http://www.banki.ru/bitrix/components/bitrix/forum.interface/show_file.php?fid=266108", 2:"http://www.banki.ru/bitrix/components/bitrix/forum.interface/show_file.php?fid=266109"}; 
        setParam(this.SMILE_STORAGE_NAME, JSON.stringify(this.smileStorage));
    }
    else {
        this.smileStorage = JSON.parse(this.smileStorage);
        this.id = 0;
        for (var key in this.smileStorage) {
            if (key>this.id) this.id=key;
        }
        this.id++;
    }
   
   
    this.oneSmile = function (href) {
        return '<span style="height:46px;" class="forum-smiles-item" id=><a style="margin-top:11px;" name="smiles" href="#postform"><img border="0" alt="[IMG]'+href+'[/IMG]" class="smiles" src="'+href+'"></a></span>';
    }
    
    this.drowSmile= function(href)  {
        $('.'+this.SMILE_SPAN_CLASS).append(this.oneSmile(href));
    }

    this.drowAll = function() {
        for (var key in this.smileStorage) {
            this.drowSmile(this.smileStorage[key]);
        }
    }
    this.addSmile = function(event) {
        event.preventDefault();
        var href = prompt("Введите адрес смайлика", "");
        if (!href) { return; }
        this.smileStorage[this.id] = href;
        setParam(this.SMILE_STORAGE_NAME, JSON.stringify(this.smileStorage));
        this.id++;
        this.drowSmile(href);
    } 
    
    $(this.HIDDEN_SIMLES_FILTER).after('<div class="forum-class-line"><span class="forum-smiles-item '+this.SMILE_SPAN_CLASS+'" style="height:46px;"></span>&nbsp;<a href="#" style="border-bottom-style: dashed; border-bottom-width: 1px; text-decoration: none;" class="'+this. SMILE_ADD_A_CLASS+'">'+this.SMILE_ADD_A_TEXT+'</a>&nbsp;&nbsp;&nbsp;<a href="#" style="border-bottom-style: dashed; border-bottom-width: 1px; text-decoration: none;" class="'+this.SMILE_DELETE_A_TOGGLE_CLASS+'">'+this.SMILE_DELETE_A_TEXT['show']+'</a></div></div>');
    this.drowAll();
    $('.'+this.SMILE_ADD_A_CLASS).on("click", $.proxy(this.addSmile, this));
 }    
   

// добавление пробелов в текст "Спасибо", чтобы достичь необходимых 20 символов 
page.addSpacesToSmallThank = function() {
    // для всех соотв. input делаем inline-хак в onclick 
    $("input.user-thank-change-button").attr("onclick", function (i, val) {
        return "$(this.parentNode).find('textarea.user-thank-change-reason').val(function (count, val) { for (i=20-val.length; i>0; i--) val=val+' '; return val;});" + val;
    });    
}
page.addSpacesToSmallThank.nameForUser="Спасибо в форуме с любым числом знаков";

// Добавляет в функцию вызова цитаты ссылку на сообщение
page.addHrefToQuotes = function() {
    var FILTER_DIV_LINKS = 'div.forum-action-links';
    var A_TEXT = 'Цитировать с ссылкой';
    var CLASS_PRE_CITATE = prefix+'pre_citate';
    var FILTER_TABLE_POST = 'table.forum-post-table';
    var FILTER_SPAN_NAME = 'div.forum-user-name>a>span';
    var FILTER_A_NUMBER = 'div.forum-post-number>noindex>a';
    var FILTER_DIV_POST_TEXT = 'div.forum-post-text';
    var FILER_SPAN_DATE = '.forum-post-date>span:contains(".")';
    
    if (this.isClosed) {
        var citate =  new ModalWindow('citate',150,'Нажмите Ctrl-C', 600);
        $('body').on('keyup', function(e) {
            if ((e.ctrlKey) && (e.keyCode == 67))  { citate.close(); }
        });
        $('<a href="#">'+A_TEXT+'</a>').appendTo(FILTER_DIV_LINKS).on('click', function(e) {
            e.preventDefault();
            
            var table_post = $(this).parents(FILTER_TABLE_POST);
            var name = table_post.find(FILTER_SPAN_NAME).text();
            var href = table_post.find(FILTER_A_NUMBER).attr('href');
            //var date = $.trim(table_post.find(FILER_SPAN_DATE).text().substr(0,10));
                       
            var selection = document.getSelection();
            var text = selection.toString();
            if (text === '') { text = table_post.find(FILTER_DIV_POST_TEXT).text(); }
            text = $.trim(text);
            text = text.replace(/\n/g,'<br\>');
            citate.changeInner('<span class="'+CLASS_PRE_CITATE+'">[QUOTE]'+name+' [URL='+href+']пишет[/URL]:<br\>'+text+'[/QUOTE]</span>');
            citate.open();
            
            var range = document.createRange();
            range.selectNode($('.'+CLASS_PRE_CITATE)[0]);
            selection.removeAllRanges();
            selection.addRange(range);
            
        });
    }
    else {
        var selectAllTextInMessage = 'var messages = $(this).parents("'+FILTER_TABLE_POST+'").find("'+FILTER_DIV_POST_TEXT+'"); var selection = document.getSelection(); if (selection.toString()=="") { $(".post_message")[0].hasfocus=false; var range = document.createRange(); range.selectNode(messages[0]);  selection.addRange(range); }';
        //var rewriteGetSelection = ' PostForm.GetSelection = function() { if (this.form["POST_MESSAGE"].hasfocus == true && typeof(this.form["POST_MESSAGE"].selectionStart) != "undefined") { return this.form["POST_MESSAGE"].value.substr(this.form["POST_MESSAGE"].selectionStart, this.form["POST_MESSAGE"].selectionEnd - this.form["POST_MESSAGE"].selectionStart); } else if (this.saveSelection) { return this.saveSelection; } else if (document.selection && document.selection.createRange) { return document.selection.createRange().text; } else if (document.getSelection) { return document.getSelection() + "";} else { return false; }}';    
        $(".forum-action-quote a").clone().text(A_TEXT).each(function(){
        var val = $(this).attr('onmousedown');
        if (/message_text_(\d+)/.test(val)) {
            var messageID = /message_text_(\d+)/.exec(val)[1];
            $(this).insertBefore(".forum-action-quote:has(a[onmousedown*='"+messageID+"'])");
            $(this).after("&nbsp;&nbsp;&nbsp;");
            var messageHref = $(".forum-post-number>noindex>a[href*='"+messageID+"']").attr('href');
            var messagePostID = $(".forum-post-number>noindex>a[href*='"+messageID+"']").text();
            $(this).attr('onmousedown', selectAllTextInMessage+val.replace(/quoteMessageEx\('(.*?)',/,"quoteMessageEx('$1 в сообщении [URL="+messageHref+"]"+messagePostID+"[/URL]',")); 
        }});
    
        $("span.forum-action-quote a").attr('onmousedown', function(i, val) { return selectAllTextInMessage+val;} );
    }
}
page.addHrefToQuotes.nameForUser = 'Цитата с ссылкой на сообщение в форуме'; 

// Добавляет ссылку на комментарии пользователя в теме
page.addUserPostSearch = function() {
    var themeName = this.themeName;
    $("div.forum-user-additional :first-child:has(span a)").after(function(){
        var user = getUserIdFromUrl($(this).find('a').attr('href'));
        return "<span>Сообщения в теме: <span><a href='http://www.banki.ru/forum/?PAGE_NAME=user_post&UID="+user+"&topic="+themeName+"'>&gt;&gt;&gt;</a></span></span>";
    });
}
page.addUserPostSearch.nameForUser = 'Ссылка на поиск по сообщениям пользователя в теме форума';


// Добавляет коэффициент полезности сообщений в теме форума
page.addUserCoeffToForum = function() {
    
    $("div.forum-user-additional").append(function(){
        var coeff = userCoeff($(this).find("span:contains('Сообщений') span a").text(), $(this).find("span:contains('Репутация') span a").text());
        if (coeff === null) return;
        return "<span>Полезность: <span style='color:black'>"+coeff+"%</span></span>";
    });
}
page.addUserCoeffToForum.nameForUser = 'Коэффициент полезности сообщений в теме форума';

page.addOpenCloseAllSpoilers = function() {
    var FILTER_POST = '.forum-cell-post';
    var FILTER_A_IN_POST_WITH_SPOLER = FILTER_POST+':has(.forum-spoiler) .forum-post-number>noindex';
    var FILTER_SPOILER = 'tbody.forum-spoiler';

    $('<a href="#">'+CUT_SYMBOL+'</a>').insertAfter(FILTER_A_IN_POST_WITH_SPOLER)
    .attr('href', function() {
        return $(this).prev().find('a').attr('href');
    })
    .data('show',true)
    .on("click", function(e) {
        $show = $(this).data('show');
        $(this).parents(FILTER_POST).find(FILTER_SPOILER).each(function() {
            $show? $(this).show() : $(this).hide()      
        })
    $(this).data('show',!$show);
    e.preventDefault();
    });
} 
page.addOpenCloseAllSpoilers.nameForUser='Добавить ссылку на (ра)скрытие всех спойлеров в сообщении в форуме'

page.addCutBBCodeToForum = function () {
    var ID_CUT_HREF = prefix+'cut'; 
    $('<a title="Спойлер (cut)" id="'+ID_CUT_HREF+'" class="forum-bbcode-button forum-bbcode-quote" href="#postform"><img src="/bitrix/templates/.default/components/bitrix/blog/banki/bitrix/blog.post.edit/.default/images/cut.gif"></a>')
    .insertAfter("#form_quote");
    $('#'+ID_CUT_HREF).on("click", function (event) { event.preventDefault(); try {insertIntoTextarea('cut', null, 'POST_MESSAGE' ,null);} catch (err) { page.showErrors(err, false); }  });
    
    $(".forum-spoiler>thead>tr>th>div").css({"border-bottom-style":"dashed","border-bottom-width":"1px"});
}
page.addCutBBCodeToForum.nameForUser = 'Добавить BB-код CUT в форум'

page.addLinksToHiddenUserInfo = function() {
    if (!page.isLogged)  return false;
    $(".b-el-dropDown>ul").css('width', 180);
  
    var tempUl;
    var oppId;
   
    var oppName;
    $(".b-el-dropDown ul").each(function(index, element){
        oppId = getUserIdFromUrl($(element).find(".mail").attr('href'));
        oppAboutUserA = document.createElement("li");
        oppAboutUserA.class="first";
        oppName = $(".forum-user-name>a[href*='UID="+oppId+"']").attr('title');
        oppAboutUserA.innerHTML = '<a href="'+getSearchInUserCommentsHref(page.userName, oppId)+'"><i style="background: url(/favicon.ico)"></i>Комментарии тебе</a>';
        userAboutOppA = document.createElement("li");
        userAboutOppA.class="first";
        userAboutOppA.innerHTML = '<a href="'+getSearchInUserCommentsHref(oppName, page.userId)+'"><i style="background: url(/favicon.ico)"></i>Комментарии ему(ей)</a>';
        userThanksOppA = document.createElement("li");
        userThanksOppA.class="first";
        userThanksOppA.innerHTML = '<a href="'+getUserProfileHref(page.userId, oppId, oppName)+'"><i style="background: url(/bitrix/components/custom/user.thank.forum/templates/.default/images/f_icon.png) -118px 0"></i>Спасибо тебе</a>';
        oppThanksUserA = document.createElement("li");
        oppThanksUserA.class="first";
        oppThanksUserA.innerHTML = '<a href="'+getUserProfileHref(oppId, page.userId, page.userName)+'"><i style="background: url(/bitrix/components/custom/user.thank.forum/templates/.default/images/f_icon.png) -118px 0"></i>Спасибо ему(ей)</a>';
        element.insertBefore(oppAboutUserA, element.children[1]);
        element.insertBefore(userAboutOppA, element.children[1]);
        element.insertBefore(userThanksOppA, element.children[1]);
        element.insertBefore(oppThanksUserA, element.children[1]);
    });
}
page.addLinksToHiddenUserInfo.nameForUser = 'Дополнительные пункты в меню пользователя в форуме';

page.addHotKeysToForum = function()
{
    var currentPageArr;
    var currentPage;
    var oldpageRegexp;
    var messageRegexp;
    var newPage;
    var temp;
    
    currentPageArr = document.getElementsByClassName("forum-page-current"); 
    if (currentPageArr.length == 0) return false; 
    else currentPage = currentPageArr[0].innerHTML;  
    oldpageRegexp = new RegExp("&PAGEN_1=\\d+");
    messageRegexp = new RegExp("&MID=\\d+");
    newPage = "&PAGEN_1=";
    lastPage = (document.getElementsByClassName("forum-page-next").length > 0);
    
    document.onkeydown = function(e) 
    {
        e = e || event;
        if (!$("textarea.post_message:focus").length>0) {
            if (e.ctrlKey && e.keyCode == 37 && currentPage>1) { 
                currentPage--;
                changePage(page.href, oldpageRegexp, messageRegexp, newPage, currentPage);
            }
            else if (e.ctrlKey && e.keyCode == 39 && lastPage) { 
                currentPage++;
                changePage(page.href, oldpageRegexp, messageRegexp, newPage, currentPage);        
            }
        }
    }    
}
page.addHotKeysToForum.nameForUser = 'Перемещение по страницам темы форума при помощи Ctrl <- ->';

page.addGotoPage = function()
{
    var forumPageNavDIVArr = document.getElementsByClassName("forum-page-navigation");
    if (forumPageNavDIVArr.length == 0) return false;
    gotoPageA = document.createElement("a");
    gotoPageA.href="#";
    gotoPageA.className = "forum-page-next";
    gotoPageA.innerHTML = "Перейти:"
    forumPageNavDIVArr[0].appendChild(gotoPageA);
    pageNumberINPUT = document.createElement("input");
    pageNumberINPUT.type="text";
    pageNumberINPUT.name="pageNumber";
    pageNumberINPUT.size=4;
    forumPageNavDIVArr[0].appendChild(pageNumberINPUT);
    
    gotoPageA2 = document.createElement("a");
    gotoPageA2.href="#";
    gotoPageA2.className = "forum-page-next";
    gotoPageA2.innerHTML = "Перейти:"
    forumPageNavDIVArr[1].appendChild(gotoPageA2);
    pageNumberINPUT2 = document.createElement("input");
    pageNumberINPUT2.type="text";
    pageNumberINPUT2.name="pageNumber2";
    pageNumberINPUT2.size=4
    forumPageNavDIVArr[1].appendChild(pageNumberINPUT2);    

    function prepareToChange(cP)
    {
        if (isNaN(currentPage)) { return false; }
        oldpageRegexp = new RegExp("&PAGEN_1=\\d+");
        messageRegexp = new RegExp("&MID=\\d+");
        newPage = "&PAGEN_1=";
        if (cP>0) { changePage(window.location.href, oldpageRegexp, messageRegexp, newPage, cP); }
    
    }
    gotoPageA.onclick = function(e) 
    {
        e = e || event;
        currentPage =  pageNumberINPUT.value;
        prepareToChange(currentPage);
    }
    pageNumberINPUT.onkeydown = function(e)
    {
        e = e || event;
        if (e.keyCode == 13)
        {
            currentPage =  pageNumberINPUT.value;
            prepareToChange(currentPage);
        }
    }
    gotoPageA2.onclick = function(e) 
    {
        e = e || event;
        currentPage =  pageNumberINPUT2.value;
        prepareToChange(currentPage);
    }
    pageNumberINPUT2.onkeydown = function(e)
    {
        e = e || event;
        if (e.keyCode == 13)
        {
            currentPage =  pageNumberINPUT2.value;
            prepareToChange(currentPage);
        }
    }
}
page.addGotoPage.nameForUser = 'Поле для перехода на любую страницу в форуме';

// Поиск по названиям тем форума
page.addThemeSearchToForum = function() {
    var searchHTML = "<input name='"+prefix+"input_search' placeholder='Поиск по названиям тем' type='text' style='height: 24px;' size=30><input type='button' name='"+prefix+"button_search' class='input-search__button input-search__button--enabled' style='position:relative; left:-32px; height: 20px'>&nbsp;&nbsp;&nbsp;&nbsp;";
    $(".forum-header-box:not(:has(.forum-header-options)) .forum-header-title, .forum-category-name>tr>td:first").append("<div class='forum-header-options'></div>");
    $(".forum-header-options").first().prepend(searchHTML);
    var fid = this.fid; 
    $(".bread-crumbs").append("<img src='"+waiticon+"' class="+prefix+"wait style='display:none;'>");
    searchFunction = function(searchUrl, fid, template, field, noescape) {
        if (searchUrl === null) {
            var searchAdditional = '';
            if ((fid !== undefined) && (fid !== 0))  { searchAdditional = '&FID='+ fid; }
            if ((field !== null) && (field !== ''))  { searchAdditional = searchAdditional+ '&search_field=' + field; }
            if (noescape !== true) template = escape1251(template); //вызываемому скрипту обязательно нужна win-1251 escape 
            var searchUrl = '/forum/?PAGE_NAME=topic_search&do_search=Y'+searchAdditional+'&search_template='+template; 
        } 
        $("."+prefix+"wait").show();
        $.ajax({
            url: searchUrl,
            dataType:'text'})
            .done(function(responce) {
                $('.forum-navigation-box, .forum-header-box').remove();
                
                $('.forum-block-container').html(themeSearchAfterLoadParce(responce));
                
                $('.forum-block-container a.tableheadtext').attr('href', function() {
                    var href = $(this).prev().attr('href');
                    $(this).prev().remove();
                    return href;
                });
                
                // если ничего не нашли
                $("div.forum-block-container:not(:has(div.forum-info-box.forum-topics))").append('<div class="forum-info-box forum-topics"><div class="forum-info-box-inner">Ничего не найдено. Попробуйте другую фразу для поиска.</div></div>');
                
                $("div.forum-page-navigation a").each(function(){$(this).attr('data-href',$(this).attr('href'));}).on('click', function(e) { 
                    e.stopPropagation();
                    searchFunction($(this).attr('data-href'), null, null, null); 
                }).attr('href','#');  
                
                $('.forum-filter-first>input').attr('type','button').on('click', function (e) {
                    e.stopPropagation();
                    searchFunction(null, $('select.forums-selector-single').val(), $('input.search-input').val(), $("select[name*='search_field']").val()); 
                });
                $('input.search-input').off().on('keydown', function(e) {
                    if (e.keyCode!=13) return;
                    e.stopPropagation();
                    searchFunction(null, $('select.forums-selector-single').val(), $('input.search-input').val(), $("select[name*='search_field']").val()); 
                });
            })
            .complete(function() {$("."+prefix+"wait").hide();});
    };
    var template = this.params[prefix+'theme_search']; 
    if (template !== undefined) searchFunction(null, null, template, null, true);
    
    $("[name*='"+prefix+"input_search']").on('keydown', function(e) {
       if (e.keyCode!=13) return; 
       searchFunction(null, fid, $(this).val(), null); 
    });
    this.oldDesign ? $("[name='"+prefix+"button_search']").hide() : 
    $("[name*='"+prefix+"button_search']").on('click', function(e) {
       searchFunction(null, fid, $("[name*='"+prefix+"input_search']").val(), null); 
    });
}
page.addThemeSearchToForum.nameForUser="Поиск по названию тем форума";

page.addAditionalSearchToForum = function() {
    addAditionalSearch('forum_search'); 
}
page.addAditionalSearchToForum.nameForUser="Поиск сообщений в темах форума";

page.removeRedirect = function() {
    $('a[href*="banki.ru/redirect.php"]').attr('href', function(index, attr) {
        var regexp = /.*?banki\.ru\/redirect\.php\?link=(.*?)&hash(.*)/;
        if (regexp.test(attr)) {
            url = attr.replace(regexp,'$1');
            try { 
                url = decodeURIComponent(url);
            }
            catch(err) {
                return attr;
            } 
        }
        return url;
    });
}
page.removeRedirect.nameForUser="Удаление редиректа из ссылок";

/** Выбор раздела для поиске в шапке */
page.addSelectToSearchInTop = function() {
    
    function changeSearchForm(action, inputName) {
        $("form.item__node.js-search-input-form").attr('action',action);
        $("form.item__node.js-search-input-form .input-search__field").attr('name',inputName);
    }
    $('.branded-search__link').remove();
    var searchOption = getParam('top_search_option');
    if (searchOption === null) {
        setParam('top_search_option', 0);
        searchOption = 0;
    }
    
    $("form.item__node.js-search-input-form").prepend("<input type='hidden' name='search[type]' value='name'>");
    $("form.item__node.js-search-input-form").prepend("<input type='hidden' name='set_filter' value='Фильтровать'>");
        
    $('<select name="where" style="margin-top:12px"><option value="0">по всему сайту</option><option value="'+prefix+'banks">в банках России</option><option value="iblock_banks">в банках</option><option value="iblock_news">в новостях</option><option value="iblock_responses">в народном рейтинге</option><option value="'+prefix+'theme_search">в темах форума</option><option value="forum">в форуме</option><option value="'+prefix+'users">в пользователях</option><option value="iblock_wiki">в банковском словаре</option><option value="iblock_vacancy">в вакансиях</option><option value="iblock_resumes">в резюме</option></select>')
    .prependTo("form.item__node.js-search-input-form")
    .on("change", function() {
        var value = $(this).find('option:selected').attr('value');
        setParam('top_search_option', value);
        switch (value) {
            case prefix+'users': changeSearchForm('/forum/','user_name'); $("form.item__node.js-search-input-form").prepend("<input type='hidden' name='PAGE_NAME' value='user_list'>"); break;
            case prefix+'banks': changeSearchForm('/banks/search/','search[text]'); break;
            case prefix+'theme_search':  changeSearchForm('/forum/',prefix+'theme_search'); $("form.item__node.js-search-input-form input[name*='PAGE_NAME']").remove(); break;
            default : changeSearchForm('/search/','q');
        }
    })
    .find("option[value='"+searchOption+"']").attr('selected','true')
    .trigger("change");
    
   
    // на случай, если нет брендового поиска, так уже однажды случалось
    $('li.menu__item--last:not(.branded-search-wrapper) form.item__node.js-search-input-form').wrap('<div class="branded-search branded-search--color-90be19" />');
    $('li.menu__item--last:not(.branded-search-wrapper)').addClass('branded-search-wrapper');
}    
page.addSelectToSearchInTop.nameForUser="Выбор раздела для поиске в шапке";

// удаление "автосохранения" комментария, если текущая страница != странице, где последний раз был сохранен комментарий       
page.deleteAutoSave = function () {

    // не помню зачем такое исключение
    if (/banki\.ru\/friends\/group\/.*?\/forum\/edit\/.*/.test(page.href)) return;
    
    var href = page.href;
    if (typeof(localStorage)!='undefined') {
    // сохраняем адрес текущей страницы
    var autoSaveHref = localStorage.getItem('banki.ru.plus_autoSaveHref');
            
    $("textarea[role*='rich-textarea']").each(function (index, Element) {
        if (autoSaveHref != href) { 
            localStorage.setItem('autoSaveComment',"");
            Element.value = ""; 
        }
        // если браузер поддерживает событие oniput, повесим на него запись комментария и адреса текущей страницы
        if ("oninput" in Element) {
            $(Element).bind("input", function () {
            localStorage.setItem('autoSaveComment',Element.value);
            localStorage.setItem('banki.ru.plus_autoSaveHref',href);
            });
        }
        // на все осталыьне события, связаныне с изменением textarea добавим запись адреса текущей страницы
        $(Element).bind("click select keyup", function (){
            localStorage.setItem('banki.ru.plus_autoSaveHref',href);
            });
        });
    }          
}
page.deleteAutoSave.nameForUser = 'Отключить навязчивое автосохранение';


/** Добавляет пункты в "меню пользователя" */
page.addToUserMenu = function() {
    $(".item__spoiler.item__spoiler--user").css({"width":"170", "padding-left":"20px"});
    $(".spoiler__item>a:contains('Сообщения')")
    .text("ЛС (входящие)")
    .parent().after('<li class="spoiler__item"><a href="/forum/?PAGE_NAME=pm_list&amp;FID=2">ЛС (отправленные)</a></li>')
    .next().after('<li class="spoiler__item"><a href="http://www.banki.ru/forum/index.php?PAGE_NAME=user_post&UID='+this.userId+'&mode=all">Мои сообщения в форуме</a></li>')
    .next().after('<li class="spoiler__item"><a href="http://www.banki.ru/forum/index.php?PAGE_NAME=user_post&UID='+this.userId+'&mode=lta">Мои темы в форуме</a></li>')
    .next().after('<li class="spoiler__item"><a href="http://www.banki.ru/forum/?PAGE_NAME=subscr_list">Подписки</a></li>');                  
    $(".spoiler__item>a:contains('Моя лента')")
    .parent().after('<li class="spoiler__item"><a href="http://www.banki.ru/profile/index.php?UID='+this.userId+'&action=activity">Моя активность</a></li>');
}
page.addToUserMenu.nameForUser='Дополнительные ссылки в меню пользователя'
        
/** Удаляет кнопку наверх */                                
page.removeUpButton = function() {
    
    $(document).on('scroll', function() { 
        $("#scrollToTop").remove();
    });
}    
page.removeUpButton.nameForUser = 'Отключить кнопку наверх';
page.removeUpButton.firstRunIsFalse = false; 

/** Вешает ссылки на разделы */                               
page.addLinkInMainMenu = function() {
       $("span.section__title").wrap( function() {
            return "<a style='text-decoration:none' href='"+$(this).parent().find("a.list__link").first().attr('href')+"'>";
    });
}    
page.addLinkInMainMenu.nameForUser = 'Заголовки главного меню - ссылки на разделы';

// ------------------------------ Предварительные функции ----------------------------------------------
/** Добавляем меню скрипта в шапку */
page.addUserScriptMenu = function() {
    if (!page.oldDesign) {
        $("li.menu__item.js-menu__item:has(div i[class*='facebook'])").clone(true).addClass(prefix+'menu menu__item--right')
        .find("div").addClass(prefix+'menu_div').attr('isOpened',false)
        // меняем иконку
        .find('i').attr('class','icon-16x16').css({"background-image":'url('+favicon+')','width':25, 'height':25,'margin-top':12})  
        .end().end().find("li.spoiler__item").remove() //удаляем ссылки
        .end().find("ul.item__spoiler") // добавляем ссылки
            .append("<li class='spoiler__item'><a href='#' id="+prefix+"options_popup_show>Настройки</a></li>")
            .append("<li class='spoiler__item'><a href='/forum/?PAGE_NAME=read&FID=9&TID=211756'>FAQ</a></li>")
            .append("<li class='spoiler__item'><a href='/forum/?PAGE_NAME=read&FID=9&TID=129799'>Поддержка</a></li>")
            .append("<li class='spoiler__item "+prefix+"getlastversion'><a href="+UPDATE_URL+">Последняя версия</a></li>")
            .append("<li class='spoiler__item'>-----------------------</li>")
            .append("<li class='spoiler__item'><a href='http://bankiforum.ru/showthread.php/290-RSS-ленты-на-banki-ru'>RSS-ленты</a></li>")
            .append("<li class='spoiler__item'><a href='http://bankiforum.ru/showthread.php/255-%D0%9F%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D0%B4%D0%BB%D1%8F-Adblock-Plus'>Подписка AdBlock+</a></li>")
    
        .end().insertBefore(".menu__item.menu__item--right:not(."+prefix+"menu):first");
        if ((new_version!==null)&&(new_version>version)) { 
            $("."+prefix+"getlastversion").after("<li class='spoiler__item "+prefix+"getlastversion'><a href="+UPDATE_URL+" style='color:red'>Новая версия ("+new_version+")</a></li>").remove();
        }    
        
        $('.'+prefix+'menu').on('click', function (e) {
            var div = $(this).find('div'); 
            if (div.attr('isOpened') == 'false')  { div.addClass('item__node--expanded').attr('isOpened', true); }
            else { div.removeClass('item__node--expanded').attr('isOpened', false); }
            e.stopPropagation();
        });
        $('body').on('click', function () {
            $('.'+prefix+'menu_div.item__node--expanded').removeClass('item__node--expanded').attr('isOpened', false); 
        });
    }
}

/** Обновление скрипта */
page.updateUserScript = function() {

    var today = new Date;
    
    var dayCheckUpdate = getParam('dayCheckUpdate');
    if (dayCheckUpdate === null) { 
        dayCheckUpdate = today;
        setParam('dayCheckUpdate', today.toString()); 
    }
    else dayCheckUpdate = new Date(dayCheckUpdate);
    
    if (dayCheckUpdate.getTime()>today.getTime()) return;  
    dayCheckUpdate = today;
    dayCheckUpdate.setDate(dayCheckUpdate.getDate()+1);
    setParam('dayCheckUpdate', dayCheckUpdate.toString()); 

    loadJsOrCssFile(VERSION_URL+'?'+random(100001, 999999),'js');
    
    chanceToUpdate();
    
    function chanceToUpdate() {
    
        var new_version_online = $("div."+prefix+"version").text();
        
        if (new_version_online!='') {
            new_version = new_version_online; setParam('new_version', new_version);
            
            var dayX = getParam('dayX');
            if (dayX === null) { 
                dayX = today;
                setParam('dayX', today.toString()); 
            }
            else dayX = new Date(dayX);
    
            if (new_version>version) {
               
                $("."+prefix+"getlastversion").after("<li class='spoiler__item'><a href="+UPDATE_URL+" style='color:red'>Новая версия ("+new_version+")</a></li>").remove();
                
                if (dayX.getTime()<=today.getTime()) {
                    dayX = today;
                    confirmed = window.confirm('Вышла новая версия Банки.ру+ '+new_version+'(у вас установлена '+version+'). Хотите скачать и установить?');
                    if (confirmed) {
                        window.open(UPDATE_URL, prefix+'_update');
                    }
                    dayX.setDate(dayX.getDate()+1); 
                    setParam('dayX', dayX.toString());
                }   
            }
        }
        else { setTimeout(chanceToUpdate, 100); }
    }
} 



/** Опции скрипта */
page.addOptionsWindow = function() {
    
    var DIV_OPTIONS_TOP = 25;
    
    var optionsWindow = new ModalWindow('options', DIV_OPTIONS_TOP, 'Настройки');
    optionsWindow.changeInner('<div class="'+prefix+'options_reload" style="display:none">Изменения будут применены только после перезагрузки страницы. <a href="javascript:window.location.reload();">Перегрузить?</a><br/><br/></div><div class="'+prefix+'func_list"></div>');
    
    for (var key in page) {
        if ((typeof page[key] == 'function') && ('nameForUser' in page[key])) {
            $('<div>'+page[key].nameForUser+' <input type=checkbox id='+key+' class="'+prefix+'func_check"></div>').prependTo('.'+prefix+'func_list');
            var isAllowed = getParam(key);
            if (isAllowed === null) {
                isAllowed = (typeof(page[key].firstRunIsFalse)==='undefined')? 1 : 0;
                setParam(key, isAllowed); 
            }
            if (+isAllowed === 1) { $('#'+key).click(); }
            $('#'+key).on('click', function() { setParam(this.id, +this.checked); $('.'+prefix+'options_reload').show(); });
        }
    }
    
    $('#'+prefix+'options_popup_show').on('click', $.proxy(optionsWindow.open,optionsWindow));
    
    $('body').on('keydown', function(e){
        if ((e.ctrlKey) && (e.shiftKey) && ((e.keyCode == 191) || (e.keyCode == 190))) {
           optionsWindow.open();
        }
    });
}

page.loadFilesEtc = function() {
    loadJsOrCssFile('/_lib/jquery/plugins/popup/popup.css','css');
    loadJsOrCssFile('/bitrix/templates/.default/components/bitrix/system.auth.form/redesign/style.css','css');
}

// ----------------------- Конструкторы ----------------------------------------------
/** Конструктор для "модальных" окон */
function ModalWindow(name, top, title, width) {
    this.top = top;
    this.name = name;
    this.title = title;
    this.width = (width === undefined) ? 0 : width;
    this.FILTER_DIV_OVERLAY = 'div.b-popup__overlay';
    this.CLASS_DIV_OVERLAY = 'b-popup__overlay';
    this.CLASS_DIV_OVERLAY_BLACK = 'b-popup__overlay_black';
    this.CLASS_DIV_SHOW = 'b-popup_show';    
    this.CLASS_DIV_MAIN = prefix+name;
    this.CLASS_I_CLOSE = prefix+name+'_close';
    this.CLASS_DIV_INNER = prefix+name+'_inner';
    
    if ( $(this.FILTER_DIV_OVERLAY).length === 0) { $('body').prepend('<div class="'+this.CLASS_DIV_OVERLAY+'" style="display: none;"></div>'); }
    $('body')
    .prepend('<div class="'+this.CLASS_DIV_MAIN+' b-popup b-popup_white" style="padding: 20px 27px 20px 22px; top: '+this.top+'px; opacity: 1; margin-top: 0px; display:none;"><span class="b-el-link b-el-link_popup"><i class="b-el-link__icon b-el-link__icon_close '+this.CLASS_I_CLOSE+'"></i></span><h6 class="b-loginPopup__title">'+this.title+'</h6><div class='+this.CLASS_DIV_INNER+'></div></div>')
    
    this.close = function() {
        $(this.FILTER_DIV_OVERLAY).removeClass(this.CLASS_DIV_OVERLAY_BLACK).hide();
        $('.'+this.CLASS_DIV_MAIN).removeClass(this.CLASS_DIV_SHOW).hide();
    };
    
    this.open = function () {
        $(this.FILTER_DIV_OVERLAY).addClass(this.CLASS_DIV_OVERLAY_BLACK).show();
        var top = this.top;
        var width = this.width;
        $('.'+this.CLASS_DIV_MAIN).addClass(this.CLASS_DIV_SHOW)
        .css('width', function (i,val) { 
            if ((width === 0) || ($(this).width<width)) return val;
            return width;
        })
        .css('top', function(i, val) { 
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
            return top+scrollTop; 
        })
        .css('left', function(i, val) { return ($(window).width()-$(this).outerWidth())/2; })
        .show(); 
    }
    
    this.changeInner = function (newHtml) {
        $('.'+this.CLASS_DIV_INNER).html(newHtml);
    }
    
    $('.'+this.CLASS_I_CLOSE).on("click", $.proxy(this.close, this));
    
} 

// общий конструктор для любой страницы
function BankiruPage() {
    
    //определяем какой дизайн
    if  ($(".b-to-new-design>a").length!=0) { this.oldDesign = true; }
    else { this.oldDesign = false; }
    
    // ищем имя пользователя и его id, на основании найденного решаем залогирован ли пользователь или нет
    if (this.oldDesign) {
        this.userName = $("a.b-userbar__name").html();
        this.userId = getUserIdFromUrl($("a.b-userbar__name").attr("href")); 
    }
    else {        
        this.userName = $("span.link-with-icon__text").html();
        this.userId = getUserIdFromUrl($("a.link-with-icon").attr("href"));
    }    
    this.isLogged = (this.userName!="")&&(this.userId!==null);
   
    this.title=$("title").text(); 
      
    // делаем разбор строки get-параметров и сохраняем их в свойстве-массиве params
    // TODO добавить проверки ? 
    this.href = window.location.href;
    this.center = $(window).width()/2 ;
    this.params = {};   
    var getParams = window.location.search.substring(1).split("&");
    for (var i=0; i<getParams.length; i++) {
        var keyVal = getParams[i].split("=");
        this.params[keyVal[0]] = keyVal[1];
    }
    this.afterHash = window.location.hash.substring(1);
} 

(function() {
    
    try {
        for (var i=0; i<functionsSequence.length; i++) {
            var addressPattern = new RegExp(functionsSequence[i].address);
            if (addressPattern.test(page.href)) {
                var functions = functionsSequence[i].functions.split(', ');
                for (var j=0; j<functions.length; j++) {
                    var canRun = getParam(functions[j]);
                    if ( ((canRun === null) && (typeof(page[functions[j]].firstRunIsFalse)==='undefined')) || (+canRun === 1)) 
                    try { page[functions[j]](); }
                    catch (err) {
                        page.showErrors(err, false);
                    }
                }
                if (functionsSequence[i].isLast) break;
            }
        }
     //$('.page-body').wrap('<section contextmenu="my-right-click-menu" class="temp"></section>');
     //$('.page-body').append('<menu type="context" id="my-right-click-menu"><menuitem label="Не надо тырить картинки" icon="img/forbidden.png"></menuitem> <menuitem label="Facebook" onclick="goTo(\'//facebook.com/sharer/sharer.php?u=\' +window.location.href);"></menuitem><menuitem label="Обновить" onclick="window.location.reload()"></menuitem></menu>');
    }
    catch (err) { 
        page.showErrors(err, true); 
    }
})(); 