// ==UserScript==
// @name           Govno 3.1 beta
// @version        3.1.0.5
// @description    Govno (penochka) imgboard script.
// @include http://iichan.ru/*
// @include http://*.iichan.ru/*
// @include http://02ch.su/*
// @include http://*.02ch.su/*
// @include http://2-ch.ru/*
// @include http://*.2-ch.ru/*
// @match http://iichan.ru/*
// @match http://*.iichan.ru/*
// @match http://02ch.su/*
// @match http://*.02ch.su/*
// @match http://2-ch.ru/*
// @match http://*.2-ch.ru/*
// @exclude */src/*
// @run-at         document-start
// ==/UserScript==

var __startup = (new Date).getTime();
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
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.textContent||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}return;o.support.scriptEval=false;if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();

				var Pnchk = jQuery;/*
(c) Copyrights 2007 - 2008

Original idea by by Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
 
jQuery Plugin by Tzury Bar Yochay 
tzury.by@gmail.com
http://evalinux.wordpress.com
http://facebook.com/profile.php?id=513676303

Project's sites: 
http://code.google.com/p/js-hotkeys/
http://github.com/tzuryby/hotkeys/tree/master

License: same as jQuery license. 

USAGE:
    // simple usage
    $(document).bind('keydown', 'Ctrl+c', function(){ alert('copy anyone?');});
    
    // special options such as disableInIput
    $(document).bind('keydown', {combi:'Ctrl+x', disableInInput: true} , function() {});
    
Note:
    This plugin wraps the following jQuery methods: $.fn.find, $.fn.bind and $.fn.unbind
*/

(function (jQuery){
    // keep reference to the original $.fn.bind, $.fn.unbind and $.fn.find
    jQuery.fn.__bind__ = jQuery.fn.bind;
    jQuery.fn.__unbind__ = jQuery.fn.unbind;
    jQuery.fn.__find__ = jQuery.fn.find;
    
    var hotkeys = {
        version: '0.7.9',
        override: /keypress|keydown|keyup/g,
        triggersMap: {},
        
        specialKeys: { 27: 'esc', 9: 'tab', 32:'space', 13: 'return', 8:'backspace', 145: 'scroll', 
            20: 'capslock', 144: 'numlock', 19:'pause', 45:'insert', 36:'home', 46:'del',
            35:'end', 33: 'pageup', 34:'pagedown', 37:'left', 38:'up', 39:'right',40:'down', 
            109: '-', 
            112:'f1',113:'f2', 114:'f3', 115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8', 
            120:'f9', 121:'f10', 122:'f11', 123:'f12', 191: '/'},
        
        shiftNums: { "`":"~", "1":"!", "2":"@", "3":"#", "4":"$", "5":"%", "6":"^", "7":"&", 
            "8":"*", "9":"(", "0":")", "-":"_", "=":"+", ";":":", "'":"\"", ",":"<", 
            ".":">",  "/":"?",  "\\":"|" },
        
        newTrigger: function (type, combi, callback) { 
            // i.e. {'keyup': {'ctrl': {cb: callback, disableInInput: false}}}
            var result = {};
            result[type] = {};
            result[type][combi] = {cb: callback, disableInInput: false};
            return result;
        }
    };
    // add firefox num pad char codes
    //if (jQuery.browser.mozilla){
    // add num pad char codes
    hotkeys.specialKeys = jQuery.extend(hotkeys.specialKeys, { 96: '0', 97:'1', 98: '2', 99: 
        '3', 100: '4', 101: '5', 102: '6', 103: '7', 104: '8', 105: '9', 106: '*', 
        107: '+', 109: '-', 110: '.', 111 : '/'
        });
    //}
    
    // a wrapper around of $.fn.find 
    // see more at: http://groups.google.com/group/jquery-en/browse_thread/thread/18f9825e8d22f18d
    jQuery.fn.find = function( selector ) {
        this.query = selector;
        return jQuery.fn.__find__.apply(this, arguments);
	};
    
    jQuery.fn.unbind = function (type, combi, fn){
        if (jQuery.isFunction(combi)){
            fn = combi;
            combi = null;
        }
        if (combi && typeof combi === 'string'){
            var selectorId = ((this.prevObject && this.prevObject.query) || (this[0].id && this[0].id) || this[0]).toString();
            var hkTypes = type.split(' ');
            for (var x=0; x<hkTypes.length; x++){
                delete hotkeys.triggersMap[selectorId][hkTypes[x]][combi];
            }
        }
        // call jQuery original unbind
        return  this.__unbind__(type, fn);
    };
    
    jQuery.fn.bind = function(type, data, fn){
        // grab keyup,keydown,keypress
        var handle = type.match(hotkeys.override);
        
        if (jQuery.isFunction(data) || !handle){
            // call jQuery.bind only
            return this.__bind__(type, data, fn);
        }
        else{
            // split the job
            var result = null,            
            // pass the rest to the original $.fn.bind
            pass2jq = jQuery.trim(type.replace(hotkeys.override, ''));
            
            // see if there are other types, pass them to the original $.fn.bind
            if (pass2jq){
                result = this.__bind__(pass2jq, data, fn);
            }            
            
            if (typeof data === "string"){
                data = {'combi': data};
            }
            if(data.combi){
                for (var x=0; x < handle.length; x++){
                    var eventType = handle[x];
                    var combi = data.combi.toLowerCase(),
                        trigger = hotkeys.newTrigger(eventType, combi, fn),
                        selectorId = ((this.prevObject && this.prevObject.query) || (this[0].id && this[0].id) || this[0]).toString();
                        
                    //trigger[eventType][combi].propagate = data.propagate;
                    trigger[eventType][combi].disableInInput = data.disableInInput;
                    
                    // first time selector is bounded
                    if (!hotkeys.triggersMap[selectorId]) {
                        hotkeys.triggersMap[selectorId] = trigger;
                    }
                    // first time selector is bounded with this type
                    else if (!hotkeys.triggersMap[selectorId][eventType]) {
                        hotkeys.triggersMap[selectorId][eventType] = trigger[eventType];
                    }
                    // make trigger point as array so more than one handler can be bound
                    var mapPoint = hotkeys.triggersMap[selectorId][eventType][combi];
                    if (!mapPoint){
                        hotkeys.triggersMap[selectorId][eventType][combi] = [trigger[eventType][combi]];
                    }
                    else if (mapPoint.constructor !== Array){
                        hotkeys.triggersMap[selectorId][eventType][combi] = [mapPoint];
                    }
                    else {
                        hotkeys.triggersMap[selectorId][eventType][combi][mapPoint.length] = trigger[eventType][combi];
                    }
                    
                    // add attribute and call $.event.add per matched element
                    this.each(function(){
                        // jQuery wrapper for the current element
                        var jqElem = jQuery(this);
                        
                        // element already associated with another collection
                        if (jqElem.attr('hkId') && jqElem.attr('hkId') !== selectorId){
                            selectorId = jqElem.attr('hkId') + ";" + selectorId;
                        }
                        jqElem.attr('hkId', selectorId);
                    });
                    result = this.__bind__(handle.join(' '), data, hotkeys.handler)
                }
            }
            return result;
        }
    };
    // work-around for opera and safari where (sometimes) the target is the element which was last 
    // clicked with the mouse and not the document event it would make sense to get the document
    hotkeys.findElement = function (elem){
        if (!jQuery(elem).attr('hkId')){
            if (jQuery.browser.opera || jQuery.browser.safari){
                while (!jQuery(elem).attr('hkId') && elem.parentNode){
                    elem = elem.parentNode;
                }
            }
        }
        return elem;
    };
    // the event handler
    hotkeys.handler = function(event) {
        var target = hotkeys.findElement(event.currentTarget), 
            jTarget = jQuery(target),
            ids = jTarget.attr('hkId');
        
        if(ids){
            ids = ids.split(';');
            var code = event.which,
                type = event.type,
                special = hotkeys.specialKeys[code],
                // prevent f5 overlapping with 't' (or f4 with 's', etc.)
                character = !special && String.fromCharCode(code).toLowerCase(),
                shift = event.shiftKey,
                ctrl = event.ctrlKey,            
                // patch for jquery 1.2.5 && 1.2.6 see more at:  
                // http://groups.google.com/group/jquery-en/browse_thread/thread/83e10b3bb1f1c32b
                alt = event.altKey || event.originalEvent.altKey,
                mapPoint = null;

            for (var x=0; x < ids.length; x++){
                if (hotkeys.triggersMap[ids[x]][type]){
                    mapPoint = hotkeys.triggersMap[ids[x]][type];
                    break;
                }
            }
            
            //find by: id.type.combi.options            
            if (mapPoint){ 
                var trigger;
                // event type is associated with the hkId
                if(!shift && !ctrl && !alt) { // No Modifiers
                    trigger = mapPoint[special] ||  (character && mapPoint[character]);
                }
                else{
                    // check combinations (alt|ctrl|shift+anything)
                    var modif = '';
                    if(alt) modif +='alt+';
                    if(ctrl) modif+= 'ctrl+';
                    if(shift) modif += 'shift+';
                    // modifiers + special keys or modifiers + character or modifiers + shift character or just shift character
                    trigger = mapPoint[modif+special];
                    if (!trigger){
                        if (character){
                            trigger = mapPoint[modif+character] 
                                || mapPoint[modif+hotkeys.shiftNums[character]]
                                // '$' can be triggered as 'Shift+4' or 'Shift+$' or just '$'
                                || (modif === 'shift+' && mapPoint[hotkeys.shiftNums[character]]);
                        }
                    }
                }
                if (trigger){
                    var result = false;
                    for (var x=0; x < trigger.length; x++){
                        if(trigger[x].disableInInput){
                            // double check event.currentTarget and event.target
                            var elem = jQuery(event.target);
                            if (jTarget.is("input") || jTarget.is("textarea") || jTarget.is("select") 
                                || elem.is("input") || elem.is("textarea") || elem.is("select")) {
                                return true;
                            }
                        }                       
                        // call the registered callback function
                        result = result || trigger[x].cb.apply(this, [event]);
                    }
                    return result;
                }
            }
        }
    };
    // place it under window so it can be extended and overridden by others
    window.hotkeys = hotkeys;
    return jQuery;
})(jQuery);
;(function ($) {
   /*
    * vim: ts=3 sts=3 cindent expandtab
    *
    * kernel - Ядерные функции

    Наиболее общеупотребительные функции пеночки */

   var events = {}
	$.log=''

   $.on = function(evname, fun, top) {
      evname = $.makeArray(evname)
      for (var i = 0; i < evname.length; i++) {
         try {
            if(top)
               events[evname[i]].unshift(fun)
            else
               events[evname[i]].push(fun)
         } catch (err) {
            events[evname[i]] = [fun]
         }
      }
   }

   $.to = function (evname, cookie) {
		var trd = (new Date).getTime() - $.timer.time
		$.log += 'event: '+evname+' ('+cookie+') ' + trd + '\n' 
      if (!events[evname])
         return cookie
      for(var i = 0; cookie != null && i < events[evname].length; i++) {
         cookie = events[evname][i](cookie)
		}
		return cookie
		/* I'm doubt we need this */
		var ev = cookie && cookie.next
		if (ev) {
			cookie.next = null
			return $.to(ev, cookie)
		} else {
			return cookie
		}
   }

   $.extend({
      swap:function(b){
         b = $(b)[0]
         var a = this[0];
         var t = a.parentNode.insertBefore(document.createTextNode(''), a);
         b.parentNode.insertBefore(a, b);
         t.parentNode.insertBefore(b, t);
         t.parentNode.removeChild(t);
         return this;
      }
   })

   $.fn.swap = function(b){
      b = jQuery(b)[0]
      var a = this[0];
      var t = a.parentNode.insertBefore(document.createTextNode(''), a);
      b.parentNode.insertBefore(a, b);
      t.parentNode.insertBefore(b, t);
      t.parentNode.removeChild(t);
      return this;
   };

   $.extend($.fn, {
      show: function () {
         $(this).each(
            function (){
               this.style.display=''
            });
         return this
      }
   })

})(jQuery);/**
 * penochka internationalization
 */
