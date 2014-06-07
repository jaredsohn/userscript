// ==UserScript==
// @name           eRepublik Simplified Chinese Translation
// @namespace      Simplified Chinese Translation
// @author         iceblock
// @description    eRepublik 中文补丁
// @version        1.5.15.2
// @include        http://*.erepublik.com/*
// ==/UserScript==

/*	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
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

var VERSION = '0.1.0';

var strings = {
// * Index Page

	"Missions":"任务",
	"Eat":"食用",
	"Buy food":"购买",
        
	
	
    // * Daily Tasks
	"Daily tasks":"每日任务",
	"Work":"工作",
	"Train":"训练",
	"Get reward":"获得奖励",
	"Completed!":"完成了!",
	"work skill":"工作技能",
	"strength":"力量",
	"experience points":"经验值",
	
	// * Military campaigns
	"Victory":"胜利",
	"Military campaigns":"更多的战役",
	"Campaign of the day":"本日重要战役",
	"Allies' Campaigns":"盟友的战役",
	"China Campaigns":"其他战役",
	"Latest events":"最新事件",

	
    //"News categories" : "新闻分类",
	
	"First steps in eRepublik" : "新人指导及教育",
	"Battle orders" : "军令",
	"Warfare analysis" : "战略分析",
	"Political debates and analysis" : "政治评论分析",
	"Financial business" : "经济焦点",
	"Social interactions and entertainment" : "社交娱乐",
	"Newspaper subscriptions" : "已订阅的报纸",
	"Top rated":"国内热门新闻",
	"Latest":"最新新闻",
	"International":"国际热门新闻",
	"Subscriptions":"订阅的报纸",
	
	// * Citizen feeds
	"Vote":"支持",
	"Unvote":"不再支持",
	"Report":"举报留言",
	"Comment":"留言",
	"Older posts":"更多留言",
	"now":"刚才",
	"Previous comments":"更多回复",
	
	
	
	// * Main Menu
	
	// * Market
	"Marketplace" : "商品市场",
	"Monetary market" : "汇市",
	"Job market" : "就业市场",
	"Companies for sale" : "公司转让市场",
		
	// * Community	
	"World Map":"世界地图",
	"News":"新闻",
	"My Party" : "我的政党",
	"Elections" : "选举中心",
	"Military Unit":"军团",
	"Rankings" : "游戏排行榜",
	"Country administration" : "国家管理中心",
	"Invite friends" : "邀请好友",
	"Badges":"官方签名档",	
	
	// * foot
	"Logout" : "登出",
	"Forum" : "官方论坛",
	"Wiki" : "游戏百科",
	"Blog" : "官方博客",
	"Press": "新闻发布素材",
	"Contact": "联系我们",
	"Jobs": "加入我们",
	"Terms of Service": "服务条款",
	"Privacy": "隐私政策",
	"Affiliates":"合作伙伴",
	"eRepublik Laws": "游戏规则",	
	
// * PM and Sub system
	
	"Newer":"上一页",
	"Older":"下一页",
	
	// * Message
	"Messages":"邮件",
	"New Message":"写新邮件",
	/*
	"New message":"写新邮件",
	"To (friends only)":"收件人（仅限好友）：",
	"Subject":"主题：",
	"Message":"内容",
	*/
	"Select All":"全选",
	"Delete":"删除",	
	"Only active conversations from the last 14 days are shown.":"超过14天没有更新的邮件将不会被显示",
	"Subject":"主题",
	"No messages found.":"沒有邮件",

	// * Alerts
	"Alerts":"系统消息",
	"After 5 days the alerts are automatically deleted":"系统消息将在5天后自动删除",
	
	
	// * Work page
	"Choose an action to boost your Economy skill and Productivity":"选择一种提升工作效率的方法来提高您的生产力",
	"Single Espr...":"来一杯咖啡",
	"Double Espr...":"来两杯咖啡",
	"Brainstorm ...":"脑力风暴",
	"After work ...":"下班后的聚会",
	"Invite Friend":"邀请朋友",
	" Economy Skill ":"工作技能",
	"Choose 2 invited friends to boost your Economy skill and Productivity":"选择2个朋友来帮助您提高工效率",
	"Start working":"开始工作",
	"Please choose a booster":"请选择一种提高工作效率的方法",
	"You have already worked today. Come back tomorrow.":"今天您已经工作过了。请明天再来吧。",
	"Resign":"辞职",
	"resign":"辞职",
	"This company has no job offers at the moment":"这个公司现在不对外招聘",
	"Are you sure you want to resign your current job?":"你确定想辞职吗？",
	//"You have successfully resigned.":"你成功辞职了",
	"Salary:":"薪水:",
	"View work results":"查看工作成果",
	"Where do you want to go next?":"接下来您要去哪里?",
	
	// * Work result page
	
	"Workday results":"今天的工作成果",
	"Today's salary":"今天的薪水",
	"You are working as manager, no salary is needed.":"作为公司的所有人，为自己工作不发薪水",
	"Salary details":"工资明细",
	"Gross salary":"未扣税工资",
	
	"Economy Skill":"工作技能",
	"Economy skill details":"工作技能细节",
	"skill points":"个技能點",
	
	"Productivity:":"生产力:",
	"Productivity details":"生产力细节",
	"Work booster":"工作方式奖励",
	"Friend bonus":"朋友协助的奖励",
	"Citizenship bonus":"国籍奖励",
	"Resource bonus":"资源奖励",
	
	"You worked":"您已经连续工作",
	"days in a row.":"天。",
	"day in a row.":"天。",
	"You need to work":"您需要再工作",
	"more days to receive your 'Hard Worker' Medal":"天就可以获得 ''劳动模范'' 的成就奖章。",
	"Congratulations, you’ve been promoted to":"恭喜您，您已经晋升到",
	
	// * Creat a company
	"The company will be located in":"该公司将设立在您的国籍所在地：",
	", your citizenship country":"",
	"Requirements" : "设立公司的条件",
	"Funding fee":"公司建立费用",
	"Free Land":"未被占用的空地",
	"Not Passed":"未通过",
	"Passed":"已通过",
	"Industry":"产业种类",
	"Company Identity":"公司资料",
	"Company name":"公司名称",
	"6-30 characters max":"长度限制在6-30字节之间",
	"Company logo":"公司LOGO",
	"Upload picture":"上传图片",
	"Create company":"建立公司",
   
	// * Company Page
	
	"Raw materials":"原料",
	"Manage":"员工管理",
	"Employee":"员工",
	"Manage employees":"人事管理",
	"Market":"市场",

	"Productivity":"生产力",
	"Units produced:":"产品数量:",
	"Worker state":"工作状态",
	"Mo":"周一","Tu":"周二","We":"周三","Th":"周四","Fr":"周五","Sa":"周六","Su":"周日", 
	"This company has no employees at the moment":"这家公司目前没有员工",
	"Add a job offer":"添加职位需求信息",
	"Offers":"薪水",
	"Select skill":"选择想要招收的员工等级",
	"Save":"保存",
		
	"Company setup & product design":"公司升级和降级",
	//////////////////////////////////////////////
	
	"Migrate company":" 变更公司产业类型",
	"Edit details":" 编辑公司资料",
	"Sell company":" 公司转让",
	
	"New industry":"新产业",
	"Check resources":"查看资源",
	"Productivity bonus:":"生产力奖励:",
	"Raw material bonus":"原料奖励",
	"Company description":"公司介紹",
	"Company profile":"公司首页",
	"Finances":"公司财政",
	"Buy raw materials":"购买原料",
	"Migrate industry":"变更公式产业类型",
	
	"Dissolve company":"解散公司",
	"Dissolving a company will empty the land on which it has been built, allowing you to build another company on it.":"解散公司可以空出土地给新公司使用",
	"You can dissolve your company for":"你可以在解散公司后拿回 ",
	
		
