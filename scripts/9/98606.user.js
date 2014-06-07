// ==UserScript==
// @name                      special
// ==/UserScript==


var core_vers=107;
var AssetsDBVersion=1;
var currenttime =new Date();var bench=node('div','benchid','noclass','position:absolute;top:2px;left:2px;color:black;font-size:9px','0' );document.getElementById('GF_toolbar').appendChild(bench);
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();
jQuery.ui||(function(c){var i=c.fn.remove,d=c.browser.mozilla&&(parseFloat(c.browser.version)<1.9);c.ui={version:"1.7.2",plugin:{add:function(k,l,n){var m=c.ui[k].prototype;for(var j in n){m.plugins[j]=m.plugins[j]||[];m.plugins[j].push([l,n[j]])}},call:function(j,l,k){var n=j.plugins[l];if(!n||!j.element[0].parentNode){return}for(var m=0;m<n.length;m++){if(j.options[n[m][0]]){n[m][1].apply(j.element,k)}}}},contains:function(k,j){return document.compareDocumentPosition?k.compareDocumentPosition(j)&16:k!==j&&k.contains(j)},hasScroll:function(m,k){if(c(m).css("overflow")=="hidden"){return false}var j=(k&&k=="left")?"scrollLeft":"scrollTop",l=false;if(m[j]>0){return true}m[j]=1;l=(m[j]>0);m[j]=0;return l},isOverAxis:function(k,j,l){return(k>j)&&(k<(j+l))},isOver:function(o,k,n,m,j,l){return c.ui.isOverAxis(o,n,j)&&c.ui.isOverAxis(k,m,l)},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};if(d){var f=c.attr,e=c.fn.removeAttr,h="http://www.w3.org/2005/07/aaa",a=/^aria-/,b=/^wairole:/;c.attr=function(k,j,l){var m=l!==undefined;return(j=="role"?(m?f.call(this,k,j,"wairole:"+l):(f.apply(this,arguments)||"").replace(b,"")):(a.test(j)?(m?k.setAttributeNS(h,j.replace(a,"aaa:"),l):f.call(this,k,j.replace(a,"aaa:"))):f.apply(this,arguments)))};c.fn.removeAttr=function(j){return(a.test(j)?this.each(function(){this.removeAttributeNS(h,j.replace(a,""))}):e.call(this,j))}}c.fn.extend({remove:function(){c("*",this).add(this).each(function(){c(this).triggerHandler("remove")});return i.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false})},scrollParent:function(){var j;if((c.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){j=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(c.curCSS(this,"position",1))&&(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0)}else{j=this.parents().filter(function(){return(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0)}return(/fixed/).test(this.css("position"))||!j.length?c(document):j}});c.extend(c.expr[":"],{data:function(l,k,j){return !!c.data(l,j[3])},focusable:function(k){var l=k.nodeName.toLowerCase(),j=c.attr(k,"tabindex");return(/input|select|textarea|button|object/.test(l)?!k.disabled:"a"==l||"area"==l?k.href||!isNaN(j):!isNaN(j))&&!c(k)["area"==l?"parents":"closest"](":hidden").length},tabbable:function(k){var j=c.attr(k,"tabindex");return(isNaN(j)||j>=0)&&c(k).is(":focusable")}});function g(m,n,o,l){function k(q){var p=c[m][n][q]||[];return(typeof p=="string"?p.split(/,?\s+/):p)}var j=k("getter");if(l.length==1&&typeof l[0]=="string"){j=j.concat(k("getterSetter"))}return(c.inArray(o,j)!=-1)}c.widget=function(k,j){var l=k.split(".")[0];k=k.split(".")[1];c.fn[k]=function(p){var n=(typeof p=="string"),o=Array.prototype.slice.call(arguments,1);if(n&&p.substring(0,1)=="_"){return this}if(n&&g(l,k,p,o)){var m=c.data(this[0],k);return(m?m[p].apply(m,o):undefined)}return this.each(function(){var q=c.data(this,k);(!q&&!n&&c.data(this,k,new c[l][k](this,p))._init());(q&&n&&c.isFunction(q[p])&&q[p].apply(q,o))})};c[l]=c[l]||{};c[l][k]=function(o,n){var m=this;this.namespace=l;this.widgetName=k;this.widgetEventPrefix=c[l][k].eventPrefix||k;this.widgetBaseClass=l+"-"+k;this.options=c.extend({},c.widget.defaults,c[l][k].defaults,c.metadata&&c.metadata.get(o)[k],n);this.element=c(o).bind("setData."+k,function(q,p,r){if(q.target==o){return m._setData(p,r)}}).bind("getData."+k,function(q,p){if(q.target==o){return m._getData(p)}}).bind("remove",function(){return m.destroy()})};c[l][k].prototype=c.extend({},c.widget.prototype,j);c[l][k].getterSetter="option"};c.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").removeAttr("aria-disabled")},option:function(l,m){var k=l,j=this;if(typeof l=="string"){if(m===undefined){return this._getData(l)}k={};k[l]=m}c.each(k,function(n,o){j._setData(n,o)})},_getData:function(j){return this.options[j]},_setData:function(j,k){this.options[j]=k;if(j=="disabled"){this.element[k?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",k)}},enable:function(){this._setData("disabled",false)},disable:function(){this._setData("disabled",true)},_trigger:function(l,m,n){var p=this.options[l],j=(l==this.widgetEventPrefix?l:this.widgetEventPrefix+l);m=c.Event(m);m.type=j;if(m.originalEvent){for(var k=c.event.props.length,o;k;){o=c.event.props[--k];m[o]=m.originalEvent[o]}}this.element.trigger(m,n);return !(c.isFunction(p)&&p.call(this.element[0],m,n)===false||m.isDefaultPrevented())}};c.widget.defaults={disabled:false};c.ui.mouse={_mouseInit:function(){var j=this;this.element.bind("mousedown."+this.widgetName,function(k){return j._mouseDown(k)}).bind("click."+this.widgetName,function(k){if(j._preventClickEvent){j._preventClickEvent=false;k.stopImmediatePropagation();return false}});if(c.browser.msie){this._mouseUnselectable=this.element.attr("unselectable");this.element.attr("unselectable","on")}this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);(c.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))},_mouseDown:function(l){l.originalEvent=l.originalEvent||{};if(l.originalEvent.mouseHandled){return}(this._mouseStarted&&this._mouseUp(l));this._mouseDownEvent=l;var k=this,m=(l.which==1),j=(typeof this.options.cancel=="string"?c(l.target).parents().add(l.target).filter(this.options.cancel).length:false);if(!m||j||!this._mouseCapture(l)){return true}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){k.mouseDelayMet=true},this.options.delay)}if(this._mouseDistanceMet(l)&&this._mouseDelayMet(l)){this._mouseStarted=(this._mouseStart(l)!==false);if(!this._mouseStarted){l.preventDefault();return true}}this._mouseMoveDelegate=function(n){return k._mouseMove(n)};this._mouseUpDelegate=function(n){return k._mouseUp(n)};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);(c.browser.safari||l.preventDefault());l.originalEvent.mouseHandled=true;return true},_mouseMove:function(j){if(c.browser.msie&&!j.button){return this._mouseUp(j)}if(this._mouseStarted){this._mouseDrag(j);return j.preventDefault()}if(this._mouseDistanceMet(j)&&this._mouseDelayMet(j)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,j)!==false);(this._mouseStarted?this._mouseDrag(j):this._mouseUp(j))}return !this._mouseStarted},_mouseUp:function(j){c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=(j.target==this._mouseDownEvent.target);this._mouseStop(j)}return false},_mouseDistanceMet:function(j){return(Math.max(Math.abs(this._mouseDownEvent.pageX-j.pageX),Math.abs(this._mouseDownEvent.pageY-j.pageY))>=this.options.distance)},_mouseDelayMet:function(j){return this.mouseDelayMet},_mouseStart:function(j){},_mouseDrag:function(j){},_mouseStop:function(j){},_mouseCapture:function(j){return true}};c.ui.mouse.defaults={cancel:null,distance:1,delay:0}})(jQuery);;
(function(a){a.widget("ui.draggable",a.extend({},a.ui.mouse,{_init:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"}(this.options.addClasses&&this.element.addClass("ui-draggable"));(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));this._mouseInit()},destroy:function(){if(!this.element.data("draggable")){return}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy()},_mouseCapture:function(b){var c=this.options;if(this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")){return false}this.handle=this._getHandle(b);if(!this.handle){return false}return true},_mouseStart:function(b){var c=this.options;this.helper=this._createHelper(b);this._cacheHelperProportions();if(a.ui.ddmanager){a.ui.ddmanager.current=this}this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(b);this.originalPageX=b.pageX;this.originalPageY=b.pageY;if(c.cursorAt){this._adjustOffsetFromHelper(c.cursorAt)}if(c.containment){this._setContainment()}this._trigger("start",b);this._cacheHelperProportions();if(a.ui.ddmanager&&!c.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,b)}this.helper.addClass("ui-draggable-dragging");this._mouseDrag(b,true);return true},_mouseDrag:function(b,d){this.position=this._generatePosition(b);this.positionAbs=this._convertPositionTo("absolute");if(!d){var c=this._uiHash();this._trigger("drag",b,c);this.position=c.position}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"}if(a.ui.ddmanager){a.ui.ddmanager.drag(this,b)}return false},_mouseStop:function(c){var d=false;if(a.ui.ddmanager&&!this.options.dropBehaviour){d=a.ui.ddmanager.drop(this,c)}if(this.dropped){d=this.dropped;this.dropped=false}if((this.options.revert=="invalid"&&!d)||(this.options.revert=="valid"&&d)||this.options.revert===true||(a.isFunction(this.options.revert)&&this.options.revert.call(this.element,d))){var b=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){b._trigger("stop",c);b._clear()})}else{this._trigger("stop",c);this._clear()}return false},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?true:false;a(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==b.target){c=true}});return c},_createHelper:function(c){var d=this.options;var b=a.isFunction(d.helper)?a(d.helper.apply(this.element[0],[c])):(d.helper=="clone"?this.element.clone():this.element);if(!b.parents("body").length){b.appendTo((d.appendTo=="parent"?this.element[0].parentNode:d.appendTo))}if(b[0]!=this.element[0]&&!(/(fixed|absolute)/).test(b.css("position"))){b.css("position","absolute")}return b},_adjustOffsetFromHelper:function(b){if(b.left!=undefined){this.offset.click.left=b.left+this.margins.left}if(b.right!=undefined){this.offset.click.left=this.helperProportions.width-b.right+this.margins.left}if(b.top!=undefined){this.offset.click.top=b.top+this.margins.top}if(b.bottom!=undefined){this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){b.left+=this.scrollParent.scrollLeft();b.top+=this.scrollParent.scrollTop()}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)){b={top:0,left:0}}return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var b=this.element.position();return{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else{return{top:0,left:0}}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e=this.options;if(e.containment=="parent"){e.containment=this.helper[0].parentNode}if(e.containment=="document"||e.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(e.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(e.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]}if(!(/^(document|window|parent)$/).test(e.containment)&&e.containment.constructor!=Array){var c=a(e.containment)[0];if(!c){return}var d=a(e.containment).offset();var b=(a(c).css("overflow")!="hidden");this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(b?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(b?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}else{if(e.containment.constructor==Array){this.containment=e.containment}}},_convertPositionTo:function(f,h){if(!h){h=this.position}var c=f=="absolute"?1:-1;var e=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=(/(html|body)/i).test(b[0].tagName);return{top:(h.top+this.offset.relative.top*c+this.offset.parent.top*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(g?0:b.scrollTop()))*c)),left:(h.left+this.offset.relative.left*c+this.offset.parent.left*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:b.scrollLeft())*c))}},_generatePosition:function(e){var h=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,i=(/(html|body)/i).test(b[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()}var d=e.pageX;var c=e.pageY;if(this.originalPosition){if(this.containment){if(e.pageX-this.offset.click.left<this.containment[0]){d=this.containment[0]+this.offset.click.left}if(e.pageY-this.offset.click.top<this.containment[1]){c=this.containment[1]+this.offset.click.top}if(e.pageX-this.offset.click.left>this.containment[2]){d=this.containment[2]+this.offset.click.left}if(e.pageY-this.offset.click.top>this.containment[3]){c=this.containment[3]+this.offset.click.top}}if(h.grid){var g=this.originalPageY+Math.round((c-this.originalPageY)/h.grid[1])*h.grid[1];c=this.containment?(!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:(!(g-this.offset.click.top<this.containment[1])?g-h.grid[1]:g+h.grid[1])):g;var f=this.originalPageX+Math.round((d-this.originalPageX)/h.grid[0])*h.grid[0];d=this.containment?(!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:(!(f-this.offset.click.left<this.containment[0])?f-h.grid[0]:f+h.grid[0])):f}}return{top:(c-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(i?0:b.scrollTop())))),left:(d-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:b.scrollLeft())))}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()}this.helper=null;this.cancelHelperRemoval=false},_trigger:function(b,c,d){d=d||this._uiHash();a.ui.plugin.call(this,b,[c,d]);if(b=="drag"){this.positionAbs=this._convertPositionTo("absolute")}return a.widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(b){return{helper:this.helper,position:this.position,absolutePosition:this.positionAbs,offset:this.positionAbs}}}));a.extend(a.ui.draggable,{version:"1.7.2",eventPrefix:"drag",defaults:{addClasses:true,appendTo:"parent",axis:false,cancel:":input,option",connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false}});a.ui.plugin.add("draggable","connectToSortable",{start:function(c,e){var d=a(this).data("draggable"),f=d.options,b=a.extend({},e,{item:d.element});d.sortables=[];a(f.connectToSortable).each(function(){var g=a.data(this,"sortable");if(g&&!g.options.disabled){d.sortables.push({instance:g,shouldRevert:g.options.revert});g._refreshItems();g._trigger("activate",c,b)}})},stop:function(c,e){var d=a(this).data("draggable"),b=a.extend({},e,{item:d.element});a.each(d.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;d.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert){this.instance.options.revert=true}this.instance._mouseStop(c);this.instance.options.helper=this.instance.options._helper;if(d.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})}}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",c,b)}})},drag:function(c,f){var e=a(this).data("draggable"),b=this;var d=function(i){var n=this.offset.click.top,m=this.offset.click.left;var g=this.positionAbs.top,k=this.positionAbs.left;var j=i.height,l=i.width;var p=i.top,h=i.left;return a.ui.isOver(g+n,k+m,p,h,j,l)};a.each(e.sortables,function(g){this.instance.positionAbs=e.positionAbs;this.instance.helperProportions=e.helperProportions;this.instance.offset.click=e.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=a(b).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return f.helper[0]};c.target=this.instance.currentItem[0];this.instance._mouseCapture(c,true);this.instance._mouseStart(c,true,true);this.instance.offset.click.top=e.offset.click.top;this.instance.offset.click.left=e.offset.click.left;this.instance.offset.parent.left-=e.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=e.offset.parent.top-this.instance.offset.parent.top;e._trigger("toSortable",c);e.dropped=this.instance.element;e.currentItem=e.element;this.instance.fromOutside=e}if(this.instance.currentItem){this.instance._mouseDrag(c)}}else{if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",c,this.instance._uiHash(this.instance));this.instance._mouseStop(c,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();if(this.instance.placeholder){this.instance.placeholder.remove()}e._trigger("fromSortable",c);e.dropped=false}}})}});a.ui.plugin.add("draggable","cursor",{start:function(c,d){var b=a("body"),e=a(this).data("draggable").options;if(b.css("cursor")){e._cursor=b.css("cursor")}b.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._cursor){a("body").css("cursor",d._cursor)}}});a.ui.plugin.add("draggable","iframeFix",{start:function(b,c){var d=a(this).data("draggable").options;a(d.iframeFix===true?"iframe":d.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(a(this).offset()).appendTo("body")})},stop:function(b,c){a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)})}});a.ui.plugin.add("draggable","opacity",{start:function(c,d){var b=a(d.helper),e=a(this).data("draggable").options;if(b.css("opacity")){e._opacity=b.css("opacity")}b.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._opacity){a(c.helper).css("opacity",d._opacity)}}});a.ui.plugin.add("draggable","scroll",{start:function(c,d){var b=a(this).data("draggable");if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){b.overflowOffset=b.scrollParent.offset()}},drag:function(d,e){var c=a(this).data("draggable"),f=c.options,b=false;if(c.scrollParent[0]!=document&&c.scrollParent[0].tagName!="HTML"){if(!f.axis||f.axis!="x"){if((c.overflowOffset.top+c.scrollParent[0].offsetHeight)-d.pageY<f.scrollSensitivity){c.scrollParent[0].scrollTop=b=c.scrollParent[0].scrollTop+f.scrollSpeed}else{if(d.pageY-c.overflowOffset.top<f.scrollSensitivity){c.scrollParent[0].scrollTop=b=c.scrollParent[0].scrollTop-f.scrollSpeed}}}if(!f.axis||f.axis!="y"){if((c.overflowOffset.left+c.scrollParent[0].offsetWidth)-d.pageX<f.scrollSensitivity){c.scrollParent[0].scrollLeft=b=c.scrollParent[0].scrollLeft+f.scrollSpeed}else{if(d.pageX-c.overflowOffset.left<f.scrollSensitivity){c.scrollParent[0].scrollLeft=b=c.scrollParent[0].scrollLeft-f.scrollSpeed}}}}else{if(!f.axis||f.axis!="x"){if(d.pageY-a(document).scrollTop()<f.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()-f.scrollSpeed)}else{if(a(window).height()-(d.pageY-a(document).scrollTop())<f.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()+f.scrollSpeed)}}}if(!f.axis||f.axis!="y"){if(d.pageX-a(document).scrollLeft()<f.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()-f.scrollSpeed)}else{if(a(window).width()-(d.pageX-a(document).scrollLeft())<f.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()+f.scrollSpeed)}}}}if(b!==false&&a.ui.ddmanager&&!f.dropBehaviour){a.ui.ddmanager.prepareOffsets(c,d)}}});a.ui.plugin.add("draggable","snap",{start:function(c,d){var b=a(this).data("draggable"),e=b.options;b.snapElements=[];a(e.snap.constructor!=String?(e.snap.items||":data(draggable)"):e.snap).each(function(){var g=a(this);var f=g.offset();if(this!=b.element[0]){b.snapElements.push({item:this,width:g.outerWidth(),height:g.outerHeight(),top:f.top,left:f.left})}})},drag:function(u,p){var g=a(this).data("draggable"),q=g.options;var y=q.snapTolerance;var x=p.offset.left,w=x+g.helperProportions.width,f=p.offset.top,e=f+g.helperProportions.height;for(var v=g.snapElements.length-1;v>=0;v--){var s=g.snapElements[v].left,n=s+g.snapElements[v].width,m=g.snapElements[v].top,A=m+g.snapElements[v].height;if(!((s-y<x&&x<n+y&&m-y<f&&f<A+y)||(s-y<x&&x<n+y&&m-y<e&&e<A+y)||(s-y<w&&w<n+y&&m-y<f&&f<A+y)||(s-y<w&&w<n+y&&m-y<e&&e<A+y))){if(g.snapElements[v].snapping){(g.options.snap.release&&g.options.snap.release.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))}g.snapElements[v].snapping=false;continue}if(q.snapMode!="inner"){var c=Math.abs(m-e)<=y;var z=Math.abs(A-f)<=y;var j=Math.abs(s-w)<=y;var k=Math.abs(n-x)<=y;if(c){p.position.top=g._convertPositionTo("relative",{top:m-g.helperProportions.height,left:0}).top-g.margins.top}if(z){p.position.top=g._convertPositionTo("relative",{top:A,left:0}).top-g.margins.top}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s-g.helperProportions.width}).left-g.margins.left}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n}).left-g.margins.left}}var h=(c||z||j||k);if(q.snapMode!="outer"){var c=Math.abs(m-f)<=y;var z=Math.abs(A-e)<=y;var j=Math.abs(s-x)<=y;var k=Math.abs(n-w)<=y;if(c){p.position.top=g._convertPositionTo("relative",{top:m,left:0}).top-g.margins.top}if(z){p.position.top=g._convertPositionTo("relative",{top:A-g.helperProportions.height,left:0}).top-g.margins.top}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s}).left-g.margins.left}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n-g.helperProportions.width}).left-g.margins.left}}if(!g.snapElements[v].snapping&&(c||z||j||k||h)){(g.options.snap.snap&&g.options.snap.snap.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))}g.snapElements[v].snapping=(c||z||j||k||h)}}});a.ui.plugin.add("draggable","stack",{start:function(b,c){var e=a(this).data("draggable").options;var d=a.makeArray(a(e.stack.group)).sort(function(g,f){return(parseInt(a(g).css("zIndex"),10)||e.stack.min)-(parseInt(a(f).css("zIndex"),10)||e.stack.min)});a(d).each(function(f){this.style.zIndex=e.stack.min+f});this[0].style.zIndex=e.stack.min+d.length}});a.ui.plugin.add("draggable","zIndex",{start:function(c,d){var b=a(d.helper),e=a(this).data("draggable").options;if(b.css("zIndex")){e._zIndex=b.css("zIndex")}b.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._zIndex){a(c.helper).css("zIndex",d._zIndex)}}})})(jQuery);;
(function(a){a.widget("ui.droppable",{_init:function(){var c=this.options,b=c.accept;this.isover=0;this.isout=1;this.options.accept=this.options.accept&&a.isFunction(this.options.accept)?this.options.accept:function(e){return e.is(b)};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};a.ui.ddmanager.droppables[this.options.scope]=a.ui.ddmanager.droppables[this.options.scope]||[];a.ui.ddmanager.droppables[this.options.scope].push(this);(this.options.addClasses&&this.element.addClass("ui-droppable"))},destroy:function(){var b=a.ui.ddmanager.droppables[this.options.scope];for(var c=0;c<b.length;c++){if(b[c]==this){b.splice(c,1)}}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable")},_setData:function(b,c){if(b=="accept"){this.options.accept=c&&a.isFunction(c)?c:function(e){return e.is(c)}}else{a.widget.prototype._setData.apply(this,arguments)}},_activate:function(c){var b=a.ui.ddmanager.current;if(this.options.activeClass){this.element.addClass(this.options.activeClass)}(b&&this._trigger("activate",c,this.ui(b)))},_deactivate:function(c){var b=a.ui.ddmanager.current;if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}(b&&this._trigger("deactivate",c,this.ui(b)))},_over:function(c){var b=a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0]){return}if(this.options.accept.call(this.element[0],(b.currentItem||b.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)}this._trigger("over",c,this.ui(b))}},_out:function(c){var b=a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0]){return}if(this.options.accept.call(this.element[0],(b.currentItem||b.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("out",c,this.ui(b))}},_drop:function(c,d){var b=d||a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0]){return false}var e=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var f=a.data(this,"droppable");if(f.options.greedy&&a.ui.intersect(b,a.extend(f,{offset:f.element.offset()}),f.options.tolerance)){e=true;return false}});if(e){return false}if(this.options.accept.call(this.element[0],(b.currentItem||b.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("drop",c,this.ui(b));return this.element}return false},ui:function(b){return{draggable:(b.currentItem||b.element),helper:b.helper,position:b.position,absolutePosition:b.positionAbs,offset:b.positionAbs}}});a.extend(a.ui.droppable,{version:"1.7.2",eventPrefix:"drop",defaults:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"}});a.ui.intersect=function(q,j,o){if(!j.offset){return false}var e=(q.positionAbs||q.position.absolute).left,d=e+q.helperProportions.width,n=(q.positionAbs||q.position.absolute).top,m=n+q.helperProportions.height;var g=j.offset.left,c=g+j.proportions.width,p=j.offset.top,k=p+j.proportions.height;switch(o){case"fit":return(g<e&&d<c&&p<n&&m<k);break;case"intersect":return(g<e+(q.helperProportions.width/2)&&d-(q.helperProportions.width/2)<c&&p<n+(q.helperProportions.height/2)&&m-(q.helperProportions.height/2)<k);break;case"pointer":var h=((q.positionAbs||q.position.absolute).left+(q.clickOffset||q.offset.click).left),i=((q.positionAbs||q.position.absolute).top+(q.clickOffset||q.offset.click).top),f=a.ui.isOver(i,h,p,g,j.proportions.height,j.proportions.width);return f;break;case"touch":return((n>=p&&n<=k)||(m>=p&&m<=k)||(n<p&&m>k))&&((e>=g&&e<=c)||(d>=g&&d<=c)||(e<g&&d>c));break;default:return false;break}};a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,g){var b=a.ui.ddmanager.droppables[e.options.scope];var f=g?g.type:null;var h=(e.currentItem||e.element).find(":data(droppable)").andSelf();droppablesLoop:for(var d=0;d<b.length;d++){if(b[d].options.disabled||(e&&!b[d].options.accept.call(b[d].element[0],(e.currentItem||e.element)))){continue}for(var c=0;c<h.length;c++){if(h[c]==b[d].element[0]){b[d].proportions.height=0;continue droppablesLoop}}b[d].visible=b[d].element.css("display")!="none";if(!b[d].visible){continue}b[d].offset=b[d].element.offset();b[d].proportions={width:b[d].element[0].offsetWidth,height:b[d].element[0].offsetHeight};if(f=="mousedown"){b[d]._activate.call(b[d],g)}}},drop:function(b,c){var d=false;a.each(a.ui.ddmanager.droppables[b.options.scope],function(){if(!this.options){return}if(!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance)){d=this._drop.call(this,c)}if(!this.options.disabled&&this.visible&&this.options.accept.call(this.element[0],(b.currentItem||b.element))){this.isout=1;this.isover=0;this._deactivate.call(this,c)}});return d},drag:function(b,c){if(b.options.refreshPositions){a.ui.ddmanager.prepareOffsets(b,c)}a.each(a.ui.ddmanager.droppables[b.options.scope],function(){if(this.options.disabled||this.greedyChild||!this.visible){return}var e=a.ui.intersect(b,this,this.options.tolerance);var g=!e&&this.isover==1?"isout":(e&&this.isover==0?"isover":null);if(!g){return}var f;if(this.options.greedy){var d=this.element.parents(":data(droppable):eq(0)");if(d.length){f=a.data(d[0],"droppable");f.greedyChild=(g=="isover"?1:0)}}if(f&&g=="isover"){f.isover=0;f.isout=1;f._out.call(f,c)}this[g]=1;this[g=="isout"?"isover":"isout"]=0;this[g=="isover"?"_over":"_out"].call(this,c);if(f&&g=="isout"){f.isout=0;f.isover=1;f._over.call(f,c)}})}}})(jQuery);;
(function(c){c.widget("ui.resizable",c.extend({},c.ui.mouse,{_init:function(){var e=this,j=this.options;this.element.addClass("ui-resizable");c.extend(this,{_aspectRatio:!!(j.aspectRatio),aspectRatio:j.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:j.helper||j.ghost||j.animate?j.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){if(/relative/.test(this.element.css("position"))&&c.browser.opera){this.element.css({position:"relative",top:"auto",left:"auto"})}this.element.wrap(c('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=j.handles||(!c(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"}var k=this.handles.split(",");this.handles={};for(var f=0;f<k.length;f++){var h=c.trim(k[f]),d="ui-resizable-"+h;var g=c('<div class="ui-resizable-handle '+d+'"></div>');if(/sw|se|ne|nw/.test(h)){g.css({zIndex:++j.zIndex})}if("se"==h){g.addClass("ui-icon ui-icon-gripsmall-diagonal-se")}this.handles[h]=".ui-resizable-"+h;this.element.append(g)}}this._renderAxis=function(p){p=p||this.element;for(var m in this.handles){if(this.handles[m].constructor==String){this.handles[m]=c(this.handles[m],this.element).show()}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var n=c(this.handles[m],this.element),o=0;o=/sw|ne|nw|se|n|s/.test(m)?n.outerHeight():n.outerWidth();var l=["padding",/ne|nw|n/.test(m)?"Top":/se|sw|s/.test(m)?"Bottom":/^e$/.test(m)?"Right":"Left"].join("");p.css(l,o);this._proportionallyResize()}if(!c(this.handles[m]).length){continue}}};this._renderAxis(this.element);this._handles=c(".ui-resizable-handle",this.element).disableSelection();this._handles.mouseover(function(){if(!e.resizing){if(this.className){var i=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)}e.axis=i&&i[1]?i[1]:"se"}});if(j.autoHide){this._handles.hide();c(this.element).addClass("ui-resizable-autohide").hover(function(){c(this).removeClass("ui-resizable-autohide");e._handles.show()},function(){if(!e.resizing){c(this).addClass("ui-resizable-autohide");e._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var d=function(f){c(f).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){d(this.element);var e=this.element;e.parent().append(this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")})).end().remove()}this.originalElement.css("resize",this.originalResizeStyle);d(this.originalElement)},_mouseCapture:function(e){var f=false;for(var d in this.handles){if(c(this.handles[d])[0]==e.target){f=true}}return this.options.disabled||!!f},_mouseStart:function(f){var i=this.options,e=this.element.position(),d=this.element;this.resizing=true;this.documentScroll={top:c(document).scrollTop(),left:c(document).scrollLeft()};if(d.is(".ui-draggable")||(/absolute/).test(d.css("position"))){d.css({position:"absolute",top:e.top,left:e.left})}if(c.browser.opera&&(/relative/).test(d.css("position"))){d.css({position:"relative",top:"auto",left:"auto"})}this._renderProxy();var j=b(this.helper.css("left")),g=b(this.helper.css("top"));if(i.containment){j+=c(i.containment).scrollLeft()||0;g+=c(i.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:j,top:g};this.size=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalSize=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalPosition={left:j,top:g};this.sizeDiff={width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};this.originalMousePosition={left:f.pageX,top:f.pageY};this.aspectRatio=(typeof i.aspectRatio=="number")?i.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);var h=c(".ui-resizable-"+this.axis).css("cursor");c("body").css("cursor",h=="auto"?this.axis+"-resize":h);d.addClass("ui-resizable-resizing");this._propagate("start",f);return true},_mouseDrag:function(d){var g=this.helper,f=this.options,l={},p=this,i=this.originalMousePosition,m=this.axis;var q=(d.pageX-i.left)||0,n=(d.pageY-i.top)||0;var h=this._change[m];if(!h){return false}var k=h.apply(this,[d,q,n]),j=c.browser.msie&&c.browser.version<7,e=this.sizeDiff;if(this._aspectRatio||d.shiftKey){k=this._updateRatio(k,d)}k=this._respectSize(k,d);this._propagate("resize",d);g.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});if(!this._helper&&this._proportionallyResizeElements.length){this._proportionallyResize()}this._updateCache(k);this._trigger("resize",d,this.ui());return false},_mouseStop:function(g){this.resizing=false;var h=this.options,l=this;if(this._helper){var f=this._proportionallyResizeElements,d=f.length&&(/textarea/i).test(f[0].nodeName),e=d&&c.ui.hasScroll(f[0],"left")?0:l.sizeDiff.height,j=d?0:l.sizeDiff.width;var m={width:(l.size.width-j),height:(l.size.height-e)},i=(parseInt(l.element.css("left"),10)+(l.position.left-l.originalPosition.left))||null,k=(parseInt(l.element.css("top"),10)+(l.position.top-l.originalPosition.top))||null;if(!h.animate){this.element.css(c.extend(m,{top:k,left:i}))}l.helper.height(l.size.height);l.helper.width(l.size.width);if(this._helper&&!h.animate){this._proportionallyResize()}}c("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",g);if(this._helper){this.helper.remove()}return false},_updateCache:function(d){var e=this.options;this.offset=this.helper.offset();if(a(d.left)){this.position.left=d.left}if(a(d.top)){this.position.top=d.top}if(a(d.height)){this.size.height=d.height}if(a(d.width)){this.size.width=d.width}},_updateRatio:function(g,f){var h=this.options,i=this.position,e=this.size,d=this.axis;if(g.height){g.width=(e.height*this.aspectRatio)}else{if(g.width){g.height=(e.width/this.aspectRatio)}}if(d=="sw"){g.left=i.left+(e.width-g.width);g.top=null}if(d=="nw"){g.top=i.top+(e.height-g.height);g.left=i.left+(e.width-g.width)}return g},_respectSize:function(k,f){var i=this.helper,h=this.options,q=this._aspectRatio||f.shiftKey,p=this.axis,s=a(k.width)&&h.maxWidth&&(h.maxWidth<k.width),l=a(k.height)&&h.maxHeight&&(h.maxHeight<k.height),g=a(k.width)&&h.minWidth&&(h.minWidth>k.width),r=a(k.height)&&h.minHeight&&(h.minHeight>k.height);if(g){k.width=h.minWidth}if(r){k.height=h.minHeight}if(s){k.width=h.maxWidth}if(l){k.height=h.maxHeight}var e=this.originalPosition.left+this.originalSize.width,n=this.position.top+this.size.height;var j=/sw|nw|w/.test(p),d=/nw|ne|n/.test(p);if(g&&j){k.left=e-h.minWidth}if(s&&j){k.left=e-h.maxWidth}if(r&&d){k.top=n-h.minHeight}if(l&&d){k.top=n-h.maxHeight}var m=!k.width&&!k.height;if(m&&!k.left&&k.top){k.top=null}else{if(m&&!k.top&&k.left){k.left=null}}return k},_proportionallyResize:function(){var j=this.options;if(!this._proportionallyResizeElements.length){return}var f=this.helper||this.element;for(var e=0;e<this._proportionallyResizeElements.length;e++){var g=this._proportionallyResizeElements[e];if(!this.borderDif){var d=[g.css("borderTopWidth"),g.css("borderRightWidth"),g.css("borderBottomWidth"),g.css("borderLeftWidth")],h=[g.css("paddingTop"),g.css("paddingRight"),g.css("paddingBottom"),g.css("paddingLeft")];this.borderDif=c.map(d,function(k,m){var l=parseInt(k,10)||0,n=parseInt(h[m],10)||0;return l+n})}if(c.browser.msie&&!(!(c(f).is(":hidden")||c(f).parents(":hidden").length))){continue}g.css({height:(f.height()-this.borderDif[0]-this.borderDif[2])||0,width:(f.width()-this.borderDif[1]-this.borderDif[3])||0})}},_renderProxy:function(){var e=this.element,h=this.options;this.elementOffset=e.offset();if(this._helper){this.helper=this.helper||c('<div style="overflow:hidden;"></div>');var d=c.browser.msie&&c.browser.version<7,f=(d?1:0),g=(d?2:-1);this.helper.addClass(this._helper).css({width:this.element.outerWidth()+g,height:this.element.outerHeight()+g,position:"absolute",left:this.elementOffset.left-f+"px",top:this.elementOffset.top-f+"px",zIndex:++h.zIndex});this.helper.appendTo("body").disableSelection()}else{this.helper=this.element}},_change:{e:function(f,e,d){return{width:this.originalSize.width+e}},w:function(g,e,d){var i=this.options,f=this.originalSize,h=this.originalPosition;return{left:h.left+e,width:f.width-e}},n:function(g,e,d){var i=this.options,f=this.originalSize,h=this.originalPosition;return{top:h.top+d,height:f.height-d}},s:function(f,e,d){return{height:this.originalSize.height+d}},se:function(f,e,d){return c.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[f,e,d]))},sw:function(f,e,d){return c.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[f,e,d]))},ne:function(f,e,d){return c.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[f,e,d]))},nw:function(f,e,d){return c.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[f,e,d]))}},_propagate:function(e,d){c.ui.plugin.call(this,e,[d,this.ui()]);(e!="resize"&&this._trigger(e,d,this.ui()))},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}));c.extend(c.ui.resizable,{version:"1.7.2",eventPrefix:"resize",defaults:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,cancel:":input,option",containment:false,delay:0,distance:1,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000}});c.ui.plugin.add("resizable","alsoResize",{start:function(e,f){var d=c(this).data("resizable"),g=d.options;_store=function(h){c(h).each(function(){c(this).data("resizable-alsoresize",{width:parseInt(c(this).width(),10),height:parseInt(c(this).height(),10),left:parseInt(c(this).css("left"),10),top:parseInt(c(this).css("top"),10)})})};if(typeof(g.alsoResize)=="object"&&!g.alsoResize.parentNode){if(g.alsoResize.length){g.alsoResize=g.alsoResize[0];_store(g.alsoResize)}else{c.each(g.alsoResize,function(h,i){_store(h)})}}else{_store(g.alsoResize)}},resize:function(f,h){var e=c(this).data("resizable"),i=e.options,g=e.originalSize,k=e.originalPosition;var j={height:(e.size.height-g.height)||0,width:(e.size.width-g.width)||0,top:(e.position.top-k.top)||0,left:(e.position.left-k.left)||0},d=function(l,m){c(l).each(function(){var p=c(this),q=c(this).data("resizable-alsoresize"),o={},n=m&&m.length?m:["width","height","top","left"];c.each(n||["width","height","top","left"],function(r,t){var s=(q[t]||0)+(j[t]||0);if(s&&s>=0){o[t]=s||null}});if(/relative/.test(p.css("position"))&&c.browser.opera){e._revertToRelativePosition=true;p.css({position:"absolute",top:"auto",left:"auto"})}p.css(o)})};if(typeof(i.alsoResize)=="object"&&!i.alsoResize.nodeType){c.each(i.alsoResize,function(l,m){d(l,m)})}else{d(i.alsoResize)}},stop:function(e,f){var d=c(this).data("resizable");if(d._revertToRelativePosition&&c.browser.opera){d._revertToRelativePosition=false;el.css({position:"relative"})}c(this).removeData("resizable-alsoresize-start")}});c.ui.plugin.add("resizable","animate",{stop:function(h,m){var n=c(this).data("resizable"),i=n.options;var g=n._proportionallyResizeElements,d=g.length&&(/textarea/i).test(g[0].nodeName),e=d&&c.ui.hasScroll(g[0],"left")?0:n.sizeDiff.height,k=d?0:n.sizeDiff.width;var f={width:(n.size.width-k),height:(n.size.height-e)},j=(parseInt(n.element.css("left"),10)+(n.position.left-n.originalPosition.left))||null,l=(parseInt(n.element.css("top"),10)+(n.position.top-n.originalPosition.top))||null;n.element.animate(c.extend(f,l&&j?{top:l,left:j}:{}),{duration:i.animateDuration,easing:i.animateEasing,step:function(){var o={width:parseInt(n.element.css("width"),10),height:parseInt(n.element.css("height"),10),top:parseInt(n.element.css("top"),10),left:parseInt(n.element.css("left"),10)};if(g&&g.length){c(g[0]).css({width:o.width,height:o.height})}n._updateCache(o);n._propagate("resize",h)}})}});c.ui.plugin.add("resizable","containment",{start:function(e,q){var s=c(this).data("resizable"),i=s.options,k=s.element;var f=i.containment,j=(f instanceof c)?f.get(0):(/parent/.test(f))?k.parent().get(0):f;if(!j){return}s.containerElement=c(j);if(/document/.test(f)||f==document){s.containerOffset={left:0,top:0};s.containerPosition={left:0,top:0};s.parentData={element:c(document),left:0,top:0,width:c(document).width(),height:c(document).height()||document.body.parentNode.scrollHeight}}else{var m=c(j),h=[];c(["Top","Right","Left","Bottom"]).each(function(p,o){h[p]=b(m.css("padding"+o))});s.containerOffset=m.offset();s.containerPosition=m.position();s.containerSize={height:(m.innerHeight()-h[3]),width:(m.innerWidth()-h[1])};var n=s.containerOffset,d=s.containerSize.height,l=s.containerSize.width,g=(c.ui.hasScroll(j,"left")?j.scrollWidth:l),r=(c.ui.hasScroll(j)?j.scrollHeight:d);s.parentData={element:j,left:n.left,top:n.top,width:g,height:r}}},resize:function(f,p){var s=c(this).data("resizable"),h=s.options,e=s.containerSize,n=s.containerOffset,l=s.size,m=s.position,q=s._aspectRatio||f.shiftKey,d={top:0,left:0},g=s.containerElement;if(g[0]!=document&&(/static/).test(g.css("position"))){d=n}if(m.left<(s._helper?n.left:0)){s.size.width=s.size.width+(s._helper?(s.position.left-n.left):(s.position.left-d.left));if(q){s.size.height=s.size.width/h.aspectRatio}s.position.left=h.helper?n.left:0}if(m.top<(s._helper?n.top:0)){s.size.height=s.size.height+(s._helper?(s.position.top-n.top):s.position.top);if(q){s.size.width=s.size.height*h.aspectRatio}s.position.top=s._helper?n.top:0}s.offset.left=s.parentData.left+s.position.left;s.offset.top=s.parentData.top+s.position.top;var k=Math.abs((s._helper?s.offset.left-d.left:(s.offset.left-d.left))+s.sizeDiff.width),r=Math.abs((s._helper?s.offset.top-d.top:(s.offset.top-n.top))+s.sizeDiff.height);var j=s.containerElement.get(0)==s.element.parent().get(0),i=/relative|absolute/.test(s.containerElement.css("position"));if(j&&i){k-=s.parentData.left}if(k+s.size.width>=s.parentData.width){s.size.width=s.parentData.width-k;if(q){s.size.height=s.size.width/s.aspectRatio}}if(r+s.size.height>=s.parentData.height){s.size.height=s.parentData.height-r;if(q){s.size.width=s.size.height*s.aspectRatio}}},stop:function(e,m){var p=c(this).data("resizable"),f=p.options,k=p.position,l=p.containerOffset,d=p.containerPosition,g=p.containerElement;var i=c(p.helper),q=i.offset(),n=i.outerWidth()-p.sizeDiff.width,j=i.outerHeight()-p.sizeDiff.height;if(p._helper&&!f.animate&&(/relative/).test(g.css("position"))){c(this).css({left:q.left-d.left-l.left,width:n,height:j})}if(p._helper&&!f.animate&&(/static/).test(g.css("position"))){c(this).css({left:q.left-d.left-l.left,width:n,height:j})}}});c.ui.plugin.add("resizable","ghost",{start:function(f,g){var d=c(this).data("resizable"),h=d.options,e=d.size;d.ghost=d.originalElement.clone();d.ghost.css({opacity:0.25,display:"block",position:"relative",height:e.height,width:e.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof h.ghost=="string"?h.ghost:"");d.ghost.appendTo(d.helper)},resize:function(e,f){var d=c(this).data("resizable"),g=d.options;if(d.ghost){d.ghost.css({position:"relative",height:d.size.height,width:d.size.width})}},stop:function(e,f){var d=c(this).data("resizable"),g=d.options;if(d.ghost&&d.helper){d.helper.get(0).removeChild(d.ghost.get(0))}}});c.ui.plugin.add("resizable","grid",{resize:function(d,l){var n=c(this).data("resizable"),g=n.options,j=n.size,h=n.originalSize,i=n.originalPosition,m=n.axis,k=g._aspectRatio||d.shiftKey;g.grid=typeof g.grid=="number"?[g.grid,g.grid]:g.grid;var f=Math.round((j.width-h.width)/(g.grid[0]||1))*(g.grid[0]||1),e=Math.round((j.height-h.height)/(g.grid[1]||1))*(g.grid[1]||1);if(/^(se|s|e)$/.test(m)){n.size.width=h.width+f;n.size.height=h.height+e}else{if(/^(ne)$/.test(m)){n.size.width=h.width+f;n.size.height=h.height+e;n.position.top=i.top-e}else{if(/^(sw)$/.test(m)){n.size.width=h.width+f;n.size.height=h.height+e;n.position.left=i.left-f}else{n.size.width=h.width+f;n.size.height=h.height+e;n.position.top=i.top-e;n.position.left=i.left-f}}}}});var b=function(d){return parseInt(d,10)||0};var a=function(d){return !isNaN(parseInt(d,10))}})(jQuery);;
(function(a){a.widget("ui.selectable",a.extend({},a.ui.mouse,{_init:function(){var b=this;this.element.addClass("ui-selectable");this.dragged=false;var c;this.refresh=function(){c=a(b.options.filter,b.element[0]);c.each(function(){var d=a(this);var e=d.offset();a.data(this,"selectable-item",{element:this,$element:d,left:e.left,top:e.top,right:e.left+d.outerWidth(),bottom:e.top+d.outerHeight(),startselected:false,selected:d.hasClass("ui-selected"),selecting:d.hasClass("ui-selecting"),unselecting:d.hasClass("ui-unselecting")})})};this.refresh();this.selectees=c.addClass("ui-selectee");this._mouseInit();this.helper=a(document.createElement("div")).css({border:"1px dotted black"}).addClass("ui-selectable-helper")},destroy:function(){this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");this._mouseDestroy()},_mouseStart:function(d){var b=this;this.opos=[d.pageX,d.pageY];if(this.options.disabled){return}var c=this.options;this.selectees=a(c.filter,this.element[0]);this._trigger("start",d);a(c.appendTo).append(this.helper);this.helper.css({"z-index":100,position:"absolute",left:d.clientX,top:d.clientY,width:0,height:0});if(c.autoRefresh){this.refresh()}this.selectees.filter(".ui-selected").each(function(){var e=a.data(this,"selectable-item");e.startselected=true;if(!d.metaKey){e.$element.removeClass("ui-selected");e.selected=false;e.$element.addClass("ui-unselecting");e.unselecting=true;b._trigger("unselecting",d,{unselecting:e.element})}});a(d.target).parents().andSelf().each(function(){var e=a.data(this,"selectable-item");if(e){e.$element.removeClass("ui-unselecting").addClass("ui-selecting");e.unselecting=false;e.selecting=true;e.selected=true;b._trigger("selecting",d,{selecting:e.element});return false}})},_mouseDrag:function(i){var c=this;this.dragged=true;if(this.options.disabled){return}var e=this.options;var d=this.opos[0],h=this.opos[1],b=i.pageX,g=i.pageY;if(d>b){var f=b;b=d;d=f}if(h>g){var f=g;g=h;h=f}this.helper.css({left:d,top:h,width:b-d,height:g-h});this.selectees.each(function(){var j=a.data(this,"selectable-item");if(!j||j.element==c.element[0]){return}var k=false;if(e.tolerance=="touch"){k=(!(j.left>b||j.right<d||j.top>g||j.bottom<h))}else{if(e.tolerance=="fit"){k=(j.left>d&&j.right<b&&j.top>h&&j.bottom<g)}}if(k){if(j.selected){j.$element.removeClass("ui-selected");j.selected=false}if(j.unselecting){j.$element.removeClass("ui-unselecting");j.unselecting=false}if(!j.selecting){j.$element.addClass("ui-selecting");j.selecting=true;c._trigger("selecting",i,{selecting:j.element})}}else{if(j.selecting){if(i.metaKey&&j.startselected){j.$element.removeClass("ui-selecting");j.selecting=false;j.$element.addClass("ui-selected");j.selected=true}else{j.$element.removeClass("ui-selecting");j.selecting=false;if(j.startselected){j.$element.addClass("ui-unselecting");j.unselecting=true}c._trigger("unselecting",i,{unselecting:j.element})}}if(j.selected){if(!i.metaKey&&!j.startselected){j.$element.removeClass("ui-selected");j.selected=false;j.$element.addClass("ui-unselecting");j.unselecting=true;c._trigger("unselecting",i,{unselecting:j.element})}}}});return false},_mouseStop:function(d){var b=this;this.dragged=false;var c=this.options;a(".ui-unselecting",this.element[0]).each(function(){var e=a.data(this,"selectable-item");e.$element.removeClass("ui-unselecting");e.unselecting=false;e.startselected=false;b._trigger("unselected",d,{unselected:e.element})});a(".ui-selecting",this.element[0]).each(function(){var e=a.data(this,"selectable-item");e.$element.removeClass("ui-selecting").addClass("ui-selected");e.selecting=false;e.selected=true;e.startselected=true;b._trigger("selected",d,{selected:e.element})});this._trigger("stop",d);this.helper.remove();return false}}));a.extend(a.ui.selectable,{version:"1.7.2",defaults:{appendTo:"body",autoRefresh:true,cancel:":input,option",delay:0,distance:0,filter:"*",tolerance:"touch"}})})(jQuery);;
(function(a){a.widget("ui.sortable",a.extend({},a.ui.mouse,{_init:function(){var b=this.options;this.containerCache={};this.element.addClass("ui-sortable");this.refresh();this.floating=this.items.length?(/left|right/).test(this.items[0].item.css("float")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var b=this.items.length-1;b>=0;b--){this.items[b].item.removeData("sortable-item")}},_mouseCapture:function(e,f){if(this.reverting){return false}if(this.options.disabled||this.options.type=="static"){return false}this._refreshItems(e);var d=null,c=this,b=a(e.target).parents().each(function(){if(a.data(this,"sortable-item")==c){d=a(this);return false}});if(a.data(e.target,"sortable-item")==c){d=a(e.target)}if(!d){return false}if(this.options.handle&&!f){var g=false;a(this.options.handle,d).find("*").andSelf().each(function(){if(this==e.target){g=true}});if(!g){return false}}this.currentItem=d;this._removeCurrentsFromItems();return true},_mouseStart:function(e,f,b){var g=this.options,c=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(e);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");a.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(e);this.originalPageX=e.pageX;this.originalPageY=e.pageY;if(g.cursorAt){this._adjustOffsetFromHelper(g.cursorAt)}this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};if(this.helper[0]!=this.currentItem[0]){this.currentItem.hide()}this._createPlaceholder();if(g.containment){this._setContainment()}if(g.cursor){if(a("body").css("cursor")){this._storedCursor=a("body").css("cursor")}a("body").css("cursor",g.cursor)}if(g.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")}this.helper.css("opacity",g.opacity)}if(g.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")}this.helper.css("zIndex",g.zIndex)}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()}this._trigger("start",e,this._uiHash());if(!this._preserveHelperProportions){this._cacheHelperProportions()}if(!b){for(var d=this.containers.length-1;d>=0;d--){this.containers[d]._trigger("activate",e,c._uiHash(this))}}if(a.ui.ddmanager){a.ui.ddmanager.current=this}if(a.ui.ddmanager&&!g.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,e)}this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(e);return true},_mouseDrag:function(f){this.position=this._generatePosition(f);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs}if(this.options.scroll){var g=this.options,b=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-f.pageY<g.scrollSensitivity){this.scrollParent[0].scrollTop=b=this.scrollParent[0].scrollTop+g.scrollSpeed}else{if(f.pageY-this.overflowOffset.top<g.scrollSensitivity){this.scrollParent[0].scrollTop=b=this.scrollParent[0].scrollTop-g.scrollSpeed}}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-f.pageX<g.scrollSensitivity){this.scrollParent[0].scrollLeft=b=this.scrollParent[0].scrollLeft+g.scrollSpeed}else{if(f.pageX-this.overflowOffset.left<g.scrollSensitivity){this.scrollParent[0].scrollLeft=b=this.scrollParent[0].scrollLeft-g.scrollSpeed}}}else{if(f.pageY-a(document).scrollTop()<g.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()-g.scrollSpeed)}else{if(a(window).height()-(f.pageY-a(document).scrollTop())<g.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()+g.scrollSpeed)}}if(f.pageX-a(document).scrollLeft()<g.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()-g.scrollSpeed)}else{if(a(window).width()-(f.pageX-a(document).scrollLeft())<g.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()+g.scrollSpeed)}}}if(b!==false&&a.ui.ddmanager&&!g.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,f)}}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"}for(var d=this.items.length-1;d>=0;d--){var e=this.items[d],c=e.item[0],h=this._intersectsWithPointer(e);if(!h){continue}if(c!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=c&&!a.ui.contains(this.placeholder[0],c)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],c):true)){this.direction=h==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(e)){this._rearrange(f,e)}else{break}this._trigger("change",f,this._uiHash());break}}this._contactContainers(f);if(a.ui.ddmanager){a.ui.ddmanager.drag(this,f)}this._trigger("sort",f,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(c,d){if(!c){return}if(a.ui.ddmanager&&!this.options.dropBehaviour){a.ui.ddmanager.drop(this,c)}if(this.options.revert){var b=this;var e=b.placeholder.offset();b.reverting=true;a(this.helper).animate({left:e.left-this.offset.parent.left-b.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-b.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){b._clear(c)})}else{this._clear(c,d)}return false},cancel:function(){var b=this;if(this.dragging){this._mouseUp();if(this.options.helper=="original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else{this.currentItem.show()}for(var c=this.containers.length-1;c>=0;c--){this.containers[c]._trigger("deactivate",null,b._uiHash(this));if(this.containers[c].containerCache.over){this.containers[c]._trigger("out",null,b._uiHash(this));this.containers[c].containerCache.over=0}}}if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0])}if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove()}a.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});if(this.domPosition.prev){a(this.domPosition.prev).after(this.currentItem)}else{a(this.domPosition.parent).prepend(this.currentItem)}return true},serialize:function(d){var b=this._getItemsAsjQuery(d&&d.connected);var c=[];d=d||{};a(b).each(function(){var e=(a(d.item||this).attr(d.attribute||"id")||"").match(d.expression||(/(.+)[-=_](.+)/));if(e){c.push((d.key||e[1]+"[]")+"="+(d.key&&d.expression?e[1]:e[2]))}});return c.join("&")},toArray:function(d){var b=this._getItemsAsjQuery(d&&d.connected);var c=[];d=d||{};b.each(function(){c.push(a(d.item||this).attr(d.attribute||"id")||"")});return c},_intersectsWith:function(m){var e=this.positionAbs.left,d=e+this.helperProportions.width,k=this.positionAbs.top,j=k+this.helperProportions.height;var f=m.left,c=f+m.width,n=m.top,i=n+m.height;var o=this.offset.click.top,h=this.offset.click.left;var g=(k+o)>n&&(k+o)<i&&(e+h)>f&&(e+h)<c;if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>m[this.floating?"width":"height"])){return g}else{return(f<e+(this.helperProportions.width/2)&&d-(this.helperProportions.width/2)<c&&n<k+(this.helperProportions.height/2)&&j-(this.helperProportions.height/2)<i)}},_intersectsWithPointer:function(d){var e=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,d.top,d.height),c=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,d.left,d.width),g=e&&c,b=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();if(!g){return false}return this.floating?(((f&&f=="right")||b=="down")?2:1):(b&&(b=="down"?2:1))},_intersectsWithSides:function(e){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+(e.height/2),e.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+(e.width/2),e.width),b=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();if(this.floating&&f){return((f=="right"&&d)||(f=="left"&&!d))}else{return b&&((b=="down"&&c)||(b=="up"&&!c))}},_getDragVerticalDirection:function(){var b=this.positionAbs.top-this.lastPositionAbs.top;return b!=0&&(b>0?"down":"up")},_getDragHorizontalDirection:function(){var b=this.positionAbs.left-this.lastPositionAbs.left;return b!=0&&(b>0?"right":"left")},refresh:function(b){this._refreshItems(b);this.refreshPositions()},_connectWith:function(){var b=this.options;return b.connectWith.constructor==String?[b.connectWith]:b.connectWith},_getItemsAsjQuery:function(b){var l=this;var g=[];var e=[];var h=this._connectWith();if(h&&b){for(var d=h.length-1;d>=0;d--){var k=a(h[d]);for(var c=k.length-1;c>=0;c--){var f=a.data(k[c],"sortable");if(f&&f!=this&&!f.options.disabled){e.push([a.isFunction(f.options.items)?f.options.items.call(f.element):a(f.options.items,f.element).not(".ui-sortable-helper"),f])}}}}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper"),this]);for(var d=e.length-1;d>=0;d--){e[d][0].each(function(){g.push(this)})}return a(g)},_removeCurrentsFromItems:function(){var d=this.currentItem.find(":data(sortable-item)");for(var c=0;c<this.items.length;c++){for(var b=0;b<d.length;b++){if(d[b]==this.items[c].item[0]){this.items.splice(c,1)}}}},_refreshItems:function(b){this.items=[];this.containers=[this];var h=this.items;var p=this;var f=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]];var l=this._connectWith();if(l){for(var e=l.length-1;e>=0;e--){var m=a(l[e]);for(var d=m.length-1;d>=0;d--){var g=a.data(m[d],"sortable");if(g&&g!=this&&!g.options.disabled){f.push([a.isFunction(g.options.items)?g.options.items.call(g.element[0],b,{item:this.currentItem}):a(g.options.items,g.element),g]);this.containers.push(g)}}}}for(var e=f.length-1;e>=0;e--){var k=f[e][1];var c=f[e][0];for(var d=0,n=c.length;d<n;d++){var o=a(c[d]);o.data("sortable-item",k);h.push({item:o,instance:k,width:0,height:0,left:0,top:0})}}},refreshPositions:function(b){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()}for(var d=this.items.length-1;d>=0;d--){var e=this.items[d];if(e.instance!=this.currentContainer&&this.currentContainer&&e.item[0]!=this.currentItem[0]){continue}var c=this.options.toleranceElement?a(this.options.toleranceElement,e.item):e.item;if(!b){e.width=c.outerWidth();e.height=c.outerHeight()}var f=c.offset();e.left=f.left;e.top=f.top}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)}else{for(var d=this.containers.length-1;d>=0;d--){var f=this.containers[d].element.offset();this.containers[d].containerCache.left=f.left;this.containers[d].containerCache.top=f.top;this.containers[d].containerCache.width=this.containers[d].element.outerWidth();this.containers[d].containerCache.height=this.containers[d].element.outerHeight()}}},_createPlaceholder:function(d){var b=d||this,e=b.options;if(!e.placeholder||e.placeholder.constructor==String){var c=e.placeholder;e.placeholder={element:function(){var f=a(document.createElement(b.currentItem[0].nodeName)).addClass(c||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!c){f.style.visibility="hidden"}return f},update:function(f,g){if(c&&!e.forcePlaceholderSize){return}if(!g.height()){g.height(b.currentItem.innerHeight()-parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10))}if(!g.width()){g.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||0,10))}}}}b.placeholder=a(e.placeholder.element.call(b.element,b.currentItem));b.currentItem.after(b.placeholder);e.placeholder.update(b,b.placeholder)},_contactContainers:function(d){for(var c=this.containers.length-1;c>=0;c--){if(this._intersectsWith(this.containers[c].containerCache)){if(!this.containers[c].containerCache.over){if(this.currentContainer!=this.containers[c]){var h=10000;var g=null;var e=this.positionAbs[this.containers[c].floating?"left":"top"];for(var b=this.items.length-1;b>=0;b--){if(!a.ui.contains(this.containers[c].element[0],this.items[b].item[0])){continue}var f=this.items[b][this.containers[c].floating?"left":"top"];if(Math.abs(f-e)<h){h=Math.abs(f-e);g=this.items[b]}}if(!g&&!this.options.dropOnEmpty){continue}this.currentContainer=this.containers[c];g?this._rearrange(d,g,null,true):this._rearrange(d,null,this.containers[c].element,true);this._trigger("change",d,this._uiHash());this.containers[c]._trigger("change",d,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder)}this.containers[c]._trigger("over",d,this._uiHash(this));this.containers[c].containerCache.over=1}}else{if(this.containers[c].containerCache.over){this.containers[c]._trigger("out",d,this._uiHash(this));this.containers[c].containerCache.over=0}}}},_createHelper:function(c){var d=this.options;var b=a.isFunction(d.helper)?a(d.helper.apply(this.element[0],[c,this.currentItem])):(d.helper=="clone"?this.currentItem.clone():this.currentItem);if(!b.parents("body").length){a(d.appendTo!="parent"?d.appendTo:this.currentItem[0].parentNode)[0].appendChild(b[0])}if(b[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}}if(b[0].style.width==""||d.forceHelperSize){b.width(this.currentItem.width())}if(b[0].style.height==""||d.forceHelperSize){b.height(this.currentItem.height())}return b},_adjustOffsetFromHelper:function(b){if(b.left!=undefined){this.offset.click.left=b.left+this.margins.left}if(b.right!=undefined){this.offset.click.left=this.helperProportions.width-b.right+this.margins.left}if(b.top!=undefined){this.offset.click.top=b.top+this.margins.top}if(b.bottom!=undefined){this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){b.left+=this.scrollParent.scrollLeft();b.top+=this.scrollParent.scrollTop()}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)){b={top:0,left:0}}return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var b=this.currentItem.position();return{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else{return{top:0,left:0}}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e=this.options;if(e.containment=="parent"){e.containment=this.helper[0].parentNode}if(e.containment=="document"||e.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(e.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(e.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]}if(!(/^(document|window|parent)$/).test(e.containment)){var c=a(e.containment)[0];var d=a(e.containment).offset();var b=(a(c).css("overflow")!="hidden");this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(b?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(b?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(f,h){if(!h){h=this.position}var c=f=="absolute"?1:-1;var e=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=(/(html|body)/i).test(b[0].tagName);return{top:(h.top+this.offset.relative.top*c+this.offset.parent.top*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(g?0:b.scrollTop()))*c)),left:(h.left+this.offset.relative.left*c+this.offset.parent.left*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:b.scrollLeft())*c))}},_generatePosition:function(e){var h=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,i=(/(html|body)/i).test(b[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()}var d=e.pageX;var c=e.pageY;if(this.originalPosition){if(this.containment){if(e.pageX-this.offset.click.left<this.containment[0]){d=this.containment[0]+this.offset.click.left}if(e.pageY-this.offset.click.top<this.containment[1]){c=this.containment[1]+this.offset.click.top}if(e.pageX-this.offset.click.left>this.containment[2]){d=this.containment[2]+this.offset.click.left}if(e.pageY-this.offset.click.top>this.containment[3]){c=this.containment[3]+this.offset.click.top}}if(h.grid){var g=this.originalPageY+Math.round((c-this.originalPageY)/h.grid[1])*h.grid[1];c=this.containment?(!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:(!(g-this.offset.click.top<this.containment[1])?g-h.grid[1]:g+h.grid[1])):g;var f=this.originalPageX+Math.round((d-this.originalPageX)/h.grid[0])*h.grid[0];d=this.containment?(!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:(!(f-this.offset.click.left<this.containment[0])?f-h.grid[0]:f+h.grid[0])):f}}return{top:(c-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(i?0:b.scrollTop())))),left:(d-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:b.scrollLeft())))}},_rearrange:function(g,f,c,e){c?c[0].appendChild(this.placeholder[0]):f.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?f.item[0]:f.item[0].nextSibling));this.counter=this.counter?++this.counter:1;var d=this,b=this.counter;window.setTimeout(function(){if(b==d.counter){d.refreshPositions(!e)}},0)},_clear:function(d,e){this.reverting=false;var f=[],b=this;if(!this._noFinalSort&&this.currentItem[0].parentNode){this.placeholder.before(this.currentItem)}this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var c in this._storedCSS){if(this._storedCSS[c]=="auto"||this._storedCSS[c]=="static"){this._storedCSS[c]=""}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else{this.currentItem.show()}if(this.fromOutside&&!e){f.push(function(g){this._trigger("receive",g,this._uiHash(this.fromOutside))})}if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!e){f.push(function(g){this._trigger("update",g,this._uiHash())})}if(!a.ui.contains(this.element[0],this.currentItem[0])){if(!e){f.push(function(g){this._trigger("remove",g,this._uiHash())})}for(var c=this.containers.length-1;c>=0;c--){if(a.ui.contains(this.containers[c].element[0],this.currentItem[0])&&!e){f.push((function(g){return function(h){g._trigger("receive",h,this._uiHash(this))}}).call(this,this.containers[c]));f.push((function(g){return function(h){g._trigger("update",h,this._uiHash(this))}}).call(this,this.containers[c]))}}}for(var c=this.containers.length-1;c>=0;c--){if(!e){f.push((function(g){return function(h){g._trigger("deactivate",h,this._uiHash(this))}}).call(this,this.containers[c]))}if(this.containers[c].containerCache.over){f.push((function(g){return function(h){g._trigger("out",h,this._uiHash(this))}}).call(this,this.containers[c]));this.containers[c].containerCache.over=0}}if(this._storedCursor){a("body").css("cursor",this._storedCursor)}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity)}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)}this.dragging=false;if(this.cancelHelperRemoval){if(!e){this._trigger("beforeStop",d,this._uiHash());for(var c=0;c<f.length;c++){f[c].call(this,d)}this._trigger("stop",d,this._uiHash())}return false}if(!e){this._trigger("beforeStop",d,this._uiHash())}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);if(this.helper[0]!=this.currentItem[0]){this.helper.remove()}this.helper=null;if(!e){for(var c=0;c<f.length;c++){f[c].call(this,d)}this._trigger("stop",d,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){if(a.widget.prototype._trigger.apply(this,arguments)===false){this.cancel()}},_uiHash:function(c){var b=c||this;return{helper:b.helper,placeholder:b.placeholder||a([]),position:b.position,absolutePosition:b.positionAbs,offset:b.positionAbs,item:b.currentItem,sender:c?c.element:null}}}));a.extend(a.ui.sortable,{getter:"serialize toArray",version:"1.7.2",eventPrefix:"sort",defaults:{appendTo:"parent",axis:false,cancel:":input,option",connectWith:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000}})})(jQuery);;
(function(a){a.widget("ui.accordion",{_init:function(){var d=this.options,b=this;this.running=0;if(d.collapsible==a.ui.accordion.defaults.collapsible&&d.alwaysOpen!=a.ui.accordion.defaults.alwaysOpen){d.collapsible=!d.alwaysOpen}if(d.navigation){var c=this.element.find("a").filter(d.navigationFilter);if(c.length){if(c.filter(d.header).length){this.active=c}else{this.active=c.parent().parent().prev();c.addClass("ui-accordion-content-active")}}}this.element.addClass("ui-accordion ui-widget ui-helper-reset");if(this.element[0].nodeName=="UL"){this.element.children("li").addClass("ui-accordion-li-fix")}this.headers=this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){a(this).removeClass("ui-state-focus")});this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");this.active=this._findActive(this.active||d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");this.active.next().addClass("ui-accordion-content-active");a("<span/>").addClass("ui-icon "+d.icons.header).prependTo(this.headers);this.active.find(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);if(a.browser.msie){this.element.find("a").css("zoom","1")}this.resize();this.element.attr("role","tablist");this.headers.attr("role","tab").bind("keydown",function(e){return b._keydown(e)}).next().attr("role","tabpanel");this.headers.not(this.active||"").attr("aria-expanded","false").attr("tabIndex","-1").next().hide();if(!this.active.length){this.headers.eq(0).attr("tabIndex","0")}else{this.active.attr("aria-expanded","true").attr("tabIndex","0")}if(!a.browser.safari){this.headers.find("a").attr("tabIndex","-1")}if(d.event){this.headers.bind((d.event)+".accordion",function(e){return b._clickHandler.call(b,e,this)})}},destroy:function(){var c=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");this.headers.find("a").removeAttr("tabindex");this.headers.children(".ui-icon").remove();var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");if(c.autoHeight||c.fillHeight){b.css("height","")}},_setData:function(b,c){if(b=="alwaysOpen"){b="collapsible";c=!c}a.widget.prototype._setData.apply(this,arguments)},_keydown:function(e){var g=this.options,f=a.ui.keyCode;if(g.disabled||e.altKey||e.ctrlKey){return}var d=this.headers.length;var b=this.headers.index(e.target);var c=false;switch(e.keyCode){case f.RIGHT:case f.DOWN:c=this.headers[(b+1)%d];break;case f.LEFT:case f.UP:c=this.headers[(b-1+d)%d];break;case f.SPACE:case f.ENTER:return this._clickHandler({target:e.target},e.target)}if(c){a(e.target).attr("tabIndex","-1");a(c).attr("tabIndex","0");c.focus();return false}return true},resize:function(){var e=this.options,d;if(e.fillSpace){if(a.browser.msie){var b=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}d=this.element.parent().height();if(a.browser.msie){this.element.parent().css("overflow",b)}this.headers.each(function(){d-=a(this).outerHeight()});var c=0;this.headers.next().each(function(){c=Math.max(c,a(this).innerHeight()-a(this).height())}).height(Math.max(0,d-c)).css("overflow","auto")}else{if(e.autoHeight){d=0;this.headers.next().each(function(){d=Math.max(d,a(this).outerHeight())}).height(d)}}},activate:function(b){var c=this._findActive(b)[0];this._clickHandler({target:c},c)},_findActive:function(b){return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===false?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(b,f){var d=this.options;if(d.disabled){return false}if(!b.target&&d.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");var h=this.active.next(),e={options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:h},c=(this.active=a([]));this._toggle(c,h,e);return false}var g=a(b.currentTarget||f);var i=g[0]==this.active[0];if(this.running||(!d.collapsible&&i)){return false}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");if(!i){g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);g.next().addClass("ui-accordion-content-active")}var c=g.next(),h=this.active.next(),e={options:d,newHeader:i&&d.collapsible?a([]):g,oldHeader:this.active,newContent:i&&d.collapsible?a([]):c.find("> *"),oldContent:h.find("> *")},j=this.headers.index(this.active[0])>this.headers.index(g[0]);this.active=i?a([]):g;this._toggle(c,h,e,i,j);return false},_toggle:function(b,i,g,j,k){var d=this.options,m=this;this.toShow=b;this.toHide=i;this.data=g;var c=function(){if(!m){return}return m._completed.apply(m,arguments)};this._trigger("changestart",null,this.data);this.running=i.size()===0?b.size():i.size();if(d.animated){var f={};if(d.collapsible&&j){f={toShow:a([]),toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace}}else{f={toShow:b,toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace}}if(!d.proxied){d.proxied=d.animated}if(!d.proxiedDuration){d.proxiedDuration=d.duration}d.animated=a.isFunction(d.proxied)?d.proxied(f):d.proxied;d.duration=a.isFunction(d.proxiedDuration)?d.proxiedDuration(f):d.proxiedDuration;var l=a.ui.accordion.animations,e=d.duration,h=d.animated;if(!l[h]){l[h]=function(n){this.slide(n,{easing:h,duration:e||700})}}l[h](f)}else{if(d.collapsible&&j){b.toggle()}else{i.hide();b.show()}c(true)}i.prev().attr("aria-expanded","false").attr("tabIndex","-1").blur();b.prev().attr("aria-expanded","true").attr("tabIndex","0").focus()},_completed:function(b){var c=this.options;this.running=b?0:--this.running;if(this.running){return}if(c.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})}this._trigger("change",null,this.data)}});a.extend(a.ui.accordion,{version:"1.7.2",defaults:{active:null,alwaysOpen:true,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()==location.href.toLowerCase()}},animations:{slide:function(j,h){j=a.extend({easing:"swing",duration:300},j,h);if(!j.toHide.size()){j.toShow.animate({height:"show"},j);return}if(!j.toShow.size()){j.toHide.animate({height:"hide"},j);return}var c=j.toShow.css("overflow"),g,d={},f={},e=["height","paddingTop","paddingBottom"],b;var i=j.toShow;b=i[0].style.width;i.width(parseInt(i.parent().width(),10)-parseInt(i.css("paddingLeft"),10)-parseInt(i.css("paddingRight"),10)-(parseInt(i.css("borderLeftWidth"),10)||0)-(parseInt(i.css("borderRightWidth"),10)||0));a.each(e,function(k,m){f[m]="hide";var l=(""+a.css(j.toShow[0],m)).match(/^([\d+-.]+)(.*)$/);d[m]={value:l[1],unit:l[2]||"px"}});j.toShow.css({height:0,overflow:"hidden"}).show();j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(f,{step:function(k,l){if(l.prop=="height"){g=(l.now-l.start)/(l.end-l.start)}j.toShow[0].style[l.prop]=(g*d[l.prop].value)+d[l.prop].unit},duration:j.duration,easing:j.easing,complete:function(){if(!j.autoHeight){j.toShow.css("height","")}j.toShow.css("width",b);j.toShow.css({overflow:c});j.complete()}})},bounceslide:function(b){this.slide(b,{easing:b.down?"easeOutBounce":"swing",duration:b.down?1000:200})},easeslide:function(b){this.slide(b,{easing:"easeinout",duration:700})}}})})(jQuery);;
(function(c){var b={dragStart:"start.draggable",drag:"drag.draggable",dragStop:"stop.draggable",maxHeight:"maxHeight.resizable",minHeight:"minHeight.resizable",maxWidth:"maxWidth.resizable",minWidth:"minWidth.resizable",resizeStart:"start.resizable",resize:"drag.resizable",resizeStop:"stop.resizable"},a="ui-dialog ui-widget ui-widget-content ui-corner-all ";c.widget("ui.dialog",{_init:function(){this.originalTitle=this.element.attr("title");var l=this,m=this.options,j=m.title||this.originalTitle||"&nbsp;",e=c.ui.dialog.getTitleId(this.element),k=(this.uiDialog=c("<div/>")).appendTo(document.body).hide().addClass(a+m.dialogClass).css({position:"absolute",overflow:"hidden",zIndex:m.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(n){(m.closeOnEscape&&n.keyCode&&n.keyCode==c.ui.keyCode.ESCAPE&&l.close(n))}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(n){l.moveToTop(false,n)}),g=this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(k),f=(this.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(k),i=c('<a href="#"/>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){i.addClass("ui-state-hover")},function(){i.removeClass("ui-state-hover")}).focus(function(){i.addClass("ui-state-focus")}).blur(function(){i.removeClass("ui-state-focus")}).mousedown(function(n){n.stopPropagation()}).click(function(n){l.close(n);return false}).appendTo(f),h=(this.uiDialogTitlebarCloseText=c("<span/>")).addClass("ui-icon ui-icon-closethick").text(m.closeText).appendTo(i),d=c("<span/>").addClass("ui-dialog-title").attr("id",e).html(j).prependTo(f);f.find("*").add(f).disableSelection();(m.draggable&&c.fn.draggable&&this._makeDraggable());(m.resizable&&c.fn.resizable&&this._makeResizable());this._createButtons(m.buttons);this._isOpen=false;(m.bgiframe&&c.fn.bgiframe&&k.bgiframe());(m.autoOpen&&this.open())},destroy:function(){(this.overlay&&this.overlay.destroy());this.uiDialog.hide();this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");this.uiDialog.remove();(this.originalTitle&&this.element.attr("title",this.originalTitle))},close:function(f){var d=this;if(false===d._trigger("beforeclose",f)){return}(d.overlay&&d.overlay.destroy());d.uiDialog.unbind("keypress.ui-dialog");(d.options.hide?d.uiDialog.hide(d.options.hide,function(){d._trigger("close",f)}):d.uiDialog.hide()&&d._trigger("close",f));c.ui.dialog.overlay.resize();d._isOpen=false;if(d.options.modal){var e=0;c(".ui-dialog").each(function(){if(this!=d.uiDialog[0]){e=Math.max(e,c(this).css("z-index"))}});c.ui.dialog.maxZ=e}},isOpen:function(){return this._isOpen},moveToTop:function(f,e){if((this.options.modal&&!f)||(!this.options.stack&&!this.options.modal)){return this._trigger("focus",e)}if(this.options.zIndex>c.ui.dialog.maxZ){c.ui.dialog.maxZ=this.options.zIndex}(this.overlay&&this.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=++c.ui.dialog.maxZ));var d={scrollTop:this.element.attr("scrollTop"),scrollLeft:this.element.attr("scrollLeft")};this.uiDialog.css("z-index",++c.ui.dialog.maxZ);this.element.attr(d);this._trigger("focus",e)},open:function(){if(this._isOpen){return}var e=this.options,d=this.uiDialog;this.overlay=e.modal?new c.ui.dialog.overlay(this):null;(d.next().length&&d.appendTo("body"));this._size();this._position(e.position);d.show(e.show);this.moveToTop(true);(e.modal&&d.bind("keypress.ui-dialog",function(h){if(h.keyCode!=c.ui.keyCode.TAB){return}var g=c(":tabbable",this),i=g.filter(":first")[0],f=g.filter(":last")[0];if(h.target==f&&!h.shiftKey){setTimeout(function(){i.focus()},1)}else{if(h.target==i&&h.shiftKey){setTimeout(function(){f.focus()},1)}}}));c([]).add(d.find(".ui-dialog-content :tabbable:first")).add(d.find(".ui-dialog-buttonpane :tabbable:first")).add(d).filter(":first").focus();this._trigger("open");this._isOpen=true},_createButtons:function(g){var f=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");this.uiDialog.find(".ui-dialog-buttonpane").remove();(typeof g=="object"&&g!==null&&c.each(g,function(){return !(d=true)}));if(d){c.each(g,function(h,i){c('<button type="button"></button>').addClass("ui-state-default ui-corner-all").text(h).click(function(){i.apply(f.element[0],arguments)}).hover(function(){c(this).addClass("ui-state-hover")},function(){c(this).removeClass("ui-state-hover")}).focus(function(){c(this).addClass("ui-state-focus")}).blur(function(){c(this).removeClass("ui-state-focus")}).appendTo(e)});e.appendTo(this.uiDialog)}},_makeDraggable:function(){var d=this,f=this.options,e;this.uiDialog.draggable({cancel:".ui-dialog-content",handle:".ui-dialog-titlebar",containment:"document",start:function(){e=f.height;c(this).height(c(this).height()).addClass("ui-dialog-dragging");(f.dragStart&&f.dragStart.apply(d.element[0],arguments))},drag:function(){(f.drag&&f.drag.apply(d.element[0],arguments))},stop:function(){c(this).removeClass("ui-dialog-dragging").height(e);(f.dragStop&&f.dragStop.apply(d.element[0],arguments));c.ui.dialog.overlay.resize()}})},_makeResizable:function(g){g=(g===undefined?this.options.resizable:g);var d=this,f=this.options,e=typeof g=="string"?g:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",alsoResize:this.element,maxWidth:f.maxWidth,maxHeight:f.maxHeight,minWidth:f.minWidth,minHeight:f.minHeight,start:function(){c(this).addClass("ui-dialog-resizing");(f.resizeStart&&f.resizeStart.apply(d.element[0],arguments))},resize:function(){(f.resize&&f.resize.apply(d.element[0],arguments))},handles:e,stop:function(){c(this).removeClass("ui-dialog-resizing");f.height=c(this).height();f.width=c(this).width();(f.resizeStop&&f.resizeStop.apply(d.element[0],arguments));c.ui.dialog.overlay.resize()}}).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_position:function(i){var e=c(window),f=c(document),g=f.scrollTop(),d=f.scrollLeft(),h=g;if(c.inArray(i,["center","top","right","bottom","left"])>=0){i=[i=="right"||i=="left"?i:"center",i=="top"||i=="bottom"?i:"middle"]}if(i.constructor!=Array){i=["center","middle"]}if(i[0].constructor==Number){d+=i[0]}else{switch(i[0]){case"left":d+=0;break;case"right":d+=e.width()-this.uiDialog.outerWidth();break;default:case"center":d+=(e.width()-this.uiDialog.outerWidth())/2}}if(i[1].constructor==Number){g+=i[1]}else{switch(i[1]){case"top":g+=0;break;case"bottom":g+=e.height()-this.uiDialog.outerHeight();break;default:case"middle":g+=(e.height()-this.uiDialog.outerHeight())/2}}g=Math.max(g,h);this.uiDialog.css({top:g,left:d})},_setData:function(e,f){(b[e]&&this.uiDialog.data(b[e],f));switch(e){case"buttons":this._createButtons(f);break;case"closeText":this.uiDialogTitlebarCloseText.text(f);break;case"dialogClass":this.uiDialog.removeClass(this.options.dialogClass).addClass(a+f);break;case"draggable":(f?this._makeDraggable():this.uiDialog.draggable("destroy"));break;case"height":this.uiDialog.height(f);break;case"position":this._position(f);break;case"resizable":var d=this.uiDialog,g=this.uiDialog.is(":data(resizable)");(g&&!f&&d.resizable("destroy"));(g&&typeof f=="string"&&d.resizable("option","handles",f));(g||this._makeResizable(f));break;case"title":c(".ui-dialog-title",this.uiDialogTitlebar).html(f||"&nbsp;");break;case"width":this.uiDialog.width(f);break}c.widget.prototype._setData.apply(this,arguments)},_size:function(){var e=this.options;this.element.css({height:0,minHeight:0,width:"auto"});var d=this.uiDialog.css({height:"auto",width:e.width}).height();this.element.css({minHeight:Math.max(e.minHeight-d,0),height:e.height=="auto"?"auto":Math.max(e.height-d,0)})}});c.extend(c.ui.dialog,{version:"1.7.2",defaults:{autoOpen:true,bgiframe:false,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:"center",resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},getter:"isOpen",uuid:0,maxZ:0,getTitleId:function(d){return"ui-dialog-title-"+(d.attr("id")||++this.uuid)},overlay:function(d){this.$el=c.ui.dialog.overlay.create(d)}});c.extend(c.ui.dialog.overlay,{instances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(d){return d+".dialog-overlay"}).join(" "),create:function(e){if(this.instances.length===0){setTimeout(function(){if(c.ui.dialog.overlay.instances.length){c(document).bind(c.ui.dialog.overlay.events,function(f){var g=c(f.target).parents(".ui-dialog").css("zIndex")||0;return(g>c.ui.dialog.overlay.maxZ)})}},1);c(document).bind("keydown.dialog-overlay",function(f){(e.options.closeOnEscape&&f.keyCode&&f.keyCode==c.ui.keyCode.ESCAPE&&e.close(f))});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var d=c("<div></div>").appendTo(document.body).addClass("ui-widget-overlay").css({width:this.width(),height:this.height()});(e.options.bgiframe&&c.fn.bgiframe&&d.bgiframe());this.instances.push(d);return d},destroy:function(d){this.instances.splice(c.inArray(this.instances,d),1);if(this.instances.length===0){c([document,window]).unbind(".dialog-overlay")}d.remove();var e=0;c.each(this.instances,function(){e=Math.max(e,this.css("z-index"))});this.maxZ=e},height:function(){if(c.browser.msie&&c.browser.version<7){var e=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);var d=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);if(e<d){return c(window).height()+"px"}else{return e+"px"}}else{return c(document).height()+"px"}},width:function(){if(c.browser.msie&&c.browser.version<7){var d=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);var e=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);if(d<e){return c(window).width()+"px"}else{return d+"px"}}else{return c(document).width()+"px"}},resize:function(){var d=c([]);c.each(c.ui.dialog.overlay.instances,function(){d=d.add(this)});d.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);;
(function(a){a.widget("ui.slider",a.extend({},a.ui.mouse,{_init:function(){var b=this,c=this.options;this._keySliding=false;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");this.range=a([]);if(c.range){if(c.range===true){this.range=a("<div></div>");if(!c.values){c.values=[this._valueMin(),this._valueMin()]}if(c.values.length&&c.values.length!=2){c.values=[c.values[0],c.values[0]]}}else{this.range=a("<div></div>")}this.range.appendTo(this.element).addClass("ui-slider-range");if(c.range=="min"||c.range=="max"){this.range.addClass("ui-slider-range-"+c.range)}this.range.addClass("ui-widget-header")}if(a(".ui-slider-handle",this.element).length==0){a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")}if(c.values&&c.values.length){while(a(".ui-slider-handle",this.element).length<c.values.length){a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")}}this.handles=a(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(d){d.preventDefault()}).hover(function(){if(!c.disabled){a(this).addClass("ui-state-hover")}},function(){a(this).removeClass("ui-state-hover")}).focus(function(){if(!c.disabled){a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");a(this).addClass("ui-state-focus")}else{a(this).blur()}}).blur(function(){a(this).removeClass("ui-state-focus")});this.handles.each(function(d){a(this).data("index.ui-slider-handle",d)});this.handles.keydown(function(i){var f=true;var e=a(this).data("index.ui-slider-handle");if(b.options.disabled){return}switch(i.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:f=false;if(!b._keySliding){b._keySliding=true;a(this).addClass("ui-state-active");b._start(i,e)}break}var g,d,h=b._step();if(b.options.values&&b.options.values.length){g=d=b.values(e)}else{g=d=b.value()}switch(i.keyCode){case a.ui.keyCode.HOME:d=b._valueMin();break;case a.ui.keyCode.END:d=b._valueMax();break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g==b._valueMax()){return}d=g+h;break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g==b._valueMin()){return}d=g-h;break}b._slide(i,e,d);return f}).keyup(function(e){var d=a(this).data("index.ui-slider-handle");if(b._keySliding){b._stop(e,d);b._change(e,d);b._keySliding=false;a(this).removeClass("ui-state-active")}});this._refreshValue()},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy()},_mouseCapture:function(d){var e=this.options;if(e.disabled){return false}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();var h={x:d.pageX,y:d.pageY};var j=this._normValueFromMouse(h);var c=this._valueMax()-this._valueMin()+1,f;var k=this,i;this.handles.each(function(l){var m=Math.abs(j-k.values(l));if(c>m){c=m;f=a(this);i=l}});if(e.range==true&&this.values(1)==e.min){f=a(this.handles[++i])}this._start(d,i);k._handleIndex=i;f.addClass("ui-state-active").focus();var g=f.offset();var b=!a(d.target).parents().andSelf().is(".ui-slider-handle");this._clickOffset=b?{left:0,top:0}:{left:d.pageX-g.left-(f.width()/2),top:d.pageY-g.top-(f.height()/2)-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)};j=this._normValueFromMouse(h);this._slide(d,i,j);return true},_mouseStart:function(b){return true},_mouseDrag:function(d){var b={x:d.pageX,y:d.pageY};var c=this._normValueFromMouse(b);this._slide(d,this._handleIndex,c);return false},_mouseStop:function(b){this.handles.removeClass("ui-state-active");this._stop(b,this._handleIndex);this._change(b,this._handleIndex);this._handleIndex=null;this._clickOffset=null;return false},_detectOrientation:function(){this.orientation=this.options.orientation=="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(d){var c,h;if("horizontal"==this.orientation){c=this.elementSize.width;h=d.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{c=this.elementSize.height;h=d.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}var f=(h/c);if(f>1){f=1}if(f<0){f=0}if("vertical"==this.orientation){f=1-f}var e=this._valueMax()-this._valueMin(),i=f*e,b=i%this.options.step,g=this._valueMin()+i-b;if(b>(this.options.step/2)){g+=this.options.step}return parseFloat(g.toFixed(5))},_start:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("start",d,b)},_slide:function(f,e,d){var g=this.handles[e];if(this.options.values&&this.options.values.length){var b=this.values(e?0:1);if((this.options.values.length==2&&this.options.range===true)&&((e==0&&d>b)||(e==1&&d<b))){d=b}if(d!=this.values(e)){var c=this.values();c[e]=d;var h=this._trigger("slide",f,{handle:this.handles[e],value:d,values:c});var b=this.values(e?0:1);if(h!==false){this.values(e,d,(f.type=="mousedown"&&this.options.animate),true)}}}else{if(d!=this.value()){var h=this._trigger("slide",f,{handle:this.handles[e],value:d});if(h!==false){this._setData("value",d,(f.type=="mousedown"&&this.options.animate))}}}},_stop:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("stop",d,b)},_change:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("change",d,b)},value:function(b){if(arguments.length){this._setData("value",b);this._change(null,0)}return this._value()},values:function(b,e,c,d){if(arguments.length>1){this.options.values[b]=e;this._refreshValue(c);if(!d){this._change(null,b)}}if(arguments.length){if(this.options.values&&this.options.values.length){return this._values(b)}else{return this.value()}}else{return this._values()}},_setData:function(b,d,c){a.widget.prototype._setData.apply(this,arguments);switch(b){case"disabled":if(d){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled")}else{this.handles.removeAttr("disabled")}case"orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue(c);break;case"value":this._refreshValue(c);break}},_step:function(){var b=this.options.step;return b},_value:function(){var b=this.options.value;if(b<this._valueMin()){b=this._valueMin()}if(b>this._valueMax()){b=this._valueMax()}return b},_values:function(b){if(arguments.length){var c=this.options.values[b];if(c<this._valueMin()){c=this._valueMin()}if(c>this._valueMax()){c=this._valueMax()}return c}else{return this.options.values}},_valueMin:function(){var b=this.options.min;return b},_valueMax:function(){var b=this.options.max;return b},_refreshValue:function(c){var f=this.options.range,d=this.options,l=this;if(this.options.values&&this.options.values.length){var i,h;this.handles.each(function(p,n){var o=(l.values(p)-l._valueMin())/(l._valueMax()-l._valueMin())*100;var m={};m[l.orientation=="horizontal"?"left":"bottom"]=o+"%";a(this).stop(1,1)[c?"animate":"css"](m,d.animate);if(l.options.range===true){if(l.orientation=="horizontal"){(p==0)&&l.range.stop(1,1)[c?"animate":"css"]({left:o+"%"},d.animate);(p==1)&&l.range[c?"animate":"css"]({width:(o-lastValPercent)+"%"},{queue:false,duration:d.animate})}else{(p==0)&&l.range.stop(1,1)[c?"animate":"css"]({bottom:(o)+"%"},d.animate);(p==1)&&l.range[c?"animate":"css"]({height:(o-lastValPercent)+"%"},{queue:false,duration:d.animate})}}lastValPercent=o})}else{var j=this.value(),g=this._valueMin(),k=this._valueMax(),e=k!=g?(j-g)/(k-g)*100:0;var b={};b[l.orientation=="horizontal"?"left":"bottom"]=e+"%";this.handle.stop(1,1)[c?"animate":"css"](b,d.animate);(f=="min")&&(this.orientation=="horizontal")&&this.range.stop(1,1)[c?"animate":"css"]({width:e+"%"},d.animate);(f=="max")&&(this.orientation=="horizontal")&&this.range[c?"animate":"css"]({width:(100-e)+"%"},{queue:false,duration:d.animate});(f=="min")&&(this.orientation=="vertical")&&this.range.stop(1,1)[c?"animate":"css"]({height:e+"%"},d.animate);(f=="max")&&(this.orientation=="vertical")&&this.range[c?"animate":"css"]({height:(100-e)+"%"},{queue:false,duration:d.animate})}}}));a.extend(a.ui.slider,{getter:"value values",version:"1.7.2",eventPrefix:"slide",defaults:{animate:false,delay:0,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null}})})(jQuery);;
(function(a){a.widget("ui.tabs",{_init:function(){if(this.options.deselectable!==undefined){this.options.collapsible=this.options.deselectable}this._tabify(true)},_setData:function(b,c){if(b=="selected"){if(this.options.collapsible&&c==this.options.selected){return}this.select(c)}else{this.options[b]=c;if(b=="deselectable"){this.options.collapsible=c}this._tabify()}},_tabId:function(b){return b.title&&b.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+a.data(b)},_sanitizeSelector:function(b){return b.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+a.data(this.list[0]));return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(c,b){return{tab:c,panel:b,index:this.anchors.index(c)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(n){this.list=this.element.children("ul:first");this.lis=a("li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return a("a",this)[0]});this.panels=a([]);var p=this,d=this.options;var c=/^#.+/;this.anchors.each(function(r,o){var q=a(o).attr("href");var s=q.split("#")[0],u;if(s&&(s===location.toString().split("#")[0]||(u=a("base")[0])&&s===u.href)){q=o.hash;o.href=q}if(c.test(q)){p.panels=p.panels.add(p._sanitizeSelector(q))}else{if(q!="#"){a.data(o,"href.tabs",q);a.data(o,"load.tabs",q.replace(/#.*$/,""));var w=p._tabId(o);o.href="#"+w;var v=a("#"+w);if(!v.length){v=a(d.panelTemplate).attr("id",w).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(p.panels[r-1]||p.list);v.data("destroy.tabs",true)}p.panels=p.panels.add(v)}else{d.disabled.push(r)}}});if(n){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(d.selected===undefined){if(location.hash){this.anchors.each(function(q,o){if(o.hash==location.hash){d.selected=q;return false}})}if(typeof d.selected!="number"&&d.cookie){d.selected=parseInt(p._cookie(),10)}if(typeof d.selected!="number"&&this.lis.filter(".ui-tabs-selected").length){d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))}d.selected=d.selected||0}else{if(d.selected===null){d.selected=-1}}d.selected=((d.selected>=0&&this.anchors[d.selected])||d.selected<0)?d.selected:0;d.disabled=a.unique(d.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(q,o){return p.lis.index(q)}))).sort();if(a.inArray(d.selected,d.disabled)!=-1){d.disabled.splice(a.inArray(d.selected,d.disabled),1)}this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");if(d.selected>=0&&this.anchors.length){this.panels.eq(d.selected).removeClass("ui-tabs-hide");this.lis.eq(d.selected).addClass("ui-tabs-selected ui-state-active");p.element.queue("tabs",function(){p._trigger("show",null,p._ui(p.anchors[d.selected],p.panels[d.selected]))});this.load(d.selected)}a(window).bind("unload",function(){p.lis.add(p.anchors).unbind(".tabs");p.lis=p.anchors=p.panels=null})}else{d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))}this.element[d.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");if(d.cookie){this._cookie(d.selected,d.cookie)}for(var g=0,m;(m=this.lis[g]);g++){a(m)[a.inArray(g,d.disabled)!=-1&&!a(m).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")}if(d.cache===false){this.anchors.removeData("cache.tabs")}this.lis.add(this.anchors).unbind(".tabs");if(d.event!="mouseover"){var f=function(o,i){if(i.is(":not(.ui-state-disabled)")){i.addClass("ui-state-"+o)}};var j=function(o,i){i.removeClass("ui-state-"+o)};this.lis.bind("mouseover.tabs",function(){f("hover",a(this))});this.lis.bind("mouseout.tabs",function(){j("hover",a(this))});this.anchors.bind("focus.tabs",function(){f("focus",a(this).closest("li"))});this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var b,h;if(d.fx){if(a.isArray(d.fx)){b=d.fx[0];h=d.fx[1]}else{b=h=d.fx}}function e(i,o){i.css({display:""});if(a.browser.msie&&o.opacity){i[0].style.removeAttribute("filter")}}var k=h?function(i,o){a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.hide().removeClass("ui-tabs-hide").animate(h,h.duration||"normal",function(){e(o,h);p._trigger("show",null,p._ui(i,o[0]))})}:function(i,o){a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.removeClass("ui-tabs-hide");p._trigger("show",null,p._ui(i,o[0]))};var l=b?function(o,i){i.animate(b,b.duration||"normal",function(){p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");e(i,b);p.element.dequeue("tabs")})}:function(o,i,q){p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");p.element.dequeue("tabs")};this.anchors.bind(d.event+".tabs",function(){var o=this,r=a(this).closest("li"),i=p.panels.filter(":not(.ui-tabs-hide)"),q=a(p._sanitizeSelector(this.hash));if((r.hasClass("ui-tabs-selected")&&!d.collapsible)||r.hasClass("ui-state-disabled")||r.hasClass("ui-state-processing")||p._trigger("select",null,p._ui(this,q[0]))===false){this.blur();return false}d.selected=p.anchors.index(this);p.abort();if(d.collapsible){if(r.hasClass("ui-tabs-selected")){d.selected=-1;if(d.cookie){p._cookie(d.selected,d.cookie)}p.element.queue("tabs",function(){l(o,i)}).dequeue("tabs");this.blur();return false}else{if(!i.length){if(d.cookie){p._cookie(d.selected,d.cookie)}p.element.queue("tabs",function(){k(o,q)});p.load(p.anchors.index(this));this.blur();return false}}}if(d.cookie){p._cookie(d.selected,d.cookie)}if(q.length){if(i.length){p.element.queue("tabs",function(){l(o,i)})}p.element.queue("tabs",function(){k(o,q)});p.load(p.anchors.index(this))}else{throw"jQuery UI Tabs: Mismatching fragment identifier."}if(a.browser.msie){this.blur()}});this.anchors.bind("click.tabs",function(){return false})},destroy:function(){var b=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var c=a.data(this,"href.tabs");if(c){this.href=c}var d=a(this).unbind(".tabs");a.each(["href","load","cache"],function(e,f){d.removeData(f+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){if(a.data(this,"destroy.tabs")){a(this).remove()}else{a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))}});if(b.cookie){this._cookie(null,b.cookie)}},add:function(e,d,c){if(c===undefined){c=this.anchors.length}var b=this,g=this.options,i=a(g.tabTemplate.replace(/#\{href\}/g,e).replace(/#\{label\}/g,d)),h=!e.indexOf("#")?e.replace("#",""):this._tabId(a("a",i)[0]);i.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var f=a("#"+h);if(!f.length){f=a(g.panelTemplate).attr("id",h).data("destroy.tabs",true)}f.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(c>=this.lis.length){i.appendTo(this.list);f.appendTo(this.list[0].parentNode)}else{i.insertBefore(this.lis[c]);f.insertBefore(this.panels[c])}g.disabled=a.map(g.disabled,function(k,j){return k>=c?++k:k});this._tabify();if(this.anchors.length==1){i.addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){b._trigger("show",null,b._ui(b.anchors[0],b.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[c],this.panels[c]))},remove:function(b){var d=this.options,e=this.lis.eq(b).remove(),c=this.panels.eq(b).remove();if(e.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(b+(b+1<this.anchors.length?1:-1))}d.disabled=a.map(a.grep(d.disabled,function(g,f){return g!=b}),function(g,f){return g>=b?--g:g});this._tabify();this._trigger("remove",null,this._ui(e.find("a")[0],c[0]))},enable:function(b){var c=this.options;if(a.inArray(b,c.disabled)==-1){return}this.lis.eq(b).removeClass("ui-state-disabled");c.disabled=a.grep(c.disabled,function(e,d){return e!=b});this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]))},disable:function(c){var b=this,d=this.options;if(c!=d.selected){this.lis.eq(c).addClass("ui-state-disabled");d.disabled.push(c);d.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[c],this.panels[c]))}},select:function(b){if(typeof b=="string"){b=this.anchors.index(this.anchors.filter("[href$="+b+"]"))}else{if(b===null){b=-1}}if(b==-1&&this.options.collapsible){b=this.options.selected}this.anchors.eq(b).trigger(this.options.event+".tabs")},load:function(e){var c=this,g=this.options,b=this.anchors.eq(e)[0],d=a.data(b,"load.tabs");this.abort();if(!d||this.element.queue("tabs").length!==0&&a.data(b,"cache.tabs")){this.element.dequeue("tabs");return}this.lis.eq(e).addClass("ui-state-processing");if(g.spinner){var f=a("span",b);f.data("label.tabs",f.html()).html(g.spinner)}this.xhr=a.ajax(a.extend({},g.ajaxOptions,{url:d,success:function(i,h){a(c._sanitizeSelector(b.hash)).html(i);c._cleanup();if(g.cache){a.data(b,"cache.tabs",true)}c._trigger("load",null,c._ui(c.anchors[e],c.panels[e]));try{g.ajaxOptions.success(i,h)}catch(j){}c.element.dequeue("tabs")}}))},abort:function(){this.element.queue([]);this.panels.stop(false,true);if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup()},url:function(c,b){this.anchors.eq(c).removeData("cache.tabs").data("load.tabs",b)},length:function(){return this.anchors.length}});a.extend(a.ui.tabs,{version:"1.7.2",getter:"length",defaults:{ajaxOptions:null,cache:false,cookie:null,collapsible:false,disabled:[],event:"click",fx:null,idPrefix:"ui-tabs-",panelTemplate:"<div></div>",spinner:"<em>Loading&#8230;</em>",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'}});a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(d,f){var b=this,g=this.options;var c=b._rotate||(b._rotate=function(h){clearTimeout(b.rotation);b.rotation=setTimeout(function(){var i=g.selected;b.select(++i<b.anchors.length?i:0)},d);if(h){h.stopPropagation()}});var e=b._unrotate||(b._unrotate=!f?function(h){if(h.clientX){b.rotate(null)}}:function(h){t=g.selected;c()});if(d){this.element.bind("tabsshow",c);this.anchors.bind(g.event+".tabs",e);c()}else{clearTimeout(b.rotation);this.element.unbind("tabsshow",c);this.anchors.unbind(g.event+".tabs",e);delete this._rotate;delete this._unrotate}}})})(jQuery);;
(function($){$.extend($.ui,{datepicker:{version:"1.7.2"}});var PROP_NAME="datepicker";function Datepicker(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._datepickerShowing=false;this._inDialog=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass="ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],dateFormat:"mm/dd/yy",firstDay:0,isRTL:false};this._defaults={showOn:"focus",showAnim:"show",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,showMonthAfterYear:false,yearRange:"-10:+10",showOtherMonths:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"normal",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false};$.extend(this._defaults,this.regional[""]);this.dpDiv=$('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')}$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",log:function(){if(this.debug){console.log.apply("",arguments)}},setDefaults:function(settings){extendRemove(this._defaults,settings||{});return this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase();var inline=(nodeName=="div"||nodeName=="span");if(!target.id){target.id="dp"+(++this.uuid)}var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{});if(nodeName=="input"){this._connectDatepicker(target,inst)}else{if(inline){this._inlineDatepicker(target,inst)}}},_newInst:function(target,inline){var id=target[0].id.replace(/([:\[\]\.])/g,"\\\\$1");return{id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline?this.dpDiv:$('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}},_connectDatepicker:function(target,inst){var input=$(target);inst.append=$([]);inst.trigger=$([]);if(input.hasClass(this.markerClassName)){return}var appendText=this._get(inst,"appendText");var isRTL=this._get(inst,"isRTL");if(appendText){inst.append=$('<span class="'+this._appendClass+'">'+appendText+"</span>");input[isRTL?"before":"after"](inst.append)}var showOn=this._get(inst,"showOn");if(showOn=="focus"||showOn=="both"){input.focus(this._showDatepicker)}if(showOn=="button"||showOn=="both"){var buttonText=this._get(inst,"buttonText");var buttonImage=this._get(inst,"buttonImage");inst.trigger=$(this._get(inst,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage==""?buttonText:$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));input[isRTL?"before":"after"](inst.trigger);inst.trigger.click(function(){if($.datepicker._datepickerShowing&&$.datepicker._lastInput==target){$.datepicker._hideDatepicker()}else{$.datepicker._showDatepicker(target)}return false})}input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value}).bind("getData.datepicker",function(event,key){return this._get(inst,key)});$.data(target,PROP_NAME,inst)},_inlineDatepicker:function(target,inst){var divSpan=$(target);if(divSpan.hasClass(this.markerClassName)){return}divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value}).bind("getData.datepicker",function(event,key){return this._get(inst,key)});$.data(target,PROP_NAME,inst);this._setDate(inst,this._getDefaultDate(inst));this._updateDatepicker(inst);this._updateAlternate(inst)},_dialogDatepicker:function(input,dateText,onSelect,settings,pos){var inst=this._dialogInst;if(!inst){var id="dp"+(++this.uuid);this._dialogInput=$('<input type="text" id="'+id+'" size="1" style="position: absolute; top: -100px;"/>');this._dialogInput.keydown(this._doKeyDown);$("body").append(this._dialogInput);inst=this._dialogInst=this._newInst(this._dialogInput,false);inst.settings={};$.data(this._dialogInput[0],PROP_NAME,inst)}extendRemove(inst.settings,settings||{});this._dialogInput.val(dateText);this._pos=(pos?(pos.length?pos:[pos.pageX,pos.pageY]):null);if(!this._pos){var browserWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;var browserHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[(browserWidth/2)-100+scrollX,(browserHeight/2)-150+scrollY]}this._dialogInput.css("left",this._pos[0]+"px").css("top",this._pos[1]+"px");inst.settings.onSelect=onSelect;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);if($.blockUI){$.blockUI(this.dpDiv)}$.data(this._dialogInput[0],PROP_NAME,inst);return this},_destroyDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();$.removeData(target,PROP_NAME);if(nodeName=="input"){inst.append.remove();inst.trigger.remove();$target.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress)}else{if(nodeName=="div"||nodeName=="span"){$target.removeClass(this.markerClassName).empty()}}},_enableDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=false;inst.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);inline.children().removeClass("ui-state-disabled")}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)})},_disableDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=true;inst.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);inline.children().addClass("ui-state-disabled")}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)});this._disabledInputs[this._disabledInputs.length]=target},_isDisabledDatepicker:function(target){if(!target){return false}for(var i=0;i<this._disabledInputs.length;i++){if(this._disabledInputs[i]==target){return true}}return false},_getInst:function(target){try{return $.data(target,PROP_NAME)}catch(err){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(target,name,value){var inst=this._getInst(target);if(arguments.length==2&&typeof name=="string"){return(name=="defaults"?$.extend({},$.datepicker._defaults):(inst?(name=="all"?$.extend({},inst.settings):this._get(inst,name)):null))}var settings=name||{};if(typeof name=="string"){settings={};settings[name]=value}if(inst){if(this._curInst==inst){this._hideDatepicker(null)}var date=this._getDateDatepicker(target);extendRemove(inst.settings,settings);this._setDateDatepicker(target,date);this._updateDatepicker(inst)}},_changeDatepicker:function(target,name,value){this._optionDatepicker(target,name,value)},_refreshDatepicker:function(target){var inst=this._getInst(target);if(inst){this._updateDatepicker(inst)}},_setDateDatepicker:function(target,date,endDate){var inst=this._getInst(target);if(inst){this._setDate(inst,date,endDate);this._updateDatepicker(inst);this._updateAlternate(inst)}},_getDateDatepicker:function(target){var inst=this._getInst(target);if(inst&&!inst.inline){this._setDateFromField(inst)}return(inst?this._getDate(inst):null)},_doKeyDown:function(event){var inst=$.datepicker._getInst(event.target);var handled=true;var isRTL=inst.dpDiv.is(".ui-datepicker-rtl");inst._keyEvent=true;if($.datepicker._datepickerShowing){switch(event.keyCode){case 9:$.datepicker._hideDatepicker(null,"");break;case 13:var sel=$("td."+$.datepicker._dayOverClass+", td."+$.datepicker._currentClass,inst.dpDiv);if(sel[0]){$.datepicker._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0])}else{$.datepicker._hideDatepicker(null,$.datepicker._get(inst,"duration"))}return false;break;case 27:$.datepicker._hideDatepicker(null,$.datepicker._get(inst,"duration"));break;case 33:$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M");break;case 34:$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M");break;case 35:if(event.ctrlKey||event.metaKey){$.datepicker._clearDate(event.target)}handled=event.ctrlKey||event.metaKey;break;case 36:if(event.ctrlKey||event.metaKey){$.datepicker._gotoToday(event.target)}handled=event.ctrlKey||event.metaKey;break;case 37:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?+1:-1),"D")}handled=event.ctrlKey||event.metaKey;if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M")}break;case 38:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,-7,"D")}handled=event.ctrlKey||event.metaKey;break;case 39:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?-1:+1),"D")}handled=event.ctrlKey||event.metaKey;if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M")}break;case 40:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,+7,"D")}handled=event.ctrlKey||event.metaKey;break;default:handled=false}}else{if(event.keyCode==36&&event.ctrlKey){$.datepicker._showDatepicker(this)}else{handled=false}}if(handled){event.preventDefault();event.stopPropagation()}},_doKeyPress:function(event){var inst=$.datepicker._getInst(event.target);if($.datepicker._get(inst,"constrainInput")){var chars=$.datepicker._possibleChars($.datepicker._get(inst,"dateFormat"));var chr=String.fromCharCode(event.charCode==undefined?event.keyCode:event.charCode);return event.ctrlKey||(chr<" "||!chars||chars.indexOf(chr)>-1)}},_showDatepicker:function(input){input=input.target||input;if(input.nodeName.toLowerCase()!="input"){input=$("input",input.parentNode)[0]}if($.datepicker._isDisabledDatepicker(input)||$.datepicker._lastInput==input){return}var inst=$.datepicker._getInst(input);var beforeShow=$.datepicker._get(inst,"beforeShow");extendRemove(inst.settings,(beforeShow?beforeShow.apply(input,[input,inst]):{}));$.datepicker._hideDatepicker(null,"");$.datepicker._lastInput=input;$.datepicker._setDateFromField(inst);if($.datepicker._inDialog){input.value=""}if(!$.datepicker._pos){$.datepicker._pos=$.datepicker._findPos(input);$.datepicker._pos[1]+=input.offsetHeight}var isFixed=false;$(input).parents().each(function(){isFixed|=$(this).css("position")=="fixed";return !isFixed});if(isFixed&&$.browser.opera){$.datepicker._pos[0]-=document.documentElement.scrollLeft;$.datepicker._pos[1]-=document.documentElement.scrollTop}var offset={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null;inst.rangeStart=null;inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});$.datepicker._updateDatepicker(inst);offset=$.datepicker._checkOffset(inst,offset,isFixed);inst.dpDiv.css({position:($.datepicker._inDialog&&$.blockUI?"static":(isFixed?"fixed":"absolute")),display:"none",left:offset.left+"px",top:offset.top+"px"});if(!inst.inline){var showAnim=$.datepicker._get(inst,"showAnim")||"show";var duration=$.datepicker._get(inst,"duration");var postProcess=function(){$.datepicker._datepickerShowing=true;if($.browser.msie&&parseInt($.browser.version,10)<7){$("iframe.ui-datepicker-cover").css({width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4})}};if($.effects&&$.effects[showAnim]){inst.dpDiv.show(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)}else{inst.dpDiv[showAnim](duration,postProcess)}if(duration==""){postProcess()}if(inst.input[0].type!="hidden"){inst.input[0].focus()}$.datepicker._curInst=inst}},_updateDatepicker:function(inst){var dims={width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4};var self=this;inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({width:dims.width,height:dims.height}).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",function(){$(this).removeClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).removeClass("ui-datepicker-prev-hover")}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).removeClass("ui-datepicker-next-hover")}}).bind("mouseover",function(){if(!self._isDisabledDatepicker(inst.inline?inst.dpDiv.parent()[0]:inst.input[0])){$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");$(this).addClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).addClass("ui-datepicker-prev-hover")}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).addClass("ui-datepicker-next-hover")}}}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end();var numMonths=this._getNumberOfMonths(inst);var cols=numMonths[1];var width=17;if(cols>1){inst.dpDiv.addClass("ui-datepicker-multi-"+cols).css("width",(width*cols)+"em")}else{inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")}inst.dpDiv[(numMonths[0]!=1||numMonths[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");inst.dpDiv[(this._get(inst,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");if(inst.input&&inst.input[0].type!="hidden"&&inst==$.datepicker._curInst){$(inst.input[0]).focus()}},_checkOffset:function(inst,offset,isFixed){var dpWidth=inst.dpDiv.outerWidth();var dpHeight=inst.dpDiv.outerHeight();var inputWidth=inst.input?inst.input.outerWidth():0;var inputHeight=inst.input?inst.input.outerHeight():0;var viewWidth=(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)+$(document).scrollLeft();var viewHeight=(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight)+$(document).scrollTop();offset.left-=(this._get(inst,"isRTL")?(dpWidth-inputWidth):0);offset.left-=(isFixed&&offset.left==inst.input.offset().left)?$(document).scrollLeft():0;offset.top-=(isFixed&&offset.top==(inst.input.offset().top+inputHeight))?$(document).scrollTop():0;offset.left-=(offset.left+dpWidth>viewWidth&&viewWidth>dpWidth)?Math.abs(offset.left+dpWidth-viewWidth):0;offset.top-=(offset.top+dpHeight>viewHeight&&viewHeight>dpHeight)?Math.abs(offset.top+dpHeight+inputHeight*2-viewHeight):0;return offset},_findPos:function(obj){while(obj&&(obj.type=="hidden"||obj.nodeType!=1)){obj=obj.nextSibling}var position=$(obj).offset();return[position.left,position.top]},_hideDatepicker:function(input,duration){var inst=this._curInst;if(!inst||(input&&inst!=$.data(input,PROP_NAME))){return}if(inst.stayOpen){this._selectDate("#"+inst.id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear))}inst.stayOpen=false;if(this._datepickerShowing){duration=(duration!=null?duration:this._get(inst,"duration"));var showAnim=this._get(inst,"showAnim");var postProcess=function(){$.datepicker._tidyDialog(inst)};if(duration!=""&&$.effects&&$.effects[showAnim]){inst.dpDiv.hide(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)}else{inst.dpDiv[(duration==""?"hide":(showAnim=="slideDown"?"slideUp":(showAnim=="fadeIn"?"fadeOut":"hide")))](duration,postProcess)}if(duration==""){this._tidyDialog(inst)}var onClose=this._get(inst,"onClose");if(onClose){onClose.apply((inst.input?inst.input[0]:null),[(inst.input?inst.input.val():""),inst])}this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if($.blockUI){$.unblockUI();$("body").append(this.dpDiv)}}this._inDialog=false}this._curInst=null},_tidyDialog:function(inst){inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(event){if(!$.datepicker._curInst){return}var $target=$(event.target);if(($target.parents("#"+$.datepicker._mainDivId).length==0)&&!$target.hasClass($.datepicker.markerClassName)&&!$target.hasClass($.datepicker._triggerClass)&&$.datepicker._datepickerShowing&&!($.datepicker._inDialog&&$.blockUI)){$.datepicker._hideDatepicker(null,"")}},_adjustDate:function(id,offset,period){var target=$(id);var inst=this._getInst(target[0]);if(this._isDisabledDatepicker(target[0])){return}this._adjustInstDate(inst,offset+(period=="M"?this._get(inst,"showCurrentAtPos"):0),period);this._updateDatepicker(inst)},_gotoToday:function(id){var target=$(id);var inst=this._getInst(target[0]);if(this._get(inst,"gotoCurrent")&&inst.currentDay){inst.selectedDay=inst.currentDay;inst.drawMonth=inst.selectedMonth=inst.currentMonth;inst.drawYear=inst.selectedYear=inst.currentYear}else{var date=new Date();inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear()}this._notifyChange(inst);this._adjustDate(target)},_selectMonthYear:function(id,select,period){var target=$(id);var inst=this._getInst(target[0]);inst._selectingMonthYear=false;inst["selected"+(period=="M"?"Month":"Year")]=inst["draw"+(period=="M"?"Month":"Year")]=parseInt(select.options[select.selectedIndex].value,10);this._notifyChange(inst);this._adjustDate(target)},_clickMonthYear:function(id){var target=$(id);var inst=this._getInst(target[0]);if(inst.input&&inst._selectingMonthYear&&!$.browser.msie){inst.input[0].focus()}inst._selectingMonthYear=!inst._selectingMonthYear},_selectDay:function(id,month,year,td){var target=$(id);if($(td).hasClass(this._unselectableClass)||this._isDisabledDatepicker(target[0])){return}var inst=this._getInst(target[0]);inst.selectedDay=inst.currentDay=$("a",td).html();inst.selectedMonth=inst.currentMonth=month;inst.selectedYear=inst.currentYear=year;if(inst.stayOpen){inst.endDay=inst.endMonth=inst.endYear=null}this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear));if(inst.stayOpen){inst.rangeStart=this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay));this._updateDatepicker(inst)}},_clearDate:function(id){var target=$(id);var inst=this._getInst(target[0]);inst.stayOpen=false;inst.endDay=inst.endMonth=inst.endYear=inst.rangeStart=null;this._selectDate(target,"")},_selectDate:function(id,dateStr){var target=$(id);var inst=this._getInst(target[0]);dateStr=(dateStr!=null?dateStr:this._formatDate(inst));if(inst.input){inst.input.val(dateStr)}this._updateAlternate(inst);var onSelect=this._get(inst,"onSelect");if(onSelect){onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])}else{if(inst.input){inst.input.trigger("change")}}if(inst.inline){this._updateDatepicker(inst)}else{if(!inst.stayOpen){this._hideDatepicker(null,this._get(inst,"duration"));this._lastInput=inst.input[0];if(typeof(inst.input[0])!="object"){inst.input[0].focus()}this._lastInput=null}}},_updateAlternate:function(inst){var altField=this._get(inst,"altField");if(altField){var altFormat=this._get(inst,"altFormat")||this._get(inst,"dateFormat");var date=this._getDate(inst);dateStr=this.formatDate(altFormat,date,this._getFormatConfig(inst));$(altField).each(function(){$(this).val(dateStr)})}},noWeekends:function(date){var day=date.getDay();return[(day>0&&day<6),""]},iso8601Week:function(date){var checkDate=new Date(date.getFullYear(),date.getMonth(),date.getDate());var firstMon=new Date(checkDate.getFullYear(),1-1,4);var firstDay=firstMon.getDay()||7;firstMon.setDate(firstMon.getDate()+1-firstDay);if(firstDay<4&&checkDate<firstMon){checkDate.setDate(checkDate.getDate()-3);return $.datepicker.iso8601Week(checkDate)}else{if(checkDate>new Date(checkDate.getFullYear(),12-1,28)){firstDay=new Date(checkDate.getFullYear()+1,1-1,4).getDay()||7;if(firstDay>4&&(checkDate.getDay()||7)<firstDay-3){return 1}}}return Math.floor(((checkDate-firstMon)/86400000)/7)+1},parseDate:function(format,value,settings){if(format==null||value==null){throw"Invalid arguments"}value=(typeof value=="object"?value.toString():value+"");if(value==""){return null}var shortYearCutoff=(settings?settings.shortYearCutoff:null)||this._defaults.shortYearCutoff;var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var year=-1;var month=-1;var day=-1;var doy=-1;var literal=false;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};var getNumber=function(match){lookAhead(match);var origSize=(match=="@"?14:(match=="y"?4:(match=="o"?3:2)));var size=origSize;var num=0;while(size>0&&iValue<value.length&&value.charAt(iValue)>="0"&&value.charAt(iValue)<="9"){num=num*10+parseInt(value.charAt(iValue++),10);size--}if(size==origSize){throw"Missing number at position "+iValue}return num};var getName=function(match,shortNames,longNames){var names=(lookAhead(match)?longNames:shortNames);var size=0;for(var j=0;j<names.length;j++){size=Math.max(size,names[j].length)}var name="";var iInit=iValue;while(size>0&&iValue<value.length){name+=value.charAt(iValue++);for(var i=0;i<names.length;i++){if(name==names[i]){return i+1}}size--}throw"Unknown name at position "+iInit};var checkLiteral=function(){if(value.charAt(iValue)!=format.charAt(iFormat)){throw"Unexpected literal at position "+iValue}iValue++};var iValue=0;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{checkLiteral()}}else{switch(format.charAt(iFormat)){case"d":day=getNumber("d");break;case"D":getName("D",dayNamesShort,dayNames);break;case"o":doy=getNumber("o");break;case"m":month=getNumber("m");break;case"M":month=getName("M",monthNamesShort,monthNames);break;case"y":year=getNumber("y");break;case"@":var date=new Date(getNumber("@"));year=date.getFullYear();month=date.getMonth()+1;day=date.getDate();break;case"'":if(lookAhead("'")){checkLiteral()}else{literal=true}break;default:checkLiteral()}}}if(year==-1){year=new Date().getFullYear()}else{if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+(year<=shortYearCutoff?0:-100)}}if(doy>-1){month=1;day=doy;do{var dim=this._getDaysInMonth(year,month-1);if(day<=dim){break}month++;day-=dim}while(true)}var date=this._daylightSavingAdjust(new Date(year,month-1,day));if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){throw"Invalid date"}return date},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TIMESTAMP:"@",W3C:"yy-mm-dd",formatDate:function(format,date,settings){if(!date){return""}var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};var formatNumber=function(match,value,len){var num=""+value;if(lookAhead(match)){while(num.length<len){num="0"+num}}return num};var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value])};var output="";var literal=false;if(date){for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{output+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":output+=formatNumber("d",date.getDate(),2);break;case"D":output+=formatName("D",date.getDay(),dayNamesShort,dayNames);break;case"o":var doy=date.getDate();for(var m=date.getMonth()-1;m>=0;m--){doy+=this._getDaysInMonth(date.getFullYear(),m)}output+=formatNumber("o",doy,3);break;case"m":output+=formatNumber("m",date.getMonth()+1,2);break;case"M":output+=formatName("M",date.getMonth(),monthNamesShort,monthNames);break;case"y":output+=(lookAhead("y")?date.getFullYear():(date.getYear()%100<10?"0":"")+date.getYear()%100);break;case"@":output+=date.getTime();break;case"'":if(lookAhead("'")){output+="'"}else{literal=true}break;default:output+=format.charAt(iFormat)}}}}return output},_possibleChars:function(format){var chars="";var literal=false;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{chars+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":case"m":case"y":case"@":chars+="0123456789";break;case"D":case"M":return null;case"'":if(lookAhead("'")){chars+="'"}else{literal=true}break;default:chars+=format.charAt(iFormat)}}}return chars},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]},_setDateFromField:function(inst){var dateFormat=this._get(inst,"dateFormat");var dates=inst.input?inst.input.val():null;inst.endDay=inst.endMonth=inst.endYear=null;var date=defaultDate=this._getDefaultDate(inst);var settings=this._getFormatConfig(inst);try{date=this.parseDate(dateFormat,dates,settings)||defaultDate}catch(event){this.log(event);date=defaultDate}inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear();inst.currentDay=(dates?date.getDate():0);inst.currentMonth=(dates?date.getMonth():0);inst.currentYear=(dates?date.getFullYear():0);this._adjustInstDate(inst)},_getDefaultDate:function(inst){var date=this._determineDate(this._get(inst,"defaultDate"),new Date());var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");date=(minDate&&date<minDate?minDate:date);date=(maxDate&&date>maxDate?maxDate:date);return date},_determineDate:function(date,defaultDate){var offsetNumeric=function(offset){var date=new Date();date.setDate(date.getDate()+offset);return date};var offsetString=function(offset,getDaysInMonth){var date=new Date();var year=date.getFullYear();var month=date.getMonth();var day=date.getDate();var pattern=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;var matches=pattern.exec(offset);while(matches){switch(matches[2]||"d"){case"d":case"D":day+=parseInt(matches[1],10);break;case"w":case"W":day+=parseInt(matches[1],10)*7;break;case"m":case"M":month+=parseInt(matches[1],10);day=Math.min(day,getDaysInMonth(year,month));break;case"y":case"Y":year+=parseInt(matches[1],10);day=Math.min(day,getDaysInMonth(year,month));break}matches=pattern.exec(offset)}return new Date(year,month,day)};date=(date==null?defaultDate:(typeof date=="string"?offsetString(date,this._getDaysInMonth):(typeof date=="number"?(isNaN(date)?defaultDate:offsetNumeric(date)):date)));date=(date&&date.toString()=="Invalid Date"?defaultDate:date);if(date){date.setHours(0);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0)}return this._daylightSavingAdjust(date)},_daylightSavingAdjust:function(date){if(!date){return null}date.setHours(date.getHours()>12?date.getHours()+2:0);return date},_setDate:function(inst,date,endDate){var clear=!(date);var origMonth=inst.selectedMonth;var origYear=inst.selectedYear;date=this._determineDate(date,new Date());inst.selectedDay=inst.currentDay=date.getDate();inst.drawMonth=inst.selectedMonth=inst.currentMonth=date.getMonth();inst.drawYear=inst.selectedYear=inst.currentYear=date.getFullYear();if(origMonth!=inst.selectedMonth||origYear!=inst.selectedYear){this._notifyChange(inst)}this._adjustInstDate(inst);if(inst.input){inst.input.val(clear?"":this._formatDate(inst))}},_getDate:function(inst){var startDate=(!inst.currentYear||(inst.input&&inst.input.val()=="")?null:this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return startDate},_generateHTML:function(inst){var today=new Date();today=this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));var isRTL=this._get(inst,"isRTL");var showButtonPanel=this._get(inst,"showButtonPanel");var hideIfNoPrevNext=this._get(inst,"hideIfNoPrevNext");var navigationAsDateFormat=this._get(inst,"navigationAsDateFormat");var numMonths=this._getNumberOfMonths(inst);var showCurrentAtPos=this._get(inst,"showCurrentAtPos");var stepMonths=this._get(inst,"stepMonths");var stepBigMonths=this._get(inst,"stepBigMonths");var isMultiMonth=(numMonths[0]!=1||numMonths[1]!=1);var currentDate=this._daylightSavingAdjust((!inst.currentDay?new Date(9999,9,9):new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");var drawMonth=inst.drawMonth-showCurrentAtPos;var drawYear=inst.drawYear;if(drawMonth<0){drawMonth+=12;drawYear--}if(maxDate){var maxDraw=this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth()-numMonths[1]+1,maxDate.getDate()));maxDraw=(minDate&&maxDraw<minDate?minDate:maxDraw);while(this._daylightSavingAdjust(new Date(drawYear,drawMonth,1))>maxDraw){drawMonth--;if(drawMonth<0){drawMonth=11;drawYear--}}}inst.drawMonth=drawMonth;inst.drawYear=drawYear;var prevText=this._get(inst,"prevText");prevText=(!navigationAsDateFormat?prevText:this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth-stepMonths,1)),this._getFormatConfig(inst)));var prev=(this._canAdjustMonth(inst,-1,drawYear,drawMonth)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#'+inst.id+"', -"+stepMonths+", 'M');\" title=\""+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>"));var nextText=this._get(inst,"nextText");nextText=(!navigationAsDateFormat?nextText:this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth+stepMonths,1)),this._getFormatConfig(inst)));var next=(this._canAdjustMonth(inst,+1,drawYear,drawMonth)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#'+inst.id+"', +"+stepMonths+", 'M');\" title=\""+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>"));var currentText=this._get(inst,"currentText");var gotoDate=(this._get(inst,"gotoCurrent")&&inst.currentDay?currentDate:today);currentText=(!navigationAsDateFormat?currentText:this.formatDate(currentText,gotoDate,this._getFormatConfig(inst)));var controls=(!inst.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">'+this._get(inst,"closeText")+"</button>":"");var buttonPanel=(showButtonPanel)?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(isRTL?controls:"")+(this._isInRange(inst,gotoDate)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery.datepicker._gotoToday(\'#'+inst.id+"');\">"+currentText+"</button>":"")+(isRTL?"":controls)+"</div>":"";var firstDay=parseInt(this._get(inst,"firstDay"),10);firstDay=(isNaN(firstDay)?0:firstDay);var dayNames=this._get(inst,"dayNames");var dayNamesShort=this._get(inst,"dayNamesShort");var dayNamesMin=this._get(inst,"dayNamesMin");var monthNames=this._get(inst,"monthNames");var monthNamesShort=this._get(inst,"monthNamesShort");var beforeShowDay=this._get(inst,"beforeShowDay");var showOtherMonths=this._get(inst,"showOtherMonths");var calculateWeek=this._get(inst,"calculateWeek")||this.iso8601Week;var endDate=inst.endDay?this._daylightSavingAdjust(new Date(inst.endYear,inst.endMonth,inst.endDay)):currentDate;var defaultDate=this._getDefaultDate(inst);var html="";for(var row=0;row<numMonths[0];row++){var group="";for(var col=0;col<numMonths[1];col++){var selectedDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));var cornerClass=" ui-corner-all";var calender="";if(isMultiMonth){calender+='<div class="ui-datepicker-group ui-datepicker-group-';switch(col){case 0:calender+="first";cornerClass=" ui-corner-"+(isRTL?"right":"left");break;case numMonths[1]-1:calender+="last";cornerClass=" ui-corner-"+(isRTL?"left":"right");break;default:calender+="middle";cornerClass="";break}calender+='">'}calender+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+cornerClass+'">'+(/all|left/.test(cornerClass)&&row==0?(isRTL?next:prev):"")+(/all|right/.test(cornerClass)&&row==0?(isRTL?prev:next):"")+this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,row>0||col>0,monthNames,monthNamesShort)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var thead="";for(var dow=0;dow<7;dow++){var day=(dow+firstDay)%7;thead+="<th"+((dow+firstDay+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+dayNames[day]+'">'+dayNamesMin[day]+"</span></th>"}calender+=thead+"</tr></thead><tbody>";var daysInMonth=this._getDaysInMonth(drawYear,drawMonth);if(drawYear==inst.selectedYear&&drawMonth==inst.selectedMonth){inst.selectedDay=Math.min(inst.selectedDay,daysInMonth)}var leadDays=(this._getFirstDayOfMonth(drawYear,drawMonth)-firstDay+7)%7;var numRows=(isMultiMonth?6:Math.ceil((leadDays+daysInMonth)/7));var printDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,1-leadDays));for(var dRow=0;dRow<numRows;dRow++){calender+="<tr>";var tbody="";for(var dow=0;dow<7;dow++){var daySettings=(beforeShowDay?beforeShowDay.apply((inst.input?inst.input[0]:null),[printDate]):[true,""]);var otherMonth=(printDate.getMonth()!=drawMonth);var unselectable=otherMonth||!daySettings[0]||(minDate&&printDate<minDate)||(maxDate&&printDate>maxDate);tbody+='<td class="'+((dow+firstDay+6)%7>=5?" ui-datepicker-week-end":"")+(otherMonth?" ui-datepicker-other-month":"")+((printDate.getTime()==selectedDate.getTime()&&drawMonth==inst.selectedMonth&&inst._keyEvent)||(defaultDate.getTime()==printDate.getTime()&&defaultDate.getTime()==selectedDate.getTime())?" "+this._dayOverClass:"")+(unselectable?" "+this._unselectableClass+" ui-state-disabled":"")+(otherMonth&&!showOtherMonths?"":" "+daySettings[1]+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" "+this._currentClass:"")+(printDate.getTime()==today.getTime()?" ui-datepicker-today":""))+'"'+((!otherMonth||showOtherMonths)&&daySettings[2]?' title="'+daySettings[2]+'"':"")+(unselectable?"":" onclick=\"DP_jQuery.datepicker._selectDay('#"+inst.id+"',"+drawMonth+","+drawYear+', this);return false;"')+">"+(otherMonth?(showOtherMonths?printDate.getDate():"&#xa0;"):(unselectable?'<span class="ui-state-default">'+printDate.getDate()+"</span>":'<a class="ui-state-default'+(printDate.getTime()==today.getTime()?" ui-state-highlight":"")+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" ui-state-active":"")+'" href="#">'+printDate.getDate()+"</a>"))+"</td>";printDate.setDate(printDate.getDate()+1);printDate=this._daylightSavingAdjust(printDate)}calender+=tbody+"</tr>"}drawMonth++;if(drawMonth>11){drawMonth=0;drawYear++}calender+="</tbody></table>"+(isMultiMonth?"</div>"+((numMonths[0]>0&&col==numMonths[1]-1)?'<div class="ui-datepicker-row-break"></div>':""):"");group+=calender}html+=group}html+=buttonPanel+($.browser.msie&&parseInt($.browser.version,10)<7&&!inst.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");inst._keyEvent=false;return html},_generateMonthYearHeader:function(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,secondary,monthNames,monthNamesShort){minDate=(inst.rangeStart&&minDate&&selectedDate<minDate?selectedDate:minDate);var changeMonth=this._get(inst,"changeMonth");var changeYear=this._get(inst,"changeYear");var showMonthAfterYear=this._get(inst,"showMonthAfterYear");var html='<div class="ui-datepicker-title">';var monthHtml="";if(secondary||!changeMonth){monthHtml+='<span class="ui-datepicker-month">'+monthNames[drawMonth]+"</span> "}else{var inMinYear=(minDate&&minDate.getFullYear()==drawYear);var inMaxYear=(maxDate&&maxDate.getFullYear()==drawYear);monthHtml+='<select class="ui-datepicker-month" onchange="DP_jQuery.datepicker._selectMonthYear(\'#'+inst.id+"', this, 'M');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#"+inst.id+"');\">";for(var month=0;month<12;month++){if((!inMinYear||month>=minDate.getMonth())&&(!inMaxYear||month<=maxDate.getMonth())){monthHtml+='<option value="'+month+'"'+(month==drawMonth?' selected="selected"':"")+">"+monthNamesShort[month]+"</option>"}}monthHtml+="</select>"}if(!showMonthAfterYear){html+=monthHtml+((secondary||changeMonth||changeYear)&&(!(changeMonth&&changeYear))?"&#xa0;":"")}if(secondary||!changeYear){html+='<span class="ui-datepicker-year">'+drawYear+"</span>"}else{var years=this._get(inst,"yearRange").split(":");var year=0;var endYear=0;if(years.length!=2){year=drawYear-10;endYear=drawYear+10}else{if(years[0].charAt(0)=="+"||years[0].charAt(0)=="-"){year=drawYear+parseInt(years[0],10);endYear=drawYear+parseInt(years[1],10)}else{year=parseInt(years[0],10);endYear=parseInt(years[1],10)}}year=(minDate?Math.max(year,minDate.getFullYear()):year);endYear=(maxDate?Math.min(endYear,maxDate.getFullYear()):endYear);html+='<select class="ui-datepicker-year" onchange="DP_jQuery.datepicker._selectMonthYear(\'#'+inst.id+"', this, 'Y');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#"+inst.id+"');\">";for(;year<=endYear;year++){html+='<option value="'+year+'"'+(year==drawYear?' selected="selected"':"")+">"+year+"</option>"}html+="</select>"}if(showMonthAfterYear){html+=(secondary||changeMonth||changeYear?"&#xa0;":"")+monthHtml}html+="</div>";return html},_adjustInstDate:function(inst,offset,period){var year=inst.drawYear+(period=="Y"?offset:0);var month=inst.drawMonth+(period=="M"?offset:0);var day=Math.min(inst.selectedDay,this._getDaysInMonth(year,month))+(period=="D"?offset:0);var date=this._daylightSavingAdjust(new Date(year,month,day));var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");date=(minDate&&date<minDate?minDate:date);date=(maxDate&&date>maxDate?maxDate:date);inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear();if(period=="M"||period=="Y"){this._notifyChange(inst)}},_notifyChange:function(inst){var onChange=this._get(inst,"onChangeMonthYear");if(onChange){onChange.apply((inst.input?inst.input[0]:null),[inst.selectedYear,inst.selectedMonth+1,inst])}},_getNumberOfMonths:function(inst){var numMonths=this._get(inst,"numberOfMonths");return(numMonths==null?[1,1]:(typeof numMonths=="number"?[1,numMonths]:numMonths))},_getMinMaxDate:function(inst,minMax,checkRange){var date=this._determineDate(this._get(inst,minMax+"Date"),null);return(!checkRange||!inst.rangeStart?date:(!date||inst.rangeStart>date?inst.rangeStart:date))},_getDaysInMonth:function(year,month){return 32-new Date(year,month,32).getDate()},_getFirstDayOfMonth:function(year,month){return new Date(year,month,1).getDay()},_canAdjustMonth:function(inst,offset,curYear,curMonth){var numMonths=this._getNumberOfMonths(inst);var date=this._daylightSavingAdjust(new Date(curYear,curMonth+(offset<0?offset:numMonths[1]),1));if(offset<0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()))}return this._isInRange(inst,date)},_isInRange:function(inst,date){var newMinDate=(!inst.rangeStart?null:this._daylightSavingAdjust(new Date(inst.selectedYear,inst.selectedMonth,inst.selectedDay)));newMinDate=(newMinDate&&inst.rangeStart<newMinDate?inst.rangeStart:newMinDate);var minDate=newMinDate||this._getMinMaxDate(inst,"min");var maxDate=this._getMinMaxDate(inst,"max");return((!minDate||date>=minDate)&&(!maxDate||date<=maxDate))},_getFormatConfig:function(inst){var shortYearCutoff=this._get(inst,"shortYearCutoff");shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,"dayNamesShort"),dayNames:this._get(inst,"dayNames"),monthNamesShort:this._get(inst,"monthNamesShort"),monthNames:this._get(inst,"monthNames")}},_formatDate:function(inst,day,month,year){if(!day){inst.currentDay=inst.selectedDay;inst.currentMonth=inst.selectedMonth;inst.currentYear=inst.selectedYear}var date=(day?(typeof day=="object"?day:this._daylightSavingAdjust(new Date(year,month,day))):this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return this.formatDate(this._get(inst,"dateFormat"),date,this._getFormatConfig(inst))}});function extendRemove(target,props){$.extend(target,props);for(var name in props){if(props[name]==null||props[name]==undefined){target[name]=props[name]}}return target}function isArray(a){return(a&&(($.browser.safari&&typeof a=="object"&&a.length)||(a.constructor&&a.constructor.toString().match(/\Array\(\)/))))}$.fn.datepicker=function(options){if(!$.datepicker.initialized){$(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);$.datepicker.initialized=true}var otherArgs=Array.prototype.slice.call(arguments,1);if(typeof options=="string"&&(options=="isDisabled"||options=="getDate")){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))}if(options=="option"&&arguments.length==2&&typeof arguments[1]=="string"){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))}return this.each(function(){typeof options=="string"?$.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this].concat(otherArgs)):$.datepicker._attachDatepicker(this,options)})};$.datepicker=new Datepicker();$.datepicker.initialized=false;$.datepicker.uuid=new Date().getTime();$.datepicker.version="1.7.2";window.DP_jQuery=$})(jQuery);;
(function(a){a.widget("ui.progressbar",{_init:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this._valueMin(),"aria-valuemax":this._valueMax(),"aria-valuenow":this._value()});this.valueDiv=a('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow").removeData("progressbar").unbind(".progressbar");this.valueDiv.remove();a.widget.prototype.destroy.apply(this,arguments)},value:function(b){if(b===undefined){return this._value()}this._setData("value",b);return this},_setData:function(b,c){switch(b){case"value":this.options.value=c;this._refreshValue();this._trigger("change",null,{});break}a.widget.prototype._setData.apply(this,arguments)},_value:function(){var b=this.options.value;if(b<this._valueMin()){b=this._valueMin()}if(b>this._valueMax()){b=this._valueMax()}return b},_valueMin:function(){var b=0;return b},_valueMax:function(){var b=100;return b},_refreshValue:function(){var b=this.value();this.valueDiv[b==this._valueMax()?"addClass":"removeClass"]("ui-corner-right");this.valueDiv.width(b+"%");this.element.attr("aria-valuenow",b)}});a.extend(a.ui.progressbar,{version:"1.7.2",defaults:{value:0}})})(jQuery);;
jQuery.effects||(function(d){d.effects={version:"1.7.2",save:function(g,h){for(var f=0;f<h.length;f++){if(h[f]!==null){g.data("ec.storage."+h[f],g[0].style[h[f]])}}},restore:function(g,h){for(var f=0;f<h.length;f++){if(h[f]!==null){g.css(h[f],g.data("ec.storage."+h[f]))}}},setMode:function(f,g){if(g=="toggle"){g=f.is(":hidden")?"show":"hide"}return g},getBaseline:function(g,h){var i,f;switch(g[0]){case"top":i=0;break;case"middle":i=0.5;break;case"bottom":i=1;break;default:i=g[0]/h.height}switch(g[1]){case"left":f=0;break;case"center":f=0.5;break;case"right":f=1;break;default:f=g[1]/h.width}return{x:f,y:i}},createWrapper:function(f){if(f.parent().is(".ui-effects-wrapper")){return f.parent()}var g={width:f.outerWidth(true),height:f.outerHeight(true),"float":f.css("float")};f.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');var j=f.parent();if(f.css("position")=="static"){j.css({position:"relative"});f.css({position:"relative"})}else{var i=f.css("top");if(isNaN(parseInt(i,10))){i="auto"}var h=f.css("left");if(isNaN(parseInt(h,10))){h="auto"}j.css({position:f.css("position"),top:i,left:h,zIndex:f.css("z-index")}).show();f.css({position:"relative",top:0,left:0})}j.css(g);return j},removeWrapper:function(f){if(f.parent().is(".ui-effects-wrapper")){return f.parent().replaceWith(f)}return f},setTransition:function(g,i,f,h){h=h||{};d.each(i,function(k,j){unit=g.cssUnit(j);if(unit[0]>0){h[j]=unit[0]*f+unit[1]}});return h},animateClass:function(h,i,k,j){var f=(typeof k=="function"?k:(j?j:null));var g=(typeof k=="string"?k:null);return this.each(function(){var q={};var o=d(this);var p=o.attr("style")||"";if(typeof p=="object"){p=p.cssText}if(h.toggle){o.hasClass(h.toggle)?h.remove=h.toggle:h.add=h.toggle}var l=d.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add){o.addClass(h.add)}if(h.remove){o.removeClass(h.remove)}var m=d.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add){o.removeClass(h.add)}if(h.remove){o.addClass(h.remove)}for(var r in m){if(typeof m[r]!="function"&&m[r]&&r.indexOf("Moz")==-1&&r.indexOf("length")==-1&&m[r]!=l[r]&&(r.match(/color/i)||(!r.match(/color/i)&&!isNaN(parseInt(m[r],10))))&&(l.position!="static"||(l.position=="static"&&!r.match(/left|top|bottom|right/)))){q[r]=m[r]}}o.animate(q,i,g,function(){if(typeof d(this).attr("style")=="object"){d(this).attr("style")["cssText"]="";d(this).attr("style")["cssText"]=p}else{d(this).attr("style",p)}if(h.add){d(this).addClass(h.add)}if(h.remove){d(this).removeClass(h.remove)}if(f){f.apply(this,arguments)}})})}};function c(g,f){var i=g[1]&&g[1].constructor==Object?g[1]:{};if(f){i.mode=f}var h=g[1]&&g[1].constructor!=Object?g[1]:(i.duration?i.duration:g[2]);h=d.fx.off?0:typeof h==="number"?h:d.fx.speeds[h]||d.fx.speeds._default;var j=i.callback||(d.isFunction(g[1])&&g[1])||(d.isFunction(g[2])&&g[2])||(d.isFunction(g[3])&&g[3]);return[g[0],i,h,j]}d.fn.extend({_show:d.fn.show,_hide:d.fn.hide,__toggle:d.fn.toggle,_addClass:d.fn.addClass,_removeClass:d.fn.removeClass,_toggleClass:d.fn.toggleClass,effect:function(g,f,h,i){return d.effects[g]?d.effects[g].call(this,{method:g,options:f||{},duration:h,callback:i}):null},show:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._show.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"show"))}},hide:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._hide.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"hide"))}},toggle:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))||(d.isFunction(arguments[0])||typeof arguments[0]=="boolean")){return this.__toggle.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"toggle"))}},addClass:function(g,f,i,h){return f?d.effects.animateClass.apply(this,[{add:g},f,i,h]):this._addClass(g)},removeClass:function(g,f,i,h){return f?d.effects.animateClass.apply(this,[{remove:g},f,i,h]):this._removeClass(g)},toggleClass:function(g,f,i,h){return((typeof f!=="boolean")&&f)?d.effects.animateClass.apply(this,[{toggle:g},f,i,h]):this._toggleClass(g,f)},morph:function(f,h,g,j,i){return d.effects.animateClass.apply(this,[{add:h,remove:f},g,j,i])},switchClass:function(){return this.morph.apply(this,arguments)},cssUnit:function(f){var g=this.css(f),h=[];d.each(["em","px","%","pt"],function(j,k){if(g.indexOf(k)>0){h=[parseFloat(g),k]}});return h}});d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(g,f){d.fx.step[f]=function(h){if(h.state==0){h.start=e(h.elem,f);h.end=b(h.end)}h.elem.style[f]="rgb("+[Math.max(Math.min(parseInt((h.pos*(h.end[0]-h.start[0]))+h.start[0],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[1]-h.start[1]))+h.start[1],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[2]-h.start[2]))+h.start[2],10),255),0)].join(",")+")"}});function b(g){var f;if(g&&g.constructor==Array&&g.length==3){return g}if(f=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(g)){return[parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10)]}if(f=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(g)){return[parseFloat(f[1])*2.55,parseFloat(f[2])*2.55,parseFloat(f[3])*2.55]}if(f=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)){return[parseInt(f[1],16),parseInt(f[2],16),parseInt(f[3],16)]}if(f=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)){return[parseInt(f[1]+f[1],16),parseInt(f[2]+f[2],16),parseInt(f[3]+f[3],16)]}if(f=/rgba\(0, 0, 0, 0\)/.exec(g)){return a.transparent}return a[d.trim(g).toLowerCase()]}function e(h,f){var g;do{g=d.curCSS(h,f);if(g!=""&&g!="transparent"||d.nodeName(h,"body")){break}f="backgroundColor"}while(h=h.parentNode);return b(g)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};d.easing.jswing=d.easing.swing;d.extend(d.easing,{def:"easeOutQuad",swing:function(g,h,f,j,i){return d.easing[d.easing.def](g,h,f,j,i)},easeInQuad:function(g,h,f,j,i){return j*(h/=i)*h+f},easeOutQuad:function(g,h,f,j,i){return -j*(h/=i)*(h-2)+f},easeInOutQuad:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h+f}return -j/2*((--h)*(h-2)-1)+f},easeInCubic:function(g,h,f,j,i){return j*(h/=i)*h*h+f},easeOutCubic:function(g,h,f,j,i){return j*((h=h/i-1)*h*h+1)+f},easeInOutCubic:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h+f}return j/2*((h-=2)*h*h+2)+f},easeInQuart:function(g,h,f,j,i){return j*(h/=i)*h*h*h+f},easeOutQuart:function(g,h,f,j,i){return -j*((h=h/i-1)*h*h*h-1)+f},easeInOutQuart:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h*h+f}return -j/2*((h-=2)*h*h*h-2)+f},easeInQuint:function(g,h,f,j,i){return j*(h/=i)*h*h*h*h+f},easeOutQuint:function(g,h,f,j,i){return j*((h=h/i-1)*h*h*h*h+1)+f},easeInOutQuint:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h*h*h+f}return j/2*((h-=2)*h*h*h*h+2)+f},easeInSine:function(g,h,f,j,i){return -j*Math.cos(h/i*(Math.PI/2))+j+f},easeOutSine:function(g,h,f,j,i){return j*Math.sin(h/i*(Math.PI/2))+f},easeInOutSine:function(g,h,f,j,i){return -j/2*(Math.cos(Math.PI*h/i)-1)+f},easeInExpo:function(g,h,f,j,i){return(h==0)?f:j*Math.pow(2,10*(h/i-1))+f},easeOutExpo:function(g,h,f,j,i){return(h==i)?f+j:j*(-Math.pow(2,-10*h/i)+1)+f},easeInOutExpo:function(g,h,f,j,i){if(h==0){return f}if(h==i){return f+j}if((h/=i/2)<1){return j/2*Math.pow(2,10*(h-1))+f}return j/2*(-Math.pow(2,-10*--h)+2)+f},easeInCirc:function(g,h,f,j,i){return -j*(Math.sqrt(1-(h/=i)*h)-1)+f},easeOutCirc:function(g,h,f,j,i){return j*Math.sqrt(1-(h=h/i-1)*h)+f},easeInOutCirc:function(g,h,f,j,i){if((h/=i/2)<1){return -j/2*(Math.sqrt(1-h*h)-1)+f}return j/2*(Math.sqrt(1-(h-=2)*h)+1)+f},easeInElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l)==1){return f+m}if(!k){k=l*0.3}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}return -(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f},easeOutElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l)==1){return f+m}if(!k){k=l*0.3}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}return h*Math.pow(2,-10*i)*Math.sin((i*l-j)*(2*Math.PI)/k)+m+f},easeInOutElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l/2)==2){return f+m}if(!k){k=l*(0.3*1.5)}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}if(i<1){return -0.5*(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f}return h*Math.pow(2,-10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k)*0.5+m+f},easeInBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}return k*(h/=j)*h*((i+1)*h-i)+f},easeOutBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}return k*((h=h/j-1)*h*((i+1)*h+i)+1)+f},easeInOutBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}if((h/=j/2)<1){return k/2*(h*h*(((i*=(1.525))+1)*h-i))+f}return k/2*((h-=2)*h*(((i*=(1.525))+1)*h+i)+2)+f},easeInBounce:function(g,h,f,j,i){return j-d.easing.easeOutBounce(g,i-h,0,j,i)+f},easeOutBounce:function(g,h,f,j,i){if((h/=i)<(1/2.75)){return j*(7.5625*h*h)+f}else{if(h<(2/2.75)){return j*(7.5625*(h-=(1.5/2.75))*h+0.75)+f}else{if(h<(2.5/2.75)){return j*(7.5625*(h-=(2.25/2.75))*h+0.9375)+f}else{return j*(7.5625*(h-=(2.625/2.75))*h+0.984375)+f}}}},easeInOutBounce:function(g,h,f,j,i){if(h<i/2){return d.easing.easeInBounce(g,h*2,0,j,i)*0.5+f}return d.easing.easeOutBounce(g,h*2-i,0,j,i)*0.5+j*0.5+f}})})(jQuery);;
(function(a){a.effects.blind=function(b){return this.queue(function(){var d=a(this),c=["position","top","left"];var h=a.effects.setMode(d,b.options.mode||"hide");var g=b.options.direction||"vertical";a.effects.save(d,c);d.show();var j=a.effects.createWrapper(d).css({overflow:"hidden"});var e=(g=="vertical")?"height":"width";var i=(g=="vertical")?j.height():j.width();if(h=="show"){j.css(e,0)}var f={};f[e]=h=="show"?i:0;j.animate(f,b.duration,b.options.easing,function(){if(h=="hide"){d.hide()}a.effects.restore(d,c);a.effects.removeWrapper(d);if(b.callback){b.callback.apply(d[0],arguments)}d.dequeue()})})}})(jQuery);;
(function(a){a.effects.bounce=function(b){return this.queue(function(){var e=a(this),l=["position","top","left"];var k=a.effects.setMode(e,b.options.mode||"effect");var n=b.options.direction||"up";var c=b.options.distance||20;var d=b.options.times||5;var g=b.duration||250;if(/show|hide/.test(k)){l.push("opacity")}a.effects.save(e,l);e.show();a.effects.createWrapper(e);var f=(n=="up"||n=="down")?"top":"left";var p=(n=="up"||n=="left")?"pos":"neg";var c=b.options.distance||(f=="top"?e.outerHeight({margin:true})/3:e.outerWidth({margin:true})/3);if(k=="show"){e.css("opacity",0).css(f,p=="pos"?-c:c)}if(k=="hide"){c=c/(d*2)}if(k!="hide"){d--}if(k=="show"){var h={opacity:1};h[f]=(p=="pos"?"+=":"-=")+c;e.animate(h,g/2,b.options.easing);c=c/2;d--}for(var j=0;j<d;j++){var o={},m={};o[f]=(p=="pos"?"-=":"+=")+c;m[f]=(p=="pos"?"+=":"-=")+c;e.animate(o,g/2,b.options.easing).animate(m,g/2,b.options.easing);c=(k=="hide")?c*2:c/2}if(k=="hide"){var h={opacity:0};h[f]=(p=="pos"?"-=":"+=")+c;e.animate(h,g/2,b.options.easing,function(){e.hide();a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}})}else{var o={},m={};o[f]=(p=="pos"?"-=":"+=")+c;m[f]=(p=="pos"?"+=":"-=")+c;e.animate(o,g/2,b.options.easing).animate(m,g/2,b.options.easing,function(){a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}})}e.queue("fx",function(){e.dequeue()});e.dequeue()})}})(jQuery);;
(function(a){a.effects.clip=function(b){return this.queue(function(){var f=a(this),j=["position","top","left","height","width"];var i=a.effects.setMode(f,b.options.mode||"hide");var k=b.options.direction||"vertical";a.effects.save(f,j);f.show();var c=a.effects.createWrapper(f).css({overflow:"hidden"});var e=f[0].tagName=="IMG"?c:f;var g={size:(k=="vertical")?"height":"width",position:(k=="vertical")?"top":"left"};var d=(k=="vertical")?e.height():e.width();if(i=="show"){e.css(g.size,0);e.css(g.position,d/2)}var h={};h[g.size]=i=="show"?d:0;h[g.position]=i=="show"?0:d/2;e.animate(h,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){f.hide()}a.effects.restore(f,j);a.effects.removeWrapper(f);if(b.callback){b.callback.apply(f[0],arguments)}f.dequeue()}})})}})(jQuery);;
(function(a){a.effects.drop=function(b){return this.queue(function(){var e=a(this),d=["position","top","left","opacity"];var i=a.effects.setMode(e,b.options.mode||"hide");var h=b.options.direction||"left";a.effects.save(e,d);e.show();a.effects.createWrapper(e);var f=(h=="up"||h=="down")?"top":"left";var c=(h=="up"||h=="left")?"pos":"neg";var j=b.options.distance||(f=="top"?e.outerHeight({margin:true})/2:e.outerWidth({margin:true})/2);if(i=="show"){e.css("opacity",0).css(f,c=="pos"?-j:j)}var g={opacity:i=="show"?1:0};g[f]=(i=="show"?(c=="pos"?"+=":"-="):(c=="pos"?"-=":"+="))+j;e.animate(g,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){e.hide()}a.effects.restore(e,d);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;
(function(a){a.effects.explode=function(b){return this.queue(function(){var k=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;var e=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;b.options.mode=b.options.mode=="toggle"?(a(this).is(":visible")?"hide":"show"):b.options.mode;var h=a(this).show().css("visibility","hidden");var l=h.offset();l.top-=parseInt(h.css("marginTop"),10)||0;l.left-=parseInt(h.css("marginLeft"),10)||0;var g=h.outerWidth(true);var c=h.outerHeight(true);for(var f=0;f<k;f++){for(var d=0;d<e;d++){h.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-d*(g/e),top:-f*(c/k)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:g/e,height:c/k,left:l.left+d*(g/e)+(b.options.mode=="show"?(d-Math.floor(e/2))*(g/e):0),top:l.top+f*(c/k)+(b.options.mode=="show"?(f-Math.floor(k/2))*(c/k):0),opacity:b.options.mode=="show"?0:1}).animate({left:l.left+d*(g/e)+(b.options.mode=="show"?0:(d-Math.floor(e/2))*(g/e)),top:l.top+f*(c/k)+(b.options.mode=="show"?0:(f-Math.floor(k/2))*(c/k)),opacity:b.options.mode=="show"?1:0},b.duration||500)}}setTimeout(function(){b.options.mode=="show"?h.css({visibility:"visible"}):h.css({visibility:"visible"}).hide();if(b.callback){b.callback.apply(h[0])}h.dequeue();a("div.ui-effects-explode").remove()},b.duration||500)})}})(jQuery);;
(function(a){a.effects.fold=function(b){return this.queue(function(){var e=a(this),k=["position","top","left"];var h=a.effects.setMode(e,b.options.mode||"hide");var o=b.options.size||15;var n=!(!b.options.horizFirst);var g=b.duration?b.duration/2:a.fx.speeds._default/2;a.effects.save(e,k);e.show();var d=a.effects.createWrapper(e).css({overflow:"hidden"});var i=((h=="show")!=n);var f=i?["width","height"]:["height","width"];var c=i?[d.width(),d.height()]:[d.height(),d.width()];var j=/([0-9]+)%/.exec(o);if(j){o=parseInt(j[1],10)/100*c[h=="hide"?0:1]}if(h=="show"){d.css(n?{height:0,width:o}:{height:o,width:0})}var m={},l={};m[f[0]]=h=="show"?c[0]:o;l[f[1]]=h=="show"?c[1]:0;d.animate(m,g,b.options.easing).animate(l,g,b.options.easing,function(){if(h=="hide"){e.hide()}a.effects.restore(e,k);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(e[0],arguments)}e.dequeue()})})}})(jQuery);;
(function(a){a.effects.highlight=function(b){return this.queue(function(){var e=a(this),d=["backgroundImage","backgroundColor","opacity"];var h=a.effects.setMode(e,b.options.mode||"show");var c=b.options.color||"#ffff99";var g=e.css("backgroundColor");a.effects.save(e,d);e.show();e.css({backgroundImage:"none",backgroundColor:c});var f={backgroundColor:g};if(h=="hide"){f.opacity=0}e.animate(f,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(h=="hide"){e.hide()}a.effects.restore(e,d);if(h=="show"&&a.browser.msie){this.style.removeAttribute("filter")}if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;
(function(a){a.effects.pulsate=function(b){return this.queue(function(){var d=a(this);var g=a.effects.setMode(d,b.options.mode||"show");var f=b.options.times||5;var e=b.duration?b.duration/2:a.fx.speeds._default/2;if(g=="hide"){f--}if(d.is(":hidden")){d.css("opacity",0);d.show();d.animate({opacity:1},e,b.options.easing);f=f-2}for(var c=0;c<f;c++){d.animate({opacity:0},e,b.options.easing).animate({opacity:1},e,b.options.easing)}if(g=="hide"){d.animate({opacity:0},e,b.options.easing,function(){d.hide();if(b.callback){b.callback.apply(this,arguments)}})}else{d.animate({opacity:0},e,b.options.easing).animate({opacity:1},e,b.options.easing,function(){if(b.callback){b.callback.apply(this,arguments)}})}d.queue("fx",function(){d.dequeue()});d.dequeue()})}})(jQuery);;
(function(a){a.effects.puff=function(b){return this.queue(function(){var f=a(this);var c=a.extend(true,{},b.options);var h=a.effects.setMode(f,b.options.mode||"hide");var g=parseInt(b.options.percent,10)||150;c.fade=true;var e={height:f.height(),width:f.width()};var d=g/100;f.from=(h=="hide")?e:{height:e.height*d,width:e.width*d};c.from=f.from;c.percent=(h=="hide")?g:100;c.mode=h;f.effect("scale",c,b.duration,b.callback);f.dequeue()})};a.effects.scale=function(b){return this.queue(function(){var g=a(this);var d=a.extend(true,{},b.options);var j=a.effects.setMode(g,b.options.mode||"effect");var h=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:(j=="hide"?0:100));var i=b.options.direction||"both";var c=b.options.origin;if(j!="effect"){d.origin=c||["middle","center"];d.restore=true}var f={height:g.height(),width:g.width()};g.from=b.options.from||(j=="show"?{height:0,width:0}:f);var e={y:i!="horizontal"?(h/100):1,x:i!="vertical"?(h/100):1};g.to={height:f.height*e.y,width:f.width*e.x};if(b.options.fade){if(j=="show"){g.from.opacity=0;g.to.opacity=1}if(j=="hide"){g.from.opacity=1;g.to.opacity=0}}d.from=g.from;d.to=g.to;d.mode=j;g.effect("size",d,b.duration,b.callback);g.dequeue()})};a.effects.size=function(b){return this.queue(function(){var c=a(this),n=["position","top","left","width","height","overflow","opacity"];var m=["position","top","left","overflow","opacity"];var j=["width","height","overflow"];var p=["fontSize"];var k=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];var f=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];var g=a.effects.setMode(c,b.options.mode||"effect");var i=b.options.restore||false;var e=b.options.scale||"both";var o=b.options.origin;var d={height:c.height(),width:c.width()};c.from=b.options.from||d;c.to=b.options.to||d;if(o){var h=a.effects.getBaseline(o,d);c.from.top=(d.height-c.from.height)*h.y;c.from.left=(d.width-c.from.width)*h.x;c.to.top=(d.height-c.to.height)*h.y;c.to.left=(d.width-c.to.width)*h.x}var l={from:{y:c.from.height/d.height,x:c.from.width/d.width},to:{y:c.to.height/d.height,x:c.to.width/d.width}};if(e=="box"||e=="both"){if(l.from.y!=l.to.y){n=n.concat(k);c.from=a.effects.setTransition(c,k,l.from.y,c.from);c.to=a.effects.setTransition(c,k,l.to.y,c.to)}if(l.from.x!=l.to.x){n=n.concat(f);c.from=a.effects.setTransition(c,f,l.from.x,c.from);c.to=a.effects.setTransition(c,f,l.to.x,c.to)}}if(e=="content"||e=="both"){if(l.from.y!=l.to.y){n=n.concat(p);c.from=a.effects.setTransition(c,p,l.from.y,c.from);c.to=a.effects.setTransition(c,p,l.to.y,c.to)}}a.effects.save(c,i?n:m);c.show();a.effects.createWrapper(c);c.css("overflow","hidden").css(c.from);if(e=="content"||e=="both"){k=k.concat(["marginTop","marginBottom"]).concat(p);f=f.concat(["marginLeft","marginRight"]);j=n.concat(k).concat(f);c.find("*[width]").each(function(){child=a(this);if(i){a.effects.save(child,j)}var q={height:child.height(),width:child.width()};child.from={height:q.height*l.from.y,width:q.width*l.from.x};child.to={height:q.height*l.to.y,width:q.width*l.to.x};if(l.from.y!=l.to.y){child.from=a.effects.setTransition(child,k,l.from.y,child.from);child.to=a.effects.setTransition(child,k,l.to.y,child.to)}if(l.from.x!=l.to.x){child.from=a.effects.setTransition(child,f,l.from.x,child.from);child.to=a.effects.setTransition(child,f,l.to.x,child.to)}child.css(child.from);child.animate(child.to,b.duration,b.options.easing,function(){if(i){a.effects.restore(child,j)}})})}c.animate(c.to,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(g=="hide"){c.hide()}a.effects.restore(c,i?n:m);a.effects.removeWrapper(c);if(b.callback){b.callback.apply(this,arguments)}c.dequeue()}})})}})(jQuery);;
(function(a){a.effects.shake=function(b){return this.queue(function(){var e=a(this),l=["position","top","left"];var k=a.effects.setMode(e,b.options.mode||"effect");var n=b.options.direction||"left";var c=b.options.distance||20;var d=b.options.times||3;var g=b.duration||b.options.duration||140;a.effects.save(e,l);e.show();a.effects.createWrapper(e);var f=(n=="up"||n=="down")?"top":"left";var p=(n=="up"||n=="left")?"pos":"neg";var h={},o={},m={};h[f]=(p=="pos"?"-=":"+=")+c;o[f]=(p=="pos"?"+=":"-=")+c*2;m[f]=(p=="pos"?"-=":"+=")+c*2;e.animate(h,g,b.options.easing);for(var j=1;j<d;j++){e.animate(o,g,b.options.easing).animate(m,g,b.options.easing)}e.animate(o,g,b.options.easing).animate(h,g/2,b.options.easing,function(){a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}});e.queue("fx",function(){e.dequeue()});e.dequeue()})}})(jQuery);;
(function(a){a.effects.slide=function(b){return this.queue(function(){var e=a(this),d=["position","top","left"];var i=a.effects.setMode(e,b.options.mode||"show");var h=b.options.direction||"left";a.effects.save(e,d);e.show();a.effects.createWrapper(e).css({overflow:"hidden"});var f=(h=="up"||h=="down")?"top":"left";var c=(h=="up"||h=="left")?"pos":"neg";var j=b.options.distance||(f=="top"?e.outerHeight({margin:true}):e.outerWidth({margin:true}));if(i=="show"){e.css(f,c=="pos"?-j:j)}var g={};g[f]=(i=="show"?(c=="pos"?"+=":"-="):(c=="pos"?"-=":"+="))+j;e.animate(g,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){e.hide()}a.effects.restore(e,d);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;
(function(a){a.effects.transfer=function(b){return this.queue(function(){var f=a(this),h=a(b.options.to),e=h.offset(),g={top:e.top,left:e.left,height:h.innerHeight(),width:h.innerWidth()},d=f.offset(),c=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({top:d.top,left:d.left,height:f.innerHeight(),width:f.innerWidth(),position:"absolute"}).animate(g,b.duration,b.options.easing,function(){c.remove();(b.callback&&b.callback.apply(f[0],arguments));f.dequeue()})})}})(jQuery);;
(function($){$.extend({tablesorter:new function(){var parsers=[],widgets=[];this.defaults={cssHeader:"header",cssAsc:"headerSortUp",cssDesc:"headerSortDown",sortInitialOrder:"asc",sortMultiSortKey:"shiftKey",sortForce:null,sortAppend:null,textExtraction:"simple",parsers:{},widgets:[],widgetZebra:{css:["even","odd"]},headers:{},widthFixed:false,cancelSelection:true,sortList:[],headerList:[],dateFormat:"us",decimal:'.',debug:false};function benchmark(s,d){log(s+","+(new Date().getTime()-d.getTime())+"ms");}this.benchmark=benchmark;function log(s){if(typeof console!="undefined"&&typeof console.debug!="undefined"){console.log(s);}else{alert(s);}}function buildParserCache(table,$headers){if(table.config.debug){var parsersDebug="";}var rows=table.tBodies[0].rows;if(table.tBodies[0].rows[0]){var list=[],cells=rows[0].cells,l=cells.length;for(var i=0;i<l;i++){var p=false;if($.metadata&&($($headers[i]).metadata()&&$($headers[i]).metadata().sorter)){p=getParserById($($headers[i]).metadata().sorter);}else if((table.config.headers[i]&&table.config.headers[i].sorter)){p=getParserById(table.config.headers[i].sorter);}if(!p){p=detectParserForColumn(table,cells[i]);}if(table.config.debug){parsersDebug+="column:"+i+" parser:"+p.id+"\n";}list.push(p);}}if(table.config.debug){log(parsersDebug);}return list;};function detectParserForColumn(table,node){var l=parsers.length;for(var i=1;i<l;i++){if(parsers[i].is($.trim(getElementText(table.config,node)),table,node)){return parsers[i];}}return parsers[0];}function getParserById(name){var l=parsers.length;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==name.toLowerCase()){return parsers[i];}}return false;}function buildCache(table){if(table.config.debug){var cacheTime=new Date();}var totalRows=(table.tBodies[0]&&table.tBodies[0].rows.length)||0,totalCells=(table.tBodies[0].rows[0]&&table.tBodies[0].rows[0].cells.length)||0,parsers=table.config.parsers,cache={row:[],normalized:[]};for(var i=0;i<totalRows;++i){var c=table.tBodies[0].rows[i],cols=[];cache.row.push($(c));for(var j=0;j<totalCells;++j){cols.push(parsers[j].format(getElementText(table.config,c.cells[j]),table,c.cells[j]));}cols.push(i);cache.normalized.push(cols);cols=null;};if(table.config.debug){benchmark("Building cache for "+totalRows+" rows:",cacheTime);}return cache;};function getElementText(config,node){if(!node)return"";var t="";if(config.textExtraction=="simple"){if(node.childNodes[0]&&node.childNodes[0].hasChildNodes()){t=node.childNodes[0].innerHTML;}else{t=node.innerHTML;}}else{if(typeof(config.textExtraction)=="function"){t=config.textExtraction(node);}else{t=$(node).text();}}return t;}function appendToTable(table,cache){if(table.config.debug){var appendTime=new Date()}var c=cache,r=c.row,n=c.normalized,totalRows=n.length,checkCell=(n[0].length-1),tableBody=$(table.tBodies[0]),rows=[];for(var i=0;i<totalRows;i++){rows.push(r[n[i][checkCell]]);if(!table.config.appender){var o=r[n[i][checkCell]];var l=o.length;for(var j=0;j<l;j++){tableBody[0].appendChild(o[j]);}}}if(table.config.appender){table.config.appender(table,rows);}rows=null;if(table.config.debug){benchmark("Rebuilt table:",appendTime);}applyWidget(table);setTimeout(function(){$(table).trigger("sortEnd");},0);};function buildHeaders(table){if(table.config.debug){var time=new Date();}var meta=($.metadata)?true:false,tableHeadersRows=[];for(var i=0;i<table.tHead.rows.length;i++){tableHeadersRows[i]=0;};$tableHeaders=$("thead th",table);$tableHeaders.each(function(index){this.count=0;this.column=index;this.order=formatSortingOrder(table.config.sortInitialOrder);if(checkHeaderMetadata(this)||checkHeaderOptions(table,index))this.sortDisabled=true;if(!this.sortDisabled){$(this).addClass(table.config.cssHeader);}table.config.headerList[index]=this;});if(table.config.debug){benchmark("Built headers:",time);log($tableHeaders);}return $tableHeaders;};function checkCellColSpan(table,rows,row){var arr=[],r=table.tHead.rows,c=r[row].cells;for(var i=0;i<c.length;i++){var cell=c[i];if(cell.colSpan>1){arr=arr.concat(checkCellColSpan(table,headerArr,row++));}else{if(table.tHead.length==1||(cell.rowSpan>1||!r[row+1])){arr.push(cell);}}}return arr;};function checkHeaderMetadata(cell){if(($.metadata)&&($(cell).metadata().sorter===false)){return true;};return false;}function checkHeaderOptions(table,i){if((table.config.headers[i])&&(table.config.headers[i].sorter===false)){return true;};return false;}function applyWidget(table){var c=table.config.widgets;var l=c.length;for(var i=0;i<l;i++){getWidgetById(c[i]).format(table);}}function getWidgetById(name){var l=widgets.length;for(var i=0;i<l;i++){if(widgets[i].id.toLowerCase()==name.toLowerCase()){return widgets[i];}}};function formatSortingOrder(v){if(typeof(v)!="Number"){i=(v.toLowerCase()=="desc")?1:0;}else{i=(v==(0||1))?v:0;}return i;}function isValueInArray(v,a){var l=a.length;for(var i=0;i<l;i++){if(a[i][0]==v){return true;}}return false;}function setHeadersCss(table,$headers,list,css){$headers.removeClass(css[0]).removeClass(css[1]);var h=[];$headers.each(function(offset){if(!this.sortDisabled){h[this.column]=$(this);}});var l=list.length;for(var i=0;i<l;i++){h[list[i][0]].addClass(css[list[i][1]]);}}function fixColumnWidth(table,$headers){var c=table.config;if(c.widthFixed){var colgroup=$('<colgroup>');$("tr:first td",table.tBodies[0]).each(function(){colgroup.append($('<col>').css('width',$(this).width()));});$(table).prepend(colgroup);};}function updateHeaderSortCount(table,sortList){var c=table.config,l=sortList.length;for(var i=0;i<l;i++){var s=sortList[i],o=c.headerList[s[0]];o.count=s[1];o.count++;}}function multisort(table,sortList,cache){if(table.config.debug){var sortTime=new Date();}var dynamicExp="var sortWrapper = function(a,b) {",l=sortList.length;for(var i=0;i<l;i++){var c=sortList[i][0];var order=sortList[i][1];var s=(getCachedSortType(table.config.parsers,c)=="text")?((order==0)?"sortText":"sortTextDesc"):((order==0)?"sortNumeric":"sortNumericDesc");var e="e"+i;dynamicExp+="var "+e+" = "+s+"(a["+c+"],b["+c+"]); ";dynamicExp+="if("+e+") { return "+e+"; } ";dynamicExp+="else { ";}var orgOrderCol=cache.normalized[0].length-1;dynamicExp+="return a["+orgOrderCol+"]-b["+orgOrderCol+"];";for(var i=0;i<l;i++){dynamicExp+="}; ";}dynamicExp+="return 0; ";dynamicExp+="}; ";eval(dynamicExp);cache.normalized.sort(sortWrapper);if(table.config.debug){benchmark("Sorting on "+sortList.toString()+" and dir "+order+" time:",sortTime);}return cache;};function sortText(a,b){return((a<b)?-1:((a>b)?1:0));};function sortTextDesc(a,b){return((b<a)?-1:((b>a)?1:0));};function sortNumeric(a,b){return a-b;};function sortNumericDesc(a,b){return b-a;};function getCachedSortType(parsers,i){return parsers[i].type;};this.construct=function(settings){return this.each(function(){if(!this.tHead||!this.tBodies)return;var $this,$document,$headers,cache,config,shiftDown=0,sortOrder;this.config={};config=$.extend(this.config,$.tablesorter.defaults,settings);$this=$(this);$headers=buildHeaders(this);this.config.parsers=buildParserCache(this,$headers);cache=buildCache(this);var sortCSS=[config.cssDesc,config.cssAsc];fixColumnWidth(this);$headers.click(function(e){$this.trigger("sortStart");var totalRows=($this[0].tBodies[0]&&$this[0].tBodies[0].rows.length)||0;if(!this.sortDisabled&&totalRows>0){var $cell=$(this);var i=this.column;this.order=this.count++%2;if(!e[config.sortMultiSortKey]){config.sortList=[];if(config.sortForce!=null){var a=config.sortForce;for(var j=0;j<a.length;j++){if(a[j][0]!=i){config.sortList.push(a[j]);}}}config.sortList.push([i,this.order]);}else{if(isValueInArray(i,config.sortList)){for(var j=0;j<config.sortList.length;j++){var s=config.sortList[j],o=config.headerList[s[0]];if(s[0]==i){o.count=s[1];o.count++;s[1]=o.count%2;}}}else{config.sortList.push([i,this.order]);}};setTimeout(function(){setHeadersCss($this[0],$headers,config.sortList,sortCSS);appendToTable($this[0],multisort($this[0],config.sortList,cache));},1);return false;}}).mousedown(function(){if(config.cancelSelection){this.onselectstart=function(){return false};return false;}});$this.bind("update",function(){this.config.parsers=buildParserCache(this,$headers);cache=buildCache(this);}).bind("sorton",function(e,list){$(this).trigger("sortStart");config.sortList=list;var sortList=config.sortList;updateHeaderSortCount(this,sortList);setHeadersCss(this,$headers,sortList,sortCSS);appendToTable(this,multisort(this,sortList,cache));}).bind("appendCache",function(){appendToTable(this,cache);}).bind("applyWidgetId",function(e,id){getWidgetById(id).format(this);}).bind("applyWidgets",function(){applyWidget(this);});if($.metadata&&($(this).metadata()&&$(this).metadata().sortlist)){config.sortList=$(this).metadata().sortlist;}if(config.sortList.length>0){$this.trigger("sorton",[config.sortList]);}applyWidget(this);});};this.addParser=function(parser){var l=parsers.length,a=true;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==parser.id.toLowerCase()){a=false;}}if(a){parsers.push(parser);};};this.addWidget=function(widget){widgets.push(widget);};this.formatFloat=function(s){var i=parseFloat(s);return(isNaN(i))?0:i;};this.formatInt=function(s){var i=parseInt(s);return(isNaN(i))?0:i;};this.isDigit=function(s,config){var DECIMAL='\\'+config.decimal;var exp='/(^[+]?0('+DECIMAL+'0+)?$)|(^([-+]?[1-9][0-9]*)$)|(^([-+]?((0?|[1-9][0-9]*)'+DECIMAL+'(0*[1-9][0-9]*)))$)|(^[-+]?[1-9]+[0-9]*'+DECIMAL+'0+$)/';return RegExp(exp).test($.trim(s));};this.clearTableBody=function(table){if($.browser.msie){function empty(){while(this.firstChild)this.removeChild(this.firstChild);}empty.apply(table.tBodies[0]);}else{table.tBodies[0].innerHTML="";}};}});$.fn.extend({tablesorter:$.tablesorter.construct});var ts=$.tablesorter;ts.addParser({id:"text",is:function(s){return true;},format:function(s){return $.trim(s.toLowerCase());},type:"text"});ts.addParser({id:"digit",is:function(s,table){var c=table.config;return $.tablesorter.isDigit(s,c);},format:function(s){return $.tablesorter.formatFloat(s);},type:"numeric"});ts.addParser({id:"currency",is:function(s){return/^[О’ВЈ$ОІпїЅВ¬?.]/.test(s);},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/[^0-9.]/g),""));},type:"numeric"});ts.addParser({id:"ipAddress",is:function(s){return/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);},format:function(s){var a=s.split("."),r="",l=a.length;for(var i=0;i<l;i++){var item=a[i];if(item.length==2){r+="0"+item;}else{r+=item;}}return $.tablesorter.formatFloat(r);},type:"numeric"});ts.addParser({id:"url",is:function(s){return/^(https?|ftp|file):\/\/$/.test(s);},format:function(s){return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''));},type:"text"});ts.addParser({id:"isoDate",is:function(s){return/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);},format:function(s){return $.tablesorter.formatFloat((s!="")?new Date(s.replace(new RegExp(/-/g),"/")).getTime():"0");},type:"numeric"});ts.addParser({id:"percent",is:function(s){return/\%$/.test($.trim(s));},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""));},type:"numeric"});ts.addParser({id:"usLongDate",is:function(s){return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));},format:function(s){return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"shortDate",is:function(s){return/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);},format:function(s,table){var c=table.config;s=s.replace(/\-/g,"/");if(c.dateFormat=="us"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$1/$2");}else if(c.dateFormat=="uk"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$2/$1");}else if(c.dateFormat=="dd/mm/yy"||c.dateFormat=="dd-mm-yy"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/,"$1/$2/$3");}return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"time",is:function(s){return/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);},format:function(s){return $.tablesorter.formatFloat(new Date("2000/01/01 "+s).getTime());},type:"numeric"});ts.addParser({id:"metadata",is:function(s){return false;},format:function(s,table,cell){var c=table.config,p=(!c.parserMetadataName)?'sortValue':c.parserMetadataName;return $(cell).metadata()[p];},type:"numeric"});ts.addWidget({id:"zebra",format:function(table){if(table.config.debug){var time=new Date();}$("tr:visible",table.tBodies[0]).filter(':even').removeClass(table.config.widgetZebra.css[1]).addClass(table.config.widgetZebra.css[0]).end().filter(':odd').removeClass(table.config.widgetZebra.css[0]).addClass(table.config.widgetZebra.css[1]);if(table.config.debug){$.tablesorter.benchmark("Applying Zebra widget",time);}}});})(jQuery);
{var dbcore=function(g){var k={template:null},e=dbcore,n=(e.isString(g))?e.JSON.parse(g):g,i=n,a=[],o=true,j=false;var m=function(q,p){var p=p||k.template;if(!dbcore.isNull(p)){for(var f=0,r=q.length;f<r;f++){i[q[f]]=dbcore.mergeObj(i[q[f]],p)}}};var h=function(){a=[];for(var f=0,p=i.length;f<p;f++){a[a.length]=f}};h();var l={pickTest:function(p){var f=(p.indexOf("!")===0)?j:o;if(!f){p=p.substring(1,p.length)}return{test:(p=="equal")?"is":(p=="notequal")?"not":(p=="startswith")?"starts":(p=="endswith")?"ends":(p=="greaterthan")?"gt":(p=="lessthan")?"lt":(p=="regexppass")?"regex":p,mode:(f)?{s:o,f:j}:{s:j,f:o}}},run:function(q,r,p,f){return((q=="regex")?(p.test(r)):(q=="lt")?(r<p):(q=="gt")?(r>p):(q=="lte")?(r<=p):(q=="gte")?(r>=p):(q=="starts")?(r.indexOf(p)===0):(q=="ends")?(r.substring((r.length-p.length))==p):(q=="like")?(r.indexOf(p)>=0):(q=="is")?(r==p):(q=="has")?(e.has(r,p)):(q=="hasAll")?(e.hasAll(r,p)):(q=="length")?(l.length(r,p,f)):l[q](r,p))?f.s:f.f},length:function(t,p,f){var s=(!e.isUndefined(t.length))?t.length:(!e.isUndefined(t.getLength))?t.getLength():0;if(e.isObject(p)){for(var r in p){if(p.hasOwnProperty(r)){var q=l.pickTest(r);return l.run(q.test,s,p[r],q.mode)?o:j}}}return s==p?f.s:f.f}};(function(){for(var f in dbcore){if(dbcore.hasOwnProperty(f)&&f.indexOf("is")===0){(function(p){l["is"+p]=function(s,r,q){return(dbcore["is"+p](s)==r)?o:j}}(f.substring(2,f.length)))}}}());var d=function(p,q){var r=[];if(!e.isArray(p)&&dbcore.isNumber(p)){r[r.length]=p}else{if(e.isArray(p)){r=p}else{if(e.isObject(p)){r=q(p)}else{if(!e.isArray(p)&&!e.isNumber(p)){r=a}}}}return r};var b=function(r){var p=[0],q="none",r=r+"";if(!e.isNull(r)&&!e.isUndefined(r)){for(var t=0,f=r.length;t<f;t++){var s=r.slice(t,(t+1));if(e.isNumeric(s)){if(q!="number"){p[p.length]=s;q="number"}else{p[(p.length-1)]=p[(p.length-1)]+""+s}}else{if(q!="string"){p[p.length]=s;q="string"}else{p[(p.length-1)]=p[(p.length-1)]+s}}}for(var t=0,f=p.length;t<f;t++){if(e.isNumeric(p[t])){p[t]=parseFloat(p[t])}}}else{p[p.length]=null}return p};var c=function(q){var r=[],p=[];if(e.isString(q)){p[0]=q}else{if(e.isObject(q)){p=[q]}else{p=q}}if(e.isArray(p)){for(var f=0,t=p.length;f<t;f++){if(e.isString(p[f])){if(e.isString(i[0][p[f]])){r[r.length]={sortCol:p[f],sortDir:"asc",type:"string"}}else{r[r.length]={sortCol:p[f],sortDir:"asc",type:"number"}}}else{if(e.isObject(p[f])){for(var s in p[f]){if(p[f].hasOwnProperty(s)){if(e.isString(i[0][p[f].sortCol])){r[r.length]={sortCol:s,sortDir:p[f][s],type:"string"}}else{r[r.length]={sortCol:s,sortDir:p[f][s],type:"number"}}}}}}}}return function(E,D){var w=0,v=E,u=D,F,C;for(var G=0,A=r.length;G<A;G++){if(w===0){F=v[r[G].sortCol];C=u[r[G].sortCol];if(r[G].type=="string"){F=(e.isString(F))?F.toLowerCase():F;C=(e.isString(C))?C.toLowerCase():C}if(r[G].sortDir=="desc"){if(e.isNull(C)||e.isUndefined(C)||C<F){w=-1}else{if(e.isNull(F)||e.isUndefined(F)||F<C){w=1}}}else{if(r[G].sortDir=="logical"){F=b(F);C=b(C);for(var B=0,H=C.length;B<H;B++){if(F[B]<C[B]&&B<F.length){w=-1;break}else{if(F[B]>C[B]){w=1;break}}}if(F.length<C.length&&w==0){w=-1}else{if(F.length>C.length&&w==0){w=1}}}else{if(r[G].sortDir=="logicaldesc"){F=b(F);C=b(C);for(var B=0,H=C.length;B<H;B++){if(F[B]>C[B]&&B<F.length){w=-1;break}else{if(F[B]<C[B]){w=1;break}}}if(F.length<C.length&&w==0){w=1}else{if(F.length>C.length&&w==0){w=-1}}}else{if(e.isNull(F)||e.isUndefined(F)||F<C){w=-1}else{if(e.isNull(C)||e.isUndefined(C)||F>C){w=1}}}}}}}return w}};return{dbcore:true,getLength:function(){return i.length},lastModifyDate:new Date(),find:function(t,C){var p=0;if(e.isArray(C)){var r=C}else{var r=a}if(e.isFunction(t)){var s=[];for(var w=0,u=r.length;w<u;w++){if(t(i[w],w)){s[s.length]=r[w]}}r=s}else{for(var v in t){if(t.hasOwnProperty(v)){var q="is",f="",B=v,y={s:o,f:j},A={};if(e.isObject(t[v])){for(var z in t[v]){if(t[v].hasOwnProperty(z)){A=l.pickTest(z);q=A.test;y=A.mode;f=t[v][z]}}}else{f=t[v]}var s=[];for(var w=0,u=r.length;w<u;w++){if(e.isArray(f)&&q!="isSameArray"&&q!="hasAll"){if(y.s){for(var x=0;x<f.length;x++){if(l.run(q,i[r[w]][B],f[x],y)){s[s.length]=r[w]}}}else{var A=1;for(var x=0;x<f.length;x++){if(!l.run(q,i[r[w]][B],f[x],y)){A=0}}if(A==1){s[s.length]=r[w]}}}else{if(e.isFunction(f)&&f(i[r[w]][B],w)){s[s.length]=r[w]}else{if(l.run(q,i[r[w]][B],f,y)){s[s.length]=r[w]}}}}r=s}}}r=e.gatherUniques(r);return r},remove:function(f){var s=d(f,this.find);for(var t=0,u=s.length;t<u;t++){if(!e.isNull(this.onRemove)){this.onRemove(i[s[t]])}i[s[t]]="remove"}var q=function(){for(var w=0,v=i.length;w<v;w++){if(i[w]==="remove"){return o}}return j};while(q()){for(var r=0,p=i.length;r<p;r++){if(i[r]==="remove"){i.splice(r,1);this.lastModifyDate=new Date()}}}h();return s},insert:function(q){var p=(dbcore.isArray(q))?q:[q];for(var f=0;f<p.length;f++){if(!e.isNull(this.onInsert)){this.onInsert(p[f])}i[i.length]=(dbcore.isNull(k.template))?p[f]:dbcore.mergeObj(k.template,p[f]);this.lastModifyDate=new Date();a[a.length]=i.length-1}return[i.length-1]},update:function(q,p){var t=d(p,this.find),f=0;for(var u=0,r=t.length;u<r;u++){var s=t[u];if(!e.isNull(this.onUpdate)){this.onUpdate(q,i[s])}i[s]=e.mergeObj(i[s],q);f++}return t},get:function(f){var q=[];var s=d(f,this.find);for(var r=0,p=s.length;r<p;r++){q[q.length]=i[s[r]]}return q},first:function(f){var p=d(f,this.find);return(p.length>0)?i[p[0]]:false},last:function(f){var p=d(f,this.find);return(p.length>0)?i[p[(p.length-1)]]:false},stringify:function(f){return e.JSON.stringify(this.get(f))},orderBy:function(f){if(i.length>0){if(e.isFunction(f)){var p=f}else{var p=c(f)}i.sort(p);this.lastModifyDate=new Date()}},forEach:function(t,f){var s=d(f,this.find);var u;for(var p=0,q=s.length;p<q;p++){u=i[s[p]];var r=t(u,s[p]);if(e.isObject(r)){if(dbcore.isSameObject(r,dbcore.EXIT)){break}else{this.update(r,s[p])}}}},sum:function(p,f){var q=0;this.forEach(function(s){if(dbcore.isNumeric(s[p])){q=q+s[p]}},f);return q},max:function(q,p){var r,s=0;this.forEach(function(f){if(s==1&&f[q]>r){r=f[q]}else{if(s==0){r=f[q];s=1}}},p);return r},min:function(q,p){var r,s=0;this.forEach(function(f){if(s==1&&f[q]<r){r=f[q]}else{if(s==0){r=f[q];s=1}}},p);return r},values:function(p,f){var q=[];this.forEach(function(s){q[q.length]=s[p]},f);return q},uniqueValues:function(p,f){var q=dbcore([]);this.forEach(function(s){if(q.find({value:s[p]}).length==0){q.insert({value:s[p]})}},f);return q.values("value")},config:{set:function(p,f){k[p]=f;if(p=="template"&&!dbcore.isNull(f)){m(a,f)}},get:function(f){return k[f]}},applyTemplate:function(p,f){var q=d(f,this.find);m(q,p)},onUpdate:null,onRemove:null,onInsert:null}};dbcore.typeOf=function(a){var b=typeof a;if(b==="object"){if(a){if(typeof a.length==="number"&&!(a.propertyIsEnumerable("length"))&&typeof a.splice==="function"){b="array"}}else{b="null"}}return b};dbcore.JSON=function(){function f(n){return n<10?"0"+n:n}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"};var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];if(c){return c}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)})+'"':'"'+value+'"';case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}if(typeof value.toJSON==="function"){return stringify(value.toJSON())}a=[];if(typeof value.length==="number"&&!(value.propertyIsEnumerable("length"))){l=value.length;for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||"null")}return"["+a.join(",")+"]"}if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==="string"){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+":"+v)}}}}else{for(k in value){if(typeof k==="string"){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+":"+v)}}}}return"{"+a.join(",")+"}"}return""}return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==="object"){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n}else{delete v[i]}}}}return filter(k,v)}if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof filter==="function"?walk("",j):j}throw new SyntaxError("parseJSON")}}}();dbcore.mergeObj=function(e,a){var d={};for(var b in e){if(e.hasOwnProperty(b)){d[b]=e[b]}}for(var b in a){if(a.hasOwnProperty(b)){d[b]=a[b]}}return d};dbcore.getObjectKeys=function(a){var b=[];for(var c in a){if(a.hasOwnProperty(c)){b[b.length]=c}}b.sort();return b};dbcore.isSameArray=function(b,a){return(dbcore.isArray(b)&&dbcore.isArray(a)&&b.join(",")==a.join(","))?true:false};dbcore.isSameObject=function(d,b){var a=dbcore;if(a.isObject(d)&&a.isObject(b)){if(a.isSameArray(a.getObjectKeys(d),a.getObjectKeys(b))){for(var c in d){if(d.hasOwnProperty(c)){if((a.isObject(d[c])&&a.isObject(b[c])&&a.isSameObject(d[c],b[c]))||(a.isArray(d[c])&&a.isArray(b[c])&&a.isSameArray(d[c],b[c]))||(d[c]==b[c])){}else{return false}}}}else{return false}}else{return false}return true};dbcore.has=function(e,d){var b=dbcore;var c=true;if(b.isdbcore(e)){c=e.find(d);if(c.length>0){return true}else{return false}}else{switch(b.typeOf(e)){case"object":if(b.isObject(d)){for(var a in d){if(c===true&&d.hasOwnProperty(a)&&!b.isUndefined(e[a])&&e.hasOwnProperty(a)){c=b.has(e[a],d[a])}else{return false}}return c}else{if(b.isArray(d)){for(var a=0;a<d.length;a++){c=b.has(e,d[a]);if(c===true){return true}}}else{if(b.isString(d)&&!dbcore.isUndefined(e[d])){return true}}}break;case"array":if(b.isObject(d)){for(var f=0;f<e.length;f++){c=b.has(e[f],d);if(c==true){return true}}}else{if(b.isArray(d)){for(var a=0;a<d.length;a++){for(var f=0;f<e.length;f++){c=b.has(e[f],d[a]);if(c==true){return true}}}}else{if(b.isString(d)){for(var f=0;f<e.length;f++){c=b.has(e[f],d);if(c==true){return true}}}}}break;case"string":if(b.isString(d)&&d==e){return true}break;default:if(b.typeOf(e)==b.typeOf(d)&&e==d){return true}break}}return false};dbcore.hasAll=function(f,e){var c=dbcore;if(c.isArray(e)){var b=true;for(var d=0,a=e.length;d<a;d++){b=c.has(f,e[d]);if(b==false){return b}}return true}else{return c.has(f,e)}};dbcore.gatherUniques=function(b){var h=[];for(var f=0;f<b.length;f++){var e=true;for(var g=0;g<h.length;g++){if(h[g]==b[f]){e=false}}if(e==true){h[h.length]=b[f]}}return h};(function(a){for(var b=0;b<a.length;b++){(function(c){dbcore["is"+c]=function(d){return(dbcore.typeOf(d)==c.toLowerCase())?true:false}}(a[b]))}}(["String","Number","Object","Array","Boolean","Null","Function","Undefined"]));dbcore.isNumeric=function(b){var c="0123456789";var a=true;for(var d=0;d<b.length&&a==true;d++){if(c.indexOf(b.charAt(d))==-1){return false}}return a};dbcore.isdbcore=function(a){return(dbcore.isObject(a)&&a.dbcore)?true:false};dbcore.EXIT={EXIT:true}};var r={Referrer:location.host};

$('#banner_container,#mainview div p iframe').remove();

String.prototype.trim = function() {
   return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
   return this.replace(/^\s+/g,"");
}
String.prototype.rtrim = function() {
   return this.replace(/\s+$/g,"");
}
String.prototype.stripTags = function () {
   return this.replace(/<([^>]+)>/g,'');
}

function Template(template,pattern){
	this.template = template.toString();
    this.pattern = pattern ||  /(^|.|\r|\n)(\{(.*?)\})/;
	this.evaluate = function(object){
		var res=this.template;
		if (object == null) return res.replace(new RegExp(this.pattern,"g"),'');
		var m=res.match(this.pattern);
		while (m){
			res=res.replace(new RegExp(m[0],"g"),(object[m[3]]?object[m[3]]:''));
			var m=res.match(this.pattern);
		}
		return res;
	}
}
/*var myTemplate = new Template('The TV show  {title} was created by  {author} and {kitsos}.');
var show = {title: 'The Simpsons', author: 'Matt Groening', network: 'FOX'};
alert(myTemplate.evaluate(show));*/

//i know that sqlite is better, but i dont want an extra extension for this tool,
//got TAFFY DB(dbcore) and wrapped it like a storage engine with a schema.
//try to figure it out LOL, it will take a while to understand what it does!!!!!!!
//select table join not yet implemented, could add a tokenizer to the db but it gets slower(see trimquery)
 var rdb=new function(){
	this.debug=true;
	this.dbcore=dbcore;
	this.schematables = new this.dbcore(
	[{id:1 , nm:'islands',upd:false, load:false, tbl:[]},
	 {id:2 , nm:'settings',upd:false, load:false, tbl:[]},
	 {id:3 , nm:'cities',upd:false, load:false, tbl:[]},
	 {id:4 , nm:'links',upd:false, load:false, tbl:[]},
	 {id:5 , nm:'friends',upd:false, load:false, tbl:[]},
	 {id:6 , nm:'enemies',upd:false, load:false, tbl:[]},
	 {id:7 , nm:'alliances',upd:false, load:false, tbl:[]},
	 {id:8 , nm:'enemyalliances',upd:false, load:false, tbl:[]},
	 {id:9 , nm:'messages',upd:false, load:false, tbl:[]},
	 {id:10 , nm:'notes',upd:false, load:false, tbl:[]},
	 {id:11 , nm:'citybuildings',upd:false, load:false, tbl:[]},
	 {id:15 , nm:'embassy',upd:false, load:false, tbl:[]},
	 {id:16 , nm:'colector',upd:false, load:false, tbl:[]},
	 {id:17 , nm:'widgets',upd:false, load:false, tbl:[]},
	 {id:20 , nm:'upgrade',upd:false, load:false, tbl:[]}
	  ]
	)
	this.name='-ika-core-schema-';
	this.loadtime=new Date().getTime();
	this.Dropstorage=function(tbl){
		GM_setValue(location.host + this.name+tbl, '');
		var a=this.schematables.get({nm:tbl})[0][tbl];
		if (a) a.remove();
	}
	this.writetbl=function(tbl){
		var upd=this.schematables.get({upd:true,nm:tbl})[0];
		GM_setValue(location.host + this.name + tbl, upd['tbl'].stringify());
	}
	this.readtbl=function(tbl){
		var tblloaded=this.schematables.get({nm:tbl})[0];
		if (!tblloaded['load']) {
			var buf=GM_getValue(location.host + this.name + tbl);
			var tblconstruct;
			if(buf){
				tblconstruct=new this.dbcore(this.dbcore.JSON.parse(buf));
			} else{
				tblconstruct=new this.dbcore([]);
			}
			tblconstruct.onInsert = function (r) {
				rdb.schematables.update({upd:true},{load:true,nm:tbl});
			};
			this.schematables.update({load:true,tbl:tblconstruct},{load:false,nm:tbl});
		}
	}
	this.migratetbl=function(tbl,data){
		this.readtbl(tbl);
		this.schematables.update({load:true,upd:true,tbl:data},{nm:tbl});
	};
	this.selecttbl=function(tbl){
		this.readtbl(tbl);
		return this.schematables.get({load:true,nm:tbl})[0]['tbl'];
	};
	this.tableexists=function(tbl,checker){
		var tblexist=this.schematables.get({nm:tbl})[0];
		if (tblexist){
			return true;
		} else{
			if (this.debug) alert(tbl+'-'+checker+' error-'+'--Table '+tbl+' does not exist.');
			return false;
		}
	}
	this.Commit=function(){
		this.schematables.forEach(
			function (f,n) {
				GM_setValue(location.host + rdb.name + f.nm, f.tbl.stringify());
				f.upd=false;
				return f;
			},{upd:true}
		);
	}
	this.Select=function(statement,tbl,outtype){
		var g=this.selecttbl(tbl);
		var f = g.find(statement);
		var bufrecords = g.get();
		var recordset=[] ;
		for (i = 0; i < f.length; i++) {
			recordset.push(bufrecords[f[i]]);
		}
		if (outtype) {
			return new this.dbcore(recordset);
		} else{return recordset}
	}
	this.Insert=function(tbl,statement){
		return this.selecttbl(tbl).insert(statement);
	}
	this.Update=function(tbl,statement,where){
		return this.selecttbl(tbl).update(statement,where);
	}
	this.Delete=function(tbl,statement){
		return this.selecttbl(tbl).remove(statement);
	}
	this.init=function(){
		//check if buildings db is installed and check version
		var q=this.Select({s:'cityview',i:'AssetsDBVersion',v:{gt:AssetsDBVersion-1}},'settings',false)[0];
		if (!q){
			//get buildings db form ika-core
			get('http://www.ika-core.org/scripts/idb/upgrade.php',function(text,a){
				//on this function this(.) wont work, use global rdb instead
				//getting the global and making it aloc handle(lots faster)
				var lrdb=rdb;
				lrdb.Delete('settings',{s:'cityview',i:'AssetsDBVersion'});
				lrdb.Insert('settings',{s:'cityview',i:'AssetsDBVersion',v:AssetsDBVersion});
				var bbuilddb=new lrdb.dbcore(lrdb.dbcore.JSON.parse(text));
				lrdb.migratetbl('upgrade',bbuilddb);//
				/*get('http://www.ika-core.org/scripts/idb/images.php',function(text,a){
					var lrdb=rdb;
					var bbuilddb=new lrdb.dbcore(lrdb.dbcore.JSON.parse(text));
					lrdb.migratetbl('images',bbuilddb);//
					lrdb.Commit();
				},'');*/
				lrdb.Commit();
			}
			,'');
		}
	}
}

var queryserver=getserverindex();
var serverindex=queryserver[1];
var world = /([0-9]+)/.exec(location.host);world = RegExp.$1;
var country=queryserver[0];
var alliancefullnm;var alliancenm;var alliance;var chaturl;var forumurl;var forumurlnew;var Alliance;var Allies;var NoAlliance;var Enemies;var corsairmenu;var legend;var TreatyYes;var TreatyNo;var updatenotification;var txtplswait;var txtmap;var txtrefresh;var txtcoorddata;var txtmapdata;var txtmapdata2;var txtpagedata;var txtinfodata;var txtsorting;var txtchkplayer;var scheduler=[[0,0]];var bubbles=0;var timelapse=0;var islandsearch;var islandsearchs=0;var rand=Math.floor(Math.random()*65535);var tm=90000;if(!GM_getValue("GlobRand")) GM_setValue("GlobRand", Math.floor(Math.random()*65535));var globrand=GM_getValue("GlobRand");
var getbody=document.getElementsByTagName('body')[0];
var ika="http://www.ika-core.org/search";
var LocalizationStrings	=unsafeWindow.LocalizationStrings;
var IKARIAM				=unsafeWindow.IKARIAM;
//var YAHOO				=unsafeWindow.YAHOO;
//var Dom				=unsafeWindow.Dom;
var woodCounter			=unsafeWindow.woodCounter;
var wineCounter			=unsafeWindow.wineCounter;
var tradegoodCounter	=unsafeWindow.tradegoodCounter;
var tmpCnt				=unsafeWindow.tmpCnt;

var XPFirst		= XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList		= XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter		= XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
var XPIterOrder	= XPathResult.ORDERED_NODE_ITERATOR_TYPE;
var debug=0;

Alliance	=	GM_getValue("AllianceColor","#0000FF");
Allies		=	GM_getValue("AlliesColor","cyan");
NoAlliance	=	GM_getValue("NoAllianceColor","purple");
Enemies		=	GM_getValue("EnemiesColor","red");

var building = { townHall: 0, townhall: 0, port: 3, academy: 4, shipyard: 5, barracks: 6, warehouse: 7, wall: 8, tavern: 9, museum: 10, palace: 11, embassy: 12, branchOffice: 13, workshop: 15, "workshop-army": 15, "workshop-fleet": 15, safehouse: 16, palaceColony: 11, resource: 1, tradegood: 2, forester: 17, stonemason: 18, glassblowing: 20, winegrower: 21, alchemist: 22, carpentering: 23, architect: 24, optician: 25, vineyard: 26, fireworker: 27};
var resmap = { g: "/skin/resources/icon_gold.gif",  w:"/skin/resources/icon_wood.gif", W:"/skin/resources/icon_wine.gif", M:"/skin/resources/icon_marble.gif", C:"/skin/resources/icon_glass.gif", S:"/skin/resources/icon_sulfur.gif", t:"/skin/resources/icon_time.gif", p:"/skin/resources/icon_population.gif", a:'maxActionPoints'};

function lang() {
	//used to check if a lang is working
	//country='fr';
	//default chat provided by ika-core.org
	if 	(chaturl=='.') chaturl='http://www.ika-core.org/chat/';
	switch (country) {
   case 'gr':
		CheckVersionBubbleNegative=	"О€ОєО±ОЅО± О­О»ОµОіП‡Ої ОіО№О± ОЅО­О± О­ОєОґОїПѓО·, ОґОµОЅ П…ПЂО¬ПЃП‡ОµО№ ОєО±ОјОЇО± О±П…П„О· П„О·ОЅ ПѓП„О№ОіОјО®.";
		NewCoreVersion="ОќО­О± О­ОєОґОїПѓО· ОєОµОЅП„ПЃО№ОєОїПЌ Script";
		SideBar_Drag="ОљПЃО±П„О®ПѓП„Оµ ПЂО±П„О·ОјО­ОЅОї П„Ої ПЂОїОЅП„ОЇОєО№ ОіО№О± ОЅО± ПѓПЌПЃОµП„Оµ П„О·ОЅ ОјПЂО¬ПЃО± ПЂО¬ОЅП‰/ОєО¬П„П‰";
		SideBar_Search="О‘ОЅО±О¶О®П„О·ПѓО·";
		SideBar_SearchT="О‘ОЅО±О¶О®П„О·ПѓО· О О¬О№П‡П„О·/ОЈП…ОјОјО±П‡ОµОЇО±П‚";
		SideBar_ToolsT="О”ОµПѓОјОїОЇ ОЈП…ОјОјО±П‡ОµОЇО±П‚";
		SideBar_Notes="ОЈО·ОјОµО№ПЋПѓОµО№П‚";
		SideBar_NotesT="ОЈО·ОјОµО№П‰ОјО±П„О¬ПЃО№Ої";
		SideBar_Allies="ОЈПЌОјОјО±П‡ОїО№";
		SideBar_AlliesT="О›ОЇПѓП„О± ОЈП…ОјОјО¬П‡П‰ОЅ";
		SideBar_Enemies="О•П‡ОёПЃОїОЇ";
		SideBar_EnemiesT="О›ОЇПѓП„О± О•П‡ОёПЃПЋОЅ";
		SideBar_Friends="О¦ОЇО»ОїО№";
		SideBar_FriendsT="О›ОЇПѓП„О± О¦ОЇО»П‰ОЅ";
		SideBar_Settings="ОЎП…ОёОјОЇПѓОµО№П‚";
		SideBar_SettingsT="О“ОµОЅО№ОєО­П‚ ОЎП…ОёОјОЇПѓОµО№П‚";
		SideBar_Chat="ОљОїП…ОІОµОЅП„ОїПЌО»О±";
		SideBar_ChatT="ОљО­ОЅП„ПЃОї О•ПЂО№ОєОїО№ОЅП‰ОЅОЇО±П‚ ОЈП…ОјОјО±П‡О№ПЋОЅ";
		SideBar_Search_Save="О‘ПЂОїОёО®ОєОµП…ПѓО·";
		SideBar_Search_Add="О ПЃОїПѓОёО®ОєО·";
		SideBar_Search_QuickSearch="О“ПЃО®ОіОїПЃО· О‘ОЅО±О¶О®П„О·ПѓО·";
		SideBar_Search_Player="О О±ОЇП‡П„О·П‚";
		SideBar_Search_City="О ПЊО»О·";
		SideBar_Search_PlayerStatus="ОљО±П„О¬ПѓП„О±ПѓО· О О±ОЇП‡П„О·";
		SideBar_Search_PlayerAll="'ОџО»ОµП‚";
		SideBar_Search_PlayerUnknown="'О‘ОіОЅП‰ПѓП„О·";
		SideBar_Search_PlayerNormal="ОљО±ОЅОїОЅО№ОєО®";
		SideBar_Search_PlayerInactive="О‘ОЅОµОЅОµПЃОіО®";
		SideBar_Search_PlayerVacation="О”О№О±ОєОїПЂПЋОЅ";
		SideBar_Search_Alliance="ОЈП…ОјОјО±П‡ОµОЇО±";
		SideBar_Search_Radius="О‘ОєП„ОЇОЅО± О‘ОЅО±О¶О®П„О·ПѓО·П‚";
		SideBar_Search_Search="О‘ОЅО±О¶О®П„О·ПѓО·";
		SideBar_Search_Clear="ОљО±ОёО±ПЃО№ПѓОјПЊП‚";
		SideBar_Search_AdvancedSearch="О ПЃОїП‡П‰ПЃО·ОјО­ОЅО· О‘ОЅО±О¶О®П„О·ПѓО·";
		SideBar_Search_EnemyAlliances="О•П‡ОёПЃО№ОєО­П‚ ОЈП…ОјОјО±П‡ОµОЇОµП‚";
		SideBar_Search_MilitaryScore="ОЈП„ПЃО±П„О№ОїП„О№ОєПЊ ОЈОєОїПЃ";
		SideBar_Search_GoldScore="О§ПЃП…ПѓПЊП‚";
		SideBar_Search_Between="ОјОµП„О±ОѕПЌ";
		SideBar_Search_And="ОєО±О№";
		SideBar_Search_TownHallLevel="О•ПЂОЇПЂОµОґОї О”О·ОјО±ПЃП‡ОµОЇОїП…";
		AllianceMenu=[
		["О‘ПЂОїПѓП„ОїО»О® ОљП…ОєО»О№ОєОїПЌ<br> ОњО®ОЅП…ОјО±П„ОїП‚","ОљП…ОєО»О№ОєПЊ ОјО®ОЅП…ОјО± ПЂПЃОїП‚ ПЊО»ОїП…П‚ П„ОїП…П‚ ОЈПЌОјОјО±П‡ОїП…П‚"],
		["Forum "+alliancefullnm,"О ПЃОїП‚ П„Ої Forum ОЈП…ОјОјО±П‡ОЇО±П‚ "],
		["Forum "+alliancefullnm +" <br> ОЅО­ОµП‚ ОєО±П„О±П‡П‰ПЃО®ПѓОµО№П‚","О ПЃОїП‚ П„Ої Forum ОЈП…ОјОјО±П‡ОЇО±П‚, ОЅО­ОµП‚ ОєО±П„О±П‡П‰ПЃО®ПѓОµО№П‚ "],
		["Chatbox(ОќО­Ої О О±ПЃО¬ОёП…ПЃОї)","О¤Ої Chat П„О·П‚ ОЈП…ОјОјО±П‡ОЇО±П‚, О±ОЅОїОЇОіОµО№ ПѓОµ ОЅО­Ої ПЂО±ПЃО¬ОёП…ПЃОї"],
		["Chatbox(О”О№П‡ОїП„ПЊОјО·ПѓО·)","О¤Ої Chat П„О·П‚ ОЈП…ОјОјО±П‡ОЇО±П‚, О±ОЅОїОЇОіОµО№ ПѓП„Ої ОЇОґО№Ої ПЂО±ПЃО¬ОёП…ПЃОї ПѓП„Ої ОєО¬П„П‰ ОјО­ПЃОїП‚ "],
		["ОҐПЂОїО»ОїОіО№ПѓП„О®П‚ ОњО¬П‡О·П‚","О•ПЃОіО±О»ОµОЇОї ОіО№О± П„ОїП…П‚ П…ПЂОїО»ОїОіО№ПѓОјОїПЌП‚ П„П‰ОЅ ПѓП„ПЃО±П„ОµП…ОјО¬П„П‰ОЅ ... "],
		["О‘ОЅО±ОІО¬ОёОјО№ПѓО· О•ПЃОіО±О»ОµОЇП‰ОЅ ПѓП…ОјОјО±П‡ОЇО±П‚"+alliancefullnm,"О‘ОЅО±ОІО¬ОёОјО№ПѓО· П„П‰ОЅ ОµПЃОіО±О»ОµОЇП‰ОЅ ПѓП„О·ОЅ П„ОµО»ОµП…П„О±ОЇО± О­ОєОґОїПѓО·"]];
		IslandLegendAllies="вЂў ОЈПЌОјОјО±П‡ОїО№";
		IslandLegendNoAlliance="вЂў О§П‰ПЃОЇП‚ ПѓП…ОјОјО±П‡ОЇО±";
		IslandLegendEnemies="вЂў О•П‡ОёПЃОїОЇ";
		TreatyAll="О•О»О­П‡ОёО·ОєО±ОЅ ПЊО»ОїО№ ОїО№ ПЂО±ОЇП‡П„ОµП‚. ОљОЇП„ПЃО№ОЅОї О­П‡ОїП…ОЅ ОїО№ П‡П‰ПЃОЇП‚ ПѓП…ОЅОёО®ОєО· ОєО±О№ О“ОєПЃО№ О±П…П„ОїОЇ ОјОµ ПѓП…ОЅОёО®ОєО·."
		TreatyYes="О€П‡ОµП„Оµ О®ОґО· ПЂОїО»О№П„О№ПѓОјО№ОєО® ПѓП…ОјП†П‰ОЅОЇО± ОјОµ П„ОїОЅ ПЂО±ОЇП‡П„О· О±П…П„ПЊОЅ.";
		TreatyNo="О”ОµОЅ ОІПЃО­ОёО·ОєОµ ОєО±ОјОЇО± ПЂОїО»О№П„О№ПѓОјО№ОєО® ПѓП…ОјП†П‰ОЅОЇО± ОјОµ П„ОїОЅ ПЂО±ОЇП‡П„О· О±П…П„ПЊОЅ.";
		updatenotification="ОҐПЂО¬ПЃП‡ОµО№ ОјО№О± ОЅО­О± О­ОєОґОїПѓО· П„П‰ОЅ О•ПЃОіО±О»ОµОЇП‰ОЅ П„О·П‚ ПѓП…ОјОјО±П‡ОЇО±П‚"+alliancefullnm+".\n О•О¬ОЅ ОёО­О»ОµП„Оµ ОЅО± ОєО¬ОЅОµП„Оµ О±ОЅО±ОІО¬ОёОјО№ПѓО· ПЂО№О­ПѓП„Оµ ОџОљ ОіО№О± ОЅО± ОјОµП„О±ОІОµОЇП„Оµ ПѓП„О·ОЅ ПѓОµО»ОЇОґО± О±ОЅО±ОІО±ОёОјО№ПѓО·П‚ www.ika-core.org.";
		txtplswait="О О±ПЃО±ОєО±О»ПЋ О ОµПЃО№ОјО­ОЅОµП„Оµ";
		txtrefresh="О‘ОЅО±ОЅО­П‰ПѓО·";
		txtpagedata="- О•ПЌПЃОµПѓО· ПѓОµО»ОЇОґО±П‚";
		txtinfodata="- О•ПЌПЃОµПѓО· О О±ОЇП‡П„О·";
		txtchkplayer="- О€О»ОµОіП‡ОїП‚ О О±ОЇП‡П„О·";
		CultureTreaties="О ОїО»О№П„О№ПѓП„О№ОєО®"; //magic word for treaties fix
		CultureTreatiesCancel=" О‘ОєПЌПЃП‰ПѓО· О ОїО»О№П„О№ПѓП„О№ОєО®П‚ ПѓП…ОјП†П‰ОЅОЇО±П‚ ПЂОµПЃО№ОїП…ПѓО№О±ОєПЋОЅ ПѓП„ОїО№П‡ОµОЇП‰ОЅ";
		CultureTreatiesRequest=" О‘ОЇП„О·ПѓО· О ОїО»О№П„О№ПѓП„О№ОєО®П‚ ПѓП…ОјП†П‰ОЅОЇО±П‚ ПЂОµПЃО№ОїП…ПѓО№О±ОєПЋОЅ ПѓП„ОїО№П‡ОµОЇП‰ОЅ";
	  break;
	case 'fr':
		CheckVersionBubbleNegative= "AprГЁs vГ©rification, il n'y a pas de nouvelle version.";
		NewCoreVersion="il y a une nouvelle Version";
		SideBar_Drag="Cliquer et maintener pour dГ©placer la barre latГ©rale";
		SideBar_Search="Recherches";
		SideBar_SearchT="Chercher joueur/alliance";
		SideBar_ToolsT="liens de l'Alliance";
		SideBar_Notes="Notes";
		SideBar_NotesT="Notes rapides";
		SideBar_Allies="AlliГ©s";
		SideBar_AlliesT="Liste des AlliГ©s";
		SideBar_Enemies="Ennemis";
		SideBar_EnemiesT="Joueurs Ennemis";
		SideBar_Friends="Amis";
		SideBar_FriendsT="Liste d'amis";
		SideBar_Settings="RГ©glages";
		SideBar_SettingsT="RГ©glages - Configuration gГ©nГ©rale";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat global";
		SideBar_Search_Add="Ajouter";
		SideBar_Search_Save="Sauver";
		SideBar_Search_QuickSearch="Recherche rapide";
		SideBar_Search_Player="Joueur";
		SideBar_Search_City="City"
		SideBar_Search_PlayerStatus="Statut Joueur";
		SideBar_Search_PlayerAll="Tous";
		SideBar_Search_PlayerUnknown="Inconnu";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactif";
		SideBar_Search_PlayerVacation="Vacances";
		SideBar_Search_Alliance="Alliance";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Recherche";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Recherche avancГ©e";
		SideBar_Search_EnemyAlliances="Alliances ennemies";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["Envoyer un<br> message","Envoyer un message Г  tous les membres"],
		["Forum","Forum des "+alliancenm],
		["Nouveaux posts" ,"Voir les derniers posts "+alliancenm],
		["Chatbox","Discuter avec les autres membres"],
		["Chatbox(Frame)","Discuter avec les autres membres "],
		["Simulateur de bataille", "Simulateur de bataille"],
		["Update du script des "+alliancenm,"Le dernier script"]];
		IslandLegendAllies="вЂў Allies";
		IslandLegendNoAlliance="вЂў Sans Alliance";
		IslandLegendEnemies="вЂў Enemies";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="You already have a cultural Treaty with this Player";
		TreatyNo="No cultural treaties found for this player.";
		updatenotification="Il y a une nouvelle version du script des "+alliancefullnm+".\n Mettez Г  jour le script en www.ika-core.org?";
		txtplswait="Attendez";
		txtrefresh="Consultez";
		txtpagedata="- Page en cours";
		txtinfodata="- Information en cours";
		txtchkplayer="- Compte de joueur";
		CultureTreaties="ultur"; //magic word
		CultureTreatiesCancel=" Cancel Cultural Treaty";
		CultureTreatiesRequest=" Request Cultural Treaty";
		break;
	case 'tr':
		CheckVersionBubbleNegative=   "Yeni sГјrГјm kontrolГј yaptД±m, Еџu anda yok.";
		NewCoreVersion="Yeni Г‡ekirdek SГјrГјmГј";
		SideBar_Drag="Kenar Г§ubuДџunu hareket ettirmek iГ§in basД±lД± tutup sГјrГјkleyin";
		SideBar_Search="Arama";
		SideBar_SearchT="Oyuncu/Д°ttifak Arama";
		SideBar_ToolsT="Д°ttifak KД±sayollarД±";
		SideBar_Notes="Notlar";
		SideBar_NotesT="HД±zlД± Notlar";
		SideBar_Allies="Dostlar";
		SideBar_AlliesT="Dostlar - Liste";
		SideBar_Enemies="DГјЕџmanlar";
		SideBar_EnemiesT="DГјЕџman Oyuncular";
		SideBar_Friends="ArkadaЕџlar";
		SideBar_FriendsT="ArkadaЕџ Listesi";
		SideBar_Settings="SeГ§enekler";
		SideBar_SettingsT="SeГ§enekler - Genel Ayarlar ";
		SideBar_Chat="Sohbet";
		SideBar_ChatT="Genel Sohbet";
		SideBar_Search_Add="Ekle";
		SideBar_Search_Save="Kaydet";
		SideBar_Search_QuickSearch="HД±zlД± Arama";
		SideBar_Search_Player="Oyuncu";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Oyuncu Durumu";
		SideBar_Search_PlayerAll="TГјmГј";
		SideBar_Search_PlayerUnknown="Bilinmeyen";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Д°naktif";
		SideBar_Search_PlayerVacation="Tatil";
		SideBar_Search_Alliance="Д°ttifak";
		SideBar_Search_Radius="YarД±Г§ap";
		SideBar_Search_Search="Ara";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="GeliЕџmiЕџ Arama";
		SideBar_Search_EnemyAlliances="DГјЕџman Д°ttifaklar";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["SirkГјler<br> Mesaj","BГјtГјn Гјyelere mesaj gГ¶nder"],
		[alliancenm+" Forum ","Д°ttifak Forumu "],
		[alliancenm +" yeni forum mesajlarД±","Д°ttifak Forumu, son eklenenler "],
		["Sohbet (Yeni Pencere)","Д°ttifak Sohbet, yeni pencerede gГ¶sterim"],
		["Sohbet (Г‡erГ§eve)","Д°ttifak Sohbet, Г§erГ§eve iГ§inde gГ¶sterim "],
		["SavaЕџ HesaplayД±cД±","SavaЕџ hesaplamalarД± ... "],
		[alliancenm+" AraГ§larД± GГјncelle ","Eklenti gГјncelleme" ]];
		IslandLegendAllies="вЂў Dost";
		IslandLegendNoAlliance="вЂў Д°ttifaksД±z";
		IslandLegendEnemies="вЂў DГјЕџman";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Bu oyuncu ile zaten kГјltГјrel antlaЕџmanД±z var";
		TreatyNo="Bu oyuncu ile kГјltГјrel antlaЕџmanД±z yok.";
		updatenotification=alliancenm+" AraГ§larД±nД±n yeni sГјrГјmГј var.\n www.ika-core.org.";
		txtplswait="LГјtfen Bekleyin";
		txtrefresh="Yenile";
		txtpagedata="- Sayfa AlД±nД±yor";
		txtinfodata="- Bilgi AlД±nД±yor";
		txtchkplayer="- Oyuncu Kontrol Ediliyor";
		CultureTreaties="ГјltГјr"; //magic word for treaties fix, does it work??? please post on userscripts
		CultureTreatiesCancel=" KГјltГјrel AnlaЕџmayД± Д°ptal Et";
		CultureTreatiesRequest=" KГјltГјrel AnlaЕџma Teklif Et";
		break;
	case 'de':
		CheckVersionBubbleNegative=	"Ich hab fuer ne neue version gecheckt, es gibt leider keine.";
		NewCoreVersion="Neue Core Version";
		SideBar_Drag="Linke mouse taste druecken und halten um dass seitliche menu rauf und runter zu schieben";
		SideBar_Search="Suchen";
		SideBar_SearchT="Spieler/Allianz Suche";
		SideBar_ToolsT="Allianz Links";
		SideBar_Notes="Notizen";
		SideBar_NotesT="Notizbuch";
		SideBar_Allies="Allierten";
		SideBar_AlliesT="Allierten Liste";
		SideBar_Enemies="Feinde";
		SideBar_EnemiesT="Feindliche Spieler";
		SideBar_Friends="Freunde";
		SideBar_FriendsT="Maine Freunde";
		SideBar_Settings="Einstellungen";
		SideBar_SettingsT="Einstellungen und Konfiguration ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Globales Chat";
		SideBar_Search_Add="Hinzufuegen";
		SideBar_Search_Save="Speichern";
		SideBar_Search_QuickSearch="SchnellSuche";
		SideBar_Search_Player="Spieler";
		SideBar_Search_City="Stadt";
		SideBar_Search_PlayerStatus="Spieler Status";
		SideBar_Search_PlayerAll="Alle";
		SideBar_Search_PlayerUnknown="Unbekannt";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inaktiv";
		SideBar_Search_PlayerVacation="Ferien";
		SideBar_Search_Alliance="Allianz";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Suchen";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Fortgeschrittene Suche";
		SideBar_Search_EnemyAlliances="Feindliche Allianzen";
		SideBar_Search_MilitaryScore="Militaer Punkte";
		SideBar_Search_GoldScore="Gold Punkte";
		SideBar_Search_Between="zwischen";
		SideBar_Search_And="und";
		SideBar_Search_TownHallLevel="Rathaus Level";
		AllianceMenu=[
		["Allianz<br> Rundmail","Sende Mail an alle Allianzmitglieder "],
		["Forum: "+alliancefullnm,"Zum Allianz-Forum "],
		[alliancefullnm +": Forum News","Neue BeitrГ¤ge im Forum "],
		["Chatbox(New Window)","Allianz Chat, in neuem Fenster "],
		["Chatbox(Frame)","Allianz Chat, in einem Frame "],
		["Battle Calc","Calculates a battle ... "],
		[" Update "+alliancefullnm+" Tools ","Gets the latest script"]];
		IslandLegendAllies="вЂў Allierten";
		IslandLegendNoAlliance="вЂў Ohne Allianz";
		IslandLegendEnemies="вЂў Feinde";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Es besteht bereits ein KulturgГјterabkommen mit diesem Spieler.";
		TreatyNo="Es besteht kein KulturgГјterabkommen mit diesem Spieler.";
		updatenotification="Es gibt eine neue Version vom "+alliancefullnm+" Tools.\n Jezt das Script updaten auf www.ika-core.org?";
		maplegend=["Deine Inseln","Gesuchte Inseln","Гњbereinstimmende Inseln","Keine Гњbereinstimmung","Sea","Click fГјr mehr Infos."];
		txtplswait="Bitte warten!";
		txtrefresh="Refresh";
		txtpagedata="- Hole Seite";
		txtinfodata="- Hole Info";
		txtchkplayer="- Checke Spieler";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" KulturgГјterabkommen kГјndigen";
		CultureTreatiesRequest=" KulturgГјterabkommen anbieten";
		break;
	case 'es':
		CheckVersionBubbleNegative= "BusquГ© una nueva versiГіn, ninguna por ahora.";
		NewCoreVersion="Nueva VersiГіn Core";
		SideBar_Drag="Oprime y Arrastra para mover este MenГє";
		SideBar_Search="Buscar";
		SideBar_SearchT="Buscar jugador/alianza";
		SideBar_ToolsT="Enlaces de la Alianza";
		SideBar_Notes="Notas";
		SideBar_NotesT="Anotaciones";
		SideBar_Allies="Aliados";
		SideBar_AlliesT="Lista de Aliados";
		SideBar_Enemies="Enemigos";
		SideBar_EnemiesT="Lista de Enemigos";
		SideBar_Friends="Amigos";
		SideBar_FriendsT="Lista de Amigos";
		SideBar_Settings="Configuraciones";
		SideBar_SettingsT="Configuraciones Generales ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat Global";
		SideBar_Search_Add="Agregar";
		SideBar_Search_Save="Guardar";
		SideBar_Search_QuickSearch="BГєsqueda RГЎpida";
		SideBar_Search_Player="Jugador";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Estado";
		SideBar_Search_PlayerAll="Todos";
		SideBar_Search_PlayerUnknown="Desconocido";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactivo";
		SideBar_Search_PlayerVacation="Vacaciones";
		SideBar_Search_Alliance="Alianza";
		SideBar_Search_Radius="Radio";
		SideBar_Search_Search="Buscar";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="BГєsqueda Avanzada";
		SideBar_Search_EnemyAlliances="Alianzas Enemigas";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["Mensaje a la<br> Alianza","Enviar mensaje a todos los aliados"],
		["Foro "+alliancefullnm,"Al Foro de la Alianza "],
		["Foro " + alliancefullnm +"	mensajes no leГ­dos","A los mensajes no leГ­dos del Foro de la Alianza "],
		["Chatbox(Nueva Ventana)","Chat de la Alianza, abre en nueva ventana"],
		["Chatbox(Frame)","Chat de la Alianza, muestra en chat en frames sin recargarse"],
		["Calculadora de Batallas","Calcula una batalla ... "],
		[" Actualizar Herramientas"+alliancefullnm,"Obtener el Гєltimo script"]];
		IslandLegendAllies="вЂў Aliados";
		IslandLegendNoAlliance="вЂў No Aliados";
		IslandLegendEnemies="вЂў Enemigos";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="TГє tienes actualmente un tratado cultural con este jugador";
		TreatyNo="No tienes tratados culturales con este jugador.";
		updatenotification="Existe una nueva versiГіn de las Herramientas "+alliancefullnm+" .\n Oprime OK si deseas ir a www.ika-core.org y actualizarlas ahora.";
		txtplswait="Espere por favor";
		txtrefresh="Refrescar";
		txtpagedata="- Obteniendo PГЎgina";
		txtinfodata="- Obteniendo InformaciГіn";
		txtchkplayer="- Verificando Jugador";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancelar Tratados Culturales";
		CultureTreatiesRequest=" Solicitar Tratados Culturales";
		break;
	case 'cn':
	case 'hk':
	case 'tw':
		CheckVersionBubbleNegative=	"I checked for a new version , there is none at the moment.";
		NewCoreVersion="New Core Version";
		SideBar_Drag="Hold and Drag to move the SideBar";
		SideBar_Search="Search";
		SideBar_SearchT="Search player/alliance";
		SideBar_ToolsT="Alliance Links";
		SideBar_Notes="Notes";
		SideBar_NotesT="Quick Notes";
		SideBar_Allies="Allies";
		SideBar_AlliesT="Allies - List";
		SideBar_Enemies="Enemies";
		SideBar_EnemiesT="Enemy Players";
		SideBar_Friends="Friends";
		SideBar_FriendsT="Friends List";
		SideBar_Settings="Settings";
		SideBar_SettingsT="Settings - General Configuration ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Global Chat";
		SideBar_Search_Add="Add";
		SideBar_Search_Save="Save";
		SideBar_Search_QuickSearch="Quick Search";
		SideBar_Search_Player="Player";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Player Status";
		SideBar_Search_PlayerAll="All";
		SideBar_Search_PlayerUnknown="Unknown";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactive";
		SideBar_Search_PlayerVacation="Vacation";
		SideBar_Search_Alliance="Alliance";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Search";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Advanced Search";
		SideBar_Search_EnemyAlliances="Enemy Alliances";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		[" з™јйЂЃз›џе…§иЁЉжЃЇ","е‚іиЁЉжЃЇзµ¦ж‰Ђжњ‰иЃЇз›џж€ђе“Ў "],
		[alliancefullnm+" зљ„и«–еЈ‡","иЃЇз›џи«–еЈ‡ "],
		[alliancefullnm +" и«–еЈ‡зљ„ж–°её– ","иЃЇз›џи«–еЈ‡зљ„ж–°з™јиЁЂ "],
		["з›џе…§еЏЉж™‚йЂљ(ж–°и¦–зЄ—)","ењЁж–°и¦–зЄ—й–‹е•џз›џе…§еЏЉж™‚йЂљ "  ],
		["з›џе…§еЏЉж™‚йЂљ(еђЊй Ѓ)","ењЁеђЊдёЂй ЃйЎЇз¤єз›џе…§еЏЉж™‚йЂљ(з„Ўжі•и‡Єе‹•ж›ґж–°) "],
		["ж€°й¬ҐжЁЎж“¬е™Ё","ж€°еЉ›зљ„иЁ€з®— "],
		[alliancefullnm+" Tools зљ„и…іжњ¬ж›ґж–°","ж›ґж–°и‡іжњЂж–°зљ„и…іжњ¬"]];
		IslandLegendAllies="вЂў иЃЇз›џ";
		IslandLegendNoAlliance="вЂў з„ЎиЃЇз›џ";
		IslandLegendEnemies="вЂў ж•µе°Ќе‹ўеЉ›";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="ж­¤зЋ©е®¶е·Іе’ЊдЅ з°ЅзЅІйЃЋж–‡еЊ–жўќзґ„";
		TreatyNo="з„Ўж–‡еЊ–жўќзґ„";
		updatenotification=" еЃµжё¬е€°ж–°з‰€зљ„ "+alliancefullnm+" Tools.\n жЊ‰зўєе®ље°‡йЂЈзµђе€° www.ika-core.org ж›ґж–°";
		txtplswait="и™•зђ†дё­, и«‹иЂђеїѓз­‰еѕ…";
		txtrefresh="иі‡ж–™ж›ґж–°";
		txtpagedata="- еЏ–еѕ—й Ѓйќў";
		txtinfodata="- еЏ–еѕ—иі‡ж–™";
		txtchkplayer="- иЄїжџҐзЋ©е®¶";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" еЏ–ж¶€ж–‡еЊ–жўќзґ„";
		CultureTreatiesRequest=" з°ЅзЅІж–‡еЊ–жўќзґ„";
		break;
	case 'pt':
		CheckVersionBubbleNegative="Procurei por uma nova versГЈo, nГЈo existe nenhuma de momento.";
		NewCoreVersion="Nova VersГЈo Core";
		SideBar_Drag="Pressiona e arrasta para mover o Menu Lateral";
		SideBar_Search="Procurar";
		SideBar_SearchT="Procurar Jogador/AlianГ§a";
		SideBar_ToolsT="HiperligaГ§Гµes AlianГ§a";
		SideBar_Notes="Notas";
		SideBar_NotesT="Notas InstantГўneas";
		SideBar_Allies="Aliados";
		SideBar_AlliesT="Lista de Aliados";
		SideBar_Enemies="Inimigos";
		SideBar_EnemiesT="Jogadores Inimigos";
		SideBar_Friends="Amigos";
		SideBar_FriendsT="Lista de Amigos";
		SideBar_Settings="PreferГЄncias";
		SideBar_SettingsT="PreferГЄncias - ConfiguraГ§ГЈo Geral ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat Global";
		SideBar_Search_Add="Adicionar";
		SideBar_Search_Save="Gravar";
		SideBar_Search_QuickSearch="Procura RГЎpida";
		SideBar_Search_Player="Jogador";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Status do Jogador";
		SideBar_Search_PlayerAll="Todos";
		SideBar_Search_PlayerUnknown="Desconhecido";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactivo";
		SideBar_Search_PlayerVacation="Ferias";
		SideBar_Search_Alliance="AlianГ§a";
		SideBar_Search_Radius="Raio";
		SideBar_Search_Search="Procurar";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Procura AvanГ§ada";
		SideBar_Search_EnemyAlliances="AlianГ§as Inimigas";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["Enviar para AlianГ§a<br> Mensagem","Enviar mensagem para todos os Aliados"],
		["Forum "+alliancefullnm,"Para o FГіrum da AlianГ§a " ],
		[alliancefullnm +" Ver novos Posts","Para o FГіrum da AlianГ§a, Гєltimos posts ",],
		["Chatbox(New Window)","Chat da AlianГ§a, abre numa nova janela"],
		["Chatbox(Frame)","Chat da AlianГ§a, mostra o chat num frame sem recarregar "],
		["Calc de Batalha","Calcula uma Batalha ... "],
		[" Actualiza as Ferramentas da "+alliancefullnm,"ObtГ©m o ultimo Script"]];
		IslandLegendAllies="вЂў Aliados";
		IslandLegendNoAlliance="вЂў Sem Aliados";
		IslandLegendEnemies="вЂў Inimigos";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="JГЎ tens um tratado de cultura com este jogador";
		TreatyNo="NГЈo foram encontrados tratados de cultura com este jogador";
		updatenotification="Existe uma nova versГЈo das ferramentas da "+alliancefullnm+".\n Clica OK, se quiseres podes ir a www.ika-core.org e actualizar agora.";
		txtplswait="Por Favor, Esperar";
		txtrefresh="Actualizar";
		txtpagedata="- A Receber Pagina";
		txtinfodata="- A Receber InformaГ§Гµes";
		txtchkplayer="- A Verificar Jogador";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancelar Tratado de Cultura";
		CultureTreatiesRequest=" Solicitar Tratado de Cultura";
		break;
	case 'bg':
		  CheckVersionBubbleNegative=   "РќСЏРјР° РЅРѕРІР° РІРµСЂСЃРёСЏ Р·Р° РјРѕРјРµРЅС‚Р°.";
          NewCoreVersion="РќР°Р»РёС‡РёРµ РЅР° РЅРѕРІР° РІРµСЂСЃРёСЏ.";
          SideBar_Drag="Р—Р°РґСЂСЉР¶С‚Рµ Рё РїР»СЉР·РЅРµС‚Рµ СЃРєСЂРѕР»РµСЂР°";
          SideBar_Search="РўСЉСЂСЃРё";
          SideBar_SearchT="РўСЉСЂСЃРё РёРіСЂР°С‡/СЃСЉСЋР·";
          SideBar_ToolsT="Р’СЂСЉР·РєРё РЅР° СЃСЉСЋР·Р°";
          SideBar_Notes="Р‘РµР»РµР¶РєРё";
          SideBar_NotesT="Р‘СЉСЂР·Рё Р±РµР»РµР¶РєРё";
          SideBar_Allies="РЎСЉСЋР·Рё";
          SideBar_AlliesT="РЎРїРёСЃСЉРє РЅР° СЃСЉСЋР·Рё";
          SideBar_Enemies="Р’СЂР°РіРѕРІРµ";
          SideBar_EnemiesT="Р?РіСЂР°С‡Рё";
          SideBar_Friends="РџСЂРёСЏС‚РµР»Рё";
          SideBar_FriendsT="РЎРїРёСЃСЉРє РЅР° РїСЂРёСЏС‚РµР»Рё";
          SideBar_Settings="РќР°СЃС‚СЂРѕР№РєРё";
          SideBar_SettingsT="РќР°СЃС‚СЂРѕР№РєРё - РљРѕРЅС„РёРіСѓСЂРёСЂР°РЅРµ ";
          SideBar_Chat="Р§Р°С‚";
          SideBar_ChatT="РћР±С‰ С‡Р°С‚";
          SideBar_Search_Add="РџСЂРёР±Р°РІРё";
          SideBar_Search_Save="Р—Р°РїР°Р·Рё";
          SideBar_Search_QuickSearch="Р‘СЉСЂР·Рѕ С‚СЉСЂСЃРµРЅРµ";
          SideBar_Search_Player="Р?РіСЂР°С‡";
          SideBar_Search_City="City";
		  SideBar_Search_PlayerStatus="РЎС‚Р°С‚СѓСЃ РЅР° РёРіСЂР°С‡Р°";
          SideBar_Search_PlayerAll="Р’СЃРёС‡РєРё";
          SideBar_Search_PlayerUnknown="РќРµРёР·РІРµСЃС‚РµРЅ";
          SideBar_Search_PlayerNormal="РќРѕСЂРјР°Р»РµРЅ";
          SideBar_Search_PlayerInactive="РќРµР°РєС‚РёРІРµРЅ";
          SideBar_Search_PlayerVacation="РћС‚РїСѓСЃРєР°";
          SideBar_Search_Alliance="РЎСЉСЋР·";
          SideBar_Search_Radius="Р Р°РґРёСѓСЃ";
          SideBar_Search_Search="РўСЉСЂСЃРё";
		  SideBar_Search_Clear="Clear";
          SideBar_Search_AdvancedSearch="Р Р°Р·С€РёСЂРµРЅРѕ С‚СЉСЂСЃРµРЅРµ";
          SideBar_Search_EnemyAlliances="Р’СЂР°Р¶РµСЃРєРё СЃСЉСЋР·Рё";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
          AllianceMenu=[
          ["Р?Р·РїСЂР°С‚Рё СЃСЉРѕР±С‰РµРЅРёРµ<br> РґРѕ СЃСЉСЋР·Р°","Р?Р·РїСЂР°С‚Рё СЃСЉРѕР±С‰РµРЅРёРµ РЅР° РІСЃРёС‡РєРё СЃСЉСЋР·РЅРёС†Рё"],
          ["Р¤РѕСЂСѓРј "+alliancefullnm,"РљСЉРј С„РѕСЂСѓРјР° РЅР° СЃСЉСЋР·Р° " ],
          [alliancefullnm +" РЅРѕРІРё РїСѓР±Р»РёРєР°С†РёРё РІСЉРІ С„РѕСЂСѓРјР°","РљСЉРј РїРѕСЃР»РµРґРЅРёС‚Рµ РїСѓР±Р»РёРєР°С†РёРё РІСЉРІ С„РѕСЂСѓРјР° РЅР° СЃСЉСЋР·Р° ",],
          ["Р§Р°С‚ СЃС‚Р°СЏ(РќРѕРІ РїСЂРѕР·РѕСЂРµС†)","РћС‚РІР°СЂСЏ С‡Р°С‚ СЃС‚Р°СЏС‚Р° РЅР° СЃСЉСЋР·Р° РІ РЅРѕРІ РїСЂРѕР·РѕСЂРµС†"],
          ["Р§Р°С‚ СЃС‚Р°СЏ(РџРѕРґСЂР°РјРєР°)","РџРѕРєР°Р·РІР° С‡Р°С‚ СЃС‚Р°СЏС‚Р° РЅР° СЃСЉСЋР·Р° РІ РїРѕРґСЂР°РјРєР° "],
          ["РљР°Р»РєСѓР»Р°С‚РѕСЂ РЅР° Р±РёС‚РєРё","РџР»Р°РЅРёСЂР°Р№ Р±РёС‚РєР° ... "],
          [" РћР±РЅРѕРІРё "+alliancefullnm+" Tools ","Р’Р·РµРјРё РїРѕСЃР»РµРґРЅРёСЏ СЃРєСЂРёРїС‚"]];
          IslandLegendAllies="вЂў РЎСЉСЋР·РЅРє";
          IslandLegendNoAlliance="вЂў РќРµСѓС‚СЂР°Р»РµРЅ";
          IslandLegendEnemies="вЂў Р’СЂР°Рі";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
          TreatyYes="Р?РјР°С‚Рµ РґРѕРіРІРѕСЂ Р·Р° РєСѓР»С‚СѓСЂРµРЅ РѕР±РјРµРЅ СЃ С‚РѕР·Рё РёРіСЂР°С‡.";
          TreatyNo="РќСЏРјР°С‚Рµ РґРѕРіРѕРІРѕСЂ Р·Р° РєСѓР»С‚СѓСЂРµРЅ РѕР±РјРµРЅ СЃ С‚РѕР·Рё РёРіСЂР°С‡.";
          updatenotification="Р?РјР° РЅРѕРІР° РІРµСЂСЃРёСЏ РЅР° "+alliancefullnm+" Tools.\n РќР°С‚РёСЃРЅРё OK, Р°РєРѕ РёСЃРєР°С€ РґР° РѕС‚РёРґРµС€ РЅР° www.ika-core.org Рё РґР° РѕР±РЅРѕРІРёС€.";
          txtplswait="РњРѕР»СЏ, РёР·С‡Р°РєР°Р№С‚Рµ";
          txtrefresh="РћРїСЂРµРЅСЃРЅРё";
          txtpagedata="- РџРѕР»СѓС‡Р°РІР°РЅРµ РЅР° СЃС‚СЂР°РЅРёС†Р°";
          txtinfodata="- РџРѕР»СѓС‡Р°РІР°РЅРµ РЅР° РёРЅС„РѕСЂРјР°С†РёСЏ";
          txtchkplayer="- РџСЂРѕРІРµСЂРєР° РЅР° РёРіСЂР°С‡Р°";
          CultureTreaties="ultur"; //magic word for treaties fix
          CultureTreatiesCancel=" РћС‚РјРµРЅРё РґРѕРіРѕРІРѕСЂР° Р·Р° РєСѓР»С‚СѓСЂРµРЅ РѕР±РјРµРЅ.";
          CultureTreatiesRequest=" РџРѕРёСЃРєР°Р№ РґРѕРіРѕРІРѕСЂ Р·Р° РєСѓР»С‚СѓСЂРµРЅ РѕР±РјРµРЅ.";
		break;
	case 'it':
		CheckVersionBubbleNegative= "Ho cercato una nuova versione , non ce ne sono al momento.";
		NewCoreVersion="Nuova versione di Core";
		SideBar_Drag="Clicca e tieni premuto per spostare la barra";
		SideBar_Search="Cerca";
		SideBar_SearchT="Cerca giocatori/alleanza";
		SideBar_ToolsT="Collegamenti Alleanza";
		SideBar_Notes="Note";
		SideBar_NotesT="Note Rapide";
		SideBar_Allies="Alleati";
		SideBar_AlliesT="Alleati - Lista";
		SideBar_Enemies="Nemici";
		SideBar_EnemiesT="Giocatori Nemici";
		SideBar_Friends="Amici";
		SideBar_FriendsT="Lista Amici";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat Globale";
		SideBar_Search_Add="Aggiungi";
		SideBar_Search_Save="Salva";
		SideBar_Search_QuickSearch="Ricerca Rapida";
		SideBar_Search_Player="Giocatore";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Stato del Giocatore";
		SideBar_Search_PlayerAll="Tutti";
		SideBar_Search_PlayerUnknown="Sconosciuto";
		SideBar_Search_PlayerNormal="Normale";
		SideBar_Search_PlayerInactive="Inattivo";
		SideBar_Search_PlayerVacation="Vacanza";
		SideBar_Search_Alliance="Alleanza";
		SideBar_Search_Radius="Raggio Isole";
		SideBar_Search_Search="Cerca";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Ricerca Avanzata";
		SideBar_Search_EnemyAlliances="Alleanze Nemiche";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["Send Alliance<br> Messaggio","Invia Messaggio all'Alleanza"],
		["Forum "+alliancefullnm,"Al Forum dell'Alleanza" ],
		[alliancefullnm +" new forum posts","Al Forum dell'Alleanza, ultimo post ",],
		["Chatbox(New Window)","Chat dell'alleanza, apri in una nuova finestra"],
		["Chatbox(Frame)","Chat dell'alleanza, mostra chat in un frame senza ricaricare "],
		["Battle Calc","Calcolatore di battaglie ... "],
		[" Update "+alliancefullnm+" Tools ","Ottieni l'ultimo script"]];
		IslandLegendAllies="вЂў Alleati";
		IslandLegendNoAlliance="вЂў Senza Alleanza";
		IslandLegendEnemies="вЂў Nemici";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Hai giГ  un accordo culturale con questo giocatore.";
		TreatyNo="Nessun accordo culturale con questo giocatore.";
		updatenotification="C'ГЁ una nuova versione di "+alliancefullnm+" Tools.\n Clicca su OK se vuoi andare su www.ika-core.org and update ora.";
		txtplswait="Attendere Prego";
		txtrefresh="Aggiornamento";
		txtpagedata="- Ottenimento Pagina";
		txtinfodata="- Ottenimento Informazioni";
		txtchkplayer="- Controllo Giocatore";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancella Accordo Culturale";
		CultureTreatiesRequest=" Richiedi Accordo Culturale";
		break;
	case 'hu':
		CheckVersionBubbleNegative="EllenЕ‘riztem, de pillanatnyilag nincs Гєj verziГі.";
		NewCoreVersion="Гљj Core verziГі";
		SideBar_Drag="Ragadd meg lenyomott bal egГ©rgombal az oldalsГЎvot az ГЎthelyezГ©shez";
		SideBar_Search="KeresГ©s";
		SideBar_SearchT="JГЎtГ©kos/SzГ¶vetsГ©g keresГ©se";
		SideBar_ToolsT="SzГ¶vetsГ©g linkek";
		SideBar_Notes="Jegyzetek";
		SideBar_NotesT="Gyors Jegyzet";
		SideBar_Allies="SzГ¶vetsГ©gesek";
		SideBar_AlliesT="SzГ¶vetsГ©gesek listГЎja";
		SideBar_Enemies="EllensГ©gek";
		SideBar_EnemiesT="EllensГ©ges jГЎtГ©kosok";
		SideBar_Friends="BarГЎtok";
		SideBar_FriendsT="BarГЎtok listГЎja";
		SideBar_Settings="BeГЎllГ­tГЎsok";
		SideBar_SettingsT="BeГЎllГ­tГЎsok - AlapvetЕ‘ konfigorГЎciГі ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Globalis Chat";
		SideBar_Search_Add="HozzГЎad";
		SideBar_Search_Save="MentГ©s";
		SideBar_Search_QuickSearch="GyorskeresЕ‘";
		SideBar_Search_Player="JГЎtГ©kos";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="JГЎtГ©kos stГЎtusza";
		SideBar_Search_PlayerAll="Г–sszes";
		SideBar_Search_PlayerUnknown="Ismeretlen";
		SideBar_Search_PlayerNormal="NormГЎl";
		SideBar_Search_PlayerInactive="InaktГ­v";
		SideBar_Search_PlayerVacation="VakГЎciГі";
		SideBar_Search_Alliance="SzГ¶vetsГ©g";
		SideBar_Search_Radius="SugГЎr";
		SideBar_Search_Search="KeresГ©s";
		SideBar_Search_Clear="TГ¶rlГ©s";
		SideBar_Search_AdvancedSearch="SpeciГЎlis keresЕ‘";
		SideBar_Search_EnemyAlliances="EllensГ©ges szГ¶vetsГ©gek";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["SzГ¶vetsГ©g<br> KГ¶rГјzenet","Гњzenet kГјldГ©se az Г¶sszes szГ¶vetsГ©gesnek"],
		["FГіrum "+alliancefullnm,"A SzГ¶vetsГ©gi fГіrum megnyitГЎsa " ],
		[alliancefullnm +" Гљj FГіrum hozzГЎszГіlГЎsok","A SzГ¶vetsГ©gi fГіrum legГєjabb hozzГЎszГіlГЎsai ",],
		["Chat (Гєj ablakban)","SzГ¶vetsГ©g Chat, Гљj ablakban nyГ­lik meg"],
		["Chat (keretben)","SzГ¶vetsГ©g Chat, a chat megjelenГ­tГ©se keretben, ГєjratГ¶ltГ©s nГ©lkГјl "],
		["Harci kalkulГЎtor","Harc kikalkulГЎlГЎsa ... "],
		[ +alliancefullnm+" SzerszГЎmkГ©szlet frissГ­tГ©se ","A legfrissebb script megszerzГ©se"]];
		IslandLegendAllies="вЂў SzГ¶vetsГ©gesek";
		IslandLegendNoAlliance="вЂў Nincs szГ¶vetsГ©gben";
		IslandLegendEnemies="вЂў EllensГ©gek";
		TreatyAll="Minden jГЎtГ©kos ellenЕ‘rizve. SГЎgra szГ­nЕ±ekkel nincs egyezmГ©ny, a szГјrkГ©kkel van.";
		TreatyYes="A jГЎtГ©kossal kultГєrГЎlis egyezmГ©nyed van";
		TreatyNo="A jГЎtГ©kossal nincs kultГєrГЎlis egyezmГ©nyed";
		updatenotification="Itt talГЎlhatГі a "+alliancefullnm+" SzerszГЎmkГ©szlet legГєjabb vГЎltozata.\n Klikkelj az OK gombra, ha szeretnГ©d megnyitni a www.ika-core.org oldalt, Г©s frissГ­tenГ©l.";
		txtplswait="KГ©rlek vГЎrj";
		txtrefresh="FrissГ­tГ©s";
		txtpagedata="- Oldal lekГ©rГ©se";
		txtinfodata="- InfГі lekГ©rГ©se";
		txtchkplayer="- JГЎtГ©kos ellenЕ‘rzГ©se";
		CultureTreaties="ultГє"; //magic word for treaties fix
		CultureTreatiesCancel=" KultГєrГЎlis egyezmГ©ny megszГјntetГ©se";
		CultureTreatiesRequest=" KultГєrГЎlis egyezmГ©ny felajГЎnlГЎsa";
	break;
	case 'br':
		CheckVersionBubbleNegative="Procurei por novas versГµes do Core, nГЈo hГЎ nenhuma disponГ­vel no momento.";
		NewCoreVersion="Nova VersГЈo do Core";
		SideBar_Drag="Clique e arraste para mover o Menu Lateral";
		SideBar_Search="Procurar";
		SideBar_SearchT="Procurar Jogadores/AlianГ§as";
		SideBar_ToolsT="Links da AlianГ§a";
		SideBar_Notes="AnotaГ§Гµes";
		SideBar_NotesT="AnotaГ§Гµes RГЎpidas";
		SideBar_Allies="Aliados";
		SideBar_AlliesT="Lista de Aliados";
		SideBar_Enemies="Inimigos";
		SideBar_EnemiesT="Jogadores Inimigos";
		SideBar_Friends="Amigos";
		SideBar_FriendsT="Lista de Amigos";
		SideBar_Settings="PreferГЄncias";
		SideBar_SettingsT="PreferГЄncias - ConfiguraГ§Гµes Gerais ";
		SideBar_Chat="Bate-Papo";
		SideBar_ChatT="Bate-Papo Global";
		SideBar_Search_Add="Adicionar";
		SideBar_Search_Save="Salvar";
		SideBar_Search_QuickSearch="Busca RГЎpida";
		SideBar_Search_Player="Jogador";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Estado do Jogador";
		SideBar_Search_PlayerAll="Todos";
		SideBar_Search_PlayerUnknown="Desconhecido";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inativo";
		SideBar_Search_PlayerVacation="FГ©rias";
		SideBar_Search_Alliance="AlianГ§a";
		SideBar_Search_Radius="Raio";
		SideBar_Search_Search="Busca";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Busca AvanГ§ada";
		SideBar_Search_EnemyAlliances="AlianГ§as Inimigas";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["Send Alliance<br> Message","Enviar mensagem para todos os aliados"],
		["Forum "+alliancefullnm,"Para o FГіrum da AlianГ§a" ],
		[alliancefullnm +" novos posts","Para o FГіrum da AlianГ§a, Гєltimos posts ",],
		["Chatbox(New Window)","Bate-Papo da AlianГ§a, abre em uma nova janela "],
		["Chatbox(Frame)","Bate-Papo da AlianГ§a, mostra o chat em um frame que nГЈo recarrega "],
		["Battle Calc","Calculadora de batalhas ... "],
		[" Update "+alliancefullnm+" Tools ","Pegar o Гєltimo Script"]];
		IslandLegendAllies="вЂў Aliados";
		IslandLegendNoAlliance="вЂў Sem AlianГ§a";
		IslandLegendEnemies="вЂў Inimigos";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="VocГЄ jГЎ tem um tratado cultural com esse jogador.";
		TreatyNo="NГЈo foram encontrados tratados culturais com este jogador.";
		updatenotification="Existe uma nova versГЈo das ferramentas da  "+alliancefullnm+".\n Clique em OK se vocГЄ quer ir para www.ika-core.org e atualizar agora.";
		txtplswait="Por Favor Espere";
		txtrefresh="Atualizar";
		txtpagedata="- Criando PГЎgina";
		txtinfodata="- Conseguindo InformaГ§ГЈo";
		txtchkplayer="- Checando Jogador";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancelar Tratado Cultural";
		CultureTreatiesRequest=" Requisitar Tratado Cultural";
	break;
	case 'ru':
		CheckVersionBubbleNegative="РќРµС‚Сѓ РЅРѕРІС‹С… РІРµСЂСЃРёР№ РІ РґР°РЅРЅС‹Р№ РјРѕРјРµРЅС‚.";
		NewCoreVersion="РќРѕРІР°СЏ РІРµСЂСЃРёСЏ СЏРґСЂР°";
		SideBar_Drag="РЈРґРµСЂР¶РёРІР°Р№С‚Рµ Рё РґРІРёРіР°Р№С‚Рµ РґР»СЏ РїРµСЂРµРјРµС‰РµРЅРёСЏ Р±РѕРєРѕРІРѕРіРѕ РјРµРЅСЋ";
		SideBar_Search="РџРѕРёСЃРє";
		SideBar_SearchT="РџРѕРёСЃРє РёРіСЂРѕРєР°/Р°Р»СЊСЏРЅСЃР°";
		SideBar_ToolsT="РЎСЃС‹Р»РєРё РЅР° Р°Р»СЊСЏРЅСЃ";
		SideBar_Notes="Р—Р°РјРµС‚РєРё";
		SideBar_NotesT="Р‘С‹СЃС‚СЂС‹Рµ Р·Р°РјРµС‚РєРё";
		SideBar_Allies="РЎРѕСЋР·РЅРёРєРё";
		SideBar_AlliesT="РЎРїРёСЃРѕРє СЃРѕСЋР·РЅРёРєРѕРІ";
		SideBar_Enemies="Р’СЂР°РіРё";
		SideBar_EnemiesT="РЎРїРёСЃРѕРє РІСЂР°РіРѕРІ";
		SideBar_Friends="Р”СЂСѓР·СЊСЏ";
		SideBar_FriendsT="РЎРїРёСЃРѕРє РґСЂСѓР·РµР№";
		SideBar_Settings="РќР°СЃС‚СЂРѕР№РєРё";
		SideBar_SettingsT="РќР°СЃС‚СЂРѕР№РєРё - РћР±С‰Р°СЏ РєРѕРЅС„РёРіСѓСЂР°С†РёСЏ ";
		SideBar_Chat="Р§Р°С‚";
		SideBar_ChatT="Р“Р»РѕР±Р°Р»СЊРЅС‹Р№ С‡Р°С‚";
		SideBar_Search_Add="Р”РѕР±Р°РІРёС‚СЊ";
		SideBar_Search_Save="РЎРѕС…СЂР°РЅРёС‚СЊ";
		SideBar_Search_QuickSearch="Р‘С‹СЃС‚СЂС‹Р№ РїРѕРёСЃРє";
		SideBar_Search_Player="Р?РіСЂРѕРє";
		SideBar_Search_City="Р“РѕСЂРѕРґ";
		SideBar_Search_PlayerStatus="Р?РіСЂРѕРІРѕР№ СЃС‚Р°С‚СѓСЃ";
		SideBar_Search_PlayerAll="Р’СЃРµ";
		SideBar_Search_PlayerUnknown="РќРµРѕРїСЂРµРґРµР»С‘РЅРЅС‹Рµ";
		SideBar_Search_PlayerNormal="РќРѕСЂРјР°Р»СЊРЅС‹Рµ";
		SideBar_Search_PlayerInactive="РќРµР°РєС‚РёРІРЅС‹Рµ";
		SideBar_Search_PlayerVacation="Р’ РѕС‚РїСѓСЃРєРµ";
		SideBar_Search_Alliance="РђР»СЊСЏРЅСЃ";
		SideBar_Search_Radius="Р Р°РґРёСѓСЃ";
		SideBar_Search_Search="РџРѕРёСЃРє";
		SideBar_Search_Clear="РћС‡РёСЃС‚РёС‚СЊ";
		SideBar_Search_AdvancedSearch="Р Р°СЃС€РёСЂРµРЅРЅС‹Р№ РїРѕРёСЃРє";
		SideBar_Search_EnemyAlliances="Р’СЂР°Р¶РµСЃРєРёРµ Р°Р»СЊСЏРЅСЃС‹";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["РћС‚РїСЂР°РІРёС‚СЊ РђР»СЊСЏРЅСЃСѓ<br> РЎРѕРѕР±С‰РµРЅРёРµ","РћС‚РїСЂР°РІРёС‚СЊ СЃРѕРѕР±С‰РµРЅРёРµ РІСЃРµРј СЃРѕСЋР·РЅРёРєР°Рј"],
		["Р¤РѕСЂСѓРј "+alliancefullnm,"РќР° С„РѕСЂСѓРј Р°Р»СЊСЏРЅСЃР° " ],
		[alliancefullnm +" РЅРѕРІС‹Рµ СЃРѕРѕР±С‰РµРЅРёСЏ РЅР° С„РѕСЂСѓРјРµ","Рљ РїРѕСЃР»РµРґРЅРёРј СЃРѕРѕР±С‰РµРЅРёСЏ РЅР° С„РѕСЂСѓРјРµ Р°Р»СЊСЏРЅСЃР° ",],
		["Chatbox(Р’ РЅРѕРІРѕРј РѕРєРЅРµ)","Р§Р°С‚ Р°Р»СЊСЏРЅСЃР°, РѕС‚РєСЂС‹РІР°РµС‚СЃСЏ РІ РЅРѕРІРѕРј РѕРєРЅРµ"],
		["Chatbox(Frame)","Р§Р°С‚ Р°Р»СЊСЏРЅСЃР°, С‡Р°С‚ РѕС‚РѕР±СЂР°Р¶Р°РµС‚СЃСЏ РІ frames Р±РµР· РѕР±РЅРѕРІР»РµРЅРёСЏ "],
		["РљР°Р»СЊРєСѓР»СЏС‚РѕСЂ Р±РёС‚РІ","Р’С‹С‡РёСЃР»РµРЅРёРµ Р±РёС‚РІС‹ ... "],
		[" РћР±РЅРѕРІРёС‚СЊ "+alliancefullnm+" Tools ","РџРѕР»СѓС‡РёС‚СЊ РїРѕСЃР»РµРґРЅРёР№ СЃРєСЂРёРїС‚"]];
		IslandLegendAllies="вЂў РЎРѕСЋР·РЅРёРєРё";
		IslandLegendNoAlliance="вЂў РќРµР№С‚СЂР°Р»СЊРЅС‹Рµ";
		IslandLegendEnemies="вЂў Р’СЂР°РіРё";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Р’С‹ РёРјРµРµС‚Рµ РєСѓР»СЊС‚СѓСЂРЅС‹Р№ РґРѕРіРѕРІРѕСЂ СЃ СЌС‚РёРј РёРіСЂРѕРєРѕРј";
		TreatyNo="РќРёРєР°РєРёРµ РєСѓР»СЊС‚СѓСЂРЅС‹Рµ РґРѕРіРѕРІРѕСЂР° РЅРµ РЅР°Р№РґРµРЅС‹ РґР»СЏ СЌС‚РѕРіРѕ РёРіСЂРѕРєР°.";
		updatenotification="Р•СЃС‚СЊ Р±РѕР»РµРµ РЅРѕРІР°СЏ РІРµСЂСЃРёСЏ "+alliancefullnm+" Tools.\n РќР°Р¶РјРёС‚Рµ РЅР° OK, РµСЃР»Рё Р’С‹ С…РѕС‚РёС‚Рµ РїРµСЂРµР№С‚Рё РЅР° www.ika-core.org Рё РѕР±РЅРѕРІРёС‚СЊ СЃРµР№С‡Р°СЃ.";
		txtplswait="РџРѕР¶Р°Р»СѓР№СЃС‚Р° РїРѕРґРѕР¶РґРёС‚Рµ";
		txtrefresh="РћР±РЅРѕРІР»РµРЅРёРµ";
		txtpagedata="- РџРѕР»СѓС‡РµРЅРёРµ РЎС‚СЂР°РЅРёС†С‹";
		txtinfodata="- РџРѕР»СѓС‡РµРЅРёРµ Р?РЅС„РѕСЂРјР°С†РёРё";
		txtchkplayer="- РџСЂРѕРІРµСЂРєР° РёРіСЂРѕРєР°";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" РћС‚РјРµРЅРёС‚СЊ РљСѓР»СЊС‚СѓСЂРЅС‹Р№ Р”РѕРіРѕРІРѕСЂ";
		CultureTreatiesRequest=" Р—Р°РїСЂРѕСЃРёС‚СЊ РљСѓР»СЊС‚СѓСЂРЅС‹Р№ Р”РѕРіРѕРІРѕСЂ";
      break;
	case 'pl':
		CheckVersionBubbleNegative="Aktualnie nie ma nowej wersji skryptu";
		NewCoreVersion="Nowa wersja skryptu";
		SideBar_Drag="Kliknij i przeciД…gnij aby przesunД…Д‡ SideBar";
		SideBar_Search="Wyszukaj";
		SideBar_SearchT="Wyszukaj gracza/sojusz";
		SideBar_ToolsT="Linki sojuszu";
		SideBar_Notes="Notatki";
		SideBar_NotesT="Szybkie notatki";
		SideBar_Allies="Sojusze";
		SideBar_AlliesT="Lista sojuszy";
		SideBar_Enemies="Wrogowie";
		SideBar_EnemiesT="Lista wrogГіw";
		SideBar_Friends="Przyjaciele";
		SideBar_FriendsT="Lista przyjaciГіЕ‚";
		SideBar_Settings="Ustawienia";
		SideBar_SettingsT="Ustawienia - OgГіlne ";
		SideBar_Chat="Czat";
		SideBar_ChatT="Czat ogГіlny";
		SideBar_Search_Add="Dodaj";
		SideBar_Search_Save="Zapisz";
		SideBar_Search_QuickSearch="Szybkie wyszukiwanie";
		SideBar_Search_Player="Gracz";
		SideBar_Search_City="Miasto"; //NEW
		SideBar_Search_PlayerStatus="Status gracza";
		SideBar_Search_PlayerAll="Wszystkie";
		SideBar_Search_PlayerUnknown="Nieznany";
		SideBar_Search_PlayerNormal="Normalny";
		SideBar_Search_PlayerInactive="Nieaktywny";
		SideBar_Search_PlayerVacation="Urlop";
		SideBar_Search_Alliance="Sojusz";
		SideBar_Search_Radius="PromieЕ„";
		SideBar_Search_Search="Szukaj";
		SideBar_Search_Clear="WyczyЕ›Д‡"; //NEW
		SideBar_Search_AdvancedSearch="Wyszukiwanie zaawansowane";
		SideBar_Search_EnemyAlliances="Wrogie sojusze";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["WyЕ›lij wiadomoЕ›Д‡ sojuszowД…","WyЕ›lij wiadomoЕ›Д‡ do wszystkich sojusznikГіw"],
		["Forum "+alliancefullnm,"do forum sojuszu " ],
		[alliancefullnm +" nowe posty na forum","PrzejdЕє do najnowych postГіw na forum sojuszu ",],
		["Czat(Nowe okno)","Czat sojuszu w nowym oknie"],
		["Czat(Ramka)","Czat sojuszu w ramce, bez odЕ›wieЕјania "],
		["Kalkulator bitw","SprawdЕє swoje szanse w bitwie "],
		[" Uaktualnienie "+alliancefullnm+" Tools ","Pobiera najnowszД… wersje skryptu"]];
		IslandLegendAllies="вЂў Sojusz";
		IslandLegendNoAlliance="вЂў Brak sojuszu";
		IslandLegendEnemies="вЂў WrГіg";
		TreatyAll="Wszyscy gracze zostali sprawdzeni - kolor ЕјГіЕ‚ty oznacza brak traktatu, szary juЕј podpisany traktat.";
		TreatyYes="JuЕј masz podpisany traktat kulturowy z tym graczem.";
		TreatyNo="Brak podpisanych traktatГіw kulturowych z tym graczem.";
		updatenotification="PojawiЕ‚a sie nowa wersja "+alliancefullnm+" Tools.\n Kliknij OK jeЕ›li chcesz przejЕ›Д‡ do www.ika-core.org i zaktualizowaД‡ skrypt.";
		txtplswait="ProszД™ czekaД‡";
		txtrefresh="OdЕ›wieЕј";
		txtpagedata="- Pobieram stronД™";
		txtinfodata="- Pobieram informacje";
		txtchkplayer="- Sprawdzam gracza";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Zerwij traktat kulturowy";
		CultureTreatiesRequest=" PoproЕ› o traktat kulturowy";
	break;
	case 'rs':
		CheckVersionBubbleNegative=   "РџСЂРѕРІРµСЂРёРѕ СЃР°Рј РґР° Р»Рё РїРѕСЃС‚РѕС?Рё РЅРѕРІРёС?Р° РІРµСЂР·РёС?Р°, С‚СЂРµРЅСѓС‚РЅРѕ РЅРµРјР° РґРѕСЃС‚СѓРїРЅРёС….";
		NewCoreVersion="РќРѕРІР° Core РІРµСЂР·РёС?Р°";
		SideBar_Drag="РљР»РёРєРЅРё Рё РїСЂРµРІСѓС†Рё РґР° РїСЂРµРјРµСЃС‚РёС€ РјРµРЅРё";
		SideBar_Search="РџСЂРµС‚СЂР°РіР°";
		SideBar_SearchT="РўСЂР°Р¶РµСљРµ РёРіСЂР°С‡Р°/СЃР°РІРµР·Р°";
		SideBar_ToolsT="Р›РёРЅРєРѕРІРё СЃР°РІРµР·Р°";
		SideBar_Notes="Р‘РµР»РµС€РєРµ";
		SideBar_NotesT="РљСЂР°С‚РєРµ Р±РµР»РµС€РєРµ";
		SideBar_Allies="РЎР°РІРµР·РЅРёС†Рё";
		SideBar_AlliesT="РЎРїРёСЃР°Рє СЃР°РІРµР·РЅРёРєР°";
		SideBar_Enemies="РќРµРїСЂРёС?Р°С‚РµС™Рё";
		SideBar_EnemiesT="РќРµРїСЂРёС?Р°С‚РµС™СЃРєРё РёРіСЂР°С‡Рё";
		SideBar_Friends="РќРµРїСЂРёС?Р°С‚РµС™СЃРєРё СЃР°РІРµР·Рё";
		SideBar_FriendsT="РЎРїРёСЃР°Рє РїСЂРёС?Р°С‚РµС™Р°";
		SideBar_Settings="РџРѕРґРµС€Р°РІР°СљР°";
		SideBar_SettingsT="РџРѕРґРµС€Р°РІР°СљР° - РѕРїС€С‚Р° РєРѕРЅС„РёРіСѓСЂР°С†РёС?Р°";
		SideBar_Chat="Р‹Р°СЃРєР°СљРµ";
		SideBar_ChatT="РћРїС€С‚Рѕ С›Р°СЃРєР°СљРµ";
		SideBar_Search_Add="Р”РѕРґР°С?";
		SideBar_Search_Save="РЎР°С‡СѓРІР°С?";
		SideBar_Search_QuickSearch="Р‘СЂР·Р° РїСЂРµС‚СЂР°РіР°";
		SideBar_Search_Player="Р?РіСЂР°С‡";
		SideBar_Search_City="Р“СЂР°Рґ"; //NEW
		SideBar_Search_PlayerStatus="РЎС‚Р°С‚СѓСЃ РёРіСЂР°С‡Р°";
		SideBar_Search_PlayerAll="РЎРІРё";
		SideBar_Search_PlayerUnknown="РќРµРїРѕР·РЅР°С‚";
		SideBar_Search_PlayerNormal="РђРєС‚РёРІР°РЅ";
		SideBar_Search_PlayerInactive="РќРµР°РєС‚РёРІР°РЅ";
		SideBar_Search_PlayerVacation="РћРґСЃСѓС‚Р°РЅ";
		SideBar_Search_Alliance="РЎР°РІРµР·";
		SideBar_Search_Radius="РЈРґР°С™РµРЅРѕСЃС‚";
		SideBar_Search_Search="РўСЂР°Р¶Рё";
		SideBar_Search_Clear="РћС‡РёСЃС‚Рё"; //NEW
		SideBar_Search_AdvancedSearch="РќР°РїСЂРµРґРЅР° РїСЂРµС‚СЂР°РіР°";
		SideBar_Search_EnemyAlliances="РќРµРїСЂРёС?Р°С‚РµС™СЃРєРё СЃР°РІРµР·Рё";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["РџРѕС€Р°С™Рё РєСЂСѓР¶РЅСѓ<br> РїРѕСЂСѓРєСѓ","РџРѕС€Р°С™Рё РїРѕСЂСѓРєСѓ СЃРІРёРј СЃР°РІРµР·РЅРёС†РёРјР°"],
		["Р¤РѕСЂСѓРј "+alliancefullnm,"РџРѕСЃРµС‚Рё С„РѕСЂСѓРј СЃР°РІРµР·Р° " ],
		[alliancefullnm +" РЅРѕРІРµ РїРѕСЂСѓРєРµ РЅР° С„РѕСЂСѓРјСѓ","РџСЂРѕС‡РёС‚Р°С? РїРѕСЃР»РµРґСљРµ РїРѕСЂСѓРєРµ РЅР° С„РѕСЂСѓРјСѓ СЃР°РІРµР·Р° ",],
		["Р‹Р°СЃРєР°СљРµ(РЅРѕРІРё РїСЂРѕР·РѕСЂ)","РЎР°РІРµР·РЅРѕ С›Р°СЃРєР°СљРµ, РѕС‚РІР°СЂР° СЃРµ Сѓ РЅРѕРІРѕРј РїСЂРѕР·РѕСЂСѓ"],
		["Р‹Р°СЃРєР°СљРµ(РѕРєРІРёСЂ)","РЎР°РІРµР·РЅРѕ С›Р°СЃРєР°СљРµ, РїСЂРёРєР°Р·СѓС?Рµ С›Р°СЃРєР°СљРµ РїРѕРјРѕС›Сѓ РѕРєРІРёСЂР° - Р±РµР· РЅРѕРІРѕРі СѓС‡РёС‚Р°РІР°СљР° "],
		["РљР°Р»РєСѓР»Р°С‚РѕСЂ Р±РѕСЂР±Рµ","РџСЂРµРґРІРёС’Р° РёСЃС…РѕРґ Р±РёС‚РєРµ ... "],
		[" РђР¶СѓСЂРёСЂР°С? "+alliancefullnm+" Р°Р»Р°С‚Рµ ","РџСЂРµСѓР·РёРјР°СљРµ РЅР°С?СЃРІРµР¶РёС?Рµ СЃРєСЂРёРїС‚Рµ"]];
		IslandLegendAllies="вЂў РЎР°РІРµР·РЅРёС†Рё";
		IslandLegendNoAlliance="вЂў Р‘РµР· СЃР°РІРµР·Р°";
		IslandLegendEnemies="вЂў РќРµРїСЂРёС?Р°С‚РµС™Рё";
		TreatyAll="РЎРІРё РёРіСЂР°С‡Рё СЃСѓ РїСЂРѕРІРµСЂРµРЅРё. Р–СѓС‚РѕРј Р±РѕС?РѕРј СЃСѓ РѕР·РЅР°С‡РµРЅРё РёРіСЂР°С‡Рё СЃР° РєРѕС?РёРјР° РЅРµРјР°С‚Рµ СЃРїРѕСЂР°Р·СѓРј, Р° СЃРёРІРѕРј РѕРЅРё СЃР° РєРѕС?РёРјР° РёРјР°С‚Рµ.";
		TreatyYes="Р’РµС› РёРјР°С‚Рµ РєСѓР»С‚СѓСЂРЅРё СЃРїРѕСЂР°Р·СѓРј СЃР° РѕРІРёРј РёРіСЂР°С‡РµРј";
		TreatyNo="РљСѓР»С‚СѓСЂРЅРё СЃРїРѕСЂР°Р·СѓРјРё СЃР° РѕРІРёРј РёРіСЂР°С‡РµРј РЅРёСЃСѓ РЅР°С’РµРЅРё.";
		updatenotification="РџРѕСЃС‚РѕС?Рё РЅРѕРІРёС?Р° РІРµСЂР·РёС?Р° СЃРєСЂРёРїС‚Рµ "+alliancefullnm+" Р°Р»Р°С‚Рё.\n РљР»РёРєРЅРёС‚Рµ РћРљ Р°РєРѕ Р¶РµР»РёС‚Рµ РґР° РїРѕСЃРµС‚РёС‚Рµ www.ika-core.org Рё РїСЂРµСѓР·РјРµС‚Рµ С?Рµ.";
		txtplswait="РњРѕР»РёРјРѕ, СЃР°С‡РµРєР°С?С‚Рµ";
		txtrefresh="РћСЃРІРµР¶Рё";
		txtpagedata="- РџСЂРёРїСЂРµРјР°СљРµ СЃС‚СЂР°РЅРµ";
		txtinfodata="- РџСЂРёРїСЂРµРјР°СљРµ РёРЅС„РѕСЂРјР°С†РёС?Р°";
		txtchkplayer="- РџСЂРѕРІРµСЂР°РІР°СљРµ РёРіСЂР°С‡Р°";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" РћС‚РєР°Р¶Рё РєСѓР»С‚СѓСЂРЅРё СЃРїРѕСЂР°Р·СѓРј";
		CultureTreatiesRequest=" РџРѕРЅСѓРґРё РєСѓР»С‚СѓСЂРЅРё СЃРїРѕСЂР°Р·СѓРј";
	break;
	case 'ba':
		CheckVersionBubbleNegative="Provereno za nove verzije, trenutno nema dostupnih.";
		NewCoreVersion="Nova Core Verzija";
		SideBar_Drag="Pritisni i Prevuci za pomeranje SideBara";
		SideBar_Search="Pretraga";
		SideBar_SearchT="TraЕѕi igraДЌa/savez";
		SideBar_ToolsT="Savezni linkovi";
		SideBar_Notes="BeleЕЎke";
		SideBar_NotesT="Brze BeleЕЎke";
		SideBar_Allies="Saveznici";
		SideBar_AlliesT="Saveznici - Lista";
		SideBar_Enemies="Neprijatelji";
		SideBar_EnemiesT="Neprijateljski IgraДЌi";
		SideBar_Friends="Prijatelji";
		SideBar_FriendsT="Lista Prijatelja";
		SideBar_Settings="PodeЕЎavanja";
		SideBar_SettingsT="PodeЕЎavanja - OpЕЎta PodeЕЎavanja ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Globalni Chat";
		SideBar_Search_Add="Dodaj";
		SideBar_Search_Save="SaДЌuvaj";
		SideBar_Search_QuickSearch="Brza Pretraga";
		SideBar_Search_Player="IgraДЌ";
		SideBar_Search_City="Grad"; //NEW
		SideBar_Search_PlayerStatus="Status IgraДЌa";
		SideBar_Search_PlayerAll="Svi";
		SideBar_Search_PlayerUnknown="Nepoznati";
		SideBar_Search_PlayerNormal="Standardni";
		SideBar_Search_PlayerInactive="Neaktivni";
		SideBar_Search_PlayerVacation="Odmor";
		SideBar_Search_Alliance="Savez";
		SideBar_Search_Radius="Radijus";
		SideBar_Search_Search="Pretraga";
		SideBar_Search_Clear="ObriЕЎi"; //NEW
		SideBar_Search_AdvancedSearch="Napredna Pretraga";
		SideBar_Search_EnemyAlliances="Neprijateljski Savezi";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["Send Alliance<br> Message","PoЕЎalji poruku svim saveznicima"],
		["Forum "+alliancefullnm,"SkoДЌi na Forum Saveza " ],
		[alliancefullnm +" new forum posts","Skoi na Forum Saveza, poslednje poruke ",],
		["Chatbox(New Window)","Savezni Chat, otvara se u novom prozoru"],
		["Chatbox(Frame)","Savezni Chat, prikazuje chat u okvirima bez novog uДЌitavanja "],
		["Battle Calc","PreraДЌunava bitku ... "],
		[" Update "+alliancefullnm+" Tools ","Preuzmi najsveЕѕiju skriptu"]];
		IslandLegendAllies="вЂў Saveznici";
		IslandLegendNoAlliance="вЂў Bez Saveza";
		IslandLegendEnemies="вЂў Neprijatelji";
		TreatyAll="Svi igraДЌi su provereni. ЕЅuta boja predstavlja bez ugovora, Siva za postojeД‡e.";
		TreatyYes="VeД‡ imate kulturni Sporazum sa ovim igraДЌem";
		TreatyNo="Nema kulturnih Sporazuma pronaД‘enih za ovog igraДЌa.";
		updatenotification="Postoji sveЕѕija verzija "+alliancefullnm+" Alata.\n Kliknite na OK ako Еѕelite da odete na www.ika-core.org i aЕѕurirate sada.";
		txtplswait="Molimo SaДЌekajte";
		txtrefresh="OsveЕѕi";
		txtpagedata="- Pripremam Stranu";
		txtinfodata="- Pripremam Info";
		txtchkplayer="- Provera IgraДЌa";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" OtkaЕѕi Kulturni Sporazum";
		CultureTreatiesRequest=" ZatraЕѕi Kulturni Sporazum";
	break;
	case 'ae':
		CheckVersionBubbleNegative=   "Щ„Ш§ ЩЉЩ€Ш¬ШЇ Ш­Ш§Щ„ЩЉШ§ ШЈЩЉ Щ†ШіШ®Ш© Ш¬ШЇЩЉШЇШ©";
		NewCoreVersion="Щ†ШіШ®Ш© Ш¬ШЇЩЉШЇШ©";
		SideBar_Drag="Ш§ШіШ­ШЁ Щ€ Ш§ЩЃЩ„ШЄ Щ„ШЄШ­Ш±Щѓ Ш§Щ„ШґШ±ЩЉШ·";
		SideBar_Search="ШЁШ­Ш«";
		SideBar_SearchT="ШЁШ­Ш« Ш№Щ† Щ„Ш§Ш№ШЁЩЉЩ† / ШЄШ­Ш§Щ„ЩЃШ§ШЄ";
		SideBar_ToolsT="Ш±Щ€Ш§ШЁШ· Ш§Щ„ШЄШ­Ш§Щ„ЩЃ";
		SideBar_Notes="Ш§Щ„Щ…Щ„Ш§Ш­ШёШ§ШЄ";
		SideBar_NotesT="Щ…Щ„Ш§Ш­ШёШ§ШЄ ШіШ±ЩЉШ№Ш©";
		SideBar_Allies="Ш§Щ„Ш­Щ„ЩЃШ§ШЎ";
		SideBar_AlliesT="Щ‚Ш§Ш¦Щ…Ш© Ш§Щ„Ш­Щ„ЩЃШ§ШЎ";
		SideBar_Enemies="Ш§Щ„ШЈШ№ШЇШ§ШЎ";
		SideBar_EnemiesT="Ш§Щ„Щ„Ш§Ш№ШЁЩ€Щ† Ш§Щ„ШЈШ№ШЇШ§ШЎ";
		SideBar_Friends="Ш§Щ„ШЈШµШЇЩ‚Ш§ШЎ";
		SideBar_FriendsT="Щ‚Ш§Ш¦Щ…Ш© Ш§Щ„ШЈШµШЇЩ‚Ш§ШЎ";
		SideBar_Settings="ШҐШ№ШЇШ§ШЇШ§ШЄ";
		SideBar_SettingsT="ШҐШ№ШЇШ§ШЇШ§ШЄ Ш№Ш§Щ…Ш© ";
		SideBar_Chat="Щ…Ш­Ш§ШЇШ«Ш©";
		SideBar_ChatT="Щ…Ш­Ш§ШЇШ«Ш© Ш№Ш§Щ„Щ…ЩЉШ©";
		SideBar_Search_Add="ШЈШ¶ЩЃ";
		SideBar_Search_Save="Ш­ЩЃШё";
		SideBar_Search_QuickSearch="ШЁШ­Ш« ШіШ±ЩЉШ№";
		SideBar_Search_Player="Щ„Ш§Ш№ШЁ";
		SideBar_Search_City="Щ…ШЇЩЉЩ†Ш©"; //NEW
		SideBar_Search_PlayerStatus="Ш­Ш§Щ„Ш© Ш§Щ„Щ„Ш§Ш№ШЁ";
		SideBar_Search_PlayerAll="ЩѓЩ„";
		SideBar_Search_PlayerUnknown="ШєЩЉШ± Щ…Ш№Ш±Щ€ЩЃ";
		SideBar_Search_PlayerNormal="Щ…ШЄЩ€Ш§Ш¬ШЇ";
		SideBar_Search_PlayerInactive="ШєЩЉШ± ЩЃШ№Ш§Щ„";
		SideBar_Search_PlayerVacation="Ш№Ш·Щ„Ш©";
		SideBar_Search_Alliance="ШЄШ­Ш§Щ„ЩЃ";
		SideBar_Search_Radius="ШґШ№Ш§Ш№ Ш§Щ„ШЁШ­Ш«";
		SideBar_Search_Search="ШЁШ­Ш«";
		SideBar_Search_Clear="Щ…ШіШ­"; //NEW
		SideBar_Search_AdvancedSearch="ШЁШ­Ш« Щ…ШЄЩ‚ШЇЩ…";
		SideBar_Search_EnemyAlliances="Ш§Щ„ШЄШ­Ш§Щ„ЩЃШ§ШЄ Ш§Щ„ШЈШ№ШЇШ§ШЎ";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["ШЈШ±ШіЩ„ Щ„Щ„ШЄШ­Ш§Щ„ЩЃ<br> Ш±ШіШ§Щ„Ш©","ШЈШ±ШіЩ„ Ш±ШіШ§Щ„Ш© Щ„ЩѓЩ„ Ш§Щ„ШЄШ­Ш§Щ„ЩЃШ§ШЄ"],
		["ШµЩЃШ­Ш© Ш§Щ„ШЄШ­Ш§Щ„ЩЃ "+alliancefullnm,"ШҐЩ„Щ‰ ШµЩЃШ­Ш© Ш§Щ„ШЄШ­Ш§Щ„ЩЃ " ],
		[alliancefullnm +" Ш±ШіШ§Щ„Ш© Ш¬ШЇЩЉШЇШ©","ШҐЩ„Щ‰ ШµЩЃШ­Ш© Ш§Щ„ШЄШ­Ш§Щ„ЩЃ , ШўШ®Ш± Ш§Щ„Ш±ШіШ§Ш¦Щ„ ",],
		["ШµЩ†ШЇЩ€Щ‚ Ш§Щ„Щ…Ш­Ш§ШЇШ«Ш© -ШҐШ·Ш§Ш± Ш¬ШЇЩЉШЇШ©","Щ…Ш­Ш§ШЇШ«Ш© Ш§Щ„ШЄШ­Ш§Щ„ЩЃ , ЩЃШЄШ­ ЩЃЩЉ ШҐШ·Ш§Ш± Ш¬ШЇЩЉШЇ"],
		["ШµЩ†ШЇЩ€Щ‚ Ш§Щ„Щ…Ш­Ш§ШЇШ«Ш© -ШҐШ·Ш§Ш±","Щ…Ш­Ш§ШЇШ«Ш© Ш§Щ„ШЄШ­Ш§Щ„ЩЃ , ЩЃШЄШ­ ЩЃЩЉ Щ†ЩЃШі ШҐШ·Ш§Ш±"],
		["Ш­Ш§ШіШЁШ© Ш§Щ„Щ…Ш№Ш±ЩѓШ©","Ш­ШіШ§ШЁ Щ…Ш№Ш±ЩѓШ© ... "],
		[" ШЄШ­ШЇЩЉШ« "+alliancefullnm+" ШЈШЇЩ€Ш§ШЄ ","ШЈШ­ШµЩ„ Ш№Щ„Щ‰ ШўШ®Ш± ШіЩѓШ±ЩЉШЁШЄ"]];
		IslandLegendAllies="вЂў ШЄШ­Ш§Щ„ЩЃШ§ШЄ";
		IslandLegendNoAlliance="вЂў Щ„Ш§ ЩЉЩ€Ш¬ШЇ ШЄШ­Ш§Щ„ЩЃ";
		IslandLegendEnemies="вЂў Ш§Щ„ШЈШ№ШЇШ§ШЎ";
		TreatyAll="ЩѓЩ„ Ш§Щ„Щ„Ш§Ш№ШЁЩЉЩ† ШЄЩ… ЩЃШ­ШµЩ‡Щ… . Ш§Щ„ШЈШµЩЃШ± Щ„Щ…Щ† Щ„ЩЉШі Щ„ШЇЩЉЩ‡Щ… Щ…Ш№Ш§Щ‡ШЇШ§ШЄ Ш«Щ‚Ш§ЩЃЩЉШ© , Щ€ Ш§Щ„Ш±Щ…Ш§ШЇЩЉ Щ„Щ…Щ† ШЄЩ€Ш¬ШЇ Щ„Щ‡Щ… Щ…Ш№Ш§Щ‡ШЇШ§ШЄ Ш«Щ‚Ш§ЩЃЩЉШ© Щ‚Ш§Ш¦Щ…Ш©.";
		TreatyYes="ШЈЩ†ШЄ Ш№Щ†ШЇЩѓ Ш­Ш§Щ„ЩЉШ§ Щ…Ш№Ш§Щ‡ШЇШ© Ш«Щ‚Ш§ЩЃЩЉШ© Щ…Ш№ Щ‡Ш°Ш§ Ш§Щ„Щ„Ш§Ш№ШЁ";
		TreatyNo="Щ„Ш§ ЩЉЩ€Ш¬ШЇ Щ…Ш№Ш§Щ‡ШЇШ§ШЄ Ш«Щ‚Ш§ЩЃЩЉШ© Щ„ШЇЩ‰ Ш§Щ„Щ„Ш§Ш№ШЁ.";
		updatenotification="Щ‡Щ†Ш§Щѓ Щ†ШіШ®Ш© Ш¬ШЇЩЉШЇШ© Щ…Щ†  "+alliancefullnm+" Ш§Ш¶ШєШ· Ш№Щ„Щ‰ Щ†Ш№Щ… ШҐШ°Ш§ ШЈШ±ШЇШЄ ШЄШ­ШЇЩЉШ«Щ‡Ш§ Щ…Щ† Ш§Щ„Щ…ШµШЇШ±";
		txtplswait="Ш§Щ†ШЄШёШ± Щ„Щ€ ШіЩ…Ш­ШЄ";
		txtrefresh="ШЄШ­ШЇЩЉШ«";
		txtpagedata="- Ш§Щ„Ш­ШµЩ€Щ„ Ш№Щ„Щ‰ ШµЩЃШ­Ш©";
		txtinfodata="- Ш§Щ„Ш­ШµЩ€Щ„ Ш№Щ„Щ‰ Щ…Ш№Щ„Щ€Щ…Ш§ШЄ";
		txtchkplayer="- ЩЃШ­Шµ Щ„Ш§Ш№ШЁ";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" ШҐЩ„ШєШ§ШЎ Щ…Ш№Ш§Щ‡ШЇШ© Ш«Щ‚Ш§ЩЃЩЉШ©";
		CultureTreatiesRequest=" Ш·Щ„ШЁ Щ…Ш№Ш§Щ‡ШЇШ© Ш«Щ‚Ш§ЩЃЩЉШ©";
	break;
	case 'nl':
		CheckVersionBubbleNegative=   "Ik zocht naar een nieuwe versie, op dit ogenblik is die er niet.";
		NewCoreVersion="Nieuwe Core Versie";
		SideBar_Drag="Klik en sleep om de SideBar te verplaatsen";
		SideBar_Search="Zoek";
		SideBar_SearchT="Zoek speler/alliantie";
		SideBar_ToolsT="Alliantie Links";
		SideBar_Notes="Notities";
		SideBar_NotesT="Snelle Notitie";
		SideBar_Allies="Allianties";
		SideBar_AlliesT="Allianties - Lijst";
		SideBar_Enemies="Vijanden";
		SideBar_EnemiesT="Vijandige spelers";
		SideBar_Friends="Vrienden";
		SideBar_FriendsT="Vriendenlijst";
		SideBar_Settings="Instellingen";
		SideBar_SettingsT="Instellingen - Algemene Configuratie";
		SideBar_Chat="Chat";
		SideBar_ChatT="Global Chat";
		SideBar_Search_Add="Voeg toe";
		SideBar_Search_Save="Bewaar";
		SideBar_Search_QuickSearch="Snel zoeken";
		SideBar_Search_Player="Speler";
		SideBar_Search_City="Stad"; //NEW
		SideBar_Search_PlayerStatus="Speler Status";
		SideBar_Search_PlayerAll="All";
		SideBar_Search_PlayerUnknown="Onbekend";
		SideBar_Search_PlayerNormal="Normaal";
		SideBar_Search_PlayerInactive="Inactief";
		SideBar_Search_PlayerVacation="Vakantie";
		SideBar_Search_Alliance="Alliantie";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Zoek";
		SideBar_Search_Clear="Verwijder"; //NEW
		SideBar_Search_AdvancedSearch="Geavanceerd zoeken";
		SideBar_Search_EnemyAlliances="Vijandige allianties";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["Verzend alliantie<br> Bericht","Verzend een bericht naar alle allianties"],
		["Forum "+alliancefullnm,"Naar het forum van de alliantie " ],
		[alliancefullnm +" nieuwe forum posts","Naar het forum van de alliantie, laatste berichten ",],
		["Chatbox(New Window)","Alliantie Chat, opent in een nieuw venster"],
		["Chatbox(Frame)","Alliantie Chat, toont chat in frames zonder herladen "],
		["Gevechts Calc","Berekent een gevecht ... "],
		[" Update "+alliancefullnm+" Tools ","Verkrijg de nieuwste script"]];
		IslandLegendAllies="вЂў Allianties";
		IslandLegendNoAlliance="вЂў Geen alliantie";
		IslandLegendEnemies="вЂў Vijanden";
		TreatyAll="Alle spelers zijn gecontroleerd. Geel voor geen verdrag, en grijs voor bestaand verdrag.";
		TreatyYes="Je hebt al een cultureel verdrag met deze speler";
		TreatyNo="Geen cultureel verdrag gevonden met deze speler.";
		updatenotification="Er is weer een nieuwe versie van "+alliancefullnm+" Tools.\n Klik op OK als je nu naar www.ika-core.org wil gaan en nu wil updaten.";
		txtplswait="Even geduld";
		txtrefresh="Vernieuw";
		txtpagedata="- Pagina verkrijgen";
		txtinfodata="- Info verkrijgen";
		txtchkplayer="- Speler controleren";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Zeg cultureel verdrag op";
		CultureTreatiesRequest=" Vraag cultureel verdrag aan";
	break;
	case 'lt':
		CheckVersionBubbleNegative=   "Е iuo metu naujos versijos nД—ra.";
		NewCoreVersion="Nauja Core versija";
		SideBar_Drag="paspausk ir stumk, kad pajudintum ДЇrankiЕі juostД…";
		SideBar_Search="PaieЕЎka";
		SideBar_SearchT="IeЕЎkoti ЕѕaidД—jo/aljanso";
		SideBar_ToolsT="AljansЕі nuorodos";
		SideBar_Notes="UЕѕraЕЎai";
		SideBar_NotesT="Greiti uЕѕraЕЎai";
		SideBar_Allies="SД…jungininkai";
		SideBar_AlliesT="SajungininkЕі sД…raЕЎas";
		SideBar_Enemies="PrieЕЎai";
		SideBar_EnemiesT="ЕЅaidД—jai - prieЕЎai";
		SideBar_Friends="Draugai";
		SideBar_FriendsT="DraugЕі sД…raЕЎas";
		SideBar_Settings="Nustatymai";
		SideBar_SettingsT="Nustatymai - Bendros nuostatos ";
		SideBar_Chat="Chat'as";
		SideBar_ChatT="Pasaulinis chat'as";
		SideBar_Search_Add="PridД—ti";
		SideBar_Search_Save="IЕЎsaugoti";
		SideBar_Search_QuickSearch="Greita paieЕЎka";
		SideBar_Search_Player="ЕЅaidД—jas";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="ЕЅaidД—jo bЕ«sena";
		SideBar_Search_PlayerAll="Visi";
		SideBar_Search_PlayerUnknown="neЕѕinomas";
		SideBar_Search_PlayerNormal="Normalus";
		SideBar_Search_PlayerInactive="Neaktyvus";
		SideBar_Search_PlayerVacation="Atostogauja";
		SideBar_Search_Alliance="Aljansas";
		SideBar_Search_Radius="Spindulys";
		SideBar_Search_Search="PaieЕЎka";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="IЕЎplД—sta paieЕЎka";
		SideBar_Search_EnemyAlliances="PrieЕЎЕі aljansai";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		['Send Alliance<br> Message','Send message to all the allies'],
		['Forum '+alliancefullnm,'To the Forum of the Alliance ' ],
		[alliancefullnm +' new forum posts','To the Forum of the Alliance, latest posts ',],
		['Chatbox(New Window)','Alliance Chat, opens in a new window'],
		['Chatbox(Frame)','Alliance Chat, displays chat in frames with no reload '],
		['Battle Calc','Calculates a battle ... '],
		[' Update '+alliancefullnm+' Tools ','Gets the latest script']];
		IslandLegendAllies="вЂў Aljansai";
		IslandLegendNoAlliance="вЂў NД—ra aljanse";
		IslandLegendEnemies="вЂў PrieЕЎai";
		TreatyYes="Tu jau turi kultЕ«rinД™ sutartДЇ su ЕЎiuo ЕѕaidД—ju";
		TreatyNo="Nerasta kultЕ«riniЕі sutarДЌiЕі su ЕЎiuo ЕѕaidД—ju.";
		updatenotification='There is a newer version of '+alliancefullnm+' Tools.\n Click on OK if you would like to go to www.ika-core.org and update now.';
		txtplswait="PraЕЎau palaukti";
		txtrefresh="Atnaujinti";
		txtpagedata='- Getting Page';
		txtinfodata='- Getting Info';
		txtchkplayer='- Checking Player';
		CultureTreaties='ultur'; //magic word for treaties fix
		CultureTreatiesCancel=" AtЕЎaukti kultЕ«rinД™ sutartДЇ";
		CultureTreatiesRequest=" PraЕЎyti kultЕ«rinД—s sutarties";
	break;
	case 'ro':
	  CheckVersionBubbleNegative=   "Am verifizcat daca au aparut actualizari dar nu am gasit nimic";
      NewCoreVersion="Versiune Noua";
      SideBar_Drag="Tine apasat & Trage pentru a muta Bara laterala cu meniul";
      SideBar_Search="Cautare";
      SideBar_SearchT="Cauta jucator/alianta";
      SideBar_ToolsT="Lincurile Aliantei";
      SideBar_Notes="Notite";
      SideBar_NotesT="Notita Rapida";
      SideBar_Allies="Aliati";
      SideBar_AlliesT="Lista Aliati";
      SideBar_Enemies="Dusmani";
      SideBar_EnemiesT="Jucatori Dusmani";
      SideBar_Friends="Prieteni";
      SideBar_FriendsT="Lista Prieteni";
      SideBar_Settings="Setari";
      SideBar_SettingsT="Setari - Configurare Generala ";
      SideBar_Chat="Chat";
      SideBar_ChatT="Chat Global";
      SideBar_Search_Add="Adauga";
      SideBar_Search_Save="Salvare";
      SideBar_Search_QuickSearch="Cautare Rapida";
      SideBar_Search_Player="Jucator";
      SideBar_Search_City="Oras";
      SideBar_Search_PlayerStatus="Statistica Jucator";
      SideBar_Search_PlayerAll="Tot";
      SideBar_Search_PlayerUnknown="Necunoscut";
      SideBar_Search_PlayerNormal="Normal";
      SideBar_Search_PlayerInactive="Inactiv";
      SideBar_Search_PlayerVacation="Vacanta";
      SideBar_Search_Alliance="Alianta";
      SideBar_Search_Radius="Raza";
      SideBar_Search_Search="Cauta";
      SideBar_Search_Clear="Sterge";
      SideBar_Search_AdvancedSearch="Cautare Avansata";
      SideBar_Search_EnemyAlliances="Aliante Dusmane";
      SideBar_Search_MilitaryScore="Scorul Militar";
      SideBar_Search_GoldScore="Aur";
      SideBar_Search_Between="intre";
      SideBar_Search_And="si";
      SideBar_Search_TownHallLevel="Nivel Primarie";
      AllianceMenu=[
      ["Trimite Mesaj Catre<br> Alianta","Trimite mesaj catre toti aliatii"],
      ["Forum "+alliancefullnm,"Forumul Aliantei " ],
      [alliancefullnm +" Ultimile Posturi","Vizualizare ultimile Posturi de pe forumul Aliantei ",],
      ["Chatbox(Fereastra Noua)","Chatul Aliantei, Se dechide in fereastra noua"],
      ["Chatbox(Frame)","Chatul Aliantei, se imparte pagina in doua si se vizualizaza in partea de jos "],
      ["Calculator Batalie","Calculeaza batalia ... "],
      [" Update "+alliancefullnm+" Tools ","Actualizeaza cu ultima versiune"]];
      IslandLegendAllies="Гўв‚¬Вў Aliati";
      IslandLegendNoAlliance="Гўв‚¬Вў Fara Alianta";
      IslandLegendEnemies="Гўв‚¬Вў Enemies";
      TreatyAll="Toti Jucatorii au fost verificati. Galben pentru cei fara tratat si Gru pentru ceilalati.";
      TreatyYes="Exista un tratat cultural cu acest jucator";
      TreatyNo="Nu s-a gasit nici un tratat cultural cu acest jucator.";
      updatenotification="Exista o veriune noua a "+alliancefullnm+" Unelte.\n Click pe OK daca doresti sa mergi la www.ika-core.org si sa actualizezi acum.";
      txtplswait="Asteptati";
      txtrefresh="Reimprospatare";
      txtpagedata="- Actualizare pagina";
      txtinfodata="- Actualizare Info";
      txtchkplayer="- Verificare Jucator";
      CultureTreaties="ultur"; //magic word for treaties fix
      CultureTreatiesCancel=" Renuta la tratat cultural";
      CultureTreatiesRequest=" Cere tratat cultural";
      break;
	case 'kr':
	      CheckVersionBubbleNegative="мѓ€ лІ„м јмќ„ м°ѕм•„лґ¤м§Ђл§Њ м—†мЉµл‹€л‹¤.";
          NewCoreVersion="мѓ€ мЅ”м–ґ лІ„м ј";
          SideBar_Drag="м‚¬мќґл“њл°”лҐј м›Ђм§Ѓмќґм‹њл ¤л©ґ нЃґл¦­н•?кі  л“њлћ?к·ён•?м„ёмљ”";
          SideBar_Search="кІЂмѓ‰";
          SideBar_SearchT="мњ м Ђ/лЏ™л§№ кІЂмѓ‰";
          SideBar_ToolsT="лЏ™л§№ л§ЃнЃ¬";
          SideBar_Notes="л…ёнЉё";
          SideBar_NotesT="нЂµ л…ёнЉё";
          SideBar_Allies="лЏ™л§№";
          SideBar_AlliesT="лЏ™л§№ лЄ©лЎќ";
          SideBar_Enemies="м Ѓ";
          SideBar_EnemiesT="м Ѓ лЄ©лЎќ";
          SideBar_Friends="м№њкµ¬";
          SideBar_FriendsT="м№њкµ¬ лЄ©лЎќ";
          SideBar_Settings="м„¤м •";
          SideBar_SettingsT="м„¤м • - мќјл°? м„¤м • ";
          SideBar_Chat="м±„нЊ…";
          SideBar_ChatT="м„ёкі„ м±„нЊ…";
          SideBar_Search_Add="м¶”к°Ђ";
          SideBar_Search_Save="м ЂмћҐ";
          SideBar_Search_QuickSearch="л№ лҐё кІЂмѓ‰";
          SideBar_Search_Player="мњ м Ђ";
          SideBar_Search_City="лЏ„м‹њ"; //NEW
          SideBar_Search_PlayerStatus="мњ м Ђ мѓЃнѓњ";
          SideBar_Search_PlayerAll="лЄЁл‘ђ";
          SideBar_Search_PlayerUnknown="лЇён™•мќё";
          SideBar_Search_PlayerNormal="ліґн†µ";
          SideBar_Search_PlayerInactive="л№„м ‘м†Ќ";
          SideBar_Search_PlayerVacation="нњґк°Ђ";
          SideBar_Search_Alliance="лЏ™л§№";
          SideBar_Search_Radius="лІ”мњ„";
          SideBar_Search_Search="кІЂмѓ‰";
          SideBar_Search_Clear="л№„мљ°кё°"; //NEW
          SideBar_Search_AdvancedSearch="м „л¬ё кІЂмѓ‰";
          SideBar_Search_EnemyAlliances="м Ѓ лЏ™л§№";
		  SideBar_Search_MilitaryScore="Military Score";
		  SideBar_Search_GoldScore="Gold Score";
		  SideBar_Search_Between="between";
		  SideBar_Search_And="and";
		  SideBar_Search_TownHallLevel="TownHall Level";
          AllianceMenu=[
          ["лЏ™л§№м—ђкІЊ <br> л©”м„ём§Ђ м „м†Ў","м „ лЏ™л§№м›ђм—ђкІЊ л©”м„ём§Ђ м „м†Ў"],
          ["нЏ¬лџ° "+alliancefullnm,"лЏ™л§№ нЏ¬лџјмњјлЎњ " ],
          [alliancefullnm +" нЏ¬лџј мѓ€ кёЂ","лЏ™л§№ нЏ¬лџјмњјлЎњ, мµњм‹  кёЂ ",],
          ["м±„нЊ…м°Ѕ(мѓ€ м°Ѕ)","лЏ™л§№ м±„нЊ…, мѓ€м°ЅмњјлЎњ м—ґкё°"],
          ["м±„нЊ…м°Ѕ(н”„лћ?мћ„)","лЏ™л§№ м±„нЊ…, н”„лћ?мћ„мњјлЎњ м—ґкё° "],
          ["м „н€¬ кі„м‚°","м „н€¬ кі„м‚° ... "],
          [" "+alliancefullnm+" н€ґ м—…лЌ°мќґнЉё н•?кё° ","мµњм‹  мЉ¤нЃ¬л¦ЅнЉё л°›кё°"]];
          IslandLegendAllies="вЂў лЏ™л§№л“¤";
          IslandLegendNoAlliance="вЂў л¬ґ лЏ™л§№";
          IslandLegendEnemies="вЂў м Ѓл“¤";
          TreatyAll="лЄЁл“  мњ м Ђ мІґнЃ¬ м™„лЈЊ. л…ёлћЂмѓ‰мќЂ н?‘м •м—†мќЊ, нљЊмѓ‰мќЂ н?‘м • мћ€мќЊмќ„ лњ»н•Ё.";
          TreatyYes="л‹№м‹ мќЂ мќґлЇё мќґ мњ м Ђм™Ђ л¬ён™” н?‘м •мќ„ л§єм—€мЉµл‹€л‹¤.";
          TreatyNo="мќґ мњ м Ђм™Ђмќ? л¬ён™” н?‘м •мќЂ м—†мЉµл‹€л‹¤.";
          updatenotification="мѓ€лІ„м „мќ?  "+alliancefullnm+" н€ґмќґ мћ€мЉµл‹€л‹¤.\n www.ika-core.org лЎњк°Ђм„њ м—…лЌ°мќґнЉёлҐј н•?кі  м‹¶мњјм‹њл©ґ ok лҐј л€Њлџ¬мЈјм„ёмљ”.";
          txtplswait="кё°л‹¤л¦¬м„ёмљ”";
          txtrefresh="мѓ€лЎњкі м№Ё";
          txtpagedata="- нЋ?мќґм§Ђ к°Ђм ём?¤лЉ” м¤‘";
          txtinfodata="- м •ліґ к°Ђм ём?¤лЉ” м¤‘";
          txtchkplayer="- мњ м Ђ мІґнЃ¬м¤‘";
          CultureTreaties="ultur"; //magic word for treaties fix
          CultureTreatiesCancel=" л¬ён™” н?‘м • нЏђкё°";
          CultureTreatiesRequest=" л¬ён™” н?‘м • мљ”мІ­";
	break;
	default:
		CheckVersionBubbleNegative=	"I checked for a new version , there is none at the moment.";
		NewCoreVersion="New Core Version";
		SideBar_Drag="Hold and Drag to move the SideBar";
		SideBar_Search="Search";
		SideBar_SearchT="Search player/alliance";
		SideBar_ToolsT="Alliance Links";
		SideBar_Notes="Notes";
		SideBar_NotesT="Quick Notes";
		SideBar_Allies="Allies";
		SideBar_AlliesT="Allies - List";
		SideBar_Enemies="Enemies";
		SideBar_EnemiesT="Enemy Players";
		SideBar_Friends="Friends";
		SideBar_FriendsT="Friends List";
		SideBar_Settings="Settings";
		SideBar_SettingsT="Settings - General Configuration ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Global Chat";
		SideBar_Search_Add="Add";
		SideBar_Search_Save="Save";
		SideBar_Search_QuickSearch="Quick Search";
		SideBar_Search_Player="Player";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Player Status";
		SideBar_Search_PlayerAll="All";
		SideBar_Search_PlayerUnknown="Unknown";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactive";
		SideBar_Search_PlayerVacation="Vacation";
		SideBar_Search_Alliance="Alliance";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Search";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Advanced Search";
		SideBar_Search_EnemyAlliances="Enemy Alliances";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";
		AllianceMenu=[
		["Send Alliance<br> Message","Send message to all the allies"],
		["Forum "+alliancefullnm,"To the Forum of the Alliance " ],
		[alliancefullnm +" new forum posts","To the Forum of the Alliance, latest posts ",],
		["Chatbox(New Window)","Alliance Chat, opens in a new window"],
		["Chatbox(Frame)","Alliance Chat, displays chat in frames with no reload "],
		["Battle Calc","Calculates a battle ... "],
		[" Update "+alliancefullnm+" Tools ","Gets the latest script"]];
		IslandLegendAllies="вЂў Allies";
		IslandLegendNoAlliance="вЂў No Alliance";
		IslandLegendEnemies="вЂў Enemies";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="You already have a cultural Treaty with this Player";
		TreatyNo="No cultural treaties found for this player.";
		updatenotification="There is a newer version of "+alliancefullnm+" Tools.\n Click on OK if you would like to go to www.ika-core.org and update now.";
		txtplswait="Please Wait";
		txtrefresh="Refresh";
		txtpagedata="- Getting Page";
		txtinfodata="- Getting Info";
		txtchkplayer="- Checking Player";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancel Cultural Treaty";
		CultureTreatiesRequest=" Request Cultural Treaty";
		break;
	}
}

function getserverindex(){
	var servers={
	'de.ikariam.com':['de','0'],
	'en.ikariam.com':['en','1'],
	'ae.ikariam.com':['ae','2'],
	'ar.ikariam.com':['ar','3'],
	'ba.ikariam.com':['ba','4'],
	'bg.ikariam.com':['bg','5'],
	'br.ikariam.com':['br','6'],
	'by.ikariam.com':['by','7'],
	'cl.ikariam.com':['cl','8'],
	'ikariam.cn':['cn','9'],
	'cz.ikariam.com':['cz','10'],
	'dk.ikariam.com':['dk','11'],
	'ee.ikariam.com':['ee','12'],
	'eg.ikariam.org':['eg','13'],
	'es.ikariam.com':['es','14'],
	'fi.ikariam.com':['fi','15'],
	'fr.ikariam.com':['fr','16'],
	'gr.ikariam.com':['gr','17'],
	'hr.ikariam.org':['hr','18'],
	'hk.ikariam.com':['hk','19'],
	'hu.ikariam.com':['hu','20'],
	'id.ikariam.com':['id','21'],
	'ih.ikariam.org':['ih','22'],
	'il.ikariam.com':['il','23'],
	'in.ikariam.org':['in','24'],
	'ir.ikariam.com':['in','25'],
	'it.ikariam.com':['it','26'],
	'jp.ikariam.org':['jp','27'],
	'kr.ikariam.com':['kr','28'],
	'lt.ikariam.com':['lt','29'],
	'lv.ikariam.com':['lv','30'],
	'me.ikariam.org':['me','31'],
	'mx.ikariam.com':['mx','32'],
	'nl.ikariam.com':['nl','33'],
	'no.ikariam.com':['no','34'],
	'pe.ikariam.com':['pe','35'],
	'ph.ikariam.com':['ph','36'],
	'pl.ikariam.com':['pl','37'],
	'pt.ikariam.com':['pt','38'],
	'ro.ikariam.com':['ro','39'],
	'ru.ikariam.com':['ru','40'],
	'sa.ikariam.org':['sa','41'],
	'se.ikariam.com':['se','42'],
	'si.ikariam.com':['si','43'],
	'sk.ikariam.com':['sk','44'],
	'tr.ikariam.com':['tr','45'],
	'tw.ikariam.com':['tw','46'],
	'us.ikariam.com':['us','47'],
	'ua.ikariam.com':['ua','48'],
	've.ikariam.com':['ve','49'],
	'vn.ikariam.com':['vn','50'],
	'co.ikariam.com':['co','51'],
	'rs.ikariam.com':['rs','52']
	}
	try {
		var a=servers[location.host.substr(location.host.indexOf('.')+1)];
	} catch(e){
	}
	if (!a) alert('Your server is not in the Ika-core Server List, Please report it at http://www.ika-core.org');
	return a;
}
var sea='&sea=13';
//check for update
if (core_vers!=GM_getValue("core_vers","0")){
	GM_setValue("core_vers",core_vers);
	GM_openInTab("http://www.ika-core.org/forum/viewtopic.php?f=2&t=412");
alert(' \nThe ika-core.js or Ika-core Tools script or Corsairs Tools license\n\n\n\
This program is distributed in the hope that it will be useful, \
but WITHOUT ANY WARRANTY; without even the implied warranty of \
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.\n\
\n\
You are not allowed to offer this programm for download or redistribute it \
in any way except directions stated at the www.ika-core.org website by the administration.\n\
This programm is offered for download only at http://www.ika-core.org/script/ika-core.js .\n\
If you downloaded this programm from another location please report it \
at the www.ika-core.org website.\n\
This programm may be downloaded automatically by You but only form the location mentioned above.\n\
The code remains as is, no alteration or modification should be done without the written permission of the auhtor.\n\
This script is not permited to be incorporated into any of your program/s or any proprietary programs .\n\
This script will comunicate with www.ika-core.org to check for upgrades, \
or for any other means. Any damage by usage in general (bandwidth etc) by this programm \
is considered your expense and fault and not the auhtors.\n\
\n\
In other means , you know what you are doing.\n\
\n\
Any damage inflicted in general to others (Companies, individuals etc) or to yourslef by use of \
this code is your responsibility. Any unlegal practice or result by usage of this script is your fault.\n\
\n\
Or in plain English, its not the authors fault for anything but yours.\n\
\n\
This script is considered as free tool without any purpose whatsoever.\n\
\n\
\n\
If you do not agree with the above please uninstall the script IMMEDIATELY.\n\
\n\
');
}

function checkupdate(text){
	var testversion=text.split('var version=')[1];
	testversion=testversion.split(';')[0];
	newversion=parseInt(testversion);
	addsbubble('diplomat',CheckVersionBubbleNegative,9);
	if (version < newversion)
		if (confirm(updatenotification+ '\nv' + newversion)) {
			location.href = scriptlocation;
		}
	get('http://www.ika-core.org/scripts/ika-core.js',checkcoreupdate);
}
//check for update

function checkcoreupdate(text){
	var testversion=text.split('var core_vers=')[1];
	testversion=testversion.split(';')[0];
	newversion=parseInt(testversion);
	if (core_vers < newversion)
		if (confirm(updatenotification + '\n'+NewCoreVersion+': v' + newversion)) {
			location.href = scriptlocation;
		}
}

function version_update(){
	var lastup=GM_getValue("LastUpdateMe");
	if(lastup){
		//check time elapsed from last update
		var now = parseInt(new Date().getTime());
		var searchFreq = 172800*1000; //2 days
		//check update
		if(now - parseInt(lastup) > searchFreq){
			GM_setValue("LastUpdateMe", ""+now);
			get(scriptlocation,checkupdate);
		}
	} else GM_setValue("LastUpdateMe", ""+new Date().getTime());
}

//GM_setValue("LastUpdateMe", ""+(new Date().getTime()-560000000*1000));

function loadstyles(){
//CSS used for menus and player info tables
GM_addStyle("\
table#cor {\
			-moz-box-sizing:border-box;\
			outline: #ff9900 ridge 5px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;\
			border-collapse:separate;\
			border-spacing:0px;\
			display:table;\
			margin-bottom:0;\
			margin-top:0;\
			text-indent:0;\
			color:#542C0F;\
			font-size:11px;}\
tbody#cor {\
		display:table-row-group;\
		vertical-align:middle;\
}\
#corsairprogress { position:fixed; z-index:500;padding:3px 3px 3px 3px;margin:0px 0px 0px 0px;}\
.nfoframe{z-index:55;background-color:#FDF7DD;;font:normal 12px Arial, Helvetica, sans-serif;text-align:center;color:#542c0f;position:fixed;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px; outline: #ff9900 ridge 2px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;}\
#nfoframeclose,.search_player,.mapview,.search_alliance,.page,.pagebar,.markscores,.savenotes,.gameplay,.questowner,.questally,.checktreaty,.newmessage,.spybash ,#nfomapbutton,#nfomapbuttona{background:#F6EBBC;text-decoration:none;cursor:pointer;font-size:9px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;outline:none;}\
#nfoframeclose:hover,.search_player:hover,.mapview:hover,.search_alliance:hover,.page:hover,.pagebar:hover,.markscores:hover,.savenotes:hover,.newmessage:hover,.gameplay:hover,.questowner:hover,.questally:hover,.checktreaty:hover,#nfomapbutton:hover,#nfomapbuttona:hover,.spybash:hover {background:orange;text-decoration:none;}\
#nfoframeclose:active,.search_player:active,.mapview:active,.search_alliance:active,.page:active,.pagebar:active,.markscores:active,.savenotes:active,.newmessage:active,.gameplay:active,.questowner:active,.questally:active,.checktreaty:active,#nfomapbutton:active,#nfomapbuttona:active,.spybash:active {background:red;}\
.dragclass{ position : relative; cursor : move;}\
.korniza{width:100%;height:5px;background:url(skin/layout/bg_contentBox01h_header.gif) repeat 0 0}\
#nfoplayer,#nfoalliance{background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584}\
#embassy #container #mainview .contentBox01h .content table#memberList td.action { margin:0 auto; float: none}\
#sidemenu {\
width:90px;\
background: transparent;\
z-index:500;\
position:fixed;\
}\
#sidemenu ul {\
list-style: none;\
margin: 0;\
padding: 0;\
}\
#sidemenu a, #sidemenu h2 {\
font: bold 10px/11px arial, helvetica, sans-serif;\
display: block;\
margin: 0;\
padding: 2px 2px;\
}\
#sidemenu h2 {\
background: #EDB76D;\
text-transform: uppercase;\
outline:#EDA76D outset 2px;\
-moz-outline-radius:0px 10px 10px 0px;\
font-size:9px;\
height:13px;\
width:60px;\
}\
#sidemenu a {\
color: #542C0F;\
width:80px;\
background: #ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;\
text-decoration: none;\
outline:#FF9900 outset 1px;\
-moz-outline-radius:0px 6px 6px 0px;\
margin: 2px 0px 2px 0px;\
}\
#sidemenu a:hover {\
background: #ECbF7E;\
}\
#sidemenu li {position: relative;}\
#sidemenu ul ul ul {\
position: absolute;\
top: 0;\
left: 96%;\
border-color:#ffffff #C9A584 #997554 #C9A584;\
border-style:double;\
border-width:3px;\
background:#F6EBBC;\
}\
div#sidemenu ul ul ul,\
div#sidemenu ul ul li:hover ul ul\
{display: none;}\
div#sidemenu ul ul li:hover ul,\
div#sidemenu ul ul ul li:hover ul\
{display: block;}\
.111elisthead { background:#EDB76D;outline:#EDA76D outset 2px;-moz-outline-radius:10px 10px 0px 0px;} \
.111elistmain { background:#F6EBBC;outline:#FF9900 inset 1px;margin:0px 0px 0px 0px;}\
.111elistfoot { height:2px; background:#542C0F;outline:#FF9900 outset 1px;-moz-outline-radius:0px 0px 20px 20px;margin:0px 0px 0px 0px;}\
.blevels,.clevels,.upgradehover {\
background:#000;\
font-size:9px;\
margin:0;\
padding:0px 0px 0px 0px;\
color:#fff;\
outline: black ridge 3px;\
-moz-outline-radius: 8px 8px 8px 8px;\
text-align:center;\
position:absolute;\
z-index:1000;\
display:block;white-space:pre;}\
.bnames {\
font-size:9px;\
margin:0;\
padding:0px 10px 0px 10px;\
border-color:#ffffff #C9A584 #5D4C2F #C9A584;\
border-style:double;\
border-width:1px;\
-moz-border-radius:8px 8px 8px 8px;\
background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;\
color:#542C0F;\
font-family:'Times New Roman', Verdana;\
text-align:center;\
position:absolute;\
display:block;\
white-space:pre;\
background-color:#FDF8C1;\
opacity:0.8;\
}\
.elistmain {}\
.elisthead {background:url(skin/layout/notes_top.gif) repeat-x left 50%;color:#542C0F;font-weight:bold; font-size:11px;line-height:15px;}\
.elistfoot {}\
.backlight{position:relative;left:-30px;top-140px;width:130px;height:130px;background:transparent;z-index:-500;opacity:1}\
.header {\
 background-image: url(http://www.ika-core.org/images/bg.gif);\
 background-repeat: no-repeat;\
 background-position: center right;\
 cursor: pointer;\
 font-size: 8pt;\
}\
}\
.headerSortUp {\
 background-image: url(http://www.ika-core.org/images/asc.gif);\
}\
.headerSortDown {\
 background-image: url(http://www.ika-core.org/images/desc.gif);\
}\
#conExtraDiv1,#conExtraDiv2,#conExtraDiv3{z-index:30;}\
#breadcrumbs{z-index:51}\
#CityArmy, #CityFleet {position:absolute;z-index:2000;left:751px;bottom:0;opacity:1;}\
.sidetroops {\
background-image:url('skin/layout/scroll_bg.gif');\
color:#50110A;\
display:block;\
font-size:10px;\
height:23px;\
line-height:23px;\
padding:0 16px;\
text-align:right;\
white-space:nowrap;\
width:30px;\
}\
.sidetroops img{\
width:18px;\
height:21px;\
margin-top:-1px;\
float:left;\
}\
.before {\
background-image:url('skin/layout/scroll_leftend.gif');\
display:block;\
height:23px;\
left:0;\
position:absolute;\
width:12px;\
}\
.after {\
background-image:url('skin/layout/scroll_rightend.gif');\
display:block;\
height:23px;\
position:relative;\
right:-42px;\
width:12px;\
top:-23px;\
}\
#messages td.subject{font-size:10px;}\
");
}

//some standard functions

function clickTo(img,action,cursor) {
	if (img) {
		img.addEventListener("click", action, false);
		switch (cursor){
			case 1:
				if (img.style) img.style.cursor = "pointer";
				break;
			case 2:
				if (img.style) img.style.cursor = "crosshair";
				break;
		}
	}
}

function mapevt(e){
	var obj;
	if (!e) var e = window.event;
	if (e.target) obj = e.target;
	else if (e.srcElement) obj = e.srcElement;
	return obj;
}

function get(url, cb , tag) {
	GM_xmlhttpRequest({method: "GET",
						url: url,
						headers:{'Referrer':location.href},
						onload: function(xhr) { cb(xhr.responseText, tag); }});
}

function post(url, data, cb, tag) {
	GM_xmlhttpRequest({	method: "POST",
						url: url,
						headers:{'Content-type':'application/x-www-form-urlencoded', 'Referrer':location.href},
						data:encodeURI(data),
						onload: function(xhr) { cb(xhr.responseText, tag); }});
}

function cityinfoPanel() {
	return $X('id("information")//ul[@class="cityinfo"]');
}

function cityinfoPanelIsland() {
	return XX('.//div[@id="infocontainer"]', XPFirst);
}

function node(type, id, className, style, content, title ) {
	var n = document.createElement(type||"div");
	if (id) n.setAttribute('id',id);
	if (className) n.className = className;
	if (title) n.setAttribute('title',title);
	if (style) n.setAttribute('style',style);
	if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString();
	return n;
}

function remove(node){
  return node.parentNode.removeChild(node);
}

function btn(parent,id,name,txt,title,evt,x,extrastyle){
	if (parent) {
		if (!x) x='0';
		if (!extrastyle) extrastyle='';
		var button=node('a',id, name,'font-size:7px;margin:0px 0px 10px '+x+'px;'+extrastyle,txt,title);
		parent.appendChild(button);
		if (evt) clickTo(button,evt,1);
	}
}
var th='http://www.ika-core.org/';
function click(node) {
	var event = node.ownerDocument.createEvent("MouseEvents");
	event.initMouseEvent("click", true, true, node.ownerDocument.defaultView,1, 0, 0, 0, 0, false, false, false, false, 0, node);
	node.dispatchEvent(event);
}

function onClick(node, fn, capture, e) {
	node.addEventListener((e||"") + "click", fn, !!capture);
}

function fmtNumber(n) {
	n += "";
	for (var i = n.length - 3; i > 0; i -= 3)
		n = n.slice(0, i) +","+ n.slice(i);
	return n;
}

function number(n) {
	n = { string: 1, number: 1 }[typeof n] ? n+"" : n.textContent;
	return parseInt(n.replace(/\D+/g, "") || "0", 10);
}

function trim(str) {
	if (str) str=str.replace(/^\s+|\s+$/g, "");
	return str;
}

function $fork() {
	if (arguments.length == 1) return get$(arguments[0]);
	var elements = [];
	$c(arguments).each(function(el){
		elements.push(get$(el));
	});
	return elements;

	function get$(el){
		if (typeof el == 'string') el = document.getElementById(el);
		return el;
	}
}

function $x( xpath, root ) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
	switch (got.resultType) {
		case got.STRING_TYPE:
			return got.stringValue;
		case got.NUMBER_TYPE:
			return got.numberValue;
		case got.BOOLEAN_TYPE:
			return got.booleanValue;
		default:
			while (next = got.iterateNext())
			result.push( next );
			return result;
	}
}

function $X( xpath, root ) {
	var got = $x( xpath, root );
	return got instanceof Array ? got[0] : got;
}

function XX(xpath, xpres, startnode, myhtml){
	if (!startnode) {startnode=document;}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	if (myhtml) ret.singleNodeValue.innerHTML=myhtml;
	return	xpres == XPFirst ? ret.singleNodeValue : ret;
}

function forall(query,startnode, call){
	var objs=XX(query,XPList,startnode);
	for (var i = 0,objslength=objs.snapshotLength; i < objslength; i++)
		call(objs.snapshotItem(i),i);
}

function forallrows(tbl,startrow,call){
	for (var i=startrow,k=tbl.rows.length; i<k ; i++)
		call(tbl,i);
}

var n = 500;
var dragok = false;
var y,x,d,dy,dx;
var xaxismove=false;
var yaxismove=false;

	function move(e){
		if (!e) e = window.event;
		if (dragok){
			if (xaxismove) d.style.left = dx + e.clientX - x + "px";
			if (yaxismove) d.style.top  = dy + e.clientY - y + "px";
			return false;
		}
	}

	function down(e){
		if (!e) e = window.event;
		var temp = (typeof e.target != "undefined")?e.target:e.srcElement;
		if (temp.tagName != "HTML"|"BODY" && temp.className != "dragclass"){
			temp = (typeof temp.parentNode != "undefined")?temp.parentNode:temp.parentElement;
		}

		var obj=$(temp).parents().filter('.dragpanel')[0];
		xaxismove=true;
		yaxismove=true;

		switch (temp.className){
			case "dragclass":
				//var obj=$(temp).parents().filter('.nfoframe')[0];
				//xaxismove=true;
				//yaxismove=true;
			break;
			case "dragsidemenu":
				var obj=$fork("sidemenu");
				xaxismove=false;
				yaxismove=true;
				//alert(obj.innerHTML);
				//var obj=temp.parentNode.parentNode.parentNode.parentNode.parentNode;
			break;

		}
		if (obj){
			dragok = true;
			obj.style.zIndex = n++;
			d = obj;
			dx = parseInt(obj.style.left+0);
			dy = parseInt(obj.style.top+0);
			x = e.clientX;
			y = e.clientY;
			document.addEventListener('mousemove',move,false);
			return false;
		}
	}

	function up(){
		dragok = false;
		document.removeEventListener('mousemove',move,false);
		if(d)
		switch (d.id){
			case "sidemenu":
				if (parseInt(d.style.top)<0) d.style.top="0px";
				GM_setValue("SideBarTop",d.style.top);
			break;
		}
	}

document.addEventListener('mousedown',down,false);
document.addEventListener('mouseup',up,false);


//progresbar
var duration=3; // Specify duration of progress bar in seconds
var _progressWidth = 100;// Display width of progress bar.
var _progressBar = "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||";
var _progressEnd = 10;
var _progressAt = 0;
var col=th+'colector/';

function ProgressCreate(end,tag) {
	_progressEnd = end;
	_progressAt = 0;
	if (!tag) tag='';
	$('body').append(node('div','corsairprogress',	setInterval(ProgressStepIt,1000),'left:'+parseInt((window.innerWidth/2)-200)+'px; top:'+parseInt((window.innerHeight/2) - 40)+'px;','<FORM name=dialog id=dialog><TABLE border=2  bgcolor="#F6EBBC" id="cor"><TR><TD ALIGN="center">'+txtplswait+'&nbsp;'+tag+'<BR><input type=text name="corsairbar" id="corsairbar" size="' + _progressWidth/2 + '" style="color:navy;"></TD></TR></TABLE></FORM>'));
	ProgressUpdate();
	setTimeout(ProgressDestroy,10000);
}

function ProgressDestroy() {
	var a=$("#corsairprogress");
	clearInterval(a.attr('class'));
	a.remove();
}

function ProgressStepIt() {
	_progressAt++;
	if(_progressAt > _progressEnd) _progressAt = _progressAt % _progressEnd;
	ProgressUpdate();
}

function ProgressUpdate() {
	var n = (_progressWidth / _progressEnd) * _progressAt;
	var bar = $fork("corsairbar");
	var temp = _progressBar.substring(0, n);
	bar.value = temp;
}

function getcurcityid(){
	return XX('//select[@id="citySelect"]/option[@selected="selected"]',XPFirst).value+'';
}

function getcurcityname(){
	return XX('//select[@id="citySelect"]/option[@selected="selected"]',XPFirst).innerHTML+'';
}


//used to make chat displayed in a frame
unsafeWindow.makeframes = function(elm) {
	if (parent != self)
		top.location.href = location.href;
	else {
		var frameset = document.createElement("frameset");
		var loc=location.href;
		frameset.cols = null;
		frameset.rows = "50%, 40%";
		frameset.setAttribute('style','overflow-y: hidden !important;overflow-x: hidden !important;margin:0px;padding:0px;');
		frameset.setAttribute('id','framechat');

		var newFrame1 = document.createElement("frame");
		newFrame1.id = "newFrame1";
		newFrame1.name = "newFrame1";
		newFrame1.src = "http://"+location.host+"/index.php";
		newFrame1.setAttribute('target','_self');
		newFrame1.setAttribute('style','overflow-x: hidden;');
		var newFrame2 = document.createElement("frame");
		newFrame2.id = "newFrame2";
		newFrame2.name = "newFrame2";
		newFrame2.src = elm;
		newFrame2.setAttribute('style','overflow-x: hidden;');

		frameset.appendChild(newFrame1);
		frameset.appendChild(newFrame2);
		document.body=frameset;
		document.body.parentNode.setAttribute("style","overflow-y: hidden !important;overflow-x: hidden !important;margin:0px;padding:0px;");
	}
}

function twitch(gmvar){
	if(!GM_getValue(gmvar)) GM_setValue(gmvar, "1");
}

function togglevar(gmvar){
	if (GM_getValue(gmvar)=='1') {
		GM_setValue(gmvar, "0");
	} else {
		GM_setValue(gmvar, "1");
	}
}

function testvar(gmvar){
	twitch(gmvar);
	if (GM_getValue(gmvar)=='1') return true;
	return false;
}

var resgoods={'wine':1,'marble':2,'crystal':3,'sulfur':4};
function islandview(){
	var allystore=[];
	var allylength=alliance.length;
	var culttreaties=GM_getValue("CultTtreaties"+location.host);

	if (testvar("IslandInactiveBlink")) {
		GM_addStyle(".inactivity {text-decoration:blink;}");
	}
	paNode=$('#breadcrumbs').parent().append(node('li','corlegend','',(testvar("IslandLegend")?'display:block':'display:none')+';position:absolute;top:173px;left:255px;width:100px;height:50px;z-index:49','\
		<font color="'+Alliance+'" size=1>вЂў '+alliancefullnm+'</font><br>\
		<font color="'+Allies+'" size=1>'+IslandLegendAllies+'</font><br>\
		<font color="'+NoAlliance+'" size=1>'+IslandLegendNoAlliance+'</font><br>\
		<font color="'+Enemies+'" size=1>'+IslandLegendEnemies+'</font><br>'));
		if (GM_getValue('IslandToggleButtons', '1') == '1') {
			btn(paNode[0], 'shownamestoggle', 'gameplay', 'N', 'Hides or shows the player names under the Cities.', function(){
				togglevar("IslandPlayerNames");
				$('.cornames').css('display',(testvar("IslandPlayerNames")?'block':'none'));
			}, 5, 'position:absolute;top:150px;left:640px;width:5px;z-index:54;');
			btn(paNode[0], 'shownamesextratoggle', 'gameplay', 'E', 'Strikes through players on vacation and underlines inactives.', function(){
				togglevar("IslandInVac");
				location.href = location.href;
			}, 5, 'position:absolute;top:150px;left:655px;width:5px;z-index:54;');
			btn(paNode[0], 'showlegendtoggle', 'gameplay', 'В§', 'Show or hide the Highlight Legend.', function(){
				togglevar("IslandLegend");
				$('#corlegend').css('display',(testvar("IslandLegend")?'block':'none'));
			}, 5, 'position:absolute;top:150px;left:670px;width:5px;z-index:54');
			btn(paNode[0], 'showlevlesislandtoggle', 'gameplay', 'L', 'Show or hide the City Levels.', function(){
				togglevar("IslandLevels");
				$('.clevels').css('display',(testvar("IslandLevels")?'block':'none'));
			}, 5, 'position:absolute;top:150px;left:685px;width:5px;z-index:54');
		}
	//try {
	//for the vacs and inac
	paNode.find(".vacation,.inactivity").css('text-decoration',(testvar("IslandInVac")?'line-through':'none'));

	//show the resource levels
	paNode.find('#islandfeatures .wood,#islandfeatures #tradegood').each(function(){
		var res=$(this).css('z-index','0').attr('class');
		var reslvl=res.split('level')[1];
		$(this).append('<a id="clevels" class="clevels" style="'+(testvar("IslandLevels")?'display:block;':'display:none')+'background:#743C1F;width:12px;height:12px;top:15px;left:38px;">'+reslvl+'</a>');
	});


	var friendslist=GM_getValue("Friends"+location.host,"").split('#,#');
	var frlength=friendslist.length-1;
	var enemieslist=GM_getValue("Enemies"+location.host,"").split('#,#');
	var enlength=enemieslist.length-1;
	var IslandFriends=testvar("IslandFriends");
	var IslandCultTreaties=testvar("IslandCultTreaties");
	var IslandEnemies=testvar("IslandEnemies");
	var IslandSpies=testvar("IslandSpies");
	var IslandHighlight=testvar("IslandHighlight");
	var IslandPlayerNames=testvar("IslandPlayerNames");
	var IslandLevels=testvar("IslandLevels");
	function setCityColors(ally,city,cityimage,bcol){
		if (city) {
			cityimage.css('opacity','0.8');
			var nd=node("canvas",null,"backlight");
			if (nd.getContext) {
				var ctx = nd.getContext('2d');
				ctx.scale(2,1);
				var radgrad = ctx.createRadialGradient(75, 55, 25, 75, 70, 55);
				radgrad.addColorStop(0.0, bcol);
				radgrad.addColorStop(1, 'rgba(255,255,255,0)');
				ctx.fillStyle = radgrad;
				ctx.fillRect(0, 0, 150, 150);
			}
			city.append(nd);
		}
	}
	//mark the spies
	var ls=paNode.find(".cityLocation .cityinfo");
	if (IslandSpies) {
		ls.find(".spy").each(function(){
			$(this).parent().parent().append(node('span', null, null, 'background:transparent;position:absolute;height:18px;width:20px;top:28px;right:0px;z-index:499;margin:0;padding:0px 0px 0px 0px;', '<img src="skin/characters/military/120x100/spy_120x100.gif" style="width:200%;height:200%"/>', "We have a Spy(007 James Bond etc.) in this City!"));
		});
	}
	ls.each(function(){
		var iconleft=-30;
			var aid=XX(".//li[@class='ally']/a[@class='messageSend']",XPFirst,this);
			if (aid) {
				aid=aid.href.match(/allyId=(\d+)/);
				aid=(aid!=null && aid.length==2 ? aid=aid[1]:aid='');
			} else {
				aid='';
			}
		//alert(aid);
		var cmap=$(this).find(".name,.citylevel,.owner,.ally").map(function(i){
			var s=trim(this.textContent.split(':')[1])
			if (i==2) btn(this,'q','questowner','?',s,null,10);
			if (i==4) btn(this,'q','questally','?',ally,null,30);
			return s;
		});
		var city=cmap[0];
		var citylvl=cmap[1];
		var owner=cmap[2];
		var points=cmap[3];
		var ally=cmap[4];

		var citypar=$(this).parent();
		var cityimage=citypar.find(".cityimg,.ownCityImg");

		if (!allystore[ally]){
			allystore[ally]=1;
		} else {
			allystore[ally]+=1;
		}
		var extranodes='';

		if (IslandFriends) {
			for (var q = 0; q < frlength; q++) {
				if (friendslist[q] == owner) {
					citypar.append(node('span', null, null, 'background:transparent url(skin/layout/crown.gif) no-repeat scroll 0px center;position:absolute;height:24px;width:24px;top:45px;left:' + iconleft + 'px;z-index:499;margin:0;padding:0px 0px 0px 0px;',null,"He is your friend!"));
					iconleft+=24;
					break;
				}
			}
		}
		if (IslandCultTreaties&&culttreaties)
			 if (culttreaties.indexOf(","+trim(owner)+",") != -1) {
				citypar.append(node('span',null,null,'background:transparent url(skin/museum/icon32_culturalgood.gif) no-repeat scroll 0px center;position:absolute;height:25px;width:32px;top:41px;left:'+iconleft+'px;z-index:499;margin:0;padding:0px 0px 0px 0px;',null,"You have a cultural treaty with this player!"));
				iconleft+=32;
		}
		if (IslandEnemies) {
			for (var q = 0; q < enlength; q++) {
				if (enemieslist[q] == owner) {
					citypar.append(node('span', null, null, 'background:transparent url(skin/advisors/military/bang_soldier.gif) no-repeat scroll 0px center;position:absolute;height:32px;width:35px;top:32px;left:' + iconleft + 'px;z-index:499;margin:0;padding:0px 0px 0px 0px;',null,"He is your enemy!"));
					iconleft += 35;
					break;
				}
			}
		}

		if (IslandHighlight) {
			if (ally=='-')	{
				citypar.append(node('span', null, 'textLabel cornames a-'+ally.replace(' ','_'), 'display:'+(IslandPlayerNames?'block':'none')+';left: -10px; top: 84px; cursor: pointer;font-size:9px;', '<span class="before"></span>' + owner + '<span class="after"></span>'));
				setCityColors(null, citypar,cityimage,  NoAlliance);
			} else {
					citypar.append(node('span', null, 'textLabel cornames a-'+ally.replace(' ','_'), 'display:'+(IslandPlayerNames?'block':'none')+';left: -10px; top: 84px; cursor: pointer;font-size:8px;', '<span class="before"></span>' + owner + '(' + ally + ')<span class="after"></span>'));
				for (var j = 1; j < allylength; j++)
					if (ally == alliance[j][0]) {
						setCityColors(ally, citypar,cityimage, alliance[j][1]);
						break;
					}
			}
		}
		citypar.append(node('a', 'clevels', 'clevels', (IslandLevels?'display:block;':'display:none;')+'top:30px;left:25px;width:12px;height:12px;z-index:499', citylvl));
	});
	var htmls='';var allyc=0;
	for (var i in allystore) {
		allyc++;
		if (allystore[i] != 1) {htmls += '<tr class="islemarker"><td style="cursor:pointer;padding:1px 0px 1px 0px;">' + i + '</td><td style="padding:2px 4px 2px 2px;">' + allystore[i] + '</td></tr>';}
						  else {htmls += '<tr class="islemarker"><td style="cursor:pointer;padding:1px 0px 1px 0px;">' + i + '</td><td style="padding:2px 4px 2px 2px;">-</td></tr>';}
	}

	var allylist=node('table','alliancelist','dummy','position:absolute;top:170px;line-height:9px;opacity:0.6;background:#CCCCFF;color:black;border-style:double;font-size:11px',htmls,'Ally List');
	$('#mainview').append(allylist).find('tr.islemarker').hover(
			function(){
				var ch = $(this).css({border:'1px ridge black',background:'white'}).find('td:first').text();
				$('.cornames').parent().hide().find('.a-' + ch.replace(' ','_')).parent().show().fadeTo(500,1);
			},
			function(){
				$(this).css({border:'0',background:'transparent'})
				$('.cornames').parent().show();
			});
	var playerlookup=cityinfoPanelIsland();
	if (playerlookup) clickTo(playerlookup,showplayernfo,1);
	if (GM_getValue('ShowCityTroops', '1') == '1') showcitytroops();
	//} catch(e){}
}


if (debug==1){
  tm=5000;
  var debugwin=node('div','debug','dynamic','position:absolute;');
  getbody.appendChild(debugwin);
}

function parsescore(text){
	s=text.split('<td class="score">');
	if (s[1]) {
		s=number(s[1].split('<')[0]);
		return s;
	} else {
		return 0;
	}
}

function getplayerdata(text,tag){
	for (i=0;i<16;i++){
		if (tag[i]){
			if (tag[i][1] == 0) {
				tag[i][1]= 1;
				if (debug==1) debugwin.innerHTML+='GP '+tag[i][0]+' MS<br>';
				post('http://'+location.host+'/index.php','view=highscore&highscoreType=army_score_main&searchUser='+tag[i][0],getplayerdata,tag);
				return ;
			}
			if (tag[i][1] == 1) {
				var score=parsescore(text);
				if (debug==1) debugwin.innerHTML+='P:'+tag[i][0]+' MS='+score+'<br>';
				tag["data"][0]=tag["data"][0]+"&plscm"+i+"="+score;
				tag[i][1]= 2;
				if (debug==1) debugwin.innerHTML+='GP '+tag[i][0]+' GS<br>';
				post('http://'+location.host+'/index.php','view=highscore&highscoreType=trader_score_secondary&searchUser='+tag[i][0],getplayerdata,tag);
				return ;
			}
			if (tag[i][1] == 2) {
				var score=parsescore(text);
				if (debug==1) debugwin.innerHTML+='P:'+tag[i][0]+' GS='+score+'<br>';
				tag["data"][0]=tag["data"][0]+"&plscg"+i+"="+score;
				tag[i][1]= 3;
			}
		}
	}
	if (debug==1) debugwin.innerHTML+=tag["data"][0]+'<br>';
	GM_xmlhttpRequest({	method: "POST",url: col+'col.php',headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(tag["data"][0])});
}




function getisle(text,tag){
	var par=[];
	text=text.split('<span class="island">')[1];
	text=text.split('<div id="cityNav">')[0];
	var nm=text.split('</span>')[0].split('[');
	text='<div id="rambazamba">'+text.split('<div id="mainview"')[1]+">";
	var fake=node('div','','','',text);
	var wood=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]',XPFirst,fake).className.split('level')[1];
	var res=XX('//ul[@id="islandfeatures"]/li[contains(@id,"tradegood")]',XPFirst,fake);
	if (!res) {
		var res=XX('//ul[@id="islandfeatures"]/li[not(contains(@class,"wood")) and not(@id)]',XPFirst,fake);
	}
	res=res.className.split(' level');
	var wond=XX('//ul[@id="islandfeatures"]/li[@id="wonder"]',XPFirst,fake).className.split('wonder')[1];
	var data='s='+serverindex+'&w='+world+'&id='+tag+'&is='+nm[0]+'&ix='+nm[1].split(':')[0]+'&iy='+nm[1].split(':')[1].split(']')[0]+'&iw='+wond+'&ir='+resgoods[res[0]]+'&irl='+res[1]+'&iwl='+wood;
	forall("//li[contains(@class,'cityLocation')]", fake, function(objpar,i){
		var p=i+'=';
		var obj=XX(".//ul[@class='cityinfo']",XPFirst,objpar);
		if (obj){
			var ally=XX(".//li[@class='ally']/a",XPFirst,obj);
			var owner=XX(".//li[@class='owner']/span/following::text()[1]",XPFirst,obj).textContent;
			var oid=XX(".//li[@class='owner']/a[@class='messageSend']",XPFirst,obj);
			if (oid) {oid=oid.href.match(/receiverId=(\d+)/);oid=(oid!=null && oid.length==2 ? oid=oid[1]:aid='');} else {oid='';}
			var aid=XX(".//li[@class='ally']/a[@class='messageSend']",XPFirst,obj);
			if (aid) {aid=aid.href.match(/allyId=(\d+)/);aid=(aid!=null && aid.length==2 ? aid=aid[1]:aid='');} else {aid='';}
			var pils=XX(".//li[@class='name']/span/following::text()[1]",XPList,obj);
			if (pils.snapshotItem(1)) {var pil=number(pils.snapshotItem(1).textContent);} else {var pil=0;}
			var city=XX(".//a/span",XPFirst,obj.parentNode);
			var pst=0;
			var stvac=XX(".//span[@class='vacation']",XPFirst,city);
			var stina=XX(".//span[@class='inactivity']",XPFirst,city);
			if (stvac) pst=1;
			if (stina) pst=2;
			var citynm=XX(".//li[@class='name']/span/following::text()[1]",XPFirst,obj).textContent;
			var citylvl=XX(".//li[@class='citylevel']/span/following::text()[1]",XPFirst,obj).textContent;
			if (ally) {
				data+='&cid'+p+city.parentNode.id.split('city_')[1]+'&pst'+p+pst+'&p'+p+trim(owner)+'&pil'+p+pil+'&c'+p+citynm+'&a'+p+ally.innerHTML+'&t'+p+citylvl+'&oid'+p+oid+'&aid'+p+aid+'&po'+p+objpar.id.split('cityLocation')[1];
			} else	{
				data+='&cid'+p+city.parentNode.id.split('city_')[1]+'&pst'+p+pst+'&p'+p+trim(owner)+'&pil'+p+pil+'&c'+p+citynm+'&a'+p+'-&t'+p+citylvl+'&oid'+p+oid+'&aid'+p+aid+'&po'+p+objpar.id.split('cityLocation')[1];
			}
			par[i]=[trim(owner),0];
		} else {
				data+='&cid'+p+'0&pst'+p+'0&p'+p+'&pil'+p+'0&c'+p+'&a'+p+'&t'+p+'0&po'+p+objpar.id.split('cityLocation')[1]+'&oid'+p+'&aid'+p+'&plscg'+p+'0'+'&plscm'+p+'0';
			par[i]=["",3];
		}
	});
	data+="&grid="+globrand+"&rid="+rand+"&v=12&scv=2";
	par["data"]=[data,0];
	getplayerdata("",par);
}

function getisles(){
	if (islandsearch.length>0) {
		var isle=number(islandsearch[0]);
		if (debug==1) debugwin.innerHTML+='before isle '+isle+'.<br>';
		if (isle>0 && isle<5800) get('http://'+location.host+'/index.php?view=island&id='+isle,getisle,islandsearch[0]);
		if (debug==1) debugwin.innerHTML+='Isle finished('+isle+').<br>';
		islandsearch.splice(0,1);
		setTimeout(getisles,islandsearchs);
	} else setTimeout(servwhat,islandsearchs);
}

function servresponse(text,tag){
	if (debug==1) debugwin.innerHTML+=globrand+'='+rand+' text='+text+'<br>';
	islandsearch=text.split(',');
	islandsearchs=number(islandsearch[islandsearch.length-1]);
	islandsearch.splice(islandsearch.length-1,1);
	if (islandsearchs<10000) islandsearchs=tm;
	if (debug == 1) {
		debugwin.innerHTML += 'Timeout=' + islandsearchs + '<br>';
		islandsearchs=tm;
		debugwin.innerHTML += 'Debug-Timeout=' + islandsearchs + '<br>';
	}
	setTimeout(getisles,islandsearchs);
}

var runs=0;setTimeout(servwhat,tm);
function servwhat(){
	if (debug == 1) {
		if (debug==1) debugwin.innerHTML+='Starting with tm='+tm+'<br>';
		if (runs==0) post( col+'robdebug.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=0&v=1",servresponse,'req');
		else post( col+'robdebug.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=1&v=1",servresponse,'req');
	} else {
		if (runs==0) post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=0&v=1",servresponse,'req');
		else post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=1&v=1",servresponse,'req');
	}
	runs++;
}

function informpost(text,boundframe){
	ProgressStepIt();
	var nfoframe=$("#"+boundframe).html(text);
	nfoframe[0].style.zIndex= n++;
	ProgressStepIt();
	nfoframe.find('.search_alliance,.search_player,.pagebar,.page').each(function(){
		this.addEventListener("click", showplayernfo, false);
	});
	ProgressStepIt();
	nfoframe.find('#nfoframeclose').click(function(){nfoframe.remove()});
	ProgressStepIt();
	nfoframe.fadeIn(500).find('#nfothead').addClass('dragclass');
	ProgressStepIt();
	ProgressDestroy();
}
var nfoframes=0;
function createnfoframe(){
		nfoframes++;
		$('body').append(node('div', 'nfoframe'+nfoframes, 'nfoframe dragpanel', "top:"+(150+nfoframes*10)+"px;left:"+(200+nfoframes*10)+"px;display:none"));
		return 'nfoframe'+nfoframes;
}

function showplayernfo(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		var nfo=$(srcEl).parents().filter('.nfoframe')[0];
		ProgressCreate(10,txtinfodata);
		switch (srcEl.className) {
			case 'questowner':
				post(ika+'/search_player.php','s='+serverindex+'&w='+world+'&p='+srcEl.title+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,createnfoframe());
				break;
			case 'questally':
				post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+srcEl.title+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,createnfoframe());
				break;
			case 'search_player':
				var player=$('input#nfoplayer',nfo).val();
					post(ika+'/search_player.php','s='+serverindex+'&w='+world+'&p='+player+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,createnfoframe());
				break;
			case 'search_alliance':
				var alliance=$('input#nfoalliance',nfo).val();
					post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+alliance+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,createnfoframe());
				break;
			case 'page':
				var page=srcEl.title;
				var alliance=$('input#nfoalliance',nfo).val();
					post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+alliance+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+'&pg='+page+sea,informpost,nfo.id);
				break;
			case 'pagebar':
				var page=srcEl.title;
				var stable=$fork('searchtable');
				if (stable){
					post(ika+'/searchbar.php','s='+serverindex+'&w='+world+'&p='+XX('//input[@name="SearchPlayer"]',XPFirst,stable).value+ '&msl=' + XX('//input[@name="SearchMilitaryScoreL"]', XPFirst, stable).value + '&msh=' + XX('//input[@name="SearchMilitaryScoreH"]', XPFirst, stable).value + '&gsl=' + XX('//input[@name="SearchGoldScoreL"]', XPFirst, stable).value + '&gsh=' + XX('//input[@name="SearchGoldScoreH"]', XPFirst, stable).value + '&thl=' + XX('//input[@name="SearchTownHallLevelL"]', XPFirst, stable).value + '&thh=' + XX('//input[@name="SearchTownHallLevelH"]', XPFirst, stable).value +'&c='+XX('//input[@name="SearchCity"]',XPFirst,stable).value+'&st='+XX('//select[@name="SearchStatus"]',XPFirst,stable).value+'&a='+XX('//input[@name="SearchAlliance"]',XPFirst,stable).value+'&rad='+XX('//input[@name="SearchRadius"]',XPFirst,stable).value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+'&pg='+page+sea,informpost,createnfoframe());
				}
				break;
		}
	}
}

function markscores(){
var table = XX('//table[@id="memberList"]',XPFirst);
	if (table) {
		var allieslist = '';
		var score;
		forallrows(table, 1, function(tbl, i){
			score=trim(tbl.rows[i].cells[4].innerHTML.split('(')[0]);
			allieslist += "," + tbl.rows[i].cells[1].innerHTML + "#^^" + number(score) + ",";
			tbl.rows[i].cells[4].innerHTML=score+"("+score+")";
		});
		GM_setValue("AlliesEmbassyList-"+location.host,allieslist);
	}
}

function getmilitaryscore(text,tag){
	try {
		text=text.replace(/\s/g,"##");
		var table = XX('//table[@id="memberList"]',XPFirst);
		if (table) {
			if (tag == 'write') {
				var nt=new Date().getTime();
				GM_setValue('EmbassyMilitaryLastUpd',nt+'');
				GM_setValue('EmbassyMilitaryCache', text);
			}
			var mil = node('th', null, "header", 'width:40px;', '<img width="12" heigth="12/" src="skin/layout/icon-helmet.gif"/>');
			table.rows[0].insertBefore(mil, table.rows[0].cells[5]);
			eval('var militaryscores=' + text);
			forallrows(table, 1, function(tbl, i){
				tbl.rows[i].insertCell(5);
				var player = tbl.rows[i].cells[1].innerHTML;
				var sc = militaryscores[player.replace(/\s/g,"##")];
				var scout = (sc) ? fmtNumber(sc) : '';
				tbl.rows[i].cells[5].innerHTML = '<small>' + scout + '</small>';
			});
		$.tablesorter.addParser({id: 'score',is: function(s){return false;},format:function(s){return parseInt(s.replace(/\D+/g, "") || "0", 10)},type: 'numeric'});
		$('#memberList').tablesorter({
	    	sortList: [[4,1]] ,
			headers: { 4: {sorter:'score'},5: {sorter: 'score'},6: {sorter: false}}
	    }).bind("sortEnd",function() {
        		$('tr',this).removeClass('alt');
				$('tr:even',this).addClass('alt');
    		});
		}
	} catch(e){}
}

function Embassy() {
	var table = XX('//table[@id="memberList"]',XPFirst);
	if (table) {
		var lastcell=table.rows[0].cells.length-1;
		//GM_setValue("AlliesEmbassyList","")
		var allieslist=GM_getValue("AlliesEmbassyList-"+location.host,"");
		table.rows[0].cells[lastcell-1].innerHTML='<img height="16" width="20" src="http://www.ika-core.org/images/bars.png"/>';
		btn(table.rows[0].cells[lastcell-1],'markscores','markscores','Mark','Mark the scores(Put the actual score to the grey ones).',markscores,5);
		var points=0;
		var allymap = $('div.contentBox01h:first tbody');
		var allycanvas = allymap.append('<tr><td>Alliance Influence</td><td><canvas id="allycanvas" width="200" height="150" style="background:transparent;border:1px solid black;float:left"/> &nbsp;&nbsp;&nbsp;- RED = Allies Islands<br/> &nbsp;&nbsp;&nbsp;- Yellow Influence of Cities (more cities more influence)</td><tr>').find('canvas');
		if (allycanvas[0].getContext) {
			var ctx = allycanvas[0].getContext('2d');
			ctx.scale(2, 1.5);
			var img = new Image();
		    $(img).load (function(){
				ctx.drawImage(this, 62, 32,110 ,50 , 0, 0, 50, 50);
				ctx.drawImage(this, 62, 32,110 ,50 , 50, 0, 50, 50);
				ctx.drawImage(this, 62, 32,110 ,50 , 0, 50, 50, 50);
				ctx.drawImage(this, 62, 32,110 ,50 , 50, 50, 50, 50);
				var lingrad =ctx.createLinearGradient(0,0,0,100);
			  	lingrad.addColorStop(0, 'rgba(255,255,255,0.6)');
			  	lingrad.addColorStop(0.5, 'rgba(0,200,230,0.2)');
			  	lingrad.addColorStop(1, 'rgba(255,255,255,0.6)');
			  	ctx.fillStyle = lingrad;
				ctx.fillRect(0,0,100,100);

				var x=[],y=[];
				$(table).find('.city').each(function(){
					var coords=this.innerHTML.match("\\[(.*)]")[1].split(':');
					x.push(coords[0]);y.push(coords[1]);
				});
				ctx.fillStyle = 'rgba(255,230,20,0.03)';
				var c=Math.PI*2;
				for (var i=0,xl=x.length;i<xl;i++){
					ctx.beginPath();
					ctx.arc(x[i],y[i],10,0,c,true);
					ctx.fill();
				}
			    ctx.fillStyle = 'rgba(225,10,50,1)';
				for (var i=0,xl=x.length;i<xl;i++){
					ctx.beginPath();
					ctx.arc(x[i],y[i],0.5,0,c,true);
					ctx.fill();
				}

			});
			img.src="skin/world/tile_ocean03.gif";
		}
		forallrows(table,1,function(tbl,i){
			points+=number(tbl.rows[i].cells[4].innerHTML);
			var status=tbl.rows[i].cells[0];
			var player=tbl.rows[i].cells[1];
			var ind=allieslist.indexOf(","+player.innerHTML+"#^^");
			if ( ind==-1) {
				allieslist+=","+player.innerHTML+"#^^"+number(tbl.rows[i].cells[4].innerHTML)+",";
				GM_setValue("AlliesEmbassyList-"+location.host,allieslist);
				player.setAttribute("style","color:blue;");
			} else {
				var spl=allieslist.substr(ind+1);
				spl=spl.substr(0,spl.indexOf(','));
				spl=spl.split("#^^")[1];
				tbl.rows[i].cells[4].title=" Previous marked score: "+fmtNumber(spl);
			}
			if (status.className != "online") {
				if (status.title.search('01.01.1970') != -1) {
					status.innerHTML = "<div style='width:50px;float:left;font-size:10px;'><img src='skin/layout/bulb-off.gif' style='width:10px;height:13px;'/>&nbsp;"+SideBar_Search_PlayerInactive+"</div>";
					status.setAttribute('class', "");
					status.parentNode.setAttribute('style', "color:gray;");
					status.setAttribute('style', "text-align:left;");
				}
				else {
					status.setAttribute('class', "");
					status.setAttribute('style', "color:brown;text-align:left;float:left");
					var dt=status.title.split(":")[1];
					var dts=dt.split('.')[0]+'/'+dt.split('.')[1];
					status.innerHTML = "<div style='width:50px;font-size:10px;'><img src='skin/layout/bulb-off.gif' style='width:10px;height:13px;'/>&nbsp;" + dts + "</div>";
				}
			} else {
					status.innerHTML = "<div style='width:50px;float:left;font-size:10px;'><img src='skin/layout/bulb-on.gif' style='width:10px;height:13px;'/>&nbsp;Online</div>";
					status.setAttribute('class', "");
					status.setAttribute('style', "text-align:left;");
			}
		});
		if (getbody.id == 'embassy') {
			var allyscore = $X('//div[@class="contentBox01h"][1]//tbody/tr[5]/td[2]');
		}else {
			var allyscore = $X('//div[@class="contentBox01h"][1]//tbody/tr[4]/td[2]');
		}
		var allymembers = $X('//div[@class="contentBox01h"][1]//tbody/tr[3]/td[2]');
		var allyroundmail = $X('//div[@class="contentBox01h"][1]//tbody/tr[8]/td[2]/a');
		if 	(allyroundmail) {
			GM_setValue('RoundMail'+location.host,allyroundmail.href+'#~#'+allyroundmail.innerHTML);
		}
		if (allyscore && allymembers){
			var allymembersnr=number(allymembers.textContent);
			allyscore.innerHTML+=" - Average Points: "+fmtNumber(parseInt(points/allymembersnr));
		}
		if (testvar("EmbassyCheckTreaties")) {
			if (getbody.id=='embassy') table.rows[0].cells[lastcell].setAttribute('style','width:120px');
			btn(table.rows[0].cells[lastcell],'chktreatyall','checktreaty','Сє','Check all Players.',checkplayer,5);
			forallrows(table,1,function(tbl,i){
				var player=tbl.rows[i].cells[1].innerHTML;
				btn($(tbl.rows[i].cells[lastcell]).find('div')[0],'chktreaty'+i,'checktreaty','Сє',player,checkplayer,2);
			});
		}
		if (testvar("EmbassyPlayerSearch"))
			if (getbody.id=='embassy') table.rows[0].cells[lastcell].setAttribute('style','width:120px');
			forallrows(table,1,function(tbl,i){
				var player=tbl.rows[i].cells[1].innerHTML;
				btn($(tbl.rows[i].cells[lastcell]).find('div')[0],'questowner'+i,'questowner','?',player,showplayernfo,2);
			});

		//military score stuff
		if (getbody.id=='embassy' && GM_getValue('EmbassyGetMilitary','1'=='1')){
			var vallynm=$X('id("mainview")/div[@class="contentBox01h"][1]//tbody/tr[1]/td[1]');
			if (vallynm){
				vallynm=vallynm.innerHTML.match("\\[(.*)]")[1];
				GM_setValue('EmbassyMilitaryAlly',vallynm);
				//GM_setValue('EmbassyMilitaryLastUpd','');
				//GM_setValue('EmbassyMilitaryCache', '');
				var embupd=GM_getValue('EmbassyMilitaryLastUpd',0);
				var tmnow=new Date().getTime();
				if (tmnow - embupd > 86400000) {
					get('http://www.ika-core.org/search/militaryscoreprovider.php?s=' + serverindex + '&w=' + world + '&a=' + vallynm, getmilitaryscore,'write');
				} else {
					getmilitaryscore(GM_getValue('EmbassyMilitaryCache'),'nowrite');
				}
			}
		} else {
			vallynm=GM_getValue('EmbassyMilitaryAlly');
			if (vallynm) {
				var embupd=GM_getValue('EmbassyMilitaryLastUpd',0);
				var tmnow=new Date().getTime();
				if (tmnow - embupd > 86400000) {
					get('http://www.ika-core.org/search/militaryscoreprovider.php?s=' + serverindex + '&w=' + world + '&a=' + vallynm, getmilitaryscore,'write');
				} else {
					getmilitaryscore(GM_getValue('EmbassyMilitaryCache'),'nowrite');
				}
			} else {
				$.tablesorter.addParser({id: 'score',is: function(s){return false;},format:function(s){return parseInt(s.replace(/\D+/g, "") || "0", 10)},type: 'numeric'});
				$('#memberList').tablesorter({
		    		sortList: [[4,1]] ,
					headers: { 4: {sorter:'score'},5: {sorter: false}}
		    	}).bind("sortEnd",function() {
	        		$('tr',this).removeClass('alt');
					$('tr:even',this).addClass('alt');
	    		});
			}
			$('#memberList tr.1').addClass('highlight');
		}
	}
}

//check the message senders for museum stuff
function checkculturetreaty(text,musplayer){
	var fake=node("div",'','','',text);
	ProgressStepIt();
	var found=0;
	var mplayers="";
			forall('//td[@class="player"]', fake, function(obj,i){
				mplayers+=","+obj.innerHTML+",";
			});

	GM_setValue("CultTtreaties"+location.host,mplayers);
	if (musplayer=="Check all Players."){
		forall('//*[@class="checktreaty"]',0,function(obj2,i){
				obj2.parentNode.parentNode.setAttribute('style','background-color:#FDF790;');
			});
		forall('//td[@class="player"]', fake, function(obj,i){
			ProgressStepIt();

			forall('//*[@class="checktreaty"][@title="'+obj.innerHTML+'"]',0,function(obj2,i){
				obj2.parentNode.parentNode.setAttribute('style','background-color:lightgray;');
			});
		});
		addsbubble('diplomat',TreatyAll);
	} else {
		forall('//td[@class="player"]', fake, function(obj,i){
			ProgressStepIt();
			if (obj.innerHTML==musplayer) found=1;
		});

		if (found==1) {
			addsbubble('diplomat',TreatyYes);
			forall('//*[@class="checktreaty"][@title="'+musplayer+'"]',0,function(obj,i){
				obj.parentNode.parentNode.setAttribute('style','background-color:lightgray;');
			});
		}
		else {
			addsbubble('diplomat',TreatyNo);
			forall('//*[@class="checktreaty"][@title="'+musplayer+'"]',0,function(obj,i){
				obj.parentNode.parentNode.setAttribute('style','background-color:#FDF790;');
			});
		}
	}
	ProgressDestroy();
}

function getposmuseum(text,musplayer){
	var fake=node("div",'','','',text);
	ProgressStepIt();
	buf=XX('//li[@class="museum"]/a', XPFirst,fake);
	ProgressStepIt();
	get(buf.href,checkculturetreaty,musplayer);
}

function checkplayer(e) {
	var musplayer;
	ProgressCreate(10,txtchkplayer);
	var obj=mapevt(e);
	ProgressStepIt();
	musplayer=obj.title;
	ProgressStepIt();
	get(XX('//li[@class="viewCity"]/a',XPFirst).href,getposmuseum,musplayer);
}


function Messages(){
var smilies = [
  			[/((http|ftp):\/\/[^\s^<^#]+)/g,'<a href="$1" target="_blank" style="text-decoration:none;margin:10px;padding:2px 12px;color:Navy;font-weight:bold;font-size:11px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;outline:Tomato ridge 3px;-moz-outline-radius:5px;line-height:24px;" title="Click to Navigate">$1</a>'],
			[/:D/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/biggrin.gif" width="15" height="17" alt=":D" title="Very Happy" />'],
			[/:\?/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/confused.gif" width="15" height="17" alt=":?" title="Confused" />'],
			[/8-\)/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/cool.gif" width="15" height="15" alt="8-)" title="Cool" />'],
			[/:cry:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/cry.gif" width="15" height="15" alt=":cry:" title="Crying or Very Sad" />'],
			[/:shock:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/eek.gif" width="15" height="15" alt=":shock:" title="Shocked" />'],
			[/:evil:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/evil.gif" width="15" height="15" alt=":evil:" title="Evil or Very Mad" />'],
			[/:!:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/exclaim.gif" width="15" height="15" alt=":!:" title="Exclamation" />'],
			[/:geek:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/geek.gif" width="17" height="17" alt=":geek:" title="Geek" />'],
			[/:idea:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/idea.gif" width="15" height="15" alt=":idea:" title="Idea" />'],
			[/:lol:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/lol.gif" width="15" height="15" alt=":lol:" title="Laughing" />'],
			[/:x/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/mad.gif" width="15" height="15" alt=":x" title="Mad" />'],
			[/:mrgreen:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/mrgreen.gif" width="15" height="15" alt=":mrgreen:" title="Mr. Green" />'],
			[/:\|/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/neutral.gif" width="15" height="15" alt=":|" title="Neutral" />'],
			[/:\?:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/question.gif" width="15" height="15" alt=":?:" title="Question" />'],
			[/:P/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/razz.gif" width="15" height="15" alt=":P" title="Razz" />'],
			[/:oops:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/redface.gif" width="15" height="15" alt=":oops:" title="Embarrassed" />'],
			[/:roll:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/rolleyes.gif" width="15" height="15" alt=":roll:" title="Rolling Eyes" />'],
			[/:\(/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/sad.gif" width="15" height="17" alt=":(" title="Sad" />'],
			[/:\)/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/smile.gif" width="15" height="17" alt=":)" title="Smile" />'],
			[/:o/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/surprised.gif" width="15" height="19" alt=":o" title="Surprised" />'],
			[/:twisted:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/twisted.gif" width="15" height="15" alt=":twisted:" title="Twisted Evil" />'],
			[/:ugeek:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/ugeek.gif" width="19" height="18" alt=":ugeek:" title="Uber Geek" />'],
			[/;\)/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/wink.gif" width="15" height="17" alt=";)" title="Wink" />'],
			[/:wink:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/wink.gif" width="15" height="17" alt=";)" title="Wink" />'],
			[/:clap:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/clap.gif" width="19" height="16" alt=":clap:" title="Clap" />'],
			[/:dance:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/dance.gif" width="27" height="16" alt=":dance:" title="Dance" />'],
			[/:doh:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/doh.gif" width="22" height="16" alt=":doh:" title="Doh!" />'],
			[/:drool:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/drool.gif" width="15" height="16" alt=":drool:" title="Drool" />'],
			[/:hand:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/hand.gif" width="17" height="16" alt=":hand:" title="Talk to the hand" />'],
			[/:liar:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/liar.gif" width="20" height="15" alt=":liar:" title="Liar" />'],
			[/:naughty:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/naughty.gif" width="20" height="16" alt=":naughty:" title="Naughty" />'],
			[/:pray:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/pray.gif" width="19" height="16" alt=":pray:" title="Pray" />'],
			[/:shhh:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/shhh.gif" width="15" height="16" alt=":shhh:" title="Shhh..." />'],
			[/:shifty:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/shifty.gif" width="15" height="15" alt=":shifty:" title="Shifty" />'],
			[/:snooty:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/snooty.gif" width="16" height="15" alt=":snooty:" title="Snooty" />'],
			[/:think:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/think.gif" width="17" height="16" alt=":think:" title="Think" />'],
			[/:violin:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/violin.gif" width="39" height="16" alt=":violin:" title="Violin" />'],
			[/:whistle:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/whistle.gif" width="22" height="16" alt=":whistle:" title="Whistle" />'],
			[/\`ramsea/g,'<img src="skin/characters/fleet/120x100/ship_ram_r_120x100.gif" style="width:32px">Ramsea'],
			[/\`ballista/g,'<img src="skin/characters/fleet/120x100/ship_ballista_r_120x100.gif" style="width:32px">Ballista'],
			[/\`flame/g,'<img src="skin/characters/fleet/120x100/ship_flamethrower_r_120x100.gif" style="width:32px">Flamethrower'],
			[/\`catapultsea/g,'<img src="skin/characters/fleet/120x100/ship_catapult_r_120x100.gif" style="width:32px">Catapultsea'],
			[/\`paddle/g,'<img src="skin/characters/fleet/120x100/ship_steamboat_r_120x100.gif" style="width:32px">Paddle'],
			[/\`mortarsea/g,'<img src="skin/characters/fleet/120x100/ship_mortar_r_120x100.gif" style="width:32px">Mortarsea'],
			[/\`diving/g,'<img src="skin/characters/fleet/120x100/ship_submarine_r_120x100.gif" style="width:32px">Diving'],
			[/\`slinger/g,'<img src="skin/characters/military/120x100/slinger_r_120x100.gif" style="width:32px">Slinger'],
			[/\`swordsman/g,'<img src="skin/characters/military/120x100/swordsman_r_120x100.gif" style="width:32px">Swordsman'],
			[/\`phalanx/g,'<img src="skin/characters/military/120x100/phalanx_r_120x100.gif" style="width:32px">Phalanx'],
			[/\`archer/g,'<img src="skin/characters/military/120x100/archer_r_120x100.gif" style="width:32px">Archer'],
			[/\`marksman/g,'<img src="skin/characters/military/120x100/marksman_r_120x100.gif" style="width:32px">Marksman'],
			[/\`gyrocopter/g,'<img src="skin/characters/military/120x100/gyrocopter_r_120x100.gif" style="width:32px">Gyrocopter'],
			[/\`steamgiant/g,'<img src="skin/characters/military/120x100/steamgiant_r_120x100.gif" style="width:32px">Steamgiant'],
			[/\`bombardier/g,'<img src="skin/characters/military/120x100/bombardier_r_120x100.gif" style="width:32px">Bombardier'],
			[/\`ram/g,'<img src="skin/characters/military/120x100/ram_r_120x100.gif" style="width:32px">Ram'],
			[/\`catapult/g,'<img src="skin/characters/military/120x100/catapult_r_120x100.gif" style="width:32px">Catapult'],
			[/\`mortar/g,'<img src="skin/characters/military/120x100/mortar_r_120x100.gif" style="width:32px">Mortar'],
			[/\`doctor/g,'<img src="skin/characters/military/120x100/medic_r_120x100.gif" style="width:32px">Doctor'],
			[/\`cook/g,'<img src="skin/characters/military/120x100/cook_r_120x100.gif" style="width:32px">Cook'],
			[/\`spearmen/g,'<img src="skin/characters/military/120x100/spearman_r_120x100.gif" style="width:32px">Spearmen'],
			[/\`barbarian/g,'<img src="skin/characters/military/120x100/barbarian_r_120x100.gif" style="width:32px">Barbarian'],
			[/\`wall/g,'<img src="skin/layout/stadtmauer_icon.gif" style="width:32px">Wall']
			];
	var tbl=$('table.table01');
	if (tbl.length>0) {
		var telm=tbl.get(0);		
		var rlength=telm.rows.length - 5;
		var rmail=GM_getValue('RoundMail'+location.host);
		if (rmail){
			rmail=rmail.split('#~#');
			tbl.find('.selection').append('<a class="button" href="'+rmail[0]+'" title="'+rmail[1]+'" style="font-size:14px;float:right">'+rmail[1]+'<span style="color:red;font-size:7px">ika-core</span></a>');
		}
		if (testvar("FormatMessages")) {		
			tbl.find('th:first').html('');
			tbl.find('td.subject').each(function(i){
				var a=$(this);
				var m=a.attr('onClick').match(/\([^\(]+\)/g);
				if (m){a.html(
				$('tr#tbl_'+m[0].replace("('", '').replace("')", '')+' td div').text().substr(0,65)+'...'
				)}
			});
			forall("//td[@class='msgText']/div", telm, function(obj,i){
				//str.match(/\d{2}:\d{2}/);
				var txtbuf=obj.innerHTML;
				if (txtbuf.search(/(~~-.|\s\-)/)!=-1){ //find magic
					txtbuf=txtbuf.replace(/(\_)/g," ");
					$(obj).attr('style','font-family:monospace');					
				}
				for (var j = 0; j < smilies.length; j++){
					txtbuf=txtbuf.replace(smilies[j][0],smilies[j][1]);
				}
				obj.innerHTML=txtbuf;
			});
		}
		if (testvar("MessageCheckTreaties")) {
			btn(telm.rows[0].cells[0], 'chktreatyall', 'checktreaty', 'Сє', 'Check all Players.', checkplayer, 5);
			for (i = 1; i < rlength; i = i + 3) {
				var player = trim(telm.rows[i].cells[2].textContent);
				btn(telm.rows[i].cells[0], 'chktreaty' + i, 'checktreaty', 'Сє', player, checkplayer, 5);
			}
		}

		if (testvar("MessagePlayerSearch")) {
			for (i = 1; i < rlength; i = i + 3) {
					var player = trim(telm.rows[i].cells[2].textContent);
					btn(telm.rows[i].cells[1], 'questowner' + i, 'questowner', '?', player, showplayernfo, 5);
				}
		}
	}

}

function talkbubble(who,text,fontsize,timeout){
	var x=20;
	var y=-165;
	if (!fontsize) {
		switch (text.split(' ').length) {
			case 1:
				fontsize='19';
			break;
			case 2:
				fontsize='18';
			break;
			case 3:
				fontsize='17';
			break;
			case 4:
				fontsize='15';
			break;
			case 5:
				fontsize='12';
			break;
			default:
				fontsize='10';
		}
	}
	switch (who) {
		case 'mayor':
			var parelm=$fork('advCities');
		break;
		case 'general':
			var parelm=$fork('advMilitary');
		break;
		case 'scientist':
			var parelm=$fork('advResearch');
		break;
		case 'diplomat':
			var parelm=$fork('advDiplomacy');
		break;
	}
	bubbles++;
	var canvas=node('canvas','speechbubble'+bubbles,null,'position:relative;top:'+y+'px;left:'+x+'px;width:250px;height:150px;z-index:300;opacity:0.8');
	canvas.setAttribute('onmousemove','this.parentNode.removeChild(this)');
	var canvastext=node('table','speechbubbletext'+bubbles,null,'position:relative;top:'+parseInt(y-125)+'px;text-align:center;vertical-align:middle;left:'+parseInt(x+40)+'px;width:110px;height:57px;z-index:300;font-weight:600;font-family:comic;font-size:'+fontsize+'px','<tr><td>'+text+'</td></tr>');
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
		//speech bubble
		ctx.scale(1.5,0.9);
		ctx.beginPath();
		ctx.moveTo(75,25);
		ctx.quadraticCurveTo(25,25,25,62.5);
		ctx.quadraticCurveTo(25,100,50,100);
		ctx.quadraticCurveTo(50,120,30,125);
		ctx.quadraticCurveTo(60,120,65,100);
		ctx.quadraticCurveTo(125,100,125,62.5);
		ctx.quadraticCurveTo(125,25,75,25);
		ctx.stroke();
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fill();
	parelm.appendChild(canvas);
	parelm.appendChild(canvastext);
	}
	if(timeout) addschedule('destroybubble('+bubbles+')',parseInt(timelapse+timeout));
	else {
		timeout=parseInt(text.split(' ').length/2);
		if (timeout<2) timeout=2;
		addschedule('destroybubble('+bubbles+')',parseInt(timelapse+timeout));
	}
}

function destroybubble(bubid){
	var bub=$fork('speechbubble'+bubid);
	var bubtext=$fork('speechbubbletext'+bubid);
	if (bub) remove(bub);
	if (bubtext) remove(bubtext);
}

function schedulerhandler(){
	timelapse++;
	if (scheduler){
		for (var i=0;i<scheduler.length;i++){
			if (scheduler[i][0]==timelapse) {
				eval(scheduler[i][1]);
				scheduler.splice(i,1); //remove queue
				if (i>0) i--;
			}
		}
	}
}

function addschedule(what,tm){
	scheduler.push([tm ,what]);
}

function addsbubble(who,text,tm){
	if (tm) addschedule('talkbubble("'+who+'","'+text+'")',tm);
	else addschedule('talkbubble("'+who+'","'+text+'")',timelapse+1);
}


addsbubble('mayor','Check out ika-core.org', 175);
addsbubble('scientist','Oh Yeah', 177);
addsbubble('general','It rocks!', 180);

function extrapost(url, data, reqvalue, c, hiturl) {
	GM_xmlhttpRequest({	method: "POST",
						url: url,
						headers:{'Content-type':'application/x-www-form-urlencoded'},
						data:encodeURI('actionRequest='+reqvalue+'&'+data),
						onload: function(xhr) {
							ProgressStepIt();
							GM_xmlhttpRequest({method: "GET",url: hiturl,onload: function(xhr) {
								var getactionreq=node("div",null,null,null,xhr.responseText);
								var actionreq=XX('//form//input[@name="actionRequest"]',XPFirst,getactionreq);
								c--;
								if (actionreq) {
									if (c>0){
										setTimeout(function() { extrapost('http://'+location.host+'/index.php',data,actionreq.value,c,hiturl); }, parseInt(GM_getValue('BashDelay','2000')));
									} else {
										location.href=hiturl;
									}
								} else {
									alert("Could not send "+c+" spies.");
									location.href=hiturl;
								}
								}});
						}});
}

function actionshandler(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.className) {
			   case 'plunderbash':
					var postdata='';
					var reqvalue='';
					forall('//form//input',null,function(obj,i){
					if(obj.name)
					   if (obj.name=="actionRequest") {
						  reqvalue=obj.value;
					   } else {
						  postdata+=obj.name+'='+obj.value+'&';
					   }
					else
					   postdata+='submit='+obj.value;
					});

					if (srcEl.id=='spybash2') {
				var c=2;
				ProgressCreate(2,"Sending x"+c);
				}
				if (srcEl.id=='spybash5') {
				var c=5;
				ProgressCreate(5,"Sending x"+c);
				}
				if (srcEl.id=='spybash10') {
				var c=10;
				ProgressCreate(6,"Sending x"+c);
				}
					setTimeout(function() { extrapost('http://'+location.host+'/index.php',postdata,reqvalue,c,location.href); }, 0);
				 break;
			break;
		}
	}
}

//sidebar
function sidemenu(){
	var top=GM_getValue("SideBarTop","300px");
	if (parseInt(top)<10) top='10px';
	if (parseInt(top)>600) top='600px';
	var sidebarnode = node("div","sidemenu",null,"left:0px;top:"+top+";",'<ul id="sidebarrow"></ul>');
	getbody.appendChild(sidebarnode);
	clickTo(sidebarnode,sidebarevents,1);
	sidebarnode.addEventListener("mousemove",sidebareventsmousemove,false);
}

function sidetab(api,nm,title,width,height,initfunc,tag){
	var sidebarnode=$fork("sidebarrow");
	switch (tag){
		case "mover":
			sidebarnode.innerHTML += '\
				<li><ul><li class="dragsidemenu"><div style="cursor : move;width:12px;height:18px;background: #ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;outline:#EDA76D outset 4px;-moz-outline-radius:10px 10px 10px 10px;font-size:14px;" Title="' + title + '">в†•</div>\
				</li></ul></li>';
		break;
		case "menu":
			sidebarnode.innerHTML += '\
				<li><ul><li>\
				<a href="#" Title="' + title + '" id="'+api+'alink" class="speedalink">' + nm + '</a>\
				' +	initfunc(width,title) +	'\
				</li></ul></li>';
		break;
		default:
			sidebarnode.innerHTML += '\
			<li><ul><li><a href="#" Title="' + title + '" id="'+api+'alink" class="speedalink">' + nm + '</a>\
			<ul><li>\
					<div class="korniza" style="width:'+width+'px;"></div>\
					<div class="elisthead" style="width:'+width+'px;">'+title+'</div>\
					<div class="korniza" style="width:'+width+'px;"></div>\
					<div class="elistmain" style="width:'+width+'px;height:'+height+'px;" id="'+api+'main"></div>\
					<div class="elistfoot" style="width:'+width+'px;"></div>\
			</li></ul></li></ul></li>';
	}
	if (initfunc) initfunc();
}

function sidebarevents(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.className) {
			case "questally":
				showplayernfo(e);
				break;
			case "questowner":
				showplayernfo(e);
				break;
			case "savenotes":
				GM_setValue('ikanotes', $fork('sidenotes').value);
				break;
			case "playgames":
				playgames(e);
				break;
			case "addfriend":
				if ($fork('friendname').value == '') {
					alert("Please type in your Friends Name!");
					return
				}
				GM_setValue("Friends"+location.host, GM_getValue("Friends"+location.host, "") + $fork('friendname').value + '#,#');
				friends();
				break;
			case "delfriend":
				GM_setValue("Friends"+location.host, GM_getValue("Friends"+location.host, "").replace(srcEl.title + '#,#', ''));
				friends();
				break;
			case "addenemy":
				if ($fork('Enemiesname').value == '') {
					alert("Please type in your Enemies Name!");
					return
				}
				GM_setValue("Enemies"+location.host, GM_getValue("Enemies"+location.host, "") + $fork('Enemiesname').value + '#,#');
				enemies();
				break;
			case "delenemy":
				GM_setValue("Enemies"+location.host, GM_getValue("Enemies"+location.host, "").replace(srcEl.title + '#,#', ''));
				enemies();
				break;
			case "savesettings":
				forall('.//input', $fork('ikacoresettings'), function(obj, i){

					if (obj.type == "checkbox") {
						if (obj.checked == true)
							GM_setValue(obj.name, '1')
						else
							GM_setValue(obj.name, '0');
					}
					if (obj.type == "text") {
						GM_setValue(obj.name, obj.value);
					}
				});

				GM_setValue("Enemies"+location.host, GM_getValue("Enemies"+location.host, "").replace(srcEl.title + '#,#', ''));
				enemies();
				break;
			case "SearchMainQuickSearch":
				forall('.//input', $fork('ikasearch'), function(obj, i){
					if (obj.type == "text") {
						GM_setValue(obj.name, obj.value);
					}
				});
				var stable = $fork('searchtable');
				if (stable) {
					ProgressCreate(10, txtinfodata);
					post(ika + '/searchbar.php', 's=' + serverindex + '&w=' + world + '&p=' + XX('//input[@name="SearchPlayer"]', XPFirst, stable).value + '&msl=' + XX('//input[@name="SearchMilitaryScoreL"]', XPFirst, stable).value + '&msh=' + XX('//input[@name="SearchMilitaryScoreH"]', XPFirst, stable).value + '&gsl=' + XX('//input[@name="SearchGoldScoreL"]', XPFirst, stable).value + '&gsh=' + XX('//input[@name="SearchGoldScoreH"]', XPFirst, stable).value + '&thl=' + XX('//input[@name="SearchTownHallLevelL"]', XPFirst, stable).value + '&thh=' + XX('//input[@name="SearchTownHallLevelH"]', XPFirst, stable).value +'&c=' + XX('//input[@name="SearchCity"]', XPFirst, stable).value + '&st=' + XX('//select[@name="SearchStatus"]', XPFirst, stable).value + '&a=' + XX('//input[@name="SearchAlliance"]', XPFirst, stable).value + '&rad=' + XX('//input[@name="SearchRadius"]', XPFirst, stable).value + '&prc=' + XX('//li[@class="viewCity"]/a', XPFirst).href.split('id=')[1]+sea, informpost, createnfoframe());
				}
				break;
			case "SearchMainQuickClear":
				forall('.//input', $fork('ikasearch'), function(obj, i){
					if (obj.type == "text") {
						obj.value="";
					}
				});
				break;
		}
/*		if (srcEl.id) {
			switch (srcEl.id) {
			}
		}*/
	}
}

function sidebareventsmousemove(e){
//various speed hacks
	var srcEl=mapevt(e);
	if (srcEl) {
//		switch (srcEl.className) {
//			case "speedalink":
//				alert(XX(".//div[@class='elistmain']",XPFirst,srcEl.parentNode));
//		}
		if (srcEl.id) {
//		alert(srcEl.id);
		//alert(XX(".//div[@class='elistmain']",XPFirst,srcEl).id);
			switch (srcEl.id) {
				case "Settingsmain":
				case "SettingsCont":
					settingscont();
					break;
			}
		}
	}
}


function sidetabs(){
	sidemenu();
	sidetab("","", SideBar_Drag, 0,0 ,null,"mover");
	if (GM_getValue("SideBarSearch",1)==1)  sidetab("Search", SideBar_Search, SideBar_SearchT, "500", "100%;",search);
	if (GM_getValue("SideBarTools",1)==1) 	sidetab("Tools", ''+alliancenm+'в„ў', SideBar_ToolsT, 200, "100%",tools,"menu");
	if (GM_getValue("SideBarNotes",1)==1) 	sidetab("Notes",SideBar_Notes, SideBar_NotesT, 400, 400,notesinit);
	if (GM_getValue("SideBarAllies",1)==1) 	sidetab("Allies",SideBar_Allies, SideBar_AlliesT, 100, "100%", alliancelist,"menu");
	if (GM_getValue("SideBarEnemies",1)==1) sidetab("Enemies",SideBar_Enemies, SideBar_EnemiesT, 150, 340, enemies);
	if (GM_getValue("SideBarFriends",1)==1) sidetab("Friends",SideBar_Friends, SideBar_FriendsT, 150, 270,friends);
	sidetab("Settings",SideBar_Settings, SideBar_SettingsT, 350, 310,settings);
	if (chaturl!='.'&&GM_getValue("SideBarChat",1)==1) sidetab("Chat",SideBar_Chat, SideBar_ChatT, GM_getValue("ChatWidth",1000), GM_getValue("ChatHeight",300),chat);
}

function tools(width,title){
		var tempmenu='<li><div class="korniza" style="width:'+width+'px"></div>\
<div class="elisthead" style="width:'+width+'px;">'+title+'</div>\
<div class="korniza" style="width:'+width+'px"></div>';
		var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;outline:none;border-bottom:brown dotted 1px" ';
		var rmail=GM_getValue('RoundMail'+location.host);
		if (rmail){
			rmail=rmail.split('#~#');
		} else {
		    rmail=Array();
			rmail[0]='http://'+location.host+'/index.php?view=diplomacyAdvisorAlly';
			rmail[1]='Visit your embassy !!!!';
		}
		corsairmenu=[[rmail[0] , AllianceMenu[0][1], rmail[1],'','-'],
		[forumurl	,  AllianceMenu[1][1], AllianceMenu[1][0],''],
		[forumurlnew,  AllianceMenu[2][1], AllianceMenu[2][0],'','-'],
		[chaturl 	,  AllianceMenu[3][1], AllianceMenu[3][0],'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		[''			,  AllianceMenu[4][1], AllianceMenu[4][0],'makeframes(\''+chaturl+'\');' ,'-'],
		['http://ikariamlibrary.com/?content=IkaFight' ,  AllianceMenu[5][1], AllianceMenu[5][0],'window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		['http://ikariamlibrary.com/?content=CR%20Formatter&lang= "language"' ,  "Combat Report Formatter", "CR Formatter" ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		['http://www.ika-core.org',  AllianceMenu[6][1], AllianceMenu[6][0],'']];
		for (var i=0,corlength=corsairmenu.length;i<corlength;i++) {
			switch (corsairmenu[i][0]) {
			case '.':
				break;
			case '':
				if (corsairmenu[i][3]!="makeframes('.');") tempmenu+='<li><center><a '+style+' target="_blank" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			default:
				tempmenu+='<li><center><a '+style+' target="_blank" href="'+corsairmenu[i][0]+'" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			}
		}
 	tempmenu+='<div class="elistfoot" style="width:'+width+'px;"/>';
   return '<ul>'+tempmenu+'</ul>';
}


function chat(){
	var masternode=$fork("Chatmain");
	masternode.innerHTML+="<center><div style='width:100%;height:100%;'><br><br><b>Move your mouse over here to enable the ika-core.org GLOBAL Chat.</b><br>";
	masternode.innerHTML+="<b>The best chat expierence is to have the chat in a frame. Go to Left-Sidebar:Tools and select Chat(Frame).</b><br><br>";
	masternode.innerHTML+="If you do not have a chat server for your Alliance you can simply use the one provided by ika-core.org .";
	masternode.innerHTML+="In order to use the chat you simply have to register.";
	masternode.innerHTML+="You also can have private conversations with others or create Rooms for multiple players to join.";
	masternode.innerHTML+="The rooms will auto expire after 30 minutes of inactivity.";
	masternode.innerHTML+="If you would like to have a private room that is also password protected and never expires, you need to apply for it on our forum.";
	masternode.innerHTML+="Generally people that donated can have this kind of rooms, in those rooms you will be granted Operator status (can kick , ban etc).</div></center>";
	masternode.setAttribute("onmousemove","	if (!document.getElementById('chatframei')) this.innerHTML=\"<iframe id='chatframei' width='100%' border='0' frameborder='0' height='100%' src='"+chaturl+"' style='margin-left:0px;'/>\";if (this.parentNode.style.left!=\'0px\') this.parentNode.style.left=\'0px\';");
}

function alliancelist(width,title){
	var style=' style="width:90%;cursor:pointer;margin:0px 0px 0px 0px;padding:1px 2px 1px 2px;outline:none;" ';
	var tempmenu='<li><div class="korniza"></div>\
<div class="elisthead" style="width:100%;">'+title+'</div>\
<div class="korniza"></div>';
	for (var i=0,allylength=alliance.length;i<allylength;i++){
		if (alliance[i][1]==Alliance){
			tempmenu+='<li><a id="questally" class="questally" title="'+alliance[i][0]+'" '+style+'>'+alliance[i][0]+'</a></li>';
		}
	}
   for (var i=0;i<allylength;i++){
		if (alliance[i][1]==Allies){
			tempmenu+='<li><a id="questally" class="questally" title="'+alliance[i][0]+'" '+style+'>'+alliance[i][0]+'</a></li>';
		}
	}
  	tempmenu+='<div class="elistfoot" style="width:'+parseInt(width+8)+'px;"/>';
	return '<ul>'+tempmenu+'</ul>';
}

function notesinit(){
	var masternode=$fork("Notesmain");
	var notes=GM_getValue("ikanotes","Empty.");
	var injct='<textarea id="sidenotes" cols="57" wrap="soft" rows="21" style="background:#ECCF8E;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584">'+notes+'</textarea><br>';
	var style=' style="display: inline;width:40px;cursor:pointer;margin:5px 5px 5px 5px;padding:2px 2px 2px 2px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;outline:none;" ';
	injct+='<br><a id="savenotes" class="savenotes" title="Click to save notes" '+style+'>'+SideBar_Search_Save+'</a>';
	masternode.innerHTML=injct;
}

function enemies(){
	var masternode=$fork("Enemiesmain");
	var style=' style="display: inline;width:40px;height:10px;cursor:pointer;margin:3px 0px 0px 0px;padding:0px 1px 1px 0px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;outline:none;" ';
	var style2=' style="width:24px;height:16px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;outline:none;" ';
	var style3=' style="width:16px;height:13px;cursor:pointer;margin:3px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;outline:none;" ';
	var enemieslist=GM_getValue("Enemies"+location.host,"").split('#,#');
	var injct='\
<div style="height:210px;  overflow: -moz-scrollbars-vertical; overflow-x: auto; overflow-y: auto;">\
<table id="enemiestable" cellpading=2 cellmargin=2 border=0><tbody>';
	for (var i=0,enlength=enemieslist.length-1;i<enlength;i++){
		injct+='<tr><td style="width:120px;border-bottom:brown dotted 1px;color:red;">'+enemieslist[i]+'</td><td><img id="questowner" class="questowner" title="'+enemieslist[i]+'" '+style2+' src="skin/layout/icon-status-small.gif"/></TD><TD><img '+style3+' class="delenemy" title="'+enemieslist[i]+'" src="skin/layout/notes_close.gif"/></td></tr>';
	}
	injct+='</tbody></table></div><br>';
	injct+='<input id="Enemiesname" type="text" title="Type in Enemy Name" value="" size="17%" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-color:#5D4C2F #C9A584 #ffffff #C9A584;border-style:double;"/><br>';
	injct+='<div style="width:100%;height:1px;padding:3px 3px 3px 3px;"/><a id="add" class="addenemy" title="Click to add a new Enemy " '+style+'>'+SideBar_Search_Add+'</a>';
	var style=' style="width:149px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;outline:none;border-bottom:brown dotted 1px" ';
	var tempmenu='<br><br><div class="elisthead" style="width:98%">'+SideBar_Search_EnemyAlliances+'</div>';
	for (var i=0,allength=alliance.length;i<allength;i++){
		if (alliance[i][1]==Enemies){
			tempmenu+='<center><a id="questally" class="questally" title="'+alliance[i][0]+'" style="margin:2px 3px 3px 0px;padding:1px 2px 1px 2px;outline:none;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;">'+alliance[i][0]+'</a></center>';
		}
	}
	masternode.innerHTML=injct+tempmenu;

}

function friends(){
	var masternode=$fork("Friendsmain");
	var style=' style="display: inline;width:32px;height:10px;cursor:pointer;margin:3px 3px 3px 3px;padding:0px 1px 1px 0px;border-color:#ffffff #C9A584 #5D4C2F #C9A584 ;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;outline:none;" ';
	var style2=' style="width:24px;height:16px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;outline:none;" ';
	var style3=' style="width:16px;height:13px;cursor:pointer;margin:3px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;outline:none;" ';
	var friendslist=GM_getValue("Friends"+location.host,"").split('#,#');
	var injct='\
<div style="height:210px;  overflow: -moz-scrollbars-vertical; overflow-x: auto; overflow-y: auto;">\
<table id="friendstable" cellpading=2 cellmargin=2 border=0><tbody>';
	for (var i=0,frlength=friendslist.length-1;i<frlength;i++){
		injct+='<tr><td style="width:120px;border-bottom:brown dotted 1px;color:green;">'+friendslist[i]+'</td><td><img id="questowner" class="questowner" title="'+friendslist[i]+'" '+style2+' src="skin/layout/icon-status-small.gif"/></TD><TD><img '+style3+' class="delfriend" title="'+friendslist[i]+'" src="skin/layout/notes_close.gif" /></td></tr>';
	}
	injct+='</tbody></table></div><br>';
	injct+='<input id="friendname" type="text" title="Type in Friend Name" value="" size="17%" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-color:#5D4C2F #C9A584 #ffffff #C9A584;border-style:double;border-width:1px;"/><br>';
	injct+='<div style="width:100%;height:1px;padding:3px 3px 3px 3px;"/><a id="add" class="addfriend" title="Click to add a new Friends " '+style+'>'+SideBar_Search_Add+'</a>';
	masternode.innerHTML=injct;
}

function iscrow(label,gmval,br){
	var out='';
	var configvalue=GM_getValue(gmval,'1');
	if (configvalue=='1') {
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="checkbox" checked name="'+gmval+'" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;"/></td>';
	}else{
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="checkbox" name="'+gmval+'" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;"/></td>';
	}
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out;
}

function istrow(label,sz,gmval,defval,br,title){
	var out='';
	if (title) var tle=' Title="'+title+'" '
		else var tle='';

	var configvalue=GM_getValue(gmval,defval);
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="text" value="'+configvalue+'" size="'+sz+'" name="'+gmval+'" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out;
}
function istrowttx(label,sz,gmval,defval,br,title){
	var out='';
	if (title) var tle=' Title="'+title+'" '
		else var tle='';

	var configvalue=GM_getValue(gmval,defval);
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td colspan=3 style="padding:10px 10px 10px 10px;"><input type="text" value="'+configvalue+'" size="'+sz+'" name="'+gmval+'" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out;
}

function istrowex(label,sz,gmval,defval1,defval2,br,title){
	var out='';
	if (title) var tle=' Title="'+title+'" '
		else var tle='';

	var configvalue1=GM_getValue(gmval+'L',defval1);
	var configvalue2=GM_getValue(gmval+'H',defval2);
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"> '+SideBar_Search_Between+' <input type="text" value="'+configvalue1+'" size="'+sz+'" name="'+gmval+'L" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/> '+SideBar_Search_And+' <input type="text" value="'+configvalue2+'" size="'+sz+'" name="'+gmval+'H" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out;
}

function isbrow(label,cls,title,br){
	var out='<td style="padding:10px 10px 10px 10px;"><input type="button" value="'+label+'" name="'+label+'" class="'+cls+'" style="cursor:pointer;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out;
}
function settings(){
	var masternode = $fork("Settingsmain");
	masternode.innerHTML += "<center><div id='SettingsCont' style='width:100%;height:100%;font-weight:bold;'><br><br>Move your mouse over here to show the settings.<br>";
	masternode.innerHTML += "It has been done this way to improve perfomance.<br><br></div>";
}

function settingscont(){
	var settingsnode = $fork("ikacoresettings");
	if (!settingsnode) {
		var masternode = $fork("Settingsmain");
		masternode.innerHTML = '\
<div id="ikacoresettings" style="height:280px;cursor:default;overflow: -moz-scrollbars-vertical; overflow-x: none; overflow-y: auto;border-bottom:1px solid #ffffff;">\
<table id="settingstable" class="table01">\
<thead><tr><td colspan=4><h3><b><u>Side Bar Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow(SideBar_Search, 'SideBarSearch') +
		iscrow(SideBar_Notes, 'SideBarNotes', 1) +
		iscrow(SideBar_Allies, 'SideBarAllies') +
		iscrow(SideBar_Enemies, 'SideBarEnemies', 1) +
		iscrow(SideBar_Friends, 'SideBarFriends') +
		iscrow(alliancefullnm, 'SideBarTools') +
		iscrow(SideBar_Chat, 'SideBarChat') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Buildings Upgrade hint</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		'<td colspan=4>If you have already discovered the upgrades below, please enable them so the building upgrade hint works correctly.</td></tr><tr style="border-bottom:1px dotted #E4B873">'+
		iscrow("Show Goods Needed for Upgrade", location.host+'.CityBuildingUpGoods') +
		iscrow("Pulley", location.host+'.pulley',1) +
		iscrow('Geometry', location.host+'.geometry') +
		iscrow("Spiritual Level", location.host+'.spiritlevel',1) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Spy Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrow('Spy wave Delay (in milisec, 1000 ms=1 sec)', 4, 'BashDelay', 2000) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Transporter</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Transporter', 'TransporterShow') +
		iscrow('Extended View', 'TransporterViewExtended',1) +
		iscrow('Production info and bars in current city', 'TransporterProductionBars') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>City View Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Building Levels', 'CityBuildingLevels',1) +
		iscrow('Show City Troops', 'ShowCityTroops') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Island View Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">\
<td colspan=4>Colors can be defined as strings like: red, lightyellow <br>\
or as hexadecimal like #rrggbb <br>\
for example #800000 (darkred).<td></tr>' +
		istrow('Alliance Color ', 4, 'AllianceColor', 'blue') +
		istrow('No Alliance Color ', 4, 'NoAllianceColor', 'purple', 1) +
		istrow('Allies Color ', 4, 'AlliesColor', 'cyan') +
		istrow('Enemies Color ', 4, 'EnemiesColor', 'red', 1) +
		iscrow('City/Resource Levels', 'IslandLevels', 1) +
		iscrow('Toggle Buttons', 'IslandToggleButtons') +
		iscrow('City/Resource Levels', 'IslandLevels', 1) +
		iscrow('Player Names under Cities', 'IslandPlayerNames') +
		iscrow('Text Effects for Inactives<br> and Players on Vacation', 'IslandInVac', 1) +
		iscrow('Make Inactives text blink', 'IslandInactiveBlink') +
		iscrow('Show Highlight Legend', 'IslandLegend', 1) +
		iscrow('Highlight Cities based<br> on Alliance', 'IslandHighlight') +
		iscrow('Heart next to<br> Friends Cities', 'IslandFriends', 1) +
		iscrow('Icon next to<br> Enemies Cities', 'IslandEnemies') +
		iscrow('Icon next to Cities <br> with Spies', 'IslandSpies', 1) +
		iscrow('Icon next to Cities <br> with signed Cultural Treaty.', 'IslandCultTreaties') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Messsages View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Check treaty buttons', 'MessageCheckTreaties') +
		iscrow('Find player Cities button', 'MessagePlayerSearch') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Embassy View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Check treaty buttons', 'EmbassyCheckTreaties') +
		iscrow('Find player Cities button', 'EmbassyPlayerSearch', 1) +
		iscrow('Get Military scores from ika-core', 'EmbassyGetMilitary') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Highscore View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Find Alliance Cities Button', 'HighscoreAllianceSearch') +
		iscrow('Find Player Cities Button', 'HighscorePlayerSearch', 1) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Chat Sidebar</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrow('Width', 3, 'ChatWidth', 1009) +
		istrow('Height', 3, 'ChatHeight', 400, 1) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Alliance Message Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrowttx('Signature(write #br# to change row)', 20, 'Signature', '', 1) +
		iscrow('Ika-core links and smilies transformation', 'FormatMessages') +
		'</tr></tbody></table></div>\
<div style="width:100%;height:1px;padding:1px 0px 0px 0px;background:#C9A584"/>\
<div style="width:100%;height:1px;padding:1px 0px 0px 0px;background:#5D4C2F"/>\
<div style="width:100%;height:5px;padding:5px 5px 5px 5px;"/>\
<a id="savesettings" class="savesettings" title="Click to save settings" style="display: inline;width:40px;height:10px;cursor:pointer;margin:0px 3px 0px 3px;padding:0px 1px 1px 0px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;outline:none;">' +
		SideBar_Search_Save +
		'</a>';
	}
}
function search(){
	var masternode=$fork("Searchmain");
	masternode.innerHTML+='\
<div id="ikasearch" style="cursor:default">\
<table id="searchtable" class="table01" width="100%">\
<thead><tr>\
<td style="font-weight:600;font-size:12px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-right:#C9A584 solid 1px;padding:3px 3px 3px 3px;">'+SideBar_Search_QuickSearch+'</td>\
<td style="font-weight:0;font-size:12px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:gray;border-right:#C9A584 solid 1px;border-bottom:#C9A584 solid 1px;padding:3px 3px 3px 3px;">'+SideBar_Search_AdvancedSearch+'</td>\
<td style="font-weight:0;font-size:12px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:gray;border-right:#C9A584 solid 1px;border-bottom:#C9A584 solid 1px;padding:3px 3px 3px 3px;">Island Search</td>\
</tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873"><td colspan="3">\
<div id="mainsearch"><table width="100%"><tr>'
+istrow(SideBar_Search_Player,12,'SearchPlayer','',1,"Use the '%' as a Wildcard, example: pa% will fetch paul,pauline etc")
+istrow(SideBar_Search_City,12,'SearchCity','',1,"Use the '%' as a Wildcard, example: Ath% will fetch Athens, etc")+'\
<tr><td style="padding:2px 0px 2px 4px;">'+SideBar_Search_PlayerStatus+'</td>\
<td style="padding:10px 10px 10px 10px;">\
<select id="SearchStatus" name="SearchStatus" title="Select the Player Status" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584">\
	<option Title="Player Status:All" value="%">'+SideBar_Search_PlayerAll+'</option>\
	<option Title="Player Status:Unknown" value="-1">'+SideBar_Search_PlayerUnknown+'</option>\
	<option Title="Player Status:Normal" value="0">'+SideBar_Search_PlayerNormal+'</option>\
	<option Title="Player Status:Vacation" value="1">'+SideBar_Search_PlayerVacation+'</option>\
	<option Title="Player Status:Inactive" value="2">'+SideBar_Search_PlayerInactive+'</option>\
</select></td></tr>'
+istrow(SideBar_Search_Alliance,1,'SearchAlliance','',1,"Use the '%' as a Wildcard, example: A% will fetch all starting with A, %S will get all ending with S, use the - (minus) for no alliance")
+istrow(SideBar_Search_Radius,1,'SearchRadius','',1,"Leave blank for any radius, must be a number. Specifies the distance of your results. example: 2 will show only 2 islands away.")
+istrowex(SideBar_Search_TownHallLevel,5,'SearchTownHallLevel',0,32,1,"Type in low and high limit.")
+istrowex(SideBar_Search_MilitaryScore,5,'SearchMilitaryScore',0,99999,1,"Type in low and high limit.")
+istrowex(SideBar_Search_GoldScore,8,'SearchGoldScore',0,99999999,1,"Type in low and high limit.")
+isbrow(SideBar_Search_Clear,'SearchMainQuickClear',"Click to clear Search Criteria")
+isbrow(SideBar_Search_Search,'SearchMainQuickSearch',"Click to start Search")
+'</tr></table></div>\
<div id="advanced" style="visibility:hidden"><table width="100%"><tr>'
+'</tr></table></div>\
</td></tbody></table></div>';
/*<hr>\
<h3><b><u>Advanced Search</u></b></h3>\
Radius&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
X&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Y&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Island&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Island resource type&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Townhall Level&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Limit results&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Player Status&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
<hr>\
</div>\
';*/
}

function Highscores(){
	var magic=XX('//select[@name="highscoreType"]',XPFirst);
	if (magic){
		var magic=XX('//td[@class="allytag"]',XPFirst);
		if (magic) {
		if (testvar('HighscorePlayerSearch'))
			forall('.//td[@class="name"]',$fork('mainview') , function(obj,i){;
				btn(XX('.//td[@class="action"]',XPFirst,obj.parentNode),'questowner'+i,'questowner','?',obj.innerHTML,showplayernfo,5);});
		if (testvar('HighscoreAllianceSearch'))
			forall('.//td[@class="allytag"]', null, function(obj, i){
				btn(obj, 'questally' + i, 'questally', '?', obj.textContent, showplayernfo, 5);
			});
		} else {
		if (testvar('HighscoreAllianceSearch'))
		forall('.//td[@class="name"]',$fork('mainview') , function(obj,i){;
				var ally=obj.textContent.split('(')[1];
					ally=ally.split(')')[0];
				btn(XX('.//td[@class="action"]',XPFirst,obj.parentNode),'questally'+i,'questally','?',ally,showplayernfo,5);});
		}
	}
}

function focus(direction){
    var all = getCityLinks();
    var now = unsafeWindow.selectedCity;
    var cur = $X('id("cityLocation' + now + '")/a') || all[all.length - 1];
    if (all.length) {
        now = all.map(function(a){
            return a.id;
        }).indexOf(cur.id);
        click(all[(now + direction + all.length * 3) % all.length]);
    }
}

function getCityLinks(){
    return $x('id("cities")/li[contains(@class,"city level")]/a');
}

function keyHandler(evt){

    function invoke(a){
        a = $X('id("actions")/ul[@class="cityactions"]/li[@class="' + a + '"]/a');
        return function(){
            if (a && a.href)
                location.href = a.href;
        };
    }

    function counterClockwise(){
        focus(-1);
    }
    function clockwise(){
        focus(1);
    }

    function tab(){
        if (!evt.altKey && !evt.ctrlKey && !evt.metaKey)
            focus(evt.shiftKey ? -1 : 1);
    }

    function invoketogo(a){
        return function(){
            location.href = a;
        };
    }
    var srcEl = mapevt(evt);
    if (srcEl.tagName=="HTML") {
	    var keys = {
	        "\t": tab,
	        j: counterClockwise,
	        k: clockwise,
	        c: invoke("diplomacy"),
	        t: invoke("transport"),
	        p: invoke("plunder"),
	        b: invoke("blockade"),
	        s: invoke("espionage"),
	        i: invoketogo("http://" + location.host + "/index.php?view=tradeAdvisor&oldView=militaryAdvisorCombatReports"),
	        m: invoketogo("http://" + location.host + "/index.php?view=militaryAdvisorCombatReports&oldView=militaryAdvisorCombatReports"),
	        d: invoketogo("http://" + location.host + "/index.php?view=diplomacyAdvisor&oldView=tradeAdvisor"),
	        n: invoketogo("http://" + location.host + "/index.php?view=merchantNavy")
	    };

	    var action = keys[String.fromCharCode(evt.keyCode || evt.charCode)];
	    if (action && evt.ctrlKey==false && evt.altKey==false) {
	        action();
	    }
	}
}

function formattime(timestamp){
			maxDigits = 2;
			zerofill = false;
			var timeunits = [];
			timeunits['day'] = 60 * 60 * 24;
			timeunits['hour'] = 60 * 60;
			timeunits['minute'] = 60;
			timeunits['second'] = 1;
			timestamp = Math.floor(timestamp / 1000);
			var timestring = "";
			for (var k in timeunits) {
				var nv = Math.floor(timestamp / timeunits[k]);
				if (maxDigits > 0 && (nv > 0 || (zerofill && timestring != ""))) {
					timestamp = timestamp - nv * timeunits[k];
					if (timestring != "") {
						timestring += " ";
						if (nv == 0) {
							nv = "00";
						}
					}
					timestring += nv + LocalizationStrings['timeunits']['short'][k];
					maxDigits--;
				}
			}
			return timestring;
}

function Transporter(){

	if (GM_getValue('TransporterShow', '1') != '1') {
		GM_setValue(location.host + 'TransporterStore', '!');
		return;
	}
	function TransporterOver(){$(DestinationCitiesTransporter).show()}
	function TransporterHide(){$(DestinationCitiesTransporter).hide()}
	var pnode = $fork('breadcrumbs');
	var TransporterNode = node('div', 'IkaCoreTransporter', 'IkaCoreTransporter', 'float:left;position:relative;top:-2px;z-index:599;', '<img height="22" width="28" alt="Transport" title="Transport Goods to one of your Cities" src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif"/>-');
	var DestinationCitiesTransporter = node('div', 'DestinationCitiesTransporter', 'DestinationCitiesTransporter', 'position:absolute;left:-10px;top:1px;display:none;width:auto;background:#F6EBBC none repeat scroll 0 0;color:#542C0F;border-color:#ffffff #5D4C2F #000000 #C9A584;border-style:double;border-width:3px;','<div id="tbltrans"></div><iframe id="transi" width="732" scrolling="NO" height="91" style="border: medium none ;" src="http://www.ika-core.org/ikariam.html"></iframe></div>');
	TransporterNode.appendChild(DestinationCitiesTransporter);
	pnode.insertBefore(TransporterNode, pnode.firstChild);
	TransporterNode.addEventListener('mouseover', TransporterOver, false);
	TransporterNode.addEventListener('mouseout', TransporterHide, false);

	transtimer();setInterval(transtimer,30000);
	function transtimer(){
	var citySelect = $fork("citySelect");
	var htmls = "";
	restransicons = [[0, 'wood', '/skin/resources/icon_wood.gif'], [1, 'wine', '/skin/resources/icon_wine.gif'], [2, 'marble', '/skin/resources/icon_marble.gif'], [3, 'crystal', '/skin/resources/icon_glass.gif'], [4, 'sulfur', '/skin/resources/icon_sulfur.gif']];
	function TranslateResource(res){
		for (var j = 0; j < 5; j++) {
			if (res == LocalizationStrings['resources'][j])
				return restransicons[j][2];
		}
	}
	if (GM_getValue('TransporterViewExtended', '1') == '1') {
		var curtime = new Date();
		function parsegoods(gd, map){
			if (!map['startdate'])
				map['startdate'] = Number(curtime);
			if (gd.limit)
				map['limit'] = gd.limit;
			if (gd.production)
				map['production'] = gd.production;
			if (gd.spendings)
				map['spendings'] = gd.spendings;
			if (gd.valueElem.id)
				map['valueElem'] = gd.valueElem.id;
			return map;
		}
		var TransporterStore = [];
		var buf = GM_getValue(location.host + 'TransporterStore', '!');

		if (buf != '!') {
			try{
				TransporterStore = unserialize(buf);
			} catch(e){
				GM_setValue(location.host + 'TransporterStore', '!');
			}
		}

		if (TransporterStore[getcurcityid()]){
			if (TransporterStore[getcurcityid()]['tmpCnt'])
				var tmpCntbuf=TransporterStore[getcurcityid()]['tmpCnt'];
			if (TransporterStore[getcurcityid()]['wineCounter'])
			if (TransporterStore[getcurcityid()]['wineCounter']['wineModifier'])
				var wmbuf = TransporterStore[getcurcityid()]['wineCounter']['wineModifier'];

		}
		TransporterStore[getcurcityid()] = IKARIAM['currentCity'];
		if (woodCounter) {
			TransporterStore[getcurcityid()]['woodCounter'] = [];
			parsegoods(woodCounter, TransporterStore[getcurcityid()]['woodCounter']);
		}
		if (wineCounter) {
			TransporterStore[getcurcityid()]['wineCounter'] = [];
			parsegoods(wineCounter, TransporterStore[getcurcityid()]['wineCounter']);
			if (getbody.id == 'city') {
				var wm = Number(parsemodifiers('vineyard'));
				TransporterStore[getcurcityid()]['wineCounter']['wineModifier'] = wm;
			} else if (wmbuf)
					TransporterStore[getcurcityid()]['wineCounter']['wineModifier'] = wmbuf;
		}
		if (tradegoodCounter) {
			TransporterStore[getcurcityid()]['tradegoodCounter'] = [];
			parsegoods(tradegoodCounter, TransporterStore[getcurcityid()]['tradegoodCounter']);
		}
		if (tmpCnt) {
			TransporterStore[getcurcityid()]['tmpCnt'] = tmpCnt.enddate;
		} else if (tmpCntbuf) {
			TransporterStore[getcurcityid()]['tmpCnt'] = tmpCntbuf;
		}

		try{
			GM_setValue(location.host + 'TransporterStore', serialize(TransporterStore));
		} catch(e){
			GM_setValue(location.host + 'TransporterStore', '!');
			return;
		}

		function regcounter(config, elem){
			if (config.production) {
				config.currentRes = parseInt(config.available + config.production * Math.floor((curtime - config.startdate) / 1000));
			}
			else {
				config.currentRes = config.available;
			}
			if (!config.spendings) return config.currentRes;
			for (var i = config.spendings.length - 1; i >= 0; --i) {
				config.currentRes = parseInt(config.currentRes - config.spendings[i]['amount'] * Math.floor((curtime - config.startdate) / 1000 / config.spendings[i]['tickInterval']) * config.spendings[i]['tickInterval'] / 3600);
			}
			if (config.currentRes < config.limit[0])
				config.currentRes = config.limit[0];
			if (config.currentRes > config.limit[1])
				config.currentRes = config.limit[1];
			return config.currentRes;
		}

		function getperc(capacity, current, cl, bcl, h, bo){
			if (!bo)
				bo = 2;
			if (!h)
				h = 4;
			if (!bcl)
				bcl = 'white';
			if (!cl)
				cl = 'brown';
			var b = parseInt(100 / (capacity / current));
			var a = 100 - b;
			var htmls;
			var col = cl;
			if (b > 75) {
				col = 'red'
			}
			htmls = '<table style="width: 100%;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;border:white outset ' + bo + 'px" class="dummy"><tr>\
		<td style="background-color:' +
			col +
			';height:' +
			h +
			'px;opacity:0.6;border-right:1px solid black" width="' +
			b +
			'%"/>\
		<td style="background-color:' +
			bcl +
			';height:' +
			h +
			'px;opacity:0.6;" width="' +
			a +
			'%"/>\
		</tr></table>';
			return htmls;
		}

		//htmls += '<div style="background:#ECCF8E url(skin/layout/notes_top.gif) repeat-x scroll left 50%;width:100%;height:18px;text-align:center;line-heigth:18px;font-size:11px;font-weight:bold;">Transporter</div>';
		htmls += '<table class="lal" style="display:block;width:728px;clear:both;margin:2px 2px 2px 2px;padding:0px 0px 0px 0px;text-align:center;">';
		htmls += '<thead><tr style="background:#ECCF8E url(skin/layout/notes_top.gif) repeat-x scroll left 50%;"><th style="width:200px;border:dotted 1px lightgray;text-align:center;"><i>City</i></th><th style="width:60px;border:dotted 1px lightgray;text-align:center;"><i>Build</i></th>';
		for (var j = 0; j < 5; j++) {
			htmls += '<th colspan=2 style="width:120px;border:dotted 1px lightgray;text-align:center;"><img src="' + restransicons[j][2] + '" width=20 height=14/></td>';
		}
		htmls += '<th style="width:70px;border:dotted 1px lightgray;text-align:center;"><i>Action</i></th></tr></thead>';
		var woodprodtot = 0;
		var marbleprodtot = 0;
		var sulfurprodtot = 0;
		var crystalprodtot = 0;
		var wineprodtot = 0;
		var woodtot = 0;
		var marbletot = 0;
		var sulfurtot = 0;
		var crystaltot = 0;
		var winetot = 0;
		for (var i = 0,citylength = citySelect.length; i < citylength; i++) {
		var alarm=false;
			try {
				var citytrans = TransporterStore[citySelect[i].value];
				var bimg = TranslateResource(trim(citySelect[i].title.split(':')[1]));
				htmls += '<tr style="border:dotted 1px lightgray;' + (citySelect[i].selected ? 'background:#f9e5c4;' : '') + '"><td class="trancitylink' + (citySelect[i].selected ? 'i' : '') + '" style="color:#542C0F;padding:5px 5px 5px 5px;text-align:left;"><a class="linki" href="#" onclick="document.getElementById(\'citySelect\').childNodes[' + (i + 1) + '].selected=true;document.getElementById(\'citySelect\').childNodes[' + (i + 1) + '].form.submit();" style="color:#523524"><img src="' + bimg + '" width="14" height="10" />' + citySelect[i].text + '</a></td>';
				if (citytrans) {
					if (citytrans['tmpCnt']) {
						var tm = citytrans['tmpCnt'] - curtime;
					}
					else {
						var tm = -1;
					}
					if (tm > 0) {
						htmls += '<td style="border:dotted 1px lightgray;color:#542C0F;padding:0px 5px 0px 5px;font-size:9px;">' + formattime(tm) + '</td>';
					}
					else {
						htmls += '<td style="border:dotted 1px lightgray;"></td>';
					}
				}
				else {
					htmls += '<td style="border:dotted 1px lightgray;"></td>';
				}

				for (var j = 0; j < 5; j++) {
					var resourcenm = restransicons[j][1];
					var respointer = citySelect[i].value + resourcenm;
					if (citytrans) {
						var productionstr = '';
						var tradenr = 0;
						var trade = citytrans['tradegoodCounter'];

						switch (resourcenm) {
							case 'wood':
								woodtot += citytrans['resources'][resourcenm];
								var wood = citytrans['woodCounter'];
								if (wood) {
									tradenr = parseInt(wood['production'] * 3600);
									woodprodtot += tradenr?tradenr:0;
									wood['available'] = citytrans['resources'][resourcenm];
									citytrans['resources'][resourcenm] = regcounter(wood, respointer);
								}
								break;
							case 'wine':
								winetot += citytrans['resources'][resourcenm];
								if (trade) {
									if (trade['valueElem'] == 'value_wine') {
										tradenr = parseInt(trade['production'] * 3600) - parseInt(trade['spendings'][0]['amount']);
										trade['available'] = citytrans['resources'][resourcenm];
										citytrans['resources'][resourcenm] = regcounter(trade, respointer);
									}
								}
								var expe = citytrans['wineCounter'];
								if (expe) {
									tradenr -= parseInt(expe['spendings'][0]['amount'] * (expe['wineModifier'] ? expe['wineModifier'] : 1));
									expe['available'] = citytrans['resources'][resourcenm];
									citytrans['resources'][resourcenm] = regcounter(expe, respointer);
								}
								wineprodtot += tradenr?tradenr:0;

								break;
							case 'marble':
								marbletot += citytrans['resources'][resourcenm];
								if (trade) {
									if (trade['valueElem'] == 'value_marble') {
										tradenr = parseInt(trade['production'] * 3600);
										trade['available'] = citytrans['resources'][resourcenm];
										citytrans['resources'][resourcenm] = regcounter(trade, respointer);
									}
								}
								marbleprodtot += tradenr?tradenr:0;
								break;
							case 'crystal':
								crystaltot += citytrans['resources'][resourcenm];
								if (trade) {
									if (trade['valueElem'] == 'value_crystal') {
										tradenr = parseInt(trade['production'] * 3600);
										trade['available'] = citytrans['resources'][resourcenm];
										citytrans['resources'][resourcenm] = regcounter(trade, respointer);
									}
								}
								crystalprodtot += tradenr?tradenr:0;
								break;
							case 'sulfur':
								sulfurtot += citytrans['resources'][resourcenm];
								if (trade) {
									if (trade['valueElem'] == 'value_sulfur') {
										tradenr = parseInt(trade['production'] * 3600);
										trade['available'] = citytrans['resources'][resourcenm];
										citytrans['resources'][resourcenm] = regcounter(trade, respointer);
									}
								}
								sulfurprodtot += tradenr?tradenr:0;
								break;
						}
						if (tradenr > 0) {
							productionstr = '+' + tradenr?tradenr:0;
						}
						else
							if (tradenr != 0) {
								var calc = parseInt(citytrans['resources'][resourcenm] / Math.abs(tradenr) * 3600000);
								if (calc < 3600000 * 48) alarm=true;
								productionstr = '<span style="' + (alarm ? 'color:red;' : '') + 'width:35px;">' + formattime(calc) + '</span>';
							}
						if (citySelect[i].selected && GM_getValue('TransporterProductionBars', '1') == '1') {
							GM_addStyle("#container ul.resources li{line-height:14px}");
							if (!$fork('prod_' + resourcenm)) {
								var dummyn = node('td', 'prod_' + resourcenm, 'dummy', 'position:absolute;width:50px;bottom:-9px;left:30px;color:#542C0F;font-size:8px;cursor:pointer;margin:0px 3px 0px 3px;', (tradenr != 0 ? '(' + productionstr + ')' : '') + '<div style="position:relative;bottom:16px;opacity:0.7;">' + getperc(citytrans['maxCapacity'][resourcenm], citytrans['resources'][resourcenm]) + '</div>', 'Production');
								$fork('value_' + resourcenm).parentNode.appendChild(dummyn);
							}
						}
						htmls += '<td colspan="2" style="border:dotted 1px lightgray;color:#542C0F;padding:0px 2px;"><table cellpadding="0" cellspacing="0" border="0" style="width:100%;'+(alarm ? 'background-color:#ffcccc':'')+'"><tr><td style="border-right:ridge 1px yellow;color:#542C0F;padding:0px 5px;font-size:9px;text-align:center;width:50px"><span id="' + respointer + '">' + fmtNumber(citytrans['resources'][resourcenm]) + '</span></td><td style="color:#542C0F;padding:0px 5px;font-size:9px;text-align:center;width:50px">' + productionstr + '</td></tr><td colspan="2" style="padding:0 5px;">'+ getperc(citytrans['maxCapacity'][resourcenm], citytrans['resources'][resourcenm]) + '</td></tr></table></td>';
						alarm=false;
					}
					else {
						htmls += '<td style="border:dotted 1px lightgray;color:#542C0F;padding:0px 5px 0px 5px;">?</td><td>?</td>';
					}

				}
				if (!citySelect[i].selected) {
					htmls += '<td><a href="index.php?view=transport&amp;destinationCityId=' + citySelect[i].value + '" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Transport Goods to one of your Cities" src="skin/actions/transport.gif" style="float:right"/></a>\
							<a href="index.php?view=deployment&deploymentType=fleet&destinationCityId=' +
					citySelect[i].value +
					'" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Fleet to one of your Cities" src="skin/actions/move_fleet.gif" style="float:right"/></a>\
							<a href="index.php?view=deployment&deploymentType=army&destinationCityId=' +
					citySelect[i].value +
					'" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Army to one of your Cities" src="skin/actions/move_army.gif" style="float:right"/></a></td></tr>';
				}
				else {
					htmls += '<td style="opacity:0.4"><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Transport Goods to one of your Cities" src="skin/actions/transport.gif" style="float:right"/></a><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Fleet to one of your Cities" src="skin/actions/move_fleet.gif" style="float:right"/></a><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Army to one of your Cities" src="skin/actions/move_army.gif" style="float:right"/></a></td></tr>';
				}
			} catch(e) {}
		}
		htmls += '<tr style="background:#e0bf7b;font-size:9px;"><td style="border:dotted 1px lightgray;color:#542C0F;font-size:11px;"><i>Totals</i></td style="border:dotted 1px lightgray;color:#542C0F;"><td style="border:dotted 1px lightgray;color:#542C0F;"></td><td style="border:dotted 1px lightgray;color:#542C0F;">' + fmtNumber(parseInt(woodtot)) + '</td><td style="border:dotted 1px lightgray;color:#542C0F;">' + fmtNumber(woodprodtot) + '</td><td style="border:dotted 1px lightgray;color:#542C0F;">' + fmtNumber(parseInt(winetot)) + '</td><td style="border:dotted 1px lightgray;color:#542C0F;">' + fmtNumber(wineprodtot) + '</td><td style="border:dotted 1px lightgray;color:#542C0F;">' + fmtNumber(parseInt(marbletot)) + '</td><td style="border:dotted 1px lightgray;color:#542C0F;">' + fmtNumber(marbleprodtot) + '</td><td style="border:dotted 1px lightgray;color:#542C0F;">' + fmtNumber(parseInt(crystaltot)) + '</td><td style="border:dotted 1px lightgray;color:#542C0F;">' + fmtNumber(crystalprodtot) + '</td><td style="border:dotted 1px lightgray;color:#542C0F;">' + fmtNumber(parseInt(sulfurtot)) + '</td><td style="border:dotted 1px lightgray;color:#542C0F;">' + fmtNumber(sulfurprodtot) + '</td><td style="border:dotted 1px lightgray;color:#542C0F;"></td></tr></table>';
	} else {
		/*    Simple view here */
		htmls += '<div style="background:#ECCF8E url(skin/layout/notes_top.gif) repeat-x left 50%;width:100%;height:15px;text-align:center;line-heigth:15px;font-size:11px;font-weight:bold;">Transporter</div>';
		htmls += '<table class="lal" style="display:block;width:320px;clear:left;margin:2px 2px 2px 2px;padding:0px 0px 0px 0px;text-align:center;">';
		htmls += '<thead><tr style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0"><th style="width:245px;border:dotted 1px yellow;text-align:center;">City</th>';
		htmls += '<th style="width:90px;border:dotted 1px yellow;text-align:center;">Action</th></tr></thead>';
		for (var i = 0,citylength = citySelect.length; i < citylength; i++) {
			var bimg = TranslateResource(trim(citySelect[i].title.split(':')[1]));
			htmls += '<tr style="border:dotted 1px yellow;' + (citySelect[i].selected ? 'background:#f9e5c4;' : '') + '"><td style="color:#542C0F;padding:5px 5px 5px 5px;text-align:left;"><a class="linki" href="/index.php?view=city&id=' + citySelect[i].value + '" style="color:#523524"><img src="' + bimg + '" width=14 height=10/>' + citySelect[i].text + '</a></td>';
			if (!citySelect[i].selected) {
				htmls += '<td style="width:50px;"><a href="index.php?view=transport&amp;destinationCityId=' + citySelect[i].value + '" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Transport Goods to one of your Cities" src="skin/actions/transport.gif" style="float:right"/></a>\
						<a href="index.php?view=deployment&deploymentType=fleet&destinationCityId=' +
				citySelect[i].value +
				'" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Fleet to one of your Cities" src="skin/actions/move_fleet.gif" style="float:right"/></a>\
						<a href="index.php?view=deployment&deploymentType=army&destinationCityId=' +
				citySelect[i].value +
				'" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Army to one of your Cities" src="skin/actions/move_army.gif" style="float:right"/></a></td></tr>';
			}
			else {
				htmls += '<td style="opacity:0.4"><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Transport Goods to one of your Cities" src="skin/actions/transport.gif" style="float:right"/></a><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Fleet to one of your Cities" src="skin/actions/move_fleet.gif" style="float:right"/></a><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Army to one of your Cities" src="skin/actions/move_army.gif" style="float:right"/></a></td></tr>';
			}
		}
	}
	$fork("tbltrans").innerHTML = htmls;
	$('.trancitylink a').hover(
		function(){$(this).css('color','red').css('background-color','white')},
		function(){$(this).css('color','#523524').css('background-color','#F6EBBC')}
	);
	}
}
function findXY(obj){
	var curleft = curtop = 0;

	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
		while (obj = obj.offsetParent);
		return [curleft, curtop];
	}
}
function parsemodifiers(modi){
	var fc = 1.00;
	var nd=XX('//ul[@id="locations"]/li[contains(@class,"'+modi+'")]/a',XPFirst);
	if (nd){
		var lvl = nd.title.replace(/[^\d-]+/g, "");
		fc=1.00-lvl*0.01;
	}
	return fc;
}

function showcitytroops(){
	var Store=new function(){
		this.name='TroopsStoreCache';
		this.cityexpire=7200*1000;
		this.curtime=new Date().getTime();
		this.data=[];
		this.cleanstore=function(){
			try {
				GM_setValue(location.host + this.name, '');
			} catch(e){
				//alert('error cleaning store data');
			}
		}
		this.writestore=function(){
			try {
				GM_setValue(location.host + this.name, serialize(this.data));
				this.curcitydata=this.data[this.curcity];
			} catch(e){
				this.cleanstore();
				//alert('error writing store data');
			}
		}
		this.readstore=function(){
			try {
				this.data = unserialize(GM_getValue(location.host + this.name, '!'));
				if (this.data=='!') this.data=[];
				this.curcitydata=this.data[this.curcity];
			} catch(e){
				this.cleanstore();
				//alert('error reading store data');
			}
		}
		this.hasdata = function(){
			var a=serialize(this.data);
			if (a=='a:0:{}') {
				return false;
			} else {
				return true;
			}
		}
		this.curcity=Number(getcurcityid());
		this.curcityhasdata=function(){
			var a=serialize(this.data[this.curcity]);
			if (a=='N;') {
				return false;
			} else {
				return true;
			}
		}
		this.curcitydataexpired=function(){
			var a=this.data[this.curcity+'tm'];
			if (!a){
				return true;
			}
			if ((this.curtime-a)>this.cityexpire) {
				return true;
			} else {
				return false;
			}
		}
		this.maptroopdata=function(bufcitystore,text,tp){
			var buf = node('div', null, null, null, text);
			forall('//div[@class="content"]/table',buf , function(obj,i){
				var rows = obj.rows;
				var cellshead = rows[0].cells;

				var cells = rows[1].cells;
				for (var k = 0, ln=cells.length; k < ln; k++) {
					if (cellshead[k].childNodes[0]){
						bufcitystore[cellshead[k].title]=[parseInt(cells[k].textContent),cellshead[k].childNodes[0].src,tp];
					}
				}
			});
		}
		this.storecitytroops=function(city){
			var bufcitystore=[];
			get('http://' + location.host + '/index.php?view=cityMilitary-army&id=' + city, function(text){
				Store.maptroopdata(bufcitystore,text,'army');
				get('http://' + location.host + '/index.php?view=cityMilitary-fleet&id=' + city, function(text){
				Store.maptroopdata(bufcitystore,text,'fleet');
				Store.data[city]=bufcitystore;
				Store.data[city+'tm']=Store.curtime;
				Store.writestore();
				if (Store.curcity==city) Store.render();
				});
			});
		}
		this.storecurrentcitytroops=function(){
			this.storecitytroops(this.curcity);
		}
		this.init=function(){
			//this.cleanstore();
			this.readstore();
			this.render();
			if (!this.curcityhasdata()||this.curcitydataexpired()) {
				this.storecurrentcitytroops();
			}
		}
		this.render=function(){
			var maindiv = $fork('mainview');
			var CityArmy=$fork('CityArmy');
			if (!CityArmy) {
				CityArmy = node('div', 'CityArmy', 'CityArmy', null, null, 'Troops in City');
				maindiv.appendChild(CityArmy);
			}
			var htmls= '<ul>';
			var htmlsfl= '';
			for(var j in this.curcitydata){
				var item=this.curcitydata[j];
				if (item[0]>0){
					htmls+='<li class="sidetroops" title="'+j+'"><span class="before"></span><img src="'+item[1]+'">';
					htmls+=''+item[0]+'<span class="after"></span></li>';
				}
			}
			CityArmy.innerHTML =htmls+htmlsfl+'</ul>';
		}
	}
	Store.init();
}

function city(){
	var loc=$('ul#locations');
	if(GM_getValue(location.host+'.CityBuildingUpGoods','1')=='1'){
	var fac = 1.00;
	if (GM_getValue(location.host+'.pulley','1')=='1') fac -= 0.02;
	if (GM_getValue(location.host+'.geometry','1')=='1') fac -= 0.04;
	if (GM_getValue(location.host+'.spiritlevel','1')=='1') fac -= 0.08;

	var modi= {
		w: Number(parsemodifiers('carpentering')),
		M: Number(parsemodifiers('architect')),
		C: Number(parsemodifiers('optician')),
		W: Number(parsemodifiers('vineyard')),
		S: Number(parsemodifiers('fireworker'))
	}
	var posupd=[];
	forall('//ul[@id="locations"]/li[contains(@id,"position")]/a', null, function(obj,i){
				var currentstock=IKARIAM['currentCity']['resources'];
				var lvl = obj.title.replace(/[^\d-]+/g, "");
				var b = building[obj.parentNode.className];
				var htmls='';
				var nupgradeable=0;
				if (lvl.length>0&&b!='undefined'){
					//alert(rdb.dbcore.JSON.stringify(upgrade[b]))
					//alert(rdb.Select({},'upgrade',false)[b])
					var rdbSelect=rdb.Select({},'upgrade',false)[b];
					if(rdbSelect){
					var nextupgrade = rdbSelect[lvl];
					if (nextupgrade){
						for (var x in nextupgrade) {
							if (x != 't') {
								var k = parseInt((nextupgrade[x]*fac)*modi[x]);
								switch (x){
									case 'w':
										if(k>currentstock['wood']) nupgradeable++;
										break;
									case 'W':
										if(k>currentstock['wine']) nupgradeable++;
										break;
									case 'M':
										if(k>currentstock['marble']) nupgradeable++;
										break;
									case 'S':
										if(k>currentstock['sulfur']) nupgradeable++;
										break;
									case 'C':
										if(k>currentstock['crystal']) nupgradeable++;
										break;
								}
							}
							else {
								var k = nextupgrade[x];
							}
							var thing=resmap[x];
							htmls+='<img src="'+thing+'" style="width:12px;height:9px">'+k+'&nbsp;&nbsp;&nbsp;';
						}
					} else {
						htmls+='Building Level not in List;';nupgradeable=1;
					}
					var as=node('a','upgradehover'+i,'upgradehover',"width:auto;height:12px;top:"+(findXY(obj)[1]+70)+"px;left:"+(findXY(obj)[0]-30)+"px;visibility:hidden;"+(nupgradeable==0?'background:blue':''),htmls+(nupgradeable==0?'upgrade':''));
					getbody.appendChild(as);
				obj.parentNode.addEventListener('mouseover', function(){
					$fork('upgradehover'+i).style.visibility = "visible";
				}, false);
				obj.parentNode.addEventListener('mouseout', function(){
					$fork('upgradehover'+i).style.visibility = "hidden";
				}, false);
				posupd[i]=nupgradeable;
				}
				}
			});
}
	if(GM_getValue('CityBuildingLevels','1')=='1'){
		$('li[id*="position"]',loc).each(function(i){
			var l=$('a',this).text().replace(/[^\d-]+/g, "");
			var b=$(this).attr('className');
			if (l.length>0&&b.length>0){
				$(this).append('<a id="blevels" class="blevels" style="width: 12px; height: 12px; top: 10px; left: 25px;'+(posupd[i]==0?'background:blue;':'')+'">'+l+'</a>');
			}
		});
	};
	if (GM_getValue('ShowCityTroops', '1') == '1') showcitytroops();
}

function branchOffice(){
	var table=XX('//table[@class="tablekontor"]', XPList).snapshotItem(1);
	if (table) {
		forallrows(table, 1, function(tbl,i){
			var nm=tbl.rows[i].cells[0].textContent.split('(')[1];
			if (nm) {
				nm=nm.split(')')[0];
				btn(tbl.rows[i].cells[tbl.rows[i].cells.length-1],'questowner'+i,'questowner','?',nm,showplayernfo,5);
			}
		});
	}
}

function addspc(v,l){
var spc="__________________________________________________________________________________________";return spc.substr(1,v-l.length);
}

function convertbattlereports(){
	var hr="-------------------------------------------------------------------------------------~~-.";
	var un={"210": "`ramsea","213":"`ballista","211":"`flame","214":"`catapultsea","216":"`paddle","215":"`mortarsea","212":"`diving","301":"`slinger","302":"`swordsman","303":"`phalanx","313":"`archer","304":"`marksman","312":"`gyrocopter","308":"`steamgiant","309":"`bombardier","307":"`ram","306":"`catapult","305":"`mortar","311":"`doctor","310":"`cook","315":"`spearmen","316":"`barbarian","314":"`wall"};
	var br="<br>";var nu="-";
	var overview="";var units=[];var unitsattacker=[];var unitsdefendor=[];
	
	units.push('');
	$('#troopsReport .content table.overview thead tr th div').each(function(index) {
		units.push(un[$(this).attr('class').replace("army s","")]);
	});
	
	unitsdefendor.push($('#troopsReport .content table.overview tr.textgreen td.firstCol:first').text());
	$('#troopsReport .content table.overview tr.textgreen td.numbers').each(function(index) {
		var a=trim($(this).text());unitsdefendor.push(a=="-"?nu:a);
	});
	unitsattacker.push($('#troopsReport .content table.overview tr.textred td.firstCol:first').text());
	
	$('#troopsReport .content table.overview tr.textred td.numbers').each(function(index) {
		var a=trim($(this).text());unitsattacker.push(a=="-"?nu:a);
	});
	$.each(units,function(index, value) { 
		if (!unitsattacker[index]){unitsattacker[index]=nu;}
		if (!unitsdefendor[index]){unitsdefendor[index]=nu;}
		overview+=value+addspc(13,value)+unitsattacker[index]+addspc(13,unitsattacker[index])+unitsdefendor[index]+br;
	});
	var bmes=$('#troopsReport .contentBox01h h3.header').text()+br+hr+br+$('#troopsReport .content .attacker').text().replace(/\s\s/g,"").replace(/\:/g,":<br>")+br+br+$('#troopsReport .content .defender').text().replace(/\s\s/g,"").replace(/\:/g,":<br>")+br+br+$('#troopsReport .content h5').text()+br+hr+br+overview+hr+br+$('#troopsReport .contentBox01h .result').html().replace(/(\<br>|\<\/li>)/g,"##").replace(/\<\/div>/g,"####").replace(/\<ul/g,"##<ul").replace(/(\s\s|<[a-zA-Z\/][^>]*>)/g,"").replace(/##/g,"<br>")+hr;
	bmes=bmes.replace(/\<br\>/g,"\n");
	$("div#troopsReport").append('Click on the area below to select all the text and then press CTRL+C to copy it to you clipboard<textarea id="txtsel" rows=10 cols=1 style="width:100%;font:10px monospace;">'+bmes+'</textarea>');
	$("#txtsel").click(function(){this.focus();this.select();});
	var rmail=GM_getValue('RoundMail'+location.host);
	if (rmail){
		rmail=rmail.split('#~#');
		$("div#troopsReport").append('<br><br><div><a id="ikbut" class="button" href="'+rmail[0]+'" title="'+rmail[1]+'" style="font-size:14px;float:right">'+rmail[1]+'<span style="color:red;font-size:7px">ika-core</span></a>click to send this as an alliance round mail (no need to click CTRL+C)</div>');
		$('#ikbut').click(function(){
			GM_setValue('postbattlereport'+location.host,bmes);
			return true;
		});
	}
}


loadstyles();
addEventListener('keypress', keyHandler, true);
setInterval ( schedulerhandler, 1000 );


function mainfork(){
try{

	var bodyid=getbody.id;
	switch (bodyid){
		case "island":
			islandview();
		break;
		case "city":
			version_update();
			city();
		break;
		case "museum":
				var mplayers="";
				forall('//td[@class="player"]', null, function(obj,i){mplayers+=","+obj.innerHTML+",";});
				GM_setValue("CultTtreaties"+location.host,mplayers);
		break;
		case "branchOffice":
				branchOffice();
		break;
		case "sendSpy":
				 var form=XX('//form',XPFirst).parentNode;
				 btn(form,'spybash2','spybash','x2 Spies','Send 2 Spies.',actionshandler,250,';color:#542C0F;font-size:11px;');
				 btn(form,'spybash5','spybash','x5 Spies','Send 5 Spies.',actionshandler,40,';color:#542C0F;font-size:11px;');
				 btn(form,'spybash10','spybash','x10 Spies','Send 10 Spies.',actionshandler,40,';color:#542C0F;font-size:11px;');
		 break;
		case "sendMessage":
		case "sendIKMessage":
				var messagetext=XX('//textarea[@id="text"]',XPFirst);
				var brep=GM_getValue('postbattlereport'+location.host);
				GM_setValue('postbattlereport'+location.host,'');
				var sigbuf=GM_getValue("Signature","");
				sigbuf = sigbuf.replace( new RegExp( "(#)(B|b)(R|r)(#)", "g" ), "\n" );
				messagetext.innerHTML=messagetext.innerHTML+brep+"\n\n"+sigbuf;

		break;
		case "diplomacyAdvisorOutBox":
		case "diplomacyAdvisor":
			Messages();
		break;
		case "diplomacyAdvisorAlly":
		case "embassy":
				Embassy();
		break;
		case "researchAdvisor":
			var points = number($('ul.researchLeftMenu li.points').text());
			var perhour = number($('ul.researchLeftMenu li.time').text());
			$('ul.resources li.researchPoints').each(function(){
			    $(this).append('<center><div style="white-space:nowrap;color:blue; font-size:11px;width:100px;"><br>('+formattime((number($(this).text())-points)/perhour*3600000)+')<div style="font-size:7px;color:red">ika-core</div></div></center>');
			});
		break;
		case "finances":
			var tb=$('table#upkeepReductionTable');
			var gold=number($('li.gold span#value_gold').text());
			var a=$('tr.result td.hidden',tb[2])[0];
			var n=number(a)*24;
			
			if (a.innerHTML.split('-')[1]){
				n=n*(-1);
			}

			$(tb[2]).append('<tr class="result"><td class="reason" colspan=3>Per Day</td><td class="hidden">'+fmtNumber(n)+'<div style="font-size:7px;color:red">ika-core</div></td></tr>')
			$(tb[2]).append('<tr class="result"><td class="reason" colspan=3>Per Week</td><td class="hidden">'+fmtNumber(n*7)+'<div style="font-size:7px;color:red">ika-core</div></td></tr>')
			$(tb[2]).append('<tr class="result alt"><td class="reason" colspan=3>Total Gold Balance in one week</td><td class="hidden">'+fmtNumber(gold+n*7)+'<div style="font-size:7px;color:red">ika-core</div></td></tr>')
		break;
		case "highscore":
			Highscores();
		break;
		case "militaryAdvisorReportView":
			convertbattlereports();
		break;
	}
	var b2=new Date();bench.innerHTML='ika-core:'+(b2.getTime()-currenttime.getTime())+' ms'
	} catch(e){//alert(e.message)
	}
}

function serialize( mixed_value ) {

    var _getType = function( inp ) {
        var type = typeof inp, match;
        var key;
        if (type == 'object' && !inp) {
            return 'null';
        }
        if (type == "object") {
            if (!inp.constructor) {
                return 'object';
            }
            var cons = inp.constructor.toString();
            if (match = cons.match(/(\w+)\(/)) {
                cons = match[1].toLowerCase();
            }
            var types = ["boolean", "number", "string", "array"];
            for (key in types) {
                if (cons == types[key]) {
                    type = types[key];
                    break;
                }
            }
        }
        return type;
    };
    var type = _getType(mixed_value);
    var val, ktype = '';

    switch (type) {
        case "function":
            val = "";
            break;
        case "undefined":
            val = "N";
            break;
        case "boolean":
            val = "b:" + (mixed_value ? "1" : "0");
            break;
        case "number":
            val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;
            break;
        case "string":
            val = "s:" + mixed_value.length + ":\"" + mixed_value + "\"";
            break;
        case "array":
        case "object":
            val = "a";
            /*
            if (type == "object") {
                var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
                if (objname == undefined) {
                    return;
                }
                objname[1] = serialize(objname[1]);
                val = "O" + objname[1].substring(1, objname[1].length - 1);
            }
            */
            var count = 0;
            var vals = "";
            var okey;
            var key;
            for (key in mixed_value) {
                ktype = _getType(mixed_value[key]);
                if (ktype == "function") {
                    continue;
                }

                okey = (key.toString().match(/^[0-9]+$/) ? parseInt(key) : key);
                vals += serialize(okey) +
                        serialize(mixed_value[key]);
                count++;
            }
            val += ":" + count + ":{" + vals + "}";
            break;
    }
    if (type != "object" && type != "array") val += ";";
    return val;
}
function unserialize(data){
    var error = function (type, msg, filename, line){throw new window[type](msg, filename, line);};
    var read_until = function (data, offset, stopchr){
        var buf = [];
        var chr = data.slice(offset, offset + 1);
        var i = 2;
		var datalength=data.length;
        while(chr != stopchr){
            if((i+offset) > datalength){
                error('Error', 'Invalid');
            }
            buf.push(chr);
            chr = data.slice(offset + (i - 1),offset + i);
            i += 1;
        }
        return [buf.length, buf.join('')];
    };
    var read_chrs = function (data, offset, length){
        buf = [];
        for(var i = 0;i < length;i++){
            var chr = data.slice(offset + (i - 1),offset + i);
            buf.push(chr);
        }
        return [buf.length, buf.join('')];
    };
    var _unserialize = function (data, offset){
        if(!offset) offset = 0;
        var buf = [];
        var dtype = (data.slice(offset, offset + 1)).toLowerCase();

        var dataoffset = offset + 2;
        var typeconvert = new Function('x', 'return x');
        var chrs = 0;
        var datalength = 0;

        switch(dtype){
            case "i":
                typeconvert = new Function('x', 'return parseInt(x)');
                var readData = read_until(data, dataoffset, ';');
                var chrs = readData[0];
                var readdata = readData[1];
                dataoffset += chrs + 1;
            break;
            case "b":
                typeconvert = new Function('x', 'return (parseInt(x) == 1)');
                var readData = read_until(data, dataoffset, ';');
                var chrs = readData[0];
                var readdata = readData[1];
                dataoffset += chrs + 1;
            break;
            case "d":
                typeconvert = new Function('x', 'return parseFloat(x)');
                var readData = read_until(data, dataoffset, ';');
                var chrs = readData[0];
                var readdata = readData[1];
                dataoffset += chrs + 1;
            break;
            case "n":
                readdata = null;
            break;
            case "s":
                var ccount = read_until(data, dataoffset, ':');
                var chrs = ccount[0];
                var stringlength = ccount[1];
                dataoffset += chrs + 2;

                var readData = read_chrs(data, dataoffset+1, parseInt(stringlength));
                var chrs = readData[0];
                var readdata = readData[1];
                dataoffset += chrs + 2;
                if(chrs != parseInt(stringlength) && chrs != readdata.length){
                    error('SyntaxError', 'String length mismatch');
                }
            break;
            case "a":
                var readdata = {};

                var keyandchrs = read_until(data, dataoffset, ':');
                var chrs = keyandchrs[0];
                var keys = keyandchrs[1];
                dataoffset += chrs + 2;

                for(var i = 0;i < parseInt(keys);i++){
                    var kprops = _unserialize(data, dataoffset);
                    var kchrs = kprops[1];
                    var key = kprops[2];
                    dataoffset += kchrs;

                    var vprops = _unserialize(data, dataoffset);
                    var vchrs = vprops[1];
                    var value = vprops[2];
                    dataoffset += vchrs;

                    readdata[key] = value;
                }

                dataoffset += 1;
            break;
            default:
                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
            break;
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)];
    };
    return _unserialize(data, 0)[2];
}

window.addEventListener("load", function(e) {rdb.init();lang();mainfork();Transporter();sidetabs();},false);