;(function ($) {

	var cfg = {lang:'ru'}

	$.on(
		'/r/ settings',
		function (data) {
			langs = $.to('/r/ langs', '')
			data.push({group:'', html:'Язык интерфейса###<select reloadable="true" name="lang">'+langs+'</select>'})
			return data
		})

	$.on(
		'config',
		function (data) {
			cfg = $.mergeCfg(data, cfg)
			return data
		})

	$.on(
		'ready',
		function (data) {
			$.i18n = $.to(cfg.lang,1)
			return data
		})

})(jQuery);;(function ($) {

   $.refmap = {}

   $.on(
      ['wakaba', 'default.def'],
      function (data) {
         $.iom = {
            tid: '.thread',
            pid: 'table, .oppost',
            post: {
               anchor: 'a[name]',
               image: 'a img',
               imageinfo: 'span.filesize a',
               abbr: 'div.abbrev',
               abbrlink: 'div.abbrev a',
               wholemessage: 'blockquote',
               //backrefs: 'blockquote.penRefs a',
               //backrefsBlock: 'blockquote.penRefs',
               message: 'blockquote:not(.penRefs):first',
               ref: 'span.reflink',
               reflink: 'span.reflink a:first',
               title: 'span.replytitle, span.filetitle',
               poster: 'span.commentpostername, span.postername',
               email: 'span.commentpostername a, span.postername a'
            },
            thread: {
               header: 'div.theader',
               ref: 'span.reflink:first',
               reflink: 'span.reflink:first a',
               menu: 'span.reflink + a',
               message: 'blockquote:not(.penRefs):first',
               moar: 'span.omittedposts',
               title: 'span.filetitle',
               eot: 'table:last',
               reply: 'br[clear]:last'
            },
            form: {
               user: 'input[name=akane]',
               email: 'input[name=nabiki]',
               title: 'input[name=kasumi]',
               message: 'textarea[name=shampoo]',
               rules: 'div.rules',
               file: 'input[name=file]',
               turtest: 'input[name=captcha]',

               password: 'input[name=password]',
               moveto: '#trgetback',
               parent: 'input[name=parent]',
               submit: 'input[type=submit]',
               status: '#formStatus',
               buttons: '#formButtons'
            },
            mainWrap: '#delform, form[action$=delete]',
            anchors: 'blockquote a[onclick]',
            topmenu: 'div.adminbar',
            menu: 'div.adminbar:first a:last',
            options: '#penOptions',
            logo: 'div.logo',
            postform: 'div.postarea',
            footer: 'p.footer a:first',
            unfoldImgCss: 'border: 2px dashed #EE6600;',
            imgMenu: 'text-decoration: none',
            errStr: 'h1',
            ref: '>>',
            css: {
               unfolded: 'highlight',
               highlight: 'highlight',
               preview: 'reply',
               bordered: 'reply',
               notify: 'reply reflink',
               header: 'theader'
            }
         }

         $.chanOk = true
         $.isInThread =  location.pathname.match('/res/')
         $.p2t = {}
         $.t2p = {}

         $.convergePage = function (data, cb) {
            var subj = data.e.find('#delform')[0]
            var re = /(<(hr).*?name="(\d+)">)|(<(table).*?name="(\d+)">)/ig
            var html = (subj.innerHTML).split(re)
            var tail = ''
            for (i = 1; i < html.length; i+=7) {
               /* oppost */
               if (html[i+1]) {
                  tail += html[i].replace(/(<hr.*?>)/i, '$1</div><div class="thread"><span class="oppost">') + html[i+6] + '</span>'
               }
               /* post */
               if (html[i+4]) {
                  if (i+7 >= html.length) {
                     /* Handle delform */
                     html[i+6] = html[i+6].replace(/(<table.*?userdelete)/i, '</div>$1')
                  }
                  tail += html[i+3] + html[i+6]
               }
            }

            var cloned = subj.cloneNode(false)
            cloned.innerHTML = '<div class="thread"><span class="oppost">'+html[0]+ '</span>'+tail
            cb && cb(cloned, data)
            subj.parentNode.replaceChild(cloned, subj)
            return data
         }

         $.processPage = function (cloned, data) {
            var a = cloned.getElementsByTagName('A')
            var postrefs = []

            for (var i = a.length - 1; i >= 0; i--) {
               if (a[i] && a[i].name) {

                  for (var j = 0; j < postrefs.length; j++) {
                     if (!$.refmap[postrefs[j]])
                        $.refmap[postrefs[j]] = {}
                     $.refmap[postrefs[j]][a[i].name]=1
                  }

                  postrefs = []

                  data.e = $(a[i]).closest($.iom.pid)
                  data.id = a[i].name
                  data.isOp = a[i].parentNode.tagName != 'TD'
                  if (data.postmsg)
                  {
                     data = $.to(data.postmsg, data) || data
                  }
               } else if (a[i] && a[i].onclick) {
                  postrefs.push(a[i].href.split('#')[1])
               }
            }
         }

         $.on('domready', function (data) {
            data.postmsg = 'post'
            $.to('process', data)
            return data
         })

         $.on('process', function (data) {
            $.convergePage(data, $.processPage)
            return data
         })

	 $.checkErrorPage= function (doc) {
	    if (!doc.find($.iom.mainWrap).length) {
	       return doc.find('h1').text().split('.')[0]
	    }
	    return false
	 }

         $.fn.extend({
            postPreview: function () {
               var td = $(this).find('td.reply')
               if (td.length) {
                  return td
               }
               return $(this)
            }
         });

         $.on(
            'tune form',
            function (data) {
               if (data.parent)
                  data.e.prepend('<input type="hidden" name="parent" value="' + data.parent + '" />')
               return data
            })

         $.extend({
            fixHref:function (href) {
               if (href.match(/^\//)) {
                  href = location.protocol + '//' + location.hostname + href
               }
               if (!href.match('#')) {
                  anchor = href.match(/(\w+\d+)\D*$/)[1]
                  href = href + '#' + anchor
               }
               return href
            },
            turl: function (tid) {
               var board = (location.pathname.match(/^(\/\w+\/)/) || ['',''])[1]
               return board + 'res/'+tid.replace(/\D/g, '')+'.html'
            },
            urltid: function (url) { /* obsolete. Should be replaced by parseURL */
               return url.replace(/.*\/(\d+)\.html/,'$1')
            },
            parseURL: function (url) {
               var ret = null;
               if (ret = url.match(/(\w+)\/res\/(\d+)/)) {
                  return {board: ret[1], thread: ret[2]}
               } else {
                  return {board: null, thread: null}
               }
            },
            isPostNum: function (e) {
               return e.parent('span.reflink').length && !e.prev().length
            }
         });

         $.bookmarks || ($.bookmarks = {})

         $.ui = {
            anchor :
            function(href) {
               var addr = $.fixHref(href).split('#')
               return '<a href="' + addr[0] + '#' + addr[1] + '" onclick="highlight('+addr[1]+')">&gt;&gt;'+addr[1]+'</a>'
            },
            refs :
            function (content) {
               //return '<blockquote class="penRefs"><small>' + $.i18n.brefs + ' '+content+'.</small></blockquote>'
            },
            preview :
            function (idobj, x, y) {
               if (typeof idobj == 'string') {
                  var obj = $('a[name='+idobj+']').closest($.iom.pid).clone(true)
                  if (obj.length == 0)
                     obj = $('a[name='+idobj+']', $.cache[0]).closest($.iom.pid).clone(true)
               } else {
                  var obj = idobj
               }
               obj.find('a[name]').removeAttr('name')
               obj.addClass(db.cfg.hlPrevs ? 'highlight' : 'reply')
               obj.attr('style','position:absolute; top:' + y +
                        'px; left:' + x + 'px;display:block;')
               return obj
            },
            threadCite:
            function (id, len) {
               var subj = $('a[name=' + id + ']').closest($.iom.pid)
               var topic = subj.find($.iom.thread.title).text()
               return ((topic ? topic + ' // ' : '') +
                       subj.find($.iom.thread.message).text()).
                     slice(0, len)
            },
            multiLink :
            function(links, begin, end, sep) {
               begin = begin != null ? begin : '['
               end =     end != null ? end : ']'
               sep =     sep != null ? sep : ' / '
               var res = []
               for (i in links) {
                  if (links[i][1].search('/') == 0 || links[i][1].search('http:') == 0)
                     res.push('<a href="'+links[i][1]+'">'+links[i][0]+'</a>')
                  else
                     res.push($.ui.msg(links[i][0], links[i][1], links[i][2]))
               }
               return begin + res.join(sep) + end
            },
            msg: function (title, m, param) {
               return '<a href="javascript://" ' +
                     (param ? 'param="'+param+'"' : '')
                     + ' msg="'+m+'">'+title+'</a>'
            },
            tizer :
            function (id, body, isThread, cssClass) {
               return $("<div id=\'tiz" + id + "\' " + (isThread ? 'thread="ok"' : '') + ">" +
                        (isThread ? body : '<small>' + body + '</small>') +
                        (isThread ? "<br clear='both' /><hr />" : "") +
                        '</div>')
            },
            window:
            function (id, title, menu) {
               var div = $('<div id="' + id + '" style="display:none"></div>').
                     append($('<h1 style="float:left;margin:0;padding:0;" class="logo">' + title + '</h1>')).
                     append($('<div>'+menu+'</div>').css('float', 'right')).
                     append('<br clear="borh" /><br />')
               $('body').prepend(div)
               return div
            }
         }

         $.on('thread menu',
              function (data) {
                 data.menu.push(['<!--4-->' + $.i18n.reply, data.turl])
                 return data
              })

         $.on(
            'window',
            function (data) {
               $('table[border]').hide()
               return data
            })

         $.on(
            'close window',
            function (data) {
               $('table[border]').show()
               return data
            })

         $.on(
            'main menu',
            function (data) {
               if (!$.isInWindow)
                  data.push(['<!--0-->', 'settings'])
               return data
            })

      })

})(jQuery);;(function ($) {

	$.refmap = {}

	var cfg = {mulTt: 1}

	$.on(
		'config',
		function (data) {
			cfg = $.mergeCfg(data, cfg)
			return data
		})

	$.on(
		['2-ch.ru'],
		function (data) {

			/* Super */
			$.to('wakaba', data)

			$.on(
				'tune form',
				function (data) {
					function mulTt(tt) {
						var out = ''
						for (var i = 0 ;i < cfg.mulTt; i++) {
							out += ' &nbsp; ' + tt
						}
						return "'" + out + "'"
					}
					if (data.parent) {
						var ttTxt = data.e.html().
							replace(/captchadiv/g, 'captchadiv'+data.parent).
							replace(/mainpage/g, 'res'+data.parent).
							replace(/'(<img.*?>)'/g, cfg.mulTt ? mulTt('$1'): "'$1'")
						
						while (ttTxt.match(/dummy=\D/))
							ttTxt = ttTxt.replace(/dummy=(\D)/, 
								'dummy='+Math.floor(Math.random() * 1000).toString()+'$1')

						data.e.html(ttTxt)
					}
					return data
				})

			$.on(
				'/r/ settings',
				function (data) {
					data.push({
						group:'Форма ответа', 
						html:'Размножать капчу, экз. ###<input name="mulTt" value="1">'
					})
					return data
				})

			$.on(
				'custom defaults',
				function (defs) {
					defs.censPage = 'div.logo+hr'
					return defs
				})
		})

	$.on(
		['dobrochan.ru'],
		function (data) {
			/* Super */
			$.to('wakaba', data) 
			$.iom.pid = '.post'
			$.iom.thread.menu = 'span.cpanel a:last'

			$.convergePage = function (data) {
				$.processPage(data.e.find('form[action$=delete]')[0], data)
				return data
			}

			$.on(
				'custom defaults',
				function (defs) {
					defs.censPage = '#music_player+hr,a.icon'
					return defs
				})

		})

})(jQuery);;(function ($) {

   $.refmap = {}

   $.on(
      'kusaba',
      function (data) {
         $.iom = {
            tid: 'span.penThread',
            pid: 'div.postnode',
            post: {
               anchor: 'a[name]',
               image: 'a img',
               imageinfo: 'span.filesize a',
               abbr: 'div.abbrev',
               abbrlink: 'div.abbrev a',
               wholemessage: 'blockquote',
               //backrefs: 'blockquote.penRefs a',
               //backrefsBlock: 'blockquote.penRefs',
               message: 'blockquote:not(.penRefs):first',
               ref: 'span.reflink',
               reflink: 'span.reflink a:last',
               title: 'span.replytitle, span.filetitle',
               poster: 'span.commentpostername, span.postername',
               email: 'span.commentpostername a, span.postername a'
            },
            thread: {
               header: 'div.replymode',
               ref: 'span.reflink',
					menu: 'span.extrabtns + span + a',
               reflink: 'span.reflink a:last',
               message: 'blockquote:not(.penRefs):first',
               moar: 'span.omittedposts',
               title: 'span.filetitle',
               eot:'table:last, .oppost',
               eotNotOp: 'table:last'
            },
            form: {
               user: 'input[name=name]',
               email: 'label[for=sage]',
               title: 'input[name=subject]',
               message: 'textarea[name=message]',
					rules: '.rules',
               file: 'input[name=imagefile]',
               turtest: 'input[name=captcha]',
               turimage: 'img[src*=captcha.pl]',
               turdiv: '#captchadiv',
               password: 'input[name=postpassword]',
               moveto: 'label[for=gotothread]',
               parent: 'input[name=parent]',
               submit: 'input[type=submit]',
               status: '#formStatus',
               buttons: '#formButtons'
            },
            mainWrap: '#delform',
            anchors: 'blockquote a[onclick]',
            menu: 'div.adminbar a[href=#]',
				logo: 'div.logo',
            options: '#penOptions',
            postform: 'div.postarea',
            footer: '#navbotr a:first',
            unfoldImgCss: 'border: 2px dashed #EE6600;',
            errStr: 'h1',
            ref: '>>',
            css: {
               unfolded: 'highlight',
               highlight: 'highlight',
               preview: 'reply',
               notify: 'reply reflink',
					header: 'theader'
            }
         }

         $.chanOk = true
         $.isInThread =  location.pathname.match('/res/')
         $.p2t = {}
         $.t2p = {}

         $.on(
            ['domready', 'process'],
            function (data) {
               var a = data.e[0].getElementsByTagName('A')
               var deferred = {}
               var postrefs = []

               for (var i = a.length - 1; i >= 0; i--) {
                  if (a[i] && a[i].name && a[i].name.match(/^\d+$/)) {
                     for (var j = 0; j < postrefs.length; j++) {
                        if (!$.refmap[postrefs[j]])
                           $.refmap[postrefs[j]] = {}
                        $.refmap[postrefs[j]][a[i].name]=1
                     }
                     postrefs = []
                     var isOp = a[i].parentNode.tagName != 'TD'
                     if (isOp) {
								var post = $(a[i]).closest($.iom.pid)
                        deferred['op']=post
								data.tid = a[i].name
                        $.t2p[data.tid] = deferred
                        for (j in deferred) {
                           data.e = deferred[j]
                           data.id = j
                           $.p2t[j] = data.tid
                           data.refs = $.refmap[j]
                           data = $.to('post', data) || data
                        }
                        deferred = {}
                     } else {
                        var post = $(a[i]).closest($.iom.pid)
                        if (!deferred['tail']) {
                           /* Capture <br> and <hr> */
                           var el = post[0].nextSibling ? post : post.parents('div[id^=thread]')
                           deferred['tail'] = el.next()
                           deferred['tail2'] = el.next().next()
                        }
                        deferred[a[i].name]=post
                     }
                  } else if (a[i] && a[i].onclick) {
                     postrefs.push(a[i].href.split('#')[1])
                  }
               }
               return data
            })

         $.fn.extend({
            postPreview: function () {
               var td = $(this).find('td.reply')
               if (td.length) {
                  return td
               }
               return $(this)
				},
				getPost: function () {
					return $(this).next()
				}
         });
			
			$.on(
				'tune form',
				function (data) {
               if (data.parent)
                  data.e.prepend('<input type="hidden" name="parent" value="' + data.parent + '" />')
					return data
				})

         $.extend({
            fixHref :function (href) {
               if (href.match(/^\//)) {
                  href = location.protocol + '//' + location.hostname + href
               }
               if (!href.match('#')) {
                  anchor = href.match(/(\d+)\D*$/)[1]
                  href = href + '#' + anchor
               }
               return href
            },
            turl: function (tid) {
               var board = (location.pathname.match(/^(\/\w+\/)/) || ['',''])[1]
               return board + 'res/'+tid.replace(/\D/g, '')+'.html'
            },
            urltid: function (url) { /* obsolete. Should be replaced by parseURL */
               return url.replace(/.*\/(\d+)\.html/,'$1')
            },
				parseURL: function (url) {
					var ret = null;
					if (ret = url.match(/(\w+)\/res\/(\d+)/)) {
						return {board: ret[1], thread: ret[2]}
					} else {
						return {board: null, thread: null}
					}
				},
				isPostNum: function (e) {
					return e.parent('span.reflink').length && !e.prev().length
				}
         });

         $.bookmarks || ($.bookmarks = {})

         $.ui = {
            anchor :
            function(href) {
               var addr = $.fixHref(href).split('#')
               return '<a href="' + addr[0] + '#' + addr[1] + '" onclick="highlight('+addr[1]+')">&gt;&gt;'+addr[1]+'</a>'
            },
            refs :
            function (content) {
               //return '<blockquote class="penRefs"><small>' + $.i18n.brefs + ' ' + content+'.</small></blockquote>'
            },
            preview :
            function (idobj, x, y) {
               if (typeof idobj == 'string') {
                  var obj = $('a[name='+idobj+']').closest($.iom.pid).clone(true)
                  if (obj.length == 0)
                     obj = $('a[name='+idobj+']', $.cache[0]).closest($.iom.pid).clone(true)
               } else {
                  var obj = idobj
               }
               obj.find('a[name]').removeAttr('name')
               obj.addClass(db.cfg.hlPrevs ? 'highlight' : 'reply')
               obj.attr('style','position:absolute; top:' + y +
                        'px; left:' + x + 'px;display:block;')
               return obj
            },
            threadCite:
            function (id, len) {
               var subj = $('a[name=' + id + ']').closest($.iom.pid)
               var topic = subj.find($.iom.thread.title).text()
               return ((topic ? topic + ' // ' : '') +
                       subj.find($.iom.thread.message).text()).
                  slice(0, len)
            },
            multiLink :
            function(links, begin, end, sep) {
               begin = begin != null ? begin : '['
               end =  end != null ? end : ']'
               sep =  sep != null ? sep : ' / '
               var res = []
               for (i=0;i<links.length;i++) {
                  if (links[i][1].search('/') == 0 || links[i][1].search('http:') == 0)
                     res.push('<a href="'+links[i][1]+'">'+links[i][0]+'</a>')
                  else
                     res.push($.ui.msg(links[i][0], links[i][1], links[i][2]))
               }
               return begin + res.join(sep) + end
            },
            msg: function (title, m, param) {
               return '<a href="javascript://" ' +
                  (param ? 'param="'+param+'"' : '')
                  + ' msg="'+m+'">'+title+'</a>'
            },
            tizer :
            function (id, body, isThread, cssClass) {
               return $("<div id=\'tiz" + id + "\' >" +
                        (isThread ? body : '<small>' + body + '</small>') +
                        (isThread ? "<br clear='both' /><hr />" : "") +
                        '</div>')
            },
            window:
            function (id, title, menu) {
               var div = $('<div id="' + id + '" style="display:none"></div>').
                  append($('<h1 style="float:left;margin:0;padding:0;" class="logo">' + title + '</h1>')).
                  append($('<div>'+menu+'</div>').css('float', 'right')).
                  append('<br clear="borh" /><br />')
               $('body').prepend(div)
               return div
            }
         }

			$.on('thread menu',
				  function (data) {
					  data.menu.push(['<!--4-->' + $.i18n.reply, data.turl])
					  return data
				  })
			return data
      })

})(jQuery);;(function ($) {

   $.on(
      'www.0chan.ru',
      function (data) {
			/* Super */
         $.to('kusaba', data)
			$.on(
				'css', 
				function (data) {					
					data.css += ' .overlay-menu {	position:fixed;top:0px;	left:30px;border-left:1px #CCC solid;border-right:1px #CCC solid;border-bottom:1px #CCC solid;padding:3px;-moz-border-radius: 0px 0px 5px 5px;-webkit-border-bottom-left-radius: 5px;-webkit-border-bottom-right-radius: 5px;z-index:100}'
					return data
				})
			return data
      })

})(jQuery);;(function ($) {

	$.on(
		'/r/ langs', 
		function (data) {
			data+='<option value="en">English</option>'
			return data
		})

	$.on('en',
		  function (data) {
			  return {
				  formButtons: $.ui.multiLink([
					  ['<strong msg="bold">B</strong>', ''],
					  ['<em msg="italic">E</em>', ''],
					  ['<s msg="strikeout">S</s>', ''],
					  ['<u msg="underline">U</u>', ''],
					  ['<span msg="spoiler" class="spoiler">SP</span>', '']]) +
					  ' ' +
					  $.ui.multiLink([
						  ['<tt msg="source code">Src</tt>', ''],
						  ['<strong msg="**CAPSBOLD**">CB</strong>', '']]) +
					  '<br />',
				  thrdLoading: 'Thread loading...',
				  sending: 'Sending...',
				  okReloadingNow: 'Ok. Reloading now...',
				  no: '#',
				  thrd: 'Thread', hidden: 'hidden', filtered: 'filtered',
				  brefs: 'Links',
				  post: 'Post',
				  reply: 'Reply',
				  replyThat: 'Reply here',
				  fold: 'Fold',
				  unfold: 'Unfold',
				  show: 'Show',
				  showAll: 'Show all',
				  hide: 'Hide',
				  hidePost: '×',
				  imgSrc: 'src',
				  close: 'Close',
				  sage: 'Sage',
				  dflt: 'Defaults',
				  allDefault: 'Restore defaults',
				  apply: 'Apply',
				  settings: 'Settings',
				  bookmarks: 'Bookmarks',
				  bookmarksTitle: 'Penochka — Bookmarks',
				  settingsTitle: 'Penochka — Settings',
				  fromBms: 'Unbookmark',
				  toBms: 'Bookmark',
				  createThread: 'New thread',
				  hideForm: 'Hide form',
				  totalMsgs: 'Total posts: ',
				  totalFilted: ', filtered ',
				  notify: {
					  thrdLoading: 'Thread #%t% loading...'
				  },
				  err: {
					  regExp: 'Regexp error. Check it\' syntax.',
					  post404 : 'Preview creation error. <br />Cannot find post.',
					  cache: 'Cache error. <br />Requested page unloadable',
					  cookiesFull: 'Has not saved. <br />Cookies overflow.'
				  },
				  imgs: {
					  fold: 'Fold images',
					  unfold: 'Unfold images'
				  },
				  imgLess: {
					  hide: 'Hide imageless',
					  show: 'Show imageless'
				  },
				  citeLess : {
					  hide: 'Hide messages with < <input size="4" value="1" > replys',
					  show: 'Show this back'
				  },
				  btns: {}
			  }
		  })
})(jQuery);;(function ($) {

	$.on(
		'/r/ langs', 
		function (data) {
			data+='<option selected="selected" value="ru">Русский</option>'
			return data
		})

	$.on('ru',
		  function (data) {
			  return {
				  formButtons: $.ui.multiLink([
					  ['<strong msg="bold">Ж</strong>', ''],
					  ['<em msg="italic">К</em>', ''],
					  ['<s msg="strikeout">З</s>', ''],
					  ['<u msg="underline">П</u>', ''],
					  ['<span msg="spoiler" class="spoiler">СКР</span>', '']]) +
					  ' ' +
					  $.ui.multiLink([
						  ['<tt msg="source code">Код</tt>', ''],
						  ['<strong msg="**CAPSBOLD**">КБ</strong>', '']]) +
					  '<br />',
				  thrdLoading: 'Загрузка треда...',
				  sending: 'Отправка...',
				  okReloadingNow: 'Ok. Обновляем страницу...',
				  no: '№',
				  thrd: 'Тред', hidden: 'скрыт', filtered: 'отфильтрован',
				  post: 'Пост',
				  reply: 'Ответ',
				  replyThat: 'Ответить',
				  fold: 'Свернуть',
				  unfold: 'Развернуть',
				  brefs: 'Ссылки ',
				  show: 'Показать',
				  showAll: 'Показать всё',
				  hide: 'Скрыть',
				  hidePost: '×',
				  imgSrc: 'соус',
				  close: 'Закрыть',
				  sage: 'Сажа',
				  dflt: 'По умолчанию',
				  allDefault: 'Восстановить умолчания',
				  apply: 'Применить',
				  settings: 'Настройки',
				  bookmarks: 'Закладки',
				  bookmarksTitle: 'Говно — Закладки',
				  settingsTitle: 'Говно — Настройки',
				  fromBms: 'Из закладок',
				  toBms: 'В закладки',
				  createThread: 'Создать тред',
				  hideForm: 'Скрыть форму',
				  totalMsgs: 'Всего сообщений: ',
				  totalFilted: ', отфильтровано ',
				  notify: {
					  thrdLoading: 'Загрузка треда №%t%...'
				  },
				  err: {
					  regExp: 'Ошибка регулярного выражения. Проверьте его синтаксис.',
					  post404 : 'Ошибка создания превью. <br />Пост никак не удается найти.',
					  cache: 'Ошибка кеша. <br />Запращиваемую страницу никак не загрузить',
					  cookiesFull: 'Данные не сохнарены. <br />Печененки переполены.'
				  },
				  imgs: {
					  fold: 'Свернуть изображения',
					  unfold: 'Развернуть изображения'
				  },
				  imgLess: {
					  hide: 'Убрать сообщения без изображений',
					  show: 'Показать сообщения без изображений'
				  },
				  citeLess : {
					  hide: 'Убрать сообщения c < <input size="4" value="1" > ответов',
					  show: 'Показать малоответные сообщения обратно'
				  },
				  btns: {}
			  }
		  })
})(jQuery);/**
 * @module cache
 * @title  Кэш
 * @descr  Хранилище страничек, загруженных ajaxом.
 * @depends jquery kernel
 *
 * Кэш обрабатывает событие @/r/ cache@ , где ему передается url
 * странички, которую требуется закэшировать в параметре @href@ . В
 * случае если страница уже в кэше посылается событие @cache ok@ с DOMом
 * страницы в  параметре @data@ . В случае если страницы нет в кэше, кэш
 * сразу посылает  событие @pending@, а потом начинает ее загрузку
 * аяксом. По окончании загрузки опять таки посылается событие @cache
 * ok@ c DOMом страницы.
 *
 * В случае неудачи при загрузке страницы кэш добавляет её url с список
 * плохих (переменная @bad@ ) и отсылает событие @fail@ с указанием
 * причины. В последствии если запрашиваемая страницы уже содержится в
 * списке плохих. Повторный запрос не делается и сообщение о провале
 * высылается сразу.
 *
 * Особенностью является обработка страниц, не загруженных по причине
 * таймаута. В этом случае сообщение @fail@ высылается, однако страница
 * в список плохих не добавляется, мало ли, вдруг все таки загрузится.
 */

;(function ($) {

   var cache = {}
   var pending = {}
   var bad = {}

   $.on('set cache', function (data) {
      var url = data.href.split('#')[0]
      cache[url] = data.e
      $.to('process', data)
   })

   $.on('/r/ cache', function (data) {
      var part = $('<span/>')
      var url = data.href.split('#')[0]

      if (data.force) {
         delete cache[url]
         delete data.force
      }
      if (pending[url]) {
         /* Now simply drop but this is a
            bit incorrect */
         return data
      }
      if (cache[url]) {
         data.e = cache[url]
         return $.to('cache ok', data)
      }
      if (bad[url]) {
         data.wtf = $.i18n.err.cache
         return $.to('fail', data)
      }

      pending[url] = 1
      $.to('notify add', {
         nid: url,
         wtf: $.i18n.notify.thrdLoading.
               replace('%t%', url.match(/(\d+)\D+$/) && url.match(/(\d+)\D+$/)[1])
      })

      part.load(
         url + ' ' + $.iom.mainWrap,
         function (responseText, textStatus, XMLHttpRequest) {
            delete pending[url]
            if (textStatus == 'timeout') {
               data.wtf = textStatus
               return $.to('fail', data)
            }
            if (({success:1,notmodified:1})[textStatus]) {
	       data.e = part
	       $.to('set cache', data)
            } else {
               bad[url] = true
            }
            $.to('notify rm', {nid: url})
            return $.to('/r/ cache', data)
         })
   })

})(jQuery);/**
 * @module posts
 * @title  Post deliveri service
 * @descr  Получение сообщений по ссылке
 * @depends jquery kernel
 *
 * Модуль обрабатывает события @/r/ post@ и отсылает с ответ события
 * post ok с DOMом сообщения или @fail@ с указанием того, что плохого
 * произошло.
 *
 * TODO: Описать подробнее про работу с кешем.
 */
;(function ($) {

   $.on('/r/ post', function(data) {
      data.href = $.fixHref(data.href)
      var addr = data.href.split('#')
      var extracted = $('a[name='+addr[1]+']', data.ctx)[0]
      if (extracted) {
	 data.e = $(extracted).closest($.iom.pid)
	 data.id = addr[1]
	 $.to('post', data)
         $.to('post ok', data)
      } else {
         if (data.post) {
            data.wtf = $.i18n.err.post404
            return $.to('fail', data)
         } else {
            data.post = 1
            return $.to('/r/ cache', data)
         }
      }
   })

   $.on(
      'cache ok',
      function (data) {
         if (data.post) {
            data.ctx = data.e
            $.to('/r/ post', data)
            return null
         }
         return data
      })

})(jQuery);(function($) {

   $.on(
      'save page',
      function (data) {
         sat.start()
         return data
      })

   $.on(
      '/r/ actions',
      function (data) {
         data.push('<option name="save page">Сохранить страницу с картинками</option>')
         return data
      })

   var sat = {

      last_id: false,

      failed: [],

      cache: [],

      log: function(url, res, id) {

         var l;

         l = document.createElement('div');
         l.innerHTML = (res ? 'OK ' : '!!') + ' - ' + url;
         var s = l.style;
         s.textAlign = 'left';
         s.color = (res) ? 'black' : 'red';
         s.background = 'white';
         s.padding = '5px;';
         s.fontSize = '12px';
         document.body.appendChild(l);
         scrollTo(0, document.body.offsetHeight);

      },

      callback: function (url, res, id) {

         sat.log(url, res, id);

         if (!res) {
            sat.failed[url] = 1;
         }


         if (id === sat.last_id) {
            alert('Done! Pull the plug, turn off the modem, disable wireless and go read offline');
            sat.mark();
         }

      },

      mark: function() {

         for (var i = 0, max = links.length; i < max; i++) {

            if (sat.failed[links[i].href]) {
               links[i].style.textDecoration = 'line-through';
            }

         }

      },

      start: function () {

         var factory = null;

         if (typeof GearsFactory != 'undefined') {
            factory = new GearsFactory();
         } else {
            // IE
            try {
               factory = new ActiveXObject('Gears.Factory');
               // privateSetGlobalObject is only required and supported on IE Mobile on
               // WinCE.
               if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
                  factory.privateSetGlobalObject(this);
               }
            } catch (e) {
               // Safari
               if ((typeof navigator.mimeTypes != 'undefined')
                   && navigator.mimeTypes["application/x-googlegears"]) {
                  factory = document.createElement("object");
                  factory.style.display = "none";
                  factory.width = 0;
                  factory.height = 0;
                  factory.type = "application/x-googlegears";
                  document.documentElement.appendChild(factory);
               }
            }
         }

         var srv = factory.create('beta.localserver', '1.0');

         var store_name = document.location.href.toString().replace(/\W/g,'');

         srv.removeStore(store_name);
         srv.openStore(store_name);

         var store = srv.createStore(store_name);

         $('img').each(function () {
            if (sat.cache[this.src]) {
               return;
            }

            sat.cache[this.src] = 1;

            try{
               sat.last_id = store.capture(this.src, sat.callback);
            } catch (e){
               sat.failed[this.src] = 1;
               sat.log(this.src, false);
            }
         })
            }
   }

})(jQuery);;(function ($) {

   /*
    *  Base64 encode / decode
    *  http://www.webtoolkit.info/
    */

   var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+="

   function b64encode (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = _utf8_encode(input);

      while (i < input.length) {

         chr1 = input.charCodeAt(i++);
         chr2 = input.charCodeAt(i++);
         chr3 = input.charCodeAt(i++);

         enc1 = chr1 >> 2;
         enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
         enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
         enc4 = chr3 & 63;

         if (isNaN(chr2)) {
            enc3 = enc4 = 64;
         } else if (isNaN(chr3)) {
            enc4 = 64;
         }

         output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

      }

      return output;
   }

   function b64decode (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < input.length) {

         enc1 = _keyStr.indexOf(input.charAt(i++));
         enc2 = _keyStr.indexOf(input.charAt(i++));
         enc3 = _keyStr.indexOf(input.charAt(i++));
         enc4 = _keyStr.indexOf(input.charAt(i++));

         chr1 = (enc1 << 2) | (enc2 >> 4);
         chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
         chr3 = ((enc3 & 3) << 6) | enc4;

         output = output + String.fromCharCode(chr1);

         if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
         }
         if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
         }

      }

      output = _utf8_decode(output);

      return output.replace(/\0/g,'');

   }

   function _utf8_encode (string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {

         var c = string.charCodeAt(n);

         if (c < 128) {
            utftext += String.fromCharCode(c);
         }
         else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
         }
         else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
         }

      }

      return utftext;
   }

   // private method for UTF-8 decoding
   function _utf8_decode (utftext) {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;

      while ( i < utftext.length ) {

         c = utftext.charCodeAt(i);

         if (c < 128) {
            string += String.fromCharCode(c);
            i++;
         }
         else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
         }
         else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
         }
      }
      return string;
   }

   /* Cookies */

   function getCookie(cName)
   {
      if (document.cookie.length>0)
      {
         cStart=document.cookie.indexOf(cName + "=");
         if (cStart!=-1)
         {
            cStart=cStart + cName.length+1;
            cEnd=document.cookie.indexOf(";",cStart);
            if (cEnd == -1)
               cEnd=document.cookie.length
            return document.cookie.substring(cStart,cEnd);
         }
      }
      return "";
   }

   function setCookie(cName, value, path, expireDays)
   {
      var expDate = new Date()
      expDate.setDate(expDate.getDate() + expireDays);
      document.cookie=cName+ "=" + value +
         (path ? "; path=" + path : "") +
         (!value | expireDays ? "; expires=" + (value ? expDate.toGMTString() : "Thu, 01 Jan 1970 00:00:00 GMT") : "")
   }

   var storage = {}

   function setVal(name, value, local) {
      var path = local ? location.pathname : '/'
      if (storage) {
         storage.setItem(name + path, value)
      } else {
         var oldVal = getCookie(name)
         setCookie(name, b64encode(value), path, 9000)
         if (document.cookie.length > 4096) {
            $.to('fail', {wtf: $.i18n.err.cookiesFull})
            setCookie(name, oldVal, path, 9000)
         }
      }
   }

   function getVal(name) {
      if (storage) {
         var ret = storage.getItem(name + '/')
         if (!ret) {
            ret = storage.getItem(name + location.pathname)
         }
         return ret
      } else {
         return b64decode(getCookie(name))
      }
   }

	function encodeVal (val) {
		var raw = []
		for (i in val) {
            raw.push(i)
				try {
					raw.push(val[i].replace(/\|/g, '&#666;'))
				} catch (err) {
					raw.push(val[i])
				}
         }
		return raw ? raw.join('|') : null
	}

	function parseVal (val) {
		var retVal = {}
		var raw = []
		
		try {
         raw = val.split('|')
      } catch (e) { raw = [] }

		for (var j = 0; j < raw.length; j += 2) {
         if (raw[j] && raw[j + 1] != undefined)
				retVal[raw[j]] = raw[j + 1].replace(/\&#666;/g, '|')
			if (retVal[raw[j]] == 'false')
				retVal[raw[j]] = false
      }
		return retVal
	}

	var loadedCfg = {};

   $.on(
      'load config',
      function (data) {
         try {
				if ((typeof localStorage === 'object') && (localStorage != null)) {
					var dummy = localStorage.getItem
					storage = localStorage
				} else {
					storage = globalStorage[location.hostname]
				}
         } catch (e) { storage = null}
			$.bookmarks = parseVal(getVal('penBms'))
			loadedCfg = parseVal(getVal('penCfg'))
			$.to('config', loadedCfg)
      })

	$.on(
		'ready',
		function (data) {
			var cdefs = $.to('custom defaults', {})
			for (var i in cdefs) {
				if(loadedCfg[i])
					delete cdefs[i]
			}
			$.to('config',cdefs)
			return data
		})

   $.on(
      'store config',
      function (data) {
			setVal('penCfg', encodeVal(data.cfg), false)
      })

	$.on(
      'store bmarks',
      function (data) {
			setVal('penBms', encodeVal($.bookmarks), false)
      })

   $.extend({
      mergeCfg: function (global, local) {
         for (var i in local) {
            if (global[i] != undefined)
               local[i] = global[i]
         }
			return local
      },
		diffCfg: function (defaults, cfg) {
			var delta = {}
			for (i in defaults) {
				if (defaults[i] != cfg[i])
					delta[i] = cfg[i]
			}
			return delta
		}
   })

})(jQuery);/* You Tube expansion */
;(function ($) {

	cfg = {handleYTube:true, ytubeSize:'normal'}
	
	$.on(
		'/r/ settings',
		function (data) {
			data.push({group:'', html:'Раскрытие ссылок с ютуба ###<input type="checkbox" name="handleYtube" checked="checked">'})
			return data
		})

	 $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
         return data
      })

   $.on('click',
        function (data) {
           var subj = data.e
			  var e = data.event
           var ytre = /.*?youtube.com\/watch\?v=([\w_\-]*).*/i
           if (e.which == 1 && cfg.handleYTube && subj.is('a') && subj.attr('href').match(ytre)) {
              if (!subj.attr('unfolden')) {
                 var ytSize = ({little: 'width="320" height="265"',
                                normal: 'width="480" height="385"',
                                big: 'width="640" height="505"'})[cfg.ytubeSize]
                 var isAutoplay = db.cfg.ytubeAutorun ? '&autoplay=1' : ''
                 subj.before($(subj.attr('href').replace(ytre,'<span id="'+"$1"+'"><object '+ytSize+'><param name="movie" value="http://www.youtube.com/v/'+"$1"+isAutoplay+'"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+"$1"+isAutoplay+'" type="application/x-shockwave-flash" wmode="transparent" '+ytSize+'></embed></object><br /></span>')))
                 subj.attr('unfolden','1')
              } else {
                 subj.removeAttr('unfolden')
                 $('#'+subj.attr('href').replace(ytre, "$1")).remove()
              }
              return null
           }
           return data
        })
})(jQuery);;(function ($) {

	var cfg = {conSz:250}
	
	var console = null
	
	$.on(
		'toggle console',
		function (data) {
			if (!console) {
				console = $(
					'<div class="reply" style="position:fixed;top:0;left:0;width:100%;">'
						+ '<div id="penCon" style="overflow:auto;width:100%;height:'+cfg.conSz+'px"><pre>' + $.log + '</pre><span id="penConAnc"> </span></div><br />' 
						+ '<input style="width:100%;" /></div>')
				$('body').prepend(console)
			} else {
				console.toggle()
				if (console.is(':visible')) {
					console.find('pre').text($.log)
					var div = $('#penCon')[0]
					div.scrollTop = div.scrollHeight
				}
			}
			return data
		})

	$.on(
		'/r/ actions',
		function (data) {
			data.push('<option name="toggle console">Консоль</option>')
			return data
		})

})(jQuery);;(function ($) {

	/* Window management */
	var currWnd = null
	var currMenu = null
	var oldTitle = ''
	var showForm = true

	$.on(
		'window',
		function (data) {
			$.isInWindow = $.isInWindow || true
			if (!currWnd)
				oldTitle = $('div.logo').text()
			if (currWnd)
				currWnd.remove()
			showForm = $($.iom.postform).is(':visible')
			$($.iom.mainWrap).hide()
			$($.iom.postform).hide()
			$($.iom.logo).text(data.title)
			if (data.hasSearch)
				$($.iom.logo).append('<input style="float:right;margin-top:0.7em;" size="37" id="search">')
			currWnd = data.body
			$($.iom.mainWrap).before(currWnd)
			$.to('update main menu',1)
			return data
		})

	$.on(
		'close window',
		function (data) {
			if (currWnd)
				currWnd.remove()
			$($.iom.logo).text(oldTitle)
			$($.iom.mainWrap).show()
			if (showForm)
				$($.iom.postform).show()
			currWnd = null
			$.isInWindow = false
			$.to('update main menu',1)
			return data
		})
})(jQuery);;(function ($) {

   var cfg = {alInt:60, alHl: true, alThrd:true, alIdx: false}

   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
	 return data
      })

   var oldTitle = null
   var newposts = 0

   $.on(
      '/r/ settings',
      function (data) {
         data.push(
	    {group:'Автодействие', html:'<!--1-->Включить в тредах###<input reloadable="true" type="checkbox" name="alThrd" checked="checked">'},
	    {group:'Автодействие', html:'<!--2-->Включить в индексе###<input reloadable="true" type="checkbox" name="alIdx">'},
            {group:'Автодействие', html:'<!--3-->Интервал автодействия###<input reloadable="true" name="alInt" value="60">'},
            {group:'Автодействие', html:'<!--4-->Подсвечивать загруженные сообщения###<input reloadable="true" type="checkbox" name="alHl" checked="checked">'})
         return data
      })


   var handle = null

   $.on(
      'css',
      function (data) {
         if (!data.resetNative) {
            data.css += '.autoloaded {border: 2px dashed #EE6600;border-right:none; border-top:none; border-bottom: none;} '
         }
         return data
      })

   $.on(
      'domready',
      function (data) {
	 if ($.isInThread && !cfg.alThrd) 
	    return data
	 if (!$.isInThread && !cfg.alIdx) 
	    return data

         handle = setInterval(function () {
            if ($.isInWindow == 'bookmarks') {
               $($.iom.tid+':visible').each(
		  function () {
		     var tid = $(this).find('a[name]:first').attr('name')
		     $.to('/r/ cache', {force: true, href: $.fixHref($.turl(tid)), autoload: 1})
		  })
            } else {
	       $.to('/r/ cache', {force: true, href: location.pathname, autoload: 1})
            }
         }, cfg.alInt*1000)
         return data
      })

   $.on(
      'cache ok',
      function (data) {
         if (data.autoload) {
            var na = data.e[0].getElementsByTagName('A')
            var a = document.getElementsByTagName('A')
            var aindex={}, naindex={}
            for (var i=0; i < a.length;i++) {
               if (a[i].name)
                  aindex[a[i].name] = a[i]
            }
            for (var i=0; i < na.length;i++) {
               if (na[i].name)
                  naindex[na[i].name] = na[i]
            }
            var previ = null;
            for (i in naindex) {
               if (!aindex[i] && previ) {
                  var cloned = $(naindex[i]).closest($.iom.pid).clone().addClass(cfg.alHl ? 'autoloaded' : '')
                  $.to('post', {e:cloned})
                  $('a[name='+previ+']').closest($.iom.pid).after(cloned)
                  newposts++
               }
               previ = aindex[i] ? i : null
            }
            if (newposts) {
               oldTitle = oldTitle || $('title').text()
               $('title').text('*' + newposts + ' ' + oldTitle)
            }
         }
         return data
      })

   $.on(
      'dblclick',
      function (data) {
         $('.autoloaded').removeClass('autoloaded')
         newposts = 0
         $('title').text(oldTitle)
         return data
      })

})(jQuery);/* Different unfolding functions */
;(function ($) {

   var cfg = {useAJAX: true}

   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
         return data
      })

   /* Expand cutted posts */
   $.on('click',
        function (data) {
           var subj = data.e
           if (subj.closest($.iom.post.abbr).length > 0) {
              data.uncut = subj.closest($.iom.post.wholemessage)
              data.href = $.fixHref(subj.attr('href'))
              $.to('/r/ cache', data)
              return null
           }
           return data
        })

   $.on('cache ok',
        function (data) {
           if (data.uncut) {
				  var addr = data.href.split('#')
				  data.uncut.replaceWith(
                 data.e.find('a[name='+addr[1]+']').closest($.iom.pid).find($.iom.post.message).clone()
              )
              return null
           }
			  if (data.unfold) {
				  var addr = data.href.split('#')
				  var ih1 = $('a[name='+addr[1]+']').closest($.iom.tid)[0]
				  var ih2 = data.e.find('a[name='+addr[1]+']').closest($.iom.tid)[0]
				  $.processPage(ih2, {postmsg:'post'})
				  var t = ih1.innerHTML
				  ih1.innerHTML = ih2.innerHTML
				  ih2.innerHTML = t
              return null
           }
           return data
        })

   $.on('fold thread',
        function (data) {
           data.href = $.fixHref(data.e.attr('param'))
			  data.unfold = 1
           $.to('/r/ cache', data)
           return data
        })

	$.on('thread menu',
		  function (data) {
			  var unfBtn = ['<!--2-->' + $.i18n.unfold, 'fold thread', data.turl]
			  var fBtn = ['<!--2-->' + $.i18n.fold, 'fold thread', data.turl]
			  if (data.flags.moar | $.locked) {
              data.menu.push($.locked ? fBtn : unfBtn)
				  data.menu2.push($.locked ? fBtn : unfBtn)
			  }
			  return data
		  })

})(jQuery);;(function ($) {
   /**
    * @module preview
    * @title  Превью сообщений
    * @descr  Генерация превью сообщений при наведении на ссылку (раньше
    * называлось intelliSense).
    * @depends jquery kernel evproxy cache posts
    *
    * TODO: Обрабатываемые события, быстродействие, геометрия.
    */

   var cfg = {raiseDelay: 100, fallDelay: 100, hlPreviews: true}

   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
         return data
      })

   function showPreview(what, x, y) {
      if (document.body.clientWidth - x < 420) {
         x = document.body.clientWidth - 500
      }
      what.attr(
         'style',
         'position:absolute; top:' + y +
               'px; left:' + x +
               'px; max-width: ' + (document.body.clientWidth - x - 10) + 'px').
            appendTo('body')
   }

   $.on(
      'post ok',
      function (data) {
         if (data.preview) {
            $('.penPreviewTmp').remove()
            var cloned = data.e.postPreview().clone()
            cloned.addClass('penPreview ' + $.iom.css.preview)
            if (cfg.hlPreviews) {
               cloned.addClass($.iom.css.highlight)
            }
            showPreview(
               cloned,
               data.preview.x,
               data.preview.y)
            return null
         }
         return data
      })

   var t = null

   $.on(
      'mouseover',
      function (data) {
         var subj = $(data.e)
         if (subj[0].tagName && subj[0].tagName == 'A' &&
             subj.is('a:contains("' + $.iom.ref +'")')) {
            clearTimeout(t)
            t = setTimeout(
               function () {
                  $.to('/r/ post', {href: subj.attr('href'), ctx: document,
                                    preview: {x: data.event.pageX, y: data.event.pageY}})
               }, cfg.raiseDelay)
            data.event.stopPropagation()
            return null
         } if (subj.closest('.penPreview').length) {
            clearTimeout(t)
         } else {
            return data
         }
      })

   $.on(
      'mouseout',
      function (data) {
         var subj = $(data.e)
         if ((subj[0] && subj[0].tagName == 'A' &&
              subj.is('a:contains("' + $.iom.ref + '")'))
             || subj.closest('.penPreview').length) {
            clearTimeout(t)
            t = setTimeout(
               function () {
                  $('.penPreview, .penPreviewTmp').remove()
               }, cfg.fallDelay)
            data.event.stopPropagation()
            return false
         } else {
            return data
         }
      })

})(jQuery);;(function ($) {

   var cfg = {constPwd:'', citeInTitle:true, ttlCiteLen: 40, thrdMenu: true,
              pstsHide:true, imgsSrc:true, thrdHide: true,
              thrdUnfold: true, bmarks: true, thrdMenuDouble:true,
              fwdRefs:true}


   $.on(
      '/r/ settings',
      function (data) {
         data.push({group:'Форма ответа', html:'Постоянный пароль ###<input name="constPwd">'})
         return data
      })

   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
         return data
      })

   $.on(
      'domready',
      function (data) {
         if ($.locked)
            return data

         document.addEventListener(
            'click',
            function (e) {
               var ret = $.to('click', {e:$(e.target), event:e})
               if (!ret) {
                  e.preventDefault()
                  e.stopPropagation()
               }
               return ret
            }, true)

         document.addEventListener(
            'dblclick',
            function (e) {
               var ret = $.to('dblclick', {e:$(e.target), event:e})
               if (!ret) {
                  e.preventDefault()
                  e.stopPropagation()
               }
               return ret
            }, true)

         var evOver =
               function (e) {
                  var rval =  $.to('mouseover', {e:e.target, event:e})
                  if (rval && rval.event) {
                     return e
                  } else {
                     return rval
                  }
               }
         var evOut =
               function (e) {
                  var rval = $.to('mouseout', {e:e.target, event:e})
                  if (rval && rval.event)
                     return rval.event
                  else
                     return rval
               }

         if (!document.addEventListener) {
            document.attachEvent('onmouseover', evOver)
            document.attachEvent('onmouseout', evOut)
         } else {
            document.addEventListener('mouseover', evOver, true)
            document.addEventListener('mouseout', evOut, true)
         }

         $.on('click',
              function (data) {
                 if (data.e.attr('msg')) {
                    return $.to(data.e.attr('msg'), data)
                 }
                 return data
              }, true)

         if(cfg.constPwd) {
            $(document).find($.iom.form.password).val(cfg.constPwd)
         }

         $.to('update main menu',1)

         if($.isInThread) {
            if (cfg.citeInTitle) {
               document.title += ' — ' + $.ui.threadCite('delform', cfg.ttlCiteLen - 1)
            }
            if (cfg.thrdMenu) {
               data.e.find('hr:first').next('a:first').after (
                  $.ui.multiLink([
                     [$.i18n.imgs.unfold, 'fold images'],
                     [$.i18n.imgLess.hide, 'hide imageless'],
                     [$.i18n.citeLess.hide, 'hide citeless']
                  ], ' / ', '')
               )
            }
         }
         return data
      }, true)

   /* Самоблокировка для того, чтобы обработчики 'post' не
      применялись бы к одному и тому же сообщению два раза. */
   $.on(
      'post',
      function (data) {
         if (data.e.attr('locked'))
            return null
         data.e.attr('locked', 'yes')
         return data
      },true)

   $.on(
      'post',
      function (data) {
         /* Thread menu processing */
         if (!data.isOp)
            return data
         var thrd = data.e.closest($.iom.tid)
         var turl = $.turl(data.id)
         var tflags = {all:1}
         var trm = data.e.find($.iom.thread.menu)
         var moar = thrd.find($.iom.thread.moar)
         if (moar.length) {
            moar[0].innerHTML = moar[0].textContent.replace(/\..*$/,'.')
            tflags['moar']=1
         }
         if (!trm.length) {
            data.e.find($.iom.thread.ref).after('&nbsp; [<a/>]')
            trm = data.e.find($.iom.thread.ref).next('a')
         }

         var tmenu = $.to('thread menu', {menu:[], menu2: [], flags: tflags, turl:turl})

         trm.replaceWith($.ui.multiLink(tmenu.menu.sort(), '', ''))
         if (cfg.thrdMenuDouble && !$.isInThread) {
            if (moar.length) {
               moar = moar.clone()
            } else {
               moar = $('<span class="omittedposts">')
            }
            moar.append(' '+$.ui.multiLink(tmenu.menu2.sort()))
            thrd.find($.iom.thread.eot).after(moar)
         }
         return data
      })

   $.on(
      ['post', 'update refmap'],
      function (data) {
         /* Forward references */
         if (data.href) {
            var url = data.href.split('#')[0]
         } else {
            var url = location.protocol + '//' + location.hostname + location.pathname
         }
         if (cfg.fwdRefs && $.refmap[data.id]) {
            var r = [];
            for (j in $.refmap[data.id]) {
               r.push($.ui.anchor(url + '#' + j))
            }
            data.e.find($.iom.post.message).prepend($.ui.refs(r.join(', ')))
         }
         return data
      })

   $.on(
      'post',
      function (data) {
         /* Hide buttons */
         if (cfg.pstsHide)
            data.e.find($.iom.post.ref).
               append(' '+$.ui.msg($.i18n.hidePost,'toggle post'))
         return data
      })

   $.on('loaded',
        function (data) {
           $.locked = true
           return data
        })

   $.on(
      '/r/ actions',
      function (data) {
         data.push('<option name="refresh-frame">Обновить фрейм</option>')
         return data
      })

   $.on(
      'refresh-frame',
      function (data) {
         data.event.preventDefault()
         data.event.stopPropagation()
         document.location.reload()
         return false
      })

})(jQuery);;(function ($) {

   var cfg = {bmCiteLen: 45, bmPostNum: 10}

   function generateBookmarks (blist) {
      function selChk (url) {
         return '<td width="32"><input type="checkbox" class="penSel" param="'+url+'"> </td>'
      }
      blist.sort()
      var htmlOut = '<table id="penBookmarks" width="100%"><tbody>'
      var lastBoard = ''
      for (var i = 0; i < blist.length; i++) {
         var bt = $.parseURL(blist[i][0])
         if (bt.board != lastBoard) {
            lastBoard = bt.board
            htmlOut += '<tr class="pen1"><td colspan="2"><h3>/' + bt.board + '/</h3></td></tr>'
         }
         htmlOut += '<tr class="pen2">' + selChk(blist[i][0]) + '<td>' + $.ui.anchor(blist[i][0]) + ' ' + blist[i][1] + '</td></tr>'
      }
      htmlOut += '</tbody></table>'
      return htmlOut
   }

   function fixButton (url) {
      $('a[msg="toggle bmark"][param="' + url + '"]').text($.bookmarks[url] ? $.i18n.fromBms : $.i18n.toBms)
   }

   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
         return data
      })

   $.on(
      'main menu',
      function (data) {
         if ($.isInWindow != 'bookmarks') {
            for (var i in $.bookmarks) {
               data.push(['<!--2-->' + $.i18n.bookmarks, 'bookmarks'])
               break
            }
         }
         return data
      })

   $.on(
      'thread menu',
      function (data) {
         var bmBtn = ['<!--3-->' +
                      ($.bookmarks[data.turl] ? $.i18n.fromBms : $.i18n.toBms),
                      'toggle bmark', data.turl]
         data.menu.push(bmBtn)
         data.menu2.push(bmBtn)
         return data
      })

   $.on(
      'toggle bmark',
      function (data) {
         var url = data.e.attr('param')
         if ($.bookmarks[url]) {
            delete $.bookmarks[url]
            var row = $('input[param="' + url + '"]').closest('tr')
            row.next('tr.threadWrap').remove()
            row.remove()
         } else {
            $.bookmarks[url] = ' '+$.ui.threadCite($.urltid(url), cfg.bmCiteLen)
         }
         fixButton(url)
         $.to('update main menu',1)
         $.to('store bmarks', 1)
         return data
      })

   $.on(
      'bookmarks',
      function (data) {
         $.isInWindow = 'bookmarks'
         var menu = '<div style="float:left">' +
               '<button msg="select all">Выделить всё</button>&nbsp;&nbsp;' +
               ' С выделенным: ' +
               '<button msg="rm bookmarks">Удалить</button> ' +
               '<button msg="chk bookmarks">Проверить</button> ' +
               '<button msg="load bookmarks">Загрузить</button> ' +
               '</div>' +
               '<div style="float:right">' +
               $.ui.multiLink([[$.i18n.close, 'close window']]) +
               '</div><br clear="both" /> <hr />'
         var blist = []
         for (i in $.bookmarks) {
            blist.push([i, $.bookmarks[i]])
         }
         var body = $(menu + generateBookmarks(blist) + '<br clear="both"/>')
         $.to('window', {title:$.i18n.bookmarksTitle, body:body, hasSearch:true})
         $('.pen2:odd').addClass('penOdd')
         return data
      })

   $.on(
      'rm bookmarks',
      function (data) {
         $('input.penSel:checked').each(
            function () {
               $.to('toggle bmark', {e: $(this)})
            });
         $('.pen2:odd').addClass('penOdd')
         $('.pen2:even').removeClass('penOdd')
         $.to('store bmarks', 1)
         return data
      })

   $.on(
      'chk bookmarks',
      function (data) {
         $('input.penSel:checked').each(
            function () {
               $.to('/r/ cache', {
                  force: 1,bmark:$(this).closest('tr'),
                  href: $(this).attr('param')})
            });
         $('.pen2:odd').addClass('penOdd')
         $('.pen2:even').removeClass('penOdd')
         $.to('store bmarks', 1)
         return data
      })

   $.on('fail',
        function (data) {
           if (data.bmark) {
              data.bmark.remove()
              delete $.bookmarks[data.href]
              $.to('store bmarks', 1)
              return null
           }
           return data
        }, true)

   $.on(
      'load bookmarks',
      function (data) {
         $('input.penSel:checked').each(
            function () {
               var subj = $(this).closest('tr')
               subj.addClass($.iom.css.header)
               var wrap = $('<tr class="thread threadWrap"><td colspan="2"></td></tr>')
               subj.after(wrap)
               $.to('/r/ cache', {
                  force: 1, loaded: cfg.bmPostNum, bmark: wrap.find('td'),
                  href: $(this).attr('param')})
            });
         return data
      })

   $.on(
      'cache ok',
      function (data) {
         if (data.bmark && data.loaded) {
            data.e.find($.iom.pid).each(
               function () {
                  if (data.loaded > 1) {
                     data.bmark.append($(this))
                     data.loaded--
                  }
                  if ($(this).is('.oppost')) {
                     data.bmark.prepend($(this))
                  }
               });
         }
         return data
      })

})(jQuery);;(function ($) {

	var cfg = {mnFlt: false}

   $.on(
      'config',
      function (data) {
			cfg = $.mergeCfg(data, cfg)
			return data
		})

	$.on(
		'domready',
		function (data) {
			if (cfg.mnFlt)
				$($.iom.topmenu).
				attr('style','position:fixed;padding:3px;').
				addClass($.iom.css.bordered).
				next().css('padding-top','3em')
			return data
		})

	   $.on(
      '/r/ settings',
      function (data) {
         data.push({group:'', html:'<!--3-->Плавающее меню###<input reloadable="true" type="checkbox" name="mnFlt">'})
         return data
      })

	$.on(
		'update main menu',
		function (data) {
			var items = $.ui.multiLink($.to('main menu', []).sort(), '', '')
			var subj = $('#penMainMenu')
			if (!subj.length) {
				subj = $('<span id="penMainMenu">')
				$($.iom.menu).after(subj)
			}
			subj.html(items)
		})

})(jQuery);;(function ($) {
	
	var cfg = {hKeys:'F5=refresh-frame'}

	   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
         return data
      })

   $.on(
      '/r/ settings',
      function (data) {
			var actions = $.to('/r/ actions', ['<option> - </option>'])
			var keys = cfg.hKeys.split('=')
			var rows = []
			for (i = 0; i < keys.length; i+=2) {
				var k = keys[i].replace(/^\./,'')
				rows.push('<tr><td><input size="15" value="' + k + '"></td><td align="right" valign="top">&nbsp;<select>'+actions.join('').replace(keys[i+1]+'"', keys[i+1]+'" selected="selected"')+'</select></td></tr>')
			}
			rows.push('<tr><td><input size="15" value=""></td><td align="right" valign="top">&nbsp;<select last="yes">'+actions.join('').replace('option> -', 'option selected="selected"> -')+'</select></td></tr>')
         data.push({group:'<span fine="ok"/>Клавиатурные сокращения', html:'<span fine="ok"><table width="100%" class="penHotkeys"><tbody>'+rows.join('')+'</tbody></table>'})
         return data
      })

	$.on(
		'collect settings',
		function (data) {
			var out = []
			$('table.penHotkeys tr').each(
				function () {
					var key = $(this).find('input').val().replace(' ','')
					var act = $(this).find('[selected]').attr('name')
					if (key && act) {
						out.push(key,act)
					}
				})
				data['hKeys'] = out.join('=')
			return data
		})

	$.on(
		'click',
		function (data) {
			if (data.e.is('select[last]')) {
				var n = data.e.closest('tr').clone()
				data.e.removeAttr('last')
				n.find('input').val(' ')
				data.e.closest('tr').after(n)
			}
			return data
		})

	$.on(
		'domready',
		function (data) {
			var keys = cfg.hKeys.split('=')
			var wnd = $(window)
			for (i = 0; i < keys.length; i+=2) {
				var toe = keys[i+1]
				wnd.bind(
            'keydown',
					{combi:keys[i].toLowerCase(), disableInInput: !toe.match(/^\./)},
					function (e) {
						return $.to(toe, {event:e})
            })
			}  
			return data
      })
})(jQuery);;(function ($) {

   var cfg = {imgsUnfold: true, fitImgs:false, hlImgs: true}

	$.on(
		'/r/ settings',
		function (data) {
			data.push({group:'', html:'<span/>Развертывание изображений <span fine="true"><br />&nbsp; &nbsp; Подсвечивать развернутые <input type="checkbox" name="hlImgs" checked="checked">, Подгонять по ширине <input type="checkbox" name="fitImgs" ></span>###<input type="checkbox" name="imgsUnfold" checked="checked">'})
			return data
		})

   function testThumb (subj) {
      return subj.is('img')
         && ({jpeg:1,jpg:1,png:1,gif:1,tiff:1,bmp:1})
      [subj.closest('[href]').attr('href').
       replace(/^.*\.(\w+)$/,'$1').toLowerCase()]
   }

   function prepareFull (subj) {
      return '<img src="' + subj.closest('[href]').attr('href') + '" ' +
         'style="min-width:' + subj.attr('width') + 'px;' +
         'min-height:' + subj.attr('height') + 'px;" ' +
         'class="' + $.iom.css.unfolded + '" >'
   }

   function toggleFull (subj) {
      if (!subj.attr('altimg'))
         var t = prepareFull(subj)
      else
         var t = subj.attr('altimg')

      subj.removeAttr('altimg')
      var alt = $(t).attr('altimg', subj.parent().html())
      subj.replaceWith(alt)
   }

	var emitted = false
	
   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
         if (cfg.imgsUnfold && !emitted) {
				
				emitted = true
				
            $.on(
               'click',
               function (data) {
                  if (data.event.which == 1 && testThumb(data.e)) {
                     toggleFull(data.e)
                     return null
                  } else {
                     return data
                  }
               })
			}
         return data
      })
})(jQuery);/** 
 * Reply form 
 *   
 * TODO: Split this file in multiple modules.
 *
 */