// * Training grounds

	"Training grounds":"训练中心",
	"Choose a booster":"训练科目",
	"Army boots":"行军演练",
	"Boot camp":"新兵训练",
	"Caesar's ba...":"凯撒之战",
	"Napoleon's ...":"拿破仑的胜利",
	
	
	"Start training":"开始训练",
	"You have already trained today":"您今已经训练过了",
	"Improve your Strength level:":"提高您的力量:",
	"Your current Strength level:":"您目前的力量:",
	"Choose an action to boost your strength":"选择一种训练方式来提升训练效率",
	"Choose 2 invited friends to boost your strength":"选择2個朋友来帮助您训练",
	"View train results":"查看训练成果",
	"Train results":"训练成果",
	"Strength:":"力量:",
	"Experience":"经验值",
	"Training details":"训练成果细节",
	"Basic training":"基本训练值",
	"Train booster":"训练方式奖励",
	"Friends bonus":"朋友协助的奖励",
	"Natural enemy bonus":"死敌奖励",
	"Please select a booster.":"请选择一种训练方式。",


// * My land and Profile
	
	// * Tab
	"Overview":"个人资料",
	"Accounts":"资金账户",
	"Storage":"仓库",
	"edit profile":"修改资料",
	"Dead citizen":"该公民已经饿死了",
	"Permanently banned":"该公民账户被永久冻结",
	
	// * Main
	"Level":"等级",
	"Health":"体力",
	"Experience level":"经验等级",
	"About me":"About me 个人简介",
	"Achievements":"Achievements 成就奖章",
	"Military Skills":"军事技能",
	"Strength":"力量",
	"Super soldier:":"超級大兵:",
	"Military rank":"军阶",
	"Progress":"进度",
	
	"Visit":"访问",
	"Enter":"进入",
	
	"Hard Worker":"劳动模范",
	"Worke 30 days in a row" : "连续工作30天",
	"Worked 30 days in a row" : "连续工作30天",
	"Congress Member" : "国会议员",
	"Win the Congress elections":"赢得国会大选",
	"Won the Congress elections":"赢得国会大选",
	"Country President" : "国家总统",
	"Win the Presidential elections": "赢得总统大选",
	"Won the Presidential elections": "赢得总统大选",
	"Media Mogul" : "媒体大亨",
	"Reach 1000 subscribers to your newspaper": "订阅您的报纸的读者达到1000 人",
	"Reached 1000 subscribers to your newspaper": "订阅您的报纸的读者达到1000 人",
	"Battle Hero" : "战斗英雄",
	"Reach the highest war influence in a battle": "在一场战斗中造成最高的战争影响值",
	"Reached the highest war influence in a battle": "在一场战斗中造成最高的战争影响值",
	"Campaign hero":"战役英雄",
	"Reach the highest war influence in a campaign":"在一场战役中造成最高的战争影响值",
	"Reached the highest war influence in a campaign":"在一场战役中造成最高的战争影响值",
	"Resistance Hero" : "起義英雄",
	"Start a resistance war and liberate that region": "发动一场起义战争并成功解放该地区",
	"Started a resistance war and liberate that region": "发动一场起义战争并成功解放该地区",
	"Super Soldier" : "超級大兵",
	"Advance 250 strength points": "累计达到250点力量点数",
	"Society Builder" : "社交达人",
	"Invite 10 people to eRepublik and help them reach level 10": "邀请 10 人加入 eRepublik 并帮助他们达到 Lv10",
	"Invited 10 people to eRepublik and helped them reach level 10":"邀请 10 人加入 eRepublik 并且帮助他们达到 Lv10",
	
	// * Sidebar
	"Location:":"所在位置:",
	"(change)":"(变更)",
	"Citizenship:":"国籍:",
	"eRepublik birthday":"eRepublik的生日",
	"National rank:":"国家排名:",
	"Activity":"活动",
	"Unemployed":"失业中",
	"No political activity":"没有加入任何政党",
	"Party Member":"政党成员",
	"No Military Unit":"尚未加入任何军团",
	"Military Unit Member":"军团成员",	
	"Create newspaper":"建立一份报纸",
	"Press director":"报纸主编",
	"Forfeit points:": "违规点数:",
	"No media activity":"尚未创办报纸",
	"view all":"查看全部",
	"Buy Land":"购买土地",
	"New land":"新的土地",
	"Cost:":"费用:",
	"Not enough local currency!":"没有足够的当地货币!",
	"Only your first 2000 friends will see your posts.":"系统只会显示前2000名好友",
	"Friendship was successfully canceled":"好友已经成功被移除",
	"Your friendship request has been sent.":"您已经发出好友申请。",
	
		
	// * Change profile
	"Edit Profile":"修改资料",
	"Your description":"您的自我介绍",
	"Citizen Avatar" : "公民头像",
	"only":"只允许上传",
	"pictures allowed" : "格式的图片",
	"Your birthday" : "出生日期",
	"Your email here" : "电子邮件",
	"Email must be valid for registration, so do not cheat" : "此Email地址用于游戏帐号和游戏激活，必须真实有效。",
	"Your password":"您的密码",
	"Enter your current password in order to change your profile settings":"要输入当前密码才能更改资料",
	"Change password" : "修改密码",
	"Make changes":"更改资料",
	"You have succesfully edited your profile":"您已成功编辑您的个人资料",
	
	
	// * Change PW
	"Current password":"当前密码",
	"Please type your old password":"请重新输入当前密码",
	"New password":"新密码",
	"New password again":"请重新输入新密码",
	
	// * Change Location
	"Change residence":"更改居住地",
	"Current location" : "目前位置",
	"The first ticket found in your storage that will cover the required distance will be used." : "将使用仓库内第一张符合飞行距离的机票",
	"Moving distance:":"飞行距离:",
	"New location":"目的地",
	"Do you wish to apply for citizenship in your new country?":"您是否需要提出此国的入籍申请？",
	"Apply for citizenship":"申请入籍",
	"No, thanks":"不需要",
		
	// * Storage
	"Final products":"可用物品",
	"Resources":"原料",
	"Sell":"销售",
	"post new offer":"将物品放到市场销售",
	"from marketplace":"从市场购买",
	"Price / unit":"每个产品的价格(含税)",
	"Add on sale":"开始销售",
	"Buy license":"购买销售许可证",
	"Buy market license":"购买销售许可证",
	
	

// * Market place

	"Durability":"耐久度",
	"Fire Power":"火力",
	"Moving Distance":"移动距离",
	"Health Restore":"可回复的体力值",
	"Select product":"选择产品",
	"Select quality":"选择品质",
	"Change":"更改",
	"Product":"产品",
	"Seller":"销售商",
	"Stock":"库存",
	"Price":"价格",
	"Quantity":"数量",
	"Buy":"购买",

