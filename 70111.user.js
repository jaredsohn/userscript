// ==UserScript==
// @name           TnSat Plus
// @namespace      TnSat By UnLoCo
// @include        http://www.tunisia-sat.com/vb/*
// ==/UserScript==

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
e.custom(start,val,"");}});return true;});},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx";}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.call(this);}});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1);}});if(!gotoEnd)this.dequeue();return this;}});var queue=function(elem,type,array){if(elem){type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",jQuery.makeArray(array));}return q;};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].call(this);});};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.call(this);};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={};}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block";},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd);}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null;}},13);}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=now();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block";}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p]);}if(done)this.options.complete.call(this.elem);return false;}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();}return true;}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now;},scrollTop:function(fx){fx.elem.scrollTop=fx.now;},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now);},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit;}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop);}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent;}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode;}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));}results={top:top,left:left};}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true));}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0;}return results;};jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}return results;},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return jQuery(offsetParent);}});jQuery.each(['Left','Top'],function(i,name){var method='scroll'+name;jQuery.fn[method]=function(val){if(!this[0])return;return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val;}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method];};});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br);};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0);};});})();


/***************************/
//@Author: Adrian "yEnS" Mato Gondelle
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/

var popupStatus = 0;

//loading popup with jQuery magic!
function loadPopup(hrf,elm){
	//loads popup only if it is disabled
	if(popupStatus==0){
		$.get(hrf, function(data) {
			data = data.substring(data.indexOf('<!-- message -->'))
			data = data.substring(0,data.indexOf('<!-- / message -->')+'<!-- / message -->'.length)
			$id("PreviewContainerDiv").innerHTML = '<div class="tcat" style="height:22px;padding-right:10px;padding-top:5px" ><a id="fullStory" target="_blank" href="' + hrf + '">مشاهدة النسخة الكاملة لهذا الموضوع</a></div>'
			$id("PreviewContainerDiv").innerHTML += data
			elm.src = PrevImg2
			$("#backgroundPopup").css({
				"display": "block"
			});
			popupStatus = 1;
			$("#previewPopup").css({
				"display": "block"
			});
			centerPopup()
		});
		
		//load the threadpost 1
		
				
	}
}

//disabling popup with jQuery magic!
function disablePopup(){
	//disables popup only if it is enabled
	if(popupStatus==1){
		$("#backgroundPopup").fadeOut("fast");
		$("#previewPopup").fadeOut("fast");
		popupStatus = 0;
	}
}

//centering popup
function centerPopup(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#previewPopup").height();
	var popupWidth = document.getElementById("previewPopup").offsetWidth;
	//centering
	$("#previewPopup").css({
		"position": "fixed",
		"top": windowHeight/2-popupHeight/2,
		"right": windowWidth/2-popupWidth/2 //- popupWidth
	});
	//only need force for IE6
	return;
	$("#backgroundPopup").css({
		"height": windowHeight,
		"width": windowWidth
	});
	
}


//CONTROLLING EVENTS IN jQuery
$(document).ready(function(){
	
	//CLOSING POPUP
	//Click the x event!
	$("#previewPopupClose").click(function(){
		disablePopup();
	});
	//Click out event!
	$("#backgroundPopup").click(function(){
		disablePopup();
	});
	//Press Escape event!
	$(document).keypress(function(e){
		if(e.keyCode==27 && popupStatus==1){
			disablePopup();
		}
	});

});

/***************************/
//@Author: Adrian "yEnS" Mato Gondelle
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/



var adup = "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QUDEQ4olWKL6gAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAD80lEQVQ4jYVUS0+UVxg+1+8yMMNlUi4DQQqtJdZEFxKpGyOJLgwu6aLEGHctOzVxYWLSTmJwoSsS/QOl7QJXhRiTERatCVoNYSwWix1ncBgKZByGYWa+71y7OOOAA0mfxdmc933yvM97ganUCtgH/QFSSiklABoAAABECGGMIYQIIQhhNR7tp6iycM4ZY9Dz6D+JgOdJKX3f55yb373xB7BUKSglbRsbDVev4K+HO2/dcrNZz/MYY0KIGqIDWJRSUkohRHMqZV29kp2ZYYFAdnp6e3bG8zzOuVLqf7SYbylFCGM5Nvbv/Hz3+Lh79qxGSDoOY75x6mCWqp0fhEj5+2/k6VMxOFgYHEQLC3Z3t32iX0q1XwgAAJlMA1mBkFIW43HAGDl3LvnzL/T160J/f7Jc2p9vQKodVUoprYAGnHPOuRMO+0oFnj+302k/GFw9ebJUKjU22qbHe9tc0cI5txGK/DTRFItprYQQUkp9+jQcGMhPThbm5sKXLm12dABQSa6hAAAgIYSUgjx4wKLR1rU1jInpZUbptW9GQk1NCoDCwsLRYJBSqj/GbkVSSiu/7Uz86LW0LJ3o31xfhxBKKRtDwdbFPwu5XMvx49nZ2c/r6rZGR9d3vZMIIa210YWEEPbM43I87g0NrTU0+L7PmE8IOfziRXl8XB87Ju/fb7t2LTE11X7vXk9bK2OMc26aXZWDtJT80aOmSCQ/MFAsFhljwWCwJ5XcvHGjvqsrcPt2bHk5MzzcefEim57+5OFD13UMkZngCkuzYzfn8/lIpHj4C8ZYKBQ6mk5bN29iIWg0umRZjuO8WllJjYzg7m46MQHTq0KIGjmICEGFEBhblB5pa+17HNu8fLn8/n3ozp35Q4d2doquG3DdQFJp//z5/OJi89tE1RylVMXdHYRge7sfi3X88D3KZLZevgz19YXGxv4Ih3e2C67rYowAAEpp0dnpABDCWCldFWIMJlulcnB0tMv3t548sdrbW69fXzp1Kl5XJ4rFQMC1LAshrJR0HCccjzPXTVuWkfBRpymlmU978tFo7tkzp7dX9faurmao0q4bsG2bUgoAIIR8tvz3xuRkx9DQuyNfQiVrJphQSn3fzzouG/iqKCXI5err6ymllmVZlgUh1Fo3eZ6+excTkrhwIS8EpRRjjDGuXjxCCAEAIIQopVorAACEiFSAAQCcC2vq19zcHP72u/WeHiQlpdQQVbXAROKtUkoIUV15c1ZNkDlXkb9eNb558/bMmVSpTCmxbcd1Xdu2CSEIIQAATCZTNW5VV84cDc657/tmuQAAlFLbtk29uxVBCDHGNZ6bv8pEIUQphRCaF2NMKSWE7HX3P7Ahsw6u9QOHAAAAAElFTkSuQmCC'";
var addwn = "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QUDEBM0f83RjgAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAC3ElEQVQ4ja3VT0gUURwH8N+b92Z2dt0/rCuWusmiKB5XsMSbFCraHtYEb7YVdZHKShHtIF4URETRUx0KDyKlB0F3OwguhWtaqagJ6SHxT1Lm/mtdZ2d2/nRwM60VNZvbb+bHh+/vzeM9tLq6Bmd+qLMTJ1VoUVStrGgFAWP8L4pKpUra/ELduR25WmZ83Mhufz+1ghDSLH2Sq6u9Y2OCRuN1Ornx8VMrCQDRlpavs7OWnh51UZFCUUirPbUSffOaTE3h0lJkt1NzcyqLRZOff2qF+7gIgqCx2XxOJ720xBUU7Or0cTvJwQIhJCsK+lXSSSZeliW3W97Y4HU6cq1CkqRjsrAYm54/075yERL7nUxxCVVQEBwcDE1OmhwOsFqPSk3tp0AvX0Sam03r6zTNxCYyGPi79/RGowwQmpvTercpKv4KxN4ywSDp7eWTk7eKSziOi6VjaHbCE/H7k61Wr9vNNjSoA/4jFYSQ4nJy8/OivVzIyIgtGCHa4eFQZyfKzU3o6ztfW/t5ZAQ1NelwnDgUACBFibhcxtRUXFYmyzIAsCyrn57eamzUpqcndXd7tTrq4SNzVVV4aIju72cYJo6SgMAYCITMZpyXt0cY3k7wD2qwKKpbW7msLAAISpJQV4ctFtTbq6ytxlEoIUqLoogxwVgvRumnT745HJzPl9jV9ePyFZ4X9lp3Ek2K3R5cXEQzMwihgwoBAIFlhdRUbnQUHNepzc2dhQV9Tk5ie7v34iWB5/dbFUUhmZkKAC0IIgJFOaxwkqS7X5MeiQQ8HiYl5Vx9fbCiYst8QTxAAABN04zHI6jVfJpZlpWDn9DeWUcIUft8oZkZTVYWys4Oh8N/TE4IMb2b2qysTLPZAh0dEXxo08cKURRDej0UFu4CwF8EALB+X7StDRMScNzgCX1onhOedQghaWDAPzlJ37wVzctTDhO/JzpWMXx4r19e9tnLd9TqOA3/5Q74Cfe0KltaWlUyAAAAAElFTkSuQmCC'";
var ssup = "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QUDEQ4skg9P8wAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAADp0lEQVQ4jaVUzU9dVRA/M3POvY/23sdXoVJaA35AYgVM2ohiXvoHSNKF1rppwkLbpS660b9Ad/ovVJugiSayaLppWKAhAduuRN4riWAA+SpQHvDevfecMy7mcUFTV57V3DNzf/Obmd8ZWFr6U/3vo09+MHNuA8BzXWLkXjEaKN57cT836CREHiAuMXQO4b231ubJiQgR8z+dc8ysFHt/jEJERKSU0nkQzv8eP37McVxra0sGBrmpSUKZOSiX3epqMjJS/HU2nZqCKKK33j4YHDTGMLPWWgsL52w2Pv7ixITu7V3r6zs8+4I/dw4RASBcXj776SeLnZ3JpUvJw4fh5GTX1tYf9+4l4+PMHAQBImohAmkWr63taL07NrY3PGxJmywTuvT1V2ZvL7x9eztJ1q9/eOrNYfr4o6xWT5IEkBCRiKRy75YWw0oFWlt3L1zYz6z33ntnrdUPHnRNTj4pldaG3rDWOmfD6enTiBhH1nlrJdIjMzvn6xubtLr615mOahQf1eiRuen7754Zs//e+1mWSQez+XlM0+jKFedsPlkUMAKF3mdh4IhkhN774McfWmZmdsbGDrq7AQARibT2zjFvDQz+Q3WSoXVxEbQO2ttlukqxrlZP37mTDgzsvjuKiNLp4sHB+VqtSvRMKQCEo4PCqnb/fmYMX76cyy2c+KknTbdv3EgKBSLSWhORq5Szcjnq6irEkfRVOKJSyjvnnj7dPDzc7OtvSHl9vXj37nJPT7VUEnUJSlZPwmp1o/eltKNT2AlNLZJ2tZoxRjEzqzAMO779ptn78s1bWZpprY0xAKAUn3LOKFU90+4KBYMgKACgmRmcMwDU2qqMYebgl59fnpmpXLumXr+oWRmjReZKcTz3W10p9AygECl/JZqZmxeetFm7Uyr5OFZK7Rebdz+4Xh8dVQqM0cYYRPTeZ1lam5uLoqhw8bVqoxQ8ftPpwkKUJEtp2jw7W3v1FdXfXx4aQoDgqB2KGR49wvU1ValsOLc98o7c50AaABhpo1jEqanu6emVzz633ecJ0RgjoQDA1vKXXxRWVlRHh7p6VcWxPjqCAvPz5axeT/b2sixTzNDUpMMwh5COOOdstZomdaeU08Z7HwRBGIZBEBhjiEgTEYcht7SQc8wsJIPAIJLW+nhXxTEXCugceS9KkUyNvkg2ABD5NerMqQLIZWMbac3MR6+B8o2nRVQyBYGT4eX9P7n6/itGI6I8JTFObtOTq1dI/cubx/wNXzMRxxIr93UAAAAASUVORK5CYII%3D'";
var ssdwn = "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QUDEBcEPXgkJgAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACqElEQVQ4jd2US0wTQRjHv29ndtkubdMaaQERYjRICiSQaCIkJLWBk8hFL5rARQ/gBc8c5KzxcYWbJioeSPQGEcsBLgQTSHzQJpwqD3kUxCItu92ZzwOlD9obF+Mc/zvzm99/JjsYi/2AUw/l9Ij/ksILkNGovrhILpdVUSFaW0HTsp/Y0pLY2IBQSJ2dsWZnFZebt11LX7lagmK+G6scH+cXLmw1NMi6OqqszEyKxTwPBlarq/VQyFpYoMlJXzwe+/Be/xQGxAIKF0JdW/vFOQ0O2tdDxFhGkMh+8lhNJFyPhtMAOPhQ6era6umRllXiXEQsxiMR9Hqtyw32MQIAaHLSHw6vdHWJzs7MzPB0uaIwt/tIpIBi7+6y9fXftbVU6c9tQgSvXiY0jd+7L6U8CtPRiGJZRkdHCRcFQJFSOAxSc4cq3rx2z82l+gegvv4oQUTFtgURBYMl7kj7/g05V894swnu7eHoqNXczPr6xHGoxredOzsJxoTDyC7OuSQnJtKqqra35zqOvT2fSpn9A9LlyobmUsSKRp1VVdzhKGpEJHZ2tpNJ2ZahyM1NHBn5efESu9lNRLmOllW2v78fCGBNTVEjRJFKKapKUiIA55xePDek3BsaYjKHQET14EAFSNfUKIZx0gWFUBGZ14uaBgD21NS5mZk/fX28pQXyBiIqn+cPAVDI/Dzjon394jbNRDAIHg8RCb8v1dvL7ty187oAgJTSjkbLnU69MSCLKeby8lnTjCtMnw7bgUYWaIw3NVFeFyCS8/O4vS0ikThR2Y3uEi7AWNzjsaY+lk+H00+fod9fgAAAKc3h4bLVFc3n47duC6ezoOnRi4lS0uEhESkIVKZD3h+Qs0kmEQgYR12nwqYZF1IUMAwEoOLV2Q2PL+UEAv6tt+4vq7EmJCO3VgIAAAAASUVORK5CYII%3Dg'";
var resize1 = "'data:image/png;base64,R0lGODlhCQAVAAAAACH5BAEAAAEALAAAAAAJABUAgE1NTQAAAAIVjI+py+3fgJEHSFutRhjzCYXiSCIFADs='"
var resize2 = "'data:image/png;base64,R0lGODlhCQAVAAAAACH5BAEAAAEALAAAAAAJABUAgE1NTQAAAAIVjI+py+3PgJEISFutPhjzCYXiSCYFADs='"
var closeImg = "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVDjLpZNraxpBFIb3a0ggISmmNISWXmOboKihxpgUNGWNSpvaS6RpKL3Ry//Mh1wgf6PElaCyzq67O09nVjdVlJbSDy8Lw77PmfecMwZg/I/GDw3DCo8HCkZl/RlgGA0e3Yfv7+DbAfLrW+SXOvLTG+SHV/gPbuMZRnsyIDL/OASziMxkkKkUQTJJsLaGn8/iHz6nd+8mQv87Ahg2H9Th/BxZqxEkEgSrq/iVCvLsDK9awtvfxb2zjD2ARID+lVVlbabTgWYTv1rFL5fBUtHbbeTJCb3EQ3ovCnRC6xAgzJtOE+ztheYIEkqbFaS3vY2zuIj77AmtYYDusPy8/zuvunJkDKXM7tYWTiyGWFjAqeQnAD6+7ueNx/FLpRGAru7mcoj5ebqzszil7DggeF/DX1nBN82rzPqrzbRayIsLhJqMPT2N83Sdy2GApwFqRN7jFPL0tF+10cDd3MTZ2AjNUkGCoyO6y9cRxfQowFUbpufr1ct4ZoHg+Dg067zduTmEbq4yi/UkYidDe+kaTcP4ObJIajksPd/eyx3c+N2rvPbMDPbUFPZSLKzcGjKPrbJaDsu+dQO3msfZzeGY2TCvKGYQhdSYeeJjUt21dIcjXQ7U7Kv599f4j/oF55W4g/2e3b8AAAAASUVORK5CYII%3D'"

