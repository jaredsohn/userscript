// ==UserScript==
// @name		GaiaOnline Enhancement Suite
// @author		skeate
// @include		http://www.gaiaonline.com/*
// @include		http://gaiaonline.com/*
// ==/UserScript==

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

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (C) Paul Johnston 1999 - 2000.
 * Updated by Greg Holt 2000 - 2001.
 * See http://pajhome.org.uk/site/legal.html for details.
 */
var f="0123456789abcdef";function g(e){str="";for(j=0;j<=3;j++)str+=f.charAt(e>>j*8+4&15)+f.charAt(e>>j*8&15);return str}function h(e,l){var n=(e&65535)+(l&65535);return(e>>16)+(l>>16)+(n>>16)<<16|n&65535}function k(e,l,n,o,p,q){return h(h(h(l,e),h(o,q))<<p|h(h(l,e),h(o,q))>>>32-p,n)}function m(e,l,n,o,p,q,r){return k(l&n|~l&o,e,l,p,q,r)}function s(e,l,n,o,p,q,r){return k(l&o|n&~o,e,l,p,q,r)}function t(e,l,n,o,p,q,r){return k(n^(l|~o),e,l,p,q,r)}
calcMD5=function(e){nblk=(e.length+8>>6)+1;blks=Array(nblk*16);for(i=0;i<nblk*16;i++)blks[i]=0;for(i=0;i<e.length;i++)blks[i>>2]|=e.charCodeAt(i)<<i%4*8;blks[i>>2]|=128<<i%4*8;blks[nblk*16-2]=e.length*8;x=blks;a=1732584193;b=-271733879;c=-1732584194;d=271733878;for(i=0;i<x.length;i+=16)olda=a,oldb=b,oldc=c,oldd=d,a=m(a,b,c,d,x[i+0],7,-680876936),d=m(d,a,b,c,x[i+1],12,-389564586),c=m(c,d,a,b,x[i+2],17,606105819),b=m(b,c,d,a,x[i+3],22,-1044525330),a=m(a,b,c,d,x[i+4],7,-176418897),d=m(d,a,b,c,x[i+5],12,1200080426),c=m(c,d,a,b,x[i+6],17,-1473231341),b=m(b,c,d,a,x[i+7],22,-45705983),a=m(a,b,c,d,x[i+8],7,1770035416),d=m(d,a,b,c,x[i+9],12,-1958414417),c=m(c,d,a,b,x[i+10],17,-42063),b=m(b,c,d,a,x[i+11],22,-1990404162),a=m(a,b,c,d,x[i+12],7,1804603682),d=m(d,a,b,c,x[i+13],12,-40341101),c=m(c,d,a,b,x[i+14],17,-1502002290),b=m(b,c,d,a,x[i+15],22,1236535329),a=s(a,b,c,d,x[i+1],5,-165796510),d=s(d,a,b,c,x[i+6],9,-1069501632),c=s(c,d,a,b,x[i+11],14,643717713),b=s(b,c,d,a,x[i+0],20,-373897302),a=s(a,b,c,d,x[i+5],5,-701558691),d=s(d,a,b,c,x[i+10],9,38016083),c=s(c,d,a,b,x[i+15],14,-660478335),b=s(b,c,d,a,x[i+4],20,-405537848),a=s(a,b,c,d,x[i+9],5,568446438),d=s(d,a,b,c,x[i+14],9,-1019803690),c=s(c,d,a,b,x[i+3],14,-187363961),b=s(b,c,d,a,x[i+8],20,1163531501),a=s(a,b,c,d,x[i+13],5,-1444681467),d=s(d,a,b,c,x[i+2],9,-51403784),c=s(c,d,a,b,x[i+7],14,1735328473),b=s(b,c,d,a,x[i+12],20,-1926607734),a=k(b^c^d,a,b,x[i+5],4,-378558),d=k(a^b^c,d,a,x[i+8],11,-2022574463),c=k(d^a^b,c,d,x[i+11],16,1839030562),b=k(c^d^a,b,c,x[i+14],23,-35309556),a=k(b^c^d,a,b,x[i+1],4,-1530992060),d=k(a^b^c,d,a,x[i+4],11,1272893353),c=k(d^a^b,c,d,x[i+7],16,-155497632),b=k(c^d^a,b,c,x[i+10],23,-1094730640),a=k(b^c^d,a,b,x[i+13],4,681279174),d=k(a^b^c,d,a,x[i+0],11,-358537222),c=k(d^a^b,c,d,x[i+3],16,-722521979),b=k(c^d^a,b,c,x[i+6],23,76029189),a=k(b^c^d,a,b,x[i+9],4,-640364487),d=k(a^b^c,d,a,x[i+12],11,-421815835),c=k(d^a^b,c,d,x[i+15],16,530742520),b=k(c^d^a,b,c,x[i+2],23,-995338651),a=t(a,b,c,d,x[i+0],6,-198630844),d=t(d,a,b,c,x[i+7],10,1126891415),c=t(c,d,a,b,x[i+14],15,-1416354905),b=t(b,c,d,a,x[i+5],21,-57434055),a=t(a,b,c,d,x[i+12],6,1700485571),d=t(d,a,b,c,x[i+3],10,-1894986606),c=t(c,d,a,b,x[i+10],15,-1051523),b=t(b,c,d,a,x[i+1],21,-2054922799),a=t(a,b,c,d,x[i+8],6,1873313359),d=t(d,a,b,c,x[i+15],10,-30611744),c=t(c,d,a,b,x[i+6],15,-1560198380),b=t(b,c,d,a,x[i+13],21,1309151649),a=t(a,b,c,d,x[i+4],6,-145523070),d=t(d,a,b,c,x[i+11],10,-1120210379),c=t(c,d,a,b,x[i+2],15,718787259),b=t(b,c,d,a,x[i+9],21,-343485551),a=h(a,olda),b=h(b,oldb),c=h(c,oldc),d=h(d,oldd);return g(a)+g(b)+g(c)+g(d)};

// GreaseMonkey API compatibility for Chrome
// @copyright      2009, 2010 James Campos
// @modified		2010 Steve Sobel - added some missing gm_* functions
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if ((typeof GM_deleteValue == 'undefined') || (typeof GM_addStyle == 'undefined')) {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		var head = document.getElementsByTagName('head')[0];
		if (head) {
			head.appendChild(style);
		}
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	 GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
	
	GM_xmlhttpRequest=function(obj) {
		var request=new XMLHttpRequest();
		request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
		request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
		try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
		if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
		request.send(obj.data); return request;
	}

}


function lightbox_create(contents){
	outer = document.createElement("div");
	outer.id = "ges_lightbox_outer";
	inner = document.createElement("div");
	inner.id = "ges_lightbox_inner";
	$("body").append(outer);
	$("#ges_lightbox_outer").append(inner);
	$("#ges_lightbox_outer").css({
		display: "table",
		position: "fixed",
		top: "0px",
		left: "0px",
		bottom: "0px",
		right: "0px",
		height: "100%",
		width: "100%",
		zIndex: "1000"
	});
	$("#ges_lightbox_inner").css({
		width: "100%",
		background: "rgba(0,0,0,0.75)",
		color: "white",
		display: "table-cell",
		verticalAlign: "middle",
		textAlign: "center"
	});
	closer = document.createElement("div");
	$(closer).css({
		position: "absolute",
		height: "100%",
		width: "100%",
		top: "0px",
		left: "0px"
	});
	$(contents).css({position:"relative"});
	$(closer).click(lightbox_destroy);
	$("#ges_lightbox_inner").append(closer);
	$("#ges_lightbox_inner").append(contents);
}

