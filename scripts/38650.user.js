// Travian Time Line Main file
var metadata = <><![CDATA[
// ==UserScript==
// @name           Travian Time Line
// @namespace      TravianTL
// @version        0.39
// @description    Adds a time line on the right of each page to show events that have happened or will happen soon. Also adds a few other minor functions. Like: custom sidebar; resources per minute; ally lines; add to the villages list; colored marketplace.
 
// @include        http://*.travian*.*/*.php*
// @exclude        http://forum.travian*.*
// @exclude        http://board.travian*.*
// @exclude        http://shop.travian*.*
// @exclude        http://help.travian*.*
// @exclude        http://*.travian*.*/manual.php*
// @exclude        http://*.travian*.*/logout.php*
 
// @copyright      2008, 2009, 2010 Bauke Conijn, Adriaan Tichler (http://github.com/bcmpinc/travian-timeline-script)
// @author         bcmpinc
// @author         arandia
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// ==/UserScript==
]]></>+"";

/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
  
// This script improves the information provided by Travian. For example: by adding
// a timeline that shows different events like completion of build tasks and the
// arrival of armies. It does this by modify the html of the page.
//
// This script is completely passive, so it does not click links automatically or
// send http requests. This means that for certain data to be collected you have to
// read your reports and watch your ally page and allies profiles.
//
// This script can be combined with other scripts:
// - If you have the 'Travian Task Queue'-script, you can click on the timeline to
// automatically enter the schedule time.
// - If you have the 'Travian Beyond'-script, additional villages will also get an
// attack and a merchant link button. (Currently you have to add these additional
// villages in the scripts source code.)
/*****************************************************************************/   


