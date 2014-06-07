// ==UserScript==
// @name		eRepublik zh-TW
// @namespace		edited by CW
// @description		eRepublik 繁體中文版 Ver 11.0323.0018
// @version		Ver 11.0323.0018
// @include		http://*.erepublik.com/*
// @exclude     http://wiki.erepublik.com/*
// @exclude     http://forum.erepublik.com/*
// @require		http://bsm.oldtu.com/updater.php?id=88438

// ==/UserScript==
/*
原作者：jiqimaono2
繁中化：acedia0915、josesun
翻譯更新整理：藍色小鼠BSM
PTT ID：bybsm
eRepublik Name : sakobsm

最後更新時間：上午 12:18 2011/3/23

隨著eRepublik 10月份的改版
新增國家、地區，還有很多模組的改良與新增..導致舊有的翻譯已經不適用...
就將原有的翻譯重新整理一次並新增加改版後部分的翻譯...

*/

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

//var $ = unsafeWindow.jQuery;

var strings = {
//標準格式"" : "",

//_/_/_/_/_/_/_/
//　尚未分類　_/
//_/_/_/_/_/_/_/

//戰場
	"Republic of China (Taiwan) Campaigns":"中華民國(台灣)的戰役",
	"Republic of China (Taiwan) is not involved in any active battles.":"沒有任何中華民國(台灣)可參與的戰役。",
	"See other campaigns":"看其他戰役",
	"Enemy Defeated":"擊敗敵人",
	"War influence":"戰爭影響",
	"Rank points":"軍階點數",
	"Add influence":"繼續戰鬥",
	"Total influence":"總計影響",
	"No weapon":"沒有武器",
	"Battlefield":"戰場",
	//"Battleground":"戰場",//D1065好像拿掉了?
	"Battles I can fight in":"我可以參與的戰役",
	"Battles I can Fight in":"我可以參與的戰役",
	"Battle statistics":"戰役統計",
	"Overall results":"總計結果",
	"View battle stats":"查看戰役統計",
	"Kills":"擊倒",
	"Congratulations, your rank is now":"恭喜您的軍階提升到",
	"Rank Bonus on attack":"軍階的攻擊獎勵",
	"Free health refill":"恢復全部體力",
	"Health refill needed":"需要恢復體力",
//其他
	"Experience":"經驗值",
	"Guest":"訪客",
	"Search citizen":"搜尋公民",
	"No citizens found that match your criteria.":"找不到相符的公民。",
	"Good job! You are on the way to a Hardworker Medal. Please prove you are human." : "做的好！您正邁向「模範員工」獎章之路。請先證明您確實是人類。",
	"Good job! Please prove you are human.":"做的好！請輸入驗證碼證明您確實是人類。",//有跑出這驗證 會出現錯誤呢...
	"Continue":"繼續",
//_/_/_/_/_/_/_/
//　遊戲首頁　_/(核對完成)
//_/_/_/_/_/_/_/
	"Ambient on/off":"背景 on/off",
	"active citizens today":"位活躍的公民",
	"Welcome to the New World" : "歡迎來到這個新世界",
	"Enter the new world" : "進入遊戲",
	"Citizen name" : "公民名稱",
	"Password" : "密碼",
	"Forgot password?" : "忘記密碼?",
	"Become a citizen" : "成為新公民",
	"Remember me" : "記住我",
	"Top countries in eRepublik" : "eRepublik 熱門國家排行榜",
	"top countries in eRepublik" : "查看 eRepublik 國家排行榜",
	"citizens":"公民",
	"What others are saying about eRepublik":"關於eRepublik看其他人怎麼說",

//_/_/_/_/_/_/_/
//　底下連結　_/
//_/_/_/_/_/_/_/
	"Forum" : "遊戲論壇",
	"Wiki" : "遊戲百科",
	"Blog" : "官方部落格",
	"Press": "新聞發佈",
	"Contact": "聯絡資訊",
	"Jobs": "工作機會",
	"Terms of Service": "服務條款",
	"Privacy": "隱私政策",
	"Affiliates":"合作夥伴",
	"eRepublik Laws": "遊戲規則",

//_/_/_/_/_/_/_/
//　登入頁面　_/
//_/_/_/_/_/_/_/
	"Login":"登入",
	"Please type in your citizen name":"請輸入您的公民名稱",
	"Wrong citizen name":"公民名稱錯誤",
	"Please type in your password":"請輸入您的密碼",
	"Wrong password":"密碼錯誤",
	"Complete the catpcha challenge:":"請輸入驗證碼:",
	"Take the tour" : "遊戲預覽",
	"Join now" : "現在加入",
	"It's free" : "完全免費",

//_/_/_/_/_/_/_/
//　創立帳戶　_/
//_/_/_/_/_/_/_/
	"Create your citizen":"創建您的公民",
	"Location":"地點",
	"Select a country":"請選擇一個國家",
	"Select a region":"請選擇一個地區",
	"Next":"下一頁",
	"or register using Facebook Connect":"",//直接鬼隱
	"Welcome to the New World! I'm Carla, your eRepublik advisor. Let's get acquainted, then I'll show you around.":"歡迎來到新世界！我是卡拉，您eRepublik的顧問。讓我們彼此認識，我會帶您四處看看。", //重新整理就會正常 怪事了...
	"Email address":"電子郵件地址",	
	//底下都未確認
	"Email validation":"電子郵件認證",
	"An email with your passport has been sent to":"一封內含您的護照的電子郵件已被送往",
	"Check your email":"檢查您的電子郵件",
	"Reward:":"獎勵:",
	"Not the right address? Change it now.":"不是正確的地址？現在就來更改。",
	"Resend email":"重新寄送",
	//認證完成後
	"Congratulations!":"恭喜!",
	"Start playing":"開始進行遊戲",
//_/_/_/_/_/_/_/
//　遊戲MAIN　_/
//_/_/_/_/_/_/_/
	"Advertise here":"在此刊登廣告",
	"yesterday" : "昨天",
	"Logout" : "登出",
//日常任務Daily tasks
	"Daily tasks":"日常任務",
	"Work":"工作",
	"Train":"訓練",
	"Get reward":"獲得獎勵",
	"Completed!":"完成了!",
	"work skill":"工作技能",
	"strength":"力量",//Day1081更改
	"experience points":"經驗值",
//最新事件Latest Events	//（似乎不適用?）
	"National" : "國內事件",
	"International" : "國際新聞",	//改成新聞
	"one hour ago" : "一個小時前",
	"more events" : "更多事件",
	"Place your Congress candidature" : "接受議員競選登記",
	"Party Presidents choose final Congress candidates today" : "今日為黨主席選擇議員候選人的最終期限",
	"Congress election day. Vote for your favorite!" : "議員選舉日，投下您神聖的一票！",
	//以下未確認
	"Party election day. Vote for your favorite!" : "黨主席選舉日，快投下您神聖的一票！",
	"The proposal for a new welcoming message for new citizens was rejected." : "修改給新公民的歡迎訊息的提案已否決。",
	"The president impeachment proposal has been rejected" : "總統彈劾案已否決",
	"The campaign goals of the presidential candidates are now final" : "總統候選人已提出政見及國家目標",
	"A new citizen fee was proposed" : "已提案修改新公民費",
//Military campaigns
	"Allies' Campaigns":"盟國的戰役",
	"Victory":"勝利",
	"More military campaigns":"更多的戰役",
	"Campaign of the day":"重要戰役",
//新聞News
	"Top" : "熱門",
	"Latest" : "最新",
	"more news" : "更多新聞",
//留言Feeds
"Comment":"回應",
"Previous comments":"看之前的回應",
"Older posts":"顯示稍早的留言",
//_/_/_/_/_/_/_/
//　角色概況　_/
//_/_/_/_/_/_/_/
	"No shouts posted by this citizen yet":"這個公民還沒有張貼任何留言",//失效?
	"Dead citizen":"此人已死，有事燒紙",
	"Permanently banned":"被永久禁止",
	"Location:":"所在地點:",
	"(change)":"(變更)",
	"Citizenship:":"國籍:",
	"eRepublik birthday":"eRepublik的生日",
	"National rank:":"國家排名:",
	"Activity":"相關活動",
	"Unemployed":"失業中",
	"No economical activity" : "沒有工作或公司", //感謝BillWilson補充
	"No Military Unit":"沒有所屬軍事組織",
	"Military Unit Member":"軍事組織成員",
	"No political activity":"沒有參與政黨",
	"Party Member":"政黨成員",
	"No media activity":"沒有媒體活動",
	"Create newspaper":"建立一份報紙",
	"Press director":"報社社長",
	"Forfeit points:": "違規點數:",
	"view all":"查看全部",
//選單
	"Overview":"公民概況",
	"Accounts":"資金戶頭",
	"Storage":"倉庫",
	"edit profile":"修改資料",
//公民概況Overview
	"Health":"體力",
	"Experience level":"經驗等級",
	"About me":"About me（關於我）",
	"Achievements":"Achievements（成就）",
	"Level":"等級",
	"Military Skills":"軍事技能",
	"Strength":"力量",//Day1081新增
	"Super soldier:":"超級大兵:",//Day1081新增
	"Military rank":"軍階",
	//"Rank points:":"經驗值",//Day1081移除，不確定其他地方是否有用到
	"Skill":"技能",//Day1081移除，不確定其他地方是否有用到
	"Progress":"進展",
//更改資料edit profile
	"Edit Profile":"修改資料",
	"Your description":"您的自我簡介",
	"Citizen Avatar" : "公民頭像",
	"only":"只有",
	"pictures allowed" : "格式圖片允許上傳",
	"Your birthday" : "出生日期",
	"Your email here" : "電子郵件",
	"Email must be valid for registration, so do not cheat" : "此Email地址用於註冊遊戲帳號，所以必須真實有效。",
	"Your password":"您的密碼",
	"Enter your current password in order to change your profile settings":"要輸入當前的密碼，才能修改您的資料",
	"Change password" : "修改密碼",
	"Make changes":"更改資料",
	"You have succesfully edited your profile":"您已成功編輯您的個人資料",
//修改密碼
	"Current password":"當前密碼",
	"Please type your old password":"請輸入舊的密碼",
	"New password":"新的密碼",
	"New password again":"重新輸入新的密碼",
//更改居住地點
	"Change residence":"更改居住地",
	//"You will not be able to change residence outside the country as long as you are a member of the Congress.":"作為一個國會議員，您將不能夠移居到國外。",
	//"You will not be able to change residence outside the country while being an employee.":"作為一個僱員，您將不能夠移居到國外。",
	//"You will not be able to change residence outside the country while being a party member.":"作為一個政黨成員，您將不能夠移居到國外。",
	"Current location" : "當前位置",
	"New location":"新的位置",
	"Do you wish to apply for citizenship in your new country?":"您是否需要申請入籍到新的國家？",
	"Apply for citizenship":"同意入籍",
	"No, thanks":"不需要",
//土地
	"Visit":"訪問",
	"Enter":"進入",
//成就
	"Hard Worker":"模範員工",
	"Work for 30 days in a row" : "連續工作30天",
	"Worked 30 days in a row" : "連續工作30天",
	"Congress Member" : "國會議員",
	"Win the Congress elections": "贏得國會選舉",
	"Won the Congress elections":"贏得國會選舉",
	"Country President" : "國家元首",
	"Win the Presidential elections": "贏得總統大選",
	"Media Mogul" : "媒體大亨",
	"Reach 1000 subscribers to your newspaper": "訂閱您報紙的讀者達到 1000 人",
	"Battle Hero" : "戰鬥英雄",
	"Reach the highest war influence in a battle": "在一場戰鬥中達到最高的戰爭影響",
	"Reached the highest war influence in a battle": "在一場戰鬥中達到最高的戰爭影響",
	"Campaign hero":"戰爭英雄",
	"Reach the highest war influence in a campaign":"在一場戰役中達到最高的戰爭影響",
	"Resistance Hero" : "抗戰英雄",
	"Start a resistance war and liberate that region": "發動一場起義戰爭並成功解放該地區",
	"Super Soldier" : "超級大兵",
	"Advance 250 strength points": "累計達到250點力量點數",
	"Society Builder" : "社交巨擘",
	"Invite 10 people to eRepublik and help them reach level 10": "邀請 10 人加入 eRepublik 並且幫助他們達到 Lv10",
	"Invited 10 people to eRepublik and helped them reach level 10":"邀請 10 人加入 eRepublik 並且幫助他們達到 Lv10",
//捐贈
	"Items":"物品",
	"Drag and drop items from your inventory to the donation area":"從您的物品欄位拖移物品到捐贈欄位內",
	"Your inventory":"您的物品欄位",
	"Donation":"捐贈欄位",
	"Donate items":"捐贈物品",
//物品倉庫
	"Edit inventory":"整理物品",
	"Save inventory":"確定",
	"Cancel":"取消",
//============================================================================

//_/_/_/_/_/_/_/
//　遊戲選單　_/Day1175大改
//_/_/_/_/_/_/_/

//"未分類
	"Company" : "公司",
	"Training grounds":"訓練場",
	"Newspaper" : "報紙",
//	"Organization":"組織",
//	"Chat rooms":"聊天室",//看報紙會跑出來= ="
//	"Advertising Agency":"刊登廣告",//被Citizen Ads給替換?
	"Citizen Ads":"刊登廣告",
	"Country stats" : "國家資料",
	"Wars list" : "戰爭列表",
	"Laws":"法規",
//Day1175修正後-----------------------
//Market
	"Market":"市場",
	"Marketplace" : " 交易市場",
	"Monetary market" : "外匯市場",
	"Job market" : "就業市場",
	"Companies for sale" : "公司轉讓",
		
//Community	
	"World Map":"世界地圖",
	"News":"新聞",
	"My Party" : "我的政黨",
	"Elections" : "選舉",
	"Military Unit":"軍事組織",
	"Rankings" : "遊戲排行",
	"Country administration" : "國家管理",
	"Invite friends" : "邀請朋友",
	"My Organizations" : "我的組織",
	"Badges":"圖樣",
//	"Tools":"工具",//戰爭畫面會跑出來=..=

        
//============================================================================
//_/_/_/_/_/_/_/
//　我的土地　_/
//_/_/_/_/_/_/_/
"Buy Land":"購買土地",
"New land":"新的土地",
"Cost:":"費用:",
"Not enough local currency!":"沒有足夠的當地貨幣!",
"Expand":"擴展",
//_/_/_/_/_/_/_/
//　倉庫畫面　_/
//_/_/_/_/_/_/_/
"Final products":"產品",
"Resources":"原料",
"post new offer":"張貼新的報價",
"from marketplace":"從市場買進",
"Price / unit":"價格 / 單位",
"Set offer":"販賣",
//_/_/_/_/_/_/_/
//　公司畫面　_/
//_/_/_/_/_/_/_/

//work
	"Choose a booster":"選擇一種提升效率的方法",//D1065好像被改了?只是舊畫面還是會有顯示
	"Choose an action to boost your Economy skill and Productivity":"選擇一種提升效率的方法來提高您的工作技能和生產力",//D1065新增的字串
	"Single Espr...":"來一杯咖啡",
	"Double Espr...":"兩倍濃度咖啡",
	"Brainstorm ...":"一同腦力激盪",
	"After work ...":"下班後的派對",
	"Choose 2 invited friends to boost your Economy skill and Productivity":"選擇2個朋友來幫助您提高工作技能和生產力",//D1065新增的字串
	"Start working":"開始工作",
	"Please choose a booster":"請選擇一種提高效率的方法",
	"You have already worked today. Come back tomorrow.":"今天您已經工作過了。請明天再來吧。",
	"Resign":"辭職",
	"Salary:":"薪水:",
	"View work results":"查看工作成果",
	"Where do you want to go next?":"接下來您要去哪裡?",
//Workday results
	"Workday results":"工作一日的成果",

	"Today's salary":"今天的薪水",
	"You are working as manager, no salary is needed.":"總經理工作不需要薪資",//D1150新增的字串
	"Salary details":"工資細節",//D1106新增的字串
	"Gross salary":"工資總額",//D1106更改的字串

	"Economy Skill":"工作技能",
	"Economy skill details":"工作技能細節",//D1106新增的字串
	"skill points":"技能點",

	"Productivity:":"生產力:",
	"Productivity details":"生產力細節",
	"Work booster":"提升工作的效率",
	"Friend bonus":"朋友協助的效率",//D1065新增的字串
	"Citizenship bonus":"總經理同國籍獎勵",
	"Resource bonus":"資源地獎勵",

	"You worked":"您已經連續工作",
	"days in a row.":"天。",
	"day in a row.":"天。",
	"You need to work":"您需要再工作",
	"more days to receive your 'Hard Worker' Medal":"天就可以獲得'模範員工'的成就。",
	"Congratulations, you’ve been promoted to":"恭喜您，您已經晉升到",
//建立公司
	"The company will be located in":"該公司將設在",
	", your citizenship country":"，您的國籍國。",
	"Funding fee":"手續費",
	"Free Land":"空地",
	"Not Passed":"未通過",
	"Passed":"已通過",
	"Industry":"產業",
	"Company Identity":"公司資料",
	"Company name":"公司名稱",
	"6-30 characters max":"6-30個字元",
	"Company logo":"公司LOGO",
	"Upload picture":"上傳圖像",
	"Create company":"創建公司",
//公司詳細資料
	"Raw materials":"原料",
	"This data is confidential.":"這個數據是機密。",
	"Your company":"員工數量",
	"Recommended":"推薦值",
	"Having a number of employees higher than the recommended value can result in reduced productivity.":"擁有的員工數高於推薦值會導致生產力下降。",
	"employees":"員工",
	"Show Employees":"查看僱員",
	"Market offers":"市場提供",
	"Price with taxes":"價格與稅收",
	"The company offers no products in this market":"該公司的產品沒有在市場供應。",
	"The company cannot trade with this country due to a trading embargo.":"由於貿易禁運，該公司不能與這國家貿易。",
//員工詳細
	"Employee":"僱員",
	"Productivity":"生產力",
	"Offers":"提供",    //可能會跟其他地方有衝突
	"link":"連結",
//Manage employees
	"Manage employees":"員工管理",
	"Units produced:":"做成單位:",
	"Worker state":"工作狀態",
	"Mo":"一","Tu":"二","We":"三","Th":"四","Fr":"五","Sa":"六","Su":"日", 
	"This company has no job offers at the moment":"這間公司目前沒有工作職缺。",
//_/_/_/_/_/_/_/
//　訓練畫面　_/
//_/_/_/_/_/_/_/
//Training grounds
	"Start training":"開始訓練",
	"You have already trained today":"您今天已經訓練過了",
	"Improve your Strength level:":"提高您的力量等級:",//Day1081該死的無頭雞更新
	"Your current Strength level:":"您現在的力量等級:",
//	"Select skill to enhance:":"選擇要加強的技能:",	//Day1081移除
	"Choose an action to boost your strength":"選擇一種提升效率的方法來提高您的力量等級",//D1081更新的字串
	"Choose 2 invited friends to boost your strength":"選擇2個朋友來幫助您提高力量等級",//D1081更新的字串
	"View train results":"查看訓練成果",
	"Train results":"訓練成果",
	"Strength:":"力量:",
	"Training details":"訓練細節",
	"Basic training":"基礎訓練",
	"Train booster":"提升訓練的效率",
	"Friends bonus":"朋友協助的效率",
	"Natural enemy bonus":"世仇獎勵",
	"Please select a booster.":"請選擇一種提升效率的方法。",

//_/_/_/_/_/_/_/
//　政　　黨　_/
//_/_/_/_/_/_/_/
//My places > Party
	"Report party":"檢舉政黨",
	"You are not a member of a party" : "您目前並非政黨成員",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "您可以從政黨頁面加入某一政黨，如果您找不到適合您的政黨，您也可以自己建立一個政黨。成為政黨成員可以使您有機會成為議員，甚至總統。",
	"Join a party" : "加入政黨",
	"Name":"名字",
//信息
	"Info":"信息",
	"Members"  : "成員",
	"Orientation" : "傾向",
	"Join party" : "加入政黨",
	"Show all members":"顯示所有成員",
//帳戶
	"Donate Gold":"捐贈黃金",
	"Show all donations":"顯示所有捐贈",
	"All donations":"所有捐贈",
//選舉
	"Party presidency":"黨主席",
	"Party President":"黨主席",
	"Congress":"國會",
	"congress members":"國會議員",
	"of Congress":"國會席次",
	"Next elections in" : "距離下次選舉：",
	"one day":"1 天",
	"Election day":"選舉日",
	"Vote":"投票",
	"Show candidate list" : "顯示候選人名單",
	"Show proposed members":"顯示議員候選人名單","of congress":"",
	"Edit presentation":"編輯政見",
	"Resign candidacy":"放棄參選",
	"Country presidency":"國家元首",
	"Show candidates list" : "顯示候選人名單",
	"Our next candidate" : "下屆選舉候選人",
	"no goals selected":"沒有選擇政見",
//創立政黨
	"Party details" : "政黨訊息",
	"Party name" : "政黨名稱",
	"Economical orientation" : "經濟傾向性",
	"Choose economical orientation":"請選擇經濟傾向性",
	"Far-left" : "極左派",
	"Center-left" : "中間偏左派",
	"Center" : "中間派",
	"Center-right" : "中間偏右派",
	"Far-right" : "極右派",
	"Social orientation" : "社會傾向性",
	"Choose social orientation":"請選擇社會傾向性",
	"Totalitarian" : "極權主義",
	"Authoritarian" : "獨裁主義",
	"Libertarian" : "自由意志主義",
	"Anarchist" : "無政府主義",
	"Party logo" : "政黨標誌",
	"Disscusion area" : "討論網址",
	"Create":"建立",
//國會議員候選人
	"Party Page":"回政黨畫面",
	"Congress member candidates":"國會議員候選人",
	"Party members can apply for congressional candidature each month between the 16th and 23rd.":" 黨員可以在每月的16日和23日之間申請參選國會議員。",
	"Party president can modify the final list only on the 24th of each month":" 黨主席只有在每月24日可以修改最終的名單。",
	"Choose region":"選擇地區",
	"No presentation":"沒有任何介紹",
	"Presentation":"介紹",
//總統候選人
	"Edit campaign goals":"編輯國家目標",
	"Reset campaign":"重置",
	"Add Goal":"增加政見",
	"Activate campaign":"提出",
	"Back to Party":"回到政黨",
	"Goal type":"政見類型",
	"Mission":"任務",
	//"Ammount":"數值", 衝突了
	"Edit":"修改",
//黨主席
	"Edit party details":"修改政黨資料",
	"Resign party presidency":"辭去黨主席職務",
	"Propose candidate":"候選人提名",
	"Run for presidency":"競選總統",
	"Click the Update button to save the changes":"點擊更新按鈕保存更改",
	"Update":"更新",
	"Replace":"替換",
//加入政黨後
	"Congratulations, you are now a party member!":"恭喜您，成為黨員",
	"Candidate":"登記成為候選人",
	"Run for congress":"競選國會議員",
	"Run for Congress":"競選國會議員",
	"Edit  the link to your presentation where you explain why citizens should vote for you in the Congress elections":"編輯連結到您的政見演說文稿，解釋給公民們說為什麼要在國會議員選舉中投您一票",
	"Provide a link to your presentation where you explain why citizens should vote for you in the congressional elections":"替您的政見演說給一個連結，解釋給公民們說為什麼要在國會議員選舉中投您一票",
	"link to an external web address or a":"可連結到外部網站地址或是",
	"private forum":"私人論壇",
	"Agree":"同意",
	"Cancel":"取消",
//_/_/_/_/_/_/_/
//　報　　紙　_/
//_/_/_/_/_/_/_/
//My places > Newspaper
	"You do not have a newspaper" : "您尚未開辦報紙",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "一份報紙是在 eRepublik 的世界中溝通聯絡訊息的最有效途徑。想瞭解更多相關訊息請閱讀 eRepublik 百科。建立您自己的報紙。",
    //開辦報紙
	"Newspaper details" : "報紙訊息",
	"Newspaper name" : "報紙名稱",
	"6-25 characters max":"6-25個字元",
	"Newspaper Avatar" : "報紙標誌",
	"only JPG files allowed":"只允許*.JPG格式",
	//閱讀報紙
	"today":"今天",
	"Subscribe":"訂閱",
	"Unsubscribe":"取消訂閱",
	"ShareThis" : "分享此篇文章",
	"Report article":"檢舉文章",
	"Report comments":"檢舉評論",
	"Subscribe to comments" : "訂閱此評論",
	"Your comment" : "您的評論",
	"Post a comment" : "發佈評論",

//管理報紙
"You do not have any articles, if you want to write an article you should enter here:":"您沒有任何文章，如果您想寫一篇文章，您應該在此處輸入:",
"Write article":"寫文章",
"Edit newspaper details":"編輯報紙詳細",
	//寫文章
"Title":"標題",
"Article":"文章內容",
"Publish":"發表",
	//編輯報紙詳細
"Description":"描述",
"Change the location of your newspaper":"改變您的報紙的位置",
"Newspaper logo":"報紙標誌",
//_/_/_/_/_/_/_/
//　組　　織　_/
//_/_/_/_/_/_/_/
//My places > Organizations
//	"My Organizations" : "我的組織",
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "為了登錄組織帳號，您必須先退出您的公民帳號，然後用您的組織帳號和密碼重新登錄。",
	"Organizations created by you:" : "您建立的組織:",
	"You have not created any organization yet." : "您尚未建立任何組織.",
//建立頁面
	"Your account":"您的帳戶",
	"Requirements" : "需求",
	"Cost" : "費用",
	"Organization details" : "組織訊息",
	"Organization name" : "組織名稱",
	"4-30 characters max":"4-30個字元",
	"Your email address:" : " 您的Email地址:",
	"Retype password":"重新輸入密碼",
	"Please select a country":"請選擇國家",
	"eRepublik region" : "選擇地區",
	"Organization logo" : "組織標誌",
	"Complete the challenge:":"請輸入驗證碼:",
	"Register":"註冊",
//修改資料
	"Your managers (":"您的管理人 (",
	"Add managers":"增加管理人",
	"Organization Avatar":"組織的圖像",
//_/_/_/_/_/_/_/
//　國家管理　_/
//_/_/_/_/_/_/_/
//管理
	"Hello, Congress Member":"您好，國會議員",
	"You are not a president or a congress member in this country.":"您不是該國的總統或是議員。",
	"Law proposals" : "法律提案",
	//提案內容
	"Propose a law":"提出一個法案",
	"Minimum wage":"最低工資",
	"President Impeachment":"彈劾總統",
	"Provide citizenship":"入籍審查",
	"details" : "詳情",
	"Accepted" : "已通過",
	"Rejected" : "己否決",
	"Pending" : "未決定",
    //法條
	"Country Administration":"國家管理",
//議員提案
	"Debate location (optional)":"辯論區位置(選填)",
	"Propose":"提案",
	"Ammount":"金額",
	"Set new":"設定新的",
	"Choose industry":"選擇產業",
	"Value Added Tax":"增值稅",
//_/_/_/_/_/_/_/
//　廣告代理　_/
//_/_/_/_/_/_/_/
	"1. Create your ad":"1. 建立您的廣告",
	"Easily create your ad - no design or coding skills needed.":"輕鬆創建您的廣告 - 不用設計或編碼所需的技能。",
	"Include both graphical and text-based content, all within a live preview.":"包括圖形和文字內容，全部都可即時預覽。",
	"Easily edit the content of your ad to increase results.":"輕鬆編輯您的廣告內容，以增加效果。",
	"2. Target your ad":"2. 定位您的廣告",
	"Target by type of location and/or citizen.":"選擇服務對象類別的位置/或公民",
	"Choose to display your ad in the entire New World or within a very specific country or region.":"選擇顯示您的廣告在整個新的世界或在特定的國家或地區。",
	"Choose to display your ad to all citizens of the New World or to a very specific group of citizens - from regular employees to congressmen.":"選擇向新世界所有公民或一個非常特定群體的公民顯示您的廣告 - 從正式員工到國會議員均可。",
	"3. Budget your ad":"3. 您的廣告預算",
	"Use your citizen's Gold account, as well as your company or party's accounts.":"用您的公民的黃金帳戶，也可以是您的公司或黨的帳戶。",
	"View real time statistics regarding impressions, budget spent and clicks":"查看即時統計有關的資料，預算支出和點擊",
	"Fund your decisions on increasing or decreasing budget.":"決定增加或減少預算的基金。",
	"Create an ad":"建立廣告",
//建立頁面
	"Create your ad":"建立您的廣告",
	"Live preview":"即時預覽",
	"Will refresh when content is added.":"隨時更新廣告的預覽畫面",
	"You may only advertise content located on erepublik.com.":"您只能在eRepublik.com宣傳您的廣告內容。",
	"Language:":"語言:",
	"Only citizens using eRepublik in this language will be viewing this ad":"只有選擇該語言的eRepublik公民才看的到這個廣告",
	"Title:":"標題:",
	"Content:":"內容:",
	"Picture:":"圖片:",
	"Upload photo":"上傳圖像",
	"Link:":"連結:",
	"Only internal eRepublik links are allowed":"只允許eRepublik內部的鏈接",
	"Target your ad":"定位您的廣告",

//============================================================================

//_/_/_/_/_/_/_/
//　交易市場　_/
//_/_/_/_/_/_/_/
	"Durability":"耐久度",
	"Fire Power":"火力",
	"Fire power":"火力",
	"Moving Distance":"移動距離",
	"Select product":"選擇產品",
	"Select quality":"選擇品質",
	"There are no market offers matching you search.":"市場沒有提供符合您搜尋的產品。",
	"Cancel":"取消",
	"Change":"更改",
	"Product":"產品",
	"Provider":"供應商",
	"Stock":"庫存",
	"Price":"價格",
	"Quantity":"數量",
	"Buy":"購買",

//_/_/_/_/_/_/_/
//　外匯市場　_/
//_/_/_/_/_/_/_/
	"Sell":"販賣",
	"Show my offers" : "顯示我的報價",
	"Show all offers" : "顯示全部的報價",
	"Post new offer" : "張貼新的報價",
	"Rec exchange rate" : "參考匯率",
	"Amount":"金額",
	"Exchange rate":"匯率",    
	"Amount to buy":"購買金額",
	"Prev":"上一頁",
	"Get Gold" : "購買黃金",

//_/_/_/_/_/_/_/
//　就業市場　_/
//_/_/_/_/_/_/_/
	"Skill level":"技能等級",
	"Sorry, there are no jobs available at the moment that match your search criteria!":"對不起，沒有符合您搜尋的工作條件。",
	"Daily salary":"日薪",
	"Apply":"同意",
    //同意後
	"Congratulations, you are now working for this company.":"恭喜您，您現在可以在這家公司工作了。",

//_/_/_/_/_/_/_/
//　公司轉讓　_/
//_/_/_/_/_/_/_/
	"Product details":"產業詳情",
	"There are no companies for sale matching you search.":"您搜尋的產業沒有公司要出售。",
	"You can not buy a company from another country.":"您不可以從別的國家購買公司。",
//============================================================================

//_/_/_/_/_/_/_/
//　遊戲排行　_/
//_/_/_/_/_/_/_/

//公民
//公司
	"Companies":"公司",
	"Sort by" : "排序",
	"No. of Employees" : "員工人數",
	"Select industry":"選擇產業",
	"All industries":"所有產業",
//報紙
	"Newspapers" : "報紙",
	"Subscribers" : "訂閱讀者",
//國家
	"Countries":"國家",
	"Experience points":"經驗值",
	"( Average Experience )":"(平均經驗)",
	"Population number" : "人口數量",
//政黨
	"Parties" : "政黨",
//_/_/_/_/_/_/_/
//　國家資料　_/
//_/_/_/_/_/_/_/
	"Select":"選擇",
	"Donate" : "捐贈",
	"On the Map":"查看地圖",
//選單
	"National Goals" : "國家目標",
	"Society":"社會",
	"Economy":"經濟",
	"Politics":"政治",
	"Military":"軍事",
	"Administration":"管理",
//國家目標
	"Current national goals" : "當前的國家目標",
	"The elected president has not set any national goals for this month." : "總統並未設置本月的國家目標。",
	"check current status":"檢查當前狀態",
	"At least one national goal needs to be achieved each month in order to receive a monument.":"每月至少有一個國家需要實現的目標，以獲得一個紀念碑。",
	"Monuments achieved":"紀念碑",
//社會
	"National Chat Room" : "國家聊天室",
	"Join":"加入",
	"Citizens":"公民",
	"Total citizens" : "公民總數",
	"New citizens today" : "今日新公民",
	"Citizenship requests":"國籍申請",//感謝BillWilson補充
	"View requests":"查看狀態",
	"Average citizen level" : "平均公民等級",
	"Online now": "正在線上",
	"Who" : "看有誰",
	"Citizen fee" : "公民費",
    //查看線上玩家
    	"Region":"地區",
    	"All regions":"所有地區",
    //地區詳細
    	"Country - Society":"國家 - 社會",
    	"Population":"人口",
    	"Constructions":"建設",
    	"Resource":"資源",
    	"Resistance War" : "起義戰爭",
    	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "您不能在這個地區發動起義戰爭，該地區已屬於其原有的國家。",
    	"Neighbors" : "鄰近國家",
    //新移民
    	"Approved":"已核准",
    	"There are no pending citizenship applications.":"目前尚無未決定的入籍移民申請。",
    	"Citizen":"公民",
    	"Details":"詳情",
    	"Citizenship passes":"入籍審查",
    	"Accept":"批准",
    	"Resident since:":"申請日:",
		"Expires:":"到期日:",
    	"Approved on":"批准時間",
    	"Approved by":"批准人",
//經濟
	"Resource list":"資源列表",
	"Regions":"產地",
	"Not available":"無",
	"Treasury":"國庫",
	"All accounts":"所有帳戶",
	"Taxes":"稅率",
	"Income Tax":"所得稅",
	"Import Tax":"進口稅",
	"VAT":"增值稅",
	"Country trading embargoes":"國家貿易禁運",
	"This country can trade with any other country in eRepublik.":"這個國家可以在eRepublik與任何一個國家貿易。",
	"Salary":"薪資",
	"Minimum":"最低",
	"Average":"平均",
	"Gross domestic product (GDP)":"國內生產總值（GDP）",
	"Monthly exports":"每月出口",
	"Monthly imports":"每月進口",
	"Inflation":"通貨膨脹",
//政治
	"President":"總統",
	"Election results":"選舉結果",
	"Next elections":"下屆選舉",
//軍事
	"Natural enemy":"世仇",
	"The citizens of this country will be provided with a +10% war influence bonus in the military campaigns against the Natural Enemy.":"對上世仇的戰役，這個國家的公民可獲得一個+10％戰爭影響的獎勵。",
	"No current Natural Enemy":"目前沒有設定世仇",
	"This country is not involved in any war.":"這個國家沒有參與任何戰爭。",
	"All wars" : "所有戰爭",
	"There are no resistance wars in this country." : "這個國家沒有任何起義戰爭。",
	"All resistance wars" : "所有起義戰爭",
	"Alliances":"盟國",
	"All Alliances" : "所有盟國",
//中華民國
"Active wars in Republic of China (Taiwan)":"中華民國(台灣)可參與的戰爭",
"Active resistance wars in Republic of China (Taiwan)":"中華民國(台灣)的起義戰爭",
//_/_/_/_/_/_/_/
//　戰爭列表　_/
//_/_/_/_/_/_/_/
	"War types":"戰爭類型",
	"Conquest wars":"征服戰爭",
	"Resistance wars":"起義戰爭",
	"War status" : "戰況",
	"Active wars" : "進行中的戰爭",
	"Ended wars" : "已結束的戰爭",
	"Countries involved" : "參與的國家",
	"no allies" : "沒有盟國",
	"no active battles" : "無進行中的戰役",

//_/_/_/_/_/_/_/
//　世界地圖　_/
//_/_/_/_/_/_/_/
	"Go to eRepublik":"回到eRepublik",

//============================================================================

//_/_/_/_/_/_/_/
//　邀請朋友　_/
//_/_/_/_/_/_/_/
	"status":"狀態",
	"of the friends you invited.":"。",
	"Your personal invitation link":"您的個人邀請連結",
	"Post this link on forums, blogs, messenger status or send it by yourself via email.":"將此連結張貼到論壇、BLOG、MSN狀態列，或是自行用電子郵件來散發。",
	"Send via :":"發送透過:",
	"Invites status":"邀請的狀況",
	"View the status of your invites and bonuses":"查看您邀請的狀況跟獎金",
	"Track invites":"追蹤邀請",
	"Send email invite":"發送電子郵件邀請",
	"You are allowed to create and administrate ONLY one eRepublik citizen.":"您只能註冊與管理一個eRepublik公民。",
	"Breaking this rule you will face the risk of having all your citizen accounts suspended.":"違反此規定，您將面臨您所有的公民帳戶都被停權的風險。",
	"Your name:":"您的名字:",
	"Import your contacts:":"邀請您的聯絡人:",
	"Invitations left:":"邀請函:",
	"Invite your friends and get 10% of all Gold they will receive in eRepublik from Treasure Maps and purchases.":"",
	"Facebook invite":"從Facebook邀請",

//_/_/_/_/_/_/_/
//　選　　舉　_/
//_/_/_/_/_/_/_/
	"Election":"選舉",
	"Presidential elections" : "總統選舉",
	"Congressional elections" : "議員選舉",
	"Party elections" : "黨主席選舉",
	"Official Results":"正式結果",
	"Goals":"政見",
	"Total votes:":"總票數:",
	"Presence:":"投票率:",
	"No information available":"沒有相關訊息",
	"Month/Year":"月份/年",
	//進行投票
	"Select a party":"選擇一個政黨",
	"to show it's candidates":"顯示他的候選人",
	//總統候選人
	"Supporting parties":"支持的政黨",
	
//_/_/_/_/_/_/_/
//　新　　聞　_/
//_/_/_/_/_/_/_/
	"Top rated news" : "熱門新聞",
	"Latest news" : "最新新聞",
	"Latest events" : "最新事件",
		
//_/_/_/_/_/_/_/
//　圖　　樣　_/
//_/_/_/_/_/_/_/
	"Invite your friends and get 10% of all Gold they will receive in eRepublik from Treasure Maps and purchases by adding a badge to your e-mail signature, website, blog and more! It’s easy:":"使用電子郵件、網站或Blog來邀請您的朋友並獲得從朋友得到獎章的黃金獎勵、或是儲值黃金的10%回饋！這很容易的：",
	"1. Pick your favorite badge":"1. 挑選自己喜歡的圖樣。",
	"2. Copy the code from the box next to it. Use Ctrl + C if you’re on a PC, Cmd + C if you’re on a Mac.":"2. 從Box內複製原始碼，若是PC用戶可使用Ctrl + C來複製，若是Mac用戶可使用Cmd + C複製。",
	"3. Paste the code anywhere you want your badge to appear.":"3. 在您想出現圖樣的地方貼上原始碼。",

//_/_/_/_/_/_/_/
//　法　　規　_/
//_/_/_/_/_/_/_/
	"New eRepublik Laws":"新的 eRepublik 法規",
	"Dear citizen of the New world, here are the eRepublik Laws. Breaking in any way these rules will result in immediate fearsome penalties that can range from forgotten secret bronze age torture techniques to permanent bans.":"親愛的新世界公民，這裡有eRepublik的相關規定。以任何方式打破這些規則將導致可怕的懲罰。",//(GOOGLE翻譯真的很難解...)
	"Thou shall not contaminate the New World with filth such as External advertising, Spam,Insults, Pornography, Vulgarity or Racism.":"禁止發表任何有關外部廣告、垃圾郵件，或者侮辱、色情、粗俗或種族歧視等言論。",
	"Thou shall not obtain any properties or gains through illegal means such as cheating, betting, bugs or exploits.":"您不得通過非法手段獲取任何不當利益，如欺詐、賭博、錯誤或漏洞。",
	"Thou shall not create or administrate multiple accounts.":"您無法創建或管理多個帳號。",
	"Read more in the":"閱讀更多的","eRepublik Enciclopedy":"eRepublik法規",
	"Read more about":"閱讀更多關於","penalties":"懲罰","laws":"法規",
	"eRepublik Penalties":"eRepublik 的懲罰",
//============================================================================

//_/_/_/_/_/_/_/
//　購買黃金　_/
//_/_/_/_/_/_/_/
	"Gold":"黃金",
	"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to buy additional features within eRepublik." : " eRepublik中的黃金為遊戲中的虛擬貨幣，僅用於購買eRepublik中的額外功能。",
	"Select amount" : "選擇數量",
	"Payments can be made in US Dollar as well." : "亦可用美元支付.",
	"Select payment option":"選擇付款方式",
	"Please choose a payment option":"請選擇付款方式",
	"is a fictional currency used only in the eRepublik World." : "為虛擬貨幣，只能在 eRepublik 遊戲世界中使用。", 
	"Buy now" : "立即購買",

//_/_/_/_/_/_/_/
//　儲存空間　_/
//_/_/_/_/_/_/_/
	"Extra Storage": "額外儲存空間",

//_/_/_/_/_/_/_/
//　藏寶地圖　_/
//_/_/_/_/_/_/_/
	"Treasure" : "藏寶","Maps":"地圖",
	"no maps" : "沒有藏寶圖",
	"Use a Treasure Map":"使用藏寶圖",
	"Use the Treasure Map":"使用藏寶圖",
	"Centuries ago, citizens buried their Gold for safekeeping, using Treasure Maps to mark the treasure site. If you have a map use it wisely and you may keep whatever you find. If you are extremely lucky you could even unearth part of the legendary Treasure of Kings." : "好幾個世紀以前，公民們為了安全起見會將黃金埋藏在某個地方，並畫出藏寶圖來標示埋藏地點。若您擁有藏寶圖而又夠聰明，那麼您發現的寶藏將可據為己有。如果您夠幸運，甚至可以挖到一部分傳說中的國王寶藏。",
	"within 30 days they become unreadable." : "經過 30 天後就再也無法閱讀。",
	"Treasure Maps are awarded for:" : "完成下列成就能獲得藏寶圖：",
	"Gaining an achievement":"取得的成就",

//_/_/_/_/_/_/_/
//　黃金獎勵　_/
//_/_/_/_/_/_/_/
	"Track your gold bonus":"關注您的黃金獎勵",
	"Each Gold Bonus needs to be collected within 30 days or you will lose it. We recommend you collect the Gold at least twice per month.":"每個黃金獎勵，需要在30天之內收集，否則您將失去它。我們建議您每月至少收集黃金兩次。",
	"Collected Gold":"收集到的黃金",
	"Invite your friends":"邀請更多的朋友",
	"Invite more friends and boost your chances to get more Gold!":"提升您獲得黃金的機會",
//_/_/_/_/_/_/_/
//　體力恢復　_/
//_/_/_/_/_/_/_/
	"Health:":"體力:",

//============================================================================

//_/_/_/_/_/_/_/
//　系統訊息　_/
//_/_/_/_/_/_/_/
//Inbox
	"Inbox":"收件匣",
	"Select all":"選擇全部",
	"Delete":"刪除",

//Sent
	"Sent":"寄件匣",
	"Subject":"主旨",
	"Message":"訊息內容",
	"Send":"傳送",
	"No messages found.":"沒有發現郵件",

//Alerts 系統提示
	"Alerts":"系統提示",
	"Select All":"選擇全部",
	"After 5 days the alerts are automatically deleted":"訊息在5天後會自動刪除",
	"Gold Treasure Map":"黃金藏寶圖",
	"donations list":"捐贈列表",

//Subscriptions 報紙訂閱
	"Subscriptions":"報紙訂閱",
	"new article" : "新文章",
	"Weekly news":"每週新聞",
	"Weekly mail presenting the top rated news, active wars, military events and top five countries in eRepublik":"每週郵報提供eRepublik最精彩的新聞，包括主動戰爭，軍事事件和前五位的國家",
	"show example":"顯示範例",
	"Turn ON":"開啟",
	"Turn OFF":"關閉",
	"Newer":"較新",
	"Older":"較舊",
//_/_/_/_/_/_/_/
//　新手任務　_/
//_/_/_/_/_/_/_/
	"Hint:":"提示:",
	"Reward":"獎勵",
//_/_/_/_/_/_/_/
//　國　　會　_/
//_/_/_/_/_/_/_/
//法律提案
	"ACCEPTED":"已通過",
	"REJECTED":"已否決",
	"The law voting process takes 24 hours.":"該法的投票過程需要24小時。",
	"Yes":"贊成",
	"No":"反對",
	"Only congress members and country presidents have the right to vote.":"只有國會議員和總統才有投票權。",
	"For this law to be considered accepted it needs 66% of the Congress votes.":"對於這個法案，需要超過66%的議員投票同意才可通過。",
	"Show all law proposals":"顯示所有法律提案",
	//補充
	"Value added tax (VAT)" : "增值稅 (VAT)",
	"New":"新",
	"Old":"舊",
	"Attention: No VAT tax for raw materials":"注意：沒有增值稅稅款為原料",
	"Debate Area":"辯論區",
		
//_/_/_/_/_/_/_/
//　法案主題　_/
//_/_/_/_/_/_/_/
	"Buy Constructions":"購買建設",
	"Peace Proposal":"和平協議",
	"Natural Enemy":"世仇",
	"Alliance" : "結盟",
	"New Citizen Message":"新公民信息",
	"New Citizen Fee" : "新公民費",
	"New citizen fee":"新公民費",
	"Issue Money":"發行貨幣",
	"Minimum Wage" : "最低工資",
	"Tax change: Food":"更改稅率: 食物",
	"Tax change: Moving Tickets":"更改稅率: 機票",
	"Tax change: Weapons":"更改稅率: 武器",
	"Tax change: House":"更改稅率: 房屋",
	"Tax change: Defense System":"更改稅率: 防禦系統",
	"Tax change: Hospital":"更改稅率: 醫院",
	"Tax change: Stone":"更改稅率: 石材",
	"Tax change: Oil":"更改稅率: 石油",
	"Tax change: Grain":"更改稅率: 穀物",
	"Tax change: Iron":"更改稅率: 鋼鐵",

//_/_/_/_/_/_/_/
//　公司管理　_/
//_/_/_/_/_/_/_/
"Your companies":"您的公司",
"Migrate industry":"變更產業",
"work as Manager":"以總經理身份工作",//D1150新增
"work as employee":"以員工身份工作",
"resign":"辭職",
"view work results":"查看工作成果",//D1150新增
"view results":"查看工作成果",
"Transfer to citizen":"轉移到公民",
"Manager's citizenship bonus":"總經理的國籍獎勵",
"Owner":"負責人",
"New owner":"新負責人",
"Transfer company":"轉移公司",
"New industry":"新行業",
"Check resources":"查看資源",
"Productivity bonus:":"生產力獎勵:",
"Raw material bonus":"原料獎勵",
"Edit details":"編輯詳情",
"Company description":"公司介紹",
"Sell company":"公司轉讓",
"Company profile":"公司資料",
"Finances":"財政",
"Buy raw materials":"購買原料",
"View storage":"查看倉庫",
"Manage":"管理",
"Sell products here":"在這裡出售產品",
"Buy market license":"購買市場許可證",
//轉移
"Transfers":"轉移",
"Your accounts":"您的帳戶",
"Company accounts":"公司的帳戶",
"Invest":"投資",
"Collect":"收益",

//員工管理
"This company has no employees at the moment":"這家公司目前沒有僱員",
"Add a job offer":"增加工作職缺",
"Select skill":"選擇技能等級",
"Save":"儲存",

//_/_/_/_/_/_/_/
//　ＰＩＮ碼　_/
//_/_/_/_/_/_/_/
"Generate pin code":"產生PIN碼",
"Generate security PIN":"產生PIN安全密碼",
"In order to ensure a better and safer experience in the New World, we have implemented a new security measure: Personal Security PIN. First, please enter your password below, so that you can generate your security PIN..":"為了確保一個更美好、更安全的經驗，在新的世界，我們已經實施了新的安全措施：個人安全密碼。首先，請在下面輸入您登入遊戲的密碼，這樣就可以生成您的ＰＩＮ安全密碼..",
"Generate PIN":"產生PIN碼",
"Your account security is very important! Please go to your":"您的資金帳戶是很重要的！請到",
"profile":"專頁",
"and generate your security PIN for a better protection of your account details.":"產生您的ＰＩＮ安全密碼好保護您的資金帳戶。",
"Please insert your Personal Security PIN":"請輸入您的PIN個人安全密碼",
"Unlock":"解鎖",
//_/_/_/_/_/_/_/
//　階　　級　_/
//_/_/_/_/_/_/_/

//工作	感謝PTT_RJJ、josesun提供部分修正
	"Apprentice":"學徒",
	"Assistant":"助理",
	"Junior":"新進",
	"Senior":"資深",
	"Coordinator":"主管",
	"Specialist":"行家",
	"Expert":"專家",
	"Master":"達人",
	"Guru":"大師",
	"Guru*":"大師*",
	"Guru**":"大師**",
	"Guru***":"大師***",
//派別
	"Center, Libertarian":"中間派, 自由意志主義",
	"Far-left, Anarchist":"極左派, 無政府主義",
	"Far-left, Libertarian":"極左派, 自由意志主義",
	"Center-right, Libertarian":"中間偏右派, 自由意志主義",
//_/_/_/_/_/_/_/
//　月　　份　_/
//_/_/_/_/_/_/_/
	"Month":"月份",
	"January":"一月",
	"February":"二月",
	"March":"三月",
	"April":"四月",
	"May":"五月",
	"June":"六月",
	"July":"七月",
	"August":"八月",
	"September":"九月",
	"October":"十月",
	"November":"十一月",
	"December":"十二月",

	"Jan":"一月",
	"Feb":"二月",
	"Mar":"三月",
	"Apr":"四月",
	"May":"五月",
	"Jun":"六月",
	"Jul":"七月",
	"Aug":"八月",
	"Sep":"九月",
	"Oct":"十月",
	"Nov":"十一月",
	"Dec":"十二月",

//_/_/_/_/_/_/_/
//　類　　別　_/
//_/_/_/_/_/_/_/
	"Food":"食物",
	"Moving Tickets" : "機票",
	"Weapons":"武器",
	"House":"房屋",
	"Defense System" : "防禦系統",
	"Hospital" : "醫院",
	"Stone":"石材",
	"Oil":"石油",
	"Grain" : "穀物",
	"Iron":"鋼鐵",
//_/_/_/_/_/_/_/
//　產　　物　_/
//_/_/_/_/_/_/_/
	"Fish":"魚",
	"Rubber":"橡膠",
//	"Grain" : "穀物",
	"Fruits":"水果",
	"Cattle":"牛",
	"Deer":"鹿",
//  "Iron":"鋼鐵",
	"Saltpeter":"硝",
	"Aluminum":"鋁",
		
//_/_/_/_/_/_/_/
//　國家名稱　_/
//_/_/_/_/_/_/_/
	"All countries" : "所有國家",
	"Country":"國家",
	"World":"世界",
	"Argentina" : "阿根廷",
	"Australia" : "澳大利亞",
	"Austria" : "奧地利",
	"Belarus":"白俄羅斯",
	"Belgium":"比利時",
	"Bolivia":"玻利維亞",
	"Bosnia and Herzegovina" : "波士尼亞與赫塞哥維納",
	"Brazil" : "巴西",
	"Bulgaria" : "保加利亞",
	"Canada" : "加拿大",
	"Chile" : "智利",
	"China" : "中國",
	"Colombia" : "哥倫比亞",
	"Croatia" : "克羅埃西亞",
	"Cyprus" : "賽普勒斯",
	"Czech Republic" : "捷克共和國",
	"Denmark" : "丹麥",
	"Estonia" : "愛沙尼亞",
	"Finland" : "芬蘭",
	"France" : "法國",
	"Germany" : "德國",
	"Greece" : "希臘",
	"Hungary" : "匈牙利",
	"India" : "印度",
	"Indonesia" : "印尼",
	"Iran" : "伊朗",
	"Ireland" : "愛爾蘭",
	"Israel" : "以色列",
	"Italy" : "義大利",
	"Japan" : "日本",
	"Latvia" : "拉脫維亞",
	"Lithuania" : "立陶宛",
	"Malaysia" : "馬來西亞",
	"Mexico" : "墨西哥",
	"Montenegro" : "蒙特內哥羅",//又名黑山?
	"Netherlands" : "荷蘭",
	"New Zealand" : "紐西蘭",
	"North Korea" : "北韓",
	"Norway" : "挪威",
	"Pakistan" : "巴基斯坦",
	"Paraguay" : "巴拉圭",
	"Peru" : "秘魯",
	"Philippines" : "菲律賓",
	"Poland" : "波蘭",
	"Portugal" : "葡萄牙",
	"Republic of China (Taiwan)" : "中華民國(台灣)",
	"Republic of Macedonia (FYROM)":"馬其頓共和國",
	"Republic of Moldova":"摩爾多瓦共和國",
	"Romania" : "羅馬尼亞",
	"Russia" : "俄羅斯",
	"Serbia" : "塞爾維亞",
	"Singapore" : "新加坡",
	"Slovakia" : "斯洛伐克",
	"Slovenia" : "斯洛維尼亞",
	"South Africa" : "南非",
	"South Korea" : "南韓",
	"Spain" : "西班牙",
	"Sweden" : "瑞典",
	"Switzerland" : "瑞士",
	"Thailand" : "泰國",
	"Turkey":"土耳其",
	"USA" : "美國",
	"Ukraine" : "烏克蘭",
	"United Kingdom" : "英國",
	"Uruguay" : "烏拉圭",
	"Venezuela" : "委內瑞拉",
	//新國家
	"Egypt":"埃及",
	"Saudi Arabia":"沙烏地阿拉伯",
	"United Arab Emirates":"阿拉伯聯合大公國",
//_/_/_/_/_/_/_/
//　地區名稱　_/
//_/_/_/_/_/_/_/

//阿根廷
	"Pampas" : "潘帕斯",
	"Argentine Northwest" : "阿根廷西北部",
	"South East Chaco":"South East Chaco",//查無資料
	"Mesopotamia" : "美索不達米亞",
	"Cuyo" : "庫約",
	"Patagonia" : "巴塔哥尼亞",
//澳大利亞
	"New South Wales":"新南威爾士",
	"Queensland":"昆士蘭",
	"South Australia":"南澳洲",
	"Tasmania":"塔斯馬尼亞",
	"Victoria":"維多利亞",
	"Western Australia":"西澳洲",
	"Northern Territory":"北領地",
//奧地利
	"Burgenland":"布爾根蘭",
	"Carinthia":"卡林西亞",
	"Lower Austria":"下奧地利",
	"Upper Austria":"上奧地利",
	"Salzburg":"薩爾茨堡",
	"Styria":"施蒂里亞",
	"Tyrol":"蒂羅爾",
	"Vorarlberg":"福拉爾貝格",
//白俄羅斯
/*
"Brestskaya":"布雷斯特",
"Homelskaya":"Homelskaya",		//查無翻譯
"Hrodzienskaya":"Hrodzienskaya",//查無翻譯
"Minskaya":"Minskaya",			//查無翻譯
"Mahilyowskaya":"Mahilyowskaya",//查無翻譯
"Vitsebskaya":"Vitsebskaya",	//查無翻譯
*/
//比利時
	"Brussels":"布魯塞爾",
	"Flanders":"弗蘭德斯",
	"Wallonia":"瓦隆",
//玻利維亞
	"Chuquisaca and Tarija":"丘基薩卡和塔里哈",
	"Beni and Cochabamba":"貝尼和科恰班巴",
	"Santa Cruz":"聖克魯斯",
	"Bolivian Altiplano":"玻利維亞高原",
	"Pando":"潘多",
//波士尼亞與赫塞哥維納
	"West Srpska Republic":"西塞族共和",
	"East Srpska Republic":"東塞族共和",
	"Brčko District":"布爾奇科區",
	"Federation of BiH":"波黑聯邦",
//巴西
	"Center West of Brazil":"巴西市中心以西",
	"North of Brazil":"巴西北部",
	"Northeast of Brazil":"巴西東北部",
	"Southeast of Brazil":"巴西東南部",
	"Parana and Santa Catarina":"巴拉那州和聖卡塔琳娜",
	"Rio Grande do Sul":"南里奧格蘭德州",
//保加利亞
/*
Burgas
Vidin
Plovdiv
Sofia
Varna
Ruse
*/
//加拿大
/*
Ontario
Prince Edward Island
Alberta
New Brunswick
Nova Scotia
Quebec
Saskatchewan
Newfoundland and Labrador
British Columbia
Yukon
Manitoba
Northwest Territories
Nunavut
*/
	"Quebec":"魁北克",
//智利
/*
Norte Grande
Norte Chico
Zona Central
Zona Sur
Zona Austral
*/
//中國
	"Anhui":"安徽",
	"Fujian":"福建",
	"Gansu":"甘肅",
	"Guangdong":"廣東",
	"Heilongjiang":"黑龍江",
	"Hubei":"湖北",
	"Hunan":"湖南",
	"Jiangsu":"江蘇",
	"Jiangxi":"江西",
	"Liaoning":"遼寧",
	"Shaanxi":"陝西",
	"Shandong":"山東",
	"Shanxi":"山西",
	"Sichuan":"四川",
	"Yunnan":"雲南",
	"Zhejiang":"浙江",
	"Guizhou":"貴州",
	"Hainan":"海南",
	"Henan":"河南",
	"Jilin":"吉林",
	"Qinghai":"青海",
	"Guangxi":"廣西",
	"Inner Mongolia":"內蒙古",
	"Ningxia":"寧夏",
	"Xinjiang":"新疆",
	"Tibet":"西藏",
	"Beijing":"北京",
	"Chongqing":"重慶",
	"Shanghai":"上海",
//哥倫比亞
/*
Amazonica
Andina
Caribe e Insular
Orinoquia
Pacifica
Cundiboyacense
*/
//克羅埃西亞
/*
Slavonia
Central Croatia
Northwest Croatia
Lika and Gorski Kotar
Istria and Kvarner
North Dalmatia
South Dalmatia
*/
//賽普勒斯
//捷克共和國
//丹麥
//愛沙尼亞
//芬蘭
//法國
//德國
//希臘
//匈牙利
//印度
//印尼
//伊朗
//愛爾蘭
//以色列
//義大利
//日本
	"Hokkaido":"北海道",
	"Tohoku":"Tohoku",//不確定翻譯
	"Kanto":"關東",
	"Chubu":"Chubu",//不確定翻譯
	"Kinki":"近畿",
	"Chugoku":"Chugoku",//不確定翻譯
	"Shikoku":"四國",
	"Kyushu":"九州",
//拉脫維亞
//立陶宛
//馬來西亞
//墨西哥
//蒙特內哥羅
//荷蘭
//紐西蘭
//北韓
//挪威
//巴基斯坦
//巴拉圭
//秘魯
//菲律賓
//波蘭
//葡萄牙
//中華民國(台灣)
	"Northern Taiwan":"台灣北部",
	"Central Taiwan":"台灣中部",
	"Eastern Taiwan":"台灣東部",
	"Southern Taiwan":"台灣南部",
//馬其頓共和國
//摩爾多瓦共和國
//羅馬尼亞
//俄羅斯
//塞爾維亞
//新加坡
//斯洛伐克
//斯洛維尼亞
//南非
//南韓
	"Gyeonggi-do":"京畿道",
	"Gangwon-do":"江原道",
	"Chungcheongbuk-do":"忠清北道",
	"Chungcheongnam-do":"忠清南道",
	"Jeollabuk-do":"全羅北道",
	"Jeollanam-do":"全羅南道",
	"Gyeongsangbuk-do":"慶尚北道",
	"Gyeongsangnam-do":"慶尚南道",
	"Jeju":"濟州",
//西班牙
//瑞典
//瑞士
//泰國
//土耳其
//美國
	"Alabama":"阿拉巴馬州",
	"Alaska":"阿拉斯加州",
	"Arizona":"亞利桑那州",
	"Arkansas":"阿肯色州",
	"California":"加州",
	"Colorado":"科羅拉多",
	"Connecticut":"康涅狄格",
	"Delaware":"特拉華",
	"Florida":"佛羅里達",
	"Georgia":"格魯吉亞",
	"Hawaii":"夏威夷",
	"Idaho":"愛達荷州",
	"Illinois":"伊利諾伊",
	"Indiana":"印第安納",
	"Iowa":"艾奧瓦",
	"Kansas":"堪薩斯",
	"Kentucky":"肯塔基州",
	"Louisiana":"路易斯安那州",
	"Maine":"緬因州",
	"Maryland":"馬里蘭",
	"Massachusetts":"馬薩諸塞州",
	"Michigan":"密歇根",
	"Minnesota":"明尼蘇達州",
	"Mississippi":"密西西比州",
	"Missouri":"密蘇里州",
	"Montana":"蒙大拿",
	"Nebraska":"內布拉斯加",
	"Nevada":"內華達",
	"New Hampshire":"新罕布什爾州",
	"New Jersey":"新澤西州",
	"New Mexico":"新墨西哥",
	"New York":"紐約",
	"North Carolina":"北卡羅萊納州",
	"North Dakota":"北達科他州",
	"Ohio":"俄亥俄",
	"Oklahoma":"俄克拉荷馬",
	"Oregon":"俄勒岡",
	"Pennsylvania":"賓夕法尼亞州",
	"Rhode Island":"羅得島",
	"South Carolina":"南卡羅來納州",
	"South Dakota":"南達科他州",
	"Tennessee":"田納西州",
	"Texas":"德州",
	"Utah":"猶他州",
	"Vermont":"佛蒙特",
	"Virginia":"弗吉尼亞",
	"Washington":"華盛頓",
	"West Virginia":"西弗吉尼亞州",
	"Wisconsin":"威斯康星州",
	"Wyoming":"懷俄明州",
	"District of Columbia":"哥倫比亞特區",
//烏克蘭
//英國
//烏拉圭
//委內瑞拉



};//到這裡結束