function lightbox_destroy(){
	$("#ges_lightbox_outer").fadeOut("fast",function(){
		$("#ges_lightbox_outer").remove();
	});
}

function custom_callback_wrapper(callee,cb){
	return function(data){
		callee(data,cb);
	};
}

function ges_update_ignored_list(cb){
	GM_setValue("ges_ignore_list","[]")
	GM_setValue("ges_ignore_list_page",1)
	$.get("http://www.gaiaonline.com/profile/friendlist.php?list=ignored&start=0",custom_callback_wrapper(ges_process_ignore_list,cb));
}

var ges_alert_queue = [];
var ges_alert_showing = false;

function ges_alert_enqueue(el){
	ges_alert_queue.splice(0,0,el);
	ges_alert_show();
}

function ges_alert_show(timeout){
	if( ges_alert_showing ){
		if( timeout ){
			if( ges_alert_queue.length > 0 ){
				;
			} else {
				ges_alert_hide();
			}
		}
	} else {
		ges_alert_showing = true;
		alert_box = document.createElement("div");
		$(alert_box).attr("id","ges_alert_box");
		$(alert_box).css({
			display: "none",
			position: "fixed",
			zIndex: "500",
			right: "0px",
			bottom: "0px",
			width: "300px",
			height: "250px",
			background: "rgba(0,0,0,.4)",
			pointerEvents: "none"
		});
		$(alert_box).append(ges_alert_queue.pop());
		$("body").append(alert_box);
		$(alert_box).fadeIn();
		setTimeout(function(){ges_alert_show(true);},GM_getValue("ges_alert_interval",5)*1000);
	}
}

function ges_alert_hide(){
	ges_alert_showing = false;
	$("#ges_alert_box").fadeOut();
}

function ges_process_ignore_list(data,cb){
	ignorelist = JSON.parse(GM_getValue("ges_ignore_list","[]"))
	ignoredcount = /\d+ to \d+ of (\d+)/.exec($("#viewlist",data).text())[1];
	$("#listdetail .username a",data).each(function(){
		ignorelist.push($(this).attr("title"));
	});
	if( ignorelist.length < ignoredcount ){
		GM_setValue("ges_ignore_list",JSON.stringify(ignorelist));
		page = GM_getValue("ges_ignore_list_page",1);
		GM_setValue("ges_ignore_list_page",page+1)
		$.get("http://www.gaiaonline.com/profile/friendlist.php?list=ignored&start="+(page*50),custom_callback_wrapper(ges_process_ignore_list,cb));
	} else {
		GM_setValue("ges_ignore_list",JSON.stringify(ignorelist));
		cb();
	}
}

function ges_update_friend_list(cb){
	GM_setValue("ges_friend_list","[]")
	GM_setValue("ges_friend_list_page",1)
	$.get("http://www.gaiaonline.com/profile/friendlist.php?start=0",custom_callback_wrapper(ges_process_friend_list,cb));
}

function ges_process_friend_list(data,cb){
	friendlist = JSON.parse(GM_getValue("ges_friend_list","[]"))
	friendcount = /\d+ to \d+ of (\d+)/.exec($("#viewlist",data).text())[1];
	$("#listdetail .username a",data).each(function(){
		friendlist.push($(this).attr("title"));
	});
	if( friendlist.length < friendcount ){
		GM_setValue("ges_friend_list",JSON.stringify(friendlist));
		page = GM_getValue("ges_friend_list_page",1);
		GM_setValue("ges_friend_list_page",page+1)
		$.get("http://www.gaiaonline.com/profile/friendlist.php?start="+(page*50),custom_callback_wrapper(ges_process_friend_list,cb));
	} else {
		GM_setValue("ges_friend_list",JSON.stringify(friendlist));
		cb();
	}
}

function ges_quick_post(post_url,text,nonce){
	$.post(post_url,{message:text,action_submit:"submit",nonce:nonce},function(data){
		res = JSON.parse(data);
		if( res.status )
			window.location = res.url;
		else{
			$("body").append("<div id=\"bigexclo\"><span id=\"bigexcl\">!</span></div>");
			$("#bigexclo").css({
				display: "table",
				position: "fixed",
				top: "0px",
				left: "0px",
				bottom: "0px",
				right: "0px",
				width: "100%",
				zIndex: "1000"
			});
			$("#bigexcl").css({
				width: "100%",
				background: "rgba(0,0,0,0)",
				color: "red",
				display: "table-cell",
				verticalAlign: "middle",
				textAlign: "center",
				fontSize: "200pt"
			});
			setTimeout(function(){$("#bigexclo").fadeOut("slow",function(){$(this).remove();});},1000);
		}
	});
}

