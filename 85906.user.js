// ==UserScript==
// @name			Accept All Gift3
// @namespace		MafiaWarsAcceptAll2
// @description		Aceppt2
// @include			http://www.facebook.com/reqs.php
// @version			0.2.18
// ==/UserScript==


(function(){var l=this,g,x=l.jQuery,o=l.$,n=l.jQuery=l.$=function(D,E){return new n.fn.init(D,E)},C=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;n.fn=n.prototype={init:function(D,G){D=D||document;if(D.nodeType){this[0]=D;this.length=1;this.context=D;return this}if(typeof D==="string"){var F=C.exec(D);if(F&&(F[1]||!G)){if(F[1]){D=n.clean([F[1]],G)}else{var H=document.getElementById(F[3]);if(H){if(H.id!=F[3]){return n().find(D)}var E=n(H);E.context=document;E.selector=D;return E}D=[]}}else{return n(G).find(D)}}else{if(n.isFunction(D)){return n(document).ready(D)}}if(D.selector&&D.context){this.selector=D.selector;this.context=D.context}return this.setArray(n.makeArray(D))},selector:"",jquery:"1.3",size:function(){return this.length},get:function(D){return D===g?n.makeArray(this):this[D]},pushStack:function(E,G,D){var F=n(E);F.prevObject=this;F.context=this.context;if(G==="find"){F.selector=this.selector+(this.selector?" ":"")+D}else{if(G){F.selector=this.selector+"."+G+"("+D+")"}}return F},setArray:function(D){this.length=0;Array.prototype.push.apply(this,D);return this},each:function(E,D){return n.each(this,E,D)},index:function(D){return n.inArray(D&&D.jquery?D[0]:D,this)},attr:function(E,G,F){var D=E;if(typeof E==="string"){if(G===g){return this[0]&&n[F||"attr"](this[0],E)}else{D={};D[E]=G}}return this.each(function(H){for(E in D){n.attr(F?this.style:this,E,n.prop(this,D[E],F,H,E))}})},css:function(D,E){if((D=="width"||D=="height")&&parseFloat(E)<0){E=g}return this.attr(D,E,"curCSS")},text:function(E){if(typeof E!=="object"&&E!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(E))}var D="";n.each(E||this,function(){n.each(this.childNodes,function(){if(this.nodeType!=8){D+=this.nodeType!=1?this.nodeValue:n.fn.text([this])}})});return D},wrapAll:function(D){if(this[0]){var E=n(D,this[0].ownerDocument).clone();if(this[0].parentNode){E.insertBefore(this[0])}E.map(function(){var F=this;while(F.firstChild){F=F.firstChild}return F}).append(this)}return this},wrapInner:function(D){return this.each(function(){n(this).contents().wrapAll(D)})},wrap:function(D){return this.each(function(){n(this).wrapAll(D)})},append:function(){return this.domManip(arguments,true,function(D){if(this.nodeType==1){this.appendChild(D)}})},prepend:function(){return this.domManip(arguments,true,function(D){if(this.nodeType==1){this.insertBefore(D,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(D){this.parentNode.insertBefore(D,this)})},after:function(){return this.domManip(arguments,false,function(D){this.parentNode.insertBefore(D,this.nextSibling)})},end:function(){return this.prevObject||n([])},push:[].push,find:function(D){if(this.length===1&&!/,/.test(D)){var F=this.pushStack([],"find",D);F.length=0;n.find(D,this[0],F);return F}else{var E=n.map(this,function(G){return n.find(D,G)});return this.pushStack(/[^+>] [^+>]/.test(D)?n.unique(E):E,"find",D)}},clone:function(E){var D=this.map(function(){if(!n.support.noCloneEvent&&!n.isXMLDoc(this)){var H=this.cloneNode(true),G=document.createElement("div");G.appendChild(H);return n.clean([G.innerHTML])[0]}else{return this.cloneNode(true)}});var F=D.find("*").andSelf().each(function(){if(this[h]!==g){this[h]=null}});if(E===true){this.find("*").andSelf().each(function(H){if(this.nodeType==3){return}var G=n.data(this,"events");for(var J in G){for(var I in G[J]){n.event.add(F[H],J,G[J][I],G[J][I].data)}}})}return D},filter:function(D){return this.pushStack(n.isFunction(D)&&n.grep(this,function(F,E){return D.call(F,E)})||n.multiFilter(D,n.grep(this,function(E){return E.nodeType===1})),"filter",D)},closest:function(D){var E=n.expr.match.POS.test(D)?n(D):null;return this.map(function(){var F=this;while(F&&F.ownerDocument){if(E?E.index(F)>-1:n(F).is(D)){return F}F=F.parentNode}})},not:function(D){if(typeof D==="string"){if(f.test(D)){return this.pushStack(n.multiFilter(D,this,true),"not",D)}else{D=n.multiFilter(D,this)}}var E=D.length&&D[D.length-1]!==g&&!D.nodeType;return this.filter(function(){return E?n.inArray(this,D)<0:this!=D})},add:function(D){return this.pushStack(n.unique(n.merge(this.get(),typeof D==="string"?n(D):n.makeArray(D))))},is:function(D){return !!D&&n.multiFilter(D,this).length>0},hasClass:function(D){return !!D&&this.is("."+D)},val:function(J){if(J===g){var D=this[0];if(D){if(n.nodeName(D,"option")){return(D.attributes.value||{}).specified?D.value:D.text}if(n.nodeName(D,"select")){var H=D.selectedIndex,K=[],L=D.options,G=D.type=="select-one";if(H<0){return null}for(var E=G?H:0,I=G?H+1:L.length;E<I;E++){var F=L[E];if(F.selected){J=n(F).val();if(G){return J}K.push(J)}}return K}return(D.value||"").replace(/\r/g,"")}return g}if(typeof J==="number"){J+=""}return this.each(function(){if(this.nodeType!=1){return}if(n.isArray(J)&&/radio|checkbox/.test(this.type)){this.checked=(n.inArray(this.value,J)>=0||n.inArray(this.name,J)>=0)}else{if(n.nodeName(this,"select")){var M=n.makeArray(J);n("option",this).each(function(){this.selected=(n.inArray(this.value,M)>=0||n.inArray(this.text,M)>=0)});if(!M.length){this.selectedIndex=-1}}else{this.value=J}}})},html:function(D){return D===g?(this[0]?this[0].innerHTML:null):this.empty().append(D)},replaceWith:function(D){return this.after(D).remove()},eq:function(D){return this.slice(D,+D+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(D){return this.pushStack(n.map(this,function(F,E){return D.call(F,E,F)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=n.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild,D=this.length>1?I.cloneNode(true):I;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),G>0?D.cloneNode(true):I)}}if(F){n.each(F,y)}}return this;function K(N,O){return M&&n.nodeName(N,"table")&&n.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};n.fn.init.prototype=n.fn;function y(D,E){if(E.src){n.ajax({url:E.src,async:false,dataType:"script"})}else{n.globalEval(E.text||E.textContent||E.innerHTML||"")}if(E.parentNode){E.parentNode.removeChild(E)}}function e(){return +new Date}n.extend=n.fn.extend=function(){var I=arguments[0]||{},G=1,H=arguments.length,D=false,F;if(typeof I==="boolean"){D=I;I=arguments[1]||{};G=2}if(typeof I!=="object"&&!n.isFunction(I)){I={}}if(H==G){I=this;--G}for(;G<H;G++){if((F=arguments[G])!=null){for(var E in F){var J=I[E],K=F[E];if(I===K){continue}if(D&&K&&typeof K==="object"&&!K.nodeType){I[E]=n.extend(D,J||(K.length!=null?[]:{}),K)}else{if(K!==g){I[E]=K}}}}}return I};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,p=document.defaultView||{},r=Object.prototype.toString;n.extend({noConflict:function(D){l.$=o;if(D){l.jQuery=x}return n},isFunction:function(D){return r.call(D)==="[object Function]"},isArray:function(D){return r.call(D)==="[object Array]"},isXMLDoc:function(D){return D.documentElement&&!D.body||D.tagName&&D.ownerDocument&&!D.ownerDocument.body},globalEval:function(F){F=n.trim(F);if(F){var E=document.getElementsByTagName("head")[0]||document.documentElement,D=document.createElement("script");D.type="text/javascript";if(n.support.scriptEval){D.appendChild(document.createTextNode(F))}else{D.text=F}E.insertBefore(D,E.firstChild);E.removeChild(D)}},nodeName:function(E,D){return E.nodeName&&E.nodeName.toUpperCase()==D.toUpperCase()},each:function(F,J,E){var D,G=0,H=F.length;if(E){if(H===g){for(D in F){if(J.apply(F[D],E)===false){break}}}else{for(;G<H;){if(J.apply(F[G++],E)===false){break}}}}else{if(H===g){for(D in F){if(J.call(F[D],D,F[D])===false){break}}}else{for(var I=F[0];G<H&&J.call(I,G,I)!==false;I=F[++G]){}}}return F},prop:function(G,H,F,E,D){if(n.isFunction(H)){H=H.call(G,E)}return typeof H==="number"&&F=="curCSS"&&!b.test(D)?H+"px":H},className:{add:function(D,E){n.each((E||"").split(/\s+/),function(F,G){if(D.nodeType==1&&!n.className.has(D.className,G)){D.className+=(D.className?" ":"")+G}})},remove:function(D,E){if(D.nodeType==1){D.className=E!==g?n.grep(D.className.split(/\s+/),function(F){return !n.className.has(E,F)}).join(" "):""}},has:function(E,D){return n.inArray(D,(E.className||E).toString().split(/\s+/))>-1}},swap:function(G,F,H){var D={};for(var E in F){D[E]=G.style[E];G.style[E]=F[E]}H.call(G);for(var E in F){G.style[E]=D[E]}},css:function(F,D,H){if(D=="width"||D=="height"){var J,E={position:"absolute",visibility:"hidden",display:"block"},I=D=="width"?["Left","Right"]:["Top","Bottom"];function G(){J=D=="width"?F.offsetWidth:F.offsetHeight;var L=0,K=0;n.each(I,function(){L+=parseFloat(n.curCSS(F,"padding"+this,true))||0;K+=parseFloat(n.curCSS(F,"border"+this+"Width",true))||0});J-=Math.round(L+K)}if(n(F).is(":visible")){G()}else{n.swap(F,E,G)}return Math.max(0,J)}return n.curCSS(F,D,H)},curCSS:function(H,E,F){var K,D=H.style;if(E=="opacity"&&!n.support.opacity){K=n.attr(D,"opacity");return K==""?"1":K}if(E.match(/float/i)){E=v}if(!F&&D&&D[E]){K=D[E]}else{if(p.getComputedStyle){if(E.match(/float/i)){E="float"}E=E.replace(/([A-Z])/g,"-$1").toLowerCase();var L=p.getComputedStyle(H,null);if(L){K=L.getPropertyValue(E)}if(E=="opacity"&&K==""){K="1"}}else{if(H.currentStyle){var I=E.replace(/\-(\w)/g,function(M,N){return N.toUpperCase()});K=H.currentStyle[E]||H.currentStyle[I];if(!/^\d+(px)?$/i.test(K)&&/^\d/.test(K)){var G=D.left,J=H.runtimeStyle.left;H.runtimeStyle.left=H.currentStyle.left;D.left=K||0;K=D.pixelLeft+"px";D.left=G;H.runtimeStyle.left=J}}}}return K},clean:function(E,J,H){J=J||document;if(typeof J.createElement==="undefined"){J=J.ownerDocument||J[0]&&J[0].ownerDocument||document}if(!H&&E.length===1&&typeof E[0]==="string"){var G=/^<(\w+)\s*\/?>$/.exec(E[0]);if(G){return[J.createElement(G[1])]}}var F=[],D=[],K=J.createElement("div");n.each(E,function(O,Q){if(typeof Q==="number"){Q+=""}if(!Q){return}if(typeof Q==="string"){Q=Q.replace(/(<(\w+)[^>]*?)\/>/g,function(S,T,R){return R.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?S:T+"></"+R+">"});var N=n.trim(Q).toLowerCase();var P=!N.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!N.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||N.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!N.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!N.indexOf("<td")||!N.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!N.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!n.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];K.innerHTML=P[1]+Q+P[2];while(P[0]--){K=K.lastChild}if(!n.support.tbody){var M=!N.indexOf("<table")&&N.indexOf("<tbody")<0?K.firstChild&&K.firstChild.childNodes:P[1]=="<table>"&&N.indexOf("<tbody")<0?K.childNodes:[];for(var L=M.length-1;L>=0;--L){if(n.nodeName(M[L],"tbody")&&!M[L].childNodes.length){M[L].parentNode.removeChild(M[L])}}}if(!n.support.leadingWhitespace&&/^\s/.test(Q)){K.insertBefore(J.createTextNode(Q.match(/^\s*/)[0]),K.firstChild)}Q=n.makeArray(K.childNodes)}if(Q.nodeType){F.push(Q)}else{F=n.merge(F,Q)}});if(H){for(var I=0;F[I];I++){if(n.nodeName(F[I],"script")&&(!F[I].type||F[I].type.toLowerCase()==="text/javascript")){D.push(F[I].parentNode?F[I].parentNode.removeChild(F[I]):F[I])}else{if(F[I].nodeType===1){F.splice.apply(F,[I+1,0].concat(n.makeArray(F[I].getElementsByTagName("script"))))}H.appendChild(F[I])}}return D}return F},attr:function(I,F,J){if(!I||I.nodeType==3||I.nodeType==8){return g}var G=!n.isXMLDoc(I),K=J!==g;F=G&&n.props[F]||F;if(I.tagName){var E=/href|src|style/.test(F);if(F=="selected"&&I.parentNode){I.parentNode.selectedIndex}if(F in I&&G&&!E){if(K){if(F=="type"&&n.nodeName(I,"input")&&I.parentNode){throw"type property can't be changed"}I[F]=J}if(n.nodeName(I,"form")&&I.getAttributeNode(F)){return I.getAttributeNode(F).nodeValue}if(F=="tabIndex"){var H=I.getAttributeNode("tabIndex");return H&&H.specified?H.value:I.nodeName.match(/^(a|area|button|input|object|select|textarea)$/i)?0:g}return I[F]}if(!n.support.style&&G&&F=="style"){return n.attr(I.style,"cssText",J)}if(K){I.setAttribute(F,""+J)}var D=!n.support.hrefNormalized&&G&&E?I.getAttribute(F,2):I.getAttribute(F);return D===null?g:D}if(!n.support.opacity&&F=="opacity"){if(K){I.zoom=1;I.filter=(I.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(J)+""=="NaN"?"":"alpha(opacity="+J*100+")")}return I.filter&&I.filter.indexOf("opacity=")>=0?(parseFloat(I.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}F=F.replace(/-([a-z])/ig,function(L,M){return M.toUpperCase()});if(K){I[F]=J}return I[F]},trim:function(D){return(D||"").replace(/^\s+|\s+$/g,"")},makeArray:function(F){var D=[];if(F!=null){var E=F.length;if(E==null||typeof F==="string"||n.isFunction(F)||F.setInterval){D[0]=F}else{while(E){D[--E]=F[E]}}}return D},inArray:function(F,G){for(var D=0,E=G.length;D<E;D++){if(G[D]===F){return D}}return -1},merge:function(G,D){var E=0,F,H=G.length;if(!n.support.getAll){while((F=D[E++])!=null){if(F.nodeType!=8){G[H++]=F}}}else{while((F=D[E++])!=null){G[H++]=F}}return G},unique:function(J){var E=[],D={};try{for(var F=0,G=J.length;F<G;F++){var I=n.data(J[F]);if(!D[I]){D[I]=true;E.push(J[F])}}}catch(H){E=J}return E},grep:function(E,I,D){var F=[];for(var G=0,H=E.length;G<H;G++){if(!D!=!I(E[G],G)){F.push(E[G])}}return F},map:function(D,I){var E=[];for(var F=0,G=D.length;F<G;F++){var H=I(D[F],F);if(H!=null){E[E.length]=H}}return E.concat.apply([],E)}});var B=navigator.userAgent.toLowerCase();n.browser={version:(B.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(B),opera:/opera/.test(B),msie:/msie/.test(B)&&!/opera/.test(B),mozilla:/mozilla/.test(B)&&!/(compatible|webkit)/.test(B)};n.each({parent:function(D){return D.parentNode},parents:function(D){return n.dir(D,"parentNode")},next:function(D){return n.nth(D,2,"nextSibling")},prev:function(D){return n.nth(D,2,"previousSibling")},nextAll:function(D){return n.dir(D,"nextSibling")},prevAll:function(D){return n.dir(D,"previousSibling")},siblings:function(D){return n.sibling(D.parentNode.firstChild,D)},children:function(D){return n.sibling(D.firstChild)},contents:function(D){return n.nodeName(D,"iframe")?D.contentDocument||D.contentWindow.document:n.makeArray(D.childNodes)}},function(D,E){n.fn[D]=function(F){var G=n.map(this,E);if(F&&typeof F=="string"){G=n.multiFilter(F,G)}return this.pushStack(n.unique(G),D,F)}});n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(D,E){n.fn[D]=function(){var F=arguments;return this.each(function(){for(var G=0,H=F.length;G<H;G++){n(F[G])[E](this)}})}});n.each({removeAttr:function(D){n.attr(this,D,"");if(this.nodeType==1){this.removeAttribute(D)}},addClass:function(D){n.className.add(this,D)},removeClass:function(D){n.className.remove(this,D)},toggleClass:function(E,D){if(typeof D!=="boolean"){D=!n.className.has(this,E)}n.className[D?"add":"remove"](this,E)},remove:function(D){if(!D||n.filter(D,[this]).length){n("*",this).add([this]).each(function(){n.event.remove(this);n.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){n(">*",this).remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(D,E){n.fn[D]=function(){return this.each(E,arguments)}});function j(D,E){return D[0]&&parseInt(n.curCSS(D[0],E,true),10)||0}var h="jQuery"+e(),u=0,z={};n.extend({cache:{},data:function(E,D,F){E=E==l?z:E;var G=E[h];if(!G){G=E[h]=++u}if(D&&!n.cache[G]){n.cache[G]={}}if(F!==g){n.cache[G][D]=F}return D?n.cache[G][D]:G},removeData:function(E,D){E=E==l?z:E;var G=E[h];if(D){if(n.cache[G]){delete n.cache[G][D];D="";for(D in n.cache[G]){break}if(!D){n.removeData(E)}}}else{try{delete E[h]}catch(F){if(E.removeAttribute){E.removeAttribute(h)}}delete n.cache[G]}},queue:function(E,D,G){if(E){D=(D||"fx")+"queue";var F=n.data(E,D);if(!F||n.isArray(G)){F=n.data(E,D,n.makeArray(G))}else{if(G){F.push(G)}}}return F},dequeue:function(G,F){var D=n.queue(G,F),E=D.shift();if(!F||F==="fx"){E=D[0]}if(E!==g){E.call(G)}}});n.fn.extend({data:function(D,F){var G=D.split(".");G[1]=G[1]?"."+G[1]:"";if(F===g){var E=this.triggerHandler("getData"+G[1]+"!",[G[0]]);if(E===g&&this.length){E=n.data(this[0],D)}return E===g&&G[1]?this.data(G[0]):E}else{return this.trigger("setData"+G[1]+"!",[G[0],F]).each(function(){n.data(this,D,F)})}},removeData:function(D){return this.each(function(){n.removeData(this,D)})},queue:function(D,E){if(typeof D!=="string"){E=D;D="fx"}if(E===g){return n.queue(this[0],D)}return this.each(function(){var F=n.queue(this,D,E);if(D=="fx"&&F.length==1){F[0].call(this)}})},dequeue:function(D){return this.each(function(){n.dequeue(this,D)})}});
(function(){var N=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|[^[\]]+)+\]|\\.|[^ >+~,(\[]+)+|[>+~])(\s*,\s*)?/g,I=0,F=Object.prototype.toString;var E=function(ae,S,aa,V){aa=aa||[];S=S||document;if(S.nodeType!==1&&S.nodeType!==9){return[]}if(!ae||typeof ae!=="string"){return aa}var ab=[],ac,Y,ah,ag,Z,R,Q=true;N.lastIndex=0;while((ac=N.exec(ae))!==null){ab.push(ac[1]);if(ac[2]){R=RegExp.rightContext;break}}if(ab.length>1&&G.match.POS.exec(ae)){if(ab.length===2&&G.relative[ab[0]]){var U="",X;while((X=G.match.POS.exec(ae))){U+=X[0];ae=ae.replace(G.match.POS,"")}Y=E.filter(U,E(/\s$/.test(ae)?ae+"*":ae,S))}else{Y=G.relative[ab[0]]?[S]:E(ab.shift(),S);while(ab.length){var P=[];ae=ab.shift();if(G.relative[ae]){ae+=ab.shift()}for(var af=0,ad=Y.length;af<ad;af++){E(ae,Y[af],P)}Y=P}}}else{var ai=V?{expr:ab.pop(),set:D(V)}:E.find(ab.pop(),ab.length===1&&S.parentNode?S.parentNode:S);Y=E.filter(ai.expr,ai.set);if(ab.length>0){ah=D(Y)}else{Q=false}while(ab.length){var T=ab.pop(),W=T;if(!G.relative[T]){T=""}else{W=ab.pop()}if(W==null){W=S}G.relative[T](ah,W,M(S))}}if(!ah){ah=Y}if(!ah){throw"Syntax error, unrecognized expression: "+(T||ae)}if(F.call(ah)==="[object Array]"){if(!Q){aa.push.apply(aa,ah)}else{if(S.nodeType===1){for(var af=0;ah[af]!=null;af++){if(ah[af]&&(ah[af]===true||ah[af].nodeType===1&&H(S,ah[af]))){aa.push(Y[af])}}}else{for(var af=0;ah[af]!=null;af++){if(ah[af]&&ah[af].nodeType===1){aa.push(Y[af])}}}}}else{D(ah,aa)}if(R){E(R,S,aa,V)}return aa};E.matches=function(P,Q){return E(P,null,null,Q)};E.find=function(V,S){var W,Q;if(!V){return[]}for(var R=0,P=G.order.length;R<P;R++){var T=G.order[R],Q;if((Q=G.match[T].exec(V))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){Q[1]=(Q[1]||"").replace(/\\/g,"");W=G.find[T](Q,S);if(W!=null){V=V.replace(G.match[T],"");break}}}}if(!W){W=S.getElementsByTagName("*")}return{set:W,expr:V}};E.filter=function(S,ac,ad,T){var Q=S,Y=[],ah=ac,V,ab;while(S&&ac.length){for(var U in G.filter){if((V=G.match[U].exec(S))!=null){var Z=G.filter[U],R=null,X=0,aa,ag;ab=false;if(ah==Y){Y=[]}if(G.preFilter[U]){V=G.preFilter[U](V,ah,ad,Y,T);if(!V){ab=aa=true}else{if(V===true){continue}else{if(V[0]===true){R=[];var W=null,af;for(var ae=0;(af=ah[ae])!==g;ae++){if(af&&W!==af){R.push(af);W=af}}}}}}if(V){for(var ae=0;(ag=ah[ae])!==g;ae++){if(ag){if(R&&ag!=R[X]){X++}aa=Z(ag,V,X,R);var P=T^!!aa;if(ad&&aa!=null){if(P){ab=true}else{ah[ae]=false}}else{if(P){Y.push(ag);ab=true}}}}}if(aa!==g){if(!ad){ah=Y}S=S.replace(G.match[U],"");if(!ab){return[]}break}}}S=S.replace(/\s*,\s*/,"");if(S==Q){if(ab==null){throw"Syntax error, unrecognized expression: "+S}else{break}}Q=S}return ah};var G=E.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(P){return P.getAttribute("href")}},relative:{"+":function(T,Q){for(var R=0,P=T.length;R<P;R++){var S=T[R];if(S){var U=S.previousSibling;while(U&&U.nodeType!==1){U=U.previousSibling}T[R]=typeof Q==="string"?U||false:U===Q}}if(typeof Q==="string"){E.filter(Q,T,true)}},">":function(U,Q,V){if(typeof Q==="string"&&!/\W/.test(Q)){Q=V?Q:Q.toUpperCase();for(var R=0,P=U.length;R<P;R++){var T=U[R];if(T){var S=T.parentNode;U[R]=S.nodeName===Q?S:false}}}else{for(var R=0,P=U.length;R<P;R++){var T=U[R];if(T){U[R]=typeof Q==="string"?T.parentNode:T.parentNode===Q}}if(typeof Q==="string"){E.filter(Q,U,true)}}},"":function(S,Q,U){var R="done"+(I++),P=O;if(!Q.match(/\W/)){var T=Q=U?Q:Q.toUpperCase();P=L}P("parentNode",Q,R,S,T,U)},"~":function(S,Q,U){var R="done"+(I++),P=O;if(typeof Q==="string"&&!Q.match(/\W/)){var T=Q=U?Q:Q.toUpperCase();P=L}P("previousSibling",Q,R,S,T,U)}},find:{ID:function(Q,R){if(R.getElementById){var P=R.getElementById(Q[1]);return P?[P]:[]}},NAME:function(P,Q){return Q.getElementsByName?Q.getElementsByName(P[1]):null},TAG:function(P,Q){return Q.getElementsByTagName(P[1])}},preFilter:{CLASS:function(S,Q,R,P,U){S=" "+S[1].replace(/\\/g,"")+" ";for(var T=0;Q[T];T++){if(U^(" "+Q[T].className+" ").indexOf(S)>=0){if(!R){P.push(Q[T])}}else{if(R){Q[T]=false}}}return false},ID:function(P){return P[1].replace(/\\/g,"")},TAG:function(Q,P){for(var R=0;!P[R];R++){}return M(P[R])?Q[1]:Q[1].toUpperCase()},CHILD:function(P){if(P[1]=="nth"){var Q=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(P[2]=="even"&&"2n"||P[2]=="odd"&&"2n+1"||!/\D/.test(P[2])&&"0n+"+P[2]||P[2]);P[2]=(Q[1]+(Q[2]||1))-0;P[3]=Q[3]-0}P[0]="done"+(I++);return P},ATTR:function(Q){var P=Q[1];if(G.attrMap[P]){Q[1]=G.attrMap[P]}if(Q[2]==="~="){Q[4]=" "+Q[4]+" "}return Q},PSEUDO:function(T,Q,R,P,U){if(T[1]==="not"){if(T[3].match(N).length>1){T[3]=E(T[3],null,null,Q)}else{var S=E.filter(T[3],Q,R,true^U);if(!R){P.push.apply(P,S)}return false}}else{if(G.match.POS.test(T[0])){return true}}return T},POS:function(P){P.unshift(true);return P}},filters:{enabled:function(P){return P.disabled===false&&P.type!=="hidden"},disabled:function(P){return P.disabled===true},checked:function(P){return P.checked===true},selected:function(P){P.parentNode.selectedIndex;return P.selected===true},parent:function(P){return !!P.firstChild},empty:function(P){return !P.firstChild},has:function(R,Q,P){return !!E(P[3],R).length},header:function(P){return/h\d/i.test(P.nodeName)},text:function(P){return"text"===P.type},radio:function(P){return"radio"===P.type},checkbox:function(P){return"checkbox"===P.type},file:function(P){return"file"===P.type},password:function(P){return"password"===P.type},submit:function(P){return"submit"===P.type},image:function(P){return"image"===P.type},reset:function(P){return"reset"===P.type},button:function(P){return"button"===P.type||P.nodeName.toUpperCase()==="BUTTON"},input:function(P){return/input|select|textarea|button/i.test(P.nodeName)}},setFilters:{first:function(Q,P){return P===0},last:function(R,Q,P,S){return Q===S.length-1},even:function(Q,P){return P%2===0},odd:function(Q,P){return P%2===1},lt:function(R,Q,P){return Q<P[3]-0},gt:function(R,Q,P){return Q>P[3]-0},nth:function(R,Q,P){return P[3]-0==Q},eq:function(R,Q,P){return P[3]-0==Q}},filter:{CHILD:function(P,S){var V=S[1],W=P.parentNode;var U="child"+W.childNodes.length;if(W&&(!W[U]||!P.nodeIndex)){var T=1;for(var Q=W.firstChild;Q;Q=Q.nextSibling){if(Q.nodeType==1){Q.nodeIndex=T++}}W[U]=T-1}if(V=="first"){return P.nodeIndex==1}else{if(V=="last"){return P.nodeIndex==W[U]}else{if(V=="only"){return W[U]==1}else{if(V=="nth"){var Y=false,R=S[2],X=S[3];if(R==1&&X==0){return true}if(R==0){if(P.nodeIndex==X){Y=true}}else{if((P.nodeIndex-X)%R==0&&(P.nodeIndex-X)/R>=0){Y=true}}return Y}}}}},PSEUDO:function(V,R,S,W){var Q=R[1],T=G.filters[Q];if(T){return T(V,S,R,W)}else{if(Q==="contains"){return(V.textContent||V.innerText||"").indexOf(R[3])>=0}else{if(Q==="not"){var U=R[3];for(var S=0,P=U.length;S<P;S++){if(U[S]===V){return false}}return true}}}},ID:function(Q,P){return Q.nodeType===1&&Q.getAttribute("id")===P},TAG:function(Q,P){return(P==="*"&&Q.nodeType===1)||Q.nodeName===P},CLASS:function(Q,P){return P.test(Q.className)},ATTR:function(T,R){var P=G.attrHandle[R[1]]?G.attrHandle[R[1]](T):T[R[1]]||T.getAttribute(R[1]),U=P+"",S=R[2],Q=R[4];return P==null?false:S==="="?U===Q:S==="*="?U.indexOf(Q)>=0:S==="~="?(" "+U+" ").indexOf(Q)>=0:!R[4]?P:S==="!="?U!=Q:S==="^="?U.indexOf(Q)===0:S==="$="?U.substr(U.length-Q.length)===Q:S==="|="?U===Q||U.substr(0,Q.length+1)===Q+"-":false},POS:function(T,Q,R,U){var P=Q[2],S=G.setFilters[P];if(S){return S(T,R,Q,U)}}}};for(var K in G.match){G.match[K]=RegExp(G.match[K].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var D=function(Q,P){Q=Array.prototype.slice.call(Q);if(P){P.push.apply(P,Q);return P}return Q};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(J){D=function(T,S){var Q=S||[];if(F.call(T)==="[object Array]"){Array.prototype.push.apply(Q,T)}else{if(typeof T.length==="number"){for(var R=0,P=T.length;R<P;R++){Q.push(T[R])}}else{for(var R=0;T[R];R++){Q.push(T[R])}}}return Q}}(function(){var Q=document.createElement("form"),R="script"+(new Date).getTime();Q.innerHTML="<input name='"+R+"'/>";var P=document.documentElement;P.insertBefore(Q,P.firstChild);if(!!document.getElementById(R)){G.find.ID=function(T,U){if(U.getElementById){var S=U.getElementById(T[1]);return S?S.id===T[1]||S.getAttributeNode&&S.getAttributeNode("id").nodeValue===T[1]?[S]:g:[]}};G.filter.ID=function(U,S){var T=U.getAttributeNode&&U.getAttributeNode("id");return U.nodeType===1&&T&&T.nodeValue===S}}P.removeChild(Q)})();(function(){var P=document.createElement("div");P.appendChild(document.createComment(""));if(P.getElementsByTagName("*").length>0){G.find.TAG=function(Q,U){var T=U.getElementsByTagName(Q[1]);if(Q[1]==="*"){var S=[];for(var R=0;T[R];R++){if(T[R].nodeType===1){S.push(T[R])}}T=S}return T}}P.innerHTML="<a href='#'></a>";if(P.firstChild.getAttribute("href")!=="#"){G.attrHandle.href=function(Q){return Q.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var P=E;E=function(T,S,Q,R){S=S||document;if(!R&&S.nodeType===9){try{return D(S.querySelectorAll(T),Q)}catch(U){}}return P(T,S,Q,R)};E.find=P.find;E.filter=P.filter;E.selectors=P.selectors;E.matches=P.matches})()}if(document.documentElement.getElementsByClassName){G.order.splice(1,0,"CLASS");G.find.CLASS=function(P,Q){return Q.getElementsByClassName(P[1])}}function L(Q,W,V,Z,X,Y){for(var T=0,R=Z.length;T<R;T++){var P=Z[T];if(P){P=P[Q];var U=false;while(P&&P.nodeType){var S=P[V];if(S){U=Z[S];break}if(P.nodeType===1&&!Y){P[V]=T}if(P.nodeName===W){U=P;break}P=P[Q]}Z[T]=U}}}function O(Q,V,U,Y,W,X){for(var S=0,R=Y.length;S<R;S++){var P=Y[S];if(P){P=P[Q];var T=false;while(P&&P.nodeType){if(P[U]){T=Y[P[U]];break}if(P.nodeType===1){if(!X){P[U]=S}if(typeof V!=="string"){if(P===V){T=true;break}}else{if(E.filter(V,[P]).length>0){T=P;break}}}P=P[Q]}Y[S]=T}}}var H=document.compareDocumentPosition?function(Q,P){return Q.compareDocumentPosition(P)&16}:function(Q,P){return Q!==P&&(Q.contains?Q.contains(P):true)};var M=function(P){return P.documentElement&&!P.body||P.tagName&&P.ownerDocument&&!P.ownerDocument.body};n.find=E;n.filter=E.filter;n.expr=E.selectors;n.expr[":"]=n.expr.filters;E.selectors.filters.hidden=function(P){return"hidden"===P.type||n.css(P,"display")==="none"||n.css(P,"visibility")==="hidden"};E.selectors.filters.visible=function(P){return"hidden"!==P.type&&n.css(P,"display")!=="none"&&n.css(P,"visibility")!=="hidden"};E.selectors.filters.animated=function(P){return n.grep(n.timers,function(Q){return P===Q.elem}).length};n.multiFilter=function(R,P,Q){if(Q){R=":not("+R+")"}return E.matches(R,P)};n.dir=function(R,Q){var P=[],S=R[Q];while(S&&S!=document){if(S.nodeType==1){P.push(S)}S=S[Q]}return P};n.nth=function(T,P,R,S){P=P||1;var Q=0;for(;T;T=T[R]){if(T.nodeType==1&&++Q==P){break}}return T};n.sibling=function(R,Q){var P=[];for(;R;R=R.nextSibling){if(R.nodeType==1&&R!=Q){P.push(R)}}return P};return;l.Sizzle=E})();n.event={add:function(H,E,G,J){if(H.nodeType==3||H.nodeType==8){return}if(H.setInterval&&H!=l){H=l}if(!G.guid){G.guid=this.guid++}if(J!==g){var F=G;G=this.proxy(F);G.data=J}var D=n.data(H,"events")||n.data(H,"events",{}),I=n.data(H,"handle")||n.data(H,"handle",function(){return typeof n!=="undefined"&&!n.event.triggered?n.event.handle.apply(arguments.callee.elem,arguments):g});I.elem=H;n.each(E.split(/\s+/),function(L,M){var N=M.split(".");M=N.shift();G.type=N.slice().sort().join(".");var K=D[M];if(n.event.specialAll[M]){n.event.specialAll[M].setup.call(H,J,N)}if(!K){K=D[M]={};if(!n.event.special[M]||n.event.special[M].setup.call(H,J,N)===false){if(H.addEventListener){H.addEventListener(M,I,false)}else{if(H.attachEvent){H.attachEvent("on"+M,I)}}}}K[G.guid]=G;n.event.global[M]=true});H=null},guid:1,global:{},remove:function(J,G,I){if(J.nodeType==3||J.nodeType==8){return}var F=n.data(J,"events"),E,D;if(F){if(G===g||(typeof G==="string"&&G.charAt(0)==".")){for(var H in F){this.remove(J,H+(G||""))}}else{if(G.type){I=G.handler;G=G.type}n.each(G.split(/\s+/),function(L,N){var P=N.split(".");N=P.shift();var M=RegExp("(^|\\.)"+P.slice().sort().join(".*\\.")+"(\\.|$)");if(F[N]){if(I){delete F[N][I.guid]}else{for(var O in F[N]){if(M.test(F[N][O].type)){delete F[N][O]}}}if(n.event.specialAll[N]){n.event.specialAll[N].teardown.call(J,P)}for(E in F[N]){break}if(!E){if(!n.event.special[N]||n.event.special[N].teardown.call(J,P)===false){if(J.removeEventListener){J.removeEventListener(N,n.data(J,"handle"),false)}else{if(J.detachEvent){J.detachEvent("on"+N,n.data(J,"handle"))}}}E=null;delete F[N]}}})}for(E in F){break}if(!E){var K=n.data(J,"handle");if(K){K.elem=null}n.removeData(J,"events");n.removeData(J,"handle")}}},trigger:function(H,J,G,D){var F=H.type||H;if(!D){H=typeof H==="object"?H[h]?H:n.extend(n.Event(F),H):n.Event(F);if(F.indexOf("!")>=0){H.type=F=F.slice(0,-1);H.exclusive=true}if(!G){H.stopPropagation();if(this.global[F]){n.each(n.cache,function(){if(this.events&&this.events[F]){n.event.trigger(H,J,this.handle.elem)}})}}if(!G||G.nodeType==3||G.nodeType==8){return g}H.result=g;H.target=G;J=n.makeArray(J);J.unshift(H)}H.currentTarget=G;var I=n.data(G,"handle");if(I){I.apply(G,J)}if((!G[F]||(n.nodeName(G,"a")&&F=="click"))&&G["on"+F]&&G["on"+F].apply(G,J)===false){H.result=false}if(!D&&G[F]&&!H.isDefaultPrevented()&&!(n.nodeName(G,"a")&&F=="click")){this.triggered=true;try{G[F]()}catch(K){}}this.triggered=false;if(!H.isPropagationStopped()){var E=G.parentNode||G.ownerDocument;if(E){n.event.trigger(H,J,E,true)}}},handle:function(J){var I,D;J=arguments[0]=n.event.fix(J||l.event);var K=J.type.split(".");J.type=K.shift();I=!K.length&&!J.exclusive;var H=RegExp("(^|\\.)"+K.slice().sort().join(".*\\.")+"(\\.|$)");D=(n.data(this,"events")||{})[J.type];for(var F in D){var G=D[F];if(I||H.test(G.type)){J.handler=G;J.data=G.data;var E=G.apply(this,arguments);if(E!==g){J.result=E;if(E===false){J.preventDefault();J.stopPropagation()}}if(J.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(G){if(G[h]){return G}var E=G;G=n.Event(E);for(var F=this.props.length,I;F;){I=this.props[--F];G[I]=E[I]}if(!G.target){G.target=G.srcElement||document}if(G.target.nodeType==3){G.target=G.target.parentNode}if(!G.relatedTarget&&G.fromElement){G.relatedTarget=G.fromElement==G.target?G.toElement:G.fromElement}if(G.pageX==null&&G.clientX!=null){var H=document.documentElement,D=document.body;G.pageX=G.clientX+(H&&H.scrollLeft||D&&D.scrollLeft||0)-(H.clientLeft||0);G.pageY=G.clientY+(H&&H.scrollTop||D&&D.scrollTop||0)-(H.clientTop||0)}if(!G.which&&((G.charCode||G.charCode===0)?G.charCode:G.keyCode)){G.which=G.charCode||G.keyCode}if(!G.metaKey&&G.ctrlKey){G.metaKey=G.ctrlKey}if(!G.which&&G.button){G.which=(G.button&1?1:(G.button&2?3:(G.button&4?2:0)))}return G},proxy:function(E,D){D=D||function(){return E.apply(this,arguments)};D.guid=E.guid=E.guid||D.guid||this.guid++;return D},special:{ready:{setup:A,teardown:function(){}}},specialAll:{live:{setup:function(D,E){n.event.add(this,E[0],c)},teardown:function(F){if(F.length){var D=0,E=RegExp("(^|\\.)"+F[0]+"(\\.|$)");n.each((n.data(this,"events").live||{}),function(){if(E.test(this.type)){D++}});if(D<1){n.event.remove(this,F[0],c)}}}}}};n.Event=function(D){if(!this.preventDefault){return new n.Event(D)}if(D&&D.type){this.originalEvent=D;this.type=D.type;this.timeStamp=D.timeStamp}else{this.type=D}if(!this.timeStamp){this.timeStamp=e()}this[h]=true};function k(){return false}function t(){return true}n.Event.prototype={preventDefault:function(){this.isDefaultPrevented=t;var D=this.originalEvent;if(!D){return}if(D.preventDefault){D.preventDefault()}D.returnValue=false},stopPropagation:function(){this.isPropagationStopped=t;var D=this.originalEvent;if(!D){return}if(D.stopPropagation){D.stopPropagation()}D.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=t;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(E){var D=E.relatedTarget;while(D&&D!=this){try{D=D.parentNode}catch(F){D=this}}if(D!=this){E.type=E.data;n.event.handle.apply(this,arguments)}};n.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(E,D){n.event.special[D]={setup:function(){n.event.add(this,E,a,D)},teardown:function(){n.event.remove(this,E,a)}}});n.fn.extend({bind:function(E,F,D){return E=="unload"?this.one(E,F,D):this.each(function(){n.event.add(this,E,D||F,D&&F)})},one:function(F,G,E){var D=n.event.proxy(E||G,function(H){n(this).unbind(H,D);return(E||G).apply(this,arguments)});return this.each(function(){n.event.add(this,F,D,E&&G)})},unbind:function(E,D){return this.each(function(){n.event.remove(this,E,D)})},trigger:function(D,E){return this.each(function(){n.event.trigger(D,E,this)})},triggerHandler:function(D,F){if(this[0]){var E=n.Event(D);E.preventDefault();E.stopPropagation();n.event.trigger(E,F,this[0]);return E.result}},toggle:function(F){var D=arguments,E=1;while(E<D.length){n.event.proxy(F,D[E++])}return this.click(n.event.proxy(F,function(G){this.lastToggle=(this.lastToggle||0)%E;G.preventDefault();return D[this.lastToggle++].apply(this,arguments)||false}))},hover:function(D,E){return this.mouseenter(D).mouseleave(E)},ready:function(D){A();if(n.isReady){D.call(document,n)}else{n.readyList.push(D)}return this},live:function(F,E){var D=n.event.proxy(E);D.guid+=this.selector+F;n(document).bind(i(F,this.selector),this.selector,D);return this},die:function(E,D){n(document).unbind(i(E,this.selector),D?{guid:D.guid+this.selector+E}:null);return this}});function c(G){var D=RegExp("(^|\\.)"+G.type+"(\\.|$)"),F=true,E=[];n.each(n.data(this,"events").live||[],function(H,I){if(D.test(I.type)){var J=n(G.target).closest(I.data)[0];if(J){E.push({elem:J,fn:I})}}});n.each(E,function(){if(!G.isImmediatePropagationStopped()&&this.fn.call(this.elem,G,this.fn.data)===false){F=false}});return F}function i(E,D){return["live",E,D.replace(/\./g,"`").replace(/ /g,"|")].join(".")}n.extend({isReady:false,readyList:[],ready:function(){if(!n.isReady){n.isReady=true;if(n.readyList){n.each(n.readyList,function(){this.call(document,n)});n.readyList=null}n(document).triggerHandler("ready")}}});var w=false;function A(){if(w){return}w=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);n.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);n.ready()}});if(document.documentElement.doScroll&&!l.frameElement){(function(){if(n.isReady){return}try{document.documentElement.doScroll("left")}catch(D){setTimeout(arguments.callee,0);return}n.ready()})()}}}n.event.add(l,"load",n.ready)}n.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(E,D){n.fn[D]=function(F){return F?this.bind(D,F):this.trigger(D)}});n(l).bind("unload",function(){for(var D in n.cache){if(D!=1&&n.cache[D].handle){n.event.remove(n.cache[D].handle.elem)}}});(function(){n.support={};var E=document.documentElement,F=document.createElement("script"),J=document.createElement("div"),I="script"+(new Date).getTime();J.style.display="none";J.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var G=J.getElementsByTagName("*"),D=J.getElementsByTagName("a")[0];if(!G||!G.length||!D){return}n.support={leadingWhitespace:J.firstChild.nodeType==3,tbody:!J.getElementsByTagName("tbody").length,objectAll:!!J.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!J.getElementsByTagName("link").length,style:/red/.test(D.getAttribute("style")),hrefNormalized:D.getAttribute("href")==="/a",opacity:D.style.opacity==="0.5",cssFloat:!!D.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};F.type="text/javascript";try{F.appendChild(document.createTextNode("window."+I+"=1;"))}catch(H){}E.insertBefore(F,E.firstChild);if(l[I]){n.support.scriptEval=true;delete l[I]}E.removeChild(F);if(J.attachEvent&&J.fireEvent){J.attachEvent("onclick",function(){n.support.noCloneEvent=false;J.detachEvent("onclick",arguments.callee)});J.cloneNode(true).fireEvent("onclick")}n(function(){var K=document.createElement("div");K.style.width="1px";K.style.paddingLeft="1px";document.body.appendChild(K);n.boxModel=n.support.boxModel=K.offsetWidth===2;document.body.removeChild(K)})})();var v=n.support.cssFloat?"cssFloat":"styleFloat";n.props={"for":"htmlFor","class":"className","float":v,cssFloat:v,styleFloat:v,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};n.fn.extend({_load:n.fn.load,load:function(F,I,J){if(typeof F!=="string"){return this._load(F)}var H=F.indexOf(" ");if(H>=0){var D=F.slice(H,F.length);F=F.slice(0,H)}var G="GET";if(I){if(n.isFunction(I)){J=I;I=null}else{if(typeof I==="object"){I=n.param(I);G="POST"}}}var E=this;n.ajax({url:F,type:G,dataType:"html",data:I,complete:function(L,K){if(K=="success"||K=="notmodified"){E.html(D?n("<div/>").append(L.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(D):L.responseText)}if(J){E.each(J,[L.responseText,K,L])}}});return this},serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?n.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type))}).map(function(D,E){var F=n(this).val();return F==null?null:n.isArray(F)?n.map(F,function(H,G){return{name:E.name,value:H}}):{name:E.name,value:F}}).get()}});n.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(D,E){n.fn[E]=function(F){return this.bind(E,F)}});var q=e();n.extend({get:function(D,F,G,E){if(n.isFunction(F)){G=F;F=null}return n.ajax({type:"GET",url:D,data:F,success:G,dataType:E})},getScript:function(D,E){return n.get(D,null,E,"script")},getJSON:function(D,E,F){return n.get(D,E,F,"json")},post:function(D,F,G,E){if(n.isFunction(F)){G=F;F={}}return n.ajax({type:"POST",url:D,data:F,success:G,dataType:E})},ajaxSetup:function(D){n.extend(n.ajaxSettings,D)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(L){L=n.extend(true,L,n.extend(true,{},n.ajaxSettings,L));var V,E=/=\?(&|$)/g,Q,U,F=L.type.toUpperCase();if(L.data&&L.processData&&typeof L.data!=="string"){L.data=n.param(L.data)}if(L.dataType=="jsonp"){if(F=="GET"){if(!L.url.match(E)){L.url+=(L.url.match(/\?/)?"&":"?")+(L.jsonp||"callback")+"=?"}}else{if(!L.data||!L.data.match(E)){L.data=(L.data?L.data+"&":"")+(L.jsonp||"callback")+"=?"}}L.dataType="json"}if(L.dataType=="json"&&(L.data&&L.data.match(E)||L.url.match(E))){V="jsonp"+q++;if(L.data){L.data=(L.data+"").replace(E,"="+V+"$1")}L.url=L.url.replace(E,"="+V+"$1");L.dataType="script";l[V]=function(W){U=W;H();K();l[V]=g;try{delete l[V]}catch(X){}if(G){G.removeChild(S)}}}if(L.dataType=="script"&&L.cache==null){L.cache=false}if(L.cache===false&&F=="GET"){var D=e();var T=L.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+D+"$2");L.url=T+((T==L.url)?(L.url.match(/\?/)?"&":"?")+"_="+D:"")}if(L.data&&F=="GET"){L.url+=(L.url.match(/\?/)?"&":"?")+L.data;L.data=null}if(L.global&&!n.active++){n.event.trigger("ajaxStart")}var P=/^(\w+:)?\/\/([^\/?#]+)/.exec(L.url);if(L.dataType=="script"&&F=="GET"&&P&&(P[1]&&P[1]!=location.protocol||P[2]!=location.host)){var G=document.getElementsByTagName("head")[0];var S=document.createElement("script");S.src=L.url;if(L.scriptCharset){S.charset=L.scriptCharset}if(!V){var N=false;S.onload=S.onreadystatechange=function(){if(!N&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){N=true;H();K();G.removeChild(S)}}}G.appendChild(S);return g}var J=false;var I=L.xhr();if(L.username){I.open(F,L.url,L.async,L.username,L.password)}else{I.open(F,L.url,L.async)}try{if(L.data){I.setRequestHeader("Content-Type",L.contentType)}if(L.ifModified){I.setRequestHeader("If-Modified-Since",n.lastModified[L.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}I.setRequestHeader("X-Requested-With","XMLHttpRequest");I.setRequestHeader("Accept",L.dataType&&L.accepts[L.dataType]?L.accepts[L.dataType]+", */*":L.accepts._default)}catch(R){}if(L.beforeSend&&L.beforeSend(I,L)===false){if(L.global&&!--n.active){n.event.trigger("ajaxStop")}I.abort();return false}if(L.global){n.event.trigger("ajaxSend",[I,L])}var M=function(W){if(I.readyState==0){if(O){clearInterval(O);O=null;if(L.global&&!--n.active){n.event.trigger("ajaxStop")}}}else{if(!J&&I&&(I.readyState==4||W=="timeout")){J=true;if(O){clearInterval(O);O=null}Q=W=="timeout"?"timeout":!n.httpSuccess(I)?"error":L.ifModified&&n.httpNotModified(I,L.url)?"notmodified":"success";if(Q=="success"){try{U=n.httpData(I,L.dataType,L)}catch(Y){Q="parsererror"}}if(Q=="success"){var X;try{X=I.getResponseHeader("Last-Modified")}catch(Y){}if(L.ifModified&&X){n.lastModified[L.url]=X}if(!V){H()}}else{n.handleError(L,I,Q)}K();if(L.async){I=null}}}};if(L.async){var O=setInterval(M,13);if(L.timeout>0){setTimeout(function(){if(I){if(!J){M("timeout")}if(I){I.abort()}}},L.timeout)}}try{I.send(L.data)}catch(R){n.handleError(L,I,null,R)}if(!L.async){M()}function H(){if(L.success){L.success(U,Q)}if(L.global){n.event.trigger("ajaxSuccess",[I,L])}}function K(){if(L.complete){L.complete(I,Q)}if(L.global){n.event.trigger("ajaxComplete",[I,L])}if(L.global&&!--n.active){n.event.trigger("ajaxStop")}}return I},handleError:function(E,G,D,F){if(E.error){E.error(G,D,F)}if(E.global){n.event.trigger("ajaxError",[G,E,F])}},active:0,httpSuccess:function(E){try{return !E.status&&location.protocol=="file:"||(E.status>=200&&E.status<300)||E.status==304||E.status==1223}catch(D){}return false},httpNotModified:function(F,D){try{var G=F.getResponseHeader("Last-Modified");return F.status==304||G==n.lastModified[D]}catch(E){}return false},httpData:function(I,G,F){var E=I.getResponseHeader("content-type"),D=G=="xml"||!G&&E&&E.indexOf("xml")>=0,H=D?I.responseXML:I.responseText;if(D&&H.documentElement.tagName=="parsererror"){throw"parsererror"}if(F&&F.dataFilter){H=F.dataFilter(H,G)}if(typeof H==="string"){if(G=="script"){n.globalEval(H)}if(G=="json"){H=l["eval"]("("+H+")")}}return H},param:function(D){var F=[];function G(H,I){F[F.length]=encodeURIComponent(H)+"="+encodeURIComponent(I)}if(n.isArray(D)||D.jquery){n.each(D,function(){G(this.name,this.value)})}else{for(var E in D){if(n.isArray(D[E])){n.each(D[E],function(){G(E,this)})}else{G(E,n.isFunction(D[E])?D[E]():D[E])}}}return F.join("&").replace(/%20/g,"+")}});var m={},d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function s(E,D){var F={};n.each(d.concat.apply([],d.slice(0,D)),function(){F[this]=E});return F}n.fn.extend({show:function(I,K){if(I){return this.animate(s("show",3),I,K)}else{for(var G=0,E=this.length;G<E;G++){var D=n.data(this[G],"olddisplay");this[G].style.display=D||"";if(n.css(this[G],"display")==="none"){var F=this[G].tagName,J;if(m[F]){J=m[F]}else{var H=n("<"+F+" />").appendTo("body");J=H.css("display");if(J==="none"){J="block"}H.remove();m[F]=J}this[G].style.display=n.data(this[G],"olddisplay",J)}}return this}},hide:function(G,H){if(G){return this.animate(s("hide",3),G,H)}else{for(var F=0,E=this.length;F<E;F++){var D=n.data(this[F],"olddisplay");if(!D&&D!=="none"){n.data(this[F],"olddisplay",n.css(this[F],"display"))}this[F].style.display="none"}return this}},_toggle:n.fn.toggle,toggle:function(F,E){var D=typeof F==="boolean";return n.isFunction(F)&&n.isFunction(E)?this._toggle.apply(this,arguments):F==null||D?this.each(function(){var G=D?F:n(this).is(":hidden");n(this)[G?"show":"hide"]()}):this.animate(s("toggle",3),F,E)},fadeTo:function(D,F,E){return this.animate({opacity:F},D,E)},animate:function(H,E,G,F){var D=n.speed(E,G,F);return this[D.queue===false?"each":"queue"](function(){var J=n.extend({},D),L,K=this.nodeType==1&&n(this).is(":hidden"),I=this;for(L in H){if(H[L]=="hide"&&K||H[L]=="show"&&!K){return J.complete.call(this)}if((L=="height"||L=="width")&&this.style){J.display=n.css(this,"display");J.overflow=this.style.overflow}}if(J.overflow!=null){this.style.overflow="hidden"}J.curAnim=n.extend({},H);n.each(H,function(N,R){var Q=new n.fx(I,J,N);if(/toggle|show|hide/.test(R)){Q[R=="toggle"?K?"show":"hide":R](H)}else{var P=R.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),S=Q.cur(true)||0;if(P){var M=parseFloat(P[2]),O=P[3]||"px";if(O!="px"){I.style[N]=(M||1)+O;S=((M||1)/Q.cur(true))*S;I.style[N]=S+O}if(P[1]){M=((P[1]=="-="?-1:1)*M)+S}Q.custom(S,M,O)}else{Q.custom(S,R,"")}}});return true})},stop:function(E,D){var F=n.timers;if(E){this.queue([])}this.each(function(){for(var G=F.length-1;G>=0;G--){if(F[G].elem==this){if(D){F[G](true)}F.splice(G,1)}}});if(!D){this.dequeue()}return this}});n.each({slideDown:s("show",1),slideUp:s("hide",1),slideToggle:s("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(D,E){n.fn[D]=function(F,G){return this.animate(E,F,G)}});n.extend({speed:function(F,G,E){var D=typeof F==="object"?F:{complete:E||!E&&G||n.isFunction(F)&&F,duration:F,easing:E&&G||G&&!n.isFunction(G)&&G};D.duration=n.fx.off?0:typeof D.duration==="number"?D.duration:n.fx.speeds[D.duration]||n.fx.speeds._default;D.old=D.complete;D.complete=function(){if(D.queue!==false){n(this).dequeue()}if(n.isFunction(D.old)){D.old.call(this)}};return D},easing:{linear:function(F,G,D,E){return D+E*F},swing:function(F,G,D,E){return((-Math.cos(F*Math.PI)/2)+0.5)*E+D}},timers:[],timerId:null,fx:function(E,D,F){this.options=D;this.elem=E;this.prop=F;if(!D.orig){D.orig={}}}});n.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(n.fx.step[this.prop]||n.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(E){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var D=parseFloat(n.css(this.elem,this.prop,E));return D&&D>-10000?D:parseFloat(n.curCSS(this.elem,this.prop))||0},custom:function(H,G,F){this.startTime=e();this.start=H;this.end=G;this.unit=F||this.unit||"px";this.now=this.start;this.pos=this.state=0;var D=this;function E(I){return D.step(I)}E.elem=this.elem;n.timers.push(E);if(E()&&n.timerId==null){n.timerId=setInterval(function(){var J=n.timers;for(var I=0;I<J.length;I++){if(!J[I]()){J.splice(I--,1)}}if(!J.length){clearInterval(n.timerId);n.timerId=null}},13)}},show:function(){this.options.orig[this.prop]=n.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());n(this.elem).show()},hide:function(){this.options.orig[this.prop]=n.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(G){var F=e();if(G||F>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var D=true;for(var E in this.options.curAnim){if(this.options.curAnim[E]!==true){D=false}}if(D){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(n.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){n(this.elem).hide()}if(this.options.hide||this.options.show){for(var H in this.options.curAnim){n.attr(this.elem.style,H,this.options.orig[H])}}}if(D){this.options.complete.call(this.elem)}return false}else{var I=F-this.startTime;this.state=I/this.options.duration;this.pos=n.easing[this.options.easing||(n.easing.swing?"swing":"linear")](this.state,I,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};n.extend(n.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(D){n.attr(D.elem.style,"opacity",D.now)},_default:function(D){if(D.elem.style&&D.elem.style[D.prop]!=null){D.elem.style[D.prop]=D.now+D.unit}else{D.elem[D.prop]=D.now}}}});if(document.documentElement.getBoundingClientRect){n.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return n.offset.bodyOffset(this[0])}var F=this[0].getBoundingClientRect(),I=this[0].ownerDocument,E=I.body,D=I.documentElement,K=D.clientTop||E.clientTop||0,J=D.clientLeft||E.clientLeft||0,H=F.top+(self.pageYOffset||n.boxModel&&D.scrollTop||E.scrollTop)-K,G=F.left+(self.pageXOffset||n.boxModel&&D.scrollLeft||E.scrollLeft)-J;return{top:H,left:G}}}else{n.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return n.offset.bodyOffset(this[0])}n.offset.initialized||n.offset.initialize();var I=this[0],F=I.offsetParent,E=I,N=I.ownerDocument,L,G=N.documentElement,J=N.body,K=N.defaultView,D=K.getComputedStyle(I,null),M=I.offsetTop,H=I.offsetLeft;while((I=I.parentNode)&&I!==J&&I!==G){L=K.getComputedStyle(I,null);M-=I.scrollTop,H-=I.scrollLeft;if(I===F){M+=I.offsetTop,H+=I.offsetLeft;if(n.offset.doesNotAddBorder&&!(n.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(I.tagName))){M+=parseInt(L.borderTopWidth,10)||0,H+=parseInt(L.borderLeftWidth,10)||0}E=F,F=I.offsetParent}if(n.offset.subtractsBorderForOverflowNotVisible&&L.overflow!=="visible"){M+=parseInt(L.borderTopWidth,10)||0,H+=parseInt(L.borderLeftWidth,10)||0}D=L}if(D.position==="relative"||D.position==="static"){M+=J.offsetTop,H+=J.offsetLeft}if(D.position==="fixed"){M+=Math.max(G.scrollTop,J.scrollTop),H+=Math.max(G.scrollLeft,J.scrollLeft)}return{top:M,left:H}}}n.offset={initialize:function(){if(this.initialized){return}var K=document.body,E=document.createElement("div"),G,F,M,H,L,D,I=K.style.marginTop,J='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"cellpadding="0"cellspacing="0"><tr><td></td></tr></table>';L={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(D in L){E.style[D]=L[D]}E.innerHTML=J;K.insertBefore(E,K.firstChild);G=E.firstChild,F=G.firstChild,H=G.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(F.offsetTop!==5);this.doesAddBorderForTableAndCells=(H.offsetTop===5);G.style.overflow="hidden",G.style.position="relative";this.subtractsBorderForOverflowNotVisible=(F.offsetTop===-5);K.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(K.offsetTop===0);K.style.marginTop=I;K.removeChild(E);this.initialized=true},bodyOffset:function(D){n.offset.initialized||n.offset.initialize();var F=D.offsetTop,E=D.offsetLeft;if(n.offset.doesNotIncludeMarginInBodyOffset){F+=parseInt(n.curCSS(D,"marginTop",true),10)||0,E+=parseInt(n.curCSS(D,"marginLeft",true),10)||0}return{top:F,left:E}}};n.fn.extend({position:function(){var H=0,G=0,E;if(this[0]){var F=this.offsetParent(),I=this.offset(),D=/^body|html$/i.test(F[0].tagName)?{top:0,left:0}:F.offset();I.top-=j(this,"marginTop");I.left-=j(this,"marginLeft");D.top+=j(F,"borderTopWidth");D.left+=j(F,"borderLeftWidth");E={top:I.top-D.top,left:I.left-D.left}}return E},offsetParent:function(){var D=this[0].offsetParent||document.body;while(D&&(!/^body|html$/i.test(D.tagName)&&n.css(D,"position")=="static")){D=D.offsetParent}return n(D)}});n.each(["Left","Top"],function(E,D){var F="scroll"+D;n.fn[F]=function(G){if(!this[0]){return null}return G!==g?this.each(function(){this==l||this==document?l.scrollTo(!E?G:n(l).scrollLeft(),E?G:n(l).scrollTop()):this[F]=G}):this[0]==l||this[0]==document?self[E?"pageYOffset":"pageXOffset"]||n.boxModel&&document.documentElement[F]||document.body[F]:this[0][F]}});n.each(["Height","Width"],function(G,E){var D=G?"Left":"Top",F=G?"Right":"Bottom";n.fn["inner"+E]=function(){return this[E.toLowerCase()]()+j(this,"padding"+D)+j(this,"padding"+F)};n.fn["outer"+E]=function(I){return this["inner"+E]()+j(this,"border"+D+"Width")+j(this,"border"+F+"Width")+(I?j(this,"margin"+D)+j(this,"margin"+F):0)};var H=E.toLowerCase();n.fn[H]=function(I){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+E]||document.body["client"+E]:this[0]==document?Math.max(document.documentElement["client"+E],document.body["scroll"+E],document.documentElement["scroll"+E],document.body["offset"+E],document.documentElement["offset"+E]):I===g?(this.length?n.css(this[0],H):null):this.css(H,typeof I==="string"?I:I+"px")}})})();

function safeWrap(f) {
	return function() {
		setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
	};
}
unsafeWindow._getMafiaGift = safeWrap(_getMafiaGift);
unsafeWindow._getCafeGift = safeWrap(_getCafeGift);
unsafeWindow._getFarmVilleGift = safeWrap(_getFarmVilleGift);
unsafeWindow._getPokerGift = safeWrap(_getPokerGift);
unsafeWindow._getVampire = safeWrap(_getVampire);
unsafeWindow._getCage = safeWrap(_getCage);
unsafeWindow._getYoville = safeWrap(_getYoville);
unsafeWindow._acceptFriends = safeWrap(_acceptFriends);
unsafeWindow._getFishVilleGift = safeWrap(_getFishVilleGift);
unsafeWindow._getWarMachine = safeWrap(_getWarMachine);
unsafeWindow._getStreetRacing = safeWrap(_getStreetRacing);
unsafeWindow._getHappyAquarium = safeWrap(_getHappyAquarium);
unsafeWindow._getTreasureMadness = safeWrap(_getTreasureMadness);
unsafeWindow._getTreasureIsle = safeWrap(_getTreasureIsle);

(function(E){E.fn.drag=function(L,K,J){if(K){this.bind("dragstart",L)}if(J){this.bind("dragend",J)}return !L?this.trigger("drag"):this.bind("drag",K?K:L)};var A=E.event,B=A.special,F=B.drag={not:":input",distance:0,which:1,dragging:false,setup:function(J){J=E.extend({distance:F.distance,which:F.which,not:F.not},J||{});J.distance=I(J.distance);A.add(this,"mousedown",H,J);if(this.attachEvent){this.attachEvent("ondragstart",D)}},teardown:function(){A.remove(this,"mousedown",H);if(this===F.dragging){F.dragging=F.proxy=false}G(this,true);if(this.detachEvent){this.detachEvent("ondragstart",D)}}};B.dragstart=B.dragend={setup:function(){},teardown:function(){}};function H(L){var K=this,J,M=L.data||{};if(M.elem){K=L.dragTarget=M.elem;L.dragProxy=F.proxy||K;L.cursorOffsetX=M.pageX-M.left;L.cursorOffsetY=M.pageY-M.top;L.offsetX=L.pageX-L.cursorOffsetX;L.offsetY=L.pageY-L.cursorOffsetY}else{if(F.dragging||(M.which>0&&L.which!=M.which)||E(L.target).is(M.not)){return }}switch(L.type){case"mousedown":E.extend(M,E(K).offset(),{elem:K,target:L.target,pageX:L.pageX,pageY:L.pageY});A.add(document,"mousemove mouseup",H,M);G(K,false);F.dragging=null;return false;case !F.dragging&&"mousemove":if(I(L.pageX-M.pageX)+I(L.pageY-M.pageY)<M.distance){break}L.target=M.target;J=C(L,"dragstart",K);if(J!==false){F.dragging=K;F.proxy=L.dragProxy=E(J||K)[0]}case"mousemove":if(F.dragging){J=C(L,"drag",K);if(B.drop){B.drop.allowed=(J!==false);B.drop.handler(L)}if(J!==false){break}L.type="mouseup"}case"mouseup":A.remove(document,"mousemove mouseup",H);if(F.dragging){if(B.drop){B.drop.handler(L)}C(L,"dragend",K)}G(K,true);F.dragging=F.proxy=M.elem=false;break}return true}function C(M,K,L){M.type=K;var J=E.event.handle.call(L,M);return J===false?false:J||M.result}function I(J){return Math.pow(J,2)}function D(){return(F.dragging===false)}function G(K,J){if(!K){return }K.unselectable=J?"off":"on";K.onselectstart=function(){return J};if(K.style){K.style.MozUserSelect=J?"":"none"}}})(jQuery);
if (GM_getValue("imageType") == undefined) {
	imageType = 1;
	GM_setValue("imageType","1");
}else{
	imageType = GM_getValue("imageType");
}
var image = new Object();
image = {
	expand:{
		'1': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUI/8QAKxAAAgEDAwEIAQUAAAAAAAAAAQIDBAURABIhBgcTFCIxYXGBQSMlMlFT/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABFB/9oADAMBAAIRAxEAPwDQvUfUdq6b6cmu9ZEGjpkXbGoG53bCog+WP166A3F1B2isniJLdZo3dPErYi0huAp8+h5ClvfH1njSBVarxbr1Y1uFPEqrNG26MgZRhwyn4OgMdoFnkv8A009DHMlLLBLFURzyn9Ne6bzF+Dxs3fetCO9DSr2u+Oy4ZqEVr84AcA0v9Dy7Fz8+3GmhH0tRy2y0GnkkSaSeSSZ5Y/4HvDxt9sY0FSWnpqiB4plSWGZSskbgMrKwwQQeCCNSgBT9kVFBfjIlT+w43LR7m7wHdnud3+eec53fj182oH6wwQwhIwscca4RVwAqgcAD8AatH//Z",
		'2': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAFvSURBVDiNxZPNK0RRGMafc+e4c+cayajx0fiKlFKaTJFpsjNL2SlZ2dlI2czC2tpClso/4C/AMMpXRE2INDGjK0ZRN8a558NKGZ1ElGf59jy/3qfelyil8BsZv0r/BYDqhiOLbQSAsKkFi1qwqAlqmGp+LOP7FqDEGABCRmNToD4KgxCsZZelzqutwCQDkwxcClwVLyCVApNcW0ELWJ2+VyXOwIWAJzmEFGDc0wLKKrTNEgLAtU2ieiP9EEqCSw8SCo2hTt/EUtS1qKkWxnertACXIRCgPjvWPIi+1gScp2t4wsPtYwE9TQmY1KwsFE+/qGDguSRFx8b5unOQ30YoWA/DMFETDGMvt4aTm0NwJeyPEfL5EutSBAbQ5acknexKhqORARzlM7i8O5ZBvx1cmcy9fAkAgIYUAYDuACXpeHu89szZl4GKyurNmQf3s9fQBOHMKRAg+8rV0E5uS74KFnoPDy+0lAG0G/xE//9Mb+lLk6Y2f2UOAAAAAElFTkSuQmCC"
	},
	collapse:{
		'1': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUI/8QAKxAAAgEDAwMCBQUAAAAAAAAAAQIDBAUSABEhBhNBBzIUFSIxURZhcoGh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/ANHXS8Wiy2SW53DCOkpYw0jYgnwAAPJZiAB+dAUpuvepJ6X5r+jnSyFcxKZo/iO39+52cd/b4/3bQLqS42252la6jVWgqIyyNiAfIIP7g8HQDPUq03O/dMG329FeoSeCURO2KuqPyGJ42AOX9a0IcN1pm9V2n+csfoERpwSYRJhgaTPfH3fX7fdx79Aq6QpKy2WZqWpQRySSyyGJTuqBjwAR42G+gq1VLFVUktOzlFnjaMvG+DgONt1ccqeeCNSgNF6bW2HqjtR25V6dFDhl3efiM/593fHz9tQO44I4adYw5YRoFDO2THEbbsx5J/J1aP/Z",
		'2': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAF3SURBVDiNxZNLSwJRFMf/9zF3zKyIHjCU9qLSIArTyB6oiPYZWvQJ+gDhorWtok2bln2D9kkrF25a9YCoTRSG9MCaHJ0ZvS0kWjgiUdBZ3vO7Pzh/ziFSSvym6K9+/4WAt2qEdztQtau9hiWfyyZCDxl5BgBamqCQ+R6bOGWQ2tdQsavdhlUu+bUwcre5Z8OWsUJGnrcdYePQD7dwdapMKYV8UayMp5AMrPepnGS1NAm0FahcdKpU1eeHI1iaSKD4fo/54QgS08lBlZLsYJpMDGyT1gKFMH1mKIjwWByvehH1uokX/REL3giiUzHNRdkNAPcX3xSi4EK/e7qCaZueWe8qPsw3aD0+nF4f4+w+rzMq4REwWgoONvNds1sEoWCtNuddo5wqYITi9ulSXuzUu9pmAADLi0EiuAJGGRTKwRlDB1cR3yNNrOMeCNp4poRgpH8SVs2CoMIJdRbQBkxOzo9kxTZRsStwCUUCo02s4yL9pP7/mD4BeBly2a+DLaYAAAAASUVORK5CYII%3D"
	},
	accept:{
		'1': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABgUCCP/EACoQAAIABAQFAwUAAAAAAAAAAAECAwQFEQAGEiETMkFRYQciMSMlQrHB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AOmoPA4SfTXlHQdsWDTvKIjO6w0RAWd2AAAG5JPQDCCFQ810jMCVFZKXISU9vFdAFcOG0svbl+DviCHnrM2YaJS4M/S4CRoEvE+4awWtCtsdrWW/M3TbzjQI5n9SmzNJSFDoKOJqpkCchm4K77QdXwQSNTMPxHkjED/L9Ng0WkQ6dAF7C8eN1iRG5nP87DFFLTDZd9JVhuDYgg/u+JQaoXp3lqiV2ZrEgrLFjqVhS7EGFA1c/BFrjV5JsNhtgErBApNxsMKP/9k%3D",
		'2': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC"
	},
	log:{
		'1': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAABAUAAgYH/8QAKhAAAQQBAwIDCQAAAAAAAAAAAgEDBAURAAYSExQhIkEHMUJFUVKBtMH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AO+zLC0O4bqasYbStwgluuymyc5c3CaQRQCDGOGfzoI8W6IzJyJUqoajNJzecKO8iIKe9c9XQKan2kVtvdu1bcJAjvC4kOR8RKAKS8xx5UVEXGguMsh384KJ8lZ/ceT+a1Bjd5X8zdcqRTU7q9xVyHAdrFIR7pGy4ddslwhdMkXIL6eZNQaDYlPX06zovg/dsdMLF/C8Q67aOg20v28STK+q6oMtqncabhC6ozr3OcEYLzE83m0Tg+bwmBMg7nPVwqLjGPXPhAHEq97Q3HHIlbtiO46qk6405LAjUlyqkoxkVcr9dNDHb1RbRZVvZXDkXvLNxk1ahk4TLYx44sJg3RbJVXhlfL4aD//Z",
		'2': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADoSURBVBgZBcExblNBGAbA2ceegTRBuIKOgiihSZNTcC5LUHAihNJR0kGKCDcYJY6D3/77MdOinTvzAgCw8ysThIvn/VojIyMjIyPP+bS1sUQIV2s95pBDDvmbP/mdkft83tpYguZq5Jh/OeaYh+yzy8hTHvNlaxNNczm+la9OTlar1UdA/+C2A4trRCnD3jS8BB1obq2Gk6GU6QbQAS4BUaYSQAf4bhhKKTFdAzrAOwAxEUAH+KEM01SY3gM6wBsEAQB0gJ+maZoC3gI6iPYaAIBJsiRmHU0AALOeFC3aK2cWAACUXe7+AwO0lc9eTHYTAAAAAElFTkSuQmCC"
	},
	settings:{
		'1': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUI/8QALBAAAQMDAwIFAwUAAAAAAAAAAQIFEQMEEgATIQYUBxUiMVEWF2IyQWFxgf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwDSV24Nba2Kvb3ClbUEJNRZTPvCQIAkkkwNAePiR0v5um0BomwNvvFw/YL5O1hjMwP7niNBftHJrc2rvbLCrb1kKwXjHtIIIPIIOgFeJV690+m6vZduLFKFhz34y2/SKe3lxllP8zjHOtUBEunQX0EQrH6gxMfr39/Lj8dvH/I/LUDbwwv3up06nuthTaUgN+zGY5UKgqY8TPzzMzqhM5tLa7N1awv6aa9pcACpTkj2IUCFJIIIIBBGoCn2l6Y8/Q4Y0/LU23bqaMPQV4lG9u55ZQficvVlOoFDUzNbM2osG+mmhaUQSlMkmTySVKJJJ+Tqj//Z",
		'2': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEkSURBVCjPbdE9S0IBGIbhxxobWxP8D8r5I60RLg0NNTS21VBRQwg1aA4VOAWBpBVCFhKUtkVJtPQx9GFFWh49x3P0bvAjjsWzXrzvcAtpREEZfQtoACEkpKBVdpouv7NYi3SJkAynWcXExKTCJ6+4PLPeIZJPhksdmzp1vilTwqVGlWhEgR6wsbGpU+OLt94rGfJ1gIOLi4OFSYV3Sjx5QXdtkiHFx//gjiwlTshyT5LV3T8gwy3HFLnhkCuWmB3qA0Uu2WGOZVIUmN/ru5CiwAsLNLCI8cg+i3hAggMeiNOgwQbXRJnwghoX5DkiTow0OcLJ8HAbtLpkkzwJCuTY4pQppgeFFLJNtxMrzSRFtlnhvDXO6Fk7ll8hb+wZxpChoPzoB6aiXIYcSLDWAAAAAElFTkSuQmCC"
	},
	ignore:{
		'1': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAwAFBwj/xAArEAABAwMDAgQHAQAAAAAAAAABAgURAwQSACFBFTEGEyIyFBYjJENigfD/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDpG9cmtsbDeXuFOhRQMlYiSeABySew0BofmBTR1gVKXT8czWgbcYx3ynbHvOqJYOzS7NRvLHFdGolQ9oCkqA3SocEagqn69akM111kUw1pR9wakxHERvlMY47z231oYGp22WaZu/l/4uAT/Yn8Xn+V/o1kbx4cvWhbFbdEwLapH0inv+2fOc+6d51oK7srW9NlVvcKYrWtwPUJgg90qSobhQO4OoBR4W8PoYegC1plpKPLVbnnnIq92c+rKZnfQM1MzWzNlOwb6aaNrQBxTMknlSlHck8k6D//2Q%3D%3D",
		'2': "data:image/gif;base64,R0lGODlhEAAQALMOAP8zAMopAJMAAP/M//+DIP8pAP86Av9MDP9sFP9zHv9aC/9gFf9+HJsAAP///wAAACH5BAEAAA4ALAAAAAAQABAAAARU0MlJKw3B4hrGyFP3hQNBjE5nooLJMF/3msIkJAmCeDpeU4LFQkFUCH8VwWHJRHIM0CiIMwBYryhS4XotZDuFLUAg6LLC1l/5imykgW+gU0K22C0RADs%3D"
	},
	trash:{
		'1': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAABgQHCP/EAC4QAAAFAwIDBgcBAAAAAAAAAAECAwQFERITAAYUITEHFSIyQXEXIzM0QlFigf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwDREtuCDg2KK0gJUwUCxIMYmuMBa08JTU9x0A0e0wMPEA7jgNbkCP4N1l6Vw5q47vxv8tefTQMIncUHOsF1Y+0+Mtq5bBLYYxa08RS19w0B/f0gVrtJ88M1buFGeIUAdJEXIUTrpoiNqgCFbVB1qive83vEFR4eJ8USaYu7rbdCtzOMXT+aXf7T01kP+z6RK72o3eA1bt1XQq5+FRIgUwkVOmAiVMACtpdaEjekE5ntqP4pkqkk6dgjiUWEwJhjXTWG4SAc3MExDkGoAvw239nKtxMNUsUMNTM7+kLcW+T7fz0NX9agcbKgHUBtVpFvlUVXLbMKiiJjCn8xU6gWicpDcgN6hqj/2Q%3D%3D",
		'2': "data:image/gif;base64,R0lGODlhEAAQAOZOAP///3F6hcopAJMAAP/M//Hz9OTr8ZqksMTL1P8pAP9MDP9sFP+DIP8zAO7x8/D1/LnEz+vx+Flha+Ln7OLm61hhayk0QCo1QMfR2eDo8b/K1M/U2pqiqcfP15WcpcLK05ymsig0P2lyftnf5naBi8XJzZ6lrJGdqmBqdKissYyZpf/+/puotNzk66ayvtbc4rC7x9Xd5n+KlbG7xpiirnJ+ivDz9KKrtrvH1Ojv9ePq8HF8h2x2gvj9/yYyPmRueFxlb4eRm+71+kFLVdrb3c/X4KOnrYGMl3uGke/0+5Sgq1ZfaY6Xn/X4+f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAE4ALAAAAAAQABAAAAexgE6CggGFAYOIiAEPEREPh4lOhpOUgwEAmJmaABuQAUktMUUYGhAwLiwnKp41REYmHB5MQUcyN0iQTjsAHU05ICM4SjMQJIg8AAgFBgcvE5gUJYgiycsHDisCApjagj/VzAACBATa5AJOKOAHAAMMDOTvA05A6w7tC/kL804V9uIKAipA52QJgA82dNAQRyBBgwYJyjmRgKmHkAztHA4YAJHfEB8hLFxI0W4AACcbnQQCADs%3D"
	},
	reload:{
		'1': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAQUGBwj/xAAtEAACAgEDAwAIBwAAAAAAAAABAgMEBQAGERIUIQcTIjFBcYGCFzJRU2GT0f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AOmUaqkCs6Iqqo6mIAA8fE6sCrD7rwOTmu109XFYoyyJNG/T5SNyolU+4qePpqBrMazVnKohDIeCAP01Rm3pBuLYzW28NfkMGHuzS9z7XQJHiC9CM3zbj7tANv7Bo0rt+zd4kSV7EVGssjcR1pCyKS3PUXMR+nz1YBsG722b3Fg6Mxs4ak8fbMW6xG8gPXGG+PBBH2/zoKjObewuex/ZZSBbFckOvkqysPcyOpBB8/741BK/gnsD9mf+86gqMHtzCYDHmni4Vrwcl39oszNx+ZmYkk+NUf/Z",
		'2': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHySURBVDjLtZPvT1JxFMb5O/gHskVzrrV+mFZomDdEDGkYKSXlRleY6IzcFdQ7lBgYeaELBNjFEpbWi9psRU7JnCa3VYTV/WfY01davkFk0/XivDp7Ps/Zc86RAZAdpmT/BWDLmun+5ZuS5X0P+paMML82SKZXeroqYGDttty22it6Po8iWeCxIAlI/5pF9Osj3M8MwPCsXex8ekVeEWAlYn+OxaKUxNx2FKmfcTzfjiH2ncNsnsfIOzu00RZxT4B1pZee3GTw4vdfVyEfxkTWAdfyMMJfHiL2LYgImcSyeAstgQt0GeBuxiQl8iEIP/iSW/eCrtiV0rLXkm3s1ThVnN6cQkj0w511osl7TioD9L29QcaNY64QhWvlHrrmtey/niasclCcEqrp81B669HoPo0yAEmaBBcpuTOZQegF9S6gdUaJqms0vdRL3JYXQdEHLueD9snlovpxc2qnd8nfiIues9gXYEx30INLFvAksB1IIPcAd9LdaPY1oEcw4HqiE2ecJ7DvHegSlGh/Y0FgywP3uhPeDRae9TG4P7nArjHQ8W2oG1KgIkATUcmpYJNonjeC+TCMyZJwFOMfR+BadaCdo3DcdhRVT5kkTZOkC/VjJ3GKqUNHSA3NTCsR1+BAz1RrPwaFtQYH/kZF/5GKa/wDDtK86rC6fMkAAAAASUVORK5CYII%3D"
	},
	donate:{
		'1': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAABwMFBgj/xAAtEAACAQIFAQQLAAAAAAAAAAABAgMEEQAFEhMhFQYUMUEHFyIyQ1FhcXKRof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwDplGpUp1Z1RURLsxAAAA5JOKMgPSn2XObd227Zfp4rynxNVvctfRbnV/MQa+Y0zUzlUQhkNiAPMYoo81qqfpNbHWttUJp5Uqpb20xGMh2vz4LfFBAayoyWr1r3XtFlCZYso3FMamhetsLqbESCp/K1/wBZC/luaxVmVUtRTR7dNUQRvCnhpR0BUW+gONiaSCnnheKULJDMpSSNuVZHFmU/MEG2M0H3qVyLre73ufomzbp+77e7uatOu19i3lfVq5viBBSCnggWOILHFEulEHAVVFgB9hi0f//Z",
		'2': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAk9JREFUeNpi/P//PwMMMDIywtm5U0P///sHkWNiYmSYnL0aLomsh4UBDeROC235+/d/NR8vF4OlhQpY7PiJOwxZk4L/MzExPQUaVgMUWgC3FNm0/OlhBVxc7P3GBgoM7OxsDP+BkBHsAiYGRqAr3n/4ynDy1B2GSVmrGLG64O+f/52aGtIMbGysDN9//GS4dfsFw88ffxh+/fnDICUpwCAlIQh0P8M/ZD0oBgBtZBMS4Gb4++8fw1Ggs6+ffJCze8HJEyA5vywbN3ltybbn99+04DSAk5MdzhYR4mZQ0JZQBDKngvibph25B6R2AfFDhh6EHpQwyJkc+tfMTIVJgJ8T6HdGhqfP3zG8e/eF4emz99+YmJnmMTEylgP9/w0l5pA5Bo5qvjZB+mtVVMRZpaUEgS5iA/mL4feffwwPH71iuHP3FQMzM1PcxMyVi7EaAEwHID9oB+TaeQhL8/uIiPNZKsiLAgNQECz/4eN3htNn7qCkCfR08BOIz22YfOgBkF4NxHx+ObZedu7aTSpKEgxCglwMsMSF1QBgOjgBVGAGZEYAbVkFEgM6me/r118M/yHRhAFQDABqNrc0V2V48PD1yprF8Sv/Ab0nDIwNeVlRBlAq//HjNyhwf+M0AATevP3MoK0lC7SZkeHv33/gdA/KI//+/mc4e+E+w/O7r5uQ1aMEooyqmL1HikUVOzebm5AAD4OFOSIvvP/wheHTm6/zljTtKAXqeYcrFpiBlDwQCwJz4xm03GgCZL4A4qc40wFydgYCYzTfncWWnQECDAAfee7hcYrG5QAAAABJRU5ErkJggg%3D%3D"
	},
}
var _imgShow = image.expand[imageType];
var _imgHide = image.collapse[imageType];
var _acceptAll = image.accept[imageType];
var _ignoreAll = image.ignore[imageType];;
var _imgLog = image.log[imageType];
var _imgSettings = image.settings[imageType];
var _imgUpdate = image.reload[imageType];//"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAQUGBwj/xAAtEAACAgEDAwAIBwAAAAAAAAABAgMEBQAGERIUIQcTIjFBcYGCFzJRU2GT0f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AOmUaqkCs6Iqqo6mIAA8fE6sCrD7rwOTmu109XFYoyyJNG/T5SNyolU+4qePpqBrMazVnKohDIeCAP01Rm3pBuLYzW28NfkMGHuzS9z7XQJHiC9CM3zbj7tANv7Bo0rt+zd4kSV7EVGssjcR1pCyKS3PUXMR+nz1YBsG722b3Fg6Mxs4ak8fbMW6xG8gPXGG+PBBH2/zoKjObewuex/ZZSBbFckOvkqysPcyOpBB8/741BK/gnsD9mf+86gqMHtzCYDHmni4Vrwcl39oszNx+ZmYkk+NUf/Z";
var _imgIgnore = image.trash[imageType];
var _donate = image.donate[imageType];
var _imgClose = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yMi8wOXtixLEAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAAA9ElEQVQYlXWQvarCQBSEv82KG4NFIGJhETdB0uUR9v1fwMZCjCnsFgKB/QkEb3W9Sq7TDXycmTnCGPM8Ho9kWcY3ee+53W6s6romhMD5fCbGuACVUmitOZ1OJEop+r7/F5RSEmPkfr+zXq9JAKZpQkpJ27avOlprtNYAhBAAWP1emeeZx+NB0zR475FScrlcPpKSd2OtxVrLdrtlGAbmef4OF0VBURR0Xcd+v+dwOHzAq3ez2+24Xq+M44j3njzPARBC/MFKKWKMHx2dczjnAF6jkxgjVVWRpunidUIIsiyjLEumaUIYY55aazabzQJ+T+m6jh86CmFbC+aRtAAAAABJRU5ErkJggg%3D%3D";
var _imgCloseHover = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yMi8wOXtixLEAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAABC0lEQVQYlXWRMauCYBSGH6VFR4Wm0M3ZNWfHoL0lpb/Qb3Cr0TUUBH+AQ7/A2dlRPwiiTzfX7w4RN2/dd3vh4ZzDc7Ttdqv2+z2O46CUQinF3wghyLIM7Xq9qtvtRlmWPB6PD9C2beI4xrIsdMuyKIriK2iaJlJK8jx/wgDjOGKaJkmSsFqtAIiiiCiKALjf7wAsXlOmaaKqKo7HI33fYxgG5/N5tkl/L3VdU9c1nufRNA3TNP0PB0FAEARkWUYYhmw2mxm8eC/r9Zo0TWnblq7r8H0fAE3TfmHbtpFScjqdZm6FEAA4jvM8YxgGDocDy+XyQ52u67iuy263Q0qJ9vrgS9m3CCG4XC78AIbyaugN8DI1AAAAAElFTkSuQmCC";
var _loading = "data:application/octet-stream;base64,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%3D%3D";
var _imgLoadingRed = "data:application/octet-stream;base64,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";
var _line = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AIg//2Q%3D%3D";
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var _appVersion = '0.2.18';
var _viso = 0;
var _groups = new Array();
var MWiframe = 0;
var MM2iframe = 0;
var _request = new Object();
var _appSettings = new Object();
var _appList = new Object();
_appSettings = {
	'app_10979261223_0':{
		'name':'Mafia wars',
		'functionName': 'unsafeWindow._getMafiaGift(\'app_10979261223_0\')'
	},
	'app_10979261223_1':{
		'name':'Mafia wars',
		'functionName': 'unsafeWindow._getMafiaGift(\'app_10979261223_1\')'
	},
	'app_10979261223_2':{
		'name':'Mafia wars',
		'functionName': 'unsafeWindow._getMafiaGift(\'app_10979261223_2\')'
	},
	'app_10979261223_3':{
		'name':'Mafia wars',
		'functionName': 'unsafeWindow._getMafiaGift(\'app_10979261223_2\')'
	},
	'app_102452128776_0':{
		'name':'Farmville',
		'functionName': 'unsafeWindow._getFarmVilleGift(\'app_102452128776_0\')'
	},
	'app_102452128776_1':{
		'name':'Farmville',
		'functionName': 'unsafeWindow._getFarmVilleGift(\'app_102452128776_1\')'
	},
	'app_102452128776_2':{
		'name':'Farmville',
		'functionName': 'unsafeWindow._getFarmVilleGift(\'app_102452128776_2\')'
	},

	'app_25287267406_0':{
		'name':'Vampire wars',
		'functionName': 'unsafeWindow._getVampire(\'app_25287267406_0\')'
	}, //wampire
	
	'app_25287267406_1':{
		'name':'Vampire wars',
		'functionName': 'unsafeWindow._getVampire(\'app_25287267406_1\')'
	}, //wampire

	'app_101539264719_0':{
		'name':'CafÃ©',
		'functionName': 'unsafeWindow._getCafeGift(\'app_101539264719_0\')'
	}, //cafe
	
	'app_101539264719_1':{
		'name':'CafÃ©',
		'functionName': 'unsafeWindow._getCafeGift(\'app_101539264719_1\')'
	}, //cafe

	'app_2389801228_0':{
		'name':'Poker',
		'functionName': 'unsafeWindow._getPokerGift(\'app_2389801228_0\')'
	}, //poker

	'app_46755028429_0':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_0\')'
	}, //ca
	'app_46755028429_1':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_1\')'
	}, //ca
	'app_46755028429_2':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_2\')'
	}, //ca
	'app_46755028429_3':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_3\')'
	}, //ca
	'app_46755028429_4':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_4\')'
	}, //ca
	'app_46755028429_5':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_5\')'
	}, //ca
	'app_21526880407_0':{
		'name':'Yoville',
		'functionName': 'unsafeWindow._getYoville(\'app_21526880407_0\')'
	}, //ca
	'app_21526880407_1':{
		'name':'Yoville',
		'functionName': 'unsafeWindow._getYoville(\'app_21526880407_1\')'
	}, //ca
	'app_21526880407_2':{
		'name':'Yoville',
		'functionName': 'unsafeWindow._getYoville(\'app_21526880407_2\')'
	}, //ca
	'friend_connect':{
		'name':'Friend request',
		'functionName': 'unsafeWindow._acceptFriends(\'friend_connect\')'
	},
	'app_151044809337_0':{
		'name':'FishVille',
		'functionName': 'unsafeWindow._getFishVilleGift(\'app_151044809337_0\')'
	},
	'app_151044809337_1':{
		'name':'FishVille',
		'functionName': 'unsafeWindow._getFishVilleGift(\'app_151044809337_1\')'
	},
	'app_32375531555_0':{
		'name':'Street racing',
		'functionName': 'unsafeWindow._getStreetRacing(\'app_32375531555_0\')'
	},
	'app_32375531555_1':{
		'name':'Street racing',
		'functionName': 'unsafeWindow._getStreetRacing(\'app_32375531555_1\')'
	},
	'app_134920244184_0':{
		'name':'Happy aquarium',
		'functionName': 'unsafeWindow._getHappyAquarium(\'app_134920244184_0\')'
	},
	'app_134920244184_1':{
		'name':'Happy aquarium',
		'functionName': 'unsafeWindow._getHappyAquarium(\'app_134920244184_1\')'
	},
	'app_134920244184_2':{
		'name':'Happy aquarium',
		'functionName': 'unsafeWindow._getHappyAquarium(\'app_134920244184_2\')'
	},
	'app_118674881342_0':{
		'name':'War Machine',
		'functionName': 'unsafeWindow._getWarMachine(\'app_118674881342_0\')'
	},
	'app_118674881342_1':{
		'name':'War Machine',
		'functionName': 'unsafeWindow._getWarMachine(\'app_118674881342_1\')'
	},
	'app_29518083188_0':{
		'name':'Treasure Madness',
		'functionName': 'unsafeWindow._getTreasureMadness(\'app_29518083188_0\')'
	},
	'app_234860566661_0':{
		'name':'Treasure Isle',
		'functionName': 'unsafeWindow._getTreasureIsle(\'app_234860566661_0\')'
	},
	'app_234860566661_1':{
		'name':'Treasure Isle',
		'functionName': 'unsafeWindow._getTreasureIsle(\'app_234860566661_1\')'
	},
	'app_234860566661_2':{
		'name':'Treasure Isle',
		'functionName': 'unsafeWindow._getTreasureIsle(\'app_234860566661_2\')'
	},
	'app_234860566661_3':{
		'name':'Treasure Isle',
		'functionName': 'unsafeWindow._getTreasureIsle(\'app_234860566661_3\')'
	}
}
GM_addStyle(
'.log {position:absolute; width:400px; background:#333; display:none; z-index:999; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.logHeader:hover { cursor:move; }'+
'.logHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.logBody { height:200px; color:#FFF; overflow:auto; padding:0; background:#191919; margin:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'.app {position:absolute; width:400px; background:#333; display:none; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.appHeader:hover { cursor:move; }'+
'.appHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.appBody { height:200px; color:#FFF; overflow:auto; padding:0; background:#191919; margin:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'.foto {position:absolute; background:#333; display:none; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.fotoHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.fotoBody { color:#FFF; overflow:auto; padding:0; background:#191919; margin:5px; padding:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'hr { padding:0; margin:0; border: 1px solid #333; border-top-color:#666;}'+
'.close { cursor:pointer; width:11px; height:11px; position:absolute;  top:5px; right:5px; background:url("'+_imgClose+'") }'+
'.close:hover { background:url("'+_imgCloseHover+'") }'+
'.settings {position:absolute; width:260px; background:#333; display:none; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.settingsHeader:hover { cursor:move; }'+
'.settingsHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.settingsBody {color:#FFF; padding:5px; background:#191919; margin:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'.settings input,select,textarea { font-size:11px; background:#333; border:#666 1px solid; color:#FFF; padding:0 2px; -moz-border-radius: 6px; -webkit-border-radius: 6px; }'+
'.log input,select,textarea { font-size:11px; background:#333; border:#666 1px solid; color:#FFF; padding:0 2px; -moz-border-radius: 6px; -webkit-border-radius: 6px; }'+
'.donation {position:absolute; width:500px; background:#333; top:60px; left:230px; z-index:999; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.donationHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.donationBody { height:auto; color:#FFF; overflow:auto; padding:20px 5px; background:#191919; margin:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'.donation input,select,textarea { font-size:11px; background:#333; border:#666 1px solid; color:#FFF; padding:0 2px; -moz-border-radius: 6px; -webkit-border-radius: 6px; }'+
'.line {margin-bottom:3px}'+
'.linetext {padding-left:10px}'+
'.lineRight {margin:2px 5px 5px 0;}'+
'.button {background:#000; border:#666 1px solid; color:#666; cursor:pointer;}'+
'.button:hover {color:#FFF; border-color:#FFF;}'+
'.bad {color:#F00;}'+
'.good2 {color:#0f0;}'+
'#aaa img { cursor:pointer; }'+
'#aaa { width:650px; padding:3px; }'+
'#imgList div {margin:0px 0px 0 5px;}'+
'.good {color:#CCCCCC}'+
'.version { font-size:9px; }'+
'.icon {margin:0 2px;}'
);
if (GM_getValue("AAGfirstTimeDon") == undefined) {
	GM_setValue("AAGfirstTimeDon",1);
	GM_deleteValue("AAGfirstTime");
	_getGroups();
//	$('<div class="donation"><div class="donationHeader">Donation<div class="close closedonation"></div></div><hr><div id="imgList" class="donationBody">Welcome, if you want to continue the scripts would be updated and maintained. I hope your understanding as this script development and maintenance requires a lot of my personal time, and if you like this, I hope your support.</div><div class="lineRight" align="right"><input type="button" class="button _donate" value="Donate"/><input type="button" class="button closedonation" value="close"/></div></div>').insertAfter('body');
}
function _accept(_id){
	var _data = "actions[reject]="+_request[_id].action+"&charset_test="+_request[_id].charset_test+"&fb_dtsg="+_request[_id].fb_dtsg+"&id="+_request[_id].type+"&params[app_id]="+_request[_id].reqType+"&params[from_id]="+_request[_id].appID+"&params[is_invite]="+_request[_id].isInvite+"&params[req_type]="+_request[_id].reqType+"&post_form_id="+_request[_id].id+"&post_form_id_source=AsyncRequest&status_div_id="+_request[_id].appID+"&type="+_request[_id].status;
	GM_xmlhttpRequest({
		method: "POST", url: "http://www.facebook.com/ajax/reqs.php?__a=1", headers:{'Content-type':'application/x-www-form-urlencoded'}, data:_data,
		onload: function(postResp){
			$('#'+_request[_id].userID).html('Accepted');
		}
	});
}
function _cancel(_id){
	var _data = "actions[reject]="+_request[_id].action+"&charset_test="+_request[_id].charset_test+"&fb_dtsg="+_request[_id].fb_dtsg+"&id="+_request[_id].type+"&params[app_id]="+_request[_id].reqType+"&params[from_id]="+_request[_id].appID+"&params[is_invite]="+_request[_id].isInvite+"&params[req_type]="+_request[_id].reqType+"&post_form_id="+_request[_id].id+"&post_form_id_source=AsyncRequest&status_div_id="+_request[_id].appID+"&type="+_request[_id].status;
	if (_request[_id].appTitle == 'Friend request') _data = 'actions[reject]='+_request[_id].actionCancel+'&charset_test='+_request[_id].charset_test+'&confirm='+_request[_id].userID+'&fb_dtsg='+_request[_id].fb_dtsg+'&id='+_request[_id].userID+'&params[lists]=&post_form_id='+_request[_id].postForm+'&post_form_id_source=AsyncRequest&status_div_id='+_request[_id].status+'&type='+_request[_id].appName;
	GM_xmlhttpRequest({
		method: "POST", url: "http://www.facebook.com/ajax/reqs.php?__a=1", headers:{'Content-type':'application/x-www-form-urlencoded'}, data:_data,
		onload: function(postResp){
			$('#'+_request[_id].status).html('Canceled');
			delete _request[_id];
		}	
	});
}
function _viewAll(){
	$('.PYMK_Reqs_Sidebar').eq(0).hide();
	$("<div id='aaa'></div>").insertBefore('.confirm_boxes:eq(0)');	
	$('#aaa').append('<div id="foto" class="foto"><div class="fotoHeader">Photo</div><hr><div id="foroIMG" class="fotoBody"></div></div>');
	$('#aaa').append('<p>Welcome, if you want to continue the scripts would be updated and maintained. I hope your understanding as this script development and maintenance requires a lot of my personal time, and if you like this, I hope your <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=D3RVWU3UQQP42&lc=LT&item_name=Facebook%20request%20manager&item_number=20091209FBR&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted" target="_blank">support.</a></p><div class="main"><img src="' + _imgSettings + '" title="Settings" class="settingsImg icon"><img height="16" width="1" src="'+ _line +'"><img src="' + _imgLog + '" title="Show log" class="appLog icon" ><img height="16" width="1" src="'+ _line +'"><img src="' + _imgLog + '" title="Show application log" class="showApp icon" ><img height="16" width="1" src="'+ _line +'"><img src="'+_acceptAll+'" title="Accept all application" class="_acceptAllApp icon"><img height="16" width="1" src="'+ _line +'"><img src="' + _ignoreAll + '" title="Ignore all application" class="_cancelAllApp icon"><img height="16" width="1" src="'+ _line +'"><img src="' + _imgUpdate + '" title="Refresh" class="_refresh icon"><img height="16" width="1" src="'+ _line +'"><img src="'+_donate+'" title="Donate" class="_donate icon"></div>');
	_addOnclickEvent();
	$('#aaa').append('<div class="settings"><div class="settingsHeader">Settings<div class="close closeSettings"></div></div><hr><div class="settingsBody"><div class="version" align="right">version: '+_appVersion+'</div><div class="line"> Add friend to group: <select id="userSelect"></select> <div class="line">Message: </div><div class="line"><textarea id="txtMessage" cols="37" value=""/></div><div class="line">Icon type:</div><div><input type="radio" class="iconType" name="iconType" value="1"><img src="' + image.accept['1'] + '" title="Ignore all application">&nbsp;<input type="radio" class="iconType" name="iconType" value="2"><img src="' + image.accept['2'] + '" title="Ignore all application"></div><div align="center" class="line"><input type="button" id="update" class="button" value="Check for update"/></div > <div class="line" align="center"><input type="button" id="save" class="button" value="Save"/></div></div></div>');
	$('#aaa').append('<div class="log"><div class="logHeader">Request log<div class="close closeLog"></div></div><hr><div id="imgList" class="logBody"></div><div class="lineRight" align="right"><input type="button" id="clear" class="button" value="Clear"/></div></div>');
	$('#aaa').append('<div class="app"><div class="appHeader">App log<div class="close appclose"></div></div><hr><div id="appList" class="appBody"></div></div>');
	var _html = '<table cellpadding="0" cellspacing="0">'
	$('.confirm_boxes').each(function(){
		if($(this).find('span').length > 0){
			if ($(this).find('span').eq(0).attr('id') != 'fbpage_fan_label') var _appName = $(this).find('span').eq(0).attr('id').replace(/_main/,'').replace(/_label/,'');
			else var _appName = $(this).find('span').eq(0).attr('id').replace(/_label/,'_confirm');
			
			var _appTitle = $(this).find('span').eq(0).html();
			$(this).attr('appBlock',_appName)
			if($(this).attr('id') != 'friend_connect' && $(this).attr('id') != 'friend_suggestion' && $(this).attr('id') != 'event_invite' && $(this).attr('id') != 'group_invite' && $(this).attr('id') != 'fbpage_fan_confirm'){
				if($(this).find('i').length) _html += '<tr appMyBlock="'+_appName+'"><td><img class="' + $(this).find('i').eq(0).attr('class') + '"> ' + _appTitle + '</td>';
				else _html += '<tr appMyBlock="'+_appName+'"><td><img class="' + $(this).find('i').eq(0).attr('class') + '" src="' + $(this).find('img').eq(0).attr('src') + '"> ' + _appTitle + '</td>';
				$(this).find('form').each(function(){
					var tempArray = $(this).find('input[autocomplete="off"]');
					_request[$(this).find('.confirm').attr('id')] = {
						'appTitle': $(this).find('.info > a').eq(1).html(),
						'appName': _appName,
						'userName':$(this).find('.info > a').eq(0).html(), 
						'userID': tempArray.eq(4).val(),
						'appID': tempArray.eq(5).val(),
						'reqType': tempArray.eq(6).val(),
						'isInvite': tempArray.eq(7).val(),
						'photo': $(this).find('.image > a').eq(0).html(),
						'link': $(this).find('.inputbutton').eq(0).attr('name'),
						
						'postForm': tempArray.eq(0).val(),
						'id': tempArray.eq(1).val(),
						'type': tempArray.eq(2).val(),
						'status': tempArray.eq(3).val(),
						'charset_test': $(this).find('input[name="charset_test"]').val(),
						'fb_dtsg': $(this).find('input[name="fb_dtsg"]').val(),
						'action': $(this).find('.inputbutton').eq(1).attr('value')
					};
					$(this).find('.inputbutton').eq(0).attr('accept',$(this).find('.confirm').attr('id')+'_accept');
					$(this).find('.inputbutton').eq(1).attr('cancel',$(this).find('.confirm').attr('id')+'_cancel');
					_appList[_appName] = {
						'name':$(this).find('.info > a').eq(1).html()
					}
				});
				_html += '<td><img src="'+_imgShow+'" app="'+_appName.replace(/app_/,'confirm_')+'" class="_hideApp icon" title="Expand">'
				if(_appSettings[_appName]) {
					if(_appSettings[_appName].name == "Mafia wars"){
						if(MWiframe == 0){
							GM_xmlhttpRequest({ url: "http://apps.facebook.com/inthemafia/index.php", method:'get', 
								onload: function(resp){
									GM_xmlhttpRequest({ url: $('[name="mafiawars"]',resp.responseText).attr('src'), method:'get', data: $('[name="mafiawars"]',resp.responseText).attr('src'),
										onload: function(resp){
											for (var i in _appSettings){
												if(_appSettings[i].name == "Mafia wars"){
													_appSettings[i]["iframe"]=resp.finalUrl;
													$('<img src="'+_acceptAll+'" title="Accept" class="_acceptApp icon" app="'+i+'">').insertAfter("[app='"+i.replace(/app_/,'confirm_')+"']")
													_addAcceptEvent();
												}
											}
										}
									});
								}
							});
							MWiframe = 1;
						}
					}else _html += '<img src="'+_acceptAll+'" title="Accept" class="_acceptApp icon" app="'+_appName+'">'
				}
				_html += '<img src="'+_ignoreAll+'" class="_cancelApp icon" app="'+_appName+'" title="Cancel"></td>'
				_html += '<td width="50"><img align="right" src="'+_imgIgnore+'" class="_ignoreApp icon" app="'+_appName+'" title="Block"></td>'
				_html += '</tr>'
			}else if($(this).attr('id') == 'friend_connect') {
				_html += '<tr appMyBlock="'+_appName+'"><td> <img class="' + $(this).find('i').eq(0).attr('class') + '""> ' + _appTitle + '</td>';
				$(this).find('.confirm').each(function(){
					var tempArray = $(this).find('form > input')
					_request[$(this).attr('id')] = {
						'appTitle': 'Friend request',
						'appName': _appName,
						'userName':$(this).find('.info > a').eq(0).html(),
						'photo': $(this).find('.image > a').eq(0).html(),					
						'userID': tempArray.eq(5).val(),
						'postForm': tempArray.eq(2).val(),
						'status': tempArray.eq(6).val(),
						'type': tempArray.eq(4).val(),
						'charset_test': tempArray.eq(0).val(),
						'fb_dtsg': tempArray.eq(1).val(),
						'action': $(this).find('.inputbutton').eq(0).val(),
						'actionCancel': $(this).find('[name="actions[reject]"]').attr('value'),
						'msg': $(this).find('.msg_content').html()
					};
				});

				_html += '<td><img src="'+_imgShow+'" app="'+_appName.replace(/app_/,'confirm_')+'" class="_hideApp icon" title="Expand">'
				if(_appSettings[_appName]) _html += '<img src="'+_acceptAll+'" title="Accept" class="_acceptApp icon" app="'+_appName+'">'
				_html += '<img src="'+_ignoreAll+'" class="_cancelApp icon" app="'+_appName+'" title="Cancel">'
				_html += '</td></tr>'
			}
			else{
				_html += '<tr appMyBlock="'+_appName+'"><td><img class="' + $(this).find('i').eq(0).attr('class') + '"> ' + _appTitle + '</td>';
				_html += '<td><img src="'+_imgShow+'" app="'+_appName.replace(/app_/,'confirm_')+'" class="_hideApp icon" title="Expand"></td>'
				_html += '</tr>'
			}
		}
	});
	
	$('#aaa').append(_html+'</table>');
	$('#appList').append('<table cellpadding="0" cellspacing="0">');
	for (var i in _appList){
		var _class = _appSettings[i]?'good':'bad';
		$('#appList').append('<tr class="' + _class + ' linetext"><td>' + i + '&nbsp;&nbsp;&nbsp;</td><td>' + _appList[i].name + '</td></tr>')
	}
	$('#appList').append('</table>');
}
function count(_str){
	var temp = 0;
	for (var i in _request){
		if(_request[i].appName == _str) {
			temp++;
		}
	}
	return temp;
}
function _hideAll(){
	$('.confirm_boxes').each(function(){
		$(this).hide();
		$('.appShowHide').each(function(){
			$(this).attr('src',_imgShow);
		});
	});
}
function _getGroups(){
	var _usrGroup = ""; 
	GM_xmlhttpRequest({ url:"http://www.facebook.com/friends/?ref=tn", method:'get',
		onload: function(resp){ 
			$('.UIFilterList_Item > a',resp.responseText).each(function(){
				if ($(this).attr('href').split('=')[1] != undefined) {
					var _param = $(this).attr('href').split('=')[1].split('_'); 
					if(_param[0] == 'flp') { 
						_usrGroup += _param[1]+":"+$(this).find("div").eq(1).html()+","; 
					} 
				} 
			}); 
			GM_setValue("usrGroups",_usrGroup); 
			if (GM_getValue("setGroups") == undefined) { 
				GM_setValue("setGroups",_usrGroup.split(',')[0]); 
			} 
			_setSettings();
		} 
	}); 
}
function _getMyID(){
	var _link = $('[accesskey="6"]').attr("href");
	alert(_link);
	GM_xmlhttpRequest({ url:_link, method:'get',
		onload: function(resp){
			var _myID = $("#profileimage > a",resp.responseText).eq(0).attr("href").split("id=")[1];
			if(_myID){
				GM_setValue("myID",_myID);
			}
		}
	});
}
function _setSettings(){
	$('#userSelect').append('<option value="0">None..</option>')
	if (GM_getValue("usrGroups") != undefined){
		var _tmp = GM_getValue("usrGroups");
		_tmp = _tmp.split(',');
		for(var i=0; i < _tmp.length-1; i++){
			var _selected = "";
			if (GM_getValue("setGroups") == _tmp[i]) _selected = "selected"
			$('#userSelect').append('<option value="'+_tmp[i].split(":")[0]+'"' + _selected + '>'+_tmp[i].split(":")[1]+'</option>');
		}
	}
	if (GM_getValue("setMsg") != undefined) $('#txtMessage').val(GM_getValue("setMsg"));
	$('.iconType[value="'+GM_getValue("imageType")+'"]').attr('checked',true);
}
function _getCafeGift(_str){ 
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftCafeMain").html() == null) $("#imgList").append("<div id='giftCafeMain'>Accepting Cafe request...<div id='giftCafeBody' style='padding-left:10px'></div>Accepted <span id='giftCafeSum'>0</span> gift and/or <span id='neibCafeSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/track.php/,'accept_request.php').replace(/actions\[/,'').replace(/]/,'');
			if(url_array.action == "accept_gift") var _isGift = 1;
			else _isGift = 0;
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if(_isGift==1){
						if($('#app101539264719_gift_items > h1',resp.responseText).html()) {
							var _gift = /.*?this\s*(.*)\sfrom.*/.exec($('#app101539264719_gift_items > h1',resp.responseText).html());
							$("#giftCafeBody").append("<div>Accepted: <b>" + _gift[1] + "</b></div>");
							$("#giftCafeSum").html(parseInt($("#giftCafeSum").html(),10)+1);
							_accept(this.data);
						}
					}
					else{
						$("#giftCafeBody").append("<div>Added: <b>"+_request[this.data].userName+"</b> to neighbor.</div>");
						$("#neibCafeSum").html(parseInt($("#neibCafeSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
				}
			});		
		}
	}	
}
function _getStreetRacing(_str){ 
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftStreetRacingMain").html() == null) $("#imgList").append("<div id='giftStreetRacingMain'>Accepting Street Racing request...<div id='giftStreetRacingBody' style='padding-left:10px'></div>Accepted <span id='giftStreetRacingSum'>0</span> gift and/or <span id='neibStreetRacingSum'>0</span> crew.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			temp++;
			var _isGift = 0;
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			if(url_array.zy_track == "gift_request") {
				var _isGift = 1;
				_link = _link.replace(/track.php/,'giftAccept.php');
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
						var _resptxt = $('<div></div>').append(_resphtml.toString());
						temp++;
						if(_isGift==1){
							if($('.c > p',_resptxt).html()) {
								$("#giftStreetRacingBody").append("<div>Accepted: <b>" + $('.c > p',resp.responseText).html() + "</b></div>");
								$("#giftStreetRacingSum").html(parseInt($("#giftStreetRacingSum").html(),10)+1);
								_accept(this.data);
							}
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});	
			}
		}
		if(_isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}	
}
function _getHappyAquarium(_str){ 
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftHappyAquariumMain").html() == null) $("#imgList").append("<div id='giftHappyAquariumMain'>Accepting Happy Aquarium request...<div id='giftHappyAquariumBody' style='padding-left:10px'></div>Accepted <span id='giftHappyAquariumSum'>0</span> gift and/or <span id='neibHappyAquariumSum'>0</span> crew.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			temp++;
			var _isGift = 0;
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			if(url_array.target == "gift_page" || url_array.target == "send_credits") {
				var _isGift = 1;
				_link = _link.replace(/track.php/,'giftAccept.php');
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
						var _resptxt = $('<div></div>').append(_resphtml.toString());
						if(_isGift==1){
							var _gift = /(You have accepted your)(.*)(!)/.exec($('#app134920244184_update_message',_resptxt).text()); 
							var _gift2 = /(Look around in your tank for your new)(.*)(!)/.exec($('#app134920244184_update_message',_resptxt).text()); 
							if(_gift || _gift2) {
								if(_gift) $("#giftHappyAquariumBody").append("<div>Accepted: <b>" + _gift[2] + "</b></div>");
								if(_gift2) $("#giftHappyAquariumBody").append("<div>Accepted: <b>" + _gift2[2] + "</b></div>");
								$("#giftHappyAquariumSum").html(parseInt($("#giftHappyAquariumSum").html(),10)+1);
								_accept(this.data);
							}
							else {
								$("#giftHappyAquariumBody").append("<div><b>Error: </b>" + $('#app134920244184_init_text',_resptxt).html() + "</div>");
								_accept(this.data);
							}
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});	
			}
		}
		if(_isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}	
}
function _getWarMachine(_str){ 
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftWarMachine").html() == null) $("#imgList").append("<div id='giftWarMachine'>Accepting War Machine request...<div id='giftWarMachineBody' style='padding-left:10px'></div>Accepted <span id='giftWarMachineSum'>0</span> gift and/or <span id='neibWarMachineSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			if(url_array.acceptGift) {
				var _isGift = 1;
				_link = _link.replace(/index.php/,'acceptGift.php');
			}
			else _isGift = 0;
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if(_isGift==1){
						if($('.box > center > span',resp.responseText).html()) {
							var _giftAlready = /gift has already been accepted/.exec($('.box > center > span',resp.responseText).html());
							if (!_giftAlready){
								$("#giftWarMachineBody").append("<div>Accepted: <b>" + $('.box > center > span',resp.responseText).html() + "</b></div>");
								$("#giftWarMachineSum").html(parseInt($("#giftWarMachineSum").html(),10)+1);
								_accept(this.data);
							}
							else{
								$("#giftWarMachineBody").append("<div><b>Error: </b>" + $('.box > center > span',resp.responseText).html() + "</div>");
								_accept(this.data);
							}
						}
					}
					else{
						$("#giftWarMachineBody").append("<div>Added: <b>"+_request[this.data].userName+"</b> to alliance.</div>");
						$("#neibWarMachineSum").html(parseInt($("#neibWarMachineSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
				}
			});		
		}
	}	
}
function _getMafiaGift(_str){ 
	var temp = 0;
	var all	= count(_str);
	var mBag = 0;
	var mBagAlert = true;
var iiii=0;
	if ($("#giftMain").html() == null) $("#imgList").append("<div id='giftMain'>Accepting Mafia Wars request...<div id='giftBody' style='padding-left:10px'></div>Accepted <span id='giftsum'>0</span> gift.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var isGift = 0;
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			if(url_array.next_params != undefined){
				isGift = 1;
				if(url_array.next_action == 'accept_gift'){
//iiii++;
					eval('var _pa = ' + url_array.next_params);
					iframe_src = getArgs(_appSettings[_str].iframe);
					var _param = 'xw_controller=' + url_array.next_controller + '&xw_action=' + url_array.next_action + '&xw_city=&skip_req_frame=1&sf_xw_user_id=' + iframe_src.sf_xw_user_id +'&sf_xw_sig='+ iframe_src.sf_xw_sig + '&from_user=' + _pa.from_user + '&time_id=' + _pa.time_id + '&loop=' + _pa.loop + '&item_cat=' + _pa.item_cat + '&item_id=' + _pa.item_id + '&gkey=' + _pa.gkey;
					var _link = 'http://mwfb.zynga.com/mwfb/remote/html_server.php?'+_param;
					var p_data = new Object();
					p_data = {
						id:i,
						params:_pa,
						iframe:iframe_src
					}
					if(url_array.ztrack_subcategory == "1_527" && mBag < 5){
						mBag++;
						GM_xmlhttpRequest({ url: _link, method:'get', data: p_data,
							onload: function(resp){
								temp++;
								var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
								var _resptxt = $('<div></div>').append(_resphtml.toString());
								_gift = $('.good', _resptxt).html();
								_error = $('.bad', _resptxt).parent().text();
								_error = /Error: (.*)[.]/.exec(_error);
								if (_gift){
									_accept(this.data.id);
									profileLink = 'http://mwfb.zynga.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=&skip_req_frame=1&sf_xw_user_id='+this.data.iframe.sf_xw_user_id+'&sf_xw_sig='+this.data.iframe.sf_xw_sig+'&user='+this.data.params.from_user;
									$("#giftBody").append("<div>Accept: <b>" + _gift + "</b>. From: <a href='#' linkas='" + profileLink + "' class='addfriend good mwprofile' ursID='"+ this.data.id +"'><b>" + _request[this.data.id].userName + "</b></a></div>");
									_addOnclickEvent();
									$("#giftsum").html(parseInt($("#giftsum").html(),10)+1);
								}
								else if (_error){
									_accept(this.data.id);
									$("#giftBody").append("<div>"+_error[0].replace(/Error: /,"<b>Error:</b> ")+"</div>");
								}
								if (temp == all){
									$('#'+_str+'_loading').remove();
									//$('[appBlock="'+_str+'"]').hide();
									//$('[appMyBlock="'+_str+'"]').remove();
								}
							}
						});
					}else if (url_array.ztrack_subcategory == "1_527" && mBagAlert == true){
						mBagAlert = false;
						temp++;
						alert("You can accept only 5 Mystery Bag in one time, open it and accept again.");
					}
					if(url_array.ztrack_subcategory != "1_527"){
//alert(_link)
						
						GM_xmlhttpRequest({ url: _link, method:'get', data: p_data,
							onload: function(resp){
								temp++;
								var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
								var _resptxt = $('<div></div>').append(_resphtml.toString());
								_gift = /You just accepted:(.*)<\/div>/.exec(_resphtml.toString());
								_error = /Your friend has sent you more than 1 free gift in a day. You were unable to accept it! If you need certain items, add them to your wishlist instead/.exec(_resphtml.toString());
								if (_gift){
									_accept(this.data.id);
									profileLink = 'http://mwfb.zynga.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=&skip_req_frame=1&sf_xw_user_id='+this.data.iframe.sf_xw_user_id+'&sf_xw_sig='+this.data.iframe.sf_xw_sig+'&user='+this.data.params.from_user;
									$("#giftBody").append("<div>Accept: <b>" + _gift[1] + "</b> From: <a href='#' linkas='" + profileLink + "' class='addfriend good mwprofile' ursID='"+ this.data.id +"'><b>" + _request[this.data.id].userName + "</b></a></div>");
									_addOnclickEvent();
									$("#giftsum").html(parseInt($("#giftsum").html(),10)+1);
								}
								else if (_error){
									_accept(this.data.id);
									$("#giftBody").append("<div><b>Error:</b> "+_error[0]+"</div>");
								}
								if (temp == all){
									$('#'+_str+'_loading').remove();
									//$('[appBlock="'+_str+'"]').hide();
									//$('[appMyBlock="'+_str+'"]').remove();
								}
							}
						});
						
					}
				}else if (url_array.next_action == 'answer_gift'){
/*					
					GM_setValue('MWGiftSend',1);
iiii++;
					eval('var _pa = ' + url_array.next_params);
					iframe_src = getArgs(_appSettings[_str].iframe);
					var _param = 'xw_controller=' + url_array.next_controller + '&xw_action=' + url_array.next_action + '&xw_city=&skip_req_frame=1&sf_xw_user_id=' + iframe_src.sf_xw_user_id +'&sf_xw_sig='+ iframe_src.sf_xw_sig + '&from_user=' + _pa.from_user + '&time_id=' + _pa.time_id + '&gkey=' + _pa.gkey;
					var _paramSend = 'xw_controller=safehouse&xw_action=answer_send&xw_city=1&skip_req_frame=1&ajax=1&liteload=1&sf_xw_user_id='+iframe_src.sf_xw_user_id+'&sf_xw_sig='+iframe_src.sf_xw_sig+'&target='+_pa.from_user+'&_pa.from_user='+_pa.time_id+'&gkey='+_pa.gkey;
					var _link = 'http://mwfb.zynga.com/mwfb/remote/html_server.php?'+_param;
					var _linkSend = 'http://mwfb.zynga.com/mwfb/remote/html_server.php?'+_paramSend;
					p_data = {
						id:i,
						link:_linkSend,
					}
					GM_xmlhttpRequest({ url: _link, method:'get', data: p_data,
						onload: function(resp){
							if($('#value_item_id',resp.responseText)){
								giftId = $('#value_item_id',resp.responseText).attr('value');
								gType=GM_getValue('MWGiftSend');
								var sendTime = /You have already answered to 5 requests for gifts in 24 hours/.exec(resp.responseText.toString());
								if(!sendTime){
									gType=-1;
								}
								var _linkS = this.data.link+'&gift_box='+gType+'&gift_id='+giftId+'&xw_client_id=8';
								//alert($('#xp_gain_url',resp.responseText).val()+'&gift_id='+giftId+'&xw_client_id=8');
								alert(_linkS);
								
								GM_xmlhttpRequest({ url: _linkS, method:'get', data:this.data.id, headers:{'Content-type':'application/x-www-form-urlencoded'},
									onload: function(resp){
										alert(resp.responseText);
										GM_openInTab(resp.responseText)
										temp++;
										if (this.data != -1) { 
											$("#giftBody").append("<div>Send: <b>Gift Send and rewarded claimed</b></div>");
										}else{
											$("#giftBody").append("<div>Send: <b>Gift Send</b></div>");
										}
										_accept(this.data);
										if (temp == all){
											$('#'+_str+'_loading').remove();
										}
									}
								});
								
							}
						}
					});
*/
					temp++;
					if (temp == all){
						$('#'+_str+'_loading').remove();
						//$('[appBlock="'+_str+'"]').hide();
						//$('[appMyBlock="'+_str+'"]').remove();
					}
				}else{
					
					temp++;
					if (temp == all){
						$('#'+_str+'_loading').remove();
						//$('[appBlock="'+_str+'"]').hide();
						//$('[appMyBlock="'+_str+'"]').remove();
					}
				}
			}
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
//if(iiii == 1) return false;
	}
}
function _getTreasureMadness(_str){
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftTreasureMain").html() == null) $("#imgList").append("<div id='giftTreasureMain'>Accepting Treasure Madness request...<div id='giftTreasureBody' style='padding-left:10px'></div>Accepted <span id='giftTreasureSum'>0</span> gift.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if($('.gift_info',resp.responseText).html()){ 
						$("#giftTreasureBody").append("<div> Accept: <b>" + $('.gift_info',resp.responseText).text() + "</b></div>");
						$("#giftTreasureSum").html(parseInt($("#giftTreasureSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('#'+_str+'_loading').remove();
					}
				}
			});			
		}
	}
}
function _getTreasureIsle(_str){
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftTreasureIsleMain").html() == null) $("#imgList").append("<div id='giftTreasureIsleMain'>Accepting Treasure Isle request...<div id='giftTreasureIsleBody' style='padding-left:10px'></div>Accepted <span id='giftTreasureIsleSum'>0</span> gift.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var gift = /gift_accept\.php/.exec(_link);
			var reward = /reward\.php/.exec(_link);
			var ask_fruit = /ask_fruit\.php/.exec(_link);
			if(gift){
				_url=url_array.next;
			}else if (reward){
				if(url_array.next){
					_url=url_array.next;
				}else{
					_url=_link;
				}
			}
			_url += '&yes=1';
			if(gift || reward){
//				alert(_url);
				GM_xmlhttpRequest({ url: _url, method:'get', data: i, 
					onload: function(resp){
						temp++;
						
						var respMesage;
						var failed = "Sorry\, no gems left|Looks like there\'s no fruit left in the crate\.|Sorry\, you have already received your celebration reward\!|Sorry\, the celebration for (.*) hard work has ended\! Try again next time\!|Sorry\, this animal has already found a home\. Thanks\!|Sorry\, all of (.*) gems are gone\. Come back tomorrow for more\!|Sorry\, the celebration for (.*) exploration has ended\! Try again next time\!|Sorry|Sorry, the chest has already been emptied.";
						if($('#app234860566661_right', resp.responseText).length > 0){
							respMesage = 'You have received: <b>' + $('#app234860566661_right > p', resp.responseText).text() + '</b>';
						}else{
							respMesage = $('#app234860566661_left > h2', resp.responseText).text();
						}
//						alert(respMesage);
						var reg = new RegExp(failed);
						var arr = reg.exec(respMesage);
						if(respMesage && !arr){ 
							$("#giftTreasureIsleBody").append("<div>"+respMesage+"</div>");
							$("#giftTreasureIsleSum").html(parseInt($("#giftTreasureIsleSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('#'+_str+'_loading').remove();
						}
					}
				});
			}else{
				temp++;
			}
//			return false;
		}
	}
}
function _getFarmVilleGift(_str){ 
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftFarmVilleMain").html() == null) $("#imgList").append("<div id='giftFarmVilleMain'>Accepting Farm Ville request...<div id='giftFarmVilleBody' style='padding-left:10px'></div>Accepted <span id='giftFarmVilleSum'>0</span> gift and/or <span id='neibFarmVilleSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			if(url_array.gift) var _isGift = 1;
			else var _isGift = 0;
			if(_isGift == 1){
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						temp++;
						if($('.giftConfirm_name > span',resp.responseText).html()){ 
							$("#giftFarmVilleBody").append("<div> Accept: <b>" + $('.giftConfirm_name > span',resp.responseText).html() + "</b></div>");
							$("#giftFarmVilleSum").html(parseInt($("#giftFarmVilleSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('#'+_str+'_loading').remove();
//							$('[appBlock="'+_str+'"]').hide();
//							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});			
			}else{
				temp++;
				if(temp == all){
					$('#'+_str+'_loading').remove();
//					$('[appBlock="'+_str+'"]').hide();
//					$('[appMyBlock="'+_str+'"]').remove();					
				}
			}
		}
	}
}
function _getFishVilleGift(_str){ 
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftFishVilleMain").html() == null) $("#imgList").append("<div id='giftFishVilleMain'>Accepting FishVille request...<div id='giftFishVilleBody' style='padding-left:10px'></div>Accepted <span id='giftFishVilleSum'>0</span> gift and/or <span id='neibFishVilleSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'').replace(/%7C/g,'|');
			var url_array = getArgs(_link);
			if(url_array.gift) var _isGift = 1;
			else var _isGift = 0;
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if(_isGift == 1){
						if($('.giftConfirm_name > span',resp.responseText).html()) 
							$("#giftFishVilleBody").append("<div> Accept: <b>" + $('.giftConfirm_name > span',resp.responseText).html() + "</b></div>");
							$("#giftFishVilleSum").html(parseInt($("#giftFishVilleSum").html(),10)+1);
							_accept(this.data);
					}
					else{
						$("#giftFishVilleBody").append("<div>Added: <b>"+_request[this.data].userName+"</b> to neighbor.</div>");
						$("#neibFishVilleSum").html(parseInt($("#neibFishVilleSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
				}
			});		
		}
	}
}
function _getPokerGift(_str){ 
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftPokerMain").html() == null) $("#imgList").append("<div id='giftPokerMain'>Accepting Poker request...<div id='giftPokerBody' style='padding-left:10px'></div>Accepted <span id='giftPokerSum'>0</span> gift and/or <span id='neibPokerSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/dmz_link_landing.php/,'invite_gift_claim.php').replace(/%7Bfg_id%7D/,'{fg_id}').replace(/actions\[/,'').replace(/]/,'');
			alert(_link)
		/*	GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
					msg = /You\'ve reached your daily limit\./.exec(resp.responseText.toString());
					GM_openInTab(resp.responseText.toString());
					if(msg){
						$("#giftPokerBody").append("<div>" + msg + "</div>");
						//_accept(this.data);
					}else{
						msg = /(You just accepted \r\n\s+\$)(.*)(chips\.)/.exec(resp.responseText.toString());
						alert(msg);
						$("#giftPokerBody").append("<div>Accepted: " + msg[2] + " chips</div>");
						$("#giftPokerSum").html(parseInt($("#giftPokerSum").html(),10)+1);
						_accept(this.data);
					}
					/*_gift = $('#app2389801228_acceptGifts_content > h1',_resptxt).eq(0).html();
					if(_gift) {
						$("#giftPokerBody").append("<div>" + _gift + "</div>");
						$("#giftPokerSum").html(parseInt($("#giftPokerSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
					
//						alert(msg)
//						GM_openInTab(resp.responseText.toString());
//						alert($('#app2389801228_acceptGifts',_resptxt).html())
//						app2389801228_acceptGifts_content
				}
			});	*/
				
			return false;
		}
	}
}
function _getVampire(_str){ 
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftVampireMain").html() == null) $("#imgList").append("<div id='giftVampireMain'>Accepting Vampire request...<div id='giftVampireBody' style='padding-left:10px'></div>Accepted <span id='giftVampireSum'>0</span> gift and/or <span id='neibVampireSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/track.php\?\&/,'index.php?').replace(/actions\[/,'').replace(/]/,'');
			if (url_array.source == "recruit+gift") var isGift = 1;
			else var isGift = 0;
			if (isGift){
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						temp++;
						if($('iframe[name="vampirewars"]',resp.responseText).length > 0){
							GM_xmlhttpRequest({ url: $('iframe[name="vampirewars"]',resp.responseText).attr('src'), method:'get', data: i,
								onload: function(resp){
									_gift = $('.title',resp.responseText).html();
									if(_gift) {
										$("#giftVampireBody").append("<div><b>" + _gift + "</b></div>");
										$("#giftVampireSum").html(parseInt($("#giftVampireSum").html(),10)+1);
										_accept(this.data);
									}
									if(temp == all){
										$('[appBlock="'+_str+'"]').hide();
										$('[appMyBlock="'+_str+'"]').remove();					
									}
								}
							});
						}
					}
				});
			}
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}
}
function _getCage(_str){ 
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftCAgeMain").html() == null) $("#imgList").append("<div id='giftCAgeMain'>Accepting Castle Age request...<div id='giftCAgeBody' style='padding-left:10px'></div>Accepted <span id='giftCAgeSum'>0</span> gift and/or <span id='neibCAgeSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			//var _link = "http://apps.facebook.com/castle_age/army.php?act=acpt&uid="+_request[i].userID;
			var _link = "http://apps.facebook.com/castle_age/army.php?act=acpt&uid="+_request[i].appID;
			if (_request[i].isInvite == "0") var isGift = 1;
			else var isGift = 0;
			if (isGift){
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						temp++;
						var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
						var _acceptG = /You have accepted the gift: (.*)/.exec(_resphtml);
						if (_acceptG){
							$("#giftCAgeBody").append("<div> Accept: <b>" + _acceptG[1] + "</b></div>");
							$("#giftCAgeSum").html(parseInt($("#giftCAgeSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});	
			}
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}
}
function _getYoville(_str){ 
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftYovilleMain").html() == null) $("#imgList").append("<div id='giftYovilleMain'>Accepting Yoville request...<div id='giftYovilleBody' style='padding-left:10px'></div>Accepted <span id='giftYovilleSum'>0</span> gift and/or <span id='neibYovilleSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			var url_array = getArgs(_link);
			if (url_array.src == "gift") var isGift = 1;
			else var isGift = 0;
			if (isGift){
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						_gift = /(You just accepted this) (.*)(<br \/>.*)/.exec(resp.responseText);
						if(_gift) {
							temp++;
							$("#giftYovilleBody").append("<div>Accept: <b>" + _gift[2] + "</b></div>");
							$("#giftYovilleSum").html(parseInt($("#giftYovilleSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();
						}
					}
				});
			}			
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}
}
function _acceptFriends(_str){ 
	var all		=	count(_str);
	var temp	=	0;
	if ($("#FriendMain").html() == null) $("#imgList").append("<div id='FriendMain'>Accepting Friend request...<div id='FriendBody' style='padding-left:10px'></div>Accepted <span id='FriendSum'>0</span> friend.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _data="__a=1&actions[accept]=" + _request[i].action + "&charset_test=" + _request[i].charset_test + "&confirm=" + _request[i].userID + "&fb_dtsg=" + _request[i].fb_dtsg + "&id=" + _request[i].userID + "&post_form_id=" + _request[i].postForm + "&post_form_id_source=AsyncRequest&status_div_id=" + _request[i].status + "&type=" + _request[i].type + "&arrID=" + i + "&params[lists]=[\"" + GM_getValue("setGroups") + "\"]";
			GM_xmlhttpRequest({	method: "POST",	url: "http://www.facebook.com/ajax/reqs.php", headers:{'Content-type':'application/x-www-form-urlencoded'},	data:_data,
				onload: function(postResp){
					temp++;
					var _invite = /error_adding_friend/.exec(postResp.responseText.toString());
					var _friend = />([^<]*)/.exec(postResp.responseText.toString());
					var url_array = getArgs("www.facebook.com/home.php?"+this.data);
					if(!_invite){
						$("#FriendBody").append("<div> Accepted: <b><a class='addfriend good' href='http://www.facebook.com/profile.php?id="+ _request[url_array.arrID].userID +"' target='_blank' ursID='"+ url_array.arrID +"'>" + _request[url_array.arrID].userName + "</a></b>.</div>");
						$("#FriendSum").html(parseInt($("#FriendSum").html(),10)+1);
						$('#'+url_array.arrID).hide();
						_addOnclickEvent();
					}
					else {
						$("#acceptFriend").append("<div class='bad'> Somethink wrong with: <b><a class='addfriend bad' href='http://www.facebook.com/profile.php?id="+ _request[url_array.arrID].userID +"' target='_blank' ursID='"+ url_array.arrID +"'>" + _request[url_array.arrID].userName + "</a></b>.</div>");
						_addOnclickEvent();
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();
					}
				}
			});
		}
	}
}
$(document).ready(function(){
	var _link = document.location.href;
	if(_link.indexOf("/reqs.php") != -1){
		_getGroups();
		_viewAll();
		_hideAll();
		$('._cancelApp').click(function(){
			var _str = $(this).attr('app');
			var temp = 0;
			var all = count(_str);
			for (var i in _request){
				if(_request[i].appName == _str) {
					temp++;
					_cancel(i);
					if(all == temp){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();
						$("#imgList").append("<div> Canceled: <b>" + _request[i].appTitle + "</b> request.</div>");
					}
	//				return false;
				}
			}
		});
		$('._cancelAllApp').click(function(){
			if(confirm("Are you sure want cancel all aplication?")){
				$('._cancelApp').each(function(){
					$('[nameG="'+$(this).attr('app')+'_cancel"]').each(function(){
						_clickCancel($(this));
					});
					$('[nameC="'+$(this).attr('app')+'_box"]').hide();
					$('.'+$(this).attr('app')+'_myBox').remove();
					$("#imgList").append("<div> Canceled: <b>" + $(this).attr('app').replace(/_/g," ") + "</b> request.</div>");	
				});
			}
		});
		$('._acceptApp').click(function(){
			$('<img src="'+_loading+'" id="'+$(this).attr('app')+'_loading">').insertAfter($(this));
			$(this).remove();
			eval(_appSettings[$(this).attr('app')].functionName);
		});
		$('._acceptAllApp').click(function(){
			$('._acceptApp').each(function(){
				$('<img src="'+_loading+'">').insertAfter($(this));
				$(this).remove();
				eval(_appSettings[$(this).attr('app')].functionName);
			});
		});
		$('._hideApp').click(function(){ 
			if ($(this).attr('src') == _imgHide) {
				$(this).attr('src',_imgShow);
				$(this).attr('title','Expand');
				$('div[id="'+$(this).attr('app')+'"]').hide();
			}
			else{
				$(this).attr('src',_imgHide);
				$(this).attr('title','Collapse');
				$('div[id="'+$(this).attr('app')+'"]').show();
			}
		});
		$('.closedonation').click(function(){
			$('.donation').css('display','none')
		});
		$('.closeLog').click(function(){
			$('.log').css('display','none')
		});
		$('.appclose').click(function(){
			$('.app').css('display','none')
		});
		$('._donate').click(function(){
			window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=D3RVWU3UQQP42&lc=LT&item_name=Facebook%20request%20manager&item_number=20091209FBR&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted')
		});
		$('.appLog').click(function(){
			$('.log').css('display','block')
		});
		$('.showApp').click(function(){
			$('.app').css('display','block')
		});
		$('.closeSettings').click(function(){
			$('.settings').css('display','none');
		});
		$('.settingsImg').click(function(){
			$('.settings').css('display','block');
		});
		$('._ignoreApp').click(function(){
			if(confirm("Are you sure want block this application?")){
				$('<img src="'+_loading+'">').insertAfter($(this));
				$(this).remove();
				var _str = $(this).attr('app');
				for (var i in _request){
					if(_request[i].appName == _str){
						var _data = "__d=1&confirm=1&fb_dtsg="+ _request[i].fb_dtsg +"&post_form_id="+ _request[i].id +"&post_form_id_source=AsyncRequest";
						var _link = "http://www.facebook.com/ajax/block_app.php?app_id="+_request[i].reqType+"&type_index=0&source=requests&__a=1"
						GM_xmlhttpRequest({
							method: "POST",
							url: _link,
							headers:{'Content-type':'application/x-www-form-urlencoded'},
							data:_data,
							onload: function(postResp){
								eval('var arr='+postResp.responseText.replace(/for \(;;\);/,''));
								$('[appBlock="'+_str+'"]').hide();
								$('[appMyBlock="'+_str+'"]').remove();
								$("#imgList").append("<div> Block: <b>"+ arr["payload"].body +"</b> </div>");
							}
						});
						return false;
					}
				}
			}
		});
		$('#save').click(function(){
			if ($('#userSelect option:selected').attr("value") != "0") GM_setValue("setGroups",$('#userSelect option:selected').attr("value")+":"+$('#userSelect option:selected').html());
			else GM_setValue("setGroups",'');
			GM_setValue("setMsg",$('#txtMessage').val());
			$('.settings').css('display','none');
			checkIcon = $('input[name="iconType"]:checked').val();
			if(checkIcon != GM_getValue('imageType')){
				GM_setValue('imageType',checkIcon);
				location.href = "http://www.facebook.com/reqs.php";
			}
		});
		$('#clear').click(function(){
			$('#imgList').html('');
		});
		$('._refresh').click(function(){
			document.location.href = "http://www.facebook.com/reqs.php";
		});
		$('.logHeader').bind("drag", function(e){
			if(e.offsetY > 20 && e.offsetX > 0){
				$('.log').css({
					top: e.offsetY,
					left: e.offsetX
				});
			}
		});
		$('.appHeader').bind("drag", function(e){
			if(e.offsetY > 20 && e.offsetX > 0){
				$('.app').css({
					top: e.offsetY,
					left: e.offsetX
				});
			}
		});
		$('.settingsHeader').bind("drag", function(e){
			if(e.offsetY > 20 && e.offsetX > 0){
				$('.settings').css({
					top: e.offsetY,
					left: e.offsetX
				});
			}
		});
		$('#update').click(function(){
			if($("#updating").html() == null) $('<div id="updating" class="line">Checkin for update..<img src="' + _imgLoadingRed + '"><div>').insertBefore($(this));
			else $("#updating").html('<div id="updating">Checkin for update..<img src="' + _imgLoadingRed + '"><div>');
			GM_xmlhttpRequest({ url:"http://userscripts.org/scripts/review/59960", method:'get',
				onload: function(resp){
					var _version = /@version([^&#]{9})/.exec(resp.responseText.toString());
					_aaa = _version[1].replace(/	/g,"");
					$('#upLoading').remove();
					if(_appVersion != _aaa){
						$('#updating').html('New version (' + _aaa + ') is available click <a href="http://userscripts.org/scripts/source/59960.user.js">here</a> to upgrade.');
					}
					else{
						$('#updating').html('You have latest version.');
					}
				}
			});
		});
	}
});
function encode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
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

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}
function decode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

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
   } while (i < input.length);

   return output;
}
function _addOnclickEvent(){
	jQuery(function() {
		$('.addfriend').mouseover(function(e){
			$("#foto").css({
				"display":"block",
				"z-index":99999,
				"top":e.pageY,
				"left":(e.pageX+15)
			});
			$("#foroIMG").html('<div>'+_request[$(this).attr('ursID')].photo+'</div>');
			if(_request[$(this).attr('ursID')].msg)$("#foroIMG").append('<div><b>Message:</b>'+_request[$(this).attr('ursID')].msg+'</div>')
		});
		$('.addfriend').mousemove(function(e){
			$("#foto").css({
				"top":e.pageY,
				"left":(e.pageX+15)
			});
		});
		$('.addfriend').mouseout(function(e){
			$("#foto").css("display","none");
		});
		$('.mwprofile').click(function(){
			GM_openInTab($(this).attr('linkas'));
			return false;
		})
	});
}
function _addAcceptEvent(){
	$('._acceptApp').click(function(){
		$('<img src="'+_loading+'" id="'+$(this).attr('app')+'_loading">').insertAfter($(this));
		$(this).remove();
		eval(_appSettings[$(this).attr('app')].functionName);
	});
	
	$('._acceptAllApp').click(function(){
		$('._acceptApp').each(function(){
			$('<img src="'+_loading+'">').insertAfter($(this));
			$(this).remove();
			eval(_appSettings[$(this).attr('app')].functionName);
		});
	});
}
function getArgs(url) {
	var args = new Object();
	if (url == undefined){
		var query = location.search.substring(1);
	}else{
		var url_array = url.split('?');
		var query = url_array[1].replace(/&amp;/g,'&');
	}
	var pairs = query.split("&");
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	}
	return args;
}