// ==UserScript==
// @name           Ikariam Alliance Map
// @namespace      Ikariam Alliance Map
// @author         Martynius (http://userscripts.org/users/68307)
// @license        GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/46874
// @description    In the alliance and embassy pages, a map of the world can be opened and, in the island view, a mini-map is shown.
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/jquery-1.4.2-GM.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/1.7.2/ui/minified/ui.core.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/1.7.2/ui/minified/ui.draggable.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/1.7.2/ui/minified/ui.tabs.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamMap-Id_Luxury_Name.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/ColourSelector.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @version        1.1.13f
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php*view=island*
// @include        http://s*.ikariam.*/index.php*view=diplomacyAdvisor*&watch=4*
// @include        http://s*.ikariam.*/index.php*view=diplomacyAdvisorAlly*
// @include        http://s*.ikariam.*/index.php*view=embassy*
// @exclude        http://support.ikariam.*/*
// @exclude        http://support.*.ikariam.*/*
//
// @history 1.1.13f	<em>Bug Fix</em>: Updated Dependancy
// @history 1.1.13e	<em>Feature</em>: Updated Greek and Serbian translation.<br /><em>Feature</em>: Added links to approval on Finnish and Arabic servers.
// @history 1.1.13d	<em>Feature</em>: Added Estonian and Indonesian translation & updated Arabic, Bosnian, Bulgarian, French and Swedish translations<br /><strong>Bugfix</strong>: Included both jQuery 1.3.2 and 1.4.2 (modified) libraries to fix issue saving colour selection.
// @history 1.1.13c	<strong>Bugfix</strong>: Updated JQuery to 1.4.2 and fixed to work with Greasemonkey.
// @history 1.1.13b	<strong>Bugfix</strong>: Updated JQuery UI Locations.
// @history 1.1.13a	<em>Feature</em>: Added Bosnian translation & updated Latvian, Romanian & Filipino translations<br /><em>Feature</em>: Added link to approval on Filipino servers.
// @history 1.1.13	<em>Feature</em>: Updated Menu item: "Tools" &gt; "Greasemonkey" &gt; "User Script Commands..." &gt; "Reset Mini-Map Location" to show a box to manually reset mini-map position in island view.<br /><em>Feature</em>: Updated auto-updater to use PhasmaExMachina's UserScript.
// @history 1.1.12d	<em>Feature</em>: Added link to approval on Dutch & Russian servers.<br /><em>Feature</em>: Updated Spanish translation.
// @history 1.1.12c	<em>Feature</em>: Added link to approval on Swedish servers.
// @history 1.1.11b	<em>Feature</em>: Added link to approval page on .org.
// @history 1.1.12b	<em>Feature</em>: Added link to approval on American servers.<br /><em>Feature</em>: Updated Portuguese translation.
// @history 1.1.12a	<em>Feature</em>: Updated Italian Translation<br /><em>Feature</em>: Added link to approval on Italian servers.
// @history 1.1.12	<em>Feature</em>: Added auto-update checker.<br /><em>Feature</em>: Updated Chinese, Czech and Hungarian translations.
// @history 1.1.11	<em>Feature</em>: Added Czech language translation.<br /><em>Feature</em>: Added option to reset mini-map location in the Greasemonkey menu<br /><em>Feature</em>: Added option to turn of mini-map.
// @history 1.1.10	<em>Bugfix</em>: Reworked display of own islands.
// @history 1.1.9b	<em>Feature</em>: Added Chinese language translation.
// @history 1.1.9	<em>Feature</em>: Updated Hebrew language translation.<br /><em>Bugfix</em>: Fixed co-ordinate parsing for [0X:XX] or [XX:0X] islands.
// @history 1.1.8	<em>Feature</em>: Updated French language translation.<br /><em>Feature</em>: Added Hungarian language translation.<br /><em>Bugfix</em>: Recoded map generation for speed up.<br /><em>Bugfix</em>: Changed parsing of own islands.<br /><em>Bugfix</em>: Fixed height of tabs in configuration menu.
// @history 1.1.7	<em>Bugfix</em>: Updated Turkish language translation.<br /><em>Bugfix</em>: Changed to parse island drop-down menu to get own town locations so players with no alliance can see own town locations.
// @history 1.1.6b	<em>Feature</em>: Added Greek & Vietnamese Translations.
// @history 1.1.6	<em>Feature</em>: Added Romanian & Italian Translations.
// @history 1.1.5b	<em>Feature</em>: Added Polish & Hebrew Translations.
// @history 1.1.5	<em>Feature</em>: Split Configuration panel into two tabs.<br /><em>Feature</em>: Added option to select language other than the server default.<br /><em>Bugfix</em>: Updated Russian Translations.<br /><em>Bugfix</em>: Updated CSS displaying sea, islands and fixed CSS bug displaying the world map grid.
// @history 1.1.4	<em>Feature</em>: Updated Dutch, German, Russian, Spanish & Turkish Translations.<br /><em>Bugfix</em>: Fixed z-index bug when moving map over some images.<br /><em>Bugfix</em>: Updated included pages to run on v0.3.1 Alliance Diplomacy URL.
// @history 1.1.3	<em>Feature</em>: Improved code to drag using jQuery UI draggable interface.
// @history 1.1.2	<em>Bugfix</em>: Improved code to parse alliance data and fix clash with "Member Town Resources" and "Favorite + Attack Counter" scripts.
// @history 1.1.1	<em>Feature</em>: Map data, Language detection and Colour Select creation moved to separate modules for maintenance and ease of re-use.
// @history 1.1.0	<em>Feature</em>: Island Mini-map can be repositioned by clicking and dragging the icon.<br /><em>Feature</em>: Updated skin colours.
// @history 1.0.8	<em>Feature</em>: Added ability to select island colours based on which luxury goods it produces.<br /><em>Feature</em>: Added ability to set alliance shading colours and whether to display as variable sizes based on number of alliance members on the island.<br /><em>Feature</em>: Added script details section.<br /><em>Feature</em>: Updated French and Hebrew Translations.<br /><em>Bugfix</em>: Fixed Mini-Map bug when a row/column had no islands in it.<br /><em>Bugfix</em>: Moved Mini-Map to right (left on .ae/.il) of screen on v0.3.1
// @history 1.0.7	<em>Feature</em>: Added colour selection and skins.<br /><em>Feature</em>: Added configuration and help displays.<br /><em>Bugfix</em>: Fixed alliance shading to fade between two colours rather than use hardcoded values.
// @history 1.0.6	<em>Feature</em>: Added variable sized squares to show number of alliance towns on an island.<br /><em>Bugfix</em>: Fixed Embassy display
// @history 1.0.5	<em>Feature</em>: Added International Language support and fixed display for Right-To-Left languages.
// @history 1.0.4	<em>Feature</em>: Added mini-map on the island view.<br /><em>Feature</em>: Alliance co-ords are saved in GM varaible for use on island view.<br /><em>Feature</em>: Unused data stripped out of islandMap.
// @history 1.0.3	<em>Feature</em>: Added scale numbers.<br /><em>Feature</em>: Anchors to click through to islands.<br /><em>Feature</em>: Delete variables once used.<br /><em>Feature</em>: Inline images.
// @history 1.0.2	<em>Feature</em>: Added black & white scale bars around the map.
// @history 1.0.1	<em>Bugfix</em>: Moved main body of the script into a function to stop inital delay when loading page.
// @history 1.0.0	Basic version.
// ==/UserScript==
//
// -- Resources --
// Ikariam Map data is a cut down version [id, goods, name] of the data from nikiakit's script (approved on .org): http://files.nikitakit.googlepages.com/ikariamMap.js
// Variable sized alliance markup inspired by Alliance Automap (http://verlamer.ca/ikariam/map/automap.php)
// Globe Icon from: http://www.iconarchive.com/show/globe-icons-by-icondrawer/globe-compass-icon.html
// Close Icon from: http://www.iconarchive.com/show/boomy-icons-by-milosz-wlazlo/close-icon.html
// Help Icon from: http://www.iconarchive.com/show/boomy-icons-by-milosz-wlazlo/help-icon.html
// Info Icon from: http://www.iconarchive.com/show/boomy-icons-by-milosz-wlazlo/info-about-icon.html
//
// -- Thanks --
// oliezekat - Various suggestions, including improvements in language detection.
// Mindor - Suggesting looking at Alliance Automap and for bug hunting on .org.
// Brian (.com) and Marco_tmc (.org) - Discussing script ideas.
// Toranaga - Suggesting jQuery Draggable UI.
//

var $$ = $.noConflict(true);

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

const SCRIPT_ID		= 46874;
const SCRIPT_VERSION	= "1.1.13e";

const PAGE_ID = {
	island:			"mini",
	diplomacyAdvisor:	"world",
	diplomacyAdvisorAlly:	"world",
	embassy:		"world"
}[ $("body").attr("id") ];

