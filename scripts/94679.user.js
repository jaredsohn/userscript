// ==UserScript==
// @name           Ikariam Army Helper
// @version        1.1
// @namespace      GrAndAG
// @description    Ikariam Army Helper, branch of the script 59908

// @include        http://s*.ikariam.*/index.php*
// @exclude        http://s*.ikariam.*/index.php*militaryAdvisorDetailedReportView*
// @exclude        http://*support*


// @history        1.1 fix for city level 26 - thx 2 cherry
// @history        1.0 removed external scripts
// @history        0.24 removed compromised scripts
// @history        0.23 Updates due to server recent changes // last version by GrAndAG
// @history        0.22 Added italian translation
// @history        0.22 Updated latvian translation
// @history        0.21 Added "+" button to each preset to append stored amount of units to current battle set
// @history        0.21 Added option to hide row titles on battlefield preview (see Options page)
// @history        0.21 Updated polish translation
// @history        0.20 Added presets capability, so you can save/restore your favorite troops set
// @history        0.19 Added 'All' and 'None' buttons to select all units by single click
// @history        0.19 Added buttons to deployment pages as well
// @history        0.18 Added buttons to quick add/subtract units to/from single slot. Added button to fill out a single row by necessary amount of units.
// @history        0.18 Changed algorithm of gathering target city level. From clicking, which was required, to just island observing.
// @history        0.18 Corrected german translation
// @history        0.17 Corrected sea-battle fiels size. It seems it always has 5 slots in row regarddless of city level
// @history        0.16 Added hungarian translation
// @history        0.15 Added romanian translation
// @history        0.14 Added second air slot to support bombers and gyros simultaneously
// @history        0.13 Added croatian/bosnian, dutch and latvian translations
// @history        0.12 Added spanish and swedish translations; Updated greek translation
// @history        0.11 Added portuguese translation
// @history        0.10 Added arabic translation
// @history        0.9 Corrected garrison size calculation (as discovered, 1 unit takes 1 garrison place despite of its size)
// @history        0.9 Updated german translation
// @history        0.8 Added german translation
// @history        0.8 Updated polish translation
// @history        0.7 Added fleet overview to the garrison tooltip
// @history        0.7 Added fleet advisor
// @history        0.7 Corrected battlefield size for 10 level of town hall
// @history        0.7 Added polish translation
// @history        0.6 Added french and greek translations
// @history        0.5 Added tooltip to show current army when hovering garrison info on city view
// @history        0.4 Fixed bug in 3rd-party language detection procedure
// @history        0.3 Added turkish translation
// @history        0.2 Added gathering info from barracks page
// @history        0.2 Added army advisor on plunder page
// @history        0.1 Initial release
// ==/UserScript==

//-----------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------
// update part 
var scriptName = "Ikariam Army Helper"
var scriptID = 94679;
var thisVersion="1.1";
var update = "all" // change this if minor updates should be notified

function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	var time="";
	if (thisVersion == GM_getValue("thisVersion","")) { time += new Date().getDate() }
	else { GM_setValue("thisVersion",thisVersion) };
	if (lastUpdateCheck != time)
	{	GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				var regex = /\bversion\b\s*(\d+)\.(\d+)s*/.exec(response.responseText);
				if (regex) {
					newestVersion = regex[1]+"."+regex[2];
					GM_setValue("lastUpdateCheck", time);
					GM_setValue("newestVersion", newestVersion);
				}
			}	
		});
	};
	var needsUpdate;
	if (update == "system") { needsUpdate = (thisVersion.split(".")[0]) != (newestVersion.split(".")[0]) }
	else { needsUpdate = thisVersion != newestVersion }
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (needsUpdate) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>' }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>' };
	return innerHTML;
};

//-----------------------------------------------------------------------------

