/* Este é um script do Greasemonkey, para instalar você precisa do Greasemonkey: "https://addons.mozilla.org/pt-BR/firefox/addon/748". Em seguida reinicie o Firefox e abra novamente esse script e aceite clicando em "Instalar". Para desinstalar vá até o ícone na barra inferior, escolha "Gerenciar scripts de Usuários...", selecione "TribalWars Script Brasil" e clique em "Desinstalar". */

// ==UserScript==
// @name           TribalWars Script
// @version        0.15 Beta
// @namespace      ***
// @description    Alertes sonores pour les attaques et personnalisation de la taille de la carte !
// @include        http://fr*.guerretribale.fr/*
// @include        http://www.guerretribale.fr/logout.php
// @copyright      Copyright (c) 2009, Code Black
// ==/UserScript==

// DEBUG pode ser igual a 1,2 ou 3. 
var DEBUG = 1;

// Inicia jQuery 1.3.2 
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+",*/":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();

// Estilo antigo
function $$(tag_name){
	return document.getElementsByTagName(tag_name);
}

// Saída de função, a alternativa alerta, logs para o console do Firebug 
function log(lvl, arg) {
	if (DEBUG && DEBUG !== 0) {
		if (DEBUG > 0 && lvl == 1) { console.log('[error]: '+arg); }
		if (DEBUG > 1 && lvl == 2) { console.log('[failure]: '+arg); }
		if (DEBUG > 2 && lvl == 3) { console.log('[message]: '+arg); }
	} else { return; }
}

// Faz ligações externas (outros sites)
function ajax(url, type, async) {
	var xhReq = new XMLHttpRequest();
	if (type != "POST") { type = "GET"; }
	if (async !== true) { async = false; }
	xhReq.open(type, url, async);
	xhReq.send(null);
	log(3, "XMLHttpRequest to "+url);
	return xhReq;
}

// Define uma variável temporária
function setVar(name, new_val){
	if (typeof unsafeWindow == "object") {
		unsafeWindow[name] = new_val;
		log(3, name+' set into unsafeWindow [ setVar ]');
	} else if(TW_Is_Opera) {
		window[name] = new_val;
	}}

// Ler uma variável temporária
function getVar(name) {
	if (typeof unsafeWindow == "object") {
		return unsafeWindow[name];
	} else {
		return window[name];
	}}

// Define uma função para executar na zona insegura
function setFunc(func, new_func) {
	if (typeof unsafeWindow == "object") {
		unsafeWindow[func] = new_func;
		log(3, func+' set into unsafeWindow [ setFunc ]');
	} else if(TW_Is_Opera) {
		window[func] = new_func;
	}}

// Obtem uma função da área insegura
function getFunc(func){
	if (typeof unsafeWindow == "object") {
		return unsafeWindow[func];
	} else {
		return window[func];
	}}

// Verifica se o navegaodor é o Opera ou o Firefox
function isOpera() {
	return $.browser.opera;
}

// Armazenamento persistente
function setValueGlobal(key, new_val) {
	if(!isOpera()){
//                GM_setValue("TWE" + key, encodeURIComponent(new_val));
		GM_setValue("TWE_"+twe.myID()+"_"+key, uneval(new_val));
		return;
	}
	//Correção de erros para o Opera
	document.cookie = escape(key) + "=" + escape(new_val) + ";expires=" + (new Date((new Date()).getTime() + 31536000000)).toGMTString() + ";path=/";
}
function setValue(key, new_val) {

	GM_setValue("TWE_"+twe.Unique()+"_"+key, uneval(new_val));
}
function getValueGlobal(key) {
	if(!isOpera()) {
		return eval(GM_getValue("TWE_"+twe.myID()+"_"+key));
	}
	// Correção de erros para o Opera
	var all_cookies = document.cookie.split("; ");
	for(kk=0; kk<all_cookies.length; kk++){
		var this_cookie = all_cookies[kk];
		var tmp = this_cookie.split("=");
		if(tmp[0] == key){
			return unescape(tmp[1]);
		}}
	return null;
}

function getValue(key) {
	
	return eval(GM_getValue("TWE_"+twe.Unique()+"_"+key));
}

