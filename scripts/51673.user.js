// ==UserScript==
// @name           USO Javascript Library
// @namespace      http://userscripts.org/users/tim
// @description    Tiny Javascript library for Userscripts that supports jQuery like functions.
// @include        http*
// @copyright      Tim Smart
// @version        1.1.4
// @license        GPL GNU version 3.0 or later
// @require        http://userscripts.org/tims-updater/51673.js
// ==/UserScript==

// ================================
// = Here is the minified version =
// ================================
var usoLib=$=function(a,b){return new usoLib.fn.init(a,b)};usoLib.fn=usoLib.prototype={init:function(a,e){a=a||document;e=e||document;if(a.nodeType){a=[a]}else{if(typeof a=="string"){var d=a.split(" || "),a=[],c=0,b=[];while(a=d[c++]){if(a[0]==="#"){if(element=e.getElementById(a.substr(1))){b=b.concat([element])}}else{if(a[0]==="/"){b=b.concat(this.xpath("."+a,e))}else{if(match=a.match(new RegExp("^(.*?)\\.(.*)$"))){if(match[1]==""){if(document.getElementsByClassName){b=b.concat(this.make_array(e.getElementsByClassName(match[2])))}else{b=b.concat(this.xpath(".//*[contains(concat(' ',@class,' '),' "+match[2]+" ')]",e))}}else{b=b.concat(this.xpath(".//"+match[1]+"[contains(concat(' ',@class,' '),' "+match[2]+" ')]",e))}}else{b=b.concat(this.make_array(e.getElementsByTagName(a)))}}}}a=b}}return this.set_array((a.constructor.toString().indexOf("Array")!==-1)?a:this.make_array(a))},set_array:function(a){this.length=0;Array.prototype.push.apply(this,a);return this},make_array:function(c){var b=c.length,a=[];while(b){a[--b]=c[b]}return a},xpath:function(f,d){var e=d=d||document,b=[],c=0;if(e!=document){e=d.ownerDocument}var a=e.evaluate(f,d,null,7,null);while(element=a.snapshotItem(c++)){b.push(element)}return b},each:function(a){return usoLib.each(this,a)},get:function(a){return this[a]?usoLib(this[a]):null},count:function(){return this.length},find:function(a){if(this.length===1){return usoLib(a,this[0])}return usoLib(a)},hide:function(a){if(typeof a==="number"){return this.animate({opacity:"0"},a,function(){usoLib(this).hide()})}else{return this.each(function(){this.$old_display=usoLib.get_style(this,"display");this.style.display="none"})}},show:function(a){if(typeof a==="number"){usoLib(this).css({opacity:"0",display:(this.$old_display?this.$old_display:"")});return this.animate({opacity:"1"},a)}else{return this.each(function(){usoLib(this).css({display:(this.$old_display?this.$old_display:""),opacity:"1"})})}},css:function(a){return this.each(function(c,b){usoLib.each(a,function(d){b.style[d]=this})})},bind:function(b,a){return this.each(function(){this.addEventListener(b,a,false)})},remove:function(){return this.each(function(){this.parentNode.removeChild(this)})},append:function(a){return this.each(function(){this.appendChild(a.cloneNode(true))})},html:function(a){if(typeof a==="string"){return this.each(function(){this.innerHTML=a})}else{return this[0]?this[0].innerHTML:null}},attr:function(a,b){if(!a){return}else{if(typeof b==="string"){return this.each(function(){this.setAttribute(a,b)})}}return this[0]?this[0].getAttribute(a):null},animate:function(d,e,f){if(!this.animation_queue){this.animation_queue=[]}if(this.animating){this.animation_queue.push(arguments);return this}this.animating=true;var a=40,e=e?Math.round(e*(1/a))*a:1000,c=e/a,b=this;setTimeout(function(g){g.animating=false;if(g.animation_queue.length>0){g.animate.apply(g,g.animation_queue[0]);g.animation_queue.shift()}},e+1,this);return this.each(function(){var g=[],j=this,h=0;usoLib.each(d,function(k){var n=usoLib.get_style(j,k),i=/\d(px|%|in|em|pt|pc|ex)$/,m=(match=n.match(i))?match[1]:"",l=parseFloat(this);if(m!=((match=this.match(i))?match[1]:"")){return}else{if(typeof(n=parseFloat(n))!=="number"){return}}g.push({key:k,step:(l-n)/c,start:n,suffix:m})});j.timer=setInterval(function(){h++;usoLib.each(g,function(){j.style[this.key]=this.start+(this.step*h)+this.suffix});if(h===c){clearInterval(j.timer);if(f&&(f.constructor.toString().indexOf("Function")!==-1)){f.call(j)}}},a)})},stop:function(){return this.each(function(){if(this.timer){clearInterval(this.timer)}})}};usoLib.fn.init.prototype=usoLib.fn;usoLib.each=function(b,f){var c=0,d=b.length,a;if(d===undefined){for(a in b){if(f.call(b[a],a,b[a])===false){break}}}else{for(var e=b[0];c<d&&f.call(e,c,e)!==false;e=b[++c]){}}return b};usoLib.get_style=function(c,a){if(c.style[a]){return c.style[a]}else{if(c.currentStyle){return c.currentStyle[a]}else{if(document.defaultView&&document.defaultView.getComputedStyle){var b=document.defaultView.getComputedStyle(c,"");return b&&b.getPropertyValue(a.replace(/([A-Z])/g,"-$1").toLowerCase())}else{return null}}}};