if ( PAGE_ID !== undefined ) {

ScriptUpdater.check( SCRIPT_ID );
GM_registerMenuCommand( "Ikariam Alliance Map: Check for update", function() { ScriptUpdater.forceNotice( SCRIPT_ID, SCRIPT_VERSION ) } );

/**
 * Set up Greasemonkey Cache Variables.
 * getServerWorld() and getServerDomain() are in IkariamHostDetection.js
 */
const cache_key		= getServerDomain() + '.' + getServerWorld();
const cache_variables	= {
	OWNISLANDS:		cache_key + '.ownIslands',
	OWNNAME:		cache_key + '.ownName',
	PLAYER:			cache_key + '.player',
	ALLIANCE:		cache_key + '.alliance',
	SKIN:			cache_key + '.skin',
	OWN:			cache_key + '.own',
	CENTERED:		cache_key + '.centered',
	ISLAND:			cache_key + '.island',
	SEA:			cache_key + '.sea',
	BORDER:			cache_key + '.border',
	GRID:			cache_key + '.grid',
	MARBLE:			cache_key + '.marble',
	WINE:			cache_key + '.wine',
	CRYSTAL:		cache_key + '.crystal',
	SULPHUR:		cache_key + '.sulphur',
	VARIABLE:		cache_key + '.variable',
	FADE:			cache_key + '.fade',
	OWNALLIANCE:		cache_key + '.ownAlliance',
	OWNALLIANCEFADE:	cache_key + '.ownAllianceFade',
	LOCATION:		cache_key + '.location',
	LANGUAGE:		cache_key + '.language',
	DISPLAYMAP:		cache_key + '.displayMap'
};

/**
 * getLanguage() is in IkariamLanguageDetection.js
 *
 * Needs updating for all languages.
 * ltr: Is the language written left to right?
 * open: Translation of the word "Open"
 * worldMap: Translation of the phrase "World Map"
 * miniMap: Translation of the phrase "World Mini-Map"
 */
const lang = getLanguage( cache_variables.LANGUAGE );
const language = {
	"arabic":	{	ltr: false,	open: "فتح خريطة العالم",			worldMap: "خريطة العالم",		miniMap: "خريطة مصغرة للعالم",		config: "الإعدادات",			scheme: "تركيبة الالوان",		skin: "الشكل",	island: "الجزيرة",	sea: "البحر",	border: "الحدود",	grid: "الشبكة",	own: "جزيرتي الخاصة",		selected: "الجزيرة المختارة",		marble: "جزيرة الرخام",			wine: "جزيرة العنب",		crystal: "جزيرة البلور",		sulphur: "جزيرة الكبريت",		variable: "تغيير الحجم",		ownAlliance: "اللون",	ownAllianceFade: "تلاشي",		alliance: "تحالفك",			details: "معلومات عن السيكربت",		author: "المبرمج",		webpage: "الموقع الألكتروني",	approved: "مسموح في",		close: "إغلاق",		move: "تحريك",		language: "اللغة",		reset: "إرجاع موقع الخريطة المصغرة",			displayMap: "عرض الخريطة المصغرة" },
	"bosnian":	{	ltr: true,	open: "Otvori kartu Svijeta",	worldMap: "Karta Svijeta",	miniMap: "Mini Karta Svijeta",	config: "Konfiguracija",	scheme: "Shema Boja",	skin: "Omot",	island: "Otok",	sea: "More",	border: "Rub",	grid: "Mreža",	own: "Moji Otoci",	selected: "Odabrani Otok",	marble: "Otok s Mramorom",	wine: "Otok s Vinom",	crystal: "Otok s Kristalom",	sulphur: "Otok sa Sumporom",	variable: "Mijenaje veličine",	ownAlliance: "Boja",	ownAllianceFade: "Izblijediti",	alliance: "Vlastiti Savez",	details: "Detalji Skripte",	author: "Autor",	webpage: "Webpage",	approved: "Dozvoljeno na",	close: "Zatvori",	move: "Pomakni",	language: "Jezik",	reset: "Resetiraj poziciju Mini-Mape",	displayMap: "Prikaži Mini-Mapu" },
	"bulgarian":	{	ltr: true,	open: 'Отвори карта на света',	worldMap: 'Карта на света',	miniMap: 'Световната Мини карта', config: 'Настройки',		scheme: 'Цветова схема',	skin: 'Вид',	island: 'Остров',	sea: 'Море', border: 'Граница',	grid: 'Решетка',	own: 'Мойте острови',	selected: 'Активен остров',	marble: 'Мраморен остров',	wine: 'Винен остров',	crystal: 'Кристален остров',	sulphur: 'Серен остров',	variable: 'Променливи',	ownAlliance: 'Цвят',	ownAllianceFade: 'Увяхвам',	alliance: 'Собствени алианс',	details: 'Подробности',	author: 'Автор',	webpage: 'Страница',	approved: 'Одобрени за',	close: 'Затвори',	move: 'Движи',	language: 'Език',	reset: 'Нулиране Мини карта Местоположение',	displayMap: 'Покажи Мини карта' },
	"chinese":	{	ltr: true,	open: "打開世界地圖",		worldMap: "世界地圖",		miniMap: "小地圖",			config: "配置",	scheme: "顏色組合",	skin: "面版",	island: "島嶼",	sea: "海洋",	border: "邊界",	grid: "座標線",	own: "自有島嶼",	selected: "所選島嶼",	marble: "大理石島",	wine: "葡萄酒島",	crystal: "水晶島",	sulphur: "硫磺島",	variable: "村落大小",	ownAlliance: "聯盟主色",	ownAllianceFade: "漸層",	alliance: "自屬聯盟",	details: "插件內容",	author: "作者",	webpage: "網頁",	approved: "認證",	close: "關閉",	move: "移動",	language: "語言", reset: "重置小地圖位置", displayMap: "展開小地圖" },
	"czech":	{	ltr: true,	open: 'Otevřít Mapu Světa',	worldMap: 'Mapa Světa',		miniMap: 'Minimapa Světa',	config: 'Nastavení',	scheme: 'Barevné Schéma',	skin: 'Vzhled',	island: 'Ostrov',	sea: 'Moře',	 border: 'Okraje',	 grid: 'Mřížka',	 own: 'Vlastní Ostrov',	selected: 'Vybraný Ostrov',	marble: 'Mramor Ostrov',	wine: 'Víno Ostrov',	crystal: 'Krystaly Ostrov',	sulphur: 'Síra Ostrov',	variable: 'Odlišná Velikost',	ownAlliance: 'Barva Ostrov',	ownAllianceFade: 'Slábnutí',	alliance: 'Vlastní Aliance',	 details: 'Detaily Skriptu',	author: 'Autor',	webpage: 'Webová Stránka',	approved: 'Schváleno',	close: 'Zavřít',	move: 'Přesunout',	language: 'Jazyk', reset: "Resetovat Pozici Minimapy", displayMap: "Zobrazit Minimapu" },
	"danish":	{	ltr: true,	open: 'Open World Map',		worldMap: 'Verdenskort',	miniMap: 'World Mini-Map',	config: 'Konfiguration', scheme: 'Farveskema', skin: 'Hud', island: 'Ø', sea: 'Hav', border: 'Border', grid: 'Gitter', own: 'Egen ø', selected: 'Udvalgte Island', marble: 'Marmor Island', wine: 'Vin Island', crystal: 'Crystal Island', sulphur: 'Svovl Island', variable: 'Variere Størrelse', ownAlliance: 'Farve', ownAllianceFade: 'Fade', alliance: 'Egne Alliance', details: 'Script Detaljer', author: 'Forfatter', webpage: 'Webside', approved: 'Godkendt på', close: 'Luk', move: 'Bevæge', language: 'Sprog', reset: 'Nulstil Mini-Map Location', displayMap: 'Display Mini-Map' },
	"dutch":	{	ltr: true,	open: "Open World Map",		worldMap: "Wereld Kaart",	miniMap: "Wereld Mini-Kaart",	config: "Instellingen",	scheme: "Kleurschema", skin: "Thema",	island: "Eiland", sea: "Water", border: "Rand", grid: "Grid",	own: "Eigen Eiland", selected: "Geselecteerd Eiland",	marble: "Marmer Eiland", wine: "Wijn Eiland",	crystal: "Kristal Eiland", sulphur: "Zwavel Eiland",	variable: "Wijzig Formaat",	ownAlliance: "Kleur",	ownAllianceFade: "Fade", alliance: "Eigen Alliantie",	details: "Script Details", author: "Auteur", webpage: "Webpage",	approved: "Goedgekeurd op", close: "Afsluiten", move: "Verplaatsen", language: "Taal", reset: 'Reset Mini-Kaart Locatie', displayMap: 'Display Mini-Map' },
	"english":	{	ltr: true,	open: "Open World Map",		worldMap: "World Map",		miniMap: "World Mini-Map",	config: "Configuration",	scheme: "Colour Scheme",	skin: "Skin",	island: "Island",	sea: "Sea",		border: "Border",	grid: "Grid",	own: "Own Island",	selected: "Selected Island",	marble: "Marble Island",	wine: "Wine Island",	crystal: "Crystal Island",	sulphur: "Sulphur Island",	variable: "Vary Size",			ownAlliance: "Colour",	ownAllianceFade: "Fade",	alliance: "Own Alliance",	details: "Script Details",		author: "Author",	webpage: "Webpage",	approved: "Approved on",	close: "Close",	move: "Move",	language: "Language",	reset: "Reset Mini-Map Location",		displayMap: "Display Mini-Map" },
	"estonian":	{	ltr: true,	open: "ava maailma kart",	worldMap: "maailma kaart",	miniMap: "maailma väike kaart",	config: "Konfiguratsioon",	scheme: "värvi lahendus",	skin: "välimus",	island: "saar",	sea: "meri",		border: "äär",		grid: "ruudustik",	own: "oma saar",	selected: "valitud saar",	marble: "Kivi saar",	wine: "veini saar",	crystal: "kristalli saar",	sulphur: "Väävli saar",		variable: "muutuv suurus",		ownAlliance: "värv",	ownAllianceFade: "Väljanägemine",	alliance: "Enda liit",	details: "Tetailid",			author: "Autor",	webpage: "koduleht",	approved: "Lubatud",		close: "Sulge",	move: "liigu",	language: "Keel",	reset: 'Reset Mini-Map Location',		displayMap: 'Display Mini-Map' },
	"filipino":	{	ltr: true,	open: "Buksan Mapa ng Mundo",	worldMap: "Mapa ng Mundo",	miniMap: "Mini Map",		config: "Configuration",	scheme: "Tema ng mga Kulay",	skin: "Skin",	island: "Isla",		sea: "Karagatan",	border: "Gilid",	grid: "Grid",	own: "Sariling Isla",	selected: "Napiling Isla",	marble: "Isla ng Marmol",	wine: "Isla ng Alak",	
crystal: "Isla ng Kristal",	sulphur: "Isla ng Asupre",	variable: "Iba-ibahin ang sukat",	ownAlliance: "Kulay",	ownAllianceFade: "Fade",	alliance: "Sariling Alyansa",	details: "Mga Detalye ng Script",	author: "May-akda",	webpage: "Webpage",	approved: "Aprubado sa",	close: "Isara",	move: "Ilipat",	language: "Wika",	reset: 'I-reset ang Mini-Mapa ng Lokasyon',	displayMap: 'Ipakita ang Mini-Map' },
	"finish":	{	ltr: true,	open: 'Open World Map',		worldMap: 'World Map',		miniMap: 'Maailma Mini-Map',	config: 'Kokoonpano', scheme: 'Värimalli', skin: 'Iho', island: 'Island', sea: 'Sea', border: 'Rajavalvonta', grid: 'Grid', own: 'Oma Island', selected: 'Valitut Island', marble: 'Marmori Island', wine: 'Viini Island', crystal: 'Crystal Island', sulphur: 'Rikkipitoisuus Island', variable: 'Vary Koko', ownAlliance: 'Väri', ownAllianceFade: 'Fade', alliance: 'Oma Alliance', details: 'Script Details', author: 'Laatija', webpage: 'Webpage', approved: 'Hyväksynyt', close: 'Sulje', move: 'Siirrä', language: 'Kieli', reset: 'Nollaa Mini-Map Sijainti', displayMap: 'Näyttö Mini-Map' },
	"french":	{	ltr: true,	open: "Voir Carte du Monde",	worldMap: "Carte du Monde",	miniMap: "Carte de la Région",	config: "Options",	scheme: "Couleurs",		skin: "Thème",	island: "Ile",	sea: "Ocean", border: "Rivages", grid: "Quadrillage", own: "Ile de résidence", selected: "Ile sélectionnée", marble: "Ile de marbre", wine: "Ile de vin", crystal: "Ile de cristal", sulphur: "Ile de soufre",	variable: "Taille variable",	ownAlliance: "Couleur", ownAllianceFade: "Couleur progressive", alliance: "Alliance", details: "A propos", author: "Auteur", webpage: "Site Web", approved: "Approuvé sur", close: "Fermer", move: "Déplacer", language: "Langue", reset: "Réinitialiser la carte", displayMap: "Montrer la carte" },
	"german":	{	ltr: true,	open: "öffnen Weltkarte",	worldMap: "Weltkarte",		miniMap: "Mini Weltkarte",	config: "Konfiguration",	scheme: "Farb Schema",	skin: "Aussehen",	island: "Insel",	sea: "Meer",	border: "Rahmen",	grid: "Gitternetz",	own: "Eigene Insel",	selected: "Gewählte Insel",	marble: "Marmor Insel",	wine: "Wein Insel",	crystal: "Kristall Insel",	sulphur: "Schwefel Insel",	variable: "nur Markieren",	ownAlliance: "Farbe",	ownAllianceFade: "überblenden",	alliance: "Eigene Allianz", details: "Script Details", author: "Autor", webpage: "Webseite", approved: "Genemigt am", close: "Schliessen", move: "Verschieben", language: "Sprache", reset: 'Setzen Sie Mini-Karte Lage', displayMap: 'Display Mini-Map' },
	"greek":	{	ltr: true,	open: "Άνοιξε τον Παγκόσμιο Χάρτη", worldMap: "Παγκόσμιος Χάρτης", miniMap: "Μικρογραφία Παγκόσμιου Χάρτη", config: "Ρυθμίσεις", scheme: "Συνδυασμός Χρωμάτων", skin: "Επιφάνεια",	island: "Νησί",	sea: "Θάλασσα",	border: "Όριο",	grid: "Πλέγμα",	own: "Το Νησί μου",	selected: "Επιλεγμένο Νησί",	marble: "Νησί Μαρμάρου",	wine: "Νησί Κρασιού",	crystal: "Νησί Κρυστάλλου",	sulphur: "Νησί Θείου",	variable: "Μεταβολή Μεγέθους",	ownAlliance: "Χρώμα",	ownAllianceFade: "Ξεθώριασμα",	alliance: "Η Συμμαχία μου",	details: "Λεπτομέρειες script",		author: "Συντάκτης",	webpage: "Ιστοσελίδα",	approved: "Εγκεκριμένο σε",	close: "Κλείσιμο",	move: "Μετακίνηση",	language: "Γλώσσα", reset: "Επαναφορά Θέσης Μικρογραφίας Χάρτη", displayMap: "Προβολή Μικρογραφίας Χάρτη" },
	"hebrew":	{	ltr: false,	open: "פתח את",			worldMap: "מפת העולם",		miniMap: "מפת עולם מוקטנת",		config: "הגדרות",	scheme: "טבלת צבעים",	skin: "עיצוב",	island: "אי",	sea: "ים",	border: "גבול",	grid: "רשת",	own: "האי שלך",	selected: "אי מסומן",	marble: "אי שיש",	wine: "אי יין",	crystal: "אי קריסטל",	sulphur: "אי גופרית",	variable: "שנה גודל",	ownAlliance: "צבע",	ownAllianceFade: "דהוי",	alliance: "הברית שלך",	details: "פרטי הסקריפט",	author: "יוצר",	webpage: "אתר הסקריפט",	approved: "אושר",	close: "סגור",	move: "הזז",	language: "שפה", reset: "אפס מיני מפת מיקום", displayMap: "הצגת מפת מיני" },
	"hungarian":	{	ltr: true,	open: "Világtérképet mutat",	worldMap: "Világtérkép",	miniMap: "Mini világtérkép",	config: "Beállítások",	scheme: "Színek",	skin: "Téma",	island: "Sziget",	sea: "Tenger",	border: "Keret",	grid: "Rácsozat",	own: "Saját sziget",	selected: "Kiválasztott sziget",	marble: "Márványos sziget",	wine: "Boros sziget",	crystal: "Kristályos sziget",	sulphur: "Kénes sziget",	variable: "Változó méret",	ownAlliance: "Szín",	ownAllianceFade: "Árnékolás",	alliance: "Saját szövetség",	details: "Script adatai",	author: "Szerző",	webpage: "Weboldal",	approved: "Engedélyezve",	close: "Bezár",	move: "Mozgatás",	language: "Nyelv", reset: "Alapértelmezett Mini Világtérkép Pozíció", displayMap: "Mini Térkép-Megjelenítés" },
	"indonesian":	{	ltr: true,	open: "Buka Peta Dunia",	worldMap: "Peta Dunia",		miniMap: "Peta-Kecil Dunia",	config: "Pengaturan",	scheme: "Skema Warna",	skin: "Sampul",	island: "Pulau",	sea: "Laut",	border: "Bingkai",	grid: "Kisi",		own: "Pulau milik kita",	selected: "Pulau terpilih",	marble: "Pulau Marmer",		wine: "Pulau Anggur",	crystal: "Pulau Kristal",	sulphur: "Pulau Sulfur",	variable: "Variasi Ukuran",	ownAlliance: "warna",	OwnAllianceFade: "Pudar",	alliance: "Aliansi Kita",	details: "Detil Skrip",		author: "Penulis",	webpage: "halaman jaringan",	approved: "setuju aktif",	close: "Tutup",	move: "Gerak",	language: "Bahasa",	reset: "Ulang Lokasi Peta-Kecil",		displayMap: "Tampilkan Peta-kecil" },
	"italian":	{	ltr: true,	open: "Apri Mappamondo",	worldMap: "Mappamondo",		miniMap: "Mini Mappamondo",	config: "Configurazione",	scheme: "Schema Colori",	skin: "Tema",	island: "Isola",	sea: "Mare",	border: "Bordo",	grid: "Griglia",	own: "Tua Isola",	selected: "Isola Selezionata",	marble: "Isola di Marmo",	wine: "Isola di Vino",	crystal: "Isola di Cristallo",	sulphur: "Isola di zolfo",	variable: "Varia Misura",	ownAlliance: "Colore",	ownAllianceFade: "Dissolvenza",	alliance: "Tua Alleanza",	details: "Dettagli Script",	author: "Autore",	webpage: "Pagina Web",	approved: "Approvato",	close: "Chiudi",	move: "Sposta",	language: "Lingua",	reset: "Ripristina posizione Mini Mappamondo",	displayMap: "Visualizza Mini Mappamondo" },
	"korean":	{	ltr: true,	open: '열기 세계지도',		worldMap: '세계지도',		miniMap: '세계 미니 -지도',		config: '구성', scheme: '색상 구성표', skin: '피부', island: '섬', sea: '바다', border: '국경', grid: '바둑 판식', own: '고객님의 섬', selected: '선택된 섬', marble: '대리석 아일랜드', wine: '와인 섬', crystal: '크리스탈 섬', sulphur: '유황 섬', variable: '크기 비바리', ownAlliance: '컬러', ownAllianceFade: '페이드', alliance: '고객님 얼라이언스', details: '스크립트 세부 사항', author: '저자', webpage: '웹페이지', approved: '에 승인된', close: '닫기', move: '이동', language: '언어', reset: '재설정 미니 -지도 위치', displayMap: '디스플레이 미니 -지도' },
	"latvian":	{	ltr: true,	open: "Atvērt Pasaules Karte",	worldMap: "Pasaules Karte",	miniMap: "Pasaules Minikarte",	config: "Konfigurācija",	scheme: "Krāsu shēma",	skin: "Tēma",	island: "Sala",	sea: "Jūra",	border: "Rāmis",	grid: "Tīklojums",	own: "Mana sala",	selected: "Izvēlētā sala",	marble: "Marmora sala",	wine: "Vīna sala",	crystal: "Kristāla sala",	sulphur: "Sēra sala",	variable: "Mainīt izmēru",	ownAlliance: "Krāsa",	ownAllianceFade: "Ēnojums",	alliance: "Mana aliance",	details: "Par skriptu",	author: "Autors",	webpage: "Weblapa",	approved: "Apstiprināts",	close: "Aizvērt",	move: "Pārvietot",	language: "Valoda",	reset: "Atjaunot minikartes atrašanās vietu",	displayMap: "Parādīt Minikarti" },
	"lithuanian":	{	ltr: true,	open: 'Atidaryti Pasaulio žemėlapis', worldMap: 'Pasaulio žemėlapis', miniMap: 'Pasaulis mini žemėlapis', config: 'Konfigūracija', scheme: 'Spalvų schema', skin: 'Oda', island: 'Sala', sea: 'Jūra', border: 'Sienos', grid: 'Tinklelis', own: 'Nuosavos salos', selected: 'Pasirinktą sala', marble: 'Marmuro salos', wine: 'Vyno sala', crystal: 'Crystal Island', sulphur: 'Sieros sala', variable: 'Varai Dydis', ownAlliance: 'Spalva', ownAllianceFade: 'Fade', alliance: 'Nuosavas aljansas', details: 'Scenarijaus duomenys', author: 'Autorius', webpage: 'Svetainė', approved: 'Patvirtintas', close: 'Uždaryti', move: 'Judėti', language: 'Kalba', reset: 'Zresetuj Mini žemėlapis Vieta', displayMap: 'Rodyti Mini Žemėlapis' },
	"norwegian":	{	ltr: true,	open: 'Åpne World Map',		worldMap: 'World Map',		miniMap: 'World Mini-Kart',	config: 'Konfigurering', scheme: 'Fargeskjemaet', skin: 'Hud', island: 'Island', sea: 'Sea', border: 'Ramme', grid: 'Grid', own: 'Egen øy', selected: 'Valgte Island', marble: 'Marble Island', wine: 'Wine Island', crystal: 'Crystal Island', sulphur: 'Svovel Island', variable: 'Variere Størrelse', ownAlliance: 'Farge', ownAllianceFade: 'Falme', alliance: 'Egen allianse', details: 'Script Detaljer', author: 'Forfatter', webpage: 'Webside', approved: 'Godkjent', close: 'Lukke', move: 'Flytte', language: 'Språk', reset: 'Tilbakestill Mini-Kartpunkt', displayMap: 'Skjerm Mini-Kart' },
	"pinoy":	{	ltr: true,	open: 'Buksan World Map',	worldMap: 'World Map',		miniMap: 'Mini-World Map',	config: 'Configuration', scheme: 'Kulay Scheme', skin: 'Balat', island: 'Island', sea: 'Dagat', border: 'Hangganan', grid: 'Parilya', own: 'Sariling Island', selected: 'Napiling Island', marble: 'Marble Island', wine: 'Alak Island', crystal: 'Crystal Island', sulphur: 'Sulphur Island', variable: 'Mag-iba-iba na Sukat', ownAlliance: 'Kulay', ownAllianceFade: 'Manlabo', alliance: 'Sariling Alliance', details: 'Mga Detalye ng script', author: 'May-akda', webpage: 'Webpage', approved: 'Aprubadong sa', close: 'Isara / malapit', move: 'Ilipat', language: 'Wika', reset: 'I-reset ang Mini-Mapa ng Lokasyon', displayMap: 'Ipakita ang Mini-Map' },
	"polish":	{	ltr: true,	open: "Otwórz Mapa Świata",	worldMap: "Mapa Świata",	miniMap: "Świat Mini-Mapa",	config: "Konfiguracja",	scheme: "Układ kolorów",	skin: "Skorka",	island: "Wyspa",	sea: "Woda",	border: "Obwódka",	grid: "Siatka",	own: "Własne wyspy",	selected: "Wybrane wyspy",	marble: "Wyspa z marmurem",	wine: "Wyspa z winem",	crystal: "Wyspa z kryształem",	sulphur: "Wyspa z siarką",	variable: "Zmień wielkość",	ownAlliance: "Kolor",	ownAllianceFade: "Przyciemnienie",	alliance: "Własny sojusz",	details: "Szczegóły skryptu",	author: "Autor",	webpage: "Strona Web",	approved: "Legalność",	close: "Zamknij",	move: "Przenieś",	language: "Język", reset: 'Resetuj Mini Mapa Lokalizacja', displayMap: 'Wyświetl Mini Map' },
	"portuguese":	{	ltr: true,	open: 'Mapa Mundial Aberto',	worldMap: 'Mapa Mundial',	miniMap: 'Mini-Mapa Mundial',	config: 'Configuração', scheme: 'Esquema de cores', skin: 'Tema', island: 'Ilha', sea: 'Mar', border: 'Fronteira', grid: 'Grid', own: 'Própria Ilha', selected: 'Ilha Selecionada', marble: 'Ilha de Mármore ', wine: 'Ilha de Vinho', crystal: 'Ilha de Cristal', sulphur: 'Ilha de Enxofre', variable: 'O Tamanho Varia', ownAlliance: 'Cor', ownAllianceFade: 'Fade', alliance: 'Aliança', details: 'Detalhes do script', author: 'Autor', webpage: 'Página web', approved: 'Aprovado em', close: 'Fechar', move: 'Mover', language: 'Linguagem', reset: 'Resetar a Localização do Mini-Mapa', displayMap: 'Mostrar o Mini-Mapa' },
	"romanian":	{	ltr: true,	open: "Deschide Harta Lumii",	worldMap: "Harta Lumii",	miniMap: "Mini-Harta Lumii",	config: "Configurare",	scheme: "Schema de Culori",	skin: "Aspect",	island: "Insula",	sea: "Mare",	border: "Margini",	grid: "Caroiaj",	own: "Insula Mea",	selected: "Insula Selectată",	marble: "Insula de Marmura",	wine: "Insula de Vin",	crystal: "Insula de Cristal",	sulphur: "Insula de Sulf",	variable: "Redimensioneaza",	ownAlliance: "Culoare",	ownAllianceFade: "Nuanţă",	alliance: "Alianţa Mea",	details: "Detaliile Script-ului",	author: "Autor",	webpage: "Pagina Web",	approved: "Aprobat",	close: "Închide",	move: "Mută",	language: "Limbă", reset: "Reseteaza locatia Mini-Hartii", displayMap: "Afiseaza Mini-Harta" }, 
	"russian":	{	ltr: true,	open: "Открыть карту мира",	worldMap: "Карта мира",		miniMap: "Мини-карта мира",	config: "Настройки",	scheme: "Цветовая схема",	skin: "Тема",	island: "Острова",	sea: "Вода",	border: "Граница",	grid: "Сетка",	own: "Мои острова",	selected: "Выбранный остров",	marble: "Острова с мрамором",	wine: "Острова с вином",	crystal: "Острова с хрусталём",	sulphur: "Острова с серой",	variable: "Разный размер",	ownAlliance: "Цвет",	ownAllianceFade: "Затемнение",	alliance: "Мой альянс",	details: "О скрипте",	author: "Автор",	webpage: "Сайт",	approved: "Утверждён",	close: "Закрыть",	move: "Переместить", language: "Язык", reset: 'Сброс мини-карты', displayMap: 'Дисплей Мини-карта' },
	"serbian":	{	ltr: true,	open: 'Отвори мапу света',	worldMap: 'Мапа света',		miniMap: 'Мини мапа света',	config: 'Подешавања',	scheme: 'Шема боја', skin: 'Тема', island: 'Острво', sea: 'Море', border: 'Граница', grid: 'Мрежа', own: 'Моје острво', selected: 'Изабрано острво', marble: 'Острво са мермером', wine: 'Острво са вином', crystal: 'Острво са кристалом', sulphur: 'Острво са сумпором', variable: 'Промени величину', ownAlliance: 'Боја', ownAllianceFade: 'Затамњење', alliance: 'Савез', details: 'Детаљи', author: 'Аутор', webpage: 'Веб страна', approved: 'Одобрено', close: 'Затвори', move: 'Помери', language: 'Језик', reset: 'Ресет локације мини мапе', displayMap: 'Прикажи мини мапу' }, 
	"slovak":	{	ltr: true,	open: 'Otvorené World Map',	worldMap: 'World Map',		miniMap: 'Svet Mini-Map',	config: 'Konfigurácia', scheme: 'Farebnú schému', skin: 'Koža', island: 'Island', sea: 'Mora', border: 'Hraničné', grid: 'Grid', own: 'Vlastné Island', selected: 'Vybrané Island', marble: 'Marble Island', wine: 'Víno Island', crystal: 'Crystal Island', sulphur: 'Oxid Island', variable: 'Veľkosť Vary', ownAlliance: 'Farba', ownAllianceFade: 'Fade', alliance: 'Vlastné aliancia', details: 'Script Detaily', author: 'Autor', webpage: 'Webpage', approved: 'Schvaľuje', close: 'Zavrieť', move: 'Stěhovat', language: 'Jazyk', reset: 'Reset Mini-mapka', displayMap: 'Zobrazenie Mini-Map' },
	"slovene":	{	ltr: true,	open: 'Odpri World Map',	worldMap: 'World Map',		miniMap: 'Svet Mini Map',	config: 'Konfiguracija', scheme: 'Barvna shema', skin: 'Koža', island: 'Otok', sea: 'Morje', border: 'Border', grid: 'Grid', own: 'Lastna Island', selected: 'Izbrana Island', marble: 'Marmor Island', wine: 'Vino Island', crystal: 'Crystal Island', sulphur: 'Žveplov Island', variable: 'Vari Velikost', ownAlliance: 'Barva', ownAllianceFade: 'Fade', alliance: 'Lastna zveze', details: 'Script Podrobnosti', author: 'Avtor', webpage: 'Webpage', approved: 'Odobren na', close: 'Blizu', move: 'Premakniti', language: 'Jezik', reset: 'Ponastavi Mini Map Location', displayMap: 'Prikaži Mini Map' },
	"spanish":	{	ltr: true,	open: "Abrir Mapa del Mundo",	worldMap: "Mapa del Mundo",	miniMap: "Mini-Mapa del Mundo",	config: "Configuración",	scheme: "Esquema de Colores",	skin: "Aspecto",	island: "Isla",	sea: "Mar",	border: "Borde",	grid: "Cuadrícula",	own: "Tus Islas",	selected: "Isla Seleccionada",	marble: "Isla de Mármol",	wine: "Isla de Vino",	crystal: "Isla de Cristal",	sulphur: "Isla de Azufre",	variable: "Cambiar Tamaño",	ownAlliance: "Color",	ownAllianceFade: "Transparencia",	alliance: "Tu alianza",	details: "Detalles del Script",	author: "Autor",	webpage: "Página Web",	approved: "Aprovado en",	close: "Cerrar",	move: "Mover",	language: "Idioma",	reset: "Restablecer Posición del Mini-Mapa",	displayMap: "Mostrar Mini-Mapa" },
	"swedish":	{	ltr: true,	open: "Öppna Världskarta",	worldMap: "Världskarta",	miniMap: "Regionkarta",		config: "Inställningar",	scheme: "Färgschema",	skin: "Tema",	island: "Ö",	sea: "Hav",	border: "Ram",	grid: "Rutnät",	own: "Egen Ö",	selected: "Vald Ö",	marble: "Marmor-ö",	wine: "Vin-ö",	crystal: "Kristall-ö",	sulphur: "Svavel-ö",	variable: "Variera Storlek",	ownAlliance: "Färg",	ownAllianceFade: "Tona",	alliance: "Egen Allians",	details: "Scriptinformation",	author: "Skapare",	webpage: "Webbsida",	approved: "Godkänd den",	close: "Stäng",	move: "Flytta",	language: "Språk",	reset: "Återställ position för Minikartan",	displayMap: "Visa Minikartan" },
	"turkish":	{	ltr: true,	open: "Aç Dünya Haritası",	worldMap: "Dünya Haritası",	miniMap: "Mini Harita",		config: "Yapılandırma",	scheme: "Renk Şeması",	skin: "Görünüm",	island: "Ada",	sea: "Deniz",	border: "Kenar",	grid: "Tablo",	own: "Kendi Adan",	selected: "Seçilen Ada",	marble: "Mermer Adası",	wine: "Üzüm Adası",	crystal: "Kristal Adası",	sulphur: "Sülfür Adası",	variable: "Vary Size",	ownAlliance: "Renk",	ownAllianceFade: "Fade",	alliance: "Kendi İttifakın",	details: "Script Detayı",	author: "Yazar",	webpage: "Web Sayfası",	approved: "Onaylanmış",	close: "Kapat",	move: "Taşı", language: "Dil", reset: 'Sıfırla Mini Harita yeri', displayMap: 'Ekran Mini Haritası' },
	"ukranian":	{	ltr: true,	open: 'Відкритий світ Карта',	worldMap: 'Карта світу',	miniMap: 'Світ Міні-карта',	config: 'Конфігурація', scheme: 'Кольорова схема', skin: 'Шкіра', island: 'Острів', sea: 'Море', border: 'Прикордонний', grid: 'Сітка', own: 'Власний острів', selected: 'Окремі острови', marble: 'Мармурові острови', wine: 'Вино Острів', crystal: 'Кришталевий острів', sulphur: 'Сірка Острів', variable: 'Розмір Вари', ownAlliance: 'Колір', ownAllianceFade: 'Fade', alliance: 'Власні альянс', details: 'Сценарій Подробиці', author: 'Автор', webpage: 'Веб-сторінка', approved: 'Затверджено', close: 'Закрити', move: 'Рухатися', language: 'Мова', reset: 'Скидання міні-картки', displayMap: 'Дисплей Міні-карта' },
	"urdu": 	{	ltr: false,	open: "Open World Map",		worldMap: "World Map",		miniMap: "World Mini-Map",	config: "Configuration",	scheme: "Colour Scheme", skin: "Skin", island: "Island", sea: "Sea", border: "Border", grid: "Grid", own: "Own Island", selected: "Selected Island", marble: "Marble Island", wine: "Wine Island", crystal: "Crystal Island", sulphur: "Sulphur Island",	variable: "Vary Size",	ownAlliance: "Colour", ownAllianceFade: "Fade", alliance: "Own Alliance", details: "Script Details", author: "Author", webpage: "Webpage", approved: "Approved on", close: "Close", move: "Move", language: "Language", reset: "Reset Mini-Map Location", displayMap: "Display Mini-Map" },
	"vietnamese":	{	ltr: true,	open: "Mở Bản Đồ",		worldMap: "Bản Đồ",		miniMap: "Bản Đồ Nhỏ",		config: "Thiết lập",	scheme: "Màu sắc",	skin: "Skin",	island: "Đảo",	sea: "Biển",	border: "Khung",	grid: "Ô",	own: "Đảo mình",	selected: "Đảo đã chọn",	marble: "Đảo Cẩm Thạch",	wine: "Đảo Nho",	crystal: "Đảo Thủy Tinh",	sulphur: "Đảo Lưu Huỳnh",	variable: "Kích thuốc",	ownAlliance: "Có màu",	ownAllianceFade: "Mờ",	alliance: "Liên Minh của mình",	details: "Thông Tin",	author: "Tác Giả",	webpage: "Webpage",	approved: "Cho phép",	close: "Tắt",	move: "Di chuyển",	language: "Ngôn Ngữ", reset: 'Thiết lập lại Mini-Bản đồ địa điểm', displayMap: 'Hiển thị Mini-Bản đồ' }
}[lang];

const left	= language.ltr?'left':'right';
const right	= language.ltr?'right':'left';

/**
 * Skin data for the display.
 * Note: Make sure colours are properly capitolised.
 */
const SKINS	= {
	Map:		{ island: 'Green',		sea: 'Blue',		grid: 'Navy',		border:	'Black',		own: 'DarkRed',		centered: 'White',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'Yellow',		ownAllianceFade: 'Red' },
	Pastel:		{ island: 'DarkKhaki',		sea: 'CornflowerBlue',	grid: 'DarkOliveGreen',	border:	'OliveDrab',		own: 'Black',		centered: 'Gold',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'ForestGreen',	ownAllianceFade: 'DarkGreen' },
	Steel:		{ island: 'Gray',		sea: 'DarkSlateGray',	grid: 'Black',		border:	'Black',		own: 'DarkRed',		centered: 'White',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'Yellow',		ownAllianceFade: 'Red' },
	Desert:		{ island: 'Gold',		sea: 'Navy',		grid: 'SaddleBrown',	border:	'SaddleBrown',		own: 'DarkGreen',	centered: 'White',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'LimeGreen',	ownAllianceFade: 'Green' },
	Volcano:	{ island: 'DarkSlateGray',	sea: 'DarkRed',		grid: 'DimGray',	border:	'DimGray',		own: 'Red',		centered: 'White',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'Gold',		ownAllianceFade: 'Chocolate' },
	Neon:		{ island: 'DeepPink',		sea: 'Black',		grid: 'DarkSlateGray',	border:	'DarkSlateGray',	own: 'MidnightBlue',	centered: 'White',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'Cyan',		ownAllianceFade: 'Blue' },
	Mono:		{ island: 'White',		sea: 'Black',		grid: 'Gray',		border:	'Gray',			own: 'DarkSlateGray',	centered: 'Gold',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'DarkGray',	ownAllianceFade: 'DimGray' }
};

function setColours() {
	const SKIN	= SKINS[ GM_getValue( cache_variables.SKIN, 'Map' ) ];
	const island	= GM_getValue( cache_variables.ISLAND,		SKIN.island );
	const sea	= GM_getValue( cache_variables.SEA,		SKIN.sea );
	const grid	= GM_getValue( cache_variables.GRID,		SKIN.grid );
	const border	= GM_getValue( cache_variables.BORDER,		SKIN.border );
	const own	= GM_getValue( cache_variables.OWN,		SKIN.own );
	const centered	= GM_getValue( cache_variables.CENTERED,	SKIN.centered );
	const marble	= GM_getValue( cache_variables.MARBLE,		SKIN.marble );
	const crystal	= GM_getValue( cache_variables.CRYSTAL,		SKIN.crystal );
	const wine	= GM_getValue( cache_variables.WINE,		SKIN.wine );
	const sulphur	= GM_getValue( cache_variables.SULPHUR,		SKIN.sulphur );
	const ownAll	= GM_getValue( cache_variables.OWNALLIANCE,	SKIN.ownAlliance );
	const ownAllF	= GM_getValue( cache_variables.OWNALLIANCEFADE,	SKIN.ownAllianceFade );
	const variable	= GM_getValue( cache_variables.VARIABLE,	false );
	const fade	= GM_getValue( cache_variables.FADE,		false );
	GM_addStyle(
		'div#worldMap table				{ background: ' + sea + '; }' +
		'div#worldMap table colgroup.grid		{ border-left: 1px solid ' + grid + '; border-right: 1px solid ' + grid + '; }\n' +
		'div#worldMap table tbody			{ border-top: 1px solid ' + grid + '; border-bottom: 1px solid ' + grid + '; }\n' +
		'div#worldMap table tbody tr td			{ background: transparent; border: none; }\n' +
		'div#worldMap table tbody tr td.island		{ background: ' + island + '; border: 1px solid ' + border + '; }\n' +
		(marble?	'div#worldMap table tbody tr td.marble	{ background: ' + marble + '; }\n':'') +
		(crystal?	'div#worldMap table tbody tr td.crystal	{ background: ' + crystal + '; }\n':'') +
		(wine?		'div#worldMap table tbody tr td.wine	{ background: ' + wine + '; }\n':'') +
		(sulphur?	'div#worldMap table tbody tr td.sulphur	{ background: ' + sulphur + '; }\n':'') +
		'div#worldMap table tbody tr td.own		{ background: ' + own + '; }\n' +
		'div#worldMap table tbody tr td.centered	{ background: ' + centered + '; }\n' +
		'div#worldMap table td a .ownAllianceBackground	{ background: ' + ownAll + '; }\n' +
		'div#worldMap table td a .ownAllianceForeground	{ background: ' + ownAllF + '; }' +
		(variable?
		'div#worldMap table td a .tiny			{ width:  50%; height:  50%; margin: 25%; }' +
		'div#worldMap table td a .small			{ width:  66%; height:  66%; margin: 17%; }' +
		'div#worldMap table td a .medium		{ width:  84%; height:  84%; margin:  8%; }' +
		'div#worldMap table td a .large			{ width: 100%; height: 100%; margin:  0%; }'
		:
		'div#worldMap table td a .tiny			{ width: 100%; height: 100%; margin:  0%; }' +
		'div#worldMap table td a .small			{ width: 100%; height: 100%; margin:  0%; }' +
		'div#worldMap table td a .medium		{ width: 100%; height: 100%; margin:  0%; }' +
		'div#worldMap table td a .large			{ width: 100%; height: 100%; margin:  0%; }'
		) +
		(fade?
		'div#worldMap table td a .tiny div		{ opacity: 0; }' +
		'div#worldMap table td a .small div		{ opacity: 0.33; }' +
		'div#worldMap table td a .medium div		{ opacity: 0.67; }' +
		'div#worldMap table td a .large div		{ opacity: 1; }' +
		'div#worldMap table td a div div		{ display: block; }'
		:
		'div#worldMap table td a div div		{ display: none; }'
		)

	);
	delete SKIN, island, sea, grid, border, own, centered, marble, crystal, wine, sulphur, ownAll, ownAllF, variable, fade;
}

const MAP_SIZE = 4;
const MINIMAP_SIZE = 9;

setColours();

GM_addStyle(
	'div.worldMap					{ position: absolute; z-index: 9999; padding: 3px; margin: 0px; background: #e4b873; border: 1px solid brown; }\n' +
	'div.worldMap .contentBox01h			{ margin: 0px; padding: 0px; width: auto;}\n' +
	'div.worldMap .headerRight			{ position: absolute; width: 50px; right: 0px; top: 0px; background-position: right top; }\n' +
	'div.worldMap .footerRight			{ position: absolute; width: 50px; right: 0px; bottom: 0px; background-position: right top; }\n' +
	'div.worldMap .contentRight			{ border-left: 1px solid #e4b873; position: absolute; width: 2px; height: 100%; right: -3px; top: 0px; }\n' +
	'div.worldMap .header img			{ float: right; cursor: pointer; }\n' +
	'div#worldMap table				{ width: auto; margin: 2px auto; }\n' +
	'div#worldMap table tbody.nomargin		{ border-top: transparent; border-bottom: transparent; }\n' +
	'div#worldMap table td				{ vertical-align: bottom; }\n' +
	'div#worldMap table td a			{ display: block; position: relative; top: 0px; left: 0px; }\n' +
	'div#worldMap table.map th			{ width: ' + MAP_SIZE + 'px; height: ' + MAP_SIZE + 'px; background: white; }\n' +
	'div#worldMap table.map td			{ padding: 0px 0px ' + MAP_SIZE + 'px ' + MAP_SIZE + 'px; }\n' +
	'div#worldMap table.map td a			{ width: ' + MAP_SIZE + 'px; height: ' + MAP_SIZE + 'px; margin: 0px 0px -' + MAP_SIZE + 'px -' + MAP_SIZE + 'px; }\n' +
	'div#worldMap table.minimap th			{ width: ' + MINIMAP_SIZE + 'px; height: ' + MINIMAP_SIZE + 'px; background: #e4b873; }\n' +
	'div#worldMap table.minimap td			{ padding: 0px 0px ' + MINIMAP_SIZE + 'px ' + MINIMAP_SIZE + 'px; }\n' +
	'div#worldMap table.minimap td a		{ width: ' + MINIMAP_SIZE + 'px; height: ' + MINIMAP_SIZE + 'px; margin: 0px 0px -' + MINIMAP_SIZE + 'px -' + MINIMAP_SIZE + 'px;}\n' +
	'div#worldMap table td a div			{ top: 0px; left: 0px; padding: 0px; position: absolute; }' +
	'div#worldMap table td a div div		{ width: 100%; height: 100%; margin: 0px; }' +
	'div#worldMap table.map td.white		{ background: white; border: 1px solid black; font-size: 8px; text-align: ' + right + '; }\n' +
	'div#worldMap table.map td.black		{ background: black; border: 1px solid black; font-size: 8px; text-align: ' + right + '; color: white; }\n' +
	'div#worldMap table.map td.left			{ text-align: ' + left + '; }\n' +
	'div#worldMapLink				{ display: block; position: absolute; ' + right + ': 1px; top: 1px; z-index: 100; cursor: pointer; font-size: 8px; background: #e4b873; border: 1px solid brown; }' +
	'div#worldMapLink img				{ float: ' + right + '; margin-top: 5px; }' +
	'div#worldMapLink p				{ float: ' + right + '; margin: 0px; padding: 2px; }'
);

/**
 * getIslandMap() is in IkariamMap-Id_Luxury_Name.js
 */
const ikariamMap = getIslandMap();

var player	= GM_getValue( cache_variables.PLAYER, '' );
var ownIslands	= undefined;

$("select#citySelect").each( function() {
	$("option", this).each( function() {
		var match = /\[0?(\d+):0?(\d+)\]/.exec( this.innerHTML );
		if ( match ) {
			var	x = match[1],
				y = match[2];
			if ( ownIslands == undefined )		ownIslands = {};
			if ( ownIslands[x] == undefined)	ownIslands[x] = {};
			if ( ownIslands[x][y] == undefined)	ownIslands[x][y] = 1;
			else					ownIslands[x][y]++;
		}
	});
});

var createIsland = function( r, c, coords, center ) {
	if ( ikariamMap[c][r] ) {
		var id		= ikariamMap[c][r][0];
		var good;
		switch ( ikariamMap[c][r][1] ) {
		case 1: good = 'wine'; break;
		case 2: good = 'marble'; break;
		case 3: good = 'crystal'; break;
		case 4: good = 'sulphur'; break;
		}
		var name	= ikariamMap[c][r][2];
		var players	= (coords && coords[c] && coords[c][r])?coords[c][r]:false;
		var own		= (ownIslands && ownIslands[c] && ownIslands[c][r])?ownIslands[c][r]:(players && players[player]?players[player]:0);
		var data	= own>0?[player]:[];
		var alliance	= '';
		if ( players ) {
			var numTowns	= own;
			for ( var p in players ) {
				if ( p != player ) {
					data.push(p);
					numTowns += players[p];
				}
			}
			var s = numTowns < 2?'tiny':(numTowns < 4?'small':(numTowns < 6?'medium':'large'));
			alliance = '<div class="ownAllianceBackground ' + s + '"><div class="ownAllianceForeground"/></div>';
		}
		if ( center )
			return '<td class="island ' + good + ' centered"><a href="?view=island&id=' + id + '" title="' + name + ' [' + c + ':' + r + ']' + (data.length>0?' - ' + data.join( ', ' ):'') + '"></a></td>'
		else if ( own > 0 )
			return '<td class="island ' + good + ' own"><a href="?view=island&id=' + id + '" title="' + name + ' [' + c + ':' + r + ']' + (data.length>0?' - ' + data.join( ', ' ):'') + '"></a></td>';
		else 
			return '<td class="island ' + good + '"><a href="?view=island&id=' + id + '" title="' + name + ' [' + c + ':' + r + ']' + (data.length>0?' - ' + data.join( ', ' ):'') + '">' + alliance + '</a></td>';
	} else
		return '<td />';
};

if ( PAGE_ID == "world" ) {

	var worldMapCreated	= false;
	var worldConfigCreated	= false;

	function createWorldMap() {
		const closeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADCklEQVR42qWTa2gcVRTHfzO7s7vZR8hLTVNImqYxbZNtQzXWxla/VD9ooSClCPpBrCFWK0oKrVRaK4rFhkpbWiKUfooEKi2KiQ/oAyRq3KItZq0xIWmS3Tw22d3MbvYxOzO7s04HFEv9VA9cLgfu/Z17/vd/BP5nCP9OLkNFElpssFOEVgPKNDB085y55xMwbK6BWfjmvJnfBRiC7UXo9tSVt7rXNiE99AB2t4uCqlFIp1HlJRLzcUKzS8xntM+zInsOqVraAnwBpSslflndsauxsuM1WJyCkWFyC1GQk2iJZfSUgigIqGqB74NhRuXMC++pygUL0AeP+xuqhlou9ELgCuGvv0Vw+vBl48xEVZySA6eSQSgtw1NZQTAUI3A7cvZAcnmfBfgKjjQ/98T7q1/ZzfSZ00TbnqepYw/Th7sQNm6h9ql24qe6sYUn8dRUMxFJEBgJDb4Zl5+0AAPQ73/x2R0rHq5hNnCTqpOf4W1cSyERwyaaUjok9N9/I3KwC3d5KXOJLIPB22NvLMabLEA/3Hz01Z2tJYKO/keQuRXNtJzrRSzc0V7DMJ8fOfwu+kgQ37pGFhcTXL0xpu+LyQ4LcAlS7S8943UpaaaC40gvv07z3k5QFROQp5BNm+0cQZgap2JdA1MzMa79+iddclL4W8TxzU8/0uDRssTiGWp7zuPbtIHifAQjr2PzejAQWTp7Ekd4glvTUQaHx0MHk6k6C3DO9NCm5trtNZU+clGZ4no/K/fvJ9bTQ65gsOr4xxRDk2T6LyJEo/x4fYTAaPiHo2pumwU4AZ1rKnyftvnrze9zYBh3hHNi5FRLQG97O/ZcCjGdIja9wHfXbzGzIB/7wMgfsgDd8KBbkn6ur66sb1hVjbfMa96XEF0uBLvNdKOCVhRJymlujIWZnItmVVXd8CFM/GPlT0T7Y4JkO1HiKdlaVerB7XVhdzgoFIsomoa8rLCUyqBkciFDz791FOPLe4bpHTDlYrdol962Ox1+q7rZjq7nl/Wc9pOB0WfOy7WPYPY/p/F+4i+Dw1MghmEh9gAAAABJRU5ErkJggg==';

		const helpImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADBklEQVR42qXTa2hbdRjH8W9y0pwkTZMlM52FNdXaXVCydZvSbhXRgDpat6lTrG90bi+UCpugOCaulJW2ysZAZAoKVhwM2WRTJowtsuou1Hqpts5pK1nSNCRbm5pkJ7eTc4mHCAPFsRf+3/zh4f//8PDwe0z8z2O6Wf2jVdy/yMeD2GhOa4STGl++GeLnWwInOmj131vX51nWvsXhqseUS5CamSISTRRjEl9IFWH37lNa7D+B0108vbzrsWF/e1eteu1HZn8dAylFg8eNVpSZ/C3GLwva7/Nl4dHe0N/IDeDoQ6xc07VhvGXj8/aroX5Gx+PU3rEeXfSiRS9wty2LKLq4NJtjIq2HBLOw+dXTWqkKeAzo5IuuI61PvNRdM/0+o38U8W48SKCpArksMWsb+ZOvo0cnUDQLP6Q0IkWeGRypHK0CQy0EHt/RNtZ8m2IvRcaRA1vJrNiFN7SZ3JUMicA2AvcFmT70HGZjqmFJZTKrjuw7S7AKHH6Y19qD6/bfXrmCIqWx3RnAuvUzwid6Of/5cTpe+YD6cpzwp3ux2rwkMiWji4LSexZrFTiyieG2VU3b3OY/0WQJwaiqgoOvFvx09ryNeH2GqcN7UHSBOqeX2Fyab5NZ+kYwVYGPN3Ford/d47OV0ZSSMZEKqnGZnx3GlblM+JP9yE4Rh6+ROsHCRCTJ93PZ8NA3tFSB/gd4qnON71hTrQUpX0QtFyjIKrPLummYH0NNxRHrG3G7vSjpDGemYsSl0tBb53ijCrywGt+W1e4LrUsWLbc6nMiKTCGfx/7kQYTkBMXJ4zgXNyDkS/w0HWUskUqqsrZ+4CIzN3JwoLNm54rFrnfWNTciuozgmI15N61FLWZR58KouRKXo3G+m71KvqjsHDjPu/8IUvc9mNvvsn241OXcvrKhHo/Hg0lXKKsaacn4nJgjksoY3Snv9X/NyzfdhcFHavbUOsQer92+VLRYuC4rLOTyFEryJVXV9w2c49gtt7EvaPHrZlOQSqXDVNELaPqIUubi4Cjz/377F9GJSyCacieSAAAAAElFTkSuQmCC';

		var coords;
		$('#memberList .cityInfo').each( function() {
			var name = $( this ).prev().text();
			if ( $( this ).parent().hasClass("1") || $(this).parent().hasClass("highlight") )
				GM_setValue( cache_variables.PLAYER, player = name );
			$( 'a', this ).each( function() {
				var match = /\[0?(\d+):0?(\d+)\]/.exec( this.innerHTML );
				if ( match ) {
					var x = match[1];
					var y = match[2];
					if ( coords == undefined )		coords = {};
					if ( coords[x] == undefined )		coords[x] = {};
					if ( coords[x][y] == undefined )	coords[x][y] = {};
					if ( coords[x][y][name] == undefined )	coords[x][y][name] = 1;
					else					coords[x][y][name]++;
				}
			});
		} );

		if ( coords == undefined )
			coords = eval( GM_getValue( cache_variables.ALLIANCE, false ) ) || {};
		else
			GM_setValue( cache_variables.ALLIANCE, coords.toSource() );

		var html = [];
		for ( var r = 1; r <= 100; r++ ) {
			if ( r % 10 == 1 )
				html.push( '<tbody>' );
			html.push( '<tr>' );
			if ( r % 20 == 1 )
				html.push( '<td class="white" rowspan="10">' + (r+9) + '</td>' );
			else if ( r % 20 == 11 )
				html.push( '<td class="black" rowspan="10">' + (r+9) + '</td>' );
			for ( var c = 1; c <= 100; c++ )
				html.push( createIsland( r, c, coords ) );
			if ( r % 20 == 1 )
				html.push( '<td class="white left" rowspan="10">' + (r+9) + '</td>' );
			else if ( r % 20 == 11 )
				html.push( '<td class="black left" rowspan="10">' + (r+9) + '</td>' );
			if ( r % 10 == 0 )
				html.push( '</tr></tbody>' );
			else
				html.push( '</tr>' );
		}

		GM_addStyle( 'div#worldMap { top: 5px; ' + left + ': 5px; }' );
		$('body').prepend('<div class="worldMap" id="worldMap"><div class="contentBox01h"><h3 class="header"><p>' + language.worldMap + '<p></h3>' +
				'<div class="content"><table class="map">\n' +
				'<colgroup span="1"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="1"></colgroup>\n' +
				'<tbody class="nomargin"><tr><th /><td class="white" colspan="10">10</td><td class="black" colspan="10">20</td><td class="white" colspan="10">30</td><td class="black" colspan="10">40</td><td class="white" colspan="10">50</td><td class="black" colspan="10">60</td><td class="white" colspan="10">70</td><td class="black" colspan="10">80</td><td class="white" colspan="10">90</td><td class="black" colspan="10">100</td><th /></tr></tbody>\n' +
				html.join( '' ) +
				'<tbody class="nomargin"><tr><th /><td class="white" colspan="10">10</td><td class="black" colspan="10">20</td><td class="white" colspan="10">30</td><td class="black" colspan="10">40</td><td class="white" colspan="10">50</td><td class="black" colspan="10">60</td><td class="white" colspan="10">70</td><td class="black" colspan="10">80</td><td class="white" colspan="10">90</td><td class="black" colspan="10">100</td><th /></tr></tbody>\n' +
				'</table></div><div class="footer"></div>' +
				'<div class="content contentRight"></div><div class="footer footerRight"></div><h3 class="header headerRight">' +
				'<img id="close" src="' + closeImage + '" title="' + language.close + '" width="16" height="16">' +
				'<img id="help" src="' + helpImage + '" title="' + language.config + '" width="16" height="16">' +
				'</h3></div></div>');
		$('div#worldMap h3.header img#close').click( function() { $("div.worldMap").hide(); } );
		$('div#worldMap h3.header img#help').click( function() {
				if ( !worldConfigCreated )
					createConfig();
				$("div#worldMapConfig").show();
			} );

		worldMapCreated = true;

		delete ikariamMap, html, coords, closeImage, helpImage;
	}

	function getChangeFn( id ) {
		return function( v ) { GM_setValue( id, v ); setColours(); };
	}

	function resetControl( cb, s, v, d ) {
		s.attr( "disabled", !v );
		cb.attr( "checked", v!=false );
		selectColour( s, v || d );
	}

	function enableControl( cb, id, s ) {
		cb.change( function() {
			var v = this.checked;
			s.attr( "disabled", !v );
			if ( v )
				GM_setValue( id, s.val() );
			else
				GM_deleteValue( id );
			setColours();
		});
	}

	function createConfig() {
		const closeImage ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADCklEQVR42qWTa2gcVRTHfzO7s7vZR8hLTVNImqYxbZNtQzXWxla/VD9ooSClCPpBrCFWK0oKrVRaK4rFhkpbWiKUfooEKi2KiQ/oAyRq3KItZq0xIWmS3Tw22d3MbvYxOzO7s04HFEv9VA9cLgfu/Z17/vd/BP5nCP9OLkNFElpssFOEVgPKNDB085y55xMwbK6BWfjmvJnfBRiC7UXo9tSVt7rXNiE99AB2t4uCqlFIp1HlJRLzcUKzS8xntM+zInsOqVraAnwBpSslflndsauxsuM1WJyCkWFyC1GQk2iJZfSUgigIqGqB74NhRuXMC++pygUL0AeP+xuqhlou9ELgCuGvv0Vw+vBl48xEVZySA6eSQSgtw1NZQTAUI3A7cvZAcnmfBfgKjjQ/98T7q1/ZzfSZ00TbnqepYw/Th7sQNm6h9ql24qe6sYUn8dRUMxFJEBgJDb4Zl5+0AAPQ73/x2R0rHq5hNnCTqpOf4W1cSyERwyaaUjok9N9/I3KwC3d5KXOJLIPB22NvLMabLEA/3Hz01Z2tJYKO/keQuRXNtJzrRSzc0V7DMJ8fOfwu+kgQ37pGFhcTXL0xpu+LyQ4LcAlS7S8943UpaaaC40gvv07z3k5QFROQp5BNm+0cQZgap2JdA1MzMa79+iddclL4W8TxzU8/0uDRssTiGWp7zuPbtIHifAQjr2PzejAQWTp7Ekd4glvTUQaHx0MHk6k6C3DO9NCm5trtNZU+clGZ4no/K/fvJ9bTQ65gsOr4xxRDk2T6LyJEo/x4fYTAaPiHo2pumwU4AZ1rKnyftvnrze9zYBh3hHNi5FRLQG97O/ZcCjGdIja9wHfXbzGzIB/7wMgfsgDd8KBbkn6ur66sb1hVjbfMa96XEF0uBLvNdKOCVhRJymlujIWZnItmVVXd8CFM/GPlT0T7Y4JkO1HiKdlaVerB7XVhdzgoFIsomoa8rLCUyqBkciFDz791FOPLe4bpHTDlYrdol962Ox1+q7rZjq7nl/Wc9pOB0WfOy7WPYPY/p/F+4i+Dw1MghmEh9gAAAABJRU5ErkJggg==';

		const skin	= GM_getValue( cache_variables.SKIN, 'Map' );
		const SKIN	= SKINS[ skin ];
		const island	= GM_getValue( cache_variables.ISLAND,		SKIN.island );
		const sea	= GM_getValue( cache_variables.SEA,		SKIN.sea );
		const grid	= GM_getValue( cache_variables.GRID,		SKIN.grid );
		const border	= GM_getValue( cache_variables.BORDER,		SKIN.border );
		const own	= GM_getValue( cache_variables.OWN,		SKIN.own );
		const centered	= GM_getValue( cache_variables.CENTERED,	SKIN.centered );
		const marble	= GM_getValue( cache_variables.MARBLE,		SKIN.marble );
		const crystal	= GM_getValue( cache_variables.CRYSTAL,		SKIN.crystal );
		const wine	= GM_getValue( cache_variables.WINE,		SKIN.wine );
		const sulphur	= GM_getValue( cache_variables.SULPHUR,		SKIN.sulphur );
		const ownAll	= GM_getValue( cache_variables.OWNALLIANCE,	SKIN.ownAlliance );
		const ownAllF	= GM_getValue( cache_variables.OWNALLIANCEFADE,	SKIN.ownAllianceFade );
		const variable	= GM_getValue( cache_variables.VARIABLE,	false );
		const fade	= GM_getValue( cache_variables.FADE,		false );

		GM_addStyle(
			'div#worldMapConfig			{ top: 5px; ' + right + ': 5px; width: 300px; z-index: 400; }\n' +
			'div#worldMapConfig table		{ margin-top: 2px; }\n' +
			'div#worldMapConfig table td		{ border: 1px solid #e4b873; }\n' +
			'div#worldMapConfig table th		{ border: 1px solid #e4b873; }\n' +
			'div#worldMapConfig table tbody td	{ margin: 0px; padding: 0px 3px 0px 0px; }\n' +
			'div#worldMapConfig table tbody th	{ margin: 0px; padding: 0px 0px 0px 2px; text-align: left; }\n' +
			'div#worldMapConfig select		{ width: 100%; border: 1px solid brown; -moz-border-radius: 4px; }\n' +
			'div#worldMapConfig select option	{ -moz-border-radius: 4px; }\n' +
			'div#worldMapConfig input		{ width: 100%; }\n' +
			'div#worldMapConfig span.approval	{ width: 33%; float: left; }\n' +
			'.ui-helper-hidden { display: none; }' +
			'.ui-helper-hidden-accessible { position: absolute; left: -99999999px; }' +
			'.ui-helper-reset { margin: 0; padding: 0; border: 0; outline: 0; line-height: 1.0; text-decoration: none; font-size: 100%; list-style: none; }' +
			'.ui-helper-clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }' +
			'.ui-helper-zfix { width: 100%; height: 100%; top: 0; left: 0; position: absolute; opacity: 0; }' +
			'.ui-state-disabled { cursor: default !important; }' +
			'.ui-widget-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }' +
			'.ui-widget { font-family: Arial,sans-serif; font-size: 0.9em; }' +
			'.ui-widget-content { border: 1px solid #e4b873; background: #ffffff; color: #000; }' +
			'.ui-widget-content a { color: #000; }' +
			'.ui-widget-header { border: 1px solid #8b4513; background: #e4b873; color: #ffffff; font-weight: bold; }' +
			'.ui-widget-header a { color: #ffffff; }' +
			'.ui-state-default, .ui-widget-content .ui-state-default { border: 1px solid #8b4513; background: #eaad4d; font-weight: normal; color: #333; outline: none; }' +
			'.ui-state-default a, .ui-state-default a:link, .ui-state-default a:visited { color: #333; text-decoration: none; outline: none; }' +
			'.ui-state-hover, .ui-widget-content .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus { border: 1px solid #8b4513; background: #c49140; font-weight: normal; color: #000000; outline: none; }' +
			'.ui-state-hover a, .ui-state-hover a:hover { color: #000000; text-decoration: none; outline: none; }' +
			'.ui-state-active, .ui-widget-content .ui-state-active { border: 1px solid #8b4513; background: #ffffff; font-weight: normal; color: #8b4513; outline: none; }' +
			'.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited { color: #8b4513; outline: none; text-decoration: none; }' +
			'.ui-corner-tl { -moz-border-radius-topleft: 6px; }' +
			'.ui-corner-tr { -moz-border-radius-topright: 6px; }' +
			'.ui-corner-bl { -moz-border-radius-bottomleft: 6px; }' +
			'.ui-corner-br { -moz-border-radius-bottomright: 6px; }' +
			'.ui-corner-top { -moz-border-radius-topleft: 6px; -moz-border-radius-topright: 6px; }' +
			'.ui-corner-bottom { -moz-border-radius-bottomleft: 6px; -moz-border-radius-bottomright: 6px; }' +
			'.ui-corner-right {  -moz-border-radius-topright: 6px; -moz-border-radius-bottomright: 6px; }' +
			'.ui-corner-left { -moz-border-radius-topleft: 6px; -moz-border-radius-bottomleft: 6px; }' +
			'.ui-corner-all { -moz-border-radius: 6px; }' +
			'.ui-tabs { padding: .2em; zoom: 1; }' +
			'.ui-tabs .ui-tabs-nav { list-style: none; position: relative; padding: .2em .2em 0; }' +
			'.ui-tabs .ui-tabs-nav li { position: relative; float: left; border-bottom-width: 0 !important; margin: 0 .2em -1px 0; padding: 0; }' +
			'.ui-tabs .ui-tabs-nav li a { float: left; text-decoration: none; padding: .5em 1em; height: 2em; }' +
			'.ui-tabs .ui-tabs-nav li.ui-tabs-selected { padding-bottom: 1px; border-bottom-width: 0; }' +
			'.ui-tabs .ui-tabs-nav li.ui-tabs-selected a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-state-processing a { cursor: text; }' +
			'.ui-tabs .ui-tabs-nav li a, .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a { cursor: pointer; }' +
			'.ui-tabs .ui-tabs-panel { padding: 1em 1.4em; display: block; border-width: 0; background: none; }' +
			'.ui-tabs .ui-tabs-hide { display: none !important; }'
		);
		var skinOptions = '';
		for ( var s in SKINS )
			skinOptions += '<option id="' + s + '" value="' + s + '"' + (skin==s?' selected':'') + ' style="background: ' + SKINS[s].island + '; border: 2px solid ' + SKINS[s].sea + '">' + s + '</option>';

		const approval = {
			en:	{ img: 'gb', url: 'http://board.ikariam.org/index.php?page=Thread&threadID=61032' },
			us:	{ img: 'us', url: 'http://board.ikariam.com/index.php?page=Thread&threadID=42628' },
			it:	{ img: 'it', url: 'http://board.ikariam.it/index.php?page=Thread&threadID=29688' },
			se:	{ img: 'se', url: 'http://board.ikariam.se/index.php?page=Thread&threadID=1738' },
			nl:	{ img: 'nl', url: 'http://board.ikariam.nl/index.php?page=Thread&postID=208064#post208064' },
			ru:	{ img: 'ru', url: 'http://board.ikariam.ru/index.php?page=Thread&threadID=24580' },
			ph:	{ img: 'ph', url: 'http://board.ikariam.ph/index.php?page=Thread&threadID=7123' },
			fi:	{ img: 'fi', url: 'http://board.fi.ikariam.com/index.php?page=Thread&threadID=9860' },
			ae:	{ img: 'ae', url: 'http://board.ae.ikariam.com/thread.php?threadid=130572' }
		};

		var approval_html = [];
		for ( var domain in approval )
			approval_html.push( '<span class="approval"><a href="' + approval[domain].url + '" target="blank"><img src="http://nwlng.gameforge.de/flags/' + approval[domain].img + '.gif" width="16px" height="11px" />&nbsp;(' + domain + ')</a></span>' );

		$('body').prepend(
				'<div class="worldMap" id="worldMapConfig"><div class="contentBox01h"><h3 class="header"><p>' + language.config + '<p></h3>' +
				'<div class="content">' +
				'<ul><li><a href="#fragment-1"><span>' + language.scheme.replace( /\s+/, '<br />' ) + '</span></a></li>' +
				'<li><a href="#fragment-2"><span>' + language.details.replace( /\s+/, '<br />' ) + '</span></a></li></ul>' +
				'<div id="fragment-1"><table>' +
				'<thead><tr><th colspan="3">' + language.scheme + '</th></tr></thead>' +
				'<tbody>' +
				'<tr><th valign="middle">' + language.skin + ':</th><td /><td><select name="skin" style="background: ' + SKINS[skin].island + '; border: 2px solid ' + SKINS[skin].sea + '">' + skinOptions + '</select></td></tr>' +
				'<tr><th valign="middle">' + language.island + ':</th><td /><td><select name="island" /></td></tr>' +
				'<tr><th valign="middle">' + language.sea + ':</th><td /><td><select name="sea" /></td></tr>' +
				'<tr><th valign="middle">' + language.border + ':</th><td /><td><select name="border" /></td></tr>' +
				'<tr><th valign="middle">' + language.grid + ':</th><td /><td><select name="grid" /></td></tr>' +
				'<tr><th valign="middle">' + language.own + ':</th><td /><td><select name="own" /></td></tr>' +
				'<tr><th valign="middle">' + language.selected + ':</th><td /><td><select name="centered" /></td></tr>' +
				'<tr><th valign="middle">' + language.marble + ':</th><td valign="middle"><input type="checkbox" name="showMarble"' + (marble?' checked':'') + '></td><td><select name="marble" /></td></tr>' +
				'<tr><th valign="middle">' + language.wine + ':</th><td valign="middle"><input type="checkbox" name="showWine"' + (wine?' checked':'') + '></td><td><select name="wine" /></td></tr>' +
				'<tr><th valign="middle">' + language.crystal + ':</th><td valign="middle"><input type="checkbox" name="showCrystal"' + (crystal?' checked':'') + '></td><td><select name="crystal" /></td></tr>' +
				'<tr><th valign="middle">' + language.sulphur + ':</th><td valign="middle"><input type="checkbox" name="showSulphur"' + (sulphur?' checked':'') + '></td><td><select name="sulphur" /></td></tr>' +
				'<tr><th colspan="3" style="text-align: center">' + language.alliance + '</th></tr>' +
				'<tr><th valign="middle">' + language.variable + ':</th><td valign="middle"><input type="checkbox" name="variable"' + (variable?' checked':'') + '></td><td /></tr>' +
				'<tr><th valign="middle">' + language.ownAlliance + ':</th><td /><td><select name="ownAlliance" /></td></tr>' +
				'<tr><th valign="middle">' + language.ownAllianceFade + ':</th><td valign="middle"><input type="checkbox" name="fade"' + (fade?' checked':'') + '></td><td><select name="ownAllianceFade" /></td></tr>' +
				'</tbody></table></div>' +
				'<div id="fragment-2"><table>' +
				'<thead><tr><th colspan="2">' + language.details + '</th></tr></thead>' +
				'<tbody>' +
				'<tr><th valign="middle">' + language.author + ':</th><td><a href="http://userscripts.org/users/68307" target="_blank">Martynius</a></td></tr>' +
				'<tr><th valign="middle">' + language.webpage + ':</th><td><a href="http://userscripts.org/scripts/show/46874">http://userscripts.org/scripts/show/46874</a></td></tr>' +
				'<tr><th valign="middle">' + language.approved.replace( ' ', '&nbsp;' ) + ':</th><td>' + approval_html.join( '' ) + '</td></tr>' +
				'<tr><th valign="middle">' + language.language + ':</th><td><select name="language">' + populateLanguageSelect( lang ) + '</select></td></tr>' +
				'<tr><th valign="middle">' + language.displayMap + ':</th><td><input name="displayMap" type="checkbox"' + (GM_getValue( cache_variables.DISPLAYMAP, true )?' checked':'') + '></td></tr>' +
				'</table></div></div>' +
				'<h3 class="header headerRight"><img id="close" src="' + closeImage + '" title="' + language.close + '" width="16" height="16"></h3>' +
				'</div></div>');

		$$('body div#worldMapConfig div.content').tabs();

		$('div#worldMapConfig select[name=skin]').change( function() {
			var id	= $( "option:selected", this ).attr( 'value' );
			$( this ).css( 'background', SKINS[id].island )
				.css( 'border', '2px solid ' + SKINS[id].sea );
			const SKIN	= SKINS[id];
			GM_setValue( cache_variables.SKIN, 		id );
			GM_setValue( cache_variables.ISLAND,		SKIN.island );
			GM_setValue( cache_variables.SEA,		SKIN.sea );
			GM_setValue( cache_variables.GRID,		SKIN.grid );
			GM_setValue( cache_variables.BORDER,		SKIN.border );
			GM_setValue( cache_variables.OWN,		SKIN.own );
			GM_setValue( cache_variables.CENTERED,		SKIN.centered );
			GM_setValue( cache_variables.MARBLE,		SKIN.marble );
			GM_setValue( cache_variables.WINE,		SKIN.wine );
			GM_setValue( cache_variables.CRYSTAL,		SKIN.crystal );
			GM_setValue( cache_variables.SULPHUR,		SKIN.sulphur );
			GM_setValue( cache_variables.OWNALLIANCE,	SKIN.ownAlliance );
			GM_setValue( cache_variables.OWNALLIANCEFADE,	SKIN.ownAllianceFade );
			delete SKIN;
			selectColour( $('div#worldMapConfig select[name=island]'), SKIN.island );
			selectColour( $('div#worldMapConfig select[name=sea]'), SKIN.sea );
			selectColour( $('div#worldMapConfig select[name=grid]'), SKIN.grid );
			selectColour( $('div#worldMapConfig select[name=border]'), SKIN.border );
			selectColour( $('div#worldMapConfig select[name=own]'), SKIN.own );
			selectColour( $('div#worldMapConfig select[name=centered]'), SKIN.centered );
			selectColour( $('div#worldMapConfig select[name=ownAlliance]'), SKIN.ownAlliance );
			selectColour( $('div#worldMapConfig select[name=ownAllianceFade]'), SKIN.ownAllianceFade );
			resetControl( $('div#worldMapConfig input[name=showMarble]'), $('div#worldMapConfig select[name=marble]'), SKIN.marble, SKIN.island );
			resetControl( $('div#worldMapConfig input[name=showWine]'), $('div#worldMapConfig select[name=wine]'), SKIN.wine, SKIN.island );
			resetControl( $('div#worldMapConfig input[name=showCrystal]'), $('div#worldMapConfig select[name=crystal]'), SKIN.crystal, SKIN.island );
			resetControl( $('div#worldMapConfig input[name=showSulphur]'), $('div#worldMapConfig select[name=sulphur]'), SKIN.sulphur, SKIN.island );
			setColours();
		});

		/**
		 * createColourSelector() is in ColourSelect.js
		 */
		createColourSelector( $('div#worldMapConfig select[name=island]'),	island,			false,		getChangeFn( cache_variables.ISLAND ) );
		createColourSelector( $('div#worldMapConfig select[name=sea]'),		sea,			false,		getChangeFn( cache_variables.SEA ) );
		createColourSelector( $('div#worldMapConfig select[name=grid]'),	grid,			false,		getChangeFn( cache_variables.GRID ) );
		createColourSelector( $('div#worldMapConfig select[name=border]'),	border,			false,		getChangeFn( cache_variables.BORDER)  );
		createColourSelector( $('div#worldMapConfig select[name=own]'),		own,			false,		getChangeFn( cache_variables.OWN ) );
		createColourSelector( $('div#worldMapConfig select[name=centered]'),	centered,		false,		getChangeFn( cache_variables.CENTERED ) );
		createColourSelector( $('div#worldMapConfig select[name=marble]'),	marble||island,		!marble,	getChangeFn( cache_variables.MARBLE ) );
		createColourSelector( $('div#worldMapConfig select[name=wine]'),	wine||island,		!wine,		getChangeFn( cache_variables.WINE ) );
		createColourSelector( $('div#worldMapConfig select[name=crystal]'),	crystal||island,	!crystal,	getChangeFn( cache_variables.CRYSTAL ) );
		createColourSelector( $('div#worldMapConfig select[name=sulphur]'),	sulphur||island,	!sulphur,	getChangeFn( cache_variables.SULPHUR ) );
		createColourSelector( $('div#worldMapConfig select[name=ownAlliance]'), ownAll,			false,		getChangeFn( cache_variables.OWNALLIANCE ) );
		createColourSelector( $('div#worldMapConfig select[name=ownAllianceFade]'), ownAllF,		false,		getChangeFn( cache_variables.OWNALLIANCEFADE ) );
		enableControl( $('div#worldMapConfig input[name=showMarble]'),	cache_variables.MARBLE,		$('div#worldMapConfig select[name=marble]') );
		enableControl( $('div#worldMapConfig input[name=showWine]'),	cache_variables.WINE,		$('div#worldMapConfig select[name=wine]') );
		enableControl( $('div#worldMapConfig input[name=showCrystal]'),	cache_variables.CRYSTAL,	$('div#worldMapConfig select[name=crystal]') );
		enableControl( $('div#worldMapConfig input[name=showSulphur]'),	cache_variables.SULPHUR,	$('div#worldMapConfig select[name=sulphur]') );
		$('div#worldMapConfig input[name=variable]').change( function() {
				GM_setValue( cache_variables.VARIABLE, this.checked );
				setColours();
			});
		$('div#worldMapConfig input[name=fade]').change( function() {
				var c = this.checked;
				GM_setValue( cache_variables.FADE, c );
				$('div#worldMapConfig select[name=ownAllianceFade]').attr( "disabled", !c );
				setColours();
			});
		$('div#worldMapConfig select[name=language]').change( function() {
				var v = $( "option:selected", this ).attr( 'value' );
				GM_setValue( cache_variables.LANGUAGE, v );
			});
		$('div#worldMapConfig input[name=displayMap]').change( function() {
				GM_setValue( cache_variables.DISPLAYMAP, $( this ).attr('checked') );
			});

		$('div#worldMapConfig h3.header img#close').click( function() { $("div#worldMapConfig").hide(); } );

		worldConfigCreated = true;

		delete	closeImage, skin, SKIN, skinOptions, island, sea, grid, border, own,
			centered, marble, crystal, wine, sulphur, ownAll, ownAllF, variable, fade;
	}

	const globeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADdElEQVR42m2Te0xbZRiHf4dzeqM9belKWWG04AEUJhuZ1stkhJsOyJYtI3ZRcPESTUQww+jmostisqiJxsQpc3+PuGjcDFumW3Um25TpMsq4xI31lBaBAiull9PDOZRejkfcyDJ9kyd5v3zJk+998/sI3FMfn50pX0wSexe4ZI2wlDQTy8mUXplhaVXW8VvZI8e/czqXcV8Rd5tPzvtfml+M9sxxJk0qrcKSKIGPcxA4HnoqDcaqHkwSvzx/rKP71n8EQ9Ps7j+mv/iGizMwKh9CoUVAmC/ANa8NngkBtwMRKCUR9ZvPeVodrdWbyjbNrwr8fsk4wB8amloYsRcZ6rBWuwOl+YsIxin0ewoQE69geEwAFx3Fg6Un8MyGD758utLZtSrwzI+0/+jZ36vI5KHC0oSqwh0watSIisCNwAQWUj1gg1cRDPvARRJgTM3zLY9+VF6xbt3CiqBvuO/o6NyR103aQpiVr+KJksdhNVCICRJmuUtgI324OdMPkRewyIlQE3lor/16y8N25rcVwaenh08OeC+0ZsmzM7YGOBjAoqMgpYKICm64x7yoKjEjX7MRWRkB0+FRMEXVz5YXlp9cEXzWN9Xj9g12xBIKGHIc8rYJ6EgKBeZz8vU1mFKvwFZUAV32vzOnRQF8aHw815LbaLVaJ4gj3/ufY+fiJ1Tmt+CfbAO/tBVG1TSq1u/DZmsbzEYnfLwKGoWEYCSN6zPLaLJHoOAnXTW1dU3EoV6PPoc2DEWTB4sTxAAGBt+RF2ZHruICeg+0wxOmcd5LIZWWEPYFkKQI1D/5ABLsT2ipfaRuJQc72/Y5a3bt+VZJH8TUTC5G/nwNS7dD+OpAGWYF4AyrQxoknOzncM0W4K/qF1BB3MDOSuXhu0lUNGx/+f2O/VveiyUM5HjgMcx6p9C4XkCRTY2zk3YMh9Q4emU7PrS8C09xDepNPmwtWT5G3EmjSSafKWW27drz4u7iymYGGV12PDAmWbVzpKgthStYBv3vLnCORpjX0NigYdG00di9+gIZyz8SGTtFUcU6vd4sionMtpbmhre7uxxkDoNT7gQiEg2bkUBe7CLruzn4FHHfv1DL6GS0d3qlzNrOzs6uvW++0ZDMQPPzZXfoav+vl10/nDocCoWu3yv4vyJlaJk1JEnaaJrWRqPRoHz2yURkMn8DmSZfefTcGh0AAAAASUVORK5CYII=';

	$("div#mainview div.contentBox01h:first h3.header")
		.prepend("<div id='worldMapLink'><img src='" + globeImage + "' width='16' height='16'><p>" + language.open.replace(/\s+/, '<br />') + "</p></div>")
		.children().filter("div:first")
			.click(function() {
				if ( !worldMapCreated )
					createWorldMap();
				$("div#worldMap").show();
			});
	delete globeImage;
} else if ( PAGE_ID == 'mini' ) {
/**
 *
 * The script section dealing with the island view.
 *
 */
if ( GM_getValue( cache_variables.DISPLAYMAP, true ) ) {

	function createIslandMap( x, y ) {
		var centerX = Math.min( Math.max( x, 6 ), 95 );
		var centerY = Math.min( Math.max( y, 6 ), 95 );

		var coords = eval( GM_getValue( cache_variables.ALLIANCE, false ) ) || {};

		$("li.city")
			.each( function() {
				if ( $("div.ownCityImg", this).length > 0 ) {
					player = $(".cityinfo .owner", this)
						.text()
						.replace( /^.*?:\s+|\s+$/g, '' );
					GM_setValue( cache_variables.PLAYER, player );
				}
			});

		var html = [];
		for ( var r = centerY - 5; r <= centerY + 5; r++ ) {
			html.push( '<tr>' );
			for ( var c = centerX - 5; c <= centerX + 5; c++ )
				html.push( createIsland( r, c, coords, (r == y && c == x) ) );
			html.push( '</tr>' );
		}

		var pos = eval( GM_getValue( cache_variables.LOCATION + islandID, "({x:242,y:177})" ) );

		const moveImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADbElEQVR42nWTW0wcVRzGvzMze4dddinLclm2gEWw0GBDm2qiJBIjVYsvipeEGE2qabJpoIm3aky0ifqijcb0oZEmbWN8USlp0xLSIiIWXcplXaFlYV2t0L3U3bLX2ZlzZsbRB5Nq/Z+nf3LO73z/73yH4A5lem3Sxymsi1NoNy3mbYRKi2ZOm8h8NrD0773ktu7IspEXM6/qB/fzitygUQm1Tjs0WUJu81aBo6UzOvidxIkXVv8D4N4MVGgEX3Ka0sMxGYRSmImKVq8HjXUeTH43DTAKlAppjkpPxU4fmLgNILwxfV4j3F6iKuAVBqrfel9zHdZjcXTv7MDqb9exHArBajaBY9ImKWZ3rn8xFP0bYHrl0oDG8aeg6Y2mgVNVaLoKr9OG5ko7trhccFa5MRu6ikgwACPPgafi5zaqDJCyoXMGlQhfKappH1P/wuWgjwGDZgAPI3Ztq0FbUx2oYEZoJYx4Mg61mIWavJEnCu0iLv/ppiLvnSGGtLul+SI6tm6CqTexsJYGKTyE7h2HwRttSBRyyKoMiegaUj8F9TFl8IwOEsOTgS5r88+zzzw+jf497diQcriejyGRTmFqbhw01YO2tmGoRhP4CgHRS1NYnwrAYjPrStkwwXPHd/Tu+2bR39dJguIiNlJJRK9mINcXkM0oCM+G0er7CK27h2CwAJGJK1gb+xECK4Go9BNScxRPvPzw/hHFzEj8CkOD24sHPb04ufEpxgvjEG+KsN7qRN9LP4DolqeSDAsjl1EKXIagsn7Sfqzi2PbO7QfsDgcObTmKu90tYPrKl/I4NO/HWOQCxGWC+/d8i/JqFzYt1VgduQguOLPBa+ou0v5h9cdl22wH3Q2V2GpugY+/B331/fhVjuLEyjDmVgKIzTBYIi+i5pEeSK5ayGMjEMTs4fDokfdJ41vOXkej64K3vQGK7rIV5dhd9QDm0/NI5lIIzwVRCN2LSrcfal0tsKBLz6QmDRrpXTr7rkQsfqPgrXWfcvs8z/ruaoJVfzKR6dnPFrBybQE3ljRUFA/C4GwCiUXAFbOjnGB8/trXb2f+ibJnsMpucRiPW+xlT9scZZBLMv5IpFCMV6I8txdmxZPUaOZ7wuho+Nx7J//3NzoHHY/pIX1UYrJBN/F8ffr13x1yBxGFUOaXMx+s4g71J/FFiVIWVqw/AAAAAElFTkSuQmCC';
		const closeImage ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADCklEQVR42qWTa2gcVRTHfzO7s7vZR8hLTVNImqYxbZNtQzXWxla/VD9ooSClCPpBrCFWK0oKrVRaK4rFhkpbWiKUfooEKi2KiQ/oAyRq3KItZq0xIWmS3Tw22d3MbvYxOzO7s04HFEv9VA9cLgfu/Z17/vd/BP5nCP9OLkNFElpssFOEVgPKNDB085y55xMwbK6BWfjmvJnfBRiC7UXo9tSVt7rXNiE99AB2t4uCqlFIp1HlJRLzcUKzS8xntM+zInsOqVraAnwBpSslflndsauxsuM1WJyCkWFyC1GQk2iJZfSUgigIqGqB74NhRuXMC++pygUL0AeP+xuqhlou9ELgCuGvv0Vw+vBl48xEVZySA6eSQSgtw1NZQTAUI3A7cvZAcnmfBfgKjjQ/98T7q1/ZzfSZ00TbnqepYw/Th7sQNm6h9ql24qe6sYUn8dRUMxFJEBgJDb4Zl5+0AAPQ73/x2R0rHq5hNnCTqpOf4W1cSyERwyaaUjok9N9/I3KwC3d5KXOJLIPB22NvLMabLEA/3Hz01Z2tJYKO/keQuRXNtJzrRSzc0V7DMJ8fOfwu+kgQ37pGFhcTXL0xpu+LyQ4LcAlS7S8943UpaaaC40gvv07z3k5QFROQp5BNm+0cQZgap2JdA1MzMa79+iddclL4W8TxzU8/0uDRssTiGWp7zuPbtIHifAQjr2PzejAQWTp7Ekd4glvTUQaHx0MHk6k6C3DO9NCm5trtNZU+clGZ4no/K/fvJ9bTQ65gsOr4xxRDk2T6LyJEo/x4fYTAaPiHo2pumwU4AZ1rKnyftvnrze9zYBh3hHNi5FRLQG97O/ZcCjGdIja9wHfXbzGzIB/7wMgfsgDd8KBbkn6ur66sb1hVjbfMa96XEF0uBLvNdKOCVhRJymlujIWZnItmVVXd8CFM/GPlT0T7Y4JkO1HiKdlaVerB7XVhdzgoFIsomoa8rLCUyqBkciFDz791FOPLe4bpHTDlYrdol962Ox1+q7rZjq7nl/Wc9pOB0WfOy7WPYPY/p/F+4i+Dw1MghmEh9gAAAABJRU5ErkJggg==';

		GM_addStyle(
			'div#worldMap 			{ ' + left + ': ' + pos.x + 'px; top: ' + pos.y + 'px; z-index: 3000; }\n' +
			'div#worldMapCoords .content	{ padding: 0px 3px; }\n' +
			'div.worldMap table th		{ text-align: ' + left + '; font-size: 9px; line-height: 15px; }\n' +
			'div#worldMap table tbody	{ border: 1px solid black; }\n' +
			'div.worldMap table th		{ position: relative; }\n' +
			'div#move			{ position: absolute; ' + right + ': 2px; top: 2px; width: 16px; height: 16px; background: transparent url(' + moveImage + '); cursor: move; }' +
			'div#close			{ position: absolute; ' + right + ': 5px; top: 5px; width: 16px; height: 16px; background: transparent url(' + closeImage + '); }'
		);

		$("div#container")
			.prepend(
				'<div class="worldMap" id="worldMap"><table class="minimap">' +
				'<thead><tr><th colspan="11">' + language.miniMap + '<div id="move" title="' + language.move + '" /></th></tr></thead><tbody>\n' +
				html.join( '' ) +
				'</tbody></table>' +
				'</div>'
			);
		$("div#actioncontainer")
			.after(
				'<div id="worldMapCoords" class="dynamic"><h3 class="header">' + language.miniMap + '<div id="close" title="' + language.close + '" /></h3>\n' +
				'<div id="actions" class="content"><ul>' +
				'<li><strong>X:</strong>&nbsp;<input id="worldMapX" type="text" size="4" maxlength="4" value="' + pos.x + '" /></li>' +
				'<li><strong>Y:</strong>&nbsp;<input id="worldMapY" type="text" size="4" maxlength="4" value="' + pos.y + '" /></li>' +
				'</ul></div>\n' +
				'<div class="footer"/>\n' +
				'</div>'
			);
		$( "div#worldMapCoords" ).css( 'display', 'none' );

		$( "div#worldMapCoords div#close" ).click( function() {
				$( "div#worldMapCoords" ).css( 'display', 'none' );
			} );
		$( "input#worldMapX, input#worldMapY" ).change( function() {
				var x = $( "input#worldMapX" ).val();
				var y = $( "input#worldMapY" ).val();
				if ( x.match( /^-?\d+$/ ) && y.match( /^-?\d+$/ ) ) {
					var l = parseInt( x );
					var t = parseInt( y );
					$('div#worldMap')	.css( left, l + 'px' )
								.css( 'top', t + 'px' );
					GM_setValue( cache_variables.LOCATION + islandID, "({x:" + l + ",y:" + t + "})" );
				}
			} );
		$$('div#worldMap').draggable({
				containment: 'body',
				cursor: 'move',
				distance: 5,
				handle: 'div#move',
				helper: 'clone',
				opacity: 0.5,
				zIndex: 9999,
				stop: function( event, ui ) {
						var l = ui.position.left,
							r = ui.position.top;
						$('div#worldMap')	.css( left, l + 'px' )
									.css( 'top', r + 'px' );
						GM_setValue( cache_variables.LOCATION + islandID, "({x:" + l + ",y:" + r + "})" );
					}
			})
			.disableSelection();
		delete centerX, centerY, ikariamMap, coords, html, moveImage, closeImage;
	};

	const islandID = '.' + ($("div#mainview").attr("class") || "default");
	const island = /\[(\d+):(\d+)\]$/.exec( $("div#breadcrumbs span.island").text() );
	if ( island )
		createIslandMap( parseInt( island[1] ), parseInt( island[2] ) );

	GM_registerMenuCommand( language.reset || "Reset Island Mini-Map Location" , function() {
		$( "div#worldMapCoords", document ).css( 'display', 'block' );
	});
	delete island, islandID;
}
}
}