function delValue(key) {
	
	if(!getValue(twe.Unique()+"_"+key)) { return; }
	if(!isOpera()) { GM_setValue("TWE_"+twe.Unique()+"_"+key, ""); }
	// Correção de erros para o Opera
	document.cookie = key + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

function array_flip( trans ) {
	var tmp_ar = {};
	for(var key in trans ) {
		tmp_ar[trans[key]] = key;
	}
	return tmp_ar;
}

// Trajeto X
function xpathGetFirst(xpath) {
	return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
}

personals = {
	villageGroups : function() { // Pega todos os grupos disponíveis
		if (! getValue("villageGroups") || getValue("villageGroups") == 'undefined') {
			return [];
		} else {
			var val = getValue("villageGroups");
			var grps = [];
			for (i = 0; i < val.length; i++) {
				var grpinfo = getValue("GroupInfo_"+val[i]);
				if (new String(grpinfo) != 'undefined' && new String(grpinfo) != '') {
					var tmp = grpinfo;
					if (!tmp.show) { tmp.show = '1'; }
					grps.push('({"id":"'+val[i]+'" ,"name":"'+tmp.name+'","show":"'+tmp.show+'"})');
				}}
			return grps;
		}},
 getUserVillages : function() { // Seleciona as aldeias do usuário
	 var villageSet = $("table.vis tr[class^='nowrap row_']");
	 var villages = {};
	 for (i = 0; i < villageSet.length; i++) { // loop encontrado através da ligação
		 var cells = villageSet[i].getElementsByTagName("td");

		 var tmpId = cells[0].innerHTML.match( /village=([^&]+)/ );
		
		 var tmpDetails = cells[0].innerHTML.match( /">(.+) \((-?\d+)\|(-?\d+)\)(?: K(\d+))?<\/sp/ );
		 var tmpPoints = cells[1].innerHTML.replace(/<span(.+)>.<\/span>/gi, ".");
		 var tmpPointsInt = parseInt(cells[1].innerHTML.replace(/<span(.+)>.<\/span>/gi, ""));

		 var vilinfo = new String(getValue("villageinfo_"+tmpId[1]));

		 if (vilinfo != 'undefined') {
			 vilinfo = vilinfo.split(",");
			 var tmpGrp = vilinfo[0];
			 var tmpAlias = decodeURIComponent(vilinfo[1]);
			 tmpAlias = tmpAlias.replace(/%/g, tmpDetails[1]);
		 } else {
			 var tmpGrp = '0';
			 var tmpAlias = '';
		 }

		 villages[tmpId[1]] = {id: tmpId[1], name: tmpDetails[1], x: parseInt(tmpDetails[2]), y: parseInt(tmpDetails[3]), continent: tmpDetails[4], points: tmpPoints, pointsint: tmpPointsInt,group: tmpGrp,alias: tmpAlias, resourcesHTML:cells[2].innerHTML};

	 }
	 villages.length = villageSet.length;
                // Defini o resultado para a memória
	 setValue("myVillages", villages);
 
 },
 getCurrentVillage : function() { // Seleciona a atual aldeia
	 if (twe.curVillage === null) {
		 try {
		 		var cur = $("a:first").attr("href");
				cur = cur.replace(/(.+)village=([^&]+)(.+)/g, "$2");
				twe.curVillage = cur;
		 } catch(e) {
			 log(1, "Failed to properly execute getCurrentVillage. js error:\n"+e);
			 twe.curVillage = null;
		 }}
	 return twe.curVillage;
 },
 getImageBase : function() { // Pega a base das imagens
	 if (! getValueGlobal("imgBase") || getValueGlobal("imgBase").length < 5 || getValueGlobal("imgBase") == 'undefined') {
		 return "/graphic/";
	 } else {
		 return getValueGlobal("imgBase");
	 }}};

twe = { // Dados do TWE
	myID : function() { // Minha identificação de usuário
		if(! getVar('myID') || getVar('myID') == 'undefined') {
			xhReq = ajax(twe.Server+"/guest.php?screen=info_village&id="+personals.getCurrentVillage(), "GET");
			var tmp = xhReq.responseText.match( /info_player&amp;id=([^"]+)/ );
			var id = tmp && tmp[1] ? tmp[1] : null;
			setVar("myID", id);
		}
		return getVar('myID');
	},
 myVillages : function() { // Minhas aldeias
	 if (twe.Screen == "overview_villages" || ! getValue("myVillages") || getValue("myVillages") === 'undefined') {
		 personals.getUserVillages();
	 }
	 return getValue("myVillages");
 },
 lang : function(field) { // Seceliona a língua usada no script
	 TW_Lang = languages[twe.Language];
	 if(!TW_Lang) { TW_Lang = languages.br; }
	 if(TW_Lang[field]) {
		 return TW_Lang[field];
	 } else {
		 log(1, "Missing language tag for '"+field+"' in language '"+twe.Language+"'");
		 return '{'+field+'}';
	 }},
 getPlugins : function() { // Ativa ou desativa as informações para os plugins

	 var val = getValueGlobal("plugins");
	 if (! val || val == 'undefined') {
		 return [];
	 } else {
		 return val;
	 }},
	 
 setPlugin : function(name) { // Adiciona ou remove um plugin a partir da lista com deficiência
	 var val = getValueGlobal("plugins");

	 if (! val || new String(val) == 'undefined') {
		 setValueGlobal("plugins", new Array(name));
		 log(2, "Disabled plugin: "+name);
	 } else {

		 if (val.indexOf(name) != -1) {
			 val.splice(val.indexOf(name), 1);
			 var tmp = val;

		 } else {
			 val.push(name);
			 tmp = val;
		 }

		 setValueGlobal("plugins", tmp);
		 log(2, "Switched status of plugin: "+name);
	 }},
 curVillage : null,

        // Uma única string para cada usuário por mundo 
 Unique : function() { return twe.myID()+"_"+twe.World; }, // twe.myID() performs an XMLHttpRequest

        // Recebe a variável do ecrã
 Screen : location.href.replace(/^(.+)\/(\w+)\.php(.+)screen=(\w+)(.*)$/i,"$4"),

        // Captura a página visualizada
 Page: location.href.replace(/^(.+)\/(\w+)\.php(.+)screen=(\w+)(.*)$/i,"$2"),

        // Captura o mundo jogado
 World: location.href.replace(/^http:\/\/(\w+)\.(\w+)\.(\w+)\/(.*)$/i,"$1"),

        // Recebe o idioma do servidor, exemplo: se é br, pt, us...
 Language: location.href.replace(/^http:\/\/(\w+)(\d+)\.(\w+)\.(\w+)\/(.*)$/i,"$1"),

        // Recebe o servidor que está jogando
 Server: location.href.replace(/^(.+)\/(\w+)\.php(.*)$/i,"$1")
};

languages = { // Tags de linguagem
   "br" : {
      "loading"  : "Carregando...",
      "mapsize"  : "Tamanho do mapa",
      "main_setaliasheader" : "Guardar Lembrete:",
      "main_setalias" : "Alterar",
      "main_setaliasdone" : "Guardado!",
   }};

	var plugins = {};

	plugins.setAlias = { // Adiciona lembretes na área "Edifícil Principal"
		'enhance_game_main' : function() {
			$("form table").clone().insertAfter("form table");
			$("form table:last th").html(twe.lang("main_setaliasheader"));

			var link = $("table.main table.vis a:first")[0];
			var tmpId = link.getAttribute("href").match( /village=([^&]+)/ );

			$("form table:last td:last input").remove();
			$("form table:last td:last").html("<a href=\"javascript:setAlias("+tmpId[1]+");\">"+twe.lang("main_setalias")+"</a>");
			$("form table:last").after("<p id=\"setaliasdone\" style=\"display: none\">"+twe.lang("main_setaliasdone")+"</p>");
			
			var entry = $("form table:last td:first input")[0];
			entry.setAttribute("id", "alias");
			entry.setAttribute("name", "alias");

			var tmp = new String(getValue("villageinfo_"+tmpId[1]));
			tmp = tmp.split(",");
			if (tmp[1] && tmp[1] != 'undefined') { entry.value = decodeURIComponent(tmp[1]); } else { entry.value = ''; }

			setFunc("setAlias", function(ident) {
				window.setTimeout(function() {
					var tmp = new String(getValue("villageinfo_"+ident));
					tmp = tmp.split(",");
					if (!tmp[0]) tmp[0] = 0;
					setValue("villageinfo_"+ident, ""+tmp[0]+","+encodeURIComponent($("#alias").val()));
					$("#setaliasdone").fadeIn("slow");
				}, 0);});},};

	plugins.clearPremium = { // Tira as mensagens pedindo para fazer uprade para conta prêmio
		'enhance_game_main' : function() {
			if ($("table.main").length > 1) {
				$("table.main:first,br").css({display: "none"});
			}
			$("table.vis").each(function() {
				var links = this.getElementsByTagName("a");
				if (links.length > 0) {
					if (/premium/.test(links[0].href)) {
						$(this).css({display: "none"});
					}}});},
  'enhance_game_smith' : function() {
	  if ($("table.main").length > 1) {
		  $("table.main:first,br").css({display: "none"});
	  }
	  $("table.vis").each(function() {
		  var links = this.getElementsByTagName("a");
		  if (links.length > 0) {
			  if (/premium/.test(links[0].href)) {
				  $(this).css({display: "none"});
			  }}});},
  'enhance_game_overview_villages' : function() {
	  if ($("table.main").length > 1) {
		  $("table.main:first,br").css({display: "none"});
	  }
	  $("table.vis").each(function() {
		  var links = this.getElementsByTagName("a");
		  if (links.length > 0) {
			  if (/premium/.test(links[0].href)) {
				  $(this).css({display: "none"});
			  }}}); },};
	
// ------------------------------------------------------------------------
// Remove Anúncios
//-------------------------------------------------------------------------
var url=window.location.href;
if(url.indexOf("logout.php") != -1){
	window.stop();
	window.location="http://www.tribalwars.com.br";}
var frmsets = document.getElementsByTagName("frameset");
if(frmsets.length > 0){
	var frmset = frmsets[0];
	for(kk=0; kk<frmset.childNodes.length; kk++){
		var frm = frmset.childNodes[kk];
		if(frm.tagName=="FRAME" && frm.getAttribute("name") != "main"){
			frm.src = "about:blank";
			frm.cols ='10';}}
	if(frmset.getAttribute("rows")) frmset.setAttribute("rows", "0, *");
	else frmset.setAttribute("cols", "*, 0");
	unsafeWindow.reload = function(ad_top, ad_sky){; };
	return;
}else{
	var ad_iframe = $("ad");
	if(ad_iframe && ad_iframe.tagName == "IFRAME"){
		ad_iframe.style.display = "none";
		var body_iframe = $("main");
		if(body_iframe && body_iframe.tagName == "IFRAME"){
			body_iframe.style.top = "0px";
			body_iframe.style.left = "0px";}}}

	plugins.addToolbar = { // Adiciona a barra de atalhos

		'enhance_game' : function() {
			personals.getCurrentVillage();
			if (/t=([^&]+)/.test(location.href)) {
				var t = '&' + location.href.match(/t=([^&]+)/g)
			} else {
					var t = '';}

			var vils = twe.myVillages();
			var multivillage=false;
			for(var v in vils) { if(v!=twe.curVillage) { multivillage = true; break; } }
			if(multivillage && twe.myVillages().length > 1) {

				if (villist.length != vils.length) {
					menu_xhtml += '<optgroup label="'+twe.lang("overview_nogroup")+'">';}

				for(var ij in vils) {
					var vil = vils[ij];
					if (villist.indexOf(vil['id']) == -1) {
						if (new String(vil['id']) != 'undefined') {
						menu_xhtml += '<option value="' + vil["id"] + '"' + (twe.curVillage == vil["id"] ? ' selected="selected"' : '') + '>' + (vil['alias'] != '' ? decodeURIComponent(vil['alias']) : decodeURIComponent(vil["name"])) + ' [' + vil["points"] + '] ' + vil["x"]+'|'+vil["y"] + '&nbsp;</option>';
						}}}
				if (villist.length != vils.length) {
		
				}}
				
            var menu_xhtml = '';	
			menu_xhtml += '<td><a href="/game.php?village=' + twe.curVillage + '&screen=overview_villages'+t+'"><img src="' + personals.getImageBase() + 'unit/unit_snob.png" style="margin:0px 2px" title=" ' + twe.lang("villages") + ' " /></a></td>';
			
			var TW_Image_Base = personals.getImageBase();

			setVar("twtools_hidden", "yes");
			setFunc("tools_show", function(){
				window.setTimeout(function() {
					if(getVar("twtools_hidden") == "yes"){
						$("#twtools_div").slideToggle("slow");
						$("#twtools_img")[0].src = personals.getImageBase()+"oben.png";
						$("#twtools_tribe")[0].focus();
						$("#twtools_tribe")[0].value = twe.lang("tribe");
						$("#twtools_tribe")[0].select();
						setVar("twtools_hidden", "no");
					}else{
						$("#twtools_div").slideToggle("slow");
						$("#twtools_img")[0].src = "graphic/unten.png";
						setVar("twtools_hidden", "yes");
					}
				}, 0);
			});
		}};

	plugins.mapexpand = { // altera tamanho do mapa
		'get_mpt_xhtml' : function(village_coords, points){
			if(TW_Mpt[village_coords] == null) return "";

			plugins.mapexpand.put_mpt(village_coords, points);
			var delta = points - TW_Mpt[village_coords];
			if(delta > 0) return ' <span style="color:green">(+' + delta + ')</span>';
			if(delta == 0) return ' <span style="color:black">(0)</span>';
			return ' <span style="color:red">(-' + Math.abs(delta) + ')</span>';
		},

  'get_mpt' : function (){
	  var cacheMpt = getValue("MPTrk");
	  if(!cacheMpt || cacheMpt == ""){
		  cacheMpt = [];
	  }else{
		  cacheMpt = unserialize(cacheMpt);
	  }
	  return cacheMpt;
  },

  'put_mpt' : function (village_coords, points){
	  window.setTimeout(function() {
		  var cacheMpt = get_mpt();
		  cacheMpt[village_coords] = points;
		  var to_save = serialize_x(cacheMpt);
		  TW_setValue("MPTrk", to_save);
	  },0); },
  'enhance_game_map': function(){
	  var TW_Image_Base = personals.getImageBase();
		// Obtem tamanho do mapa
	  var new_size = getValue("MSize");
	  if(!new_size) new_size = 15;

		// Controles do mapa
	  setFunc("resize_map", function(){
		  var mss = xpathGetFirst("//*[@id='map_size_select']");
		  var nsz = parseInt(mss.options[mss.selectedIndex].value);

		  window.setTimeout(function(){setValue("MSize", nsz);}, 0);
		  window.setTimeout("window.location.reload(true)", 100);
	  });

	  var form = $$("form")[1];
	  var sizes = [7, 10, 12, 15, 18, 20, 22, 24, 26, 28, 30];
	  var iHtml = '<table><tr><td colspan="2">&nbsp;</td></tr><tr><td align="right">Taille de la carte : </td><td><select id="map_size_select" onchange="resize_map()">';
	  for(kk=0; kk<sizes.length; kk++) iHtml += '<option ' + (sizes[kk]==new_size ? 'selected="selected" ' : '') + 'value="' + sizes[kk] +'">' + sizes[kk] + 'x' + sizes[kk] + (sizes[kk]==7?' (desligado)':'') + '</option>';

	  iHtml += '</table>';
	  form.innerHTML += iHtml;
		// Fim do controle do mapa

	  if(new_size == 7) return;

	  window.setTimeout(function() {
		  setValue("MSize", new_size);
	  },0);

	  var map_requests_needed = null;
	  var map_requests_size   = null;

	  if(new_size < 16){
		  map_requests_needed = 1;
	  }else{
		  map_requests_needed = 4;
		  map_requests_size   = parseInt(new_size / 2);
		  new_size = map_requests_size * 2;
	  }

		// Get mpt points
	  TW_Mpt = plugins.mapexpand.get_mpt();

		// Pega a posição atual
	  var map_x = getVar("mapX");
	  var map_y = getVar("mapY");
	  var map_s = getVar("mapSize");

		// Calcula novas posições x e y
	  var delta = parseInt((map_s - new_size) / 2);

		// Overwrite values
	  map_x += delta;
	  map_y += delta;

		// InnerHTML
	  var ihtml = "";
	  ihtml += '<tr>';
	  ihtml += '<td height="38">' + map_y + '</td>';
	  ihtml += '<td colspan="' + new_size + '" rowspan="' + new_size + '">';
	  ihtml += '<div style="background-image:url(graphic/map/gras1.png); position:relative; width:' + (53 * new_size) + 'px; height:' + (38 * new_size) +'px; overflow:hidden" id="map">';
	  ihtml += '<div id="mapOld" style="position:absolute">';
	  if(map_requests_needed == 4){
		  var w = 53 * map_requests_size + 1;
		  var h = 38 * map_requests_size + 2;
		  ihtml += '<table cellspacing="0" cellpadding="0"><tr><td><div id="old_1" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div></div></td><td><div id="old_2" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr><tr><td><div id="old_3" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td><td><div id="old_4" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr></table>';
	  }
	  ihtml += '<div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div>';
	  ihtml += '</div>';
	  ihtml += '<div id="mapNew" style="position:absolute; left:0px; top:0px">&nbsp;</div>';
	  ihtml += '</div>';
	  ihtml += '</td>';
	  ihtml += '</tr>';
	  for(jj=1; jj<new_size; jj++){
		  ihtml += '<tr><td width="20" height="38">' + (map_y + jj) + '</td></tr>';
	  }
	  ihtml += '<tr id="map_x_axis">';
	  ihtml += '<td height="20"></td>';
	  for(jj=0; jj<new_size; jj++){
		  ihtml += '<td align="center" width="49">' + (map_x + jj) + '</td>';
	  }
	  ihtml += '</tr>';
	  xpathGetFirst("//*[@id='mapCoords']").innerHTML = ihtml;

		// Update data (asynchronously)
	  if(map_requests_needed == 1){
		  var url = twe.Server + "/" + getVar("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + new_size + '&size_y=' + new_size;
		  var xhReq = new XMLHttpRequest();
		  xhReq.open("GET", url, true);
		  xhReq.onreadystatechange = function(){
			  if(xhReq.readyState != 4 || xhReq.status != 200) return;
			  xpathGetFirst("//*[@id='mapOld']").innerHTML = xhReq.responseText;
		  }
		  xhReq.send(null);
	  }else{
		  var url_1 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		  var url_2 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + (map_x + map_requests_size) + '&start_y=' + map_y + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		  var url_3 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + map_x + '&start_y=' + (map_y + map_requests_size) + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		  var url_4 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + (map_x + map_requests_size) + '&start_y=' + (map_y + map_requests_size) + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;

		  var xhReq_1 = new XMLHttpRequest();
		  xhReq_1.open("GET", url_1, true);
		  xhReq_1.onreadystatechange = function(){
			  if(xhReq_1.readyState != 4 || xhReq_1.status != 200) return;
			  xpathGetFirst("//*[@id='old_1']").innerHTML = xhReq_1.responseText;
		  }
		  xhReq_1.send(null);

		  var xhReq_2 = new XMLHttpRequest();
		  xhReq_2.open("GET", url_2, true);
		  xhReq_2.onreadystatechange = function(){
			  if(xhReq_2.readyState != 4 || xhReq_2.status != 200) return;
			  xpathGetFirst("//*[@id='old_2']").innerHTML = xhReq_2.responseText;
		  }
		  xhReq_2.send(null);

		  var xhReq_3 = new XMLHttpRequest();
		  xhReq_3.open("GET", url_3, true);
		  xhReq_3.onreadystatechange = function(){
			  if(xhReq_3.readyState != 4 || xhReq_3.status != 200) return;
			  xpathGetFirst("//*[@id='old_3']").innerHTML = xhReq_3.responseText;
		  }
		  xhReq_3.send(null);

		  var xhReq_4 = new XMLHttpRequest();
		  xhReq_4.open("GET", url_4, true);
		  xhReq_4.onreadystatechange = function(){
			  if(xhReq_4.readyState != 4 || xhReq_4.status != 200) return;
			  xpathGetFirst("//*[@id='old_4']").innerHTML = xhReq_4.responseText;
		  }
		  xhReq_4.send(null);

		  setFunc("downloadMapData", function(x_mod, y_mod){

			  var map_x  = getVar("mapX");
			  var map_y  = getVar("mapY");
			  var map_s  = getVar("mapSize");
			  var map_ss = map_s / 2;

			  map_x += x_mod * map_s;
			  map_y += y_mod * map_s;

			  window.setTimeout(function() {
				  setVar("mapX", map_x);
				  setVar("mapY", map_y);}, 0);

				// Preparar novos blocos
				  var w = 53 * map_ss + 1;
				  var h = 38 * map_ss + 1;
				  var map_new = getVar("mapNew");
				  map_new.innerHTML = '<table cellspacing="0" cellpadding="0"><tr><td><div id="new_1" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div></div></td><td><div id="new_2" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr><tr><td><div id="new_3" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td><td><div id="new_4" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr></table>';

				  var url_1 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + map_ss + '&size_y=' + map_ss;
				  var url_2 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + (map_x + map_ss) + '&start_y=' + map_y + '&size_x=' + map_ss + '&size_y=' + map_ss;
				  var url_3 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + map_x + '&start_y=' + (map_y + map_ss) + '&size_x=' + map_ss + '&size_y=' + map_ss;
				  var url_4 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + (map_x + map_ss) + '&start_y=' + (map_y + map_ss) + '&size_x=' + map_ss + '&size_y=' + map_ss;

				  var xhReq_1 = new XMLHttpRequest();
				  xhReq_1.open("GET", url_1, true);
				  xhReq_1.onreadystatechange = function(){
					  if(xhReq_1.readyState != 4 || xhReq_1.status != 200) return;
					  xpathGetFirst("//*[@id='new_1']").innerHTML = xhReq_1.responseText;
				  }
				  xhReq_1.send(null);

				  var xhReq_2 = new XMLHttpRequest();
				  xhReq_2.open("GET", url_2, true);
				  xhReq_2.onreadystatechange = function(){
					  if(xhReq_2.readyState != 4 || xhReq_2.status != 200) return;
					  xpathGetFirst("//*[@id='new_2']").innerHTML = xhReq_2.responseText;
				  }
				  xhReq_2.send(null);

				  var xhReq_3 = new XMLHttpRequest();
				  xhReq_3.open("GET", url_3, true);
				  xhReq_3.onreadystatechange = function(){
					  if(xhReq_3.readyState != 4 || xhReq_3.status != 200) return;
					  xpathGetFirst("//*[@id='new_3']").innerHTML = xhReq_3.responseText;
				  }
				  xhReq_3.send(null);

				  var xhReq_4 = new XMLHttpRequest();
				  xhReq_4.open("GET", url_4, true);
				  xhReq_4.onreadystatechange = function(){
					  if(xhReq_4.readyState != 4 || xhReq_4.status != 200) return;
					  xpathGetFirst("//*[@id='new_4']").innerHTML = xhReq_4.responseText;
				  }
				  xhReq_4.send(null);
		  });

			// ScrollX fix
		  function watchMouse(e){
			  var info = document.getElementById("info");
			  if(!info || info.style.visibility != "visible") return false;

			  var scrollX, scrollY, mouseX, mouseY;
			  if(e){
				  scrollX = window.pageXOffset;
				  scrollY = window.pageYOffset;
				  mouseX  = e.clientX;
				  mouseY  = e.clientY;
			  }else{
				  scrollX = document.body.scrollLeft;
				  scrollY = document.body.scrollTop;
				  mouseX  = window.event.clientX;
				  mouseY  = window.event.clientY;
			  }

			  info.style.left = mouseX + 5 + scrollX + "px";
			  info.style.top =  mouseY - 100 + scrollY + "px";
			  return true;
		  };

		  if(document.addEventListener) document.addEventListener("mousemove", watchMouse, true);
		  else document.onmousemove = watchMouse;
	  }

		// ajaxMapInit()
	  window.setTimeout(function() {
		  setVar("mapOld",  xpathGetFirst("//*[@id='mapOld']"));
		  setVar("mapNew",  xpathGetFirst("//*[@id='mapNew']"));
		  setVar("mapX",    map_x);
		  setVar("mapY",    map_y);
		  setVar("mapSize", new_size);
	  }, 0);

		// mapMoveTopo()
	  var scrollX = map_x;
	  var scrollY = map_y;
	  window.setTimeout(function() {
		  setVar("scrollX", scrollX);
		  setVar("scrollY", scrollY);
	  }, 0);
	  var topoX = parseInt(document.getElementsByName('min_x')[0].value);
	  var topoY = parseInt(document.getElementsByName('min_y')[0].value);

	  var relX = scrollX - topoX;
	  if(getVar("globalYDir") == 1){
		  var relY = scrollY - topoY;
	  }else{
		  var relY = (45-mapSize) - (scrollY-topoY);
	  }
	
		// Rechteck verschieben (whatever this mean :)
	  var topoRect = xpathGetFirst('//*[@id="topoRect"]');
	  topoRect.style.left   = (5*(relX)) + 'px';
	  topoRect.style.top    = (5*(relY)) + 'px';
	  topoRect.style.width  = (5*(new_size)) + 'px';
	  topoRect.style.height = (5*(new_size)) + 'px';

		// Tracking

	  setFunc("old_map_popup", getFunc("map_popup"));
	  setFunc("map_popup", function(title, bonus_image, bonus_text, points, owner, ally, village_groups, moral, village_id, source_id){
		  var x_title  = arguments[0];
		  var x_points = null;
		  if(arguments.length == 8){
			  x_points = arguments[1];
			  (getFunc("old_map_popup"))(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
		  }else{
			  x_points = arguments[3];
			  (getFunc("old_map_popup"))(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);			
		  }

		  var tmp = x_title.match( /\(([^\)]+)/ );
		  var vlg_coords = tmp && tmp[1] ? tmp[1] : null;

		  if(vlg_coords != null){

			  vlg_coords = vlg_coords.replace(/\|/, "x");
	
				//var villagelinks = $("mapCoords").getElementsByTagName("a");
			  var villagelinks = xpathGetAll("//*[@id='mapCoords']//a");
			  for (i =0; i < villagelinks.length; i++) { 
			
				  var curvil = new String(villagelinks[i].innerHTML);
				  var curcord = curvil.replace(/(.+)\((-?\d+)\|(-?\d+)\)(.+)/gi, "$2x$3");
				  if (curcord == vlg_coords) {
					  curid = villagelinks[i].href.replace(/^(.+)id=(\d+)$/i, "$2");
				  }
			  }
			  var pointrackinfo = (plugins.mapexpand.get_mpt_xhtml(vlg_coords, x_points) != '') ? plugins.mapexpand.get_mpt_xhtml(vlg_coords, x_points) :
			  
	plugins.mapexpand.get_mpt_xhtml(curid, x_points);
			  xpathGetFirst("//[@id='info_points']").innerHTML = x_points + pointrackinfo;
		  } });}};

	plugins.attackcache = {
		enhance_game_place : function() {
			if(!location.href.match(/&try=confirm/)) return;
			var form = $("form[action*='action=command']")[0];
			if(!form) return;
			var targetcoords = [
					$("input[name='x']",form)[0].value,
	 $("input[name='y']",form)[0].value];
		}};

// Kicker
	for(var pname in plugins) {
		var plugs = twe.getPlugins();
		if (plugs.indexOf(pname) == -1) {
			var func = plugins[pname]["enhance_"+twe.Page];
			if(func) { func(); }
			func = plugins[pname]["enhance_"+twe.Page+"_"+twe.Screen];
			if(func) { func(); }
		}}

// ------------------------------------------------------------------------
// Sons para Tribal Wars
//-------------------------------------------------------------------------

(function(){

var lang = "pt-br";
	// Textbausteine, neue Übersetzung unten eintragen ab Zeile 119 / insert your new translation at line 119
if (lang  == "pt-br") {
	var Text1 = " Configuration des alertes"; 					
	var Text2 = " Activer les alertes sonores";
	var Text3 = " Répéter toutes les ";
	var Text4 = " Volume : ";
	var Text5 = " - son principal : ";
	var Text6 = " - Lorsque vous êtes attaqués ";
	var Text7 = " Répétition d'alerte en cas d'attaque ?";
	var Text8 = " - Lorsque vous commencez la bataille : ";
	var Text9 = " - Lorsque vous recevez un message : ";
	var Text10 = " - Lorsque vous recevez un rapport : ";
	var Text11 = " - Lorsqu'il y a un nouveau message sur le forum : ";
	var Text12 = " URL du forum : ";
	var Text13 = " - Lorsque la session prend fin : ";
	var Text14 = " minutes";
	var Text15 = " Remarque : Vous avez besoin de QuickTime pour que les alertes puissent fonctionner."}

// +++ Não altere nada além deste ponto +++

if (window.frames[1]) {
	var Loc = window.frames[1].location;
	var Doc = window.frames[1].document;
	if (Doc.location.href.search(/game\.php/) <= 0)
	{
		Loc = window.frames[0].location;
		Doc = window.frames[0].document;
	}}
else {
	var Loc = window.location;
	var Doc = window.document;
}
if (Doc.body) {
	var Body = Doc.body.innerHTML;
}
else {
	return;
}

var welt = Doc.location.host.split('.')[0];				// Welt ermitteln
var uv = (Loc.href.match(/[&,?]t=(\d+)/)) ? RegExp.$1 : "";	// testen ob UV
var cn = "ds_sound_"+welt+"_"+uv+"0"; 						// Accountnamen
var cwert;
var awert;
var interval;
var sound_on = GM_getValue("sound_on", true);
var zeit = GM_getValue("zeit", 10);
var sound1 = GM_test("sound1", "0");
var sound1_on = GM_getValue("sound1_on", true);
var sound1_vol = GM_getValue("sound1_vol", 100);
var sound2 = GM_test("sound2", "0");
var sound2_on = GM_getValue("sound2_on", true);
var sound2_vol = GM_getValue("sound2_vol", 100);
var loop = false;
var sound3 = GM_test("sound3", "0");
var sound3_on = GM_getValue("sound3_on", true);
var sound3_vol = GM_getValue("sound3_vol", 70);
var sound4 = GM_test("sound4", "0");
var sound4_on = GM_getValue("sound4_on", true);
var sound4_vol = GM_getValue("sound4_vol", 70);
var sound_nm = GM_test("sound_nm", "0");
var sound_nm_on = GM_getValue("sound_nm_on", true);
var sound_nm_vol = GM_getValue("sound_nm_vol", 50);
var sound_nr = GM_test("sound_nr", "0");
var sound_nr_on = GM_getValue("sound_nr_on", true);
var sound_nr_vol = GM_getValue("sound_nr_vol", 100);
var sound_nf = GM_test("sound_nf", "0");
var sound_nf_on = GM_getValue("sound_nf_on", true);
var sound_nf_vol = GM_getValue("sound_nf_vol", 30);

var dsphpbb = false;
try {
	var wert = Body.match(/action=is_newer_post/)[0];
	if (wert) {
		dsphpbb = true;
	}
} catch(e) {dsphpbb = false;}

if (dsphpbb) {
	var forum = GM_getValue("dsphpbb_adr"+welt+uv, "0");
	var pic1f = forum  + "images/ds/ds_newpost.gif";
}

	// graphic bell
var picsndon = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
	'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAq5JREFUOMuFlL2LXGUUxn/vx/2cndyZnUmc' +
	'3dm4JhiJH1gYAoIWil0QrEQMNitEFwuxUBIbBasE/wK1UFnEFDYJKSzEQrSQoIhIdCUfEiSbdXZ2' +
	'yO7O3Hvfe9/3tRBCINnxdM95zvlxeIoD/1Pe+6m+nGZ++fGZv89+8uFn3rtdZ8S9mt9+fSG4+MN3' +
	'Rw88sO9751x1YzA+cnzptT96c/16KuDkqXei9etX36eqXm+m6ezhhw9wc22DtbU1dJjc8N6f+uiL' +
	'r1bu3NF3iu2N9QdjKd7VacL9+/ezuHCQXrdPEsasD4bzk3x8DFjZNYNbw8GVJI4ItKLbnUUrTZqm' +
	'xHFCoCTpTLM7NcROd6+vrSWKIrx3zPf7hGGIUoqiLFFKzU0FFKbq3RwM2djcJJ9ss7fTIAr9f7oo' +
	'yCc72ekP3tsdoJROhBAIIdESwmKILLfRWiGlROugf/2va4tTANEx4QWBVigvoHAoIVFCY5FIgaiq' +
	'4ol7AlY+/1Qg/KtCCJRUhKHGhZDEAWmSEIQRwoK39fLLLz5/N2D10q/PCuyjQoAQkryoMSolbXTQ' +
	'QYAUgp0yBx0+18k6j92+GuCt5aXMVua8Vqoz02jQ2pPRmMlQUZPR2JBPcqSSREmKQsginzzz9JNH' +
	'v/nxp1+GwnvPG0vHV733DxljyJpN2nsyOu1ZsnYLW1u2t7YYbd1iOBphjME5R2Gqjd5c/6Cu61rV' +
	'3i/WxqCFxAFOSoyzFHmBcxbjHQ6IkhiHJ01iiqLcuXrlcqmVxEr4szBlO4nifiCVaMQx8737WFiY' +
	'RynF6uVrjMdj6qrCWrtpTPV7UZZPnT13wWipAoDHl0+8IkKlDyVRXCZx+lLazF6YlFXQzhplq9W6' +
	'9M9g8JsbjS4eOvzIz2++fdIASKnA2UpM+wnOVjhb7er/C3AAFHJlPpo3AAAAAElFTkSuQmCC';

var picsndoff = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
	'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAylJREFUOMt91F9oW1UcwPHvubm3TW7+3GRp' +
	'XbO0ab1tsy5mdplkaNGBij7ofFNQUFAmspdpn2QIE5WB2x5U8EWGMMbAP+CDg734UFBEwSnE6VZX' +
	'SW7TNG10XZomXdIkN/deH5Zgx5zn6ZzD7/c5v3N+cARARteTwA7ABn5MGYZNdziOgxCitySj62NA' +
	'DGimDOOS1N0fB74Fvgde6gV/+tE7J898cGKP49i9ZD8wB3wHzAD0gAvA+e789C8HD0ZOHX9zJuD3' +
	'Hb6xtvrqh++/m/yrtCIDpwG9i3wMILaVFgJ+B6JXQwHzp+SUMj4xQvnGBqVSiclG++8n57ODQA2Y' +
	'ThlGYXsFpAyjsuZxH3OARKWmpDxeJu6Ns2/vNJORKA9ll3Z241/vJd8GAJyLj5aykUEEMPVzBtkB' +
	'VVXZ+0cWf9tk3av+uu2qdwLhgUHlkh6j4XHjqWwwfHWBYHGVSG6RRp/CXCqppAyDuwLNtulbqmzw' +
	'za5BAMyvL+L+/CtwYG4kQsU2tZPvvX13wOWSh4QQlAZCLI0NQ7sN1Rq54QjLIQ1ZVqKF/OLo/wD9' +
	'MeEIFFn+tz2A2mpjISEJhGk29/8ncP7cWYFwnhJCEFuvEssXkQdCuDQ/kbUyyXIFYYFjdY688Nyh' +
	'O4GF+d8eFVj3qZ0OD2cLIASho4fxvfgsADOFIlKtCnLf42EtnLwNmD3yira1WfvErcg8s17Fa5qU' +
	'E1PkAgMsjo5Tj43Qb9k8sXIdzaO6zObWl2+89nIcQHIcB8e2T9Xr9cl7/swxtlZmy6uSe2Afyyur' +
	'FFdLXEvvx3K5GCpX0I0lhBCJarX2w7HZo36p0+m4Gqb5vLy5ySP5Io4QXE6naLgkmltNWq0mtYCP' +
	'XGI3AAfyy4x63OwIaVUjl21JLglLsp3ZxxaMdr9lYYxEuTkcZdfQTvYk4tw/nSQcDpONj7Ph8yJb' +
	'FjOZK5tT0eihLy5cbMuSSyGj60GgDzAWJ/S3PG71QdWvHWi0TCWkeVvBYHD+us93ZV3z14M362cC' +
	'5Yo/ffazp6XjJ64J2zLF5cndacANFFKGkd/eZ9syb732rYMA0oCn96H8A/0ENrlijrmBAAAAAElF' +
	'TkSuQmCC';

	//graphic test sound
var stest = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
	'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAANuSURBVHjaXNO9bxtl' +
	'AMfx3z3P2Wf77MTUzvklidOXNAMgRUqcCqQGMbEwgIqqspS5XVgQ4l9gQJUYKgESExKIDgy8DEBU' +
	'oENTSOIEpbYDJE5qR+f4bN+de8nd47t77mEoE9/t+wd8pM8+/QQAEAYh/DB4aczYbd/3rzDG0pZp' +
	'Gn/vNdca9cd3K3Pn28+/8CLCMIQQAmEYgHMOGQAkSYIA3g2D4KNCoRDLZDIYj8c46XZnCsXi0kxl' +
	'7p3Dg/33hRBPADgR53UhRAAAMqUUYcivy5R8vLq6CsYYnKcO8vkpLC4uolFvgHNeVBTli5gsY2Jy' +
	'MgJQOzps3eKcb8myLGeDILizvLSM2nYNRq+HicksEgkFqVQK1eoKEkkFD357AMs0cWl+nnDOq6qq' +
	'frO1ufEyYYy9deH8hZnd3V0YhoGZ2VmUyyWUyiWcy+Ww8cfvmL+8gIsXLyESApZlIa4oKBaLlVwu' +
	'f5tQQl6HBHSOOygWS8hMZJBOp5HNPgdZlqHrXTx6uI6VKytQVRW9kxPk83mEnKM8XX6NJJPJBdse' +
	'IRaLI5lKQokrSKkqkskUurqO6koVrueCUgpN0+A4DszhEJ12G5Zll2RCaYaxMSRCceYyREKCRGXE' +
	'4wp2ajV0dR17zSYWLi9A0zTsbNewubkBSihc1x2RwPd9QinGAcfY9xGPx5BOq8jlctA0DV9/9SX+' +
	'3N7CaGRDSSTAeQTbsjAa2TB6J2uy4zi6VijOJ2IUU+eySCoKLMtGRk3j+o0bgCThr2YDE5OT0HUd' +
	'nIfwXBeMeX3P9e7IpmU9LE9Pv0IpgWU/xcAaQZvKw/fHcBwJb167BqN3Fel0GsedDjzXg9E7MSMh' +
	'3qaEdIjv+/e6uh6VymV0e32ISECJybBtG8PhEO0nbXiei8Ggj+PjYwz6xg5j7FVCyH1JkkA459sH' +
	'rdY9SQhMl4oYe2cwLQu2baPfN2CaQ2haAb/+ch+Dfj80zeHNKIp2wyBAEAQgnuuCc/7eo/X1QyVG' +
	'UKnMIgo5GGNIqSrm5ubww/ffoVFvoNM5+lAI8TgIApydnsJxHNDq8hKiKHI45z/v7/+z6p6dFVRV' +
	'hUwp+oaBtZ9+RKNeR/vo8O7IHn1AKRV4JhCSJD3T+N83JIlcbR20bu01m2+EYVjxXM8/PXXqg77x' +
	'OWPet5RS/L9/BwDYGsraJJa3swAAAABJRU5ErkJggg==';

if (Body.match(/input name=\"sid_refresh_password/) || Doc.location.href.match(/sid_wrong\.php/)) {
	refresh_p();
} 
else {
	check_angriff();			// Angriff?
	check_other();				// anderes Ereignis?
	grafik();					// Soundsymbol anzeigen
}

// ---------------- Functions --------------------- //

	// testet auf Angriffe und merkt sich, welche bekannt sind
function check_angriff() {
	cwert = parseInt(GM_getValue(cn, 0),10);
	try {	// auf Angriffssymbol pruefen
		awert = Body.match(/graphic\/unit\/att\.png[?*][0-9*]" alt=""> \((\d+)\)/)[1];
	} catch(e) {awert = '';}

	if (awert) {
		var jetzt = zeit_holen();
		var barracks; var train;
		try {	// auf Kaserne pruefen
			barracks = Doc.location.href.match(/screen=barracks/)[0];
		} catch(e) {barracks = '';}

		try {	// Rekrutierenansicht pruefen
			train = Doc.location.href.match(/screen=train/)[0];
		} catch(e) {train = '';}

		if (cwert != awert) {
			var a1wert = awert;
			var c1wert = cwert;
			if (awert == '') a1wert="0"; 
			if (cwert == '') c1wert="0";
			if (parseInt(a1wert, 10) > parseInt(c1wert, 10)) {
				attacksound();
				GM_setValue("adelay"+welt+uv, jetzt);
				GM_setValue("known_"+welt+uv, 0);
			}
			else {
				if (sound3_on) {
					play_sound(sound3, sound3_vol);
				}}
			GM_setValue(cn, awert);
		}
		else if (train || barracks) {
			if (GM_getValue("known"+welt+uv, 0) == 0) {
				var adelay = GM_getValue("adelay"+welt+uv, 220255);
				if ((jetzt - adelay) > (60 * zeit)) {
					attacksound();
					GM_setValue("adelay"+welt+uv, jetzt);
				}}}
		else {
			GM_setValue("known"+welt+uv, 1);
		}}
	else if (cwert) {
		GM_deleteValue(cn);
		if (sound3_on) {
			play_sound(sound3, sound3_vol);
		}
		GM_setValue("known"+welt+uv, 1);
	}}

	// testet auf andere Ereignisse
function check_other() {
	check_new("igm", sound_nm, sound_nm_vol);		// IGM?
	check_new("report", sound_nr, sound_nr_vol);		// Bericht?
	check_new("forum", sound_nf, sound_nf_vol);		// Forum?
}

	// gibt's was neues ?
function check_new(name, soundfile, volume) {
	if (soundfile == "") {
		return;
	}
	var wert;
	var zeit1 = GM_getValue("alarm_"+name, 220255);
	var delay = GM_getValue("delay", 220255);
	var jetzt = zeit_holen();

	if ((jetzt - zeit1) > (60 * zeit)) {
		if ((name == "igm") && sound_nm_on) {
			try {
				wert = Body.match(/screen=mail"><img src="\/graphic\/new_mail\.png/)[0];
			} catch(e) {wert = '';}
			if (wert == '') {
				try {
					wert = Body.match(/screen=mail"><img src="graphic\/new_mail\.png/)[0];
				} catch(e) {wert = '';}
			}}
		else if ((name == "report") && sound_nr_on) {
			try {
				wert = Body.match(/graphic\/new_report\.png/)[0];
			} catch(e) {wert = '';}
		}
		else if ((name == "forum") && sound_nf_on && (dsphpbb == false)) {
			try {
				wert = Body.match(/graphic\/ally_forum\.png/)[0];
			} catch(e) {wert = '';}
		}
		else if ((name == "forum") && sound_nf_on && (dsphpbb == true)) {
			extforum(name, zeit, jetzt, soundfile, volume);
			wert = '';
		}

		if (wert) {
			if ((jetzt - delay) < 3) {	// falls innerhalb von 3 Sek schon ein Sound gespielt wurde
				if (zeit > 2) {
					interval = window.setInterval("check_other()",1500)
					//interval = window.setTimeout("Loc.reload()", (delay + 3 - jetzt) * 1000);
				}}
			else {
				if (zeit > 2) {
					//window.clearTimeout(interval);
					window.clearInterval(interval);
				}
				GM_setValue("alarm_"+name, jetzt);
				GM_setValue("delay", jetzt);
				play_sound(soundfile, volume);
			}}}}

	// neuer Eintrag im DSphpBB-Forum?
function extforum(name, zeit, jetzt, soundfile, volume){
	var a = Doc.getElementsByTagName("a");
	for(var i = 0; i < a.length-1; i++) {
		if (a[i].href == forum) {
			var img = a[i].firstChild;
			var pic2f = img.src;
			GM_xmlhttpRequest ({
				method:'GET',
				url: pic2f,
				onload: function(responseDetails) {
					if(responseDetails.status == 200) {
						var pic2 = responseDetails.responseText;
						var len2 = pic2.length;

						GM_xmlhttpRequest ({
							method:'GET',
							url: pic1f,
							onload: function(responseDetails) {
								if(responseDetails.status == 200) {
									var pic1 = responseDetails.responseText;
									var len1 = pic1.length;
									if (len1 == len2) {
										if (zeit > 2) {
											//window.clearTimeout(interval);
											window.clearInterval(interval);
										}
										GM_setValue("alarm_"+name, jetzt);
										GM_setValue("delay", jetzt);
										play_sound(soundfile, volume);
									}}}});}}});}}}
			
	// holt Zeitstempel
function zeit_holen() {
	var jetzt = new Date();
	return parseInt(jetzt.getTime() / 1000);
}

	// zeigt Optionen
function optionen() {
	var pos = Doc.getElementById("Glocke");
	var Optionen = Doc.createElement("table");
	Optionen.setAttribute("id","options");
	Optionen.setAttribute("class", "main");
	Optionen.setAttribute("style", "padding: 5px;");
	var tbody = Doc.createElement('tbody');
	var tr = Doc.createElement('tr');
	var td = Doc.createElement('td');
	var th = Doc.createElement('th');
	th.setAttribute("style", "text-align: center");
	th.appendChild(Doc.createTextNode(Text1)); 		// Title: Sound Options
	var table = Doc.createElement("table");
	table.setAttribute("class","vis");
	table.appendChild(th);
// Sound on
	var row0 = Doc.createElement("tr");
	var td0 = Doc.createElement("td");
	var check0 = Doc.createElement("input");
	check0.setAttribute("type","checkbox");
	check0.setAttribute("name","sound_on");
	check0.checked = sound_on;
	check0.addEventListener("change",function() {
		GM_setValue("sound_on", this.checked);
		sound_on = GM_getValue("sound_on");
	},false);
	td0.appendChild(check0);
	var img0 = Doc.createElement("img");
	img0.setAttribute("width", "17");
	img0.setAttribute("style", "vertical-align: bottom");
	img0.src = picsndon;
	td0.appendChild(img0);
	td0.appendChild(Doc.createTextNode(Text2));		// Sound an/aus
	row0.appendChild(td0);
	table.appendChild(row0);
// repeat time
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row1 = Doc.createElement("tr");
	var td1 = Doc.createElement("td");
	var check1 = Doc.createElement("input");
	check1.setAttribute("type","text");
	check1.setAttribute("style", "text-align: center");
	check1.setAttribute("name", "zeitspanne");
 	check1.value = zeit;
	check1.setAttribute("size","1");
	check1.setAttribute("maxlength", "2");
	check1.setAttribute("method", "post");
	check1.setAttribute("enctype", "multipart/form-data");
	check1.addEventListener("change",function() {
		if (this.value < 1) {
			this.value = 10;
		} 
		GM_setValue("zeit", parseInt(this.value, 10));
		zeit = GM_getValue("zeit");
	},false);
	td1.appendChild(Doc.createTextNode(Text3));
	td1.appendChild(check1);
	td1.appendChild(Doc.createTextNode(Text14));
	row1.appendChild(td1);
	table.appendChild(row1);
// inc main account
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row5 = Doc.createElement("tr");
	var td5 = Doc.createElement("td");
	check5 = Doc.createElement("input");
	check5.setAttribute("type", "checkbox");
	check5.setAttribute("name", "sound1_on");
	check5.checked = sound1_on;
	check5.addEventListener("change",function() {
		GM_setValue("sound1_on", this.checked);
		sound1_on = GM_getValue("sound1_on");
	},false);
	td5.appendChild(check5);
	var img5 = Doc.createElement("img");
	img5.setAttribute("width", "17");
	img5.src = "./graphic/unit/att.png";
	td5.appendChild(img5);
	var check51 = Doc.createElement("input");
	check51.setAttribute("type","text");
	check51.setAttribute("style", "text-align: center");
	check51.setAttribute("name", "sound1_vol");
	check51.value = sound1_vol;
	check51.setAttribute("size", "2");
	check51.setAttribute("maxlength", "3");
	check51.setAttribute("method", "post");
	check51.setAttribute("enctype", "multipart/form-data");
	check51.addEventListener("change",function() {
		sound1_vol = check_vol("sound1_vol", this.value);
	},false);
	td5.appendChild(Doc.createTextNode(Text4)); 		// volume
	td5.appendChild(check51);
	td5.appendChild(Doc.createTextNode("% "));
	var test5 = Doc.createElement("input");
	test5.setAttribute("type","image");
	test5.setAttribute("style", "vertical-align: middle");
	test5.setAttribute("src", stest);
	test5.setAttribute("title", "Testar Som");
	test5.addEventListener("click",function() {
		play_sound(sound1, sound1_vol);
	},true);
	td5.appendChild(test5);
	td5.appendChild(Doc.createTextNode(Text5));		// attack main account sound url
	row5.appendChild(td5);
	table.appendChild(row5);
	var row50 = Doc.createElement("tr");
	var td50 = Doc.createElement("td");
	var check50 = Doc.createElement("input");
	check50.setAttribute("type","text");
	check50.setAttribute("style", "text-align: left");
	check50.setAttribute("name", "sound1");
	check50.value = sound1;
	check50.setAttribute("size","92");
	check50.setAttribute("maxlength", "200");
	check50.setAttribute("method", "post");
	check50.setAttribute("enctype", "multipart/form-data");
	check50.addEventListener("change",function() {
		sound1 = GM_test("sound1", this.value);
	},false);
	td50.appendChild(check50);
	row50.appendChild(td50);
	table.appendChild(row50);
// inc hr account
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row6 = Doc.createElement("tr");
	var td6 = Doc.createElement("td");
	check6 = Doc.createElement("input");
	check6.setAttribute("type", "checkbox");
	check6.setAttribute("name", "sound2_on");
	check6.checked = sound2_on;
	check6.addEventListener("change",function() {
		GM_setValue("sound2_on", this.checked);
		sound2_on = GM_getValue("sound2_on");
	},false);
	td6.appendChild(check6);
	var img6 = Doc.createElement("img");
	img6.setAttribute("width", "17");
	img6.src = "./graphic/unit/att.png";
	td6.appendChild(img6);
	var check61 = Doc.createElement("input");
	check61.setAttribute("type","text");
	check61.setAttribute("style", "text-align: center");
	check61.setAttribute("name", "sound2_vol");
	check61.value = sound2_vol;
	check61.setAttribute("size", "2");
	check61.setAttribute("maxlength", "3");
	check61.setAttribute("method", "post");
	check61.setAttribute("enctype", "multipart/form-data");
	check61.addEventListener("change",function() {
		sound2_vol = check_vol("sound2_vol", this.value);
	},false);
	td6.appendChild(Doc.createTextNode(Text4)); 		// volume
	td6.appendChild(check61);
	td6.appendChild(Doc.createTextNode("% "));
	var test6 = Doc.createElement("input");
	test6.setAttribute("type","image");
	test6.setAttribute("style", "vertical-align: middle");
	test6.setAttribute("src", stest);
	test6.setAttribute("title", "Testar Som");
	test6.addEventListener("click",function() {
		play_sound(sound2, sound2_vol);
	},true);
	td6.appendChild(test6);
	td6.appendChild(Doc.createTextNode(Text6));  	//attack HR-account sound url
	row6.appendChild(td6);
	table.appendChild(row6);
	row6.appendChild(td6);
	table.appendChild(row6);
	var row60 = Doc.createElement("tr");
	var td60 = Doc.createElement("td");
	var check60 = Doc.createElement("input");
	check60.setAttribute("type","text");
	check60.setAttribute("style", "text-align: left");
	check60.setAttribute("name", "sound2");
	check60.value = sound2;
	check60.setAttribute("size","92");
	check60.setAttribute("maxlength", "200");
	check60.setAttribute("method", "post");
	check60.setAttribute("enctype", "multipart/form-data");
	check60.addEventListener("change",function() {
		sound2 = GM_test("sound2", this.value);
	},false);
	td60.appendChild(check60);
	row60.appendChild(td60);
	table.appendChild(row60);
// loop incs sound
	var row8 = Doc.createElement("tr");
	var td8 = Doc.createElement("td");
	var check8 = Doc.createElement("input");
	check8.setAttribute("type","checkbox");
	check8.setAttribute("name","loop");
	check8.checked = GM_getValue("loop");
	check8.addEventListener("change",function() {
		GM_setValue("loop", this.checked); 
		loop = GM_getValue("loop");
	},false);
	td8.appendChild(check8);
	var img8 = Doc.createElement("img");
	img8.src = "./graphic/unit/att.png";
	td8.appendChild(img8);
	td8.appendChild(Doc.createTextNode(Text7));	// loop attack sound?
	row8.appendChild(td8);
	table.appendChild(row8);
// inc arrived
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row7 = Doc.createElement("tr");
	var td7 = Doc.createElement("td");
	check7 = Doc.createElement("input");
	check7.setAttribute("type", "checkbox");
	check7.setAttribute("name", "sound3_on");
	check7.checked = sound3_on;
	check7.addEventListener("change",function() {
		GM_setValue("sound3_on", this.checked);
		sound3_on = GM_getValue("sound3_on");
	},false);
	td7.appendChild(check7);
	var img7 = Doc.createElement("img");
	img7.setAttribute("width", "17");
	img7.src = "./graphic/command/cancel.png";
	td7.appendChild(img7);
	var check71 = Doc.createElement("input");
	check71.setAttribute("type","text");
	check71.setAttribute("style", "text-align: center");
	check71.setAttribute("name", "sound3_vol");
	check71.value = sound3_vol;
	check71.setAttribute("size", "2");
	check71.setAttribute("maxlength", "3");
	check71.setAttribute("method", "post");
	check71.setAttribute("enctype", "multipart/form-data");
	check71.addEventListener("change",function() {
		sound3_vol = check_vol("sound3_vol", this.value);
	},false);
	td7.appendChild(Doc.createTextNode(Text4)); 		// volume
	td7.appendChild(check71);
	td7.appendChild(Doc.createTextNode("% "));
	var test7 = Doc.createElement("input");
	test7.setAttribute("type","image");
	test7.setAttribute("style", "vertical-align: middle");
	test7.setAttribute("src", stest);
	test7.setAttribute("title", "Testar Som");
	test7.addEventListener("click",function() {
		play_sound(sound3, sound3_vol);
	},true);
	td7.appendChild(test7);
	td7.appendChild(Doc.createTextNode(Text8));		// attack end sound url
	row7.appendChild(td7);
	table.appendChild(row7);
	var row70 = Doc.createElement("tr");
	var td70 = Doc.createElement("td");
	var check70 = Doc.createElement("input");
	check70.setAttribute("type","text");
	check70.setAttribute("style", "text-align: left");
	check70.setAttribute("name", "sound3");
	check70.value = sound3;
	check70.setAttribute("size","92");
	check70.setAttribute("maxlength", "200");
	check70.setAttribute("method", "post");
	check70.setAttribute("enctype", "multipart/form-data");
	check70.addEventListener("change",function() {
		sound3 = GM_test("sound3", this.value);
	},false);
	td70.appendChild(check70);
	row70.appendChild(td70);
	table.appendChild(row70);
// igm
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row4 = Doc.createElement("tr");
	var td4 = Doc.createElement("td");
	check4 = Doc.createElement("input");
	check4.setAttribute("type", "checkbox");
	check4.setAttribute("name", "sound_nm_on");
	check4.checked = sound_nm_on;
	check4.addEventListener("change",function() {
		GM_setValue("sound_nm_on", this.checked);
		sound_nm_on = GM_getValue("sound_nm_on");
	},false);
	td4.appendChild(check4);
	var img4 = Doc.createElement("img");
	img4.setAttribute("width", "17");
	img4.src = "./graphic/new_mail.png";
	td4.appendChild(img4);
	var check41 = Doc.createElement("input");
	check41.setAttribute("type","text");
	check41.setAttribute("style", "text-align: center");
	check41.setAttribute("name", "sound_nm_vol");
	check41.value = sound_nm_vol;
	check41.setAttribute("size", "2");
	check41.setAttribute("maxlength", "3");
	check41.setAttribute("method", "post");
	check41.setAttribute("enctype", "multipart/form-data");
	check41.addEventListener("change",function() {
		sound_nm_vol = check_vol("sound_nm_vol", this.value);
	},false);
	td4.appendChild(Doc.createTextNode(Text4)); 		//volume
	td4.appendChild(check41);
	td4.appendChild(Doc.createTextNode("% "));
	var test4 = Doc.createElement("input");
	test4.setAttribute("type","image");
	test4.setAttribute("style", "vertical-align: middle");
	test4.setAttribute("src", stest);
	test4.setAttribute("title", "Testar Som");
	test4.addEventListener("click",function() {
		play_sound(sound_nm, sound_nm_vol);
	},true);
	td4.appendChild(test4);
	td4.appendChild(Doc.createTextNode(Text9));		// message sound url
	row4.appendChild(td4);
	table.appendChild(row4);
	var row40 = Doc.createElement("tr");
	var td40 = Doc.createElement("td");
	var check40 = Doc.createElement("input");
	check40.setAttribute("type","text");
	check40.setAttribute("style", "text-align: left");
	check40.setAttribute("name", "sound_nm");
	check40.value = sound_nm;
	check40.setAttribute("size","92");
	check40.setAttribute("maxlength", "200");
	check40.setAttribute("method", "post");
	check40.setAttribute("enctype", "multipart/form-data");
	check40.addEventListener("change",function() {
		sound_nm = GM_test("sound_nm", this.value);
	},false);
	td40.appendChild(check40);
	row40.appendChild(td40);
	table.appendChild(row40);
// report
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row3 = Doc.createElement("tr");
	var td3 = Doc.createElement("td");
	check3 = Doc.createElement("input");
	check3.setAttribute("type", "checkbox");
	check3.setAttribute("name", "sound_nr_on");
	check3.checked = sound_nr_on;
	check3.addEventListener("change",function() {
		GM_setValue("sound_nr_on", this.checked);
		sound_nr_on = GM_getValue("sound_nr_on");
	},false);
	td3.appendChild(check3);
	var img3 = Doc.createElement("img");
	img3.setAttribute("width", "17");
	img3.src = "./graphic/new_report.png";
	td3.appendChild(img3);
	var check31 = Doc.createElement("input");
	check31.setAttribute("type","text");
	check31.setAttribute("style", "text-align: center");
	check31.setAttribute("name", "sound_nr_vol");
	check31.value = sound_nr_vol;
	check31.setAttribute("size", "2");
	check31.setAttribute("maxlength", "3");
	check31.setAttribute("method", "post");
	check31.setAttribute("enctype", "multipart/form-data");
	check31.addEventListener("change",function() {
		sound_nr_vol = check_vol("sound_nr_vol", this.value);
	},false);
	td3.appendChild(Doc.createTextNode(Text4)); 		// volume
	td3.appendChild(check31);
	td3.appendChild(Doc.createTextNode("% "));
	var test3 = Doc.createElement("input");
	test3.setAttribute("type","image");
	test3.setAttribute("style", "vertical-align: middle");
	test3.setAttribute("src", stest);
	test3.setAttribute("title", "Testar Som");
	test3.addEventListener("click",function() {
		play_sound(sound_nr, sound_nr_vol);
	},true);
	td3.appendChild(test3);
	td3.appendChild(Doc.createTextNode(Text10));		// report sound url
	row3.appendChild(td3);
	table.appendChild(row3);
	var row30 = Doc.createElement("tr");
	var td30 = Doc.createElement("td");
	var check30 = Doc.createElement("input");
	check30.setAttribute("type","text");
	check30.setAttribute("style", "text-align: left");
	check30.setAttribute("name", "sound_nr");
	check30.value = sound_nr;
	check30.setAttribute("size","92");
	check30.setAttribute("maxlength", "200");
	check30.setAttribute("method", "post");
	check30.setAttribute("enctype", "multipart/form-data");
	check30.addEventListener("change",function() {
		sound_nr = GM_test("sound_nr", this.value);
	},false);
	td30.appendChild(check30);
	row30.appendChild(td30);
	table.appendChild(row30);
// forum
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row2 = Doc.createElement("tr");
	var td2 = Doc.createElement("td");
	var check2 = Doc.createElement("input");
	check2.setAttribute("type", "checkbox");
	check2.setAttribute("name", "sound_nf_on");
	check2.checked = sound_nf_on;
	check2.addEventListener("change",function() {
		GM_setValue("sound_nf_on", this.checked);
		sound_nf_on = GM_getValue("sound_nf_on");
	},false);
	td2.appendChild(check2);
	var img2 = Doc.createElement("img");
	img2.setAttribute("width", "16");
	img2.src = "./graphic/ally_forum.png";
	td2.appendChild(img2);
	var check21 = Doc.createElement("input");
	check21.setAttribute("type","text");
	check21.setAttribute("style", "text-align: center");
	check21.setAttribute("name", "sound_nf_vol");
	check21.value = sound_nf_vol;
	check21.setAttribute("size", "2");
	check21.setAttribute("maxlength", "3");
	check21.setAttribute("method", "post");
	check21.setAttribute("enctype", "multipart/form-data");
	check21.addEventListener("change",function() {
		sound_nf_vol = check_vol("sound_nf_vol", this.value);
	},false);
	td2.appendChild(Doc.createTextNode(Text4)); 		// volume
	td2.appendChild(check21);
	td2.appendChild(Doc.createTextNode("% "));
	var test2 = Doc.createElement("input");
	test2.setAttribute("type","image");
	test2.setAttribute("style", "vertical-align: middle");
	test2.setAttribute("src", stest);
	test2.setAttribute("title", "Testar Som");
	test2.addEventListener("click",function() {
		play_sound(sound_nf, sound_nf_vol);
	},true);
	td2.appendChild(test2);
	td2.appendChild(Doc.createTextNode(Text11));		// forum sound url
	row2.appendChild(td2);
	table.appendChild(row2);
	var row20 = Doc.createElement("tr");
	var td20 = Doc.createElement("td");
	var check20 = Doc.createElement("input");
	check20.setAttribute("type","text");
	check20.setAttribute("style", "text-align: left");
	check20.setAttribute("name", "sound_nf");
	check20.value = sound_nf;
	check20.setAttribute("size","92");
	check20.setAttribute("maxlength", "200");
	check20.setAttribute("method", "post");
	check20.setAttribute("enctype", "multipart/form-data");
	check20.addEventListener("change",function() {
		sound_nf = GM_test("sound_nf", this.value);
	},false);
	td20.appendChild(check20);
	row20.appendChild(td20);
	table.appendChild(row20);
//forum DSphpBB
	if (dsphpbb) {
		var row10 = Doc.createElement("tr");
		var td10 = Doc.createElement("td");
		var check10 = Doc.createElement("input");
		check10.setAttribute("type","text");
		check10.setAttribute("style", "text-align: left");
		check10.setAttribute("name", "forum");
 		check10.value = forum;
		check10.setAttribute("size","65");
		check10.setAttribute("maxlength", "200");
		check10.setAttribute("method", "post");
		check10.setAttribute("enctype", "multipart/form-data");
		check10.addEventListener("change",function() {
			forum = GM_test("dsphpbb_adr"+welt+uv, this.value);
		},false);
		td10.appendChild(Doc.createTextNode(Text12));	// forum url
		td10.appendChild(check10);
		var img10a = Doc.createElement("img");
		img10a.setAttribute("width", "17");
		img10a.src = forum + "images/ds/ds_nonewpost.gif";
		var img10b = Doc.createElement("img");
		img10b.setAttribute("width", "17");
		img10b.src = forum + "images/ds/ds_newpost.gif";
		td10.appendChild(Doc.createTextNode(" "));
		td10.appendChild(img10a);
		td10.appendChild(Doc.createTextNode(" "));
		td10.appendChild(img10b);
		row10.appendChild(td10);
		table.appendChild(row10);
	}
// password refresh sound
	rowx = Doc.createElement("tr");
	tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row64 = Doc.createElement("tr");
	var td64 = Doc.createElement("td");
	var check66 = Doc.createElement("input");
	check66.setAttribute("type", "checkbox");
	check66.setAttribute("name", "sound4_on");
	check66.checked = sound4_on;
	check66.addEventListener("change", function () {
		GM_setValue("sound4_on", this.checked);
		sound4_on = GM_getValue("sound4_on");
	}, false);
	td64.appendChild(check66);
	var img64 = Doc.createElement("img");
	img64.setAttribute("width", "17");
	img64.src = "./graphic/rabe.png";
	td64.appendChild(img64);
	var check67 = Doc.createElement("input");
	check67.setAttribute("type", "text");
	check67.setAttribute("style", "text-align: center");
	check67.setAttribute("name", "sound4_vol");
	check67.value = sound4_vol;
	check67.setAttribute("size", "2");
	check67.setAttribute("maxlength", "3");
	check67.setAttribute("method", "post");
	check67.setAttribute("enctype", "multipart/form-data");
	check67.addEventListener("change", function () {
		sound4_vol = check_vol("sound4_vol", this.value);
	}, false);
	td64.appendChild(Doc.createTextNode(Text4)); 		// volume
	td64.appendChild(check67);
	td64.appendChild(Doc.createTextNode("% "));
	var test68 = Doc.createElement("input");
	test68.setAttribute("type", "image");
	test68.setAttribute("style", "vertical-align: middle");
	test68.setAttribute("src", stest);
	test68.setAttribute("title", "Testar Som");
	test68.addEventListener("click", function () {
		play_sound(sound4, sound4_vol);
	}, true);
	td64.appendChild(test68);
	td64.appendChild(Doc.createTextNode(Text13));  	//pw refresh sound url
	row64.appendChild(td64);
	table.appendChild(row64);
	row64.appendChild(td64);
	table.appendChild(row64);
	var row65 = Doc.createElement("tr");
	var td65 = Doc.createElement("td");
	var check65 = Doc.createElement("input");
	check65.setAttribute("type", "text");
	check65.setAttribute("style", "text-align: left");
	check65.setAttribute("name", "sound4");
	check65.value = sound4;
	check65.setAttribute("size", "92");
	check65.setAttribute("maxlength", "200");
	check65.setAttribute("method", "post");
	check65.setAttribute("enctype", "multipart/form-data");
	check65.addEventListener("change", function () {
		sound4 = GM_test("sound4", this.value);
	}, false);
	td65.appendChild(check65);
	row65.appendChild(td65);
	table.appendChild(row65);

var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
rowx.appendChild(tdx);
	table.appendChild(rowx);
	tdx.appendChild(Doc.createTextNode(Text15));

// submit
	var row9 = Doc.createElement("p");
	row9.setAttribute("align", "right");
	var check9 = Doc.createElement("input");
	check9.setAttribute("type","submit");
	check9.addEventListener("click",function() {
		Loc.reload();
	},false);
	row9.appendChild(check9);
	table.appendChild(row9);
	td.appendChild(table);
	tr.appendChild(td);
	tbody.appendChild(tr);
	Optionen.appendChild(tbody);
	pos.replaceChild(Optionen, pos.firstChild);
}

function check_vol(name, wert) {
	wert = parseInt(wert, 10);
	if (isNaN(wert)) {
		wert = 70;
	}
	else if ((wert <= 0) || (wert >= 100)) {
		wert = 100;
	}
	else if (wert < 5) {
		wert = 10;
	}
	GM_setValue(name, wert);
	return wert;
}

function GM_test(name, url) {
	var test;
	var GM = GM_getValue(name);
	if (url == "0") {
		if (GM != "") {
			GM = http(name, GM);
			if (GM) {
				return GM;
			}}
		url = "";
	}
	else	{
		if (url != "") {
			test = http(name, url);
			if (test) {
				GM_setValue(name, test);
				return test;
			}}
		url = "";
	}

	if (url == "")	{
		switch (name)
		{
			case "dsphpbb_adr"+welt+uv:
				url = "";
				break;
			case "sound_nf":
				url = "http://www.wav-sounds.com/vehicle/train.wav";
				break;
			case "sound_nr":
				url = "http://www.pacdv.com/sounds/interface_sound_effects/sound107.wav";
				break;
			case "sound_nm":
				url = "http://www.wav-sounds.com/mail/mailbox.wav";
				break;
			case "sound1":
				url = "http://www.policeinterceptor.com/sounds/newgq.wav";
				break;
			case "sound2":
				url = "http://www.acoustica.com/sounds/user_requests/policesiren2.wav";
				break;
			case "sound3":
				url = "http://www.mediacollege.com/downloads/sound-effects/star-trek/tos/tos-intercom.wav";
				break;
			case "sound4":
				url = "http://www.mediacollege.com/downloads/sound-effects/star-trek/voy/voy-comp-01.wav";
				break;
			default:
				return "";
				break;
		}
		GM_setValue(name, url);
		return url;
	}
	else {
		test = http(name, url);
		if (test) {
			GM_setValue(name, test);
			return test;
		}}}

function http(name, url){
	var test
	try {
		test = url.match(/http\:\/\//)[0];
	} catch(e) {test = '';}

	if (test) {
		if (name == "dsphpbb_adr"+welt+uv) {
			url = test_slash(url);
		}
		return url;
	}
	else {
		if (url && url.length > 14) {
			if (name == "dsphpbb_adr"+welt+uv) {
				url = test_slash(url);
			}
			url = "http://"+url;
			return url;
		}}
	return false;
}

function test_slash(url){
	if  (url) {
		if (url.substr(1,url.length) != "/"){url = url + "/"; }
	}
	return url;
}

	// bindet Grafik Glocke ein
function grafik() {
	var test = Body.match(/navi-border/)[0]; 	// DS-Version >= 5.x?
	var glocke = Doc.createElement('td');
	glocke.setAttribute("id", "Glocke");
	glocke.setAttribute("align", "center");
	var table = Doc.createElement('table');
	table.setAttribute("class", "box");
	table.setAttribute("cellspacing", "0");
	if (Body.match(/itlogge/)) test=""; 
	var tbody = Doc.createElement('tbody');
	var tr = Doc.createElement('tr');
	var td = Doc.createElement('td');
	td.setAttribute("width", "16");
	td.setAttribute("height","20");
	var a = Doc.createElement('a');
	a.setAttribute("id", "Alarm");
	a.setAttribute("href", "javascript: ");
	a.addEventListener("click", function() {
		if (test) {
			rtable.setAttribute("class", "content-border");
		} optionen();
	}, false);

	var img = Doc.createElement('img');
	img.setAttribute("title", "Configurações do Som");
	if (sound_on) {
		img.setAttribute("alt", "on");
		img.src = picsndon;
	}
	else {
		img.setAttribute("alt", "off");
		img.src = picsndoff;
	}
	a.appendChild(img);
	td.appendChild(a);
	tr.appendChild(td);
	tbody.appendChild(tr);
	table.appendChild(tbody);
	glocke.appendChild(table);

	if (test) {		// is DS-Version >= 5.x?
		var glocke1 = Doc.createElement('td');
		glocke1.setAttribute("align", "center");
		var rtable = Doc.createElement('table');
		rtable.setAttribute("style", "border-collapse: collapse;");
		rtable.setAttribute("class", "navi-border");
		var rtbody = Doc.createElement('tbody');
		var rtr = Doc.createElement('tr');
		rtr.appendChild(glocke);
		rtbody.appendChild(rtr);
		rtable.appendChild(rtbody);
		glocke1.appendChild(rtable);
		var line = Doc.getElementsByTagName("hr");
		var pos1 = line[0].nextSibling.nextSibling.firstChild.nextSibling.firstChild;
		var pos2 = pos1.firstChild.nextSibling.nextSibling.nextSibling;
		pos1.insertBefore(glocke1, pos2);
	}
	else {
		var pos = Doc.getElementsByClassName("box");
		var pos1 = pos[0].parentNode.parentNode;
		var pos2 = pos1.firstChild;
		pos1.insertBefore(glocke, pos2);
	}}

function attacksound() {
	loop = GM_getValue("loop", false);
	if (uv) {
		if (sound2_on) { play_sound(sound2, sound2_vol);}
	}
	else {
		if (sound1_on) { play_sound(sound1, sound1_vol);}
	}
	loop = false;
}

	// spielt Sound
function play_sound(soundfile, volume) {
	if (soundfile == "") return;
	volume = parseInt(volume, 10);
	if (sound_on) {
		var arr = soundfile.split('.');
		var typ = arr[arr.length-1];
		var buffer = Doc.createElement('embed');
		buffer.setAttribute("title", "Sound");
		buffer.setAttribute("src", soundfile);
		buffer.setAttribute("autostart", "true");
		buffer.setAttribute("autoplay", "true");
		buffer.setAttribute("cache", "true");
		buffer.setAttribute("hidden", "true");
		buffer.setAttribute("width", "0");
		buffer.setAttribute("height", "0");
		buffer.setAttribute("loop", loop);
		buffer.setAttribute("volume", volume);
		if (typ == 'wav') buffer.setAttribute("type", 'audio/x-wav');
		else if (typ == 'midi') buffer.setAttribute("type", 'audio/mid');
		else if (typ == 'mp3') buffer.setAttribute("type", 'audio/mpeg');
		else if (typ == 'wma') buffer.setAttribute("type", 'audio/x-ms-wma');
		Doc.body.appendChild(buffer);
	}}

function refresh_p() {
	if (sound4_on) {
		loop = GM_getValue("loop", true);
		play_sound(sound4, sound4_vol);
	}
	loop = false;
}

	// sucht Classnames
function getElementsByClassName(classname) {
	var arr = [];
	var reg = new RegExp('\\b' + classname + '\\b');
	var knoten = Doc.getElementsByTagName("body")[0];
	var elemente = knoten.getElementsByTagName("*");
	for(var i=0; i<elemente.length; i++) {
		if (reg.test(elemente[i].className)) {
			arr.push(elemente[i]);
		}}
	return arr;
}}) ()

// ------------------------------------------------------------------------
// Barra Premium para Tribal Wars
//-------------------------------------------------------------------------

tableIdIndex = 0;
trIdIndex = 0;
tdIdIndex = 0;

if(String(document.location).indexOf() < 0){
if(String(document.location).indexOf() < 0){
if(String(document.location).indexOf() > -1){
    window.setTimeout(function(){
	var adDiv = document.body.childNodes[5].childNodes[1].childNodes[0].childNodes[1].childNodes[5];
	 if(adDiv.childNodes[1] == "[object XPCNativeWrapper [object HTMLIFrameElement]]"){
		document.body.childNodes[5].childNodes[1].childNodes[0].childNodes[1].removeChild(adDiv);
	 }
	}, 500);
}
else{
window.setTimeout(function() {
// Remover publicidade (deve ser feito primeiro, que o quadro principal "pode ser definido):
if(document.getElementsByTagName("frameset")[0]){

}else Hauptframe = document;
// Get ID da Vila
 var rawVillId = String(Hauptframe.location);
 VillId = rawVillId.substring(rawVillId.indexOf("village=")+8, rawVillId.indexOf("&"));
// Create Quickbar
 createQuickbarTable();
 createQuickbarShortcuts();
// Remove advertisements no Fórum

}, 500)}}}

window.imagens = function(imgSrc, atitle, aHref, text){
	var newImg = document.createElement("img");
	newImg.setAttribute("src", imgSrc);
	newImg.setAttribute("title", atitle);
	var newA = document.createElement("a");
	newA.setAttribute("href", aHref);
	newA.appendChild(newImg);
	var newText = document.createTextNode(text);
	newA.appendChild(newText);
	var newTd = document.createElement("td");
	newTd.setAttribute("id", "myQuickbarTd"+tdIdIndex);
    newTd.setAttribute("style", "border-top: #997733 solid 1px; border-right: #FFDD99 solid 1px; border-bottom: #FFEECC solid 1px; border-left: #BB9955 solid 1px; background-color: #F7EED3; border-left-style:none; border-right-style:none; padding:3px 4px 4px 4px;"); 

	Hauptframe.getElementById("myQuickbarTr"+trIdIndex).appendChild(newTd);
	Hauptframe.getElementById("myQuickbarTd"+tdIdIndex).appendChild(newA);
	tdIdIndex++;
}

window.createQuickbarTable = function() {
	var firstHR = Hauptframe.getElementsByTagName("hr")[0];
	var newTable = document.createElement("table");
	newTable.setAttribute("id", "myQuickbarTable"+tableIdIndex);
	newTable.setAttribute("style", "margin:7px auto auto; width:460px; border-collapse:collapse; border-width:1px; border-style:solid; border-color:#997733 #FFDD99 #FFEECC #BB9955;");
	var newTr = document.createElement("tr");
	newTr.setAttribute("id", "myQuickbarTr0");
	newTr.setAttribute("align", "center");
	Hauptframe.getElementsByTagName("body")[0].insertBefore(newTable, firstHR);
	Hauptframe.getElementById("myQuickbarTable"+tableIdIndex).appendChild(newTr);
}

window.createQuickbarShortcuts = function() {

	imagens("/graphic/buildings/main.png", "Quartier Général", "/game.php?village="+VillId+"&screen=main", "");
	imagens("/graphic/buildings/barracks.png", "Caserne", "/game.php?village="+VillId+"&screen=barracks", "");
	imagens("/graphic/buildings/stable.png", "Ecurie", "/game.php?village="+VillId+"&screen=stable", "");
	imagens("/graphic/buildings/garage.png", "Atelier", "/game.php?village="+VillId+"&screen=garage", "");
    imagens("/graphic/buildings/snob.png", "Académie", "/game.php?village="+VillId+"&screen=snob", "");
	imagens("/graphic/buildings/smith.png", "Forge", "/game.php?village="+VillId+"&screen=smith", "");
	imagens("/graphic/buildings/place.png", "Point de ralliement", "/game.php?village="+VillId+"&screen=place", "");
    imagens("/graphic/buildings/market.png", "Marché", "/game.php?village="+VillId+"&screen=market", "");
	imagens("/graphic/buildings/wood.png", "Camp de bois", "/game.php?village="+VillId+"&screen=wood", "");
	imagens("/graphic/buildings/stone.png", "Carrière d'argile", "/game.php?village="+VillId+"&screen=stone", "");
	imagens("/graphic/buildings/iron.png", "Mine de fer", "/game.php?village="+VillId+"&screen=iron", "");
	imagens("/graphic/buildings/farm.png", "Ferme", "/game.php?village="+VillId+"&screen=farm", "");
	imagens("/graphic/buildings/storage.png", "Entrepôt", "/game.php?village="+VillId+"&screen=storage", "");
	imagens("/graphic/buildings/hide.png", "Cachette", "/game.php?village="+VillId+"&screen=hide", "");
	imagens("/graphic/buildings/wall.png", "Muraille", "/game.php?village="+VillId+"&screen=wall", "");
}