// * Money Market

	"Provider":"提供方",
	"Amount":"货币总量",
	"Exchange rate":"汇率",
	"Amount to buy":"购买量",
	

// * Job Market
	
	"Company":"公司",	
	"Skill":"技能等級",
	"Daily salary":"薪水",
	"Apply":"申请",    
	"Congratulations, you are now working for this company.":"恭喜您，您现在可以在这家公司工作了。",

// * Company for sale
	
	"Product details":"公司类型",
	"There are no companies for sale matching you search.":"您选择的产业类型中没有待售的公司。",
	"You can not buy a company from another country.":"您不可以购买别国的公司。",

// * World Map


// * Newspaper
	
	// * Front page
	"Top rated news" : "热门新闻",
	"Latest news" : "最新新闻",
	"Latest events" : "最新事件",	
	
	// * no newspaper
	"You do not have a newspaper" : "您尚未开办报纸",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "报纸在 eRepublik 的世界中扮演着穿低级沟通讯息的角色。想了解更多相关资讯请阅读 eRepublik 百科。建立您自己的报纸。",    
	"Newspaper details" : "报纸简介",
	"Newspaper name" : "报纸名称",
	"6-25 characters max":"长度限制在6-30字节之间",
	"Newspaper Avatar" : "报纸LOGO",
	"only JPG files allowed":"只允许*.JPG格式图片",
	
	// * page
	"today":"今天",
	"yesterday":"昨天",
	"Subscribe":"订阅",
	"Unsubscribe":"取消订阅",
	"ShareThis" : "分享此篇文章",
	"Report article":"举报文章",
	"Report comments":"举报评论",
	"Subscribe to comments" : "订阅此评论",
	"Your comment" : "您的评论",
	"Post a comment" : "发布评论",
	

	// * Write one
	"You do not have any articles, if you want to write an article you should enter here:":"您没有任何文章，如果您想写一篇文章，请在此输入：",
	"Write article":"写文章",
	"1-80 characters max":"标题长度限制在1~80字节之间",
	"Back":"回到上一页",
	"Article":"文章內容",
	"Publish":"发表",
	
	"Edit newspaper details":"编辑报纸细节",
	"Title":"标题",
	"Description":"简介",
	"About my newspaper":"关于我的报纸",
	"Newspaper logo":"报纸LOGO",
	
	"National" : "国内事件",
	"one hour ago" : "1 小时前",
	"one month ago" : "1 个月前",
	"more events" : "更多事件",
	"The proposal for a new welcoming message for new citizens was rejected." : "修改新公民欢迎信的提案已被否决。",
	"The president impeachment proposal has been rejected" : "总统弹劾议案已被否決",
	"The campaign goals of the presidential candidates are now final" : "总统候选人已作出竞选演说以及提出国家目标",
	"A new citizen fee was proposed" : "修改新公民费提案已通过",
	

// * My party and election
	
	// * Main page
	"Report party":"举报政党",
	"You are not a member of a party" : "您目前并非政党成员",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "您可以从政党页面加入某一政党，如果您找不到适合您的政党，您也可以自己建立一个政党。成为政党成员可以使您有机会成为议员，甚至总统。",
	"Join a party" : "加入政党",
	"Name":"名字",

	"Info":"信息",
	"Members"  : "成员",
	"Orientation" : "政治倾向",
	"Join party" : "加入政党",
	"Party Member																																							, Congress Member":" 政党成员, 国会议员 ",
	"Party President																																							, Congress Member":" 党主席, 国会议员 ",
	"Show all members":"显示所有成员",
	"Show results":"显示选举结果",
	
	// * Donate
	"Donate Gold":"捐赠黃金",
	"Show all donations":"显示所有捐赠",
	"All donations":"所有捐赠",

	"Party presidency":"党主席",
	"Party President":"党主席",
	"Congress":"国会",
	"congress members":" 国会议员",
	"of Congress":" 国会席次",
	"Next elections in" : "距离下次选举：",
	"one day":"1 天",
	"hours":"小时",
	"Election day":"选举日",
	//"Vote":"投票",
	"Show candidate list" : "显示候选人名单",
	"Show proposed members":"显示议员候选人名单","of congress":"",
	"Edit presentation":"编辑参选宣言",
	"Resign candidacy":"放弃参选",
	"Country presidency":"国家囧统",
	"Winner":"当选人",
	"Show candidates list" : "显示候选人名单",
	"Our next candidate" : "下届选举候选人",
	"no goals selected":"没有设定国家目标",
	"No candidate proposed":"尚未推举候选人",
	
	"Party details" : "政党信息",
	"Party name" : "政党名称",
	"Economical orientation" : "经济倾向",
	"Choose economical orientation":"请选择经济倾向",
	"Far-left" : "极左派",
	"Center-left" : "中间偏左派",
	"Center" : "中间派",
	"Center-right" : "中间偏右派",
	"Far-right" : "极右派",
	"Social orientation" : "社会倾向",
	"Choose social orientation":"请选择社会倾向",
	"Totalitarian" : "极权主义",
	"Authoritarian" : "独裁主义",
	"Libertarian" : "自由主义",
	"Anarchist" : "无政府主义",
	"Party logo" : "政党LOGO",
	"Disscusion area" : "讨论网址",
	"Create":"建立",
	
	// * Signup
	
	"Congress member candidates":"国会候选人",
	"Party members can apply for congressional candidature each month between the 16th and 23rd.":" 党员可以在每月的16日和23日之间登记参选国会议员。",
	"Party president can modify the final list only on the 24th of each month":" 党主席可以在每月24日修改最终名单。",
	"Choose region":"选择地区",
	"No presentation":"没有参选宣言",
	"Presentation":"参选宣言",

	"Edit campaign goals":"编辑国家目标",
	"Reset campaign":"重置",
	"Add Goal":"增加目标",
	"Activate campaign":"提出",
	"Back to Party":"回到政党页面",
	"Goal type":"目标类型",
	"Mission":"任务",
	"Edit":"修改",
	
	// for PP
	"Edit party details":"修改政党资料",
	"Resign party presidency":"辞去党主席职务",
	"Propose candidate":"候选人提名",
	"Run for presidency":"竞选总统",
	"Click the Update button to save the changes":"点此保存",
	"Update":"更新",
	"Replace":"替换",

	"Congratulations, you are now a party member!":"恭喜您，成为本党党员",
	"Candidate":"参选",
	"Run for congress":"竞选国会议员",
	"Edit  the link to your presentation where you explain why citizens should vote for you in the Congress elections":"填入你的竞选宣言链接，告诉国民为什么投你一票",
	"Provide a link to your presentation where you explain why citizens should vote for you in the congressional elections":"填入你的竞选宣言链接，告诉国民为什么投你一票",
	"link to an external web address or a":"链接可以用外部网站或",
	"private forum":"私人论坛的链接",
	"Agree":"同意",
	"Cancel":"取消",	
	
	"Election":"选举",
	"Presidential elections" : "总统选举",
	"Congressional elections" : "议员选举",
	"Party elections" : "党主席选举",
	"Official Results":"正式结果",
	"Goals":"目标",
	"Total votes:":"总票数:",
	"votes":"票",
	"Presence:":"参与率:",
	"No information available":"没有相关信息",
	"Month/Year":"月份/年",
	
	"Select a party":"选择一个政党",
	"to show it's candidates":"显示他的候选人",

