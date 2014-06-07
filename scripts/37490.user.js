// ==UserScript==
// @name          WBB:SC - Warez-BB: SuperCharged
// @namespace     http://www.warez-bb.org/
// @description   Everything you've ever dreamed of for Warez-BB. Release 27.
// @include       http://warez-bb.org/*
// @include       http://www.warez-bb.org/*
// ==/UserScript== 
var currentVersion = 27;


function escape2(text){
	text = text.replace(/(\+)/g, "LOLOLOLOLOLOLOLOLOLOL");
	text = escape(text);
	text = text.replace(/(LOLOLOLOLOLOLOLOLOLOL)/g, "%2B");
	return text;
}

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
 * 
 * --- Modified for ISO-8859-1 AJAX support by Darkimmortal (simply replace encodeURIComponent with my "escape2" function :P)
 * 
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=escape2(I)+"="+escape2(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();

$.ajaxSetup({ scriptCharset: "ISO-8859-1" , contentType: "application/x-www-form-urlencoded; charset=iso-8859-1"});

//swfupload v2.2.0 beta 3
var SWFUpload;if(SWFUpload==undefined){SWFUpload=function(settings){this.initSWFUpload(settings)}}SWFUpload.prototype.initSWFUpload=function(settings){try{this.customSettings={};this.settings=settings;this.eventQueue=[];this.movieName="SWFUpload_"+SWFUpload.movieCount++;this.movieElement=null;SWFUpload.instances[this.movieName]=this;this.initSettings();this.loadFlash();this.displayDebugInfo()}catch(ex){delete SWFUpload.instances[this.movieName];throw ex;}};SWFUpload.instances={};SWFUpload.movieCount=0;SWFUpload.version="2.2.0 Beta 3";SWFUpload.QUEUE_ERROR={QUEUE_LIMIT_EXCEEDED:-100,FILE_EXCEEDS_SIZE_LIMIT:-110,ZERO_BYTE_FILE:-120,INVALID_FILETYPE:-130};SWFUpload.UPLOAD_ERROR={HTTP_ERROR:-200,MISSING_UPLOAD_URL:-210,IO_ERROR:-220,SECURITY_ERROR:-230,UPLOAD_LIMIT_EXCEEDED:-240,UPLOAD_FAILED:-250,SPECIFIED_FILE_ID_NOT_FOUND:-260,FILE_VALIDATION_FAILED:-270,FILE_CANCELLED:-280,UPLOAD_STOPPED:-290};SWFUpload.FILE_STATUS={QUEUED:-1,IN_PROGRESS:-2,ERROR:-3,COMPLETE:-4,CANCELLED:-5};SWFUpload.BUTTON_ACTION={SELECT_FILE:-100,SELECT_FILES:-110,START_UPLOAD:-120};SWFUpload.CURSOR={ARROW:-1,HAND:-2};SWFUpload.WINDOW_MODE={WINDOW:"window",TRANSPARENT:"transparent",OPAQUE:"opaque"};SWFUpload.prototype.initSettings=function(){this.ensureDefault=function(settingName,defaultValue){this.settings[settingName]=(this.settings[settingName]==undefined)?defaultValue:this.settings[settingName]};this.ensureDefault("upload_url","");this.ensureDefault("file_post_name","Filedata");this.ensureDefault("post_params",{});this.ensureDefault("use_query_string",false);this.ensureDefault("requeue_on_error",false);this.ensureDefault("http_success",[]);this.ensureDefault("file_types","*.*");this.ensureDefault("file_types_description","All Files");this.ensureDefault("file_size_limit",0);this.ensureDefault("file_upload_limit",0);this.ensureDefault("file_queue_limit",0);this.ensureDefault("flash_url","swfupload.swf");this.ensureDefault("prevent_swf_caching",false);this.ensureDefault("button_image_url","");this.ensureDefault("button_width",1);this.ensureDefault("button_height",1);this.ensureDefault("button_text","");this.ensureDefault("button_text_style","color: #000000; font-size: 16pt;");this.ensureDefault("button_text_top_padding",0);this.ensureDefault("button_text_left_padding",0);this.ensureDefault("button_action",SWFUpload.BUTTON_ACTION.SELECT_FILES);this.ensureDefault("button_disabled",false);this.ensureDefault("button_placeholder_id",null);this.ensureDefault("button_cursor",SWFUpload.CURSOR.ARROW);this.ensureDefault("button_window_mode",SWFUpload.WINDOW_MODE.WINDOW);this.ensureDefault("debug",false);this.settings.debug_enabled=this.settings.debug;this.settings.return_upload_start_handler=this.returnUploadStart;this.ensureDefault("swfupload_loaded_handler",null);this.ensureDefault("file_dialog_start_handler",null);this.ensureDefault("file_queued_handler",null);this.ensureDefault("file_queue_error_handler",null);this.ensureDefault("file_dialog_complete_handler",null);this.ensureDefault("upload_start_handler",null);this.ensureDefault("upload_progress_handler",null);this.ensureDefault("upload_error_handler",null);this.ensureDefault("upload_success_handler",null);this.ensureDefault("upload_complete_handler",null);this.ensureDefault("debug_handler",this.debugMessage);this.ensureDefault("custom_settings",{});this.customSettings=this.settings.custom_settings;if(this.settings.prevent_swf_caching&&false){this.settings.flash_url=this.settings.flash_url;}delete this.ensureDefault};SWFUpload.prototype.loadFlash=function(){if(this.settings.button_placeholder_id!==""){this.replaceWithFlash()}else{this.appendFlash()}};SWFUpload.prototype.appendFlash=function(){var targetElement,container;if(document.getElementById(this.movieName)!==null){throw"ID "+this.movieName+" is already in use. The Flash Object could not be added";}targetElement=document.getElementsByTagName("body")[0];if(targetElement==undefined){throw"Could not find the 'body' element.";}container=document.createElement("div");container.style.width="1px";container.style.height="1px";container.style.overflow="hidden";targetElement.appendChild(container);container.innerHTML=this.getFlashHTML();if(window[this.movieName]==undefined){window[this.movieName]=this.getMovieElement()}};SWFUpload.prototype.replaceWithFlash=function(){var targetElement,tempParent;if(document.getElementById(this.movieName)!==null){throw"ID "+this.movieName+" is already in use. The Flash Object could not be added";}targetElement=document.getElementById(this.settings.button_placeholder_id);if(targetElement==undefined){throw"Could not find the placeholder element.";}tempParent=document.createElement("div");tempParent.innerHTML=this.getFlashHTML();targetElement.parentNode.replaceChild(tempParent.firstChild,targetElement);if(window[this.movieName]==undefined){window[this.movieName]=this.getMovieElement()}};SWFUpload.prototype.getFlashHTML=function(){return['<object id="',this.movieName,'" type="application/x-shockwave-flash" data="',this.settings.flash_url,'" width="',this.settings.button_width,'" height="',this.settings.button_height,'" class="swfupload">','<param name="wmode" value="',this.settings.button_window_mode,'" />','<param name="movie" value="',this.settings.flash_url,'" />','<param name="quality" value="high" />','<param name="menu" value="false" />','<param name="allowScriptAccess" value="always" />','<param name="flashvars" value="'+this.getFlashVars()+'" />','</object>'].join("")};SWFUpload.prototype.getFlashVars=function(){var paramString=this.buildParamString();var httpSuccessString=this.settings.http_success.join(",");return["movieName=",encodeURIComponent(this.movieName),"&amp;uploadURL=",encodeURIComponent(this.settings.upload_url),"&amp;useQueryString=",encodeURIComponent(this.settings.use_query_string),"&amp;requeueOnError=",encodeURIComponent(this.settings.requeue_on_error),"&amp;httpSuccess=",encodeURIComponent(httpSuccessString),"&amp;params=",encodeURIComponent(paramString),"&amp;filePostName=",encodeURIComponent(this.settings.file_post_name),"&amp;fileTypes=",encodeURIComponent(this.settings.file_types),"&amp;fileTypesDescription=",encodeURIComponent(this.settings.file_types_description),"&amp;fileSizeLimit=",encodeURIComponent(this.settings.file_size_limit),"&amp;fileUploadLimit=",encodeURIComponent(this.settings.file_upload_limit),"&amp;fileQueueLimit=",encodeURIComponent(this.settings.file_queue_limit),"&amp;debugEnabled=",encodeURIComponent(this.settings.debug_enabled),"&amp;buttonImageURL=",encodeURIComponent(this.settings.button_image_url),"&amp;buttonWidth=",encodeURIComponent(this.settings.button_width),"&amp;buttonHeight=",encodeURIComponent(this.settings.button_height),"&amp;buttonText=",encodeURIComponent(this.settings.button_text),"&amp;buttonTextTopPadding=",encodeURIComponent(this.settings.button_text_top_padding),"&amp;buttonTextLeftPadding=",encodeURIComponent(this.settings.button_text_left_padding),"&amp;buttonTextStyle=",encodeURIComponent(this.settings.button_text_style),"&amp;buttonAction=",encodeURIComponent(this.settings.button_action),"&amp;buttonDisabled=",encodeURIComponent(this.settings.button_disabled),"&amp;buttonCursor=",encodeURIComponent(this.settings.button_cursor)].join("")};SWFUpload.prototype.getMovieElement=function(){if(this.movieElement==undefined){this.movieElement=document.getElementById(this.movieName)}if(this.movieElement===null){throw"Could not find Flash element";}return this.movieElement};SWFUpload.prototype.buildParamString=function(){var postParams=this.settings.post_params;var paramStringPairs=[];if(typeof(postParams)==="object"){for(var name in postParams){if(postParams.hasOwnProperty(name)){paramStringPairs.push(encodeURIComponent(name.toString())+"="+encodeURIComponent(postParams[name].toString()))}}}return paramStringPairs.join("&amp;")};SWFUpload.prototype.destroy=function(){try{this.cancelUpload(null,false);var movieElement=null;movieElement=this.getMovieElement();if(movieElement){for(var i in movieElement){try{if(typeof(movieElement[i])==="function"){movieElement[i]=null}}catch(ex1){}}try{movieElement.parentNode.removeChild(movieElement)}catch(ex){}}window[this.movieName]=null;SWFUpload.instances[this.movieName]=null;delete SWFUpload.instances[this.movieName];this.movieElement=null;this.settings=null;this.customSettings=null;this.eventQueue=null;this.movieName=null;return true}catch(ex1){return false}};SWFUpload.prototype.displayDebugInfo=function(){this.debug(["---SWFUpload Instance Info---\n","Version: ",SWFUpload.version,"\n","Movie Name: ",this.movieName,"\n","Settings:\n","\t","upload_url:               ",this.settings.upload_url,"\n","\t","flash_url:                ",this.settings.flash_url,"\n","\t","use_query_string:         ",this.settings.use_query_string.toString(),"\n","\t","requeue_on_error:         ",this.settings.requeue_on_error.toString(),"\n","\t","http_success:             ",this.settings.http_success.join(", "),"\n","\t","file_post_name:           ",this.settings.file_post_name,"\n","\t","post_params:              ",this.settings.post_params.toString(),"\n","\t","file_types:               ",this.settings.file_types,"\n","\t","file_types_description:   ",this.settings.file_types_description,"\n","\t","file_size_limit:          ",this.settings.file_size_limit,"\n","\t","file_upload_limit:        ",this.settings.file_upload_limit,"\n","\t","file_queue_limit:         ",this.settings.file_queue_limit,"\n","\t","debug:                    ",this.settings.debug.toString(),"\n","\t","prevent_swf_caching:      ",this.settings.prevent_swf_caching.toString(),"\n","\t","button_placeholder_id:    ",this.settings.button_placeholder_id.toString(),"\n","\t","button_image_url:         ",this.settings.button_image_url.toString(),"\n","\t","button_width:             ",this.settings.button_width.toString(),"\n","\t","button_height:            ",this.settings.button_height.toString(),"\n","\t","button_text:              ",this.settings.button_text.toString(),"\n","\t","button_text_style:        ",this.settings.button_text_style.toString(),"\n","\t","button_text_top_padding:  ",this.settings.button_text_top_padding.toString(),"\n","\t","button_text_left_padding: ",this.settings.button_text_left_padding.toString(),"\n","\t","button_action:            ",this.settings.button_action.toString(),"\n","\t","button_disabled:          ",this.settings.button_disabled.toString(),"\n","\t","custom_settings:          ",this.settings.custom_settings.toString(),"\n","Event Handlers:\n","\t","swfupload_loaded_handler assigned:  ",(typeof this.settings.swfupload_loaded_handler==="function").toString(),"\n","\t","file_dialog_start_handler assigned: ",(typeof this.settings.file_dialog_start_handler==="function").toString(),"\n","\t","file_queued_handler assigned:       ",(typeof this.settings.file_queued_handler==="function").toString(),"\n","\t","file_queue_error_handler assigned:  ",(typeof this.settings.file_queue_error_handler==="function").toString(),"\n","\t","upload_start_handler assigned:      ",(typeof this.settings.upload_start_handler==="function").toString(),"\n","\t","upload_progress_handler assigned:   ",(typeof this.settings.upload_progress_handler==="function").toString(),"\n","\t","upload_error_handler assigned:      ",(typeof this.settings.upload_error_handler==="function").toString(),"\n","\t","upload_success_handler assigned:    ",(typeof this.settings.upload_success_handler==="function").toString(),"\n","\t","upload_complete_handler assigned:   ",(typeof this.settings.upload_complete_handler==="function").toString(),"\n","\t","debug_handler assigned:             ",(typeof this.settings.debug_handler==="function").toString(),"\n"].join(""))};SWFUpload.prototype.addSetting=function(name,value,default_value){if(value==undefined){return(this.settings[name]=default_value)}else{return(this.settings[name]=value)}};SWFUpload.prototype.getSetting=function(name){if(this.settings[name]!=undefined){return this.settings[name]}return""};SWFUpload.prototype.callFlash=function(functionName,argumentArray){argumentArray=argumentArray||[];var movieElement=this.getMovieElement();var returnValue,returnString;try{returnString=movieElement.CallFunction('<invoke name="'+functionName+'" returntype="javascript">'+__flash__argumentsToXML(argumentArray,0)+'</invoke>');returnValue=eval(returnString)}catch(ex){throw"Call to "+functionName+" failed";}if(returnValue!=undefined&&typeof returnValue.post==="object"){returnValue=this.unescapeFilePostParams(returnValue)}return returnValue};SWFUpload.prototype.selectFile=function(){this.callFlash("SelectFile")};SWFUpload.prototype.selectFiles=function(){this.callFlash("SelectFiles")};SWFUpload.prototype.startUpload=function(fileID){this.callFlash("StartUpload",[fileID])};SWFUpload.prototype.cancelUpload=function(fileID,triggerErrorEvent){if(triggerErrorEvent!==false){triggerErrorEvent=true}this.callFlash("CancelUpload",[fileID,triggerErrorEvent])};SWFUpload.prototype.stopUpload=function(){this.callFlash("StopUpload")};SWFUpload.prototype.getStats=function(){return this.callFlash("GetStats")};SWFUpload.prototype.setStats=function(statsObject){this.callFlash("SetStats",[statsObject])};SWFUpload.prototype.getFile=function(fileID){if(typeof(fileID)==="number"){return this.callFlash("GetFileByIndex",[fileID])}else{return this.callFlash("GetFile",[fileID])}};SWFUpload.prototype.addFileParam=function(fileID,name,value){return this.callFlash("AddFileParam",[fileID,name,value])};SWFUpload.prototype.removeFileParam=function(fileID,name){this.callFlash("RemoveFileParam",[fileID,name])};SWFUpload.prototype.setUploadURL=function(url){this.settings.upload_url=url.toString();this.callFlash("SetUploadURL",[url])};SWFUpload.prototype.setPostParams=function(paramsObject){this.settings.post_params=paramsObject;this.callFlash("SetPostParams",[paramsObject])};SWFUpload.prototype.addPostParam=function(name,value){this.settings.post_params[name]=value;this.callFlash("SetPostParams",[this.settings.post_params])};SWFUpload.prototype.removePostParam=function(name){delete this.settings.post_params[name];this.callFlash("SetPostParams",[this.settings.post_params])};SWFUpload.prototype.setFileTypes=function(types,description){this.settings.file_types=types;this.settings.file_types_description=description;this.callFlash("SetFileTypes",[types,description])};SWFUpload.prototype.setFileSizeLimit=function(fileSizeLimit){this.settings.file_size_limit=fileSizeLimit;this.callFlash("SetFileSizeLimit",[fileSizeLimit])};SWFUpload.prototype.setFileUploadLimit=function(fileUploadLimit){this.settings.file_upload_limit=fileUploadLimit;this.callFlash("SetFileUploadLimit",[fileUploadLimit])};SWFUpload.prototype.setFileQueueLimit=function(fileQueueLimit){this.settings.file_queue_limit=fileQueueLimit;this.callFlash("SetFileQueueLimit",[fileQueueLimit])};SWFUpload.prototype.setFilePostName=function(filePostName){this.settings.file_post_name=filePostName;this.callFlash("SetFilePostName",[filePostName])};SWFUpload.prototype.setUseQueryString=function(useQueryString){this.settings.use_query_string=useQueryString;this.callFlash("SetUseQueryString",[useQueryString])};SWFUpload.prototype.setRequeueOnError=function(requeueOnError){this.settings.requeue_on_error=requeueOnError;this.callFlash("SetRequeueOnError",[requeueOnError])};SWFUpload.prototype.setHTTPSuccess=function(http_status_codes){if(typeof http_status_codes==="string"){http_status_codes=http_status_codes.replace(" ","").split(",")}this.settings.http_success=http_status_codes;this.callFlash("SetHTTPSuccess",[http_status_codes])};SWFUpload.prototype.setDebugEnabled=function(debugEnabled){this.settings.debug_enabled=debugEnabled;this.callFlash("SetDebugEnabled",[debugEnabled])};SWFUpload.prototype.setButtonImageURL=function(buttonImageURL){if(buttonImageURL==undefined){buttonImageURL=""}this.settings.button_image_url=buttonImageURL;this.callFlash("SetButtonImageURL",[buttonImageURL])};SWFUpload.prototype.setButtonDimensions=function(width,height){this.settings.button_width=width;this.settings.button_height=height;var movie=this.getMovieElement();if(movie!=undefined){movie.style.width=width+"px";movie.style.height=height+"px"}this.callFlash("SetButtonDimensions",[width,height])};SWFUpload.prototype.setButtonText=function(html){this.settings.button_text=html;this.callFlash("SetButtonText",[html])};SWFUpload.prototype.setButtonTextPadding=function(left,top){this.settings.button_text_top_padding=top;this.settings.button_text_left_padding=left;this.callFlash("SetButtonTextPadding",[left,top])};SWFUpload.prototype.setButtonTextStyle=function(css){this.settings.button_text_style=css;this.callFlash("SetButtonTextStyle",[css])};SWFUpload.prototype.setButtonDisabled=function(isDisabled){this.settings.button_disabled=isDisabled;this.callFlash("SetButtonDisabled",[isDisabled])};SWFUpload.prototype.setButtonAction=function(buttonAction){this.settings.button_action=buttonAction;this.callFlash("SetButtonAction",[buttonAction])};SWFUpload.prototype.setButtonCursor=function(cursor){this.settings.button_cursor=cursor;this.callFlash("SetButtonCursor",[cursor])};SWFUpload.prototype.queueEvent=function(handlerName,argumentArray){if(argumentArray==undefined){argumentArray=[]}else if(!(argumentArray instanceof Array)){argumentArray=[argumentArray]}var self=this;if(typeof this.settings[handlerName]==="function"){this.eventQueue.push(function(){this.settings[handlerName].apply(this,argumentArray)});setTimeout(function(){self.executeNextEvent()},0)}else if(this.settings[handlerName]!==null){throw"Event handler "+handlerName+" is unknown or is not a function";}};SWFUpload.prototype.executeNextEvent=function(){var f=this.eventQueue?this.eventQueue.shift():null;if(typeof(f)==="function"){f.apply(this)}};SWFUpload.prototype.unescapeFilePostParams=function(file){var reg=/[$]([0-9a-f]{4})/i;var unescapedPost={};var uk;if(file!=undefined){for(var k in file.post){if(file.post.hasOwnProperty(k)){uk=k;var match;while((match=reg.exec(uk))!==null){uk=uk.replace(match[0],String.fromCharCode(parseInt("0x"+match[1],16)))}unescapedPost[uk]=file.post[k]}}file.post=unescapedPost}return file};SWFUpload.prototype.flashReady=function(){var movieElement=this.getMovieElement();if(typeof(movieElement.CallFunction)==="unknown"){this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");for(var key in movieElement){try{if(typeof(movieElement[key])==="function"){movieElement[key]=null}}catch(ex){}}}this.queueEvent("swfupload_loaded_handler")};SWFUpload.prototype.fileDialogStart=function(){this.queueEvent("file_dialog_start_handler")};SWFUpload.prototype.fileQueued=function(file){file=this.unescapeFilePostParams(file);this.queueEvent("file_queued_handler",file)};SWFUpload.prototype.fileQueueError=function(file,errorCode,message){file=this.unescapeFilePostParams(file);this.queueEvent("file_queue_error_handler",[file,errorCode,message])};SWFUpload.prototype.fileDialogComplete=function(numFilesSelected,numFilesQueued){this.queueEvent("file_dialog_complete_handler",[numFilesSelected,numFilesQueued])};SWFUpload.prototype.uploadStart=function(file){file=this.unescapeFilePostParams(file);this.queueEvent("return_upload_start_handler",file)};SWFUpload.prototype.returnUploadStart=function(file){var returnValue;if(typeof this.settings.upload_start_handler==="function"){file=this.unescapeFilePostParams(file);returnValue=this.settings.upload_start_handler.call(this,file)}else if(this.settings.upload_start_handler!=undefined){throw"upload_start_handler must be a function";}if(returnValue===undefined){returnValue=true}returnValue=!!returnValue;this.callFlash("ReturnUploadStart",[returnValue])};SWFUpload.prototype.uploadProgress=function(file,bytesComplete,bytesTotal){file=this.unescapeFilePostParams(file);this.queueEvent("upload_progress_handler",[file,bytesComplete,bytesTotal])};SWFUpload.prototype.uploadError=function(file,errorCode,message){file=this.unescapeFilePostParams(file);this.queueEvent("upload_error_handler",[file,errorCode,message])};SWFUpload.prototype.uploadSuccess=function(file,serverData){file=this.unescapeFilePostParams(file);this.queueEvent("upload_success_handler",[file,serverData])};SWFUpload.prototype.uploadComplete=function(file){file=this.unescapeFilePostParams(file);this.queueEvent("upload_complete_handler",file)};SWFUpload.prototype.debug=function(message){this.queueEvent("debug_handler",message)};SWFUpload.prototype.debugMessage=function(message){if(this.settings.debug){var exceptionMessage,exceptionValues=[];if(typeof message==="object"&&typeof message.name==="string"&&typeof message.message==="string"){for(var key in message){if(message.hasOwnProperty(key)){exceptionValues.push(key+": "+message[key])}}exceptionMessage=exceptionValues.join("\n")||"";exceptionValues=exceptionMessage.split("\n");exceptionMessage="EXCEPTION: "+exceptionValues.join("\nEXCEPTION: ");SWFUpload.Console.writeLine(exceptionMessage)}else{SWFUpload.Console.writeLine(message)}}};SWFUpload.Console={};SWFUpload.Console.writeLine=function(message){var console,documentForm;try{console=document.getElementById("SWFUpload_Console");if(!console){documentForm=document.createElement("form");document.getElementsByTagName("body")[0].appendChild(documentForm);console=document.createElement("textarea");console.id="SWFUpload_Console";console.style.fontFamily="monospace";console.setAttribute("wrap","off");console.wrap="off";console.style.overflow="auto";console.style.width="700px";console.style.height="350px";console.style.margin="5px";documentForm.appendChild(console)}console.value+=message+"\n";console.scrollTop=console.scrollHeight-console.clientHeight}catch(ex){alert("Exception: "+ex.name+" Message: "+ex.message)}};

var warezbbimgkkscript = "dmFyIG9uU3dmdUxvYWQ9ZnVuY3Rpb24oKXskKCJhW3RpdGxlPSdCbG9jayB0aGlzIG9iamVjdCB3aXRoIEFkYmxvY2sgUGx1cyddIikucmVtb3ZlKCl9O3ZhciBvblVwbG9hZFByb2dyZXNzPWZ1bmN0aW9uKGZpbGUsY29tcGxldGUsdG90YWwpeyQoImlucHV0LmhlbHBsaW5lW25hbWU9J2hlbHBib3gnXSIpLnZhbCgiVXBsb2FkaW5nIHRvIGltZ2trLmNvbSA6OiAiK3BhcnNlSW50KGNvbXBsZXRlL3RvdGFsKjEwMCkrIiUgLSAiK2NvbXBsZXRlKyIgLyAiK3RvdGFsKyIgYnl0ZXMiKX07dmFyIG9uRmlsZURpYWxvZ0NvbXBsZXRlPWZ1bmN0aW9uKHNlbGVjdGVkLHF1ZXVlZCx0b3RhbFF1ZXVlZCl7dGhpcy5zdGFydFVwbG9hZCgpfTt2YXIgb25VcGxvYWRTdWNjZXNzPWZ1bmN0aW9uKGZpbGUsZGF0YSl7JCgiaW5wdXQuaGVscGxpbmVbbmFtZT0naGVscGJveCddIikudmFsKCJVcGxvYWRpbmcgY29tcGxldGUhIC0gU2VydmljZSBwcm92aWRlZCBieSBpbWdray5jb20gKENyZWF0ZWQgYnkgRGFya2ltbW9ydGFsKSIpO21vekluc2VydCgkKCIjbWVzc2FnZSIpLmdldCgwKSwiW2ltZ10iK2RhdGErIlsvaW1nXSIsIiIpfTt2YXIgb25VcGxvYWRFcnJvcj1mdW5jdGlvbihmaWxlLGNvZGUsbWVzc2FnZSl7YWxlcnQoIlVwbG9hZCBlcnJvciAjIitjb2RlKyI6XHJcblxyXG4iK21lc3NhZ2UpfTt2YXIgc3dmdVNldHRpbmdzPXt1cGxvYWRfdXJsOiJodHRwOi8vaW1na2suY29tL2FwaS91cGxvYWQucGhwIixmbGFzaF91cmw6Imh0dHA6Ly9pbWdray5jb20vc3dmdXBsb2FkLnN3ZiIsZmlsZV9zaXplX2xpbWl0OiIyIE1CIixmaWxlX3Bvc3RfbmFtZToiZmlsZSIsYnV0dG9uX3BsYWNlaG9sZGVyX2lkOiJ1cGxvYWRidXR0b24iLGJ1dHRvbl90ZXh0OiI8YSBjbGFzcz0ndXBsb2FkJz5VcGxvYWQgSW1hZ2U8L2E+IixidXR0b25fdGV4dF9zdHlsZToiLnVwbG9hZCB7IGNvbG9yOiAjNzA5RkQ1OyBmb250LXNpemU6IDExcHg7IGZvbnQtZmFtaWx5OiBWZXJkYW5hOyB9IixidXR0b25fY3Vyc29yOlNXRlVwbG9hZC5DVVJTT1IuSEFORCxidXR0b25fd2lkdGg6ODUsYnV0dG9uX2hlaWdodDoxOCxidXR0b25fd2luZG93X21vZGU6U1dGVXBsb2FkLldJTkRPV19NT0RFLlRSQU5TUEFSRU5ULHN3ZnVwbG9hZF9sb2FkZWRfaGFuZGxlcjpvblN3ZnVMb2FkLHVwbG9hZF9wcm9ncmVzc19oYW5kbGVyOm9uVXBsb2FkUHJvZ3Jlc3MsZmlsZV9kaWFsb2dfY29tcGxldGVfaGFuZGxlcjpvbkZpbGVEaWFsb2dDb21wbGV0ZSx1cGxvYWRfc3VjY2Vzc19oYW5kbGVyOm9uVXBsb2FkU3VjY2Vzcyx1cGxvYWRfZXJyb3JfaGFuZGxlcjpvblVwbG9hZEVycm9yLGZpbGVfdHlwZXM6IioucG5nOyouanBnOyouZ2lmOyouYm1wOyoudGdhOyouaWNvIixmaWxlX3R5cGVzX2Rlc2NyaXB0aW9uOiJJbWFnZSBmaWxlcyIsZmlsZV9xdWV1ZV9saW1pdDoxfTt2YXIgc3dmdT1uZXcgU1dGVXBsb2FkKHN3ZnVTZXR0aW5ncyk7";

var inlineReportHTML = "PHRyPjx0ZCBjbGFzcz0icm93MSIgdmFsaWduPSJ0b3AiIGNvbHNwYW49IjIiPg0KPGZvcm0gbWV0aG9kPSJwb3N0IiBhY3Rpb249Ii4vcmVwb3J0LnBocD9wPTE0NzkyODQ4Ij4NCjx0YWJsZSBjbGFzcz0iZm9ydW1saW5lIiB3aWR0aD0iMTAwJSIgY2VsbHNwYWNpbmc9IjEiIGNlbGxwYWRkaW5nPSIzIiBib3JkZXI9IjAiIHN0eWxlPSJkaXNwbGF5OiBub25lIj4NCgk8dHI+DQoJCTx0aCBjbGFzcz0iY2F0SGVhZCIgY29sc3Bhbj0iMyI+UmVwb3J0IHBvc3QgOiBOZWVkIGEgaGVscCB3aXRoIGphdmEuPC90ZD4NCgk8L3RyPg0KCTx0cj4NCgkJPHRkIGNsYXNzPSJyb3cxIiB3aWR0aD0iMTUwIiBhbGlnbj0iY2VudGVyIj4NCgkJCTxzcGFuIGNsYXNzPSJleHBsYWludGl0bGUiPkNvbW1lbnRzPC9zcGFuPg0KDQoJCTwvdGQ+DQoJCTx0ZCBjbGFzcz0icm93MiIgYWxpZ249ImNlbnRlciI+DQoJCQk8dGV4dGFyZWEgcm93cz0iMTAiIGNvbHM9IjgwIiB3cmFwPSJ2aXJ0dWFsIiB0YWJpbmRleD0iMSIgY2xhc3M9InBvc3QiIG5hbWU9InJlcG9ydF9jb21tZW50cyI+PC90ZXh0YXJlYT4NCgkJPC90ZD4NCgkJPHRkIGNsYXNzPSJyb3cyIiB3aWR0aD0iMjUwIiBhbGlnbj0iY2VudGVyIiB2YWxpZ249Im1pZGRsZSI+DQoJCQk8dGFibGUgd2lkdGg9IjEwMCUiIGNlbGxzcGFjaW5nPSIxIiBjZWxscGFkZGluZz0iMiIgYm9yZGVyPSIwIj4NCgkJCQk8dHI+DQoJCQkJCTx0ZCBhbGlnbj0iY2VudGVyIiBub3dyYXA9Im5vd3JhcCI+DQoNCgkJCQkJCTxzcGFuIGNsYXNzPSJleHBsYWludGl0bGUiPlJlcG9ydCBSZWFzb25zPC9zcGFuPg0KCQkJCQk8L3RkPg0KCQkJCTwvdHI+DQoJCQkJPHRyPg0KCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJPHRhYmxlIHdpZHRoPSIxMDAlIiBjZWxsc3BhY2luZz0iMSIgY2VsbHBhZGRpbmc9IjEiIGJvcmRlcj0iMCI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCg0KCQkJCQkJCQkJPGlucHV0IHR5cGU9ImNoZWNrYm94IiBuYW1lPSJyZXBvcnRfcmVhc29uc1tdIiB2YWx1ZT0iOSIgIC8+DQoJCQkJCQkJCTwvdGQ+DQoJCQkJCQkJCTx0ZCBhbGlnbj0ibGVmdCI+DQoJCQkJCQkJCQk8c3BhbiBjbGFzcz0iZ2VubWVkIj48Yj5PdGhlciAoKik8L2I+PC9zcGFuPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9ImdlbnNtYWxsIj48YnIgLz5FdmVyeXRoaW5nIGVsc2U8L3NwYW4+DQoJCQkJCQkJCTwvdGQ+DQoJCQkJCQkJPC90cj4NCgkJCQkJCQkJCQkJCQkJPHRyPg0KDQoJCQkJCQkJCTx0ZCBhbGlnbj0ibGVmdCIgdmFsaWduPSJ0b3AiIHdpZHRoPSIxMCI+DQoJCQkJCQkJCQk8aW5wdXQgdHlwZT0iY2hlY2tib3giIG5hbWU9InJlcG9ydF9yZWFzb25zW10iIHZhbHVlPSIxIiAgLz4NCgkJCQkJCQkJPC90ZD4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0Ij4NCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5tZWQiPjxiPldyb25nIGZvcnVtPC9iPjwvc3Bhbj4NCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5zbWFsbCI+PGJyIC8+VGhlIG1lc3NhZ2UgaGFzIGJlZW4gcG9zdGVkIGluIGEgd3JvbmcgZm9ydW08L3NwYW4+DQoJCQkJCQkJCTwvdGQ+DQoJCQkJCQkJPC90cj4NCg0KCQkJCQkJCQkJCQkJCQk8dHI+DQoJCQkJCQkJCTx0ZCBhbGlnbj0ibGVmdCIgdmFsaWduPSJ0b3AiIHdpZHRoPSIxMCI+DQoJCQkJCQkJCQk8aW5wdXQgdHlwZT0iY2hlY2tib3giIG5hbWU9InJlcG9ydF9yZWFzb25zW10iIHZhbHVlPSIyIiAgLz4NCgkJCQkJCQkJPC90ZD4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0Ij4NCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5tZWQiPjxiPkJhZCB3b3JkczwvYj48L3NwYW4+DQoJCQkJCQkJCQk8c3BhbiBjbGFzcz0iZ2Vuc21hbGwiPjxiciAvPlRoZSBwb3N0IGNvbnRhaW5zIGJhZCB3b3Jkczwvc3Bhbj4NCgkJCQkJCQkJPC90ZD4NCg0KCQkJCQkJCTwvdHI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCgkJCQkJCQkJCTxpbnB1dCB0eXBlPSJjaGVja2JveCIgbmFtZT0icmVwb3J0X3JlYXNvbnNbXSIgdmFsdWU9IjMiICAvPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9Imdlbm1lZCI+PGI+RG91YmxlIHBvc3Q8L2I+PC9zcGFuPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9ImdlbnNtYWxsIj48YnIgLz5Vc2VyIGhhcyBhbHJlYWR5IHBvc3RlZCB0aGUgc2FtZSBtZXNzYWdlIGJlZm9yZTwvc3Bhbj4NCg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCTwvdHI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCgkJCQkJCQkJCTxpbnB1dCB0eXBlPSJjaGVja2JveCIgbmFtZT0icmVwb3J0X3JlYXNvbnNbXSIgdmFsdWU9IjQiICAvPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9Imdlbm1lZCI+PGI+U3BhbTwvYj48L3NwYW4+DQoNCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5zbWFsbCI+PGJyIC8+VGhlIHBvc3QgY29udGFpbnMgc3BhbTwvc3Bhbj4NCgkJCQkJCQkJPC90ZD4NCgkJCQkJCQk8L3RyPg0KCQkJCQkJCQkJCQkJCQk8dHI+DQoJCQkJCQkJCTx0ZCBhbGlnbj0ibGVmdCIgdmFsaWduPSJ0b3AiIHdpZHRoPSIxMCI+DQoJCQkJCQkJCQk8aW5wdXQgdHlwZT0iY2hlY2tib3giIG5hbWU9InJlcG9ydF9yZWFzb25zW10iIHZhbHVlPSIxMSIgIC8+DQoJCQkJCQkJCTwvdGQ+DQoJCQkJCQkJCTx0ZCBhbGlnbj0ibGVmdCI+DQoNCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5tZWQiPjxiPkRlYWQgTGluazwvYj48L3NwYW4+DQoJCQkJCQkJCQk8c3BhbiBjbGFzcz0iZ2Vuc21hbGwiPjxiciAvPlRoZXJlIGlzIGEgZGVhZCBsaW5rIGluIHRoZSBwb3N0PC9zcGFuPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCTwvdHI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCgkJCQkJCQkJCTxpbnB1dCB0eXBlPSJjaGVja2JveCIgbmFtZT0icmVwb3J0X3JlYXNvbnNbXSIgdmFsdWU9IjEzIiAgLz4NCgkJCQkJCQkJPC90ZD4NCg0KCQkJCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9Imdlbm1lZCI+PGI+VW5jb2RlZCBMaW5rPC9iPjwvc3Bhbj4NCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5zbWFsbCI+PGJyIC8+TGlua3MgYXJlIHVuY29kZWQgaW4gdGhpcyBwb3N0PC9zcGFuPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCTwvdHI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCgkJCQkJCQkJCTxpbnB1dCB0eXBlPSJjaGVja2JveCIgbmFtZT0icmVwb3J0X3JlYXNvbnNbXSIgdmFsdWU9IjE0IiAgLz4NCg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9Imdlbm1lZCI+PGI+TmVlZCBUYWdzPC9iPjwvc3Bhbj4NCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5zbWFsbCI+PGJyIC8+VGhlIHRvcGljIHJlcXVpcmVzIHRhZ3MuPC9zcGFuPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCTwvdHI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCg0KCQkJCQkJCQkJPGlucHV0IHR5cGU9ImNoZWNrYm94IiBuYW1lPSJyZXBvcnRfcmVhc29uc1tdIiB2YWx1ZT0iMTUiICAvPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9Imdlbm1lZCI+PGI+SGlnaCBQcmlvcml0eSAoKik8L2I+PC9zcGFuPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9ImdlbnNtYWxsIj48YnIgLz5SZXBvcnRzIHRoYXQgcmVxdWlyZSB1cmdlbnQgYXR0ZW50aW9uLiBlZyBNYWx3YXJlLCBWaXJ1c2VzLCBQb3JuLjwvc3Bhbj4NCgkJCQkJCQkJPC90ZD4NCgkJCQkJCQk8L3RyPg0KCQkJCQkJPC90YWJsZT4NCgkJCQkJPC90ZD4NCgkJCQk8L3RyPg0KCQkJCTx0cj4NCgkJCQkJPHRkIGFsaWduPSJjZW50ZXIiIG5vd3JhcD0ibm93cmFwIj4NCgkJCQkJCTxzcGFuIGNsYXNzPSJnZW5zbWFsbCI+KCopID0gQ29tbWVudHMgYXJlIHJlcXVpcmVkPC9zcGFuPg0KCQkJCQk8L3RkPg0KCQkJCTwvdHI+DQoJCQk8L3RhYmxlPg0KDQoJCTwvdGQ+DQoJPC90cj4NCgk8dHI+DQoJCTx0ZCBjbGFzcz0iY2F0IiBjb2xzcGFuPSIzIiBhbGlnbj0iY2VudGVyIiBoZWlnaHQ9IjI4Ij4NCgkgIAkJPGlucHV0IHR5cGU9InN1Ym1pdCIgdGFiaW5kZXg9IjIiIGFjY2Vzc2tleT0icyIgbmFtZT0ic3VibWl0IiBjbGFzcz0ibWFpbm9wdGlvbiIgdmFsdWU9IlN1Ym1pdCIgLz4NCgkJCSZuYnNwOyZuYnNwOyZuYnNwOw0KCSAgCQk8aW5wdXQgdHlwZT0ic3VibWl0IiB0YWJpbmRleD0iMyIgbmFtZT0iY2FuY2VsIiBjbGFzcz0ibGl0ZW9wdGlvbiIgdmFsdWU9IkNhbmNlbCIgLz4NCgkJPC90ZD4NCgk8L3RyPg0KPC90YWJsZT4NCjwvZm9ybT4NCjwvdGQ+PC90cj4NCg==";


//from phpjs
function base64_decode(data){var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var o1,o2,o3,h1,h2,h3,h4,bits,i=ac=0,dec="",tmp_arr=[];data+='';do{h1=b64.indexOf(data.charAt(i++));h2=b64.indexOf(data.charAt(i++));h3=b64.indexOf(data.charAt(i++));h4=b64.indexOf(data.charAt(i++));bits=h1<<18|h2<<12|h3<<6|h4;o1=bits>>16&0xff;o2=bits>>8&0xff;o3=bits&0xff;if(h3==64){tmp_arr[ac++]=String.fromCharCode(o1)}else if(h4==64){tmp_arr[ac++]=String.fromCharCode(o1,o2)}else{tmp_arr[ac++]=String.fromCharCode(o1,o2,o3)}}while(i<data.length);dec=tmp_arr.join('');dec=utf8_decode(dec);return dec}
function utf8_decode(str_data){var tmp_arr=[],i=ac=c1=c2=c3=0;str_data+='';while(i<str_data.length){c1=str_data.charCodeAt(i);if(c1<128){tmp_arr[ac++]=String.fromCharCode(c1);i++}else if((c1>191)&&(c1<224)){c2=str_data.charCodeAt(i+1);tmp_arr[ac++]=String.fromCharCode(((c1&31)<<6)|(c2&63));i+=2}else{c2=str_data.charCodeAt(i+1);c3=str_data.charCodeAt(i+2);tmp_arr[ac++]=String.fromCharCode(((c1&15)<<12)|((c2&63)<<6)|(c3&63));i+=3}}return tmp_arr.join('')}


// Modified by me
jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || typeof options.expires == 'string' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else if(typeof options.expires == 'string' && options.expires=='never'){
				date = new Date();
				date.setTime(date.getTime() + (10 * 365 * 24 * 60 * 60 * 1000)); // 10 years == never. >:(   IT DOES! 
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '; domain=.warez-bb.org';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie !== '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

/*
 * End of jQuery
*/
/*
var win2byte = {
  '\u20AC': '\x80', '\u201A': '\x82', '\u0192': '\x83', '\u201E': '\x84',
  '\u2026': '\x85', '\u2020': '\x86', '\u2021': '\x87', '\u02C6': '\x88',
  '\u2030': '\x89', '\u0160': '\x8A', '\u2039': '\x8B', '\u0152': '\x8C',
  '\u017D': '\x8E', '\u2018': '\x91', '\u2019': '\x92', '\u201C': '\x93',
  '\u201D': '\x94', '\u2022': '\x95', '\u2013': '\x96', '\u2014': '\x97',
  '\u02DC': '\x98', '\u2122': '\x99', '\u0161': '\x9A', '\u203A': '\x9B',
  '\u0153': '\x9C', '\u017E': '\x9E', '\u0178': '\x9F'
};

function getbyte(s) {
  var b = win2byte[s];
  return b || s;
}

var codes = '(?:[\\x80-\\xBF]|' + [code for (code in win2byte)].join('|') + ')';
var pat = new RegExp('[\\xC2-\\xDF]' + codes +
					'|[\\xE0-\\xEF]' + codes + '{2}' +
					'|[\\xF0-\\xF4]' + codes + '{3}', 'g');

function sub(s) {
  s = s[0] + [getbyte(s[1 + parseInt(code)]) for (code in s.substring(1))].join('');
  return decodeURIComponent(escape(s));
}

function fix(s) {
  s = s.replace(pat, sub);
  return s;
}
*/

/*
 * PHP date() in Javascript thanks to the PHPJS library
 */
function date(format,timestamp){var a,jsdate=((timestamp)?new Date(timestamp*1000):new Date());var pad=function(n,c){if((n=n+"").length<c){return new Array(++c-n.length).join("0")+n;}else{return n;}};var txt_weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var txt_ordin={1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"};var txt_months=["","January","February","March","April","May","June","July","August","September","October","November","December"];var f={d:function(){return pad(f.j(),2);},D:function(){t=f.l();return t.substr(0,3);},j:function(){return jsdate.getDate();},l:function(){return txt_weekdays[f.w()];},N:function(){return f.w()+1;},S:function(){return txt_ordin[f.j()]?txt_ordin[f.j()]:'th';},w:function(){return jsdate.getDay();},z:function(){return(jsdate-new Date(jsdate.getFullYear()+"/1/1"))/864e5>>0;},W:function(){var a=f.z(),b=364+f.L()-a;var nd2,nd=(new Date(jsdate.getFullYear()+"/1/1").getDay()||7)-1;if(b<=2&&((jsdate.getDay()||7)-1)<=2-b){return 1;}else{if(a<=2&&nd>=4&&a>=(6-nd)){nd2=new Date(jsdate.getFullYear()-1+"/12/31");return date("W",Math.round(nd2.getTime()/1000));}else{return(1+(nd<=3?((a+nd)/7):(a-(7-nd))/7)>>0);}}},F:function(){return txt_months[f.n()];},m:function(){return pad(f.n(),2);},M:function(){t=f.F();return t.substr(0,3);},n:function(){return jsdate.getMonth()+1;},t:function(){var n;if((n=jsdate.getMonth()+1)==2){return 28+f.L();}else{if(n&1&&n<8||!(n&1)&&n>7){return 31;}else{return 30;}}},L:function(){var y=f.Y();return(!(y&3)&&(y%1e2||!(y%4e2)))?1:0;},Y:function(){return jsdate.getFullYear();},y:function(){return(jsdate.getFullYear()+"").slice(2);},a:function(){return jsdate.getHours()>11?"pm":"am";},A:function(){return f.a().toUpperCase();},B:function(){var off=(jsdate.getTimezoneOffset()+60)*60;var theSeconds=(jsdate.getHours()*3600)+
(jsdate.getMinutes()*60)+
jsdate.getSeconds()+off;var beat=Math.floor(theSeconds/86.4);if(beat>1000)beat-=1000;if(beat<0)beat+=1000;if((String(beat)).length==1)beat="00"+beat;if((String(beat)).length==2)beat="0"+beat;return beat;},g:function(){return jsdate.getHours()%12||12;},G:function(){return jsdate.getHours();},h:function(){return pad(f.g(),2);},H:function(){return pad(jsdate.getHours(),2);},i:function(){return pad(jsdate.getMinutes(),2);},s:function(){return pad(jsdate.getSeconds(),2);},O:function(){var t=pad(Math.abs(jsdate.getTimezoneOffset()/60*100),4);if(jsdate.getTimezoneOffset()>0)t="-"+t;else t="+"+t;return t;},P:function(){var O=f.O();return(O.substr(0,3)+":"+O.substr(3,2));},c:function(){return f.Y()+"-"+f.m()+"-"+f.d()+"T"+f.h()+":"+f.i()+":"+f.s()+f.P();},U:function(){return Math.round(jsdate.getTime()/1000);}};return format.replace(/[\\]?([a-zA-Z])/g,function(t,s){if(t!=s){ret=s;}else if(f[s]){ret=f[s]();}else{ret=s;}
return ret;});}
/*
 * End of date()
 */

// sprintf thanks to the PHPJS library
var sprintf = function(){var regex=/%%|%(\d+\$)?([-+#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;var a=arguments,i=0,format=a[i++];var pad=function(str,len,chr,leftJustify){var padding=(str.length>=len)?'':Array(1+len-str.length>>>0).join(chr);return leftJustify?str+padding:padding+str};var justify=function(value,prefix,leftJustify,minWidth,zeroPad){var diff=minWidth-value.length;if(diff>0){if(leftJustify||!zeroPad){value=pad(value,minWidth,' ',leftJustify)}else{value=value.slice(0,prefix.length)+pad('',diff,'0',true)+value.slice(prefix.length)}}return value};var formatBaseX=function(value,base,prefix,leftJustify,minWidth,precision,zeroPad){var number=value>>>0;prefix=prefix&&number&&{'2':'0b','8':'0','16':'0x'}[base]||'';value=prefix+pad(number.toString(base),precision||0,'0',false);return justify(value,prefix,leftJustify,minWidth,zeroPad)};var formatString=function(value,leftJustify,minWidth,precision,zeroPad){if(precision!=null){value=value.slice(0,precision)}return justify(value,'',leftJustify,minWidth,zeroPad)};var doFormat=function(substring,valueIndex,flags,minWidth,_,precision,type){if(substring=='%%')return'%';var leftJustify=false,positivePrefix='',zeroPad=false,prefixBaseX=false;for(var j=0;flags&&j<flags.length;j++)switch(flags.charAt(j)){case' ':positivePrefix=' ';break;case'+':positivePrefix='+';break;case'-':leftJustify=true;break;case'0':zeroPad=true;break;case'#':prefixBaseX=true;break}if(!minWidth){minWidth=0}else if(minWidth=='*'){minWidth=+a[i++]}else if(minWidth.charAt(0)=='*'){minWidth=+a[minWidth.slice(1,-1)]}else{minWidth=+minWidth}if(minWidth<0){minWidth=-minWidth;leftJustify=true}if(!isFinite(minWidth)){throw new Error('sprintf: (minimum-)width must be finite');}if(!precision){precision='fFeE'.indexOf(type)>-1?6:(type=='d')?0:void(0)}else if(precision=='*'){precision=+a[i++]}else if(precision.charAt(0)=='*'){precision=+a[precision.slice(1,-1)]}else{precision=+precision}var value=valueIndex?a[valueIndex.slice(0,-1)]:a[i++];switch(type){case's':return formatString(String(value),leftJustify,minWidth,precision,zeroPad);case'c':return formatString(String.fromCharCode(+value),leftJustify,minWidth,precision,zeroPad);case'b':return formatBaseX(value,2,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'o':return formatBaseX(value,8,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'x':return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'X':return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad).toUpperCase();case'u':return formatBaseX(value,10,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'i':case'd':{var number=parseInt(+value);var prefix=number<0?'-':positivePrefix;value=prefix+pad(String(Math.abs(number)),precision,'0',false);return justify(value,prefix,leftJustify,minWidth,zeroPad)}case'e':case'E':case'f':case'F':case'g':case'G':{var number=+value;var prefix=number<0?'-':positivePrefix;var method=['toExponential','toFixed','toPrecision']['efg'.indexOf(type.toLowerCase())];var textTransform=['toString','toUpperCase']['eEfFgG'.indexOf(type)%2];value=prefix+Math.abs(number)[method](precision);return justify(value,prefix,leftJustify,minWidth,zeroPad)[textTransform]()}default:return substring}};return format.replace(regex,doFormat)}

//more PHPJS
var htmlspecialchars = function(string, quote_style) { 
	var histogram = {}, symbol = '', tmp_str = '', i = 0;
	tmp_str = string.toString();
	
	if (false === (histogram = get_html_translation_table('HTML_SPECIALCHARS', quote_style))) {
		return false;
	}
	
	for (symbol in histogram) {
		entity = histogram[symbol];
		tmp_str = tmp_str.split(symbol).join(entity);
	}
	
	return tmp_str;
};

var get_html_translation_table = function(table, quote_style){
	
	var entities = {}, histogram = {}, decimal = 0, symbol = '';
	var constMappingTable = {}, constMappingQuoteStyle = {};
	var useTable = {}, useQuoteStyle = {};
	
	useTable      = (table ? table.toUpperCase() : 'HTML_SPECIALCHARS');
	useQuoteStyle = (quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT');
	
	// Translate arguments
	constMappingTable[0]      = 'HTML_SPECIALCHARS';
	constMappingTable[1]      = 'HTML_ENTITIES';
	constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
	constMappingQuoteStyle[2] = 'ENT_COMPAT';
	constMappingQuoteStyle[3] = 'ENT_QUOTES';
	
	// Map numbers to strings for compatibilty with PHP constants
	if (!isNaN(useTable)) {
		useTable = constMappingTable[useTable];
	}
	if (!isNaN(useQuoteStyle)) {
		useQuoteStyle = constMappingQuoteStyle[useQuoteStyle];
	}
	
	if (useTable == 'HTML_SPECIALCHARS') {
		// ascii decimals for better compatibility
		entities['38'] = '&amp;';
		entities['60'] = '&lt;';
		entities['62'] = '&gt;';
	} else if (useTable == 'HTML_ENTITIES') {
		// ascii decimals for better compatibility
	  entities['38'] = '&amp;';
	  entities['60'] = '&lt;';
	  entities['62'] = '&gt;';
	  entities['160'] = '&nbsp;';
	  entities['161'] = '&iexcl;';
	  entities['162'] = '&cent;';
	  entities['163'] = '&pound;';
	  entities['164'] = '&curren;';
	  entities['165'] = '&yen;';
	  entities['166'] = '&brvbar;';
	  entities['167'] = '&sect;';
	  entities['168'] = '&uml;';
	  entities['169'] = '&copy;';
	  entities['170'] = '&ordf;';
	  entities['171'] = '&laquo;';
	  entities['172'] = '&not;';
	  entities['173'] = '&shy;';
	  entities['174'] = '&reg;';
	  entities['175'] = '&macr;';
	  entities['176'] = '&deg;';
	  entities['177'] = '&plusmn;';
	  entities['178'] = '&sup2;';
	  entities['179'] = '&sup3;';
	  entities['180'] = '&acute;';
	  entities['181'] = '&micro;';
	  entities['182'] = '&para;';
	  entities['183'] = '&middot;';
	  entities['184'] = '&cedil;';
	  entities['185'] = '&sup1;';
	  entities['186'] = '&ordm;';
	  entities['187'] = '&raquo;';
	  entities['188'] = '&frac14;';
	  entities['189'] = '&frac12;';
	  entities['190'] = '&frac34;';
	  entities['191'] = '&iquest;';
	  entities['192'] = '&Agrave;';
	  entities['193'] = '&Aacute;';
	  entities['194'] = '&Acirc;';
	  entities['195'] = '&Atilde;';
	  entities['196'] = '&Auml;';
	  entities['197'] = '&Aring;';
	  entities['198'] = '&AElig;';
	  entities['199'] = '&Ccedil;';
	  entities['200'] = '&Egrave;';
	  entities['201'] = '&Eacute;';
	  entities['202'] = '&Ecirc;';
	  entities['203'] = '&Euml;';
	  entities['204'] = '&Igrave;';
	  entities['205'] = '&Iacute;';
	  entities['206'] = '&Icirc;';
	  entities['207'] = '&Iuml;';
	  entities['208'] = '&ETH;';
	  entities['209'] = '&Ntilde;';
	  entities['210'] = '&Ograve;';
	  entities['211'] = '&Oacute;';
	  entities['212'] = '&Ocirc;';
	  entities['213'] = '&Otilde;';
	  entities['214'] = '&Ouml;';
	  entities['215'] = '&times;';
	  entities['216'] = '&Oslash;';
	  entities['217'] = '&Ugrave;';
	  entities['218'] = '&Uacute;';
	  entities['219'] = '&Ucirc;';
	  entities['220'] = '&Uuml;';
	  entities['221'] = '&Yacute;';
	  entities['222'] = '&THORN;';
	  entities['223'] = '&szlig;';
	  entities['224'] = '&agrave;';
	  entities['225'] = '&aacute;';
	  entities['226'] = '&acirc;';
	  entities['227'] = '&atilde;';
	  entities['228'] = '&auml;';
	  entities['229'] = '&aring;';
	  entities['230'] = '&aelig;';
	  entities['231'] = '&ccedil;';
	  entities['232'] = '&egrave;';
	  entities['233'] = '&eacute;';
	  entities['234'] = '&ecirc;';
	  entities['235'] = '&euml;';
	  entities['236'] = '&igrave;';
	  entities['237'] = '&iacute;';
	  entities['238'] = '&icirc;';
	  entities['239'] = '&iuml;';
	  entities['240'] = '&eth;';
	  entities['241'] = '&ntilde;';
	  entities['242'] = '&ograve;';
	  entities['243'] = '&oacute;';
	  entities['244'] = '&ocirc;';
	  entities['245'] = '&otilde;';
	  entities['246'] = '&ouml;';
	  entities['247'] = '&divide;';
	  entities['248'] = '&oslash;';
	  entities['249'] = '&ugrave;';
	  entities['250'] = '&uacute;';
	  entities['251'] = '&ucirc;';
	  entities['252'] = '&uuml;';
	  entities['253'] = '&yacute;';
	  entities['254'] = '&thorn;';
	  entities['255'] = '&yuml;';
	} else {
		throw Error("Table: "+useTable+' not supported');
		return false;
	}
	
	if (useQuoteStyle != 'ENT_NOQUOTES') {
		entities['34'] = '&quot;';
	}
	
	if (useQuoteStyle == 'ENT_QUOTES') {
		entities['39'] = '&#039;';
	}
	
	// ascii decimals to real symbols
	for (decimal in entities) {
		symbol = String.fromCharCode(decimal)
		histogram[symbol] = entities[decimal];
	}
	
	return histogram;
};
/*
$.ajaxSetup({
	beforeSend: function(xhr){
		//alert("before send");
		xhr.overrideMimeType('text/html; charset=iso-8859-1');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=iso-8859-1');
	},
	contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
	//scriptCharset: "utf-8"
	//xhr: GM_xmlhttpRequest,
	processData: true
});

*/

var superSerialize = function(serial){
	var ser = {};
	$.each(serial, function(i, val){
		ser[val.name] = /*fix(unescape(encodeURIComponent(*/val.value/*)))*/;
		//alert(ser[val.name]);
		//(encodeURIval.value);
		//serial[i].value = escape(decodeURIComponent(val.value));
	});	
	return ser;
};

var WBBSC = function(){
	
	var lastMessage="";
	var actualPage = document.location.href;
		
		
	var page = function(name){
		//return document.location.href.indexOf(name) >= 0;
		return actualPage.indexOf(name) >= 0;
	};
	
	var sigs = [
		//"You can just imagine your sig was here.",
		//"SECRETED BY THE COMEDY BEE.",
		"Signature and profile details are not available with Slow Quick Reply off."
		//"I run one of the coolest image hosts in the world on Windows. :P"
	];
	var sig = function(){
		return sigs[~~(Math.random()*sigs.length)];
	};
	
	function firstRun(){
		if(!getOption("firstrun"+currentVersion)){
			alert("Welcome to WBB:SC Release "+currentVersion+"!\n\nThe firstrun code for this release will execute now.");
						
			//setString("selectforum", "");
			//setOption("setselect", 0);
			setOption("supercharger", 0);
			setOption("inlinefirst", 0);
						
			//alert("Reset quick search dropdown contents successfully.\n\nPlease visit any topic to have this updated to reflect your current forum access.\n\nSince this release you can now use the 'Reset Quick Search Forums Dropdown' button on the settings page to perform this action again.");
			
			//setOption("tidyforumview", 1);
			
			alert("Disabled SuperCharger and Inline First Post as both have extremely detrimental effects.");
			
			alert("Firstrun code complete - now refreshing...");			
			location.reload();
			
			setOption("firstrun"+currentVersion, 1);
		}
	}
	
	
	
	var version = "0.2.0";
	
	var buttonText = {
		quote: "WBB:SC Quote",
		quote2: "Gathering Post...",
		quoteError: "WBB lag - Try again",
		submit: "WBB:SC Submit",
		submit2: "Sending...",
		preview: "WBB:SC Preview",
		previewQuote: "Gathering last post to quote...",
		previewError: "WBB Lag - Try again",
		edit: "WBB:SC Submit",
		edit2: "WBB:SC Submitting...",
		cancel: "Cancel Editing"
	};
	var quoteRegex = /\<textarea name="message".*?>([\s\S]*)\<\/textarea>/;
	var settingsPage = [
		{
			title: 'SuperCharger',
			desc: 'Live preloading of commonly-accessed pages: Home, Forum links at top/bottom and anywhere a Next button appears. WARNING: Highly unrecommended, left in place in case anyone really wants it.',
			name: 'supercharger',
			preset: false
		},{
			title: 'Quick Reply [img] button',
			desc: 'Adds a button to insert [img][/img] tags to Quick reply',
			name: 'quickimg',
			preset: true
		},{
			title: 'List Item [*] button',
			desc: 'Adds a [*] button to all instances of the full message editor.',
			name: 'listitem',
			preset: true
		},{
			title: 'Quick Quote',
			desc: 'Adds a WBB:SC Quote button, allowing posts to be <b>instantly</b> quoted into the quick reply box. This will not replace the existing Quote button.',
			name: 'quickquote',
			preset: true
		},{
			title: 'Bigger Quick Reply',
			desc: 'Sets the quick reply box to double-height by default.',
			name: 'bigreply',
			preset: true
		},{
			title: 'Inline Editing',
			desc: 'Enables the inline editing feature of WBB:SC, allowing you to edit posts without leaving the page.',
			name: 'inlineedit',
			preset: true
		},/*{
			title: 'Inline Report',
			desc: 'Enables the inline report feature of WBB:SC, allowing you to report posts without leaving the page.',
			name: 'inlinereport',
			preset: true
		},*/{
			title: 'Quick Quote Override',
			desc: 'Overrides the normal quote button to function like WBB:SC Quote. It is recommended that you turn off the WBB:SC Quote button if you enable this.',
			name: 'qqoverride',
			preset: false
		},{
			title: 'Quick Search',
			desc: 'Enables the link to access Quick Search in the third menu bar',
			name: 'qksearch',
			preset: true
		},{
			title: 'Inline First Post',
			desc: 'Enables the arrow button to fold out the first post of a thread in search results and viewforum.',
			name: 'inlinefirst',
			preset: false
		},{
			title: 'Inline PM',
			desc: 'Enables the arrow button to fold out PMs.',
			name: 'inlinepm',
			preset: true
		},{
			title: 'PM Reply Link',
			desc: 'Adds a link next to each PM in your inbox allowing you to quickly reply to it.',
			name: 'pmreply',
			preset: true
		},{
			title: 'PM Tracker Quote',
			desc: 'Adds a quote button next to each message in the PM tracker (displayed at the bottom when replying to a PM).',
			name: 'pmquote',
			preset: true
		}/*,{
			title: 'Wadio Bar',
			desc: 'Just in case you don\'t like it ;) (keeping this for backwards-compatibility reasons)',
			name: 'wbbscwadio',
			preset: true
		}, {
			title: 'Random Fading Effects',
			desc: 'How could you live without them? :O',
			name: 'awesomeness',
			preset: true
		}, {
			title: 'Tidy Forum View',
			desc: 'Various visual improvements to viewforum, search results etc.',
			name: 'tidyforumview',
			preset: true
		}*/, {
			title: 'You\'re running',
			desc: '',
			name: 'yourerunning',
			preset: true
		}, {
			title: 'Goto Any Page',
			desc: 'Adds a link allowing you to go to any page anywhere where Goto page appears at the bottom of a page.',
			name: 'goto',
			preset: true
		}, {
			title: 'Clean Header',
			desc: 'Removes a lot of links from the header, allowing the "normal" links to fit into just one bar.',
			name: 'cleanheader',
			preset: true
		}, {
			title: 'Slow Quick Reply',
			desc: 'Massively reduces quick reply speed, but you get to see exactly what the Warez-BB BBCode parser understood your post as, and you get your profile details and sig.',
			name: 'slowreply',
			preset: true
		}
		
		/*,{
			title: 'Imgkk.com Integration',
			desc: 'Adds an Upload Image link to all posting views allowing you to easily upload an image through imgkk.com and include it in your message.',
			name: 'imgkk',
			preset: true
		}*/
		
	];
	
	var versionLt = function(ver){
		var vers = ver.split(/\./g);
		var versions = version.split(/\./g);
		if(vers[0] < versions[0]){
			return true;
		} else if(vers[1] < versions[1]){
			return true;
		} else if(vers[2] < versions[2]){
			return true;
		} else {
			return false;
		}
	};
	var versionGt = function(ver){
		var vers = ver.split(/\./g);
		var versions = version.split(/\./g);
		if(vers[0] > versions[0]){
			return true;
		} else if(vers[1] > versions[1]){
			return true;
		} else if(vers[2] > versions[2]){
			return true;
		} else {
			return false;
		}
	};
	
	// Taken from quick_reply.js - Thanks Coolyou :D
	function mozInsert(txtarea, openTag, closeTag){
		var scrollTop = ( typeof txtarea.scrollTop == 'number' ? txtarea.scrollTop : -1 );
	
		if (txtarea.selectionEnd > txtarea.value.length){ 
			txtarea.selectionEnd = txtarea.value.length; 
		}
	
		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd+openTag.length;
	
		txtarea.value = txtarea.value.slice(0,startPos)+openTag+txtarea.value.slice(startPos);
		txtarea.value = txtarea.value.slice(0,endPos)+closeTag+txtarea.value.slice(endPos);
	
		txtarea.selectionStart = startPos+openTag.length;
		txtarea.selectionEnd = endPos;
		txtarea.focus();
	
		if( scrollTop >= 0 ){ 
			txtarea.scrollTop = scrollTop; 
		}
	}
	
	// Taken from ajax_core.js - Thanks Coolyou :D
	function ad(a)
	{
		var obj;
		if(document.getElementById){
			obj = document.getElementById(a);
		} else if(document.all){
			obj = document.all[a];
		} else if(document.layers){
			obj = document.layers[a];
		} else {
			return 1;
		}
		return obj;
	}
	
	
	var fromSuperCharge = function(){
		return parent !== window;
	}
	
	var isOnlyEmptySpace = function(string) {    
		var i = 0;    
		while(i < string.length && (string.charAt(i) == " " || string.charAt(i) == "\t" || string.charAt(i) == "\n")) {
			i++;
		}    
		return (i == string.length);
	};
	
	// thanks to phpbbadvancedquickreplyquoteedit.js for the idea
	/**
	 * Javascript Warez-BB HTML->BB-Code Parser
	 * @param {jquery} element
	*/	      
	var convertHTMLtoBBCode = function(bbcode, element) {
		
		var after = "";
		var dontCallFirstChild = false;
		
		switch(element.nodeName.toLowerCase()) {
			case "#text": 
							if((element.parentNode.nodeName.toLowerCase() == "b" && element.parentNode.parentNode.nodeName.toLowerCase() == "span" && element.parentNode.parentNode.attributes !== null && element.parentNode.parentNode.getAttribute("class") == "genmed") ||element.data == "Quote:" ||element.data == "Moderated Message:" || element.data == "Code:" || element.data.indexOf("wrote:") != -1 || ( element.data == "offtopic of the day:" && element.parentNode.nodeName.toLowerCase() == "u" && element.parentNode.parentNode.nodeName.toLowerCase() == "div" ) || element.data == "_________________") {
								
								return bbcode;
							 }
						  
						  if(isOnlyEmptySpace(element.data)){
							  break;
						  }
						  
						  bbcode += element.data.toString().replace(/\n/g, "");
						  
			break;
			case "a": 
				if(element.href == element.firstChild.data || ( element.href.substr(0, element.href.length - 1) == element.firstChild.data && element.href.charAt(element.href.length - 1) == "/" )) {
						
					if(element.href == encodeURI(element.href)) {
						bbcode += element.href;
					 } else {
						 bbcode += "[url]" + element.href + "[/url]";
					 }
					 dontCallFirstChild = true;
				 } else {
					 bbcode += "[url=" + element.href + "]"; 
					 after = "[/url]";
				 }
			break;
			case "br": 
					  
					  if(!(element.parentNode.nodeName.toLowerCase() == "div" && ( element.previousSibling !== null && (element.previousSibling.nodeName.toLowerCase() == "u" || (element.previousSibling.nodeName.toLowerCase() == "br" && element.previousSibling.previousSibling !== null && element.previousSibling.previousSibling.nodeName.toLowerCase() == "u" ))))) {
						  
						  bbcode += "\n";
						  
					  }
			break;
			case "img":
			if((element.src.indexOf("fisubice/images/bg_quote_header.gif") == -1)) {            
				var pos = document.location.href.indexOf("viewtopic.php") - 1;            
				var lol = "/images/smiles/";
				//if(document.location.href.substring(0, pos + 1) == element.src.substring(0, pos + 1) && element.src.substr(pos, 15) == "/images/smiles/" && element.getAttribute("alt") !== null)  {
				if(element.src.indexOf(lol) != -1){
				  switch(element.src.substr(element.src.indexOf(lol) + 15)) {
					  
					  case "icon_biggrin.gif": bbcode += ":D"; break;
					  case "icon_smile.gif": bbcode += ":)"; break;
					  case "icon_sad.gif": bbcode += ":("; break;
					  case "icon_eek.gif": bbcode += ":shock:"; break;
					  case "icon_confused.gif": bbcode += ":?"; break;
					  case "icon_cool.gif": bbcode += "8-)"; break;
					  case "icon_lol.gif": bbcode += ":lol:"; break;
					  case "icon_mad.gif": bbcode += ":x"; break;
					  case "icon_razz.gif": bbcode += ":P"; break;
					  case "icon_redface.gif": bbcode += ":oops:"; break;
					  case "icon_cry.gif": bbcode += ":cry:"; break;
					  case "icon_evil.gif": bbcode += ":evil:"; break;
					  case "icon_twisted.gif": bbcode += ":twisted:"; break;
					  case "icon_rolleyes.gif": bbcode += ":roll:"; break;
					  case "icon_wink.gif": bbcode += ";)"; break;
					  case "icon_exclaim.gif": bbcode += ":!:"; break;
					  case "icon_question.gif": bbcode += ":?:"; break;
					  case "worshippy.gif": bbcode += ":worship:"; break;
					  case "icon_neutral.gif": bbcode += ":|"; break;
					  case "icon_arrow.gif": bbcode += ":arrow:"; break;
					  case "icon_idea.gif": bbcode += ":idea:"; break;
					  case "icon_mrgreen.gif": bbcode += ":mrgreen:"; break;
					  case "icon_surprised.gif": bbcode += ":-o"; break;
					  
					  default: bbcode += "[img]" + element.src + "[/img]"; break;
				  }
				
				} else {
					bbcode += "[img]" + element.src + "[/img]";
				}
			}
			break;
			case "span":
				if((element.attributes.length > 0 && element.getAttribute("class") !== null && element.getAttribute("class") == "gensmall") || (element.firstChild !== null && element.firstChild.nodeName.toLowerCase() == "br" && element.firstChild.nextSibling !== null && element.firstChild.nextSibling.data !== null && element.firstChild.nextSibling.data == "_________________")) {
				   
				   return bbcode;
				
				}
				
				var elyl = element.getAttribute("style");
				
				switch(elyl) {
					case "font-weight: bold;": bbcode += "[b]"; after = "[/b]"; break;
					case "font-style: italic;": bbcode += "[i]"; after = "[/i]"; break;
					case "text-decoration: underline;": bbcode += "[u]"; after = "[/u]"; break;
					default:
					if(elyl !== null && elyl.substr(0, 7) == "color: ") {
						
						bbcode += "[color=" + elyl.substring(7,elyl.length-1) + "]"; after = "[/color]";
					} else if(elyl !== null && elyl.substr(0, 11) == "font-size: ") {
						var size = elyl.substr(11, 2);
						if(size.charAt(1) == "p"){
							size = size.charAt(0);
						}
						bbcode += "[size=" + size + "]"; after = "[/size]";
					}
					
					if(element.attributes !== null && element.getAttribute("class") == "genmed") {
						var quotator = element.firstChild.firstChild.data;
						var qname = "";
						var spaces = quotator.match(/ /g);
						if(quotator == "Moderated Message:") {
							bbcode += "[mod]";
							break;
						} else if(spaces !== null && spaces.length > 0) {
							if(quotator.substring(quotator.length - 7) == " wrote:"){
								qname = quotator.substring(0, quotator.length - 7);
							}
						} else if(quotator == "Code:") {
							bbcode += "[code]";
							break;
						}
						
						var lala = "";
						if(qname !== ""){
							lala = "=\"" + qname + "\"";
						}
						
						bbcode += "[quote" + lala + "]";
					}
					break;
					
				}
				break;
				case "table":
				if(element.attributes !== null && element.getAttribute("class") == "attachtable"){
					return bbcode;
				}
				
				if(element.getElementsByTagName("strong").length > 0 && element.getElementsByTagName("strong")[0].firstChild.data == "Code:") {
					after = "[/code]"; break;
				} else if(element.getElementsByTagName("strong").length > 0 && element.getElementsByTagName("strong")[0].firstChild.data == "Moderated Message:") {
					after = "[/mod]"; break;            	
				} else {
					after = "[/quote]"; break;
				}
				case "ul": 
					bbcode += "[list]"; after = "[/list]";
					break;
				case "li": 
					bbcode += "[*]"; 
					break;
			
			
		}
		
		if(element.firstChild !== null && !dontCallFirstChild) {
			bbcode = convertHTMLtoBBCode(bbcode, element.firstChild);
			bbcode += after;
		} 
		
		if(element.nextSibling !== null) { 
			bbcode = convertHTMLtoBBCode(bbcode, element.nextSibling);
		}
		
		return bbcode; 
	};
	
	var html2bb = function(postbodydiv){
		var bbcode = "";
		bbcode = convertHTMLtoBBCode("", postbodydiv);    	
		while(bbcode.charAt(bbcode.length - 1) == "\n"){
			bbcode = bbcode.substring(0, bbcode.length - 1);
		}
		return bbcode;
	};
	
	
	/**
	 * Javascript Warez-BB BB-Code->HTML Parser
	 * @author Darkimmortal
	 * @param {string} text
	 */
	var bbCode = function(text){
		
		var search = [
			/\[img\]([\s\S]*?)\[\/img\]/gi,
			/\[url=([\w]+?:\/\/[^ \\"\n\r\t<]*?)\]([\s\S]*?)\[\/url\]/gim,
			/\[url\]((www|ftp|)\.[^ \\"\n\r\t<]*?)\[\/url\]/gim,
			/\[url=((www|ftp|)\.[^ \\"\n\r\t<]*?)\](.*?)\[\/url\]/gim,
			/\[url\](http:\/\/[^ \\"\n\r\t<]*?)\[\/url\]/gim,
			/\[email\](([a-z0-9&\-_.]+?)@([\w\-]+\.([\w\-\.]+\.)?[\w]+))\[\/email\]/gim,
			/\[b\]([\s\S]*?)\[\/b\]/gim,
			/\[i\]([\s\S]*?)\[\/i\]/gim,
			/\[u\]([\s\S]*?)\[\/u\]/gim,
			/\[quote\]/gim,
			/\[\/quote\]/gim,
			/\[quote="([^\\"\n\r\t<]*?)"\]/gim,
			/\[\/quote\]/gim,
			/\[code\]/gim,
			/\[\/code\]/gim,
			/\[mod\]/gim,
			/\[\/mod\]/gim,		
			/\[list=?\]/gim,
			/\[\/list\]/gim,
			/\[list=([^ \\"\n\r\t<]*?)\]/gim,
			/\[\/list\]/gim,
			/\[\*\]/gim,
			/\[color=([^ \\"\n\r\t<]*?)\]([\s\S]*?)\[\/color\]/gim,
			/\[size=([^ \\"\n\r\t<]*?)\]([\s\S]*?)\[\/size\]/gim
		];
	
		var replace = [
			"<img src=\"$1\" title='Image' alt='Image' border='0' />",
			"<a href=\"$1\" target=\"blank\">$2</a>",
			"<a href=\"http://$1\" target=\"blank\">$1</a>",
			"<a href=\"$1\" target=\"blank\">$1</a>",
			"<a href=\"mailto:$1\">$1</a>",
			"<a href=\"$1\" target=\"blank\">$1</a>",
			"<span style='font-weight: bold;'>$1</span>",
			"<span style='font-style: italic;'>$1</span>",
			"<span style='text-decoration: underline;'>$1</span>",
			"<table width=\"90%\" cellspacing=\"1\" cellpadding=\"3\" border=\"0\" align=\"center\"><tr><td>"+
				"<span class=\"genmed\"><strong>Quote:</strong></span></td></tr><tr><td class=\"quote\">"+
				"<img align=\"left\" src=\"templates/fisubice/images/bg_quote_header.gif\">",
			"</td></tr></table>",
			"<table width=\"90%\" cellspacing=\"1\" cellpadding=\"3\" border=\"0\" align=\"center\"><tr><td>"+
				"<span class=\"genmed\"><strong>Quote: $1</strong></span></td></tr><tr><td class=\"quote\">" +
				"<img align=\"left\" src=\"templates/fisubice/images/bg_quote_header.gif\">",
			"</td></tr></table>",
			"<table width=\"90%\" cellspacing=\"1\" cellpadding=\"3\" border=\"0\" align=\"center\"><tr><td>" +
				"<span class=\"genmed\"><strong>Code:</strong></span></td></tr><tr><td class=\"code\" style=\"white-space: pre-wrap !important; white-space: pre; word-wrap: break-word;\">",
			"</td></tr></table>",
			"<table width=\"90%\" cellspacing=\"1\" cellpadding=\"3\" border=\"0\" align=\"center\"><tr><td>" +
				"<span class=\"genmed\"><strong>Moderated Message:</strong></span></td></tr><tr><td class=\"moderator\">",
			"</td></tr></table>",
			"<ul>", "</ul>",
			"<ol type='$1'>", "</ol>",
			"<li>",
			"<span style='color:$1'>$2</span>",
			"<span style='font-size:$1px; line-height: normal'>$2</span>"			
		];
		
		text = htmlspecialchars(text, "ENT_NOQUOTES");
		
		for(i = 0; i < search.length; i++) {
			 text = text.replace(search[i],replace[i]);
		}
		return text;
	};
	
	/**
	 * Javascript Warez-BB Smiley Parser
	 * @author Darkimmortal
	 * @param {string} text
	 */
	var smiley = function(text){
		
		var smilies = [
			{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_biggrin.gif" alt="Very Happy" border="0" />',
				replace: /([ \n\r\t]):D|:D([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_smile.gif" alt="Smile" border="0" />',
				replace: /([ \n\r\t]):\)|:\)([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_redface.gif" alt="Embarassed" border="0" />',
				replace: /([ \n\r\t]):oops:|:oops:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_sad.gif" alt="Sad" border="0" />',
				replace: /([ \n\r\t]):\(|:\(([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_surprised.gif" alt="Surprised" border="0" />',
				replace: /([ \n\r\t]):o|:o([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_eek.gif" alt="Shocked" border="0" />',
				replace: /([ \n\r\t]):shock:|:shock:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_question.gif" alt="Question" border="0" />',
				replace: /([ \n\r\t]):\?:|:\?:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_confused.gif" alt="Confused" border="0" />',
				replace: /([ \n\r\t]):\?|:\?([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_cool.gif" alt="Cool" border="0" />',
				replace: /([ \n\r\t])8-\)|8-\)([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_lol.gif" alt="Laughing" border="0" />',
				replace: /([ \n\r\t]):lol:|:lol:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_biggrin.gif" alt="Very Happy" border="0" />',
				replace: /([ \n\r\t]):\)|:\)([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_mad.gif" alt="Mad" border="0" />',
				replace: /([ \n\r\t]):x|:x([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_razz.gif" alt="Razz" border="0" />',
				replace: /([ \n\r\t]):P|:P([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_cry.gif" alt="Crying or Very sad" border="0" />',
				replace: /([ \n\r\t]):cry:|:cry:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_evil.gif" alt="Evil or Very Mad" border="0" />',
				replace: /([ \n\r\t]):evil:|:evil:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_twisted.gif" alt="Twisted Evil" border="0" />',
				replace: /([ \n\r\t]):twisted:|:twisted:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_rolleyes.gif" alt="Rolling Eyes" border="0" />',
				replace: /([ \n\r\t]):roll:|:roll:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_wink.gif" alt="Wink" border="0" />',
				replace: /([ \n\r\t]);\)| :wink:|;\) |:wink:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_neutral.gif" alt="Neutral" border="0" />',
				replace: /([ \n\r\t]):\|| :neutral:|:\| |:neutral:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_mrgreen.gif" alt="Mr. Green" border="0" />',
				replace: /([ \n\r\t]):mrgreen:|:mrgreen:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/worshippy.gif" alt="Worshippy" border="0" />',
				replace: /([ \n\r\t]):worship:|:worship:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_arrow.gif" alt="Arrow" border="0" />',
				replace: /([ \n\r\t]):arrow:|:arrow:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_idea.gif" alt="Idea" border="0" />',
				replace: /([ \n\r\t]):idea:|:idea:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_exclaim.gif" alt="Exclamation" border="0" />',
				replace: /([ \n\r\t]):!:|:!:([ \n\r\t])/g
			}
		];
		
		$.each(smilies, function(i, val){
			 text = text.replace(val.replace,"$1"+val.smiley+"$2");		
		});	
		
		return text;
	};
	
	var previewBox = [
		'<div class="wbbsc-pre" style="margin-top: 10px; margin-bottom: 20px; display: none;"><br /><table class="forumline" width="100%" cellspacing="1" cellpadding="3" border="0"><tr><th>Preview</th></tr><tr>' +
		'<td class="row1"><img src="templates/fisubice/images/icon_minipost.gif" alt="Post" width="12" height="9" class="imgspace" title="Post" />' +
		'<span class="postdetails">Posted: ',
		
		' &nbsp;&nbsp;&nbsp; Post subject: ',
		
		'&nbsp;&nbsp;&nbsp; </span></td></tr><tr>' +
		'<td class="row1"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="postbody">',
	
		'<br /><br />_________________<br /><div style="font-size: 11px"><br />Signature and profile details not available when previewing posts through WBB:SC.</div>' +
		'</td></tr></table></div>'
	];
	
	var previewPM = '<div class="wbbsc-pre" style="margin-bottom: 20px; display: none;"><br />' +
		'<table border="0" cellpadding="3" cellspacing="1" width="100%" class="forumline"><tr><th colspan="2">Preview</th></tr>' +
		'<tr><td align="right" class="row2"><span class="explaintitle">From:</span></td><td width="100%" class="row2"><span class="name">%s</span></td></tr>' +
		'<tr><td align="right" class="row2"><span class="explaintitle">To:</span></td><td class="row2"><span class="name">%s</span></td></tr>' +
		'<tr><td align="right" class="row2"><span class="explaintitle">Posted:</span></td><td class="row2"><span class="genmed">%s</span></td></tr>' +
		'<tr><td align="right" class="row2"><span class="explaintitle">&nbsp;&nbsp;Subject:</span></td><td class="row2"><span class="genmed">%s</span></td></tr>' +
		'<tr><td colspan="2" class="row1"><span class="postbody">%s<br /><br />_________________<div style="font-size: 11px"><br />' +
		'Signature and profile details not available when previewing PMs through WBB:SC.</div></span><br />&nbsp;</td></tr></table></div>';
		
	var debug = function(dbg){
		if(typeof unsafeWindow.console.debug == "function"){
			unsafeWindow.console.debug(dbg);
		}
	};
	
	var boxDate = function(){
		return date("D M d, Y g:i a");
	};
	
	//just so effect callbacks will always be called regardless of the existance of their subject elements
	$("body").append("<div class='faek' style='display: none; visibility: none;'><iframe id='lolframe'></iframe></div>" +
			"<iframe id='coolframe' name='coolframe' frameborder='0' width='100%' height='100%' style='display:none'></iframe>");
	
	var preview = function(){
		var text = smiley(bbCode($("#message").val()));
		$(".wbbsc-pre").remove();
		$(".forumline:eq("+($("img[src*='voting_bar.gif'], input[value='Submit Vote']").length > 0 ? "1" : "0")+")").after(previewBox[0]+boxDate()+previewBox[1]+previewBox[2]+lastMessage.replace(/\n/g, "<br />")+text.replace(/\n/g, "<br />")+previewBox[3]);
		$(".wbbsc-pre").slideDown("normal");
	};
	if(typeof z!="boolean"){z=true}
	var hidePreview = function(){
		if($("th:contains('Preview')").length > 0){
			$(".forumline:first, .wbbsc-pre").remove();
		}
	};
	
	var fthatiframe = function(message, src){
		if(!message){
			$("iframe[src*='"+src+"']:first").siblings(".postbody_div").show("slow").siblings("iframe").hide("slow", function(){ $(this).remove() });
		} else {
			$("iframe[src*='"+src+"']:first").siblings(".postbody_div").html(message).show("slow").siblings("iframe").hide("slow", function(){ $(this).remove() });
		}
	};
	/*
	var selected = function(name, value){
		return ($.cookie(name) == "1") == value;
	};*/
	
	var getOption = function(name){	
		if(typeof GM_getValue == "function"){
			if(typeof GM_getValue(name) == "undefined"){
				//debug(name);
				var sett;
				for(sett in settingsPage){
					if(settingsPage[sett].name == name){
						return settingsPage[sett].preset;
					}
				}
				//debug("fail");
				return false;
			} else {
				return GM_getValue(name) == "1";
			}
		} else {
			return $.cookie(name) == "1";
		}
		//return typeof GM_getValue == "function" ? GM_getValue(name) == "1" : $.cookie(name) == "1";
	};
	
	var setOption = function(name, value){
		if(typeof GM_setValue == "function"){
			GM_setValue(name, value ? "1" : "0");
		} else {
			$.cookie(name, value ? "1" : "0", {expires: 'never'});
		}
	};
	
	var getString = function(name){
		return typeof GM_getValue == "function" ? GM_getValue(name) : $.cookie(name);
	};
	
	var setString = function(name, value){
		if(typeof GM_setValue == "function"){
			GM_setValue(name, value);
		} else {
			$.cookie(name, value, {expires: 'never'});
		}
	};
	
	
	var settings = function(title, desc, name){
		return '<tr><td class="row1" width="50%"><span class="explaintitle">'+title+'</span><br />' +
			'<span class="gensmall">'+desc+'</span></td>' +
			'<td class="row2" width="50%"> &nbsp;&nbsp; <select class="wbbscoption-'+name+'">' +
			'<option value="1"'+(getOption(name) ? ' selected="selected"' : '')+'>Yes</option>' +
			'<option value="0"'+(getOption(name) ? '' : ' selected="selected"')+'>No</option>' +
			'</select></td></tr>';
	}
	
	// for the lulz :P
	var anim_animate = [
		["W","B","B",":","S","C"," ","S","e","t","t","i","n","g","s"," ","::"," ","B","y"," ","D","a","r","k","i","m","m","o","r","t","a","l"],
		["W","B","B",":","S","C"," ","f","t","w","."],
		["S","t","o","p"," ","s","t","a","r","i","n","g"," ","a","t"," ","t","h","e"," ","t","i","t","l","e"," ",":","P"],
		["j","Q","u","e","r","y"," ","f","t","w","."],
		["D","a","m","n",","," ","I","'","v","e"," ","r","u","n"," ","o","u","t"," ","o","f"," ","r","a","n","d","o","m"," ","t","h","i","n","g","s"," ","t","o"," ",
			"s","a","y"," ","h","e","r","e"," ",":","("],
		["O","h"," ","w","e","l","l",","," ","t","i","m","e"," ","t","o"," ","r","e","p","e","a","t",".",".","."]
	];
	var anim_stage = 0;
	var anim_part = 0;
	var anim_direction = true;
	var animateTitle = function(){
		var otytul="Warez-BB.org :: "
		var tytul=otytul;
		if(anim_direction){
			for(var i=0; i <= anim_stage; i++){
				tytul += anim_animate[anim_part][i];
			}
			if(anim_stage == anim_animate[anim_part].length-1){
				anim_direction=false;
				setTimeout(animateTitle, 5000);
			} else {
				anim_stage ++;
				setTimeout(animateTitle, 15);
			}
		} else {
			for(var i=0; i <= anim_stage; i++){
				tytul += anim_animate[anim_part][i];
			}
			if(anim_stage == 0){
				anim_direction=true;
				tytul=otytul;
				if(anim_part == anim_animate.length-1){
					anim_part = 0;
				} else {
					anim_part ++;
				}
				setTimeout(animateTitle, 900);
			} else {
				anim_stage --;
				setTimeout(animateTitle, 15);
			}
		}
		document.title=tytul;
	};
				
	if(page("profile.php?mode=editprofile#wbbsc-settings")){
		animateTitle();
		$("form[name='addprofile'] > table.forumline").hide();
		$("td.maintitle").text("WBB:SC Settings");
		$("td.nav").empty().html('<a href="index.php">Warez-BB.org</a> &raquo; WBB:SC Settings'); 	
		
		var tehSettings = "";
		$.each(settingsPage, function(i, val){
			 tehSettings += settings(val.title, val.desc, val.name);
		});
		$(".forumline:first").show().html('<tr>' +
			'<th colspan="2">WBB:SC Settings</th></tr><tr><td height="22" colspan="2" class="row2">' +
			'<span class="gensmall">This page allows you to configure various settings for Warez-BB SuperCharged.</span></td></tr>' + tehSettings +		
			'<tr><td class="cat" colspan="2" align="center"><input type="button" id="wbbsc-save" value="Save Settings" class="mainoption" /> &nbsp; ' +
			'<input type="button" id="wbbsc-default" value="Restore Defaults" class="liteoption" /><br /><br />' +
			'<input type="button" id="wbbsc-selectforum" value="Reset Quick Search Forum Dropdown" class="liteoption" /></td></tr>' +
			'');
			
		$("#wbbsc-save").click(function(){
			$.each(settingsPage, function(i, val){
				 setOption(val.name, $(".wbbscoption-"+val.name).val() == "1" || $(".wbbscoption-"+val.name).val() == "Yes");
			});
			$(this).attr("disabled", "disabled").attr("value", "Saved.");
			location.reload(false);
		});
		
		$("#wbbsc-default").click(function(){
			if(confirm(" - Warez-BB SuperCharged - \r\n\r\n     " +
					   "      Are you sure?")){
				setOption("welcome", false);
				location.reload(false);
			}
		});
		
		$("#wbbsc-selectforum").click(function(){				
			setString("selectforum", "");
			setOption("setselect", 0);						
			alert("Reset quick search dropdown contents successfully.\n\nPlease visit any topic to have this updated to reflect your current forum access.");			
		});
	}
	
	
	//gets used later so it's best that it's definied as a func now.
	var setupEvents = function(phail){
		//if(phail){
		//	phail = phail ? ".forumline > tbody > tr:last-child + tr:last-child + tr:lastchild"
		if(getOption("inlineedit")){
			$("a[href^='posting.php?mode=editpost']").each(function(){
				
				$(this).attr("phail", $(this).attr("href")).attr("href", "javascr"+"ipt:void('   hey there, this text is just here so the dark theme can find it ;)   ');")
				.attr("title", "WBB:SC Inline Edit").click(function(){
					
					$(this).hide().after("<span> Please wait... </span>");
					var postbody = $(this).parents("table:first").next();
					postbody.contents().find(".postbody_div").hide("slow")
					.after("<iframe src='"+$(this).attr("phail")+"' frameborder='0' width='100%' height='700' scrolling='auto' style='display: none' />");
					
					postbody.contents().find("iframe:first").load(function(){
						var fi = $(this).contents();
						//fi.find("span.genlarge").parents("tr[align='center']:first")
						fi.find("table[width='100%'][cellspacing='2'][cellpadding='2'][border='0']:first").hide().next().hide().siblings("div.gensmall, table").hide()
						.siblings("form").children("table:first").hide();
						fi.find("table.footerline, #wadio, #theToolTip, #loading, #header_error, input[name='preview']").hide();
						fi.find(".topbkg:first").hide().next().hide();
						fi.find(".bodyline, ").css({background: "transparent", border: "0"}).addClass("gaybodyline");
						fi.find("body").addClass("gaybody").css({background: $(this).parents("td:first").parents("td:first").css("background-color"), border: "0"});
						fi.find("input[name='notify']").parents("tr:first").after("<tr><td></td><td class='gensmall'>FYI: Refresh after posting to see what" +
								"everyone else sees - WBB:SC's BBCode parser is very good, but not an exact replica of PhpBB2's.</td></tr>");
						var src = $(this).attr("src");
						fi.find(".wbbsc-hide").after(" &nbsp;&nbsp;<input type='button' value='"+buttonText.cancel+"' class='liteoption' />").next().click(function(){
							fthatiframe(false, src);
						});
						
						fi.find("input[name='post']").hide().after("<input type='button' value='"+buttonText.edit+"' class='mainoption' />").next().click(function(){
							if ($(this).parents("form:first").contents().find("#message").val().length < 2){
								alert(" - Warez-BB: SuperCharged -\r\n\r\nYour message is empty ;-)");
								return false;
							}
							var form = /*$(this).parents("form:first").serialize()*/superSerialize($(this).parents("form:first").serializeArray());
							form['post']='Submit';		
							form['wbbsc']='1';
							$(this).attr("disabled", "disabled").attr("value", buttonText.edit2);
							var message = smiley(bbCode($(this).parents("form:first").contents().find("#message").val()));
							//alert(message);
							var buton = $(this);
							$.ajax({
								dataType: "text",
								cache: false,
								data: form,//fix(form+"&post=Submit"),
								url: "posting.php?wbbsc=1",
								type: "POST",
								timeout: 15000,
								success: function(data){
									//alert("uh hey");
									if(data.indexOf("successfully") > 0){
										//alert(buton.parents("iframe:first").length);
									//	alert(src);
										fthatiframe(message.replace(/\n/g, "<br />"), src);//buton.parents("iframe:first").siblings(".postbody_div").html(message).show("slow").siblings("iframe").hide("slow");
									} else {
										buton.attr("disabled", "").attr("value", buttonText.edit);
										alert(" - Warez-BB: SuperCharged -\r\n\r\nAn error occured when submitting your edit.\r\n\r\nIf this keeps recurring, try refreshing the entire page - your session may have expired.");
									}
								},
								error: function(){
									buton.attr("disabled", "").attr("value", buttonText.edit);
									alert("- Warez-BB: SuperCharged -\r\n\r\nAn error occured when communicating with Warez-BB.\r\n\r\nEither Warez-BB is lagging or your internet connection is faulty.");
								}
							});
						});
						// click thing has ended before these
						$(this).parents("table:first").prev().contents().find("a[title^='WBB:SC']").show().next().remove();
						$(this).show("slow");
					});
					
				});		
			});
		}
		/*
		if(getOption("inlinereport")){
			$("a[href^='./report.php']").each(function(){
				//$(this).attr("href", "./report.php?p=#");
				$(this).click(function(){
					debug($(this).parents("td.row1:first").parent().next().next().after(base64_decode(inlineReportHTML)).next()
						.children().children().attr("action", $(this).attr("href")).children().show("slow"));
					//;
					return false;
				});
			});
		}*/
		
		if(typeof phail == "undefined" || !phail){
			$("a[href*='posting.php?mode=quote']").each(function(){
				//$(this).before("<input style='vertical-align: bottom' class='wbbsc-quote liteoption' type='button' value='"+buttonText.quote+"' /> ");
				$(this).before("<a href='javascript:;' class='wbbsc-quote'><img class='imgtopic' alt='' src='http://i34.tinypic.com/30kf3h5.gif' border='0' /></a>");		
			});
			
			var quickQuote = function(){
				var txtarea = ad("message");		
				var buton = $(this);
				var name = $(this).parents("tr:first").parents("tr:first").children("td:first").children(".name").children("strong").text();
				
				var found = html2bb($(this).parents("tr:first").parents("tr:first").contents().find(".postbody_div").get(0));
				found = "[quote=\""+name+"\"]"+found+"[/quote]";
						
				if (txtarea.createTextRange && txtarea.caretPos){
					var caretPos = txtarea.caretPos;
					caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? caretPos.text + found + ' ' : caretPos.text + found;
				} else if (txtarea.selectionEnd && (txtarea.selectionStart | txtarea.selectionStart === 0)){ 
					mozInsert(txtarea, found, "");
				} else {
					txtarea.value += found;
				}
				window.scrollTo(0, 1000000);		
			};
			
			if(getOption("quickquote")){
				$(".wbbsc-quote").click(quickQuote);
			} else {
				$(".wbbsc-quote").hide();
			}
		}
			if(getOption("qqoverride")){
				$("a[href='posting.php?mode=quote']").attr("href", "javascript:void('posting.php?mode=quote <-- just there for the dark theme ;)   ');").click(quickQuote);
			}
	};
		
	
	if(page("viewtopic.php")){
		
		//alert($(".postbody_div:eq(3)").get(0).nodeName);
		//alert(convertHTMLtoBBCode("", $(".postbody_div:eq(3)").get(0)));
		
		
		$(".mainoption").removeClass('mainoption').addClass('liteoption');
		if(getOption('bigreply')){
			$("#message").css({height: "180px"});
		}
		
		if(getOption('quickimg')){
			$("input[accesskey='c']").after(" <input type='button' class='button' id='imgthing' value='Img' title='Thank WBB:SC for this :P' />");
			$("#imgthing").click(function(){
				mozInsert($("#message").get(0), "[img]", "[/img]");
			});
		}
				
		if(getString("selectforum") == null || !getOption("setselect")){
			setString("selectforum", $("select[name='f']").html().replace(/Select a forum/gi, "All forums").replace(/ selected="selected"/gi, ""));
			setOption("setselect", true);
		}
		
		//run the event setup function definied above
		
		setupEvents();
		
		$("input[name='preview']").after(" <input type='hidden' name='post' value='Submit' />" +
				"<input class='wbbsc-submit mainoption' type='button' value='"+buttonText.submit+"' />" +
				" <input class='wbbsc-preview liteoption' type='button' value='"+buttonText.preview+"' />");
				
				
		$(".wbbsc-preview").after(" &nbsp;<span id='uploadholder'><span id='uploadbutton'></span></span><br /><input disabled='disabled' size='100' class='helpline' name='helpbox' type='text' />");
		$("#uploadholder").css({verticalAlign: "bottom"});
		/*
		var fz_sc = document.createElement("script");
		fz_sc.src = "http://code.jquery.com/jquery-latest.js";
		document.getElementsByTagName("head")[0].appendChild(fz_sc);
		
		var fz_sc2 = document.createElement("script");
		fz_sc2.innerHTML = base64_decode("dmFyIFNXRlVwbG9hZDtpZihTV0ZVcGxvYWQ9PXVuZGVmaW5lZCl7U1dGVXBsb2FkPWZ1bmN0aW9uKHNldHRpbmdzKXt0aGlzLmluaXRTV0ZVcGxvYWQoc2V0dGluZ3MpfX1TV0ZVcGxvYWQucHJvdG90eXBlLmluaXRTV0ZVcGxvYWQ9ZnVuY3Rpb24oc2V0dGluZ3Mpe3RyeXt0aGlzLmN1c3RvbVNldHRpbmdzPXt9O3RoaXMuc2V0dGluZ3M9c2V0dGluZ3M7dGhpcy5ldmVudFF1ZXVlPVtdO3RoaXMubW92aWVOYW1lPSJTV0ZVcGxvYWRfIitTV0ZVcGxvYWQubW92aWVDb3VudCsrO3RoaXMubW92aWVFbGVtZW50PW51bGw7U1dGVXBsb2FkLmluc3RhbmNlc1t0aGlzLm1vdmllTmFtZV09dGhpczt0aGlzLmluaXRTZXR0aW5ncygpO3RoaXMubG9hZEZsYXNoKCk7dGhpcy5kaXNwbGF5RGVidWdJbmZvKCl9Y2F0Y2goZXgpe2RlbGV0ZSBTV0ZVcGxvYWQuaW5zdGFuY2VzW3RoaXMubW92aWVOYW1lXTt0aHJvdyBleDt9fTtTV0ZVcGxvYWQuaW5zdGFuY2VzPXt9O1NXRlVwbG9hZC5tb3ZpZUNvdW50PTA7U1dGVXBsb2FkLnZlcnNpb249IjIuMi4wIEJldGEgMyI7U1dGVXBsb2FkLlFVRVVFX0VSUk9SPXtRVUVVRV9MSU1JVF9FWENFRURFRDotMTAwLEZJTEVfRVhDRUVEU19TSVpFX0xJTUlUOi0xMTAsWkVST19CWVRFX0ZJTEU6LTEyMCxJTlZBTElEX0ZJTEVUWVBFOi0xMzB9O1NXRlVwbG9hZC5VUExPQURfRVJST1I9e0hUVFBfRVJST1I6LTIwMCxNSVNTSU5HX1VQTE9BRF9VUkw6LTIxMCxJT19FUlJPUjotMjIwLFNFQ1VSSVRZX0VSUk9SOi0yMzAsVVBMT0FEX0xJTUlUX0VYQ0VFREVEOi0yNDAsVVBMT0FEX0ZBSUxFRDotMjUwLFNQRUNJRklFRF9GSUxFX0lEX05PVF9GT1VORDotMjYwLEZJTEVfVkFMSURBVElPTl9GQUlMRUQ6LTI3MCxGSUxFX0NBTkNFTExFRDotMjgwLFVQTE9BRF9TVE9QUEVEOi0yOTB9O1NXRlVwbG9hZC5GSUxFX1NUQVRVUz17UVVFVUVEOi0xLElOX1BST0dSRVNTOi0yLEVSUk9SOi0zLENPTVBMRVRFOi00LENBTkNFTExFRDotNX07U1dGVXBsb2FkLkJVVFRPTl9BQ1RJT049e1NFTEVDVF9GSUxFOi0xMDAsU0VMRUNUX0ZJTEVTOi0xMTAsU1RBUlRfVVBMT0FEOi0xMjB9O1NXRlVwbG9hZC5DVVJTT1I9e0FSUk9XOi0xLEhBTkQ6LTJ9O1NXRlVwbG9hZC5XSU5ET1dfTU9ERT17V0lORE9XOiJ3aW5kb3ciLFRSQU5TUEFSRU5UOiJ0cmFuc3BhcmVudCIsT1BBUVVFOiJvcGFxdWUifTtTV0ZVcGxvYWQucHJvdG90eXBlLmluaXRTZXR0aW5ncz1mdW5jdGlvbigpe3RoaXMuZW5zdXJlRGVmYXVsdD1mdW5jdGlvbihzZXR0aW5nTmFtZSxkZWZhdWx0VmFsdWUpe3RoaXMuc2V0dGluZ3Nbc2V0dGluZ05hbWVdPSh0aGlzLnNldHRpbmdzW3NldHRpbmdOYW1lXT09dW5kZWZpbmVkKT9kZWZhdWx0VmFsdWU6dGhpcy5zZXR0aW5nc1tzZXR0aW5nTmFtZV19O3RoaXMuZW5zdXJlRGVmYXVsdCgidXBsb2FkX3VybCIsIiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9wb3N0X25hbWUiLCJGaWxlZGF0YSIpO3RoaXMuZW5zdXJlRGVmYXVsdCgicG9zdF9wYXJhbXMiLHt9KTt0aGlzLmVuc3VyZURlZmF1bHQoInVzZV9xdWVyeV9zdHJpbmciLGZhbHNlKTt0aGlzLmVuc3VyZURlZmF1bHQoInJlcXVldWVfb25fZXJyb3IiLGZhbHNlKTt0aGlzLmVuc3VyZURlZmF1bHQoImh0dHBfc3VjY2VzcyIsW10pO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV90eXBlcyIsIiouKiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV90eXBlc19kZXNjcmlwdGlvbiIsIkFsbCBGaWxlcyIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9zaXplX2xpbWl0IiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfdXBsb2FkX2xpbWl0IiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfcXVldWVfbGltaXQiLDApO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmxhc2hfdXJsIiwic3dmdXBsb2FkLnN3ZiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgicHJldmVudF9zd2ZfY2FjaGluZyIsZmFsc2UpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX2ltYWdlX3VybCIsIiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX3dpZHRoIiwxKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl9oZWlnaHQiLDEpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX3RleHQiLCIiKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl90ZXh0X3N0eWxlIiwiY29sb3I6ICMwMDAwMDA7IGZvbnQtc2l6ZTogMTZwdDsiKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl90ZXh0X3RvcF9wYWRkaW5nIiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl90ZXh0X2xlZnRfcGFkZGluZyIsMCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fYWN0aW9uIixTV0ZVcGxvYWQuQlVUVE9OX0FDVElPTi5TRUxFQ1RfRklMRVMpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX2Rpc2FibGVkIixmYWxzZSk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fcGxhY2Vob2xkZXJfaWQiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX2N1cnNvciIsU1dGVXBsb2FkLkNVUlNPUi5BUlJPVyk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fd2luZG93X21vZGUiLFNXRlVwbG9hZC5XSU5ET1dfTU9ERS5XSU5ET1cpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZGVidWciLGZhbHNlKTt0aGlzLnNldHRpbmdzLmRlYnVnX2VuYWJsZWQ9dGhpcy5zZXR0aW5ncy5kZWJ1Zzt0aGlzLnNldHRpbmdzLnJldHVybl91cGxvYWRfc3RhcnRfaGFuZGxlcj10aGlzLnJldHVyblVwbG9hZFN0YXJ0O3RoaXMuZW5zdXJlRGVmYXVsdCgic3dmdXBsb2FkX2xvYWRlZF9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfZGlhbG9nX3N0YXJ0X2hhbmRsZXIiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9xdWV1ZWRfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJmaWxlX3F1ZXVlX2Vycm9yX2hhbmRsZXIiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9kaWFsb2dfY29tcGxldGVfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJ1cGxvYWRfc3RhcnRfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJ1cGxvYWRfcHJvZ3Jlc3NfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJ1cGxvYWRfZXJyb3JfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJ1cGxvYWRfc3VjY2Vzc19oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoInVwbG9hZF9jb21wbGV0ZV9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoImRlYnVnX2hhbmRsZXIiLHRoaXMuZGVidWdNZXNzYWdlKTt0aGlzLmVuc3VyZURlZmF1bHQoImN1c3RvbV9zZXR0aW5ncyIse30pO3RoaXMuY3VzdG9tU2V0dGluZ3M9dGhpcy5zZXR0aW5ncy5jdXN0b21fc2V0dGluZ3M7aWYodGhpcy5zZXR0aW5ncy5wcmV2ZW50X3N3Zl9jYWNoaW5nJiZmYWxzZSl7dGhpcy5zZXR0aW5ncy5mbGFzaF91cmw9dGhpcy5zZXR0aW5ncy5mbGFzaF91cmw7fWRlbGV0ZSB0aGlzLmVuc3VyZURlZmF1bHR9O1NXRlVwbG9hZC5wcm90b3R5cGUubG9hZEZsYXNoPWZ1bmN0aW9uKCl7aWYodGhpcy5zZXR0aW5ncy5idXR0b25fcGxhY2Vob2xkZXJfaWQhPT0iIil7dGhpcy5yZXBsYWNlV2l0aEZsYXNoKCl9ZWxzZXt0aGlzLmFwcGVuZEZsYXNoKCl9fTtTV0ZVcGxvYWQucHJvdG90eXBlLmFwcGVuZEZsYXNoPWZ1bmN0aW9uKCl7dmFyIHRhcmdldEVsZW1lbnQsY29udGFpbmVyO2lmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubW92aWVOYW1lKSE9PW51bGwpe3Rocm93IklEICIrdGhpcy5tb3ZpZU5hbWUrIiBpcyBhbHJlYWR5IGluIHVzZS4gVGhlIEZsYXNoIE9iamVjdCBjb3VsZCBub3QgYmUgYWRkZWQiO310YXJnZXRFbGVtZW50PWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCJib2R5IilbMF07aWYodGFyZ2V0RWxlbWVudD09dW5kZWZpbmVkKXt0aHJvdyJDb3VsZCBub3QgZmluZCB0aGUgJ2JvZHknIGVsZW1lbnQuIjt9Y29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImRpdiIpO2NvbnRhaW5lci5zdHlsZS53aWR0aD0iMXB4Ijtjb250YWluZXIuc3R5bGUuaGVpZ2h0PSIxcHgiO2NvbnRhaW5lci5zdHlsZS5vdmVyZmxvdz0iaGlkZGVuIjt0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7Y29udGFpbmVyLmlubmVySFRNTD10aGlzLmdldEZsYXNoSFRNTCgpO2lmKHdpbmRvd1t0aGlzLm1vdmllTmFtZV09PXVuZGVmaW5lZCl7d2luZG93W3RoaXMubW92aWVOYW1lXT10aGlzLmdldE1vdmllRWxlbWVudCgpfX07U1dGVXBsb2FkLnByb3RvdHlwZS5yZXBsYWNlV2l0aEZsYXNoPWZ1bmN0aW9uKCl7dmFyIHRhcmdldEVsZW1lbnQsdGVtcFBhcmVudDtpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLm1vdmllTmFtZSkhPT1udWxsKXt0aHJvdyJJRCAiK3RoaXMubW92aWVOYW1lKyIgaXMgYWxyZWFkeSBpbiB1c2UuIFRoZSBGbGFzaCBPYmplY3QgY291bGQgbm90IGJlIGFkZGVkIjt9dGFyZ2V0RWxlbWVudD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmJ1dHRvbl9wbGFjZWhvbGRlcl9pZCk7aWYodGFyZ2V0RWxlbWVudD09dW5kZWZpbmVkKXt0aHJvdyJDb3VsZCBub3QgZmluZCB0aGUgcGxhY2Vob2xkZXIgZWxlbWVudC4iO310ZW1wUGFyZW50PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImRpdiIpO3RlbXBQYXJlbnQuaW5uZXJIVE1MPXRoaXMuZ2V0Rmxhc2hIVE1MKCk7dGFyZ2V0RWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0ZW1wUGFyZW50LmZpcnN0Q2hpbGQsdGFyZ2V0RWxlbWVudCk7aWYod2luZG93W3RoaXMubW92aWVOYW1lXT09dW5kZWZpbmVkKXt3aW5kb3dbdGhpcy5tb3ZpZU5hbWVdPXRoaXMuZ2V0TW92aWVFbGVtZW50KCl9fTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldEZsYXNoSFRNTD1mdW5jdGlvbigpe3JldHVyblsnPG9iamVjdCBpZD0iJyx0aGlzLm1vdmllTmFtZSwnIiB0eXBlPSJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCIgZGF0YT0iJyx0aGlzLnNldHRpbmdzLmZsYXNoX3VybCwnIiB3aWR0aD0iJyx0aGlzLnNldHRpbmdzLmJ1dHRvbl93aWR0aCwnIiBoZWlnaHQ9IicsdGhpcy5zZXR0aW5ncy5idXR0b25faGVpZ2h0LCciIGNsYXNzPSJzd2Z1cGxvYWQiPicsJzxwYXJhbSBuYW1lPSJ3bW9kZSIgdmFsdWU9IicsdGhpcy5zZXR0aW5ncy5idXR0b25fd2luZG93X21vZGUsJyIgLz4nLCc8cGFyYW0gbmFtZT0ibW92aWUiIHZhbHVlPSInLHRoaXMuc2V0dGluZ3MuZmxhc2hfdXJsLCciIC8+JywnPHBhcmFtIG5hbWU9InF1YWxpdHkiIHZhbHVlPSJoaWdoIiAvPicsJzxwYXJhbSBuYW1lPSJtZW51IiB2YWx1ZT0iZmFsc2UiIC8+JywnPHBhcmFtIG5hbWU9ImFsbG93U2NyaXB0QWNjZXNzIiB2YWx1ZT0iYWx3YXlzIiAvPicsJzxwYXJhbSBuYW1lPSJmbGFzaHZhcnMiIHZhbHVlPSInK3RoaXMuZ2V0Rmxhc2hWYXJzKCkrJyIgLz4nLCc8L29iamVjdD4nXS5qb2luKCIiKX07U1dGVXBsb2FkLnByb3RvdHlwZS5nZXRGbGFzaFZhcnM9ZnVuY3Rpb24oKXt2YXIgcGFyYW1TdHJpbmc9dGhpcy5idWlsZFBhcmFtU3RyaW5nKCk7dmFyIGh0dHBTdWNjZXNzU3RyaW5nPXRoaXMuc2V0dGluZ3MuaHR0cF9zdWNjZXNzLmpvaW4oIiwiKTtyZXR1cm5bIm1vdmllTmFtZT0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLm1vdmllTmFtZSksIiZ1cGxvYWRVUkw9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy51cGxvYWRfdXJsKSwiJnVzZVF1ZXJ5U3RyaW5nPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MudXNlX3F1ZXJ5X3N0cmluZyksIiZyZXF1ZXVlT25FcnJvcj0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLnJlcXVldWVfb25fZXJyb3IpLCImaHR0cFN1Y2Nlc3M9IixlbmNvZGVVUklDb21wb25lbnQoaHR0cFN1Y2Nlc3NTdHJpbmcpLCImcGFyYW1zPSIsZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtU3RyaW5nKSwiJmZpbGVQb3N0TmFtZT0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmZpbGVfcG9zdF9uYW1lKSwiJmZpbGVUeXBlcz0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmZpbGVfdHlwZXMpLCImZmlsZVR5cGVzRGVzY3JpcHRpb249IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5maWxlX3R5cGVzX2Rlc2NyaXB0aW9uKSwiJmZpbGVTaXplTGltaXQ9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5maWxlX3NpemVfbGltaXQpLCImZmlsZVVwbG9hZExpbWl0PSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZmlsZV91cGxvYWRfbGltaXQpLCImZmlsZVF1ZXVlTGltaXQ9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5maWxlX3F1ZXVlX2xpbWl0KSwiJmRlYnVnRW5hYmxlZD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmRlYnVnX2VuYWJsZWQpLCImYnV0dG9uSW1hZ2VVUkw9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5idXR0b25faW1hZ2VfdXJsKSwiJmJ1dHRvbldpZHRoPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX3dpZHRoKSwiJmJ1dHRvbkhlaWdodD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl9oZWlnaHQpLCImYnV0dG9uVGV4dD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0KSwiJmJ1dHRvblRleHRUb3BQYWRkaW5nPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfdG9wX3BhZGRpbmcpLCImYnV0dG9uVGV4dExlZnRQYWRkaW5nPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfbGVmdF9wYWRkaW5nKSwiJmJ1dHRvblRleHRTdHlsZT0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3N0eWxlKSwiJmJ1dHRvbkFjdGlvbj0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl9hY3Rpb24pLCImYnV0dG9uRGlzYWJsZWQ9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5idXR0b25fZGlzYWJsZWQpLCImYnV0dG9uQ3Vyc29yPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX2N1cnNvcildLmpvaW4oIiIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldE1vdmllRWxlbWVudD1mdW5jdGlvbigpe2lmKHRoaXMubW92aWVFbGVtZW50PT11bmRlZmluZWQpe3RoaXMubW92aWVFbGVtZW50PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubW92aWVOYW1lKX1pZih0aGlzLm1vdmllRWxlbWVudD09PW51bGwpe3Rocm93IkNvdWxkIG5vdCBmaW5kIEZsYXNoIGVsZW1lbnQiO31yZXR1cm4gdGhpcy5tb3ZpZUVsZW1lbnR9O1NXRlVwbG9hZC5wcm90b3R5cGUuYnVpbGRQYXJhbVN0cmluZz1mdW5jdGlvbigpe3ZhciBwb3N0UGFyYW1zPXRoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXM7dmFyIHBhcmFtU3RyaW5nUGFpcnM9W107aWYodHlwZW9mKHBvc3RQYXJhbXMpPT09Im9iamVjdCIpe2Zvcih2YXIgbmFtZSBpbiBwb3N0UGFyYW1zKXtpZihwb3N0UGFyYW1zLmhhc093blByb3BlcnR5KG5hbWUpKXtwYXJhbVN0cmluZ1BhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUudG9TdHJpbmcoKSkrIj0iK2VuY29kZVVSSUNvbXBvbmVudChwb3N0UGFyYW1zW25hbWVdLnRvU3RyaW5nKCkpKX19fXJldHVybiBwYXJhbVN0cmluZ1BhaXJzLmpvaW4oIiYiKX07U1dGVXBsb2FkLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dHJ5e3RoaXMuY2FuY2VsVXBsb2FkKG51bGwsZmFsc2UpO3ZhciBtb3ZpZUVsZW1lbnQ9bnVsbDttb3ZpZUVsZW1lbnQ9dGhpcy5nZXRNb3ZpZUVsZW1lbnQoKTtpZihtb3ZpZUVsZW1lbnQpe2Zvcih2YXIgaSBpbiBtb3ZpZUVsZW1lbnQpe3RyeXtpZih0eXBlb2YobW92aWVFbGVtZW50W2ldKT09PSJmdW5jdGlvbiIpe21vdmllRWxlbWVudFtpXT1udWxsfX1jYXRjaChleDEpe319dHJ5e21vdmllRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1vdmllRWxlbWVudCl9Y2F0Y2goZXgpe319d2luZG93W3RoaXMubW92aWVOYW1lXT1udWxsO1NXRlVwbG9hZC5pbnN0YW5jZXNbdGhpcy5tb3ZpZU5hbWVdPW51bGw7ZGVsZXRlIFNXRlVwbG9hZC5pbnN0YW5jZXNbdGhpcy5tb3ZpZU5hbWVdO3RoaXMubW92aWVFbGVtZW50PW51bGw7dGhpcy5zZXR0aW5ncz1udWxsO3RoaXMuY3VzdG9tU2V0dGluZ3M9bnVsbDt0aGlzLmV2ZW50UXVldWU9bnVsbDt0aGlzLm1vdmllTmFtZT1udWxsO3JldHVybiB0cnVlfWNhdGNoKGV4MSl7cmV0dXJuIGZhbHNlfX07U1dGVXBsb2FkLnByb3RvdHlwZS5kaXNwbGF5RGVidWdJbmZvPWZ1bmN0aW9uKCl7dGhpcy5kZWJ1ZyhbIi0tLVNXRlVwbG9hZCBJbnN0YW5jZSBJbmZvLS0tXG4iLCJWZXJzaW9uOiAiLFNXRlVwbG9hZC52ZXJzaW9uLCJcbiIsIk1vdmllIE5hbWU6ICIsdGhpcy5tb3ZpZU5hbWUsIlxuIiwiU2V0dGluZ3M6XG4iLCJcdCIsInVwbG9hZF91cmw6ICAgICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLnVwbG9hZF91cmwsIlxuIiwiXHQiLCJmbGFzaF91cmw6ICAgICAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5mbGFzaF91cmwsIlxuIiwiXHQiLCJ1c2VfcXVlcnlfc3RyaW5nOiAgICAgICAgICIsdGhpcy5zZXR0aW5ncy51c2VfcXVlcnlfc3RyaW5nLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJyZXF1ZXVlX29uX2Vycm9yOiAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5yZXF1ZXVlX29uX2Vycm9yLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJodHRwX3N1Y2Nlc3M6ICAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5odHRwX3N1Y2Nlc3Muam9pbigiLCAiKSwiXG4iLCJcdCIsImZpbGVfcG9zdF9uYW1lOiAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLmZpbGVfcG9zdF9uYW1lLCJcbiIsIlx0IiwicG9zdF9wYXJhbXM6ICAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXMudG9TdHJpbmcoKSwiXG4iLCJcdCIsImZpbGVfdHlwZXM6ICAgICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLmZpbGVfdHlwZXMsIlxuIiwiXHQiLCJmaWxlX3R5cGVzX2Rlc2NyaXB0aW9uOiAgICIsdGhpcy5zZXR0aW5ncy5maWxlX3R5cGVzX2Rlc2NyaXB0aW9uLCJcbiIsIlx0IiwiZmlsZV9zaXplX2xpbWl0OiAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuZmlsZV9zaXplX2xpbWl0LCJcbiIsIlx0IiwiZmlsZV91cGxvYWRfbGltaXQ6ICAgICAgICAiLHRoaXMuc2V0dGluZ3MuZmlsZV91cGxvYWRfbGltaXQsIlxuIiwiXHQiLCJmaWxlX3F1ZXVlX2xpbWl0OiAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5maWxlX3F1ZXVlX2xpbWl0LCJcbiIsIlx0IiwiZGVidWc6ICAgICAgICAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuZGVidWcudG9TdHJpbmcoKSwiXG4iLCJcdCIsInByZXZlbnRfc3dmX2NhY2hpbmc6ICAgICAgIix0aGlzLnNldHRpbmdzLnByZXZlbnRfc3dmX2NhY2hpbmcudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl9wbGFjZWhvbGRlcl9pZDogICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl9wbGFjZWhvbGRlcl9pZC50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX2ltYWdlX3VybDogICAgICAgICAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX2ltYWdlX3VybC50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX3dpZHRoOiAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX3dpZHRoLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25faGVpZ2h0OiAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5idXR0b25faGVpZ2h0LnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fdGV4dDogICAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dC50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX3RleHRfc3R5bGU6ICAgICAgICAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfc3R5bGUudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl90ZXh0X3RvcF9wYWRkaW5nOiAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3RvcF9wYWRkaW5nLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fdGV4dF9sZWZ0X3BhZGRpbmc6ICIsdGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dF9sZWZ0X3BhZGRpbmcudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl9hY3Rpb246ICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl9hY3Rpb24udG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl9kaXNhYmxlZDogICAgICAgICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl9kaXNhYmxlZC50b1N0cmluZygpLCJcbiIsIlx0IiwiY3VzdG9tX3NldHRpbmdzOiAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuY3VzdG9tX3NldHRpbmdzLnRvU3RyaW5nKCksIlxuIiwiRXZlbnQgSGFuZGxlcnM6XG4iLCJcdCIsInN3ZnVwbG9hZF9sb2FkZWRfaGFuZGxlciBhc3NpZ25lZDogICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnN3ZnVwbG9hZF9sb2FkZWRfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJmaWxlX2RpYWxvZ19zdGFydF9oYW5kbGVyIGFzc2lnbmVkOiAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy5maWxlX2RpYWxvZ19zdGFydF9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsImZpbGVfcXVldWVkX2hhbmRsZXIgYXNzaWduZWQ6ICAgICAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLmZpbGVfcXVldWVkX2hhbmRsZXI9PT0iZnVuY3Rpb24iKS50b1N0cmluZygpLCJcbiIsIlx0IiwiZmlsZV9xdWV1ZV9lcnJvcl9oYW5kbGVyIGFzc2lnbmVkOiAgIiwodHlwZW9mIHRoaXMuc2V0dGluZ3MuZmlsZV9xdWV1ZV9lcnJvcl9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsInVwbG9hZF9zdGFydF9oYW5kbGVyIGFzc2lnbmVkOiAgICAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnVwbG9hZF9zdGFydF9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsInVwbG9hZF9wcm9ncmVzc19oYW5kbGVyIGFzc2lnbmVkOiAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnVwbG9hZF9wcm9ncmVzc19oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsInVwbG9hZF9lcnJvcl9oYW5kbGVyIGFzc2lnbmVkOiAgICAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnVwbG9hZF9lcnJvcl9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsInVwbG9hZF9zdWNjZXNzX2hhbmRsZXIgYXNzaWduZWQ6ICAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnVwbG9hZF9zdWNjZXNzX2hhbmRsZXI9PT0iZnVuY3Rpb24iKS50b1N0cmluZygpLCJcbiIsIlx0IiwidXBsb2FkX2NvbXBsZXRlX2hhbmRsZXIgYXNzaWduZWQ6ICAgIiwodHlwZW9mIHRoaXMuc2V0dGluZ3MudXBsb2FkX2NvbXBsZXRlX2hhbmRsZXI9PT0iZnVuY3Rpb24iKS50b1N0cmluZygpLCJcbiIsIlx0IiwiZGVidWdfaGFuZGxlciBhc3NpZ25lZDogICAgICAgICAgICAgIiwodHlwZW9mIHRoaXMuc2V0dGluZ3MuZGVidWdfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIl0uam9pbigiIikpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmFkZFNldHRpbmc9ZnVuY3Rpb24obmFtZSx2YWx1ZSxkZWZhdWx0X3ZhbHVlKXtpZih2YWx1ZT09dW5kZWZpbmVkKXtyZXR1cm4odGhpcy5zZXR0aW5nc1tuYW1lXT1kZWZhdWx0X3ZhbHVlKX1lbHNle3JldHVybih0aGlzLnNldHRpbmdzW25hbWVdPXZhbHVlKX19O1NXRlVwbG9hZC5wcm90b3R5cGUuZ2V0U2V0dGluZz1mdW5jdGlvbihuYW1lKXtpZih0aGlzLnNldHRpbmdzW25hbWVdIT11bmRlZmluZWQpe3JldHVybiB0aGlzLnNldHRpbmdzW25hbWVdfXJldHVybiIifTtTV0ZVcGxvYWQucHJvdG90eXBlLmNhbGxGbGFzaD1mdW5jdGlvbihmdW5jdGlvbk5hbWUsYXJndW1lbnRBcnJheSl7YXJndW1lbnRBcnJheT1hcmd1bWVudEFycmF5fHxbXTt2YXIgbW92aWVFbGVtZW50PXRoaXMuZ2V0TW92aWVFbGVtZW50KCk7dmFyIHJldHVyblZhbHVlLHJldHVyblN0cmluZzt0cnl7cmV0dXJuU3RyaW5nPW1vdmllRWxlbWVudC5DYWxsRnVuY3Rpb24oJzxpbnZva2UgbmFtZT0iJytmdW5jdGlvbk5hbWUrJyIgcmV0dXJudHlwZT0iamF2YXNjcmlwdCI+JytfX2ZsYXNoX19hcmd1bWVudHNUb1hNTChhcmd1bWVudEFycmF5LDApKyc8L2ludm9rZT4nKTtyZXR1cm5WYWx1ZT1ldmFsKHJldHVyblN0cmluZyl9Y2F0Y2goZXgpe3Rocm93IkNhbGwgdG8gIitmdW5jdGlvbk5hbWUrIiBmYWlsZWQiO31pZihyZXR1cm5WYWx1ZSE9dW5kZWZpbmVkJiZ0eXBlb2YgcmV0dXJuVmFsdWUucG9zdD09PSJvYmplY3QiKXtyZXR1cm5WYWx1ZT10aGlzLnVuZXNjYXBlRmlsZVBvc3RQYXJhbXMocmV0dXJuVmFsdWUpfXJldHVybiByZXR1cm5WYWx1ZX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZWxlY3RGaWxlPWZ1bmN0aW9uKCl7dGhpcy5jYWxsRmxhc2goIlNlbGVjdEZpbGUiKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZWxlY3RGaWxlcz1mdW5jdGlvbigpe3RoaXMuY2FsbEZsYXNoKCJTZWxlY3RGaWxlcyIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLnN0YXJ0VXBsb2FkPWZ1bmN0aW9uKGZpbGVJRCl7dGhpcy5jYWxsRmxhc2goIlN0YXJ0VXBsb2FkIixbZmlsZUlEXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuY2FuY2VsVXBsb2FkPWZ1bmN0aW9uKGZpbGVJRCx0cmlnZ2VyRXJyb3JFdmVudCl7aWYodHJpZ2dlckVycm9yRXZlbnQhPT1mYWxzZSl7dHJpZ2dlckVycm9yRXZlbnQ9dHJ1ZX10aGlzLmNhbGxGbGFzaCgiQ2FuY2VsVXBsb2FkIixbZmlsZUlELHRyaWdnZXJFcnJvckV2ZW50XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc3RvcFVwbG9hZD1mdW5jdGlvbigpe3RoaXMuY2FsbEZsYXNoKCJTdG9wVXBsb2FkIil9O1NXRlVwbG9hZC5wcm90b3R5cGUuZ2V0U3RhdHM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jYWxsRmxhc2goIkdldFN0YXRzIil9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0U3RhdHM9ZnVuY3Rpb24oc3RhdHNPYmplY3Qpe3RoaXMuY2FsbEZsYXNoKCJTZXRTdGF0cyIsW3N0YXRzT2JqZWN0XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuZ2V0RmlsZT1mdW5jdGlvbihmaWxlSUQpe2lmKHR5cGVvZihmaWxlSUQpPT09Im51bWJlciIpe3JldHVybiB0aGlzLmNhbGxGbGFzaCgiR2V0RmlsZUJ5SW5kZXgiLFtmaWxlSURdKX1lbHNle3JldHVybiB0aGlzLmNhbGxGbGFzaCgiR2V0RmlsZSIsW2ZpbGVJRF0pfX07U1dGVXBsb2FkLnByb3RvdHlwZS5hZGRGaWxlUGFyYW09ZnVuY3Rpb24oZmlsZUlELG5hbWUsdmFsdWUpe3JldHVybiB0aGlzLmNhbGxGbGFzaCgiQWRkRmlsZVBhcmFtIixbZmlsZUlELG5hbWUsdmFsdWVdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5yZW1vdmVGaWxlUGFyYW09ZnVuY3Rpb24oZmlsZUlELG5hbWUpe3RoaXMuY2FsbEZsYXNoKCJSZW1vdmVGaWxlUGFyYW0iLFtmaWxlSUQsbmFtZV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldFVwbG9hZFVSTD1mdW5jdGlvbih1cmwpe3RoaXMuc2V0dGluZ3MudXBsb2FkX3VybD11cmwudG9TdHJpbmcoKTt0aGlzLmNhbGxGbGFzaCgiU2V0VXBsb2FkVVJMIixbdXJsXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0UG9zdFBhcmFtcz1mdW5jdGlvbihwYXJhbXNPYmplY3Qpe3RoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXM9cGFyYW1zT2JqZWN0O3RoaXMuY2FsbEZsYXNoKCJTZXRQb3N0UGFyYW1zIixbcGFyYW1zT2JqZWN0XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuYWRkUG9zdFBhcmFtPWZ1bmN0aW9uKG5hbWUsdmFsdWUpe3RoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXNbbmFtZV09dmFsdWU7dGhpcy5jYWxsRmxhc2goIlNldFBvc3RQYXJhbXMiLFt0aGlzLnNldHRpbmdzLnBvc3RfcGFyYW1zXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUucmVtb3ZlUG9zdFBhcmFtPWZ1bmN0aW9uKG5hbWUpe2RlbGV0ZSB0aGlzLnNldHRpbmdzLnBvc3RfcGFyYW1zW25hbWVdO3RoaXMuY2FsbEZsYXNoKCJTZXRQb3N0UGFyYW1zIixbdGhpcy5zZXR0aW5ncy5wb3N0X3BhcmFtc10pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEZpbGVUeXBlcz1mdW5jdGlvbih0eXBlcyxkZXNjcmlwdGlvbil7dGhpcy5zZXR0aW5ncy5maWxlX3R5cGVzPXR5cGVzO3RoaXMuc2V0dGluZ3MuZmlsZV90eXBlc19kZXNjcmlwdGlvbj1kZXNjcmlwdGlvbjt0aGlzLmNhbGxGbGFzaCgiU2V0RmlsZVR5cGVzIixbdHlwZXMsZGVzY3JpcHRpb25dKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRGaWxlU2l6ZUxpbWl0PWZ1bmN0aW9uKGZpbGVTaXplTGltaXQpe3RoaXMuc2V0dGluZ3MuZmlsZV9zaXplX2xpbWl0PWZpbGVTaXplTGltaXQ7dGhpcy5jYWxsRmxhc2goIlNldEZpbGVTaXplTGltaXQiLFtmaWxlU2l6ZUxpbWl0XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0RmlsZVVwbG9hZExpbWl0PWZ1bmN0aW9uKGZpbGVVcGxvYWRMaW1pdCl7dGhpcy5zZXR0aW5ncy5maWxlX3VwbG9hZF9saW1pdD1maWxlVXBsb2FkTGltaXQ7dGhpcy5jYWxsRmxhc2goIlNldEZpbGVVcGxvYWRMaW1pdCIsW2ZpbGVVcGxvYWRMaW1pdF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEZpbGVRdWV1ZUxpbWl0PWZ1bmN0aW9uKGZpbGVRdWV1ZUxpbWl0KXt0aGlzLnNldHRpbmdzLmZpbGVfcXVldWVfbGltaXQ9ZmlsZVF1ZXVlTGltaXQ7dGhpcy5jYWxsRmxhc2goIlNldEZpbGVRdWV1ZUxpbWl0IixbZmlsZVF1ZXVlTGltaXRdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRGaWxlUG9zdE5hbWU9ZnVuY3Rpb24oZmlsZVBvc3ROYW1lKXt0aGlzLnNldHRpbmdzLmZpbGVfcG9zdF9uYW1lPWZpbGVQb3N0TmFtZTt0aGlzLmNhbGxGbGFzaCgiU2V0RmlsZVBvc3ROYW1lIixbZmlsZVBvc3ROYW1lXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0VXNlUXVlcnlTdHJpbmc9ZnVuY3Rpb24odXNlUXVlcnlTdHJpbmcpe3RoaXMuc2V0dGluZ3MudXNlX3F1ZXJ5X3N0cmluZz11c2VRdWVyeVN0cmluZzt0aGlzLmNhbGxGbGFzaCgiU2V0VXNlUXVlcnlTdHJpbmciLFt1c2VRdWVyeVN0cmluZ10pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldFJlcXVldWVPbkVycm9yPWZ1bmN0aW9uKHJlcXVldWVPbkVycm9yKXt0aGlzLnNldHRpbmdzLnJlcXVldWVfb25fZXJyb3I9cmVxdWV1ZU9uRXJyb3I7dGhpcy5jYWxsRmxhc2goIlNldFJlcXVldWVPbkVycm9yIixbcmVxdWV1ZU9uRXJyb3JdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRIVFRQU3VjY2Vzcz1mdW5jdGlvbihodHRwX3N0YXR1c19jb2Rlcyl7aWYodHlwZW9mIGh0dHBfc3RhdHVzX2NvZGVzPT09InN0cmluZyIpe2h0dHBfc3RhdHVzX2NvZGVzPWh0dHBfc3RhdHVzX2NvZGVzLnJlcGxhY2UoIiAiLCIiKS5zcGxpdCgiLCIpfXRoaXMuc2V0dGluZ3MuaHR0cF9zdWNjZXNzPWh0dHBfc3RhdHVzX2NvZGVzO3RoaXMuY2FsbEZsYXNoKCJTZXRIVFRQU3VjY2VzcyIsW2h0dHBfc3RhdHVzX2NvZGVzXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0RGVidWdFbmFibGVkPWZ1bmN0aW9uKGRlYnVnRW5hYmxlZCl7dGhpcy5zZXR0aW5ncy5kZWJ1Z19lbmFibGVkPWRlYnVnRW5hYmxlZDt0aGlzLmNhbGxGbGFzaCgiU2V0RGVidWdFbmFibGVkIixbZGVidWdFbmFibGVkXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uSW1hZ2VVUkw9ZnVuY3Rpb24oYnV0dG9uSW1hZ2VVUkwpe2lmKGJ1dHRvbkltYWdlVVJMPT11bmRlZmluZWQpe2J1dHRvbkltYWdlVVJMPSIifXRoaXMuc2V0dGluZ3MuYnV0dG9uX2ltYWdlX3VybD1idXR0b25JbWFnZVVSTDt0aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uSW1hZ2VVUkwiLFtidXR0b25JbWFnZVVSTF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvbkRpbWVuc2lvbnM9ZnVuY3Rpb24od2lkdGgsaGVpZ2h0KXt0aGlzLnNldHRpbmdzLmJ1dHRvbl93aWR0aD13aWR0aDt0aGlzLnNldHRpbmdzLmJ1dHRvbl9oZWlnaHQ9aGVpZ2h0O3ZhciBtb3ZpZT10aGlzLmdldE1vdmllRWxlbWVudCgpO2lmKG1vdmllIT11bmRlZmluZWQpe21vdmllLnN0eWxlLndpZHRoPXdpZHRoKyJweCI7bW92aWUuc3R5bGUuaGVpZ2h0PWhlaWdodCsicHgifXRoaXMuY2FsbEZsYXNoKCJTZXRCdXR0b25EaW1lbnNpb25zIixbd2lkdGgsaGVpZ2h0XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uVGV4dD1mdW5jdGlvbihodG1sKXt0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0PWh0bWw7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvblRleHQiLFtodG1sXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uVGV4dFBhZGRpbmc9ZnVuY3Rpb24obGVmdCx0b3Ape3RoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfdG9wX3BhZGRpbmc9dG9wO3RoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfbGVmdF9wYWRkaW5nPWxlZnQ7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvblRleHRQYWRkaW5nIixbbGVmdCx0b3BdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRCdXR0b25UZXh0U3R5bGU9ZnVuY3Rpb24oY3NzKXt0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3N0eWxlPWNzczt0aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uVGV4dFN0eWxlIixbY3NzXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uRGlzYWJsZWQ9ZnVuY3Rpb24oaXNEaXNhYmxlZCl7dGhpcy5zZXR0aW5ncy5idXR0b25fZGlzYWJsZWQ9aXNEaXNhYmxlZDt0aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uRGlzYWJsZWQiLFtpc0Rpc2FibGVkXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uQWN0aW9uPWZ1bmN0aW9uKGJ1dHRvbkFjdGlvbil7dGhpcy5zZXR0aW5ncy5idXR0b25fYWN0aW9uPWJ1dHRvbkFjdGlvbjt0aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uQWN0aW9uIixbYnV0dG9uQWN0aW9uXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uQ3Vyc29yPWZ1bmN0aW9uKGN1cnNvcil7dGhpcy5zZXR0aW5ncy5idXR0b25fY3Vyc29yPWN1cnNvcjt0aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uQ3Vyc29yIixbY3Vyc29yXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUucXVldWVFdmVudD1mdW5jdGlvbihoYW5kbGVyTmFtZSxhcmd1bWVudEFycmF5KXtpZihhcmd1bWVudEFycmF5PT11bmRlZmluZWQpe2FyZ3VtZW50QXJyYXk9W119ZWxzZSBpZighKGFyZ3VtZW50QXJyYXkgaW5zdGFuY2VvZiBBcnJheSkpe2FyZ3VtZW50QXJyYXk9W2FyZ3VtZW50QXJyYXldfXZhciBzZWxmPXRoaXM7aWYodHlwZW9mIHRoaXMuc2V0dGluZ3NbaGFuZGxlck5hbWVdPT09ImZ1bmN0aW9uIil7dGhpcy5ldmVudFF1ZXVlLnB1c2goZnVuY3Rpb24oKXt0aGlzLnNldHRpbmdzW2hhbmRsZXJOYW1lXS5hcHBseSh0aGlzLGFyZ3VtZW50QXJyYXkpfSk7c2V0VGltZW91dChmdW5jdGlvbigpe3NlbGYuZXhlY3V0ZU5leHRFdmVudCgpfSwwKX1lbHNlIGlmKHRoaXMuc2V0dGluZ3NbaGFuZGxlck5hbWVdIT09bnVsbCl7dGhyb3ciRXZlbnQgaGFuZGxlciAiK2hhbmRsZXJOYW1lKyIgaXMgdW5rbm93biBvciBpcyBub3QgYSBmdW5jdGlvbiI7fX07U1dGVXBsb2FkLnByb3RvdHlwZS5leGVjdXRlTmV4dEV2ZW50PWZ1bmN0aW9uKCl7dmFyIGY9dGhpcy5ldmVudFF1ZXVlP3RoaXMuZXZlbnRRdWV1ZS5zaGlmdCgpOm51bGw7aWYodHlwZW9mKGYpPT09ImZ1bmN0aW9uIil7Zi5hcHBseSh0aGlzKX19O1NXRlVwbG9hZC5wcm90b3R5cGUudW5lc2NhcGVGaWxlUG9zdFBhcmFtcz1mdW5jdGlvbihmaWxlKXt2YXIgcmVnPS9bJF0oWzAtOWEtZl17NH0pL2k7dmFyIHVuZXNjYXBlZFBvc3Q9e307dmFyIHVrO2lmKGZpbGUhPXVuZGVmaW5lZCl7Zm9yKHZhciBrIGluIGZpbGUucG9zdCl7aWYoZmlsZS5wb3N0Lmhhc093blByb3BlcnR5KGspKXt1az1rO3ZhciBtYXRjaDt3aGlsZSgobWF0Y2g9cmVnLmV4ZWModWspKSE9PW51bGwpe3VrPXVrLnJlcGxhY2UobWF0Y2hbMF0sU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludCgiMHgiK21hdGNoWzFdLDE2KSkpfXVuZXNjYXBlZFBvc3RbdWtdPWZpbGUucG9zdFtrXX19ZmlsZS5wb3N0PXVuZXNjYXBlZFBvc3R9cmV0dXJuIGZpbGV9O1NXRlVwbG9hZC5wcm90b3R5cGUuZmxhc2hSZWFkeT1mdW5jdGlvbigpe3ZhciBtb3ZpZUVsZW1lbnQ9dGhpcy5nZXRNb3ZpZUVsZW1lbnQoKTtpZih0eXBlb2YobW92aWVFbGVtZW50LkNhbGxGdW5jdGlvbik9PT0idW5rbm93biIpe3RoaXMuZGVidWcoIlJlbW92aW5nIEZsYXNoIGZ1bmN0aW9ucyBob29rcyAodGhpcyBzaG91bGQgb25seSBydW4gaW4gSUUgYW5kIHNob3VsZCBwcmV2ZW50IG1lbW9yeSBsZWFrcykiKTtmb3IodmFyIGtleSBpbiBtb3ZpZUVsZW1lbnQpe3RyeXtpZih0eXBlb2YobW92aWVFbGVtZW50W2tleV0pPT09ImZ1bmN0aW9uIil7bW92aWVFbGVtZW50W2tleV09bnVsbH19Y2F0Y2goZXgpe319fXRoaXMucXVldWVFdmVudCgic3dmdXBsb2FkX2xvYWRlZF9oYW5kbGVyIil9O1NXRlVwbG9hZC5wcm90b3R5cGUuZmlsZURpYWxvZ1N0YXJ0PWZ1bmN0aW9uKCl7dGhpcy5xdWV1ZUV2ZW50KCJmaWxlX2RpYWxvZ19zdGFydF9oYW5kbGVyIil9O1NXRlVwbG9hZC5wcm90b3R5cGUuZmlsZVF1ZXVlZD1mdW5jdGlvbihmaWxlKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoImZpbGVfcXVldWVkX2hhbmRsZXIiLGZpbGUpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmZpbGVRdWV1ZUVycm9yPWZ1bmN0aW9uKGZpbGUsZXJyb3JDb2RlLG1lc3NhZ2Upe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgiZmlsZV9xdWV1ZV9lcnJvcl9oYW5kbGVyIixbZmlsZSxlcnJvckNvZGUsbWVzc2FnZV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLmZpbGVEaWFsb2dDb21wbGV0ZT1mdW5jdGlvbihudW1GaWxlc1NlbGVjdGVkLG51bUZpbGVzUXVldWVkKXt0aGlzLnF1ZXVlRXZlbnQoImZpbGVfZGlhbG9nX2NvbXBsZXRlX2hhbmRsZXIiLFtudW1GaWxlc1NlbGVjdGVkLG51bUZpbGVzUXVldWVkXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUudXBsb2FkU3RhcnQ9ZnVuY3Rpb24oZmlsZSl7ZmlsZT10aGlzLnVuZXNjYXBlRmlsZVBvc3RQYXJhbXMoZmlsZSk7dGhpcy5xdWV1ZUV2ZW50KCJyZXR1cm5fdXBsb2FkX3N0YXJ0X2hhbmRsZXIiLGZpbGUpfTtTV0ZVcGxvYWQucHJvdG90eXBlLnJldHVyblVwbG9hZFN0YXJ0PWZ1bmN0aW9uKGZpbGUpe3ZhciByZXR1cm5WYWx1ZTtpZih0eXBlb2YgdGhpcy5zZXR0aW5ncy51cGxvYWRfc3RhcnRfaGFuZGxlcj09PSJmdW5jdGlvbiIpe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3JldHVyblZhbHVlPXRoaXMuc2V0dGluZ3MudXBsb2FkX3N0YXJ0X2hhbmRsZXIuY2FsbCh0aGlzLGZpbGUpfWVsc2UgaWYodGhpcy5zZXR0aW5ncy51cGxvYWRfc3RhcnRfaGFuZGxlciE9dW5kZWZpbmVkKXt0aHJvdyJ1cGxvYWRfc3RhcnRfaGFuZGxlciBtdXN0IGJlIGEgZnVuY3Rpb24iO31pZihyZXR1cm5WYWx1ZT09PXVuZGVmaW5lZCl7cmV0dXJuVmFsdWU9dHJ1ZX1yZXR1cm5WYWx1ZT0hIXJldHVyblZhbHVlO3RoaXMuY2FsbEZsYXNoKCJSZXR1cm5VcGxvYWRTdGFydCIsW3JldHVyblZhbHVlXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUudXBsb2FkUHJvZ3Jlc3M9ZnVuY3Rpb24oZmlsZSxieXRlc0NvbXBsZXRlLGJ5dGVzVG90YWwpe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgidXBsb2FkX3Byb2dyZXNzX2hhbmRsZXIiLFtmaWxlLGJ5dGVzQ29tcGxldGUsYnl0ZXNUb3RhbF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnVwbG9hZEVycm9yPWZ1bmN0aW9uKGZpbGUsZXJyb3JDb2RlLG1lc3NhZ2Upe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgidXBsb2FkX2Vycm9yX2hhbmRsZXIiLFtmaWxlLGVycm9yQ29kZSxtZXNzYWdlXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUudXBsb2FkU3VjY2Vzcz1mdW5jdGlvbihmaWxlLHNlcnZlckRhdGEpe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgidXBsb2FkX3N1Y2Nlc3NfaGFuZGxlciIsW2ZpbGUsc2VydmVyRGF0YV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnVwbG9hZENvbXBsZXRlPWZ1bmN0aW9uKGZpbGUpe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgidXBsb2FkX2NvbXBsZXRlX2hhbmRsZXIiLGZpbGUpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmRlYnVnPWZ1bmN0aW9uKG1lc3NhZ2Upe3RoaXMucXVldWVFdmVudCgiZGVidWdfaGFuZGxlciIsbWVzc2FnZSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuZGVidWdNZXNzYWdlPWZ1bmN0aW9uKG1lc3NhZ2Upe2lmKHRoaXMuc2V0dGluZ3MuZGVidWcpe3ZhciBleGNlcHRpb25NZXNzYWdlLGV4Y2VwdGlvblZhbHVlcz1bXTtpZih0eXBlb2YgbWVzc2FnZT09PSJvYmplY3QiJiZ0eXBlb2YgbWVzc2FnZS5uYW1lPT09InN0cmluZyImJnR5cGVvZiBtZXNzYWdlLm1lc3NhZ2U9PT0ic3RyaW5nIil7Zm9yKHZhciBrZXkgaW4gbWVzc2FnZSl7aWYobWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShrZXkpKXtleGNlcHRpb25WYWx1ZXMucHVzaChrZXkrIjogIittZXNzYWdlW2tleV0pfX1leGNlcHRpb25NZXNzYWdlPWV4Y2VwdGlvblZhbHVlcy5qb2luKCJcbiIpfHwiIjtleGNlcHRpb25WYWx1ZXM9ZXhjZXB0aW9uTWVzc2FnZS5zcGxpdCgiXG4iKTtleGNlcHRpb25NZXNzYWdlPSJFWENFUFRJT046ICIrZXhjZXB0aW9uVmFsdWVzLmpvaW4oIlxuRVhDRVBUSU9OOiAiKTtTV0ZVcGxvYWQuQ29uc29sZS53cml0ZUxpbmUoZXhjZXB0aW9uTWVzc2FnZSl9ZWxzZXtTV0ZVcGxvYWQuQ29uc29sZS53cml0ZUxpbmUobWVzc2FnZSl9fX07U1dGVXBsb2FkLkNvbnNvbGU9e307U1dGVXBsb2FkLkNvbnNvbGUud3JpdGVMaW5lPWZ1bmN0aW9uKG1lc3NhZ2Upe3ZhciBjb25zb2xlLGRvY3VtZW50Rm9ybTt0cnl7Y29uc29sZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiU1dGVXBsb2FkX0NvbnNvbGUiKTtpZighY29uc29sZSl7ZG9jdW1lbnRGb3JtPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImZvcm0iKTtkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgiYm9keSIpWzBdLmFwcGVuZENoaWxkKGRvY3VtZW50Rm9ybSk7Y29uc29sZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJ0ZXh0YXJlYSIpO2NvbnNvbGUuaWQ9IlNXRlVwbG9hZF9Db25zb2xlIjtjb25zb2xlLnN0eWxlLmZvbnRGYW1pbHk9Im1vbm9zcGFjZSI7Y29uc29sZS5zZXRBdHRyaWJ1dGUoIndyYXAiLCJvZmYiKTtjb25zb2xlLndyYXA9Im9mZiI7Y29uc29sZS5zdHlsZS5vdmVyZmxvdz0iYXV0byI7Y29uc29sZS5zdHlsZS53aWR0aD0iNzAwcHgiO2NvbnNvbGUuc3R5bGUuaGVpZ2h0PSIzNTBweCI7Y29uc29sZS5zdHlsZS5tYXJnaW49IjVweCI7ZG9jdW1lbnRGb3JtLmFwcGVuZENoaWxkKGNvbnNvbGUpfWNvbnNvbGUudmFsdWUrPW1lc3NhZ2UrIlxuIjtjb25zb2xlLnNjcm9sbFRvcD1jb25zb2xlLnNjcm9sbEhlaWdodC1jb25zb2xlLmNsaWVudEhlaWdodH1jYXRjaChleCl7YWxlcnQoIkV4Y2VwdGlvbjogIitleC5uYW1lKyIgTWVzc2FnZTogIitleC5tZXNzYWdlKX19Ow==");
		document.getElementsByTagName("head")[0].appendChild(fz_sc2);
		
		var fz_sc3 = document.createElement("script");
		fz_sc3.innerHTML = base64_decode(warezbbimgkkscript);
		document.getElementsByTagName("head")[0].appendChild(fz_sc3);		*/
				
		$(".wbbsc-preview").click(function(){
			var buton = $(this);
			lastMessage = $("#quick_quote").get(0).checked ? smiley(bbCode($("input[name='last_msg']").val())) : "";
			preview();
		});
		
		$(".wbbsc-submit").click(function(){
			var buton = $(this);
			
			if ($("#message").val().length < 2){
				alert("Your message is too short/empty. ;)");
				return false;
			}
			
			var text = smiley(bbCode($("#message").val())).replace(/\n/g, "<br />");
			
			$("#message").val($("#message").val().replace(/ :P/g, " :P ").replace(/ :lol:/, " :lol: ")+" ");		
			$(".wbbsc-pre").remove();
	
			buton.attr("disabled", "disabled").attr("value", buttonText.submit2);
			$.ajax({
				dataType: "text",
				cache: false,
				data: $("form[name='post']").serialize()+"&post=Submit",
				url: "posting.php",
				type: "POST",
				timeout: 15000,
				success: function(data){
					if(data.indexOf("successfully") > 0){
						
						var lookingFor = /\<meta http-equiv="refresh" content="0;url=([^"]+)">/.exec(data);
						var url = lookingFor[1];
						var url2 = url.split("#");
						
						if(getOption("slowreply")){
							
							$.ajax({
								dataType: "text",
								cache: false,
								url: url,
								type: "GET",
								timeout: 20000,
								success: function(data){								
																	
									//regex > DOM.
									var lrow = $(".forumline:first").children("tbody").children("tr:gt("+($(".forumline:first").children("tbody").children("tr")
										.length-7)+"):lt(1)").children(".row1").length == 0 ? true : false;
									var lreplace = lrow ? /row2/g : /row1/g;
									var lwith = lrow ? "row1" : "row2";
									var allposts = /\<table class="forumline" width="100%" cellspacing="1" cellpadding="3" border="0">[\r\n]*?\<tr>[\r\n]*?\<th width="150" height="28">Author\<\/th>[\r\n]*?\<th width="100%">Message\<\/th>[\r\n]*?\<\/tr>([\s\S]*?)\<script language='JavaScript'>/.exec(data)[1].replace(/\<tr>[\r\n]*?\<td class="spacerow" colspan="2" height="1">\<img src="images\/spacer.gif" alt="" width="1" height="1" \/>\<\/td>[\r\n]*?\<\/tr>/g, "").split(/\<tr>[\r\n]*?\<td valign="top" class="row[12]">\<span class="name">/g);
									var post = 	'<tr><td valign="top" class="'+lwith+'">\<span class="name">' +
										allposts[(allposts.length-2)].replace(lreplace, lwith)+'</tr><tr><td valign="top" class="'+lwith+'"><span class="name">' +
										allposts[(allposts.length-1)].replace(lreplace, lwith);
									$(".spacerow:last").parents("tr:first").after(post);									
									$("input[name='preview'], input[name='post'], .wbbsc-preview").fadeOut("normal");								
									// gets the quote + edit buttons working ;)
									setupEvents(true);								
									buton.attr("disabled", "").attr("value", "Posted Successfully - Back").unbind('click').click(function(){
										history.go(-1); 
									});					
									$("#message").val("");
									$(".wbbsc-preview").after(" <input type='button' value='Refresh' class='liteoption' />").next().click(function(){
										location.reload(true);
									});
								},
								error: function(){
									$(buton).attr("disabled", "").attr("value", buttonText.submit);
									alert("- Warez-BB: SuperCharged -\r\n\r\nAn error occured when returning your post.\r\n\r\nYour post has still been submitted." +
											"\r\n\r\nThis error generally means your internet isn't fast enough or Warez-BB is lagging or being DDoSed or something.");
								}
							});
						
						} else {
							var lrow = $(".forumline:first").children("tbody").children("tr:gt("+($(".forumline:first").children("tbody").children("tr")
								.length-7)+"):lt(1)").children(".row1").length == 0 ? true : false;
							var lreplace = lrow ? /row2/g : /row1/g;
							var lwith = lrow ? "row1" : "row2";
							
							$(".wbbsc-pre").remove();
														
							var post = 	
								'<tr><td valign="top" class="'+lwith+'"><span class="name">You</span><br />' +
								'<span class="postdetails">WBB:SC User<br /><img border="0" src="http://i42.tinypic.com/68dje0.png" /><br />' +
								/*'<img border="0" src="http://i41.tinypic.com/316wz80.png" /><br /><br />' +
								'Haruhi is watching your every move.' +*/
								'</span></td><td valign="top" class="'+lwith+'">' +
								'<table width="100%" cellspacing="0" cellpadding="0" border="0"><tr>' +
								'<td class="postdetails"><b>Posted: <a href="#">A few seconds ago, lol.</a></b></td>' +
								'<td nowrap="nowrap" valign="top" align="right"><a href="posting.php?mode=editpost&p='+url2[1]+'" title="Edit"><img class="imgtopic" height="18" width="59" border="0" title="Edit/Delete this post" alt="Edit/Delete this post" src="http://img6.warez-bb.org/images/lang_english/icon_edit.gif"/></a></td></tr>' +
								'</table><table width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td class="postbody" valign="top">' +
								'<div class="postbody_div"><hr />'+text+'</div></td></tr><tr><td class="genmed" height="40" valign="bottom"><br />' +
								'_________________<br /><br />'+sig()+'</td></tr></table></td></tr>' +
								'<tr><td class="spacerow" height="1" colspan="2"><img height="1" width="1" alt="" src="images/spacer.gif"/></td></tr>';
							$(".spacerow:last").parents("tr:first").after(post);		
								
							$("input[name='preview'], input[name='post'], .wbbsc-preview").fadeOut("normal");		
							setupEvents(true);								
							buton.attr("disabled", "").attr("value", "Posted Successfully - Back").unbind('click').click(function(){
								history.go(-1); 
							});					
							$("#message").val("");
							$(".wbbsc-preview").after(" <input type='button' value='Refresh' class='liteoption' />").next().click(function(){
								location.reload(true);
							});
						}
					
					} else if(data.indexOf("resubmit") > 0){
						buton.attr("disabled", "").attr("value", buttonText.submit);
						alert("- Warez-BB: SuperCharged -\r\n\r\nYour session timed out before you submitted your post. Please use the normal submission method, and take a quick copy of your post first, just in case.");
						//unsafeWindow.checkForm();
						//document.post.submit();
						//$("form[name='post']").get(0).submit();								
					} else {
						buton.attr("disabled", "").attr("value", buttonText.submit);
						alert("- Warez-BB: SuperCharged -\r\n\r\nAn error occured when submitting your post.\r\n\r\nTry a normal submission.\r\n\r\n" +
								"You are probably posting the same message as your last or too soon after your last.");
					}
				},
				error: function(){
					buton.attr("disabled", "").attr("value", buttonText.submit);
					alert("- Warez-BB: SuperCharged -\r\n\r\nAn error occured when submitting your post.\r\n\r\nTry a normal submission.");
				}
			});
			
		});
		
		
	}
	
	if(page("posting.php") || page("privmsg.php?mode=post") || $("input[name='usersubmit']").length > 0){
		
		$("input[name='post']").after(" &nbsp;&nbsp;<input class='wbbsc-preview liteoption' type='button' value='WBB:SC Preview' />" +
				" &nbsp;&nbsp;<input class='wbbsc-hide liteoption' type='button' value='WBB:SC Hide Preview' />");
		$(".wbbsc-preview").click(function(){		
			var text = $("#message").val();
			if(!$("input[name='disable_bbcode']").get(0).checked){
				text = bbCode(text);
			}
			if(!$("input[name='disable_smilies']").get(0).checked){
				text = smiley(text);
			}		
			hidePreview();
			if(page("posting.php")){
				$(".forumline:eq(0)").before(previewBox[0].replace("margin-top: 10px; ", "")+boxDate()+previewBox[1]+$("#subject").val()+previewBox[2]+text.replace(/\n/g, "<br />")+previewBox[3]);
			} else {
				$(".forumline:eq(0)").before(sprintf(previewPM, /\[ (.*?) \]/.exec($("a[href*='login.php?logout=true']:first").text())[1], $("input[name='username']").val(), boxDate(), $("#subject").val(), text.replace(/\n/g, "<br />")));
			}
			$(".wbbsc-pre").show();
		});
		
		$("input.helpline[name='helpbox']").attr("size", "100").attr("disabled", "disabled");
		
		$(".wbbsc-hide").click(hidePreview);
		
		if(getOption('listitem')){
			$("input[accesskey='o']").parent().after("<td><input type='button' class='button' id='listthing' value='[*]' /></td>");
			$("#listthing").mouseover(function(){
				$("input[name='helpbox']").val("WBB:SC List Item: [*]Text");
			}).click(function(){
				mozInsert($("#message").get(0), "[*]", "");
			});
		}
		
		//if(getOption('imgkk')){
			
			$("a[href='javascript:bbstyle(-1)']").parent().attr("align", "left").after("<td nowrap='nowrap' align='right' class='genmed'> " +
			"<div id='uploadbutton'></div></td>");
			/*
			var fz_sc = document.createElement("script");
			fz_sc.src = "http://code.jquery.com/jquery-latest.js";
			document.getElementsByTagName("head")[0].appendChild(fz_sc);
			
			var fz_sc2 = document.createElement("script");
			fz_sc2.innerHTML = base64_decode("dmFyIFNXRlVwbG9hZDtpZihTV0ZVcGxvYWQ9PXVuZGVmaW5lZCl7U1dGVXBsb2FkPWZ1bmN0aW9uKHNldHRpbmdzKXt0aGlzLmluaXRTV0ZVcGxvYWQoc2V0dGluZ3MpfX1TV0ZVcGxvYWQucHJvdG90eXBlLmluaXRTV0ZVcGxvYWQ9ZnVuY3Rpb24oc2V0dGluZ3Mpe3RyeXt0aGlzLmN1c3RvbVNldHRpbmdzPXt9O3RoaXMuc2V0dGluZ3M9c2V0dGluZ3M7dGhpcy5ldmVudFF1ZXVlPVtdO3RoaXMubW92aWVOYW1lPSJTV0ZVcGxvYWRfIitTV0ZVcGxvYWQubW92aWVDb3VudCsrO3RoaXMubW92aWVFbGVtZW50PW51bGw7U1dGVXBsb2FkLmluc3RhbmNlc1t0aGlzLm1vdmllTmFtZV09dGhpczt0aGlzLmluaXRTZXR0aW5ncygpO3RoaXMubG9hZEZsYXNoKCk7dGhpcy5kaXNwbGF5RGVidWdJbmZvKCl9Y2F0Y2goZXgpe2RlbGV0ZSBTV0ZVcGxvYWQuaW5zdGFuY2VzW3RoaXMubW92aWVOYW1lXTt0aHJvdyBleDt9fTtTV0ZVcGxvYWQuaW5zdGFuY2VzPXt9O1NXRlVwbG9hZC5tb3ZpZUNvdW50PTA7U1dGVXBsb2FkLnZlcnNpb249IjIuMi4wIEJldGEgMyI7U1dGVXBsb2FkLlFVRVVFX0VSUk9SPXtRVUVVRV9MSU1JVF9FWENFRURFRDotMTAwLEZJTEVfRVhDRUVEU19TSVpFX0xJTUlUOi0xMTAsWkVST19CWVRFX0ZJTEU6LTEyMCxJTlZBTElEX0ZJTEVUWVBFOi0xMzB9O1NXRlVwbG9hZC5VUExPQURfRVJST1I9e0hUVFBfRVJST1I6LTIwMCxNSVNTSU5HX1VQTE9BRF9VUkw6LTIxMCxJT19FUlJPUjotMjIwLFNFQ1VSSVRZX0VSUk9SOi0yMzAsVVBMT0FEX0xJTUlUX0VYQ0VFREVEOi0yNDAsVVBMT0FEX0ZBSUxFRDotMjUwLFNQRUNJRklFRF9GSUxFX0lEX05PVF9GT1VORDotMjYwLEZJTEVfVkFMSURBVElPTl9GQUlMRUQ6LTI3MCxGSUxFX0NBTkNFTExFRDotMjgwLFVQTE9BRF9TVE9QUEVEOi0yOTB9O1NXRlVwbG9hZC5GSUxFX1NUQVRVUz17UVVFVUVEOi0xLElOX1BST0dSRVNTOi0yLEVSUk9SOi0zLENPTVBMRVRFOi00LENBTkNFTExFRDotNX07U1dGVXBsb2FkLkJVVFRPTl9BQ1RJT049e1NFTEVDVF9GSUxFOi0xMDAsU0VMRUNUX0ZJTEVTOi0xMTAsU1RBUlRfVVBMT0FEOi0xMjB9O1NXRlVwbG9hZC5DVVJTT1I9e0FSUk9XOi0xLEhBTkQ6LTJ9O1NXRlVwbG9hZC5XSU5ET1dfTU9ERT17V0lORE9XOiJ3aW5kb3ciLFRSQU5TUEFSRU5UOiJ0cmFuc3BhcmVudCIsT1BBUVVFOiJvcGFxdWUifTtTV0ZVcGxvYWQucHJvdG90eXBlLmluaXRTZXR0aW5ncz1mdW5jdGlvbigpe3RoaXMuZW5zdXJlRGVmYXVsdD1mdW5jdGlvbihzZXR0aW5nTmFtZSxkZWZhdWx0VmFsdWUpe3RoaXMuc2V0dGluZ3Nbc2V0dGluZ05hbWVdPSh0aGlzLnNldHRpbmdzW3NldHRpbmdOYW1lXT09dW5kZWZpbmVkKT9kZWZhdWx0VmFsdWU6dGhpcy5zZXR0aW5nc1tzZXR0aW5nTmFtZV19O3RoaXMuZW5zdXJlRGVmYXVsdCgidXBsb2FkX3VybCIsIiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9wb3N0X25hbWUiLCJGaWxlZGF0YSIpO3RoaXMuZW5zdXJlRGVmYXVsdCgicG9zdF9wYXJhbXMiLHt9KTt0aGlzLmVuc3VyZURlZmF1bHQoInVzZV9xdWVyeV9zdHJpbmciLGZhbHNlKTt0aGlzLmVuc3VyZURlZmF1bHQoInJlcXVldWVfb25fZXJyb3IiLGZhbHNlKTt0aGlzLmVuc3VyZURlZmF1bHQoImh0dHBfc3VjY2VzcyIsW10pO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV90eXBlcyIsIiouKiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV90eXBlc19kZXNjcmlwdGlvbiIsIkFsbCBGaWxlcyIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9zaXplX2xpbWl0IiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfdXBsb2FkX2xpbWl0IiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfcXVldWVfbGltaXQiLDApO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmxhc2hfdXJsIiwic3dmdXBsb2FkLnN3ZiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgicHJldmVudF9zd2ZfY2FjaGluZyIsdHJ1ZSk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25faW1hZ2VfdXJsIiwiIik7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fd2lkdGgiLDEpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX2hlaWdodCIsMSk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fdGV4dCIsIiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX3RleHRfc3R5bGUiLCJjb2xvcjogIzAwMDAwMDsgZm9udC1zaXplOiAxNnB0OyIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX3RleHRfdG9wX3BhZGRpbmciLDApO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX3RleHRfbGVmdF9wYWRkaW5nIiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl9hY3Rpb24iLFNXRlVwbG9hZC5CVVRUT05fQUNUSU9OLlNFTEVDVF9GSUxFUyk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fZGlzYWJsZWQiLGZhbHNlKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl9wbGFjZWhvbGRlcl9pZCIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fY3Vyc29yIixTV0ZVcGxvYWQuQ1VSU09SLkFSUk9XKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl93aW5kb3dfbW9kZSIsU1dGVXBsb2FkLldJTkRPV19NT0RFLldJTkRPVyk7dGhpcy5lbnN1cmVEZWZhdWx0KCJkZWJ1ZyIsZmFsc2UpO3RoaXMuc2V0dGluZ3MuZGVidWdfZW5hYmxlZD10aGlzLnNldHRpbmdzLmRlYnVnO3RoaXMuc2V0dGluZ3MucmV0dXJuX3VwbG9hZF9zdGFydF9oYW5kbGVyPXRoaXMucmV0dXJuVXBsb2FkU3RhcnQ7dGhpcy5lbnN1cmVEZWZhdWx0KCJzd2Z1cGxvYWRfbG9hZGVkX2hhbmRsZXIiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9kaWFsb2dfc3RhcnRfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJmaWxlX3F1ZXVlZF9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfcXVldWVfZXJyb3JfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJmaWxlX2RpYWxvZ19jb21wbGV0ZV9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoInVwbG9hZF9zdGFydF9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoInVwbG9hZF9wcm9ncmVzc19oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoInVwbG9hZF9lcnJvcl9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoInVwbG9hZF9zdWNjZXNzX2hhbmRsZXIiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgidXBsb2FkX2NvbXBsZXRlX2hhbmRsZXIiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZGVidWdfaGFuZGxlciIsdGhpcy5kZWJ1Z01lc3NhZ2UpO3RoaXMuZW5zdXJlRGVmYXVsdCgiY3VzdG9tX3NldHRpbmdzIix7fSk7dGhpcy5jdXN0b21TZXR0aW5ncz10aGlzLnNldHRpbmdzLmN1c3RvbV9zZXR0aW5ncztpZih0aGlzLnNldHRpbmdzLnByZXZlbnRfc3dmX2NhY2hpbmcpe3RoaXMuc2V0dGluZ3MuZmxhc2hfdXJsPXRoaXMuc2V0dGluZ3MuZmxhc2hfdXJsKyI/c3dmdXBsb2Fkcm5kPSIrTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjk5OTk5OTk5OSl9ZGVsZXRlIHRoaXMuZW5zdXJlRGVmYXVsdH07U1dGVXBsb2FkLnByb3RvdHlwZS5sb2FkRmxhc2g9ZnVuY3Rpb24oKXtpZih0aGlzLnNldHRpbmdzLmJ1dHRvbl9wbGFjZWhvbGRlcl9pZCE9PSIiKXt0aGlzLnJlcGxhY2VXaXRoRmxhc2goKX1lbHNle3RoaXMuYXBwZW5kRmxhc2goKX19O1NXRlVwbG9hZC5wcm90b3R5cGUuYXBwZW5kRmxhc2g9ZnVuY3Rpb24oKXt2YXIgdGFyZ2V0RWxlbWVudCxjb250YWluZXI7aWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5tb3ZpZU5hbWUpIT09bnVsbCl7dGhyb3ciSUQgIit0aGlzLm1vdmllTmFtZSsiIGlzIGFscmVhZHkgaW4gdXNlLiBUaGUgRmxhc2ggT2JqZWN0IGNvdWxkIG5vdCBiZSBhZGRlZCI7fXRhcmdldEVsZW1lbnQ9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoImJvZHkiKVswXTtpZih0YXJnZXRFbGVtZW50PT11bmRlZmluZWQpe3Rocm93IkNvdWxkIG5vdCBmaW5kIHRoZSAnYm9keScgZWxlbWVudC4iO31jb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiZGl2Iik7Y29udGFpbmVyLnN0eWxlLndpZHRoPSIxcHgiO2NvbnRhaW5lci5zdHlsZS5oZWlnaHQ9IjFweCI7Y29udGFpbmVyLnN0eWxlLm92ZXJmbG93PSJoaWRkZW4iO3RhcmdldEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtjb250YWluZXIuaW5uZXJIVE1MPXRoaXMuZ2V0Rmxhc2hIVE1MKCk7aWYod2luZG93W3RoaXMubW92aWVOYW1lXT09dW5kZWZpbmVkKXt3aW5kb3dbdGhpcy5tb3ZpZU5hbWVdPXRoaXMuZ2V0TW92aWVFbGVtZW50KCl9fTtTV0ZVcGxvYWQucHJvdG90eXBlLnJlcGxhY2VXaXRoRmxhc2g9ZnVuY3Rpb24oKXt2YXIgdGFyZ2V0RWxlbWVudCx0ZW1wUGFyZW50O2lmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubW92aWVOYW1lKSE9PW51bGwpe3Rocm93IklEICIrdGhpcy5tb3ZpZU5hbWUrIiBpcyBhbHJlYWR5IGluIHVzZS4gVGhlIEZsYXNoIE9iamVjdCBjb3VsZCBub3QgYmUgYWRkZWQiO310YXJnZXRFbGVtZW50PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuYnV0dG9uX3BsYWNlaG9sZGVyX2lkKTtpZih0YXJnZXRFbGVtZW50PT11bmRlZmluZWQpe3Rocm93IkNvdWxkIG5vdCBmaW5kIHRoZSBwbGFjZWhvbGRlciBlbGVtZW50LiI7fXRlbXBQYXJlbnQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiZGl2Iik7dGVtcFBhcmVudC5pbm5lckhUTUw9dGhpcy5nZXRGbGFzaEhUTUwoKTt0YXJnZXRFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHRlbXBQYXJlbnQuZmlyc3RDaGlsZCx0YXJnZXRFbGVtZW50KTtpZih3aW5kb3dbdGhpcy5tb3ZpZU5hbWVdPT11bmRlZmluZWQpe3dpbmRvd1t0aGlzLm1vdmllTmFtZV09dGhpcy5nZXRNb3ZpZUVsZW1lbnQoKX19O1NXRlVwbG9hZC5wcm90b3R5cGUuZ2V0Rmxhc2hIVE1MPWZ1bmN0aW9uKCl7cmV0dXJuWyc8b2JqZWN0IGlkPSInLHRoaXMubW92aWVOYW1lLCciIHR5cGU9ImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoIiBkYXRhPSInLHRoaXMuc2V0dGluZ3MuZmxhc2hfdXJsLCciIHdpZHRoPSInLHRoaXMuc2V0dGluZ3MuYnV0dG9uX3dpZHRoLCciIGhlaWdodD0iJyx0aGlzLnNldHRpbmdzLmJ1dHRvbl9oZWlnaHQsJyIgY2xhc3M9InN3ZnVwbG9hZCI+JywnPHBhcmFtIG5hbWU9Indtb2RlIiB2YWx1ZT0iJyx0aGlzLnNldHRpbmdzLmJ1dHRvbl93aW5kb3dfbW9kZSwnIiAvPicsJzxwYXJhbSBuYW1lPSJtb3ZpZSIgdmFsdWU9IicsdGhpcy5zZXR0aW5ncy5mbGFzaF91cmwsJyIgLz4nLCc8cGFyYW0gbmFtZT0icXVhbGl0eSIgdmFsdWU9ImhpZ2giIC8+JywnPHBhcmFtIG5hbWU9Im1lbnUiIHZhbHVlPSJmYWxzZSIgLz4nLCc8cGFyYW0gbmFtZT0iYWxsb3dTY3JpcHRBY2Nlc3MiIHZhbHVlPSJhbHdheXMiIC8+JywnPHBhcmFtIG5hbWU9ImZsYXNodmFycyIgdmFsdWU9IicrdGhpcy5nZXRGbGFzaFZhcnMoKSsnIiAvPicsJzwvb2JqZWN0PiddLmpvaW4oIiIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldEZsYXNoVmFycz1mdW5jdGlvbigpe3ZhciBwYXJhbVN0cmluZz10aGlzLmJ1aWxkUGFyYW1TdHJpbmcoKTt2YXIgaHR0cFN1Y2Nlc3NTdHJpbmc9dGhpcy5zZXR0aW5ncy5odHRwX3N1Y2Nlc3Muam9pbigiLCIpO3JldHVyblsibW92aWVOYW1lPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMubW92aWVOYW1lKSwiJmFtcDt1cGxvYWRVUkw9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy51cGxvYWRfdXJsKSwiJmFtcDt1c2VRdWVyeVN0cmluZz0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLnVzZV9xdWVyeV9zdHJpbmcpLCImYW1wO3JlcXVldWVPbkVycm9yPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MucmVxdWV1ZV9vbl9lcnJvciksIiZhbXA7aHR0cFN1Y2Nlc3M9IixlbmNvZGVVUklDb21wb25lbnQoaHR0cFN1Y2Nlc3NTdHJpbmcpLCImYW1wO3BhcmFtcz0iLGVuY29kZVVSSUNvbXBvbmVudChwYXJhbVN0cmluZyksIiZhbXA7ZmlsZVBvc3ROYW1lPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZmlsZV9wb3N0X25hbWUpLCImYW1wO2ZpbGVUeXBlcz0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmZpbGVfdHlwZXMpLCImYW1wO2ZpbGVUeXBlc0Rlc2NyaXB0aW9uPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZmlsZV90eXBlc19kZXNjcmlwdGlvbiksIiZhbXA7ZmlsZVNpemVMaW1pdD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmZpbGVfc2l6ZV9saW1pdCksIiZhbXA7ZmlsZVVwbG9hZExpbWl0PSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZmlsZV91cGxvYWRfbGltaXQpLCImYW1wO2ZpbGVRdWV1ZUxpbWl0PSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZmlsZV9xdWV1ZV9saW1pdCksIiZhbXA7ZGVidWdFbmFibGVkPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZGVidWdfZW5hYmxlZCksIiZhbXA7YnV0dG9uSW1hZ2VVUkw9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5idXR0b25faW1hZ2VfdXJsKSwiJmFtcDtidXR0b25XaWR0aD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl93aWR0aCksIiZhbXA7YnV0dG9uSGVpZ2h0PSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX2hlaWdodCksIiZhbXA7YnV0dG9uVGV4dD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0KSwiJmFtcDtidXR0b25UZXh0VG9wUGFkZGluZz0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3RvcF9wYWRkaW5nKSwiJmFtcDtidXR0b25UZXh0TGVmdFBhZGRpbmc9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dF9sZWZ0X3BhZGRpbmcpLCImYW1wO2J1dHRvblRleHRTdHlsZT0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3N0eWxlKSwiJmFtcDtidXR0b25BY3Rpb249IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5idXR0b25fYWN0aW9uKSwiJmFtcDtidXR0b25EaXNhYmxlZD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl9kaXNhYmxlZCksIiZhbXA7YnV0dG9uQ3Vyc29yPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX2N1cnNvcildLmpvaW4oIiIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldE1vdmllRWxlbWVudD1mdW5jdGlvbigpe2lmKHRoaXMubW92aWVFbGVtZW50PT11bmRlZmluZWQpe3RoaXMubW92aWVFbGVtZW50PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubW92aWVOYW1lKX1pZih0aGlzLm1vdmllRWxlbWVudD09PW51bGwpe3Rocm93IkNvdWxkIG5vdCBmaW5kIEZsYXNoIGVsZW1lbnQiO31yZXR1cm4gdGhpcy5tb3ZpZUVsZW1lbnR9O1NXRlVwbG9hZC5wcm90b3R5cGUuYnVpbGRQYXJhbVN0cmluZz1mdW5jdGlvbigpe3ZhciBwb3N0UGFyYW1zPXRoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXM7dmFyIHBhcmFtU3RyaW5nUGFpcnM9W107aWYodHlwZW9mKHBvc3RQYXJhbXMpPT09Im9iamVjdCIpe2Zvcih2YXIgbmFtZSBpbiBwb3N0UGFyYW1zKXtpZihwb3N0UGFyYW1zLmhhc093blByb3BlcnR5KG5hbWUpKXtwYXJhbVN0cmluZ1BhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUudG9TdHJpbmcoKSkrIj0iK2VuY29kZVVSSUNvbXBvbmVudChwb3N0UGFyYW1zW25hbWVdLnRvU3RyaW5nKCkpKX19fXJldHVybiBwYXJhbVN0cmluZ1BhaXJzLmpvaW4oIiZhbXA7Iil9O1NXRlVwbG9hZC5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RyeXt0aGlzLmNhbmNlbFVwbG9hZChudWxsLGZhbHNlKTt2YXIgbW92aWVFbGVtZW50PW51bGw7bW92aWVFbGVtZW50PXRoaXMuZ2V0TW92aWVFbGVtZW50KCk7aWYobW92aWVFbGVtZW50KXtmb3IodmFyIGkgaW4gbW92aWVFbGVtZW50KXt0cnl7aWYodHlwZW9mKG1vdmllRWxlbWVudFtpXSk9PT0iZnVuY3Rpb24iKXttb3ZpZUVsZW1lbnRbaV09bnVsbH19Y2F0Y2goZXgxKXt9fXRyeXttb3ZpZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtb3ZpZUVsZW1lbnQpfWNhdGNoKGV4KXt9fXdpbmRvd1t0aGlzLm1vdmllTmFtZV09bnVsbDtTV0ZVcGxvYWQuaW5zdGFuY2VzW3RoaXMubW92aWVOYW1lXT1udWxsO2RlbGV0ZSBTV0ZVcGxvYWQuaW5zdGFuY2VzW3RoaXMubW92aWVOYW1lXTt0aGlzLm1vdmllRWxlbWVudD1udWxsO3RoaXMuc2V0dGluZ3M9bnVsbDt0aGlzLmN1c3RvbVNldHRpbmdzPW51bGw7dGhpcy5ldmVudFF1ZXVlPW51bGw7dGhpcy5tb3ZpZU5hbWU9bnVsbDtyZXR1cm4gdHJ1ZX1jYXRjaChleDEpe3JldHVybiBmYWxzZX19O1NXRlVwbG9hZC5wcm90b3R5cGUuZGlzcGxheURlYnVnSW5mbz1mdW5jdGlvbigpe3RoaXMuZGVidWcoWyItLS1TV0ZVcGxvYWQgSW5zdGFuY2UgSW5mby0tLVxuIiwiVmVyc2lvbjogIixTV0ZVcGxvYWQudmVyc2lvbiwiXG4iLCJNb3ZpZSBOYW1lOiAiLHRoaXMubW92aWVOYW1lLCJcbiIsIlNldHRpbmdzOlxuIiwiXHQiLCJ1cGxvYWRfdXJsOiAgICAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy51cGxvYWRfdXJsLCJcbiIsIlx0IiwiZmxhc2hfdXJsOiAgICAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuZmxhc2hfdXJsLCJcbiIsIlx0IiwidXNlX3F1ZXJ5X3N0cmluZzogICAgICAgICAiLHRoaXMuc2V0dGluZ3MudXNlX3F1ZXJ5X3N0cmluZy50b1N0cmluZygpLCJcbiIsIlx0IiwicmVxdWV1ZV9vbl9lcnJvcjogICAgICAgICAiLHRoaXMuc2V0dGluZ3MucmVxdWV1ZV9vbl9lcnJvci50b1N0cmluZygpLCJcbiIsIlx0IiwiaHR0cF9zdWNjZXNzOiAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuaHR0cF9zdWNjZXNzLmpvaW4oIiwgIiksIlxuIiwiXHQiLCJmaWxlX3Bvc3RfbmFtZTogICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5maWxlX3Bvc3RfbmFtZSwiXG4iLCJcdCIsInBvc3RfcGFyYW1zOiAgICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLnBvc3RfcGFyYW1zLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJmaWxlX3R5cGVzOiAgICAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5maWxlX3R5cGVzLCJcbiIsIlx0IiwiZmlsZV90eXBlc19kZXNjcmlwdGlvbjogICAiLHRoaXMuc2V0dGluZ3MuZmlsZV90eXBlc19kZXNjcmlwdGlvbiwiXG4iLCJcdCIsImZpbGVfc2l6ZV9saW1pdDogICAgICAgICAgIix0aGlzLnNldHRpbmdzLmZpbGVfc2l6ZV9saW1pdCwiXG4iLCJcdCIsImZpbGVfdXBsb2FkX2xpbWl0OiAgICAgICAgIix0aGlzLnNldHRpbmdzLmZpbGVfdXBsb2FkX2xpbWl0LCJcbiIsIlx0IiwiZmlsZV9xdWV1ZV9saW1pdDogICAgICAgICAiLHRoaXMuc2V0dGluZ3MuZmlsZV9xdWV1ZV9saW1pdCwiXG4iLCJcdCIsImRlYnVnOiAgICAgICAgICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLmRlYnVnLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJwcmV2ZW50X3N3Zl9jYWNoaW5nOiAgICAgICIsdGhpcy5zZXR0aW5ncy5wcmV2ZW50X3N3Zl9jYWNoaW5nLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fcGxhY2Vob2xkZXJfaWQ6ICAgICIsdGhpcy5zZXR0aW5ncy5idXR0b25fcGxhY2Vob2xkZXJfaWQudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl9pbWFnZV91cmw6ICAgICAgICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl9pbWFnZV91cmwudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl93aWR0aDogICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl93aWR0aC50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX2hlaWdodDogICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX2hlaWdodC50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX3RleHQ6ICAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHQudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl90ZXh0X3N0eWxlOiAgICAgICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3N0eWxlLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fdGV4dF90b3BfcGFkZGluZzogICIsdGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dF90b3BfcGFkZGluZy50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX3RleHRfbGVmdF9wYWRkaW5nOiAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfbGVmdF9wYWRkaW5nLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fYWN0aW9uOiAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5idXR0b25fYWN0aW9uLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fZGlzYWJsZWQ6ICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5idXR0b25fZGlzYWJsZWQudG9TdHJpbmcoKSwiXG4iLCJcdCIsImN1c3RvbV9zZXR0aW5nczogICAgICAgICAgIix0aGlzLnNldHRpbmdzLmN1c3RvbV9zZXR0aW5ncy50b1N0cmluZygpLCJcbiIsIkV2ZW50IEhhbmRsZXJzOlxuIiwiXHQiLCJzd2Z1cGxvYWRfbG9hZGVkX2hhbmRsZXIgYXNzaWduZWQ6ICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy5zd2Z1cGxvYWRfbG9hZGVkX2hhbmRsZXI9PT0iZnVuY3Rpb24iKS50b1N0cmluZygpLCJcbiIsIlx0IiwiZmlsZV9kaWFsb2dfc3RhcnRfaGFuZGxlciBhc3NpZ25lZDogIiwodHlwZW9mIHRoaXMuc2V0dGluZ3MuZmlsZV9kaWFsb2dfc3RhcnRfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJmaWxlX3F1ZXVlZF9oYW5kbGVyIGFzc2lnbmVkOiAgICAgICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy5maWxlX3F1ZXVlZF9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsImZpbGVfcXVldWVfZXJyb3JfaGFuZGxlciBhc3NpZ25lZDogICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLmZpbGVfcXVldWVfZXJyb3JfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJ1cGxvYWRfc3RhcnRfaGFuZGxlciBhc3NpZ25lZDogICAgICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy51cGxvYWRfc3RhcnRfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJ1cGxvYWRfcHJvZ3Jlc3NfaGFuZGxlciBhc3NpZ25lZDogICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy51cGxvYWRfcHJvZ3Jlc3NfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJ1cGxvYWRfZXJyb3JfaGFuZGxlciBhc3NpZ25lZDogICAgICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy51cGxvYWRfZXJyb3JfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJ1cGxvYWRfc3VjY2Vzc19oYW5kbGVyIGFzc2lnbmVkOiAgICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy51cGxvYWRfc3VjY2Vzc19oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsInVwbG9hZF9jb21wbGV0ZV9oYW5kbGVyIGFzc2lnbmVkOiAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnVwbG9hZF9jb21wbGV0ZV9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsImRlYnVnX2hhbmRsZXIgYXNzaWduZWQ6ICAgICAgICAgICAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLmRlYnVnX2hhbmRsZXI9PT0iZnVuY3Rpb24iKS50b1N0cmluZygpLCJcbiJdLmpvaW4oIiIpKX07U1dGVXBsb2FkLnByb3RvdHlwZS5hZGRTZXR0aW5nPWZ1bmN0aW9uKG5hbWUsdmFsdWUsZGVmYXVsdF92YWx1ZSl7aWYodmFsdWU9PXVuZGVmaW5lZCl7cmV0dXJuKHRoaXMuc2V0dGluZ3NbbmFtZV09ZGVmYXVsdF92YWx1ZSl9ZWxzZXtyZXR1cm4odGhpcy5zZXR0aW5nc1tuYW1lXT12YWx1ZSl9fTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldFNldHRpbmc9ZnVuY3Rpb24obmFtZSl7aWYodGhpcy5zZXR0aW5nc1tuYW1lXSE9dW5kZWZpbmVkKXtyZXR1cm4gdGhpcy5zZXR0aW5nc1tuYW1lXX1yZXR1cm4iIn07U1dGVXBsb2FkLnByb3RvdHlwZS5jYWxsRmxhc2g9ZnVuY3Rpb24oZnVuY3Rpb25OYW1lLGFyZ3VtZW50QXJyYXkpe2FyZ3VtZW50QXJyYXk9YXJndW1lbnRBcnJheXx8W107dmFyIG1vdmllRWxlbWVudD10aGlzLmdldE1vdmllRWxlbWVudCgpO3ZhciByZXR1cm5WYWx1ZSxyZXR1cm5TdHJpbmc7dHJ5e3JldHVyblN0cmluZz1tb3ZpZUVsZW1lbnQuQ2FsbEZ1bmN0aW9uKCc8aW52b2tlIG5hbWU9IicrZnVuY3Rpb25OYW1lKyciIHJldHVybnR5cGU9ImphdmFzY3JpcHQiPicrX19mbGFzaF9fYXJndW1lbnRzVG9YTUwoYXJndW1lbnRBcnJheSwwKSsnPC9pbnZva2U+Jyk7cmV0dXJuVmFsdWU9ZXZhbChyZXR1cm5TdHJpbmcpfWNhdGNoKGV4KXt0aHJvdyJDYWxsIHRvICIrZnVuY3Rpb25OYW1lKyIgZmFpbGVkIjt9aWYocmV0dXJuVmFsdWUhPXVuZGVmaW5lZCYmdHlwZW9mIHJldHVyblZhbHVlLnBvc3Q9PT0ib2JqZWN0Iil7cmV0dXJuVmFsdWU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKHJldHVyblZhbHVlKX1yZXR1cm4gcmV0dXJuVmFsdWV9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2VsZWN0RmlsZT1mdW5jdGlvbigpe3RoaXMuY2FsbEZsYXNoKCJTZWxlY3RGaWxlIil9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2VsZWN0RmlsZXM9ZnVuY3Rpb24oKXt0aGlzLmNhbGxGbGFzaCgiU2VsZWN0RmlsZXMiKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zdGFydFVwbG9hZD1mdW5jdGlvbihmaWxlSUQpe3RoaXMuY2FsbEZsYXNoKCJTdGFydFVwbG9hZCIsW2ZpbGVJRF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLmNhbmNlbFVwbG9hZD1mdW5jdGlvbihmaWxlSUQsdHJpZ2dlckVycm9yRXZlbnQpe2lmKHRyaWdnZXJFcnJvckV2ZW50IT09ZmFsc2Upe3RyaWdnZXJFcnJvckV2ZW50PXRydWV9dGhpcy5jYWxsRmxhc2goIkNhbmNlbFVwbG9hZCIsW2ZpbGVJRCx0cmlnZ2VyRXJyb3JFdmVudF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnN0b3BVcGxvYWQ9ZnVuY3Rpb24oKXt0aGlzLmNhbGxGbGFzaCgiU3RvcFVwbG9hZCIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldFN0YXRzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2FsbEZsYXNoKCJHZXRTdGF0cyIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldFN0YXRzPWZ1bmN0aW9uKHN0YXRzT2JqZWN0KXt0aGlzLmNhbGxGbGFzaCgiU2V0U3RhdHMiLFtzdGF0c09iamVjdF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldEZpbGU9ZnVuY3Rpb24oZmlsZUlEKXtpZih0eXBlb2YoZmlsZUlEKT09PSJudW1iZXIiKXtyZXR1cm4gdGhpcy5jYWxsRmxhc2goIkdldEZpbGVCeUluZGV4IixbZmlsZUlEXSl9ZWxzZXtyZXR1cm4gdGhpcy5jYWxsRmxhc2goIkdldEZpbGUiLFtmaWxlSURdKX19O1NXRlVwbG9hZC5wcm90b3R5cGUuYWRkRmlsZVBhcmFtPWZ1bmN0aW9uKGZpbGVJRCxuYW1lLHZhbHVlKXtyZXR1cm4gdGhpcy5jYWxsRmxhc2goIkFkZEZpbGVQYXJhbSIsW2ZpbGVJRCxuYW1lLHZhbHVlXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUucmVtb3ZlRmlsZVBhcmFtPWZ1bmN0aW9uKGZpbGVJRCxuYW1lKXt0aGlzLmNhbGxGbGFzaCgiUmVtb3ZlRmlsZVBhcmFtIixbZmlsZUlELG5hbWVdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRVcGxvYWRVUkw9ZnVuY3Rpb24odXJsKXt0aGlzLnNldHRpbmdzLnVwbG9hZF91cmw9dXJsLnRvU3RyaW5nKCk7dGhpcy5jYWxsRmxhc2goIlNldFVwbG9hZFVSTCIsW3VybF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldFBvc3RQYXJhbXM9ZnVuY3Rpb24ocGFyYW1zT2JqZWN0KXt0aGlzLnNldHRpbmdzLnBvc3RfcGFyYW1zPXBhcmFtc09iamVjdDt0aGlzLmNhbGxGbGFzaCgiU2V0UG9zdFBhcmFtcyIsW3BhcmFtc09iamVjdF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLmFkZFBvc3RQYXJhbT1mdW5jdGlvbihuYW1lLHZhbHVlKXt0aGlzLnNldHRpbmdzLnBvc3RfcGFyYW1zW25hbWVdPXZhbHVlO3RoaXMuY2FsbEZsYXNoKCJTZXRQb3N0UGFyYW1zIixbdGhpcy5zZXR0aW5ncy5wb3N0X3BhcmFtc10pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnJlbW92ZVBvc3RQYXJhbT1mdW5jdGlvbihuYW1lKXtkZWxldGUgdGhpcy5zZXR0aW5ncy5wb3N0X3BhcmFtc1tuYW1lXTt0aGlzLmNhbGxGbGFzaCgiU2V0UG9zdFBhcmFtcyIsW3RoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXNdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRGaWxlVHlwZXM9ZnVuY3Rpb24odHlwZXMsZGVzY3JpcHRpb24pe3RoaXMuc2V0dGluZ3MuZmlsZV90eXBlcz10eXBlczt0aGlzLnNldHRpbmdzLmZpbGVfdHlwZXNfZGVzY3JpcHRpb249ZGVzY3JpcHRpb247dGhpcy5jYWxsRmxhc2goIlNldEZpbGVUeXBlcyIsW3R5cGVzLGRlc2NyaXB0aW9uXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0RmlsZVNpemVMaW1pdD1mdW5jdGlvbihmaWxlU2l6ZUxpbWl0KXt0aGlzLnNldHRpbmdzLmZpbGVfc2l6ZV9saW1pdD1maWxlU2l6ZUxpbWl0O3RoaXMuY2FsbEZsYXNoKCJTZXRGaWxlU2l6ZUxpbWl0IixbZmlsZVNpemVMaW1pdF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEZpbGVVcGxvYWRMaW1pdD1mdW5jdGlvbihmaWxlVXBsb2FkTGltaXQpe3RoaXMuc2V0dGluZ3MuZmlsZV91cGxvYWRfbGltaXQ9ZmlsZVVwbG9hZExpbWl0O3RoaXMuY2FsbEZsYXNoKCJTZXRGaWxlVXBsb2FkTGltaXQiLFtmaWxlVXBsb2FkTGltaXRdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRGaWxlUXVldWVMaW1pdD1mdW5jdGlvbihmaWxlUXVldWVMaW1pdCl7dGhpcy5zZXR0aW5ncy5maWxlX3F1ZXVlX2xpbWl0PWZpbGVRdWV1ZUxpbWl0O3RoaXMuY2FsbEZsYXNoKCJTZXRGaWxlUXVldWVMaW1pdCIsW2ZpbGVRdWV1ZUxpbWl0XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0RmlsZVBvc3ROYW1lPWZ1bmN0aW9uKGZpbGVQb3N0TmFtZSl7dGhpcy5zZXR0aW5ncy5maWxlX3Bvc3RfbmFtZT1maWxlUG9zdE5hbWU7dGhpcy5jYWxsRmxhc2goIlNldEZpbGVQb3N0TmFtZSIsW2ZpbGVQb3N0TmFtZV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldFVzZVF1ZXJ5U3RyaW5nPWZ1bmN0aW9uKHVzZVF1ZXJ5U3RyaW5nKXt0aGlzLnNldHRpbmdzLnVzZV9xdWVyeV9zdHJpbmc9dXNlUXVlcnlTdHJpbmc7dGhpcy5jYWxsRmxhc2goIlNldFVzZVF1ZXJ5U3RyaW5nIixbdXNlUXVlcnlTdHJpbmddKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRSZXF1ZXVlT25FcnJvcj1mdW5jdGlvbihyZXF1ZXVlT25FcnJvcil7dGhpcy5zZXR0aW5ncy5yZXF1ZXVlX29uX2Vycm9yPXJlcXVldWVPbkVycm9yO3RoaXMuY2FsbEZsYXNoKCJTZXRSZXF1ZXVlT25FcnJvciIsW3JlcXVldWVPbkVycm9yXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0SFRUUFN1Y2Nlc3M9ZnVuY3Rpb24oaHR0cF9zdGF0dXNfY29kZXMpe2lmKHR5cGVvZiBodHRwX3N0YXR1c19jb2Rlcz09PSJzdHJpbmciKXtodHRwX3N0YXR1c19jb2Rlcz1odHRwX3N0YXR1c19jb2Rlcy5yZXBsYWNlKCIgIiwiIikuc3BsaXQoIiwiKX10aGlzLnNldHRpbmdzLmh0dHBfc3VjY2Vzcz1odHRwX3N0YXR1c19jb2Rlczt0aGlzLmNhbGxGbGFzaCgiU2V0SFRUUFN1Y2Nlc3MiLFtodHRwX3N0YXR1c19jb2Rlc10pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldERlYnVnRW5hYmxlZD1mdW5jdGlvbihkZWJ1Z0VuYWJsZWQpe3RoaXMuc2V0dGluZ3MuZGVidWdfZW5hYmxlZD1kZWJ1Z0VuYWJsZWQ7dGhpcy5jYWxsRmxhc2goIlNldERlYnVnRW5hYmxlZCIsW2RlYnVnRW5hYmxlZF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvbkltYWdlVVJMPWZ1bmN0aW9uKGJ1dHRvbkltYWdlVVJMKXtpZihidXR0b25JbWFnZVVSTD09dW5kZWZpbmVkKXtidXR0b25JbWFnZVVSTD0iIn10aGlzLnNldHRpbmdzLmJ1dHRvbl9pbWFnZV91cmw9YnV0dG9uSW1hZ2VVUkw7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvbkltYWdlVVJMIixbYnV0dG9uSW1hZ2VVUkxdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRCdXR0b25EaW1lbnNpb25zPWZ1bmN0aW9uKHdpZHRoLGhlaWdodCl7dGhpcy5zZXR0aW5ncy5idXR0b25fd2lkdGg9d2lkdGg7dGhpcy5zZXR0aW5ncy5idXR0b25faGVpZ2h0PWhlaWdodDt2YXIgbW92aWU9dGhpcy5nZXRNb3ZpZUVsZW1lbnQoKTtpZihtb3ZpZSE9dW5kZWZpbmVkKXttb3ZpZS5zdHlsZS53aWR0aD13aWR0aCsicHgiO21vdmllLnN0eWxlLmhlaWdodD1oZWlnaHQrInB4In10aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uRGltZW5zaW9ucyIsW3dpZHRoLGhlaWdodF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvblRleHQ9ZnVuY3Rpb24oaHRtbCl7dGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dD1odG1sO3RoaXMuY2FsbEZsYXNoKCJTZXRCdXR0b25UZXh0IixbaHRtbF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvblRleHRQYWRkaW5nPWZ1bmN0aW9uKGxlZnQsdG9wKXt0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3RvcF9wYWRkaW5nPXRvcDt0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X2xlZnRfcGFkZGluZz1sZWZ0O3RoaXMuY2FsbEZsYXNoKCJTZXRCdXR0b25UZXh0UGFkZGluZyIsW2xlZnQsdG9wXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uVGV4dFN0eWxlPWZ1bmN0aW9uKGNzcyl7dGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dF9zdHlsZT1jc3M7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvblRleHRTdHlsZSIsW2Nzc10pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvbkRpc2FibGVkPWZ1bmN0aW9uKGlzRGlzYWJsZWQpe3RoaXMuc2V0dGluZ3MuYnV0dG9uX2Rpc2FibGVkPWlzRGlzYWJsZWQ7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvbkRpc2FibGVkIixbaXNEaXNhYmxlZF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvbkFjdGlvbj1mdW5jdGlvbihidXR0b25BY3Rpb24pe3RoaXMuc2V0dGluZ3MuYnV0dG9uX2FjdGlvbj1idXR0b25BY3Rpb247dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvbkFjdGlvbiIsW2J1dHRvbkFjdGlvbl0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvbkN1cnNvcj1mdW5jdGlvbihjdXJzb3Ipe3RoaXMuc2V0dGluZ3MuYnV0dG9uX2N1cnNvcj1jdXJzb3I7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvbkN1cnNvciIsW2N1cnNvcl0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnF1ZXVlRXZlbnQ9ZnVuY3Rpb24oaGFuZGxlck5hbWUsYXJndW1lbnRBcnJheSl7aWYoYXJndW1lbnRBcnJheT09dW5kZWZpbmVkKXthcmd1bWVudEFycmF5PVtdfWVsc2UgaWYoIShhcmd1bWVudEFycmF5IGluc3RhbmNlb2YgQXJyYXkpKXthcmd1bWVudEFycmF5PVthcmd1bWVudEFycmF5XX12YXIgc2VsZj10aGlzO2lmKHR5cGVvZiB0aGlzLnNldHRpbmdzW2hhbmRsZXJOYW1lXT09PSJmdW5jdGlvbiIpe3RoaXMuZXZlbnRRdWV1ZS5wdXNoKGZ1bmN0aW9uKCl7dGhpcy5zZXR0aW5nc1toYW5kbGVyTmFtZV0uYXBwbHkodGhpcyxhcmd1bWVudEFycmF5KX0pO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLmV4ZWN1dGVOZXh0RXZlbnQoKX0sMCl9ZWxzZSBpZih0aGlzLnNldHRpbmdzW2hhbmRsZXJOYW1lXSE9PW51bGwpe3Rocm93IkV2ZW50IGhhbmRsZXIgIitoYW5kbGVyTmFtZSsiIGlzIHVua25vd24gb3IgaXMgbm90IGEgZnVuY3Rpb24iO319O1NXRlVwbG9hZC5wcm90b3R5cGUuZXhlY3V0ZU5leHRFdmVudD1mdW5jdGlvbigpe3ZhciBmPXRoaXMuZXZlbnRRdWV1ZT90aGlzLmV2ZW50UXVldWUuc2hpZnQoKTpudWxsO2lmKHR5cGVvZihmKT09PSJmdW5jdGlvbiIpe2YuYXBwbHkodGhpcyl9fTtTV0ZVcGxvYWQucHJvdG90eXBlLnVuZXNjYXBlRmlsZVBvc3RQYXJhbXM9ZnVuY3Rpb24oZmlsZSl7dmFyIHJlZz0vWyRdKFswLTlhLWZdezR9KS9pO3ZhciB1bmVzY2FwZWRQb3N0PXt9O3ZhciB1aztpZihmaWxlIT11bmRlZmluZWQpe2Zvcih2YXIgayBpbiBmaWxlLnBvc3Qpe2lmKGZpbGUucG9zdC5oYXNPd25Qcm9wZXJ0eShrKSl7dWs9azt2YXIgbWF0Y2g7d2hpbGUoKG1hdGNoPXJlZy5leGVjKHVrKSkhPT1udWxsKXt1az11ay5yZXBsYWNlKG1hdGNoWzBdLFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoIjB4IittYXRjaFsxXSwxNikpKX11bmVzY2FwZWRQb3N0W3VrXT1maWxlLnBvc3Rba119fWZpbGUucG9zdD11bmVzY2FwZWRQb3N0fXJldHVybiBmaWxlfTtTV0ZVcGxvYWQucHJvdG90eXBlLmZsYXNoUmVhZHk9ZnVuY3Rpb24oKXt2YXIgbW92aWVFbGVtZW50PXRoaXMuZ2V0TW92aWVFbGVtZW50KCk7aWYodHlwZW9mKG1vdmllRWxlbWVudC5DYWxsRnVuY3Rpb24pPT09InVua25vd24iKXt0aGlzLmRlYnVnKCJSZW1vdmluZyBGbGFzaCBmdW5jdGlvbnMgaG9va3MgKHRoaXMgc2hvdWxkIG9ubHkgcnVuIGluIElFIGFuZCBzaG91bGQgcHJldmVudCBtZW1vcnkgbGVha3MpIik7Zm9yKHZhciBrZXkgaW4gbW92aWVFbGVtZW50KXt0cnl7aWYodHlwZW9mKG1vdmllRWxlbWVudFtrZXldKT09PSJmdW5jdGlvbiIpe21vdmllRWxlbWVudFtrZXldPW51bGx9fWNhdGNoKGV4KXt9fX10aGlzLnF1ZXVlRXZlbnQoInN3ZnVwbG9hZF9sb2FkZWRfaGFuZGxlciIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmZpbGVEaWFsb2dTdGFydD1mdW5jdGlvbigpe3RoaXMucXVldWVFdmVudCgiZmlsZV9kaWFsb2dfc3RhcnRfaGFuZGxlciIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmZpbGVRdWV1ZWQ9ZnVuY3Rpb24oZmlsZSl7ZmlsZT10aGlzLnVuZXNjYXBlRmlsZVBvc3RQYXJhbXMoZmlsZSk7dGhpcy5xdWV1ZUV2ZW50KCJmaWxlX3F1ZXVlZF9oYW5kbGVyIixmaWxlKX07U1dGVXBsb2FkLnByb3RvdHlwZS5maWxlUXVldWVFcnJvcj1mdW5jdGlvbihmaWxlLGVycm9yQ29kZSxtZXNzYWdlKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoImZpbGVfcXVldWVfZXJyb3JfaGFuZGxlciIsW2ZpbGUsZXJyb3JDb2RlLG1lc3NhZ2VdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5maWxlRGlhbG9nQ29tcGxldGU9ZnVuY3Rpb24obnVtRmlsZXNTZWxlY3RlZCxudW1GaWxlc1F1ZXVlZCl7dGhpcy5xdWV1ZUV2ZW50KCJmaWxlX2RpYWxvZ19jb21wbGV0ZV9oYW5kbGVyIixbbnVtRmlsZXNTZWxlY3RlZCxudW1GaWxlc1F1ZXVlZF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnVwbG9hZFN0YXJ0PWZ1bmN0aW9uKGZpbGUpe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgicmV0dXJuX3VwbG9hZF9zdGFydF9oYW5kbGVyIixmaWxlKX07U1dGVXBsb2FkLnByb3RvdHlwZS5yZXR1cm5VcGxvYWRTdGFydD1mdW5jdGlvbihmaWxlKXt2YXIgcmV0dXJuVmFsdWU7aWYodHlwZW9mIHRoaXMuc2V0dGluZ3MudXBsb2FkX3N0YXJ0X2hhbmRsZXI9PT0iZnVuY3Rpb24iKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTtyZXR1cm5WYWx1ZT10aGlzLnNldHRpbmdzLnVwbG9hZF9zdGFydF9oYW5kbGVyLmNhbGwodGhpcyxmaWxlKX1lbHNlIGlmKHRoaXMuc2V0dGluZ3MudXBsb2FkX3N0YXJ0X2hhbmRsZXIhPXVuZGVmaW5lZCl7dGhyb3cidXBsb2FkX3N0YXJ0X2hhbmRsZXIgbXVzdCBiZSBhIGZ1bmN0aW9uIjt9aWYocmV0dXJuVmFsdWU9PT11bmRlZmluZWQpe3JldHVyblZhbHVlPXRydWV9cmV0dXJuVmFsdWU9ISFyZXR1cm5WYWx1ZTt0aGlzLmNhbGxGbGFzaCgiUmV0dXJuVXBsb2FkU3RhcnQiLFtyZXR1cm5WYWx1ZV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnVwbG9hZFByb2dyZXNzPWZ1bmN0aW9uKGZpbGUsYnl0ZXNDb21wbGV0ZSxieXRlc1RvdGFsKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoInVwbG9hZF9wcm9ncmVzc19oYW5kbGVyIixbZmlsZSxieXRlc0NvbXBsZXRlLGJ5dGVzVG90YWxdKX07U1dGVXBsb2FkLnByb3RvdHlwZS51cGxvYWRFcnJvcj1mdW5jdGlvbihmaWxlLGVycm9yQ29kZSxtZXNzYWdlKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoInVwbG9hZF9lcnJvcl9oYW5kbGVyIixbZmlsZSxlcnJvckNvZGUsbWVzc2FnZV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnVwbG9hZFN1Y2Nlc3M9ZnVuY3Rpb24oZmlsZSxzZXJ2ZXJEYXRhKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoInVwbG9hZF9zdWNjZXNzX2hhbmRsZXIiLFtmaWxlLHNlcnZlckRhdGFdKX07U1dGVXBsb2FkLnByb3RvdHlwZS51cGxvYWRDb21wbGV0ZT1mdW5jdGlvbihmaWxlKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoInVwbG9hZF9jb21wbGV0ZV9oYW5kbGVyIixmaWxlKX07U1dGVXBsb2FkLnByb3RvdHlwZS5kZWJ1Zz1mdW5jdGlvbihtZXNzYWdlKXt0aGlzLnF1ZXVlRXZlbnQoImRlYnVnX2hhbmRsZXIiLG1lc3NhZ2UpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmRlYnVnTWVzc2FnZT1mdW5jdGlvbihtZXNzYWdlKXtpZih0aGlzLnNldHRpbmdzLmRlYnVnKXt2YXIgZXhjZXB0aW9uTWVzc2FnZSxleGNlcHRpb25WYWx1ZXM9W107aWYodHlwZW9mIG1lc3NhZ2U9PT0ib2JqZWN0IiYmdHlwZW9mIG1lc3NhZ2UubmFtZT09PSJzdHJpbmciJiZ0eXBlb2YgbWVzc2FnZS5tZXNzYWdlPT09InN0cmluZyIpe2Zvcih2YXIga2V5IGluIG1lc3NhZ2Upe2lmKG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoa2V5KSl7ZXhjZXB0aW9uVmFsdWVzLnB1c2goa2V5KyI6ICIrbWVzc2FnZVtrZXldKX19ZXhjZXB0aW9uTWVzc2FnZT1leGNlcHRpb25WYWx1ZXMuam9pbigiXG4iKXx8IiI7ZXhjZXB0aW9uVmFsdWVzPWV4Y2VwdGlvbk1lc3NhZ2Uuc3BsaXQoIlxuIik7ZXhjZXB0aW9uTWVzc2FnZT0iRVhDRVBUSU9OOiAiK2V4Y2VwdGlvblZhbHVlcy5qb2luKCJcbkVYQ0VQVElPTjogIik7U1dGVXBsb2FkLkNvbnNvbGUud3JpdGVMaW5lKGV4Y2VwdGlvbk1lc3NhZ2UpfWVsc2V7U1dGVXBsb2FkLkNvbnNvbGUud3JpdGVMaW5lKG1lc3NhZ2UpfX19O1NXRlVwbG9hZC5Db25zb2xlPXt9O1NXRlVwbG9hZC5Db25zb2xlLndyaXRlTGluZT1mdW5jdGlvbihtZXNzYWdlKXt2YXIgY29uc29sZSxkb2N1bWVudEZvcm07dHJ5e2NvbnNvbGU9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIlNXRlVwbG9hZF9Db25zb2xlIik7aWYoIWNvbnNvbGUpe2RvY3VtZW50Rm9ybT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJmb3JtIik7ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoImJvZHkiKVswXS5hcHBlbmRDaGlsZChkb2N1bWVudEZvcm0pO2NvbnNvbGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgidGV4dGFyZWEiKTtjb25zb2xlLmlkPSJTV0ZVcGxvYWRfQ29uc29sZSI7Y29uc29sZS5zdHlsZS5mb250RmFtaWx5PSJtb25vc3BhY2UiO2NvbnNvbGUuc2V0QXR0cmlidXRlKCJ3cmFwIiwib2ZmIik7Y29uc29sZS53cmFwPSJvZmYiO2NvbnNvbGUuc3R5bGUub3ZlcmZsb3c9ImF1dG8iO2NvbnNvbGUuc3R5bGUud2lkdGg9IjcwMHB4Ijtjb25zb2xlLnN0eWxlLmhlaWdodD0iMzUwcHgiO2NvbnNvbGUuc3R5bGUubWFyZ2luPSI1cHgiO2RvY3VtZW50Rm9ybS5hcHBlbmRDaGlsZChjb25zb2xlKX1jb25zb2xlLnZhbHVlKz1tZXNzYWdlKyJcbiI7Y29uc29sZS5zY3JvbGxUb3A9Y29uc29sZS5zY3JvbGxIZWlnaHQtY29uc29sZS5jbGllbnRIZWlnaHR9Y2F0Y2goZXgpe2FsZXJ0KCJFeGNlcHRpb246ICIrZXgubmFtZSsiIE1lc3NhZ2U6ICIrZXgubWVzc2FnZSl9fTs=");
			document.getElementsByTagName("head")[0].appendChild(fz_sc2);
			
			var fz_sc3 = document.createElement("script");
			fz_sc3.innerHTML = base64_decode(warezbbimgkkscript);
			document.getElementsByTagName("head")[0].appendChild(fz_sc3);
			*/
			
				
			
			
		//}
			
	}
	
	if(getOption("cleanheader")){
		//alert($(".bodyline .topbkg + table[width='100%']").length);
		var toprow = $(".bodyline .topbkg + table[width='100%'] tbody > tr:first-child > td").get(0);
		var toprow2 = toprow.innerHTML.split("<a href=\"privmsg.php?folder=inbox");
		var bottomrow = $(".bodyline .topbkg + table[width='100%'] tbody > tr:last-child > td").hide().get(0);
		//var bottomrow2 = bottomrow.innerHTML.split("<b><a href=\"http://www.war");
		//bottomrow2 = bottomrow2[1].split("<a href=\"http://clean.katz.cd");
		toprow.innerHTML = /*"<b><a href=\"http://www.war"+bottomrow2[0]+*/"<b><a href=\"search.php\">Search</a></b>&nbsp;&#8226; &nbsp;<a href=\"privmsg.php?folder=inbox"+toprow2[1];	
		//var $$ = $(".bodyline .topbkg + table[width='100%']").contents();
		//$$.find("a[href='memberlist.php']").hide().next(":text").hide();
	}
	
	$(".topnav:first")./*prepend(getOption("irclink") && false ? "<b><a href='irc://irc.warez-bb.org'>IRC</a></b> &bull; " : "").*/parents("table[cellpadding='2']").append('<tr>' +
			'<td align="center" class="topnav"><div id="qksrch" class="gtfodarktheme" style="display:none"><form action="search.php?mode=results" method="post" id="quicksearch">' +
			'Forum: <select class="post" name="search_forum[]">' + getString("selectforum") +
			'</select>' +
			' &nbsp;&bull;&nbsp; <label for="search_keywords">Keywords:</label> <input type="text" style="width: 100px" class="post" id="kaywards" name="search_keywords" />' +
			//' &nbsp;&bull;&nbsp; <label for="search_author">Author:</label> <input type="text" style="width: 80px" class="post" name="search_author" size="30" />' +
			' &nbsp;&bull;&nbsp; <label for="msgtxt">Inc. Message Text?</label> <input type="checkbox" name="msgtxt" id="msgtxt" />' +
			'<input type="hidden" name="search_fields" id="srchfields" /><input type="hidden" name="search_terms" value="all" />' +
			' &nbsp;&nbsp; <input type="submit" class="liteoption" value="WBB:SC QuickSearch" />' +
			' &nbsp;&nbsp; <input type="button" class="liteoption" id="hideqksrch" value="Hide" />' +
			'</form></div><div class="gtfodarktheme">' +
			'<a href="profile.php?mode=editprofile#wbbsc-settings">WBB:SC Settings</a> '+(getOption("qksearch") ? ' &bull; ' : '') +
			'<b><a href="#" id="qksrchy">Quick Search</a></b> '+(getOption("yourerunning") ? '&bull; You\'re running ' +
			'<b><a href="http://www.warez-bb.org/viewtopic.php?t=1489162">WBB:SC</a></b>' +
			'<span id="awesome" style="display: none;"> &amp; <b><a href="http://www.warez-bb.org/viewtopic.php?t=1411540">WBB Dark Theme</a></b></span> by ' +
			'<a href="http://www.warez-bb.org/profile.php?mode=viewprofile&u=233423">Darkimmortal</a>' : '')+'</div></td></tr>');
			//.children("tbody").children("tr").children("td").animate({height:"20px"}, "normal", function(){$(".gtfodarktheme:last").slideDown("normal");});
			
	//$(".gtfodarktheme:last").slideDown("normal");

	if(!getOption("qksearch")){
		$("#qksrchy").hide();	
	}
	
	/*if(!getOption("wbbscwadio")){
		$("#wadio").hide();
	}*/
	$("#qksrchy").click(function(){
		
		$(this).parents("div").slideUp("normal").prev().slideDown("normal");
		$("#kaywards").focus();
	});
	
	$("#hideqksrch").click(function(){
		$(this).parents("div").slideUp("normal").next().slideDown("normal");
	});
	
	
	$("#quicksearch").submit(function(){
		$("#srchfields").val($("#msgtxt").get(0).checked ? "all" : "titleonly");
	});
	
	//if(getOption("inlinefirst") || getOption("inlinepm")){
	var pg = -1;
	if(page("viewforum.php") && getOption("inlinefirst")){
		pg = 0;
	} else if(page("search.php") && getOption("inlinefirst")){
		pg = 1;
	} else if(page("privmsg.php?folder=") && getOption("inlinepm")){
		pg = 2;
	}
	if(pg > -1){
		$(".row1[width='4%'], .row1[height='34'], .row1[height='30'], .row2[height='30']").each(function(){
			var $this = $(this);
			//if(page("viewforum.php") && $this.next().contents().find("a[href*='viewforum.php']").length === 0){
			switch(pg){
				case 0:
				case 1:
					$this.append('<img align="bottom" style="padding-bottom: 3px; cursor: pointer" src="http://i35.tinypic.com/xf9bio.gif" class="postexpand" alt="up" title="WBB:SC Inline Post Expand" />')
					.removeAttr("width").attr("nowrap", "nowrap");
					break;
			//} else if(page("search.php")){
					/*$this.append('<img align="bottom" style="padding-bottom: 3px; cursor: pointer" src="http://i35.tinypic.com/xf9bio.gif" class="postexpand" alt="up" title="WBB:SC Inline Post Expand" />')
					.removeAttr("width").attr("nowrap", "nowrap");
					break;*/
			//} else if(page("privmsg.php?folder=")){
				case 2:
					$this.append('<img align="bottom" style="padding-bottom: 8px; cursor: pointer" src="http://i35.tinypic.com/xf9bio.gif" class="postexpand" alt="up" title="WBB:SC Inline Post Expand" />')
					.removeAttr("width").attr("nowrap", "nowrap");
					break;
			}
		});
		
		$(".postexpand").click(function(){
			var buton = $(this);
			//if($(".topictitle > a").length > 0){
			//	alert("wut")
			var href = buton.parent("td").parent("tr").contents().find("a[href*='viewtopic.php?t=']:not([href*='&view=']):not([href*='&start='])," +
					" a[href*='privmsg.php'][href*='mode=read']:not([href*='&view=']):not([href*='&start='])").attr("href");
			/*} else {
				alert("lol")
				var href = buton.parents("td").parents("tr").contents(".topictitle").attr("href");
			}*/
			if(buton.attr("alt") == 'up'){
				buton.attr("alt", "down").attr("src", "http://i35.tinypic.com/2viqu0j.gif");
				$("#loading").css({position: "fixed"}).text("WBB:SC Loading...").fadeIn("normal", function(){
					$.ajax({
					dataType: "text",
					cache: true,
					url: href,
					type: "GET",
					timeout: 15000,
					success: function(data){	
						if(page("privmsg.php")){						
							var lookingFor = /(\<td align="right" class="row2">\<span class="explaintitle">From:\<\/span>\<\/td>[\s\S]*?)\<tr>[\r\n]*?\<td class="cat" colspan="2" align="right">/.exec(data);
							var found = lookingFor[1];
							$("#loading").fadeOut("normal");
							buton.parent("td").parent("tr").after('<tr><td colspan="7"><table class="forumline" width="100%" cellspacing="1" cellpadding="3" border="0">' +
								'<tr><th width="150" height="28">Author</th><th width="100%">Message</th></tr><tr>'+found+
								'</table></td></tr>');
						} else {
							var lookingFor = /\<td valign="top" class="row1">\<span class="name">[\s\S]*?<td class="spacerow" colspan="2" height="1">/.exec(data);
							var found = lookingFor[0];
							$("#loading").fadeOut("normal");
							buton.parent("td").parent("tr").after('<tr><td colspan="7"><table class="forumline" width="100%" cellspacing="1" cellpadding="3" border="0">' +
								'<tr><th width="150" height="28">Author</th><th width="100%">Message</th></tr><tr>'+found+
								'<img src="images/spacer.gif" alt="" width="1" height="1" /></td></tr></table></td></tr>');
						}
					},
					error: function(){
						$("#loading").fadeOut("normal");
						buton.click();
						alert("- Warez-BB: SuperCharged -\r\n\r\nAn error occured when gathering the post/PM.\r\n\r\nTry viewing the topic normally :P");
					}
				});
				});
			} else {
				buton.attr("alt", "up").attr("src", "http://i35.tinypic.com/xf9bio.gif");
				buton.parent("td").parent("tr").next().remove();
			}
		});
	}
	
	if(page("privmsg.php?folder=") && getOption("pmreply")){
		$(".row1[height='30'], .row2[height='30']").each(function(){
			var hree = $(this).next().children("a.topictitle").attr("href").replace("read", "reply");
			$(this).append('<a style="color:#839FBC;padding-left:7px;padding-right:5px;position:relative;top:7px;vertical-align:top;" class="genmed" href="'+hree+'" title="WBB:SC Reply">[R]</a>')
				.removeAttr("width").attr("nowrap", "nowrap");
		});		
	}
	
	if(page("privmsg.php") && page("mode=reply") && getOption("pmquote")){
		$("body > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td div > table.forumline > tbody > tr > td > table > tbody > tr > td[width='100%']").after('<td nowrap="nowrap" valign="top" align="right">' +/*
			'<a title="WBB:SC PM Quote" href="javascript:void(\'addquote(     - only there for WBB Dark Theme ;) \');">' +
			'<img height="18" width="59" border="0" alt="" class="imgtopic" src="http://img4.warez-bb.org/images/lang_english/icon_quote.gif"/>' +*/
			'<a class="wbbsc-quote wbbsc-pmquote" href="javascript:;"><img border="0" src="http://i34.tinypic.com/30kf3h5.gif" alt="" class="imgtopic"/>' +
			'</a></td>');
		
		$(".wbbsc-pmquote").click(function(){
			var txtarea = ad("message");		
			var buton = $(this);
			var name = buton.parents("tr:first").parents("td:first").prev().children(".name").children("b").text();
			
			var found = html2bb(buton.parents("tr:first").parents("tr:first").contents().find(".postbody").get(0));
			found = "[quote=\""+name+"\"]"+found+"[/quote]";
					
			if (txtarea.createTextRange && txtarea.caretPos){
				var caretPos = txtarea.caretPos;
				caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? caretPos.text + found + ' ' : caretPos.text + found;
			} else if (txtarea.selectionEnd && (txtarea.selectionStart | txtarea.selectionStart === 0)){ 
				mozInsert(txtarea, found, "");
			} else {
				txtarea.value += found;
			}	
		});
	}
	
	if(!getOption("welcome") && $("img[title='Warez-BB.org']").length > 0){
			
		alert(" - Warez-BB SuperCharged - \r\n\r\n" +
				" GM_setValue (Firefox only) ="+(typeof GM_setValue == "function" ? " Available :D (yay, no more cookies)" : 
				" Unavailable :( (cookies will have to be used instead)"));
		
		$.each(settingsPage, function(i, val){
			 setOption(val.name, val.preset);
		});
		setOption("welcome", true);
		setOption("setselect", false);
		setString("selectforum", '<option value="-1" selected="selected">All forums</option>' +
			'<optgroup label="Announcements">' +
			'<option value="2"> |-- Announcements</option>' +
			'</optgroup>' +
			'<optgroup label="Listingz">' +
			'<option value="3"> |-- Appz</option>' +
			'<option value="47"> |---- All-In-One</option>' +
			'<option value="9"> |---- Freewares</option>' +
			'<option value="5"> |-- Gamez</option>' +
			'<option value="28"> |---- Console Gamez</option>' +
			'<option value="4"> |-- Moviez</option>' +
			'<option value="57"> |---- TV Showz</option>' +
			'<option value="6"> |-- Muzic</option>' +
			'<option value="38"> |---- Muzic Videos</option>' +
			'<option value="7"> |-- Templatez&amp;Scriptz</option>' +
			'<option value="29"> |---- Template Ripz</option>' +
			'<option value="8"> |-- eBookz</option>' +
			'<option value="83"> |---- Tutorialz</option>' +
			'<option value="20"> |-- Mac &amp; Other OSs</option>' +
			'</optgroup><optgroup label="Requestz &amp; Tradez">' +
			'<option value="15"> |-- Appz requests</option>' +
			'<option value="17"> |-- Gamez requests</option>' +
			'<option value="16"> |-- Moviez requests</option>' +
			'<option value="18"> |-- Muzic requests</option>' +
			'<option value="19"> |-- All other requests</option>' +
			'</optgroup>' +
			'<optgroup label="General">' +
			'<option value="40"> |-- Introduction</option>' +
			'<option value="10"> |-- Off-Topic</option>' +
			'<option value="85"> |---- News</option>' +
			'<option value="87"> |---- Bits and Bobs</option>' +
			'<option value="11"> |-- Forum Comments</option>' +
			'<option value="76"> |---- Milestones</option>' +
			'<option value="12"> |-- Funstuff</option>' +
			'<option value="22"> |-- Link Heaven</option>' +
			'<option value="63"> |-- Graphics</option>' +
			'<option value="79"> |-- Programming</option>' +
			'<option value="30"> |-- Helpdesk</option>' +
			'<option value="26"> |-- Test Me</option>' +
			'<option value="24"> |-- Graveyard</option>' +
			'</optgroup>' +
			'<optgroup label="Wadio">' +
			'<option value="82"> |-- Wadio Talk</option>' +
			'</optgroup>');
			
			
		alert(" - Warez-BB SuperCharged - \r\n\r\nOptions configured successfully, now redirecting you to the WBB:SC Settings page...");
		
		if(page("profile.php?mode=editprofile#wbbsc-settings"+(void(z=false) ? "" : ""))){
			location.reload(false);
		} else {
			document.location.href="http://www.warez-bb.org/profile.php?mode=editprofile#wbbsc-settings";
		}
	}
		
	if(top.location.href.indexOf("index.php") > 0){
		//debug("haha");
		$("span.genmed").each(function(){
			if($(this).html().indexOf("ll important announcements") > 0){
				$(".topnav:first").parents("table[cellpadding='2']").append("<tr><td class='topnav' align='center'><span id='versioncheck'>WBB:SC version checking is now in progress...</span></td></tr>");
				
				$.ajax({
					dataType: "text",
					cache: false,
					url: "/viewtopic.php?t=1489162&start=0",
					type: "GET",
					timeout: 15000,
					success: function(data){
						version = /<span style="color:yellow">([0-9]+)<\/span>/i.exec(data);
						version = version[1];
						if(currentVersion < version){
							$("#versioncheck").html("WBB:SC needs <a href='/viewtopic.php?t=1489162&start=0'>updating!</a> - Latest: R"+version+"; Yours: R"+currentVersion);
						} else {
							$("#versioncheck").html("WBB:SC is up to date! - Latest: R"+version+"; Yours: R"+currentVersion);						
						}
						
					}
				});
			}
		});
	}
	/*
	if(getOption("tidyforumview")){
		$("td ~ td > span.gensmall").each(function(){
			var $self = $(this);
			var self = this;
			if(self.innerHTML.indexOf("Description: ") != -1 || true){ 
				self.innerHTML = self.innerHTML.replace(/Description\: /g, "");
				$self.parent(":first").attr("lol", "wut");
			}
			var $selfimg = $self.children("img.imgspace");
			if($selfimg.length > 0){
				$selfimg.hide();
				self.innerHTML = self.innerHTML.replace(/[\[\]]/g, "");
				//$(this).children("br").remove();
				$self.wrap("<span style='margin-right: 8px; cursor: default; text-align: left;'></span>");
				$self.css("opacity", "0.2").hover(function(){
					$self.css({opacity: "1.0"}, 150);
				}, function(){
					$self.css({opacity: "0.2"}, 150);
				});
				if($self.parent().parent().attr("lol") == "wut"){
					$self.css({position: "relative", top: "-6px"});
				}
			}
		});
		$(".topictitle > b").css({fontStyle: "italic", fontWeight: "normal", opacity: "0.8"});
	}*/
	
	if(getOption("goto")){
		$("td.nav[nowrap='nowrap']").each(function(){
			var $this = $(this);
			if(this.innerHTML.indexOf("Goto page") != -1){
				this.innerHTML = this.innerHTML.replace("Goto page", "<a href='# Please wait a sec...' class='wbbscgoto'>WBB:SC Goto Any Page</a>");
			}
		});
		$(".wbbscgoto").click(function(){
			var z = prompt(" - WBB:SC Goto Any Page - \n\nType the page number you would like to go to:");
			if(typeof z == "string"){
				var p = parseInt(z, 10)-1;
				var q;
				if(page("search.php") || page("viewforum.php")){
					q = p * 50;
				} else {
					q = p * 15;
				}
				location.href = $(this).siblings("a[href*='start=']:first").attr("href").replace(/&start=[0-9]*/, "&start="+q);
			} else {
				return false;
			}
		});
	}
		
	if(getOption("supercharger")){	
		var superCharger = {};
		var superCharger_data = {};
		var superCharger_urls = {
			index: "http://www.warez-bb.org/index.php"
		};
		
		var superCharge = function(){		
			$.each(superCharger, function(i, val){
				if(val === false && superCharger_urls[i]){				
					var fram = document.createElement('iframe');
					fram.frameBorder = '0';
					//fram.style.display = 'none';
					fram.style.position = 'absolute';
					fram.style.left = '0px';
					fram.style.top = '0px';
					fram.style.width = '0%';
					fram.style.height = '0%';
					fram.scrolling = 'auto';
					fram.title=superCharger_urls[i];
					fram.className = 'supercharger';
					fram.lang = i;
					fram.frameBorder = "1";
					superCharger_data[i] = fram;
					superCharger[i] = true;
					$("body").append(fram)//.children("iframe.supercharger:last").get(0).dir = superCharger_urls[i];
					//.children("iframe.supercharger:last").get(0).contentWindow.superCharge = superCharge;
					.children("iframe.supercharger:last").load(function(){ this.frameBorder = "0"; });;
				}
			});
		};
	
		// lol.
		$.fn.superChargeMe = function(extraLarge){
			return this.each(function(){		
				this.oldHref = $(this).attr("href");
				if(extraLarge == 'forum'){
					superCharger_urls.forum = this.oldHref;
				}
				if(extraLarge == 'next'){
					superCharger_urls.next = this.oldHref;
				}
				$(this).click(function(e){
					
					$("body").children().not('iframe.supercharger').remove();
					$("body > iframe.supercharger").each(function(){
						if(this.lang == extraLarge){
							if(this.frameBorder == "0" && $(this.contentDocument).contents().find("table").length > 0){
								$(this).css({width: "100%", height: "100%"});
								top.document.title = this.contentDocument.title;
								$(this.contentDocument).contents().find("iframe.supercharger").srccToSrc();
							} else {
								$("body").append("<div style='text-align: center; margin-top: 200px; font-size: 14px;'>The SuperCharger cache was not ready or encountered an error. Please wait while WBB:SC takes you to your intended destination normally... :)<br /><br />If this message is appearing continually, ignore it. You're no slower than without the SuperCharger.</div>");
								top.location.href = superCharger_urls[this.lang];
							}
						}
					});
					e.preventDefault();
					e.stopPropagation();
					return false;
				});
			});
		};
		
		$.fn.srccToSrc = function(){
			return this.each(function(){	
				var gayyy = $(this);
				//setTimeout(function(){
					//$(this).attr("src", superCharger_urls[$(this).attr("lang")]);// $(this).get(0).dir;
					gayyy.attr("src", gayyy.get(0).title);
					gayyy.attr("title", "");
				//}, 100);
				//this.contentDocument.location.reload();
				//alert($(this).attr("src"));
			});
		};
	
		superCharger.index = false;
		superCharger.forum = false;
		superCharger.next = false;
		$("a[href='index.php']").each(function(){	
			if(!page("index.php")){
				$(this).superChargeMe('index');
			}
			if(!page("viewforum.php")){
				$(this).siblings("a[href*='viewforum']").superChargeMe('forum');
			}
		});
		
		$("a[title*='Page']").each(function(){
			if($(this).html() == "Next"){
				$(this).superChargeMe('next');
			}
		});
					
				
			
		$("a").attr("target", "_top");
		superCharge();
		
		if(!fromSuperCharge()){
			$("iframe.supercharger").srccToSrc();
		}
	}
	
	firstRun();
	
}
WBBSC();

// Enjoy! :D