;(function ($) {

   var cfg = {idxHide: true, thrdMove: true,
              hideRules: true, hideTitle: false, hideUser: false,
              hideEmail: false, hideGoto: false, hidePasswd: false,
              hideTt: false, frmBtns: true, taResize: true, taHW: '66x12',
              fastReply: true, frMove: false, frFocus: true}

   var emitted = false

   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
         if (cfg.fastReply && !emitted) {

            emitted = true

            $.on(
               'thread menu',
               function (data) {
                  var repBtn = ['<!--4-->' + $.i18n.replyThat, 'reply thread', data.turl]
                  data.menu2.push(repBtn)
                  return data
               })

            $.on(
               ['reply thread'],
               function (data) {
                  $.to('show reply form', {e:data.e, bottom:true, needHide: false})
                  data.e.text(data.e.text() == $.i18n.replyThat ? $.i18n.hideForm : $.i18n.replyThat)
                  return data
               })

            $.on(
               'click',
               function (data) {
                  if (!$.isInThread && $.isPostNum(data.e)) {
                     var subj = data.e.closest($.iom.pid)
                     $.to('show reply form', {e:subj, bottom:cfg.frMove, needHide: true})
                     return null
                  }
                  return data
               })
         }
         return data
      })

   $.on(
      '/r/ settings',
      function (data) {
         data.push(
            {group:'Форма ответа', html:'<!--2-->Скрывать на главной###<input reloadable="true" type="checkbox" checked="checked" name="idxHide">'},
            {group:'Форма ответа', html:'<!--3-->Переносить вниз в треде###<input reloadable="true" type="checkbox" checked="checked" name="thrdMove">'},
            {group:'Форма ответа', html:'<!--5-->Скрывать элементы формы: Правила <input reloadable="true" type="checkbox" checked="checked" name="hideRules"> Тема <input reloadable="true" type="checkbox" name="hideTitle"> Имя <input reloadable="true" type="checkbox" name="hideUser"> Почта <input reloadable="true" type="checkbox" name="hideEmail"> Перейти к <input reloadable="true" type="checkbox" name="hideGoto"> Пароль <input reloadable="true" type="checkbox" name="hidePasswd"> Капча <input reloadable="true" type="checkbox" name="hideTt">'},
            {group:'Форма ответа', html:'<!--4-->Кнопки форматирования###<input reloadable="true" type="checkbox" checked="checked" name="frmBtns">'},
            {group:'Форма ответа', html:'<!--6-->Размер поля ответа###<input reloadable="true" type="checkbox" checked="checked" name="taResize"> <input reloadable="true" name="taHW" value="66x12">'},
            {group:'Форма ответа', html:'<!--1--><span/>Быстрый ответ<br /><span fine="1">&nbsp;&nbsp;Открывать форму быстрого ответа всегда внизу треда <input reloadable="true" type="checkbox" name="frMove"><br />&nbsp;&nbsp;Переносить фокус к форме <input reloadable="true" checked="checked" type="checkbox" name="frFocus"></span>###<input reloadable="true" type="checkbox" checked="checked" name="fastReply">'})
         return data
      })

   $.on(
      'main menu',
      function (data) {
         if (!$.isInThread && !$.isInWindow && cfg.idxHide)
            data.push(['<!--3-->' + $.i18n.createThread, 'toggle form'])
         return data
      })

   var originalForm = null
   var topForm = null

   $.on(
      'domready',
      function (data) {
         if ($.locked)
            return data

         topForm = $($.iom.postform)
         originalForm = topForm.clone(true)

         if (cfg.idxHide) {
            $($.iom.postform).hide()
         } else {
            $.to('tune form', {e:topForm})
         }
         return data
      },true)

   $.on('loaded', function (data) {
      if ($.isInThread && cfg.thrdMove) {
         data.e.find($.iom.tid + ' ' + $.iom.thread.reply).before(topForm)
         $.to('tune form', {e:topForm})
         topForm.show()
      }
      return data
   },true)

   $.on(
      'toggle form',
      function (data) {
         $.to('tune form', {e:topForm})
         topForm.toggle()
         data.e.text(data.e.text() == $.i18n.createThread ? $.i18n.hideForm : $.i18n.createThread)
         return data
      })

   var replyForms = {}

   $.on(
      'hide reply form',
      function (data) {
         replyForms[data.e.attr('param')].hide()
      })

   $.on(
      'show reply form',
      function (data) {
         var tid = data.e.closest($.iom.tid).find('a[name]:first').attr('name')
         if (!replyForms[tid]) {
            replyForms[tid] = originalForm.clone()
            $.to('tune form', {e:replyForms[tid].find('form'), parent:tid, needHide:data.needHide})
            replyForms[tid].hide()
         }
         if (data.bottom) {
            data.e.closest($.iom.tid).find($.iom.thread.reply).before(replyForms[tid])
         } else {
            data.e.closest($.iom.pid).after(replyForms[tid])
         }
         replyForms[tid].toggle()
         if (cfg.frFocus) {
            replyForms[tid].find($.iom.form.message)[0].focus()
         }
      })

   $.on(
      'tune form',
      function (data) {
         if (data.e.attr('tuned'))
            return null
         data.e.attr('tuned','1')

	 data.e.submit(
            function (e) {
               var ret = $.to('submit', {e:$(e.target), event:e})
               if (!ret) {
                  e.preventDefault()
                  e.stopPropagation()
               }
               return ret
            })

         if (cfg.hideRules)
            data.e.find($.iom.form.rules).remove()
         if (cfg.hideTitle)
            data.e.find($.iom.form.title).closest('tr').hide()
         if (cfg.hideUser)
            data.e.find($.iom.form.user).closest('tr').hide()
         if (cfg.hideEmail)
            data.e.find($.iom.form.email).closest('tr').hide()
         if (cfg.hideGoto)
            data.e.find($.iom.form.moveto).closest('tr').hide()
         if (cfg.hidePasswd)
            data.e.find($.iom.form.password).closest('tr').hide()
         if (cfg.hideTt)
            data.e.find($.iom.form.turtest).closest('tr').hide()
         if (cfg.frmBtns)
            data.e.find($.iom.form.message).before($.i18n.formButtons)
         if (cfg.taResize) {
            var rsHW = cfg.taHW.split('x')
            data.e.find($.iom.form.message).
                  attr('rows', rsHW[1]).
                  attr('cols', rsHW[0])
         }
         if (data.needHide) {
            data.e.prepend(
               $('<div style="float:right" />').
                     append(
                        $.ui.multiLink([
                           [$.i18n.hide, 'hide reply form', data.parent]
                        ])))
         }
         return data
      }, true)

   /* Form buttons handlers **/
   $.fn.withSel = function (f) {
      var before, after, selection;
      $(this).each(
         function () {
            if (this.value != '') {
               before = this.value.substring(0, this.selectionStart)
               selection = this.value.substring(this.selectionStart, this.selectionEnd)
               after = this.value.substring(this.selectionEnd, this.value.length)
               this.value = before.concat(f(selection), after)
            }
         })}

   $.on(['.bold','bold'],
        function (data) {
           var subj = data.e ? data.e.closest('form').
                 find($.iom.form.message) : $(document.activeElement)
           subj.withSel(
              function (s) { return '**'+s+'**' }
           )
           return false
        })

   $.on(['.italic','italic'],
        function (data) {
           var subj = data.e ? data.e.closest('form').
                 find($.iom.form.message) : $(document.activeElement)
           subj.withSel(
              function (s) { return '*'+s+'*' }
           )
           return false
        })

   $.on(['.strikeout','strikeout'],
        function (data) {
           var subj = data.e ? data.e.closest('form').
                 find($.iom.form.message) : $(document.activeElement)
           subj.withSel(
              function (s) {
                 var l = s.length
                 for (var i = 0; i < l; i++) {
                    s += '^H'
                 }
                 return s }
           )
           return false
        })

   $.on(['.underline','underline'],
        function (data) {
           var subj = data.e ? data.e.closest('form').
                 find($.iom.form.message) : $(document.activeElement)
           subj.withSel(
              function (s) { return '__'+s+'__' }
           )
           return false
        })

   $.on(['.source code','source code'],
        function (data) {
           var subj = data.e ? data.e.closest('form').
                 find($.iom.form.message) : $(document.activeElement)
           subj.withSel(
              function (s) {
                 if (s.search(/\n/) != -1) {
                    return '      '+s.replace(/\n/g, '\n         ')
                 } else {
                    return '`'+s+'`' } }
           )
           return false
        })

   $.on(['.**CAPSBOLD**','**CAPSBOLD**'],
        function (data) {
           var subj = data.e ? data.e.closest('form').
                 find($.iom.form.message) : $(document.activeElement)
           subj.withSel(
              function (s) { return '**'+s.toUpperCase()+'**' }
           )
           return false
        })

   $.on(['.spoiler','spoiler'],
        function (data) {
           var subj = data.e ? data.e.closest('form').
                 find($.iom.form.message) : $(document.activeElement)
           subj.withSel(
              function (s) { return '%%'+s+'%%' }
           )
           return false
        })

   /* Регистрируем кнопки с горячих клавишах */
   $.on(
      '/r/ actions',
      function (data) {
         data.push(
            '<option name=".bold">Жирный</option>',
            '<option name=".italic">Курсивный</option>',
            '<option name=".underline">Подчеркнутый</option>',
            '<option name=".strikeout">Зачеркнутый</option>',
            '<option name=".spoiler">Спойлер</option>',
            '<option name=".source code">Исходный код</option>',
            '<option name=".**CAPSBOLD**">КАПСБОЛД</option>'
         )
         return data
      })

})(jQuery);
/**
 * AJAX in reply form.
 *
 * @ www.webtoolkit.info/ajax-file-upload.html
 */