// * Military Unit
	"You are not a soldier of any Military Unit":"你还没有加入任何军团",
	"You can join an existing Military Unit or you can create your own Military Unit if you cannot find the right one for you. Being a soldier of a Military Unit helps you and your fellow soldiers to be better organized, thus dealing more damage. ":"你可以加入以下现有军团，或者自己建一个军团。",
	"Apply for membership in a Military Unit":"申请加入军团",
	"Pending applications:":"审核中的申请:",
	"Leader":"军团长",
	"See all":"查看全部团员",
	
// * Rankings

	"Companies":"公司",
	"No.":"排名",
	"Sort by" : "排序",
	"No. of Employees" : "员工人数",
	"Select industry":"选择产业类型",
	"All industries":"所有产业类型",
	"Newspapers" : "报纸",
	"Subscribers" : "订阅数",
	"Countries":"国家",
	"Experience points":"经验值",
	"( Average Experience )":"(平均经验值)",
	"Population number" : "人口数量",
	"Parties" : "政党",

// * Country administration and other info
	
	"Select":"选择",
	"Donate" : "捐赠",
	"On the Map":"查看地图",
	
	// * Tab 
	"National Goals" : "国家目标",
	"Society":"社资讯会",
	"Economy":"经济资讯",
	"Politics":"政治资讯",
	"Military":"军事资讯",
	"Administration":"管理中心",
	
	// * Goals
	"Current national goals" : "当前的国家目标",
	"The elected president has not set any national goals for this month." : "总统没有设定本月的国家目标。",
	"check current status":"查看实时数据",
	"At least one national goal needs to be achieved each month in order to receive a monument.":"每月至少实现一个国家目标即可获得荣誉纪念碑。",
	"Monuments achieved":"纪念碑",
	
	// * Society
	"Join":"加入",
	"Citizens":"公民",
	"Total citizens" : "公民总数",
	"New citizens today" : "本日新出生公民",
	"Citizenship requests":"国籍申请",
	"View requests":"查看申请",
	"Average citizen level" : "公民平均等級",
	"Online now": "在线公民",
	"Who" : "谁在线上",
	"Citizen fee" : "新公民福利金",
	
	// * Apply for citizenship
	"Approved":"已批准",
    "There are no pending citizenship applications.":"目前没有等待审核的申请。",
    "Citizen":"公民",
    "Details":"详情",
    "Citizenship passes":"入籍审查",
    "Accept":"批准",
    "Resident since:":"申请日期:",
	"Expires:":"截止日期:",
    "Approved on":"批准日期",
    "Approved by":"审核人",
		
	// * Region details
	"No direct transport route to the Capital":"没有连接到首都",
	"Country - Society":"社会资讯主页",
   	"Population":"人口数",
   	"Constructions":"本地建设",
   	"Resource":"资源",
   	"Resistance War" : "起义战争资讯",
   	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "您不能发起起义，因为该地区已属于其原有国家。",
	"In order to start a resistance war, you need 10000 local currency of the country that originally owned the region." : "您必须拥有1万当地货币才能发起起义",
	   	"Neighbors" : "接壤地区",
	
	// * Economy
	"Country resources":"国家资源",
	"Resource list":"资源列表",
	"Regions":"产地",
	"Not available":"无",
	"Treasury":"国库",
	"All accounts":"所有账户",
	"Country trading embargoes":"国家贸易封锁",
	"This country can trade with any other country in eRepublik.":"该国家可以和任何国家进行贸易。",
	"Taxes":"税收",
	"Income Tax":"所得税",
	"Import Tax":"进口税",
	"VAT":"增值税",
	"Salary":"薪水",
	"Minimum":"法定最低薪水",
	"Average":"平均薪水",
	"Gross domestic product (GDP)":"国家生产总值（GDP）",
	"Monthly exports":"每月出口量",
	"Monthly imports":"每月进口量",
	"Inflation":"通货膨胀率",
	"Monthly":"每月",
	"Yesterday":"昨天",
	"Daily average":"每日平均",
	"Exports":"出口",
	"Imports":"进口",
	"Revenues":"利润",
	
	
	// * Political
		
	"President":"囧（总）统",
	"Election results":"选举结果",
	"Next elections":"下届选举",
	
	// * Military
	
	"Natural enemy":"国家死敌",
	"The citizens of this country will be provided with a +10% war influence bonus in the military campaigns against the Natural Enemy.":"在与国家死敌的战斗中，可以获得额外10%的影响点数。",
	"No current Natural Enemy":"目前没有死地",
	"This country is not involved in any war.":"这个国家没有参与任何战争。",
	"All wars" : "所有战争",
	"There are no resistance wars in this country." : "这个国家没有任何起义战争。",
	"All resistance wars" : "所有起义战争",
	"Alliances":"盟国",
	"All Alliances" : "所有盟国",
	
	// * administration
	
	"Country Administration":"国家管理中心",
	"Hello, Congress Member":"您好，亲爱的国会议员",
	"You are not a president or a congress member in this country.":"您不是该国总统或国会议员。",
	"Law proposals" : "法律提案",
	
	// * Proposal
	"Propose a law":"提出一个新议案",
	"New citizen fee":"新生公民福利金",
	"Provide citizenship":"国际审核议案",	
	"Minimum wage":"最低工资",
	"President Impeachment":"总统弹劾议案",
	"details" : "详情",
	"Accepted" : "已通过",
	"Rejected" : "己被否決",
	"ACCEPTED" : "已通过",
	"REJECTED" : "己被否決",
	"Pending" : "进行中",
	"Debate location (optional)":"讨论区(选填)",
	"Propose":"议案",
	"Ammount":"金额",
	"Set new":"设定新的",
	"Choose industry":"选择产业",
	
	// * Congress proposal type
	"Value Added Tax":"增值税",
	"Buy Constructions":"购买建筑议案",
	"Peace Proposal":"和平条约",
	"Natural Enemy":"国家死敌",
	"Alliance" : "结盟条约",
	"New Citizen Message":"新公民欢迎信",
	"Issue Money":"印钞议案",
	
	
	//donate
	"Your account":"您的帐户",
	"Items":"物品",
	"Money":"钱币",
	
	
	
	// * Tax
	"Tax change: Food":"税率变更议案: 食物",
	"Tax change: Moving Tickets":"税率变更议案: 机票",
	"Tax change: Weapons":"税率变更议案: 武器",
	"Tax change: House":"税率变更议案: 房屋",
	"Tax change: Defense System":"税率变更议案: 防御系统",
	"Tax change: Hospital":"税率变更议案: 医院",
	"Tax change: Stone":"税率变更议案: 石材",
	"Tax change: Oil":"税率变更议案: 石油",
	"Tax change: Grain":"税率变更议案: 谷物",
	"Tax change: Iron":"税率变更议案: 钢铁",
	"Buy Constructions: Defense System":"购买建筑议案: 防御系统",
	"Buy Constructions: Hospital":"购买建筑议案: 议员",
	
	
	
	
	// * Common page
	"The law voting process takes 24 hours.":"法案的投票过程持续24小时。",
	"Yes":"赞成",
	"No":"反对",
	
	"Only congress members and country presidents have the right to vote.":"只有国会议员和总统有投票权。",
	"For this law to be considered accepted it needs 66% of the Congress votes.":"本议案需要超过66%议员投票才能通过。",
	"Show all law proposals":"显示所有议案",
	
	"Value added tax (VAT)" : "增值税 (VAT)",
	"New":"新",
	"Old":"旧",
	"Attention: No VAT tax for raw materials":"注意：原材料无增值税",
	"Debate Area":"讨论区",