// FILE jquery-latest.js
/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function(window,undefined){var jQuery=function(selector,context){return new jQuery.fn.init(selector,context);},_jQuery=window.jQuery,_$=window.$,document=window.document,rootjQuery,quickExpr=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,isSimple=/^.[^:#\[\.,]*$/,rnotwhite=/\S/,rtrim=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,userAgent=navigator.userAgent,browserMatch,readyBound=false,readyList=[],DOMContentLoaded,toString=Object.prototype.toString,hasOwnProperty=Object.prototype.hasOwnProperty,push=Array.prototype.push,slice=Array.prototype.slice,indexOf=Array.prototype.indexOf;jQuery.fn=jQuery.prototype={init:function(selector,context){var match,elem,ret,doc;if(!selector){return this;}
if(selector.nodeType){this.context=this[0]=selector;this.length=1;return this;}
if(selector==="body"&&!context){this.context=document;this[0]=document.body;this.selector="body";this.length=1;return this;}
if(typeof selector==="string"){match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1]){doc=(context?context.ownerDocument||context:document);ret=rsingleTag.exec(selector);if(ret){if(jQuery.isPlainObject(context)){selector=[document.createElement(ret[1])];jQuery.fn.attr.call(selector,context,true);}else{selector=[doc.createElement(ret[1])];}}else{ret=buildFragment([match[1]],[doc]);selector=(ret.cacheable?ret.fragment.cloneNode(true):ret.fragment).childNodes;}
return jQuery.merge(this,selector);}else{elem=document.getElementById(match[2]);if(elem){if(elem.id!==match[2]){return rootjQuery.find(selector);}
this.length=1;this[0]=elem;}
this.context=document;this.selector=selector;return this;}}else if(!context&&/^\w+$/.test(selector)){this.selector=selector;this.context=document;selector=document.getElementsByTagName(selector);return jQuery.merge(this,selector);}else if(!context||context.jquery){return(context||rootjQuery).find(selector);}else{return jQuery(context).find(selector);}}else if(jQuery.isFunction(selector)){return rootjQuery.ready(selector);}
if(selector.selector!==undefined){this.selector=selector.selector;this.context=selector.context;}
return jQuery.makeArray(selector,this);},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length;},toArray:function(){return slice.call(this,0);},get:function(num){return num==null?this.toArray():(num<0?this.slice(num)[0]:this[num]);},pushStack:function(elems,name,selector){var ret=jQuery();if(jQuery.isArray(elems)){push.apply(ret,elems);}else{jQuery.merge(ret,elems);}
ret.prevObject=this;ret.context=this.context;if(name==="find"){ret.selector=this.selector+(this.selector?" ":"")+selector;}else if(name){ret.selector=this.selector+"."+name+"("+selector+")";}
return ret;},each:function(callback,args){return jQuery.each(this,callback,args);},ready:function(fn){jQuery.bindReady();if(jQuery.isReady){fn.call(document,jQuery);}else if(readyList){readyList.push(fn);}
return this;},eq:function(i){return i===-1?this.slice(i):this.slice(i,+i+1);},first:function(){return this.eq(0);},last:function(){return this.eq(-1);},slice:function(){return this.pushStack(slice.apply(this,arguments),"slice",slice.call(arguments).join(","));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},end:function(){return this.prevObject||jQuery(null);},push:push,sort:[].sort,splice:[].splice};jQuery.fn.init.prototype=jQuery.fn;jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options,name,src,copy;if(typeof target==="boolean"){deep=target;target=arguments[1]||{};i=2;}
if(typeof target!=="object"&&!jQuery.isFunction(target)){target={};}
if(length===i){target=this;--i;}
for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=target[name];copy=options[name];if(target===copy){continue;}
if(deep&&copy&&(jQuery.isPlainObject(copy)||jQuery.isArray(copy))){var clone=src&&(jQuery.isPlainObject(src)||jQuery.isArray(src))?src:jQuery.isArray(copy)?[]:{};target[name]=jQuery.extend(deep,clone,copy);}else if(copy!==undefined){target[name]=copy;}}}}
return target;};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep){window.jQuery=_jQuery;}
return jQuery;},isReady:false,ready:function(){if(!jQuery.isReady){if(!document.body){return setTimeout(jQuery.ready,13);}
jQuery.isReady=true;if(readyList){var fn,i=0;while((fn=readyList[i++])){fn.call(document,jQuery);}
readyList=null;}
if(jQuery.fn.triggerHandler){jQuery(document).triggerHandler("ready");}}},bindReady:function(){if(readyBound){return;}
readyBound=true;if(document.readyState==="complete"){return jQuery.ready();}
if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);window.addEventListener("load",jQuery.ready,false);}else if(document.attachEvent){document.attachEvent("onreadystatechange",DOMContentLoaded);window.attachEvent("onload",jQuery.ready);var toplevel=false;try{toplevel=window.frameElement==null;}catch(e){}
if(document.documentElement.doScroll&&toplevel){doScrollCheck();}}},isFunction:function(obj){return toString.call(obj)==="[object Function]";},isArray:function(obj){return toString.call(obj)==="[object Array]";},isPlainObject:function(obj){if(!obj||toString.call(obj)!=="[object Object]"||obj.nodeType||obj.setInterval){return false;}
if(obj.constructor&&!hasOwnProperty.call(obj,"constructor")&&!hasOwnProperty.call(obj.constructor.prototype,"isPrototypeOf")){return false;}
var key;for(key in obj){}
return key===undefined||hasOwnProperty.call(obj,key);},isEmptyObject:function(obj){for(var name in obj){return false;}
return true;},error:function(msg){throw msg;},parseJSON:function(data){if(typeof data!=="string"||!data){return null;}
data=jQuery.trim(data);if(/^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@")
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]")
.replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return window.JSON&&window.JSON.parse?window.JSON.parse(data):(new Function("return "+data))();}else{jQuery.error("Invalid JSON: "+data);}},noop:function(){},globalEval:function(data){if(data&&rnotwhite.test(data)){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.support.scriptEval){script.appendChild(document.createTextNode(data));}else{script.text=data;}
head.insertBefore(script,head.firstChild);head.removeChild(script);}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()===name.toUpperCase();},each:function(object,callback,args){var name,i=0,length=object.length,isObj=length===undefined||jQuery.isFunction(object);if(args){if(isObj){for(name in object){if(callback.apply(object[name],args)===false){break;}}}else{for(;i<length;){if(callback.apply(object[i++],args)===false){break;}}}}else{if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break;}}}else{for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}}
return object;},trim:function(text){return(text||"").replace(rtrim,"");},makeArray:function(array,results){var ret=results||[];if(array!=null){if(array.length==null||typeof array==="string"||jQuery.isFunction(array)||(typeof array!=="function"&&array.setInterval)){push.call(ret,array);}else{jQuery.merge(ret,array);}}
return ret;},inArray:function(elem,array){if(array.indexOf){return array.indexOf(elem);}
for(var i=0,length=array.length;i<length;i++){if(array[i]===elem){return i;}}
return-1;},merge:function(first,second){var i=first.length,j=0;if(typeof second.length==="number"){for(var l=second.length;j<l;j++){first[i++]=second[j];}}else{while(second[j]!==undefined){first[i++]=second[j++];}}
first.length=i;return first;},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++){if(!inv!==!callback(elems[i],i)){ret.push(elems[i]);}}
return ret;},map:function(elems,callback,arg){var ret=[],value;for(var i=0,length=elems.length;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret[ret.length]=value;}}
return ret.concat.apply([],ret);},guid:1,proxy:function(fn,proxy,thisObject){if(arguments.length===2){if(typeof proxy==="string"){thisObject=fn;fn=thisObject[proxy];proxy=undefined;}else if(proxy&&!jQuery.isFunction(proxy)){thisObject=proxy;proxy=undefined;}}
if(!proxy&&fn){proxy=function(){return fn.apply(thisObject||this,arguments);};}
if(fn){proxy.guid=fn.guid=fn.guid||proxy.guid||jQuery.guid++;}
return proxy;},uaMatch:function(ua){ua=ua.toLowerCase();var match=/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||!/compatible/.test(ua)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"};},browser:{}});browserMatch=jQuery.uaMatch(userAgent);if(browserMatch.browser){jQuery.browser[browserMatch.browser]=true;jQuery.browser.version=browserMatch.version;}
if(jQuery.browser.webkit){jQuery.browser.safari=true;}
if(indexOf){jQuery.inArray=function(elem,array){return indexOf.call(array,elem);};}
rootjQuery=jQuery(document);if(document.addEventListener){DOMContentLoaded=function(){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);jQuery.ready();};}else if(document.attachEvent){DOMContentLoaded=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);jQuery.ready();}};}
function doScrollCheck(){if(jQuery.isReady){return;}
try{document.documentElement.doScroll("left");}catch(error){setTimeout(doScrollCheck,1);return;}
jQuery.ready();}
function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"});}else{jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");}
if(elem.parentNode){elem.parentNode.removeChild(elem);}}
function access(elems,key,value,exec,fn,pass){var length=elems.length;if(typeof key==="object"){for(var k in key){access(elems,k,key[k],exec,fn,value);}
return elems;}
if(value!==undefined){exec=!pass&&exec&&jQuery.isFunction(value);for(var i=0;i<length;i++){fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass);}
return elems;}
return length?fn(elems[0],key):undefined;}
function now(){return(new Date).getTime();}
(function(){jQuery.support={};var root=document.documentElement,script=document.createElement("script"),div=document.createElement("div"),id="script"+now();div.style.display="none";div.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var all=div.getElementsByTagName("*"),a=div.getElementsByTagName("a")[0];if(!all||!all.length||!a){return;}
jQuery.support={leadingWhitespace:div.firstChild.nodeType===3,tbody:!div.getElementsByTagName("tbody").length,htmlSerialize:!!div.getElementsByTagName("link").length,style:/red/.test(a.getAttribute("style")),hrefNormalized:a.getAttribute("href")==="/a",opacity:/^0.55$/.test(a.style.opacity),cssFloat:!!a.style.cssFloat,checkOn:div.getElementsByTagName("input")[0].value==="on",optSelected:document.createElement("select").appendChild(document.createElement("option")).selected,parentNode:div.removeChild(div.appendChild(document.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};script.type="text/javascript";try{script.appendChild(document.createTextNode("window."+id+"=1;"));}catch(e){}
root.insertBefore(script,root.firstChild);if(window[id]){jQuery.support.scriptEval=true;delete window[id];}
try{delete script.test;}catch(e){jQuery.support.deleteExpando=false;}
root.removeChild(script);if(div.attachEvent&&div.fireEvent){div.attachEvent("onclick",function click(){jQuery.support.noCloneEvent=false;div.detachEvent("onclick",click);});div.cloneNode(true).fireEvent("onclick");}
div=document.createElement("div");div.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";var fragment=document.createDocumentFragment();fragment.appendChild(div.firstChild);jQuery.support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;jQuery(function(){var div=document.createElement("div");div.style.width=div.style.paddingLeft="1px";document.body.appendChild(div);jQuery.boxModel=jQuery.support.boxModel=div.offsetWidth===2;document.body.removeChild(div).style.display='none';div=null;});jQuery.support.submitBubbles=true;jQuery.support.changeBubbles=true;root=script=div=all=a=null;})();jQuery.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var expando="jQuery"+now(),uuid=0,windowData={};jQuery.extend({cache:{},expando:expando,noData:{"embed":true,"object":true,"applet":true},data:function(elem,name,data){if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){return;}
elem=elem==window?windowData:elem;var id=elem[expando],cache=jQuery.cache,thisCache;if(!id&&typeof name==="string"&&data===undefined){return null;}
if(!id){id=++uuid;}
if(typeof name==="object"){elem[expando]=id;thisCache=cache[id]=jQuery.extend(true,{},name);}else if(!cache[id]){elem[expando]=id;cache[id]={};}
thisCache=cache[id];if(data!==undefined){thisCache[name]=data;}
return typeof name==="string"?thisCache[name]:thisCache;},removeData:function(elem,name){if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){return;}
elem=elem==window?windowData:elem;var id=elem[expando],cache=jQuery.cache,thisCache=cache[id];if(name){if(thisCache){delete thisCache[name];if(jQuery.isEmptyObject(thisCache)){jQuery.removeData(elem);}}}else{if(jQuery.support.deleteExpando){delete elem[jQuery.expando];}else if(elem.removeAttribute){elem.removeAttribute(jQuery.expando);}
delete cache[id];}}});jQuery.fn.extend({data:function(key,value){if(typeof key==="undefined"&&this.length){return jQuery.data(this[0]);}else if(typeof key==="object"){return this.each(function(){jQuery.data(this,key);});}
var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length){data=jQuery.data(this[0],key);}
return data===undefined&&parts[1]?this.data(parts[0]):data;}else{return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value);});}},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});}});jQuery.extend({queue:function(elem,type,data){if(!elem){return;}
type=(type||"fx")+"queue";var q=jQuery.data(elem,type);if(!data){return q||[];}
if(!q||jQuery.isArray(data)){q=jQuery.data(elem,type,jQuery.makeArray(data));}else{q.push(data);}
return q;},dequeue:function(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),fn=queue.shift();if(fn==="inprogress"){fn=queue.shift();}
if(fn){if(type==="fx"){queue.unshift("inprogress");}
fn.call(elem,function(){jQuery.dequeue(elem,type);});}}});jQuery.fn.extend({queue:function(type,data){if(typeof type!=="string"){data=type;type="fx";}
if(data===undefined){return jQuery.queue(this[0],type);}
return this.each(function(i,elem){var queue=jQuery.queue(this,type,data);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type);});},delay:function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(){var elem=this;setTimeout(function(){jQuery.dequeue(elem,type);},time);});},clearQueue:function(type){return this.queue(type||"fx",[]);}});var rclass=/[\n\t]/g,rspace=/\s+/,rreturn=/\r/g,rspecialurl=/href|src|style/,rtype=/(button|input)/i,rfocusable=/(button|input|object|select|textarea)/i,rclickable=/^(a|area)$/i,rradiocheck=/radio|checkbox/;jQuery.fn.extend({attr:function(name,value){return access(this,name,value,true,jQuery.attr);},removeAttr:function(name,fn){return this.each(function(){jQuery.attr(this,name,"");if(this.nodeType===1){this.removeAttribute(name);}});},addClass:function(value){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);self.addClass(value.call(this,i,self.attr("class")));});}
if(value&&typeof value==="string"){var classNames=(value||"").split(rspace);for(var i=0,l=this.length;i<l;i++){var elem=this[i];if(elem.nodeType===1){if(!elem.className){elem.className=value;}else{var className=" "+elem.className+" ",setClass=elem.className;for(var c=0,cl=classNames.length;c<cl;c++){if(className.indexOf(" "+classNames[c]+" ")<0){setClass+=" "+classNames[c];}}
elem.className=jQuery.trim(setClass);}}}}
return this;},removeClass:function(value){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);self.removeClass(value.call(this,i,self.attr("class")));});}
if((value&&typeof value==="string")||value===undefined){var classNames=(value||"").split(rspace);for(var i=0,l=this.length;i<l;i++){var elem=this[i];if(elem.nodeType===1&&elem.className){if(value){var className=(" "+elem.className+" ").replace(rclass," ");for(var c=0,cl=classNames.length;c<cl;c++){className=className.replace(" "+classNames[c]+" "," ");}
elem.className=jQuery.trim(className);}else{elem.className="";}}}}
return this;},toggleClass:function(value,stateVal){var type=typeof value,isBool=typeof stateVal==="boolean";if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);self.toggleClass(value.call(this,i,self.attr("class"),stateVal),stateVal);});}
return this.each(function(){if(type==="string"){var className,i=0,self=jQuery(this),state=stateVal,classNames=value.split(rspace);while((className=classNames[i++])){state=isBool?state:!self.hasClass(className);self[state?"addClass":"removeClass"](className);}}else if(type==="undefined"||type==="boolean"){if(this.className){jQuery.data(this,"__className__",this.className);}
this.className=this.className||value===false?"":jQuery.data(this,"__className__")||"";}});},hasClass:function(selector){var className=" "+selector+" ";for(var i=0,l=this.length;i<l;i++){if((" "+this[i].className+" ").replace(rclass," ").indexOf(className)>-1){return true;}}
return false;},val:function(value){if(value===undefined){var elem=this[0];if(elem){if(jQuery.nodeName(elem,"option")){return(elem.attributes.value||{}).specified?elem.value:elem.text;}
if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type==="select-one";if(index<0){return null;}
for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery(option).val();if(one){return value;}
values.push(value);}}
return values;}
if(rradiocheck.test(elem.type)&&!jQuery.support.checkOn){return elem.getAttribute("value")===null?"on":elem.value;}
return(elem.value||"").replace(rreturn,"");}
return undefined;}
var isFunction=jQuery.isFunction(value);return this.each(function(i){var self=jQuery(this),val=value;if(this.nodeType!==1){return;}
if(isFunction){val=value.call(this,i,self.val());}
if(typeof val==="number"){val+="";}
if(jQuery.isArray(val)&&rradiocheck.test(this.type)){this.checked=jQuery.inArray(self.val(),val)>=0;}else if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(val);jQuery("option",this).each(function(){this.selected=jQuery.inArray(jQuery(this).val(),values)>=0;});if(!values.length){this.selectedIndex=-1;}}else{this.value=val;}});}});jQuery.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(elem,name,value,pass){if(!elem||elem.nodeType===3||elem.nodeType===8){return undefined;}
if(pass&&name in jQuery.attrFn){return jQuery(elem)[name](value);}
var notxml=elem.nodeType!==1||!jQuery.isXMLDoc(elem),set=value!==undefined;name=notxml&&jQuery.props[name]||name;if(elem.nodeType===1){var special=rspecialurl.test(name);if(name==="selected"&&!jQuery.support.optSelected){var parent=elem.parentNode;if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex;}}}
if(name in elem&&notxml&&!special){if(set){if(name==="type"&&rtype.test(elem.nodeName)&&elem.parentNode){jQuery.error("type property can't be changed");}
elem[name]=value;}
if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name)){return elem.getAttributeNode(name).nodeValue;}
if(name==="tabIndex"){var attributeNode=elem.getAttributeNode("tabIndex");return attributeNode&&attributeNode.specified?attributeNode.value:rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:undefined;}
return elem[name];}
if(!jQuery.support.style&&notxml&&name==="style"){if(set){elem.style.cssText=""+value;}
return elem.style.cssText;}
if(set){elem.setAttribute(name,""+value);}
var attr=!jQuery.support.hrefNormalized&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);return attr===null?undefined:attr;}
return jQuery.style(elem,name,value);}});var rnamespaces=/\.(.*)$/,fcleanup=function(nm){return nm.replace(/[^\w\s\.\|`]/g,function(ch){return"\\"+ch;});};jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType===3||elem.nodeType===8){return;}
if(elem.setInterval&&(elem!==window&&!elem.frameElement)){elem=window;}
var handleObjIn,handleObj;if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;}
if(!handler.guid){handler.guid=jQuery.guid++;}
var elemData=jQuery.data(elem);if(!elemData){return;}
var events=elemData.events=elemData.events||{},eventHandle=elemData.handle,eventHandle;if(!eventHandle){elemData.handle=eventHandle=function(){return typeof jQuery!=="undefined"&&!jQuery.event.triggered?jQuery.event.handle.apply(eventHandle.elem,arguments):undefined;};}
eventHandle.elem=elem;types=types.split(" ");var type,i=0,namespaces;while((type=types[i++])){handleObj=handleObjIn?jQuery.extend({},handleObjIn):{handler:handler,data:data};if(type.indexOf(".")>-1){namespaces=type.split(".");type=namespaces.shift();handleObj.namespace=namespaces.slice(0).sort().join(".");}else{namespaces=[];handleObj.namespace="";}
handleObj.type=type;handleObj.guid=handler.guid;var handlers=events[type],special=jQuery.event.special[type]||{};if(!handlers){handlers=events[type]=[];if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false);}else if(elem.attachEvent){elem.attachEvent("on"+type,eventHandle);}}}
if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}}
handlers.push(handleObj);jQuery.event.global[type]=true;}
elem=null;},global:{},remove:function(elem,types,handler,pos){if(elem.nodeType===3||elem.nodeType===8){return;}
var ret,type,fn,i=0,all,namespaces,namespace,special,eventType,handleObj,origType,elemData=jQuery.data(elem),events=elemData&&elemData.events;if(!elemData||!events){return;}
if(types&&types.type){handler=types.handler;types=types.type;}
if(!types||typeof types==="string"&&types.charAt(0)==="."){types=types||"";for(type in events){jQuery.event.remove(elem,type+types);}
return;}
types=types.split(" ");while((type=types[i++])){origType=type;handleObj=null;all=type.indexOf(".")<0;namespaces=[];if(!all){namespaces=type.split(".");type=namespaces.shift();namespace=new RegExp("(^|\\.)"+
jQuery.map(namespaces.slice(0).sort(),fcleanup).join("\\.(?:.*\\.)?")+"(\\.|$)")}
eventType=events[type];if(!eventType){continue;}
if(!handler){for(var j=0;j<eventType.length;j++){handleObj=eventType[j];if(all||namespace.test(handleObj.namespace)){jQuery.event.remove(elem,origType,handleObj.handler,j);eventType.splice(j--,1);}}
continue;}
special=jQuery.event.special[type]||{};for(var j=pos||0;j<eventType.length;j++){handleObj=eventType[j];if(handler.guid===handleObj.guid){if(all||namespace.test(handleObj.namespace)){if(pos==null){eventType.splice(j--,1);}
if(special.remove){special.remove.call(elem,handleObj);}}
if(pos!=null){break;}}}
if(eventType.length===0||pos!=null&&eventType.length===1){if(!special.teardown||special.teardown.call(elem,namespaces)===false){removeEvent(elem,type,elemData.handle);}
ret=null;delete events[type];}}
if(jQuery.isEmptyObject(events)){var handle=elemData.handle;if(handle){handle.elem=null;}
delete elemData.events;delete elemData.handle;if(jQuery.isEmptyObject(elemData)){jQuery.removeData(elem);}}},trigger:function(event,data,elem){var type=event.type||event,bubbling=arguments[3];if(!bubbling){event=typeof event==="object"?event[expando]?event:jQuery.extend(jQuery.Event(type),event):jQuery.Event(type);if(type.indexOf("!")>=0){event.type=type=type.slice(0,-1);event.exclusive=true;}
if(!elem){event.stopPropagation();if(jQuery.event.global[type]){jQuery.each(jQuery.cache,function(){if(this.events&&this.events[type]){jQuery.event.trigger(event,data,this.handle.elem);}});}}
if(!elem||elem.nodeType===3||elem.nodeType===8){return undefined;}
event.result=undefined;event.target=elem;data=jQuery.makeArray(data);data.unshift(event);}
event.currentTarget=elem;var handle=jQuery.data(elem,"handle");if(handle){handle.apply(elem,data);}
var parent=elem.parentNode||elem.ownerDocument;try{if(!(elem&&elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()])){if(elem["on"+type]&&elem["on"+type].apply(elem,data)===false){event.result=false;}}}catch(e){}
if(!event.isPropagationStopped()&&parent){jQuery.event.trigger(event,data,parent,true);}else if(!event.isDefaultPrevented()){var target=event.target,old,isClick=jQuery.nodeName(target,"a")&&type==="click",special=jQuery.event.special[type]||{};if((!special._default||special._default.call(elem,event)===false)&&!isClick&&!(target&&target.nodeName&&jQuery.noData[target.nodeName.toLowerCase()])){try{if(target[type]){old=target["on"+type];if(old){target["on"+type]=null;}
jQuery.event.triggered=true;target[type]();}}catch(e){}
if(old){target["on"+type]=old;}
jQuery.event.triggered=false;}}},handle:function(event){var all,handlers,namespaces,namespace,events;event=arguments[0]=jQuery.event.fix(event||window.event);event.currentTarget=this;all=event.type.indexOf(".")<0&&!event.exclusive;if(!all){namespaces=event.type.split(".");event.type=namespaces.shift();namespace=new RegExp("(^|\\.)"+namespaces.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)");}
var events=jQuery.data(this,"events"),handlers=events[event.type];if(events&&handlers){handlers=handlers.slice(0);for(var j=0,l=handlers.length;j<l;j++){var handleObj=handlers[j];if(all||namespace.test(handleObj.namespace)){event.handler=handleObj.handler;event.data=handleObj.data;event.handleObj=handleObj;var ret=handleObj.handler.apply(this,arguments);if(ret!==undefined){event.result=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}
if(event.isImmediatePropagationStopped()){break;}}}}
return event.result;},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(event){if(event[expando]){return event;}
var originalEvent=event;event=jQuery.Event(originalEvent);for(var i=this.props.length,prop;i;){prop=this.props[--i];event[prop]=originalEvent[prop];}
if(!event.target){event.target=event.srcElement||document;}
if(event.target.nodeType===3){event.target=event.target.parentNode;}
if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement===event.target?event.toElement:event.fromElement;}
if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0);}
if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode)){event.which=event.charCode||event.keyCode;}
if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey;}
if(!event.which&&event.button!==undefined){event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));}
return event;},guid:1E8,proxy:jQuery.proxy,special:{ready:{setup:jQuery.bindReady,teardown:jQuery.noop},live:{add:function(handleObj){jQuery.event.add(this,handleObj.origType,jQuery.extend({},handleObj,{handler:liveHandler}));},remove:function(handleObj){var remove=true,type=handleObj.origType.replace(rnamespaces,"");jQuery.each(jQuery.data(this,"events").live||[],function(){if(type===this.origType.replace(rnamespaces,"")){remove=false;return false;}});if(remove){jQuery.event.remove(this,handleObj.origType,liveHandler);}}},beforeunload:{setup:function(data,namespaces,eventHandle){if(this.setInterval){this.onbeforeunload=eventHandle;}
return false;},teardown:function(namespaces,eventHandle){if(this.onbeforeunload===eventHandle){this.onbeforeunload=null;}}}}};var removeEvent=document.removeEventListener?function(elem,type,handle){elem.removeEventListener(type,handle,false);}:function(elem,type,handle){elem.detachEvent("on"+type,handle);};jQuery.Event=function(src){if(!this.preventDefault){return new jQuery.Event(src);}
if(src&&src.type){this.originalEvent=src;this.type=src.type;}else{this.type=src;}
this.timeStamp=now();this[expando]=true;};function returnFalse(){return false;}
function returnTrue(){return true;}
jQuery.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;var e=this.originalEvent;if(!e){return;}
if(e.preventDefault){e.preventDefault();}
e.returnValue=false;},stopPropagation:function(){this.isPropagationStopped=returnTrue;var e=this.originalEvent;if(!e){return;}
if(e.stopPropagation){e.stopPropagation();}
e.cancelBubble=true;},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;this.stopPropagation();},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};var withinElement=function(event){var parent=event.relatedTarget;try{while(parent&&parent!==this){parent=parent.parentNode;}
if(parent!==this){event.type=event.data;jQuery.event.handle.apply(this,arguments);}}catch(e){}},delegate=function(event){event.type=event.data;jQuery.event.handle.apply(this,arguments);};jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(orig,fix){jQuery.event.special[orig]={setup:function(data){jQuery.event.add(this,fix,data&&data.selector?delegate:withinElement,orig);},teardown:function(data){jQuery.event.remove(this,fix,data&&data.selector?delegate:withinElement);}};});if(!jQuery.support.submitBubbles){jQuery.event.special.submit={setup:function(data,namespaces){if(this.nodeName.toLowerCase()!=="form"){jQuery.event.add(this,"click.specialSubmit",function(e){var elem=e.target,type=elem.type;if((type==="submit"||type==="image")&&jQuery(elem).closest("form").length){return trigger("submit",this,arguments);}});jQuery.event.add(this,"keypress.specialSubmit",function(e){var elem=e.target,type=elem.type;if((type==="text"||type==="password")&&jQuery(elem).closest("form").length&&e.keyCode===13){return trigger("submit",this,arguments);}});}else{return false;}},teardown:function(namespaces){jQuery.event.remove(this,".specialSubmit");}};}
if(!jQuery.support.changeBubbles){var formElems=/textarea|input|select/i,changeFilters,getVal=function(elem){var type=elem.type,val=elem.value;if(type==="radio"||type==="checkbox"){val=elem.checked;}else if(type==="select-multiple"){val=elem.selectedIndex>-1?jQuery.map(elem.options,function(elem){return elem.selected;}).join("-"):"";}else if(elem.nodeName.toLowerCase()==="select"){val=elem.selectedIndex;}
return val;},testChange=function testChange(e){var elem=e.target,data,val;if(!formElems.test(elem.nodeName)||elem.readOnly){return;}
data=jQuery.data(elem,"_change_data");val=getVal(elem);if(e.type!=="focusout"||elem.type!=="radio"){jQuery.data(elem,"_change_data",val);}
if(data===undefined||val===data){return;}
if(data!=null||val){e.type="change";return jQuery.event.trigger(e,arguments[1],elem);}};jQuery.event.special.change={filters:{focusout:testChange,click:function(e){var elem=e.target,type=elem.type;if(type==="radio"||type==="checkbox"||elem.nodeName.toLowerCase()==="select"){return testChange.call(this,e);}},keydown:function(e){var elem=e.target,type=elem.type;if((e.keyCode===13&&elem.nodeName.toLowerCase()!=="textarea")||(e.keyCode===32&&(type==="checkbox"||type==="radio"))||type==="select-multiple"){return testChange.call(this,e);}},beforeactivate:function(e){var elem=e.target;jQuery.data(elem,"_change_data",getVal(elem));}},setup:function(data,namespaces){if(this.type==="file"){return false;}
for(var type in changeFilters){jQuery.event.add(this,type+".specialChange",changeFilters[type]);}
return formElems.test(this.nodeName);},teardown:function(namespaces){jQuery.event.remove(this,".specialChange");return formElems.test(this.nodeName);}};changeFilters=jQuery.event.special.change.filters;}
function trigger(type,elem,args){args[0].type=type;return jQuery.event.handle.apply(elem,args);}
if(document.addEventListener){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){jQuery.event.special[fix]={setup:function(){this.addEventListener(orig,handler,true);},teardown:function(){this.removeEventListener(orig,handler,true);}};function handler(e){e=jQuery.event.fix(e);e.type=fix;return jQuery.event.handle.call(this,e);}});}
jQuery.each(["bind","one"],function(i,name){jQuery.fn[name]=function(type,data,fn){if(typeof type==="object"){for(var key in type){this[name](key,data,type[key],fn);}
return this;}
if(jQuery.isFunction(data)){fn=data;data=undefined;}
var handler=name==="one"?jQuery.proxy(fn,function(event){jQuery(this).unbind(event,handler);return fn.apply(this,arguments);}):fn;if(type==="unload"&&name!=="one"){this.one(type,data,fn);}else{for(var i=0,l=this.length;i<l;i++){jQuery.event.add(this[i],type,handler,data);}}
return this;};});jQuery.fn.extend({unbind:function(type,fn){if(typeof type==="object"&&!type.preventDefault){for(var key in type){this.unbind(key,type[key]);}}else{for(var i=0,l=this.length;i<l;i++){jQuery.event.remove(this[i],type,fn);}}
return this;},delegate:function(selector,types,data,fn){return this.live(types,data,fn,selector);},undelegate:function(selector,types,fn){if(arguments.length===0){return this.unbind("live");}else{return this.die(types,null,fn,selector);}},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function(type,data){if(this[0]){var event=jQuery.Event(type);event.preventDefault();event.stopPropagation();jQuery.event.trigger(event,data,this[0]);return event.result;}},toggle:function(fn){var args=arguments,i=1;while(i<args.length){jQuery.proxy(fn,args[i++]);}
return this.click(jQuery.proxy(fn,function(event){var lastToggle=(jQuery.data(this,"lastToggle"+fn.guid)||0)%i;jQuery.data(this,"lastToggle"+fn.guid,lastToggle+1);event.preventDefault();return args[lastToggle].apply(this,arguments)||false;}));},hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);}});var liveMap={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};jQuery.each(["live","die"],function(i,name){jQuery.fn[name]=function(types,data,fn,origSelector){var type,i=0,match,namespaces,preType,selector=origSelector||this.selector,context=origSelector?this:jQuery(this.context);if(jQuery.isFunction(data)){fn=data;data=undefined;}
types=(types||"").split(" ");while((type=types[i++])!=null){match=rnamespaces.exec(type);namespaces="";if(match){namespaces=match[0];type=type.replace(rnamespaces,"");}
if(type==="hover"){types.push("mouseenter"+namespaces,"mouseleave"+namespaces);continue;}
preType=type;if(type==="focus"||type==="blur"){types.push(liveMap[type]+namespaces);type=type+namespaces;}else{type=(liveMap[type]||type)+namespaces;}
if(name==="live"){context.each(function(){jQuery.event.add(this,liveConvert(type,selector),{data:data,selector:selector,handler:fn,origType:type,origHandler:fn,preType:preType});});}else{context.unbind(liveConvert(type,selector),fn);}}
return this;}});function liveHandler(event){var stop,elems=[],selectors=[],args=arguments,related,match,handleObj,elem,j,i,l,data,events=jQuery.data(this,"events");if(event.liveFired===this||!events||!events.live||event.button&&event.type==="click"){return;}
event.liveFired=this;var live=events.live.slice(0);for(j=0;j<live.length;j++){handleObj=live[j];if(handleObj.origType.replace(rnamespaces,"")===event.type){selectors.push(handleObj.selector);}else{live.splice(j--,1);}}
match=jQuery(event.target).closest(selectors,event.currentTarget);for(i=0,l=match.length;i<l;i++){for(j=0;j<live.length;j++){handleObj=live[j];if(match[i].selector===handleObj.selector){elem=match[i].elem;related=null;if(handleObj.preType==="mouseenter"||handleObj.preType==="mouseleave"){related=jQuery(event.relatedTarget).closest(handleObj.selector)[0];}
if(!related||related!==elem){elems.push({elem:elem,handleObj:handleObj});}}}}
for(i=0,l=elems.length;i<l;i++){match=elems[i];event.currentTarget=match.elem;event.data=match.handleObj.data;event.handleObj=match.handleObj;if(match.handleObj.origHandler.apply(match.elem,args)===false){stop=false;break;}}
return stop;}
function liveConvert(type,selector){return"live."+(type&&type!=="*"?type+".":"")+selector.replace(/\./g,"`").replace(/ /g,"&");}
jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick "+
"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+
"change select submit keydown keypress keyup error").split(" "),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};if(jQuery.attrFn){jQuery.attrFn[name]=true;}});if(window.attachEvent&&!window.addEventListener){window.attachEvent("onunload",function(){for(var id in jQuery.cache){if(jQuery.cache[id].handle){try{jQuery.event.remove(jQuery.cache[id].handle.elem);}catch(e){}}}});}
/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;[0,0].sort(function(){baseHasDuplicate=false;return 0;});var Sizzle=function(selector,context,results,seed){results=results||[];var origContext=context=context||document;if(context.nodeType!==1&&context.nodeType!==9){return[];}
if(!selector||typeof selector!=="string"){return results;}
var parts=[],m,set,checkSet,extra,prune=true,contextXML=isXML(context),soFar=selector;while((chunker.exec(""),m=chunker.exec(soFar))!==null){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break;}}
if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context);}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector]){selector+=parts.shift();}
set=posProcess(selector,set);}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){var ret=Sizzle.find(parts.shift(),context,contextXML);context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0];}
if(context){var ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set);}else{prune=false;}
while(parts.length){var cur=parts.pop(),pop=cur;if(!Expr.relative[cur]){cur="";}else{pop=parts.pop();}
if(pop==null){pop=context;}
Expr.relative[cur](checkSet,pop,contextXML);}}else{checkSet=parts=[];}}
if(!checkSet){checkSet=set;}
if(!checkSet){Sizzle.error(cur||selector);}
if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet);}else if(context&&context.nodeType===1){for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){results.push(set[i]);}}}else{for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);}}}}else{makeArray(checkSet,results);}
if(extra){Sizzle(extra,origContext,results,seed);Sizzle.uniqueSort(results);}
return results;};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1);}}}}
return results;};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set);};Sizzle.find=function(expr,context,isXML){var set,match;if(!expr){return[];}
for(var i=0,l=Expr.order.length;i<l;i++){var type=Expr.order[i],match;if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");break;}}}}
if(!set){set=context.getElementsByTagName("*");}
return{set:set,expr:expr};};Sizzle.filter=function(expr,set,inplace,not){var old=expr,result=[],curLoop=set,match,anyFound,isXMLFilter=set&&set[0]&&isXML(set[0]);while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.leftMatch[type].exec(expr))!=null&&match[2]){var filter=Expr.filter[type],found,item,left=match[1];anyFound=false;match.splice(1,1);if(left.substr(left.length-1)==="\\"){continue;}
if(curLoop===result){result=[];}
if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);if(!match){anyFound=found=true;}else if(match===true){continue;}}
if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);var pass=not^ !!found;if(inplace&&found!=null){if(pass){anyFound=true;}else{curLoop[i]=false;}}else if(pass){result.push(item);anyFound=true;}}}}
if(found!==undefined){if(!inplace){curLoop=result;}
expr=expr.replace(Expr.match[type],"");if(!anyFound){return[];}
break;}}}
if(expr===old){if(anyFound==null){Sizzle.error(expr);}else{break;}}
old=expr;}
return curLoop;};Sizzle.error=function(msg){throw"Syntax error, unrecognized expression: "+msg;};var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href");}},relative:{"+":function(checkSet,part){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;if(isTag){part=part.toLowerCase();}
for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}
checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?elem||false:elem===part;}}
if(isPartStrNotTag){Sizzle.filter(part,checkSet,true);}},">":function(checkSet,part){var isPartStr=typeof part==="string";if(isPartStr&&!/\W/.test(part)){part=part.toLowerCase();for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName.toLowerCase()===part?parent:false;}}}else{for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part;}}
if(isPartStr){Sizzle.filter(part,checkSet,true);}}},"":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=part.toLowerCase();checkFn=dirNodeCheck;}
checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);},"~":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=part.toLowerCase();checkFn=dirNodeCheck;}
checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?[m]:[];}},NAME:function(match,context){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i]);}}
return ret.length===0?null:ret;}},TAG:function(match,context){return context.getElementsByTagName(match[1]);}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";if(isXML){return match;}
for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^ (elem.className&&(" "+elem.className+" ").replace(/[\t\n]/g," ").indexOf(match)>=0)){if(!inplace){result.push(elem);}}else if(inplace){curLoop[i]=false;}}}
return false;},ID:function(match){return match[1].replace(/\\/g,"");},TAG:function(match,curLoop){return match[1].toLowerCase();},CHILD:function(match){if(match[1]==="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0;}
match[0]=done++;return match;},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];}
if(match[2]==="~="){match[4]=" "+match[4]+" ";}
return match;},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop);}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^ not);if(!inplace){result.push.apply(result,ret);}
return false;}}else if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true;}
return match;},POS:function(match){match.unshift(true);return match;}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden";},disabled:function(elem){return elem.disabled===true;},checked:function(elem){return elem.checked===true;},selected:function(elem){elem.parentNode.selectedIndex;return elem.selected===true;},parent:function(elem){return!!elem.firstChild;},empty:function(elem){return!elem.firstChild;},has:function(elem,i,match){return!!Sizzle(match[3],elem).length;},header:function(elem){return/h\d/i.test(elem.nodeName);},text:function(elem){return"text"===elem.type;},radio:function(elem){return"radio"===elem.type;},checkbox:function(elem){return"checkbox"===elem.type;},file:function(elem){return"file"===elem.type;},password:function(elem){return"password"===elem.type;},submit:function(elem){return"submit"===elem.type;},image:function(elem){return"image"===elem.type;},reset:function(elem){return"reset"===elem.type;},button:function(elem){return"button"===elem.type||elem.nodeName.toLowerCase()==="button";},input:function(elem){return/input|select|textarea|button/i.test(elem.nodeName);}},setFilters:{first:function(elem,i){return i===0;},last:function(elem,i,match,array){return i===array.length-1;},even:function(elem,i){return i%2===0;},odd:function(elem,i){return i%2===1;},lt:function(elem,i,match){return i<match[3]-0;},gt:function(elem,i,match){return i>match[3]-0;},nth:function(elem,i,match){return match[3]-0===i;},eq:function(elem,i,match){return match[3]-0===i;}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];if(filter){return filter(elem,i,match,array);}else if(name==="contains"){return(elem.textContent||elem.innerText||getText([elem])||"").indexOf(match[3])>=0;}else if(name==="not"){var not=match[3];for(var i=0,l=not.length;i<l;i++){if(not[i]===elem){return false;}}
return true;}else{Sizzle.error("Syntax error, unrecognized expression: "+name);}},CHILD:function(elem,match){var type=match[1],node=elem;switch(type){case'only':case'first':while((node=node.previousSibling)){if(node.nodeType===1){return false;}}
if(type==="first"){return true;}
node=elem;case'last':while((node=node.nextSibling)){if(node.nodeType===1){return false;}}
return true;case'nth':var first=match[2],last=match[3];if(first===1&&last===0){return true;}
var doneName=match[0],parent=elem.parentNode;if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count;}}
parent.sizcache=doneName;}
var diff=elem.nodeIndex-last;if(first===0){return diff===0;}else{return(diff%first===0&&diff/first>=0);}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match;},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName.toLowerCase()===match;},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ")
.indexOf(match)>-1;},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!==check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false;},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];if(filter){return filter(elem,i,match,array);}}}};var origPOS=Expr.match.POS;for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source.replace(/\\(\d+)/g,function(all,num){return"\\"+(num-0+1);}));}
var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return results;}
return array;};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;}catch(e){makeArray=function(array,results){var ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array);}else{if(typeof array.length==="number"){for(var i=0,l=array.length;i<l;i++){ret.push(array[i]);}}else{for(var i=0;array[i];i++){ret.push(array[i]);}}}
return ret;};}
var sortOrder;if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b){hasDuplicate=true;}
return a.compareDocumentPosition?-1:1;}
var ret=a.compareDocumentPosition(b)&4?-1:a===b?0:1;if(ret===0){hasDuplicate=true;}
return ret;};}else if("sourceIndex" in document.documentElement){sortOrder=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b){hasDuplicate=true;}
return a.sourceIndex?-1:1;}
var ret=a.sourceIndex-b.sourceIndex;if(ret===0){hasDuplicate=true;}
return ret;};}else if(document.createRange){sortOrder=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b){hasDuplicate=true;}
return a.ownerDocument?-1:1;}
var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();aRange.setStart(a,0);aRange.setEnd(a,0);bRange.setStart(b,0);bRange.setEnd(b,0);var ret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);if(ret===0){hasDuplicate=true;}
return ret;};}
function getText(elems){var ret="",elem;for(var i=0;elems[i];i++){elem=elems[i];if(elem.nodeType===3||elem.nodeType===4){ret+=elem.nodeValue;}else if(elem.nodeType!==8){ret+=getText(elem.childNodes);}}
return ret;}
(function(){var form=document.createElement("div"),id="script"+(new Date).getTime();form.innerHTML="<a name='"+id+"'/>";var root=document.documentElement;root.insertBefore(form,root.firstChild);if(document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return elem.nodeType===1&&node&&node.nodeValue===match;};}
root.removeChild(form);root=form=null;})();(function(){var div=document.createElement("div");div.appendChild(document.createComment(""));if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i]);}}
results=tmp;}
return results;};}
div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2);};}
div=null;})();if(document.querySelectorAll){(function(){var oldSizzle=Sizzle,div=document.createElement("div");div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return;}
Sizzle=function(query,context,extra,seed){context=context||document;if(!seed&&context.nodeType===9&&!isXML(context)){try{return makeArray(context.querySelectorAll(query),extra);}catch(e){}}
return oldSizzle(query,context,extra,seed);};for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop];}
div=null;})();}
(function(){var div=document.createElement("div");div.innerHTML="<div class='test e'></div><div class='test'></div>";if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){return;}
div.lastChild.className="e";if(div.getElementsByClassName("e").length===1){return;}
Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1]);}};div=null;})();function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}
if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;elem.sizset=i;}
if(elem.nodeName.toLowerCase()===cur){match=elem;break;}
elem=elem[dir];}
checkSet[i]=match;}}}
function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}
if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;elem.sizset=i;}
if(typeof cur!=="string"){if(elem===cur){match=true;break;}}else if(Sizzle.filter(cur,[elem]).length>0){match=elem;break;}}
elem=elem[dir];}
checkSet[i]=match;}}}
var contains=document.compareDocumentPosition?function(a,b){return!!(a.compareDocumentPosition(b)&16);}:function(a,b){return a!==b&&(a.contains?a.contains(b):true);};var isXML=function(elem){var documentElement=(elem?elem.ownerDocument||elem:0).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;};var posProcess=function(selector,context){var tmpSet=[],later="",match,root=context.nodeType?[context]:context;while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"");}
selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet);}
return Sizzle.filter(later,tmpSet);};jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;jQuery.expr[":"]=jQuery.expr.filters;jQuery.unique=Sizzle.uniqueSort;jQuery.text=getText;jQuery.isXMLDoc=isXML;jQuery.contains=contains;return;window.Sizzle=Sizzle;})();var runtil=/Until$/,rparentsprev=/^(?:parents|prevUntil|prevAll)/,rmultiselector=/,/,slice=Array.prototype.slice;var winnow=function(elements,qualifier,keep){if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){return!!qualifier.call(elem,i,elem)===keep;});}else if(qualifier.nodeType){return jQuery.grep(elements,function(elem,i){return(elem===qualifier)===keep;});}else if(typeof qualifier==="string"){var filtered=jQuery.grep(elements,function(elem){return elem.nodeType===1;});if(isSimple.test(qualifier)){return jQuery.filter(qualifier,filtered,!keep);}else{qualifier=jQuery.filter(qualifier,filtered);}}
return jQuery.grep(elements,function(elem,i){return(jQuery.inArray(elem,qualifier)>=0)===keep;});};jQuery.fn.extend({find:function(selector){var ret=this.pushStack("","find",selector),length=0;for(var i=0,l=this.length;i<l;i++){length=ret.length;jQuery.find(selector,this[i],ret);if(i>0){for(var n=length;n<ret.length;n++){for(var r=0;r<length;r++){if(ret[r]===ret[n]){ret.splice(n--,1);break;}}}}}
return ret;},has:function(target){var targets=jQuery(target);return this.filter(function(){for(var i=0,l=targets.length;i<l;i++){if(jQuery.contains(this,targets[i])){return true;}}});},not:function(selector){return this.pushStack(winnow(this,selector,false),"not",selector);},filter:function(selector){return this.pushStack(winnow(this,selector,true),"filter",selector);},is:function(selector){return!!selector&&jQuery.filter(selector,this).length>0;},closest:function(selectors,context){if(jQuery.isArray(selectors)){var ret=[],cur=this[0],match,matches={},selector;if(cur&&selectors.length){for(var i=0,l=selectors.length;i<l;i++){selector=selectors[i];if(!matches[selector]){matches[selector]=jQuery.expr.match.POS.test(selector)?jQuery(selector,context||this.context):selector;}}
while(cur&&cur.ownerDocument&&cur!==context){for(selector in matches){match=matches[selector];if(match.jquery?match.index(cur)>-1:jQuery(cur).is(match)){ret.push({selector:selector,elem:cur});delete matches[selector];}}
cur=cur.parentNode;}}
return ret;}
var pos=jQuery.expr.match.POS.test(selectors)?jQuery(selectors,context||this.context):null;return this.map(function(i,cur){while(cur&&cur.ownerDocument&&cur!==context){if(pos?pos.index(cur)>-1:jQuery(cur).is(selectors)){return cur;}
cur=cur.parentNode;}
return null;});},index:function(elem){if(!elem||typeof elem==="string"){return jQuery.inArray(this[0],elem?jQuery(elem):this.parent().children());}
return jQuery.inArray(elem.jquery?elem[0]:elem,this);},add:function(selector,context){var set=typeof selector==="string"?jQuery(selector,context||this.context):jQuery.makeArray(selector),all=jQuery.merge(this.get(),set);return this.pushStack(isDisconnected(set[0])||isDisconnected(all[0])?all:jQuery.unique(all));},andSelf:function(){return this.add(this.prevObject);}});function isDisconnected(node){return!node||!node.parentNode||node.parentNode.nodeType===11;}
jQuery.each({parent:function(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function(elem){return jQuery.dir(elem,"parentNode");},parentsUntil:function(elem,i,until){return jQuery.dir(elem,"parentNode",until);},next:function(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},nextUntil:function(elem,i,until){return jQuery.dir(elem,"nextSibling",until);},prevUntil:function(elem,i,until){return jQuery.dir(elem,"previousSibling",until);},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var ret=jQuery.map(this,fn,until);if(!runtil.test(name)){selector=until;}
if(selector&&typeof selector==="string"){ret=jQuery.filter(selector,ret);}
ret=this.length>1?jQuery.unique(ret):ret;if((this.length>1||rmultiselector.test(selector))&&rparentsprev.test(name)){ret=ret.reverse();}
return this.pushStack(ret,name,slice.call(arguments).join(","));};});jQuery.extend({filter:function(expr,elems,not){if(not){expr=":not("+expr+")";}
return jQuery.find.matches(expr,elems);},dir:function(elem,dir,until){var matched=[],cur=elem[dir];while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){if(cur.nodeType===1){matched.push(cur);}
cur=cur[dir];}
return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir]){if(cur.nodeType===1&&++num===result){break;}}
return cur;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){r.push(n);}}
return r;}});var rinlinejQuery=/ jQuery\d+="(?:\d+|null)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/(<([\w:]+)[^>]*?)\/>/g,rselfClosing=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnocache=/<script|<object|<embed|<option|<style/i,rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,fcloseTag=function(all,front,tag){return rselfClosing.test(tag)?all:front+"></"+tag+">";},wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;if(!jQuery.support.htmlSerialize){wrapMap._default=[1,"div<div>","</div>"];}
jQuery.fn.extend({text:function(text){if(jQuery.isFunction(text)){return this.each(function(i){var self=jQuery(this);self.text(text.call(this,i,self.text()));});}
if(typeof text!=="object"&&text!==undefined){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));}
return jQuery.text(this);},wrapAll:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i));});}
if(this[0]){var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}
wrap.map(function(){var elem=this;while(elem.firstChild&&elem.firstChild.nodeType===1){elem=elem.firstChild;}
return elem;}).append(this);}
return this;},wrapInner:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}
return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else{self.append(html);}});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},unwrap:function(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes);}}).end();},append:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.appendChild(elem);}});},prepend:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.insertBefore(elem,this.firstChild);}});},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this);});}else if(arguments.length){var set=jQuery(arguments[0]);set.push.apply(set,this.toArray());return this.pushStack(set,"before",arguments);}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});}else if(arguments.length){var set=this.pushStack(this,"after",arguments);set.push.apply(set,jQuery(arguments[0]).toArray());return set;}},remove:function(selector,keepData){for(var i=0,elem;(elem=this[i])!=null;i++){if(!selector||jQuery.filter(selector,[elem]).length){if(!keepData&&elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));jQuery.cleanData([elem]);}
if(elem.parentNode){elem.parentNode.removeChild(elem);}}}
return this;},empty:function(){for(var i=0,elem;(elem=this[i])!=null;i++){if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));}
while(elem.firstChild){elem.removeChild(elem.firstChild);}}
return this;},clone:function(events){var ret=this.map(function(){if(!jQuery.support.noCloneEvent&&!jQuery.isXMLDoc(this)){var html=this.outerHTML,ownerDocument=this.ownerDocument;if(!html){var div=ownerDocument.createElement("div");div.appendChild(this.cloneNode(true));html=div.innerHTML;}
return jQuery.clean([html.replace(rinlinejQuery,"")
.replace(/=([^="'>\s]+\/)>/g,'="$1">')
.replace(rleadingWhitespace,"")],ownerDocument)[0];}else{return this.cloneNode(true);}});if(events===true){cloneCopyEvent(this,ret);cloneCopyEvent(this.find("*"),ret.find("*"));}
return ret;},html:function(value){if(value===undefined){return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(rinlinejQuery,""):null;}else if(typeof value==="string"&&!rnocache.test(value)&&(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,fcloseTag);try{for(var i=0,l=this.length;i<l;i++){if(this[i].nodeType===1){jQuery.cleanData(this[i].getElementsByTagName("*"));this[i].innerHTML=value;}}}catch(e){this.empty().append(value);}}else if(jQuery.isFunction(value)){this.each(function(i){var self=jQuery(this),old=self.html();self.empty().append(function(){return value.call(this,i,old);});});}else{this.empty().append(value);}
return this;},replaceWith:function(value){if(this[0]&&this[0].parentNode){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this),old=self.html();self.replaceWith(value.call(this,i,old));});}
if(typeof value!=="string"){value=jQuery(value).detach();}
return this.each(function(){var next=this.nextSibling,parent=this.parentNode;jQuery(this).remove();if(next){jQuery(next).before(value);}else{jQuery(parent).append(value);}});}else{return this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value);}},detach:function(selector){return this.remove(selector,true);},domManip:function(args,table,callback){var results,first,value=args[0],scripts=[],fragment,parent;if(!jQuery.support.checkClone&&arguments.length===3&&typeof value==="string"&&rchecked.test(value)){return this.each(function(){jQuery(this).domManip(args,table,callback,true);});}
if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);args[0]=value.call(this,i,table?self.html():undefined);self.domManip(args,table,callback);});}
if(this[0]){parent=value&&value.parentNode;if(jQuery.support.parentNode&&parent&&parent.nodeType===11&&parent.childNodes.length===this.length){results={fragment:parent};}else{results=buildFragment(args,this,scripts);}
fragment=results.fragment;if(fragment.childNodes.length===1){first=fragment=fragment.firstChild;}else{first=fragment.firstChild;}
if(first){table=table&&jQuery.nodeName(first,"tr");for(var i=0,l=this.length;i<l;i++){callback.call(table?root(this[i],first):this[i],i>0||results.cacheable||this.length>1?fragment.cloneNode(true):fragment);}}
if(scripts.length){jQuery.each(scripts,evalScript);}}
return this;function root(elem,cur){return jQuery.nodeName(elem,"table")?(elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody"))):elem;}}});function cloneCopyEvent(orig,ret){var i=0;ret.each(function(){if(this.nodeName!==(orig[i]&&orig[i].nodeName)){return;}
var oldData=jQuery.data(orig[i++]),curData=jQuery.data(this,oldData),events=oldData&&oldData.events;if(events){delete curData.handle;curData.events={};for(var type in events){for(var handler in events[type]){jQuery.event.add(this,type,events[type][handler],events[type][handler].data);}}}});}
function buildFragment(args,nodes,scripts){var fragment,cacheable,cacheresults,doc=(nodes&&nodes[0]?nodes[0].ownerDocument||nodes[0]:document);if(args.length===1&&typeof args[0]==="string"&&args[0].length<512&&doc===document&&!rnocache.test(args[0])&&(jQuery.support.checkClone||!rchecked.test(args[0]))){cacheable=true;cacheresults=jQuery.fragments[args[0]];if(cacheresults){if(cacheresults!==1){fragment=cacheresults;}}}
if(!fragment){fragment=doc.createDocumentFragment();jQuery.clean(args,doc,fragment,scripts);}
if(cacheable){jQuery.fragments[args[0]]=cacheresults?fragment:1;}
return{fragment:fragment,cacheable:cacheable};}
jQuery.fragments={};jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var ret=[],insert=jQuery(selector),parent=this.length===1&&this[0].parentNode;if(parent&&parent.nodeType===11&&parent.childNodes.length===1&&insert.length===1){insert[original](this[0]);return this;}else{for(var i=0,l=insert.length;i<l;i++){var elems=(i>0?this.clone(true):this).get();jQuery.fn[original].apply(jQuery(insert[i]),elems);ret=ret.concat(elems);}
return this.pushStack(ret,name,insert.selector);}};});jQuery.extend({clean:function(elems,context,fragment,scripts){context=context||document;if(typeof context.createElement==="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;}
var ret=[];for(var i=0,elem;(elem=elems[i])!=null;i++){if(typeof elem==="number"){elem+="";}
if(!elem){continue;}
if(typeof elem==="string"&&!rhtml.test(elem)){elem=context.createTextNode(elem);}else if(typeof elem==="string"){elem=elem.replace(rxhtmlTag,fcloseTag);var tag=(rtagName.exec(elem)||["",""])[1].toLowerCase(),wrap=wrapMap[tag]||wrapMap._default,depth=wrap[0],div=context.createElement("div");div.innerHTML=wrap[1]+elem+wrap[2];while(depth--){div=div.lastChild;}
if(!jQuery.support.tbody){var hasBody=rtbody.test(elem),tbody=tag==="table"&&!hasBody?div.firstChild&&div.firstChild.childNodes:wrap[1]==="<table>"&&!hasBody?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j]);}}}
if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild);}
elem=div.childNodes;}
if(elem.nodeType){ret.push(elem);}else{ret=jQuery.merge(ret,elem);}}
if(fragment){for(var i=0;ret[i];i++){if(scripts&&jQuery.nodeName(ret[i],"script")&&(!ret[i].type||ret[i].type.toLowerCase()==="text/javascript")){scripts.push(ret[i].parentNode?ret[i].parentNode.removeChild(ret[i]):ret[i]);}else{if(ret[i].nodeType===1){ret.splice.apply(ret,[i+1,0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))));}
fragment.appendChild(ret[i]);}}}
return ret;},cleanData:function(elems){var data,id,cache=jQuery.cache,special=jQuery.event.special,deleteExpando=jQuery.support.deleteExpando;for(var i=0,elem;(elem=elems[i])!=null;i++){id=elem[jQuery.expando];if(id){data=cache[id];if(data.events){for(var type in data.events){if(special[type]){jQuery.event.remove(elem,type);}else{removeEvent(elem,type,data.handle);}}}
if(deleteExpando){delete elem[jQuery.expando];}else if(elem.removeAttribute){elem.removeAttribute(jQuery.expando);}
delete cache[id];}}}});var rexclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,ralpha=/alpha\([^)]*\)/,ropacity=/opacity=([^)]*)/,rfloat=/float/i,rdashAlpha=/-([a-z])/ig,rupper=/([A-Z])/g,rnumpx=/^-?\d+(?:px)?$/i,rnum=/^-?\d/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssWidth=["Left","Right"],cssHeight=["Top","Bottom"],getComputedStyle=document.defaultView&&document.defaultView.getComputedStyle,styleFloat=jQuery.support.cssFloat?"cssFloat":"styleFloat",fcamelCase=function(all,letter){return letter.toUpperCase();};jQuery.fn.css=function(name,value){return access(this,name,value,true,function(elem,name,value){if(value===undefined){return jQuery.curCSS(elem,name);}
if(typeof value==="number"&&!rexclude.test(name)){value+="px";}
jQuery.style(elem,name,value);});};jQuery.extend({style:function(elem,name,value){if(!elem||elem.nodeType===3||elem.nodeType===8){return undefined;}
if((name==="width"||name==="height")&&parseFloat(value)<0){value=undefined;}
var style=elem.style||elem,set=value!==undefined;if(!jQuery.support.opacity&&name==="opacity"){if(set){style.zoom=1;var opacity=parseInt(value,10)+""==="NaN"?"":"alpha(opacity="+value*100+")";var filter=style.filter||jQuery.curCSS(elem,"filter")||"";style.filter=ralpha.test(filter)?filter.replace(ralpha,opacity):opacity;}
return style.filter&&style.filter.indexOf("opacity=")>=0?(parseFloat(ropacity.exec(style.filter)[1])/100)+"":"";}
if(rfloat.test(name)){name=styleFloat;}
name=name.replace(rdashAlpha,fcamelCase);if(set){style[name]=value;}
return style[name];},css:function(elem,name,force,extra){if(name==="width"||name==="height"){var val,props=cssShow,which=name==="width"?cssWidth:cssHeight;function getWH(){val=name==="width"?elem.offsetWidth:elem.offsetHeight;if(extra==="border"){return;}
jQuery.each(which,function(){if(!extra){val-=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;}
if(extra==="margin"){val+=parseFloat(jQuery.curCSS(elem,"margin"+this,true))||0;}else{val-=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0;}});}
if(elem.offsetWidth!==0){getWH();}else{jQuery.swap(elem,props,getWH);}
return Math.max(0,Math.round(val));}
return jQuery.curCSS(elem,name,force);},curCSS:function(elem,name,force){var ret,style=elem.style,filter;if(!jQuery.support.opacity&&name==="opacity"&&elem.currentStyle){ret=ropacity.test(elem.currentStyle.filter||"")?(parseFloat(RegExp.$1)/100)+"":"";return ret===""?"1":ret;}
if(rfloat.test(name)){name=styleFloat;}
if(!force&&style&&style[name]){ret=style[name];}else if(getComputedStyle){if(rfloat.test(name)){name="float";}
name=name.replace(rupper,"-$1").toLowerCase();var defaultView=elem.ownerDocument.defaultView;if(!defaultView){return null;}
var computedStyle=defaultView.getComputedStyle(elem,null);if(computedStyle){ret=computedStyle.getPropertyValue(name);}
if(name==="opacity"&&ret===""){ret="1";}}else if(elem.currentStyle){var camelCase=name.replace(rdashAlpha,fcamelCase);ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!rnumpx.test(ret)&&rnum.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;style.left=camelCase==="fontSize"?"1em":(ret||0);ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft;}}
return ret;},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}
callback.call(elem);for(var name in options){elem.style[name]=old[name];}}});if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.hidden=function(elem){var width=elem.offsetWidth,height=elem.offsetHeight,skip=elem.nodeName.toLowerCase()==="tr";return width===0&&height===0&&!skip?true:width>0&&height>0&&!skip?false:jQuery.curCSS(elem,"display")==="none";};jQuery.expr.filters.visible=function(elem){return!jQuery.expr.filters.hidden(elem);};}
var jsc=now(),rscript=/<script(.|\s)*?\/script>/gi,rselectTextarea=/select|textarea/i,rinput=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,jsre=/=\?(&|$)/,rquery=/\?/,rts=/(\?|&)_=.*?(&|$)/,rurl=/^(\w+:)?\/\/([^\/?#]+)/,r20=/%20/g,_load=jQuery.fn.load;jQuery.fn.extend({load:function(url,params,callback){if(typeof url!=="string"){return _load.call(this,url);}else if(!this.length){return this;}
var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}
var type="GET";if(params){if(jQuery.isFunction(params)){callback=params;params=null;}else if(typeof params==="object"){params=jQuery.param(params,jQuery.ajaxSettings.traditional);type="POST";}}
var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status==="success"||status==="notmodified"){self.html(selector?jQuery("<div />")
.append(res.responseText.replace(rscript,""))
.find(selector):res.responseText);}
if(callback){self.each(callback,[res.responseText,status,res]);}}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return this.elements?jQuery.makeArray(this.elements):this;})
.filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type));})
.map(function(i,elem){var val=jQuery(this).val();return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val,i){return{name:elem.name,value:val};}):{name:elem.name,value:val};}).get();}});jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;callback=data;data=null;}
return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type});},getScript:function(url,callback){return jQuery.get(url,null,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},post:function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;callback=data;data={};}
return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type});},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings);},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:window.XMLHttpRequest&&(window.location.protocol!=="file:"||!window.ActiveXObject)?function(){return new window.XMLHttpRequest();}:function(){try{return new window.ActiveXObject("Microsoft.XMLHTTP");}catch(e){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(origSettings){var s=jQuery.extend(true,{},jQuery.ajaxSettings,origSettings);var jsonp,status,data,callbackContext=origSettings&&origSettings.context||s,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);}
if(s.dataType==="jsonp"){if(type==="GET"){if(!jsre.test(s.url)){s.url+=(rquery.test(s.url)?"&":"?")+(s.jsonp||"callback")+"=?";}}else if(!s.data||!jsre.test(s.data)){s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";}
s.dataType="json";}
if(s.dataType==="json"&&(s.data&&jsre.test(s.data)||jsre.test(s.url))){jsonp=s.jsonpCallback||("jsonp"+jsc++);if(s.data){s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");}
s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=window[jsonp]||function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp];}catch(e){}
if(head){head.removeChild(script);}};}
if(s.dataType==="script"&&s.cache===null){s.cache=false;}
if(s.cache===false&&type==="GET"){var ts=now();var ret=s.url.replace(rts,"$1_="+ts+"$2");s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+ts:"");}
if(s.data&&type==="GET"){s.url+=(rquery.test(s.url)?"&":"?")+s.data;}
if(s.global&&!jQuery.active++){jQuery.event.trigger("ajaxStart");}
var parts=rurl.exec(s.url),remote=parts&&(parts[1]&&parts[1]!==location.protocol||parts[2]!==location.host);if(s.dataType==="script"&&type==="GET"&&remote){var head=document.getElementsByTagName("head")[0]||document.documentElement;var script=document.createElement("script");script.src=s.url;if(s.scriptCharset){script.charset=s.scriptCharset;}
if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){done=true;success();complete();script.onload=script.onreadystatechange=null;if(head&&script.parentNode){head.removeChild(script);}}};}
head.insertBefore(script,head.firstChild);return undefined;}
var requestDone=false;var xhr=s.xhr();if(!xhr){return;}
if(s.username){xhr.open(type,s.url,s.async,s.username,s.password);}else{xhr.open(type,s.url,s.async);}
try{if(s.data||origSettings&&origSettings.contentType){xhr.setRequestHeader("Content-Type",s.contentType);}
if(s.ifModified){if(jQuery.lastModified[s.url]){xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]);}
if(jQuery.etag[s.url]){xhr.setRequestHeader("If-None-Match",jQuery.etag[s.url]);}}
if(!remote){xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");}
xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default);}catch(e){}
if(s.beforeSend&&s.beforeSend.call(callbackContext,xhr,s)===false){if(s.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop");}
xhr.abort();return false;}
if(s.global){trigger("ajaxSend",[xhr,s]);}
var onreadystatechange=xhr.onreadystatechange=function(isTimeout){if(!xhr||xhr.readyState===0||isTimeout==="abort"){if(!requestDone){complete();}
requestDone=true;if(xhr){xhr.onreadystatechange=jQuery.noop;}}else if(!requestDone&&xhr&&(xhr.readyState===4||isTimeout==="timeout")){requestDone=true;xhr.onreadystatechange=jQuery.noop;status=isTimeout==="timeout"?"timeout":!jQuery.httpSuccess(xhr)?"error":s.ifModified&&jQuery.httpNotModified(xhr,s.url)?"notmodified":"success";var errMsg;if(status==="success"){try{data=jQuery.httpData(xhr,s.dataType,s);}catch(err){status="parsererror";errMsg=err;}}
if(status==="success"||status==="notmodified"){if(!jsonp){success();}}else{jQuery.handleError(s,xhr,status,errMsg);}
complete();if(isTimeout==="timeout"){xhr.abort();}
if(s.async){xhr=null;}}};try{var oldAbort=xhr.abort;xhr.abort=function(){if(xhr){oldAbort.call(xhr);}
onreadystatechange("abort");};}catch(e){}
if(s.async&&s.timeout>0){setTimeout(function(){if(xhr&&!requestDone){onreadystatechange("timeout");}},s.timeout);}
try{xhr.send(type==="POST"||type==="PUT"||type==="DELETE"?s.data:null);}catch(e){jQuery.handleError(s,xhr,null,e);complete();}
if(!s.async){onreadystatechange();}
function success(){if(s.success){s.success.call(callbackContext,data,status,xhr);}
if(s.global){trigger("ajaxSuccess",[xhr,s]);}}
function complete(){if(s.complete){s.complete.call(callbackContext,xhr,status);}
if(s.global){trigger("ajaxComplete",[xhr,s]);}
if(s.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop");}}
function trigger(type,args){(s.context?jQuery(s.context):jQuery.event).trigger(type,args);}
return xhr;},handleError:function(s,xhr,status,e){if(s.error){s.error.call(s.context||s,xhr,status,e);}
if(s.global){(s.context?jQuery(s.context):jQuery.event).trigger("ajaxError",[xhr,s,e]);}},active:0,httpSuccess:function(xhr){try{return!xhr.status&&location.protocol==="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status===304||xhr.status===1223||xhr.status===0;}catch(e){}
return false;},httpNotModified:function(xhr,url){var lastModified=xhr.getResponseHeader("Last-Modified"),etag=xhr.getResponseHeader("Etag");if(lastModified){jQuery.lastModified[url]=lastModified;}
if(etag){jQuery.etag[url]=etag;}
return xhr.status===304||xhr.status===0;},httpData:function(xhr,type,s){var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.nodeName==="parsererror"){jQuery.error("parsererror");}
if(s&&s.dataFilter){data=s.dataFilter(data,type);}
if(typeof data==="string"){if(type==="json"||!type&&ct.indexOf("json")>=0){data=jQuery.parseJSON(data);}else if(type==="script"||!type&&ct.indexOf("javascript")>=0){jQuery.globalEval(data);}}
return data;},param:function(a,traditional){var s=[];if(traditional===undefined){traditional=jQuery.ajaxSettings.traditional;}
if(jQuery.isArray(a)||a.jquery){jQuery.each(a,function(){add(this.name,this.value);});}else{for(var prefix in a){buildParams(prefix,a[prefix]);}}
return s.join("&").replace(r20,"+");function buildParams(prefix,obj){if(jQuery.isArray(obj)){jQuery.each(obj,function(i,v){if(traditional||/\[\]$/.test(prefix)){add(prefix,v);}else{buildParams(prefix+"["+(typeof v==="object"||jQuery.isArray(v)?i:"")+"]",v);}});}else if(!traditional&&obj!=null&&typeof obj==="object"){jQuery.each(obj,function(k,v){buildParams(prefix+"["+k+"]",v);});}else{add(prefix,obj);}}
function add(key,value){value=jQuery.isFunction(value)?value():value;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value);}}});var elemdisplay={},rfxtypes=/toggle|show|hide/,rfxnum=/^([+-]=)?([\d+-.]+)(.*)$/,timerId,fxAttrs=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];jQuery.fn.extend({show:function(speed,callback){if(speed||speed===0){return this.animate(genFx("show",3),speed,callback);}else{for(var i=0,l=this.length;i<l;i++){var old=jQuery.data(this[i],"olddisplay");this[i].style.display=old||"";if(jQuery.css(this[i],"display")==="none"){var nodeName=this[i].nodeName,display;if(elemdisplay[nodeName]){display=elemdisplay[nodeName];}else{var elem=jQuery("<"+nodeName+" />").appendTo("body");display=elem.css("display");if(display==="none"){display="block";}
elem.remove();elemdisplay[nodeName]=display;}
jQuery.data(this[i],"olddisplay",display);}}
for(var j=0,k=this.length;j<k;j++){this[j].style.display=jQuery.data(this[j],"olddisplay")||"";}
return this;}},hide:function(speed,callback){if(speed||speed===0){return this.animate(genFx("hide",3),speed,callback);}else{for(var i=0,l=this.length;i<l;i++){var old=jQuery.data(this[i],"olddisplay");if(!old&&old!=="none"){jQuery.data(this[i],"olddisplay",jQuery.css(this[i],"display"));}}
for(var j=0,k=this.length;j<k;j++){this[j].style.display="none";}
return this;}},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){var bool=typeof fn==="boolean";if(jQuery.isFunction(fn)&&jQuery.isFunction(fn2)){this._toggle.apply(this,arguments);}else if(fn==null||bool){this.each(function(){var state=bool?fn:jQuery(this).is(":hidden");jQuery(this)[state?"show":"hide"]();});}else{this.animate(genFx("toggle",3),fn,fn2);}
return this;},fadeTo:function(speed,to,callback){return this.filter(":hidden").css("opacity",0).show().end()
.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);if(jQuery.isEmptyObject(prop)){return this.each(optall.complete);}
return this[optall.queue===false?"each":"queue"](function(){var opt=jQuery.extend({},optall),p,hidden=this.nodeType===1&&jQuery(this).is(":hidden"),self=this;for(p in prop){var name=p.replace(rdashAlpha,fcamelCase);if(p!==name){prop[name]=prop[p];delete prop[p];p=name;}
if(prop[p]==="hide"&&hidden||prop[p]==="show"&&!hidden){return opt.complete.call(this);}
if((p==="height"||p==="width")&&this.style){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow;}
if(jQuery.isArray(prop[p])){(opt.specialEasing=opt.specialEasing||{})[p]=prop[p][1];prop[p]=prop[p][0];}}
if(opt.overflow!=null){this.style.overflow="hidden";}
opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(rfxtypes.test(val)){e[val==="toggle"?hidden?"show":"hide":val](prop);}else{var parts=rfxnum.exec(val),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!=="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit;}
if(parts[1]){end=((parts[1]==="-="?-1:1)*end)+start;}
e.custom(start,end,unit);}else{e.custom(start,val,"");}}});return true;});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue){this.queue([]);}
this.each(function(){for(var i=timers.length-1;i>=0;i--){if(timers[i].elem===this){if(gotoEnd){timers[i](true);}
timers.splice(i,1);}}});if(!gotoEnd){this.dequeue();}
return this;}});jQuery.each({slideDown:genFx("show",1),slideUp:genFx("hide",1),slideToggle:genFx("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(name,props){jQuery.fn[name]=function(speed,callback){return this.animate(props,speed,callback);};});jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&typeof speed==="object"?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:jQuery.fx.speeds[opt.duration]||jQuery.fx.speeds._default;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false){jQuery(this).dequeue();}
if(jQuery.isFunction(opt.old)){opt.old.call(this);}};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig){options.orig={};}}});jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this);}
(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style){this.elem.style.display="block";}},cur:function(force){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop];}
var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;var self=this;function t(gotoEnd){return self.step(gotoEnd);}
t.elem=this.elem;if(t()&&jQuery.timers.push(t)&&!timerId){timerId=setInterval(jQuery.fx.tick,13);}},show:function(){this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=now(),done=true;if(gotoEnd||t>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var i in this.options.curAnim){if(this.options.curAnim[i]!==true){done=false;}}
if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;var old=jQuery.data(this.elem,"olddisplay");this.elem.style.display=old?old:this.options.display;if(jQuery.css(this.elem,"display")==="none"){this.elem.style.display="block";}}
if(this.options.hide){jQuery(this.elem).hide();}
if(this.options.hide||this.options.show){for(var p in this.options.curAnim){jQuery.style(this.elem,p,this.options.orig[p]);}}
this.options.complete.call(this.elem);}
return false;}else{var n=t-this.startTime;this.state=n/this.options.duration;var specialEasing=this.options.specialEasing&&this.options.specialEasing[this.prop];var defaultEasing=this.options.easing||(jQuery.easing.swing?"swing":"linear");this.pos=jQuery.easing[specialEasing||defaultEasing](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();}
return true;}};jQuery.extend(jQuery.fx,{tick:function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++){if(!timers[i]()){timers.splice(i--,1);}}
if(!timers.length){jQuery.fx.stop();}},stop:function(){clearInterval(timerId);timerId=null;},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(fx){jQuery.style(fx.elem,"opacity",fx.now);},_default:function(fx){if(fx.elem.style&&fx.elem.style[fx.prop]!=null){fx.elem.style[fx.prop]=(fx.prop==="width"||fx.prop==="height"?Math.max(0,fx.now):fx.now)+fx.unit;}else{fx.elem[fx.prop]=fx.now;}}}});if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};}
function genFx(type,num){var obj={};jQuery.each(fxAttrs.concat.apply([],fxAttrs.slice(0,num)),function(){obj[this]=type;});return obj;}
if("getBoundingClientRect" in document.documentElement){jQuery.fn.offset=function(options){var elem=this[0];if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i);});}
if(!elem||!elem.ownerDocument){return null;}
if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem);}
var box=elem.getBoundingClientRect(),doc=elem.ownerDocument,body=doc.body,docElem=doc.documentElement,clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,top=box.top+(self.pageYOffset||jQuery.support.boxModel&&docElem.scrollTop||body.scrollTop)-clientTop,left=box.left+(self.pageXOffset||jQuery.support.boxModel&&docElem.scrollLeft||body.scrollLeft)-clientLeft;return{top:top,left:left};};}else{jQuery.fn.offset=function(options){var elem=this[0];if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i);});}
if(!elem||!elem.ownerDocument){return null;}
if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem);}
jQuery.offset.initialize();var offsetParent=elem.offsetParent,prevOffsetParent=elem,doc=elem.ownerDocument,computedStyle,docElem=doc.documentElement,body=doc.body,defaultView=doc.defaultView,prevComputedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle,top=elem.offsetTop,left=elem.offsetLeft;while((elem=elem.parentNode)&&elem!==body&&elem!==docElem){if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){break;}
computedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle;top-=elem.scrollTop;left-=elem.scrollLeft;if(elem===offsetParent){top+=elem.offsetTop;left+=elem.offsetLeft;if(jQuery.offset.doesNotAddBorder&&!(jQuery.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(elem.nodeName))){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0;}
prevOffsetParent=offsetParent,offsetParent=elem.offsetParent;}
if(jQuery.offset.subtractsBorderForOverflowNotVisible&&computedStyle.overflow!=="visible"){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0;}
prevComputedStyle=computedStyle;}
if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){top+=body.offsetTop;left+=body.offsetLeft;}
if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){top+=Math.max(docElem.scrollTop,body.scrollTop);left+=Math.max(docElem.scrollLeft,body.scrollLeft);}
return{top:top,left:left};};}
jQuery.offset={initialize:function(){var body=document.body,container=document.createElement("div"),innerDiv,checkDiv,table,td,bodyMarginTop=parseFloat(jQuery.curCSS(body,"marginTop",true))||0,html="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";jQuery.extend(container.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});container.innerHTML=html;body.insertBefore(container,body.firstChild);innerDiv=container.firstChild;checkDiv=innerDiv.firstChild;td=innerDiv.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(checkDiv.offsetTop!==5);this.doesAddBorderForTableAndCells=(td.offsetTop===5);checkDiv.style.position="fixed",checkDiv.style.top="20px";this.supportsFixedPosition=(checkDiv.offsetTop===20||checkDiv.offsetTop===15);checkDiv.style.position=checkDiv.style.top="";innerDiv.style.overflow="hidden",innerDiv.style.position="relative";this.subtractsBorderForOverflowNotVisible=(checkDiv.offsetTop===-5);this.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==bodyMarginTop);body.removeChild(container);body=container=innerDiv=checkDiv=table=td=null;jQuery.offset.initialize=jQuery.noop;},bodyOffset:function(body){var top=body.offsetTop,left=body.offsetLeft;jQuery.offset.initialize();if(jQuery.offset.doesNotIncludeMarginInBodyOffset){top+=parseFloat(jQuery.curCSS(body,"marginTop",true))||0;left+=parseFloat(jQuery.curCSS(body,"marginLeft",true))||0;}
return{top:top,left:left};},setOffset:function(elem,options,i){if(/static/.test(jQuery.curCSS(elem,"position"))){elem.style.position="relative";}
var curElem=jQuery(elem),curOffset=curElem.offset(),curTop=parseInt(jQuery.curCSS(elem,"top",true),10)||0,curLeft=parseInt(jQuery.curCSS(elem,"left",true),10)||0;if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset);}
var props={top:(options.top-curOffset.top)+curTop,left:(options.left-curOffset.left)+curLeft};if("using" in options){options.using.call(elem,props);}else{curElem.css(props);}}};jQuery.fn.extend({position:function(){if(!this[0]){return null;}
var elem=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();offset.top-=parseFloat(jQuery.curCSS(elem,"marginTop",true))||0;offset.left-=parseFloat(jQuery.curCSS(elem,"marginLeft",true))||0;parentOffset.top+=parseFloat(jQuery.curCSS(offsetParent[0],"borderTopWidth",true))||0;parentOffset.left+=parseFloat(jQuery.curCSS(offsetParent[0],"borderLeftWidth",true))||0;return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};},offsetParent:function(){return this.map(function(){var offsetParent=this.offsetParent||document.body;while(offsetParent&&(!/^body|html$/i.test(offsetParent.nodeName)&&jQuery.css(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent;}
return offsetParent;});}});jQuery.each(["Left","Top"],function(i,name){var method="scroll"+name;jQuery.fn[method]=function(val){var elem=this[0],win;if(!elem){return null;}
if(val!==undefined){return this.each(function(){win=getWindow(this);if(win){win.scrollTo(!i?val:jQuery(win).scrollLeft(),i?val:jQuery(win).scrollTop());}else{this[method]=val;}});}else{win=getWindow(elem);return win?("pageXOffset" in win)?win[i?"pageYOffset":"pageXOffset"]:jQuery.support.boxModel&&win.document.documentElement[method]||win.document.body[method]:elem[method];}};});function getWindow(elem){return("scrollTo" in elem&&elem.document)?elem:elem.nodeType===9?elem.defaultView||elem.parentWindow:false;}
jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn["inner"+name]=function(){return this[0]?jQuery.css(this[0],type,false,"padding"):null;};jQuery.fn["outer"+name]=function(margin){return this[0]?jQuery.css(this[0],type,false,margin?"margin":"border"):null;};jQuery.fn[type]=function(size){var elem=this[0];if(!elem){return size==null?null:this;}
if(jQuery.isFunction(size)){return this.each(function(i){var self=jQuery(this);self[type](size.call(this,i,self[type]()));});}
return("scrollTo" in elem&&elem.document)?elem.document.compatMode==="CSS1Compat"&&elem.document.documentElement["client"+name]||elem.document.body["client"+name]:(elem.nodeType===9)?Math.max(elem.documentElement["client"+name],elem.body["scroll"+name],elem.documentElement["scroll"+name],elem.body["offset"+name],elem.documentElement["offset"+name]):size===undefined?jQuery.css(elem,type):this.css(type,typeof size==="string"?size:size+"px");};});window.jQuery=window.$=jQuery;})(window);
// FILE patch.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
var global=this;function remove(el){el.parentNode.removeChild(el);}
String.prototype.repeat=function(n){var s="";while(--n>=0){s+=this;}
return s;};String.prototype.pad=function(n,s,rev){if(s==undefined)s=" ";n=n-this.length;if(n<=0)return this;if(rev)
return s.repeat(n)+this;else
return this+s.repeat(n);};Number.prototype.pad2=function(){if(this<10)
return"0"+this;return this;};function isempty(ob){for(var i in ob){if(ob.hasOwnProperty(i)){return false;}}
return true;}
function xy_id(x,y){return 1+(parseInt(x)+400)+(801*Math.abs(parseInt(y)-400));}
function id_xy(id){x=id%801?(id%801-401):400;y=400-(id-x-401)/801;return[x,y];}
function xpath(match,reference,type){if(type==undefined||type=='unordered')type=XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;else if(type=='ordered')type=XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;else if(type=='any')type=XPathResult.ANY_UNORDERED_NODE_TYPE;if(!reference)reference=document;return document.evaluate(match,reference,null,type,null);}
Math.sinh=function(x){return.5*(Math.exp(x)-Math.exp(-x));};Math.cosh=function(x){return.5*(Math.exp(x)+Math.exp(-x));};Math.arsinh=function(x){return Math.log(x+Math.sqrt(x*x+1));};Math.arcosh=function(x){return Math.log(x+Math.sqrt(x*x-1));};Math.round_sig=function(amount,sigfig){if(sigfig==undefined)sigfig=2;if(typeof(amount)=='string')try{amount-=0;}catch(e){return amount;}
var power=Math.floor(Math.log(amount)/Math.LN10);amount=Math.round(amount/Math.pow(10,1+power-sigfig))/Math.pow(10,sigfig-1-power);if(power>=6)return amount/1000000+'M';if(power>=3)return amount/1000+'k';return amount;};nothing=function(){};$.new=function(type){return $(document.createElement(type));};post_data=function(form){var els=form.elements;var data=[];for(var i=0;i<els.length;i++){var e=els[i];if(e.name&&e.value&&(e.checked||e.type!='radio'))
data.push(els[i].name+"="+els[i].value);}
return data.join("&");};
// FILE date.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
function tl_date(parent){this.date=new Date();this.parent=parent;this.date.setMilliseconds(0);this.set_time=function(time){this.parent.info('Setting the time: '+time);if(time[time.length-1]=='am'||time[time.length-1]=='pm')
if(time[1]==12)time[1]=0;if(time[time.length-1]=='pm')time[1]-=-12;this.date.setHours(time[1],time[2],(time[3]!=undefined&&time[3].match('\\d'))?time[3]:0);this.parent.info('time is: '+this.date);return this.date.getTime();}
this.set_day=function(day){this.parent.info('Setting the day: '+day);this.date.setFullYear(day[2]==undefined?this.date.getFullYear():'20'+day[2],day[1]-1,day[0]);this.parent.info('time is: '+this.date);return this.date.getTime();}
this.adjust_day=function(duration){this.parent.debug('Adjusting the day by: '+duration);this.date.setDate(this.date.getDate()+Math.floor(duration[1]/24));if(Settings.time_format==1||Settings.time_format==2){var d=new Date();var hours=(d.getHours()-(-duration[1]))%24;if(duration[2]!=undefined)hours+=Math.floor((d.getMinutes()-(-duration[2]))/60);this.parent.debug('Using 12-hour time; event is in pm');if(hours%24>=12&&this.date.getHours()<12){this.date.setHours(this.date.getHours()-(-12));}}
if(this.date.getTime()<this.start_time-600000)this.date.setDate(this.date.getDate()+1);this.parent.info('time is: '+this.date);return this.date.getTime();}
this.set_seconds=function(duration,allow_jump){this.parent.info('Setting seconds with: '+duration);var date2=new Date();date2.setHours(date2.getHours()- -duration[1]);date2.setMinutes(date2.getMinutes()- -duration[2]);date2.setSeconds(date2.getSeconds()- -duration[3]);if(allow_jump||Math.abs(date2.getTime()-this.date.getTime())<60000){this.date=date2;}
this.parent.debug('time is: '+this.date);return this.date.getTime();}
this.get_time=function(){return this.date.getTime();}}
// FILE feature.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
Feature=new Object();Feature.line_number_shift=new Error().lineNumber-25;Feature.list=[];Feature.init=nothing;Feature.run=nothing;Feature.debug_categories=["none","fatal","error","warning","info","debug","all"];Feature.init_debug=function(){if(global.Settings==undefined){level=2;}else{level=Settings.global_debug_level;}
var fns=[console.error,console.error,console.error,console.warn,console.info,console.debug,console.debug];for(var i=1;i<Feature.debug_categories.length-1;i++){var cat=Feature.debug_categories[i];if(i<=level){var fn=fns[i];var tag=this.name+" - "+Feature.debug_categories[i]+": ";this[cat]=function(text){fn(tag+text);};}else{this[cat]=nothing;}}};Feature.exception=function(fn_name,e){var msg=fn_name+' ('+(e.lineNumber-this.line_number_shift)+'): '+e;this.error(msg);};Feature.setting=function(name,def_val,type,typedata,description){if(type==undefined)type=Settings.type.none;var s=new Object();s.__proto__=Settings;s.parent=this;s.scopes=[s.server_id+'.'+s.user,s.server_id,'global'];s.name=name;s.def_val=def_val;s.type=type;s.typedata=typedata;s.description=description;s.fullname=this.name+'.'+name;if(this.s==undefined)this.s=new Object();this.s[name]=s;this[name]=def_val;s.read();return s;};Feature.create=function(name,error){var x=new Object();x.__proto__=Feature;x.name=name;x.line_number_shift=error.lineNumber-error.message;x.s=new Object();Feature.list[name]=x;x.init_debug();if(global.Settings)x.setting("enabled",true,Settings.type.bool,undefined,"Is '"+name+"' enabled?");global[name]=x;return x;};Feature.guard=function(fn_name,fn){var feat=this;return function(){try{return fn.apply(feat,arguments);}catch(e){feat.exception("guard "+feat.name+'.'+fn_name,e);}};};Feature.call=function(fn_name,once){if(this.enabled===false)return;if(once==undefined)once=false;if(!this.start)this.start=new Object();this.start[fn_name]=new Date().getTime();try{this[fn_name]();}catch(e){this.exception("call "+this.name+'.'+fn_name,e);}
if(once)this[fn_name]=nothing;if(!this.end)this.end=new Object();this.end[fn_name]=new Date().getTime();};
// FILE settings.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
Feature.create("Settings",new Error(21));Settings.type={none:0,string:1,integer:2,enumeration:3,object:4,bool:5,set:6};Settings.scope_names=["user","server","global","built-in"];Settings.server=location.href.match(/^(.*?\w)\//)[1];
Settings.server_id=function(){if(location.href.match(/.*\.travian.*\.[a-z]*\/.*\.php.*/)&&!location.href.match(/(?:(forum)|(board)|(shop)|(help))\.travian/)&&!location.href.match(/travian.*\..*\/((manual)|(login)|(logout))\.php.*/)){var url=location.href.match("//([a-zA-Z]+)([0-9]*)\\.travian(?:\\.com?)?\\.(\\w+)/");if(!url)return"unknown";var a=url[2];if(url[1]=='speed')a='x';if(url[1]=='speed2')a='y';return url[3]+a;}else{return'extern';}}();Settings.user=function(){var uid=$("#side_navi a[href*='spieler.php']");if(uid.length==0)return'';uid=uid.attr('href').match(/uid=(\d+)/)[1];return uid;}();Settings.outpost_text="village";
Settings.get=function(){return this.parent[this.name];}
Settings.set=function(value){this.parent[this.name]=value;}
Settings.read=function(scope){try{if(this.type==Settings.type.none){return;}
var x;param=scope||0;for(param;param<this.scopes.length;param++){x=GM_getValue(this.scopes[param]+'.'+this.fullname);if(x!==undefined&&x!==""){this.scope=param;break;}}
if(!(param<this.scopes.length)){x=this.def_val;this.scope=this.scopes.length;}
switch(this.type){case Settings.type.string:break;case Settings.type.integer:case Settings.type.enumeration:x=x-0;break;case Settings.type.set:case Settings.type.object:x=eval(x);break;case Settings.type.bool:x=x==true;break;}
if(scope!==undefined){return x;}else{this.set(x);}}catch(e){if(this&&this.exception)
this.exception("Settings.read("+this.name+")",e);else
GM_log("FATAL:"+e);}};Settings.write=function(scope){try{scope=scope||0;if(scope>=this.scopes.length){this.warning("This setting ("+this.fullname+") can't be stored in the default scope!");return;}
var param=this.scopes[scope]+'.'+this.fullname;switch(this.type){case Settings.type.none:this.warning("This setting ("+this.fullname+") has no type and can't be stored!");break;case Settings.type.string:case Settings.type.integer:case Settings.type.enumeration:case Settings.type.bool:GM_setValue(param,this.get());break;case Settings.type.set:case Settings.type.object:GM_setValue(param,uneval(this.get()));break;}
this.scope=scope;}catch(e){if(this&&this.exception)
this.exception("Settings.write("+this.name+")",e);else
GM_log("FATAL:"+e);}};Settings.remove=function(scope){try{scope=scope||0;if(scope>=this.scopes.length){this.warning("The default setting of ("+this.fullname+") can't be changed!");return;}
var param=this.scopes[scope]+'.'+this.fullname;GM_deleteValue(param);}catch(e){if(this&&this.exception)
this.exception("Settings.remove("+this.name+")",e);else
GM_log("FATAL:"+e);}};Settings.config=function(){try{var s=$.new("div");var sc=Images.scope[this.scope].get().css("vertical-align","bottom");s.append(sc);var variable_name=this.name.replace(/_/g," ");s.append(variable_name.pad(22)+": ");s.css({whiteSpace:"pre",font:"14px Monospace",borderTop:"1px solid #999",paddingTop:"2px"});var setting=this;sc.css("marginRight","8px");var scope_title="The current value is stored at the '"+Settings.scope_names[this.scope]+"' scope. ";if(this.scope<this.scopes.length){var sv=GM_getValue(this.scopes[setting.scope+1]+'.'+this.fullname);if(sv===undefined)sv=this.def_val;if(this.type==Settings.type.enumeration)sv=this.typedata[sv];if(this.scope<this.scopes.length-1){scope_title+="Click here to promote this value to the '"+Settings.scope_names[this.scope+1]+"' scope, ";scope_title+="which will replace the value: "+sv;sc.bind("click",function(e){setting.remove(setting.scope);setting.write(setting.scope+1);s.replaceWith(setting.config());});sc.css({cursor:"pointer"});}else{scope_title+="The default value is: "+sv;}
var del=Images.del.get().css("vertical-align","bottom");del.css({cursor:"pointer",position:"absolute",right:"8px"});del.attr("title","Delete the current value of '"+variable_name+"' and replace it with: "+sv);del.bind("click",function(e){setting.remove(setting.scope);setting.read();s.replaceWith(setting.config());});sc.del=del;s.append(del);}
sc.attr("title",scope_title);switch(this.type){case Settings.type.none:{s.append(this.get());break;}
case Settings.type.string:case Settings.type.integer:{var input=$.new("input");input.val(this.get());s.append(input);if(this.typedata){s.append(this.typedata());}
input.change(function(e){var val=e.target.value;if(setting.type==Settings.type.integer){if(val=="")val=setting.def_val;else val-=0;}
input.attr({value:val});setting.set(val);setting.write();s.replaceWith(setting.config());});break;}
case Settings.type.enumeration:{var select=$.new("select");var j=this.get();for(var i in this.typedata){option=$.new("option").attr({value:i}).html(this.typedata[i]);if(i==j)option.attr({selected:"selected"});select.append(option);}
s.append(select);select.change(function(e){var val=e.target.value-0;setting.set(val);setting.write();s.replaceWith(setting.config());});break;}
case Settings.type.object:{s.append("(Object)");break;}
case Settings.type.bool:{var u=$.new("u").html(""+this.get());u.css({cursor:"pointer",color:(this.get()?'green':'red')});u.click(function(e){setting.set(!setting.get());setting.write();s.replaceWith(setting.config());});s.append(u);break;}
case Settings.type.set:{for(var i in this.typedata){var u=$.new("u").html(this.typedata[i]);u.css({cursor:"pointer",color:(this.get()[i]?'green':'red')});u.attr("id",this.name+"."+i);u.click(function(e){setting.get()[e.target.id.match(/\.(\d+)/)[1]-0]^=true;setting.write();s.replaceWith(setting.config());});s.append("[").append(u).append("]");}
break;}}
if(this.description){s.attr({title:this.description});var h=this.description.match("\\(([-a-zA-Z0-9.,_ ]+)\\)$");if(h)
s.append(" "+h[1]);}
s.append("\n");return s;}catch(e){Settings.debug(e);}};Settings.previews={color:function(){return $.new('div').css({width:"16px",height:"16px",display:"inline-block",padding:"0px;",outline:"1px solid black",margin:"-4px 5px",backgroundColor:this.get()});},font:function(){return $.new('span').css({font:this.get()}).text("(example)");},};Settings.init=function(){Settings.setting("show_description",true,Settings.type.bool,undefined,"Show a description (like this) below each setting. This description will always be available as a popup/tooltip.");Settings.setting("race",0,Settings.type.enumeration,["Romans","Teutons","Gauls"]);

Settings.setting("time_format",0,Settings.type.enumeration,['Euro (dd.mm.yy 24h)','US (mm/dd/yy 12h)','UK (dd/mm/yy 12h','ISO (yy/mm/dd 24h)']);Settings.setting("outpost_names",{},Settings.type.object,undefined,"The names of your "+Settings.outpost_text+"s");Settings.setting("current_tab","Settings",Settings.type.string,undefined,"The tab that's currently selected in the settings menu. ");};Settings.run=function(){
try{var tr=$("#vlist td[class='dot hl']").next();Settings.outpost_name=tr.text();Settings.outpost_id=tr.find('a').attr('href').match(/newdid=(\d+)/)[1]-0;var coord=tr.next().text().match(/\((-?\d{1,3})|(-?\d{1,3})\)/);Settings.outpost_coord=[coord[1]-0,coord[2]-0];}catch(e){Settings.exception("get outpost",e);Settings.info("Failed to get the vlist table - assuming there's only one village!");Settings.outpost_name="";Settings.outpost_id=0;}
Settings.outpost_names[Settings.outpost_id]=Settings.outpost_name;Settings.s.outpost_names.write();this.info("The active "+Settings.outpost_text+" is "+Settings.outpost_id+": "+Settings.outpost_name);var link=$.new("a").attr({href:"javascript:"}).text("Time Line Settings");link.click(Settings.show);var right=Timeline.width;if(Timeline.collapse)right=Timeline.collapse_width;if(!Timeline.enabled)right=0;right+=5;link.css({position:"absolute",zIndex:"2",right:right+"px",top:"-5px",MozBorderRadius:"6px",padding:"3px",border:"1px solid #999",background:"#ccc",color:"blue",fontSize:"12px"});$(document.body).append(link);
};Settings.show=function(){var w=$.new("div");w.css({position:"fixed",zIndex:"30000",left:"0px",top:"0px",right:"0px",bottom:"0px",fontSize:"12px",background:"rgba(192,192,192,0.8)"});w.html('<a style="position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; cursor: pointer;">'+
'<span style="position: absolute; right: 30px; top: 20px;">[x] Close</span></a>'+
'<div style="position: absolute; left: 50%; top: 50%;">'+
'<div style="position: absolute; left: -300px; top: -250px; width: 600px; height: 400px;'+
' border: 3px solid #000; background: #fff; overflow: auto; padding: 8px;'+
' -moz-border-radius-topleft:12px;" id="settings_container">'+
'</div></div>');w.find("a").click(Settings.close);Settings.window=w;try{var p=w.find("div").eq(0);var tablebody=$.new('tbody');for(var n in Feature.list){var f=Feature.list[n];if(f.s==undefined||isempty(f.s))continue;tablebody.append('<tr align="right"><td style="padding: 5px 2px; text-align: right; border: none; background: none;">'+
'<a href="javascript:" style="-moz-border-radius-topleft:8px; -moz-border-radius-bottomleft:8px;'+
'padding:1px 11px 2px; border: 2px solid #000; '+
(n==Settings.current_tab?'background: #fff; border-right: none;':'background: #ddd; border-right: 3px solid black;')+
' color:black; outline: none; cursor:pointer;">'+
f.name+'</a></td></tr>');}
var tabbar=$.new('table');tabbar.append(tablebody);tabbar.css({position:"absolute",width:"150px",left:"-445px",top:"-200px",border:"none",borderCollapse:"collapse",background:"none"});p.append(tabbar);var notice=$.new('pre');// Add the copyright
notice.text("Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler\n"+
"GNU General Public License as published by the Free Software Foundation;\n"+
"either version 3 of the License, or (at your option) any later version.\n"+
"This program comes with ABSOLUTELY NO WARRANTY!");notice.css({color:"#666",fontStyle:"italic",fontSize:"75%",textAlign:"center",position:"absolute",left:"-300px",top:"180px",width:"600px",padding:"1px 8px",border:"3px solid #000",background:"#fff",MozBorderRadiusBottomleft:"12px",MozBorderRadiusBottomright:"12px"});p.append(notice);var tabs=tabbar.find("a");tabs.click(function(e){var el=$(e.target);var f=Feature.list[el.text()];Settings.current_tab=el.text();Settings.s.current_tab.write();tabs.css({background:"#ddd",borderRight:"3px solid black"});el.css({background:"#fff",borderRight:"none"});Settings.fill();});Settings.fill();}catch(e){if(this&&this.exception)
this.exception("Settings.show",e);else
GM_log("FATAL:"+e);}
$("body").append(w);};Settings.fill=function(){var disp=Settings.window.find("#settings_container");var f=Feature.list[Settings.current_tab];if(f){disp.empty();for(var i in f.s){f.s[i].read();disp.append(f.s[i].config());if(Settings.show_description&&f.s[i].description)
disp.append($.new("div").css({font:"8pt Arial",padding:"0px 0px 6px 25px",color:"#666"}).text(f.s[i].description));}}}
Settings.close=function(){Settings.window.remove();};Settings.setting("global_debug_level",0,Settings.type.enumeration,Feature.debug_categories,"Which categories of messages should be sent to the console. (Listed in descending order of severity).");Settings.init_debug();Settings.call('init',true);$(function(){Settings.call('run',true);});
// FILE images.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
Feature.create("Images",new Error(21));delete Images.s.enabled;Images.create=function(src,width,height){var im=new Object();im.__proto__=Images;im.src=src;im.width=width;im.height=height;return im;};Images.get=function(){return $.new("img").attr({src:this.src});};Images.stamp=function(){if(!this._stamp){this._stamp=new Image();this._stamp.src=this.src;this._stamp.creator=this;}
return this._stamp;};Images.init=function(){Images.clock=Images.create("data:image/bmp;base64,Qk3WAgAAAAAAADYAAAAoAAAAEgAAAAwAAAABABgAAAAAAKACAAATCwAAEwsAAAAAAAAAAAAA/////////////v7+/v7+rq6uTExMREREPDw8PDw8PDw8QEBAi4uL/////v7+////////////AAD////////////9/f2pqalDQ0N+fn75+fn////x8fHc3NyCgoI7OzuKior///////////////8AAP///////////6SkpEhISJubm/39/f39/f39/f////7+/v7+/o2NjURERKGhof///////////wAA////////////SkpKjY2N7e3t/////v7+/f39/v7+////9/f3WlpaU1NTSUlJ////////////AAD///////////9BQUHc3Nz7+/v+/v7+/v79/f3///9SUlJbW1vx8fG+vr47Ozv///////////8AAP///////////zw8PNnZ2f////39/f7+/v///ysrK+vr6/z8/P7+/vn5+TMzM////////////wAA////////////QUFB/////////f39/f39////Li4u/////f39/v7+/Pz8ODg4////////////AAD///////////83NzePj4/39/f+/v79/f3///9QUFD////+/v7+/v67u7s7Ozv///////////8AAP///////////2BgYERERJeXl/////7+/v///1JSUv////7+/v///1tbW0FBQf///////////wAA////////////////T09PVlZW9fX1+fn5////T09P////+/v7W1tbOzs7l5eX////////////AAD////////////9/f339/dPT09UVFSBgYH///9LS0vc3NxSUlI8PDyBgYH+/v7///////////8AAP////////////7+/v39/f///25ubkpKSklJSUNDQ0pKSjs7O2hoaP39/f7+/v///////////wAA");Images.percent=Images.create("data:image/bmp;base64,Qk3WAgAAAAAAADYAAAAoAAAAEgAAAAwAAAABABgAAAAAAKACAAATCwAAEwsAAAAAAAAAAAAA////////////////////////////////////////////////////////////////////////AAD////////////////////Y2NhNTU23t7f////m5uZbW1s/Pz9QUFCCgoL39/f///////////8AAP///////////////////////7W1tUpKSuPj49LS0ioqKq2trZaWlkJCQvHx8f///////////wAA////////////////////////+Pj4SEhIkpKS1NTUMjIytbW1nZ2dNzc38fHx////////////AAD////////////////Ozs6YmJijo6POzs5MTEy+vr5xcXFFRUU/Pz+Ghob7+/v///////////8AAP///////////+Xl5VtbW1BQUD4+Po+Pj6GhoUVFRd7e3tPT09vb2/7+/v///////////////wAA////////////0tLSKioqwsLCh4eHQkJC5OTkUlJSjIyM/v7+////////////////////////AAD////////////V1dUyMjK0tLSQkJBQUFDx8fHa2tpeXl7Y2Nj///////////////////////8AAP////////////Ly8oCAgEREREBAQJeXl/v7+/7+/p6enlZWVtvb2////////////////////wAA////////////////8fHx0tLS29vb////////////+Pj42NjY////////////////////////AAD///////////////////////////////////////////////////////////////////////8AAP///////////////////////////////////////////////////////////////////////wAA");Images.hammer=Images.create("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kEEhY1JQfrF6AAAAFYSURBVCjPlZI7a8IAFEY/K1UCBn+AiwZpwVVwCMFNguJQHOvgUIQ4FEQoUjNVCiIFN6GbU0CdujWrdNPBdggOoqGgHZSCQRE1hdvZt571Xg738YF2oGkaSZJE2WyWTuUCGyyXS8iyDJ7n0e120e/3cQpbolgsBlEUwbIsjOkUHMedLzIMA1arFT6fD2/lMl4KBZzKmkgURQiCAIfTievxGO/pNNRaDX/niHRdh2mamM/nSCaT+HW74bDZoJVKUPJ5fI9GmAyHx0UejwfFYhGqquIukcBNLoemaWJqscDWaqGaSuGz3d4/0uYbG40GrVYrIiL66nToKZOhqMtFSjhMz8EgVSuVne/HsXxMZjN6UxS6YllSolEqh0L0GI9v9VmIiI4dkgDogwFuAwFIfj8uAfwwDB7q9f2rHWKxWJDAcfQaiRDv9R5O9iHsdjs+ej00GQb3srxW+wd+q1O9w+tuqQAAAABJRU5ErkJggg==");Images.nohammer=Images.create("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFGQEIJZ4LRFoAAAFXSURBVCjPjZKxa8JAGMVfSiE6hHYVoUOQ/gsHoQ4FQRBFcAo4dAq4tIOLlEzd6m6hm5PgWHDo4FDEyWKLi5OoFCe3lIiogb4OadRogz74hu+497t33x34j/r9PguFAkulEo/VCQBAktwCsFwuYZomNE3DYDDAaDRCoLZ8Loh0S5Igh0JIJpNQFAXftg1VVYMBns9lbGRZFjOZDAnwJpHgZ7e7fwe/ZbO83QghWC6X+dHreWfxtV6n4wECICR56qUdj8dwHAfz+RyGYeA6m8WFbeNO1wFdx9d0ijPHwXnQvLapzWaTQgg+VSpsdzrMx+PrJI+5HN8ajcBEe1lbrRZXq9Ua8FAsMh2Nrvt6tXocaHeg1mzGl1qNl4rCWjpNArzP5w+AAgb6Q3I4mVBEIqz+wXb3gUe8iKfFYsErVeVzKkUtFvP5/B/ygGRZRns4xHs4jFvT9Pl+AbHZF5zaQ2LdAAAAAElFTkSuQmCC");Images.hero=Images.create("/gpack/travian_default/img/u/specials.gif",19,16);Images.romans=Images.create("/gpack/travian_default/img/u/v1_romans2.gif",19,16);Images.teutons=Images.create("/gpack/travian_default/img/u/v2_teutons2.gif",19,16);Images.gauls=Images.create("/gpack/travian_default/img/u/v3_gauls2.gif",19,16);Images.nature=Images.create("/gpack/travian_default/img/u/v4_nature2.gif",19,16);Images.natars=Images.create("/gpack/travian_default/img/u/v5_natars2.gif",19,16);Images.monsters=Images.create("/gpack/travian_default/img/u/v6_monsters2.gif",19,16);Images.resources=Images.create("/gpack/travian_default/img/a/res2.gif",20,12);

Images.cross=Images.create("data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8W9u8i4tNanodqxqNqxqtqxrOC+udPFw9nS0NjT0t/c2+TKxebQyujSzuPd2+Pe3enV0O3e2+vj4ezl4+ro5+7o5+zr6+/t7fHk4fDs6/bt6vTt7PXu7fPy8fXy8fX19Pf29/n08vr29fr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjcAP8JHEjw3585dw4J9AMnDh5OBPucmNImyyVLXcagEfNmksBAC1asYYMFEiULUq6UMcNlEaIHJs6o+VJHIB8KOqpYueJlAokoacCA2DRwEAEUUKhUWYKETJgOkgo+2sBAyZOkVTAoKigwk4AAQ5o4YfKBq0A5BQwEMXIkCRE3lQraSTACR48bKYAUEaKF0UBACkjIqAHDg4YGOXz8uCDQkI0SLGK84CAJk4gDM3BIaNRpyw4WLVxUSDRQTwYIIf454kFDhYoIggpqKiTQE50BDhDkMVsw0h5CvAcGBAA7");/*! Copyright notice:
 *  The images below come from the "Silk icon set 1.3" by Mark James
 *  http://www.famfamfam.com/lab/icons/silk/
 *  licensed under a Creative Commons Attribution 2.5 License.
 *  http://creativecommons.org/licenses/by/2.5/
 */
Images.scope=[];Images.scope[0]=Images.create("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ3SURBVDjLpZNtSNNRFIcNKunF1rZWBMJqKaSiX9RP1dClsjldA42slW0q5oxZiuHrlqllLayoaJa2jbm1Lc3QUZpKFmmaTMsaRp%2BkMgjBheSmTL2%2F%2FkqMBJlFHx44XM7vOfdyuH4A%2FP6HFQ9zo7cpa%2FmM6RvCrVDzaVDy6C5JJKv6rwSnIhlFd0R0Up%2FGwF2KWyl01CTSkM%2FdQoQRzAurCjRCGnRUUE2FaoSL0HExiYVzsQwcj6RNrSqo4W5Gh6Yc4%2B1qDDTkIy%2BGhYK4nTgdz0H2PrrHUJzs71NQn86enPn%2BCVN9GnzruoYR63mMPbkC59gQzDl7pt7rc9f7FNyUhPY6Bx9gwt4E9zszhWWpdg6ZcS8j3O7zCTuEpnXB%2B3MNZkUUZu0NmHE8XsL91oSWwiiEc3MeseLrN6woYCWa%2FZl8ozyQ3w3Hl2lYy0SwlCUvsVi%2FGv2JwITnYPDun2Hy6jYuEzAF1jUBCVYpO6kXo%2BNuGMeBAgcgfwNkvgBOPgUqXgKvP7rBFvRhE1crp8Vq1noFYSlacVyqGk0D86gbART9BDk9BFnPCNJbCY5aCFL1Cyhtp0RWAp74MsKSrkq9guHyvfMTtmLc1togpZoyqYmyNoITzVTYRJCiXYBIQ3CwFqi83o3JDhX6C0M8XsGIMoQ4OyuRlq1DdZcLkmbgGDX1iIEKNxAcbgTEOqC4ZRaJ6Ub86K7CYFEo8Qo%2BGBQlQyXBczLZpbloaQ9k1NUz%2FkD2myBBKxRZpa5hVcQslalatoUxizxAVVrN3CW21bFj9F858Q9dnIRmDyeuybM71uxmH9BNBB1q6zybV7H9s1Ue4PM3%2Fgu%2FAEbfqfWy2twsAAAAAElFTkSuQmCC");Images.scope[1]=Images.create("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKDSURBVDjLjdFNTNJxHAZw69CWHjp16O2AZB3S1ovOObaI8NBYuuZAhqjIQkzJoSIZBmSCpVuK%2FsE%2FWimU6N9SDM0R66IHbabie1hrg0MK3Zo5a8vwidgym8w8PKffvp89e35RAKJ2ipp7WDxvjltZ6jwCr5W2bpHHtqUnx%2B77877jsZxzlO3roAWXuw5ha1pl9MZdAW2ig8RyXyL8rnx8G6uH387AMnUMC2b6l10BJPdAfWDGhZVREuszT7D6hsTStBNDurO%2BXQEZnEypx1a28XW2F8HFPqwtOBAYJlCde9EeEZCy4sTN4ksrRA4LZB57vZCfMElUyH4E7Ap86r%2BLwIAGIy03cDr%2FlDNJGR%2FzDyBiHGc3i1ODjUIWtqbdIIexVY86kwZ3HijR%2F86GmqFqJGhPWs8oTkRvAgb%2BuZGHhVfRV3UNni41OhU8EDlstBSkwjKjhnmqAg3uUtS6y9Dzvg0ljmKkFCaRm4CJT%2B%2F5OERtG4yqZMEwdQt1biV0EyW4PVEE1dsiiMk8eMn0%2Fw9Wp%2BPCNK1CQ6iBYeommkIpH5Qhy5AF%2F6Mrf4G955tUJlXxtsHieeWQ2LJxvVuAAkoASUcmLugZPqW0qsprEQjDx3sY3ZIMhXt1%2BDNw77kdmnYKSsKKx%2BPfoTQtYX9KtzWG2Rod6aujaJwWHk8%2BuDawGITeA%2BSPA7nDQOYgwKcAYhQQajyIY9eQEYE5feLPyV4jFC8CELkAkWMDQmoDPGsQaWYgzRjEU8vL8GARAV8T099bUwqBdgzS14D4VaiBA8gZALJ%2Ft6j1Qqu4Hx4sIvChoyDFWZ1RmcyzORJLJsDSzoUyD5Z6FsxKN%2BiXn%2FmM5ZLwYJGAX0F%2FsgCQt3xBAAAAAElFTkSuQmCC");Images.scope[2]=Images.create("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMtSURBVDjLVZNLa1xlAIafc5szk8xkMkkm5MKY2EpT2qa2MTVCmoLS2gq6EKooimAW7iQb%2F0I2bgTRIog0oFW7KQpCS7VqrSmmJGlSQtswqWlLLmbGmcmcZM6cy%2Fedz00r6bt8eXh4N6%2BmlGJnxiZHR4APgSNAFjCBKjClInXm05Gzl3by2mPB2OSoCUwAp1%2FLHbcziSyO24gbgJAegg2urF8UUsifhZBvfvXK99v%2FC8YmRy3gt8G2%2FcMv517E8Wx8ApYcjZiyKbkRSgQkcFn3rzG9Nn1LhOLYt2%2F8UNUfLZkYaN0zfLRrkLIMCHUNIXTqIoZLjLJvU%2FASrFQtnko%2Bz2BH38HAD78DMConHh4FPn5nz6vGgqyxTp16JNj2kpR9C8eD%2FOoW1VoNO1NCS%2Bd5oW0vV27f2PX11MS8MTR6%2BJOTXUMHNCPBui5AtdMpk8xsGNQ9ndur20TxCnbPIn5TnmJUwaxIDrTm9Jn7d1tM4EiuqZs5d41iXGefsZsIwYNCgOfVSXconJbLLEWb4CuahU2%2B6HO8d4DQF%2F0m0NpgNvLAXaPgu6QadrEZpKhUItJZj%2FaMS1EewvHnsdUWW%2F%2BWKG82kEykCAPRbCqlNE1B4DsocpiW5OJfIVoiyfqSQFdNdGXrpLZGcFZDPKYJg2VQCiGEZkoRlZ3A6W41mknFn2WlaOKFFrG4Tbw9wb2%2FS3g3miHySLdbNDd2kzYKVGpVpIiqugjF7P3yQ55pyLFWmCSyVokZPqHnEoYmsWQGuyWOGdexNIkRFOnqbGN5bRngjh4G4rMLd6%2BKnmQW012lWrpOJuNjCh9LU9i6gRkEZHIrpNv%2FQK8vcijXz5lfLijgS%2BPmuYV75%2BfPDXr1Wt9znfsouy5x%2B2miuoltW1iawBJV0o0%2FwT8lBvbv5WZ%2BgaWNlasz43MfmQChH777e37uT78eHDx5%2BBiLBROjqhDaFmGkQ1KS6%2Bmlr7%2BXX2evc%2BnWVB54%2B4kznfr8pZQIxXkRyhPvDb9vIjtQqgFN12hLO2yUZ%2Fni8o8SuAa8NTM%2Bt%2FGE4HGGx4del0J%2BIGXUH8ko86iuAneAszPjc9%2Fs5P8DuO6ZcsXuRqAAAAAASUVORK5CYII%3D");Images.scope[3]=Images.create("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGSSURBVCjPVVFNSwJhEF78Ad79Cf6PvXQRsotUlzKICosuRYmR2RJR0KE6lBFFZVEbpFBSqKu2rum6llFS9HHI4iUhT153n6ZtIWMOM%2B%2FMM88z7wwH7s9Ub16SJcnbmrNcxVm2q7Z8%2FQPvEOtntpj92NkCqITLepEpjix7xQtiLOoQ2b6%2BE7YAN%2F5nfOEJ2WbKqOIOJ4bYVMEQx4LfBBQDsvFMhUcCVU1%2FCxVXmDBGA5ZETrhDCQVcYAPbyEJBhvrnBVPiSpNr6cYDNCQwo4zzU%2FySckkgDYuNuVpI42T9k4gLKGMPs%2FxPzzovQiY2hQYe0jlJfyNNhTqiWDYBq%2FwBMcSRpnyPzu1oS7WtxjVBSthU1vgVksiQ3Dn6Gp5ah2YOKQo5GiuHPA6xT1EKpxQNCNYejgIR457KKio0S56YckjSa9jo%2F%2F3mrj%2BBV0QQagqGTOo%2BY7gZIf1puP3WHoLhEb2PjTlCTCWGXtbp8DCX3hZuOdaIc9A%2BaQvWk4ihq95p67a7nP%2Bu%2BWs%2Br0dql9z%2Fzv0NCYhdCPKZ7oYAAAAASUVORK5CYII%3D");Images.del=Images.create("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh%2B8vL%2B%2Fm8PA%2FPkwIg5X%2By5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4%2FJgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A%2BN4NzB0lMXxon%2FuxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340%2FEocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK%2FqRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ%2BJt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV%2BBeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW%2BdGfzlFkyo89GTlcrHYCLpKD%2BV7yeeHNzLjkp24Uu1Ed6G8%2FF8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC%2FnesXbeZ6c9OYnuxUc3fmBuFft%2FFf8xMd0s65SXIb%2FgAAAABJRU5ErkJggg%3D%3D");Images.pencil=Images.create("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFUSURBVDjLrZM%2FSAJxGIZdWwuDlnCplkAEm1zkaIiGFFpyMIwGK5KGoK2lphDKkMDg3LLUSIJsSKhIi%2B684CokOtTiMizCGuzEU5K3vOEgKvtBDe%2F2Pc8H3x8NAM1fQlx4H9M3pcOWp6TXWmM8A7j0629v1nraiAVC0IrrwATKIgs5xyG5QiE%2BZ4iQdoeU2oAsnqCSO1NSTu%2BD9VhqRLD8nIB8F0Q2MgmJDyipCzjvYJkIfpN2UBLG8MpP4dxvQ3ZzGuyyBQ2H%2BAnOOCBd9aL6soh81A5hyYSGWyCFvxUcerqI4S%2BCvYVOFPMHxLAq8I3qdHVY5LbBhJzEsCrwutpRFBlUHy6wO2tEYtWAzLELPN2P03kjfj3luqDycV2F8AgefWbEnVqEHa2IznSD6BdsVDNStB0lfh0FPoQjdx8RrAqGzC0YprSgxzsUMOY2bf37N%2F6Ud1Vc9yYcH50CAAAAAElFTkSuQmCC");/*! End copyright "Silk icon set 1.3" */};Images.call('init',true);$(function(){Images.call('run',true);});
// FILE map.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
Feature.create("Map",new Error(21));Map.s.enabled.description="Enable the map lines";Map.init=function(){Map.setting("list_extra_villages",true,Settings.type.bool,undefined,"Append villages in the 'extra' category to the villages list.");Map.setting("analyze_neighbourhood",true,Settings.type.bool,undefined,"Add links to travian analyzer on the map page, for analyzing the neighbourhood.");Map.setting("scale",.05,Settings.type.integer,undefined,"The square at the start of a line will be at (this_value*location's_distance_from_center) from the center.");Map.setting("categories",{none:["",false],owned:["rgba(128,255,  0,1.0)",true],ally:["rgba(  0,  0,255,0.5)",true],allies:["rgba(  0,255,  0,0.5)",true],naps:["rgba(  0,255,255,0.5)",false],enemies:["rgba(255,  0,  0,0.5)",true],crop9:["rgba(255,128,  0,0.5)",true],crop15:["rgba(192,128,  0,1.0)",true],extra:["rgba(128,128,128,1.0)",true],farms:["rgba(255,255,255,1.0)",true],ban:["rgba(  0,  0,  0,0.5)",false],natar:["rgba(128, 64,  0,0.5)",false],other:["rgba(255,  0,255,0.5)",true]},Settings.type.object,undefined,"The different types of categories. The order of this list defines the order in which they are listed and drawn.");Map.setting("locations",{},Settings.type.object,undefined,"List of special locations.");};Map.new_table_cell=function(c,innerhtml){cell=document.createElement("td");cell.innerHTML=innerhtml;cell.className=c;return cell;};Map.append_villages=function(){var color=Map.categories.extra[0];for(var l in Map.locations){var location=Map.locations[l];if(location[2]=="extra"){var row=document.createElement("tr");row.appendChild(Map.new_table_cell("dot","&#x25CF;"));row.appendChild(Map.new_table_cell("text","<a style=\"color: "+color+";\">"+location[3]+"</a>"));row.appendChild(Map.new_table_cell("x","("+location[0]));row.appendChild(Map.new_table_cell(""," | "));row.appendChild(Map.new_table_cell("y",location[1]+")"));Map.outpost_list.appendChild(row);}}};Map.create_analyzer_links=function(){var rdiv=document.createElement("div");rdiv.style.position="absolute";rdiv.style.left="315px";rdiv.style.top="500px";rdiv.style.border="solid 1px #000";rdiv.style.background="#ffc";rdiv.style.zIndex=16;rdiv.style.padding="3px";rdiv.style.MozBorderRadius="6px";document.body.appendChild(rdiv);Map.analyzer_links=rdiv;};Map.create_canvas=function(x){var pos=[x.offsetLeft,x.offsetTop,x.offsetWidth,x.offsetHeight];var canvas=document.createElement("canvas");canvas.style.position="absolute";canvas.style.left=pos[0]+"px";canvas.style.top=pos[1]+"px";canvas.style.zIndex=14;canvas.width=pos[2];canvas.height=pos[3];x.parentNode.insertBefore(canvas,x.nextSibling);var g=canvas.getContext("2d");Map.context=g;Map.pos=pos;};Map.touch=function(location){var x=location[0]-Map.posx;var y=location[1]-Map.posy;if(x<-400)x+=800;if(x>400)x-=800;if(y<-400)y+=800;if(y>400)y-=800;var px=1.83*(x+y)*20;var py=1.00*(x-y)*20;px+=py/50;var category=Map.categories[location[2]];var g=Map.context;g.strokeStyle=category[0];if(category[1]){g.beginPath();var px2=px*Map.scale;var py2=py*Map.scale;g.moveTo(px2,py2);g.lineTo(px,py);g.stroke();if(x!=0||y!=0)
g.fillRect(px2-2,py2-2,4,4);}
if(x>=-3&&x<=3&&y>=-3&&y<=3){if(x==0&&y==0)
g.lineWidth=2.5;g.beginPath();g.moveTo(px+20,py);g.arc(px,py,20,0,Math.PI*2,true);g.stroke();if(x==0&&y==0)
g.lineWidth=1;}};Map.delayed_update=function(){setTimeout(Map.update,10);}
Map.update=function(){try{z=unsafeWindow.m_c.z;if(z==null)return;if(Map.posx==z.x&&Map.posy==z.y)return;Map.posx=z.x-0;Map.posy=z.y-0;}catch(e){this.exception("Map.update",e);}
Map.s.locations.read();var g=Map.context;g.clearRect(0,0,Map.pos[2],Map.pos[3]);g.save()
g.translate(Map.pos[2]/2-1,Map.pos[3]/2+5.5);g.fillStyle="rgba(128,128,128,0.8)";for(var l in Map.locations){Map.touch(Map.locations[l]);}
g.restore();if(Map.analyzer_links){var linkstart="<a href=\"http://travian.ws/analyser.pl?s="+Settings.server_id+"&q="+Map.posx+","+Map.posy;Map.analyzer_links.innerHTML="<b>Analyze neighbourhood:</b><br/>Radius: "+
linkstart+",5\" > 5</a>, "+
linkstart+",10\">10</a>, "+
linkstart+",15\">15</a>, "+
linkstart+",20\">20</a>, "+
linkstart+",25\">25</a>";}}
Map.tag_change=function(e){Map.s.locations.read();var cat=e.target.value;var l=Map.posx+","+Map.posy;if(cat=="none"){delete Map.locations[l];}else{Map.locations[l]=[Map.posx,Map.posy,cat,Map.outpost_name];}
Map.s.locations.write();};Map.tag_tool=function(){if(location.href.indexOf("karte.php?d=")<=0)return;var x=document.evaluate("//div[@id='content']/h1",document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue;if(!x)return;var loc=x.textContent.match("\\((-?\\d+)\\|(-?\\d+)\\)");var cat=Map.locations[loc[1]+","+loc[2]];cat=(cat==undefined)?cat="none":cat[2];var select=document.createElement("select");for(var c in Map.categories){var opt=document.createElement("option");opt.value=c;if(c==cat)opt.selected=true;opt.innerHTML=c;select.appendChild(opt);}
Map.posx=loc[1]-0;Map.posy=loc[2]-0;Map.outpost_name=x.firstChild.textContent;select.addEventListener('change',Map.tag_change,false);x.appendChild(select);x.parentNode.style.zIndex=5;};Map.run=function(){if(Map.list_extra_villages){var vlist=document.getElementById("vlist");if(vlist){Map.outpost_list=vlist.childNodes[1];if(Map.outpost_list){Map.append_villages();}else{this.warning("Could not find village list.");}}}
var x=document.getElementById("map");if(x!=null){if(Map.analyze_neighbourhood)
Map.create_analyzer_links();Map.create_canvas(x);Map.update();document.addEventListener('click',Map.delayed_update,true);document.addEventListener('keydown',Map.delayed_update,true);document.addEventListener('keyup',Map.delayed_update,true);}
Map.tag_tool();};Map.call('init',true);$(function(){Map.call('run',true);});
// FILE navbar.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
Feature.create("Navbar",new Error(21));Navbar.s.enabled.description="Cutomize the sidebar";Navbar.init=function(){Navbar.setting("remove_plus_color",true,Settings.type.bool,undefined,"De-colors the Plus link");Navbar.setting("use_hr",true,Settings.type.bool,undefined,"Use <hr> to seperate sidebar sections instead of <p>");Navbar.setting("remove_plus_button",true,Settings.type.bool,undefined,"Removes the Plus button");Navbar.setting("extern_in_new_window",true,Settings.type.bool,undefined,"Causes the sidebar links that point to a non-in-game page to open in a new window/tab.");Navbar.setting("remove_home_link",true,Settings.type.bool,undefined,"Redirects travian image to current page instead of travian homepage.");Navbar.setting("links",[1,["FAQ","http://help.travian.nl"],["Travian Forum","http://forum.travian.nl"],["Wiki","http://travian.wikia.com"],-1,2,["Alliance Forum","/allianz.php?s=2"],["Alliance Overview","allianz.php"],-1,["Barracks","/build.php?gid=19"],["Stable","/build.php?gid=20"],["Workshop","/build.php?gid=21"],["Marketplace","/build.php?gid=17"],["Rally Point","/build.php?gid=16"],-1,6,7,],Settings.type.object,undefined,"The links of navigation bar.");
};Navbar.fill=function(){Navbar.bar.empty();for(var i in Navbar.links){var el;var x=Navbar.links[i];if(x.constructor==Array){var el=$.new("a").text(x[0]).attr("href",x[1]);if(Navbar.extern_in_new_window&&x[1].match("^https?://"))
el.attr("target","_blank");}else if(x.constructor==String){el=$.new("b").text(x);}else if(x<0){if(Navbar.use_hr){el=$.new("hr");}else{el=$.new("br");}
}else{el=Navbar.oldnavi.eq(x);if(Navbar.remove_plus_color)
el.text(el.text());}
Navbar.bar.append(el);}};Navbar.run=function(){
if(Navbar.remove_plus_button){if($("#plus").css("visibility","hidden").length==0){this.info("Couldn't find the plus button.");}}
var navi=$("#side_navi");if(navi.length==0){this.warning("Couldn't find sidebar.");return;}
var logo=navi.find("#logo");if(Navbar.remove_home_link)
logo.attr("href",location.href);Navbar.oldnavi=navi.find("p>a");Navbar.oldnavi.detach();navi.find("p").remove();Navbar.bar=$.new("p");logo.after(Navbar.bar);
Navbar.fill();};Navbar.call('init',true);$(function(){Navbar.call('run',true);});
// FILE resources.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
Feature.create("Resources",new Error(21));Resources.s.enabled.description="Turn on resource and resource rate collection.";Resources.init=function(){Resources.setting("display",true,Settings.type.bool,undefined,"Turn the resource/minute display on the resource bar on/off");Resources.setting("market",{},Settings.type.object,undefined,"An array of length 4 containing the amount of resources currently available for sale on the marketplace. Might often be inaccurate.");Resources.setting("production",{},Settings.type.object,undefined,"An array of length 4 containing the production rates of resp. wood, clay, iron and grain. (amount produced per hour)");Resources.setting("storage",{},Settings.type.object,undefined,"An array of length 7 containing the stored values of wood, clay, iron and grain, the size of the warehouse, the size of the granary, and then a timestamp indicating when this was taken.");Resources.setting("troops",{},Settings.type.object,"A village-id indexed array with the amount of troops that are currently in that village.");};Resources.show=function(){var head=document.getElementById("res");if(head!=null){head.style.top="90px";head=head.childNodes[1].childNodes[1];var mkt=Resources.market[Settings.outpost_id];var prod=Resources.production[Settings.outpost_id];mkt=(mkt==undefined)?[0,0,0,0]:mkt;prod=(prod==undefined)?['?','?','?','?']:prod;cur=head.textContent.split("\n").filter(function(x){return x[0]>='0'&&x[0]<='9';});var a="";for(var i=0;i<4;i++){var c=(mkt[i]>0)?("+"+mkt[i]+" "):("");var p=(prod[i]=='?')?'?':((prod[i]>0?"+":"")+Math.round(prod[i]/6)/10.0);a+="<td></td><td style=\"color: gray; font-size: 80%; text-align: center;\">"+c+p+"/m</td>";}
a+="<td></td><td></td>";var tr=document.createElement("tr");head.appendChild(tr);tr.innerHTML=a;}else{this.warning("Could not find resources bar.");}};Resources.update=function(){var x=document.getElementById("market_sell");if(x!=null){x=x.childNodes[3].childNodes;var mkt=new Array(0,0,0,0);for(var i=1;i<x.length;i++){var c=x[i].childNodes[5].textContent-0;var t=x[i].childNodes[3].firstChild.src.match("\\d")-1;mkt[t]+=c;}
this.info("This is on the market: "+mkt);Resources.market[Settings.outpost_id]=mkt;Resources.s.market.write();}else{this.debug("No marketplace info found");}
Resources.res_names=[];Resources.storage[Settings.outpost_id]=[];Resources.production[Settings.outpost_id]=[];for(var i=0;i<4;i++){var e=document.getElementById('l'+(4-i));Resources.storage[Settings.outpost_id][i]=parseInt(e.textContent.split('/')[0]);Resources.production[Settings.outpost_id][i]=parseInt(e.title);Resources.res_names[i]=e.previousSibling.previousSibling.childNodes[0].title;if(i>=2)Resources.storage[Settings.outpost_id][i+2]=parseInt(e.textContent.split('/')[1]);}
this.info("Found the following resources storage: "+Resources.storage[Settings.outpost_id].join(" - "));this.info("Found the following resources production: "+Resources.production[Settings.outpost_id].join(" - "));Resources.storage[Settings.outpost_id][6]=new Date().getTime();if(location.href.indexOf('dorf1.php')>=0){Resources.troops[Settings.outpost_id]={};var x=document.evaluate('//div[@id="troop_village"]/table/tbody/tr',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);if(x.snapshotLength>0){if(x.snapshotItem(0).childNodes.length>1){for(var i=0;i<x.snapshotLength;i++){var row=x.snapshotItem(i);var type;if(row.childNodes[1].innerHTML.indexOf('unit uhero')>=0)type='hero';else type=row.childNodes[1].childNodes[0].childNodes[0].className.match('u(\\d\\d?)$')[1];var amount=row.childNodes[3].textContent;Resources.troops[Settings.outpost_id][type]=parseInt(amount);}}}
else{x=document.getElementById("troops").childNodes[2].childNodes;for(var i=0;i<x.length;i++){var row=x[i];if(row.childNodes.length>1){var type;if(row.childNodes[1].innerHTML.indexOf('unit uhero')>=0)type='hero';else type=row.childNodes[1].childNodes[0].childNodes[0].className.match('u(\\d\\d?)$')[1];var amount=row.childNodes[3].textContent;Resources.troops[Settings.outpost_id][type]=parseInt(amount);}}
this.info("Found the following troops: "+uneval(Resources.troops[Settings.outpost_id]));}}
Resources.s.storage.write();Resources.s.production.write();Resources.s.troops.write();};Resources.at_time=function(time,did){if(did==undefined)did=Settings.outpost_id;var store=Resources.storage[did];var prod=Resources.production[did];var diff=(time-store[6])/3600000;var out=[0,0,0,0,store[4],store[5]];var arriving=[0,0,0,0];if(Events.predict_merchants){for(var i in Events.events[did]){var e=Events.events[did][i];if(e[2].indexOf(Events.merchant_receive)<0)continue;if(e[1]<store[6]||e[1]>time)continue;for(var j in e[4])arriving[j]-=e[4][j];}}
for(var i=0;i<4;i++){out[i]=Math.round(store[i]-(-diff*prod[i])-arriving[i]);var cap=store[i<3?4:5];if(out[i]<0)out[i]=0;else if(out[i]>cap)out[i]=cap;}
return out;};Resources.run=function(){Resources.update();if(Resources.display)Resources.show();};Resources.call('init',true);$(function(){Resources.call('run',true);});
// FILE market.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
Feature.create("Market",new Error(21));Market.s.enabled.description="Enable market buy page enhancements";Market.init=function(){Market.setting("add_ratio",true,Settings.type.bool,undefined,"Add a column with the exchange ratio");Market.setting("use_colors",true,Settings.type.bool,undefined,"Color the market offers to quickly determine their value");Market.setting("remove_unavailable",false,Settings.type.bool,undefined,"Remove lines that have a 'not enough resources' button");};
Market.update=function(container){if(Market.add_ratio){
var tds=container.find("thead tr+tr td");if(tds.length==5){$(tds.get(4)).before($.new("td").text("Ratio"));}}
container.find("[colspan='5']").attr("colspan",6);var rows=container.find("tr");var remove=false;rows.each(function(){$this=$(this);var cells=$this.find(".p13");if(cells.length!=2){if(remove)$this.remove();return;}
if(Market.remove_unavailable&&$this.find(".buttonError").length>0){$this.remove();remove=true;return;}else{remove=false;}
var a=cells.eq(0).text().replace(/[.,]/g,"")-0;var b=cells.eq(1).text().replace(/[.,]/g,"")-0;r=a/b;
if(Market.add_ratio){var green=(r<1)?0:3-3/r;var red=(r>1)?0:2-2*r;if(green>1)green=1;if(red>1)red=1;
var el=$.new("td").text(Math.round(r*100)+"%").css({textAlign:"right",fontSize:"85%",color:Market.color(red,green,0),});if(r>=0){el.css("fontWeight","bold");}
$this.find("td").eq(4).before(el);}
if(Market.use_colors){var red=(r<1)?1:1/r;var green=(r>1)?1:r;$this.css("backgroundColor",Market.color(red*.2+.8,green*.2+.8,0.8));
}});};Market.color=function(r,g,b,a){if(a)return"rgba("+Math.round(255*r)+","+Math.round(255*g)+","+Math.round(255*b)+","+a.toFixed(2)+")";return"rgb("+Math.round(255*r)+","+Math.round(255*g)+","+Math.round(255*b)+")";}
Market.run=function(){Market.buy=$(".buyMarket>.extraTable table");if(Market.buy.length>0){if(Market.add_ratio)
GM_addStyle("#range .act.none {font-size: 75%;}");if(Market.use_colors)
GM_addStyle("#range tbody td {background: none !important;}");
Market.update(Market.buy);}};Market.call('init',true);$(function(){Market.call('run',true);});
// FILE events.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org.licenses/>
 *****************************************************************************/
Feature.create("Events",new Error(21));Events.s.enabled.description="Enable the event data collector";Events.init=function(){Events.setting("history",1440,Settings.type.integer,undefined,"The time that events will be retained after happening, before being removed (in minutes)");Events.setting("type",{building:'rgb(0,0,0)',attack:'rgb(255,0,0)',market:'rgb(0,128,0)',research:'rgb(0,0,255)',party:'rgb(255,128,128)',demolish:'rgb(128,128,128)',overflow:'rgb(150,0,150)',},Settings.type.none,undefined,"List of event types");Events.setting("events",{},Settings.type.object,undefined,"The list of collected events.");Events.setting("predict_merchants",false,Settings.type.bool,undefined,"Use the sending of a merchant to predict when it will return back, and for internal trade add an event to the recieving "+Settings.outpost_name+" too");Events.setting("merchant_send",'Transport to',Settings.type.string,undefined,"This is the translation of the string that comes just before the village name on outgoing merchants. It must be identical (with no trailing whitespace) or it won't work.",'! Events.predict_merchants');Events.setting("merchant_receive",'Transport from',Settings.type.string,undefined,"This is the translation of the string that comes just before the village name on incoming merchants. It must be identical (with no trailing whitespace) or it won't work.",'! Events.predict_merchants');Events.setting("merchant_return",'Return from',Settings.type.string,undefined,"This is the translation of the string that comes just before the village name on returning merchants. It must be identical (with no trailing whitespace) or it won't work.",'! Events.predict_merchants');
display_options=['Collect','Show in Time Line','Show in Tooltip'];Events.setting('building',[1,1,1],Settings.type.set,display_options,"Keep track of what you build [from "+"the planet overview]");Events.setting('attack',[1,1,1],Settings.type.set,display_options,"Keep track of all incoming and outgoing "+"fleets [from the fleet base]");Events.setting('market',[1,1,1],Settings.type.set,display_options,"Keep track of incoming and outgoing merchants, and what they're carrying [from the market/trade center]");Events.setting('research',[1,1,1],Settings.type.set,display_options,"Keep track of what is being researched [from the "+"research center]");Events.setting('party',[1,1,1],Settings.type.set,display_options,"Keep track of parties [from the town hall]");Events.setting('demolish',[1,1,1],Settings.type.set,display_options,"Keep track of demolished buildings [from the "+"construction yard]");Events.setting('overflow',[1,1,0],Settings.type.set,display_options,"Keep track of resource overflows [from every page]");Events.setting('send_twice',false,Settings.type.boolean,undefined,"Internal persistent data only. This records whether the 'send twice' box was checked on the previous page, when sending merchants.");};Events.test_event=function(village,id){if(Events.events[village]==undefined)return false;if(Events.events[village][id]==undefined)return false;return true;}
Events.get_event=function(outpost,id,overwrite){var e=Events.events[outpost];if(e==undefined){e={};Events.events[outpost]=e;Events.debug("Added outpost: "+outpost);}
e=Events.events[outpost][id];if(e==undefined||overwrite===true){e=[];Events.events[outpost][id]=e;Events.debug("Created event: "+id);}
return e;};Events.update_data=function(){Events.s.events.read();for(var c in Events.collector){try{if(Events[c][0])
Events.collector[c]();}catch(e){Events.exception("Events.collector."+c,e);}}
Events.pageload=new Date().getTime();Events.old=Events.pageload-Events.history*60000;for(var v in Events.events){for(var e in Events.events[v]){if(Events.events[v][e][1]<Events.old){delete Events.events[v][e];}else{}}}
Events.s.events.write();};Events.run=function(){Events.update_data();};Events.collector={};Events.collector.building=function(){var table=$("#buildingQueue table tr td.fontCenter a");Events.debug("Collecting "+table.length+" build tasks.");table.each(function(){var $this=$(this);
var id='b'+$this.find(".ico a").attr("href").match('\\?d=(\\d+)&')[1];
var e=Events.get_event(Settings.outpost_id,id);e[0]="building";var d=new tl_date(Events);var cells=$this.find("td");e[2]=cells.eq(1).text();
d.set_time(cells.eq(3).text().match('(\\d\\d?):(\\d\\d) ?([a-z]*)'));var duration=cells.eq(2).text().match('(\\d\\d?):(\\d\\d):(\\d\\d)');d.adjust_day(duration);d.set_seconds(duration);
e[1]=d.get_time();Events.debug("Time set to "+e[1]);cells.eq(0).find("a").bind('click',function(e){Events.info('Removing the building event Events.events['+Settings.outpost_id+']['+id+']');delete Events.events[Settings.outpost_id][id];Events.s.events.write();});});};Events.collector.attack=function(){if(location.href.indexOf('build.php')<0)return;if(location.href.indexOf('gid=16')<0&&location.href.indexOf('id=39')<0)return;var res=xpath('//table[@class="troop_details"]');var last_event_time=0;var event_count=0;for(var i=0;i<res.snapshotLength;i++){x=res.snapshotItem(i);var units=xpath('./tbody[@class="units"]',x,'any').singleNodeValue;var infos=xpath('./tbody[@class="infos"]',x,'ordered');if(infos.snapshotLength==2){var resources=xpath('./tr/td/div[@class="res"]',infos.snapshotItem(0),'any').singleNodeValue.textContent.split(' |');var info=infos.snapshotItem(1);}
else if(infos.snapshotLength==1){var resources=[];var info=infos.snapshotItem(0);}
else return;var d=new tl_date(Events);var arrival=xpath('./tr/td/div[starts-with(@class, "at")]',info,'any').singleNodeValue;if(!arrival)continue;d.set_time(arrival.textContent.match('(\\d\\d?)\\:(\\d\\d)\\:(\\d\\d) ?([a-z]*)'));var duration=xpath('./tr/td/div[starts-with(@class, "in")]',info,'any').singleNodeValue.textContent.match('(\\d\\d?):\\d\\d:\\d\\d');var t=d.adjust_day(duration);var msg=xpath('./thead/tr/td[not(@class="role")]/a[starts-with(@href, "karte.php")]',x,'any').singleNodeValue.textContent;var dest=xpath('./thead//td[@class="role"]/a',x,'any').singleNodeValue.textContent;var attacking=false;for(var j in Settings.outpost_names)if(msg.indexOf(Settings.outpost_names[j])>=0){attacking=true;break;}
if(attacking)msg=dest+': '+msg;if(last_event_time==t)event_count++;else last_event_time=t;var e=Events.get_event(Settings.outpost_id,"a"+t+"_"+event_count);e[0]="attack";e[1]=d.set_seconds(duration);e[2]=msg;e[3]=[units.childNodes[0].childNodes[1].childNodes[0].className.match(/u(\d?)1$/)[1]-0];for(var j=0;j<12;j++){var y=units.childNodes[1].childNodes[j+1];if(y!=undefined)
e[3][j+1]=y.textContent-0;else
e[3][j+1]=0;}
if(resources!=undefined){e[4]=[];for(var j=0;j<resources.length;j++)if(resources[j]>0)e[4][j]=resources[j];}
var a=xpath('./tr/td/img[@class="del"]',info,'any').singleNodeValue;if(a!=undefined)a.addEventListener('click',function(e){Events.info('Removing the attack event Events.events['+Settings.outpost_id+'][a'+t+'_'+event_count+']');delete Events.events[Settings.outpost_id]['a'+t+'_'+event_count];Events.s.events.write();},false);}};Events.collector.market=function(){if(location.href.indexOf('build.php')<=0)return;if(document.getElementById('btn_ok')==undefined)return;var last_event_time=0;var event_count=0;var now=new Date().getTime();var type_A=function(){var e=Events.get_event(Settings.outpost_id,"a"+t+"_"+event_count);e[0]="market";e[1]=ts;e[2]=msg;if(!ret)e[4]=res;}
var type_B=function(hash){var coord=id_xy(hash);var x=coord[0]-parseInt(Settings.outpost_coord[0]);var y=coord[1]-parseInt(Settings.outpost_coord[1]);var dist=Math.sqrt(x*x+y*y);Events.info('Merchant is travelling '+dist+' squares');var time=(dist/([16,12,24][Settings.race]))*3600000;var rtn_t=t+time;var rtn_ts=ts+time;var e=Events.get_event(Settings.outpost_id,'a'+rtn_t+'_'+event_count);e[0]='market';e[1]=rtn_ts;e[2]=Events.merchant_return+msg.split(Events.merchant_send)[1];}
var type_C=function(did){var e=Events.get_event(did,'a'+t+'_'+event_count);e[0]='market';e[1]=ts;e[2]=Events.merchant_receive+' '+Settings.outpost_names[Settings.outpost_id];e[4]=res;}
var predict=function(){if(ret)return;var send=msg.indexOf(Events.merchant_send)>=0;var coord=id_xy(hash);Events.info('Looking for a village with x='+coord[0]+' and y='+coord[1]);var a=xpath('//table[@id="vlist"]/tbody/tr/td[@class="aligned_coords"]');for(var i=0;i<a.snapshotLength;i++){var b=a.snapshotItem(i);var internal=b.textContent.match('\\('+coord[0])&&b.textContent.match(coord[1]+'\\)')!=null;if(internal){var did=b.previousSibling.childNodes[0].href.match(/\?newdid=(\d+)/)[1];break;}}
Events.info(msg+' | send='+send+' internal='+internal);if(Events.test_event(Settings.outpost_id,'a'+t+'_'+event_count))return;if(send||!internal)type_A();if(send)type_B(hash);if(send&&internal)type_C(did);if(send&&Events.send_twice){var then=now;now=2*t-now;t=3*t-2*(then);type_A();type_B();if(internal)type_C(did);Events.send_twice=false;Events.s.send_twice.write();}}
var shipment=xpath('//table[@class="traders"]');for(var i=0;i<shipment.snapshotLength;i++){var x=shipment.snapshotItem(i);var d=new tl_date(Events);d.set_time(x.rows[1].cells[2].textContent.match(/(\d\d?):(\d\d) ?([a-z]*)/));var duration=x.rows[1].cells[1].textContent.match(/(\d\d?):(\d\d):(\d\d)/);var t=d.adjust_day(duration);var ts=d.set_seconds(duration);if(last_event_time==t)event_count++;else last_event_time=t;var res=x.rows[2].cells[1].textContent.split(' | ');Events.debug("Merchant carrying "+res);var msg=x.rows[0].cells[1].textContent;var hash=x.rows[0].cells[1].childNodes[0].href.match(/\?d=(\d*)/)[1];var ret=x.rows[2].cells[1].childNodes[0].className=='none';if(ret)Events.debug("Merchant is returning");if(Events.predict_merchants)predict();else type_A();}
if(Events.predict_merchants){var x2=document.getElementsByName('x2')[0];if(x2!=undefined){Events.send_twice=false;Events.s.send_twice.write();x2.parentNode.nextSibling.childNodes[0].addEventListener('click',function(){if(x2.checked){Events.send_twice=true;Events.s.send_twice.write();}},false);}}};Events.collector.research=function(){if(location.href.indexOf('build.php')<0)return;var x=document.evaluate('//table[@class="std build_details"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);if(x.snapshotLength<2){x=document.evaluate('//table[@class="tbg"]/tbody/tr[not(@class)]/td[(@width="6%") and (position()<2)]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);if(x.snapshotLength!=1)return;x=x.snapshotItem(0).parentNode;var d=new tl_date(Events);d.set_time(x.childNodes[7].textContent.match(/(\d\d?):(\d\d) ?([a-z]*)/));var duration=x.childNodes[5].textContent.match(/(\d\d?):\d\d:\d\d/);var t=d.adjust_day(duration);var type=x.childNodes[3].textContent;var building=x.parentNode.parentNode.previousSibling.previousSibling.childNodes[1].childNodes[0].childNodes[1].textContent;}
else{var tr=x.snapshotItem(1).childNodes[1];var d=new tl_date(Events);d.set_time(tr.childNodes[5].textContent.match('(\\d\\d?):(\\d\\d) ?([a-z]*)'));var duration=tr.childNodes[3].textContent.match('(\\d\\d?):\\d\\d:\\d\\d');var t=d.adjust_day(duration);var type=tr.childNodes[1].childNodes[3].textContent;Events.debug("Upgrading "+type);var building=x.snapshotItem(0).previousSibling.previousSibling.childNodes[1].childNodes[1].textContent;Events.debug("Upgrading at the "+building);for(var i in x.snapshotItem(0).childNodes){var y=x.snapshotItem(0).childNodes[i];if(y.childNodes.length==0)continue;var level=y.childNodes[1].textContent.match(type+' (\\([A-Z][a-z]* )(\\d\\d?)(\\))');if(level){level[2]-=-1;level=level[1]+level[2]+level[3];Events.debug("Upgrading to "+level);break;}}}
var e=Events.get_event(Settings.outpost_id,t+building);e[0]='research';e[1]=d.set_seconds(duration);e[2]=building+': '+type+(level==undefined?'':' '+level);};Events.collector.party=function(){if(location.href.indexOf('build.php')<0)return;var x=document.evaluate('//table[@class="tbg"]/tbody/tr[not(@class="cbg1")]/td[(position()=2) and (@width="25%")]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);if(x.snapshotLength!=1)return;x=x.snapshotItem(0).parentNode;Events.info('Found a party event!');var d=new tl_date(Events);d.set_time(x.childNodes[5].textContent.match('(\\d\\d?):(\\d\\d) ([a-z]*)'));var duration=x.childNodes[3].textContent.match('(\\d\\d?):\\d\\d:\\d\\d');d.adjust_day(duration);var t=d.set_seconds(duration);var msg=x.childNodes[1].textContent;Events.info('Party type = '+msg);var e=Events.get_event(Settings.outpost_id,'party',true);e[0]='party';e[1]=t;e[2]=msg;};Events.collector.demolish=function(){if(location.href.indexOf('build.php')<0)return;var x=document.evaluate('//img[@class="del"]',document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue;if(x==undefined)return;x=x.parentNode.parentNode.parentNode;var d=new tl_date(Events);event_time=x.childNodes[3].textContent.match('(\\d\\d?):(\\d\\d) ?([a-z]*)')
event_duration=x.childNodes[2].textContent.match('(\\d\\d?):\\d\\d:\\d\\d')
if(event_time==null||event_duration==null){Events.debug("Got demolish event false positive.");return;}
d.set_time(event_time);var t=d.adjust_day(event_duration);var msg=x.childNodes[1].textContent;var msg=x.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.textContent+' '+msg;var e=Events.get_event(Settings.outpost_id,t);e[0]='demolish';e[1]=d.set_seconds(event_duration);e[2]=msg;x.childNodes[0].addEventListener('click',function(e){Events.info('Removing the demolition event Events.events['+Settings.outpost_id+']['+t+']');delete Events.events[Settings.outpost_id][t];Events.s.events.write();},false);};Events.collector.overflow=function(){if(Resources.enabled==false)return;var stor=Resources.storage[Settings.outpost_id];var prod=Resources.production[Settings.outpost_id];for(var i=0;i<4;i++){var s=stor[i];var p=prod[i];var size=i==3?stor[5]:stor[4];var t;if(p>0)t=(size-s)/p;else if(p==0)t=-1;else t=s/(-p);var time=Math.round(new Date().getTime()+t*3600000);var e=Events.get_event(Settings.outpost_id,'overflow'+i,true);e[0]='overflow';e[1]=time;e[2]=Resources.res_names[i];}};Events.call('init',true);$(function(){Events.call('run',true);});
// FILE timeline.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
Feature.create("Timeline",new Error(21));Timeline.s.enabled.description="Enable the timeline (make sure that the events feature is also enabled).";Timeline.init=function(){Timeline.setting("collapse",true,Settings.type.bool,undefined,"Make the timeline very small by default and expand it when the mouse hovers above it.");Timeline.setting("keep_updated",true,Settings.type.bool,undefined,"Update the timeline every 'Timeline.update_interval' msec.");Timeline.setting("report_info",true,Settings.type.bool,undefined,"Show the size of the army, the losses and the amount of resources stolen");Timeline.setting("color","rgba(0, 0, 32, 0.7)",Settings.type.string,Settings.previews.color,"Background color of the timeline");Timeline.setting("width",400,Settings.type.integer,undefined,"Width of the timeline (in pixels)");Timeline.setting("duration",300,Settings.type.integer,undefined,"The total time displayed by the timeline (in minutes)");Timeline.setting("marker_seperation",10,Settings.type.integer,undefined,"Mean distance between markers (in pixels)");Timeline.setting("collapse_width",65,Settings.type.integer,undefined,"Width of the timeline when collapsed (in pixels)");Timeline.setting("collapse_delay",200,Settings.type.integer,undefined,"The time it takes to unfold/collapse the timeline (in milliseconds)");Timeline.setting("update_interval",30000,Settings.type.integer,undefined,"Interval between timeline updates. (in milliseconds)");
Timeline.setting("scale_warp",0,Settings.type.integer,undefined,"Amount of timeline scale deformation. 0 = Linear, 4 = Normal, 8 = Max.");Timeline.setting("visible",true,Settings.type.bool,undefined,"Is the timeline visible on pageload. This setting can also be changed with the timeline-button.");Timeline.scroll_offset=0;if(Timeline.scale_warp==0){Timeline.warp=function(x){return(((x-Timeline.now-Timeline.scroll_offset)/Timeline.duration/60000)+1)/2*Timeline.height;};Timeline.unwarp=function(y){return(2*y/Timeline.height-1)*Timeline.duration*60000+Timeline.now+Timeline.scroll_offset;};}else{Timeline.warp=function(x){return(Math.arsinh(((x-Timeline.now-Timeline.scroll_offset)/Timeline.duration/60000)*(2*Math.sinh(Timeline.scale_warp/2)))/Timeline.scale_warp+1)/2*Timeline.height;};Timeline.unwarp=function(y){return Math.sinh((2*y/Timeline.height-1)*Timeline.scale_warp)/(2*Math.sinh(Timeline.scale_warp/2))*Timeline.duration*60000+Timeline.now+Timeline.scroll_offset;};}};Timeline.delayed_draw=function(){if(Timeline.delayed_draw_timeout)clearTimeout(Timeline.delayed_draw_timeout);Timeline.delayed_draw_timeout=setTimeout(Timeline.draw,100);}
Timeline.create_canvas=function(){Timeline.canvas=$.new("canvas");Timeline.element=$.new("div");$(window).resize(Timeline.delayed_draw);Timeline.canvas.attr({width:Timeline.width,}).css({position:"absolute",right:"0px"});Timeline.element.css({position:"fixed",top:"0px",right:"0px",width:(Timeline.collapse?Timeline.collapse_width:Timeline.width)+"px",zIndex:"20000",backgroundColor:Timeline.color,visibility:Timeline.visible?'visible':'hidden',overflow:"hidden",outline:"1px solid #333"}).append(Timeline.canvas);$(document.body).append(Timeline.element);if(Timeline.collapse){Timeline.element.mouseenter(function(){if(Timeline.visible)
Timeline.element.stop().animate({width:Timeline.width},Timeline.collapse_delay);});Timeline.element.mouseleave(function(){if(Timeline.visible)
Timeline.element.stop().animate({width:Timeline.collapse_width},Timeline.collapse_delay);});}
Timeline.element.bind('DOMMouseScroll',Timeline.mouse_wheel);Timeline.context=Timeline.canvas.get(0).getContext("2d");Timeline.context.mozTextStyle="8pt Monospace";};Timeline.mouse_wheel=function(e){Timeline.scroll_offset+=e.detail*Timeline.duration*1200;e.stopPropagation();e.preventDefault();Timeline.delayed_draw();};Timeline.toggle=function(){Timeline.visible=!Timeline.visible;Timeline.element.css({visibility:Timeline.visible?'visible':'hidden'});Timeline.s.visible.write();if(Timeline.visible)
Timeline.delayed_draw();};Timeline.create_button=function(){button=$.new("div");button.css({position:"fixed",backgroundColor:"rgba(64,64,64,0.5)",right:"0px",top:"-2px",width:"65px",height:"17px",zIndex:40000,textAlign:"center",color:"#ccc",fontWeight:"bold",fontSize:"12px",MozBorderRadiusBottomleft:"6px",cursor:"pointer"});button.click(Timeline.toggle);button.text("time line");$(document.body).append(button);};Timeline.draw_scale=function(){var g=Timeline.context;g.translate(Timeline.width-9.5,0);g.strokeStyle="rgb(128,192,255)";g.beginPath();g.moveTo(0,0);g.lineTo(0,Timeline.height);g.stroke();g.fillStyle="rgb(204,204,255)";var lastmark=0;for(var i=Timeline.marker_seperation/2;i<Timeline.height;i+=Timeline.marker_seperation){var z=Timeline.unwarp(i+Timeline.marker_seperation/2)-Timeline.unwarp(i-Timeline.marker_seperation/2);if(z<1000)z=1000;else if(z<5000)z=5000;else if(z<15000)z=15000;else if(z<60000)z=60000;else if(z<300000)z=300000;else if(z<900000)z=900000;else if(z<3600000)z=3600000;else if(z<21600000)z=21600000;else if(z<86400000)z=86400000;else continue;var x=Timeline.unwarp(i);x=Math.round(x/z)*z;var y=Timeline.warp(x);if(x<=lastmark)continue;lastmark=x;var a=-8;var b=0;var m="";var d=new Date();d.setTime(x);var t=d.getHours()+":"+d.getMinutes().pad2();if((x%3600000)==0&&d.getHours()==0){b=8;m=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]+" "+d.getDate()+" "+
["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]+" - 0:00";}
else if((x%3600000)==0&&d.getHours()%6==0){b=8;if(z<21600000)m=t;}
else if((x%3600000)==0){b=4;if(z<3600000)m=t;}
else if((x%900000)==0){a=-6;if(z<900000)m=t;}
else if((x%300000)==0){a=-4;if(z<300000)m=t;}
else if((x%60000)==0){a=-2;if(z<60000)m=t;}
else if((x%15000)==0){a=-1;}
else if((x%5000)==0){a=0;b=1;}
else if((x%1000)==0){a=0;b=2;}
g.beginPath();g.moveTo(a,y);g.lineTo(b,y);g.stroke();if(m){g.save();g.translate(-g.mozMeasureText(m)-10,4+y);g.mozDrawText(m);g.restore();}}};Timeline.draw=Timeline.guard("draw",function(){if(!Timeline.visible)return;if(Timeline.delayed_draw_timeout)clearTimeout(Timeline.delayed_draw_timeout);if(Timeline.height!=window.innerHeight){Timeline.height=window.innerHeight;Timeline.element.css("height",Timeline.height+"px");Timeline.canvas.attr("height",Timeline.height);}
Timeline.now=new Date().getTime();var g=Timeline.context;g.clearRect(0,0,Timeline.width,Timeline.height);g.save();var y=Timeline.warp(Timeline.now);var y2=Timeline.warp(Events.pageload);g.fillStyle="rgba(204,255,128,0.2)";g.fillRect(0,y,Timeline.width,y2-y);var y3=Timeline.warp(Events.old);g.fillStyle="rgba(64,64,64,0.5)";if(y3>0)
g.fillRect(0,0,Timeline.width,y3);Timeline.draw_scale();g.strokeStyle="rgb(0,0,255)";g.beginPath();g.moveTo(-8,y);g.lineTo(4,y);g.lineTo(6,y-2);g.lineTo(8,y);g.lineTo(6,y+2);g.lineTo(4,y);g.stroke();g.fillStyle="rgb(0,0,255)";var d=new Date();d.setTime(Timeline.now);var m=d.getHours()+":"+d.getMinutes().pad2();g.save();g.translate(-g.mozMeasureText(m)-10,4+y);g.mozDrawText(m);g.restore();function left(q){if(q.constructor==Array)
return q[0]-q[1];else
return q-0;}
Events.s.events.read();Settings.s.outpost_names.read();Settings.s.race.read();
var events=Events.events;for(v in events){try{var outpost="";if(v>0){outpost=Settings.outpost_names[v];if(!outpost)outpost="["+v+"]";}
for(e in events[v]){Timeline.draw_event(outpost,events[v][e]);}}catch(e){Timeline.exception("Timeline.draw",e);}}
g.restore();});Timeline.draw_event=Timeline.guard("draw_event",function(outpost,event){var color=Events.type[event[0]];var y=Timeline.warp(event[1]);if(isNaN(y))return;if(y<-20||y>Timeline.height+20)return;if(!Events[event[0]][1])return;var g=Timeline.context;if(Events.predict_merchants&&event[0]=='market'&&event[2].indexOf(Events.merchant_send)>=0)return;g.strokeStyle=color;g.beginPath();g.moveTo(-10,y);g.lineTo(-50,y);g.stroke();g.fillStyle="rgb(0,64,255)";g.save();g.translate(20-Timeline.width,y-5);g.mozDrawText(outpost);g.restore();g.fillStyle="rgb(64,255,64)";g.save();g.translate(20-Timeline.width,y+4);g.mozDrawText(event[2]);g.restore();if(Timeline.report_info){g.save();g.translate(-45,y+4+12);if(event[4]){g.fillStyle="rgb(192,64,0)";for(var i=3;i>=0;i--){Timeline.draw_info(Timeline.resources,event[4][i],i,16,9);}}
if(event[3]){g.fillStyle="rgb(0,0,255)";var img=Timeline.units[event[3][0]-1];for(var i=12;i>=0;i--){if(i==10)Timeline.draw_info(Timeline.hero,event[3][i+1],7,16,16);
Timeline.draw_info(img,event[3][i+1],i,16,16);}}
g.restore();}});Timeline.draw_info=function(img,nrs,pos,width,height){if(!nrs)return;var g=Timeline.context;try{if(img.constructor==Array){img=img[pos];pos=0;}
g.translate(-width,0);g.drawImage(img,img.creator.width*pos,0,img.creator.width,img.creator.height,-3.5,-height/2-4,width,height);}catch(e){var fs=g.fillStyle;g.fillStyle="rgb(128,128,128)";g.translate(-24,0);g.mozDrawText("??");g.fillStyle=fs;Timeline.exception("Timeline.draw_info",e);}
if(nrs.constructor==Array){g.fillStyle="rgb(192,0,0)";g.translate(-g.mozMeasureText(-nrs[1])-2,0);g.mozDrawText(-nrs[1]);g.fillStyle="rgb(0,0,255)";g.translate(-g.mozMeasureText(nrs[0]),0);g.mozDrawText(nrs[0]);}else{g.translate(-g.mozMeasureText(nrs)-2,0);g.mozDrawText(nrs);}};Timeline.run=function(){Timeline.create_canvas();Timeline.create_button();Timeline.resources=Images.resources.stamp();Timeline.units=[Images.romans.stamp(),Images.teutons.stamp(),Images.gauls.stamp(),Images.nature.stamp(),Images.natars.stamp(),Images.monsters.stamp()];Timeline.hero=Images.hero.stamp();

if(Timeline.keep_updated)
window.setInterval(Timeline.draw,Timeline.update_interval);Timeline.draw();};Timeline.call('init',true);$(function(){Timeline.call('run',true);});
// FILE tooltip.js
/*****************************************************************************
 * Copyright (C) 2008, 2009, 2010 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org/licenses/>
 *****************************************************************************/
Feature.create("Tooltip",new Error(21));Tooltip.s.enabled.description="Enable the Village Tooltip (ensure the event collection feature is also enabled).";Tooltip.init=function(){Tooltip.setting('relative_time',true,Settings.type.bool,undefined,"Show times relative to the present, as opposed to the time of day.");Tooltip.setting("show_info",true,Settings.type.bool,undefined,"Show additional info about units and resources involved with the events.",'! Events.enabled');Tooltip.setting('seperate_values',false,Settings.type.bool,undefined,"Seperate the event values from each other with |'s. Show info must be true.",'! (Tooltip.show_info && Events.enabled)');Tooltip.setting('merchant_kilo_values',true,Settings.type.bool,undefined,"Show merchant trading values in 1000's, rather than 1's. Show info must be true.",'! (Tooltip.show_info && Events.enabled)');Tooltip.setting('army_kilo_values',true,Settings.type.bool,undefined,"Show army movement values in 1000's, rather than 1's. Show info must be true.",'! (Tooltip.show_info && Events.enabled)');Tooltip.setting('show_warehouse_store',true,Settings.type.bool,undefined,"Display the estimated warehouse stores at the top of each tooltip. Resource collection must be on.",'! Resources.enabled');Tooltip.setting('cycle_warehouse_info',true,Settings.type.bool,undefined,"Only show one piece of warehouse info. Change the type by clicking on the info.",'! (Tooltip.show_warehouse_store && Resources.enabled)');Tooltip.setting('resource_kilo_values',true,Settings.type.bool,undefined,"Show resource storage values in 1000's, rather than 1's. Show warehouse store must be true.",'! (Tooltip.show_warehouse_store && Resources.enabled)');Tooltip.setting('show_troops',true,Settings.type.bool,undefined,"Show stored values for troops in the header.",'! Resources.enabled');Tooltip.setting('refresh_data',true,Settings.type.bool,undefined,"Refresh data for ancient tooltips");Tooltip.setting('refresh_threshold',12,Settings.type.integer,undefined,"The time threshold that must be passed before the script will fetch the latest data for you (in hours)");Tooltip.setting("mouseover_delay",500,Settings.type.integer,undefined,"The delay length before the tool tip appears (in milliseconds)");Tooltip.setting("mouseout_delay",300,Settings.type.integer,undefined,"The delay length before the tool tip disappears (in milliseconds)");Tooltip.setting('header_rotation',[0,0],Settings.type.object,undefined,"unknown");Tooltip.setting("summary_rotation_type",0,Settings.type.integer,undefined,"unknown");Tooltip.setting("summary_rotation",[0,0],Settings.type.object,undefined,"unknown");Tooltip.header_mapping=[['wheat','percent','clock','eaten'],['troops']];Tooltip.summary_mapping=[['wheat','percent','clock','eaten'],['hammer','nohammer']];};Tooltip.overview=function(){if(!Tooltip.show_warehouse_store)return;var anchor=document.getElementById('vlist');if(anchor==undefined)return;anchor=anchor.childNodes[0];var div=Tooltip.make_tip(anchor,function(){var type=Tooltip.summary_rotation_type;var rota=Tooltip.summary_rotation[type];var txt='<table class="f10" width="100%" style="font-size:11px; border-bottom: solid black 1px; cursor:pointer"><tbody><tr>';for(var i in Tooltip.summary_mapping){txt+='<td width="20px">';txt+=Images[Tooltip.summary_mapping[i][Tooltip.summary_rotation[i]]];}
txt+='<td>';txt+='</tbody></table><table class="f10" style="font-size:11px;"><tbody>';div.innerHTML=txt+Tooltip.sumarize(Tooltip.summary_mapping[type][rota])+'</tbody></table>';var sel=div.childNodes[0].childNodes[0].childNodes[0].childNodes;var disp=div.childNodes[1].childNodes[0];var on_click=function(e,type){if(Tooltip.summary_rotation_type==type){Tooltip.summary_rotation[type]=(Tooltip.summary_rotation[type]+1)%Tooltip.summary_mapping[type].length;Tooltip.s.summary_rotation.write();}else{Tooltip.summary_rotation_type=type;Tooltip.s.summary_rotation_type.write();}
var result=Tooltip.summary_mapping[type][Tooltip.summary_rotation[type]];e.target.parentNode.innerHTML=Images[result];disp.innerHTML=Tooltip.sumarize(result);}
sel[0].addEventListener('click',function(e){on_click(e,0)},false);sel[1].addEventListener('click',function(e){on_click(e,1)},false);});}
Tooltip.sumarize=function(rota){var rtn='';var total=[0,0,0,0];var totalable=rota=='wheat'||rota=='eaten';var d=new Date().getTime();var vils=[];for(var did in Resources.storage){var name=Settings.outpost_names[did];var a=Tooltip.make_header(rota,d,did);if(a==-1)continue;vils.push([name,'<tr><td><a href="?newdid='+did+Tooltip.href_postfix+'">'+name+':</a>'+a[0]]);if(totalable)for(var i in total)total[i]+=a[1][i];}
vils.sort();for(var i in vils)rtn+=vils[i][1];if(totalable){rtn+='<tr><td colspan="9" style="border-top: solid black 1px;"><tr><td>Total:';for(var i=0;i<4;i++){rtn+='<td>'+Images.html(Images.res(i))+'<td>';if(Tooltip.resource_kilo_values){rtn+=Math.round_sig(Math.abs(total[i]),3);}
else rtn+=total[i];}}
return rtn;}
Tooltip.parse_event=function(e,time){var e_time=new Date();e_time.setTime(e[1]);var rtn='<td vAlign="bottom">';if(Tooltip.relative_time){var diff=e[1]-time;rtn+=Math.floor(diff/3600000)+':'+Math.floor((diff%3600000)/60000).pad2()+'</td>';}else rtn+=e_time.getHours()+':'+e_time.getMinutes().pad2()+'</td>';if(Tooltip.show_info&&(e[3]||e[4])){rtn+='<td vAlign="bottom" style="color:'+Events.type[e[0]][0]+'">'+e[2]+"</td><td>";if(e[4])for(var j=0;j<4;j++)rtn+=Tooltip.convert_info(4,j,e[4][j]);if(e[3])for(var j=0;j<11;j++)rtn+=Tooltip.convert_info(3,j,e[3][j]);rtn+='</td>';}else rtn+='<td vAlign="bottom" colspan="2" style="color:'+Events.type[e[0]][0]+'">'+e[2]+"</td>";return rtn;}
Tooltip.outpost_tip=function(anchor,did){var fill=function(){var events=[];var d=new Date();Events.s.events.read();for(var j in Events.events[did]){var e=Events.events[did][j];if(e[1]<d.getTime())continue;if(Events[e[0]]%2!=0)continue;events.push([e[1],Tooltip.parse_event(e,d.getTime())]);}
events.sort();var txt='';var time=new Date().getTime();var age=(time-store[6])/3600000;var colour=age<1?'#000':(age<2?'#444':(age<4?'#777':age<8?'#aaa':age<12?'#ddd':'#000'));if(age<12){var show_res=Tooltip.show_warehouse_store&&store!=undefined&&prod!=undefined;var show_troops=Tooltip.show_troops&&Resources.troops[did]!=undefined;var temp=false;if(show_troops){for(var i in Resources.troops[did]){temp=true;break;}
show_troops=temp;}
if(show_res||show_troops)txt+='<table width="100%" style="border-bottom: 1px solid '+colour+';"><tbody>';if(show_res){txt+='<tr><td><table style="font-size:11px; cursor:pointer;"><tbody><tr>';var header_txt=Tooltip.make_header(Tooltip.header_mapping[0][Tooltip.header_rotation[0]],time,did)[0];txt+=header_txt;txt+='</tr></tbody></table>';}
if(show_troops){txt+='<tr><td><table style="font-size:11px;"><tbody><tr>';var troop_txt=Tooltip.make_header(Tooltip.header_mapping[1][Tooltip.header_rotation[1]],time,did)[0];txt+=troop_txt;txt+='<td></tr></tbody></table>';}
if(show_res||show_troops)txt+='</tbody></table>';}
if(Tooltip.refresh_data&&age>Tooltip.refresh_threshold){var iframe=document.createElement('iframe');iframe.style.visibility='hidden';iframe.src='dorf1.php?newdid='+did;document.body.appendChild(iframe);window.setTimeout(function(){document.body.removeChild(iframe);Events.s.events.read();Resources.s.storage.read();Resources.s.production.read();Resources.s.troops.read();store=Resources.storage[did];prod=Resources.production[did];var request=new XMLHttpRequest();request.open('GET','dorf1.php?newdid='+Settings.outpost_id,true);request.send(null);this.debug('hi');div=fill();this.debug('bye');},3000);}
if(events.length>0){txt+='<table class="f10" style="font-size:11px;width:auto;"><tbody>';for(var i in events)txt+='<tr>'+events[i][1]+'</tr>';txt+='</tbody></table>';}
else txt+='IDLE!';div.innerHTML=txt;div.style.borderColor=colour;if(age<12&&show_res){var header=div.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];div.childNodes[0].childNodes[0].childNodes[0].addEventListener('click',function(e){Tooltip.header_rotation[0]=(Tooltip.header_rotation[0]+1)%Tooltip.header_mapping[0].length;Tooltip.s.header_rotation.write();header_txt=Tooltip.make_header(Tooltip.header_mapping[0][Tooltip.header_rotation[0]],new Date().getTime(),did)[0];header.innerHTML=header_txt;},false);if(events.length==0)return;var x=div.childNodes[1].childNodes[0].childNodes;for(var i in x){(function(i){x[i].addEventListener('mouseover',function(e){header.innerHTML=Tooltip.make_header(Tooltip.header_mapping[0][Tooltip.header_rotation[0]],events[i][0],did)[0];},false);})(i);x[i].addEventListener('mouseout',function(){header.innerHTML=header_txt;},false);}}}
var store=Resources.storage[did];var prod=Resources.production[did];var div=Tooltip.make_tip(anchor,fill);}
Tooltip.make_header=function(rota,time,did){var prod=Resources.production[did];if(rota=='wheat'||rota=='clock'||rota=='percent')var store=Resources.at_time(time,did);var rtn='';var values=[];switch(rota){default:for(var i=0;i<4;i++){rtn+='<td>'+Images.html(Images.res(i))+'</td>';switch(rota){default:break;case'wheat':var r=store[i];var s=store[i<3?4:5];rtn+='<td style="color:'+(prod[i]<0||s==r?'red':(s-r)/prod[i]<2?'orange':'green')+'">';if(Tooltip.resource_kilo_values)rtn+=Math.round_sig(r)+'/'+Math.round_sig(s);else rtn+=Math.round(r)+'/'+s;rtn+='</td>';values.push(r);break;case'clock':var p=prod[i];var c=store[i];var r=store[(i<3?4:5)]-c;if((r>0&&p>0)||(c>0&&p<0)){if(p==0){rtn+='<td>inf.</td>';values.push(-1);}
else{if(p>0)time=Math.floor((r/p)*3600);else time=Math.floor((c/(-1*p))*3600);rtn+='<td style="color:'+(p<0?'red':time<7200?'orange':'green')+'">';if(time>=86400)rtn+=Math.floor(time/86400)+'d ';rtn+=Math.floor((time%86400)/3600)+':'+Math.floor((time%3600)/60).pad2()+'</td>';values.push(time);}}else{rtn+='<td style="color:red">0:00</td>';values.push(0);}
break;case'eaten':rtn+='<td>'+prod[i]+'</td>';values.push(prod[i]);break;case'percent':var r=store[i];var s=store[(i<3?4:5)];var f=Math.round((r/s)*100);rtn+='<td style="color:'+(prod[i]<0||r==s?'red':(s-r)/prod[i]<2?'orange':'green')+'">';rtn+=f+'%</td>';values.push(f);break;};}
break;case'hammer':case'nohammer':for(var i in Events.events[did]){var e=Events.events[did][i];if(e[1]<time)continue;if(e[0]=="building"){if(rota=='nohammer')return-1;rtn+=Tooltip.parse_event(e,time);break;}}
if(rtn==''){rtn+='<td colspan="2">IDLE!</td>';}
break;case'troops':for(var i in Resources.troops[did]){rtn+='<td width="16px">'+Images.html(Images.troops(i))+'</td>';rtn+='<td>'+Resources.troops[did][i]+' </td>';}
break;};return[rtn,values];}
Tooltip.make_tip=function(anchor,callback,param){var timer;var div=document.createElement('div');var display=function(e){div.setAttribute('style','position:absolute; top:'+(e.pageY+2)+'px; left:'+(e.pageX+4)+'px; padding:2px; z-index:200; border:solid 1px black; background-color:#fff;');document.body.appendChild(div);div.addEventListener('mouseover',function(e){if(timer!=undefined)window.clearTimeout(timer);},false);div.addEventListener('mouseout',function(e){if(timer!=undefined)window.clearTimeout(timer);timer=window.setTimeout(function(){div.parentNode.removeChild(div);},Tooltip.mouseout_delay);d},false);}
anchor.addEventListener('mouseover',function(e){if(timer!=undefined)window.clearTimeout(timer);timer=window.setTimeout(function(){display(e);callback(param);},Tooltip.mouseover_delay);},false);anchor.addEventListener('mouseout',function(){if(timer!=undefined)window.clearTimeout(timer);timer=window.setTimeout(function(){if(div.parentNode!=undefined)div.parentNode.removeChild(div);},Tooltip.mouseout_delay);},false);return div;}
Tooltip.convert_info=function(type,index,amount){if(!amount||amount=='0')return"";var img='';if(type==3)img=Images.html(Images.troops(index,true));else if(type==4)img=Images.html(Images.res(index));if((type==4&&Tooltip.merchant_kilo_values)||(type==3&&Tooltip.army_kilo_values)){amount=Math.round_sig(amount);}
return(Tooltip.seperate_values?' | ':' ')+img+amount;};Tooltip.run=function(){var x=document.evaluate('//table[@id="vlist"]/tbody/tr/td[@class="link"]/a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);Tooltip.href_postfix='';for(var i=0;i<x.snapshotLength;i++){var vil=x.snapshotItem(i);var did=vil.href.split('newdid=')[1];if(did==undefined)continue;if(did.indexOf('&')>=0){if(i==0)Tooltip.href_postfix=did.match('&.*');did=did.split('&')[0];}
Tooltip.outpost_tip(vil,did);}
Tooltip.overview();};Tooltip.call('init',true);$(function(){Tooltip.call('run',true);});