var modules =
[
	{
		name: "Better Ignore",
		description: "Hides threads created by users on your ignore list.",
		options:
		[
			{
				type: "action",
				label: "Update locally stored ignore list",
				action: ges_update_ignored_list,
				wait_text: "Updating, please wait..."
			}
		],				
		run: function(){
			// Remove threads in the forum listing
			ignorelist = JSON.parse(GM_getValue("ges_ignore_list","[]"));
			cignorelist = JSON.parse(GM_getValue("ges-custom-ignore-list","[]"));
			$(".forum-list .creator a").each(function(){
				if( $.inArray($(this).text(),ignorelist) != -1 || $.inArray($(this).text(),cignorelist) != -1)
					$(this).parents("tr").remove();
			});
			$(".forum-list tbody tr").removeClass();
			$(".forum-list tbody tr:even").addClass("rowon");
			$(".forum-list tbody tr:odd").addClass("rowoff");
			
			// Enable faster ignoring
			$("#avatar_menu #ignore a").live("mousedown",function(e){
				uid = $(this).attr("href").match(/hook=(\d+)&/)[1];
				$(this).attr("href","javascript:");
			});

			$("#avatar_menu #ignore a").live("mouseup",function(){
				box = $("<form method=\"post\" action=\"/profile/friendlist.php?"+uid+"\"><div><h2>Ignore</h2>"+
					"<div>Are you sure you want to ignore this user? Click outside this window to cancel.</div>"+
					"<div><input type=\"submit\" name=\"submit\" value=\"Ignore\" /></div></div></form>");
				$(box).append("<input type=\"hidden\" name=\"action\" value=\"Add Ignored\" />"+
					"<input type=\"hidden\" name=\"user_ids[]\" value=\""+uid+"\" />");
				$(box).find("input:submit").click(function(e){
					e.preventDefault();
					args = {};
					$(box).find("input").each(function(){
						if ($(this).attr("name") == "submit") return;
						args[$(this).attr("name")] = $(this).val();
					});
					$.post($(box).attr("action"),args,function(data){
						$(".username_list li",data).each(function(){
							ignorelist.push($(this).text());
						});
						GM_setValue("ges_ignore_list",JSON.stringify(ignorelist));
						$(box).html("<h3>Success!</h3>");
						setTimeout(lightbox_destroy,1000);
					});
					$(box).html("<img src=\"http://imgur.com/iuV4k.gif\" />");
					return false;
				});
				$(box).children("div").css({
					width: "300px",
					border: "3px double white",
					marginLeft: "auto",
					marginRight: "auto",
					padding: "5px"
				});
				$(box).find("div div").css({
					clear: "both",
					padding: "5px"
				});
				$(box).find("div h2").css({
					fontFamily: "serif",
					cssFloat: "left"
				});
				$(box).find("textarea").css({
					background: "none",
					border: "1px solid white",
					color: "white",
					cssFloat: "right",
					verticalAlign: "middle",
					padding: "2px"
				});
				$(box).find("input").css({
					background: "none",
					border: "1px solid white",
					color: "white",
					clear: "both"
				});
				$(box).find("div a").css({
					textDecoration: "none",
					cssFloat: "right",
					color: "white"
				});
				lightbox_create(box);
				return false;
			});
		}
	},
	{
		name: "Thread Filter",
		description: "Hides threads with keywords in the title or more than a certain number of replies.",
		options: 
		[
			{
				type: "text",
				label: "Forums to filter (blank=all)",
				varname: "ges_filter_forums",
				initial: "23",
				check: /^([0-9]+, ?)*([0-9]+)?$/
			},
			{
				type: "text",
				label: "Reply display limit (0=disable)",
				varname: "ges_filter_limit",
				initial: "0",
				check: /^[0-9]+$/
			},
			{
				type: "toggle",
				label: "Filter ALL CAPS",
				varname: "ges_filter_allcaps",
				initial: false
			},
			{
				type: "toggle",
				label: "Advanced Mode",
				varname: "ges_filter_advanced",
				initial: false
			},
			{
				type: "textbox",
				label: "Title filters (one per line)",
				varname: "ges_filter_list",
				initial: ""
			}
		],
		run: function(){
			forums = GM_getValue("ges_filter_forums","23").split(", ");
			filters = GM_getValue("ges_filter_list","").split("\n");
			advanced = GM_getValue("ges_filter_advanced",false);
			allcaps = GM_getValue("ges_filter_allcaps",false);
			limit = GM_getValue("ges_filter_limit","0");
			if( document.URL.match(/(\/f\.|list\/)([0-9]+)(_.*?)?\//) ){
				forumid = document.URL.match(/(\/f\.|list\/)([0-9]+)(_.*?)?\//)[2];
				if( forums.length == 0 || forums.indexOf(forumid) != -1 ){
					filters = filters.filter(function(x){return x!=""});
					filters = filters.map(function(x){ if( advanced ) return new RegExp(x,"i"); else return new RegExp("\\b"+x+"\\b","i")});
					if( allcaps ){
						filters.push(new RegExp("^[^a-z]*$"));
					}
					if( limit != "0" ) $(".forum-list .replies").filter(function(){return parseInt($(this).text())>parseInt(limit);}).parent().remove();
					$(".forum-list td.title div > a:not(.goto-new-posts)").each(function(){
						for( idx in filters )
							if( filters[idx].test($(this).text()) )
								$(this).parents("tr:first").remove();
					});
				}
			}
			$(".forum-list tbody tr").removeClass();
			$(".forum-list tbody tr:even").addClass("rowon");
			$(".forum-list tbody tr:odd").addClass("rowoff");
		}
	},
	{
		name: "Thread Highlighter",
		description: "Highlights threads meeting certain criteria.",
		options:
		[
			{
				type: "text",
				label: "Limit highlight color (e.g., #FFD700)",
				varname: "ges_thread_highlight_color",
				check: /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
				initial: "#FFD700"
			},
			{
				type: "text",
				label: "Highlight limit (0 = disabled)",
				varname: "ges_thread_highlight_limit",
				check: /^[0-9]+$/,
				initial: "0"
			},
			{
				type: "text",
				label: "Friend highlight color (e.g., #78D0CC)",
				varname: "ges_thread_highlight_friend_color",
				check: /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
				initial: "#78D0CC"
			},
			{
				type: "toggle",
				label: "Highlight friends' threads",
				varname: "ges_thread_highlight_friends",
				initial: false
			},
			{
				type: "text",
				label: "Self highlight color (e.g., #C5B8F5)",
				varname: "ges_thread_highlight_self_color",
				check: /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
				initial: "#C5B8F5"
			},
			{
				type: "toggle",
				label: "Highlight own threads",
				varname: "ges_thread_highlight_self",
				initial: false
			},
			{
				type: "action",
				label: "Update locally stored friend list",
				action: ges_update_friend_list,
				wait_text: "Updating, please wait..."
			}
		],
		run: function(){
			limit = GM_getValue("ges_thread_highlight_limit","0");
			color = GM_getValue("ges_thread_highlight_color","#ffd700");
			fcolor = GM_getValue("ges_thread_highlight_friend_color","#78D0CC");
			scolor = GM_getValue("ges_thread_highlight_self_color","#C5B8F5");
			$(".forum-list .replies").filter(function(){return parseInt($(this).text())<parseInt(limit);}).parent().css("background",color);
			if( GM_getValue("ges_thread_highlight_self",false) ){
				var username = $(".avatarName span").text();
				username = username.substr(0,username.length-1);
				$(".forum-list .creator a").each(function(){
					if( $(this).text() == username )
						$(this).parents("tr").css("background",scolor);
				});
			}
			if( GM_getValue("ges_thread_highlight_friends",false) ){
				friendlist = JSON.parse(GM_getValue("ges_friend_list","[]"));
				$(".forum-list .creator a").each(function(){
					if( $.inArray($(this).text(),friendlist) != -1 )
						$(this).parents("tr").css("background",fcolor);
				});
			}
		}
	},
	{
		name: "Quickbump",
		description: "Enables you to quickly post a prewritten post to a thread.",
		options: false,
		run: function(){
			this_id = document.URL.match(/\/t\.([0-9]+)(_.*?)?\//);

			post_url = "";
			if( this_id != null ) post_url = "http://www.gaiaonline.com/forum/compose/ajaxentry/new/"+this_id[1]+"/";

			$(".thread_options").prepend("<a class=\"cta-button-md quickbump gray-button\" href=\"#\">"+
				//"<span class=\"button_cap\">&nbsp;</span>"+
				"<span class=\"button_text\">QuickBump</span></a>");

			$("#qr_submit").before("<a class=\"info_button\" id=\"savequickbump\" href=\"#\" style=\"float:left;margin:10px 0px 0px 15px;\">"+
				"<span class=\"button_cap\">&nbsp;</span>"+
				"<span class=\"button_text\">Save as QuickBump</span></a>");

			$("#savequickbump").click(function(e){
				e.preventDefault();
				if( $("#qr_text").val() != "" ){
					GM_setValue("ges_quickbump_bumptext",$("#qr_text").val());
					$("#savequickbump span:last").text("Saved!");
					setTimeout(function(){$("#savequickbump span:last").text("Save as QuickBump");},2000);
				}
			});

			$(".quickbump").click(function(e){
				e.preventDefault();
				ges_quick_post(post_url,GM_getValue("ges_quickbump_bumptext","bump"),$("#qr_container input[name='nonce']").val());
			});
		}
	},
	{
		name: "QuickQuote",
		description: "Enables a Quick Reply-like drop box for quoting.",
		options: false,
		run: function(){
			this_id = document.URL.match(/\/t\.([0-9]+)(_.*?)?\//);
			post_url = "";
			if( this_id != null ) post_url = "http://www.gaiaonline.com/forum/compose/ajaxentry/new/"+this_id[1]+"/";
			
			$(".post-options > ul li:first-child").each(function(){
				$(this).children("a").removeClass("cta-button-sm").addClass("cta-dropdown-sm-label");
				href = $(this).children("a:first").attr("href");
				$(this).append('<a href="'+href+'" class="cta-dropdown-sm-arrow" title="Quick Quote this post"></a>');
				$(this).children(".cta-dropdown-sm-arrow").click(function(e){
					e.preventDefault();
					if( $(e.target).parent().children(".ges-qq-box").length == 0 ){
						p = $(e.target).parent();
						t = $(e.target).height();
						$(p).css("position","relative");
						$(p).append('<div class="ges-qq-box"><img src="http://s.cdn.gaiaonline.com/images/loader.gif" /></div>');
						$(".ges-qq-box",p).css({
							position: "absolute",
							top: t+"px",
							left: "0px",
							width: "321px",
							height: "211px",
							padding: "10px",
							background: "white",
							border: "1px solid #98AEB7",
							zIndex: "192"
						});
						$(".ges-qq-box",p).click(function(e){ e.stopImmediatePropagation(); });
						$.get($(e.target).attr("href"),custom_callback_wrapper(function(data,context){
							if( $("#captcha", data).children().length != 0 ){
								$(".ges-qq-box",context).html("Sorry, you've been captcha'd.  You will need to slow-quote.");
								$(".ges-qq-box",context).append("<br/><button>Close</button>");
								$("button",context).click(function(){$(".ges-qq-box",context).remove();});
							} else{
								var quoted = $("#message",data).val().match(/quote="([^"]+)"/);
								$(".ges-qq-box",context).css({
									background: "#CDD9DD url(http://s.cdn.gaiaonline.com/images/forum/quick_reply_bg.png) no-repeat"
								});
								$(".ges-qq-box",context).html('<h2>Quick Quote</h2><span class="ges-qq-close-span">'+
									'&nbsp;<span class="ges-qq-quoting">(Quoting '+quoted[1]+')</span> <a href="#" class="ges-qq-close"></a></span>'+
									'<textarea class="ges-qq-text" tabindex="4"></textarea>'+
									'<a href="#" class="ges-qq-submit cta-button-sm" tabindex="5"><span>Submit</span></a>');
								if( quoted[1] != $(context).parents(".post").find(".user_name").text() ){
									$(".ges-qq-quoting",context).css("color","red");
								}
								$(".ges-qq-box",context).append('<input type="hidden" class="ges-qq-quoted" value="'+
									+
									'"/>');
								$(".ges-qq-close",context).css({
									cssFloat: "right",
									width: "14px",
									height: "14px",
									marginTop: "3px",
									background: "url(http://s.cdn.gaiaonline.com/images/forum/quick_reply_closeButton.png) no-repeat"
								});
								$("h2",context).css({
									cssFloat: "left",
									marginTop: "0px"
								});
								$(".ges-qq-close",context).click(function(e){
									e.preventDefault();
									$(e.target).parent().parent().css("display","none");
								});
								$(".ges-qq-text",context).css({
									width: "320px",
									height: "150px"
								});
								$(".ges-qq-submit",context).css({
									cssFloat: "right",
									marginTop: "7px"
								});
								$(".ges-qq-submit",context).click(custom_callback_wrapper(function(f,t){
									f.preventDefault();
									ges_quick_post(post_url,$("#message",t).val()+$(f.target).parents("div").find(".ges-qq-text").val(),$("#compose_entry input[name='nonce']",t).val());
								},data));
							}
						},p));
					} else {
						if( $(e.target).parent().children(".ges-qq-box").css("display") == "none" )
							$(e.target).parent().children(".ges-qq-box").css("display","block")
						else
							$(e.target).parent().children(".ges-qq-box").css("display","none")
					}
				});
			});
		}
	},
	{
		name: "Light Text Revealer",
		description: "Reveals light text in posts.",
		options: false,
		run: function(){
			$(".post .content span, .user-sig span").each(function(){
				c = $(this).css("color");
				if( c.substring(0,3) == "rgb" ){
					cs = /rgb\(([0-9]+), ([0-9]+), ([0-9]+)\)/.exec(c);
				} else {
					cs = [0,0,0,0];
				}
				if( c == "white" || .21*cs[1] + .72*cs[2] + .07*cs[3] >= 230 ){
					$(this).css("background","grey");
				}
			});
		}
	},
	{
		name: "Quick Sell",
		description: "Quickly lists items in the marketplace at a 0 starting bid.",
		options: 
		[
			{
				type: "text",
				label: "Password",
				varname: "ges_quicksell_password",
				initial: "",
				check: /.?/,
				obscured: true
			},
			{
				type: "text",
				label: "Minutes to run listing",
				varname: "ges_quicksell_minutes",
				initial: "30",
				check: /^[0-9]+$/
			}
		],
		run: function(){
			password = GM_getValue("ges_quicksell_password","");
			minutes = GM_getValue("ges_quicksell_minutes","30");
			$("#gaia_modal").live("mouseover",function(){
				if( $("#pricing").length && !($("#ges_quick_sell").length)){
					quantity = 0;
					if( $("#basic .quantity").length ){
						quantity = $("#basic .quantity").text().match(/: ([0-9]+)/)[1];
					}
					$("#gaia_modal .controls .close").before(
						'<a class="info_button quicksell" id="ges_quick_sell" href=""><span class="button_cap"></span><span class="button_text">QuickSell</span></a>');
					$("#ges_quick_sell").click(function(e){
						e.preventDefault();
						sell_link = $("#pricing a").attr("href");
						item_id = sell_link.match(/item_id=(\d+)&item_param=(\d+)/)[1];
						item_param = sell_link.match(/item_id=(\d+)&item_param=(\d+)/)[2];
						$.post("http://www.gaiaonline.com/marketplace/mystore/sell/?step=confirm",
							{
								days: "0",
								hours: "0",
								minutes: minutes,
								vend_type: "2",
								starting_bid: "0",
								increment: "0",
								item_id: item_id,
								item_param: quantity>0?quantity:item_param,
								action: ""
							}, function(data){
								if( $("#errorMessage",data).length )
									$("#gaia_modal #basic").text("Error (probably too many items already listed).");
								else {
									nonce = $('input[name="nonce"]',data).val();
									$.post("http://www.gaiaonline.com/marketplace/mystore/sell/?step=submit",
										{
											password: "",
											days: "0",
											hours: "0",
											minutes: minutes,
											vend_type: "2",
											buy_now_price: "0",
											starting_bid: "0",
											increment: "0",
											item_id: item_id,
											item_param: quantity>0?quantity:item_param,
											nonce: nonce,
											chap: calcMD5(calcMD5(password)+nonce),
											action: ""
										},function(data){
											if( $("#interactiveBox .errorMsg input[type='password']",data).length )
												$("#gaia_modal #basic").text("Invalid password.");
											else
												$("#gaia_modal #basic").text("Item listed on the marketplace.");
										}
									);
								}
							}
						);
					});
				}
			});
		}
	},
	{
		name: "Custom Emoticons",
		description: "Configure your own emoticons, usable with :[keyword]:",
		options:
		[
			{
				type: "textbox",
				label: "Emoticon list. One per line, format: keyword url",
				varname: "ges_emoticon_list",
				initial: ""
			}
		],
		run: function(){
			emotes = GM_getValue("ges_emoticon_list","");
			if( emotes ){
				emotes = emotes.split("\n");
				for( i in emotes ) emotes[i] = emotes[i].split(" ");
				replace_emotes = function(text){
					for( i in emotes ){
						if( emotes[i].length >= 2 ){
							text = text.replace(RegExp(":"+emotes[i][0]+":","gi"),"[img]"+emotes[i][1]+"[/img]");
						}
					}
					return text;
				};
				$("#compose_entry").submit(function(){
					$("#message").val(replace_emotes($("#message").val()));
					return true;
				});
				$("#qr_container").live("mouseover",function(){
					if( $("#qr_submit").parent("form").length ){
						$("#qr_submit").wrap('<div id="qr_submit_wrapper" />');
						document.getElementById("qr_submit_wrapper").addEventListener('click',function(e){
							$("#qr_text").val(replace_emotes($("#qr_text").val()));
						}, true);
					}
				});
				$(".ges-qq-text").live("mouseover",function(){
					if( $(this).parent().find(".ges-qq-submit").parent().hasClass("ges-qq-box") ){
						$(this).parent().find(".ges-qq-submit").wrap('<div id="ges_qq_submit_wrapper" />');
						document.getElementById("ges_qq_submit_wrapper").addEventListener('click',function(e){
							$(this).siblings(".ges-qq-text").val(replace_emotes($(this).siblings(".ges-qq-text").val()));
						}, true);
					}
				});
				$("#emoticon_set").append('<option value="Custom">Custom</option>');
				$("#emoticon_set").change(function(e){
					if( $(this).children("option:selected").val() == "Custom" ){
						for( i in emotes ){
							if( emotes[i].length >= 2 ){
								var temp = $('<a href="#">:'+emotes[i][0]+':</a>');
								$(temp).data("url",emotes[i][1]);
								$(temp).click(function(){
									$("#message").val($("#message").val()+$(this).text());
								});
								$(temp).mouseenter(function(e){
									var img = $('<img id="ges-emoticon-image" src="'+$(this).data("url")+'" />"');
									$(img).css({
										position: "absolute",
										top: e.pageY,
										left: e.pageX,
										pointerEvents: "none"
									});
									$("body").append(img);
								});
								$(temp).mouseleave(function(){$("#ges-emoticon-image").remove()});
								$("ul#emoticons").append(temp).append(" ");
							}
						}
					}
				});
			}
		}				
	},
	{
		name: "User Notes",
		description: "Allows you to keep notes about users. Click a username in the forums to add notes.",
		options: false,
		run: function(){
			tabs.push({
				name: "Notes",
				makeDiv: function(div){
					$(div).append("<dl></dl>");
					notes = JSON.parse(GM_getValue("ges-usernotes","{}"));
					for( name in notes ){
						$("dl",div).append("<dt>"+name+"</dt><dd>"+notes[name]+"</dd>");
					}
				}
			});
			$(".postcontent .user_info .user_name").click(function(){
				notes = JSON.parse(GM_getValue("ges-usernotes","{}"));
				if( $(this).text() in notes )
					note = notes[$(this).text()];
				else
					note = "";
				note = prompt("Note for "+$(this).text(),note);
				if( note != null ){
					if( note == "")
						delete notes[$(this).text()];
					else
						notes[$(this).text()] = note;
				}
				GM_setValue("ges-usernotes",JSON.stringify(notes));
			});
		}
	},
	{
		name: "Account Switcher",
		description: "Quickly switch between accounts.",
		options: false,
		run: function(){
			tabs.push({
				name: "Accounts",
				makeDiv: function(div){
					addRow = function(name,pass){
						$("table",div).append(
							"<tr><td>"+name+"</td><td><input type=\"password\" value=\""+pass+"\" /></td><td><button>Delete</button></td></tr>"
						);
						$("table tr button",div).click(function(){
							accounts = JSON.parse(GM_getValue("ges-accounts","{}"));
							name = $(this).parent().siblings(":first").text();
							delete accounts[name];
							GM_setValue("ges-accounts",JSON.stringify(accounts));
							$(this).parent().parent().remove();
						});
						$("table tr input",div).change(function(){
							accounts = JSON.parse(GM_getValue("ges-accounts","{}"));
							name = $(this).parent().siblings(":first").text();
							accounts[name] = $(this).val();
							GM_setValue("ges-accounts",JSON.stringify(accounts));
						});
					};
					$(div).append("<div></div>");
					$("div",div).html(
						"<p>Add a new account:</p>"+
						"<p>Username: <input type=\"text\" /></p>"+
						"<p>Password: <input type=\"password\" /></p>"+
						"<button>Add</button>"
					);
					$("div button",div).click(function(){
						n = $("div input:text",div).val();
						p = $("div input:password",div).val();
						addRow(n,p);
						accounts = JSON.parse(GM_getValue("ges-accounts","{}"));
						accounts[n] = p;
						GM_setValue("ges-accounts",JSON.stringify(accounts));
						$("div input:text",div).val("");
						$("div input:password",div).val("");
					});
					$(div).append("<table></table>");
					$("table",div).css({width: "400px"});
					accounts = JSON.parse(GM_getValue("ges-accounts","{}"));
					for( name in accounts ){
						addRow(name,accounts[name]);
					}
				}
			});
			
			// Make account switcher
			accounts = JSON.parse(GM_getValue("ges-accounts","{}"));
			signedin = $(".avatarName span").text();
			$(".avatarName span").replaceWith("<select></select>");
			for( name in accounts ){
				$(".avatarName select").append("<option value=\""+name+"\""+(name+"!" == signedin ? " selected=\"selected\"":"")+">"+name+"</option>");
			}
			$(".avatarName select").change(function(){
				oldloc = window.location;
				logout = $('.hud-item a[href*="/auth/logout"]').attr("href");
				newlogin = $(this).val();
				$.get(logout,function(data){
					token = $('#memberloginForm input:hidden[name="token"]',data).val();
					sid = $('#memberloginForm input:hidden[name="sid"]',data).val();
					randomtoken = $('#memberloginForm input:hidden[name!="sid"][name!="token"][name!="redirect"]',data);
					randomtoken_name = randomtoken.attr('name');
					randomtoken_val = randomtoken.val();
					args = 
						{
							token:token,
							sid:sid,
							username:newlogin,
							password:"",
							autologin:"on",
							signInButton:"Log+In",
							chap: calcMD5(calcMD5(accounts[newlogin])+token)
						};
					args[randomtoken_name] = randomtoken_val;
					$.post("/auth/login/",args,function(){window.location=oldloc;});
				});
			});
			$(".avatarName select").css({
				fontSize: "8pt"
			});
		}
	},
	{
		name: "Custom Tags",
		description: "Allows you to define custom BBCode-like tags for use in posting.",
		options: false,
		run: function(){
			tabs.push({
				name: "Tags",
				makeDiv: function(div){
					addRow = function(tag,open,close){
						$("table",div).append(
							"<tr><td>"+tag+"</td><td><textarea class=\"ges-customtags-open\">"+open+"</textarea></td>"+
							"<td><textarea class=\"ges-customtags-close\">"+close+"</textarea></td><td><button>Delete</button></td></tr>"
						);
						$("table tr button",div).click(function(){
							tags = JSON.parse(GM_getValue("ges-customtags","{}"));
							tag = $(this).parent().siblings(":first").text();
							delete tags[tag];
							GM_setValue("ges-customtags",JSON.stringify(tags));
							$(this).parent().parent().remove();
						});
						$("table tr .ges-customtags-open",div).change(function(){
							tags = JSON.parse(GM_getValue("ges-customtags","{}"));
							tag = $(this).parent().siblings(":first").text();
							tags[tag].opener = $(this).val();
							GM_setValue("ges-customtags",JSON.stringify(tags));
						});
						$("table tr .ges-customtags-close",div).change(function(){
							tags = JSON.parse(GM_getValue("ges-customtags","{}"));
							tag = $(this).parent().siblings(":first").text();
							tags[tag].closer = $(this).val();
							GM_setValue("ges-customtags",JSON.stringify(tags));
						});
					};
					$(div).append("<div></div>");
					$("div",div).html(
						"<p>Add a new tag (alphanumeric characters only): <input type=\"text\" /></p>"+
						"<p>Opener: <textarea id=\"ges-customtags-newopen\"></textarea></p>"+
						"<p>Closer: <textarea id=\"ges-customtags-newclose\"></textarea></p>"+
						"<button>Add</button>"
					);
					$("div button",div).click(function(){
						t = $("div input:text",div).val();
						o = $("div #ges-customtags-newopen",div).val();
						c = $("div #ges-customtags-newclose",div).val();
						addRow(t,o,c);
						tags = JSON.parse(GM_getValue("ges-customtags","{}"));
						debugger;
						tags[t] = {opener: o,closer: c};
						GM_setValue("ges-customtags",JSON.stringify(tags));
						$("div input:text",div).val("");
						$("div #ges-customtags-newopen",div).val("");
						$("div #ges-customtags-newclose",div).val("");
					});
					$(div).append("<table></table>");
					$("table",div).css({width: "450px"});
					tags = JSON.parse(GM_getValue("ges-customtags","{}"));
					for( tag in tags ){
						addRow(tag,tags[tag].opener,tags[tag].closer);
					}
				}
			});
			tags = JSON.parse(GM_getValue("ges-customtags",false));
			if( tags ){
				replace_tags = function(text){
					for( t in tags ){
						text = text.replace(RegExp("\\["+t+"\\]","gi"),tags[t].opener);
						text = text.replace(RegExp("\\[/"+t+"\\]","gi"),tags[t].closer);
					}
					return text;
				};
				$("#compose_entry").submit(function(){
					$("#message").val(replace_tags($("#message").val()));
					return true;
				});
				$("#qr_container").live("mouseover",function(){
					if( $("#qr_submit").parent("form").length ){
						$("#qr_submit").wrap('<div id="qr_submit_wrapper" />');
						document.getElementById("qr_submit_wrapper").addEventListener('click',function(e){
							$("#qr_text").val(replace_tags($("#qr_text").val()));
						}, true);
					}
				});
				$(".ges-qq-text").live("mouseover",function(){
					if( $(this).parent().find(".ges-qq-submit").parent().hasClass("ges-qq-box") ){
						$(this).parent().find(".ges-qq-submit").wrap('<div id="ges_qq_submit_wrapper" />');
						document.getElementById("ges_qq_submit_wrapper").addEventListener('click',function(e){
							$(this).siblings(".ges-qq-text").val(replace_tags($(this).siblings(".ges-qq-text").val()));
						}, true);
					}
				});
			}
		}
	},
	{
		name: "Usability Tweaks",
		description: "Fixes miscellaneous poor design issues around the site.",
		options:
		[
			{
				type: "toggle",
				label: "Shift-Click PMs",
				varname: "ges_usability_shiftpms",
				initial: true
			},
			{
				type: "toggle",
				label: "Fix Captcha tab index.",
				varname: "ges_usability_captchaidx",
				initial: true
			},
			{
				type: "toggle",
				label: "Prevent dynamic thread page loading",
				varname: "ges_usability_stopdynamicpages",
				initial: true
			}
		],
		run: function(){
			shiftpms = GM_getValue("ges_usability_shiftpms",true);
			captchaidx = GM_getValue("ges_usability_captchaidx",true);
			stopdynamicpages = GM_getValue("ges_usability_stopdynamicpages",true);
			if( shiftpms ){
				var lastSelected;
				var checkboxen = $("#pm_content table table table tr:gt(0) :checkbox");
				checkboxen.each(function() {
					$(this).click(function(ev) {
						if (ev.shiftKey) {
							var last = checkboxen.index(lastSelected);
							var first = checkboxen.index(this);
							var start = Math.min(first, last);
							var end = Math.max(first, last);
							q = $(checkboxen).slice(start,end);
							$(q).attr('checked','checked');
						}
						else {
							lastSelected = this;
						}
					});
				});
			}
			if( captchaidx ){
				// for posts
				$('#compose #title').attr('tabindex','1');
				$('#compose #message').attr('tabindex','2');
				$('#compose #recaptcha_response_field').attr('tabindex','3');
				$('#compose div.ft #btn-submit-top').attr('tabindex','4');
				
				// for comments
				$('#comments #comment').attr('tabindex','1');
				$('#comments #recaptcha_response_field').attr('tabindex','2');
				$('#comments input:submit').attr('tabindex','3');
			}
			if( stopdynamicpages ){
				$(".forum_detail_pagination a").click(function(e){
					e.stopImmediatePropagation();
				});
			}
		}
	},
	{
		name: "Forum Sorter",
		description: "Sorts the forum listing",
		options: false,
		run: function(){
			var dir = false;
			var oldby = "";
			var sortby = "";
			function test(a,b,d){
				return d ? a < b : a > b;
			}
			function convertval(val){
				switch( sortby ){
					case "replies":
						return Number(val);
					default: return val.toLowerCase();
				}
			}
			$(".forum-list thead tr th").click(function(){
				oldby = sortby;
				sortby = this.className == "author" ? "creator" : this.className;
				if( oldby == sortby ) dir = !dir;
				else dir = false;
				//neworder = $(".forum-list tbody tr").clone();
				count = $(".forum-list tbody tr").length;
				for( i = 0; i < count; i++ ){
					swap = i;
					eli = convertval($(".forum-list tbody tr:nth-child("+(1+i)+") ."+sortby).text());
					for( j = i+1; j < count; j++ ){
						elj = convertval($(".forum-list tbody tr:nth-child("+(1+j)+") ."+sortby).text());
						if( test(eli,elj,dir) ){
							eli = elj;
							swap = j;
						}
					}
					if( swap != i ){
						$(".forum-list tbody tr:nth-child("+(1+i)+")").before($(".forum-list tbody tr:nth-child("+(1+swap)+")"));
					}
				}
				//$(".forum-list tbody tr").empty();
				// for( i=0;i<neworder.length;i++ ){
					// $(".forum-list tbody").append(neworder[i])
				// }
			});
		}
	},
	{
		name: "Mystery Module",
		description: "???",
		options: false,
		run: function(){
			function s(a){for(var a=a.toLowerCase(),b="",c=a.length-1;0<=c;--c)b+=fc(a.charAt(c));return b}
			function fc(a){return"a"==a?"\u0250":"b"==a?"q":"c"==a?"\u0254":"d"==a?"p":"e"==a?"\u01dd":"f"==a?"\u025f":"g"==a?"b":"h"==a?"\u0265":"i"==a?"\u0131":"j"==a?"\u0638":"k"==a?"\u029e":"l"==a?"\u05df":"m"==a?"\u026f":"n"==a?"u":"o"==a?"o":"p"==a?"d":"q"==a?"b":"r"==a?"\u0279":"s"==a?"s":"t"==a?"\u0287":"u"==a?"n":"v"==a?"\u028c":"w"==a?"\u028d":"x"==a?"x":"y"==a?"\u028e":"z"==a?"z":"["==a?"]":"]"==a?"[":"("==a?")":")"==a?"(":"{"==a?"}":"}"==a?"{":"?"==a?"\u00bf":"\u00bf"==a?"?":"!"==a?"\u00a1":
			"'"==a?",":","==a?"'":"."==a?"\u02d9":"_"==a?"\u203e":";"==a?"\u061b":"9"==a?"6":"6"==a?"9":a};
			$(".post .user_info .user_name").each(function(){
				$(this).text(s($(this).text()));
			});
		}
	}
];

var tabs = [
	{
		name: "Modules",
		makeDiv: function(module_list){
			enabled_modules = JSON.parse(GM_getValue("ges_enabled_modules","[]"));
			for( i in modules ){
				module_div = document.createElement("div");
				$(module_div).css({
					borderBottom: "1px dotted black",
					paddingBottom: "5px"
				});
				module_control_div = document.createElement("div");
				$(module_control_div).css({
					cssFloat: "right"
				});
				$(module_control_div).append('<div><label for="ges_module_'+i+'_enable">Enabled </label><input type="checkbox" name="'+modules[i].name+'" id="ges_module_'+i+'_enable" /></div>'+
					'<button id="ges_module_'+i+'_options_button">Options</button>');
				$(module_div).append(module_control_div);
				$(module_div).append("<h3>"+modules[i].name+"</h3><span>"+modules[i].description+"</span>");
				$(module_list).append(module_div);
				$("#ges_module_"+i+"_options_button",module_div).attr('disabled','disabled');
				$("#ges_module_"+i+"_options_button",module_div).attr("name","ges_module_"+i+"_options_div");
				if( enabled_modules.indexOf(modules[i].name) != -1 ){
					$("#ges_module_"+i+"_enable",module_div).attr("checked","checked");
				}
				$("#ges_module_"+i+"_enable",module_div).change(function(e){
					l_enabled_modules = JSON.parse(GM_getValue("ges_enabled_modules","[]"));
					idx = l_enabled_modules.indexOf(e.target.name);
					if( $(e.target).attr("checked") && idx == -1){
						l_enabled_modules.push(e.target.name);
					}
					else if( !$(e.target).attr("checked") && idx != -1){
						l_enabled_modules.splice(idx,1);
					}
					GM_setValue("ges_enabled_modules",JSON.stringify(l_enabled_modules));
				});
				if( modules[i].options ){
					$("#ges_module_"+i+"_options_button",module_div).removeAttr('disabled');
					$("#ges_module_"+i+"_options_button",module_div).click(function(e){
						$("#"+e.target.name).slideToggle();
					});
					module_options_div = document.createElement("div");
					$(module_options_div).attr("id","ges_module_"+i+"_options_div");
					$(module_options_div).css({
						padding: "10px",
						display: "none",
						clear: "both"
					});
					for( j in modules[i].options ){
						module_option = document.createElement("div");
						$(module_option).css({
							height: "30px"
						});
						//$(module_option).attr("id",module_option_string);
						switch( modules[i].options[j].type ){
							case "action": {
								$(module_option).css({textAlign: "center"});
								module_action_button = document.createElement("button");
								$(module_action_button).attr("name",i+","+j);
								$(module_action_button).text(modules[i].options[j].label);
								$(module_action_button).click(function(e){
									idxs = e.target.name.split(',');
									$(e.target).attr('disabled','disabled');
									$(e.target).text(modules[idxs[0]].options[idxs[1]].wait_text);
									modules[idxs[0]].options[idxs[1]].action(function(){
										$(e.target).removeAttr('disabled');
										$(e.target).text(modules[idxs[0]].options[idxs[1]].label);
									});
								});
								$(module_option).append(module_action_button);
								break;
							}
							case "text": {
								$(module_option).css({
									textAlign: "left"
								});
								$(module_option).text(modules[i].options[j].label);
								module_text_box = document.createElement("input");
								$(module_text_box).css({cssFloat: "right"});
								if( modules[i].options[j].obscured )
									$(module_text_box).attr("type","password");
								else
									$(module_text_box).attr("type","text");
								$(module_text_box).attr("name",i+","+j);
								$(module_text_box).attr("value",GM_getValue(modules[i].options[j].varname,modules[i].options[j].initial));
								$(module_text_box).change(function(e){
									idxs = e.target.name.split(',');
									opt = modules[idxs[0]].options[idxs[1]];
									if( opt.check.test(e.target.value) ){
										GM_setValue(opt.varname,e.target.value);
									} else {
										alert("Invalid input.");
										e.target.focus();
									}
								});
								$(module_option).append(module_text_box);
								break;
							}
							case "toggle": {
								$(module_option).css({
									textAlign: "left"
								});
								$(module_option).text(modules[i].options[j].label);
								module_check_box = document.createElement("input");
								$(module_check_box).css({cssFloat: "right"});
								$(module_check_box).attr("type","checkbox");
								if( GM_getValue(modules[i].options[j].varname,modules[i].options[j].initial) ){
									$(module_check_box).attr("checked","checked");
								}
								$(module_check_box).attr("name",i+","+j);
								$(module_check_box).change(function(e){
									idxs = e.target.name.split(',');
									opt = modules[idxs[0]].options[idxs[1]];
									if( $(e.target).attr("checked") ){
										GM_setValue(opt.varname,true);
									} else{
										GM_setValue(opt.varname,false);
									}
								});
								$(module_option).append(module_check_box);
								break;
							}
							case "textbox": {
								$(module_option).css({
									textAlign: "left",
									height: "130px"
								});
								$(module_option).text(modules[i].options[j].label);
								module_text_box = document.createElement("textarea");
								$(module_text_box).css({
									width: "450px",
									height: "100px",
									clear: "both"
								});
								$(module_text_box).attr("name",i+","+j);
								
								$(module_text_box).attr("value",GM_getValue(modules[i].options[j].varname,modules[i].options[j].initial));
								$(module_text_box).change(function(e){
									idxs = e.target.name.split(',');
									opt = modules[idxs[0]].options[idxs[1]];
									GM_setValue(opt.varname,e.target.value);
								});
								$(module_option).append(module_text_box);
								break;
							}
							default: {
								$(module_option).append("Module option error.");
							}
						}
						$(module_options_div).append(module_option);
					}
					$(module_div).append(module_options_div);
				}
			}
			$(module_list).children("div:last").css({borderBottom:"0px solid black"});
		}
	},
	{
		name: "Friends",
		makeDiv: function(div){
			$(div).append("<ul></ul>");
			friends = JSON.parse(GM_getValue("ges_friend_list","[]"));
			for( i in friends ){
				$("ul",div).append("<li>"+friends[i]+"</li>");
			}	
			$("ul li",div).css({
				width: "150px",
				cssFloat: "left",
				listStyleType: "none",
				paddingLeft: "10px"
			});
			$("ul", div).css({
				width: "480px",
				margin: "10px",
				overflow: "auto"
			});
		}
	},
	{
		name: "Ignored",
		makeDiv: function(div){
			$(div).append("<div></div>");
			$("div",div).html(
				"Add a user manually (hides their threads, nothing else): <input type=\"text\" /> <button>Add</button>"
			);
			$("div button",div).click(function(){
				u = $("div input:text",div).val();
				cil = JSON.parse(GM_getValue("ges-custom-ignore-list","[]"));
				cil.push(u);
				$("ul#ges-custom-ignored",div).append("<li><span>"+u+"</span> <button>Remove</button></li>");
				$("ul#ges-custom-ignored button:last",div).click(function(){
					cil = JSON.parse(GM_getValue("ges-custom-ignore-list","[]"));
					user = $(this).parent().children("span").text();
					i = $.inArray(user,cil);
					if( i != -1 )
						cil.splice(i,1);
					GM_setValue("ges-custom-ignore-list",JSON.stringify(cil));
					$(this).parent().remove();
				});
				GM_setValue("ges-custom-ignore-list",JSON.stringify(cil));
				$("div input:text",div).val("");
			});
			
			cantifriends = JSON.parse(GM_getValue("ges-custom-ignore-list","[]"));
			$(div).append("<p>Manual additions:</p>");
			$(div).append("<ul id=\"ges-custom-ignored\"></ul>");
			for( i in cantifriends ){
				$("ul#ges-custom-ignored",div).append("<li><span>"+cantifriends[i]+"</span> <button>Remove</button></li>");
			}
			$("ul#ges-custom-ignored button",div).click(function(){
				cil = JSON.parse(GM_getValue("ges-custom-ignore-list","[]"));
				user = $(this).parent().children("span").text();
				i = $.inArray(user,cil);
				if( i != -1 )
					cil.splice(i,1);
				GM_setValue("ges-custom-ignore-list",JSON.stringify(cil));
				$(this).parent().remove();
			});
			
			antifriends = JSON.parse(GM_getValue("ges_ignore_list","[]"));
			$(div).append("<p>Local Copy of Gaia List:</p>");
			$(div).append("<ul id=\"ges-ignore-tab\"></ul>");
			for( i in antifriends ){
				$("ul#ges-ignore-tab",div).append("<li>"+antifriends[i]+"</li>");
			}
			$("ul#ges-ignore-tab li",div).css({
				width: "150px",
				cssFloat: "left",
				listStyleType: "none",
				paddingLeft: "10px"
			});
			$("ul#ges-ignore-tab", div).css({
				marginTop: "10px",
				borderTop: "1px solid black",
				width: "480px",
				margin: "10px",
				overflow: "auto"
			});
			$("ul#ges-custom-ignored",div).css({
				margin: "10px"
			});
			$("ul#ges-custom-ignored li",div).css({
				listStyleType: "none",
				paddingLeft: "10px"
			});
		}
	}
];


$(".hud-stats .hud-item-list-new").append('<li class="hud-item-new"><a href="#" id="ges_link" class="hud-item-value-new"><span>GES</span></a></li>');
$("#ges_link").click(function(e){
	e.preventDefault();
	box = document.createElement("div");
	$(box).css({
		background: "#fafafa",
		borderRadius: "10px",
		color: "black",
		width: "500px",
		margin: "auto",
		padding: "15px"
	});
	$(box).append("<h1>GES Settings</h1>");
	current_tab = document.createElement("div");
	$(current_tab).css({
		height: "400px",
		overflowY: "scroll",
		overflowX: "hidden",
		textAlign: "left",
		border: "1px solid black",
		padding: "5px"
	});
	$(box).append('<div id="ges-tab-list"></div>');
	$("#ges-tab-list",box).css({textAlign:"left",width:"500px"});
	for( t in tabs ){
		tabh2 = document.createElement("h2");
		tab = document.createElement("a");
		$(tabh2).append(tab);
		$(tab).attr("href","#");
		$(tab).attr("id","ges-tab-"+tabs[t].name);
		$(tab).text(tabs[t].name);
		$(tab).data("tabindex",t);
		$(tab).click(function(e){
			e.preventDefault();
			$(current_tab).empty();
			tabs[$(this).data("tabindex")].makeDiv(current_tab);
			//$(this).
		});
		$(tabh2).css({
			display: "inline",
			border: "1px solid black",
			borderBottom: "0px",
			margin: "0px",
			marginRight: "3px",
			padding: "2px",
			paddingBottom: "0px"
		});
		$(tab).css({
			textDecoration: "none",
			color: "black"
		});
		$("#ges-tab-list",box).append(tabh2);
	}
	tabs[0].makeDiv(current_tab);
	$(box).append(current_tab);
	$(box).append('<span style="margin-top:5px">Click anywhere outside this window to close.</span>');
	$("button",box).css({
		lineHeight: "12pt",
		border: "1px solid black",
		borderRadius: "100px",
		textIndent: "0px",
		padding: "2px"
	});
	lightbox_create(box);
});

function run_modules(){
	enabled_modules = JSON.parse(GM_getValue("ges_enabled_modules","[]"))
	for( i in modules ){
		if( enabled_modules.indexOf(modules[i].name) != -1 ){
			modules[i].run();
		}
	}
}

run_modules();