var PrevImg = "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH5SURBVDjLpZK/a5NhEMe/748kRqypmqQQgz/oUPUPECpCoEVwyNStIA6COFR33boIjg6mg4uL0k0EO1RFISKImkHQxlbQRAsx0dgKJm/e53nunnOwViR5leJnuZs+973jHBHB/+D/ah7X2LXWloilyMw5YgtD3CDiBWN4Zno8bQcJHBFBucauZfsolZDCru0OfFcAAUISrLZDfPzSKxuiibOT+T6JCwDMtrQzYQvZHQ5Cw2h3GK0OI9AWBzJJZFOxgtJUGpTABQAiLu5OOviuGIEWkBUwC7pasNZj7N2ThNJUjBQY4pznAoEWsBWwxU+JFXSVRTzmQWvKRR5RG4KVGMgKrAVYflexAAugDCEygdbUCI2F7zobk7FZY76DIDQgrT9HCwwt1FsBhhIu4p4D3kiS8B0MJz28ftfGSPfl8MPLxbGBAqVpptbslJc+fEPMA7JDPrIpH3FX8LzaROdrE5O51jalgid3Lh4b6/sDALh6971riErGcFET58gwDPGndG9JT6ReHcwfPorGygu8rdxvGxMeP3XtzcofgigWZ0/EtQ7n0/sOTe0/Mo7V5WeoVu61z1yvZzZX+BsnZx9opYLpevXp7eXKIrL5UWit0n0r/Isb50bjRGreiyWmgs76lfM31y5tSQAAc6czHjONXLi13thygih+AEq4N6GqMsuhAAAAAElFTkSuQmCC'"
var PrevImg2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH5SURBVDjLpZK/a5NhEMe/748kRqypmqQQgz/oUPUPECpCoEVwyNStIA6COFR33boIjg6mg4uL0k0EO1RFISKImkHQxlbQRAsx0dgKJm/e53nunnOwViR5leJnuZs+973jHBHB/+D/ah7X2LXWloilyMw5YgtD3CDiBWN4Zno8bQcJHBFBucauZfsolZDCru0OfFcAAUISrLZDfPzSKxuiibOT+T6JCwDMtrQzYQvZHQ5Cw2h3GK0OI9AWBzJJZFOxgtJUGpTABQAiLu5OOviuGIEWkBUwC7pasNZj7N2ThNJUjBQY4pznAoEWsBWwxU+JFXSVRTzmQWvKRR5RG4KVGMgKrAVYflexAAugDCEygdbUCI2F7zobk7FZY76DIDQgrT9HCwwt1FsBhhIu4p4D3kiS8B0MJz28ftfGSPfl8MPLxbGBAqVpptbslJc+fEPMA7JDPrIpH3FX8LzaROdrE5O51jalgid3Lh4b6/sDALh6971riErGcFET58gwDPGndG9JT6ReHcwfPorGygu8rdxvGxMeP3XtzcofgigWZ0/EtQ7n0/sOTe0/Mo7V5WeoVu61z1yvZzZX+BsnZx9opYLpevXp7eXKIrL5UWit0n0r/Isb50bjRGreiyWmgs76lfM31y5tSQAAc6czHjONXLi13thygih+AEq4N6GqMsuhAAAAAElFTkSuQmCC"
var AddCommentImg = "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGkSURBVDjLrZJPKINhHMd3UsrJTcpBDi6UC+3ookQ5OOBAaCh2cFQ40GqTzURTihI54DRp8dqBg3BQw5BtNmxe/4flT9re5+v3vJvF2l6Kp749Pe/7fj7P7/09jwqA6i9R/ZugVr+cSZmlvFOgEIGSl0xgnVt3IRyRoDSWtn1c4qakxQW0yKBEJMbw+MpwHWIQnxgCDwxnQQbvHYP7RoLnJirvntrkkuKvghytZU1+eUWg+MjgJ/j0nuEkBh9dSTgQo4KB+R0uqEgquCD4PBiDbxlc11HYSfBuILUg/gu8fB/t6rmVcEzw4aWEfYIdAS6IyILe6S0uUCdtIpd8Hbwah1+SxQlNTE91jJHPI5tcPoiLrBsL6BxrQOtQFep0pc/lXYU9P14kkngugy/onxlF30ITlpwWOEQB5tV21JgLUNKRZVSCTeM2J6/kuV5fFrbuD8N6OCJXY7S3wGxv44K3VHAuxUvR8HVldxFszolvvVncs3DB7+67Wpv9Nig0Qy80yrB+pVG5gsTQh7pqYz5Mgkbemc98rdiDJBIDJcTLjs0G/vwDCw/6dFwBuzsAAAAASUVORK5CYII%3D'"
var resize3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAMAAAC6sdbXAAADAFBMVEUAgMD29fUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACt8nToAAABAHRSTlP/AP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////rTvmKwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9oCGRQsAuSw37IAAAAHdEVYdEF1dGhvcgCprsxIAAAADHRFWHREZXNjcmlwdGlvbgATCSEjAAAACnRFWHRDb3B5cmlnaHQArA/MOgAAAA50RVh0Q3JlYXRpb24gdGltZQA19w8JAAAACXRFWHRTb2Z0d2FyZQBdcP86AAAAC3RFWHREaXNjbGFpbWVyALfAtI8AAAAIdEVYdFdhcm5pbmcAwBvmhwAAAAd0RVh0U291cmNlAPX/g+sAAAAIdEVYdENvbW1lbnQA9syWvwAAAAZ0RVh0VGl0bGUAqO7SJwAAABZJREFUCJljYAQCBgYwwQAmGMAEBAAAAPoAC9PZd/QAAAAASUVORK5CYII%3D"
var LoadingImage = "data:image/gif;base64,R0lGODlhDwAPANUAAP////f3//f39+/39+/v9+bv7+bm797m5t7m797e5tbe5s7e5s7W5s7W3sXW3sXO3r3O3r3O1r3F1rXFzrXF1rW9zq29zqW1zqW1xZy1xZytxZStvZSlvYylvYyltYSctXuUrXOUrXOMrWuMrWuMpWuEpWOEpWOEnGN7nFp7nFJzlEpzlEprlEJrjDFahClSeyFKexBCaxBCcwAxY/4BAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwA0ACwAAAAADwAPAAAGm0CAEEBAySKAAUcxbEZmMxUA9HoxhQSCEAYFqKoGoSASaYyhiipoSCCTC6rZ56UaABDCgsJBlsxaLgoFICsaYgQFDREvLA0YKSuRBXxuDROEkSsmEm4PCAYRGCIhGA8FQgcRDAIFEQ8aCiAiIiAXAgC3Ag8RChoSBh2zIgdDig8CGhoGAhK0Q2OqAMkXTc+7YRLJp9XVBRkRAU1BACH5BAUHADQALAAAAAAPAA8AAAaUQIAQIHBECMNkshCJKACWGQwxFBSEjSZANZtFhtmHQaCVSZPNpkIRYXQjA44EQDhkI1nRLJNxvVxJVg0TMSQtL4guAgoPaRMNKX4qKRsGjU0MDRkkJBICSQwRDgQKGg8iJSsrJBpPdAAGGhoEIh8dqqpJFxoZAB0iEhMpq0MFsnMbIiJjEldCArtUpyIWStYCH5VJQQAh+QQFBwA0ACwAAAAADwAPAAAGl0CAUHiIFIQEwXApiEQcgIKTMBQoAQynQDEdPiIM65fgeFadkUcBYdQCIkID4xsxRBpt2Ow0HCi+eBIqM4QyBhIaiRoYFC+EhCoRGYoSCiIgLC0fCkMRGhcFBiAhKw0uLy8qIANRAAIdIhgrFwoqqC8bQxYiIg8rKQUDIKicQrwgCCsrIHHFQiAiFwAmyghLSwdKEisa10EAIfkEBQcANAAsAAAAAA8ADwAABptAgFDIeAiGSGQhElEACJHGUTgwCB2RB+DALAwvmosBGgE0skiNWqNgRARMa+GokGTU56VCcHYgCQ8ZEw0NCkxMAoEdIiIkDROHDwoEH4wiHyUkKTEiDEgbjBIdKxIuJDMzMioZAAYSBhMrKwIvLRmoqEMCKSskACovGBEwMzBDErIaACkvLgMAEQhDBSQrThsvLx9J3AYuLhJIQQAh+QQFBwA0ACwAAAAADwAPAAAGmUCAEBCIZAzDZLKg0UgAhshDoBRemgBGJEIVgkQSAVMzeEQaw4No3TFINAopdX75ikAKjbkg0B6EBQ8ZISIYEQYIZlsSJiuOKyAUDVtbDgWPKRcNLC9nBQRdGpAFCi4tMxKVCgVCCAADKi8fMyoFlBEEQyAvLwozM1yTXEIGvCoAvzBCBLlCCrwgACq/EVUAChsDABEyJ9pDQQAh+QQFBwA0ACwAAAAADwAPAAAGl0CAEGDYfATDZNIiEj0ACM1lMCxIBIbmBiDRaApD0iplkYg6gIw0uWqvOh8RwQsmCBUa8ark1CgIDhEMSQISJCQZDQwRjA8GHCkqLy4pDROMEQ8KAi4vni0kMRMNBUhDnS4YGTMiEQ2MDQd2EhsDETMziwoKmBFJMDMyAIxYD65DtzMqw8cApUMIwBYAvBFgSkoEEQ6mQkEAIfkEBQcANAAsAAAAAA8ADwAABpZAgFCoWUkAgsNwCUCsVibARQRaKgxC0BMBEomGitcLNCikVg+vZbgRv1SKywoj6ggA2AFIJXY1ViEgBgYXGhFgHy0sXQoSGo8ZESozlDMvFBiPjxIFMpUqEhENEQ8Kd0InMzARBaIRBhGkDFgAhwKxrQgFD7ERpwAOEQ4EpAICDKRDxBGmsQxCxsq4wLG/SwIEQq1KS0EAIfkEBQcANAAsAAAAAA8ADwAABphAmpAmcbkMgKQSMKR9Xq8NTbEiFYaICG3geqUAmtVKIgTAZrAI5kUDkFYpQXlGn2VaL4F4YpAgMzQydCQuEisdEiIiG0sMIjEpJCUfiiIfBQsPEZsTDSSKHTQPApubCg0OE4AES5oOAgo0Vw0aGhkSsQJXBkJyDAq1tUxNbZsEBRcaF0NXZQ80DkLNvdEEU9JNS0oCDwzEQQA7"
var loadersrc = "http://img198.imageshack.us/img198/4295/indicatorbluesmall1.gif";
var wdth;
var rplbtn;
var adsg = document.createElement('td');
var svsg = document.createElement('td');

