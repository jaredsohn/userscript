// RadioLab Download
// Version 0.1.0 BETA!
// 2011-01-03
// Copyright (c) 2011, Byron Rogers
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "RadioLab Download", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			RadioLab Download
// @namespace		http://www.Daem0nX.com (ByronRogers@gmail.com)
// @description		RadioLab.org - Adds the Download button back to the site.
// @version			0.1.0
// @notes			Initial release.<br/>Adds the Download button back to the site.
// @include			http*://www.radiolab.org/*
// ==/UserScript==

// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
// Update Notification System
// ========================================================
// === Edit the next four lines to suit your script. ===
var scriptName = 'RadioLab Download';
var scriptId = '94134';
var scriptVersion = '0.1.0';
var scriptUpdateText = 'Initial release. Adds the Download button back to the site.';
// === Stop editing here. ===

var debugUpdate = false;
var debugSettings = false;

/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();

//Extend to allow :regex
//  Can't use regex in :contains
jQuery.extend( jQuery.expr[':'], { regex: function(a, i, m, r) { var r = new RegExp(m[3], 'ig'); return r.test(jQuery(a).text()); } });

//Function to parse version numbers - maj.min.patch
//http://maymay.net/blog/2008/06/15/ridiculously-simple-javascript-version-string-to-object-parser/
function parseVersionString(str) {
    if (typeof(str) != 'string') { return false; }
    var x = str.split('.');
    // parse from string or default to 0 if can't parse
    var maj = parseInt(x[0]) || 0;
    var min = parseInt(x[1]) || 0;
    var pat = parseInt(x[2]) || 0;
    return {
        major: maj,
        minor: min,
        patch: pat
    }
}

//********************************
//Store images in base64 to save bandwidth!
//********************************
var gb_overlay = 'data:image/png;base64,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%3D';
var gb_blank = 'data:image/gif;base64,R0lGODlhAQABAJH/AP///wAAAMDAwAAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw%3D%3D';
var gb_close = 'data:image/gif;base64,R0lGODlhUQAPAKIAAIiIiP////T09Nvb2wAAAAAAAAAAAAAAACH5BAAAAAAALAAAAABRAA8AAAONCLrc/jDKSau9OOvNOxhgKA5O4HHmNghs25JNesaTnK2uCzP2bPUXHKE1FJACSIUsuUAugUulkjl9Nq8OnGBYNPZSYClPfDWFAee02Ix+aLe677r5pErZ7bxaf883tFwvcnxjfiV+e4llEEJELEdMVlU8dn1ziFR2eFk5Oj6fKp0voKRBIyOlqaqrrA8JADs%3D';
var update_grey = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABFCAYAAAAW0YV7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADTNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iIgogICBwaG90b3Nob3A6QXV0aG9yc1Bvc2l0aW9uPSIiPgogICA8ZGM6cmlnaHRzPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ii8+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6cmlnaHRzPgogICA8ZGM6Y3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkvPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+YmV0X29uZTwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Po1hJ38AABDfSURBVHja7FtpcBVVFu738rKQBEkCBBJIMLIJyCJbIWSGZRgEZIITgRhlEcYygo4MQgrHH4q4jFIloNRYKIwbClMChSIqBZZJaRWlIpBIICAQkCQYlkBCAknI0vN9PX1e3TT93usnxGWcrrrV/bpv973fWb5zzu1+Ll3Xtd/S5tZ+Y1uLAy4t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%3D%3D';
var update_green = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABFCAYAAAAW0YV7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADTNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iIgogICBwaG90b3Nob3A6QXV0aG9yc1Bvc2l0aW9uPSIiPgogICA8ZGM6cmlnaHRzPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ii8+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6cmlnaHRzPgogICA8ZGM6Y3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkvPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+YmV0X29uZTwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Po1hJ38AABdpSURBVHja7FsJeFXVtV5nulPmm5kkkEAI0YRAEAoIVLCAShUfTqjoU6RabdXSgkVr66PVV6u1avVRqiDCp8UWan32UZ+VKtjBgSlhCDKGkIRMZL6598z7dO19zh0yMImp9vXd79vf3meffc5Z/xr+tfY5CWdZFvwr/Xj4F/sNOuBDJxvj9zTU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%3D%3D';

