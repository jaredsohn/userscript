// 
//
// IF YOU SEE THIS, THEN YOU NEED TO INSTALL GREASEMONKEY FOR FIREFOX OR FOLLOW THE INSTALLATION INSTRUCTIONS FOR OPERA, SAFARI, CHROME AND IE (if you're still stupid enough to use it)
// 
//
// ==UserScript==
// @name          WBB:SC - Warez-BB: SuperCharged
// @namespace     http://www.warez-bb.org/
// @description   Everything you've ever dreamed of for Warez-BB. Release 21.
// @include       http://warez-bb.org/*
// @include       http://www.warez-bb.org/*
// ==/UserScript== 

var currentVersion = 21;


function escape2(text){
	text = text.replace(/(\+)/g, "LOLOLOLOLOLOLOLOLOLOL");
	text = escape(text);
	text = text.replace(/(LOLOLOLOLOLOLOLOLOLOL)/g, "%2B");
	return text;
}

/*
 * jQuery 1.2.6 modded by Darkimmortal to support ISO-8859-1 AJAX.
 * I'll upgrade it to 1.3.1 sometime; no rush though.
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
for(var j in a)if(a[j]&&a[j].constructor==Array)jQuery.each(a[j],function(){s.push(escape2(j)+"="+escape2(this));});else
s.push(escape2(j)+"="+escape2(jQuery.isFunction(a[j])?a[j]():a[j]));return s.join("&").replace(/%20/g,"+");}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")this.style.display="block";elem.remove();}}).end();},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none";}).end();},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]();});},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback);},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback);},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback);},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback);},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback);},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)return opt.complete.call(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow;}}if(opt.overflow!=null)this.style.overflow="hidden";opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit;}if(parts[1])end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit);}else
e.custom(start,val,"");}});return true;});},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx";}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.call(this);}});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1);}});if(!gotoEnd)this.dequeue();return this;}});var queue=function(elem,type,array){if(elem){type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",jQuery.makeArray(array));}return q;};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].call(this);});};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.call(this);};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={};}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block";},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd);}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null;}},13);}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=now();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block";}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p]);}if(done)this.options.complete.call(this.elem);return false;}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();}return true;}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now;},scrollTop:function(fx){fx.elem.scrollTop=fx.now;},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now);},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit;}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop);}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent;}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode;}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));}results={top:top,left:left};}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true));}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0;}return results;};jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}return results;},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return jQuery(offsetParent);}});jQuery.each(['Left','Top'],function(i,name){var method='scroll'+name;jQuery.fn[method]=function(val){if(!this[0])return;return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val;}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method];};});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br);};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0);};});})();

$.ajaxSetup({ scriptCharset: "ISO-8859-1" , contentType: "application/x-www-form-urlencoded; charset=iso-8859-1"});

//swfupload v2.2.0 beta 3
var SWFUpload;if(SWFUpload==undefined){SWFUpload=function(settings){this.initSWFUpload(settings)}}SWFUpload.prototype.initSWFUpload=function(settings){try{this.customSettings={};this.settings=settings;this.eventQueue=[];this.movieName="SWFUpload_"+SWFUpload.movieCount++;this.movieElement=null;SWFUpload.instances[this.movieName]=this;this.initSettings();this.loadFlash();this.displayDebugInfo()}catch(ex){delete SWFUpload.instances[this.movieName];throw ex;}};SWFUpload.instances={};SWFUpload.movieCount=0;SWFUpload.version="2.2.0 Beta 3";SWFUpload.QUEUE_ERROR={QUEUE_LIMIT_EXCEEDED:-100,FILE_EXCEEDS_SIZE_LIMIT:-110,ZERO_BYTE_FILE:-120,INVALID_FILETYPE:-130};SWFUpload.UPLOAD_ERROR={HTTP_ERROR:-200,MISSING_UPLOAD_URL:-210,IO_ERROR:-220,SECURITY_ERROR:-230,UPLOAD_LIMIT_EXCEEDED:-240,UPLOAD_FAILED:-250,SPECIFIED_FILE_ID_NOT_FOUND:-260,FILE_VALIDATION_FAILED:-270,FILE_CANCELLED:-280,UPLOAD_STOPPED:-290};SWFUpload.FILE_STATUS={QUEUED:-1,IN_PROGRESS:-2,ERROR:-3,COMPLETE:-4,CANCELLED:-5};SWFUpload.BUTTON_ACTION={SELECT_FILE:-100,SELECT_FILES:-110,START_UPLOAD:-120};SWFUpload.CURSOR={ARROW:-1,HAND:-2};SWFUpload.WINDOW_MODE={WINDOW:"window",TRANSPARENT:"transparent",OPAQUE:"opaque"};SWFUpload.prototype.initSettings=function(){this.ensureDefault=function(settingName,defaultValue){this.settings[settingName]=(this.settings[settingName]==undefined)?defaultValue:this.settings[settingName]};this.ensureDefault("upload_url","");this.ensureDefault("file_post_name","Filedata");this.ensureDefault("post_params",{});this.ensureDefault("use_query_string",false);this.ensureDefault("requeue_on_error",false);this.ensureDefault("http_success",[]);this.ensureDefault("file_types","*.*");this.ensureDefault("file_types_description","All Files");this.ensureDefault("file_size_limit",0);this.ensureDefault("file_upload_limit",0);this.ensureDefault("file_queue_limit",0);this.ensureDefault("flash_url","swfupload.swf");this.ensureDefault("prevent_swf_caching",false);this.ensureDefault("button_image_url","");this.ensureDefault("button_width",1);this.ensureDefault("button_height",1);this.ensureDefault("button_text","");this.ensureDefault("button_text_style","color: #000000; font-size: 16pt;");this.ensureDefault("button_text_top_padding",0);this.ensureDefault("button_text_left_padding",0);this.ensureDefault("button_action",SWFUpload.BUTTON_ACTION.SELECT_FILES);this.ensureDefault("button_disabled",false);this.ensureDefault("button_placeholder_id",null);this.ensureDefault("button_cursor",SWFUpload.CURSOR.ARROW);this.ensureDefault("button_window_mode",SWFUpload.WINDOW_MODE.WINDOW);this.ensureDefault("debug",false);this.settings.debug_enabled=this.settings.debug;this.settings.return_upload_start_handler=this.returnUploadStart;this.ensureDefault("swfupload_loaded_handler",null);this.ensureDefault("file_dialog_start_handler",null);this.ensureDefault("file_queued_handler",null);this.ensureDefault("file_queue_error_handler",null);this.ensureDefault("file_dialog_complete_handler",null);this.ensureDefault("upload_start_handler",null);this.ensureDefault("upload_progress_handler",null);this.ensureDefault("upload_error_handler",null);this.ensureDefault("upload_success_handler",null);this.ensureDefault("upload_complete_handler",null);this.ensureDefault("debug_handler",this.debugMessage);this.ensureDefault("custom_settings",{});this.customSettings=this.settings.custom_settings;if(this.settings.prevent_swf_caching&&false){this.settings.flash_url=this.settings.flash_url;}delete this.ensureDefault};SWFUpload.prototype.loadFlash=function(){if(this.settings.button_placeholder_id!==""){this.replaceWithFlash()}else{this.appendFlash()}};SWFUpload.prototype.appendFlash=function(){var targetElement,container;if(document.getElementById(this.movieName)!==null){throw"ID "+this.movieName+" is already in use. The Flash Object could not be added";}targetElement=document.getElementsByTagName("body")[0];if(targetElement==undefined){throw"Could not find the 'body' element.";}container=document.createElement("div");container.style.width="1px";container.style.height="1px";container.style.overflow="hidden";targetElement.appendChild(container);container.innerHTML=this.getFlashHTML();if(window[this.movieName]==undefined){window[this.movieName]=this.getMovieElement()}};SWFUpload.prototype.replaceWithFlash=function(){var targetElement,tempParent;if(document.getElementById(this.movieName)!==null){throw"ID "+this.movieName+" is already in use. The Flash Object could not be added";}targetElement=document.getElementById(this.settings.button_placeholder_id);if(targetElement==undefined){throw"Could not find the placeholder element.";}tempParent=document.createElement("div");tempParent.innerHTML=this.getFlashHTML();targetElement.parentNode.replaceChild(tempParent.firstChild,targetElement);if(window[this.movieName]==undefined){window[this.movieName]=this.getMovieElement()}};SWFUpload.prototype.getFlashHTML=function(){return['<object id="',this.movieName,'" type="application/x-shockwave-flash" data="',this.settings.flash_url,'" width="',this.settings.button_width,'" height="',this.settings.button_height,'" class="swfupload">','<param name="wmode" value="',this.settings.button_window_mode,'" />','<param name="movie" value="',this.settings.flash_url,'" />','<param name="quality" value="high" />','<param name="menu" value="false" />','<param name="allowScriptAccess" value="always" />','<param name="flashvars" value="'+this.getFlashVars()+'" />','</object>'].join("")};SWFUpload.prototype.getFlashVars=function(){var paramString=this.buildParamString();var httpSuccessString=this.settings.http_success.join(",");return["movieName=",encodeURIComponent(this.movieName),"&amp;uploadURL=",encodeURIComponent(this.settings.upload_url),"&amp;useQueryString=",encodeURIComponent(this.settings.use_query_string),"&amp;requeueOnError=",encodeURIComponent(this.settings.requeue_on_error),"&amp;httpSuccess=",encodeURIComponent(httpSuccessString),"&amp;params=",encodeURIComponent(paramString),"&amp;filePostName=",encodeURIComponent(this.settings.file_post_name),"&amp;fileTypes=",encodeURIComponent(this.settings.file_types),"&amp;fileTypesDescription=",encodeURIComponent(this.settings.file_types_description),"&amp;fileSizeLimit=",encodeURIComponent(this.settings.file_size_limit),"&amp;fileUploadLimit=",encodeURIComponent(this.settings.file_upload_limit),"&amp;fileQueueLimit=",encodeURIComponent(this.settings.file_queue_limit),"&amp;debugEnabled=",encodeURIComponent(this.settings.debug_enabled),"&amp;buttonImageURL=",encodeURIComponent(this.settings.button_image_url),"&amp;buttonWidth=",encodeURIComponent(this.settings.button_width),"&amp;buttonHeight=",encodeURIComponent(this.settings.button_height),"&amp;buttonText=",encodeURIComponent(this.settings.button_text),"&amp;buttonTextTopPadding=",encodeURIComponent(this.settings.button_text_top_padding),"&amp;buttonTextLeftPadding=",encodeURIComponent(this.settings.button_text_left_padding),"&amp;buttonTextStyle=",encodeURIComponent(this.settings.button_text_style),"&amp;buttonAction=",encodeURIComponent(this.settings.button_action),"&amp;buttonDisabled=",encodeURIComponent(this.settings.button_disabled),"&amp;buttonCursor=",encodeURIComponent(this.settings.button_cursor)].join("")};SWFUpload.prototype.getMovieElement=function(){if(this.movieElement==undefined){this.movieElement=document.getElementById(this.movieName)}if(this.movieElement===null){throw"Could not find Flash element";}return this.movieElement};SWFUpload.prototype.buildParamString=function(){var postParams=this.settings.post_params;var paramStringPairs=[];if(typeof(postParams)==="object"){for(var name in postParams){if(postParams.hasOwnProperty(name)){paramStringPairs.push(encodeURIComponent(name.toString())+"="+encodeURIComponent(postParams[name].toString()))}}}return paramStringPairs.join("&amp;")};SWFUpload.prototype.destroy=function(){try{this.cancelUpload(null,false);var movieElement=null;movieElement=this.getMovieElement();if(movieElement){for(var i in movieElement){try{if(typeof(movieElement[i])==="function"){movieElement[i]=null}}catch(ex1){}}try{movieElement.parentNode.removeChild(movieElement)}catch(ex){}}window[this.movieName]=null;SWFUpload.instances[this.movieName]=null;delete SWFUpload.instances[this.movieName];this.movieElement=null;this.settings=null;this.customSettings=null;this.eventQueue=null;this.movieName=null;return true}catch(ex1){return false}};SWFUpload.prototype.displayDebugInfo=function(){this.debug(["---SWFUpload Instance Info---\n","Version: ",SWFUpload.version,"\n","Movie Name: ",this.movieName,"\n","Settings:\n","\t","upload_url:               ",this.settings.upload_url,"\n","\t","flash_url:                ",this.settings.flash_url,"\n","\t","use_query_string:         ",this.settings.use_query_string.toString(),"\n","\t","requeue_on_error:         ",this.settings.requeue_on_error.toString(),"\n","\t","http_success:             ",this.settings.http_success.join(", "),"\n","\t","file_post_name:           ",this.settings.file_post_name,"\n","\t","post_params:              ",this.settings.post_params.toString(),"\n","\t","file_types:               ",this.settings.file_types,"\n","\t","file_types_description:   ",this.settings.file_types_description,"\n","\t","file_size_limit:          ",this.settings.file_size_limit,"\n","\t","file_upload_limit:        ",this.settings.file_upload_limit,"\n","\t","file_queue_limit:         ",this.settings.file_queue_limit,"\n","\t","debug:                    ",this.settings.debug.toString(),"\n","\t","prevent_swf_caching:      ",this.settings.prevent_swf_caching.toString(),"\n","\t","button_placeholder_id:    ",this.settings.button_placeholder_id.toString(),"\n","\t","button_image_url:         ",this.settings.button_image_url.toString(),"\n","\t","button_width:             ",this.settings.button_width.toString(),"\n","\t","button_height:            ",this.settings.button_height.toString(),"\n","\t","button_text:              ",this.settings.button_text.toString(),"\n","\t","button_text_style:        ",this.settings.button_text_style.toString(),"\n","\t","button_text_top_padding:  ",this.settings.button_text_top_padding.toString(),"\n","\t","button_text_left_padding: ",this.settings.button_text_left_padding.toString(),"\n","\t","button_action:            ",this.settings.button_action.toString(),"\n","\t","button_disabled:          ",this.settings.button_disabled.toString(),"\n","\t","custom_settings:          ",this.settings.custom_settings.toString(),"\n","Event Handlers:\n","\t","swfupload_loaded_handler assigned:  ",(typeof this.settings.swfupload_loaded_handler==="function").toString(),"\n","\t","file_dialog_start_handler assigned: ",(typeof this.settings.file_dialog_start_handler==="function").toString(),"\n","\t","file_queued_handler assigned:       ",(typeof this.settings.file_queued_handler==="function").toString(),"\n","\t","file_queue_error_handler assigned:  ",(typeof this.settings.file_queue_error_handler==="function").toString(),"\n","\t","upload_start_handler assigned:      ",(typeof this.settings.upload_start_handler==="function").toString(),"\n","\t","upload_progress_handler assigned:   ",(typeof this.settings.upload_progress_handler==="function").toString(),"\n","\t","upload_error_handler assigned:      ",(typeof this.settings.upload_error_handler==="function").toString(),"\n","\t","upload_success_handler assigned:    ",(typeof this.settings.upload_success_handler==="function").toString(),"\n","\t","upload_complete_handler assigned:   ",(typeof this.settings.upload_complete_handler==="function").toString(),"\n","\t","debug_handler assigned:             ",(typeof this.settings.debug_handler==="function").toString(),"\n"].join(""))};SWFUpload.prototype.addSetting=function(name,value,default_value){if(value==undefined){return(this.settings[name]=default_value)}else{return(this.settings[name]=value)}};SWFUpload.prototype.getSetting=function(name){if(this.settings[name]!=undefined){return this.settings[name]}return""};SWFUpload.prototype.callFlash=function(functionName,argumentArray){argumentArray=argumentArray||[];var movieElement=this.getMovieElement();var returnValue,returnString;try{returnString=movieElement.CallFunction('<invoke name="'+functionName+'" returntype="javascript">'+__flash__argumentsToXML(argumentArray,0)+'</invoke>');returnValue=eval(returnString)}catch(ex){throw"Call to "+functionName+" failed";}if(returnValue!=undefined&&typeof returnValue.post==="object"){returnValue=this.unescapeFilePostParams(returnValue)}return returnValue};SWFUpload.prototype.selectFile=function(){this.callFlash("SelectFile")};SWFUpload.prototype.selectFiles=function(){this.callFlash("SelectFiles")};SWFUpload.prototype.startUpload=function(fileID){this.callFlash("StartUpload",[fileID])};SWFUpload.prototype.cancelUpload=function(fileID,triggerErrorEvent){if(triggerErrorEvent!==false){triggerErrorEvent=true}this.callFlash("CancelUpload",[fileID,triggerErrorEvent])};SWFUpload.prototype.stopUpload=function(){this.callFlash("StopUpload")};SWFUpload.prototype.getStats=function(){return this.callFlash("GetStats")};SWFUpload.prototype.setStats=function(statsObject){this.callFlash("SetStats",[statsObject])};SWFUpload.prototype.getFile=function(fileID){if(typeof(fileID)==="number"){return this.callFlash("GetFileByIndex",[fileID])}else{return this.callFlash("GetFile",[fileID])}};SWFUpload.prototype.addFileParam=function(fileID,name,value){return this.callFlash("AddFileParam",[fileID,name,value])};SWFUpload.prototype.removeFileParam=function(fileID,name){this.callFlash("RemoveFileParam",[fileID,name])};SWFUpload.prototype.setUploadURL=function(url){this.settings.upload_url=url.toString();this.callFlash("SetUploadURL",[url])};SWFUpload.prototype.setPostParams=function(paramsObject){this.settings.post_params=paramsObject;this.callFlash("SetPostParams",[paramsObject])};SWFUpload.prototype.addPostParam=function(name,value){this.settings.post_params[name]=value;this.callFlash("SetPostParams",[this.settings.post_params])};SWFUpload.prototype.removePostParam=function(name){delete this.settings.post_params[name];this.callFlash("SetPostParams",[this.settings.post_params])};SWFUpload.prototype.setFileTypes=function(types,description){this.settings.file_types=types;this.settings.file_types_description=description;this.callFlash("SetFileTypes",[types,description])};SWFUpload.prototype.setFileSizeLimit=function(fileSizeLimit){this.settings.file_size_limit=fileSizeLimit;this.callFlash("SetFileSizeLimit",[fileSizeLimit])};SWFUpload.prototype.setFileUploadLimit=function(fileUploadLimit){this.settings.file_upload_limit=fileUploadLimit;this.callFlash("SetFileUploadLimit",[fileUploadLimit])};SWFUpload.prototype.setFileQueueLimit=function(fileQueueLimit){this.settings.file_queue_limit=fileQueueLimit;this.callFlash("SetFileQueueLimit",[fileQueueLimit])};SWFUpload.prototype.setFilePostName=function(filePostName){this.settings.file_post_name=filePostName;this.callFlash("SetFilePostName",[filePostName])};SWFUpload.prototype.setUseQueryString=function(useQueryString){this.settings.use_query_string=useQueryString;this.callFlash("SetUseQueryString",[useQueryString])};SWFUpload.prototype.setRequeueOnError=function(requeueOnError){this.settings.requeue_on_error=requeueOnError;this.callFlash("SetRequeueOnError",[requeueOnError])};SWFUpload.prototype.setHTTPSuccess=function(http_status_codes){if(typeof http_status_codes==="string"){http_status_codes=http_status_codes.replace(" ","").split(",")}this.settings.http_success=http_status_codes;this.callFlash("SetHTTPSuccess",[http_status_codes])};SWFUpload.prototype.setDebugEnabled=function(debugEnabled){this.settings.debug_enabled=debugEnabled;this.callFlash("SetDebugEnabled",[debugEnabled])};SWFUpload.prototype.setButtonImageURL=function(buttonImageURL){if(buttonImageURL==undefined){buttonImageURL=""}this.settings.button_image_url=buttonImageURL;this.callFlash("SetButtonImageURL",[buttonImageURL])};SWFUpload.prototype.setButtonDimensions=function(width,height){this.settings.button_width=width;this.settings.button_height=height;var movie=this.getMovieElement();if(movie!=undefined){movie.style.width=width+"px";movie.style.height=height+"px"}this.callFlash("SetButtonDimensions",[width,height])};SWFUpload.prototype.setButtonText=function(html){this.settings.button_text=html;this.callFlash("SetButtonText",[html])};SWFUpload.prototype.setButtonTextPadding=function(left,top){this.settings.button_text_top_padding=top;this.settings.button_text_left_padding=left;this.callFlash("SetButtonTextPadding",[left,top])};SWFUpload.prototype.setButtonTextStyle=function(css){this.settings.button_text_style=css;this.callFlash("SetButtonTextStyle",[css])};SWFUpload.prototype.setButtonDisabled=function(isDisabled){this.settings.button_disabled=isDisabled;this.callFlash("SetButtonDisabled",[isDisabled])};SWFUpload.prototype.setButtonAction=function(buttonAction){this.settings.button_action=buttonAction;this.callFlash("SetButtonAction",[buttonAction])};SWFUpload.prototype.setButtonCursor=function(cursor){this.settings.button_cursor=cursor;this.callFlash("SetButtonCursor",[cursor])};SWFUpload.prototype.queueEvent=function(handlerName,argumentArray){if(argumentArray==undefined){argumentArray=[]}else if(!(argumentArray instanceof Array)){argumentArray=[argumentArray]}var self=this;if(typeof this.settings[handlerName]==="function"){this.eventQueue.push(function(){this.settings[handlerName].apply(this,argumentArray)});setTimeout(function(){self.executeNextEvent()},0)}else if(this.settings[handlerName]!==null){throw"Event handler "+handlerName+" is unknown or is not a function";}};SWFUpload.prototype.executeNextEvent=function(){var f=this.eventQueue?this.eventQueue.shift():null;if(typeof(f)==="function"){f.apply(this)}};SWFUpload.prototype.unescapeFilePostParams=function(file){var reg=/[$]([0-9a-f]{4})/i;var unescapedPost={};var uk;if(file!=undefined){for(var k in file.post){if(file.post.hasOwnProperty(k)){uk=k;var match;while((match=reg.exec(uk))!==null){uk=uk.replace(match[0],String.fromCharCode(parseInt("0x"+match[1],16)))}unescapedPost[uk]=file.post[k]}}file.post=unescapedPost}return file};SWFUpload.prototype.flashReady=function(){var movieElement=this.getMovieElement();if(typeof(movieElement.CallFunction)==="unknown"){this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");for(var key in movieElement){try{if(typeof(movieElement[key])==="function"){movieElement[key]=null}}catch(ex){}}}this.queueEvent("swfupload_loaded_handler")};SWFUpload.prototype.fileDialogStart=function(){this.queueEvent("file_dialog_start_handler")};SWFUpload.prototype.fileQueued=function(file){file=this.unescapeFilePostParams(file);this.queueEvent("file_queued_handler",file)};SWFUpload.prototype.fileQueueError=function(file,errorCode,message){file=this.unescapeFilePostParams(file);this.queueEvent("file_queue_error_handler",[file,errorCode,message])};SWFUpload.prototype.fileDialogComplete=function(numFilesSelected,numFilesQueued){this.queueEvent("file_dialog_complete_handler",[numFilesSelected,numFilesQueued])};SWFUpload.prototype.uploadStart=function(file){file=this.unescapeFilePostParams(file);this.queueEvent("return_upload_start_handler",file)};SWFUpload.prototype.returnUploadStart=function(file){var returnValue;if(typeof this.settings.upload_start_handler==="function"){file=this.unescapeFilePostParams(file);returnValue=this.settings.upload_start_handler.call(this,file)}else if(this.settings.upload_start_handler!=undefined){throw"upload_start_handler must be a function";}if(returnValue===undefined){returnValue=true}returnValue=!!returnValue;this.callFlash("ReturnUploadStart",[returnValue])};SWFUpload.prototype.uploadProgress=function(file,bytesComplete,bytesTotal){file=this.unescapeFilePostParams(file);this.queueEvent("upload_progress_handler",[file,bytesComplete,bytesTotal])};SWFUpload.prototype.uploadError=function(file,errorCode,message){file=this.unescapeFilePostParams(file);this.queueEvent("upload_error_handler",[file,errorCode,message])};SWFUpload.prototype.uploadSuccess=function(file,serverData){file=this.unescapeFilePostParams(file);this.queueEvent("upload_success_handler",[file,serverData])};SWFUpload.prototype.uploadComplete=function(file){file=this.unescapeFilePostParams(file);this.queueEvent("upload_complete_handler",file)};SWFUpload.prototype.debug=function(message){this.queueEvent("debug_handler",message)};SWFUpload.prototype.debugMessage=function(message){if(this.settings.debug){var exceptionMessage,exceptionValues=[];if(typeof message==="object"&&typeof message.name==="string"&&typeof message.message==="string"){for(var key in message){if(message.hasOwnProperty(key)){exceptionValues.push(key+": "+message[key])}}exceptionMessage=exceptionValues.join("\n")||"";exceptionValues=exceptionMessage.split("\n");exceptionMessage="EXCEPTION: "+exceptionValues.join("\nEXCEPTION: ");SWFUpload.Console.writeLine(exceptionMessage)}else{SWFUpload.Console.writeLine(message)}}};SWFUpload.Console={};SWFUpload.Console.writeLine=function(message){var console,documentForm;try{console=document.getElementById("SWFUpload_Console");if(!console){documentForm=document.createElement("form");document.getElementsByTagName("body")[0].appendChild(documentForm);console=document.createElement("textarea");console.id="SWFUpload_Console";console.style.fontFamily="monospace";console.setAttribute("wrap","off");console.wrap="off";console.style.overflow="auto";console.style.width="700px";console.style.height="350px";console.style.margin="5px";documentForm.appendChild(console)}console.value+=message+"\n";console.scrollTop=console.scrollHeight-console.clientHeight}catch(ex){alert("Exception: "+ex.name+" Message: "+ex.message)}};

var warezbbimgkkscript = "dmFyIG9uU3dmdUxvYWQ9ZnVuY3Rpb24oKXskKCJhW3RpdGxlPSdCbG9jayB0aGlzIG9iamVjdCB3aXRoIEFkYmxvY2sgUGx1cyddIikucmVtb3ZlKCl9O3ZhciBvblVwbG9hZFByb2dyZXNzPWZ1bmN0aW9uKGZpbGUsY29tcGxldGUsdG90YWwpeyQoImlucHV0LmhlbHBsaW5lW25hbWU9J2hlbHBib3gnXSIpLnZhbCgiVXBsb2FkaW5nIHRvIGltZ2trLmNvbSA6OiAiK3BhcnNlSW50KGNvbXBsZXRlL3RvdGFsKjEwMCkrIiUgLSAiK2NvbXBsZXRlKyIgLyAiK3RvdGFsKyIgYnl0ZXMiKX07dmFyIG9uRmlsZURpYWxvZ0NvbXBsZXRlPWZ1bmN0aW9uKHNlbGVjdGVkLHF1ZXVlZCx0b3RhbFF1ZXVlZCl7dGhpcy5zdGFydFVwbG9hZCgpfTt2YXIgb25VcGxvYWRTdWNjZXNzPWZ1bmN0aW9uKGZpbGUsZGF0YSl7JCgiaW5wdXQuaGVscGxpbmVbbmFtZT0naGVscGJveCddIikudmFsKCJVcGxvYWRpbmcgY29tcGxldGUhIC0gU2VydmljZSBwcm92aWRlZCBieSBpbWdray5jb20gKENyZWF0ZWQgYnkgRGFya2ltbW9ydGFsKSIpO21vekluc2VydCgkKCIjbWVzc2FnZSIpLmdldCgwKSwiW2ltZ10iK2RhdGErIlsvaW1nXSIsIiIpfTt2YXIgb25VcGxvYWRFcnJvcj1mdW5jdGlvbihmaWxlLGNvZGUsbWVzc2FnZSl7YWxlcnQoIlVwbG9hZCBlcnJvciAjIitjb2RlKyI6XHJcblxyXG4iK21lc3NhZ2UpfTt2YXIgc3dmdVNldHRpbmdzPXt1cGxvYWRfdXJsOiJodHRwOi8vaW1na2suY29tL2FwaS91cGxvYWQucGhwIixmbGFzaF91cmw6Imh0dHA6Ly9pbWdray5jb20vc3dmdXBsb2FkLnN3ZiIsZmlsZV9zaXplX2xpbWl0OiIyIE1CIixmaWxlX3Bvc3RfbmFtZToiZmlsZSIsYnV0dG9uX3BsYWNlaG9sZGVyX2lkOiJ1cGxvYWRidXR0b24iLGJ1dHRvbl90ZXh0OiI8YSBjbGFzcz0ndXBsb2FkJz5VcGxvYWQgSW1hZ2U8L2E+IixidXR0b25fdGV4dF9zdHlsZToiLnVwbG9hZCB7IGNvbG9yOiAjNzA5RkQ1OyBmb250LXNpemU6IDExcHg7IGZvbnQtZmFtaWx5OiBWZXJkYW5hOyB9IixidXR0b25fY3Vyc29yOlNXRlVwbG9hZC5DVVJTT1IuSEFORCxidXR0b25fd2lkdGg6ODUsYnV0dG9uX2hlaWdodDoxOCxidXR0b25fd2luZG93X21vZGU6U1dGVXBsb2FkLldJTkRPV19NT0RFLlRSQU5TUEFSRU5ULHN3ZnVwbG9hZF9sb2FkZWRfaGFuZGxlcjpvblN3ZnVMb2FkLHVwbG9hZF9wcm9ncmVzc19oYW5kbGVyOm9uVXBsb2FkUHJvZ3Jlc3MsZmlsZV9kaWFsb2dfY29tcGxldGVfaGFuZGxlcjpvbkZpbGVEaWFsb2dDb21wbGV0ZSx1cGxvYWRfc3VjY2Vzc19oYW5kbGVyOm9uVXBsb2FkU3VjY2Vzcyx1cGxvYWRfZXJyb3JfaGFuZGxlcjpvblVwbG9hZEVycm9yLGZpbGVfdHlwZXM6IioucG5nOyouanBnOyouZ2lmOyouYm1wOyoudGdhOyouaWNvIixmaWxlX3R5cGVzX2Rlc2NyaXB0aW9uOiJJbWFnZSBmaWxlcyIsZmlsZV9xdWV1ZV9saW1pdDoxfTt2YXIgc3dmdT1uZXcgU1dGVXBsb2FkKHN3ZnVTZXR0aW5ncyk7";

var inlineReportHTML = "PHRyPjx0ZCBjbGFzcz0icm93MSIgdmFsaWduPSJ0b3AiIGNvbHNwYW49IjIiPg0KPGZvcm0gbWV0aG9kPSJwb3N0IiBhY3Rpb249Ii4vcmVwb3J0LnBocD9wPTE0NzkyODQ4Ij4NCjx0YWJsZSBjbGFzcz0iZm9ydW1saW5lIiB3aWR0aD0iMTAwJSIgY2VsbHNwYWNpbmc9IjEiIGNlbGxwYWRkaW5nPSIzIiBib3JkZXI9IjAiIHN0eWxlPSJkaXNwbGF5OiBub25lIj4NCgk8dHI+DQoJCTx0aCBjbGFzcz0iY2F0SGVhZCIgY29sc3Bhbj0iMyI+UmVwb3J0IHBvc3QgOiBOZWVkIGEgaGVscCB3aXRoIGphdmEuPC90ZD4NCgk8L3RyPg0KCTx0cj4NCgkJPHRkIGNsYXNzPSJyb3cxIiB3aWR0aD0iMTUwIiBhbGlnbj0iY2VudGVyIj4NCgkJCTxzcGFuIGNsYXNzPSJleHBsYWludGl0bGUiPkNvbW1lbnRzPC9zcGFuPg0KDQoJCTwvdGQ+DQoJCTx0ZCBjbGFzcz0icm93MiIgYWxpZ249ImNlbnRlciI+DQoJCQk8dGV4dGFyZWEgcm93cz0iMTAiIGNvbHM9IjgwIiB3cmFwPSJ2aXJ0dWFsIiB0YWJpbmRleD0iMSIgY2xhc3M9InBvc3QiIG5hbWU9InJlcG9ydF9jb21tZW50cyI+PC90ZXh0YXJlYT4NCgkJPC90ZD4NCgkJPHRkIGNsYXNzPSJyb3cyIiB3aWR0aD0iMjUwIiBhbGlnbj0iY2VudGVyIiB2YWxpZ249Im1pZGRsZSI+DQoJCQk8dGFibGUgd2lkdGg9IjEwMCUiIGNlbGxzcGFjaW5nPSIxIiBjZWxscGFkZGluZz0iMiIgYm9yZGVyPSIwIj4NCgkJCQk8dHI+DQoJCQkJCTx0ZCBhbGlnbj0iY2VudGVyIiBub3dyYXA9Im5vd3JhcCI+DQoNCgkJCQkJCTxzcGFuIGNsYXNzPSJleHBsYWludGl0bGUiPlJlcG9ydCBSZWFzb25zPC9zcGFuPg0KCQkJCQk8L3RkPg0KCQkJCTwvdHI+DQoJCQkJPHRyPg0KCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJPHRhYmxlIHdpZHRoPSIxMDAlIiBjZWxsc3BhY2luZz0iMSIgY2VsbHBhZGRpbmc9IjEiIGJvcmRlcj0iMCI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCg0KCQkJCQkJCQkJPGlucHV0IHR5cGU9ImNoZWNrYm94IiBuYW1lPSJyZXBvcnRfcmVhc29uc1tdIiB2YWx1ZT0iOSIgIC8+DQoJCQkJCQkJCTwvdGQ+DQoJCQkJCQkJCTx0ZCBhbGlnbj0ibGVmdCI+DQoJCQkJCQkJCQk8c3BhbiBjbGFzcz0iZ2VubWVkIj48Yj5PdGhlciAoKik8L2I+PC9zcGFuPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9ImdlbnNtYWxsIj48YnIgLz5FdmVyeXRoaW5nIGVsc2U8L3NwYW4+DQoJCQkJCQkJCTwvdGQ+DQoJCQkJCQkJPC90cj4NCgkJCQkJCQkJCQkJCQkJPHRyPg0KDQoJCQkJCQkJCTx0ZCBhbGlnbj0ibGVmdCIgdmFsaWduPSJ0b3AiIHdpZHRoPSIxMCI+DQoJCQkJCQkJCQk8aW5wdXQgdHlwZT0iY2hlY2tib3giIG5hbWU9InJlcG9ydF9yZWFzb25zW10iIHZhbHVlPSIxIiAgLz4NCgkJCQkJCQkJPC90ZD4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0Ij4NCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5tZWQiPjxiPldyb25nIGZvcnVtPC9iPjwvc3Bhbj4NCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5zbWFsbCI+PGJyIC8+VGhlIG1lc3NhZ2UgaGFzIGJlZW4gcG9zdGVkIGluIGEgd3JvbmcgZm9ydW08L3NwYW4+DQoJCQkJCQkJCTwvdGQ+DQoJCQkJCQkJPC90cj4NCg0KCQkJCQkJCQkJCQkJCQk8dHI+DQoJCQkJCQkJCTx0ZCBhbGlnbj0ibGVmdCIgdmFsaWduPSJ0b3AiIHdpZHRoPSIxMCI+DQoJCQkJCQkJCQk8aW5wdXQgdHlwZT0iY2hlY2tib3giIG5hbWU9InJlcG9ydF9yZWFzb25zW10iIHZhbHVlPSIyIiAgLz4NCgkJCQkJCQkJPC90ZD4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0Ij4NCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5tZWQiPjxiPkJhZCB3b3JkczwvYj48L3NwYW4+DQoJCQkJCQkJCQk8c3BhbiBjbGFzcz0iZ2Vuc21hbGwiPjxiciAvPlRoZSBwb3N0IGNvbnRhaW5zIGJhZCB3b3Jkczwvc3Bhbj4NCgkJCQkJCQkJPC90ZD4NCg0KCQkJCQkJCTwvdHI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCgkJCQkJCQkJCTxpbnB1dCB0eXBlPSJjaGVja2JveCIgbmFtZT0icmVwb3J0X3JlYXNvbnNbXSIgdmFsdWU9IjMiICAvPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9Imdlbm1lZCI+PGI+RG91YmxlIHBvc3Q8L2I+PC9zcGFuPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9ImdlbnNtYWxsIj48YnIgLz5Vc2VyIGhhcyBhbHJlYWR5IHBvc3RlZCB0aGUgc2FtZSBtZXNzYWdlIGJlZm9yZTwvc3Bhbj4NCg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCTwvdHI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCgkJCQkJCQkJCTxpbnB1dCB0eXBlPSJjaGVja2JveCIgbmFtZT0icmVwb3J0X3JlYXNvbnNbXSIgdmFsdWU9IjQiICAvPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9Imdlbm1lZCI+PGI+U3BhbTwvYj48L3NwYW4+DQoNCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5zbWFsbCI+PGJyIC8+VGhlIHBvc3QgY29udGFpbnMgc3BhbTwvc3Bhbj4NCgkJCQkJCQkJPC90ZD4NCgkJCQkJCQk8L3RyPg0KCQkJCQkJCQkJCQkJCQk8dHI+DQoJCQkJCQkJCTx0ZCBhbGlnbj0ibGVmdCIgdmFsaWduPSJ0b3AiIHdpZHRoPSIxMCI+DQoJCQkJCQkJCQk8aW5wdXQgdHlwZT0iY2hlY2tib3giIG5hbWU9InJlcG9ydF9yZWFzb25zW10iIHZhbHVlPSIxMSIgIC8+DQoJCQkJCQkJCTwvdGQ+DQoJCQkJCQkJCTx0ZCBhbGlnbj0ibGVmdCI+DQoNCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5tZWQiPjxiPkRlYWQgTGluazwvYj48L3NwYW4+DQoJCQkJCQkJCQk8c3BhbiBjbGFzcz0iZ2Vuc21hbGwiPjxiciAvPlRoZXJlIGlzIGEgZGVhZCBsaW5rIGluIHRoZSBwb3N0PC9zcGFuPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCTwvdHI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCgkJCQkJCQkJCTxpbnB1dCB0eXBlPSJjaGVja2JveCIgbmFtZT0icmVwb3J0X3JlYXNvbnNbXSIgdmFsdWU9IjEzIiAgLz4NCgkJCQkJCQkJPC90ZD4NCg0KCQkJCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9Imdlbm1lZCI+PGI+VW5jb2RlZCBMaW5rPC9iPjwvc3Bhbj4NCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5zbWFsbCI+PGJyIC8+TGlua3MgYXJlIHVuY29kZWQgaW4gdGhpcyBwb3N0PC9zcGFuPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCTwvdHI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCgkJCQkJCQkJCTxpbnB1dCB0eXBlPSJjaGVja2JveCIgbmFtZT0icmVwb3J0X3JlYXNvbnNbXSIgdmFsdWU9IjE0IiAgLz4NCg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9Imdlbm1lZCI+PGI+TmVlZCBUYWdzPC9iPjwvc3Bhbj4NCgkJCQkJCQkJCTxzcGFuIGNsYXNzPSJnZW5zbWFsbCI+PGJyIC8+VGhlIHRvcGljIHJlcXVpcmVzIHRhZ3MuPC9zcGFuPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCTwvdHI+DQoJCQkJCQkJCQkJCQkJCTx0cj4NCgkJCQkJCQkJPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgd2lkdGg9IjEwIj4NCg0KCQkJCQkJCQkJPGlucHV0IHR5cGU9ImNoZWNrYm94IiBuYW1lPSJyZXBvcnRfcmVhc29uc1tdIiB2YWx1ZT0iMTUiICAvPg0KCQkJCQkJCQk8L3RkPg0KCQkJCQkJCQk8dGQgYWxpZ249ImxlZnQiPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9Imdlbm1lZCI+PGI+SGlnaCBQcmlvcml0eSAoKik8L2I+PC9zcGFuPg0KCQkJCQkJCQkJPHNwYW4gY2xhc3M9ImdlbnNtYWxsIj48YnIgLz5SZXBvcnRzIHRoYXQgcmVxdWlyZSB1cmdlbnQgYXR0ZW50aW9uLiBlZyBNYWx3YXJlLCBWaXJ1c2VzLCBQb3JuLjwvc3Bhbj4NCgkJCQkJCQkJPC90ZD4NCgkJCQkJCQk8L3RyPg0KCQkJCQkJPC90YWJsZT4NCgkJCQkJPC90ZD4NCgkJCQk8L3RyPg0KCQkJCTx0cj4NCgkJCQkJPHRkIGFsaWduPSJjZW50ZXIiIG5vd3JhcD0ibm93cmFwIj4NCgkJCQkJCTxzcGFuIGNsYXNzPSJnZW5zbWFsbCI+KCopID0gQ29tbWVudHMgYXJlIHJlcXVpcmVkPC9zcGFuPg0KCQkJCQk8L3RkPg0KCQkJCTwvdHI+DQoJCQk8L3RhYmxlPg0KDQoJCTwvdGQ+DQoJPC90cj4NCgk8dHI+DQoJCTx0ZCBjbGFzcz0iY2F0IiBjb2xzcGFuPSIzIiBhbGlnbj0iY2VudGVyIiBoZWlnaHQ9IjI4Ij4NCgkgIAkJPGlucHV0IHR5cGU9InN1Ym1pdCIgdGFiaW5kZXg9IjIiIGFjY2Vzc2tleT0icyIgbmFtZT0ic3VibWl0IiBjbGFzcz0ibWFpbm9wdGlvbiIgdmFsdWU9IlN1Ym1pdCIgLz4NCgkJCSZuYnNwOyZuYnNwOyZuYnNwOw0KCSAgCQk8aW5wdXQgdHlwZT0ic3VibWl0IiB0YWJpbmRleD0iMyIgbmFtZT0iY2FuY2VsIiBjbGFzcz0ibGl0ZW9wdGlvbiIgdmFsdWU9IkNhbmNlbCIgLz4NCgkJPC90ZD4NCgk8L3RyPg0KPC90YWJsZT4NCjwvZm9ybT4NCjwvdGQ+PC90cj4NCg==";


//from phpjs
function base64_decode(data){var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var o1,o2,o3,h1,h2,h3,h4,bits,i=ac=0,dec="",tmp_arr=[];data+='';do{h1=b64.indexOf(data.charAt(i++));h2=b64.indexOf(data.charAt(i++));h3=b64.indexOf(data.charAt(i++));h4=b64.indexOf(data.charAt(i++));bits=h1<<18|h2<<12|h3<<6|h4;o1=bits>>16&0xff;o2=bits>>8&0xff;o3=bits&0xff;if(h3==64){tmp_arr[ac++]=String.fromCharCode(o1)}else if(h4==64){tmp_arr[ac++]=String.fromCharCode(o1,o2)}else{tmp_arr[ac++]=String.fromCharCode(o1,o2,o3)}}while(i<data.length);dec=tmp_arr.join('');dec=utf8_decode(dec);return dec}
function utf8_decode(str_data){var tmp_arr=[],i=ac=c1=c2=c3=0;str_data+='';while(i<str_data.length){c1=str_data.charCodeAt(i);if(c1<128){tmp_arr[ac++]=String.fromCharCode(c1);i++}else if((c1>191)&&(c1<224)){c2=str_data.charCodeAt(i+1);tmp_arr[ac++]=String.fromCharCode(((c1&31)<<6)|(c2&63));i+=2}else{c2=str_data.charCodeAt(i+1);c3=str_data.charCodeAt(i+2);tmp_arr[ac++]=String.fromCharCode(((c1&15)<<12)|((c2&63)<<6)|(c3&63));i+=3}}return tmp_arr.join('')}


// Modified by me
jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') {
	    options = options || {};
	    if (value === null) {
	        value = '';
	        options.expires = -1;
	    }
	    var expires = '';
	    if (options.expires && (typeof options.expires == 'number' || typeof options.expires == 'string' || options.expires.toUTCString)) {
	        var date;
	        if (typeof options.expires == 'number') {
	            date = new Date();
	            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	        } else if(typeof options.expires == 'string' && options.expires=='never'){
	            date = new Date();
	            date.setTime(date.getTime() + (10 * 365 * 24 * 60 * 60 * 1000)); // 10 years == never. >:(   IT DOES! 
	        } else {
	            date = options.expires;
	        }
	        expires = '; expires=' + date.toUTCString();
	    }
	    var path = options.path ? '; path=' + (options.path) : '';
	    var domain = options.domain ? '; domain=' + (options.domain) : '; domain=.warez-bb.org';
	    var secure = options.secure ? '; secure' : '';
	    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
	    var cookieValue = null;
	    if (document.cookie && document.cookie !== '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
};

/*
 * End of jQuery
*/
/*
var win2byte = {
  '\u20AC': '\x80', '\u201A': '\x82', '\u0192': '\x83', '\u201E': '\x84',
  '\u2026': '\x85', '\u2020': '\x86', '\u2021': '\x87', '\u02C6': '\x88',
  '\u2030': '\x89', '\u0160': '\x8A', '\u2039': '\x8B', '\u0152': '\x8C',
  '\u017D': '\x8E', '\u2018': '\x91', '\u2019': '\x92', '\u201C': '\x93',
  '\u201D': '\x94', '\u2022': '\x95', '\u2013': '\x96', '\u2014': '\x97',
  '\u02DC': '\x98', '\u2122': '\x99', '\u0161': '\x9A', '\u203A': '\x9B',
  '\u0153': '\x9C', '\u017E': '\x9E', '\u0178': '\x9F'
};

function getbyte(s) {
  var b = win2byte[s];
  return b || s;
}

var codes = '(?:[\\x80-\\xBF]|' + [code for (code in win2byte)].join('|') + ')';
var pat = new RegExp('[\\xC2-\\xDF]' + codes +
                    '|[\\xE0-\\xEF]' + codes + '{2}' +
                    '|[\\xF0-\\xF4]' + codes + '{3}', 'g');

function sub(s) {
  s = s[0] + [getbyte(s[1 + parseInt(code)]) for (code in s.substring(1))].join('');
  return decodeURIComponent(escape(s));
}

function fix(s) {
  s = s.replace(pat, sub);
  return s;
}
*/