const languages = {
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "arabic":       { garrison: "القوات العسكرية", advisor: "المستشار", cityLevel: "مستوى دار البلدية", support: "مساعدة",
                    artillery: "المدافع", air: "طيران", line1: "الخط الأمامي", line2: "معركة طويلة المدى", 
                    flankLeft: "الجناح الأيسر", flankRight: "الجناح الأيمن", submarine: "غواصة", reserve: "احتياطي",    
                    phalanx: "كتيبة", steamgiant: "عملاق بخاري", spearman: "حامل الرمح", swordsman: "مبارز", slinger: "مقلاع حجارة",    
                    archer: "رامي سهام", marksman: "رماة", ram: "مدق", catapult: "منجنيق", mortar: "هاون",    
                    gyrocopter: "طائرة مروحية", bombardier: "قاصف", cook: "طباخ", medic: "طبيب",    
                    ship_ram: "سفينة مزودة بقوة دفع", ship_flamethrower: "قاذف اللهب", ship_steamboat: "قوة دفع الطارة",
                    ship_ballista: "سفينة حاملة لسلاح المرجام", ship_catapult: "سفينة مزودة بمنجنيق", ship_mortar: "سفينة هاون", 
                    ship_submarine: "غواصة",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "bosnian":      { garrison: "Garnizon", advisor: "Savjetnik", cityLevel: "Gradski Level", support: "Podrška", 
                    artillery: "Artiljerija", air: "Zračne jedinice", line1: "Prva borbena linija", line2: "Linija borbe sa distance", 
                    flankLeft: "Lijevi bok", flankRight: "Desni bok", submarine: "Pomorska", reserve: "Rezerva", 
                    phalanx: "Kopljanik", steamgiant: "Željezni div", spearman: "Bacač koplja", swordsman: "Mačevalac", slinger: "Praćkar",
                    archer: "Strijelac", marksman: "Sumforni Mušketar", ram: "Ovan", catapult: "Katapult", mortar: "Minobacač", 
                    gyrocopter: "Girokopter", bombardier: "Bombarder", cook: "Kuhar", medic: "Doktor", 
                    ship_ram: "Brod Ovan", ship_flamethrower: "Vatreni Brod", ship_steamboat: "Parni Ratni Brod", 
                    ship_ballista: "Brod Kopljar", ship_catapult: "Brod Katapult", ship_mortar: "Brod Minobacač", 
                    ship_submarine: "Podmornica",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "bulgarian":    { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "chinese":      { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "czech":        { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "danish":       { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "dutch":        { garrison: "Garnizoen", advisor: "Adviseur", cityLevel: "Stadsgrootte", support: "Ondersteuning", 
                    artillery: "Artillerie", air: "Lucht", line1: "Front linie", line2: "Lange afstands gevechtslinie", 
                    flankLeft: "Linker flank", flankRight: "Rechter flank", submarine: "Duikboten", reserve: "Reserves", 
                    phalanx: "Hopliet", steamgiant: "Stoomreus", spearman: "Speerwerper", swordsman: "Zwaardvechter", slinger: "Steenslinger", 
                    archer: "Boogschutter", marksman: "Zwavel schutter", ram: "Ram", catapult: "Katapult", mortar: "Mortier", 
                    gyrocopter: "Gyrocopter", bombardier: "Bombardier", cook: "Kok", medic: "Dokter", 
                    ship_ram: "Ramschip", ship_flamethrower: "Vuurschip", ship_steamboat: "Schepradram", 
                    ship_ballista: "Ballista Schip", ship_catapult: "Katapult Schip", ship_mortar: "Mortier Schip", 
                    ship_submarine: "Onderzeeër",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "english":      { garrison: "Garrison", advisor: "Advisor", cityLevel: "Town level", support: "Support", 
                    artillery: "Artillery", air: "Air", line1: "Front line", line2: "Long-range battle line", 
                    flankLeft: "Left flank", flankRight: "Right flank", submarine: "Submarine", reserve: "Reserve",
                    phalanx: "Phalanx", steamgiant: "Steam giant", spearman: "Spearman", swordsman: "Swordsman", slinger: "Slinger",
                    archer: "Archer", marksman: "Marksman", ram: "Ram", catapult: "Catapult", mortar: "Mortar",
                    gyrocopter: "Gyrocopter", bombardier: "Bombardier", cook: "Cook", medic: "Medic",
                    ship_ram: "Ram-Ship", ship_flamethrower: "Fire Ship", ship_steamboat: "Paddle-Wheel-Ram", 
                    ship_ballista: "Ballista Ship", ship_catapult: "Catapult Ship", ship_mortar: "Mortar Ship", 
                    ship_submarine: "Diving Boat",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "finish":       { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "french":       { garrison: "Garnison", advisor: "Conseiller", cityLevel: "Niveau ville ", support: "Support", 
                    artillery: "Artillerie", air: "Unité aérienne", line1: "Ligne de front ", line2: "Ligne de bataille de longue portée", 
                    flankLeft: "Flanc gauche", flankRight: "Flanc droit", submarine: "Submarine", reserve: "Réserve", 
                    phalanx: "Phalange", steamgiant: "Géant à vapeur", spearman: "Lancier", swordsman: "Épéiste", slinger: "Lance pierre",
                    archer: "Archer", marksman: "Tireur d'élite", ram: "Bélier", catapult: "Catapulte", mortar: "Mortier", 
                    gyrocopter: "Gyrocoptère", bombardier: "Bombardier", cook: "Cuisiner", medic: "Médecin",
                    ship_ram: "Ram-Ship", ship_flamethrower: "Fire Ship", ship_steamboat: "Paddle-Wheel-Ram", 
                    ship_ballista: "Ballista Ship", ship_catapult: "Catapult Ship", ship_mortar: "Mortar Ship", 
                    ship_submarine: "Diving Boat",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "german":       { garrison: "Garnison", advisor: "Berater", cityLevel: "Stadtgröße", support: "Unterstützung",
                    artillery: "Artillerie", air: "Luft", line1: "Hauptkampflinie", line2: "Fernkampfreihe", 
                    flankLeft: "linke Flanke", flankRight: "rechte Flanke", submarine: "U-Boot", reserve: "Reserve",
                    phalanx: "Hoplit", steamgiant: "Dampfgigant", spearman: "Speerträger", swordsman: "Schwertkämpfer", slinger: "Steinschleuderer",
                    archer: "Bogenschütze", marksman: "Schwefelbüchsen-Schütze", ram: "Ramme", catapult: "Katapult", mortar: "Mörser",
                    gyrocopter: "Gyrokopter", bombardier: "Bombardier", cook: "Koch", medic: "Arzt",
                    ship_ram: "Rammschiff", ship_flamethrower: "Feuerschiff", ship_steamboat: "Schaufelradramme",
                    ship_ballista: "Ballistaschiff", ship_catapult: "Katapultschiff", ship_mortar: "Mörserschiff",
                    ship_submarine: "Tauchboot",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "greek":        { garrison: "Φρουρά", advisor: "Σύμβουλος", cityLevel: "Επίπεδο Πόλης", support: "Μονάδες Υποστήριξης",
                    artillery: "Μονάδες Πυροβολικού", air: "Εναέριες Μονάδες", line1: "Κύρια Γραμμή Μάχης", line2: "Γραμμή Μάχης Μεγάλης Εμβέλειας",
                    flankLeft: "Αριστερή Πλευρά", flankRight: "Δεξιά Πλευρά", submarine: "Υποβρύχιες Μονάδες", reserve: "Απόθεμα",
                    phalanx: "Οπλίτης", steamgiant: "Γίγαντας Ατμού", spearman: "Εκτοξευτής Δόρατος", swordsman: "Ξιφομάχος", slinger: "Εκτοξευτής",
                    archer: "Τοξότης", marksman: "Πυροβολητής Θείου", ram: "Κριός", catapult: "Καταπέλτης", mortar: "Κονίαμα",
                    gyrocopter: "Γυροκόπτερο", bombardier: "Βομβαρδιστικό", cook: "Μάγειρας", medic: "Γιατρός",
                    ship_ram: "Σκάφος(-η) Έμβολο", ship_flamethrower: "Φλογοβόλο(-α)", ship_steamboat: "Σκάφος(-η) Κουπί-Ρόδα-Κριός", 
                    ship_ballista: "Σκάφος(-η) Βαλλιστών", ship_catapult: "Σκάφος(-η) Καταπελτών", ship_mortar: "Σκάφος(-η) Κονιάματος", 
                    ship_submarine: "Βάρκα(-ες) Κατάδυσης",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "hebrew":       { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "hungarian":    { garrison: "Helyőrség", advisor: "Tanácsadó", cityLevel: "Város méret", support: "Támogatás",
                    artillery: "Tüzérségi", air: "Légi", line1: "Frontvonalban", line2: "Lövész vonalban",
                    flankLeft: "Bal szárnyon", flankRight: "Jobb szárnyon", submarine: "Búvárhajó", reserve: "Foglalt",
                    phalanx: "Hoplita", steamgiant: "Gőzóriás", spearman: "Lándzsás", swordsman: "Kardos", slinger: "Parittyás",
                    archer: "Íjász", marksman: "Lövész", ram: "Faltörőkos", catapult: "Katapult", mortar: "Ágyú",
                    gyrocopter: "Gyrocopter", bombardier: "Ballonos bombázó", cook: "Séf", medic: "Felcser",
                    ship_ram: "Törőhajó", ship_flamethrower: "Lánghajó", ship_steamboat: "Evezőkerék hajó",
                    ship_ballista: "Balliszta", ship_catapult: "Katapult hajó", ship_mortar: "Ágyúhajó",
                    ship_submarine: "Búvárhajó",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "italian":      { garrison: "Guarnigione", advisor: "Consulente", cityLevel: "Livello Municipio", support: "Supporto", 
                    artillery: "Artiglieria", air: "Aria", line1: "Prima linea", line2: "Armi a lungo raggio", 
                    flankLeft: "Fianco sinistro", flankRight: "Fianco destro", submarine: "Sottomarino", reserve: "Riserve",
                    phalanx: "Oplita", steamgiant: "Giganti a Vapore", spearman: "Giavellottiere", swordsman: "Spadaccino", slinger: "Fromboliere",
                    archer: "Arciere", marksman: "Tiratore fucile a zolfo", ram: "Ariete", catapult: "Catapulta", mortar: "Mortaio",
                    gyrocopter: "Girocottero", bombardier: "Pallone bombardiere", cook: "Cuoco", medic: "Guaritore",
                    ship_ram: "Nave con Ariete", ship_flamethrower: "Nave lanciafiamme", ship_steamboat: "Ariete su Nave a Vapore", 
                    ship_ballista: "Nave con Balestra", ship_catapult: "Nave con Catapulta", ship_mortar: "Nave con Mortaio", 
                    ship_submarine: "Sottomarino",
                    addSlot: "Aggiungi unità ad uno slot", removeSlot: "Rimuovi unità ad uno slot", fillRow: "Riempi una linea con le unità",
                    selectUnits: "Seleziona unità", assignNone: "Nessuna", assignAll: "Tutte", assignField: "Riempi campo di battaglia",
                    presetsTitle: "Battaglioni", presetsAdd: "Aggiungi nuovo battaglione", presetsRemove: "Elimina battaglione", presetsNewName: "Specifica il nome del battaglione che vuoi salvare",
                    optShowTitles: "Visualizza il titolo delle linee di battaglia" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "norwegian":    { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "korean":       { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "latvian":      { garrison: "Garnizons", advisor: "Konsultants", cityLevel: "Pilsētas līmenis", support: "Palīdzība",
                    artillery: "Artilērija", air: "Gaisa spēki", line1: "Priekšējā līnija", line2: "Tālās kaujas līnija",
                    flankLeft: "Kreisais flangs", flankRight: "Labais flangs", submarine: "Zemūdene", reserve: "Rezervē",
                    phalanx: "Šķēpnesis", steamgiant: "Tvaika milzis", spearman: "Pīķnesis", swordsman: "Paukotājs", slinger: "Metējs",
                    archer: "Lokšāvējs", marksman: "Šāvējs", ram: "Tarāns", catapult: "Katapulta", mortar: "Mīnmetējs",
                    gyrocopter: "Helikopters", bombardier: "Balons bombardieris", cook: "Pavārs", medic: "Ārsts",
                    ship_ram: "Tarāna kuģis", ship_flamethrower: "Ugunsmetējs", ship_steamboat: "Dzenrata kuģis",
                    ship_ballista: "Ballistiskais kuģis", ship_catapult: "Katapultas kuģis", ship_mortar: "Mīnmetēja kuģis",
                    ship_submarine: "Zemūdene",
                    addSlot: "Pievienot vienības uz vienu lauciņu", removeSlot: "Noņemt vienības no viena lauciņa", fillRow: "Aizpildīt vienu kaujas rindu ar vienībām",
                    selectUnits: "Izvēlies vienības", assignNone: "Nevienu", assignAll: "Sūtīt visu", assignField: "Aizpildīt kaujas lauku",
                    presetsTitle: "Iepriekšplānots sastāvs", presetsAdd: "Pievienot jaunu sastāvu", presetsRemove: "Dzēst sastāvu", presetsNewName: "Norādiet nosaukumu kaujas sastāvam lai to saglabātu",
                    optShowTitles: "Rādīt kaujas rindu virsrakstus" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "lithuanian":   { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "pinoy":        { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "polish":       { garrison: "Garnizon", advisor: "Pole bitwy", cityLevel: "Poziom ratusza", support: "Wsparcie",
                    artillery: "Artyleria", air: "Lotnictwo", line1: "Linia frontu", line2: "Linia walki na odległość",
                    flankLeft: "Lewa flanka", flankRight: "Prawa flanka", submarine: "Okręty podwodne", reserve: "Rezerwa",
                    phalanx: "Hoplita", steamgiant: "Gigant", spearman: "Włócznik", swordsman: "Wojownik", slinger: "Procarz",
                    archer: "Łucznik", marksman: "Strzelec", ram: "Taran", catapult: "Katapulta", mortar: "Moździerz",
                    gyrocopter: "Żyrokopter", bombardier: "Bombardier", cook: "Kucharz", medic: "Medyk",
                    ship_ram: "Okręt z taranem", ship_flamethrower: "Okręt z miotaczem ognia", ship_steamboat: "Okręt parowy z taranem",
                    ship_ballista: "Balista", ship_catapult: "Okręt z katapultą", ship_mortar: "Okręt z moździerzem",
                    ship_submarine: "Okręt podwodny",
                    addSlot: "Wypełnij jeden slot", removeSlot: "Opróżnij jeden slot", fillRow: "Wypełnij całą linię",
                    selectUnits: "Wybierz jednostki", assignNone: "Nic", assignAll: "Wszystko", assignField: "Wypełnij pole bitwy",
                    presetsTitle: "Ustawienia", presetsAdd: "Dodaj ustawienie", presetsRemove: "Usuń ustawienie", presetsNewName: "Podaj nazwę ustawienia",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "portuguese":   { garrison: "Guarnição", advisor: "Orientador", cityLevel: "Nível da Câmara", support: "Suporte",
                    artillery: "Artilharia", air: "Aéreo", line1: "Linha de Frente", line2: "Linha de longo alcance", 
                    flankLeft: "Flanco Esquerdo", flankRight: "Flanco Direito", submarine: "Submergível", reserve: "Reserva", 
                    phalanx: "Hoplita", steamgiant: "Gigantes a Vapor", spearman: "Lanceiro", swordsman: "Espadachim", slinger: "Fundeiro",
                    archer: "Arqueiro", marksman: "Fuzileiros", ram: "Aríete", catapult: "Catapulta", mortar: "Morteiro", 
                    gyrocopter: "Giro-cóptero", bombardier: "Balão-Bombardeiro", cook: "Cozinheiro", medic: "Médico", 
                    ship_ram: "Trireme", ship_flamethrower: "Lança-Chamas", ship_steamboat: "Abalroador a Vapor", 
                    ship_ballista: "Barco Balista", ship_catapult: "Barco Catapulta", ship_mortar: "Barco Morteiro", 
                    ship_submarine: "Submergível",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "romanian":     { garrison: "Cazarma", advisor: "Asezarea trupelor pe campul de lupta", cityLevel: "Nivel Oras", support: "Unitati Ajutoare",
                    artillery: "Artilerie", air: "Suport Aerian", line1: "Prima Linie", line2: "Unitati cu raza lunga de Atac",
                    flankLeft: "Flancul Stang", flankRight: "Flancul Drept", submarine: "Submersibile", reserve: "Rezerve",
                    phalanx: "Phalanx", steamgiant: "Gigant pe aburi", spearman: "Aruncator cu sulita", swordsman: "Spadasin", slinger: "Aruncator cu prastia",
                    archer: "Arcas", marksman: "Tragator", ram: "Berbec", catapult: "Catapulta", mortar: "Mortier",
                    gyrocopter: "Girocopter", bombardier: "Bombardier", cook: "Bucatar", medic: "Medic",
                    ship_ram: "Nava-Berbec", ship_flamethrower: "Nava cu Aruncator Flacari", ship_steamboat: "Berbec cu vasla circulara",
                    ship_ballista: "Nava balistica", ship_catapult: "Nava cu catapulta", ship_mortar: "Nava Mortier",
                    ship_submarine: "Submarin",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "russian":      { garrison: "Гарнизон", advisor: "Помощник", cityLevel: "Уровень города", support: "Поддержка", 
                    artillery: "Артиллерия", air: "Авиация", line1: "Линия фронта", line2: "Стрелковые подразделения", 
                    flankLeft: "Левый фланг", flankRight: "Правый фланг", submarine: "Подводные лодки", reserve: "Резерв",
                    phalanx: "Гоплит", steamgiant: "Паровой гигант", spearman: "Копейщик", swordsman: "Мечник", slinger: "Пращник",
                    archer: "Лучник", marksman: "Стрелок", ram: "Таран", catapult: "Катапульта", mortar: "Мортира",
                    gyrocopter: "Гирокоптер", bombardier: "Бомбардировщик", cook: "Повар", medic: "Доктор",
                    ship_ram: "Корабль с тараном", ship_flamethrower: "Огнемётный корабль", ship_steamboat: "Пароход с тараном", 
                    ship_ballista: "Корабль с баллистой", ship_catapult: "Корабль с катапультой", ship_mortar: "Корабль с мортирой", 
                    ship_submarine: "Подводная лодка",
                    addSlot: "Добавить войска в одну клетку", removeSlot: "Убрать войска из одной клетки", fillRow: "Заполнить войсками один ряд",
                    selectUnits: "Выбрать войска", assignNone: "Ничего", assignAll: "Все", assignField: "Заполнить поле боя",
                    presetsTitle: "Закладки", presetsAdd: "Добавить новую закладку", presetsRemove: "Удалить закладку", presetsNewName: "Укажите имя новой закладки для сохранения",
                    optShowTitles: "Отображать названия линий фронта" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "serbian":      { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "slovak":       { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "slovene":      { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "spanish":      { garrison: "Guarnicion", advisor: "Asesor", cityLevel: "Nivel de la ciudad", support: "Apoyo", 
                    artillery: "Artilleria", air: "Aire", line1: "Línea de combate principal", line2: "Línea de combate a larga distancia", 
                    flankLeft: "Flanco izquierdo", flankRight: "Flanco derecho", submarine: "Submarino", reserve: "Reserva", 
                    phalanx: "Hoplita", steamgiant: "Gigante a vapor", spearman: "Lancero", swordsman: "Espadachin", slinger: "Hondero",
                    archer: "Arquero", marksman: "Fusilero", ram: "Ariete", catapult: "Catapulta", mortar: "Mortero", 
                    gyrocopter: "Girocoptero", bombardier: "Bombardero", cook: "Cocinero", medic: "Medico", 
                    ship_ram: "Barco-Espolon", ship_flamethrower: "Barco-Lanzallamas", ship_steamboat: "Barco-Espolon a vapor", 
                    ship_ballista: "Barco-Ballesta", ship_catapult: "Barco-Catapulta", ship_mortar: "Barco-Mortero", 
                    ship_submarine: "Submarino",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "swedish":      { garrison: "Garnison", advisor: "Rådgivare", cityLevel: "Stadsnivå", support: "Support",
                    artillery: "Artilleri", air: "Flyg", line1: "Frontlinje", line2: "Distanslinje",
                    flankLeft: "Vänster flank", flankRight: "Höger flank", submarine: "Ubåt", reserve: "Reserv",
                    phalanx: "Hoplit", steamgiant: "Ång-jätte", spearman: "Spjutkastare", swordsman: "Svärdsman", slinger: "Slungare",
                    archer: "Bågskytt", marksman: "Karabinjär", ram: "Murbräcka", catapult: "Katapult", mortar: "Mörsare",
                    gyrocopter: "Gyrokopter", bombardier: "Ballongbombare", cook: "Kock", medic: "Doktor",
                    ship_ram: "Rammskepp", ship_flamethrower: "Eldskepp", ship_steamboat: "Skovelramm",
                    ship_ballista: "Ballistskepp", ship_catapult: "Katapultskepp", ship_mortar: "Mörsarskepp",
                    ship_submarine: "Ubåt",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "turkish":      { garrison: "Garnizon", advisor: "Danışman", cityLevel: "Şehir Boyutu", support: "Destek",
                    artillery: "Topçu", air: "Hava", line1: "Ön Cephe", line2: "Uzun Menzilli Savaş Hattı",
                    flankLeft: "Sol Kanat", flankRight: "Sağ Kanat", submarine: "Submarine", reserve: "Rezerv",
                    phalanx: "Phalanx", steamgiant: "Buhar Devi", spearman: "Mızrakçı", swordsman: "Kılıç", slinger: "Taşçı",
                    archer: "Okçu", marksman: "Tüfekçi", ram: "Şahmerdan", catapult: "Mancınık", mortar: "Topçu",
                    gyrocopter: "Gyrokopter", bombardier: "Balon", cook: "Aşçı", medic: "Doktor",
                    ship_ram: "Ram-Ship", ship_flamethrower: "Fire Ship", ship_steamboat: "Paddle-Wheel-Ram", 
                    ship_ballista: "Ballista Ship", ship_catapult: "Catapult Ship", ship_mortar: "Mortar Ship", 
                    ship_submarine: "Diving Boat",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "ukranian":     { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "urdu":         { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "vietnamese":   { }
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
};

//----- Methods formerly from IKA Tools -----
function ahSetVal (key, value, useDomain) {
	if (typeof(useDomain) == 'undefined' || useDomain) {
		key = document.domain + key;	
	}
	GM_setValue(key, uneval(value));
};

function ahGetVal (key, useDomain) {
	if(typeof(useDomain) == 'undefined' || useDomain) {
		key = document.domain + key;	
	}
	return eval(GM_getValue(key, ('({})')));
};

function ahGetCityId() {
// find out the id of the current city
	var match = document.location.toString().match(/id=(\d+)/); // visiting another city???
	if (match)	{ return match[1] };
	return $('#citySelect > option:selected').attr('value');
}

function ahCityGetBuildingLevelByType(name) {
// load building levels of relevant buildings
	for (var i=0; i<=14; i++)
	{	var building = document.getElementById('position'+i);
		if (building.className.toLowerCase() == name.toLowerCase()) //toLowerCase() since "townHall" and "townhall" may occur
		{	var substr = building.getElementsByTagName("a")[0].title.split(" ");
			var level = parseInt(substr[substr.length-1]);
			return level;
		}
	};
	return 0
}

//-------------------------------------------

var language = languages[getLanguage()];
if (typeof(language) == 'undefined') {
  language = languages.english;
}

//-----------------------------------------------------------------------------
const images = {
  hintTop           : "data:image/png;base64,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",
  hintLeft          : "data:image/png;base64,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",
  hintBottom        : "data:image/png;base64,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",
  hintRight         : "data:image/png;base64,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",
  square            : "data:image/gif;base64,R0lGODlhIwAjAMQXALKehsOsms62p+XKw72rk8uzo/HU0erOyfTW076olPDTz7umkMGrmMGvmOTJwtm/tLejjPfZ2NO6rbmljtvBt/ja2cy7o////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABcALAAAAAAjACMAAAV14FVRQmmeaKoKD3JF0yXPdG3fM2FIeO/bjMBv6AMIiciaMcmULZvJJ5Qonf6q1h42e9tylccvzit2hstgdPesNrfT7xm5PBfXv3duPru39qd/UIFNg0yFUWxth0gABXEzCQoNjxYDFwcLAJqbnJ2enwAQDhchADs=",
  empty             : "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
  phalanx           : "data:image/gif;base64,R0lGODlhKAAoAMQAABwNDtina2pHJZloUM9vKvjq42pWTa2in7ltLfrJVkEiC2g4NIpWKtKLNFQwIrCDb4owDm8wDP35gu+WNcy+uj8GA4FMGfipQNexOqtaKayDK+zKPZ5pJ7llFp9CHwAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqu4sG+cAHP6SHTOEnd+bkEAc2pUHD1Sg4BY+FZmHbG40ghcACuJ4oU6VhcAb4tKeOwgk8V8SjDYWDRalFmMqGi0vHJJZGQSOBqFnp9fkIleGIWBBwaGAkYDiaIYgRuABwOHJJimh8eiwMPAw2bUg0JFw0WEAQDAwwdpUcbDRsXEwIRAgsOsYdSGrQbtg8RFgYCHQO/RxoEGMMbExwWSh0BDyMG2UcIBBnQ0g0NtwQLDwUUDw6u3eMEwxgTfLdXAgoKDgwGRwMeDQQaYMDQYEIDBB5ELOD3wUk/CBkyIBh4EAECCCYiSYHgAUGGcQDH+SKh8YgFBhwihP7LECGCgmUktxg46UGDTQv4BGgh4VCKA2OM2jw4QGHniJJHDOhDaWEABaJRFKopI8BChAdPD3Ab0XOLA3wODmhFhiSOCANLPhgAgLSh2Q8PPGhUUEEAz7cZIDAQ4aACQ6lmOUQYwRYm4DgL/IoAoOAq17cLFiggoeDvXzWvVFwWw2tLCAA7",
  steamgiant        : "data:image/gif;base64,R0lGODlhKAAoAMQAAJ13UWxKMbCMYUgoGg0IC3FbRcOdcEo4KYZMLi0YDvrw5DkuIzIjGuHOpmQ8JatqM140Gt61gFpGMr8AAPgCAYdiQnVBIkAfCIuLgYtLIZ5cONqPTfxPPh8YFCMkJQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOYkaeaKqmmYM8YhCtdP1BHaFDDtEoM5uQBLkYO54ORqGgUJgcCmy4ylggC4+HUChMnooolQaBjC46gicxwGQoY9VgcZiiLvHVAmOobDANKBZ5KgUNAIgECwUYGAAbJoQoXA8ZGRoFBB0DDB4AkZIkHhpllgYFCRUGBxWhJBkMCAOqBhoIER0VAAcCriIOwBAHBg0RAggbEgScAL4fFtADCBYIAn0apwepBnaE0GUAx4gByAAKGAfNrhBXtAAIBu8Phg0BBWMPGygZEAAG8RbGYXIU4ACJAAwcjNA344GGhxq6tRDwQIAABxUKOLDQZQC7CA1CAujAw0EAhAcG/ziA2O2ZA0QCAEDoggDLggQ4dQloIOBmhxwESLQc0Q6RBowFZCFh0IHBgQMLGKTpMIZfhasWJACoYIEBHW0HuhSQgCdPhgEWbA2Q0MVBgq8JJGTUGIoBO2ESJFgY4GGB3wQHTlZQKAmC1wN5A1jA+TMBAQYJLpgJtfewXgYjDH5o5ezGAI97c42QEMCBgc4fHPAYkMBDHRJQT6MegXBBANgMLM4WcYCBbxKcAiyY3TXBzxE4fmJGjYVAghMLCJSdXWE5CQnDd384MOiEB+2bv5/ADn4BYeRBtUs9gSP97KcLQD3wIEGAgs4IEOWOwB/A2A4FAPADEK6wUsACFoXEkw8E2x0AQV7ZdZbSBZF1FgIAOw==",
  spearman          : "data:image/gif;base64,R0lGODlhKAAoAOZ/APTHjOfk6M+tT8ViIrOvqXFIF8yPTNLNuq6Gbvrqx+LbxotnTuzn1V5USqGVLOvjyqtpPXyvb++XTLB5SsuXYPHs0tc1L/75afzz1IlHLvdoVs3IUf/SQvSLMMulPrKil/z22r2NVdCmbf/3Wt96JvzlafuzO/nHXdrPvubXubBSMNarj/zwhfrlp+i7iv3YaP/9dY2Gd5WVjaOglct0SNTClycPB/7lR8zKxvLduvZ3Z0gTCJdsE04qFMK+tAgDAZEHA/rEaJRWH28oEOPIqPXXrfy4deCjRn5nJPrXVsyYi/7rO/7NTFlDMfu0ave2UzAjDr8HAf/ldoo0GfaqabQ1DP/dPNeZHuK+Qy48P4hxZPykXfXw24lXSKp6JObIUvftXmcyHe3tV1oFBOW3Xd7b3uK0f/jv0/vfg93XSbaafONMOvFWN/HZnimjCEmbM2TVV//7T3xAHOfEYOLCd+K4IvueRaKcofu9RuCqc+G7b9bCIPeBWcbJ29HPzv322SH5BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjIJ+fgQHKAxniiAYGI2HDAEBBHefFSCGDytKSggomoUgDz6dAWU+o4QKXUBAUVEWOg+rhBU+fp1lClyDZwu5ulG4XRW/yAd3ONU4ZQ8gK0BjNjtj4Bkx0NGDDwogFSg+fURqPzYhFGYULjULvuWHZzgLPfAQMmSYAMFGE1X6EhH48QOCnB5dJlBQoyChQoZ5AAAwkgDACga0LBZa+COMCwNQmtgIk09kIQVQYmTZsaPHlDA2JrRxyYoBlw/wptBcEKOJgRwJMFnE0AIACwFyhjCEJ6IFkR47KBTJAfLXJQBPXpR4gaaNCyFQbKRhgUacFhtD/8KYyRGSEQYnHEZc4HMCBgw0LQTUgfFCjw0RNHZA8dFASIgimRgBsKIXxpYkcWBcOBFEzAUYXn4MGbJjBpcKOLQsgNAigaIzeEaMuNHBjokbcW4s6YBHDBgk8H40IPeHi4KiXgBUOlSEww0mazp0YMPGxBIrS+xscOBARgMZxwwpIFBARPhCRS6A0XDiBR+xGqTAGMHkCPdGDw4wONRCgpMtUuiggxFGOMEHC2DUQUIaDpy3SF3IPBEEFVJowIYFV9RRxRVVDEACGGls4JpFAuzBxxESWADEhgMcccQJVKjHwwrLlQMCCgV4MQUPQhyBxRVriPWFCkmckGMOSyHghdMHKrRIgwo+fmGABx0A4AECIyZ0BgI8eEABDQYIIIAHBtCAx5AD1ABhOWd8gISOBbwpRA9QyOGBG2+0JNIZCnyAwAJhQAFFBHC88QMSIhDHEwZnPCCHAE2IgsMPEqXAkyEhzIGAIBNAYUAIll46CAZkTBBCJinEKUKNogJABgUUVEKADRCIEKqofzxAhwA1CDIDrQhosR+uCkBgQBPHgCADFAsQkcKaFh0gUA8HDELAAiKo4SBPXQgxgRqEcOGDnjyB8MEEZmiBayIMxNBAtevGK0ggADs=",
  swordsman         : "data:image/gif;base64,R0lGODlhKAAoAMQAAMuKdJSLhf/8+21lYlY2L++ylK1qUc/GxfrMrVgnEaFcOxgLBwMAALB6Zm1KQIRZTIBAL00cBCUMAJhkVLirpvTu5sJySjkWBikZFDYhHd6gg0UqI243GiwRA+bd3AAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeZICubEsJbSyLAjzf51vhPOkJh56wIlAJGYzZoHZEOmMBYM9JTbJeR8wjwEUUMKyDR4gBaAoIb2PD2gkzDceCsGavBm4hAPAwACYFKw8aFEIigAVmDRooBhsTBoYiDQ8OEw4EJhoaDo+ZkhkOAAaXIxRefAsDDZIfEhkPBAsbiwUVFQhxGa0fDQ0JHBMbGBAGHAoADRMEYLwIABfHCtMQEQmyVrwABQ3RFgoGFhAJC7wlybIJ4NMJEebnDh8MFwn1Fx0S7yMNALsL+PQS3Cunb1O5BRfocWgXIZ8+AAjsdLgnoaIEgu8mIHggYkGVUPo+PPAigsuAkwE8chTSh0gDgQM1BHjwUCGIPgfKklGg6eGAzwNG3mXAgMHBgVs9fVIYEJLEAApiPAQYwLEpCQgO4n3YsKGD1REdPn3AsABjU4sjypoNWRHjggwQvn5A2EweAQORrBKAYKdjgm1WIfA1MawpAQ0PsskdwUxfCAA7",
  slinger           : "data:image/gif;base64,R0lGODlhKAAoAMQAANKZdRALB45QHVVjjSsYCeqsii4mJUpUdnBLOlItFEkxJvHKqHlSQzE2SZZkUD1GY05HUadzWjshC4ZcSf/vzox7cl49LamksG8+HbmDaBcXGiMoN71qIm56qWxaYAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZDlel6murAoAWdXOtIhxuFDvayL8mARvSCJIEhjMjzgzOJ2aEfI3WSyYJY1Bo9k0GpuSJVKgRLAj7WPQOUA8JQWCMZHo0IHGwcPIACwkCgwGIxIcaBoBCAgGGQ4IhQkWBCJCN1gBAQ4wBS8jGBmAlSJ3RJkML34ZIgRIQqwiEpiKDrUTEwALFgkJlGglmQR9GY5kBRG+v1kBFpsAcxEOCsomMA8MDnQKCoTUJbkFHgPEAAzeKgULABBsFRce3eciuAUZDWxsFgfyIwCdDhsODBhwIMEAfiI6ZVCwYc0BBRIONOBnAcORABoaPGhAQONEeRKSSIKwkYCBBxv5jREg4KAMBSsVND4IAzKAAQAv0y2A4EWlBALMFtSLwIDkgAfyAkhYSmBCBAQKHgg8sO9cACM/8+ihSvWgVawENEjl2pWfUgkBGpKViPDD1QAfNHqA4KRtiabSgNoNFGGCAgLT9opQEE2BhQUvBSuopYFABMQy7C52IFiMp8ojLBQoMAHziM0FPIvoc0ZZCAA7",
  archer            : "data:image/gif;base64,R0lGODlhKAAoAMQAAKiOd6uckGRGMyURDpFbNtCfWU07MRAFBOfe07yxpJlpRUcrHq97U/rscnZVQlhPS3A9KS8sK0oRDG9nZYx+dX1vXePTuP38l6mIQdbFq4VYPjkfFtPViffLiVwwIQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeKDolKQm18EgBLJu+cfskVPAElJLt48HlTr+AwbAaXZ5PDoZwTE0oj4ghICo0vg3Oc0qtliKTSQTd7XQw8AJ8UTaTHgat4SMo+BWABAoMHwMKdiUHHxEDBwR+cAoQCwIOIhBGiB8HnANwcA4aAgajIhuZmgMDC58Mrq+El5okGwsGghgKDoMEHhojHrMkAhsDpAsHAx4LyMDCIgwFAguiC40DErWmC88E0QwGDAQCHsUHGx0i1s8CGoPk4hryFBodXNwlCBZDLQICgwwUPAAAABBBCAU6OJAwQMSAAAgiRszAJYUGPwUYOKDAUYLHjxI8iPTA6UGFiDxi6Az4JmBCAB8bDFBQs6GdK34PzCxQYGCAlmkHKgSoYMpBwFjPYpIjJpOoCAGCDj37YMCDAwcQACwJMqKSgKl8imwcaqyEBLBUhRKcYeDABBISAIAF8ODBBKEVDDxAQGKBpWcJAmSgMKouAAt8uwZ79jKDBQsZEiRAnFiEA3zCBDvOsDlDxGENn1WYDPkxggQVuDoEu8zkZNTt5KoDa2DDBkUjDkBQUMAUWk64hwnKsAEthdsRTKiqVXxqhVWhEy0o1lwYAw3WopcYUBMstWYoFkD4i7YF9wWyy6NYBUFDBvUpHGWEH7+RnRAAOw==",
  marksman          : "data:image/gif;base64,R0lGODlhKAAoAMQAANugX/TWohMKDG5JMikYEVE1KsGObhwuT7F7Ut6wghEXJo9OMEkqHTguL5tvT/7932wvEzUhGW9SR65rL2Q7KYdFGK1/ZaJWHoJdSY5jOsdvTRchN6tdQcx2JUAeCwAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZOkET1CubOsCTxxnbm2LFZCg/O2zl04HlnokfsiPZyIEBAIAy4SR9EEml8oCsdshqjcPpDLZBRIGCwVs83i0mQGjIGfbGB7BwIKwWAwOdjUeBAIMfzpRgiwGEYWPBQwUHAYNiyNPCBgIDgOFAqAEDFSXBgAICBkIpg4MEREFjhiXHwCdqBkZDg6RCxocHAlHghIWBQQDEhEDzMcUCxwaTmd2BhgMewYSA5EFsXPP0V1fFMISNwgLFScB2hQUAxkEn6IF4RkUv6E2AxAQBsKMzYtFoACGa/MIRBiVb94rGw0aLDNgrcExBRgVALSAIdYHhQMWvBuw5kcBB+86tQrIKMGBBHgjBNiDxqHkD2zcNihYqSDCRwIlFE7ikETAhog6N4DC6ELUgCTzeCrYoHMprRFupmbUiXHDgasi5ik4cIDrVLJfwX4w6hWt27Rq377doFZEA6pvG5yri8DTSq4nDdT94E+AzxEDVllQS6HCBVKI+dC4urBCB8hhGfijhUEgnhWGJoy5RMEABVAsPKirUIEWahf+IAxuQaCC7NkrJNHBHZQBhkC8SWDYsTf42tdJQgAAOw==",
  ram               : "data:image/gif;base64,R0lGODlhKAAoAMQAACkaEUo5KTQgF5BTNkIpHGpRO7RtS1pHM/jnqpJyTP786dyCUHtdPQYEBKuOYTgsIB8YFBoRDcJ/VBEMCvi1duiMXdawd5dZP2Q3JPTIj1kyD+eib2xEFNeVYKpkQAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdG3feK7vo2cMPs9ucAECDT6J5MIQ4hadiqSzUFo9iew0g5gtDBIDWNwJG7JZRuFQMFAUcPhqIPZIPEGfOJ0oACIABAQYCxQIcBkpCxsVixUdFBUVFB1nCQyYBBObgYMGFVwUTiUeF3hEHqgXGGsCD4IEfwCzgQIYHgsLFQMomhATEBCAwhBrmxMRwwLLnYMDzxgnGgGvAdbX1moNwRHAy8yuggEY5CIath/B1rKvsw8HmNu/3t8Ay7CCGiITAQcf1gceCPjzKkKDBvAKHJwFaKC9b/gI6EsnoAADBxQcBIggAJ4DBAgcdDxwsOSEbyjvusXi8EHNgYAFOlwKdCBAAQuHHHBENmwWuJQDRTDoV0BQgpo2AywrkKHpy0sF1mzsycxntA8k+wWsOTBqQAIOLFgYOpTaQE60/nAMkEBEAYAvAwZjE/eiAwYPqL0a2C2ZML8E2IjoR0BrAIIvtcJjENBarL5p/fpk+UHABw4CCHf7p/jaxBGAPmjg5heZZRGZP1Trq9oV4aApkm0KnSJWCaV5g51WoeFzDGqzeAgfTry48ePIkytfzrxGCAA7",
  catapult          : "data:image/gif;base64,R0lGODlhKAAoAMQAAG5ILZxhMg0FBY5sUEssD8aslCsqK6OLdy0dEzUnHVtKNVY7JkM2JXVxc1NJQm1YRWE1En9OGWJAJUQsHzc4O1o9L1QaG4o2Ikc9NMJ6RFAwIj5ARmJfYB4aGH9WNQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdD1nng17A1AtkoAuFalkMoNBhZMZnnyezONAbTpNgGzFwaEerthKRbLFUMCmoqaSBQjRJvLEDU8xJrl6XPOJogMFKQsATQNvLhoXJQIIJ2wAEhIbBwWUlS0WJAQCJQAig5ATFBscDR6UXysQiiICECgSCgAaBhsbBh0IHQYGmB8RBAkDGQx5EVkKDx4TCaMGCLq5IxgYDCPQER8PANAVAQEGUQoeChjJAAkiuAkd7a8iDgqcIh0POA8IAgIeAcQeHgwGPPjhgds1aAnSTWMw74OABBDIKRigz02HggImLJiwZgGCVxKYceQzQt8AEQE44XQ4icBBgQd4PFwMgEDDBAFrNHyEwK7DBGbvBpS6lGTAgQUdODwYQI4BAwAeFixIOKbCSKlAIvF7wKEABwdNHFCwJmBDAw4MLEDo4JQBNQVw4f5YA0CBhDYAKFAwMFFIgw0ObjZocIAihAklGCRoKzKCYwBOay7AtQRevHkbDHXQkGcEgVyLOwjoQCLXvFFmPyx4t0CdiAS63omApsFtAlckELB7pZiBAtUjJERI0Jp2pBI1nbIj4DnBBF0fEEc/gWBBVBUjn5MuwVw1HwKdaXRPMYF5gPB60qtfz769+/chAAA7",
  mortar            : "data:image/gif;base64,R0lGODlhKAAoAMQAAA4HBTgiGdu+mSUYEXBQN0IlGJFrTLCQcNWiZWhSS5dfMl1FL0c2JzotIVBLTIJZQ1Q5KLB+TkotIGdkZ2s2KVI/NKldS3NKH44+MUQ+PmE6EzA1PHxhRZJ6aC0gGAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdG3fuElAWs5KkgDBl7pAgkPbQaBaHAvJ1SKBsZgOiNOF4IR4EyyGZ0GhWFkLCeYILDRYAEmiwkFpqgpRI1NpFwIScAwGCQcoDB0HDyIDCxMVTx4QcAMMDQwoBBwIix8eBRIVonMTBiwBAAMDKH8FIhqfrQGzlymEHQ4DAIYoABQiBXELs8QDPSiEBwcZEwJZCEwfyh0JgwcVBh0IAQMe3sYfCFklHQYEFFUWGBTYHwoJe30SEAECBwYRtA2z9p0lFbpSBQQAQIQ3BwmeDEhgAB+BBxAjGnhgqkSCDRscTOjwwdUHDhcKXJhgqduABgQI+0Q4MJCgBANYSkyYmWAjiQuXZHHz0GCBPQUQUjHgkM2cShI0M2QAQ+JTt326eHoggA9BBIjDdEHAN4LATAdgHZTo9sebh6HmGDBY8CAoQYEMHhAY98GB0gwb6jRVxZNBhQUqERDoeYADhAVd1ALeJGLHBwmrSCyo0OCSX0sBFkSIwCBIAQPiQiMwwI1DhA+IPQUgUVnM0wYVLKGtAKgAhJS4d/yh+jjQAI8i1DYY2Ijy3wX7gHhQpYqgSQgXPkAPeXpEZV2S9yEPcD3yCA0CvfWQAHFAhTyvApJQ69cDAA8plsufwb0ywRXebEhocJ+I//8ABijggAQWGEMIADs=",
  gyrocopter        : "data:image/gif;base64,R0lGODlhKAAoAPf/AOrq6L3Z6PTz6P762svj6ZWVio1aRP7++ry1o9nHqvXz04SJhbOKd4l2afW7i8OtmrmRd3dWVv7EjJRoU42ntdPMs+3x2nWKmJliSMfX24ZoV8bq+aE9G7Wpm4h9dMrBscWYfHp3auvq4/74zcenkFQpG+HcyHlNN3ZqZFAZC7y7sLh3VtH0/PPx5K6jkXVjWvz94vTszL+ljPX18ismJYlhTfr47pi5x3A2IcK/rVo6KpeZmv7//cuIZ8Pd4nopELevpvPu28zMtN3t3M37/8h5VOHb1ZhwWmlHOamoqLyYZGVUQ6xYOqqIZs68q0crJe3w6L3Hu4VPNphJJ/n49OXm4dPMvL3S2HpbS+rn5Vk4MoR9hsny/c3LvPvsuGtbXTIOB9WJaP7vw1JBOfHt5sXFuc3TwjgnH+LTs/3999vi3qOKerOIZn5VRf/+8/r7+MyeiPLy8c+zm8m7nr2cg//5x9nXwNbXyoierXpTPUo0KVxHP///7q2Oc/j37Uw6NOjo3qejkbGtsdvUvNvax6rH0MiTXquLe//90Ht3eOzs1unZsvz3wPfos7CYjdvQtsCKX7Tr9ejr2Oju3XBeUdvd3ejr6d3Lt8bDsb/Ovc/ArNHt91tUXfXqv6COgKaag6CdkbW/xsC8st65otXTwc+qftLazeyDVdvWzt7cz6zIz9/Dlsvh2eDFnufl0+fr0+Ps29S4m4hvZVNXYdv6/5F7bPz8+rm0sP7RpaFyMuethPSvhfX/5H4/JtXDtqiQesL2/8f+//z77/3/6tHj07nDwffrxG4bAPf47+DavY6iqrhaM8Kwm9BZLtmggspiOoNCKI9HOvbjvGN0gqFpUKh3X5CJgfL28ZCzvIGFcZ6GdqFHJKdWL/Tgrf/hoP/qrLGVhbefhff48cS5qLewtM/WvU1JSMGZb09TVKKKccR3Fvf39NTQte6fdtbVvnxHVNvYvOncvNyJX5qSgNxpScrNwsDf8Lzk/dmVYunt2u/v33BYRfn389LX1dvY1v///yH5BAEAAP8ALAAAAAAoACgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLFD/IgoJxIQIIrfjwudYxYaUECgYMiIEMYosqRiKSQuNlGEeDLaCIQMOO3aBxzJhB+PeGh0E/NmwgQ2ZDnK0DfuZwK8JEDiEzdky4E1LhURVAQQqS4GAHhgUFnbp5acSozog6YgYoSAavQp4T7ZwpetijmQMedRAhwuVNgoNYcmSIumPJ1kAcBWAYi+EQwrNTrxI46RAoRxdLMwq6iCcwT4V/D6QpmMTwWjQDXQCENnjATa1/6QaeWCQQwSi5+SrWazAnzRMUKtSo+ZfH38AyJGC44WUhor8CmV5UE7hAz5IIe3Rk/yFohQOHMLscBDnwcAG2RNEkCQBj7s8ZME9yqXuTqs8tH9SkoEcKP0wxXkMCbHEBNSsgoAEILzyhxxMpQDNBFKHcIkoAkezQxj5LsOcQFBMcgQESE0CQxxM6nEHDMaDcc0UhFFgTQhKOSVTFEdcwowEcBpwxhgEgNDDEDcrgEUIEIlLEHg9azPOCHi/s0YMM+OxwQQFA+AGHMBdZsUcIC2DBgA5YrLFEEau8M84/ZDAAERlyALGDNR5ko8UX83iAxSE1/DGBBLo48A0EbfwTARUM8ZOAEo4IgkESFOCxAS2qTMNJDdXo4AElSMgThgRiaIECOgtdogQd5GxAhD1c0LkhizI3bMJFBlFs8QMYLjRBCQ3L1ADCGSVs4wtCMkBwSwD2bOJDBgTYE0wxGoSwRBN9IJDANcS4kkIK9EjxxB39ZNJLDdrkSFA4vwDDgg9XELCBD6xAwAYmftAGSxyz/NDLEQLx08A/AKRxECrc6EMEEQFoYsg5MSUkxBv/mNLGFBOsocFNCWXBhhOlQCJDHA2ZIVA5Xwwxj0MCgPMBRBZ4kIUnqZSkUCCfYGLzzjz37PPPQActtEMBAQA7",
  bombardier        : "data:image/gif;base64,R0lGODlhKAAoAMQAAI9pSmoND2xdSU8HB6yRaosyMPPbo4pFOnNKNSETD8uleQUGBXUwKFQ3Ktq4h4ZZRzcuK6RxTFVGNUwpHbGDVjIhGaBOQ6GKZXAeHYNyV4MYGZk9OZR+XrqYb39bOgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZClmGYeabOueRHQcHfFsEffurNNtwI5huClYOrzkx0EpbCwWx9DgAG4oOmWLWXAWIg6pNGIpUrSsjqJwYBcoYapBwShrImhSxjA7aBgFYWJDFkYPDwJ5Ih0cDIcIDBgKHR0OCgoGFI4PGAyKHwR+hQwIB5OVllQIGEUaCHkCDhoahRoBCAQEapMKFxgBXbd5HB0BGq0BGxcZugoEGQoHA8ABnmgXEQGsBbYWCsyUKQ4A0wzaeRcW2sjeFwIcHAIEDhEDAxgYA3kZ6hhdtgCcpVChi4M9bfrQCFBXrcCvgATiCWD2zN60TwACaHM4AKK7dxcIkDv4ScAvbfke/3S48JFDSA8WE+aREEljgAEPCLAUMDEkAoufREjAp3EAggvweGYIOcFegqAiKpwcwABpBqVI7U2ASuLXPXhXe/6cAIHrhwoJElgEoGIiB3IfJLzi6sHDiAQTeE5sMILCXKgSIlAAICJBBQkCtn7wQLisWREAKPjNmxiBh7+PSwhG0KBuZhcDGiBAMGFBggWfSTSAYLqCgLQJGlRAnXlAgggCWkuoAADABAYTMphtMKGC6OIVDr/mmQCQWQwHGsRuwKH4A9YQOjDY8Ph3aNESJuSdfZsB38d1fyavyxMCoASOzT6wvKpOhAxtPECAn7lzhP8AmMMAcLvB9xR6/wkWICMpFUCAVgWpLaYgffBBGOEIjFkmHQTxXSjCaGft5yELaaERAgA7",
  cook              : "data:image/gif;base64,R0lGODlhKAAoAMQAANGZa6l5VcSxqkxTsaSamykRBhAFAmxgYPr19JlfPjAtVlQ3KnVNNKir5l9q3PG2jVonEkIXCsi/w3MtFO7VzHeE9TEeFys0i/l/eT5HoYp9kUEuJJJDITs9cRkeRgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeO5ChRJ1KubFtKSCzHbm1/R64RxLHdwJbBssgdgsjVgSCQCJJQkabpjCYNDIAW8LAGDYbAY0yheG+WsDagdT0oT2vCkkhsDItFC0B5IMpRCxsBhAwBCS0cCGMYGGZQhmNbDCsFEQl9GH4AUBZZARsbFiwREQUTYmWUSAcLRKIMBaSmBZamSRkSALFpBi21wGC+SBUVTgcWHh0aLMC1YEnFDg4SFQMOFQ3NBcLDQQPFGRnZ0w47K91QAloaFxcDDAfYBAxdJGB6UGIACR4ZHaU0xFiQSsQBAz+iiJnjYUAHhBRiELAEgY0BWVa0HOigbEEBAjMMHmBAMOMDABoOwESYwAECyBiPRDCoI+cBKJZ1JjBIAeiDhgUMVunbZQBnggkTNJyo8qGWUCgECkHgkIDDBAgHJGglIMIAszMzCUFACqFA1q1nSsxM4LFUBAMHBMjlmpbEpUOmEDIRQOBrXYNhF4A5oKHwgAt/SWzIk0aBuAHiECc2KMxxhgGQ3U0W8faAgguXMV/eLCIAhMVFFKjOR1pEAUEHuBUYG6B1UwujPliotRIRaQulSuz2Oxl4BNa2R2yIAAF5chG4E/4NAQA7",
  medic             : "data:image/gif;base64,R0lGODlhKAAoAMQAAFcxJ6NqRt6XYfHr625ILwYEBnlubvnblmNPTZmLiz00M7KmpiUUD45cPUxAQKaYl6B8cAQCK8OzsS0CKyYVSH4JCT4mGcF9UWdfYXJeWrWpCB0eJ4V6etTJyOOzdgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZPl5x+GZbOuSTSofwWvbFuTt6IHcwFJhSBAIeKugclggXC5Go3I5fAYIAAKhMAUyGAUAAMz8bLq3AqMBKCgyCgs6CAhctA5CbX5jEBoBbFh8NhwNFlpabCMLA4QkDwMSAIiADSQUGJePdh0DDxYMiAAkERENGhpzUAIXEgMdEGKDIhEbZx8AqlNGFwEBDx0SsXZ7BRPIFBEiBEpWBBYWCRILHR2/AQcfDMjIy12BYGAGDw/DCWwBAm3ec79yDgwYCeYdCwRfbAWm310NF6QcYODAYRq1DBk+NBGTZc+Uf80UGOBgIMECCQ8SQHhEwskliQQfLFhQziFHJxdE2mCoKHJBggQYOI7QA0iBA3IiMyYwwDGBMER+bOJ0mYDDj0cWHEBAEEoOAwQZJiIAgMABRwVYM8iyUNXngAEJGBTkSQirGAQQIBhIWw0sAwcLYhJyUKEuAAdaESAI1gEUgKKPENStkNRBVQUWP1kA+ciBgsF3HUsc9uAtArJ8HA+u4MCxAw4SJMDEcJPjBgAVxBi2yWHkSwMSZW5YrLcqAno7jSrgIFMEVqiGB3JY6ThBbxEb8AodjgHDZEfHPwSn2Nw5AwMdoovIq0B7C6U7vbdI8FV8CwOY+YQAADs=",
  ship_ram          : "data:image/gif;base64,R0lGODlhKAAoANUAAPnu0KqMce6kXK6nk3NeT6h1SP///W4xEZFJHalZJpWIdYtrU8K1lrVjK8l5T5tSI+RmNqqbg+TculgqEot5Z2I6KP7+5LWvoIlLIVIxIHpGJuLbxXVIN7WEVpVNIJhbNP6NjJlmPsrApDEWC+DTt4tUOcK8qp2bjtTKqdh/fKNRHdTMtahgRM7Hs2JLPurhwPmGNoVaQ1gfCX1CGn9LNqN+Xm5ALNza0/16ftrRsOJ/W3xQMebi4IZQLcrUvu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqLT4UkynEpqkmMtdlaQDinRRmCOob3Igo0RuPIN8qya+IpRBXM43iKYiDAICLz85ChQmfYt+UywQMAIpMQs3jIw3Ux0qDiA4KT4Wl4x/UQydOJ4kFqyiowYtUwEgnp8AAK2ujBaFUCIqHCkgEDIit7etu15QAQgIGh8HFQEbJCQvL8i5rMtPNSMHCSozBzsrLejn18e32FEdIyPOEyMTJi0i+frpLSQDUgEeTJhgY+CBCyYSJrxwYcCAEyciMJDCIMGHDBoOyJjAsGNDiIgIZHgwMUqJBhoqTNBQo6HDhydCuoix48CDAAv+OVmgAkOH/w4FIoBUQMDFgqMFQnyYMeEADBYBnqD4II5FjQA1koaQMYLmjkENEjSA5EBHySYvSiD4EKLAzwIWP/T40CCsCrENbFSgQActgQoPEngI0aEGOQ91H8xYvDjDXl8E/hkOLFecBw3OPGj2MKOCjVJNBijYkoMAhR1hMQROLDaB65QlOqRZIiGCTgYE/rygAfgBht+bfSOwYSNDDAcdcvQtIiKREDO9FriIEML1g+sefi+uUIKGgwgLykYtgoc0gQhCshAYkiNQhBohgKuw8YEFi9csBDigUAN9APQ/MFABgCJUYEUSLzAQQAgalMDCbyEEqFR+ZtERgAtpkFBDDDo1UUMaBx7s0MsPLpRQggPjLbDeDyLooMN4UIi23AAc2MDBAj8kKEQEZQFYx44KMLBcADqwcNaPSdTAwmxINunkk1BG2WQQADs=",
  ship_flamethrower : "data:image/gif;base64,R0lGODlhKAAoANUAAHRELk0nE6mNceufWm9kWJhrTmcyFWc5KPsAAFxekKZaKCgSB/qMjLqskVgzIvlvcNLJq8lmKY1GHLhtU8SylnMJBK9cRZB7Y3g4FIiP255UJJROIbCfg9KckoRHKopjSIhKNBMJBZVYOHpYPrInETMdE8+ETI0DAqtOH+HYtpyVnrddK0E0KLIXBtx8NoZULn1BHEIeDOnhvv+dnsa9n/S7bf9/f5RKMRYQPnp6qyYhJcdnaWFNQLuyos5DOu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHQalQlS1KptoMqpINmmq5MpJ3jgMBKSK2dyv4uOoFIbVe7EhcAqhXRYdkIyXTk4ISELCyUxDhQCAoIUBQkJJQYwHiAAAA4XCAgcdgIoHjwHJAAHBw4BMT8WCBajKBskoBUOBrsBNBc+s2ofMAcYoCQVJxUBASAWExOiYSIBu7fIyjExB6oA0g02HYFPKxIxGAYYGMm5nQGMND89DzM24R0NThcRGwYB6ihWYFDlqsSCCxToPWBg44GFHQzSLFGwQkSBARhFrHKgLQYBBvRsgJxxQgeLDzsiLSmgIMIAFy40ruIGooNIBgwXnghRwiAP/5VKGmxY4bLGAQOcQNwosGPHwoU2WrCY+e5CkxcaNLg0UeAoAE0BWBgo4ONBCx4jRrzgdGBEExobYEiQ4GJAjQK6VDlwcIAHjBdp9R7wMOKCDCYXmGFAocBFjQEfPGjYpIrbxgAHNABVImNPgwIwSsBYscGFCQUoUMDI5IEtZhE3VkhLwuGCNAFTN2wIIIGxgg2KYqQLsAiACBEWnuUzwuGD1R8QCDz/8M7Aiqwb1PnT5m8VgOQWQEiUF1nahQtpBPwcFkEBdt1yI6BgNtP4MwEcIFwYQeBHZ29C6GeYEL68sIF7WWUVgQT+YHbAVCBMwEpa8XBQAAD5pCDAB/EYQV7BBZG9J4F2GGwAwAhsjYAFBAU4J8QFIjynhIYjrCYXBszQZQIHp1AgxAcjxPOZi0+k8NkLcmkw1wom/DDOIBcUQMB4URi5oQci+GiEACNsJsiXYIYp5phklmkmEkEAADs=",
  ship_steamboat    : "data:image/gif;base64,R0lGODlhKAAoANUAAGdWSJVtT8Kykah3SjUtJldSUfmvd4RUM82OV66jiK2WddbNrGdIN2czE/nIdHlTOnZubKtaKraEVVQoDsxlLceiZ7tqK/rKh5yMc1dJQJVnQoFaRIt3YsCWYZdPIP/rjXFPPGthW0syIxgSEeWbWVQ6KzgcDIw3Fv+mTDw4NueCON/WtDklGGQ7I2ZHLnM9Gr6kelxAL+KoaHxGIREXHEItIuffvMF+RevjwMq/o5p/Z0dBQIRgPSUjI6CAVO7mwiH5BAEAAD8ALAAAAAAoACgAAAb/QMHi9wusiMikcslk6gQcTsvWrFqZthwEdMJdv+Bf7jQMm5vPs1qJwawUnMTaLKBQOCmCfA5WTBouKT05ZitUZgomDSctIgJWCwIwCzAdhGY+ExMeDTQvA5dLFRcyPgEae2EzDSaMNJoNHh1HSRguIgw3DhcKYTkTLzOBPRkPGQyLEkk7JSAlDBcfBgKhVTAmBzcpGSEQEAUAHQMRMD82HDU86i4gMjIdqVUCMy0tBCk73RAbGdEyCit0sHjwQF2JGC54xGuyQIUDBwh4+MiQb0sNGNIk6EiXIQXBGhJI6PiyYJcDGRIGuDDBIkUBDgwwyDiwgcQFAxkItGARICKY/woIJGg4cACBjAEHXOR7AACABhkXLmgYwYJFCR+gvsB8MADBwwsObrwQUeBbgWYaQIBoxEKEgQ8VDjXBoRbEhmgnEdwIgQHCjr81RNRgwaCDjBgmFH5RsCEljwAGHsqAkcDv3zyCaxQIAeNChwBgbIBIOSDAjVJ2U9DA93cHN2/eOMC4caOMFQ4DeDzosCEGDwQDBPfAt1mftwIEeoyYgOBLgg1EA/jYoFcDCZX3uIXYDiFnDxojTMhC4mWJ6A0Hp0uQoPshAgb4MmzekbzHgbQTIkhQcKMcEw69xTDdBgNoUOBbDujWVE4EPEDCSRrM8IIGNwxAyxI5NNaBBGpB9e2BBg1IEJYFJJaoAm0FblAQCAsp8VwFHdjlQAWVAeNBBBHciGOOLjDAQF0xhPDDhf+tiFAMRAjgQjAz6IijB3WpVcIIOcAwjRUBqMWAgRggkcCSL4QpZo8+ljAQCQYYQIJcSySQwwIDkKCAbUQk8ECYDeTZgo8MxABZmiSg0IFz1SixQAB4tqBlDHYFoIIKKKDgHx9EHOrBDFr+CAIDEdCGwJWUIiGAblESFIEFEfwIWqi1qFjXAXZEoNYGrCqRoasPRECBrBtwUKsSK/CggQYAvKHiBr38qoQOXNYZQKHK/iAAZC1GqwQMMlh7RhAAOw==",
  ship_ballista     : "data:image/gif;base64,R0lGODlhKAAoANUAAP6OhqQKCnBFK/thYf/7+z5Fq9DGpvsBAdadYpuHb2xcXJJuT7mtlKZZJnA5GTEUCgAAgLZzTn2H/GI5KshwNYxIHa9gLFgqFPrIxp1UJb+4qayagYhhSs0CAlEvJVkIA4uRlH5GIt3UsvtCP4J0aZCIv83JzKp5ZoVWMo9RJrxXb6JQHphaN4JPPNM2N55wQZNGKujw88srZHkID6hYRSkeW5qpr+XdurXHzOriv389OPsbGZhZYFFAReLX2+7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqFN4Xm6szVIAUGV2kgKWazQk2lEY2Fos3psMMQdqOYCpOzijQGBjR1BAAHB3Z4eltUJxYrFiUydASFlAQHAD48VSwVGSUSEocjlQMHA5aFN1M3GS+hopOIlYd2mRgGUyIICAoFEgUfpDExpwMxeLlTBr0oLyQ9IYcdGjhzLjguLhtuUgYoKBUvERMTHegbNjwBMDYBNCdUOc8VKCkOD+gdICA6ATpIzOAhr1W4CxNQ5EMXoB+aHj0+9NBFxEAfJp4uXBCA4sKHDgBBKPjwwYOCDaxEGJDTogXFJQsyrEAh4MKDGR1mKFDw4AWC/wwLNiQgBwABjQROGJCoQMHmgwcTHLR4EaInAg7kWlzQEeHFAicGWjDI8eKCgwYsFrxYKwCqjgksWDzwoPFCiBMINkRghaSFAG8JHKzI0GBtCx2IJ3iYQMMnzQgWLDTIwCLJhglihCQQ4MABjMOfaToI4cACiggUUlsgHWKDZaQ/VhpgIMCcYEiTG1CwUCHE4NwhBOyOgMCAiItE4hjf4JoE586/CUvv/Ym0ABYCQkROYeFE5hsMGBhIkCCHiAQWW0Sd/FtyhgrwYQiY/+OGG6UaKmlg0G0z+gRiKKXLBingM1p8pGnkAAocYLFBMT5U4sMfLXAw3gL7ceDaEDls8GtcZw7UNVpaQhhQCQExoLgFfwxoqEEELDBSRA4JpDBZgTg2YMFX9fnggwkmaAACIzQycAINC3hjGQvsRcfjDwzgYAMImRGxAQsbNsHAAvGlEAIgQmxAJXJjzLaBLuAZ98aabLbp5ptwxqlEEAA7",
  ship_catapult     : "data:image/gif;base64,R0lGODlhKAAoANUAAIlNKK6QdLShh8OylP379nBKNq5bJrlkKXJjUB4WD65yS5RtUkIyJ9NpTNTIqOLYuP6ZZ+h5NVVMOWA9LPaFOtOCUZ2IcJJ4YcVkJp4zJ9Slf41bQumTW7SEV9h+OnY7G65/Zt5sKlcxG65cQceXavB0T/28uMZ2NsZHL/asbMZrMalSGv9maNl0L8J4Xv+Lj9tEPZ1TJp1dOuvhwc1uLNJxM8vAotunYf9/hP+sSOC7ire9wXRCI+q8nv9XWe7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHQ6DZwc1GinFchCAxiS9znAdB+Ox1g5U3UqEUpIvEYqKIpOhxap1I8XEwNCA3ccM39EeTgmLjY/JBViDwKDdQoaLCYwFkIPAQgTDAqIawKaPhkiIy4yDAyiBQJrNi8mLBkSryIbMiMVIwkbaxo4MAASBQUfPDwVENAFDJZUDjAoBRIfAAIBOgsiChApEL0dAwKPRTNqSQIGLQcSCBo6JBYXFhMTMgAjCws+xDigAMSQARRy3Gh3RMABDCduBMg3YIaDUK8mKNChQYYMFxUK2tgQIQQFOkg6hFjxkMQABK/mIZgp4QAEEzNmaKgAwiGF/xgxaigpE0PFwxMbGEhYKmHBhQ0BQPQgQDXAhg/wgspQ8qCZ0QMrVnhIocECgl+yCGjQ4MBCRhEfQkSgZkTABhsDDAjEcOBhCw4VmDFAIGBHgQSIEVxAYCDCAiQz8CECtYAGgA81aGAIa2AFjwUeYohIrCFFnAOzjNi4MOhBPiEbJgTFgEGzgYEPQ+iOw/sAACxEbIzYgGjAhUcznD6oHIGGAXgtThy4vS3GB4EAABQoEqAE8QcgOv1wsCD1jwEyWrQwquKrdmUTRPDQDnx8gwadBIy4IETAgvpDCDAQDS14YBQPExSA4AQ8DDNEAA2MgMUCMQwiQAOPJWFcLzIYAGDAPiACIJ4QCvAn3HY/uFCChE7k9MAAC4wQAwAy3FWEBSN0YkMDJSzAUBQOHeACBxzQFcAjEDbQxRgWyPAMBBwAaEGEdHkRQAEjQDPiDwJc8GMdxi1QSiJklmnmmWhmEQQAOw==",
  ship_mortar       : "data:image/gif;base64,R0lGODlhKAAoANUAAPv6+rqsj8W6m8/GqJVtUGY1F1IzJIpFG4pcR9/WtQoDAlsuF8Z2OKVVOqpvTCoZEJqJcc9pSvXMkIpUOWlKOGE6KbpcRL1lLJh8ZH1EI3RcSP/npqSOdnREMoZJH8uPZ9OndXo+FqOVfYdGM5lcMrFXIJpgP+maVYg9EplLHrB8YZdWJaqIbD8nHv/6u5VMNraMZo5RJmNCMObfw7eab//wrvbAfEMhDP3cnK+dgW8+H9B/PH5RPX1QMKmSaO7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqFQYSEynBMHs+hwIRIGZlducAc4CclObAAzU6zS8OZHNmQEDRDgIvO9FGAYYGhQVBQYUImN3CTwUEwySFz0yFGksGHJqBBMICBQyFYcZPyIRDxN/XAMONx6HBQ8LBSE5PBO5q1OOEwoLBwU3Dw4FBTwdFS0tagIXGQ8GwpY9BR08Bi0PPJtTMyQXDBk3Nx82IBUdE8k8KgUkLCw5WA4pJQwgMHUdBhUG/S0QmNjxwQQCAruYECDRqcSOEApujFD24IECAw9kwJBQQ4BBByy2MGFx4IADBzEurKiw4N8/fwpiGpDggsDCHTtMcFAigFCK/xAkHBC4cEJDzIoxF1DwIQHHhg86OnTwMCDhkAQcdv5AUCCFBxMgbOAI0EImDacb0qb98CLDvCNYIbwRIFdACh0hVoCo4WIDjbAb+LqoQdgGia9HWr0I8APr2wAEEKRIUcAEgR4OTKC4sOOEDQk2TpRIseLtVRUWJggYoILDlgEYtGLIsMCrBw8hcodAMdlrbh1FOFhokCOBihc7Z2T60xNCjNEZSh6YjFuHsQI6uiGwgGFGjhEIZrRqIEKIcgxWZmCIwT5GhhDSPbTfQ8SPxw6MYURoQB+yaT4Y2JRDT3i9NwojQwgwAgY/BGBBBAgMMIMKEZhg1RECaDCKJSIRkT6AGA7sN4+DEVhwYRIcpNMBgkRsR4AYBDwYoRQDaDBBeRgyloMFFiBHhh9KYFDijIAcgYFORSap5JJMNplEEAA7",
  ship_submarine    : "data:image/gif;base64,R0lGODlhKAAoANUAAPOcbdXMrK2jiJJtTVU2KZWLdqySc3ZZR/ZzLMC3mQIDDLVdKIhcR8VkKjUxL1pSTm07GYxFG7FjNsGPXrl5V3hLNDI5QnhmVGI+LZhYPIlWOtFrK3pEK2tJOEwrF4t7aE5CO7drRYxJJKloSXZwb3hTPZpMI6R3Vsx2UN1zL6xYIoM/GZdTLq9xVEFCRWZRQc9aIXY+GoNONBoZHf+BL59eQiceIOXdum5AJcSpeKSDYItPKsFSHstqPDYnIu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHRKrUYTglvx9hkZAtaiwKUdJkAhAGNWDv8Kj6LLodEoFGD37UEqCAM5Fg4HBAogbkNzAj8DFBMgLwkJBW1SAQIFmQYPDj8BDRwcFQQylZYlDAwlESIuF104NjsqHioJVgWpDCIwMD0UJQuFOAsxJicJeVIXJQcVCxspKBQWFi8ErBgrOwIfBbdRBR2rGw0tLRIsIC4uHTsMOjoTOpkf4E43GCUr5SctLAsaqGN3YcIEAznmCbhgKsmFF+I8RFigygaBBuUyvLDgakKOHAZOHDDgpECAABgIeIDQoYICHywwmEgxggEIjhd0DNBx4Zwy/yYBLhDAUWIUBwwKMFCgEKKBBhfVqoGoESLEoicCOnTAAEGEjKTnJGBsIAMDBxMqMrAYgUJHlJMCSkDgIINBjR0+OERDQAMBAAAUMtRAcaJhEwE4cHTQgNTDhmjS/gIQmGGa4SYFirKY4TjFBgkURgBIgQDBggwh3FIRwJWDiIAbQjgKQbq0CdT3LBmQG0PFghrnGqQYjoAHhxof3LxwILECgwyQHzeIoaFElQAGNiCQAMKH1h0NwnuenpLKBxIfQvQdUOBACQ4qGiyYryKGjBYGChgg+eRGgT4DgHPDAdqwEsEKEHhQwQiC/XXVE5MYEUAuMVQIQUoFEIDaX4gMESBAAh8ccMEtH1SwGAr8dXgEMyKmqOKLMMYo44w01khjEAA7",
  presetRemove      : "data:image/gif;base64,R0lGODlhSwBLALMAAOXMrt+3m+/nxsp0YqMEBJgVE8+QfMsWE6I2MLRLQLhANrIEBNBOQqcEBKcRD+7mwiH5BAEAAA8ALAAAAABLAEsAAAT/8MlJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu7zwmAIEAQAASBAwGIZH3MwwGSo/xyUgOd80BQwG9bqbaAyPovWUZh4XCuvQFqGkHNGo7pxuNNd0CRi/wcmRtMnZ/DQR5bHxvYYaIgXswhXgEiImRfXeWj3NlLpOblnpemY6VlJCeK6Chomylh5SVlqmDKaytp6OMfoe5p7WrAE69vqfGs2tOjbKzzZXBKLi/x2vM1MfQnbYi09inDL3f2QSpJ1Pi4+Sz7M7I7ZUDqt1vd77P8O75+fiVBQECuBUZpkBdu3771s0qYCCgwCI/ChqEhzDhKYYOH35wCKBgRYsT/9lhdHgrIIAEIfm92zcy4CqTKD+CVNdSIwmOElPuw1fzBU52Mmdu6ikJpkKhKonG4IjyKFKRDUnSYAp0JVKlU4EYcKAz34CMZnhx7dougZB5knhpcop0lE0VsNg+JeCWkNo/+ubmq+vzbrOgQi+hPee3ql5+iPjCLZz3MNBqim4xbuz4lDvFJWCtBDwTmeC3HApzBvmu3xoAgz28KWa4sjOKxhQABK2hninKla3KQjCEdgYgA8Z2LYCALAEEs337CBh8eJKmuPMhB5vZ4daUI0+m5E39XMDrBmtqN8hdakkB4L/VNOnR6qzp5uF+F/6r58+K5V1+mk9NKdV+8OnnE1V/VWH1AFUH5afcTQRSYqAECFKiYA3WCffgBD8hEuCC3qHH1YUUULVhDg4NAGIFHEHRHQ4crfhFRvGRCGMIMHK4n4A95Kjjjjz26OOPQAYp5JBEDhkBADs%3D",
  presetPlus        : "data:image/gif;base64,R0lGODlhDwAPAKIFAFeZVIbjfF6hWnrQcmOTUv///wAAAAAAACH5BAEAAAUALAAAAAAPAA8AAAMnWLrc/jA6AoRUIIBb8oYCQWlC6QDDEKzpxwCwEAiwe2qcl8Nc73MJADs="
}

//-----------------------------------------------------------------------------
const unitsList = {
  army:   [["phalanx", "steamgiant", "spearman", "swordsman" , "slinger"   , "archer", "marksman"],
           ["ram"    , "catapult"  , "mortar"  , "gyrocopter", "bombardier", "cook"  , "medic"   ]],
  fleet:  [["ship_ram", "ship_flamethrower", "ship_steamboat", "ship_ballista"],
           ["ship_catapult", "ship_mortar", "ship_submarine"]]
};

const unitsProperties = {
  army: {
    phalanx     : { garrison: 1 },
    steamgiant  : { garrison: 3 },
    spearman    : { garrison: 1 },
    swordsman   : { garrison: 1 },
    slinger     : { garrison: 1 },
    archer      : { garrison: 1 },
    marksman    : { garrison: 4 },
    ram         : { garrison: 5 },
    catapult    : { garrison: 5 },
    mortar      : { garrison: 5 },
    gyrocopter  : { garrison: 1 },
    bombardier  : { garrison: 2 },
    cook        : { garrison: 2 },
    medic       : { garrison: 1 }
  },
  fleet: {
    ship_ram          : { garrison: 3 },
    ship_flamethrower : { garrison: 3 },
    ship_steamboat    : { garrison: 3 },
    ship_ballista     : { garrison: 3 },
    ship_catapult     : { garrison: 3 },
    ship_mortar       : { garrison: 3 },
    ship_submarine    : { garrison: 1 }
  }
};

const battleProperties = {
  army: {
    line1     : ["phalanx", "steamgiant", "spearman", "swordsman"],
    line2     : ["marksman", "archer", "slinger"],
    artillery : ["mortar", "catapult" , "ram" ],
    flankLeft : ["swordsman", "spearman"],
    flankRight: ["swordsman", "spearman"],
    air1      : ["gyrocopter"],
    air2      : ["bombardier"],
    support1  : ["medic"],
	support2  : ["cook"]
  },
  fleet: {
    line1     : ["ship_ram", "ship_flamethrower", "ship_steamboat", "ship_ballista", "ship_catapult", "ship_mortar" ],
    line2     : ["ship_mortar", "ship_catapult", "ship_ballista" ],
    submarine : ["ship_submarine"],
  }
}

//For each equal townhall level or more: 
//   slots_type: [number_of_slots, slot_size]
const battlefieldProperties = {
  army: {
    1  : { line1: [3, 30], line2: [3, 30], artillery: [1, 30], flankLeft: [0, 30], flankRight: [0, 30], air1: [1, 10], air2: [1, 10], support1: [1, 0], support2: [1, 0]},
    5  : { line1: [5, 30], line2: [5, 30], artillery: [2, 30], flankLeft: [1, 30], flankRight: [1, 30], air1: [1, 20], air2: [1, 20], support1: [1, 0], support2: [1, 0]},
    10 : { line1: [7, 30], line2: [7, 30], artillery: [3, 30], flankLeft: [2, 30], flankRight: [2, 30], air1: [1, 30], air2: [1, 30], support1: [1, 0], support2: [1, 0]},
	17 : { line1: [7, 40], line2: [7, 40], artillery: [4, 30], flankLeft: [3, 30], flankRight: [3, 30], air1: [2, 20], air2: [2, 20], support1: [1, 0], support2: [1, 0]},
	25 : { line1: [7, 50], line2: [7, 50], artillery: [5, 30], flankLeft: [3, 40], flankRight: [3, 40], air1: [2, 30], air2: [2, 30], support1: [1, 0], support2: [1, 0]}
  },
  fleet: {
    1  : { line1: [5, 30], line2: [5, 30], submarine: [1, 30] }
  }
}

var view;
var city;

var data = {
  army: {
    phalanx           : 0,
    steamgiant        : 0,
    spearman          : 0,
    swordsman         : 0,
    slinger           : 0,
    archer            : 0,
    marksman          : 0,
    ram               : 0,
    catapult          : 0,
    mortar            : 0,
    gyrocopter        : 0,
    bombardier        : 0,
    cook              : 0,
    medic             : 0
  },
  fleet: {
    ship_ram          : 0,
    ship_flamethrower : 0,
    ship_steamboat    : 0,
    ship_ballista     : 0,
    ship_catapult     : 0,
    ship_mortar       : 0,
    ship_submarine    : 0
  }
};
var options = {
  signature         : 'ikaArmyHelper',
  showPreviewTitles : true
};

var update = true;
var presets = {army: {}, fleet: {}};
var placed = {};
var wallLevel = 0;
var cityLevel = 0;

//-----------------------------------------------------------------------------
function getLanguage() {
  var lang = 'english';
  $("script").each( function() {
    var langMatch = /LocalizationStrings\['language'\]\s+=\s+'([a-zA-Z]+)';/g.exec( this.innerHTML );
    if ( langMatch ) {
      lang = {
      ar:  "spanish",    by:  "russian",  br:  "portugese",  bg:  "bulgarian",
      cl:  "spanish",    cn:  "chinese",  co:  "spanish",    cz:  "czech",
      dk:  "danish",     en:  "english",  fi:  "finish",     fr:  "french",
      de:  "german",     gr:  "greek",    it:  "italian",    hk:  "chinese",
      hu:  "hungarian",  il:  "hebrew",   kr:  "korean",     lv:  "latvian",
      lt:  "lithuanian", mx:  "spanish",  nl:  "dutch",      no:  "norwegian",
      pk:  "urdu",       pe:  "spanish",  ph:  "pinoy",      pt:  "portuguese",
      pl:  "polish",     ro:  "romanian", ru:  "russian",    rs:  "serbian",
      sk:  "slovak",     si:  "slovene",  es:  "spanish",    se:  "swedish",
      tw:  "chinese",    tr:  "turkish",  ua:  "ukranian",   ae:  "arabic",
      us:  "english",    ve:  "spanish",  vn:  "vietnamese", ba:  "bosnian"
      }[langMatch[1]] || 'english';
    }
    delete langMatch;
  });
  return lang;
}

//-----------------------------------------------------------------------------
function oc(a) {
  var o = {};
  for (var i = 0; i < a.length; i++) {
    o[a[i]]=i;
  }
  return o;
}

//-----------------------------------------------------------------------------
function getUnitsFromMilitaryOverview(type) {
  var res = "";
  var rows = $("div.contentBox01h:first div.content table tr");
  for (var row = 0; row < rows.length; row+=2) {
    var values = $("td", rows[row+1]);
    for (var i = 0; i < values.length; i++) {
      var unit = unitsList[type][row / 2][i];
      var value = values[i].innerHTML;
      data[type][unit] = parseInt(value);
      if (isNaN(data[type][unit])) {
        data[type][unit] = 0;
      }
    }
  }
  ahSetVal("ikariamArmyHelper.units." + type + "." + city, data[type]);
}

//-----------------------------------------------------------------------------
function getUnitsFromBuilding(type) {
  var units = $("#units > li");
  units.each( function() {
    var unit = $(this).attr("class").replace(/^unit\s/,"");
    var value = $("div.unitinfo > div.unitcount", this).contents()[1].nodeValue;
    data[type][unit] = parseInt(value);
    if (isNaN(data[type][unit])) {
      data[type][unit] = 0;
    }
  });
  ahSetVal("ikariamArmyHelper.units." + type + "." + city, data[type]);
}

//-----------------------------------------------------------------------------
function storeTargetCity() {
  $("ul#cities li.cityLocation.city").each(function() {
    var id = $("a:first", $(this)).attr('id');
    id = parseInt(id.substr(id.indexOf('_') + 1));
    if (isNaN(id)) {
      id = 0;
    }
    var level = parseInt($(this).find("ul.cityinfo li.citylevel").contents()[1].nodeValue);
    ahSetVal("ikariamArmyHelper.targetCityLevel." + id, level);
  });
}

//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------

function getCityLevel() {
  var level = ahCityGetBuildingLevelByType("townHall");
  ahSetVal("ikariamArmyHelper.cityHallLevel." + city, level);
}

//-----------------------------------------------------------------------------
function getWallLevel() {
  var level = ahCityGetBuildingLevelByType("wall");
  ahSetVal("ikariamArmyHelper.cityWallLevel." + city, level);
}

//-----------------------------------------------------------------------------
function calcGarrison() {
  var garrison = 0;
  for (var key in data.army) {
    garrison += data.army[key]; // * unitsProperties.army[key].garrison;
  }
  var garrisonMaximum = 250 + 50 * (cityLevel + wallLevel);

  var style = "";
  if (garrison.current > garrison.maximum) {
    style = 'color: #f00; font-weight:bold;'
  } else if (garrison.current > 0.9 * garrison.maximum) {
    style = 'color: #c30;'
  }

  return { current: garrison, maximum: garrisonMaximum, style: style };
}

//-----------------------------------------------------------------------------
function appendGarrisonInfo() {
  var garrison = calcGarrison();
  
  var entry = document.createElement('li');
  entry.setAttribute('class', 'citylevel');
  entry.setAttribute('id','garrisonInfo');
  var html = '<span class="textLabel">'+ language.garrison + ': </span>' + 
             '<span style="' + garrison.style + '">' + garrison.current + " / " + garrison.maximum + '</span>';
  entry.innerHTML = html;
  
  var button = $("div#information div.centerButton");
  button.before(entry);

  html  = '<div id="armyPreview" style="top:180px; left:230px; width: 362px; height: 203px; z-index: 9999; position: absolute; text-align: justify; background-color: #FCF4DE; padding: 1px 5px 5px 5px; display: none;">';
  html += "<table>\n";
  
  for (row in unitsList.army) {
    html += '<tr align="center">\n';
    for (i in unitsList.army[row]) {
      html += '<td style="padding: 3px;"><div style="padding: 3px; background-color: #FAEAC6;'+((data.army[unitsList.army[row][i]]==0)?' opacity:0.5;':'')+'"><img class="advisorUnitIcon" src="'+images[unitsList.army[row][i]]+'" title="'+language[unitsList.army[row][i]]+'"><br><span>'+data.army[unitsList.army[row][i]]+'</span></div></td>\n'
    }
    html += '</tr>\n';
  }

  html += '<tr align="center">\n';
  for (row in unitsList.fleet) {
    for (i in unitsList.fleet[row]) {
      html += '<td style="padding: 3px;"><div style="padding: 3px; background-color: #FAEAC6;'+((data.fleet[unitsList.fleet[row][i]]==0)?' opacity:0.5;':'')+'"><img class="advisorUnitIcon" src="'+images[unitsList.fleet[row][i]]+'" title="'+language[unitsList.fleet[row][i]]+'"><br><span>'+data.fleet[unitsList.fleet[row][i]]+'</span></div></td>\n'
    }
  }
  html += '</tr>\n';

    html += "</table>";
  html += "<div style='position: absolute; top: -10px; left: -5px; width: 384px; height: 5px;'><img width='100%' src='" + images.hintTop + "'/></div>" +
          "<div style='1000; position: absolute; top: 2px; left: -5px; width: 12px; height: 100%; background: transparent url(" + images.hintLeft + ") repeat-y scroll 0 0;'></div><div style='position: absolute; top: 2px; right: -5px; width: 12px; height: 100%; background: transparent url(" + images.hintRight + ") repeat-y scroll 0 0;'></div>" +
          "<div style='position: absolute; bottom: 2px; left: -5px; width: 384px; height: 5px;'><img width='100%' src='" + images.hintBottom + "'/></div>";
  html += '</div>';
  
  $("div#mainview").before(html);
  
  entry.setAttribute('style', "cursor: pointer");
  entry.setAttribute('onMouseOut' , "this.style.backgroundColor = null; document.getElementById('armyPreview').style.display = 'none'");
  entry.setAttribute('onMouseOver', "this.style.backgroundColor = '#deac63'; document.getElementById('armyPreview').style.display = 'inline'");
}

//-----------------------------------------------------------------------------
function appendGarrisonInfo2TownHall() {
  var garrison = calcGarrison();
  
  var html = '<span class="value occupied">' + garrison.current + ' / </span>';
  var elem = $("li.garrisonLimit span.textLabel");
  elem.append(html);
  
  $("li.garrisonLimit span[class='value occupied']").each( function() {
    $(this).setAttribute('style', garrison.style);
  });
}

//-----------------------------------------------------------------------------
function appendGarrisonInfo2Wall() {
  var garrison = calcGarrison();
  
  var html = '<span style="' + garrison.style + '">' + garrison.current + " / " + garrison.maximum + '</span></li>';
  $("#wallInfoBox div.weapon ~ span.textLabel").eq(2).next().html(html);
}
//-----------------------------------------------------------------------------
function unitsPreviewUpdate(type, targetBattlefieldProperties, forces, draw) {
  for (key in battleProperties[type]) {
    for (var i = 0; i < targetBattlefieldProperties[key][0]; i++) {
      var u = 0;
      for (; u < battleProperties[type][key].length; u++) {
        var unit = battleProperties[type][key][u];
        if (forces[unit] > 0) {
          var max = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
          if (max > forces[unit] || max == 0) {
            n = forces[unit];
          } else {
            n = max;
          }
          forces[unit] -= n;
          placed[key+i] = {unit: unit, num: n};
          if (draw) {
            $("span#"+key+i).text(n + ((max == 0)?'':(' / ' + max)));
            $("img#"+key+i).attr("src", images[unit]);
            $("img#"+key+i).attr("title", language[unit]);
          }
          break;
        }
      }
      if (u == battleProperties[type][key].length) {
        placed[key+i] = {unit: "", num: 0};
        if (draw) {
          $("span#"+key+i).text("0");
          $("img#"+key+i).attr("src", images.empty);
          $("img#"+key+i).attr("title", '');
        }
      }
    }
  }
  if (draw) {
    var html = "";
    for (key in forces) {
      if (forces[key] > 0) {
        html += '<td class="advisorSquare" style="padding-top: 3px;"><img class="advisorUnitIcon" src="'+images[key]+'" title="'+language[key]+'">';
        html += '<br><span>'+forces[key]+'</span></td>\n';
      }
    }
    if (html != "") {
      html = '<table style="width: 1%;" align=left><tr align="center">\n' + html;
      html += '</tr></table>\n'
    }
    $("span#armyReserve").html(html);
  }
}

//-----------------------------------------------------------------------------
function assignedUnits(type, newForces) {
  var units = $("ul.assignUnits > li");
  var forces = [];
  for (key in data[type]) {
    forces[key] = 0;
  }

  units.each( function() {
    var unit = $(this).attr("class").replace(/^\s*(.*?)\s*$/,"$1").replace(/\s+.*$/,"");
    var input = $("input.textfield", this);
    if (typeof(newForces) != 'undefined') {
      input.attr("value", newForces[unit]);
      var evt = document.createEvent("KeyEvents");
      evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
      input[0].dispatchEvent(evt);
    }
    var value = input.attr("value");
    forces[unit] = parseInt(value);
    if (isNaN(forces[unit])) {
      forces[unit] = 0;
    }
  });
  return forces;
}

//-----------------------------------------------------------------------------
function unitsChangeHandler(type, targetBattlefieldProperties, draw) {
  if (update) {
    unitsPreviewUpdate(type, targetBattlefieldProperties, assignedUnits(type), draw);
  }
}

//-----------------------------------------------------------------------------
function drawUnitsSquare(targetBattlefieldProperties, squareTypes, width) {
  if (squareTypes == '') {
    return '<td width="'+width+'" style="padding-top: 3px;">&nbsp;</td>';
  }
  var html = '';
  var title = squareTypes;
  if (squareTypes.length > 1) {
    title = squareTypes.shift();
  }
  $(squareTypes).each( function() {
    for (var i=0; i < targetBattlefieldProperties[this][0]; i++) {
      squareHtml  = '<td class="advisorSquare" style="padding-top: 3px;"><img id="'+this+i+'" class="advisorUnitIcon" src="'+images.empty+'">';
      squareHtml += '<br><span id="'+this+i+'">0</td>\n';
      if ( (i & 1) == ((this == 'flankRight')?1:0) || this == 'reserve' ) {
        html += squareHtml;
      } else {
        html = squareHtml + html;
      }
    }
  });
  if (html != '') {
    html = '<td width="'+width+'" style="padding-top: 3px;">' + ((options.showPreviewTitles)?(language[title] + ':<br>'):'') + '<table style="width: 1%;"><tr align=center>\n' + html;
    html += '</tr></table></td>\n';
  } else {
    return '<td width="'+width+'" style="padding-top: 3px;">&nbsp;</td>';
  }
  return html;
}

//-----------------------------------------------------------------------------
function drawUnitButtons(type, targetBattlefieldProperties, draw) {
  GM_addStyle(
    'input.fillRow { position: absolute; top: 10px; left: 630px; width: 15px; margin: 0px; padding: 2px 0px; } ' +
    'input.fillRow:active { padding: 3px 0px 1px 0px; } ' +
    'input.addSlot { position: absolute; top: 10px; left: 613px; width: 15px; margin: 0px; padding: 2px 0px; } ' +
    'input.addSlot:active { padding: 3px 0px 1px 0px; } ' +
    'input.removeSlot { position: absolute; top: 10px; left: 541px; width: 15px; margin: 0px; padding: 2px 0px; } ' +
    'input.removeSlot:active { padding: 3px 0px 1px 0px; } ' +
    'div.assignRightBlock { height: 45px; text-align: right; margin: -15px 24px -15px 5px;"}'
  );
  $("ul.assignUnits > li input.textfield").each( function() {
    var place = $(this).parent();
    place.append('<input type="button" value="-" class="button removeSlot" title="'+language.removeSlot+'">');
    place.append('<input type="button" value="+" class="button addSlot" title="'+language.addSlot+'">');
    if (draw) {
      place.append('<input type="button" value="#" class="button fillRow" title="'+language.fillRow+'">');
    }
    
    var unit = $(this).parents("li:last").attr("class").replace(/^\s*(.*?)\s*$/,"$1").replace(/\s+.*$/,"");
    var id = $(this).attr("id");
    $("input.removeSlot", place)[0].addEventListener('click', function (){ this.blur(); unitChangeNumber(-1, type, targetBattlefieldProperties, unit, id); }, false);
    $("input.addSlot", place)[0].addEventListener('click', function (){ this.blur(); unitChangeNumber(+1, type, targetBattlefieldProperties, unit, id); }, false);
    if (draw) {
      $("input.fillRow", place)[0].addEventListener('click', function (){ this.blur(); unitChangeNumber(0, type, targetBattlefieldProperties, unit, id); }, false);
    }
  });
  
  var bottomButtons = '<hr> \
  <div class="assignRightBlock"> '+language.selectUnits+': \
  <!--input type="button" value="'+language.assignField+'" class="button" id="assignField"--> \
  <input type="button" value="'+language.assignAll+'" class="button" id="assignAll"> \
  <input type="button" value="'+language.assignNone+'" class="button" id="assignNone"> \
  </div>\n';
  $("ul.assignUnits").after(bottomButtons);
  
//  $("#assignField").click( function() { this.blur(); assignField(type, targetBattlefieldProperties); });
  $("#assignNone").click( function() { this.blur(); assignUnits("setMin", type, targetBattlefieldProperties, draw); });
  $("#assignAll").click( function() { this.blur(); assignUnits("setMax", type, targetBattlefieldProperties, draw); });
}

//-----------------------------------------------------------------------------
function assignUnits(what, type, targetBattlefieldProperties, draw) {
  update = false;
  $("ul.assignUnits > li > div.sliderinput a."+what).each( function() {
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent( 'click', true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null );
    this.dispatchEvent(event);
  });
  update = true;
  unitsChangeHandler(type, targetBattlefieldProperties, draw)
}

//-----------------------------------------------------------------------------
function assignField(type, targetBattlefieldProperties) {
  var preplaced = placed;
  for (key in battleProperties[type]) {
    for (unit in battleProperties[type][key]) {
      var unitsNum = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
      for (var i = 0; i < targetBattlefieldProperties[key][0]; i++) {
        if (unit == preplaced[key+i].unit || preplaced[key+i].unit == "") {
        }
      }
    }
  }
}

//-----------------------------------------------------------------------------
function unitChangeNumber(inc, type, targetBattlefieldProperties, unit, id) {
  var input = $("#"+id);
  var value = parseInt(input.attr("value"));
  if (isNaN(value)) {
    value = 0;
  }
  
  if (inc == 0) {
    var unitsToPlace = 0;
    for (key in battleProperties[type]) {
      if (unit in oc(battleProperties[type][key])) {
        var unitsNum = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
        for (var i = 0; i < targetBattlefieldProperties[key][0]; i++) {
          if (unit == placed[key+i].unit || placed[key+i].unit == "" || 
              oc(battleProperties[type][key])[unit] < oc(battleProperties[type][key])[placed[key+i].unit]) {
            if (unitsNum == 0) {
              unitsToPlace = 99999;
              break;
            } else {
              unitsToPlace += unitsNum - ((unit == placed[key+i].unit)?placed[key+i].num:0);
            }
          }
        }
        if (unitsToPlace > 0 && key != "flankLeft") {
          break;
        }
      }
    }
    value += unitsToPlace;
  } else {
    var unitsPerSlot = 1;
    for (key in battleProperties[type]) {
      for (var u = 0; u < battleProperties[type][key].length; u++) {
        if (unit == battleProperties[type][key][u]) {
          unitsPerSlot = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
          if (unitsPerSlot == 0) {
            unitsPerSlot = Math.floor(30 / unitsProperties[type][unit].garrison);
          }
          break;
        }
      }
      if (unitsPerSlot != 1) {
        break;
      }
    }
    value = Math.floor((value+((inc<0)?unitsPerSlot-1:0))/unitsPerSlot)*unitsPerSlot + unitsPerSlot*inc;
  }
  input.attr("value", value);
	var evt = document.createEvent("KeyEvents");
	evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
	input[0].dispatchEvent(evt);
}

//-----------------------------------------------------------------------------
function drawAttackHelper(type, draw) {
  var targetId = parseInt($("form > input[name='destinationCityId']").attr("value"));
  var targetLevel = ahGetVal("ikariamArmyHelper.targetCityLevel." + targetId);
  if (typeof(targetLevel) == 'object') {
    targetLevel = 10;
  }
  
  var targetBattlefieldProperties;
  for (var key in battlefieldProperties[type]) {
    if (targetLevel < key) break;
    targetBattlefieldProperties = battlefieldProperties[type][key];
  }

  GM_addStyle(
    '#container .assignUnits .weight {left: 88px; width: 24px; !important;}' +
    '#container .assignUnits .sliderinput {margin-left: 140px; !important;}' +
    '#container .assignUnits .textfield {left: 557px; !important;}'
  );

  if (draw) {
    var place = $("div#select" + type.slice(0,1).toUpperCase() + type.slice(1));
    
    GM_addStyle(
      'td.advisorSquare     { background:url(' + images.square + ') no-repeat top center; background-position: 6px 3px; } ' +
      'img.advisorUnitIcon  { width:36px; height:36px; padding: 0px 6px 0px 6px; cursor: pointer; !important; }' +
      '#missionSummary .targetName  {width: 400px; !important;}'
    );

    targetCityLevelText = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="textLabel1">' + language.cityLevel + ": " + targetLevel + '</span>';
    $("div#missionSummary div.plunderInfo div.targetName").append(targetCityLevelText);
    $("div#missionSummary div.journeyTarget").append(targetCityLevelText);

    const tableLayout = {
      army  : [ ["air", "air2"]	 	   , ["artillery"], ["air", "air1"]		   , "\n", 
               ["support", "support1"] , ["line2"]    , ["support", "support2"], "\n",
               ["flankLeft"] 		   , ["line1"]    , ["flankRight"]
              ],
      fleet : [ ""          , ["line2"]    , ["submarine"]          , "\n",
                ""          , ["line1"]    ,  ""
              ]
    };
    var entry = document.createElement('div');
    entry.setAttribute('id', 'plunderAdvisor');
    entry.setAttribute('class', 'contentBox01h');
    var html = '<h3 class="header">'+ language.advisor + '</h3>\n';
    html += '<div style="margin: -18px 10px 8px 5px; text-align: right;">By '+linkForUpdate()+'.</div>\n';
    html += '<div class="content">\n';
    html += '<table border=0><tr align="center">\n';

    $(tableLayout[type]).each( function() {
      if (this == "\n") {
        html += '</tr><tr align="center">';
      } else {
        html += drawUnitsSquare(targetBattlefieldProperties, this, "33%");
      }
    });
    
    html += '</tr><tr>';

    html += '<td colspan=3 height="80" align="left" style="padding-top: 3px;"><p>'+language.reserve+':<br><span id="armyReserve"></span></p></td>';
    
    html += '</tr></table>\n';
    html += '</div>\n';
    html += '<div class="footer"></div>\n';
    entry.innerHTML = html;
    place.append(entry);
  }
 
  installHandlers(type, targetBattlefieldProperties, draw)  
  drawUnitButtons(type, targetBattlefieldProperties, draw);
  drawPresetsBox(type, targetBattlefieldProperties, draw);
}

//-----------------------------------------------------------------------------
function installHandlers(type, targetBattlefieldProperties, draw) {
  $("ul.assignUnits > li > div.sliderinput > div.sliderbg > div.sliderthumb").each( function() {
    $(this)[0].addEventListener ("DOMAttrModified", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
  });
  $("ul.assignUnits > li > div.sliderinput a.setMin").each( function() {
    $(this)[0].addEventListener ("click", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
  });
  $("ul.assignUnits > li > div.sliderinput a.setMax").each( function() {
    $(this)[0].addEventListener ("click", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
  });
  $("ul.assignUnits > li input.textfield").each( function() {
    $(this)[0].addEventListener ("keyup", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
  });
  unitsChangeHandler(type, targetBattlefieldProperties, draw);
}

//-----------------------------------------------------------------------------
function addInfoBox(titleHtml, contentDiv)  {
		var box = document.createElement('div');
		box.className = 'dynamic';
		box.innerHTML = '<h3 class="header">' + titleHtml + '</h3>';
		contentDiv.className = "content";
		box.appendChild(contentDiv);
		var footer = document.createElement('div');
		footer.className = "footer";
		box.appendChild(footer);
		document.getElementById('mainview').parentNode.insertBefore(box, document.getElementById('mainview'));
	};

function drawPresetsBox(type, targetBattlefieldProperties, draw) {
  var presetsData = ahGetVal("ikariamArmyHelper.presets");
  if (type in presetsData) {
    presets = presetsData;
  }
  
  var div = document.createElement('div');
  div.setAttribute('class', "content");
  var html = '<div id="ikaArmyPresets" style="overflow: auto; max-height: 350px; margin-left: 3px; margin-right: 3px;"></div>';
  html += '<div style="text-align: right; margin-right: 5px;"><a href="" clsss="" id="ikaArmyPresetsAddNew">'+language.presetsAdd+'</a></div>';
  div.innerHTML = html;
  addInfoBox(language.presetsTitle, div);
  presetsDraw(type, targetBattlefieldProperties, draw);
  $("#ikaArmyPresetsAddNew").click( function() { presetsAddNew(type, targetBattlefieldProperties, draw); return false; });
}

//-----------------------------------------------------------------------------
function presetsDraw(type, targetBattlefieldProperties, draw, animateName) {
  var html = '';
  for (name in presets[type]) {
    var tooltip = "";
    for (unit in presets[type][name]) {
      if (presets[type][name][unit] > 0) {
        tooltip += ((tooltip!='')?'  |  ':'') + language[unit] + ':&nbsp;' + presets[type][name][unit];
      }
    }
    html += '<div class="iakArmyPresetsRow" name="'+escape(name)+'"><table width="100%" border="0" style="font-size: 11px;"><tr>';
    html += '<td width="15"><a href="" class="iakArmyPresetsApplyPlus"><img width="15" src="'+images.presetPlus+'"></a></td>';
    html += '<td><a href="" class="iakArmyPresetsApply" title="'+tooltip+'">'+name+'</a></td>';
    html += '<td width="15"><a href="" class="iakArmyPresetsRemove"><img width="15" src="'+images.presetRemove+'" title="'+language.presetsRemove+'"></a></td>';
    html += '</tr></table></div>\n';
  }
  
  $("#ikaArmyPresets").html(html);
  if (typeof(animateName) != 'undefined') {
    $("#ikaArmyPresets div.iakArmyPresetsRow[name="+escape(animateName)+"]").hide().slideDown(750);
  }
  $("#ikaArmyPresets a.iakArmyPresetsApply").click( function() {
    $(this).parents("div.iakArmyPresetsRow").animate( { backgroundColor: "#deac63" }, 300  ).animate( { backgroundColor: "#f6ebba" }, 300);
    presetsApply(type, targetBattlefieldProperties, draw, $(this).parents("div.iakArmyPresetsRow").attr("name"));
    return false;
  });
  $("#ikaArmyPresets a.iakArmyPresetsApplyPlus").click( function() {
    $(this).parents("div.iakArmyPresetsRow").animate( { backgroundColor: "#deac63" }, 300  ).animate( { backgroundColor: "#f6ebba" }, 300);
    presetsApply(type, targetBattlefieldProperties, draw, $(this).parents("div.iakArmyPresetsRow").attr("name"), true);
    return false;
  });
  $("#ikaArmyPresets a.iakArmyPresetsRemove").click( function() {
    $(this).parents("div.iakArmyPresetsRow").slideUp(750, function() { presetsRemove(type, targetBattlefieldProperties, draw, $(this).attr("name")); });
    return false;
  });
}

//-----------------------------------------------------------------------------
function presetsAddNew(type, targetBattlefieldProperties, draw) {
  var name = prompt(language.presetsNewName+":");
  if (name != null & name != "") {
    presets[type][name] = {};
    var forces = assignedUnits(type);
    for (unit in forces) {
      presets[type][name][unit] = forces[unit];
    }
    ahSetVal("ikariamArmyHelper.presets", presets);
    presetsDraw(type, targetBattlefieldProperties, draw, name);
  }
}

//-----------------------------------------------------------------------------
function presetsApply(type, targetBattlefieldProperties, draw, name, plus) {
  name = unescape(name);
  var newForces = presets[type][name];
  if (typeof(plus) != 'undefined' && plus) {
    var forces = assignedUnits(type);
    for (unit in newForces) {
      newForces[unit] += forces[unit];
    }
  }
  update = false;
  assignedUnits(type, newForces);
  update = true;
  unitsChangeHandler(type, targetBattlefieldProperties, draw)
}

//-----------------------------------------------------------------------------
function presetsRemove(type, targetBattlefieldProperties, draw, name) {
  name = unescape(name);
  delete presets[type][name];
  ahSetVal("ikariamArmyHelper.presets", presets);
  presetsDraw(type, targetBattlefieldProperties, draw);
}

//-----------------------------------------------------------------------------
function drawOptions() {
  var div = document.createElement('div');
  div.setAttribute('class', "content");
  var html = '<h3>'+linkForUpdate()+' <span style="font-weight: normal;"> original by <a href="http://userscripts.org/users/grandag" target="_blank">GrAndAG</a></span></h3>'
  html += '<table cellpadding="0" cellspacing="0">';
  html += '<tr><th>'+language.optShowTitles+'</th><td><input id="ikaArmy_showPreviewTitles" type="checkbox"'+ (options.showPreviewTitles ? ' checked' : '') +'></td></tr>'
  html += '</table>';
  div.innerHTML = html;
  var debugDiv = document.getElementById('options_debug');
  debugDiv.parentNode.insertBefore(div, debugDiv);
    
  $("#ikaArmy_showPreviewTitles").change( function() { optionSave(this.id.match(/_(.+)$/)[1], this.checked);});
}

//-----------------------------------------------------------------------------
function optionSave(option, value) {
  options[option] = value;
  ahSetVal("ikariamArmyHelper.options", options);
}

//-----------------------------------------------------------------------------
function optionsLoad() {
  var newOptions = ahGetVal("ikariamArmyHelper.options");
  if ("signature" in newOptions) {
    options = newOptions;
  }
}

//-----------------------------------------------------------------------------
function main() {
 
  view = document.getElementsByTagName("body")[0].id;
  city = ahGetCityId();
  
  optionsLoad();
	
  switch (view) {
    case "cityMilitary-army":
    case "cityMilitary-fleet":
      getUnitsFromMilitaryOverview(view.replace(/.*-/,""));
      break;
    case "barracks":
      getUnitsFromBuilding("army");
      break;
    case "shipyard":
      getUnitsFromBuilding("fleet");
      break;
    case "city":
      getCityLevel();
      getWallLevel();
      break;
    case "island":
      storeTargetCity();
      break;
  }

  $(["army", "fleet"]).each( function(i, type) {
    unitsStored = ahGetVal("ikariamArmyHelper.units." + type + "." + city);
    for (unit in unitsStored) {
      if (typeof(unitsStored[unit]) != 'undefined') {
        data[type][unit] = unitsStored[unit];
      }
    }
  });
  wallLevel = parseInt(ahGetVal("ikariamArmyHelper.cityWallLevel." + city));
  cityLevel = parseInt(ahGetVal("ikariamArmyHelper.cityHallLevel." + city));

  switch (view) {
    case "city":
      appendGarrisonInfo();
      break;
    case "townHall":
      appendGarrisonInfo2TownHall();
      break;
    case "wall":
      appendGarrisonInfo2Wall();
      break;
    case "plunder":
    case "defendCity":
    case "occupy":
      drawAttackHelper("army", true);
      break;
    case "blockade":
    case "defendPort":
      drawAttackHelper("fleet", true);
      break;
    case "deployment":
      drawAttackHelper($("#deploymentForm :input[name=function]").attr("value").replace(/^deploy/,"").toLowerCase(), false);
      break;
    case "options":
      drawOptions();
      break;
  }
}

//-----------------------------------------------------------------------------
main();
//-----------------------------------------------------------------------------