//http://www.radiolab.org/media/img/radiolab/btn-media.png
var icon_media = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUcAAAAVCAMAAADiptwRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUFQTFRF%2F%2F%2F%2F%2Fv%2F%2FAAAA3ezrx9%2FdyN%2Fd3uzriIiIREREu7u7d3d3mZmZERERIiIiZmZmMzMz7u7uVVVVzMzMqqqq3uzs3d3d7%2B%2Fvv7%2B%2Fh4iIn5%2BfyN%2Fef39%2F3evr9vr6%2Bvz8%2Fv7%2BHx8fQEBAx97dYGBg0uXjEBAQ39%2FfUFBQmJmZy%2BHfzuPh1efl3OvpICAg7e7uyuDez8%2FPPz8%2FyeDer6%2Bv%2FP39Dw8P8Pb28%2Fj4MDAwuru77%2Fb1z%2BPh2%2Bvp1uflLS0t8ff3PDw8y8zM0eXj%2Bfz8zOHfzOHgioqKqaqqX19fcHBw%2Ff7%2BJCQkoqKi8Pf38vj4S0tLWlpaAwMDCQkJ%2B%2F398vf48%2FPzw8PD3N3dtLS0T09P7%2Fb2%2Ff%2F%2FgYGBycnJ7vb1ZWVlISEhj4%2BPNDQ0Gxsb7e3t0%2BXjBgYGJycn1dXVVlZWyuDf8VTNRwAABjJJREFUeNqsmQd%2F2yoQwPFZCLSXpSQeceM0e7VJd5uX1%2F3at%2Ffe%2B33%2FD%2FAOBBJO1DS2hf2zJAzH8efuAEHo80fdrt3r2rbdxY%2F4kfcy2fIrU08%2FYNn9HWpRC7%2FP9%2FXf%2BL%2BuUBbqKVnlc%2FfRjkWp1besnUd2t5Y%2BrFuxq9a7utVhWUC3MexWVbv7z4QC1Jo821fK2UoFKVF1wK7UM%2F6qZIhSqBemfp%2Fu7JcN9WQzZgX5OKwzegaY8k%2FkQa6vktnT6nUqSD552nlbIvrm6ROhMJ2ruWYVxEBaC8tb%2FZNiWlDO6nVyd66KZ9IcP%2BrMkD6U%2Fb5L2kpfiHFpQd7ZRPRlQTlnpDNXvTH6FO1%2F32B3U4%2FEyH7dR32tTmscx0JcC%2FLGSLG%2FqJxxeYHBrBWlk2pEgOntBilDKmkvCXlWC3JkoG1HJYB7SzNzpLNxJMKEtb4%2F%2FByGLxZUemK1My7WpB6PpfW1rZNFOAKsF9Uj98RvylP1nOezcEz41%2BWN68oL3y4fKZ1UHN%2FBGu%2Fq1jC58Rs08%2FiFLK0XTrMGx5VraAmDm4Y5cCnYqFh268KzVdvjiugJvBJAV0ocscs5w6tzZY6wsVI9MkmPKXwpOI0crfMcZTS8D8Fymc15%2Be%2By9mvab%2BIInLl%2B9AbNGFzIcpQ6cp6pKAIIjgA1SZTLmImu7NaFZ0ssPeRdsYEMljZghRQHsFmyDliI5RJ%2BdY4AazfMBnDcYw7gkgiiNA2Ax8RlHNy6E5qhThJXGLmBMEaIIt455BDWHOt%2BT3Fkgk1GvACSOOYOYSHBC2eB70mOru9joy5AgkoFKFBxxOWKVVG8PUAD2nwP5X67OYXJdQPwEkAQkPgoEfsUpOI31Byr8dhc%2FxV%2FbyCIA9hSQv6Nied5qEHKXcg8HypVOOqVRVODU5EYGBrguDPIWBiHEOZ%2B4kQJ4eCFkOrg3MjxEJYfw0u0SncbeGcZtl3NkVbx7Bvvdyz9vrdStwYshzDzQxLhF2IPYgiyyBccPWAMvNz3GALkQcYVR2qpeDtQFCUKQbI0BwjQrz3UOUuEBAczMu7HSeCEQq7nKgT0%2FPx3slFHOUQWsdgJAs%2BB31gKLPOZUgUCJxCymziuT3PMwE88ceNAiKaIIUd7lVyHN3HchsNOFCJA6dfCtQ2Oyn%2B%2B%2BrQs75kcGaC9A2FBDtwLE5GNEPHL0ecjjmEmEcqzyq9Rg35fcbymY1IxuC09XPu1I3RGIU5VF7PRojmv%2FbqOD8W68MpiKhq7Edqy7HiGghgLDFVK2Rc46km74khSFoGnODJmcBRMaBPHSN4dNnKkiiN5IQt9UreWg6c45uAmLET%2FO8fRAZed52hZk8qvJUlJ8eZUL5o4MpYbHKmYsMoqW3CALn0PQa6XMS4PHWGTuuOCI%2FNqVRo5blSLSAgdx8mFX%2FtZBsxBp%2FO545ocJ1TFx3Pz9WNYvn%2F%2FpfDtBr%2BmVXz8GGv8%2FWXdWuTHaenXJPLRh5FpxZFJv8YQIwJjYvg17orpZfOM6MWUPfpZ4gsJGKtMv67izQ04KATMteIENkohfpRlUYBj6UizAtdJMqXKGzhubU5jRXxOnACEcRyAmGeCzLRH2rzucdGt0SgjvAkSOc%2FwSM8zxvz6xy%2Fw2T9Ga2IpI%2BcZvEBOgpDUHMt5Jg%2FADZiYZ1xjvr5s3VP6iMkxVPOMz8Qvj7Rfaz8plgSD4p6opwJFiv6VpCghkR3HeYanSpVGjgcnsy5eaaM9XrafMTiSH%2F%2F6oI39TBvr8P75%2FUwxWNtamm8d%2FqqYeV9IqTX7vrDex6WL7%2BcobWVfODW%2Bi6Virsbp5S%2FMSIM9tr2%2FbkNeO%2Fvr8Vy1bsnGX1%2Fx3aNMn4vXuHTcGsZb0o7Grcihi8q5Re7MVe%2BB3Ex8N8v7x5%2FkPvZOaxwfyPevd9qRs6heD8juaI5qo125CdgdXR3j6KEc94ejljCOdmWI3l1UntAL%2B7KYXqNdYv13Wp1mdG3zCMM48LCnTyv2jmWMt%2BjRnji36FUnKr264NA2zjK69umRXIZT63jPPIGRJVRzvfrcRGYPlbhaObtWZ%2B%2B4PCGyjk6xYlVOaWGrkxmlmT3sqhxbi7FVe3tHUopFj08N6RrB0DaYqFMZnVWfPQkh%2FwswADxQcGa1aV29AAAAAElFTkSuQmCC';

