// ==UserScript==
// @name	        Facebook Smiley Parser
// @namespace     http://www.facebook.com/
// @description   Add smilies to facebook pages
// @include       http://www.facebook.com/*
// @author        summatix
// ==/UserScript==

/*
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var p=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,i=0,d=Object.prototype.toString,n=false;var b=function(D,t,A,v){A=A||[];var e=t=t||document;if(t.nodeType!==1&&t.nodeType!==9){return[]}if(!D||typeof D!=="string"){return A}var B=[],C,y,G,F,z,s,r=true,w=o(t);p.lastIndex=0;while((C=p.exec(D))!==null){B.push(C[1]);if(C[2]){s=RegExp.rightContext;break}}if(B.length>1&&j.exec(D)){if(B.length===2&&f.relative[B[0]]){y=g(B[0]+B[1],t)}else{y=f.relative[B[0]]?[t]:b(B.shift(),t);while(B.length){D=B.shift();if(f.relative[D]){D+=B.shift()}y=g(D,y)}}}else{if(!v&&B.length>1&&t.nodeType===9&&!w&&f.match.ID.test(B[0])&&!f.match.ID.test(B[B.length-1])){var H=b.find(B.shift(),t,w);t=H.expr?b.filter(H.expr,H.set)[0]:H.set[0]}if(t){var H=v?{expr:B.pop(),set:a(v)}:b.find(B.pop(),B.length===1&&(B[0]==="~"||B[0]==="+")&&t.parentNode?t.parentNode:t,w);y=H.expr?b.filter(H.expr,H.set):H.set;if(B.length>0){G=a(y)}else{r=false}while(B.length){var u=B.pop(),x=u;if(!f.relative[u]){u=""}else{x=B.pop()}if(x==null){x=t}f.relative[u](G,x,w)}}else{G=B=[]}}if(!G){G=y}if(!G){throw"Syntax error, unrecognized expression: "+(u||D)}if(d.call(G)==="[object Array]"){if(!r){A.push.apply(A,G)}else{if(t&&t.nodeType===1){for(var E=0;G[E]!=null;E++){if(G[E]&&(G[E]===true||G[E].nodeType===1&&h(t,G[E]))){A.push(y[E])}}}else{for(var E=0;G[E]!=null;E++){if(G[E]&&G[E].nodeType===1){A.push(y[E])}}}}}else{a(G,A)}if(s){b(s,e,A,v);b.uniqueSort(A)}return A};b.uniqueSort=function(r){if(c){n=false;r.sort(c);if(n){for(var e=1;e<r.length;e++){if(r[e]===r[e-1]){r.splice(e--,1)}}}}};b.matches=function(e,r){return b(e,null,null,r)};b.find=function(x,e,y){var w,u;if(!x){return[]}for(var t=0,s=f.order.length;t<s;t++){var v=f.order[t],u;if((u=f.match[v].exec(x))){var r=RegExp.leftContext;if(r.substr(r.length-1)!=="\\"){u[1]=(u[1]||"").replace(/\\/g,"");w=f.find[v](u,e,y);if(w!=null){x=x.replace(f.match[v],"");break}}}}if(!w){w=e.getElementsByTagName("*")}return{set:w,expr:x}};b.filter=function(A,z,D,t){var s=A,F=[],x=z,v,e,w=z&&z[0]&&o(z[0]);while(A&&z.length){for(var y in f.filter){if((v=f.match[y].exec(A))!=null){var r=f.filter[y],E,C;e=false;if(x==F){F=[]}if(f.preFilter[y]){v=f.preFilter[y](v,x,D,F,t,w);if(!v){e=E=true}else{if(v===true){continue}}}if(v){for(var u=0;(C=x[u])!=null;u++){if(C){E=r(C,v,u,x);var B=t^!!E;if(D&&E!=null){if(B){e=true}else{x[u]=false}}else{if(B){F.push(C);e=true}}}}}if(E!==undefined){if(!D){x=F}A=A.replace(f.match[y],"");if(!e){return[]}break}}}if(A==s){if(e==null){throw"Syntax error, unrecognized expression: "+A}else{break}}s=A}return x};var f=b.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(e){return e.getAttribute("href")}},relative:{"+":function(x,e,w){var u=typeof e==="string",y=u&&!/\W/.test(e),v=u&&!y;if(y&&!w){e=e.toUpperCase()}for(var t=0,s=x.length,r;t<s;t++){if((r=x[t])){while((r=r.previousSibling)&&r.nodeType!==1){}x[t]=v||r&&r.nodeName===e?r||false:r===e}}if(v){b.filter(e,x,true)}},">":function(w,r,x){var u=typeof r==="string";if(u&&!/\W/.test(r)){r=x?r:r.toUpperCase();for(var s=0,e=w.length;s<e;s++){var v=w[s];if(v){var t=v.parentNode;w[s]=t.nodeName===r?t:false}}}else{for(var s=0,e=w.length;s<e;s++){var v=w[s];if(v){w[s]=u?v.parentNode:v.parentNode===r}}if(u){b.filter(r,w,true)}}},"":function(t,r,v){var s=i++,e=q;if(!r.match(/\W/)){var u=r=v?r:r.toUpperCase();e=m}e("parentNode",r,s,t,u,v)},"~":function(t,r,v){var s=i++,e=q;if(typeof r==="string"&&!r.match(/\W/)){var u=r=v?r:r.toUpperCase();e=m}e("previousSibling",r,s,t,u,v)}},find:{ID:function(r,s,t){if(typeof s.getElementById!=="undefined"&&!t){var e=s.getElementById(r[1]);return e?[e]:[]}},NAME:function(s,v,w){if(typeof v.getElementsByName!=="undefined"){var r=[],u=v.getElementsByName(s[1]);for(var t=0,e=u.length;t<e;t++){if(u[t].getAttribute("name")===s[1]){r.push(u[t])}}return r.length===0?null:r}},TAG:function(e,r){return r.getElementsByTagName(e[1])}},preFilter:{CLASS:function(t,r,s,e,w,x){t=" "+t[1].replace(/\\/g,"")+" ";if(x){return t}for(var u=0,v;(v=r[u])!=null;u++){if(v){if(w^(v.className&&(" "+v.className+" ").indexOf(t)>=0)){if(!s){e.push(v)}}else{if(s){r[u]=false}}}}return false},ID:function(e){return e[1].replace(/\\/g,"")},TAG:function(r,e){for(var s=0;e[s]===false;s++){}return e[s]&&o(e[s])?r[1]:r[1].toUpperCase()},CHILD:function(e){if(e[1]=="nth"){var r=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2]=="even"&&"2n"||e[2]=="odd"&&"2n+1"||!/\D/.test(e[2])&&"0n+"+e[2]||e[2]);e[2]=(r[1]+(r[2]||1))-0;e[3]=r[3]-0}e[0]=i++;return e},ATTR:function(u,r,s,e,v,w){var t=u[1].replace(/\\/g,"");if(!w&&f.attrMap[t]){u[1]=f.attrMap[t]}if(u[2]==="~="){u[4]=" "+u[4]+" "}return u},PSEUDO:function(u,r,s,e,v){if(u[1]==="not"){if(u[3].match(p).length>1||/^\w/.test(u[3])){u[3]=b(u[3],null,null,r)}else{var t=b.filter(u[3],r,s,true^v);if(!s){e.push.apply(e,t)}return false}}else{if(f.match.POS.test(u[0])||f.match.CHILD.test(u[0])){return true}}return u},POS:function(e){e.unshift(true);return e}},filters:{enabled:function(e){return e.disabled===false&&e.type!=="hidden"},disabled:function(e){return e.disabled===true},checked:function(e){return e.checked===true},selected:function(e){e.parentNode.selectedIndex;return e.selected===true},parent:function(e){return !!e.firstChild},empty:function(e){return !e.firstChild},has:function(s,r,e){return !!b(e[3],s).length},header:function(e){return/h\d/i.test(e.nodeName)},text:function(e){return"text"===e.type},radio:function(e){return"radio"===e.type},checkbox:function(e){return"checkbox"===e.type},file:function(e){return"file"===e.type},password:function(e){return"password"===e.type},submit:function(e){return"submit"===e.type},image:function(e){return"image"===e.type},reset:function(e){return"reset"===e.type},button:function(e){return"button"===e.type||e.nodeName.toUpperCase()==="BUTTON"},input:function(e){return/input|select|textarea|button/i.test(e.nodeName)}},setFilters:{first:function(r,e){return e===0},last:function(s,r,e,t){return r===t.length-1},even:function(r,e){return e%2===0},odd:function(r,e){return e%2===1},lt:function(s,r,e){return r<e[3]-0},gt:function(s,r,e){return r>e[3]-0},nth:function(s,r,e){return e[3]-0==r},eq:function(s,r,e){return e[3]-0==r}},filter:{PSEUDO:function(w,s,t,x){var r=s[1],u=f.filters[r];if(u){return u(w,t,s,x)}else{if(r==="contains"){return(w.textContent||w.innerText||"").indexOf(s[3])>=0}else{if(r==="not"){var v=s[3];for(var t=0,e=v.length;t<e;t++){if(v[t]===w){return false}}return true}}}},CHILD:function(e,t){var w=t[1],r=e;switch(w){case"only":case"first":while(r=r.previousSibling){if(r.nodeType===1){return false}}if(w=="first"){return true}r=e;case"last":while(r=r.nextSibling){if(r.nodeType===1){return false}}return true;case"nth":var s=t[2],z=t[3];if(s==1&&z==0){return true}var v=t[0],y=e.parentNode;if(y&&(y.sizcache!==v||!e.nodeIndex)){var u=0;for(r=y.firstChild;r;r=r.nextSibling){if(r.nodeType===1){r.nodeIndex=++u}}y.sizcache=v}var x=e.nodeIndex-z;if(s==0){return x==0}else{return(x%s==0&&x/s>=0)}}},ID:function(r,e){return r.nodeType===1&&r.getAttribute("id")===e},TAG:function(r,e){return(e==="*"&&r.nodeType===1)||r.nodeName===e},CLASS:function(r,e){return(" "+(r.className||r.getAttribute("class"))+" ").indexOf(e)>-1},ATTR:function(v,t){var s=t[1],e=f.attrHandle[s]?f.attrHandle[s](v):v[s]!=null?v[s]:v.getAttribute(s),w=e+"",u=t[2],r=t[4];return e==null?u==="!=":u==="="?w===r:u==="*="?w.indexOf(r)>=0:u==="~="?(" "+w+" ").indexOf(r)>=0:!r?w&&e!==false:u==="!="?w!=r:u==="^="?w.indexOf(r)===0:u==="$="?w.substr(w.length-r.length)===r:u==="|="?w===r||w.substr(0,r.length+1)===r+"-":false},POS:function(u,r,s,v){var e=r[2],t=f.setFilters[e];if(t){return t(u,s,r,v)}}}};var j=f.match.POS;for(var l in f.match){f.match[l]=new RegExp(f.match[l].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var a=function(r,e){r=Array.prototype.slice.call(r);if(e){e.push.apply(e,r);return e}return r};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(k){a=function(u,t){var r=t||[];if(d.call(u)==="[object Array]"){Array.prototype.push.apply(r,u)}else{if(typeof u.length==="number"){for(var s=0,e=u.length;s<e;s++){r.push(u[s])}}else{for(var s=0;u[s];s++){r.push(u[s])}}}return r}}var c;if(document.documentElement.compareDocumentPosition){c=function(r,e){var s=r.compareDocumentPosition(e)&4?-1:r===e?0:1;if(s===0){n=true}return s}}else{if("sourceIndex" in document.documentElement){c=function(r,e){var s=r.sourceIndex-e.sourceIndex;if(s===0){n=true}return s}}else{if(document.createRange){c=function(t,r){var s=t.ownerDocument.createRange(),e=r.ownerDocument.createRange();s.selectNode(t);s.collapse(true);e.selectNode(r);e.collapse(true);var u=s.compareBoundaryPoints(Range.START_TO_END,e);if(u===0){n=true}return u}}}}(function(){var r=document.createElement("div"),s="script"+(new Date).getTime();r.innerHTML="<a name='"+s+"'/>";var e=document.documentElement;e.insertBefore(r,e.firstChild);if(!!document.getElementById(s)){f.find.ID=function(u,v,w){if(typeof v.getElementById!=="undefined"&&!w){var t=v.getElementById(u[1]);return t?t.id===u[1]||typeof t.getAttributeNode!=="undefined"&&t.getAttributeNode("id").nodeValue===u[1]?[t]:undefined:[]}};f.filter.ID=function(v,t){var u=typeof v.getAttributeNode!=="undefined"&&v.getAttributeNode("id");return v.nodeType===1&&u&&u.nodeValue===t}}e.removeChild(r)})();(function(){var e=document.createElement("div");e.appendChild(document.createComment(""));if(e.getElementsByTagName("*").length>0){f.find.TAG=function(r,v){var u=v.getElementsByTagName(r[1]);if(r[1]==="*"){var t=[];for(var s=0;u[s];s++){if(u[s].nodeType===1){t.push(u[s])}}u=t}return u}}e.innerHTML="<a href='#'></a>";if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){f.attrHandle.href=function(r){return r.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var e=b,s=document.createElement("div");s.innerHTML="<p class='TEST'></p>";if(s.querySelectorAll&&s.querySelectorAll(".TEST").length===0){return}b=function(w,v,t,u){v=v||document;if(!u&&v.nodeType===9&&!o(v)){try{return a(v.querySelectorAll(w),t)}catch(x){}}return e(w,v,t,u)};for(var r in e){b[r]=e[r]}})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var e=document.createElement("div");e.innerHTML="<div class='test e'></div><div class='test'></div>";if(e.getElementsByClassName("e").length===0){return}e.lastChild.className="e";if(e.getElementsByClassName("e").length===1){return}f.order.splice(1,0,"CLASS");f.find.CLASS=function(r,s,t){if(typeof s.getElementsByClassName!=="undefined"&&!t){return s.getElementsByClassName(r[1])}}})()}function m(r,w,v,A,x,z){var y=r=="previousSibling"&&!z;for(var t=0,s=A.length;t<s;t++){var e=A[t];if(e){if(y&&e.nodeType===1){e.sizcache=v;e.sizset=t}e=e[r];var u=false;while(e){if(e.sizcache===v){u=A[e.sizset];break}if(e.nodeType===1&&!z){e.sizcache=v;e.sizset=t}if(e.nodeName===w){u=e;break}e=e[r]}A[t]=u}}}function q(r,w,v,A,x,z){var y=r=="previousSibling"&&!z;for(var t=0,s=A.length;t<s;t++){var e=A[t];if(e){if(y&&e.nodeType===1){e.sizcache=v;e.sizset=t}e=e[r];var u=false;while(e){if(e.sizcache===v){u=A[e.sizset];break}if(e.nodeType===1){if(!z){e.sizcache=v;e.sizset=t}if(typeof w!=="string"){if(e===w){u=true;break}}else{if(b.filter(w,[e]).length>0){u=e;break}}}e=e[r]}A[t]=u}}}var h=document.compareDocumentPosition?function(r,e){return r.compareDocumentPosition(e)&16}:function(r,e){return r!==e&&(r.contains?r.contains(e):true)};var o=function(e){return e.nodeType===9&&e.documentElement.nodeName!=="HTML"||!!e.ownerDocument&&e.ownerDocument.documentElement.nodeName!=="HTML"};var g=function(e,x){var t=[],u="",v,s=x.nodeType?[x]:x;while((v=f.match.PSEUDO.exec(e))){u+=v[0];e=e.replace(f.match.PSEUDO,"")}e=f.relative[e]?e+"*":e;for(var w=0,r=s.length;w<r;w++){b(e,s[w],t)}return b.filter(u,t)};window.Sizzle=b})();

/**
 * @author 	Maxime Haineault (max@centdessin.com)
 * @version	0.3
 * @desc 	JavaScript cookie manipulation class
 * 
 * Modified by me to make it actually work
 */
