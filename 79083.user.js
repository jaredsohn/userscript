// ==UserScript==
// @name           RSE Access
// @namespace      rannilas.com
// @description        v2
// @include http://eplison.astroempires.com/base.aspx*
// @include http://epsilon.astroempires.com/map.aspx*
// @include http://epsilon.astroempires.com/empire.aspx*
// @include http://epsilon.astroempires.com/fleet.aspx*
// @include http://epsilon.astroempires.com/board.aspx*

// @exclude http://*.astroempires.com/
// @exclude http://*.astroempires.com/home.*
// @exclude http://*.astroempires.com/home.aspx
// @exclude http://*.astroempires.com/home.aspx*
// @exclude http://*.astroempires.com/login.*
// @exclude http://*.astroempires.com/login.aspx
// @exclude http://*.astroempires.com/login.aspx*
// @exclude http://*.astroempires.com/messages.*
// @exclude http://*.astroempires.com/messages.aspx
// @exclude http://*.astroempires.com/messages.aspx*
// @exclude http://*.astroempires.com/account.*
// @exclude http://*.astroempires.com/account.aspx
// @exclude http://*.astroempires.com/account.aspx*
// @exclude http://*.astroempires.com/upgrade.*
// @exclude http://*.astroempires.com/upgrade.aspx
// @exclude http://*.astroempires.com/upgrade.aspx*
// @exclude http://support.astroempires.com/*
// @exclude http://forum.astroempires.com/*
// @exclude http://p3slhjava15.shr.phx3.secureserver.net
// @exclude http://*.secureserver.net
// @exclude http://*.*.*.secureserver.net
// @exclude http://68.178.254.15/*
// @require    http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

//Version: de7973387bbe2b149a6d97de9b86bb8c
/*
 * jQuery 1.2.6 - New Wave Javascript
 *
 * Copyright (c) 2008 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-05-24 14:22:17 -0400 (Sat, 24 May 2008) $
 * $Rev: 5685 $
 */