GM_addStyle(''
+'#GB_overlay {'
+'  background-image: url('+gb_overlay+');'
+'  position: fixed;'
+'  margin: auto;'
+'  top: 0;'
+'  left: 0;'
+'  z-index: 8000;'
+'  width:  100%;'
+'  height: 100%;'
//+'  display: none;';
+'	font-size:10px;'
+'	text-decoration:none;'
+'	text-underline-style:none;'
+'	color:#000000;'
+'	display:none;'
+'}'
+'#GB_window div, #GB_window span, #GB_window applet, #GB_window object, #GB_window iframe, #GB_window h1,'
+'#GB_window h2, #GB_window h3, #GB_window h4, #GB_window h5, #GB_window h6, #GB_window p, #GB_window blockquote,'
+'#GB_window pre, #GB_window a, #GB_window abbr, #GB_window acronym, #GB_window address, #GB_window big,'
+'#GB_window cite, #GB_window code, #GB_window del, #GB_window dfn, #GB_window em, #GB_window font, #GB_window img,'
+'#GB_window ins, #GB_window kbd, #GB_window q, #GB_window s, #GB_window samp, #GB_window small, #GB_window strike,'
+'#GB_window strong, #GB_window sub, #GB_window sup, #GB_window tt, #GB_window var, #GB_window dl, #GB_window dt,'
+'#GB_window dd, #GB_window ol, #GB_window ul, #GB_window li, #GB_window fieldset, #GB_window form, #GB_window label,'
+'#GB_window legend, #GB_window table, #GB_window caption, #GB_window tbody, #GB_window tfoot, #GB_window thead,'
+'#GB_window tr, #GB_window th, #GB_window td, #GB_window fieldset, #GB_window input, #GB_window p {'
+'	margin:0; padding:0; border:0; outline:0; font-size:12px; font-weight:normal; font-style:none;'
+'	font-family:helvetica, verdana, sans-serif; text-align:left; vertical-align:baseline; text-decoration:none;'
+'	float:none; style-list-type:none; background:#FFF; background-color:#FFF; color:#000;'
+'	position:relative; overflow:visible; width:auto; height:auto;'
+'	text-decoration:none; text-underline-style:none; outline:none;'
//font-size:100%;
+'}'
+'#GB_window :focus { outline:0; }'
//+'#GB_window body { line-height:1; color:black; background:white; }'
+'#GB_window ol, #GB_window ul { list-style:none; }'
+'#GB_window table { border-collapse:separate; border-spacing:0; }'
+'#GB_window caption, #GB_window th, #GB_window td { text-align:left; font-weight:normal; }'
+'#GB_window blockquote:before, #GB_window blockquote:after, #GB_window q:before, #GB_window q:after { content: ""; }'
+'#GB_window blockquote, #GB_window q { quotes: "" ""; }'
+'#GB_window {'
+'  top: 20px;'
+'  position: fixed;'
+'  background: #FFF;'
+'  border: 5px solid #AAA;'
+'  -moz-border-radius: 8px;'
+'  overflow: auto;'
+'  width: 550px;'
+'  min-height: 150px;'
//+'	max-height: 300px;'
+'  z-index: 8050;'
+'	display:none;'
//+'	top: '+((winH/2)-200)+'px;'
//+'	left: '+((winW/2)-275)+'px;'
//+'	font-size:1em;'
+'}'
+'#GB_window input {'
//+'	border:1px solid #000;'
//+'	border:auto;'
+'	background-color:#EEE;'
+'	line-height:auto;'
+'	border: 2px #ffffff inset;'
+'}'
+'#GB_window #GB_caption {'
//+'  font: 14px bold helvetica, verdana, sans-serif;'
+'	font-size: 14px;'
+'  color: #FFF;'
+'	background:#888888;'
+'  padding: 2px 0 2px 5px;'
+'	margin:0;'
+'  text-align: left;'
+'}'
+'#GB_window #GB_caption span {'
+'	line-height:16px;'
+'	font-size:14px;'
//+'	font-size:14px'
+'	background:#888888;'
+'	font-weight:bold;'
+'	color:#FFF;'
+'}'
+'#GB_window img.close {'
+'  position: absolute;'
+'  top: 2px;'
+'  right: 5px;'
+'  cursor: pointer;'
+'  cursor: hand;'
+'}'
//#GB_body 
+'#GB_window #GB_body {'
//+'  font-size: 1.0em;'
+'  padding: 5px;'
//+'  display:none;'
//+'  font: 1em normal helvetica, verdana, sans-serif;'
+'	color:#000000;'
//+'	background:#000;'
+'	text-align:left;'
+'}'
//#GB_body 
+'#GB_window a:link, #GB_window a:visited, #GB_window a:active {'
//+'#GB_window #GB_body a:link, #GB_window #GB_body a:visited, #GB_window #GB_body a:active {'
+'  color:#000;'
//+'  text-decoration:underline;'
+'}'
//#GB_body 
+'#GB_window a:hover {'
+'  color:#556992;'
//+'  text-decoration:none;'
+'}'
+'');