//============================================================================

//_/_/_/_/_/_/_/
//　長字串區　_/
//_/_/_/_/_/_/_/
//說明：
//
var regexps = {};
//============
//未分類
regexps["Storage \\(capacity: (.*)\\)"] ="倉庫 (容量:$1)";
regexps["All national goals have been accomplished.Republic of China \\(Taiwan\\) is victorious!"] ="所有的國家目標已經完成。";
//遊戲首頁
regexps["eRepublik creates multiplayer global strategy game"] ="eRepublik創造了全球多人戰略遊戲";
regexps["eRepublik offers a real second life"] ="eRepublik真的提供了第二個人生";
regexps["eRepublik takes strategy games to the Web"] ="eRepublik是款策略網頁遊戲";
//交易市場
regexps["(\\d*) free slots"] = "剩$1個欄位";
regexps["You have succesfully bought (\\d+) product(s)? for (.*)(\\.)?$"] = "您已成功購買了 $1 個產品共花費 $3 ";
regexps["^You do not have enough money in your account.$"] = "您的帳戶沒有足夠的錢。";
//公司工作
regexps["(.*)I'm Emma, the company's secretary. You look like you will be very productive today!"] = "$1 我是艾瑪，是公司的秘書。您今天看起來感覺非常有活力！";
regexps["Basic productivity"] = "基本生產力";
//訓練
regexps["Strength level: (.*) / (.*) for the next Super Soldier Medal"] = "力量等級: $1　滿$2可獲得超級大兵的成就";
//就業市場
regexps["You already have a job at (.*)(\\.) To apply for this job you have to quit your current job."] = "您已經有一份工作在 $1 。若要申請工作，您必須放棄您目前的工作。";
//角色概況
regexps["^General Manager$"] = "總經理";
regexps["^Friends\\((\\d*)\\)"] = "好友 ($1)";