/*
 * PHP date() in Javascript thanks to the PHPJS library
 */
function date(format,timestamp){var a,jsdate=((timestamp)?new Date(timestamp*1000):new Date());var pad=function(n,c){if((n=n+"").length<c){return new Array(++c-n.length).join("0")+n;}else{return n;}};var txt_weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var txt_ordin={1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"};var txt_months=["","January","February","March","April","May","June","July","August","September","October","November","December"];var f={d:function(){return pad(f.j(),2);},D:function(){t=f.l();return t.substr(0,3);},j:function(){return jsdate.getDate();},l:function(){return txt_weekdays[f.w()];},N:function(){return f.w()+1;},S:function(){return txt_ordin[f.j()]?txt_ordin[f.j()]:'th';},w:function(){return jsdate.getDay();},z:function(){return(jsdate-new Date(jsdate.getFullYear()+"/1/1"))/864e5>>0;},W:function(){var a=f.z(),b=364+f.L()-a;var nd2,nd=(new Date(jsdate.getFullYear()+"/1/1").getDay()||7)-1;if(b<=2&&((jsdate.getDay()||7)-1)<=2-b){return 1;}else{if(a<=2&&nd>=4&&a>=(6-nd)){nd2=new Date(jsdate.getFullYear()-1+"/12/31");return date("W",Math.round(nd2.getTime()/1000));}else{return(1+(nd<=3?((a+nd)/7):(a-(7-nd))/7)>>0);}}},F:function(){return txt_months[f.n()];},m:function(){return pad(f.n(),2);},M:function(){t=f.F();return t.substr(0,3);},n:function(){return jsdate.getMonth()+1;},t:function(){var n;if((n=jsdate.getMonth()+1)==2){return 28+f.L();}else{if(n&1&&n<8||!(n&1)&&n>7){return 31;}else{return 30;}}},L:function(){var y=f.Y();return(!(y&3)&&(y%1e2||!(y%4e2)))?1:0;},Y:function(){return jsdate.getFullYear();},y:function(){return(jsdate.getFullYear()+"").slice(2);},a:function(){return jsdate.getHours()>11?"pm":"am";},A:function(){return f.a().toUpperCase();},B:function(){var off=(jsdate.getTimezoneOffset()+60)*60;var theSeconds=(jsdate.getHours()*3600)+
(jsdate.getMinutes()*60)+
jsdate.getSeconds()+off;var beat=Math.floor(theSeconds/86.4);if(beat>1000)beat-=1000;if(beat<0)beat+=1000;if((String(beat)).length==1)beat="00"+beat;if((String(beat)).length==2)beat="0"+beat;return beat;},g:function(){return jsdate.getHours()%12||12;},G:function(){return jsdate.getHours();},h:function(){return pad(f.g(),2);},H:function(){return pad(jsdate.getHours(),2);},i:function(){return pad(jsdate.getMinutes(),2);},s:function(){return pad(jsdate.getSeconds(),2);},O:function(){var t=pad(Math.abs(jsdate.getTimezoneOffset()/60*100),4);if(jsdate.getTimezoneOffset()>0)t="-"+t;else t="+"+t;return t;},P:function(){var O=f.O();return(O.substr(0,3)+":"+O.substr(3,2));},c:function(){return f.Y()+"-"+f.m()+"-"+f.d()+"T"+f.h()+":"+f.i()+":"+f.s()+f.P();},U:function(){return Math.round(jsdate.getTime()/1000);}};return format.replace(/[\\]?([a-zA-Z])/g,function(t,s){if(t!=s){ret=s;}else if(f[s]){ret=f[s]();}else{ret=s;}
return ret;});}
/*
 * End of date()
 */