//=======================
//jQuery noConflict
//=======================
var $ljq = jQuery.noConflict();

var GB_DONE = false;
var GB_HEIGHT = 100;
var GB_WIDTH = 550;

function GB_show(caption, body, height, width) {
	//var winW = window.innerWidth;
	//winH = window.innerHeight;
	//var newW = (winW/2)-275;
	//style='left:"+newW+"px'
  
	GB_HEIGHT = height || 100;
	GB_WIDTH = width || 550;
	if(!GB_DONE) {
		$ljq("#GB_initialize").html("<div id='GB_overlay'></div><div id='GB_window'>\n<div id='GB_caption'>"+caption+"</div>\n"
			+ "<img class='close' src='"+gb_close+"' alt='Close window'/>\n<div id='GB_body'>\n"+body+"\n</div></div>");
		$ljq("#GB_window img").click(GB_hide);
		$ljq("#GB_overlay").click(GB_hide);
		$ljq(window).bind("resize", function() {
			GB_position();
		});
	GB_DONE = true;
	}
  
	$ljq(document).bind('keydown.facebox', function(e) {
	if (e.keyCode == 27) {
		GB_hide();
	}
	return true;
	});

	$ljq("#GB_initialize").show();
  
	$ljq("#GB_overlay").show();
	GB_position();

	$ljq("#GB_window").show();
}

