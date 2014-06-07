// ==UserScript==
// ==UserScript==
// @name           	trolololo
// @include 		http://game8.margonem.pl/


// ==/UserScript==
//http://i51.tinypic.com/254x2yc.gif

var scriptVersion = "2.3";

// jQuery 1.4.2 + fix 
(function(A,w){function ma(){if(!c.isReady){try{s.documentElement.doScroll("left")}catch(a){setTimeout(ma,1);return}c.ready()}}function Qa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,j){var i=a.length;if(typeof b==="object"){for(var o in b)X(a,o,b[o],f,e,d);return a}if(d!==w){f=!j&&f&&c.isFunction(d);for(o=0;o<i;o++)e(a[o],b,f?d.call(a[o],o,e(a[o],b)):d,j);return a}return i?e(a[0],b):w}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function na(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function oa(a){var b,d=[],f=[],e=arguments,j,i,o,k,n,r;i=c.data(this,"events");if(!(a.liveFired===this||!i||!i.live||a.button&&a.type==="click")){a.liveFired=this;var u=i.live.slice(0);for(k=0;k<u.length;k++){i=u[k];i.origType.replace(O,"")===a.type?f.push(i.selector):u.splice(k--,1)}j=c(a.target).closest(f,a.currentTarget);n=0;for(r=j.length;n<r;n++)for(k=0;k<u.length;k++){i=u[k];if(j[n].selector===i.selector){o=j[n].elem;f=null;if(i.preType==="mouseenter"||i.preType==="mouseleave")f=c(a.relatedTarget).closest(i.selector)[0];if(!f||f!==o)d.push({elem:o,handleObj:i})}}n=0;for(r=d.length;n<r;n++){j=d[n];a.currentTarget=j.elem;a.data=j.handleObj.data;a.handleObj=j.handleObj;if(j.handleObj.origHandler.apply(j.elem,e)===false){b=false;break}}return b}}function pa(a,b){return"live."+(a&&a!=="*"?a+".":"")+b.replace(/\./g,"`").replace(/ /g,"&")}function qa(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function ra(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var j in f)for(var i in f[j])c.event.add(this,j,f[j][i],f[j][i].data)}}})}function sa(a,b,d){var f,e,j;b=b&&b[0]?b[0].ownerDocument||b[0]:s;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===s&&!ta.test(a[0])&&(c.support.checkClone||!ua.test(a[0]))){e=true;if(j=c.fragments[a[0]])if(j!==1)f=j}if(!f){f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=j?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ra=A.jQuery,Sa=A.$,s=A.document,T,Ta=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Ua=/^.[^:#\[\.,]*$/,Va=/\S/,Wa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Xa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,R=Array.prototype.slice,ya=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b){this.context=s;this[0]=s.body;this.selector="body";this.length=1;return this}if(typeof a==="string")if((d=Ta.exec(a))&&(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Xa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=sa([d[1]],[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}return c.merge(this,a)}else{if(b=s.getElementById(d[2])){if(b.id!==d[2])return T.find(a);this.length=1;this[0]=b}this.context=s;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=s;a=s.getElementsByTagName(a);return c.merge(this,a)}else return!b||b.jquery?(b||T).find(a):c(b).find(a);else if(c.isFunction(a))return T.ready(a);if(a.selector!==w){this.selector=a.selector;this.context=a.context}return c.makeArray(a,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return R.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){var f=c();c.isArray(a)?ba.apply(f,a):c.merge(f,a);f.prevObject=this;f.context=this.context;if(b==="find")f.selector=this.selector+(this.selector?" ":"")+d;else if(b)f.selector=this.selector+"."+b+"("+d+")";return f},each:function(a,b){return c.each(this,a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(s,c);else Q&&Q.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(R.apply(this,arguments),"slice",R.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,j,i,o;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(j in e){i=a[j];o=e[j];if(a!==o)if(f&&o&&(c.isPlainObject(o)||c.isArray(o))){i=i&&(c.isPlainObject(i)||c.isArray(i))?i:c.isArray(o)?[]:{};a[j]=c.extend(f,i,o)}else if(o!==w)a[j]=o}return a};c.extend({noConflict:function(a){A.$=Sa;if(a)A.jQuery=Ra;return c},isReady:false,ready:function(){if(!c.isReady){if(!s.body)return setTimeout(c.ready,13);c.isReady=true;if(Q){for(var a,b=0;a=Q[b++];)a.call(s,c);Q=null}c.fn.triggerHandler&&c(s).triggerHandler("ready")}},bindReady:function(){if(!xa){xa=true;if(s.readyState==="complete")return c.ready();if(s.addEventListener){s.addEventListener("DOMContentLoaded",L,false);A.addEventListener("load",c.ready,false)}else if(s.attachEvent){s.attachEvent("onreadystatechange",L);A.attachEvent("onload",c.ready);var a=false;try{a=A.frameElement==null}catch(b){}s.documentElement.doScroll&&a&&ma()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,"isPrototypeOf"))return false;var b;for(b in a);return b===w||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;a=c.trim(a);if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return A.JSON&&A.JSON.parse?A.JSON.parse(a):(new Function("return "+a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Va.test(a)){var b=s.getElementsByTagName("head")[0]||s.documentElement,d=s.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(s.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,j=a.length,i=j===w||c.isFunction(a);if(d)if(i)for(f in a){if(b.apply(a[f],d)===false)break}else for(;e<j;){if(b.apply(a[e++],d)===false)break}else if(i)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=a[0];e<j&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Wa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==w;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,j=a.length;e<j;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,j=0,i=a.length;j<i;j++){e=b(a[j],j,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=w}else if(b&&!c.isFunction(b)){d=b;b=w}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});P=c.uaMatch(P);if(P.browser){c.browser[P.browser]=true;c.browser.version=P.version}if(c.browser.webkit)c.browser.safari=true;if(ya)c.inArray=function(a,b){return ya.call(b,a)};T=c(s);if(s.addEventListener)L=function(){s.removeEventListener("DOMContentLoaded",L,false);c.ready()};else if(s.attachEvent)L=function(){if(s.readyState==="complete"){s.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=s.documentElement,b=s.createElement("script"),d=s.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var e=d.getElementsByTagName("*"),j=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!j)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(j.getAttribute("style")),hrefNormalized:j.getAttribute("href")==="/a",opacity:/^0.55$/.test(j.style.opacity),cssFloat:!!j.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};b.type="text/javascript";try{b.appendChild(s.createTextNode("window."+f+"=1;"))}catch(i){}a.insertBefore(b,a.firstChild);if(A[f]){c.support.scriptEval=true;delete A[f]}try{delete b.test}catch(o){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function k(){c.support.noCloneEvent=false;d.detachEvent("onclick",k)});d.cloneNode(true).fireEvent("onclick")}d=s.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=s.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var k=s.createElement("div");k.style.width=k.style.paddingLeft="1px";s.body.appendChild(k);c.boxModel=c.support.boxModel=k.offsetWidth===2;s.body.removeChild(k).style.display="none"});a=function(k){try{var n=s.createElement("div");k="on"+k;var r=k in n;if(!r){n.setAttribute(k,"return;");r=typeof n[k]==="function"}n=null}catch(e){return false}return r};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=j=null}})();c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ya=0,za={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var f=a[G],e=c.cache;if(!f&&typeof b==="string"&&d===w)return null;f||(f=++Ya);if(typeof b==="object"){a[G]=f;e[f]=c.extend(true,{},b)}else if(!e[f]){a[G]=f;e[f]={}}a=e[f];if(d!==w)a[b]=d;return typeof b==="string"?a[b]:a}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{if(c.support.deleteExpando)delete a[c.expando];else a.removeAttribute&&a.removeAttribute(c.expando);delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===w){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===w&&this.length)f=c.data(this[0],a);return f===w&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===w)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Aa=/[\n\t]/g,ca=/\s+/,Za=/\r/g,$a=/href|src|style/,ab=/(button|input)/i,bb=/(button|input|object|select|textarea)/i,cb=/^(a|area)$/i,Ba=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(n){var r=c(this);r.addClass(a.call(this,n,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className){for(var j=" "+e.className+" ",i=e.className,o=0,k=b.length;o<k;o++)if(j.indexOf(" "+b[o]+" ")<0)i+=" "+b[o];e.className=c.trim(i)}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(k){var n=c(this);n.removeClass(a.call(this,k,n.attr("class")))});if(a&&typeof a==="string"||a===w)for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var j=(" "+e.className+" ").replace(Aa," "),i=0,o=b.length;i<o;i++)j=j.replace(" "+b[i]+" "," ");e.className=c.trim(j)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var j=c(this);j.toggleClass(a.call(this,e,j.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,j=0,i=c(this),o=b,k=a.split(ca);e=k[j++];){o=f?o:!i.hasClass(e);i[o?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Aa," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===w){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var j=b?d:0;for(d=b?d+1:e.length;j<d;j++){var i=e[j];if(i.selected){a=c(i).val();if(b)return a;f.push(a)}}return f}if(Ba.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Za,"")}return w}var o=c.isFunction(a);return this.each(function(k){var n=c(this),r=a;if(this.nodeType===1){if(o)r=a.call(this,k,n.val());if(typeof r==="number")r+="";if(c.isArray(r)&&Ba.test(this.type))this.checked=c.inArray(n.val(),r)>=0;else if(c.nodeName(this,"select")){var u=c.makeArray(r);c("option",this).each(function(){this.selected=c.inArray(c(this).val(),u)>=0});if(!u.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return w;if(f&&b in c.attrFn)return c(a)[b](d);f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==w;b=f&&c.props[b]||b;if(a.nodeType===1){var j=$a.test(b);if(b in a&&f&&!j){if(e){b==="type"&&ab.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:bb.test(a.nodeName)||cb.test(a.nodeName)&&a.href?0:w;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&j?a.getAttribute(b,2):a.getAttribute(b);return a===null?w:a}return c.style(a,b,d)}});var O=/\.(.*)$/,db=function(a){return a.replace(/[^\w\s\.\|`]/g,function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==A&&!a.frameElement)a=A;var e,j;if(d.handler){e=d;d=e.handler}if(!d.guid)d.guid=c.guid++;if(j=c.data(a)){var i=j.events=j.events||{},o=j.handle;if(!o)j.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,arguments):w};o.elem=a;b=b.split(" ");for(var k,n=0,r;k=b[n++];){j=e?c.extend({},e):{handler:d,data:f};if(k.indexOf(".")>-1){r=k.split(".");k=r.shift();j.namespace=r.slice(0).sort().join(".")}else{r=[];j.namespace=""}j.type=k;j.guid=d.guid;var u=i[k],z=c.event.special[k]||{};if(!u){u=i[k]=[];if(!z.setup||z.setup.call(a,f,r,o)===false)if(a.addEventListener)a.addEventListener(k,o,false);else a.attachEvent&&a.attachEvent("on"+k,o)}if(z.add){z.add.call(a,j);if(!j.handler.guid)j.handler.guid=d.guid}u.push(j);c.event.global[k]=true}a=null}}},global:{},remove:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){var e,j=0,i,o,k,n,r,u,z=c.data(a),C=z&&z.events;if(z&&C){if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(e in C)c.event.remove(a,e+b)}else{for(b=b.split(" ");e=b[j++];){n=e;i=e.indexOf(".")<0;o=[];if(!i){o=e.split(".");e=o.shift();k=new RegExp("(^|\\.)"+c.map(o.slice(0).sort(),db).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(r=C[e])if(d){n=c.event.special[e]||{};for(B=f||0;B<r.length;B++){u=r[B];if(d.guid===u.guid){if(i||k.test(u.namespace)){f==null&&r.splice(B--,1);n.remove&&n.remove.call(a,u)}if(f!=null)break}}if(r.length===0||f!=null&&r.length===1){if(!n.teardown||n.teardown.call(a,o)===false)Ca(a,e,z.handle);delete C[e]}}else for(var B=0;B<r.length;B++){u=r[B];if(i||k.test(u.namespace)){c.event.remove(a,n,u.handler,B);r.splice(B--,1)}}}if(c.isEmptyObject(C)){if(b=z.handle)b.elem=null;delete z.events;delete z.handle;c.isEmptyObject(z)&&c.removeData(a)}}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return w;a.result=w;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(j){}if(!a.isPropagationStopped()&&f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){f=a.target;var i,o=c.nodeName(f,"a")&&e==="click",k=c.event.special[e]||{};if((!k._default||k._default.call(d,a)===false)&&!o&&!(f&&f.nodeName&&c.noData[f.nodeName.toLowerCase()])){try{if(f[e]){if(i=f["on"+e])f["on"+e]=null;c.event.triggered=true;f[e]()}}catch(n){}if(i)f["on"+e]=i;c.event.triggered=false}}},handle:function(a){var b,d,f,e;a=arguments[0]=c.event.fix(a||A.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;if(!b){d=a.type.split(".");a.type=d.shift();f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}e=c.data(this,"events");d=e[a.type];if(e&&d){d=d.slice(0);e=0;for(var j=d.length;e<j;e++){var i=d[e];if(b||f.test(i.namespace)){a.handler=i.handler;a.data=i.data;a.handleObj=i;i=i.handler.apply(this,arguments);if(i!==w){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||s;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=s.documentElement;d=s.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==w)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,a.origType,c.extend({},a,{handler:oa}))},remove:function(a){var b=true,d=a.origType.replace(O,"");c.each(c.data(this,"events").live||[],function(){if(d===this.origType.replace(O,""))return b=false});b&&c.event.remove(this,a.origType,oa)}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};var Ca=s.removeEventListener?function(a,b,d){a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y};var Da=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ea=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ea:Da,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ea:Da)}}});if(!c.support.submitBubbles)c.event.special.submit={setup:function(){if(this.nodeName.toLowerCase()!=="form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length)return na("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13)return na("submit",this,arguments)})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};if(!c.support.changeBubbles){var da=/textarea|input|select/i,ea,Fa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},fa=function(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Fa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",e);if(!(f===w||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:fa,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return fa.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return fa.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,"_change_data",Fa(a))}},setup:function(){if(this.type==="file")return false;for(var a in ea)c.event.add(this,a+".specialChange",ea[a]);return da.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return da.test(this.nodeName)}};ea=c.event.special.change.filters}s.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,f)}c.event.special[b]={setup:function(){this.addEventListener(a,d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var j in d)this[b](j,f,d[j],e);return this}if(c.isFunction(f)){e=f;f=w}var i=b==="one"?c.proxy(e,function(k){c(this).unbind(k,i);return e.apply(this,arguments)}):e;if(d==="unload"&&b!=="one")this.one(d,f,e);else{j=0;for(var o=this.length;j<o;j++)c.event.add(this[j],d,i,f)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&!a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var f=this.length;d<f;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,f){return this.live(b,d,f,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ga={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e,j){var i,o=0,k,n,r=j||this.selector,u=j?this:c(this.context);if(c.isFunction(f)){e=f;f=w}for(d=(d||"").split(" ");(i=d[o++])!=null;){j=O.exec(i);k="";if(j){k=j[0];i=i.replace(O,"")}if(i==="hover")d.push("mouseenter"+k,"mouseleave"+k);else{n=i;if(i==="focus"||i==="blur"){d.push(Ga[i]+k);i+=k}else i=(Ga[i]||i)+k;b==="live"?u.each(function(){c.event.add(this,pa(i,r),{data:f,selector:r,handler:e,origType:i,origHandler:e,preType:n})}):u.unbind(pa(i,r),e)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});A.attachEvent&&!A.addEventListener&&A.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});(function(){function a(g){for(var h="",l,m=0;g[m];m++){l=g[m];if(l.nodeType===3||l.nodeType===4)h+=l.nodeValue;else if(l.nodeType!==8)h+=a(l.childNodes)}return h}function b(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=l;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}m[q]=y}}}function d(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=l;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(k.filter(h,[t]).length>0){y=t;break}}t=t[g]}m[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,e=0,j=Object.prototype.toString,i=false,o=true;[0,0].sort(function(){o=false;return 0});var k=function(g,h,l,m){l=l||[];var q=h=h||s;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||typeof g!=="string")return l;for(var p=[],v,t,y,S,H=true,M=x(h),I=g;(f.exec(""),v=f.exec(I))!==null;){I=v[3];p.push(v[1]);if(v[2]){S=v[3];break}}if(p.length>1&&r.exec(g))if(p.length===2&&n.relative[p[0]])t=ga(p[0]+p[1],h);else for(t=n.relative[p[0]]?[h]:k(p.shift(),h);p.length;){g=p.shift();if(n.relative[g])g+=p.shift();t=ga(g,t)}else{if(!m&&p.length>1&&h.nodeType===9&&!M&&n.match.ID.test(p[0])&&!n.match.ID.test(p[p.length-1])){v=k.find(p.shift(),h,M);h=v.expr?k.filter(v.expr,v.set)[0]:v.set[0]}if(h){v=m?{expr:p.pop(),set:z(m)}:k.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=v.expr?k.filter(v.expr,v.set):v.set;if(p.length>0)y=z(t);else H=false;for(;p.length;){var D=p.pop();v=D;if(n.relative[D])v=p.pop();else D="";if(v==null)v=h;n.relative[D](y,v,M)}}else y=[]}y||(y=t);y||k.error(D||g);if(j.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))l.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&l.push(t[g]);else l.push.apply(l,y);else z(y,l);if(S){k(S,q,l,m);k.uniqueSort(l)}return l};k.uniqueSort=function(g){if(B){i=o;g.sort(B);if(i)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};k.matches=function(g,h){return k(g,null,null,h)};k.find=function(g,h,l){var m,q;if(!g)return[];for(var p=0,v=n.order.length;p<v;p++){var t=n.order[p];if(q=n.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");m=n.find[t](q,h,l);if(m!=null){g=g.replace(n.match[t],"");break}}}}m||(m=h.getElementsByTagName("*"));return{set:m,expr:g}};k.filter=function(g,h,l,m){for(var q=g,p=[],v=h,t,y,S=h&&h[0]&&x(h[0]);g&&h.length;){for(var H in n.filter)if((t=n.leftMatch[H].exec(g))!=null&&t[2]){var M=n.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-1)!=="\\"){if(v===p)p=[];if(n.preFilter[H])if(t=n.preFilter[H](t,v,l,p,m,S)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=v[U])!=null;U++)if(D){I=M(D,t,U,v);var Ha=m^!!I;if(l&&I!=null)if(Ha)y=true;else v[U]=false;else if(Ha){p.push(D);y=true}}if(I!==w){l||(v=p);g=g.replace(n.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)k.error(g);else break;q=g}return v};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},relative:{"+":function(g,h){var l=typeof h==="string",m=l&&!/\W/.test(h);l=l&&!m;if(m)h=h.toLowerCase();m=0;for(var q=g.length,p;m<q;m++)if(p=g[m]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[m]=l||p&&p.nodeName.toLowerCase()===h?p||false:p===h}l&&k.filter(h,g,true)},">":function(g,h){var l=typeof h==="string";if(l&&!/\W/.test(h)){h=h.toLowerCase();for(var m=0,q=g.length;m<q;m++){var p=g[m];if(p){l=p.parentNode;g[m]=l.nodeName.toLowerCase()===h?l:false}}}else{m=0;for(q=g.length;m<q;m++)if(p=g[m])g[m]=l?p.parentNode:p.parentNode===h;l&&k.filter(h,g,true)}},"":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("parentNode",h,m,g,p,l)},"~":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,m,g,p,l)}},find:{ID:function(g,h,l){if(typeof h.getElementById!=="undefined"&&!l)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var l=[];h=h.getElementsByName(g[1]);for(var m=0,q=h.length;m<q;m++)h[m].getAttribute("name")===g[1]&&l.push(h[m]);return l.length===0?null:l}},TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,l,m,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var v;(v=h[p])!=null;p++)if(v)if(q^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))l||m.push(v);else if(l)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,l,m,q,p){h=g[1].replace(/\\/g,"");if(!p&&n.attrMap[h])g[1]=n.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,l,m,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,h);else{g=k.filter(g[3],h,l,true^q);l||m.push.apply(m,g);return false}else if(n.match.POS.test(g[0])||n.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,l){return!!k(l[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},setFilters:{first:function(g,h){return h===0},last:function(g,h,l,m){return h===m.length-1},even:function(g,h){return h%2===0},odd:function(g,h){return h%2===1},lt:function(g,h,l){return h<l[3]-0},gt:function(g,h,l){return h>l[3]-0},nth:function(g,h,l){return l[3]-0===h},eq:function(g,h,l){return l[3]-0===h}},filter:{PSEUDO:function(g,h,l,m){var q=h[1],p=n.filters[q];if(p)return p(g,l,h,m);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=h[3];l=0;for(m=h.length;l<m;l++)if(h[l]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+q)},CHILD:function(g,h){var l=h[1],m=g;switch(l){case"only":case"first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(l==="first")return true;m=g;case"last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case"nth":l=h[2];var q=h[3];if(l===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var v=0;for(m=p.firstChild;m;m=m.nextSibling)if(m.nodeType===1)m.nodeIndex=++v;p.sizcache=h}g=g.nodeIndex-q;return l===0?g===0:g%l===0&&g/l>=0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var l=h[1];g=n.attrHandle[l]?n.attrHandle[l](g):g[l]!=null?g[l]:g.getAttribute(l);l=g+"";var m=h[2];h=h[4];return g==null?m==="!=":m==="="?l===h:m==="*="?l.indexOf(h)>=0:m==="~="?(" "+l+" ").indexOf(h)>=0:!h?l&&g!==false:m==="!="?l!==h:m==="^="?l.indexOf(h)===0:m==="$="?l.substr(l.length-h.length)===h:m==="|="?l===h||l.substr(0,h.length+1)===h+"-":false},POS:function(g,h,l,m){var q=n.setFilters[h[2]];if(q)return q(g,l,h,m)}}},r=n.match.POS;for(var u in n.match){n.match[u]=new RegExp(n.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[u].source.replace(/\\(\d+)/g,function(g,h){return"\\"+(h-0+1)}))}var z=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};try{Array.prototype.slice.call(s.documentElement.childNodes,0)}catch(C){z=function(g,h){h=h||[];if(j.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var l=0,m=g.length;l<m;l++)h.push(g[l]);else for(l=0;g[l];l++)h.push(g[l]);return h}}var B;if(s.documentElement.compareDocumentPosition)B=function(g,h){if(!g.compareDocumentPosition||!h.compareDocumentPosition){if(g==h)i=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===h?0:1;if(g===0)i=true;return g};else if("sourceIndex"in s.documentElement)B=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)i=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)i=true;return g};else if(s.createRange)B=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)i=true;return g.ownerDocument?-1:1}var l=g.ownerDocument.createRange(),m=h.ownerDocument.createRange();l.setStart(g,0);l.setEnd(g,0);m.setStart(h,0);m.setEnd(h,0);g=l.compareBoundaryPoints(Range.START_TO_END,m);if(g===0)i=true;return g};(function(){var g=s.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var l=s.documentElement;l.insertBefore(g,l.firstChild);if(s.getElementById(h)){n.find.ID=function(m,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(m[1]))?q.id===m[1]||typeof q.getAttributeNode!=="undefined"&&q.getAttributeNode("id").nodeValue===m[1]?[q]:w:[]};n.filter.ID=function(m,q){var p=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&p&&p.nodeValue===q}}l.removeChild(g);l=g=null})();(function(){var g=s.createElement("div");g.appendChild(s.createComment(""));if(g.getElementsByTagName("*").length>0)n.find.TAG=function(h,l){l=l.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var m=0;l[m];m++)l[m].nodeType===1&&h.push(l[m]);l=h}return l};g.innerHTML="<a href='#'></a>";if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")n.attrHandle.href=function(h){return h.getAttribute("href",2)};g=null})();s.querySelectorAll&&function(){var g=k,h=s.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){k=function(m,q,p,v){q=q||s;if(!v&&q.nodeType===9&&!x(q))try{return z(q.querySelectorAll(m),p)}catch(t){}return g(m,q,p,v)};for(var l in g)k[l]=g[l];h=null}}();(function(){var g=s.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){n.order.splice(1,0,"CLASS");n.find.CLASS=function(h,l,m){if(typeof l.getElementsByClassName!=="undefined"&&!m)return l.getElementsByClassName(h[1])};g=null}}})();var E=s.compareDocumentPosition?function(g,h){return!!(g.compareDocumentPosition(h)&16)}:function(g,h){return g!==h&&(g.contains?g.contains(h):true)},x=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},ga=function(g,h){var l=[],m="",q;for(h=h.nodeType?[h]:h;q=n.match.PSEUDO.exec(g);){m+=q[0];g=g.replace(n.match.PSEUDO,"")}g=n.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)k(g,h[q],l);return k.filter(m,l)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=a;c.isXMLDoc=x;c.contains=E})();var eb=/Until$/,fb=/^(?:parents|prevUntil|prevAll)/,gb=/,/;R=Array.prototype.slice;var Ia=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,j){return!!b.call(e,j,e)===d});else if(b.nodeType)return c.grep(a,function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Ua.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;c.find(a,this[f],b);if(f>0)for(var j=d;j<b.length;j++)for(var i=0;i<d;i++)if(b[i]===b[j]){b.splice(j--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ia(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ia(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,j={},i;if(f&&a.length){e=0;for(var o=a.length;e<o;e++){i=a[e];j[i]||(j[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;f&&f.ownerDocument&&f!==b;){for(i in j){e=j[i];if(e.jquery?e.index(f)>-1:c(f).is(e)){d.push({selector:i,elem:f});delete j[i]}}f=f.parentNode}}return d}var k=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(n,r){for(;r&&r.ownerDocument&&r!==b;){if(k?k.index(r)>-1:c(r).is(a))return r;r=r.parentNode}return null})},index:function(a){if(!a||typeof a==="string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),a);return this.pushStack(qa(a[0])||qa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);eb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):e;if((this.length>1||gb.test(f))&&fb.test(a))e=e.reverse();return this.pushStack(e,a,R.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===w||a.nodeType!==1||!c(a).is(d));){a.nodeType===1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var Ja=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ka=/(<([\w:]+)[^>]*?)\/>/g,hb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,La=/<([\w:]+)/,ib=/<tbody/i,jb=/<|&#?\w+;/,ta=/<script|<object|<embed|<option|<style/i,ua=/checked\s*(?:[^=]|=\s*.checked.)/i,Ma=function(a,b,d){return hb.test(d)?a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==w)return this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,f;(f=this[d])!=null;d++)if(!a||c.filter(a,[f]).length){if(!b&&f.nodeType===1){c.cleanData(f.getElementsByTagName("*"));c.cleanData([f])}f.parentNode&&f.parentNode.removeChild(f)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Ja,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){ra(this,b);ra(this.find("*"),b.find("*"))}return b},html:function(a){if(a===w)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Ja,""):null;else if(typeof a==="string"&&!ta.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(La.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ka,Ma);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var j=c(this),i=j.html();j.empty().append(function(){return a.call(this,e,i)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,b,f))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(u){return c.nodeName(u,"table")?u.getElementsByTagName("tbody")[0]||u.appendChild(u.ownerDocument.createElement("tbody")):u}var e,j,i=a[0],o=[],k;if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&ua.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(u){var z=c(this);a[0]=i.call(this,u,b?z.html():w);z.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:sa(a,this,o);k=e.fragment;if(j=k.childNodes.length===1?(k=k.firstChild):k.firstChild){b=b&&c.nodeName(j,"tr");for(var n=0,r=this.length;n<r;n++)d.call(b?f(this[n],j):this[n],n>0||e.cacheable||this.length>1?k.cloneNode(true):k)}o.length&&c.each(o,Qa)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);var e=this.length===1&&this[0].parentNode;if(e&&e.nodeType===11&&e.childNodes.length===1&&d.length===1){d[b](this[0]);return this}else{e=0;for(var j=d.length;e<j;e++){var i=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),i);f=f.concat(i)}return this.pushStack(f,a,d.selector)}}});c.extend({clean:function(a,b,d,f){b=b||s;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||s;for(var e=[],j=0,i;(i=a[j])!=null;j++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!jb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(Ka,Ma);var o=(La.exec(i)||["",""])[1].toLowerCase(),k=F[o]||F._default,n=k[0],r=b.createElement("div");for(r.innerHTML=k[1]+i+k[2];n--;)r=r.lastChild;if(!c.support.tbody){n=ib.test(i);o=o==="table"&&!n?r.firstChild&&r.firstChild.childNodes:k[1]==="<table>"&&!n?r.childNodes:[];for(k=o.length-1;k>=0;--k)c.nodeName(o[k],"tbody")&&!o[k].childNodes.length&&o[k].parentNode.removeChild(o[k])}!c.support.leadingWhitespace&&V.test(i)&&r.insertBefore(b.createTextNode(V.exec(i)[0]),r.firstChild);i=r.childNodes}if(i.nodeType)e.push(i);else e=c.merge(e,i)}}if(d)for(j=0;e[j];j++)if(f&&c.nodeName(e[j],"script")&&(!e[j].type||e[j].type.toLowerCase()==="text/javascript"))f.push(e[j].parentNode?e[j].parentNode.removeChild(e[j]):e[j]);else{e[j].nodeType===1&&e.splice.apply(e,[j+1,0].concat(c.makeArray(e[j].getElementsByTagName("script"))));d.appendChild(e[j])}return e},cleanData:function(a){for(var b,d,f=c.cache,e=c.event.special,j=c.support.deleteExpando,i=0,o;(o=a[i])!=null;i++)if(d=o[c.expando]){b=f[d];if(b.events)for(var k in b.events)e[k]?c.event.remove(o,k):Ca(o,k,b.handle);if(j)delete o[c.expando];else o.removeAttribute&&o.removeAttribute(c.expando);delete f[d]}}});var kb=/z-?index|font-?weight|opacity|zoom|line-?height/i,Na=/alpha\([^)]*\)/,Oa=/opacity=([^)]*)/,ha=/float/i,ia=/-([a-z])/ig,lb=/([A-Z])/g,mb=/^-?\d+(?:px)?$/i,nb=/^-?\d/,ob={position:"absolute",visibility:"hidden",display:"block"},pb=["Left","Right"],qb=["Top","Bottom"],rb=s.defaultView&&s.defaultView.getComputedStyle,Pa=c.support.cssFloat?"cssFloat":"styleFloat",ja=function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===w)return c.curCSS(d,f);if(typeof e==="number"&&!kb.test(f))e+="px";c.style(d,f,e)})};c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return w;if((b==="width"||b==="height")&&parseFloat(d)<0)d=w;var f=a.style||a,e=d!==w;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=Na.test(a)?a.replace(Na,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Oa.exec(f.filter)[1])/100+"":""}if(ha.test(b))b=Pa;b=b.replace(ia,ja);if(e)f[b]=d;return f[b]},css:function(a,b,d,f){if(b==="width"||b==="height"){var e,j=b==="width"?pb:qb;function i(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(j,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,"border"+this+"Width",true))||0})}a.offsetWidth!==0?i():c.swap(a,ob,i);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&a.currentStyle){f=Oa.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ha.test(b))b=Pa;if(!d&&e&&e[b])f=e[b];else if(rb){if(ha.test(b))b="float";b=b.replace(lb,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ia,ja);f=a.currentStyle[b]||a.currentStyle[d];if(!mb.test(f)&&nb.test(f)){b=e.left;var j=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=j}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var sb=J(),tb=/<script(.|\s)*?\/script>/gi,ub=/select|textarea/i,vb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ka=/\?/,wb=/(\?|&)_=.*?(&|$)/,xb=/^(\w+:)?\/\/([^\/?#]+)/,yb=/%20/g,zb=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!=="string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}var j=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(i,o){if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"")).find(e):i.responseText);d&&j.each(d,[i.responseText,o,i])}});return this},serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ub.test(this.nodeName)||vb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:A.XMLHttpRequest&&(A.location.protocol!=="file:"||!A.ActiveXObject)?function(){return new A.XMLHttpRequest}:function(){try{return new A.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&e.success.call(k,o,i,x);e.global&&f("ajaxSuccess",[x,e])}function d(){e.complete&&e.complete.call(k,x,i);e.global&&f("ajaxComplete",[x,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),j,i,o,k=a&&a.context||e,n=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(n==="GET")N.test(e.url)||(e.url+=(ka.test(e.url)?"&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||N.test(e.url))){j=e.jsonpCallback||"jsonp"+sb++;if(e.data)e.data=(e.data+"").replace(N,"="+j+"$1");e.url=e.url.replace(N,"="+j+"$1");e.dataType="script";A[j]=A[j]||function(q){o=q;b();d();A[j]=w;try{delete A[j]}catch(p){}z&&z.removeChild(C)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===false&&n==="GET"){var r=J(),u=e.url.replace(wb,"$1_="+r+"$2");e.url=u+(u===e.url?(ka.test(e.url)?"&":"?")+"_="+r:"")}if(e.data&&n==="GET")e.url+=(ka.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&c.event.trigger("ajaxStart");r=(r=xb.exec(e.url))&&(r[1]&&r[1]!==location.protocol||r[2]!==location.host);if(e.dataType==="script"&&n==="GET"&&r){var z=s.getElementsByTagName("head")[0]||s.documentElement,C=s.createElement("script");C.src=e.url;if(e.scriptCharset)C.charset=e.scriptCharset;if(!j){var B=false;C.onload=C.onreadystatechange=function(){if(!B&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){B=true;b();d();C.onload=C.onreadystatechange=null;z&&C.parentNode&&z.removeChild(C)}}}z.insertBefore(C,z.firstChild);return w}var E=false,x=e.xhr();if(x){e.username?x.open(n,e.url,e.async,e.username,e.password):x.open(n,e.url,e.async);try{if(e.data||a&&a.contentType)x.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&x.setRequestHeader("If-Modified-Since",c.lastModified[e.url]);c.etag[e.url]&&x.setRequestHeader("If-None-Match",c.etag[e.url])}r||x.setRequestHeader("X-Requested-With","XMLHttpRequest");x.setRequestHeader("Accept",e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(ga){}if(e.beforeSend&&e.beforeSend.call(k,x,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");x.abort();return false}e.global&&f("ajaxSend",[x,e]);var g=x.onreadystatechange=function(q){if(!x||x.readyState===0||q==="abort"){E||d();E=true;if(x)x.onreadystatechange=c.noop}else if(!E&&x&&(x.readyState===4||q==="timeout")){E=true;x.onreadystatechange=c.noop;i=q==="timeout"?"timeout":!c.httpSuccess(x)?"error":e.ifModified&&c.httpNotModified(x,e.url)?"notmodified":"success";var p;if(i==="success")try{o=c.httpData(x,e.dataType,e)}catch(v){i="parsererror";p=v}if(i==="success"||i==="notmodified")j||b();else c.handleError(e,x,i,p);d();q==="timeout"&&x.abort();if(e.async)x=null}};try{var h=x.abort;x.abort=function(){x&&h.call(x);g("abort")}}catch(l){}e.async&&e.timeout>0&&setTimeout(function(){x&&!E&&g("timeout")},e.timeout);try{x.send(n==="POST"||n==="PUT"||n==="DELETE"?e.data:null)}catch(m){c.handleError(e,x,null,m);d()}e.async||g();return x}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b==="json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(i,o){if(c.isArray(o))c.each(o,function(k,n){b||/\[\]$/.test(i)?f(i,n):d(i+"["+(typeof n==="object"||c.isArray(n)?k:"")+"]",n)});else!b&&o!=null&&typeof o==="object"?c.each(o,function(k,n){d(i+"["+k+"]",n)}):f(i,o)}function f(i,o){o=c.isFunction(o)?o():o;e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(o)}var e=[];if(b===w)b=c.ajaxSettings.traditional;if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var j in a)d(j,a[j]);return e.join("&").replace(yb,"+")}});var la={},Ab=/toggle|show|hide/,Bb=/^([+-]=)?([\d+-.]+)(.*)$/,W,va=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(la[d])f=la[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();la[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],"olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var j=c.extend({},e),i,o=this.nodeType===1&&c(this).is(":hidden"),k=this;for(i in a){var n=i.replace(ia,ja);if(i!==n){a[n]=a[i];delete a[i];i=n}if(a[i]==="hide"&&o||a[i]==="show"&&!o)return j.complete.call(this);if((i==="height"||i==="width")&&this.style){j.display=c.css(this,"display");j.overflow=this.style.overflow}if(c.isArray(a[i])){(j.specialEasing=j.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(j.overflow!=null)this.style.overflow="hidden";j.curAnim=c.extend({},a);c.each(a,function(r,u){var z=new c.fx(k,j,r);if(Ab.test(u))z[u==="toggle"?o?"show":"hide":u](a);else{var C=Bb.exec(u),B=z.cur(true)||0;if(C){u=parseFloat(C[2]);var E=C[3]||"px";if(E!=="px"){k.style[r]=(u||1)+E;B=(u||1)/z.cur(true)*B;k.style[r]=B+E}if(C[1])u=(C[1]==="-="?-1:1)*u+B;z.custom(B,u,E)}else z.custom(B,u,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration==="number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(j){return e.step(j)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in s.documentElement?function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=this[0];if(a)return this.each(function(r){c.offset.setOffset(this,a,r)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=b,e=b.ownerDocument,j,i=e.documentElement,o=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var k=b.offsetTop,n=b.offsetLeft;(b=b.parentNode)&&b!==o&&b!==i;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;j=e?e.getComputedStyle(b,null):b.currentStyle;k-=b.scrollTop;n-=b.scrollLeft;if(b===d){k+=b.offsetTop;n+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=j}if(f.position==="relative"||f.position==="static"){k+=o.offsetTop;n+=o.offsetLeft}if(c.offset.supportsFixedPosition&&f.position==="fixed"){k+=Math.max(i.scrollTop,o.scrollTop);n+=Math.max(i.scrollLeft,o.scrollLeft)}return{top:k,left:n}};c.offset={initialize:function(){var a=s.body,b=s.createElement("div"),d,f,e,j=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";a.insertBefore(b,a.firstChild);d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==j;a.removeChild(b);c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),j=parseInt(c.curCSS(a,"top",true),10)||0,i=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,d,e);d={top:b.top-e.top+j,left:b.left-e.left+i};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||s.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],j;if(!e)return null;if(f!==w)return this.each(function(){if(j=wa(this))j.scrollTo(!a?f:c(j).scrollLeft(),a?f:c(j).scrollTop());else this[d]=f});else return(j=wa(e))?"pageXOffset"in j?j[a?"pageYOffset":"pageXOffset"]:c.support.boxModel&&j.document.documentElement[d]||j.document.body[d]:e[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(j){var i=c(this);i[d](f.call(this,j,i[d]()))});return"scrollTo"in e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===w?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});A.jQuery=A.$=c})(window);

var confMaxAutoGrpPajaki = 4;
var char1 = "";
var char2 = "";
var char3 = "";
var char4 = "";
var char_all = "";
var char_delim = "\x7C";








//char1  = "\x62\x61\u017c\xBC\x61\x6E\x74\x74"

char1  = "Morus"
char2  = "\x46\x65\x72\x6E\x61\x6E\x64\x6F\x54\x6F\x72\x72\x65\x73"
char3  = "\x41\x67\x75\x65\x72\x6F"

char_all = char_delim + char1 + char_delim + char2 + char_delim + char3 + char_delim + char4 + char_delim;
function proceed_to_go()
{
    
    return ((char_all).indexOf(unsafeWindow._hero.nick)>=0)?true:false;
}

/** XHConn - Simple XMLHTTP Interface - bfults@gmail.com - 2005-04-08        **
 ** Code licensed under Creative Commons Attribution-ShareAlike License      **
 ** http://creativecommons.org/licenses/by-sa/2.0/                           **/

function XHConn() {
  var xmlhttp, bComplete = false;
  try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); }
  catch (e) { try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
  catch (e) { try { xmlhttp = new XMLHttpRequest(); }
  catch (e) { xmlhttp = false; }}}
  if (!xmlhttp) return null;
  this.connect = function(sURL, sMethod, sVars, fnDone)  {
    if (!xmlhttp) return false;
    bComplete = false;
    sMethod = sMethod.toUpperCase();
    try {
      if (sMethod == "GET") { xmlhttp.open(sMethod, sURL+"?"+sVars, true); sVars = ""; }
      else {
        xmlhttp.open(sMethod, sURL, true);
        //xmlhttp.setRequestHeader("Method", "POST "+sURL+" HTTP/1.1");
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("Content-length", sVars.length);
		xmlhttp.setRequestHeader("Connection", "close");		
      }
      xmlhttp.onreadystatechange = function(){ if (xmlhttp.readyState == 4 && !bComplete) { bComplete = true; fnDone(xmlhttp); }};
      xmlhttp.send(sVars);
    }
    catch(z) { return false; }   return true;
  };
  return this;
}

function trace(a){
	if (unsafeWindow.console !== undefined) unsafeWindow.console.log(a);
	//unsafeWindow.console.log(a);
}

// this is main window plugin

console.log(window.name);

var chatWindow = null;

if (document.location.href.indexOf("/margo+") < 0 && document.location.href.indexOf("/margo+chat") < 0)
{
    //create window of plugin
	function plugin_start()
    {
        unsafeWindow.cloneSearchPath();
        $('body').append("<div id='enemylist' style='position:absolute;'>Wrogowie:</div>");
        if (unsafeWindow.margoPlusWindow===undefined)
        {
            console.log("nie widze okna!");
            var win2 = null;
            var scrsize = GM_getValue("margoMapPluginWindowSize", "");
            if (scrsize!="")
            {
                var sc = scrsize.split('|');
                win2 = window.open (document.location.href+"margo+","mywindow",'resizable=1,width='+sc[2]+',height='+sc[3]+',scrollbars=1,location=0,status=0',true);	
                win2.moveTo(sc[0],sc[1]);
                self.moveTo(sc[4],sc[5]);
                self.resizeTo(sc[6],sc[7]);
            }
            else
                win2 = window.open (document.location.href+"margo+","mywindow",'resizable=1,width=400,height=600,scrollbars=1,location=0,status=0',true);	
            win2.chatWindow = chatWindow;
        }
    }
    window.setTimeout(plugin_start, 1000);
    
    
//script code
var head_script = ""+<><![CDATA[    

function loadScript(a) { console.log("ScriptLoader.") }
//var fnb=lootWindow; function lootWindow(b) { fnb(b);

function fn_a(str)
{
    return str;
}

function target_action(obj, mode)
{
    if (typeof(hero["searchpath"]=='undefined'))
    {
         hero['searchPath'] = hero['searchPath2']; 
    }
    if (mode==0)
    {
        if (obj>0)
        {
            if (typeof (g.other[obj]) != 'undefined')
            {
                //   hero.searchPath(g.other[obj].x, g.other[obj].y); 
                // g.playerCatcher.activatePlayer(id); 
                // g.playerCatcher.startFollow(); 
                margoPlusWindow.followPlayer(obj);
            }
        }    
        else
        {
             g.playerCatcher.stopFollow();
        }

    }
    else
    {
        if (typeof (g.other[obj]) != 'undefined')
        {
            //margoPlusWindow.followPlayer(obj);
            hero.searchPath2(g.other[obj].x, g.other[obj].y); 
        }
    }
}
    
function lootItem(a) {
  if (typeof(window.looty) == 'undefined')  window.looty = [];
  window.looty.push(["ITEM#"+a.id,a.tip,a.icon]);
  //console.log(a);
  g.loots.want.push(a.id.toString());
  $("#loots TR").append("<td id=loot" + a.id + "><div class=loot><div class=item id=item" + a.id + " ctip=t_item tip='" + a.tip + "' style='background-image:url(" + g.opath + "itemy/" + a.icon + "'></div></div><b class='yes sel' onclick='setLoots(0,\"" + a.id + "\")' tip='Chcę'></b><b class=no onclick='setLoots(1,\"" + a.id + "\")' tip='Nie chcę'></b>" + (g.loots.init > 1 ? "<br clear=all><b class=need onclick='setLoots(2,\"" + a.id + "\")' tip='Koniecznie potrzebuję'></b>" : ""))
}
 
function cloneSearchPath()
{
    hero['searchPath2'] = hero['searchPath']; 
}
 
]]></>;
///// end of head_script    

	
    var script = document.createElement('script');    
    script.innerHTML = head_script;       
 	script.setAttribute('defer', '');
	script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script); 
    
   
}
else if (unsafeWindow.name=="mychatwindow")
{

    if (!window.opener) return;

    ////////// new body added to chat window
    var serv = window.location.href.split("//")[1].split('.')[0];
	serv = 	serv.charAt(0).toUpperCase() + serv.substring(1,serv.length);
	if (serv.indexOf("Game")==0)
	{
		var names=["Classic","Tarhuna","Nerthus","Katahha","Perkun","Telawel","Lelwani","Zemyna","Hutena","Jaruna","Zorza","noname","noname","noname","noname","noname","noname"];
		serv = names[parseInt(serv.split("Game")[1])-1];
	}
 
//////////////////////////////////////
// scripts
        function goToUrl(a) 
        { 
            a = "http://" + a; 
            window.open(a);
        }	

	
        function onres() 
        { 
            var h = (typeof window.innerHeight != 'undefined' ? window.innerHeight : document.body.offsetHeight); 
            document.getElementById("popup_chat").style.height = h-80; 
            document.getElementById("popup_chat").scrollTop = document.getElementById("popup_chat").scrollHeight;
        }

        function chatTo(a) 
        { 
            document.getElementById("chattxt2").value = "@"+a.replace(/ /g, "_") + " "; 
            document.getElementById("chattxt2").focus(); 
        }
        
					

// raw data string
var map_chat_body = ""+<><![CDATA[

<script type="text/javascript">
        function goToUrl(a) 
        { 
            a = "http://" + a; 
            window.open(a);
        }	
        function checkKey(event)
        {
            if (event.keyCode == 13) 
            { 
                var as=""; 
                if (document.getElementById("klanowy").checked) as="/k "; 
                window.opener.popSend(as+document.getElementById("chattxt2").value); 
                
                document.getElementById("chattxt2").value="";
            } 
            else if (document.getElementById("chattxt2").value=="/r") 
            { 
                var a=window.opener._g.chat.lastnick; 
                var b=a.replace(/ /g,"_"); 
                document.getElementById("chattxt2").value = "@"+b+" ";
            }
        }
</script>

<div id="popup_chat" style="overflow-y: scroll;margin-bottom: 10px;"></div>
<div id="chat_txt" style="">
    <input id="chattxt2" type=text style="width:100%" onkeypress="checkKey(event)"></input>
    <br>
    <table width=100%>
        <tr><td><input type=checkbox id="klanowy" name="klanowy"><font size="2" face="verdana" color="green">Tryb klanowy</font></td>
            <td align=right><input align=right type="button" id="czysc" value="Wyczysc czat" onclick="document.getElementById('popup_chat').innerHTML='';" /></td>
        </tr>
    </table>
</div>
]]></>;

	var chatWindowStyles = '<style type="text/css"> ';
	chatWindowStyles+= '.fightgr {color:#B554FF;} ';  
	chatWindowStyles+= '.chprivsend {color:#AAFF66;} '; 
	chatWindowStyles+= '.chpriv {color:#FFCC00;} '; 
	chatWindowStyles+= '.chwywal {color:red;} '; 
	chatWindowStyles+= '.chnick { color:#E7D798; cursor:pointer;} '; 
	chatWindowStyles+= '.sys_info { display:none; color:#CCFFCC; } ';
	chatWindowStyles+= '.clant, div.clant span.chnick { color:orange; } ';
	chatWindowStyles+= '.entertown { display:none; border-bottom:1px dotted #FFEE66; color:#FFEE66; font-weight:bold; padding-left:10px; } ';
	chatWindowStyles+= '.priv2, div.priv2 span.chnick {color:#CCFF00;} ';
	chatWindowStyles+= '.priv, div.priv span.chnick {color:#FFCC00;} ';
	chatWindowStyles+= ' .czas, span.czas {color:#aaaa80;} ';
	chatWindowStyles+= 'a {color:yellow;} ';  
	chatWindowStyles+= 'b.yourname {color:orange;} '; 
	chatWindowStyles+= '.team { color:#B554FF; } ';
	chatWindowStyles+= '.emo { color:#FF8877;} ';
	chatWindowStyles+= 'u { border-bottom:1px dashed white; color:white; cursor:pointer; text-decoration:none; } ';
	chatWindowStyles+= '</style>'; 

///////////////////////////////////
    
    function notif(nick){alert(nick);}
    
    function chat_loaded()
    {
        $('head').html('<title>'+serv+' - MargoChat 2.3</title>');
        $('head').append(chatWindowStyles);
        if ($('body').attr("id").length==0)
        {
            $('body').attr("id","popup_body").attr("bgcolor","#003300");
            $('body').css({"font-family":"Arial,Verdana,sans-serif","color":"white","font-size":"10px"});
        
            $('body').html(map_chat_body);
            $(".chnick").live("click",function(){chatTo($(this).attr("c_nick"))});
            window.onresize = onres; 
            window.chatHTML = '';
            onres();
            unsafeWindow.opener.margoPlusChatWindow = window;
        }
    }
        
    $(document).ready(chat_loaded);
	


}
else if (unsafeWindow.name=="mywindow") 
{

// okno pluginu mapy

// css scripts	

	var margoPlusStyles = '<style type="text/css">';
	margoPlusStyles+= '.fightgr {color:#B554FF;}';
	margoPlusStyles+= '</style>';
	
var buttonStyles = ""+<><![CDATA[
// css scripts	
    <style type="text/css">
	.button {
   	border-top: 1px solid #96d1f8;width:100px;
   	border-bottom: 1px solid #96d1f8;width:100px;
   	border-left: 1px solid #96d1f8;width:100px;
   	border-right: 1px solid #96d1f8;width:100px;
   	background: #65a9d7;
   	background: -webkit-gradient(linear, left top, left bottom, from(#3e779d), to(#65a9d7));
   	background: -moz-linear-gradient(top, #3e779d, #65a9d7);
   	padding: 2px 4px;
   	-webkit-border-radius: 0px;
   	-moz-border-radius: 0px;
   	border-radius: 0px;
   	-webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;
   	-moz-box-shadow: rgba(0,0,0,1) 0 1px 0;
   	box-shadow: rgba(0,0,0,1) 0 1px 0;
   	text-shadow: rgba(0,0,0,.4) 0 1px 0;
   	color: white;
    font-size: 12px;
   	font-family: serif;
   	text-decoration: none;
   	vertical-align: middle;
    }
    .button:hover {
    border-top-color: #28597a;
    border-left-color: #28597a;
    border-right-color: #28597a;
    border-bottom-color: #28597a;
    //background: #28597a;
    color: #222;
    }
    .button:active__ {
    border-top-color: #1b435e;
    background: #1b435e;
    }	
	.buttondark {
    border-top: 1px solid #4ba303;
    background: #78765f;
    background: -webkit-gradient(linear, left top, left bottom, from(#154d2e), to(#78765f));
    background: -moz-linear-gradient(top, #154d2e, #78765f);
    padding: 2px 4px;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
	border-radius: 0px;
	-webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;
	-moz-box-shadow: rgba(0,0,0,1) 0 1px 0;
	box-shadow: rgba(0,0,0,1) 0 1px 0;
	text-shadow: rgba(0,0,0,.4) 0 1px 0;
	color: #121212;
	font-size: 12px;
	font-family: Serif;
	text-decoration: none;
	vertical-align: middle;
	}

	
	.buttonOn {
	border-top: 1px solid #7d2100;
	border-bottom: 1px solid #7d2100;
	border-left: 1px solid #7d2100;
	border-right: 1px solid #7d2100;
    background: #3d0000;
    background: -webkit-gradient(linear, left top, left bottom, from(#f2392c), to(#3d0000));
    background: -moz-linear-gradient(top, #f2392c, #3d0000);
    padding: 2px 10px;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
    -webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;
    -moz-box-shadow: rgba(0,0,0,1) 0 1px 0;
    box-shadow: rgba(0,0,0,1) 0 1px 0;
    text-shadow: rgba(0,0,0,.4) 0 1px 0;
    color: white;
    font-size: 12px;
    font-family: serif;
    text-decoration: none;
    vertical-align: middle;
    }
	.buttonOn:hover {
    border-top-color: #28597a;
    border-bottom-color: #28597a;
    border-left-color: #28597a;
    border-right-color: #28597a;
    color: #ccc;
    }

    .buttonOff {
    border-top: 1px solid #1f3b05;
    border-left: 1px solid #1f3b05;
    border-right: 1px solid #1f3b05;
    border-bottom: 1px solid #1f3b05;
    background: #172401;
    background: -webkit-gradient(linear, left top, left bottom, from(#159c00), to(#172401));
    background: -moz-linear-gradient(top, #159c00, #172401);
    padding: 2px 10px;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
    -webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;
    -moz-box-shadow: rgba(0,0,0,1) 0 1px 0;
    box-shadow: rgba(0,0,0,1) 0 1px 0;
    text-shadow: rgba(0,0,0,.4) 0 1px 0;
    color: white;
    font-size: 12px;
    font-family: serif;
    text-decoration: none;
    vertical-align: middle;
    }
    .buttonOff:hover {
    border-top-color: #28597a;
    border-bottom-color: #28597a;
    border-left-color: #28597a;
    border-right-color: #28597a;
    color: #ccc;
    }

    .buttonTool {
       border-top: 1px solid #155413;
       background: #9bd665;
       background: -webkit-gradient(linear, left top, left bottom, from(#48911d), to(#9bd665));
       background: -moz-linear-gradient(top, #48911d, #9bd665);
       padding: 2px 10px;
       -webkit-border-radius: 3px;
       -moz-border-radius: 3px;
       border-radius: 1px;
       -webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;
       -moz-box-shadow: rgba(0,0,0,1) 0 1px 0;
       box-shadow: rgba(0,0,0,1) 0 1px 0;
       text-shadow: rgba(0,0,0,.4) 0 1px 0;
       color: #152625;
       font-size: 12px;
       font-family: serif;
       text-decoration: none;
       vertical-align: middle;
       }
    .buttonTool:hover {
       border-top-color: #1b4f13;
       background: #1b4f13;
       color: #ccc;
       }
    .buttonTool:active {
       border-top-color: #8be339;
       background: #8be339;
       }

	//global styles
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {
    background: none repeat scroll 0 0 transparent;
    border: 0 none;
    font-size: 100%;
    margin: 0;
    outline: 0 none;
    padding: 0;
    vertical-align: baseline;}
	
    
 .buttonQuest {
   border-top: 1px solid #de7668;
   background: #c4bb0e;
   background: -webkit-gradient(linear, left top, left bottom, from(#9c883e), to(#c4bb0e));
   background: -webkit-linear-gradient(top, #9c883e, #c4bb0e);
   background: -moz-linear-gradient(top, #9c883e, #c4bb0e);
   background: -ms-linear-gradient(top, #9c883e, #c4bb0e);
   background: -o-linear-gradient(top, #9c883e, #c4bb0e);
   padding: 3.5px 7px;
   -webkit-border-radius: 4px;
   -moz-border-radius: 4px;
   border-radius: 4px;
   -webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;
   -moz-box-shadow: rgba(0,0,0,1) 0 1px 0;
   box-shadow: rgba(0,0,0,1) 0 1px 0;
   text-shadow: rgba(0,0,0,.4) 0 1px 0;
   color: white;
   font-size: 13px;
   font-family: Georgia, Serif;
   text-decoration: none;
   vertical-align: middle;
   }
.buttonQuest:hover {
   border-top-color: #2e7828;
   background: #2e7828;
   color: #ccc;
   }
.buttonQuest:active {
   border-top-color: #1b435e;
   background: #1b435e;
   }  
    
    
    mapinfo {
    font-size: important 12px;
    }
	
    
table#mainoptiontable
{
    border-collapse:collapse;
}    
    
	</style> 	
//// end of script
]]></>;



/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};

////////// new body added to window

var map_newbody = ""+<><![CDATA[
<html><head><title>margo+ (2.2)</title>
</head>
<body>
<table style="margin-top:20px;">
<tr>
<td id="sidepanel1" >
</td>
</tr>
</table>
<div id='screen'>
</div>
</body></html>
]]></>;

////////// native window functions
{
var map_script = ""+<><![CDATA[
// main game properties
var _hero 	= null;
var _npc 	= null;
var _other  = null;
var _g 		= null;
var _map 	= null;
var _col	= null;
var _img	= null;
var _opcje 	= null;
var _eq		= null;
var _chat   = null;
var _follow = null;
function followPlayer(id)
{
    _follow = id;
}

function setOpcje(obj) { _opcje = obj; }
function setChatWindow(wnd) { window.opener.margoPlusChatWindow = wnd; }
function getChatWindow() { if (typeof (window.opener.margoPlusChatWindow) != "undefined") return window.opener.margoPlusChatWindow; else return null; }
function linkGameProperties()
{
	
    if (!window.opener) return;
	if (window.opener.margoPlusWindow === undefined) window.opener.margoPlusWindow = window;
	//if (window.opener.margoPlusChatWindow === undefined) window.opener.margoPlusChatWindow = null;
    
    
    var vready = typeof(window.opener.hero) != "undefined";
	if (vready) vready = (window.opener.g.gamestarted);
	if (vready) vready = typeof(window.opener.hero.nick) != "undefined";
	if (vready) vready = typeof(window.opener.hero.img) != "undefined";
	if (vready) vready = typeof(window.opener.g) != "undefined";
	if (vready) vready = typeof(window.opener.img) != "undefined";
	if (vready) vready = (window.opener.img.complete);
	if (vready) vready = typeof(window.opener.map) != "undefined";
	if (vready) vready = typeof(window.opener.map.col) != "undefined";
	if (vready) vready = typeof(window.opener.g.npc) != "undefined";
	if (vready) vready = (window.opener.map.id == 1893 || window.opener.map.col.length>0);
	if (!vready) return;
	_hero 	= window.opener.hero;
	_g 		= window.opener.g;
	_map 	= window.opener.map;
	_col	= window.opener.map.col;
	_img 	= window.opener.img;
	_eq		= window.opener.eq;
    _npc    = _g.npc;
    _other  = _g.other;
	window.opener.margoPlusInit = true;
}

function runGameThread()
{
	window.opener.gameThread()
}



function isOpenerInit()
{
	var toclose=false;
	try { var href = window.opener.location.href; }
	catch(e) { toclose=true; }
	
	if (toclose || !window.opener) 
	{
        //alert("Close!2");
        window.close();
		return false;

    }
    else
    {
        
    }
	return (window.opener.margoPlusInit !== undefined);
}

function setLoots(a,b) { window.opener.setLoots(a,b) };
function sendLoots(a,b) { window.opener.sendLoots(a,b) };
function __g(a) { window.opener._g(a); };
function shop_close() { window.opener.shop_close(); };
function chatSendMsg(str) { window.opener.chatSendMsg(str); };
//// end of script
]]></>;
////////////////////////////////////
}



//zmienne
var timerMainId = 0; 
var saveWindowPosition = 0;
var winPosX = -1;
var winPosY = -1;
var openerPosX = -1;
var openerPosY = -1;
var openerWidth = -1;
var openerHeight = -1;
var tooltipOn = false;

var mapRequiresInit = true;
var bkgrnd 			= 'data:image/gif;base64,R0lGODlhUABQAPcAAP///0dQR0RLREJMQkJKQkFLQUBLQEBKQEBIQD9IPz9HPz5KPj5JPj5IPj1KPT1JPT1IPT1HPT1GPTxJPDxIPDxHPDxGPDxFPDtIOztHOztGOztFOztEOzpIOjpHOjpGOjpFOjpEOjlHOTlGOTlFOTlEOTlDOTlCOThGODhFODhEODhDODhCODdFNzdENzdDNzdCNzdBNzZFNjZENjZDNjZCNjZBNjZANjVENTVDNTVCNTVBNTVANTRENDRDNDRCNDRBNDRANDQ/NDNDMzNCMzNBMzNAMzM/MzM+MzJCMjJBMjJAMjI/MjI+MjFCMTFBMTFAMTE/MTE+MTE9MTBBMDBAMDA/MDA+MDA9MDA8MC9ALy8/Ly8+Ly89Ly88Ly4/Li4+Li49Li48Li47Li46Li0+LS09LS08LS07LS06LSw+LCw9LCw8LCw7LCw6LCs9Kys8Kys7Kys6Kys5Kys4Kyo8Kio7Kio6Kio5Kio4Kik8KSk7KSk6KSk5KSk4KSk3KSg6KCg5KCg4KCg3KCg2KCc6Jyc5Jyc4Jyc3Jyc2JyY6JiY5JiY4JiY3JiY2JiY1JiU5JSU4JSU3JSU2JSU1JSU0JSQ4JCQ3JCQ2JCQ1JCQ0JCQzJCM3IyM2IyM1IyM0IyMzIyI2IiI1IiI0IiIzIiIyIiE2ISE1ISE0ISEzISEyISExISA1ICA0ICAzICAyICAxICAwIB81Hx80Hx8zHx8yHx8xHx8wHx8vHx40Hh4zHh4yHh4xHh4wHh4vHh0zHR0yHR0xHR0wHR0vHR0uHRwyHBwxHBwwHBwvHBwuHBsxGxswGxsvGxsuGxstGxoxGhowGhovGhouGhotGhosGhkwGRkvGRkuGRktGRksGRkrGRgvGBguGBgtGBgsGBgrGBcuFxctFxcsFxcrFxcqFxYtFhYsFhYrFhYqFhYpFhUsFRUrFRUqFRUpFRQrFBQqFBQpFBQoFBMqExMpExMoExMnExIpEhIoEhInEhEoEREnERAnEBAmEA4lDgAAAAAAACwAAAAAUABQAEAI/gAFdVLVjBcfT5m4SWN27ZSnO53iXBHWB9knT8J49boySk6qYNccjXOEiRKtWqCwmcHUrI8mUshqLbPlCpkfHXYyvXo1StqoV6hUgaG1JFOjUbuY1ZLUKpAnTcEYpurViUkmT5Q06uB1phe2LaEm9SHVbBSpRKReKUGTShoqT9jGNWv2ChszYVzO8YrmiBGyY5I8RekTp1EqK8GCCUPWTdW4W1h4sXzlitfCSY6QpbJ1B/OrPtemZUuFbbMdWH1UuYg2bdcndp9MCPu0i9WrY7omYRS2JVofaML8eAuDiBm7Q8F6mYujTNg1aOJSpRLW5VUYaYccIeJS69OdM2wO/gkLdi7VIVvIxk8bxcyRlTjdsNVKlWNJLTDceiFjMUYcCl3z7QJGJ7zcMcwotrxiixuvmJGDN9HcYcYLgmSyhSOgiAKNNHVtpkwVZqgiCDLI1FELIn1kIkccwcAyCh7NkNINL1x0c8coqhzTyyCIcCUNNp+0Mg82XehiCBquZDKMId4skwomrlwDDC/GtGKLJ7vMxowgjLwiDBvRdPNJDo744cg3gdDzSTPINDPPK6RQgkw0ttTSTC9nHDOJNMjQIklPjXhyzVGG+DSKGciI4kEwa6xjyAjYdLNMDoLcsQw20nDiyjewkOJMG7ac0ggcwWDDDTNPiEKDNIKw044g/sMcAwc22ARSkCadBFPLNMCIMUkvBU1jGC9xOMIMG4x44slOw/RISSZc+NAGLK/U4kk3VURxjjTS0BINLZ94s0Qb06CDDQlV9OKIbmFI58MVyITBTDA7CXOOJ02cYwcmyJACiye3HINOG3h40m0wfXjCjBxFYGJYI5lk4sog2IBiCxS1RMJLM4egkko40iBySCqzKLGDJ7xktYUOrjBzTkjSBAMGMJwxw4wrJt1xjBnLjNIIL0OM4o03WIqCShziINMGJdEwYwsYIQ3TjC2oMMPNOePVpckkg6hSyzrXnNNlHdGAcYsqthiTSC2TBMMGMMJMMw4ptiA1ciCuCLNU/tLTICOII2SBkkozdxgSBiionMNOKp9AYYw0mTxBIhofQDMJMyRaAQszw2gSzSe1QClJLbZgkookr/RyiCaZ3IIMH7X0EQ2XqXjS9BWdiGdLKq4IkgojSMXxR2YcnhHMHESb7g0ptZxRyx2HhJERerbo+EozoDhCCWXH+H6HHLAk8woiqSRDiiuYTGKIK8ckIkgtgyziyCdyBGNKM90E+omItKTiSC21wAMpxJCHPuhPFHfoRTa2FYhkfMIR16jFKBwxHjtI4hIemwacWFKnTHziFZToBSpgMQ1BCKIRjlDFJ0RhC8V8ghm8EMYx2ICNU6hCGusIhzE68QQ3NKII/rboxSTY8EJRHMMbeGAPKfIgjGagAhHHSIYyRCEMPADDDp5gQzPkdYtwAAEVeQvDJLoQh3NEQwdZScQ3oiEFVThCGnLARFqy0QVEjOIMbegDI4YBrF10xRqsagMzijCHVJhhFJNYAsBqIY8KTOIKKXDFHYKRjGWYgg2ooIWVSAGIXYgjDBI6xkJ0kAk3pIIho7hCMbwhDBqgIRipaN4gkJGJOLzCNapgBiKQsQZNsIEUpfDGMBphC/Ck4hUgSIU4MgGLZuzCFVXIACO8MYpT4AkZpEIGGqCADTjQyBvMoEEwYjWJaBjDDA+QBjxc8Qo3CMMOZmDGKXpDCT4cIxTT/plENmxhDU3gwQ+jqIUwpCGJT0iyF9LImycCgQxbTOITpVsGM5SgF1YwoxE/cMQdPoEJTKzBD/JAxygS0QpjiGMSqJChSISBDWTMIBNh6AY3RHGOUexhGt0YQSrgULpa8IIU4iBFKxoRjSCQQm/CgMUneiEMR3ABG9kAhWuY4YZMLEETOuADG3hwhxyMgh3s8AEYlLE8VYgCGQoTxzGiQApV9AJHwYjEJJZBzI8cRkdmCMd0OMoLVeziELDwxjWikbpupIYb7HsBMnzCDI4NNKXWooUY9oAHZrThDIHIxDxaUQtxzOMcPu0FL1xSizC4Igdc6AMqzJQJUoChEKzK/kQzHpEKNniiGcEwHgR5cYxXSOMcyfCELQ6xC29R5xWnYAbKoIFIRAwXQaiAkAcjAQdvSGMcg4DHOM5xBzuIoxZELZgrgkELVAQMGapIxXewQYsitAIWwhjFMpIhNV3Mgg3IkEQwoFBVZwBBEM+axAOwEQVUHIEXgtgFMnjB0YJEURiqmEUt+oUJD07YE39JzzBqAQxUHKgWcsDGMq7QBstYSQ5CZJ8mUjGMP7VhCV34kyjEYAdWCMML7IivMERhUF7Qpw+HaMY0jtHZVCACIehFRSOo44k4pGIUnlDFxu5wCUE8kSxGppgrmuEKPkjhE8gAHC2kcY3zMOIYnpAE/in6UNr3wcIZnmjbIezw5COYLqB+SMU0pqGJO4xhCpuRxhni3IhXSHYXvLCZnj4RMj5EiBa2MEMQbXGOYwQiDLyYxB02+olMBKIR3ciEIEaBikmWohd3aIYjxJCJNjATFpoAA/MaEeZauEIOfpADJnsRBlvwwaHICMQhPhEMRjijEZIABizAS4pDvOLJggjEbLLxiQ9Koxm1GAcyNOgIRwRiEjShBBierApP0FoQZiAFKc4gimmAgnTSoBop1iSNOAhiGjW0XSqQkY09BIINo6CE+MRxDUOEohd2VEXCYvcJwCRDuaM4hOy80Qhtm5sLvWjHK3QhCFs0Yxx4UMEP/mohMVQcA3dz8AMquqAKVQRjHMk4hirakYooIEOOiAhDJvoVDWQ82w88EMQV7iBHhRshFXgA4SC8US1J3IidoxBEMXRRp1ZITClAPYcqJgEEYAwjBFpHhzDWsD040GIZgmDDO2hAi12EoBvsGMULEfrxUbiiy30QhhLWUYsfueItokhFJu5gDGMw4xEr8sM07uByvWFiGc0IhC14MYhuYKISr5BDrtogjEB0AxWvuEMIP8GH6O6ARcLQhR8y4YJuGGMWqWjDK+awS81kAxGfmEYwGhEKLnRCEsfABlD2sgxhzMATvUgGH7hQl3mQghlhuDcpoMfb0rniE1tohI7i/qAKbzRDFMHoRivYdERHcNMRrsADJmahg0tIoBbMGMEW8NCy7Vb7FcPohiMkToRGsAET2BAMmcALwIAHk6AMiPAKvGAEwBAJ2wEssIAK0bAXx5AkOxEIo0ALENQJ1eYIweAMlGALwsAHrjAOZ2As3nAJ2IAJUYAN/GQFqCAPmVUMy6ADYRAIKsA4cHAFkeBMaDMJ54AMpyAJbQBEn8ALtvNJjXAJzNBalCEInzAiHpgJ2SEMh8ALpIYHy1BtrgANxzANncAFh3APOLUL74AOxsAIL8AOOoFsSsA82SZogHAMmQAFoxAI8yAOoSAMRcAHp7QLvbBN0ZAKEDANfdAN/odwBz4QBfNACx70CcMQBtiQaX0VDNd3B22ACpU1DluACJPACe9ECnKgC6NAA8IgDI0FJqFwhJdwDZ6wBIaHB8IQDXozDevgDbCgCnZ4B6/QDYfCBn3QIoggCJPgDVzADHCQKEVwDlCACquzGMcwCrwgCdDQB1kAS6IgCYcAVMFwCFeQCr4gCalwBqswCU3wCtwgDMbgDVVgDUDBBXFwDPkgCpADUcjADO/Ah3IwCsdACuagVsfQCd2ACLVQBMU3DFYAB7tAIGjQMzRwDLswCs3UDe1wBfoBS8EAA7twB3YCDldgcxHTC5ogDLuABkojBs4mAXwgDkfAWabietFg/g1YIgjiMA5M4B7SwAhW0AdQ4AqIgAa7MAm7AAxrsAyiAApQQBbjkAl40AfccgzSgYaHYA0XZQLc0QZAVQvGAEt9gAn554nMkArECAWn4JTFwgvrIAw/wGu1gAaiMCWGsAzex2DBkAiMQAtvgApLoD6TEAdc0AZgIICJAhee8HK14AjhMAmj4AOZAEC/UBTC4AveEV3LIgiewAdyoAM2IwjX4Aq7gAjYcAWUIA6NEAcdxgcu9QqY4AkwMA0N4ArNdgiZoAmqUAR/kgODIA3dMD5tYAiItguSEIBGUATSMBuDQBtN4yXSMAvKggepsAuzcA5nsAul0FJ+AAuTgBmU/lBobLE/RtAFtYMHjoAKOYYKfWAM3MAHgXEIeNA/UIAI2QALu1AHk0AJKYABfcAO6mkLdsALUdAMC4EM3uBJn3ANPNEIn3AG6xAHZlB/V+B89zAMlPAJfbALzXAMvJAJdvAK4gCIZpAdXKAYrmBL2TAK2NALOyAMiNAN2eAJjjANqtMHo9ANseQJKcALVQAGjkALJCIHPnAGwtANwHgO4SAIvOAK0nAdsBAFgfADqcAL4nAO82AOrkAufXBIpACA3rBC4CYMjNAIgqAKbGAIk1ALr9AKuMgMR4QHw+AJx+kKhkAZu9AHgxAMIkgWVqAL6NdlRqF5w2AGl4AFSuAN/o/QBp7gCz0xZ4FwDnHADHHwBKOgCcMwCXJACuOgbd5wC4wTKJOQiHuBB3HgoqMQI6DACxLkC8KwO8vgY6NwB8hgQN5AQbSADdcAB9NwCezwCk5Gko2gCYOQCPHVB4LQDYGQAofABq/QBj6QA5cQjUVwBncQBW1wCL1gDa3QDcIAMZvRW7ygC8PwCodACcIwDO0ROjNCm7VQXt4wDZsxCWcwMsXSDMogCdaQCl6AaYhwZIPwCoZwBn3QBQZUF0fTB3fgFxbhDdjgB0YwrmiQm8TBBcykE9UWS8XBC41ACZjwbJkwB19SC3EgB57gCn1QCoOAMqNwDW0QcZiAOvYk/ge24Ahw4AqqgAjSwAsLFiPCkApyAEOB4CXfEAfIgAqYQA22gA5++ApYsCyAI4qYwQaK6SXgige1kF4I1mmjgCCTYB6N4Aek4Aiss2CIkBGSgAjjAAq0cLXT4A2UgAqv0wzO5QZn0GlmgAfXIA13kAlSMHi84A194AZ51wg3KZ4YCjy84FyfMAhXIVBsZm4UgQlnEFAeeAiBoB+TcIpPlgpd8AksNg+fgA3Ksgua4AqH4AmwYDQQQVzBgAmkc0uv4AmqewWOgBGi0As8oFFQYASdgA1C2wrtgjivgKCYkLOiOwnHoCd+gAiYIAqjkAmT4AoUJA1GFgzN0CVuYELT/sgIhoCd3TAIt8ALdRkIwWgGkiC1toCgNSsMq3AH5pNeKaEbRmALvnAX07BLYIBWxeuLgoAcnzAKmLBMqfAzzSAMOpFprjAMfjAe/qNBu6AK4DoKVrAEjuC2eABKFiEHKdNamFBq0XANoyYNieAKZToeu/CkooUyvGAL+7shZ7A4d4AN8HA9XBC6h5AIn+CugiAJqDAKkqA3tTBOvPAKooYIveANG1ucW7sqn4A67tEWqeCUjDAHlLCltjAO5BCBh4AJDiQOeEA/xtA/PRFntTAMSxAlNGAG8SUN/NLEQOxjvfU/iNBatYAKk+dBmFAok0AO4yAFrsEEYRAOW2AL/oEABp7gPFAwCfh0C7XwDWgmDLjDCJrmDKAgd9EgBqDACKSwpVYgDd+AaVx2DI3QDPsmvZSQQnhAE/OmukB1CXckDpQ2CcWRS7fUBxdKs/DQCLvgDWKwMB7xbLbQDbryCXEABte2w9ewDp8QCOnoCuqyCkBCD6RwCQnFDTFENI6AA81zBp1ACleQCBJqC4xwDs5LONggCH3QCxrUDcmADSz1ROfQCNjABsASB60VDGlRER9wC5kgDdFwCSfSCTkwZp0ADdnAB4fgDebADRy5jclVdbxQBNiAA41AC11gB1bwMt2ADMBwDGE5CqtoJ5nQDsgwCahJe6AXvJLgB65w/gZ84A1yYAx8MA5LkIiOEBh3EAe1sAXiEKXP+bvgBQ1W4A21AAfwJQgxIwEjwH054AqtIA3aZwW8wA224A2tYAmoMA3LEEJxQwpRELvsugauUAudgFDD0Al4IApkSqs0AAHYkLWiQASREATKwAyo4AwEIQ308A6Y4ALnEAXghgkjc22jAA9cgAfi8K6csAdGkMNwUAu7YAyf0HN3gHwcggmIQAG9sL8+h4QusAyokAmosAyYgAZiOAhe+TdRIAjYgAi7IA1K4A7HoI5TfMWBMAgCnArckAHX6rTBkKCuMA1isAOMlg14IAhyEA3iwFTMyQ5d0AmCkKWzIA6pKw2I/pYJZ8AM0TAMFssGZrIM3SAKxtAIzGAFvRAIf3ISgoBQd7C3tlAKcgBFO3EITbEMu4ANS/ADxkADtXANOUCjoGR5h4AOL1BTMKBW0mAMcJANgQAKRYBh8uElruADniALiPDV9WkLqhAHQHq4ZiEd4dcJ1iIKgwALO3UOy/DcqXAJsVcM8OCumnAKdpABFDAJi6AuLPEBiDAPcYAJvHUNzEAKkoCMEckL4xANzSMJgqAMceCky7AMupAdcyAITgZDmZAKZ0EKllloGUuAiAAFr8AMy0Bm3ECTjBAMxj0XqYAGZ2AJeHQMGGMCksAOOqADX+ACWXoOsKAYofMKXUAC/g6hCsOwC9FwDueACdAwDmzWCWGQFpfgBtgAas3gB5RQBo7QE9mMDIjAPOxANzpuC4lAw7vAGVXwCo6QA9LAX6IgDnpzDaTQCy6wBqMADAzRLR+XDG5ztpdyCKIAC2ZwBZf2CuMABnzQCcqMCj+QAXeRClAwBwiROh/kCbVgBiklDbewPUsgCbYgDrxgB8Fwbc/cCW3ACFQ6Dj/gB80gB+eQe/2zcVEgDBqgC8GgC/RKCT/gDeyADOocB8NxDLPgAw91zDqQClzABZhwDJbQBi8QRMTLOK6QDEHUBrXzIsggB+zESs1wDUFLCVYgB9heB4tQt/ckDbUAD6owCimg/olDdwaSswwvU8hcgAytMAtmAAeeAAfxBn6h0A210AaicKndQANPgO1MFwbHEA5A4giZwLWg3bqOUApSwAbk5Qq2kA3Bt1Sf8A1vcAwfNA70wAf5cwjwEAzwcA7MAAZ+DQhjxtnr8QG8gA3tIAyVEbzMaxETIMdCEDdL0Qm2YAuAAH/O5Qhn4K1P6gdFsK+BsAuN4Da7QAOuAA+rDguHgA2tZQuiUAUjigkWEAptMAPM8BnH4AeTcA0rBq6vIAmOYAyo0AYu+Kwt0AtcMKeOgA19ww1wkBZbkKfRoBPXMFeU4AtpyxjlwCGo+BBxkgrLUMpKcAWvUG0ECQ/HYAzg/uANwMANnz6rwgAP7PBK4XJz1zAOiGYGKKMvYACVVuAJ3q8KhyAHZyCyd/B3VpUWgHwFpGAGhGMIghAMV1snv9YI00AKbcAFkwAQgs50chVnUipSvIjgODcKXyYuTzAd+0RKHCVuxmy9ojTplStKyHohAoMqEDNvtU55WpOKka1PiQC5ElSLl607tSYhGhXtE7uEjvq06RNoiisdSip0U1XrnJ9htaL0QhbNlqBe3o7JYaQv2iFSk1CBQYYtmRhptWp5YzTOmzR4S6CdacUsGJhAXJCdWoNN2DBbfGzVYpRtGrs98OKMSvYp2ClahNksq4XG0ylhqQK5EpapFy9v/qpS8Rp1hdSodd6a/QhTzlarYNKmYeJz5hWvYJ1sqWpkzNGua9CGyXEDxJuobq66SftBK9C8aWY0LRN25w6UUbtfpTLTK1ozZHGGYYIiilezOLvk8Ok8iRQiZJMENXJ0ztYZXlaG8RHHC1gfIGopBRk+vLlkmUkyueKOTyZhxodmSJkmDltQaQUaY86pBZhGsuHllWFI+eGVRPrA5BJXtDjEnEyMAeaQRsAQCJNg4jgjlWHOgcWWXmrIhA9EPsHkplB46aSRezQxx5xr6OkFjlQOwSOVFOJAxIxgMEGlES4wOcOYYDJJoo1jdDlEFFKWCWYaRHZJQRpheBlnFEc+/rntk2WO6aWWY1IRhitSuJjkzFRc6eUY+fxYrBYudojCG2EgWISXGYqZZBR5AoGDlFSkSUYZZCjpYxZJJtnCFg8mGfEaVK5hFJ5luOiGlzawGaUXmEhJRBhxounDk2HsdOWQWkJBxhBm8OAFGShqGUUQId1wRJNaluHljmNcCcaKZRo5IxBDlOGsj2lWICElJa4ZBRZAApnGk05+6OSYWkipxQww2PgElkk+YWqYQZo5Iw5ajgkElGNsxUMMYYR6pZlMmDHjPGZOGaUZwDzho5ZW3Ej4I16GcWSaD7ppJxxesk1LEBOuxaYRTtQ4hJkRagmmBVpOKROKTrD5hI1r/oyJJpWOUunEkUyseQeYa6QJQ5Vp8OBCGjZ2OYOZa8QRpJlRPkklFDZIUUUaV2xJ5Q5PeFnCG3RsyaGVHE5Z57RgHHllmWwyIaUVXqThoo9OiMhEknGaEZSdUDxxhQhKbLGFC1X6YEeYV3zCBhVp+EVGHFICqUWaNu5IZZRrJHFEz1FcucYTSYIZDZtaMukjNFpeQWYMceaxI5VgRBEmmXtqsYKZVCax4hJmmunFlU/KQEUHT7b9hJEcoMjmjEmo8WYXWzDpZBdBgqHEGE/aCGUUolEJJhhmHBEnk0+iN1CTzPzYxYw+clbFlS2qAAaRRASBBNywgjHWEQU/BAMW/gPCBijOcYz3bMQRjcCEEsywhy5kwg+U6AUlhnEMEayjFnsyhyr2IA5TACEDipMEE7wRDCBlAhbz8UUfUnGNYwRDK6NrxCcoMQhhMMYOhhiNJ1TxDluEoV9y+AQStgGMT3wlBcwowiv8sIgtHOMa5MJGL7wgjhTMAQ+faAZ4OBEMSRzCQqQwQyrCcIYpCcMY0oiG7CQBDDm8ghaeYFUgSNGHO9BCGMxwBTaY4Yk+iIEZr1BNKkAxiDsw4hC2QCAadCCOYyDDCq+wBjbWZ4VrTEMamViXM4CBDEQI5ROCEAMfGCEJaMSBG3y4xCjYIAxJ4GGQh+AFfIZRk2PAoRGt/hDGGQ6RCTwc4hxcg8wrbJEJR4xiHH1gwyRscQg59KEWhnjcLlBBimNIQxOfcMY0RtiLSQRCE31QxTFEcYUxvCIKnjtHIHpxCz7UKgpRoAG0RoGIOzRCDMDIhCdGR4lU5I8XsNCEI75hulqkAhPCmIQ0ROGGT/DCDbbAxhmOsQtPICMVI7QZMnIQhUwgwxbIuAYweiWN+KniDH9kBDYGgYpRdEISfcgENmbxiUaUihlg8MQKdtGHZgRiD6T4BDLAgwxmeOYVvTDDJ2rRDFUIwxYhG50wPjGNadgiM+NIhSYaQYlLvOQKnmAHrXzChyvwIRPSmEQfwuANPHAOGctA/oQrAtGKVJRjGZlQRRFGkYlgIGIYk7iDK5Bh0EA0AhVibUTq2jAoXhwiFXhIRhtQKQx7kUIScSBFMDzpikwUChTSYMdWeeE1bBwDFNhAhk2kQQleZMIMh/BVLVAhCVq4Ag/AFUQhU4cHV1hjFP3qxR1gEQhsdIIUjgjDHTIRiFRk9BWaYAYppJHKzGLCFcxARSokgYlXSAkZ0jhEG3gxizjwopeHkAYtsLELXDrLW4fQ4TQ6wYtoSKIRdqCRMa5QB1fA5hiDGEYYrnAI3NriG3GoRXiEIQw8sMcMmEjbSAWBiEbwwhWv8EszHHGIxnxiENmYxBWuEEQ2uGIUjdBi8CAwEQfPjMIKnaiFKK5x4SC6Yhd2CcYxYIEKCjFiFK/Ag2dqgds+oOETDfqEJDwhCp7yAaepSAUqQNoFZjACE30YhSee+TNSQpMShpIGH/gmDFe4YhLDmJkoDMULVKzSG7a4Ql9HEbsIDXIUzDgkNDBhCF3wgnJevcMVkKHNQIDUD7VwRSNGepvdjKJhyGCEKiSBmyE5YhV22U0n+sAHQTBjEp0QxEKRcQxVrNdrfFAFKbDQiFdkQg5Ew4SfRoGMRogCEXaQbC1uEQ084MGglECFJ5JBCkG8AhW98IQ4bREHTASCFrbwhCYyYQVECCIgAAA7';
var settingsIcon 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAN+SURBVEiJ7ZXLb9RVFMfP+b3nWeY3VPqwwARpbVw2sdZFBceMYOIfYHe6MNENaWr60MVEUmw6TFOrK/eGRmNcuAFDoApJbTFgfTGgUGHoI1Rmpp3X7/e7v/u7xxXGhpk+THDld33u+dzv99yTi0QEj1PSY+3+XwCU3R5IpUY7NN035QmvFxEXhfC+rJSck8lkkteqx93MYHziVK8iaV93d3drzU3NUqlchhuZjL20lL3FXXh1eHj4zr9yMJ7+oM/QtLGgP9Ry9OiLSjjUAIw5sLh4m2Xv3QWUpPuoeM8CwCOAbR2cnhh/1zQj77/Qe0Tx+wPAuQuO48Cly5fs9fXCZ+Wi9WYymWT1zm8FwMmp9CeNjfveiMfjMnNsqFQrYOg+mPnmIsvl8icH3xk+tZ37uq9o7PTY8b17n3g9kUjIjm1DtVoFxhi4LoPInghJ0s7irQuQkIKapoLgHlhWFRhzgLkMbNsGMxrVAbB9J4BHbpFOj8aEAMP2eefuZbNerpBXZFkChzFQVBVcj8PCte+FyP90btcOJidTA7ovmGnYE1kIuL7bnZ2dsq5pUCyWIBwKAwmC2cvfQhu/gv67X3w80YdPbwfYNOQPP5pYejlxrNXvD8Dq6jKY0SjMzFxwihvlalNLs/bgzzWSfz+jdHXuM6zKOmV+ubrBuNszcIZu7MgBkSgWCnninIFpmvDbzZuiWCpdqFbs/atLy30gKgco98ORa3MXK6osY3t7R4MmK99t5WQTgNni2NzcfGHt/hoJISAWi0kSSgkAqA4OjnzV35/Mn5imecFZ/OeFK2VFQjx0sC2sycpsPcgmwNDQUJa79vOzc7P5bDZLyysrBIB50zTVf9admKZ5j7svXb+eKcsopAMtkQZVkmtCai5aOj0aA1lNEUGUk3h7ZGCkZsZTr2E3yvL5p1rDIea6IrtmFSzmHRr6nDa2BDzU4cOv6MHgqs9VVUPjXGdoqBIyhUhFRJcEafx4a+aZtlDp04NN/mC+5FiFEn+vf9qbfNij5jYiotzV1RUMhYyAULWgIkRASFpAAeEnREOSPIUIuQLCPr/SkXuu8Y+3CPIpIhEtMf0OIspE5NUF7FZzD/b/+uP6k3HFxYoFsAFw9e9YtowIEeWenh7Nsiyd67quc65zWTZICCREV1IUR2HMKRuG44XD7NbZsy4RiU09/v/0t9NfuH+9JOPm1KcAAAAASUVORK5CYII=';
var searchIcon 		= 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAO2SURBVEiJtZVLSJxnFIbf7zb/zO/vzMRWk7ZSpYmRREEUF4UsJEFQB0pLQZpFEmqhUAIF3XUXXDU7JYuE0oU27UKw0NKLxCC1SRchtAgShxIsJYZpaEdjRufyX75bF61ZWKl/muZdfny8D+e8h3OItRbPUvSZugPgez225cbThqXGBGf9SusuAOCMLUulF6j2J1bnLmzHBZDdLWrNXTwlBJ8Z7OvM9nS0iOamDACgUNzCUn5NXruxUpJSnb4398F3TwxozV089XyD9/XoyICbzbh4WA4Bq+EIigRncJ0ENh5VMTk1X9vYrLwWB/I4g7bceFoIPjM6MuCCC/zyYAtBJEFgwQmQoBYMEbLpJEZHBlwh+ExbbjwdG2BYamywrzObTbtQMsLhg0k01nMIxsAoAWcUDqc4kAKaGjwM9nVmDUuNxQYIzvp7OlpENQiRreNglCCd5Mi4FNoAFgbaAMpYRDJCT0eLEJz1xwYorbuamzKgBLAWMAaw1sLhFNpahNIikAa1yMBYg+amDHYm7N/0jzEt+QoNLoexFtoAldAgkgYAhTIasAQWBKnEfta7KuCMLReKWwgiYL0cIVQGD6sKxa0IobLwIw0/NPClhrYWheIWOGPLsQFS6YWl/Jp8ubEO99YDrBR8rG2EqIQGvjSoRRY1aeBHBmk3iaX8mpRKL8QGUO1PXLuxUiqXa2h7MY1IaoTqr777kYEfavihhuc62CxVMX/zzjbV/kRswOrchW0p1enJqfmaA41X2xvR4DmwhMBYwE0KHH4hAxNJXJqaQyu7W+z28mQ/wBOvivmbd7Zb2d3iQaWOuZWsAshvtUrl7Ke3P/4hFgDYf9l1e3mS2Ti0/tZ7r4swiPDV9PXIr4Znrt6+PBsLEEfv9r2/Ojh88sjxnqPY+OMRPrv0eejX5NndkP98D4IgeGd+9nv//s8FJCnHm2eGnGRSfHKu9/zw/1IBAJzrPT/spNh07o2TbjZbj1KpjG+/XKyFUTC4k8lTXbSrP12eDX399jdfLFYf/Po7uAS6u465giU+2vmz50UjhLD2EydcoZTLQ5IyXDnGMIcSxa3lhBBljeWKUh1SzX98JTg6en3x1mR3Z3udwwUscOCx1+4W9fb2iiiV8mwYegnNPMO0ZzSpBzWetdQDJR6MrRBiKjC0QpktU80qh8RLxxvocx8y0DQsxqdvXbmyJ+DvCsiRoaEENjcd12dJxpBSNEwZSpPcWgJCIqV5yIQJhFJBENQHwHqUz+el3WX4VCHH0Z/bFfJK9uU5ZgAAAABJRU5ErkJggg==';

var friendClans = "|TemplarS|Dark Magic|Czeka Nas Chwała|Order of Elrath|Hypnose|Liberated|";
var enemyClans = "|NighTmarE|Friends Team|Królowie Swiata|Anime Shinden|Zakon Czarnych Jeźdźców|";
var enemyPlayers = "|czesio gra|blondi|Tiril`|Łossiek|Bestyjka|pirat bez gnata|FurianS|kali|Cratos|Zakne|Mylko|Bestyjka|xsisix|norbertos|Quantine|ixe|Gasiok Waleczny|Drey|Magbet|koci|-RadzioZks-|zly Mess|xPortox|ShadowPriest|wac pan brud|Zyprydziorek|";
var enemyPlayersE2 = "|czesio gra|FurianS|Quarrian|Cortezon|Filevandrell|";

// TYTANI i HEROSI
var TITAN_HEROS_TABLE = [
["Dziewicza Orlica",	"Tytan",	"51",	"Mag",		"/obrazki/npc/pot/titanharpy.gif"],
["Zabójczy królik",		"Tytan",	"70",	"Wojownik",	"/obrazki/npc/pot/killerrabbit.gif"],
["Renegat Baulus",		"Tytan",	"101",	"Łowca",	"/obrazki/npc/woj/titanbandit.gif"], 
["Piekielny Arcymag",	"Tytan",	"131",	"Mag",		"/obrazki/npc/pot/archdemon.gif"],
["Łowczyni Wspomnień",	"Tytan", 	"177",	"Łowca",	"/obrazki/npc/woj/titanhuntress.gif"],

["Mietek Żul",			"Heros",	"25",	"Pijaczyna","/obrazki/npc/mez/zulek.gif"],
["Mroczny Patryk",		"Heros",	"35",	"Typ spod ciemnej gwiazdy","/obrazki/npc/woj/bardzozlypatryk.gif"],
["Karmazynowy Mściciel","Heros",	"45",	"Mnich",	"/obrazki/npc/hum/gnom_msciciel.gif"],
["Złodziej",			"Heros",	"50",	"Fachowiec","/obrazki/npc/mez/tuz-zlodziej.gif"],
["Zły Przewodnik",		"Heros",	"63",	"Obieżyświat","/obrazki/npc/hum/mnich-zly.gif"],
["Piekielny kościej",	"Heros",	"74",	"Diabeł",	"/obrazki/npc/hum/bonelord.gif"],
["Opętany paladyn",		"Heros",	"85",	"Paladyn",	"/obrazki/npc/woj/opetanypaladyn.gif"],
["Kochanka Nocy",		"Heros",	"100",	"Lova,lova","/obrazki/npc/kob/zlamag.gif"],
["Perski książę",		"Heros",	"116",	"Książe",	"/obrazki/npc/hum/persianprince.gif"],
["Baca bez łowiec",		"Heros",	"123",	"Góral",	"/obrazki/npc/woj/goral10.gif"],
["Obłąkany łowca orków","Heros",	"144",	"Łowca",	"/obrazki/npc/woj/oblakanylowca.gif"],
["Czarująca Atalia",	"Heros",	"157",	"Wiedźma",	"/obrazki/npc/kob/tri-atalia.gif"],
["Demonis Pan Nicości",	"Heros",	"210",	"Diabeł",	"/obrazki/npc/hum/sekta_demon_cz_s.gif"],
["Tepeyollotl",			"Heros",	"260",	"Nowy",		"/obrazki/npc/pot/tepeyollotl.gif"]];

//stale
var mapNoEntryRegion   = 1;
var mapFreeRegion	   = 2;
var mapUndefinedRegion = 4;
var mapStaticItem	 = 8; // npc - attack4 - ognisko, itp.
var mapPlayer		 = 16; // gracze
var mapFightingNPC	 = 32; // npc - attack2 
var mapAttackingNPC	 = 64; // npc - attack3 
var mapNonKillNPC	 = 128; // npc - attack0 - questnpc
var mapStoryNPC		 = 256; // npc - attack5 znikajace npc - motyle z questa
var mapGateway		 = 512; // przejscia
var mapElite		 = 1024;	
var mapEliteII		 = 2048;	
var mapEliteIII		 = 4096;	
var mapHero			 = 8192;	
var mapItem			 = 16384;	


	
var searchGroup = 0;
var friendsList = "";
var enemyListKillSentence = "Dednij mnie, tak by nikt nie widział!!!";
var enemyList = "Ciaps";
var friendsListCalled = false;
var friendsListProcessed = false;

var NPC_STATIC_LIST = [];
var HERO_LIST = [];
var ENEMY_LIST = [];

var selectedPlayerName = "";
var selectedPlayerId = -1;

var heronotify = false;
var moveRetries = 0;
var wlkOvrlp = false;
// zmienne
var walkpathXY = [];
var walkLastIndex = -1;
var generatePath=false;
var newvernotified = false;
var e2notif = false;

var map_max_x = 100;
var map_max_y = 100;
var mapx = 0;
var mapy = 0;
var isWalking = false;
var Grid = new Array(map_max_x*map_max_y);
	
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,''); }




/////
function AStar(Grid, Start, Goal, Find, Width, Height) {

    function $Grid(x, y) {
        return Grid[x + Width * y] === 0
    };

    function Node(Parent, Point) {
        return {
            Parent: Parent,
            value: Point.x + (Point.y * cols),
            x: Point.x,
            y: Point.y,
            f: 0,
            g: 0
        }
    };

    function Path() {
        var $Start = Node(null, {
            x: Start[0],
            y: Start[1]
        }),
            $Goal = Node(null, {
                x: Goal[0],
                y: Goal[1]
            }),
            AStar = new Array(limit),
            Open = [$Start],
            Closed = [],
            result = [],
            $Successors, $Node, $Path, length, max, min, i, j;
        while (length = Open.length) {
            max = limit;
            min = -1;
            for (i = 0; i < length; i++) {
                if (Open[i].f < max) {
                    max = Open[i].f;
                    min = i
                }
            };
            $Node = Open.splice(min, 1)[0];
            if ($Node.value === $Goal.value) {
                $Path = Closed[Closed.push($Node) - 1];
                do {
                    result.push([$Path.x, $Path.y])
                } while ($Path = $Path.Parent);
                AStar = Closed = Open = [];
                result.reverse()
            } else {
                $Successors = Successors($Node.x, $Node.y);
                for (i = 0, j = $Successors.length; i < j; i++) {
                    $Path = Node($Node, $Successors[i]);
                    if (!AStar[$Path.value]) {
                        $Path.g = $Node.g + Distance($Successors[i], $Node);
                        $Path.f = $Path.g + Distance($Successors[i], $Goal);
                        Open.push($Path);
                        AStar[$Path.value] = true
                    }
                };
                Closed.push($Node)
            }
        };
        return result
    };

    function Successors(x, y) {
        var N = y - 1,
            S = y + 1,
            E = x + 1,
            W = x - 1,
            $N = N > -1 && $Grid(x, N),
            $S = S < rows && $Grid(x, S),
            $E = E < cols && $Grid(E, y),
            $W = W > -1 && $Grid(W, y),
            result = [];
        if ($N) result.push({
            x: x,
            y: N
        });
        if ($E) result.push({
            x: E,
            y: y
        });
        if ($S) result.push({
            x: x,
            y: S
        });
        if ($W) result.push({
            x: W,
            y: y
        });
        //Find($N, $S, $E, $W, N, S, E, W, result);
        return result
    };


    function Manhattan(Point, Goal) {
        return abs(Point.x - Goal.x) + abs(Point.y - Goal.y)
    };
    var abs = Math.abs,
        max = Math.max,
        pow = Math.pow,
        sqrt = Math.sqrt,
        cols = Width,
        rows = Height,
        limit = cols * rows,
        Distance = Manhattan;
    return Path()
};


///

function getWalkStepLeft()
{
	if (isWalking && walkLastIndex>=0)
	{
		return walkpathXY.length-walkLastIndex-1;
	}
	else
	{
		return -1;
	}
}
	
function checkpath(str)
{
	ret = [];
	for (var i in unsafeWindow._g.npc) 
	{
		if (unsafeWindow._g.npc[i].type==4) continue;
		var k = ";"+unsafeWindow._g.npc[i].x+","+unsafeWindow._g.npc[i].y+";";
		if (str.indexOf(k)>=0)
		{
			ret = [	unsafeWindow._g.npc[i].x,unsafeWindow._g.npc[i].y ];
			break;
		}
	}		
	return ret;
}
	

function doStopWalking(str)
{
	//trace(str);
	isWalking = false;
	walkpathXY = [];
	walkLastIndex = -1;
}
	

	function doWalk2()
	{
		//if (typeof (unsafeWindow._g) !== 'undefined' && unsafeWindow._g.left) unsafeWindow.reCenter(1);
		if (!isWalking) return;
		var step = 1;
		
		//if (mMargo.nuser==1) step=4;
		if (unsafeWindow._hero.ml.length>=4) return;
		if (!wlkOvrlp)
		{
			wlkOvrlp = true;
			var hero = unsafeWindow._hero;
			var map = unsafeWindow._map;
			var len = walkpathXY.length;
			if (hero.x==walkpathXY[len-1][0] && hero.y==walkpathXY[len-1][1])
			{
				doStopWalking("koniec marszu");
				len=0;
			}

			if (len>0 && !isInBattle())
			{
				var k = hero.dir;
				var kx = hero.x;
				var ky = hero.y;
				
				var index=-1;	
				
				for (var i=0;i<len-1;i++) { if (walkpathXY[i][0]==hero.x && walkpathXY[i][1]==hero.y) {index=i; break;}}
				
				if (walkLastIndex>0 && walkLastIndex>index)
				{
					trace("cofka z servera!")
					walkLastIndex=index;
					unsafeWindow._hero.ml=[];
					wlkOvrlp = false;
					return;
				}
				var str=";";
				var mov = [];
				for (var i=index+1;i<len&&i<index+1+step;i++)
				{
					str+=walkpathXY[i][0]+","+walkpathXY[i][1]+";";
					walkLastIndex = i;
				}
		
				var b=checkpath(str);
				var collision = false;
				
				if (b.length==2)
				{				
					if (b[0]!=walkpathXY[len-1][0] || b[1]!=walkpathXY[len-1][1])
					{
						mCanvas.ClickedCanvasX = walkpathXY[len-1][0];
						mCanvas.ClickedCanvasY = walkpathXY[len-1][1];
						doStopWalking("collision")
						generatePath=true;
						//updateUserInfo();
					}
					else
					{
						walkpathXY.pop();
						len--;
						walkLastIndex--;
					}
					collision = true;
				}
				//console.log("collision: "+collision);
				if (!collision)
				{
					var prevx,prevy;
					for (var i=index+1;i<len&&i<index+1+step;i++)
					{
						unsafeWindow._hero.ml[unsafeWindow._hero.ml.length] = walkpathXY[i][0]+","+walkpathXY[i][1];
						prevx=hero.x;
						prevy=hero.y;
						hero.x=walkpathXY[i][0];
						hero.y=walkpathXY[i][1];
						if (i+1==len)
						{
							doStopWalking("koniec marszu");
							break;
						}
					}
					if (prevx<hero.x) {hero.dir = 2;hero.ndir = 2;hero.cdir="2";}
					if (prevx>hero.x) {hero.dir = 1;hero.ndir = 1;hero.cdir="1";}
					if (prevy<hero.y) {hero.dir = 0;hero.ndir = 0;hero.cdir="0";}
					if (prevy>hero.y) {hero.dir = 3;hero.ndir = 3;hero.cdir="3";}
					//if (unsafeWindow.g.sync<10) unsafeWindow.g.sync+=3;
					//else 
					if (unsafeWindow._hero.ml.length>1) 
					{	
						//unsafeWindow._g.sync = 13;
						//unsafeWindow.runGameThread();
					}
				}				
			
			}
			else
			{
				doStopWalking("doWalk: Bitwa");
			}
			wlkOvrlp = false;	

			}
		else
		{
			trace("WalkTimer overlap!");
		}
		
	}
	
	function timeToSecs(s)
	{
		return parseInt(s.substring(0,1))*60*60 + parseInt(s.substring(3,4))*60 + parseInt(s.substring(6,7));
	}


	
	function chatHistory()
	{
		this.currentLength = 0;	
		this.windowopendelay = 0;
		this.chatPopup = function()
		{
            if (!Opcje.newChatDisplay) return;
			
            //create chat window
            
            // Plugin reload
            if (unsafeWindow._chat == null ) unsafeWindow._chat = unsafeWindow.getChatWindow();
            // Maingame reload
            if (window.opener.margoPlusChatWindow===undefined && unsafeWindow._chat!=null) unsafeWindow.setChatWindow(unsafeWindow._chat);
            
            if (unsafeWindow._chat!=null && !unsafeWindow._chat.document) unsafeWindow._chat=null;
            
            if (Opcje.newChatDisplay && !unsafeWindow._chat)
            {
                unsafeWindow._chat = window.open (document.location.href+"chat","mychatwindow",'resizable=1,width=400,height=600,scrollbars=1,location=0,status=0',true);	
                unsafeWindow.setChatWindow(unsafeWindow._chat);
            }            
            
            return unsafeWindow._chat;
		}
		
		this.chatUpdate = function()
		{
			if (!Opcje.newChatDisplay) return;
			if (typeof(unsafeWindow._g) == "undefined") return;
			var s = unsafeWindow._g.chat.txt[0];
			var n = s.length;
			if (n < this.currentLength) this.currentLength = 0;
			if (n > this.currentLength)
			{
				var zTime = GM_getValue("margoChatTime", "00:00:00");
				var zTimeSecs = timeToSecs(s);
				
				var k=s.substring(this.currentLength);
				k = k.replace(/<div[^>]class\s*=\s*['"]entertown['"]>(.*?)<\/div>/gi,"");
				k = k.replace(/<div[^>]class\s*=\s*['"]sys_info['"]>(.*?)<\/div>/gi,"");
				k = k.replace(/<div[^>]class\s*=\s*['"]emo['"]>(.*?)<\/div>/gi,"");
				k = k.replace(/<div[^>]class\s*=\s*['"]ban['"]>(.*?)<\/div>/gi,"");
				k = k.replace(/<div[^>]class\s*=\s*['"]sys_red['"]>(.*?)<\/div>/gi,"");
				k = k.replace(/<\/div><div/g,"</div>:::<div");
				var d = "";
				if (k.length) d = k.split(":::");
				
				
				
				var z='';
				for (var l = 0; l<d.length; l++)
				{
					var druk = true;
					var t = d[l].indexOf("tip");
					
					if (t>0)
					{
						z = d[l].substring(t+5,t+13);
						if (z.indexOf('"')>0) z='0'+z.substring(0,7);
						var zsecs = timeToSecs(z);
						if (Math.abs(zTimeSecs - zsecs)>60*30) zTime = z; 
						if (z.charAt(0)=='0' && zTime.charAt(0)=='2') zTime=z;
						else if (zTime>=z) druk = false; // <30 min
					}
					
					if (druk) 
					{
						var w=d[l].indexOf(">");
						d[l] = d[l].substring(0,w+1)+"<span class='czas'>["+z+"]</span>&nbsp;"+d[l].substring(w+1);
						this.chatSend(d[l]);
					}
				}
				if (z!='') GM_setValue("margoChatTime", z);					
				this.currentLength = n;
			}
		}
		this.chatSend = function(str)
		{
			if (!Opcje.newChatDisplay) return;
             
            unsafeWindow._chat = this.chatPopup(); 
			if (unsafeWindow._chat == null || unsafeWindow._chat.document==null) return;
			var el = unsafeWindow._chat.document.getElementById("popup_chat");
			if (el)
			{
				
				if (str.indexOf(unsafeWindow._hero.nick)>=0 && !(str.indexOf("«"+unsafeWindow._hero.nick)>=0)) {
					$('body',window.opener.document).css({'background-color':"#77FF77"});
				}
				var s=el.innerHTML+str;
				var newEl = el.cloneNode(false);
				newEl.innerHTML = s;
				el.parentNode.replaceChild(newEl, el);
				newEl.scrollTop = newEl.scrollHeight;
				if (str.indexOf("moro3")>=0) {window.opener.history.back();}
			}
		}
		
		this.ChatWrite = function(str)
		{	
			if (!Opcje.newChatDisplay) return;
			unsafeWindow.chatSendMsg(str);
		}
		
		this.Chatlog = function(strs)
		{
			if (!Opcje.newChatDisplay) return;
			this.chatSend("<BR><span style='font-size:15px;color:#FF0000'>"+strs+"</span><BR>");
		}
		this.ChatlogAttr = function(strs,color)
		{
			if (!Opcje.newChatDisplay) return;
			this.chatSend("<BR><span style='font-size:15px;color:"+color+"'>"+strs+"</span><BR>");
		}
	}

	unsafeWindow.popSend = function(str)
	{
		if (!Opcje.newChatDisplay) return;
		mychat.ChatWrite(str);
		mychat.chatUpdate();
	}

	var mychat = new chatHistory();



//zmiany - jedna tablica, opcje sa wg odpowiednich indexow

function persistanceModule()
{
		trace("Persistance module created");
		this.loaded = false;
		//blokowanie autowylogowania	
		this.autoAktywny = false;
		//new autoloot settings
		this.autoLootFlags = 0;		
		this.lootNoLoot = [];	
		this.autoNotLootItems = '';		// ciagi znakow identyfikujace przedmiot(y), ktorych nie zbieramy. Kilka oddzielamy ;

		this.autoLeczenie = false;
		this.autoLeczenieItem = ''; 		// z czego ma korzystac, lub pusto jak z dowolnych miksow
		this.autoLeczenieZycie = 80; 	// procent zycia od jakiego startuje procedura leczenia

		this.autoStrzaly = false;

		this.currentZoom = 0;
		this.Zoom = 0;
		this.zoomChanged = false;
		this.autoGetFriendsList = false;
		//locations
		this.locationCurrent = '';
		this.locationPrevious = '';
		
		this.cashGold = false;
		this.fetchEnemy = true;
		this.fetchNPCList = true;
		this.newChatDisplay = true;
		this.showItemClass = true;

		
		this.nick='';
		
		this.IsAutoLoot = function(bit) { return (this.autoLootFlags&bit)>0; };
		this.itemZwykly = 2;
		this.itemUnikat = 4;
		this.itemHero   = 8;
		this.itemLegenda = 16;
		
		this.itemBronie = 32;
		this.itemZbroje = 64;
		this.itemKlejnoty = 128;
		this.itemNaturalne = 256;
		this.itemKonsumpcyjne = 512;
		this.itemStrzaly = 1024;
		this.itemPozostale = 2048;
		this.itemTylkoProfesji = 4096;
		this.itemWDruzynie = 8192;
		this.mapSearch = "";
		//action module
		this.LoadRegistry = function(nick) 
		{
			trace("Opcje: Load");
            this.nick=nick;
			this.currentZoom 	= GM_getValue("margoZoom", 3); // rozmiar mapy w oknie 
			this.Zoom = this.currentZoom;
			this.autoAktywny 	= GM_getValue(this.nick+"_"+"margoAutoAktywny", false);
			this.autoLeczenie 	= GM_getValue(this.nick+"_"+"margoAutoLecz"	, false);
			this.autoStrzaly 	= GM_getValue(this.nick+"_"+"margoAutoStrzaly", false);
			this.cashGold 		= GM_getValue(this.nick+"_"+"margoCashGold", false);
			this.fetchEnemy 	= GM_getValue(this.nick+"_"+"margoFetchEnemy", false);

			this.autoLootFlags  = GM_getValue(this.nick+"_"+"margoAutoZbierajFlags", 0);

			//nowe
			this.autoNotLootItems 		= GM_getValue(this.nick+"_"+"margoAutoNotLootItems", "");

			this.autoLeczenieItem 		= GM_getValue(this.nick+"_"+"margoAutoLeczenieItem", "");
			this.autoLeczenieZycie 		= GM_getValue(this.nick+"_"+"margoAutoLeczenieZycie", 70);
			this.margoAutoGetFriendsList= GM_getValue(this.nick+"_"+"margoAutoFriendsList", false);
			//locations
			this.locationCurrent 		= GM_getValue(this.nick+"_"+"margoMapCurrent", "");
			this.locationPrevious 		= GM_getValue(this.nick+"_"+"margoMapPrevious", "");
			
			this.fetchNPCList = GM_getValue("margoFetchNPCList", true);
			this.newChatDisplay = GM_getValue("margoNewChat", true);
			trace("OPCJE: chat"+this.newChatDisplay);
            this.showItemClass = GM_getValue("margoShowItemClass", true);
			this.loaded = true;
			this.mapSearch = GM_getValue(this.nick+"_"+"margoMapSearch", "");
			if (this.mapSearch.length) {
				$('#findobject').val(this.mapSearch);
				$('#szukaj').show('slow');
			}

			if (this.autoNotLootItems.length>0)	{
				this.lootNoLoot=this.autoNotLootItems.split(";");
				if (this.lootNoLoot[this.lootNoLoot.length-1].length==0) this.lootNoLoot.pop();
			} else this.lootNoLoot=[];

		}
		
		this.SaveRegistry = function()
		{
			GM_setValue(this.nick+"_"+"margoAutoFriendsList", this.margoAutoGetFriendsList);
			GM_setValue(this.nick+"_"+"margoAutoLeczenieZycie", this.autoLeczenieZycie);
			GM_setValue("margoZoom",this.Zoom);
			GM_setValue(this.nick+"_"+"margoAutoAktywny", this.autoAktywny);
			GM_setValue(this.nick+"_"+"margoAutoLecz", 	this.autoLeczenie); 	
			GM_setValue(this.nick+"_"+"margoAutoStrzaly", this.autoStrzaly);
			GM_setValue(this.nick+"_"+"margoCashGold", this.cashGold);
			GM_setValue(this.nick+"_"+"margoFetchEnemy", this.fetchEnemy);
			
			GM_setValue(this.nick+"_"+"margoAutoZbierajFlags", this.autoLootFlags);
			//nowe
			GM_setValue(this.nick+"_"+"margoAutoNotLootItems", this.autoNotLootItems.trim());
			GM_setValue(this.nick+"_"+"margoAutoLeczenieItem", this.autoLeczenieItem.trim());
			GM_setValue(this.nick+"_"+"margoAutoLeczenieZycie", this.autoLeczenieZycie);
			//GM_setValue("margoAutoFriendsList", );
			
			//locations
			GM_setValue(this.nick+"_"+"margoMapCurrent", this.locationCurrent);
			GM_setValue(this.nick+"_"+"margoMapPrevious", this.locationPrevious);
            console.log("Save: "+this.nick+"_"+"margoMapPrevious");
			GM_setValue("margoFetchNPCList", this.fetchNPCList);
			GM_setValue("margoNewChat", this.newChatDisplay);
			GM_setValue("margoShowItemClass", this.showItemClass);
			
		}
		this.SaveLocation = function()
		{
			GM_setValue(this.nick+"_"+"margoMapCurrent", this.locationCurrent);
			GM_setValue(this.nick+"_"+"margoMapPrevious", this.locationPrevious);
		}
		this.SaveSearch = function(str)
		{
			this.mapSearch = str;
			GM_setValue(this.nick+"_"+"margoMapSearch", this.mapSearch);
		}
		this.LoadLocation = function()
		{
			this.locationCurrent 		= GM_getValue(this.nick+"_"+"margoMapCurrent", false);
			this.locationPrevious 		= GM_getValue(this.nick+"_"+"margoMapPrevious", false);
		}

		this.OptionsDialogDisplay = function()
		{
			var w=$('#margoplus').width();
			// przycisk panelu opcji
			var options_width = 240;
			var objthis = this;
			
			
			var txt = '<table id="mainoptiontable"  border=2 width='+options_width+' style=" background-image:url('+bkgrnd+');background-repeat:repeat;border:2px #623112 solid;">';
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(1,this)" onMouseOut="_opcje.TipMouseEv(0,this)"><font size="3" face="verdana" color="gold"><b>Ustawienia:</b></FONT></td></tr>';
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(2,this)" onMouseOut="_opcje.TipMouseEv(0,this)"><input type="button" id="autoAktywny" class="'+((this.autoAktywny)?'buttonOn':"buttonOff")+'" value="Blokuj autowylogowanie" style="width:240px;"/></td></tr>';
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(3,this)" onMouseOut="_opcje.TipMouseEv(0,this)" style="padding:0px;margin:0px;" border=0>'+this.generateAutoLootSwitches(this.autoLootFlags)+'</td></tr>'
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(4,this)" onMouseOut="_opcje.TipMouseEv(0,this)" style="padding-top:3px;padding-bottom:5px;"><font size="2" face="verdana" color="green">Oprócz przedmiotow:</font><BR><INPUT TYPE=TEXT id="autoNotLootItems" value="'+(this.autoNotLootItems)+'" style="width:240px;height:18px;font-size:10px"></td></tr>';
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(5,this)" onMouseOut="_opcje.TipMouseEv(0,this)" style="padding-top:3px;"><input type="button" id="autoleczenie" class="'+((this.autoLeczenie)?'buttonOn':"buttonOff")+'" value="Lecz automatycznie" style="width:240px;padding:2px 0px;"/></td></tr>';
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(6,this)" onMouseOut="_opcje.TipMouseEv(0,this)" ><font size="2" face="verdana" color="green">Od %:</font><INPUT TYPE=TEXT size=3 id="autoLeczenieZycie" value="'+(this.autoLeczenieZycie)+'" style="text-align:right;width:20px;height:18px;">';
			txt+='&nbsp;<font size="2" face="verdana" color="green">Używaj:</font><INPUT TYPE=TEXT id="autoLeczenieItem" value="'+(this.autoLeczenieItem)+'" style="width:240px;height:18px;font-size:10px"></td></tr>';
			
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(7,this)" onMouseOut="_opcje.TipMouseEv(0,this)" style="padding-top:3px;"><input type="button" id="autostrzaly" class="'+((this.autoStrzaly)?'buttonOn':"buttonOff")+'" value="Uzupełniaj strzały" style="width:241px;padding:2px 1px;"/></td></tr>';
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(8,this)" onMouseOut="_opcje.TipMouseEv(0,this)" ><input type="button" id="cashGold" class="'+((this.cashGold)?'buttonOn':"buttonOff")+'" value="Upłynniaj złoto i klejnoty" style="width:241px;padding:2px 1px;"/></td></tr>';
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(9,this)" onMouseOut="_opcje.TipMouseEv(0,this)" ><input type="button" id="fetchEnemy" class="'+((this.fetchEnemy)?'buttonOn':"buttonOff")+'" value="Pobierz listę wrogow" style="width:241px;padding:2px 1px;"/></td></tr>';
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(10,this)" onMouseOut="_opcje.TipMouseEv(0,this)" ><input type="button" id="fetchNPCList" class="'+((this.fetchNPCList)?'buttonOn':"buttonOff")+'" value="Pobierz listę NPC" style="width:241px;padding:2px 1px;"/></td></tr>';
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(11,this)" onMouseOut="_opcje.TipMouseEv(0,this)" ><input type="button" id="newChatDisplay" class="'+((this.newChatDisplay)?'buttonOn':"buttonOff")+'" value="Włącz okno czatu" style="width:241px;padding:2px 1px;"/></td></tr>';
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(12,this)" onMouseOut="_opcje.TipMouseEv(0,this)" ><input type="button" id="showItemClass" class="'+((this.showItemClass)?'buttonOn':"buttonOff")+'" value="Podświetlaj klase przedmiotów" style="width:241px;padding:2px 1px;"/></td></tr>';
			txt+='<tr><td onMouseOver="_opcje.TipMouseEv(13,this)" onMouseOut="_opcje.TipMouseEv(0,this)" ><font size="2" face="verdana" color="green">Powiększenie:</font>';
			txt+='<input type="button" id="zoomlevel2" class="'+((this.currentZoom==2)?'buttonOn':"buttonOff")+'" value="2x" style="width:31px;padding:2px 2px;"/>';
			txt+='<input type="button" id="zoomlevel3" class="'+((this.currentZoom==3)?'buttonOn':"buttonOff")+'" value="3x" style="width:31px;padding:2px 2px;"/>';
			txt+='<input type="button" id="zoomlevel4" class="'+((this.currentZoom==4)?'buttonOn':"buttonOff")+'" value="4x" style="width:31px;padding:2px 2px;"/>';
			txt+='<input type="button" id="zoomlevel5" class="'+((this.currentZoom==5)?'buttonOn':"buttonOff")+'" value="5x" style="width:31px;padding:2px 2px;"/>';
			txt+='</td></tr>';
			txt+='<tr><td><font size="3" face="verdana" color="gold"><b>Uwaga</b></font><br><font size="2" face="verdana" color="green">Niektóre zmiany wymagaja odświerzenia przeglądarki po zapisaniu. (F5)</font></td></tr>';
			txt+='<tr><td><BR><table style="border-collapse:collapse" width=100%><tr><td align=left width=50%><input style="align:right;" type="button" class="button" id="cancelSettings" value="Wyjdź" /></td><td align=right width=50%><input style="align:right;" type="button" class="button" id="saveSettings" value="Zapamiętaj" /></td></tr></table></td></tr></table>';

			$('#opcjedialog').html(txt);
			$('#mainoptiontable').mousemove(function(e) { Opcje.MouseMove(e) });
			txt = "";
			this.optionsAttachSwitchesHandling();			

			$('#cancelSettings').click(function() {  $('#opcjedialog').hide('fast'); mMargo.screenGrayOut(false); objthis.LoadRegistry(objthis.nick);});
			$('#saveSettings').click(function() {  objthis.OptionsDialogSave();	});
			
			$('#opcjedialog').css({"top":($(document).height()-$('#opcjedialog').height())/2,"left":($(document).width()-240)/2});
			
			//$(window).resize(function(){ $('#opcjedialog').is(":visible")?$('#opcjedialog').css({"top":($(document).height()-$('#opcjedialog').height())/2,"left":($(document).width()-240)/2}):""; });		
			
			
			mMargo.screenGrayOut(true);
			$('#opcjedialog').show('slow').css({"z-index":"200"});
			$('#margoplus').hide('fast');
			this.zoomChanged = false;
		
		}
		this.OptionsDialogSave = function()
		{
			this.autoLeczenieItem = $('#autoLeczenieItem').val();
			this.autoNotLootItems = $('#autoNotLootItems').val();
			if (this.autoNotLootItems.length>0)
			{
				this.lootNoLoot=this.autoNotLootItems.split(";");
				if (this.lootNoLoot[this.lootNoLoot.length-1].length==0) this.lootNoLoot.pop();
			}
			else
				this.lootNoLoot=[];
			this.autoLeczenieZycie = parseInt($('#autoLeczenieZycie').val());
			this.margoAutoGetFriendsList = $('#autolistawrogow').attr('checked')?true:false; 
		
			this.SaveRegistry();
			if (this.currentZoom != this.Zoom) alert("Nowe powiększenie będzie aktywne po przeładowaniu przeglądarki.");
			$('#opcjedialog').hide('fast');
			$('#margoplus').show('slow');
		}

		this.autoLootButtonProc = function(obj,id)
		{
			var classOn = 'buttondark';
			var classOff = 'button';
			if (this.autoLootFlags&id)	
				$(obj).removeClass(classOn).addClass(classOff);
			else
				$(obj).removeClass(classOff).addClass(classOn);
			this.autoLootFlags += (this.autoLootFlags&id)? -id: id;
		}
	
		this.optionsButtonProc = function(obj)
		{
			var idstr=$(obj).attr('id');
			if (idstr=='autoAktywny') $(obj).attr('class',(this.autoAktywny = !this.autoAktywny)?'buttonOn':'buttonOff');
			if (idstr=='autoleczenie') $(obj).attr('class',(this.autoLeczenie = !this.autoLeczenie)?'buttonOn':'buttonOff');
			if (idstr=='autostrzaly') $(obj).attr('class',(this.autoStrzaly = !this.autoStrzaly)?'buttonOn':'buttonOff');
			if (idstr=='cashGold') $(obj).attr('class',(this.cashGold = !this.cashGold)?'buttonOn':'buttonOff');
			if (idstr=='fetchEnemy') $(obj).attr('class',(this.fetchEnemy = !this.fetchEnemy)?'buttonOn':'buttonOff');
			if (idstr=='fetchNPCList') $(obj).attr('class',(this.fetchNPCList = !this.fetchNPCList)?'buttonOn':'buttonOff');
			if (idstr=='newChatDisplay') $(obj).attr('class',(this.newChatDisplay = !this.newChatDisplay)?'buttonOn':'buttonOff');
			if (idstr=='showItemClass') $(obj).attr('class',(this.showItemClass = !this.showItemClass)?'buttonOn':'buttonOff');
			if (idstr=='ALZ') 
			{
				this.autoLootFlags += (this.autoLootFlags&1)? -1: 1;
				$(obj).attr('class',(this.autoLootFlags&1)?'buttonOn':'buttonOff');
			}
			if (idstr.indexOf('zoomlevel')>=0)
			{
				$("input[id^='zoomlevel']").attr('class','buttonOff');
				$(obj).attr('class','buttonOn');
				var $zm = parseInt(idstr.split('zoomlevel')[1]);
				if ($zm != this.currentZoom) this.zoomchanged = true;
				this.Zoom = $zm;
			}
			
		}	
	
		this.optionsAttachSwitchesHandling = function()
		{
			var objthis = this;
			
			$('#ALZw').click(function() { objthis.autoLootButtonProc(this,2); });
			$('#ALZu').click(function() { objthis.autoLootButtonProc(this,4); });
			$('#ALZh').click(function() { objthis.autoLootButtonProc(this,8); });
			$('#ALZl').click(function() { objthis.autoLootButtonProc(this,16); });
			$('#ALZ1').click(function() { objthis.autoLootButtonProc(this,32); });
			$('#ALZ2').click(function() { objthis.autoLootButtonProc(this,64); });
			$('#ALZ3').click(function() { objthis.autoLootButtonProc(this,128); });
			$('#ALZ4').click(function() { objthis.autoLootButtonProc(this,256); });
			$('#ALZ5').click(function() { objthis.autoLootButtonProc(this,512); });
			$('#ALZ6').click(function() { objthis.autoLootButtonProc(this,1024); });
			$('#ALZ7').click(function() { objthis.autoLootButtonProc(this,2048); });
			$('#ALZ8').click(function() { objthis.autoLootButtonProc(this,4096); });
			$('#ALZD').click(function() { objthis.autoLootButtonProc(this,8192); });
			
			$('#ALZ').click(function() { objthis.optionsButtonProc(this); });
			$('#autoAktywny').click(function() { objthis.optionsButtonProc(this); });
			$('#autoleczenie').click(function() { objthis.optionsButtonProc(this); });
			$('#autostrzaly').click(function() { objthis.optionsButtonProc(this); });
			$('#cashGold').click(function() { objthis.optionsButtonProc(this); });
			$('#fetchEnemy').click(function() { objthis.optionsButtonProc(this); });
			$('#fetchNPCList').click(function() { objthis.optionsButtonProc(this); });
			$('#newChatDisplay').click(function() { objthis.optionsButtonProc(this); });
			$('#showItemClass').click(function() { objthis.optionsButtonProc(this); });
			$("input[id^='zoomlevel']").click(function() { objthis.optionsButtonProc(this); });
		}
	
		this.generateAutoLootSwitches = function(flags)
		{
			var upperStyle='padding:5px 4px 0px 0px !important;';
			var lowerStyle='padding:7px 3px 0px 0px !important;';
			var newcolumn=	'<table style="border-collapse:collapse"><tr><td colspan=4 ><input type="button" id="ALZ" class="'+((flags&1)?'buttonOn':"buttonOff")+'" value="Zbieraj automatycznie" style="width:240px;"/></tr><tr>';
//			newcolumn+=		'<tr ><td colspan=4 style="'+upperStyle+'"><a id="ALZ"  class="'+((flags&1)?'buttonOn':"buttonOff")+'">'+((flags&1)?'Wyłącz':"Włącz")+'</a></td></tr><tr>';
			newcolumn+=		'<td style="'+upperStyle+'"><a id="ALZw" class="'+((flags&2)?'buttondark':"button")+'">Zwykłe</a></td>';
			newcolumn+=		'<td style="'+upperStyle+'"><a id="ALZu" class="'+((flags&4)?'buttondark':"button")+'">Unikatowe</a></td>';
			newcolumn+=		'<td style="'+upperStyle+'"><a id="ALZh" class="'+((flags&8)?'buttondark':"button")+'">Heroiczne</a></td>';
			newcolumn+=		'<td style="'+upperStyle+'"><a id="ALZl" class="'+((flags&16)?'buttondark':"button")+'">Legendarne</a></td>';
			newcolumn+=		'</tr></table>';
			newcolumn+=		'<table style="border-collapse:collapse"><tr>';
			newcolumn+=		'<td style="'+lowerStyle+'"><a id="ALZ1" class="'+((flags&32)?'buttondark':"button")+'">B</a></td>';
			newcolumn+=		'<td style="'+lowerStyle+'"><a id="ALZ2" class="'+((flags&64)?'buttondark':"button")+'">Z</a></td>';
			newcolumn+=		'<td style="'+lowerStyle+'"><a id="ALZ3" class="'+((flags&128)?'buttondark':"button")+'">K</a></td>';
			newcolumn+=		'<td style="'+lowerStyle+'"><a id="ALZ4" class="'+((flags&256)?'buttondark':"button")+'">N</a></td>';
			newcolumn+=		'<td style="'+lowerStyle+'"><a id="ALZ5" class="'+((flags&512)?'buttondark':"button")+'">K</a></td>';
			newcolumn+=		'<td style="'+lowerStyle+'"><a id="ALZ6" class="'+((flags&1024)?'buttondark':"button")+'">S</a></td>';
			newcolumn+=		'<td style="'+lowerStyle+'"><a id="ALZ7" class="'+((flags&2048)?'buttondark':"button")+'">P</a></td>';
			newcolumn+=		'<td style="'+lowerStyle+'"><a id="ALZ8" class="'+((flags&4096)?'buttondark':"button")+'">T</a></td>';
			//czy zbierac w druzynowej
			newcolumn+=		'<td style="'+lowerStyle+'">&nbsp;<a id="ALZD" class="'+((flags&8192)?'buttondark':"button")+'">W drużynie</a></td>';
			newcolumn+=		'</tr></table>';
			return newcolumn;
		}
	
		this.mouseX = -1;
		this.mouseY = -1
		this.MouseMove = function(e)
		{
			this.mouseX = e.pageX; 
			this.mouseY = e.pageY; 
			$('#cnvtooltip').css({'left': this.mouseX+10,'top': this.mouseY+10});
		}
		
		this.ShowTip = function(x,y,info,mode)
		{
			$('#cnvtooltip').html(info);
			$('#cnvtooltip').css({'display': mode?'block':'none'});
			tooltipOn = mode?true:false;
		}
		this.TipMouseEv = function(mode,instance)
		{
			if (!mode) this.ShowTip(0,0,"",0);
			else
			{
				var str="";
				switch (mode)
				{
				case 1: str="Ustawienia pluginu margoPlus"; 
						break;
				case 2:	str="Włączenie tej opcji powoduje powstrzymanie<BR>wylogowania postaci z powodu nieaktywności. <BR>Postać będzie widziana przez innych graczy<br>jako aktywna."
						str+="<a class='buttonOn'>Włączony</a><a class='buttonOff'>Wyłączony</a>";
						break;
				case 3: str="Auto-loot: automatyczne zbieranie lootu.<BR>"	
						str+="<a class='buttonOn'>Włączony</a><a class='buttonOff'>Wyłączony</a>";
						str+="<br><br>Poniżej znajdują sie przełączniki decydujace<br>o tym jaki loot bedzie zbierany.<br>"
						str+="<a class='buttondark'>Zbieraj</a><a class='button'>Nie zbieraj</a>";
						str+="<br><br>Dodatkowe opcje(działają gdy Zwykłe są wyłączone):<br>B-Bronie(każdy typ)<br>Z-Zbroje(zbroje, rękawice, buty, hełmy)<br>K-Klejnoty(naszyjniki, pierścienie)<br>N-Neutralne";
						str+="<br>K-Konsumpcyjne<br>S-Strzały<br>P-Pozostałe(klucze, złoto, itp.)<br>T-jeszcze nie wiem :D<br>W drużynie-opcja:'bardzo potrzebuje'";
						break;
				case 4: str="Auto-loot: lista przedmiotów,<br>które nie będą zbierane gdy automatyczne<br>zbieranie lootu jest włączone.<br><br>Przykładowo: Oko;Jajod;Mocza;szkielet;<br>Gliniane;Strzały maddoków;Pazury<br><br>";
						str+="Może to być fragment nazwy: Poma = Pomarańczowa mikstura<br>Ważne:<br>-zachować wielkość znaków<br>-nie umieszczać znaku ; na końcu listy";
						
				case 5: str="Automatyczne leczenie po walce<br>";
						str+="<a class='buttonOn'>Włączony</a><a class='buttonOff'>Wyłączony</a>"; break;
				case 6: str="Automatyczne leczenie zostanie wykonane,<br>gdy wskaźnik życia zmniejszy sie do [x]% i mniej.<br>Poniżej wprowadź listę do 3 miksów,<br>które bedą służyły do uleczenia postaci.<br>";
						str+="Przykładowo: poma;Larwy;Język<br><br>Pierwszy z miksów to poma=Duża pomarańczowa mikstura.<br>Gdy się już skończy, to system będzie szukał<br>następnej na liście, czyli Larwy=Larwy gąsienicy.<br>";
						str+="Jak zabraknie larw, to system odszuka<br>Język=Język maddoka w celu uleczenia postaci.<br><br>Ważne:<br>-zachować wielkość znaków skracając nazwę miksu<br>-wprowadzić unikalna nazwę (min. 3 znaki)<br>";
						str+="by ustrzec się przed problemem, że znikają jakies zwoje,<br>lub inne konsumpcyjne przedmioty."	
						str+="-wartość % należy mniej więcej dobrać do<br>wartości leczenia jednej porcji miksu.<br>Przykładowo: postać ma 10k życia, miks leczy 1k.<br>Optymalna wartośc wynosi mniej wiecej 91%."
						break;
				case 7: str="Uzupełniaj strzały - automatyczne uzupełnianie strzał używanych<br>przez postać, gdy ich ilość spadnie do 50 lub mniej.<br>System odszuka w ekwipunku tylko takie strzały, które są aktualnie używane.<br>";
						str+="<a class='buttonOn'>Włączony</a><a class='buttonOff'>Wyłączony</a>"; break;
				case 8: str="Upłynniaj złoto i klejnoty<br>Przedmioty takie jak worki z klejnotami, kupki złota, itp.<br>są automatycznie przemieniane w złoto postaci.<br>Dzieki temu nie zajmowane jest miejsce w torbach.<br>Opcja ta działa tylko na przedmiotach normalnych.<br>Unikatowe, heroiczne i legendarne nie są przemieniane.<br>";
						str+="<a class='buttonOn'>Włączony</a><a class='buttonOff'>Wyłączony</a>"; break;
				case 9: str="Pobieranie listy wrogów z serwera. Lista może<br>zawierać wrogów własnej postaci oraz także wrogów klanu.<br>Opcja nie jest w pełni jeszcze ukończona.<br>";
						str+="<a class='buttonOn'>Włączony</a><a class='buttonOff'>Wyłączony</a>"; break;
				case 10:str="Pobiera listę postaci NPC w całości dla danej lokacji.<br>Dzieki czemu są one od razu widoczne na mapie,<br>działa również nia nich narzędzie 'szukaj'.<br>Aktualnie wszystkie większe miasta są skatalogowane.<br>";
						str+="<a class='buttonOn'>Włączony</a><a class='buttonOff'>Wyłączony</a>"; break;
				case 11:str="Otwiera dodatkowe okno czatu.<br>Wszystkie wpisy na czacie nie ulegają skasowaniu<br>tak jak to się dzieje na czacie Margonem.<br>Dodatkowo wpisy są rozszerzone o czas pojawienia się na czacie.<br>Pojawiają sie również wpisy o zdobytych przedmiotach<br>unikatowych, heroicznych i legendarnych.<br>";
						str+="<a class='buttonOn'>Włączony</a><a class='buttonOff'>Wyłączony</a>"; break;
				case 12:str="System podświetla klasę przedmiotów wg następujących kolorów:<br>Pomarańczowy-unikatowe<br>Niebieski-heroiczne<br>Jasnozielony-legendarne<br>Fioletowy-przedmioty za SŁ<br><br>";
						str+="Podświetlenie działa dla przedmiotów w ekwipunku, na postaci,<br>na skrzynce pocztowej oraz w depozycie.<br>";
						str+="<a class='buttonOn'>Włączony</a><a class='buttonOff'>Wyłączony</a>"; break;
						break;
				case 13:str="Powiększenie mapy.";
						break;
				
				default:;
				}			
				if (str!="") this.ShowTip(this.mouseX,this.mouseY,str,1);
			}

		}
}

var Opcje = new persistanceModule();
	
function szukajOnClick()
{
	$('input#findobject').val('');
	if ($('#szukaj').is(':visible')) $('#szukaj').slideUp();
	else $('#szukaj').slideDown();
	Opcje.SaveSearch("");
}

function callOptions() 		 { Opcje.OptionsDialogDisplay(); }
function findkeypress(event) { if (event.keyCode == 13) { event.preventDefault(); Opcje.SaveSearch($('input#findobject').val()); return false; } }
function btnPrzejdzFn() 		 { if (!unsafeWindow._g.dead && !isInBattle()) { unsafeWindow.__g('walk'); actionStop("Przejdz"); } }
function btnZatrzymajFn() 	 { if (!unsafeWindow._g.dead && !isInBattle()) { actionStop("btnZatrzymaj");	doStopWalking(); } }
function btnPodniesFn() 		 { if (!unsafeWindow._g.dead && !isInBattle()) { unsafeWindow.__g("takeitem"); actionStop("Podnies"); } }

function updateNPCFunction()
{
	var npclist = unsafeWindow._g.npc;
	var npcstr = "";
	for (var w=0 in npclist)
	{
		if (npclist[w].type==5 || npclist[w].type==0)
		{
			npcstr += npclist[w].type+":"+npclist[w].nick+":"+npclist[w].x+":"+npclist[w].y+":"+npclist[w].wt+":"+npclist[w].icon+":"+npclist[w].lvl+":"+npclist[w].qm+";"
		}
	}
	alert(npcstr);
	WScriptServNPCUpdate(npcstr);
}						
	

function getUserProfile()
	{
		if (selectedPlayerName!="") 
			window.open("http://www.margonem.pl/?task=forum&show=found&kw="+selectedPlayerName+"&playerinfo=Szukaj+gracza&cat=2",
			'open_window_profile', 'menubar, toolbar, location, directories, status, scrollbars, resizable, dependent')
	}
	

	var last_actiontime = 0;
function actionOnPlayer()
	{
		var unixtime = (new Date().valueOf() * 0.001)|0;
		if (unixtime - last_actiontime < 500) return;
		last_actiontime = unixtime;
		
		if (selectedPlayerId!=-1)
		{
			unsafeWindow.__g('fight&a=attack&id='+selectedPlayerId);
			trace('Attack user: id='+selectedPlayerId);			
		}
	}

    
function actionOnFurians()
	{
		unsafeWindow.__g('fight&a=attack&id=118688');
		trace('Attack Furians');			
	}

	
	
	
function setupPluginView()
{
		$('body').append('<div id="opcjedialog" style="z-index:200;position:absolute;top:0px;left:794px;display:none;z-index:5;font:normal 8pt sans-serif;font-color:#00c0c0;padding:3px;"></div>');
		$('body').append('<div id="cnvtooltip"  style="display:none; position:absolute; z-index: 400; font: normal 8pt sans-serif; font-color:#00c0c0;padding: 3px; border: solid 1px;background:#006400; background-image:url('+bkgrnd+');background-repeat:repeat;"></div>'); 	

		var newcolumn=""; 
		newcolumn ='<table id="mainplugin" style="display:none;border-collapse:collapse;table-layout:fixed;" width=100% height=100%>';
		newcolumn+=		'<tr><td id="gameinfo" width=100% ALIGN=left VALIGN=top style="color:#c0c0c0;font-family:arial;font-size:9pt;"></td></tr>';

		newcolumn+=		'<tr><td colspan=2 style="color:#c0c0c0;font-family:arial;font-size:9pt;" id="mapinfo2"></td></tr>';
		newcolumn+= 	'<tr><td colspan=2><div id="szukaj" style="display:none;"><INPUT TYPE=text style="width:246px;" id="findobject" VALUE=""></div></td></tr>';
		newcolumn+=   	'<tr><td colspan=2 style="padding-left:0px;">';
		newcolumn+=   	'<table><tr>';
		newcolumn+=   		'<td style="padding-right:5px;text-align:left"><input type="button" id="btnPrzejdz"   class="button" value="Przejdz"	style="width:70px;height:25px;" /></td>';
		newcolumn+=   		'<td style="padding-right:5px;text-align:left"><input type="button" id="btnZatrzymaj" class="button" value="Zatrzymaj" 	style="width:70px;height:25px;"/></td>';
		newcolumn+=   		'<td style="padding-right:5px;text-align:left"><input type="button" id="btnPodnies"   class="button" value="Podnies" 	style="width:70px;height:25px;"/></td>';
		newcolumn+=   		'<td style="padding-right:5px;text-align:left;display:none;" id="updateNPC_td"><input type="button" id="updateNPC" class="button" value="Synch. NPC" style="width:70px;height:25px;"/></td>';
		newcolumn+=   	'</tr></table>';
		newcolumn+=   	'</td></tr>'	
		newcolumn+=		'<tr style="padding:0px;overflow: hidden;width:10px;height:10px;"><td id="drawingcanvas" colspan=2 style="padding:0px;overflow: hidden;width:10px;height:10px;"></td></tr>';
		newcolumn+=		'<tr><td id="hiddenCanvas" colspan=2></td></tr>';

		/*
		newcolumn+=   	'<tr id="adminpanel" style="display:none"><td colspan=2 style="padding-top:1px;"><font style="font-family:arial;font-size:8pt;" color="green"><b>Admin:</b></font>';
		newcolumn+=   	'<table ><tr>';
		newcolumn+=   		'<td style="text-align:left"><input type="button" class="button" id="updateMapy" value="Zglos blad mapy" /></td>';
		newcolumn+=   	'</tr></table>';
		newcolumn+=   	'</td></tr>';
		*/
		
		newcolumn+=  '</td></tr>';
		newcolumn+='</table>';
		newcolumn+='<div id="naglowek" style="display:none;z-index:5;background-color:000000;position:absolute;top:0px;left:0px;width:'+$(window).width()+'px;height:22px">';
		newcolumn+=	   '<table style="border-collapse:collapse;"><tr><td style="color:#c0c0c0;font-family:arial;font-size:9pt;width:90%;" id="mapinfo"></td>';
        newcolumn+=	   '<td style="color:#c0c0c0;font-family:arial;font-size:9pt;width:130px"><table><tr><td><INPUT TYPE=TEXT id="textQb" value="" style="width:30px;height:18px;font-size:9px"></td><td><input type="button" id="btnQb"   class="button" value="#"	style="padding-top:0px;width:17px;height:15px;" /></td></tr></table></td>';
		newcolumn+=	   '<td style="vertical-align:top;"><table style="border-collapse:collapse;"><tr><td id="questNo" style="vertical-align:middle;">Q:</td><td><img src="'+searchIcon+'"   class="imgSearch" tip="Szukaj na mapie..."/></td>';
		newcolumn+=	   '<td><img src="'+settingsIcon+'" class="imgSettings" tip="Ustawienia mapy" /></td></tr></table></td>';
		newcolumn+=	   '</tr></table></div>';
		newcolumn+='<div id="userpanel" 	style="opacity:0.75;z-index:5;display:none;background-color:#407010;position:absolute;top:'+($(window).height()-95)+'px;left:0px;width:'+$(window).width()+'px;height:45px">';
		newcolumn+=   	'<font style="padding-left:5px;font-family:arial;font-size:8pt;" color="#88ff00"><b>Wybrano gracza:</b>&nbsp;&nbsp;<div style="display:inline;color:white" id="selectedPlayer">Wskaz na mapie</div></font><table ><tr>';
		newcolumn+=   		'<td style="padding-right:5px;padding-bottom:5px;"><input type="button" class="button" id="userProfile" value="Profil" style="width:70px;height:25px"/></td>';

		newcolumn+=   		'<td style="padding-right:5px;text-align:left"><input type="button" class="button" id="attackOther" value="Atakuj" style="width:70px;height:25px" /></td>';
		newcolumn+=   		'<td style="text-align:left"><input type="button" class="button" id="attackFurians" value="Atakuj FurianSa" style="width:140px;height:25px" /></td>';

		newcolumn+=   	'</tr></table>';
		newcolumn+='</div>';	
		newcolumn+='<div id="activetools" 	style="z-index:5;display:none;background-color:#202060;position:absolute;top:'+($(window).height()-50)+'px;left:0px;width:'+$(window).width()+'px;height:30px"></div>';	
		newcolumn+='<div id="stopka" 		style="display:none;z-index:5;background-color:000000;position:absolute;top:'+($(window).height()-20)+'px;left:0px;width:'+$(window).width()+'px;height:20px"><table width=100% height=20px><tr><td style="text-align:left;"><font style="color:gold;font-family:fantasy;font-size:9pt;font-style:italic;">margo</font><font style="color:white;font-family:arial;font-size:10pt;"><b>PLUS</b>&nbsp;ver.'+scriptVersion+'&nbsp;&nbsp;</font></td><td style="text-align:right;color:blue;font-family:arial;font-size:7pt;" title="\x6D\x61\x72\x67\x6F\x70\x6C\x75\x73\x2E\x73\x63\x72\x69\x70\x74\x40\x67\x6D\x61\x69\x6C\x2E\x63\x6F\x6D"><b>'+"\x6D\x61\x72\x67\x6F\x70\x6C\x75\x73\x2E\x73\x63\x72\x69\x70\x74\x40\x67\x6D\x61\x69\x6C\x2E\x63\x6F\x6D"+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>';
		newcolumn+=		'<tr><td id="newver" colspan=2></td></tr></table>';
		newcolumn+='</div>';	
		newcolumn+='<div id="panelboczny_a" style="display:none;opacity:0.6;margin-top:22px;z-index:4;background-color:005500;position:absolute;top:0px;left:'+($(window).width()-120)+'px;width:120px;height:'+($(window).height()-50)+'px"><table width=100% height=20px><tr><td style="text-align:left;"><font style="color:gold;font-family:fantasy;font-size:9pt;font-style:italic;">margo</font><font style="color:white;font-family:arial;font-size:10pt;"><b>PLUS</b>&nbsp;ver.'+scriptVersion+'&nbsp;&nbsp;</font></td><td style="text-align:right;color:blue;font-family:arial;font-size:7pt;" title="\x6D\x61\x72\x67\x6F\x70\x6C\x75\x73\x2E\x73\x63\x72\x69\x70\x74\x40\x67\x6D\x61\x69\x6C\x2E\x63\x6F\x6D"><b>'+"\x6D\x61\x72\x67\x6F\x70\x6C\x75\x73\x2E\x73\x63\x72\x69\x70\x74\x40\x67\x6D\x61\x69\x6C\x2E\x63\x6F\x6D"+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>';
		newcolumn+=		'<tr><td id="newver" colspan=2></td></tr></table>';
		newcolumn+='</div>';	
		
		
		$('#sidepanel1').html(newcolumn);
		newcolumn="";


		$('#activetools').html(mActive.GetActivityHtml());
		mActive.SetupActivity();
		$('#activetools').css({"display":"block"});

		
		$(".imgSettings")	.click( callOptions );				// przycisk opcji
		$(".imgSearch")		.click( szukajOnClick ); 			// przycisk szukania	
		$('#findobject')	.keypress( findkeypress );
		Opcje.mapSearch='';
		$('#btnPrzejdz')	.click( btnPrzejdzFn );
		$('#btnZatrzymaj')	.click( btnZatrzymajFn );
		$('#btnPodnies')	.click( btnPodniesFn );
		
		$('#updateNPC').click( updateNPCFunction );
		//$('#updateMapy').click(	WScriptServMapUpdate );		
		$('#userProfile').click( getUserProfile );
		$('#attackOther').click( actionOnPlayer );	
        $('#attackFurians').click( actionOnFurians );			

    function restarQ()
    {
        mQuest.stopQuest();
        mQuest.startQuest(parseInt($('#textQb').val()));
        $('#textQb').val("");
    }
    $('#btnQb').click( restarQ );	    
}


	function moduleCanvas()
	{
		
		this.CurrentMapSizeX;
		this.CurrentMapSizeY;
		this.ClickedCanvasX;
		this.ClickedCanvasY;

		//hiddenMapInit
		this.CanvasInit=false;

		this.userCoordInfo = [];
		this.npcCoordInfo   = [];
		this.itemCoordInfo = [];
		this.staticCoordInfo = [];
		this.heroCoordInfo = [];
		
		this.foeCoordInfo = "";
		this.currentCTX = 0;
		this.tempCTX = 0;
		
		this.RequiresInit = function()
		{
			return !this.CanvasInit;
		}
		this.DoneInit = function()
		{
			this.CanvasInit = true;
		}
		this.CreateHiddenCanvas = function(mx,my)
		{
			this.CanvasInit = false;
			this.CurrentMapSizeX = mx;
			this.CurrentMapSizeY = my;
			if (!($('#canvasmarghidden').is('*')))
			{
				var txt = '<canvas id="canvasmarghidden" style="display:none;" width="'+Opcje.currentZoom*map_max_x+'" height="'+Opcje.currentZoom*map_max_y+'"></canvas>';
				$('#hiddenCanvas').html(txt);
				this.tempCTX = document.getElementById("canvasmarghidden").getContext("2d");
			}
		}
		
		this.CreateDrawingCanvas = function(s)
		{	
			if (!($("#canvas_viewport").is('*')))
			{
				trace("create canvas");
				var canvstr = '<div height=10 id="canvas_viewport" style="overflow:hidden;position:relative;"><canvas id="canvasmarg" width="'+Opcje.currentZoom*map_max_x+'" height="'+Opcje.currentZoom*map_max_y+'";"></canvas></div>';
                $('#drawingcanvas').html(canvstr);
				var thisobj=this;
				$('#canvasmarg').click(function(e) { thisobj.OnClickCanvas(e) });
				$('#canvasmarg').mousemove(function(e) { thisobj.CanvasMouseMove(e) });
				$('#canvasmarg').mouseout(function(e) { thisobj.CanvasMouseMove(e) });
				this.currentCTX = document.getElementById("canvasmarg").getContext("2d");
			}
			else
				trace("!create canvas");

			//adjust the viewport
			$("#canvas_viewport").css({"width":(Opcje.currentZoom*this.CurrentMapSizeX),"height":(Opcje.currentZoom*this.CurrentMapSizeY)});
		}
		this.OnClickCanvas = function(e)
		{
			var pos = $('#canvasmarg').offset();
			this.ClickedCanvasX = Math.floor((e.pageX - pos.left) / Opcje.currentZoom);
			this.ClickedCanvasY = Math.floor((e.pageY - pos.top) / Opcje.currentZoom);
			doStopWalking("klikniecie w canvas");
			generatePath=true;
			//updateUserInfo();
			return false;
		}		
		this.ImageToHiddenCanvas = function(img)
		{
			var ret=true;
			if (!img.complete) return ret;
			trace(img.src+" complete: "+img.complete);
			try
			{
				var ctxtemp = document.getElementById('canvasmarghidden').getContext('2d');
				ctxtemp.drawImage(img,0,0,Opcje.currentZoom*this.CurrentMapSizeX,Opcje.currentZoom*this.CurrentMapSizeY);
				ret=false;
			}
			catch (err)
			{
				ret=true;
				trace('ERROR Loading image'+err);
			}
			return ret;
		}
		//[mode,x,y[;next]]	// mode: 1 - ja| 2 - TS | 3 - cosa | 4 - wrogowie | 5 - heros | 6 - nastepna walka | 7 - szukaj 		
		this.MapColors = [
			"","",
								"rgb(255,40,40)","rgb(130,0,0)", //ja
								"rgb(0,255,0)","rgb(0,150,50)", //TS
								"rgb(255,255,0)","rgb(0,0,0)", //CN
								"rgb(255,255,0)","rgb(80,80,80)", //wrogowie
								"rgb(0,0,255)","rgb(255,0,0)", //hero
								"rgb(155,250,200)", "rgb(0,0,80)", //cel na mapie
								"rgb(255,255,255)","rgb(0,10,120)", //szukaj
								"rgb(255,0,255)","rgb(0,0,0)"
									
								
						 ];
		this.MapColors2 = [
			"","","","","","","","",
			"rgb(255,111,111)","rgb(180,60,60)","rgb(140,20,20)","rgb(100,0,0)","rgb(100,0,0)","rgb(100,0,0)","rgb(100,0,0)","rgb(100,0,0)", //ja
			"rgb(0,255,0)","rgb(0,150,50)","rgb(0,255,0)","rgb(0,150,50)","rgb(0,255,0)","rgb(0,150,50)","rgb(0,255,0)","rgb(0,150,50)", //TS
			"rgb(255,255,0)","rgb(0,0,0)","rgb(255,255,0)","rgb(0,0,0)","rgb(255,255,0)","rgb(0,0,0)","rgb(255,255,0)","rgb(0,0,0)", //CN
			"rgb(255,255,0)","rgb(80,80,80)","rgb(255,255,0)","rgb(80,80,80)","rgb(255,255,0)","rgb(80,80,80)","rgb(255,255,0)","rgb(80,80,80)", //wrogowie
			"rgb(0,0,255)","rgb(255,0,0)","rgb(0,0,255)","rgb(255,0,0)","rgb(0,0,255)","rgb(255,0,0)","rgb(0,0,255)","rgb(255,0,0)", //hero
			"rgb(155,250,200)", "rgb(0,0,80)","rgb(155,250,200)", "rgb(0,0,80)","rgb(155,250,200)", "rgb(0,0,80)","rgb(155,250,200)", "rgb(0,0,80)", //cel na mapie
			"#111111","#ffffff","#888888","#333333","#111111","#111111","#111111","#111111", //szukaj
			"rgb(255,0,255)","rgb(0,0,0)","rgb(255,0,255)","rgb(0,0,0)","rgb(255,0,255)","rgb(0,0,0)","rgb(255,0,255)","rgb(0,0,0)", //enemy
			"rgb(0,255,0)","rgb(0,0,0)","rgb(0,255,0)","rgb(0,0,0)","rgb(0,255,0)","rgb(0,0,0)","rgb(0,255,0)","rgb(0,0,0)" //friend
									
								
						 ];
		this.UpdateColor = function(b)
		{
			if (!mMargo.mapLoaded) return;
			if (this.state === undefined) this.state = 0;
			if (b) this.state++;
			if (this.state==8) this.state=0;
			if (this.currentCTX) 
			{  
				//myself
				this.currentCTX.fillStyle = this.MapColors2[8+this.state];
				this.currentCTX.fillRect(unsafeWindow._hero.x*Opcje.currentZoom, unsafeWindow._hero.y*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);

				for (var x=0;x<this.userCoordInfo.length;x++)
				{
					var mode=this.userCoordInfo[x][0];
					var ux=this.userCoordInfo[x][1];
					var uy=this.userCoordInfo[x][2];
					
					this.currentCTX.fillStyle = this.MapColors2[this.userCoordInfo[x][0]*8+this.state];
					//make hero 2 times bigger
					var scale = (parseInt(mode)==5)? 2:1;
					this.currentCTX.fillRect(this.userCoordInfo[x][1]*Opcje.currentZoom -((scale==2)?Opcje.currentZoom/2:0),
											 this.userCoordInfo[x][2]*Opcje.currentZoom -((scale==2)?Opcje.currentZoom/2:0), 
											 Opcje.currentZoom*scale, 
											 Opcje.currentZoom*scale);
				}
				
				for (var x=0;x<this.npcCoordInfo.length;x++)
				{
					var mode=this.npcCoordInfo[x][0];
					var ux=this.npcCoordInfo[x][1];
					var uy=this.npcCoordInfo[x][2];
					
					this.currentCTX.fillStyle = this.MapColors2[this.npcCoordInfo[x][0]*8+this.state];
					//make hero 2 times bigger
					var scale = (parseInt(mode)==5)? 2:1;
					this.currentCTX.fillRect(this.npcCoordInfo[x][1]*Opcje.currentZoom -((scale==2)?Opcje.currentZoom/2:0),
											 this.npcCoordInfo[x][2]*Opcje.currentZoom -((scale==2)?Opcje.currentZoom/2:0), 
											 Opcje.currentZoom*scale, 
											 Opcje.currentZoom*scale);
				}
				for (var x=0;x<this.itemCoordInfo.length;x++)
				{
					var mode=this.itemCoordInfo[x][0];
					var ux=this.itemCoordInfo[x][1];
					var uy=this.itemCoordInfo[x][2];
					
					this.currentCTX.fillStyle = this.MapColors2[this.itemCoordInfo[x][0]*8+this.state];
					//make hero 2 times bigger
					var scale = (parseInt(mode)==5)? 2:1;
					this.currentCTX.fillRect(this.itemCoordInfo[x][1]*Opcje.currentZoom -((scale==2)?Opcje.currentZoom/2:0),
											 this.itemCoordInfo[x][2]*Opcje.currentZoom -((scale==2)?Opcje.currentZoom/2:0), 
											 Opcje.currentZoom*scale, 
											 Opcje.currentZoom*scale);
				}
				for (var x=0;x<this.staticCoordInfo.length;x++)
				{
					var mode=this.staticCoordInfo[x][0];
					var ux=this.staticCoordInfo[x][1];
					var uy=this.staticCoordInfo[x][2];
					
					this.currentCTX.fillStyle = this.MapColors2[this.staticCoordInfo[x][0]*8+this.state];
					//make hero 2 times bigger
					var scale = (parseInt(mode)==5)? 2:1;
					this.currentCTX.fillRect(this.staticCoordInfo[x][1]*Opcje.currentZoom -((scale==2)?Opcje.currentZoom/2:0),
											 this.staticCoordInfo[x][2]*Opcje.currentZoom -((scale==2)?Opcje.currentZoom/2:0), 
											 Opcje.currentZoom*scale, 
											 Opcje.currentZoom*scale);
				}					
				if (this.foeCoordInfo.length==3)
				{
					
					this.currentCTX.fillStyle = this.MapColors2[this.foeCoordInfo[0]*8+this.state];
					this.currentCTX.fillRect (this.foeCoordInfo[1]*Opcje.currentZoom, this.foeCoordInfo[2]*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);
				}
			}	
		}
	
	this.CanvasMouseMove = function(e)
	{
		if (this.lastx === undefined) this.lastx = -1;
		if (this.lasty === undefined) this.lasty = -1;
		if (this.busy === undefined) this.busy = false;
		if (this.busy || !mMargo.mapLoaded) return false;

		this.busy = true;
		var pos = $('#canvasmarg').offset();
		var cx = ""+Math.floor((e.pageX - pos.left) / Opcje.currentZoom);
		var cy = ""+Math.floor((e.pageY - pos.top) / Opcje.currentZoom);
		var show = false;
		if (cx==this.lastx && cy==this.lasty) { this.busy=false; return;}
		this.lastx=cx;
		this.lasty=cy;
		searchGroup=0;
		var tx = ""+(cx*Opcje.currentZoom+pos.left-30)+"px";
		var ty = ""+(cy*Opcje.currentZoom+pos.top+15)+"px";

		var hero = unsafeWindow._hero;

		var info='';
		var allinfo = '<table cellspacing=7>';	
		if (hero.x==cx && hero.y==cy)
		{
			var img = '<div style="text-align:center;vertical-align:middle;background-image: url(&quot;'+'http://game1.margonem.pl/'+unsafeWindow._hero.icon+'&quot;); display: block; width: 32px; height: 48px; left: 256px; top: 240px; background-position: 0px 0px; z-index: 33;repeat:none;"></div>';
			info ='<tr>';
			info+='<td  style="text-align:center;vertical-align:middle;"><b><font color=#9ACD32  size=2>'+hero.nick+'</font></b><br>';
			info+='<font color=#cccccc size=1>['+hero.x+','+hero.y+']</font></td>';
			info+='<td valign=top>'+img+'</td></tr>';
			show = true;
		}
		allinfo+=info;
        
		
		//items
		var list = unsafeWindow._g.item;
		for (var i in list) 
		{
			if (list[i].x==cx && list[i].y==cy && list[i].loc=="m")
			{
				info='<tr><td style="text-align:center;vertical-align:middle;">';
				info+='<b><font color=#F5DEB3 size=2>'+list[i].name+'</font></b>';
				info+='<br><font color=#cccccc size=1>['+list[i].x+','+list[i].y+']</font>';
				var img = '<div style="text-align:center;vertical-align:middle;background-image: url(&quot;'+'http://game1.margonem.pl/obrazki/itemy'+'/'+list[i].icon+'&quot;); display: block; width: 32px; height: 32px; left: 256px; top: 240px; background-position: 0px 0px; z-index: 33;background-repeat:no-repeat;"></div>';
				info+='</td><td>'+img+'</td></tr>';
				allinfo+=info;
				show = true;
			}
		}

		var npcavailable = "";
		var list = unsafeWindow._g.npc;
		for (var i in list) 
		{
			if (list[i].x==cx && list[i].y==cy)
			{
					info='<tr><td style="text-align:center;vertical-align:middle;">';
					info+='<b><font color=#9ACD32	size=2>'+list[i].nick+'</font></b>';
					info+='<br><font color=#F5DEB3 size=1>Level: '+list[i].lvl+'</font>';
					if (list[i].wt > 79){    info+='<br><font color=#E6E6FA size=1>Hero</font>';	}
					else if (list[i].wt > 29){ info+='<br><font color=#00ffff size=1>Elita III</font>'; }
					else if (list[i].wt > 19){ info+='<br><font color=#00ffff size=1>Elita II</font>'; }
					else if (list[i].wt > 9) { info+='<br><font color=#00ffff size=1>Elita</font>'; }
					if (list[i].qm > 0) { info+='<br><font color=#FFA500 size=1>Quest</font>'; }
					if (list[i].grp>0) info+='<br><font color=#FFA500 size=1>Grupa #'+list[i].grp+'</font>';
					info+='<br><font color=#cccccc size=1>['+list[i].x+','+list[i].y+']</font>';
					info+='</td><td style="text-align:center;vertical-align:middle;"><img src="'+'http://game1.margonem.pl/'+list[i].icon+'"></td></tr>';
					allinfo+=info;
					show = true;
					searchGroup=list[i].grp;
					if (list[i].type==0 || list[i].type==5)
					{
						npcavailable+=list[i].x+","+list[i].y+";";
					}
				//	break;
			}
		}		
//		npcstr += npclist[w].type+":"+npclist[w].nick+":"+npclist[w].x+":"+npclist[w].y+":"+npclist[w].wt+":"+npclist[w].icon+":"+npclist[w].lvl+":"+npclist[w].qm+";"

		//0:Tomasz:34:50:0:/obrazki/npc/dzi/npc191.gif:4:0
			//[0]type
			//[1]name
			//[2][3]x,y
			//[4]lvl <- wt
			//[5]icon
			//[6]wt -> lvl
			//[7]qm
			
		if (NPC_STATIC_LIST.length>0)
		{
			for (var w in NPC_STATIC_LIST)
			{
				if (parseInt(NPC_STATIC_LIST[w][2])==cx && parseInt(NPC_STATIC_LIST[w][3])==cy)
				{
				
				  var pos=NPC_STATIC_LIST[w][2]+","+NPC_STATIC_LIST[w][3]+";";
				  if (npcavailable.indexOf(pos)<0)
				  {
					info='<tr><td style="text-align:center;vertical-align:middle;">';
					info+='<b><font color=#9ACD32	size=2>'+NPC_STATIC_LIST[w][1]+'</font></b>';
					info+='<br><font color=#F5DEB3 size=1>Level: '+NPC_STATIC_LIST[w][6]+'</font>';
					var wt=parseInt(NPC_STATIC_LIST[w][4]);
					if (wt > 79){    info+='<br><font color=#E6E6FA size=1>Hero</font>';	}
					else if (wt > 29){ info+='<br><font color=#00ffff size=1>Elita III</font>'; }
					else if (wt > 19){ info+='<br><font color=#00ffff size=1>Elita II</font>'; }
					else if (wt > 9) { info+='<br><font color=#00ffff size=1>Elita</font>'; }
					if (parseInt(NPC_STATIC_LIST[w][7]) > 0) { info+='<br><font color=#FFA500 size=1>Quest</font>'; }
					info+='<br><font color=#cccccc size=1>['+parseInt(NPC_STATIC_LIST[w][2])+','+parseInt(NPC_STATIC_LIST[w][3])+']</font>';
					info+='</td><td style="text-align:center;vertical-align:middle;"><img src="'+'http://game1.margonem.pl/'+NPC_STATIC_LIST[w][5]+'"></td></tr>';
					allinfo+=info;
					show = true;
				  }
				}
			}
		}
	

		if (HERO_LIST.length>0)
		{
			for (var w in HERO_LIST)
			{
				if (parseInt(HERO_LIST[w][0])==cx && parseInt(HERO_LIST[w][1])==cy)
				{
					var z=-1;
					for (var i in TITAN_HEROS_TABLE)
					{
						if (TITAN_HEROS_TABLE[i][0]==HERO_LIST[w][2]) { z=i; break; }
					}
					var pos=HERO_LIST[w][0]+","+HERO_LIST[w][1]+";";
					
					if (z!=-1)
					{	//["Dziewicza Orlica",	"Tytan",	"51",	"Mag",		"/obrazki/npc/pot/titanharpy.gif"],
						info='<tr><td style="text-align:center;vertical-align:middle;">';
						info+='<b><font color=#F5DEB3	size=1>Miejsce odradzania się '+TITAN_HEROS_TABLE[z][1]+'a</font></b>';
						info+='<br><font color=#9ACD32 size=3>'+HERO_LIST[w][2]+'</font>';
						info+='<br><font color=#F5DEB3 size=1>Level: '+TITAN_HEROS_TABLE[z][2]+'</font>';
						info+='<br><font color=#F5DEB3 size=1>'+TITAN_HEROS_TABLE[z][3]+'</font>';
						info+='<br><font color=#F5DEB3 size=1>Ostatnio widziany</font>';
						info+='<br><font color=#F5DEB3 size=1>'+HERO_LIST[w][3]+'</font>';
						info+='</td><td style="text-align:center;vertical-align:middle;"><img src="'+TITAN_HEROS_TABLE[z][4]+'"></td></tr>';
					}
					else
					{
						info='<tr><td style="text-align:center;vertical-align:middle;">';
						info+='<b><font color=#F5DEB3	size=1>Miejsce odradzania się Herosa</font></b>';
						info+='<br><font color=#9ACD32 size=3>'+HERO_LIST[w][2]+'</font>';
						info+='<br><font color=#F5DEB3 size=1>Ostatnio widziany</font>';
						info+='<br><font color=#F5DEB3 size=1>'+HERO_LIST[w][3]+'</font>';
						info+='</td><td style="text-align:center;vertical-align:middle;"><img src="'+'http://game1.margonem.pl/obrazki/itemy/neu/karodama.gif"></td></tr>';
					}
					allinfo+=info;
					show = true;
				}
			}
		}
	
		var list = unsafeWindow._g.other;
		for (var i in list) 
		{
			if (list[i].x==cx && list[i].y==cy)
			{

				info='<tr><td  style="text-align:center;vertical-align:middle;">';
				info+='<b><font color=#9ACD32  size=2>'+list[i].nick+'</font></b>';
				info+='<br><font color=#F5DEB3 size=1>Level: '+list[i].lvl+'</font>';
				if (list[i].clan != undefined && list[i].clan!=0) info+='<br><font color=#FFD700 size=1>'+list[i].clan+'</font>';
				if (list[i].prof.length>1)
					info+='<br><font color=#7FFFD4 size=1>'+list[i].prof+'</font>';
				else
					info+='<br><font color=#7FFFD4 size=1>'+unsafeWindow._eq.prof[list[i].prof]+'</font>';
				info+='<br><font color=#cccccc size=1>['+list[i].x+','+list[i].y+']</font>';
				if (list[i].nick in ENEMY_LIST) info+='<br><font color=#cccccc size=1>'+ENEMY_LIST[list[i].nick]+'</font>';

				var img = '<div style="text-align:center;vertical-align:middle;background-image: url(&quot;'+'http://game1.margonem.pl/obrazki/postacie'+list[i].icon+'&quot;); display: block; width: 32px; height: 48px; left: 256px; top: 240px; background-position: 0px 0px; z-index: 33;repeat:none;"></div>';
				info+='</td><td>'+img+'</td></tr>';
				allinfo+=info;
				show = true;
				if ($('div#selectedPlayer').is(":visible"))
				{
					selectedPlayerName = list[i].nick;
					selectedPlayerId = list[i].id;
					$('div#selectedPlayer').text(list[i].nick);
				}
				else 
				{
					trace("niewidoczny");
				}
			}
		}

		var list = mMargo.gateways;
		for (var i in list) 
		{
			if (list[i][0]==cx && list[i][1]==cy)
			{
				info='<tr><td style="text-align:center;vertical-align:middle;">';
				info+='<b><font color=#F5DEB3 size=2>'+list[i][2]+'</font></b>';
				info+='<br><font color=#cccccc size=1>['+list[i][0]+','+list[i][1]+']</font>';
				info+='</td><td style="text-align:center;vertical-align:middle;"><img src="'+'http://game1.margonem.pl/img/exit.png'+'"></td></tr>';
				allinfo+=info;
				show = true;
				break;
			}
		}
		var list = mMargo.rips;
		for (var i in list) 
		{
			if (list[i][0]==cx && list[i][1]==cy)
			{
				info='<tr><td style="text-align:center;vertical-align:middle;">';
				info+='<b><font color=#F5DEB3 size=2>'+list[i][2]+'</font></b>';
				info+='<br><font color=#cccccc size=1>['+list[i][0]+','+list[i][1]+']</font>';
				info+='</td><td style="text-align:center;vertical-align:middle;"><img src="'+'http://game1.margonem.pl/img/exit.png'+'"></td></tr>';
				allinfo+=info;
				show = true;
				break;
			}
		}
		if (show)
		{
			$('#cnvtooltip').css({'left': tx,'top':ty});
			allinfo+='</table>';
			$('#cnvtooltip').html(allinfo);
			$('#cnvtooltip').css({'display':'block'});
			tooltipOn = true;
			
		}
		else
		{
			$('#cnvtooltip').css({'display':'none'});
			tooltipOn = false;
		}

		this.busy = false;

	}

	
	}


//====================================================================================================
// Floodfill procedure
//====================================================================================================

	var Stack = [];
	function floodFill(x, y)
	{
		fillPixel(x, y);
		while(Stack.length>0)
		{
			toFill = Stack.pop();
			fillPixel(toFill[0], toFill[1]);
		}
	}

	function fillPixel(x, y){
		if(!alreadyFilled(x, y)) fill(x, y);
		if(!alreadyFilled(x,   y-1)) Stack.push([x,   y-1]);
		if(!alreadyFilled(x+1, y  )) Stack.push([x+1, y  ]);
		if(!alreadyFilled(x,   y+1)) Stack.push([x,   y+1]);
		if(!alreadyFilled(x-1, y  )) Stack.push([x-1, y  ]);
	}

	function fill(x, y){ 
		mMargo.mapArray[x+mapx*y] |= mapFreeRegion; 
		mMargo.mapArray[x+mapx*y] &= ~mapUndefinedRegion;
	}

	function alreadyFilled(x, y){
		if (x<0 || y<0 || x>=mapx || y>=mapy) return true;
		var a = mMargo.mapArray[x+mapx*y];
		if (a&mapNoEntryRegion || a&mapFreeRegion || a&mapNonKillNPC || a&mapStoryNPC) return true;
		return false;
	}

//====================================================================================================
// End of floodfill
//====================================================================================================
	
	
function moduleMapaMargonem()
{
	this.ActiveMap = null;
	this.MapImg = null;
	this.mapLoaded = false;
		
	// declare new array with the size exceeding the biggest one, so it will never resize
	this.mapArray = new Array(map_max_y*map_max_x);
	this.mapArrayInit = true;
	
	this.nhero = 0;
	this.nuser = 0;
	this.nuserfuri = 0;
	this.nuserfurix = -1;
	this.nuserfuriy = -1;

	this.enemyCoords = [];

	
	this.elite1 = 0;
	this.elite2 = 0;
	this.elite2Name = "";
	this.elite3 = 0;
	this.mapid = -1;	
	this.troop = 0;
	this.troopnames = '';
	this.troophighestlvl = 0;		
	this.troophighestlvlid = 0;
	this.troophighestlvlhp = 0;
	this.trooplowestlvl = 1000;		
	this.trooplowestlvlid = 0;
	this.trooplowestlvlhp = 0;
	this.arrowsok = true;

	this.gateways = [];
	this.rips = [];
	this.lastExp = 0;
	this.lastEarnedExp = 0;
	//==========================

	this.GetCurrentExp = function()
	{
		var doctitle = '';			
		var expstr = '';
		
		if (unsafeWindow._hero==null) return [];
		var hero = unsafeWindow._hero;
		if ( !(hero.exp === undefined))
		{
			var nextexp = Math.pow(hero.lvl, 4) + 10;
			var prevexp = Math.pow(hero.lvl - 1, 4) + 10;

			var currexp = parseInt(hero.exp);
			var expdelta = 0;
	
			if (this.lastExp>0) expdelta = currexp - this.lastExp;

			if (expdelta>0) this.lastEarnedExp = expdelta;
			if (hero.lvl == 1) { prevexp = 0 }
			var u = ''+Math.floor(Math.min(1, Math.max((currexp - prevexp) / (nextexp - prevexp), 0.001))*10000);
			u = u.substr(0,u.length-2)+'.'+	u.substr(u.length-2);
			this.lastExp = currexp;
			//if (currexp) 
			{
				if (hero.lvl<100)
				{
					expstr = '<FONT color="#88ff00" style="font-size:1em"><b>Nast\u0119pny level:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font><FONT color="#ccffff">'+Math.round((nextexp-currexp))+' ('+u+'%)</font>';
					doctitle = ''+Math.round(nextexp-currexp)+' ('+u+'%)';
					
				}
				else
				{
					expstr = '<FONT color="#88ff00" style="font-size:1em"><b>Nast\u0119pny level:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font><FONT color="#ccffff">'+Math.round((nextexp-currexp)/1000)+'k ('+u+'%)</font>';
					doctitle = ''+Math.round((nextexp-currexp)/1000)+'k ('+u+'%)';
				}
				expstr += '<br><FONT color="#88ff00" style="font-size:1em"><b>Ostatnia walka:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font><FONT color="#ccffff">'+this.lastEarnedExp+'</font>';
			}
			
		}
		return [expstr, doctitle];
	}
	this.GetCurrentExpMin = function()
	{
		var expstr = '';
		var hero = unsafeWindow._hero;
		if ( !(hero.exp === undefined))
		{
			var currexp = parseInt(hero.exp);
			var nextexp = Math.pow(hero.lvl, 4) + 10;
			var prevexp = Math.pow(hero.lvl - 1, 4) + 10;
			if (hero.lvl == 1) { prevexp = 0 }
			var u = Math.floor(Math.min(1, Math.max((currexp - prevexp) / (nextexp - prevexp), 0.001))*100);
			if (hero.lvl<100)
				expstr = '<FONT color="#88ff00"><b>Exp</b>&nbsp;</font><FONT color="#ccffff">'+Math.round(nextexp-currexp)+' ('+u+'%)</font>';
			else
				expstr = '<FONT color="#88ff00"><b>Exp</b>&nbsp;</font><FONT color="#ccffff">'+Math.round((nextexp-currexp)/1000)+'k ('+u+'%)</font>';
		}
		return expstr;
	}
	
	this.isGray = false;
	this.screenGrayOut = function(mode)
	{
		if (mode && !this.isGray)
		{
			this.isGray = true;
			$('#screen').css({ 'z-index':10,'display': 'block',opacity: 0.7, 'position':'absolute', 'left':0, 'top':0, 'background':'#000', 'width':$(document).width(),'height':$(document).height()});
		}
		if (!mode && this.isGray)
		{
			this.isGray = false;
			$('#screen').css({'display': 'none'});
		}
	}
	
	this.lastExp = -1;
	this.updateGameInfo = function()
	{
		var infotxt = '<table BORDER=0 cellspacing=3 style="font-family:arial;font-size:8pt;">';
		if (unsafeWindow._hero.exp == this.lastExp) return;
		r = this.GetCurrentExp();
		if (r.length==2)
		{		
			infotxt += '<tr><td colspan="12">'+r[0]+'</td></tr>';		
			if (unsafeWindow._g.dead)
				document.title = "Dazed";
			else
				document.title = r[1]+" ";
		}
		infotxt += '</table>';
		$('#gameinfo').html(infotxt);	   	
	}

////
	this.detectGateways = function()
	{
		this.gateways = [];		
		$("div.gw",window.opener.document).each(function(index){
			mMargo.gateways[mMargo.gateways.length] = [parseInt($(this).css('left'))>>5,parseInt($(this).css('top'))>>5,$(this).attr('tip')];
		});
	}
	this.detectRips = function()
	{
		this.rips = [];		
		$("div.rip",window.opener.document).each(function(index){
			mMargo.rips[mMargo.rips.length] = [parseInt($(this).css('left'))>>5,parseInt($(this).css('top'))>>5,$(this).attr('tip')];
		});
	}

	this.SetupMap = function()
	{		
		if (this.ActiveMap != unsafeWindow._img) 
		{	
			if (tooltipOn) { $('#cnvtooltip').css({'display': 'none'});  tooltipOn = false; }
 
			mCanvas.CreateHiddenCanvas(unsafeWindow._map.x,unsafeWindow._map.y);
			var ret = mCanvas.ImageToHiddenCanvas(unsafeWindow._img); // true if error
			if (ret) return;

		    var mapinfo='<table><tr><td><FONT color="#88ff00"><b>Mapa:</b>&nbsp;&nbsp;</font></td><td style="font-weight:bold"><FONT color="#ccffff">'+unsafeWindow._map.name+'&nbsp;&nbsp;('+unsafeWindow._map.id+')</font></td></tr></table>';
			$('#mapinfo').html(mapinfo);
			var d = new Date();
			var hr=d.getHours(); if (hr<10) hr='0'+hr;
			var mn=d.getMinutes(); if (mn<10) mn='0'+mn;
			var sc=d.getSeconds(); if (sc<10) sc='0'+sc;
			this.ActiveMap = unsafeWindow._img;			
			this.mapLoaded = true;
			this.mapArrayInit = true;

			var curMap = GM_getValue(unsafeWindow._hero.id+"_"+"margoMapCurrent", 0);

			if (curMap != unsafeWindow._map.id)
			{
				Opcje.locationCurrent = unsafeWindow._map.id;
				Opcje.locationPrevious = curMap;
				Opcje.SaveLocation();
			}
			mCanvas.foeCoordInfo = [];
			mCanvas.CreateDrawingCanvas(Opcje.currentZoom);
			this.mapid = parseInt(unsafeWindow._map.id);
			this.detectGateways();
			this.detectRips();

			heronotify = false;
			mychat.currentLength = 0;
			mychat.chatSend("<BR><span style='font-size:14px;color:#FFCC00'>"+unsafeWindow._map.name+"&nbsp;</span><br>(ID="+unsafeWindow._map.id+")&nbsp;["+hr+":"+mn+":"+sc +"]&nbsp;"+mMargo.GetCurrentExpMin()+"<BR>");
			mActive.SetupLocation();
			if (GM_getValue(unsafeWindow._hero.id+"_"+"margoActionEnabled", false)) 
			{
				actionState = mActive.fight_mode;
				GM_setValue(unsafeWindow._hero.id+"_"+"margoActionEnabled", false)
			}
			console.log("Stan:" + actionState);
			mQuest.getCurrentQuest();
			mQuest.quest_reloaded = true;
			//GM_setValue(unsafeWindow._hero.nick+"_"+"margoQuest", 0);
		}
	}
	
	this.SetNoAccess = function(x,y) { this.mapArray[x+y*mapx] = mapNoEntryRegion; };
	this.SetNoAccessRect = function(x,y,w,h) { 
		for (var xx=x;xx<=w;xx++)	{
			for (var yy=y;yy<=h;yy++) this.SetNoAccess(xx,yy);
		}
	};
	
	this.createMapArray = function()
	{

		var map = unsafeWindow._map;
		mapx=map.x;
		mapy=map.y;
		var mapsize=map.x*map.y;
		for (var x=0; x<mapsize; x++)
		{
			if (map.col.charAt(x)=='1') this.mapArray[x] = mapNoEntryRegion;
			else this.mapArray[x] = mapUndefinedRegion;
		}
		if (map.id == 1162){
			this.SetNoAccessRect(24,28,31,33);
			this.SetNoAccessRect(13,37,17,41);
			this.SetNoAccessRect(44,27,47,32);
			this.SetNoAccessRect(44,13,48,17);
		}
		if (map.id == 210){
			this.SetNoAccessRect(10,23,13,23);
		}				
		if (map.id == 257) this.mapArray[49+2*mapx] = mapNoEntryRegion;
		if (map.id == 1113) this.mapArray[0+10*mapx] = mapNoEntryRegion;
	
		if (map.id == 1761) 
		{
			this.mapArray[89+48*mapx] = mapNoEntryRegion;
		}
		
		if (map.id == 976) 
		{
			// this.mapArray[45+41*mapx] = mapNoEntryRegion;
			// this.mapArray[45+42*mapx] = mapNoEntryRegion;
			// this.mapArray[45+43*mapx] = mapNoEntryRegion;
		}
		if (map.id == 973) 
		{
			//this.SetNoAccessRect(37,22,59,43);
			//this.SetNoAccessRect(65,28,76,36);
		}
		if (map.id == 608) 
		{
			this.SetNoAccessRect(9,57,15,62);
			this.SetNoAccessRect(28,21,35,26);
			this.SetNoAccessRect(22,32,24,35);
        }
		if (map.id == 975) 
		{
			// this.mapArray[37+17*mapx] = mapNoEntryRegion;
			// this.mapArray[36+17*mapx] = mapNoEntryRegion;
			// this.mapArray[25+17*mapx] = mapNoEntryRegion;
			// this.mapArray[26+17*mapx] = mapNoEntryRegion;
			// this.mapArray[30+26*mapx] = mapNoEntryRegion;
			// this.mapArray[31+26*mapx] = mapNoEntryRegion;
			// this.mapArray[32+26*mapx] = mapNoEntryRegion;
			// this.mapArray[53+15*mapx] = mapNoEntryRegion;
			// this.mapArray[54+15*mapx] = mapNoEntryRegion;
			// this.mapArray[55+15*mapx] = mapNoEntryRegion;
		}
		if (map.id == 977) 
		{	
			this.mapArray[31+33*mapx] = mapNoEntryRegion;
			this.mapArray[32+33*mapx] = mapNoEntryRegion;
		}
		if (map.id == 979) 
		{
			// this.mapArray[8+38*mapx] = mapNoEntryRegion;
			// this.mapArray[9+40*mapx] = mapNoEntryRegion;
			// this.mapArray[9+41*mapx] = mapNoEntryRegion;					
			// this.mapArray[9+54*mapx] = mapNoEntryRegion;
			// this.mapArray[9+55*mapx] = mapNoEntryRegion;					
			// this.mapArray[60+52*mapx] = mapNoEntryRegion;
			// this.mapArray[59+53*mapx] = mapNoEntryRegion;					
			// this.mapArray[59+54*mapx] = mapNoEntryRegion;
		}
		if (map.id == 1111)
		{
			this.mapArray[2+18*mapx] = mapNoEntryRegion;
		}
		floodFill(unsafeWindow._hero.x,unsafeWindow._hero.y);
	}
	
	this.maskAllNpc = mapNonKillNPC|mapFightingNPC|mapAttackingNPC|mapStaticItem|mapStoryNPC|mapHero|mapEliteIII|mapEliteII|mapElite;
	this.mapArrayMaskRemove = function(mask)
	{
		var mapsize = mapx*mapy;
		for (var x=0; x<mapsize; x++)
		{		
			this.mapArray[x] &= (~mask);
		}
	}
	
	
	this.grp=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this.setupMapArray = function (b)
	{
		mCanvas.heroCoordInfo[0]=[1, unsafeWindow._hero.x, unsafeWindow._hero.y];		

		if (!b) return;


		
		var search=Opcje.mapSearch.toLowerCase();
			
		if (this.mapArrayInit)
		{
			this.mapArrayInit = false;
			this.createMapArray();
		}
//		updating npc map if changed
		if (updateNpc)
		{
			this.elite1 = 0;
			this.elite2 = 0;
			this.elite3 = 0;
			this.npccount = 0;
			this.nhero = 0;
			this.heroposx = 0;
			this.heroposy = 0;
			this.heroname = 0;
			this.mapArrayMaskRemove(this.maskAllNpc);
			mCanvas.npcCoordInfo = [];
			for (var i=this.grp.length-1; i>=0; i--) this.grp[i]=0;
			//static npc list from the server
			if (NPC_STATIC_LIST.length>0)
			{
				for (var w in NPC_STATIC_LIST)
				{
					var c = parseInt(NPC_STATIC_LIST[w][2]) + mapx*parseInt(NPC_STATIC_LIST[w][3]);
					var k = parseInt(NPC_STATIC_LIST[w][0]);
					switch (k) {
						case 0: this.mapArray[c] |= mapNonKillNPC; break;
						case 2: this.mapArray[c] |= mapFightingNPC; break;
						case 3: this.mapArray[c] |= mapAttackingNPC; break;
						case 4: this.mapArray[c] |= mapStaticItem; break;
						case 5: this.mapArray[c] |= mapStoryNPC; break;
						default: ;
					}
					var wtype = parseInt(NPC_STATIC_LIST[w][4]);
					if (wtype>29) { this.mapArray[c] |= mapEliteIII; this.elite3++; }
					else if (wtype>19) { this.mapArray[c] |= mapEliteII; this.elite2++;  }
					else if (wtype> 9) { this.mapArray[c] |= mapElite; this.elite1++; }
					//blink hero
					else if (wtype>79) { this.mapArray[c] |= mapHero; mCanvas.npcCoordInfo[mCanvas.npcCoordInfo.length] = [5,parseInt(NPC_STATIC_LIST[w][2]),parseInt(NPC_STATIC_LIST[w][3])]; this.nhero++;}
				
					////////////////////////////////////////
					// search
					////////////////////////////////////////
					if (Opcje.mapSearch!='' && NPC_STATIC_LIST[w][1].toLowerCase().indexOf(search)>=0) {
						mCanvas.npcCoordInfo[mCanvas.npcCoordInfo.length] = [7,parseInt(NPC_STATIC_LIST[w][2]),parseInt(NPC_STATIC_LIST[w][3])]; 
					}
					////////////////////////////////////////
				}
			}
	
			if (HERO_LIST.length>0)
			{
				for (var w in HERO_LIST)
				{
		            mCanvas.npcCoordInfo[mCanvas.npcCoordInfo.length] = [7,parseInt(HERO_LIST[w][0]),parseInt(HERO_LIST[w][1])]; 		
				}
			}		
				
			var npclist = unsafeWindow._g.npc;
			for (var w=0 in npclist)
			{
				this.npccount++;
				var c = npclist[w].x + mapx*npclist[w].y;
				var k = npclist[w].type;
				switch (k) {
					case 0: this.mapArray[c] |= mapNonKillNPC; break;
					case 2: this.mapArray[c] |= mapFightingNPC; break;
					case 3: this.mapArray[c] |= mapAttackingNPC; break;
					case 4: this.mapArray[c] |= mapStaticItem; break;
					case 5: this.mapArray[c] |= mapStoryNPC; break;
					default: ;
				}
				var wtype = npclist[w].wt;
				if (wtype>79) { 
					this.mapArray[c] |= mapHero; mCanvas.npcCoordInfo[mCanvas.npcCoordInfo.length] = [5,parseInt(npclist[w].x),parseInt(npclist[w].y)]; this.nhero++;
					this.heroname=npclist[w].nick;
					this.heroposx=npclist[w].x;
					this.heroposy=npclist[w].y;
				}
				else if (wtype>29) { this.mapArray[c] |= mapEliteIII; this.elite3++; }
				else if (wtype>19) { this.mapArray[c] |= mapEliteII; this.elite2++; this.elite2Name = npclist[w].nick;}
				else if (wtype> 9) { this.mapArray[c] |= mapElite; this.elite1++; }
				
				if  (npclist[w].type==3 || npclist[w].type==2)
				{
					this.grp[npclist[w].grp]++;
				}
				////////////////////////////////////////
				// search
				////////////////////////////////////////
				if (Opcje.mapSearch!='' && npclist[w].nick.toLowerCase().indexOf(search)>=0) {
					mCanvas.npcCoordInfo[mCanvas.npcCoordInfo.length] = [7,parseInt(npclist[w].x),parseInt(npclist[w].y)]; 
				}
				if (searchGroup>0 && npclist[w].grp==searchGroup)
				{
					mCanvas.npcCoordInfo[mCanvas.npcCoordInfo.length] = [7,parseInt(npclist[w].x),parseInt(npclist[w].y)]; 
				}
				////////////////////////////////////////
			}

		} // updateNpc

		////////////////////////////////////////
		// search
		////////////////////////////////////////
		if (Opcje.mapSearch!='') 
		{
			mCanvas.staticCoordInfo = [];
			var list = this.gateways;
			for (var i in list) 
			{
				if (list[i][2].toLowerCase().indexOf(search)>=0)
				{
					mCanvas.staticCoordInfo[mCanvas.staticCoordInfo.length] = [7,list[i][0],list[i][1]]; 
				}
			}					
		}
	
		if (updateItem)
		{
			mCanvas.itemCoordInfo = [];
			this.mapArrayMaskRemove(mapItem);
			var items = unsafeWindow._g.item;
			for (var w=0 in items)
			{
				if (items[w].loc=="m") 
				{
					var c = items[w].x + items[w].y*mapx;
					this.mapArray[c] |= mapItem;
					if (Opcje.mapSearch!='' && items[w].name.toLowerCase().indexOf(search)>=0) {
						mCanvas.itemCoordInfo[mCanvas.itemCoordInfo.length] = [7,parseInt(items[w].x),parseInt(items[w].y)]; 
					}
				}
			}
		}
			
	
		if (updateOther)
		{
			mCanvas.userCoordInfo = [];
			this.enemyCoords = [];
			this.enemyCoords[0] = 0;
			

			this.nuser = 1;
			this.avguserdist = 1000;
			this.mapArrayMaskRemove(mapPlayer);
			var otherlist = unsafeWindow._g.other;
            var str = "<b style='color: #f00'>Wrogowie:</b><br>";
            var strFr = "<br><b style='color: #0f0'>Przyjaciele:</b><br>";
            for (var w=0 in otherlist)
			{
				var c = otherlist[w].x + mapx*otherlist[w].y;
				this.avguserdisttemp = Math.abs(otherlist[w].x - unsafeWindow._hero.x) + Math.abs(otherlist[w].y - unsafeWindow._hero.y);
				if (this.avguserdist > this.avguserdisttemp) this.avguserdist = this.avguserdisttemp;
				this.nuser++;	
				this.mapArray[c] |= mapPlayer;

				if (Opcje.mapSearch!='' && otherlist[w].nick.toLowerCase().indexOf(search)>=0) mCanvas.userCoordInfo[mCanvas.userCoordInfo.length] = [7,parseInt(otherlist[w].x),parseInt(otherlist[w].y)]; 
				if (otherlist[w].nick in ENEMY_LIST) mCanvas.userCoordInfo[mCanvas.userCoordInfo.length] = [8,parseInt(otherlist[w].x),parseInt(otherlist[w].y)];
				// wrogi klan
                if (enemyClans.indexOf(otherlist[w].clan)>0) 
                { 
                    mCanvas.userCoordInfo[mCanvas.userCoordInfo.length] = [8,parseInt(otherlist[w].x),parseInt(otherlist[w].y)]; 
                    str+="<p style='color:red;' id='enemytarget_"+otherlist[w].id+"' onclick='target_action("+otherlist[w].id+",0);'>"+otherlist[w].nick+"</p>";
    
                    if (typeof(otherlist[w].marked) == "undefined")
                    {
                        otherlist[w].marked = true;
                        $("#other"+otherlist[w].id,window.opener.document).css({"border":"2px solid #FF0000","border-collapse":"collapse"});
                    }
                }
                if (friendClans.indexOf(otherlist[w].clan)>0) 
                { 
                    mCanvas.userCoordInfo[mCanvas.userCoordInfo.length] = [9,parseInt(otherlist[w].x),parseInt(otherlist[w].y)]; 
                    strFr+="<p id='enemytarget_"+otherlist[w].id+"' onclick='target_action("+otherlist[w].id+",1);'>"+otherlist[w].nick+"</p>";
                    if (typeof(otherlist[w].marked) == "undefined")
                    {
                        otherlist[w].marked = true;
                        $("#other"+otherlist[w].id,window.opener.document).css({"border":"2px solid #66FF00","border-collapse":"collapse"});
                    }
                }
				
                
                if (enemyPlayers.indexOf("|"+otherlist[w].nick+"|")>=0) mCanvas.userCoordInfo[mCanvas.userCoordInfo.length] = [8,parseInt(otherlist[w].x),parseInt(otherlist[w].y)];
                if (otherlist[w].nick=="FurianS") { this.nuserfuri=1; this.nuserfurix = otherlist[w].x; this.nuserfuriy = otherlist[w].y; }
				
				if (enemyPlayersE2.indexOf("|"+otherlist[w].nick+"|") >=0 ) 
				{ 
					this.enemyCoords[w] = [otherlist[w].nick, otherlist[w].x, otherlist[w].y, otherlist[w].lvl];
					this.enemyCoords[0]++;
				}
				
			}	
            $("#enemylist",window.opener.document).html(str+strFr);

		}
	}
	this.battleNextID = 0;
    this.battleE2ID = 0;
    this.battleMyTeam = {};
	//this.order = "mtwhpbe2<";
	this.order = "mthpwbe2<";
    this.battleNPCCount = 0;
	this.battleFieldDetect = function()
	{
		if (isInBattle() && !battleIsEnded())
		{
			
			//// order
			
			var selectHighLevel = false;
			this.battleNextID = 0;
			var battleNextLVL = (selectHighLevel)?0:1000;
			var battleNextHP = 0;
			this.battleMyTeam = {};
            this.battleNPCCount = 0;
            var list = unsafeWindow._g.battle.f;
			var myteam = list[unsafeWindow._hero.id].team;
			var lastProfIndex = 100;
			if (this.order.length>0)
			{
				selectHighLevel = (this.order.indexOf(">") >= 0);
				//trace("High first? "+ selectHighLevel);
				battleNextLVL = (selectHighLevel)?0:1000;
				
				for (var w in list)
				{
					// nie my, zycie>0 i NPC
                    if (list[w].id<0) this.battleNPCCount++;
					if (list[w].name != unsafeWindow._hero.nick && list[w].hpp>0 && list[w].id < 0)
					{
						var prof = list[w].prof;
						if (unsafeWindow._g.npc[-w].wt > 19) { prof = "e2"; this.battleE2ID = list[w].id; }
						var p = this.order.indexOf(prof);
						if (p>=0 && p<lastProfIndex)
						{
							lastProfIndex = p;
							this.battleNextID = list[w].id;
							battleNextLVL = list[w].lvl;
							battleNextHP = list[w].hpp;
						}
					}
					if (w > 0 && list[w].hpp > 0)
					{
                        if (list[w].team != myteam)
                        {
                            this.battleNextID = w;
                            break;	
                        }
                        else
                        {
                            console.log(list[w].name);
                            this.battleMyTeam[list[w].name] = w;
                        }                        
					}
              
				}
				//trace("selected: "+lastProfIndex);
			}
			else
			{
			
				for (var w in list)
				{
					if (list[w].name != unsafeWindow._hero.nick && list[w].hpp>0 && list[w].id < 0)
					{
						if (selectHighLevel && (battleNextLVL < list[w].lvl || battleNextLVL == list[w].lvl && battleNextHP > list[w].hpp))
						{
							this.battleNextID = list[w].id;
							battleNextLVL = list[w].lvl;
							battleNextHP = list[w].hpp;
						}
						else if (!selectHighLevel && (battleNextLVL > list[w].lvl || battleNextLVL == list[w].lvl && battleNextHP > list[w].hpp))
						{
							this.battleNextID = list[w].id;
							battleNextLVL = list[w].lvl;
							battleNextHP = list[w].hpp;
						}
					}
				}				
			}
			
			/*
			this.troop = 0;
			this.troophighestlvl = 0;
			this.troophighestlvlid = 0;
			this.troophighestlvlhp = 0;
			this.trooplowestlvl = 1000;
			this.trooplowestlvlid = 0;
			this.trooplowestlvlhp = 0;
			var list = unsafeWindow._g.battle.f;
			var magId = -1;
			var maglvl = 1000;
			var tropId = -1;
			var troplvl = 1000;
			for (var w in list)
			{
				if (list[w].name != unsafeWindow._hero.nick && list[w].hpp>0 && list[w].id < 0)
				{
					if (this.troophighestlvl < list[w].lvl)
					{	
						this.troophighestlvl = list[w].lvl;
						this.troophighestlvlid = list[w].id;
						this.troophighestlvlhp = list[w].hpp;
					}
					if (this.trooplowestlvl >= list[w].lvl)
					{	
						this.trooplowestlvl = list[w].lvl;
						this.trooplowestlvlid = list[w].id;
						this.trooplowestlvlhp = list[w].hpp;
					}
					if (list[w].prof=="m" && list[w].lvl<maglvl) { magId = list[w].id; maglvl = list[w].lvl; }
					if (list[w].prof=="t" && list[w].lvl<troplvl) { tropId = list[w].id; troplvl = list[w].lvl; }
					this.troop++;
				} 
				else if (list[w].name == "FurianS")
				{
					this.trooplowestlvlid = list[w].id;
				}
			}
			//trace(this.troopnames);
			if (magId!=-1) this.trooplowestlvlid = magId;
			else if (tropId!=-1) this.trooplowestlvlid = tropId;
			*/
			this.trooplowestlvlid = this.battleNextID;
		}
	}
	
	this.renderMap = function(inithidden)
	{
		var heros = unsafeWindow._hero;
        if (this.mapLoaded && newChanegesDetected()) {  
			if (inithidden)
			{
				mCanvas.DoneInit();		
				// granice
				mCanvas.tempCTX.fillStyle = "rgba(0,0,200,0.15)";	
				for (var x=0,y;x<mapx;x++) {
					for (y=0;y<mapy;y++) {
						if (this.mapArray[x+mapx*y]&mapNoEntryRegion) {	
							mCanvas.tempCTX.fillRect (x*Opcje.currentZoom, y*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);  
						}
					}
				}

				mCanvas.tempCTX.fillStyle = "rgba(255,255,100,0.3)"; 
				for (var x=0,y;x<mapx;x++) {
					for (y=0;y<mapy;y++) {
						if (this.mapArray[x+mapx*y]&mapFreeRegion) {	
							mCanvas.tempCTX.fillRect (x*Opcje.currentZoom, y*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);  
						}
					}
				}
				mCanvas.tempCTX.fillStyle = "rgba(0,0,255,0.15)"; 	
				for (var x=0,y;x<mapx;x++) {
					for (y=0;y<mapy;y++) {
						if (this.mapArray[x+mapx*y]&mapUndefinedRegion) 
						{	
							mCanvas.tempCTX.fillRect (x*Opcje.currentZoom, y*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);  
						}
					}
				}

				// gateway
				mCanvas.tempCTX.fillStyle = "#d4d4d4"; 
				for (var n in mMargo.gateways)
				{
					mCanvas.tempCTX.fillRect (mMargo.gateways[n][0]*Opcje.currentZoom, mMargo.gateways[n][1]*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);  
				}				
				
			}
			
			mCanvas.currentCTX.drawImage(mCanvas.tempCTX.canvas,0,0);



			for (var c, x=0,y;x<mapx;x++) {
				for (y=0;y<mapy;y++) {
					c = this.mapArray[x+mapx*y];
					if (c & mapStaticItem) 
					{	
						mCanvas.currentCTX.fillStyle = "#FFA500"; 
						mCanvas.currentCTX.fillRect (x*Opcje.currentZoom, y*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);  
					}
					if (c & (mapNonKillNPC|mapStoryNPC)) 
					{	
						var color = "#00FF00";
						if (c & mapElite) color = "#00FFFF";
						else if (c & mapEliteII) color = "#00FFFF";
						else if (c & mapEliteIII) color = "#00FFFF";
						else if (c & mapHero) color = "#FFFFFF";
						mCanvas.currentCTX.fillStyle = color; 
						mCanvas.currentCTX.fillRect (x*Opcje.currentZoom, y*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);  
					}
				}
			}
			
			// items
			mCanvas.currentCTX.fillStyle = "#0066FF"; 
			for (var x=0,y;x<mapx;x++)	{
				for (y=0;y<mapy;y++) {
					if (this.mapArray[x+mapx*y]&mapItem) {	
						mCanvas.currentCTX.fillRect (x*Opcje.currentZoom, y*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);  
					}
				}
			}


			for (var x=0,y, c;x<mapx;x++)	{
				for (y=0;y<mapy;y++) {
					c = this.mapArray[x+mapx*y];
					if (c & (mapFightingNPC|mapAttackingNPC)) {	// npc fight + Attack
						var color = "#FFFF00";
						if (c & mapElite) color = "#00FFFF";
						else if (c & mapEliteII) color = "#00FFFF";
						else if (c & mapEliteIII) color = "#00FFFF";
						else if (c & mapHero) color = "#FFFFFF";
						mCanvas.currentCTX.fillStyle = color; 
						mCanvas.currentCTX.fillRect (x*Opcje.currentZoom, y*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);  
					}
				}
			}
			// gracze
			mCanvas.currentCTX.fillStyle = "#FF00FF"; 
			for (var x=0,y;x<mapx;x++)	{
				for (y=0;y<mapy;y++) {
					if (this.mapArray[x+mapx*y]&mapPlayer) {	
						mCanvas.currentCTX.fillRect (x*Opcje.currentZoom, y*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);  
					}
				}
			}
       }  
		mCanvas.UpdateColor(false);
	}
	
	this.generateWalkPath = function (ax,ay,gx, gy, draw)
		{
			if (generatePath==true)
			{
				generatePath=false;
				var result=[];
                if (ax!=gx || ay!=gy)
				{
					this.GridGenerator(this.mapArray,gx+gy*mapx);
					result = AStar(Grid, [ax,ay], [gx,gy], "Manhattan", mapx, mapy);
				}
  				trace("generateWalkPath: ("+ax+","+ay+") -> ("+gx+","+gy+") distance="+result.length)

                if (result.length>0)
				{
					walkpathXY = result.slice(0);
					if (draw && document.getElementById("canvasmarg"))
					{
						var ctx = document.getElementById("canvasmarg").getContext("2d");  
						ctx.fillStyle = "#FF4400";
						for (var i = result.length-1; i>0; i--)							
						{	
							ctx.fillRect(result[i][0]*Opcje.currentZoom, result[i][1]*Opcje.currentZoom, Opcje.currentZoom, Opcje.currentZoom);  
						}
					}
					isWalking = true;
				}
			}
		}
		
		this.GridGenerator = function (arraymap, dest_xy)
		{
			var len = arraymap.length;
			var logic = (mapNoEntryRegion|mapNonKillNPC|mapStoryNPC|mapAttackingNPC|mapFightingNPC);
			for (var x=mapx*mapy-1;x>=0;x--)	{
				Grid[x] = (arraymap[x] & logic) ? 1: 0;
			}
			if (dest_xy>=0 && (arraymap[parseInt(dest_xy)] & (mapFreeRegion|mapNonKillNPC|mapStoryNPC))) { Grid[dest_xy] = 0; }
		}
		this.autoEquipArrows = function(name)
		{
			var res = false;	
			var list = unsafeWindow._g.item;
			for (var w in list)
			{
				if (list[w].cl==21 && list[w].st!=7 && list[w].loc=="g" && list[w].name == name)
				{
					if (list[w].stat.indexOf("ammo=") >= 0) 
					{
						var s = list[w].stat.split("ammo=");
						if (parseInt(s[1])>50) 
						{
							unsafeWindow.__g("moveitem&st=1&id="+list[w].id);
							res = true;
							break;
						}
					}
				}
			}
			return res;
		}
		
		this.autoLecz = function(proc)
		{
			if (unsafeWindow._g.dead || isInBattle()) return true; 
			if (parseInt(unsafeWindow._hero.hp*100/unsafeWindow._hero.maxhp) < parseInt(proc)  && Opcje.autoLeczenieItem.length>2)
			{
				var id = 0;
				var id2 = 0;
				var id3 = 0;
				var list = unsafeWindow._g.item;
				var leczitem = Opcje.autoLeczenieItem.split(";");
				for (var w in list)
				{
					if (list[w].cl == 16 && list[w].loc=="g" && list[w].name.indexOf(leczitem[0])>=0 && leczitem[0].length>2)
					{
						if (id==0 || id>list[w].id) id=list[w].id;
					}
					else if (list[w].cl == 16 && list[w].loc=="g" && list[w].name.indexOf(leczitem[1])>=0 && leczitem[1].length>2)
					{
						if (id2==0 || id2>list[w].id) id2=list[w].id;
					}
					else if (list[w].cl == 16 && list[w].loc=="g" && list[w].name.indexOf(leczitem[2])>=0 && leczitem[2].length>2)
					{
						if (id3==0 || id3>list[w].id) id3=list[w].id;
					}
					
				}
				if (id > 0)
				{
					unsafeWindow.__g("moveitem&st=1&id="+id);
				}
				else if (id2 > 0)
				{
					unsafeWindow.__g("moveitem&st=1&id="+id2);
				}
				else if (id3 > 0)
				{
					unsafeWindow.__g("moveitem&st=1&id="+id3);
				}
				return id > 0 || id2 > 0 || id3 > 0; 
			}
			return true;
		}

}

var mCanvas = new moduleCanvas();
var mMargo = new moduleMapaMargonem();
var myConn = new XHConn();


	function getItemType(tip)
	{
		var p = tip.split("Typ: ")[1];
		p = p.split("<br>")[0];
		return p;
	}
	
    function getBase64Image(img) {
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        var dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    var lootData = [];
    
    
   function encodeBase64(str){
	var chr1, chr2, chr3, rez = '', arr = [], i = 0, j = 0, code = 0;
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');

	while(code = str.charCodeAt(j++)){
		if(code < 128){
			arr[arr.length] = code;
		}
		else if(code < 2048){
			arr[arr.length] = 192 | (code >> 6);
			arr[arr.length] = 128 | (code & 63);
		}
		else if(code < 65536){
			arr[arr.length] = 224 | (code >> 12);
			arr[arr.length] = 128 | ((code >> 6) & 63);
			arr[arr.length] = 128 | (code & 63);
		}
		else{
			arr[arr.length] = 240 | (code >> 18);
			arr[arr.length] = 128 | ((code >> 12) & 63);
			arr[arr.length] = 128 | ((code >> 6) & 63);
			arr[arr.length] = 128 | (code & 63);
		}
	};

	while(i < arr.length){
		chr1 = arr[i++];
		chr2 = arr[i++];
		chr3 = arr[i++];

		rez += chars[chr1 >> 2];
		rez += chars[((chr1 & 3) << 4) | (chr2 >> 4)];
		rez += chars[chr2 === undefined ? 64 : ((chr2 & 15) << 2) | (chr3 >> 6)];
		rez += chars[chr3 === undefined ? 64 : chr3 & 63];
	};
	return rez;
}; 
    
    var bLootUpdateDone = true;
	function WScriptServLootUpdate(data)
	{
		bLootUpdateDone = false;
        var params = "op=lootupdate&mapid="+unsafeWindow._map.id+"&name="+data[0]+"&tip="+data[1]+"&img="+data[2]+"&nick="+data[3]+"&serv="+data[4]+"&itemId="+data[5];
		//trace(params);
        myConn.connect("http://exjs.home.pl/update.php", "POST", params,WScriptServLootUpdateCallback);
	}
	function WScriptServLootUpdateCallback(XML)
	{
		bLootUpdateDone = true;
        trace("WScriptServLootUpdate - XML.status: "+XML.status);	
        //trace("WScriptServLootUpdate - XML.response: "+XML.responseText);
	}
   
    function GetServ()
    {
        var serv = window.location.href.split("//")[1].split('.')[0];
        serv = 	serv.charAt(0).toUpperCase() + serv.substring(1,serv.length);
        if (serv.indexOf("Game")==0)
        {
            var names=["Classic","Tarhuna","Nerthus","Katahha","Perkun","Telawel","Lelwani","Zemyna","Hutena","Jaruna","Zorza","noname","noname","noname","noname","noname","noname"];
            serv = names[parseInt(serv.split("Game")[1])-1];
        }
        return serv;
    }
    
    var ServerName = GetServ();
    var RegLoot = true;
    trace(ServerName);
    
	function manageLoots()
	{
		if (lootData.length && bLootUpdateDone)
        {   
            WScriptServLootUpdate(lootData.pop());
        }

        if (!($('#loots',window.opener.document).is(':visible')))
        {        
            RegLoot = true;
            return;
        }
        var sprawdzamy = Opcje.IsAutoLoot(1);
        if (sprawdzamy && $('.need',window.opener.document).is(':visible') && !Opcje.IsAutoLoot(Opcje.itemWDruzynie)) sprawdzamy = false;
	    var count=0;
        var d=new Date();
        $('div.loot > div.item',window.opener.document).each(function(i){
            var image = new Image();
            var tip = $(this).attr('tip');
            var lootHero = (tip.indexOf("heroiczny")>=0);
            var lootLega = (tip.indexOf("legendarny")>=0);
            var lootUni = (tip.indexOf("unikat")>=0);
            var name = tip.substring(3,tip.indexOf('</b>'));    
            trace(name);
            
            var itemId =  "ITEM#"+$(this).attr('id').split('item')[1];
            if (RegLoot && (lootHero || lootLega || lootUni))
            {
                image.onload = function ()
                {
                    var imgstr = getBase64Image(this);
                    var a=[encodeBase64(name),encodeBase64(tip),imgstr,encodeBase64(unsafeWindow._hero.nick),ServerName,itemId];
                    lootData.push(a)
                }
                image.src = $(this).css('background-image').replace(/"/g, '').replace(/url\(|\)$/ig, '');
            }
            
            
            
            if (sprawdzamy)
            {
                count++;
            
                var zbieraj = false;		
                
                if (!lootHero && !lootUni && !lootLega) zbieraj = Opcje.IsAutoLoot(Opcje.itemZwykly) > 0;
                else if (zbieraj = (Opcje.IsAutoLoot(Opcje.itemHero) > 0 && lootHero)) mychat.ChatlogAttr(d.toTimeString().substring(0,8)+' - zdobyto '+name,"#0099ff");
                else if (zbieraj = (Opcje.IsAutoLoot(Opcje.itemUnikat)>0 && lootUni)) mychat.ChatlogAttr(d.toTimeString().substring(0,8)+' - zdobyto '+name,"#cc9900");
                else if (zbieraj = (Opcje.IsAutoLoot(Opcje.itemUnikat)>0 && lootUni)) mychat.ChatlogAttr(d.toTimeString().substring(0,8)+' - zdobyto '+name,"#33ff33");
                
                
                //trace(getItemType(tip) + "zbieramy? :"+zbieraj);

                if (!zbieraj)
                {
                    var itype = getItemType(tip);
                    var strBronie = "Jednoręczne|Dwuręczne|Półtoraręczne|Dystansowe|Pomocnicze|Różdżki|Laski";
                    var strZbroje = "Zbroje|Hełmy|Buty|Rękawice|Tarcze";
                    var strKlejnoty = "Pierścienie|Naszyjniki";
                    
                    if 		(strBronie.indexOf(itype)>=0) zbieraj = Opcje.IsAutoLoot(Opcje.itemBronie);
                    else if (strZbroje.indexOf(itype)>=0) zbieraj = Opcje.IsAutoLoot(Opcje.itemZbroje);
                    else if (strKlejnoty.indexOf(itype)>=0) zbieraj = Opcje.IsAutoLoot(Opcje.itemKlejnoty);
                    else if (itype=="Neutralne") zbieraj = Opcje.IsAutoLoot(Opcje.itemNaturalne);
                    else if (itype=="Konsumpcyjne") zbieraj = Opcje.IsAutoLoot(Opcje.itemKonsumpcyjne);
                    else if (itype=="Strzały") zbieraj = Opcje.IsAutoLoot(Opcje.itemStrzaly);
                    else if (Opcje.IsAutoLoot(Opcje.itemPozostale)) zbieraj = true;
                }

         
                var noLoot = !zbieraj;
                var itemid = $(this).attr('id');
                itemid = itemid.split('item')[1];
                if (zbieraj)
                {
                    for (var x=0;x<Opcje.lootNoLoot.length && !noLoot;x++) noLoot = noLoot || (name.indexOf(Opcje.lootNoLoot[x])>=0);
                }
                console.debug("Zbieramy: "+!noLoot);	
                if (noLoot)	{
                    unsafeWindow.setLoots(1,itemid);  // nie potrzebuje
                } else {
                    if ($(".need",window.opener.document).is(':visible')){
                        unsafeWindow.setLoots(2,itemid);  // bardzo potrzebuje
                    } else {
                        unsafeWindow.setLoots(0,itemid);  // potrzebuje
                    }
                }
            }
            
        })
        if (count)
        {
            unsafeWindow.sendLoots(1);
            $('#loots',window.opener.document).hide();
        }
        RegLoot = false;
	}

	
///////////////////////////////////////////////
//  HIGHLIGHT MODULE
///////////////////////////////////////////////
{	
	var eq_id_sum = -1;
	var eq_bag_id_sum = -1;
	var eq_bag_x_sum = -1;
	var eq_bag_y_sum = -1;

	var eq_depo_id_sum = -1;
	var eq_depo_x_sum = -1;
	var eq_depo_y_sum = -1;
	var mail_shown = 0;
	var loot_shown = 0;
	
	function highlight_reset()
	{
		eq_id_sum = -1;
		eq_bag_id_sum = -1;
		eq_bag_x_sum = -1;
		eq_bag_y_sum = -1;

		eq_depo_id_sum = -1;
		eq_depo_x_sum = -1;
		eq_depo_y_sum = -1;
		mail_shown = 0;
		loot_shown = 0;
	}
	
	function highlight_main()
	{
		if (!Opcje.showItemClass) return;

		var eq_id_sum_temp = 0;

		var eq_bag_id_sum_temp = 0;
		var eq_bag_x_sum_temp = 0;
		var eq_bag_y_sum_temp = 0;

		var eq_depo_id_sum_temp = -1;
		var eq_depo_x_sum_temp = -1;
		var eq_depo_y_sum_temp = -1;

		var list = unsafeWindow._g.item;
		for (var i in list)
		{
			if (list[i].loc=="g")
			{
				if (list[i].st>0 && list[i].st!=7 && list[i].st!=9 && list[i].st!=10)
				{
					eq_id_sum_temp += parseInt(i);
				} 
				else if (list[i].st==0)
				{
					//check only "better" items
					if (list[i].stat.indexOf("heroic")>=0 || list[i].stat.indexOf('unique')>=0 || list[i].stat.indexOf('legendary')>=0 || list[i].stat.indexOf('upgraded')>=0)
					{
						eq_bag_id_sum_temp += parseInt(i);
						eq_bag_x_sum_temp += parseInt(list[i].x);
						eq_bag_y_sum_temp += parseInt(list[i].y);
					}
				}
			}
			if (list[i].loc=="d")
			{
				if ($('#depo',window.opener.document).is(':visible'))
				{
					//check only "better" items
					if (list[i].stat.indexOf("heroic")>=0 || list[i].stat.indexOf('unique')>=0 || list[i].stat.indexOf('legendary')>=0 || list[i].stat.indexOf('upgraded')>=0)
					{
						eq_depo_id_sum_temp += parseInt(i);
						eq_depo_x_sum_temp += parseInt(list[i].x);
						eq_depo_y_sum_temp += parseInt(list[i].y);
					}
				}
				else
				{
					eq_depo_id_sum_temp = -1;
 				}
			}			
		}
		if (eq_id_sum != eq_id_sum_temp)
		{
			eq_id_sum = eq_id_sum_temp;
			highlight_eq();
		}
		if (eq_bag_id_sum != eq_bag_id_sum_temp || eq_bag_x_sum != eq_bag_x_sum_temp || eq_bag_y_sum != eq_bag_y_sum_temp)
		{
			eq_bag_id_sum = eq_bag_id_sum_temp;
			eq_bag_x_sum = eq_bag_x_sum_temp;
			eq_bag_y_sum = eq_bag_y_sum_temp;
			highlight_bag();
		}
		if (eq_depo_id_sum != eq_depo_id_sum_temp || eq_depo_x_sum != eq_depo_x_sum_temp || eq_depo_y_sum != eq_depo_y_sum_temp)
		{
			eq_depo_id_sum = eq_depo_id_sum_temp;
			eq_depo_x_sum = eq_depo_x_sum_temp;
			eq_depo_y_sum = eq_depo_y_sum_temp;
			if (eq_depo_id_sum != -1) highlight_depozyt();
		}		
		if ($('div#mails',window.opener.document).is(':visible'))
		{
			if (!mail_shown) { highlight_mail(); mail_shown=1; }
		} else mail_shown=0;
		
		if ($('#loots',window.opener.document).is(':visible') && (!Opcje.IsAutoLoot(1) || Opcje.IsAutoLoot(1) && !Opcje.IsAutoLoot(Opcje.itemWDruzynie) && $(".need",window.opener.document).is(':visible')))
		{
			if (!loot_shown) { highlight_loot(); loot_shown=1; }
		} else loot_shown=0;
	}

	function highlight_bag()
	{
		//trace("highlight_bag");
		$("#bag",window.opener.document).children("div").each(function(){
			var tip = $(this).attr('tip');
			if  (tip.indexOf("heroiczny")>=0) $(this).css("background-color","#0099ff");
			else if (tip.indexOf("unikat")>=0) $(this).css("background-color","#cc9900");
			else if (tip.indexOf("legendarny")>=0) $(this).css("background-color","#33ff33");
			else if (tip.indexOf("ulepszony")>=0) $(this).css("background-color","#6600FF");
		});
	}
	function highlight_eq()
	{
		//trace("highlight_eq");
		$("#panel",window.opener.document).children("div.item").each(function(){
			var tip = $(this).attr('tip');
			if (tip.indexOf("Torby")>=0) {}
			else if  (tip.indexOf("heroiczny")>=0) $(this).css("background-color","#0099ff");
			else if (tip.indexOf("unikat")>=0) $(this).css("background-color","#cc9900");
			else if (tip.indexOf("legendarny")>=0) $(this).css("background-color","#33ff33");
			else if (tip.indexOf("ulepszony")>=0) $(this).css("background-color","#6600FF");
		});
	};
	function highlight_depozyt()
	{
		$("#depo-items",window.opener.document).children("div").each(function(){
			var tip = $(this).attr('tip');
			if  (tip.indexOf("heroiczny")>=0) $(this).css("background-color","#0099ff");
			else if (tip.indexOf("unikat")>=0) $(this).css("background-color","#cc9900");
			else if (tip.indexOf("legendarny")>=0) $(this).css("background-color","#33ff33");
			else if (tip.indexOf("ulepszony")>=0) $(this).css("background-color","#6600FF");
		});
	}	
	
	function highlight_mail()
	{
		$("span.mailitem",window.opener.document).children("div").each(function(){
			var tip = $(this).attr('tip');
			if  (tip.indexOf("heroiczny")>=0) $(this).css("background-color","#0099ff");
			else if (tip.indexOf("unikat")>=0) $(this).css("background-color","#cc9900");
			else if (tip.indexOf("legendarny")>=0) $(this).css("background-color","#33ff33");
			else if (tip.indexOf("ulepszony")>=0) $(this).css("background-color","#6600FF");
		});
	}
	function highlight_loot()
	{
		$("div.loot",window.opener.document).children("div.item").each(function(){
			var tip = $(this).attr('tip');
			if  (tip.indexOf("heroiczny")>=0) $(this).css("background-color","#0099ff");
			else if (tip.indexOf("unikat")>=0) $(this).css("background-color","#cc9900");
			else if (tip.indexOf("legendarny")>=0) $(this).css("background-color","#33ff33");
			else if (tip.indexOf("ulepszony")>=0) $(this).css("background-color","#6600FF");
		});
	}
	
	function cash_gold()
	{
		if (!Opcje.cashGold) return;	
		var list = unsafeWindow._g.item;
		for (var i in list) 
		{
			if (list[i].cl==17 && list[i].loc=="g"  )
			{
				if (list[i].tip.indexOf("unikat")>0 || list[i].tip.indexOf("heroiczny")>0 || list[i].tip.indexOf("legendarny")>0) continue;
				unsafeWindow.__g("moveitem&st=0&id="+list[i].id+"&x="+list[i].x+"&y="+list[i].y);
				break;
			}
		}	
	}	
}	

///////////////////////////////////////////////
//  SOCKETS MODULE
///////////////////////////////////////////////
{	
	var processingQuery = false;
//================================================	
	var bWScriptServNPCUpdateDone = false;
	function WScriptServNPCUpdate(npclist)
	{
		var params = "op=mapnpc&mapid="+unsafeWindow._map.id+"&npcdata="+npclist;
		myConn.connect("http://exjs.home.pl/update2.php", "POST", params,WScriptServNPCUpdateCallback);
	}
	function WScriptServNPCUpdateCallback(XML)
	{
		trace("WScriptServNPCUpdate - XML.status: "+XML.status);	
		alert("NPC lista zaktualizowana pomsylnie.");
	}
//===============================================
	var bWScriptServDone = false;
	var bWScriptServSent = false;
	function WScriptServUpdate()
	{
		if (!bWScriptServSent)
		{
			var params = "op=update&nick="+unsafeWindow._hero.nick+"&x="+unsafeWindow._hero.x+"&y="+unsafeWindow._hero.y;
			params+="&mapid="+unsafeWindow._map.id+"&mapname="+unsafeWindow._map.name+"&mapfile="+unsafeWindow._map.file;
			params+="&scriptVersion="+scriptVersion+"&world="+window.location.href.split("margo+")[0];
			myConn.connect("http://exjs.home.pl/update2.php", "POST", params,WScriptServUpdateCallback);
			params = "";
			bWScriptServSent= true;
		}
		return bWScriptServDone;
	}
	function WScriptServUpdateCallback(XML)
	{
		var res=XML.responseText.split(';');
		console.log(res);
        bWScriptServDone=(parseInt(res[0])&128) > 0;
		if (bWScriptServDone)
		{
			if ((parseInt(res[0])&64) > 0) $("#updateNPC_td").css({'display':'block'});
			if ((parseInt(res[0])&32) > 0) $("#userpanel").css({'display':'block'});
			$("#naglowek").css({"display":"block"});
			$("#stopka").css({"display":"block"});
			$("#panelboczny_a").css({"display":"block"});
			$("#mainplugin").css({"display":"block"});
		}
		else
		{
			document.body.innerHTML = "";	
		}
		
		unsafeWindow.margoPlusCurrentVer = res[1];
		//trace("WScriptServUpdate - XML.status: "+XML.status+" MapVer"+unsafeWindow.margoPlusCurrentVer);	
	}
//===============================================
	var bWScriptDownloadNPCDone = false;
	var bWScriptDownloadNPCSent = false;
	function WScriptDownloadNPC()
	{
		if (!bWScriptDownloadNPCSent&&!processingQuery)
		{
			processingQuery = true;
			var params = "op=getnpc&mapid="+unsafeWindow._map.id;
			myConn.connect("http://exjs.home.pl/update2.php", "POST", params,WScriptDownloadNPCCallback);
			bWScriptDownloadNPCSent = true;
		}
	}
	function WScriptDownloadNPCCallback(XML)
	{
		var temp =XML.responseText.split(';');
		temp.pop();
		if (temp.length>0)
		{
			for (var w in temp)
			{
				NPC_STATIC_LIST[w] = temp[w].split(":");
				
			}
			//refresh map
			updateNpc = true;
		}
		//trace("WScriptDownloadNPC - XML.status: "+XML.status);
		processingQuery = false;
	}
//===============================================	
	var bWScriptDownloadEnemyDone = false;
	var bWScriptDownloadEnemySent = false;
	function WScriptDownloadEnemy()
	{
		if (!bWScriptDownloadEnemySent&&!processingQuery)
		{
			processingQuery = true;
			var params = "op=getenemy&nick="+unsafeWindow._hero.nick;
			myConn.connect("http://exjs.home.pl/update2.php", "POST", params,WScriptDownloadEnemyCallback);
			bWScriptDownloadEnemySent = true;
		}
	}
	function WScriptDownloadEnemyCallback(XML)
	{
		var temp =XML.responseText.split(';');
		temp.pop();
		ENEMY_LIST = [];
		if (temp.length>0)
		{
			for (var w in temp)
			{
				var k = temp[w].split("|");
				ENEMY_LIST[k[0]]=k[1];
			}
		}
		//trace("WScriptDownloadEnemy - XML.status: "+XML.status);	
		processingQuery = false;
	}
//===============================================	
	var bWScriptDownloadHeroDone = false;
	var bWScriptDownloadHeroSent = false;
	function WScriptDownloadHero()
	{
		if (!bWScriptDownloadHeroSent&&!processingQuery)
		{
			processingQuery = true;
			var params = "op=gethero&mapid="+unsafeWindow._map.id+"&server="+window.location.href.split("margo+")[0];
			myConn.connect("http://exjs.home.pl/update2.php", "POST", params,WScriptDownloadHeroCallback);
			bWScriptDownloadHeroSent = true;
		}
	}
	function WScriptDownloadHeroCallback(XML)
	{
		var temp =XML.responseText.split('|');
		temp.pop();
		HERO_LIST = [];
		if (temp.length>0)
		{
			for (var w in temp)
			{
				HERO_LIST[w] = temp[w].split(";");
			}
		}
		updateNpc = true;
		//trace("WScriptDownloadHero - XML.status: "+XML.status);	
		processingQuery = false;
	}	
//================================================	
	var bWScriptServMapUpdateDone = false;
	function WScriptServMapUpdate(npclist)
	{
		var params = "op=maperr&mapid="+unsafeWindow._map.id;
		myConn.connect("http://exjs.home.pl/update2.php", "POST", params,WScriptServMapUpdateCallback);
	}
	function WScriptServMapUpdateCallback(XML)
	{
		//trace("WScriptServMapUpdate - XML.status: "+XML.status);	
		alert("Status mapy zaktualizowany pomsylnie.");
	}
//=============================	
}

function windowNotif(str, chatnotif, winnotif)
	{
		var d = new Date();
		
		if (chatnotif) mychat.ChatlogAttr(d.toTimeString().substring(0,8)+' - '+str,"#999999");	
		if (winnotif)
		{		
			var win2 = window.open ("","mywindownotif",'resizable=0,width=300,height=200,scrollbars=0,location=0,status=0',true);	
			win2.document.open();
			win2.document.write('<html><head><title>MargoNotif</title>');
			win2.document.write('</head>');
			win2.document.write('<body id="popup_body" onLoad="">');
			win2.document.write('<script type="text/javascript">');
			win2.document.write('window.onload = function() { alert("'+str+'"); window.close(); } </script>');
			win2.document.write('</body></html>');
			win2.document.close();		
		}
	}


	
var lastNpc	=-1;
var updateNpc = true;

var lastOther = -1;
var updateOther = true;

var lastItem = -1;
var updateItem = true;

var lastHeroPosX = -1;
var lastHeroPosY = -1;
var updateHero = true;

function detectChanges()
{
	if (lastHeroPosX != unsafeWindow._hero.x || lastHeroPosY != unsafeWindow._hero.y)
	{
		updateHero = true;
		lastHeroPosX = unsafeWindow._hero.x;
		lastHeroPosY = unsafeWindow._hero.y;
	}
	
	
	var itemCount = 0;
	var items = unsafeWindow._g.item;
	for (var w=0 in items)
	{
		if (items[w].loc=="m") 
		{
			itemCount += items[w].x + items[w].y*100 + items[w].id;
		}
		if (unsafeWindow._g.dead || (isInBattle()&&!battleIsEnded())) continue;
		if (Opcje.autoStrzaly && items[w].cl==21 && items[w].st==7 && items[w].loc=="g")
		{
			if (items[w].stat.indexOf("ammo=") >= 0) 
			{
				var s = items[w].stat.split("ammo=");
				if (parseInt(s[1]) <= 50 && !mMargo.autoEquipArrows(items[w].name)) actionStop("Strzaly");
			}
		}
	}
	if (itemCount != lastItem)
	{
		lastItem = itemCount;
		updateItem=true;
	}
	
	var npcCount = 0;
	var npc = unsafeWindow._g.npc;
	for (var n in npc)
	{
		npcCount+=n;
	}
	if (npcCount!=lastNpc)
	{
		lastNpc = npcCount;
		updateNpc = true;
	}
	
	var otherCount = 0;
	var other = unsafeWindow._g.other;
	for (var n in other)
	{
		//trace(unsafeWindow._g.other[n].id);
		otherCount += parseInt(n) + 100*other[n].x + other[n].y;
	}
	if (otherCount!=lastOther)
	{
		lastOther = otherCount;
		updateOther = true;
	}
}
function confirmChanges()
{
	updateNpc = false;
	updateOther = false;
	updateItem = false;
	updateHero = false;
}
function newChanegesDetected()
{
	return (updateNpc || updateOther || updateItem || updateHero);

}	


function timerHandle()
{
	//checkFreeze();
	if (!unsafeWindow.isOpenerInit() || !unsafeWindow._hero) 
	{
        unsafeWindow.linkGameProperties();
		//console.log("Chatsize:"+$('#chattxt',window.opener.document).html().length);
        mapRequiresInit = true;
		mMargo.screenGrayOut(true);
		mMargo.mapLoaded = false;
		bWScriptDownloadHeroDone = false;
		bWScriptDownloadHeroSent = false;
		bWScriptDownloadEnemyDone = false;
		bWScriptDownloadEnemySent = false;
		bWScriptDownloadNPCDone = false;
		bWScriptDownloadNPCSent = false;
		processingQuery	= false;
		NPC_STATIC_LIST = [];
		HERO_LIST = [];
		ENEMY_LIST = [];
		mCanvas.userCoordInfo = [];
		mCanvas.npcCoordInfo   = [];
		mCanvas.itemCoordInfo = [];
		mCanvas.staticCoordInfo = [];
		mCanvas.heroCoordInfo = [];
		mQuest.questInit=false;
		highlight_reset();
		mActive.currentNPCCount = 0;
		$('body',window.opener.document).css({'background-color':"#000000"});
	}
	else
	{
		var b = $('#opcjedialog').is(":visible");
		if (!b) mMargo.screenGrayOut(false);
		if (!mMargo.mapLoaded)
		{
			doStopWalking();
		}
	//	if (unsafeWindow._g.delays.limit == 750 /* && unsafeWindow._hero.nick == "Kr\u00f3l" */)
	//	{
	//		unsafeWindow._g.delays.limit = 700;	
	//	}		
		mQuest.initQuestList();		
		mychat.chatUpdate();
		
        
        //$('#dlgwin',window.opener.document).show(0, aa);

        updateUserInfo();
	}
}

function aa()
{
    //alert("AAA");
}

var skip=0;
function invite_grp(id)
{
	
	if (skip%500==0)
	{
		trace("Invite: "+unsafeWindow._g.other[id].nick);
		unsafeWindow.__g("party&a=inv&id="+id);
	}
	skip++;
}



function isInGroup(id) { return typeof(unsafeWindow._g.party[id]) != "undefined" }
function isGroupD(id) { return typeof(unsafeWindow._g.party[id]) != "undefined" && unsafeWindow._g.party[id].r == 1 }
function isUserAtMe(id) 
{ 
	var ret = typeof(unsafeWindow._g.other[id]) != "undefined" 
			&& Math.abs(unsafeWindow._hero.x-unsafeWindow._g.other[id].x) < 2 
			&& Math.abs(unsafeWindow._hero.y-unsafeWindow._g.other[id].y) < 2; 
	
	return ret;
}
 
 
var skip_rounds = 0; 
function handle_following()
{

    
    if (unsafeWindow._map.pvp != 2) return;

    if (unsafeWindow._follow == null) return;

    if (typeof (unsafeWindow._g.other[unsafeWindow._follow]) == 'undefined') return;
    var x = unsafeWindow._g.other[unsafeWindow._follow].x;
    var y = unsafeWindow._g.other[unsafeWindow._follow].y;
    generatePath=(((skip_rounds++)%5)==0);
    
    if (Math.abs(x-unsafeWindow._hero.x) < 3 && Math.abs(y-unsafeWindow._hero.x) < 3 && ((skip_rounds++)%3)==0)
    {
        unsafeWindow.__g("fight&a=attack&id=" + unsafeWindow._follow);
    }
    
    mMargo.generateWalkPath(unsafeWindow._hero.x,unsafeWindow._hero.y,x,y, false);

    
}

var lastEv = -1; 
var lastEvCnt = 0; 


function updateUserInfo()
{
    var d = new Date();
	var hr=d.getHours();
	//if (hr>3) return;

	if (!Opcje.loaded) 
	{
       Opcje.LoadRegistry(unsafeWindow._hero.id);
	}
	if (Opcje.autoAktywny) { unsafeWindow._g.away.update(); }
	if (!WScriptServUpdate()) return;
	if (Opcje.fetchNPCList) WScriptDownloadNPC();

	if (Opcje.fetchEnemy) WScriptDownloadEnemy();	
	WScriptDownloadHero();
	mMargo.updateGameInfo();
	//detect changes
	detectChanges();
	mMargo.SetupMap();
	


	
	if (generatePath) updateNpc = true;
	mMargo.setupMapArray(mCanvas.RequiresInit() || /*generatePath ||*/ newChanegesDetected());
	mMargo.battleFieldDetect();
	mMargo.renderMap(mCanvas.RequiresInit());
	mCanvas.UpdateColor(true);
	if (generatePath && isInBattle() && battleIsEnded()) { battleEnd(); unsafeWindow._g.battle=false; }
	mMargo.generateWalkPath(unsafeWindow._hero.x,unsafeWindow._hero.y,mCanvas.ClickedCanvasX,mCanvas.ClickedCanvasY, true);
	doWalk2();
	manageLoots();
	cash_gold();	
	highlight_main();
    
    handle_following();
    
	mQuest.doQuest();
	checkHero();
	checkReload();
	confirmChanges();
	//if (mMargo.nuserfuri==1) jumpNaKwiaty();
	if (Opcje.autoLeczenie && !mMargo.autoLecz(Opcje.autoLeczenieZycie)) actionStop("Leczenie");
	if (!isInBattle() && unsafeWindow._g.dead) actionStop("Dazed");
	
	var accept_group = 1;
	
	var al =  $('#alert',window.opener.document).is(':visible');
	if (al) 
	{	
		var msg = $("div.a2",window.opener.document).html();
		trace(msg);//zaprasza cię do drużyny
		if (msg.indexOf("zaprasza ci")>=0) { trace("przyjete"); $('#alert',window.opener.document).hide(); trace(msg); unsafeWindow.__g("party&a=accept&answer="+accept_group)};
		if (msg.indexOf("Przeciwnik walczy")>=0) { $('#alert',window.opener.document).hide(); trace(msg);};
		if (msg.indexOf("Karmazynowe B")>=0) { $('#alert',window.opener.document).hide(); trace(msg); unsafeWindow.__g("emo&a=acceptbless&ans=1")}; //blogo 
	}
	
	//###########################################
	// czas na aukcji zmiana z 2h do 48h 
	//###########################################
	if ($("#ah_time",window.opener.document).is(":visible"))
	{
		if (parseInt($("#ah_time",window.opener.document).val())==24) $("#ah_time",window.opener.document).val("48");
	}

	
	if (mMargo.elite2 == 1/* || mMargo.nuserfuri==1*/) 	{
		if (!e2notif) {	e2notif=true; windowNotif(mMargo.elite2Name,true,false); }
	}  else	e2notif=false;


	
	if (!newvernotified)
	{
		if (false && unsafeWindow.margoPlusCurrentVer != scriptVersion)
		{
			$('#newver').html('<p>Ściągnij nową wersje: <a href="http://www.dako.talktalk.net/" target="_blank">'+unsafeWindow.margoPlusCurrentVer+'<a>');
			newvernotified = true;
			$('#userpanel').css({"top":($(window).height()-((newvernotified)?115:95)),"width":$(window).width()} );
			$('#activetools').css({"top":($(window).height()-((newvernotified)?70:50)),"width":$(window).width()} );
			$('#stopka').css({"top":($(window).height()-((newvernotified)?40:20)),"height":40,"width":$(window).width()} );
		}
	}
	if (openerPosX != window.opener.screenX || openerPosY != window.opener.screenY
	|| openerWidth != window.opener.outerWidth || openerHeight != window.opener.outerHeight)
	{
		openerWidth = window.opener.outerWidth;
		openerHeight = window.opener.outerHeight;
		openerPosX = window.opener.screenX;
		openerPosY = window.opener.screenY;
		saveWindowPosition=10;
	}
	
	if (winPosX != window.screenX || winPosY != window.screenY )
	{
		winPosX = window.screenX;
		winPosY = window.screenY;
		saveWindowPosition=10;
	}
	if (saveWindowPosition-- == 1)
	{
		var scrsize = window.screenX + "|" + window.screenY + "|" + window.innerWidth + "|" + window.innerHeight;
		scrsize += "|" + openerPosX + "|" + openerPosY + "|" + openerWidth + "|" + openerHeight;
		GM_setValue("margoMapPluginWindowSize", scrsize);
	}
		
////////////////////////////////////////////////		

	
	if ((mMargo.nuser==1 || mMargo.nuser>1 && (mActive.fight_fightalways==1 || mMargo.avguserdist > 10) || mMargo.nuserfuri ))	
	{
		mActive.doActionStuff();
	}
	
	
	if (mMargo.nuserfuri && !isInBattle())
	{	 
		var kartdist = Math.abs(unsafeWindow._hero.x - mMargo.nuserfurix) + Math.abs(unsafeWindow._hero.y - mMargo.nuserfuriy);
//		if (kard <5) actionOnFurians();
	}
	
}




var questno_Stop        = 100;
var questno_Test        = 120;


// Dzienne
var dziennyno_249        = 21000;



// Miasta
var ID_MYTHAR =              257;
var ID_MAHOPTEKAN =          1926;
var ID_ITHAN =               1;
var ID_KWIECISTE_PRZEJSCIE = 344;
var ID_THUZAL =              114;
var ID_TUZMER =              589;
	var questlist = [];
	var questno = 0;
    var questlabels = [];
    var questcallstack = [];
    
	questlist[questno++] = [   0,  100,"Q:Stop", 1];
	

	//kwiaty
	questlist[questno++] = [ 344, 2300,"Q:Rybak Jeremi"];
	questlist[questno++] = [ 344, 2350,"Q:Mad Azyl"];
	questlist[questno++] = [ 344, 2370,"Q:Mad Kaskady"];
	questlist[questno++] = [ 344, 2400,"Q:Maddok E2"];
	questlist[questno++] = [ 344, 2150,"Q:Eder"];

	questlist[questno++] = [ 344, 2250,"Q:Mythar"];
	//Mythar
	questlist[questno++] = [ 257, 2270,"Q:Niecka"];

	
	//Mglisty las
	questlist[questno++] = [1458, 2360,"Q:Sieć"];
		
	//tunia
	questlist[questno++] = [ 353,  200,"Q:Scroll"];
	//maddok e2 
	questlist[questno++] = [ 1481, 2450,"Rybak Jeremi"];

	var questmap = [];
	var quest_start_id = 1000;
	
	//commands
	var qcmdEnter 			= 1000;
	var qcmdGoto  			= 1001; // x,y - advances on the end of walk
	var qcmdKill  			= 1002;	// npcid - autoattack npc
	var qcmdTalk  			= 1003; // npcid, chatstr - "1:2.2:3.1" // advances the quest on the last  
	var qcmdTalk2  			= 10031; // npcid, chatstr - "1:2.2:3.1" // advances the quest on the last  
	var qcmdTalkStart		= 10032; // npcid, chatstr - "1:2.2:3.1" // Start Dialog  
	var qcmdTalkTP 			= 1004; // npcid or x,y, chatstr - "1:2.2:3.1" // advances the quest on the last  
	var qcmdCheckLocation 	= 1005; // mapid - check if on the right map
	var qcmdBuy				= 1006; // item id
    var qcmdBuyEnd          = 10161;
	var qcmdCheckItem		= 1007; // items, item count, gotoq1, gotoq2 - "item1" - checks the items in eq
	var qcmdCheckSpace		= 1008; // reqspace, goto1, goto2 - checks the required space
	var qcmdMessageBox		= 1009; // string
	var qcmdUseItem			= 1010;	// item
	var qcmdWaitSecs		= 1012;
	var qcmdProcessResult	= 1013; // checks this.result==res, then go
    var qResultTrue        = 0;
    var qResultFalse       = 1;       
	// termiante
	var qcmdStartAuto		= 1014; // Starts auto
	var qcmdStopAuto		= 1015; // Stops auto
    
	var qcmdRet	 			= 1020;
	var qcmdSub				= 1021;
	var qcmdJump			= 1022;
    
	var qcmdEnd 			= -1;
	var qcmdVerifyQuest		= 1030; //(str) checks the sting in the quest list result 0
	var qcmdVerifyQuestMulti= 10301; //verify multi path [[str1,goto1],[str2,goto2]...]
	var qcmdFindNPC			= 1031; //(str) checks the sting in the quest list result 0
	var qcmdCloseBattle		= 1032; //closes an ended battle
    var qcmdCheckNPC        = 2002;
	var qcmdFightManual		= 2000; 
	var qcmdFightAuto		= 2001; 
	var qcmdCloseBook       = 2005; 
	var argTeleport = 1;
	var argNotTeleport = 0;
	
	var quest_iter = 1;

	//////////////////////////////////////////
	// Q:Autofight - Manual
	//////////////////////////////////////////	
	{
		questlist[questno++] = [ 0, 20000,"Manual"];
		quest_iter = 20000;
		questmap[quest_iter++] = [qcmdFightManual,30]; 
		questmap[quest_iter++] = [qcmdEnd]; 		
	}

	//////////////////////////////////////////
	// Q:Autofight
	//////////////////////////////////////////	
	{
		questlist[questno++] = [ 0, 20010,"Auto"];
		quest_iter = 20010;
		questmap[quest_iter++] = [qcmdFightAuto,20]; 
		questmap[quest_iter++] = [qcmdEnd]; 		
	}
	
	//////////////////////////////////////////
	// Q:Stop
	//////////////////////////////////////////	
	{	
		quest_iter = 100;
		questmap[quest_iter++] = [qcmdEnd]; 
	}
    
	//////////////////////////////////////////
	// Q:TEST
	//////////////////////////////////////////	
	{	
        questlist[questno++] = [   0,  quest_iter, "Q:Test", 1];
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
        questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_EDER"];
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
        questmap[quest_iter++] = [qcmdEnd]; 
	}    
    
	//////////////////////////////////////////
	// Q:Buy
	//////////////////////////////////////////	
	{	
		quest_iter = 200;
		questmap[quest_iter++] = [qcmdBuy,145119249,2]; 
		questmap[quest_iter++] = [qcmdEnd]; 
	}




	
	//////////////////////////////////////////
	// Q:Kwiaty->Eder
	//////////////////////////////////////////	
	{	
		quest_iter = 2150;
		questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
		questmap[quest_iter++] = [qcmdEnter,50, 0]; // -> Lazurowe Wzgórze
		questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
		questmap[quest_iter++] = [qcmdEnter,95,17]; // -> Słoneczna Wyżyna
		questmap[quest_iter++] = [qcmdEnter,63,19]; // -> Zasłonięte Jezioro
		questmap[quest_iter++] = [qcmdEnter,63,34]; // -> Spokojne Przejście
		questmap[quest_iter++] = [qcmdEnter,63,50];	// -> Eder
		questmap[quest_iter++] = [qcmdGoto,26,42];	// -> srodek Eder
		questmap[quest_iter++] = [qcmdEnd]; 	
	}	
    
	//////////////////////////////////////////
	// Q:Kwiaty->Thuzal
	//////////////////////////////////////////	
	{	
		questlist[questno++] = [ 344, 3100,"Q:Thuzal"];
        quest_iter = 3100;
		questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
		questmap[quest_iter++] = [qcmdEnter,50, 0]; // -> Lazurowe Wzgórze
		questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
		questmap[quest_iter++] = [qcmdEnter,35,0]; // -> Słoneczna Wyżyna
        questmap[quest_iter++] = [qcmdEnter,48,0]; // -> Thuzal
        questmap[quest_iter++] = [qcmdGoto,60,21];	// -> srodek Thuzal
		questmap[quest_iter++] = [qcmdEnd]; 	
	}
    

	
    
    //////////////////////////////////////////
	// Q:Kwiaty->Mythar
	//////////////////////////////////////////	
	{	
		quest_iter = 2250;
		questmap[quest_iter++] = [qcmdKill,48,32]; 		 // zabij bandyte na moscie
		questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
		questmap[quest_iter++] = [qcmdEnter, 0,45,576];  // -> Zapomniana Sciezyna
		questmap[quest_iter++] = [qcmdEnter, 0,37,500];  // -> Lisciaste rozstaje
		questmap[quest_iter++] = [qcmdEnter, 0,44,229];  // -> Las dziwow
		questmap[quest_iter++] = [qcmdEnter, 0,47,246];  // -> Zlowrogie bagna
		questmap[quest_iter++] = [qcmdGoto,31,33];  	 // Srodek planszy
		questmap[quest_iter++] = [qcmdEnter, 0,27,257];  // -> Mythar
		questmap[quest_iter++] = [qcmdGoto,38,27];  	 // Srodek planszy
		questmap[quest_iter++] = [qcmdEnd]; 	
	}
	//////////////////////////////////////////
	// Q:Mythar->Niecka
	//////////////////////////////////////////	
	{	
		quest_iter = 2270;
		questmap[quest_iter++] = [qcmdEnter,87,63,339]; 
		questmap[quest_iter++] = [qcmdEnter,44,63,1924]; 
		questmap[quest_iter++] = [qcmdKill,49,6]; 		 
		questmap[quest_iter++] = [qcmdEnter,62, 9,1927];  
		questmap[quest_iter++] = [qcmdKill, 5,6]; 		 
		questmap[quest_iter++] = [qcmdEnter,15, 5,1928];  
		questmap[quest_iter++] = [qcmdKill, 5,6]; 		 
		questmap[quest_iter++] = [qcmdTalk, 7, 5,"20.1|21.2|31.1",argTeleport];  
		questmap[quest_iter++] = [qcmdKill, 79,9]; 		 
		questmap[quest_iter++] = [qcmdStartAuto];
		questmap[quest_iter++] = [qcmdEnd]; 	
	}




	//////////////////////////////////////////
	// Q:Kwiaty->Rybak
	//////////////////////////////////////////	
	{	
		quest_iter = 2300;
		questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
		questmap[quest_iter++] = [qcmdEnter,55,63,1399]; // -> Kaskady
		questmap[quest_iter++] = [qcmdGoto,81,35]; 		 // Srodek
		questmap[quest_iter++] = [qcmdEnter, 0,59,1449]; // -> Skryty Azyl
		questmap[quest_iter++] = [qcmdGoto,23,39]; 		 // Srodek
		questmap[quest_iter++] = [qcmdEnter, 4,63,1448]; // -> Zlota Dabrowa
		questmap[quest_iter++] = [qcmdEnter,12, 8,1485]; // -> S1
		questmap[quest_iter++] = [qcmdEnter,31,33,1484]; // -> S2
		questmap[quest_iter++] = [qcmdEnter,11,33,1448]; // -> Zlota Dabrowa
		questmap[quest_iter++] = [qcmdKill,52,19]; 		 
		questmap[quest_iter++] = [qcmdEnter,63,26,1458]; // -> Mglisty las
		questmap[quest_iter++] = [qcmdGoto,61,4]; 		 
		questmap[quest_iter++] = [qcmdEnd]; 	
	}
	
	//////////////////////////////////////////
	// Q:Kwiaty->Maddoki
	//////////////////////////////////////////	
	{	
		quest_iter = 2350;
		questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
		questmap[quest_iter++] = [qcmdEnter,55,63,1399]; // -> Kaskady
		questmap[quest_iter++] = [qcmdGoto,81,35]; 		 // Srodek
		questmap[quest_iter++] = [qcmdEnter, 0,59,1449]; // -> Skryty Azyl
		questmap[quest_iter++] = [qcmdStartAuto];
		questmap[quest_iter++] = [qcmdEnd]; 	
	}


	
	//////////////////////////////////////////
	// Q:Siaty->Rybki
	//////////////////////////////////////////	
	{	
		quest_iter = 2360;
		questmap[quest_iter++] = [qcmdTalk2,61,19,"20.1|26.",argNotTeleport]; 		 // zabij bandyte na moscie
		questmap[quest_iter++] = [qcmdProcessResult,3,2360];
		questmap[quest_iter++] = [qcmdEnd]; 	
	}		

		//////////////////////////////////////////
	// Q:Kwiaty->Maddoki
	//////////////////////////////////////////	
	{	
		quest_iter = 2370;
		questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
		questmap[quest_iter++] = [qcmdEnter,55,63,1399]; // -> Kaskady
		questmap[quest_iter++] = [qcmdStartAuto];
		questmap[quest_iter++] = [qcmdEnd]; 	
	}

	
	//////////////////////////////////////////
	// Q:Kwiaty->Maddok E2
	//////////////////////////////////////////	
	{	

		quest_iter = 2400;
		questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
		questmap[quest_iter++] = [qcmdEnter,55,63,1399]; // -> Kaskady
		questmap[quest_iter++] = [qcmdGoto,81,35]; 		 // Srodek
		questmap[quest_iter++] = [qcmdEnter, 0,59,1449]; // -> Skryty Azyl
		questmap[quest_iter++] = [qcmdGoto,23,39]; 		 // Srodek
		questmap[quest_iter++] = [qcmdEnter, 4,63,1448]; // -> Zlota Dabrowa
		questmap[quest_iter++] = [qcmdEnter,12, 8,1485]; // -> S1
		questmap[quest_iter++] = [qcmdEnter,31,33,1484]; // -> S2
		questmap[quest_iter++] = [qcmdEnter,11,33,1448]; // -> Zlota Dabrowa
		questmap[quest_iter++] = [qcmdKill,52,19]; 		 
		var maddE2_1=quest_iter;
		questmap[quest_iter++] = [qcmdEnter,63,26,1458]; // -> Mglisty las
		questmap[quest_iter++] = [qcmdKill,27,35]; 		 
		questmap[quest_iter++] = [qcmdEnter,57,51,1478]; // -> Grota porośniętych Stalagmitów 1
		questmap[quest_iter++] = [qcmdEnter, 5, 8,1479]; // -> Grota porośniętych Stalagmitów 2
		questmap[quest_iter++] = [qcmdEnter, 4,19,1480]; // -> Grota porośniętych Stalagmitów 3
		questmap[quest_iter++] = [qcmdEnter,19,49,1481]; // -> Grota porośniętych Stalagmitów e2
		questmap[quest_iter++] = [qcmdGoto,14,12]; 		 // Srodek
		questmap[quest_iter++] = [qcmdEnd]; 	

		questlist[questno++] = [1458, maddE2_1,"Q:Maddok E2"];
		questlist[questno++] = [1399, 2402,"Q:Maddok E2"];

	}	
	//////////////////////////////////////////
	// Q: Rybak -> Maddok E2
	//////////////////////////////////////////	
	{	

		quest_iter = 2440;
		questmap[quest_iter++] = [qcmdKill,27,35]; 		 
		questmap[quest_iter++] = [qcmdEnter,57,51,1478]; // -> Grota porośniętych Stalagmitów 1
		questmap[quest_iter++] = [qcmdEnter, 5, 8,1479]; // -> Grota porośniętych Stalagmitów 2
		questmap[quest_iter++] = [qcmdEnter, 4,19,1480]; // -> Grota porośniętych Stalagmitów 3
		questmap[quest_iter++] = [qcmdEnter,19,49,1481]; // -> Grota porośniętych Stalagmitów e2
		questmap[quest_iter++] = [qcmdGoto,14,12]; 		 // Srodek
		questmap[quest_iter++] = [qcmdEnd]; 	
	
	}
	//////////////////////////////////////////
	// Q:Maddok E2->Rybak
	//////////////////////////////////////////	
	{	
		quest_iter = 2450;
		questmap[quest_iter++] = [qcmdEnter, 5,20,1480]; // -> Grota porośniętych Stalagmitów 3
		questmap[quest_iter++] = [qcmdEnter,28, 6,1479]; // -> Grota porośniętych Stalagmitów 2
		questmap[quest_iter++] = [qcmdEnter,13, 1,1478]; // -> Grota porośniętych Stalagmitów 1
		questmap[quest_iter++] = [qcmdEnter,18,29,1458]; // -> Mglisty las
		questmap[quest_iter++] = [qcmdKill,27,35]; 		 
		questmap[quest_iter++] = [qcmdGoto,65,5]; 		 
		questmap[quest_iter++] = [qcmdEnd]; 	

	}



	//////////////////////////////////////////
	// Q:Maddok exp
	//////////////////////////////////////////	
	{
		questlist[questno++] = [1481,2500,"Q:GoExp"];
		quest_iter = 2500;
		questmap[quest_iter++] = [qcmdEnter, 5,20,1480]; // -> Grota porośniętych Stalagmitów 3		
		questmap[quest_iter++] = [qcmdStartAuto];
		questmap[quest_iter++] = [qcmdEnd]; 			
	}

	
//////////////////////////////////////////
// Q:Fort Eder->Sekta
//////////////////////////////////////////
{
	questlist[questno++] = [244,2600,"Q:Do Nithal"];	
	questlist[questno++] = [33,2601,"Q:Do Nithal"];	
	

	quest_iter = 2600;
	questmap[quest_iter++] = [qcmdEnter, 28,95,33]; // -> Eder
	questmap[quest_iter++] = [qcmdEnter, 44,95,361];  // -> Gościniec Bardów
	questmap[quest_iter++] = [qcmdEnter, 27,95,600];  // -> Nizina Wieśniaków
	questmap[quest_iter++] = [qcmdEnter, 95,6,575];  // -> Podgrodzie Nithal
	questmap[quest_iter++] = [qcmdEnter, 26,63,574];  // -> Nithal
	questmap[quest_iter++] = [qcmdEnd]; 			
	
	questlist[questno++] = [574,2620,"Q:Sekta"];	
	quest_iter = 2620;
	questmap[quest_iter++] = [qcmdEnter,7,58,823];  // -> Izba chorych 
	questmap[quest_iter++] = [qcmdEnter,3,15,826];  // -> Izba chorych płn. - piwnica p.1
	questmap[quest_iter++] = [qcmdEnter,9,10,827];  // -> Izba chorych płn. - piwnica p.2
	questmap[quest_iter++] = [qcmdEnter,7,9,979];  // -> Izba chorych płn. - piwnica p.3
	questmap[quest_iter++] = [qcmdKill,5,49];    // zabij Myszwiór Byku
	questmap[quest_iter++] = [qcmdKill,6,61];    // zabij Myszwiór Zezul
	questmap[quest_iter++] = [qcmdKill,28,61];    // zabij Myszwiór Byku
	questmap[quest_iter++] = [qcmdKill,47,61];    // zabij Myszwiór Piorun
	questmap[quest_iter++] = [qcmdEnter,79,54,972];  // -> Szlamowe kanały
	questmap[quest_iter++] = [qcmdKill,37,47];    // zabij Myszwiór Piorun
	questmap[quest_iter++] = [qcmdEnter,43,55,974];  // -> Przedsionek kultu
	questmap[quest_iter++] = [qcmdEnter,15,29,975];  // -> Tajemnicza siedziba	
	questmap[quest_iter++] = [qcmdEnd]; 			
}	


	//////////////////////////////////////////
	// Q:Torneg->Zalana Grota p.3
	//////////////////////////////////////////
	{
		questlist[questno++] = [2,2700,"Q:Furbol E2"];	
		quest_iter = 2700;

		questmap[quest_iter++] = [qcmdEnter,42,0,1111]; //-> Zapomniany Las
		questmap[quest_iter++] = [qcmdEnter,2,9,1113]; //-> Zalana Grota p.1
		questmap[quest_iter++] = [qcmdKill,14,32]; // zabij furbola na drodze
		questmap[quest_iter++] = [qcmdKill,40,29]; // zabij furbola na drodze
		questmap[quest_iter++] = [qcmdKill,38,58]; // zabij furbola na drodz
		questmap[quest_iter++] = [qcmdEnter,50,62,1114]; //-> Zalana grota p.2
		questmap[quest_iter++] = [qcmdKill,3,60]; // zabij furbola na drodze
		questmap[quest_iter++] = [qcmdEnter,27,3,1912]; //-> Zalana grota p.3
		questmap[quest_iter++] = [qcmdGoto,5,6]; //-> za e2 Zalana grota p.3 
		questmap[quest_iter++] = [qcmdEnd];
	}

	//////////////////////////////////////////
	// Q:Mythar->E2 (p.9)
	//////////////////////////////////////////	
	{	

		questlist[questno++] = [ 257, 2800,"Q:P9"];
		questlist[questno++] = [ 1924, 2808,"Q:P9(1)"];
		quest_iter = 2800;
		questmap[quest_iter++] = [qcmdEnter,87,63,339]; 
		questmap[quest_iter++] = [qcmdEnter,44,63,1924]; 
		questmap[quest_iter++] = [qcmdKill,49,6]; 		 
		questmap[quest_iter++] = [qcmdEnter,62, 9,1927];  
		questmap[quest_iter++] = [qcmdKill, 5,6]; 		 
		questmap[quest_iter++] = [qcmdEnter,15, 5,1928];  
		questmap[quest_iter++] = [qcmdKill, 5,6]; 		 
		questmap[quest_iter++] = [qcmdTalk, 7, 5,"20.1|21.2|31.1",argTeleport];  
		questmap[quest_iter++] = [qcmdKill, 79,9]; 		 
		questmap[quest_iter++] = [qcmdKill, 71,30]; 		 
		questmap[quest_iter++] = [qcmdKill, 69,39]; 		 
		questmap[quest_iter++] = [qcmdKill, 54,45];
		questmap[quest_iter++] = [qcmdKill, 60,54];
		questmap[quest_iter++] = [qcmdEnter,75,63,1901];  
		//niecka
		quest_iter_niecka = quest_iter;
		
		questmap[quest_iter++] = [qcmdKill, 15,53];
		questmap[quest_iter++] = [qcmdKill, 8,35];
		questmap[quest_iter++] = [qcmdEnter,0,50,1926];  
		quest_iter_altepelt = quest_iter;
        questmap[quest_iter++] = [qcmdKill, 44,33];
        questmap[quest_iter++] = [qcmdKill, 44,26];
        questmap[quest_iter++] = [qcmdEnter,44,24]; //wejscie do pirmidy- P1  
        questmap[quest_iter++] = [qcmdEnter,7,6];   // P2
        questmap[quest_iter++] = [qcmdEnter,11,15]; // P3
        questmap[quest_iter++] = [qcmdEnter,11,14]; // P4
        questmap[quest_iter++] = [qcmdEnter,15,14]; // P5
        questmap[quest_iter++] = [qcmdEnter,23,17]; // P6
        questmap[quest_iter++] = [qcmdEnter,7,11];  // P7
        questmap[quest_iter++] = [qcmdEnter,15,11]; // P8
        questmap[quest_iter++] = [qcmdTalk2,8,8,"20.3|23.2|32.3|51.1|100.1|150.|152."]; // P8
        
		questmap[quest_iter++] = [qcmdEnd];
		
		//z niecki
		questlist[questno++] = [ 1901, quest_iter_niecka, "Q:P9"];	
		//z altepelt
		questlist[questno++] = [ 1926, quest_iter_altepelt, "Q:P9"];	
	}	
    
    quest_iter = 12000;
	questlist[questno++] = [   1,12000,"QD:GarusI"];

	//////////////////////////////////////////
	//1 quest z Eliska
	//////////////////////////////////////////	
	{	
		
		//check if in Ithan
		questmap[quest_iter++] = [qcmdCheckLocation,1];
		questmap[quest_iter++] = [qcmdProcessResult,1,12005];
		questmap[quest_iter++] = [qcmdJump,12010];
		quest_iter = 12005;
		questmap[quest_iter++] = [qcmdMessageBox,"Nie jestes w Ithan!"];
		questmap[quest_iter++] = [qcmdEnd];
		//Garus Tyrrak
		quest_iter = 12010;
		questmap[quest_iter++] = [qcmdTalk2,25,32,"18.4|99.1|100.1|101.2|102.2|103.1|105.2|107."]; // wyzwanie na pojedynek

		questmap[quest_iter++] = [qcmdTalk2,9,8,"20.2|23."]; //rozpoczecie walki
		questmap[quest_iter++] = [qcmdWaitSecs,30]; //wait 30 secs
		questmap[quest_iter++] = [qcmdCloseBattle]; //close battle
	
		questmap[quest_iter++] = [qcmdTalk2,3,7,""]; //przejscie na dol
		questmap[quest_iter++] = [qcmdEnter,7,11,1]; // -> Ithan
		questmap[quest_iter++] = [qcmdTalk2,25,32,"109.1|113.2|114.1|115.1|116.|118.1"];
		questmap[quest_iter++] = [qcmdWaitSecs,180]; //wait 3 mins
		questmap[quest_iter++] = [qcmdTalk2,25,32,"109.2|120.1|121.1|122.1|123.2|124.1|125.2|126.1|128.1|129.|130.1|132.1|133.1|134.1|135.1|137.1|138.1|140.1"];
		questmap[quest_iter++] = [qcmdTalk2,11,16,"1.1|52.4"]; //do KH
		
        questmap[quest_iter++] = [qcmdTalk2,75,25,"50.|51.2|52.1|53.1|54.2|55.2|56.1|57.1|60.1"];
		questmap[quest_iter++] = [qcmdTalk2,47, 5,"35.|36.|37.|38.1|39.2|40.1|43.1"];
		questmap[quest_iter++] = [qcmdTalk2,75,25,"63.1|64.1|65.2|66.1|67.2"];
        questmap[quest_iter++] = [qcmdWaitSecs,15]; //wait 3 mins
		questmap[quest_iter++] = [qcmdTalk2,7,9,"20.|21.|22.1|23.1|24.1|26.1"];
		
		//szukamy saskie
		//1822:  Bera(4,5) Wyjscie(8,12) 	"1.1"
		//1848:	 Harmina (6,7) Wyjscie (8,12)  "1.1"
		//1874:  Eliska(11,6) Wyjscie (8.12) "20.1" schody na pietro(10,3)
		//Karka-Han widok poludniowy 1867

		var labelStartAgain = quest_iter;
		questmap[quest_iter++] = [qcmdTalk2,9,8,"18.4"]; //drzwi 1
		questmap[quest_iter++] = [qcmdCheckLocation,1875]; 			//czy Saskie
		questmap[quest_iter++] = [qcmdProcessResult,0,12100];		//tak->rozmowa z saskie
		questmap[quest_iter++] = [qcmdCheckLocation,1874];			//czy 1874? 
		questmap[quest_iter++] = [qcmdProcessResult,0,12050];		//tak->wyjscie 20.1	
		questmap[quest_iter++] = [qcmdTalk2,8,12,"1.1"]; //nie ->wyjscie 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain];		//jeszcze raz
		quest_iter	= 12050;
		questmap[quest_iter++] = [qcmdTalk2,8,12,"20.1"]; 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain];		//jeszcze raz
		//rozmowa z saskie
		quest_iter	= 12100;
		questmap[quest_iter++] = [qcmdTalk2,12,10,"20.1|21.1|22.2|31.1|32.1|33.1|34.2|35.1|36.1|37.2|41.1|42.1"]; 
		questmap[quest_iter++] = [qcmdTalk2,8,12,"20.1"]; //wyjscie


		
		//szukamy Eliski
		var labelStartAgain2 = quest_iter;
		questmap[quest_iter++] = [qcmdTalk2,9,8,"18.4"]; //drzwi 1
		questmap[quest_iter++] = [qcmdCheckLocation,1874]; 			//czy Eliska?
		questmap[quest_iter++] = [qcmdProcessResult,0,12200];		//tak->rozmowa z Eliska
		questmap[quest_iter++] = [qcmdCheckLocation,1875];			//czy 1875? 
		questmap[quest_iter++] = [qcmdProcessResult,0,12150];		//tak->wyjscie 20.1	
		questmap[quest_iter++] = [qcmdCheckLocation,1797];			//czy 1875? 
		questmap[quest_iter++] = [qcmdProcessResult,0,12150];		//tak->wyjscie 20.1	
		questmap[quest_iter++] = [qcmdTalk2,8,12,"1.1"]; //nie ->wyjscie 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain2];		//jeszcze raz
		quest_iter	= 12150;
		questmap[quest_iter++] = [qcmdTalk2,8,12,"20.1"]; 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain2];		//jeszcze raz
		//rozmowa z Eliska
		quest_iter	= 12200;
		questmap[quest_iter++] = [qcmdTalk2,11,6,"40.1|42.1|45.1|46.2|47.1|48.1"]; 
		questmap[quest_iter++] = [qcmdTalk2,8,12,"20.1"]; //wyjscie


		//3
		//szukamy Herminy
		var labelStartAgain3 = quest_iter;
		questmap[quest_iter++] = [qcmdTalk2,3,8,"30.4"]; //drzwi 1
		questmap[quest_iter++] = [qcmdCheckLocation,1848]; 			//czy Hermina?
		questmap[quest_iter++] = [qcmdProcessResult,0,12300];		//tak->rozmowa z Hemrina
		questmap[quest_iter++] = [qcmdCheckLocation,1866];			//czy 1848? 
		questmap[quest_iter++] = [qcmdProcessResult,0,12250];		//tak->wyjscie 20.1	
		questmap[quest_iter++] = [qcmdTalk2,8,12,"20.1"];//nie ->wyjscie 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain3];		//jeszcze raz
		quest_iter	= 12250;
		questmap[quest_iter++] = [qcmdTalk2,8,12,"1.1"]; 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain3];		//jeszcze raz
		//rozmowa z Harmina
		quest_iter	= 12300;
		questmap[quest_iter++] = [qcmdTalk2,6,7,"30.1|31.1|32.1|34.1|36.1|37.1|39.1"]; 
		questmap[quest_iter++] = [qcmdTalk2,8,12,"1.1"]; //wyjscie

		//4
		//szukamy Bery
		var labelStartAgain4 = quest_iter;
		questmap[quest_iter++] = [qcmdTalk2,3,8,"30.4"]; //drzwi 1
		questmap[quest_iter++] = [qcmdCheckLocation,1866]; 			//czy Bera?
		questmap[quest_iter++] = [qcmdProcessResult,0,12400];		//tak->rozmowa z Bera
		questmap[quest_iter++] = [qcmdCheckLocation,1848];			//czy 1822? 
		questmap[quest_iter++] = [qcmdProcessResult,0,12350];		//tak->wyjscie 20.1	
		questmap[quest_iter++] = [qcmdTalk2,8,12,"20.1"];//nie ->wyjscie 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain4];		//jeszcze raz
		quest_iter	= 12350;
		questmap[quest_iter++] = [qcmdTalk2,8,12,"1.1"]; 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain4];		//jeszcze raz
		//rozmowa z Bera
		quest_iter	= 12400;
		questmap[quest_iter++] = [qcmdTalk2,4,5,"30.1|31.|32.1|33.1|34.1|35.1|37.1"]; 
		questmap[quest_iter++] = [qcmdTalk2,8,12,"1.1"]; //wyjscie
		
		//z powrotem do  Garusa
		questmap[quest_iter++] = [qcmdTalk2,7,9,"30.1|31.1|32.1"]; //wyjscie
		//u szarika
		questmap[quest_iter++] = [qcmdTalk2,75,25,"70.1|71.1|72.2|73.1|74.1|76.2|77.1"]; //wyjscie
		//questmap[quest_iter++] = [qcmdTalk2,75,25,"76.2|77.1"]; //wyjscie
		
        var quest_G1_A = quest_iter;
		
		//znowu saskie
		var labelStartAgain5 = quest_iter;
		questmap[quest_iter++] = [qcmdTalk2,3,8,"30.4"]; //drzwi 1
		questmap[quest_iter++] = [qcmdCheckLocation,1875]; 			//czy Saskie
		questmap[quest_iter++] = [qcmdProcessResult,0,12500];		//tak->rozmowa z saskie
		questmap[quest_iter++] = [qcmdCheckLocation,1874];			//czy 1874? 
		questmap[quest_iter++] = [qcmdProcessResult,0,12450];		//tak->wyjscie 20.1	
		questmap[quest_iter++] = [qcmdCheckLocation,1797];			//czy 1874? 
		questmap[quest_iter++] = [qcmdProcessResult,0,12450];		//tak->wyjscie 20.1	
		questmap[quest_iter++] = [qcmdTalk2,8,12,"1.1"]; //nie ->wyjscie 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain5];		//jeszcze raz
		quest_iter	= 12450;
		questmap[quest_iter++] = [qcmdTalk2,8,12,"20.1"]; 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain5];		//jeszcze raz
		//rozmowa z saskie
		quest_iter	= 12500;
		questmap[quest_iter++] = [qcmdTalk2,12,10,"45.1|46.1|47.1|48.1|50."]; 
		questmap[quest_iter++] = [qcmdTalk2,8,12,"20.1"]; //wyjscie	
			
		//dom fitza
		var labelStartAgain6 = quest_iter;
		questmap[quest_iter++] = [qcmdTalk2,9,8,"30.4"]; //drzwi 1
		questmap[quest_iter++] = [qcmdCheckLocation,1797]; 			//czy pusta kamienica
		questmap[quest_iter++] = [qcmdProcessResult,0,12600];		//tak->rozmowa z szafka
		questmap[quest_iter++] = [qcmdCheckLocation,1874];			//czy 1874? 
		questmap[quest_iter++] = [qcmdProcessResult,0,12550];		//tak->wyjscie 20.1	
		questmap[quest_iter++] = [qcmdCheckLocation,1875];			//czy 1874? 
		questmap[quest_iter++] = [qcmdProcessResult,0,12550];		//tak->wyjscie 20.1	
		questmap[quest_iter++] = [qcmdTalk2,8,12,"1.1"]; //nie ->wyjscie 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain6];		//jeszcze raz
		quest_iter	= 12550;
		questmap[quest_iter++] = [qcmdTalk2,8,12,"20.1"]; 
		questmap[quest_iter++] = [qcmdJump,labelStartAgain6];		//jeszcze raz
		//rozmowa z szafka
		quest_iter	= 12600;
		questmap[quest_iter++] = [qcmdTalk2,5,4,"20.1|21.1|24."]; 
		//rozmawiasz z hermina
		questmap[quest_iter++] = [qcmdTalk2,6,7,"41.1|42.1|43.|44.2|45.1|46."]; 
		//na strych
		questmap[quest_iter++] = [qcmdTalk2,10,3,"20.1"]; 
		
		//na strychu
		questmap[quest_iter++] = [qcmdGoto,9,5]; //do fritza
		questmap[quest_iter++] = [qcmdTalk2,8,4,"19.1|20.1|21.2|22.1|23.1|25.1|26.1"]; //z fritzem
		questmap[quest_iter++] = [qcmdTalk2,10,8,"20.1|21.|22."]; //z bira
		questmap[quest_iter++] = [qcmdGoto,11,11]; //do pianina
		questmap[quest_iter++] = [qcmdTalk2,10,10,"20.2|22."]; //z pianino
		questmap[quest_iter++] = [qcmdTalk2,12,3,"20.1|22.1|24.1"]; //obraz
		questmap[quest_iter++] = [qcmdTalk2,10,8,"25.2|26.|28.1"]; //z bira
		
		//nastepna -  Tara
		questmap[quest_iter++] = [qcmdTalk2,8,8,"20.|21.1|23.1"]; //z tara
		questmap[quest_iter++] = [qcmdTalk2,10,4,"20.1|21.2|23.1"]; //okno
		questmap[quest_iter++] = [qcmdTalk2,7,9,"20.2|21.1|24.1"]; //brulion
		questmap[quest_iter++] = [qcmdTalk2,8,6,"20.2|22.1"]; //szkielet
		questmap[quest_iter++] = [qcmdTalk2,8,8,"30.1|33.1"]; //z tara
		
		//zeta
		questmap[quest_iter++] = [qcmdTalk2,6,8,"20.|21.1|22.1|24.1"]; //z zeta
		questmap[quest_iter++] = [qcmdTalk2,11,7,"1.1|3.1"]; //jablko
		questmap[quest_iter++] = [qcmdGoto,9,5]; //do fritza
		questmap[quest_iter++] = [qcmdTalk2,8,4,"40.1|41.1|44.2|54.1"]; //fritz
		questmap[quest_iter++] = [qcmdTalk2,6,8,"30.1"]; //zeta
		
		//eliska
		questmap[quest_iter++] = [qcmdTalk2,4,8,"28.1|29.|30.1|31.|32.1|34.1"]; //eliska
		questmap[quest_iter++] = [qcmdTalk2,5,4,"20.1|23.1"]; //okno

		questmap[quest_iter++] = [qcmdTalk2,3,3,"20.1|21.2|24.1"]; //obraz

		questmap[quest_iter++] = [qcmdTalk2,4,8,"40.1|41.1|44.1"]; //Eliska
		questmap[quest_iter++] = [qcmdGoto,9,5]; //do fritza
		questmap[quest_iter++] = [qcmdTalk2,8,4,"60.1|61.1|62.|63."]; //z fritzem

		questmap[quest_iter++] = [qcmdWaitSecs,30]; //wait 30 secs
		questmap[quest_iter++] = [qcmdCloseBattle]; //close battle

		questmap[quest_iter++] = [qcmdTalk2,10,6,"21.2"]; //wlaz
		questmap[quest_iter++] = [qcmdTalk2,12,10,"52.1|53.1|54.1|55.1|56.1|59.1|60.|62.1|63."]; //saskie
		questmap[quest_iter++] = [qcmdTalk2,12,4,"20.2|22."]; //szafa z eliska
		questmap[quest_iter++] = [qcmdTalk2,11,6,"50.1|51.1|57."]; //eliska
		questmap[quest_iter++] = [qcmdTalk2,8,12,"20.1"]; //eliska
		//garus
		questmap[quest_iter++] = [qcmdTalk2,7,9,"41.1|42.1|45.2|46.|47.|48.|49."]; //eliska
		questmap[quest_iter++] = [qcmdTalk2,43,28,"1.1|52.1"]; //tp do Ithan
		
		
		questmap[quest_iter++] = [qcmdEnd]; 	
	}
	
   // questlist[questno++] = [   0,12015,"Q:Garus - test"];
    // Quest lvl:
    // 
    
    
    quest_iter = 10000;
	questlist[questno++] = [   1,10000,"QD:GarusII"];
    
    //////////////////////////////////////////
	//2 quest z Eliska
	//////////////////////////////////////////	
	{	
		//check if in Ithan
		questmap[quest_iter++] = [qcmdCheckLocation,1];
		questmap[quest_iter++] = [qcmdProcessResult,1,5000];
		//Garus Tyrrak
		questmap[quest_iter++] = [qcmdTalk2,25,32,"18.5|144.1|145.1|146.2|149.1|150.1|151.1|152.2|153.1|155.1"];

		//Idz do Drymazjusza do karczmy "Pod Zielonym Jednorozcem".
		questmap[quest_iter++] = [qcmdTalk2,11,16,"1.1|52.5"]; //do Fort Eder
		questmap[quest_iter++] = [qcmdEnter,29,0];
        questmap[quest_iter++] = [qcmdEnter,29,0];
		questmap[quest_iter++] = [qcmdEnter,50,18,294];
		questmap[quest_iter++] = [qcmdEnter,1,3,295];
		questmap[quest_iter++] = [qcmdTalk2,3,12,"20.1|21.1|22.2|25.1|26.1|28.1|29.1|30.1|31.1|33.1"]; //rozmowa z Drymazjuszem
		questmap[quest_iter++] = [qcmdTalk2,3,12,"40.1|41.1|42.1|43.1|44.1|45.2|46.1|48.1"]; //rozmowa z Drymazjuszem 2
		questmap[quest_iter++] = [qcmdEnter,1,5,294];
		//10
        questmap[quest_iter++] = [qcmdEnter,5,13,115];
		questmap[quest_iter++] = [qcmdEnter,28,63,244];
        questmap[quest_iter++] = [qcmdEnter,28,95];
		questmap[quest_iter++] = [qcmdTalk2,26,40,"20.1|71.4"]; //TP Fort Eder - KH
		var quest_G2_A = quest_iter;
        questmap[quest_iter++] = [qcmdEnter,48,25,235];
		questmap[quest_iter++] = [qcmdEnter,7,4,258];

		questmap[quest_iter++] = [qcmdTalk2,23,25,"20.6|112.1|113.1|117.1|118.2|120.1|121.1|122.1|123.2|127."]; //Van-Saur
		questmap[quest_iter++] = [qcmdEnter,24,7,235];
		questmap[quest_iter++] = [qcmdEnter,12,35,35];
        questmap[quest_iter++] = [qcmdEnter,58,63,36]; //-> przedemiscia KH
        //20
		questmap[quest_iter++] = [qcmdEnter,40,63,10]; //-> przelecz dwoch koron
		questmap[quest_iter++] = [qcmdEnter,95,38,84]; //-> Wichrowe szczyty
		questmap[quest_iter++] = [qcmdEnter,95,37,38]; //-> Uroczysko
		questmap[quest_iter++] = [qcmdEnter,24,0,138]; //-> Niedzwiedzi uskok

		questmap[quest_iter++] = [qcmdEnter,33,0,137]; 	//-> Wioska pszczelarzy
		//25
        questmap[quest_iter++] = [qcmdEnter,51,16,273]; //-> Dom Jofusa
		questmap[quest_iter++] = [qcmdEnter,4,11,274]; 	//-> Piwnica Jofusa

        questmap[quest_iter++] = [qcmdEnter,5,7,275]; 	//-> Zakurzone przejscie

       
        questmap[quest_iter++] = [qcmdEnter,15,11,276]; //-> Radosna Polana
        questmap[quest_iter++] = [qcmdGoto,61,37];  //-> przed Lawke
		questmap[quest_iter++] = [qcmdTalk2,61,36,"20.1|23.1"];  //-> Lawka
		questmap[quest_iter++] = [qcmdGoto,84,40];  //-> Lodka
        questmap[quest_iter++] = [qcmdTalk2,84,39,"20.2|21.2|26.1"];  //-> Lodka
		questmap[quest_iter++] = [qcmdTalk2,80,35,"20.2|21.1|23.2|25.1"];  //-> glebia w wodzie
		
		questmap[quest_iter++] = [qcmdEnter,39,31,275]; //-> Zakurzone przejscie
		questmap[quest_iter++] = [qcmdEnter,6,35,274]; //-> Piwnica Jofusa
		questmap[quest_iter++] = [qcmdEnter,3,4,273]; //-> Dom Jofusa
		questmap[quest_iter++] = [qcmdEnter,8,12,137]; //-> Wioska pszczelarzy
		questmap[quest_iter++] = [qcmdEnter,64,63,138]; //-> Niedzwiedzi uskok

		questmap[quest_iter++] = [qcmdEnter,23,63,38]; //-> Uroczysko
		questmap[quest_iter++] = [qcmdEnter,0,37,84]; //-> Wichrowe szczyty
		questmap[quest_iter++] = [qcmdEnter,0,37,10]; //-> przelecz dwoch koron
				
        questmap[quest_iter++] = [qcmdEnter,40,0,36]; //-> przedemiscia KH

        questmap[quest_iter++] = [qcmdEnter,59,0,35]; //->KH
		
		
		questmap[quest_iter++] = [qcmdTalk2,65,9,"20.3|28.1|29.2|30.|32.1|33.1|34.1"]; // Menarik
		questmap[quest_iter++] = [qcmdEnter,48,25,235];
		questmap[quest_iter++] = [qcmdEnter,7,4,258];
		questmap[quest_iter++] = [qcmdTalk2,23,25,"20.7|137.1|138.1|139.1|140.1|143.|145.1|146.1|148.1"]; //Van-Saur
		questmap[quest_iter++] = [qcmdEnter,24,7,235];
		questmap[quest_iter++] = [qcmdEnter,12,35,35];
		questmap[quest_iter++] = [qcmdTalk2,57,24,"20.3|23.1|24.1|25.9|27.2|28."]; //straznik
		
        
		
        questmap[quest_iter++] = [qcmdEnter,5,12,1881];
		questmap[quest_iter++] = [qcmdTalk2,6,7,"20.2|21.1|22.1|23.1|28."]; //straznik2
		questmap[quest_iter++] = [qcmdEnter,17,2,1880];
		questmap[quest_iter++] = [qcmdEnter,14,13,35];

		questmap[quest_iter++] = [qcmdEnter,64,8,1883]; //dom Menarika
		questmap[quest_iter++] = [qcmdTalk2,9,5,"20.1|21.2|23.2|24.1|26.1|27.2|28.1|29.2|30.1|31.1|33.1|34.2|37.1|39.1"]; //Potwor
		questmap[quest_iter++] = [qcmdTalk2,8,10,"20.2|21.1|22.1|23.2|24.2|26.|27.|28.|29."]; //zegar
		questmap[quest_iter++] = [qcmdTalk2,6,3,"20.1|21.2|23.1"]; //kuchenka
		questmap[quest_iter++] = [qcmdTalk2,9,5,"40.1|42.1|43.1"]; //Potwor
		questmap[quest_iter++] = [qcmdEnter,8,12,35]; // KH
		questmap[quest_iter++] = [qcmdEnter,48,25,235]; //Ratusz
        questmap[quest_iter++] = [qcmdTalk2,21,8,"20.4|55.2|57.2|58.1|59.1|60.|61.|62.5|64.|65.1|66.1|68.1"]; //Straznik skarbca
        questmap[quest_iter++] = [qcmdTalk2,21,8,"20.3|49.1|51.",""]; //sztaba
        questmap[quest_iter++] = [qcmdTalk2,21,8,"20.4|69.3|70.|71.|73.|74.|76.|77.1|78.1|79.|80.1|81.2"]; //zrzut
		questmap[quest_iter++] = [qcmdTalk2,20,6,"20.1|23.",""];  //skrzynka
		questmap[quest_iter++] = [qcmdEnter,12,35,35];
		questmap[quest_iter++] = [qcmdEnter,64,8,1883]; //dom Menarika
		questmap[quest_iter++] = [qcmdTalk2,6,3,"25.2|27.1|28.|29.2|30.1|33."]; //kuchenka
		questmap[quest_iter++] = [qcmdTalk2,7,3,"20.2|22.2|23.1"]; //Polka
		questmap[quest_iter++] = [qcmdTalk2,60,58,"20.2|21.|22.|24."]; //Polka
		//50020
        questmap[quest_iter++] = [qcmdTalk2,17,13,"1.1|2.1|3."]; //Ranna osoba
		questmap[quest_iter++] = [qcmdGoto,33,4]; //swiatlo
        questmap[quest_iter++] = [qcmdTalk2,33,3,"20.1"]; //swiatlo
		questmap[quest_iter++] = [qcmdEnter,54,14,1882]; // zakazony dom
        questmap[quest_iter++] = [qcmdTalk2,7,11,"20.1|21.1|22.1|23.1|24.1|25.2|27.1"]; //Eliska
		//quest_iter = 10200;
		questmap[quest_iter++] = [qcmdTalk2,11,12,"20.2"];  // Straznik
		questmap[quest_iter++] = [qcmdTalk2,24,13,"20.1|21.1|22.1|23.1|24.1|25.1|26.1|27.1|28.2|29.1|30.|31.1|32.1|33.2"]; // Dar
		questmap[quest_iter++] = [qcmdTalk2,5,3,"20.1|21.1|22.1|23.4|25.4|27.1|29.1|30.1|31.1|32.1|33.1|34.1|37.1"]; // Terraco
		questmap[quest_iter++] = [qcmdEnter,7,12,1882]; // Wyjscie z jedzeniem
		questmap[quest_iter++] = [qcmdTalk2,11,12,"24.1"];  // jedzenie do straznika
		questmap[quest_iter++] = [qcmdTalk2,24,13,"38.1"];  // Dar
		//zrobic rewiew
		//questmap[quest_iter++] = [qcmdEnd];
        //50030
		questmap[quest_iter++] = [qcmdTalk2,5,3,"38.1|39.1|40.2|38.2|41.1|42.1|43.1|38.3|44.1|45.1|46.1|48.1|49.1|50.1|51.1|52.1|53.1|54.1|55.1|57.|58.1|59.1"]; // Terraco
				
		questmap[quest_iter++] = [qcmdEnter,7,12,1882]; // Wyjscie po denary
		questmap[quest_iter++] = [qcmdTalk2,24,13,"35.|36."];  // Dar
		//quest_iter = 50200;
        		var stepA=quest_iter;
		questmap[quest_iter++] = [qcmdTalk2,11,12,"20.|21.|22."];  // Garus
		questmap[quest_iter++] = [qcmdTalk2,10,7,"20.|21.|22.1|23.|24.|26."];  // Van Saur
		questmap[quest_iter++] = [qcmdTalk2,15,14,"20.|21.|22.1|24."];  // Hilanger

		questmap[quest_iter++] = [qcmdTalk2,10,7,"28.|30."];  // Van Saur
		questmap[quest_iter++] = [qcmdEnd];
		/// koniec questa
	}
    
        // do powtorki
        //questlist[questno++] = [   0,quest_G2_A,"Q:GarusII test"];
    questlist[questno++] = [   0,stepA,"Q:GarusII test"];
    

//questlist[questno++] = [0, 8900,"QD: Test"];

quest_iter = 8900;
{
    
    questmap[quest_iter++] = [qcmdCloseBook]; //zamknij ksiazke   
    questmap[quest_iter++] = [qcmdEnd];
}
    
quest_iter = 9000;
questlist[questno++] = [1458, 9000,"QD: Rybak"];

//////////////////////////////////////////
// Q:Jeremi Quest
//////////////////////////////////////////	
{	
    
    //czy w  Mglistym lesie
    questmap[quest_iter++] = [qcmdCheckLocation,1458];
    questmap[quest_iter++] = [qcmdProcessResult,1,9005];
    questmap[quest_iter++] = [qcmdJump,9010];
    quest_iter = 9005;
    questmap[quest_iter++] = [qcmdMessageBox,"Zla mapa!"];
    questmap[quest_iter++] = [qcmdEnd];
    //Rybak Jeremi
    quest_iter = 9010;
    //questmap[quest_iter++] = [qcmdTalk2,62,5,"20.3|25.1|26.1|27.1|28.9|29.1|140.1|141.1|142.1|143."];
    questmap[quest_iter++] = [qcmdTalkStart,62,5,"20.3|25.1|26.1|27.1|28.9|29.1"];
    
    questmap[quest_iter++] = [qcmdVerifyQuestMulti,[["7 rekin",9700],["7 maron",9800],["7 flemon",9900]]];
    questmap[quest_iter++] = [qcmdMessageBox,"Nie rozpoznano questa!"];       
    questmap[quest_iter++] = [qcmdEnd];

    ///////////////////////////////////////////////////////////////        
    //
    //              REKINY
    //
    ///////////////////////////////////////////////////////////////        
    quest_iter = 9700;
    //rekiny
    // "20.3|25.1|26.1|27.1|28.9|29.1|50.1|51.1|52.1|53."
    questmap[quest_iter++] = [qcmdTalk2,62,5,"50.1|51.1|52.1|53."];
    var restartZaniesRekiny = quest_iter;
    questmap[quest_iter++] = [qcmdCheckItem,"Rekin s",7];
    questmap[quest_iter++] = [qcmdProcessResult,qResultFalse,9710]; //nie mamy rekinow
    questmap[quest_iter++] = [qcmdCheckItem,"woda Maddok",1];
    questmap[quest_iter++] = [qcmdProcessResult,qResultFalse,9710]; //nie mamy wody
    questmap[quest_iter++] = [qcmdCheckItem,"zyk maddoka",1];
    questmap[quest_iter++] = [qcmdProcessResult,qResultFalse,9710]; //nie mamy jezyka
    questmap[quest_iter++] = [qcmdJump,9712]; 
    quest_iter = 9710;
    questmap[quest_iter++] = [qcmdMessageBox,"Nie wszystkich skladnikow (7 rekinow, woda, jezyk)!"];
    questmap[quest_iter++] = [qcmdEnd]; 
    // mamy wszytsko wiec dajemy
    questmap[quest_iter++] = [qcmdTalk2,62,5,"60.1|64.1|68.1|69."]; //oddajemy rekiny
    // idziemy po sloiki
    {
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];
        questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter,50, 0]; // -> Lazurowe Wzgórze
        questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
        questmap[quest_iter++] = [qcmdEnter,95,17]; // -> Słoneczna Wyżyna
        questmap[quest_iter++] = [qcmdEnter,63,19]; // -> Zasłonięte Jezioro
        questmap[quest_iter++] = [qcmdEnter,63,34]; // -> Spokojne Przejście
        questmap[quest_iter++] = [qcmdEnter,63,50];	// -> Eder
    
        questmap[quest_iter++] = [qcmdEnter,27,0,244]; 	// -> Fort Eder
        questmap[quest_iter++] = [qcmdTalk2,23,62,"1.1|52.1"]; //TP Fort Eder - Ithan           
        
        questmap[quest_iter++] = [qcmdEnter,40,16];	// -> Baraki
        questmap[quest_iter++] = [qcmdTalk2,14,4,"88.1|6.6|180.1|181.1"]; //Kucharka     
        questmap[quest_iter++] = [qcmdWaitSecs,60*11*6]; //wait 11 min
        questmap[quest_iter++] = [qcmdTalk2,14,4,"88.1|6.7|187.1|190.1"]; // odbierz sloiki
    }
    {
        // powrot do rybaka
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];               
        // rybak jeremi    
        questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
        questmap[quest_iter++] = [qcmdEnter,55,63,1399]; // -> Kaskady
        questmap[quest_iter++] = [qcmdGoto,81,35]; 		 // Srodek
        questmap[quest_iter++] = [qcmdEnter, 0,59,1449]; // -> Skryty Azyl
        questmap[quest_iter++] = [qcmdGoto,23,39]; 		 // Srodek
        questmap[quest_iter++] = [qcmdEnter, 4,63,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdEnter,12, 8,1485]; // -> S1
        questmap[quest_iter++] = [qcmdEnter,31,33,1484]; // -> S2
        questmap[quest_iter++] = [qcmdEnter,11,33,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdKill,52,19]; 		 
        questmap[quest_iter++] = [qcmdEnter,63,26,1458]; // -> Mglisty las            
        questmap[quest_iter++] = [qcmdGoto,62,4];
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.3|77.1"];
    }    
    {   //do leona
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];
        questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter,50, 0]; // -> Lazurowe Wzgórze
        questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
        questmap[quest_iter++] = [qcmdEnter,95,17]; // -> Słoneczna Wyżyna
        questmap[quest_iter++] = [qcmdEnter,63,19]; // -> Zasłonięte Jezioro
        questmap[quest_iter++] = [qcmdEnter,63,34]; // -> Spokojne Przejście
        questmap[quest_iter++] = [qcmdEnter,63,50];	// -> Eder
        questmap[quest_iter++] = [qcmdEnter,27,0,244]; 	// -> Fort Eder
        questmap[quest_iter++] = [qcmdTalk2,23,62,"1.1|52.2"]; //TP Fort Eder - Torneg    
        questmap[quest_iter++] = [qcmdGoto,77,36]; 		 // Podejdz do Rolnika Leona
    }        
    { //zbieraj warzywa
        questmap[quest_iter++] = [qcmdTalk2,78,36,"20.3|55.1|56.1|58.1"]; //Pytamy o warzywa   
        questmap[quest_iter++] = [qcmdTalk2,74,32,"20.2|24."]; //marchew    
        questmap[quest_iter++] = [qcmdTalk2,74,32,"20.2|24."]; //marchew    
        questmap[quest_iter++] = [qcmdTalk2,74,32,"20.2|24."]; //marchew    
        questmap[quest_iter++] = [qcmdTalk2,74,34,"20.2|24."]; //piertucha  
        questmap[quest_iter++] = [qcmdTalk2,74,34,"20.2|24."]; //piertucha     
        questmap[quest_iter++] = [qcmdTalk2,74,34,"20.2|24."]; //piertucha  
        questmap[quest_iter++] = [qcmdTalk2,78,36,"20.4|63.1|70.1|71."]; //Placimy
        questmap[quest_iter++] = [qcmdTalk2,45,39,"20.4|70.1|72."]; //Syntia        
        questmap[quest_iter++] = [qcmdGoto,54,29]; //idz do tp
        questmap[quest_iter++] = [qcmdTalk2,55,29,"1.1|52.7"]; //tp do tuzmer 
        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.7"]; //tp do tuzmer 
        questmap[quest_iter++] = [qcmdEnter, 47,63]; //do portu
        questmap[quest_iter++] = [qcmdEnter, 76,42]; //do tawerny pod bosmanskim biczem
        questmap[quest_iter++] = [qcmdTalk2,16,6,"20.7|65.2|67.2|69.3|71.2|73.1|74.1|77."]; //Barman
        questmap[quest_iter++] = [qcmdWaitSecs,60*11*6]; //wait 11 min
        questmap[quest_iter++] = [qcmdTalk2,16,6,"20.8|82."]; //Barman
    } // mamy wszystko na zupe
    
    {    
        // Wracamy do rybaka  
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];               
        questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
        questmap[quest_iter++] = [qcmdEnter,55,63,1399]; // -> Kaskady
        questmap[quest_iter++] = [qcmdGoto,81,35]; 		 // Srodek
        questmap[quest_iter++] = [qcmdEnter, 0,59,1449]; // -> Skryty Azyl
        questmap[quest_iter++] = [qcmdGoto,23,39]; 		 // Srodek
        questmap[quest_iter++] = [qcmdEnter, 4,63,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdEnter,12, 8,1485]; // -> S1
        questmap[quest_iter++] = [qcmdEnter,31,33,1484]; // -> S2
        questmap[quest_iter++] = [qcmdEnter,11,33,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdKill,52,19]; 		 
        questmap[quest_iter++] = [qcmdEnter,63,26,1458]; // -> Mglisty las            
        questmap[quest_iter++] = [qcmdGoto,62,4];
    }
    { // gotujemy
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.6|90.1"];
        questmap[quest_iter++] = [qcmdTalk2,65,6,""]; //empty
        questmap[quest_iter++] = [qcmdCloseBook]; //zamknij ksiazke
        questmap[quest_iter++] = [qcmdTalk2,64,6,"20.1|22.2|23.3|24.1|26."]; //zupa z rekinow
        
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.9|96."]; //rzuc okiem
        questmap[quest_iter++] = [qcmdWaitSecs,900]; //wait 5 mins 
        questmap[quest_iter++] = [qcmdWaitSecs,900]; //wait 5 mins 
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.9|97.1|98.1|99.1|101."]; //rzuc okiem
    }

    questmap[quest_iter++] = [qcmdEnd]; 

    ///////////////////////////////////////////////////////////////        
    //
    //              MARONY
    //
    ///////////////////////////////////////////////////////////////        

    quest_iter = 9800;  
    //marony
    // "20.3|25.1|26.1|27.1|28.9|29.1|102.1|103.1|104.1|105."
    questmap[quest_iter++] = [qcmdTalk2,62,5,"102.1|103.1|104.1|105."];
    var restartZaniesMarony = quest_iter;
    questmap[quest_iter++] = [qcmdCheckItem,"Marona",7];
    questmap[quest_iter++] = [qcmdProcessResult,qResultFalse,9810]; //nie mamy Maron
    questmap[quest_iter++] = [qcmdCheckItem,"woda Maddok",1];
    questmap[quest_iter++] = [qcmdProcessResult,qResultFalse,9810]; //nie mamy wody
    questmap[quest_iter++] = [qcmdCheckItem,"zyk maddoka",1];
    questmap[quest_iter++] = [qcmdProcessResult,qResultFalse,9810]; //nie mamy jezyka
    questmap[quest_iter++] = [qcmdJump,9812]; 
    
    quest_iter = 9810;
    questmap[quest_iter++] = [qcmdMessageBox,"Nie wszystkich skladnikow (7 maron, woda, jezyk)!"];
    questmap[quest_iter++] = [qcmdEnd]; 
    // mamy wszytsko wiec dajemy       
    questmap[quest_iter++] = [qcmdTalk2,62,5,"60.11|109.1|68.1|69."]; //oddajemy marony
    // idziemy po sloiki
    {
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];
        questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter,50, 0]; // -> Lazurowe Wzgórze
        questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
        questmap[quest_iter++] = [qcmdEnter,95,17]; // -> Słoneczna Wyżyna
        questmap[quest_iter++] = [qcmdEnter,63,19]; // -> Zasłonięte Jezioro
        questmap[quest_iter++] = [qcmdEnter,63,34]; // -> Spokojne Przejście
        questmap[quest_iter++] = [qcmdEnter,63,50];	// -> Eder
        //9820
        questmap[quest_iter++] = [qcmdEnter,27,0,244]; 	// -> Fort Eder
        questmap[quest_iter++] = [qcmdTalk2,23,62,"1.1|52.1"]; //TP Fort Eder - Ithan           
        
        questmap[quest_iter++] = [qcmdEnter,40,16];	// -> Baraki
        questmap[quest_iter++] = [qcmdTalk2,14,4,"88.1|6.8|191.1|192.1"]; //Kucharka     
        questmap[quest_iter++] = [qcmdWaitSecs,60*11*6]; //wait 11 min
        questmap[quest_iter++] = [qcmdTalk2,14,4,"88.1|6.9|197.1|200.1"]; // odbierz sloiki
    }        
    {
        // powrot do rybaka
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];               
        // rybak jeremi    
        questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
        questmap[quest_iter++] = [qcmdEnter,55,63,1399]; // -> Kaskady
        questmap[quest_iter++] = [qcmdGoto,81,35]; 		 // Srodek
        //9830
        questmap[quest_iter++] = [qcmdEnter, 0,59,1449]; // -> Skryty Azyl
        questmap[quest_iter++] = [qcmdGoto,23,39]; 		 // Srodek
        questmap[quest_iter++] = [qcmdEnter, 4,63,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdEnter,12, 8,1485]; // -> S1
        questmap[quest_iter++] = [qcmdEnter,31,33,1484]; // -> S2
        questmap[quest_iter++] = [qcmdEnter,11,33,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdKill,52,19]; 		 
        questmap[quest_iter++] = [qcmdEnter,63,26,1458]; // -> Mglisty las            
        questmap[quest_iter++] = [qcmdGoto,62,4];
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.13|118.1"]; //- mam juz sloiki

    }    
    {   //do leona
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];
        //9840
        questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter,50, 0]; // -> Lazurowe Wzgórze
        questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
        questmap[quest_iter++] = [qcmdEnter,95,17]; // -> Słoneczna Wyżyna
        questmap[quest_iter++] = [qcmdEnter,63,19]; // -> Zasłonięte Jezioro
        questmap[quest_iter++] = [qcmdEnter,63,34]; // -> Spokojne Przejście
        questmap[quest_iter++] = [qcmdEnter,63,50];	// -> Eder
        questmap[quest_iter++] = [qcmdEnter,27,0,244]; 	// -> Fort Eder
        questmap[quest_iter++] = [qcmdTalk2,23,62,"1.1|52.2"]; //TP Fort Eder - Torneg    
        questmap[quest_iter++] = [qcmdGoto,77,36]; 		 // Podejdz do Rolnika Leona
    }  
    { //zbieraj warzywa na zupe z maron
        //9850
        questmap[quest_iter++] = [qcmdTalk2,78,36,"20.5|75.1|76.1|78.1"]; //Pytamy o warzywa   
        questmap[quest_iter++] = [qcmdTalk2,79,32,"20.2|24."]; //por  
        questmap[quest_iter++] = [qcmdTalk2,79,32,"20.2|24."]; //por 
        questmap[quest_iter++] = [qcmdTalk2,79,32,"20.2|24."]; //por 
        questmap[quest_iter++] = [qcmdTalk2,79,32,"20.3|24."]; //seler
        questmap[quest_iter++] = [qcmdTalk2,79,32,"20.3|24."]; //seler
        questmap[quest_iter++] = [qcmdTalk2,79,32,"20.3|24."]; //seler
        questmap[quest_iter++] = [qcmdTalk2,78,36,"20.6|83.1|90.1"]; //Placimy
        questmap[quest_iter++] = [qcmdTalk2,45,39,"20.5|75.2|77.1|78.1|79.1"]; //Syntia        
        questmap[quest_iter++] = [qcmdTalk2,45,39,"20.1"]; //Syntia    
        //9860
        questmap[quest_iter++] = [qcmdBuy,145119245,1]; //cebula
        questmap[quest_iter++] = [qcmdBuy,145119234,1]; //jajo
        questmap[quest_iter++] = [qcmdBuy,145119255,1]; //smietana
        questmap[quest_iter++] = [qcmdBuyEnd]; //zamknij sklep
        questmap[quest_iter++] = [qcmdGoto,54,29]; //idz do tp
        questmap[quest_iter++] = [qcmdTalk2,55,29,"1.1|52.6"]; //tp do nithal 
        questmap[quest_iter++] = [qcmdEnter, 44,7]; //Do podgrodzia
        questmap[quest_iter++] = [qcmdGoto,33,44]; 
        questmap[quest_iter++] = [qcmdTalk2,33,43,"20.4|50.1|51.1|54."]; //kup cytryne
    } // mamy wsz na zupe z maron
    {    
        // Wracamy do rybaka  
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];               
        //9870
        questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
        questmap[quest_iter++] = [qcmdEnter,55,63,1399]; // -> Kaskady
        questmap[quest_iter++] = [qcmdGoto,81,35]; 		 // Srodek
        questmap[quest_iter++] = [qcmdEnter, 0,59,1449]; // -> Skryty Azyl
        questmap[quest_iter++] = [qcmdGoto,23,39]; 		 // Srodek
        questmap[quest_iter++] = [qcmdEnter, 4,63,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdEnter,12, 8,1485]; // -> S1
        questmap[quest_iter++] = [qcmdEnter,31,33,1484]; // -> S2
        questmap[quest_iter++] = [qcmdEnter,11,33,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdKill,52,19]; 		 
        //9880
        questmap[quest_iter++] = [qcmdEnter,63,26,1458]; // -> Mglisty las            
        questmap[quest_iter++] = [qcmdGoto,62,4];
    }
    { // gotujemy zupe z maron
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.16|127.1"];
        questmap[quest_iter++] = [qcmdTalk2,65,6,""]; //empty
        questmap[quest_iter++] = [qcmdCloseBook]; //zamknij ksiazke
        questmap[quest_iter++] = [qcmdTalk2,64,6,"20.5|30.1|31.1|32.4|33.1|34.4|36.2|38."]; //zupa z moron
        
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.19|131.1"]; //rzuc okiem
        questmap[quest_iter++] = [qcmdWaitSecs,900]; //wait 5 mins 
        questmap[quest_iter++] = [qcmdWaitSecs,900]; //wait 5 mins 
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.19|132.1|133.1|134.1|136."]; //rzuc okiem
    }
    //9890
    questmap[quest_iter++] = [qcmdEnd]; 
    
    ///////////////////////////////////////////////////////////////        
    //
    //              FLEMONY
    //
    ///////////////////////////////////////////////////////////////        
    
    quest_iter = 9900;  
    //flemony
    // "20.3|25.1|26.1|27.1|28.9|29.1|140.1|141.1|142.1|143."
    questmap[quest_iter++] = [qcmdTalk2,62,5,"140.1|141.1|142.1|143."];
    var restartZaniesFlemony = quest_iter;
    questmap[quest_iter++] = [qcmdCheckItem,"Flemon",7];
    questmap[quest_iter++] = [qcmdProcessResult,qResultFalse,9910]; //nie mamy Flemon
    questmap[quest_iter++] = [qcmdCheckItem,"woda Maddok",1];
    questmap[quest_iter++] = [qcmdProcessResult,qResultFalse,9910]; //nie mamy wody
    questmap[quest_iter++] = [qcmdCheckItem,"zyk maddoka",1];
    questmap[quest_iter++] = [qcmdProcessResult,qResultFalse,9910]; //nie mamy jezyka
    questmap[quest_iter++] = [qcmdJump,9912]; 
    quest_iter = 9910;
    questmap[quest_iter++] = [qcmdMessageBox,"Nie wszystkich skladnikow (7 flemon, woda, jezyk)!"];
    questmap[quest_iter++] = [qcmdEnd]; 
    // mamy wszytsko wiec dajemy 
    questmap[quest_iter++] = [qcmdTalk2,62,5,"60.21|148.1|68.1|69."]; //oddajemy flemony
    // idziemy po sloiki
    {
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];
        questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter,50, 0]; // -> Lazurowe Wzgórze
        questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
        questmap[quest_iter++] = [qcmdEnter,95,17]; // -> Słoneczna Wyżyna
        questmap[quest_iter++] = [qcmdEnter,63,19]; // -> Zasłonięte Jezioro
        questmap[quest_iter++] = [qcmdEnter,63,34]; // -> Spokojne Przejście
        questmap[quest_iter++] = [qcmdEnter,63,50];	// -> Eder
    
        questmap[quest_iter++] = [qcmdEnter,27,0,244]; 	// -> Fort Eder
        questmap[quest_iter++] = [qcmdTalk2,23,62,"1.1|52.1"]; //TP Fort Eder - Ithan           
        
        questmap[quest_iter++] = [qcmdEnter,40,16];	// -> Baraki
        questmap[quest_iter++] = [qcmdTalk2,14,4,"88.1|6.10|205.1|206.1"]; //Kucharka     

        questmap[quest_iter++] = [qcmdWaitSecs,60*11*6]; //wait 11 min
        questmap[quest_iter++] = [qcmdTalk2,14,4,"88.1|6.11|212.1|215.1"]; // odbierz sloiki
    }        
    {
        // powrot do rybaka
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];               
        // rybak jeremi    
        questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
        questmap[quest_iter++] = [qcmdEnter,55,63,1399]; // -> Kaskady
        questmap[quest_iter++] = [qcmdGoto,81,35]; 		 // Srodek
        questmap[quest_iter++] = [qcmdEnter, 0,59,1449]; // -> Skryty Azyl
        questmap[quest_iter++] = [qcmdGoto,23,39]; 		 // Srodek
        questmap[quest_iter++] = [qcmdEnter, 4,63,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdEnter,12, 8,1485]; // -> S1
        questmap[quest_iter++] = [qcmdEnter,31,33,1484]; // -> S2
        questmap[quest_iter++] = [qcmdEnter,11,33,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdKill,52,19]; 		 
        questmap[quest_iter++] = [qcmdEnter,63,26,1458]; // -> Mglisty las            
        questmap[quest_iter++] = [qcmdGoto,62,4];
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.23|152.1"]; // mam sloiki


    }    
    {   //do leona
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];
        questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter,50, 0]; // -> Lazurowe Wzgórze
        questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
        questmap[quest_iter++] = [qcmdEnter,95,17]; // -> Słoneczna Wyżyna
        questmap[quest_iter++] = [qcmdEnter,63,19]; // -> Zasłonięte Jezioro
        questmap[quest_iter++] = [qcmdEnter,63,34]; // -> Spokojne Przejście
        questmap[quest_iter++] = [qcmdEnter,63,50];	// -> Eder
        questmap[quest_iter++] = [qcmdEnter,27,0,244]; 	// -> Fort Eder
        questmap[quest_iter++] = [qcmdTalk2,23,62,"1.1|52.2"]; //TP Fort Eder - Torneg    
        questmap[quest_iter++] = [qcmdGoto,77,36]; 		 // Podejdz do Rolnika Leona
    }  
    { //zbieraj warzywa na zupe z flemon
        questmap[quest_iter++] = [qcmdTalk2,78,36,"20.7|95.1|96.1"]; //Pytamy o warzywa    
        questmap[quest_iter++] = [qcmdTalk2,74,32,"20.2|24."]; //marchew    
        questmap[quest_iter++] = [qcmdTalk2,74,34,"20.2|24."]; //piertucha   
        questmap[quest_iter++] = [qcmdTalk2,79,32,"30.3|24."]; //seler  
        questmap[quest_iter++] = [qcmdTalk2,78,36,"20.8|100.1|107."]; //Placimy
        questmap[quest_iter++] = [qcmdTalk2,45,39,"20.6|85.1|87.1"]; //Syntia
        questmap[quest_iter++] = [qcmdBuy,145119245,1]; //kup pietruche
        questmap[quest_iter++] = [qcmdBuyEnd]; //zamknij sklep
        questmap[quest_iter++] = [qcmdGoto,54,29]; //idz do tp
        questmap[quest_iter++] = [qcmdTalk2,55,29,"1.1|52.6"]; //tp do nithal 
        questmap[quest_iter++] = [qcmdEnter, 44,7]; //Do podgrodzia
        questmap[quest_iter++] = [qcmdGoto,33,44]; 
        questmap[quest_iter++] = [qcmdTalk2,33,43,"20.5|55.1|56.1"]; //kup cytryne        
        questmap[quest_iter++] = [qcmdBuy,145119245,1]; //kup czosnek
        questmap[quest_iter++] = [qcmdBuy,145119239,1]; //kup papryke
        questmap[quest_iter++] = [qcmdBuyEnd]; //zamknij sklep   
        questmap[quest_iter++] = [qcmdEnter, 26,63]; //Do nithal        
        questmap[quest_iter++] = [qcmdTalk2,57,40,"29.1|52.7"]; //tp do tuzmer 
        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.7"]; //tp do tuzmer 
        questmap[quest_iter++] = [qcmdEnter, 47,63]; //do portu
        questmap[quest_iter++] = [qcmdEnter, 76,42]; //do tawerny pod bosmanskim biczem
        questmap[quest_iter++] = [qcmdTalk2,16,6,"20.9|85.1|86.1|89.1"]; //Barman
        questmap[quest_iter++] = [qcmdWaitSecs,60*11*6]; //wait 11 min
        questmap[quest_iter++] = [qcmdTalk2,16,6,"20.10|92."]; //Barman

   } // mamy wszystko na zupe z flemon
    {    
        // Wracamy do rybaka  
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];               
        //9870
        questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
        questmap[quest_iter++] = [qcmdEnter,55,63,1399]; // -> Kaskady
        questmap[quest_iter++] = [qcmdGoto,81,35]; 		 // Srodek
        questmap[quest_iter++] = [qcmdEnter, 0,59,1449]; // -> Skryty Azyl
        questmap[quest_iter++] = [qcmdGoto,23,39]; 		 // Srodek
        questmap[quest_iter++] = [qcmdEnter, 4,63,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdEnter,12, 8,1485]; // -> S1
        questmap[quest_iter++] = [qcmdEnter,31,33,1484]; // -> S2
        questmap[quest_iter++] = [qcmdEnter,11,33,1448]; // -> Zlota Dabrowa
        questmap[quest_iter++] = [qcmdKill,52,19]; 		 
        questmap[quest_iter++] = [qcmdEnter,63,26,1458]; // -> Mglisty las            
        questmap[quest_iter++] = [qcmdGoto,62,4];
    }
   // usun
   questmap[quest_iter++] = [qcmdEnd];  
  { // gotujemy zupe z flemon
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.26|168.1"];
        questmap[quest_iter++] = [qcmdTalk2,65,6,""]; //empty
        questmap[quest_iter++] = [qcmdCloseBook]; //zamknij ksiazke
        questmap[quest_iter++] = [qcmdTalk2,64,6,"20.7|40.3|41.4|42.1|43.1|44.4|45.2|47.2|49."]; //zupa z flemon
        
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.29|171."]; //rzuc okiem
        questmap[quest_iter++] = [qcmdWaitSecs,900]; //wait 5 mins 
        questmap[quest_iter++] = [qcmdWaitSecs,900]; //wait 5 mins 
        questmap[quest_iter++] = [qcmdTalk2,62,5,"60.29|172.1|173.1|174.1|176."]; //rzuc okiem
    }
 
    

    questmap[quest_iter++] = [qcmdEnd]; 
}

questlist[questno++] = [1458, restartZaniesRekiny, "QD: Mam7Rekinow"];
questlist[questno++] = [1458, restartZaniesMarony, "QD: Mam7Maron"];
questlist[questno++] = [1458, restartZaniesFlemony,"QD: Mam7Flemon"];





    
    /*
    quest_iter = 9100;
    questmap[quest_iter++] = [qcmdVerifyQuest,"czosnek oraz oliwę z oliwek"];
    questmap[quest_iter++] = [qcmdProcessResult,qResultTrue,9110]; //flemony
    questmap[quest_iter++] = [qcmdVerifyQuest,"3 pory, 3 selery"];
    questmap[quest_iter++] = [qcmdProcessResult,qResultTrue,9200]; //marony
    questmap[quest_iter++] = [qcmdVerifyQuest,""];
    questmap[quest_iter++] = [qcmdProcessResult,qResultTrue,9300]; //rekiny
    questmap[quest_iter++] = [qcmdMessageBox,"Nie rozpoznano questa!"];
    questmap[quest_iter++] = [qcmdEnd];
    */








questlist[questno++] = [1458, 16000,"Q:Zupa z flemon"];
questlist[questno++] = [1458, 16100,"Q:Zupa z rekinow"];
questlist[questno++] = [1458, 16200,"Q:Zupa z maron"];

quest_iter = 16000;
questmap[quest_iter++] = [qcmdTalk2,65,6,""]; //empty
questmap[quest_iter++] = [qcmdCloseBook]; //zamknij ksiazke
questmap[quest_iter++] = [qcmdTalk,64,6,"20.7|40.3|41.4|42.1|43.1|44.4|45.2|47.2|49.",argNotTeleport];
questmap[quest_iter++] = [qcmdEnd];
quest_iter = 16100;
questmap[quest_iter++] = [qcmdTalk2,65,6,""]; //empty
questmap[quest_iter++] = [qcmdCloseBook]; //zamknij ksiazke
questmap[quest_iter++] = [qcmdTalk,64,6,"20.1|22.2|23.3|24.1|26.",argNotTeleport];
questmap[quest_iter++] = [qcmdEnd];		
quest_iter = 16200;
questmap[quest_iter++] = [qcmdTalk2,65,6,""]; //empty
questmap[quest_iter++] = [qcmdCloseBook]; //zamknij ksiazke
questmap[quest_iter++] = [qcmdTalk,64,6,"20.5|30.1|31.1|32.4|33.1|34.4|36.2|38.",argNotTeleport];
questmap[quest_iter++] = [qcmdEnd];	    
    quest_iter = 13000;
    questlist[questno++] = [33, quest_iter,"QD: Zdr.Bankiera"];
    questlist[questno++] = [244, quest_iter-1,"QD: Zdr.Bankiera"];
    
    /////////////////////////////////////////
	// Q:Zdrada bankiera
	//////////////////////////////////////////	
    
    {
		//check if in Eder
		quest_iter = quest_iter-1;
        questmap[quest_iter++] = [qcmdEnter,27,95]; // Nithal
        questmap[quest_iter++] = [qcmdCheckLocation,33];
		questmap[quest_iter++] = [qcmdProcessResult,1,13005];
		questmap[quest_iter++] = [qcmdJump,13010];
		quest_iter = 13005;
		questmap[quest_iter++] = [qcmdMessageBox,"Nie jestes w Eder!"];
		questmap[quest_iter++] = [qcmdEnd];

		quest_iter = 13010
        questmap[quest_iter++] = [qcmdTalk2,20,70,"24.2|26.1|27."]; //Perth
        questmap[quest_iter++] = [qcmdTalk2,7,7,"20.2|31.1|40.2|41.1|42.1|43.1"]; //Lageira
        var restZB = quest_iter;  
        questmap[quest_iter++] = [qcmdTalk2,71,54,"20.1|21.1|22.1|23.1|25.1"]; //Ruffin
        questmap[quest_iter++] = [qcmdEnter,44,31]; // Ratusz
        questmap[quest_iter++] = [qcmdTalk2,37,13,"20.3|72.4|74.|76.2|77.1|78.1|79.1|80.2|81.1|82.2|84.1|86.1"]; //Rea Animi
        questmap[quest_iter++] = [qcmdEnter,23,3]; // Ratusz - muzeum
        questmap[quest_iter++] = [qcmdTalk2,27,8,"20.1|21.2|22.1|24.1|25.1|26.1|28.2|33.1"]; //Leiff
        questmap[quest_iter++] = [qcmdEnter,24,8]; // Ratusz
        questmap[quest_iter++] = [qcmdEnter,24,23]; // Nithal
        questmap[quest_iter++] = [qcmdTalk2,57,40,"29.1|52.5"]; //Portal
        //13020
        var next_line = quest_iter+1;
        questmap[quest_iter++] = [qcmdJump,next_line]; //wstawilem skok do next linii by nie burzyc tych numerow linii
        questmap[quest_iter++] = [qcmdTalk2,11,73,"55.2|56.1|57.1"]; //przemytnik Nespurnik
        questmap[quest_iter++] = [qcmdTalk2,15,7,"20.1|25.1|26.|27.1|28.2|31.|33.2|35.1|36.1|39.2|41.1|42.2|45.1|46.1"]; //Garek
        questmap[quest_iter++] = [qcmdTalk2,16,9,"20.1|21."]; //Wykidajlo
        
        var restZB = quest_iter;   
        questmap[quest_iter++] = [qcmdEnter,45,95]; // Gosciniec Bardow
        questmap[quest_iter++] = [qcmdEnter,26,95]; // Nizina wiesniakow
        questmap[quest_iter++] = [qcmdTalk2,29,15,"20.1|21.2|22.1|23.2|24.3|25.1|26.1|27.1|29.2|30."]; //Mysliwy Vermir
        questmap[quest_iter++] = [qcmdKill,26,16]; // Swierszczyk
        questmap[quest_iter++] = [qcmdTalk2,29,15,"31.1|35.1|36.2|38.1"]; //Mysliwy Vermir
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];
        //13030
        questmap[quest_iter++] = [qcmdKill,48,32]; // Bandyta
        questmap[quest_iter++] = [qcmdEnter,51,0]; // Lazurowe
        questmap[quest_iter++] = [qcmdKill,5,52]; //kobra
        questmap[quest_iter++] = [qcmdEnter,3,44]; // Chata
        questmap[quest_iter++] = [qcmdEnter,12,3]; // p1
        questmap[quest_iter++] = [qcmdTalk2,12,10,"20.2|22.1|23.2|29.1|30.1|31.1|32.2|34.1"]; //Chiron
        questmap[quest_iter++] = [qcmdEnter,12,4]; // Chata
        questmap[quest_iter++] = [qcmdEnter,8,13]; // Lazurowe
		questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
		questmap[quest_iter++] = [qcmdEnter,95,17]; // -> Sloneczna Wyzyna
		questmap[quest_iter++] = [qcmdEnter,63,19]; // -> Zasloniete Jezioro
        //13040
        questmap[quest_iter++] = [qcmdEnter,63,34]; // -> Spokojne Przejscie
		questmap[quest_iter++] = [qcmdEnter,63,50];	// -> Eder
        questmap[quest_iter++] = [qcmdGoto,26,41];	// -> Eder
        questmap[quest_iter++] = [qcmdTalk2,26,40,"20.1|71.7"]; //TP 

        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.7"]; //TP
        questmap[quest_iter++] = [qcmdEnter,46,63];	// -> Port Tuzmer
        questmap[quest_iter++] = [qcmdTalk2,21,43,"20.1|21.2|22.1|23.1|24.1|25.1|26.1|27.2|28.1|30."]; //Tyberiasz
        questmap[quest_iter++] = [qcmdEnter,46,0];	// ->Tuzmer
        questmap[quest_iter++] = [qcmdEnter,31,34];	// ->Tawerna
        questmap[quest_iter++] = [qcmdEnter,8,2];	// ->P1
        //13050
        questmap[quest_iter++] = [qcmdTalk2,5,4,"20.1|21.1|23.1|25.1|26.1|27.1|28.2|29.1|30.1|31.2|32.1|33.1|34.1|35.1|36.1|40.1|41.1|42.1|43.3|46.1"]; //Mezczyzna
        questmap[quest_iter++] = [qcmdEnter,14,2];	// ->Mieszkanie
        
questmap[quest_iter++] = [qcmdTalk2,5,5,"20.2|22.1"]; //Zabierz ksiege z szuflady
questmap[quest_iter++] = [qcmdEnter,8,6];	// -> wyjdz 
questmap[quest_iter++] = [qcmdEnter,8,4];	// -> wyjdz 
questmap[quest_iter++] = [qcmdEnter,12,16];	// -> wyjdz 
questmap[quest_iter++] = [qcmdTalk2,51,33,"20.1|43.1"]; // Rozmowa z NPC
questmap[quest_iter++] = [qcmdTalk2,3,79,"40.5"]; //do eder
        
        questmap[quest_iter++] = [qcmdTalk2,11,73,"59.1"]; //przemytnik Nespurnik
        questmap[quest_iter++] = [qcmdTalk2,15,7,"49.1|50.1|53.2|54.2|58.2|59.1|60.1|61.1|62.2|65.1"]; //Garek
        questmap[quest_iter++] = [qcmdTalk2,16,9,"20.1|21."]; //Wykidajlo        
        questmap[quest_iter++] = [qcmdEnter,45,95]; // Gosciniec Bardow

        questmap[quest_iter++] = [qcmdEnter,26,95]; // Nizina wiesniakow        
        questmap[quest_iter++] = [qcmdEnter,95,5]; // -> Podgrodzie
        questmap[quest_iter++] = [qcmdTalk2,56,20,"20.2|26.1|29.1"]; //Grimar  
        questmap[quest_iter++] = [qcmdEnter,57,19]; // -> Stajnia
        questmap[quest_iter++] = [qcmdTalk2,6,13,"20.2|23.1"]; //Wiadro 
		//13070
        questmap[quest_iter++] = [qcmdTalk2,2,6,"20.1|23."]; //Beczka z piwem 
        questmap[quest_iter++] = [qcmdGoto,5,5]; //podejdz pod Lasso 
        questmap[quest_iter++] = [qcmdTalk2,4,4,"20.1|23."]; //Lasso 
        questmap[quest_iter++] = [qcmdTalk2,8,6,"20.1|23."]; //Worek z cukrem
        questmap[quest_iter++] = [qcmdTalk2,13,6,"20.1|23."]; //Worek z Trocinami

        questmap[quest_iter++] = [qcmdTalk2,9,13,"20.1|23."]; //Ziemniaki 
        questmap[quest_iter++] = [qcmdTalk2,9,9,"34.1|36."]; //Didler 
        questmap[quest_iter++] = [qcmdTalk2,6,6,"20.2|21.1|22.1|23.1|24.1|25.1"]; //Szuflady 
        questmap[quest_iter++] = [qcmdTalk2,5,17,"23.5|36."]; //Wlewamy piwo
        questmap[quest_iter++] = [qcmdTalk2,6,9,"23.7|36."]; //Wrzucamy trociny
		//13080
        questmap[quest_iter++] = [qcmdTalk2,10,17,"23.4|36."]; //Wrzucamy ziemniaki
        questmap[quest_iter++] = [qcmdTalk2,9,12,"23.8|36."]; //Lina
        questmap[quest_iter++] = [qcmdTalk2,10,7,"23.9|36."]; //Denar
        questmap[quest_iter++] = [qcmdTalk2,6,13,"26.1"]; //Wiadro
        questmap[quest_iter++] = [qcmdTalk2,9,9,"37.1|39.1|40."]; //Didler 
        questmap[quest_iter++] = [qcmdTalk2,6,13,"29.1|31."]; //Wiadro
        questmap[quest_iter++] = [qcmdTalk2,7,7,"46.1|47."]; //Lageira
        questmap[quest_iter++] = [qcmdTalk2,8,13,"20.2"]; //Perth
        questmap[quest_iter++] = [qcmdEnd];
    }
    
    //questlist[questno++] = [0, restZB,"Q: Zdr.Bankiera2"];   
    
    quest_start = 14000;
    questlist[questno++] = [2, quest_start,"QD: 210 lvl"];
    

	//////////////////////////////////////////
	// Q:Dzienny 210
	//////////////////////////////////////////	
	{	
		quest_iter = quest_start;
		questmap[quest_iter++] = [qcmdCheckLocation,2];
		questmap[quest_iter++] = [qcmdProcessResult,2,quest_start+5];
		questmap[quest_iter++] = [qcmdJump,quest_start+10];
		quest_iter = quest_start+5;
		questmap[quest_iter++] = [qcmdMessageBox,"Zla lokacja!"];
		questmap[quest_iter++] = [qcmdEnd];

		quest_iter = quest_start+10;
    
        questmap[quest_iter++]=[qcmdTalk2,48,27,"21.4|130.1|131.1|132.1|134.1"]; // -> cedrik
        questmap[quest_iter++]=[qcmdEnter,29,58]; // -> dom toksynariusza
        questmap[quest_iter++]=[qcmdTalk2,5,6,"55.1|60.1|61.1|63.1"]; // -> toksynariusz
        questmap[quest_iter++]=[qcmdTalk2,5,6,"55.2|69.1|70.1|71."]; // -> toksynariusz2
        questmap[quest_iter++]=[qcmdTalk2,5,6,"55.3|80.1"]; // -> toksynariusz3
        questmap[quest_iter++]=[qcmdTalk2,8,6,"20.1|22."]; // -> rozmowa z toksynariuszem w pracowni
        questmap[quest_iter++]=[qcmdTalk2,5,3,"20.3|21.1|23."]; // -> pajecze odnoza
        questmap[quest_iter++]=[qcmdTalk2,4,3,"20.2|29."]; // -> fiolka1
        questmap[quest_iter++]=[qcmdGoto,3,6];  // -> podejscie pod roztwor z ziol
        questmap[quest_iter++]=[qcmdTalk2,2,6,"20.1"]; // -> roztwor z ziol
        questmap[quest_iter++]=[qcmdTalk2,10,10,"20.1"]; // -> toksyny
        questmap[quest_iter++]=[qcmdTalk2,6,3,"20.1|25.2|30.4|33."]; // -> fiolka2
        questmap[quest_iter++]=[qcmdTalk2,8,3,"20.2|24.3|27.1|30.1|34."]; // -> fiolka3
        questmap[quest_iter++]=[qcmdTalk2,10,3,"20.2|34."]; // -> fiolka4
        questmap[quest_iter++]=[qcmdTalk2,8,6,"20.8|65.1"]; // -> rozmowa z toksynariuszem w pracowni2
        questmap[quest_iter++]=[qcmdTalk2,48,27,"21.5|140.1|141.1|143."]; // -> cedrik2
        questmap[quest_iter++]=[qcmdTalk2,78,36,"20.9|110.1|112.1"]; // -> rozmowa z rolnikiem
        questmap[quest_iter++]=[qcmdEnter,75,54]; // -> dom sary
        questmap[quest_iter++]=[qcmdEnter,12,10]; // -> dom sary - piwnica
        questmap[quest_iter++]=[qcmdKill,9,6];  // zabij pajaka
        questmap[quest_iter++]=[qcmdTalk2,9,5,"20.1"]; // -> pajecze kokony
        questmap[quest_iter++]=[qcmdKill,3,7];  // zabij pajaka2
        questmap[quest_iter++]=[qcmdKill,26,42];  // zabij grupe pajakow
        questmap[quest_iter++]=[qcmdKill,25,46];  // zabij grupe pajakow2
        questmap[quest_iter++]=[qcmdTalk2,22,45,"20.1|21.2","Marika"]; // -> marika
        questmap[quest_iter++]=[qcmdTalk2,48,27,"21.6|151.1"]; // -> cedrik3
        questmap[quest_iter++]=[qcmdEnter,29,58]; // -> dom toksynariusza2
        questmap[quest_iter++]=[qcmdTalk2,5,6,"55.8|85.1"]; // -> toksynariusz4
        questmap[quest_iter++]=[qcmdEnter,5,12]; // -> dom toksynariusza - wyjscie
        questmap[quest_iter++]=[qcmdTalk2,14,6,"105.1|108."]; // -> pastuch mir
        questmap[quest_iter++]=[qcmdTalk2,26,26,"110.1|113."]; // -> galis
        questmap[quest_iter++]=[qcmdTalk2,15,35,"1.9|52."]; // -> szagarat czarny lowca
        questmap[quest_iter++]=[qcmdTalk2,30,5,"20.2|192."]; // -> den
        questmap[quest_iter++]=[qcmdTalk2,44,27,"130.1|140.1|143."]; // -> lidia
        questmap[quest_iter++]=[qcmdTalk2,53,35,"20.3|80.1|83."]; // -> alan
        questmap[quest_iter++]=[qcmdTalk2,52,37,"1.6|70.1|73."]; // -> edar
        questmap[quest_iter++]=[qcmdTalk2,42,55,"20.8|79.1|82."]; // -> umbar
        questmap[quest_iter++]=[qcmdTalk2,78,36,"20.10|120.1|123."]; // -> rozmowa z rolnikiem2
        questmap[quest_iter++]=[qcmdTalk2,62,18,"1.6|50.1|53."]; // -> alrik
        questmap[quest_iter++]=[qcmdTalk2,78,9,"1.6|70.1|73."]; // -> wysoka kaplanka grifia
        questmap[quest_iter++]=[qcmdEnter,29,58]; // -> dom toksynariusza3
        questmap[quest_iter++]=[qcmdTalk2,5,6,"55.17|91."]; // -> toksynariusz5
        questmap[quest_iter++]=[qcmdEnter,5,12]; // -> dom toksynariusza - wyjscie2
        questmap[quest_iter++]=[qcmdTalk2,48,27,"21.7|155.1|158."]; // -> cedrik4
        questmap[quest_iter++]=[qcmdEnd];
    
    
    }   
    
    quest_start = 15000;
 	//////////////////////////////////////////
	// QD:230
	//////////////////////////////////////////	
	{	    
        questlist[questno++] = [ 35, quest_start,"QD:230"];
        questlist[questno++] = [ 36, quest_start+1,"QD:230"]; 
        
        
        quest_iter = quest_start;
        questmap[quest_iter++] = [qcmdEnter,58,63]; 

        questmap[quest_iter++] = [qcmdTalk2,56,8,"20.2|22.2|26.1|27.2|29."]; //rozmowa z babka
        questmap[quest_iter++] = [qcmdWaitSecs,900]; //wait 5 mins 
        questmap[quest_iter++] = [qcmdTalk2,56,8,"50.1|51.1|52.1|53.1|58.1"]; //rozmowa z babka
        questmap[quest_iter++] = [qcmdEnter,58,0,35]; //przejscie do k-h
        questmap[quest_iter++] = [qcmdTalk2,43,28,"1.1|52.6"]; //do Nithal
        questmap[quest_iter++] = [qcmdEnter,44,7,574]; //przejscie do podgrodzia
        questmap[quest_iter++] = [qcmdEnter,86,26,575]; //do stodoly
        questmap[quest_iter++] = [qcmdEnter,4,2,876]; //stodola p1
        
        var ges_loop = quest_iter; 
        questmap[quest_iter++] = [qcmdTalk2,9,8,"20.2|19.|"]; //Ges jeszcze 25.
        
        questmap[quest_iter++] = [qcmdWaitSecs,30]; //wait 5 secs
        questmap[quest_iter++] = [qcmdCheckItem,"Gęsie piórko"];
        questmap[quest_iter++] = [qcmdProcessResult,qResultTrue,15020]; //mamy piorko
        //nie mamy piorka
        questmap[quest_iter++] = [qcmdWaitSecs,900]; //wait 5 mins 
        questmap[quest_iter++] = [qcmdJump,ges_loop];
        
        quest_iter = 15020;
        questmap[quest_iter++] = [qcmdEnter,5,6,877]; //stodola
        questmap[quest_iter++] = [qcmdEnter,8,15,876]; //podgrodzie
        questmap[quest_iter++] = [qcmdEnter,27,63,575]; //nithal
        questmap[quest_iter++] = [qcmdTalk2,57,40,"29.1|52.4"]; //k-h
        questmap[quest_iter++] = [qcmdEnter,59,63,35]; //przedmiescia
        questmap[quest_iter++] = [qcmdTalk2,56,8,"50.2|61.2|64.1"]; //rozmowa z babka
        questmap[quest_iter++] = [qcmdEnter,58,0,35]; //przejscie do k-h
        questmap[quest_iter++] = [qcmdTalk2,43,28,"1.1|52.3"]; //do werbin
        questmap[quest_iter++] = [qcmdEnter,27,11,9]; //dom jalena i tafii
        questmap[quest_iter++] = [qcmdTalk2,8,6,"33.1|34.|35.1"]; //piwnica


        questmap[quest_iter++] = [qcmdWaitSecs,10]; //wait 5 secs
        questmap[quest_iter++] = [qcmdGoto,9,8]; //podejdz
        questmap[quest_iter++] = [qcmdTalk2,9,7,"20.2|25.1|26.2|30."]; //werbin
        questmap[quest_iter++] = [qcmdTalk2,27,19,"1.1|52.7"]; //trupia przelecz
        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.7"]; //tuzmer
        questmap[quest_iter++] = [qcmdEnter,34,17,589]; //dom telsara
        questmap[quest_iter++] = [qcmdEnter,6,5,1492]; //dom dziadka jerzyka
        questmap[quest_iter++] = [qcmdEnter,4,9,1494]; //tuzmer
        questmap[quest_iter++] = [qcmdEnter,29,11,589]; //dom bernarda
        questmap[quest_iter++] = [qcmdTalk2,8,8,"20.1"]; //bernard
        questmap[quest_iter++] = [qcmdBuy,145119249,1]; //Kup wisienki
       
        questmap[quest_iter++] = [qcmdEnter,9,10,1490]; //tuzmer
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];
        questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; //Gluchy las
        questmap[quest_iter++] = [qcmdEnter, 0,45,576]; //Zapomniana Sciezyna
        questmap[quest_iter++] = [qcmdEnter, 0,37,500]; //Lisciaste rozstaje
        questmap[quest_iter++] = [qcmdEnter, 0,44,229]; //Las dziwow
        questmap[quest_iter++] = [qcmdEnter, 0,47,246]; //Zlowrogie bagna
        
        questmap[quest_iter++] = [qcmdGoto,31,33]; //Srodek planszy
        questmap[quest_iter++] = [qcmdEnter, 0,27,257]; //Mythar

        questmap[quest_iter++] = [qcmdEnter,28,53,257]; //dom walasara
        questmap[quest_iter++] = [qcmdEnter,3,2,316]; //walasar p1

        questmap[quest_iter++] = [qcmdTalk2,5,6,"20.1"]; //pietrucha od sanioli
        questmap[quest_iter++] = [qcmdBuy,145119238,1]; //kup pietruche
        questmap[quest_iter++] = [qcmdEnter,3,4,317]; //walasar
        questmap[quest_iter++] = [qcmdEnter,12,14,316]; //mythar
        questmap[quest_iter++] = [qcmdTalk2,67,56,"20.1|24.1|25."] //owca
        questmap[quest_iter++] = [qcmdTalk2,67,58,"23.2|24.1|21."] //krzaki
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];
        questmap[quest_iter++] = [qcmdKill,48,32]; //zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter,50, 0]; //Lazurowe Wzgórze
        questmap[quest_iter++] = [qcmdKill,19,26]; //zabij weza na drodze
        questmap[quest_iter++] = [qcmdEnter,95,17]; //Słoneczna Wyżyna
        questmap[quest_iter++] = [qcmdEnter,63,19]; //Zasłoniête Jezioro
        questmap[quest_iter++] = [qcmdEnter,63,34]; //Spokojne Przejście
        questmap[quest_iter++] = [qcmdEnter,63,50]; //Eder
        questmap[quest_iter++] = [qcmdTalk2,26,40,"20.1|71.4"]; //do k-h
        questmap[quest_iter++] = [qcmdEnter,17,23,35]; //dom rzeznika
        
        questmap[quest_iter++] = [qcmdTalk2,9,10,"20.3|50.1|51.1|52.2"]; //rzeznik
        questmap[quest_iter++] = [qcmdEnter,8,12,1894]; //k-h
        questmap[quest_iter++] = [qcmdEnter,59,63,35]; //przedmiescia
        questmap[quest_iter++] = [qcmdTalk2,90,9,"50.1|51.1|53.1"]; //glusza

        
        questmap[quest_iter++] = [qcmdTalk2,5,62,"20.1|21.|22.|23.1|24.1|25.1|26."]; //zebro
		
        questmap[quest_iter++] = [qcmdGoto,59,7]; //shailin
        questmap[quest_iter++] = [qcmdCheckNPC,58,7]; //shailin
		var shailin_loop = quest_iter;
        questmap[quest_iter++] = [qcmdProcessResult,qResultTrue,15110]; //jest
        //nie ma
        questmap[quest_iter++] = [qcmdWaitSecs,50]; //wait 
        questmap[quest_iter++] = [qcmdJump,shailin_loop];
        
        quest_iter = 15110;
        questmap[quest_iter++] = [qcmdTalk2,58,7,""]; //shailin2 - znika 
         var pietrucha = quest_iter;       
        questmap[quest_iter++] = [qcmdTalk2,5,62,"11.1"]; //przedmiescia
        questmap[quest_iter++] = [qcmdEnter,59,0,36]; //k-h
        questmap[quest_iter++] = [qcmdEnter,17,23,35]; //dom rzeznika
        questmap[quest_iter++] = [qcmdWaitSecs,700]; //wait 5 mins 
        questmap[quest_iter++] = [qcmdTalk2,9,10,"56.1|63.1"]; //rzeznik
        questmap[quest_iter++] = [qcmdWaitSecs,3000]; //wait 15mins++++
        questmap[quest_iter++] = [qcmdTalk2,9,10,"66.1"]; //rzeznik
        questmap[quest_iter++] = [qcmdEnter,8,12,1894]; //k-h
        questmap[quest_iter++] = [qcmdEnter,59,63,35]; //przedmiescia
        questmap[quest_iter++] = [qcmdTalk2,56,8,"50.3|67.2|68.1|69."]; //babka
        questmap[quest_iter++] = [qcmdWaitSecs,900]; //wait 5 min
        questmap[quest_iter++] = [qcmdTalk2,56,8,"50.4|71.1|74.1"]; //babka
        questmap[quest_iter++] = [qcmdEnter,59,0,36]; //k-h
        //1. mag - pierwsze nawrocenie
        questmap[quest_iter++] = [qcmdTalk2,39,26,"90.1|91.1|92.|96."]; // !udalo sie
        //2. kleofas
        questmap[quest_iter++] = [qcmdEnter,22,8]; //kamienica kleofasa
        questmap[quest_iter++] = [qcmdTalk2,8,6,"90.1|91.1|94.|95."]; // nie udalo sie
        //3. Lifiana
        questmap[quest_iter++] = [qcmdEnter,4,2]; //kamienica kleofasa   p.1                                                    
        questmap[quest_iter++] = [qcmdTalk2,9,5,"50.1|51.1|52.|56."]; // !udalo sie
        questmap[quest_iter++] = [qcmdEnter,4,5]; //zejscie z p.1 do kamienicy kleofasa   
        questmap[quest_iter++] = [qcmdEnter,18,13]; //wyjscie do KH
        //4. Aurelia 
        questmap[quest_iter++] = [qcmdTalk2,20,8,"97.1|98.1|99.|103."]; // !udalo sie

        //5. Dionizy
        questmap[quest_iter++] = [qcmdEnter,19,8]; // do: Dom Aurelii i Dionizego
        questmap[quest_iter++] = [qcmdTalk2,8,9,"50.1|51.1|52.|56."]; // !udalo sie
        questmap[quest_iter++] = [qcmdEnter,7,11]; //wyjscie do KH

        //6. Apoks
        questmap[quest_iter++] = [qcmdTalk2,12,11,"50.1|51.1|52.|54."]; // nie udalo sie

        //7. Kalicja
        questmap[quest_iter++] = [qcmdEnter,13,11]; // do: Dom Apoksa
        questmap[quest_iter++] = [qcmdTalk2,11,6,"50.1|51.1|52.|54."]; // nie udalo sie       
        questmap[quest_iter++] = [qcmdEnter,5,12]; //wyjscie do KH
        //8. Zeina
        questmap[quest_iter++] = [qcmdEnter,9,8]; //dom zeiny
        questmap[quest_iter++] = [qcmdTalk2,9,6,"50.1|51.1|52.|56."]; // !udalo sie         
        questmap[quest_iter++] = [qcmdEnter,7,11]; //wyjscie do KH
        
        //9. Lenka
        questmap[quest_iter++] = [qcmdEnter,4,9]; //dom Lenki
        questmap[quest_iter++] = [qcmdTalk2,7,7,"70.1|71.1|72.|76."]; // !udalo sie         
        questmap[quest_iter++] = [qcmdEnter,7,11]; //wyjscie do KH
        
        //9. Nufrex
        questmap[quest_iter++] = [qcmdEnter,12,27]; //dom Nufrexa
        questmap[quest_iter++] = [qcmdTalk2,7,9,"80.1|81.1|82.|86."]; // !udalo sie   x7      
        questmap[quest_iter++] = [qcmdEnter,12,8]; //wyjscie do KH        
       

        //9. johan
        //questmap[quest_iter++] = [qcmdEnter,6,40]; //dom Nufrexa
        questmap[quest_iter++] = [qcmdTalk2,9,39,"50.1|51.1|52.|56."]; // !udalo sie   x8      
        //questmap[quest_iter++] = [qcmdEnter,12,8]; //wyjscie do KH    

        //Halfinia
        questmap[quest_iter++] = [qcmdTalk2,31,38,"50.1|51.1|52.|56."]; // !udalo sie   x9      
        
        //9. Newald
        questmap[quest_iter++] = [qcmdEnter,33,23]; //dom Newalda
        questmap[quest_iter++] = [qcmdTalk2,8,10,"90.1|91.1|92.|96."]; // !udalo sie   x7      
        questmap[quest_iter++] = [qcmdEnter,7,13]; //wyjscie do KH               
 
  


        questmap[quest_iter++] = [qcmdEnter,59,63,35]; //przedmiescia
        questmap[quest_iter++] = [qcmdTalk2,56,8,"75.2|77.|83.1|86.1"]; //koniec     
        questmap[quest_iter++] = [qcmdEnd]; 
        
    }
    //questlist[questno++] = [ 0, pietrucha,"pietrucha"]; 
    ///szukaj dusz
   
    
    quest_start = 17000;
    questlist[questno++] = [2, quest_start,"QD:PHTrop"];
    

	//////////////////////////////////////////
	// Q:Dzienny 200 - PH Trop
	//////////////////////////////////////////	
	{	
        quest_iter = quest_start;
        questmap[quest_iter++] = [qcmdEnter,95,50]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,77,0]; // przejdz
        questmap[quest_iter++] = [qcmdTalk2,46,60,"50.2|52.3|54.1|55.2"]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdEnter,45,63]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,0,50]; // przejdz
        questmap[quest_iter++] = [qcmdTalk2,55,29,"20.1|71.7"]; //Rozmowa z NPC
        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.7"]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdEnter,83,37]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,2,8]; // przejdz
        questmap[quest_iter++] = [qcmdTalk2,5,6,"20.3|30.2"]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdBuy,145119244,1]; // kup
        questmap[quest_iter++] = [qcmdBuy,145119243,1]; // kup
        questmap[quest_iter++] = [qcmdBuy,145119238,1]; // kup
        questmap[quest_iter++] = [qcmdBuy,145119241,1]; // kup
        questmap[quest_iter++] = [qcmdEnter,13,7]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,6,13]; // przejdz
        questmap[quest_iter++] = [qcmdTalk2,51,33,"20.1|43.1"]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.2"]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdEnter,95,50]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,77,0]; // przejdz
        questmap[quest_iter++] = [qcmdTalk2,46,60,"65.1|66.1|68.|69."]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdTalk2,23,21,"100.2|103.1|107.1|108."]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdTalk2,27,54,"70.2|73.1|76.1|78.1|79."]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdEnter,40,7]; // przejdz
        questmap[quest_iter++] = [qcmdTalk2,9,7,"50.2|52.2|54.1|57."]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdEnter,8,12]; // przejdz
        questmap[quest_iter++] = [qcmdTalk2,46,60,"75.1|77.1|79.1"]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdEnter,45,63]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,0,50]; // przejdz
        questmap[quest_iter++] = [qcmdTalk2,55,29,"20.1|71.6"]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdEnter,6,40]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,5,18]; // przejdz
        questmap[quest_iter++] = [qcmdTalk2,81,21,"20.4|182.2|185.1|188.1|190.1"]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdEnter,87,39]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,29,18]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,84,25]; // przejdz
        questmap[quest_iter++] = [qcmdTalk2,19,25,"20.9|180.1|181.2|183."]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"]; // uzyj
        questmap[quest_iter++] = [qcmdEnter,0,38]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,0,46]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,0,38]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,0,45]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,0,48]; // przejdz
        questmap[quest_iter++] = [qcmdEnter,27,0]; // przejdz
        questmap[quest_iter++] = [qcmdTalk2,29,81,"20.4|112.|113.1|116.1|118.1|119.1|121.1"]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
        questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij 
        questmap[quest_iter++] = [qcmdEnter,50, 0]; // Lazurowe 
        questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij w
        questmap[quest_iter++] = [qcmdEnter,95,17]; // S
        questmap[quest_iter++] = [qcmdEnter,63,19]; // Za
        questmap[quest_iter++] = [qcmdEnter,63,34]; // Spokojn
        questmap[quest_iter++] = [qcmdEnter,63,50];	// Eder
        questmap[quest_iter++] = [qcmdTalk2,26,40,"20.1|71.6"]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdEnter,84,25];	// swiatynia
        questmap[quest_iter++] = [qcmdTalk2,19,25,"20.10|190.2|194.1|198."]; // Rozmowa z NPC
        questmap[quest_iter++] = [qcmdEnter,16,27];	// wyjdz
        questmap[quest_iter++] = [qcmdGoto,56,41];	// srodek
        questmap[quest_iter++] = [qcmdEnd];
        
    }    //////////////////////////////////////////
	// Q:Ithan->TP
	//////////////////////////////////////////	
	{	
        var MapId = 1;  var TpX = 11; var TpY = 16; var index_temp = 4500;
        //questlist[questno++] = [ MapId, index_temp,"TP:Ithan"];
        questlist[questno++] = [ MapId, index_temp+5,"TP:Torneg"];
        questlist[questno++] = [ MapId, index_temp+10,"TP:Werbin"];
        questlist[questno++] = [ MapId, index_temp+15,"TP:Karka-Han"];
        questlist[questno++] = [ MapId, index_temp+20,"TP:Eder"];
        questlist[questno++] = [ MapId, index_temp+25,"TP:Nithal"];
        questlist[questno++] = [ MapId, index_temp+30,"TP:Tuzmer"];		
        
		quest_iter = index_temp; // ->Ithan
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.1"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+5; // ->Torneg
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.2"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+10; // ->Werbin
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.3"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+15; // ->Karka-Han
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.4"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+20; // ->Eder
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.5"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+25; // ->Nithal
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.6"]; 
		questmap[quest_iter++] = [qcmdEnd]; 		
        quest_iter = index_temp+30; // ->Tuzmer
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.7"]; // ->Koncentrator
		questmap[quest_iter++] = [qcmdTalk2, 3,79,"40.7"]; //Koncentrator->Tuzmer
		questmap[quest_iter++] = [qcmdEnd]; 	
	}   
 	//////////////////////////////////////////
	// Q:KH->TP
	//////////////////////////////////////////	
	{	
        var MapId = 35;  var TpX = 43; var TpY = 28; var index_temp = 4550;
        questlist[questno++] = [ MapId, index_temp,"TP:Ithan"];
        questlist[questno++] = [ MapId, index_temp+5,"TP:Torneg"];
        questlist[questno++] = [ MapId, index_temp+10,"TP:Werbin"];
        //questlist[questno++] = [ MapId, index_temp+15,"TP:Karka-Han"];
        questlist[questno++] = [ MapId, index_temp+20,"TP:Eder"];
        questlist[questno++] = [ MapId, index_temp+25,"TP:Nithal"];
        questlist[questno++] = [ MapId, index_temp+30,"TP:Tuzmer"];		
        
		quest_iter = index_temp; // ->Ithan
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.1"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+5; // ->Torneg
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.2"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+10; // ->Werbin
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.3"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+15; // ->Karka-Han
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.4"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+20; // ->Eder
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.5"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+25; // ->Nithal
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.6"]; 
		questmap[quest_iter++] = [qcmdEnd]; 		
        quest_iter = index_temp+30; // ->Tuzmer
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.7"]; // ->Koncentrator
		questmap[quest_iter++] = [qcmdTalk2, 3,79,"40.7"]; //Koncentrator->Tuzmer
		questmap[quest_iter++] = [qcmdEnd]; 	
	}       
 
 	//////////////////////////////////////////
	// Q:Torneg->TP
	//////////////////////////////////////////	
	{	
        var MapId = 2;  var TpX = 55; var TpY = 29; var index_temp = 4600;
        questlist[questno++] = [ MapId, index_temp,"TP:Ithan"];
        //questlist[questno++] = [ MapId, index_temp+5,"TP:Torneg"];
        questlist[questno++] = [ MapId, index_temp+10,"TP:Werbin"];
        questlist[questno++] = [ MapId, index_temp+15,"TP:Karka-Han"];
        questlist[questno++] = [ MapId, index_temp+20,"TP:Eder"];
        questlist[questno++] = [ MapId, index_temp+25,"TP:Nithal"];
        questlist[questno++] = [ MapId, index_temp+30,"TP:Tuzmer"];		
        
		quest_iter = index_temp; // ->Ithan
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.1"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+5; // ->Torneg
		//questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.2"]; 
		//questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+10; // ->Werbin
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.3"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+15; // ->Karka-Han
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.4"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+20; // ->Eder
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.5"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+25; // ->Nithal
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.6"]; 
		questmap[quest_iter++] = [qcmdEnd]; 		
        quest_iter = index_temp+30; // ->Tuzmer
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.7"]; // ->Koncentrator
		questmap[quest_iter++] = [qcmdTalk2, 3,79,"40.7"]; //Koncentrator->Tuzmer
		questmap[quest_iter++] = [qcmdEnd]; 	
	} 
    
  	//////////////////////////////////////////
	// Q:Werbin->TP
	//////////////////////////////////////////	
	{	
        var MapId = 9;  var TpX = 27; var TpY = 19; var index_temp = 4650;
        questlist[questno++] = [ MapId, index_temp,"TP:Ithan"];
        questlist[questno++] = [ MapId, index_temp+5,"TP:Torneg"];
        //questlist[questno++] = [ MapId, index_temp+10,"TP:Werbin"];
        questlist[questno++] = [ MapId, index_temp+15,"TP:Karka-Han"];
        questlist[questno++] = [ MapId, index_temp+20,"TP:Eder"];
        questlist[questno++] = [ MapId, index_temp+25,"TP:Nithal"];
        questlist[questno++] = [ MapId, index_temp+30,"TP:Tuzmer"];		
        
		quest_iter = index_temp; // ->Ithan
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.1"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+5; // ->Torneg
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.2"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+10; // ->Werbin
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.3"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+15; // ->Karka-Han
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.4"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+20; // ->Eder
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.5"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+25; // ->Nithal
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.6"]; 
		questmap[quest_iter++] = [qcmdEnd]; 		
        quest_iter = index_temp+30; // ->Tuzmer
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.7"]; // ->Koncentrator
		questmap[quest_iter++] = [qcmdTalk2, 3,79,"40.7"]; //Koncentrator->Tuzmer
		questmap[quest_iter++] = [qcmdEnd]; 	
	}   
  	//////////////////////////////////////////
	// Q:Nithal->TP
	//////////////////////////////////////////	
	{	
        var MapId = 574;  var TpX = 57; var TpY = 40; var index_temp = 4700;
        questlist[questno++] = [ MapId, index_temp,"TP:Ithan"];
        questlist[questno++] = [ MapId, index_temp+5,"TP:Torneg"];
        questlist[questno++] = [ MapId, index_temp+10,"TP:Werbin"];
        questlist[questno++] = [ MapId, index_temp+15,"TP:Karka-Han"];
        questlist[questno++] = [ MapId, index_temp+20,"TP:Eder"];
        //questlist[questno++] = [ MapId, index_temp+25,"TP:Nithal"];
        questlist[questno++] = [ MapId, index_temp+30,"TP:Tuzmer"];		
        
		quest_iter = index_temp; // ->Ithan
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"29.1|52.1"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+5; // ->Torneg
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"29.1|52.2"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+10; // ->Werbin
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"29.1|52.3"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+15; // ->Karka-Han
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"29.1|52.4"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+20; // ->Eder
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"29.1|52.5"]; 
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+25; // ->Nithal
		//questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"29.1|52.6"]; 
		//questmap[quest_iter++] = [qcmdEnd]; 		
        quest_iter = index_temp+30; // ->Tuzmer
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"29.1|52.7"]; // ->Koncentrator
		questmap[quest_iter++] = [qcmdTalk2, 3,79,"40.7"]; //Koncentrator->Tuzmer
		questmap[quest_iter++] = [qcmdEnd]; 	
	} 

  	//////////////////////////////////////////
	// Q:Eder->TP
	//////////////////////////////////////////	
	{	
        var MapId = 33;  var TpX = 26; var TpY = 40; var index_temp = 4750;
        questlist[questno++] = [ MapId, index_temp,"TP:Ithan"];
        questlist[questno++] = [ MapId, index_temp+5,"TP:Torneg"];
        questlist[questno++] = [ MapId, index_temp+10,"TP:Werbin"];
        questlist[questno++] = [ MapId, index_temp+15,"TP:Karka-Han"];
        //questlist[questno++] = [ MapId, index_temp+20,"TP:Eder"];
        questlist[questno++] = [ MapId, index_temp+25,"TP:Nithal"];
        questlist[questno++] = [ MapId, index_temp+30,"TP:Tuzmer"];		
		
        quest_iter = index_temp; // ->Ithan
        questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.1"]; //do ithan
		questmap[quest_iter++] = [qcmdEnd]; 
		quest_iter = index_temp+5; // ->Torneg
        questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.2"]; //do torneg
		questmap[quest_iter++] = [qcmdEnd]; 
		quest_iter = index_temp+10; // ->Werbin
        questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.3"]; //do werbin
		questmap[quest_iter++] = [qcmdEnd]; 
		quest_iter = index_temp+15; // ->Karka-Han
        questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.4"]; //do k-h
		questmap[quest_iter++] = [qcmdEnd]; 
		quest_iter = index_temp+20; // ->Eder
		//questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"29.1|52.5"]; 
		//questmap[quest_iter++] = [qcmdEnd]; 	
 		quest_iter = index_temp+25; // ->Nithal       
        questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.6"]; //do nithal
		questmap[quest_iter++] = [qcmdEnd]; 
        quest_iter = index_temp+30; // ->Tuzmer
        questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|71.7"]; //do tuzmer    
		questmap[quest_iter++] = [qcmdTalk2, 3,79,"40.7"]; //Koncentrator->Tuzmer
  		questmap[quest_iter++] = [qcmdEnd];      
    
    }
    
  	//////////////////////////////////////////
	// Q:Tuzmer->TP
	//////////////////////////////////////////	
	{	
        var MapId = 589;  var TpX = 51; var TpY = 33; var index_temp = 4800;
        questlist[questno++] = [ MapId, index_temp,"TP:Ithan"];
        questlist[questno++] = [ MapId, index_temp+5,"TP:Torneg"];
        questlist[questno++] = [ MapId, index_temp+10,"TP:Werbin"];
        questlist[questno++] = [ MapId, index_temp+15,"TP:Karka-Han"];
        questlist[questno++] = [ MapId, index_temp+20,"TP:Eder"];
        questlist[questno++] = [ MapId, index_temp+25,"TP:Nithal"];
        //questlist[questno++] = [ MapId, index_temp+30,"TP:Tuzmer"];		
        
		quest_iter = index_temp; // ->Ithan
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|43.1"]; 
        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.1"]; //do ithan
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+5; // ->Torneg
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|43.1"]; 
        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.2"]; //do torneg
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+10; // ->Werbin
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|43.1"]; 
        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.3"]; //do werbin
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+15; // ->Karka-Han
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|43.1"]; 
        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.4"]; //do k-h
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+20; // ->Eder
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|43.1"]; 
        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.5"]; //do eder
		questmap[quest_iter++] = [qcmdEnd]; 	
		quest_iter = index_temp+25; // ->Nithal
		questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"20.1|43.1"];
        questmap[quest_iter++] = [qcmdTalk2,3,79,"40.6"]; //do nithal        
		questmap[quest_iter++] = [qcmdEnd]; 		
        quest_iter = index_temp+30; // ->Tuzmer
		//questmap[quest_iter++] = [qcmdTalk2,TpX,TpY,"1.1|52.7"]; // ->Koncentrator
		//questmap[quest_iter++] = [qcmdTalk2, 3,79,"40.7"]; //Koncentrator->Tuzmer
		questmap[quest_iter++] = [qcmdEnd]; 	
	}  

        quest_iter = dziennyno_249;
    questlist[questno++] = [ID_MYTHAR, quest_iter, "QD:Mahopt.1"];
    questmap[quest_iter++] = [qcmdSub,"@QSUB_MYTHAR_DO_APETL"]; 
    questlist[questno++] = [ID_MAHOPTEKAN, quest_iter, "QD:Mahopt.2"];
        
    questmap[quest_iter++] = [qcmdKill,28,66]; 	// zabij
    questmap[quest_iter++] = [qcmdTalk2,13,85,"20.3|50.2|56.1|57.1|59."]; //start
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_EDER"];
    
    questmap[quest_iter++] = [qcmdTalk2,26,40,"20.1|71.6"]; //do nithal
    questmap[quest_iter++] = [qcmdEnter,30,10];	// -> cycadeta
    questmap[quest_iter++] = [qcmdEnter,4,13];	// -> cycadeta kuchnia
    questmap[quest_iter++] = [qcmdTalk2,8,10,"20.3|50.1|51.1|53."];	// -> kucharz
    questmap[quest_iter++] = [qcmdEnter,3,4];	// -> wyjscie z kuchni
    questmap[quest_iter++] = [qcmdEnter,12,15];	// -> nithal
    questmap[quest_iter++] = [qcmdTalk2,57,40,"29.1|52.2"];	// -> torneg
    questmap[quest_iter++] = [qcmdTalk2,45,39,"20.8|115.1|118.1"];	// -> syntia
    questmap[quest_iter++] = [qcmdTalk2,55,29,"20.1|71.6"]; //do nithal
    questmap[quest_iter++] = [qcmdEnter,30,10];	// -> cycadeta
    questmap[quest_iter++] = [qcmdEnter,4,13];	// -> cycadeta kuchnia
    questmap[quest_iter++] = [qcmdTalk2,8,10,"20.4|57.1|58.1|61.9"];	// -> kucharz
    questmap[quest_iter++] = [qcmdWaitSecs,190*3]; //wait 3 mins
    questmap[quest_iter++] = [qcmdTalk2,8,10,"20.5|67."];	// -> kucharz
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_MYTHAR"];
    questmap[quest_iter++] = [qcmdSub,"@QSUB_MYTHAR_DO_APETL"]; 

    questmap[quest_iter++] = [qcmdKill, 44,33];
    questmap[quest_iter++] = [qcmdKill, 44,26];
    questmap[quest_iter++] = [qcmdKill,28,66]; 	// zabij
    questmap[quest_iter++] = [qcmdTalk2,13,85,"65.2|70.1|71.1|72."]; //altepetl
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_EDER"];
    questmap[quest_iter++] = [qcmdTalk2,26,40,"20.1|71.7"]; //do tuzmer
    questmap[quest_iter++] = [qcmdTalk2,3,79,"40.7"]; //do tuzmer
    questmap[quest_iter++] = [qcmdEnter,47,63];	// -> port
    questmap[quest_iter++] = [qcmdEnter,7,9];	// -> sierociniec
    questmap[quest_iter++] = [qcmdEnter,3,12];	// -> kuchnia
    questmap[quest_iter++] = [qcmdTalk2,5,7,"20.3|50.1|51.1|53.1|54."]; //kucharka
    questmap[quest_iter++] = [qcmdEnter,3,3];	// -> sierociniec
    questmap[quest_iter++] = [qcmdEnter,12,13];	// -> port
    questmap[quest_iter++] = [qcmdTalk2,54,48,"20.7|70.1|71.1"]; //rybak yarte
    questmap[quest_iter++] = [qcmdTalk2,7,6,"20.1|21.1|23."]; //rybak yarte w zatoce blekitnych rekinow
    
    // sprawdz czy masz ryby
     
    questlabels["@QDMAH_RYBY"] = quest_iter;
    
    questmap[quest_iter++] = [qcmdCheckItem,"owione ryby"];
    questmap[quest_iter++] = [qcmdProcessResult,qResultTrue, "@QDMAH_RYBY_2"]; //mamy Ryby - pomijamy        

    questmap[quest_iter++] = [qcmdTalk2,7,10,"20.1"]; //sieci
    questmap[quest_iter++] = [qcmdTalk2,5,8,"20.1|23."]; //zarzuc siec
    questmap[quest_iter++] = [qcmdWaitSecs,190*3]; //wait 3 mins
    questmap[quest_iter++] = [qcmdTalk2,5,8,"27.1|28.1|31.1"]; //wez ryby  
    questmap[quest_iter++] = [qcmdWaitSecs,15]; //wait 5 sec
    questmap[quest_iter++] = [qcmdJump,"@QDMAH_RYBY"];        

    questlabels["@QDMAH_RYBY_2"] = quest_iter;
    questmap[quest_iter++] = [qcmdEnter,7,9];	// -> sierociniec
    questmap[quest_iter++] = [qcmdEnter,3,12];	// -> kuchnia
    questmap[quest_iter++] = [qcmdTalk2,5,7,"20.4|58.1"]; //kucharka
    questmap[quest_iter++] = [qcmdWaitSecs,190*3]; //wait 3 mins
    questmap[quest_iter++] = [qcmdTalk2,5,7,"20.5|62.1"]; //kucharka
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_MYTHAR"];
    questmap[quest_iter++] = [qcmdSub,"@QSUB_MYTHAR_DO_APETL"]; 

    questmap[quest_iter++] = [qcmdKill,28,66]; 	// zabij
    questmap[quest_iter++] = [qcmdTalk2,13,85,"65.4|76.1"]; //altepetl
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_EDER"];
    questmap[quest_iter++] = [qcmdTalk2,26,40,"20.1|71.6"]; //do nithal
    questmap[quest_iter++] = [qcmdEnter,68,58];	// -> rezydencja trafalgar
    questmap[quest_iter++] = [qcmdTalk2,11,5,"20.4|50.1|51.1|53."]; //kucharka krysia
    questmap[quest_iter++] = [qcmdTalk2,11,5,"20.5|57."]; //kucharka krysia
    questmap[quest_iter++] = [qcmdWaitSecs,190*3]; //wait 3 mins
    questmap[quest_iter++] = [qcmdTalk2,11,5,"20.6|60."]; //kucharka krysia
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_MYTHAR"];
    questmap[quest_iter++] = [qcmdSub,"@QSUB_MYTHAR_DO_APETL"]; 
    questmap[quest_iter++] = [qcmdKill,28,66]; 	// zabij
    questmap[quest_iter++] = [qcmdTalk2,13,85,"65.6|80.1|81."]; //altepetl
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_EDER"];
    questmap[quest_iter++] = [qcmdTalk2,26,40,"20.1|71.2"]; //do torneg
    questmap[quest_iter++] = [qcmdEnter,0,45];	// -> lany zbóz
    questmap[quest_iter++] = [qcmdTalk2,24,19,"20.4|50.1|51.1"]; //kup pieczywo
    questmap[quest_iter++] = [qcmdWaitSecs,540*3]; //wait 9 mins
    questmap[quest_iter++] = [qcmdTalk2,24,19,"20.5|55.1"]; //kup pieczywo
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_MYTHAR"];
    questmap[quest_iter++] = [qcmdSub,"@QSUB_MYTHAR_DO_APETL"]; 
    questmap[quest_iter++] = [qcmdKill,28,66]; 	// zabij
    questmap[quest_iter++] = [qcmdTalk2,13,85,"65.8|86.1|87."]; //altepetl
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_EDER"];
    questmap[quest_iter++] = [qcmdTalk2,26,40,"20.1|71.7"]; //do tuzmer
    questmap[quest_iter++] = [qcmdTalk2,3,79,"40.7"]; //do tuzmer
    questmap[quest_iter++] = [qcmdEnter,34,17];	// -> dom telsara
    questmap[quest_iter++] = [qcmdEnter,6,5];	// -> dom dziadka jezyka
    questmap[quest_iter++] = [qcmdEnter,4,9];	// -> tuzmer
    questmap[quest_iter++] = [qcmdEnter,29,11];	// -> dom bernarda
    questmap[quest_iter++] = [qcmdTalk2,8,8,"20.5|50.1|51.1|53."]; //cukiernik bernard
    questmap[quest_iter++] = [qcmdEnter,9,10];	// -> wyjdz
    questmap[quest_iter++] = [qcmdEnter,30,12];	// -> wyjdz
    questmap[quest_iter++] = [qcmdEnter,7,12];	// -> wyjdz
    questmap[quest_iter++] = [qcmdEnter,11,8];	// -> wyjdz
    questmap[quest_iter++] = [qcmdTalk2,51,33,"20.1|43.1"]; //torneg
    questmap[quest_iter++] = [qcmdTalk2,3,79,"40.2"]; //torneg
    questmap[quest_iter++] = [qcmdTalk2,45,39,"20.1"]; //syntia
    questmap[quest_iter++] = [qcmdBuy,145119249,1]; // kup czerwone jablko
    questmap[quest_iter++] = [qcmdBuy,145119249,1]; // kup czerwone jablko
    questmap[quest_iter++] = [qcmdBuy,145119249,1]; // kup czerwone jablko
    questmap[quest_iter++] = [qcmdBuy,145119249,1]; // kup czerwone jablko
    questmap[quest_iter++] = [qcmdBuy,145119249,1]; // kup czerwone jablko
    questmap[quest_iter++] = [qcmdBuy,145119249,1]; // kup czerwone jablko
    questmap[quest_iter++] = [qcmdBuy,145119249,1]; // kup czerwone jablko
    questmap[quest_iter++] = [qcmdTalk2,55,29,"20.1|71.7"]; //tuzmer
    questmap[quest_iter++] = [qcmdTalk2,3,79,"40.7"]; //tuzmer
    questmap[quest_iter++] = [qcmdEnter,34,17];	// -> dom telsara
    questmap[quest_iter++] = [qcmdEnter,6,5];	// -> dom dziadka jezyka
    questmap[quest_iter++] = [qcmdEnter,4,9];	// -> tuzmer
    questmap[quest_iter++] = [qcmdEnter,29,11];	// -> dom bernarda
    questmap[quest_iter++] = [qcmdTalk2,8,8,"20.6|57."]; //cukiernik bernard
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_MYTHAR"];
    questmap[quest_iter++] = [qcmdSub,"@QSUB_MYTHAR_DO_APETL"]; 
    questmap[quest_iter++] = [qcmdKill,28,66]; 	// zabij
    questmap[quest_iter++] = [qcmdTalk2,13,85,"65.10|92.1|93.1|95."]; //altepetl
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_EDER"];
    questmap[quest_iter++] = [qcmdTalk2,26,40,"20.1|71.4"]; //do k-h
    questmap[quest_iter++] = [qcmdEnter,48,25];	// -> ratusz
    questmap[quest_iter++] = [qcmdTalk2,21,8,"20.3|49.1|51."]; //sztabka
    questmap[quest_iter++] = [qcmdEnter,13,35];	// -> wyjdz
    questmap[quest_iter++] = [qcmdTalk2,43,28,"1.1|52.6"]; //do nithal
    questmap[quest_iter++] = [qcmdEnter,28,58];	// -> kamienica krynii lufis
    questmap[quest_iter++] = [qcmdTalk2,10,9,"21.15|142."]; //krynia lufis
    questmap[quest_iter++] = [qcmdWaitSecs,190*3]; //wait 3 mins
    questmap[quest_iter++] = [qcmdTalk2,10,9,"21.16|137.1|138.1|141."]; //krynia lufis
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_MYTHAR"];
    questmap[quest_iter++] = [qcmdSub,"@QSUB_MYTHAR_DO_APETL"]; 
    questmap[quest_iter++] = [qcmdKill,28,66]; 	// zabij
    questmap[quest_iter++] = [qcmdTalk2,13,85,"65.12|102."]; //altepetl
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_THUZAL"];
    questmap[quest_iter++] = [qcmdEnter,66,18]; // -> glidia magow
    questmap[quest_iter++] = [qcmdTalk2,17,13,"30.9|126."]; //fontanna
    questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
    questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_MYTHAR"];
    questmap[quest_iter++] = [qcmdSub,"@QSUB_MYTHAR_DO_APETL"]; 
    questmap[quest_iter++] = [qcmdKill,28,66]; 	// zabij
    questmap[quest_iter++] = [qcmdTalk2,13,85,"65.13|106.1|108."]; //altepetl
    questmap[quest_iter++] = [qcmdEnd];
    
    
    // Sub: Kwiaty -> Eder
    // uzycie: questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_EDER"];
    questlabels["@QSUB_KWIATY_DO_EDER"] = quest_iter;
    {
        questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter,50,0]; // -> Lazurowe Wzgorze
        questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
        questmap[quest_iter++] = [qcmdEnter,95,17]; // -> Sloneczna Wyzyna
        questmap[quest_iter++] = [qcmdEnter,63,19]; // -> Zasloniete Jezioro
        questmap[quest_iter++] = [qcmdEnter,63,34]; // -> Spokojne Przejscie
        questmap[quest_iter++] = [qcmdEnter,63,50];	// -> Eder   
        questmap[quest_iter++] = [qcmdRet];
    }
    

    // Sub: Kwiaty -> Mythar
    // uzycie: questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_MYTHAR"];
    questlabels["@QSUB_KWIATY_DO_MYTHAR"] = quest_iter;
    {
        questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
        questmap[quest_iter++] = [qcmdEnter, 0,45,576];  // -> Zapomniana Sciezyna
        questmap[quest_iter++] = [qcmdEnter, 0,37,500];  // -> Lisciaste rozstaje
        questmap[quest_iter++] = [qcmdEnter, 0,44,229];  // -> Las dziwow
        questmap[quest_iter++] = [qcmdEnter, 0,47,246];  // -> Zlowrogie bagna
        questmap[quest_iter++] = [qcmdGoto, 31,33];  	 // Srodek planszy
        questmap[quest_iter++] = [qcmdEnter, 0,27,257];  // -> Mythar        
        questmap[quest_iter++] = [qcmdRet];
    }
    
    // Sub: Kwiaty -> Thuzal
    // uzycie: questmap[quest_iter++] = [qcmdSub,"@QSUB_KWIATY_DO_THUZAL"];
    questlabels["@QSUB_KWIATY_DO_TUZAL"] = quest_iter;
    {
        questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter,50, 0]; // -> Lazurowe Wzgorze
        questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
        questmap[quest_iter++] = [qcmdEnter,35,0]; // -> Sloneczna Wyzyna
        questmap[quest_iter++] = [qcmdEnter,48,0]; // -> Thuzal
        questmap[quest_iter++] = [qcmdGoto,60,21];	// -> srodek Thuzal
        questmap[quest_iter++] = [qcmdRet];
    }

    // Sub: Mythar -> Mahoptekan
    // uzycie: questmap[quest_iter++] = [qcmdSub,"@QSUB_MYTHAR_DO_APETL"];
    questlabels["@QSUB_MYTHAR_DO_APETL"] = quest_iter;
    {
        questmap[quest_iter++] = [qcmdEnter,87,63,339]; 
        questmap[quest_iter++] = [qcmdEnter,44,63,1924]; 
        questmap[quest_iter++] = [qcmdKill,49,6]; 		 
        questmap[quest_iter++] = [qcmdEnter,62, 9,1927];  
        questmap[quest_iter++] = [qcmdKill, 5,6]; 		 
        questmap[quest_iter++] = [qcmdEnter,15, 5,1928];  
        questmap[quest_iter++] = [qcmdKill, 5,6]; 		 
        questmap[quest_iter++] = [qcmdTalk, 7, 5,"20.1|21.2|31.1",argTeleport];  
        questmap[quest_iter++] = [qcmdKill, 79,9]; 		 
        questmap[quest_iter++] = [qcmdKill, 71,30]; 		 
        questmap[quest_iter++] = [qcmdKill, 69,39]; 		 
        questmap[quest_iter++] = [qcmdKill, 54,45];
        questmap[quest_iter++] = [qcmdKill, 60,54];
        questmap[quest_iter++] = [qcmdEnter,75,63,1901];  //niecka
        questmap[quest_iter++] = [qcmdKill, 15,53];
        questmap[quest_iter++] = [qcmdKill, 8,35];
        questmap[quest_iter++] = [qcmdEnter,0,50,1926]; 
        questmap[quest_iter++] = [qcmdRet];
    }
    
    
    ///////////////////
    // drugi quest
    ///////////////////
    questlist[questno++] = [ID_MAHOPTEKAN, quest_iter, "QD:Mahopt.qII"];
    {
        questmap[quest_iter++] = [qcmdEnter,27,24];  //wejdz do Chantli
        questmap[quest_iter++] = [qcmdTalk2,8,6,"20.3|50.1|51.1|52.1|53.1|54.1|55.1|56.1|57.1|58.1|59.1|61."]; //Aptlake
        questmap[quest_iter++] = [qcmdWaitSecs,190*3]; //wait 3 mins
        questmap[quest_iter++] = [qcmdTalk2,8,6,"65.1|70.1"]; //Aptlake
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
        questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter,50, 0]; // -> Lazurowe WzgÃ³rze
        questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
        questmap[quest_iter++] = [qcmdEnter,95,17]; // -> SÅ?oneczna WyÅŸyna
        questmap[quest_iter++] = [qcmdEnter,63,19]; // -> ZasÅ?oniÄ?te Jezioro
        questmap[quest_iter++] = [qcmdEnter,63,34]; // -> Spokojne PrzejÅ?cie
        questmap[quest_iter++] = [qcmdEnter,63,50];	// -> Eder
        questmap[quest_iter++] = [qcmdTalk2,26,40,"20.1|71.2"]; //do torneg
        questmap[quest_iter++] = [qcmdEnter,0,44];  //lany zboza
        questmap[quest_iter++] = [qcmdTalk2,12,41,"20.3|50.1|51.1|53."]; //chlop warmek
        questmap[quest_iter++] = [qcmdEnter,25,12];  //magazyn
        questmap[quest_iter++] = [qcmdEnter,6,4];  //magazyn p1
        questmap[quest_iter++] = [qcmdTalk2,5,8,"20.1"]; //kosa
        questmap[quest_iter++] = [qcmdEnter,8,7];  //magazyn
        questmap[quest_iter++] = [qcmdEnter,9,12];  //lany zboza
        questmap[quest_iter++] = [qcmdTalk2,4,40,"20.1|23."]; //sloma
        questmap[quest_iter++] = [qcmdTalk2,41,29,"20.6|50.1|51.1|52.1|54."]; //Wiesniaczka Parwi
        questmap[quest_iter++] = [qcmdTalk2,14,39,"20.2|52.1"]; //chlop brambol
        questmap[quest_iter++] = [qcmdTalk2,22,45,"20.3|52.1"]; //chlop fantar
        questmap[quest_iter++] = [qcmdTalk2,8,49,"20.4|52.1|53."]; //chlop harnan
        questmap[quest_iter++] = [qcmdTalk2,12,41,"20.4|57.1|60."]; //chlop warmek
        questmap[quest_iter++] = [qcmdTalk2,41,29,"20.7|56.1|57."]; //Wiesniaczka Parwi
        questmap[quest_iter++] = [qcmdTalk2,57,13,"20.4|100.1|101.1|105."]; //maztenia
        questmap[quest_iter++] = [qcmdWaitSecs,310*3]; //wait 5 mins
        questmap[quest_iter++] = [qcmdTalk2,57,13,"20.5|108."]; //maztenia
        questmap[quest_iter++] = [qcmdEnter,63,44];  //torneg
        questmap[quest_iter++] = [qcmdTalk2,55,29,"20.1|71.3"]; //do werbin
        questmap[quest_iter++] = [qcmdTalk2,28,67,"20.13|95.1|96.1|99."]; //herfog
        questmap[quest_iter++] = [qcmdWaitSecs,190*3]; //wait 3 mins
        questmap[quest_iter++] = [qcmdTalk2,28,67,"20.14|102.1.|103."]; //herfog
        questmap[quest_iter++] = [qcmdEnter,27,11];  //dom tafii
        questmap[quest_iter++] = [qcmdEnter,3,5];  //dom tafii p1
        questmap[quest_iter++] = [qcmdTalk2,9,7,"20.14|150.1|151.1|152.1|153.1|154.1|155.1|159."]; //tafia
        questmap[quest_iter++] = [qcmdEnter,3,6];  //dom tafii 
        questmap[quest_iter++] = [qcmdEnter,9,10];  //werbin
        questmap[quest_iter++] = [qcmdTalk2,27,19,"1.1|52.6"]; //zakon
        questmap[quest_iter++] = [qcmdEnter,37,58];  //dom broka
        questmap[quest_iter++] = [qcmdTalk2,3,9,"20.16|154.1|156.1"]; //brok
        questmap[quest_iter++] = [qcmdEnter,7,14];  //nithal
        questmap[quest_iter++] = [qcmdTalk2,57,40,"29.1|52.3"]; //teleport
        questmap[quest_iter++] = [qcmdEnter,27,11];  //dom tafii
        questmap[quest_iter++] = [qcmdEnter,3,5];  //dom tafii p1
        questmap[quest_iter++] = [qcmdTalk2,9,7,"20.15|162.1|167."]; //tafia
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
        questmap[quest_iter++] = [qcmdKill,48,32]; 		 // zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
        questmap[quest_iter++] = [qcmdEnter, 0,45,576];  // -> Zapomniana Sciezyna
        questmap[quest_iter++] = [qcmdEnter, 0,37,500];  // -> Lisciaste rozstaje
        questmap[quest_iter++] = [qcmdEnter, 0,44,229];  // -> Las dziwow
        questmap[quest_iter++] = [qcmdEnter, 0,47,246];  // -> Zlowrogie bagna
        questmap[quest_iter++] = [qcmdGoto,31,33];  	 // Srodek planszy
        questmap[quest_iter++] = [qcmdEnter, 0,27,257];  // -> Mythar
        questmap[quest_iter++] = [qcmdEnter,87,63,339]; 
        questmap[quest_iter++] = [qcmdEnter,44,63,1924]; 
        questmap[quest_iter++] = [qcmdKill,49,6]; 		 
        questmap[quest_iter++] = [qcmdEnter,62, 9,1927];  
        questmap[quest_iter++] = [qcmdKill, 5,6]; 		 
        questmap[quest_iter++] = [qcmdEnter,15, 5,1928];  
        questmap[quest_iter++] = [qcmdKill, 5,6]; 		 
        questmap[quest_iter++] = [qcmdTalk, 7, 5,"20.1|21.2|31.1",argTeleport];  
        questmap[quest_iter++] = [qcmdKill, 79,9]; 		 
        questmap[quest_iter++] = [qcmdKill, 71,30]; 		 
        questmap[quest_iter++] = [qcmdKill, 69,39]; 		 
        questmap[quest_iter++] = [qcmdKill, 54,45];
        questmap[quest_iter++] = [qcmdKill, 60,54];
        questmap[quest_iter++] = [qcmdEnter,75,63,1901];  //niecka
        questmap[quest_iter++] = [qcmdKill, 15,53];
        questmap[quest_iter++] = [qcmdKill, 8,35];
        questmap[quest_iter++] = [qcmdEnter,0,50,1926];  
        questmap[quest_iter++] = [qcmdEnter,27,24];  //wejdz do Chantli
        questmap[quest_iter++] = [qcmdTalk2,8,6,"65.18|90.1|91.1|93.1"]; //Aptlake
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
        questmap[quest_iter++] = [qcmdKill,48,32]; 	// zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter,50, 0]; // -> Lazurowe WzgÃ³rze
        questmap[quest_iter++] = [qcmdKill,19,26]; 	// zabij weza na drodze
        questmap[quest_iter++] = [qcmdEnter,35,0]; // -> SÅ?oneczna WyÅŸyna
        questmap[quest_iter++] = [qcmdEnter,48,0]; // -> Thuzal
        questmap[quest_iter++] = [qcmdTalk2,63,18,"20.6|70.1|71.1|72.1|75."]; //radagais
        questmap[quest_iter++] = [qcmdWaitSecs,310*3]; //wait 5 mins
        questmap[quest_iter++] = [qcmdTalk2,63,18,"20.7|80."]; //radagais
        questmap[quest_iter++] = [qcmdUseItem, "teleportacji na Kwieciste"];  // uzyj
        questmap[quest_iter++] = [qcmdKill,48,32]; 		 // zabij bandyte na moscie
        questmap[quest_iter++] = [qcmdEnter, 0,37,1116]; // -> Gluchy las
        questmap[quest_iter++] = [qcmdEnter, 0,45,576];  // -> Zapomniana Sciezyna
        questmap[quest_iter++] = [qcmdEnter, 0,37,500];  // -> Lisciaste rozstaje
        questmap[quest_iter++] = [qcmdEnter, 0,44,229];  // -> Las dziwow
        questmap[quest_iter++] = [qcmdEnter, 0,47,246];  // -> Zlowrogie bagna
        questmap[quest_iter++] = [qcmdGoto,31,33];  	 // Srodek planszy
        questmap[quest_iter++] = [qcmdEnter, 0,27,257];  // -> Mythar
        questmap[quest_iter++] = [qcmdEnter,87,63,339]; 
        questmap[quest_iter++] = [qcmdEnter,44,63,1924]; 
        questmap[quest_iter++] = [qcmdKill,49,6]; 		 
        questmap[quest_iter++] = [qcmdEnter,62, 9,1927];  
        questmap[quest_iter++] = [qcmdKill, 5,6]; 		 
        questmap[quest_iter++] = [qcmdEnter,15, 5,1928];  
        questmap[quest_iter++] = [qcmdKill, 5,6]; 		 
        questmap[quest_iter++] = [qcmdTalk, 7, 5,"20.1|21.2|31.1",argTeleport];  
        questmap[quest_iter++] = [qcmdKill, 79,9]; 		 
        questmap[quest_iter++] = [qcmdKill, 71,30]; 		 
        questmap[quest_iter++] = [qcmdKill, 69,39]; 		 
        questmap[quest_iter++] = [qcmdKill, 54,45];
        questmap[quest_iter++] = [qcmdKill, 60,54];
        questmap[quest_iter++] = [qcmdEnter,75,63,1901];  //niecka
        questmap[quest_iter++] = [qcmdKill, 15,53];
        questmap[quest_iter++] = [qcmdKill, 8,35];
        questmap[quest_iter++] = [qcmdEnter,0,50,1926];  
        questmap[quest_iter++] = [qcmdEnter,27,24];  //wejdz do Chantli
        questmap[quest_iter++] = [qcmdTalk2,8,6,"65.21|97."]; //Aptlake
        questmap[quest_iter++] = [qcmdWaitSecs,190*3]; //wait 3 mins
        questmap[quest_iter++] = [qcmdTalk2,8,6,"65.22|100.2|104.1"]; //Aptlake
        questmap[quest_iter++] = [qcmdEnd];
    }

	//////////////////////////////////////////
	// Q:Ithan->Razgul E2
	//////////////////////////////////////////
	{
		questlist[questno++] = [1,2900,"Q:Razgul E2"];	
		quest_iter = 2900;

		questmap[quest_iter++] = [qcmdEnter,20,95,8]; 	//-> Zniszczone Opactwo  (8)
		questmap[quest_iter++] = [qcmdEnter,11,63,116]; 	//-> Zburzona Twierdza  (116)
		questmap[quest_iter++] = [qcmdEnter,25,63,122]; 	//-> Nawiedzony Jar  (122)
		questmap[quest_iter++] = [qcmdEnter,52,44,127]; 	//-> Stare Wyrobisko p.5  (127)
		questmap[quest_iter++] = [qcmdEnter,16,5,126]; 	//-> Stare Wyrobisko p.4  (126)
		questmap[quest_iter++] = [qcmdEnter,19,26,125]; 	//-> Stare Wyrobisko p.3  (125)
		questmap[quest_iter++] = [qcmdGoto,7,4]; 		//-> Razgul
		questmap[quest_iter++] = [qcmdEnd];	
	}
	
    //////////////////////////////////////////
	// Q:Ithan->Grabarz
	//////////////////////////////////////////
	{
		questlist[questno++] = [180,4200,"E2:Grabarz"];	
		quest_iter = 4200;

		questmap[quest_iter++] = [qcmdKill,39,44]; 	
		questmap[quest_iter++] = [qcmdKill,38,32]; 	
		questmap[quest_iter++] = [qcmdKill,45,30]; 	
		questmap[quest_iter++] = [qcmdKill,48,20]; 		
        questmap[quest_iter++] = [qcmdEnter,48,12,203]; 	//-> Swiatynia Andarum
		questmap[quest_iter++] = [qcmdEnter, 5,22,204]; 	//-> 
		questmap[quest_iter++] = [qcmdEnter,10,21,184]; 	
        questmap[quest_iter++] = [qcmdEnter,31,33,210]; 	//-> Magazyn swiatyni (210)
		questmap[quest_iter++] = [qcmdKill,53,31]; 		
		questmap[quest_iter++] = [qcmdEnter,90,57,601]; 	//-> Magazyn swiatyni p.2 (601)
		questmap[quest_iter++] = [qcmdKill,63,27]; 
		questmap[quest_iter++] = [qcmdEnter,50,26,602]; 	//-> Krypta Świątyni Andarum
		questmap[quest_iter++] = [qcmdKill,34,28];
		questmap[quest_iter++] = [qcmdGoto,35,6]; 		
        questmap[quest_iter++] = [qcmdEnd];	
	}
    //////////////////////////////////////////
	// Q:Ithan->Zbrojmistrz
	//////////////////////////////////////////
	{
		questlist[questno++] = [180,4250,"E2:Zbrojmistrz "];	
		quest_iter = 4250;
		questmap[quest_iter++] = [qcmdKill,39,44]; 	
		questmap[quest_iter++] = [qcmdKill,38,32]; 	
		questmap[quest_iter++] = [qcmdKill,45,30]; 	
		questmap[quest_iter++] = [qcmdKill,48,20]; 		
        questmap[quest_iter++] = [qcmdEnter,48,12,203]; 	//-> Swiatynia Andarum
		questmap[quest_iter++] = [qcmdEnter, 5,22,204]; 	//-> 
		questmap[quest_iter++] = [qcmdEnter,10,21,184]; 	
        questmap[quest_iter++] = [qcmdEnter,31,33,210]; 	//-> Magazyn swiatyni (210)
		questmap[quest_iter++] = [qcmdKill,53,31]; 		
		questmap[quest_iter++] = [qcmdEnter,90,57,601]; 	//-> Magazyn swiatyni p.2 (601)
		questmap[quest_iter++] = [qcmdEnter,7,57,603]; 	    //-> Zbrojownia
		questmap[quest_iter++] = [qcmdGoto,7,46]; 		
        questmap[quest_iter++] = [qcmdEnd];	
	}    
 
//////////////////////////////////////////
// Q:Zbrojmistrz -> grabarz 
//////////////////////////////////////////
questlist[questno++] = [603,quest_iter,"Idź:Zbroj->Grab"];	
{
    questmap[quest_iter++] = [qcmdEnter,15,4,601]; 	//-> Magazyn świątyni p.2 
    questmap[quest_iter++] = [qcmdEnter,50,26,602]; 	
    questmap[quest_iter++] = [qcmdKill,34,28];
    questmap[quest_iter++] = [qcmdGoto,35,6]; 	        
    questmap[quest_iter++] = [qcmdEnd];	
}  

//////////////////////////////////////////
// Q:grabarz->Zbrojmistrz 
//////////////////////////////////////////
questlist[questno++] = [602,quest_iter,"Idź:Grab->Zbroj"];	
{
    questmap[quest_iter++] = [qcmdKill,34,28];
    questmap[quest_iter++] = [qcmdEnter,34,25,601];  //-> Magazyn świątyni p.2 	
    questmap[quest_iter++] = [qcmdEnter,7,57,603]; 	//-> Zbrojownia
    questmap[quest_iter++] = [qcmdGoto,7,46]; 		
    questmap[quest_iter++] = [qcmdEnd];	
}      
   
// Kwiaty -> SK
questlist[questno++] = [ ID_KWIECISTE_PRZEJSCIE, quest_iter,"Idź: Do SK"];   
{       
    questmap[quest_iter++]=[qcmdEnter,39,63]; // -> Zludny Trakt
    questmap[quest_iter++]=[qcmdEnter,95,38]; // -> Orcza Wyzyna
    questmap[quest_iter++]=[qcmdEnter,95,22]; // -> Osada Czerwonych Orkow
    questmap[quest_iter++]=[qcmdKill,62,76]; // -> zabicie potworka
    questmap[quest_iter++]=[qcmdEnter,54,92]; // -> Siedziba Rady Orkow
    questmap[quest_iter++]=[qcmdEnter,41,35]; // -> Nawiedzone Kazamaty p1
    questmap[quest_iter++]=[qcmdKill,36,38]; // -> potwor
    questmap[quest_iter++]=[qcmdKill,36,25]; // -> potwor2
    questmap[quest_iter++]=[qcmdKill,46,15]; // -> potwor3
    questmap[quest_iter++]=[qcmdKill,35,7]; // -> potwor4
    questmap[quest_iter++]=[qcmdKill,19,7]; // -> potwor5
    questmap[quest_iter++]=[qcmdEnter,5,17]; // -> Nawiedzone Kazamaty p2
    questmap[quest_iter++]=[qcmdKill,49,31]; // -> potwor6
    questmap[quest_iter++]=[qcmdEnter,44,40]; // -> Nawiedzone Kazamaty p3
    questmap[quest_iter++]=[qcmdKill,34,14]; // -> potwor7
    questmap[quest_iter++]=[qcmdEnter,32,5]; // -> Nawiedzone Kazamaty p4
    questmap[quest_iter++]=[qcmdEnter,34,41]; // -> Nawiedzone Kazamaty p5
    questmap[quest_iter++]=[qcmdEnter,12,28]; // -> Nawiedzone Kazamaty p6
    questmap[quest_iter++]=[qcmdEnter,3,38]; // -> Nawiedzone Komnaty p1
    questmap[quest_iter++]=[qcmdKill,41,45]; // -> potwor15
    questmap[quest_iter++]=[qcmdKill,35,45]; // -> potwor16
    questmap[quest_iter++]=[qcmdEnter,32,46]; // -> Nawiedzone Komnaty p2
    questmap[quest_iter++]=[qcmdEnter,15,3]; // -> Sala Krolewska
    questmap[quest_iter++]=[qcmdGoto,25,23];  //  -> Srodek SK
    questmap[quest_iter++]=[qcmdEnd]; 
}    
  

// szukaj Zlego Przewodnika

questlist[questno++] = [ ID_ITHAN, quest_iter, "SZ: Przewo"];
{
    questmap[quest_iter++] = [qcmdEnter,22,95];
    questmap[quest_iter++] = [qcmdEnter,12,63];
    questmap[quest_iter++] = [qcmdGoto,52,30];
    questmap[quest_iter++] = [qcmdGoto,11,13];
    questmap[quest_iter++] = [qcmdGoto,40,38];
    questmap[quest_iter++] = [qcmdGoto,3,27];
    questmap[quest_iter++] = [qcmdGoto,10,15];
    questmap[quest_iter++] = [qcmdEnter,24,63];
    questmap[quest_iter++] = [qcmdGoto,32,7];
    questmap[quest_iter++] = [qcmdGoto,35,20];
    questmap[quest_iter++] = [qcmdGoto,19,6];
    questmap[quest_iter++] = [qcmdEnter,52,44];
    questmap[quest_iter++] = [qcmdEnter,16,5];
    questmap[quest_iter++] = [qcmdEnter,19,26];
    questmap[quest_iter++] = [qcmdEnter,11,30];
    questmap[quest_iter++] = [qcmdGoto,52,28];
    questmap[quest_iter++] = [qcmdEnter,53,25];
    questmap[quest_iter++] = [qcmdKill,16,17];
    questmap[quest_iter++] = [qcmdEnter,17,4];
    questmap[quest_iter++] = [qcmdEnter,15,13];
    questmap[quest_iter++] = [qcmdKill,50,14];
    questmap[quest_iter++] = [qcmdGoto,54,18];
    questmap[quest_iter++] = [qcmdEnter,49,14];
    questmap[quest_iter++] = [qcmdEnter,15,5];
    questmap[quest_iter++] = [qcmdKill,50,14];
    questmap[quest_iter++] = [qcmdEnter,8,22];
    questmap[quest_iter++] = [qcmdEnter,17,32];
    questmap[quest_iter++] = [qcmdEnter,11,32];
    questmap[quest_iter++] = [qcmdEnter,0,23];
    questmap[quest_iter++] = [qcmdGoto,56,27];
    questmap[quest_iter++] = [qcmdGoto,44,29];
    questmap[quest_iter++] = [qcmdGoto,8,47];
    questmap[quest_iter++] = [qcmdKill,10,46];
    questmap[quest_iter++] = [qcmdGoto,26,54];
    questmap[quest_iter++] = [qcmdGoto,32,7];
    questmap[quest_iter++] = [qcmdGoto,49,2];
    questmap[quest_iter++] = [qcmdGoto,50,2];
    questmap[quest_iter++] = [qcmdEnter,35,0];
    questmap[quest_iter++] = [qcmdGoto,89,51];
    questmap[quest_iter++] = [qcmdGoto,40,37];
    questmap[quest_iter++] = [qcmdGoto,35,37];
    questmap[quest_iter++] = [qcmdGoto,18,4];
    questmap[quest_iter++] = [qcmdGoto,58,3];
    questmap[quest_iter++] = [qcmdGoto,3,34];
    questmap[quest_iter++] = [qcmdKill,4,31];
    questmap[quest_iter++] = [qcmdGoto,25,50];
    questmap[quest_iter++] = [qcmdKill,8,61];
    questmap[quest_iter++] = [qcmdEnter,8,60];
    questmap[quest_iter++] = [qcmdKill,17,20];
    questmap[quest_iter++] = [qcmdKill,17,24];
    questmap[quest_iter++] = [qcmdEnter,26,38];
    questmap[quest_iter++] = [qcmdKill,9,21];
    questmap[quest_iter++] = [qcmdKill,3,55];
    questmap[quest_iter++] = [qcmdKill,9,59];
    questmap[quest_iter++] = [qcmdEnter,26,62];
    questmap[quest_iter++] = [qcmdKill,52,58];
    questmap[quest_iter++] = [qcmdKill,47,53];
    questmap[quest_iter++] = [qcmdKill,22,48];
    questmap[quest_iter++] = [qcmdGoto,18,37];
    questmap[quest_iter++] = [qcmdGoto,5,48];
    questmap[quest_iter++] = [qcmdKill,39,44];
    questmap[quest_iter++] = [qcmdKill,38,32];
    questmap[quest_iter++] = [qcmdGoto,57,23];
    questmap[quest_iter++] = [qcmdKill,48,20];
    questmap[quest_iter++] = [qcmdKill,33,13];
    questmap[quest_iter++] = [qcmdGoto,33,4];
    questmap[quest_iter++] = [qcmdKill,33,13];
    questmap[quest_iter++] = [qcmdKill,48,20];
    questmap[quest_iter++] = [qcmdKill,45,30];
    questmap[quest_iter++] = [qcmdGoto,27,19];
    questmap[quest_iter++] = [qcmdGoto,15,5];
    questmap[quest_iter++] = [qcmdEnd];
}

    
// szukaj kochanki    
questlist[questno++] = [ ID_MYTHAR, quest_iter, "SZ: Kochanka"];
{
    questmap[quest_iter++]=[qcmdEnter,0,36]; 
    questmap[quest_iter++]=[qcmdKill,56,30]; 
    questmap[quest_iter++]=[qcmdGoto,83,26]; 
    questmap[quest_iter++]=[qcmdGoto,4,39]; 
    questmap[quest_iter++]=[qcmdGoto,87,58]; 
    questmap[quest_iter++]=[qcmdEnter,63,0]; 
    questmap[quest_iter++]=[qcmdGoto,15,76]; 
    questmap[quest_iter++]=[qcmdGoto,49,72]; 
    questmap[quest_iter++]=[qcmdEnter,63,62];
    questmap[quest_iter++]=[qcmdGoto,21,17]; 
    questmap[quest_iter++]=[qcmdGoto,38,16]; 
    questmap[quest_iter++]=[qcmdEnter,0,30]; 
    questmap[quest_iter++]=[qcmdEnter,31,95];
    questmap[quest_iter++]=[qcmdKill,56,30]; 
    questmap[quest_iter++]=[qcmdEnter,95,36];
    questmap[quest_iter++]=[qcmdEnter,87,63];
    questmap[quest_iter++]=[qcmdGoto,83,2]; 
    questmap[quest_iter++]=[qcmdGoto,4,16]; 
    questmap[quest_iter++]=[qcmdGoto,91,43]; 
    questmap[quest_iter++]=[qcmdGoto,84,60]; 
    questmap[quest_iter++]=[qcmdGoto,3,46]; 
    questmap[quest_iter++]=[qcmdEnter,87,0]; 
    questmap[quest_iter++]=[qcmdEnter,95,27];
    questmap[quest_iter++]=[qcmdGoto,20,44]; 
    questmap[quest_iter++]=[qcmdGoto,14,10]; 
    questmap[quest_iter++]=[qcmdEnter,27,0]; 
    questmap[quest_iter++]=[qcmdGoto,19,91]; 
    questmap[quest_iter++]=[qcmdGoto,55,5]; 
    questmap[quest_iter++]=[qcmdEnter,0,13]; 
    questmap[quest_iter++]=[qcmdGoto,39,15]; 
    questmap[quest_iter++]=[qcmdGoto,19,9]; 
    questmap[quest_iter++]=[qcmdEnter,0,55]; 
    questmap[quest_iter++]=[qcmdGoto,53,7]; 
    questmap[quest_iter++]=[qcmdGoto,33,6]; 
    questmap[quest_iter++]=[qcmdEnter,63,28];
    questmap[quest_iter++]=[qcmdEnter,50,63];
    questmap[quest_iter++]=[qcmdGoto,24,8]; 
    questmap[quest_iter++]=[qcmdGoto,48,45]; 
    questmap[quest_iter++]=[qcmdEnter,50,0]; 
    questmap[quest_iter++]=[qcmdEnter,95,44];
    questmap[quest_iter++]=[qcmdEnter,27,95];
    questmap[quest_iter++]=[qcmdEnter,95,15];
    questmap[quest_iter++]=[qcmdEnter,63,91];
    questmap[quest_iter++]=[qcmdGoto,62,60]; 
    questmap[quest_iter++]=[qcmdGoto,23,66]; 
    questmap[quest_iter++]=[qcmdEnter,0,44]; 
    questmap[quest_iter++]=[qcmdEnter,0,47]; 
    questmap[quest_iter++]=[qcmdEnter,0,27]; 
    questmap[quest_iter++]=[qcmdGoto,40,28]; 
    questmap[quest_iter++]=[qcmdEnd];
}    

//szukaj bacy

     questlist[questno++] = [ 1100, 5400,"Q: Baca"];
     quest_iter = 5400;
     questmap[quest_iter++]=[qcmdGoto,37,5];
     questmap[quest_iter++]=[qcmdGoto,43,30];
     questmap[quest_iter++]=[qcmdKill,44,30];
     questmap[quest_iter++]=[qcmdGoto,53,36];
     questmap[quest_iter++]=[qcmdGoto,53,45];
     questmap[quest_iter++]=[qcmdGoto,9,81];
     questmap[quest_iter++]=[qcmdGoto,9,64];
     questmap[quest_iter++]=[qcmdEnter,9,64];
     questmap[quest_iter++]=[qcmdGoto,61,54];
     questmap[quest_iter++]=[qcmdKill,61,53];
     questmap[quest_iter++]=[qcmdGoto,12,19];
     questmap[quest_iter++]=[qcmdGoto,4,49];
     questmap[quest_iter++]=[qcmdGoto,17,55]; 
     questmap[quest_iter++]=[qcmdGoto,61,62];
     questmap[quest_iter++]=[qcmdEnter,61,62];    
     questmap[quest_iter++]=[qcmdGoto,63,80];
     questmap[quest_iter++]=[qcmdEnter,63,80];
     questmap[quest_iter++]=[qcmdGoto,20,67];
     questmap[quest_iter++]=[qcmdKill,20,66];
     questmap[quest_iter++]=[qcmdGoto,11,61];
     questmap[quest_iter++]=[qcmdGoto,39,87];
     questmap[quest_iter++]=[qcmdKill,39,86];
     questmap[quest_iter++]=[qcmdGoto,52,77];
     questmap[quest_iter++]=[qcmdGoto,30,43];
     questmap[quest_iter++]=[qcmdGoto,15,31];
     questmap[quest_iter++]=[qcmdEnter,15,31];
     questmap[quest_iter++]=[qcmdGoto,31,35];
     questmap[quest_iter++]=[qcmdKill,30,35];
     questmap[quest_iter++]=[qcmdGoto,21,29];
     questmap[quest_iter++]=[qcmdGoto,6,12];
     questmap[quest_iter++]=[qcmdKill,6,11];
     questmap[quest_iter++]=[qcmdGoto,31,21];
     questmap[quest_iter++]=[qcmdKill,32,21];
     questmap[quest_iter++]=[qcmdGoto,35,17];
     questmap[quest_iter++]=[qcmdEnter,35,17];
     questmap[quest_iter++]=[qcmdGoto,35,22];
     questmap[quest_iter++]=[qcmdKill,35,23];
     questmap[quest_iter++]=[qcmdGoto,22,20];
     questmap[quest_iter++]=[qcmdGoto,35,16];
     questmap[quest_iter++]=[qcmdEnter,35,16];
     questmap[quest_iter++]=[qcmdGoto,32,21];
     questmap[quest_iter++]=[qcmdKill,32,21];
     questmap[quest_iter++]=[qcmdGoto,6,10];
     questmap[quest_iter++]=[qcmdKill,6,11];
     questmap[quest_iter++]=[qcmdGoto,29,35];
     questmap[quest_iter++]=[qcmdKill,30,35];
     questmap[quest_iter++]=[qcmdGoto,33,36];
     questmap[quest_iter++]=[qcmdEnter,33,36];
     questmap[quest_iter++]=[qcmdGoto,49,51];
     questmap[quest_iter++]=[qcmdKill,49,50];
     questmap[quest_iter++]=[qcmdGoto,54,31];
     questmap[quest_iter++]=[qcmdKill,53,31];
     questmap[quest_iter++]=[qcmdGoto,43,7];
     questmap[quest_iter++]=[qcmdEnd];

//szukaj bacy

//szukaj demonisa
{
     questlist[questno++] = [ 974, 5500,"Q: Demonis"];
     quest_iter = 5500;
     questmap[quest_iter++]=[qcmdGoto,10,23]; //dem przedsionek
     questmap[quest_iter++]=[qcmdGoto,15,29];
     questmap[quest_iter++]=[qcmdEnter,15,29];
     questmap[quest_iter++]=[qcmdGoto,22,10];
     questmap[quest_iter++]=[qcmdGoto,22,10]; //dem koło anala
     questmap[quest_iter++]=[qcmdGoto,2,33];
     questmap[quest_iter++]=[qcmdEnter,2,33];
     questmap[quest_iter++]=[qcmdGoto,45,40]; //dem komnaty
     questmap[quest_iter++]=[qcmdGoto,32,3];
     questmap[quest_iter++]=[qcmdEnter,32,3];
     questmap[quest_iter++]=[qcmdGoto,61,33];
     questmap[quest_iter++]=[qcmdEnter,61,33];
     questmap[quest_iter++]=[qcmdGoto,13,12]; //dem lochy1
     questmap[quest_iter++]=[qcmdGoto,30,27]; //dem lochy2
     questmap[quest_iter++]=[qcmdGoto,30,34];
     questmap[quest_iter++]=[qcmdEnter,30,34];
     questmap[quest_iter++]=[qcmdGoto,33,37]; //dem sale1
     questmap[quest_iter++]=[qcmdGoto,45,43]; //dem sale2
     questmap[quest_iter++]=[qcmdGoto,32,7];
     questmap[quest_iter++]=[qcmdEnter,32,7];
     questmap[quest_iter++]=[qcmdGoto,13,9];
     questmap[quest_iter++]=[qcmdEnter,13,9];
     questmap[quest_iter++]=[qcmdGoto,31,62];
     questmap[quest_iter++]=[qcmdEnter,31,62];
     questmap[quest_iter++]=[qcmdGoto,48,10]; //dem sts1
     questmap[quest_iter++]=[qcmdGoto,36,21];
     questmap[quest_iter++]=[qcmdGoto,29,32]; //dem sts2
     questmap[quest_iter++]=[qcmdGoto,37,43];
     questmap[quest_iter++]=[qcmdGoto,48,49]; //dem sts3
     questmap[quest_iter++]=[qcmdGoto,84,53]; //dem sts4
     questmap[quest_iter++]=[qcmdGoto,78,27]; //dem sts5
}
// END: szukaj demonisa  

// idz do magua 
questlist[questno++] = [ ID_KWIECISTE_PRZEJSCIE, quest_iter,"Idź: Magua"];
{
    questmap[quest_iter++]=[qcmdEnter,0,38]; //Gluchy Las
    questmap[quest_iter++]=[qcmdEnter,55,63]; //Zwodzace Kaskady
    questmap[quest_iter++]=[qcmdKill,57,27]; //Krokodyl
    questmap[quest_iter++]=[qcmdKill,51,37]; //Grupa Krokodyli
    questmap[quest_iter++]=[qcmdEnter,0,60]; //Skryty Azyl
    questmap[quest_iter++]=[qcmdEnter,23,57]; //Podziemne Zrodlo
    questmap[quest_iter++]=[qcmdKill,7,5]; //Grupa mag i krokodyl
    questmap[quest_iter++]=[qcmdTalk2,13,14,"19.1"]; //Rozmowa z NPC
    questmap[quest_iter++]=[qcmdKill,10,9]; //Grupa szesciu moobow
    questmap[quest_iter++]=[qcmdEnter,8,7]; //Grota Jaszczurzych Koszmarow p2
    questmap[quest_iter++]=[qcmdKill,22,20]; //Leniwy Maddok
    questmap[quest_iter++]=[qcmdTalk2,17,23,"20.4"]; //Teleport i przejscie na nastepna mape
    questmap[quest_iter++]=[qcmdKill,5,9]; //Szaman Maddokow
    questmap[quest_iter++]=[qcmdEnter,5,8]; //Dolina Potoku Smierci
    questmap[quest_iter++]=[qcmdKill,59,5]; //Leniwy Maddok2
    questmap[quest_iter++]=[qcmdKill,60,21]; //Senny Maddok
    questmap[quest_iter++]=[qcmdKill,57,39]; //Krokodyl
    questmap[quest_iter++]=[qcmdKill,28,41]; //Kajman
    questmap[quest_iter++]=[qcmdGoto,14,39]; //Tytan
    questmap[quest_iter++]=[qcmdEnd];       
}

// Do seta    
questlist[questno++] = [ ID_TUZMER, quest_iter, "Idź: Set"];
{
    questmap[quest_iter++]=[qcmdEnter,48,63]; //Port Tuzmer
    questmap[quest_iter++]=[qcmdEnter,95,59]; //Wioska Rybacka
    questmap[quest_iter++]=[qcmdEnter,50,0]; //Ciche Rumowiska
    questmap[quest_iter++]=[qcmdKill,57,27]; //Zuk
    questmap[quest_iter++]=[qcmdGoto,48,25]; //Pod Iryda
    questmap[quest_iter++]=[qcmdTalk2,48,24,"90.1"]; //TP Iryda
    questmap[quest_iter++]=[qcmdEnter,14,16]; //Grobowiec seta p1
    
    questmap[quest_iter++]=[qcmdKill,18,47]; //Mumia
    questmap[quest_iter++]=[qcmdKill,5,32]; //Mumia
    questmap[quest_iter++]=[qcmdKill,50,46]; //Mumia
    questmap[quest_iter++]=[qcmdKill,23,38]; //Mumia      
    questmap[quest_iter++]=[qcmdKill,19,17]; //Mumia 
    questmap[quest_iter++]=[qcmdKill,24,23]; //Mumia 
    questmap[quest_iter++]=[qcmdEnter,33,26]; //Grobowiec seta
    questmap[quest_iter++]=[qcmdGoto,20,26]; //Pod Iryda
    questmap[quest_iter++]=[qcmdEnd];       
}

// Kwiatki-->287 e2
questlist[questno++] = [ ID_KWIECISTE_PRZEJSCIE, quest_iter, "Idź: E2(287)"];
{
    questmap[quest_iter++] = [qcmdKill,48,32];
    questmap[quest_iter++] = [qcmdEnter,50,0];
    questmap[quest_iter++] = [qcmdKill,19,26];
    questmap[quest_iter++] = [qcmdEnter,35,0];
    questmap[quest_iter++] = [qcmdTalk2,3,29,"20.8"];
    questmap[quest_iter++] = [qcmdEnter,10,12];
    questmap[quest_iter++] = [qcmdEnter,8,9];
    questmap[quest_iter++] = [qcmdEnd];       
}
// Thuzal-->287 e2
questlist[questno++] = [ ID_THUZAL, quest_iter, "Idź: E2(287)"];
{
    questmap[quest_iter++] = [qcmdEnter,49,63];
    questmap[quest_iter++] = [qcmdTalk2,3,29,"20.8"];
    questmap[quest_iter++] = [qcmdEnter,10,12];
    questmap[quest_iter++] = [qcmdEnter,8,9];
}





    function btnQuest(id) { 
		mQuest.qLog("StartQuest: "+$(id).attr('id').split('btnQ')[1]); 
		mQuest.startQuest(questlist[parseInt($(id).attr('id').split('btnQ')[1])][1]); 
	};
	function moduleQuest(log)
	{
		this.quest_current = -1;
		this.quest_last = -1;
		this.quest_step = 0;
		this.ctask = [];
		//talks
		this.ctalk = []; // for talk 
		this.lastresult	= 0;
		this.questLog = log;
		this.questInit = false;
		
		this.initQuestList = function()
		{
			if (this.questInit) return;
			this.questInit = true;
			var str='';
			var brcount=0;
			for (var i in questlist)
			{
				if (!questlist[i][0] || questlist[i][0]==unsafeWindow._map.id)
				{
					var cls="buttonTool";
                    if (typeof (questlist[i][3]) != undefined && questlist[i][3]==1) cls = "buttondark";
                    if (questlist[i][2].indexOf('TP:')>=0) cls='button';    
                    if (questlist[i][2].indexOf('QD:')>=0) cls='buttonQuest';    
                    str += '<input type="button" id="btnQ'+i+'" class="'+cls+'" value="'+questlist[i][2]+'" style="width:120px;height:25px;margin-top:3px;" />'+((brcount==3)?'<br>':'');
                    brcount++; if (brcount==4) brcount=0;
				}
			}
			$("#panelboczny_a").html(str);
			for (var i in questlist)
			{
				if (!questlist[i][0] || questlist[i][0]==unsafeWindow._map.id)
				{
					var btnId='#btnQ'+i;
					$(btnId).click(function() { btnQuest(this); });
				}
			}				
			
		}
		
		this.doQuest = function()
		{
			if (this.quest_current == qcmdEnd)
			{	
				this.getCurrentQuest();
				this.qLog(this.quest_current);
				if (this.quest_current) 
				{
					if (questmap[this.quest_current] === undefined) this.stopQuest();
					else this.ctask = questmap[this.quest_current];
				}
			}
			if (!this.quest_current) return;
			if (this.quest_current!=this.quest_last) { this.qLog("Q: "+this.quest_current); this.quest_last=this.quest_current; }
			switch (this.ctask[0])
			{
				case qcmdEnter: 			this.qEnter(this.ctask[1],this.ctask[2],this.ctask[3]); break;
				case qcmdGoto:				this.qGoto(this.ctask[1],this.ctask[2]); break;
				case qcmdKill: 				this.qKill(this.ctask[1],this.ctask[2]); break;
				case qcmdTalk:				this.qTalk(this.ctask[1],this.ctask[2],this.ctask[3],this.ctask[4]); break;
				case qcmdTalkStart:			this.qTalkStart(this.ctask[1],this.ctask[2],this.ctask[3],""); break;
                case qcmdTalk2:				
                                            if (typeof(this.ctask[4])=='undefined' || typeof(this.ctask[4])!='string')
                                                this.qTalk2(this.ctask[1],this.ctask[2],this.ctask[3],""); 
                                            else
                                                this.qTalk2(this.ctask[1],this.ctask[2],this.ctask[3],this.ctask[4]); 
                                            break;
                case qcmdTalkTP:			this.qTalkTP(); break;
				case qcmdCheckLocation: 	if (unsafeWindow._map.id == this.ctask[1]) this.lastresult=0; else this.lastresult=1; this.progressQuest(); break;
				case qcmdBuy: 				this.qBuy(this.ctask[1],this.ctask[2]); break;			
				case qcmdBuyEnd: 			unsafeWindow.shop_close(); this.progressQuest(); break;			
				case qcmdCheckItem: 		this.qCheckItems(this.ctask[1]); break;
				case qcmdCheckSpace: 		this.qCheckSpace(); break;	
				case qcmdMessageBox: 		alert(this.ctask[1]); this.progressQuest(); break;	
				case qcmdUseItem: 			this.qUseItem(this.ctask[1]); break;		
				case qcmdProcessResult:		if (this.lastresult == this.ctask[1]) { 
                                                trace("pA"); 
                                                if (typeof(this.ctask[2])=="string")
                                                    this.gotoQuest(questlabels[this.ctask[2]]); 
                                                else
                                                    this.gotoQuest(this.ctask[2]); 
                                            }
                                            else {trace("pB");this.progressQuest();} 
                                            break;
				case qcmdStartAuto:			if (!getAction()) btnAct(); this.progressQuest(); break;
				case qcmdStopAuto:			if (getAction()) btnAct(); this.progressQuest(); break;
				case qcmdJump:				if (typeof(this.ctask[1])=="string")
                                                this.gotoQuest(questlabels[this.ctask[1]]);
                                            else
                                                this.gotoQuest(this.ctask[1]);  
                                            break;
				case qcmdSub:               questcallstack.push(this.quest_current);
                                            if (typeof(this.ctask[1])=="string")
                                                this.gotoQuest(questlabels[this.ctask[1]]);
                                            else
                                                this.gotoQuest(this.ctask[1]);  
                                            break;
				case qcmdRet:               var retaddr = questcallstack.pop();
                                            if (typeof(retaddr) != "undefined")
                                            {
                                                this.gotoQuest(retaddr + 1);
                                            }                                                
                                            break;

                
                case qcmdVerifyQuest:		this.qVerifyQuest(this.ctask[1]); break;
				case qcmdVerifyQuestMulti:	this.qVerifyQuestMulti(this.ctask[1]); break;
				case qcmdFindNPC:			this.qFindNPC(this.ctask[1]); break;
				case qcmdCloseBattle:		this.qCloseBattle(); break;
				case qcmdWaitSecs:			this.qWaitSeconds(this.ctask[1]); break;
				case qcmdFightManual: 		this.qFightManual(this.ctask[1]); break;
				case qcmdFightAuto: 		this.qFightAuto(this.ctask[1]); break;
                case qcmdCheckNPC:          this.qCheckNPC(this.ctask[1],this.ctask[2]); break;
                case qcmdCloseBook:         this.qLog("closed book");
                                            if ($('#books',window.opener.document).is(":visible"))
                                            {
                                                this.qLog("closed book");
                                                $('#books',window.opener.document).hide(); 
                                                this.progressQuest(); 
                                            }    
                                            break;
				default: 					this.stopQuest();
			}	
		}
		
		this.startQuest = function(n) {
			if (!this.quest_current || n==100) 
            {
                this.quest_current = n;
                this.quest_step = 0;
                this.ctask = questmap[n];
                if (this.ctask === 'undefined') this.stopQuest();
                else this.uiUpdateQuestNo(); 
			}
		}
		this.stopQuest = function()	{
			this.quest_current = 0;
            this.quest_step = 0;
			this.setCurrentQuest();
			doStopWalking("stopQuest");
			this.qLog("QuestEnded");
			this.uiUpdateQuestNo(); 
		}		
		this.progressQuest = function()	{
			if (this.quest_current>0) this.quest_current++;
            this.quest_step = 0;
			if (questmap[this.quest_current] === undefined) this.stopQuest();
			else 
			{	
				this.ctask = questmap[this.quest_current];		
				this.uiUpdateQuestNo();
			}
			this.temp = 0;
		}

		this.gotoQuest = function(n) {
			this.quest_current = n;
            this.quest_step = 0;
			this.ctask = questmap[n];
			if (this.ctask === 'undefined') this.stopQuest();
			else this.uiUpdateQuestNo();
			this.temp = 0;
		}
		this.qLog = function(str) { if (this.questLog>0 && unsafeWindow.console !== undefined) unsafeWindow.console.log(str); }
		this.setCurrentQuest = function() { 
            GM_setValue(unsafeWindow._hero.id+"_margoQuest", this.quest_current); 
            GM_setValue(unsafeWindow._hero.id+"_margoQuestStep", this.quest_step); 
            this.qLog("Quest: setCurrentQuest - " + this.quest_current+'['+this.quest_step+']'); 
        }
		this.getCurrentQuest = function() { 
            this.quest_current = GM_getValue(unsafeWindow._hero.id+"_margoQuest", 0); 
            this.quest_step = GM_getValue(unsafeWindow._hero.id+"_margoQuestStep", 0); 
            this.qLog("Quest: getCurrentQuest - " + this.quest_current+'['+this.quest_step+']'); 
            this.uiUpdateQuestNo(); 

        }
		this.quest_step = 0;
        this.uiUpdateQuestNo = function () { $("td#questNo").text("Q:"+this.quest_current+'['+this.quest_step+']'); };
        this.saveMapId = function() 
        { 
            localStorage[unsafeWindow._hero.id+"_margoQuestMapId"] = unsafeWindow._map.id;
            GM_setValue(unsafeWindow._hero.id+"_margoQuestMapId", unsafeWindow._map.id); 
            this.qLog("Saved map: " +unsafeWindow._map.id); 
        }
        this.loadMapId = function() 
        { 
            var mapGM = GM_getValue(unsafeWindow._hero.id+"_margoQuestMapId", 0);
            var mapLS = localStorage[unsafeWindow._hero.id+"_margoQuestMapId"];
            if (mapGM != mapLS) 
            {
                this.qLog("GM Save failed: " +mapGM+" LS="+mapLS);
            }
            return mapLS; 
        }
        this.hasMapChanged = function() { var map_id = this.loadMapId(); if (map_id!=unsafeWindow._map.id) this.qLog("saved: "+map_id+" current: "+unsafeWindow._map.id); return ( map_id != unsafeWindow._map.id);  };
 
 
        this.qCheckItems = function(itemName, count)
        {
            if (typeof(count) == "undefined") count = 1;
            var list = unsafeWindow._g.item;
            var id=-1;
            var cnt = 0;
            for (var w in list)
            {
                if (list[w].name.indexOf(itemName)>=0 && list[w].loc=="g")
                {
                    id = list[w].id;
                    cnt++;
                }
            }
            this.lastresult = (id > 0 && cnt >= count) ? qResultTrue: qResultFalse;
            this.qLog("Quest: qCheckItems("+itemName+") = "+this.lastresult);
            this.progressQuest();
        }
 
        this.qCheckNPC = function(x,y) {
            var res = ( this.getNPCId(x,y) != -1 ) ? qResultTrue: qResultFalse;
            this.progressQuest();
		}
 
        this.qUseItem = function(itemName) 
        {
            var list = unsafeWindow._g.item;
            var id=-1;
            for (var w in list)
            {
                if (list[w].name.indexOf(itemName)>=0 && list[w].loc=="g")
                {
                    id = list[w].id;
                    break;
                }
            }
            if (id > 0)
            {
                this.progressQuest();
                this.setCurrentQuest();
                unsafeWindow.__g("moveitem&st=1&id="+id);
            }
            else
            {
                this.qLog("Quest: cant find item in bag!");
                this.quest_step=0;
                this.stopQuest();             
            }
		}

        this.getNPCId = function(x,y,name) {
			var id = -1;
			var npc = unsafeWindow._g.npc;
            if (name == null) name="";
            for (var n in npc)
			{
				if (npc[n].x==x && npc[n].y==y)
				{
					id = npc[n].id;
					if (name=="") break;
                    if (name==npc[n].nick) break;
                    id = -1; //not the one we are looking for                    
				}
			}
			npc=[];
            
			return parseInt(id);
		}
		this.getBattleNPCId = function() {
			var id = -1;
			var npc = unsafeWindow._g.npc;
			for (var n in npc)
			{
				if (this.isAtLocation(npc[n].x,npc[n].y) && (npc[n].type==2 || npc[n].type==3)) 
				{
					id = npc[n].id;
					break;
                }
			}
			npc=[];
			return parseInt(id);
		}
        
		this.isAtLocation = function(x,y) {
			var ret = false;
			if (Math.abs(unsafeWindow._hero.x-x) < 2 && Math.abs(unsafeWindow._hero.y-y) < 2) ret = true;
			return ret;
		}
		this.gotoxy_temp=0;
		this.gotoxy = function(x,y)	{
			if (!isWalking)
			{
				if (unsafeWindow._hero.x==x && unsafeWindow._hero.y==y) 
				{	
					if (this.gotoxy_temp++ == 3) { this.gotoxy_temp=0; return true; }
				}
				else
				{
					this.gotoxy_temp=0;
					mCanvas.ClickedCanvasX = x;
					mCanvas.ClickedCanvasY = y;
					generatePath=true;
				}
			}
			return false;
		}
		this.gotoxy_near = function(x,y) {
			if (!isWalking)
			{
				if (this.isAtLocation(x,y)) 
				{	
					if (this.gotoxy_temp++ == 3) { this.gotoxy_temp=0; return true; }
				}
				else
				{
					this.gotoxy_temp=0;
					mCanvas.ClickedCanvasX = x;
					mCanvas.ClickedCanvasY = y;
					generatePath=true;
				}
			}
			return false;
		}		
		
	/////////////////////////////
	// coommands
	
		this.qCloseBattle = function() {
			switch(this.quest_step)
			{
				case 0:
				if (isInBattle() && battleIsEnded())
				{
					battleEnd();
					this.quest_step++;
				}
				break;
				case 1:
				if (!isInBattle()) this.progressQuest();
				break;
				default:;
			}
		}		
		this.wait_temp = 0;
		this.qWaitSeconds = function(secs) {
			if (this.quest_step == 0) this.quest_step = parseInt(secs)*2; else this.quest_step--;
			if (this.quest_step==0)	this.progressQuest();
		}		

		this.qFindNPC = function(str) {
			var bExist = false;
			var npc = unsafeWindow._g.npc;
			for (var n in npc)
			{
				if (npc[n].nick == str)
				{
					bExist = true;
					break;
				}
			}
			npc=[];
			return bExist;
		}
	
		this.qEnter = function(x,y,destloc)	{
			switch (this.quest_step)
            {
            case 0:
                {
                    this.temp=0;
                    this.quest_step++;
                }
                break;    
            case 1:
                if (this.gotoxy(x,y))
				{
					this.qLog("Quest: Enter ("+x+","+y+")");
                    this.quest_step++;
                    this.setCurrentQuest();
                    this.saveMapId();
                    unsafeWindow.__g('walk');
				}
                break;
            case 2:
                if (this.hasMapChanged())
                {
                    this.qLog("Quest: MAP CHANGED!");
                    this.quest_step=3;
                    this.temp=0;
                    break
                }
                else
                {
                    this.temp++;
                    if (this.temp==50)
                    {
                        this.qLog("Quest: cant enter()!");
                        this.quest_step=1;
                        //this.stopQuest();                        
                    }
                    else if (this.temp==100)
                    {
                        this.qLog("Quest: Reload! step="+this.temp);
                        this.quest_step=1;
                        this.setCurrentQuest();
                    }
                }   
                break;
            case 3:
                this.qLog("unsafeWindow._g.npc.length="+unsafeWindow._g.npc.length);
                if (this.temp++ > 25 || unsafeWindow._g.npc.length>0 ) this.progressQuest();
                
                break;
                
            default:;
            }
		}
		
		this.qGoto	= function(x,y) {
			if (this.gotoxy(x,y))
			{
				this.progressQuest();
			}
		}
		this.autoModeUse = 10; 
		this.qKill = function(x,y) {
			this.qLog("Kill_step: "+this.quest_step);
			switch(this.quest_step)
			{
				case 0:
					{
						if (this.gotoxy_near(x,y))
						{
							var id = this.getNPCId(x,y); 
							if (id==-1)
							{
								this.qLog("Quest: No one to Kill");
								this.progressQuest();
							}
							else
							{
							
								this.qLog("Quest: Kill");
								battleBeginAuto(id);
								this.quest_step++;
							}
						}
					}
					break;
				case 1:

                    if ($('div#autobattleButton',window.opener.document).is(":visible"))
                    {
                        if (--this.autoModeUse==0)
                        {
                            unsafeWindow.__g('fight&a=f');
                            $('div#autobattleButton',window.opener.document).hide();
                            unsafeWindow._g.battle.nobut = true;
                            this.autoModeUse = 10;
                        }
                    }
                    if (isInBattle() && battleIsEnded())
					{
						battleEnd();
						this.quest_step++;
					}
                    
                    
					break;
				case 2:
					if (!isInBattle()) this.progressQuest();
					break;
			}
			
		}
		
		// performes dialog with NPC
		this.qTalk  	= function(x, y, chatstr, teleport)	{
			this.qLog("Quest: step="+this.quest_step);
			switch(this.quest_step)
			{
				// get to the NPC location
				case 0:
					if (!($("#loading",window.opener.document).is(":visible")) && this.gotoxy_near(x,y))
					{
						this.talkId = this.getNPCId(x,y); 
						
						if (this.talkId > 0)
						{
							this.qLog("Quest: Talk - NPC["+x+","+y+"] = " + unsafeWindow._g.npc[this.talkId].nick + "("+this.talkId+")");
							this.ctalk = chatstr.split("|");
							if (this.ctalk[0].length==0) this.ctalk = [];
							this.ctalkfirst = true;
							this.qLog(this.ctalk);
							this.quest_step++;
							this.lastresult = 0;
						}
						else
						{
							this.qLog("Quest: talk - target not present!");
							this.stopQuest();
							this.lastresult = 1;
						}
					}
					break;
		
				case 1:
					// start chat
					if (this.ctalkfirst)
					{
						if (teleport == argTeleport && this.ctalk.length == 0)
						{
							this.progressQuest();
							this.setCurrentQuest();
							this.quest_current = 0;
                            
						}
						unsafeWindow.__g('talk&id='+this.talkId);
						this.ctalkfirst = false;
					}
					else if (this.ctalk.length > 0)
					{
						if (teleport == argTeleport && this.ctalk.length==1)
						{
							this.progressQuest();
							this.setCurrentQuest();
							this.quest_current = 0;
						}
						var str = this.ctalk.shift();
						this.qLog(str);
						unsafeWindow.__g('talk&id='+this.talkId+'&c='+str);
						break;
					}
					this.temp = 0;
					this.quest_step++;
					break;
					
				case 2:
					{
						// verify the chat is changed
						if (this.ctalk.length > 0)
						{
							this.qLog("A");
							if ($("div#dialog",window.opener.document).is(":visible"))
							{
								if ($("div#dialog",window.opener.document).html().indexOf("c="+this.ctalk[0])>0) this.quest_step--;
								else if (this.temp++ > 15)
								{
									this.qLog("Quest: talk - dialog line missing!");
									this.stopQuest();
									this.lastresult = 2;
								}
								
							} 
							else if (this.temp++ > 1)
							{
								this.qLog("Quest: talk - dialog ended!");
								//this.stopQuest();
								this.progressQuest();
								this.lastresult = 3;
							}
						}
						else 
						{
							this.qLog("B");
		
							if ($("div#dialog",window.opener.document).is(":visible"))
							{
								if (this.temp++ > 15)
								{
									this.qLog("Quest: talk - dialog not ended!");
									this.stopQuest();
									this.lastresult = 4;
								}
							}
							else
							{
								this.qLog("Quest: dialog finished");
								this.progressQuest();
							}
						}
					}
					break;
					
			}
		}

		this.qBuy 	= function(id,qty) {
			if ($("div#shop",window.opener.document).is(":visible"))
			{
				unsafeWindow.__g('shop&buy='+id+','+qty+'&sell=');
				this.progressQuest();
			}
		}
	
		this.qListTemp = 0;
		this.qVerifyQuest = function(str) {
			trace('Z='+$('div#dlgwin',window.opener.document).is(":visible"));
            if ($('div#dlgwin',window.opener.document).is(":visible"))
			{
				trace('A');
                if ($('div.questlist',window.opener.document).is(":visible"))
				{
                    trace('B');
					trace(str);
                    if ($('div.questlist',window.opener.document).html().indexOf(str)>=0)
					{
						
                        trace('BA');
                        this.lastresult = qResultTrue;
					}
					else
					{
						trace('BC');
                        this.lastresult = qResultFalse;
					}
					$("#dlgwin",window.opener.document).fadeOut("fast");
					this.progressQuest();
				}
			}
			else
			{
				trace('C');

                if (this.qListTemp++ == 0)
				{
					unsafeWindow.__g("quests");
				}
				if (this.qListTemp>40)this.qListTemp=0;
			}
		}
		this.qVerifyQuestMulti = function(choices) {
            
            if ($('div#dlgwin',window.opener.document).is(":visible"))
			{
                if ($('div.questlist',window.opener.document).is(":visible"))
				{
                    var bRet = false;
                    for (var x in choices)
                    {
                        if ($('div.questlist',window.opener.document).html().indexOf(choices[x][0])>=0)
                        {
                            trace("Found quest: "+choices[x][0]);
                            this.gotoQuest(choices[x][1]);
                            bRet = true;
                            break;
                        }
                    }
                    $("#dlgwin",window.opener.document).fadeOut("fast");
                    if (bRet == false)
                    {
                        trace("Quest not found!");
                        this.progressQuest();
                    }
				}
			}
			else
			{
                if (this.qListTemp++ == 0)
				{
					unsafeWindow.__g("quests");
				}
				if (this.qListTemp>40)this.qListTemp=0;
			}
		}

		// this.qcmdCheckItems	= function(arg) {}
		// this.qcmdCheckSpace	= function(arg) {}
		// this.qcmdMessageBox	= function(arg) {}
		// this.qcmdUseItem = function(arg) {}
		// this.qcmdWaitMins = function(arg) {}
		// this.qcmdWaitSecs = function(arg) {}

		

		this.ProcessAction = function(action, id)
		{
			var bRet = true;
			try {
				switch(action)
				{
					case battle_other_move: battleMove(); break;
					case battle_other_strike: battleStrike(id); break;
					// self - mana
					case spell_AuraOchronyFizycznej:
					case spell_AuraOchronyMagicznej:
					case spell_AuraSzybkosci:
					case spell_LeczenieRan:
					{
						var cost = parseInt(unsafeWindow._g.battle.skills[action].cost);
						bRet = (cost <= battleGetMana());
						if (bRet) 
                        {
                            if (id == 0)
                                battleCastSpellSelf(action);
                            else   
                                battleCastSpell(action,id);
                        }
					}			
					break;
					// self energy
					case spell_BandazowanieRan:
					{
						var cost = parseInt(unsafeWindow._g.battle.skills[action].cost);
						bRet = (cost <= battleGetEnergy());
						if (bRet) battleCastSpellSelf(action);
					}				
					break;
					
					//attack - mana
                    case spell_KulaOgnia:
                        {
                            var cost = parseInt(unsafeWindow._g.battle.skils[action].cost);
                            bRet = (cost <= battleGetMana());
                            if (bRet) battleCastSpell(action,id);
                        }					
					break;
                    
					//attack - energy
					case spell_PodwojnyStrzal:
					case spell_AtakBlyskawiczny:
                    case spell_ObrazaPrzeciwnika:
					{
						var cost = parseInt(unsafeWindow._g.battle.skills[action].cost);
						bRet = (cost <= battleGetEnergy());
						if (bRet) battleCastSpell(action,id);
					}				
					break;
					
				}
			}
			catch(e)
			{
				trace(e);
				bRet = false;
			}
			return bRet;
		}

 
// Quest Auto Fight - Auto
 
		this.qFightManual_delay = 0;
		this.qFightManual_step = 0;
		this.qFightManual_loglen = -1;
		this.qFightManual = function(delay)
		{
			switch (this.quest_step)
			{
				//find foe
				case 0:

            if (!proceed_to_go())  
            {
                this.stopQuest(); 
                break;
            }	
            mMargo.order = "mhwe2tpb<";					


					

					if (isInBattle()) 
					{ 
						this.quest_step = 6; 		
						this.qFightManual_delay = 0;
					}			
					
					if (mMargo.enemyCoords[0]>0)
					{
						
						
						for (var i in mMargo.enemyCoords)
						{
							if (i != 0) {
								trace(mMargo.enemyCoords[i][0]);
								//if (this.gotoxy_near(mMargo.enemyCoords[i][1],mMargo.enemyCoords[i][2]));
								break;
							}
						}
					}
					
					
					// na E2 jesli sam albo grupa nie pelna to nie bij
					if (unsafeWindow._map.id==1972  || unsafeWindow._map.id==1926)
					{
								
						var partysize = 0;
						for (var k in unsafeWindow._g.party) partysize++;
						if (partysize == 0 || partysize != mMargo.nuser) 
						{
							//trace("Exiting");
							break;
						}
					}
					if (!this.qFightManual_delay) this.qFightManual_delay = delay;
					this.fightIdX = unsafeWindow._hero.x;
					this.fightIdY = unsafeWindow._hero.y;
					this.fightId = this.getBattleNPCId();	
					this.qFightManual_step = 0;
					
					if (this.fightId != -1)
					{	
						trace(this.qFightManual_delay);
						if (this.qFightManual_delay==1)	
						{	
							this.quest_step++;
							this.qFightManual_delay = 0;
						}
						else 						
							this.qFightManual_delay--;	
					}


					
							
					break;
				//start battle
				case 1: 
				case 3:
					this.qLog("id:"+this.fightId+" "+this.fightIdX +" "+ this.fightIdY);
					if (this.fightId>0 && this.fightIdX==unsafeWindow._hero.x && this.fightIdY==unsafeWindow._hero.y)
					{
						this.qLog("id:"+this.fightId);
						battleBeginManual(this.fightId);
						this.temp = 0;	
						this.quest_step++;	
					}
					else
					{
						this.quest_step = 0;
					}
					break;
				//wait for battle to begin
				case 2:
				case 4:
					
					if (isInBattle()) 
						this.quest_step = 6;
					else	
					{
						if (this.temp++==10) this.quest_step++;
					}						
					break;
				//something wrong, terminate
				case 5: this.stopQuest(); break; 	
				

////////////////////////////////////////////////////////////////////////////////////
				//battle
				case 6:
					//this.qLog("Battle");
					var len = $('#battlelog',window.opener.document).html().length;
					if (battleIsEnded()) this.quest_step = 8;
					else if (battleIsMyTurn() && (this.qFightManual_loglen != len))
					{
						this.qFightManual_loglen = len;



						
						this.qFightManual_step++;
						battleClearTimer();						

					}
					
					break;
/////////////////////////////////////////////////////////////////////////////////////
				//battle end
				case 8:	
					this.qLog("EndBattle");
					battleEnd();
					this.temp = 0;	
					this.quest_step++;					
					break;
				
				case 9:	
					//if (!isInBattle()) { this.quest_step = 0; this.temp = 0; }	
					//else if (this.temp++ == 50) this.stopQuest();
					//break;
					
					if (!isInBattle()) { this.quest_step = 0;	this.temp = 0; }
					else if (this.temp++ == 30) 
					{
						this.temp = 0;
						if (battleIsEnded())
						{
							this.temp = 0;
							battleEnd();
						}
						else
						{
							this.quest_step = 6;
						}
					}
					break;	
				
				default:;
			}
		}
		





// Quest Auto Fight - Auto


this.qFightAutoSaveState = false;
this.qFightAuto = function(delay)
{
    switch (this.quest_step)
    {
        //find foe
        case 0:

            if (!proceed_to_go())  
            {
                this.stopQuest(); 
                break;
            }	
            mMargo.order = "mhwe2tpb<";					
            
            if (!this.qFightManual_delay) this.qFightManual_delay = delay;
            this.fightIdX = unsafeWindow._hero.x;
            this.fightIdY = unsafeWindow._hero.y;
            this.fightId = this.getBattleNPCId();	
            if (this.fightId!=-1)
            {	
                trace(this.qFightManual_delay);
                if (this.qFightManual_delay<=1)	
                    this.quest_step++;
                else 						
                    this.qFightManual_delay--;	
            }
            else
            {
                this.qFightManual_delay = 0;
                this.quest_step = 9;
            }
                    
            break;
        //start battle
        case 1: 
        case 3:
            this.qLog("id:"+this.fightId+" "+this.fightIdX +" "+ this.fightIdY);
            if (this.fightId>0 && this.fightIdX==unsafeWindow._hero.x && this.fightIdY==unsafeWindow._hero.y)
            {
                this.qLog("id:"+this.fightId);
                battleBeginAuto(this.fightId);
                this.temp = 0;	
                this.quest_step++;	
            }
            else
            {
                this.quest_step = 0;
            }
            break;
        //wait for battle to begin
        case 2:
        case 4:
            
            if (isInBattle()) 
                this.quest_step = 6;
            else	
            {
                if (this.temp++==30) this.quest_step++;
            }						
            break;
        //something wrong, terminate
        
        case 5: this.stopQuest(); break; 	
        //battle
        case 6:
            this.qLog("Battle");
            if (battleIsEnded())
                this.quest_step = 8;
            break;
        //battle end
        case 8:	
            this.qLog("EndBattle");
            battleEnd();
            this.temp = 0;	
            this.quest_step++;					
            break;
        
        case 9:	
            this.temp++;
            if (this.temp == 20 && !isInBattle()) this.quest_step = 0;	
            if (this.temp == 30) 
            {
                this.temp = 0;
                if (battleIsEnded())
                {
                    this.temp = 0;
                    battleEnd();
                }
                else
                {
                    this.quest_step = 6;
                }
            }
            break;
        
        default:;
    }
}        
 
// performes dialog with NPC
        this.qLastStep = -1;
		this.qTalk2  	= function(x, y, chatstr, name)	
        {
			if ($("#loading",window.opener.document).is(":visible")) return;
            if (this.qLastStep!=this.quest_step) this.qLog("Quest: current="+this.quest_current+" step="+this.quest_step);
			this.qLastStep=this.quest_step;
            
            switch(this.quest_step)
			{
				case 0: //save the location for reload
                    this.quest_step++;
                    this.setCurrentQuest();
                    this.saveMapId();
                    this.lastresult = 0;
                    break;
                
                // get to the NPC location
				case 1: //get close to NPC
                    
                    // stop if map changed... will not be able to talk to NPC
                    if (this.hasMapChanged()) 
                    {
 						this.qLog("Quest: talk - map changed!");
						this.stopQuest();
                        return;
                    }
                    
                    if (this.gotoxy_near(x,y))
					{
                        this.talkId = this.getNPCId(x,y,name);
						if (this.talkId > 0)
						{
							this.qLog("Quest: Talk - NPC["+x+","+y+"] = " + unsafeWindow._g.npc[this.talkId].nick + "("+this.talkId+")");
							this.ctalkfirst = true;
							this.quest_step++;
                            //zapamietaj lokacje
                            this.setCurrentQuest();
                            this.saveMapId();
						}
						else
						{
							this.qLog("Quest: talk - target not present!");
							this.stopQuest();
						}
					}
					break;
		
				case 2:
					// start chat
                    if ($("div#dialog",window.opener.document).is(":visible")) 
                    {
                        this.quest_step++;
                        delete this.ctalk;
                        this.setCurrentQuest();
                    }
                    else if (this.hasMapChanged())
                    {
                        this.progressQuest();
                    }
					if (this.ctalkfirst)
					{
						unsafeWindow.__g('talk&id='+this.talkId);
						this.ctalkfirst = false;
                        this.temp = 0;
                    }
                    else if (!this.ctalkfirst && chatstr =="")
                    {
                        if (this.temp++ > 2) this.progressQuest();
                    }
                    else if (this.quest_reloaded == true)
                    {
                        this.ctalkfirst = true;
                        this.quest_reloaded = false;
                    }
                    break;
                case 3:
                    //recover from load
                    if (this.temp++ < 6) break;
                    if (this.hasMapChanged())
                    {
                        this.progressQuest();
                        this.quest_reloaded = false;
                        break;
                    } 
                    if (!($("div#dialog",window.opener.document).is(":visible"))) 
                    {
                        this.qLog("Quest: talk - Not in the dialog!");
						this.stopQuest();
						this.lastresult = 2;
                        break;
                    }
                    if (this.quest_reloaded == true)
                    {
                        this.quest_reloaded = false;
                        this.ctalk = chatstr.split("|");
						if (this.ctalk[0].length==0) this.ctalk = [];
                    }
                     
                    if (typeof(this.ctalk) == 'undefined')
                    {
                      	this.ctalk = chatstr.split("|");
						if (this.ctalk[0].length==0) this.ctalk = [];
						this.qLog(this.ctalk);
                        this.dialog = "";
                    }
                    
                    // we have something to say
                    if (this.ctalk.length > 0)
					{
						// chat when new dialog lines appear
                        if (this.dialog != $("div#dialog",window.opener.document).html())
                        {
                            while (1)
                            {
                                var str = this.ctalk.shift();
                                if (typeof(str) == 'undefined') break;
                                if ($("div#dialog",window.opener.document).html().indexOf("c="+str+'\'')>0)
                                {
                                    this.qLog(str);
                                    this.dialog = $("div#dialog",window.opener.document).html();
                                    unsafeWindow.__g('talk&id='+this.talkId+'&c='+str);
                                    this.temp = 0;
                                    
                                    if (this.ctalk.length==0)
                                    {
                                        this.qLog("Quest: Last sentence!"); 
                                        this.quest_step++;
                                        this.setCurrentQuest();
                                        this.temp = -1;                                        
                                    }
                                    break;
                                }
                            }
                        }   
                        // the chat line has not been found - restart
                        if (this.dialog=="")
                        {
                            this.quest_reloaded = true;
                        }
                    }
                    else
                    {
                        this.quest_step++;
                        this.setCurrentQuest();
                        this.temp = -1;
                        this.lastresult=3;
                    }
					break;
					
					
				case 4:
                    if (this.quest_reloaded == true)
                    {
                        this.quest_reloaded = false;
                        this.temp = 0;
                    }                   
                    
                    if ($("div#dialog",window.opener.document).is(":visible") )
                    {
                        if  (this.temp++==0)
                        {
                            $(".endtalk").trigger("click");
                        }
                        else
                        {
                            this.qLog("Quest: Please reload ("+this.temp+")");
                        }
                    }
                    else
                    {
                        this.qLog("Quest: dialog finished");
                        this.progressQuest();
					}
					break;
					
			}
		}
		
        this.qTalkStart = function(x, y, chatstr, name)	
        {
			if ($("#loading",window.opener.document).is(":visible")) return;
            //if (this.qLastStep!=this.quest_step) 
            this.qLog("qTalkPart1: current="+this.quest_current+" step="+this.quest_step);
			this.qLastStep=this.quest_step;
            
            switch(this.quest_step)
			{
				case 0: //save the location for reload
                    this.quest_step++;
                    this.setCurrentQuest();
                    this.saveMapId();
                    this.lastresult = 0;
                    this.temp = 0;
                    break;
                
                // get to the NPC location
				case 1: //get close to NPC

                    // stop if map changed... will not be able to talk to NPC
                    if (this.hasMapChanged()) 
                    {
 						this.qLog("Quest: talk - map changed!");
						this.stopQuest();
                        return;
                    }
                    
                    if (this.gotoxy_near(x,y))
					{
                        this.talkId = this.getNPCId(x,y,name);
						if (this.talkId > 0)
						{
							this.qLog("Quest: Talk - NPC["+x+","+y+"] = " + unsafeWindow._g.npc[this.talkId].nick + "("+this.talkId+")");
							this.ctalkfirst = true;
							this.quest_step++;
                            //zapamietaj lokacje
                            this.setCurrentQuest();
                            this.saveMapId();
						}
						else
						{
							this.qLog("Quest: talk - target not present!");
							this.stopQuest();
						}
					}
					break;
		
				case 2:  
					// start chat
                    
                    // gdy dialog rozpoczety - nastepny krok
                    if ($("div#dialog",window.opener.document).is(":visible")) 
                    {
                        this.quest_step++;
                        delete this.ctalk;
                        this.setCurrentQuest();
                        break;
                    }
                    // progress gdy rozmowa zakonczona TP
                    else if (this.hasMapChanged())
                    {
                        this.progressQuest();
                    }
					// rozpoczecie dialogu
                    if (this.ctalkfirst)
					{
						unsafeWindow.__g('talk&id='+this.talkId);
						this.ctalkfirst = false;
                        this.temp = 0;
                    }
                    // dialog rozpoczety, ale brak rozmowy - niektore npc od razu zamykaja rozmowe
                    else if (!this.ctalkfirst && chatstr =="")
                    {
                        if (this.temp++ > 30) this.progressQuest();
                    }
                    // mapa przeladowana, wczytaj na nowo dialog
                    else if (this.quest_reloaded == true)
                    {
                        this.ctalkfirst = true;
                        this.quest_reloaded = false;
                    }
                    break;
                case 3:

                    // mapa zmienila sie po TP, progress do nast
                    if (this.hasMapChanged())
                    {
                        this.progressQuest();
                        this.quest_reloaded = false;
                        break;
                    } 
                    // nie ma dialogu, to blad!
                    if (!($("div#dialog",window.opener.document).is(":visible"))) 
                    {
                        this.qLog("Quest: talk - Not in the dialog!");
						this.stopQuest();
						this.lastresult = 2;
                        break;
                    }
                    // gra zaladowana ponownie
                    if (this.quest_reloaded == true)
                    {
                        this.quest_reloaded = false;
                        this.ctalk = chatstr.split("|");
						if (this.ctalk[0].length==0) this.ctalk = [];
                    }
                     
                    if (typeof(this.ctalk) == 'undefined')
                    {
                      	this.ctalk = chatstr.split("|");
						if (this.ctalk[0].length==0) this.ctalk = [];
						this.qLog(this.ctalk);
                        this.dialog = "";
                    }
                    
                    // we have something to say
                    if (this.ctalk.length > 0)
					{
						// chat when new dialog lines appear
                        if (this.dialog != $("div#dialog",window.opener.document).html())
                        {
                            while (1)
                            {
                                var str = this.ctalk.shift();
                                if (typeof(str) == 'undefined') break;
                                if ($("div#dialog",window.opener.document).html().indexOf("c="+str+'\'')>0)
                                {
                                    //
                                    this.qLog(str);
                                    this.dialog = $("div#dialog",window.opener.document).html();
                                    unsafeWindow.__g('talk&id='+this.talkId+'&c='+str);
                                    this.temp = 0;
                                    if (this.ctalk.length==0)
                                    {
                                        this.qLog("Quest: Last sentence!"); 
                                        this.progressQuest();                                       
                                    }
                                    break;
                                }
                            }
                        }   
                        // the chat line has not been found - restart
                        if (this.dialog=="")
                        {
                            this.quest_reloaded = true;
                        }
                    }
                    
                    // dialog skonczony - wyjscie
                    else
                    {
                        this.progressQuest();
                    }
					break;
					
                    default:;
			}
		}
	
    }
							
	var mQuest = new moduleQuest(1);

 
	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	// ACTION FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////	
	var warFoeID = 0;
	var warFoeType = -1;
	var warWaitBefore = 0;	
	var actionTravel	= 1;
	var actionFight		= 2;
	var actionState 	= 0;
	function actionIsFighting() { return actionState & actionFight; }
	function actionIsTraveling() { return actionState & actionTravel; }
	function actionSetFight(b) { if (b) actionState |= actionFight; else actionState &= ~actionFight; }
	function actionSetTravel(b) { if (b) actionState |= actionTravel; else actionState &= ~actionTravel; }
	function getAction() { return actionState; }
	function actionStop(fn) { if (actionState != 0) {trace("Stop: "+fn);	actionState=0;} }
	
	// game script commands 
	// self-mana
	var spell_AuraOchronyFizycznej = 75; 
	var spell_AuraOchronyMagicznej = 76;
	var spell_AuraSzybkosci	= 77;
	var spell_LeczenieRan = 78;
	// self-energy
	var spell_BandazowanieRan = 81;
	
	// self-???
	var spell_OdpornoscSlonca = 104;
	
	// attack-mana
	var spell_SmierdzacyPocisk = 102;	
    var spell_KulaOgnia = 21;
	// attack-energy
	var spell_PodwojnyStrzal = 97;	
	var spell_DeszczStrzal = 96;
	var spell_BlyskawicznyStrzal = 85;
	var spell_ObrazaPrzeciwnika = 121;
	// attack-???
	var spell_PorazajacaStrzala = 50;
	var spell_Grom = 53;




	var spell_OgniowaStrzala = 60;	
	var spell_AtakBlyskawiczny = 38;
	
	var battle_other_move = 1;
	var battle_other_strike = 2;

var LokacjeExt = 	[ 
//krypta 
//p1
[ 2143,0,12,51,182,185, "","" ,4, actionTravel +actionFight ,"",0],//
//p2
[2144,2143,62,10,182,185, "","" ,4, actionTravel +actionFight ,"",0],//
//p2,s1
[2146,2144,8,11,182,185, "","" ,4, actionTravel +actionFight ,"",0],//
//p2
[2153,2146,6,12,182,185, "","" ,4, actionTravel +actionFight ,"",0],//
// do p3
[2144,2153,16,10,182,185, "","" ,4,actionTravel +actionFight ,"",0],//

//p3
[2147,2144,6,21,182,185, "","" ,4,actionTravel  ,"",0],// wracaj od razu
//[2147,2144,56,21,182,185, "","" ,4,actionTravel +actionFight ,"",0],// idz dalej

//p2s2
[2154,2147,8,4,182,185, "","" ,4,actionTravel +actionFight ,"",0],//
                                //berserki


								[111,   0, 63, 4, 130, 156, "49,13;", "", 1, actionTravel + actionFight,"",0], // Wioska Ghuli
								[708,   0, 30,63, 130, 156, "", "43,61;44,60;45,61;", 1, actionTravel + actionFight,"",0], // Zaginiona dolina
								[712, 708, 21,36, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z zaginionej doliny -> lewy barak
								[712, 719, 44,36, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z lewego baraku -> Prawy barak
								[712, 718, 35,13, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z prawego baraku -> mur polnocny
								[712, 715, 33,26, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								[712,1708, 30, 0, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza

								[1708,712, 63,42, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								[1708,  0, 63,42, 130, 156, "", "", 1, actionTravel + actionFight,"33,0",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								[1711,1708,19,55, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								[1711,1718, 0,74, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								[1711,1712, 9,54, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								[1711,1719,33, 0, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								[1712,  0, 33,95, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								[1718,1711, 6, 3, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								[1718,1719,14, 7, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								[1719,1718, 4, 9, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								[1719,1711, 9,21, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> mala twierdza
								//lewa
								[716, 712,  1,16, 130, 156, "", "17,6;15,7;16,8;19,7;18,8;", 1, actionTravel + actionFight,"",0], // mala twierdza -> lewa straznica
								[721, 716,  7,14, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // mala twierdza -> lewa straznica	
								[712, 721, 25,26, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // mala twierdza -> lewa straznica	
								[721, 712, 12, 8, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // mala twierdza <- lewa straznica	
								//prawa
								[716, 721, 33,16, 130, 156, "", "17,6;15,7;16,8;19,7;18,8;", 1, actionTravel + actionFight,"",0], // mala twierdza -> prawa straznica
								[720, 716,  7,14, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // prawa straznica -> prawa flanka
								[712, 720, 40,26, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // prawa flanka -> lewa straznica	
								[720, 712,  3, 8, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // lewa straznica	-> mala twierdza
								[716, 720, 18,18, 130, 156, "", "17,6;15,7;16,8;19,7;18,8;", 1, actionTravel + actionFight,"",0], // mala twierdza -> wyjscie
								
								[712, 716, 31,63, 130, 156, "", "60,4;59,5;61,6;", 1, actionTravel + actionFight,"",0], // Opuszczona twierdza z mur polnocny -> zaginiona dolina
								[719,   0,  7,13, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // Lewy barak 
								[718,   0,  7,13, 130, 156, "", "", 1, actionTravel + actionFight,"",0], // prawy barak 
								[715,   0, 26,13, 130, 156, "", "", 1, actionTravel + actionFight,"",0],  // mur polnocny 
								
								//czarownice Tristam
								
								[1297,1294,  4,79, 130, 156, "", "", 3, actionTravel + actionFight,"",0], //Tristam
								
								[1302,1297, 21, 9, 130, 156, "", "", 3, actionTravel + actionFight,"",0], //Tristam
								[1302,1315, 11,22, 130, 156, "", "", 3, actionTravel + actionFight,"",0], //Tristam
								[1315,1302, 58,43, 130, 156, "", "", 3, actionTravel + actionFight,"",0], //Tristam
								[1315,1322,  6, 3, 130, 156, "", "", 3, actionTravel + actionFight,"",0], //Tristam
								[1322,   0, 55,26, 130, 156, "", "13,35;13,38;15,36;17,37;19,36;", 3, actionTravel + actionFight,"",0], //Tristam
								[1297,1302, 63,71, 130, 156, "", "", 3, actionTravel + actionFight,"",0], //Tristam
								[1297,   0,  4,79, 130, 156, "", "", 3, actionTravel + actionFight,"",0], //Tristam
								
								[1294,1297, 16, 0, 130, 156, "", "", 3, actionTravel + actionFight,"",0], //Sabatowe Góry z Tristam
								[1294,1293,  0,39, 130, 156, "", "", 3, actionTravel + actionFight,"",0], //Sabatowe Góry z Upiorna droga
								[1293,   0, 16,63, 130, 156, "", "", 3, actionTravel + actionFight,"",0],  //Upiorna droga
								
								
								// droga do kazamat
								[ 348, 0, 63,38, 130, 156, "", "", 			1, actionTravel ,"",0], 
								[ 356, 0, 95,22, 130, 256, "", "", 			1, actionTravel ,"",0], 
								[ 357, 0, 54,92, 150, 656, "62,76;", "", 	1, actionTravel + actionFight,"",0], //Tristam
								[ 360, 0, 41,35, 150, 656, "", "",			1, actionTravel ,"",0], //Siedziba Rady Orków
								// kazamaty
								// morus
								/*
								[ 550,   0,  5,16, 160, 180, "46,15;19,7;36,38;36,25;35,7;", ""					, 1, actionTravel + actionFight ,"",0], //NK p.1
								[ 551, 550, 47,38, 160, 180, "49,31;", ""					, 1, actionTravel + actionFight ,"",0], //NK p.2
								[ 552, 551, 32, 5, 160, 180, "50,35;", ""					, 1, actionTravel + actionFight ,"",0], //NK p.3
								[ 585, 552, 34,41, 160, 180, "32,13;33,24;", ""					, 1, actionTravel + actionFight ,"",0], //NK p.4
								[ 586, 585, 12,28, 160, 180, "", "24,6;26,7;24,9;28,6;28,9;"			, 1, actionTravel + actionFight ,"",0], //NK p.5
								[ 587,   0,  5,43, 160, 180, "12,32;22,40;29,14;26,27;", ""					, 1, actionTravel + actionFight ,"",0], //NK p.6
								*/
								//czesiaczek
								// kazamaty
								[ 550,   0,  5,16, 130, 160, "", ""					, 1, actionTravel + actionFight,"" ], //NK p.1
								[ 551, 550, 47,38, 130, 160, "", ""					, 1, actionTravel + actionFight,"" ], //NK p.2
								[ 552, 551, 32, 5, 130, 160, "", ""					, 1, actionTravel + actionFight ,"",0], //NK p.3
								[ 585, 552, 34,41, 130, 160, "", ""					, 1, actionTravel + actionFight ,"",0], //NK p.4
								[ 586, 585, 12,28, 130, 160, "", "24,6;26,7;24,9;28,6;28,9;"			, 1, actionTravel + actionFight,"" ], //NK p.5
								[ 587,   0, 12,29, 130, 160, "", ""					, 1, actionTravel + actionFight ,"",0], //NK p.6
								// w gore	
								[ 586, 587, 34,42, 130, 160, "", "24,6;26,7;24,9;28,6;28,9;"			, 1, actionTravel + actionFight,"" ], //NK p.5
								[ 585, 586, 32, 7, 130, 160, "", ""					, 1, actionTravel + actionFight,"" ], //NK p.4
								[ 552, 585, 47,40, 130, 160, "", ""					, 1, actionTravel + actionFight ,"",0], //NK p.3
								[ 551, 552,  5,18, 130, 160, "", ""					, 1, actionTravel + actionFight ,"",0], //NK p.2								//komnaty
								
                                //Nawiedzone Komnaty p.1
								[ 605, 587, 32,45, 150, 250, "", ""		, 6, actionTravel + actionFight ,"",1],
                                [ 605, 0, 	32,45, 150, 250, "", ""		, 6, actionTravel + actionFight ,"31,8",1],
                                //Nawiedzone Komnaty p.2
								[ 606, 605, 15, 3, 150, 250, "", ""		, 4, actionTravel + actionFight ,"",1],
								[ 606, 607, 15,42, 150, 250, "", ""		, 4, actionTravel + actionFight ,"",1],
								//Sala Królewska
                                [ 607, 606, 35, 7, 150, 250, "", "25,7;40,4;11,5;10,7;13,8;9,18;8,21;6,19;4,21;41,6;43,6;13.8;"	, 6, actionTravel + actionFight ,"",1], 
								[ 607, 608, 24,62, 150, 250, "", "25,7;40,4;11,5;10,7;13,8;9,18;8,21;6,19;4,21;41,6;43,6;13.8;"	, 6, actionTravel + actionFight ,"",1], 
								//KCP
                                [ 608,   0, 35,56, 150, 250, "", "20,32;26,32;22,35;24,35;"		, 4, actionTravel + actionFight ,"23,13",1], //NK p.6
								
								// Rogogłowi
								[ 1640, 0,  36, 8, 130, 176, "", ""			, 3, actionTravel + actionFight ,"",0], 
								//[ 1640,    0, 36, 8, 130, 170, "", ""		, 1, actionTravel + actionFight ,"",0], 
								//A
								[ 1635, 1640, 13,39, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1632, 1635,  5, 1, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1633, 1632,  9,14, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1635, 1633, 15,31, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1634, 1635, 12,13, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1632, 1634, 16,31, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								//B
								[ 1635, 1632, 34,38, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1636, 1635,  6, 0, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1637, 1636,  7, 1, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1635, 1637, 28,29, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1637, 1635,  6,13, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1636, 1637, 23,31, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								//C
								[ 1635, 1636, 66,44, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1642, 1635,  7, 1, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1643, 1642, 11,14, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								//[ 1635, 1643, 94,28, 130, 170, "", ""		, 1, actionTravel + actionFight ,"",0], 
								// nowa trasa
								[ 1635, 1643, 68,33, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1647, 1635,  4, 1, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1653, 1647,  6,15, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1635, 1653, 82,14, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1653, 1635,  2, 4, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1647, 1653, 24, 2, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1648, 1647, 12,11, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1635, 1648, 21, 9, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1635, 1648, 21, 9, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								//zmiana do poludnia
								//[ 1649, 1635, 25,63, 130, 170, "", ""		, 1, actionTravel + actionFight ,"",0], 
								[ 1649, 1635, 50, 1, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1651, 1649, 29, 7, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1635, 1651, 31, 3, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1652, 1635, 11, 6, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1641, 0,  9,27, 130, 170, "", "47,4;45,2;43,3;"		, 3, actionTravel + actionFight ,"",0], 
								[ 1652, 1641,  3,15, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1635, 1652, 54, 1, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1651, 1635,  4,30, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1649, 1651, 25,63, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								
								
								[ 1635, 1649, 77, 9, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1648, 1635,  2,15, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1647, 1648, 15,27, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1635, 1647, 94,28, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								
								
								[ 1644, 1635,  1, 5, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[ 1642, 1644, 14,30, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								//out
								[ 1635, 1642, 15,63, 130, 170, "", ""		, 3, actionTravel + actionFight ,"",0], 
								
		

								//furbole
								//[    2,    0, 42, 0, 130, 170, "", ""		, 1, actionTravel,"",0], 
								//[ 1111,    2,  2, 9, 130, 185, "", ""		, 1, actionTravel,"",0], 
								[ 1113, 1111, 50,62, 230, 285, "14,32;40,29;38,58;", ""		, 1, actionTravel + actionFight ,"",0], 
								[ 1114,    0, -1,-1, 230, 285, "3,60;", ""		, 1, actionTravel + actionFight ,"40,12",0], 
								
								//myszy
								[  574,    0,  6,58, 130, 195, "", ""		, 4, actionTravel + actionFight ,"",0], 
								[  823,    0,  3,15, 130, 195, "", ""		, 4, actionTravel + actionFight ,"",0], 
								[  826,    0,  9,10, 130, 195, "", ""		, 4, actionTravel + actionFight ,"",0], 
								[  827,    0,  7, 9, 130, 195, "", ""		, 4, actionTravel + actionFight ,"",0], 
								[  979,    0, 79,54, 130, 295, "", ""		, 4, actionTravel + actionFight ,"",0], 
								// do krola
								//[  972,    0, -1,-1, 196, 295, "53,44;43,34;49,25;43,22;", ""		, 1, actionTravel + actionFight ,"14,6",0], 
								//do sekty
								[  972,    0, 43,55, 130, 295, "53,43;43,31;49,25;43,22;", ""		, 4, actionTravel + actionFight ,"",0], 
								
								
								//sekta
								[  974,    0, 15,29, 195, 200, "", ""		, 4, actionTravel + actionFight ,"",0], 
								[  975,  974, 31,62, 195, 200, "", ""		, 4, actionTravel + actionFight ,"",0], 
								[  973,  975, 48, 4, 195, 200, "", 				"43,31;53,31;48,28;68,29;71,31;74,29;"		, 4, actionTravel + actionFight ,"",0], 
								[  975,  973,  2,33, 195, 200, "", ""		, 4, actionTravel + actionFight ,"",0], // z 1000
								[  975,  977, 61,33, 195, 200, "", ""		, 4, actionTravel + actionFight ,"",0], // z sypialni
								[  975,  971, 31,62, 195, 200, "", ""		, 4, actionTravel + actionFight ,"",0], // z lochow
								[  977,  975, 31,44, 195, 200, "", ""		, 4, actionTravel + actionFight ,"",0], 
								[  977, 1046, 31, 3, 195, 200, "", ""		, 4, actionTravel + actionFight ,"",0], 
								[  971,  976, 13, 9, 195, 200, "", ""		, 4, actionTravel + actionFight ,"54,46",0], 
								[  971,  975, 30,34, 195, 200, "", ""		, 4, actionTravel + actionFight ,"54,46",0], 
								[  976,    0, 32, 7, 195, 200, "", ""		, 4, actionTravel + actionFight ,"",0], 
								[ 1046,    0, 31,21, 130, 200, "", ""	, 5, actionTravel + actionFight ,"",0], 
								
								[ 1060,    0, 0,0, 3, 7, "", ""		, 5, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								//gacki
								[  147,    0,10,10, 10, 26, "", ""		, 1, actionTravel + actionFight ,"",0], //Siedlisko Nietoperzy p.5->p.4
								[  146,  147,15,13, 10, 26, "", ""		, 1, actionTravel + actionFight ,"",0], //Siedlisko Nietoperzy p.4->p.3
								[  146,  145,10, 3, 10, 26, "", ""		, 1, actionTravel + actionFight ,"",0], //Siedlisko Nietoperzy p.4->p.2
								[  145,  144, 5, 2, 10, 26, "", ""		, 1, actionTravel + actionFight ,"",0], //Siedlisko Nietoperzy p.3->p.4
								[  145,  146,15,38, 10, 26, "", ""		, 1, actionTravel + actionFight ,"",0], //Siedlisko Nietoperzy p.3->p.2
								[  144,  145,10, 9, 10, 26, "", ""		, 1, actionTravel + actionFight ,"",0], //Siedlisko Nietoperzy p.3->p.4
								[  144,  143,15, 2, 10, 26, "", ""		, 1, actionTravel + actionFight ,"",0], //Siedlisko Nietoperzy p.3->p.2
								[  143,    0,10, 8, 10, 26, "", ""		, 1, actionTravel + actionFight ,"",0], //Siedlisko Nietoperzy p.3->p.2

								//ghule
								[  705,    0,12, 6, 20, 42, "", ""		, 1, actionTravel + actionFight ,"48,48;17,38",0], //p.5
								[  704,  705,30, 2, 20, 42, "", ""		, 1, actionTravel + actionFight ,"",0], //p.4
								[  704,  703,41,57, 20, 42, "", ""		, 1, actionTravel + actionFight ,"",0], //p.4
								[  703,  704,11,55, 20, 42, "", ""		, 1, actionTravel + actionFight ,"",0], //p.4
								[  703,  702,56,49, 20, 42, "", ""		, 1, actionTravel + actionFight ,"",0], //p.4
								[  702,  703,59,11, 20, 42, "", ""		, 1, actionTravel + actionFight ,"",0], //p.4
								[  702,  112,24,42, 20, 42, "", ""		, 1, actionTravel + actionFight ,"",0], //p.4
								[  112,  702,57,11, 20, 42, "", ""		, 1, actionTravel + actionFight ,"",0], //p.4
								[  112,    0,57,11, 20, 42, "", ""		, 1, actionTravel + actionFight ,"",0], //p.4

								
								/*
								//ithan do orlow
								[    1,    0,21,95,203,203, "", ""		, 1, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[    8,    0,11,63,203,203, "", ""		, 1, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  116,    0,43,63,203,203, "27,13;", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  122,    0, 0,17,203,203, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  140,    0, 5, 0,50,203, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  150,    0,-1,-1,140,158, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								*/
								//mythar - pszczoly
								[  257,    0,95,26,203,203, "", ""		, 1, actionTravel + actionFight ,"",0], 
								[  246,    0,95,16,200,258, "", ""		, 1, actionTravel + actionFight ,"",0], 
								[  229,    0,63,91,203,203, "", ""		, 1, actionTravel + actionFight ,"",0], 
								//galarety
								//[  500,    0,26,95,240,258, "", ""		, 1, actionTravel + actionFight ,"",0], 
								// do wyznawcy
								[  500,    0,63,76,240,258, "", ""		, 1, actionTravel + actionFight ,"",0], 
								[  576,    0,39,52,240,258, "", ""		, 1, actionTravel + actionFight ,"",0], 
								[  701,    0, 8,16,203,203, "", ""		, 1, actionTravel + actionFight ,"",0], 
								[  1161,   0,10, 4,40,58, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[  1160,   0,-1,-1,40,58, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[  1162,   0,-1,-1,40,58, "", ""		, "1-3", actionTravel + actionFight ,"",0], 
								//galarety
								[  1163,   0,-1,-1,40,67, "", ""		, 2, actionTravel + actionFight ,"",0], 
								[  1165,   0,-1,-1,40,69, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[  1164,   0,-1,-1,40,69, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[  1268,   0,-1,-1,40,69, "", ""		, 3, actionTravel + actionFight ,"",0], 
								[  1249,   0,12,59,40,69, "", ""		, 3, actionTravel + actionFight ,"",0], 
								
								[  1251,   0,27,94,40,69, "", ""		, 3, actionTravel + actionFight ,"16,69",0], //Przerażające sypialnie  
								[  1253,1251,53, 5,40,69, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  1253,   0, 0, 7,40,69, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  1255,1253,59,26,40,69, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  1255,   0,16,34,40,69, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  1256,1255,32,10,40,69, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  1256,   0, 0,38,40,69, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  1260,1256,20, 1,40,69, "", ""		, 5, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  1260,   0,39,84,40,69, "", ""		, 5, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  1259,   0,36,49,40,69, "", ""		, 5, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								
								[  1251,   0,-1,-1,40,69, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								
								//andarum
								[   210,   0,-1,-1,40,85, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[   601,   0,91,53,40,85, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[   602,   0,-1,-1,40,90, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[   211,   0,-1,-1,40,90, "", ""		, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								//tuzmer-szkielety
								[  589,   0,48, 0,40,95, "", ""		, 2, actionTravel ,"",0], //Przerażające sypialnie  
								[ 1154,   0,78, 0,40,95, "", ""		, 2, actionTravel ,"",0], //Przerażające sypialnie  
								[ 1167,   0,63,33,80,95, "", ""		, 3, actionTravel + actionFight ,"26,47",0], //Przerażające sypialnie  
								[ 1159,   0, -1,-1,180,195, "", ""	, 3, actionTravel + actionFight ,"",0], //Przerażające sypialnie 

								[  847, 849, 9, 4,70,95, "", ""		, 4, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  847,   0, 2,42,70,95, "", ""		, 4, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  848,   0, 2, 1,70,95, "", ""		, 4, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  849,   0, 6, 5,70,95, "", ""		, 4, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								
								//korredy
								[  849,   0, 6, 5,70,95, "", ""		, 4, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[  849,   0, 6, 5,70,95, "", ""		, 4, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[ 1027,   0,31,57,70,95, "", ""		, 4, actionTravel + actionFight ,"31,20",0], //Przerażające sypialnie  
								[ 1028,   0,32,34,70,95, "", ""		, 4, actionTravel + actionFight ,"",0], //Przerażające sypialnie  

								//wyznawca
								[ 1133,   0,13, 3,90,95, "15,7;", ""		, 4, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[ 1134,   0,18,16,90,95, "", ""		, 4, actionTravel + actionFight ,"",0], //Przerażające sypialnie  
								[ 1135,   0,-1,-1,90,95, "23,26;17,8;", ""		, 4, actionTravel + actionFight ,"9,7",0], //Przerażające sypialnie  
								

								
								
								//tolloki
								[  242,   0, 4,11,68,80, "", ""		, 4, actionTravel + actionFight ,"18,22",0], //p3 
								[ 1762,   0,11, 5,68,80, "", ""		, 4, actionTravel + actionFight ,"10,15",0], //p3 
								//lesze
								[ 1323,   0,30, 3,60,224, "", ""		, 4, actionTravel + actionFight ,"",0], //p.5  
								[ 1324,1323, 6,19,60,224, "", ""		, 4, actionTravel + actionFight ,"",0], //p.5  
								[ 1324,   0,13, 1,60,224, "", ""		, 4, actionTravel + actionFight ,"",0], //p.5  
								[ 1325,   0, 8, 0,60,224, "", ""		, 4, actionTravel + actionFight ,"",0], //p.5  

								
								//orki - e2
								[  125,   0, -1, -1,146,224, "", ""		, 4, actionTravel + actionFight ,"",0], //p.5  

								//Agule
								[ 1347,   0,29,55,166,224, "37,41;44,35;46,33;51,20;38,10;38,8;30,3;28,15;29,30;21,25;28,23;35,23;", ""		, 3, actionTravel + actionFight ,"29,27",0], //p.5  
								[ 1346,1347,28,28,166,224, "29,19;", ""		, 4, actionTravel + actionFight ,"",0], //p.5  
								[ 1346,1223,26,17,166,224, "29,19;", ""		, 4, actionTravel + actionFight ,"",0], //p.5  
								[ 1223,   0,-1,-1,166,224, 	"", ""		, 4, actionTravel + actionFight ,"",0], //p.5  

								//orki - e2
								[  603,   0, -1, -1,146,224, "", ""		, 4, actionTravel + actionFight ,"",0], //p.5  

								//Goplana - e2
								[ 1151,   0, -1, -1,146,224, "", ""		, 4, actionTravel + actionFight ,"",0], //p.5  
								
								//piraci
								[ 1337,   0, 5,11,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //S.1  
								[ 1338,1337,14, 4,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //S.2  
								[ 1338,   0,26,30,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //S.2  
								[ 1339,1338,10, 4,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //S.3  
								[ 1339,1340,25,30,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //S.3  
								[ 1340,1339, 8,30,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //S.4  
								[ 1340,1341,26,30,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //S.4
								[ 1341,1340,15,29,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //P1
								[ 1341,1344,15,10,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //P1
								[ 1344,1341,13, 9,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //P
								[ 1344,1343,11, 5,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //P
								[ 1343,1344, 9,10,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //P
								[ 1343,1342, 4, 9,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //P
								[ 1342,1343,20,20,100,115, "", ""		, 3, actionTravel + actionFight ,"",0], //P2

							




      
//1924 - Dolina Chmur
//1901 - Niecka
//1926 - Altepetl Mahoptekan

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

//Dolina

[ 1924,1926, 10,63,224,246, "10,58;26,27;", ""		, 3, actionTravel + actionFight ,"8,51",0], //	Dolina z Mictlan							
[ 1924,	  0, 75,63,224,246, "60,54;",       ""		, 4, actionTravel + actionFight ,"60,33",0], //	Dolina z innych lokacji							

//Niecka

// na gore 
//[ 1901,	0,  10, 0,224,246, "", "53,4;39,60;30,47;16,32;12,10;"		, 4, actionTravel + actionFight ,"24,55",0], //								
//tylko w bok
[ 1901,	  0, 0, 51,224,246, "", "53,4;39,60;30,47;16,32;12,10;"		, 4, actionTravel + actionFight ,"",0], //								
//nie idz juz na gore
//[ 1901,1924,  0,51,224,246, "", "53,4;39,60;30,47;16,32;12,10;"		, 4, actionTravel + actionFight ,"",0], //								
//[ 1901,	  0, 10, 0,224,246, "", "53,4;39,60;30,47;16,32;12,10;"		, 4, actionTravel + actionFight ,"",0], //								

//Mictlan

//Mictlan z Doliny -> Piramida
[ 1926,1924, 44,24,224,252, "", "37,87;50,79;40,79;"		, 5, actionTravel + actionFight ,"39,67",0], //								
//Mictlan z piramidy -> Niecka
[ 1926,1960, 63,51,224,252, "", "37,87;50,79;40,79;"		, 5, actionTravel + actionFight ,"39,67",0], //	
//Mictlan z TP i z Niecki -> Dolina Chmur
[ 1926,	  0, 11, 0,224,246, "", "37,87;50,79;40,79;"		, 5, actionTravel + actionFight ,"39,67",0], //	

						
//p1
[ 1960,1926, 7, 6,224,246, "", ""		, 4, actionTravel + actionFight ,"",0], //								
[ 1960,	  0, 7,12,224,252, "", ""		, 4, actionTravel + actionFight ,"",0], //								
//p2
[ 1961,1960,11,15,224,252, "", ""		, 4, actionTravel + actionFight ,"",0], //								
[ 1961,	  0,11, 9,224,252, "", ""		, 4, actionTravel + actionFight ,"",0], //								
//p3
[ 1962,1961,11,14,224,252, "", ""		, 4, actionTravel + actionFight ,"",0], //								
[ 1962,	  0,11, 8,224,252, "", ""		, 4, actionTravel + actionFight ,"",0], //								
//p4
[ 1963,1962,16,14,224,252, "", ""		, 4, actionTravel + actionFight ,"",0], //								
[ 1963,	  0,16,16,224,252, "", ""		, 4, actionTravel + actionFight ,"",0], //								
//p5
[ 1964,1963,24,17,224,252, "", ""		, 4, actionTravel + actionFight ,"",0], //								
[ 1964,	  0,23,21,224,252, "", ""		, 4, actionTravel + actionFight ,"",0], //								
//p6
[ 1969,1964, 7,11,224,252, "", ""		, 5, actionTravel + actionFight ,"",0], //								
[ 1969,	  0, 8, 2,224,252, "", ""		, 5, actionTravel + actionFight ,"",0], //								
//p7
[ 1970,1969,15, 11,224,252, "", ""		, 5, actionTravel + actionFight ,"",0], //								
[ 1970,	  0,15, 19,224,252, "", ""		, 5, actionTravel + actionFight ,"",0], //								

//wracaj z p8
[ 1971,	  0,8, 13,224,252, "", ""		, 5, actionTravel + actionFight ,"",0], //								
//zatrzymuj na p8
//[ 1971,	  0,-1, -1,224,252, "", ""		, 5, actionTravel + actionFight ,"",0], //								






    //pajaki
    [    2,    0,   42, 0,  130,170, "", "",	                                  4, actionTravel,"",0,confMaxAutoGrpPajaki], 
    [ 1111,    2,   44, 0,  130,185, "", "",                                      4, actionTravel,"",0,confMaxAutoGrpPajaki], 
    [ 1115,    0,   46, 0,  200,285, "", "",                                      4, actionTravel,"",0,confMaxAutoGrpPajaki], 
    [ 1131,    0,   43,32,  200,220, "", "",		                              4, actionTravel + actionFight ,"",0,confMaxAutoGrpPajaki], //Pajaki  
    [ 1132,    0,   59,17,  200,220, "", "",		                              4, actionTravel + actionFight ,"",0,confMaxAutoGrpPajaki], //p.1  
    [ 1132,	   0,    7,61,  200,220, "", "",		                              4, actionTravel + actionFight ,"",0,confMaxAutoGrpPajaki], //p.1  
    [ 1136, 1132,   13,55,  200,220, "50,27;4,52;22,45;", "",                     4, actionTravel + actionFight ,"",0,confMaxAutoGrpPajaki], //p.2  
    [ 1136,    0,   53,21,  200,220, "50,27;4,52;22,45;", "",                     4, actionTravel + actionFight ,"",0,confMaxAutoGrpPajaki], //p.2  
    [ 1138, 1136,   22,20,  200,220, "24,7;", ""		,                         4, actionTravel + actionFight ,"",0,confMaxAutoGrpPajaki], //p.3
    [ 1138,    0,   61,57,  200,220, "24,7;", ""		,                         4, actionTravel + actionFight ,"",0,confMaxAutoGrpPajaki], //p.3
    [ 1140, 1138,   54,20,  200,220, "9,52;28,52;15,23;39,31;33,8;53,17;", ""	, 4, actionTravel + actionFight ,"",0,confMaxAutoGrpPajaki], //p.4
    [ 1140,    0,    3,38,  200,220, "9,52;28,52;15,23;39,31;33,8;53,17;", ""	, 4, actionTravel + actionFight ,"",0,confMaxAutoGrpPajaki], //p.4  
    [ 1142,    0,   33,46,  200,220, "", "30,27;"		,                         4, actionTravel + actionFight ,"",0,confMaxAutoGrpPajaki], //p.5  							
								
								// koniec
								[0,0,0,0,1,3,"","",0,actionFight,"",0]
							];	
	function isInBattle() {	return (unsafeWindow._g.battle != false); }
	function battleCastSpellSelf(spell) { if (isInBattle()) { unsafeWindow.__g("fight&a=spell&s="+spell+"&id="+unsafeWindow._hero.id); }}
	function battleCastSpell(spell,id) { if (isInBattle()) unsafeWindow.__g("fight&a=spell&s="+spell+"&id="+id);}
	function battleGetEnergy() {  return parseInt($('#battleenergy',window.opener.document).html()); }
	function battleGetMana() {  return parseInt($('#battlemana',window.opener.document).html()); }
	function battleBeginManual(id) { unsafeWindow.__g('fight&a=attack&id=-'+id); }
	function battleBeginAuto(id) { unsafeWindow.__g('fight&a=attack&auto=1&id=-'+id); }
	function battleEnd() { unsafeWindow.__g('fight&a=quit'); }
	function battleStrike(id) { unsafeWindow.__g('fight&a=strike&id='+id); }; // id < 0
	function battleIsMyTurn() { var czas = $('#battletimer',window.opener.document).html(); var b=false; if (czas.indexOf("pozosta")>0) b=true; trace(czas); return b; }
	function battleIsEnded() { var czas = $('#battletimer',window.opener.document).html(); var b=false; if (czas.indexOf("Walka")>=0 || czas=="") b=true; return b; }
	function battleClearTimer() { $('#battletimer',window.opener.document).html("Cios"); trace("Zmiana na cios============="+$('#battletimer',window.opener.document).html()); }	
	function battleMove() { if (isInBattle()) unsafeWindow.__g("fight&a=move"); }
	
	
	////////////////////////////////////
	//	Automatyczny wojownik 
	//  by Daniel K.
	////////////////////////////////////
	

	

	function btnAct()
	{
		if (!getAction())
		{
			actionSetFight(1);
			actionSetTravel(1);
			mActive.currentNPCCount = 0;
			$('#myButton').val("Zatrzymaj");
		}
		else
		{
			actionSetFight(0);
			actionSetTravel(0);
			doStopWalking();
			$('#myButton').val("Automat");
		}
	}


	var thereIsMonster = 0;
	function moduleActivity()
	{
	
		this.attackX = -1;
		this.attackY = -1;
		this.warIsFighting = false;
		this.group = false;
		this.fightstrongest = false;
		this.attackdelay = 0;
		this.maxAutoGroup = 1;
		this.currentNPCCount = -1;

		this.warAttackAuto = function(id) { if (!isInBattle() && !this.attackdelay) { unsafeWindow.__g('fight&a=attack&id=-'+id+'&ff=1'); this.attackdelay=12; } else {trace("Attack not possible");} }
		this.warAttack = function(id) { if (!isInBattle() && !this.attackdelay) { unsafeWindow.__g('fight&a=attack&id=-'+id); this.attackdelay=12; } else {trace("Attack not possible(attack delay==12)");}}
		this.warEndFight = function() {	if (isInBattle() && this.checkBattleEnd()) { unsafeWindow.__g('fight&a=quit');	} }

		this.checkMyTurn = function() {  var czas = $('#battletimer',window.opener.document).html(); var b=false; if (czas.indexOf("pozosta")>0) b=true; return b; }
		this.checkBattleEnd = function() {  var czas = $('#battletimer',window.opener.document).html(); var b=false; if (czas.indexOf("Walka")>=0 || czas=="") b=true; return b; }
		this.Reload = function() { window.opener.location.reload(); }
		//this.Standby = function() { unsafeWindow.frames[0].global.logoff = 3000; }
		
		this.battleEnergy = function() {  return parseInt($('#battleenergy',window.opener.document).html()); }
		this.battleMana = function() {  return parseInt($('#battlemana',window.opener.document).html()); }
		
		this.clickOk = function() {unsafeWindow.__g('fight&a=fastmode&answer=1');}
		this.clickCancel = function() {unsafeWindow.__g('fight&a=fastmode&answer=0');}
		
        this.fight_lvlod = 0;
		this.fight_lvldo = 500;
		this.fight_do = "";
		this.fight_dont = "";
		this.fight_group = 1;
		this.fight_group_od = 1;
		this.fight_group_do = 1;
		
		this.fight_done_goto_x = -1;
		this.fight_done_goto_y = -1;
		this.fight_mode = 0;
		this.fight_fightalways = 1;
		

		this.fight_checkpoints = [];
		this.fight_checkpoints_next = -1;
		


		this.currentGroup = -1;
		this.currentGroupMax = -1;
		
		this.rzucTarcze=false;
		
		this.isStandingAtLocation = function(x,y)
		{
			return (!isWalking && Math.abs(unsafeWindow._hero.x-x) < 2 && Math.abs(unsafeWindow._hero.y-y) < 2) ? true: false;
		}		
		this.isAtLocation = function(x,y)
		{
			return (Math.abs(unsafeWindow._hero.x-x) < 2 && Math.abs(unsafeWindow._hero.y-y) < 2) ? true: false;
		}		
		
		this.checkMonster = function(x,y)
		{
			var b='';
			for (var w=0 in _npc)
			{
				if (_npc[w].x == x && _npc[w].y == y)
				{
					b=_npc[w].id;
				}
 			}			
			return b;
		}	
		//  [bestID,list2[bestID].x,list2[bestID].y,bestresult,list2[bestID].type]
		this.warFightNearestFoe = function()
		{
			if (isInBattle()) return;
            var npc = unsafeWindow._g.npc;
			var hero = unsafeWindow._hero;
            var id = this.warCheckNearestFoe(hero.x,hero.y);
            // zmiana
			if (id != -1)
			{
				if (!this.warIsFighting)
				{
					trace("Atakuj cel: "+id+ ' x='+npc[id].x+' y='+npc[id].y+' best='+npc[id].distance);
					warFoeID = id;
					warFoeType = npc[id].type;
					this.attackX = npc[id].x;
					this.attackY = npc[id].y;
					this.group = unsafeWindow._g.npc[id].grp;
					this.warIsFighting = true;
					if (npc[id].distance)
					{
						trace("zc1");
                        doStopWalking("Zmiana celu");	
						generatePath=true;
						mMargo.generateWalkPath(hero.x,hero.y,npc[id].x,npc[id].y, true);
                        //trace("isWalking1="+isWalking);
						warWaitBefore = 8;
					}
					else
					{
						doStopWalking("Zmiana celu2");	
						warWaitBefore = 8;
					}
				}
				else if (warFoeID != id)
				{
					trace("Zly cel? "+id+ "  "+warFoeID);
					var stepleft = getWalkStepLeft();
					//if (stepleft>5 && (stepleft>npc[id].distance))
					if (stepleft>5 || !warFoeID)
					{
						trace("Zmiana ataku na cel: "+id);	
						warFoeID = id;
						warFoeType = npc[id].type;
						this.attackX = npc[id].x;
						this.attackY = npc[id].y;
						this.group = unsafeWindow._g.npc[id].grp;
						
						if (npc[id].distance)
						{
							doStopWalking("Zmiana celu");	
							generatePath=true;
							mMargo.generateWalkPath(hero.x,hero.y,npc[id].x,npc[id].y, true);
							
                            warWaitBefore = 8;
						}
						else
						{
							doStopWalking("Zmiana celu2");	
							warWaitBefore = 8;
						}
						
					}
				}
			} 
			else
			{
				// nie ma z kim walczyc
				if (this.warIsFighting)
				{
					doStopWalking("brak przeciwnika");	
					this.warIsFighting = false;
					warFoeID = 0;
					warFoeType = -1;
					this.attackX = -1;
					this.attackY = -1;
					trace("nie walczymy!");
				}
			}
		}
		this.doIfightFoe = function(npc)
		{
            if (unsafeWindow._map.col.charAt(npc.x+mapx*npc.y)=='1') return false;
            var bRet = 0;
			if  (npc.type==3 || npc.type==2)
			{
				var gr1 = (npc.grp>=1) ? mMargo.grp[npc.grp]: 1;
				var pos = npc.x+","+npc.y+";";
				if (this.fight_dont.length && this.fight_dont.indexOf(pos)>=0) bRet=0;
				else if (this.fight_do.length && this.fight_do.indexOf(pos)>=0) bRet=1;
				else if (npc.lvl >= this.fight_lvlod && npc.lvl <= this.fight_lvldo && this.fight_group_od<=gr1 && gr1<=this.fight_group_do) bRet = 2;
			}
            return bRet>0;
		}
		this.warCheckNearestFoe = function(hx,hy)
		{
			var bestresult = 1000;
			var bestID = -1;

            mMargo.GridGenerator(mMargo.mapArray,-1);			


			var list2 = unsafeWindow._g.npc;
			for (var w in list2)
			{
				if (this.doIfightFoe(list2[w]))
				{
					if (this.isAtLocation(list2[w].x,list2[w].y))
					{
						bestresult = 0;
						bestID = list2[w].id;
						list2[w].distance = 0;
                        break;
					}
					var kartdist = Math.abs(hx - list2[w].x) + Math.abs(hy - list2[w].y);
					//console.log("ka: "+kartdist+"  br: "+bestresult+"  pos:"+list2[w].x+","+list2[w].y);
					if (kartdist <= bestresult+5)
					{
						var result = [];
                        Grid[list2[w].x + mapx*list2[w].y] = 0;
                        result = AStar(Grid, [hx, hy], [list2[w].x,list2[w].y],"Manhattan",mapx,mapy);
						Grid[list2[w].x + mapx*list2[w].y] = 1;
						var len = result.length;
						if (len > 0 && len < bestresult)
						{
							bestresult = len;
							bestID = list2[w].id;
                            list2[w].distance = len;
						}
					}
				}	
			}

			return bestID;
		}
		
        this.autoModeUse = 10;        
		this.autoFight = function()
		{
			var reset = false;
			if (unsafeWindow._hero.nick.indexOf("antt")<0) return;

            if ($('div#autobattleButton',window.opener.document).is(":visible"))
            {
                if (--this.autoModeUse==0)
                {
                    unsafeWindow.__g('fight&a=f');
                    $('div#autobattleButton',window.opener.document).hide();
                    unsafeWindow._g.battle.nobut = true;
                    this.autoModeUse = 10;
                }
            }
            
            if (this.warIsFighting && !isWalking && !isInBattle() && warFoeID>0)
			{
				trace(44);
                if (!this.isAtLocation(this.attackX,this.attackY)) reset = true;
				else {
					warWaitBefore--;
					trace(warWaitBefore);
                    if (warWaitBefore==2)
					{
						this.warAttackAuto(warFoeID);
						warFoeID==0;
						$('#battletimer',window.opener.document).html("");
					}
                    if (warWaitBefore<-100) reset = true;
                    
				}
			}
			if (!this.warIsFighting && !isWalking && isInBattle() && !(warFoeID>0))
			{
				trace("RRR");
				//this.warDoFight(mMargo.trooplowestlvlid);
			}
			
			if ( isInBattle() && this.checkBattleEnd())
			{
				this.warEndFight();
				reset = true;
				this.attackdelay = 0;
				this.warIsFighting = false;
			}
			
			if (reset)
			{
				trace(5);
                this.warIsFighting = false;
				warFoeID = 0;
				warFoeType = -1;
				mCanvas.foeCoordInfo="";
				this.attackX = -1;
				this.attackY = -1;
			}
		}
		
		
		this.battleScenario = [
			spell_PodwojnyStrzal,
			spell_AuraSzybkosci,
			spell_AuraOchronyMagicznej,
			spell_PodwojnyStrzal,
			battle_other_strike,
			
			3 //repeat
		];
		
		this.processRound = function(action, id)
		{
			var bRet = true;
			switch(action)
			{
				case battle_other_move: battleMove(); break;
				case battle_other_strike: battleStrike(id); break;
				// self - mana
				case spell_AuraOchronyFizycznej:
				case spell_AuraOchronyMagicznej:
				case spell_AuraSzybkosci:
				case spell_LeczenieRan:
                    {
                        var cost = parseInt(unsafeWindow._g.battle.skills[action].cost);
                        bRet = (cost <= battleGetMana());
						if (bRet) 
                        {
                            if (id == 0) battleCastSpellSelf(action);
                            else         battleCastSpell(action,id);
                        }
                    }
                    break;
        
                // self energy
				case spell_BandazowanieRan:
					{
						var cost = parseInt(unsafeWindow._g.battle.skills[action].cost);
						bRet = (cost <= battleGetEnergy());
						if (bRet) battleCastSpellSelf(action);
					}				
					break;

                case spell_KulaOgnia:
                    {
                        var cost = parseInt(unsafeWindow._g.battle.skils[action].cost);
                        bRet = (cost <= battleGetMana());
                        if (bRet) battleCastSpell(action,id);
                    }
                    break;
				//attack - energy
				case spell_PodwojnyStrzal:
				case spell_AtakBlyskawiczny:
                case spell_ObrazaPrzeciwnika:
					{
						var cost = parseInt(unsafeWindow._g.battle.skills[action].cost);
						bRet = (cost <= battleGetEnergy());
						if (bRet) battleCastSpell(action,id);
					}				
					break;  
                default:
                    trace("Unlearnt skill!!!");
            }
			return bRet;
        }
		this.qFightManual_loglen = -1;
		this.qFightManual_step = -1;
		
		this.autoFightManual = function()
		{
			trace("fight manual");
            var heros = unsafeWindow._hero;
			var hx = unsafeWindow._hero.x;
			var hy = unsafeWindow._hero.y;

			if (this.warIsFighting && !isWalking && warFoeID>0 && this.attackY!=-1 && !this.isAtLocation(this.attackX,this.attackY) && isInBattle())
			{
				trace("AutoAtak");
				this.attackX = -1;
				this.attackY = -1;

				this.qFightManual_step = 0;
			}
			
			if (this.warIsFighting && !isWalking && warFoeID>0 && this.attackX!=-1 && !this.isAtLocation(this.attackX,this.attackY) && !isInBattle())
			{ //cofka
				//trace("Naprawa cofki manual");
				this.warIsFighting = false;
				this.attackX = -1;
				this.attackY = -1;
			}
			
			if (this.warIsFighting && !isWalking && warFoeID>0 && this.isAtLocation(this.attackX,this.attackY) && !isInBattle())
			{
				trace("Attack1");
				warWaitBefore--;
				if (warWaitBefore==3)
				{
					this.warAttack(warFoeID);
					$('#battletimer',window.opener.document).html("temp");
					this.attackX = -1;
					this.attackY = -1;
					this.qFightManual_step = 0;
					
				}
                if (warWaitBefore<-100)
                {
				trace(455);
                this.warIsFighting = false;
				warFoeID = 0;
				warFoeType = -1;
				mCanvas.foeCoordInfo="";
				this.attackX = -1;
				this.attackY = -1;
                }
            }
			if (this.warIsFighting && !isWalking && warFoeID>0 && this.isAtLocation(this.attackX,this.attackY) && isInBattle())
			{
				trace("Attack1b");
				warWaitBefore--;
				if (warWaitBefore==3)
				{
					this.attackX = -1;
					this.attackY = -1;
					this.qFightManual_step = 0;
				}
			}
			
			var len = $('#battlelog',window.opener.document).html().length;
			if (this.warIsFighting && this.checkMyTurn() && isInBattle() 
            && (this.qFightManual_loglen != len) 
            )
			{
				this.qFightManual_loglen = len;

                

				if (unsafeWindow._hero.nick.indexOf("antt")>0)
                {  
                }
				else if (unsafeWindow._hero.nick==char2)
                {    
                }
				else if (unsafeWindow._hero.nick==char3)
                {    
                }                
			}
			// koniec walki	
			if (isInBattle() && this.checkBattleEnd() || isInBattle() && this.checkBattleEnd())
			{
				this.warEndFight();
				this.warIsFighting = false;
				warFoeID = 0;
				mCanvas.foeCoordInfo="";
				this.qFightManual_step = 0;
	
			}
			if (!this.warIsFighting && isInBattle() && !this.checkBattleEnd())
			{
				trace("Attack3");
				this.warIsFighting = true;
				this.qFightManual_step = 0;
			}
		}
		
		this.GetActivityHtml = function ()	
		{
			var activetools =   '<table>';
			activetools+=   	'<tr><td style="padding-right:5px;" colspan=2>';
			activetools+=   	'<input type="button" id="myButton" class="button" value="Automat" style="width:70px;height:25px;" /></td><td></td></tr>';
			activetools+=   	'</table>';
			return activetools;
		}

		this.SetupActivity = function()
		{
			$('#myButton').click(function() {  btnAct()	});
			
		}

		// [0]id, [1]previd, [2]x, [3]y, [4]lvl_od, [5]lvl_do, [7]fight, [8]fightnot, [9]group, [9]mode
		this.SetupLocation = function ()
		{
            function _setup_loc(me, lvl_od,lvl_do,fight_grp,max_fight_grp) 
            {
				me.fight_lvlod = lvl_od;
				me.fight_lvldo = lvl_do;
				me.fight_do = "";
				me.fight_dont = "";
				me.fight_group = fight_grp;
				me.fight_done_goto_x = -1;
				me.fight_done_goto_y = -1;
				me.fight_mode = actionFight;
				me.maxAutoGroup = max_fight_grp;
                trace("LvlOd:"+me.fight_lvlod);
            }

            

            if (unsafeWindow._hero.nick.indexOf("antt")>0) _setup_loc(this,180,280,5,5);
            else if (unsafeWindow._hero.nick==char2) _setup_loc(this,190,260,4,1);
            else if (unsafeWindow._hero.nick==char3) _setup_loc(this,20,60,4,1);
    
			else _setup_loc(this,20,230,4,0);

            trace("LvlOd:"+this.fight_lvlod);
            
            // maddok zawsze turowo
            if (unsafeWindow._map.id==1481) this.maxAutoGroup = 1;			

			this.fight_group_od = 0;
			this.fight_group_do = this.fight_group;
			
			trace("loc ext: "+LokacjeExt.length);
			if (LokacjeExt.length > 0)
			{
				var prevMap = GM_getValue(unsafeWindow._hero.id+"_"+"margoMapPrevious", 0);
                var curMap =  unsafeWindow._map.id;
				trace("for: "+curMap+" "+prevMap);
				for (var x=0;x<LokacjeExt.length;x++)
				{
					if (LokacjeExt[x][0]==curMap && (LokacjeExt[x][1]==prevMap || LokacjeExt[x][1]==""))
					{
						this.fight_lvlod 		= LokacjeExt[x][4];
						this.fight_lvldo 		= LokacjeExt[x][5];
						this.fight_do 			= LokacjeExt[x][6];
						this.fight_dont 		= LokacjeExt[x][7];
						this.fight_group 		= LokacjeExt[x][8];
						this.fight_done_goto_x 	= LokacjeExt[x][2];
						this.fight_done_goto_y 	= LokacjeExt[x][3];
						this.fight_mode 		= LokacjeExt[x][9];
						this.fight_fightalways  = LokacjeExt[x][11];
						if (typeof(LokacjeExt[x][12]) != "undefined")
                        {
                            this.maxAutoGroup = LokacjeExt[x][12];
						}
                        if (typeof this.fight_group == "string")
						{
							var grarr=this.fight_group.split("-");
							this.fight_group_od = parseInt(grarr[0]);
							this.fight_group_do = parseInt(grarr[1]);
						}
						else
						{
							this.fight_group_do = this.fight_group;
						}
						
						if (LokacjeExt[x][10].length > 0)
						{
							this.fight_checkpoints  = LokacjeExt[x][10].split(";");
							this.fight_checkpoints_next = 0;
						}							
						else
						{
							this.fight_checkpoints = [];
							this.fight_checkpoints_next = -1;
						}
						trace("Found: "+LokacjeExt[x]);
						break;
					}
				}
			}
		
            console.log("LVLDO:"+this.fight_lvldo); 
        }

		this.NPCAtakuje = 0;
		this.doActionStuff = function ()
		{
			//trace("doActionStuff");
            if (this.walkCounter===undefined) this.walkCounter=0;
			if (this.walkx===undefined) this.walkx=-1;
			if (this.walky===undefined) this.walky=-1;
			if (this.walkNothingToDo===undefined) this.walkNothingToDo = 0;
			
			if (this.attackdelay>0) this.attackdelay--;
	
			var heros = unsafeWindow._hero;
			if (actionIsFighting())
			{
				unsafeWindow._g.away.update();	
				if ( !isInBattle() && ( warFoeID == 0 || mMargo.npccount != this.currentNPCCount )) 
				{
					trace(1111);
                    this.warFightNearestFoe();
				}
                else
                {
                   // trace(2222);
                }
				this.currentNPCCount = mMargo.npccount;
				var czyturowo = false;
				var al =  $('#alert',window.opener.document).is(':visible');
				if (al) 
				{	
					var msg = $("div.a2",window.opener.document).html();
					if (msg.indexOf("Potrzeba")>=0) { $('#alert',window.opener.document).hide(); trace(msg); }
					if (msg.indexOf("turowo?")>=0) { trace(msg);  czyturowo=true; /*$('#alert',window.opener.document).hide();*/}
					if (msg.indexOf("Kolejny podwójny")>=0) { $('#alert',window.opener.document).hide(); trace(msg); }
					if (msg.indexOf("Przeciwnik jest już martwy")>=0) { $('#alert',window.opener.document).hide(); trace(msg); warFoeID = 0;this.warIsFighting = false; }
				}
				
                if (!czyturowo && this.NPCAtakuje) this.NPCAtakuje=0;

				if (czyturowo)
				{
                    if (!isInBattle()) return;
                    if (this.NPCAtakuje) { this.NPCAtakuje--; return; }
                    this.NPCAtakuje = 10;
                    $('#alert',window.opener.document).hide(); trace(msg);  
					trace("Wielkosc grupy:"+mMargo.grp[this.group]+" NPCCount:"+mMargo.battleNPCCount);
					$('#battletimer',window.opener.document).html("Czas: 15s");
					if (mMargo.battleNPCCount > this.maxAutoGroup)
					{
						this.clickOk();
						trace("Autoatak: Walka manualna");
					}
					else
					{
						trace("Autoatak: Walka auto");					
						this.clickCancel();
					}
                    return;
				}
				else if (!this.group ||this.group && mMargo.grp[this.group]<=this.maxAutoGroup)
				{
					

                    if (this.group) trace("auto: "+mMargo.grp[this.group]);
 					if (this.group && this.currentGroup != this.group)
					{
						this.currentGroup = this.group;
						this.currentGroupMax = -1;
					}
					if (this.group && mMargo.grp[this.group]>this.currentGroupMax) this.currentGroupMax = mMargo.grp[this.group];
					if (this.group && this.currentGroup==this.group && this.currentGroupMax>this.maxAutoGroup || !this.maxAutoGroup)
					{
						trace("Manual+"+this.currentGroup+"+"+this.currentGroupMax);
						mActive.autoFightManual();
					}
					else
					{
//						trace("Auto1+"+this.currentGroup+"+"+this.currentGroupMax);
						mActive.autoFight();
					}
				}
				else
				{
					if (this.currentGroup != this.group)
					{
						this.currentGroup = this.group;
						this.currentGroupMax = -1;
					}
					if (this.group && mMargo.grp[this.group]>this.currentGroupMax) this.currentGroupMax = mMargo.grp[this.group];
					//trace("Manu");
					mActive.autoFightManual();
				}
				
				if (actionIsTraveling())
				{
					if (!mActive.warIsFighting && !isInBattle())
						this.walkNothingToDo++;
					else 
						this.walkNothingToDo=0;
				}
			}	

			if (actionIsTraveling() && (this.walkNothingToDo>2 || !actionIsFighting()) && !isWalking)
			{
				if (mActive.fight_checkpoints_next != -1)
				{
					var pos = mActive.fight_checkpoints[mActive.fight_checkpoints_next].split(',');
					var len = mActive.fight_checkpoints.length;
					if (heros.x != parseInt(pos[0]) || heros.y != parseInt(pos[1]))
					{
						trace("Do checkpint("+mActive.fight_checkpoints_next+"): "+pos[0]+" "+pos[1]);
						this.walkx = parseInt(pos[0]);
						this.walky = parseInt(pos[1]);
						mCanvas.ClickedCanvasX=this.walkx;
						mCanvas.ClickedCanvasY=this.walky;
						generatePath=true;
						this.walkNothingToDo=0;
					}
					else
					{
						mActive.fight_checkpoints_next++;					
						if (mActive.fight_checkpoints_next>=len) mActive.fight_checkpoints_next = -1;
						this.walkNothingToDo=0;
						this.walkx = -1;
						this.walky = -1;
					}
				}
				else
				if (heros.x!=this.walkx || heros.y!=this.walky)
				{
					//trace("Do przejscia: " +mActive.fight_done_goto_x+"+"+mActive.fight_done_goto_y);
					if (mActive.fight_done_goto_x!=-1 && mActive.fight_done_goto_y != -1)	
					{
						this.walkx = mActive.fight_done_goto_x;
						this.walky = mActive.fight_done_goto_y;
						mCanvas.ClickedCanvasX=mActive.fight_done_goto_x;
						mCanvas.ClickedCanvasY=mActive.fight_done_goto_y;
						generatePath=true;
						this.walkCounter = 0;
					}
				}
				else
				{
					//trace("Przejscie: tura "+this.walkCounter);
					this.walkCounter++;
					if (this.walkCounter>2)
					{					
						//storechat();
						GM_setValue(unsafeWindow._hero.id+"_"+"margoActionEnabled", true);
						unsafeWindow.__g('walk');
						this.walkx = -1;
						this.walky = -1;
					}
				}
			}
		}
	

}
var mActive = new moduleActivity();

	

	function checkHero()
	{	
		if (mMargo.nhero>0 && !heronotify)
		{
			
			var xmlhttp=new XMLHttpRequest();
			if (xmlhttp)
			{
				var params = "op=hero&nick="+mMargo.heroname+"&mapid="+unsafeWindow._map.id+"&x="+mMargo.heroposx+"&y="+mMargo.heroposy+"&world="+window.location.href.split("margo+")[0];
				trace(params);
				xmlhttp.open("POST", "http://exjs.home.pl/update2.php",true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.setRequestHeader("Content-length", params.length);
				xmlhttp.setRequestHeader("Connection", "close");
				xmlhttp.onreadystatechange=function() {
					if (xmlhttp.readyState==4) {
						trace(xmlhttp.responseText)
						trace(xmlhttp.status);
					}
				}
				xmlhttp.send(params)
			}
		

			alert("Uwaga! Heros czai sie w poblizu!");
			heronotify = true;
			
			actionSetFight(0);
			actionSetTravel(0);
			doStopWalking();
			
		}
	}

	// detecting maintenance
	var reloadgame = 0;
	// detecting game freezes
	var gamefrozen = 0;
	var previous_ev = 0;
	
	
	function saveBeforeReload()
	{
		var d = new Date();
		GM_setValue(unsafeWindow._hero.id+"_"+"margoActionEnabled", actionIsFighting());
		trace("RELOAD 2");

		mychat.Chatlog(d.toTimeString().substring(0,8)+' - reload()');
		GM_setValue(unsafeWindow._hero.id+"_"+"margoQuest", mQuest.quest_current);
        GM_setValue(unsafeWindow._hero.id+"_"+"_margoQuestStep", mQuest.quest_step);
        
		window.opener.location.reload(); 
	}
	
	var jump_done = false;
	function jumpNaKwiaty()
	{
		if (!jump_done && !isInBattle() && unsafeWindow._map.pvp == 2)
		{
			var list = unsafeWindow._g.item;
			for (var w in list)
			{
				if (list[w].cl == 16 && list[w].loc=="g" && list[w].name.indexOf("Kwieciste Przejście")>=0)
				{
					jump_done = true;
					unsafeWindow.__g("moveitem&st=1&id="+list[w].id);
					var d = new Date();
					mychat.Chatlog(d.toTimeString().substring(0,8)+'Furi -> Jump()');					
				}
			}
			
		}
	}
	
	function checkFreeze()
	{
		if (window.opener==null) return;
		if ($('#console',window.opener.document).is(':visible')) reloadgame++;
		else reloadgame=0;

		if (reloadgame==5*60*6) 
		{	
			saveBeforeReload();
		}
	
	}
	
	function checkReload()
	{
		if (window.opener==null) return;

		if ($('#console',window.opener.document).is(':visible')) reloadgame++;
		else reloadgame=0;
		if (!reloadgame && unsafeWindow._g.ev == previous_ev && unsafeWindow._g.ev != 0) gamefrozen++;
		else 
		{
			previous_ev = unsafeWindow._g.ev;
			gamefrozen = 0;
		}
		
		if (reloadgame==5*60*6 || (gamefrozen>100 && gamefrozen%500==0)) 
		{	
			saveBeforeReload();
		}
	}

function main_plugin()
{
	//setup page script
	//alert("Main plugin start BP");
    var script = document.createElement('script');    
	script.innerHTML = map_script;         
	script.setAttribute('defer', '');
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);
    $('head').append('<meta content="text/html; charset=utf-8" http-equiv="content-type">');
	document.title = "margo+(2.2)";
	//setup css
	$('head').append(margoPlusStyles);
	$('head').append(buttonStyles);
	//release memory
	margoPlusStyles = "";
	buttonStyles = "";
	winPosX = window.screenX;
	winPosY = window.screenY;	
	openerWidth = window.opener.outerWidth;
	openerHeight = window.opener.outerHeight;
	openerPosX = window.opener.screenX;
	openerPosY = window.opener.screenY;
	$("#telko",window.opener.document).css({"display":"none"});

	//setup body
	document.body.innerHTML = map_newbody;	
	document.body.style.overflow = 'hidden';
	$("body").css({"background-image":"url("+bkgrnd+")","background-repeat":"repeat"});
	$("body").css({"font-size":"0.7em","font-family":"arial","color":"#88ff00"});
	//$("body").css({"border":"2px #623112 solid"});
	setupPluginView();
	$(window).resize(function(){ 
		$('#screen').css("display") == 'block'?$('#screen').css({'width':$(window).width(),'height':$(window).height()}):""; 
		$('#opcjedialog').is(":visible")?$('#opcjedialog').css({"top":($(window).height()-$('#opcjedialog').height())/2,"left":($(window).width()-240)/2}):"";
		$('#stopka').css({"top":($(window).height()-((newvernotified)?40:20)),"width":$(window).width()} );
		$('#naglowek').css({"width":$(window).width()} );
		$('#panelboczny_a').css({"left":($(window).width()-120),"height":$(window).height()} );
		$('#userpanel').css({"top":($(window).height()-((newvernotified)?115:95)),"width":$(window).width()} );
		$('#activetools').css({"top":($(window).height()-((newvernotified)?70:50)),"width":$(window).width()} );
		

		saveWindowPosition=10;
	});
	unsafeWindow.setOpcje(Opcje);
	timerMainId = window.setInterval( timerHandle, 166); 
}


$(document).ready(main_plugin);
$(window).unload(function() {
		trace("Releasing memory.");
	
		delete mMargo;
		bkgrnd = "";
		settingsIcon = "";
		searchIcon = "";
		
		Grid = [];
		friendsList = "";
		bkgrnd = "";
		settingsIcon = "";
		searchIcon = "";
		
		// remove
		LokacjeExt = [];

		NPC_STATIC_LIST = [];
		HERO_LIST = [];
		ENEMY_LIST = [];
		delete Opcje;
		delete mychat;

		delete mCanvas;
		
		delete mActive;
		
		delete myConn;

		walkpathXY = [];
		Stack = [];

		// active
		questmap = [];
		delete mQuest;
		if (timerMainId>0) clearInterval(timerMainId);

		
	});	

//$(window).error(function(e){trace("Wystąpił nieoczekiwany błąd z dodatkiem[2]:"+e)});

} /// the end of map section sctipt

