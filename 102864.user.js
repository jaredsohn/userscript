// ==UserScript==
// @name           Clan Pirata por Abel
// @namespace      http://www.clanpirata.com.ar/perfil/Abel
// @include        *clanpirata.com.ar/*
// @include        http://plugin.tinypic.com/plugin/*
// ==/UserScript==

////== Jquery ==////

(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}}); (function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();


////== Variables ==////

var ultver = 1.95
var img = 'http://s1007.photobucket.com/albums/af198/gonza_06/'
var imagenes = "http://i197.photobucket.com/albums/aa70/gosht_/"
var dom = location.hostname;
var user = $('.username').html()
var dir = window.location.href;
var spa = '<br class="space" ><hr class="divider"><br class="space">'
var fondo = GM_getValue("fondo","#F0F0F0");
var tcolor = GM_getValue("tcolor","#004a95");
var ccolor = GM_getValue("ccolor","#FFFFFF");

// variables funciones
var fdc = GM_getValue("fdc",true);
var mos = GM_getValue("mos",true);
var mosm = GM_getValue("mosm", 'cerrados');
var mdp = GM_getValue("mdp",true);
var bfl = GM_getValue("bfl",false);
var lic = GM_getValue("lic",true);
var chct = GM_getValue("chct",true);
var cat1 = '-1'
var cat2 = 'novatos'
var catego1 = GM_getValue("categ1", cat1);
var catego2 = GM_getValue("categ2", cat2);

var icon = GM_getValue("icon",true);
var iconm = GM_getValue("iconm",'abierto');
var barco = GM_getValue("barco",true);
var barcom = GM_getValue("barcom",'cerrado');
var color = GM_getValue("color",true);
var colorm = GM_getValue("colorm",'cerrado');
var leter = GM_getValue("leter",true);
var leterm = GM_getValue("leterm",'cerrado');
var barro = GM_getValue("barro",true);
var barrom = GM_getValue("barrom",'cerrado');
var bott = GM_getValue("bott",true);
var bottm = GM_getValue("bottm",'cerrado');

var mwi = '960px'

// variables iconos
var icpre = ',:),http://i.t.net.ar/images/smiles/smile.gif,X(,http://i.t.net.ar/images/smiles/angry.gif,:cool:,http://i.t.net.ar/images/smiles/cool.gif,:cry:,http://i.t.net.ar/images/smiles/crying.gif,:/,http://i.t.net.ar/images/smiles/unsure.gif,:blaf:,http://i.t.net.ar/images/smiles/blaf.gif,:winky:,http://i.t.net.ar/images/smiles/winky.gif,:noo:,http://i.t.net.ar/images/smiles/sad2.gif,:twisted:,http://i.t.net.ar/images/smiles/evil.gif,^^,http://i.t.net.ar/images/smiles/grn.gif,:|,http://i.t.net.ar/images/smiles/huh.gif,:D,http://i.t.net.ar/images/smiles/laughing.gif,:oops:,http://i.t.net.ar/images/smiles/red.gif,:?,http://i.t.net.ar/images/smiles/s.gif,:F,http://i.t.net.ar/images/smiles/drool.gif,:(,http://i.t.net.ar/images/smiles/sad.gif,:P,http://i.t.net.ar/images/smiles/tongue.gif,:roll:,http://i.t.net.ar/images/smiles/wassat.gif,;),http://i.t.net.ar/images/smiles/wink.gif,:crying:,http://i.t.net.ar/images/smiles/cry.gif,:bobo:,http://i.t.net.ar/images/smiles/bobo.gif,:grin:,http://i.t.net.ar/images/smiles/grin.gif,:alaba:,http://i.t.net.ar/images/smiles/alabama.gif,:lpmqtp:,http://i.t.net.ar/images/smiles/lpmqtp.gif,:idiot:,http://i.t.net.ar/images/smiles/idiot.gif,:shrug:,http://i.t.net.ar/images/smiles/shrug.gif,:8S:,http://i.t.net.ar/images/smiles/8s.gif,:],http://i.t.net.ar/images/smiles/5.gif,:blind:,http://i.t.net.ar/images/smiles/15.gif,:buaa:,http://i.t.net.ar/images/smiles/17.gif,:cold:,http://i.t.net.ar/images/smiles/cold.gif,:hot:,http://i.t.net.ar/images/smiles/hot.gif,:love:,http://i.t.net.ar/images/smiles/love.gif,:globo:,http://i.t.net.ar/images/smiles/globo.gif,:zombie:,http://i.t.net.ar/images/smiles/zombie.gif,:man:,http://i.t.net.ar/images/smiles/pacman.gif,:metal:,http://i.t.net.ar/images/smiles/metal.gif,:mario:,http://i.t.net.ar/images/smiles/mario.gif,:info:,http://i.t.net.ar/images/smiles/i.gif,:exc:,http://i.t.net.ar/images/smiles/exclamacion.gif,:q:,http://i.t.net.ar/images/smiles/pregunta.gif,:NO:,http://i.t.net.ar/images/smiles/no.gif,:OK:,http://i.t.net.ar/images/smiles/ok.gif,:WOW:,http://i.t.net.ar/images/smiles/wow.gif,:LOL:,http://i.t.net.ar/images/smiles/lol.gif,:oo:,http://i.t.net.ar/images/smiles/papel.gif,:RIP:,http://i.t.net.ar/images/smiles/rip.gif,:alien:,http://i.t.net.ar/images/smiles/koe.gif,:trago:,http://i.t.net.ar/images/smiles/106.gif,:money:,http://i.t.net.ar/images/smiles/dolar.gif,:culo:,http://i.t.net.ar/images/smiles/culo.gif,:auto:,http://i.t.net.ar/images/smiles/car.gif,:lala:,http://i.t.net.ar/images/smiles/mobe.gif,:fantasma:,http://i.t.net.ar/images/smiles/fantasma.gif,:buenpost:,http://i.t.net.ar/images/smiles/buenpost.gif,:GET A LIFE:,http://i.t.net.ar/images/smiles/getalife.gif,:headbang:,http://i.t.net.ar/images/smiles/bang.gif,:limon:,http://i.t.net.ar/images/smiles/limoon.gif,8|,http://i5.tinypic.com/6jbffgn.gif,:verde:,http://i.t.net.ar/images/smiles/verde.gif'
var icono = GM_getValue("ic", icpre)
var iconop = GM_getValue("icp", icppre)

// variables locaciones
var locc = window.location.pathname.split('/');
var loc = ''; 
if(locc[1].indexOf('edicion.form') != -1)								loc = 'edicion';
switch(locc[1]){ case 'agregar':										loc = 'edicion';
break;case '': case 'index.php': case 'categorias':						loc = 'principal';
break;case 'posts':														loc = 'post';
break; case 'mensajes-responder.php':									loc = 'mensajes';
break; case 'mensajes': if(locc[2] == 'redactar' || locc[2] == 'a')		loc = 'mensajes';
else if(locc[2] == 'leer') 												loc = 'leermp';
break; case 'perfil':													loc = 'perfil';
if(locc[2] == user)														loc = 'miperfil';
break; case 'monitor': case 'monitor.php':								loc = 'monitor';
break; case 'comunidades':												loc = 'comunidades';
if(locc[2] == 'crear') 													loc = 'crearc';
if(locc[3] == 'agregar' || locc[3] == 'editar-tema')					loc = 'agregarc';
break;
}
if(window.location.pathname == '/posts/2/')						loc = 'chat';
if(window.location.pathname == '/opciones/')						loc = 'opciones';



////== Opciones ==////
$(".menuTabs .clearBoth").before('<li id="option" class="tabbed"><a href="http://www.clanpirata.com.ar/opciones/" title="Opciones del script">Opciones <img src="http://i.t.net.ar/images/arrowdown.png" alt="Drop Down"></a></li>');
if(loc == 'opciones') {
$("#mask").html('<style>#tabbedPosts{border-right:1px solid #aaa !important;}#tabbedComunidades{border-left:1px solid #dcdcdc !important;}#option{margin-left:-5px}#opu li{margin:5px 7px!important}#opu select{-moz-appearance:none;margin:0 7px 0 3px;border:0px !important;font-size:10px;background:#ddd!important;padding:3px;-moz-border-radius:4px;}</style>');
$(".menuTabs .clearBoth").before('<li id="colour" class="tabbed" style="cursor:pointer"><a title="Cambia los colores de ClanPirata!"><img src="'+img+'lapiz.png"></a></li>');

$('.menuTabs li').attr('class','tabbed')
$('#option').attr('class','tabbed here')

$("#cuerpocontainer").html('<div id="opu" class="opb"></div><div id="opi" class="opb"></div>');
$("#opu").html(spa+'<b>Activar funciones</b>'+spa+'<ul>\
<li><input type="checkbox" id="fdc" '+(fdc? 'checked':'')+'> <strong>Agregar filtro de categorias</strong> // \
categoria 1: <select id="categ1"><option value="-1">Todas</option><option value="novatos">Novatos</option><option value="animaciones">Animaciones</option><option value="apuntes-y-monografias">Apuntes y Monografias</option><option value="arte">Arte</option><option value="autos-motos">Autos y Motos</option><option value="celulares">Celulares</option><option value="comics">Comics</option><option value="deportes">Deportes</option><option value="downloads">Downloads</option><option value="ebooks-tutoriales">E-books y Tutoriales</option><option value="economia-negocios">Economia y Negocios</option><option value="femme">Femme</option><option value="humor">Humor</option><option value="imagenes">Imagenes</option><option value="info">Info</option><option value="juegos">Juegos</option><option value="links">Links</option><option value="linux">Linux y GNU</option><option value="mac">Mac</option><option value="manga-anime">Manga y Anime</option><option value="mascotas">Mascotas</option><option value="musica">Musica</option><option value="noticias">Noticias</option><option value="offtopic">Off-topic</option><option value="recetas-y-cocina">Recetas y Cocina</option><option value="salud-bienestar">Salud y Bienestar</option><option value="solidaridad">Solidaridad</option><option value="clanpirata">Clan Pirata!</option><option value="turismo">Turismo</option><option value="tv-peliculas-series">TV, Peliculas y series</option><option value="videos">Videos On-line</option></select>\
categoria 2: <select id="categ2"><option value="-1">Todas</option><option value="novatos">Novatos</option><option value="animaciones">Animaciones</option><option value="apuntes-y-monografias">Apuntes y Monografias</option><option value="arte">Arte</option><option value="autos-motos">Autos y Motos</option><option value="celulares">Celulares</option><option value="comics">Comics</option><option value="deportes">Deportes</option><option value="downloads">Downloads</option><option value="ebooks-tutoriales">E-books y Tutoriales</option><option value="economia-negocios">Economia y Negocios</option><option value="femme">Femme</option><option value="humor">Humor</option><option value="imagenes">Imagenes</option><option value="info">Info</option><option value="juegos">Juegos</option><option value="links">Links</option><option value="linux">Linux y GNU</option><option value="mac">Mac</option><option value="manga-anime">Manga y Anime</option><option value="mascotas">Mascotas</option><option value="musica">Musica</option><option value="noticias">Noticias</option><option value="offtopic">Off-topic</option><option value="recetas-y-cocina">Recetas y Cocina</option><option value="salud-bienestar">Salud y Bienestar</option><option value="solidaridad">Solidaridad</option><option value="clanpirata">Clan Pirata!</option><option value="turismo">Turismo</option><option value="tv-peliculas-series">TV, Peliculas y series</option><option value="videos">Videos On-line</option></select></li>\
<li><input type="checkbox" id="mos" '+(mos? 'checked':'')+'> <strong>Agregar boton para ocultar swf</strong> // \
apareceran: <select id="mosm"><option value="cerrados">Cerrados</option><option value="abiertos">Abiertos</option></select></li>\
<li><input type="checkbox" id="bfl" '+(bfl? 'checked':'')+'> Agrandar swf</li>\
<li><input type="checkbox" id="mdp" '+(mdp? 'checked':'')+'> Agregar Moderador de post\
<li><input type="checkbox" id="lic" '+(lic? 'checked':'')+'> Agregar Link checker\
\
<li><input type="checkbox" id="icon" '+(icon? 'checked':'')+'> <strong>Agregar Iconos</strong> // \
aparecera: <select id="iconm"><option value="cerrado">Cerrado</option><option value="abierto">Abierto</option></select></li>\
\
<li><input type="checkbox" id="barco" '+(barco? 'checked':'')+'> <strong>Agregar Barra de colores</strong> // \
aparecera: <select id="barcom"><option value="cerrado">Cerrado</option><option value="abierto">Abierto</option></select></li>\
\
<li><input type="checkbox" id="color" '+(color? 'checked':'')+'> <strong>Agregar coloringa</strong> // \
aparecera: <select id="colorm"><option value="cerrado">Cerrado</option><option value="abierto">Abierto</option></select></li>\
\
<li><input type="checkbox" id="leter" '+(leter? 'checked':'')+'> <strong>Agregar letringa</strong> // \
aparecera: <select id="leterm"><option value="cerrado">Cerrado</option><option value="abierto">Abierto</option></select></li>\
\
<li><input type="checkbox" id="barro" '+(barro? 'checked':'')+'> <strong>Agregar barras roprgm</strong> // \
aparecera: <select id="barrom"><option value="cerrado">Cerrado</option><option value="abierto">Abierto</option></select></li>\
\
<li><input type="checkbox" id="bott" '+(bott? 'checked':'')+'> <strong>Agregar botones</strong> // \
aparecera: <select id="bottm"><option value="cerrado">Cerrado</option><option value="abierto">Abierto</option></select></li>\
\
<li><input type="checkbox" id="chct" '+(chct? 'checked':'')+'> Cambiarle el color a ClanPirata!</li>\
\
</ul>'+spa+'<div id="bo" class="opbu"><input id="gou" class="button" value="guardar" type="button"></div>')

$('#categ1 option[value="'+catego1+'"]').attr("selected","selected")
$('#categ2 option[value="'+catego2+'"]').attr("selected","selected")
$('#mosm option[value="'+mosm+'"]').attr("selected","selected")


$('#iconm option[value="'+iconm+'"]').attr("selected","selected")
$('#barcom option[value="'+barcom+'"]').attr("selected","selected")
$('#colorm option[value="'+colorm+'"]').attr("selected","selected")
$('#leterm option[value="'+leterm+'"]').attr("selected","selected")
$('#barrom option[value="'+barrom+'"]').attr("selected","selected")
$('#bottm option[value="'+bottm+'"]').attr("selected","selected")


$("#opi").html(spa+'<b>Personalizar Iconos</b>'+spa+'<div id="mi" style="display:none"></div><div id="mic" style="display:none">\
sdsd\
'+spa+'<div class="opbu"><input id="goi" class="button" value="guardar" type="button"></div>')

$('#mask').before('<div id="vct1"></div>')


$('#gou').click(function(){
	GM_setValue("fdc",($("#fdc").attr("checked")?true:false));
	GM_setValue("mdp",($("#mdp").attr("checked")?true:false));
	GM_setValue("mosm", $("#mosm option:selected").attr('value'));
	GM_setValue("bfl",($("#bfl").attr("checked")?true:false));
	GM_setValue("lic",($("#lic").attr("checked")?true:false));
	GM_setValue("categ1", $("#categ1 option:selected").attr('value'));
	GM_setValue("categ2", $("#categ2 option:selected").attr('value'));
	
	GM_setValue("icon",($("#icon").attr("checked")?true:false));
	GM_setValue("barco",($("#barco").attr("checked")?true:false));
	GM_setValue("color",($("#color").attr("checked")?true:false));
	GM_setValue("leter",($("#leter").attr("checked")?true:false));
	GM_setValue("barro",($("#barro").attr("checked")?true:false));
	GM_setValue("bott",($("#bott").attr("checked")?true:false));
	
	GM_setValue("iconm", $("#iconm option:selected").attr('value'));
	GM_setValue("barcom", $("#barcom option:selected").attr('value'));
	GM_setValue("colorm", $("#colorm option:selected").attr('value'));
	GM_setValue("leterm", $("#leterm option:selected").attr('value'));
	GM_setValue("barrom", $("#barrom option:selected").attr('value'));
	GM_setValue("bottm", $("#bottm option:selected").attr('value'));
	
	GM_setValue("chct",($("#chct").attr("checked")?true:false));

  $("#bo").before('<div id="saop" style="display:none;font-size:11px;padding:8px;text-align:center"><b style="color:#f00 !important;">- Opciones guardadas -</b></div>')
$("#saop").slideDown("slow");
setTimeout('$("#saop").slideUp("slow")',1500);
	})

function bip() {micono = icono.split(',');miconop = iconop.split(',');var bip = '<input type="text" id="ip">&nbsp;&nbsp;<input id="aip" class="button" value="Agregar" type="button">'+spa+'<div class="ico" id="miconos">'
	for (var i = 1; i < micono.length; i=i+2){bip += '<a id="closei" onclick="$(this).remove()"><span></span><img 1="'+micono[i]+'" src="'+micono[i+1]+'"></a>';}bip += spa+'</div><div class="ico" id="miconosp">';
	for (var i = 1; i < miconop.length; i=i+1){bip += '<a id="closei" onclick="$(this).remove()"><span></span><img 1="" src="'+miconop[i]+'"></a>';}
	
	bip += '</div>'+spa+'<div id="chi" class="opbu"><input id="rip" class="button" value="restablecer" type="button">&nbsp;&nbsp;<input id="gip" class="button" value="guardar" type="button"></div>';
	return bip;}
$("#opi").append(bip())
$('#aip').click(function(){

$('#miconosp').append(insico())

function insico () {
var imp = $("#ip").val().split(',')
var icp = ''
for (var i = 0; i < imp.length; i=i+1) {
icp += '<a id="closei" onclick="$(this).remove()"><span></span><img src="'+imp[i]+'"></a>'
}
return icp;

}

$('#mic').html(bipap())
$('#ip').val('')

})
	
$("body").mouseover(function(){ $("#mi").html(bipa()); $("#mic").html(bipap());})
function bipa() {var bipa ='';	for (var i = 0; i < $('#miconos img').length; i=i+1){ bipa += ','+$('#miconos img:eq('+i+')').attr('1')+','+$('#miconos img:eq('+i+')').attr('src') }	return bipa; }
function bipap() {var bipap ='';for (var i = 0; i < $('#miconosp img').length; i=i+1){ bipap += ','+$('#miconosp img:eq('+i+')').attr('src') } return bipap; }
	
$("#gip").click(function(){ GM_setValue("ic", $("#mi").html()); GM_setValue("icp", $("#mic").html());
$("#chi").before('<div id="saic" style="display:none;font-size:11px;padding:8px;text-align:center"><b style="color:#f00 !important;">- Iconos guardados -</b></div>')
$("#saic").slideDown("slow");
setTimeout('$("#saic").slideUp("slow")',1500);

 })
$("#rip").click(function(){if(confirm("Estas seguro de restablecer los iconos por defecto?\n El cambio es permanente.")){ GM_setValue("ic", icpre); GM_setValue("icp", icppre);} })

}





////== Cambiar diseño ==////
var tfimg = ''

if(chct == true){
$('#mask').before('<div id="gmstile"><style>body{background:'+fondo+'!important}\
  #maincontainer{background:'+tcolor+' url('+tfimg+')no-repeat !important;-moz-border-radius:10px!important}\
  #cuerpocontainer{background:'+ccolor+'!important}\
  input.button{background:'+tcolor+' !important}</style></div>')
}

function reset() {
  if(confirm('Estas seguro que quieres resetaer los valores por defecto?')){
	GM_setValue("fondo",'#eeeeee');
	GM_setValue("tcolor",'#004a95');
	GM_setValue("ccolor",'#ffffff');
	$('#gmstile').html('<style>body{background:#eeeeee!important}\
  #maincontainer{background:#004a95 url('+tfimg+')no-repeat!important;-moz-border-radius:10px!important}\
  #cuerpocontainer{background:#ffffff!important}\
  input.button{background:#004a95 !important}</style>')
    $('#tsc').slideUp('slow',function(){ $('#tsc').remove() });
  }
}

function submit() {
  GM_setValue("fondo",$("#tsc input").eq(0).val());
  GM_setValue("tcolor",$("#tsc input").eq(1).val());
  GM_setValue("ccolor",$("#tsc input").eq(2).val());
  $('#tsc').slideUp('slow',function(){ $('#tsc').remove() });
}

function cancel() {
  GM_setValue("fondo",GM_getValue("fondo","#F0F0F0"));
  GM_setValue("tcolor",GM_getValue("tcolor","#004A95"));
  GM_setValue("ccolor",GM_getValue("ccolor","#FFFFFF"));
  $('#gmstile').html('<style>body{background:'+fondo+'!important}\
  #maincontainer{background:'+tcolor+' url('+tfimg+')no-repeat!important;-moz-border-radius:10px!important}\
  #cuerpocontainer{background:'+ccolor+'!important}\
  input.button{background:'+tcolor+' !important}</style>')
  $("#tsc").slideUp("slow",function(){ $("#tsc").remove() });
}

function setColours() {
  var fondo = GM_getValue("fondo","#F0F0F0");
  var tcolor = GM_getValue("tcolor","#004a95");
  var ccolor = GM_getValue("ccolor","#FFFFFF");

  $('#cuerpocontainer').prepend('<div id="tsc" class="opb" style="display:none">'+spa+'<b>Cambiar colores</b>'+spa+'<table><tr>\
  <td><div id="fondo" class="cose"><center>Color de fondo</center><input type="text" class="color" value="'+fondo+'"></div></td>\
  <td><div id="tcolor" class="cose"><center>Color de ClanPirata!</center><input type="text" class="color" value="'+tcolor+'"></div></td>\
  <td><div id="ccolor" class="cose"><center>Color de fondo del contenido</center><input type="text" class="color" value="'+ccolor+'"></div></td>\
  </tr></table>'+spa+'<div class="opbu"><form><input value="Resetear" type="button" id="roc" class="button">&nbsp;&nbsp;<input value="Guardar!" type="button" id="goc" class="button">&nbsp;&nbsp;<input value="Cancelar" type="button" id="coc" class="button"></form></div></div>');
  
  $('#roc').click(function(){ reset()  })
  $('#goc').click(function(){ submit() })
  $('#coc').click(function(){ cancel() })
  
  $('#tsc').slideDown('slow');
  
  $('.cose').mousemove(function(){
  var fondo = $("#tsc input").eq(0).val();
  var tcolor = $("#tsc input").eq(1).val();
  var ccolor = $("#tsc input").eq(2).val();
  $('#gmstile').html('<style>body{background:'+fondo+'!important}\
  #maincontainer{background:'+tcolor+' url('+tfimg+')no-repeat!important;-moz-border-radius:10px!important}\
  #cuerpocontainer{background:'+ccolor+'!important}\
  input.button{background:'+tcolor+' !important}</style>')
  
  })
  

  var CROSSHAIRS_LOCATION = imagenes +"CROSSHAIRS.png";
  var HUE_SLIDER_LOCATION = imagenes +"HUE_SLIDER.png";
  var HUE_SLIDER_ARROWS_LOCATION = imagenes +"HUE_SLIDER_ARROWS.png";
  var SAT_VAL_SQUARE_LOCATION = imagenes +"sat_val.png";
     
  // Here are some boring utility functions. The real code comes later.
  function hexToRgb(hex_string, default_){
    if (default_ == undefined)
        default_ = null;
    if (hex_string.substr(0, 1) == '#')
        hex_string = hex_string.substr(1);
    var r;
    var g;
    var b;
    if (hex_string.length == 3) {
      r = hex_string.substr(0, 1);
      r += r;
      g = hex_string.substr(1, 1);
      g += g;
      b = hex_string.substr(2, 1);
      b += b;
    } else if (hex_string.length == 6) {
      r = hex_string.substr(0, 2);
      g = hex_string.substr(2, 2);
      b = hex_string.substr(4, 2);
    } else {
      return default_;
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    if (isNaN(r) || isNaN(g) || isNaN(b))
      return default_;
    else
      return {r: r / 255, g: g / 255, b: b / 255};
  }
  
  function rgbToHex(r, g, b, includeHash) {
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    if (includeHash == undefined)
      includeHash = true;
    r = r.toString(16);
    if (r.length == 1)
      r = '0' + r;
    g = g.toString(16);
    if (g.length == 1)
      g = '0' + g;
    b = b.toString(16);
    if (b.length == 1)
      b = '0' + b;
    return ((includeHash ? '#' : '') + r + g + b).toUpperCase();
  }
  
  var arVersion = navigator.appVersion.split("MSIE");
  var version = parseFloat(arVersion[1]);
  
  function fixPNG(myImage) {
    if ((version >= 5.5) && (version < 7) && (document.body.filters)) {
      var node = document.createElement('span');
      node.id = myImage.id;
      node.className = myImage.className;
      node.title = myImage.title;
      node.style.cssText = myImage.style.cssText;
      node.style.setAttribute('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + myImage.src + "\', sizingMethod='scale')");
      node.style.fontSize = '0';
      node.style.width = myImage.width.toString() + 'px';
      node.style.height = myImage.height.toString() + 'px';
      node.style.display = 'inline-block';
      return node;
    } else {
      return myImage.cloneNode(false);
    }
  }
  
  function trackDrag(node, handler) {
    function fixCoords(x, y) {
      var nodePageCoords = pageCoords(node);
      x = (x - nodePageCoords.x) + document.documentElement.scrollLeft;
      y = (y - nodePageCoords.y) + document.documentElement.scrollTop;
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > node.offsetWidth - 1) x = node.offsetWidth - 1;
      if (y > node.offsetHeight - 1) y = node.offsetHeight - 1;
      return {x: x, y: y};
    }
    function mouseDown(ev) {
      var coords = fixCoords(ev.clientX, ev.clientY);
      var lastX = coords.x;
      var lastY = coords.y;
      handler(coords.x, coords.y);
      function moveHandler(ev) {
        var coords = fixCoords(ev.clientX, ev.clientY);
        if (coords.x != lastX || coords.y != lastY) {
          lastX = coords.x;
          lastY = coords.y;
          handler(coords.x, coords.y);
        }
      }
      function upHandler(ev) {
        myRemoveEventListener(document, 'mouseup', upHandler);
        myRemoveEventListener(document, 'mousemove', moveHandler);
        myAddEventListener(node, 'mousedown', mouseDown);
      }
      myAddEventListener(document, 'mouseup', upHandler);
      myAddEventListener(document, 'mousemove', moveHandler);
      myRemoveEventListener(node, 'mousedown', mouseDown);
      if (ev.preventDefault) ev.preventDefault();
    }
    myAddEventListener(node, 'mousedown', mouseDown);
    //node.onmousedown = function(e) { return false; };
    //node.onselectstart = function(e) { return false; };
    //node.ondragstart = function(e) { return false; };
  }
  
  var eventListeners = [];
  
  function findEventListener(node, event, handler) {
    var i;
    for (i in eventListeners)
      if (eventListeners[i].node == node && eventListeners[i].event == event && eventListeners[i].handler == handler)
        return i;
    return null;
  }
  
  function myAddEventListener(node, event, handler) {
    if (findEventListener(node, event, handler) != null)
      return;
    if (!node.addEventListener)
      node.attachEvent('on' + event, handler);
    else
      node.addEventListener(event, handler, false);
    eventListeners.push({node: node, event: event, handler: handler});
  }
  
  function removeEventListenerIndex(index) {
    var eventListener = eventListeners[index];
    delete eventListeners[index];
    if (!eventListener.node.removeEventListener)
      eventListener.node.detachEvent('on' + eventListener.event, eventListener.handler);
    else
      eventListener.node.removeEventListener(eventListener.event, eventListener.handler, false);
  }
  
  function myRemoveEventListener(node, event, handler) {
    removeEventListenerIndex(findEventListener(node, event, handler));
  }
  function cleanupEventListeners() {
    var i;
    for (i = eventListeners.length; i > 0; i--)
      if (eventListeners[i] != undefined)
        removeEventListenerIndex(i);
  }
  
  myAddEventListener(window, 'unload', cleanupEventListeners);
  
 function hsvToRgb(hue, saturation, value) {
    var red;
    var green;
    var blue;
    if (value == 0.0) {
      red = 0;
      green = 0;
      blue = 0;
    } else {
      var i = Math.floor(hue * 6);
      var f = (hue * 6) - i;
      var p = value * (1 - saturation);
      var q = value * (1 - (saturation * f));
      var t = value * (1 - (saturation * (1 - f)));
      switch (i) {
        case 1: red = q; green = value; blue = p; break;
        case 2: red = p; green = value; blue = t; break;
        case 3: red = p; green = q; blue = value; break;
        case 4: red = t; green = p; blue = value; break;
        case 5: red = value; green = p; blue = q; break;
        case 6: // fall through
        case 0: red = value; green = t; blue = p; break;
      }
    }
    return {r: red, g: green, b: blue};
  }
  
  function rgbToHsv(red, green, blue) {
    var max = Math.max(Math.max(red, green), blue);
    var min = Math.min(Math.min(red, green), blue);
    var hue;
    var saturation;
    var value = max;
    if (min == max) {
      hue = 0;
      saturation = 0;
    } else {
      var delta = (max - min);
      saturation = delta / max;
      if (red == max)
        hue = (green - blue) / delta;
      else if (green == max)
        hue = 2 + ((blue - red) / delta);
      else
        hue = 4 + ((red - green) / delta);
      hue /= 6;
      if (hue < 0) hue += 1;
      if (hue > 1) hue -= 1;
    }
    return {
      h: hue,
      s: saturation,
      v: value
    };
  }
  function pageCoords(node) {
    var x = node.offsetLeft;
    var y = node.offsetTop;
    var parent = node.offsetParent;
    while (parent != null) {
      x += parent.offsetLeft;
      y += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return {x: x, y: y};
  }
  
  // The real code begins here.
  var huePositionImg = document.createElement('img');
  huePositionImg.galleryImg = false;
  huePositionImg.width = 35;
  huePositionImg.height = 11;
  huePositionImg.src = HUE_SLIDER_ARROWS_LOCATION;
  huePositionImg.style.position = 'absolute';
  var hueSelectorImg = document.createElement('img');
  hueSelectorImg.galleryImg = false;
  hueSelectorImg.width = 35;
  hueSelectorImg.height = 200;
  hueSelectorImg.src = HUE_SLIDER_LOCATION;
  hueSelectorImg.style.display = 'block';
  var satValImg = document.createElement('img');
  satValImg.galleryImg = false;
  satValImg.width = 200;
  satValImg.height = 200;
  satValImg.src = SAT_VAL_SQUARE_LOCATION;
  satValImg.style.display = 'block';
  var crossHairsImg = document.createElement('img');
  crossHairsImg.galleryImg = false;
  crossHairsImg.width = 21;
  crossHairsImg.height = 21;
  crossHairsImg.src = CROSSHAIRS_LOCATION;
  crossHairsImg.style.position = 'absolute';
  
  function makeColorSelector(inputBox) {
    var rgb, hsv
    function colorChanged() {
      var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      var hueRgb = hsvToRgb(hsv.h, 1, 1);
      var hueHex = rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);
      previewDiv.style.background = hex;
      inputBox.value = hex;
      satValDiv.style.background = hueHex;
      crossHairs.style.left = ((hsv.v*199)-10).toString() + 'px';
      crossHairs.style.top = (((1-hsv.s)*199)-10).toString() + 'px';
      huePos.style.top = ((hsv.h*199)-5).toString() + 'px';
    }
    function rgbChanged() {
      hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      colorChanged();
    }
    function hsvChanged() {
      rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
      colorChanged();
    }
    var colorSelectorDiv = document.createElement('div');
    colorSelectorDiv.style.padding = '15px';
    colorSelectorDiv.style.position = 'relative';
    colorSelectorDiv.style.height = '275px';
    colorSelectorDiv.style.width = '250px';
    var satValDiv = document.createElement('div');
    satValDiv.style.position = 'relative';
    satValDiv.style.width = '200px';
    satValDiv.style.height = '200px';
    var newSatValImg = fixPNG(satValImg);
    satValDiv.appendChild(newSatValImg);
    var crossHairs = crossHairsImg.cloneNode(false);
    satValDiv.appendChild(crossHairs);
    function satValDragged(x, y) {
      hsv.s = 1-(y/199);
      hsv.v = (x/199);
      hsvChanged();
    }
    trackDrag(satValDiv, satValDragged)
    colorSelectorDiv.appendChild(satValDiv);
    var hueDiv = document.createElement('div');
    hueDiv.style.position = 'absolute';
    hueDiv.style.left = '230px';
    hueDiv.style.top = '15px';
    hueDiv.style.width = '35px';
    hueDiv.style.height = '200px';
    var huePos = fixPNG(huePositionImg);
    hueDiv.appendChild(hueSelectorImg.cloneNode(false));
    hueDiv.appendChild(huePos);
    function hueDragged(x, y) {
      hsv.h = y/199;
      hsvChanged();
    }
    trackDrag(hueDiv, hueDragged);
    colorSelectorDiv.appendChild(hueDiv);
    var previewDiv = document.createElement('div');
    previewDiv.style.height = '50px'
    previewDiv.style.width = '50px';
    previewDiv.style.position = 'absolute';
    previewDiv.style.top = '225px';
    previewDiv.style.left = '15px';
    previewDiv.style.border = '1px solid black';
    colorSelectorDiv.appendChild(previewDiv);
    function inputBoxChanged() {
      rgb = hexToRgb(inputBox.value, {r: 0, g: 0, b: 0});
      rgbChanged();
    }
    myAddEventListener(inputBox, 'change', inputBoxChanged);
    inputBox.size = 8;
    inputBox.style.position = 'absolute';
    inputBox.style.right = '15px';
    inputBox.style.top = (225 + (25 - (inputBox.offsetHeight/2))).toString() + 'px';
    colorSelectorDiv.appendChild(inputBox);
    inputBoxChanged();
    return colorSelectorDiv;
  }


  (node=$("#fondo input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
  (node=$("#tcolor input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
  (node=$("#ccolor input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
  (node=$("#tophover input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
}

if(chct == true){
$(".menuTabs .clearBoth").before('<li id="colour" class="tabbed" style="cursor:pointer"><a title="Cambia los colores de ClanPirata!"><img src="'+img+'lapiz.png"></a></li>');

}
$('#colour').click(function(){ setColours() })

////== Estilo por defecto ==////
$('#banner,#footer,.rtop,#avisosTop,object,.filterCat,#google_ads_div_tar_general_728_general,#google_ads_div_tar_p_728_info,#google_ads_div_tar_ch_160_general,#google_ads_div_tar_p_750_videos,iframe[width="160"],.banner-300,.rbott,.destacadas,.ads120-240,#mensaje-top,.banner,.banner300x250,#google_ads_div_tar_p_120_manga-anime').remove()
$('#mask').before('<style>#maincontainer{-moz-border-radius:10px;padding-bottom:12px !important;margin-bottom:15px !important}.answerTxt .mBtn{float:right;margin-top:10px;}</style>')
if(loc =='post'){
GM_addStyle('.metadata-usuario .nData{display:inline-block !important;}.post-contenedor{border:0px !important;margin-top:2px}'+
'.post-compartir img{width:16px}.post-compartir{margin-bottom:-16px !important}.post-relacionados{width:760px!important} .post-relacionados li{width:334px!important}.miComentario{margin-top:-10px !important}'+
'.answerTxt{width:767px!important;padding-left:1px !important}'+
'.post-title{background:#fff repeat-x url("http://i.t.net.ar/images/box_titlebg.gif") !important;padding:4px !important;height:16px;-moz-border-radius: 3px 3px 0 0;border-color:#fff !important;}'+
'.post-title h1{color:#555 !important;text-shadow:0 1px 0 #CCCCCC !important;}.post-title .icons{top: 4px !important}.post-metadata{-moz-border-radius:0 0 7px 7px;}')

}

$('#head').prepend('<img src="http://gonx-666.zxq.net/tscript/Ts-back-tl.png" id="Ts-back-tl">')
$('#head').append('<img src="http://gonx-666.zxq.net/tscript/Ts-back-tr.png" id="Ts-back-tr">')

GM_addStyle('#head{background:url(http://gonx-666.zxq.net/tscript/Ts-back.png);height:83px !important;}'+
'#logo{float:none !important;display:inline-block;margin-top:13px;}'+
'#Ts-back-tl{float:left;margin-left:-12px;}.box_cuerpo{background:#e7e7e7!important;border:0px!important;}'+
'#Ts-back-tr{float:right;margin-right:-12px;}'+
'.button{-moz-border-radius:5px;border:0px!important;font-size:11px !important;}'+
'.opb{width:940px;background:#eee;margin:0 auto 10px auto;-moz-border-radius:5px;border:1px solid #ddd}.opb .ico{text-align:center;}.opb b{color:#999 !important;margin-left:12px;}.opb input[type=checkbox]{position:relative;top:3px;}.opb li{margin-left:10px;}.opbu{text-align:right;margin-bottom:10px;margin-right:12px;}#closei{background:#ddd;display:inline-block;padding:7px 5px;margin:2px;-moz-border-radius:5px;border:1px solid #ccc}#miconos #closei{width:80px;padding:14px 0px;}#miconosp img{max-height:90px;max-width:175px}#closei span{float:right;margin-top:-10px;margin-right:4px;display:block;background:url(http://i1007.photobucket.com/albums/af198/gonza_06/close-icon.png);height:15px;width:15px;cursor:pointer;}#miconosp #closei span{margin:-3px 0 0 4px;}#ip{margin-left:15px;-moz-border-radius:5px;width:815px;}'+
'#nft{margin-top:-12px !important;}'+
'.m-col2e{width:675px !important}textarea[name="msg_body"]{width:663px !important}'+
'.subMenu{background:rgba(255, 255, 255, 0.15) !important;border:0px !important}.subMenu li{background:rgba(255, 255, 255, 0.15) !important;}.subMenu li.here{background:#fff!important;}'+
'#bbcode{padding:15px 0 0 7px!important;height:19px}'+
'#bbcode a{padding:8px 3px 1px 3px !important;}'+
'#bbcode a:hover,#bcb a{background:url(http://i.t.net.ar/images/bbcodeshover.png);}'+
'#bbcode select{-moz-appearance:none!important;border:0px;background:#ddd;height:22px;font-size:10px;padding:4px !important;-moz-border-radius:4px;position:relative;top:-4px}'+
'#bbcode select *{-moz-appearance:none!important;border:0px;background:#ddd;}'+
'#bcb{text-align:center}#bcb{margin-top:4px !important;}'+
'#bcb a {width:14px;height:14px;padding:4px !important;display:inline-block;margin:2px !important;}'+
'#bcb div{width:14px;height:14px;-moz-border-radius:3px;font-size:12px;}#bcb a:hover{background-color:#ddd;}'+
'#bbcode .sp{display:inline-block;-moz-box-shadow:0 0 5px #ccc ;background-color:#ccc;width:1px;height:14px;}'+
'#body_comm,#markItUp{-moz-border-radius:4px}#iconos,#nft{text-align:center;}'+
'#iconos img{margin:2px;max-height:60px;max-width:100px;}'+
'.preview,#bh{background:#d5d5d5;padding:10px;margin:-8px 0 -11px 0}'+
'#roprgmbox .preview{overflow:hidden;text-align:left;height:68px;}'+
'#roprgmbox .preview div{text-align:center;line-height:68px;}'+
'.check{position:relative;top:2px;margin-left:50px!important;}'+
'.pcb{background:#d5d5d5;margin:-5px 0}.pcb a{padding:1px 10px;display:block}'+
'.pcb a:hover{background:#ccc;}.lisel{background:#bbb;}#loadp{padding:10px !important}#nft input{padding:3px 5px 4px 5px!important;-moz-border-radius:4px}'+
'.userInfoLogin a{height:16px !important}.let,.bar{position:relative;top:3.5px;left:3px;margin-left:10px!important}'+
'.misComunidades{font-size:0px }.misComunidades a:hover{background:#f0f0f0;-moz-border-radius:7px;text-decoration:none!important}'+
'.bnb{text-align:center;display:block;padding:0 10px;height:14px;line-height:14px}'+
'.cose{background:#ddd;width:301px;display:inline-block;margin:0 0 0 4px;padding:7px 0;-moz-border-radius:7px;border:1px solid #ccc}.cose div{margin-bottom:-20px;-moz-border-radius:7px}'+
'#logoi{background:url(http://s197.photobucket.com/albums/aa70/gosht_/Tc-head-logo.png)no-repeat!important;margin-top:10px!important}.menuTabs,#tabbedPosts a{background:none!important;}'+
'#menu{-moz-border-radius:7px 7px 0 0!important;}#tabbedPosts{-moz-border-radius:5px 0 0 0!important}.userInfoLogin{background:none!important;}.opciones_usuario{-moz-border-radius:0 5px 0 0!important}'+
'#c1b,#c2b{float:left;text-decoration:none!important;cursor:pointer;}'+
'#c1n,#c2n{float:right;text-decoration:none!important;cursor:pointer;}'+
'#nonme,#nonmea{display:none;font-size:11px;color:#f00;padding:8px;margin-left:174px !important;margin-bottom:6px !important}'+
'.botopcion{text-align:left;margin-top:6px;}.botopcion input[type="checkbox"]{position:relative;top:2px;}#bboti,#bbotu{margin-left:12px;}.botopcion input[type="text"]{width:25px;}'+
'.botopcion select{margin-left:12px;}#bbot{width:100%;}.botopcion .sp{display:inline-block;-moz-box-shadow:0 0 5px #ccc ;position:relative;top:2px;background-color:#ccc;width:1px;height:14px;margin:0 5px;}'+
'#both{background:#d5d5d5;padding:10px;margin:-8px 0 -11px 0}#botbox{display:none;}'+
'.avatarBox{height:auto !important;max-height:1000px;}')

if(loc == 'edicion'){
$('br:lt(9),br:eq(9),br:eq(18),br:eq(19),br:eq(21)').remove()
$('.tags,.box_cuerpo select[style="width: 230px;"],.box_cuerpo .clearBoth').after('<br class="space"><hr class="divider"><br class="space">')

var opt = $('select[style="width: 230px;"] option')
opt.eq(0).remove()
opt.eq(4).after('<br>');opt.eq(8).after('<br>');opt.eq(12).after('<br>');opt.eq(16).after('<br>');opt.eq(20).after('<br>');opt.eq(24).after('<br>');opt.eq(28).after('<br>');

GM_addStyle('#chd{text-align:right;}.titulo,.tags{display:inline!important;-moz-border-radius:4px;margin-left:7px;width:611px!important;}.tags{width:578px!important;}select[style="width: 230px;"]{-moz-appearance:none!important;border:0px;background:#d0d0d0;width:660px!important;margin-top:-68px;padding:6px !important;font-size:11px;-moz-border-radius:4px;height:160px !important;}select[style="width: 230px;"] option{display:inline-block;width:142.5px!important;margin:0 5px 0 0 !important;}')


$('.markItUpFooter').after('<div id="chd">Le quedan <b>63206</b> caracteres para su post</div>')

$(document).keydown(function(){
var chd = 63206 - $('textarea').val().length

$('#chd').html('Le quedan <b>'+chd+'</b> caracteres para su post')


})

}
if(loc == 'comunidades'){
GM_addStyle('#derecha ul li{list-style:none!important;}#derecha ul{padding:0px!important;}')
}
if(window.location.pathname == '/comunidades/') {

$('#izquierda,#centro').attr('style','width:680px !important')
GM_addStyle("#izquierda,#centro{margin:0 10px 0 0 !important;}.crear_comunidad .box_cuerpo{background:#e7e7e7!important;border:0px!important;padding:0px!important;margin-bottom:-10px!important}.crear_comunidad h3{background:#dbdbda repeat-x url('http://i.t.net.ar/images/box_titlebg.gif');padding:5px 10px;height:15px;-moz-border-radius: 5px 5px 0 0;}.crear_comunidad p{padding:4px 10px 30px 10px;}.crear_comunidad .buttons{width:120px;float:right;margin-top:-58px;margin-right:14px;}#derecha{margin-top:-95px;}")
}
if(loc == 'crearc'){
$('#derecha,.desform:last,div[style="margin: 5px 0pt; color: rgb(102, 102, 102); font-weight: normal;"]').remove()
GM_addStyle("#centro{width:940px!important;margin:0px!important;padding:0!important;}#nft,hr{display:none}")
}
if(loc == 'agregarc') {
$('#izquierda,label:eq(1),.data:eq(2) br,.data:eq(3) br').remove()
GM_addStyle("#centroDerecha,#post_agregar{width:940px!important;padding:0px!important;}#check_cerrado,#check_sticky{margin:0 7px 0 35px;position:relative;top:2px}#post_agregar .box_cuerpo{width:940px!important;padding:7px 0px!important;}.data{font-size:0px!important;}.c_input,.c_input_desc{background:#fff !important;border-color:#ccc !important;padding:5px 3px!important;}.c_input{width:857px!important}.c_input_desc{width:904px!important;margin-top:5px!important;}label{display:inline-block!important;}")
$('.data:eq(3)').prepend('<br class="space" /><hr class="divider"><br class="space" />')
$('.data:eq(3)').append('<br class="space" /><hr class="divider"><br class="space" />')

}
if(loc == 'monitor') {
GM_addStyle("#resultados,#showResult{width:940px !important}.filterBy{width:924px !important}")


}
if(bfl == true){
GM_addStyle('.post-contenedor embed,.temaCont embed,.cuerpo_comm embed{width:100%!important;max-width:720px!important;height:524px!important}')
}







/////////////////////////////////////== Agregar BBC ==/////////////////////////////////////

$('.markItUpHeader').html('<div id="bbcode">\
\
<a 1="[b]" 2="[/b]"><img src="'+img+'bold.png"></a>&nbsp;\
<a 1="[i]" 2="[/i]"><img src="'+img+'italic.png"></a>&nbsp;\
<a 1="[u]" 2="[/u]"><img src="'+img+'underline.png"></a>&nbsp;\
\
<div class="sp"></div>&nbsp;\
\
<a 1="[align=left]" 2="[/align]"><img src="'+img+'text_align_left.png"></a>&nbsp;\
<a 1="[align=center]" 2="[/align]"><img src="'+img+'text_align_center.png"></a>&nbsp;\
<a 1="[align=right]" 2="[/align]"><img src="'+img+'text_align_right.png"></a>&nbsp;\
\
<div class="sp"></div>&nbsp;&nbsp;\
\
<select id="sizedefont" 1="[size=12px]" 2="[/size]">\
	<option value="9">9px</option>\
	<option value="12" selected="selected">12px</option>\
	<option value="14">14px</option>\
	<option value="16">16px</option>\
	<option value="18">18px</option>\
	<option value="20">20px</option>\
	<option value="22">22px</option>\
	<option value="24">24px</option>\
</select>&nbsp;&nbsp;\
<select id="tipodefont" 1="" 2="[/font]">\
	<option value="">Fuente</option>\
	<option value="American Typewriter" style="font-family: American Typewriter;">American Typewriter</option>\
	<option value="Arial" style="font-family: Arial;">Arial</option>\
	<option value="Arial Black" style="font-family: Arial Black;">Arial Black</option>\
	<option value="Calibri" style="font-family: Calibri;">Calibri</option>\
	<option value="Century" style="font-family: Century;">Century</option>\
	<option value="Chiller" style="font-family: Chiller;">Chiller</option>\
	<option value="Comic Sans MS" style="font-family: Comic Sans MS;">Comic Sans MS</option>\
	<option value="Courier New" style="font-family: Courier New;">Courier New</option>\
	<option value="FixedSys" style="font-family: FixedSys;">FixedSys</option>\
	<option value="French Script MT" style="font-family: French Script MT;">French Script MT</option>\
	<option value="Georgia" style="font-family: Georgia;">Georgia</option>\
	<option value="Impact" style="font-family: Impact;">Impact</option>\
	<option value="Lucida Sans" style="font-family: Lucida Sans;">Lucida Sans</option>\
	<option value="Lucida Console" style="font-family: Lucida Console;">Lucida Console</option>\
	<option value="Monotype Corsiva" style="font-family: Monotype Corsiva;">Monotype Corsiva</option>\
	<option value="Times New Roman" style="font-family: Times New Roman;">Times New Roman</option>\
	<option value="Traditional Arabic" style="font-family: Traditional Arabic;">Traditional Arabic</option>\
	<option value="Trebuchet MS" style="font-family: Trebuchet MS;">Trebuchet</option>\
	<option value="Verdana" style="font-family: Verdana;">Verdana</option>\
</select>&nbsp;&nbsp;\
\
<div class="sp"></div>&nbsp;\
\
<a 1="[swf=http://www.youtube.com/v/" 2="]" 3="yt"><img src="'+img+'youtube.png"></a>&nbsp;\
<a 1="[swf=" 2="]" 3="swf"><img src="'+img+'flash.png"></a>&nbsp;\
<a 1="[swf=" 2="]" 3="mv"><img src="'+img+'megavideo.png"></a>&nbsp;\
<a 1="[swf=" 2="]" 3="gv"><img src="'+img+'gv.png"></a>&nbsp;\
\
<div class="sp"></div>&nbsp;\
\
<a 1="[url" 2="[/url]" 3="link"><img src="'+img+'link.png"></a>&nbsp;\
<a 1="[img=" 2="]" 3="imagen"><img src="'+img+'imagen.png"></a>&nbsp;\
<a 1="[quote]" 2="[/quote]" 3="quote"><img src="'+img+'quote.png"></a>&nbsp;\
\
<div class="sp"></div>&nbsp;\</div>')

if(loc =='edicion'){}
else{

$('#bbcode').append('<a class="s" 1="" 3="preview"><img src="'+img+'preview.png"></a>&nbsp;<div class="sp"></div>&nbsp;')

}


/////////////////////////////////////== Nuevas funciones ==/////////////////////////////////////

$('.Container .buttons input').clone().appendTo('.miRespuesta .answerTxt')
$('.Container .buttons').html('<div id="nft"></div><br class="space"><hr class="divider">')
$('.data:eq(1)').after('<div id="nft"></div><br class="space"><hr class="divider">')

if (loc == 'edicion' || loc == 'mensajes') { $('#markItUpMarkItUp').after('<br class="space" /><br class="space" /><br class="space" /><br class="space" /><div id="nft"></div><br class="space" /><hr class="divider" style="margin-bottom:10px !important">') }

$("#nft").append('<br class="space" /><hr class="divider"><br class="space" /><center id="botones">')
if (icon == true) {$("#nft").append('<input type="button" value="Iconos" class="button" id="icon">')}
if (barco == true) {$("#nft").append('&nbsp;&nbsp;<input type="button" value="Barra colores" class="button" id="bc">')}
if (color == true) {$("#nft").append('&nbsp;&nbsp;<input type="button" value="Coloringa" class="button" id="coloringa">')}
if (leter == true) {$("#nft").append('&nbsp;&nbsp;<input type="button" value="Letringa" class="button" id="letringa">')}
if (barro == true) {$("#nft").append('&nbsp;&nbsp;<input type="button" value="Barras roprgm" class="button" id="roprgm">')}
if (bott == true) {$("#nft").append('&nbsp;&nbsp;<input type="button" value="Botones" class="button" id="bot">')}
$("#nft").append('</center>')

var st = '<style>';
if (iconm == 'cerrado')  {st += '#iconos{display:none}'; }
if (barcom == 'cerrado') {st += '#bcb{display:none}'; }
if (colorm == 'cerrado') {st += '#colorbox{display:none}'; }
if (leterm == 'cerrado') {st += '#letrinbox{display:none}'; }
if (barrom == 'cerrado') {st += '#roprgmbox{display:none}'; }
if (bottm == 'cerrado') {st += '#botbox{display:none}'; }
st += '</style>';

$('body').prepend(st)

if($("#nft").html() == '<br class="space"><hr class="divider"><br class="space"><center id="botones"></center>'){

$("#nft").remove()

}

if(loc =='agregarc'){$("#nft").before('<br><br>')}

$("#icon").click(function(){if($('#iconos').css('display') == 'none'){$("#iconos").slideDown("slow");}else{$("#iconos").slideUp("slow");}})
$("#bc").click(function(){if($('#bcb').css('display') == 'none'){$("#bcb").slideDown("slow");}else{$("#bcb").slideUp("slow");}})
$("#coloringa").click(function(){if($('#colorbox').css('display') == 'none'){$("#colorbox").slideDown("slow");}else{$("#colorbox").slideUp("slow");}})
$("#letringa").click(function(){if($('#letrinbox').css('display') == 'none'){$("#letrinbox").slideDown("slow");}else{$("#letrinbox").slideUp("slow");}})
$("#roprgm").click(function(){if($('#roprgmbox').css('display') == 'none'){$("#roprgmbox").slideDown("slow");}else{$("#roprgmbox").slideUp("slow");}})
$("#bot").click(function(){if($('#botbox').css('display') == 'none'){$("#botbox").slideDown("slow");}else{$("#botbox").slideUp("slow");}})







// ==Iconos==

function bip() {
	icono = icono.split(',')
	iconop = iconop.split(',')
	var bip = '<div id="iconos"><br class="space" /><hr class="divider"><br class="space" />'
	for (var i = 1; i < icono.length; i=i+2){
		bip += '<img src="'+icono[i+1]+'" 1="'+icono[i]+'"  title="'+icono[i]+'">';
	}
	bip += '<br class="space" /><hr class="divider"><br class="space" />';
	for (var i = 1; i < iconop.length; i=i+1){
		bip += '<img src="'+iconop[i]+'" 1="[img='+iconop[i]+']"  title="'+iconop[i]+'">';
	}
	bip += "</div>";
	return bip;
}

$("#nft").append(bip())

// ==/Iconos==

// ----------------------------------------------------------------//

// ==Barra colores==

var colores = '#000000,#222222,#444444,#666666,#888888,#AAAAAA,#000000,#000040,#000080,#0000BF,#0000FF,#004000,#004040,#004080,#0040BF,#0040FF,#008000,#008040,#008080,#0080BF,#0080FF,#00BF00,#00BF40,#00BF80,#00BFBF,#00BFFF,#00FF00,#00FF40,#00FF80,#00FFBF,#00FFFF,#400000,#400040,#400080,#4000BF,#4000FF,#404000,#404040,#404080,#4040BF,#4040FF,#408000,#408040,#408080,#4080BF,#4080FF,#40BF00,#40BF40,#40BF80,#40BFBF,#40BFFF,#40FF00,#40FF40,#40FF80,#40FFBF,#40FFFF,#800000,#800040,#800080,#8000BF,#8000FF,#804000,#804040,#804080,#8040BF,#8040FF,#808000,#808040,#808080,#8080BF,#8080FF,#80BF00,#80BF40,#80BF80,#80BFBF,#80BFFF,#80FF00,#80FF40,#80FF80,#80FFBF,#80FFFF,#BF0000,#BF0040,#BF0080,#BF00BF,#BF00FF,#BF4000,#BF4040,#BF4080,#BF40BF,#BF40FF,#BF8000,#BF8040,#BF8080,#BF80BF,#BF80FF,#BFBF00,#BFBF40,#BFBF80,#BFBFBF,#BFBFFF,#BFFF00,#BFFF40,#BFFF80,#BFFFBF,#BFFFFF,#FF0000,#FF0040,#FF0080,#FF00BF,#FF00FF,#FF4000,#FF4040,#FF4080,#FF40BF,#FF40FF,#FF8000,#FF8040,#FF8080,#FF80BF,#FF80FF,#FFBF00,#FFBF40,#FFBF80,#FFBFBF,#FFBFFF,#FFFF00,#FFFF40,#FFFF80,#FFFFBF,#FFFFFF';colores = colores.split(',');var bc ='';

for(var i = 1; i < colores.length; i++){
	bc += '<a 1="[color='+colores[i]+']" 2="[/color]"><div style="background:'+colores[i]+'"></div></a>';
}

$('#nft').append('<div id="bcb">'+spa+bc+'<br class="space" /></div>')

// ==/Barra colores==

// ----------------------------------------------------------------//

// ==Coloringa==
if (color == true) {
$('#nft').append('<div id="colorbox"><br class="space" /><hr class="divider"><br class="space" /><object height="180" width="550"><embed src="http://img20.imageshack.us/img20/3766/colores.swf" type="application/x-shockwave-flash" height="180" width="550"></object></div>')
}
// ==/Coloringa==

// ----------------------------------------------------------------//

// ==Letringa==

$('#nft').append('<div id="letrinbox">'+spa+'\
\
<input class="let" type="radio" name="estilo" value="1" checked> ClanPirata \
<input class="let" type="radio" name="estilo" value="2"> Poringa \
<input class="let" type="radio" name="estilo" value="3"> Letringa \
<input class="let" type="radio" name="estilo" value="b"> Blanco y negro \
\
'+spa+'<input type="text" id="letra">&nbsp;&nbsp;<input type="button" id="la" value="Agregar" class="button" 1="">'+spa+'\
\
<div class="preview">Vista previa</div>\
\
<br class="space" /></div>')

$(".let").click(letringa);$("#letra").keyup(letringa);
$("#la").click(function () {if($(this).attr('1') != ''){ unsafeWindow.bbc(this) }})

function letringa() {
 var estilo = $(".let:checked").val();
 var texto = $("#letra").val();
 var server = 'http://www.letringa.com.ar//generar.php?est='+estilo+'&text='
 
 if(texto != ''){
  $("#letrinbox .preview").html('<img src="'+server+texto+'">');
  $("#la").attr('1','[img='+server+texto+']');
 } else { 
  $("#letrinbox .preview").html('Vista previa');
  $("#la").attr('1','');
 }
 
}


// ==/Letringa==

// ----------------------------------------------------------------//

// ==Barra roprgm==
$('#nft').append('<div id="roprgmbox">'+spa+'\
\
<input class="bar" type="radio" name="bestilo" value="" checked> Azul \
<input class="bar" type="radio" name="bestilo" value="type=2&"> Violeta \
<input class="bar" type="radio" name="bestilo" value="type=3&"> Verde \
<input class="bar" type="radio" name="bestilo" value="type=4&"> Informal \
<input class="bar" type="radio" name="bestilo" value="type=5&"> Gris \
<input class="bar" type="radio" name="bestilo" value="type=6&"> Arcoiris \
\
'+spa+'<input type="text" id="bletra">&nbsp;&nbsp;<input type="button" id="ba" value="Agregar" class="button" 1="">'+spa+'\
<div class="preview"><div>Vista previa</div></div>\
\
<br class="space" /></div>')

$(".bar").click(barop);$("#bletra").keyup(barop);
$("#ba").click(function(){if($(this).attr('1') != ''){ unsafeWindow.bbc(this) }})

function barop() {
 var estilo = $(".bar:checked").val();
 var texto = $("#bletra").val();
 var server = 'http://i.t.roprgm.net/?titulo&'+estilo+'text=';

 if(texto != ''){
  $("#roprgmbox .preview").html('<img src="'+server+texto+'">');
  $("#ba").attr('1','[img='+server+texto+']');
 } else { 
  $("#roprgmbox .preview").html('<div>Vista previa</div>');
  $("#ba").attr('1','');
 }
 
 var bhimgma = $("#roprgmbox .preview").width() - 740; bhimgma = bhimgma / 2 ;
 $('#roprgmbox .preview img').attr('style','margin-left:'+bhimgma+'px')

}
// ==/Barra roprgm==

// ----------------------------------------------------------------//

// ==Generador de botones==
$('#nft').append('<div id="botbox">'+spa+'\
\
<input name="genbot" class="botc" type="radio" value="66" checked> Negro \
<input name="genbot" class="botc" type="radio" value="64"> Dorado \
<input name="genbot" class="botc" type="radio" value="63"> Plateado \
<input name="genbot" class="botc" type="radio" value="100"> Verde \
\
'+spa+'<table width="100%"><tr><td><input type="text" id="bbot"></td><td width="80" align="right" valign="top"><input type="button" id="bota" value="Agregar" class="button" 1=""></td></tr></table><div class="botopcion">\
\
<select id="bbotf"><option value="7-Aldine">Aldine</option><option value="7-Arial" selected="true">Arial</option><option value="7-Arial Narrow">Arial Narrow</option>\
<option value="7-Baubod">Baubod</option><option value="7-Book Antiqua">Book Antiqua</option><option value="7-Bookman Old Style">Bookman Old Style</option>\
<option value="7-Century Gothic">Century Gothic</option><option value="7-Compacta">Compacta</option><option value="7-Courier New">Courier New</option>\
<option value="7-Dutch">Dutch</option><option value="7-Times New Roman">Times New Roman</option><option value="7-Verdana">Verdana</option></select>\
\
 <div class="sp"></div> <input type="checkbox" id="bbotb"> Negrita <input type="checkbox" id="bboti"> Italica <input type="checkbox" id="bbotu"> Subrayado <div class="sp"></div> \
Ancho: <input type="text" id="bbotw" maxlength="3"> <div class="sp"></div> Alto: <input type="text" id="bboth" maxlength="3">\
\
</div>'+spa+'\
\
<div class="agregar" id="both"><div>Vista previa</div></div>\
<div class="agregar" id="botb"></div>\
\
<br class="space" />')

$('#bbot,.botopcion input[type="text"]').keyup(crebot);
$('.botc,#bbotb,#bboti,#bbotu').click(crebot)
$('#bbotf').change(crebot)

function crebot() {
 var text = $("#bbot").val().replace(/:/gi,": ").replace(/;/gi,"; ").replace(/\^\^/gi,"^ ^"); 
 var estilo = $(".botc:checked").val();
 var server = 'http://www.buttonator.com/home/get_image?t_id='+estilo+'&i_id=&antialias=true';
 var aph = '<img src="';
 var cih = '">';
 var apb = '[img=';
 var cib = ']';
 
 var oup = server+'&text='+text;
 
 if($("#bbotb").attr("checked")?true:false == true) {oup+='&bold=true'}
 if($("#bboti").attr("checked")?true:false == true) {oup+='&italics=true'}
 if($("#bbotu").attr("checked")?true:false == true) {oup+='&underline=true'}
 if($("#bbotw").val() != '') {oup+='&width='+$("#bbotw").val()}
 if($("#bboth").val() != '') {oup+='&height='+$("#bboth").val()}
 if($("#bbotf option:selected").attr('value') != '7-Arial') {oup+='&font='+$("#bbotf option:selected").attr('value')}
   
 if(text == ''){ $("#both").html('<div>Vista previa</div>'); $("#bota").attr('1','');}
 else{
 $("#both").html(aph+oup+cih)
 $("#bota").attr('1',apb+oup+cib)
 }
}

$("#bota").click(function(){if($(this).attr('1') != ''){ unsafeWindow.bbc(this) }})

// ==/Generador de botones==




// == Funcion BBC ==

unsafeWindow.bbc = function(a) {
 var ta = $(a).attr('1');
 var td = $(a).attr('2');
 var tp = $(a).attr('3');
 
 function $$$(elem) {return document.getElementById(elem);};
 if (loc == 'edicion' || loc == 'mensajes' || loc == 'agregarc' || window.location.pathname == '/posts/1/opciones'){var txt = $$$('markItUp');} 
 else if (loc == 'post'){var txt = $$$('body_comm');} 
 else {var txt = $$$('body_resp')} 
 if(txt.value == 'Escribir un comentario...' || txt.value == 'Escribir otra respuesta...' || txt.value == 'Escribir una respuesta...') {txt.value = '';}
 
 var inicio = txt.selectionStart;  
 var fin   = txt.selectionEnd;  
 var txtlength = 0;  
 var seleccion = txt.value.substr(inicio, (fin - inicio)); 
 var scrollTop = txt.scrollTop;
 
if(tp == null) {
  if(td == null) {
    txt.value = txt.value.substr(0, inicio) + ta +' '+ txt.value.substr(fin, txt.value.length);
	txt.focus();
    txt.selectionStart = txt.value.substr(0, inicio).length + ta.length + 1;
    txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length + 1;
    txt.scrollTop = scrollTop;
  }
  else {
    txt.value = txt.value.substr(0, inicio) + ta + seleccion + td + txt.value.substr(fin, txt.value.length);
    txt.focus();
    txt.selectionStart = txt.value.substr(0, inicio).length + ta.length;
    txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length + seleccion.length;
    txt.scrollTop = scrollTop;
  }
}

if(tp == 'quote'){
  if (seleccion ==''){
    var quote = prompt('Ingrese el texto a citar');
    if (quote == null || quote == '') {}
    else {
      txt.value = txt.value.substr(0, inicio) + ta + quote + td + txt.value.substr(fin, txt.value.length);
	  txt.focus();
	  txt.selectionStart = txt.value.substr(0, inicio).length;
	  txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length + quote.length + td.length;
	  txt.scrollTop = scrollTop;
    }
  }
  else {
    txt.value = txt.value.substr(0, inicio) + ta + seleccion + td + txt.value.substr(fin, txt.value.length);
	txt.focus();
	txt.selectionStart = txt.value.substr(0, inicio).length;
	txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length + seleccion.length + td.length;
	txt.scrollTop = scrollTop;
  }

}

if(tp == 'imagen'){
  if (seleccion ==''){
    var img = prompt('Ingrese la direccion de la imagen');
    if (img == null || img == '') {}
    else {
      txt.value = txt.value.substr(0, inicio) + ta + img + td + txt.value.substr(fin, txt.value.length);
	  txt.focus();
	  txt.selectionStart = txt.value.substr(0, inicio).length;
	  txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length + img.length + td.length;
	  txt.scrollTop = scrollTop;
    }
  }
  else {
    txt.value = txt.value.substr(0, inicio) + ta + seleccion + td + txt.value.substr(fin, txt.value.length);
	txt.focus();
	txt.selectionStart = txt.value.substr(0, inicio).length;
	txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length + seleccion.length + td.length;
	txt.scrollTop = scrollTop;
  }

}

if(tp == 'link') {

if (seleccion ==''){
  var link = prompt('Ingrese la direccion del link');
  if (link == null || link == '') {}
  else{
    if(confirm("Le gustaría agregar un texto al enlace ?")) {
	  var msg = prompt('Ingrese el texto');
	  if (msg == null || msg == '') {}
	  else {
	    txt.value = txt.value.substr(0, inicio) +'[url='+link+']'+msg+'[/url]'+ txt.value.substr(fin, txt.value.length);
		txt.focus();
		txt.selectionStart = txt.value.substr(0, inicio).length;
		txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length + link.length + 2 + msg.length + td.length;
		txt.scrollTop = scrollTop;
	  }
	}
	else {
	  txt.value = txt.value.substr(0, inicio) + '[url]' + link + td + txt.value.substr(fin, txt.value.length);
	  txt.focus(); 
	  txt.selectionStart = txt.value.substr(0, inicio).length;
	  txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length + 1 + link.length + td.length;
	  txt.scrollTop = scrollTop;
	}
  }
}
else {
  var link = prompt('Ingrese la direccion del link');
  if (link == null || link == '') {}
  else {
    txt.value = txt.value.substr(0, inicio) +'[url='+link+']'+seleccion+'[/url]'+ txt.value.substr(fin, txt.value.length);
	txt.focus();
	txt.selectionStart = txt.value.substr(0, inicio).length;
	txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length + link.length + 2 + seleccion.length + td.length;
	txt.scrollTop = scrollTop;
  }
}

}

if(tp == 'swf') {
if (seleccion ==''){
var swf = prompt('Ingrese la direccion de la animacion');
if (swf == null || swf == '') {}
else{
txt.value = txt.value.substr(0, inicio) + ta + swf + td + txt.value.substr(fin, txt.value.length);
txt.focus(); 
txt.selectionStart = txt.value.substr(0, inicio).length;
txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length + swf.length + td.length;
txt.scrollTop = scrollTop;
}
}
else {
txt.value = txt.value.substr(0, inicio) + ta + seleccion + td+ txt.value.substr(fin, txt.value.length);
txt.focus();
txt.selectionStart = txt.value.substr(0, inicio).length;
txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length + seleccion.length + td.length;
txt.scrollTop = scrollTop;

}

}

if(tp == 'yt'){
if (seleccion ==''){
    var id = prompt('ingrese la direccion, el id o el codigo del video');
  var id = id.split('&')[0];
  if (id == null || id == '') {}
  else {
    if(id.length == 11){
	  txt.value = txt.value.substr(0, inicio) + ta + id + td + txt.value.substr(fin, txt.value.length);
	} 
    if(id.length == 42){
	  var id = id.split('=')[1];
	  txt.value = txt.value.substr(0, inicio) + ta + id + td + txt.value.substr(fin, txt.value.length);
	} 	
	if(id.length == 96){
	  var id = id.split('"')[7];
	  txt.value = txt.value.substr(0, inicio) + '[swf=' + id + ']' + txt.value.substr(fin, txt.value.length);
	} 	
  }
  
  txt.focus();
  txt.selectionStart = txt.value.substr(0, inicio).length;
  txt.selectionEnd = txt.value.substr(0, inicio).length + 41 + td.length;
  txt.scrollTop = scrollTop;
}
else {
  var id = seleccion
  var id = id.split('&')[0];
  if (id == null || id == '') {}
  else {
    if(id.length == 11){
	  txt.value = txt.value.substr(0, inicio) + ta + id + td + txt.value.substr(fin, txt.value.length);
	} 
    if(id.length == 42){
	  var id = id.split('=')[1];
	  txt.value = txt.value.substr(0, inicio) + ta + id + td + txt.value.substr(fin, txt.value.length);
	} 	
	if(id.length == 96){
	  var id = id.split('"')[7];
	  txt.value = txt.value.substr(0, inicio) + '[swf=' + id + ']' + txt.value.substr(fin, txt.value.length);
	} 	
  }
  
  txt.focus();
  txt.selectionStart = txt.value.substr(0, inicio).length;
  txt.selectionEnd = txt.value.substr(0, inicio).length + 41 + td.length;
  txt.scrollTop = scrollTop;
}



 
}

if(tp == 'mv'){
  if (seleccion ==''){
    var id = prompt('ingrese el codigo del video');
    var id = id.split('="')[4];
	var id = id.split('"')[0];
	
	txt.value = txt.value.substr(0, inicio) + ta + id + td + txt.value.substr(fin, txt.value.length);
	 
    txt.focus();
    txt.selectionStart = txt.value.substr(0, inicio).length;
    txt.selectionEnd = txt.value.substr(0, inicio).length + 72 + td.length;
    txt.scrollTop = scrollTop;
  }
  else{
    var id = seleccion
    var id = id.split('="')[4];
	var id = id.split('"')[0];
	
	txt.value = txt.value.substr(0, inicio) + ta + id + td + txt.value.substr(fin, txt.value.length);
	 
    txt.focus();
    txt.selectionStart = txt.value.substr(0, inicio).length;
    txt.selectionEnd = txt.value.substr(0, inicio).length + 72 + td.length;
    txt.scrollTop = scrollTop;
  }
}

if(tp == 'gv'){
  if (seleccion ==''){
   var id = prompt('Ingrese la direccion, el id o el codigo del video');
   var id = id.split('&')[0];
   if (id == null || id == '') {}
   else {
     if(id.length == 19){
	  txt.value = txt.value.substr(0, inicio) + ta + 'http://video.google.com.ar/googleplayer.swf?docid=' + id + td + txt.value.substr(fin, txt.value.length);
	 } 
     if(id.length == 62){
	  var id = id.split('=')[1];
	  txt.value = txt.value.substr(0, inicio) + ta + 'http://video.google.com.ar/googleplayer.swf?docid=' + id + td + txt.value.substr(fin, txt.value.length);
	 } 	
	 if(id.length == 97){
	  var id = id.split('=')[3];
	  txt.value = txt.value.substr(0, inicio) + ta + 'http://video.google.com.ar/googleplayer.swf?docid=' + id + td + txt.value.substr(fin, txt.value.length);
	 } 
   }
   txt.focus();
   txt.selectionStart = txt.value.substr(0, inicio).length;
   txt.selectionEnd = txt.value.substr(0, inicio).length + 74 + td.length;
   txt.scrollTop = scrollTop;
  }
  else{
   var id = seleccion.split('&')[0];
   if (id == null || id == '') {}
   else {
     if(id.length == 19){
	  txt.value = txt.value.substr(0, inicio) + ta + 'http://video.google.com.ar/googleplayer.swf?docid=' + id + td + txt.value.substr(fin, txt.value.length);
	 } 
     if(id.length == 62){
	  var id = id.split('=')[1];
	  txt.value = txt.value.substr(0, inicio) + ta + 'http://video.google.com.ar/googleplayer.swf?docid=' + id + td + txt.value.substr(fin, txt.value.length);
	 } 	
	 if(id.length == 97){
	  var id = id.split('=')[3];
	  txt.value = txt.value.substr(0, inicio) + ta + 'http://video.google.com.ar/googleplayer.swf?docid=' + id + td + txt.value.substr(fin, txt.value.length);
	 } 
   }
   
   txt.focus();
   txt.selectionStart = txt.value.substr(0, inicio).length;
   txt.selectionEnd = txt.value.substr(0, inicio).length + 74 + td.length;
   txt.scrollTop = scrollTop;
  }
}

if(tp == 'preview'){
if (loc == 'agregarc') { preview ('#centroDerecha','prepend','#markItUp','preview-tema','<div id="temaComunidad"><div class="temaBubble"><div class="bubbleCont"><div class="Container"><div class="TemaCont"><div class="postBy"><a href="/perfil/'+user+'"><img title="Ver perfil de '+user+'" alt="Ver perfil de '+user+'" class="avatar" src="http://i.t.net.ar/images/avatar.gif"></a><strong><a title="Ver perfil de '+user+'" href="/perfil/'+user+'">'+user+'</a></strong><ul class="userIcons"><li><span class="systemicons sexoM"></span></li><li><img title="Argentina" src="http://i.t.net.ar/images/flags/ar.png" width="16" height="11" align="absmiddle" alt="Argentina" /></li><li><a title="Enviar un mensaje privado" href="/mensajes/a/'+user+'"><span class="systemicons mensaje"></span></a></li></ul></div><div class="temaCont" style="width:600px"><div class="floatL"><h1 class="titulopost">'+$(".c_input").val()+'</h1></div><div class="floatR"><a onclick="$(this).parent().parent().parent().parent().parent().parent().parent().parent().remove()" id="closep" title="Cerrar"><img src="http://s1007.photobucket.com/albums/af198/gonza_06/close-icon.png"></a></div><div class="clearBoth"></div><hr /><p>','</p></div><div class="clearBoth"></div></div></div></div><br></div>') }

else if (loc =='post') { var nu = $('.commenttext').length + 1 ; preview ('#comentarios','append','#body_comm','preview-coment','<div class="comentario-post clearfix" id="pcbox"><div class="avatarspace"><a href="/perfil/'+user+'">'+user+'</a></div><div class="commenttext"><div class="answerOptions"><div class="floatL metaDataA">#'+nu+' - <span title="">Menos de 1 minuto</span></div><ul class="floatR"><li class="answerCitar"><a onclick="$(this).parent().parent().parent().parent().parent().slideUp(\'slow\')" id="closep" title="Cerrar"><img src="http://s1007.photobucket.com/albums/af198/gonza_06/close-icon.png"></a></li></ul><div class="clearBoth"></div></div><div class="cuerpo_comm" style="margin: 10px;">','</div></div></div>') }

else if (loc == 'mensajes'){ var asu = $('.container702 input:eq(1)').val(); preview ('.container702','before','#markItUp','preview-mens','<div class="container-men" style="width:702px;float:right;padding-left:5px;margin-bottom:10px;"><div class="box_title"><div class="box_txt mensajes_ver" style="width:694px;height:2px;text-align:center;font-size:12px">'+asu+'</div><div class="box_rss"></div><div class="floatR"><a onclick="$(\'.container-men\').slideUp(\'slow\')" id="closep" title="Cerrar"><img src="http://s1007.photobucket.com/albums/af198/gonza_06/close-icon.png"></a></div></div><div class="box_cuerpo" style="width:686px"><div class="m-col1">De:</div><div class="m-col2"><strong><a href="/perfil/'+user+'" alt="Ver Perfil" title="Ver Perfil">'+user+'</a></strong></div><div class="m-col1">Enviado:</div><div class="m-col2">Hoy</div><div class="m-col1">Asunto:</div><div class="m-col2">'+asu+'</div><div class="m-col1">Mensaje:</div><div class="m-col2m">','</div><br clear="left" /></div></div></div>')}

else { var nu = $('.respuesta').length + 1 ; preview ('#respuestas','append','#body_resp','preview-resp','<div class="respuesta"><div class="answerInfo"><h3><a href="/perfil/'+user+'">'+user+'</a></h3></div><div class="answerTxt"><div class="answerContainer"><div class="Container"><img class="dialogBox" src="http://i.t.net.ar/images/dialog.gif" alt=""><div class="answerOptions"><div class="floatL metaDataA">#'+nu+' - <span>Menos de 1 minuto</span></div><ul class="floatR"><li class="answerCitar"><a onclick="$(this).parent().parent().parent().parent().parent().parent().parent().remove()" id="closep" title="Cerrar"><img src="http://s1007.photobucket.com/albums/af198/gonza_06/close-icon.png"></a></li></ul><div class="clearBoth"></div></div><div class="textA">','</div></div></div>') }
}

}
$('.markItUpHeader a,#iconos img, #bcb a,#emoti a').click(function(){unsafeWindow.bbc(this)})
$('.markItUpHeader select:eq(0)').change(function(){$(this).attr('1','[size='+$(this).val()+']'); unsafeWindow.bbc(this) })
$('.markItUpHeader select:eq(1)').change(function(){$(this).attr('1','[font='+$(this).val()+']'); if($(this).val() == 'Fuente'){} else{unsafeWindow.bbc(this)} })

$.ctrl = function(key, callback, args) {
    $(document).keydown(function(e) {
        if(!args) args=[]; // IE barks when args is null
        if(e.keyCode == key.charCodeAt(0) && e.altKey) {
            callback.apply(this, args);
            return false;
        }
    });
};
$.ctrl('B', function() { unsafeWindow.bbc($('#bbcode a:eq(0)')) });
$.ctrl('I', function() { unsafeWindow.bbc($('#bbcode a:eq(1)')) });
$.ctrl('U', function() { unsafeWindow.bbc($('#bbcode a:eq(2)')) });
$.ctrl('Y', function() { unsafeWindow.bbc($('#bbcode a:eq(6)')) });
$.ctrl('S', function() { unsafeWindow.bbc($('#bbcode a:eq(7)')) });
$.ctrl('N', function() { unsafeWindow.bbc($('#bbcode a:eq(8)')) });
$.ctrl('G', function() { unsafeWindow.bbc($('#bbcode a:eq(9)')) });
$.ctrl('L', function() { unsafeWindow.bbc($('#bbcode a:eq(10)')) });
$.ctrl('Q', function() { unsafeWindow.bbc($('#bbcode a:eq(12)')) });
$.ctrl('P', function() { unsafeWindow.bbc($('#bbcode a:eq(13)')) });
$.ctrl('T', function() { unsafeWindow.bbc($('#bbcode select:eq(0)')) });
$.ctrl('F', function() { unsafeWindow.bbc($('#bbcode select:eq(1)')) });



////== Previsualizar ==/////
function preview (were,te,box,divid,c1,c2) {
   var boxm = "#"+divid
   var mens = $(box).val()
if(mens == ''){alert('falta contenido')}
else{

$(boxm).remove()

   $.ajax({
      type: 'GET',
      url: 'http://'+dom+'/preview.php',
      dataType: 'text',
      data:"titulo=titulo&cuerpo="+encodeURIComponent(mens),
      success: function(h){
	respuesta = $('<div id="respuesta">'+h+'</div>').find('#post-centro div[class="box_cuerpo"]').html();
	sexo = $('<div id="respuesta">'+h+'</div>').find('span[style="position: relative;"]:eq(2) img').attr('alt');
if(te=='prepend') { $(were).prepend('<div id="'+divid+'" style="display:none;">'+c1+respuesta+c2+'</div>') }
if(te=='append') { $(were).append('<div id="'+divid+'" style="display:none;">'+c1+respuesta+c2+'</div>') }
if(te=='before') { $(were).before('<div id="'+divid+'" style="display:none;">'+c1+respuesta+c2+'</div>') }
	$(boxm).slideDown('slow');
      },
      error: function(h){
	$(were).prepend('<center><div id="nonme" style="display:none;font-size:11px;color:#f00;padding:8px;margin-left:174px !important;"><b>- Hubo un error al intentar previsualizar -</b></div></center>')
	$("#nonme").fadeIn("slow");
	setTimeout('$("#nonme").slideUp("slow")',1500);
      }
});

}

}

$(document).keypress(function(e) {
    if(e.keyCode==27) { 
        $('#preview-tema,#preview-coment,#preview-mens,#preview-resp').slideUp('slow',function(){$('#preview-tema,#preview-coment,#preview-mens,#preview-resp').remove()});
	}
});




////== Actualizador de post ==/////
if (loc == 'principal'){
if (fdc == true) {


$('a[title="Novatos"]').parent().remove()





GM_addStyle("#centro{width:252px !important;padding:0 5px !important}#izquierda,#derecha{width:345px !important;padding:0px !important;}#cuerpocontainer{padding:7px 4px !important;width:952px!important}.box_cuerpo{padding:5px !important;}.box_cuerpo .box_cuerpo{padding:0px !important;}#ibuscadorq{width:158px !important;}#rc1,#rc2{cursor:pointer}.lisol{background:#aaa !important;}"+
"#rc3:hover{text-decoration:none !important;}#rc3:hover span{text-decoration:underline}#rc3 span{position:relative;top:-4px;right:5px;}")

$('#izquierda').html('<div class="box_title"><div class="box_txt">Últimos posts</div><div class="box_rss" id="rc1"><a><img src="'+img+'refresh.png"></a></div></div><div class="box_cuerpo" id="fc1"><span class="bnb"></span><hr class="divider"><ul><center id="loadp"><img src="http://i.t.net.ar/images/cargando.gif"></center></ul><hr class="divider"><span class="bnb"></span></div>')
$('#derecha').html('<div class="box_title"><div class="box_txt">Últimos posts</div><div class="box_rss" id="rc2"><a><img src="'+img+'refresh.png"></a></div></div><div class="box_cuerpo" id="fc2"><span class="bnb"></span><hr class="divider"><ul><center id="loadp"><img src="http://i.t.net.ar/images/cargando.gif"></center></ul><hr class="divider"><span class="bnb"></span></div>')

var aaa = dir.split('?pagina=')[1]
if(aaa==null){aaa = 0}
a1 = aaa
a2 = aaa
$('#fc1 span').html('<a id="c1b">&laquo; Anterior </a><a id="c1n">Siguiente &raquo;</a>')
$('#fc2 span').html('<a id="c2b">&laquo; Anterior </a><a id="c2n">Siguiente &raquo;</a>')

$("#fc1 ul").load('posts/'+catego1+'/pagina'+a1+' #izquierda .box_cuerpo li');
$("#fc2 ul").load('posts/'+catego2+'/pagina'+a2+' #izquierda .box_cuerpo li');

$("#buscadorBox").after('<div id="filtercat"><div class="box_title"><div class="box_txt ultimos_posts">Filtrar por categorias</div></div>\
<div class="box_cuerpo" style="padding:5px 0px !important;"><ul  class="pcategoria">\
<hr class="divider"><div class="pcb"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>\
	<td><li><a name="-1">Ver Todas</a></li></td>\
	<td><li><a name="novatos">Novatos</a></li></td>\
</tr></table></div><hr class="divider"><hr class="divider"><div class="pcb"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>\
	<td><li><a name="animaciones">Animaciones</a></li>\
	<li><a name="apuntes-y-monografias">Apuntes y Monograf&iacute;as</a></li>\
	<li><a name="arte">Arte</a></li>\
	<li><a name="autos-motos">Autos y Motos</a></li>\
	<li><a name="celulares">Celulares</a></li>\
	<li><a name="comics">Comics</a></li>\
	<li><a name="deportes">Deportes</a></li>\
	<li><a name="downloads">Downloads</a></li>\
	<li><a name="ebooks-tutoriales">E-books y Tutoriales</a></li>\
	<li><a name="economia-negocios">Econom&iacute;a y negocios</a></li>\
	<li><a name="femme">Femme</a></li>\
	<li><a name="humor">Humor</a></li>\
	<li><a name="imagenes">Im&aacute;genes</a></li>\
	<li><a name="info">Info</a></li>\
	<li><a name="juegos">Juegos</a></li></td>\
	<td><li><a name="links">Links</a></li>\
	<li><a name="linux">Linux y GNU</a></li>\
	<li><a name="mac">Mac</a></li>\
	<li><a name="manga-anime">Manga y Anime</a></li>\
	<li><a name="mascotas">Mascotas</a></li>\
	<li><a name="musica">M&uacute;sica</a></li>\
	<li><a name="noticias">Noticias</a></li>\
	<li><a name="offtopic">Off-topic</a></li>\
	<li><a name="recetas-y-cocina">Recetas y Cocina</a></li>\
	<li><a name="salud-bienestar">Salud y Bienestar</a></li>\
	<li><a name="solidaridad">Solidaridad</a></li>\
	<li><a name="clan-pirata">ClanPirata!</a></li>\
	<li><a name="turismo">Turismo</a></li>\
	<li><a name="tv-peliculas-series">TV, Peliculas y series</a></li>\
	<li><a name="videos">Videos On-line</a></li></td>\
</tr></table></div><hr class="divider"></ul><br class="space" /><center><a id="rc3"><span>Recargar ambas categorias</span><img src="'+img+'refresh.png"></a></center></div></div><br class="space" />');



$('.pcategoria li a[name="'+catego1+'"]').addClass('lisel');
$('.pcategoria li a[name="'+catego2+'"]').addClass('lisol');





$(document).ready(function(){
    $('#filtercat').bind("contextmenu",function(e){
        return false;
    });
});



$(".pcategoria li a").mousedown(function(e){
if( e.button == 0 ) {
$(".pcategoria li *").removeClass("lisel");
$(this).attr("class","lisel")
$("#izquierda .box_cuerpo ul").html('<center id="loadp"><img src="http://i.t.net.ar/images/cargando.gif"></center>'); 
$("#fc1 ul").load('categorias/'+$("a.lisel").attr("name")+'/pagina'+a1+' #izquierda .box_cuerpo li');
}

if( e.button == 2 ) {
$(".pcategoria li *").removeClass("lisol");
$(this).attr("class","lisol")
$("#derecha .box_cuerpo ul").html('<center id="loadp"><img src="http://i.t.net.ar/images/cargando.gif"></center>'); 
$("#fc2 ul").load('categorias/'+$("a.lisol").attr("name")+'/pagina'+a2+' #izquierda .box_cuerpo li');
}

})

$("#rc1").click(function(){
$("#izquierda .box_cuerpo ul").html('<center id="loadp"><img src="http://i.t.net.ar/images/cargando.gif"></center>'); 
$("#fc1 ul").load('categorias/'+$("a.lisel").attr("name")+'/pagina'+a1+' #izquierda .box_cuerpo li');
}); 

$("#rc2").click(function(){
$("#derecha .box_cuerpo ul").html('<center id="loadp"><img src="http://i.t.net.ar/images/cargando.gif"></center>'); 
$("#fc2 ul").load('categorias/'+$("a.lisol").attr("name")+'/pagina'+a2+' #izquierda .box_cuerpo li');
}); 

$("#rc3").click(function (){
$("#izquierda .box_cuerpo ul").html('<center id="loadp"><img src="http://i.t.net.ar/images/cargando.gif"></center>'); 
$("#fc1 ul").load('categorias/'+$("a.lisel").attr("name")+'/pagina'+a1+' #izquierda .box_cuerpo li');

$("#derecha .box_cuerpo ul").html('<center id="loadp"><img src="http://i.t.net.ar/images/cargando.gif"></center>'); 
$("#fc2 ul").load('categorias/'+$("a.lisol").attr("name")+'/pagina'+a2+' #izquierda .box_cuerpo li');
}); 


$('* #c1b').click(function(){
if(a1==0){}
else{a1 = a1 - 1
$("#fc1 ul").load('categorias/'+$("a.lisel").attr("name")+'/pagina'+a1+' #izquierda .box_cuerpo li');}
})

$('* #c1n').click(function(){
if(a1==50){}
else{a1 = a1 + 1
$("#fc1 ul").load('categorias/'+$("a.lisel").attr("name")+'/pagina'+a1+' #izquierda .box_cuerpo li');}
})

$('* #c2b').click(function(){
if(a2==0){}
else{a2 = a2 - 1
$("#fc2 ul").load('categorias/'+$("a.lisol").attr("name")+'/pagina'+a2+' #izquierda .box_cuerpo li');}
})

$('* #c2n').click(function(){
if(a2==50){}
else{a2 = a2 + 1
$("#fc2 ul").load('categorias/'+$("a.lisol").attr("name")+'/pagina'+a2+' #izquierda .box_cuerpo li');}
})

}
}
////== Actualizador de coments ==////
if (loc == 'post'){

$('.miComentario .answerTxt').append('<input id="comentar" class="mBtn btnOk" value="Comentar" tabindex="2" type="button"><div id="stco"></div>')

$('#comentar').click(function(){
$(this).slideUp('slow')
setTimeout('$("#comentar").slideDown("slow")',50000);
var text= $("#body_comm").val();
$.ajax({
		type: 'POST',
		url: '/comentario3.php',
		data: 'comentario=' + encodeURIComponent(text) + '&lastid=' + unsafeWindow.lastid_comm + gget('postid') + gget('key') + '&mostrar_resp=true',
		success: function(h){
			reco()
			switch(h.charAt(0)){
				case '0': //Error
					$('.miComentario .error').html(h.substring(3)).show('slow');
					break;
				case '1': //OK
						$("#body_comm").attr('title', 'Escribir otra respuesta...').val('');
						unsafeWindow.onblur_input($("#body_comm"));
					break;
			}
		},

		error: function(){
			add_comment_enviado = false;
			mydialog.error_500("add_comment('"+mostrar_resp+"')");
		}
});



function gget(data, sin_amp){
var r = data+'='; 	if(!sin_amp) r = '&'+r;
switch(data){
 case 'key':  if(unsafeWindow.global_data.user_key!='') return r+unsafeWindow.global_data.user_key; break;
 case 'postid':  if(unsafeWindow.global_data.postid!='') return r+unsafeWindow.global_data.postid; break;
 case 'comid':  if(unsafeWindow.global_data.comid!='') return r+unsafeWindow.global_data.comid; break;
 case 'temaid':  if(unsafeWindow.global_data.temaid!='') return r+unsafeWindow.global_data.temaid; break;
} return '';}

})

GM_addStyle("#lc{text-align:center;}.answerTxt{width:940px !important}"+
"#rc1{float:left;margin-right:10px}#rc2{float:right;z-index:2;position:relative;top:22px;right:20px}")

$(".titulorespuestas").prepend('<div id="rc1"><b><a><img src="'+img+'refresh.png"></a></b></div>')
$(".miComentario").prepend('<div id="rc2"><b><a href="javascript:void(0)">Actualizar comentarios</a></b></div>')

$("#post-comentarios").mouseover(function(){
var nhm = $('div[style="margin: 20px 0pt 20px 175px; font-weight: bold; font-size: 14px; text-align: center; color: rgb(102, 102, 102);"]')
if(nhm.html() =='El post se encuentra cerrado y no se permiten comentarios.'){if($('.commenttext').length == 0){$("#post-comentarios").remove()}}
else{nhm.html('Este post no tiene comentarios, Se el primero!')}
})

$("#rc1 a,#rc2 a").click(function (){
reco()
}) 
$("#mask").after('<div id="cp" style="display:none"></div>')

function reco() {
$("#comentarios").append('<div id="lc" style="display:none;margin-left:174px !important;"><img src="http://i.t.net.ar/images/cargando.gif"><br>Cargando nuevos comentarios</div></div>')
$("#lc").slideDown("slow");
$("#cp").html($(".avatarspace").not('#pcbox .avatarspace').length)

$("#comentarios").load(window.location.pathname+" #comentarios", function(){
if($("#comentarios").html() == ''){
$("#comentarios").append('<center><div id="nonme"><b>- El post ah sido eliminado -</b></div><div id="nonmea"><b>- Cargar igual los comentarios -</b></div></center>')
$("#nonme").fadeIn("slow");
setTimeout('$("#nonme").slideUp("slow");$("#nonmea").fadeIn("slow");',1500);
}
else { if($('#cp').html()==$(".avatarspace").not('#pcbox .avatarspace').length){

$("#comentarios").append('<center><div id="nonme"><b>- No hay nuevos comentarios -</b></div></center>');
$("#nonme").fadeIn("slow");
setTimeout('$("#nonme").slideUp("slow")',1500);

$("#nonmea").click(function(){

$.ajax({
  url: "http://www.clanpirata.com.ar/rss/comentarios.php?id="+locc[3],
  success: function(xml){
  
    $("#comentarios").html('')	
	var limit = xml.getElementsByTagName('item').length
	var rss = "";
	for (var l=0; l < limit; l++){
      var user = xml.getElementsByTagName('dc:creator').item(l).firstChild.data;
      var date = xml.getElementsByTagName('pubDate').item(l).firstChild.data.split(",")[1].split(' ')
      var coment = xml.getElementsByTagName('description').item(l+1).firstChild.data;
	  var number = l+1
	  
	  var dia = date[0];
	  var mes = date[1].replace('Jan','01').replace('Feb','02').replace('Mar','03').replace('Apr','04').replace('May','05').replace('Jun','06').replace('Jul','07').replace('Aug','08').replace('Sep','09').replace('Oct','10').replace('Nov','11').replace('Dec','12')
	  var año = date[2];
	  var date = date[3]+ ' - ' +dia+'/'+ mes +'/'+ año;
	  	  
      rss = '<div class="comentario-post clearfix"><div class="avatarspace"><a href="/perfil/'+user+'">'+user+'</a></div><div class="commenttext"><div class="answerOptions"><div class="floatL metaDataA">#'+number+'</div><ul class="floatR"><li class="answerCitar">'+date+'</li><li><a href="/mensajes/a/'+user+'"><span class="systemicons mensaje"></span></a></li></ul><div class="clearBoth"></div></div><div class="cuerpo_comm" style="margin: 10px">'+coment+'</div></div></div>';
	  
	  
	  
	  
	  
      $("#comentarios").append(rss);
   }
	
	
    
   
  }
});


//$("#comentarios").load("http://www.clanpirata.com.ar/rss/comentarios.php?id=4384974")

})









}

}})}

}

////== Moderar post ==////
if (mdp == true) {
if (loc == 'miperfil') {
  GM_addStyle('.lastPostsData a{display:inline-block !important;}.lastPostsData span {margin-top:-5px}#pub{display:inline-block;margin-left:5px;position:relative;top:5px;}#pub img{display:block !important;border-left:1px solid #ddd !important;padding-left:5px;cursor:pointer;}#mask{display:none;width:970px;height:530px;background:rgba(0, 0, 0, 0.5);position:absolute;top:50%!important;margin-top:-270px;left:50%!important;;margin-left:-490px;padding:5px;-moz-border-radius:7px;}#mopt{background:url(http://i.t.net.ar/images/bg-menu-2.gif);padding:5px;-moz-border-radius:7px 7px 0 0;height:20px;position:relative;z-index:7;-moz-box-shadow:0 12px 50px rgba(0, 0, 0, 0.3);}#mopt b{display:inline-block;margin-top:-5px;margin-left:5px;}#mopt h1{color:#555 !important;text-shadow:0 0 2px rgba(0, 0, 0, 0.2) !important;}#mopt span{display:block!important;width:16px;height:16px;background:url(http://i1007.photobucket.com/albums/af198/gonza_06/close-icon.png);float:right;margin:2px 5px;}#mopc{height:500px;background:#fff;-moz-border-radius:0 0 7px 7px;overflow:auto;}.categoriaCom{display:inline-block;width:590px !important;}.categoriaCom:hover{background:#eee;-moz-border-radius:4px;}#pubc{display:inline-block;margin-left:5px;position:relative;top:-10px;margin-left:-77px;float:right;}#pubc a{display:inline-block;}#pubc img{display:block !important;border-left:1px solid #ddd !important;padding-left:5px;cursor:pointer;}')

	for (var i = 0; i < $('a[href*="/posts/"]').size(); i++) {
		var post = $('a[href*="/posts/"]:eq('+i+')');
		var key = unsafeWindow.global_data.user_key
		var postid = post.attr('href').split('/')[3];
	var pub = '<div id="pub">'
	pub += '<a href="../edicion.form.php?id='+postid+'" title="Editar Post"><img src="'+img+'lapiz.png" align="absmiddle"/></a> ';
	pub += '<a class="editp" 1="'+postid+'" title="Administrar Post"><img src="'+img+'Shield_delete.png" align="absmiddle"/></a> ';
	pub += '<a title="Eliminar Post" id="delepost" 1="'+postid+'"><img src="'+img+'close-icon.png" align="absmiddle"/></a> ';
	pub += '</div>'

	post.parent().find('span').append(pub);
	}


 $('#mask').html('<div id="mopt"><b></b><span></span></div><div id="mopc"></div>')

$('.lastPostsData .editp').click(function(){
unsafeWindow.global_data.postid = $(this).attr('1')
$("#mask").fadeIn("slow")
 $('#mopt b').load('/posts/'+$(this).attr("1")+'/ .post-title h1')
 $('#mopc').load('/posts/'+$(this).attr("1")+'/ #comentarios',function(){$('#mopc').append('<style>#mask{opacity:1!important}</style>')})
})

$('.lastPostsData #delepost').click(function(){
if(confirm('Seguro que deseas borrar este post?'))
if(confirm('Te pregunto de nuevo...segur@ que deseas borrar este post?'))
location.href='/post.borrar.php?id='+$(this).attr('1')+'&amp;key='+unsafeWindow.global_data.user_key

})


$('#mopt span').click(function(){
$("#mask").fadeOut('slow',function(){$('#mopt b,#mopc').html('')})
})

	for (var i = 0; i < $('a.titletema').size(); i++) {
		var tema = $('a.titletema:eq('+i+')');
		var key = unsafeWindow.global_data.user_key
		var temasid = tema.attr('href').split('/')[3];
		var comu = tema.attr('href').split('/')[2];
	var pubc = '<div id="pubc">'
	pubc += '<a href="../comunidades/'+comu+'/editar-tema/'+temasid+'/" title="Editar Post"><img src="'+img+'lapiz.png" align="absmiddle"/></a> ';
	pubc += '<a class="editt" 1="'+postid+'" 2="'+temasid+'" title="Administrar Post"><img src="'+img+'Shield_delete.png" align="absmiddle"/></a> ';
	pubc += '<a title="Eliminar Post"><img src="'+img+'close-icon.png" align="absmiddle"/></a> ';
	pubc += '</div>'
	tema.parent().append(pubc);
	}

$('.lastTopicsData .editt').click(function(){
unsafeWindow.global_data.temaid = $(this).attr('1')
unsafeWindow.global_data.comid = $(this).attr('2')
$("#mask").fadeIn("slow")
 $('#mopt b').load('/comunidades/'+$(this).attr('1')+'/'+$(this).attr("2")+'/ .titulopost')
 $('#mopc').load('/comunidades/'+$(this).attr('1')+'/'+$(this).attr("2")+'/ #respuestas')

})

$('#mopt span').click(function(){
$("#mask").fadeOut('slow',function(){$('#mopt b,#mopc').html('')})
})

}
}

////== Bloquea swf ==/////
if (mos == true) {
$(".post-contenedor embed,.temaCont embed,.cuerpo_comm embed").wrap('<div id="membed"><div></div></div>');
if(mosm=='cerrados'){
GM_addStyle(".post-contenedor embed,.temaCont embed,.cuerpo_comm embed{display:none}")
$("#membed *").not('embed').before('<span><img src="'+img+'mas.png"></span>');

$("#membed span").toggle(function(){
$(this).parent().find('embed').slideDown('slow')
$(this).find('img').attr('src',img+'menos.png')
},
function(){
$(this).parent().find('embed').slideUp('slow')
$(this).find('img').attr('src',img+'mas.png')
})

}
else{
$("#membed *").not('embed').before('<span><img src="'+img+'menos.png"></span>');


$("#membed span").toggle(function(){
$(this).parent().find('embed').slideUp('slow')
$(this).find('img').attr('src',img+'mas.png')
},
function(){
$(this).parent().find('embed').slideDown('slow')
$(this).find('img').attr('src',img+'menos.png')
})
}

GM_addStyle(".kodak-yt{background:none!important;border:0!important;padding-top:25px;-moz-box-shadow:0 0 0!important;width:auto!important}.kodak-banner{display:none}#membed{background:#ddd;padding:7px;-moz-border-radius:7px;}#membed embed{-moz-box-shadow:0 0 7px #999;margin:0 auto;margin-top:6px!important;}#membed span{margin-top:0px;margin-left:auto;display:block;height:20px;width:15px;cursor:pointer;font-size:12px;font-weight:bold;}")

}

////== Link checker ==////
if (lic == true) {
var a = location.hostname;
var todos = [];
var hosts = [];
var numerodelinksRS = 0;
var otros_vivos = [];
var otros_muertos = [];
var otros_peso = [];
var otros_links_cant = 0;
var otros_links = [];
var redirectores = [];
var todos_rapidshare_regex = /(http\:|^.*?http:|^.*?http%3a)\/\/rapidshare\.com\/files\/\d{4,}\/.*?\..*?/gi;
var redirectores_regex = /http\:\/\/(bux\.to|kijm7\.9hz\.com|link-protector\.com|linkbucks\.com|linkin\.us|protectlinks\.com|rapidsafe\.net|rapidsharr\.com|tinyurl\.com|urlhawk|usercash\.com|wlink.us\.com)/gi;
var redirectores2_regex = /http:\/\/(?:lik\.cl\/\?|anonym.to\/\?|links\.wamba\.com\/noref.php\?url=|www\.anonimizar\.com\.ar\/\?)/gi;

////== Servidores ==////
hosts.push (["2shared.com", /2SHARED\.COM\/FILE/gi, /javascript\:startDownload\(\)/gi, /The file link that you requested is not valid/gi, /[\d,]+ [KM]B/ ]);
hosts.push (["4shared.com", /4SHARED\.COM\/FILE/gi, /Descargar ahora/gi, /The file link that you requested is not valid|El enlace del archivo que has solicitado no es valido/gi, /[\d,]+ [KM]B/ ]);
hosts.push (["adrive.com", /ADRIVE\.COM\/PUBLIC/gi, /Your file download should start immediately/gi, /you are trying to download is busy due to extreme demand|The file you are trying to access is no longer available publicly/gi ]);
hosts.push (["axifile.com", /http:\/\/www\.axifile\.com/gi, /file download/gi, "" ]);
hosts.push (["archive.org", /ARCHIVE\.ORG\/(?:DOWNLOAD|DETAILS|\d)/gi, /Individual Files/gi, /does not exist|Item cannot be found|not available/gi ]);
hosts.push (["badongo.com", /BADONGO\.COM\/(?:[\w]+\/|)/gi, /publisher\'s virtual Drive|This file has been split|Descargar archivo/gi, /Este archivo ha sido borrado|Archivo no encontrado/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["bitroad.net", /BITROAD\.NET\/DOWNLOAD/gi, /value="Download"/gi, /not found/gi, /[\d.]+ [KM]b/ ]);
hosts.push (["dataup.de", /DATAUP\.DE\//gi, /Download:/gi, "", /[\d.]+ [KM]B/ ]);
hosts.push (["depositfiles.com", /DEPOSITFILES\.COM\/(?:\w\w\/|)FILES\/\w+/gi, /Descarga del fichero|Descarga de archivo/gi, /Such file does not exist/gi, /[\d.]+\&nbsp\;[KM]B/ ]);
hosts.push (["easy-share.com", /EASY-SHARE\.COM/gi, /FREE DOWNLOAD MODE|You are requesting/, /requested File is deleted/gi ]);
hosts.push (["egoshare.com", /EGOSHARE\.COM\/DOWNLOAD/gi, /You have requested/gi, /requested file could not be found/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["fastfreefilehosting.com", /http:\/\/fastfreefilehosting\.com/gi, /File name:/gi, /SNC000400\.jpg/gi ]);
hosts.push (["filebase.to", /FILEBASE\.TO\/FILES/gi, /Downloads:/gi, /Fehler 404/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["filefactory.com", /FILEFACTORY\.COM\/FILE/gi, /Here are your download options|Download for free with FileFactory Basic|file uploaded/gi, "", /[\d.]+ [KM]B/ ]);
hosts.push (["fileflyer.com", /FILEFLYER\.COM\/VIEW/gi, /Unlock Now!/gi, /download_disable|unavailable for a while/, /[\d.]+ [KM]B/ ]);
hosts.push (["filesdump.com", /filesdump\.com/gi, /Download File/gi, "" ]);			 
hosts.push (["filesend.net", /FILESEND\.NET\/DOWNLOAD\.PHP/gi, /Download!/gi, /File not found/, /[\d]+[.]+[\d]+ [KM]B/ ]);
hosts.push (["filezzz.com", /FILEZZZ\.COM\/DOWNLOAD/gi, /Click here to download.../gi, /File not found!/, /[\d.]+ [KM]B/ ]);
hosts.push (["flyupload.com", /FLYUPLOAD\.COM\/(?:GET|\?FID)/gi, /Continue to Download|/gi, /expired/, /[\d.]+[KM]B/ ]);
hosts.push (["freakshare.net", /http:\/\/freakshare\.net/gi, /Premium Download/gi, "" ]);
hosts.push (["gigasize.com", /GIGASIZE\.COM\/GET\.PHP/gi, /download_button\.png/gi, /Download error|Error en la descarga|Erreur lors du tÃ©lÃ©chargement|Download-Fehler/gi, /[\d.]+[KM]B/ ]);
hosts.push (["hotfile.com", /HOTFILE\.COM\/DL/gi, /REGULAR DOWNLOAD|downloading|high speed download/gi, "", /[\d.]+[KM]b/ ]);
hosts.push (["ifile.it", /IFILE\.IT\/\w+/, /Request Download Ticket/gi, /file not found/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["kewlshare.com", "KEWLSHARE\.COM", /file name \:/gi, "" ]);
hosts.push (["letitbit.net", /LETITBIT\.NET\/DOWNLOAD/gi, /Download file|Die Dateien herunterladen|download3\.php/gi, /The requested file was not found|Gesuchte Datei wurde nicht gefunden/gi, /[\d.]+ [KM]b/ ]);
hosts.push (["mediafire.com", /MEDIAFIRE\.COM\/(?:download.php)?\?/gi, /Loading files...|Click here to start download|you requested|authorize_download\.gif/gi, /Invalid File|media fire is the simplest|0 items found/i, /[\d.]+ [KM]B/ ]);
hosts.push (["megashare.com", /MEGASHARE\.COM\/\d+/gi, /Select your download|Download Your File|Click here to download/, "" ]);
hosts.push (["megashares.com", /MEGASHARES\.COM\//gi, /Your Download Passport is|enter the passport/gi, /All download slots for this link are currently filled|Please try again momentarily/gi ]);
hosts.push (["megaupload.com", /MEGAUPLOAD\.COM\/[\w\/]*\?/gi, /but_dnld_file_o\.gif|\/gui\/c_dnl\.gif|gui\/c_dnl\.swf|gui\/h\_folders\.gif|name\=\"imagestring\"|but_dnld_file_o.gif|uploaded with File Uploader/gi, /Enlace no vÃ¡lido|archivo ha sido borrado/, /[\d.]+ [KM]B/ ]);
hosts.push (["megavideo.com", /MEGAVIDEO\.COM\/\?/gi, /id=\"playertd\"/gi, /Este video no estÃ¡ disponible/gi, "" ]);
hosts.push (["netload.in", /NETLOAD\.IN\/DATE/gi, /header_login_background\.gif|dl_first_bg\.jpg/gi, /we don\'t host|achtung\.jpg/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["rapidshare.de", /RAPIDSHARE\.DE\/FILES/gi, /Choose download-type/, "" ]);
hosts.push (["rapidshare.com", /RAPIDSHARE\.COM\/FILES/gi, "", "" ]);
hosts.push (["rapidspread.com", /http\:\/\/www\.rapidspread\.com/, /You have requested the file:/gi, "" ]);
hosts.push (["rghost.ru", /RGHOST\.RU\/[\d]+/gi, /Downloaded/, /Ð¾Ð±Ð¼ÐµÐ½ Ñ„Ð°Ð¹Ð»Ð°Ð¼Ð¸|ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹ Ð½Ðµ ÑÑƒÑ‰ÐµÑÑ‚Ð²ÑƒÐµÑ‚/, /[\d.]+ [KM]B/ ]);
hosts.push (["rokzoo.com", /http:\/\/www\.rokzoo\.com/gi, "", /page not found/gi ]);
hosts.push (["secured.in", /SECURED\.IN\/DOWNLOAD/gi, /proceedToTheDownloadLinks/gi, /submitDownloadID/gi ]);
hosts.push (["sendspace.com", /SENDSPACE\.COM\//gi, /Download Link:/gi, /requested is not available/gi, /[\d.]+[KM]B/ ]);
hosts.push (["share-online.biz", /SHARE-ONLINE\.BIZ\/DOWNLOAD/gi, /Start Highspeed Download|Highspeed Download starten/gi, "", /[\d.]+ [KM]B/ ]);
hosts.push (["sharebase.com", /SHAREBASE\.TO\/FILES/gi, /Download:/gi, "", /[\d.]+ [KM]B/ ]);
hosts.push (["sharebee.to", /SHAREBEE\.COM\/[\w]+/gi, /Filename:/gi, /Requested url is not found/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["sharesimple.net", /SHARESIMPLE\.NET\/EN\/DOWNLOAD/gi, /value=Submit/gi, /Your requested file is not found/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["sharingmatrix.com", /http:\/\/sharingmatrix\.com/gi, /Select your download mode/gi, "" ]);
hosts.push (["speedshare.org", /SPEEDSHARE\.ORG\/DOWNLOAD/gi, /You have requested|Sie haben/gi, /Error!!!/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["sms4file.com", /SMS4FILE\.COM\/DOWNLOADVIP/gi, /To download this file you should buy account/gi, /File not found/gi, /[\d.]+ [KM]b/ ]);
hosts.push (["storage.to", /http:\/\/www\.storage\.to/gi, /Download Type/gi, /File not found/gi ]);
hosts.push (["teradepot.com", /http:\/\/www\.teradepot\.com/gi, /download_submit_buttons/gi, "" ]);
hosts.push (["transferbigfiles.com", /TRANSFERBIGFILES\.COM\/GET/gi, /doPostBack/gi, /class='ExpiredFile'|Invalid Transfer ID/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["ugotfile.com",/http:\/\/ugotfile\.com/gi, /Forum Code/gi, "" ]); 
hosts.push (["upit.to", /UPIT\.TO\/FILE/gi, /Start download!/gi, /Your requested file is not found/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["uploadbox.com", /UPLOADBOX\.COM\/FILES/gi, /Download as Premium|Premium Download|File name:|title="Download for free"/gi, /class="not_found"/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["uploading.com", /UPLOADING\.COM\/FILES/gi, /ico_download_file\.jpg|\/images\/speed\.jpg|class=\"downloadbutton\"|is already downloading|getElementById\(\'downloadform\'|value="Download file"|Descargar Archivo/gi, /temporarily unavailable|FILE REMOVED|Requested file not found/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["uploaded.to", /UPLOADED\.TO\/(?:\?ID|FILE)/gi, /Filename:/gi, /File doesn't exist|Download failed!/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["vip-file.com", /VIP-FILE\.COM\/DOWNLOAD/gi, /File Name:|Or download with Very Slow Speed/gi, /File \<b\>\<\/b\> not found|This file not found/gi, /[\d.]+ [KM]b/ ]);
hosts.push (["xlice.net", /XLICE\.NET\/DOWNLOAD/gi, /File name:/gi, /At this time no downloadmirrors are available/, /[\d.]+ [KM]B/ ]);
hosts.push (["xtraupload.de", /XTRAUPLOAD\.DE\/\?/gi, /File name:/gi, "", /[\d.]+ [KM]B/ ]);
hosts.push (["yabadaba.ru", /YABADABA\.RU\/FILES/gi, /ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÑÑ‹Ð»ÐºÑƒ Ð´Ð»Ñ ÑÐºÐ°Ñ‡Ð¸Ð²Ð°Ð½Ð¸Ñ!/gi, "" ]);
hosts.push (["yastorage.com", /YASTORAGE\.COM\/DOWNLOAD/gi, /ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÑÑ‹Ð»ÐºÑƒ Ð´Ð»Ñ ÑÐºÐ°Ñ‡Ð¸Ð²Ð°Ð½Ð¸Ñ!/gi, "" ]);
hosts.push (["youload.to", /YOULOAD\.TO\/DOWNLOAD/gi, /download\.png/gi, /class="error_message"/gi, /\([\d.]+ [KM]B\)/ ]);
hosts.push (["ziddu.com", /WWW\.ZIDDU\.COM\/DOWNLOAD/gi, /\/images\/download-download-img\.gif|downloadfilelinkicon|value="Download"|value="Descargar"/gi, /File not found/gi, /[\d.]+ [KM]B/ ]);
hosts.push (["zshare.net", /ZSHARE\.NET\/DOWNLOAD/gi, /last download/gi, /file not found/gi, /[\d.]+[KM]B/ ]);
hosts.push (["lix.in", /HTTP:\/\/LIX\.IN\/[\w-]+/gi, /value="submit"/gi, "" ]);

////== Imagenes ==////

GM_addStyle('#link_vivo font{display:inline-block;font-size:11px;padding:1px 5px 3px 7px !important;background-color:#90ee90 !important;background:#90ee90;-moz-border-radius:5px;margin:3px!important}'+
'#link_vivo font span{padding:1px 4px;background:rgba(255, 255, 255, 0.4) !important;-moz-border-radius:5px}'+
'#link_vivo font img{margin-left:5px;position:relative;top:2px;}'+
'#link_muerto font{display:inline-block;color:#fff!important;font-size:11px;padding:0px 5px 0px 7px !important;background:#a00!important;-moz-border-radius:5px;margin:3px!important;min-height:18px !important;}'+
'#link_muerto font img{float:right;margin-left:5px;position:relative;top:1px;}'+
'#link_vivo:hover,#link_muerto:hover{text-decoration:none!important;}'+
'#link_muerto br{display:none}')

verificar_links();

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++){
	var urll = unescape(links[i].href.replace(/\+/g, ' '));
	urll = urll.replace(/\?killcode=[\d]*/gi,'');
	if (urll.search(RegExp('Javascript:|' + location.hostname + '|^$','gi')) == -1) {
			links[i].href = unescape(links[i].href.replace(/\+/g, ' ')).replace(/^[\s]*/,'').replace(/[\s]*$/,'').replace(redirectores2_regex, '').replace(/^\s*|\s*^$/g, '');
			if (links[i].href.search(redirectores_regex) != -1){
				mostrar_estado(urll, "REDIR");
			} else {
				if (links[i].href.search(todos_rapidshare_regex) != -1){
					var urll = links[i].href;
					numerodelinksRS++;
					urll = urll.replace(/^.*?http:\/\/rapidshare/gi,'http://rapidshare');
					urll = urll.replace(/^.*?http%3A%2F%2Frapidshare/gi,'http://rapidshare');
					urll = urll.replace(/\?killcode=[\d]*/gi,'');
					urll = urll.replace(/%2F/gi,'/');
					urll = urll.replace(/%3A/gi,':');
					var cadena = ''+numerodelinksRS+'';
					if (cadena.search(/\d00/) != -1){
						todos.push('xxxczxczxcsasdasdasdx4234');
					}
						todos.push(urll);
				} else {
					for (var ii = 0; ii < hosts.length; ii++){
						if (links[i].href.search(hosts[ii][1]) != -1) {
							otros_links.push(urll);
							otros_links_cant = otros_links_cant + 1;
							otros_vivos.push(hosts[ii][2]);
							otros_muertos.push(hosts[ii][3]);
							otros_peso.push(hosts[ii][4]);
							break;
						} else {
							if (ii == hosts.length - 1)
								comprueba_extension(links[i].href);
						}
					}
				}
			}
	}
}
todos = todos.join();
todos = todos.replace(/,/gi,'\n');
var todos=todos.split("xxxczxczxcsasdasdasdx4234");
if (numerodelinksRS > 0){
	validar_links_rs(todos);
}

verificar_otros_links(otros_links);


////== Funciones link checker ==////

function validar_links_rs(todos){
	for (var i = todos.length - 1; i >= 0; i--) {
		GM_xmlhttpRequest({
			method: "POST",
			url: 'http://rapidshare.com/cgi-bin/checkfiles.cgi',
			headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
			data:'urls='+encodeURIComponent(todos[i]),
			onload:function(resultado) {
				res=resultado.responseText;
				noencontrado = res.match(/inexistent<\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/g);
				linkvivo = res.match(/load<\/a><\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/g);
				if (noencontrado){
					var linksnoencontrados = new Array();   
					for (var i = noencontrado.length - 1; i >= 0; i--) {
						var string=noencontrado[i];
						var regex = /inexistent<\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/;
						matchArray=string.match(regex);
						linksnoencontrados.push(matchArray[1]);
					}
					if (linksnoencontrados){
						MostrarLinksBorrados(linksnoencontrados);
					}
				}
				if (linkvivo){
					var linksvivos = new Array();   
					for (var i = linkvivo.length - 1; i >= 0; i--) {
						var string=linkvivo[i];
						var regex2 = /load<\/a><\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/;
						matchArraylive=string.match(regex2);
						linksvivos.push(matchArraylive[1]);
					}
					if (linksvivos){
						MostrarLinksVivos(linksvivos);
					}
				}
			}
		});
	}
}
function MostrarLinksBorrados(linksnoencontrados){
	var xpathlinksnoencontrados = "//a[contains(@href,\'" + linksnoencontrados.join('\') or contains(@href,\'') +"\')]";
	var todosLinks, esteLink;
	todosLinks = document.evaluate( xpathlinksnoencontrados, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < todosLinks.snapshotLength; i++) {
			var esteLink = todosLinks.snapshotItem(i);
			mostrar_estado(esteLink.href,"MUERTO");
	}
}
function MostrarLinksVivos(linksvivos){
	var xpathlinksvivos = "//a[contains(@href,\'" + linksvivos.join('\') or contains(@href,\'') +"\')]";
	var todosLinksvivos, esteLink;
	todosLinksvivos = document.evaluate( xpathlinksvivos, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < todosLinksvivos.snapshotLength; i++) {
			var esteLink = todosLinksvivos.snapshotItem(i);
			mostrar_estado(esteLink.href,"VIVO");
	}
}
function verificar_otros_links(otros_links){
	for (var i = 0; i < otros_links.length; i++){
		var archivo_vivo = otros_vivos[i];
		var archivo_muerto = otros_muertos[i];
		var archivo_peso = otros_peso[i];
		var URL = otros_links[i];
		var ret = otros_links_get(URL, archivo_vivo, archivo_muerto, archivo_peso);
	}
}
function otros_links_get(URL, archivo_vivo, archivo_muerto, archivo_peso){
	GM_xmlhttpRequest({
		method: 'GET',
		url: URL,
		headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', }, 
		onload: function(resultado){
			if (resultado.status == 200) {
				if (resultado.responseText.search(archivo_muerto) != -1 && archivo_muerto != ""){
					mostrar_estado(URL, "MUERTO");
				} else {
					if (resultado.responseText.search(archivo_vivo) == -1) {
						mostrar_estado(URL, "MUERTO");
					} else {
						if (archivo_peso != '') {
							var TAM = resultado.responseText.match(archivo_peso);
						}
						mostrar_estado(URL, "VIVO", TAM);
					}
				}
			} else {
				mostrar_estado(URL, "NODISP", TAM);
			}
		},
		onerror: function(resultado){
			mostrar_estado(URL, "NODISP");
		}
	});
}
function comprueba_extension(URL) {
	URL2 = unescape(URL.replace(/\+/g,  " "));
	extensiones_permitidas = new Array(".rar", ".zip", ".exe", ".pdf", ".doc", ".mp3");
	empiezo = URL2.lastIndexOf(".");
	extension = URL2.substring(empiezo,empiezo+5).replace(/\s/g,'').toLowerCase();
	permitida = false;
	for (var i = 0; i < extensiones_permitidas.length; i++) {
		if (extensiones_permitidas[i] == extension) {
			permitida = true;
			break;
		}
	}
	if (permitida) otros_links_directos(URL);
}
function otros_links_directos(URL){
	GM_xmlhttpRequest({
		method: 'HEAD',
		url: URL,
		headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', }, 
		onload: function(resultado){
			if(resultado.responseHeaders == '')
				mostrar_estado(URL, "MUERTO");
			else
				mostrar_estado(URL, "VIVO");
		},
		onerror: function(resultado){
				mostrar_estado(URL, "NODISP");
		}
	});
}
function mostrar_estado(URL, uTipo, kb){
	var bgc = "";
	var lnk = "";
	var tit = "";
	switch(uTipo){
		case "MUERTO":
			lnk = 'link_muerto';
			tit = 'El link estÃ¡ muerto o desactivado';
			break;
		case "NODISP":
			lnk = 'link_inaxesible';
			tit = 'La pÃ¡gina esta inaxesible';
			break;
		case "VIVO":
			lnk = 'link_vivo';
			tit = 'El link de descarga funciona correctamente';
			break;
		case "REDIR":
			lnk = 'link_redirector';
			tit = 'Redirector. Imposible de verificar estado del link';
			break;
		default:
			break;
	}
	var xpathotroslinks = "//a[contains(@href,\'"+URL+"\')]";
	var todosLinks;
	todosLinks = document.evaluate( xpathotroslinks, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < todosLinks.snapshotLength; i++) {
		var esteLink = todosLinks.snapshotItem(i);
		if(esteLink.id != lnk) {
			esteLink.id = lnk;
			esteLink.title = tit;
			if (kb != undefined) {
				kb = kb[0].toUpperCase().replace(/,/gi, '.');
				var kb1 = /[\d.]+/.exec(kb);
				var kb2 = /[KM]B/.exec(kb);
				if (esteLink.innerHTML.replace(/^\s*|\s*^$/g, '').indexOf(unescape(esteLink.href.replace(/\+/g, ' '))) != -1) {
					esteLink.innerHTML = '<font><span>'+kb1+' '+kb2+'</span> '+unescape(esteLink.href.replace(/\+/g, ' '))+'<img src="'+img+'tick.png"></font>';
				} else {
					esteLink.innerHTML = '<b>'+esteLink.innerHTML+'</b> > <font><span>'+kb1+' '+kb2+'</span> '+unescape(esteLink.href.replace(/\+/g, ' '))+'<img src="'+img+'tick.png"></font>';
				}
			} else {
				if (esteLink.innerHTML.replace(/^\s*|\s*^$/g, '').indexOf(unescape(esteLink.href.replace(/\+/g, ' '))) != -1) {
					esteLink.innerHTML = '<font>'+unescape(esteLink.href.replace(/\+/g, ' '))+'<img src="'+img+'muerto.png"></font>';
				} else {
					esteLink.innerHTML = '<b>'+esteLink.innerHTML+'</b> > <font>'+unescape(esteLink.href.replace(/\+/g, ' '))+'<img src="'+img+'muerto.png"></font>';
				}
			}
		}
	}
}
function verificar_links(){
	try{
		var regex = /((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
		var regex_excluir = /http:\/\/uploading\.com|http:\/\/letitbit.net|http:\/\/www.gshare\.com/gi;
		var regex_fin = /\.rar\.html\b/gi;
		var TextoAlt, tekst, muligtLink;
		var Tags = ['a', 'span', 'head', 'script', 'style', 'textarea', 'title', 'option', 'code'];
		var path = "//.post-contenido a";
		TextoAlt = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i=0;i<TextoAlt.snapshotLength;i++){
			tekst = TextoAlt.snapshotItem(i);
			muligtLink = tekst.nodeValue;
			if(regex.test(muligtLink)){
				var span = document.createElement('span');
				var ultimoencontrado = 0;
				regex.lastIndex = 0;
				for(vector = null; vector = regex.exec(muligtLink); ){
					var link = vector[0];
					span.appendChild(document.createTextNode(muligtLink.substring(ultimoencontrado, vector.index)));
					var href = link;

					href = href.replace(/^[\s]*/, '');
					if (href.search(/^(?:https?|ftp):\/\//) == -1 && href.search("@") == -1){
						href = 'http://'+href;
					}
					
					//Arreglar links que terminan en .rar.html
					if (href.search(regex_excluir) == -1){
						if (href.search(regex_fin) != -1){
							href = href.substr(0, href.length - 5);
						}
					}
					var a = document.createElement('a');
					a.setAttribute('href', href);
					a.setAttribute('target', '_blank');
					a.appendChild(document.createTextNode(href));
					span.appendChild(a);
					ultimoencontrado = regex.lastIndex;
				}
				span.appendChild(document.createTextNode(muligtLink.substring(ultimoencontrado)));
				tekst.parentNode.replaceChild(span, tekst);
			}
		}
	} catch(e){}
}

}

////== Actualizar script ==////
$(document).ready(function(){
$.ajax({
  type: "GET",
  url: "http://www.clanpirata.com.ar/perfil/Abel",
  success: function(html){
    var ee = $(html).find('.categoriaPost:eq(0) a').html().split('-')[1]
	if(ee > ultver){
	$('.userInfoLogin ul').prepend('<li><a href="http://userscripts.org/scripts/source/63704.user.js" style="height:20px" title="Hay una nueva version" alt="Hay una nueva version"><img src="'+img+'refresh.png"></a></li>')
	}
	if(ee = ultver){
	 $.ajax({
      type: "POST",
	  url: "http://www.clanpirata.com.ar/perfil/Abel",
	  success: function(html){
	    var ee = $(html).find('.categoriaPost:eq(0) a').html().split('-')[1]
		if(ee > ultver){
		  $('.userInfoLogin ul').prepend('<li><a href="http://userscripts.org/scripts/source/63704.user.js" style="height:20px" title="Hay una nueva version" alt="Hay una nueva version"><img src="'+img+'refresh.png"></a></li>')
	    }
      }
     });
	}
  }
});
})

////== Chat ==////
$(".tabsMenu div").before('<li class="heres"><a href="http://www.clanpirata.com.ar/posts/2/" title="Chat!">Chat</a></li>');
if(loc == 'chat') {
$(".tabsMenu .here").replaceWith('<li><a href="/" title="Inicio">Inicio</a></li>');
$(".heres").replaceWith('<li class="here"><a href="http://www.clanpirata.com.ar/posts/2/" title="Chat!">Chat</a></li>');
$(".post-deleted").before('<div id="ban-users" style="display:none"></div>')
if(user != null){
$('#ban-users').load('http://www.clanpirata.com.ar/comunidades/ .temaCont b div',function(){


var banusers = $('#ban-users div').html().split(', ');
var estatus = 'ok';

for (var i = 0; i < banusers.length; i++) {
    if(banusers[i] == user) {
		estatus = 'baneado';
		$('#ban-users div').remove()
	}
}

if(estatus == 'baneado'){ $(".post-deleted").html('<div id="error-chat"><span>Error:</span> Baneado indefinidamente del chat.</div>') }
else{ $(document).ready(function(){$(".post-deleted").html('<div id="chat"><iframe id="ichat" frameborder="0" width="940" height="400" src="http://www6.cbox.ws/box/?boxid=10708&amp;boxtag=wf731w&amp;sec=main" marginheight="2" marginwidth="2" scrolling="auto" allowtransparency="yes" name="cboxmain" style="border:#FFFFFF 1px solid;" id="cboxmain"></iframe><br class="space" /><hr class="divider"><br class="space" /><form name="cbox" target="cboxmain" action="http://www6.cbox.ws/box/index.php?boxid=10708&boxtag=wf731w&sec=submit" method="post" class="cfrm" onsubmit="return do_post();"><input type="hidden" name="key" value=""><input type="hidden" name="eml" value="http://www.clanpirata.com.ar/perfil/'+user+'"><input type="hidden" name="nme" value="'+user+'"><center><table border="0" cellpadding="0" cellspacing="0" width="936"><tr><td width="20"><a href="http://www6.cbox.ws/box/index.php?boxid=10708&boxtag=wf731w&sec=main" target="cboxmain" onclick="return do_refresh();" id="rf"><span class="systemicons actualizar"></span></a></td><td><input type="text" maxlength="1000" name="pst" autocomplete="off" size="9" value="" style="width:100%;" id="mct"></td><td width="50"><input id="ect" type="submit" value="Enviar" name="sub" class="button" style="margin-left:13px !important;padding:3px;"></form></td></tr></table></center></div>');})}


})}
else{ $(".post-deleted").html('<div id="error-chat"><span>Error:</span> Debes conectarte para poder ver el chat.</div>') }


$('#ect').click(function(){$('#mct').val('')})
$("#mask").html('<style>.post-deleted{background:url() !important;margin:0px !important}#error-chat{background:#eee;padding:15px;width:300px;text-align:center;margin:50px auto 0 auto;-moz-border-radius:7px;border:1px solid #ddd}#error-chat span{color:#f00;font-weight:bold;margin-right:10px;}</style>');
}

////== Tinypic ==////
if(loc == 'edicion') {
$('.container250 .para_un_buen_post').html("Cargar una imagen en tinypic")
$('.container250 .box_cuerpo').html('')
$('.container250 .box_cuerpo:first').attr('id','tinypicbox')
$(document).ready(function(){
$('.container250 .box_cuerpo:first').html("<iframe width='254' height='270' frameborder='0' scrolling='no' src='http://plugin.tinypic.com/plugin/index.php?popts=l,narrow|t,images|c,forum|i,es|s,false'></iframe><br><br>")
})
GM_addStyle('.container250{width:254px !important;}.container250 #tinypicbox{padding:0px !important;}#post_agregar{position:relative;left:10px;padding:0px !important;}')

$('input[value="Previsualizar"]').after(' <input class="button" onclick="document.forms.newpost.submit()" value="Postear" title="Postear" type="button">')

}

if(locc[1] == 'plugin'){
if(dir == 'http://plugin.tinypic.com/plugin/details.php'){
var imgid = $('.full-size img').attr('src').split('_')[0]
$('#direct-link').val('[img='+imgid+'.jpg]')

$('#direct-link').after('<a href="http://plugin.tinypic.com/plugin/index.php?popts=l,narrow|t,images|c,forum|i,es|s,false" title="Cargar" id="upoimg">&laquo; Cargar otra foto</a>')
}
GM_addStyle('.narrow #header,.narrow #footer,.narrow .zoom{display:none !important;}.full-view{width:100% !important;text-align:center;}.narrow .full-size img{width:auto !important;}'+
'.narrow .full-size{display:inline-block;}#direct-link{width:225px !important;text-align:center;}iframe{width:100%!important;}#upoimg{float:right;position:relative;top:5px;right:7px;color:#000!important;text-decoration:none!important;}'+
'#post_agregar{position:relative;left:10px;padding:0px !important;}.narrow{background:#e7e7e7 !important;}label[for="direct-link"]{font-size:10px !important;margin:0 0 4px 0 !important;}')

}

////== Borradores ==////
if(loc == 'edicion') {

GM_addStyle('#borradores-box * span{display:inline-block;background:url('+img+'close-icon.png);margin:2px;padding:8px;float:right;}'+
'#borradores-box li{background:#d5d5d5;margin-bottom:4px;line-height:20px;padding:0 0 0 7px;-moz-border-radius:4px;cursor:pointer;text-shadow: #aaa 0 0 15px;}'+
'#borradores-box ul div{text-align:center;text-shadow: #aaa 0 0 15px;}')
var noborr = '<div>No tienes ningun borrador</div>'
$('.container250').append('<br class="space" /><div class="box_title"><div class="box_txt"> Borradores</div></div><div class="box_cuerpo" id="borradores-box"><ul></ul></div>')
$('input[value="Previsualizar"]').before(' <input class="button" value="Guardar" title="Guaradar" type="button" id="saveb"> ')


unsafeWindow.carpost = function(a) {
$('.titulo').val($(a).attr('1'))
$('.cuerpo').val($(a).attr('2'))
$('.tags').val($(a).attr('3'))
$('select.agregar').val($(a).attr('4'))
}


var borradores = GM_getValue('borradores')
if(borradores != null){ $('#borradores-box ul').html(borradores) } 
if(borradores == null || borradores == '') { $('#borradores-box ul').html(noborr) }

$('#saveb').click(function(){

var titulo = $('.titulo').val()
var contenido = $('.cuerpo').val()
var tags = $('.tags').val()
var categoria = $('select.agregar').val()

if(titulo == ''){ alert('Falta el titulo') }
else if (contenido == ''){ alert('El post esta vacio') }
else if (tags == ''){ alert('El post no tiene tags') }
else if (categoria == null){ alert('Falta la categoria') }
else {

var aa = $('li[1="'+titulo+'"]').length

if(aa == 1){ if(confirm('Ya hay un borrador con ese nombre desea reemplazarlo?')) {

$('#borradores-box ul li[1="'+titulo+'"]').replaceWith('<li 1="'+titulo+'" 2="'+contenido+'" 3="'+tags+'" 4="'+categoria+'" style="display:none" onclick="carpost(this)">'+titulo+'<span></span></li>')
$('#borradores-box ul li[1="'+titulo+'"]').slideDown('slow',function(){GM_setValue('borradores',$('#borradores-box ul').html());})

}} else{

if($('#borradores-box ul').html() == noborr){

$('#borradores-box ul').html('<li 1="'+titulo+'" 2="'+contenido+'" 3="'+tags+'" 4="'+categoria+'" style="display:none" onclick="carpost(this)">'+titulo+'<span></span></li>')
$('#borradores-box ul li[1="'+titulo+'"]').slideDown('slow',function(){GM_setValue('borradores',$('#borradores-box ul').html());})

} else {

$('#borradores-box ul').append('<li 1="'+titulo+'" 2="'+contenido+'" 3="'+tags+'" 4="'+categoria+'" style="display:none" onclick="carpost(this)">'+titulo+'<span></span></li>')
$('#borradores-box ul li[1="'+titulo+'"]').slideDown('slow',function(){GM_setValue('borradores',$('#borradores-box ul').html());})

}

}

}
})





$('#borradores-box ul * span').click(function(){

if(confirm('Realmente desea eliminar el borrador?')){

$(this).parent().slideUp('slow',function(){$(this).remove();GM_setValue('borradores',$('#borradores-box ul').html()); if($('#borradores-box ul').html() == ''){

$('#borradores-box ul').html(noborr)

}})}})

}


////== Otras funciones ==////

$('.post-relacionados li:odd').attr('style','float:right;margin-top:-22px;')
$('.txtData').after('<br>')
$(".misComunidades:first a").not('.rssP').attr('style','display:inline-block;width:284px;padding:0 5px 2px 10px;font-size:10px')
if($('.post-relacionados li').length == '0' ) {$('.post-relacionados').remove()}
if($(".misComunidades:first a").length == '1' ){$('.misComunidades:first').remove()}
if($(".misComunidades:last .photo_small").length == '0' ){$('.misComunidades:last').remove()}
if($('.lastPostsData li').length == '0' ) {$('.lastPostsData').remove()}
if($('.lastTopicsData li').length == '0' ) {$('.lastTopicsData').remove()}
$('#post_agregar .box_cuerpo br:gt(8)').attr('class','space')
$("#post_agregar .box_cuerpo b:eq(1),#post_agregar .box_cuerpo b:eq(4),#post_agregar .box_cuerpo br:eq(0),#post_agregar .box_cuerpo br:gt(3)").not('.space').remove()
$('a[href="javascript:openpopup()"],#emoticons,.form-container label:eq(1)').remove()
$('.tops_usuarios').html('Usuarios TOPs - <a href="/top/cat/-1" class="size9">(Ver más)</a>')

////== Funciones menu ==////

GM_registerMenuCommand("1 - Reportar Bug ", function() { GM_openInTab('http://www.clanpirata.com.ar/mensajes/para/Abel'); },null,null,"1");
GM_registerMenuCommand("2 - Comunidad del Script ", function() { GM_openInTab('http://www.clanpirata.com.ar/comunidades/clanpirata/'); },null,null,"2");
GM_registerMenuCommand("3 - Cambiarle el color a Clan Pirata ", function() { setColours() },null,null,"3");


GM_addStyle(eval(GM_getValue("setup",'({fondo:"#f0f0f0", tcolor:"#6d84b4", top:"", tophover:"" })')));


if(loc == 'mensajes'){return false}
if(locc[1] != 'comentarios') {
if(loc != 'comunidades'){
for (var i = 0; i < $('.box_title').size(); i++) { $(".box_title:eq("+i+"),.box_cuerpo:eq("+i+")").wrapAll('<div class="boxes"></div>'); }
$('#centro .boxes:last').remove()
}
}