//國家目標
regexps["\\((.*) increase\\)"] = "(增加率：$1)";//人口
regexps["On day (.*) have a population of (.*) citizens"] = "在 Day $1 達到人口 $2公民數";//人口
regexps["On day (.*) have a GDP of (.*) Gold"] = "在 Day $1 達到GDP $2 黃金";//經濟
regexps["On day (.*) keep control of the following regions:"] = "在 Day $1 保持控制以下地區：";//軍事
//國家統計資料/社會
regexps["Regions \\((\\d*)\\)"] = "地區 ($1)";

regexps["Citizens"] = "公民";
//新聞
regexps["(\\d*) months ago"] = "$1 個月前";
regexps["(\\d*) days ago"] = "$1 天前";
regexps["(\\d*) hours ago"] = "$1 小時前";
regexps["(\\d*) minutes ago$"] = "$1 分鐘前";
regexps["(.*) attacked (.*),(.*). Fight for your ally \\((.*)\\)!"] = "$1 正對 $3 的 $2 發起攻擊，為您的盟國 $4 戰鬥吧！";
regexps["(.*) signed an alliance with (.*)"] = "$1 簽署了與 $2 的結盟條約";
regexps["A congress donation to (.*) was proposed"] = "國會已提案捐贈資金到 $1";
regexps["(.*) made a donation to (.*)"] = "$1 已捐贈到 $2";
regexps["New taxes for (.*) were proposed"] = "已提案變更 $1 的稅率";
regexps["Taxes for (.*) changed"] = "$1 的稅率已變更";
regexps["A money issuing of (.*) was proposed"] = "已提案發行貨幣 $1";
regexps["(.*) issued (.*)"] = "$1 已發行貨幣 $2";
//報紙
regexps["^(\\d*) comments$"] = "$1 則評論";
regexps["^Comments(.*)"] = "評論 $1";
regexps["^Trackbacks(.*)"] = "引用 $1";
//國家同盟
regexps["(\\s*)Expires in (\\d*) days"] = " $2 天後到期";
regexps["(\\s*)Expires in (\\d*) hours"] = " $2 小時後到期";
regexps["(\\s*)Expires in (\\d*) months"] = " $2 個月後到期";
//戰爭列表
regexps["(\\d*) allies"] = "$1 盟國";
regexps["(\\d+) active battle(s)?"] = "$1 進行中的戰役";
regexps["Resistance Force of (.*)"] = "$1反抗軍";
regexps["Resistance Force Of (.*)"] = "$1反抗軍";
//購買黃金
regexps["I have read and agree with the(.*)"] = "我已閱讀並接受 $1";
//公司
regexps["Employee list \\((\\d*)\\)"] = "員工列表 ($1)";
regexps["Job offers \\((\\d*)\\)"] = "工作職缺 ($1)";
//政黨
regexps["Do you agree to represent your party in the congress election in (.*)(\\?)"] = "您是否同意代表政黨去參選 $1 的議員?";
regexps["Increase population (.*)"] = "提高人口 $1";
regexps["Each party can propose a maximum number of (\\d*) candidates per region."] = " 在每個地區，每一方最多可以提出$1名候選人。",
//邀請朋友
regexps["Invite your friends and get 10% of all Gold they will receive in eRepublik from Treasure Maps and purchases. Check the"] = "邀請您的朋友並獲得朋友得到獎章的黃金獎勵、或是儲值黃金的10%回饋。查看您邀請的";
//選舉
regexps["You only have (\\d*) experience points. To access this feature you need at least 80 experience points \\(experience level 14\\)."]="您目前只有$1點經驗值，使用這功能，您至少需要達80點經驗值(等級Lv 14)。"; //不知道其他地方會不會出現類似的訊息
//法案
regexps["Proposed by"] = "提案者：";
regexps["Proposing presidential impeachment is not possible in the last (\\d*) days of the presidential mandate."] = "不可在總統任期剩最後$1天時提出彈劾總統。",
regexps["Citizen fee change from (.*) to (.*)"] = "公民費從 $1 調整到 $2 ";
regexps["Minimum wage change from (.*) to (.*)"] = "最低工資從 $1 調整到 $2 ";
regexps["Do you agree to transfer (.*) from the country accounts to (.*)\\?"] = "您是否同意從國庫轉移 $1 到 $2？";
regexps["Do you agree with the proposal to issue (.*) for (.*) GOLD\\?"] = "您是否同意以 $2 黃金發行 $1 貨幣的提案？";
regexps["(.*) has been proposed as Natural Enemy."] = "您是否同意將$1設定成為世仇？";
regexps["(.*) has declared (.*) as a Natural Enemy"] = "$1正式宣佈$2為世仇";
//黃金獎勵
if (document.location.toString().indexOf("/gold-bonus/")!=-1) {regexps["Collect(.*)Gold"] ="收集$1Gold";}
//系統訊息
if (document.location.toString().indexOf("/messages/alerts/")!=-1) {
regexps["The General Manager of"] = "";
regexps["has modified your salary from (.*) to (.*)"] = "的總經理將您的薪資從 $1 調整至 $2";
regexps["^is no longer a congress member.$"] = "不再是國會議員。";
regexps["^Good news! You just made (.*) Gold because your friend (.*) was awarded with an amount of Gold from eRepublik.$"] = "好消息！您現在可以從您的朋友 $2 那收集額外的黃金獎勵 $1 Gold。";
regexps["^Collect your Gold$"] = "請在30天內收集您的黃金獎勵";
regexps["^bonus within 30 days!$"] = "。";
regexps["^has transfered (.*) to your account.$"] = "已經轉讓了$1到您的帳戶。";
regexps["^has transfered (.*) products to your inventory. Check your$"] = "已經轉讓了$1件物品到您的倉庫。檢查您的";
}