// * Other page in community

 
// * All about Gold


// * War and battle field

	"See other campaigns":"查看其他战役",
	"Fight":"攻击！",
	"Enemy Defeated":"敌人被击败",
	"War influence":"战争影响点数",
	"Rank points":"军阶点数",
	"Add influence":"继续战斗",
	"Total influence":"总影响点数",
	"No weapon":"没有可使用的武器",
	"Battlefield":"战场",
	"Battles I can fight in":"我可以参加的战役",
	"Battle statistics":"战斗统计",
	"Overall results":"总体结果",
	"Kills":"击倒数",
	"Congratulations, your rank is now":"恭喜您的军阶等级提升了",
	"Rank Bonus on attack":"军阶奖励",
	"Free health refill":"回复全部体力",
	"Health refill needed":"需要回复体力",
	"My influence":"我目前累积的影响点数",
	
	
	"Active wars in China":"中国可参与的战场",
	"Active resistance wars in China":"中国的起义战争",

	"War types":"战争类型",
	"Conquest wars":"侵略战争",
	"Resistance wars":"起义战争",
	"War status" : "战况",
	"Active wars" : "进行中的战役",
	"Ended wars" : "已经结束的战役",
	"Countries involved" : "参与的国家",
	"no allies" : "没有盟国",
	"no active battles" : "没有进行中的战役",
	
// * Pin code

	"Generate security PIN":"生成安全PIN码",
	"In order to ensure a better and safer experience in the New World, we have implemented a new security measure: Personal Security PIN. First, please enter your password below, so that you can generate your security PIN..":"为了确保您的财产安全，我们新加入了个人安全PIN码。在生成安全PIN码之前，请在下面输入您的密码.",
	"Generate PIN":"生成PIN码",
	"Your account security is very important! Please go to your":"您资金账户的安全是很重要的，请到您的个人",
	"profile":"首页",
	"and generate your security PIN for a better protection of your account details.":"生成PIN码来保护您的账户。",
	"Please insert your Personal Security PIN":"请输入您的PIN码",
	"Unlock":"解锁",
	
// * Common words

	// * Data
	"Month":"月份",
	"Year":"年",
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

	// * products
	"Food":"食物",
	"Moving Tickets" : "机票",
	"Weapons":"武器",
	"House":"房屋",
	"Defense System" : "防御系统",
	"Hospital" : "医院",
	
	// * Raw
	"Fish":"鱼",
	"Rubber":"橡胶",
	"Grain" : "谷物",
	"Fruits":"水果",
	"Cattle":"牛",
	"Deer":"鹿",
	"Iron":"钢铁",
	"Saltpeter":"硝石",
	"Aluminum":"铝",
	"Stone":"石材",
	"Oil":"石油",
		
// * - Job rank
	"All":"所有",
	"Apprentice":"学徒",
	"Assistant":"助理",
	"Junior":"新手",
	"Senior":"资深",
	"Coordinator":"主管",
	"Specialist":"行家",
	"Expert":"专家",
	"Master":"著名专家",
	"Guru":"大师",
	"Guru*":"大师*",
	"Guru**":"大师**",
	"Guru***":"大师***",
	"Guru****":"大师****",
	"Guru*****":"大师*****",

// * - Military rank


// * - Country name
	"All countries" : "所有国家",
	"Country":"国家",
	"World":"世界",
	
	
	//reC
	"Guest":"访客",
	"Search citizen":"搜索公民",
	"No citizens found that match your criteria.":"没有股和搜索条件的公民。",
	"Good job! You are on the way to a Hardworker Medal. Please prove you are human." : "做的好！您正迈向“劳动模范”奖章。请先输入验证码。",
	"Good job! Please prove you are human.":"做的好！请输入验证码。",
	"Continue":"继续",
	
	//Index page
	"Ambient on/off":"背景 on/off",
	"active citizens today":"位活跃的公民",
	"Welcome to the New World" : "欢迎来到这个新世界",
	"Enter the new world" : "进入游戏",
	"Email":"邮件地址",
	"Password" : "密码",
	"Forgot password?" : "忘记密码",
	"Sign Up" : "注册成为新公民",
	"Remember me" : "记住我",
	"Top countries in eRepublik" : "eRepublik 热门国家排行榜",
	"top countries in eRepublik" : "查看 eRepublik 国家排行榜",
	"citizens":"公民",
	"What others are saying about eRepublik":"关于eRepublik  其他人怎么说",
	"Welcome to the New World! I'm Carla, your eRepublik advisor. Let's get acquainted, then I'll show you around.":"欢迎来到这个新世界，我是你的向导Carla。下面由我来为你介绍。",
	

	//login
	"Login":"登入",
	"Please type in your email":"请输入您的邮件地址",
	"Invalid email format":"邮件地址格式错误",
	"Please type in your password":"请输入您的密码",
	"Wrong password":"密码错误",
	"Complete the catpcha challenge:":"请输入验证码:",
	"Take the tour" : "游戏预览",
	"Join now" : "现在加入",
	"It's free" : "完全免费",

	//Creat a account
	"Create your citizen":"创建您的公民",
	"Location":"出生地点",
	"Select a country":"请选择一个国家",
	"Select a region":"请选择一个地区",
	"Next":"下一页",	
	"Email address":"电子邮件地址",		
	"Email validation":"请在输入一次电子邮件地址",
	"An email with your passport has been sent to":"您的护照已经发送到您的电子邮箱",
	"Check your email":"检查您的电子邮件",
	"Reward:":"奖励:",
	"Not the right address? Change it now.":"输入了错误的邮件地址？现在就来更改。",
	"Resend email":"重新发送邮件",	
	"Congratulations!":"恭喜!",
	"Start playing":"开始游戏",
	"Hint:":"提示:",
	
	//官方签名档
	
	
	//更新部分
	"Food Raw Material":"食物原材料",
	"Weapon Raw Material":"武器原材料",
	"Employer":"招聘人",
	"Food raw materials":"食物原材料",
	"Weapon raw materials":"武器原材料",
	"Factories":"加工厂",
	"Grain Farm":"谷物农场",
	"Fruit Orchard":"水果园",
	"Fishery":"养鱼场",
	"Cattle Farm":"养牛场",
	"Hunting Lodge":"捕猎场",
	"Select building type":"选择建筑类型",
	"Iron Mine":"铁矿",
	"Oil Rig":"油田",
	"Aluminium Mine":"铝矿",
	"Saltpeter Mine":"硝石矿",
	"Rubber Plantation":"橡胶园",
	"Food Factory":"食品加工厂",
	"Weapons Factory":"武器加工厂",
	"Select building":"选择建筑类型",
	"Normal Storage":"普通仓库",
	"Large Storage":"大型仓库",
	"Units Produced":"生产数量",
	"Total weapon raw material stock":"武器材料库存量：",
	"Total food stock":"食物库存量：",
	"Total weapons stock":"武器库存量：",
	"Production bonus:":"生产力加成：",
	"Total food raw material stock":"食物材料库存量",
	"Health restore":"体力恢复",
	//"Tax / unit:":"单个产品税：",
	"Select company":"选择公司类型",
	
		
};