;(function ($) {
   
   var cfg = {frmAj: true}

   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
	 return data
      })

   $.on(
      '/r/ settings',
      function (data) {
         data.push(
            {group:'Форма ответа', html:'<!--6-->Ответ без перезагрузки###<input reloadable="true"type="checkbox" name="frmAj" checked="checked" >'})
         return data
      })

   $.on(
      'submit',
      function (data) {
	 if (cfg.frmAj && data.e.find($.iom.form.message).length) {
	    var n = 'f' + Math.floor(Math.random() * 99999)
	    $('body').append(
	       '<iframe style="display:none" src="about:blank" id="' 
		     + n + '" name="' + n + '"></iframe>')
	    var iframe = $('#'+n)
	    data.e.attr('target', n)
	    iframe.bind(
	       'load',
	       function () {
		  var doc = iframe[0].contentDocument
		  var thread = $(doc.body)
		  var errMsg
		  if (errMsg = $.checkErrorPage(thread)) {
		     return $.to('fail', {wtf: errMsg})
		  }
		  $.to('set cache', {e:thread, href:doc.location.href})
		  $.to('/r/ cache', {href:doc.location.href, autoload: 1})
	       })
	 }
	 return data
      })
})(jQuery);/* Перенос фрейма вправо */
;(function ($) {

	var cfg = {fmeMvRight:false, fmeMenuPcn:20}

	$.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
         return data
      })

	$.on(
		'/r/ settings',
		function (data) {
			data.push({group:'', html:'<span/>Переносить фрейм с меню вправо <span fine=1><br />&nbsp;&nbsp;Ширина фрейма с меню  <input reloadable="true" name="fmeMenuPcn" value="20"> %</span>###<input reloadable="true" type="checkbox" name="fmeMvRight">'})
			return data
		})

	$.on(
		'domready',
		function (data) {
			if (cfg.fmeMvRight && $('frameset').length) {
				var main = $('frame[name]')
				var menu = $($('frame')[0])
				var menuSrc = menu.attr('src')
				var mainSrc = main.attr('src')
				menu.attr('name',main.attr('name'))
				main.removeAttr('name')
				main.attr('src', menuSrc)
				menu.attr('src', mainSrc)
				$('frameset').attr('cols', '*,' + cfg.fmeMenuPcn + '%')
				return null
			}
			return data
		},true)

})(jQuery);/* Скрытие элементов по селектору */
;(function ($) {

	var cfg = {censPage:''}

   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
         return data
      })

	$.on(
		'/r/ settings',
		function (data) {
			data.push({group:'Фильтрация', html:'Cкрывать элементы страницы ###<input size="30" name="censPage">'})
			return data
		})

	var censored = null

   $.on(
      'domready',
      function (data) {
			if (cfg.censPage) {
				censored = $(cfg.censPage)
				censored.hide()
			}
			return data
		}, true)

})(jQuery);;(function ($) {

   var cfg = {pstsHide:true, imgsSrc:true, thrdHide: true, hideCiteLen: 40}

	var emitted = false

   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)
         if (cfg.pstsHide && !emitted)
            $.on(
               'post',
               function (data) {
                  data.e.find($.iom.post.ref).
                     append($.ui.msg($.i18n.hidePost,'toggle post'))
                  return data
               })

			if (cfg.thrdHide && !emitted) {
				
				emitted = true
				
				$.on('thread menu',
					  function (data) {
						  var hideBtn = ['<!--1-->' + $.i18n.hide,'toggle thread', data.turl]
						  data.menu.push(hideBtn)
						  data.menu2.push(hideBtn)
						  return data
					  })
			}
         return data
      })

   $.on(
      '/r/ settings',
      function (data) {
         data.push({group:'', html:'Скрытие сообщений ###<input type="checkbox" name="pstsHide" checked="checked">'},
						 {group:'', html:'Скрытие нитей ###<input type="checkbox" name="thrdHide" checked="checked">'})
         return data
      })

   function chktizer (obj, group, isThread, filtered, needSage) {
      links = []
      for (var i = 0; i < group.length; i++) {
         if (isThread) {
            group[i][1] += obj.find($.iom.thread.message).text().slice(0, cfg.hideCiteLen - 1) + '...'
         }
         links.push('<nobr>'+$.ui.anchor(group[i][0])+(group[i][1] ? ' ('+group[i][1]+')':'')+'</nobr>')
      }

      var m1 = (group.length > 1 ? 'я' : 'е')
      var m2 = (group.length > 1 ? 'и' : 'ь')
      var m3 = isThread ? (group.length > 1 ? 'ы' : 'а') : (group.length > 1 ?  'ы' : 'о')

      var txt = (isThread ? 'Нит' + m2 : 'Сообщени' + m1) +
         ' ' + links.join(', ') + ' ' +
         (filtered ? 'отфильтрован' : ' скрыт') + m3 + '.'

      var btns = [
         [(group.length > 1 ? $.i18n.showAll : $.i18n.show), 'restore']
      ]
      if (needSage)
         btns.push([$.i18n.sage, 'sage thread'])

      txt += ' ' + $.ui.multiLink(btns)
		if (obj.prev('#tiz'+group[0][0]).length)
			obj.prev().remove()
      obj.hide().before($.ui.tizer(group[0][0], txt, isThread))
   }

   $.on('restore',
        function (data) {
           var tiz = data.e.closest('[id^=tiz]')
			  var isThread = tiz.attr('thread')
           var subjs = tiz.find('a[href]')
           subjs.each(function () {
              var id = $(this).attr('href').split('#')[1]
              $('a[name='+id+']').closest(isThread ? $.iom.tid : $.iom.pid).show()
           });
           tiz.remove()
        })

   $.on('toggle post',
        function (data) {
           var subj = data.e.closest($.iom.pid)
           var pid = subj.find('a[name]').attr('name')
           chktizer(subj, [[pid,'']], false)
        })

   $.on('toggle thread',
        function (data) {
			  var thrd = data.e.closest($.iom.tid)
           var tid = thrd.find('a[name]:first').attr('name')
           chktizer(thrd, [[tid,'']], true, false, true)
        })

	var hideGroup = null
   var lastHidden = null

   $.on(
      'post',
      function (data) {
         /* Censoring and hiding */
         if (/* db.hidden[data.id] ||*/ data.filtered) {
            data.e.toggle()
            if (!hideGroup)
               hideGroup = []
            hideGroup.push([data.id == 'op' ? data.tid : data.id, data.filtered || 'hide'])
            lastHidden = data.e
         } else if (hideGroup) {
            chktizer(lastHidden, hideGroup, false)
            hideGroup = null
            lastHidden = null
         }
         return data
      })

})(jQuery);;(function ($) {

   cfg = {censEnable: false, censTotal:'(sage|postertrip)', censEntropy: 0, censWndSz: 1000, censWndOfs: 200, censOpEqThrd: false}

	$.on(
		'/r/ settings',
		function (data) {
			data.push(
				{group:'Фильтрация', html:'<!--1-->Включить фильтрацию ###<input reloadable="true" type="checkbox" name="censEnable">'},
				{group:'Фильтрация', html:'<!--2-->Фильтровать по энтропии ###<input reloadable="true" name="censEntropy" value="2.7">'},
				{group:'Фильтрация', html:'<!--3-->Фильтровать по регулярному выражению ###<textarea reloadable="true" name="censTotal" row="3">(sage|postertrip)</textarea>'})
			return data
		})

   /* if (!censored && cfg.censSame) {
      for (i in ent[1]) {
      fw = i; break
      }
      if (!$.saemhash[fw]) {
      $.saemhash[fw] = ent[1]
      $.saemcount[fw] = {orig:pid,c:1}
      } else {
      if(dictCompare(ent[1], $.saemhash[fw], 2, 2)) {
      $.saemcount[fw].c++
      if ($.saemcount[fw].c == db.cfg.censSameMin)
      pushCensored(false, true, [$.saemcount[fw].orig, 'dup'])
      if ($.saemcount[fw].c >= db.cfg.censSameMin) {
      censored = 'dup of '+$.ui.anchor($.saemcount[fw].orig)
      }
      }
      }
      }*/

   function entropy(msg) {
      var dict = {}
      for (var i = 0; i < msg.length; i++) {
         dict[msg[i]] ? dict[msg[i]]++ : dict[msg[i]]=1
      }
      delete dict['']
      var e = 0
      for (i in dict) {
         e -= dict[i]/msg.length * Math.log(dict[i]/msg.length)
      }
      return [e, dict]
   }

   function dictCompare(d1, d2, appError, appError2) {
      var err = 0
      var err2 = 0
      for (i in d1) {
         if (!d2[i])
            err2++
         err += Math.abs(d1[i]-d2[i])
         if (err > appError || err2 > appError2)
            return false
      }
      return true
   }


	var emitted = false

   $.on(
      'config',
      function (data) {
         cfg = $.mergeCfg(data, cfg)

			try {
				var censRe = new RegExp(cfg.censTotal,'i')
			} catch (e) {
				$.to('fail',{wtf: $.i18n.err.regExp})
				var censRe = null
			}

         if (cfg.censEnable && !emitted) {

				emitted = true

            $.on(
               ['post', 'filter'],
               function (data) {

                  delete data.filtered

                  if (data.threadFiltered)
                     return data
						
						var censText = data.e.html()

                  if (!data.filtered && censText && cfg.censTotal && censRe) {
                     if (m = censText.match(censRe)) {
                        data.filtered = 're: ' + m[0].substring(0,11).replace(/<(.|\s)*?>/ig, '')
                     }
                  }

                  if (censText && !data.filtered && cfg.censEntropy && censText.length > cfg.censWndSz) {
                     ma = censText./*substring(cfg.censWndOfs, cfg.censWndOfs+cfg.censWndSz).*/split(/[\s\,\.\!\?]/)
                     var ent = entropy(ma)
                     if (ent[0] < cfg.censEntropy)
                        data.filtered = ('h: ' + ent[0]).substring(0,7)
                  }
						
                  return data
               }, true)
			}
         return data
      })

})(jQuery);/**
 * Статистика. Отображение версии скрипта,
 * времени выполнения основных операций,
 * количества сообщений.
 */