//捐贈
//Successfuly transfered (\\d*) item(s) to (.*).
//You have successfully donated (.*) GOLD. This amount will appear shortly in the citizen/organization account.
//公司管理
regexps["^Manage accounts(.*)\\((\\d*)\\)$"] = "管理帳戶 ($2)";
//============================================================================

//_/_/_/_/_/_/_/
//　軍　　階　_/
//_/_/_/_/_/_/_/ 
//資料來自http://wiki.erepublik.com/index.php/Military_rank/%E4%B8%AD%E6%96%87%28%E7%B9%81%E9%AB%94%29
//感謝josesun提供部分修正
var mr = undefined;
if (document.location.toString().indexOf("citizen/profile")!=-1) {
regexps["Recruit"] = "二等兵";
regexps["Private"] = "一等兵";
regexps["Corporal"] = "下士";
regexps["Sergeant"] = "上士";
regexps["Lieutenant"] = "少尉";
regexps["Captain"] = "上尉";
regexps["Major"] = "少校";
regexps["Commander"] = "指揮官";
regexps["Lt Colonel"] = "中校";
regexps["Colonel"] = "上校";
regexps["General"] = "將軍";
regexps["Field Marshal"] = "元帥";
regexps["Supreme Marshal"] = "大元帥";
regexps["National Force"] = "國防軍";
regexps["World class Force"] = "國際軍";
regexps["Legendary Force"] = "精英軍";
regexps["God of War"] = "戰神";
}