var styl_ofuser = "null";

var shown = null;
var display = 0;
var showb = 0;

var D = "'ض'";
var S = "'ص'";
var SS= "'ش'";
var s = "'س'";
var z = "'ز'";
var r = "'ر'";
var th = "'ذ'";
var d = "'د'";
var x3= "'خ'";
var H = "'ح'";
var j = "'ج'";
var F = "'ث'";
var t = "'ت'";
var _b = "'ب'";
var _a = "'ا'";
var a1 = "'ء'";
var y = "'ي'";
var w = "'و'";
var h = "'ه'";
var n = "'ن'";
var m = "'م'";
var l = "'ل'";
var k1 = "'ك'";
var q = "'ق'";
var _f = "'ف'";
var G = "'غ'";
var g = "'ع'";
var Z = "'ظ'";
var T = "'ط'";
var Y = "'ى'";
var u = "'ئ'";
var o = "'ؤ'";
var Q = "'ة'";
var i1 = "'إ'";
var e = "'أ'";
var A = "'آ'";
var sp = "' '";
var qtee = '"';
var slch = "'"+'&#47';
var enn = "'n"
var frd=0;
var frd2=0;
var frd3=0;
var frd4=0;
var frd5=0;
var thmb =/^attachment\d{3}/;
var k = 1;
var t;
var imgz = [];
var fks = 0;
var ctrl=0;
var obj='';
var kb=0;
var cont;
var mytbl = null;
var ig = document.createElement('img');
ig.setAttribute('src','images/styles/TSBB/buttons/firstnew.gif');
var imgg = document.createElement('img');
imgg.setAttribute('src','http://www.tunisia-sat.com/vb/images/styles/TSBB/buttons/collapse_tcat.gif');
var frstmv=0;
var txtb = document.createElement('div');
txtb.setAttribute('id','divfortxt');
txtb.setAttribute('style','position: fixed; top: 310px; right: 35px; z-index: 100002;')
var helper = document.createElement('div');
helper.setAttribute('id','help');
helper.setAttribute('style','position: fixed; top: 500px; right: 500px; z-index: 100001;')
var x;
var y;
var ofx;
var ofy;
var fo = "return toggle_collapse('forumrules')"
var clz = "document.getElementById('divfortxt').style.display='none';if(document.getElementById('help')){document.getElementById('help').parentNode.removeChild(document.getElementById('help'))}"
var clz2 = "document.getElementById('help').parentNode.removeChild(document.getElementById('help'))"
var fin = ''
var yml = "Yamli.init( { showDirectionLink : false , showTutorialLink: false , uiLanguage: 'en' , startMode: 'onOrUserDefault' } );Yamli.yamlify( 'txt', { settingsPlacement: 'inside' } );"

	function sethtml3(){
		txtb.innerHTML = '<table width="350" cellspacing="1" cellpadding="6" border="0" style="" class="tborder"><thead><tr><td style="cursor:move" class="thead" id="drag"><a style="float: left;"><img border="0" name="show help" alt="help" onclick="" style="cursor:pointer;" src="http://www.tunisia-sat.com/vb/images/styles/TSBB/buttons/collapse_tcat.gif" title="show help" id="helpbtn"/><img border="0" style="cursor:pointer;" alt="close" onclick="'+clz+'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QQQDwwrVynnaQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAAsklEQVQokY2RMQ6DMBAEZw8nHa9JHYmfAx/IN3gANdoUNhgkQLiwLGtubnWnvu95fBLQdd0TdBiGBEzTdIkIGedXdkshQDYI1rv8OSTvkqTUIAFgWRayDVKuFGCv9Pv1RgaZzNYgLi127mjC8Gvbq/Cfea60IuJ2GhHBliRCh/YntKq7UfiWVjTVra32yr32TiUWvqHLQtbtCPRdllOwjHpzK7SpD7tUHrgO9DiMt7Hr+QP5IjUUX8OP4QAAAABJRU5ErkJggg%3D%3D"/></a>الكتابة بالعربية</td></tr></thead><tbody style=""><tr/><tr width="400"><td style="background-color: rgb(235, 235, 235);"><a id="useyamli" onclick="'+'" style="color:#66aaff;font-size:9pt;cursor:pointer;" >use yamli</a><textarea spellcheck="false" name="saisie" id="txt" dir="rtl" rows="7" cols="40"></textarea><div id="divforlbl"><label style="font-size: 10pt;" for="arab" id="labl">الكتابة بالعربية</label><input type="checkbox" checked="false" tabindex="1" id="arab" value="1" name="ara"/><span style="font-size: 7pt;">&nbsp&nbsp(alt+shift)</span></div></td></tr></tbody></table>';
	}

	function sethtml2(){
		adsg.innerHTML = '<div class="imagebutton" id="adsig"><img height="20" width="21" title="إظافة إمضاء" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QUDEQ4olWKL6gAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAD80lEQVQ4jYVUS0+UVxg+1+8yMMNlUi4DQQqtJdZEFxKpGyOJLgwu6aLEGHctOzVxYWLSTmJwoSsS/QOl7QJXhRiTERatCVoNYSwWix1ncBgKZByGYWa+71y7OOOAA0mfxdmc933yvM97ganUCtgH/QFSSiklABoAAABECGGMIYQIIQhhNR7tp6iycM4ZY9Dz6D+JgOdJKX3f55yb373xB7BUKSglbRsbDVev4K+HO2/dcrNZz/MYY0KIGqIDWJRSUkohRHMqZV29kp2ZYYFAdnp6e3bG8zzOuVLqf7SYbylFCGM5Nvbv/Hz3+Lh79qxGSDoOY75x6mCWqp0fhEj5+2/k6VMxOFgYHEQLC3Z3t32iX0q1XwgAAJlMA1mBkFIW43HAGDl3LvnzL/T160J/f7Jc2p9vQKodVUoprYAGnHPOuRMO+0oFnj+302k/GFw9ebJUKjU22qbHe9tc0cI5txGK/DTRFItprYQQUkp9+jQcGMhPThbm5sKXLm12dABQSa6hAAAgIYSUgjx4wKLR1rU1jInpZUbptW9GQk1NCoDCwsLRYJBSqj/GbkVSSiu/7Uz86LW0LJ3o31xfhxBKKRtDwdbFPwu5XMvx49nZ2c/r6rZGR9d3vZMIIa210YWEEPbM43I87g0NrTU0+L7PmE8IOfziRXl8XB87Ju/fb7t2LTE11X7vXk9bK2OMc26aXZWDtJT80aOmSCQ/MFAsFhljwWCwJ5XcvHGjvqsrcPt2bHk5MzzcefEim57+5OFD13UMkZngCkuzYzfn8/lIpHj4C8ZYKBQ6mk5bN29iIWg0umRZjuO8WllJjYzg7m46MQHTq0KIGjmICEGFEBhblB5pa+17HNu8fLn8/n3ozp35Q4d2doquG3DdQFJp//z5/OJi89tE1RylVMXdHYRge7sfi3X88D3KZLZevgz19YXGxv4Ih3e2C67rYowAAEpp0dnpABDCWCldFWIMJlulcnB0tMv3t548sdrbW69fXzp1Kl5XJ4rFQMC1LAshrJR0HCccjzPXTVuWkfBRpymlmU978tFo7tkzp7dX9faurmao0q4bsG2bUgoAIIR8tvz3xuRkx9DQuyNfQiVrJphQSn3fzzouG/iqKCXI5err6ymllmVZlgUh1Fo3eZ6+excTkrhwIS8EpRRjjDGuXjxCCAEAIIQopVorAACEiFSAAQCcC2vq19zcHP72u/WeHiQlpdQQVbXAROKtUkoIUV15c1ZNkDlXkb9eNb558/bMmVSpTCmxbcd1Xdu2CSEIIQAATCZTNW5VV84cDc657/tmuQAAlFLbtk29uxVBCDHGNZ6bv8pEIUQphRCaF2NMKSWE7HX3P7Ahsw6u9QOHAAAAAElFTkSuQmCC" onmouseup="this.src='+ adup +'" onmousedown="this.src='+ addwn +'"/></div>';
		svsg.innerHTML = '<div class="imagebutton" id="adsig"><img height="20" width="21" title="حفظ الإمضاء" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QUDEQ4skg9P8wAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAADp0lEQVQ4jaVUzU9dVRA/M3POvY/23sdXoVJaA35AYgVM2ohiXvoHSNKF1rppwkLbpS660b9Ad/ovVJugiSayaLppWKAhAduuRN4riWAA+SpQHvDevfecMy7mcUFTV57V3DNzf/Obmd8ZWFr6U/3vo09+MHNuA8BzXWLkXjEaKN57cT836CREHiAuMXQO4b231ubJiQgR8z+dc8ysFHt/jEJERKSU0nkQzv8eP37McVxra0sGBrmpSUKZOSiX3epqMjJS/HU2nZqCKKK33j4YHDTGMLPWWgsL52w2Pv7ixITu7V3r6zs8+4I/dw4RASBcXj776SeLnZ3JpUvJw4fh5GTX1tYf9+4l4+PMHAQBImohAmkWr63taL07NrY3PGxJmywTuvT1V2ZvL7x9eztJ1q9/eOrNYfr4o6xWT5IEkBCRiKRy75YWw0oFWlt3L1zYz6z33ntnrdUPHnRNTj4pldaG3rDWOmfD6enTiBhH1nlrJdIjMzvn6xubtLr615mOahQf1eiRuen7754Zs//e+1mWSQez+XlM0+jKFedsPlkUMAKF3mdh4IhkhN774McfWmZmdsbGDrq7AQARibT2zjFvDQz+Q3WSoXVxEbQO2ttlukqxrlZP37mTDgzsvjuKiNLp4sHB+VqtSvRMKQCEo4PCqnb/fmYMX76cyy2c+KknTbdv3EgKBSLSWhORq5Szcjnq6irEkfRVOKJSyjvnnj7dPDzc7OtvSHl9vXj37nJPT7VUEnUJSlZPwmp1o/eltKNT2AlNLZJ2tZoxRjEzqzAMO779ptn78s1bWZpprY0xAKAUn3LOKFU90+4KBYMgKACgmRmcMwDU2qqMYebgl59fnpmpXLumXr+oWRmjReZKcTz3W10p9AygECl/JZqZmxeetFm7Uyr5OFZK7Rebdz+4Xh8dVQqM0cYYRPTeZ1lam5uLoqhw8bVqoxQ8ftPpwkKUJEtp2jw7W3v1FdXfXx4aQoDgqB2KGR49wvU1ValsOLc98o7c50AaABhpo1jEqanu6emVzz633ecJ0RgjoQDA1vKXXxRWVlRHh7p6VcWxPjqCAvPz5axeT/b2sixTzNDUpMMwh5COOOdstZomdaeU08Z7HwRBGIZBEBhjiEgTEYcht7SQc8wsJIPAIJLW+nhXxTEXCugceS9KkUyNvkg2ABD5NerMqQLIZWMbac3MR6+B8o2nRVQyBYGT4eX9P7n6/itGI6I8JTFObtOTq1dI/cubx/wNXzMRxxIr93UAAAAASUVORK5CYII%3D" onmouseup="this.src='+ ssup +'" onmousedown="this.src='+ ssdwn +'"/></div>';
	}
	
	function sethtml(){
		txtb.innerHTML = '<table width="350" cellspacing="1" cellpadding="6" border="0" style="" class="tborder"><thead><tr><td style="cursor:move" class="thead" id="drag"><a style="float: left;"><img border="0" name="show help" alt="help" onclick="" style="cursor:pointer;" src="http://www.tunisia-sat.com/vb/images/styles/TSBB/buttons/collapse_tcat.gif" title="show help" id="helpbtn"/><img border="0" style="cursor:pointer;" alt="close" onclick="'+clz+'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QQQDwwrVynnaQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAAsklEQVQokY2RMQ6DMBAEZw8nHa9JHYmfAx/IN3gANdoUNhgkQLiwLGtubnWnvu95fBLQdd0TdBiGBEzTdIkIGedXdkshQDYI1rv8OSTvkqTUIAFgWRayDVKuFGCv9Pv1RgaZzNYgLi127mjC8Gvbq/Cfea60IuJ2GhHBliRCh/YntKq7UfiWVjTVra32yr32TiUWvqHLQtbtCPRdllOwjHpzK7SpD7tUHrgO9DiMt7Hr+QP5IjUUX8OP4QAAAABJRU5ErkJggg%3D%3D"/></a>الكتابة بالعربية</td></tr></thead><tbody style=""><tr/><tr width="400"><td style="background-color: rgb(235, 235, 235);"><a id="useyamli" onclick="'+'" style="color:#66aaff;font-size:9pt;cursor:pointer;" >use yamli</a><textarea spellcheck="false" name="saisie" id="txt" dir="rtl" rows="7" cols="36"></textarea><div id="divforlbl"><label style="font-size: 10pt;" for="arab" id="labl">الكتابة بالعربية</label><input type="checkbox" checked="false" tabindex="1" id="arab" value="1" name="ara"/><span style="font-size: 7pt;">&nbsp&nbsp(alt+shift)</span></div></td></tr></tbody></table>';
		helper.innerHTML='<table width="679" cellspacing="1" cellpadding="6" border="0" style="direction:ltr;" class="tborder"><thead><tr><td class="thead" style="direction:rtl;cursor:move" id="drag2"><a style="float: left;"><img border="0" style="cursor:pointer;" alt="close" onclick="'+clz2+'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QQQDwwrVynnaQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAAsklEQVQokY2RMQ6DMBAEZw8nHa9JHYmfAx/IN3gANdoUNhgkQLiwLGtubnWnvu95fBLQdd0TdBiGBEzTdIkIGedXdkshQDYI1rv8OSTvkqTUIAFgWRayDVKuFGCv9Pv1RgaZzNYgLi127mjC8Gvbq/Cfea60IuJ2GhHBliRCh/YntKq7UfiWVjTVra32yr32TiUWvqHLQtbtCPRdllOwjHpzK7SpD7tUHrgO9DiMt7Hr+QP5IjUUX8OP4QAAAABJRU5ErkJggg%3D%3D"/></a><a style="float: left;"><img id="collapse" border="0" style="cursor:pointer;" alt="close" src="http://www.tunisia-sat.com/vb/images/styles/TSBB/buttons/collapse_tcat.gif"/></a>لوحة المفاتيح</td></tr></thead><tbody id="tblbd" align="center"><tr/><tr width="400"><td style="background-color: rgb(235, 235, 235);"><table><tbody> <tr align="center"> <td class="txt">D</td>	<td class="txt">S</td>		<td class="txt">'+qtee+'</td>		<td class="txt">s</td>		<td class="txt">z</td>		<td class="txt">r</td>		<td class="txt">²</td>		<td class="txt">d</td>		<td class="txt">x</td>		<td class="txt">H</td>		<td class="txt">j</td>		<td class="txt">F</td>		<td class="txt">t</td>		<td class="txt">b</td>		<td class="txt">a</td>	  </tr>	  <tr align="center">  	  <td><input type="button" class="bta" onclick="alpha('+D+')" value="ض"/></td> 		<td><input type="button" class="bta" onclick="alpha('+S+')" value="ص"/></td> 		<td><input type="button" class="bt" onclick="alpha('+SS+')" value="ش"/></td> 		<td><input type="button" class="bt" onclick="alpha('+s+')" value="س"/></td> 		<td><input type="button" class="bt" onclick="alpha('+z+')" value="ز"/></td> 		<td><input type="button" class="bt" onclick="alpha('+r+')" value="ر"/></td> 		<td><input type="button" class="bt" onclick="alpha('+th+')" value="ذ"/></td> 		<td><input type="button" class="bt" onclick="alpha('+d+')" value="د"/></td> 		<td><input type="button" class="bt" onclick="alpha('+x3+')" value="خ"/></td> 		<td><input type="button" class="bt" onclick="alpha('+H+')" value="ح"/></td> 		<td><input type="button" class="bt" onclick="alpha('+j+')" value="ج"/></td> 		<td><input type="button" class="bt" onclick="alpha('+F+')" value="ث"/></td> 		<td><input type="button" class="bt" onclick="alpha('+t+')" value="ت"/></td> 		<td><input type="button" class="bt" onclick="alpha('+_b+')" value="ب"/></td> 		<td><input type="button" class="btb" onclick="alpha('+_a+')" value="ا"/></td> 	  </tr> 	</tbody></table> 	<br/>		     	<table> 	  <tbody><tr align="center"> 		<td style="font-size: 10pt;">-</td>		<td class="txt">y</td>		<td class="txt">w</td>		<td class="txt">h</td>		<td class="txt">n</td>		<td class="txt">m</td>		<td class="txt">l</td>		<td class="txt">k</td>		<td class="txt">q</td>		<td class="txt">f</td>		<td class="txt">G</td>		<td class="txt">g</td>		<td class="txt">Z</td>		<td class="txt">T</td>	  </tr>  		<td><input type="button" class="bt" onclick="alpha('+a1+')" value="ء"/></td> 		<td><input type="button" class="bt" onclick="alpha('+y+')" value="ي"/></td> 		<td><input type="button" class="bt" onclick="alpha('+w+')" value="و"/></td> 		<td><input type="button" class="bt" onclick="alpha('+h+')" value="ه"/></td> 		<td><input type="button" class="bt" onclick="alpha('+n+')" value="ن"/></td> 		<td><input type="button" class="bt" onclick="alpha('+m+')" value="م"/></td> 		<td><input type="button" class="bt" onclick="alpha('+l+')" value="ل"/></td> 		<td><input type="button" class="bt" onclick="alpha('+k1+')" value="ك"/></td> 		<td><input type="button" class="bt" onclick="alpha('+q+')" value="ق"/></td> 		<td><input type="button" class="bt" onclick="alpha('+_f+')" value="ف"/></td> 		<td><input type="button" class="bt" onclick="alpha('+G+')" value="غ"/></td> 		<td><input type="button" class="bt" onclick="alpha('+g+')" value="ع"/></td> 		<td><input type="button" class="bt" onclick="alpha('+Z+')" value="ظ"/></td> 		<td><input type="button" class="bt" onclick="alpha('+T+')" value="ط"/></td> 	  </tr> 	</tbody></table> 	<br/> 	<table> 	  <tbody><tr align="center"> 		<td class="txt">Y</td>		<td class="txt">u</td>		<td class="txt">o</td>		<td class="txt">Q</td>		<td class="txt">i</td>		<td class="txt">e</td>		<td class="txt">A</td>	  </tr><tr valign="center">  	  <td><input type="button" class="bt" onclick="alpha('+Y+')" value="ى"/></td> 	  <td><input type="button" class="bt" onclick="alpha('+u+')" value="ئ"/></td> 	  <td><input type="button" class="bt" onclick="alpha('+o+')" value="ؤ"/></td> 	  <td><input type="button" class="bt" onclick="alpha('+Q+')" value="ة"/></td> 	  <td><input type="button" class="btb" onclick="alpha('+i1+')" value="إ"/></td> 	  <td><input type="button" class="btb" onclick="alpha('+e+')" value="أ"/></td>   <td><input type="button" class="btb" onclick="alpha('+A+')" value="آ"/></td> 	  <td> 		 	  </tr> 	</tbody></table> 	<br/> 	<table> 	  <tbody>	 <tr align="center"><td><input type="button" class="txt" value="space" onclick="alpha('+sp+ ')" style="width:250px;height:20pt;"/></td>	   </tr> 	   	  </tr> 	</tbody></table></td></tr></tbody></table>';
	}

	function $id(idi){
		return document.getElementById(idi)
	}

	function showkeyb(){
		//if(!txtb){
		txtb.setAttribute('style','position: fixed; top: 310px; right: 35px; z-index: 100005;')
		if(mytbl!=null){
			mytblp.insertBefore(txtb,mytbl);
		}
		document.getElementById('txt').addEventListener('keyup',function(e){insertIt(e);},false)
	}

	function getCaretPos(el) {
		var rng, ii=-1;
		if(typeof el.selectionStart=="number") {
			ii=el.selectionStart;
		} else if (document.selection && el.createTextRange){
			rng=document.selection.createRange();
			rng.collapse(true);
			rng.moveStart("character", -el.value.length);
			ii=rng.text.length;
		}
		return ii;
	}

	function insert(chr){
		txt = $id('txt')
		ii = getCaretPos($id('txt'))
		chr = txt.value[ii-1]
		chr = changeit(chr)
		if($id('arab').checked)
			txt.value = txt.value.substring(0,ii-1)+chr+txt.value.substring(ii)
	}

	function setSelectionRange(input, selectionStart, selectionEnd) {
		if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		}
		else if (input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select();
		}
	}

	function setCaretToPos (input, pos) {
		setSelectionRange(input, pos, pos);
	}
	
	function trans (chr,chg){
		pos = getCaretPos($id('txt'))
		if(chg)chr = changeit(chr)
		insert(chr)
		setCaretToPos($id('txt'),pos)
	}

	function $id(id){
		return document.getElementById(id);
	}

	function changeit(car) {
		//allstr='';
		//allstr = document.getElementById('txt').value;
		//leng =allstr.length;
		//document.getElementById('txt').valueallstr.slice(0,strLen-1);
		car = car.replace(/’/g, "\'");
		car = car.replace(/a/g, "ا");
		car = car.replace(/b/g, "ب");
		car = car.replace(/p/g, "پ");
		car = car.replace(/t/g, "ت");
		car = car.replace(/F/g, "ث");
		car = car.replace(/j/g, "ج");
		car = car.replace(/H/g, "ح");
		car = car.replace(/x/g, "خ");
		car = car.replace(/d/g, "د");
		car = car.replace(/²/g, "ذ");
		car = car.replace(/r/g, "ر");
		car = car.replace(/z/g, "ز");
		car = car.replace(/s/g, "س");
		car = car.replace(/"/g, "ش");
		car = car.replace(/e/g, "أ");
		car = car.replace(/S/g, "ص");
		car = car.replace(/D/g, "ض");
		car = car.replace(/T/g, "ط");
		car = car.replace(/Z/g, "ظ");
		car = car.replace(/g/g, "ع");
		car = car.replace(/G/g, "غ");
		car = car.replace(/f/g, "ف");
		car = car.replace(/q/g, "ق");
		car = car.replace(/k/g, "ك");
		car = car.replace(/l/g, "ل");
		car = car.replace(/m/g, "م");
		car = car.replace(/n/g, "ن");
		car = car.replace(/h/g, "ه");
		car = car.replace(/Q/g, "ة");
		car = car.replace(/w/g, "و");
		car = car.replace(/y/g, "ي");
		car = car.replace(/i/g, "إ");
		car = car.replace(/-/g, "ء");
		car = car.replace(/o/g, "ؤ");
		car = car.replace(/u/g, "ئ");
		car = car.replace(/I/g, "إ");
		car = car.replace(/Y/g, "ى");
		car = car.replace(/A/g, "آ");
		car = car.replace(/_/g, "ـ");
		car = car.replace(/\?/g, "؟");
		car = car.replace(/\;/g, "؛");
		car = car.replace(/\,/g, "،");
		return(car)
	}
	
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.insertBefore(style,head.firstChild.nextSibling);
	}

	function addScript(js) {
		var head, script;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = js;
		head.insertBefore(script,head.lastChild.nextSibling);
	}

	function addScript2(js) {
		var body, script;
		body = document.getElementsByTagName('body');
		if (!body) { return; }
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = js;
		body.insertBefore(script,body.lastChild.nextSibling);
	}
	
	function addScriptBySrc(source) {
		var head, script;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = source;
		head.insertBefore(script,head.lastChild.nextSibling);
	}
	
	function savesig(){
		if(!document.getElementById('vB_Editor_001_iframe'))return;
		var inhtml = document.getElementById('vB_Editor_001_iframe').contentDocument.body.innerHTML
		if(!confirm("This will overwrite any previously saved data,\nproceed?"))return;
		Set_Cookie('signtnsat',inhtml,10000,'/','.tunisia-sat.com','')
		GM_setValue('signtnsat',inhtml)
	}

	function Set_Cookie( name, value, expires, path, domain, secure ){

		var today = new Date();
		today.setTime( today.getTime() );
		if ( expires ){
			expires = expires * 1000 * 60 * 60 * 24;
		}
		var expires_date = new Date( today.getTime() + (expires) );
		document.cookie = name + "=" +escape( value ) +
		( ( expires ) ? ";expires=" + expires_date.toGMTString() : "never" ) +
		( ( path ) ? ";path=" + path : "" ) +
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
	}

	function getCookie(name){
		var cookies = document.cookie;
		if (cookies.indexOf(name) != -1){
			var startpos = cookies.indexOf(name)+name.length+1;
			var endpos = cookies.indexOf(";",startpos)-1;
			if (endpos == -2) endpos = cookies.length;
				return unescape(cookies.substring(startpos,endpos));
		}else
		{
			return false;
		}
	}

	function getCookie2(name){
		var cookies = document.cookie;
		if (cookies.indexOf(name) != -1){
			var startpos = cookies.indexOf(name)+name.length+1;
			var endpos = cookies.indexOf(";",startpos)-1;
			if (endpos == -2) endpos = cookies.length;
				return unescape(cookies.substring(startpos,endpos+1));
		}else
		{
			return false;
		}
	}

	function addsig(){
		var getsign = GM_getValue('signtnsat')
		if(!getsign)getsign = getCookie('signtnsat')
		if(getsign)GM_setValue('signtnsat',getsign)
		if(!document.getElementById('vB_Editor_001_iframe'))return;
		var ifrm = document.getElementById('vB_Editor_001_iframe')
		if(getsign)ifrm.contentDocument.body.innerHTML += getsign;
			else alert('ليس هناك إمضاء مسجل، عليك تسجيل إمضاء جديد')
	}

	function ins_ifr () {
		txt = document.getElementById('txt')
		ifr = document.createElement('iframe')
		ifr.id = "divforyamli"
		ifr.height = "180"
		ifr.width="342"
		ifr.setAttribute('style','border: 0px none ; position: relative; top: -10px; left: 5px;')
		ifr.scrolling ="no"
		ifr.src = "http://unloco.uuuq.com/MozillaAddons/yamli.htm"
		txt.parentNode.insertBefore(ifr,txt.nextSibling)
		ifr.contentDocument.body.setAttribute("dir","rtl")
	}

	function hideyamli () {
		$id('txt').setAttribute('style','display: block;');
		$id('divforlbl').setAttribute('style','display: block;');
		$id('divforyamli').setAttribute('style','display:none;');
		offs = 372;
		$id("return").id = "useyamli"
		$id('useyamli').innerHTML = "use yamli"
		$id('useyamli').addEventListener('mousedown',function(){showyamli();},false);
	}

	function showyamli() {
		addScriptBySrc("http://api.yamli.com/js/yamli_api.js?4145");
		$id('txt').setAttribute('style','display: none;');
		$id('divforlbl').setAttribute('style','display: none;');
		
		if($id('useyamli'))ifrexists = $id("useyamli").nextSibling.nextSibling.tagName == "IFRAME";
			else ifrexists = true;
		var ifrmasked = $id('divforyamli') && $id('divforyamli').style.display == "none"
		
		if(!ifrexists)ins_ifr();
			else if(ifrmasked)ifr.setAttribute('style','border: 0px none ; position: relative; top: -10px; left: 5px;')
		offs = offs + 3;
		$id('useyamli').innerHTML = "return"
		$id("useyamli").id = "return"
		$id('return').addEventListener('mousedown',function(){hideyamli()},false);
	}

	var xmlhttp=new XMLHttpRequest()
	var xmlhttp1=new XMLHttpRequest()
	function requestData1 (url) {
		xmlhttp1.onreadystatechange=state_Change1;
		xmlhttp1.open("GET",url,true);
		xmlhttp1.send(null);
	}

	function requestData (url) {
		xmlhttp.onreadystatechange=state_Change;
		xmlhttp.open("GET",url,true);
		xmlhttp.send(null);
	}

	function state_Change1(){
		if (xmlhttp1.readyState==4){// 4 = "loaded"
			if (xmlhttp1.status==200){// 200 = OK
				getReputation()	
			}else
			{
				remove(loader)
			}
		}
	}

	function state_Change(){
		if (xmlhttp.readyState==4){// 4 = "loaded"
			if (xmlhttp.status==200){// 200 = OK
				getFriendsList()	
			}else
			{
		    }
		}
	}

	function getReputation (){	
		resp1 = xmlhttp1.responseText
		indx = resp1.indexOf('آخر تقييم استلمت')
		resp1 = resp1.substring(indx)
		reput = 'id="collapseobj_usercp_reputation"'
		temp = resp1
		var links = []
		var i = 0;
		do{
			showth = temp.indexOf('showthread.php')
			thankedthreads = temp.substring(showth-27)
			slasha = thankedthreads.indexOf("</a>")+4
			link = thankedthreads.substring(0,slasha)
			showth!=-1?links[i] = link:true
			i = i + 1
			temp = thankedthreads.substring(slasha)
		}while(showth != -1)
		build(links)
	}

	function getY( oElement ){
		var iReturnValue = 0;
		while( oElement != null ) {
			iReturnValue += oElement.offsetTop;
			oElement = oElement.offsetParent;
		}
		return iReturnValue;
	}

	function build (ar){
		var tableinhtml = []
		tableinhtml[0] = '<table width="100%" cellspacing="1" cellpadding="6" border="0" align="center" class="tborde"><thead id="drag3" style="color: red; font-size: 7pt; cursor: move; height: 18px; direction: ltr;" class="thead"><img border="0" id="closethnx" style="cursor: pointer;position:relative;top:2px;left:1px;" alt="close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QQQDwwrVynnaQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAAsklEQVQokY2RMQ6DMBAEZw8nHa9JHYmfAx/IN3gANdoUNhgkQLiwLGtubnWnvu95fBLQdd0TdBiGBEzTdIkIGedXdkshQDYI1rv8OSTvkqTUIAFgWRayDVKuFGCv9Pv1RgaZzNYgLi127mjC8Gvbq/Cfea60IuJ2GhHBliRCh/YntKq7UfiWVjTVra32yr32TiUWvqHLQtbtCPRdllOwjHpzK7SpD7tUHrgO9DiMt7Hr+QP5IjUUX8OP4QAAAABJRU5ErkJggg%3D%3D"/>&nbsp&nbsp&nbsp TnSatPlus+</thead><tbody style="" id="collapseobj_usercp_reputation"><tr><td width="50%" class="alt1Active">'
		tableinhtml[1] = '</td></tr><tr><td width="50%" class="alt1Active">'
		tableinhtml[2] = '</td></tr></tbody></table>'
		var divinnerhtml;
		for(var i=0;i<ar.length;i++){
			if(i==0)divinnerhtml=tableinhtml[0]
			if(i)divinnerhtml = divinnerhtml + tableinhtml[1]
			divinnerhtml = divinnerhtml + ar[i]
			if(i == ar.length-1)divinnerhtml = divinnerhtml + tableinhtml[2]			
	}
		var divforreput = document.createElement('div')
		if($id('divforreput'))remove('divforreput')
		divforreput.innerHTML = divinnerhtml
		usercp = document.evaluate('//a[@href="usercp.php"]',document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null)
		usercplnk = usercp.snapshotItem(0)
		pos = getY(usercplnk) +20
		divforreput.id ="divforreput"
		divforreput.setAttribute('style','position:absolute;width:200px;top:'+pos+'px;right:30px;background-color: rgb(245,245,245);opacity:0.90')
		document.body.appendChild(divforreput)
		remove(loader)
	}

	function remove (id){
		if (typeof id == "string")$id(id).parentNode.removeChild($id(id))
		else id.parentNode.removeChild(id)
	}

	function getFriendsList () {
		resp = xmlhttp.responseText
		bdlist = 'id="buddylist"'
		indexofUL = resp.indexOf(bdlist) -57
		UL = resp.substring(indexofUL)
		slashUL = UL.indexOf('</ul>')
		inh = UL.substring(0,slashUL+5)
		slice_it(inh)
	}

	function slice_it(test) {
		fl = 'مشاهدة الملف الشخصي'
		var members = []
		i = 0
		do{
			mem = test.indexOf(fl)
			membr = test.substring(mem+21)
			mmbr = membr.indexOf('</a>')
			member1 = membr.substring(0,mmbr)
			member1?members[i] = member1:true
			i += 1
			test = membr.substring(mmbr)
		}while(mem != -1)
			var buddies = members.toString().replace(/,/g, "|");
			Set_Cookie('buddylistattnsat',buddies,10000,'/','.tunisia-sat.com','')
			GM_setValue('buddylistattnsat',buddies)
	}

	function savestyle (){
		for(var i=1;i<8;i++){
		if($id('vB_Editor_001_sizeoption_'+i).style.display != "none"){size = $id('vB_Editor_001_sizeoption_'+i).innerHTML;i=8}
		else size = "0"
		}
		tdfont = document.evaluate('//td[@style="border-left: 1px solid rgb(255, 255, 255);"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		tdfont = tdfont.snapshotItem(0)
		font=""
		for(var i=1;i<22;i++){
			if(tdfont){
			childfont = tdfont.childNodes[i]
			if(childfont.style.display != "none"){font = childfont.innerHTML;i=22}
			else font = "null"}
			else {i=22;font = "null"}
		}
		
		styl = ""
		if($id('vB_Editor_001_cmd_bold').style.border.substring(0,3)=="1px")styl += "bold|"
		else styl += "nobold|"
		if($id('vB_Editor_001_cmd_italic').style.border.substring(0,3)=="1px")styl += "italic|"
		else styl += "noitalic|"
		if($id('vB_Editor_001_cmd_underline').style.border.substring(0,3)=="1px")styl += "underline|"
		else styl += "nounderline|"
	
		align = ""
		if($id('vB_Editor_001_cmd_justifycenter').style.border.substring(0,3)=="1px")align += "center|"
		else align += "nocenter|"
		if($id('vB_Editor_001_cmd_justifyright').style.border.substring(0,3)=="1px")align += "right|"
		else align += "noright|"
		if($id('vB_Editor_001_cmd_justifyleft').style.border.substring(0,3)=="1px")align += "left|"
		else align += "noleft|"
		
		bgcolor = $id('vB_Editor_001_color_bar').getAttribute('style').substring(18,$id('vB_Editor_001_color_bar').getAttribute('style').length)
		
		cooki = size + "|" + font + "|" + styl + align + bgcolor
		Set_Cookie('styletnsat',cooki,10000,'/','.tunisia-sat.com','')
		GM_setValue('styletnsat',cooki)
	}

	function setstyle (report){
		bo = bc = uo = uc = io = ic = align = font = size = color =""
		var styl = GM_getValue("styletnsat")
		if(!styl)styl = getCookie('styletnsat')
		if(styl)GM_setValue('styletnsat',styl)
		//alert(styl)
		if(!styl)return;
		args = styl.split("|")
	
		if(args[0] != "0")size = args[0]
		if(args[1] != "null")font = args[1]
		if(args[2] == "bold"){bo ="<b>";bc= "</b>"}
		if(args[3] == "italic"){io="<i>";ic="</i>"}
		if(args[4] == "underline"){uo="<u>";uc="</u>"}
		if(args[5] == "center")align="center"
		if(args[7] == "left")align="left"
		color = args[8].substring(0,args[8].length-1)
		if(!report)
		$id('vB_Editor_001_iframe').contentDocument.body.innerHTML += '<div align="'+align+'">'+bo+'<font size="'+size+'" color="'+color+'" face="'+font+'">'+uo+''+io+'<br>'+''+'</font>'+'</div>'
		return(bo+io+uo+'<font size="'+size+'" color="'+color+'" face="'+font+'">')
	}
		
	function insert_txt(chr,e){
		e.preventDefault()
		if (typeof(chr)!=undefined)
		setTimeout("vB_Editor['vB_Editor_001'].insert_text('"+chr+"')",0000)
	}

	function log(str){
		setTimeout("console.log('" + str + "')",0)
	}

	function info (info){
		setTimeout("window.console.info('"+info+"')",0000)
	}
	
	function checkArabic (){
		if($id('checkar') && !document.getElementById('checkar').checked) $id('checkar').checked=true;		
		else													  $id('checkar').checked=false;
	}

	window.addEventListener('keydown',function(e){
	//the Hotkey
		if(e.altKey && e.shiftKey){
	//the CheckBox
		if($id('arab') && !document.getElementById('arab').checked){
			$id('arab').checked=true;
		}else
		{
			document.getElementById('arab').checked=false;
		}
	
	}},false);

	function Resize(ev,arg){
		w = $id('vB_Editor_001_iframe').offsetWidth
		w = w + arg *  50
		$id('vB_Editor_001_iframe').style.width = w + "px"
		GM_setValue("Width",w)
		if (arg == 1)
			window.scrollBy(-arg*55,0)
	}

	function prevent(e){
		e.stopPropagation();
		e.preventDefault() ;
	}
	
	function insertLink (){
		_link = document.getElementById('inslnk').getAttribute('lnk')
		cliplnk  = $id('vB_Editor_001_iframe').getAttribute('cliplnk')
		_addlink = '<a href ="'+cliplnk+'">'+_link+"</a>"
		setTimeout("vB_Editor['vB_Editor_001'].insert_text('"+_addlink+"')",0)
	}

	function ins_img (){
		clipimg = '"' + GM_getValue('imgloc') +'"'
		setTimeout('vB_Editor["vB_Editor_001"].apply_format ( "InsertImage",false,'+clipimg+')',0)
	}
			
	function showback(){
		if(txtb.style.position != "fixed"){txtb.style.display = "none";return;}
		if(shown==0)return;
		if(shown == 1)txtb.style.display = "block";
		if(shown == 2){txtb.style.display = "block";helper.style.display = "block"}
		shown = null;
	}
	
	function insertSpecialElements(Span){
		Prev = document.createElement('a');
		var SpanNextSib = Span
		while (SpanNextSib.tagName != "A"){
			SpanNextSib = SpanNextSib.nextSibling
		}
		var Href = SpanNextSib.getAttribute('href')
		Href = Href.replace("goto=newpost&","")
		Prev.setAttribute('href',Href)
		Prev.setAttribute('onclick','return false;')
		Prev.setAttribute('title','الإطلاع على الموضوع هنا')
		Prev.innerHTML = "<img id='PrevImage' src=" + PrevImg + "border=0 />"
		Span.appendChild(Prev)
		//http://www.tunisia-sat.com/vb/newreply.php?do=newreply&t=1025661
		//http://www.tunisia-sat.com/vb/showthread.php?t=1055462
		var ThreadId = Href.substring(Href.indexOf("t=")+2)
		var ReplyHref = "http://www.tunisia-sat.com/vb/newreply.php?do=newreply&t=" + ThreadId
		Prev = document.createElement('a');
		var Href = SpanNextSib.getAttribute('href')
		Prev.setAttribute('href',ReplyHref)
		Prev.setAttribute('target','_blank')
		Prev.setAttribute('title','إضافة رد في هذا الموضوع')
		Prev.innerHTML = "<img src=" + AddCommentImg + "border=0 />"
		Span.appendChild(Prev)
	}

	//LOAD FUNCTION
	
	function inLoad(e) {
		
		addScriptBySrc("http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js")
		var script = "function _down(em){em.setAttribute('style','background-color:rgb(180,220,255)')}function _up(em){em.setAttribute('style','background-color:#71a2ea')}function _ovr(em){em.setAttribute('style','background-color:#91c2fa')}"
		addScript(script)
		sethtml();
		var _loc = window.location.toString();
		if(_loc.indexOf("http://www.tunisia-sat.com/vb/profile.php?do=buddylist")!=-1){
			var bdlist0 = document.body.innerHTML
			bdlist = 'id="buddylist"'
			indexofUL = bdlist0.indexOf(bdlist) -57
			UL = bdlist0.substring(indexofUL)
			slashUL = UL.indexOf('</ul>')
			inh = UL.substring(0,slashUL+5)
			slice_it(inh)
		}
		else if(!GM_getValue("buddylistattnsat"))
			requestData("http://www.tunisia-sat.com/vb/profile.php?do=buddylist")
			
		if(getCookie2("buddylistattnsat")){
			var span = "'member.php?u=101129', '_self'"
			spans = document.evaluate(
			'//span[@style="cursor: pointer;"]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
			var ck = getCookie2("buddylistattnsat").split("|")
			var len = ck.length
			var count = spans.snapshotLength
			for (var i=0;i<count;i++){
				var spinhtml = spans.snapshotItem(i).innerHTML
				if(ck.indexOf(spinhtml)>-1 && GM_getValue("on1")){
					spans.snapshotItem(i).setAttribute('style','cursor:pointer;font-weight:bold')
					spans.snapshotItem(i).parentNode.parentNode.setAttribute('style', "background-color: rgb(240,245,255);")
				}
			}
		}
	
		if(_loc.search(/http:\/\/www\.tunisia-sports\.com/)!=-1)sethtml3();

	if($id('vB_Editor_001_cmd_wrap0_code')){
		var wrapcode = $id('vB_Editor_001_cmd_wrap0_code').parentNode
		var checkAr = document.createElement('td')
		checkAr.innerHTML = "<div title='الكتابة بالعربية'><input type='checkbox' id='checkar'></div>"
		wrapcode.parentNode.insertBefore(checkAr,wrapcode.nextSibling);info('done')
	}
	
	if($id('vB_Editor_001_iframe')){
		window.addEventListener('beforeunload',prevent,false)
		document.forms[3].addEventListener('submit',function(e){
		window.removeEventListener('beforeunload',prevent,false)
	},false)
	
	$id('vB_Editor_001_iframe').contentWindow.addEventListener('keydown',function(e){
	
	if(e.shiftKey && e.altKey) checkArabic()
	if(($id('checkar') && !$id('checkar').checked)|| e.ctrlKey || e.altKey)return;

	if(e.keyCode==190 && !e.shiftKey)insert_txt('؛',e)
	if(e.keyCode==188 && !e.shiftKey)insert_txt('،',e)
	if(e.keyCode==188 && e.shiftKey)insert_txt('؟',e)
	if(e.keyCode==54 && !e.shiftKey)insert_txt('ء',e)
	if(e.keyCode==222)insert_txt('ذ',e)
	if(e.keyCode==51 && !e.shiftKey)insert_txt('ش',e)
	chr = String.fromCharCode(e.keyCode)
	if(!e.shiftKey) chr = chr.toLowerCase()
	if(e.keyCode > 57 && e.keyCode < 91) insert_txt(changeit(chr),e)
	},false);
	
	try{
		if (GM_getValue("Width") != 0){
			var w = GM_getValue("Width")
			$id('vB_Editor_001_iframe').style.width = w + "px"
		}
	}catch(ex){}
	}

	if($id('vB_Editor_001_popup_forecolor')){
		var fore = $id('vB_Editor_001_popup_forecolor').parentNode
		var svstyle = document.createElement('td')
		svstyle.innerHTML = "<div style='background-color:#71a2ea' title='save style' onmousedown='_down(this)' onmouseup='_up(this)' onmouseout='_up(this)' onmouseover='_ovr(this)' ><img id='svstyle' src='images/styles/TSBB/misc/navbits_start.gif' /></div>"
		fore.parentNode.insertBefore(svstyle,fore.nextSibling)
		svstyle.addEventListener('click',function(e){savestyle(e)},false);
		styl_ofuser = setstyle(false)
		
	}
	
	if($id('vB_Editor_001_cmd_resize_0_100')){
		var fore = $id('vB_Editor_001_cmd_resize_0_100').parentNode
		var resZ = document.createElement('td')
		
		resZ.innerHTML = ""
		fore.parentNode.insertBefore(resZ,fore.previousSibling)
		var resZ1 = document.createElement('td')
		var resZ2 = document.createElement('td')
		resZ1.innerHTML = "<div style='background-color:#71a2ea' title='save style' onmousedown='_down(this)' onmouseup='_up(this)' onmouseout='_up(this)' onmouseover='_ovr(this)' > <img id='svstyle' src='data:image/png;base64,R0lGODlhCQAVAAAAACH5BAEAAAEALAAAAAAJABUAgE1NTQAAAAIVjI+py+3PgJEISFutPhjzCYXiSCYFADs=' /> </div>"
		resZ2.innerHTML = "<div style='background-color:#71a2ea' title='save style' onmousedown='_down(this)' onmouseup='_up(this)' onmouseout='_up(this)' onmouseover='_ovr(this)' ><img id='svstyle' src='data:image/png;base64,R0lGODlhCQAVAAAAACH5BAEAAAEALAAAAAAJABUAgE1NTQAAAAIVjI+py+3fgJEHSFutRhjzCYXiSCIFADs=' /></div>"
		resZ.insertBefore(resZ2,resZ.firstChild)
		resZ.insertBefore(resZ1,resZ.firstChild)
		resZ1.addEventListener('click',function(e){Resize(e,-1)},false);
		resZ2.addEventListener('click',function(e){Resize(e,1)},false);
	}
	
	imgs = document.evaluate(
		'//img[@src="images/styles/TSBB/buttons/reply.gif"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	tblz = document.evaluate(
		'//table',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		if(tblz.snapshotLength!=0){
			mytbl = tblz.snapshotItem(0);
			if(mytbl){
				mytblp = mytbl.parentNode;
			}
		}
	txtb.setAttribute('style','display:none;')
		if (mytbl!=null && GM_getValue('on0')){
			mytblp.insertBefore(txtb,mytbl);
		}
		if($id('txt'))$id('txt').addEventListener('keyup',function(e){
			if(($id('arab') && !$id('arab').checked)|| e.ctrlKey || e.altKey)return;
			//alert(e.keyCode)
			if(e.keyCode==27)$id("divfortxt").parentNode.removeChild($id("divfortxt"))
			if(e.keyCode==190 && !e.shiftKey)trans('؛',false)
			if(e.keyCode==188 && !e.shiftKey)trans('،',false)
			if(e.keyCode==188 && e.shiftKey)trans('؟',false)
			if(e.keyCode==54 && !e.shiftKey)trans('ء',false)
			if(e.keyCode==222)trans('ذ',false)
			if(e.keyCode==51 && !e.shiftKey)trans('ش',false)
			if(e.keyCode < 57 || e.keyCode > 90) return;
		
			chr = String.fromCharCode(e.keyCode)
			if(!e.shiftKey) chr = chr.toLowerCase()
			trans(chr,true)
		},false);

		//the Checkbox
		var chk = parent.document.createElement('div');
		chk.setAttribute('style', 'padding: 3px;');
		chk.innerHTML='<label id="labl" for="arab" style="font-size: 10pt;"><input type="checkbox" name="ara" value="1" id="arab" tabindex="1" txt=""/>الكتابة بالعربية</label><span style="font-size: 7pt;">&nbsp&nbsp(ctrl+alt)</span>'
		
		var keyb = document.createElement('div');
		keyb.setAttribute('id','akeyb');
		keyb.setAttribute('style','position: fixed; bottom:5px;left:27px; cursor:pointer;');
		keyb.setAttribute('class','tborder');
		keyb.innerHTML="<td class='vbmenu_option vbmenu_option_alink'><a id='akeybb' style='font-weight: bold;'>arabic keyb</a></td>"

		addGlobalStyle(".txt { font-size:11pt; color:#0044aa; font-weight:bold; font-family:'Times New Roman'; }");
		addGlobalStyle(".bt {cursor:pointer; height:30pt;width:30pt; font-weight:bold; font-size:13pt; color:#CC0033; font-family:'Times New Roman'; }");
		addGlobalStyle(".btb {cursor:pointer;height:30pt; width:30pt;font-weight:bold; font-size:13pt; color:#CC0033; font-family:'Times New Roman'; }");
		addGlobalStyle(".bta {cursor:pointer;height:30pt; width:30pt;font-weight:bold;font-size:13pt;color:#CC0033; font-family:'Times New Roman'; }");
		addGlobalStyle(".bf {cursor:pointer; font-size:9pt; color:#666666; }");
		addGlobalStyle(".carar { font-size:10pt; color:blue; font-family:'Times New Roman'; }");
		addGlobalStyle(".cadr {width:80%; font-size:22pt; color:blue; font-family:'Simplified Arabic','Times New Roman'; padding:5px; scrollbar-base-color:transparent; scrollbar-track-color:transparent; }");
		addScript("function alpha(car){document.getElementById('txt').value = document.getElementById('txt').value+car;document.getElementById('txt').focus()}");

		//The Preview Popup
		if (GM_getValue('on4')){			
			//<div id="backgroundPopup" style="height: 759px; opacity: 0.7; display: block;"></div>
			var backgroundPopup = document.createElement('div')
			backgroundPopup.id = "backgroundPopup"
			backgroundPopup.setAttribute('style','width: 100% ; height: 100%;display:none;position:fixed;top:0px;left:0px;background:#000000;z-index:1000;opacity:0.2;')
			//document.body.appendChild(backgroundPopup)
			mytblp.insertBefore(backgroundPopup,mytbl);
			
			var previewPopup = document.createElement('div')
			previewPopup.id = "previewPopup"
			previewPopup.setAttribute('style','display:none;width: 900px ; height: 500px;z-index:1001;')
			var Prv = "'PrevContainer'"
			addScript("function hidepreviewTable(){ document.getElementById('previewPopup').style.display = 'none'}")
			previewPopup.innerHTML = '<table width="900" style="position:absolute;" cellspacing="1" cellpadding="6" border="0" class="tborder" id="previewTable"><thead><tr><td id="drag4" style="cursor:move" class="thead"><a onclick="return toggle_collapse(' + Prv + ')" style="float: left;" href="#top"><img border="0" style="" id="collapseimg_PrevContainer" src="images/styles/TSBB/buttons/collapse_thead.gif" alt=""></a>		مشاهدة الموضوع <span title="إنهاء المشاهدة" style="float: right; margin-left: 10px; cursor: pointer;" id="hidePreview" ><img id="hidePreview" src="http://img9.imageshack.us/img9/7158/cancel3337.png"></span>	</td></tr></thead><tbody id="collapseobj_PrevContainer" style="height:510px"><tr>	<td class="alt1" id="PreviewContainer"><div id ="PreviewContainerDiv" style="overflow: auto;height:500px;width:900px"></div><img src="' + '" style="cursor: se-resize; position: absolute; bottom: -42px; right: 2px;" id="neresize"/>	</td></tr></tbody></table>'
			//document.body.appendChild(previewPopup)
			mytblp.insertBefore(previewPopup,mytbl);
			var previewFrame = document.createElement('iframe')
			previewFrame.id = 'previewFrame'
			previewFrame.setAttribute('style','width: 881px ; height: 500px ;border: 1px inset; background-color:gray;')
					
			tds = document.evaluate(
			'//td[(@class="alt1" or @class="stuck") and contains(@id,"td_threadtitle")]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
			
			if (tds.snapshotLength > 0 ){
				for (i=0 ; i<tds.snapshotLength ; i++){
					var td = tds.snapshotItem(i)
					if (td.getAttribute("Done") != "true"){
						//TODO :: Preview // Reply // Hide
						var divContainer = null;
						for (x in td.childNodes){
							if (td.childNodes[x].tagName == 'DIV'){
								divContainer = td.childNodes[x]
								if (divContainer != null){
									var Spn = document.createElement('Span')                                            
									Spn.setAttribute("style","float:right;margin-left:10px;opacity:0.8;")
									divContainer.insertBefore(Spn,divContainer.firstChild.nextSibling)
									insertSpecialElements(Spn)
								}
								break
							}          
						}
					}
				}
			}				
		}
		//Removing The Ads
		pub = document.evaluate(
			'//iframe[@name="google_ads_frame"]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		if(pub.snapshotLength!=0){
			for (var i=0;i<pub.snapshotLength;i++){
				var lbg=pub.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				var remprnt =lbg.parentNode;
				remprnt.removeChild(lbg);
			}
		}

		//Adding The Username To The Search Field
		user = document.evaluate(
			'//html/body/div/div/div/table/tbody/tr/td[2]/div/strong/a',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		user2 = document.evaluate(
			'/html/body/div[4]/div/div/table/tbody/tr/td[2]/div/strong/a',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
		if(user.snapshotLength!=0 && $id('userfield_txt')){
			for (var i=0;i<user.snapshotLength;i++){
				var ahref = user.snapshotItem(i);
				var  usr= ahref.innerHTML;
				info(usr)
				if(document.getElementById('userfield_txt').value=="")document.getElementById('userfield_txt').value=usr;
			}
		}

		if(user2.snapshotLength!=0){
		
			for (var i=0;i<count;i++){
				var spinhtml = spans.snapshotItem(i).innerHTML
				usr = user2.snapshotItem(0).innerHTML
				
				if(usr == spinhtml && GM_getValue("on2")){
					spans.snapshotItem(i).setAttribute('style','cursor:pointer;font-weight:bold')
					spans.snapshotItem(i).parentNode.parentNode.setAttribute('style', "background-color: rgb(250,255,255);")
				}
			}
		}

		//Previewing The Attached Images
		var allimgs;
		allimgs = document.evaluate(
			'//img[@class="thumbnail"]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		if (allimgs.snapshotLength!=0){
			for(var i=0; i<allimgs.snapshotLength;i++){
				var imag = allimgs.snapshotItem(i);
				var idn = allimgs.snapshotItem(i).parentNode.id;
				var hrff = allimgs.snapshotItem(i).parentNode.href;
				imgz[idn] = new Image();
				imgz[idn].src = hrff;
				//loading the attached Images
			}
		}

		if($id('useyamli'))$id('useyamli').addEventListener('mousedown',function(){showyamli();},false);

	}//LOAD FUNCTION

	var a =/^thread_title_\d{3,}/;
	var b =/^td_threadtitle_\d{3,}$/;
	var b1 =/igifr$/;
	var f=/forumdisplay\.php\?f=\d{1,}$/;
	var tn = /tunisia-sat\.com\/vb/
	window.addEventListener('mouseover', function(e) {
		var t = e.target;
		if (t.tagName == "EMBED"){
		try{
			dv = t.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
			if(dv.id.indexOf("ame_doshow_post_") == 0){
				if (dv.getAttribute("closeful") == "1") return;
				var img = document.createElement("img")
				img.setAttribute("title","close this video")
				img.setAttribute("style","position:relative;top:31px;left:205px;")
				img.setAttribute("onclick","this.parentNode.parentNode.removeChild(this.parentNode)")
				img.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPCAIAAACEOBM8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QkbDzATI0lluAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAB9ElEQVQokaVTMWhTURQ99/2fLyTk02DqEB06VMSMDi10sQZEF7dAhlLBQbIKppDFyUIDVXAtiA5OhW6VghRxcNIGwUFE6KBIOgj6/1e/zc9/912Hl8TENiB4uMN9554D9937HnUf3iOAIESYBBGMVkUgIAEgoiaa/g3/63fNYUwAUb/Bx/vB7kFsa5dLuRuzhaMMACMigIBcPvylAIJYxe5BvLW5YfNqrW50+vxLb5S5XsoAAIgBEVE6DNIwSKNAR6GOwsqUVGt1q97a3PjLXJkSHYU6CnphoMMgjUL62li2Y1Doj/hJ4L744Q5tQ/OlvF4uaAACMYAARkhxLzHjsZSLF7NJtVaPBqjW6ovZ7lIuHpVxL+EkcTvPtglQNLaJ+PQcTp7rdrt/mM+fOp3XNhfACAxghJybvgEzDINZmIX56Zn5dvH8g/t3zABXr1x89PLdT5U5++2j1RhmZjaaFSkbZGNnZqE9XV5vNdM0TdP01u27NllvNdvT5Z2ZhYFSKaXIIUV5T/mek/cc33N8b69YXlttaK211ivN1tz3DyvNlj2urTb2imXH91TeU36G8h75Hr2tFJTAUf33v5278OrErL3nfLJ/LX5zlBHAGBghBuh9raQIpGTy9zkGIjBCbOB6p7LKIRpu/1g1xqoCQGBYjKHfC4czB1PpHHcAAAAASUVORK5CYII=")
				dv.insertBefore(img,dv.firstChild.nextSibling)
				log(img)
				iD = dv.id
				log(iD)
				img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPCAIAAACEOBM8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QkbDzATI0lluAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAB9ElEQVQokaVTMWhTURQ99/2fLyTk02DqEB06VMSMDi10sQZEF7dAhlLBQbIKppDFyUIDVXAtiA5OhW6VghRxcNIGwUFE6KBIOgj6/1e/zc9/912Hl8TENiB4uMN9554D9937HnUf3iOAIESYBBGMVkUgIAEgoiaa/g3/63fNYUwAUb/Bx/vB7kFsa5dLuRuzhaMMACMigIBcPvylAIJYxe5BvLW5YfNqrW50+vxLb5S5XsoAAIgBEVE6DNIwSKNAR6GOwsqUVGt1q97a3PjLXJkSHYU6CnphoMMgjUL62li2Y1Doj/hJ4L744Q5tQ/OlvF4uaAACMYAARkhxLzHjsZSLF7NJtVaPBqjW6ovZ7lIuHpVxL+EkcTvPtglQNLaJ+PQcTp7rdrt/mM+fOp3XNhfACAxghJybvgEzDINZmIX56Zn5dvH8g/t3zABXr1x89PLdT5U5++2j1RhmZjaaFSkbZGNnZqE9XV5vNdM0TdP01u27NllvNdvT5Z2ZhYFSKaXIIUV5T/mek/cc33N8b69YXlttaK211ivN1tz3DyvNlj2urTb2imXH91TeU36G8h75Hr2tFJTAUf33v5278OrErL3nfLJ/LX5zlBHAGBghBuh9raQIpGTy9zkGIjBCbOB6p7LKIRpu/1g1xqoCQGBYjKHfC4czB1PpHHcAAAAASUVORK5CYII="'
				+' style="position:relative;top:15px" onclick="this.parentNode.parentNode.removeChild(this.parentNode)" id="closediv" />'
				dv.setAttribute("closeful","1")
			}
		}catch(ex){log(ex)}
	}

		if (t.parentNode.parentNode)var igifr = t.parentNode.parentNode.id+'igifr';
		var p = e.target.parentNode;
		var cls;
		if(p && p.id){
			cls = p.id;
		
			if (cls.search(thmb)!=-1){
				var hrf = p.href;
				var newImg = imgz[p.id];
				var h = newImg.height;
				var w = newImg.width;
				min = 1
				if (w > e.clientX){
					w1 = e.clientX - min
					co = w1 / w
					h = co * h
					w = w1
				}
				
				if (h > e.clientY){
					h1 = e.clientY - min
					co = h1 / h
					w = co * w
					h = h1
				} 
	
				var divfix = document.createElement('DIV');
				divfix.setAttribute('style','border: 1px solid rgb(0, 0, 0); padding: 0pt; position: fixed; top: 0px; left: 0px; z-index: 100000;background-color: rgb(245, 245, 245);');
				divfix.setAttribute('id','preview_div');
				var imgindiv = "<img style='height:" + h + 'px;width:'+ w +"px' src='"+newImg.src+"'/>";
				
				divfix.innerHTML=imgindiv;
				pr = p.parentNode;
				if (GM_getValue("on3"))
					pr.parentNode.insertBefore(divfix,pr.nextSibling);
			}
		}
			
	}, false);
//end of mouseover

	var igg = /ig/;
	var imggg = /imgg/;
	window.addEventListener('click', function(e){
		var t = e.target;
		var idclk = t.id;
		
		if(t.id == 'collapse' && !e.button){
			var tblbd = document.getElementById('tblbd');
			var clps = document.getElementById('collapse');
			if(tblbd.style.display != "none"){
				tblbd.style.display = "none"
				clps.setAttribute('src','http://www.tunisia-sat.com/vb/images/styles/TSBB/buttons/collapse_tcat_collapsed.gif')
			}else
			{
				tblbd.style.display = "table-row-group"
				clps.setAttribute('src','http://www.tunisia-sat.com/vb/images/styles/TSBB/buttons/collapse_tcat.gif')
			}
		}

		if(t.id=='helpbtn' && !e.button){
			if (!document.getElementById('help')){
				document.body.insertBefore(helper,document.body.lastChild.nextSibling);
			}
			helper.style.display = "block"
		}
		if(t.id=="closethnx" && !e.button)remove('divforreput')
		
		if (t.id == "PrevImage"){
			t.blur()
			var hrf = t.parentNode.href
			t.src = LoadingImage
			loadPopup(hrf,t)
			centerPopup()
		}
		
		if (t.id == "hidePreview"){
			disablePopup()
		}
	
	},false);

	var offs = 372;
	window.addEventListener('mousedown', function(e) {
		if(e.button)return;
		x=0;y=0;x1=0;y1=0;ecx=0;ecy=0;ofx=0;ofy=0;
		var t=e.target;
		if(t.id && t.id == 'drag'){
			var x= e.clientX;
			var y= e.clientY;
			if(!txtb)return;
			var ofy = txtb.offsetTop;
			var ofx = window.innerWidth - txtb.offsetLeft-offs;
			frd=1;
			
			window.addEventListener('mousemove', function(e){
				if(t.id && t.id == 'drag' && frd==1){
					var x1 = ofx +( x - e.clientX);
					var y1 = ofy +( e.clientY - y);
					txtb.setAttribute('style','position: fixed; top:'+ y1 +'px; right:'+ (x1) +'px; z-index: 100005; opacity:0.7;')
				}
			},false);
			
		}
		
		if(t.id && t.id == 'drag2'){
			var x= e.clientX;
			var y= e.clientY;
			var ofy = document.getElementById('help').offsetTop;
			var ofx = window.innerWidth - document.getElementById('help').offsetLeft-694;
			frd2=1;
			
			window.addEventListener('mousemove', function(e) {
				if(t.id && t.id == 'drag2' && frd2==1){
					var x1 = ofx +( x - e.clientX);
					var y1 = ofy +( e.clientY - y);
					$id('tblbd').style.display = "none"
					$id('help').setAttribute('style','position: fixed; top:'+ y1 +'px; right:'+ (x1) +'px; z-index: 100001;opacity:0.7;')
				}
			},false);
		}
		
		if(t.id && t.id == 'drag3'){
			var x= e.clientX;
			var y= e.clientY;
			var wid = $id('divforreput').offsetWidth
			var ofy = getY($id('divforreput'))
			var ofx = window.innerWidth - document.getElementById('divforreput').offsetLeft-wid-13;
			frd3=1;
			
			window.addEventListener('mousemove', function(e) {
				if(t.id && t.id == 'drag3' && frd3==1){
					var x1 = ofx +( x - e.clientX);
					var y1 = ofy +( e.clientY - y);
					îd('divforreput').setAttribute('style','position:absolute;width:200px;top:'+y1+'px;right:'+x1+'px;background-color: rgb(245,245,245);opacity:0.90')
				}
			},false);
		}
	
		if(t.id && t.id == 'drag4'){
			var x= e.clientX;
			var y= e.clientY;
			var wid = $id('previewPopup').offsetWidth
			var ofy = getY($id('previewPopup'))
			var ofx = window.innerWidth - $id('previewPopup').offsetLeft-wid-13;
			$id('previewPopup').style.left = ""
			frd4=1;
			
			window.addEventListener('mousemove', function(e) {
				if(t.id && t.id == 'drag4' && frd4==1){
					var x1 = ofx +( x - e.clientX);
					var y1 = ofy +( e.clientY - y);
					$id('previewPopup').style.top = y1 + "px"
					$id('previewPopup').style.right = x1 + "px"
				}
			},false);
		}
	},false);

	window.addEventListener('mouseup', function(e) {
		
		var t=e.target;
		if(t.id && t.id == 'drag'){
			frd = 0;
			var div1 = txtb;
			window.removeEventListener('mousemove',function(){},false);
			window.removeEventListener('mousedown',function(){},false);
			if(txtb)
				txtb.style.opacity = 1
			frstmv=0;
		}
		
		if(t.id && t.id == 'drag2'){
			frd2 = 0;
			var div1 = document.getElementById('help');
			window.removeEventListener('mousemove',function(){},false);
			window.removeEventListener('mousedown',function(){},false);
			if(document.getElementById('help'))
				document.getElementById('help').style.opacity = 1
			if(document.getElementById('collapse').src != 'http://www.tunisia-sat.com/vb/images/styles/TSBB/buttons/collapse_tcat_collapsed.gif')
			document.getElementById('tblbd').style.display = "table-row-group";
			frstmv2=0;
		}
	
		if(t.id && t.id == 'drag3'){
			frd3 = 0;
			window.removeEventListener('mousemove',function(){},false);
			window.removeEventListener('mousedown',function(){},false);
			frstmv3=0;
		}
	
		if(t.id && t.id == 'drag4'){
			frd4 = 0;
			window.removeEventListener('mousemove',function(){},false);
			window.removeEventListener('mousedown',function(){},false);
			frstmv4=0;
		}
	
		if(t.id && t.id == 'neresize'){
			frd5 = 0;
			window.removeEventListener('mousemove',function(){},false);
			window.removeEventListener('mousedown',function(){},false);
			frstmv5=0;
		}
		
		if(t.id == "insimg"){
			setTimeout(ins_img,100)
		}
		
	},false);
	
	window.addEventListener('mouseout', function(e) {
		var t = e.target;
		if (document.getElementById('preview_div')){
			var prev = document.getElementById('preview_div');
			var par = prev.parentNode;
			par.removeChild(prev);
		}
		
		if (t.id.search(b1)!=-1) {
			document.getElementById(t.id) ? document.getElementById(t.id).setAttribute('height','50'):false;
		}
		
		if (t.id.search(b)!=-1) {
			document.getElementById(t.id+'ig') ? document.getElementById(t.id+'ig').setAttribute('style','display:none;'):false;
		}
	},false);

	window.addEventListener('scroll',function(e){
		if(txtb.style.display == "none" && shown==null)return;
		if(txtb.style.display != "none" && shown!=0) {txtb.style.display = "none"; shown =1}
		if(helper.style.display != "none"){helper.style.display = "none";shown = 2}
		clearTimeout(display)
		display = 0;
		display = setTimeout(showback,500)
	},false);
	
	try{
		inLoad();
	}catch(ex){}