// sprintf thanks to the PHPJS library
var sprintf = function(){var regex=/%%|%(\d+\$)?([-+#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;var a=arguments,i=0,format=a[i++];var pad=function(str,len,chr,leftJustify){var padding=(str.length>=len)?'':Array(1+len-str.length>>>0).join(chr);return leftJustify?str+padding:padding+str};var justify=function(value,prefix,leftJustify,minWidth,zeroPad){var diff=minWidth-value.length;if(diff>0){if(leftJustify||!zeroPad){value=pad(value,minWidth,' ',leftJustify)}else{value=value.slice(0,prefix.length)+pad('',diff,'0',true)+value.slice(prefix.length)}}return value};var formatBaseX=function(value,base,prefix,leftJustify,minWidth,precision,zeroPad){var number=value>>>0;prefix=prefix&&number&&{'2':'0b','8':'0','16':'0x'}[base]||'';value=prefix+pad(number.toString(base),precision||0,'0',false);return justify(value,prefix,leftJustify,minWidth,zeroPad)};var formatString=function(value,leftJustify,minWidth,precision,zeroPad){if(precision!=null){value=value.slice(0,precision)}return justify(value,'',leftJustify,minWidth,zeroPad)};var doFormat=function(substring,valueIndex,flags,minWidth,_,precision,type){if(substring=='%%')return'%';var leftJustify=false,positivePrefix='',zeroPad=false,prefixBaseX=false;for(var j=0;flags&&j<flags.length;j++)switch(flags.charAt(j)){case' ':positivePrefix=' ';break;case'+':positivePrefix='+';break;case'-':leftJustify=true;break;case'0':zeroPad=true;break;case'#':prefixBaseX=true;break}if(!minWidth){minWidth=0}else if(minWidth=='*'){minWidth=+a[i++]}else if(minWidth.charAt(0)=='*'){minWidth=+a[minWidth.slice(1,-1)]}else{minWidth=+minWidth}if(minWidth<0){minWidth=-minWidth;leftJustify=true}if(!isFinite(minWidth)){throw new Error('sprintf: (minimum-)width must be finite');}if(!precision){precision='fFeE'.indexOf(type)>-1?6:(type=='d')?0:void(0)}else if(precision=='*'){precision=+a[i++]}else if(precision.charAt(0)=='*'){precision=+a[precision.slice(1,-1)]}else{precision=+precision}var value=valueIndex?a[valueIndex.slice(0,-1)]:a[i++];switch(type){case's':return formatString(String(value),leftJustify,minWidth,precision,zeroPad);case'c':return formatString(String.fromCharCode(+value),leftJustify,minWidth,precision,zeroPad);case'b':return formatBaseX(value,2,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'o':return formatBaseX(value,8,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'x':return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'X':return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad).toUpperCase();case'u':return formatBaseX(value,10,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'i':case'd':{var number=parseInt(+value);var prefix=number<0?'-':positivePrefix;value=prefix+pad(String(Math.abs(number)),precision,'0',false);return justify(value,prefix,leftJustify,minWidth,zeroPad)}case'e':case'E':case'f':case'F':case'g':case'G':{var number=+value;var prefix=number<0?'-':positivePrefix;var method=['toExponential','toFixed','toPrecision']['efg'.indexOf(type.toLowerCase())];var textTransform=['toString','toUpperCase']['eEfFgG'.indexOf(type)%2];value=prefix+Math.abs(number)[method](precision);return justify(value,prefix,leftJustify,minWidth,zeroPad)[textTransform]()}default:return substring}};return format.replace(regex,doFormat)}

//more PHPJS
var htmlspecialchars = function(string, quote_style) { 
    var histogram = {}, symbol = '', tmp_str = '', i = 0;
    tmp_str = string.toString();
    
    if (false === (histogram = get_html_translation_table('HTML_SPECIALCHARS', quote_style))) {
        return false;
    }
    
    for (symbol in histogram) {
        entity = histogram[symbol];
        tmp_str = tmp_str.split(symbol).join(entity);
    }
    
    return tmp_str;
};

var get_html_translation_table = function(table, quote_style){
    
    var entities = {}, histogram = {}, decimal = 0, symbol = '';
    var constMappingTable = {}, constMappingQuoteStyle = {};
    var useTable = {}, useQuoteStyle = {};
    
    useTable      = (table ? table.toUpperCase() : 'HTML_SPECIALCHARS');
    useQuoteStyle = (quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT');
    
    // Translate arguments
    constMappingTable[0]      = 'HTML_SPECIALCHARS';
    constMappingTable[1]      = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';
    
    // Map numbers to strings for compatibilty with PHP constants
    if (!isNaN(useTable)) {
        useTable = constMappingTable[useTable];
    }
    if (!isNaN(useQuoteStyle)) {
        useQuoteStyle = constMappingQuoteStyle[useQuoteStyle];
    }
    
    if (useTable == 'HTML_SPECIALCHARS') {
        // ascii decimals for better compatibility
        entities['38'] = '&amp;';
        entities['60'] = '&lt;';
        entities['62'] = '&gt;';
    } else if (useTable == 'HTML_ENTITIES') {
        // ascii decimals for better compatibility
      entities['38'] = '&amp;';
      entities['60'] = '&lt;';
      entities['62'] = '&gt;';
      entities['160'] = '&nbsp;';
      entities['161'] = '&iexcl;';
      entities['162'] = '&cent;';
      entities['163'] = '&pound;';
      entities['164'] = '&curren;';
      entities['165'] = '&yen;';
      entities['166'] = '&brvbar;';
      entities['167'] = '&sect;';
      entities['168'] = '&uml;';
      entities['169'] = '&copy;';
      entities['170'] = '&ordf;';
      entities['171'] = '&laquo;';
      entities['172'] = '&not;';
      entities['173'] = '&shy;';
      entities['174'] = '&reg;';
      entities['175'] = '&macr;';
      entities['176'] = '&deg;';
      entities['177'] = '&plusmn;';
      entities['178'] = '&sup2;';
      entities['179'] = '&sup3;';
      entities['180'] = '&acute;';
      entities['181'] = '&micro;';
      entities['182'] = '&para;';
      entities['183'] = '&middot;';
      entities['184'] = '&cedil;';
      entities['185'] = '&sup1;';
      entities['186'] = '&ordm;';
      entities['187'] = '&raquo;';
      entities['188'] = '&frac14;';
      entities['189'] = '&frac12;';
      entities['190'] = '&frac34;';
      entities['191'] = '&iquest;';
      entities['192'] = '&Agrave;';
      entities['193'] = '&Aacute;';
      entities['194'] = '&Acirc;';
      entities['195'] = '&Atilde;';
      entities['196'] = '&Auml;';
      entities['197'] = '&Aring;';
      entities['198'] = '&AElig;';
      entities['199'] = '&Ccedil;';
      entities['200'] = '&Egrave;';
      entities['201'] = '&Eacute;';
      entities['202'] = '&Ecirc;';
      entities['203'] = '&Euml;';
      entities['204'] = '&Igrave;';
      entities['205'] = '&Iacute;';
      entities['206'] = '&Icirc;';
      entities['207'] = '&Iuml;';
      entities['208'] = '&ETH;';
      entities['209'] = '&Ntilde;';
      entities['210'] = '&Ograve;';
      entities['211'] = '&Oacute;';
      entities['212'] = '&Ocirc;';
      entities['213'] = '&Otilde;';
      entities['214'] = '&Ouml;';
      entities['215'] = '&times;';
      entities['216'] = '&Oslash;';
      entities['217'] = '&Ugrave;';
      entities['218'] = '&Uacute;';
      entities['219'] = '&Ucirc;';
      entities['220'] = '&Uuml;';
      entities['221'] = '&Yacute;';
      entities['222'] = '&THORN;';
      entities['223'] = '&szlig;';
      entities['224'] = '&agrave;';
      entities['225'] = '&aacute;';
      entities['226'] = '&acirc;';
      entities['227'] = '&atilde;';
      entities['228'] = '&auml;';
      entities['229'] = '&aring;';
      entities['230'] = '&aelig;';
      entities['231'] = '&ccedil;';
      entities['232'] = '&egrave;';
      entities['233'] = '&eacute;';
      entities['234'] = '&ecirc;';
      entities['235'] = '&euml;';
      entities['236'] = '&igrave;';
      entities['237'] = '&iacute;';
      entities['238'] = '&icirc;';
      entities['239'] = '&iuml;';
      entities['240'] = '&eth;';
      entities['241'] = '&ntilde;';
      entities['242'] = '&ograve;';
      entities['243'] = '&oacute;';
      entities['244'] = '&ocirc;';
      entities['245'] = '&otilde;';
      entities['246'] = '&ouml;';
      entities['247'] = '&divide;';
      entities['248'] = '&oslash;';
      entities['249'] = '&ugrave;';
      entities['250'] = '&uacute;';
      entities['251'] = '&ucirc;';
      entities['252'] = '&uuml;';
      entities['253'] = '&yacute;';
      entities['254'] = '&thorn;';
      entities['255'] = '&yuml;';
    } else {
        throw Error("Table: "+useTable+' not supported');
        return false;
    }
    
    if (useQuoteStyle != 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    
    if (useQuoteStyle == 'ENT_QUOTES') {
        entities['39'] = '&#039;';
    }
    
    // ascii decimals to real symbols
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal)
        histogram[symbol] = entities[decimal];
    }
    
    return histogram;
};
/*
$.ajaxSetup({
	beforeSend: function(xhr){
		//alert("before send");
		xhr.overrideMimeType('text/html; charset=iso-8859-1');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=iso-8859-1');
	},
	contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
	//scriptCharset: "utf-8"
	//xhr: GM_xmlhttpRequest,
	processData: true
});

*/

var superSerialize = function(serial){
	var ser = {};
	$.each(serial, function(i, val){
		ser[val.name] = /*fix(unescape(encodeURIComponent(*/val.value/*)))*/;
		//alert(ser[val.name]);
		//(encodeURIval.value);
		//serial[i].value = escape(decodeURIComponent(val.value));
	});	
	return ser;
};


eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0 1=2;',3,3,'var|z|false'.split('|'),0,{}))
eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1(2 0!="3"){0=4}',5,5,'z|if|typeof|boolean|true'.split('|'),0,{}))


var WBBSC = function(){
	
	var lastMessage="";
	var actualPage = document.location.href;
		
		
	var page = function(name){
		//return document.location.href.indexOf(name) >= 0;
		return actualPage.indexOf(name) >= 0;
	};
	

	
	function firstRun(){
		if(!getOption("firstrun"+currentVersion)){
			alert("Welcome to WBB:SC Release "+currentVersion+"!\n\nThe firstrun code for this release will execute when you click OK.");
						
			//setString("selectforum", "");
			//setOption("setselect", 0);
						
			//alert("Reset quick search dropdown contents successfully.\n\nPlease visit any topic to have this updated to reflect your current forum access.\n\nSince this release you can now use the 'Reset Quick Search Forums Dropdown' button on the settings page to perform this action again.");
			
			setOption("tidyforumview", 1);
			
			//alert("Turned effects on just incase the built in defaults don't work :P");
			
			alert("Firstrun code complete - now refreshing...");			
			location.reload();
			
			setOption("firstrun"+currentVersion, 1);
		}
	}
	
	
	
	if(typeof z!="boolean"){z=true}
	var version = "0.2.0";
	
	var buttonText = {
		quote: "WBB:SC Quote",
		quote2: "Gathering Post...",
		quoteError: "WBB lag - Try again",
		submit: "WBB:SC Submit",
		submit2: "Sending...",
		preview: "WBB:SC Preview",
		previewQuote: "Gathering last post to quote...",
		previewError: "WBB Lag - Try again",
		edit: "WBB:SC Submit",
		edit2: "WBB:SC Submitting...",
		cancel: "Cancel Editing"
	};
	var quoteRegex = /\<textarea name="message".*?>([\s\S]*)\<\/textarea>/;
	var settingsPage = [
		{
			title: 'SuperCharger',
			desc: 'Live preloading of commonly-accessed pages: Home, Forum links at top/bottom and anywhere a Next button appears. WARNING: This has the potential to create iframes in a paradoxical way and therefore freeze your browser. Your back button may also not function at certain times.',
			name: 'supercharger',
			preset: false
		},{
			title: 'Quick Reply [img] button',
			desc: 'Adds a button to insert [img][/img] tags to Quick reply',
			name: 'quickimg',
			preset: true
		},{
			title: 'List Item [*] button',
			desc: 'Adds a [*] button to all instances of the full message editor.',
			name: 'listitem',
			preset: true
		},{
			title: 'Quick Quote',
			desc: 'Adds a WBB:SC Quote button, allowing posts to be <b>instantly</b> quoted into the quick reply box. This will not replace the existing Quote button.',
			name: 'quickquote',
			preset: true
		},{
			title: 'Bigger Quick Reply',
			desc: 'Sets the quick reply box to double-height by default.',
			name: 'bigreply',
			preset: false
		},{
			title: 'Inline Editing',
			desc: 'Enables the inline editing feature of WBB:SC, allowing you to edit posts without leaving the page.',
			name: 'inlineedit',
			preset: true
		},/*{
			title: 'Inline Report',
			desc: 'Enables the inline report feature of WBB:SC, allowing you to report posts without leaving the page.',
			name: 'inlinereport',
			preset: true
		},*/{
			title: 'Quick Quote Override',
			desc: 'Overrides the normal quote button to function like WBB:SC Quote. It is recommended that you turn off the WBB:SC Quote button if you enable this.',
			name: 'qqoverride',
			preset: false
		},{
			title: 'Quick Search',
			desc: 'Enables the link to access Quick Search in the third menu bar',
			name: 'qksearch',
			preset: true
		},{
			title: 'Inline First Post',
			desc: 'Enables the little arrow button to fold out the first post of a thread in search results and viewforum, and to fold out a PM in your PM inbox.',
			name: 'inlinefirst',
			preset: true
		},{
			title: 'PM Reply Link',
			desc: 'Adds a link next to each PM in your inbox allowing you to quickly reply to it.',
			name: 'pmreply',
			preset: true
		},{
			title: 'PM Tracker Quote',
			desc: 'Adds a quote button next to each message in the PM tracker (displayed at the bottom when replying to a PM).',
			name: 'pmquote',
			preset: true
		},{
			title: 'Wadio Bar',
			desc: 'Just in case you don\'t like it ;) (keeping this for backwards-compatibility reasons)',
			name: 'wbbscwadio',
			preset: true
		},/*{
			title: 'IRC Link',
			desc: 'Enables the irc:// link in the first menu bar. Handy for users of Chatzilla, amongst others.',
			name: 'irclink',
			preset: false
		},*/{
			title: 'You\'re running...',
			desc: 'Awwww... come on... keep it enabled :)',
			name: 'yourerunning',
			preset: true
		}, {
			title: 'Random Fading Effects',
			desc: 'How could you live without them? :O',
			name: 'awesomeness',
			preset: true
		}, {
			title: 'Tidy Forum View',
			desc: 'Various visual improvements to viewforum, search results etc.',
			name: 'tidyforumview',
			preset: true
		}, {
			title: 'Goto Any Page',
			desc: 'Adds a link allowing you to go to any page anywhere where Goto page appears at the bottom of a page.',
			name: 'goto',
			preset: true
		}
		
		/*,{
			title: 'Imgkk.com Integration',
			desc: 'Adds an Upload Image link to all posting views allowing you to easily upload an image through imgkk.com and include it in your message.',
			name: 'imgkk',
			preset: true
		}*/
		
	];
	
	var versionLt = function(ver){
		var vers = ver.split(/\./g);
		var versions = version.split(/\./g);
		if(vers[0] < versions[0]){
			return true;
		} else if(vers[1] < versions[1]){
			return true;
		} else if(vers[2] < versions[2]){
			return true;
		} else {
			return false;
		}
	};
	var versionGt = function(ver){
		var vers = ver.split(/\./g);
		var versions = version.split(/\./g);
		if(vers[0] > versions[0]){
			return true;
		} else if(vers[1] > versions[1]){
			return true;
		} else if(vers[2] > versions[2]){
			return true;
		} else {
			return false;
		}
	};
	
	// Taken from quick_reply.js - Thanks Coolyou :D
	function mozInsert(txtarea, openTag, closeTag){
		var scrollTop = ( typeof txtarea.scrollTop == 'number' ? txtarea.scrollTop : -1 );
	
		if (txtarea.selectionEnd > txtarea.value.length){ 
			txtarea.selectionEnd = txtarea.value.length; 
		}
	
		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd+openTag.length;
	
		txtarea.value = txtarea.value.slice(0,startPos)+openTag+txtarea.value.slice(startPos);
		txtarea.value = txtarea.value.slice(0,endPos)+closeTag+txtarea.value.slice(endPos);
	
		txtarea.selectionStart = startPos+openTag.length;
		txtarea.selectionEnd = endPos;
		txtarea.focus();
	
		if( scrollTop >= 0 ){ 
			txtarea.scrollTop = scrollTop; 
		}
	}
	
	// Taken from ajax_core.js - Thanks Coolyou :D
	function ad(a)
	{
		var obj;
		if(document.getElementById){
			obj = document.getElementById(a);
		} else if(document.all){
			obj = document.all[a];
		} else if(document.layers){
			obj = document.layers[a];
		} else {
			return 1;
		}
		return obj;
	}
	
	
	var fromSuperCharge = function(){
		return parent !== window;
	}
	
	var isOnlyEmptySpace = function(string) {    
	    var i = 0;    
	    while(i < string.length && (string.charAt(i) == " " || string.charAt(i) == "\t" || string.charAt(i) == "\n")) {
	        i++;
	    }    
	    return (i == string.length);
	};
	
	// thanks to phpbbadvancedquickreplyquoteedit.js for the idea
	/**
	 * Javascript Warez-BB HTML->BB-Code Parser
	 * @param {jquery} element
	*/	      
	var convertHTMLtoBBCode = function(bbcode, element) {
	    
	    var after = "";
	    var dontCallFirstChild = false;
	    
	    switch(element.nodeName.toLowerCase()) {
	        case "#text": 
	                        if((element.parentNode.nodeName.toLowerCase() == "b" && element.parentNode.parentNode.nodeName.toLowerCase() == "span" && element.parentNode.parentNode.attributes !== null && element.parentNode.parentNode.getAttribute("class") == "genmed") ||element.data == "Quote:" ||element.data == "Moderated Message:" || element.data == "Code:" || element.data.indexOf("wrote:") != -1 || ( element.data == "offtopic of the day:" && element.parentNode.nodeName.toLowerCase() == "u" && element.parentNode.parentNode.nodeName.toLowerCase() == "div" ) || element.data == "_________________") {
	                            
	                            return bbcode;
	                         }
	                      
	                      if(isOnlyEmptySpace(element.data)){
	                          break;
	                      }
	                      
	                      bbcode += element.data.toString().replace(/\n/g, "");
	                      
	        break;
	        case "a": 
	            if(element.href == element.firstChild.data || ( element.href.substr(0, element.href.length - 1) == element.firstChild.data && element.href.charAt(element.href.length - 1) == "/" )) {
	                    
	                if(element.href == encodeURI(element.href)) {
	                    bbcode += element.href;
	                 } else {
	                     bbcode += "[url]" + element.href + "[/url]";
	                 }
	                 dontCallFirstChild = true;
	             } else {
	                 bbcode += "[url=" + element.href + "]"; 
	                 after = "[/url]";
	             }
	        break;
	        case "br": 
	                  
	                  if(!(element.parentNode.nodeName.toLowerCase() == "div" && ( element.previousSibling !== null && (element.previousSibling.nodeName.toLowerCase() == "u" || (element.previousSibling.nodeName.toLowerCase() == "br" && element.previousSibling.previousSibling !== null && element.previousSibling.previousSibling.nodeName.toLowerCase() == "u" ))))) {
	                      
	                      bbcode += "\n";
	                      
	                  }
	        break;
	        case "img":
	        if((element.src.indexOf("fisubice/images/bg_quote_header.gif") == -1)) {            
	            var pos = document.location.href.indexOf("viewtopic.php") - 1;            
	            var lol = "/images/smiles/";
	            //if(document.location.href.substring(0, pos + 1) == element.src.substring(0, pos + 1) && element.src.substr(pos, 15) == "/images/smiles/" && element.getAttribute("alt") !== null)  {
	            if(element.src.indexOf(lol) != -1){
	              switch(element.src.substr(element.src.indexOf(lol) + 15)) {
	                  
	                  case "icon_biggrin.gif": bbcode += ":D"; break;
	                  case "icon_smile.gif": bbcode += ":)"; break;
	                  case "icon_sad.gif": bbcode += ":("; break;
	                  case "icon_eek.gif": bbcode += ":shock:"; break;
	                  case "icon_confused.gif": bbcode += ":?"; break;
	                  case "icon_cool.gif": bbcode += "8-)"; break;
	                  case "icon_lol.gif": bbcode += ":lol:"; break;
	                  case "icon_mad.gif": bbcode += ":x"; break;
	                  case "icon_razz.gif": bbcode += ":P"; break;
	                  case "icon_redface.gif": bbcode += ":oops:"; break;
	                  case "icon_cry.gif": bbcode += ":cry:"; break;
	                  case "icon_evil.gif": bbcode += ":evil:"; break;
	                  case "icon_twisted.gif": bbcode += ":twisted:"; break;
	                  case "icon_rolleyes.gif": bbcode += ":roll:"; break;
	                  case "icon_wink.gif": bbcode += ";)"; break;
	                  case "icon_exclaim.gif": bbcode += ":!:"; break;
	                  case "icon_question.gif": bbcode += ":?:"; break;
	                  case "worshippy.gif": bbcode += ":worship:"; break;
	                  case "icon_neutral.gif": bbcode += ":|"; break;
	                  case "icon_arrow.gif": bbcode += ":arrow:"; break;
	                  case "icon_idea.gif": bbcode += ":idea:"; break;
	                  case "icon_mrgreen.gif": bbcode += ":mrgreen:"; break;
	                  case "icon_surprised.gif": bbcode += ":-o"; break;
	                  
	                  default: bbcode += "[img]" + element.src + "[/img]"; break;
	              }
	            
	            } else {
	                bbcode += "[img]" + element.src + "[/img]";
	            }
	        }
	        break;
	        case "span":
	            if((element.attributes.length > 0 && element.getAttribute("class") !== null && element.getAttribute("class") == "gensmall") || (element.firstChild !== null && element.firstChild.nodeName.toLowerCase() == "br" && element.firstChild.nextSibling !== null && element.firstChild.nextSibling.data !== null && element.firstChild.nextSibling.data == "_________________")) {
	               
	               return bbcode;
	            
	            }
	            
	            var elyl = element.getAttribute("style");
	            
	            switch(elyl) {
	                case "font-weight: bold;": bbcode += "[b]"; after = "[/b]"; break;
	                case "font-style: italic;": bbcode += "[i]"; after = "[/i]"; break;
	                case "text-decoration: underline;": bbcode += "[u]"; after = "[/u]"; break;
	                default:
	                if(elyl !== null && elyl.substr(0, 7) == "color: ") {
	                    
	                    bbcode += "[color=" + elyl.substring(7,elyl.length-1) + "]"; after = "[/color]";
	                } else if(elyl !== null && elyl.substr(0, 11) == "font-size: ") {
	                    var size = elyl.substr(11, 2);
	                    if(size.charAt(1) == "p"){
	                        size = size.charAt(0);
	                    }
	                    bbcode += "[size=" + size + "]"; after = "[/size]";
	                }
	                
	                if(element.attributes !== null && element.getAttribute("class") == "genmed") {
	                    var quotator = element.firstChild.firstChild.data;
	                    var qname = "";
	                    var spaces = quotator.match(/ /g);
	                    if(quotator == "Moderated Message:") {
	                        bbcode += "[mod]";
	                        break;
	                    } else if(spaces !== null && spaces.length > 0) {
	                        if(quotator.substring(quotator.length - 7) == " wrote:"){
	                            qname = quotator.substring(0, quotator.length - 7);
	                        }
	                    } else if(quotator == "Code:") {
	                        bbcode += "[code]";
	                        break;
	                    }
	                    
	                    var lala = "";
	                    if(qname !== ""){
	                        lala = "=\"" + qname + "\"";
	                    }
	                    
	                    bbcode += "[quote" + lala + "]";
	                }
	                break;
	                
	            }
	            break;
	            case "table":
	            if(element.attributes !== null && element.getAttribute("class") == "attachtable"){
	                return bbcode;
	            }
	            
	            if(element.getElementsByTagName("strong").length > 0 && element.getElementsByTagName("strong")[0].firstChild.data == "Code:") {
	                after = "[/code]"; break;
	            } else if(element.getElementsByTagName("strong").length > 0 && element.getElementsByTagName("strong")[0].firstChild.data == "Moderated Message:") {
	                after = "[/mod]"; break;            	
	            } else {
	                after = "[/quote]"; break;
	            }
	            case "ul": 
	            	bbcode += "[list]"; after = "[/list]";
	            	break;
	            case "li": 
	            	bbcode += "[*]"; 
	            	break;
	        
	        
	    }
	    
	    if(element.firstChild !== null && !dontCallFirstChild) {
	        bbcode = convertHTMLtoBBCode(bbcode, element.firstChild);
	        bbcode += after;
	    } 
	    
	    if(element.nextSibling !== null) { 
	        bbcode = convertHTMLtoBBCode(bbcode, element.nextSibling);
	    }
	    
	    return bbcode; 
	};
	
	var html2bb = function(postbodydiv){
	    var bbcode = "";
	    bbcode = convertHTMLtoBBCode("", postbodydiv);    	
	    while(bbcode.charAt(bbcode.length - 1) == "\n"){
	        bbcode = bbcode.substring(0, bbcode.length - 1);
	    }
	    return bbcode;
	};
	
	
	/**
	 * Javascript Warez-BB BB-Code->HTML Parser
	 * @author Darkimmortal
	 * @param {string} text
	 */
	var bbCode = function(text){
		
		var search = [
			/\[img\]([\s\S]*?)\[\/img\]/gi,
			/\[url=([\w]+?:\/\/[^ \\"\n\r\t<]*?)\]([\s\S]*?)\[\/url\]/gim,
			/\[url\]((www|ftp|)\.[^ \\"\n\r\t<]*?)\[\/url\]/gim,
			/\[url=((www|ftp|)\.[^ \\"\n\r\t<]*?)\](.*?)\[\/url\]/gim,
			/\[url\](http:\/\/[^ \\"\n\r\t<]*?)\[\/url\]/gim,
			/\[email\](([a-z0-9&\-_.]+?)@([\w\-]+\.([\w\-\.]+\.)?[\w]+))\[\/email\]/gim,
			/\[b\]([\s\S]*?)\[\/b\]/gim,
			/\[i\]([\s\S]*?)\[\/i\]/gim,
			/\[u\]([\s\S]*?)\[\/u\]/gim,
			/\[quote\]/gim,
			/\[\/quote\]/gim,
			/\[quote="([^\\"\n\r\t<]*?)"\]/gim,
			/\[\/quote\]/gim,
			/\[code\]/gim,
			/\[\/code\]/gim,
			/\[mod\]/gim,
			/\[\/mod\]/gim,		
			/\[list=?\]/gim,
			/\[\/list\]/gim,
			/\[list=([^ \\"\n\r\t<]*?)\]/gim,
			/\[\/list\]/gim,
			/\[\*\]/gim,
			/\[color=([^ \\"\n\r\t<]*?)\]([\s\S]*?)\[\/color\]/gim,
			/\[size=([^ \\"\n\r\t<]*?)\]([\s\S]*?)\[\/size\]/gim
		];
	
		var replace = [
			"<img src=\"$1\" title='Image' alt='Image' border='0' />",
			"<a href=\"$1\" target=\"blank\">$2</a>",
			"<a href=\"http://$1\" target=\"blank\">$1</a>",
			"<a href=\"$1\" target=\"blank\">$1</a>",
			"<a href=\"mailto:$1\">$1</a>",
			"<a href=\"$1\" target=\"blank\">$1</a>",
			"<span style='font-weight: bold;'>$1</span>",
			"<span style='font-style: italic;'>$1</span>",
			"<span style='text-decoration: underline;'>$1</span>",
			"<table width=\"90%\" cellspacing=\"1\" cellpadding=\"3\" border=\"0\" align=\"center\"><tr><td>"+
				"<span class=\"genmed\"><strong>Quote:</strong></span></td></tr><tr><td class=\"quote\">"+
				"<img align=\"left\" src=\"templates/fisubice/images/bg_quote_header.gif\">",
			"</td></tr></table>",
			"<table width=\"90%\" cellspacing=\"1\" cellpadding=\"3\" border=\"0\" align=\"center\"><tr><td>"+
				"<span class=\"genmed\"><strong>Quote: $1</strong></span></td></tr><tr><td class=\"quote\">" +
				"<img align=\"left\" src=\"templates/fisubice/images/bg_quote_header.gif\">",
			"</td></tr></table>",
			"<table width=\"90%\" cellspacing=\"1\" cellpadding=\"3\" border=\"0\" align=\"center\"><tr><td>" +
				"<span class=\"genmed\"><strong>Code:</strong></span></td></tr><tr><td class=\"code\" style=\"white-space: pre-wrap !important; white-space: pre; word-wrap: break-word;\">",
			"</td></tr></table>",
			"<table width=\"90%\" cellspacing=\"1\" cellpadding=\"3\" border=\"0\" align=\"center\"><tr><td>" +
				"<span class=\"genmed\"><strong>Moderated Message:</strong></span></td></tr><tr><td class=\"moderator\">",
			"</td></tr></table>",
			"<ul>", "</ul>",
			"<ol type='$1'>", "</ol>",
			"<li>",
			"<span style='color:$1'>$2</span>",
			"<span style='font-size:$1px; line-height: normal'>$2</span>"			
		];
		
		text = htmlspecialchars(text, "ENT_NOQUOTES");
		
		for(i = 0; i < search.length; i++) {
		     text = text.replace(search[i],replace[i]);
		}
		return text;
	};
	
	/**
	 * Javascript Warez-BB Smiley Parser
	 * @author Darkimmortal
	 * @param {string} text
	 */
	var smiley = function(text){
		
		var smilies = [
			{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_biggrin.gif" alt="Very Happy" border="0" />',
				replace: /([ \n\r\t]):D|:D([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_smile.gif" alt="Smile" border="0" />',
				replace: /([ \n\r\t]):\)|:\)([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_redface.gif" alt="Embarassed" border="0" />',
				replace: /([ \n\r\t]):oops:|:oops:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_sad.gif" alt="Sad" border="0" />',
				replace: /([ \n\r\t]):\(|:\(([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_surprised.gif" alt="Surprised" border="0" />',
				replace: /([ \n\r\t]):o|:o([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_eek.gif" alt="Shocked" border="0" />',
				replace: /([ \n\r\t]):shock:|:shock:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_question.gif" alt="Question" border="0" />',
				replace: /([ \n\r\t]):\?:|:\?:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_confused.gif" alt="Confused" border="0" />',
				replace: /([ \n\r\t]):\?|:\?([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_cool.gif" alt="Cool" border="0" />',
				replace: /([ \n\r\t])8-\)|8-\)([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_lol.gif" alt="Laughing" border="0" />',
				replace: /([ \n\r\t]):lol:|:lol:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_biggrin.gif" alt="Very Happy" border="0" />',
				replace: /([ \n\r\t]):\)|:\)([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_mad.gif" alt="Mad" border="0" />',
				replace: /([ \n\r\t]):x|:x([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_razz.gif" alt="Razz" border="0" />',
				replace: /([ \n\r\t]):P|:P([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_cry.gif" alt="Crying or Very sad" border="0" />',
				replace: /([ \n\r\t]):cry:|:cry:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_evil.gif" alt="Evil or Very Mad" border="0" />',
				replace: /([ \n\r\t]):evil:|:evil:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_twisted.gif" alt="Twisted Evil" border="0" />',
				replace: /([ \n\r\t]):twisted:|:twisted:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_rolleyes.gif" alt="Rolling Eyes" border="0" />',
				replace: /([ \n\r\t]):roll:|:roll:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_wink.gif" alt="Wink" border="0" />',
				replace: /([ \n\r\t]);\)| :wink:|;\) |:wink:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_neutral.gif" alt="Neutral" border="0" />',
				replace: /([ \n\r\t]):\|| :neutral:|:\| |:neutral:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_mrgreen.gif" alt="Mr. Green" border="0" />',
				replace: /([ \n\r\t]):mrgreen:|:mrgreen:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/worshippy.gif" alt="Worshippy" border="0" />',
				replace: /([ \n\r\t]):worship:|:worship:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_arrow.gif" alt="Arrow" border="0" />',
				replace: /([ \n\r\t]):arrow:|:arrow:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_idea.gif" alt="Idea" border="0" />',
				replace: /([ \n\r\t]):idea:|:idea:([ \n\r\t])/g
			},{
				smiley: '<img src="http://img5.warez-bb.org/images/smiles/icon_exclaim.gif" alt="Exclamation" border="0" />',
				replace: /([ \n\r\t]):!:|:!:([ \n\r\t])/g
			}
		];
		
		$.each(smilies, function(i, val){
			 text = text.replace(val.replace,"$1"+val.smiley+"$2");		
		});	
		
		return text;
	};
	
	var previewBox = [
		'<div class="wbbsc-pre" style="margin-top: 10px; margin-bottom: 20px; display: none;"><br /><table class="forumline" width="100%" cellspacing="1" cellpadding="3" border="0"><tr><th>Preview</th></tr><tr>' +
		'<td class="row1"><img src="templates/fisubice/images/icon_minipost.gif" alt="Post" width="12" height="9" class="imgspace" title="Post" />' +
		'<span class="postdetails">Posted: ',
		
		' &nbsp;&nbsp;&nbsp; Post subject: ',
		
		'&nbsp;&nbsp;&nbsp; </span></td></tr><tr>' +
		'<td class="row1"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="postbody">',
	
		'<br /><br />_________________<br /><div style="font-size: 11px"><br />WBB:SC :: Signature hidden to reduce unnecessary requests.</div>' +
		'</td></tr></table></div>'
	];
	
	var previewPM = '<div class="wbbsc-pre" style="margin-bottom: 20px; display: none;"><br />' +
		'<table border="0" cellpadding="3" cellspacing="1" width="100%" class="forumline"><tr><th colspan="2">Preview</th></tr>' +
		'<tr><td align="right" class="row2"><span class="explaintitle">From:</span></td><td width="100%" class="row2"><span class="name">%s</span></td></tr>' +
		'<tr><td align="right" class="row2"><span class="explaintitle">To:</span></td><td class="row2"><span class="name">%s</span></td></tr>' +
		'<tr><td align="right" class="row2"><span class="explaintitle">Posted:</span></td><td class="row2"><span class="genmed">%s</span></td></tr>' +
		'<tr><td align="right" class="row2"><span class="explaintitle">&nbsp;&nbsp;Subject:</span></td><td class="row2"><span class="genmed">%s</span></td></tr>' +
		'<tr><td colspan="2" class="row1"><span class="postbody">%s<br /><br />_________________<div style="font-size: 11px"><br />' +
		'WBB:SC :: Signature hidden to reduce unnecessary requests.</div></span><br />&nbsp;</td></tr></table></div>';
		
	debug = function(dbg){
		if(typeof unsafeWindow.console.debug == "function"){
			unsafeWindow.console.debug(dbg);
		}
	};
	
	var boxDate = function(){
		return date("D M d, Y g:i a");
	};
	
	//just so effect callbacks will always be called regardless of the existance of their subject elements
	$("body").append("<div class='faek' style='display: none; visibility: none;'><iframe id='lolframe'></iframe></div>" +
			"<iframe id='coolframe' name='coolframe' frameborder='0' width='100%' height='100%' style='display:none'></iframe>");
	
	var preview = function(){
		var text = smiley(bbCode($("#message").val()));
		$(".wbbsc-pre").remove();
		$(".forumline:eq("+($("img[src*='voting_bar.gif'], input[value='Submit Vote']").length > 0 ? "1" : "0")+")").after(previewBox[0]+boxDate()+previewBox[1]+previewBox[2]+lastMessage.replace(/\n/g, "<br />")+text.replace(/\n/g, "<br />")+previewBox[3]);
		$(".wbbsc-pre").slideDown("normal");
	};
	if(typeof z!="boolean"){z=true}
	var hidePreview = function(){
		if($("th:contains('Preview')").length > 0){
			$(".forumline:first, .wbbsc-pre").remove();
		}
	};
	
	var fthatiframe = function(message, src){
		if(!message){
			$("iframe[src*='"+src+"']:first").siblings(".postbody_div").show("slow").siblings("iframe").hide("slow", function(){ $(this).remove() });
		} else {
			$("iframe[src*='"+src+"']:first").siblings(".postbody_div").html(message).show("slow").siblings("iframe").hide("slow", function(){ $(this).remove() });
		}
	};
	/*
	var selected = function(name, value){
		return ($.cookie(name) == "1") == value;
	};*/
	
	var getOption = function(name){	
		if(typeof GM_getValue == "function"){
			if(typeof GM_getValue(name) == "undefined"){
				//debug(name);
				var sett;
				for(sett in settingsPage){
					if(settingsPage[sett].name == name){
						return settingsPage[sett].preset;
					}
				}
				//debug("fail");
				return false;
			} else {
				return GM_getValue(name) == "1";
			}
		} else {
			return $.cookie(name) == "1";
		}
		//return typeof GM_getValue == "function" ? GM_getValue(name) == "1" : $.cookie(name) == "1";
	};
	
	var setOption = function(name, value){
		if(typeof GM_setValue == "function"){
			GM_setValue(name, value ? "1" : "0");
		} else {
			$.cookie(name, value ? "1" : "0", {expires: 'never'});
		}
	};
	
	var getString = function(name){
		return typeof GM_getValue == "function" ? GM_getValue(name) : $.cookie(name);
	};
	
	var setString = function(name, value){
		if(typeof GM_setValue == "function"){
			GM_setValue(name, value);
		} else {
			$.cookie(name, value, {expires: 'never'});
		}
	};
	
	
	var settings = function(title, desc, name){
		return '<tr><td class="row1" width="50%"><span class="explaintitle">'+title+'</span><br />' +
			'<span class="gensmall">'+desc+'</span></td>' +
			'<td class="row2" width="50%"> &nbsp;&nbsp; <select id="'+name+'">' +
			'<option value="1"'+(getOption(name) ? ' selected="selected"' : '')+'>Yes</option>' +
			'<option value="0"'+(getOption(name) ? '' : ' selected="selected"')+'>No</option>' +
			'</select></td></tr>';
	}
	
	// FOR THE LULZ!!!1!
	var anim_animate = [
		["W","B","B",":","S","C"," ","S","e","t","t","i","n","g","s"," ","::"," ","B","y"," ","D","a","r","k","I","m","m","o","r","t","a","l"],
		["W","B","B",":","S","C"," ","f","t","w","."],
		["S","t","o","p"," ","s","t","a","r","i","n","g"," ","a","t"," ","t","h","e"," ","t","i","t","l","e"," ",":","P"],
		["j","Q","u","e","r","y"," ","f","t","w","."],
		["D","a","m","n",","," ","I","'","v","e"," ","r","u","n"," ","o","u","t"," ","o","f"," ","r","a","n","d","o","m"," ","t","h","i","n","g","s"," ","t","o"," ",
			"s","a","y"," ","h","e","r","e"," ",":","("],
		["O","h"," ","w","e","l","l",","," ","t","i","m","e"," ","t","o"," ","r","e","p","e","a","t",".",".","."]
	];
	var anim_stage = 0;
	var anim_part = 0;
	var anim_direction = true;
	var animateTitle = function(){
		var otytul="Warez-BB.org :: "
		var tytul=otytul;
		if(anim_direction){
			for(var i=0; i <= anim_stage; i++){
				tytul += anim_animate[anim_part][i];
			}
			if(anim_stage == anim_animate[anim_part].length-1){
				anim_direction=false;
				setTimeout(animateTitle, 5000);
			} else {
				anim_stage ++;
				setTimeout(animateTitle, 15);
			}
		} else {
			for(var i=0; i <= anim_stage; i++){
				tytul += anim_animate[anim_part][i];
			}
			if(anim_stage == 0){
				anim_direction=true;
				tytul=otytul;
				if(anim_part == anim_animate.length-1){
					anim_part = 0;
				} else {
					anim_part ++;
				}
				setTimeout(animateTitle, 900);
			} else {
				anim_stage --;
				setTimeout(animateTitle, 15);
			}
		}
		document.title=tytul;
	};
	// THE LULZ HAVE BEEN GIVEN THEIR SACRIFICE :P
				
	if(page("profile.php?mode=editprofile#wbbsc-settings")){
		animateTitle();
		$("form[name='addprofile'] > table.forumline").hide();
		$("td.maintitle").text("WBB:SC Settings");
		$("td.nav").empty().html('<a href="index.php">Warez-BB.org</a> &raquo; WBB:SC Settings'); 	
		
		var tehSettings = "";
		$.each(settingsPage, function(i, val){
			 tehSettings += settings(val.title, val.desc, val.name);
		});
		
		$("form[name='addprofile'] > table.forumline:first").show().html('<tr>' +
			'<th colspan="2">WBB:SC Settings</th></tr><tr><td height="22" colspan="2" class="row2">' +
			'<span class="gensmall">This page allows you to configure various settings for Warez-BB SuperCharged.<br />Settings will be stored ' +
			'in cookies if you are not using Firefox so it is essential that you never clear your cookies for Warez-BB.<br /><br /></span></td></tr>' + tehSettings +		
			'<tr><td class="cat" colspan="2" align="center"><input type="button" id="wbbsc-save" value="Save Settings" class="mainoption" /> &nbsp; ' +
			'<input type="button" id="wbbsc-default" value="Restore Defaults" class="liteoption" /><br /><br />' +
			'<input type="button" id="wbbsc-selectforum" value="Reset Quick Search Forum Dropdown" class="liteoption" /></td></tr>' +
			'');
			
		$("#wbbsc-save").click(function(){
			$.each(settingsPage, function(i, val){
				 setOption(val.name, $("#"+val.name).val() == "1");
			});
			$(this).attr("disabled", "disabled").attr("value", "Saved.");
			location.reload(false);
		});
		
		$("#wbbsc-default").click(function(){
			if(confirm(" - Warez-BB SuperCharged - \r\n\r\n     " +
					   "      Are you sure?")){
				setOption("welcome", false);
				location.reload(false);
			}
		});
		
		$("#wbbsc-selectforum").click(function(){				
			setString("selectforum", "");
			setOption("setselect", 0);						
			alert("Reset quick search dropdown contents successfully.\n\nPlease visit any topic to have this updated to reflect your current forum access.");			
		});
	}
	
	
	//gets used later so it's best that it's definied as a func now.
	var setupEvents = function(phail){
		//if(phail){
		//	phail = phail ? ".forumline > tbody > tr:last-child + tr:last-child + tr:lastchild"
		if(getOption("inlineedit")){
			$("a[href^='posting.php?mode=editpost']").each(function(){
				
				$(this).attr("phail", $(this).attr("href")).attr("href", "javascr"+"ipt:void('   hey there, this text is just here so the dark theme can find it ;)   ');")
				.attr("title", "WBB:SC Inline Edit").click(function(){
					
					$(this).hide().after("<span> Please wait... </span>");
					var postbody = $(this).parents("table:first").next();
					postbody.contents().find(".postbody_div").hide("slow")
					.after("<iframe src='"+$(this).attr("phail")+"' frameborder='0' width='100%' height='700' scrolling='auto' style='display: none' />");
					
					postbody.contents().find("iframe:first").load(function(){
						var fi = $(this).contents();
						//fi.find("span.genlarge").parents("tr[align='center']:first")
						fi.find("table[width='100%'][cellspacing='2'][cellpadding='2'][border='0']:first").hide().next().hide().siblings("div.gensmall, table").hide()
						.siblings("form").children("table:first").hide();
						fi.find("table.footerline, #wadio, #theToolTip, #loading, #header_error, input[name='preview']").hide();
						fi.find(".topbkg:first").hide().next().hide();
						fi.find(".bodyline, ").css({background: "transparent", border: "0"}).addClass("gaybodyline");
						fi.find("body").addClass("gaybody").css({background: $(this).parents("td:first").parents("td:first").css("background-color"), border: "0"});
						fi.find("input[name='notify']").parents("tr:first").after("<tr><td></td><td class='gensmall'>FYI: Refresh after posting to see what" +
								"everyone else sees - WBB:SC's BBCode parser is very good, but not an exact replica of PhpBB2's.</td></tr>");
						var src = $(this).attr("src");
						fi.find(".wbbsc-hide").after(" &nbsp;&nbsp;<input type='button' value='"+buttonText.cancel+"' class='liteoption' />").next().click(function(){
							fthatiframe(false, src);
						});
						
						fi.find("input[name='post']").hide().after("<input type='button' value='"+buttonText.edit+"' class='mainoption' />").next().click(function(){
							if ($(this).parents("form:first").contents().find("#message").val().length < 2){
								alert(" - Warez-BB: SuperCharged -\r\n\r\nYour message is empty ;-)");
								return false;
							}
							var form = /*$(this).parents("form:first").serialize()*/superSerialize($(this).parents("form:first").serializeArray());
							form['post']='Submit';		
							form['wbbsc']='1';
							$(this).attr("disabled", "disabled").attr("value", buttonText.edit2);
							var message = smiley(bbCode($(this).parents("form:first").contents().find("#message").val()));
							//alert(message);
							var buton = $(this);
							$.ajax({
								dataType: "text",
								cache: false,
								data: form,//fix(form+"&post=Submit"),
								url: "posting.php?wbbsc=1",
								type: "POST",
								timeout: 15000,
								success: function(data){
									//alert("uh hey");
									if(data.indexOf("successfully") > 0){
										//alert(buton.parents("iframe:first").length);
									//	alert(src);
										fthatiframe(message.replace(/\n/g, "<br />"), src);//buton.parents("iframe:first").siblings(".postbody_div").html(message).show("slow").siblings("iframe").hide("slow");
									} else {
										buton.attr("disabled", "").attr("value", buttonText.edit);
										alert(" - Warez-BB: SuperCharged -\r\n\r\nAn error occured when submitting your edit.\r\n\r\nIf this keeps recurring, try refreshing the entire page - your session may have expired.");
									}
								},
								error: function(){
									buton.attr("disabled", "").attr("value", buttonText.edit);
									alert("- Warez-BB: SuperCharged -\r\n\r\nAn error occured when communicating with Warez-BB.\r\n\r\nEither Warez-BB is lagging or your internet connection is faulty.");
								}
							});
						});
						// click thing has ended before these
						$(this).parents("table:first").prev().contents().find("a[title^='WBB:SC']").show().next().remove();
						$(this).show("slow");
					});
					
				});		
			});
		}
		/*
		if(getOption("inlinereport")){
			$("a[href^='./report.php']").each(function(){
				//$(this).attr("href", "./report.php?p=#");
				$(this).click(function(){
					debug($(this).parents("td.row1:first").parent().next().next().after(base64_decode(inlineReportHTML)).next()
						.children().children().attr("action", $(this).attr("href")).children().show("slow"));
					//;
					return false;
				});
			});
		}*/
		
		if(typeof phail == "undefined" || !phail){
			$("a[href*='posting.php?mode=quote']").each(function(){
				//$(this).before("<input style='vertical-align: bottom' class='wbbsc-quote liteoption' type='button' value='"+buttonText.quote+"' /> ");
				$(this).before("<a href='javascript:;' class='wbbsc-quote'><img class='imgtopic' alt='' src='http://i34.tinypic.com/30kf3h5.gif' border='0' /></a>");		
			});
			
			var quickQuote = function(){
				var txtarea = ad("message");		
				var buton = $(this);
				var name = $(this).parents("tr:first").parents("tr:first").children("td:first").children(".name").children("strong").text();
				
				var found = html2bb($(this).parents("tr:first").parents("tr:first").contents().find(".postbody_div").get(0));
				found = "[quote=\""+name+"\"]"+found+"[/quote]";
						
				if (txtarea.createTextRange && txtarea.caretPos){
					var caretPos = txtarea.caretPos;
					caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? caretPos.text + found + ' ' : caretPos.text + found;
				} else if (txtarea.selectionEnd && (txtarea.selectionStart | txtarea.selectionStart === 0)){ 
					mozInsert(txtarea, found, "");
				} else {
					txtarea.value += found;
				}
				window.scrollTo(0, 1000000);		
			};
			
			if(getOption("quickquote")){
				$(".wbbsc-quote").click(quickQuote);
			} else {
				$(".wbbsc-quote").hide();
			}
		}
			if(getOption("qqoverride")){
				$("a[href='posting.php?mode=quote']").attr("href", "javascript:void('posting.php?mode=quote <-- just there for the dark theme ;)   ');").click(quickQuote);
			}
	};
		
	
	if(page("viewtopic.php")){
		
		//alert($(".postbody_div:eq(3)").get(0).nodeName);
		//alert(convertHTMLtoBBCode("", $(".postbody_div:eq(3)").get(0)));
		
		
		$(".mainoption").removeClass('mainoption').addClass('liteoption');
		if(getOption('bigreply')){
			$("#message").css({height: "180px"});
		}
		
		if(getOption('quickimg')){
			$("input[accesskey='c']").after(" <input type='button' class='button' id='imgthing' value='Img' title='Thank WBB:SC for this :P' />");
			$("#imgthing").click(function(){
				mozInsert($("#message").get(0), "[img]", "[/img]");
			});
		}
		
		
		// IE doesn't like flash :(
		if(!$.browser.msie){
			$("img[src='http://i35.tinypic.com/2hnp66d.png']:lt(3)").hide().after('<br /><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
					' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="500" height="95">' +
					' <param name="movie" value="http://www.imageaddicts.net/images/4c02x00fprg2lflb3zaq.swf" />' +
					' <param name="quality" value="high" /> <param name="bgcolor" value="000000" /> <!--[if !IE]> <-->' +
					' <object data="http://www.imageaddicts.net/images/4c02x00fprg2lflb3zaq.swf" width="500" height="95" type="application/x-shockwave-flash">' +
					' <param name="quality" value="high" /> <param name="bgcolor" value="000000" /> <param name="pluginurl" value="http://www.adobe.com/go/getflashplayer" />' +
					' FAIL (the browser should render some flash content, not this). </object> <!--> <![endif]--></object>');
		}
		
		if(getString("selectforum") == null || !getOption("setselect")){
			alert(" - Warez-BB SuperCharged - \r\n\r\nWBB:SC will now learn what forums and subforums you have access to thanks to the handy Jump To dropdown " +
					"at the bottom of the page. Like the rest of WBB:SC's settings, it will be stored in a cookie so deleting your cookies will mean you will " +
					"have to do all this again.\r\n\r\nAssuming your cookies remain intact, you should never see this message again :)\r\n\r\n\r\nUpdate: " +
					"Firefox users need not worry about all this cookie crap. :D");
			setString("selectforum", $("select[name='f']").html().replace(/Select a forum/gi, "All forums").replace(/ selected="selected"/gi, ""));
			setOption("setselect", true);
			alert(" - Warez-BB SuperCharged - \r\n\r\nForum access learned successfully :D\r\n\r\nThe page will now refresh...");
			location.reload(false);
		}
		
		//run the event setup function definied above
		
		setupEvents();
		
		$("input[name='preview']").after(" <input type='hidden' name='post' value='Submit' />" +
				"<input class='wbbsc-submit mainoption' type='button' value='"+buttonText.submit+"' />" +
				" <input class='wbbsc-preview liteoption' type='button' value='"+buttonText.preview+"' />");
				
				
		
		//if(getOption('imgkk')){
				
		// forced on MUHAHAHAH
			
			$(".wbbsc-preview").after(" &nbsp;<span id='uploadholder'><span id='uploadbutton'></span></span><br /><input disabled='disabled' size='100' class='helpline' name='helpbox' type='text' />");
			$("#uploadholder").css({verticalAlign: "bottom"});
			
			var fz_sc = document.createElement("script");
			fz_sc.src = "http://code.jquery.com/jquery-latest.js";
			document.getElementsByTagName("head")[0].appendChild(fz_sc);
			
			var fz_sc2 = document.createElement("script");
			fz_sc2.innerHTML = base64_decode("dmFyIFNXRlVwbG9hZDtpZihTV0ZVcGxvYWQ9PXVuZGVmaW5lZCl7U1dGVXBsb2FkPWZ1bmN0aW9uKHNldHRpbmdzKXt0aGlzLmluaXRTV0ZVcGxvYWQoc2V0dGluZ3MpfX1TV0ZVcGxvYWQucHJvdG90eXBlLmluaXRTV0ZVcGxvYWQ9ZnVuY3Rpb24oc2V0dGluZ3Mpe3RyeXt0aGlzLmN1c3RvbVNldHRpbmdzPXt9O3RoaXMuc2V0dGluZ3M9c2V0dGluZ3M7dGhpcy5ldmVudFF1ZXVlPVtdO3RoaXMubW92aWVOYW1lPSJTV0ZVcGxvYWRfIitTV0ZVcGxvYWQubW92aWVDb3VudCsrO3RoaXMubW92aWVFbGVtZW50PW51bGw7U1dGVXBsb2FkLmluc3RhbmNlc1t0aGlzLm1vdmllTmFtZV09dGhpczt0aGlzLmluaXRTZXR0aW5ncygpO3RoaXMubG9hZEZsYXNoKCk7dGhpcy5kaXNwbGF5RGVidWdJbmZvKCl9Y2F0Y2goZXgpe2RlbGV0ZSBTV0ZVcGxvYWQuaW5zdGFuY2VzW3RoaXMubW92aWVOYW1lXTt0aHJvdyBleDt9fTtTV0ZVcGxvYWQuaW5zdGFuY2VzPXt9O1NXRlVwbG9hZC5tb3ZpZUNvdW50PTA7U1dGVXBsb2FkLnZlcnNpb249IjIuMi4wIEJldGEgMyI7U1dGVXBsb2FkLlFVRVVFX0VSUk9SPXtRVUVVRV9MSU1JVF9FWENFRURFRDotMTAwLEZJTEVfRVhDRUVEU19TSVpFX0xJTUlUOi0xMTAsWkVST19CWVRFX0ZJTEU6LTEyMCxJTlZBTElEX0ZJTEVUWVBFOi0xMzB9O1NXRlVwbG9hZC5VUExPQURfRVJST1I9e0hUVFBfRVJST1I6LTIwMCxNSVNTSU5HX1VQTE9BRF9VUkw6LTIxMCxJT19FUlJPUjotMjIwLFNFQ1VSSVRZX0VSUk9SOi0yMzAsVVBMT0FEX0xJTUlUX0VYQ0VFREVEOi0yNDAsVVBMT0FEX0ZBSUxFRDotMjUwLFNQRUNJRklFRF9GSUxFX0lEX05PVF9GT1VORDotMjYwLEZJTEVfVkFMSURBVElPTl9GQUlMRUQ6LTI3MCxGSUxFX0NBTkNFTExFRDotMjgwLFVQTE9BRF9TVE9QUEVEOi0yOTB9O1NXRlVwbG9hZC5GSUxFX1NUQVRVUz17UVVFVUVEOi0xLElOX1BST0dSRVNTOi0yLEVSUk9SOi0zLENPTVBMRVRFOi00LENBTkNFTExFRDotNX07U1dGVXBsb2FkLkJVVFRPTl9BQ1RJT049e1NFTEVDVF9GSUxFOi0xMDAsU0VMRUNUX0ZJTEVTOi0xMTAsU1RBUlRfVVBMT0FEOi0xMjB9O1NXRlVwbG9hZC5DVVJTT1I9e0FSUk9XOi0xLEhBTkQ6LTJ9O1NXRlVwbG9hZC5XSU5ET1dfTU9ERT17V0lORE9XOiJ3aW5kb3ciLFRSQU5TUEFSRU5UOiJ0cmFuc3BhcmVudCIsT1BBUVVFOiJvcGFxdWUifTtTV0ZVcGxvYWQucHJvdG90eXBlLmluaXRTZXR0aW5ncz1mdW5jdGlvbigpe3RoaXMuZW5zdXJlRGVmYXVsdD1mdW5jdGlvbihzZXR0aW5nTmFtZSxkZWZhdWx0VmFsdWUpe3RoaXMuc2V0dGluZ3Nbc2V0dGluZ05hbWVdPSh0aGlzLnNldHRpbmdzW3NldHRpbmdOYW1lXT09dW5kZWZpbmVkKT9kZWZhdWx0VmFsdWU6dGhpcy5zZXR0aW5nc1tzZXR0aW5nTmFtZV19O3RoaXMuZW5zdXJlRGVmYXVsdCgidXBsb2FkX3VybCIsIiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9wb3N0X25hbWUiLCJGaWxlZGF0YSIpO3RoaXMuZW5zdXJlRGVmYXVsdCgicG9zdF9wYXJhbXMiLHt9KTt0aGlzLmVuc3VyZURlZmF1bHQoInVzZV9xdWVyeV9zdHJpbmciLGZhbHNlKTt0aGlzLmVuc3VyZURlZmF1bHQoInJlcXVldWVfb25fZXJyb3IiLGZhbHNlKTt0aGlzLmVuc3VyZURlZmF1bHQoImh0dHBfc3VjY2VzcyIsW10pO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV90eXBlcyIsIiouKiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV90eXBlc19kZXNjcmlwdGlvbiIsIkFsbCBGaWxlcyIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9zaXplX2xpbWl0IiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfdXBsb2FkX2xpbWl0IiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfcXVldWVfbGltaXQiLDApO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmxhc2hfdXJsIiwic3dmdXBsb2FkLnN3ZiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgicHJldmVudF9zd2ZfY2FjaGluZyIsZmFsc2UpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX2ltYWdlX3VybCIsIiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX3dpZHRoIiwxKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl9oZWlnaHQiLDEpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX3RleHQiLCIiKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl90ZXh0X3N0eWxlIiwiY29sb3I6ICMwMDAwMDA7IGZvbnQtc2l6ZTogMTZwdDsiKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl90ZXh0X3RvcF9wYWRkaW5nIiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl90ZXh0X2xlZnRfcGFkZGluZyIsMCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fYWN0aW9uIixTV0ZVcGxvYWQuQlVUVE9OX0FDVElPTi5TRUxFQ1RfRklMRVMpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX2Rpc2FibGVkIixmYWxzZSk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fcGxhY2Vob2xkZXJfaWQiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX2N1cnNvciIsU1dGVXBsb2FkLkNVUlNPUi5BUlJPVyk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fd2luZG93X21vZGUiLFNXRlVwbG9hZC5XSU5ET1dfTU9ERS5XSU5ET1cpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZGVidWciLGZhbHNlKTt0aGlzLnNldHRpbmdzLmRlYnVnX2VuYWJsZWQ9dGhpcy5zZXR0aW5ncy5kZWJ1Zzt0aGlzLnNldHRpbmdzLnJldHVybl91cGxvYWRfc3RhcnRfaGFuZGxlcj10aGlzLnJldHVyblVwbG9hZFN0YXJ0O3RoaXMuZW5zdXJlRGVmYXVsdCgic3dmdXBsb2FkX2xvYWRlZF9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfZGlhbG9nX3N0YXJ0X2hhbmRsZXIiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9xdWV1ZWRfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJmaWxlX3F1ZXVlX2Vycm9yX2hhbmRsZXIiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9kaWFsb2dfY29tcGxldGVfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJ1cGxvYWRfc3RhcnRfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJ1cGxvYWRfcHJvZ3Jlc3NfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJ1cGxvYWRfZXJyb3JfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJ1cGxvYWRfc3VjY2Vzc19oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoInVwbG9hZF9jb21wbGV0ZV9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoImRlYnVnX2hhbmRsZXIiLHRoaXMuZGVidWdNZXNzYWdlKTt0aGlzLmVuc3VyZURlZmF1bHQoImN1c3RvbV9zZXR0aW5ncyIse30pO3RoaXMuY3VzdG9tU2V0dGluZ3M9dGhpcy5zZXR0aW5ncy5jdXN0b21fc2V0dGluZ3M7aWYodGhpcy5zZXR0aW5ncy5wcmV2ZW50X3N3Zl9jYWNoaW5nJiZmYWxzZSl7dGhpcy5zZXR0aW5ncy5mbGFzaF91cmw9dGhpcy5zZXR0aW5ncy5mbGFzaF91cmw7fWRlbGV0ZSB0aGlzLmVuc3VyZURlZmF1bHR9O1NXRlVwbG9hZC5wcm90b3R5cGUubG9hZEZsYXNoPWZ1bmN0aW9uKCl7aWYodGhpcy5zZXR0aW5ncy5idXR0b25fcGxhY2Vob2xkZXJfaWQhPT0iIil7dGhpcy5yZXBsYWNlV2l0aEZsYXNoKCl9ZWxzZXt0aGlzLmFwcGVuZEZsYXNoKCl9fTtTV0ZVcGxvYWQucHJvdG90eXBlLmFwcGVuZEZsYXNoPWZ1bmN0aW9uKCl7dmFyIHRhcmdldEVsZW1lbnQsY29udGFpbmVyO2lmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubW92aWVOYW1lKSE9PW51bGwpe3Rocm93IklEICIrdGhpcy5tb3ZpZU5hbWUrIiBpcyBhbHJlYWR5IGluIHVzZS4gVGhlIEZsYXNoIE9iamVjdCBjb3VsZCBub3QgYmUgYWRkZWQiO310YXJnZXRFbGVtZW50PWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCJib2R5IilbMF07aWYodGFyZ2V0RWxlbWVudD09dW5kZWZpbmVkKXt0aHJvdyJDb3VsZCBub3QgZmluZCB0aGUgJ2JvZHknIGVsZW1lbnQuIjt9Y29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImRpdiIpO2NvbnRhaW5lci5zdHlsZS53aWR0aD0iMXB4Ijtjb250YWluZXIuc3R5bGUuaGVpZ2h0PSIxcHgiO2NvbnRhaW5lci5zdHlsZS5vdmVyZmxvdz0iaGlkZGVuIjt0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7Y29udGFpbmVyLmlubmVySFRNTD10aGlzLmdldEZsYXNoSFRNTCgpO2lmKHdpbmRvd1t0aGlzLm1vdmllTmFtZV09PXVuZGVmaW5lZCl7d2luZG93W3RoaXMubW92aWVOYW1lXT10aGlzLmdldE1vdmllRWxlbWVudCgpfX07U1dGVXBsb2FkLnByb3RvdHlwZS5yZXBsYWNlV2l0aEZsYXNoPWZ1bmN0aW9uKCl7dmFyIHRhcmdldEVsZW1lbnQsdGVtcFBhcmVudDtpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLm1vdmllTmFtZSkhPT1udWxsKXt0aHJvdyJJRCAiK3RoaXMubW92aWVOYW1lKyIgaXMgYWxyZWFkeSBpbiB1c2UuIFRoZSBGbGFzaCBPYmplY3QgY291bGQgbm90IGJlIGFkZGVkIjt9dGFyZ2V0RWxlbWVudD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmJ1dHRvbl9wbGFjZWhvbGRlcl9pZCk7aWYodGFyZ2V0RWxlbWVudD09dW5kZWZpbmVkKXt0aHJvdyJDb3VsZCBub3QgZmluZCB0aGUgcGxhY2Vob2xkZXIgZWxlbWVudC4iO310ZW1wUGFyZW50PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImRpdiIpO3RlbXBQYXJlbnQuaW5uZXJIVE1MPXRoaXMuZ2V0Rmxhc2hIVE1MKCk7dGFyZ2V0RWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0ZW1wUGFyZW50LmZpcnN0Q2hpbGQsdGFyZ2V0RWxlbWVudCk7aWYod2luZG93W3RoaXMubW92aWVOYW1lXT09dW5kZWZpbmVkKXt3aW5kb3dbdGhpcy5tb3ZpZU5hbWVdPXRoaXMuZ2V0TW92aWVFbGVtZW50KCl9fTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldEZsYXNoSFRNTD1mdW5jdGlvbigpe3JldHVyblsnPG9iamVjdCBpZD0iJyx0aGlzLm1vdmllTmFtZSwnIiB0eXBlPSJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCIgZGF0YT0iJyx0aGlzLnNldHRpbmdzLmZsYXNoX3VybCwnIiB3aWR0aD0iJyx0aGlzLnNldHRpbmdzLmJ1dHRvbl93aWR0aCwnIiBoZWlnaHQ9IicsdGhpcy5zZXR0aW5ncy5idXR0b25faGVpZ2h0LCciIGNsYXNzPSJzd2Z1cGxvYWQiPicsJzxwYXJhbSBuYW1lPSJ3bW9kZSIgdmFsdWU9IicsdGhpcy5zZXR0aW5ncy5idXR0b25fd2luZG93X21vZGUsJyIgLz4nLCc8cGFyYW0gbmFtZT0ibW92aWUiIHZhbHVlPSInLHRoaXMuc2V0dGluZ3MuZmxhc2hfdXJsLCciIC8+JywnPHBhcmFtIG5hbWU9InF1YWxpdHkiIHZhbHVlPSJoaWdoIiAvPicsJzxwYXJhbSBuYW1lPSJtZW51IiB2YWx1ZT0iZmFsc2UiIC8+JywnPHBhcmFtIG5hbWU9ImFsbG93U2NyaXB0QWNjZXNzIiB2YWx1ZT0iYWx3YXlzIiAvPicsJzxwYXJhbSBuYW1lPSJmbGFzaHZhcnMiIHZhbHVlPSInK3RoaXMuZ2V0Rmxhc2hWYXJzKCkrJyIgLz4nLCc8L29iamVjdD4nXS5qb2luKCIiKX07U1dGVXBsb2FkLnByb3RvdHlwZS5nZXRGbGFzaFZhcnM9ZnVuY3Rpb24oKXt2YXIgcGFyYW1TdHJpbmc9dGhpcy5idWlsZFBhcmFtU3RyaW5nKCk7dmFyIGh0dHBTdWNjZXNzU3RyaW5nPXRoaXMuc2V0dGluZ3MuaHR0cF9zdWNjZXNzLmpvaW4oIiwiKTtyZXR1cm5bIm1vdmllTmFtZT0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLm1vdmllTmFtZSksIiZ1cGxvYWRVUkw9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy51cGxvYWRfdXJsKSwiJnVzZVF1ZXJ5U3RyaW5nPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MudXNlX3F1ZXJ5X3N0cmluZyksIiZyZXF1ZXVlT25FcnJvcj0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLnJlcXVldWVfb25fZXJyb3IpLCImaHR0cFN1Y2Nlc3M9IixlbmNvZGVVUklDb21wb25lbnQoaHR0cFN1Y2Nlc3NTdHJpbmcpLCImcGFyYW1zPSIsZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtU3RyaW5nKSwiJmZpbGVQb3N0TmFtZT0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmZpbGVfcG9zdF9uYW1lKSwiJmZpbGVUeXBlcz0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmZpbGVfdHlwZXMpLCImZmlsZVR5cGVzRGVzY3JpcHRpb249IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5maWxlX3R5cGVzX2Rlc2NyaXB0aW9uKSwiJmZpbGVTaXplTGltaXQ9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5maWxlX3NpemVfbGltaXQpLCImZmlsZVVwbG9hZExpbWl0PSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZmlsZV91cGxvYWRfbGltaXQpLCImZmlsZVF1ZXVlTGltaXQ9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5maWxlX3F1ZXVlX2xpbWl0KSwiJmRlYnVnRW5hYmxlZD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmRlYnVnX2VuYWJsZWQpLCImYnV0dG9uSW1hZ2VVUkw9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5idXR0b25faW1hZ2VfdXJsKSwiJmJ1dHRvbldpZHRoPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX3dpZHRoKSwiJmJ1dHRvbkhlaWdodD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl9oZWlnaHQpLCImYnV0dG9uVGV4dD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0KSwiJmJ1dHRvblRleHRUb3BQYWRkaW5nPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfdG9wX3BhZGRpbmcpLCImYnV0dG9uVGV4dExlZnRQYWRkaW5nPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfbGVmdF9wYWRkaW5nKSwiJmJ1dHRvblRleHRTdHlsZT0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3N0eWxlKSwiJmJ1dHRvbkFjdGlvbj0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl9hY3Rpb24pLCImYnV0dG9uRGlzYWJsZWQ9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5idXR0b25fZGlzYWJsZWQpLCImYnV0dG9uQ3Vyc29yPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX2N1cnNvcildLmpvaW4oIiIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldE1vdmllRWxlbWVudD1mdW5jdGlvbigpe2lmKHRoaXMubW92aWVFbGVtZW50PT11bmRlZmluZWQpe3RoaXMubW92aWVFbGVtZW50PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubW92aWVOYW1lKX1pZih0aGlzLm1vdmllRWxlbWVudD09PW51bGwpe3Rocm93IkNvdWxkIG5vdCBmaW5kIEZsYXNoIGVsZW1lbnQiO31yZXR1cm4gdGhpcy5tb3ZpZUVsZW1lbnR9O1NXRlVwbG9hZC5wcm90b3R5cGUuYnVpbGRQYXJhbVN0cmluZz1mdW5jdGlvbigpe3ZhciBwb3N0UGFyYW1zPXRoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXM7dmFyIHBhcmFtU3RyaW5nUGFpcnM9W107aWYodHlwZW9mKHBvc3RQYXJhbXMpPT09Im9iamVjdCIpe2Zvcih2YXIgbmFtZSBpbiBwb3N0UGFyYW1zKXtpZihwb3N0UGFyYW1zLmhhc093blByb3BlcnR5KG5hbWUpKXtwYXJhbVN0cmluZ1BhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUudG9TdHJpbmcoKSkrIj0iK2VuY29kZVVSSUNvbXBvbmVudChwb3N0UGFyYW1zW25hbWVdLnRvU3RyaW5nKCkpKX19fXJldHVybiBwYXJhbVN0cmluZ1BhaXJzLmpvaW4oIiYiKX07U1dGVXBsb2FkLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dHJ5e3RoaXMuY2FuY2VsVXBsb2FkKG51bGwsZmFsc2UpO3ZhciBtb3ZpZUVsZW1lbnQ9bnVsbDttb3ZpZUVsZW1lbnQ9dGhpcy5nZXRNb3ZpZUVsZW1lbnQoKTtpZihtb3ZpZUVsZW1lbnQpe2Zvcih2YXIgaSBpbiBtb3ZpZUVsZW1lbnQpe3RyeXtpZih0eXBlb2YobW92aWVFbGVtZW50W2ldKT09PSJmdW5jdGlvbiIpe21vdmllRWxlbWVudFtpXT1udWxsfX1jYXRjaChleDEpe319dHJ5e21vdmllRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1vdmllRWxlbWVudCl9Y2F0Y2goZXgpe319d2luZG93W3RoaXMubW92aWVOYW1lXT1udWxsO1NXRlVwbG9hZC5pbnN0YW5jZXNbdGhpcy5tb3ZpZU5hbWVdPW51bGw7ZGVsZXRlIFNXRlVwbG9hZC5pbnN0YW5jZXNbdGhpcy5tb3ZpZU5hbWVdO3RoaXMubW92aWVFbGVtZW50PW51bGw7dGhpcy5zZXR0aW5ncz1udWxsO3RoaXMuY3VzdG9tU2V0dGluZ3M9bnVsbDt0aGlzLmV2ZW50UXVldWU9bnVsbDt0aGlzLm1vdmllTmFtZT1udWxsO3JldHVybiB0cnVlfWNhdGNoKGV4MSl7cmV0dXJuIGZhbHNlfX07U1dGVXBsb2FkLnByb3RvdHlwZS5kaXNwbGF5RGVidWdJbmZvPWZ1bmN0aW9uKCl7dGhpcy5kZWJ1ZyhbIi0tLVNXRlVwbG9hZCBJbnN0YW5jZSBJbmZvLS0tXG4iLCJWZXJzaW9uOiAiLFNXRlVwbG9hZC52ZXJzaW9uLCJcbiIsIk1vdmllIE5hbWU6ICIsdGhpcy5tb3ZpZU5hbWUsIlxuIiwiU2V0dGluZ3M6XG4iLCJcdCIsInVwbG9hZF91cmw6ICAgICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLnVwbG9hZF91cmwsIlxuIiwiXHQiLCJmbGFzaF91cmw6ICAgICAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5mbGFzaF91cmwsIlxuIiwiXHQiLCJ1c2VfcXVlcnlfc3RyaW5nOiAgICAgICAgICIsdGhpcy5zZXR0aW5ncy51c2VfcXVlcnlfc3RyaW5nLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJyZXF1ZXVlX29uX2Vycm9yOiAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5yZXF1ZXVlX29uX2Vycm9yLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJodHRwX3N1Y2Nlc3M6ICAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5odHRwX3N1Y2Nlc3Muam9pbigiLCAiKSwiXG4iLCJcdCIsImZpbGVfcG9zdF9uYW1lOiAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLmZpbGVfcG9zdF9uYW1lLCJcbiIsIlx0IiwicG9zdF9wYXJhbXM6ICAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXMudG9TdHJpbmcoKSwiXG4iLCJcdCIsImZpbGVfdHlwZXM6ICAgICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLmZpbGVfdHlwZXMsIlxuIiwiXHQiLCJmaWxlX3R5cGVzX2Rlc2NyaXB0aW9uOiAgICIsdGhpcy5zZXR0aW5ncy5maWxlX3R5cGVzX2Rlc2NyaXB0aW9uLCJcbiIsIlx0IiwiZmlsZV9zaXplX2xpbWl0OiAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuZmlsZV9zaXplX2xpbWl0LCJcbiIsIlx0IiwiZmlsZV91cGxvYWRfbGltaXQ6ICAgICAgICAiLHRoaXMuc2V0dGluZ3MuZmlsZV91cGxvYWRfbGltaXQsIlxuIiwiXHQiLCJmaWxlX3F1ZXVlX2xpbWl0OiAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5maWxlX3F1ZXVlX2xpbWl0LCJcbiIsIlx0IiwiZGVidWc6ICAgICAgICAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuZGVidWcudG9TdHJpbmcoKSwiXG4iLCJcdCIsInByZXZlbnRfc3dmX2NhY2hpbmc6ICAgICAgIix0aGlzLnNldHRpbmdzLnByZXZlbnRfc3dmX2NhY2hpbmcudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl9wbGFjZWhvbGRlcl9pZDogICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl9wbGFjZWhvbGRlcl9pZC50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX2ltYWdlX3VybDogICAgICAgICAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX2ltYWdlX3VybC50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX3dpZHRoOiAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX3dpZHRoLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25faGVpZ2h0OiAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5idXR0b25faGVpZ2h0LnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fdGV4dDogICAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dC50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX3RleHRfc3R5bGU6ICAgICAgICAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfc3R5bGUudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl90ZXh0X3RvcF9wYWRkaW5nOiAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3RvcF9wYWRkaW5nLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fdGV4dF9sZWZ0X3BhZGRpbmc6ICIsdGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dF9sZWZ0X3BhZGRpbmcudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl9hY3Rpb246ICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl9hY3Rpb24udG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl9kaXNhYmxlZDogICAgICAgICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl9kaXNhYmxlZC50b1N0cmluZygpLCJcbiIsIlx0IiwiY3VzdG9tX3NldHRpbmdzOiAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuY3VzdG9tX3NldHRpbmdzLnRvU3RyaW5nKCksIlxuIiwiRXZlbnQgSGFuZGxlcnM6XG4iLCJcdCIsInN3ZnVwbG9hZF9sb2FkZWRfaGFuZGxlciBhc3NpZ25lZDogICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnN3ZnVwbG9hZF9sb2FkZWRfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJmaWxlX2RpYWxvZ19zdGFydF9oYW5kbGVyIGFzc2lnbmVkOiAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy5maWxlX2RpYWxvZ19zdGFydF9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsImZpbGVfcXVldWVkX2hhbmRsZXIgYXNzaWduZWQ6ICAgICAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLmZpbGVfcXVldWVkX2hhbmRsZXI9PT0iZnVuY3Rpb24iKS50b1N0cmluZygpLCJcbiIsIlx0IiwiZmlsZV9xdWV1ZV9lcnJvcl9oYW5kbGVyIGFzc2lnbmVkOiAgIiwodHlwZW9mIHRoaXMuc2V0dGluZ3MuZmlsZV9xdWV1ZV9lcnJvcl9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsInVwbG9hZF9zdGFydF9oYW5kbGVyIGFzc2lnbmVkOiAgICAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnVwbG9hZF9zdGFydF9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsInVwbG9hZF9wcm9ncmVzc19oYW5kbGVyIGFzc2lnbmVkOiAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnVwbG9hZF9wcm9ncmVzc19oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsInVwbG9hZF9lcnJvcl9oYW5kbGVyIGFzc2lnbmVkOiAgICAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnVwbG9hZF9lcnJvcl9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsInVwbG9hZF9zdWNjZXNzX2hhbmRsZXIgYXNzaWduZWQ6ICAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnVwbG9hZF9zdWNjZXNzX2hhbmRsZXI9PT0iZnVuY3Rpb24iKS50b1N0cmluZygpLCJcbiIsIlx0IiwidXBsb2FkX2NvbXBsZXRlX2hhbmRsZXIgYXNzaWduZWQ6ICAgIiwodHlwZW9mIHRoaXMuc2V0dGluZ3MudXBsb2FkX2NvbXBsZXRlX2hhbmRsZXI9PT0iZnVuY3Rpb24iKS50b1N0cmluZygpLCJcbiIsIlx0IiwiZGVidWdfaGFuZGxlciBhc3NpZ25lZDogICAgICAgICAgICAgIiwodHlwZW9mIHRoaXMuc2V0dGluZ3MuZGVidWdfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIl0uam9pbigiIikpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmFkZFNldHRpbmc9ZnVuY3Rpb24obmFtZSx2YWx1ZSxkZWZhdWx0X3ZhbHVlKXtpZih2YWx1ZT09dW5kZWZpbmVkKXtyZXR1cm4odGhpcy5zZXR0aW5nc1tuYW1lXT1kZWZhdWx0X3ZhbHVlKX1lbHNle3JldHVybih0aGlzLnNldHRpbmdzW25hbWVdPXZhbHVlKX19O1NXRlVwbG9hZC5wcm90b3R5cGUuZ2V0U2V0dGluZz1mdW5jdGlvbihuYW1lKXtpZih0aGlzLnNldHRpbmdzW25hbWVdIT11bmRlZmluZWQpe3JldHVybiB0aGlzLnNldHRpbmdzW25hbWVdfXJldHVybiIifTtTV0ZVcGxvYWQucHJvdG90eXBlLmNhbGxGbGFzaD1mdW5jdGlvbihmdW5jdGlvbk5hbWUsYXJndW1lbnRBcnJheSl7YXJndW1lbnRBcnJheT1hcmd1bWVudEFycmF5fHxbXTt2YXIgbW92aWVFbGVtZW50PXRoaXMuZ2V0TW92aWVFbGVtZW50KCk7dmFyIHJldHVyblZhbHVlLHJldHVyblN0cmluZzt0cnl7cmV0dXJuU3RyaW5nPW1vdmllRWxlbWVudC5DYWxsRnVuY3Rpb24oJzxpbnZva2UgbmFtZT0iJytmdW5jdGlvbk5hbWUrJyIgcmV0dXJudHlwZT0iamF2YXNjcmlwdCI+JytfX2ZsYXNoX19hcmd1bWVudHNUb1hNTChhcmd1bWVudEFycmF5LDApKyc8L2ludm9rZT4nKTtyZXR1cm5WYWx1ZT1ldmFsKHJldHVyblN0cmluZyl9Y2F0Y2goZXgpe3Rocm93IkNhbGwgdG8gIitmdW5jdGlvbk5hbWUrIiBmYWlsZWQiO31pZihyZXR1cm5WYWx1ZSE9dW5kZWZpbmVkJiZ0eXBlb2YgcmV0dXJuVmFsdWUucG9zdD09PSJvYmplY3QiKXtyZXR1cm5WYWx1ZT10aGlzLnVuZXNjYXBlRmlsZVBvc3RQYXJhbXMocmV0dXJuVmFsdWUpfXJldHVybiByZXR1cm5WYWx1ZX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZWxlY3RGaWxlPWZ1bmN0aW9uKCl7dGhpcy5jYWxsRmxhc2goIlNlbGVjdEZpbGUiKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZWxlY3RGaWxlcz1mdW5jdGlvbigpe3RoaXMuY2FsbEZsYXNoKCJTZWxlY3RGaWxlcyIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLnN0YXJ0VXBsb2FkPWZ1bmN0aW9uKGZpbGVJRCl7dGhpcy5jYWxsRmxhc2goIlN0YXJ0VXBsb2FkIixbZmlsZUlEXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuY2FuY2VsVXBsb2FkPWZ1bmN0aW9uKGZpbGVJRCx0cmlnZ2VyRXJyb3JFdmVudCl7aWYodHJpZ2dlckVycm9yRXZlbnQhPT1mYWxzZSl7dHJpZ2dlckVycm9yRXZlbnQ9dHJ1ZX10aGlzLmNhbGxGbGFzaCgiQ2FuY2VsVXBsb2FkIixbZmlsZUlELHRyaWdnZXJFcnJvckV2ZW50XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc3RvcFVwbG9hZD1mdW5jdGlvbigpe3RoaXMuY2FsbEZsYXNoKCJTdG9wVXBsb2FkIil9O1NXRlVwbG9hZC5wcm90b3R5cGUuZ2V0U3RhdHM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jYWxsRmxhc2goIkdldFN0YXRzIil9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0U3RhdHM9ZnVuY3Rpb24oc3RhdHNPYmplY3Qpe3RoaXMuY2FsbEZsYXNoKCJTZXRTdGF0cyIsW3N0YXRzT2JqZWN0XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuZ2V0RmlsZT1mdW5jdGlvbihmaWxlSUQpe2lmKHR5cGVvZihmaWxlSUQpPT09Im51bWJlciIpe3JldHVybiB0aGlzLmNhbGxGbGFzaCgiR2V0RmlsZUJ5SW5kZXgiLFtmaWxlSURdKX1lbHNle3JldHVybiB0aGlzLmNhbGxGbGFzaCgiR2V0RmlsZSIsW2ZpbGVJRF0pfX07U1dGVXBsb2FkLnByb3RvdHlwZS5hZGRGaWxlUGFyYW09ZnVuY3Rpb24oZmlsZUlELG5hbWUsdmFsdWUpe3JldHVybiB0aGlzLmNhbGxGbGFzaCgiQWRkRmlsZVBhcmFtIixbZmlsZUlELG5hbWUsdmFsdWVdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5yZW1vdmVGaWxlUGFyYW09ZnVuY3Rpb24oZmlsZUlELG5hbWUpe3RoaXMuY2FsbEZsYXNoKCJSZW1vdmVGaWxlUGFyYW0iLFtmaWxlSUQsbmFtZV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldFVwbG9hZFVSTD1mdW5jdGlvbih1cmwpe3RoaXMuc2V0dGluZ3MudXBsb2FkX3VybD11cmwudG9TdHJpbmcoKTt0aGlzLmNhbGxGbGFzaCgiU2V0VXBsb2FkVVJMIixbdXJsXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0UG9zdFBhcmFtcz1mdW5jdGlvbihwYXJhbXNPYmplY3Qpe3RoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXM9cGFyYW1zT2JqZWN0O3RoaXMuY2FsbEZsYXNoKCJTZXRQb3N0UGFyYW1zIixbcGFyYW1zT2JqZWN0XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuYWRkUG9zdFBhcmFtPWZ1bmN0aW9uKG5hbWUsdmFsdWUpe3RoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXNbbmFtZV09dmFsdWU7dGhpcy5jYWxsRmxhc2goIlNldFBvc3RQYXJhbXMiLFt0aGlzLnNldHRpbmdzLnBvc3RfcGFyYW1zXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUucmVtb3ZlUG9zdFBhcmFtPWZ1bmN0aW9uKG5hbWUpe2RlbGV0ZSB0aGlzLnNldHRpbmdzLnBvc3RfcGFyYW1zW25hbWVdO3RoaXMuY2FsbEZsYXNoKCJTZXRQb3N0UGFyYW1zIixbdGhpcy5zZXR0aW5ncy5wb3N0X3BhcmFtc10pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEZpbGVUeXBlcz1mdW5jdGlvbih0eXBlcyxkZXNjcmlwdGlvbil7dGhpcy5zZXR0aW5ncy5maWxlX3R5cGVzPXR5cGVzO3RoaXMuc2V0dGluZ3MuZmlsZV90eXBlc19kZXNjcmlwdGlvbj1kZXNjcmlwdGlvbjt0aGlzLmNhbGxGbGFzaCgiU2V0RmlsZVR5cGVzIixbdHlwZXMsZGVzY3JpcHRpb25dKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRGaWxlU2l6ZUxpbWl0PWZ1bmN0aW9uKGZpbGVTaXplTGltaXQpe3RoaXMuc2V0dGluZ3MuZmlsZV9zaXplX2xpbWl0PWZpbGVTaXplTGltaXQ7dGhpcy5jYWxsRmxhc2goIlNldEZpbGVTaXplTGltaXQiLFtmaWxlU2l6ZUxpbWl0XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0RmlsZVVwbG9hZExpbWl0PWZ1bmN0aW9uKGZpbGVVcGxvYWRMaW1pdCl7dGhpcy5zZXR0aW5ncy5maWxlX3VwbG9hZF9saW1pdD1maWxlVXBsb2FkTGltaXQ7dGhpcy5jYWxsRmxhc2goIlNldEZpbGVVcGxvYWRMaW1pdCIsW2ZpbGVVcGxvYWRMaW1pdF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEZpbGVRdWV1ZUxpbWl0PWZ1bmN0aW9uKGZpbGVRdWV1ZUxpbWl0KXt0aGlzLnNldHRpbmdzLmZpbGVfcXVldWVfbGltaXQ9ZmlsZVF1ZXVlTGltaXQ7dGhpcy5jYWxsRmxhc2goIlNldEZpbGVRdWV1ZUxpbWl0IixbZmlsZVF1ZXVlTGltaXRdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRGaWxlUG9zdE5hbWU9ZnVuY3Rpb24oZmlsZVBvc3ROYW1lKXt0aGlzLnNldHRpbmdzLmZpbGVfcG9zdF9uYW1lPWZpbGVQb3N0TmFtZTt0aGlzLmNhbGxGbGFzaCgiU2V0RmlsZVBvc3ROYW1lIixbZmlsZVBvc3ROYW1lXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0VXNlUXVlcnlTdHJpbmc9ZnVuY3Rpb24odXNlUXVlcnlTdHJpbmcpe3RoaXMuc2V0dGluZ3MudXNlX3F1ZXJ5X3N0cmluZz11c2VRdWVyeVN0cmluZzt0aGlzLmNhbGxGbGFzaCgiU2V0VXNlUXVlcnlTdHJpbmciLFt1c2VRdWVyeVN0cmluZ10pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldFJlcXVldWVPbkVycm9yPWZ1bmN0aW9uKHJlcXVldWVPbkVycm9yKXt0aGlzLnNldHRpbmdzLnJlcXVldWVfb25fZXJyb3I9cmVxdWV1ZU9uRXJyb3I7dGhpcy5jYWxsRmxhc2goIlNldFJlcXVldWVPbkVycm9yIixbcmVxdWV1ZU9uRXJyb3JdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRIVFRQU3VjY2Vzcz1mdW5jdGlvbihodHRwX3N0YXR1c19jb2Rlcyl7aWYodHlwZW9mIGh0dHBfc3RhdHVzX2NvZGVzPT09InN0cmluZyIpe2h0dHBfc3RhdHVzX2NvZGVzPWh0dHBfc3RhdHVzX2NvZGVzLnJlcGxhY2UoIiAiLCIiKS5zcGxpdCgiLCIpfXRoaXMuc2V0dGluZ3MuaHR0cF9zdWNjZXNzPWh0dHBfc3RhdHVzX2NvZGVzO3RoaXMuY2FsbEZsYXNoKCJTZXRIVFRQU3VjY2VzcyIsW2h0dHBfc3RhdHVzX2NvZGVzXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0RGVidWdFbmFibGVkPWZ1bmN0aW9uKGRlYnVnRW5hYmxlZCl7dGhpcy5zZXR0aW5ncy5kZWJ1Z19lbmFibGVkPWRlYnVnRW5hYmxlZDt0aGlzLmNhbGxGbGFzaCgiU2V0RGVidWdFbmFibGVkIixbZGVidWdFbmFibGVkXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uSW1hZ2VVUkw9ZnVuY3Rpb24oYnV0dG9uSW1hZ2VVUkwpe2lmKGJ1dHRvbkltYWdlVVJMPT11bmRlZmluZWQpe2J1dHRvbkltYWdlVVJMPSIifXRoaXMuc2V0dGluZ3MuYnV0dG9uX2ltYWdlX3VybD1idXR0b25JbWFnZVVSTDt0aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uSW1hZ2VVUkwiLFtidXR0b25JbWFnZVVSTF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvbkRpbWVuc2lvbnM9ZnVuY3Rpb24od2lkdGgsaGVpZ2h0KXt0aGlzLnNldHRpbmdzLmJ1dHRvbl93aWR0aD13aWR0aDt0aGlzLnNldHRpbmdzLmJ1dHRvbl9oZWlnaHQ9aGVpZ2h0O3ZhciBtb3ZpZT10aGlzLmdldE1vdmllRWxlbWVudCgpO2lmKG1vdmllIT11bmRlZmluZWQpe21vdmllLnN0eWxlLndpZHRoPXdpZHRoKyJweCI7bW92aWUuc3R5bGUuaGVpZ2h0PWhlaWdodCsicHgifXRoaXMuY2FsbEZsYXNoKCJTZXRCdXR0b25EaW1lbnNpb25zIixbd2lkdGgsaGVpZ2h0XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uVGV4dD1mdW5jdGlvbihodG1sKXt0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0PWh0bWw7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvblRleHQiLFtodG1sXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uVGV4dFBhZGRpbmc9ZnVuY3Rpb24obGVmdCx0b3Ape3RoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfdG9wX3BhZGRpbmc9dG9wO3RoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfbGVmdF9wYWRkaW5nPWxlZnQ7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvblRleHRQYWRkaW5nIixbbGVmdCx0b3BdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRCdXR0b25UZXh0U3R5bGU9ZnVuY3Rpb24oY3NzKXt0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3N0eWxlPWNzczt0aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uVGV4dFN0eWxlIixbY3NzXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uRGlzYWJsZWQ9ZnVuY3Rpb24oaXNEaXNhYmxlZCl7dGhpcy5zZXR0aW5ncy5idXR0b25fZGlzYWJsZWQ9aXNEaXNhYmxlZDt0aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uRGlzYWJsZWQiLFtpc0Rpc2FibGVkXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uQWN0aW9uPWZ1bmN0aW9uKGJ1dHRvbkFjdGlvbil7dGhpcy5zZXR0aW5ncy5idXR0b25fYWN0aW9uPWJ1dHRvbkFjdGlvbjt0aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uQWN0aW9uIixbYnV0dG9uQWN0aW9uXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uQ3Vyc29yPWZ1bmN0aW9uKGN1cnNvcil7dGhpcy5zZXR0aW5ncy5idXR0b25fY3Vyc29yPWN1cnNvcjt0aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uQ3Vyc29yIixbY3Vyc29yXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUucXVldWVFdmVudD1mdW5jdGlvbihoYW5kbGVyTmFtZSxhcmd1bWVudEFycmF5KXtpZihhcmd1bWVudEFycmF5PT11bmRlZmluZWQpe2FyZ3VtZW50QXJyYXk9W119ZWxzZSBpZighKGFyZ3VtZW50QXJyYXkgaW5zdGFuY2VvZiBBcnJheSkpe2FyZ3VtZW50QXJyYXk9W2FyZ3VtZW50QXJyYXldfXZhciBzZWxmPXRoaXM7aWYodHlwZW9mIHRoaXMuc2V0dGluZ3NbaGFuZGxlck5hbWVdPT09ImZ1bmN0aW9uIil7dGhpcy5ldmVudFF1ZXVlLnB1c2goZnVuY3Rpb24oKXt0aGlzLnNldHRpbmdzW2hhbmRsZXJOYW1lXS5hcHBseSh0aGlzLGFyZ3VtZW50QXJyYXkpfSk7c2V0VGltZW91dChmdW5jdGlvbigpe3NlbGYuZXhlY3V0ZU5leHRFdmVudCgpfSwwKX1lbHNlIGlmKHRoaXMuc2V0dGluZ3NbaGFuZGxlck5hbWVdIT09bnVsbCl7dGhyb3ciRXZlbnQgaGFuZGxlciAiK2hhbmRsZXJOYW1lKyIgaXMgdW5rbm93biBvciBpcyBub3QgYSBmdW5jdGlvbiI7fX07U1dGVXBsb2FkLnByb3RvdHlwZS5leGVjdXRlTmV4dEV2ZW50PWZ1bmN0aW9uKCl7dmFyIGY9dGhpcy5ldmVudFF1ZXVlP3RoaXMuZXZlbnRRdWV1ZS5zaGlmdCgpOm51bGw7aWYodHlwZW9mKGYpPT09ImZ1bmN0aW9uIil7Zi5hcHBseSh0aGlzKX19O1NXRlVwbG9hZC5wcm90b3R5cGUudW5lc2NhcGVGaWxlUG9zdFBhcmFtcz1mdW5jdGlvbihmaWxlKXt2YXIgcmVnPS9bJF0oWzAtOWEtZl17NH0pL2k7dmFyIHVuZXNjYXBlZFBvc3Q9e307dmFyIHVrO2lmKGZpbGUhPXVuZGVmaW5lZCl7Zm9yKHZhciBrIGluIGZpbGUucG9zdCl7aWYoZmlsZS5wb3N0Lmhhc093blByb3BlcnR5KGspKXt1az1rO3ZhciBtYXRjaDt3aGlsZSgobWF0Y2g9cmVnLmV4ZWModWspKSE9PW51bGwpe3VrPXVrLnJlcGxhY2UobWF0Y2hbMF0sU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludCgiMHgiK21hdGNoWzFdLDE2KSkpfXVuZXNjYXBlZFBvc3RbdWtdPWZpbGUucG9zdFtrXX19ZmlsZS5wb3N0PXVuZXNjYXBlZFBvc3R9cmV0dXJuIGZpbGV9O1NXRlVwbG9hZC5wcm90b3R5cGUuZmxhc2hSZWFkeT1mdW5jdGlvbigpe3ZhciBtb3ZpZUVsZW1lbnQ9dGhpcy5nZXRNb3ZpZUVsZW1lbnQoKTtpZih0eXBlb2YobW92aWVFbGVtZW50LkNhbGxGdW5jdGlvbik9PT0idW5rbm93biIpe3RoaXMuZGVidWcoIlJlbW92aW5nIEZsYXNoIGZ1bmN0aW9ucyBob29rcyAodGhpcyBzaG91bGQgb25seSBydW4gaW4gSUUgYW5kIHNob3VsZCBwcmV2ZW50IG1lbW9yeSBsZWFrcykiKTtmb3IodmFyIGtleSBpbiBtb3ZpZUVsZW1lbnQpe3RyeXtpZih0eXBlb2YobW92aWVFbGVtZW50W2tleV0pPT09ImZ1bmN0aW9uIil7bW92aWVFbGVtZW50W2tleV09bnVsbH19Y2F0Y2goZXgpe319fXRoaXMucXVldWVFdmVudCgic3dmdXBsb2FkX2xvYWRlZF9oYW5kbGVyIil9O1NXRlVwbG9hZC5wcm90b3R5cGUuZmlsZURpYWxvZ1N0YXJ0PWZ1bmN0aW9uKCl7dGhpcy5xdWV1ZUV2ZW50KCJmaWxlX2RpYWxvZ19zdGFydF9oYW5kbGVyIil9O1NXRlVwbG9hZC5wcm90b3R5cGUuZmlsZVF1ZXVlZD1mdW5jdGlvbihmaWxlKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoImZpbGVfcXVldWVkX2hhbmRsZXIiLGZpbGUpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmZpbGVRdWV1ZUVycm9yPWZ1bmN0aW9uKGZpbGUsZXJyb3JDb2RlLG1lc3NhZ2Upe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgiZmlsZV9xdWV1ZV9lcnJvcl9oYW5kbGVyIixbZmlsZSxlcnJvckNvZGUsbWVzc2FnZV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLmZpbGVEaWFsb2dDb21wbGV0ZT1mdW5jdGlvbihudW1GaWxlc1NlbGVjdGVkLG51bUZpbGVzUXVldWVkKXt0aGlzLnF1ZXVlRXZlbnQoImZpbGVfZGlhbG9nX2NvbXBsZXRlX2hhbmRsZXIiLFtudW1GaWxlc1NlbGVjdGVkLG51bUZpbGVzUXVldWVkXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUudXBsb2FkU3RhcnQ9ZnVuY3Rpb24oZmlsZSl7ZmlsZT10aGlzLnVuZXNjYXBlRmlsZVBvc3RQYXJhbXMoZmlsZSk7dGhpcy5xdWV1ZUV2ZW50KCJyZXR1cm5fdXBsb2FkX3N0YXJ0X2hhbmRsZXIiLGZpbGUpfTtTV0ZVcGxvYWQucHJvdG90eXBlLnJldHVyblVwbG9hZFN0YXJ0PWZ1bmN0aW9uKGZpbGUpe3ZhciByZXR1cm5WYWx1ZTtpZih0eXBlb2YgdGhpcy5zZXR0aW5ncy51cGxvYWRfc3RhcnRfaGFuZGxlcj09PSJmdW5jdGlvbiIpe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3JldHVyblZhbHVlPXRoaXMuc2V0dGluZ3MudXBsb2FkX3N0YXJ0X2hhbmRsZXIuY2FsbCh0aGlzLGZpbGUpfWVsc2UgaWYodGhpcy5zZXR0aW5ncy51cGxvYWRfc3RhcnRfaGFuZGxlciE9dW5kZWZpbmVkKXt0aHJvdyJ1cGxvYWRfc3RhcnRfaGFuZGxlciBtdXN0IGJlIGEgZnVuY3Rpb24iO31pZihyZXR1cm5WYWx1ZT09PXVuZGVmaW5lZCl7cmV0dXJuVmFsdWU9dHJ1ZX1yZXR1cm5WYWx1ZT0hIXJldHVyblZhbHVlO3RoaXMuY2FsbEZsYXNoKCJSZXR1cm5VcGxvYWRTdGFydCIsW3JldHVyblZhbHVlXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUudXBsb2FkUHJvZ3Jlc3M9ZnVuY3Rpb24oZmlsZSxieXRlc0NvbXBsZXRlLGJ5dGVzVG90YWwpe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgidXBsb2FkX3Byb2dyZXNzX2hhbmRsZXIiLFtmaWxlLGJ5dGVzQ29tcGxldGUsYnl0ZXNUb3RhbF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnVwbG9hZEVycm9yPWZ1bmN0aW9uKGZpbGUsZXJyb3JDb2RlLG1lc3NhZ2Upe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgidXBsb2FkX2Vycm9yX2hhbmRsZXIiLFtmaWxlLGVycm9yQ29kZSxtZXNzYWdlXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUudXBsb2FkU3VjY2Vzcz1mdW5jdGlvbihmaWxlLHNlcnZlckRhdGEpe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgidXBsb2FkX3N1Y2Nlc3NfaGFuZGxlciIsW2ZpbGUsc2VydmVyRGF0YV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnVwbG9hZENvbXBsZXRlPWZ1bmN0aW9uKGZpbGUpe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgidXBsb2FkX2NvbXBsZXRlX2hhbmRsZXIiLGZpbGUpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmRlYnVnPWZ1bmN0aW9uKG1lc3NhZ2Upe3RoaXMucXVldWVFdmVudCgiZGVidWdfaGFuZGxlciIsbWVzc2FnZSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuZGVidWdNZXNzYWdlPWZ1bmN0aW9uKG1lc3NhZ2Upe2lmKHRoaXMuc2V0dGluZ3MuZGVidWcpe3ZhciBleGNlcHRpb25NZXNzYWdlLGV4Y2VwdGlvblZhbHVlcz1bXTtpZih0eXBlb2YgbWVzc2FnZT09PSJvYmplY3QiJiZ0eXBlb2YgbWVzc2FnZS5uYW1lPT09InN0cmluZyImJnR5cGVvZiBtZXNzYWdlLm1lc3NhZ2U9PT0ic3RyaW5nIil7Zm9yKHZhciBrZXkgaW4gbWVzc2FnZSl7aWYobWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShrZXkpKXtleGNlcHRpb25WYWx1ZXMucHVzaChrZXkrIjogIittZXNzYWdlW2tleV0pfX1leGNlcHRpb25NZXNzYWdlPWV4Y2VwdGlvblZhbHVlcy5qb2luKCJcbiIpfHwiIjtleGNlcHRpb25WYWx1ZXM9ZXhjZXB0aW9uTWVzc2FnZS5zcGxpdCgiXG4iKTtleGNlcHRpb25NZXNzYWdlPSJFWENFUFRJT046ICIrZXhjZXB0aW9uVmFsdWVzLmpvaW4oIlxuRVhDRVBUSU9OOiAiKTtTV0ZVcGxvYWQuQ29uc29sZS53cml0ZUxpbmUoZXhjZXB0aW9uTWVzc2FnZSl9ZWxzZXtTV0ZVcGxvYWQuQ29uc29sZS53cml0ZUxpbmUobWVzc2FnZSl9fX07U1dGVXBsb2FkLkNvbnNvbGU9e307U1dGVXBsb2FkLkNvbnNvbGUud3JpdGVMaW5lPWZ1bmN0aW9uKG1lc3NhZ2Upe3ZhciBjb25zb2xlLGRvY3VtZW50Rm9ybTt0cnl7Y29uc29sZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiU1dGVXBsb2FkX0NvbnNvbGUiKTtpZighY29uc29sZSl7ZG9jdW1lbnRGb3JtPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImZvcm0iKTtkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgiYm9keSIpWzBdLmFwcGVuZENoaWxkKGRvY3VtZW50Rm9ybSk7Y29uc29sZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJ0ZXh0YXJlYSIpO2NvbnNvbGUuaWQ9IlNXRlVwbG9hZF9Db25zb2xlIjtjb25zb2xlLnN0eWxlLmZvbnRGYW1pbHk9Im1vbm9zcGFjZSI7Y29uc29sZS5zZXRBdHRyaWJ1dGUoIndyYXAiLCJvZmYiKTtjb25zb2xlLndyYXA9Im9mZiI7Y29uc29sZS5zdHlsZS5vdmVyZmxvdz0iYXV0byI7Y29uc29sZS5zdHlsZS53aWR0aD0iNzAwcHgiO2NvbnNvbGUuc3R5bGUuaGVpZ2h0PSIzNTBweCI7Y29uc29sZS5zdHlsZS5tYXJnaW49IjVweCI7ZG9jdW1lbnRGb3JtLmFwcGVuZENoaWxkKGNvbnNvbGUpfWNvbnNvbGUudmFsdWUrPW1lc3NhZ2UrIlxuIjtjb25zb2xlLnNjcm9sbFRvcD1jb25zb2xlLnNjcm9sbEhlaWdodC1jb25zb2xlLmNsaWVudEhlaWdodH1jYXRjaChleCl7YWxlcnQoIkV4Y2VwdGlvbjogIitleC5uYW1lKyIgTWVzc2FnZTogIitleC5tZXNzYWdlKX19Ow==");
			document.getElementsByTagName("head")[0].appendChild(fz_sc2);
			
			var fz_sc3 = document.createElement("script");
			fz_sc3.innerHTML = base64_decode(warezbbimgkkscript);
			document.getElementsByTagName("head")[0].appendChild(fz_sc3);			
		//}
				
		$(".wbbsc-preview").click(function(){
			var buton = $(this);
			/*if(lastMessage.length < 1 && $("#quick_quote").checked){
				$(buton).attr("disabled", "disabled").attr("value", buttonText.previewQuote);
				$.ajax({
					dataType: "text",
					cache: false,
					url: $("img[src*='icon_quote.gif']:last").parents("a[href*='posting.php?mode=quote']").attr("href"),
					type: "GET",
					timeout: 10000,
					success: function(data){
						$(buton).attr("disabled", "").attr("value", buttonText.preview);
						var lookingFor = quoteRegex.exec(data);
						var found = lookingFor[1];
						lastMessage = smiley(bbCode(found));
						preview();
					},
					error: function(){
						$(buton).attr("disabled", "").attr("value", buttonText.previewError);
					}
				});
			} else {*/
			lastMessage = $("#quick_quote").get(0).checked ? smiley(bbCode($("input[name='last_msg']").val())) : "";
			//$(this).attr("value", buttonText.preview);
			preview();
			//}
		});
		
		$(".wbbsc-submit").click(function(){
			var buton = $(this);
			
			if ($("#message").val().length < 2){
				alert("Your message is empty ;-)");
				return false;
			}
			
			$("#message").val($("#message").val().replace(/ :P/g, " :P ").replace(/ :lol:/, " :lol: ")+" ");		
			$(".wbbsc-pre").remove();
	
			$(buton).attr("disabled", "disabled").attr("value", buttonText.submit2);
			$.ajax({
				dataType: "text",
				cache: false,
				data: $("form[name='post']").serialize()+"&post=Submit",
				url: "posting.php",
				type: "POST",
				timeout: 15000,
				success: function(data){
					if(data.indexOf("successfully") > 0){
						
						var lookingFor = /\<meta http-equiv="refresh" content="0;url=([^"]+)">/.exec(data);
						var url = lookingFor[1];
						
						$.ajax({
							dataType: "text",
							cache: false,
							url: url,
							type: "GET",
							timeout: 20000,
							success: function(data){								
								
							/*	var lookingFor = data.match(/\<img src="images\/spacer.gif" alt="" width="1" height="1" \/>\<\/td>[^\<]*\<\/tr>[\s\S]*?\<td class="spacerow" colspan="2" height="1">/g);
								//alert(lookingFor.length-1);
								var post = lookingFor[lookingFor.length-1];
								post = post.replace(/\<img src="images\/spacer.gif" alt="" width="1" height="1" \/>\<\/td>[^\<]*\<\/tr>/, "");
								post = '<tr>' + post + '<img src="images/spacer.gif" alt="" width="1" height="1" /></td></tr>';
							*/
								
								//var data = data.replace(/([\s\S])\<body>/gi, "");
								/*$("#lolframe").html(data);
								var lol = $("#lolframe").contents().find(".forumline:first");
								alert(lol.length);
								var post = "";
								lol.children("tbody").children("tr:gt("+(lol.children("tbody").children("tr").length-8)+"):lt(3)").each(function(){
									post += "<tr>"+$(this).html()+"</tr>";
								});
								alert(post);*/
								
								//regex > DOM.
								//alert(data);
								var lrow = $(".forumline:first").children("tbody").children("tr:gt("+($(".forumline:first").children("tbody").children("tr")
									.length-7)+"):lt(1)").children(".row1").length == 0 ? true : false;
								var lreplace = lrow ? /row2/g : /row1/g;
								var lwith = lrow ? "row1" : "row2";
								var allposts = /\<table class="forumline" width="100%" cellspacing="1" cellpadding="3" border="0">[\r\n]*?\<tr>[\r\n]*?\<th width="150" height="28">Author\<\/th>[\r\n]*?\<th width="100%">Message\<\/th>[\r\n]*?\<\/tr>([\s\S]*?)\<script language='JavaScript'>/.exec(data)[1].replace(/\<tr>[\r\n]*?\<td class="spacerow" colspan="2" height="1">\<img src="images\/spacer.gif" alt="" width="1" height="1" \/>\<\/td>[\r\n]*?\<\/tr>/g, "").split(/\<tr>[\r\n]*?\<td valign="top" class="row[12]">\<span class="name">/g);
								//data = allposts[1];
								//alert(allposts[(allposts.length-2)])
								//alert(allposts[(allposts.length-1)])
								var post = //'<tr><td class="spacerow" colspan="2" height="1">' +
									//'<img src="images/spacer.gif" alt="" width="1" height="1" /></td></tr>' +
									'<tr><td valign="top" class="'+lwith+'">\<span class="name">' +
									allposts[(allposts.length-2)].replace(lreplace, lwith)+'</tr><tr><td valign="top" class="'+lwith+'"><span class="name">' +
									allposts[(allposts.length-1)].replace(lreplace, lwith);
								//alert(post)
								$(".spacerow:last").parents("tr:first").after(post);
									
								$("input[name='preview'], input[name='post'], .wbbsc-preview").fadeOut("normal");
								
								// gets the quote + edit buttons working ;)
								setupEvents(true);
								
								$(buton).attr("disabled", "").attr("value", "Posted Successfully - Back").unbind('click').click(function(){
									history.go(-1); 
								});					
								$("#message").val("");
								$(".wbbsc-preview").after(" <input type='button' value='Refresh' class='liteoption' />").next()/*fadeOut("normal");attr("disabled", "").attr("value", "Refresh").unbind('click')*/.click(function(){
									location.reload(true);
								});
							},
							error: function(){
								$(buton).attr("disabled", "").attr("value", buttonText.submit);
								alert("- Warez-BB: SuperCharged -\r\n\r\nAn error occured when returning your post.\r\n\r\nYour post has still been submitted." +
										"\r\n\r\nThis error generally means your internet isn't fast enough or Warez-BB is lagging or being DDoSed or something.");
							}
						});
					
					} else if(data.indexOf("resubmit") > 0){
						$(buton).attr("disabled", "").attr("value", buttonText.submit);
						alert("- Warez-BB: SuperCharged -\r\n\r\nYour session timed out before you submitted your post, so it will be submitted via the non-AJAX" +
								" system when you click OK.\n\nSince R15, this no longer destroys your post.");
						unsafeWindow.checkForm();
						document.post.submit();
						//$("form[name='post']").get(0).submit();								
					} else {
						$(buton).attr("disabled", "").attr("value", buttonText.submit);
						alert("- Warez-BB: SuperCharged -\r\n\r\nAn error occured when submitting your post.\r\n\r\nTry a normal submission.\r\n\r\n" +
								"This usually means you are posting the same message as your last or too soon after your last.");
					}
				},
				error: function(){
					$(buton).attr("disabled", "").attr("value", buttonText.submit);
					alert("- Warez-BB: SuperCharged -\r\n\r\nAn error occured when submitting your post.\r\n\r\nTry a normal submission.");
				}
			});
			
		});
		
		
	}
	
	if(page("posting.php") || page("privmsg.php?mode=post") || $("input[name='usersubmit']").length > 0){
		
		$("input[name='post']").after(" &nbsp;&nbsp;<input class='wbbsc-preview liteoption' type='button' value='WBB:SC Preview' />" +
				" &nbsp;&nbsp;<input class='wbbsc-hide liteoption' type='button' value='WBB:SC Hide Preview' />");
		$(".wbbsc-preview").click(function(){		
			var text = $("#message").val();
			if(!$("input[name='disable_bbcode']").get(0).checked){
				text = bbCode(text);
			}
			if(!$("input[name='disable_smilies']").get(0).checked){
				text = smiley(text);
			}		
			hidePreview();
			if(page("posting.php")){
				$(".forumline:eq(0)").before(previewBox[0].replace("margin-top: 10px; ", "")+boxDate()+previewBox[1]+$("#subject").val()+previewBox[2]+text.replace(/\n/g, "<br />")+previewBox[3]);
			} else {
				$(".forumline:eq(0)").before(sprintf(previewPM, /\[ (.*?) \]/.exec($("a[href*='login.php?logout=true']:first").text())[1], $("input[name='username']").val(), boxDate(), $("#subject").val(), text.replace(/\n/g, "<br />")));
			}
			$(".wbbsc-pre").show();
		});
		
		$("input.helpline[name='helpbox']").attr("size", "100").attr("disabled", "disabled");
		
		$(".wbbsc-hide").click(hidePreview);
		
		if(getOption('listitem')){
			$("input[accesskey='o']").parent().after("<td><input type='button' class='button' id='listthing' value='[*]' /></td>");
			$("#listthing").mouseover(function(){
				$("input[name='helpbox']").val("WBB:SC List Item: [*]Text");
			}).click(function(){
				mozInsert($("#message").get(0), "[*]", "");
			});
		}
		
		if(getOption('imgkk')){
			
			$("a[href='javascript:bbstyle(-1)']").parent().attr("align", "left").after("<td nowrap='nowrap' align='right' class='genmed'> " +
			"<div id='uploadbutton'></div></td>");
			
			var fz_sc = document.createElement("script");
			fz_sc.src = "http://code.jquery.com/jquery-latest.js";
			document.getElementsByTagName("head")[0].appendChild(fz_sc);
			
			var fz_sc2 = document.createElement("script");
			fz_sc2.innerHTML = base64_decode("dmFyIFNXRlVwbG9hZDtpZihTV0ZVcGxvYWQ9PXVuZGVmaW5lZCl7U1dGVXBsb2FkPWZ1bmN0aW9uKHNldHRpbmdzKXt0aGlzLmluaXRTV0ZVcGxvYWQoc2V0dGluZ3MpfX1TV0ZVcGxvYWQucHJvdG90eXBlLmluaXRTV0ZVcGxvYWQ9ZnVuY3Rpb24oc2V0dGluZ3Mpe3RyeXt0aGlzLmN1c3RvbVNldHRpbmdzPXt9O3RoaXMuc2V0dGluZ3M9c2V0dGluZ3M7dGhpcy5ldmVudFF1ZXVlPVtdO3RoaXMubW92aWVOYW1lPSJTV0ZVcGxvYWRfIitTV0ZVcGxvYWQubW92aWVDb3VudCsrO3RoaXMubW92aWVFbGVtZW50PW51bGw7U1dGVXBsb2FkLmluc3RhbmNlc1t0aGlzLm1vdmllTmFtZV09dGhpczt0aGlzLmluaXRTZXR0aW5ncygpO3RoaXMubG9hZEZsYXNoKCk7dGhpcy5kaXNwbGF5RGVidWdJbmZvKCl9Y2F0Y2goZXgpe2RlbGV0ZSBTV0ZVcGxvYWQuaW5zdGFuY2VzW3RoaXMubW92aWVOYW1lXTt0aHJvdyBleDt9fTtTV0ZVcGxvYWQuaW5zdGFuY2VzPXt9O1NXRlVwbG9hZC5tb3ZpZUNvdW50PTA7U1dGVXBsb2FkLnZlcnNpb249IjIuMi4wIEJldGEgMyI7U1dGVXBsb2FkLlFVRVVFX0VSUk9SPXtRVUVVRV9MSU1JVF9FWENFRURFRDotMTAwLEZJTEVfRVhDRUVEU19TSVpFX0xJTUlUOi0xMTAsWkVST19CWVRFX0ZJTEU6LTEyMCxJTlZBTElEX0ZJTEVUWVBFOi0xMzB9O1NXRlVwbG9hZC5VUExPQURfRVJST1I9e0hUVFBfRVJST1I6LTIwMCxNSVNTSU5HX1VQTE9BRF9VUkw6LTIxMCxJT19FUlJPUjotMjIwLFNFQ1VSSVRZX0VSUk9SOi0yMzAsVVBMT0FEX0xJTUlUX0VYQ0VFREVEOi0yNDAsVVBMT0FEX0ZBSUxFRDotMjUwLFNQRUNJRklFRF9GSUxFX0lEX05PVF9GT1VORDotMjYwLEZJTEVfVkFMSURBVElPTl9GQUlMRUQ6LTI3MCxGSUxFX0NBTkNFTExFRDotMjgwLFVQTE9BRF9TVE9QUEVEOi0yOTB9O1NXRlVwbG9hZC5GSUxFX1NUQVRVUz17UVVFVUVEOi0xLElOX1BST0dSRVNTOi0yLEVSUk9SOi0zLENPTVBMRVRFOi00LENBTkNFTExFRDotNX07U1dGVXBsb2FkLkJVVFRPTl9BQ1RJT049e1NFTEVDVF9GSUxFOi0xMDAsU0VMRUNUX0ZJTEVTOi0xMTAsU1RBUlRfVVBMT0FEOi0xMjB9O1NXRlVwbG9hZC5DVVJTT1I9e0FSUk9XOi0xLEhBTkQ6LTJ9O1NXRlVwbG9hZC5XSU5ET1dfTU9ERT17V0lORE9XOiJ3aW5kb3ciLFRSQU5TUEFSRU5UOiJ0cmFuc3BhcmVudCIsT1BBUVVFOiJvcGFxdWUifTtTV0ZVcGxvYWQucHJvdG90eXBlLmluaXRTZXR0aW5ncz1mdW5jdGlvbigpe3RoaXMuZW5zdXJlRGVmYXVsdD1mdW5jdGlvbihzZXR0aW5nTmFtZSxkZWZhdWx0VmFsdWUpe3RoaXMuc2V0dGluZ3Nbc2V0dGluZ05hbWVdPSh0aGlzLnNldHRpbmdzW3NldHRpbmdOYW1lXT09dW5kZWZpbmVkKT9kZWZhdWx0VmFsdWU6dGhpcy5zZXR0aW5nc1tzZXR0aW5nTmFtZV19O3RoaXMuZW5zdXJlRGVmYXVsdCgidXBsb2FkX3VybCIsIiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9wb3N0X25hbWUiLCJGaWxlZGF0YSIpO3RoaXMuZW5zdXJlRGVmYXVsdCgicG9zdF9wYXJhbXMiLHt9KTt0aGlzLmVuc3VyZURlZmF1bHQoInVzZV9xdWVyeV9zdHJpbmciLGZhbHNlKTt0aGlzLmVuc3VyZURlZmF1bHQoInJlcXVldWVfb25fZXJyb3IiLGZhbHNlKTt0aGlzLmVuc3VyZURlZmF1bHQoImh0dHBfc3VjY2VzcyIsW10pO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV90eXBlcyIsIiouKiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV90eXBlc19kZXNjcmlwdGlvbiIsIkFsbCBGaWxlcyIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9zaXplX2xpbWl0IiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfdXBsb2FkX2xpbWl0IiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfcXVldWVfbGltaXQiLDApO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmxhc2hfdXJsIiwic3dmdXBsb2FkLnN3ZiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgicHJldmVudF9zd2ZfY2FjaGluZyIsdHJ1ZSk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25faW1hZ2VfdXJsIiwiIik7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fd2lkdGgiLDEpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX2hlaWdodCIsMSk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fdGV4dCIsIiIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX3RleHRfc3R5bGUiLCJjb2xvcjogIzAwMDAwMDsgZm9udC1zaXplOiAxNnB0OyIpO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX3RleHRfdG9wX3BhZGRpbmciLDApO3RoaXMuZW5zdXJlRGVmYXVsdCgiYnV0dG9uX3RleHRfbGVmdF9wYWRkaW5nIiwwKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl9hY3Rpb24iLFNXRlVwbG9hZC5CVVRUT05fQUNUSU9OLlNFTEVDVF9GSUxFUyk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fZGlzYWJsZWQiLGZhbHNlKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl9wbGFjZWhvbGRlcl9pZCIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJidXR0b25fY3Vyc29yIixTV0ZVcGxvYWQuQ1VSU09SLkFSUk9XKTt0aGlzLmVuc3VyZURlZmF1bHQoImJ1dHRvbl93aW5kb3dfbW9kZSIsU1dGVXBsb2FkLldJTkRPV19NT0RFLldJTkRPVyk7dGhpcy5lbnN1cmVEZWZhdWx0KCJkZWJ1ZyIsZmFsc2UpO3RoaXMuc2V0dGluZ3MuZGVidWdfZW5hYmxlZD10aGlzLnNldHRpbmdzLmRlYnVnO3RoaXMuc2V0dGluZ3MucmV0dXJuX3VwbG9hZF9zdGFydF9oYW5kbGVyPXRoaXMucmV0dXJuVXBsb2FkU3RhcnQ7dGhpcy5lbnN1cmVEZWZhdWx0KCJzd2Z1cGxvYWRfbG9hZGVkX2hhbmRsZXIiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZmlsZV9kaWFsb2dfc3RhcnRfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJmaWxlX3F1ZXVlZF9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoImZpbGVfcXVldWVfZXJyb3JfaGFuZGxlciIsbnVsbCk7dGhpcy5lbnN1cmVEZWZhdWx0KCJmaWxlX2RpYWxvZ19jb21wbGV0ZV9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoInVwbG9hZF9zdGFydF9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoInVwbG9hZF9wcm9ncmVzc19oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoInVwbG9hZF9lcnJvcl9oYW5kbGVyIixudWxsKTt0aGlzLmVuc3VyZURlZmF1bHQoInVwbG9hZF9zdWNjZXNzX2hhbmRsZXIiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgidXBsb2FkX2NvbXBsZXRlX2hhbmRsZXIiLG51bGwpO3RoaXMuZW5zdXJlRGVmYXVsdCgiZGVidWdfaGFuZGxlciIsdGhpcy5kZWJ1Z01lc3NhZ2UpO3RoaXMuZW5zdXJlRGVmYXVsdCgiY3VzdG9tX3NldHRpbmdzIix7fSk7dGhpcy5jdXN0b21TZXR0aW5ncz10aGlzLnNldHRpbmdzLmN1c3RvbV9zZXR0aW5ncztpZih0aGlzLnNldHRpbmdzLnByZXZlbnRfc3dmX2NhY2hpbmcpe3RoaXMuc2V0dGluZ3MuZmxhc2hfdXJsPXRoaXMuc2V0dGluZ3MuZmxhc2hfdXJsKyI/c3dmdXBsb2Fkcm5kPSIrTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjk5OTk5OTk5OSl9ZGVsZXRlIHRoaXMuZW5zdXJlRGVmYXVsdH07U1dGVXBsb2FkLnByb3RvdHlwZS5sb2FkRmxhc2g9ZnVuY3Rpb24oKXtpZih0aGlzLnNldHRpbmdzLmJ1dHRvbl9wbGFjZWhvbGRlcl9pZCE9PSIiKXt0aGlzLnJlcGxhY2VXaXRoRmxhc2goKX1lbHNle3RoaXMuYXBwZW5kRmxhc2goKX19O1NXRlVwbG9hZC5wcm90b3R5cGUuYXBwZW5kRmxhc2g9ZnVuY3Rpb24oKXt2YXIgdGFyZ2V0RWxlbWVudCxjb250YWluZXI7aWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5tb3ZpZU5hbWUpIT09bnVsbCl7dGhyb3ciSUQgIit0aGlzLm1vdmllTmFtZSsiIGlzIGFscmVhZHkgaW4gdXNlLiBUaGUgRmxhc2ggT2JqZWN0IGNvdWxkIG5vdCBiZSBhZGRlZCI7fXRhcmdldEVsZW1lbnQ9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoImJvZHkiKVswXTtpZih0YXJnZXRFbGVtZW50PT11bmRlZmluZWQpe3Rocm93IkNvdWxkIG5vdCBmaW5kIHRoZSAnYm9keScgZWxlbWVudC4iO31jb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiZGl2Iik7Y29udGFpbmVyLnN0eWxlLndpZHRoPSIxcHgiO2NvbnRhaW5lci5zdHlsZS5oZWlnaHQ9IjFweCI7Y29udGFpbmVyLnN0eWxlLm92ZXJmbG93PSJoaWRkZW4iO3RhcmdldEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtjb250YWluZXIuaW5uZXJIVE1MPXRoaXMuZ2V0Rmxhc2hIVE1MKCk7aWYod2luZG93W3RoaXMubW92aWVOYW1lXT09dW5kZWZpbmVkKXt3aW5kb3dbdGhpcy5tb3ZpZU5hbWVdPXRoaXMuZ2V0TW92aWVFbGVtZW50KCl9fTtTV0ZVcGxvYWQucHJvdG90eXBlLnJlcGxhY2VXaXRoRmxhc2g9ZnVuY3Rpb24oKXt2YXIgdGFyZ2V0RWxlbWVudCx0ZW1wUGFyZW50O2lmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubW92aWVOYW1lKSE9PW51bGwpe3Rocm93IklEICIrdGhpcy5tb3ZpZU5hbWUrIiBpcyBhbHJlYWR5IGluIHVzZS4gVGhlIEZsYXNoIE9iamVjdCBjb3VsZCBub3QgYmUgYWRkZWQiO310YXJnZXRFbGVtZW50PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuYnV0dG9uX3BsYWNlaG9sZGVyX2lkKTtpZih0YXJnZXRFbGVtZW50PT11bmRlZmluZWQpe3Rocm93IkNvdWxkIG5vdCBmaW5kIHRoZSBwbGFjZWhvbGRlciBlbGVtZW50LiI7fXRlbXBQYXJlbnQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiZGl2Iik7dGVtcFBhcmVudC5pbm5lckhUTUw9dGhpcy5nZXRGbGFzaEhUTUwoKTt0YXJnZXRFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHRlbXBQYXJlbnQuZmlyc3RDaGlsZCx0YXJnZXRFbGVtZW50KTtpZih3aW5kb3dbdGhpcy5tb3ZpZU5hbWVdPT11bmRlZmluZWQpe3dpbmRvd1t0aGlzLm1vdmllTmFtZV09dGhpcy5nZXRNb3ZpZUVsZW1lbnQoKX19O1NXRlVwbG9hZC5wcm90b3R5cGUuZ2V0Rmxhc2hIVE1MPWZ1bmN0aW9uKCl7cmV0dXJuWyc8b2JqZWN0IGlkPSInLHRoaXMubW92aWVOYW1lLCciIHR5cGU9ImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoIiBkYXRhPSInLHRoaXMuc2V0dGluZ3MuZmxhc2hfdXJsLCciIHdpZHRoPSInLHRoaXMuc2V0dGluZ3MuYnV0dG9uX3dpZHRoLCciIGhlaWdodD0iJyx0aGlzLnNldHRpbmdzLmJ1dHRvbl9oZWlnaHQsJyIgY2xhc3M9InN3ZnVwbG9hZCI+JywnPHBhcmFtIG5hbWU9Indtb2RlIiB2YWx1ZT0iJyx0aGlzLnNldHRpbmdzLmJ1dHRvbl93aW5kb3dfbW9kZSwnIiAvPicsJzxwYXJhbSBuYW1lPSJtb3ZpZSIgdmFsdWU9IicsdGhpcy5zZXR0aW5ncy5mbGFzaF91cmwsJyIgLz4nLCc8cGFyYW0gbmFtZT0icXVhbGl0eSIgdmFsdWU9ImhpZ2giIC8+JywnPHBhcmFtIG5hbWU9Im1lbnUiIHZhbHVlPSJmYWxzZSIgLz4nLCc8cGFyYW0gbmFtZT0iYWxsb3dTY3JpcHRBY2Nlc3MiIHZhbHVlPSJhbHdheXMiIC8+JywnPHBhcmFtIG5hbWU9ImZsYXNodmFycyIgdmFsdWU9IicrdGhpcy5nZXRGbGFzaFZhcnMoKSsnIiAvPicsJzwvb2JqZWN0PiddLmpvaW4oIiIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldEZsYXNoVmFycz1mdW5jdGlvbigpe3ZhciBwYXJhbVN0cmluZz10aGlzLmJ1aWxkUGFyYW1TdHJpbmcoKTt2YXIgaHR0cFN1Y2Nlc3NTdHJpbmc9dGhpcy5zZXR0aW5ncy5odHRwX3N1Y2Nlc3Muam9pbigiLCIpO3JldHVyblsibW92aWVOYW1lPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMubW92aWVOYW1lKSwiJmFtcDt1cGxvYWRVUkw9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy51cGxvYWRfdXJsKSwiJmFtcDt1c2VRdWVyeVN0cmluZz0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLnVzZV9xdWVyeV9zdHJpbmcpLCImYW1wO3JlcXVldWVPbkVycm9yPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MucmVxdWV1ZV9vbl9lcnJvciksIiZhbXA7aHR0cFN1Y2Nlc3M9IixlbmNvZGVVUklDb21wb25lbnQoaHR0cFN1Y2Nlc3NTdHJpbmcpLCImYW1wO3BhcmFtcz0iLGVuY29kZVVSSUNvbXBvbmVudChwYXJhbVN0cmluZyksIiZhbXA7ZmlsZVBvc3ROYW1lPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZmlsZV9wb3N0X25hbWUpLCImYW1wO2ZpbGVUeXBlcz0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmZpbGVfdHlwZXMpLCImYW1wO2ZpbGVUeXBlc0Rlc2NyaXB0aW9uPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZmlsZV90eXBlc19kZXNjcmlwdGlvbiksIiZhbXA7ZmlsZVNpemVMaW1pdD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmZpbGVfc2l6ZV9saW1pdCksIiZhbXA7ZmlsZVVwbG9hZExpbWl0PSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZmlsZV91cGxvYWRfbGltaXQpLCImYW1wO2ZpbGVRdWV1ZUxpbWl0PSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZmlsZV9xdWV1ZV9saW1pdCksIiZhbXA7ZGVidWdFbmFibGVkPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuZGVidWdfZW5hYmxlZCksIiZhbXA7YnV0dG9uSW1hZ2VVUkw9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5idXR0b25faW1hZ2VfdXJsKSwiJmFtcDtidXR0b25XaWR0aD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl93aWR0aCksIiZhbXA7YnV0dG9uSGVpZ2h0PSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX2hlaWdodCksIiZhbXA7YnV0dG9uVGV4dD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0KSwiJmFtcDtidXR0b25UZXh0VG9wUGFkZGluZz0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3RvcF9wYWRkaW5nKSwiJmFtcDtidXR0b25UZXh0TGVmdFBhZGRpbmc9IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dF9sZWZ0X3BhZGRpbmcpLCImYW1wO2J1dHRvblRleHRTdHlsZT0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3N0eWxlKSwiJmFtcDtidXR0b25BY3Rpb249IixlbmNvZGVVUklDb21wb25lbnQodGhpcy5zZXR0aW5ncy5idXR0b25fYWN0aW9uKSwiJmFtcDtidXR0b25EaXNhYmxlZD0iLGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNldHRpbmdzLmJ1dHRvbl9kaXNhYmxlZCksIiZhbXA7YnV0dG9uQ3Vyc29yPSIsZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuYnV0dG9uX2N1cnNvcildLmpvaW4oIiIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldE1vdmllRWxlbWVudD1mdW5jdGlvbigpe2lmKHRoaXMubW92aWVFbGVtZW50PT11bmRlZmluZWQpe3RoaXMubW92aWVFbGVtZW50PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubW92aWVOYW1lKX1pZih0aGlzLm1vdmllRWxlbWVudD09PW51bGwpe3Rocm93IkNvdWxkIG5vdCBmaW5kIEZsYXNoIGVsZW1lbnQiO31yZXR1cm4gdGhpcy5tb3ZpZUVsZW1lbnR9O1NXRlVwbG9hZC5wcm90b3R5cGUuYnVpbGRQYXJhbVN0cmluZz1mdW5jdGlvbigpe3ZhciBwb3N0UGFyYW1zPXRoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXM7dmFyIHBhcmFtU3RyaW5nUGFpcnM9W107aWYodHlwZW9mKHBvc3RQYXJhbXMpPT09Im9iamVjdCIpe2Zvcih2YXIgbmFtZSBpbiBwb3N0UGFyYW1zKXtpZihwb3N0UGFyYW1zLmhhc093blByb3BlcnR5KG5hbWUpKXtwYXJhbVN0cmluZ1BhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUudG9TdHJpbmcoKSkrIj0iK2VuY29kZVVSSUNvbXBvbmVudChwb3N0UGFyYW1zW25hbWVdLnRvU3RyaW5nKCkpKX19fXJldHVybiBwYXJhbVN0cmluZ1BhaXJzLmpvaW4oIiZhbXA7Iil9O1NXRlVwbG9hZC5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RyeXt0aGlzLmNhbmNlbFVwbG9hZChudWxsLGZhbHNlKTt2YXIgbW92aWVFbGVtZW50PW51bGw7bW92aWVFbGVtZW50PXRoaXMuZ2V0TW92aWVFbGVtZW50KCk7aWYobW92aWVFbGVtZW50KXtmb3IodmFyIGkgaW4gbW92aWVFbGVtZW50KXt0cnl7aWYodHlwZW9mKG1vdmllRWxlbWVudFtpXSk9PT0iZnVuY3Rpb24iKXttb3ZpZUVsZW1lbnRbaV09bnVsbH19Y2F0Y2goZXgxKXt9fXRyeXttb3ZpZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtb3ZpZUVsZW1lbnQpfWNhdGNoKGV4KXt9fXdpbmRvd1t0aGlzLm1vdmllTmFtZV09bnVsbDtTV0ZVcGxvYWQuaW5zdGFuY2VzW3RoaXMubW92aWVOYW1lXT1udWxsO2RlbGV0ZSBTV0ZVcGxvYWQuaW5zdGFuY2VzW3RoaXMubW92aWVOYW1lXTt0aGlzLm1vdmllRWxlbWVudD1udWxsO3RoaXMuc2V0dGluZ3M9bnVsbDt0aGlzLmN1c3RvbVNldHRpbmdzPW51bGw7dGhpcy5ldmVudFF1ZXVlPW51bGw7dGhpcy5tb3ZpZU5hbWU9bnVsbDtyZXR1cm4gdHJ1ZX1jYXRjaChleDEpe3JldHVybiBmYWxzZX19O1NXRlVwbG9hZC5wcm90b3R5cGUuZGlzcGxheURlYnVnSW5mbz1mdW5jdGlvbigpe3RoaXMuZGVidWcoWyItLS1TV0ZVcGxvYWQgSW5zdGFuY2UgSW5mby0tLVxuIiwiVmVyc2lvbjogIixTV0ZVcGxvYWQudmVyc2lvbiwiXG4iLCJNb3ZpZSBOYW1lOiAiLHRoaXMubW92aWVOYW1lLCJcbiIsIlNldHRpbmdzOlxuIiwiXHQiLCJ1cGxvYWRfdXJsOiAgICAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy51cGxvYWRfdXJsLCJcbiIsIlx0IiwiZmxhc2hfdXJsOiAgICAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuZmxhc2hfdXJsLCJcbiIsIlx0IiwidXNlX3F1ZXJ5X3N0cmluZzogICAgICAgICAiLHRoaXMuc2V0dGluZ3MudXNlX3F1ZXJ5X3N0cmluZy50b1N0cmluZygpLCJcbiIsIlx0IiwicmVxdWV1ZV9vbl9lcnJvcjogICAgICAgICAiLHRoaXMuc2V0dGluZ3MucmVxdWV1ZV9vbl9lcnJvci50b1N0cmluZygpLCJcbiIsIlx0IiwiaHR0cF9zdWNjZXNzOiAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuaHR0cF9zdWNjZXNzLmpvaW4oIiwgIiksIlxuIiwiXHQiLCJmaWxlX3Bvc3RfbmFtZTogICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5maWxlX3Bvc3RfbmFtZSwiXG4iLCJcdCIsInBvc3RfcGFyYW1zOiAgICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLnBvc3RfcGFyYW1zLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJmaWxlX3R5cGVzOiAgICAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5maWxlX3R5cGVzLCJcbiIsIlx0IiwiZmlsZV90eXBlc19kZXNjcmlwdGlvbjogICAiLHRoaXMuc2V0dGluZ3MuZmlsZV90eXBlc19kZXNjcmlwdGlvbiwiXG4iLCJcdCIsImZpbGVfc2l6ZV9saW1pdDogICAgICAgICAgIix0aGlzLnNldHRpbmdzLmZpbGVfc2l6ZV9saW1pdCwiXG4iLCJcdCIsImZpbGVfdXBsb2FkX2xpbWl0OiAgICAgICAgIix0aGlzLnNldHRpbmdzLmZpbGVfdXBsb2FkX2xpbWl0LCJcbiIsIlx0IiwiZmlsZV9xdWV1ZV9saW1pdDogICAgICAgICAiLHRoaXMuc2V0dGluZ3MuZmlsZV9xdWV1ZV9saW1pdCwiXG4iLCJcdCIsImRlYnVnOiAgICAgICAgICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLmRlYnVnLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJwcmV2ZW50X3N3Zl9jYWNoaW5nOiAgICAgICIsdGhpcy5zZXR0aW5ncy5wcmV2ZW50X3N3Zl9jYWNoaW5nLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fcGxhY2Vob2xkZXJfaWQ6ICAgICIsdGhpcy5zZXR0aW5ncy5idXR0b25fcGxhY2Vob2xkZXJfaWQudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl9pbWFnZV91cmw6ICAgICAgICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl9pbWFnZV91cmwudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl93aWR0aDogICAgICAgICAgICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl93aWR0aC50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX2hlaWdodDogICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX2hlaWdodC50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX3RleHQ6ICAgICAgICAgICAgICAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHQudG9TdHJpbmcoKSwiXG4iLCJcdCIsImJ1dHRvbl90ZXh0X3N0eWxlOiAgICAgICAgIix0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3N0eWxlLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fdGV4dF90b3BfcGFkZGluZzogICIsdGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dF90b3BfcGFkZGluZy50b1N0cmluZygpLCJcbiIsIlx0IiwiYnV0dG9uX3RleHRfbGVmdF9wYWRkaW5nOiAiLHRoaXMuc2V0dGluZ3MuYnV0dG9uX3RleHRfbGVmdF9wYWRkaW5nLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fYWN0aW9uOiAgICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5idXR0b25fYWN0aW9uLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJidXR0b25fZGlzYWJsZWQ6ICAgICAgICAgICIsdGhpcy5zZXR0aW5ncy5idXR0b25fZGlzYWJsZWQudG9TdHJpbmcoKSwiXG4iLCJcdCIsImN1c3RvbV9zZXR0aW5nczogICAgICAgICAgIix0aGlzLnNldHRpbmdzLmN1c3RvbV9zZXR0aW5ncy50b1N0cmluZygpLCJcbiIsIkV2ZW50IEhhbmRsZXJzOlxuIiwiXHQiLCJzd2Z1cGxvYWRfbG9hZGVkX2hhbmRsZXIgYXNzaWduZWQ6ICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy5zd2Z1cGxvYWRfbG9hZGVkX2hhbmRsZXI9PT0iZnVuY3Rpb24iKS50b1N0cmluZygpLCJcbiIsIlx0IiwiZmlsZV9kaWFsb2dfc3RhcnRfaGFuZGxlciBhc3NpZ25lZDogIiwodHlwZW9mIHRoaXMuc2V0dGluZ3MuZmlsZV9kaWFsb2dfc3RhcnRfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJmaWxlX3F1ZXVlZF9oYW5kbGVyIGFzc2lnbmVkOiAgICAgICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy5maWxlX3F1ZXVlZF9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsImZpbGVfcXVldWVfZXJyb3JfaGFuZGxlciBhc3NpZ25lZDogICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLmZpbGVfcXVldWVfZXJyb3JfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJ1cGxvYWRfc3RhcnRfaGFuZGxlciBhc3NpZ25lZDogICAgICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy51cGxvYWRfc3RhcnRfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJ1cGxvYWRfcHJvZ3Jlc3NfaGFuZGxlciBhc3NpZ25lZDogICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy51cGxvYWRfcHJvZ3Jlc3NfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJ1cGxvYWRfZXJyb3JfaGFuZGxlciBhc3NpZ25lZDogICAgICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy51cGxvYWRfZXJyb3JfaGFuZGxlcj09PSJmdW5jdGlvbiIpLnRvU3RyaW5nKCksIlxuIiwiXHQiLCJ1cGxvYWRfc3VjY2Vzc19oYW5kbGVyIGFzc2lnbmVkOiAgICAiLCh0eXBlb2YgdGhpcy5zZXR0aW5ncy51cGxvYWRfc3VjY2Vzc19oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsInVwbG9hZF9jb21wbGV0ZV9oYW5kbGVyIGFzc2lnbmVkOiAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLnVwbG9hZF9jb21wbGV0ZV9oYW5kbGVyPT09ImZ1bmN0aW9uIikudG9TdHJpbmcoKSwiXG4iLCJcdCIsImRlYnVnX2hhbmRsZXIgYXNzaWduZWQ6ICAgICAgICAgICAgICIsKHR5cGVvZiB0aGlzLnNldHRpbmdzLmRlYnVnX2hhbmRsZXI9PT0iZnVuY3Rpb24iKS50b1N0cmluZygpLCJcbiJdLmpvaW4oIiIpKX07U1dGVXBsb2FkLnByb3RvdHlwZS5hZGRTZXR0aW5nPWZ1bmN0aW9uKG5hbWUsdmFsdWUsZGVmYXVsdF92YWx1ZSl7aWYodmFsdWU9PXVuZGVmaW5lZCl7cmV0dXJuKHRoaXMuc2V0dGluZ3NbbmFtZV09ZGVmYXVsdF92YWx1ZSl9ZWxzZXtyZXR1cm4odGhpcy5zZXR0aW5nc1tuYW1lXT12YWx1ZSl9fTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldFNldHRpbmc9ZnVuY3Rpb24obmFtZSl7aWYodGhpcy5zZXR0aW5nc1tuYW1lXSE9dW5kZWZpbmVkKXtyZXR1cm4gdGhpcy5zZXR0aW5nc1tuYW1lXX1yZXR1cm4iIn07U1dGVXBsb2FkLnByb3RvdHlwZS5jYWxsRmxhc2g9ZnVuY3Rpb24oZnVuY3Rpb25OYW1lLGFyZ3VtZW50QXJyYXkpe2FyZ3VtZW50QXJyYXk9YXJndW1lbnRBcnJheXx8W107dmFyIG1vdmllRWxlbWVudD10aGlzLmdldE1vdmllRWxlbWVudCgpO3ZhciByZXR1cm5WYWx1ZSxyZXR1cm5TdHJpbmc7dHJ5e3JldHVyblN0cmluZz1tb3ZpZUVsZW1lbnQuQ2FsbEZ1bmN0aW9uKCc8aW52b2tlIG5hbWU9IicrZnVuY3Rpb25OYW1lKyciIHJldHVybnR5cGU9ImphdmFzY3JpcHQiPicrX19mbGFzaF9fYXJndW1lbnRzVG9YTUwoYXJndW1lbnRBcnJheSwwKSsnPC9pbnZva2U+Jyk7cmV0dXJuVmFsdWU9ZXZhbChyZXR1cm5TdHJpbmcpfWNhdGNoKGV4KXt0aHJvdyJDYWxsIHRvICIrZnVuY3Rpb25OYW1lKyIgZmFpbGVkIjt9aWYocmV0dXJuVmFsdWUhPXVuZGVmaW5lZCYmdHlwZW9mIHJldHVyblZhbHVlLnBvc3Q9PT0ib2JqZWN0Iil7cmV0dXJuVmFsdWU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKHJldHVyblZhbHVlKX1yZXR1cm4gcmV0dXJuVmFsdWV9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2VsZWN0RmlsZT1mdW5jdGlvbigpe3RoaXMuY2FsbEZsYXNoKCJTZWxlY3RGaWxlIil9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2VsZWN0RmlsZXM9ZnVuY3Rpb24oKXt0aGlzLmNhbGxGbGFzaCgiU2VsZWN0RmlsZXMiKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zdGFydFVwbG9hZD1mdW5jdGlvbihmaWxlSUQpe3RoaXMuY2FsbEZsYXNoKCJTdGFydFVwbG9hZCIsW2ZpbGVJRF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLmNhbmNlbFVwbG9hZD1mdW5jdGlvbihmaWxlSUQsdHJpZ2dlckVycm9yRXZlbnQpe2lmKHRyaWdnZXJFcnJvckV2ZW50IT09ZmFsc2Upe3RyaWdnZXJFcnJvckV2ZW50PXRydWV9dGhpcy5jYWxsRmxhc2goIkNhbmNlbFVwbG9hZCIsW2ZpbGVJRCx0cmlnZ2VyRXJyb3JFdmVudF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnN0b3BVcGxvYWQ9ZnVuY3Rpb24oKXt0aGlzLmNhbGxGbGFzaCgiU3RvcFVwbG9hZCIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldFN0YXRzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2FsbEZsYXNoKCJHZXRTdGF0cyIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldFN0YXRzPWZ1bmN0aW9uKHN0YXRzT2JqZWN0KXt0aGlzLmNhbGxGbGFzaCgiU2V0U3RhdHMiLFtzdGF0c09iamVjdF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLmdldEZpbGU9ZnVuY3Rpb24oZmlsZUlEKXtpZih0eXBlb2YoZmlsZUlEKT09PSJudW1iZXIiKXtyZXR1cm4gdGhpcy5jYWxsRmxhc2goIkdldEZpbGVCeUluZGV4IixbZmlsZUlEXSl9ZWxzZXtyZXR1cm4gdGhpcy5jYWxsRmxhc2goIkdldEZpbGUiLFtmaWxlSURdKX19O1NXRlVwbG9hZC5wcm90b3R5cGUuYWRkRmlsZVBhcmFtPWZ1bmN0aW9uKGZpbGVJRCxuYW1lLHZhbHVlKXtyZXR1cm4gdGhpcy5jYWxsRmxhc2goIkFkZEZpbGVQYXJhbSIsW2ZpbGVJRCxuYW1lLHZhbHVlXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUucmVtb3ZlRmlsZVBhcmFtPWZ1bmN0aW9uKGZpbGVJRCxuYW1lKXt0aGlzLmNhbGxGbGFzaCgiUmVtb3ZlRmlsZVBhcmFtIixbZmlsZUlELG5hbWVdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRVcGxvYWRVUkw9ZnVuY3Rpb24odXJsKXt0aGlzLnNldHRpbmdzLnVwbG9hZF91cmw9dXJsLnRvU3RyaW5nKCk7dGhpcy5jYWxsRmxhc2goIlNldFVwbG9hZFVSTCIsW3VybF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldFBvc3RQYXJhbXM9ZnVuY3Rpb24ocGFyYW1zT2JqZWN0KXt0aGlzLnNldHRpbmdzLnBvc3RfcGFyYW1zPXBhcmFtc09iamVjdDt0aGlzLmNhbGxGbGFzaCgiU2V0UG9zdFBhcmFtcyIsW3BhcmFtc09iamVjdF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLmFkZFBvc3RQYXJhbT1mdW5jdGlvbihuYW1lLHZhbHVlKXt0aGlzLnNldHRpbmdzLnBvc3RfcGFyYW1zW25hbWVdPXZhbHVlO3RoaXMuY2FsbEZsYXNoKCJTZXRQb3N0UGFyYW1zIixbdGhpcy5zZXR0aW5ncy5wb3N0X3BhcmFtc10pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnJlbW92ZVBvc3RQYXJhbT1mdW5jdGlvbihuYW1lKXtkZWxldGUgdGhpcy5zZXR0aW5ncy5wb3N0X3BhcmFtc1tuYW1lXTt0aGlzLmNhbGxGbGFzaCgiU2V0UG9zdFBhcmFtcyIsW3RoaXMuc2V0dGluZ3MucG9zdF9wYXJhbXNdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRGaWxlVHlwZXM9ZnVuY3Rpb24odHlwZXMsZGVzY3JpcHRpb24pe3RoaXMuc2V0dGluZ3MuZmlsZV90eXBlcz10eXBlczt0aGlzLnNldHRpbmdzLmZpbGVfdHlwZXNfZGVzY3JpcHRpb249ZGVzY3JpcHRpb247dGhpcy5jYWxsRmxhc2goIlNldEZpbGVUeXBlcyIsW3R5cGVzLGRlc2NyaXB0aW9uXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0RmlsZVNpemVMaW1pdD1mdW5jdGlvbihmaWxlU2l6ZUxpbWl0KXt0aGlzLnNldHRpbmdzLmZpbGVfc2l6ZV9saW1pdD1maWxlU2l6ZUxpbWl0O3RoaXMuY2FsbEZsYXNoKCJTZXRGaWxlU2l6ZUxpbWl0IixbZmlsZVNpemVMaW1pdF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEZpbGVVcGxvYWRMaW1pdD1mdW5jdGlvbihmaWxlVXBsb2FkTGltaXQpe3RoaXMuc2V0dGluZ3MuZmlsZV91cGxvYWRfbGltaXQ9ZmlsZVVwbG9hZExpbWl0O3RoaXMuY2FsbEZsYXNoKCJTZXRGaWxlVXBsb2FkTGltaXQiLFtmaWxlVXBsb2FkTGltaXRdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRGaWxlUXVldWVMaW1pdD1mdW5jdGlvbihmaWxlUXVldWVMaW1pdCl7dGhpcy5zZXR0aW5ncy5maWxlX3F1ZXVlX2xpbWl0PWZpbGVRdWV1ZUxpbWl0O3RoaXMuY2FsbEZsYXNoKCJTZXRGaWxlUXVldWVMaW1pdCIsW2ZpbGVRdWV1ZUxpbWl0XSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0RmlsZVBvc3ROYW1lPWZ1bmN0aW9uKGZpbGVQb3N0TmFtZSl7dGhpcy5zZXR0aW5ncy5maWxlX3Bvc3RfbmFtZT1maWxlUG9zdE5hbWU7dGhpcy5jYWxsRmxhc2goIlNldEZpbGVQb3N0TmFtZSIsW2ZpbGVQb3N0TmFtZV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldFVzZVF1ZXJ5U3RyaW5nPWZ1bmN0aW9uKHVzZVF1ZXJ5U3RyaW5nKXt0aGlzLnNldHRpbmdzLnVzZV9xdWVyeV9zdHJpbmc9dXNlUXVlcnlTdHJpbmc7dGhpcy5jYWxsRmxhc2goIlNldFVzZVF1ZXJ5U3RyaW5nIixbdXNlUXVlcnlTdHJpbmddKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRSZXF1ZXVlT25FcnJvcj1mdW5jdGlvbihyZXF1ZXVlT25FcnJvcil7dGhpcy5zZXR0aW5ncy5yZXF1ZXVlX29uX2Vycm9yPXJlcXVldWVPbkVycm9yO3RoaXMuY2FsbEZsYXNoKCJTZXRSZXF1ZXVlT25FcnJvciIsW3JlcXVldWVPbkVycm9yXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0SFRUUFN1Y2Nlc3M9ZnVuY3Rpb24oaHR0cF9zdGF0dXNfY29kZXMpe2lmKHR5cGVvZiBodHRwX3N0YXR1c19jb2Rlcz09PSJzdHJpbmciKXtodHRwX3N0YXR1c19jb2Rlcz1odHRwX3N0YXR1c19jb2Rlcy5yZXBsYWNlKCIgIiwiIikuc3BsaXQoIiwiKX10aGlzLnNldHRpbmdzLmh0dHBfc3VjY2Vzcz1odHRwX3N0YXR1c19jb2Rlczt0aGlzLmNhbGxGbGFzaCgiU2V0SFRUUFN1Y2Nlc3MiLFtodHRwX3N0YXR1c19jb2Rlc10pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldERlYnVnRW5hYmxlZD1mdW5jdGlvbihkZWJ1Z0VuYWJsZWQpe3RoaXMuc2V0dGluZ3MuZGVidWdfZW5hYmxlZD1kZWJ1Z0VuYWJsZWQ7dGhpcy5jYWxsRmxhc2goIlNldERlYnVnRW5hYmxlZCIsW2RlYnVnRW5hYmxlZF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvbkltYWdlVVJMPWZ1bmN0aW9uKGJ1dHRvbkltYWdlVVJMKXtpZihidXR0b25JbWFnZVVSTD09dW5kZWZpbmVkKXtidXR0b25JbWFnZVVSTD0iIn10aGlzLnNldHRpbmdzLmJ1dHRvbl9pbWFnZV91cmw9YnV0dG9uSW1hZ2VVUkw7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvbkltYWdlVVJMIixbYnV0dG9uSW1hZ2VVUkxdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5zZXRCdXR0b25EaW1lbnNpb25zPWZ1bmN0aW9uKHdpZHRoLGhlaWdodCl7dGhpcy5zZXR0aW5ncy5idXR0b25fd2lkdGg9d2lkdGg7dGhpcy5zZXR0aW5ncy5idXR0b25faGVpZ2h0PWhlaWdodDt2YXIgbW92aWU9dGhpcy5nZXRNb3ZpZUVsZW1lbnQoKTtpZihtb3ZpZSE9dW5kZWZpbmVkKXttb3ZpZS5zdHlsZS53aWR0aD13aWR0aCsicHgiO21vdmllLnN0eWxlLmhlaWdodD1oZWlnaHQrInB4In10aGlzLmNhbGxGbGFzaCgiU2V0QnV0dG9uRGltZW5zaW9ucyIsW3dpZHRoLGhlaWdodF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvblRleHQ9ZnVuY3Rpb24oaHRtbCl7dGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dD1odG1sO3RoaXMuY2FsbEZsYXNoKCJTZXRCdXR0b25UZXh0IixbaHRtbF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvblRleHRQYWRkaW5nPWZ1bmN0aW9uKGxlZnQsdG9wKXt0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X3RvcF9wYWRkaW5nPXRvcDt0aGlzLnNldHRpbmdzLmJ1dHRvbl90ZXh0X2xlZnRfcGFkZGluZz1sZWZ0O3RoaXMuY2FsbEZsYXNoKCJTZXRCdXR0b25UZXh0UGFkZGluZyIsW2xlZnQsdG9wXSl9O1NXRlVwbG9hZC5wcm90b3R5cGUuc2V0QnV0dG9uVGV4dFN0eWxlPWZ1bmN0aW9uKGNzcyl7dGhpcy5zZXR0aW5ncy5idXR0b25fdGV4dF9zdHlsZT1jc3M7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvblRleHRTdHlsZSIsW2Nzc10pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvbkRpc2FibGVkPWZ1bmN0aW9uKGlzRGlzYWJsZWQpe3RoaXMuc2V0dGluZ3MuYnV0dG9uX2Rpc2FibGVkPWlzRGlzYWJsZWQ7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvbkRpc2FibGVkIixbaXNEaXNhYmxlZF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvbkFjdGlvbj1mdW5jdGlvbihidXR0b25BY3Rpb24pe3RoaXMuc2V0dGluZ3MuYnV0dG9uX2FjdGlvbj1idXR0b25BY3Rpb247dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvbkFjdGlvbiIsW2J1dHRvbkFjdGlvbl0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnNldEJ1dHRvbkN1cnNvcj1mdW5jdGlvbihjdXJzb3Ipe3RoaXMuc2V0dGluZ3MuYnV0dG9uX2N1cnNvcj1jdXJzb3I7dGhpcy5jYWxsRmxhc2goIlNldEJ1dHRvbkN1cnNvciIsW2N1cnNvcl0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnF1ZXVlRXZlbnQ9ZnVuY3Rpb24oaGFuZGxlck5hbWUsYXJndW1lbnRBcnJheSl7aWYoYXJndW1lbnRBcnJheT09dW5kZWZpbmVkKXthcmd1bWVudEFycmF5PVtdfWVsc2UgaWYoIShhcmd1bWVudEFycmF5IGluc3RhbmNlb2YgQXJyYXkpKXthcmd1bWVudEFycmF5PVthcmd1bWVudEFycmF5XX12YXIgc2VsZj10aGlzO2lmKHR5cGVvZiB0aGlzLnNldHRpbmdzW2hhbmRsZXJOYW1lXT09PSJmdW5jdGlvbiIpe3RoaXMuZXZlbnRRdWV1ZS5wdXNoKGZ1bmN0aW9uKCl7dGhpcy5zZXR0aW5nc1toYW5kbGVyTmFtZV0uYXBwbHkodGhpcyxhcmd1bWVudEFycmF5KX0pO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLmV4ZWN1dGVOZXh0RXZlbnQoKX0sMCl9ZWxzZSBpZih0aGlzLnNldHRpbmdzW2hhbmRsZXJOYW1lXSE9PW51bGwpe3Rocm93IkV2ZW50IGhhbmRsZXIgIitoYW5kbGVyTmFtZSsiIGlzIHVua25vd24gb3IgaXMgbm90IGEgZnVuY3Rpb24iO319O1NXRlVwbG9hZC5wcm90b3R5cGUuZXhlY3V0ZU5leHRFdmVudD1mdW5jdGlvbigpe3ZhciBmPXRoaXMuZXZlbnRRdWV1ZT90aGlzLmV2ZW50UXVldWUuc2hpZnQoKTpudWxsO2lmKHR5cGVvZihmKT09PSJmdW5jdGlvbiIpe2YuYXBwbHkodGhpcyl9fTtTV0ZVcGxvYWQucHJvdG90eXBlLnVuZXNjYXBlRmlsZVBvc3RQYXJhbXM9ZnVuY3Rpb24oZmlsZSl7dmFyIHJlZz0vWyRdKFswLTlhLWZdezR9KS9pO3ZhciB1bmVzY2FwZWRQb3N0PXt9O3ZhciB1aztpZihmaWxlIT11bmRlZmluZWQpe2Zvcih2YXIgayBpbiBmaWxlLnBvc3Qpe2lmKGZpbGUucG9zdC5oYXNPd25Qcm9wZXJ0eShrKSl7dWs9azt2YXIgbWF0Y2g7d2hpbGUoKG1hdGNoPXJlZy5leGVjKHVrKSkhPT1udWxsKXt1az11ay5yZXBsYWNlKG1hdGNoWzBdLFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoIjB4IittYXRjaFsxXSwxNikpKX11bmVzY2FwZWRQb3N0W3VrXT1maWxlLnBvc3Rba119fWZpbGUucG9zdD11bmVzY2FwZWRQb3N0fXJldHVybiBmaWxlfTtTV0ZVcGxvYWQucHJvdG90eXBlLmZsYXNoUmVhZHk9ZnVuY3Rpb24oKXt2YXIgbW92aWVFbGVtZW50PXRoaXMuZ2V0TW92aWVFbGVtZW50KCk7aWYodHlwZW9mKG1vdmllRWxlbWVudC5DYWxsRnVuY3Rpb24pPT09InVua25vd24iKXt0aGlzLmRlYnVnKCJSZW1vdmluZyBGbGFzaCBmdW5jdGlvbnMgaG9va3MgKHRoaXMgc2hvdWxkIG9ubHkgcnVuIGluIElFIGFuZCBzaG91bGQgcHJldmVudCBtZW1vcnkgbGVha3MpIik7Zm9yKHZhciBrZXkgaW4gbW92aWVFbGVtZW50KXt0cnl7aWYodHlwZW9mKG1vdmllRWxlbWVudFtrZXldKT09PSJmdW5jdGlvbiIpe21vdmllRWxlbWVudFtrZXldPW51bGx9fWNhdGNoKGV4KXt9fX10aGlzLnF1ZXVlRXZlbnQoInN3ZnVwbG9hZF9sb2FkZWRfaGFuZGxlciIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmZpbGVEaWFsb2dTdGFydD1mdW5jdGlvbigpe3RoaXMucXVldWVFdmVudCgiZmlsZV9kaWFsb2dfc3RhcnRfaGFuZGxlciIpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmZpbGVRdWV1ZWQ9ZnVuY3Rpb24oZmlsZSl7ZmlsZT10aGlzLnVuZXNjYXBlRmlsZVBvc3RQYXJhbXMoZmlsZSk7dGhpcy5xdWV1ZUV2ZW50KCJmaWxlX3F1ZXVlZF9oYW5kbGVyIixmaWxlKX07U1dGVXBsb2FkLnByb3RvdHlwZS5maWxlUXVldWVFcnJvcj1mdW5jdGlvbihmaWxlLGVycm9yQ29kZSxtZXNzYWdlKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoImZpbGVfcXVldWVfZXJyb3JfaGFuZGxlciIsW2ZpbGUsZXJyb3JDb2RlLG1lc3NhZ2VdKX07U1dGVXBsb2FkLnByb3RvdHlwZS5maWxlRGlhbG9nQ29tcGxldGU9ZnVuY3Rpb24obnVtRmlsZXNTZWxlY3RlZCxudW1GaWxlc1F1ZXVlZCl7dGhpcy5xdWV1ZUV2ZW50KCJmaWxlX2RpYWxvZ19jb21wbGV0ZV9oYW5kbGVyIixbbnVtRmlsZXNTZWxlY3RlZCxudW1GaWxlc1F1ZXVlZF0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnVwbG9hZFN0YXJ0PWZ1bmN0aW9uKGZpbGUpe2ZpbGU9dGhpcy51bmVzY2FwZUZpbGVQb3N0UGFyYW1zKGZpbGUpO3RoaXMucXVldWVFdmVudCgicmV0dXJuX3VwbG9hZF9zdGFydF9oYW5kbGVyIixmaWxlKX07U1dGVXBsb2FkLnByb3RvdHlwZS5yZXR1cm5VcGxvYWRTdGFydD1mdW5jdGlvbihmaWxlKXt2YXIgcmV0dXJuVmFsdWU7aWYodHlwZW9mIHRoaXMuc2V0dGluZ3MudXBsb2FkX3N0YXJ0X2hhbmRsZXI9PT0iZnVuY3Rpb24iKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTtyZXR1cm5WYWx1ZT10aGlzLnNldHRpbmdzLnVwbG9hZF9zdGFydF9oYW5kbGVyLmNhbGwodGhpcyxmaWxlKX1lbHNlIGlmKHRoaXMuc2V0dGluZ3MudXBsb2FkX3N0YXJ0X2hhbmRsZXIhPXVuZGVmaW5lZCl7dGhyb3cidXBsb2FkX3N0YXJ0X2hhbmRsZXIgbXVzdCBiZSBhIGZ1bmN0aW9uIjt9aWYocmV0dXJuVmFsdWU9PT11bmRlZmluZWQpe3JldHVyblZhbHVlPXRydWV9cmV0dXJuVmFsdWU9ISFyZXR1cm5WYWx1ZTt0aGlzLmNhbGxGbGFzaCgiUmV0dXJuVXBsb2FkU3RhcnQiLFtyZXR1cm5WYWx1ZV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnVwbG9hZFByb2dyZXNzPWZ1bmN0aW9uKGZpbGUsYnl0ZXNDb21wbGV0ZSxieXRlc1RvdGFsKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoInVwbG9hZF9wcm9ncmVzc19oYW5kbGVyIixbZmlsZSxieXRlc0NvbXBsZXRlLGJ5dGVzVG90YWxdKX07U1dGVXBsb2FkLnByb3RvdHlwZS51cGxvYWRFcnJvcj1mdW5jdGlvbihmaWxlLGVycm9yQ29kZSxtZXNzYWdlKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoInVwbG9hZF9lcnJvcl9oYW5kbGVyIixbZmlsZSxlcnJvckNvZGUsbWVzc2FnZV0pfTtTV0ZVcGxvYWQucHJvdG90eXBlLnVwbG9hZFN1Y2Nlc3M9ZnVuY3Rpb24oZmlsZSxzZXJ2ZXJEYXRhKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoInVwbG9hZF9zdWNjZXNzX2hhbmRsZXIiLFtmaWxlLHNlcnZlckRhdGFdKX07U1dGVXBsb2FkLnByb3RvdHlwZS51cGxvYWRDb21wbGV0ZT1mdW5jdGlvbihmaWxlKXtmaWxlPXRoaXMudW5lc2NhcGVGaWxlUG9zdFBhcmFtcyhmaWxlKTt0aGlzLnF1ZXVlRXZlbnQoInVwbG9hZF9jb21wbGV0ZV9oYW5kbGVyIixmaWxlKX07U1dGVXBsb2FkLnByb3RvdHlwZS5kZWJ1Zz1mdW5jdGlvbihtZXNzYWdlKXt0aGlzLnF1ZXVlRXZlbnQoImRlYnVnX2hhbmRsZXIiLG1lc3NhZ2UpfTtTV0ZVcGxvYWQucHJvdG90eXBlLmRlYnVnTWVzc2FnZT1mdW5jdGlvbihtZXNzYWdlKXtpZih0aGlzLnNldHRpbmdzLmRlYnVnKXt2YXIgZXhjZXB0aW9uTWVzc2FnZSxleGNlcHRpb25WYWx1ZXM9W107aWYodHlwZW9mIG1lc3NhZ2U9PT0ib2JqZWN0IiYmdHlwZW9mIG1lc3NhZ2UubmFtZT09PSJzdHJpbmciJiZ0eXBlb2YgbWVzc2FnZS5tZXNzYWdlPT09InN0cmluZyIpe2Zvcih2YXIga2V5IGluIG1lc3NhZ2Upe2lmKG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoa2V5KSl7ZXhjZXB0aW9uVmFsdWVzLnB1c2goa2V5KyI6ICIrbWVzc2FnZVtrZXldKX19ZXhjZXB0aW9uTWVzc2FnZT1leGNlcHRpb25WYWx1ZXMuam9pbigiXG4iKXx8IiI7ZXhjZXB0aW9uVmFsdWVzPWV4Y2VwdGlvbk1lc3NhZ2Uuc3BsaXQoIlxuIik7ZXhjZXB0aW9uTWVzc2FnZT0iRVhDRVBUSU9OOiAiK2V4Y2VwdGlvblZhbHVlcy5qb2luKCJcbkVYQ0VQVElPTjogIik7U1dGVXBsb2FkLkNvbnNvbGUud3JpdGVMaW5lKGV4Y2VwdGlvbk1lc3NhZ2UpfWVsc2V7U1dGVXBsb2FkLkNvbnNvbGUud3JpdGVMaW5lKG1lc3NhZ2UpfX19O1NXRlVwbG9hZC5Db25zb2xlPXt9O1NXRlVwbG9hZC5Db25zb2xlLndyaXRlTGluZT1mdW5jdGlvbihtZXNzYWdlKXt2YXIgY29uc29sZSxkb2N1bWVudEZvcm07dHJ5e2NvbnNvbGU9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIlNXRlVwbG9hZF9Db25zb2xlIik7aWYoIWNvbnNvbGUpe2RvY3VtZW50Rm9ybT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJmb3JtIik7ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoImJvZHkiKVswXS5hcHBlbmRDaGlsZChkb2N1bWVudEZvcm0pO2NvbnNvbGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgidGV4dGFyZWEiKTtjb25zb2xlLmlkPSJTV0ZVcGxvYWRfQ29uc29sZSI7Y29uc29sZS5zdHlsZS5mb250RmFtaWx5PSJtb25vc3BhY2UiO2NvbnNvbGUuc2V0QXR0cmlidXRlKCJ3cmFwIiwib2ZmIik7Y29uc29sZS53cmFwPSJvZmYiO2NvbnNvbGUuc3R5bGUub3ZlcmZsb3c9ImF1dG8iO2NvbnNvbGUuc3R5bGUud2lkdGg9IjcwMHB4Ijtjb25zb2xlLnN0eWxlLmhlaWdodD0iMzUwcHgiO2NvbnNvbGUuc3R5bGUubWFyZ2luPSI1cHgiO2RvY3VtZW50Rm9ybS5hcHBlbmRDaGlsZChjb25zb2xlKX1jb25zb2xlLnZhbHVlKz1tZXNzYWdlKyJcbiI7Y29uc29sZS5zY3JvbGxUb3A9Y29uc29sZS5zY3JvbGxIZWlnaHQtY29uc29sZS5jbGllbnRIZWlnaHR9Y2F0Y2goZXgpe2FsZXJ0KCJFeGNlcHRpb246ICIrZXgubmFtZSsiIE1lc3NhZ2U6ICIrZXgubWVzc2FnZSl9fTs=");
			document.getElementsByTagName("head")[0].appendChild(fz_sc2);
			
			var fz_sc3 = document.createElement("script");
			fz_sc3.innerHTML = base64_decode(warezbbimgkkscript);
			document.getElementsByTagName("head")[0].appendChild(fz_sc3);
			
			
				
			
			
		}
			
	}
	
	$(".topnav:first").prepend(getOption("irclink") && false ? "<b><a href='irc://irc.warez-bb.org'>IRC</a></b> &bull; " : "").parents("table[cellpadding='2']").append('<tr>' +
			'<td align="center" class="topnav"><div id="qksrch" class="gtfodarktheme"><form action="search.php?mode=results" method="post" id="quicksearch">' +
			'Forum: <select class="post" name="search_forum[]">' + getString("selectforum") +
			'</select>' +
			' &nbsp;&bull;&nbsp; <label for="search_keywords">Keywords:</label> <input type="text" style="width: 100px" class="post" id="kaywards" name="search_keywords" />' +
			' &nbsp;&bull;&nbsp; <label for="search_author">Author:</label> <input type="text" style="width: 80px" class="post" name="search_author" size="30" />' +
			' &nbsp;&bull;&nbsp; <label for="msgtxt">Inc. Message Text?</label> <input type="checkbox" name="msgtxt" id="msgtxt" />' +
			'<input type="hidden" name="search_fields" id="srchfields" /><input type="hidden" name="search_terms" value="all" />' +
			' &nbsp;&nbsp; <input type="submit" class="liteoption" value="WBB:SC QuickSearch" />' +
			' &nbsp;&nbsp; <input type="button" class="liteoption" id="hideqksrch" value="Hide" />' +
			'</form></div><div class="gtfodarktheme">' +
			'<a href="profile.php?mode=editprofile#wbbsc-settings">WBB:SC Settings</a>'+(getOption("qksearch") ? ' &bull; ' : '') +
			'<b><a href="#" id="qksrch2">Quick Search</a></b>'+(getOption("yourerunning") ? ' &bull; You\'re running ' +
			'<b><a href="http://www.warez-bb.org/viewtopic.php?t=1489162">WBB:SC</a></b>' +
			'<span id="awesome" style="display: none;"> &amp; <b><a href="http://www.warez-bb.org/viewtopic.php?t=1411540">WBB Dark Theme</a></b></span> by ' +
			'<a href="http://www.warez-bb.org/profile.php?mode=viewprofile&u=233423">Darkimmortal</a>' : '')+'</div></td></tr>');
			
	$("#qksrch").hide();
	
	if(!getOption("qksearch")){
		$("#qksrch2").hide();	
	}
	
	if(!getOption("wbbscwadio")){
		$("#wadio").hide();
	}
	if(typeof z!="boolean"){z=true}
	$("#qksrch2").click(function(){
		$(this).parents("div").hide("normal").prev().show("slow", function(){ $("#kaywards").focus(); });
	});
	
	$("#hideqksrch").click(function(){
		$(this).parents("div").hide("normal").next().show("normal");
	});
	
	
	$("#quicksearch").submit(function(){
		$("#srchfields").val($("#msgtxt").get(0).checked ? "all" : "titleonly");
	});
	
	if(z){
		alert("WARNING!\r\n\r\nThe version of WBB:SC you are currently running has been tampered with and could potentially be leaking your Warez-BB details (if not worse) right now!");
	}
	
	//$(".gensmall > img[title='Goto page']").parents(".gensmall").append(" <a href='javascr"+"ipt:;'>Expand</a>");
	
	
	if(getOption("inlinefirst")){
		$(".row1[width='4%'], .row1[height='34'], .row1[height='30'], .row2[height='30']").each(function(){
			if($(this).next().contents().find("a[href*='viewforum.php']").length === 0 && page("viewforum.php")){
				$(this).append('<img align="bottom" style="padding-bottom: 3px; cursor: pointer" src="http://i35.tinypic.com/xf9bio.gif" class="postexpand" alt="up" title="WBB:SC Inline Post Expand" />')
					.removeAttr("width").attr("nowrap", "nowrap");
			} else if(page("search.php")){
				$(this).append('<img align="bottom" style="padding-bottom: 3px; cursor: pointer" src="http://i35.tinypic.com/xf9bio.gif" class="postexpand" alt="up" title="WBB:SC Inline Post Expand" />')
					.removeAttr("width").attr("nowrap", "nowrap");
			} else if(page("privmsg.php?folder=")){
				$(this).append('<img align="bottom" style="padding-bottom: 8px; cursor: pointer" src="http://i35.tinypic.com/xf9bio.gif" class="postexpand" alt="up" title="WBB:SC Inline Post Expand" />')
					.removeAttr("width").attr("nowrap", "nowrap");
			}
		});
		
		$(".postexpand").click(function(){
			var buton = $(this);
			//if($(".topictitle > a").length > 0){
			//	alert("wut")
			var href = buton.parent("td").parent("tr").contents().find("a[href*='viewtopic.php?t=']:not([href*='&view=']):not([href*='&start='])," +
					" a[href*='privmsg.php'][href*='mode=read']:not([href*='&view=']):not([href*='&start='])").attr("href");
			/*} else {
				alert("lol")
				var href = buton.parents("td").parents("tr").contents(".topictitle").attr("href");
			}*/
			if(buton.attr("alt") == 'up'){
				buton.attr("alt", "down").attr("src", "http://i35.tinypic.com/2viqu0j.gif");
				$("#loading").css({position: "fixed"}).text("WBB:SC Loading...").fadeIn("normal", function(){
					$.ajax({
					dataType: "text",
					cache: true,
					url: href,
					type: "GET",
					timeout: 15000,
					success: function(data){	
						if(page("privmsg.php")){						
							var lookingFor = /(\<td align="right" class="row2">\<span class="explaintitle">From:\<\/span>\<\/td>[\s\S]*?)\<tr>[\r\n]*?\<td class="cat" colspan="2" align="right">/.exec(data);
							var found = lookingFor[1];
							$("#loading").fadeOut("normal");
							buton.parent("td").parent("tr").after('<tr><td colspan="7"><table class="forumline" width="100%" cellspacing="1" cellpadding="3" border="0">' +
								'<tr><th width="150" height="28">Author</th><th width="100%">Message</th></tr><tr>'+found+
								'</table></td></tr>');
						} else {
							var lookingFor = /\<td valign="top" class="row1">\<span class="name">[\s\S]*?<td class="spacerow" colspan="2" height="1">/.exec(data);
							var found = lookingFor[0];
							$("#loading").fadeOut("normal");
							buton.parent("td").parent("tr").after('<tr><td colspan="7"><table class="forumline" width="100%" cellspacing="1" cellpadding="3" border="0">' +
								'<tr><th width="150" height="28">Author</th><th width="100%">Message</th></tr><tr>'+found+
								'<img src="images/spacer.gif" alt="" width="1" height="1" /></td></tr></table></td></tr>');
						}
					},
					error: function(){
						$("#loading").fadeOut("normal");
						buton.click();
						alert("- Warez-BB: SuperCharged -\r\n\r\nAn error occured when gathering the post/PM.\r\n\r\nTry viewing the topic normally :P");
					}
				});
				});
			} else {
				buton.attr("alt", "up").attr("src", "http://i35.tinypic.com/xf9bio.gif");
				buton.parent("td").parent("tr").next().remove();
			}
		});
	}
	
	if(page("privmsg.php?folder=") && getOption("pmreply")){
		$(".row1[height='30'], .row2[height='30']").each(function(){
			var hree = $(this).next().children("a.topictitle").attr("href").replace("read", "reply");
			$(this).append('<a style="color:#839FBC;padding-left:7px;padding-right:5px;position:relative;top:7px;vertical-align:top;" class="genmed" href="'+hree+'" title="WBB:SC Reply">[R]</a>')
				.removeAttr("width").attr("nowrap", "nowrap");
		});
		
	}
	
	if(page("privmsg.php") && page("mode=reply") && getOption("pmquote")){
		$("body > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td div > table.forumline > tbody > tr > td > table > tbody > tr > td[width='100%']").after('<td nowrap="nowrap" valign="top" align="right">' +/*
			'<a title="WBB:SC PM Quote" href="javascript:void(\'addquote(     - only there for WBB Dark Theme ;) \');">' +
			'<img height="18" width="59" border="0" alt="" class="imgtopic" src="http://img4.warez-bb.org/images/lang_english/icon_quote.gif"/>' +*/
			'<a class="wbbsc-quote wbbsc-pmquote" href="javascript:;"><img border="0" src="http://i34.tinypic.com/30kf3h5.gif" alt="" class="imgtopic"/>' +
			'</a></td>');
		
		$(".wbbsc-pmquote").click(function(){
			var txtarea = ad("message");		
			var buton = $(this);
			var name = buton.parents("tr:first").parents("td:first").prev().children(".name").children("b").text();
			
			var found = html2bb(buton.parents("tr:first").parents("tr:first").contents().find(".postbody").get(0));
			found = "[quote=\""+name+"\"]"+found+"[/quote]";
					
			if (txtarea.createTextRange && txtarea.caretPos){
				var caretPos = txtarea.caretPos;
				caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? caretPos.text + found + ' ' : caretPos.text + found;
			} else if (txtarea.selectionEnd && (txtarea.selectionStart | txtarea.selectionStart === 0)){ 
				mozInsert(txtarea, found, "");
			} else {
				txtarea.value += found;
			}	
		});
	}
	
	eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0(1){2("3!\\r\\n\\r\\4 5 6 7:8 9 a b c d e f g h i j k l m o-p q (0 s t) u v!")}',32,32,'if|z|alert|WARNING|nThe|version|of|WBB|SC|you|are|currently|running|has|been|tampered|with|and|could|potentially|be|leaking|your||Warez|BB|details||not|worse|right|now'.split('|'),0,{}))
	if(!getOption("welcome") && $("img[src*='images/wbb_logo']").length > 0){
		
		// @cyrix etc.: please don't remove the messages - if you or anyone else get spammed by them, check your cookie settings or upgrade to Firefox.
		// Hiding them means you will be continually reverted back to defaults, which is just stupid.
	
		eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0=1;',2,2,'z|true'.split('|'),0,{}))
		z=true;
		alert(" - Warez-BB SuperCharged - \r\n\r\nHi, it seems you're new to WBB:SC (or you've just deleted your cookies :P) so I'm just" +
				" about to apply some default settings. Once these settings have been applied, you will be taken to the settings page where you can" +
				" mess around with the many options WBB:SC has to offer.\r\n\r\nIt is recommended that you go view any topic before using the quick search" +
				" to give it a chance to learn what forums and subforums you have access to." +
				" \r\n\r\n" +
				"- Darkimmortal" +
				"\r\n\r\n---------------------" +
				" \r\n\r\n" +
				" If this message continually appears, something is wrong with your browser. Firefox's Greasemonkey offers a superior way of saving data (GM_setValue), which" +
				" is now used automatically by WBB:SC, so it'd be a good idea to switch to Firefox (which is what you really should be using anyway if you like customising" +
				" stuff).\r\n\r\n" +
				" GM_setValue (Firefox only) ="+(void(z=false) ? "" : "")+(typeof GM_setValue == "function" ? " Available :D (yay, no more cookies)" : 
				" Unavailable :( (cookies will have to be used instead)"));
		
		$.each(settingsPage, function(i, val){
			 setOption(val.name, val.preset);
		});
		setOption("welcome", true);
		setOption("setselect", false);
		z=true;
		setString("selectforum", '<option value="-1" selected="selected">All forums</option>' +
			'<optgroup label="Announcements">' +
			'<option value="2"> |-- Announcements</option>' +
			'</optgroup>' +
			'<optgroup label="Listingz">' +
			'<option value="3"> |-- Appz</option>' +
			'<option value="47"> |---- All-In-One</option>' +
			'<option value="9"> |---- Freewares</option>' +
			'<option value="5"> |-- Gamez</option>' +
			'<option value="28"> |---- Console Gamez</option>' +
			'<option value="4"> |-- Moviez</option>' +
			'<option value="57"> |---- TV Showz</option>' +
			'<option value="6"> |-- Muzic</option>' +
			'<option value="38"> |---- Muzic Videos</option>' +
			'<option value="7"> |-- Templatez&amp;Scriptz</option>' +
			'<option value="29"> |---- Template Ripz</option>' +
			'<option value="8"> |-- eBookz</option>' +
			'<option value="83"> |---- Tutorialz</option>' +
			'<option value="20"> |-- Mac &amp; Other OSs</option>' +
			'</optgroup><optgroup label="Requestz &amp; Tradez">' +
			'<option value="15"> |-- Appz requests</option>' +
			'<option value="17"> |-- Gamez requests</option>' +
			'<option value="16"> |-- Moviez requests</option>' +
			'<option value="18"> |-- Muzic requests</option>' +
			'<option value="19"> |-- All other requests</option>' +
			'</optgroup>' +
			'<optgroup label="General">' +
			'<option value="40"> |-- Introduction</option>' +
			'<option value="10"> |-- Off-Topic</option>' +
			'<option value="85"> |---- News</option>' +
			'<option value="87"> |---- Bits and Bobs</option>' +
			'<option value="11"> |-- Forum Comments</option>' +
			'<option value="76"> |---- Milestones</option>' +
			'<option value="12"> |-- Funstuff</option>' +
			'<option value="22"> |-- Link Heaven</option>' +
			'<option value="63"> |-- Graphics</option>' +
			'<option value="79"> |-- Programming</option>' +
			'<option value="30"> |-- Helpdesk</option>' +
			'<option value="26"> |-- Test Me</option>' +
			'<option value="24"> |-- Graveyard</option>' +
			'</optgroup>' +
			'<optgroup label="Wadio">' +
			'<option value="82"> |-- Wadio Talk</option>' +
			'</optgroup>');
			
			
		alert(" - Warez-BB SuperCharged"+(void(z=false) ? "" : "")+" - \r\n\r\nOptions configured successfully, now redirecting"+(void(z=false) ? "" : "")+" you to the WBB:SC Settings page...");
		eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0=1;',2,2,'z|true'.split('|'),0,{}))
		
		if(page("profile.php?mode=editprofile#wbbsc-settings"+(void(z=false) ? "" : ""))){
			location.reload(false);
		} else {
			document.location.href="http://www.warez-bb.org/profile.php?mode=editprofile#wbbsc-settings";
		}
	}
		
	if(top.location.href.indexOf("index.php") > 0){
		//debug("haha");
		$("span.genmed").each(function(){
			if($(this).html().indexOf("ll important announcements") > 0){
				$(".topnav:first").parents("table[cellpadding='2']").append("<tr><td class='topnav' align='center'><span id='versioncheck'>WBB:SC version checking is now in progress...</span></td></tr>");
				
				$.ajax({
					dataType: "text",
					cache: false,
					url: "/viewtopic.php?t=1489162&start=0",
					type: "GET",
					timeout: 15000,
					success: function(data){
						version = /<span style="color:yellow">([0-9]+)<\/span>/i.exec(data);
						version = version[1];
						if(currentVersion < version){
							$("#versioncheck").html("WBB:SC needs <a href='/viewtopic.php?t=1489162&start=0'>updating!</a> - Latest: R"+version+"; Yours: R"+currentVersion);
						} else {
							$("#versioncheck").html("WBB:SC is up to date! - Latest: R"+version+"; Yours: R"+currentVersion);						
						}
						
					}
				});
			}
		});
	}
	
	if(getOption("awesomeness")){
		//$(".topbkg:first ~ table").hide()
		/*
		$("a.postdetails[href='search.php?search_author_id=233423']").parent().append("<br /><br /> - WBB:SC Author - </br > - Dark Theme Creator - <br /><br /><a href='http://imgkk.com'>Imgkk:Epic Image Hosting</a><br />^ Official WBB:SC host.");
		$("a.postdetails[href='search.php?search_author_id=233423']").each(function(){
			$(this).html($(this).html().replace("Posts: ", "Posts: <span style='text-decoration: line-through'>")+"</span> OVER 9000!");
		});
		*/
		$(".topnav").css("opacity", "1.0").hover(function(){
			$(this).stop().fadeTo(200, 1.0);
		}, function(){
			$(this).stop().fadeTo(200, 1.0);
		});
			
	}
	
	if(getOption("tidyforumview")){
		$("td[nowrap='nowrap'] ~ td > span.gensmall").each(function(){
			
			if($(this).html().indexOf("Description: ") != -1){ 
				$(this).html($(this).html().replace(/Description\: /g, ""));
				$(this).parent(":first").attr("lol", "wut");
				debug($(this).parent(":first"));
			}
			
			if($(this).children("img").length > 0){
				$(this).children("img").remove();
				$(this).html($(this).html().replace(/[\[\]]/g, ""));
				//$(this).children("br").remove();
				$(this).wrap("<span style='margin-right: 8px; cursor: default; text-align: left;'></span>");
				$(this).fadeTo(1, 1.0).hover(function(){
					$(this).stop().animate({/*fontSize: "12px",*/ opacity: "1.0"}, 150);
				}, function(){
					$(this).stop().animate({/*fontSize: "10px",*/ opacity: "1.0"}, 150);
				});
				/*if(page("search.php")){
					$(this).parent(":first").siblings(".topictitle").css({position: "relative", top: "6px"});
				}*/
				if(/*page("search.php") ||*/ $(this).parent(":first").parent(":first").attr("lol") == "wut"){
					$(this).css({position: "relative", top: "-6px"});
				}
			}
		});
		$(".topictitle > b").css({fontStyle: "italic", fontWeight: "normal", opacity: "0.8"});
	}
	
	if(getOption("goto")){
		$("td.nav[nowrap='nowrap']").each(function(){
			if($(this).html().indexOf("Goto page") != -1){
				$(this).html($(this).html().replace("Goto page", "<a href='# Please wait a sec...' class='wbbscgoto'>WBB:SC Goto Any Page</a>"));
			}
		});
		$(".wbbscgoto").click(function(){
			var z = prompt(" - WBB:SC Goto Any Page - \n\nType the page number you would like to go to:");
			if(typeof z == "string"){
				var p = parseInt(z, 10)-1;
				var q;
				if(page("search.php")){
					q = p * 50;
				} else {
					q = p * 15;
				}
				location.href = $(this).siblings("a[href*='start=']:first").attr("href").replace(/&start=[0-9]*/, "&start="+q);
			} else {
				return false;
			}
		});
	}
		
	if(getOption("supercharger")){
		
	
		var superCharger = {};
		var superCharger_data = {};
		var superCharger_urls = {
			index: "http://www.warez-bb.org/index.php"
		};
		
		/*window.superCharge = unsafeWindow.superCharge =*/ superCharge = function(){		
			$.each(superCharger, function(i, val){
				if(val === false && superCharger_urls[i]){				
					var fram = document.createElement('iframe');
					fram.frameBorder = '0';
					//fram.style.display = 'none';
					fram.style.position = 'absolute';
					fram.style.left = '0px';
					fram.style.top = '0px';
					fram.style.width = '0%';
					fram.style.height = '0%';
					fram.scrolling = 'auto';
					fram.title=superCharger_urls[i];
					fram.className = 'supercharger';
					fram.lang = i;
					fram.frameBorder = "1";
					superCharger_data[i] = fram;
					superCharger[i] = true;
					$("body").append(fram)//.children("iframe.supercharger:last").get(0).dir = superCharger_urls[i];
					//.children("iframe.supercharger:last").get(0).contentWindow.superCharge = superCharge;
					.children("iframe.supercharger:last").load(function(){ this.frameBorder = "0"; });;
				}
			});
		};
	
		// lol.
		$.fn.superChargeMe = function(extraLarge){
			return this.each(function(){		
				this.oldHref = $(this).attr("href");
				//$(this).attr("href", "javascript:void('       WBB:SC SuperCharger // "+this.oldHref+"       ')");
				if(extraLarge == 'forum'){
					superCharger_urls.forum = this.oldHref;
				}
				if(extraLarge == 'next'){
					superCharger_urls.next = this.oldHref;
				}
				$(this).click(function(e){
					
					$("body").children().not('iframe.supercharger').remove();
					$("body > iframe.supercharger").each(function(){
						if(this.lang == extraLarge){
							if(this.frameBorder == "0" && $(this.contentDocument).contents().find("table").length > 0){
								$(this).css({width: "100%", height: "100%"});
								//debug(this.superCharge);
								//debug(this.window.superCharge);
								//debug($(this));
								//debug($(this.contentDocument));
								//debug($(this.contentDocument).find("iframe.supercharger"));
								//debug($(this).find("iframe.supercharger"));
								top.document.title = this.contentDocument.title;
								$(this.contentDocument).contents().find("iframe.supercharger").srccToSrc();
								//this.contentDocument.location.reload();
								//debug(this);
								//debug(this.contentWindow);
								//debug(this.contentWindow.superCharge);
								//this.contentWindow.superCharge();
							} else {
								$("body").append("<div style='text-align: center; margin-top: 200px; font-size: 14px;'>The SuperCharger cache was not ready or encountered an error. Please wait while WBB:SC takes you to your intended destination normally... :)<br /><br />If this message is appearing continually, ignore it. You're no slower than without the SuperCharger.</div>");
								top.location.href = superCharger_urls[this.lang];//this.src;
							}
						}
					});
					e.preventDefault();
					e.stopPropagation();
					return false;
				});
			});
		};
		
		$.fn.srccToSrc = function(){
			return this.each(function(){	
				var gayyy = $(this);
				//setTimeout(function(){
					//$(this).attr("src", superCharger_urls[$(this).attr("lang")]);// $(this).get(0).dir;
					gayyy.attr("src", gayyy.get(0).title);
					gayyy.attr("title", "");
				//}, 100);
				//this.contentDocument.location.reload();
				//alert($(this).attr("src"));
			});
		};
	
		//if(page("viewtopic.php")){
			superCharger.index = false;
			superCharger.forum = false;
			superCharger.next = false;
			//debug($("a[href='index.php']"));
			$("a[href='index.php']").each(function(){	
				if(!page("index.php")){
					$(this).superChargeMe('index');
				}
				if(!page("viewforum.php")){
					$(this).siblings("a[href*='viewforum']").superChargeMe('forum');
				}
			});
			
			$("a[title*='Page']").each(function(){
				if($(this).html() == "Next"){
					$(this).superChargeMe('next');
				}
			});
					
				
			/*
			var forumLink = $("body > table.bodyline > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td.nav > a[href*='viewforum']:first");
			forumLink.get(0).oldHref = forumLink.attr("href");
			forumLink.attr("href", "javascript:void('     WBB:SC SuperCharger :: "+forumLink.get(0).oldHref+"     ');");
			superCharger_urls.forum = forumLink.get(0).oldHref;
			forumLink.click(function(){
				if(superCharger.forum){
					$("body").children().not('iframe.supercharger').remove();
					$("body > iframe.supercharger").each(function(){
						if(this.lang == 'forum'){
							$(this).css({width: "100%", height: "100%"});
						}
					});
					
				}
			});*/
			
			
		//}
			
		$("a").attr("target", "_top");
		superCharge();
		
		if(!fromSuperCharge()){
			$("iframe.supercharger").srccToSrc();
		}
	}
	
	firstRun();
	//$("#message").val("LOLOLOLOLL");
	//$("input[type='submit'][name='post]:first").trigger('click');
	
	eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0(1){2("3!\\r\\n\\r\\4 5 6 7:8 9 a b c d e f g h i j k l m o-p q (0 s t) u v!")}',32,32,'if|z|alert|WARNING|nThe|version|of|WBB|SC|you|are|currently|running|has|been|tampered|with|and|could|potentially|be|leaking|your||Warez|BB|details||not|worse|right|now'.split('|'),0,{}))
}
WBBSC();



// And as always after my scripts, the classic...

// Enjoy! :D