// / / /  / / /  / / /  / / /  / / /  / / /  / / /  / / /  / / /  / / /  / / /  / / /  / / /  / / /  / / / 

var regexps = {};
//============
//未分类
//regexps["You can join an existing Military Unit or you can create your own Military Unit "] = "";
//regexps["if you cannot find the right one for you. Being a soldier of a Military Unit helps"] = "";
//regexps["you and your fellow soldiers to be better organized, thus dealing more damage."] = "";


regexps["All national goals have been accomplished.China is victorious!"] ="所有的国家目标已经完成。";

//系统信息
if (document.location.toString().indexOf("/messages/alerts/")!=-1) 
{
//regexps["and"] = "和";
regexps["The General Manager of"] = "";
regexps["has transferred (.*) (.*) to your storage.$"] = " 转移了 $1 个 $2 到您的仓库";
regexps["has modified your salary from (.*) to (.*)"] = "的经理将您的薪水从 $1 调整至 $2";
regexps["^is no longer a congress member.$"] = "不再是国会议员。";
regexps["^Good news! You just made (.*) Gold because your friend (.*) was awarded with an amount of Gold from eRepublik.$"] = "好消息！您现在可以从朋友 $2 那收集额外的黄金奖励 $1 Gold。";
regexps["^Collect your Gold$"] = "请在30天內收集您的黃金奖励";
regexps["^bonus within 30 days!$"] = "。";
regexps["^has transfered (.*) to your account.$"] = "已经转账给您$1。";
regexps["^We inform you that (.*) have been sold for (.*) from the citizen account using the offer posted on the"] = "通知：您的 $1 已经以 $2 的价格卖出，请至";
regexps["monetary market$"] = "汇市确认";
regexps["Your company,"] = "你的公司";
regexps[", has been sold for (.*) Gold to"] = "已经以 $1 的价格卖给了";
regexps["We are sorry to inform you that the General Manager of"] = "很遗憾的告诉您，您已经被  ";
regexps["has decided to fire you! But don't worry, you can"] = "  的老板炒鱿鱼了。不过不用担心，你可以到这里  ";
regexps["get a new job"] = "找份新工作";
regexps["or you can even"] = "或者干脆";
regexps["buy a company"] = "自己当老板";
regexps["^commented on your"] = "已经在您的状态留言。";
regexps["^commented on this"] = "已在此状态留言  ";
regexps["and (.*)others commented on this$"] = "  还有$1人已在此状态留言";
regexps["post"] = "  按此查看留言";
regexps["has accepted your friendship request"] = "已经接受你的好友邀请";
regexps["applied for your job (.*) (\\d)(.*)"] = "（技能等级 $2 ）提交了工作申请并开始了工作，工作地点为：";
regexps["^Unfortunately, you have been removed by$"] = "坏消息，你已经被";
regexps["^from his friends list.$"] = "从他的好友名单上移除了";
regexps["^wants to add you to (.*) friends list. Will you accept?"] = "想要加您为好友，同意吗?";
regexps["A new law proposal is now waiting for the Congress vote. To debate on this situation and to place your vote you can access the law proposal page"] = "目前议会中有人提出新议案，请至议会页面投票或讨论";
regexps["Proposal"] = "查看议案內容";
regexps["Congratulations (.*), your account has been credited with (.*) Gold because of an electronic payment."] = "恭喜你 $1, 您已成功购买了 $2 金币。";


}
if (document.location.toString().indexOf("/elections/")!=-1) {
regexps["Vote"] = "投票";
}

//新闻
regexps["one month ago"] = "1个月前";
regexps["(\\d*) months ago"] = "$1 个月前";
regexps["^yesterday"] = "昨天";
regexps["^(\\d*) days ago"] = "$1 天前";
regexps["^one hour ago"] = "1小时前";
regexps["wrote one hour ago"] = "写于1小时前";
regexps["wrote (.*) hours ago"] = "写于 $1 小时前";
regexps["wrote (.*) minutes ago"] = "写于 $1 分钟前";
regexps["wrote yesterday"] = "写于昨天";
regexps["wrote (.*) days ago"] = "写于 $1 天前";
regexps["(\\d*) hours ago"] = "$1 小时前";
regexps["(\\d*) minutes ago$"] = "$1 分钟前";
regexps["(.*) signed an alliance with (.*)"] = "$1 与 $2 结盟了";
regexps["A congress donation to (.*) was proposed"] = "捐赠资金到 $1 的议案已经提出";
regexps["(.*) made a donation to (.*)"] = "$1 捐赠给 $2";
regexps["New taxes for (.*) were proposed"] = "新 $1 税率议案已经提出";
regexps["Taxes for (.*) changed"] = "$1 的税率已改变";
regexps["A money issuing of (.*) was proposed"] = "发行 $1 的货币议案已经提出";
regexps["(.*) issued (.*)"] = "$1 已发行 $2";
//报纸
regexps["You have$"] ="您已订阅";
regexps["newspaper subscriptions"] ="份报纸";
regexps["posted in"] = "发布在";
regexps["(\\d*) comments$"] = "$1 个评论";
regexps["Comments(.*)"] = "评论 $1";
regexps["Trackbacks(.*)"] = "引用 $1";

//donate
regexps["You have successfully donated (.*). This amount will appear shortly in the citizen account."] = "你成功发送 $1 给该玩家，他等会就能收到了";
regexps["Incorrect amount specified."] = "你没有足够的钱";

//国家同盟
regexps["(\\s*)Expires in (\\d*) days"] = " $2 天后到期";
regexps["Expires tomorrow"] = " 明天到期";
regexps["(\\s*)Expires in (\\d*) hours"] = " $2 小时后到期";
regexps["(\\s*)Expires in (\\d*) months"] = " $2 个月后到期";
//战争列表
regexps["(\\d*) allies"] = "$1 盟国";
regexps["(\\d+) active battle(s)?"] = "$1 场进行中的战役";
regexps["Resistance Force of (.*)"] = "$1 起义军";
regexps["is about to attack.$"] = "即将发动攻击";
regexps["Still active"] = "战斗中";
regexps["started on"] = "开始于";
regexps["Conquered by (.*)"] = " 被 $1 攻占";
regexps["Secured by (.*)"] = " $1 防守成功";



//交易市场
regexps["(\\d*) free slots"] = "剩$1个空位";
regexps["You have succesfully bought (\\d) product for (.*).$"] = "您花费 $2 购买了 $1 个产品";
regexps["^This offer(.*)"] = "这单货已经被人买掉了或者被供货商取消了！";
regexps["You can buy maximum (.*) products for this offer."] = "这单货只剩 $1 个了";
regexps["^You do not have enough money in your account.$"] = "您没有足够的钱。";
regexps["You do not have enough Gold in your account."] = "你没有足够的金币。",
//公司工作
regexps["(.*)I'm Emma, the company's secretary. You look like you will be very productive today!"] = "$1 您好，我是公司的秘书Emma。您今天看起来非常有活力！";
regexps["Fantastic job, (.*)!  I'm already looking forward to seeing you again tomorrow. Bye!"] = "太棒了 $1，我很期待明天再见到你！";
regexps["Hi (.*)\\! Did you work long hours yesterday\\? You look a bit exhausted\\. Why don't you use some health kits\\? You will be much more productive when you are in good health\\."] = "嗨$1，你昨天是否有加班呢?你看起来有一点疲劳。";
regexps["Hi (.*)\\! Wow\\, you look devastated\\! Too much after work party yesterday\\? Better use some health kits before you start working."] = "嗨$1， 你看起来很憔悴，是不是昨天下班后聚会太多了呢？";
regexps["Basic productivity"] = "基本生产力";
regexps["Battles I can Fight in"] = "我可以参加的战役";
regexps["My land"] = "我的地盘";
regexps["Economy Skill \\:"] = "工作技能 :";
regexps["You cannot resign your job in the first 3 days, you can try again on(.*)after (.*)."] = "你不能在申请新工作后的头3天辞职，如果你想辞职，请在$1的$2点以后再试。（或者写信给你老板炒你鱿鱼）";