Cookie={get:function(a){tmp=document.cookie.match((new RegExp(a+"=[a-zA-Z0-9.()=|%/]+($|;)","g")));if(!tmp||!tmp[0]){return null}else{return unescape(tmp[0].substring(a.length+1,tmp[0].length).replace(";",""))||null}},set:function(c,e,a,h,d,g){var b=new Date();b.setTime(b.getTime());if(a){a=a*1000*60*60*24}var f=new Date(b.getTime()+(a));document.cookie=c+"="+escape(e)+((a)?";expires="+f.toGMTString():"")+((h)?";path="+h:"")+((d)?";domain="+d:"")+((g)?";secure":"")},unset:function(a,c,b){c=(!c||typeof c!="string")?"":c;b=(!b||typeof b!="string")?"":b;if(Cookie.get(a)){Cookie.set(a,"","Thu, 01-Jan-70 00:00:01 GMT",c,b)}},test:function(){Cookie.set("b49f729efde9b2578ea9f00563d06e57","true");if(Cookie.get("b49f729efde9b2578ea9f00563d06e57")=="true"){Cookie.unset("b49f729efde9b2578ea9f00563d06e57");return true}return false}};

/**
 * Ajax object (taken somewhere from the internet and than modified by me)
 */
function ajaxObject(b,a){var c=this;this.updating=false;this.abort=function(){if(c.updating){c.updating=false;c.AJAX.abort();c.AJAX=null}};this.update=function(e){if(c.updating){return false}c.AJAX=null;if(window.XMLHttpRequest){c.AJAX=new XMLHttpRequest()}else{c.AJAX=new ActiveXObject("Microsoft.XMLHTTP")}if(c.AJAX==null){return false}else{c.AJAX.onreadystatechange=function(){if(c.AJAX.readyState==4){c.updating=false;c.callback(c.AJAX.responseText,c.AJAX.status,c.AJAX.responseXML);c.AJAX=null}};c.updating=new Date();c.AJAX.open("GET",d,true);c.AJAX.send(null);return true}};var d=b;this.callback=a||function(){}};