function GB_hide() {
	$ljq("#GB_initialize").html('');
	$ljq("#GB_window,#GB_overlay,#GB_initialize").hide();
	//GM_log('unbind!');
	$ljq(window).unbind();
}

function GB_position() {
	//GM_log('resized!');
	var de = document.documentElement;
	var w = self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	//$ljq("#GB_window").css({width:GB_WIDTH+"px",height:GB_HEIGHT+"px",
	//left: ((w - GB_WIDTH)/2)+"px" });
	$ljq("#GB_window").css({left: ((w - GB_WIDTH)/2)+"px" });
	//$ljq("#GB_frame").css("height",GB_HEIGHT - 32 +"px");
}

//Vars used throughout script
var ZZid = '';
var pattern = '';
var matches = '';
//var Pagebase = '';
//var Pageid = '';
var	running_version = '';
var	latest_version = '';
var hash = '';
var siteuri = '';
var trackers = '';
var title = '';

//Debugging
//GM_setValue('lastCheck', 0);
//GM_setValue('lastVersion', 0);
var lastCheck = GM_getValue('lastCheck', 0);
var lastVersion = GM_getValue('lastVersion', 0);
//alert(lastCheck+" "+lastVersion);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
var name = "";
var ver = "";
var notes = "";

function updateCheck() {
	GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://userscripts.org/scripts/source/'+scriptId+'.meta.js',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
    onload: function(responseDetails) {
    var text = responseDetails.responseText;
    //alert(text);
    
	pattern = /(@name(\t+|\s+)?(.*)(\r|\n)?)/ig;
	matches = text.match(pattern);
	//alert(matches[0].replace(pattern, "$3"));
	name = matches[0].replace(pattern, "$3");
	
    pattern = /(@version(\t+|\s+)?(.*)(\r|\n)?)/ig;
	matches = text.match(pattern);
	//alert(matches);
	//alert(matches[0].replace(pattern, "$3"));
	ver = matches[0].replace(pattern, "$3");
	ver = $ljq.trim(ver);
	
	pattern = /(@notes(\t+|\s+)?(.*)(\r|\n)?)/ig;
	matches = text.match(pattern);
	//alert(matches[0].replace(pattern, "$3"));
	notes = matches[0].replace(pattern, "$3");
	
	running_version = parseVersionString(scriptVersion);
	latest_version = parseVersionString(ver);
	//alert(running_version.major+'.'+running_version.minor+'.'+running_version.patch+' '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
	
	var showupdatealert = false;
	//alert(running_version.major+'.'+running_version.minor+'.'+running_version.patch+' '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
	if (running_version.major < latest_version.major) {
	    // A major new update is available!
	    showupdatealert = true;
	    //alert("Major update");
	} else if (running_version.minor < latest_version.minor) {
	    // A new minor update is available.
	    if (running_version.major <= latest_version.major) {
	    	showupdatealert = true;
	    	//alert("Minor update");
	    }
	} else if (running_version.patch < latest_version.patch){
	    // A new patch update is available.
	    if (running_version.major <= latest_version.major) {
	    	if (running_version.minor <= latest_version.minor) {
	    		showupdatealert = true;
	    		//alert("Patch update");
	    	}
	    }
	}

    if (showupdatealert) {
		showupdatealert = false;
		lastVersion = parseVersionString(lastVersion.toString());
		//alert(lastVersion.major+'.'+lastVersion.minor+'.'+lastVersion.patch+' '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
		if (lastVersion.major < latest_version.major) {
		    // A major new update is available!
		    showupdatealert = true;
		    //alert("Major update");
		} else if (lastVersion.minor < latest_version.minor) {
		    // A new minor update is available.
		    if (lastVersion.major <= latest_version.major) {
		    	showupdatealert = true;
		    	//alert("Minor update");
		    }
		} else if (lastVersion.patch < latest_version.patch){
		    // A new patch update is available.
		    if (lastVersion.major <= latest_version.major) {
		    	if (lastVersion.minor <= latest_version.minor) {
		    		showupdatealert = true;
		    		//alert("Patch update");
		    	}
		    }
		}
		
		if (showupdatealert) {
			//Show update alert and info
			//alert("alertUpdate");
			//Old method auto show update overlay
			alertUpdate(scriptId, name, ver, notes);
			//$ljq("#gmmnu_menu .menubar #update_icon a").removeClass('update_grey').addClass('update').attr("title", "Update to v"+ver);
		} else {
			//Dont check for 24 hours
			//alert("lastCheck");
			GM_setValue('lastCheck', currentTime);
		}
	} else {
		//Dont check for 24 hours
		//alert("lastCheck");
		GM_setValue('lastCheck', currentTime);
	}
	
	if (debugUpdate == true) {
		alertUpdate(scriptId, name, ver, notes);
	}
	
    } //onload
	});
}