//训练
regexps["Strength level: (.*) / (.*) for the next Super Soldier Medal"] = "您目前力量为: $1。达到$2可获得超级大兵的成就奖章";
regexps["Awesome performance,  (.*)! Can't wait to have the next training session with you!"] = "表现真棒 $1，我等不及在明天的训练中见到你的表现！";
regexps["Welcome, (.*)\\! I am Lana\\. Ready for your daily military training\\? Remember\\: the more trained you are\\, the more damage you do in battles and the more Super Soldier Medals you win\\! Good luck\\!"] = "欢迎你 $1，我是你的训练员Lana，准备好要开始今天的训练了吗?请记住，你训练得越多，您就可以有更高的攻击力以及得到更多的奖章，祝你好运!";
regexps["Hello (.*)\\! You look a bit tired today\\. Why don't you use a few health kits\\? Your training will be more effective if you are healthy\\."] = "嗨 $1，你看起來有一点累，不过这并不会影响你的训练结果!";
//battle
regexps["(\\d*) rank points"] ="$1 军阶点数";

if (document.location.toString().indexOf("/military/")!=-1) {regexps["Battle (\\d*)"] ="第 $1 回合战斗";}


regexps["Are you still there?"] ="你还在吗?";
regexps["I'm still here"] ="我还在";



//就业市场
regexps["You already have a job at (.*)(\\.) To apply for this job you have to quit your current job."] = "您已经在 $1 有一份工作。若要申请工作，您必须辞职。";
regexps["Skill level"] = "技能等级";
//角色概况
regexps["^General Manager$"] = "经理";
regexps["^Friends\\((\\d*)\\)"] = "好友 ($1)";

//国家目标
regexps["\\((.*) increase\\)"] = "(增长率：$1)";//人口
regexps["On day (.*) have a population of (.*) citizens"] = "在 Day $1 达到到 $2 个公民";
regexps["On day (.*) have a GDP of (.*) Gold"] = "在 Day $1 达到GDP $2 黃金";
regexps["On day (.*) keep control of the following regions:"] = "在 Day $1 保持控制以下地区：";
regexps["On day (.*) own control of the following regions:"] = "在 Day $1 夺得以下地区：";
//国家资料
regexps["Regions \\((\\d*)\\)"] = "地区 ($1)";
regexps["Citizens"] = "公民";
regexps["Active resistance wars in (.*)"] = "目前在$1境內的起义战争";
regexps["Active wars in (.*)"] = "目前在$1境內的可参与战事";
regexps["Proposed by"] = "本法案提案人: ";
regexps["Your proposals"] = "您目前提案额度: ";
regexps["The tax must be between (\\d*) and (\\d*)"] = "税率必须在 $1%到 $2%的范围之內";



//购买黄金
regexps["I have read and agree with the(.*)"] = "我已阅读并接受 $1";
//公司
regexps["Employee list \\((\\d*)\\)"] = "员工列表 ($1)";
regexps["Show Employees"] = "查看员工列表";
regexps["employees"] = "个员工";
regexps["Job offers \\((\\d*)\\)"] = "工作职位 ($1)";
//regexps["Total (.*) stock"] = "目前总库存为：$1";
regexps["View storage"] = "进入仓库";
regexps["View all accounts"] = "查看所有资金账户";
regexps["You can view your market licences and sell products directly from your"] = "你可以从仓库查看你所有在售的货物";
regexps["Storage Facility"] = "";
regexps["This data is confidential"] = "机密资料";
regexps["Special industry migration available"] = "原料产业优惠政策";
regexps["You are allowed to a one-time migration of your company's industry"] = "您有一次机会转换您的原料厂产业类型";
//regexps["No job offer was specified"] = "請填入正確職缺資料";
regexps["This company can be put on sale starting with Day (.*) of the New World, at (\\d*):(\\d*) \\(10 days since it was created or bought\\)\\."] = "这个公司只能于Day $1 $2:$3 之后进行转让 \(在公司创立或是购入10天以内不能被转让\)";

//军团
regexps["Members"] = "军团成员";


//政党
regexps["Do you agree to represent your party in the congress election in (.*)(\\?)"] = "您是否同意代表您的政党去参选 $1 的议员?";
regexps["Increase population (.*)"] = "提高人口 $1";
regexps["Each party can propose a maximum number of (\\d*) candidates per region."] = " 在每个地区，每个政党最多可以提出$1名候选人。",
regexps["Next election in"] = " 距离下次选举： ",
regexps["(\\d*) days$"] = " $1 天";

if (document.location.toString().indexOf("/party/")!=-1)
{
regexps["(\\d*)candidates"] = " $1 个候选人";
regexps["(\\d*)candidate"] = " $1 个候选人";
};
regexps["^Party candidates"] = "党内候选人";
regexps["No candidates applied yet"] = "暂时没有人参选";
regexps["Supporting parties"] = "支持的政党";
regexps["^Party(.*)"] = "回到政党页面";


//邀请好友
regexps["Invite your friends and get 10% of all Gold they will receive in eRepublik from Treasure Maps and purchases. Check the"] = "邀请您的朋友就可以获得朋友所获得的金币总量的10%。查看细节";
//选举
regexps["You only have (.*) experience points. To access this feature you need at least (.*) experience points \\(experience level (.*)\\)."]="您目前只有$1点经验值，使用这个功能，您至少需要有 $2 点经验值(等級Lv $3)。"; //不知道其他地方會不會出現類似的訊息
regexps["Increase population"] = "人口增长率",
regexps["Increase GDP"] = "GDP增长率",
regexps["by"] = "",
//议案

regexps["Proposing presidential impeachment is not possible in the last (\\d*) days of the presidential mandate."] = "不可以在总统任期的最后$1天时提出总统弹劾议案。",
regexps["Citizen fee change from (.*) to (.*)"] = "公民费从 $1 调整到 $2 ";
regexps["Minimum wage change from (.*) to (.*)"] = "最低工资从 $1 调整到 $2 ";
regexps["Do you agree to transfer (.*) from the country accounts to (.*)\\?"] = "您是否同意从国库转移 $1 到 $2？";
regexps["Do you agree with the proposal to issue (.*) for (.*) GOLD\\?"] = "您是否同意以 $2 黃金发型 $1 货币的议案？";
regexps["(.*) has been proposed as Natural Enemy."] = "您是否同意将$1设定为国家死敌？";
regexps["(.*) has declared (.*) as a Natural Enemy"] = "$1正式宣布$2为国家死敌";
regexps["President of (.*) proposed a mutual protection pact with (.*)"] = "$1的总统提出了与$2签订共同防御条约(MMP)的议案";
regexps["Do you agree that (.*) should buy a Defense System of quality (.*) from (.*) at the price of (.*) (.*) for"] = "你是否同意$1应该从制造商$3处购买等级$2的防御设施\(价格为$4 $5\)，并且放置在";
regexps["Do you agree that (.*) should buy a Hospital of quality (.*) from (.*) at the price of (.*) (.*) for"] = "你是否同意$1应该从制造商$3处购买等级$2的医院\(价格为$4 $5\)，并且放置在";
regexps["The President of (.*) demanded a sum of (.*) gold from your National Treasury in return to a peace treaty with (.*)"] = "$1的总统要求以$2 Gold换取和平停战条约";
regexps["Do you want the current president of (.*) to end this office?"] = "请问您是否同意弹劾总统$1?";