//去除字串左右空白
trim = function (str) {
    str = new String(str);
	return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};


//關於match()及replace()函數的相關教學
//http://www.w3schools.com/jsref/jsref_obj_regexp.asp
//http://ops01.pixnet.net/blog/post/20990542

//更換regexps字串(最吃速度......想辦法優化orz)
matchRegexps = function(key) {
	var key = trim(key);
    key = new String(key);
	if (key===null) {
        return undefined;
    }
    
    for (var reg in regexps) {
        var rrrr = new RegExp(reg);	//var txt=new RegExp(pattern,modifiers);
        var result = key.match(rrrr);

        if (key.match(rrrr)!==null) {
            return key.replace(rrrr,regexps[reg]);	//string.replace(/\要尋找的字/g, '被取代的字');
        }
    }
    return undefined;
};


//翻譯字串("":"",) 
translateWithRegexp = function(key) {
    if (strings[key]!==undefined) {
        return strings[key];
    } else {
        var key2 = trim(key);
        if (strings[key2]!==undefined) {
        return strings[key2];
        }
    }
    return matchRegexps(key);
};


//tagName取得列表
var allTrans = {
	"span":"",
	"a":"",
	"h2":"","h3":"","h4":"","h5":"",
	"th":"","td":"",
	"p":"",
	"b":"",
	"small":"","big":"",
	"strong":"",
	"div":"",
	"label":"",
	"input":"",
	"li":"",
	"em":"",
	"option":"",
    };