function alertUpdate(scriptId, name, ver, notes) {
	GB_DONE = false;
	//running_version = parseVersionString(scriptVersion);
	//latest_version = parseVersionString(ver);
	
	var text = '<div style="margin:0 auto; text-align:center; font-size:13px;">There is an update available for &quot;'+scriptName+'&quot;</div>';
	text += '<div style="clear:both; margin-bottom:10px;"></div>';

	text += '<div style="margin:0 auto; text-align:center;"><strong style="font-size: 14px; font-weight:bold;">Upgrade to the Latest</strong></div>';
	text += '<div style="clear:both; margin-bottom:5px;"></div>';
	
	// vertical-align:middle;
	text += '<div style="width:170px; height:75px; line-height:75px; margin:0 auto;">';
	//text += '<span style="height:69px; line-height:69px; margin-top:-20px;">-></span>';
	//text += '<div style="position:relative; float:left; width:50px; height:50px; line-height:50px; background-color:#eee; border: 2px solid #aaa; -moz-border-radius: 5px; vertical-align:middle;">';
		text += '<div style="position:relative; float:left; width:65px; height:75px; line-height:75px; background-image: url(\''+update_grey+'\'); background-repeat:no-repeat; background-position: top left; vertical-align:middle; text-align:center">';
			text += '<div style="margin-top:-5px; margin-left:17px; background:none; font-size:13px;">'+running_version.major+'.'+running_version.minor+'.'+running_version.patch+'</div>';
			//text +=	'<div>'+running_version.major+'.'+running_version.minor+'.'+running_version.patch+'</div>';
			//text +=	'<div style="float:left; background:none;">'+running_version.major+'.'+running_version.minor+'.'+running_version.patch+'</div>';
		text += '</div>';
		//text += '<div style="float:left;">x</div>';
		text += '<div style="position:relative; float:right; width:65px; height:75px; line-height:75px; background-image: url(\''+update_green+'\'); background-repeat:no-repeat; background-position: top left; vertical-align:middle;">';
			text += '<div style="margin-top:-5px; margin-left:17px; background:none; font-size:13px;">'+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch+'</div>';
		text += '</div>';
	text += '</div>';
	//text += '';
	text += '<div style="clear:both;"></div>';
	
	text += '<div style="width:150px; margin:0 auto; line-height:30px; vertical-align:middle;">';
		text += '<div style="position:relative; float:left; width:50px; vertical-align:middle;">';
			text += '<div style="margin-top:-10px; margin-left:-2px; font-size: 13px;">Installed</div>';
		text += '</div>';
		text += '<div style="position:relative; float:right; width:55px; vertical-align:middle;">';
			text += '<div style="margin-top:-10px; margin-left:5px; color: #198835; font-size: 13px;">Available</div>';
		text += '</div>';
	text += '</div>';
	//text += '<hr/><br/>';
	text += '<div style="clear:both; height:1px; background-color:#000000; margin-top:5px; margin-bottom:5px;"></div>';
	
	//-moz-border-radius: 5px;
	//text += '<div style="min-width:20px; height:20px; line-height:20px; background-color:#00FF00; border:1px solid #00FF00; -moz-border-radius: 5px;">';
	text += '<div style="margin:0 auto; text-align:center;">';
	text += '<strong style="font-size: 14px; font-weight:bold;">What would you like to do?</strong>';
	text += '</div>';
	//text += '</div>';
	//text += '<br/>';
	text += '<div style="clear:both; margin-bottom:5px;"></div>';
	text += '<div style="width:330px; margin:0 auto; vertical-align:middle;">';
	text += '<div style="position:relative; float:left; width:160px; vertical-align:middle; text-align:right; display: block; line-height: 22px;">';
		text += '<a href="http://userscripts.org/scripts/show/'+scriptId+'" title="http://userscripts.org/scripts/show/'+scriptId+'" style="font-size: 13px; color:#0000EE; border-bottom:1px dashed #AAA;">Go to Script Homepage</a>';
	text += '</div>';
	//text += '<br/>';
	text += '<div style="position:relative; float:right; width:160px; vertical-align:middle; text-align:left; display: block; line-height: 22px;">';
		text += '<a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js" style="color: #198835; border-bottom:1px dashed #AAA; font-size: 13px;">Upgrade to '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch+' now</a>';
	text += '</div>';
	//text += '<div style="clear:both;></div>';
	text += '<br/>';
	text += '<div style="position:relative; float:left; width:160px; vertical-align:middle; text-align:right; display: block; line-height: 22px;">';
		text += '<a href="#" id="gb_update_wait" style="font-size: 13px; color:#0000EE; border-bottom:1px dashed #AAA;">Remind me tomorrow</a>';
	text += '</div>';
	//text += '<br/>';
	text += '<div style="position:relative; float:right; width:160px; vertical-align:middle; text-align:left; display: block; line-height: 22px;">';
		text += '<a href="#" id="gb_update_waitnextversion" style="font-size: 13px; color:#0000EE; border-bottom:1px dashed #AAA;">Skip this version</a>';
	text += '</div>';
	text += '</div>';
	//text += '<br/>';
	text += '<div style="clear:both; margin-bottom:2px;"></div>';
	text += '<div style="clear:both; height:1px; background-color:#000000; margin-top:5px; margin-bottom:5px;"></div>';
	
	text += '<div style="margin:0 auto; text-align:center;">';
	text += '<strong style="font-size: 14px; font-weight:bold;">Update Notes</strong>';
	text += '</div>';
	text += '<div style="clear:both; margin-bottom:5px;"></div>';
	text += '<div style="text-align:left; font-size: 12px; line-height:16px;">';
	text += notes.replace(/\\/g, '');
	text += '</div>';
	
	//$ljq("#GB_body").html(ver+'<br/>'+id+'<br/>'+name+'<br/>'+notes+'<br/>'+ver+'<br/>'+id+'<br/>'+name+'<br/>'+notes+'<br/><br/><br/>'+ver+'<br/>'+id+'<br/>'+name+'<br/>'+notes+'<br/>');
	//$ljq("#GB_body").html(text);

	var t = '<span style="font-weight:bold;">Update Alert!</span> - '+scriptName;
	//name
    //GB_show(t,u,600,600);
    GB_show(t,text,0,550);
    //return false;    
    //alert(latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
}