// Here is the full source
// Supports the follow selector methods:
// 
// $("#id"); Selects elements with id "id"
// $(".class"); or $("element.class"); to select by class
// $("//element[@attr='value']"); supports XPath queries. Note: Script automatically prefixes a '.' to keep within context
// 
// $("#id", context); Selects elements with id 'id' within 'context'
// 
// $("#id || element.class || //element[@attr='value']"); You can pipe selectors together with ' || '
//
// Method's:
// $('.class').hide(); Will hide all selected elements. Pass the function a number corresponding to milliseconds to fade out element
// $('.class').show(); Show hidden elements. Pass the function a number corresponding to milliseconds to fade in element
// $('.class').count(); Returns number of elements
// $('.class').css({property: "value", fontWeight: "bold"}); Set CSS values of selected elements
// $('.class').bind('click', handler); Attaches event listener's to the selected elements
// $('.class').remove(); Removes selected elements from the DOM
// $('.class').append(element); Appends a element to selected elements
// $(context).find('.class'); Same as $('.class',context);
// $('.class').animate({opacity:"0",height:"0px"},2000,fn); Animations!
// $('.class').html('Hey!'); Set's the innerHTML. Having no parameter will pass the HTML of the first result.

var usoLib=$=function(selector,context)
{
	return new usoLib.fn.init(selector,context);
};
usoLib.fn=usoLib.prototype={
	init:function(selector,context)
	{
		selector=selector||document;
		context=context||document;
		if(selector.nodeType)selector=[selector];
		else if(typeof selector=='string')
		{
			var selectors=selector.split(' || '),selector=[],i=0,ret=[];
			while(selector=selectors[i++])
			{
				if(selector[0]==="#")
				{
					if(element=context.getElementById(selector.substr(1)))ret=ret.concat([element]);
				}
				else if(selector[0]==="/")ret=ret.concat(this.xpath("."+selector,context));
				else if(match=selector.match(new RegExp('^(.*?)\\.(.*)$')))
				{
					if(match[1]=="")
					{
						if(document.getElementsByClassName)ret=ret.concat(this.make_array(context.getElementsByClassName(match[2])));
						else ret=ret.concat(this.xpath(".//*[contains(concat(' ',@class,' '),' "+match[2]+" ')]",context));
					}
					else ret=ret.concat(this.xpath(".//"+match[1]+"[contains(concat(' ',@class,' '),' "+match[2]+" ')]",context));
				}
				else ret=ret.concat(this.make_array(context.getElementsByTagName(selector)));
			}
			selector=ret;
		}
		return this.set_array((selector.constructor.toString().indexOf('Array')!==-1)?selector:this.make_array(selector));
	},
	set_array:function(array)
	{
		this.length=0;
		Array.prototype.push.apply(this,array);
		return this;
	},
	make_array:function(array)
	{
		var i=array.length,ret=[];
		while(i)ret[--i]=array[i];
		return ret;
	},
	xpath:function(exp,context)
	{
		var doc=context=context||document,ret=[],i=0;
		if(doc!=document)doc=context.ownerDocument;
		var xpath=doc.evaluate(exp,context,null,7,null);
		while(element=xpath.snapshotItem(i++))ret.push(element);
		return ret;
	},
	each:function(callback)
	{
		return usoLib.each(this,callback);
	},
	get:function(i)
	{
		return this[i]?usoLib(this[i]):null;
	},
	count:function()
	{
		return this.length;
	},
	find:function(selector)
	{
		if(this.length===1)return usoLib(selector,this[0]);
		return usoLib(selector);
	},
	hide:function(time)
	{
		if(typeof time==="number")return this.animate({opacity:"0"},time,function()
		{
			usoLib(this).hide();
		});
		else return this.each(function()
		{
			this.$old_display=usoLib.get_style(this,'display');
			this.style.display="none";
		});
	},
	show:function(time)
	{
		if(typeof time==="number")
		{
			usoLib(this).css({opacity:"0",display:(this.$old_display?this.$old_display:"")});
			return this.animate({opacity:"1"},time);
		}
		else return this.each(function()
		{
			usoLib(this).css({display:(this.$old_display?this.$old_display:""),opacity:"1"});
		});
	},
	css:function(style)
	{
		return this.each(function(i,element)
		{
			usoLib.each(style,function(key)
			{
				element.style[key]=this;
			});
		});
	},
	bind:function(type,fn)
	{
		return this.each(function()
		{
			this.addEventListener(type,fn,false);
		});
	},
	remove:function()
	{
		return this.each(function()
		{
			this.parentNode.removeChild(this);
		});
	},
	append:function(element)
	{
		return this.each(function()
		{
			this.appendChild(element.cloneNode(true));
		});
	},
	html:function(html)
	{
		if(typeof html==="string")return this.each(function()
		{
			this.innerHTML=html;
		});
		else return this[0]?this[0].innerHTML:null;
	},
	attr:function(key,value)
	{
		if(!key)return;
		else if(typeof value==="string")return this.each(function()
		{
			this.setAttribute(key,value);
		});
		return this[0]?this[0].getAttribute(key):null;
	},
	animate:function(css,time,callback)
	{
		if(!this.animation_queue)this.animation_queue=[];
		if(this.animating)
		{
			this.animation_queue.push(arguments);
			return this;
		}
		this.animating=true;
		var step_size=40,time=time?Math.round(time*(1/step_size))*step_size:1000,steps=time/step_size,usoLib_obj=this;
		setTimeout(function(usoLib_obj)
		{
			usoLib_obj.animating=false;
			if(usoLib_obj.animation_queue.length>0)
			{
				usoLib_obj.animate.apply(usoLib_obj,usoLib_obj.animation_queue[0]);
				usoLib_obj.animation_queue.shift();
			}
		},time+1,this);
		return this.each(function()
		{
			var stack=[],element=this,i=0;
			usoLib.each(css,function(key)
			{
				var cur=usoLib.get_style(element,key),suffix_re=/\d(px|%|in|em|pt|pc|ex)$/,suffix=(match=cur.match(suffix_re))?match[1]:'',target=parseFloat(this);
				if(suffix!=((match=this.match(suffix_re))?match[1]:''))return;
				else if(typeof(cur=parseFloat(cur))!=="number")return;
				stack.push({
					key:key,
					step:(target-cur)/steps,
					start:cur,
					suffix:suffix
				});
			});
			element.timer=setInterval(function()
			{
				i++;
				usoLib.each(stack,function()
				{
					element.style[this.key]=this.start+(this.step*i)+this.suffix;
				});
				if(i===steps)
				{
					clearInterval(element.timer);
					if(callback&&(callback.constructor.toString().indexOf('Function')!==-1))callback.call(element);
				}
			},step_size);
		});
	},
	stop:function()
	{
		return this.each(function()
		{
			if(this.timer)clearInterval(this.timer);
		});
	}
};
usoLib.fn.init.prototype=usoLib.fn;
usoLib.each=function(object,callback)
{
	var i=0,length=object.length,name;
	if(length===undefined)
	{
		for(name in object)if(callback.call(object[name],name,object[name])===false)break;	
	}
	else for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){};
	return object;
};
usoLib.get_style=function(elem,name)
{
	if(elem.style[name])return elem.style[name];
	else if(elem.currentStyle)return elem.currentStyle[name];
	else if(document.defaultView&&document.defaultView.getComputedStyle)
	{
		var s=document.defaultView.getComputedStyle(elem,"");
		return s&&s.getPropertyValue(name.replace(/([A-Z])/g,"-$1").toLowerCase());
	}
	else return null;
};