//整頁翻譯
translateWholePage = function(e) {

  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      
	if ( node.tagName == "INPUT" && node.type == "submit" || node.type == "button" ||node.type == "text" )
      {
        //GM_log( node.value );查看錯誤履歷用
        var trans = translateWithRegexp(node.value);
        //GM_log( trans ); 查看錯誤履歷用
        if (trans!==undefined) {
          node.value = trans;
        }
      }
      
      else if (node.childNodes) {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }	
      } else {
		var translation = translateWithRegexp(node.innerHTML);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      }
    }
  }
}
$(function(e) {translateWholePage(e);});





//淺顯易懂的插入選單
$("li#menu5 > ul").append(
						"<li><a target=\"_blank\" href=\"http://translate.google.com.tw/#auto|zh-TW|\">Google翻譯</a></li>"+
						"<li><a target=\"_blank\" href=\"http://erepubliktw.ezdn.cc\">eRepublik中文推廣組</a></li>"+
						"<li><a target=\"_blank\" href=\"http://forum.gamer.com.tw/B.php?bsn=18823\">巴哈姆特專版</a></li>"+
						"<li><a target=\"_blank\" href=\"http://www.gamebase.com.tw/forum/30006/thread/300060030\">遊戲基地專版</a></li>"+
						"<li><a target=\"_blank\" href=\"http://erep.tw\">eROC台灣論壇</a></li>"
						//"<li><a target=\"_blank\" href=\"http://goo.gl/6WOi\">eROC webIRC</a></li>"
						);