$ljq(document).ready(function(){
	//alert(document.title);
	//alert("ljq");
	
	//Append the greasebox to the body of the site
	$ljq(document.body).append("<div id='GB_initialize'></div>");
	//$ljq("#gmmnu_config").show();
	//showError();
	
	if ($ljq("div[class='article-audioplayer clearfix'] script").length > 0) {
		pattern = "";
		matches = "";
		//alert("exists");
		//alert($ljq("div[class='article-audioplayer clearfix'] script").html());
		var audiolink = $ljq("div[class='article-audioplayer clearfix'] script").html();
		audiolink = audiolink.replace(/\"/ig, "").replace(/ /ig, "").replace(/'/ig, "").replace(/,+/ig, ",");
		//alert(audiolink);
		pattern = /(.*,(.*\.mp3))/ig;
		matches = audiolink.match(pattern);
		//alert(matches[0].replace(pattern, "$2"));
		audiolink = matches[0].replace(pattern, "$2");
		audiolink = "<a href=\""+audiolink+"\" title=\"Download mp3\" style=\"background-image:url('"+icon_media+"'); width: 80px; background-position: -111px 0px;\">Download mp3</a>";
		//alert(audiolink);
		//$ljq("p[class='downloadlink'], p[class='downloadlink'] a").css("display", "inline");
		$ljq("p[class='downloadlink']").prepend(audiolink);
	}
	//embed_audio("/audio/xspf/103951/", '103951', 620, "", "", 'http://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab/radiolab121410.mp3', "", 39);

	if (debugSettings == true) {
		showConfiguration();
	}
	
	$ljq('#gb_update_wait').live('click', function(event) {
		event.preventDefault();
		//alert(lastCheck);
		GM_setValue('lastCheck', currentTime);
		GB_hide();
	});
	
	$ljq('#gb_update_waitnextversion').live('click', function(event) {
		event.preventDefault();
		//return false;
		//alert(latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
		GM_setValue('lastVersion', latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
		GM_setValue('lastCheck', currentTime);
		GB_hide();
	});
	
	//alert("LOADED");
	//alert($ljq);
	//alert(lastCheck);
	//alert(debugUpdate);
	if (currentTime > (lastCheck + 86400) || debugUpdate == true) { // 43200 12 hours // 86400 24 hours after last check
		//alert("updateCheck");
		updateCheck();
	}
	
});

/*==================
// End of script
==================*/

//
// Notes
//   Created base64 images via (make sure to check base64 checkbox)
//     http://software.hixie.ch/utilities/cgi/data/data
//  The original (un-modified) update-notification script was made by Seifer
//    You can find the original at http://userscripts.org/scripts/show/12193
//    This custom version has been nearly rewritten by Daem0nX
//  Using a modified version of Greybox Redux
//    Required: http://jquery.com/
//    Written by: John Resig
//    Based on code by: 4mir Salihefendic (http://amix.dk)
//    License: LGPL (read more in LGPL.txt)
//

//
// ChangeLog
// 2011-01-03 - 0.1.0
//  Initial release.
//  Adds the Download button back to the site.
//