;(function ($) {

	var messagesCount = 0;
	var filteredCount = 0;

   $.timer = {
      time : __startup,
      total : 0,
      init : function() {
         this.time = (new Date()).getTime();
      }, check : function(str) {
         var delta = (new Date()).getTime() - this.time
         this.total += delta;
         this.cache += str + ': ' + delta + 'мсек; ';
         this.time = (new Date()).getTime()
      },
      cache : ''
   }

	$.on('post', function (data) {
		messagesCount++
		if (data.filtered)
			filteredCount++
	})

	$.on('loaded', function (data) {
		$($.iom.thread.header).text(
			$.i18n.totalMsgs + messagesCount + (filteredCount ? $.i18n.totalFilted + filteredCount : '') + '.')
      $.timer.check('penochka sync');
      setTimeout(function() {
         $.timer.check('async queue');
         $($.iom.footer).
            before('<a href="http://userscripts.org/scripts/show/74707" title="version: 3.1.0.1209, ' + $.timer.cache + ' total: ' + $.timer.total + 'ms">Govno 3.1.0 beta 4</a> + ')
      },0)
		return data
	})

	$.on('domready', function (data) {
		$.timer.check('page load')
		return data
	}, true)
})(jQuery);;(function ($) {

   function notify (text, id, highlight) {
      return '<div class="' + $.iom.css.notify + ' '+ (highlight ? $.iom.css.highlight : '') + '" nid="'+id+'">' + text + '</div>'
   }

   $.on('domready',
        function (data) {
           data.e.find('body').prepend(
              '<div id="notifications" style="position:fixed;max-width:400px;">')
           return data
        })

   $.on('notify add',
        function (data) {
           $('#notifications').append(notify(data.wtf, data.nid, data.highlight))
           return data
        })

   $.on('notify rm',
        function (data) {
           $('#notifications div[nid="'+data.nid+'"]').remove()
           return data
        })

   $.on('click',
        function (data) {
           var n = data.e.closest('div[nid]')
           if (n.length) {
              n.remove()
              return null
           }
           return data
        })

   var fid = 0

   $.on(['fail', 'fial'],
        function (data) {
           data.nid = fid++
           data.highlight = true
           $.to('notify add', data)
           setTimeout(function () {
              $.to('notify rm', {nid:data.nid})
           }, 3000)
           return data
        })

})(jQuery);;(function ($) {

	function addStylesheet  (css) {
      var style = document.createElement( 'style' );
      style.type = 'text/css';
      var head = document.getElementsByTagName('head')[0];
      head.appendChild( style );
      if( style.styleSheet )  /* IE */
         style.styleSheet.cssText = css;
      else  /* other browsers */
         style.appendChild( document.createTextNode(css) );
      return style;
   }

	var cfg = {nightTime: '22:00-8:00'}

	var css = ' '
	var resetNative = false

	$.on(
		'config',
		function (data) {
			cfg = $.mergeCfg(data, cfg)
			return data
		})

	$.on(
		'/r/ settings',
		function (data) {
			var styles = $.to('/r/ styles', '<option selected="selected" value="">По умолчанию</option>')
			data.push(
				{group:'Стили', html:'<!--1-->Тема ###<select reloadable="true" name="theme">'+styles+'</select>'},
				{group:'Стили', html:'<!--2-->Ночная тема ###<select reloadable="true" name="ntheme">'+styles+'</select>'},
				{group:'Стили', html:'<!--3--><span fine="true"/>Ночной интервал ###<input reloadable="true" size="12" name="nightTime" value="22:00-8:00">'}
			)
			return data
		})

	$.on(
		'ready',
		function (data) {

			var isNight = true
			var t = new Date
         var thm = cfg.nightTime.match(/(\d+)\D+(\d+)\D+(\d+)\D+(\d+)/)
         if(((thm[3] < t.getHours()) && (thm[1] > t.getHours())) ||
            ((thm[3] == t.getHours()) && (thm[4] < t.getMinutes())) ||
            ((thm[1] == t.getHours()) && (thm[2] > t.getMinutes()))) {
            isNight = false
         }
			var ret = $.to('css', {css:css, isNight:isNight, resetNative:false})
			css = ret.css
			resetNative = ret.resetNative
			return data
		})

	$.on(
		'domready',
		function (data) {
			if (resetNative) {
				$('link[rel=stylesheet]').attr('href', '')
			}
			css && addStylesheet(css)
			return data
		}, true)

})(jQuery);;(function ($) {
	
	var cfg = {theme: '', ntheme: ''}

	var futaba = '.autoloaded { border-left: 2px dashed #EEAA88; } .penOdd {background: #F0E0D6;} #penSettings {padding: 8px} #penSettings .right {float: right} #penSettings span {height: 32px} #penSettings input, #penSettings select {margin-left: 8px; margin-right: 8px} .penLevel1, .penLevel2 {display: block} .penSetting {line-height: 24px;} .penLevel1 {font-size: 16pt; font-weight: bold;} .penLevel2 {padding-left: 2em;}  .penLevel3 {padding-left: 4em;} img {padding: 2px;} #imgcaptcha, .captchaTwin {border: 2px solid #CCC; vertical-align: middle;} blockquote {max-height: 9000px !important} html, body, .content-background { background:#FFFFEE; color:#800000; font: 12pt Serif; } a { color:#0000EE; } a:hover { color:#DD0000; } .logo { clear:both; text-align:center; font-size:2em; color:#800000; width:100%; } .theader, .replymode { background:#E04000; text-align:center; padding:2px; color:#FFFFFF; width:100%; } .postarea { } .rules { font-size:0.7em; } .postblock { background:#EEAA88; color:#800000; font-weight:800; } .footer { text-align:center; font-size:12px; font-family:serif; } .passvalid { background:#EEAA88; text-align:center; width:100%; color:#ffffff; } .dellist { font-weight: bold; text-align:center; } .delbuttons { text-align:center; padding-bottom:4px; } .managehead { background:#AAAA66; color:#400000; padding:0px; } .postlists { background:#FFFFFF; width:100%; padding:0px; color:#800000; } .row1 { background:#EEEECC; color:#800000; } .row2 { background:#DDDDAA; color:#800000; } .unkfunc { background:inherit; color:#789922; } .filesize { text-decoration:none; } .filetitle { background:inherit; font-size:1.2em; color:#CC1105; font-weight:800; } .postername { color:#117743; font-weight:bold; } .postertrip { color:#228854; } .oldpost { color:#CC1105; font-weight:800; } .omittedposts { color:#707070; } .reply { background:#F0E0D6; color:#800000; } .doubledash { vertical-align:top; clear:both; float:left; } .replytitle { font-size: 1.2em; color:#CC1105; font-weight:800; } .commentpostername { color:#117743; font-weight:800; } .thumbnailmsg { font-size: small; color:#800000; } .abbrev { color:#707070; } .highlight { background:#F0E0D6; color:#800000; border: 2px dashed #EEAA88; } .thumb { border: none; float: left; margin: 2px 20px } pre {font-size: 10pt;} .reflink a { color: inherit; text-decoration: none }'

	$.on(
		'config',
		function (data) {
			cfg = $.mergeCfg(data, cfg)
			return data
		})

	$.on(
		'/r/ styles',
		function (data) {
			data+='<option value="futaba">Футаба</option>'
			return data
		})

	$.on(
		'css', 
		function (data) {
			var curr = data.isNight ? cfg.ntheme : cfg.theme
			if (curr == 'futaba') {
				data.css += futaba
				data.resetNative = true
			}
			return data
		})
	
})(jQuery);;(function ($) {
	
	var cfg = {theme: '', ntheme: ''}

	var neutron = '.penOdd {background:#2C2C2C;} blockquote {max-height: 9000px } #penSetttings {padding: 8px} #penSettings .right {float: right} #penSettings span {height: 32px} #penSettings input, #penSettings select {margin-left: 8px; margin-right: 8px} .penLevel1, .penLevel2 {display: block} .penSetting {line-height: 24px} .penLevel1 {font-size: 16pt; font-weight: bold;} .penLevel2 {padding-left: 2em;} .autoloaded {border-left:2px dashed #789922; border-right:none; border-top:none; border-bottom: none;}  .penLevel3 {padding-left: 4em;} #imgcaptcha, .captchaTwin {vertical-align: middle;} html, body, .content-background {	background-color: #212121 ;	color: #698CC0; font-family: "Trebuchet MS",Trebuchet,tahoma,serif ;}img {	padding:2px ;}a {	color: #C9BE89 ;}a:hover {	color: #789922 ;}.adminbar {	clear:both ;	float:right ;	font-size: .8em ;}.adminbar a {	font-weight: bold ;}.logo {	clear:both ;	text-align:left ;	font-size:2em ;	font-weight: bold ;	color:#FFAB3F ;}.reportabuse{color:maroon; float:right; font-size: 8pt; padding:3pt;} .postarea {}.rules {}.postblock {	background:transparent ;	color:#0061AA ;	font-weight:bold ;}.footer {	text-align:center ;	font-size:12px ;	font-family:serif ;	margin: 2em 0 0 0 ;}.dellist {	font-weight: bold ;	text-align:center ;}.delbuttons {	text-align:center ;	padding-bottom:4px ;}.managehead {	background:#2C2C2C ;	color:#6393CD ;}.postlists {	background:#FFFFFF ;	width:100% ;	color:#800000 ;}.row1 {	background:#2C2C2C ;	color:#6393CD ;}.row2 {	background:#575757 ;	color:#6393CD ;}.unkfunc {	background:inherit ;	color:#789922 ;}.reflink {	color:#c9be89;font-size: .8em ;	font-weight: bold ;}.filesize {	background-color:#212121 ;	border: solid 1px #575757 ;	padding:2px ;	-moz-border-radius: 8px ;	-webkit-border-radius: 8px ;	text-decoration:none ;	color: #999999 ;	font-size: .8em ;}.filesize a {	color: #789922 ;}.filetitle {	background:inherit ;	font-size:1.2em ;	color:#3941AC ;	font-weight:bold ;}.postername {	color:#B4B9CD ;	font-weight:bold ;}.postertrip {	color:#AAFFAA ;	font-weight:bold ;}.omittedposts {	color:#999999 ;}.reply {	background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAbCAIAAAAYioOMAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJGgsFKxbP0CkAAAJfSURBVDjLrZXbctswDER3eSfVpv2Q/P9/NalEiRKBPsiWIzvuZaZ45IAHwHIh8fX1FXehClJ7r3U01nrvnfOiAEACIAAFoEpyv+HwEEpCtdZprAtJoHprvHfeB++dwHC/TeqOfKSoKsltbdO80JCgqq5d1t5QGw2CczGGEBKujQAwjwjt2/s4AiD2kpcAoYqtiyr0XNvdyUHo+zh2kWuztwIAone5FO+DXkveUxQw4FzHtm64JRwIDjmmnGmsANRThjnyDLm2eaqLqp4RIFGiKzlb5/aCn02kSlKk13nuIvgsatuW7Yd3LsUQQlRQgdsbXcZTXea5tXWX8+P9wyO9S+9tXhr5MwafYvQ+KA0At9/ZtnVeZn1AnHE8xp+XdWmrd+7l2/fLRCqytqWLHm+B57g9wRiTYhjKoIcuJGOIpN361ruI9C6q51fYZd6t75zNKcWUD40vuhgfcoiq0rcusm1bn2p9ACkJ73wp2fmAD5ZxR56IkLTOOXrqpPrJICXFmIqxFs9ctx8pQOlvY72dKAA15MvXwfpAGlXw7Et3V9Aa8/b+c+/rQHhvX4YvtA7ktQU+3SOSy1zbut5NMZRBDRXkg+QnytV7fapVZN8ANWTJKeUiJPa1ePL87rYqQJ3mrct+4J3NOcWY5fxZe0rZU7bW5uWyisH5YSjOhy5KKH6LuPlFReZl7iLWMKWUcwJtv2j8B8TVL6prW+aleWdLzj5GgPqnKc69ANr7OE0p+FyKdR5/IcRDL6pTnWIIuQw05s6Uf0vZ1pZDMDHpw1/mHyguxMsGfPgo/WsY/I/4BTDId1W3VmE1AAAAAElFTkSuQmCC") right bottom no-repeat ;	background-color:#2C2C2C ;	border: solid 1px #575757 ;	margin: 0 ;	-moz-border-radius: 5px ;	-webkit-border-radius: 5px ;}blockquote {	margin: .5em .5em .5em 1em ;}.reply blockquote {	margin: .5em ;}.doubledash {	display: none ; 	vertical-align:top ;	clear:both ;	float:left ;}.replytitle {	font-size: 1.2em ;	color:#0061AA ;	font-weight:bold ;}.commentpostername {	color:#B4B9CD ;	font-weight:800 ;}.thumbnailmsg {	font-size: .8em ;	color:#999999 ;}hr {	height:3px ;	border-width: 0px ;	background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAADCAYAAAAAyCU4AAAKPWlDQ1BpY2MAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/Dou+7MAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfZCRsTBBr0g3T/AAADdUlEQVRo3u1ZS24aQRB91UAQsizZknfZZJEDZJ+j5CA5Qw6So2SfA2SRTXaWbMmyEAb6ZdHTuKaobgYGRixmJKtrquq9+vQA0y4hiXx9+v5bAODb148CAH8eNwIAnx+mAgCPr1EA4OEmyPMyyXeLIADwsqIAwO1cZLlO8mImstokeT5ty29bCAB8mKAoL9fEbCKy3ibcbCKyjUmehHcZQMi6SLR00wDZxLYOAEhaXdC8mj9zahtJEUmrxtv4QSCRkLw2NrH6IJBN3PcPAgGwy8Pja+5DLY/MASBobFNHsD1pass4sbw5XnO/F8PmVchHy55d/0H3o8DX0jX1VHmdPdnzbXTi5QQg98njL/Vrh1V7qfsnBR4xfdbPIQgRAYUQOLwtrMY5di8flPIhCRGR3AvD68bPMbzatd7as6z0OBAXpVo0vqZT3xkut83F4bC56OfG+tU49OeoGMPG0c7qM170q2BLOeFADqXcNWepT9UYnm+B9x3HiE5Xya+tl46xu/J1thXjeIWLVIzheFtBX4jDU/kqfuwSO0g5F2tT9+zAy0ocHorvcLLEYzlEhF2xXj02d4NnJV9W+rTHEQSIBB1/mvpZyaOoA8rcTD9we7lYjM5R5UrP7sWvxVVy5nJxphZr07xufJUjBQQhFNDivHg2HxZqp4eLRDTPk+WIeg+cOF7NUe+V4vdyjKr3ezrrl3lUTTjEa3QeHyIRFV80fY6VfkW7xxmf6yEZsxwk5e7FcHhbeWWsXne/MEYfCU7D+97rVe+J0RfzSK9l6TncRnIS0qp9s07bVJ3R+d6LzfmOm7gf33Jo3kkQrrdJnk2SvJgJ3raJ58MELMmrTcLNp9KSl+skL2bCl1WSb+cp3+dlekO5WwQ+vib54SawOWOzOWMTAH7++kcA+PvjC+1L4u56enqqvQQWXwoP2E6V+/oeq7uUzzWtQ/gcaxta1xfTl39o36Fx19S/c2EupetrO7fPNa2X9DlFdw7frvIxNnvP4iH5wAGuYjtV7ut7rO5SPte0DuFzrG1oXV9MX/6hfYfGXVP/zoW5lK6v7dw+17Re0ucU3Tl8u8rH2HB/f9/+5/A4QR8n6OMEvbUne77jBH2coKuJ5ThBHyfotUPyOEGHPzU+ha/iN07QO2C9esYJ+jtmnKC3Yo4T9DrHOEEfJ+iDTtD/A6FN40ZmMOX/AAAAAElFTkSuQmCC") center no-repeat ;}table {	border-style: none ;}table td {	border-style: none ;}.nothumb {	background-color: #555555 ;	border-style: dotted ;	margin: .3em .5em ;}.abbrev {	color:#999999 ;}.highlight {	background:#112534 ;	color:#48B0FD ;	border:2px dashed #789922 ;	-moz-border-radius: 5px ;	-webkit-border-radius: 5px ;}p.spoiler > span.warning {	color: #FF6600 ;	font-weight: bolder ;}span.spoiler {	background: #575757 ;	color: #575757 ;}span.spoiler:hover {	color: #48B0FD ;}.theader, .passvalid {	background:#2C2C2C ;	text-align:center ;	padding:2px ;	color:#006AB9 ;	clear: both ;	font-weight: bold ;	margin-bottom: .5em ;	border: solid 1px #575757 ;	-moz-border-radius: 5px ;	-webkit-border-radius: 5px;}.managehead {	padding:0px ;}.postlists {	padding:0px ;}.oldpost, .notabene {	color:#33EEFA ;	font-weight:bold ;}.reply {	padding: 0px ;}dl.menu dt {	background:#111111 ;	border: solid 1px #575757 ;	-moz-border-radius: 5px ;	-webkit-border-radius: 5px;	margin-top: 1em ;	padding-left: .5em ;	cursor: pointer ;}dl.menu dd {	margin-left: .5em ;	padding-left: .5em ;	border-left: solid 1px #575757 ;}dl.menu dd:hover {	background: #575757 ;}dl.menu dd.hidden {	display: none ;} .penBtnBold {width: 24px; background-color: red;}  .thumb { border: none; float: left; margin: 2px 20px } pre {font-size: 10pt;} .reflink a { color: inherit; text-decoration: none }'

	$.on(
		'config',
		function (data) {
			cfg = $.mergeCfg(data, cfg)
			return data
		})

	$.on(
		'/r/ styles',
		function (data) {
			data+='<option value="neutron">Нейтрон</option>'
			return data
		})

	$.on(
		'css', 
		function (data) {
			var curr = data.isNight ? cfg.ntheme : cfg.theme
			if (curr == 'neutron') {
				data.css += neutron
				data.resetNative = true
			}
			return data
		})
	
})(jQuery);;(function ($) {

	var cfg = {coarse: true}

	$.on(
		'main menu',
		function (data) {
			if ($.isInWindow != 'settings')
				data.push(['<!--1-->' + $.i18n.settings, 'settings'])
			return data
		})

	/* Обработка Грубо/Точно */
	function fineCoarse (isCoarse) {
		$('#penSettings *[fine]').each(function () {
			var subj = $(this)
			if (!subj.prev().length)
				subj = subj.closest('tr')
			isCoarse ? subj.hide() : subj.show()
		})
			}

	$.on('settings fine',
		  function (data) {
			  cfg.coarse = false
			  fineCoarse(cfg.coarse)
			  return data
		  })

	$.on('settings coarse',
		  function (data) {
			  cfg.coarse = true
			  fineCoarse(cfg.coarse)
			  return data
		  })


	/* Умолчания */
	var defaults = {};
	/* Загруженный из кук или локального сторожа конфиг */
	var loaded = {};
	/* Те настройки, изменение которых требует
		перегрузки страницы. */
	var reloadable = {};

	function generateSettings (settingsList) {
		var groups = {}
		var gkeys = []
		for (var i = 0; i < settingsList.length; i++) {
			var curr = settingsList[i]
			if (!curr.group)
				curr.group = ''
			if (!groups[curr.group])
				groups[curr.group] = [curr.html]
			else
				groups[curr.group].push(curr.html)
		}
		for (i in groups) {
			gkeys.push(i)
		}
		gkeys.sort()
		var htmlOut = '<table id="penSettings" width="100%"><tbody>'
		var selChk = '<td width="32"><input type="checkbox" class="penSel"> </td>'
		for (var i = 0; i < gkeys.length; i++) {
			var curr = groups[gkeys[i]]
			if (gkeys[i])
				htmlOut += '<tr class="pen1"><td colspan="3"><h3>' + gkeys[i] + '</h3></td></tr>'
			curr.sort()
			for (var j = 0; j < curr.length; j++) {
				if (curr[j].match('###')) {
					htmlOut += '<tr class="pen2">' + selChk + '<td>' + curr[j].replace('###', '</td><td align="right" valign="top">&nbsp;')+ '</td></tr>'
				} else {
					htmlOut += '<tr class="pen2">' + selChk + '<td colspan="2">' + curr[j] + '</td></tr>'
				}
			}
		}
		htmlOut += '</tbody></table>'
		return htmlOut
	}

	function collectSettings () {
		var raw = {}
		raw['coarse'] = cfg.coarse;
		$.to('collect settings', raw)
		$('#penSettings *[name]').each(
			function () {
				var subj = $(this)
				if (subj.attr('reloadable')) {
					reloadable[subj.attr('name')] = 1;
				}
				if (subj.is('input[type=checkbox]')) {
					raw[subj.attr('name')] = subj.attr('checked') == true
				} else if (subj.is('input, textarea')) {
					raw[subj.attr('name')] = subj.val()
				} else if (subj.is('select')) {
					raw[subj.attr('name')] = subj.find('[selected]').val()
				}
			});
		return raw;
	}

	function editSettings (cfg) {
		$('#penSettings *[name]').each(
			function () {
				var subj = $(this)
				var currName = subj.attr('name')
				if (cfg[currName] != undefined) {
					if (subj.is('input[type=checkbox]')) {
						cfg[currName] ? subj.attr('checked', 'checked') : subj.removeAttr('checked')
					} else if (subj.is('input, textarea')) {
						subj.val(cfg[currName])
					} else if (subj.is('select')) {
						subj.find('[selected]').removeAttr('selected')
						subj.find('[value='+cfg[currName]+']').attr('selected', 'selected')
					}
				}
			});
	}

	$.on(
		'config',
		function (data) {
			cfg = $.mergeCfg(data, cfg)
			for (var i in data) {
				loaded[i] = data[i]
			}
			return data
		})

	$.on(
		'settings',
		function (data) {
			$.isInWindow = 'settings'
			var menu = '<div style="float:left">' +
				'<button msg="select all">Выделить всё</button>&nbsp;&nbsp;' +
				' С выделенным: ' +
				'<button msg="default settings">По умолчанию</button>' +
				'</div>' +
				'<div style="float:right">' +
				'<input type="radio" name="stune" value="1" msg="settings coarse" ' + (cfg.coarse ? 'checked="checked"' : '') + '> Грубо ' +
				'<input type="radio" name="stune" value="2" msg="settings fine" ' + (cfg.coarse ? '': 'checked="checked"') + '> Точно ' +
				'&nbsp;&nbsp;&nbsp;&nbsp;' +
				$.ui.multiLink([[$.i18n.close, 'close window'],
									 [$.i18n.apply, 'apply settings']]) +
				'</div><br clear="both" /> <hr />'
			var body = $(menu + generateSettings($.to('/r/ settings', [])) + '<br clear="both"/>')
			$.to('window', {title:$.i18n.settingsTitle, body:body, menu:menu, hasSearch:true})
			$('.pen2:odd').addClass('penOdd')
			defaults = collectSettings()
			editSettings(loaded);
			fineCoarse(cfg.coarse);
			return data
		})

	$.on(
		'apply settings',
		function (data) {
			var needReload = false;
			var delta = $.diffCfg(defaults, collectSettings())
			for (i in delta) {
				if (reloadable[i])
					needReload = true
			}
			$.to('store config', {cfg: delta})
			if (needReload) {
				document.location.reload()
			} else {
				$.to('close window', data)
				$.to('load config', 1)
			}
			return data
		})

	var allSelected = false;

	$.on('select all',
		  function (data) {
			  allSelected = !allSelected
			  $('input.penSel').attr('checked', allSelected)
			  return data
		  })

	$.on('default settings',
		  function (data) {
			  var resetted = {}
			  $('input.penSel:checked').each(
				  function () {
					  $(this).closest('tr').find('[name]').each(
						  function () {
							  resetted[this.name] = '';
						  })
						  });
			  for (i in resetted) {
				  resetted[i] = defaults[i]
			  }
			  editSettings(resetted);
			  return data
		  })

})(jQuery);/* Загрузка */
;(function ($) {

   /* Защита от повторного вызова скрипта. */
   if($.locked)
      return

   function ok (doc) {
      if($.locked)
         return
      $.to('domready', {e:doc})
      $.to('loaded', {e:doc})
   }

	/*** Entry point here ***/
	$.to('load config', 1)
   $.to(location.host, 1)
   if (!$.chanOk) {
      /* Если хост не опознан, то предположим,
         что это имиджборда на вакабе. */
      $.to('default.def', 1)
   }
	$.to('ready',1)

   try {
      document = unsafeWindow.document
      ok($(document))
   } catch (err) {
      $(document).ready(
         function () { ok($(document)) })
   }

})(jQuery);