//更改特定CSS
$("tbody").css("font-size","12px "); 
$("a.dotted").css("font-size","12px ");
//$("#menu ul li#menu2 a").css("background-image","url(\"http://i.imgur.com/PNJzt.png\")");
//$("#menu ul li#menu3 a").css("background-image","url(\"http://i.imgur.com/PNJzt.png\")");
//$("#menu ul li#menu4 a").css("background-image","url(\"http://i.imgur.com/PNJzt.png\")");
//$("#menu ul li#menu5 a").css("background-image","url(\"http://i.imgur.com/PNJzt.png\")");

//很沒意義的...指定翻譯
var Experiencelevel = $("div#experienceTooltip > strong").eq(0).text();
var Experiencepoints = $("div#experienceTooltip > strong").eq(1).text();
var Nextlevelat = $("div#experienceTooltip > strong").eq(2).text();
$("div#experienceTooltip").html(
								"<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />"+
								"經驗等級: <strong>"+ Experiencelevel +"</strong><br />"+
								"經驗點數: <strong>"+ Experiencepoints +"</strong> / <strong>"+ Nextlevelat +"</strong><br />"
								);
$("div#wellnessTooltip").html(
								"<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />"+
								"&bull;&nbsp;體力維持得越高，越能有高生產力及破壞力。<br />"+
								"&bull;&nbsp;工作、訓練、戰鬥和缺乏食物都會降低體力。<br />"+
								"&bull;&nbsp;房屋、體力包、食物、醫院等都可恢復體力。"
								);
