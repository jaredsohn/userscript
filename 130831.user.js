(function() {
/* Zepto v1.1.3 - zepto event ajax selector deferred callbacks - zeptojs.com/license */
var Zepto=function(){function k(t){return null==t?String(t):j[T.call(t)]||"object"}function $(t){return"function"==k(t)}function D(t){return null!=t&&t==t.window}function L(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function Z(t){return"object"==k(t)}function F(t){return Z(t)&&!D(t)&&Object.getPrototypeOf(t)==Object.prototype}function q(t){return"number"==typeof t.length}function M(t){return s.call(t,function(t){return null!=t})}function R(t){return t.length>0?n.fn.concat.apply([],t):t}function _(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function W(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function z(t,e){return"number"!=typeof e||c[_(t)]?e:e+"px"}function H(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function I(n,i,r){for(e in i)r&&(F(i[e])||A(i[e]))?(F(i[e])&&!F(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),I(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function B(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return $(e)?e.call(t,n,i):e}function U(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function X(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n in t.childNodes)G(t.childNodes[n],e)}var t,e,n,i,C,S,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),w={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},b=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},T=j.toString,N={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return N.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~N.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},S=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},N.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in w||(i="*"),f=w[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),F(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},N.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},N.isZ=function(t){return t instanceof N.Z},N.init=function(e,i){var r;if(!e)return N.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=N.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=N.qsa(a,e)}else{if($(e))return n(a).ready(e);if(N.isZ(e))return e;if(A(e))r=M(e);else if(Z(e))r=[e],e=null;else if(l.test(e))r=N.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=N.qsa(a,e)}}return N.Z(r,e)},n=function(t,e){return N.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){I(t,n,e)}),t},N.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return L(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=function(t,e){return t!==e&&t.contains(e)},n.type=k,n.isFunction=$,n.isWindow=D,n.isArray=A,n.isPlainObject=F,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(q(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return R(i)},n.each=function(t,e){var n,i;if(q(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return b.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return $(t)?this.not(this.not(t)):n(s.call(this,function(e){return N.matches(e,t)}))},add:function(t,e){return n(S(this.concat(n(t,e))))},is:function(t){return this.length>0&&N.matches(this[0],t)},not:function(e){var i=[];if($(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):q(e)&&$(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return Z(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!Z(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!Z(t)?t:n(t)},find:function(t){var e,i=this;return e="object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(N.qsa(this[0],t)):this.map(function(){return N.qsa(this,t)})},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:N.matches(i,t));)i=i!==e&&!L(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!L(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return B(e,t)},parent:function(t){return B(S(this.pluck("parentNode")),t)},children:function(t){return B(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return B(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=H(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=$(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=$(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))})},text:function(e){return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=e===t?"":""+e})},attr:function(n,i){var r;return"string"==typeof n&&i===t?0==this.length||1!==this[0].nodeType?t:"value"==n&&"INPUT"==this[0].nodeName?this.val():!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:this.each(function(t){if(1===this.nodeType)if(Z(n))for(e in n)U(this,e,n[e]);else U(this,n,J(this,i,t,this.getAttribute(n)))})},removeAttr:function(t){return this.each(function(){1===this.nodeType&&U(this,t)})},prop:function(e,n){return e=P[e]||e,n===t?this[0]&&this[0][e]:this.each(function(t){this[e]=J(this,n,t,this[e])})},data:function(e,n){var i=this.attr("data-"+e.replace(m,"-$1").toLowerCase(),n);return null!==i?Y(i):t},val:function(t){return 0===arguments.length?this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(e){this.value=J(this,t,e,this.value)})},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(0==this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==k(t))i||0===i?a=_(t)+":"+z(t,i):this.each(function(){this.style.removeProperty(_(t))});else for(e in t)t[e]||0===t[e]?a+=_(e)+":"+z(e,t[e])+";":this.each(function(){this.style.removeProperty(_(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(X(t))},W(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=X(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&X(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?X(this,""):(i=X(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(W(t)," ")}),void X(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,X(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?D(s)?s["inner"+i]:L(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=k(e),"object"==t||"array"==t||null==e?e:N.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null,r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();G(o.insertBefore(t,a),function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),N.Z.prototype=n.fn,N.uniq=S,N.deserializeValue=Y,n.zepto=N,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=w}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function T(t){var e,i={originalEvent:t};for(e in t)b.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){if(r(e)){var i=function(){return e.apply(n,arguments)};return i._zid=l(e),i}if(o(n))return t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},w=function(){return!1},b=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=w),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(T(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=w),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=T(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function w(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function b(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=b(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function N(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?N(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n),n.cache===!1&&(n.url=b(n.url,"_="+Date.now()));var s=n.dataType,a=/\?.+=\?/.test(n.url);if("jsonp"==s||a)return a||(n.url=b(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||w(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var T="async"in n?n.async:!0;d.open(n.type,n.url,T,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var T=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(T(t)+"="+T(e))},N(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){function r(e){return e=t(e),!(!e.width()&&!e.height())&&"none"!==e.css("display")}function f(t,e){t=t.replace(/=#\]/g,'="#"]');var n,i,r=s.exec(t);if(r&&r[2]in o&&(n=o[r[2]],i=r[3],t=r[1],i)){var a=Number(i);i=isNaN(a)?i.replace(/^["']|["']$/g,""):a}return e(t,n,i)}var e=t.zepto,n=e.qsa,i=e.matches,o=t.expr[":"]={visible:function(){return r(this)?this:void 0},hidden:function(){return r(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(t){return 0===t?this:void 0},last:function(t,e){return t===e.length-1?this:void 0},eq:function(t,e,n){return t===n?this:void 0},contains:function(e,n,i){return t(this).text().indexOf(i)>-1?this:void 0},has:function(t,n,i){return e.qsa(this,i).length?this:void 0}},s=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),a=/^\s*>/,u="Zepto"+ +new Date;e.qsa=function(i,r){return f(r,function(o,s,f){try{var c;!o&&s?o="*":a.test(o)&&(c=t(i).addClass(u),o="."+u+" "+o);var l=n(i,o)}catch(h){throw console.error("error performing selector: %o",r),h}finally{c&&c.removeClass(u)}return s?e.uniq(t.map(l,function(t,e){return s.call(t,e,l,f)})):l})},e.matches=function(t,e){return f(e,function(e,n,r){return!(e&&!i(t,e)||n&&n.call(t,null,r)!==t)})}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto);;
$.expr[":"].input = function() {
	if (/^(?:INPUT|SELECT|TEXTAREA)$/.test(this.nodeName)) {
		return this;
	}
};
// greasemonkeyではzeptoの:hiddenがエラーを吐くのでjQueryのを使う
$.expr[":"].hidden = function() {
	if (this.offsetWidth <= 0 && this.offsetHeight <= 0) {
		return this;
	}
};
$.ajaxSettings.dataType = "html";
$.ajaxSettings.accepts.html = "text/html; charset=windows-31j";

var IS_CHROME = typeof chrome === 'object' && chrome.extension;
var IS_GM = typeof GM_setValue === "function";
var IS_LOCAL = location.protocol === "file:";
var storage = IS_CHROME && chrome.storage.local;

function Config() {
	Config.load(this);
	//data migration
	if ("fixLink" in this) {
		Config.set("viewMode", this.viewMode = this.treeView !== false ? 't': 's');
		Config.remove("applyToOriginal");
		Config.remove("treeView");
		Config.remove("fixLink");
	}
}

Config.prototype = {
	treeMode: "tree-mode-ascii",
	thumbnail: true,
	thumbnailPopup: true,
	popupMaxWidth: "",
	popupMaxHeight: "",
	popupMode: "center",
	popupBestFit: true,
	threadOrder: "ascending",
	NGHandle: "",
	NGWord: "",
	useNG: true,
	NGCheckMode: false,
	spacingBetweenMessages: IS_LOCAL,
	useVanishThread: true,
	vanishedThreadIDs: [], //扱い注意
	utterlyVanishNGThread: false,
	useVanishMessage: IS_LOCAL,
	vanishedMessageIDs: [],
	vanishMessageAggressive: false,
	utterlyVanishMessage: false,
	utterlyVanishNGStack: false,
	deleteOriginal: !IS_LOCAL,
	isGM: false,
	zero: true,
	accesskeyReload: "R",
	accesskeyV: "",
	fc2: true,
	keyboardNavigation: false,
	keyboardNavigationOffsetTop: "200",
	viewMode: "t",
	css: "",
	linkAnimation: true,
	shouki: true,
	closeResWindow: false,
	maxLine: IS_LOCAL ? "4" : "",
	openLinkInNewTab: IS_LOCAL,
	characterEntity: true,
};
Config.load = function(config) {
	if (IS_GM) {
		var keys = GM_listValues();
		var i = keys.length;
		while (i--) {
			var key = keys[i];
			config[key] = JSON.parse(GM_getValue(key, "null"));
		}
	} else {
		var i = localStorage.length;
		while (i--) {
			var key = localStorage.key(i);
			if (Config.prototype.hasOwnProperty(key)) {
				config[key] = JSON.parse(localStorage.getItem(key));
			}
		}
	}
};
Config.init = function(callback) {
	var config;
	if (IS_CHROME) {
		storage.get(Config.prototype, function(data) {
			config = $.extend(data, ConfigMethods);
			callback(config);
		});
	} else {
		config = $.extend(new Config(), ConfigMethods);
		callback && callback(config);
	}
	return config;
};
Config.remove = function(key) {
	if (IS_GM) {
		GM_deleteValue(key);
	} else if (IS_CHROME) {
		storage.remove(key);
	} else {
		localStorage.removeItem(key);
	}
};
Config.set = function(key, value) {
	var json = JSON.stringify(value);
	if (IS_GM) {
		GM_setValue(key, json);
	} else if (IS_CHROME) {
		var item = {};
		item[key] = value;
		storage.set(item);
	} else {
		localStorage.setItem(key, json);
	}
};
Config.setAll = function(items) {
	if (IS_CHROME) {
		storage.set(items);
	} else {
		for (var key in items) {
			Config.set(key, items[key]);
		}
	}
};
Config.clear = function() {
	if (IS_CHROME) {
		storage.clear();
	} else if (IS_GM) {
		var keys = GM_listValues();
		for (var i = 0, key = null; key = keys[i]; i++) {
			GM_deleteValue(key);
		}
	} else {
		var i = localStorage.length;
		while (i--) {
			var key = localStorage.key(i);
			if (Config.prototype.hasOwnProperty(key)) {
				localStorage.removeItem(key);
			}
		}
	}
};
Config.get = function(key, fun) {
	if (IS_CHROME) {
		storage.get(key, function(item) {
			fun(item[key]);
		});
	} else if (IS_GM) {
		fun(JSON.parse(GM_getValue(key, "null")));
	} else {
		fun(JSON.parse(localStorage.getItem(key)));
	}
};

var ConfigMethods = {
	/** @param {String} id */
	addVanishedMessage: function(id) {
		Config.get("vanishedMessageIDs", function(ids) {
			ids = Array.isArray(ids) ? ids : [];
			if (ids.indexOf(id) === -1) {
				ids.push(id);
				this.vanishedMessageIDs = ids;
				Config.set("vanishedMessageIDs", ids);
			}
		}.bind(this));
	},
	removeVanishedMessage: function(id) {
		Config.get("vanishedMessageIDs", function(ids) {
			ids = Array.isArray(ids) ? ids : [];
			var index = ids.indexOf(id);
			if (index !== -1) {
				ids.splice(index, 1);
				this.vanishedMessageIDs = ids;
				if (ids.length) {
					Config.set("vanishedMessageIDs", ids);
				} else {
					Config.remove("vanishedMessageIDs");
				}
			}
		}.bind(this));
	},
	clearVanishedMessageIDs: function() {
		Config.remove("vanishedMessageIDs");
		this.vanishedMessageIDs = [];
	},

	/** @param {String} id */
	addVanishedThread: function(id) {
		Config.get("vanishedThreadIDs", function(ids) {
			ids = Array.isArray(ids) ? ids : [];
			if (ids.indexOf(id) === -1) {
				ids.push(id);
				this.vanishedThreadIDs = ids;
				Config.set("vanishedThreadIDs", ids);
			}
		}.bind(this));
	},
	removeVanishedThread: function(id) {
		Config.get("vanishedThreadIDs", function(ids) {
			ids = Array.isArray(ids) ? ids : [];
			var index = ids.indexOf(id);
			if (index !== -1) {
				ids.splice(index, 1);
				this.vanishedThreadIDs = ids;
				if (ids.length) {
					Config.set("vanishedThreadIDs", ids);
				} else {
					Config.remove("vanishedThreadIDs");
				}
			}
		}.bind(this));
	},
	clearVanishedThreadIDs: function() {
		Config.remove("vanishedThreadIDs");
		this.vanishedThreadIDs = [];
	},
	clearVanish: function() {
		this.clearVanishedMessageIDs();
		this.clearVanishedThreadIDs();
	},
	clear: function() {
		Config.clear();
		$.extend(true, this, Config.prototype, ConfigMethods);
	},

	isTreeView: function() {
		return this.viewMode === "t";
	}
};
function ConfigController(item) {
	this.item = item;
	var el = document.createElement("form");
	el.id = "config";
	this.$el = $(el);

	var events = ["save", "clear", "close", "clearVanishThread", "clearVanishMessage"];
	for (var i = events.length - 1; i >=0; i--) {
		var event = events[i];
		this.$el.delegate("#" + event, "click", this[event].bind(this));
	}

	this.render();
	return el;
}
ConfigController.prototype = {
	$: function(selector) {
		return $(selector, this.$el);
	},
	render: function() {
		this.$el.append(this.template());
		if (IS_CHROME) {
			this.$("#close").remove();
		}
		this.restore();
	},
	template: function() {
		return '<style type="text/css">\
			<!--\
				li {\
					list-style-type: none;\
				}\
				#configInfo {\
					font-weight: bold;\
					font-style: italic;\
				}\
				legend + ul {\
					margin: 0 0 0 0;\
				}\
			-->\
			</style>\
			<fieldset>\
				<legend>設定</legend>\
				<fieldset>\
					<legend>画像<em>（ぁ界小町のみ）</em></legend>\
					<ul>\
						<li>\
							<label><input type="checkbox" name="thumbnail"/>サムネイルを表示</label>\
							<ul>\
								<li>\
									<label><input type="checkbox" name="thumbnailPopup"/>ポップアップ表示</label>\
									<ul>\
										<li><label>最大幅<input type="text" name="popupMaxWidth" size="5" />px <em>空欄で原寸表示</em></label></li>\
										<li><label>最大高<input type="text" name="popupMaxHeight" size="5" />px <em>空欄で原寸表示</em></label></li>\
										<li><label><input type="radio" name="popupMode" value="followMouse"/>マウスを追う</label></li>\
										<li><label><input type="radio" name="popupMode" value="notFollowMouse"/>マウスを追わず、マウスの側に表示</label></li>\
										<li><label><input type="radio" name="popupMode" value="center"/>マウスを追わず、画面中央に表示</label></li>\
										<ul>\
											<li><label><input type="checkbox" name="popupBestFit"/>最大幅高未設定時にポップアップを画面サイズに合わせる</label><em>「画面中央に表示」の時のみ</em></li>\
										</ul>\
									</ul>\
								</li>\
								<li><label><input type="checkbox" name="linkAnimation"/>描画アニメがあるかチェックしリンクする <em>operaはチェックせず全部にリンクを付ける</em></label></li>\
								<li><label><input type="checkbox" name="shouki"/>詳希(;ﾟДﾟ)</label></li>\
							</ul>\
						</li>\
					</ul>\
				</fieldset>\
				<ul>\
					<li>スレッドの表示順\
						<ul>\
							<li><label><input type="radio" name="threadOrder" value="ascending"/>時刻昇順</label></li>\
							<li><label><input type="radio" name="threadOrder" value="descending"/>時刻降順</label></li>\
						</ul>\
					</li>\
					<li>ツリーの表示に使うのは\
						<ul>\
							<li><label><input type="radio" name="treeMode" value="tree-mode-css"/>CSS</label></li>\
							<li><label><input type="radio" name="treeMode" value="tree-mode-ascii"/>文字</label></li>\
						</ul>\
					</li>\
					<li><label><input type="checkbox" name="spacingBetweenMessages"/>記事の間隔を開ける</label></li>\
					<li><label><input type="checkbox" name="zero"/>常に0件リロード</label><em>（チェックを外しても「表示件数」は0のままなので手動で直してね）</em></li>\
					<li><label>リロードに使うアクセスキー<input type="text" name="accesskeyReload" size="1" /> <em>暫定・本店互換はY</em></label></li>\
					<li><label>内容欄へのアクセスキー<input type="text" name="accesskeyV" size="1" /></label></li>\
					<li><label><input type="checkbox" name="fc2"/>fc2とamebaを直接開けるようにする（リファラーを送らない）</label><em>chromeだけ</em></li>\
					<li><label><input type="checkbox" name="keyboardNavigation"/>jkで移動、rでレス窓開く</label><em>（スタック表示時、極端に件数が多いと遅くなる）</em></li>\
					<ul>\
						<li><label>上から<input type="text" name="keyboardNavigationOffsetTop" size="4" />pxの位置に合わせる</label></li>\
					</ul>\
					<li><label><input type="checkbox" name="closeResWindow"/>書き込み完了した窓を閉じる</label> <em>chrome・operaのみ</em></li>\
					<li><label><input type="text" name="maxLine" size="2" />行以上は省略する</label></li>\
					<li><label><input type="checkbox" name="openLinkInNewTab"/>target属性の付いたリンクを常に新しいタブで開く</label></li>\
					<li><label><input type="checkbox" name="characterEntity"/>数値文字参照を展開</label> <em>（&#数字;が置き換わる）</em></li>\
				</ul>\
				<ul>\
					<li>投稿の表示方法\
						<ul>\
							<li><label><input type="radio" name="viewMode" value="t"/>ツリー表示</label></li>\
							<li><label><input type="radio" name="viewMode" value="s"/>スタック表示</label> <em> 対応していない機能もあります</em></li>\
						</ul>\
					</li>\
					<li><label><input type="checkbox" name="deleteOriginal"/>ツリー表示のとき、元の投稿を非表示にする</label></li>\
				</ul>\
				<fieldset>\
					<legend>非表示設定</legend>\
					<ul>\
						<li><label><input type="checkbox" name="useVanishThread"/>スレッド非表示機能を使う</label><li>\
						<ul>\
							<li><span id="vanishedThreadIDs"></span>個のスレッドを非表示中<input type="button" value="クリア" id="clearVanishThread" /></li>\
							<li><label><input type="checkbox" name="utterlyVanishNGThread"/>完全に非表示</label></li>\
						</ul>\
					</ul>\
					<ul>\
						<li><label><input type="checkbox" name="useVanishMessage"/>投稿非表示機能を使う</label> 使う前に<a href="http://userscripts.org/scripts/show/130831">投稿非表示機能の注意点</a>を読むこと。<li>\
						<ul>\
							<li><span id="vanishedMessageIDs"></span>個の投稿を非表示中<input type="button" value="クリア" id="clearVanishMessage" /></li>\
							<li><label><input type="checkbox" name="utterlyVanishMessage"/>完全に非表示</label></li>\
							<li><label><input type="checkbox" name="vanishMessageAggressive"/>パラノイア</label></li>\
						<ul>\
					<ul>\
				</fieldset>\
				<fieldset>\
					<legend>NGワード</legend>\
					<ul>\
						<li><label><input type="checkbox" name="useNG"/>NGワードを使う</label>\
						<p>指定には正規表現を使う。以下簡易説明。複数指定するには|(縦棒)で"区切る"（先頭や末尾につけてはいけない）。()?*+[]{}^$.の前には\\を付ける。</p>\
						<li><table>\
							<tr>\
								<td><label for="NGHandle">ハンドル</label>\
								<td><input id="NGHandle" type="text" name="NGHandle" size="30"/><em>投稿者とメールと題名</em>\
							<tr>\
								<td><label for="NGWord">本文</label>\
								<td><input id="NGWord" type="text" name="NGWord" size="30"/>\
						</table>\
						<li><label><input type="checkbox" name="NGCheckMode"/>NGワードを含む投稿を畳まない</label>\
						<li><label><input type="checkbox" name="utterlyVanishNGStack"/>スタック表示時に完全非表示</label>\
					</ul>\
				</fieldset>\
				<p>\
					<label>追加CSS<br><textarea name="css" cols="70" rows="5"></textarea></label>\
				</p>\
				<p>\
					<input type="submit" id="save" accesskey="s" value="保存(s)"/>\
					<input type="button" id="clear" value="デフォルトに戻す"/>\
					<input type="button" id="close" accesskey="c" value="閉じる(c)"/>\
					<span id="configInfo"></span>\
				</p>\
			</fieldset>';
	},
	save: function() {
		var items = {}, config = this.item;
		this.$(":input").each(function() {
			var k = this.name, v = null;
			switch (this.type) {
				case "radio":
					if (this.checked) {
						v = this.value;
					}
					break;
				case "text":
				case "textarea":
					v = this.value;
					break;
				case "checkbox":
					v = this.checked;
					break;
			}
			if (v !== null) {
				config[k] = v;
				items[k] = v;
			}
		});
		Config.setAll(items);

		this.info("保存しました。");
		return false;
	},

	clear: function() {
		this.item.clear();
		this.restore();
		this.info("デフォルトに戻しました。");
	},

	close: function() {
		this.$el.remove();
		$(window).scrollTop(0);
	},

	clearVanishThread: function() {
		this.item.clearVanishedThreadIDs();
		this.$("#vanishedThreadIDs").text(0);
		this.info("非表示に設定されていたスレッドを解除しました。");
	},

	clearVanishMessage: function() {
		this.item.clearVanishedMessageIDs();
		this.$("#vanishedMessageIDs").text(0);
		this.info("非表示に設定されていた投稿を解除しました。");
	},

	info: function(text) {
		clearTimeout(this.id);
		var $info = this.$("#configInfo");
		$info.text(text);
		this.id = setTimeout(function() {
			$info.empty();
		}, 5000);
	},

	restore: function restore() {
		var config = this.item;
		this.$("#vanishedThreadIDs").text(config.vanishedThreadIDs.length);
		this.$("#vanishedMessageIDs").text(config.vanishedMessageIDs.length);

		this.$el.find(":input").each(function() {
			switch (this.type) {
				case "radio":
					this.checked = config[this.name] === this.value;
					break;
				case "text":
				case "textarea":
					$(this).val(config[this.name]);
					break;
				case "checkbox":
					this.checked = config[this.name];
					break;
			}
		});
	}

};
;
var q = parseQuery(location.search);

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(start) {
		return this.lastIndexOf(start, 0) === 0;
	};
}
if (!String.prototype.trimRight) {
	String.prototype.trimRight = function() {
		return this.replace(/\s+$/, "");
	};
}
if (!Date.prototype.toLocaleFormat) {
	Date.prototype.toLocaleFormat = function(format) {
		return format
			.replace(/%Y/, this.getFullYear())
			.replace(/%m/, ("0" + (this.getMonth() + 1)).slice(-2))
			.replace(/%d/, ("0" + this.getDate()).slice(-2));
	};
}

var Events = {
	topics: {},
	subscribe: function(topic, callback) {
		if (!this.topics[topic]) {
			this.topics[topic] = [];
		}
		this.topics[topic].push(callback);
	},
	publish: function(topic, arg1, arg2) {
		var callbacks = this.topics[topic];
		if (!callbacks) {
			return;
		}
		for (var i = 0, len = callbacks.length; i < len; i++) {
			callbacks[i].call(this, arg1, arg2);
		}
	}
};

function Post(id) {
	this.id = id;

	this.parent = null; // {Post}
	this.child = null; // {Post}
	this.next = null; // {Post}
}
Post.fetch = function(callbackOrParams) {
	if (typeof callbackOrParams === 'function') {
		Events.subscribe("/Post/fetch", callbackOrParams);
	} else {
		Events.publish("/Post/fetch", callbackOrParams);
	}
};
Post.fetch(function() {
	if (q.ff && q.s && q.m === 't' && /dat$/.test(location.search)) {
		Post.fetchFromRemote();
	} else {
		Post.fetchFromLocal();
	}
});
Post.refresh = function(posts) {
	this.posts = posts;
	Events.publish("/Post/refresh", posts);
};

Post.fetchFromLocal = function() {
	var posts = this.makePosts();
	if (
		(!q.ff && q.m === 't' && /^\d+$/.test(q.s)) ||//通常モードからスレッドボタンを押した場合
		("s" in q && "ff" in q && q.m === 's')	//検索窓→投稿者検索→★の結果の場合
	) {
		posts.forEach(function(post) {
			var date = post.date.match(/\d+/g);
			var ff = '&ff=' + date[0] + date[1] + date[2] + '.dat';
			post.threadUrl += ff; //post.threadUrl.replace(/&ac=1$/, "")必要？
			if (post.resUrl) {
				post.resUrl += ff;
			}
			if (post.posterUrl) {
				post.posterUrl += ff;
			}
		});
	}
	this.refresh(posts);
};
Post.fetchFromRemote = function() {
	Events.publish("/info", '<strong>' + q.ff + "以外の過去ログを検索中...</strong>");

	var now = Date.now();
	var ONE_DAY = 24 * 60 * 60 * 1000;
	var dfds = [];
	var tmp = location.search.match(/ff=(\d{4})(\d{2})(\d{2})\.dat$/);
	var that = this;
	var beforecontainers = [];
	var aftercontainers = [];
	var y = +tmp[1];
	var m = +tmp[2] - 1;
	var d = +tmp[3];
	for (var i = 0; i < 7; i++) {
		var date = new Date(now - i * ONE_DAY);

		if (date.getDate() === d && date.getMonth() === m && date.getFullYear() === y) {
			break;
		} else {
			var xhr = $.get(location.href.replace(/ff=\d+\.dat(?=$|#)/, date.toLocaleFormat('ff=%Y%m%d.dat'))).then(wrapWithDiv);
			xhr.date = date;
			dfds.unshift(xhr);
		}
	}
	var posts = this.makePosts();
	var before = $.Deferred();
	function collectBack(number) {
		if (posts.length && posts[posts.length - 1].isOP() || number >= 7) {
			before.resolve();
		} else {
			var date = new Date(now - number * ONE_DAY);
			$.get(location.href.replace(/ff=\d+\.dat(?=$|#)/, date.toLocaleFormat('ff=%Y%m%d.dat')))
				.then(wrapWithDiv)
				.then(function(dcontainer) {
					var newPosts = that.makePosts(dcontainer);
					posts = posts.concat(newPosts);
					beforecontainers.push({container: dcontainer, date: date});
					collectBack(number + 1);
				});
		}
	}
	collectBack(i + 1);

	var after = $.when.apply(null, dfds).then(function() {
		for (var i = 0, len = dfds.length; i < len; i++) {
			dfds[i].then(function(dcontainer) {
				var newPosts = that.makePosts(dcontainer);
				posts = newPosts.concat(posts);
				aftercontainers.push({container: dcontainer, date: dfds[i].date});
			});
		}
	});
	$.when(before, after).then(function() {
		Events.publish("/Post/postAjax", beforecontainers, aftercontainers);
		Post.refresh(posts);
	});
};
Post.makePosts = function(context) {
	var posts = [];
	var as = context ? context.querySelectorAll("a[name]") : document.anchors;

	for (var i = 0, len = as.length; i < len; i++) {
		var a = as[i];
		var post = new Post(a.name);
		posts.push(post);

		var header = a.nextElementSibling;

		post.title = header.firstChild.innerHTML;
		var named = header.nextElementSibling;
		post.name = named.innerHTML;

		var info = named.nextElementSibling;
		post.date = info.firstChild.nodeValue.trim().slice(4);//「投稿日：」削除
		post.resUrl = info.firstElementChild.href;
		post.threadUrl = info.lastElementChild.href;
		post.threadId = /&s=([^&]+)/.exec(post.threadUrl)[1];
		if (info.childElementCount === 3) {
			post.posterUrl = info.firstElementChild.nextElementSibling.href;
		}

		var text = info.nextElementSibling.firstElementChild.innerHTML;

		text = text.replace(/<\/?font[^>]*>/ig, "")
			.replace(/\r\n?/g, "\n")
			.slice(0, -1);

		if (text.indexOf("&lt;A") > -1) {
			text = text.replace(
				//        "       </A>
				//firefox %22    %3C\/A%3E
				//chrome  &quot; &lt;\/A&gt;
				//opera   &quot; <\/A>
				/&lt;A href="<a href="(.*)(?:%22|&quot;)" target="link">\1"<\/a> target="link"&gt;<a href="\1(?:%3C\/A%3E|&lt;\/A&gt;|<\/A>)" target="link">\1&lt;\/A&gt;<\/a>/g,
				'<a href="$1" target="link">$1</a>'
			);
		}

		post.text = text;

		var reference = /\n\n<a href="(?:h[^"]+&amp;s=|#)(\d+)[^"]*">参考：([^<]+)<\/a>$/.exec(text);
		if (reference) {
			post.parentId = reference[1];
			post.parentDate  = reference[2];
			text = text.slice(0, reference.index);
		}

		var url = /\n\n<[^<]+<\/a>$/.exec(text);
		if (url) {
			text = text.slice(0, url.index);
		}
		if (text.indexOf("<") === -1 && text.indexOf(":") > -1) {
			post.text = text.replace(/(?:https?|ftp|gopher|telnet|whois|news):\/\/[\x21-\x7e]+/g, '<a href="$&" target="link">$&</a>') +
				(url ? url[0] : "") + (reference ? reference[0] : "");
		}
	}
	if (posts.length >= 2 && (+posts[0].id) < (+posts[1].id)) {
		posts.reverse();
	}

	return posts;
};
Post.prototype = {
	id: "", // {string} /^\d+$/
	title: " ", // {string}
	name: "　", // {string}
	date: "", // {string}
	resUrl: "", // {string}
	threadUrl: "", // {string}
	threadId: "", // {string}
	posterUrl: "", // {string}
	parentId: null, // {(string|null|undefined}} null: 親なし, undefined: 不明, everything else: ID 今は数字のみ受け付ける
	parentDate: "", // {string}
	text: "", // {string}

	showAll: false, // {boolean}
	rejectLevel: 0, // {number}
	isRead: false, // {boolean}

	isOP: function() {
		return this.id === this.threadId;
	},
	getText: function() {
		if (this.parentId) {
			return this.text.slice(0, this.text.lastIndexOf("\n\n"));//参考と空行を除去
		}

		return this.text;
	},
	getQuotedText: function() {
		var lines = this.text
			.replace(/&gt; &gt;.*\n/g, "")
			//target属性がないのは参考リンクのみ
			.replace(/<a href="[^"]+">参考：.*<\/a>/i, "")
			.replace(
				/<a href="[^"]+" target="link">([^<]+)<\/a>/ig,       //<A href=¥S+ target=¥"link¥">(¥S+)<¥/A>
				this.delinkify
			)
			.replace(/\n/g, "\n&gt; ");
		lines = ("&gt; " + lines + "\n")
			.replace(/\n&gt;[ \n\r\f\t]+\n/g, "\n")
			.replace(/\n&gt;[ \n\r\f\t]+\n$/, "\n");
		return lines;
	},
	delinkify: function(str, p1) {
		if (/(?:https?|ftp|gopher|telnet|whois|news):\/\/[\x21-\x7e]+/.test(p1)) {
			return str;
		} else {
			return p1;
		}
	},
	makeParentText: function() {
		var text = this.text
			.replace(/^&gt; (.*\n?)|^.*\n?/mg, "$1")
			.replace(/\n$/, "")
			.replace(/^[ \n\r\f\t]*$/mg, "$&\n$&");

		//TODO 引用と本文の間に一行開ける
		//text = text.replace(/((?:&gt; .*\n)+)(.+)/, "$1\n$2"); //replace(/^(?!&gt; )/m, "\n$&");

		return text + "\n\n";
	},
	hasQuote: function() {
		return (/^&gt; /m).test(this.text);
	},
};

var ImaginaryPostProperties = {
	text: {
		get: function() {
			var text, child = this.child;
			if (child.next) {
				var counter = {}, max = 0, candidate;
				do {
					candidate = child.makeParentText();
					counter[candidate] = ++counter[candidate] || 1;
					if (child.getText().replace(/^&gt; .*/mg, "").trim() !== "") {
						counter[candidate] += 2;
					}
				} while (child = child.next);

				for (candidate in counter) {
					var number = counter[candidate];
					if (max < number) {
						max = +number;
						text = candidate;
					}
				}
			} else {
				text = child.makeParentText();
			}
			return Object.defineProperty(this, "text", {value: text}).text;
		}
	},
	parentId: {
		get: function() {
			return postParent.getParentID(this.id);
		}
	},
	isRead: {
		value: true
	}
};

function MergedPost(id, child) {
	this.id = id;
	this.name = child.title.replace(/^＞/, "");
	this.date = child.parentDate;
	this.resUrl = child.resUrl.replace(/(\?|&)s=\d+/, "$1s=" + id);
	this.threadUrl = child.threadUrl;
	this.threadId = child.threadId;
	this.child = child;
	this.next = null;
	this.parent = null;
}
MergedPost.prototype = {
	getText: function() {
		return this.text.slice(0, this.text.lastIndexOf("\n\n"));//参考と空行を除去
	},
};
Object.defineProperties(MergedPost.prototype, ImaginaryPostProperties);
extend(MergedPost, Post);

function GhostPost(id, child) {
	this.id = id;
	this.child = child;
	child.parent = this;
	this.threadId = child.threadId;
	this.threadUrl = child.threadUrl;
	this.resUrlTemplate = child.child.resUrl;
}
GhostPost.prototype = {
	date: "？",
};
Object.defineProperties(GhostPost.prototype, {
	resUrl: {
		get: function() {
			if (this.id) {
				return this.resUrlTemplate.replace(/(\?|&)s=\d+/, "$1s=" + this.id);
			}
		}
	}
});
Object.defineProperties(GhostPost.prototype, ImaginaryPostProperties);
extend(GhostPost, Post);

function Thread(id) {
	this.posts = [];
	this.allPosts = {};
	this.childs = {};
	this.id = id;
	this.postCount = 0;
}
Events.subscribe("/Post/refresh", function(posts) {
	var allThreads = {};
	var threads = [];
	for (var i = 0, len = posts.length; i < len; i++) {
		var post = posts[i];
		var id = post.threadId;
		var thread = allThreads[id];
		if (!thread) {
			thread = allThreads[id] = new Thread(id);
			threads.push(thread);
		}
		thread.add(post);
	}
	Events.publish("/Thread/refresh", threads);
});
Thread.cache = {};
Thread.getRoots = function(id) {
	return  Thread.cache[id];
};
Thread.prototype = {
	add: function(post) {
		var parentId = post.parentId;

		this.posts.push(post);
		this.allPosts[post.id] = post;
		if (parentId) {
			var child = this.childs[parentId];
			if (child) {
				post.next = child;
			}
			this.childs[parentId] = post;
		}
	},
	byID: function(l, r) {
		return +l.id - +r.id;
	},
	getRoots: function() {
		var roots = [];
		var allPosts = this.allPosts;
		var r2 = [];
		var postCount = this.posts.length;
		var posts = this.posts;

		for (var i = 0, len = posts.length; i < len; i++) {
			var post = posts[i];
			var parentId = post.parentId;
			if (parentId) {
				var parent = allPosts[parentId];
				if (!parent) {
					parent = allPosts[parentId] = new MergedPost(parentId, post);
					roots.push(parent);
				} else {
					parent.child = post;
				}
				post.parent = parent;
			} else {
				roots.push(post);
			}
		}

		roots.sort(this.byID);
		for (var i = 0, len = roots.length; i < len; i++) {
			var post = roots[i];
			if (post instanceof MergedPost && !post.isOP() && post.hasQuote()) {
				var parentID = postParent.getParentID(post.id, this.id);
				var parent = allPosts[parentID];
				if (parent) {
					post.parent = parent;
					post.next = parent.child;
					parent.child = post;
				} else if (parentID !== null) {
					var ghost = new GhostPost(parentID, post);
					if (parentID) {
						allPosts[parentID] = ghost;
					}
					r2.push(ghost);
				} else {
					r2.push(post);
				}
			} else {
				r2.push(post);
			}
		}

		if (this.id <= vanishHelper.max) {
			function setRejectLevel(post, generation, isRoot) {
				var id = post.id;
				var child = post.child;
				var next = post.next;
				var rejectLevel = 0;
				if (ids.indexOf(id) > -1) {
					rejectLevel = 3;
				} else if (generation > 0) {
					rejectLevel = generation;
				} else if (isRoot) {
					var parentID = postParent.getParentID(id);
					if (parentID) {
						if (ids.indexOf(parentID) > -1) {
							rejectLevel = 2;
						} else {
							var grandParentID = postParent.getParentID(parentID);
							if (grandParentID && ids.indexOf(grandParentID) > -1) {
								rejectLevel = 1;
							}
						}
					}
				}
				if (rejectLevel) {
					post.rejectLevel = rejectLevel;
					if (utterlyVanishMessage && !post.isRead) {
						postCount--;
					}
				}
				if (child) {
					child = setRejectLevel(child, rejectLevel - 1, false);
				}
				if (next) {
					next = setRejectLevel(next, generation, false);
				}

				if (utterlyVanishMessage) {
					if (!child && post.isRead) {
						return next;
					}
					post.child = child;
					post.next = next;
					if (isRoot && rejectLevel === 0) {
						r3.push(post);
					} else if (rejectLevel === 1 && child) {
						r3.push(child);
					}
					return rejectLevel === 3 ? next : post;
				}
			}
			var ids = config.vanishedMessageIDs;
			var utterlyVanishMessage = config.utterlyVanishMessage;
			var r3 = [];
			for (var i = r2.length - 1; i >= 0; i--) {
				setRejectLevel(r2[i], 0, true);
			}
			if (utterlyVanishMessage) {
				r2 = r3.sort(this.byID);
			}
		}

		this.postCount = postCount;
		Thread.cache[this.id] = r2;
		return r2;
	},
	getDate: function() {
		return this.posts[0].date;
	},
	getNumber: function() {
		return this.postCount;
	},
	getID: function() {
		return this.id;
	},
	getURL: function() {
		return this.posts[0].threadUrl;
	},
};

function Threads() {
	var el = document.createElement("div");
	el.id = "content";
	this.el = el;
	var $el = $(el);

	function getTreeMode($node) {
		return $node.closest(".tree-mode-css").length ? "tree-mode-css" : "tree-mode-ascii";
	}

	function addEventToReplaceWithNewOne(event, selector, func) {
		$el.delegate(selector, event, function() {
			var $message = $(this).closest(".message, .showMessage");
			var post = $message.prop("post");
			var mode = getTreeMode($message);
			var view = new View[mode]();
			func(post);
			$message.replaceWith(view.makeMessage(post));
			return false;
		});
	}
	var click = addEventToReplaceWithNewOne.bind(this, "click");

	click(".characterEntity", function(post) {
		post.characterEntity = !(post.hasOwnProperty("characterEntity") ? post.characterEntity : config.characterEntity);
	});

	click(".showMessageButton", function(post) {
		post.show = true;
	});

	click(".cancelVanishedMessage", function(post) {
		config.removeVanishedMessage(post.id);
		delete post.rejectLevel;
	});

	click(".fold", function(post) {
		post.show = false;
	});

	addEventToReplaceWithNewOne("dblclick", ".text", function(post) {
		post.showAll = !post.showAll;
	});

	click(".toggleTruncation", function(post) {
		post.truncation = post.hasOwnProperty("truncation") ? !post.truncation : false;
	});

	$el.delegate(".toggleMessage", "click", function() {
		var $this = $(this);
		var $message = $this.closest(".message");
		var post = $message.prop("post");
		var id = post.id;
		var text, func, type, display;

		if ($this.hasClass("revert")) {
			text = "消";
			func = function($post) {
				$post.find("strong").remove();
			};
			type = "remove";
			display = "";
		} else {
			if (post.isRead) {
				id = postParent.getParentID(post.child.id, post.threadId, true);
				if (!id) {
					$this.replaceWith("最新1000件以内に存在しないため投稿番号が取得できませんでした。過去ログからなら消せるかもしれません");
					return;
				}
			}
			if (id.length > 100) {
				return;
			}

			text ="戻";
			func = function($post) {
				if (!$post.find("strong.note").length) {
					$post.find(".message-info").before('<strong class="note" style="color:red">この投稿も非表示になります</strong>');
				}
			};
			type = "add";
			display = "none";
		}

		$message.find(".text").css("display", display);
		$this.text(text);
		if (post.child) {
			(function prepareToBeVanished(post, depth) {
				if (depth > 2) {
					return;
				}
				func($("#" + post.id));
				if (post.child) {
					prepareToBeVanished(post.child, depth + 1);
				}
				if (post.next) {
					prepareToBeVanished(post.next, depth);
				}
			})(post.child, 1);
		}

		$this.toggleClass("revert");

		type += "VanishedMessage";

		config[type](id);
	});

	$el.delegate(".vanish", "click", function() {
		var $button = $(this);
		var $thread = $button.closest(".thread");
		var id = $thread.attr("id").slice(1);
		var display, type, text;

		if ($thread.hasClass("NGThread")) {
			display = "";
			type = "remove";
			text = "消";
		} else {
			display = "none";
			type = "add";
			text = "戻";
		}
		type += "VanishedThread";
		$thread.find(".messages").css("display", display);
		config[type](id);
		$thread.toggleClass("NGThread");
		$button.text(text);
	});

	$el.delegate(".toggle-tree", "click", function toggleTree(e) {
		e.preventDefault();
		var button = this;
		setTimeout(function() {
			var $thread = $(button).closest(".thread");
			if ($thread.find(".revert").length) {
				return;
			}

			$thread.toggleClass("tree-mode-ascii tree-mode-css");
			var view = new View[getTreeMode($thread)]();
			var roots = Thread.getRoots($thread.attr("id").slice(1));
			view.init(roots);
			$thread.find(".messages").replaceWith(view.render());
		});
	});

	Events.subscribe("/Thread/refresh", function(threads) {
		Events.publish("/info", " - スレッド構築中");
		this.showThreads(config.threadOrder === "ascending" ? threads.reverse() : threads);
	}.bind(this));
	Events.subscribe("/View/done", function() {
		Events.publish("/info", "");
	});

	return el;
}
Threads.prototype = {
	showThreads: function(threads) {
		var mode = config.treeMode;
		var view = new View[mode]();
		var vanishedThreadIDs = config.vanishedThreadIDs;
		var el = this.el;
		function showThread(thread) {
			var NG = "";
			var vanishButton = '消';
			if (config.useVanishThread && vanishedThreadIDs.indexOf(thread.getID()) > -1) {
				if (config.utterlyVanishNGThread) {
					return;
				}
				NG = " NGThread";
				vanishButton = "戻";
			}
			var roots = thread.getRoots();
			if (!thread.getNumber()) {
				return;
			}

			var html = '<pre id="t' + thread.getID() + '" class="thread ' + mode + NG +'">' +
				'<div class="thread-header">' +
				'<a href="' + thread.getURL() + '" target="link">◆</a>' +
				'　更新日：' + thread.getDate() + '　記事数：' + thread.getNumber() +
				'　<a href="javascript:void(0)" class="toggle-tree">●</a>' +
				(config.useVanishThread ? '　<a href="javascript:void(0)" class="vanish">' + vanishButton + '</a>' : '')+
				'　<a href="' + thread.getURL() + '" target="link">◆</a>' +
				'</div><span class="messages"></div></pre>';
			var dthread = DOM(html);
			view.init(roots, dthread.lastChild);
			dthread.appendChild(view.render());
			el.appendChild(dthread);
		}
		loop(showThread, threads).then(function() {
			Events.publish("/View/done");
		});
	},
};

function AbstractPosts() {
	this.thumbnail = new Thumbnail();
	this.ng = new NG();
}
AbstractPosts.prototype = {
	init: function(item, el) {
		this.el = el || document.createElement("span");
		this.el.className = "messages";
		this.item = item;
	},
	getContainer: function() {
		return this.el;
	},
	render: function() {
		this.pre && this.pre();
		var roots = this.item;
		for (var i = 0, length = roots.length; i < length; i++) {
			this.doShowPosts(roots[i], 1);
		}
		return this.el;
	},
	doShowPosts: function(post, depth) {
		var dm = this.makeMessage(post, depth);
		var dc = this.getContainer(post, depth);
		dc.appendChild(dm);
		if (config.spacingBetweenMessages && dm.extensionText) {
			dc.insertAdjacentHTML("beforeend", '<div class="a-tree">' + dm.extensionText + '</div>');
			dm.extensionText = null;
		}

		if (post.child) {
			this.doShowPosts(post.child, depth + 1);
		}
		if (post.next) {
			this.doShowPosts(post.next, depth);
		}

	},
	makeMessage: function(post, depth) {
		var text = this.makeText(post);
		var classes = [];
		var title = post.title;
		var name = post.name;
		var isNG;
		var hasCharacterEntity = /&amp;#(?:\d+|x[\da-fA-F]+);/.test(text);
		var expandCharacterEntity = hasCharacterEntity && (post.hasOwnProperty("characterEntity") ? post.characterEntity : config.characterEntity);
		var mayHaveThumbnails = text.indexOf('<a') !== -1;
		var extension = this.extension && this.extension(post);
		var extensionHeader;
		var rejectLevel = post.rejectLevel;
		var ng = this.ng;
		var el = document.createElement("span");
		var hide;

		el.id = post.id;
		el.post = post;

		if (this.isCSS) {
			if (config.spacingBetweenMessages) {
				classes.push("spacing");
			}

			if (!depth) {
				depth = 1;
				var parent = post;
				while (parent = parent.parent) {
					if (parent.rejectLevel) {
						break;
					}
					depth++;
				}
			}
			el.style.marginLeft = depth + 'em';
		}

		if (post.isOP()) {
			classes.push("op");
		}

		if (ng.isEnabled) {
			if(ng.NGHandleRE) {
				if (ng.NGHandleRE.test(name)) {
					name = name.replace(ng.NGHandleREg, '<strong class="NGWordHighlight">$&</strong>');
					isNG = true;
				}
				if (ng.NGHandleRE.test(title)) {
					title = title.replace(ng.NGHandleREg, '<strong class="NGWordHighlight">$&</strong>');
					isNG = true;
				}
			}
			if (ng.NGWordRE && ng.NGWordRE.test(text)) {
				text = text.replace(ng.NGWordREg, "<strong class='NGWordHighlight'>$&</strong>"); //"と'を逆にする
				isNG = true;
			}
		}

		if (config.maxLine && !post.showAll) {
			var maxLine = +config.maxLine;
			var lines = text.split("\n");
			var length = lines.length;

			if (length > maxLine) {
				var truncation = post.hasOwnProperty("truncation") ? post.truncation : true;
				if (truncation) {
					var button = '(<a href="javascript:void(0)" class="toggleTruncation note">以下' + (length - maxLine) + '行省略</a>)';
					lines[maxLine] = '<span class="truncation">' + lines[maxLine];
					text = lines.join("\n") + "\n</span>" + button;
				} else {
					text += '\n(<a href="javascript:void(0)" class="toggleTruncation note">省略する</a>)';
				}
			}
		}

		if (extension) {
			el.extensionText = extension.text;
			extensionHeader = '<span class="a-tree">' + extension.header + '</span>';
			text = text.replace(/^/gm, '<span class="a-tree">' + extension.text + '</span>');
		} else {
			extensionHeader = "";
		}

		hide = (isNG && !config.NGCheckMode) || rejectLevel;
		if (hide && !post.show && !post.showAll) {
			classes.push("showMessage");
			var reasons = [];
			if (rejectLevel) {
				reasons.push([null, "孫", "子", "個"][rejectLevel]);
				if (rejectLevel === 3) {
					classes.push("cause");
				}
			}
			if (isNG) {
				reasons.push("NG");
			}
			el.innerHTML = extensionHeader + '<a class="showMessageButton" href="#">' + reasons.join(",") + '</a>';
			el.className = classes.join(" ");
			return el;
		}

		//本文
		var dtext = document.createElement("span");
		dtext.className = "text" + (post.isRead ? " read" : "");
		dtext.innerHTML = text;
		if (expandCharacterEntity) {
			var iter = document.createNodeIterator(dtext, NodeFilter.SHOW_TEXT, null, false);  //operaは省略可能な第3,4引数も渡さないとエラーを吐く
			var node;
			while (node = iter.nextNode()) {
				node.data = node.data.replace(/&#(\d+|x[0-9a-fA-F]+);/g, this.replaceCharacterEntity);
			}
		}
		if (mayHaveThumbnails && config.thumbnail) {
			this.thumbnail.register(dtext);
		}

		//ヘッダ
		var resUrl = post.resUrl ? 'href="' + post.resUrl + '" ' : '';
		var vanish;
		if (rejectLevel === 3) {
			vanish = ' <a href="javascript:void(0)" class="cancelVanishedMessage">非表示を解除</a>';
		} else if (config.useVanishMessage) {
			vanish = ' <a href="javascript:void(0)" class="toggleMessage">消</a>';
		} else {
			vanish = "";
		}
		var header = '<div class="message-header">' + extensionHeader + '<a '
			+ resUrl
			+ 'class="res" target="link">■</a><span class="message-info">'
			+ ((title === '＞　' || title === ' ') && name === '　'
				? ""
				: '<strong>' + title + '</strong> : <strong>' + name + '</strong> #'
			)
			+ post.date + '</span>'
			+ (resUrl && ' <a ' + resUrl + ' target="link">■</a>')
			+ vanish
			+ (hide ? ' <a href="#" class="fold">畳む</a>' : "")
			+ (post.posterUrl ? ' <a href="' + post.posterUrl + '" target="link">★</a>' : '')
			+ (hasCharacterEntity ? ' <a href="#" class="characterEntity' + (expandCharacterEntity ? ' characterEntityOn' : '' ) + '">文字参照</a>' : "")
			+ ' <a href="'
			+ post.threadUrl
			+ '" target="link">◆</a>'
			+ '</div>';

		//メッセージ
		if (!post.showAll) {
			if (isNG && !config.NGCheckMode) {
				classes.push("NG");
			}
			if (rejectLevel) {
				classes.push("dontLikeIt");
			}
		}
		classes.push("message");
		el.className = classes.join(" ");
		el.insertAdjacentHTML("beforeend", header);
		el.appendChild(dtext);

		return el;
	},
	replaceCharacterEntity: function(str, p1) {
		return String.fromCharCode(p1[0] === "x" ? parseInt(p1.slice(1), 16) : p1);
	},
	makeText: function(post) {
		//終わりの空行引用は消してレスする人がいる
		//引用の各行に空白を追加する人がいる
		var text = post.getText();
		var parent = post.parent ? post.parent.getQuotedText() : "";

		if (post.showAll) {
			return this.markQuote(text, parent);
		} else {
			if (text.lastIndexOf(parent, 0) === 0) {
				text = text.slice(parent.length);
			} else {
				//整形して
				parent = this.trimRights(parent);
				text = this.trimRights(text);

				//もう一度
				if (text.lastIndexOf(parent, 0) === 0) {
					text = text.slice(parent.length);
				} else {
					//深海式レスのチェック
					var parent2 = parent.split("\n").filter(function(line) {
						return !line.startsWith("&gt; &gt; ");
					}).join("\n");
					if (text.lastIndexOf(parent2, 0) === 0) {
						text = text.slice(parent2.length);
					} else {
						text = this.markQuote(text, parent);
					}
				}
			}

			//全角空白も\sになる
			//空白のみの投稿が空投稿になる
			text = text.trimRight().replace(/^\s*\n/, "");

			if (text.length === 0) {
				text = '<span class="note">(空投稿)</span>';
			}
		}

		return text;
	},
	markQuote: function(text, parent) {
		var parentLines = parent.split("\n");
		parentLines.pop();
		var lines = text.split("\n");
		var i = Math.min(parentLines.length, lines.length);

		while (i--) {
			lines[i] = '<span class="quote' +
				(parentLines[i] === lines[i] ? '' : ' modified') +
				'">' + lines[i] + '</span>';
		}

		return lines.join("\n");
	},
	trimRights: function(string) {
		return string.replace(/^.+$/gm, function(str) {
			return str.trimRight();
		});
	}
};
function CSSView() {
	AbstractPosts.call(this);
	this.isCSS = true;
	this.mode = "tree-mode-css";
	this.containers = null;
	this.pre = function() {
		this.containers = [{dcontainer: this.el}];
	};
	this.getContainer = function(post, depth) {
		var containers = this.containers;
		var container = containers[containers.length - 1];

		if ("lastChildID" in container && container.lastChildID === post.id) {
			containers.pop();
			container = containers[containers.length - 1];
		}

		var child = post.child;
		if (child && child.next) {
			var acceptedChildCount = child.rejectLevel ? 0 : 1;
			var lastChild = null;
			while (child = child.next) {
				if (!child.rejectLevel) {
					acceptedChildCount++;
					lastChild = child;
				}
			}
			if (acceptedChildCount > 1) {
				var dout = DOM('<span class="border outer" style="left:' +
					(+depth + 0.5) + 'em"><span class="border inner" style="left:' +
					(-depth - 0.5) + 'em"></span></span>');
				container.dcontainer.appendChild(dout);
				container = {lastChildID: lastChild.id, dcontainer: dout.firstChild};
				containers.push(container);
			}
		}

		return container.dcontainer;
	};
}
extend(CSSView, AbstractPosts);

function ASCIIView() {
	AbstractPosts.call(this);
	this.isASCII = true;
	this.mode = "tree-mode-ascii";
	this.extension = function(post) {
		var forHeader, forText, init;
		var utterlyVanishMessage = config.utterlyVanishMessage;
		var hasNext = post.next;
		var tree = [];
		var parent = post;

		while (parent = parent.parent) {
			if (utterlyVanishMessage && parent.rejectLevel) {
				break;
			}
			tree.push(parent.next ? "｜" : "　");
		}
		init = tree.reverse().join("");

		if (post.isOP()) {
			forHeader = "　";
		} else {
			forHeader = init + (hasNext ? '├' : '└');
		}
		forText = init + (hasNext ? '｜' : '　') + (post.child ? '｜' : '　');

		return {header: forHeader, text: forText};
	};
}
extend(ASCIIView, AbstractPosts);

var View = {
	"tree-mode-css": CSSView,
	"tree-mode-ascii": ASCIIView
};

function PostParent() {
	var data = null;
	function getStorage() {
		return config.useVanishMessage ? localStorage : sessionStorage;
	}
	function load() {
		data = JSON.parse(getStorage().getItem("postParent")) || {};
	}
	function save(data) {
		getStorage().setItem("postParent", JSON.stringify(data));
	}
	function update(posts) {
		var changed = false;
		if (!posts.length) {
			return;
		}
		if (!data) {
			load();
		}
		for (var i = 0, len = posts.length; i < len; i++) {
			var post = posts[i];
			var id = post.id;
			if (id in data && data[id] !== false) {
				continue;
			}

			var parentID = post.parentId;
			if (parentID && parentID.length > 20) {
				parentID = null;
			}
			data[id] = parentID;
			changed = true;
		}
		if (changed) {
			setTimeout(save, 0, data);
		}
	}
	function cleanUp() {
		if (!data) {
			return;
		}
		var ids = Object.keys(data);
		var length = ids.length;
		var upperlimit = 500;
		var lowerlimit = 300;
		if (config.useVanishMessage) {
			if (config.vanishMessageAggressive) {
				upperlimit = 3500;
				lowerlimit = 3300;
			} else {
				upperlimit = 1500;
				lowerlimit = 1300;
			}
		}
		if (length > upperlimit) {
			ids.sort(function(l, r) {
				return +r - +l;
			});
			var saveData = {};
			var i = lowerlimit;
			while (i--) {
				saveData[ids[i]] = data[ids[i]];
			}
			setTimeout(save, 0, saveData);
		}
	}
	function fetchThread(childID, threadID) {
		if (!(childID in data) && threadID && q.m === undefined && !IS_LOCAL) {
			$.ajax({url: 'bbs.cgi?m=t&s=' + threadID, async: false}).then(wrapWithDiv).then(function(dcontainer) {
				var posts = Post.makePosts(dcontainer);
				update(posts);
				if (data[childID] === undefined) {
					update([{id: childID, parentId: false}]);
				}
			});
		}
	}

	this.getParentID = function(childID, threadID, force) {
		if (!childID) {
			return;
		}
		if (!data) {
			load();
		}

		if (config.vanishMessageAggressive || force) {
			fetchThread(childID, threadID);
		}

		return data[childID];
	};

	Events.subscribe("/Post/refresh", update);
	Events.subscribe("/View/done", function() {
		setTimeout(cleanUp, 10 * 1000);
	});
}

function Thumbnail() {
	var whitelist = [
		"http://misao.on.arena.ne.jp/c/",
		"http://komachi.betanya.com/uploader/stored/",
		"http://www.google.co.jp/logos/"
	];
	var $body = $(document.body);
	var animationChecker = null;

	function removeImageView() {
		$("#image-view").remove();
		$(".popup").unbind(".followMouse").removeClass("popup");
		$body.unbind(".popup");
	}

	function popupHandler(e) {
		//firefox:ポップアップを消した後、カーソルがサムネイルの上にある
		if (e.relatedTarget === null) {
			return;
		}
		//opera
		if (e.relatedTarget instanceof HTMLBodyElement) {
			return;
		}

		var $this = $(this);
		//chrome
		if ($this.hasClass("last") && $(e.relatedTarget).closest("#image-view").length && !$("#image-view").length) {
			return;
		}

		if ($this.hasClass("popup")) {
			return;
		}

		$(".last").removeClass("last");
		$this.addClass("popup last");

		var isFollowMouse = config.popupMode === "followMouse";
		var isBestFit = config.popupMode === "center" && config.popupBestFit;
		var naturalWidth = this.naturalWidth;
		var naturalHeight = this.naturalHeight;

		var $imageView = $("<div>", {
			id: 'image-view',
			html: '<span id="percentage"></span>%<br/>',
			"class": isFollowMouse ? "" : "popup",
		});
		var $image = $("<img>", {
			src: this.src,
			css: {
				backgroundColor: "white",
			},
		});
		$imageView.append($image).appendTo(document.body);

		var viewport = document.compatMode === "BackCompat" ? document.body : document.documentElement;
		var windowHeight = viewport.clientHeight;
		var windowWidth = viewport.clientWidth;
		// $imageViewに画像が追加されるのが遅れることがある
		var marginHeight = $imageView.height();
		if (marginHeight > naturalHeight) { //追加されている場合
			marginHeight -= naturalHeight;
		}
		var maxWidth = config.popupMaxWidth || isBestFit ? windowWidth : naturalWidth;
		var maxHeight = config.popupMaxHeight || isBestFit ? windowHeight - marginHeight : naturalHeight;
		function getRatio(natural, max) {
			if (/^\d+$/.test(max) && natural > max) {
				return + max / natural;
			} else {
				return 1;
			}
		}
		var ratio = Math.min(getRatio(naturalWidth, maxWidth), getRatio(naturalHeight, maxHeight));
		var percentage = Math.floor(ratio * 100);
		var bgcolor = ratio < 0.5 ? "red" : ratio < 0.9 ? "blue" : "green";
		// 丸めないと画像が表示されないことがある
		var imageHeight = Math.floor(naturalHeight * ratio) || 1;
		var imageWidth = Math.floor(naturalWidth * ratio) || 1;
		var css = {
			backgroundColor: bgcolor
		};

		if (config.popupMode === "center") {
			css.top = window.pageYOffset + (windowHeight - imageHeight - marginHeight) / 2;
			css.left = window.pageXOffset + (windowWidth - imageWidth) / 2;
		} else {
			css.top = (e.pageY - 30) + "px";
			css.left = (e.pageX + (config.popupMode === "followMouse" ? 10 : -10)) + "px";
		}

		$image.attr({
			height: imageHeight,
			width: imageWidth
		});
		$imageView.css(css);
		$("#percentage").text(percentage);

		if (isFollowMouse) {
			$this.bind("mousemove.followMouse", function(e) {
				$imageView.css({
					top: (e.pageY - 30) + "px",
					left: (e.pageX + 10) + "px"
				});
			});
		}

		$body
			.bind("click.popup", removeImageView)
			.bind("keydown.popup", function(e) {
				if (e.which === 27) { // ESC
					removeImageView();
				}
			}).bind("mouseout.popup", function(e) {
				if (!$(e.relatedTarget).closest(".popup").length) {
					removeImageView();
				}
			});

		$imageView.css("visibility", "visible");
	}
	function whitelistHas(href) {
		for (var i = 0, len = whitelist.length; i < len; i++) {
			if (href.startsWith(whitelist[i])) {
				return true;
			}
		}
		return false;
	}

	this.thumbnailLink = function(href) {
		var thumbnail;
		if (!whitelistHas(href)) {
			return null;
		}

		if (/\.(?:jpg|png|gif|bmp)$/.test(href)) {
			var src = href;
			if (!config.thumbnailPopup && href.startsWith('http://misao.on.arena.ne.jp/c/up/')) {
				src = src.replace(/up\//, "up/pixy_");
			}
			thumbnail = '<a href="' + href + '"><img class="thumbnail" src="' + src + '"/></a>';
			if (config.linkAnimation) {
				var misao = /^http:\/\/misao\.on\.arena\.ne\.jp\/c\/up\/(misao\d+)\.(?:png|jpg)$/.exec(href);
				if (misao) {
					var misaoID = misao[1];
					var animationURL = 'http://misao.on.arena.ne.jp/c/upload.cgi?m=A&id=' + (/(?!0)\d+/).exec(misaoID)[0];
					thumbnail += '<span class="animation ' + misaoID + '">[<a href="' + animationURL + '" target="link">A</a><span class="unsure">?</span>]</span>';
					if (!animationChecker) {
						animationChecker = AnimationChecker();
					}
					animationChecker(href).then(function(isAnimation) {
						setTimeout(function() {
							var $misao = $('.' + misaoID);
							if (isAnimation) {
								$misao.find(".unsure").remove();
							} else {
								$misao.remove();
							}
						});
					});
				}
			}
			if (config.shouki) {
				thumbnail += '[<a href="http://images.google.com/searchbyimage?image_url=' + href + '" target="link">詳</a>]';
			}
		}

		return thumbnail;
	};

	this.register = function(container) {
		var as = container.querySelectorAll('a[target]');
		var has = false;
		var i;
		for (i = as.length - 1; i >= 0; i--) {
			var a = as[i];
			var href = a.href;
			var thumbnailLink = this.thumbnailLink(href);
			if (thumbnailLink) {
				a.insertAdjacentHTML('beforebegin',thumbnailLink);
				has = true;
			}
		}
		if (has && config.thumbnailPopup) {
			var imgs = container.getElementsByTagName('img');
			for (i = imgs.length - 1; i >= 0; i--) {
				imgs[i].addEventListener("mouseover", popupHandler, false);
			}
		}
	};
}

function AnimationChecker() {
	var cache = {};
	return function(imgURL) {
		if (!cache[imgURL]) {
			var dfd = $.Deferred();
			var url = imgURL.replace(/\w+$/, "pch");
			if (IS_CHROME) {
				$.ajax({
					url: url,
					type: "HEAD"
				}).then(function() {
					dfd.resolve(true);
				}, function() {
					dfd.resolve(false);
				});
			} else if (IS_GM) {
				GM_xmlhttpRequest({
					url: url,
					method: "HEAD",
					onload: function(response) {
						dfd.resolve(response.status === 200);
					}
				});
			}
		cache[imgURL] = dfd.promise();
		}
		return cache[imgURL];
	};
}

function NG() {
	this.isEnabled = !!(config.useNG && (config.NGWord || config.NGHandle));
	if (this.isEnabled) {
		if (config.NGHandle) {
			this.NGHandleRE = new RegExp(config.NGHandle);
			this.NGHandleREg = new RegExp(config.NGHandle, "g");
		}
		if (config.NGWord) {
			this.NGWordRE = new RegExp(config.NGWord);
			this.NGWordREg = new RegExp(config.NGWord, "g");
		}
	}
}

function VanishHelper() {
	this.max = config.useVanishMessage && Math.max.apply(null, config.vanishedMessageIDs);
}

function App(el) {
	switch (q.m) {
		case "f": //レス窓
			var v = document.querySelector("textarea");
			if (v) {
				v.scrollIntoView();
				v.setSelectionRange(v.textLength, v.textLength);
				v.scrollTop = v.scrollHeight;
				v.focus();
			}
			return;
		case "l": //トピック一覧
		case "c": //個人用設定
			return;
		case 'g': //過去ログ
			if (!q.btn) { //スレッドボタン・レスボタンがなければ
				return;
			}
	}


	if (config.closeResWindow) {
		var finish = document.getElementsByTagName("h1")[0];
		if (finish && finish.textContent === "書き込み完了") {
			if (IS_CHROME) {
				chrome.extension.sendMessage({type: "closeTab"});
				return;
			} else if (window.opera) {
				window.open("", "_parent");
				window.close();
				return;
			}
		}
	}

	if (config.zero) {
		var d = document.getElementsByName("d")[0];
		if (d && d.value !== "0") {
			d.value = "0";
		}
	}

	this.el = el = el || document.body;
	var $el = $(el);
	$el.delegate("#openConfig", "click", this.openConfig.bind(this));
	$el.delegate("a", "click", this.tweakLink);

	if (config.keyboardNavigation) {
		$(document).bind("keypress", new KeyboardNavigation());
	}

	Events.subscribe("/midokureload", this.midokureload);
	Events.subscribe("/reload", this.reload);

	injectCSS();
	this.render();

	if (q.m === 't' && !q.ff && /^\d+$/.test(q.s) && !document.getElementsByName(q.s).length) {
		var url = location.href + new Date().toLocaleFormat("&ff=%Y%m%d.dat");
		$("#info").after(' <a id="hint" href="' + url + '">過去ログを検索する</a>');
	}
}
App.prototype = {
	render: function() {
		var container = config.isTreeView() ? new Tree() : new Stack();
		this.el.insertBefore(container, this.el.firstChild);
	},
	openConfig: function() {
		if (IS_CHROME) {
			window.open(chrome.extension.getURL("options.html"));
		} else if (!$("#config").length) {
			$(this.el).prepend(new ConfigController(config));
			$(window).scrollTop(0);
		}
		return false;
	},
	tweakLink: function() {
		if (config.fc2 && IS_CHROME && /(?:\.fc2\.com|\.ameba\.jp)$/.test(this.hostname)) {
			$(this).attr("rel", "noreferrer");
		}

		if (config.openLinkInNewTab && this.target === "link") {
			$(this).attr("target", "_blank");
		}
	},
	reload: function() {
		var reload = document.getElementById("qtv/reload");
		if (!reload) {
			reload = DOM('<input type="submit" id="qtv/reload" name="reload" value="1" style="display:none;">');
			document.forms[0].appendChild(reload);
		}
		if (IS_LOCAL) {
			console.log("reload");
		} else {
			reload.click();
		}
	},
	midokureload: function() {
		if (IS_LOCAL) {
			console.log("midoku reload");
		} else {
			document.getElementsByName("midokureload")[0].click();
		}
	}
};

function Tree(el) {
	if (!el) {
		el = document.createElement("div");
		el.id = "container";
	}
	this.el = el;

	if (config.deleteOriginal) {
		Events.subscribe("/View/done", function() {
			setTimeout(this.deleteOriginal);
		}.bind(this));
	}

	Events.subscribe("/Post/refresh", function(posts) {
		var postcount;
		if (posts.length) {
			postcount = posts.length + "件取得";
		} else {
			postcount = "未読メッセージはありません。";
		}
		el.querySelector("#postcount").innerHTML = postcount;
	});

	var $el = $(el);

	void function setID() {
		var forms = document.forms;
		if (forms.length) {
			var form = forms[0];
			form.id = "form";
			if (config.accesskeyV.length === 1) {
				var vs = document.getElementsByName("v");
				if (vs.length) {
					vs[0].accessKey = config.accesskeyV;
				}
			}
			var fonts = form.getElementsByTagName("font");
			if (fonts.length > 6) {
				fonts[6].id = "link";
			}
		}
	}();

	//event
	$el.delegate(".reload", "click", this.reload.bind(this));
	$el.delegate('a[href="#form"]', "click", this.focusV);
	$el.delegate(".mattari", "click", this.midokureload);
	$el.delegate('#clearVanishedMessageIDs, #clearVanishedThreadIDs', "click", this.clearVanishedIDs);

	this.render();

	Post.fetch();

	return el;
}
Tree.prototype = {
	template: function() {
		var reload = '<input type="button" value="リロード" class="reload">';
		if (!config.zero) {
			reload += '<input type="button" value="未読" class="mattari">';
		}

		var accesskey = config.accesskeyReload;
		if (!/^\w$/.test(accesskey)) {
			accesskey = "R";
		}
		var views = "";
		var viewing = "";
		var forms = document.forms;
		if (forms.length) {
			var fonts = forms[0].getElementsByTagName("font");
			if (fonts.length > 5) {
				var tmp = fonts[5].textContent.match(/\d+/g) || [];
				views = tmp[3];
				viewing = tmp[5];
			}
		}
		var vanishedThreadIDLength = config.vanishedThreadIDs.length;
		var vanishedMessageIDLength = config.vanishedMessageIDs.length;
		var hasVanishings = vanishedThreadIDLength || vanishedMessageIDLength;
		var vanishingStatus = '非表示解除(<a id="clearVanishedThreadIDs" href="#"><span class="length">' + vanishedThreadIDLength + '</span>スレッド</a>/' +
			'<a id="clearVanishedMessageIDs" href="#"><span class="length">' + vanishedMessageIDLength + '</span>投稿</a>) ';

		var containee =
			'<div id="header">' +
				'<span style="float:left">' +
					reload.replace('class="reload"', '$& accesskey="' + accesskey + '"') + ' ' +
					views + ' / ' + viewing + '名 ' +
					'<span id="postcount"></span>' +
				'</span>' +
				'<ul style="text-align:right;">' +
					'<li><a href="javascript:void(0)" id="openConfig">設定</a></li> ' +
					'<li><a href="#link">link</a></li> ' +
					'<li><a href="#form">投稿フォーム</a></li> ' +
					'<li>' + reload + '</li>' +
				'</ul>' +
			'</div>' +
			'<hr>' +
			'<div id="footer">' +
				'<span style="float:left">' +
					reload + ' ' +
				'</span>' +
				'<ul style="text-align:right">' +
					(hasVanishings ? vanishingStatus : "") +
					'<li>' + reload + '</li>' +
				'</ul>' +
			'</div>';
		return containee;
	},
	render: function() {
		var el = this.el;
		el.innerHTML = this.template();
		var header = el.firstChild;
		header.firstChild.appendChild(new Info());
		el.insertBefore(new Threads(), header.nextSibling);
	},
	deleteOriginal: function() {
		function deleteContents(range, start, end) {
			range.setStartBefore(start);
			range.setEndAfter(end);
			range.deleteContents();
		}

		var anchorsLength = document.anchors.length;
		if (!anchorsLength) {
			return;
		}
		if (anchorsLength <= 1000 || IS_GM || IS_CHROME) {
			var range = document.createRange();
			var start = document.anchors[0].previousElementSibling;
			var ends = document.body.querySelectorAll('p[align="right"], hr, h3');
			var end = ends[ends.length - 1];

			if (IS_GM) {
				range.selectNode(document.body);
				var body = range.extractContents();
				deleteContents(range, start, end);
				document.documentElement.appendChild(body);
			} else {
				deleteContents(range, start, end);
			}
		} else {
			document.getElementById("header").insertAdjacentHTML("beforeend", 'ブラウザが長時間固まる恐れがある為、元記事削除の処理をスキップしました。');
		}
	},
	reload: function() {
		if (config.zero) {
			this.midokureload();
		} else {
			Events.publish("/reload");
		}
	},
	midokureload: function() {
		Events.publish("/midokureload");
	},
	clearVanishedIDs: function() {
		config[this.id]();
		this.firstElementChild.innerHTML = "0";
		return false;
	},
	focusV: function() {
		setTimeout(function() {
			document.getElementsByName("v")[0].focus();
		}, 50);
	}
};

function Stack(el) {
	if (!el) {
		el = document.createElement("div");
		el.id = "container";
	}
	this.el = el;

	$(document.body).delegate(".showOriginalMessageButton", "click", function() {
		var $button = $(this);
		$button.next().css("display", "block");
		$button.remove();
	});

	if (q.m === 't') {
		el.appendChild(new Info());
	}
	if (q.ff && q.m === 't' && /dat$/.test(location.search)) {
		var that = this;
		Events.subscribe("/Post/postAjax", function(befores, afters) {
			// ログ補完が行われなかった場合すぐに呼ばれる
			// setTimeoutが必要
			setTimeout(function() {
				that.addExtraLog(befores, afters);
				Events.publish("/info", "");
				setTimeout(that.render);
			});
		});

		Post.fetch();
	} else {
		this.configButton();
		this.render();
	}

	return el;
}
Stack.prototype = {
	addExtraLog: function(befores, afters) {
		var html = befores.length ? '<hr>' : "";
		function append(container) {
			var dcontainer = container.container;
			var numberOfPosts = dcontainer.querySelectorAll("a[name]").length;
			html += '<h1>' + container.date.toLocaleFormat('%Y%m%d.dat') + '</h1>';
			if (numberOfPosts) {
				html += dcontainer.innerHTML;
				html += '<h3>' + numberOfPosts + '件見つかりました。</h3>';
			} else {
				html += '<hr><h3>指定されたスレッドは見つかりませんでした。</h3><hr>';
			}
		}
		befores.reverse().forEach(append);
		html += '<hr><h1>' + q.ff + '</h1>';
		document.getElementById("container").insertAdjacentHTML("afterend", html);
		html = "";
		afters.forEach(append);
		document.body.insertAdjacentHTML("beforeend", html);
	},
	configButton: function() {
		var setups = document.getElementsByName("setup");
		if (setups.length) {
			setups[0].insertAdjacentHTML("afterend", '　<a href="#" id="openConfig">★くわツリービューの設定★</a>');
		}
	},
	render: function() {
		var range = document.createRange();
		var anchors = Array.prototype.slice.call(document.anchors);
		var div = document.createElement("div");
		var dfd = $.Deferred();
		dfd.then(function() {
			Events.publish("/View/done");
		});
		var ng = new NG();
		var thumbnail = new Thumbnail();

		function wrap(a) {
			var blockquote = a.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
			var isNG = ng.isEnabled && hasNG(a, blockquote);
			if (config.keyboardNavigation || isNG) {
				var wrapper = div.cloneNode(false);
				wrapper.className = "message original" + (isNG ? " NG" : "");
				range.setStartBefore(a);
				range.setEndAfter(blockquote);
				range.surroundContents(wrapper);
				if (isNG) {
					wrapper.insertAdjacentHTML("beforebegin", '<a class="showOriginalMessageButton" href="javascript:void(0)">NG</a>');
				}
			}
			if (config.thumbnail) {
				thumbnail.register(blockquote.firstElementChild);
			}
		}

		function hasNG(a, blockquote) {
			var text = blockquote.firstElementChild.innerHTML;
			var isNG = ng.NGWordRE && ng.NGWordRE.test(text);
			if (!isNG && ng.NGHandleRE) {
				var header = a.nextElementSibling;
				var title = header.firstChild.innerHTML;
				var name = header.nextElementSibling.innerHTML;
				isNG |= ng.NGHandleRE.test(name);
				isNG |= ng.NGHandleRE.test(title);
			}
			return isNG;
		}

		if (config.keyboardNavigation || config.thumbnail || ng.isEnabled) {
			if (IS_GM) {
				range.selectNode(document.body);
				var body = range.extractContents();

				anchors.forEach(wrap);
				document.documentElement.appendChild(body);
				dfd.resolve();
			} else {
				loop(wrap, anchors).then(function() {
					dfd.resolve();
				});
			}
		} else {
			dfd.resolve();
		}
	}
};

function Info(el) {
	if (!el) {
		el = document.createElement("span");
		el.id = "info";
	}
	this.el = el;

	Events.subscribe("/info", function(html) {
		el.innerHTML = (html || "");
	});

	return el;
}

function KeyboardNavigation() {
	//同じキーでもkeypressとkeydownでe.whichの値が違うので注意
	var messages = document.getElementsByClassName("message");
	var focusedIndex = -1;
	var $window = $(window);
	var viewDone = false;

	function getTarget(index, dir) {
		if (index < 0 || messages.length -1 < index) {
			return null;
		}
		var target = messages[index];
		if ($(target).is(":hidden")) {
			return getTarget(index + dir, dir);
		}
		return target;
	}
	function focus(dir) {
		var target = getTarget(focusedIndex + dir, dir);
		if (target) {
			$(".focused").removeClass("focused");
			focusedIndex = $.inArray(target, messages);
			var $target = $(target).addClass("focused");
			$window.scrollTop($target.offset().top - config.keyboardNavigationOffsetTop);
		} else if (dir === 1 && viewDone) {
			Events.publish("/midokureload");
		}
	}

	Events.subscribe("/View/done", function() {
		viewDone = true;
	});

	return function(e) {
		var target = e.target;

		if (/^(?:INPUT|SELECT|TEXTAREA)$/.test(target.nodeName) || target.isContentEditable) {
			return;
		}

		switch (e.which) {
			case 106: //j
				focus(1);
				break;
			case 107: //k
				focus(-1);
				break;
			case 114: //r
				var $f = $(".focused");
				var $res = $f.hasClass("original") ? $f.find("font > a").first() : $f.find(".res");
				if ($res.length) {
					window.open($res.attr("href"));
				}
				break;
			default:
		}
	};
}

///////////////////////////////////////////////////////////////////////////////

function injectCSS() {
	var css = '\
		.text {\
			white-space: pre-wrap;\
			margin-left: 1em;\
/*			line-height: 1em; */\
			min-width: 20em;\
		}\
		.message, .inner, .outer {\
			position: relative;\
		}\
		.text, .message, .showMessage, .border {\
			display: block;\
		}\
		.tree-mode-ascii .text {\
			margin-left: 0;\
		}\
		.thread-header {\
			background: #447733 none repeat scroll 0 0;\
			border-color: #669955 #225533 #225533 #669955;\
			border-style: solid;\
			border-width: 1px 2px 2px 1px;\
			font-size: 80%;\
			font-family: normal;\
			margin-top: 0.8em;\
			padding: 0;\
			width: 100%;\
		}\
\
		.message-header {\
			font-size: 85%;\
			font-family: normal;\
			white-space: nowrap;\
		}\
		.message-info {\
			font-family: monospace;\
			color: #87CE99;\
		}\
		.tree-mode-ascii .message-header {\
			font-family: monospace;\
			font-size: 100%;\
		}\
\
		.read, .quote {\
			color: #CCB;\
		}\
		#header, #footer {\
			font-size: 90%;\
		}\
		.thread {\
			margin-bottom: 1em;\
		}\
		#header li, #footer li {\
			display:inline-block;\
		}\
		.modified {\
			color: #FBB\
		}\
		.note, .characterEntityOn {\
			font-style: italic;\
		}\
\
		.thumbnail {\
			width: 80px;\
			max-height: 400px;\
		}		\
		.inner {\
/*			border: 2px solid yellow; */\
			top: -1em;\
		}\
		.outer {\
			border-left: 1px solid #ADB;\
			top: 1em;\
		}\
		#image-view {\
			position: absolute;\
			background: #004040;\
			visibility: hidden;\
			color: white;\
			font-weight: bold;\
			font-style: italic;\
			margin: 0;\
		}\
		.focused {\
			border: 2px solid yellow;\
		}\
		.truncation, .NGThread .messages, .original.NG {\
			display: none;\
		}\
		.spacing {\
			padding-bottom: 1em;\
		}\
		.NGWordHighlight {\
			background-color: red;\
		}\
	';
	if (config.utterlyVanishNGStack) {
		css += '.original.NG + hr, .showOriginalMessageButton { display: none }';
	}
	GM_addStyle(css + config.css);
}

function GM_addStyle(css) {
	var doc = document;
	var head = doc.getElementsByTagName("head")[0];
	var style = null;
	if (head) {
		style = doc.createElement("style");
		style.textContent = css;
		style.type = "text/css";
		head.appendChild(style);
	}
	return style;
}

var div_ = document.createElement("div");
function DOM(html) {
	var div = div_.cloneNode(false);
	div.innerHTML = html;
	return div.firstChild;
}
function wrapWithDiv(html) {
	var div = document.createElement("div");
	div.innerHTML = html;
	return div;
}

function extend(child, super_) {
	if (Object.__proto__) {
		child.prototype.__proto__ = super_.prototype;
	} else {
		for (var property in super_.prototype) {
			if (typeof child.prototype[property] === "undefined") {
				child.prototype[property] = super_.prototype[property];
			}
		}
	}
	return child;
}

function loop(func, array) {
	var i = 0, length = array.length, dfd = $.Deferred();
	(function loop() {
		var t = Date.now();
		do {
			if (i === length) {
				dfd.resolve();
				return;
			}
			func(array[i++]);
		} while (Date.now() - t < 20);
		setTimeout(loop, 0);
	})();
	return dfd.promise();
}

function parseQuery(search) {
	var obj = {}, kvs = search.substring(1).split("&");
	kvs.forEach(function (kv) {
		obj[kv.split("=")[0]] = kv.split("=")[1];
	});
	return obj;
}
;
// ==UserScript==
// @name        tree view for qwerty
// @namespace   strangeworld
// @description くわツリービュー。あやしいわーるど＠上海の投稿をツリーで表示できます。スタック表示の方にもいくつか機能を追加できます。
// @include     http://qwerty.on.arena.ne.jp/cgi-bin/bbs.cgi*
// @downloadURL https://userscripts.org/scripts/source/130831.user.js
// @updateURL   https://userscripts.org/scripts/source/130831.meta.js
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @version     9.3
// ==/UserScript==

var config = null;
var postParent = null;
var vanishHelper = null;

function initialize(c) {
	config = c;
	postParent = new PostParent();
	vanishHelper = new VanishHelper();

	new App();
}

Config.init(initialize);
})()