//黄金奖励
if (document.location.toString().indexOf("/gold-bonus/")!=-1) {regexps["Collect(.*)Gold"] ="收集$1Gold";}
regexps["Storage \\(capacity: (.*)\\)"] ="仓库 (容量:$1)";

//仓库
//regexps["Tax / unit:(.*)"] = "单个产品税：$1";


//测试部分
//regexps["You have successfully resigned."] = "";



//公司管理
regexps["^Manage accounts(.*)\\((\\d*)\\)$"] = "管理账户 ($2)";
regexps["raw material req. per food"] = "份原料/产品";
regexps["raw material req. per weapon"] = "份原料/产品";
//============================================================================
/*
var mr = undefined;
if (document.location.toString().indexOf("citizen/profile")!=-1) {
regexps["Recruit"] = "二等兵";
regexps["Private"] = "一等兵";
regexps["Corporal"] = "下士";
regexps["Sergeant"] = "上士";
regexps["Lieutenant"] = "少尉";
regexps["Captain"] = "上尉";
regexps["Major"] = "少校";
regexps["Commander"] = "指挥官";
regexps["Lt Colonel"] = "中校";
regexps["Colonel"] = "上校";
regexps["General"] = "将军";
regexps["Field Marshal"] = "元帅";
regexps["Supreme Marshal"] = "大元帅";
regexps["National Force"] = "国家卫队";
regexps["World class Force"] = "国际军";
regexps["Legendary Force"] = "传奇卫队";
regexps["God of War"] = "战神";
}

if (document.location.toString().indexOf("main")!=-1) {
regexps["Recruit"] = "二等兵";
regexps["Private"] = "一等兵";
regexps["Corporal"] = "下士";
regexps["Sergeant"] = "上士";
regexps["Lieutenant"] = "少尉";
regexps["Captain"] = "上尉";
regexps["Major"] = "少校";
regexps["Commander"] = "指挥官";
regexps["Lt Colonel"] = "中校";
regexps["Colonel"] = "上校";
regexps["General"] = "将军";
regexps["Field Marshal"] = "元帅";
regexps["Supreme Marshal"] = "大元帅";
regexps["National Force"] = "国家卫队";
regexps["World class Force"] = "国际军";
regexps["Legendary Force"] = "传奇卫队";
regexps["God of War"] = "战神";
}
*/


translateWholePage = function(e) 
{
	////
	trim = function (str) 
	{
		str = new String(str);
		return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
	};
	////
	matchRegexps = function(key) 
	{
		var key = trim(key);
		key = new String(key);
		if (key===null) 
		{
			return undefined;
    	}
    ////
    	for (var reg in regexps) 
		{
        	var rrrr = new RegExp(reg);	
        	var result = key.match(rrrr);

        	if (key.match(rrrr)!==null) 
			{
            	return key.replace(rrrr,regexps[reg]);	
        	}
    	}
		return undefined;
	};

	translateWithRegexp = function(key) 
		{ 
			if (strings[key]!==undefined) 
			{
			
				return strings[key];
			
			} 
			else 
				{
					var key2 = trim(key);
					if (strings[key2]!==undefined) 
					{
			
						return strings[key2];
					}
				}
			return matchRegexps(key);
		
		};

	var allTrans = 
	{
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
  ////
  	var node = undefined;
  	for (var tagName in allTrans) 
	{
    	var tags = document.getElementsByTagName(tagName);
    	for (var key in tags) 
		{
      		node = tags[key];      
			if ( node.tagName == "INPUT" && node.type == "submit" || node.type == "button" ||node.type == "text" )
      		{
        		var translation = translateWithRegexp(node.value);
        		if (translation!==undefined)
				{
          			node.value = translation;
        		}
      		}
      
      	else if (node.childNodes) 
		{
	  
        	if (node.childNodes.length<=9) 
			{
		
          		for (var i=0;i<node.childNodes.length;i++) 
				{
            		if (node.childNodes[i].nodeName=="#text")
					{
              			translation = translateWithRegexp(node.childNodes[i].nodeValue);
             			if (translation!==undefined) 
						{
              	 			node.childNodes[i].nodeValue = translation;
              			}
            		}
          		}
		
        	}	
      	} 
		else 
			{
				var translation = translateWithRegexp(node.innerHTML);
        		if (translation!==undefined) 
				{
          			node.innerHTML = translation;
        		}
      		}
    	}
  	}
}
$(function(e) {translateWholePage(e);});








//其他
var Experiencelevel = $("div#experienceTooltip > strong").eq(0).text();
var Experiencepoints = $("div#experienceTooltip > strong").eq(1).text();
var Nextlevelat = $("div#experienceTooltip > strong").eq(2).text();
$("div#experienceTooltip").html(
								"<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />"+
								"经验等级: <strong>"+ Experiencelevel +"</strong><br />"+
								"经验点数: <strong>"+ Experiencepoints +"</strong> / <strong>"+ Nextlevelat +"</strong><br />"
								);
$("div#wellnessTooltip").html(
								"<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />"+
								"&bull;&nbsp;体力维持得越高越有生产力。<br />"+
								"&bull;&nbsp;工作、训练、战斗都会降低体力。<br />"+
								"&bull;&nbsp;房屋、体力包、食物、医院等都可恢复体力。"
								);
var hltrt = $("div#eatFoodTooltip > big").text();
$("div#eatFoodTooltip").html(
								"<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />"+
								"<p>体力低于100时按这里可以使用仓库中的食物补满体力</p>"+
								"<p>食物可在市场购买。</p>"+
								"<p style=\"margin:0\">每天最多可回复300体力,目前还剩: <big>"+ hltrt+ "</big>"+
								"<img class=\"mini_health\" src=\"http://www.erepublik.com/images/modules/_icons/mini_health.png\" alt=\"\" /></p>"
								);
//更改特定CSS
//$("tbody").css("font-size","12px "); 
//$("a.dotted").css("font-size","12px ");
//$("#menu ul li#menu2 a").css("background-image","url(\"http://i.imgur.com/u1h0F.png\")");
//$("#menu ul li#menu3 a").css("background-image","url(\"http://i.imgur.com/u1h0F.png\")");
//$("#menu ul li#menu4 a").css("background-image","url(\"http://i.imgur.com/u1h0F.png\")");
//$("#menu ul li#menu5 a").css("background-image","url(\"http://i.imgur.com/u1h0F.png\")");


$('a.tab1 > strong').text("购买黄金");
$('a.tab3 > strong').text("黄金奖励");
$('a.tab4 > strong').text("获得体力");
$('a#RES_ID_fb_login_text').remove();