var smileyParser = function()  {
  var version = 9;
  var cookieName = "fsp_cookie";
  
  var urlToSite = "http://www.facebook.com/group.php?gid=73623253497";
  
  var set1 = [
    {
      image: '<img src="http://imgkk.com/images/pi5ithh.gif" alt="Very Happy" border="0"/>',
      regex: /([ \n\r\t]):D|:D([ \n\r\t])|(^):D($)/gm
    },{
      image: '<img src="http://imgkk.com/images/d0w5yus.gif" alt="Smile" border="0"/>',
      regex: /([ \n\r\t]):\)|:\)([ \n\r\t])|(^):\)($)/gm
    },{
      image: '<img src="http://imgkk.com/images/d0w5yus.gif" alt="Smile" border="0"/>',
      regex: /([ \n\r\t])=\)|=\)([ \n\r\t])|(^)=\)($)/gm
    },{
      image: '<img src="http://imgkk.com/images/bpcpbiq3.gif" alt="Embarassed" border="0"/>',
      regex: /([ \n\r\t]):oops:|:oops:([ \n\r\t])|(^):oops:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/bv2mby8.gif" alt="Sad" border="0"/>',
      regex: /([ \n\r\t]):\(|:\(([ \n\r\t])|(^):\(($)/gm
    },{
      image: '<img src="http://imgkk.com/images/m46cxcv5.gif" alt="Surprised" border="0"/>',
      regex: /([ \n\r\t]):o|:o([ \n\r\t])|(^):o($)/gm
    },{
      image: '<img src="http://imgkk.com/images/y8r4f19f.gif" alt="Shocked" border="0"/>',
      regex: /([ \n\r\t]):shock:|:shock:([ \n\r\t])|(^):shock:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/l78taxi.gif" alt="Question" border="0"/>',
      regex: /([ \n\r\t]):\?:|:\?:([ \n\r\t])|(^):\?:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/apov8bu0.gif" alt="Confused" border="0"/>',
      regex: /([ \n\r\t]):\?|:\?([ \n\r\t])|(^):\?($)/gm
    },{
      image: '<img src="http://imgkk.com/images/xxrrqpk.gif" alt="Cool" border="0"/>',
      regex: /([ \n\r\t])8-\)|8-\)([ \n\r\t])|(^)8-\)($)/gm
    },{
      image: '<img src="http://imgkk.com/images/i04imabp.gif" alt="Laughing" border="0"/>',
      regex: /([ \n\r\t]):lol:|:lol:([ \n\r\t])|(^):lol:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/yq06q5kn.gif" alt="Mad" border="0"/>',
      regex: /([ \n\r\t]):x|:x([ \n\r\t])|(^):x($)/gm
    },{
      image: '<img src="http://imgkk.com/images/7dt31d6i.gif" alt="Razz" border="0"/>',
      regex: /([ \n\r\t]):P|:P([ \n\r\t])|(^):P($)/gm
    },{
      image: '<img src="http://imgkk.com/images/uf7ea1ej.gif" alt="Crying or Very sad" border="0"/>',
      regex: /([ \n\r\t]):cry:|:cry:([ \n\r\t])|(^):cry:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/myr02ke.gif" alt="Evil or Very Mad" border="0"/>',
      regex: /([ \n\r\t]):evil:|:evil:([ \n\r\t])|(^):evil:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/ilnjceah.gif" alt="Twisted Evil" border="0"/>',
      regex: /([ \n\r\t]):twisted:|:twisted:([ \n\r\t])|(^):twisted:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/54weenc.gif" alt="Rolling Eyes" border="0"/>',
      regex: /([ \n\r\t]):roll:|:roll:([ \n\r\t])|(^):roll:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/bdoat240.gif" alt="Wink" border="0"/>',
      regex: /([ \n\r\t]);\)|;\)([ \n\r\t])|(^);\)($)/gm
    },{
      image: '<img src="http://imgkk.com/images/4m84u8b3.gif" alt="Neutral" border="0"/>',
      regex: /([ \n\r\t]):\||:\|([ \n\r\t])|(^):\|($)/gm
    },{
      image: '<img src="http://imgkk.com/images/xs8gnqch.gif" alt="Mr. Green" border="0"/>',
      regex: /([ \n\r\t]):mrgreen:|:mrgreen:([ \n\r\t])|(^):mrgreen:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/a5lufvur.gif" alt="Worshippy" border="0"/>',
      regex: /([ \n\r\t]):worship:|:worship:([ \n\r\t])|(^):worship:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/qf64hwrg.gif" alt="Arrow" border="0"/>',
      regex: /([ \n\r\t]):arrow:|:arrow:([ \n\r\t])|(^):arrow:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/to80tvze.gif" alt="Idea" border="0"/>',
      regex: /([ \n\r\t]):idea:|:idea:([ \n\r\t])|(^):idea:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/q1bstvik.gif" alt="Exclamation" border="0"/>',
      regex: /([ \n\r\t]):!:|:!:([ \n\r\t])|(^):!:($)/gm
    }
  ];
  
  var set2 = [
    {
      image: '<img src="http://imgkk.com/images/l53otzmz.gif" alt="Very Happy" border="0"/>',
      regex: /([ \n\r\t]):D|:D([ \n\r\t])|(^):D($)/gm
    },{
      image: '<img src="http://imgkk.com/images/s8o2kwvj.gif" alt="Smile" border="0"/>',
      regex: /([ \n\r\t]):\)|:\)([ \n\r\t])|(^):\)($)/gm
    },{
      image: '<img src="http://imgkk.com/images/s8o2kwvj.gif" alt="Smile" border="0"/>',
      regex: /([ \n\r\t])=\)|=\)([ \n\r\t])|(^)=\)($)/gm
    },{
      image: '<img src="http://imgkk.com/images/cmannpuy.gif" alt="Embarassed" border="0"/>',
      regex: /([ \n\r\t]):oops:|:oops:([ \n\r\t])|(^):oops:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/da1m6ken.gif" alt="Sad" border="0"/>',
      regex: /([ \n\r\t]):\(|:\(([ \n\r\t])|(^):\(($)/gm
    },{
      image: '<img src="http://imgkk.com/images/j3kv3n9s.gif" alt="Surprised" border="0"/>',
      regex: /([ \n\r\t]):o|:o([ \n\r\t])|(^):o($)/gm
    },{
      image: '<img src="http://imgkk.com/images/ff0gwkoz.gif" alt="Shocked" border="0"/>',
      regex: /([ \n\r\t]):shock:|:shock:([ \n\r\t])|(^):shock:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/whycf1ff.gif" alt="Mad" border="0"/>',
      regex: /([ \n\r\t]):x:|:x:([ \n\r\t])|(^):\?:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/9dhpj51y.gif" alt="Confused" border="0"/>',
      regex: /([ \n\r\t]):\?|:\?([ \n\r\t])|(^):\?($)/gm
    },{
      image: '<img src="http://imgkk.com/images/p2chjuzf.gif" alt="Cool" border="0"/>',
      regex: /([ \n\r\t])8-\)|8-\)([ \n\r\t])|(^)8-\)($)/gm
    },{
      image: '<img src="http://imgkk.com/images/ho2z1cto.gif" alt="Laughing" border="0"/>',
      regex: /([ \n\r\t]):lol:|:lol:([ \n\r\t])|(^):lol:($)/gm
    },{
      image: '<img src="" alt="Mad" border="0"/>',
      regex: /([ \n\r\t]):x|:x([ \n\r\t])|(^):x($)/gm
    },{
      image: '<img src="http://imgkk.com/images/0c6nv1x1.gif" alt="Razz" border="0"/>',
      regex: /([ \n\r\t]):P|:P([ \n\r\t])|(^):P($)/gm
    },{
      image: '<img src="http://imgkk.com/images/ez0vsq2u.gif" alt="Crying or Very sad" border="0"/>',
      regex: /([ \n\r\t]):cry:|:cry:([ \n\r\t])|(^):cry:($)/gm
    },{
      image: '<img src="http://imgkk.com/images/ot7qayim.gif" alt="Wink" border="0"/>',
      regex: /([ \n\r\t]);\)|;\)([ \n\r\t])|(^);\)($)/gm
    },{
      image: '<img src="http://imgkk.com/images/t3abdww.gif" alt="Neutral" border="0"/>',
      regex: /([ \n\r\t]):\||:\|([ \n\r\t])|(^):\|($)/gm
    }
  ];
  
  var smileySet;
  
  /**
   * Javascript Smiley Parser
   */
  var smiley = function(text)  {
    if (!smileySet)  {
      switch (scriptSettings.smilies)  {
        case "set2":
          smileySet = set2;
          break;
        
        default:
          smileySet = set1;
      }
    }
    
    for (var i = smileySet.length - 1; i >= 0; --i)
      text = text.replace(smileySet[i].regex, "$1" + smileySet[i].image + "$2");
    
    return text;
  };
  
  // addEvent, designed by Aaron Moore, http://barney.gonzaga.edu/~amoore1/php/addEvent/addEvent.js
  var addEvent=function(b,d,c){if(typeof b[d]!="function"||typeof b[d+"_num"]=="undefined"){b[d+"_num"]=0;if(typeof b[d]=="function"){b[d+0]=b[d];b[d+"_num"]++}b[d]=function(h){var g=true;h=(h)?h:window.event;for(var f=0;f<b[d+"_num"];f++){if(b[d+f](h)===false){g=false}}return g}}for(var a=0;a<b[d+"_num"];a++){if(b[d+a]==c){return}}b[d+b[d+"_num"]]=c;b[d+"_num"]++};
  
  var addCss = function(el, css)  {
    for (var i in css)  {
      var name = i;
      var value = css[i];
      
      if (i == "float")  {
        el.style.cssFloat = value;
        el.style.styleFloat = value;
        
      } else if (/^[a-z]+$/m.test(name))
        el.style[name] = value;
      
      else if (/^[a-z]+-[a-z]{2,}$/m.test(name))  {
        var split = /^([a-z]+)-([a-z])([a-z]+)$/m.exec(name);
        el.style[split[1] + split[2].toUpperCase() + split[3]] = value;
        
      } else
        throw "Invalid argument";
    }
  };
  
  var actualPage = document.location.href;
  var page = function(name)  {
    return actualPage.indexOf(name) >= 0;
  };
  
  /**
   * Simple $ function to easily reference document elements
  */
  var $ = function(arg)  {
    var result = Sizzle(arg);
    
    if (result.length == 1)
      return result[0];
    else if (result.length > 0)
      return result;
    else
      return 0;
  };
  
  var createCookie = function(value)  {
    Cookie.set(cookieName, value, 300);
  };
  
  var scriptSettings = {displayHeader:true,autoUpdate:true,timerLength:5,smilies:"set1"};
  
  var settingsSetup = function()  {
    var defaultCookieValue = 'settings={displayHeader:true,autoUpdate:true,timerLength:5,smilies:"set1"}';
    
    //Load settings from cookie
    if (Cookie.test())  {
      var cookieValue = Cookie.get(cookieName);
      if (cookieValue)  {
        try  {
          eval(cookieValue); //Create the settings var
          
          //Restore settings
          for (var i in settings)
            scriptSettings[i] = settings[i];
          
          //Recreate cookie
          createCookie(cookieValue);
          
        } catch (e)  {
          alert("Error reading cookie. Ressetting...");
          createCookie(defaultCookieValue);
          window.location.reload();
        }
          
      } else
        createCookie(defaultCookieValue);
    
    //If cookies are not avaliable, use default settings  
    } else
      scriptSettings = {displayHeader:true,autoUpdate:true,timerLength:5};
  };
  
  var settingsPage = [
    {
      title: 'Display header',
      desc: 'Display the "Running Facebook Smiley Parser" at the top of the page. This will also disable the link to open this settings dialog. To open it again, you will need to add "#fbsp_settings" to the end of a facebook URL',
      name: 'displayHeader',
      type: 'option'
    },
    {
      title: 'Check for latest version',
      desc: 'Whenever the homepage is loaded, the script checks to see if it the latest version, and displays a message in the header it there is a newer version avaliable. Note: Display header must be enabled',
      name: 'autoUpdate',
      type: 'option'
    },
    {
      title: 'Timer Length',
      desc: 'Set the amount of time (in seconds) between checks to update the page. Default is 5, which means, whenever a change is made to a facebook page, there will be a wait of upto 5 seconds before symbols are converted into smileys. Number must be between 1 and 99. Lower numbers may increase the browser\'s processing load slightly',
      name: 'timerLength',
      type: 'text'
    }
  ];
  
  var displaySettingsPage = function()  {
    
    var width = 350;
    var height = 450;
    
    var div = document.createElement("div");
    div.setAttribute("id", "fbsp_settings");
    
    addCss(div, {
      "display": "none",
      "position": "fixed",
      "width": "100%",
      "height": "100%",
      "background": "#000",
      "opacity": 0.6,
      "filter": "alpha(opacity=60)",
      "top": 0,
      "left": 0,
      "z-index": 100
    });
    
    $("body").appendChild(div);
    
    var content = document.createElement("div");
    content.setAttribute("id", "fbsp_settings_div");
    
    addCss(content, {
      "width": width + "px",
      "height": height + "px",
      "background": "#FFF",
      "top": "50%",
      "left": "50%",
      "position": "fixed",
      "margin": "-" + (height / 2) + "px 0 0 -" + (width / 2) + "px",
      "z-index": 101
    });
    
    content.innerHTML = '<div style="padding:20px;"></div>';
    
    $("body").appendChild(content);
    
    var innerContent = $("#fbsp_settings_div div");
    
    innerContent.innerHTML = '<h1 style="margin-bottom:20px;">Facebook Smiley Parser Settings</h1>';
    
    for (var i = 0; i < settingsPage.length; i++)
      innerContent.innerHTML += addSetting(settingsPage[i].title, settingsPage[i].desc, settingsPage[i].name, settingsPage[i].type);
    
    $("#timerLength").setAttribute("maxlength", 2);
        
    var container = document.createElement("div");
    
    addCss(container, {
      "float": "left",
      "clear": "both",
      "margin": "20px 0 0 40px",
      "text-align": "center"
    });
    
    var saveButton = document.createElement("input");
    saveButton.setAttribute("type", "button");
    saveButton.setAttribute("value", "Save");
    
    var cancelButton = document.createElement("input");
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("value", "Cancel");
    cancelButton.style.marginLeft = "20px";
    
    container.appendChild(saveButton);
    container.appendChild(cancelButton);
    
    var close = function()  {
      $("body").removeChild($("#fbsp_settings"));
      $("body").removeChild($("#fbsp_settings_div"));
    };
    
    var checked = function(name)  {
      return $("#" + name).value == 1 ? "true" : "false";
    };
    
    addEvent(cancelButton, 'onclick', close);
    addEvent(saveButton, 'onclick', function()  {
      var timerLength = $("#timerLength").value;
      
      if (/^[\d]{1,2}$/m.test(timerLength) && timerLength > 0)  {
        updateSettings("{displayHeader:" + checked("displayHeader") + ",autoUpdate:" + checked("autoUpdate") + ",timerLength:" + timerLength + "}");
        
        if (!page("#fbsp_settings"))
          document.location.href = document.location.href; //Reload page
        else
          close();
      } else  {
        alert("Timer length must be between 1 and 99");
        $("#timerLength").focus();
      }
    });
    
    innerContent.appendChild(container);
    
    $("#fbsp_settings").style.display = "block";
    $("#fbsp_settings_div").style.display = "block";
  };
  
  var updateSettings = function(settings)  {
    createCookie("settings=" + settings);
  };
  
  var getOption = function(name)  {
    return scriptSettings[name];
  };
  
  var addSetting = function(title, desc, name, type)  {
    var text = '<div>' +
      '<div style="width:200px;float:left;margin-top:5px;">' +
        '<label for="' + name + '">' + title + '</label>' +
        '<span style="float:left;clear:both;">' + desc + '</span>' +
      '</div>' +
      '<div style="float:left;margin-left:20px;margin-top:5px;">';
    
    switch (type)  {
      case "option":
        text += '<select id="' + name + '">' +
                  '<option value="1"' + (getOption(name) ? ' selected="selected"' : '') + '>Yes</option>' +
                  '<option value="0"' + (getOption(name) ? '' : ' selected="selected"') + '>No</option>' +
                '</select>';
        break;
      
      case "text":
        text += '<input type="text" style="width:40px;" id="' + name + '" value="' + getOption(name) + '"/>';
        break;
    }
    
    text += '</div></div>';
    
    return text;
  };
  
  //Main function of the smiley parser. Run when the page has loaded
  var excecute = function()  {
    settingsSetup();
    
    if (page("home.php") || page("profile.php") || page("friends/") || page('pages/'))  {
      var load = function()  {
        try  {
          if (scriptSettings.displayHeader)
            addInfo();
        } catch (e)  {}
      };
      
      load();      
      executeParser();
    }
    
    if (page("#fbsp_settings"))
      displaySettingsPage();
  };
  
  var executeParser = function()  {
    var length = 0; //Stores the number of elements to parse
    
    //Smiley parser function. Runs every (user defined) seconds and re-parses the appropriate elements
    //when appropriate
    var parser = function()  {
      var body = $("#status_text,.UIIntentionalStory_Message,.wall_actual_text,.status_text,.fstatus,.comment_actual_text");
      
      //Parse the elements if the content has changed
      var temp = body.length;
      if (length != temp)  {
        length = temp; //Update the length so the elements aren't parsed next round
        
        moveHeader();
      
        //Convert smiley symbols to smileys :)
        for (var i = 0; i < body.length; i++)
          body[i].innerHTML = smiley(body[i].innerHTML);
      }
      
      setTimeout(parser, scriptSettings.timerLength); //Rerun the this function every (user defined) seconds
    };
    
    parser(); //Start the parser loop
  };
  
  var update = function(el)  {
    if (scriptSettings.autoUpdate)  {
      //Check to see if an update is avaliable if on the homepage
      if (page("home.php"))  {
        
        var request = new ajaxObject(urlToSite, function(responseText, responseStatus)  {
          if (responseStatus == 200)  {
            try  {
              try  {
                var updatedVersion = /<div class="group_news UIOneOff_Container"><div class="datawrap">R([\d])+ /.exec(responseText);
                updatedVersion = updatedVersion[1];
                if (version < updatedVersion)  {
                  var settingsLink = Sizzle("div", el)[0];
                  el.removeChild(settingsLink);              
                  el.innerHTML += " (Needs updating. R" + updatedVersion + " is avaliable)";
                  el.appendChild(settingsLink);
                }
              } catch (e) {}
            } catch (e)  {}
          }
        });
        
        request.update();
      }
    }
  };
  
  var addInfo = function()  {
    var div = document.createElement("div");
    
    addCss(div, {
      "clear": "both",
      "color": "white",
      "font-size": "1.2em",
      "margin": "10px"
    });
    
    div.innerHTML = "Running Facebook Smiley Parser R" + version;
    update(div);
    
    $("#fb_menubar").appendChild(div);
    
    var settingsLink = document.createElement("div");
    
    addCss(settingsLink, {
      "display": "inline",
      "margin-left": "50px",
      "color": "white",
      "cursor": "pointer"
    });
    
    settingsLink.innerHTML = "Settings";
    
    addEvent(settingsLink, 'onclick', displaySettingsPage);
    addEvent(settingsLink, 'onmouseover', function()  {
      settingsLink.style.textDecoration = "underline";
    });
    addEvent(settingsLink, 'onmouseout', function()  {
      settingsLink.style.textDecoration = "none";
    });
    
    div.appendChild(settingsLink);
    
    moveHeader();
  };
  
  var moveHeader = function()  {
    if (scriptSettings.displayHeader)  {
      try  {
        var body = $("#content .UIFullPage_Container") ? $("#content .UIFullPage_Container") : $(".profile .profile_color_bar");
        if (body)
          body.style.paddingTop = "72px";
        else
          $("#content .UIStandardFrame_Content").style.paddingTop = "22px";
          
      } catch (e)  {}
    }
  };
  
  excecute(); //Start the script on load
};

smileyParser();