var hltrt = $("div#eatFoodTooltip > big").text();
$("div#eatFoodTooltip").html(
								"<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />"+
								"<p>如果您的體力低於100，您可以按這裡吃<strong>物品欄位中第一個食物</strong>來恢復。</p>"+
								"<p>您可以在交易市場中購買食物。您每天最多只能恢復300點體力。</p>"+
								"<p style=\"margin:0\">今天可以恢復的體力: <big>"+ hltrt+ "</big>"+
								"<img class=\"mini_health\" src=\"http://www.erepublik.com/images/modules/_icons/mini_health.png\" alt=\"\" /></p>"
								);
$('a.tab1 > strong').text("購買黃金");

$('a.tab3 > strong').text("黃金獎勵");
$('a.tab4 > strong').text("獲得體力");

$('a#RES_ID_fb_login_text').remove();

//_/_/_/_/_/_/_/計算購買數量的總價格
//　市場工具　_/從eRepublik Market Tools移植
//_/_/_/_/_/_/_/http://userscripts.org/scripts/show/84008
//只有在市場頁面才會執行
 if (document.location.toString().indexOf("market/81")!=-1) {
$('.m_quantity input').after('<br><strong></strong>').parent().css({'text-align':'center'});
$('.m_quantity input').keypress(function(){
  var inp = $(this);
  // get price
  var price = inp.parent().prev('.stprice').text();
  price = Math.floor(Math.round(parseFloat(price)*100));
  // get stock
  var stock = parseInt(inp.parent().siblings('.m_stock').text());
  // get amount after 0,5s (avoid bug)
  var amount = 1;
  var timer = null;
  timer = setTimeout(function(){
    amount = parseInt(inp.val());
    amount = (isNaN(amount) ? 0 : amount);
    // check if amount greater then stock
    if(amount > stock) inp.css({'color':'red'});
    else inp.css({'color':'#333'});
    var total = (price * amount)/100;
    inp.siblings('strong').text(total+" TWD");
  }, 100);
});
  }
var freeslots = $('#onaccount small').text();
$('#onaccount span').append('<small>'+freeslots+'</small>');


//_/_/_/_/_/_/_/顯示百分比小數點後4位
//　戰場工具　_/從NMA BattleMod移植
//_/_/_/_/_/_/_/http://userscripts.org/scripts/review/89146
//只有在戰場頁面才會執行
if (document.location.toString().indexOf("military/battlefield")!=-1) {
 var blue_domination=document.getElementById('blue_domination');
  if (blue_domination)
  {
blue_domination.setAttribute('style', 'opacity: 1; -moz-opacity: 1;');
var  red_domination=document.getElementById('red_domination');
red_domination.setAttribute('style', 'opacity: 1; -moz-opacity: 1;');

function fixwidth() {
var getblue=document.getElementById('domination_bar').style.getPropertyValue("width");
blue_domination.innerHTML = getblue;
getred=(100-getblue.replace('%',''))+'';
red_domination.innerHTML = getred.substring(0,7) +'%';}
setInterval(fixwidth, 4000);
}
}
//公司員工薪資計算(測試)
if ($('input.sallary_field').eq(0).val()){
var salary = 0;
for (i=0; i<=10; i=i+1)//(只適用10人公司XD~有超過要自己改)
{
if (eval($('input.sallary_field').eq(i).val())){
salary += eval($('input.sallary_field').eq(i).val());
}
}
$('th.el_salary > a').append('總和:'+salary.toFixed(2));
}

//計算市場庫存(測試)
var stockno = 0;
var stock = 0;
for (i=1; i<=10; i=i+1){if(eval($('.m_stock').eq(i).text())){stockno++;}}
for (i=1; i<=stockno; i=i+1)
{
stock +=eval($('.m_stock').eq(i).text());
}
$('.m_stock').eq(0).text("庫存:"+stock);