(function(){var _jQuery=window.jQuery,_$=window.$;var jQuery=window.jQuery=window.$=function(selector,context){return new jQuery.fn.init(selector,context);};var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this;}if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1])selector=jQuery.clean([match[1]],context);else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3])return jQuery().find(selector);return jQuery(elem);}selector=[];}}else
return jQuery(context).find(selector);}else if(jQuery.isFunction(selector))return jQuery(document)[jQuery.fn.ready?"ready":"load"](selector);return this.setArray(jQuery.makeArray(selector));},jquery:"1.2.6",size:function(){return this.length;},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num];},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret;},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this;},each:function(callback,args){return jQuery.each(this,callback,args);},index:function(elem){var ret=-1;return jQuery.inArray(elem&&elem.jquery?elem[0]:elem,this);},attr:function(name,value,type){var options=name;if(name.constructor==String)if(value===undefined)return this[0]&&jQuery[type||"attr"](this[0],name);else{options={};options[name]=value;}return this.each(function(i){for(name in options)jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name));});},css:function(key,value){if((key=='width'||key=='height')&&parseFloat(value)<0)value=undefined;return this.attr(key,value,"curCSS");},text:function(text){if(typeof text!="object"&&text!=null)return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this]);});});return ret;},wrapAll:function(html){if(this[0])jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild)elem=elem.firstChild;return elem;}).append(this);return this;},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html);});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1)this.appendChild(elem);});},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1)this.insertBefore(elem,this.firstChild);});},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this);});},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});},end:function(){return this.prevObject||jQuery([]);},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem);});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems);},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");container.appendChild(clone);return jQuery.clean([container.innerHTML])[0];}else
return this.cloneNode(true);});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined)this[expando]=null;});if(events===true)this.find("*").andSelf().each(function(i){if(this.nodeType==3)return;var events=jQuery.data(this,"events");for(var type in events)for(var handler in events[type])jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data);});return ret;},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i);})||jQuery.multiFilter(selector,this));},not:function(selector){if(selector.constructor==String)if(isSimple.test(selector))return this.pushStack(jQuery.multiFilter(selector,this,true));else
selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector;});},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector=='string'?jQuery(selector):jQuery.makeArray(selector))));},is:function(selector){return!!selector&&jQuery.multiFilter(selector,this).length>0;},hasClass:function(selector){return this.is("."+selector);},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0)return null;for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one)return value;values.push(value);}}return values;}else
return(this[0].value||"").replace(/\r/g,"");}return undefined;}if(value.constructor==Number)value+='';return this.each(function(){if(this.nodeType!=1)return;if(value.constructor==Array&&/radio|checkbox/.test(this.type))this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(value);jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0);});if(!values.length)this.selectedIndex=-1;}else
this.value=value;});},html:function(value){return value==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(value);},replaceWith:function(value){return this.after(value).remove();},eq:function(i){return this.slice(i,i+1);},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},andSelf:function(){return this.add(this.prevObject);},data:function(key,value){var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length)data=jQuery.data(this[0],key);return data===undefined&&parts[1]?this.data(parts[0]):data;}else
return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value);});},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse)elems.reverse();}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr"))obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script"))scripts=scripts.add(elem);else{if(elem.nodeType==1)scripts=scripts.add(jQuery("script",elem).remove());callback.call(obj,elem);}});scripts.each(evalScript);});}};jQuery.fn.init.prototype=jQuery.fn;function evalScript(i,elem){if(elem.src)jQuery.ajax({url:elem.src,async:false,dataType:"script"});else
jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");if(elem.parentNode)elem.parentNode.removeChild(elem);}function now(){return+new Date;}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2;}if(typeof target!="object"&&typeof target!="function")target={};if(length==i){target=this;--i;}for(;i<length;i++)if((options=arguments[i])!=null)for(var name in options){var src=target[name],copy=options[name];if(target===copy)continue;if(deep&&copy&&typeof copy=="object"&&!copy.nodeType)target[name]=jQuery.extend(deep,src||(copy.length!=null?[]:{}),copy);else if(copy!==undefined)target[name]=copy;}return target;};var expando="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep)window.jQuery=_jQuery;return jQuery;},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/^[\s[]?function/.test(fn+"");},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body;},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie)script.text=data;else
script.appendChild(document.createTextNode(data));head.insertBefore(script,head.firstChild);head.removeChild(script);}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase();},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id)id=elem[expando]=++uuid;if(name&&!jQuery.cache[id])jQuery.cache[id]={};if(data!==undefined)jQuery.cache[id][name]=data;return name?jQuery.cache[id][name]:id;},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id])break;if(!name)jQuery.removeData(elem);}}else{try{delete elem[expando];}catch(e){if(elem.removeAttribute)elem.removeAttribute(expando);}delete jQuery.cache[id];}},each:function(object,callback,args){var name,i=0,length=object.length;if(args){if(length==undefined){for(name in object)if(callback.apply(object[name],args)===false)break;}else
for(;i<length;)if(callback.apply(object[i++],args)===false)break;}else{if(length==undefined){for(name in object)if(callback.call(object[name],name,object[name])===false)break;}else
for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}return object;},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value))value=value.call(elem,i);return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value;},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className))elem.className+=(elem.className?" ":"")+className;});},remove:function(elem,classNames){if(elem.nodeType==1)elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return!jQuery.className.has(classNames,className);}).join(" "):"";},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1;}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}callback.call(elem);for(var name in options)elem.style[name]=old[name];},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0;});val-=Math.round(padding+border);}if(jQuery(elem).is(":visible"))getWH();else
jQuery.swap(elem,props,getWH);return Math.max(0,val);}return jQuery.curCSS(elem,name,force);},curCSS:function(elem,name,force){var ret,style=elem.style;function color(elem){if(!jQuery.browser.safari)return false;var ret=defaultView.getComputedStyle(elem,null);return!ret||ret.getPropertyValue("color")=="";}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(style,"opacity");return ret==""?"1":ret;}if(jQuery.browser.opera&&name=="display"){var save=style.outline;style.outline="0 solid black";style.outline=save;}if(name.match(/float/i))name=styleFloat;if(!force&&style&&style[name])ret=style[name];else if(defaultView.getComputedStyle){if(name.match(/float/i))name="float";name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var computedStyle=defaultView.getComputedStyle(elem,null);if(computedStyle&&!color(elem))ret=computedStyle.getPropertyValue(name);else{var swap=[],stack=[],a=elem,i=0;for(;a&&color(a);a=a.parentNode)stack.unshift(a);for(;i<stack.length;i++)if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block";}ret=name=="display"&&swap[stack.length-1]!=null?"none":(computedStyle&&computedStyle.getPropertyValue(name))||"";for(i=0;i<swap.length;i++)if(swap[i]!=null)stack[i].style.display=swap[i];}if(name=="opacity"&&ret=="")ret="1";}else if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase();});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;style.left=ret||0;ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft;}}return ret;},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=='undefined')context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;jQuery.each(elems,function(i,elem){if(!elem)return;if(elem.constructor==Number)elem+='';if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">";});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--)div=div.lastChild;if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j)if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length)tbody[j].parentNode.removeChild(tbody[j]);if(/^\s/.test(elem))div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild);}elem=jQuery.makeArray(div.childNodes);}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select")))return;if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options)ret.push(elem);else
ret=jQuery.merge(ret,elem);});return ret;},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8)return undefined;var notxml=!jQuery.isXMLDoc(elem),set=value!==undefined,msie=jQuery.browser.msie;name=notxml&&jQuery.props[name]||name;if(elem.tagName){var special=/href|src|style/.test(name);if(name=="selected"&&jQuery.browser.safari)elem.parentNode.selectedIndex;if(name in elem&&notxml&&!special){if(set){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode)throw"type property can't be changed";elem[name]=value;}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name))return elem.getAttributeNode(name).nodeValue;return elem[name];}if(msie&&notxml&&name=="style")return jQuery.attr(elem.style,"cssText",value);if(set)elem.setAttribute(name,""+value);var attr=msie&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);return attr===null?undefined:attr;}if(msie&&name=="opacity"){if(set){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(value)+''=="NaN"?"":"alpha(opacity="+value*100+")");}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100)+'':"";}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase();});if(set)elem[name]=value;return elem[name];},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"");},makeArray:function(array){var ret=[];if(array!=null){var i=array.length;if(i==null||array.split||array.setInterval||array.call)ret[0]=array;else
while(i)ret[--i]=array[i];}return ret;},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++)if(array[i]===elem)return i;return-1;},merge:function(first,second){var i=0,elem,pos=first.length;if(jQuery.browser.msie){while(elem=second[i++])if(elem.nodeType!=8)first[pos++]=elem;}else
while(elem=second[i++])first[pos++]=elem;return first;},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i]);}}}catch(e){ret=array;}return ret;},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++)if(!inv!=!callback(elems[i],i))ret.push(elems[i]);return ret;},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!=null)ret[ret.length]=value;}return ret.concat.apply([],ret);}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});jQuery.each({parent:function(elem){return elem.parentNode;},parents:function(elem){return jQuery.dir(elem,"parentNode");},next:function(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string")ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret));};});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++)jQuery(args[i])[original](this);});};});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1)this.removeAttribute(name);},addClass:function(classNames){jQuery.className.add(this,classNames);},removeClass:function(classNames){jQuery.className.remove(this,classNames);},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames);},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this);});if(this.parentNode)this.parentNode.removeChild(this);}},empty:function(){jQuery(">*",this).remove();while(this.firstChild)this.removeChild(this.firstChild);}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments);};});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px");};});function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;}var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2]);},"#":function(a,i,m){return a.getAttribute("id")==m[2];},":":{lt:function(a,i,m){return i<m[3]-0;},gt:function(a,i,m){return i>m[3]-0;},nth:function(a,i,m){return m[3]-0==i;},eq:function(a,i,m){return m[3]-0==i;},first:function(a,i){return i==0;},last:function(a,i,m,r){return i==r.length-1;},even:function(a,i){return i%2==0;},odd:function(a,i){return i%2;},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a;},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a;},"only-child":function(a){return!jQuery.nth(a.parentNode.lastChild,2,"previousSibling");},parent:function(a){return a.firstChild;},empty:function(a){return!a.firstChild;},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0;},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden";},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden";},enabled:function(a){return!a.disabled;},disabled:function(a){return a.disabled;},checked:function(a){return a.checked;},selected:function(a){return a.selected||jQuery.attr(a,"selected");},text:function(a){return"text"==a.type;},radio:function(a){return"radio"==a.type;},checkbox:function(a){return"checkbox"==a.type;},file:function(a){return"file"==a.type;},password:function(a){return"password"==a.type;},submit:function(a){return"submit"==a.type;},image:function(a){return"image"==a.type;},reset:function(a){return"reset"==a.type;},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button");},input:function(a){return/input|select|textarea|button/i.test(a.nodeName);},has:function(a,i,m){return jQuery.find(m[3],a).length;},header:function(a){return/h\d/i.test(a.nodeName);},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length;}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r);}return cur;},find:function(t,context){if(typeof t!="string")return[t];if(context&&context.nodeType!=1&&context.nodeType!=9)return[];context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false,re=quickChild,m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++)for(var c=ret[i].firstChild;c;c=c.nextSibling)if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))r.push(c);ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true;}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling)if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")merge[id]=true;r.push(n);}if(m=="+")break;}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true;}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0])ret.shift();done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length);}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]];}else{re2=quickClass;m=re2.exec(t);}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2])oid=jQuery('[@id="'+m[2]+'"]',elem)[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[];}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object")tag="param";r=jQuery.merge(r,ret[i].getElementsByTagName(tag));}if(m[1]==".")r=jQuery.classFilter(r,m[2]);if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++)if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break;}r=tmp;}ret=r;}t=t.replace(re2,"");}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t);}}if(t)ret=[];if(ret&&context==ret[0])ret.shift();done=jQuery.merge(done,ret);return done;},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass)tmp.push(r[i]);}return tmp;},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break;}}if(!m)break;if(m[1]==":"&&m[2]=="not")r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3]);else if(m[1]==".")r=jQuery.classFilter(r,m[2],not);else if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))z=jQuery.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not)tmp.push(a);}r=tmp;}else if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)if(n.nodeType==1)n.nodeIndex=c++;merge[id]=true;}var add=false;if(first==0){if(node.nodeIndex==last)add=true;}else if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0)add=true;if(add^not)tmp.push(node);}r=tmp;}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object")fn=fn[m[2]];if(typeof fn=="string")fn=eval("false||function(a,i){return "+fn+";}");r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r);},not);}}return{r:r,t:t};},dir:function(elem,dir){var matched=[],cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1)matched.push(cur);cur=cur[dir];}return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir])if(cur.nodeType==1&&++num==result)break;return cur;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&n!=elem)r.push(n);}return r;}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8)return;if(jQuery.browser.msie&&elem.setInterval)elem=window;if(!handler.guid)handler.guid=this.guid++;if(data!=undefined){var fn=handler;handler=this.proxy(fn,function(){return fn.apply(this,arguments);});handler.data=data;}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){if(typeof jQuery!="undefined"&&!jQuery.event.triggered)return jQuery.event.handle.apply(arguments.callee.elem,arguments);});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener)elem.addEventListener(type,handle,false);else if(elem.attachEvent)elem.attachEvent("on"+type,handle);}}handlers[handler.guid]=handler;jQuery.event.global[type]=true;});elem=null;},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8)return;var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)=="."))for(var type in events)this.remove(elem,type+(types||""));else{if(types.type){handler=types.handler;types=types.type;}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler)delete events[type][handler.guid];else
for(handler in events[type])if(!parts[1]||events[type][handler].type==parts[1])delete events[type][handler];for(ret in events[type])break;if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener)elem.removeEventListener(type,jQuery.data(elem,"handle"),false);else if(elem.detachEvent)elem.detachEvent("on"+type,jQuery.data(elem,"handle"));}ret=null;delete events[type];}}});}for(ret in events)break;if(!ret){var handle=jQuery.data(elem,"handle");if(handle)handle.elem=null;jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle");}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data);if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true;}if(!elem){if(this.global[type])jQuery("*").add([window,document]).trigger(type,data);}else{if(elem.nodeType==3||elem.nodeType==8)return undefined;var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event){data.unshift({type:type,target:elem,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});data[0][expando]=true;}data[0].type=type;if(exclusive)data[0].exclusive=true;var handle=jQuery.data(elem,"handle");if(handle)val=handle.apply(elem,data);if((!fn||(jQuery.nodeName(elem,'a')&&type=="click"))&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false)val=false;if(event)data.shift();if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined)val=ret;}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,'a')&&type=="click")){this.triggered=true;try{elem[type]();}catch(e){}}this.triggered=false;}return val;},handle:function(event){var val,ret,namespace,all,handlers;event=arguments[0]=jQuery.event.fix(event||window.event);namespace=event.type.split(".");event.type=namespace[0];namespace=namespace[1];all=!namespace&&!event.exclusive;handlers=(jQuery.data(this,"events")||{})[event.type];for(var j in handlers){var handler=handlers[j];if(all||handler.type==namespace){event.handler=handler;event.data=handler.data;ret=handler.apply(this,arguments);if(val!==false)val=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}}return val;},fix:function(event){if(event[expando]==true)return event;var originalEvent=event;event={originalEvent:originalEvent};var props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");for(var i=props.length;i;i--)event[props[i]]=originalEvent[props[i]];event[expando]=true;event.preventDefault=function(){if(originalEvent.preventDefault)originalEvent.preventDefault();originalEvent.returnValue=false;};event.stopPropagation=function(){if(originalEvent.stopPropagation)originalEvent.stopPropagation();originalEvent.cancelBubble=true;};event.timeStamp=event.timeStamp||now();if(!event.target)event.target=event.srcElement||document;if(event.target.nodeType==3)event.target=event.target.parentNode;if(!event.relatedTarget&&event.fromElement)event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0);}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))event.which=event.charCode||event.keyCode;if(!event.metaKey&&event.ctrlKey)event.metaKey=event.ctrlKey;if(!event.which&&event.button)event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event;},proxy:function(fn,proxy){proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;return proxy;},special:{ready:{setup:function(){bindReady();return;},teardown:function(){return;}},mouseenter:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseenter";return jQuery.event.handle.apply(this,arguments);}},mouseleave:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseleave";return jQuery.event.handle.apply(this,arguments);}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data);});},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);return(fn||data).apply(this,arguments);});return this.each(function(){jQuery.event.add(this,type,one,fn&&data);});},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn);});},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn);});},triggerHandler:function(type,data,fn){return this[0]&&jQuery.event.trigger(type,data,this[0],false,fn);},toggle:function(fn){var args=arguments,i=1;while(i<args.length)jQuery.event.proxy(fn,args[i++]);return this.click(jQuery.event.proxy(fn,function(event){this.lastToggle=(this.lastToggle||0)%i;event.preventDefault();return args[this.lastToggle++].apply(this,arguments)||false;}));},hover:function(fnOver,fnOut){return this.bind('mouseenter',fnOver).bind('mouseleave',fnOut);},ready:function(fn){bindReady();if(jQuery.isReady)fn.call(document,jQuery);else
jQuery.readyList.push(function(){return fn.call(this,jQuery);});return this;}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.call(document);});jQuery.readyList=null;}jQuery(document).triggerHandler("ready");}}});var readyBound=false;function bindReady(){if(readyBound)return;readyBound=true;if(document.addEventListener&&!jQuery.browser.opera)document.addEventListener("DOMContentLoaded",jQuery.ready,false);if(jQuery.browser.msie&&window==top)(function(){if(jQuery.isReady)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}jQuery.ready();})();if(jQuery.browser.opera)document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}jQuery.ready();},false);if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}if(numStyles===undefined)numStyles=jQuery("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}jQuery.ready();})();}jQuery.event.add(window,"load",jQuery.ready);}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem)try{parent=parent.parentNode;}catch(error){parent=elem;}return parent==elem;};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind();});jQuery.fn.extend({_load:jQuery.fn.load,load:function(url,params,callback){if(typeof url!='string')return this._load(url);var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}callback=callback||function(){};var type="GET";if(params)if(jQuery.isFunction(params)){callback=params;params=null;}else{params=jQuery.param(params);type="POST";}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified")self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText);self.each(callback,[res.responseText,status,res]);}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val};}):{name:elem.name,value:val};}).get();}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});var jsc=now();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null;}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type});},getScript:function(url,callback){return jQuery.get(url,null,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={};}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type});},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings);},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));var jsonp,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!="string")s.data=jQuery.param(s.data);if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre))s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?";}else if(!s.data||!s.data.match(jsre))s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json";}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data)s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp];}catch(e){}if(head)head.removeChild(script);};}if(s.dataType=="script"&&s.cache==null)s.cache=false;if(s.cache===false&&type=="GET"){var ts=now();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"");}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null;}if(s.global&&!jQuery.active++)jQuery.event.trigger("ajaxStart");var remote=/^(?:\w+:)?\/\/([^\/?#]+)/;if(s.dataType=="script"&&type=="GET"&&remote.test(s.url)&&remote.exec(s.url)[1]!=location.host){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset)script.charset=s.scriptCharset;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script);}};}head.appendChild(script);return undefined;}var requestDone=false;var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(s.username)xhr.open(type,s.url,s.async,s.username,s.password);else
xhr.open(type,s.url,s.async);try{if(s.data)xhr.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default);}catch(e){}if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&jQuery.active--;xhr.abort();return false;}if(s.global)jQuery.event.trigger("ajaxSend",[xhr,s]);var onreadystatechange=function(isTimeout){if(!requestDone&&xhr&&(xhr.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null;}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xhr)&&"error"||s.ifModified&&jQuery.httpNotModified(xhr,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xhr,s.dataType,s.dataFilter);}catch(e){status="parsererror";}}if(status=="success"){var modRes;try{modRes=xhr.getResponseHeader("Last-Modified");}catch(e){}if(s.ifModified&&modRes)jQuery.lastModified[s.url]=modRes;if(!jsonp)success();}else
jQuery.handleError(s,xhr,status);complete();if(s.async)xhr=null;}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0)setTimeout(function(){if(xhr){xhr.abort();if(!requestDone)onreadystatechange("timeout");}},s.timeout);}try{xhr.send(s.data);}catch(e){jQuery.handleError(s,xhr,null,e);}if(!s.async)onreadystatechange();function success(){if(s.success)s.success(data,status);if(s.global)jQuery.event.trigger("ajaxSuccess",[xhr,s]);}function complete(){if(s.complete)s.complete(xhr,status);if(s.global)jQuery.event.trigger("ajaxComplete",[xhr,s]);if(s.global&&!--jQuery.active)jQuery.event.trigger("ajaxStop");}return xhr;},handleError:function(s,xhr,status,e){if(s.error)s.error(xhr,status,e);if(s.global)jQuery.event.trigger("ajaxError",[xhr,s,e]);},active:0,httpSuccess:function(xhr){try{return!xhr.status&&location.protocol=="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpNotModified:function(xhr,url){try{var xhrRes=xhr.getResponseHeader("Last-Modified");return xhr.status==304||xhrRes==jQuery.lastModified[url]||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpData:function(xhr,type,filter){var ct=xhr.getResponseHeader("content-type"),xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.tagName=="parsererror")throw"parsererror";if(filter)data=filter(data,type);if(type=="script")jQuery.globalEval(data);if(type=="json")data=eval("("+data+")");return data;},param:function(a){var s=[];if(a.constructor==Array||a.jquery)jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value));});else
for(var j in a)if(a[j]&&a[j].constructor==Array)jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this));});else
s.push(encodeURIComponent(j)+"="+encodeURIComponent(jQuery.isFunction(a[j])?a[j]():a[j]));return s.join("&").replace(/%20/g,"+");}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")this.style.display="block";elem.remove();}}).end();},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none";}).end();},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]();});},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback);},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback);},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback);},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback);},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback);},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)return opt.complete.call(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow;}}if(opt.overflow!=null)this.style.overflow="hidden";opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit;}if(parts[1])end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit);}else
e.custom(start,val,"");}});return true;});},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx";}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.call(this);}});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1);}});if(!gotoEnd)this.dequeue();return this;}});var queue=function(elem,type,array){if(elem){type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",jQuery.makeArray(array));}return q;};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].call(this);});};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.call(this);};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={};}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block";},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd);}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null;}},13);}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=now();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block";}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p]);}if(done)this.options.complete.call(this.elem);return false;}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();}return true;}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now;},scrollTop:function(fx){fx.elem.scrollTop=fx.now;},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now);},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit;}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop);}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent;}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode;}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));}results={top:top,left:left};}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true));}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0;}return results;};jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}return results;},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return jQuery(offsetParent);}});jQuery.each(['Left','Top'],function(i,name){var method='scroll'+name;jQuery.fn[method]=function(val){if(!this[0])return;return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val;}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method];};});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br);};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0);};});})();function publicParsePage(){
	generalSetup();
	var search = decodeURIComponent(window.location.search).replace('?','');
	switch(location.pathname.replace('/', '').replace('.aspx', '')){
		case 'fleet':
			break;
		case 'map':
			var region = search.match(/loc=([A-F]\d\d:\d\d)/);
			var system = search.match(/loc=([A-F]\d\d:\d\d:\d\d)/);
			var astro = search.match(/loc=([A-F]\d\d:\d\d:\d\d:\d\d)/);

	        if (astro != null){
				parseAstro();
	        }
	        else if (system != null){
				// if(emptySystem())
					// parseEmptySystem();
				// if(visibleSystem()){
				parseSystem();
				// }
			}
			else if (region != null){
			}
			break;
		case 'base':
			if(search.match(/base=\d+/) != null && search.match(/&view=/) == null && visibleBase())
				parseBase();
			else if(search.match(/base=\d+&view=trade&action=new/) != null)
				parseTR();
			else
				invalidBase();
			break;
		case 'guild':
			// Internal guild
			if(search.match(/guild=\d+/) == null){
				parseInactivity();
				parseStats();
			}
			// External view of a guild
			else
				parseGuildPage();
			break;
		case 'empire':
			if(search.match(/view=scanners/) != null){
				parseScanner();
			}
			break;
		case 'board':
			if(search.match(/folder=combat/) != null)
				parseCombatBoard();
			break;
		case 'messages':
			if(search.match(/view=/) == null)
				parseMessagesForCombat();
			break;
		case 'profile':
			if(search.match(/player=/) != null)
				parseProfile();
			break;
	}
};
function publicUIPage(){
	var search = decodeURIComponent(window.location.search).replace('?','');
	switch(location.pathname.replace('/', '').replace('.aspx', '')){
		case 'fleet':
			if(search.match(/fleet=\d+&view=move/) != null)
				fleetMoveUIChange();
			else if(search.match(/fleet=\d+/) == null)
				fleetPageUIChange();
			// else if(search.match(/fleet=\d+&view=attack/) != null)
				// fleetAttackUIChange();
			break;
		case 'map':
		    var region = search.match(/loc=([A-F]\d\d:\d\d)/);
		    var system = search.match(/loc=([A-F]\d\d:\d\d:\d\d)/);
		    var astro = search.match(/loc=([A-F]\d\d:\d\d:\d\d:\d\d)/);

	        if (astro != null){
	            astroPageUIChange();
	            fleetQuickSum();
	        }
			else if(system != null)
				$('a:contains(Galaxies):first').parents('center').append("<br><a href='#' onclick='findAstro();'>Find Astro</a>");
			else if(region != null)
				$('a:contains(Galaxies):first').parents('center').append("<br><a href='#' onclick='findAstro();'>Find Astro</a>");
			break;
		case 'base':
			if(search.match(/base=\d+&view=structures/) != null)
				baseStructureUIChange();
			else if(search.match(/base=\d+&view=defenses/) != null)
				baseDefenseUIChange();
			else if(search.match(/base=\d+/) != null && search.match(/&view=/) == null && visibleBase()){
				fleetTableUIChange();
				$('th:contains(Location)').append('&nbsp;<a href="bookmarks.aspx?action=add&astro=' + $('a[href^=map.aspx?loc=]').text() + '">bookmark</a>');
				fleetQuickSum();
			}
			else if(search.match(/base=\d+&view=trade&action=new/) != null || player_id == '33149')
				getTradeRoutes();
			fixQueues();
			break;
		case 'board':
			boardUIChange();
			break;
		case 'credits':
			creditPageUIChange();
			break;
		case 'empire':
			// Fleet summary page
			if(search.match(/view=fleets/) != null)
				empireFleetUIChange();
			// Structures summary page
			else if(search.match(/view=structures/) != null)
				empireStructuresUIChange();
			// Events page
			else if(search == '' || search.match(/view=bases_events/) != null)
				empireEventsUIChange();
			// Trade page
			else if(search.match(/view=trade/) != null){
				empireTradeUIChange();
				sendTradeRoutes();
			}
			else if(search.match(/view=scanners/) != null)
				empireScannerUIChange();
			else if(search.match(/view=units/) != null)
				empireUnitsUIChange();
			else if(search.match(/view=bases_capacities/) != null)
				empireCapacitiesUIChange();
			break;
		case 'messages':
			if(search.match(/view=/) == null)
				receivedTradeRoutes();
			break;
		case 'profile':
			profileUIChange();
			break;
	}
	addEmpireLinks();
};
// Parsing functions
function parseAstro(msg){
	if(msg != null){
		var obj = $(msg).parent();
		updatePage(msg);
		var coords = $('center:contains(Galaxies)', obj).html().match(/[A-F]\d\d:\d\d:\d\d:\d\d/)[0];
		var base_row = $('table:contains(Occupied by) tr:last', obj);
		var terrain = $('table:contains(Astro Type:) img', obj).attr('src').match(/astros\/.+\.jpg/)[0];
	}
	else{
		var coords = $('center').html().match(/[A-F]\d\d:\d\d:\d\d:\d\d/)[0];
		var base_row = $('table:contains(Occupied by) tr:last');
		var terrain = $('table:contains(Astro Type:) img').attr('src').match(/astros\/.+\.jpg/)[0];
	}
	var terrain = terrain.substring(7, terrain.length - 4);
	var debris = $('center:contains(Debris)');
	if(debris.length > 0)
		debris = debris.text().match(/(\d+) credits in space Debris./)[1];
	else
		debris = 0;
	if(terrain != 'Gas Giant' && terrain != 'Asteroid Belt' && terrain != 'unknown'){
		if(!(base_row.length == 0 && terrain == 'Asteroid'))
			parseFleet(coords, msg);
		else if(terrain == 'Asteroid' && typeof fleetDataFunction == 'function'){
			parseFleet(coords, msg);
			// status('function');
		}
		// else
			// parseFleet(coords, null);
		if(base_row.length == 1){
			items = base_row.children();
			var occ_a = items.eq(2).children('a:first');
			if(occ_a.length == 1)
				var occ_id = occ_a.attr('href').match(/profile\.aspx\?player=(\d+)/)[1];
			else
				var occ_id = 0;
			JSONObject.request = {
				mode : "astro",
				coord : coords,
				base_id : items.eq(0).children('a:first').attr('href').match(/base\.aspx\?base=(\d+)/)[1],
				owner_id : items.eq(1).children('a:first').attr('href').match(/profile\.aspx\?player=(\d+)/)[1],
				occ_id : occ_id,
				terrain : terrain,
				debris : debris
			};
			getData();
		}
		else if(terrain != 'Asteroid'){
			JSONObject.request = {
				mode : "astro",
				coord : coords,
				base_id : 0,
				owner_id : 0,
				occ_id : 0,
				terrain : terrain,
				debris : debris
			};
			getData();
		}
	}
		if(typeof navigateAstros == 'function')
			navigateAstros();
}
function parseFleet(coord, page){
	if(page != null){
		var page = $(page).parent();
		var table = $('table:contains(Arrival)', page);
	}
	else
		var table = $('table:contains(Arrival)');
	if(table.find('table').length > 0)
		var rows = $('table tr:gt(0)', table);
	else
		var rows = $('tr:gt(1)', table);
	JSONObject.request = {
		mode : "fleet",
		destination : coord};
	if(typeof fleetDataFunction == 'function')
		var fleetData = [];
	var fleetIDArray = [];
	for(i = 0; i < rows.length; i++){
		var items = rows.eq(i).children();
		var fleetID = $('a:first', items.eq(0)).attr('href').match(/\d+/)[0];
		fleetIDArray.push(fleetID);
		var data = {
			id : fleetID,
			player_id : $('a:first', items.eq(1)).attr('href').match(/\d+/)[0],
			arrival : ((x = items.eq(2).attr('title')) == '')?0:x,
			size : items.eq(3).text().replace(/[^0-9]/g,'')};
		JSONObject.request['fleet' + i] = data;
		if(i % 25 == 24 && i + 1 != rows.length){
			getData();
			JSONObject.request =
			{	mode : "fleet",
				destination : coord};
		}
		if(typeof fleetDataFunction == 'function'){
			data.player_name = items.eq(1).text();
			fleetData.push(data);
		}
	}
	getData();
	JSONObject.request = {
		mode : "fleet",
		destination : coord,
		delete : true};
	if(fleetIDArray.length > 0){
		for(i = 0; i < fleetIDArray.length; i++){
			JSONObject.request[i] = fleetIDArray[i];
		}
	}
	getData();

	if(typeof fleetDataFunction == 'function')
		fleetDataFunction(coord, fleetData);
}
function parseBase(msg) {
	if(msg == null){
		obj = $('body').children();
		base_id = location.search.match(/\d+/)[0];
	}
	else{
		updatePage(msg);
		obj = $(msg);
		base_id = astros[astroIndex - 1].base;
	}
	if($('option',obj).length > 0)
		headTable = $('th:contains(Trade Routes)',obj).parent().next().children('td');
	else
		headTable = obj.filter('table:contains(Base Name)').children().children('tr').eq(1).children('td');
	coords = headTable.eq(headTable.length - 5).text();
	if(obj.filter('center:contains(This Base was Pillaged )').length > 0)
		last_pillaged = obj.filter('center:contains(This Base was Pillaged )').text().match(/\d+/)[0];
	else
		last_pillaged = 0;
	var stability_td = obj.filter('td:contains(Base Stability)');
	if(stability_td.length > 0)
		stability = stability_td.next('td').text().match(/\d+/)[0];
	else
		stability = 0;
	trade = headTable.eq(headTable.length - 1).text();
	bodyTable = obj.filter('table:contains(Astro Type)');
	base_name = bodyTable.find('tr:first > th:first').text();
	terrain = $('tr td center',bodyTable).html().split('<br>')[3].split('</b>')[1];
	capacityTable = $('table:contains(Processing capacity)',bodyTable);
	capacityRows = $('tr',capacityTable);
	construction = capacityRows.eq(2).children('td').eq(1).text();
	production = capacityRows.eq(3).children('td').eq(1).text();
	research = capacityRows.eq(4).children('td').eq(1).text();
	max_econ = capacityRows.eq(6).children('td').eq(1).text();
	current_econ = capacityRows.eq(7).children('td').eq(1).text();
	owner_name = capacityRows.eq(9).children('td').eq(1).text();
	owner_id = capacityRows.eq(9).children('td').eq(1).children('a').attr('href').match(/\d+/)[0];

	occupier_name = capacityRows.eq(10).children('td').eq(1).text();
	occupier_id = (occupier_name != '')?capacityRows.eq(10).children('td').eq(1).children('a').attr('href').match(/\d+$/)[0]:0;
	// uc_stability = (owner_name == 'United Colonies')?capacityRows.eq(11).children('td').eq(1).text():0;
	commander = (bodyTable.children().children().length > 1)?$('tr:last', bodyTable).text().split('(')[1].split(')')[0]:'';

	strdefTable = obj.filter('table#base_resume-structures').find('table tr:last').children('td');
	structures = strdefTable.eq(0).html().replace(/<br>/g,'*');
	structures2 = strdefTable.eq(2).html().replace(/<br>/g,'*');
	structures3 = strdefTable.eq(4).html().replace(/<br>/g,'*');
	if (structures2.length > 0)
	    structures += structures2;
	if (structures3.length > 0)
	    structures += structures3;

	structures = structures.substr(0,structures.length-1);
	structure_levels = strdefTable.eq(1).html().replace(/<br>/g,'*');
	structure_levels2 = strdefTable.eq(3).html().replace(/<br>/g,'*');
	structure_levels3 = strdefTable.eq(5).html().replace(/<br>/g,'*');
	if (structure_levels2.length > 0)
	    structure_levels += structure_levels2;
	if (structure_levels3.length > 0)
	    structure_levels += structure_levels3;
	structure_levels = structure_levels.substr(0,structure_levels.length-1);
	JSONObject.request = {
		mode : "base",
		coords : coords,
		base_id : base_id,
		base_name : base_name,
		terrain : terrain,
		construction : construction,
		production : production,
		research : convertNumber(research),
		max_econ : max_econ,
		current_econ : current_econ,
		owner_id : owner_id,
		occupier_id : occupier_id,
		commander : commander,
		structures : structures,
		structure_levels : structure_levels,
		trade : trade,
		last_pillaged : last_pillaged,
		uc_stability : stability
	};
	if(typeof baseDataFunction == 'function')
		baseDataFunction(coords, JSONObject.request);
	getData();
	parseFleet(coords, msg);
	if(typeof navigateAstros == 'function')
		navigateAstros();
}
function parseSystem(msg){
	if (msg == null){
		var system = $('center').text().match(/[A-F]\d\d:\d\d:\d\d/)[0];
		var system_table = $('div > table.system');
	} else {
		updatePage(msg);
		var obj = $(msg);
		var system = obj.filter('center').html().match(/[A-F]\d\d:\d\d:\d\d/)[0];
		var system_table = obj.find('table.system');
	}
	if(system_table.length != 1)
		return;
	system_table.parent().find(':hidden').remove();	
	var system_items = system_table.siblings();
	var index = 0;

	var num_astros = 0;
	var data_list = [];
	var visible_system = true;
	JSONObject.request = {mode : 'system',system : system};

	while(index < system_items.length){
		var astro_link = system_items.eq(index++);
		var astro_image = astro_link.children('img');
		if(astro_image.length != 1)
			return;
		var img_title = astro_image.attr('title');
		var result = img_title.match(/(.+) \(([A-F]\d\d:\d\d:\d\d:\d\d)\)/);
		if(!result)
			return;
		var terrain = result[1];
		var coords = result[2];
		if(terrain == 'Asteroid Belt' || terrain == 'Gas Giant')
			continue;
			
		if(terrain == 'unknown' ||
			(terrain == 'Asteroid' && system_items.eq(index).children('img').length > 0)) 
			{visible_system = false;break;};
		var owner_div = system_items.eq(index++);
		var debris_span = owner_div.children('span');
		var debris = 0;
		if(debris_span.length > 0){
			var result = debris_span.attr('title').match(/(.+) Debris/);
			if(result){
				debris = convertNumber(result[1]);
			}
		}
		var owner_link = owner_div.children('a');
		if(owner_link.length == 0){
			var owner_id = 0;
			var occ_id = 0;
			var base_id = 0;
		}else{
			var result = owner_link.attr('href').match(/\d+/);
			if(!result)
				return;
			var owner_id = result[0];
			var result = astro_link.attr('href').match(/\d+/);
			if(!result)
				return;
			var base_id = result[0];
			if(index < system_items.length){
				var occ_div = system_items.eq(index);
				var occ_link = occ_div.children('a');
				if(occ_link.length == 0)
					var occ_id = 0;
				else{
					var result = occ_link.attr('href').match(/\d+/);
					if(!result)
						return;
					var occ_id = result[0];
					index++;
				}
			}else
				var occ_id = 0;
		}
		JSONObject.request['astro' + num_astros++] = {
			coord : coords,
			terrain : encodeURIComponent(terrain),
			base : base_id
		};
		var data = {
			coord : coords,
			url : astro_link.attr('href'),
			terrain : encodeURIComponent(terrain),
			base : base_id, 
			player : (base_id > 0)?owner_link.text():'',
			occ : (occ_id > 0)?occ_div.text():'',
			debris : debris
		};
		data_list.push(data);
		
	}
	if(visible_system){
		if(typeof systemDataFunction == 'function')
			systemDataFunction(system, data_list);
		status('Parsed System ' + system + ', submitting ' + num_astros + ' astros');
		getData();
		if(typeof navigateAstros == 'function')
			navigateAstros();
	}
	else{
		status('Cannot see system');
		if(typeof navigateSystems == 'function')
		navigateSystems();
	}
}
function parseGuildPage(){
	var info = $('td:contains(Tag: )').text();
	var guild_tag = info.match(/Tag: \[(.{1,5})\]/)[1];
	var guild_id = info.match(/Guild #: (\d+)/)[1];
	var guild_name = $('#guild_show table tr:first th:eq(1)').text();
	JSONObject.request = {
		mode : "guild",
		sub_mode : "info",
		guild_name : encodeURIComponent(guild_name),
		guild_tag : encodeURIComponent(guild_tag),
		guild_id : guild_id
	};
	getData();
	var rows= $('table:last tr');
	var list = {
		mode : "guild",
		sub_mode : "list",
		guild_id : guild_id
	}
	var data = {
		mode : "guild",
		sub_mode : "names",
		guild_id : guild_id
	};

	for(var i = 2; i < rows.length; i++){
		var elements = $('td', rows.eq(i));
		var player_id = elements.eq(0).text();
		data[i] = {
			id : player_id,
			name : encodeURIComponent(elements.eq(2).text()),
			level : encodeURIComponent(convertNumber(elements.eq(3).text()))
		};
		list[i] = player_id;
		if((i % 50) == 0 && i < (rows.length - 1)){
			JSONObject.request = data;
			getData();
			var data = {
				mode : "guild",
				sub_mode : "names",
				guild_id : guild_id
			};
		}
	}
	JSONObject.request = data;
	getData();
	JSONObject.request = list;
	getData();
	status('Parsed players');
}
function parseScanner(){
	var rows = $('#empire_scanners table tr:gt(0)');
	JSONObject.request = {mode : "scanners"};
	for(i = 0; i < rows.length; i++){
		var items = rows.eq(i).children();
		var data = {
			id : $('a:first', items.eq(0)).attr('href').match(/\d+/)[0],
			player_id : $('a:first', items.eq(1)).attr('href').match(/\d+/)[0],
			// player_name : items.eq(1).text(),
			destination : items.eq(2).text().match(/[A-F]\d\d:\d\d:\d\d:\d\d/)[0],
			arrival : items.eq(3).attr('title'),
			size : items.eq(4).text().replace(/,/g, '')};
		JSONObject.request[i] = data;
		if(i % 25 == 24 && i + 1 != rows.length){
			getData();
			JSONObject.request = {mode : "scanners"};
		}
	}
	getData()
}
function parseCombatBoard() {
	var messages = $('#board_main > tbody > tr > td > table > tbody > tr:odd');
	messages = messages.slice(1,messages.length-2);
	for(k = 0; k < messages.length; k++){
		var m = messages.eq(k);
		if(m.html().match("</table>") != null){
			parseCombat(m);
		}
	}
}
function parseMessagesForCombat(){
	$('a[href^=board.aspx?copy]').each(function(){
		parseCombat($(this).parent().parent().next());
	});
}
function parseCombat(message){
	var cc = 0;
	var def_base = 0;
	var def_start_def = 0;
	var def_end_def = 0;
	var commander = '';
	var row_mod = 0;
	var info = message.children('td:first');
	var tables = info.find('table');
	var combat = tables.eq(0).children().children('tr');

	var coords = combat.eq(1).children('td:last').children('a:first').attr('href').match(/[A-F]\d{2}(:\d\d){3}/)[0];
	var time = combat.eq(2).children('td:last').html();
	var attacker = combat.eq(4).children('td:last').children('a:first');
	var att_id = attacker.attr('href').match(/\d+/)[0];
	var result = attacker.parent().text().match(/lvl (\d+\.\d+)/);
	if(result == null)
		var att_lvl = 0;
	else
		var att_lvl = result[1];
	if(combat.eq(6).children('td:first').html() == 'Command Centers'){
		cc = combat.eq(6).children('td:last').html();
		row_mod++;
	}
	if(combat.eq(6 + row_mod).children('td:first').html() == 'Commander'){
		commander = combat.eq(6 + row_mod).children('td:last').html().match(/\(.+\)/)[0].replace('(','').replace(')','');
		row_mod++;
	}

	var defender = combat.eq(7 + row_mod).children('td:last').children('a:first');
	var def_id = defender.attr('href').match(/\d+/)[0];
	var result = defender.parent().text().match(/lvl (\d+\.\d+)/);
	if(result == null)
		var def_lvl = 0;
	else
		var def_lvl = result[1];
	for(i = 9 + row_mod; i < combat.length; i++){
		type = combat.eq(i).children('td:first').html();
		definfo = combat.eq(i).children('td:last').text();
		if(type == 'Base')
			def_base = definfo;
		else if(type == 'Start Defenses')
			def_start_def = definfo.match(/\d+/)[0];
		else if(type == 'End Defenses')
			def_end_def = definfo.match(/\d+/)[0];
		else if(type == 'Command Centers')
			cc = definfo;
		else if(type == 'Commander')
			commander = definfo.match(/\(.+\)/)[0].replace('(','').replace(')','');
	}

	var att_force = tables.eq(1).children().children('tr').slice(2);
	if(att_force.length == 0)
		var att_units = '';
	else if(att_force.length == 1){
		var row = att_force.eq(0).children();
		var att_units = {
			unit : row.eq(0).text(),
			start : row.eq(1).text(),
			end : row.eq(2).text(),
			power : row.eq(3).text(),
			armour : row.eq(4).text(),
			shield : row.eq(5).text()
		};

	}
	else{
		var att_units = [];
		for(i = 0; i < att_force.length; i++){
			var row = att_force.eq(i).children();
			if(row.length == 6)
				att_units[i] = {
					unit : row.eq(0).text(),
					start : row.eq(1).text(),
					end : row.eq(2).text(),
					power : row.eq(3).text(),
					armour : row.eq(4).text(),
					shield : row.eq(5).text()
				};
		}
	}
	var def_force = tables.eq(2).children().children('tr').slice(2);
	if(def_force.length == 0)
		var def_units = '';
	else if(def_force.length == 1){
		var row = def_force.eq(0).children();
		var def_units = {
				unit : row.eq(0).text(),
				start : row.eq(1).text(),
				end : row.eq(2).text(),
				power : row.eq(3).text(),
				armour : row.eq(4).text(),
				shield : row.eq(5).text()
		};

	}
	else{
		var def_units = [];
		for(i = 0; i < def_force.length; i++){
			var row = def_force.eq(i).children();
			if(row.length == 6)
				def_units[i] = {
					unit : row.eq(0).text(),
					start : row.eq(1).text(),
					end : row.eq(2).text(),
					power : row.eq(3).text(),
					armour : row.eq(4).text(),
					shield : row.eq(5).text()
				};
		}
	}
	var bottom_text = info.children('center').text();
	if(bottom_text.match(/Attacker Conquered the Base/i) != null)
		var conquered = 1;
	else
		var conquered = 0;
	var result = bottom_text.match(/Commander .+ \(.+ \d+\) was Killed/ig);
	if(result == null)
		var comm_killed = 0;
	else
		var comm_killed = result.length;
	var result = bottom_text.match(/Attacker got (\d+) Credits for Pillaging defender's Base./i);
	if(result == null)
		var pillage = 0;
	else
		var pillage = result[1];
	var result = bottom_text.match(/Total cost of units destroyed: \d+ \( Attacker: (\d+) ; Defender: (\d+) \)/i);
	if(result == null){
		var att_destroyed = 0;
		var def_destroyed = 0;
	}
	else{
		var att_destroyed = result[1];
		var def_destroyed = result[2];
	}
	var result = bottom_text.match(/Experience: \( Attacker: \+(\d+) ; Defender: \+(\d+) \)/i);
	if(result == null){
		var att_xp = 0;
		var def_xp = 0;
	}
	else{
		var att_xp = result[1];
		var def_xp = result[2];
	}
	var result = bottom_text.match(/New Debris in Space: (\d+)/i);
	if(result == null)
		var debris = 0;
	else
		var debris = result[1];

	JSONObject.request = {
		mode : "combat",
		location : coords,
		att_id : att_id,
		att_level : att_lvl,
		def_id : def_id,
		def_level : def_lvl,
		time : time,
		commander : commander,
		command_centers : cc,
		def_base_id : def_base,
		def_base_start : def_start_def,
		def_base_end : def_end_def,
		att_units : att_units,
		def_units : def_units,
		att_fleet_loss : att_destroyed,
		def_fleet_loss : def_destroyed,
		att_xp : att_xp,
		def_xp : def_xp,
		debris : debris,
		pillage : pillage,
		conquered : conquered,
		commanders_killed : comm_killed};
	getData();
}
function parseProfile(msg){
	var table = $('table#profile_show table');
	var text = table.find('th:eq(1)').text();
	var result = text.match(/\[(.+)\] (.+)/);
	var data = {mode : 'profile'};
	if(result){
		data['guild_tag'] = encodeURIComponent(result[1]);
		data['player_name']	= encodeURIComponent(result[2]);
	}
	else
		data['player_name'] = text;
	var td = table.find('td:contains(Player #)');
	var result = td.text().match(/Player # (\d+)/);
	if(result == null || result.length != 2)
		return;
	data['player_id'] = result[1];
	var result = td.find('a');
	if(result.length == 0)
		data['guild_id'] = 0;
	else{
		data['guild_name'] = encodeURIComponent(result.text());
		var result = result.attr('href').match(/guild=(\d+)/);
		if(result == null)
			return;
		data['guild_id'] = result[1];
	}
	var result = td.text().match(/Level: (.+) \(Rank/i);
	var level = convertNumber(result[1]);
	data['level'] = level;
	JSONObject.request = data;
	getData();
};
function parseStats(){
	var result = $('td:contains(Tag:)').text().match(/Tag: \[(.+)] Guild #: (\d+)/i);
	if(!result)
		return;
	var rows = $('#guild_members table tr:gt(0)');
	var num_rows = 25;
	JSONObject.request = {
		mode : "stats",
		guild_id : result[2],
		start : 1,
		total : rows.length
	};
	getData(function(msg){
		if(typeof msg != 'undefined' && typeof msg.response != 'undefined' && msg.response == 1){
			for(var i = 0; num_rows * i < rows.length; i++){
				JSONObject.request = {
					continue : 1,
					mode : "stats"
				};
				rows.slice(i * num_rows, (i + 1) * num_rows).each(function(){
					var items = $(this).find('td');
					var id = items.eq(0).text().match(/\d+/)[0];
					JSONObject.request[id] = {
						l : convertNumber(items.eq(4).text()).match(/[\.0-9]+/)[0],
						e : convertNumber(items.eq(5).text()).match(/\d+/)[0],
						f : convertNumber(items.eq(6).text()).match(/\d+/)[0],
						t : convertNumber(items.eq(7).text()).match(/\d+/)[0],
						x : convertNumber(items.eq(8).text()).match(/\d+/)[0]
					};
				});
				getData(function(msg){
					if(typeof msg != 'undefined' && typeof msg.response != 'undefined' && msg.response.length > 0)
					status(msg.response);
				});
			}
		}
	});
}
function parseTR(){
	var center = $('center');
	if(center.length > 0 && center.html().match(/Destination Base doesn\'t have enough Spaceports\./i)){
		var coords = $('#destination').val();
		if(coords.match(/[A-F]\d\d:\d\d:\d\d:\d\d/) == null)
			return;
		JSONObject.request = {
			mode : 'trade_routes',
			submode : 'full',
			coords : coords
		};
		getData();
	}
}
function parseInactivity(){
	if($('#guild_members table a:contains(Inactivity)').length == 0)
		return;
	var text = $('table tr td:contains(Tag:):contains(Guild #:)').text();
	var num_members = text.match(/Members:\s*(\d+)/);
	if(!num_members)
		return;
	var num_members = num_members[1];
	JSONObject.request = {
		start : 1,
		mode : 'inactivity',
		total : num_members
	};
	getData(function(){
		var data = {mode : 'inactivity',
			continue : 1};
		var count = 0;
		$('#guild_members table tr:gt(0)').each(function(index){
			var tds = $(this).children('td');
			if(tds.length < 10)
				return;
			var user_id = tds.eq(0).text();
			if(user_id.match(/\d+/) == null)
				return;
			var privileges = tds.eq(1).find('small').text();
			var inactivity = tds.eq(9).text();
			if(result = inactivity.match(/(min|hrs|days)/i))
				var word = result[1];
			else
				return;
			if(result = inactivity.match(/(\d+)/))
				var num = result[1];
			else
				return;
			var temp = {
				a : num + word
			};
			if(privileges != '')
				temp["p"] = encodeURIComponent(privileges);
			data[user_id] = temp;
			count++;
			if(count == 50){
				JSONObject.request = data;
				getData();
				count = 0;
				data = {
					mode : 'inactivity',
					continue : 1};
			}
		});
		JSONObject.request = data;
		getData();
	});

}

// Utility Functions
function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
function randomTime(i,j){
	return i + Math.round(j * Math.random());
};
function emptySystem(msg) {
	if (msg == null)
		wrapdiv = $('div').eq(1);
	else {
		obj = $(msg);
		wrapdiv = obj.filter('div').eq(1);
	}
	links = wrapdiv.children('a');
	for(var i = 0; i < links.length; i++){
		var terrain = links.eq(i).children('img').attr('title').split(" (",1);
		if(terrain != 'Gas Giant' && terrain != 'Asteroid Belt')
			return false;
	}
	return true;
}
function visibleSystem(){
	//var links = $('body div div a').parent().prev().children('img').filter(
	$('div:hidden').remove();
	var	links = $('div > table.system')
		.siblings('a:not(:has(span))')
		.find('img[src!=]')
		.parent()
		.filter(function(){
		    var html = $(this).html();
			// check img src html
			if (html.match(/width="0"/) == html.match(/height="0"/))
				return true;
			// check rendered size
			var c = $(this).children('img');
			if (c.size() == 1){
				if (c.innerHeight() > 5 && c.innerWidth() > 5)
					return true;
			}
			return false;
		});
	return links.next('div').length > 0;
}
function visibleBase(){
	if($('center:contains(Invalid Base)').length > 0)
		return false;
	if($('table:contains(You can\'t see this Base Information)').length > 0)
		return false;
	return true;
}
function invalidBase(){
	if($('center:contains(Invalid Base)').length > 0){

		var base_id = decodeURIComponent(window.location.search).replace('?','').match(/base=(\d+)/);
		if(base_id){
			JSONObject.request ={
				mode : 'invalid_base',
				base_id : base_id[1]
			};
			showData();
		}
	}
}
function status(text){
	var numStatus = $('.status').length;
	$('body').append("<div class='status' style='background: gray; width: " + text.length * 8 + "; height: 16; position: fixed; top: " + (18 * numStatus) + "px; bottom: 0px; left: 0px; right: 0px;'>" + text + "</div>");
	window.setTimeout(function(){
		$('.status:first').remove();
		$('.status').each(function(){
			var width = $(this).css('top').match(/\d+/)[0];
			$(this).css({'top': (width - 18) + 'px'});
		});
	}, 2000);
}
function set_login_vars() {
	if($('#username').length == 1)
		username = $('#username').attr('value');
	if($('#password').length == 1)
		password = $('#password').attr('value');
	if($('#preferences').length == 1)
		preferences = $('#preferences').attr('value');

}
function generalSetup(){
	set_login_vars();
	JSONObject = {};
	resetJSON();
	$('table:contains(Remove advertising):not(:contains(Publicity)):first').remove();
	$('iframe').parent().parent().remove();
	marqueeUIChange();
	var result = window.location.hostname.match(/(.+)\.astroempires\.com/);
	if(result){
		var server = result[1];
		opcen_url = 'http://frse.rannilas.com/';
	}
	var result = $('table.no_back:first').text().match(/[A-F]\.(\d+)/);
	if(result)
		player_id = result[1];
	page_load_time = getTime();
	refresh_time = page_load_time;
}
function convertNumber(n){
	var length = n.length;
	var decimal = false;
	var ptr = length;
	for(var i = 1; i <= Math.min(3, length); i++)
		if(!n.charAt(length - i).match(/^[0-9]/)){
			decimal = true;
			ptr -= i;
			break;
		}
	var number = n.slice(0, ptr).replace(/[^0-9]/g, "");
	if(decimal)
		number += '.' + n.slice(ptr + 1, length);
	return number;
}
function getTime(){
	return (new Date()).getTime();
}
function stringToUnixTime(time){

	var time_array = time.split(/[^0-9]/);
	var time_arr = [];
	for(i in time_array)
		if(time_array[i].length > 0)
			time_arr.push(time_array[i]);
	if(time_arr.length != 6)
		return 0;
	return Date.UTC(time_arr[2], time_arr[1] - 1, time_arr[0], time_arr[3], time_arr[4], time_arr[5], 0);
}
function calculateDuration(distance, speed, logistics){
	if ((distance>0) && (speed>0)){
		var duration=(distance / speed) * 3600;
		return Math.ceil(duration * (1 - logistics * 0.01) * 1000)
	}
	return 0;
}
function capacitiesCallback(response){
	alert(response);
}

// Database Functions
function resetJSON(){
	JSONObject = {};
	if($('#username').length == 1 && $('#username').attr('value') != 'undefined')
		JSONObject.username = $('#username').attr('value');
	if($('#password').length == 1 && $('#password').attr('value') != 'undefined')
		JSONObject.md5password = $('#password').attr('value');
}
function getData(callback){
	// showData();
	// return;
	// var url = opcen_url + 'script/gm.php?data=' + encodeURIComponent(jsonString(JSONObject)) + '&callback=?';
	// alert(url.length);
	$.getJSON(opcen_url + 'script/gm.php?data=' + encodeURIComponent(jsonString(JSONObject)) + '&callback=?',
		function(data){
			if(data.error != '')
				alert(concatObject(data.error));
			if(data.status != '')
				alert(concatObject(data.status));
			if(typeof callback == 'function')
				callback(data);
		});
	resetJSON();
}
function jsonString(obj){
	if(obj instanceof Array)
		var str = '[';
	else
		var str = '{';
	for(prop in obj){
		if(obj == '[object Object]')
			str += '"' + prop + '":';
		if(obj[prop] == '[object Object]' || obj[prop] instanceof Array)
			str += jsonString(obj[prop]);
		else{
			if(typeof obj[prop] == 'string')
				str += '"' + obj[prop].replace(/\"/g,'\\"') + '"';
			else
				str += obj[prop];
		}
		str += ',';
	}
	str = str.substring(0, str.length - 1);
	if(obj instanceof Array)
		str += ']';
	else
		str += '}';

	return str;
}
function concatObject(obj) {
	var str='';
	for(prop in obj){
		if(obj[prop] == '[object Object]')
			str += prop + ' {\n' + concatObject(obj[prop]) + '}\n';
		else
			str += prop + " : "+ obj[prop] + "\n";
	}
	return(str);
};
function showData(){
	alert(concatObject(JSONObject));
}
function queueStructures(i){
	$('select[name=add_stack]').attr('selectedIndex',i);
	$('input[value=Add to Queue]').click();
}
function getView(){
    var view = window.location.href.split("view=",2);
    if(view.length<=1)
		return "";
    view = view[1].split("&")[0];
    view = view.substring(0,1).toUpperCase() + view.substring(1);
    //console.info(view);
    return view;
}
function fixQueues(){
    if(document.evaluate('//a[text()="Cancel Production"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength > 5)
		return;

    var queueTitle = getView();
    //console.log("Fixing queues :" +queueTitle);
    if(queueTitle == "Structures" || queueTitle == "Defenses")
    queueTitle = "Construction Queue";
    if(queueTitle == "Research")
    queueTitle = "Research Queue";

    var queues = document.evaluate('//th[text()="'+queueTitle+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
    if(queues)
    {
        queues = queues.parentNode.parentNode.parentNode
        var fixedDiv = document.createElement("div");
        fixedDiv.setAttribute("id","queueFooter");
        fixedDiv.setAttribute('style','position: fixed; clear: both; width: 100%;bottom: 0px;left: 0px;align: center;');
        //console.log(queues);
        fixedDiv.appendChild(queues);
        document.body.appendChild(fixedDiv);

        var spacer = document.createElement('div');
        spacer.style.position="absolute";
        spacer.style.height = fixedDiv.offsetHeight;
        spacer.innerHTML = "&nbsp;";
        document.body.appendChild(spacer);
    }
}
function fleetQuickSum(){
  var start = false;

  $('table#guild_aggregate_fleet + br + table').find('th:contains(Fleets)').parent().siblings(':gt(0)')
  	.click(function(){
    	if (!start)
    	{
    		start = $(this);
    		//console.log('start: '+$(this).html());
    		start.css('background','#999999');
    	}
    	else
    	{
    		//console.log('stop: '+$(this).html());
    		var fleet = 0;
    		cur = $(this);

    		// sum fleets
    		while( cur.size() > 0 )
    		{
    			f = cur.children('td:eq(3)').text().replace(/,/g, '');
    			//console.log('f: '+f);
    			fleet += parseInt(f);

    			if (cur.text() == start.text())
    				break;

    			cur = cur.prev();
    		}
    		status('Selected Fleet Total: '+addCommas(fleet));
    		start.css('background','');

    		start = false;
    	}
    });
};
function addEmpireLinks(){
	if ( $('table:contains(EventsCapacitiesEconomyTradeStructuresFleetsUnitsTechnologiesScanners)').length == 0 )
	{
		$('table.top').after('<br /><table width="800" align="center" class="header"><tbody><tr><th width="11%" id="bases_events"><a href="empire.aspx?view=bases_events">Events</a></th><th width="11%" id="bases_capacities"><a href="empire.aspx?view=bases_capacities">Capacities</a></th><th width="11%" id="economy"><a href="empire.aspx?view=economy">Economy</a></th><th width="11%" id="trade"><a href="empire.aspx?view=trade">Trade</a></th><th width="11%" id="structures"><a href="empire.aspx?view=structures">Structures</a></th><th width="11%" id="fleets"><a href="empire.aspx?view=fleets">Fleets</a></th><th width="11%" id="units2"><a href="empire.aspx?view=units">Units</a></th><th width="12%" id="technologies"><a href="empire.aspx?view=technologies">Technologies</a></th><th width="11%" id="scanners"><a href="empire.aspx?ch=1&amp;view=scanners">Scanners</a></th></tr></tbody></table>');
	}
};

function fleetCombatUIChange(){
	$('input[value=Start Attack]').width(300).height(100).css({'font-size':'20pt','vertical-align':'top'});
	$('th:contains(Attack Force)').parent().siblings('tr').not(':first').each(function(){
		var ship_type = $(this).children('td').eq(0).text();
		if (ship_type == 'Fleet Carrier' || ship_type == 'Scout Ship' || ship_type == 'Carrier' || ship_type == 'Recycler')
			$(this).css('color', 'red');
	});
};
function fleetMoveUIChange(){
	var rows = $('table:contains(Distance) tr');
	if(rows.eq(6).children().eq(0).text() == 'Scout Ship' && rows.eq(7).children().eq(0).text() == '' && rows.eq(6).children().eq(2).text() == '1'){
		$('input:first', rows.eq(6)).attr('value', '1');
	}
	$('#destination').select().attr('onmouseover', "$('#destination').select();")
		.parent().append("<br><a href='#'>Find JG</a>")
		.find('a').click(function(){
			jgSearch();
			return false;
		});
	// fleet negation link
	$('a:contains(None)').parent().append('&nbsp;-&nbsp;').append( $('<a href="#">Negate</a>').
		click(function(){
			$('[id^=avail]').each(function(){
				var inp = $(this).parent().find('td input');
				var v = inp.val();
				var av = $(this).text();
				if (av-v == 0)
					inp.val('');
				else
					inp.val( av - v );
				update(this.id.substring(5));
			})
			return false;
		})
		);
	$('.link_negate').click(function(){
		var parent = $(this).parents('tr');
		var inp = parent.find('td input:first');
		var avail = parent.find('td:eq(2)').text();
		var val = inp.val();
		if(avail - val <= 0)
			inp.val('');
		else
			inp.val(avail - val);
		inp.keyup();

	});
	$('.link_none').click(function(){
		var inp = $(this).parents('tr').find('td input:first');
		inp.val('').keyup();
	});
	setupLauncher();
};
function fleetPageUIChange(){
	// Changes fleet links to the move page
	var links = $("tr > td > a[href^='fleet.aspx?fleet=']");
	for(var i = 0; i < links.length; i++){
		var link = links.eq(i);
		if(link.parent().next().next().text() == '')
			link.attr('href', link.attr('href') + '&view=move');
	}

	// Adds hide fleet link
	var th = $("th.th_header2").append('<a id="hideFleetTableLink" href="#">hide</a>')
		.find('#hideFleetTableLink').click(function(){
			var n = $(this).text();
			if (n=='show') n = 'hide';
			else n = 'show';

			$(this).text(n).parents('tr').eq(0).siblings().toggle();
		}).css({'margin-left': '1em','font-size':'smaller'});
	if(location.search.match(/order=change/) == null){
		$('th:contains(Comment)').attr('width', '10%');
		var last_row = $('table:contains(Destination) tr:last');
		last_row
			.find('td:first').html(last_row.find('td:last').html())
			.attr('align', 'right')
			.attr('colspan', 6)
			.next()
			.remove();
	}
};
function fleetTableUIChange(){
	if($('#base_fleets').length > 0){
		var fleetTable = $('#base_fleets');
		var fleetRows = fleetTable.find('table tr:gt(0)');
	}
	else if($('#map_fleets').length > 0){
	var fleetTable = $('#map_fleets');
	var fleetRows = fleetTable.find('table tr:gt(0)');
	}
	else{
		var fleetTable = $('table:contains(Arrival)');
		var fleetRows = $('tr:gt(1)', fleetTable);
	}
	if(fleetRows.length == 1)
		return;

	var fleetArray = [];
	for(var i = 0; i < fleetRows.length; i++){
		var guild = $('td:eq(1)', fleetRows.eq(i)).text().match(/\[.*\]/);
		if(guild != null){
			guild = guild[0];
			guild = guild.substring(1, guild.length - 1);
		}
		else
			guild = '';
		guild_index = -1;
		for(var index in fleetArray)
			if(fleetArray[index].name == guild)
				guild_index = index;
		if(guild_index == -1){
			guild_object = {
				name : guild,
				size : 0,
				arrived : 0,
				incoming : 0,
				incoming_12h : 0,
				fleet : []};
			guild_index = fleetArray.length;
		}
		else
			guild_object = fleetArray[guild_index];
		var size = parseInt(fleetRows.eq(i).children('td:eq(3)').text().replace(/,/g, ''));
		guild_object.size += size * 1;
		var incoming_seconds = fleetRows.eq(i).children('td:eq(2)').attr('title');
		if (incoming_seconds == '')
		{
			guild_object.arrived += size * 1;
		}
		else
		{
			guild_object.incoming += size * 1;
			if (incoming_seconds <= (43200))
				guild_object.incoming_12h += size * 1;
		}
		guild_object.fleet.push(fleetRows.eq(i).html());
		fleetArray[guild_index] = guild_object;
	}

	// Reset table
	//fleetRows.remove();

	var guild_fleets = $('<table id="guild_aggregate_fleet" width="600" align="center"><tbody><tr><th colspan="5">Fleet Summary</th></tr><tr style="color:gold;"><th>Guild</th><th>Incoming (12h)</th><th>Landed</th><th>Total Fleet Size</th><th/></tr></tbody></table><br />');
	var guild_tr = $('tr:last', guild_fleets);

	for(guild in fleetArray)
	{
		var new_tr = $('<tr style="align:center;"></tr>');
		var o = fleetArray[guild];
		guild_array = o.fleet;
		new_tr.append('<td>['+o.name+']</td><td>'+addCommas(o.incoming)+' ('+addCommas(o.incoming_12h)+')</td><td>'+addCommas(o.arrived)+'</td><td>'+addCommas(o.incoming+o.arrived)+'</td>');
		new_tr.append( $('<td />').append(
			$('<a href="#">Hide</a>').data('guild', o.name ).data('show',true)
				.click(function(){
					var g = $(this).data('guild');
					var show = $(this).data('show');

					fleetRows.each(function(){
						var guild = $('td:eq(1)', this).text().match(/\[(.*)\]/);
						if (guild && guild[1] == g)
						{
							if (show) $(this).hide();
							else $(this).show();
						}
					});

					$(this).data('show', !show).text( (!show?'Hide':'Show') );
					return false;
				})
			)
		);

		guild_tr.after(new_tr.css('text-align', 'center'));
	}

	fleetTable.before(guild_fleets);
}

function astroPageUIChange(){
	var el = $('center:contains(Galaxies):eq(0)');
	var h = el.html();
	var arr = h.split("(");
	h = arr[1];
	var text = arr[0] + "(<input onMouseOver=\"$(\'#loc\').select();\" id='loc' size=12 value='";
	arr = h.split(")");
	text += arr[0] + "' />)" + arr[1];
	el.html(text);
	fleetTableUIChange();
};

function baseStructureUIChange(){
	$('.help').remove();
	$('#base_structures th:contains(Economy)').attr('width',50).text('Econ');
	$('th:contains(Build Time)').attr('width',200);
	if($('td.gray[align=center]:contains(working)').length != 0){
		$('#base_queue table select[name=add_stack] option').each(function(i){
			$('#base_structures table tr:contains(' + this.value + '):first td:eq(5)').attr('align', 'right').append("<a href='javascript:queueStructures(" + i + ");'>+</a>");
		});
	}
}
function baseDefenseUIChange(){
	$('.help').remove();
	$('th:contains(Economy)').attr('width',50).text('Econ');
	$('th:contains(Build Time)').attr('width',200);
	if($('td.gray[align=center]:contains(working)').length != 0){
		$('#base_queue table select[name=add_stack] option').each(function(i){
			$('#base_defenses table tr:contains(' + this.value + ') td:eq(5)').attr('align', 'right').append("<a href='#' onclick='queueStructures(" + i + ");'>Queue</a>");
		});
	}
}

function marqueeUIChange(){
	$('marquee a:contains([╰▲╯])').css('color','lime');
}
function creditPageUIChange(){
	$('#credits_table_inside table').attr('id', 'credits_list');
	$('#credits_table_inside').attr('width', '95%');
	$('#credits_list tr:gt(0)').each(function(){
		var time = $(this).find('td:first');
		var array1 = time.text().split(' ');
		if(array1.length > 1){
			var array2 = array1[1].split(':');
			if(array2[0] < 10)
				array2[0] = '0' + Number(array2[0]);
			time.text(array1[0] + ' ' + array2[0] + ':' + array2[1] + ':' + array2[2]);
		}
		else
			time.text(array1[0] + ' 00:00:00');
	});

	$('table:contains(CREDITS HISTORY) tr:eq(1) td:first').prepend("<center><a href='#'>Sort</a></center>").find('a').click(function(){
		var prodArray = [];
		var constArray = [];
		var incomeArray = [];
		var debrisArray = [];
		var otherArray = [];
		$('#credits_list tr:gt(0)').each(function(){
			if($(this).children().length != 4)
				return;
			var desc = $(this).find('td:eq(1)').text();
			if(desc.match(/Empire Income/) != null)
				incomeArray.push(this);
			else if(desc.match(/Construction/) != null)
				constArray.push(this);
			else if(desc.match(/Production/) != null)
				prodArray.push(this);
			else if(desc.match(/Debris Collect/) != null)
				debrisArray.push(this);
			else
				otherArray.push(this);
		});
		$('#credits_list tr:eq(0)').remove();
		var table = $('#credits_list');
		if(constArray.length > 0){
			table.append("<tr align='center'><th colspan=4>Construction</td></tr>");
			for(var i = 0; i < constArray.length; i++)
				table.append(constArray[i]);
		}
		if(prodArray.length > 0){
			table.append("<tr align='center'><th colspan=4>Production</td></tr>");
			for(var i = 0; i < prodArray.length; i++)
				table.append(prodArray[i]);
		}
		if(debrisArray.length > 0){
			table.append("<tr align='center'><th colspan=4>Debris</td></tr>");
			for(var i = 0; i < debrisArray.length; i++)
				table.append(debrisArray[i]);
		}
		if(incomeArray.length > 0){
			table.append("<tr align='center'><th colspan=4>Income</td></tr>");
			for(var i = 0; i < incomeArray.length; i++)
				table.append(incomeArray[i]);
		}
		if(otherArray.length > 0){
			table.append("<tr align='center'><th colspan=4>Other</td></tr>");
			for(var i = 0; i < otherArray.length; i++)
				table.append(otherArray[i]);
		}
	});
};
function boardUIChange(){
	// Replace checkboxes with delete links
	$('input[type=checkbox]').each(function(){
		var tag = $(this).after("&nbsp;&nbsp;	<a href='#'>Delete</a>");
	}).siblings('a').click(function(){
		$(this).prev().attr('checked',1);
		$('form:last').append("<input type='hidden' name='delete' value='Delete Selected' />").submit();
	});
};
function profileUIChange(){
	$('center:last').after("<br><center><a href='javascript:playerSummary();'><font color='orange'>Player Summary</font></a></center>");
}

function empireFleetUIChange(){
	// Direct link to move page
	$('#empire_fleets table tr:gt(0)')
		.each(function(){
			var obj = $(this);
			if(obj.children('td:eq(1)').text().substring(0,1) != '*'){
				var link = $('a:first', obj);
				link.attr('href', link.attr('href') + '&view=move');
			}
		})
		.hover(
			function(){
				$(this).css({'background':'#333333', 'color':'red'});
				$('td',this).css('color','');
			},
			function(){
				$(this).css({'background':'','color':''});
				$('td:even',this).css('color','#aaaaaa');
			})
		.find('td:even:gt(0)')
		.add('#empire_fleets table tr:eq(0) th:even:gt(0)')
		.css({'color':'#aaaaaa','background':'black'});
}
function empireStructuresUIChange(){
	if($('table:last').text().match(/This feature is only for upgraded accounts\./)){

	}
	else{
		$('#empire_structures table tr:eq(0) th:gt(0)[width=18]').each(function(i){
			if (i%2==0) $(this).css('color','#aaaaaa');
			var name = $.trim($(this).text());
			$(this).attr('title', name ).css('font-weight', 'bold').css('font-size', '8pt');

			var name = name.split(' ');
			if (name.length == 1)
			{
				$(this).text( name[0][0] + name[0][1] );
			}
			else
			{
				$(this).text( name[0][0] + name[1][0] );
			}
		});
		$('#empire_structures table tr:gt(0) td:odd').css({'color':'#aaaaaa','background':'black'});
		$('#empire_structures table tr:gt(0)')
			.hover(function(){
				$(this).css({'background':'#333333', 'color':'red'});
				$('td',this).css('color','');
			},function(){
				$(this).css({'background':'','color':''});
				$('td:odd',this).css({'color':'#aaaaaa','background':'black'});
			});

		// Sends directly to the structure page
		$('#empire_structures table tr:gt(0)').each(function(){
			var obj = $(this);
			var link = $('a:first', this);
			link.attr('href', link.attr('href') + '&view=structures');
		});
	}
}
function empireTradeHideFull(){
	var trade_show = true;
	var rows = $('#empire_trade_bases table tr:gt(0)');
	$('a[href*=full=hide]:contains(Hide full bases)')
		.click(function(){
			rows.each(function(){
				var trades = $(this).children('td:eq(3)').text().match(/(\d)\s+\/\s+(\d)/);
				if (trades)
				{
					if (trades[1] == trades[2])
					{
						if (trade_show)$(this).hide();
						else $(this).show();
					}
				}
			});

			trade_show = !trade_show;

			if (!trade_show)
				$(this).text('Show all bases');
			else
				$(this).text('Hide full bases');

			return false;
		});
}
function empireTradeUIChange(){
	
	// Stores all the base locations for use in potential distances
	var base_locations = new Object;
	$('#empire_trade_bases table tr:gt(0)').each(function(){
		var tds = $(this).children('td');
		if(tds.length < 2)
			return;
		var base_link= tds.eq(0).children('a');
		if(!base_link.length)
			return;
		var base_id = base_link.attr('href').match(/\d+/);
		if(!base_id)
			return;
		base_locations[base_id[0]] = tds.eq(1).text();
	});

	
	// Just gets this from bottom of the screen for use in potential income
	var num_players = $('#empire_trade_formula center').text().match(/Players = Total players involved in trading = (\d+)/)[1];
	var pot_players = $('#empire_trade_bases table tr:contains(Total)').text().match(/\d+\/(\d+)/)[1] * 1 + 1;
	
	// Adds the two additional columns as well as sets the click trigger
	$('#empire_trade_trade-routes table tr:eq(0)').append("<th>Pot</th><th><a href='#' id='sortPercentage'>%</a></th>");

	// My terrible sorting algorithm (insertion)
	$('#sortPercentage')
		.click(function(){
			var trade_table = $('#empire_trade_trade-routes table');
			var trade_rows = [];
			$('tr:gt(0):not(:last)', trade_table).each(function(){
				trade_rows.push({
					value : $(this).children('td:eq(8)').text(),
					html : $(this).html()
				});
			});;

			var lastRow = $('tr:last', trade_table).html();
			$('tr:gt(0)', trade_table).remove();
			for(var i = 0; i < trade_rows.length; i++){

				var minVal = trade_rows[i].value - 1;
				var minIndex = i;
				for(var j = i + 1; j < trade_rows.length; j++){
					var tempVal = trade_rows[j].value - 1;
					if(tempVal < minVal){
						minVal = tempVal;
						minIndex = j;
					}
				}
				trade_table.append("<tr align='center'>" + trade_rows[minIndex].html + '</tr>');
				if(minIndex != i){
					trade_rows[minIndex] = trade_rows[i];
				}

			}
			trade_table.append("<tr align='center'>" + lastRow + "</tr>");
		});

	// Iterates through each row
	var pot_total = 0;
	$('#empire_trade_trade-routes table tr:gt(0):not(:last)').each(function(){
		var row = $(this);
		var link = $('a:first', row);
		link.attr('href', link.attr('href')  + '&view=trade');
		var tds = row.children();
		var econ1 = tds.eq(2).text().match(/\d+/)[0];
		var econ2 = tds.eq(3).text().match(/\d+/)[0];

		var tr_econ = Math.sqrt(Math.min(econ1, econ2)) * (1 + Math.sqrt(tds.eq(4).text().replace(/,/g,''))/75 + Math.sqrt(num_players) / 10);
		var base_loc = base_locations[$('a:first', tds.eq(0)).attr('href').match(/\d+/)[0]];
		var base_gal = base_loc.charAt(2);
		var pot_distance = 3800 + 200 * Math.max(base_gal, 9-base_gal);
		var pot_econ = Math.sqrt(econ1) * (1 + Math.sqrt(pot_distance) / 75 + Math.sqrt(pot_players) / 10);
		pot_total += Math.ceil(pot_econ);
		row.append('<td>' + Math.ceil(pot_econ) + '</td><td>' + Math.round(100 * tr_econ / pot_econ) + "</td>");
		tds = row.children();
		if(econ1 - econ2 > 40)
			tds.slice(2,9).css('color', 'red');
		else if(econ1 - econ2 > 30)
			tds.slice(2,9).css('color', 'orange');
		else if(econ1 - econ2 > 20)
			tds.slice(2,9).css('color', 'yellow');
		else if(econ2 - econ1 > 20)
			tds.slice(2,9).css('color', 'lime');
	});

	var last_row = $('#empire_trade_trade-routes tr:last');
	var total_econ = $('td:eq(6)', last_row).text();
	last_row.append("<th>" + pot_total + "</th><th>" + Math.round(100 * total_econ / pot_total) + "</th>");

	empireTradeHideFull();
}
function empireScannerUIChange(){
	var fleetTable = $('#empire_scanners table');
	fleetTable.find('th:first').attr('width', '15%').siblings('th:contains(Arrival)').attr('width','15%');
	var fleetRows = $('tr:gt(0)', fleetTable);
	var fleetArray = [];
	for(var i = 0; i < fleetRows.length; i++){
		var guild = $('td:eq(1)', fleetRows.eq(i)).text().match(/\[.*\]/);
		if(guild != null){
			guild = guild[0];
			guild = guild.substring(1, guild.length - 1);
		}
		else
			guild = '';
		guild_index = -1;
		for(var index in fleetArray)
			if(fleetArray[index].name == guild)
				guild_index = index;
		if(guild_index == -1)
			fleetArray.push({
				name : guild,
				fleet : [fleetRows.eq(i).html()]});
		else
			fleetArray[guild_index].fleet.push(fleetRows.eq(i).html());
	}
	fleetRows.remove();
	for(var guild in fleetArray){
		var guild_array = fleetArray[guild];
		fleetTable.append("<tr class='guild_header" + guild + "'><td align='center' colspan=5><br><b>["+fleetArray[guild].name+"] (" + guild_array.fleet.length + ")</b></td></tr>");
		$('tr:last', fleetTable).click(function(){
			$('tr.guild' + $(this).attr('class').match(/\d+/)[0]).toggle();
		});
		for(var i in guild_array.fleet)
			fleetTable.append("<tr class='guild" + guild + "' align='center'>" + guild_array.fleet[i] + '</tr>');
	}
}
function empireUnitsUIChange(){
	var table = $('#empire_units_summary table');
	var total_fleets = Number(table.find('tr:contains(Maximum Number of Fleets) td:last').text());
	var num_fleets = Number(table.find('tr:contains(Number of Fleets):first td:last').text());
	table.append("<tr><td>&nbsp;</td><td></td></tr><tr align='center'><th>Free Fleets</th><td>" + (total_fleets - num_fleets) + "</td></tr>");
}
function empireEventsUIChange(){
	$('small:contains(Note: (x) is equal to Queue quantity)').remove();
	// If no occs, then just remove that column
	if($('table#empire_events table tr:odd td:nth-child(4) a[href^=profile]').text() == '')
		$('table#empire_events table tr').each(function(i){
			if(i == 0)
				$('th:eq(3)', this).remove();
			else if(i % 2 == 1)
				$('td:eq(3)', this).remove();
			else
				$('td:eq(1)', this).remove();
		});
	// Adds hide link
	var th = $("th.th_header2").append('<a id="hideFleetTableLink" href="#">hide</a>')
		.find('#hideFleetTableLink').click(function(){
			var n = $(this).text();
			if (n=='show') n = 'hide';
			else n = 'show';
			$(this).text(n).parents('tr').eq(0).siblings().toggle();
			return false;
		}).css({'margin-left': '1em','font-size':'smaller'});
}
function empireCapacitiesUIChange(){
	if($('table:last').text().match(/This feature is only for upgraded accounts\./)){
		$('table:last:contains(This feature)').attr('id', 'capacities_table').html("<tr><th colspan='8' class='th_header2'><font size='+1'>B</font>ASES PROCESSING CAPACITIES <small>(FROM OPCEN)</small></th></tr><tr align='left'><th><a href='#'>Name</a></th><th><a href='#'>Location</a></th><th><a href='#'>Type</a></th><th><a href='#'>Economy</a></th><th><a href='#'>Construction</a></th><th><a href='#'>Production <small>(Shipyards)</small></a></th><th><a href='#'>Research <small>(Labs)</small></a></th><th><a href='#'>Days</a></th></tr>").find('a').click(function(){
			JSONObject.request = { mode : "capacities", order : encodeURIComponent($(this).text())};
			getData(capacitiesCallback);
			return false;
		}).eq(0).click();
	}
}
function receivedTradeRoutes(){
	$('tr:has(td + td:contains(Reply - Block Player -))').each(function(){
		var msgbody = $(this).next().text();
		var from = $(this).children().eq(1).text();
		var fromid = $(this).find('a[href*=profile.aspx?player=]').attr('href').match(/player=(\d+)/)[1];
		var at = $(this).children().eq(3).text();
		var replyurl = $(this).children().eq(2).find('a:contains(Reply)').attr('href');
		if (msgbody.match(/[A-F]\d\d:\d\d:\d\d:\d\d\s+\d{1,3}\s*\/\d{1,3}\s+\d\s*\/\s*\d/i) ){
			$(this).children().eq(2).append('&nbsp;-&nbsp;<a href="#">Post TR</a>').find('a:contains(Post TR)').click(function(){
				var result = msgbody.match(/[A-F]\d\d:\d\d:\d\d:\d\d\s+\d{1,3}\s*\/\d{1,3}\s+\d\s*\/\s*\d/g);
				var bases = [];
				var message = msgbody;
				var data = {
					mode : 'trade_routes',
					submode : 'insert'
				}
				for(var i in result){
					var trs = result[i].match(/([A-F]\d\d:\d\d:\d\d:\d\d)\s+(\d{1,3})\s*\/(\d{1,3})\s+(\d)\s*\/\s*(\d)/);
					if(trs && trs.length == 6 && trs[4] < trs[5]){
						bases.push({
							coords : trs[1],
							current_econ : trs[2],
							max_econ : trs[3]
						});
						message = message.replace(trs[0], '');
					}
				}
				var result = message.match(/(\d{3,4})\+*/);
				var result2 = message.match(/(\d\.*\d*)k/);
				var result3 = message.match(/(\d,\d{3})/);
				if(result && (result[1] % 100) == 0){
					data['min_distance'] = result[1];
					message = message.replace(result[0], '');
				}
				else if(result2){
					data['min_distance'] = result2[1] * 1000;
					message = message.replace(result2[0], '');
				}
				else if(result3){
					data['min_distance'] = result3[1].replace(/,/g, '');
					message = message.replace(result3[0], '');
				}
				else
					data['min_distance'] = 0;
				var result = message.match(/\+\/*-\s*(\d{1,2})/);
				if(result){
					data['econ_diff'] = result[1];
				}
				else
					data['econ_diff'] = 50;
				for(var i in bases)
					data[i] = bases[i];
				data['player_id'] = fromid;
				JSONObject.request = data;
				getData();
				$(this).remove();
				return false;
			});
		}
	});
}
function getTradeRoutes(){
	var selectHtml = '';
	for(var i = 0; i <= 5600; i += 200){
		if(i == 4000)
			selectHtml += "<option selected>" + i + "</option>";
		else
			selectHtml += "<option>" + i + "</option>";
	}
	$('th[colspan=5]:last')
		.html(
	// $('body').append(
"<div align='center' id='trade_request_div'>" +
	"<fieldset style='width:600px;'><legend><font size='+1'>T</font>RADE REQUEST OPTIONS</legend>"+
		"Minimum Distance: <select id='mindistance'>" + selectHtml + "</select><br>"+
		"Econ Difference: +/-<select id='econdiff'>" +
			"<option>5</option>" +
			"<option selected>10</option>" +
			"<option>15</option>" +
			"<option>20</option>" +
		"</select><br>" +
		"<input type='button' id='send' value='Send' />" +
	"</fieldset></div><div id='trade_result_div' align='center'></div>"
	).find('#send').click(function(){
		var coords = $('#start').text();
		var econ = $('th:contains(Economy)').next('td').text();
		var min_distance = $('#mindistance').val();
		var econ_diff = $('#econdiff option:selected').text();
		if(econ == '')
			econ = 190;
		if(coords == '')
			coords = 'F22:22:22:22';
		if(coords.match(/[A-F]\d\d:\d\d:\d\d:\d\d/) != null &&
			!isNaN(econ) && !isNaN(min_distance) && !isNaN(econ_diff)){
			var data = {
				mode : 'trade_routes',
				submode : 'get',
				start : coords,
				econ : econ,
				min_distance : min_distance,
				econ_diff : econ_diff
			};
			$('#send').attr('disabled', true);
			$('#trade_result_div').html('Searching...');
			JSONObject.request = data;
			getData(function(data){
				if(typeof data.response != 'undefined'){
					var response = data.response;
					var html = '';
					if(response.num > 0){
						html += 'Number of Responses: ' + response.num + "<br>";
						html += "<table class='no_back'><tr><th>Coordinates</th>" +
							"<th>Econ</th><th>Diff</th><th>Distance</th></tr>";

						for(var i = 0; i < response.num; i++){
							var entry = response[i];
							if(typeof entry != 'undefined' && !isNaN(entry.current_econ) &&
								!isNaN(entry.max_econ) &&
								entry.coords.match(/[A-F]\d\d:\d\d:\d\d:\d\d/) != null && !isNaN(entry.distance)){
								html += "<tr align='center'><td><a href=\"javascript:fastloc('" + entry.coords + "');\">" + entry.coords + "</a></td><td>" + entry.current_econ + "/" + entry.max_econ + "</td><td>" + (entry.current_econ - econ) + "</td><td>" + entry.distance + "</td></tr>";
							}
						}
						html += "</table>";
					}
					else
						html += 'No results';
					$('#trade_result_div').html(html);
					$('#send').attr('disabled', false);
				}
			});
		}
		else
			$('#trade_result_div').html('Invalid Parameters');
		return false;
	});
}
function sendTradeRoutes(){
	emptyCount = 0;
	trades = [];
	$('#empire_trade_bases table tr:gt(0)').each(function(){
		var tds = $(this).children('td');
		if(tds.length == 4 &&
			(loc = tds.eq(1).text().match(/[A-F]\d\d:\d\d:\d\d:\d\d/)) &&
			(econ = tds.eq(2).text().match(/(\d+) *\/ *(\d+)/)) &&
			(open = tds.eq(3).text().match(/(\d+) *\/ *(\d+)/)) &&
			open[1] != open[2]){
			emptyCount++;
			trades.push({
				coords : loc[0],
				current_econ : econ[1],
				max_econ : econ[2]
			});
		}
	});
	if(emptyCount > 0){
		$('#empire_trade_bases')
			.after("<div align='center' id='trade_request_div'>" +
				"<fieldset style='width:600px;'><legend><font size='+1'>T</font>RADE REQUEST OPTIONS</legend>"+
				"Minimum Distance: <input type='text' id='mindistance' max-length=4 size=4 value=4000 /><br>"+
				"Econ Difference: +/-<select id='econdiff'><option></option><option>5</option><option selected>10</option><option>15</option><option>20</option></select><br>" +
				"<input type='button' id='send' value='Send' />" +
				"</fieldset></div>");
		$('#send').click(function(){
			var data = {
				mode : 'trade_routes',
				player_id : player_id,
				submode : 'insert',
				min_distance : $('#mindistance').val(),
				econ_diff : $('#econdiff :selected').text()
			};
			for(var i in trades)
				data[i] = trades[i];
			JSONObject.request = data;
			getData(function(data){
				if(data.response != ''){
					$('#trade_request_div').html(data.response);
				}
			});
			$('#trade_request_div').html('');
		});
	}
}

function jgSearch(){
	var sloc = $('#start').text();
	var dloc = $('#destination').attr('value');
	JSONObject.request = {
		mode: "jg_search",
		sloc: sloc,
		dloc: dloc};
	getData(function(data){
		if(data.result != dloc && data.result != sloc){
			$('#destination').attr('value',data.result).css('background-color', '#008800');
			calc_distance();
		}
		else
			$('#destination').css('background-color', '#880000');
	});
}
function playerSummary(){
	var id = decodeURIComponent(window.location.search).replace('?','').match(/\d+/)[0];
	JSONObject.request = {
		mode : 'player_summary',
		id : id};
	getData(function(r){
		$('#player_info').remove();
		var bases = r.result.bases;
		var players = r.result.players;
		var fleets = r.result.fleets;
		$('center:last').after("<div align='center' id='player_info'></div>");
		if(bases.length > 0){
			$('#player_info').append("<table width=600 id='player_info_bases'><tr><th align='center' colspan=7><font size='+1'>B</font>ASES</th></tr><tr><th>Base ID</th><th>Location</th><th>Econ</th><th>P-Rings</th><th>P-Shields</th><th>JG</th><th>Days Ago</th></tr></table><br>");
			for(var i in bases){
				var base = bases[i];
				$('#player_info_bases').append("<tr align='center'><td><a href='base.aspx?base=" + base.base_id + "' target='_blank'>" + base.base_id + "</a></td><td><a href='map.aspx?loc=" + base.coords + "' target='_blank'>" + base.coords + "</a></td><td>" + base.current_econ + " / " + base.max_econ + "</td><td>" + base.p_ring + "</td><td>" + base.p_shield + "</td><td>" + (base.jump_gate==0?'-':base.jump_gate)+ "</td><td>" + base.t + "</td></tr>");
			}
		}
		else
			$('#player_info').append('<p>No bases in OpCen</p>');
		if(fleets.length > 0){
			$('#player_info').append("<table width=600 id='player_info_fleet'><tr><th align='center' colspan=5><font size='+1'>F</font>LEET <small>Scouted within last 30 days</small></th></tr><tr><th>Fleet ID</th><th>Destination</th><th>Arrival</th><th>Size</th><th>Days Ago</th></tr></table><br>");
			for(var i in fleets){
				var fleet = fleets[i];
				$('#player_info_fleet').append("<tr align='center'><td><a href='fleet.aspx?fleet=" + fleet.fleet_id + "' target='_blank'>" + fleet.fleet_id + "</a></td><td><a href='map.aspx?loc=" + fleet.coords + "' target='_blank'>" + fleet.coords + "</a></td><td>" + fleet.arrival + "</td><td>" + fleet.size + "</td><td>" + fleet.t + "</td></tr>");
			}
		}
		else
			$('#player_info').append('<p>No fleet in OpCen</p>');
		if(typeof playerSummaryFollowup == 'function')
			playerSummaryFollowup();
		// if(players.length > 0){
			// $('#player_info').append("<table width=400 id='player_info_players'><tr><th align='center' colspan=3><font size='+1'>P</font>LAYER HISTORY</th></tr><tr align='center'><th>Guild</th><th>Name</th><th>Days Ago</th></tr></table><br>");
			// for(i in players){
				// var player = players[i];
				// $('#player_info_players').append("<tr align='center'><td>" + decodeURIComponent(decodeURIComponent(player.guild)) + "</td><td>" + decodeURIComponent(decodeURIComponent(player.player)) + "</td><td>" + player.t + "</td></tr>");
			// }
		// }
	});
}
function capacitiesCallback(data){
	var table = $('#capacities_table');
	$('#capacities_table tr:gt(1)').remove();
	var prod_total = 0;
	var mod_prod_total = 0;
	var const_total = 0;
	var mod_const_total = 0;
	var res_total = 0;
	var lab_total = 0;
	var lab_total2 = 0;
	var res_total2 = 0;
	var current_econ_total = 0;
	var max_econ_total = 0;
	for(i in data.response){
		var row = data.response[i]
		table.append("<tr><td><a href='base.aspx?base=" + row.base_id + "' target='_blank'>" + row.base_name + 
		"</a></td><td>" + row.coords + "</td><td>" + row.terrain + 
		"</td><td>" + row.current_econ + " / " + row.max_econ + 
		"</td><td>" + row.construction + "</td><td>" + row.production + " <small>(" + 
		row.shipyards + "/" + row.orbital_shipyards + ") (" + row.mr + "/" + row.rf + 
		"/" + row.nf + "/" + row.af + ")</small></td><td>" + 
		row.research + " (" + row.research_labs + ")</td><td>" + row.days + "</td></tr>");
		if(row.comm_level > 0)
			table.append("<tr><td style='color:gray;' colspan=8>" + row.comm_type + " " + row.comm_level + "</td></tr>");
			
		row.research = Number(row.research);
		row.construction = Number(row.construction);
		row.production = Number(row.production);
		row.current_econ = Number(row.current_econ);
		row.max_econ = Number(row.max_econ);
		row.research_labs = Number(row.research_labs);
			
		if(row.research_labs > 0 && row.research / row.research_labs < 12){
			res_total2 += row.research;
			lab_total2 += row.research_labs;
		}
		res_total += row.research;
		if(row.comm_type == 'Construction')
			mod_const_total += row.construction / (1 - row.comm_level / 100);
		else
			mod_const_total += row.construction;
		prod_total += row.production;
		if(row.comm_type == 'Production')
			mod_prod_total += row.production / (1 - row.comm_level / 100);
		else
			mod_prod_total += row.production;
		const_total += row.construction;
		lab_total += row.research_labs;
		current_econ_total += row.current_econ;
		max_econ_total += row.max_econ;
	}
	if(res_total2 > 0 && res_total != res_total2){
		var ai_level = Math.round((res_total2 / lab_total2 / 6 - 1) / .05);
		res_total = Math.round(lab_total * 6 * (1 + .05 * ai_level));
	}
	table.append("<tr><td colspan=3>Total</td><td>" + current_econ_total + " / " + max_econ_total + 
		"</td><td>" + const_total + " (" + Math.round(mod_const_total) + 
		")</td><td>" + prod_total + " (" + Math.round(mod_prod_total) +
		")</td><td>" + res_total + " (" + lab_total + ")</td><td></td></tr>");
}
function findAstro(){
	var search = decodeURIComponent(window.location.search);
	
	if(r = search.match(/[A-F]\d\d:\d\d:\d\d/))
		var coords = r[0];
	else if(r = search.match(/[A-F]\d\d:\d\d/))
		var coords = r[0];
	else
		return false;
	
	$('a:contains(Find Astro):first').after("<div id='find_astro_div'>Searching...</div>").remove();
	JSONObject.request = {
		mode : 'astro_search',
		coords : coords
	};
	getData(function(data){
		if(data.response == 0)
			$('#find_astro_div').text('No result');
		else
			$('#find_astro_div').html("<input type='text' size=12 value='" + data.response + "' />").find('input').select();
	});
	
	return false;
}

// Fleet Launcher
function setupLauncher(){
	var small_text = $('small:contains(Server time):first').text().match(/\d+-\d+-\d{4} \d+:\d\d:\d\d/);
	var HOUR_DIFFERENCE = 2;
	if(small_text && small_text.length > 0)
		var server_time = stringToUnixTime(small_text[0]);
	else
		var server_time = page_load_time + HOUR_DIFFERENCE * 3600 * 1000;
	$('body').append("<center><fieldset style='width:400'><legend>Fleet Launcher</legend><input type='text' id='launch_time' /><input type='button' id='launch_button' value='Launch Time' /><br><br><input type='text' id='land_time' /><input type='button' id='land_button' value='Land Time' /><br><div id='launch_timer_div' style='display:none;'>Launching in: <span id='launch_timer'></span></div></fieldset></center>");

	$('#launch_button').click(function(){
		launch_time = stringToUnixTime($('#launch_time').val());
		if(launch_time == 0){
			status('Invalid launch time');
			return false;
		}
		launch_time = launch_time - server_time + page_load_time;

		prepareLauncher();
		return false;
	});

	$('#land_button').click(function(){
		launch_time = stringToUnixTime($('#land_time').val());
		if(launch_time == 0){
			status('Invalid land time');
			return false;
		}
		var log = $('#logistics');
		var log_level = (log.length == 1)?Number(log.attr('title')):0;

		var max_speed = Number($('#maxspeed').text());
		var distance = Number($('#distance').html());

		if(isNaN(max_speed) || isNaN(distance) || max_speed < 1 || distance <= 0 || isNaN(log_level)){
			status('Invalid distance/speed/log');
			return false;
		}
		var duration = calculateDuration(distance, max_speed, log_level);
		launch_time = launch_time - duration - server_time + page_load_time;

		prepareLauncher();
		return false;
	});
}
function launchFleet(){
	var remaining_time = Math.floor((launch_time - getTime()) / 1000);
	if(remaining_time < 0)
		$('input:visible[type=submit][value=Move]').click();
	else
		updateLaunchTimer(remaining_time);
	return false;
}
function updateLaunchTimer(time){
	if(time > 0){
		var secs = time % 60;
		time = Math.floor((time - secs) / 60);
		var mins = time % 60;
		var hrs = Math.floor((time - mins) / 60);
		if(mins < 10)
			mins = '0' + mins;
		if(secs < 10)
			secs = '0' + secs;
		$('#launch_timer').text(hrs + ':' + mins + ':' + secs);
	}
}
function prepareLauncher(){
	$('#launch_timer_div').show();
	launchFleet();
	if(typeof interval_ID != 'undefined' && !isNaN(interval_ID))
		window.clearInterval(interval_ID);
	interval_ID = window.setInterval(launchFleet, 1000);
}function privateUIPage(){
	var search = decodeURIComponent(window.location.search).replace('?','');
	switch(location.pathname.replace('/', '').replace('.aspx', '')){
		case 'map':
			var region = search.match(/loc=([A-F]\d\d:\d\d)/);
			var system = search.match(/loc=([A-F]\d\d:\d\d:\d\d)/);
			var astro = search.match(/loc=([A-F]\d\d:\d\d:\d\d:\d\d)/);
	        if (system != null){
				if(visibleSystem())
					mapSystemUIChange();
			}
			else if (region != null){
				var stag = $('script:contains(color()');
				if(stag != null && stag.length > 0 && stag.html().match(region[1]) != null)
					mapRegionUIChange();
			}
			break;
		case 'empire':
			if(search == '' || search.match(/view=bases_events/) != null){
				privateEmpireEventsUIChange();
			}
			break;
	}
};
function genericSystemDataFunction(){
	systemDataFunction = function(system, data){
		var row = $('#scoutTable tr:contains(' + system + '):last');
		if(row.length == 0)
			row = $('#scoutTable tr:last');
		astroIndex = 0;
		astros = [];
		var newHtml = '';
		$(data).each(function(){		
			astros.push({
				coord : this.coord,
				base : this.base,
				url : this.url});
			newHtml += "<tr><td>" + this.coord + "</td><td>" +
				this.player + "</td><td>" + this.occ + "</td><td>";
			if(this.debris > 0)
				newHtml += this.debris + " Debris<br>";
			newHtml += "</td></tr>";
		});
		row.after(newHtml);
	};
};
function genericFleetDataFunction(){
	fleetDataFunction = function(coord, data){
		var row = $('#scoutTable tr:contains(' + coord + ')');
		$('td:first', row).wrapInner("<a href='map.aspx?loc=" + coord + "' target='_blank' style='color : lime;'></a>");
		var fleetDisp = $('td:last', row).html();
		$(data).each(function(){
			fleetDisp += (this.arrival!=0? '* ' : '') + "<a href='profile.aspx?player=" + this.player_id +
				"' target='_blank'>" + this.player_name + "</a> " +
				"<a href='fleet.aspx?fleet=" + this.id + "' target='_blank'>" + addCommas(this.size) + "</a>" + "<br>";
		});
		$('td:last', row).html(fleetDisp);
	};
};
function genericBaseDataFunction(){
	baseDataFunction = function(coord, data){
		var row = $('#scoutTable tr:contains(' + coord + ')');
		$('td:eq(1)',row).wrapInner("<a href='profile.aspx?player=" + data.owner_id + "' target='_blank'></a>");
		if(data.occupier_id > 0)
			$('td:eq(2)',row).wrapInner("<a href='profile.aspx?player=" + data.occupier_id + "' target='_blank'></a>");
	};
};
function genericRegionDataFunction(){
	regionDataFunction = function(){
		$(systems).each(function(){$('#scoutTable').append("<tr><td colspan=4>" + this.coords + "</td></tr>");});
	};
};
function delayGet(url, callback, status_msg){
	if(status_msg)
		status(status_msg);
	window.setTimeout(function(){
		$.get(url, callback);
	}, randomTime(1000, 500));
}
function delayPost(url, data, callback, status_msg){
	if(status_msg)
		status(status_msg);
	window.setTimeout(function(){
		$.post(url, data, callback);
	}, randomTime(1000, 500));
}

function navigateSystems(){
	if(typeof systems != 'undefined' && systemIndex < systems.length){
		if(systems[systemIndex].is_astro){
			delayGet(systems[systemIndex++].url, astroToSystem, 'Opening astro page');
		}
		else{
			if(typeof systemStartFunction == 'function')
				systemStartFunction(systems[systemIndex].coords);
			window.setTimeout(function(){
					$.get(systems[systemIndex++].url, parseSystem);
				}, randomTime(500,1000));
		}
	}
	else{
		if(typeof regionFinishFunction == 'function')
			regionFinishFunction();
		if(typeof inhibit_navigateRegions == 'undefined')
		navigateRegions();
	}
}
function astroToSystem(msg){
	var system_link = $(msg).filter('center:contains(Galaxies)').find('a:contains(System)');
	if(system_link.length > 0){
		if(typeof systemStartFunction == 'function')
			systemStartFunction(systems[systemIndex - 1].coords);
		delayGet(system_link.attr('href'), parseSystem, 'Opening system page');
	}
	else
		status('No system link');
}
function navigateAstros(){
	if(typeof astros != 'undefined' && astroIndex < astros.length){
		var astro = astros[astroIndex++];
		if(typeof astroStartFunction == 'function')
			astroStartFunction(astro);
		window.setTimeout(function(){
			if(astro.base > 0)
				window.setTimeout(function(){
					$.get(astro.url, parseBase);
				});
			else
				window.setTimeout(function(){
					$.get(astro.url, parseAstro);
				});
		}, randomTime(500,1000));
	}
	else{
		if(typeof systemFinishFunction == 'function')
			systemFinishFunction();
		navigateSystems();
	}
}
function navigateRegions(){
	if(typeof regions != 'undefined' && regionIndex < regions.length){
		if(typeof regionStartFunction == 'function')
			regionStartFunction(regions[regionIndex].region);
		var go = function(){
			status('Visiting ' + regions[regionIndex].astro);
			$.get(regions[regionIndex++].url, function(msg){
				current_region_url = $(msg).find('a:contains(Region):first').attr('href');
				window.setTimeout(function(){
					status('Visiting ' + current_region_url.match(/[A-F]\d\d:\d\d/)[0]);
					systemIndex = 0;
					$.get(current_region_url, parseRegion);
				}, randomTime(1000,500));
			});
		}
		if(regionIndex > 0){
			var rtime = randomTime(2500, 5000);
			status('Waiting: ' + rtime + 'ms');
			window.setTimeout(go, rtime);
		}
		else
			go();

	}
	else if(typeof scoutFinishFunction == 'function')
		scoutFinishFunction();
}
function updatePage(msg){
	$('table table:contains(Credits)').html($('table table:contains(Credits)', $(msg).parent()).html());
	$('marquee').html($('marquee', $(msg).parent()).html());
	marqueeUIChange();
};

function systemScout(){
	$('#systemScoutDiv').after("<table id='scoutTable' class='no_back' align='center'>" +
		"<tr><td width=100>Location</td><td width=200>Player</td><td width=200>Occupier</td><td width=200>Fleet</td></tr></table>").remove();
	genericSystemDataFunction();
	genericFleetDataFunction();
	genericBaseDataFunction();
	parseSystem();
}
function regionScout(){
	$('#regionScoutDiv').html("<table id='scoutTable' class='no_back' align='center'>" +
		"<tr><td width=100>Location</td><td width=200>Player</td><td width=200>Occupier</td><td width=200>Fleet</td></tr></table>");
	genericRegionDataFunction();
	genericSystemDataFunction();
	genericFleetDataFunction();
	genericBaseDataFunction();
	regionFinishFunction = function(){
		$('#scoutTable td[colspan=4]').parent().remove();
		$('#scoutTable').before("<a href='#' id='toggleSummaryLink'>Summary</a>");
		clickFunction = function(){
			var link = $('#toggleSummaryLink');
			if(link.text() == 'Full')
				link.text('Summary');
			else
				link.text('Full');
			$('#scoutTable tr:gt(0)').each(function(){
				var last = $(this).children('td:last');
				if(last.text() != ''){
					var size = 0;
					$('a[href*=fleet]', last).each(function(){
						if($(this).text() != 'Move')
							size += 1 * $(this).text();
					});
					var match = false;
					$('a[href*=profile]', last).each(function(){
						if($(this).attr('href').match(/\d+/)[0] == player_id)
							match = true;
					});
					if(size < 100000 && !match)
						$(this).toggle();
				}
				else
					$(this).toggle();
			});
		};
		clickFunction();
		$('#toggleSummaryLink').click(clickFunction);

		var fullRegion = decodeURIComponent(location.search).match(/[A-F]\d\d:\d\d/)[0];
		var gal = fullRegion.match(/[A-F]\d\d:/)[0];
		var region = fullRegion.match(/\d\d/g)[1];
		var col = region % 10;
		var row = (region - col)/ 10;
		var tableHtml = "<table align='center' class='no_back' id='scoutAstroSearchTable'><tr align='center'><td></td><td>";
		tableHtml += (row > 0)?"<a href='#'>" + gal + (row - 1) + col + "</a>":"&nbsp;";
		tableHtml += "</td><td></td></tr><tr align='center'><td>";
		tableHtml += (col > 0)?"<a href='#'>" + gal + row + (col - 1) + "</a>":"&nbsp;";
		tableHtml += "</td><td id='scoutAstroSearchLink'>Search for Astro</td><td>";
		tableHtml += (col < 9)?"<a href='#'>" + gal + row + (col*1 + 1) + "</a>":"&nbsp;";
		tableHtml += "</td></tr><tr align='center'><td></td><td>";
		tableHtml += (row < 9)?"<a href='#'>" + gal + (row*1 + 1) + col + "</a>":"&nbsp;";
		tableHtml += "</td><td></td></tr></table>";
		$('#scoutTable').after(tableHtml);
		$('#scoutAstroSearchTable a').click(function(){
			scoutAstroSearch($(this).text());
		});
		document.title = "Astro Empires - Region Scout Finished";
	};
	systemFinishFunction = function(){
		$('td[colspan=4]:contains(' + systems[systemIndex - 1].coords + ')').css('color', 'lime');
	};
	systemIndex = 0;
	parseRegion();
}
function fleetRegionsScout(msg){
	if($('#regionsListTable').length > 0)
		return;
	$('a:contains(hide)').click();
	$('#divscoutoptions').after("<table align='center' class='no_back' width=600 id='regionsListTable'></table>").remove();
	$('#divgoods').remove();
	
	multiRegionScout();	
	startRegionsScout = function(){
		regions = [];
		$('#regionsListTable tr:last').remove();
		$('#regionsListTable tr')
			.each(function(){
				var checkBox = $(this).find('input');
				if(checkBox.attr('checked') != '')
					regions.push(tempRegions[checkBox.attr('index')]);
				else
					$(this).remove();
				checkBox.remove();
				$(this).find('td:gt(0)').toggle();
			});
		if(regions.length == 0)
			$('#regionsListTable').remove();
		else{
			$('#regionsListTable').after("<table id='scoutTable' class='no_back' align='center'>" +
				"<tr><td width=100>Location</td><td width=200>Player</td><td width=200>Occupier</td><td width=200>Fleet</td></tr></table>");
			regionIndex = 0;
			navigateRegions();
		}
	};
	tempRegions = [];
	$('table:contains(Arrival) tr:gt(1):not(:last)', $(msg).parent())
		.each(function(){
			var row = $(this);
		// If arrived and is named "Scout ###"
		if($('td:eq(2)', this).text() == '' && ($('td:first',this).text().match(/Scout/) != null || $('td:first',this).text().match(/\u003A/) != null)){
			var url = $('td:eq(1) a',this).attr('href');
			var astro = url.match(/[A-F]\d\d:\d\d:\d\d:\d\d/)[0];
			var region = astro.match(/[A-F]\d\d:\d\d/)[0];
			tempRegions.push({
				astro : astro,
				region : region,
				url : url
			});
			var loc = region.match(/\d\d/g);
			var col = loc[1] % 10;
			var row = (loc[1] - col) / 10;
			var next = (col < 9)?(region[0] + loc[0] + ":" + row + "" + (col + 1)): "";
			$('#regionsListTable').append("<tr><td><input type='checkbox' checked value='" + region + "' index=" + (tempRegions.length - 1) + " />" +
				region + "</td><td style='display:none'>" +
				((next != "")?next:"") +
				"</td><td style='display:none'>" +
				"<a href='fleet.aspx?fleet=" + $('td:first a', this).attr('href').match(/\d+/)[0] +
				"&view=move' target='_blank'>Move</a></td></tr>");
		}
	});
	if($('#regionsListTable tr').length > 0)
		$('#regionsListTable').append("<tr><td><input type='button' value='Start' /></td></tr>").find('input[type=button][value=Start]').click(startRegionsScout);

}
function baseRegionsScout(){
	$('a:contains(hide)').click();
	$('#divscoutoptions').after("<table id='scoutTable' class='no_back' align='center'>" +
		"<tr><td width=100>Location</td><td width=200>Player</td><td width=200>Occupier</td><td width=200>Fleet</td></tr></table>").remove();
	$('#divgoods').remove();
	multiRegionScout();
	var empire_table = $('table:contains(BASES EVENTS):first');
	var base_links = empire_table.find('tr td:nth-child(2) a');
	if(base_links.length == 0)
		return;
	regions = [];
	base_links.each(function(){
		var astro = $(this).text().match(/[A-F]\d\d:\d\d:\d\d:\d\d/);
		if(!astro)
			return;
		var region = astro[0].match(/[A-F]\d\d:\d\d/)[0];
		for(var i in regions)
			if(region == regions[i].region)
				return;
		regions.push({
			astro : astro[0],
			region : region,
			url : $(this).attr('href')
		});
	});
	regionIndex = 0;
	navigateRegions();
}
function basesScout(){
	$('a:contains(hide)').click();
	$('#divscoutoptions').after("<center id='bases_scout_div'></center>").remove();
	$('#divgoods').remove();
	baseDataFunction = function(coord, data){
		$('#bases_scout_div').append('Scouted ' + data.base_name + "<br>");
	};
	
	var empire_table = $('table:contains(BASES EVENTS):first');
	var base_links = empire_table.find('tr td:nth-child(1) a');
	// var coord_links = empire_table.find('tr td:nth-child(2) a');
	if(base_links.length == 0)
		return;	
	astros = [];
	base_links.each(function(){
		var url = $(this).attr('href')
		astros.push({
			url : url,
			base : url.match(/\d+/)[0]
		});
	});
	astroIndex = 0;
	navigateAstros();
}
function multiRegionScout(){
	systemFinishFunction = function(){
		$('td[colspan=4]:contains(' + systems[systemIndex - 1].coords + ')').css('color', 'lime');
	};
	regionFinishFunction = function(){
		var currentRegion = regions[regionIndex - 1].region	;
		var g = currentRegion.substr(0,4);
		var r = currentRegion.substr(4,2);
		$('#regionsListTable td:nth-child(1):contains(' + currentRegion + ')').wrapInner("<a href='" + current_region_url + "' target='_blank'></a>");
		if((r % 10) < 9){
			var newR = r * 1 + 1;
			if(newR < 10)
				newR = '0' + newR;
			newR = g + newR;
			$('#regionsListTable td:nth-child(2):contains(' + newR + ')').wrapInner("<a href='" + next_region_url + "' target='_blank'></a>");	
		}
		$('#regionsListTable td:contains(' + regions[regionIndex-1].region + ') a').css('color', 'lime');

	};
	scoutFinishFunction = function(){
		$('#scoutTable td[colspan=4]').parent().remove();
		$('#scoutTable').before("<center><a href='#' id='toggleSummaryLink'>Summary</a></center>");
		$('#toggleSummaryLink')
			.click(function(){
				var link = $('#toggleSummaryLink');
				if(link.text() == 'Full')
					link.text('Summary');
				else
					link.text('Full');
				$('#scoutTable tr:gt(0)').each(function(){
					var last = $(this).children('td:last');
					if(last.text() != ''){
						var size = 0;
						$('a[href*=fleet]', last).each(function(){
							if($(this).text() != 'Move')
								size += 1 * $(this).text();
						});
						var match = false;
						$('a[href*=profile]', last).each(function(){
							if($(this).attr('href').match(/\d+/)[0] == player_id)
								match = true;
						});
						if(size < 100000 && !match)
							$(this).toggle();
					}
					else
						$(this).toggle();
				});
			})
			.click();
	};
	genericRegionDataFunction();
	genericFleetDataFunction();
	genericBaseDataFunction();
	genericSystemDataFunction();
	genericBaseDataFunction();
}
function summarySystemsScout(){
	$('input[value=Parse Base Systems]').remove();
	$('#player_info').append("<table id='scoutTable' class='no_back' align='center'>" +
		"<tr><td width=100>Location</td><td width=200>Player</td><td width=200>Occupier</td><td width=200>Fleet</td></tr></table>");
	genericSystemDataFunction();
	genericFleetDataFunction();
	genericBaseDataFunction();
	systems = [];
	var location_links = $('#player_info_bases tr:gt(1) td:nth-child(2) a').each(function(){
		var link = $(this);
		var coords = link.text().match(/[A-F]\d\d:\d\d:\d\d/)[0];
		for(var i in systems)
			if(systems[i].coords == coords)
				return;
		systems.push({
			coords : coords,
			url : link.attr('href'),
			is_astro : true
		});
	});
	systemIndex = 0;
	navigateSystems();
}
function playerSummaryFollowup(){
	var table = $('table:contains(Player #)');
	var td = table.find('td:contains(Player #)');
	var result = td.find('a');
	if(result.length > 0){
		var result = result.attr('href').match(/guild=(\d+)/);
		if(result == null)
			return;
		var guild_id = result[1];
		if(guild_id == 6){
			$('#player_info').append("<center><input type='button' value='Parse Base Systems' onclick='summarySystemsScout();' /></center>");
		}
	}
}


// Disburse Fleet
function selectFleet(msg){
	$('a:contains(hide)').click();
	$('#divscoutoptions').remove();
	$('#divgoods').remove();
	
	var table = body.filter('#fleets-list').find('table');
	
	var locations = [];
	var scouts = [];
	gs_ignore_regions = [];
	table.find('tr:gt(0):not(:last)').each(function(){
		var cells = $(this).children('td');
		if(cells.length != 6)
			return;
		var loc = cells.eq(1).text();
		var dest = cells.eq(2).text();
		var obj = {
			location : loc,
			size : cells.eq(4).text(),
			fleet_name : cells.eq(0).text(),
			fleet_id : cells.eq(0).children('a').attr('href').match(/\d+/)[0]
		};
		
		if(dest != ''){
			if(Number(obj.size) == 40){
				obj.location = dest.match(/[A-F]\d\d:\d\d:\d\d:\d\d/)[0];
				scouts.push(obj);
			}	
		}
		else{
			gs_ignore_regions.push(loc.substr(0, 6));
			locations.push(obj);
		}
	});
	$('body').append("<div align='center' id='gs_status'>Select The Scout Fleet</div><table align='center' class='no_back' width=800 id='gs_lz_table'><tr><th>Select LZ</th><th>Fleet Name</th><th>Location</th><th>Size</th></table>" +
		"<center id='gs_fleet_name'>Scout Names: <input type='text' value='Scout' /></center>");
	for(var i in locations){
		var row = locations[i];
		$('#gs_lz_table').append("<tr><td><a href='#' title='" + row.fleet_id + "'>Select</a></td><td>" + row.fleet_name + 
			"</td><td>" + row.location + "</td><td>" + row.size + "</td></tr>");
	}
	$('#gs_lz_table a').click(function(){
		var result = $(this).parent().next().next().text().match(/[A-F]\d\d:\d\d:\d\d:\d\d/);
		if(!result)
			return false;
			
		gs_lz = result[0];
		gs_galaxy = gs_lz.match(/[A-F]\d\d/)[0];
		gs_lz_fleet_id = $(this).attr('title');
		gs_fleet_name = $('#gs_fleet_name input').val();
		gs_size = convertNumber($(this).parent().siblings('td:last').text());
		if(gs_fleet_name == '')
			gs_fleet_name = 'Scout';
		gs_to_rename = [];
		gs_ignore_rows = [];
		$('#gs_lz_table tr:gt(0)').each(function(){
			var id = $(this).find('td:first a').attr('title');
			var size = $(this).find('td:eq(3)').text();
			var name = $(this).find('td:eq(1)').text();
			var loc = $(this).find('td:eq(2)').text().match(/[A-F]\d\d:\d\d:\d\d:\d\d/)[0];
			var gal = loc.match(/[A-F]\d\d/)[0];
			if(gal == gs_galaxy && name.match(gs_fleet_name + ' [0-9]+$')){
				if(size == 40)
					gs_ignore_rows.push(Number(loc[4]));
				else if(!isNaN(id) && id != gs_lz_fleet_id)
					gs_to_rename.push(id);
			}
		});
		for(var i in locations){
			var loc = locations[i];
			var coords = loc.location.match(/[A-F]\d\d:\d\d:\d\d:\d\d/)[0];
			var gal = coords.match(/[A-F]\d\d/)[0];
			if(loc.fleet_name.match(gs_fleet_name + ' [0-9]+$') && gs_galaxy == gal)
				gs_ignore_rows.push(Number(coords[4]));
		}
		for(var i in scouts){
			var loc = scouts[i];
			var coords = loc.location.match(/[A-F]\d\d:\d\d:\d\d:\d\d/)[0];
			var gal = coords.match(/[A-F]\d\d/)[0];
			if(loc.fleet_name.match(gs_fleet_name + ' [0-9]+$') && gs_galaxy == gal)
				gs_ignore_rows.push(Number(coords[4]));
		}	

		$('#gs_lz_table, #gs_fleet_name').remove();
		$('#gs_status').text('Renaming fleets');
		renameFleet(gs_lz_fleet_id, gs_fleet_name, processFleetNames)
		return false;
	});
}
function processFleetNames(){
	if(gs_to_rename.length > 0){
		var id = gs_to_rename.pop();
		renameFleet(id, 'Fleet', processFleetNames);
	}
	else{
		$('#gs_status').text('Disbursing scouts');
		delayGet('fleet.aspx', selectGalaxy, 'Opening fleet page');
	}
}
function selectGalaxy(msg){
	var link = $(msg).find('small a:contains(' + gs_galaxy + '):last');
	if(link.length > 1)
		status('Bad links');
	else{
		gs_region_row = 0;
		gs_region_col = 0;
		if(link.length == 1)
			window.setTimeout(function(){
				status('Selecting galaxy ' + gs_galaxy);
				$.get(link.attr('href'), function(msg){
					if($(msg).find('small a:contains(' + gs_galaxy + '):last').length > 0)
						status('Error with fleet galaxy');
					else{
						traverseRows();
					}
				});
			}, randomTime(1000, 500));
		else
			traverseRows();
	}
}
function traverseRows(){
	var region = gs_galaxy + ':' + gs_region_row + gs_region_col;

	var nextRow = function(){
		if(gs_region_row < 9){
			gs_region_col = 0;
			gs_region_row++;
			window.setTimeout(traverseRows, randomTime(1000, 500));
		}
		else{
			$('#gs_status').text('Renaming lz fleet');
			if(gs_size != 400)
				renameFleet(gs_lz_fleet_id, 'Fleet', function(){			
					status('Done');
					$('#gs_status').text('Finished disbursing scouts');
				});
			else{
				status('Done');
				$('#gs_status').text('Finished disbursing scouts');			
			}
			
		}
	};
	var next = function(){
		if(gs_region_col < 9){
			gs_region_col++;
			traverseRows();
		}
		else
			nextRow();	
	};
	if(typeof gs_ignore_rows != 'undefined' && gs_ignore_rows.lastIndexOf(Number(gs_region_row)) != -1){
		status('Already a scout in row ' + gs_region_row);
		nextRow();
	}
	else if(typeof gs_ignore_regions != 'undefined' && gs_ignore_regions.lastIndexOf(region) != -1){
		status('Ignoring ' + region);
		next();
	}
	else{
		JSONObject.request = {
			mode : 'astro_search',
			coords : region
		};	
		getData(function(data){
			if(typeof data.response == 'undefined' || data.response == 0){
				status('No coords in opcen for ' + region);
				if(data.num_systems && data.num_systems > 0){
					status('Looking in region for an astro');
					gs_randomAstroInRegion(region, function(coords){
						if(coords && coords.match(/[A-F]\d\d:\d\d:\d\d:\d\d/))
							sendScout(gs_lz_fleet_id, coords, function(){
								window.setTimeout(nextRow, randomTime(1000, 500));
							});
						else
							next();
					});
				}
				else
					next();
			}
			else{
				status('Found ' + data.response);
				sendScout(gs_lz_fleet_id, data.response, function(){
					window.setTimeout(nextRow, randomTime(1000, 500));
				});
			}
		});
	}
}

// GS
function selectScoutGroup(msg){
	$('a:contains(hide)').click();
	$('#divscoutoptions').remove();
	$('#divgoods').remove();
	var body = $(msg);
	var table = body.filter('#fleets-list').find('table');
	var groups = [];
	
	table.find('tr:gt(0):not(:last)').each(function(){
		var cells = $(this).children('td');
		var name = cells.eq(0).text();
		var dest = cells.eq(2).text();
		if(dest == '')
			var gal = cells.eq(1).text().match(/[A-F]\d\d/)[0];
		else
			var gal = dest.match(/[A-F]\d\d/)[0];
		var result = name.match(/(.+) \d+$/);
		if(result)
			name = result[1];
		for(var i = 0; i < groups.length; i++){
			if(groups[i].name == name && groups[i].gal == gal){
				groups[i].size++;
				return;
			}
		}
		groups.push({
			size : 1,
			name : name,
			gal : gal
		});
	});
	
	groups.sort(function(a, b){	return -a.size + b.size;});
	inhibit_navigateRegions = true;
	multiRegionScout();	
	scoutFinishFunction = function(){delayGet('fleet.aspx', refreshScoutTable, 'Refreshing fleet');};
	regionFinishFunction = function(){
		var reg = regions[regionIndex - 1];
		var region = reg.region;
		var td = $('#gs_scout_fleet').find('td:nth-child(2) a:contains(' + region + ')').css('color', 'lime');		
		getNextRegion(gs_galaxy, region[4], Number(region[5]) + 1, function(coords){
			if(typeof coords != 'undefined' && coords.match(/[A-F]\d\d:\d\d:\d\d:\d\d/))
				sendScout(reg.fleet_id, coords, navigateRegions);
			else{
				renameFleet(reg.fleet_id, 'Fleet', function(){
					sendScout(reg.fleet_id, gs_lz, navigateRegions);
				});

			}
				
		});
	};
	$('body').append("<table align='center' class='no_back' width=800 id='gs_scout_group'><tr><th>Select Group</th><th>Fleet Name</th><th>Galaxy</th><th># Fleets</th></table>");
	for(var i in groups){
		var group = groups[i];
		$('#gs_scout_group').append("<tr><td><a href='#'>Select</a></td><td>" + group.name + "</td><td>" + group.gal + "</td><td>" + group.size + "</td></tr>");
	}
	$('#gs_scout_group a').click(function(){
		gs_fleet_name = $(this).parent().next().text();
		gs_galaxy = $(this).parent().next().next().text();
		if($('#gs_status').length == 0)
			$('#gs_scout_group').after("<div id='gs_status' align='center'></div>");
		$('#gs_scout_group')
			.after("<table class='no_back' id='gs_scout_fleet' align='center' width=800>" +
			"<tr><th>Fleet</th><th>Location</th><th>Destination</th><th>Arrival</th><th>Size</th></tr></table>" + 
			"<div align='center' style='display:none;' id='gs_timer_div'>Countdown: <span class='arriving' id='gs_timer'></span></div>" + 
			"<table id='scoutTable' class='no_back' align='center'><tr><td width=100>Location</td>" + 
			"<td width=200>Player</td><td width=200>Occupier</td><td width=200>Fleet</td></tr></table>")
			.remove();
		setInterval(function(){
			var tds = $('.arriving');
			if(tds.length > 0)
				tds.each(function(){
					var now = (new Date).getTime();
					var elem = $(this);
					var m=0;
					var h=0;
					var diff = (now - refresh_time) / 1000; 
					var s = elem.attr('title') - diff;
					if (s >= 1){
						h = Math.floor(s/3600);
						m = Math.floor( (s % 3600)/60 );
						s = Math.floor( (s %60) );
						elem.html(h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s);
					}
					else{
						elem.html('-');
						elem.attr('id', '');
					}
				});
			}, 200);
		JSONObject.request = {
			mode : 'astro_search',
			coords : gs_galaxy
		};
		getData(function(data){
			gs_lz = data.response;
			$.get('fleet.aspx', refreshScoutTable);
		});
		return false;
	});
}
function getNextRegion(gal, row, col, callback){
	var region = gal + ':' + row + col;
	if(typeof gs_ignore_regions != 'undefined' && gs_ignore_regions.lastIndexOf(region) != -1){
		status('Ignoring ' + region);
		if(col < 9)
			getNextRegion(gal, row, col + 1, callback);
		else
			callback();
	}
	else{
		JSONObject.request = {
			mode : 'astro_search',
			coords : region
		};
		getData(function(data){
			if(typeof data.response == 'undefined' || data.response == 0){
				status('No coords in opcen for ' + region);
				if(data.num_systems && data.num_systems > 0){
					status('Looking in region for an astro');
					gs_randomAstroInRegion(region, function(coords){
						if(coords && coords.match(/[A-F]\d\d:\d\d:\d\d:\d\d/)){
							status('Found ' + coords);
							callback(coords);
						}
						else{
							if(col < 9)
								getNextRegion(gal, row, col + 1, callback);
							else
								callback();
						}
					});
				}
				else{
					if(col < 9)
						getNextRegion(gal, row, col + 1, callback);
					else
						callback();
				}
			}
			else{
				status('Found ' + data.response);
				callback(data.response);
			}
		});
	}
}
function refreshScoutTable(msg){
	refresh_time = getTime();
	$('#scoutTable tr:gt(0)').remove();
	$('#gs_scout_fleet tr:gt(0)').remove();
	var body = $(msg);
	var table = body.filter('#fleets-list').find('table');
	table.find('td:nth-child(6)').remove();
	var rows = [];
	gs_ignore_regions = [];
	table.find('tr:gt(0):not(:last)').each(function(){
		var name = $(this).children('td:first').text();
		var dest = $(this).children('td:eq(2)').text();
		if(dest == '')
			var loc = $(this).children('td:eq(1)').text();
		else
			var loc = dest;
		if(name.match(gs_fleet_name + ' [0-9]+$') && loc.match(gs_galaxy) && Number($(this).children('td:eq(4)').text()) == 40){
			var tds = $(this).children('td');
			var td1 = tds.eq(0).find('a');
			var td2 = tds.eq(1).find('a');
			var td3 = tds.eq(2).find('a');
			var td4 = tds.eq(3);
			var td5 = tds.eq(4);
			var arrival = td4.attr('title');
			if(!(arrival > 0))
				arrival = 0;
			rows.push({
				fleet_url : td1.attr('href'),
				fleet_name : td1.text(),
				start_url : td2.attr('href'),
				start_name : td2.text(),
				dest_url : td3.attr('href'),
				dest_name : td3.text(),
				arrival : arrival,
				size : td5.text()
			});
		}
		else{
			var region = $(this).children('td:eq(1)').text().match(/[A-F]\d\d:\d\d/)[0];
			var gal = region.match(/[A-F]\d\d/)[0];
			if(gal == gs_galaxy)
				gs_ignore_regions.push(region);
		}
	});
	if(rows.length == 0){
		$('#gs_status').text('Galaxy Scouting Done');
		$('#gs_scout_fleet, #gs_timer_div, #scoutTable').remove();
		return;
	}
	landed_scouts = [];
	delete min_arrival;
	for(var i = 0; i < rows.length; i++){
		var row = rows[i];
		if(row.dest_name == '')
			landed_scouts.push(row);
		if(typeof min_arrival == 'undefined' || Number(min_arrival) > Number(row.arrival))
			min_arrival = Number(row.arrival);
		$('#gs_scout_fleet').append("<tr><td><a href='" + row.fleet_url + "'>" + row.fleet_name + "</a></td>" + 
			"<td><a href='" + row.start_url + "'>" + row.start_name + "</a></td>" + 
			"<td><a href='" + row.dest_url + "'>" + row.dest_name + "</a></td>" +
			"<td title='" + row.arrival + "'" + ((row.arrival > 0)?" class='arriving'":"") + "></td>" + 
			"<td>" + row.size + "</td></tr>").find('a').attr('target', '_blank');
	}
	if(landed_scouts.length > 0){
		$('#gs_timer_div').hide();
		regions = [];
		for(var i in landed_scouts){
			var fleet = landed_scouts[i];
			var astro = fleet.start_name.match(/[A-F]\d\d:\d\d:\d\d:\d\d/)[0];
			var region = astro.match(/[A-F]\d\d:\d\d/)[0];
			regions.push({
				astro : astro,
				region : region,
				url : fleet.start_url,
				fleet_id : fleet.fleet_url.match(/fleet=(\d+)/)[1]
			});
		}
		regionIndex = 0;
		navigateRegions();
	}
	else{
		status('Waiting ' + min_arrival + ' secs');
		$('#gs_timer_div span').attr('title', min_arrival);
		$('#gs_timer_div').show();
		
		window.setTimeout(scoutFinishFunction, (Number(min_arrival) + 1) * 1000);
	}
}

function sendScout(fleet_id, coords, callback){
	
	var fleet_move_page = function(url){
		delayGet(url, function(msg){
			var form = $(msg).find('form[method=post]');
			if(form.length == 0){
				status('No form');
				return;
			}
			
			var post_url = form.attr('action');
			var inputs = form.find('input');
			var data = {};
			for(var i = 0; i < inputs.length; i++){
				var input = inputs.eq(i);
				if(input.attr('name') != '')
					data[input.attr('name')] = input.attr('value');
			}
			var row = form.find('tr:contains(Scout Ship)');
			if(row.length == 0)
				status('No scout ships');
			else{
				var input = row.find('input');
				if(input.length > 0){
					data[input.attr('name')] = 1;
					data['destination'] = coords;
					delayPost(post_url, data, function(msg){
						if($(msg).filter('table:contains(Distance):contains(Speed):contains(Duration)').length){
							status('Scout sent');
							if(typeof callback == 'function')
								callback();
						}
						else{
							error_msg = msg;
							status('Sending unsuccessful');
						}						
					}, 'Sending scout to ' + coords);
				}
			}
		}, 'Opening fleet move page');
	};
	var open_fleet = function(url){
		delayGet(url, function(msg){
			var link = $(msg).find('a:contains(Move):last');
			if(link.length > 0)
				fleet_move_page(link.attr('href'));
			else
				status('Could not find Move link');
		}, 'Opening fleet overview page');
	};
	delayGet('fleet.aspx', function(msg){
		var body = $(msg);
		var table = body.filter('#fleets-list').find('table');
		var rows = table.find('tr:gt(0):not(:last)');
		var fleet_url = '';
		for(var i = 0; i < rows.length; i++){
			var row = rows.eq(i);
			var cells = row.children('td');
			var fleet_link = cells.eq(0).children('a');
			if(fleet_link.attr('href').match(/\d+/)[0] == fleet_id)
				fleet_url = fleet_link.attr('href');
		}
		if(fleet_url != '')
			open_fleet(fleet_url);
		else
			status('Could not find fleet link');
	});
}
function renameFleet(fleet_id, name, callback){
	var fleet_rename_page = function(url){
		delayGet(url, function(msg){
			var form = $(msg).find('form[method=post]');
			if(form.length == 0){
				status('No form');
				return;
			}
			
			var post_url = form.attr('action');
			var inputs = form.find('input');
			var data = {};
			for(var i = 0; i < inputs.length; i++){
				var input = inputs.eq(i);
				if(input.attr('name') != '')
					data[input.attr('name')] = input.attr('value');
			}
			var input = form.find('input:visible[type=text]');
			if(input.length == 0)
				status('Could not find input element');
			else{
				if(input.length > 0){
					data[input.attr('name')] = name;
					delayPost(post_url, data, function(msg){
						if($(msg).parent().find('form[action$="&action=rename"]').length == 0){
							status('Scout renamed');
							if(typeof callback == 'function')
								callback();
						}
						else{
							status('Rename unsuccessful');
						}						
					}, 'Renaming fleet to ' + name);
				}
			}
		}, 'Opening fleet rename page');
	};
	var open_fleet = function(url){
		delayGet(url, function(msg){
			var link = $(msg).find('a:contains(Rename):last');
			if(link.length > 0)
				fleet_rename_page(link.attr('href'));
			else
				status('Could not find Rename link');
		}, 'Opening fleet overview page');
	};
	delayGet('fleet.aspx', function(msg){
		var body = $(msg);
		var table = body.filter('#fleets-list').find('table');
		var rows = table.find('tr:gt(0):not(:last)');
		var fleet_url = '';
		for(var i = 0; i < rows.length; i++){
			var row = rows.eq(i);
			var cells = row.children('td');
			var fleet_link = cells.eq(0).children('a');
			if(fleet_link.attr('href').match(/\d+/)[0] == fleet_id)
				fleet_url = fleet_link.attr('href');
		}
		if(fleet_url != '')
			open_fleet(fleet_url);
		else
			status('Could not find fleet link');
	}, 'Opening fleet page');
}

function mapSystemUIChange(){
	$('center:last').after("<div id='systemScoutDiv' align='center'></div>").next()
		.append("<input type='button' value='Parse System' />")
		.find('input[value=Parse System]').click(systemScout);
}
function mapRegionUIChange(){
	$('center').after("<div id='regionScoutDiv' align='center'></div>").next()
		.append("<input type='button' value='Parse Region' />")
		.find('input[value=Parse Region]').click(regionScout);
}
function parseRegion(msg) {
	var links;
	if(msg == null){
		$('div:hidden').remove();
		links = $('body > div > div > a');
	}
	else{
		updatePage(msg);
		var body = $(msg).parent();
		$('div:hidden', body).remove();
		links = $('div > div > a',body);
	}
	
	systems = Array();
	for(i = 0; i < links.length; i++)
		systems[i] = {
			coords : links.eq(i).text(),
			url : links.eq(i).attr('href')
		};
	if(typeof regionDataFunction == 'function')
		regionDataFunction();
	navigateSystems();
	next_region_url = $('img[alt=right]', $(msg).parent()).parent().attr('href');
};

function privateEmpireEventsUIChange(){
	// Inserts a table that holds all the scout features
	$('table:contains(BASES EVENTS)')
		.after("<div align='center' id='divscoutoptions'><fieldset style='width:500px'><legend><font size='+1'>S</font>COUT OPTIONS</legend><label><input type='button' value='Scout Regions'  /></label><br><br><input type='button' value='Base Regions' onclick='baseRegionsScout();' /><br><br><input type='button' value='Bases' onclick='basesScout();' /></fieldset>")
		.parent()
		.find('input[value=Scout Regions]')
		.click(function(){
			$(this).parent('td').html('');
			$.get('fleet.aspx',fleetRegionsScout);
		})
		.parents('table')
		.find('a:first')
		.click(function(){
			if($(this).text() == 'show')
				$(this).text('hide');
			else
				$(this).text('show');
			$(this).parents('tr').nextAll().toggle();
		});
	var result = window.location.hostname.match(/(.+)\.astroempires\.com/);
	var server = result[1];
	var users = [33453, 15121];
	if (server == 'fenix'){
		if(users.indexOf(Number(player_id)) >= 0)
			$('#divscoutoptions fieldset').append("<br><br><input type='button' value='Disburse Fleet' />")
			.find('input[value=Disburse Fleet]')
			.click(function(){$.get('fleet.aspx', selectFleet);});
		if(users.indexOf(Number(player_id)) >= 0)
			$('#divscoutoptions fieldset').append("<br><br><input type='button' value='Continue Galaxy Scout' />")
				.find('input[value=Continue Galaxy Scout]')
				.click(function(){$.get('fleet.aspx', selectScoutGroup);});
	};	
	// Allows coloring of bases 
	$('#empire_events table tr:gt(0):even').dblclick(function(){
		if($(this).css('background-color') == 'transparent')
			$(this).css('background-color', '#993300').next().css('background-color', '#993300');
		else
			$(this).css('background-color', 'transparent').next().css('background-color', 'transparent');
	}).next().dblclick(function(){
		if($(this).css('background-color') == 'transparent')
			$(this).css('background-color', '#993300').prev().css('background-color', '#993300');
		else
			$(this).css('background-color', 'transparent').prev().css('background-color', 'transparent');
	});
	setupTradeBuilder();
}
// Trade builder functions
function setupTradeBuilder(){
	PRODUCTION_TYPES = ['Fighters', 'Bombers', 'Heavy Bombers', 'Ion Bombers', 'Corvette', 'Recycler', 'Destroyer', 'Frigate', 'Ion Frigate', 'Scout Ship', 'Outpost Ship', 'Cruiser', 'Carrier', 'Heavy Cruiser', 'Battleship', 'Fleet Carrier', 'Dreadnought', 'Titan', 'Goods'];

	PRODUCTION_COSTS = [5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,20];
	autoBuildTotal = 0;
	unitBuildCost = function(type){
		var pos = PRODUCTION_TYPES.indexOf(type);
		if (pos == -1){
			alert('Cannot find position of type "' +type+'"');
			return false;
		}
		var cost = PRODUCTION_COSTS[pos];
		return cost;
	}
	canAffordToBuild = function(type,qty,fast){
		var cost = unitBuildCost(type);
		var c = cost * qty;
		if (fast)
			c *= 2;
		var credits = $('#credits').next().text().replace(/[^0-9]/g,'');
		// if (console.log)
		    // console.log('Credits: ' + credits);
		return (credits >= c)
	}
	creditInc = function(diff){
		var c = $('#credits').next().text().replace(/[^0-9]/g,'') * 1;
		// if (console.log)
		    // console.log('Credits: ' + credits);
		c += diff;
		if (c < 0)
			c = 0;
		$('#credits').next().text( addCommas(c) );
	}

	typeSelect = '<select id="autoBuildType" name="autoBuildType">';
	$.each( PRODUCTION_TYPES, function(){typeSelect += '<option>'+this+'</option>';});
	typeSelect += '</select>';

	$('body').append("<div align='center' id='divgoods'><fieldset style='width:500px;'><legend><font size='+1'>A</font>UTO BUILD</legend><label>Build " + typeSelect + "</label> <select id='autobuilduntil'><option value='until'>until hours from now</option><option value='quantity'>by quantity</option></select>&nbsp;<input type='text' size=4 maxlength=4 id='autoBuildQuantity' /><br /><label for='autoBuildFast'>Fast Build</label><input type='checkbox' id='autoBuildFast' /><br /><input id='autobuybutton' type='button' value='Auto Buy'/></fieldset></div>");

	$('#autobuybutton').click(function(){
	    autoBuildFast = $('#autoBuildFast').attr('checked');
		autoBuildType = $('#autoBuildType').val();
		autoBuildUntil = $('#autobuilduntil option:selected').val() == 'until';
		var pos = PRODUCTION_TYPES.indexOf(autoBuildType);
		var cost = PRODUCTION_COSTS[pos];
		bases = [];
		currentBase = 0;
		var value = $('#autoBuildQuantity').attr('value');
		if(!((isNaN(value)) || (value.length == 0) || value == 0)){
		    desired = value;
		    if (autoBuildUntil) {
    			if(value >= 100 && autoBuildUntil)
	    			if(!confirm('Are you sure you want to build for ' + value + ' hours?'))
		    			return;
			    desired *= 3600;
			}
			else
			    buildAmount = value;
			if (autoBuildFast && autoBuildType == 'Goods'){
			    alert('Only an idiot would fast build goods!');
			    alert('Don\'t be an idiot.');
			    return;
			}
			$('#divgoods').html('');
			var baseRows = $('#empire_events table tr:odd');
			for(i = 0; i < baseRows.length; i++)
				if(baseRows.eq(i).css('background-color') != 'transparent')
					bases.push(baseRows.eq(i).children('td').children('a').attr('href').match(/\d+/)[0]);
			if(bases.length == 0)
				for(i = 0; i < baseRows.length; i++)
					bases.push(baseRows.eq(i).children('td').children('a').attr('href').match(/\d+/)[0]);
            if (!autoBuildUntil){
                var multiplier = autoBuildFast ? 2*value : value;
                var credits = $('#credits').next().text();
                if ( !canAffordToBuild(autoBuildType, value*baseRows.length, autoBuildFast) > credits){
                    if (!confirm("Lack of funds to "+(autoBuildFast?'fast ':' ')+"build that quantity on all bases.\nTotal cost would be " + (cost*multiplier*baseRows.length) + "\n\nDo you want to continue?"))
                        return;
                }
            }
            autoBuildTotal = 0;
			autoBuyStuff();
		}
		else
		    $('#divgoods').html('Invalid build quantity');
	});
}
function autoBuyStuff(){
    if (!canAffordToBuild(autoBuildType, 1, autoBuildFast)){
        alert('You lack the funds to build anymore ' + autoBuildType + '. Building stopped.');
        return;
    }
	if(currentBase < bases.length){
		url = 'base.aspx?base=' + bases[currentBase] + '&view=production';
		$.get(url, function(msg){
			var body = $(msg).parent();
		    var timenode = $('a[href*=info='+autoBuildType+']',body).parents('tr').eq(0).children().eq(4);
		    if (timenode.length == 1){
		    	if (autoBuildUntil){
		   	       	buildAmount = 0;
		        	var timeElement = $('td[title]:last',body);
		        	if(timeElement.length > 0)
		        		time = timeElement.attr('title');
		        	else
		        		time = 0;
		        	var difference = desired - time;
		           	if(difference > 0){
		           	    time = timenode.text();
		        		var buildTime = 0;
		        		if(time.indexOf('h') >= 0){
		        			var tmpArray = time.split('h');
		        			buildTime += parseInt(tmpArray[0],10) * 3600;
		        			time = tmpArray[1];
		        		}
		        		if(time.indexOf('m') >= 0){
		        			var tmpArray = time.split('m');
		        			buildTime += parseInt(tmpArray[0],10) * 60;
		        			time = tmpArray[1];
		        		}
		        		buildTime += parseInt(time,10);
		        		if (autoBuildFast)
		        		    buildTime /= 2;
		        		if(buildTime > 0){
		        			buildAmount = Math.floor(difference / buildTime);
		        		}
		        	}
		            var buildNext = true;
		        	var buildMsg = 'Skipped base ' + bases[currentBase - 1];
		        }
		        else {
		            var buildNext = false;
		        	var buildMsg = '';
		        }
		        //console.log('Build Amount '+buildAmount);
		    	if(buildAmount > 0){
		    	    // check credit balance
		    	    if (canAffordToBuild(autoBuildType, buildAmount, autoBuildFast)){
		        		window.setTimeout(function(){
						    var fastbuild = (autoBuildFast ? '&fast=on' : '');
							$.post(url, 'post_back=true&'+ escape(autoBuildType)+'=' + escape(buildAmount) + fastbuild);
							autoBuildTotal += 1 * buildAmount;
						},500);
		        		var c = unitBuildCost(autoBuildType)*buildAmount;
		        		if (autoBuildFast) c *= 2;
		        		creditInc(-1*c);
		        		buildMsg = 'Built ' + buildAmount + ' ' + autoBuildType + ' at base ' + bases[currentBase-1];
						buildNext = true;
		        	}
		            else {
		                buildMsg = 'Insufficient funds to build '+ buildAmount +' '+autoBuildType+' at base ' + bases[currentBase - 1];
		                buildMsg += '<br />Auto Build Stopping. Built ' + autoBuildTotal + ' ' +autoBuildType;
		                buildNext = false;
		            }
		    	}
		    } else {
		        var buildNext = true;
		        var buildMsg = 'Cannot build '+autoBuildType+ ' at base '+bases[currentBase - 1];
		    }
			$('#divgoods').html( $('#divgoods').html() + '['+currentBase+'/'+bases.length+'] ' + buildMsg + '.<br>');
		    if (buildNext)
		    	window.setTimeout(autoBuyStuff, 1000);
		});
		currentBase++;
	}
	else {
		$('#divgoods').html($('#divgoods').html() + 'Done Building. Built '+ autoBuildTotal + ' ' + autoBuildType + '<br />');
	}
}


// Looks for a random astro in the region
function gs_parseRegion(msg, callback){
	// updatePage(msg);
	var body = $(msg).parent(':first');
	$('div:hidden', body).remove();
	var links = $('div > div > a',body);
	var systems = Array();
	for(i = 0; i < links.length; i++)
		systems[i] = {
			coords : links.eq(i).text(),
			url : links.eq(i).attr('href')
		};
	if(typeof callback == 'function')
		callback(systems);
}
function gs_parseSystem(msg, callback){
	// updatePage(msg);
	var obj = $(msg);
	var system = obj.filter('center').html().match(/[A-F]\d\d:\d\d:\d\d/)[0];
	var system_table = obj.find('table.system');
	if(system_table.length != 1)
		return;
	system_table.parent().find(':hidden').remove();	
	var system_items = system_table.siblings('a');
	var astros = [];
	for(var index = 0; index < system_items.length; index++){
		var astro_link = system_items.eq(index);
		var astro_image = astro_link.children('img');
		if(astro_image.length != 1)
			return;
		var img_title = astro_image.attr('title');
		var result = img_title.match(/(.+) \(([A-F]\d\d:\d\d:\d\d:\d\d)\)/);
		if(!result)
			return;
		var terrain = result[1];
		var coords = result[2];
		if(terrain == 'Asteroid Belt' || terrain == 'Gas Giant')
			continue;
		astros.push({
			coords : coords
		});
	}
	if(typeof callback == 'function')
		callback(astros);
}
function gs_randomAstroInRegion(region, callback){
	delayGet('fleet.aspx', function(msg){ gs_randomAstroInRegionCallback(msg, region, callback);});
}
function gs_randomAstroInRegionCallback(msg, region, callback){
	gs_systems = [];
	
	var map = $(msg).find('map:first');
	if(map.length == 1){
		var area = map.find('area[title=Region ' + region + ']:first');
		if(area.length == 1){
			status('Visiting ' + region);
			var url = area.attr('href');
			delayGet(url, function(msg){
				gs_parseRegion(msg, function(systems){
					status('Found ' + systems.length + ' systems');
					if(systems.length == 0)
						callback();
					else{
						gs_systems = systems;
						gs_navigateSystems = function(){
							if(gs_systems.length > 0){
								var i = Math.floor(Math.random() * gs_systems.length);
								delayGet(gs_systems[i].url, function(msg){
									gs_parseSystem(msg, function(astros){
										status('Found ' + astros.length + ' astros');
										if(astros.length > 0){
											astros.sort(function(a, b){ return -Number(a.coords[10]) + Number(b.coords[10]); });
											callback(astros[0].coords);
										}
										else{
											gs_navigateSystems();
										}
									});
								});
								gs_systems.splice(i, 1);
							}
							else
								callback();
						};
						gs_navigateSystems();
					}
				});
			});
		}
		else
			callback();
	}
	else
		callback();
};publicParsePage();
privateUIPage();
publicUIPage();