// ==UserScript==
// @name           Social Fixer Español BETA 2
// @namespace      http://userscripts.org/users/117815
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
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

// ==/UserScript==
/* 
Social Fixer
(c) 2009-2011 Matt Kruse
http://SocialFixer.com
Traslation
2011 JaViJeC
*/
var version = 6.102;
var DEBUG = false;
var PERFORMANCE = false;
var SCRIPT_TYPE = "greasemonkey";
var undef;

// Main Script
// -----------

(function() { 

// Specifically for Opera
if (window.opera && !/https?:\/\/[^\/]*\.?facebook\.[^\/]+\//.test(window.location.href)) { return; }






var ajax = function(props) {
	GM_xmlhttpRequest(props);
}

// If showing the "Likebox" for Social Fixer in FB, add some styles to control it before exiting
if (location.href.indexOf('likebox.php')>0 && location.href.indexOf('betterfb')>0) {
	GM_addStyle( ((<><![CDATA[
		#LikeboxPluginPagelet .app_content_174424289341 .actorPhoto { display:none; }
		#LikeboxPluginPagelet .app_content_174424289341	.uiStreamStory { padding-right:0px; }
		#LikeboxPluginPagelet .app_content_174424289341	.connect_top { display:none; }
		#LikeboxPluginPagelet .app_content_174424289341 .uiStreamStory ~ .uiStreamStory { display:none; }
		#LikeboxPluginPagelet .app_content_174424289341 .fbConnectWidgetFooter { display:none; }
		#LikeboxPluginPagelet .app_content_174424289341 #load_more_stories { display:none; }
		#LikeboxPluginPagelet .app_content_174424289341 .mainWrapper > .fcg { display:none; }
		#LikeboxPluginPagelet .app_content_174424289341 .actorName { display:none; }
		#LikeboxPluginPagelet .app_content_174424289341 .page_stream { border-top:none; }
		#LikeboxPluginPagelet .app_content_174424289341 .pvm { padding:0; }
	]]></>).toString()) );
	var insertViewPostLink = true;
	document.addEventListener('DOMNodeInserted',function(e) {
		if (!insertViewPostLink) { return; }
		var o=e.target; 
		if (o.nodeType == 3){o=o.parentNode;}
		if (o.nodeType==3) { return; }
		var tn = o.tagName;
		if (tn=="SCRIPT" || tn=="LINK" || tn=="INPUT" || tn=="BR" || tn=="STYLE") { return; }
		var footer = o.querySelector('.uiStreamFooter');
		if (footer) {
			insertViewPostLink = false;
			try {
				var li = document.querySelector('.uiStreamStory');
				var fbid = li.getAttribute('data-ft').match(/"fbid":"(\d+)/)[1];
				footer.innerHTML += '<a href="/betterfb/posts/'+fbid+'" target="_blank" style="padding-left:15px;text-decoration:underline;">&gt;&gt; view post</a>';
			} catch(e) { }
		}
	},false);
}

// Don't run on link redirects and some other cases
var excludes = ['/l.php?u','/ai.php','/plugins/','morestories.php'];
try {
	for (var i=0; i<excludes.length; i++) {
		if (location.href.indexOf(excludes[i])>0 ) { return; }
	}
} catch(e) { }

/*GM_PREFS*/
// ==================================================================
// Extension Option Persistence
// ==================================================================
function setValue(key,val,func) { 
	if (PERFORMANCE) { trace_start('setValue',null,true); }
	var do_set=function() { 
		if (PERFORMANCE) { trace_start('setValue',null,true); }
		try { 
			GM_setValue(key,val); 
		} catch(e) { 
			alert(e); 
		} 
		if(func) { 
			func(key,val); 
		} 
		if (PERFORMANCE) { trace_end('setValue',null,true); }
	};
	do_set.name="setValue.do_set";
	window.setTimeout(do_set,0);
	if (PERFORMANCE) { trace_end('setValue',null,true); }
}
function getValue(key, def, func) {
	if (PERFORMANCE) { trace_start('getValue',null,true); }
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
    if (PERFORMANCE) { trace_end('getValue',null,true); }
    return undef;
}
/*/GM_PREFS*/


// ==================================================================
// Turn off auto-loading of Older Posts when footer is scrolled into 
// view. FB's code sucks and breaks when there are no posts and the
// footer is visible immediately!
// ==================================================================
function setScrollLoad(enabled) {
	try { 
		unsafeWindow.disableScrollLoad=!enabled;
	} catch(e) { }
}
setScrollLoad(false);

// Setup a fake UIIntentionalStream object if it doesn't exist, so FB's sloppy code won't break
if (!unsafeWindow.UIIntentionalStream || !unsafeWindow.UIIntentionalStream.instance) {
	unsafeWindow.UIIntentionalStream={instance:{loadOlderPosts:function(){}}};
}

// ==================================================================
// ERROR REPORTING
// Setup error-reporting really early so we can trap early errors
// ==================================================================
var error_container = null;
var error_list = [];
function add_error(msg,data,classname,func,properties) {
	if (data) {
		msg+='<div class="bfb_data">'+(htmlescape(data).replace(/\n/g,"<br>"))+'</div>';
	}
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
				props.title = "Click para remover el error";
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
	if (badge_counter && badge_count>0) {
		html(badge_counter,badge_count);
		badge_counter.parentNode.style.display="block";
	}
	else {
		html(badge_counter,'');
		badge_counter.parentNode.style.display="none";
	}
}

// ==================================================================
// TRACE functions
// ==================================================================
var performance_monitor_enabled = false;
var tracelog = "";
var trace_stack = "";
var trace_stats = {};
var trace_window = null;
var tracing_paused = false;
var trace_level = 0;
var trace_pad = function() {var pad = "";for (var i=0; i<trace_level; i++) {pad += "&nbsp;&nbsp;&nbsp;";}return pad;};
var trace = function(str) {tracelog += str+"<br>";};
var trace_func_name = function(f,args) {
	var n = "";
	if (typeof f=="function" ) {
		n = f.name;
		if (f && f.arguments && args) {
			n += "(";
			for (var i=0; i<f.arguments.length; i++) {
				if (i>0) { n += ","; }
				var arg = f.arguments[i];
				var a = "";
				if (typeof arg=="function") { a= "[func]"; }
				else if (typeof arg=="object") { a= "[object]"; }
				else if (typeof arg=="string") { a= "\""+arg+"\""; }
				else if (arg) { a= arg.toString(); }
				if (a.length>20) { a = a.substr(0,20) + "..."; }
				n += a;
			}
			n += ")";
		}
	}
	else if (f) { n = f; }
	if (!n) { n = "<anonymous function>"; }
	return n;
};
var trace_start = function(f,details,tracestack) {
	if (!performance_monitor_enabled || tracing_paused) { return; }
	if (typeof tracestack=="undefined") { tracestack=false; }
	var n = trace_func_name(f,false);
	var o = trace_stats[n];
	if (typeof o=="undefined") {
		trace_stats[n] = {name:n,count:0,start:0,elapsed:0};
		o = trace_stats[n]
	}
	o.count++;
	o.start = +(new Date);
	if (tracestack) {
		trace_log(trace_pad() + trace_func_name(f,true) +" "+(details||""));
		trace_level++;
	}
};
var trace_end = function(f) {
	if (!performance_monitor_enabled || tracing_paused) { return; }
	var n = trace_func_name(f,false);
	if (n) {
		var o = trace_stats[n];
		if (o && o.start) {
			o.elapsed += ( +(new Date) - o.start );
			trace_level--;
		}
	}
};
var trace_log = function(s,classname) {
	if (classname){s="<span class=\""+classname+"\">"+s+"</span>";}
	trace_stack += s+"<br>";
};
var trace_update = function() {
	if (!performance_monitor_enabled) { if (trace_update_interval!=null) { clearInterval(trace_update_interval); } return; }
	tracing_paused = true;
	if (trace_window==null) {
		var d = document.createElement('div');
		var content = '<div id="bfb_trace_window_header">Social Fixer Debug Window <img src="https://socialfixer.com/images/close_red_x.gif" style="cursor:pointer;float:right;" onclick="w=document.getElementById(\'bfb_trace_window\');if(w){w.style.display=\'none\';}"><br>';
		content += '<input type="checkbox" id="bfb_trace_cb_scroll_trace"> Auto-scroll ';
		content += '<input type="checkbox" id="bfb_trace_cb_insert"> Show DOM Inserts ';
		content += '<input type="checkbox" id="bfb_trace_cb_messages"> Show Messages ';
		content += '</div><div style="clear:both;"></div><div id="bfb_trace_window_body"></div><div id="bfb_trace_window_call_stack"></div>';
		d.innerHTML = content;
		d.id="bfb_trace_window";
		document.body.appendChild(d);
		var maxw = ( (window.innerWidth - 980)/2 - 40);
		if (maxw<300) { maxw=500; }
		d.style.maxWidth = maxw+"px";
		$('bfb_trace_window_call_stack').style.maxHeight = (window.innerHeight - 50 - 300)+"px";
		trace_window = d;
	}
	var f,trace_funcs=[];
	var h = '<table><thead><tr><th>Function</th><th>Calls</th><th>Elapsed</th><th>Avg</th></tr></thead><tbody>';
	for (f in trace_stats) {
		if (trace_stats[f].elapsed>20 || trace_stats[f].count>50) {
			trace_funcs.push(f);
		}
	}
	trace_funcs = trace_funcs.sort( function(a,b) { return trace_stats[a].elapsed<trace_stats[b].elapsed } );
	for (var i=0; i<trace_funcs.length; i++) {
		var o = trace_stats[trace_funcs[i]];
		h += "<tr><td>"+o.name+"</td><td>"+o.count+"</td><td>"+o.elapsed+"</td><td>"+(o.elapsed/o.count).toFixed(2)+"</td></tr>";
	}
	h += "</tbody></table>";
	html($('bfb_trace_window_body'),h);
	tracing_paused = false;
};
var trace_stack_update = function() {
	if (!performance_monitor_enabled) { if (trace_stack_update_interval!=null) { clearInterval(trace_stack_update_interval); } return; }
	tracing_paused = true;
	if (trace_stack!="") {
		var stack = document.getElementById('bfb_trace_window_call_stack');
		if (stack && stack.innerHTML && stack.innerHTML.length>2500000) {
			html(stack,"");
		}
		if (stack) {
			appendhtml(stack,trace_stack);
			if ($('bfb_trace_cb_scroll_trace','checked')) {
				stack.scrollTop=99999;
			}
			trace_stack = "";
		}
	}
	tracing_paused = false;
};
window.addEventListener('load',trace_update,false);
var trace_update_interval = setInterval(trace_update,5000);
var trace_stack_update_interval = setInterval(trace_stack_update,1000);

// ==================================================================
// UTILITY functions
// ==================================================================
function htmlescape(str) { if(typeof str=="string") { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,"&quot;"); } return ""; }
function parse(str) { try { return JSON.parse(str); } catch (e) { return {}; } }
function _template(s) {if (PERFORMANCE) { trace_start('_template'); }for (var i=1; i<arguments.length; i++) {var arg = arguments[i];if ("object"==typeof arg) { for (var key in arg) { var val = arg[key]; if (typeof val=='undefined') {val = '';} s = s.replace( new RegExp("%"+key+"%","g"),val); } }		else { s = s.replace( new RegExp("%"+i+"%","g"),arg); }	}if (PERFORMANCE) { trace_end('_template'); }	return s;}
var convert_string_to_regex_matches = {};
function convert_string_to_regex(str) {if (typeof convert_string_to_regex_matches[str]!="undefined") { return convert_string_to_regex_matches[str]; }try {var matches = str.match(/^\/(.*?)\/(\w*)$/);var re = new RegExp(matches[1],matches[2]);convert_string_to_regex_matches[str] = re;return re;}	catch(e) { alert("Invalid regular expression:"+str); convert_string_to_regex_matches[str] = null; return null; }}
function trim(str) { if(!str){return str;} if (str.trim) { return str.trim(); } return str.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,""); }
function $(id,prop) { var el=document.getElementById(id); if(!el){return el;} if(typeof prop!="undefined"){return el[prop];} return el;}
function $first(o,cn,func) {if(!o){return null;} if (o && o.getElementsByClassName) { var cns = o.getElementsByClassName(cn); if (cns && cns.length) { if(func) { func(cns[0],o); }; return cns[0]; } } return null; }
function $$(cn,func,context) { $each((context||document).getElementsByClassName(cn),func); }
function $each(els,func){ if (els && els.length) { if (typeof func=="string") { func = new Function(func); } for (var i=els.length-1; i>=0; i--) { func.call(els[i],els[i]); } } }
function $tagname(o,tagname,func) { if(!o){return;}$each(o.getElementsByTagName(tagname),func); }
function bind(el,ev,func,capture) { if (typeof el=="string") { el = $(el); } if (typeof func=="string") { func = new Function(func); } if(typeof capture!="boolean"){capture=false;} if (el && el.addEventListener) { el.addEventListener(ev,func,capture); } }
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
function QS(o,query,propfunc){if(!o||!o.querySelector){return null;}var m=o.querySelector(query);if(!m){return null;}if(typeof propfunc=="undefined"){return m;}if(typeof propfunc=="function"){return propfunc(m);}return m[propfunc];}
function QSA(o,query,func){if(!o||!o.querySelectorAll){return null;}var m=o.querySelectorAll(query);if(!m||m.length==0){return null;}if (typeof func=="string") { func = new Function(func); }if(typeof func!="function"){return m;}for(var i=0;i<m.length;i++){func.call(m[i],m[i]);}return m;}
function match(str,regex,func){if(typeof str!="string"){return null;}var m=str.match(regex);if(m&&m.length){if(typeof func=="function"){for (var i=regex.global?0:1;i<m.length;i++){func(m[i]);}return m;}else{return m.length>1?m[regex.global?0:1]:null;}}return null;}
function url_param(url,param){return unescape(match(url,new RegExp(param+'=([^&]+)','i'))); }
function encode_url_params(o){var u="";for(var i in o){if(u!=""){u+="&";}u+=encodeURIComponent(i)+"="+encodeURIComponent(o[i]);}return u;}
function clickLink(el,bubble) {if(!el){return;}if(typeof bubble!="boolean"){bubble=true;}var e = document.createEvent('MouseEvents');e.initEvent('click',bubble,true,window,0);el.dispatchEvent(e);}
function mouseEvent(el,event,bubble) {if(!el){return;}if(typeof bubble!="boolean"){bubble=true;}var e = document.createEvent('MouseEvents');e.initEvent(event,bubble,true,window,0);el.dispatchEvent(e);}
function press_key(o,code,type) { if(!o){return;}type=type||"keypress";var e=document.createEvent('KeyboardEvent'); if(typeof code=="string"){code=code.charCodeAt(0);} e[e.initKeyboardEvent?'initKeyboardEvent':'initKeyEvent'](type,true,true,window,false,false,false,false,false,code);  o.dispatchEvent(e); }
function time() { return (new Date()).getTime(); }
function delay(func,t){setTimeout(func,t||10);}
function split(str,del){if(typeof str!="string"){return [];}if(!str||!str.split){return [str];}return str.split(del);}
function hide(o){if(o&&o.style){o.style.display="none";}}
function show(o){if(o&&o.style){o.style.display="block";}}
function target(e){ var t=e.target; if (t.nodeType == 3){t=t.parentNode;} return t; }
function to_array(o){ var a=[]; if(o&&o.length) { for (var i=0;i<o.length;i++) { a.push(o[i]); } } return a; }
function object_to_array(o,key,desc){ var i,a=[]; for(i in o){ a.push(o[i]); } if(key){ return sort_array(a,key,desc); } return a; }
function array_to_object(a){var o={};if(a && a.length){for(var i=0;i<a.length;i++){o[a[i]]=a[i];} }return o; }
function sort_array(arr,key,desc){ var before=desc?-1:1; var after=desc?1:-1; return arr.sort( function(a,b){ var ta=typeof a[key]; var tb=typeof b[key]; if (ta=="undefined" && tb=="undefined"){return 0;} if (tb=="undefined"){return before;} if(ta=="undefined"){return after;} return (a[key]>b[key])?before:a[key]==b[key]?0:after; } ); }
function foreach(o,sorttype,func) {var a=[];for (var i in o) { a.push(i); }if (sorttype=='key') { a=a.sort(); }else if (sorttype=='value') { a=a.sort(function(a,b){ return (o[a]>o[b])?-1:o[a]==o[b]?0:1; }); }$each(a,function(){func(this,o[this])});}
function poll(func,interval,max){interval=interval||500;max=max||50;var count=0;var f=function(){ if(count++>max){return;}if (func()===false){ setTimeout(f,interval); } };f();}
// Add CSS to the page
function addGlobalStyle(css) {if (PERFORMANCE) { trace_start('addGlobalStyle'); }GM_addStyle(css);if (PERFORMANCE) { trace_end('addGlobalStyle'); }}
function insertStylesheet(url,id) { var link = el("link",null,{rel:"stylesheet",type:"text/css",href:url}); if(id){link.id=id;} document.getElementsByTagName("head")[0].appendChild(link); trace("Inserted stylesheet:"+url);}
// Mutation functions
// These set an internal flag to denote that we are doing the mutating, so the DOMNodeInserted handlers don't fire
function append(to,el){if(PERFORMANCE){trace_start('append');}if(to&&to.appendChild){ internalUpdate=true; for(var i=1; i<arguments.length; i++) { to.appendChild(arguments[i]); } internalUpdate=false; }; if(PERFORMANCE){trace_end('append');} return to;}
function insertBefore(el,ref){if(PERFORMANCE){trace_start('insertBefore');}internalUpdate=true; if(ref&&ref.parentNode){ref.parentNode.insertBefore(el,ref); internalUpdate=false;}if(PERFORMANCE){trace_end('insertBefore');}};
function html(el,h){if(PERFORMANCE){trace_start('html');}internalUpdate=true; if(typeof el=='string'){el=$(el);}if(el){el.innerHTML=h;} internalUpdate=false;if(PERFORMANCE){trace_end('html');}}
function appendhtml(el,h){if(PERFORMANCE){trace_start('appendhtml');}internalUpdate=true; if(el&&h){el.innerHTML+=h;} internalUpdate=false;if(PERFORMANCE){trace_end('appendhtml');}}
function insertFirst(container,el) {if(PERFORMANCE){trace_start('insertFirst');} insertAtPosition(container,el,1); if(PERFORMANCE){trace_end('insertFirst');}}
function insertAtPosition(container,el,pos) {if(PERFORMANCE){trace_start('insertAtPosition');} if (container && container.childNodes && container.childNodes.length) {var l = container.childNodes.length;if (pos<1) { pos=l+pos+1;}if (pos<1) { pos=1; } if (l>pos-1) { insertBefore(el, container.childNodes[pos-1]); } else { append(container,el); } }if(PERFORMANCE){trace_end('insertAtPosition');}}
function insertAfter(el,ref) { if(PERFORMANCE){trace_start('insertAfter');}var container, ns; if ( (container=ref.parentNode) && (ns=ref.nextSibling) ) { insertBefore(el, ns); } else if (container) { append(container,el); } if(PERFORMANCE){trace_end('insertAfter');}}
function scroll_to_top() {if (document.documentElement) {document.documentElement.scrollTop = 0;} if (document.body) {document.body.scrollTop = 0;}}
function delimited_string_add(str,add,del){str = str||"";del=del||",";var re = RegExp("(^|"+del+")"+add+"("+del+"|$)");if(!re.test(str)){str+=((str!="")?del:"")+add;}return str;}
function ago(when,now) {var diff = Math.floor((now-when)/1000/60);if (diff<60) { return diff+" minutes ago"; }diff = Math.floor(diff/60);if (diff<24) { return diff+" hours ago"; }diff = Math.floor(diff/24);return diff+" days ago";}
function setSelectionRange(input, selectionStart, selectionEnd) {if (input.setSelectionRange) {input.focus();input.setSelectionRange(selectionStart, selectionEnd);}else if (input.createTextRange) {var range = input.createTextRange();range.collapse(true);range.moveEnd('character', selectionEnd);range.moveStart('character', selectionStart);range.select();}}
function setCaretToPos (input, pos) {setSelectionRange(input, pos, pos);}
function cookie(n) { try { return unescape(document.cookie.match('(^|;)?'+n+'=([^;]*)(;|$)')[2]); } catch(e) { return null; } }
function current_style(o,s){ var a=window.getComputedStyle(o,null); if (a) { return a.getPropertyValue(s); } return null; }
function offset(obj) {
	var x= +obj.offsetLeft, y=+obj.offsetTop;
	while(obj=obj.offsetParent) {
		if (obj.offsetLeft) { x+= +obj.offsetLeft; }
		if (obj.offsetTop) { y+= +obj.offsetTop; }
	}
	return position = {left:x,top:y};
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
	if (PERFORMANCE) { trace_start('el'); }
	var o = document.createElement(type);
	if (cn) { o.className=cn; }
	if (props) {for (var i in props) {o[i] = props[i];}}
	if (events) {for (i in events) {o.addEventListener(i,events[i],false);}}
	if (innerHTML) {html(o,innerHTML);}
	if (style) {for (i in style) {o.style[i]=style[i];}}
	if (PERFORMANCE) { trace_end('el'); }
	return o;
}
function button(value,onclick,id) {
	if (PERFORMANCE) { trace_start('button'); }
	var button = el( 'input','',{type:'button','value':value},{click:onclick} );
	var span = el('label','uiButton UIButton UIButton_Blue UIFormButton UIButton_better_fb',{'id':id});
	append(span,button);
	if (PERFORMANCE) { trace_end('button'); }
	return span;
}
function message(str,okFunc,obj) {
	if (PERFORMANCE) { trace_start('message'); }
	var msg = el('div','better_fb_message');
	html( msg, '<div class="better_fb_bulb_spacer"></div>'+str );
	if (obj) { append(msg,obj); }
	okFunc = okFunc || (function(){});
	var ok = el('span','better_fb_close',{innerHTML:'OK'},{click:function() { okFunc(); this.parentNode.parentNode.style.display='none'; } } );
	var ok_wrap = el('div','bfb_close_wrap');
	append(ok_wrap,ok);
	append(msg,ok_wrap);
	append(msg,el('div','bfb_clear'));
	if (PERFORMANCE) { trace_end('message'); }
	return msg;
}
function quickmessage(str,duration,style) {
	duration = duration||5;
	var container = $('bfb_quickmessages');
	if (!container) {
		container = el('div',null,{id:'bfb_quickmessages'});
		append(document.body,container);
		container = $('bfb_quickmessages');
	}
	var msg = el('div','bfb_quickmessage mini_x',{title:'Click to hide'},{click:function(){this.style.display='none';}},str,{cursor:'pointer'});
	if (style) { for(var o in style){msg.style[o]=style[o];} }
	append(container,msg);
	setTimeout( function() { removeChild(msg); }, duration*1000 );
}
// Subscribing to Facebook's Arbiter-controlled events
function subscribe(event,func) {
	if (unsafeWindow && unsafeWindow.Arbiter && typeof unsafeWindow.Arbiter.subscribe=="function") {
		unsafeWindow.Arbiter.subscribe(event,function(a,b) {
			setTimeout(function(){ func(a,b); },10);
		});
	}
}

// ==================================================================
// DOM INSERTION
// ==================================================================
// Trigger a function when an element with a certain ID is added to the document
function onIdLoad(id,func,watch_stream) {
	if (PERFORMANCE) { trace_start('onIdLoad'); }
	var o = document.getElementById(id);
	if (o) { func(o,id,o); } // Call it right away if it already exists
	watchDOMNodeInserted('#'+id,func,watch_stream);
	if (PERFORMANCE) { trace_end('onIdLoad'); }
}
// Trigger a function when elements matching a selector is added to the document
function onSelectorLoad(selector,func,watch_stream) {
	if (PERFORMANCE) { trace_start('onSelectorLoad'); }
	var els = document.querySelectorAll(selector);
	if (els && els.length) { // Call it right away if it already exists
		for (var i=0; i<els.length; i++) {
			func(els[i],selector);
		}
	} 
	watchDOMNodeInserted(selector,func,watch_stream);
	if (PERFORMANCE) { trace_end('onSelectorLoad'); }
}
var internalUpdate = false; // FLAG to keep track of internal moves which should NOT trigger the DOMNodeInserted hooks!
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
// UNLOAD HANDLER
// ===================================================
// Trigger a function when an element with a given ID is removed from the document
var onUnload = (function() {
	var unloadselectors = "";
	var unloadhandlers = {};
	window.addEventListener('DOMNodeRemoved',function(e) {
		if (PERFORMANCE) { trace_start('DOMNodeRemoved',null,true); }
		if (unloadselectors=="") { return; }
		var o = e.target;
		if (o.nodeType==3 || internalUpdate) { return; }
		var tn = o.tagName;
		if (tn=="SCRIPT" || tn=="LINK" || tn=="BR" || tn=="STYLE") { return; }
		var els = to_array(o.querySelectorAll(unloadselectors));
		if (unloadhandlers[o.id]) {
			els.push(o);
		}
		for (var i=0; i<els.length; i++) {
			var id = els[i].id;
			var funcs = unloadhandlers[id];
			if (funcs) {
				var newfuncs = [];
				for (var j=0; j<funcs.length; j++) {
					funcs[j].f.call(els[i],[els[i]]);
					if (funcs[j].persist) {
						newfuncs.push(funcs[j]);
					}
				}
				unloadhandlers[i] = newfuncs;
			}
		}
		if (PERFORMANCE) { trace_end('DOMNodeRemoved',null,true); }
	},false);
	return function(ids,func,persist) {
		if (typeof ids=="string") {
			ids=[ids];
		}
		for (var i=0; i<ids.length; i++) {
			var id = ids[i];
			unloadselectors = delimited_string_add(unloadselectors,'#'+id);
			unloadhandlers[id] = unloadhandlers[id] || [];
			unloadhandlers[id].push({'f':func,'persist':persist});
		}
	}
})();

/* Trigger a function when an element exists and has content */
function onElementContent(id,func,doc,delay,count) {
	delay = delay || 500;
	doc = doc || document;
	count= count||0;
	var o = doc.getElementById(id);
	if (o==null || !o.childNodes || o.childNodes.length==0) {if (count++>30) {func(null);}else {setTimeout( function() { onElementContent(id,func,doc,delay,count) } ,delay);}}
	else {func(o);}
}

// ===================================================
// "Select All" friends in events popup
// ===================================================
onSelectorLoad('.fbProfileBrowserListContainer',function(o) {
	if (QS(o,'.checkableListItem')) {
		if ($('bfb_select_all_friends')==null) {
			var dialog_content = getParentByClass(o,'dialog_content');
			var tbody = QS(dialog_content,'.filterBox tbody');
			var select_all = button('Select All',function() { QSA(dialog_content,'.checkableListItem a.anchor',function(a) { clickLink(a); }); },'bfb_select_all_friends');
			var tr = append( el('tr'), append( el('td',null,{colSpan:2},null,null,{textAlign:'right'}), el('span',null,null,null,'(Scroll user list to bottom to load all friends before clicking Select All!)'), select_all) );
			append(tbody, tr);
		}
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
// Activate a theme url
// ===================================================
function apply_theme(url,default_url) {
	var theme_style = $('bfb_theme');
	if (typeof url=="undefined") { url = default_url; }
	if (!theme_style) {
		if (url) { insertStylesheet(add_theme_url_parameters(url),'bfb_theme'); }
	}
	else {
		if (url) { theme_style.href=add_theme_url_parameters(url); }
		else { removeChild(theme_style); }
	}
}
function add_theme_url_parameters(url) {
	var now = new Date();
	url = url.replace(/bfb_theme_year/g,now.getFullYear());
	url = url.replace(/bfb_theme_month/g,now.getMonth());
	url = url.replace(/bfb_theme_date/g,now.getDate());
	url = url.replace(/bfb_theme_hour/g,now.getHours());
	url = url.replace(/bfb_theme_minutes/g,now.getMinutes());
	url = url.replace(/bfb_theme_seconds/g,now.getSeconds());
	return url;
}

// ==================================================================
// First order of business - find out who we are!
// ==================================================================
var userid = "anonymous";
var m,a = QS(document,'#navAccountPic,.headerTinymanName');
if (a && a.href && /profile/i.test(a.href)) {
	var href = a.href;
	if (m = href.match(/id=(\d+)\b/)) { userid = m[1]; }
	else if (m = href.match(/\/([a-z0-9\.]+)\?ref=profile/)) { userid = m[1]; }
}
else if (a && a.href) {
	if (m=a.href.match(/facebook\.[^\/]+\/(.*)[?$\/]/)) {
		if (m && m.length && m.length>0) {
			userid = m[1];
		}
	}
}
//if (userid=="anonymous") { return; }

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
	,friend_activity: { type:'iframe', url:url_prefix+'/home.php?sk=ru', ttl: 3600 }
};
function get_remote_content(type,func,ref,force_refresh) {
	if (PERFORMANCE) { trace_start('get_remote_content'); }
	var rc = remote_content[type], response;
	if (rc) {
		// First check the cache!
		var type_key = userid+"/"+type;
		var last_check_prop = type_key+'/last_check';
		getValue([last_check_prop,type_key],[0,null],function(values) {
			var last_check = +values[last_check_prop];
			var cache = values[type_key];
			var t = time();
			if (!force_refresh && cache && ( (t-last_check) <= (rc.ttl*1000)) ) {
				// Use cached content!
				trace("Using cached content for type:"+type);
				func(cache);
			} else {
				if (typeof rc.queue=="undefined") { rc.queue=[]; }
				// Add the func to the queue
				rc.queue.push(func);
				trace("Refreshing cached content for type:"+type);
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
	if (PERFORMANCE) { trace_end('get_remote_content'); }
}
function load_remote_content(type,ref,func,loading_msg,empty_msg,force_refresh) {
	if (PERFORMANCE) { trace_start('load_remote_content'); }
	if (loading_msg) { html(ref,loading_msg); }
	get_remote_content(type,function(res) {
		var content = func(res) || empty_msg;
		html(ref,content);
		if (PERFORMANCE) { trace_end('load_remote_content'); }
		return content;
	},ref,force_refresh);
	if (PERFORMANCE) { trace_end('load_remote_content'); }
}
/*
function fetch_content_in_iframe(url,id,func) {
	var iframe = el("iframe",null,{src:url});
	iframe.style.visibility="hidden";
	iframe.style.position="absolute";
	iframe.addEventListener('load',function(e) {
		try {
			var doc = e.target.contentDocument || e.target.contentWindow.document;
			var check = function() {
				var e = doc.getElementById(id);
				if (e) { 
					func(e); 
					e=null; doc=null; iframe.src = null;
					if (iframe && iframe.parentNode) { iframe.parentNode.removeChild(iframe); }
					iframe=null;
				}
				else { setTimeout(check,200); }
			};
			check();
		}
		catch (e) { add_exception(e); }
	},false);
	unsafeWindow.console.log(iframe);
	append(document.body,iframe);
}
*/

// ==================================================================
// CONSTANTS
// FACEBOOK CLASS NAMES, ETC
// ==================================================================
var feedCommentClass = "commentList";
var timestampClass = " uiStreamSource timestamp ";
var streamContainerSelector = ".UIIntentionalStream_Content,.group_mall";
var streamCollapsedClass = "uiStreamCollapsed";
var storySelector = ".uiUnifiedStory,.mall_post";

var delete_img = "data:image/gif,GIF89a%15%00%15%00%F7%FF%00%FF%F4%FF%FF%F8%F9%EC%89_%DC%5B2%D85%19%DF%5DL%F3aH%E2M%2C%DDR-%D5K%1D%A32%0F%E6Y%3E%E6V%2B%E2qa%FE%FE%FE%E9%3E%09%CBI%23%E6%83j%EAR2%DBb%3B%E2c4%DES3%E9iN%FC%FD%FF%D8%2C%05%CCR)%E2%5DA%E8pK%DBkD%F8%FF%FF%F6%FE%FF%ECK%14%CF%3C%0B%FB%FD%FA%FC%FF%FF%ED%7Bi%B5%2C%03%E7kI%FF%FF%FB%E2tS%DDcE%D6B%0C%DF%5D%3C%D1N%24%F3%8Bs%DBW%3C%EC%5D%3C%D9D%15%B43%13%E2V%26%E5P%1B%E4%7Db%DDZ*%AC*%04%A8.%13%EDlT%E6nV%FF%FF%FD%FF%FF%F8%E2sZ%E6L%16%EBN%23%E6bB%E5b%3C%D9F%1A%E2Z6%AB%3C%22%EAa3%FC%FC%FB%B12%19%E6Q2%E2N'%FD%FF%F9%AD9%1E%E4M%18%E9%7Fb%E3J%0D%E7xe%BA%25%06%E3cA%FF%FD%FD%FF%FB%FD%FD%FF%F3%E6rZ%E9jG%E4L%1C%E3N%23%FF%FD%FF%FF%FC%FF%FF%FB%FF%FF%F9%FF%FB%FF%FF%FF%FF%F4%FB%FF%FD%FF%FD%FE%FF%FF%DE%EE%5CC%EAQ%25%EB%88k%E1S%3D%E5%5DM%D7B%17%ED%A2%83%DAD%2B%E9N0%B0.%0C%EA%B2%99%E1%3F%18%DE%60-%E6cG%CEF%1E%E2%8Cq%D80%01%DD8%00%E0V%17%ED%A4%91%EB%AB%90%A5%3F%17%AE7%19%F9%89u%E6jR%E4%80q%F0WO%F7%FF%FE%B2D%2B%A9%26%00%ED%96x%E2t%5D%E4I%18%E9M%1C%EEYC%E0K%23%E3W6%CF%40%16%E5%60M%E0dL%DDt%5E%E1iD%E4%5D%25%EBZ-%E3G)%E8%60F%D2A%22%FCh%5E%D8D%1F%E9bN%DFO*%EByU%F6td%C8%3D%20%E7%90t%ED%90q%FF%FA%F1%F0g%40%FF%FB%F5%DBK3%FF%FC%F9%FF%FD%FA%E0C%18%E6%88l%EB%82b%EA%82i%EEgT%E4v%5B%EDy%60%EE%80a%EF%7Cg%EB%EF%FB%E2fB%E2fG%DCnU%F3%C0%95%E7fF%F9%FF%FD%E8v%5C%DF%EE%F4%EA%E6%FD%D70%03%E1%7FR%D38%0C%EDpP%D96%0B%ED%8F%83%DD8%0B%EE%C5%C1%EAQ%17%F4%CE%C1%EF%A6%9D%F6%FC%FA%A36%15%DF%8Fx%AE4%11%F2%D2%DD%F8%B8%B8%E1G%0B%B20%11%ECA%0D%EEI%0F%E0iS%E8j%5E%E0nS%C5)%03%E6nS%F7%FF%F2%EA%89v%E8nI%EBpN%EClM%A8%40%25%DFrS%B10%08%FF%DA%DF%A2%20%00%EEwa%EBa%22%AE-%0E%E8%90x%B2Q1%ED%92%7F%EC%94%7C%DFW%1D%DCK%1E%E0uY%D5Z1%F6%CA%E1%FC%D3%E3%DDjK%E0N%1F%E7fQ%F1%9B%84%F2%9F%8F%FC%FC%F2%FF%FD%F0%E7%5D%40%F5q%5C%EF_D%E6E%11%E4M%20%E7P)%E6T%23%E1R2%E9sY%E8v%5B%E2%5C%13%EEwY%E1F0%E3M4%F5%FE%FF%E0i%3F%D9A%02%F3%5BD%EDh%3B%CEJ%1A%FF%FE%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%15%00%15%00%00%08%FF%00%FF%FD%3B%D5o%0B%00%1D%FD%FA%5D%F0%D7%C1%1F%2F%11%0E%FC%E5%B8%22%F0%DF4lMN%882D%26%92%86t%DF%5CH%40%20%C1%5D%99%0C%E1%FEu%B94g%97%1FK%BE%22%CCX%B2d%94%ABx%D1%C4%15%18%E0%26%1B%2C%2C%23%E8%A81%C3%E2%0E%A8R%A5f%8C%F83%E5Y3%1F%84%CE%FC%0A%20B%5E9s%DBX%E415%C9%19%AD%12%CF%D6qH%A7%A1%C2%A6%5E%FDZm%D0f%8B%99.%24%7F%10%91%D3%C7%A1E%81%2F%C1%DC%D1X!%24%CB%15%3Co%04%7C%F2%D7%AF%83%85T((%8C%D9%B3%C7%81%91%0A%2B%92%F4%F3%D2(%94%98%3CM%88D%C9%91N%8F%91~%9A%02%208%80%80o%3F%1D%16%9A%D0%AB%F6%C8%5B%0E%0F%5C%D888w%A5%5B%A0%23%92%22%7B!%A2b%07%25Y%3Bv%18%CB%A1%C5%C1%96%0B%0Cz0%B2r%24%81%1D%7F%7B%82%1C%3BA%0A%C7%8D%7D%A8%3ALf%10%03%8D%8CvV%12%14%FD%F1%D7%C9%DE%8D)%AA%9C%E1%40%86%C5%DF%15%24%FD%B8%C5%F8%D0%AE%0A%90_WL%C0C%E1C%5D%83%0D%26%5C%10%02%05%22h%81%8E%0C%3D(%01%C8%0B%C3%F8s%C18%13P%C1%8A2R%60!E%26%A9%1C%A2%C52%FD%E4%C2%03%20)%5C%E3%40%17%9E%2C%F0%84%01%26%B4%E2%05%15%99%FC0%845%98%F8U%0C%3B%B3%90%10%00%14%8C%240%01%18%B8D%81%CF%13m%24%A2%88%0B%0Cp%B2%0A%13%0F%D4R%03%14%FD%DCR%85%0A%03h%A0%82%20.%0E%B0%C8%3C%EF%84%C1%840%0F%60P%03a%04%40R%0F%02%DF%D0%D0B%051H%40%88%1C%83%14CL%3Eq%C0A%8D%0E%AF%40%40%40%25%908%02A%02%10%00%C1O!k%A4%00%02%08%B1%60%90%0C4%F7%FC%03%0C%1F%0A%D80%0C%0C6%14%A1%00%0Ci%90%20%8D%13N%90%D0G%1D%E0Tt%05%17X%88%80%85%0E%178%B0%87%7BHt%B0%07%16X%BC%22P%40%00%3B";
var pause_img = "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%00%00%01%00%01%00%00%FF%DB%00%84%00%09%06%06%0C%06%05%09%08%07%08%0A%0E%09%0A%0D%16%0E%0D%0C%0C%0D%1A%13%14%10%16%1F%1C!%20%1F%1C%1E%1E%23'2*%23%25*%25%1E%1E%1F%3B%2C%2F3*8%2C8%15*15B*5%26%2B%3A)%01%09%0A%0A%0D%0B%0D%19%0E%0D%19)%1C%16%244*))))))%2C)))))))))))))))%2C))))))))))%2C))))))))))))))%FF%C0%00%11%08%00%14%00%14%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1A%00%00%02%02%03%00%00%00%00%00%00%00%00%00%00%00%00%00%06%01%04%02%05%07%FF%C4%000%10%00%00%05%02%02%05%0C%03%00%00%00%00%00%00%00%00%00%01%02%03%05%04%06%11%12%07%13AQR%2312Sadq%92%A3%B2%B3%D1%16!%22%FF%C4%00%17%01%01%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%02%03%01%00%FF%C4%00%16%11%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%01%11%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00q%9E%98%8B%B2%AC%E8%E9Yx%EDj*5l%F2%0C6%B5%9A%D4%83V'%98%CB%84%C5%5B%8E%F6%83%B6!%A1%A4kb%1DS3%2Ck%E9%C9%9Af%8DINT%2B%FA%C5E%81%F2%85%CD%8E%D0%B9%A6%A7%B3%E8%A6%19%3B%AA%98%F8%5C%0A%FAWs%3D%87%60%17%0Ci%97%A6%C0wFH%E9W%AD%1BTS-6%CB-!%26%C1%2B%04%A4%88%BAJ%00%9B%D9%DDd%CBG%DD%D3%EEP%03%CA%9E%AA%D3%5C%B5%0DS6%DAP%CE%08A%11b%93%D8%5E%23%3F%CA%EAz%B6%3C%A7%F6%00%0A%03%5B%2B(%E5mR%5Cu-%E6%24%11~%88%F7%9Fh%80%00s_%FF%D9";
var play_img = "data:image/gif,GIF89a%14%00%14%00%F7%00%00%00%00%00%FF%FF%FF%F8%F8%FA%F5%F6%FB%F3%F4%F9%F0%F1%F6%EE%EF%F4%ED%EE%F3%EB%EC%F1%E3%E4%E9%FA%FB%FF%F9%FA%FE%F0%F1%F5%EF%F0%F4%7F%83%8E%81%85%90%84%87%90%DF%E3%EE%DE%E2%ED%DD%E1%EC%DA%DE%E9%E3%E7%F2%DC%DF%E8%DA%DD%E6%E9%EC%F5%86%89%90%E0%E4%ED%DE%E2%EB%E2%E6%EF%EE%F1%F8%E8%EB%F2%E6%E9%F0%E4%E7%EE%DF%E2%E9%7C%82%8E%D9%DF%EB%D8%DE%EA%D7%DD%E9%EB%EC%EEz%82%8F%D4%DD%EC%D6%DE%EB%88%8B%90%87%8A%8F%86%89%8E%8C%8F%94%F4%F7%FC%F2%F5%FA%EF%F2%F7%EC%EF%F4%EB%EE%F3%EA%ED%F2%E9%EC%F1%DB%E2%EC%D5%DC%E6u%82%93dlw%83%8B%96%D8%E5%F6%D7%E4%F5%D5%E2%F3%D2%DF%F0%88%90%9B%D0%DC%EC%9F%A7%B2%D0%D8%E3%D9%E1%EC%D8%E0%EBv%83%93%82%8F%9F%CA%D7%E7%C7%D4%E4%D0%DD%ED%CF%DC%EC%CE%DB%EB%DA%E7%F7%D6%E3%F3%D1%DB%E7%D7%E1%ED%D5%DF%EB%8B%90%96%F4%F9%FF~%85%8D%8E%95%9D%EA%F1%F9%60p%80%7F%8F%9F%83%93%A3%81%91%A1%8A%9A%AA%89%99%A9%BD%CD%DD%C2%D2%E2%BF%CF%DF%BE%CE%DE%C8%D8%E8%C6%D6%E6%CE%DE%EE%87%90%99%85%8E%97%84%8D%96%83%8C%95%DC%E5%EE%E7%F0%F9%E4%ED%F6%E2%EB%F4%5Eo%7Fx%89%99%7B%8C%9Cz%8B%9B%7D%8E%9E%7C%8D%9D%7F%90%A0%83%94%A4%82%93%A3%89%9A%AAw%85%92%BD%CE%DE%BC%CD%DD%BB%CC%DC%B8%C9%D9%C3%D4%E4%C1%D2%E2%BF%D0%E0%BE%CF%DF%C8%D9%E9%C7%D8%E8%C6%D7%E7%CC%DD%ED%CA%DB%EB%C7%D7%E6%C4%D4%E3z%84%8D~%88%91%CA%D8%E5%D9%E7%F4%DD%EB%F8%D8%E2%EB%EB%F5%FE%E9%F3%FC%E1%EB%F4%82%89%8F%DE%E5%EB%D1%D8%DE%F2%F9%FF%F1%F8%FE%EF%F6%FC%EC%F3%F9%E9%F0%F6%E5%EC%F2x%86%91t%7D%84%DD%EB%F6%E0%EE%F9%8F%98%9F%DF%E8%EF%D9%E2%E9%EA%F3%FA%E7%F0%F7%E2%EB%F2%E1%EA%F1%DB%E0%E4%D3%D8%DC%F3%F8%FC%F1%F6%FA%F0%F5%F9%EF%F4%F8%EE%F3%F7%EC%F1%F5%EA%EF%F3%E4%E9%ED%F4%F8%FB%E3%E7%EAy%86%8F%7D%8A%93%88%95%9E%DB%E8%F1%E4%F1%FA%DF%EC%F5%F3%FA%FF%FA%FD%FF%7B%89%92z%88%91%7F%8D%96%81%8F%98%C3%D1%DA%E3%F1%FA%E2%F0%F9%DE%EB%F3%E8%F5%FD%E6%F3%FBp%7B%81%7F%8A%90%82%8D%93%87%92%98r%7B%80%87%90%95%DE%E9%EF%EE%F9%FF%EB%F6%FC%E9%F4%FA%E7%F2%F8%E6%F1%F7%DF%E8%ED%DE%E7%EC%EE%F7%FC%EB%F4%F9%EA%F3%F8%E9%F2%F7%E0%E5%E8%DC%E1%E4%7C%8B%92%7F%8C%92~%8B%91%E6%F5%FC%EB%F8%FE%EA%F7%FD%E7%F4%FA%82%8D%91%81%8C%90%DC%E4%E7%F2%FA%FD%EE%F6%F9%E1%E9%EC%F3%FC%FF%F4%F8%F9%EC%F6%F8%F2%FD%FF%F3%FE%FF%F4%FE%FF%F6%FF%FF%F8%FF%FF%F9%FF%FF%FC%FF%FF%FD%FD%FD%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%14%00%14%00%00%08%FF%00q%DD%B2U%AB%95%2BB%85%82%FD%D2t%89%D8%B0FS%C8%E4%00%82%E3U.Y%B1%60%F5Z%A4%AC%D8%A7O%CC%96Ar%F4%C8L%90!%3E%08%F1*%A7(Q2O%9C6I%A2%E4%ED%5B%A9T%95%CC%9DA%23%A6%CC%B13%A0%3E937)%12)U%A8LI%7B1%AAS%1A4c%A4%40%A3%82%0E%1D7J%A7B%A5c%95nU%B8%05%D1%9A!%3B%26%0C%CA%AC(%A7D%01%00%D0%C0%04%83%B6%E0%8C%1D3%11%F7%180%16%A3%D2%A5%A3%B5vm%00%01%01%CE%99%1B%17x%B0%B6%162%5C%C0P%D0%B7%AF%BAn%E4%C6%3D%8E%BCME%8C%01%05%1A4n%2C%EEZ%B6%CE%D9%A8%AD%98A%C0%C0%81%CD%9B%9F%3D%C3%E6%ABZ%06%0F%1Dh%20%40%BD%D9%935%5D%D3%20%80%C0%00%E2%03%ED%BE%8Cve%CAd%EB%81%86%0A%1B8%FC%0E%BE%04%13%22D%96%1CL%90%40!%02%EA%04N%0Ee_%C2%9D%8E%08%12%23l%D4th%7C%C1B%08%14L%D0%EB%60%A2%83%C8%89')%9A%08Y%5B%A2%C6%8F%FA%3Fx%E4%DF%C1c%C7%8D%22%83%24!%08%12G%1C%A1%84%11%86%20h%C8%82F%F4%10%06%17X%C4%A1G%1Fy%00%F2%87%1F%80%04%A2%E1%86%1A~%01%86%17X%CCq%87%1Dx%E8Q%C7%1E%7C%EC%A1%E2%8A*n%D1%C5%16Y%A8!%87%1Bm%C0%F1%06%1Ck%B0%A1%E3%8E%3AZq%85%16U%04%04%00%3B";
var up_img = "data:image/gif,GIF89a%15%00%14%00%E6%00%00%F8%F8%F8%F3%F3%F3%E6%E6%E6%EA%EA%EA%E8%E8%E8%F9%F9%F9%E9%E9%E9%F5%F5%F5qqq%DC%DC%DC%9B%9B%9Bvvv%DB%DB%DB%7B%7B%7BZZZlllmmm~~~%B3%B3%B3%B4%B4%B4%C3%C3%C3%9A%9A%9Ahhh%9D%9D%9Ddddrrr%98%98%98%A2%A2%A2%A8%A8%A8%EF%EF%EFaaa%AA%AA%AA%97%97%97%D2%D2%D2%A0%A0%A0%94%94%94%D0%D0%D0%FE%FF%FE%F6%F6%F6%FC%FC%FC%F4%F4%F4%CC%CC%CC%FD%FE%FD%5C%5C%5C%92%92%92%8F%8F%8F%A6%A6%A6%91%91%91%A7%A7%A7%A3%A3%A3%8E%8E%8E%F1%F1%F1%D9%D9%D9%A9%A9%A9MMM%DA%DA%DAEEESSSbbb%D8%D8%D8%5E%5E%5EzzzpppUUUtttgggsss___fffIIIxxx%DD%DD%DDcccPPP%E7%E7%E7%EB%EB%EB%CA%CA%CA%EC%EC%EC%AC%AC%AC%8C%8C%8C%E4%E4%E4%E5%E5%E5%ED%ED%ED%E3%E3%E3%EE%EE%EE%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%15%00%14%00%00%07%FF%80!%13N%84%85%86%87%84%13!%12%24%07U%8F%90%91%92%07%24%12%1F%073T%9A%9B%9C%9A%1D%1DT3%07%1F5U%9D%A7%A7U50URTR%B0%B1%B2%B0%AFRU0.UM%B1M%BD%0C%0B%0C%BD%B0%BBMU.1%25K%BDM%CA%0C%0E8D%09%CC%CA%BD%251%1B*KK%03%DA4%2BE%3F%2B%3EG%DA%E5*%1B%22'%03%06%03%037C6%0E%18A%18%40%09%ED%ED'%22%17%05%06%FE4%1E%92%F0%B0%F0%A0%A0%05%23%09%FC%11(pA%01%00%02%04v%20%C9%A1%03%02%82%8B%17!%F4%60%00%11%80%02%0D%07%94%88%24%60%A2%00%04!%0BR%16Xi%82%80%92%03%1A%40%A0%10%20R%80M%0F%19%1A%E8%2C%40S%09M%14%20F%04%88B4%8A%80(%0E2DX%0A%C0h%D1%00%23X%0C-J%14%0A%80%ABW%A9F%09%C0%E2E%00(S%A0%88%1DK6%EC%D8%00%2FZ%04%98%C2%B6%AD%5B%B6%60(%C5N%09%D0B%86%92%04o%F3%BAM%A0D%86%02%0E%14%98%08%1EL%B80%05%0E%0ARTx%C2%B8%B1%E3%C7%8C%2B%A4%08%04%00%3B";
var down_img = "data:image/gif,GIF89a%15%00%14%00%E6%00%00%F5%F5%F5%F3%F3%F3%E6%E6%E6%E9%E9%E9%E8%E8%E8qqqBBB%DA%DA%DA%9B%9B%9B%EA%EA%EA%F6%F6%F6%8F%8F%8F%DB%DB%DBvvv%EF%EF%EFlllhhhVVVcccRRR%AA%AA%AA%F1%F1%F1%98%98%98%B4%B4%B4%A2%A2%A2%FD%FE%FD%97%97%97%F9%F9%F9%94%94%94%9D%9D%9D%C3%C3%C3%F4%F4%F4%A0%A0%A0%D2%D2%D2%CC%CC%CC%D0%D0%D0%FE%FF%FE%B3%B3%B3%FC%FC%FC%DC%DC%DC%A9%A9%A9GGG%A3%A3%A3%8E%8E%8E%A7%A7%A7aaaiii%A8%A8%A8%92%92%92%A6%A6%A6ddd%91%91%91%9A%9A%9A%F8%F8%F8%FA%FA%FAmmm___%87%87%87%5E%5E%5E%F2%F2%F2OOO%8B%8B%8B%7C%7C%7C%82%82%82%3C%3C%3CJJJooo%40%40%40ZZZzzz~~~%99%99%99%EC%EC%EC%CA%CA%CA%EB%EB%EB%AC%AC%AC%8C%8C%8C%E7%E7%E7%E4%E4%E4%ED%ED%ED%E5%E5%E5%EE%EE%EE%E3%E3%E3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%15%00%14%00%00%07%FF%80!%17K%84%85%86%87%84%17!%25%23%00S%8F%90%91%92%00%23%25%14%00%15Q%9A%0EQ%9C%9A%9F%9E%15%00%14(S%9F%A7%A8%A8S(%2CSOQO%B1%AF%B2%B4%B2S%2C1SH%B1H%BB%40C%06%C1%BC%BCS1*%24J%BDHJJ%06%3C%11%D06%BD%C9H%24*%18%19%CC%DAJ)D%12%DF6%DBJ%19%18%20%26%09%03%078)A%13-%10%F0-%132%07%09%09%26%20%1D%1B%03%FC%0CB%3A2%5C%3C%18%E8%C2G%02%05%03%08l%E8%80%A0%06%81%87%03%18%14%B9Q%A0b%81%1CJ%10%26%AC%81%C0%02%80%26%20A20R%A0A%83%1EH%14%10%08%09%C0%82%86%0F%02%9A%C4%8Cy%E0G%83%05H%00%AC%0C%F9A%03%87%00P%A0%08%08%1A%F4%C0%91%9CC%85%06%0D%C0%01%06P(N%88%06%15%B0%23%A9%D4%000f%04p%22E%8A%93%AF%60%C3%86%0D0cA%80%AE%5D%B9%A2%F5%CA%16m%80%05%2B%22%9A%9CXK%B7%EE%89%26%2B%10%BC%F0%90%A4%AF%DF%BF%80%3D%BC%40%20%82%06%93%C3%88%13%2B%3ELCD%20%00%3B";
var x_img = "data:image/gif,GIF89a%09%00%09%00%A2%00%00%00%00%00%FF%FF%FF%AD%BD%D6%EA%EE%F4%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%04%00%2C%00%00%00%00%09%00%09%00%00%03%168B%CC%A2b%B9H%E2%B2%CD%D2Vw%D6%DFEa%D3%23eC%02%00%3B";
var wrench_23 = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%15%00%00%00%15%08%06%00%00%00%A9%17%A5%96%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%0AMiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSwX%93%F7%16%3E%DF%F7e%0FVB%D8%F0%B1%97l%81%00%22%23%AC%08%C8%10Y%A2%10%92%00a%84%10%12%40%C5%85%88%0AV%14%15%11%9CHU%C4%82%D5%0AH%9D%88%E2%A0(%B8gA%8A%88Z%8BU%5C8%EE%1F%DC%A7%B5%7Dz%EF%ED%ED%FB%D7%FB%BC%E7%9C%E7%FC%CEy%CF%0F%80%11%12%26%91%E6%A2j%009R%85%3C%3A%D8%1F%8FOH%C4%C9%BD%80%02%15H%E0%04%20%10%E6%CB%C2g%05%C5%00%00%F0%03yx~t%B0%3F%FC%01%AFo%00%02%00p%D5.%24%12%C7%E1%FF%83%BAP%26W%00%20%91%00%E0%22%12%E7%0B%01%90R%00%C8.T%C8%14%00%C8%18%00%B0S%B3d%0A%00%94%00%00ly%7CB%22%00%AA%0D%00%EC%F4I%3E%05%00%D8%A9%93%DC%17%00%D8%A2%1C%A9%08%00%8D%01%00%99(G%24%02%40%BB%00%60U%81R%2C%02%C0%C2%00%A0%AC%40%22.%04%C0%AE%01%80Y%B62G%02%80%BD%05%00v%8EX%90%0F%40%60%00%80%99B%2C%CC%00%208%02%00C%1E%13%CD%03%20L%03%A00%D2%BF%E0%A9_p%85%B8H%01%00%C0%CB%95%CD%97K%D23%14%B8%95%D0%1Aw%F2%F0%E0%E2!%E2%C2l%B1Ba%17)%10f%09%E4%22%9C%97%9B%23%13H%E7%03L%CE%0C%00%00%1A%F9%D1%C1%FE8%3F%90%E7%E6%E4%E1%E6f%E7l%EF%F4%C5%A2%FEk%F0o%22%3E!%F1%DF%FE%BC%8C%02%04%00%10N%CF%EF%DA_%E5%E5%D6%03p%C7%01%B0u%BFk%A9%5B%00%DAV%00h%DF%F9%5D3%DB%09%A0Z%0A%D0z%F9%8By8%FC%40%1E%9E%A1P%C8%3C%1D%1C%0A%0B%0B%ED%25b%A1%BD0%E3%8B%3E%FF3%E1o%E0%8B~%F6%FC%40%1E%FE%DBz%F0%00q%9A%40%99%AD%C0%A3%83%FDqanv%AER%8E%E7%CB%04B1n%F7%E7%23%FE%C7%85%7F%FD%8E)%D1%E24%B1%5C%2C%15%8A%F1X%89%B8P%22M%C7y%B9R%91D!%C9%95%E2%12%E9%7F2%F1%1F%96%FD%09%93w%0D%00%AC%86O%C0N%B6%07%B5%CBl%C0~%EE%01%02%8B%0EX%D2v%00%40~%F3-%8C%1A%0B%91%00%10g42y%F7%00%00%93%BF%F9%8F%40%2B%01%00%CD%97%A4%E3%00%00%BC%E8%18%5C%A8%94%17L%C6%08%00%00D%A0%81*%B0A%07%0C%C1%14%AC%C0%0E%9C%C1%1D%BC%C0%17%02a%06D%40%0C%24%C0%3C%10B%06%E4%80%1C%0A%A1%18%96A%19T%C0%3A%D8%04%B5%B0%03%1A%A0%11%9A%E1%10%B4%C118%0D%E7%E0%12%5C%81%EBp%17%06%60%18%9E%C2%18%BC%86%09%04A%C8%08%13a!%3A%88%11b%8E%D8%22%CE%08%17%99%8E%04%22aH4%92%80%A4%20%E9%88%14Q%22%C5%C8r%A4%02%A9Bj%91%5DH%23%F2-r%149%8D%5C%40%FA%90%DB%C8%202%8A%FC%8A%BCG1%94%81%B2Q%03%D4%02u%40%B9%A8%1F%1A%8A%C6%A0s%D1t4%0F%5D%80%96%A2k%D1%1A%B4%1E%3D%80%B6%A2%A7%D1K%E8ut%00%7D%8A%8Ec%80%D11%0Ef%8C%D9a%5C%8C%87E%60%89X%1A%26%C7%16c%E5X5V%8F5c%1DX7v%15%1B%C0%9Ea%EF%08%24%02%8B%80%13%EC%08%5E%84%10%C2l%82%90%90GXLXC%A8%25%EC%23%B4%12%BA%08W%09%83%841%C2'%22%93%A8O%B4%25z%12%F9%C4xb%3A%B1%90XF%AC%26%EE!%1E!%9E%25%5E'%0E%13_%93H%24%0E%C9%92%E4N%0A!%25%902I%0BIkH%DBH-%A4S%A4%3E%D2%10i%9CL%26%EB%90m%C9%DE%E4%08%B2%80%AC%20%97%91%B7%90%0F%90O%92%FB%C9%C3%E4%B7%14%3A%C5%88%E2L%09%A2%24R%A4%94%12J5e%3F%E5%04%A5%9F2B%99%A0%AAQ%CD%A9%9E%D4%08%AA%88%3A%9FZIm%A0vP%2FS%87%A9%134u%9A%25%CD%9B%16C%CB%A4-%A3%D5%D0%9Aigi%F7h%2F%E9t%BA%09%DD%83%1EE%97%D0%97%D2k%E8%07%E9%E7%E9%83%F4w%0C%0D%86%0D%83%C7Hb(%19k%19%7B%19%A7%18%B7%19%2F%99L%A6%05%D3%97%99%C8T0%D72%1B%99g%98%0F%98oUX*%F6*%7C%15%91%CA%12%95%3A%95V%95~%95%E7%AATUsU%3F%D5y%AA%0BT%ABU%0F%AB%5EV%7D%A6FU%B3P%E3%A9%09%D4%16%AB%D5%A9%1DU%BB%A96%AE%CERwR%8FP%CFQ_%A3%BE_%FD%82%FAc%0D%B2%86%85F%A0%86H%A3Tc%B7%C6%19%8D!%16%C62e%F1XB%D6rV%03%EB%2Ck%98Mb%5B%B2%F9%ECLv%05%FB%1Bv%2F%7BLSCs%AAf%ACf%91f%9D%E6q%CD%01%0E%C6%B1%E0%F09%D9%9CJ%CE!%CE%0D%CE%7B-%03-%3F-%B1%D6j%ADf%AD~%AD7%DAz%DA%BE%DAb%EDr%ED%16%ED%EB%DA%EFup%9D%40%9D%2C%9D%F5%3Am%3A%F7u%09%BA6%BAQ%BA%85%BA%DBu%CF%EA%3E%D3c%EBy%E9%09%F5%CA%F5%0E%E9%DD%D1G%F5m%F4%A3%F5%17%EA%EF%D6%EF%D1%1F704%086%90%19l18c%F0%CC%90c%E8k%98i%B8%D1%F0%84%E1%A8%11%CBh%BA%91%C4h%A3%D1I%A3'%B8%26%EE%87g%E35x%17%3Ef%ACo%1Cb%AC4%DEe%DCk%3Cabi2%DB%A4%C4%A4%C5%E4%BE)%CD%94k%9Af%BA%D1%B4%D3t%CC%CC%C8%2C%DC%AC%D8%AC%C9%EC%8E9%D5%9Ck%9Ea%BE%D9%BC%DB%FC%8D%85%A5E%9C%C5J%8B6%8B%C7%96%DA%96%7C%CB%05%96M%96%F7%AC%98V%3EVyV%F5V%D7%ACI%D6%5C%EB%2C%EBm%D6WlP%1BW%9B%0C%9B%3A%9B%CB%B6%A8%AD%9B%AD%C4v%9Bm%DF%14%E2%14%8F)%D2)%F5Sn%DA1%EC%FC%EC%0A%EC%9A%EC%06%ED9%F6a%F6%25%F6m%F6%CF%1D%CC%1C%12%1D%D6%3Bt%3B%7Crtu%CCvlp%BC%EB%A4%E14%C3%A9%C4%A9%C3%E9Wg%1Bg%A1s%9D%F35%17%A6K%90%CB%12%97v%97%17Sm%A7%8A%A7n%9Fz%CB%95%E5%1A%EE%BA%D2%B5%D3%F5%A3%9B%BB%9B%DC%AD%D9m%D4%DD%CC%3D%C5%7D%AB%FBM.%9B%1B%C9%5D%C3%3D%EFA%F4%F0%F7X%E2q%CC%E3%9D%A7%9B%A7%C2%F3%90%E7%2F%5Ev%5EY%5E%FB%BD%1EO%B3%9C%26%9E%D60m%C8%DB%C4%5B%E0%BD%CB%7B%60%3A%3E%3De%FA%CE%E9%03%3E%C6%3E%02%9Fz%9F%87%BE%A6%BE%22%DF%3D%BE%23~%D6~%99~%07%FC%9E%FB%3B%FA%CB%FD%8F%F8%BF%E1y%F2%16%F1N%05%60%01%C1%01%E5%01%BD%81%1A%81%B3%03k%03%1F%04%99%04%A5%075%05%8D%05%BB%06%2F%0C%3E%15B%0C%09%0DY%1Fr%93o%C0%17%F2%1B%F9c3%DCg%2C%9A%D1%15%CA%08%9D%15Z%1B%FA0%CC%26L%1E%D6%11%8E%86%CF%08%DF%10~o%A6%F9L%E9%CC%B6%08%88%E0Gl%88%B8%1Fi%19%99%17%F9%7D%14)*2%AA.%EAQ%B4Stqt%F7%2C%D6%AC%E4Y%FBg%BD%8E%F1%8F%A9%8C%B9%3B%DBj%B6rvg%ACjlRlc%EC%9B%B8%80%B8%AA%B8%81x%87%F8E%F1%97%12t%13%24%09%ED%89%E4%C4%D8%C4%3D%89%E3s%02%E7l%9A3%9C%E4%9AT%96tc%AE%E5%DC%A2%B9%17%E6%E9%CE%CB%9Ew%3CY5Y%90%7C8%85%98%12%97%B2%3F%E5%83%20BP%2F%18O%E5%A7nM%1D%13%F2%84%9B%85OE%BE%A2%8D%A2Q%B1%B7%B8J%3C%92%E6%9DV%95%F68%DD%3B%7DC%FAh%86OFu%C63%09OR%2By%91%19%92%B9%23%F3MVD%D6%DE%AC%CF%D9q%D9-9%94%9C%94%9C%A3R%0Di%96%B4%2B%D70%B7(%B7Of%2B%2B%93%0D%E4y%E6m%CA%1B%93%87%CA%F7%E4%23%F9s%F3%DB%15l%85L%D1%A3%B4R%AEP%0E%16L%2F%A8%2Bx%5B%18%5Bx%B8H%BDHZ%D43%DFf%FE%EA%F9%23%0B%82%16%7C%BD%90%B0P%B8%B0%B3%D8%B8xY%F1%E0%22%BFE%BB%16%23%8BS%17w.1%5DR%BAdxi%F0%D2%7D%CBh%CB%B2%96%FDP%E2XRU%F2jy%DC%F2%8ER%83%D2%A5%A5C%2B%82W4%95%A9%94%C9%CBn%AE%F4Z%B9c%15a%95dU%EFj%97%D5%5BV%7F*%17%95_%ACp%AC%A8%AE%F8%B0F%B8%E6%E2WN_%D5%7C%F5ym%DA%DA%DEJ%B7%CA%ED%EBH%EB%A4%EBn%AC%F7Y%BF%AFJ%BDjA%D5%D0%86%F0%0D%AD%1B%F1%8D%E5%1B_mJ%DEt%A1zj%F5%8E%CD%B4%CD%CA%CD%035a5%ED%5B%CC%B6%AC%DB%F2%A16%A3%F6z%9D%7F%5D%CBV%FD%AD%AB%B7%BE%D9%26%DA%D6%BF%DDw%7B%F3%0E%83%1D%15%3B%DE%EF%94%EC%BC%B5%2BxWk%BDE%7D%F5n%D2%EE%82%DD%8F%1Ab%1B%BA%BF%E6~%DD%B8GwO%C5%9E%8F%7B%A5%7B%07%F6E%EF%EBjtol%DC%AF%BF%BF%B2%09mR6%8D%1EH%3Ap%E5%9B%80o%DA%9B%ED%9Aw%B5pZ*%0E%C2A%E5%C1'%DF%A6%7C%7B%E3P%E8%A1%CE%C3%DC%C3%CD%DF%99%7F%B7%F5%08%EBHy%2B%D2%3A%BFu%AC-%A3m%A0%3D%A1%BD%EF%E8%8C%A3%9D%1D%5E%1DG%BE%B7%FF~%EF1%E3cu%C75%8FW%9E%A0%9D(%3D%F1%F9%E4%82%93%E3%A7d%A7%9E%9DN%3F%3D%D4%99%DCy%F7L%FC%99k%5DQ%5D%BDgC%CF%9E%3F%17t%EEL%B7_%F7%C9%F3%DE%E7%8F%5D%F0%BCp%F4%22%F7b%DB%25%B7K%AD%3D%AE%3DG~p%FD%E1H%AF%5Bo%EBe%F7%CB%EDW%3C%AEt%F4M%EB%3B%D1%EF%D3%7F%FAj%C0%D5s%D7%F8%D7.%5D%9Fy%BD%EF%C6%EC%1B%B7n%26%DD%1C%B8%25%BA%F5%F8v%F6%ED%17w%0A%EEL%DC%5Dz%8Fx%AF%FC%BE%DA%FD%EA%07%FA%0F%EA%7F%B4%FE%B1e%C0m%E0%F8%60%C0%60%CF%C3Y%0F%EF%0E%09%87%9E%FE%94%FF%D3%87%E1%D2G%CCG%D5%23F%23%8D%8F%9D%1F%1F%1B%0D%1A%BD%F2d%CE%93%E1%A7%B2%A7%13%CF%CA~V%FFy%EBs%AB%E7%DF%FD%E2%FBK%CFX%FC%D8%F0%0B%F9%8B%CF%BF%AEy%A9%F3r%EF%AB%A9%AF%3A%C7%23%C7%1F%BC%CEy%3D%F1%A6%FC%AD%CE%DB%7D%EF%B8%EF%BA%DF%C7%BD%1F%99(%FC%40%FEP%F3%D1%FAc%C7%A7%D0O%F7%3E%E7%7C%FE%FC%2F%F7%84%F3%FB%25%D2%9F3%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%02%15IDATx%DA%AC%94%B1k%14A%18%C5%7F%EF%CB%E6%40%22%FE%01ba%97%BF%40%11%24%8D%A9%04E%1BS%045%8A%88%22*V%82h%9A(h*%2B%89H%14%84%60!(%82%11Am%2ClLeeg'%A8H%9A%A0%D1%DC%EE%3C%8B%DB%5C%F6.%CB%E5%0E%1C%98ewv%F8%CD%9By%EF%1B%D9%E6%7F%B7%EC%C9%E2%A7-'%A9%7C%1A%8F%85t%14%18%05%B6%D9%7C%03%BF%91%F4%5C%1AZy%FB%FE%23%F3%B3%A7%C9%D4%DF%E2%23%12%8F%84%26%3A%16%13%80%26m%EF%B4%8B%DB%07%0F%ECk)%EDg%F7%12%13%C0D%D7%F0W%E0%95%CD%82%A4%25I4%86%87Z%D0%FE%84%EAX%F5%CB%F65%E0%81%A4%E5%F6%18%F0%FB%CF%DF%164m!U%B0%2BBc%9DPVl%2FG%94gm%83M%5E%B2%22%04%3D%7Bh%2F%B0%BD%0A%8D%D0%25%85%1A-%86q%87%A1%10E2%BD%BA%CDx%CD%06Fm%EF%AF%C4q%87%A4S%92%CE%00d%A1%9E%FEgR-%14%A1)%C4%AA%A4I%C1a%60wH%0B%C0%C3%ACHn%CB%A6%CA7(4.i%B4%0E%1A%A1%93%C0Tu%2C%CF%8B%A7-%25%98%E4%0D%07%D6w%24%89a%C5%CD-k%A2l)y%3E%25%BF%04%C8%1A%8D%8Cf3%91e%A2%99'%24Q%A4DH7%22%B4%A7%9F%C0%D9~%B7%96%17%97%D7%1D%CB6%02%AE%96%BA%A1%20BWB%EA%A5%F2%170R%BE%7Fn%E6%E98f%B5%7D4%DD%B3%93%B9%1E%D2%DD%1AP%01%BC%B6%7D%24%25%8F%95%A7%F5s%AD%99%1FJ)%7D%EFp%B7%12h%224%231%5D%03%5C%B4%3D%03%2C%AD%9F%B9%ED%B9%BCH%2F%F2%C2_%D4%AE)6%95%E9lHWk%80w%CA%B2l%DB%23D%91%D2%85%3CO%D4%052%2B%E31%07%9C%AF%F9%7F%0Bj%95%F7%BEOm%EEG%E8%5C%8D%A3%F7R%F2t%CB%C0%01%A1%DD%01.3%F7%B8H%E9%22%06d%22%82%18%00%1C%40%B3K%E33%DBg7%C7%7B0%A5%3F*%E0%0Fy%EE%13%12%CD%EA%9D0(%FB%DF%00%B2-%F2%E4G%C5%8Df%00%00%00%00IEND%AEB%60%82";
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
 '400,447':'Subscription notications',
 '77': 'Tagged posts',
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
    "106548749379931":"21 questions",
    "14465560457":"6 waves Gaming Network",
    "145712665484714":"60photos",
    "56078883483":"6waves Poker",
    "2998790650":"Addicting Games",
    "114440918573776":"Age of Champions",
    "223102214157":"Ameba Pico",
    "99953444729":"Animal Paradise",
    "136850942021":"Anita predictions",
    "50342477628":"Anket",
    "20851133681":"Appbank",
    "17091798008":"Are YOU Interested",
    "174582889219848":"Army Attack",
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
    "124194560873":"Bubble Island",
    "114224881951277":"Bubble Paradise",
    "115086491859102":"Bubble Popp 2",
    "167633464091":"Bubble Popp",
    "148430031885488":"Bubble Saga",
    "6705455684":"BuddyPoke",
    "22257989976":"Bumper Sticker",
    "2427603417":"Bumper Sticker",
    "347486061825":"Cafe Life",
    "101539264719":"Cafe World",
    "256799621935":"Car Town",
    "116823891666136":"Casino City",
    "46755028429":"Castle Age",
    "100160675317":"Castle And Co",
    "2318966938":"Causes",
    "162065369655":"Chase Community Giving",
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
    "271369798991":"Demande  tes Amis",
    "127995567256931":"Diamond Dash",
    "53714299244":"Do you really know me",
    "2388926799":"Dogbook",
    "9729051194":"Doorbell",
    "119468838217":"DoubleDown Casino",
    "111896392174831":"Dragons of Atlantis",
    "149777331718970":"Draw My Thing",
    "75127329583":"Drink it up",
    "298341310193":"Drinks for All",
    "247431880944":"DROID",
    "113719625324737":"EA SPORTS FIFA Superstars",
    "122580857763901":"eBuddy",
    "102965689949":"Element Analyst Creator",
    "164285363593426":"Empires And Allies",
    "217680310882":"Entrevista tus Amigos",
    "372268249833":"Evony",
    "127760087237610":"Facebook Platform Opt In",
    "117955111903":"Family Feud",
    "2359239297":"Family Tree",
    "5388815661":"Were Related",
    "108468622525037":"FanBridge Fan Page Creator",
    "64571521476":"FARKLE",
    "56748925791":"Farm Town",
    "156383461049284":"FarmVille",
    "102452128776":"FarmVille",
    "131704200228509":"Fashion Designer",
    "315888392043":"Fashion World",
    "181988617439":"Ferme Pays",
    "257873289864":"Fish Friends",
    "154109904146":"Fish Isle",
    "100354007223":"Fish World",
    "151044809337":"FishVille",
    "133911659959418":"Flag Balls World Cup 2010",
    "2372251387":"Flock Browser",
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
    "123725371037047":"HOGELDNZ",
    "2552096927":"Honesty Box",
    "125043264175761":"HootSuite",
    "183319479511":"HootSuite",
    "2339854854":"Horoscopes",
    "333713683461":"Horoscopes",
    "129653133741884":"Horscopo Dirio",
    "315878856166":"Horse Saga renamed",
    "190435500990432":"Hosted iFrame",
    "299672925361":"Hotel City",
    "7242238915":"HotShot",
    "81708710756":"How Well Do You Know Me",
    "41158896424":"HTC Sense",
    "2345673396":"Hug Me",
    "4673352481":"Hugged",
    "80541436066":"Hugs",
    "6917629807":"iCast",
    "56456021122":"Icy Tower",
    "3105775330":"iHearts",
    "6627984866":"iLike this Artist",
    "124024574287414":"Instagram",
    "10754253724":"iPhoto Uploader",
    "17604663455":"IQ test",
    "25148877350":"Is Cool",
    "94483022361":"Island Paradise",
    "6307004335":"iSmile",
    "119866041395334":"It Girl",
    "400560945032":"Jeux Flash Gratuits",
    "368596809331":"Jewell Stars",
    "8725050364":"JibJab",
    "329338272587":"Jumping Dog",
    "119607768061558":"Jungle Jewels",
    "87409181318":"Jungle Jewels",
    "307957522611":"Jungle Life",
    "385041300032":"Kingcom",
    "130402594779":"Kingdoms of Camelot",
    "10585847530":"Kisses",
    "127979500596129":"Komu iftlik",
    "92922535871":"La Meteo del Humor",
    "48268916695":"La meteo du moral",
    "92264180565":"LArc en Ciel du Moral",
    "53702860994":"LG Phone",
    "2405948328":"Likeness",
    "99663102846":"Lil Farm Life",
    "48187595837":"LivingSocial",
    "233260194406":"Lounge Bar",
    "207737238125":"Love Percentage Daily",
    "353489950377":"Lovely Farm",
    "35512920026":"Ma Fiche",
    "10979261223":"Mafia Wars",
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
    "49340319393":"Nokia social app",
    "27694818115":"Nokia",
    "56137638329":"Nokia",
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
    "266989143414":"Pioneer Trail",
    "176047503611":"piZap Photo Editor",
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
    "45439413586":"RSS Graffiti",
    "72687635881":"Samsung Mobile",
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
    "221476177866279":"Socialbox",
    "19935916616":"Songs",
    "8630423715":"Sorority Life",
    "19507961798":"SoundCloud",
    "174829003346":"Spotify",
    "169868688162":"SPP Ranch",
    "241219935874":"sProphet  Sports Predictions",
    "338375791266":"Starbucks Card",
    "8109791468":"Status Shuffle",
    "123338877715314":"Stick Run",
    "267470608481":"StumbleUpon",
    "57001576911":"Sunshine Ranch",
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
    "2227470867":"Test Console",
    "130409810307796":"Tetris Battle",
    "2376198867":"Tetris Friends",
    "2389801228":"Texas HoldEm Poker",
    "113315295379073":"The Hardest Game of the World",
    "44898431470":"The Mood Weather Report",
    "121943604485916":"The Pokerist club  Texas Poker",
    "144959615576466":"The Sims Social",
    "130095157064351":"The Smurfs amp Co",
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
var seconds = 1000;
var minutes = seconds * 60;
var hours = minutes * 60;
var days = hours * 24;
var weeks = days * 7;

// ==================================================================
// GRAPH API - TODO!
// ==================================================================
/*
var graph_token_refreshed = false;
var graph_token_pref = userid+'/access_token';
function set_graph_token(token) {
	access_token = token;
	setValue(graph_token_pref,token);
}
function get_graph_token(func) {
	if (access_token==null) {
		getValue(graph_token_pref,null,function(token) {
			if (token!=null) {
				set_graph_token(token);
				func(token);
			}
			else {
				refresh_graph_token(func);
			}
		});
	}
	else {
		func(access_token);
	}
}
function refresh_graph_token(func) {
	ajax({'method':'GET',headers:{'Cache-Control':'no-cache'},'url':'https://developers.facebook.com/docs/reference/api','onload':function(res) {
		var token = null;
		var src = res.responseText;
		var m = src.match(/https:\/\/graph\.facebook\.com\/me\/friends\?access_token=([^"]+)/);
		if (m && m.length>1) { token = m[1]; }
		if (token) {
			set_graph_token(token);
			graph_token_refreshed = true;
			return func(token);
		}
		add_error("Error retrieving Token");
		return func(null);
	}});
}
function graph(url,func) {
	var make_request= function(token){
		if (!token) { return; }
		ajax({'method':'GET',headers:{'Cache-Control':'no-cache'},'url':'https://graph.facebook.com/'+url+'?access_token='+token,'onload':function(res) {
			try {
				var response = JSON.parse(res.responseText);
				if (response && !response.error) {
					return func(response);
				}
				else if (response && response.error) {
					if (!graph_token_refreshed) {
						refresh_graph_token(make_request);
					}
					else {
						add_error("Graph API Error for ["+url+"]:\n"+response.error.message);
					}
				}
			} catch(e) { add_exception(e); }
		}});
	};
	get_graph_token(make_request);
}
*/

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
			if (PERFORMANCE) { trace_start('options.load',null,true); }
			var self = this;
			getValue(this.userid+'/prefs',null,function(storedPrefs) {
				trace_start('options.load.getValue callback',null,true);
				if (storedPrefs && storedPrefs!=null && storedPrefs!='' && storedPrefs!="null") {
					try {
						self.prefs = JSON.parse(storedPrefs);
						self.loaded = true;
					}
					catch (e) {
						self.prefs = {};
						add_error("Your stored preferences could not be read because they have become corrupt. Sorry, but your options been reset! This shouldn't happen again! The error was:",e.toString());
						setValue(self.userid+"/prefs","");
					}
				}
				if (typeof callback=="function") { 
					callback(self); 
				}
				trace_end('options.load.getValue callback',null,true);
			});
			if (PERFORMANCE) { trace_end('options.load',null,true); }
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
			if (PERFORMANCE) { trace_start('options.set',null,true); }
			var self = this;
			var do_save = function() {
				if (PERFORMANCE) { trace_start('this.set.do_save',null,true); }
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
				if (typeof savenow=="undefined" || savenow) {
					o[prop]=val;
					self.save(func);
				}
				else {
					o[prop] = val;
				}
				if (PERFORMANCE) { trace_end('this.set.do_save',null,true); }
				return val;
			}
			if (typeof savenow=="undefined" || savenow) {
				self.load(function() {
					do_save();
				});
			}
			else {
				do_save();
			}
			if (PERFORMANCE) { trace_end('options.set',null,true); }
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
			if (PERFORMANCE) { trace_start('options.save',null,true); }
			var json = JSON.stringify(this.prefs);
			setValue(this.userid+"/prefs",json,func);
			if (PERFORMANCE) { trace_end('options.save',null,true); }
		};
		this.save.name="options.save";
		
		this.addSectionHeader = function(title) {this.addHtml("<h2>"+title+"</h2>");};
		this.addOption = function(name,type,def,opt,style) {opt = opt || {};opt.name = name;opt.type = type;opt['default'] = def;opt.style=style;this.options.push( opt );this.optionsObj[opt.name] = opt;};
		this.addHtml = function(html) {this.options.push( {'type':'html', 'value':html } );};
		this.addFunction = function(func) {this.options.push( {'type':'function', 'value':func } );}
		this.renderOption = function(opt) {
			opt.value = this.get(opt.name);
			opt.onchange = opt.onchange || "";
			var input = '';
			// CHECKBOX Option
			if (opt.type=="checkbox") {
				opt.checked = (opt.value?"checked":"");
				input = _template('<input type="checkbox" name="%name%" onclick="%onchange%" %checked% style="%style%">', opt);
			}
			// TEXTAREA option
			else if (opt.type=='textarea') {
				input = _template('<textarea name="%name%" nowrap class="textarea" style="width:90%;" onchange="%onchange%" rows="%rows%" cols="%cols%" style="%style%">%value%</textarea>', opt);
			}
			// INPUT option
			else {
				input = _template('<input name="%name%" class="text" onfocus="this.select()" onchange="%onchange%" value="%value%" size="%size%" style="%style%">', opt);
			}
			return input;
		};
		this.render = function(tab_id) {
			var self = this;
			var alt = 0;
			var content = ((<><![CDATA[

			<div id="bfb_option_container">
				<div id="bfb_options_tab_list" class="tab_list">
					<div class="bfb_tab_selector bfb_tab_search">Buscar: <input onfocus="this.select();" style="width:100px;" id="bfb_options_search" title="Type in text to find options"></div>
					<div class="bfb_tab_selector" rel="tab_popular">Popular</div>
					<div class="bfb_tab_selector" rel="tab_layout">Diseño</div>
					<div class="bfb_tab_selector" rel="tab_posts">Comentarios</div>
					<div class="bfb_tab_selector" rel="tab_display">Visual</div>
					<div class="bfb_tab_selector" rel="tab_hidden">Ocultar Items</div>
					<div class="bfb_tab_selector" rel="tab_chat">Chat</div>
					<div class="bfb_tab_selector" rel="tab_theme">Temas</div>
					<div class="bfb_tab_selector" rel="tab_filtering">Filtros</div>
					<div class="bfb_tab_selector" rel="tab_advanced">Avansado</div>
					<div class="bfb_tab_selector" rel="tab_css">Estilos (CSS)</div>
					<div class="bfb_tab_selector" rel="tab_user_prefs">Preferencias de Usuario</div>
					<div class="bfb_tab_selector" rel="tab_about">Acerca</div>
				</div>
				<div id="bfb_options_content" class="content">

					<div class="option tab_popular">
						<div class="desc">
							Ejecute el <a id="bfb_guided_setup" style="text-decoration:underline;" href="#" onclick="return false;">Asistente de Instalacion</a> de nuevo para ser guiados a través de las opciones más importantes.
						</div>
					</div>
					
					<div class="option tab_popular">
						<help>Al mover el ratón sobre las imágenes en miniatura, "Social Fixer" mostrará la imagen de tamaño completo en una ventana emergente, por lo que no es necesario hacer clic sobre la imagen para ver toda la cosa.</help>
						<div class="desc">
							%show_image_previews% Mostrar imagen completa cuando se pasa el ratón sobre las imágenes
						</div>
					</div>

					<div class="option tab_popular">
						<help>En febrero de 2011, Facebook introdujo una nueva "Light Box", visor de fotos con un fondo negro al hacer clic en las fotos. Si no te gusta este nuevo visor de fotos, marque esta opción para desactivarlo.</help>
						<div class="desc">
							%disable_theater_view% Desactivar el "Lightbox" (también conocido como "Theater"), visor de fotografía emergente
						</div>
					</div>
					<div class="option tab_popular">
						<help>Si usted (o sus amigos) o jugar juegos de Facebook a menudo utilizan las aplicaciones de Facebook, "Social Fixer" automáticamente puede mover los mensajes a su propia pestaña, para que no se interrumpa el flujo de el resto de su Inicio.</help>
						<div class="desc">
							%tab_all_apps% Mover automáticamente los mensajes de las aplicaciones (juegos) en sus propias Pestañas
						</div>
					</div>
					<div class="option tab_popular">
						<help>Facebook cambia su tamaño de fuente predeterminado de 13px a 12px en el 2010. Muchos usuarios consideran el nuevo tamaño de fuente es demasiado pequeña. Puede utilizar esta opción para configurar cualquier tamaño de fuente que desea.
							<br><br>
							Para restaurar el tamaño de la configuración anterior, introduzca un valor de 13.
						</help>
						<div class="desc">
							%enable_font_size% Cambiar tamaño de la fuente %post_font_size% px de los posteos y %comment_font_size% px para los comentarios
						</div>
					</div>
					<div class="option tab_popular">
						<help>Al enviar comentarios sobre el estado de sus amigos, al igual que las páginas, o tomar otras acciones en Facebook, una línea de "Actividad reciente" mensajes aparecerán en tu perfil y que los demás sepan lo que están haciendo. Active esta opción para eliminar automáticamente los mensajes cada vez que visita su perfil.<br><br>En la pestaña Mostrar, puede seleccionar exactamente qué tipos de historias para borrar, mientras que la preservación de los demás.</help>
						<div class="desc">
							%auto_remove_recent_activity% Auto-borrar posteos de Actividad Reciente de mi perfil
						</div>
					</div>
					<div class="option tab_popular">
						<help>Por defecto, al entrar en los comentarios, haga clic en Enter presentará el comentario. Active esta opción para restaurar la funcionalidad vieja, donde Enter = nueva línea, y un botón de comentarios existe para enviar el mensaje.</help>
						<div class="desc">
							%fix_comments% Arregla el comportamiento de la tecla "Enter" para pasar a una nueva línea al agregar comentarios, en lugar de enviarlos
						</div>
					</div>

					<div class="option tab_popular">
						<help>Los grupos de Facebook "últimas noticias" en una sección en la parte superior de la página. Esta opción te lleva de vuelta a una alimentación puramente cronológico, y elimina los encabezados de sección como "últimas noticias" o "el día de hoy", etc</help>
						<div class="desc">
							%chronological% Fuerza al avance de noticias para ser cronológico y se esconden "Noticias Destacadas"
						</div>
					</div>

					<div class="option tab_popular">
						<help>Cuando está activada, una "reply" aparecerá el enlace en cada comentario posterior junto a igual. Al hacer clic, usted será capaz de responder a un comentario específico, la etiqueta de la persona que está respondiendo, y ni siquiera citar parte de su mensaje.</help>
						<div class="desc">
							%comment_reply% Añadir "Responder" enlaces con comentarios y %comment_reply_float_textarea% flotar el cuadro de respuesta a los comentarios
						</div>
					</div>
					<div class="option tab_popular">
						<help>De manera predeterminada, Facebook te muestra 15 publicaciones. En el pie de la página hay un enlace a "Entradas antiguas", que recupera más mensajes. "Social Fixer" puede auto-clic en este enlace cualquier cantidad de veces para obtener más posteos, así que no se perderán de nada.</help>
						<div class="desc">
							%auto_click_older_posts% Auto-click "Entradas Antiguas" %auto_click_more_times% veces para obtener más mensajes
						</div>
					</div>
					<div class="option tab_popular">
						<help>
							Cuando los amigos o las Páginas publican múltiples punlicaciones en una pequeña cantidad de tiempo, Facebook mostrará sólo la primera, con un enlace a "mostrar mensajes similares".<br>
							Esta opción automáticamente hace clic para ampliar estos grupos de mensajes dondequiera que ocurran.
						</help>
						<div class="desc">
							%expand_similar_posts% Expandir automaticamente los enlaces de "MOSTRAT X POSTEOS SIMILARES"
						</div>
					</div>
					<div class="option tab_popular">
						<help>Amigos cambien la foto de perfil muy seguido, y puede ser difícil decir quién es quién.<br><br>Seleccione esta opción para mostrar los nombres en lugar de imágenes.</help>
						<div class="desc">
							%chat_images_to_names% Cambiar las imagenes de perfil en el Chat por nombres
						</div>
					</div>
					<div class="option tab_popular">
						<help>Cuando alguien te Elimina como su amigo, el panel Rastreador amigo en la columna derecha se le alertará!</help>
						<div class="desc">
							%show_friend_tracker% Mostrar "Friend Tracker" para obtener notificaciones "Desamistad"
						</div>
					</div>	

					<div class="option tab_popular">
						<div class="desc">
							%disabled_on_apps% Prevenir la ejecución de Social Fixer al jugar juegos en apps.facebook.com
						</div>
					</div>	

					<!-- LAYOUT -->
					
					<div class="option tab_layout no_search" style="background-color:#3B5998;color:white;">Columna Izquierda</div>
					<div class="option tab_layout">
						<help>Esto hace que la columna de la izquierda permanecer estáticos en la pantalla por lo que no se desplaza junto con la página, que da acceso a opciones de menú</help>
						%static_left_col% Bloqueo de la columna de la izquierda en su lugar
					</div>
					
					<div class="option tab_layout tab_layout">
						<help>Estos enlaces se agregan a la zona de navegación superior izquierda, bajo "News Feed", "Mensajes", etc</help>
						Añadir enlaces rápidos a la navegación: 
							%show_nav_all_connections% todas las conexiones 
							%show_nav_edit_friends% Editar Amigos 
							%show_nav_write_a_note% Escribir una Nota 
							%show_nav_pages_i_admin% Paginas que administro 
							%show_nav_unblock_applications% Desbloquear aplicaciones 
					</div>
					
					<div class="option tab_layout">
						Ocultar :
							%hide_left_nav_groups% Grupos ( %hide_left_nav_groups_create% Crear Grupo )
							%hide_left_nav_pages% Paginas
							%hide_left_nav_apps% Aplicaciones
							%hide_chat_panel% Amigos en el Chat
							%hide_status_updater% Nombre y Fotos
					</div>

					<div class="option tab_layout">
						<help>Estas secciones de navegación en el lado izquierdo se expanden para mostrar las categorías sub-cuando se hace clic en ellos. Si usted quiere que se expandió por defecto (por ejemplo, para ver la cuenta de "Otros" mensajes en todo momento), puede hacerlo aquí</help>
						Auto-expandir secciones del panel izquierdo:
							%expand_nav_messages% Mensajes
							%expand_nav_events% Eventos
							%expand_nav_photos% Fotos
							%expand_nav_apps% Aplicaciones
							%expand_nav_friends% Amigos
							%expand_nav_friends_full% Todos los Grupos amigos
					</div>

					<div class="option tab_layout">
						<help>Estas son cuadros útiles que Social "Fixer puede agregar para ayudarle a ir rápidamente a las páginas favoritas, eventos, etc Puede hacer clic en el título del cuadro de colapso / expansión de ellos, e incluso se puede hacer clic en "editar" en cada casilla para elegir los elementos que no quieren ver en la lista.</help>
						Agragar Cuadros de Ácceso rápido:
							%show_my_pages% "Mis Paginas"
							%show_my_events% "Mis Eventos"
							%show_my_groups% "Mis Grupos"
							%show_my_apps% "Mis Aplicaciones"
					</div>
					
					<div class="option tab_layout no_search" style="background-color:#3B5998;color:white;text-align:center;">Columna Centtal</div>
					
					<div class="option tab_layout">
						<help>
							El panel de "control" es el cuadro que aparece en la parte superior del inicio.<br>
							Esto es cómodo porque contiene los controles para marcar una entrada como leida o silenciarla con un clic. La línea de estado que muestra una cantidad de las diferentes acciones realizadas por Social Fixer.
							<br>
							Al desplazarse por la página, el panel de control puede flotar con esta. Esto es útil porque al llegar a la final de la página, se puede acceder al panel de control para marcar todo lo como leído sin tener que desplazarse de nuevo a la parte superior de la página.
						</help>
						%display_control_panel% Mostrar el "<b>Panel de Control</b>" en la parte superior y %float_control_panel% Flotar por la página mientras se desplaza<br>
						<img src="https://socialfixer.com/images/cp.png" style="width:295px;"><br>
						
					</div>

					<div class="option tab_layout">
						<img src="https://socialfixer.com/images/post_actions.png" style="float:left;margin-right:20px;">
						<help>Al pasar por cada publicaciones , una "bandeja" de iconos de acción aparece en la parte superior derecha de la entrada. <br>
Esta opción controla qué iconos desea que aparezca en la bandeja de iconos y la forma en que debería aparecer.
						</help>
						%show_post_actions% Mostrar los <b>Iconos de Acciones para Publicaciones</b> en cada publicación. 
						<br style="clear:both;">
					</div>
					
					<div class="option tab_layout">
						%stretch_wide% <b>&lt;--- Estirar el diseño </b> al ancho de pantalla completa ---&gt;
					</div>

					<div class="option tab_layout no_search" style="background-color:#3B5998;color:white;text-align:right;">Columna Derecha</div>
					
					<div class="option tab_layout tab_popular">%hide_happening_now% Ocultar el "ticker" de alimentación de la actividad de amigos</div>
					<div class="option tab_layout">%hide_game_sidebar% Ocultar el icono de la barra lateral de Juegos</div>
					<div class="option tab_layout">%hide_game_ticker% Ocultar la actividad tiempo real de Juegos de amigos</div>
					<div class="option tab_layout">%ticker_scroll% Desplácese hacia abajo con el ticker de la página en lugar de mantenerlo estático</div>
					<div class="option tab_layout">%unlock_right_col% Desbloquear la columna de la derecha por lo que se desplaza con la página</div>
					<div class="option tab_layout">
						<div style="background-color:#f3f3f3;color:#333;padding:2px;">
							<help>Estas son las cajas que ha ocultado de la columna derecha, haga clic en la "X" en la barra de título. Para agregar de nuevo a su página, haga clic en la "x" aquí para sacarlos de la lista"oculta".</help>
							Cuadros ocultos (haga clic en la X para mostrar):
						</div>
						<div class="bfb_sub_option">%right_panels_hidden_list%</div>
					</div>

					<div class="option tab_layout">
						Agregar estos cuadros
						<div>
							<help>Segidor de amigos controla tu lista de amigos y le informa cuando alguien desaparece - generalmente indica que ellos te han sacado de sus amigos!</help>
							%show_friend_tracker% Seguidor de Amigos (Notificador de desamistad)
							<div class="bfb_sub_option bfb_option_advanced">Actualizar cada %friend_tracker_interval% hora(s)</div>
						</div>
						<div>
							<help>Las sugerencias del día aparecerá como máximo una vez cada uno o dos días, y le informará sobre las características u opciones que no conocemos!</help>
							%tips_of_the_day% Consejos del día
						</div>
					</div>
					
					<!-- POSTS -->		

					<div class="option tab_posts">
						<help>Estos son los iconos de acción para mostrar en la esquina superior derecha de los mensajes cuando se pasa sobre ellos.<br><br>If you want the icons to be invisible until you hover, check the "Hid euntil hover" box.<br>When you hover over a post, the icons are semi-transparent, which is the opacity. 0=invisible, 1=no transparency. (When you move your mouse over the icons themselves, they will be fully visible). The "zoom" setting makes the icons bigger, for those browsers that support it.</help>
						%show_post_actions% Mostrar <b>Iconos de Accion sobre Publicaciones</b> en cada publicación. <br>
						Post Action Icons: %hide_post_actions_until_hover% Ocultar / Opacidad=%post_action_opacity2% / Zoom=%post_action_zoom%%
						<div>Mostrar: 
							%show_post_action_info% Información de Publicacion
							%show_post_action_google% Google It
							%show_post_action_info_add_app% Agragar Aplicación
							%show_post_action_mark_unread% Marcar como No leido
							%show_post_action_info_mute% Silenciar
							%show_post_action_info_mark_read% Marcar como leido
						</div>
					</div>
					<div class="option tab_posts">%fix_timestamps% Arreglar las marcas de tiempo para mostrar la fecha/tiempo actual ("hace una hora" se convierte en "12:34a.m. (hace una hora)")</div>
					<div class="option tab_posts">
						<help>Facebook indica que los mensajes que considera "Top Story", un triángulo sombreado en los puestos de arriba a la izquierda. Si no te importa que los mensajes que se piensa últimas noticias, puede ocultarlos activando esta opción.</help>
						%hide_top_story_indicator% Ocultar el triangulo que indica "Top Story" situado en la parte superior izquierda de las puplicaciones
					</div>
					<div class="option tab_posts">
						<help>Debido a un bug en el código de Facebook, algunos usuarios no se vea un cursor cuando se centran en un cuadro de comentarios para añadir un comentario. Esta revisión pone el cursor de nuevo.</help>
						%fix_comment_cursor% Solucionar el problema del cursor desaparecido en Cuadros comentario
					</div>
					<div class="option tab_posts">
						<help>Debido a un bug en el código de Facebook, al escribir algunos comentarios de los usuarios no ven ajustar el texto a la siguiente línea hasta que se escribe más caracteres más allá del final de la línea. Esto hace que sea difícil ver lo que estás escribiendo en la línea siguiente. Esto soluciona el problema.</help>
						%fix_comment_wrap% Solucionar el problema ajuste de línea en los comentarios a medida que escribe más allá del final de la línea
					</div>
					<div class="option tab_posts">
						<help>Facebook tiene una característica integrada en la que busca en su página de desplazamiento y carga automáticamente los mensajes nuevos al llegar cerca del fondo. Esta causa la causa de Facebook para reducir la velocidad, y en particular cuando Social Fixer está en marcha. Por defecto, Social Fixer desactiva esta funcionalidad.</help>
						%disable_scroll_load% Desactivar carga automática de los mensajes al desplácese hacia abajo
					</div>
					<div class="option tab_posts">
						<help>Los mensajes de las aplicaciones como los juegos suelen tener un vínculo para reclamar un regalo o un artículo. Con esta opción, puede hacer que los vínculos para abrir en una pestaña nueva, por lo que no perderá su lugar en el inicio.<br><br>Si se activa la segunda opción, el mensaje también será marcado como leído y desaparecer de la vista, para que pueda concentrarse en los mensajes que se dejan sin reclamar.</help>
						Al hacer clic en un vínculo de un mensaje de aplicación, %open_app_link_in_tab% se abre en una nueva pestaña/ventana del navegador %open_app_link_marks_read% automáticamente marca el mensaje como leído
					</div>
					<div class="option tab_posts">
						<help>A menudo, después de comentario en un artículo, usted quiere que desaparezca a menos que alguien publica un seguimiento. Esta es también una gran manera de manejar una página si son de administración. Como se responde a mensajes de usuarios, que van a desaparecer de la pared hasta que la pared está vacía y ya está!</help>
						%mark_read_on_comment% Marca automáticamente un mensaje como "leído" Tras comentar sobre ella
					</div>
					<div class="option tab_posts">%auto_expand_comments% Auto-expandir temas Mostrando comentarios sobre los mensajes de las páginas para que todos sean visibles</div>
					<div class="option tab_posts">
						<help>Cuando alguien publica varias veces en una fila, Facebook los agrupa en un enlace "Mensajes similares". Al expandir este, todos los mensajes se muestran en un grupo. En cambio, esta opción será volver a ordenar los mensajes insertados en el lugar correcto en la línea de tiempo de alimentación.</help>
						%reorder% Poner los mensajes "similares" ampliados en orden cronológico, después de expandirse
					</div>
					<div class="option tab_posts">
						<help>Si sólo desea marcar los mensajes como leídos en el Inicio, y no en las páginas o perfiles, puede desactivar aquí. Esto hará que el panel de control desaparece en la parte superior.</help>
						%process_profiles% Procesar publicaciones en Perfiles y Paginas, agregar panel de control, y permitir Marcar como leído
						<div>(Pero %dont_hide_posts_on_profiles% no ocultan leer los mensajes en las páginas/perfiles)</div>
					</div>
					<div class="option tab_posts">
						<help>Si no desea procesar los mensajes antiguos en un grupo, puede deshabilitarlo aquí</help>
						%process_groups% Procesar publicaciones en Muro de Grupos, agregar panel de control, y permitir Marcar como leído
					</div>
					<div class="option tab_posts">%process_recent_activity% Añadir iconos de publicación en "Actividad reciente" para que puedan ser marcados como leídos individualmente</div>
					<div class="option tab_posts">%expand_see_more% Auto-expandir "ver más" en los mensajes para mostrar el post completo</div>
					<div class="option tab_posts">
						<help>Mensajes "Leido" reaparecerán cuando se hagan nuevos comentarios. Usted puede desactivar esa opción por completo, o establecer un umbral para una serie de mensajes para provocar que se apague. Esto es útil en los mensajes de las páginas, por ejemplo. Si un mensaje llega a más de 100 , por ejemplo, automáticamente se puede hacer que deje de volver a aparecer en su servicio de noticias.</help>
						Ocultar nueva notificación de comentarios (%auto_mute_all% always) or o cuando hay más de %auto_mute_count% comentarios
					</div>
					<div class="option tab_posts">%hide_old_comments% Ocultar viejos (leidos) comentarios cuando los nuevos comentarios aparecen en una publicación</div>
					<div class="option tab_posts">%undo_ctrl_z% Map Ctrl+z para "volver"</div>
					<div class="option tab_posts">
						<help>Al hacer clic en vínculos a sitios externos desde dentro de Facebook, lo primero que se envía a través de un servicio de redirección que comprueba enlaces maliciosos y los registros de la página que usted va a, a continuación, vuelve a dirigir allí. No es recomendable desactivar esto a menos que esté seguro de lo que estás haciendo.</help>
						%prevent_link_redirection% Evitar la redirección enlace externo
					</div>
					
					<!-- DISPLAY -->
					
					<div class="option tab_display">%remove_recent_activity% Agregar un "eliminar todas las actividades" para <b>ACTIVIDAD RECIENTE</b> bloques
						<div>
							<help>Puede seleccionar sólo tipos específicos de "Actividad reciente" para eliminar los mensajes</help>
							<b>Tipos de Auto-Borrar</b>: 
							%remove_recent_activity_write_on_wall% Publicaciones de Muro 
							%remove_recent_activity_comment_on_status% Comentarios de Estado
							%remove_recent_activity_comment_on_photo% comentarios de Fotos
							%remove_recent_activity_comment_on_link% Comentarios de Links
							%remove_recent_activity_like_page% "Likiar" un Página 
							%remove_recent_activity_added_friend% Añadir un amigo 
							%remove_recent_activity_relationship_change% Cambio de Estado Sentimental
							%remove_recent_activity_added_other% Otros 
						</div>
						<div>
							<help>Después de que los mensajes Actividad reciente se eliminan, un cuadro de mensaje amarillo aparecerá en la parte superior derecha le dice lo que fue retirado. Puede desactivar aquí.<br><br>Además, por defecto, los puede eliminar en su muro están tachados para demostrar que se han eliminado (que se ha desaparecido por completo cuando se actualiza). En cambio, puede optar por eliminarlos por completo de vista.</help>
							%show_remove_recent_activity_message% Mostrar el mensaje por %remove_recent_activity_message_duration% segundos cuando tiene éxito
							(%erase_after_recent_activity_remove% Borrar eliminar los elementos en lugar de sacarlos)
						</div>
					</div>
					<div class="option tab_display">
						<help>Muchos usuarios tienen pantallas más anchas y les resulta conveniente tener siempre a mano su lista de notificaciones. Esta opción pone la lista de notificaciones en la parte derecha de la pantalla en cada página, para acceder con más rapidez. Usted no tiene que hacer clic en el icono de Notificaciones para ver la lista.</help>
						<b>Pasador de las notificaciones</b> panel a la %pin_notifications_right_panel% barra lateral derecha o la %pin_notifications% la extrema derecha
					</div>
					<div class="option tab_display">
						<help>La lista de comentarios en las páginas de preguntas está en orden cronológico, por lo que para poder ver los nuevos comentarios que usted tiene que ampliar continuamente 10 a la vez. Activando esta opción de auto-ampliar estos vínculos para usted.</help>
						%auto_expand_questions_comments% Auto-Ampliar comentarios en las páginas de Preguntas
					</div>
			<!--
					<div class="option tab_display">
						<help>Al mover el ratón sobre los elementos de notificación, esta opción le mostrará una visión emergente de la publicación, o imagen de referencia en la notificación por lo que no es necesario que haga clic en la notificación para ir a la página.</help>
						%show_notification_previews% Mostrar vistas previas cuando pasa por encima de los elementos de la lista notificaciones
					</div>
			-->
					<div class="option tab_display">%tab_count% Mostrar contador de mensajes en pestañas</div>
					<div class="option tab_display">%left_align% Alinear a la izquierda de la página en lugar del centro</div>
					<div class="option tab_display">%alternate_read_display% Mostrar las viejas historias, como en gris en vez de ocultarlos por completo</div>
					<div class="option tab_display">%reload_when_mark_all_read% Actualizar automáticamente cuando se hace clic en Marcar todos como leídos</div>
					<div class="option tab_display">
						<help>Este cuadro de notificación sólo aparece para algunos usuarios</help>
						%hide_update_email% Ocultar el "Por favor, actualice su dirección de correo electrónico", cuadro que aparece en repetidas ocasiones
					</div>
					<div class="option tab_display">%show_char_counter% Agregar una cuenta de carácteres en cuadros de actualización de estado con un máximo de %char_counter_max2% caracteres</div>
					<div class="option tab_display">%hide_notification_pictures% Ocultar las imágenes de perfil en la lista de notificaciones</div>
					<div class="option tab_display">
						<help>Por defecto, Facebook te mostrará una vista previa de una persona o un perfil de página cuando se pasa sobre su nombre. Puede desactivar esto.</help>
						%hide_hovercard% Ocultar la información emergente cuando se pasa a través de enlaces de nombre de usuario
					</div>
					<div class="option tab_display">
						<help>Al tomar una captura de pantalla para publicar lugar ina pública, usted puede no querer revelar los nombres de todos tus amigos y fotos de perfil. El anonimizador se agrega a la Cuenta desplegable en la barra de encabezado azul, y le permite anonimizar la pantalla. Si usted no desea que este añadido, desactive esta casilla.</help>
						%enable_anonymize% Añadir una "pantalla como anónimo" a la opción "Cuenta" desplegable
					</div>	
					
					<!-- ADVANCED -->
					<div class="option tab_advanced"><b>These options give you complete control over lots of settings! Tweak it all you want!</b></div>
					<div class="option tab_advanced">"Older Posts" selector:%older_posts_selector%</div>
					<div class="option tab_advanced">Notification preview Image max-width:%preview_img_max_width2% max-height:%preview_img_max_height2%</div>
					<div class="option tab_advanced">%show_options_save_message% Show "Refresh the page" alert after saving Options</div>
					<div class="option tab_advanced">Clean out data for individual posts after %comment_expire_days% days (per post) to save space in preferences</div>
					<div class="option tab_advanced">%show_version_changes% Show changes after installing a new version</div>
			<!-- /*UPDATECHECK*/-->
					<div class="option tab_advanced">%check_for_updates% Check for script updates every %update_check_interval% hours
						<div>%check_for_beta_updates% Also check for BETA updates</div>
					</div>
			<!-- /*/UPDATECHECK*/-->
					<div class="option tab_advanced">%check_for_messages% Check for important Social Fixer messages every %message_check_interval% minutes</div>
					<div class="option tab_advanced">%show_page_post_message% Show the Help message for new posts on the Social Fixer Page</div>
					<div class="option tab_advanced">%allow_bfb_formatting% Allow posts by Social Fixer to retain html formatting</div>
					<div class="option tab_advanced">Pause for %expand_similar_posts_delay%ms between clicks when expanding "Similar Posts" links</div>
					<div class="option tab_advanced">Wait for %image_preview_delay% seconds before showing thumbnail previews on hover</div>
					<div class="option tab_advanced">When Notifications are pinned to the right side, force it to be %pin_notifications_width% wide (ex:200px)</div>
					<div class="option tab_advanced">Floating control panel opacity: %floating_cp_opacity% / Manual offset: %floating_cp_offset%px</div>
					<div class="option tab_advanced">
						<help>
							When you click the Facebook logo in the upper left or any "Home" navigation item to return to your home page, Facebook actually uses an internal navigation mechanism that confuses Social Fixer and sometimes causes features to malfunction.
							 <br><br>
							 Enabling this option fixes this problem by redirecting you to the proper home page url when clicking these links.
						</help>
						</span>
						%fix_logo2% Fix navigation on the upper left logo and "News Feed" links to go to %home_url%
					</div>
					<div class="option tab_advanced">%pagelet_toggle% Enable collapse/expand of boxes in right panel by clicking their headers</div>
					<div class="option tab_advanced">Hide right column panels:<br>%right_panels_hidden%</div>
					<div class="option tab_advanced">Hide these page sections:<br>%hidden_elements%</div>
					<div class="option tab_advanced">Hide the "x" option from these page sections:<br>%hidden_elements_x%</div>
					<div class="option tab_advanced">My Pages: %my_pages_new_window% Open in a new window | %my_pages_max_height%px high in position %my_pages_position%</div> 
					<div class="option tab_advanced">My Events %my_events_new_window% Open in a new window | %my_events_max_height%px high in position %my_events_position%</div> 
					<div class="option tab_advanced">My Groups: %my_groups_new_window% Open in a new window | %my_groups_max_height%px high in position %my_groups_position%</div> 
					<div class="option tab_advanced">My Apps: %my_apps_new_window% Open in a new window | %my_apps_max_height%px high in position %my_apps_position%</div>
					<div class="option tab_advanced">%show_friend_tracker_no_activity_msg% Show Friend Tracker message when there is no activity</div>
					<div class="option tab_advanced">Show unfriends in Friend Tracker for %friend_tracker_duration% days</div>
			<!--						<div class="option tab_advanced">%friend_activity_show_pics% Show small profile pictures in Friend Activity</div> -->
			<!--						<div class="option tab_advanced">Hide Friend Activity if it matches pattern: %friend_activity_hide_text%</div> -->
					<div class="option tab_advanced">Show control panel buttons: %cp_button_mark_all_read%Mark All Read
																	%cp_button_show_hide_all%Toggle Hidden Posts
																	%cp_button_mute_all%Mute All
																	%cp_button_reload%Reload
																	%cp_show_status%Status
																	%cp_button_undo%Undo
					</div>
					
					<!-- FILTERING -->
					<div class="option tab_filtering">
						<help>Desactivación de filtros completo le permite depurar problemas o cambiar temporalmente a una vista sin filtrar</help>
						%filters_enabled% Activar Filtros
					</div>
					<div class="option tab_filtering">
						<help>Si se han definido las fichas en las reglas de filtro, que sólo se creará si en realidad hay mensajes a mudarse allí. Esto es para ahorrar espacio. Si prefiere tener todas sus fichas creadas - cada vez - luego permitir esto.</help>
						%always_show_tabs% Siempre mostrar todas las pestañas definidas (aunque no los mensajes se mueven allí)
					</div>
					<div class="option tab_filtering">
						<help>Si usted no desea crear pestañas o "esconder" las reglas para ejecutar en los perfiles y páginas, desactive esta opción</help>
						%filter_profiles% Filtro en las páginas y perfiles
					</div>
					<div class="option tab_filtering">No auto-tab estas aplicaciones: %untab_apps%</div>
					<div class="option tab_filtering">Lista personalizada de la aplicación: (format:  app_id:app_name,app_id:app_name&nbsp;&nbsp;&nbsp;&nbsp;ex: 12345:MyFarm)<br>%custom_apps%</div>
					<div class="option tab_filtering no_search">
						<div class="no_hover">
							<div>
								Ver la <b><a href="http://SocialFixer.com/feed_filter.php" style="text-decoration:underline;" target="_blank">Docimentación</a></b> de los Filtros 
							</div>
							<div id="bfb_filter_add_row" style="background-color:#ffffcc; font-weight:bold;">Haga clic aquí para agregar otro filtro: </div>
							<table class="bfb_filter_list" border=1 width=100%>
							<thead>
								<tr>
									<th><help>Seleccione uno o varios autores específicos para filtrar (mantén pulsado Ctrl al hacer clic para seleccionar varias). Si no son los autores seleccionados, el filtro se aplica a por cualquier persona. Vea la <a href="http://SocialFixer.com/#ff" target="_blank">Documentación</a></help>
										Author
									</th>
									<th><help>Seleccione uno o más tipos de mensajes (tecla Ctrl al hacer clic para seleccionar varias). Si no se seleccionan los tipos, el filtro se aplica a todo tipo de mensajes. Vea la <a href="http://SocialFixer.com/#ff" target="_blank">Documentación</a></help>
										Type
									</th>
									<th><help>Seleccione una o más aplicaciones (tecla Ctrl al hacer clic para seleccionar varias). Si no hay ninguna aplicación seleccionada, entonces el filtro se aplica a todas las aplicaciones. Vea la <a href="http://SocialFixer.com/#ff" target="_blank">Documentación</a></help>
										Application
									</th>
									<th><help>Ningún texto en el cuerpo del mensaje en sí. Por ejemplo, el tipo de "política" (sin las comillas) para seleccionar todos los mensajes con la palabra política en ellos. Las expresiones regulares también se pueden utilizar, para usuarios expertos. Vea la <a href="http://SocialFixer.com/#ff" target="_blank">Documentación</a></help>
										Other
									</th>
									<th><help>Seleccione qué hacer con los mensajes que coinciden con la critieria. Para una explicación completa, vea la <a href="http://SocialFixer.com/#ff" target="_blank">Documentación</a>.</help>
										Action
									</th>
									<th>&nbsp;</th>
								</tr>
							</thead>
							<tbody id="bfb_filter_list"></tbody>
							<tfoot id="bfb_filter_list_tfoot"></tfoot>
							</table>
						</div>
					</div>

					<!-- HIDDEN ELEMENTS -->
					
					<div class="option tab_hidden">
						<div class="no_hover">
						Algunas secciones de la página se puede ocultar colocando el cursor sobre ellos, y haciendo clic en la "x" que aparece. Puede mostrar las secciones sacándolos de la lista aquí.
						</div>
						<div class="no_hover"><b>Elementos de pagina ocultos</b></div>
						<div class="no_hover" style="padding:10px 0px;">
							%hidden_elements_list%
						</div>
						<div class="no_hover"><b>Elementos de pagina removidos con la "x"</b></div>
						<div class="no_hover" style="padding:10px 0px;">
							%hidden_elements_x_list%
						</div>
					</div>

					<!-- CHAT -->
					
					<div class="option tab_chat">
						<help>No todos los usuarios tienen, pero muchos ven una barra lateral de altura en el extremo derecho de que va todo el camino desde la cima hasta la parte inferior de la pantalla - pero sólo cuando la pantalla es lo suficientemente ancho. Esta opción le permite dejar que la barra de aparecer, y en lugar de volver a la "pop up" ventana de chat.</help>
						%chat_disable_sidebar% Sacar la barra lateral de chat en la parte derecha (si existe) y volver a la lista de chat emergente
					</div>
					<div class="option tab_chat">
						<help>Facebook por defecto muestra ahora amigos que piensa que usted desea charlar. Esto restaura el comportamiento anterior en el que todos sus amigos en línea se muestran.</help>
						%chat_show_all_online% Mostrar todos los amigos en línea en la lista de chat
					</div>
					<div class="option tab_chat">
						<help>Grupo de amigos por el estado en línea (activos en la parte superior, debajo los inactivos)</help>
						%chat_group_by_status% Grupo de amigos por el estado en línea (activos en la parte superior, debajo los inactivos)
					</div>
					<div class="option tab_chat">
						<help>Si la lista de chat es alta, esto ocultará la fotos de los perfiles por lo que la es más compacto.</help>
						%chat_compact% Utilice de chat compacto (no imágenes en miniatura)
					</div>
					<div class="option tab_chat">
						<help>Si no desea hablar, pero Facebook se pone de nuevo en línea, por alguna razón, esto le obligará a salir cada vez que se carga una página.</help>
						%chat_force_offline% Automáticamente la fuerza de chat de cierre de sesión en cada carga de página
					</div>
					<div class="option tab_chat">
						<help>Si no puedes chatear en todo, puede ocultar el muelle de chat todo lo que nunca hay que verlo!</help>
						%chat_hide% Ocultar el muelle de chat por completo (si está conectado, esto NO te salga!)
					</div>
					
					<!-- THEME -->
					
					<div class="option tab_theme no_search">
Seleccione un tema para cambiar el estilo de Facebook. Sólo podrá ver estos cambios en su navegador. Otros visitantes de su página o perfil no verán el tuyo. Para preguntas o para desarrollar su propio tema, consulte <a href="http://www.facebook.com/pages/ThemesSkins-with-Better-Face-book/187087164651628">Temas/Skins con Social Fixer</a>.<br>
						<iframe src="%protocol%//SocialFixer.com/themes/select.php?current_theme=%escaped_theme_url%" style="height:270px;width:90%;border:1px solid #ccc;" frameBorder="0"></iframe>
						<br>
						<span class="bfb_option_advanced">URL de Tema: %theme_url% </span><input type="button" id="bfb_minimize_options" value="Click vista previa"><br>
						Nota: No todos los temas pueden ser compatibles con todas las opciones de Social Fixer. Algunos temas son creados por autores de terceros. Trate de ellos y ver lo que funciona para usted!
					</div> 

					<!-- CSS -->

					<div class="option tab_css">Insertar una referencia a una hoja de estilos externa:<br>%css_url%</div> 
					<div class="option tab_css">Acción personalizada posterior "sprite" url: %sprite_url%</div>
					<div class="option tab_css no_hover">Añadir alguna reglas CSS arbitraria para insertar en la página:<br>
					Para algunos útiles de código CSS para hacer las cosas más comunes, consulte: <a href="http://SocialFixer.com/css_snippets.php">CSS Snippets</a> on SocialFixer.com<br>
					%css%</div> 
					
					<!-- USER PREFS -->
					
					<div id="bfb_user_prefs_option" class="option tab_user_prefs no_search">
						<div class="no_hover">Todos sus preferencias almacenadas, la historia de "leer" estados, cuenta con comentarios, etc, se almacenan en el formato JSON a continuación. Esto puede ser útil para hacer copias de sus preferencias. También puede copiar las preferencias en la caja y de importación.</div> 
						<div class="no_hover"><textarea id="bfb_user_prefs"></textarea></div> 
					</div>

					<!-- DEBUG -->
					
					<div class="option tab_advanced">%debug% Activar el modo de depuración</div>
					<div class="option tab_advanced">%performance_monitor% Habilitar Monitor de perfonmance: %performance_monitor_auto_scroll% Auto-Scroll %performance_monitor_dom_insertions% Show DOM Inserts %performance_monitor_show_messages% Show Messages</div>
							
					<!-- ABOUT -->
					
					<div class="option tab_about no_search">
						<div class="no_hover" style="font-size:16px !important;">
							<img src="https://socialfixer.com/images/matt.jpg" style="float:left;margin:10px;border:1px solid black;">
							My name is <a href="http://MattKruse.com">Matt Kruse</a>, and I am the author of Social Fixer (formerly Better Facebook).<br><br>
							To learn more about me, my family, and this project, visit the <a href="http://SocialFixer.com/about.php" target="_blank">About Me</a> page on <a href="http://SocialFixer.com">SocialFixer.com</a>!
							<br><br>
							<a href="http://SocialFixer.com/donate.php" target="_blank"><img border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif"></a> to support development!
							<br><br>
							Thank You to the members of the <a href="http://Facebook.com/119314224763738">Social Fixer Dev</a> page for helping to find problems, helping debug them, and tirelessly testing new features!
							<br><br>
							Special thanks to Aj Rez for his tireless support of the suggestions forum, Brian Shea for web site assistance, Andrew Clark for Wordpress assistance, Elaine Pratt for branding advice, and Jennifer Pictorian for a fantastic logo.
						</div> 
					</div>
					
					
				</div>
				<br style="clear:both;">
					
			</div>
			]]></>).toString());
			content = content.replace("%tracelog%",tracelog);
			content = content.replace("%protocol%",protocol);
			content = content.replace(/\<help\>/gi,'<span class="bfb_help"><span class="bfb_helptext">').replace(/\<\/help\>/gi,'</span></span>');
			// Replace the options place-holders with the actual options
			content = content.replace('%escaped_theme_url%',encodeURIComponent(options.get('theme_url')));
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
		onIdLoad('bfb_filter_list',function(tbody) {
			trace("bfb_filter_list loaded");
			get_remote_content('typeahead_new',function(response) {
				trace("typeahead content loaded for filters");
				var renderOption = function(v,t,sel) {
					return '<option value="'+v+'"'+(sel?' selected':'')+'>'+t+'</option>';
				};
				var renderFilter = function(filter,options) {
					trace("Rendering filter");
					return '<tr class="bfb_filter '+((filter!=null&&filter.disabled)?"bfb_filter_disabled":"")+'">'+renderFilterBody(filter,options)+'</tr>';
				};
				var renderFilterBody = function(filter,options,tr) {
					if (!filter || !filter.criteria) { filter = {criteria:{},actions:{}}; }
					var tds = [], c="";
					tds.push('<select class="nosave actrs" style="width:150px;" name="actrs" size="10" multiple>'+options+'</select>');
					
					c='<select class="nosave sty" name="sty" size="10" style="width:175px;" multiple onchange="var sel=false;for(var i=0;i<this.options.length;i++){if(this.options[i].selected){sel=true;break;}};var a=this.parentNode.parentNode.getElementsByClassName(\'app_id\')[0];a.style.display=(sel?\'none\':\'\');a.selectedIndex=-1;a=this.parentNode.parentNode.getElementsByClassName(\'app_id_custom_wrap\')[0];a.style.display=(sel?\'none\':\'\');">';
					for (var i in storyTypes) { 
						// For each story type, check to see if any of the comma-separated values are selected. If so, select the option
						var selected = false;
						var type_list = i.split(/\s*,+\s*/);
						for (var j=0; j<type_list.length; j++) {
							if (filter.criteria.sty && (type_list[j] in filter.criteria.sty)) {
								selected = true; break;
							}
						}
						c += renderOption(i,storyTypes[i],selected); }
					c+='</select>';
					tds.push(c);

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
					
					tds.push('Matching<br>text:<br> <input class="nosave regex" name="regex" value="'+(filter.criteria.regex?htmlescape(filter.criteria.regex):'')+'" size="6"><br>Advanced:<br>Use regular<br>expressions<br>like<br>/text|text2/<br>( | = OR )');
					tds.push(''+
					'	<input class="nosave action-hide" '+(filter.actions.hide?' checked ':'')+' type="checkbox" name="action" value="hide"> Hide<br>'+
					'	<input class="nosave action-minimize" '+(filter.actions.minimize?' checked ':'')+' name="action" value="minimize" type="checkbox"> Minimize<br>'+
					'	<input class="nosave action-addclass" '+(filter.actions.add_class?' checked ':'')+' name="action" value="add_class" type="checkbox"> Apply CSS Class: <br>'+
					'		<input class="nosave add-class" name="add_class" size="8" value="'+(filter.actions.add_class?filter.actions.add_class:'')+'" onkeyup="this.parentNode.getElementsByClassName(\'action-addclass\')[0].checked=(this.value!=\'\');"><br>'+
					'	<input class="nosave action-movetotab" '+(filter.actions.move_to_tab?' checked ':'')+' name="action" value="move_to_tab" type="checkbox"> Move to Tab: <br>'+
					'		<input class="nosave move-to-tab" name="move_to_tab" size="8" value="'+(filter.actions.move_to_tab?filter.actions.move_to_tab:'')+'" onkeyup="this.parentNode.getElementsByClassName(\'action-movetotab\')[0].checked=(this.value!=\'\');"><br>'+
					'	<input class="nosave action-stop" '+(filter.stop?' checked ':'')+' name="action" value="stop" type="checkbox"> Stop processing rules');
					var action_buttons = '<img class="bfb_up" style="cursor:pointer;" src="'+up_img+'" onclick="tr=this.parentNode.parentNode;tr.parentNode.insertBefore(tr,tr.previousSibling);"><br><img style="cursor:pointer;" src="'+delete_img+'" onclick="if(confirm(\'Delete this filter row?\')){var tr=this.parentNode.parentNode;tr.parentNode.removeChild(tr);}"><br><img class="bfb_down" style="cursor:pointer;" src="'+down_img+'" onclick="tr=this.parentNode.parentNode;tr.parentNode.insertBefore(tr.nextSibling,tr);">';
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
							// If there are no filters, create an empty shell
							if (!filters || filters.length==0) {
								fcontent = renderFilter(null,renderAuthorOptions(friends,pages,null));
							}
							else {
								for (var i=0; i<filters.length; i++) {
									trace("Rendering Filter: "+JSON.stringify(filters[i]));
									fcontent += renderFilter(filters[i],renderAuthorOptions(friends,pages,filters[i]));
								}
							}
							
							// Populate all the content into the tbody
							tbody.innerHTML = fcontent;
						}
						else {
							add_error("No connections");
						}
					}
					else {
						add_error("No json.payload");
					}
				}
				else {
					add_error("No response!");
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
				append($('bfb_filter_add_row'),button('Add New Filter at the Top', function(){ add_filter('top'); },null));
				append($('bfb_filter_add_row'),button('Add New Filter at the Bottom',function(){ add_filter('bottom'); },null));
			});
		});
			
		this.displayOptions = function(tab_id) {
			var doc = document;
			var optionsContent = this.render();
			var options_icon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%002%00%00%002%08%06%00%00%00%1E%3F%88%B1%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%0AMiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSwX%93%F7%16%3E%DF%F7e%0FVB%D8%F0%B1%97l%81%00%22%23%AC%08%C8%10Y%A2%10%92%00a%84%10%12%40%C5%85%88%0AV%14%15%11%9CHU%C4%82%D5%0AH%9D%88%E2%A0(%B8gA%8A%88Z%8BU%5C8%EE%1F%DC%A7%B5%7Dz%EF%ED%ED%FB%D7%FB%BC%E7%9C%E7%FC%CEy%CF%0F%80%11%12%26%91%E6%A2j%009R%85%3C%3A%D8%1F%8FOH%C4%C9%BD%80%02%15H%E0%04%20%10%E6%CB%C2g%05%C5%00%00%F0%03yx~t%B0%3F%FC%01%AFo%00%02%00p%D5.%24%12%C7%E1%FF%83%BAP%26W%00%20%91%00%E0%22%12%E7%0B%01%90R%00%C8.T%C8%14%00%C8%18%00%B0S%B3d%0A%00%94%00%00ly%7CB%22%00%AA%0D%00%EC%F4I%3E%05%00%D8%A9%93%DC%17%00%D8%A2%1C%A9%08%00%8D%01%00%99(G%24%02%40%BB%00%60U%81R%2C%02%C0%C2%00%A0%AC%40%22.%04%C0%AE%01%80Y%B62G%02%80%BD%05%00v%8EX%90%0F%40%60%00%80%99B%2C%CC%00%208%02%00C%1E%13%CD%03%20L%03%A00%D2%BF%E0%A9_p%85%B8H%01%00%C0%CB%95%CD%97K%D23%14%B8%95%D0%1Aw%F2%F0%E0%E2!%E2%C2l%B1Ba%17)%10f%09%E4%22%9C%97%9B%23%13H%E7%03L%CE%0C%00%00%1A%F9%D1%C1%FE8%3F%90%E7%E6%E4%E1%E6f%E7l%EF%F4%C5%A2%FEk%F0o%22%3E!%F1%DF%FE%BC%8C%02%04%00%10N%CF%EF%DA_%E5%E5%D6%03p%C7%01%B0u%BFk%A9%5B%00%DAV%00h%DF%F9%5D3%DB%09%A0Z%0A%D0z%F9%8By8%FC%40%1E%9E%A1P%C8%3C%1D%1C%0A%0B%0B%ED%25b%A1%BD0%E3%8B%3E%FF3%E1o%E0%8B~%F6%FC%40%1E%FE%DBz%F0%00q%9A%40%99%AD%C0%A3%83%FDqanv%AER%8E%E7%CB%04B1n%F7%E7%23%FE%C7%85%7F%FD%8E)%D1%E24%B1%5C%2C%15%8A%F1X%89%B8P%22M%C7y%B9R%91D!%C9%95%E2%12%E9%7F2%F1%1F%96%FD%09%93w%0D%00%AC%86O%C0N%B6%07%B5%CBl%C0~%EE%01%02%8B%0EX%D2v%00%40~%F3-%8C%1A%0B%91%00%10g42y%F7%00%00%93%BF%F9%8F%40%2B%01%00%CD%97%A4%E3%00%00%BC%E8%18%5C%A8%94%17L%C6%08%00%00D%A0%81*%B0A%07%0C%C1%14%AC%C0%0E%9C%C1%1D%BC%C0%17%02a%06D%40%0C%24%C0%3C%10B%06%E4%80%1C%0A%A1%18%96A%19T%C0%3A%D8%04%B5%B0%03%1A%A0%11%9A%E1%10%B4%C118%0D%E7%E0%12%5C%81%EBp%17%06%60%18%9E%C2%18%BC%86%09%04A%C8%08%13a!%3A%88%11b%8E%D8%22%CE%08%17%99%8E%04%22aH4%92%80%A4%20%E9%88%14Q%22%C5%C8r%A4%02%A9Bj%91%5DH%23%F2-r%149%8D%5C%40%FA%90%DB%C8%202%8A%FC%8A%BCG1%94%81%B2Q%03%D4%02u%40%B9%A8%1F%1A%8A%C6%A0s%D1t4%0F%5D%80%96%A2k%D1%1A%B4%1E%3D%80%B6%A2%A7%D1K%E8ut%00%7D%8A%8Ec%80%D11%0Ef%8C%D9a%5C%8C%87E%60%89X%1A%26%C7%16c%E5X5V%8F5c%1DX7v%15%1B%C0%9Ea%EF%08%24%02%8B%80%13%EC%08%5E%84%10%C2l%82%90%90GXLXC%A8%25%EC%23%B4%12%BA%08W%09%83%841%C2'%22%93%A8O%B4%25z%12%F9%C4xb%3A%B1%90XF%AC%26%EE!%1E!%9E%25%5E'%0E%13_%93H%24%0E%C9%92%E4N%0A!%25%902I%0BIkH%DBH-%A4S%A4%3E%D2%10i%9CL%26%EB%90m%C9%DE%E4%08%B2%80%AC%20%97%91%B7%90%0F%90O%92%FB%C9%C3%E4%B7%14%3A%C5%88%E2L%09%A2%24R%A4%94%12J5e%3F%E5%04%A5%9F2B%99%A0%AAQ%CD%A9%9E%D4%08%AA%88%3A%9FZIm%A0vP%2FS%87%A9%134u%9A%25%CD%9B%16C%CB%A4-%A3%D5%D0%9Aigi%F7h%2F%E9t%BA%09%DD%83%1EE%97%D0%97%D2k%E8%07%E9%E7%E9%83%F4w%0C%0D%86%0D%83%C7Hb(%19k%19%7B%19%A7%18%B7%19%2F%99L%A6%05%D3%97%99%C8T0%D72%1B%99g%98%0F%98oUX*%F6*%7C%15%91%CA%12%95%3A%95V%95~%95%E7%AATUsU%3F%D5y%AA%0BT%ABU%0F%AB%5EV%7D%A6FU%B3P%E3%A9%09%D4%16%AB%D5%A9%1DU%BB%A96%AE%CERwR%8FP%CFQ_%A3%BE_%FD%82%FAc%0D%B2%86%85F%A0%86H%A3Tc%B7%C6%19%8D!%16%C62e%F1XB%D6rV%03%EB%2Ck%98Mb%5B%B2%F9%ECLv%05%FB%1Bv%2F%7BLSCs%AAf%ACf%91f%9D%E6q%CD%01%0E%C6%B1%E0%F09%D9%9CJ%CE!%CE%0D%CE%7B-%03-%3F-%B1%D6j%ADf%AD~%AD7%DAz%DA%BE%DAb%EDr%ED%16%ED%EB%DA%EFup%9D%40%9D%2C%9D%F5%3Am%3A%F7u%09%BA6%BAQ%BA%85%BA%DBu%CF%EA%3E%D3c%EBy%E9%09%F5%CA%F5%0E%E9%DD%D1G%F5m%F4%A3%F5%17%EA%EF%D6%EF%D1%1F704%086%90%19l18c%F0%CC%90c%E8k%98i%B8%D1%F0%84%E1%A8%11%CBh%BA%91%C4h%A3%D1I%A3'%B8%26%EE%87g%E35x%17%3Ef%ACo%1Cb%AC4%DEe%DCk%3Cabi2%DB%A4%C4%A4%C5%E4%BE)%CD%94k%9Af%BA%D1%B4%D3t%CC%CC%C8%2C%DC%AC%D8%AC%C9%EC%8E9%D5%9Ck%9Ea%BE%D9%BC%DB%FC%8D%85%A5E%9C%C5J%8B6%8B%C7%96%DA%96%7C%CB%05%96M%96%F7%AC%98V%3EVyV%F5V%D7%ACI%D6%5C%EB%2C%EBm%D6WlP%1BW%9B%0C%9B%3A%9B%CB%B6%A8%AD%9B%AD%C4v%9Bm%DF%14%E2%14%8F)%D2)%F5Sn%DA1%EC%FC%EC%0A%EC%9A%EC%06%ED9%F6a%F6%25%F6m%F6%CF%1D%CC%1C%12%1D%D6%3Bt%3B%7Crtu%CCvlp%BC%EB%A4%E14%C3%A9%C4%A9%C3%E9Wg%1Bg%A1s%9D%F35%17%A6K%90%CB%12%97v%97%17Sm%A7%8A%A7n%9Fz%CB%95%E5%1A%EE%BA%D2%B5%D3%F5%A3%9B%BB%9B%DC%AD%D9m%D4%DD%CC%3D%C5%7D%AB%FBM.%9B%1B%C9%5D%C3%3D%EFA%F4%F0%F7X%E2q%CC%E3%9D%A7%9B%A7%C2%F3%90%E7%2F%5Ev%5EY%5E%FB%BD%1EO%B3%9C%26%9E%D60m%C8%DB%C4%5B%E0%BD%CB%7B%60%3A%3E%3De%FA%CE%E9%03%3E%C6%3E%02%9Fz%9F%87%BE%A6%BE%22%DF%3D%BE%23~%D6~%99~%07%FC%9E%FB%3B%FA%CB%FD%8F%F8%BF%E1y%F2%16%F1N%05%60%01%C1%01%E5%01%BD%81%1A%81%B3%03k%03%1F%04%99%04%A5%075%05%8D%05%BB%06%2F%0C%3E%15B%0C%09%0DY%1Fr%93o%C0%17%F2%1B%F9c3%DCg%2C%9A%D1%15%CA%08%9D%15Z%1B%FA0%CC%26L%1E%D6%11%8E%86%CF%08%DF%10~o%A6%F9L%E9%CC%B6%08%88%E0Gl%88%B8%1Fi%19%99%17%F9%7D%14)*2%AA.%EAQ%B4Stqt%F7%2C%D6%AC%E4Y%FBg%BD%8E%F1%8F%A9%8C%B9%3B%DBj%B6rvg%ACjlRlc%EC%9B%B8%80%B8%AA%B8%81x%87%F8E%F1%97%12t%13%24%09%ED%89%E4%C4%D8%C4%3D%89%E3s%02%E7l%9A3%9C%E4%9AT%96tc%AE%E5%DC%A2%B9%17%E6%E9%CE%CB%9Ew%3CY5Y%90%7C8%85%98%12%97%B2%3F%E5%83%20BP%2F%18O%E5%A7nM%1D%13%F2%84%9B%85OE%BE%A2%8D%A2Q%B1%B7%B8J%3C%92%E6%9DV%95%F68%DD%3B%7DC%FAh%86OFu%C63%09OR%2By%91%19%92%B9%23%F3MVD%D6%DE%AC%CF%D9q%D9-9%94%9C%94%9C%A3R%0Di%96%B4%2B%D70%B7(%B7Of%2B%2B%93%0D%E4y%E6m%CA%1B%93%87%CA%F7%E4%23%F9s%F3%DB%15l%85L%D1%A3%B4R%AEP%0E%16L%2F%A8%2Bx%5B%18%5Bx%B8H%BDHZ%D43%DFf%FE%EA%F9%23%0B%82%16%7C%BD%90%B0P%B8%B0%B3%D8%B8xY%F1%E0%22%BFE%BB%16%23%8BS%17w.1%5DR%BAdxi%F0%D2%7D%CBh%CB%B2%96%FDP%E2XRU%F2jy%DC%F2%8ER%83%D2%A5%A5C%2B%82W4%95%A9%94%C9%CBn%AE%F4Z%B9c%15a%95dU%EFj%97%D5%5BV%7F*%17%95_%ACp%AC%A8%AE%F8%B0F%B8%E6%E2WN_%D5%7C%F5ym%DA%DA%DEJ%B7%CA%ED%EBH%EB%A4%EBn%AC%F7Y%BF%AFJ%BDjA%D5%D0%86%F0%0D%AD%1B%F1%8D%E5%1B_mJ%DEt%A1zj%F5%8E%CD%B4%CD%CA%CD%035a5%ED%5B%CC%B6%AC%DB%F2%A16%A3%F6z%9D%7F%5D%CBV%FD%AD%AB%B7%BE%D9%26%DA%D6%BF%DDw%7B%F3%0E%83%1D%15%3B%DE%EF%94%EC%BC%B5%2BxWk%BDE%7D%F5n%D2%EE%82%DD%8F%1Ab%1B%BA%BF%E6~%DD%B8GwO%C5%9E%8F%7B%A5%7B%07%F6E%EF%EBjtol%DC%AF%BF%BF%B2%09mR6%8D%1EH%3Ap%E5%9B%80o%DA%9B%ED%9Aw%B5pZ*%0E%C2A%E5%C1'%DF%A6%7C%7B%E3P%E8%A1%CE%C3%DC%C3%CD%DF%99%7F%B7%F5%08%EBHy%2B%D2%3A%BFu%AC-%A3m%A0%3D%A1%BD%EF%E8%8C%A3%9D%1D%5E%1DG%BE%B7%FF~%EF1%E3cu%C75%8FW%9E%A0%9D(%3D%F1%F9%E4%82%93%E3%A7d%A7%9E%9DN%3F%3D%D4%99%DCy%F7L%FC%99k%5DQ%5D%BDgC%CF%9E%3F%17t%EEL%B7_%F7%C9%F3%DE%E7%8F%5D%F0%BCp%F4%22%F7b%DB%25%B7K%AD%3D%AE%3DG~p%FD%E1H%AF%5Bo%EBe%F7%CB%EDW%3C%AEt%F4M%EB%3B%D1%EF%D3%7F%FAj%C0%D5s%D7%F8%D7.%5D%9Fy%BD%EF%C6%EC%1B%B7n%26%DD%1C%B8%25%BA%F5%F8v%F6%ED%17w%0A%EEL%DC%5Dz%8Fx%AF%FC%BE%DA%FD%EA%07%FA%0F%EA%7F%B4%FE%B1e%C0m%E0%F8%60%C0%60%CF%C3Y%0F%EF%0E%09%87%9E%FE%94%FF%D3%87%E1%D2G%CCG%D5%23F%23%8D%8F%9D%1F%1F%1B%0D%1A%BD%F2d%CE%93%E1%A7%B2%A7%13%CF%CA~V%FFy%EBs%AB%E7%DF%FD%E2%FBK%CFX%FC%D8%F0%0B%F9%8B%CF%BF%AEy%A9%F3r%EF%AB%A9%AF%3A%C7%23%C7%1F%BC%CEy%3D%F1%A6%FC%AD%CE%DB%7D%EF%B8%EF%BA%DF%C7%BD%1F%99(%FC%40%FEP%F3%D1%FAc%C7%A7%D0O%F7%3E%E7%7C%FE%FC%2F%F7%84%F3%FB%25%D2%9F3%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%07~IDATx%DA%CC%9A%7BpT%F5%15%C7%3F%F7%B1w%9Fyl%B2%09I%C8%8B%98%18(%12(B%A2T%82%C8C%24%7D%3A%B6%95%B63%9DN%3B%9D%B60%B62%B6R%E8%CB%3A%EA%80%06%B1%EA%8C3%B5XE%CB%94Amic%092%96G%00%07y%07a%85%18%40%5EI%C3%E6%BD%BBw%EF%B3%7FP%19)%84%DDM%B2!%BF%7F%F7%9C%BB%BF%CF%FD%9Ds%EE%F7%9C%7B%85%E2%AA%AF%20%C9N%BC%99c%E7%B8%7C9%0F%3B%DC%19%D5%A2(K%603%3A%97%80m%9B%18%B1%FE%A0%DA%7F%E9%85Ho%FBz-%D2%85%2C%20%E0I%CF%5B%92%997%FEy%04%11%DB%B2%18%BD%10%006%82%20%A2x2g(%9E%AC%19%82%24%D7%EAj%EFb)%BFb%D6%EC%EC%C2%C9%7F%B5%01lk%84%B7%04%B6ecY6%96mc%03%02%02%82%90%88%B3%0D%B6%8D%D3%9B%3D%CD6%F5N%D9%EB%2Fz%14A%02%CB%18%91%CD%EB%86%89%A6%99%08%82%80%24%09%B8%5D%0E%3C.%07%A2(%A0%C6%0C%C2Q%0D%DD%B0%B0-%1B%A7%22%23%CB%E2%8Do%85m%E1%F5%17-%96%9D%9E%CC%E9%B6e%A6%1C%40%8D%19X%96Eia%16%B5%D3J%A9(%C9%267%DBG%C0%EF!%23%CD%85%24%8A%F4G4%3A%3A%C3%B4%87%FA%08%B6v%B0u%F7%C7%7Cr%B1%1B%AF%5BA%14%85%01%0E%C6Br%B8%03%C2%17%16%BD%D4%09%F8S%05%60Y6j%CC%60%EAm%05%7C%F3%BE*%EE%9CR%8C%CF%A3%24%E4%7B%A9%2B%CC%C6%C6%A3%BC%B1%E9%10%86e%23%89%03%C6%5C%A7%9C%CA%CC%B6l%1B%D3%B2X%FA%BD%BBXTW%85%24%89I%F9%07%FC%5E~%F4%60%0D%13%CArYV%BF%19%DB%06a%80%04%92S%1AN%AA%C1%E2o%DF%C1w%BE%3CeP%FE%86i%B1%EF%E8y%1A%B6%07%11%25%F1%86%B7%3Ce%20%86i1%26%DB%CB7%EE%9B%94%B4o%CB%99%10%5B%F7%B4%B0mo%2B%ADg%BB0M%0B%B7%CB%01%C2M%00%89i%06sg%94%93%E6u%26d%DF%DD%A7%B2%FF%E8966%1E%E5p%B0%8DhL%C7!K8d%09%C5!%C5%F5O%09%88m%83S%91%B9w%E6%ADqm%0F%05%2F%B2%F3%83S46%9D%E4bG%1F%08%E0Rd%BCn%25%A9%FFL%09%88iY%04%FC%5EJ%C7%FA%E3V%A5%A5O5%D0%D1%15%C6%EBR.%87%CF%20%97%98%AA%B0%AA%99%5C%14%B7%CC%FA%3CN%FC%19n%DCNG%9C%07%DFM%02%B1m%982%3E%2F%AE%9D%CB)S%3D%A9%10M%1F%FA%03YL%05%84%C7%E5%A0%A2%24%90%90%FD%FD%F3'%92%E6ub%D9%F6%E8%02%D1t%83%CAq%01*J%13%03%A9(%09PQ%9A%8D%A6%99%A3%0BD7%2C%EE%98R%7C%239q%CD%AA%9B5%1E%CB%8A%7F%22%9F%CA%9D%A8%AA%A7%1ED%14a%7CYNR%3E3o%2F!%23%CD%899%00LL3%E9%0B%C7p%C8%225%93%8Bx%60%C1m%D7%80%0Fk%F95L%8B%FC%9Ct%AAn%CDK%CA%2F7%DBG%ED%F4qlz%2F%88%D7%7D%B9%04%9B%A6%85%AA%19%08%82%C0%E7n%C9%A1%BA%AA%88%85%B3*)%2F%CE%A6%BB7%CA%D6%DD-DT%E3%CA%C9%0F%2BHL3%982!%1F%7F%86%3Bi%DF%AF%CD%9D%C8%3B%DB%3F%22%A6%19h%BAIN%96%97%BB%AB%CB%98%5DS%C6%DD5eW%3D%DD%05Q%C0%A9%C8%84%A3%3A%9F%EA%96a%05%B1-%A8%9ET8(%DF%CAq%01J%0A2%91e%89%D95e%2C%AC%AD%A4(%3F%E3%BA%B6%3D%7D*%91%A8%8E%F8%19%25%2C%0F_%B52)%2F%C9b%DE%8C%F2A%F9%BB%5D%0E%FE%F0%AB%2F%11%F0%7B%E3j%AB%60k%07%3D%FD%EAU2f%D8%40%D4%98%C1%AC%EA2%3CIj%A4%CF%AE%82%DC%F4%F87L3y%B3%F1(%F2%FF%F56%C3R%B5t%C3%A40%2F%9DEu%93S%DE2%BF%BC%F1%03%F6%1C%3E%8BS%91%87%1F%24%A6%99%3CXWE%C0%EFI)D%C3%B6%20k%DF%DCG%DAu4%DC%90A%22%AANUe%1E%DFJ%F1i%9C%3C%7D%89U%7F%DA%81%2CI%D7mw%C5%A1%26xf%9A%8B%DF%2C%BE%07Y%96R%06%D1%DD%1Be%F9%EA-%84%A3%FA%80*Y%1CJ%5E%88%A2%C0%EF%96%CC%A1%BC8%3Be%10%9An%B2b%CD%BB%B4%9C%0D%E1R%E4%E1%D5Z%9An%22K%22O%FCl%1E%B5%D3%C7%A54%A4%9Ex%E9%DF4%ED%3F%1D%B7c%14%93Ol%03%97Sf%E5%23%0B%98sg%F9%907z%AE%ADg%C0%DF%5E%7C%E3%7D%FE%B6%F5XB%7D%BF%9C%2CD%86%CF%C5%93K%E7S%5DU4%E8%CDwt%86il%3A%C1%B6%BD%A78s%BE%9BuO%7F%9D%BC%40%DAU6%7F%F9%E7a%D6%BE%B5%0Fo%82%C3%BC%84%40%04%20%1A3%C8%CAp%F3%DC%8A%2F2%E1%96%DCA4%5C6%07%3E%BC%C0%86%CD%CD%1C%3A~%81%F6P%18Y%12%D1%0D%93%86m%1F%F1%FD%07%A6%5D%B1%7D%7B%EB1V%BF%D2%84%E2%90%AE%92!C%06%89%C4t%C6d%FB%A8%7Ft%E1%A0%20%B64%9Dd%DD%A6%83%B4%9C%09%A1j%06.E%BE%D2%CF%8B%A2%C0%E6%9D'%F8%EEW%A7%22%CB%22%FB%3F%3CO%FD%DA%9D%C8%92%88%24%26%1E%F9qA%A2%AA%CE%D81%E9%D4%2F%AB%A3%A2%24%B9%EA%14l%FD%0F%CF%BD%B6%87%BDG%CE%22%08%02NE%BA%26i%15%87%C4%A9s%5D4%1D8Mq~%26%CBWoA%D3%CD%84fY%09%83D%A2%3A%E3%0A%FD%ACY%5EGQ~fR%17%DE%B8%B9%99g_%DDE4f%E0v9n4%24D%92%04%5Ex%FD%7D%00B%DD%11%5C%CE%E4%25%E0%80%1E%E1%A8%C6%84%B2%5CV%FE%7C%01Ey%19%89%CF%B4L%8BU%2F%EF%60%C3%BF%9Aq9e%3C%09%CC%AA%14Y%E2%5C%7B%0F%D8%0C%0Ab%40%90%FE%88%C6%E4%F1y%3C%F3%8B%85%E4dy%93%18%CC%D9%3C%B3v'%EB%1B%8E%90%E6u%92%60%9Eb%C35jv%C8%20%BD%E1%183%3E_%CC%CAG%16%90%E1s%25u%B1U%7F%DC%CE%FA%86%23%A4%FB%9C%8C%F4%BA%0A%A4%2F%1C%A3vZ)%8F%FFt%5E%D2%10%CF%BF%BE%9B%F5%EF%1CIxh%9D2%90%FE%88%C6%5D%B7%97%F2%D4%D2%7B%93%DE%CC%BA%BF%1F%E4%95%B7%0E%90%E6Q%12%0E%A7%94%80%F4%F6%C7X0%B3%82%C7%1E%9A%8B%DB%E9H%BA%3A%AD%FEs%13n%A7c%C0%B7I%23%02%12%8Eh%D4%CD%AA%E4%B7K%E6%24%5D1%1A%B6%05yzm%13.%C51%E0%CB%CA%11%03%B9%7F%FED~%FD%93%7B%92v%DC%B1%EF%14%8F%BD%F8%1E%A2x%F95%F3%CD%5E%82m%DB!%20%2B%19%A7%3D%07%CF%B0%AC%BE%11U3q%C8%22%A3%60u%26%BD%8B%83%C7%2F%B0b%CD%BBDb%FAh%81%B8%AC%D9L%D3L8.%3E%FE%24%C4%2F%EB%1B%E9%ED%8F%E1r%C8%A3%06%02%DB%16%C4%B6%B6%B6%96D!%1E~%B2%81K%5D%11%DCNy%D4%7Cv%23%08%22%A6%A9%F5%8A%CD%CD%CD%F5%F1%8C%DBC%FD%2C%7Fv%0B%E7%DA%7BG%15%04%80%20JD%7B%DA6HS%A7N%3D%AE(%CA%98%82%82%82i%D7%CD%A2%9E%08%0F%3D%FE%0FN%9C%09%E1q%3BF%0F%80%20%22J2%91%DE%B6%9D%DD%17%8F%FDPVU%D5%DA%B5k%D7%8F-%CB%0AVTT%FC%C0%E7%F3%E5%C9%FF%9B%B9%F4%85c%2C_%BD%85%60kG%C2-%E7%08%E5%04%A6%A9%86%D4%FE%D0%DB%FD%9D%A7%7Fo%18j%F8%BF%03%00%3A%02%CEg%9E%8DA%82%00%00%00%00IEND%AEB%60%82";
			var optionsWrapper = _template( ''+
		'		<div class="GM_options_wrapper_inner">'+
		'			<form name="%key%" id="form_%key%">		\n'+
		'				<div class="GM_options_header">		\n'+
		'					<div class="GM_options_buttons bfb_options_minimized_hide">		\n'+
		'						<input type="button" name="GM_options_save" id="GM_options_save" value="Salvar">		\n'+
		'						<input type="button" name="GM_options_cancel" id="GM_options_cancel" value="Cancel">\n'+
		'					</div>		\n'+
		'					<img id="bfb_options_icon" src="'+options_icon+'" style="max-height:50px;margin-right:20px;cursor:pointer;" align="left" border="0" title="Click to minimize/maximize options">		\n'+
		'					<div class="bfb_options_minimized_hide"><div style="float:left;margin-right:100px;"><span id="bfb_options_title">Social Fixer</span><br><i>Version '+version+'</i><br><i>Usuario: '+userid+'</i></div><span>Sitio Oficial: <b><a href="http://SocialFixer.com" target="_blank">SocialFixer.com</a></b></span><br><br>¿Qué hay nuevo? Mira <b><a href="http://SocialFixer.com/blog/category/releasenotes/" target="_blank">Notas de la versión</a></b></div>'+
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
				div.innerHTML = optionsWrapper;
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
			bind('GM_options_cancel','click',function() { self.cancelOptions(); apply_theme(undef,options.get('theme_url')); });
			bind('bfb_guided_setup','click',function(){ if(typeof guided_setup_action=="function"){guided_setup_action();} });
			
			// Set the size of the panels 
			$('bfb_options_tab_list').style.height = (window.innerHeight - 150)+'px';
			$('bfb_options_content').style.height = (window.innerHeight - 150)+'px';
			
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

			div.style.display="block";
		};
		this.hideOptions = function() {
			if (this.optionsDiv!=null) {
				this.optionsDiv.style.display='none';
				this.optionsDiv.innerHTML='';
			}
		};
		this.cancelOptions = function() {
			this.hideOptions();
		};
		this.saveOptions = function() {
			this.load();
			var doc = document;
			var f = doc.getElementById('form_'+this.key);
			if (f && f.elements) {
				for (var i=0; i<f.elements.length; i++) {
					var e = f.elements[i];
					if (e.name && e.name.indexOf("GM_")!=0 && !hasClass(e,"nosave")) {
						if (e.type=="checkbox") {
							this.set(e.name,e.checked,false);
						}
						else if (e.type=='text') {
							this.set(e.name,e.value,false);
						}
						else if (e.type=='textarea') {
							this.set(e.name,e.value,false);
						}
						else if (e.type=='select-one') {
							this.set(e.name,e.options[e.selectedIndex].value,false);
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
							var sty = getSelectValue(cr('sty'));
							if (sty) {
								var styo = {};
								for (var sty_id in sty) {
									var id_list = sty_id.split(/\s*,+\s*/);
									if (id_list) {
										for (var j=0; j<id_list.length; j++) {
											styo[id_list[j]] = id_list[j];
										}
									}
								}
								filter.criteria.sty = styo; 
							}
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
						this.set('filters',savefilters,false);
						filters = savefilters;
					}
				}
			} catch(e) { }
			
			this.save(false);
			if (options.get('show_options_save_message')) {
				alert("Refresh the page to see your changes");
			}
			this.hideOptions();
		};
	}
	catch(e) { return null; }
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
				bfb_help_popup.innerHTML = helptext;
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

// ==================================================================
// LOAD OPTIONS AND BEGIN THE REAL PROCESSING!
// ==================================================================
var options = new GM_options('better_facebook',userid);
// Asynchronous for Chrome
options.load(function(prefs){
	var option_keys = [];
	// Script Options
	if (options) {
		var a = function(name,type,def,opt,style) { options.addOption(name,type,def,opt,style); /* trace(name+"="+options.get(name)); */ }
		a('show_advanced_options','checkbox',false);
		a('disabled','checkbox',false);
		a('disabled_on_apps','checkbox',false);
		
		// RIGHT SIDEBAR
		a('pagelet_toggle','checkbox','true');
		a('show_friend_tracker','checkbox',true);
		a('show_friend_tracker_no_activity_msg','checkbox',true);
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
		a('show_nav_edit_friends','checkbox',true );
		a('show_nav_write_a_note','checkbox',true );
		a('show_nav_pages_i_admin','checkbox',true );
		a('show_nav_unblock_applications','checkbox',true );

		a('expand_nav_apps','checkbox',false );
		a('expand_nav_messages','checkbox',false );
		a('expand_nav_events','checkbox',false );
		a('expand_nav_photos','checkbox',false );
		a('expand_nav_friends','checkbox',false );
		a('expand_nav_friends_full','checkbox',false );
		a('hide_status_updater','checkbox',false );
		
		a('hide_chat_panel','checkbox',false);
		a('hide_left_nav_groups','checkbox',false);
		a('hide_left_nav_groups_create','checkbox',false);
		a('hide_left_nav_apps','checkbox',false);
		a('hide_left_nav_pages','checkbox',false);

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
		a('force_most_recent_feed_pages','checkbox',true );
		a('auto_click_more_times','input',3,{size:2},'padding:0;width:20px;font-size:11px;');
		a('auto_click_older_posts','checkbox',false );
		a('disable_scroll_load','checkbox',true);
		a('older_posts_selector','input','.fbOlderPosts, .uiMorePager a.lfloat, .uiMorePager a.uiMorePagerPrimary, #profile_pager_container .uiMorePager, #profile_pager_container .uiMorePagerPrimary',{size:50});
		a('alternate_read_display','checkbox',false );
		a('reload_when_mark_all_read','checkbox',false );
		a('auto_mute_count','input',0,{size:3} );
		a('auto_mute_all','checkbox',false );
		a('hide_old_comments','checkbox',true );
		a('hide_update_email','checkbox',false );
        a('reorder','checkbox',false);
		a('chronological','checkbox',true);
		a('hide_top_story_indicator','checkbox',false);
//		a('reorder_page_walls','checkbox',false);
		a('show_char_counter','checkbox',true);
		a('char_counter_max2','input','5000',{size:5});
		a('static_left_col','checkbox',false);
		a('hide_notification_pictures','checkbox',false);
		a('show_post_actions','checkbox',true);
		a('post_action_opacity2','input','.5',{size:3});
		a('post_action_zoom','input','100',{size:3});
		a('hide_post_actions_until_hover','checkbox',true);
//		a('show_notification_previews','checkbox',true);
		a('float_control_panel','checkbox',false);
		a('floating_cp_opacity','input','.75',{size:3});
		a('floating_cp_offset','input','0',{size:2});
		a('hide_hovercard','checkbox',false);
		a('cp_button_mark_all_read','checkbox',true);
		a('cp_button_show_hide_all','checkbox',true);
		a('cp_button_mute_all','checkbox',true);
		a('cp_button_reload','checkbox',true);
		a('cp_button_undo','checkbox',true);
		a('cp_show_status','checkbox',true);
		a('auto_expand_comments','checkbox',false);
		a('expand_see_more','checkbox',false);
		a('process_recent_activity','checkbox',false);
		a('chat_images_to_names','checkbox',false);
		a('enable_font_size','checkbox',false);
		a('post_font_size','input','13',{size:3},'padding:0;width:20px;font-size:11px;');
		a('comment_font_size','input','13',{size:3},'padding:0;width:20px;font-size:11px;');
		a('remove_recent_activity','checkbox',true);
		a('show_remove_recent_activity_message','checkbox',true);
        a('erase_after_recent_activity_remove','checkbox',false);
		a('remove_recent_activity_message_duration','input','5',{size:2});
		a('auto_remove_recent_activity','checkbox',false);
		a('stretch_wide','checkbox',false);
		a('show_image_previews','checkbox',true);
		a('image_preview_delay','input','.5',{size:3});
		a('fix_timestamps','checkbox',true);
		a('disable_theater_view','checkbox',false);
		a('fix_comments','checkbox',false);
		a('undo_ctrl_z','checkbox',true);
		a('fix_comment_cursor','checkbox', (SCRIPT_TYPE=="greasemonkey" || SCRIPT_TYPE=="firefox_addon" || SCRIPT_TYPE=="firefox_addon_official") );
		a('fix_comment_wrap','checkbox',false);
		// Questions
		a('auto_expand_questions_comments','checkbox',true);
		
		// Comment replies
		a('comment_reply','checkbox',true);
		a('comment_reply_float_textarea','checkbox','true');
		a('comment_reply_first_name_only','checkbox',false);
		
		// post actions
		a('show_post_action_info','checkbox',true);
		a('show_post_action_google','checkbox',true);
		a('show_post_action_mark_unread','checkbox',true);
		a('show_post_action_info_mute','checkbox',true);
		a('show_post_action_info_mark_read','checkbox',true);
		a('show_post_action_info_add_app','checkbox',true);
		// Recent Activity Types
		a('remove_recent_activity_write_on_wall','checkbox',true);//20
		a('remove_recent_activity_comment_on_status','checkbox',true);//107
		a('remove_recent_activity_comment_on_photo','checkbox',true);//46
		a('remove_recent_activity_like_page','checkbox',true);//47
		a('remove_recent_activity_comment_on_link','checkbox',true);//32
		a('remove_recent_activity_added_friend','checkbox',true);//21
		a('remove_recent_activity_relationship_change','checkbox',true);//3
		a('remove_recent_activity_added_other','checkbox',true);
		
		// Chat
		a('chat_disable_sidebar','checkbox',false);
		a('chat_force_offline','checkbox',false);
		a('chat_hide','checkbox',false);
		a('chat_show_all_online','checkbox',true);
		a('chat_compact','checkbox',false);
		a('chat_group_by_status','checkbox',true);
		
		// ADVANCED
		a('fix_logo2','checkbox',true);
		a('home_url','input','/',{size:20} );
		a('preview_img_max_width2','input','200',{size:4} );
		a('preview_img_max_height2','input','150',{size:4} );
		a('show_options_save_message','checkbox',true);
		a('comment_expire_days','input','21',{size:4} );
		a('open_app_link_in_tab','checkbox',false);
		a('open_app_link_marks_read','checkbox',false);
		a('mark_read_on_comment','checkbox',false);
		a('show_page_post_message','checkbox',true);
		a('allow_bfb_formatting','checkbox',true);
		a('sprite_url','input','',{size:20});
		
		// PAGELETS
		a('sfx_donated','hidden',false);
		a('sfx_no_donate','hidden',false);
		a('sfx_donate_check_time','hidden',0);
		a('check_for_messages','checkbox',true);
		a('last_message_check','hidden',0);
		a('message_check_interval','input',30,{size:5});
		a('last_message_id','hidden',0);
		a('show_message','hidden',true);
		a('tips_of_the_day','checkbox',true);
		a('last_tip_check','hidden',0);
		a('last_tip_id','hidden',0);
		a('show_current_tip','hidden',true);
		a('show_update','hidden',true);
		
		// MISC
		a('show_version_changes','checkbox',true );
		a('check_for_updates','checkbox',true );
		a('check_for_beta_updates','checkbox',false );
		a('update_check_interval','input','3',{size:3} );
		a('debug','checkbox',false );
		a('performance_monitor','checkbox',false);
		a('performance_monitor_auto_scroll','checkbox',true);
		a('performance_monitor_dom_insertions','checkbox',true);
		a('performance_monitor_show_messages','checkbox',true);
		
		// Hidden elements
		a('hidden_elements','input','',{size:80});
		a('hidden_elements_x','input','',{size:80});
		
		// CSS
		a('css_url','input','',{size:50} );
		a('css','textarea','',{rows:25,cols:80} );
		a('theme_url','input','',{size:60});

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
		
		a('enable_anonymize','checkbox',true);
		a('prevent_link_redirection','checkbox',false);

		// Hidden options
		a('version','hidden',0 );
		a('version_ack','hidden',0 );
		a('last_update_check','hidden',0 );
		a('last_msg2','hidden',0 );
		a('installed_on_5','hidden',0 );
		a('last_cleaned_on','hidden',0);
	}	
	
	// Don't run on Apps?
	if (options.get('disabled_on_apps') && host=="apps.facebook.com") { return; }
	
	// ===================================================
	// Options button
	// ===================================================
	var add_option_item = function(){};
	var errors = [];
	// Add some CSS to the page
	var css = ((<><![CDATA[
		#bfb_options_button { height:29px !important; padding:4px 4px 0 !important; }
		#bfb_options_button_li { position:relative; }
		#bfb_options_button_li ul {
			background: none repeat scroll 0 0 #FFFFFF !important;
			border-color: #333333 #333333 #2D4486 !important;
			border-style: solid !important;
			border-width: 1px 1px 2px !important;
			display: none !important;
			margin-right: -1px !important;
			margin-top: -1px !important;
			min-width: 200px !important;
			padding: 4px 0 !important;
			position: absolute !important;
			right: 0 !important;
			top: 100% !important;
			z-index: 1 !important;
		}
		#bfb_options_button_li ul a {
			border-bottom: 1px solid #FFFFFF !important;
			border-top: 1px solid #FFFFFF !important;
			color: #222222 !important;
			height: 18px !important;
			line-height: 18px !important;
			padding: 0 22px !important;
			display:block;
			font-weight:normal;
			white-space:nowrap;
			text-decoration:none;
		}
		#bfb_options_button_li ul a:hover {
			color:white !important;
			border-top: 1px solid #3b5998 !important;
			border-bottom: 1px solid #3b5998 !important;
		}
		#bfb_options_button_li.openToggler ul { display:block !important; }
		#bfb_options_button_li.openToggler > a >img { 
			background-color:white !important;
		}
		#bfb_options_button_li li { display:block !important; float:none !important; }
		#bfb_options_button_icon { border:1px solid #A7B4D1; border-radius:4px; -moz-border-radius:4px; -webkit-border-radius:4px; }
		#bfb_error_list { max-height:300px; overflow:auto; max-width:300px;  }
		.bfb_error { cursor:pointer; margin:5px 10px; border:2px solid #F03D25; border-radius:5px; -moz-border-radius:5px; -webkit-border-radius:5px; color:black; padding:3px;  }
		div.bfb_error:hover { background-color: #F03D25; color:white; }
	]]></>).toString());
	addGlobalStyle(css);

	onIdLoad('pageNav',function(nav) {
		if ($('bfb_options_button')==null) {
			var li = el('li',null,{id:'bfb_options_button_li'});
			var a = el('a','fbJewel',{href:'#',title:'Social Fixer Options',id:'bfb_options_button',rel:'toggle',role:'button'},null,'<img id="bfb_options_button_icon" src="'+wrench_23+'"><span id="bfb_badge_counter" class="jewelCount" style="display:none;"><span id="bfb_badge_count"></span></span>');
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
				QS(document,'#bfb_options_button').style.opacity=.5;
				QS(document,'#bfb_options_button img').style.backgroundColor="red";
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
				add_option_item('Opciones de Social Fixer',null,function() { options.displayOptions(); hide_bfb_menu(); return false;  },'top');
				add_option_item(el('li','menuDivider'),null,null,'top');

				add_option_item('Preguntas Frecuentes',null,function() { window.open('http://BetterFacebook.net/faq.php'); hide_bfb_menu(); return false;  },'top');
				add_option_item('Pagina de Soporte',null,function() { window.open('http://facebook.com/174424289341'); hide_bfb_menu(); return false;  },'top');
				add_option_item('Acerca Social Fixer',null,function() { better_fb_options('tab_about'); hide_bfb_menu(); return false;  },'top');
				add_option_item('Donar para Soporte Matt',null,function() { window.open('http://SocialFixer.com/donate.php'); hide_bfb_menu(); return false;  },'top');
				
				// Add a "disable" option
				add_option_item('Desactivar Social Fixer','Turn this option on to DISABLE all Social Fixer\'s features temporarily.',function() { 
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
		}
	});
	var hide_bfb_menu = function() {
		clickLink($('bfb_options_button'),true);
	}
	/*
	var add_options_list_error = (function() {
		var error_count = 0;
		return function(msg) {
			if (error_count
		};
	})();
	*/

	// ===================================================
	// POWERED OFF?
	// ===================================================
	if (options.get('disabled') || !options.get('disable_scroll_load')) { 
		setScrollLoad(true); 	
	}
	if (options.get('disabled')) { return; }
	
	function toggle(o,default_open_option) {if (typeof o=="string") { o=$(o); }if (o && o.style) {var closed = (o.style.display=="none");o.style.display = closed?"":"none";if (default_open_option) {options.set(default_open_option,closed);}}}

	// some global option vars
	remote_content.typeahead_new.ttl=options.get('friend_tracker_interval')*3600;
	remote_content.friend_activity.ttl=options.get('friend_activity_interval')*3600;
	performance_monitor_enabled = options.get('performance_monitor');

	var hidden_elements_string = options.get('hidden_elements') || '';
	var hidden_elements_x_string = options.get('hidden_elements_x') || '';
	var hidden_elements = array_to_object(hidden_elements_string.split(','));
	var hidden_elements_x = array_to_object(hidden_elements_x_string.split(','));
	
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
	}
	
	// ===================================================
	// RPC MESSAGING
	// ===================================================
	var rpc_queue = [];
	var rpc_iframe = null;
	var rpc_window = null;
	var rpc_ready = false;
	var rpc_id = 0;
	var rpc_callbacks = {};
	function rpc(message,data,func) {
		var message_object = {'id':++rpc_id,'message':message,'data':data};
		trace_log("Posted Msg: "+JSON.stringify(message_object),'bfb_trace_message');
		if (!rpc_ready) {
			rpc_queue.push({'message':message_object,'func':func});
			// If the remote iframe doesn't exist, create it
			if (!rpc_iframe && document.body) {
				trace_log("Creating RPC iframe");
				rpc_iframe = el('iframe','bfb_rpc_iframe',{id:'bfb_rpc_iframe',src:protocol+'//SocialFixer.com/post_message.php'});
				document.body.appendChild(rpc_iframe);
			}
			return;
		}
		post_message(message_object,func);
	}
	function post_message(message_object,func) {
		rpc_callbacks[message_object.id] = func;
		if (rpc_window) {
			var msg = JSON.stringify(message_object);
			trace_log("Sending RPC message:"+msg,'bfb_trace_message');
			rpc_window.postMessage(msg,"*");
		}
	}
	
	bind(window,'message',function(e) {
		var msg = e.data;
		trace_log("Msg:"+msg,'bfb_trace_message');
		try {
			if (msg) {
				msg = JSON.parse(msg);
				if (msg.message) {
					if (msg.message=="ready") {
						try { rpc_window = rpc_iframe.contentWindow; } catch(e){}
						if (!rpc_window) { try { rpc_window = rpc_iframe.wrappedJSObject.contentWindow; } catch(e){} }
						rpc_ready = true;
						// Send all the queued messages
						for (var i=0; i<rpc_queue.length; i++) {
							post_message(rpc_queue[i].message,rpc_queue[i].func);
						}
					}
					else if (msg.message=="select_theme") {
						QSA(document,'input[name="theme_url"]',function(i){ i.value=msg.href; });
						apply_theme(msg.href,options.get('theme_url'));
					}
					else if (typeof msg.id!="undefined") {
						var func = rpc_callbacks[msg.id];
						delete rpc_callbacks[msg.id];
						func(msg.message,msg.data);
					}
				}
			}
		}
		catch(e) { }
	});

	// ===================================================
	// Auto-click "Older Posts"
	// ===================================================
	var misfires=0;
	var olderPostsSelector = options.get('older_posts_selector');
	var maxOlderPostsClickCount = +options.get('auto_click_more_times') || 0;
	var maxmisfires= maxOlderPostsClickCount * 25;
	findAndClickOlderPosts = function() { 
		clickOlderPosts(QS(document,olderPostsSelector));
	}
	if (maxOlderPostsClickCount>0) {
		onIdLoad('pagelet_stream_pager',function() { delay(findAndClickOlderPosts,2500); });
		onIdLoad('profile_pager',function(){ delay(findAndClickOlderPosts,2500) });
		onUnload(['pagelet_stream_pager','profile_pager'],function() {
			olderPostsClickCount = 0;
			misfires = 0;
		});
	}
	// Function to actually click Older Posts
	function clickOlderPosts(a) {
		var clicked = false;
		if (!options.get('auto_click_older_posts')) { return; }
		try {
			if ( !unsafeWindow.JSCC && (!unsafeWindow.UIIntentionalStream || !unsafeWindow.UIIntentionalStream.instance || !unsafeWindow.UIPagelet) ) {
				trace_log("Older Posts not clicked - JS not loaded");
				setTimeout(findAndClickOlderPosts,1000);
			}
			else if (!a) {
				// If the Older Posts link is not found at all, try again
				trace_log("Older Posts link not found");
				if (misfires++<maxmisfires) { setTimeout(findAndClickOlderPosts,1000); }
			}
			else if (olderPostsClickCount<maxOlderPostsClickCount) {
				var pager = getParentByClass(a,'uiMorePager');
				if (true) {
					if (pager && !QS(pager.parentNode,'.async_saving')) {
						trace_log("clicking Older Posts!");
						try {
							if ( !(parent(a,'#profile_pager')) && unsafeWindow.UIIntentionalStream.instance && unsafeWindow.UIIntentionalStream.instance.loadOlderPosts) { 
								unsafeWindow.UIIntentionalStream.instance.loadOlderPosts(); 
								clicked = true;
							}
							else if (a.onclick) {
								a.onclick();
								clicked = true;
							}
						} catch(e) { }
						if (!clicked) {
							clickLink(a,false);
						}
						update_status('bfb_status_older',(++olderPostsClickCount));
						// Click again after a short delay
						setTimeout(findAndClickOlderPosts,1000);
					}
					else { trace_log("Not clicking Older Posts (has class async_saving)"); if (misfires++<maxmisfires) { setTimeout(findAndClickOlderPosts,1000); } }
				}
				else {
					trace_log("Not clicking Older Posts (Javascript not loaded yet)");
					setTimeout(findAndClickOlderPosts, 1000);
				}
			}
			else { trace_log("Not clicking Older Posts (already too many)"); }
		} catch(e) { if (misfires++<maxmisfires) { setTimeout(findAndClickOlderPosts,1000); } }
	}

	trace("Browser:"+window.navigator.userAgent);
	trace("SFX Version:"+version);
	trace("Script Type:"+SCRIPT_TYPE);

	// ==================================================================
	// MAKE USE OF FACEBOOK'S INTERNAL DATA! (if possible)
	// ==================================================================
	function $Env(key) { 
		if (typeof unsafeWindow!="undefined" && typeof unsafeWindow.Env!="undefined") { return unsafeWindow.Env[key]; }
		var val = QS(document,'input[name='+key+']','value');
		if (val) { return val; }
		return null;
	}

	// Log the filters
	trace("filters="+JSON.stringify(options.get('filters')));

	// Set the install time of the script
	if (options.get('installed_on_5')==0) {
		options.set('installed_on_5',time(),false);
		options.set('last_message_check',time(),false);
		options.save();
	}
	function installed_since() {
		var io = +options.get('installed_on_5');
		if (!io) { return 0; }
		return time()-io;
	}

	// DEBUG?
	DEBUG = options.get('debug');
	PERFORMANCE = options.get('performance_monitor');
	function debugmsg(str) {
		return '<div class="debug_small">'+str+'</div>';
	}

	var info_icon = "\"data:image/gif,GIF89a%10%00%10%00%E6%7F%00%B7%8A%2BrV%1A666%9B%9B%9B%B1%86)%F5%BCB%D6%A33%CE%9D1qqq7)%0C%FF%C6%3F)%1E%09%FD%C0%3C%F5%BA%3A%DC%B2V%03%03%02%1C%1C%1C%1C%15%07%09%09%09III%0E%0E%0D%11%11%11%12%0E%032%26%0B%FF%C2%3C%FC%BF%3C%FF%C3%3D%FF%C4%3D%F9%BD%3A%FF%C2%3D%FB%BE%3B%FC%BF%3BWWW%E5%E5%E5%F1%B79%86%86%86%FA%FA%FA%95%95%95%FF%CDR%FB%BF%3C*'%20%FF%C1%3BG%3E(%FF%C6A%E4%E4%E4%9Dw%24OOO%E2%AB4%FF%D2c%F8%C2O%CF%AAY%E9%B17%FB%BF%3B%F2%B89%17%17%17%60%60%60%B8%97O%FF%C8%40%FF%C9C%F8%BC%3AK%3D%1E%F3%C1X%84n%3F%FB%BE%3A%B7%B7%B7%C7%A1MJJJ%AB%8FRhhhbJ%16%E9%B6F%A5%A5%A5%FA%C8%5B%CC%9B%2F%93w8%E1%E1%E1%B3%8B4%B1%B1%B1%7B%5D%1C%80f-%A8%A8%A8%FA%C3E%8Dk!%2C!%0A6*%10%06%07%0A%0A%08%02%FE%C2%3C%AE%AE%AE%BC%8E%2C%D5%A6C%FF%C6%3D%FF%C3%3F%C6%96%2F%3B%3B%3B%EF%B58%DF%DF%DFggg%BE%99J%E7%AE6yb4%FF%CBA%98%98%98%C1%93-%7B%7B%7B%FF%C3961(%AA%83%2F%AE%85%2C%82k%3A5%2F%24%FA%BE%3B%FB%BE9%B5%B5%B5%FD%BF9222%DC%ABA%FE%C1%3C%CF%9E1%FF%C4BC%3A%24%22%22%22%96%96%96%17%16%11%A3%7C'%F9%BD%3B%00%00%00%FF%FF%FF!%F9%04%01%00%00%7F%00%2C%00%00%00%00%10%00%10%00%00%07%DE%80%7F%82%83s%14%15%5E%83%89%83%23~U*%3C%0F~%8A%89~n81%05%04%09~%03%93~j%0E90%26%5B%07%9B%8A%126AiHCk%0D%18g%16%10%83D%0F%3E%2BW%0E%0F%0F%5D%1A%0CR~%08%82%14(Fr%5C2~~%00%1A'%22%09%15%82~m%0A%1C%1D%BB%0F%07%1Do%18-%0F%7Fy%7BZ)%7D4%05T%0B_%19%7D%193%0B%02%12xQ%3F%7D%1CwbL%0C%7D%FC%0A%01%12%12%C8%E8%E0%D0%07N%0F%25ljx%E0%A7%81%00%05%09O%CA%2C%C4%40%C7O%02%11%EC%18%7C%00%B0G%C2%02%03%1F6l%D8%C1'K%86%3A%1D%1A%18%08%F0%00%81%1F%0BE%F8%24y%81a%C3%18%3B%04%9C%5Cx%00BP%BC%97%11%A6%5CX%10%C1%8A%1FZ%8A%D0%FCq1a%C2%1F%10a%12%05%02%00%3B\"";

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
				else if (t-story.read > comment_expire_time) {
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
			if (pruned_count) { trace("Pruned "+pruned_count+" old story comment counts"); }
		}
		return pruned_count;
	}
	if (time()-options.get('last_cleaned_on') > 1000*60*60*24 ) {
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
			trace("Clicking link to expand similar posts. Will check back in "+clickLinkQueueDelay+" ms");
			if (!el) { el = clickLinkQueue.pop(); }
			el.style.backgroundColor="red";
			clickLink(el);
			clickLinkQueueTimer = setTimeout( function() { clickLinkQueued(); }, clickLinkQueueDelay);
		}
		else if (el) { clickLinkQueue.push(el); trace("Added link to queue. Queue length is now:"+clickLinkQueue.length); }
		else { clickLinkQueueTimer = null; trace("Nothing more to do in the click link queue"); }
	};

	// ==================================================================
	// Mark post as read after commenting
	// ==================================================================
	var commented_stories = {};
	if (options.get('mark_read_on_comment')) {
		var mark_read_on_comment = function(story,i) {
			var fbid = story.getAttribute('fbid');
			if (commented_stories[fbid]) {
				if (commented_stories[fbid]!=i) {
					delete commented_stories[fbid];
					setTimeout(function(){mark_post_read(story,true);},10);
				}
			}
			else {
				var fbid = story.getAttribute('fbid');
				commented_stories[fbid] = i;
			}
		};
		subscribe('UserAction/new',function(e,o) {
			try {
				var story = parent(o.node,storySelector);
				if (story && hasClass(story,"bfb_processed")) {
					mark_read_on_comment(story,2);
				}
			} catch(e) { alert(e.toString()); }
		});
		onSelectorLoad('.uiUfiComment.uiUfiUnseenItem',function(comment) {
			var story = parent(comment,storySelector);
			if (story && hasClass(story,"bfb_processed")) {
				mark_read_on_comment(story,1);
			}
		},'both');
	}
	
	// ===================================================
	// Handle DOM insertions
	// ===================================================
	bind(document,"DOMNodeInserted", function (e) {
		var f,id,selector,el,els;
		var o = target(e);
		if (o.nodeType==3 || internalUpdate) { return; }
		var tn = o.tagName;

		if (tn=="SCRIPT" || tn=="LINK" || tn=="INPUT" || tn=="BR" || tn=="STYLE") { return; }
		var cn = o.className, pn=o.parentNode;
		// Insertion of comment hidden elements on every keypress!
		if (cn=="DOMControl_shadow" || (pn.className && pn.className=="highlighter")) { return; }
		
		if (PERFORMANCE) { 
			trace_start("handleDomInsertion");
			if ($('bfb_trace_cb_insert','checked')) {
				trace_log("+ "+outerHTML(o,true),"bfb_trace_inserted"); 
			}
		}

		if (options.get("fix_timestamps")) {
			fix_timestamps(o);
		}

		var processed = false;
		// If the insertion is a minifeedwall or something within a minifeedwall, check the option to make sure it should be processed
		var isMiniFeedWall = ((getParentByClass(o,"minifeedwall")!=null) || (getParentByClass(o,"fbProfileStream")!=null) || (o.getElementsByClassName('minifeedwall').length>0));
		var isGroupWall = ($('pagelet_group_mall')!=null);
		if ( (!isMiniFeedWall || processProfiles) && (!isGroupWall || processGroups) ) {
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
		
		if (PERFORMANCE) { trace_end("handleDomInsertion"); }
	});

	// ==================================================================
	// HANDLE STREAM HEADER CHANGES
	// ==================================================================
	// Check to see if we need to click "Most Recent" on Pages
	if (options.get('force_most_recent_feed_pages')) {
		onSelectorLoad('#wall_filter_list *[data-label="Most Recent"]:not(.checked) a',function(mostrecent) {
			var href=mostrecent.getAttribute('href');
			if (href) {
				try { location.href=href; } catch(e) { }
			}
		});
	}
	
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
			if (unsafeWindow.PhotoTheater) { unsafeWindow.PhotoTheater = null; }
            var a = parent(target(e),'a');
            if (a && a.getAttribute('rel')=="theater" || hasClass(a,'uiMediaThumb') || hasClass(a,'uiPhotoThumb')) {
				a.removeAttribute('rel');
				a.removeAttribute('ajaxify');
            }
		},true);
	}

	// ==================================================================
	// Insert a character counter in status update boxes
	// ==================================================================
	(function() {
		if (options.get('show_char_counter')) {
			onSelectorLoad('textarea.mentionsTextarea',function(ta) {
				if (!matchesSelector(ta,'#pagelet_composer textarea,#profile_stream_composer textarea')) { return; }
				var counter = null;
				var counter_max = options.get('char_counter_max2') || 5000;
				var wrap = getParentByClass(ta,'wrap');
				if (wrap && !(QS(wrap,'.bfb_char_count')) ) {
					var was_warning = false;
					ta.addEventListener('keyup',function(e) {
						if (!counter) {
							counter = QS(wrap,'.bfb_char_count');
							if (!counter) {
								counter = el('div','bfb_char_count',{id:'bfb_char_count'});
								wrap.appendChild(counter);
							}
						}
						if (counter) {
							var remaining = counter_max-(ta.innerHTML.length-4);
							if (hasClass(ta,"mentionsTextarea")) {
								remaining = counter_max-ta.value.length;
							}
							counter.innerHTML = remaining;
							if (remaining < 10) {
								addClass(counter,"bfb_char_count_warning");
								was_warning = true;
							}
							else if (was_warning) {
								removeClass(counter,"bfb_char_count_warning");
							}
						}
					
					},true);
				}
			});
		}
	})();
	
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
		trace("Creating control panel");
		var reload = function() { window.location.reload(); };
		var markAllRead = function() {
			markRead(function() {
				if (options.get('reload_when_mark_all_read')) {
					reload();
				}
			});
		}
		if (!$('better_fb_cp')) {
			var cp = el('fieldset','better_fb_cp',{id:'better_fb_cp'});
			append(cp, el('legend',null,null,null,'Social Fixer ver. '+version+' Control Panel ') );
			if (options.get('cp_button_mark_all_read')) { append(cp, button('Mark All Read',markAllRead,'better_fb_mark_read') ); }
			if (options.get('cp_button_show_hide_all')) { append(cp, button('Toggle Hidden Posts',toggle_show_all,'better_fb_show_hide_all') ); }
			if (options.get('cp_button_mute_all')) { append(cp, button('Mute All',mute_all,'better_fb_mute_all') ); }
			if (options.get('cp_button_reload')) { append(cp, button('Reload',reload,'better_fb_reload') ); }
			if (options.get('cp_button_undo')) { append(cp, button('Undo',undo,'') ); }
/*
			if (DEBUG) {
				append(cp, button('Toggle Debug',function(){ toggleClass(document.body,"debug"); },'better_fb_debug_button') );
				
				var lr = el('div','bfb_debug');
				var setpref = el('div',null,null,null,'Set Preference: Name:<input size=10 id="bfb_setpref_name"> Value:<input size=10 id="bfb_setpref_val">');
				append(setpref, el('input',null,{type:'button',value:'Save'},{click:function() { options.set($('bfb_setpref_name').value,$('bfb_setpref_val').value); alert('Saved');}}) );
				append(lr,setpref);
				append(cp, lr );
				
				append(cp, el('div','',{id:'better_fb_debug_console'}) );
			}
*/
				add_hideable(cp,'Social Fixer Control Panel','display_control_panel',true,null,"-12px","-8px");
			insertFirst( beforeEl.parentNode , cp);
			if (options.get('cp_show_status')) {
				var sc = '<span style="cursor:help;" title="The number of posts that have been delivered by Facebook and processed by Social Fixer">Processed:<span id="bfb_status_processed">0</span><span class="bfb_status_separator">|</span></span>';
				sc += '<span style="cursor:help;" title="The number of posts that have been hidden by a filter or because they are already read">Hidden:<span id="bfb_status_hidden">0</span><span class="bfb_status_separator">|</span></span>';
				sc += '<span style="cursor:help;" title="The number of posts that have matched a filter rule. Toggle the checkbox to quickly turn filters on or off"><input type="checkbox" id="bfb_status_filters_cb">Filtered:<span id="bfb_status_filtered">0</span><span class="bfb_status_separator">|</span></span>';
				sc += '<span style="cursor:help;" title="The number of posts that have been moved to a tab by a filter rule">Tabbed:<span id="bfb_status_tabbed">0</span><span class="bfb_status_separator">|</span></span>';
                sc += '<span style="cursor:help;" title="The number of posts reordered to be chronological">Reordered:<span id="bfb_status_reordered">0</span><span class="bfb_status_separator">|</span></span>';
				sc += '<span style="cursor:help;" title="The number of duplicate posts delivered by Facebook and detected and hidden by Social Fixer">Dupes:<span id="bfb_status_duplicate">0</span><span class="bfb_status_separator">|</span></span>';
/*
				sc += '<span style="cursor:help;" title="The number of SIMILAR POSTS posts automatically expanded">Expnd:<span id="bfb_status_expanded">0</span><span class="bfb_status_separator">|</span></span>';
*/
				sc += '<span style="cursor:help;" title="The number of times Older Posts has been automatically clicked. Toggle the checkbox to quickly enable or disable this feature"><input type="checkbox" id="bfb_status_older_posts_cb">Older Posts:<span id="bfb_status_older">0</span>/<input style="font-size:inherit;padding:0px;width:15px;cursor:pointer;" onfocus="this.select()" id="bfb_status_older_posts_input" value="'+maxOlderPostsClickCount+'"></span>';
				append(cp, el('div',null,{id:'bfb_status'},null,sc));
				$('bfb_status_older_posts_cb').checked = options.get('auto_click_older_posts');
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
				$('bfb_status_filters_cb').checked = options.get('filters_enabled');
				bind($('bfb_status_filters_cb'),'click',function(e) {
					options.set('filters_enabled',this.checked);
					alert("Refresh the page to view it with filters "+(this.checked?"enabled":"disabled"));
				});
			}
			
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
			var firstScroll = true;
			var manualOffset = +( options.get('floating_cp_offset') || 0);
			var originalTop = 0
			var originalWidth = 0;
			var offsetWidthSet = false;
			if (options.get('float_control_panel')) {
				document.addEventListener('scroll', function(e) {
					if (!cp) { return; }
					var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
					if (firstScroll) {
						// Capture the starting position of the control panel
						originalTop = offset(cp).top - 41;
						originalWidth = cp.offsetWidth;
						firstScroll = false;
					}
					if (scrollTop > originalTop) {
						addClass(cp,'bfb_cp_float');
						cp.style.top = ((scrollTop-originalTop)+manualOffset)+"px";
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
				},false);
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

	// ==================================================================
	// STATIC CSS
	// ==================================================================
	(function() {  // Wrapped for code collapsing
		var o = {};
		var zoom = +options.get('post_action_zoom')/100;
		o.floating_cp_opacity = options.get('floating_cp_opacity');
		o.post_action_opacity2 = options.get('post_action_opacity2');
		
		// Conditional options to add as CSS classes to the HTML tag
		var condition_options = ['alternate_read_display','hide_post_actions_until_hover','hide_hovercard','expand_nav_messages','expand_nav_events','expand_nav_photos','expand_nav_friends','expand_nav_friends_full','left_align','static_left_col','hide_update_email','hide_old_comments','hide_notification_pictures','hide_chat_panel','hide_status_updater','stretch_wide','fix_comments','fix_comment_cursor','fix_comment_wrap','hide_happening_now','unlock_right_col','chat_disable_sidebar','chat_hide','hide_left_nav_groups','hide_left_nav_groups_create','hide_left_nav_apps','hide_left_nav_pages','chronological','hide_top_story_indicator','ticker_scroll'];

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
		
		// Write out the CSS to the page
		var css = ((<><![CDATA[
	.better_fb_cp { padding:0px 5px 2px 5px; border:1px solid #3B5998; margin:0px 0px 6px 0px; background-color:white; z-index:100; -moz-border-radius:5px; border-radius:5px; }
	.better_fb_cp legend { font-size:9px; color:#3B5998; background-color:white; }
	.bfb_cp_float { position:relative; z-index:14; opacity:.75; -moz-box-shadow:5px 5px 5px #999; -webkit-box-shadow:5px 5px 5px #999; border:2px solid #ccc; }
	.bfb_cp_float:hover { opacity:1; }

	.bfb_new_comment_notif { display:none; }
	.bfb_read, .bfb_muted { display:none !important; }
	.bfb_read.bfb_new_comments, .bfb_read.bfb_new_comments .bfb_new_comment_notif { display:block !important; }
	.bfb_hidden,.bfb_hidden.bfb_new_comments { display:none !important; }
	.bfb_minimized img, .bfb_minimized .comments_add_box { display:none !important; }
	.bfb_minimized > *, .bfb_minimized { min-height:0px !important; padding-bottom:0px; padding-left:0px !important; }
	.bfb_minimized * { margin:0 !important; }
	.bfb_minimized .uiStreamMessage, .bfb_minimized .GenericStory_Message { padding-left:0px !important; }
	.bfb_minimized .UIStoryAttachment { margin:0px !important; }
	.bfb_read.bfb_duplicate, .bfb_duplicate { display:none !important; }
	
	.bfb_undid { background-color:#ffffcc; }
	
	.bfb_hideable .bfb_hide_el { display:none; cursor:pointer; background:transparent url("data:image/gif,GIF89a%0B%00%0B%00%91%00%00%00%00%00%FF%FF%FF%9C%9A%9C%FF%FF%FF!%F9%04%01%00%00%03%00%2C%00%00%00%00%0B%00%0B%00%00%02%18%94%8F6%CB%AC%BA%9E%18%87%CA%88%B0%83%16%D7%5E%85%13w5M%82%0A%05%00%3B") no-repeat center center; width:11px; height:11px; }
	.bfb_hide_menu { display:none; position:absolute; margin-top:5px; right:0px; background-color:white; border:1px solid black; color:black; min-width:150px; }
	.bfb_hide_menu div.bfb_item { color:#3A579A; padding:4px 10px 5px; white-space:nowrap; font-weight:normal; }
	.bfb_hide_menu div.bfb_item:hover { background-color:#6D84B4; color:white; padding:3px 10px 4px; border-bottom:1px solid #3B5998; border-top: 1px solid #3B5998; }
	.bfb_hideable .bfb_hide_el.bfb_show_menu .bfb_hide_menu { display:block; }
	.bfb_hideable:hover .bfb_hide_el { display:block; }
	.bfb_hideable_hover { border:3px solid red; }
	.bfb_frame { border:2px solid red; background-color:#ccc; opacity:.3; position:absolute; top:0px; left:0px; z-index:999; }

	html.alternate_read_display .bfb_read, html.alternate_read_display  .bfb_muted { display:block !important; max-height:18px; min-height:18px !important; overflow:hidden; opacity:.25; }
	html.alternate_read_display .bfb_read:hover, html.alternate_read_display  .bfb_muted:hover { max-height:none;overflow:visible;opacity:1; }
	html.alternate_read_display .bfb_read.bfb_new_comments, html.alternate_read_display  .bfb_read.bfb_new_comments .bfb_new_comment_notif { max-height:none;overflow:visible;opacity:1; }

	/* Make sure that show all actually shows all */
	#content .bfb_show_all .bfb_processed { display:block !important; }
	#content .bfb_show_all .bfb_duplicate { display:none !important; }

	.UIButton_better_fb { margin:0px 3px !important; padding:0px 4px !important; }

	.bfb_new_comment_notif { width:350px; background-color:#edeff4 !important; -moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px; font-size:11px; line-height:16px; padding:1px 0px 1px 5px !important; color:black; font-weight:bold; border:1px solid #aaa !important; border-right-color:#666 !important; border-bottom-color:#666 !important; border-right-width:2px !important; border-bottom-width:2px !important; }

	/* Post modifications */
	.bfb_reply_link:before { content:" · "; }
	.bfb_floating_comment { position:absolute !important; width:400px !important; z-index:999999 !important; border:1px solid #999 !important; -moz-box-shadow:5px 5px 5px #999; -webkit-box-shadow:5px 5px 5px #999;}
	.bfb_reply_active_comment { border:1px solid #999; }
	.bfb_reply_commented .bfb_reply_link { padding-right:14px; background:transparent url("data:image/gif,GIF89a%0C%00%0C%00%91%03%00%7B%D6z%00f%00%00%99%00%00%00%00!%F9%04%01%00%00%03%00%2C%00%00%00%00%0C%00%0C%00%00%02%1D%9C%8F%A9%23%7B%02%DA%82%22%CCh%99d%D8%04%10q%15%12P%5DR%9EJ%999%AD%E3%14%00%3B") no-repeat right center; }
	.bfb_reply_note { font-size:9px; color:#666; }
	
	/* Post Actions */
	.bfb_post_action_container { opacity:.5; display:block; position:absolute; z-index:14; top:0px; right:30px; padding:0; background-color:white; }
	.bfb_post_action_container:hover { opacity:1;  }
	.uiUnifiedStory:hover .bfb_post_action_container, .mall_post:hover .bfb_post_action_container { display:block; }
	.bfb_post_action { background:transparent url("data:image/gif,GIF89aZ%00%1E%00%B3%00%00%D1%00%00%98%AD%CB%E4%E6%E9%D7%D9%DC%A5%B5%D0%D7%D9%DD%C0%C5%D0%D6%D8%DC%D8%DA%DE%C6%CB%D2%D8%D9%DD%AD%BD%D6e%84%B2%FF%FF%FF%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00Z%00%1E%00%03%04%FF%B0%C9I%AB%BD8%EB%CD%BB%FF%D7%22%8E%D4h%9A%D6p%16%60%EB%96%A7(-%1B%3D%8DB%23%90X%EC%C9%1C%A0%25%06%A4%F1%1A%24%1B%12%A7C%0Dm%C2Z%B4%17%3D%CD%9CP%19%CF%A6%22%8E%0C%CFk%E7%98!%FB%96%DB%9B%13y%C5%09vk%B5X%AA%2CO%CFV%B6%BA%9Ee%C2%C9%7Bu%25%7B%3D%13%0C%0C6%87mT3%81J%7D%229%7FSr%8C%800H%87%0C%0D%9A%8B!P%8Bih%91Mq%81T%970%23%9A%8Am%5BXh%84%90%0B%92%26%04aK%A8A%40%9D%8E%B3%8D%1A6%0A%26%B5%23%09%15Ue%3F%12%AC%9B%AEEkGy%AEo%93%B8%B9%2F%16%9D%BDx%A6EvD%A8%94%D9%9C%CE%E5%CF%5Ea%82%15%07'%08%E4%F0%F1%AA%F2%1C%01%CD%F7%87%01%F6%F8%CD%FA%FC%FD%FB%FE%E5%0B(%D0%9F%C0%7C%07%13*4g%A8W%06%7C'%16J%9Cx%10%83%A2%8A%ACV%1D%D2%88O%9BBf%09%C8A%DE%B3%B8%C9%9C%C3%92%1B9%9A%E8x%AE%5CH%91%FF%1A%B6%AA%D4%B0%25%A7%9A%9A%BCpd%05%12fL%9F%2C%5D2%9C%83s%A6%C8r%11S%EEl%C5%B4%22%D0%91%3E%AF%F5%E4%09%13%E9J%A5%22%82%0A%E5y%B2%A3%26%00%00%CA%81%9D%99%EE%9C%C3%A3X%17%E4%BC%0A%F5%A7I~%CC%1A%80%05%C0%60.%D9pfM%16M%8A%88-%D5%A7C%05V%98%3B%D6(%D1%A92%0DYU9%82%40%5Bgp%01%FF%3Dd%F7%EC%E1%BC1%D7f%C5%FA%F8%22%DC%85b%09%5B%C6%96%F8(%85%8C%8C7S%EDE%F1%9F%DD%CAR%B7N%E5%A73%B2%CC%D6%F7%0A%D7%A5%3B%94%E4%EA%AD%F7%F8R%24%F8%CF%E0A%E3%05%89%DFf%80%BC8q~%01%22%00%00%3B") no-repeat 0 0; }
	.bfb_post_action { text-align:center; float:right; width:15px; display:inline; height:15px; margin:0px 2px; cursor:pointer; }
	.bfb_post_action_read { background-position:0 0; }
	.bfb_post_action_read:hover { background-position:0 -15px; }
	.bfb_post_action_unread { display:none; background-position:-15px 0; }
	.bfb_read .bfb_post_action_unread { display:block; }
	.bfb_post_action_unread:hover { background-position:-15px -15px; }
	.bfb_post_action_mute { background-position:-45px 0; }
	.bfb_post_action_mute:hover { background-position:-45px -15px; }
	.bfb_post_action_add { background-position:-30px 0; }
	.bfb_post_action_add:hover { background-position:-30px -15px; }
	.bfb_post_action_info { background-position:-60px 0; }
	.bfb_post_action_info:hover { background-position:-60px -15px; }
	.bfb_post_action_google { background-position:-75px 0; }
	.bfb_post_action_google:hover { background-position:-75px -15px; }

	/* Help Popup */
	.bfb_help { background:transparent url("data:image/gif,GIF89a%10%00%10%00%F7%00%00%00%FF%00%10J%B5%10R%B5%10R%C6%10R%D6%10Z%D6!R%C6!Z%B5!Z%C6!Z%E7!c%F7!k%F7!k%FF1Z%8C1k%FF1s%FF9Z%8CBs%A5Bs%FFB%7B%F7B%7B%FFJk%94J%84%D6Rk%94Rs%9CR%7B%C6R%84%D6R%84%E7R%84%F7R%84%FFR%8C%D6R%8C%F7R%8C%FFZ%84%9CZ%8C%D6c%8C%C6c%8C%D6c%94%C6c%94%F7c%94%FFk%84%ADk%9C%D6s%8C%9Cs%94%ADs%94%B5s%94%F7s%9C%C6s%9C%D6s%9C%F7s%9C%FFs%A5%E7%7B%94%94%7B%9C%AD%7B%A5%D6%84%A5%D6%84%AD%D6%84%AD%E7%84%AD%FF%8C%B5%E7%94%9C%9C%94%9C%A5%94%AD%BD%94%AD%C6%94%AD%E7%94%AD%F7%94%B5%FF%A5%BD%CE%A5%BD%D6%A5%BD%DE%A5%BD%E7%A5%BD%F7%A5%BD%FF%A5%C6%FF%AD%C6%DE%B5%C6%D6%B5%C6%F7%B5%CE%E7%B5%CE%F7%B5%CE%FF%BD%BD%BD%BD%C6%C6%BD%C6%CE%C6%CE%D6%C6%CE%E7%C6%D6%DE%C6%D6%F7%C6%D6%FF%C6%DE%F7%CE%DE%E7%DE%DE%E7%E7%EF%F7%E7%F7%F7%E7%F7%FF%F7%F7%F7%F7%F7%FF%F7%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%00%00%2C%00%00%00%00%10%00%10%00%00%08%BD%00%01%08%1CH%B0%A0A%00%3Aj%A4%B0qp%60%8D*%5B%C0%80%F1%C2%C4%C5A%22%5B%AC%E4%E8%D0!G%15-7%0A%D6%D8rDB%10%2F%60%B8%9C0%A2e%04%C1*N(%C4%00%83%E4%04%12%2F%13%8A%24%19%F8bK%0E%09%1D%828X%D0%02%CC%06%12%5BB%08%14%01%A6%83%83%A7%0ALl%A9b%E0%00%18%08%02-%80%91%E0%40A%82%0F%60%8A%20%08%60%15%2B%00%0F%5E%60%24X%8B%03%0C%81%00%022h%B90%B0%0A%93%04%03%08h%C0%11%A0%EF%10%25%04%5Dh%E1%3B%E0%07%98%BE%82Q%14%C4%A1%A5H%06%04%07%2C%10%C9%C2%E2%E0%88%24Z%24j%91%B2%A2%A1%C0%08%10.%60%F0Lz%60%40%00%00%3B") no-repeat left center; }
	#bfb_option_container .bfb_help { cursor:pointer; display:inline; float:right; width:16px; height:16px; }
	.bfb_helptext { display:none; z-index:99999; position:absolute; max-width:500px; padding:3px 15px 3px 3px; font-size:13px; -moz-border-radius:5px; border-radius:5px; -moz-border-radius:5px; background-color:white; border:2px solid #880000; -moz-box-shadow:5px 5px 5px #999; -webkit-box-shadow:5px 5px 5px #999; }
	#bfb_button_help input { padding-left:20px; }

	/* Position of Facebook's "close" X */
	.bfb_processed .hideSelector, .bfb_processed .hideButton { margin-top:-10px; }
	.profile .bfb_processed .hideSelector, .bfb_processed .hideButton { margin-top:-6px; }
	.UIRecentActivityStory .hideSelector, .UIRecentActivityStory .hideButton ,
	.uiStreamMinistory .hideSelector, .uiStreamMinistory .hideButton, 
	.UIRecentActivityStory .hideSelector, .UIRecentActivityStory .hideButton
		{ margin-top:-1px; }

	/* Data-loading iframe */
	.bfb_iframe { position:absolute; height:200px; width:200px; z-index:-5000; visibility:hidden; }

	/* Options Display */
	.GM_options_wrapper { display:none; position:fixed; top:10px; left:10px; background-color:transparent; z-index:5000;}
	.GM_options_wrapper_inner { width:950px; background-color:white; border:5px solid #A7B4D1; -moz-border-radius: 15px; -webkit-border-radius: 15px; border-radius: 15px; padding:10px; z-index:5001; font-size:110%; -moz-box-shadow:10px 10px 10px #999; -webkit-box-shadow:10px 10px 10px #999; }
	.GM_options_wrapper h2 { font-size:14px; background-color:#3B5998; color:white; font-weight:bold; font-style:italic; padding:1px 10px; margin:0px; }
	.GM_options_header { background-color:white; color:#3B5998; min-height:55px; }
	.GM_options_header a { color:#3B5998; }
	.GM_options_message { clear:both; background-color:yellow; padding:10px; border:1px solid black; -moz-border-radius: 10px; -webkit-border-radius: 10px; border-radius: 10px; margin:10px; font-weight:bold; font-size:larger; }
	.GM_options_wrapper table.GM_options { border:1px solid #999; border-collapse:collapse; width:100%; }
	.GM_options_wrapper td.label, .GM_options_wrapper td.input, .GM_options_wrapper td.html  { border:1px solid #999; margin:0px; padding:0px; }
	.GM_options_wrapper td.label { padding:0px 5px; }
	.GM_options_buttons { float:right; width:200px; height:50px; vertical-align:middle; text-align:center; }
	.GM_options_buttons input { background-color:#3B5998; color:white; font-size:24px; font-weight:bold; }

	#bfb_option_container input[type=checkbox] { width:12px; height:12px; } 

	#bfb_options_title {
		font-size:18px;
		font-family:arial;
		font-weight:bold;
	}
	#bfb_option_container .option {
		display:none;
		border:1px solid #ccc;
		margin:0;
		padding:3px;
		margin-top:-1px;
		background-color:white;
	}
	#bfb_option_container .option:nth-child(even) { 
		background-color:#F6F6F6; 
	}
	#bfb_option_container .option:hover {
		background-color:#FEE9BE;
	}
	#bfb_option_container div.no_hover:hover {
		background-color:white !important;
	}
	#bfb_option_container div.no_hover:nth-child(even):hover {
		background-color:#F6F6F6 !important; 
	}
	#bfb_option_container .option.tab_popular {
		display:block;
	}
	#bfb_option_container .tab_list {
		float:left;
		width:225px;
		overflow:auto;
	}
	#bfb_option_container .tab_list .bfb_tab_selector {
		font-size:18px;
		padding:5px;
		display:block;
		font-weight:bold;
		font-family:arial;
		cursor:pointer;
		border-bottom:1px solid #ccc;
		border-right: 1px solid #ccc;
		margin-right:0px;
		background-color:#eee;
	}
	#bfb_option_container .tab_list .bfb_tab_search {
		background-color:#eee;
		font-family:arial;
		line-height:28px;
	}
	#bfb_option_container .tab_list .bfb_tab_search input {
		width:150px;
	}
	#bfb_option_container .tab_list .bfb_tab_selector:hover {
		background: #ccc url("data:image/gif,GIF89a%0D%00%09%00%80%01%00%99%99%99%FF%FF%FF!%FE%15Created%20with%20The%20GIMP%00!%F9%04%01%0A%00%01%00%2C%00%00%00%00%0D%00%09%00%00%02%15%84%83%06%C8%DA%C7%82K%F0-z%AD%C6%5B%D6%E9e%E0X%05%05%00%3B") no-repeat right center;
	}
	#bfb_option_container .tab_list .bfb_tab_selected {
		padding-left:20px;
		background: white url("data:image/gif,GIF89a%0D%00%09%00%80%01%00%99%99%99%FF%FF%FF!%FE%15Created%20with%20The%20GIMP%00!%F9%04%01%0A%00%01%00%2C%00%00%00%00%0D%00%09%00%00%02%15%84%83%06%C8%DA%C7%82K%F0-z%AD%C6%5B%D6%E9e%E0X%05%05%00%3B") no-repeat right center;
		border-right:none;
	}
	#bfb_option_container .tab_list .bfb_tab_selected:hover {
		background-color:white;
	}
	#bfb_option_container .content {
		width:700px;
		overflow:auto;
		border:1px solid #ccc;
		padding:10px;
		margin-left:0px;
		border-left:none;
	}
	
/*	
	.bfb_option_body {display:none;}
	.bfb_option_body > div { padding:1px 2px; font-size:12px; border-top:1px solid #ddd; }
	.bfb_option_body > div:hover { background-color:#FEE9BE !important; }
	.bfb_option_body > div.no_hover:hover { background-color:inherit !important; }
	.bfb_option_body > div:nth-child(even) { background-color:#fcfcfc; }
	.bfb_option_body > div > div { margin-left:30px; }
*/
	#bfb_tracelog, #bfb_user_prefs { font-family:courier new; font-size:12px; height:300px;overflow:auto;border:1px solid #ccc;background-color:white; }
	#bfb_user_prefs { width:600px; white-space:pre; }
	select.bfb_disabled { background-color:#eee; color:#ccc; }
	.bfb_options_minimized .bfb_options_minimized_hide { display:none; }
	.bfb_options_minimized { width:auto !important; }
	.bfb_sub_option { margin-left:15px; }
	
	.bfb_featured_option { border:2px solid #3B5998;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;padding:2px;background-color:white;width:90px;text-align:center;float:left;height:150px; margin:5px 3px !important; }
	.bfb_featured_option:hover { border-color:#880000; cursor:pointer; }
	.bfb_featured_option .desc { text-align:left; font-size:11px; border-top:1px solid #333; }
	.bfb_options_simple_mode .bfb_option_advanced { display:none; }

	/* Tabs */
	.bfb_tabs { padding-left:4px; }
	.bfb_tabs > * {line-height:24px;float:left;font-family:arial;background-color:#3B5998;color:#ddd;border:1px solid #EDEFF4;border-bottom-color:#3B5998;-moz-border-radius-topleft:8px;-moz-border-radius-topright:8px;-webkit-border-top-left-radius:8px;-webkit-border-top-right-radius:8px;border-top-left-radius:8px;border-top-right-radius:8px;padding:0px 10px 0px 6px;margin-left:-4px;z-index:1;cursor:pointer;}
	.bfb_tabs > .bfb_tab_selected + * {margin-left:0px;}
	.bfb_tabs > .bfb_tab_selected {display:block !important;position:relative;top:1px;background-color:#f6f6f6;color:#3B5998;border-color:#3B5998;border-bottom:none;border-top:2px solid #3B5998;z-index:2;padding-right:10px;font-weight:bold;}

	/* Feed Tabs */
	#bfb_feed_tabs .bfb_tab { font-size:110%; }
	#bfb_feed_tabs .bfb_tab_selected { background-color:white; }
	.bfb_stream { border-top:1px solid #ccc; clear:both; display:none; }
	.bfb_tab_body_selected { display:block; }
	.bfb_tab_count { margin-left:8px; }
	.bfb_tab_count .new { margin-right:1px; font-weight:bold; }
	.bfb_tab_count .total { margin-left:1px; }
	.bfb_tab_empty { background-color:#ddd; color:#aaa; font-style:italic; border:1px solid #aaa; }
	.bfb_tab .bfb_tab_close { display:none; float:right; position:relative; margin-left:-5px; top:5px; left:9px; cursor:pointer; width:11px; height:11px; background:transparent url("data:image/gif,GIF89a%0B%00%0B%00%91%00%00%00%00%00%FF%FF%FF%9C%9A%9C%FF%FF%FF!%F9%04%01%00%00%03%00%2C%00%00%00%00%0B%00%0B%00%00%02%18%94%8F6%CB%AC%BA%9E%18%87%CA%88%B0%83%16%D7%5E%85%13w5M%82%0A%05%00%3B") no-repeat left center; }
	.bfb_tab_selected .bfb_tab_close { display:block; }
	.bfb_tab .bfb_tab_close:hover { -moz-box-shadow:0 0 4px red; -webkit-box-shadow:0 0 4px red; box-shadow:0 0 4px red; }

	/* Dialog */
	.bfb_dialog { position:fixed; background-color:#FFFDEA; width:600px; top:50px; left:10px; z-index:9999; padding:5px; 
					font-family:arial; font-size:14px; -moz-box-shadow:12px 12px 15px #666; -webkit-box-shadow:5px 5px 5px #999;
					border:4px solid #F4D307; -moz-border-radius:8px; -webkit-border-radius: 8px; border-radius: 8px; }
	.bfb_dialog_header { font-size:16px; font-weight:bold; }
	.bfb_dialog_content { margin:5px 10px 0px 10px; }
	.bfb_dialog_footer { margin:15px 0px; text-align:center; }
	.bfb_dialog_footer .UIButton_better_fb { padding:5px !important; }

	/* Mini "x" icon to close */
	.better_fb_mini_message, .mini_x { background-image:url("data:image/gif,GIF89a%0B%00%0D%00%F7%00%00%9C%9A%9C%FC%FE%FC%00%00%12%00%00%00%60%94%00%23%E9%D0%00%12%FD%00%00%7F)%00%80!%D0%EA%00%FD%12%00%7F%00%00J%04%00%F8%26%15A%83%00~%7C%12%00J%00%00%F8%00%00A%00%00~%00%00%00%02%00%00%00%00%00%00%00%00%00%94%00%03%E9%00%00%12%00%00%00%00%D8%FC%98%E8%05%EA%12%07%12%00%00%00%F9%F6%11%E5%05%01%81%07%00%7C%00%00%00%98%90%00%E9%EA%01%12%7D%00%00%00VJ%AC%00%F8%EA%00A%12%00~%00%E0%00%BE%E7%00c%12%00E%00%00~n%00%00%00%00%00%00%00%0C%00%00%00%00%B0%00%E9%E9%00%12%12%00%00%00%00%20%00%98%E9%00%EA%90%00%12%7C%00%00%60%00%FC%00%D0%84%91%FDA%7C%7F~%FF%C4%A4%FF%E9%85%FF%12A%FF%00~%5D%BE%0E%00c%06%91E%09%7C~%00%95%00%01%E7%00%00%81%0C%00%7C%00%00%00%00%87%00%00%F7%15%00A%00%00~%60%B0%3B%03%E9%04%00%12%D4%00%00%00%10%1AX%BE%7C%D6%1A%80A%00%18~8%00%E4_%00%EA%15%00%12%00%00%00%00%FC%87%00%05%C4%00%07A%00%00~~%00%93%00%00%C4%00%00A%C0%03~%00%11%87%00%01%F7%00%00A%00%00~%FF%F6%3B%FF%05%04%FF%07%D4%FF%00%00%FF%ECX%FF%E9%D6%FF%12A%FF%00~%00%0C%01%00%B5%00%00A%00%00~%00%00%90%BC%00%EA%EA%00%7D%12%00%00%00%00%11%00%00%01%00%15%00%00%00%00%00%A8%00p%FD%00%9E%00%00%80%00%03%7C%10%1C%00%E9%B5%00%12A%00%00~%00%AF%00%00%EB%00%00%81%00%00%7C%00%00Z%00%07%E3%00%00%81%00%00%7C%00%00%40%00%00%B9%00%00P%00%00%00%00%008%00%00_%00%40%01%00%15%00%00%00lD%00%00%EA%00%00%12%00%00%00%00L%A8%00%E8%FD%00%12%00%00%00%00%004(%00%00%EA%00%00%12%00%C0%00%00%AC%CD%00%FB%2B%00%12%83%00%00%7C%00%20%00x%E9%00%9E%90%00%80%7C%00%7C%60%00%FF%00%00%FF%91%00%FF%7C%00%FF%FF%00p%FF%00%9E%FF%00%80%FF%00%7C%5D%00%3D%00%01%00%91%00%00%7C%00%00Z1%3D%F4%2C%00%80%83%00%7C%7C%00%00L%FC%00%EA%F0%15%12%12%00%00%00%00%0C%FF%00%2C%FF%00%83%FF%00%7C%FF8%00%00_%00%00%15%00%00%00%00%00%00%18T%01%00%EB%00%00%12%00%00%00%00%7CF%00d%83%00%83L%00%7C%00g%004%F4%00%EB%80%00%12%7C%00%008Pw%EA%EBP%12%12O%00%00%008%B5h_d%EB%15%83%12%00%7C%00%00%D4%7C%00ld%0CO%83%00%00%7C%00%E0%25%00w%ED%00O%12%00%00%00%B0%00%C1%E9%01%FF%12%00%FF%00%00%7F%7CL%E8%E9%EA%EC%12%12%12%00%00%00%86%00%00%7D%01%00%80%00%00%18%00%00%CB%D0%7C%00dd%05%83%83%00%7C%7C%00%01%00%00%00%00%00%00%00%00%00%00%00%00%A8%00%00%FD%00%00%00%00%00%00%B0%00p%E9%00H%12%00%15%00%00%00%00%00%01%D0%00-%FD%00H%7F%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0B%00%0D%00%07%08)%00%03%08%1CH%B0%A0%C1%83%07%01%00%18%A8%90%A0%C2%85%0F%0B%3Elh0b%C5%89%12%1BZ%14H1%40G%84%20C%16%0C%08%00%3B"); }
	.better_fb_mini_message:hover, .mini_x:hover { background-image:url("data:image/gif,GIF89a%0B%00%0D%00%F7%00%00%3CZ%9C%FC%FE%FC%00%00%12%00%00%00%60%94%00%23%E9%D0%00%12%FD%00%00%7F!%00%80!%D0%EA%00%FD%12%00%7F%00%00J%04%00%F8%26%15A%83%00~%7C%12%00J%00%00%F8%00%00A%00%00~%00%00%00%02%00%00%00%00%00%00%00%00%00%94%00%03%E9%00%00%12%00%00%00%00%D8%DE%98%E8%06%EA%12%0F%12%00%00%00%F9%A2%11%E5%07%01%81%18%00%7C%00%00%00%98%B8%00%E9%DF%01%12%81%00%00%00VJ%AC%00%F8%EA%00A%12%00~%00%E0%00%BE%E7%00c%12%00E%00%00~n%00%00%00%00%00%00%00%0C%00%00%00%00%B0%00%E9%E9%00%12%12%00%00%00%00%20%00%98%E9%00%EA%90%00%12%7C%00%00%60%00%FC%00%D0%84%91%FDA%7C%7F~%FF%C4%A4%FF%E9%85%FF%12A%FF%00~%5D%BE%AE%00c%07%91E%0E%7C~%00%95%00%01%E7%00%00%81%0C%00%7C%00%00%00%00%87%00%00%F7%15%00A%00%00~%60%B0%0F%03%E9%08%00%12%24%00%00%00%40%1AX2%7C%D6!%80A%00%18~8%00%E4_%00%EA%15%00%12%00%00%00%00%DE%87%00%06%C4%00%0FA%00%00~~%00%93%00%00%C4%00%00A%C0%03~%00%11%87%00%01%F7%00%00A%00%00~%FF%A2%0F%FF%07%08%FF%18%24%FF%00%00%FF%ECX%FF%E9%D6%FF%12A%FF%00~%00%0C%01%00%B5%00%00A%00%00~%00%00%B8%BC%00%DF%EA%00%81%12%00%00%00%00%11%00%00%01%00%15%00%00%00%00%00%24%00p%7D%00%9E%00%00%80%00%03%7C%10%1C%00%E9%B5%00%12A%00%00~%00%AF%00%00%EB%00%00%81%00%00%7C%00%00Z%00%07%E3%00%00%81%00%00%7C%00%00%40%00%00%B9%00%00P%00%00%00%00%008%00%00_%00%40%01%00%15%00%00%00lD%00%00%EA%00%00%12%00%00%00%00L%24%00%E8%7D%00%12%00%00%00%00%004(%00%00%EA%00%00%12%00%C0%00%00%AC%CD%00%FB%2B%00%12%83%00%00%7C%00%20%00x%E9%00%9E%90%00%80%7C%00%7C%60%00%FF%00%00%FF%91%00%FF%7C%00%FF%FF%00p%FF%00%9E%FF%00%80%FF%00%7C%5D%00%3B%00%01%00%91%00%00%7C%00%00Z1%3B%F4%2C%00%80%83%00%7C%7C%00%00L%FC%00%EA%F0%15%12%12%00%00%00%00%0C%FF%00%2C%FF%00%83%FF%00%7C%FF8%00%00_%00%00%15%00%00%00%00%00%00%18T%01%00%EB%00%00%12%00%00%00%00%7CF%00d%83%00%83L%00%7C%00g%004%F4%00%EB%80%00%12%7C%00%008Pw%EA%EBP%12%12O%00%00%008%B5h_d%EB%15%83%12%00%7C%00%00%D4%7C%00ld%0CO%83%00%00%7C%00%E0%23%00w%ED%00O%12%00%00%00%B0%00%C3%E9%01%FF%12%00%FF%00%00%7F%7CL%E8%E9%EA%EC%12%12%12%00%00%00%86%00%00%7D%01%00%80%00%00%18%00%00%D9%D0%7C%00dd%06%83%83%00%7C%7C%00%01%00%00%00%00%00%00%00%00%00%00%00%00%24%00%00%7D%00%00%00%00%00%00%B0%00p%E9%00H%12%00%15%00%00%00%00%00%01%D0%00-%FD%00H%7F%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0B%00%0D%00%07%08)%00%01%08%1CH%B0%A0%C1%83%07%03%04%18%A8%90%A0%C2%85%0F%0B%3Elh0b%C5%89%12%1BZ%14H%11%40G%84%20C%16%0C%08%00%3B"); }
	.better_fb_mini_message, .mini_x {  background-repeat:no-repeat; background-position:top right; cursor:pointer; }

	/* Messages, Tips */
	.better_fb_mini_message { padding:1px 10px 1px 1px; background-color:#FFFDEA; font-family:arial; font-size:10px;font-weight:bold; margin:1px; border:2px solid #F4D307; -moz-border-radius:3px; -webkit-border-radius: 3px; border-radius: 3px; }
	.better_fb_message { clear:both; background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%23%00%00%00%23%08%02%00%00%00%91%BB%24%0E%00%00%00%06tRNS%00%00%00%00%00%00n%A6%07%91%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%06.IDATx%DA%E5%97%5Dl%DB%D6%15%C7%FF%A4%24J%B2d%C9%96%AA%C5%8A%12%3B%8E%5D%E7s%C1%92eu%8B%A4S%8B%C6Y%DD%06%CD%87%8B%3C%04%5B%83%3E5%D8V%EC%E3%A1%F0C%91%01%1D0l%E8%B0%97%14%E9%8A%AC%40%1E%16%17k%96%B5%CD%86%B9M%D6%C0%CE%9C%CD%AE%5D'UmGql%CB%B2%ADY%1F%96%25J%A4H%5E%92%F7%EEAN%90%D5%5Em%A7%C1%5E%F6%7F%22.%0F%CF%8F%FF%83s%EF!%81%FF%95%B8%95%87%8E%0Fv%C5%23%03%F3%B3%09R%92%84%0A%B7%CB%5B%B9%A6~%7B%C3%EE%C7%BD%81%E0%83!%A9R%F1%FAG%E7%BA%3B%CE%24%A2%11%00N%B7%DDQa'%84W%8A%25j%12O%20%B4%F3%3B%87%F7%1E%FBAM%5D%E3W%22M%0D%F5w%FC%ECD%22%1A%F1%04B%E1%A3%5B%EAv%B4%F8BM%8E%0A%AF%AE%5Bsi-%1D%8B%96%DF%C0%13%08%1Dx%B9%FD%B1%B6%13%F7Y%D9%A1%AE%3F%B7%EF%09%BC%D2%EC%EE%3C%7DRM%7F%C8%A8%C8%BE%20*S%7D%F8%9F%17~%FB%FAa%DF%8Fv%B8%3AO%9F%BC%1F%CCd%A4%B7%7DO%E0%E4%93%FE%5B%3D%BF%A1%FA03%A6%18%15%19%95%17%C1DF%C5%5C%E2%FC%A9%176%BC%BC%CDv%E5%EC%AFW%87Q%A5%E2%2F%DB%BE%F9J%B3%FBVw%3BcW%A8%DA%C7%CC4%A32c%84-!%C2%A8H%E6%DEx%FD%B0%AF%7DO%602%D2%BBdN~%C9%D5%7F%FC%F1%ADD4%B2%EF%F8%E3%0F7%D71%0D%9C%B5%DC%5D%06%00%40%FFb4%D3%01%D8%7C%DF%7B%FE%C7%B5J%B1%F4%D73%BFX)I%16%E7%BB%3B%DE%AEm%AA%7Cl_%08%E6%3A%C0%C5%18%01S%EF%26%BD%03%BB%07%C94%00u%CD%2F%3D%F247%DA%D35%3E%D8%B5%22R%EC%FA51%93%D8%FC%A8%C7%B5%A6%1A%00%A0%01%1Ac%04L%03%8CE%B0%3B%3C*r%F6M%FB%9F%A9d%A6y%FD%A3%0F%16%A7%B5.%5E%9A%1E%E9%07%B0%F9%EB%B5%8CV%82%8A%1C%00%D8a%C1%82-%0E%60%E5%0Db%BB%E3%D2(%DFb%1A%7C%5B%D6z%FDdl%E0%EA%8A%3C%E5fg%3DU%B6%AAj%C1%24%C4%D4%F2%8C%8A%80%0C%AA-%D4%B0%EC%0C%06%98%B2%E0%8F%8A%8C%11%C6%8A0e%00k%B7%98J%B1%24ff%97%F7%94%CF%A7%EET_%E4%E1%06%AA%60%CA%B0XA%C1x%CF%7Fnu%0D%00c%C4%24%BC%C5%22%19J%DC%02T%BA%8DIyN)%C9%CB%93%9C%82%BB%7CA%F23B%B5%97%D7f%60%07%07%C0%02P0%DE%0EF8N%00%E7%00g%07%E7%A4%B4%1A%98%26%85%9C%60%8FC%89%14%25%97%C5%E6rV%B8%96%AF%5E%E5Ck%D4%92%96%CF%11%00T%8DQSZ%A8%A1)%82%E5aJ%00%C0%FB%C1%07%00%2Bh%9E%91iUJ%F0%FC%18S%AFh%12W%9C%E5%2B%FD~%AB%60_%DES%A8i%93%A6%B0%B9X%3A%B8%D1o(%25%2Bb%BC%03L%93%60%07g%0Dq%B6%06%00%A0Yf%0C%C1LS%26%98%25%86%92%88%8A%24G%22b%9E%CF%A6-%B5%BBB.%AFoyR%FD%EE%7D%CE%CA%8A%81%3E%B5qW%D1%EAp%00%25%A6%25y%A1%CE%EE%080%3D%C3%1B%09F%C5%BB%C1T%CB%EBr%80%EA%19*%9D%85%80%DB%83%D5J%B1%B8%F3%89gp%EA%E2%F2%D5%AB%A9k%DC%F4h%CB%F8%E7%F3c%833%86%AA%EA%8An%C8I%AD%A0%15%26%FE%AE%CD%7DbH%7D0%26%60L%98%A5%A8)%F7%E9R%8E%EA%19*%7F%C8HZ%93%B8%1B%7D%8E%AA%9A%DA%AD%DF%3E%B8%A2%FD%04%E0%A9%17%7Fr%B3%E7b%CF%DF%D2%EBjy%C1%E9%B4%BA(%EF%00%91*L%E5!%00%8Ejb%B3%2B%0B%9E%88%22O%8D%D8%5D%098%F0%AF%09%F7%F4%AD%B9-%7B%9F%5Br6.%7D%EE%D5n%FF%D6%93%C7%7F%3A3%AE%BD%7F%BED%14E%2F%E8%24%3Bk%B5%DE%06%1D%D5%8B%B9%E2%94%AC%CC%8B%864D%B2%97%D5%EC%A4%C5n%02%D0%95*1c'%84%AFih%5C%C5%09%0B%A0%F5%FB%AF5%1F%3C6%FAi%E2%FD%F3%A5B%862%BD%A8%CE%17uq%9Ci%FDR%F2%B3%B9%1BS%E9%D1%92V%B0%94%83%0D%A9%A4%15%2C%B2%CC%98i%DA%2B%3C%AB%23%018%F6%F33%E1%EF%FEp%ECF%E6%F7o%A7%AEu%99rN%E0%99%0D%80%D5%A53%9BA%92%AE%DCL55%7C%00%88j1%95J%2B%AA%BE%24%9B%E5%CB%07%D5%BB%1F%F7%BEy%F6%DC%D4%CD%E1%E1%BE%C9%A1%88nR%A1%AE%C1i%B5p%16%81%A3%84S%E7%AC%BCi%DA%BC.%0BW%D4%09-%88l%F8%86l%04%B7uv%F5%AC%B4%23%EE%D5%AE%D6%A3%00%06%3B%DF%BD%F4%BB_%5D%ED%8C%025%7B%5B%AA%04%1B%84%F50U%B3%98%CC%DB%D7%04e%E2%8A%8Ed%13%F1%FC%07b%20%3C%99%5E2%8Fu%85SxW%EBQ13%7B%EE%B5%97%AEv~%2C%F8%CCmM%B6%E1Q%3D%11%CF%EF%0D%85%B4%D4lLtM%CF%ECp%EC%3E%B4%7D%EABwww2%3E%B6%F8S%C9%BA%F2%91%EF%0D%04%C5%CC%EC%9B'%0E%5C%BB8%F5%07w%AE%BC%A8K%F2%E4%CD%60%D6%16%DC%DF%D2r%E8%E0s%C9Tjh%24z%E1%2F%97%EE%DF%D3%5DXG%C7%3Bo%BD%FA%EA%F6%AD%8Fl%DA%BC%15%40%CA%E9%0AVy%B7U%7BUU%B95z%7BC%DD%06%00%FD%03%03%AB%EB%BD%25%F5l%CB%13%A1u%EBs%85%85%A1%A0*r%3E%2F%26S%A9d*%95H%24%3C%1E%CF%7F%7Bp%D5%24o%20%D8%D8%B0113%0D%C0%E7%F7%F9%FC%BE%60%CD%D7%BC%1E%AF%208%E2%F1xo_%3F%80%A6%A6%87%1F%00%09%C0%FE%96%16%00%BD%9F%F4%CFg%E7%E7%B3%F3%B1X%2C%16%8B%01p%3A%1D%9F%5D%EF%07%D0%FAt%EB%83!%B5%1D9%14%0E%87%133%D3s%D9%AC%CF%EF%AB%09%AE%AD%AF%AF'D%7D%EFO%17%86F%A2mG%8E%EC%DC%F9%8D%AF%F4%AFq%AF%E6%B2%D9%17%8F%BF04%12%05%10Z%B7%BE%5CL%00%E1p%F8%F4%1B%A7*%5C%AE%07F*%AB%A3%E3%9DK%97%2F%8F%8DO%00hl%D8%F8%7C%5B%DB%81%03%CF%E2%FFH%FF%06%DB%01b%5BR%10nj%00%00%00%00IEND%AEB%60%82"); min-height:40px; background-repeat:no-repeat; background-position:-4px 0px; background-color:#FFFDEA; padding:2px; font-family:arial; font-size:12px; margin:2px; border:2px solid #F4D307; -moz-border-radius:8px; -webkit-border-radius: 8px; border-radius: 8px; }
	.better_fb_message a { text-decoration:underline; }
	.better_fb_bulb_spacer { float:left; width:32px; height:30px; }
	.better_fb_close { background-color:#3B5998; color:white; border:3px solid white; border-color:#ddd #999 #999 #ddd; text-align:center; -moz-border-radius:10px; -webkit-border-radius:10px; border-radius:10px; font-size:16px; cursor:pointer; margin:5px 10px; padding:5px 20px; }
	.better_fb_close:hover { background-color:white; color:#3B5998; }
	.bfb_close_wrap { clear:both; text-align:center; line-height:32px; }
	.bfb_update { background:none repeat scroll 0 0 #FFF8CC; border-bottom:1px solid #FFE222; color:#000000; padding:0 0 1px; font-size:11px; margin:1px 0px 10px 5px; }
	.bfb_h4 { margin-top:7px;}

	/* "Sticky" note */
	.bfb_sticky_note {
	  position:absolute;
	  min-height:14px;
	  min-width:100px;
	  right:100%;
	  margin-right:8px;
	  top:50%;
	  font-family:arial;
	  background-color:#ffa;
	  color:black;
	  border:1px solid #666666;
	  font-size:12px;
	  padding:3px;
	  text-align:center;
	  border-radius:6px;-moz-border-radius:6px;-webkit-border-radius:6px;
	  box-shadow:0 0 5px #888888;-moz-box-shadow:0 0 5px #888888;-webkit-box-shadow:0 0 5px #888888;
	  z-index:999999;
	}
	.bfb_sticky_note_right {left:100%;right:auto;margin-left:8px;margin-right:auto;}

	.bfb_sticky_note_arrow_border {
	  border-color: transparent transparent transparent #666666;
	  border-style: solid;
	  border-width: 7px;
	  height:0; width:0;
	  position:absolute;
	  margin-top:-7px;
	  top:50%;
	  right:-15px;
	}
	.bfb_sticky_note_right .bfb_sticky_note_arrow_border {border-color: transparent #666666 transparent transparent;top:50%;right:auto;left:-15px;}

	.bfb_sticky_note_arrow {
	  border-color: transparent transparent transparent #ffa;
	  border-style: solid;
	  border-width: 7px;
	  height:0; width:0;
	  position:absolute;
	  top:50%;
	  right:-13px;
	  margin-top:-7px;
	}
	.bfb_sticky_note_right .bfb_sticky_note_arrow {border-color: transparent #ffa transparent transparent;top:50%;right:auto;left:-13px;}

	.bfb_sticky_note_close {
		float:left;
		width:9px;
		height:9px;
		background-repeat:no-repeat; 
		background-position:center center; 
		cursor:pointer;
		background-image:url("data:image/gif,GIF89a%07%00%07%00%91%00%00%00%00%00%FF%FF%FF%9C%9A%9C%FF%FF%FF!%F9%04%01%00%00%03%00%2C%00%00%00%00%07%00%07%00%00%02%0C%94%86%A6%B3j%C8%5Er%F1%B83%0B%00%3B");
		border:1px solid transparent;
	}
	.bfb_sticky_note_right .bfb_sticky_note_close {float:right;}
	div.bfb_sticky_note_close:hover {
		background-image:url("data:image/gif,GIF89a%07%00%07%00%91%00%00%00%00%00%FF%FF%FF%FF%FF%FF%00%00%00!%F9%04%01%00%00%02%00%2C%00%00%00%00%07%00%07%00%00%02%0C%04%84%A6%B2j%C8%5Er%F1%B83%0B%00%3B");
		border:1px solid black;
	}
	
	#bfb_quickmessages { position:fixed; top:0px; right:0px; width:400px; z-index:99999; }
	.bfb_quickmessage { background-color:#FFF1A8; color:black; border:1px solid #ccc; padding:5px; font-size:13px; -moz-border-radius:4px; -webkit-border-radius:4px; border-radius:4px; }

	/* Character counter */
	.bfb_char_count { width:30px;height:12px;font-size:10px;background-color:#ccc;color:#000;float:right; margin-top:-8px;margin-right:-5px; text-align:center; }
	.bfb_char_count_warning { color:red; font-weight:bold; }
	.mentionsTextarea + .bfb_char_count { margin-top:-12px; position:relative; top:5px; }

	/* Pagelet styles */
	.pagelet_title { float:left; margin-right:5px; }
	.better_facebook_sidebar_section { width:244px !important; }
	.better_facebook_sidebar_section .mbm { margin-bottom:0px; }

	.uiSideNav .item.noimg { padding-left: 0px !important; }
	.uiHeaderNav { margin-top:2px !important; padding-top:2px !important;}
	.uiHeaderNav h4 { padding-bottom:2px !important; }
	ul.bfb_uiSideNav { border:1px solid #ccc; margin:6px 0px; padding:1px 0px; clear:both; }
	ul.bfb_uiSideNav li { width:auto; white-space:nowrap; }
	.bfb_network { padding: 1px 0px 1px 2px !important; left:0px !important; cursor:pointer; }
	.bfb_network .bfb_network_users a { font-weight:bold; padding-left:10px; }
	.bfb_network .bfb_network_users { background-color:#F7F7F7; }
	.bfb_friend_activity_img { float:left; margin-right:5px; clear:both; }

	.bfb_clear { clear:both; }
	.bfb_alt { background-color:#eee; }
	.bfb_sidebar_header_link { margin-left:6px; }
	.bfb_sidebar_close { border:1px solid transparent; padding:0px 2px; }
	.bfb_sidebar_close:hover { border:1px solid #627AAD; }

	#pagelet_better_fb_stickynote_pagelet { background-color:#FDFCC3; font-family:comic sans ms; font-size:12px; margin-bottom:10px; }
	#pagelet_better_fb_stickynote_pagelet .uiSideHeader { margin-bottom:2px; background-color:transparent; }
	#pagelet_better_fb_stickynote_pagelet .mbl { margin-bottom:0px; }

	/* Collapsable right pagelets */
	#rightCol .bfb_pagelet_closed * { margin-bottom:0; padding-bottom:0; margin-top:0; }
	#rightCol .bfb_pagelet_closed .phs { display:none; }
	#rightCol .bfb_sidebar_header_expand { font-size:10px; color:#aaa; cursor:pointer; }
	#rightCol .bfb_pagelet_closed .bfb_sidebar_header_expand { display:inline !important; }

	#rightCol .bfb_pagelet_closed .uiHeader { border-bottom: 1px solid #CCCCCC; margin-bottom:2px; }
	#rightCol .bfb_pagelet_closed .uiHeader .uiHeaderActions { display:none; }
	#rightCol .uiHeaderTitle { cursor:pointer; }
	#rightCol .bfb_pagelet_closed h4, #rightCol .bfb_pagelet_closed h3 { color:#ccc; }
	#rightCol .bfb_pagelet_closed.jewelFlyout > ul, #rightCol .bfb_pagelet_closed.jewelFlyout > .jewelFooter { display:none; }

	/* Notifications */
	
	.bfb_notif_preview { max-height:500px; max-width:500px; overflow:auto; position:absolute; z-index:9999; border:1px solid black; padding:2px; background-color:white; -moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; -moz-box-shadow:5px 5px 5px #999; -webkit-box-shadow:5px 5px 5px #999; }
	.bfb_notif_preview .uiUfiAddComment { display:none; }
	.bfb_notif_preview .hideButton { display:none; }
	.bfb_notif_preview_message { color:#aaa; background-color:#ffffe1; font-size:10px; padding:1px; }

	/* Debug */
	div.bfb_debug{ display:none; border:1px solid #ccc; background-color:#eee;color:#999; text-align:left; padding:3px 0px 3px 20px; clear:both; overflow:auto; max-height:250px; background-image: url("data:image/gif,GIF89a%10%00%10%00%E6%7F%00%B7%8A%2BrV%1A666%9B%9B%9B%B1%86)%F5%BCB%D6%A33%CE%9D1qqq7)%0C%FF%C6%3F)%1E%09%FD%C0%3C%F5%BA%3A%DC%B2V%03%03%02%1C%1C%1C%1C%15%07%09%09%09III%0E%0E%0D%11%11%11%12%0E%032%26%0B%FF%C2%3C%FC%BF%3C%FF%C3%3D%FF%C4%3D%F9%BD%3A%FF%C2%3D%FB%BE%3B%FC%BF%3BWWW%E5%E5%E5%F1%B79%86%86%86%FA%FA%FA%95%95%95%FF%CDR%FB%BF%3C*'%20%FF%C1%3BG%3E(%FF%C6A%E4%E4%E4%9Dw%24OOO%E2%AB4%FF%D2c%F8%C2O%CF%AAY%E9%B17%FB%BF%3B%F2%B89%17%17%17%60%60%60%B8%97O%FF%C8%40%FF%C9C%F8%BC%3AK%3D%1E%F3%C1X%84n%3F%FB%BE%3A%B7%B7%B7%C7%A1MJJJ%AB%8FRhhhbJ%16%E9%B6F%A5%A5%A5%FA%C8%5B%CC%9B%2F%93w8%E1%E1%E1%B3%8B4%B1%B1%B1%7B%5D%1C%80f-%A8%A8%A8%FA%C3E%8Dk!%2C!%0A6*%10%06%07%0A%0A%08%02%FE%C2%3C%AE%AE%AE%BC%8E%2C%D5%A6C%FF%C6%3D%FF%C3%3F%C6%96%2F%3B%3B%3B%EF%B58%DF%DF%DFggg%BE%99J%E7%AE6yb4%FF%CBA%98%98%98%C1%93-%7B%7B%7B%FF%C3961(%AA%83%2F%AE%85%2C%82k%3A5%2F%24%FA%BE%3B%FB%BE9%B5%B5%B5%FD%BF9222%DC%ABA%FE%C1%3C%CF%9E1%FF%C4BC%3A%24%22%22%22%96%96%96%17%16%11%A3%7C'%F9%BD%3B%00%00%00%FF%FF%FF!%F9%04%01%00%00%7F%00%2C%00%00%00%00%10%00%10%00%00%07%DE%80%7F%82%83s%14%15%5E%83%89%83%23~U*%3C%0F~%8A%89~n81%05%04%09~%03%93~j%0E90%26%5B%07%9B%8A%126AiHCk%0D%18g%16%10%83D%0F%3E%2BW%0E%0F%0F%5D%1A%0CR~%08%82%14(Fr%5C2~~%00%1A'%22%09%15%82~m%0A%1C%1D%BB%0F%07%1Do%18-%0F%7Fy%7BZ)%7D4%05T%0B_%19%7D%193%0B%02%12xQ%3F%7D%1CwbL%0C%7D%FC%0A%01%12%12%C8%E8%E0%D0%07N%0F%25ljx%E0%A7%81%00%05%09O%CA%2C%C4%40%C7O%02%11%EC%18%7C%00%B0G%C2%02%03%1F6l%D8%C1'K%86%3A%1D%1A%18%08%F0%00%81%1F%0BE%F8%24y%81a%C3%18%3B%04%9C%5Cx%00BP%BC%97%11%A6%5CX%10%C1%8A%1FZ%8A%D0%FCq1a%C2%1F%10a%12%05%02%00%3B"); background-repeat:no-repeat; background-position:left top; }
	div.bfb_debug pre { font-size:9px; }
	div.debug_small { display:none; border:1px solid #ccc; clear:both; background-color:#eee !important; }
	div.debug_small, div.debug_small * { color:#ccc !important; text-align:left; padding:0px; }
	.debug_window { position:absolute; top:45px; left:1px; border:1px solid black; width:350px; max-height:800px; overflow:auto; padding:3px; }
	body.debug .bfb_debug, body.debug .debug_small, .post_debug .bfb_debug { display:block !important; }
	body.debug .bfb_duplicate { display:block; background-color:yellow; }

	/* RPC */
	.bfb_rpc_iframe { position:absolute; visibility:hidden; top:-500px; left:-500px; width:250px; height:200px; }

	/* Trace, Debug */
	#better_fb_debug_console { max-height:500px; overflow:auto; max-width:450px; }
	#bfb_status { font-size:9px; font-family:arial; color:#999; vertical-align:bottom; }
	#bfb_status_older_posts_cb { margin:0px;padding:0px;height:13px;width:13px;margin-right:2px;position:relative;top:2px;}
	#bfb_status_filters_cb { margin:0px;padding:0px;height:13px;width:13px;margin-right:2px;position:relative;top:2px;}
	#bfb_status .bfb_status_separator { padding:0 2px; font-weight:bold; color:#696969; }
	#bfb_trace_window { position:fixed; top:5px; left:5px; border:4px solid #627AAD; background-color:white; padding:3px; z-index:1000; -moz-border-radius:10px; -webkit-border-radius:10px; border-radius:10px; -moz-box-shadow:5px 5px 5px #ccc; -webkit-box-shadow:5px 5px 5px #ccc;}
	#bfb_trace_window tr:nth-child(even) { background-color:#eeeeee; }
	#bfb_trace_window_body { max-height:300px; white-space:nowrap; overflow:auto; }
	#bfb_trace_window_call_stack { border:1px solid #ccc; white-space:nowrap; overflow:auto; font-family:courier new; }
	#bfb_trace_window .bfb_trace_inserted { color:#67A54B; }
	#bfb_trace_window .bfb_trace_message { color:#922500; }
	#bfb_trace_window_header { background-color:#627AAD; color:white; font-weight:bold; }

	/* Themes */
	.bfb_theme_extra_div { display:none; }

	/* Update styles */
	#pagelet_bfb_update_pagelet .phs { padding:0 !important; }
	#bfb_update_pagelet { padding:5px; background-color:#FDFCC3; border: 1px solid #aaa !important; margin:0; -moz-border-radius:15px !important; }

	#install_button { float:right; background:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%01%08%00%00%01%05%08%03%00%00%00(%B6%89%13%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%C0PLTE%CF%EF%A5%AD%DAc%F5%FB%FE%7F%C3*%B2%E0x%86%C66%C8%EB%9A%F1%F9%FD%A0%D5S%AC%E2Y%C2%E8%91%8F%CB0%FD%FE%FF%96%CEF%EE%F9%FD%F9%FD%FF%E0%F6%C1%D5%F4%B0%DD%F5%BB%D8%DC%DF%E8%F8%D1%B0%DDm%B7%E2%84%2CB%20%A5%D8%5B%9C%D2%5C%96%CFS%AB%DBr%8E%CAC%F4%F4%F4%D5%F0%AF%A4%D7h%B8%C4%AA%BD%E5%8A%DA%F2%B6%ED%ED%ED%E7%F3%D9%F5%F8%F4%A0%A9%96%C8%DC%B0%ED%F8%FDe%7B%86%DC%EF%C6%C8%CB%CB%F8%F8%F8%F0%FA%E6%F9%FE%F3%BA%E3%7F%8E%B7W%FC%FC%FC%FD%FD%FC%E5%E8%E9%A9%C2%CC%F9%FC%F2%D2%40%1E%B7%E7n%B1%CE%88%E4%F7%CA%EB%CF%BB%9D%C0i%EA%F2%F5%81%B0E%E4%E4%E4%FF%FF%FFp%DA1%B2%00%00%00%01bKGD%00%88%05%1DH%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%04%04%1181%D8%A2%A3V%00%00%05%D5IDATx%DA%ED%91%EDj%E3%3A%10%86%C7%10L%E8R(%E1h%D9_%82%E8%06%FC%BB%F7%7Fc'%965%D2H%B2%1D%A7%C9na%F7y%95%DA%D2%7C%BC%1A%3F%95%0B%8A%12%10%24%10%E1%A6KZ%FA%AA%B7f5%D96%9FSk%05%C6T%C3%7D%B26%EF%9CKg%E5%12%FA%0Br%BE%F5j%AE%CE%B1%08bC%97%F0%0FI%82o%22%FE%ABV%FE%C1~%7F%A4%DC%7Fq%2C%FFh%F8%06%A2%D1-%1A%9FU%C8%A6%DA%B2%A0%E1%DC%17%9A%AE*%AC%B1%D0%DD%5B%E2%DDP%F3%259%1C%F4%CA%10V%3A%C2%FA%D7%84v%AC%E4%A9g%F1%CF%E8%B9%EEWJ%5Ee%20qw%7B%CE%9Aw11%3F%F3I%C44%89m%AD*%B4Lrs2%F7%D9QRR%EA%F1%AB%DB%7C%E3%95w%C9%D3L%9DG%90%7C%81%2C%97.%8E%E2%CD%24%3A%BE%E4~%BDNj%25%97dd7%A2%B5%B6I%BD%D2g%EB%18%B6(gu'u%A2z%B6%03ys%AB%3E%7D%1D%DA%9E%DE%DAZ%7F%D3%EEm%00%CD%1A%C7Qn%2B%FE%E6%C3%18%03c%3C%DD%96%2C%AFX%B4%FC%96t%8A%8E%A92%7Bh%26-mVw%D1%F6%14%C9%96%22%A6z%CC%C6%92%1A%D2%24y%90%D1%D8%D8%EE%25%249%A2S%A6%B3%994%7D%7B%BE%A6%D8%17%89%19e%1C%CD%17VU%99E%DD%3A%B6'sCU-%05%FCX%FE%0F%E6%12%0Bn%5C%BF%C3%20%C93V%26b%7Dd%7D%CE%FE%2B6%EF%5B%3D%7FM%BF%D7%E5%89%99_3%D8_%20y%DB%D2%F8%F6%A0%1Enx%DCc%FCJ%F6%D8%5C%19%C4%F5%E9%8F%B8%BE%00%C4%1D%93%EBn%E2%FA%CC%5CrEQ%BB%20~~%C3%40%3F%BF%0B%C4%84%A2%00%A1%20N%A7%D3%14%7FY%93%BE%A6*0%9D%EA%B2%FAPNux-%F0%88%3A%DB%A9NM%07%1C%A6%23%A3%C8%91i%DC%5E%C6U5%CE%94%BB%B4k%DA%9D%B3%BE%D6!%EF%DD%EA%08n%7D%AA%BE%C5%ADM%EE%F6%3FE%1C%8A%02%84%82%18%A2%5C%FA%BB%3D%97%97%06%87r%AC%F7%A6%CB%99Di_%92m%CB%A6%99%BB%9Fvnm%A8%E1%E8%0D%C3n%A7%0Ch%01%F1%AB%D5%10%FF%86%F8%5E%1E%25~%7B%0Em%F5%60BC%E7%D4%05%AB%C0%D0%DD%B0%EE%D5Y%FCZ%2F%1D%EA%7D%DF2l%5E%25%BFP%14%20%14%C4%19E%01BA%BC%BF%9F%DF%DF%E3%A3%BC%CF%D5Y%F7e%7Bn%EB%B4%DA%D6%9A%0A%8DU7%95%E7%D9%B4u%96%E7%EE%D7%C4%FB%CAz%16%EB%DB%B4%9B)%DF%E5%1DE%01%02%10%80%D8%00%F1%C3%AC%EA%F0o-%F9%81%A2%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%08%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%81%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%88o%07%F1%F9%1Fk%5E%F2%89%A2%00%01%08%40l%81%F8%88K%DF%F5%DE%04V%E3%E6g%83%1FU%BE_%9B%C9~%FBi%2F%5E%B9%B9%19%AC%9Bf%C5%3D7%D8%94%7C%A0(%40(%88%0B%8AZ%03%11%9E1%0C%7F%A8%E7%E5%20%82%D1%A5y%DF%D1e%F7%A8%C1%CBC%26wK.%87%8B.%0F%5D%25%AB%05GH%F8%F0%15%5D%EEe%0F%FD%13%FC%8B%A6%BAX%10%3Ex%EFCz%CDk%D9x%B5%8D%81e%E7u%9F%96%CF'%D3%1DB%F0uU%A9%0B%C9%25_%94%7C%B5%B0%B2N%1D%3E%DF%5Br%3A%956%87%3C%AD%B6%E4%A1%F2%5Bg%F4%EA%91~%C9%40%CA%0D%CBuY%CD%3E%CD%96%8E%A62%D8%CAP%22%C1%EC%82%19%A7%B9%A6%EE%2F%16%F5%00MM%5B%1D%B6%EA4%1D%F6%BE*J%3C%CA%20D%2C%92%DBI%D23%26%7D%CAJ%8C%89%E6%E7%12%F3NU%8BUt%94%AA%DB8%E4J%C9W%F9%25%97%B6%E2%CD%2B%5D.y%0A_%FD%E5%D9%CA%F7%E4%9F%D7i%AC%85~%A4%247%C9%D7!%84%D64%CA8%DE%9EQR%9E%A2%A7%25%2BUZR%87V%A4*)%FD%BA%1352%B9%3AQ%EA%25%DB%89u%5D%AE%93bY%0Dkk%CD%CEN6v%AD6(%5D%B7%FD%02%13%912x%9D3%C8%AAo%EF'%E8%03%2B%5E%9B%92q%F5%DF%D3%BBK%CF%A6%9DJ%B6%AF%3E%3E%D0_.%19%DF%BAU%BF%B6%B2%1B%E9%DD%DE%03%25%87%9B%C7%83%A5%3B7%DA%CF%907%14%F5%7BA%5C_%DFr%7D%E9m%06%C4%15E%01%22%83%98z%5D%CDs%239%ED%26%AF%9B%E1%EB%A6%D7%F5%80%FD%D6%2Ce%E0%BB%FE6h%D32!%40l%818%BD%D4%F9t%3Cw%DA%AE%3B%FD%11%0A%B7%5B%E4%B4%A6%E9%B4%AF%E9%40Mk%B6_%3FM%0F%8E%F0%95%91%F7%A6%93%13%8A%12W%1D%EBSut%F6%ECZ%9F%18p%EE%E4%EA%BA%0Dc%B7%3FT%B2p%E5%E8%1E%E8ng%BD%F3%05%C9%5D%1C%8A%02%04%20%1A%10%C3%E0%E6%9F%8B%AF%F8%9C%F7%26V-%1B%2B%E16%97%3C%A3%CDF%8B%1E%3B%D7l9%D4%05z%CB%B6I%BA%CA%99%8Afj%F3nKf%10h%16%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%01%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%10%20%00%01%08%40%00%02%10%80%00%04%20%00%01%08%40%00%02%10%80%00%04%20%00%F1%DD%FA%1F5L%D8%F4.%80%00u%00%00%00%00IEND%AEB%60%82") no-repeat scroll right -130px #BAE37F; -moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;border:1px solid #888888;color:#000044;display:block;font-size:1.5em;font-weight:bold;padding:2px 16px;text-align:center;text-decoration:none; }
	#install_button:hover { background-position:right 0;background-color:transparent;color:#0088FF; }

	/* Feed Filter criteria */
	.bfb_filter_list td { vertical-align:top; }
	.bfb_filter_list td:last-child { vertical-align:middle; }
	#bfb_filter_list tr:first-child .bfb_up, #bfb_filter_list tr:last-child .bfb_down { display:none; }
	#bfb_filter_list tr:nth-child(2n) { background-color:#ddd; }
	.bfb_filter_play { display:none; }
	.bfb_filter_disabled { opacity:.4; }
	.bfb_filter_disabled .bfb_filter_play { display:block; opacity:1.0 !important; }
	.bfb_filter_disabled .bfb_filter_pause { display:none; }

	/* Chat */
	.bfb_chat_name { font-weight:bold; opacity:1; }

	/* New window icon */
	.commentList a.UIImageBlock_Content { padding-left:24px; background:transparent url("data:image/gif,GIF89a%0D%00%0D%00%A2%00%00%FF%FF%FF%EF%EF%EF%EB%EB%EB%CA%CA%CA%BE%BE%BE%9A%9A%9Aeee%00%00%00!%F9%04%01%07%00%03%00%2C%00%00%00%00%0D%00%0D%00%00%0368%3AT%FE%85%ACQ%02%B87%94Y%AE%F9%06%B0-%1D%F6%89%CDc%02%A1c%89%5E%EC%60%5D%88%89%A5%F8b%C2%7C%A5%90H%EE6R%0Ci%9C%DD%A57%01B%24%8B%04%00%3B") no-repeat 6px center; }

	/* Image preview on hover */
	.bfb_image_preview { position:fixed; top:5px; right:10px; z-index:9999999; border:2px solid #ccc; -moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; padding:5px; min-height:50px; min-width: 50px; background-color:white; -moz-box-shadow:5px 5px 5px #333; -webkit-box-shadow:5px 5px 5px #333;}
	.bfb_image_preview_msg { font-size:16px; font-weight:bold; margin:10px; }
	.bfb_image_preview_footnote { font-size:8px; color:#999; font-family:arial; }
	.bfb_image_preview_caption { border:1px solid #ccc; padding:1px; background-color:white; font-size:10px; display:inline; }

	/* Conditional Rules */
	html.hide_post_actions_until_hover .bfb_post_action_container { display:none; }

	html.hide_hovercard .HovercardOverlay { display:none !important; }

	html.expand_nav_messages #navigation_item_messages ul, 
	html.expand_nav_messages #navItem_messages ul,
	html.expand_nav_messages #navItem_inbox ul,
	html.expand_nav_messages #sideNav .key-inbox ul,
	html.expand_nav_messages #sideNav #navItem_app_217974574879787 > ul
		{ display:block !important; }

	html.expand_nav_events #navigation_item_events ul, 
	html.expand_nav_events #navItem_events ul,
	html.expand_nav_events #sideNav .key-events ul,
	html.expand_nav_events #sideNav #navItem_app_2344061033 > ul
		{ display:block !important; }

	html.expand_nav_photos #navigation_item_media ul { display:block !important; }

	html.expand_nav_friends #navigation_item_ff ul, 
	html.expand_nav_friends #navigation_item_ff a.navMore, 
	html.expand_nav_friends #navItem_ff ul, 
	html.expand_nav_friends #navItem_ff a.navMore,
	html.expand_nav_friends #sideNav .key-ff ul,
	html.expand_nav_friends #sideNav #navItem_app_2356318349 > ul
		{ display:block !important; }

	html.expand_nav_friends_full #navigation_item_ff ul li.hiddenSubitem  { display:block !important; }
	html.expand_nav_friends_full #navigation_item_ff a.navMore  { display:none !important; }
	html.expand_nav_friends_full #navItem_ff ul li.hiddenSubitem  { display:block !important; }
	html.expand_nav_friends_full #navItem_ff a.navMore  { display:none !important; }

	html.left_align #globalContainer { margin:0px !important; }

	html.static_left_col body.home #leftCol { position:fixed !important; z-index:15; padding-top:41px; }
	html.static_left_col #leftCol {z-index:4 !important;}

	html.hide_left_nav_groups #groupsNav { display:none !important; }
	html.hide_left_nav_groups_create #groupsNav #navItem_app_230259100322928 { display:none !important; }
	html.hide_left_nav_apps #appsNav { display:none !important; }
	html.hide_left_nav_pages #pagesNav { display:none !important; }
	
	html.hide_update_email #megaphone_story_44 { display:none !important; }

	html.hide_old_comments .bfb_new_comments .better_fb_new_comment_unhighlight { display:none; }

	html.hide_notification_pictures #fbNotificationsList .uiProfilePhoto { display:none; }
	html.hide_notification_pictures #fbNotificationsList > li { padding-top:2px; padding-bottom:2px; }
	html.hide_notification_pictures #fbNotificationsList .info .metadata > i { display:none; }

	html.hide_chat_panel #pagelet_chat_home_facepile, html.hide_chat_panel #pagelet_friends_online { display:none; }

	html.pin_notifications_right_panel #fbNotificationsFlyout .blueName { color:#3B5998 !important; }
	html.pin_notifications_right_panel #rightCol #fbNotificationsFlyout {display:block !important; left:0 !important; position:static !important; top:0 !important; width:auto !important; }
	html.pin_notifications_right_panel #rightCol .notification { border-bottom:1px solid #ddd; }

	html.hide_status_updater #pagelet_status_updater,
	html.hide_status_updater #pagelet_welcome_box 
		{ display:none !important; } 
	html.hide_status_updater #leftCol { padding-top:3px !important; }

	html.stretch_wide #globalContainer {min-width: 100px !important; width: 100% !important}
	html.stretch_wide .left_column_container {margin-left: 0px !important}
	html.stretch_wide #profile_top_bar{margin-left: 220px !important; padding-left: 0px !important; width: inherit !important; margin-right...: 20px !important}
	html.stretch_wide .right_column_container {margin-left: 220px !important; width: inherit !important; margin-right: 20px !important}
	html.stretch_wide #right_column {position: static; width: auto !important; float: left !important}
	html.stretch_wide #pagelet_ads{position: absolute !important; right: 0px}
	html.stretch_wide #tab_canvas{width: 100% !important}
	html.stretch_wide #pageHead {left: 0px; width: 100% !important}
	html.stretch_wide #headNav {width: auto !important}
	html.stretch_wide #profile_pager_container {margin-right: 70px}
	html.stretch_wide  #headerArea {width: 100% !important; margin-left: 0px !important}
	html.stretch_wide #pagelet_header {margin-left: 0px !important}
	/*html.stretch_wide #headerArea .rfloat {position: absolute; right: 146px}*/
	html.stretch_wide #contentArea {width: 100% !important; padding-left: 0px !important}
	html.stretch_wide  #rightCol {position: absolute !important; width: 250px !important; padding-right: 0px !important; right: 10px !important}
	/*html.stretch_wide  #rightCol {padding-top: 52px !important}*/
	html.stretch_wide  #contentCol {width: auto !important; margin-left: 0px !important; padding-left: 200px !important; padding-right: 280px}
	html.stretch_wide  #contentCol {padding-left: 200px}
	html.stretch_wide .ego_page #contentCol,
		html.stretch_wide .home #contentCol 
		{padding-left: 20px}
	html.stretch_wide #pagelet_byline {width: 100% !important}
	html.stretch_wide .uiUfi {display: inline !important; width: auto !important}
	html.stretch_wide .profile_two_columns .right_column { padding-right:180px; }
	/* Fix for sidebar pushing content off the left side */
	html.stretch_wide.sidebarMode #globalContainer { position:static !important; left:0px !important; }
	
	html.fix_comments .sendOnEnterTip, 
	html.fix_comments .commentUndoTip, 
	html.fix_comments .child_is_active .sendOnEnterTip, 
	html.fix_comments .child_is_active .commentUndoTip 
		{display:none !important;} 
	#facebook.fix_comments .child_is_active .hidden_elem.commentBtn 
		{display:block !important;}

	html.fix_comment_cursor .uiUfiAddComment .UIImageBlock_Content.commentArea {display:block !important;width:auto !important;margin-left:40px;}	
	html.fix_comment_wrap .DOMControl_shadow:after { content:'XXX'; }

	/* Right Col */
	html.hide_happening_now #pagelet_rhc_ticker, html.hide_happening_now #pagelet_ticker { display:none !important; }
	html.unlock_right_col .fixedRightCol .home_right_column {position: static !important;}
	
	/* Force the ticker to not be static */
	html.ticker_scroll .rightColumnWrapper.fixed_elem { position:static !important; } 
	
	/* Chat */
	html.chat_hide #pagelet_presence { display:none !important; }
	
	.fbChatOrderedList.compact img { display:none !important; }
	.fbChatOrderedList.compact .name { line-height:normal !important; }
	/* Shrink the popup chat list to fit the contents */
	.fbDockChatBuddyListNub .fbNubFlyoutBody, .bb .fbNub.maxHeight .fbNubFlyoutOuter { height:auto !important; }
	/* Hide our list when the search is active */
	.fbChatOrderedList ~ .fbChatTypeaheadView { display:none; }
	.fbChatOrderedList.hidden_elem ~ .fbChatTypeaheadView { display:block; }
	.fbChatOrderedList.hidden_elem ~ .fbChatOrderedList { display:none !important; }
	
	/* Chronological Order, Top Stories */
	html.chronological .uiStreamHeaderTall { display:none; }
	html.hide_top_story_indicator .highlightIndicator { display:none; }
	
		]]></>).toString());

		// Options that have to be written directly to the page. Bummer.
		var dialog_max_height = (window.innerHeight-200);
		var css2 = ''+
		'#fbNotificationsList { max-height:'+(window.innerHeight-100)+'px !important; overflow:auto !important; } '+
		'.bfb_cp_float { opacity:%floating_cp_opacity%; } '+
		'.bfb_post_action_container { opacity:%post_action_opacity2%; } '+
		'.bfb_window_height { max-height:'+window.innerHeight+'px; }'+
		'.bfb_window_height100 { max-height:'+(window.innerHeight-100)+'px; }'+
		'.bfb_window_height50 { max-height:'+(window.innerHeight-50)+'px; }'+
		'.bfb_dialog .bfb_dialog_content { max-height:'+dialog_max_height+'px; overflow:auto; }'+
		'';
		var sprite_url = options.get('sprite_url');
		if (sprite_url && sprite_url.indexOf("http")==0) { 
			css2 += '.bfb_post_action { background-image:url('+sprite_url+'); }';
		}
		if (options.get('enable_font_size')) {
			var post_size = options.get('post_font_size');
			var comment_size = options.get('comment_font_size');
			if (!comment_size) { comment_size = post_size; }
			if (post_size) { css2 += '.uiStreamMessage,.UIStory_Message,.mall_post_body {font-size:'+post_size+'px !important;} '; }
			if (comment_size) { css2 += '.commentContent {font-size:'+comment_size+'px !important;} '; }
		}

		if (zoom!=100) {
			css2 += ''+
			'.bfb_post_action { width:'+(15*zoom)+'px; height:'+(15*zoom)+'px; -moz-background-size: '+(90*zoom)+'px background-size: '+(90*zoom)+'px '+(30*zoom)+'px; -webkit-background-size: '+(90*zoom)+'px '+(30*zoom)+'px; -o-background-size: '+(90*zoom)+'px '+(30*zoom)+'px;  } '+
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
			'.bfb_post_action_google:hover { background-position:-'+(75*zoom)+'px -'+(15*zoom)+'px; } ';
		}
		css2 = _template(css2,o);
		addGlobalStyle( css + css2 );
		
		var css_url = options.get('css_url');
		if (css_url && css_url.length>0 && css_url!="null") {
			insertStylesheet(css_url);
		}

		var theme_url = options.get('theme_url');
		if (theme_url && theme_url.length>0 && theme_url!="null") {
			insertStylesheet(add_theme_url_parameters(theme_url),'bfb_theme');
		}
		if (document.body) {
			for (var i=0; i<10; i++) {
				append(document.body,el('div','bfb_theme_extra_div',{id:"bfb_theme_div_"+i}));
			}
		}

		css = options.get('css');
		if (css && css.length>0 && css!="null") {
			addGlobalStyle(css);
		}

	})();

	// =================
	// TAB Functionality
	// =================
	var previous_tab_id = null;
	var home_tab="Home";
	var home_tab_content_id = "home_stream";
	function addTabContainer() {
		var hs = getStream();
		if (PERFORMANCE) { trace_start('addTabContainer'); }
		if (hs) {
			trace("Adding tab container");
			var c = el('div','bfb_tabs',{id:'bfb_feed_tabs'});
			insertBefore( c, hs);
			insertBefore( el('div','bfb_clear'), hs );
			attachTabContainerClickHandler(c);
			if (PERFORMANCE) { trace_end('addTabContainer'); }
			return c;
		}
		if (PERFORMANCE) { trace_end('addTabContainer'); }
		return null;
	}
	function attachTabContainerClickHandler(container) {
		bind(document,'click',function(e) {
			var new_tab = getParentByClass(target(e),'bfb_tab');
			if (!new_tab) { return; }
			var tab_id = new_tab.id;
			if (tab_id==previous_tab_id) { return; } // Same tab clicked
			// Unselect previous tab
			var previous_tab = document.querySelector(".bfb_tab_selected");
			if (previous_tab) { removeClass(previous_tab,"bfb_tab_selected"); }
			// Select new tab
			addClass(new_tab, "bfb_tab_selected");
			// Unselect previous body
			var previous_body = document.querySelector(".bfb_tab_body_selected");
			if (previous_body) { removeClass(previous_body,"bfb_tab_body_selected"); }
			// Select new body
			var body_id = getTabBodyId(tab_id);
			var new_body = document.querySelector("#"+body_id);
			if (new_body) { addClass(new_body,"bfb_tab_body_selected"); }
		});
	}
	function getTabId(name) {
		return "bfb_feed_tab_"+(name.replace(/[^a-zA-Z0-9_]/g,""));
	}
	function getTabBodyId(tab_id) {
		return (tab_id=='bfb_feed_tab_Home')?home_tab_content_id:tab_id+"_body";
	}
	function addTab(name,add_close_icon,close_func) {
		if (PERFORMANCE) { trace_start('addTab'); }
		var tab_id = getTabId(name);
		var home_stream = getStream();
		if (home_stream) {
			var content, tab_feed_id;
			if ($(tab_id)==null) {
				trace("Adding tab: "+name);
				var container = $('bfb_feed_tabs');
				// If there is no tab container, and the first tab we are adding is not Home, then first add Home!
				if (!container) {
					if (name!=home_tab) {
						addTab(home_tab);
						container = $('bfb_feed_tabs');
					}
					else {
						container = addTabContainer();
					}
				}
				if (container) {
					var selected = (container.getElementsByTagName('div').length==0);
					var tab = el('div','bfb_tab '+(selected?"bfb_tab_selected":""),{id:tab_id},null,name);
					if (add_close_icon) {
						append(tab,el('div','bfb_tab_close',{title:"Remove this application from auto-tabbing. Posts from this app will return to the Home tab."},{click:close_func}));
					}
					var counter_id = tab_id+"_count";
					append(tab, el('span','bfb_tab_count',{id:counter_id}) );
					append(container, tab );
					if (name==home_tab) {
						addClass(home_stream,"bfb_tab_body_selected");
						addClass(home_stream,"bfb_stream");
						content = home_stream;
						home_tab_content_id = home_stream.id;
					}
					// Add a new feed container for this tab
					else {
						tab_feed_id = tab_id+"_body";
						content =el('ul','uiList uiStream bfb_stream '+(selected?"bfb_tab_body_selected":""),{id:tab_feed_id});
						insertAfter( content, home_stream );
					}
					// Watch for changes in the content, to update the tab
					attachTabCountUpdateHandler(tab_id);
				}
			}
			if (PERFORMANCE) { trace_end('addTab'); }
			var $tab = $(tab_id);
			if ($tab==null) {
				trace("Tab not created: "+tab_id);
			}
			return $tab;
		}
		else {
			trace("No stream found while trying to add tab ["+name+"]");
		}
		if (PERFORMANCE) { trace_end('addTab'); }
		return null;
	}
	function attachTabCountUpdateHandler(tab_id) {
		var content = $(getTabBodyId(tab_id));
		var update_tab_count = function(e) { setTimeout(function(){updateTab(tab_id);},250) };
		if (content) {
			content.addEventListener('DOMSubtreeModified',update_tab_count,false);
		}
		update_tab_count();
	}
	function moveToTab(name,o) {
		if (PERFORMANCE) { trace_start('moveToTab'); }
		var ret = "";
		var t = addTab(name);
		if (t) {
			var tab_id = t.id;
			var content = $(tab_id+"_body");
			if (!content) { ret+="Tab content object not found! "; }
			if (name!=home_tab) { 
				var p = o.parentNode;
				append(content,o); // It's already in the Home tab by default!
				if (o.parentNode==p) {
					ret += "After append(), the posts's parent node is still the same! ";
				}
			}
		}
		else {
			ret += "Tab does not exist after addTab()! ";
		}
		if (PERFORMANCE) { trace_end('moveToTab'); }
		return ret;
	}
	var tabCountTimers = {};
	var show_tab_count = options.get('tab_count');
	function updateTab(tab_id) {
		if (show_tab_count) {
			// Try to only update tab counts if it's not in rapid succession
			if (typeof tabCountTimers[tab_id]!="undefined") {
				clearTimeout(tabCountTimers[tab_id]);
			}
			tabCountTimers[tab_id] = setTimeout( function() { updateTabItemCount(tab_id); }, 500 );
		}
	}
	function updateTabItemCount(tab_id) { 
		if (PERFORMANCE) { trace_start('updateTabItemCount'); }
		var content = $(getTabBodyId(tab_id));
		var c=0,total=0;
		var cn = findStoriesInContainer(content);
		if (cn && cn.length) {
			var L = cn.length;
			// If the user is using the alternate display type, then process visible posts differently
			var is_show_all = false;
			var stream = getStream();
			if (stream && hasClass(stream,"bfb_show_all")) {
				is_show_all= true;
			}
			for (var i=0; i<L; i++) {
				var o = cn[i];
				if (!hasClass(o,"bfb_duplicate") && !hasClass(o,'UIRecentActivity_Stream')) {
					total++;
					if (is_show_all) {
						c++;
					}
					else if (!hasClass(o,'bfb_hidden') && (!hasClass(o,'bfb_read') || hasClass(o,'bfb_new_comments'))) {
						c++;
					}
				}
			}
			html( $(tab_id+"_count"), '(<span class="new">'+c+'</span>/<span class="total">'+total+'</span>)' );
			// Change classes depending on if there are any posts in the tab
			if (c==0) { addClass($(tab_id),"bfb_tab_empty"); } else { removeClass($(tab_id),"bfb_tab_empty"); }
		}
		delete tabCountTimers[tab_id];
		if (PERFORMANCE) { trace_end('updateTabItemCount'); }
	}
	
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
		if (PERFORMANCE) { trace_start('getData'); }
		var data = o.getAttribute(container);
		if (data) {
			var attrs = parse(data,"getDataProperty");
			if (PERFORMANCE) { trace_end('getData'); }
			return attrs;
		}
		if (PERFORMANCE) { trace_end('getData'); }
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
	var chronological = options.get('chronological');
//	var reorder_page_walls = options.get('reorder_page_walls');
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
	var process_recent_activity = options.get('process_recent_activity');
	var untabs = options.get('untab_apps');
	var untabs_array = untabs.split(",");
	var untabs_hash = {};
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
	function fixStory(o,isPageOrProfile,isGroupWall,saveprefs) {
		var href = "";
		try { href = window.location.href; } catch(e) { } 
		if (typeof saveprefs=="undefined") { saveprefs = true; }
		
		// If viewing a single wall post, don't process anything!
		if (href.indexOf("story_fbid=")>0 || href.indexOf("share_id=")>0) { return; }
		
		if (PERFORMANCE) { trace_start('fixStory'); }

		// Don't pocess the post if it isn't in a stream!
		if (parent(o,'.uiContextualDialogContent')) { return; }

		if (filters_enabled && always_show_tabs && !tabs_exist() && !isPageOrProfile) {
			addAllTabs(o);
		}

		if (!process_recent_activity && (hasClass(o,"UIRecentActivity_Stream") || hasClass(o,"uiStreamMinistory") || hasClass(o,"UIRecentActivityStory"))) { if(PERFORMANCE){trace_end ('fixStory');}return; } // Don't process recent activity posts

		// Create the control panel if it's not already there
		if (display_control_panel) {
			var cp = $('better_fb_cp');
			if (cp==null) { 
				var hs = $('home_stream');
				if (hs!=null) {
					createControlPanel(hs);
				}
				else {
					// If we're on profile/page
					hs = $('profile_stream_container');
					if (hs) {
						createControlPanel(hs);
					}
					else {
						hs = $('profile_minifeed');
						if (hs) {createControlPanel(hs);}
						else {
							hs = $('pagelet_group');
							if (hs) {createControlPanel(hs);}
							else {
								createControlPanel(o.parentNode);
							}
						}
					}
				}
			} else {
				cp.style.display="block"; 
			} 
		}

		// Check to see if this post has already been processed
		if (hasClass(o,'bfb_processed')) {
			if (PERFORMANCE) { trace_end ('fixStory'); }
			return; 
		}
		addClass(o,'bfb_processed');
		update_status('bfb_status_processed',++count_processed);
		
		// Get the story properties from the data-ft attribute
		var props = getData(o,"data-ft");
		if (!props || !props.sty) {
			if (++nostycount == 5) {
//				quickmessage("<b>Social Fixer Message</b><br>Facebook appears to be delivering posts with missing data. This data is what Social Fixer uses to identify post types and applications, so features like tabbing or filtering may not work correctly. Usually this resolves itself after Facebook updates their code.",15);
			}
		}
		var type = props.sty || -1;
		
		// If there is no fbid, then we can't uniquely identify this post. We're screwed.
		var fbid = getFbid(o,props);
		if (!fbid || fbid<=1) {
			addClass(o,"nofbid");
			if (PERFORMANCE) { trace_end('fixStory'); }
			return;
		}

		// Lookup the app_id if it doesn't exist
		var app_debug = "";
		if (!props.app_id) {
			try {
				var app_id = null;
				QS(o,'a[data-appname]',function(o) {
					app_debug += "data-appname found. ";
					try { app_id=o.href.match(/id=(\d+)/)[1]; if(app_id) { } } catch(e) { app_debug+="Exception: "+e.description+". "; }
				});
				if (!app_id) {
					QS(o,'.uiStreamSource a[data-hovercard]',function(o) {
						app_debug += "data-hovercard found. ";
						try { 
							app_id = o.getAttribute('data-hovercard').match(/page.php\?id=(\d+)/)[1]; 
						} catch(e) { app_debug+="Exception: "+e.description+". "; }
					});
				}
				if (!app_id) {
					QSA(o,"a[href*=application\\.php\\?id\\=]",function(a) {
						app_debug += "application.php found. ";
						try { app_id = match(a.href,/id=(\d+)/); } catch(e) { app_debug+="Exception: "+e.description+". "; }
					});
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
		if (QS(document,'*[fbid="'+fbid+'"]')) {
			addClass(o,"bfb_duplicate");
			update_status('bfb_status_duplicate',++count_duplicate);
			return;
		}
		o.setAttribute('fbid',fbid);

		// Enhance links in application stories
		if (props.app_id && (open_app_link_in_tab || open_app_link_marks_read) && o.querySelectorAll) {
			var links = o.querySelectorAll("a[href*=http\\:\\/\\/apps\\.facebook]");
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
			var inner_text = "";
			QSA(o,'.actorName,.messageBody,.uiStreamAttachments,.uiStreamFooter,.uiStreamMessage',function(o) { inner_text += " " + innerText(o); });
			if (!inner_text) {
				inner_text = innerText(o);
			}
			fdebug += '<div style="border:1px solid #999;">'+inner_text+'</div>';
			if (filters && filters.length) {
				for (i=0; i<filters.length; i++) {
					filter = filters[i];
					if (filter.disabled) { continue; }
					fmatch = true;
					for (dataft_key in filter.criteria) {
						criteria = filter.criteria[dataft_key];
						// Check to see if the filter uses sty type, and show an error if that prop doesn't exist
						if (dataft_key=="sty" && typeof props[dataft_key]=="undefined" && !no_sty_error_shown) {
							no_sty_error_shown = true;
							add_error("SFX Error: You have defined a filter based on story type, but Facebook is currently not delivering the necessary data to properly filter posts based on story type. See the FAQ for more information.");
						}
						if (dataft_key=="regex") {
							if (typeof criteria=="string" && criteria.indexOf("/")==0) {
								// This is regular expression text, so convert it!
								criteria = convert_string_to_regex(criteria);
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
		if (tabbed) { update_status('bfb_status_tabbed',++count_tabbed); }
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
				similar.style.backgroundColor = "yellow";
				html( similar, "<strong>AUTO-EXPANDING...</strong>"+similar.innerHTML );
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
		if (c && c.getElementsByClassName) { post_data.cnc = c.getElementsByClassName(comment_class_name).length; }

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
				if (post_data.read && (count > stored_count)) {
					addClass(o,"bfb_new_comments");
					hidden = false;
					// Add a new box into the comment area?
					if (c!=null && (o && o.getElementsByClassName && o.getElementsByClassName('bfb_new_comment_notif').length==0)) {
						var new_count = count-stored_count;
						var text = new_count+" new comment"+((new_count>1)?"s":"") + " ("+count+" total)";
						var section = el('div','ufi_section bfb_new_comment_notif',{'innerHTML':text});
						new_comments_exist = true;
						
						// Highlight the new comments
						if (c.childNodes && c.childNodes.length>0) {
							var start = c.childNodes.length - new_count;
							if (start < 0) { start = 0; }
							for (var i=0; i<start && i<c.childNodes.length; i++) {
								var n = c.childNodes[i];
								if (n.id) {
									addClass(n,"better_fb_new_comment_unhighlight");
								}
							}
						}
						// Add the notification
						insertFirst(c,section);
					}
				}
			}
		}
        var filter = props.filter || '';

		if (!isGroupWall && (chronological || reorder || tabbed)) {
			var reorder_debug = "";
			// Record the timestamp of the post as an attribute, based on the timestamp's title attribute
			var post_time = o.getAttribute('timestamp') || 0;
			if (!post_time) {
				QS(o,'.timestamp,.livetimestamp,.bfb_timestamp',function(timestamp) {
					try { 
						post_time = (((new Date(timestamp.getAttribute('data-date'))).getTime())*10000) + (post_counter++);
						o.setAttribute('timestamp',post_time);
						reorder_debug += "<b>Timestamp</b>: "+post_time+"\n";
						post_hash[post_time] = o;
					} catch (e) { alert(e); }
				});
			}
			// Find the ID of which tab this post is in
			var tab_id = 'bfb_feed_tab_Home';
			var parent_stream = parent(o,streamContainerSelector) || getParentByClass(o,"bfb_stream");
			if (parent_stream) {
				tab_id = parent_stream.id;
			}
			reorder_debug += "Post tab id: "+tab_id+"\n";
			var tab_post_array = post_array[tab_id];
			if (typeof tab_post_array=="undefined") {
				tab_post_array = post_array[tab_id] = [];
			}
			// Loop through the post_array to find a post that is older than this one, then insert before
			var inserted = false;
			for (var i=0, L=tab_post_array.length; i<L; i++) {
				if (tab_post_array[i] < post_time) {
					var reference_post = post_hash[tab_post_array[i]];
					if (reference_post) {
						// Insert the timestamp into the array in the right place
						tab_post_array.splice(i,0,post_time);
						// Move the post
						reorder_debug += "<b>Re-ordered</b> to position #"+i+" in tab "+tab_id+" before "+getFbid(reference_post)+"\n";
						insertBefore(o,reference_post);
                        update_status('bfb_status_reordered',++count_reordered);
						inserted = true;
						break;
					}
				}
			}
			if (!inserted) {
				tab_post_array.push(post_time);
				reorder_debug += "<b>Not re-ordered</b>\n";
			}
			else {
				addClass(o,'bfb_reordered');
			}
			post_debug(fbid,reorder_debug);
		}
		
		if (hidden) { update_status('bfb_status_hidden',++count_hidden); }

		// Auto-expand the "see more" link 
		if (expand_see_more || (allow_bfb_formatting && (props.actrs=='119314224763738' || props.actrs=='174424289341'))) {
			// There are two different formats for "see more"
			QSA(o,'.text_exposed_root',function(div) {
				var hidden_html = QS(div,'.text_exposed_show','innerHTML');
				if (hidden_html) {
					QSA(div,'.text_exposed_hide,.text_exposed_show',function(span){ removeChild(span); });
					appendhtml(div,hidden_html);
				}
			});
			QSA(o,'.UIStory_Message',function(span) {
				var hidden_content = QS(span,'.text_exposed_show','innerHTML');
				if (hidden_content) {
					QSA(o,'.text_exposed_link',function(span){ removeChild(span); });
					QSA(span,'.text_exposed_hide,.text_exposed_show',function(span){ removeChild(span); });
					appendhtml(span,hidden_content);
				}
			});
		}
		
		// Add the post action tray
		if (show_post_actions) {
			var mark_post_unread = function(o,fbid,a) {
				delete post_data.read;
				delete post_data.cc;
				options.set('story_data.'+fbid,post_data);
				removeClass(o,"bfb_read");
				removeClass(o,"bfb_new_comments");
				a.parentNode.removeChild(a);
			}

			o.style.position="relative";
			var pcp = '<div class="bfb_post_action_container_inner">';
			if (options.get('show_post_action_info_mark_read')) {
				var mark_read_desc = "Mark Read: Mark this post as read and hide it until/unless new comments are posted";
				if (post_data.read) {
					mark_read_desc = "Mark Read: Update the stored comment count for this post, mark it as read, and hide it again.";
				}
				pcp += '		<div class="bfb_post_action bfb_post_action_read" title="'+mark_read_desc+'">&nbsp;</div> ';
			}
			if (options.get('show_post_action_info_mute')) {
				var mute_desc = "Mute Comments: mute this post so new comments will not be shown.";
				if (!new_comments_exist) {
					mute_desc = "Mark Read and Mute: Mark this post as read and mute any future comments";
				}
				pcp += '<div class="bfb_post_action bfb_post_action_mute" title="'+mute_desc+'">&nbsp;</div>';
			}
			if (options.get('show_post_action_mark_unread')) {
				pcp += '<div class="bfb_post_action bfb_post_action_unread" title="Mark Unread: mark this post as unread so it shows up in your feed again.">&nbsp;</div>';
			}
			if (options.get('show_post_action_info_add_app')) {
				if (show_add_app_icon) {
					pcp += '<div class="bfb_post_action bfb_post_action_add" title="Add App: add this application to your list of known apps. (It will then be automatically tabbed by name if that feature is enabled).">&nbsp;</div>';
				}
			}
			if (options.get('show_post_action_google')) {
				pcp += '<div class="bfb_post_action bfb_post_action_google" title="Google It!">&nbsp;</div>';		
			}
			if (options.get('show_post_action_info')) {
				pcp += '<div class="bfb_post_action bfb_post_action_info" title="Post Info: View debug information about this post and how it was processed. Useful for debugging or reporting problems!">&nbsp;</div>';
			}
			
			pcp += '</div>';
			var d = el('div','bfb_post_action_container',null,null,pcp);
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
							appname = prompt("What would you like to label this application? (This is also the name of the tab where it will appear if you have the option set to automatically send known apps to tabs)","");
						}
						if (appname) {
							if (custom_apps.length>0) { custom_apps+="," };
							custom_apps += props.app_id+':'+appname;
							options.set('custom_apps',custom_apps);
							apps[props.app_id] = appname;
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
					db = el('div','bfb_debug');
					append(o,db);
				}
				html( db, get_post_debug(fbid) );
                if (db.scrollIntoView) { db.scrollIntoView(false); }
			} );
			bind( $first(d,'bfb_post_action_google'),'click',function(e) { google_it(o); } );
			
			// If this post has the "audience" selector, shit the post actions to the left
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
		
		if (PERFORMANCE) { trace_end('fixStory'); }
	}
	
	var post_debug_info = {};
	function post_debug(fbid,str) {
		post_debug_info[fbid] = (post_debug_info[fbid]||"") + str;
	}
	function get_post_debug(fbid) {
		var debug = post_debug_info[fbid]+"<br>";
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
		return $first(o,feedCommentClass);
	}
	// Get the count of how many comments a post has
	var comment_class_name = 'uiUfiComment';
	function get_post_comment_count(o,cnc) {
		var c = get_comment_container(o);
		var new_comment_count = 0;
		if (c) {
			if ( /view all ([,.\d]+) comments/i.test(c.innerHTML) ) {
				var view_all_count = +(RegExp.$1.replace(/[,.]/g,""));
				// If a ChildNodeCount is passed, compare it to the current CNC to see if the "view all" count is unreliable
				if (typeof cnc!="undefined") {
					var comments = c.getElementsByClassName(comment_class_name);
					if (comments && comments.length>cnc) {
						// We need to do some math!
						// # new comments = new CNC - old CNC
						new_comment_count = +(comments.length - cnc);
					}
				}
				return view_all_count + new_comment_count;
			}
			var comments = c.getElementsByClassName(comment_class_name);
			if (comments && comments.length>0) {
				return comments.length;
			}
			return c.childNodes.length || 0;
		}
		return 0;
	}

	// Mark an individual post as "read"
	function mark_post_read(o,save,func,store_undo) {
		if (typeof save!="boolean") { save=false; }
		if (typeof store_undo!="boolean") { store_undo=true; }
		var t = time();
		var fbid = getFbid(o,getData(o,"data-ft"));
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
		options.save();
	}

	function fixStories(o,isPageOrProfile,isGroupWall) { 
		if (PERFORMANCE) { trace_start('fixStories'); }
		// We are processing a live list. If we move a post to a tab, that changes the list!
		// So instead, copy all posts to an array first, then process each one
		if (o && o.length) {
			var posts = [];
			for (var i=0; i<o.length; i++) {
				posts.push(o[i]);
			}

			for (var i=0; i<posts.length; i++) {
				fixStory(posts[i],isPageOrProfile,isGroupWall,false);
			}
			posts = null;
			options.save();
		}
		if (PERFORMANCE) { trace_end('fixStories'); }
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
		QSA(o,'abbr[data-date][title]',function(a){ 
			if ($('MessagingDashboard')) { return; }
			if (hasClass(a,'bfb_timestamp')) { return; }
			var new_label = (""+a.title).replace(remove_current_year,"");
			if (a.innerHTML.indexOf("ago")>0) {
				try {
					var now = new Date();
					var d = new Date(a.getAttribute('data-date'));
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
	subscribe('presence/started',function(){
		onIdLoad('fbNotificationsFlyout',function(notifications) {
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
				pinned = true;
			}
			else if (options && options.get('pin_notifications_right_panel')) {
				var rc = QS(document,'#rightCol');
				if (rc) {
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

			// TODO: Notification previews disabled due to iframe X-Frame-Options problem
			if (false) {
			//if (options && options.get('show_notification_previews')) {
				// Add hovering features
				var retrieving_preview = null;
				var preview_top=0, preview_left=0;
				var preview_window = null;
				var preview_content = {};
				var hide_notif_preview = function() {
					if (preview_window!=null) {
						preview_window.style.display="none";
						retrieving_preview = null;
					}
				}
				var show_notif_preview = function(content) {
					if (preview_window==null) {
						preview_window = document.createElement("div");
						preview_window.className="bfb_notif_preview bfb_window_height";
						append(document.body,preview_window);
					}
					html(preview_window,content);
					preview_window.style.display="block";
					position_notif_preview();
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
	//					if (preview_top+preview_window.offsetHeight>window.innerHeight) {
	//						var newtop = preview_top - 10 - (preview_top+preview_window.offsetHeight-window.innerHeight);
	//						if (newtop<0) { newtop=0; }
	//						preview_window.style.top = newtop + "px";
	//					}
					}
				}
				var scrollhandler = function(e) {
					if (preview_window!=null) {
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
				}
				var clicked = false;
				notifications.addEventListener('click',function(){clicked=true;hide_notif_preview();},true);
				bind(notifications,'DOMMouseScroll',scrollhandler );
				bind(notifications,'mousewheel',scrollhandler );
				bind(notifications,'mousemove',function(e) {
					if (clicked){return;}
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
								retrieving_preview = url;
								if (typeof preview_content[url]=="undefined") {
									var preview_html = '<div class="bfb_notif_preview_message">Use your scroll wheel to scroll down if necessary</div>';
									show_notif_preview("Loading preview...");
									if (type=="photo") {
										fetch_content_in_iframe(url,'content',function(content) {
											if (content) {
												var img = content.querySelector('#myphoto');
												var comments = content.querySelector('#photocomment');
												if (img) {
													preview_html += '<img class="bfb_notif_photo_preview" src="'+img.src+'" style="max-height:'+options.get('preview_img_max_height2')+'px;max-width:'+options.get('preview_img_max_width2')+'px;">';
												}
												if (comments) {
													preview_html += '<br>'+comments.innerHTML;
												}
												preview_content[url] = preview_html;
												if (url==retrieving_preview) {
													show_notif_preview(preview_html);
												}
											}
											else if (url==retrieving_preview) {
												show_notif_preview("Error retrieving preview");
											}
										});
									}
									else if (type=="permalink") {
										fetch_content_in_iframe(url,'content',function(ca) {
											if (ca) {
												var post = ca.querySelector('.storyContent');
												if (post) {
													preview_html += post.innerHTML;
													preview_content[url] = preview_html;
													if (url==retrieving_preview) {
														show_notif_preview(preview_html);
													}
												}
											}
											else if (url==retrieving_preview) {
												show_notif_preview("Error retrieving preview");
											}
										});
									}
								}
								else { show_notif_preview(preview_content[url]); }
							}
							else { position_notif_preview(); }
						}
						else { hide_notif_preview(); }
					}
				});
				bind(notifications,'mouseout',function(e) {
					var t = target(e);
					if (!t) { return; }
					while (t.tagName!="A" && t.id!=notifications.id && t.parentNode) { t=t.parentNode; }
					if (!t||t.tagName!="A") { hide_notif_preview(); }
					else {
						// Check to see if we've moved quickly to something outside our container
						if (t=e.relatedTarget) {
							while (t.id!=notifications.id && t.parentNode) { t=t.parentNode; }
							if (!t || t.id!=notifications.id) {
								// We've gone outside the container, so hide
								hide_notif_preview();
							}
						}
					}
				});
			}
		});
	});

	function getStream() {
		var s;
		var tab_content = document.querySelector('.bfb_tab_body_selected');
		if (tab_content) { 
			return tab_content; 
		}
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
		trace("No stream found!");
		return null;
	}
	
	var bad_fbid_sty_types = array_to_object(split('15,60,10,313,263,316,285,7,8,116,278,62,3,77,9,55,56,245,-1,257,400,447',',')) || {};
	function getFbid(o,props) {
		// Look for the link to the story first, it is most reliable
		QS(o,'.uiStreamSource a[href*="fbid"]',function(m) {
			var fbid = match(m.href,/fbid=(\d+)/);
			if (fbid) {
				return fbid;
			}
		});
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
			if (!o.className || !o.className.match(/aid_\d+/)) { 
				fmatch = false;
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
		var fbid = getStoryProperty(o,'fbid');
		if (!fbid && o.id) {
			var parts = o.id.split("_");
			if (parts) {
				fbid = parts[parts.length-1];
			}
		}
		return fbid;
	}
	function process_visible_posts(func) {
		var stream = getStream();
		if (stream) {
			removeClass(stream,"bfb_show_all");
			var posts = findStoriesInContainer(stream);
			for (var i=0, L=posts.length; i<L; i++) {
				var o = posts[i];
				if (!hasClass(o,'bfb_hidden') && (!hasClass(o,'bfb_read') || hasClass(o,'bfb_new_comments'))) {
					func(o);
				}
			}
		}
	}
	function markRead(func) {
		trace("Mark All Read clicked");
		undo_posts = [];
		process_visible_posts(function(o) {
			mark_post_read(o,false);
		});
		options.save(func);
		scroll_to_top();
	}
	function mute_all() {
		trace("Mute All Read clicked");
		undo_posts = [];
		process_visible_posts(function(o) {
			mute_post(o,false);
		});
		options.save();
		scroll_to_top();
	}
	function toggle_show_all() {
		var e = getStream();
		if (e) { toggleClass(e,"bfb_show_all"); }
	}
	function createSidebarSection(o) {
		if (PERFORMANCE) { trace_start('createSidebarSection'); }
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
					var a = el('a','bfb_sidebar_header_link',{href:'#',innerHTML:link.linktext},{click:link.linkonclick});
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
				var a = el('a','bfb_sidebar_header_link',{href:'#',innerHTML:'<img src="'+x_img+'">'},{'click':o.close_func});
				var nd = el('span','uiTextSubtitle uiHeaderActions rfloat');
				append(nd,a);
				insertFirst(dd,nd);
			}
		}
		if (PERFORMANCE) { trace_end('createSidebarSection'); }
		return d;
	}

	// When the page is first loaded, process the stuff that is there
	fixStories( findStoriesInContainer($('home_stream')), false, false );
	if (processProfiles) {
		fixStories( findStoriesInContainer($('profile_minifeed')), true, false );
	}
	if (processGroups) {
		fixStories( findStoriesInContainer($('pagelet_group_mall')), false, true );
	}
	
	// When the streams are unloaded, reset counters
	onUnload(['home_stream','profile_minifeed','pagelet_group_mall'],function() {
		post_array = {};
		post_hash = {};
		post_counter = 0;
	},true);

	// RIGHT COLUMN CONTENT
	// ====================
	// Put a "close" link on all side panels and hide them if already closed
	var current_hidden = options.get('right_panels_hidden');
	var hidden_sidepanels = split(current_hidden,';');
	onSelectorLoad('#rightCol .uiSideHeader h4, #pagelet_ego_pane .uiSideHeader h4, #MessagingNetegoSidebar .uiSideHeader h4, .UIStandardFrame_SidebarAds .uiSideHeader h4',function(o) {
		var sidebar_title = trim(o.innerHTML.replace(/(You\s*and\s*).*/gi,"$1..."));
		sidebar_title = sidebar_title.replace(/<.*/g,'');
		sidebar_title = sidebar_title.replace(/\s*\(\d+\)/g,'');
		var container = getParentByClass(o,'uiSideHeader');
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
				var a = el('a','bfb_sidebar_header_link bfb_sidebar_close',{href:'#',title:'Click to hide this panel',innerHTML:'<img src="'+x_img+'">'},{click:function(){
					if(confirm('Are you sure you want to hide the panel labeled \''+sidebar_title+'\'?\n(You can choose to show it again in Options)')) {
						hidden_sidepanels.push(sidebar_title);
						options.set('right_panels_hidden',hidden_sidepanels.join(';'),true,function() {
							hide(container);
						});
					}
				}});
				var nd = el('div','uiTextSubtitle uiHeaderActions rfloat');
				append(nd,a);
				insertFirst(header_top,nd);
				
				// Add an 'expand' msg
				insertFirst(header_top,el('span','bfb_sidebar_header_expand rfloat',null,null,'(click para expandir)',{'display':'none'}));
			}
		}
	});	
	
	onSelectorLoad('#rightCol',function(o) {
		var feed_right_column = o;
		
		// TODO!!!
		QS(feed_right_column,'.home_right_column',function(oo) {
			feed_right_column = oo;
		});
		if ($('pagelet_chbox')!=null) { feed_right_column=$('pagelet_chbox').parentNode; }
		else if ($('pagelet_adbox')!=null) { feed_right_column=$('pagelet_adbox').parentNode; }
	
		// If the "fixed" right panel exists, don't add panels
		if (QS(feed_right_column,'.fixedAux')) { return; }
	
		if (options && options.get('pagelet_toggle')) {
			$tagname(o,"h4",function() { this.title="Click to expand/collapse this pagelet"; });
			
			// Handle clicks on pagelet titles
			bind(o,'click',function(e) {
				var e = target(e);
				if (e.tagName=="H4" || hasClass(e,'bfb_sidebar_header_expand')) {
					var pagelet = e;
					while (pagelet=pagelet.parentNode) {
						if (pagelet.id=="pagelet_right_sidebar" || pagelet.id=="rightCol") {
							pagelet = null;
							break;
						}
						if(pagelet.id && (pagelet.id.indexOf("pagelet_")==0 || pagelet.id=="ego_pane")) {
							break;
						}
					}
					if (pagelet && pagelet.id) {
						toggleClass(pagelet,"bfb_pagelet_closed");
						options.set("pagelet_collapsed."+pagelet.id,hasClass(pagelet,"bfb_pagelet_closed"));
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
			// Collapse pagelets by default
			var id,pagelets = options.get('pagelet_collapsed');
			if (pagelets) {
				for (id in pagelets) {
					if (pagelets[id]) { 
						var e=$(id);
						if (e) {
							addClass(e,"bfb_pagelet_closed");
						}
					}
				}
			}
		}
		
		// Friend Tracker
		// --------------
		(function() {
			try {
				if (options && options.get('show_friend_tracker')) {
					trace("Adding Friend Tracker");
					var clear = function() {
						options.set('friend_tracker.unfriended',{});
						loadContent();
					}
					var loadContent = function(force) {
						var t = time();
						html( $('better_fb_friend_tracker_pagelet'), "Loading..." );
						get_remote_content('typeahead_new', function(result) {
							var friends = options.get('friend_tracker') || {'friends':{},'unfriended':{}};
							if (typeof friends.friends=="undefined") { friends.friends={}; }
							if (typeof friends.unfriended=="undefined") { friends.unfriended={}; }
							var old_friends = friends.friends;
							var unfriended = friends.unfriended;
							var count = 0;
							var friend_list = parse(result.replace(/for\s*\(\s*\;\s*\;\s*\)\s*\;/,''),"Friend Tracker");
							if (!friend_list.payload || !friend_list.payload.entries) { trace("Friend tracker returned invalid data!"); return false; }
							friend_list = friend_list.payload.entries;
							trace("Friend list length="+friend_list.length);
							if (friend_list && friend_list.length>5) {
								var current_friends = {};
								for (i=0;i<friend_list.length;i++) {
									if (friend_list[i].type=="user") { // only users
										count++;
										var id = friend_list[i].uid;
										var name = friend_list[i].text;
										var f = {'name':name,'added':t};
										// User wasn't my friend before
										if (typeof old_friends[id]=="undefined") {
											// Add them into the list of my friends!
											old_friends[id] = f;
										}
										// Maintain a list of all current friends
										current_friends[id] = f;
										// Forcefully delete any unfriends who are now friends
										delete unfriended[id];
									}
								}
								trace("Current # friends="+count);

								// Now loop through all my old_friends, to see if they no longer exist in current_friends
								var h = "";
								for (var id in old_friends) {
									if (typeof current_friends[id]=="undefined") {
										// They unfriended you! Bastards!
										unfriended[id] = old_friends[id];
										unfriended[id].deleted = t;
										unfriended[id].id = id;
										delete old_friends[id];
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
									}
									else {
										h += '&nbsp;&nbsp;&nbsp;<a href="/profile.php?id='+id+'">'+f.name+'</a> <span class="'+timestampClass+'">'+ago(f.deleted,t)+'</span><br>';
									}
								}
								if (h) {
									h = "You are no longer friends with:<br>"+h;
									h += "<br>(Note: Occasionally Facebook will report incorrect data to this script, and the users above are actually still your friend. Please verify the data above by clicking on the friend's name.)";
								}
								else if (options.get('show_friend_tracker_no_activity_msg')) {
									h = "No activity (When you are unfriended, names will show up here)";
								}
								html( $('better_fb_friend_tracker_pagelet'), h );
								
								// Update total friend count
								html( $('better_fb_friend_tracker_pagelet_title_after'), " ("+(count-1)+")" );
								
								// Finally, save the details!
								options.set('friend_tracker',friends);
							}
						},null,force);
					}
					
					// Only insert if it doesn't already exist!
					if ($('better_fb_friend_tracker_pagelet')==null) {
						// A "Friend Tracker" sidebar will notify if anyone unfriended you
						insertAtPosition( feed_right_column, createSidebarSection({ title:'Friend Tracker',content:'Loading...',id:'better_fb_friend_tracker_pagelet',close_pref:'show_friend_tracker',links:[ {linktext:'Clear',linkonclick:clear }, {linktext:'Refresh',linkonclick:function(){loadContent(true);} } ] } ), 2 );
						onIdLoad('better_fb_friend_tracker_pagelet', function(){ setTimeout(loadContent,10); });
					}
				}
			} catch(e) { add_error("Friend Tracker Error",e.toString()); }
		})();

/*
		// Friend Activity
		// -----------------
		(function() {
			// Only insert on home screen
			if (!QS(document,'body.home')) { return; }
			try {
				if (options && options.get('show_friend_activity') && document.querySelectorAll) {	
					trace("Adding Friend Activity");
					var last_seen = options.get('friend_activity_last_seen');
					var new_last_seen = last_seen;
					var debuginfo = debugmsg("Last Seen: "+last_seen);
					
					// Define the function that does the loading
					var loadContent = function(force) {
						var contentArea = $('better_fb_friends_pagelet');
						html( contentArea, "Loading..." );
						var iframe = document.createElement('iframe');
						iframe.className="bfb_iframe";
						var url = remote_content.friend_activity.url;
						iframe.src = url;
						iframe.addEventListener('load',function(e) {
							var d = e.target.contentDocument;
							var process = function(container) {
								var h = "";
								if (container==null) {
									h = "A Facebook error occured while loading content. Hopefully they will fix this soon! (This is not a Social Fixer error). Src: <a href=\""+url+"\">"+url+"</a>";
								}
								else {
									if (d && d.querySelectorAll) {
										// For each friend, get their name and what was updated
										var names = d.querySelectorAll(".friendsDashboard .objectListItem .UIImageBlock_Content a");
										var updates = d.querySelectorAll(".friendsDashboard .objectListItem .auxiliary span.highlight");
										var times = d.querySelectorAll(".friendsDashboard .objectListItem .auxiliary abbr");
										var pics = d.querySelectorAll(".friendsDashboard .objectListItem .img");
										var show_pics = options.get('friend_activity_show_pics');
										var show = true;
										var hide_text = options.get('friend_activity_hide_text');
										for (var j=0; j<names.length; j++) {
											var unique = trim(names[j].innerHTML)+"/"+trim(updates[j].innerHTML);
											if (j==0) {
												// Record the most recent one in case of "clear"
												new_last_seen = unique;
												debuginfo += debugmsg("New Last Seen:"+new_last_seen);
											}
											if (last_seen && last_seen==unique) {
												show = false;
											}
											var update = updates[j].innerHTML;
											var show_this = show;
											var debug_class = "";
											if ( hide_text && (new RegExp(hide_text,"i").test(update))) {
												show_this = false;
											}
											if (!show_this && DEBUG) {
												debug_class="debug_small";
												show_this = true;
											}
											if (show_this) {
												var pic = (show_pics)?'<img src="'+pics[j].src+'" class="bfb_friend_activity_img">':'';
												h += _template('<div class="bfb_clear %6%">%5%<h4 class="bfb_h4"><a href="%1%">%2%</a></h4>&nbsp;&nbsp;&nbsp;&nbsp;<span class="bfb_update">%3%</span> - <span class="'+timestampClass+'">%4%</span></div>', names[j].href, names[j].innerHTML, update, times[j].innerHTML, pic, debug_class);
											}
										}
									}
								}
								if (!h) {
									h = "No activity";
								}
								options.multiset( {'friend_activity_content':h,'friend_activity_last_update':time() } );

								// Remove the iframe
								if (iframe && iframe.parentNode) { iframe.parentNode.removeChild(iframe); }

								html( contentArea, ((DEBUG)?debuginfo:"")+h );
							}
							onElementContent('pagelet_friends',process,d);
						},false);
						var pagelet = $('better_fb_friends_pagelet');
						if (pagelet) {
							append(pagelet,iframe);
						}
					}
					var clear = function() {
						last_seen = new_last_seen;
						options.multiset({'friend_activity_last_seen':new_last_seen,'friend_activity_last_update':0},true,loadContent);
						if (DEBUG) { debuginfo=""; }
					}
					
					// Only insert if it doesn't already exist!
					if ($('better_fb_friends_pagelet')==null) {
					
						insertAtPosition( feed_right_column, createSidebarSection({ title:'Friends Activity',content:'Loading...',id:'better_fb_friends_pagelet',close_pref:'show_friend_activity',links:[ {linktext:'Clear',linkonclick:clear },{linktext:'Refresh',linkonclick:loadContent} ] } ), 3 );
						// check to see if we need to load new content
						var interval = options.get('friend_activity_interval');
						var last = options.get('friend_activity_last_update');
						if (DEBUG) { debuginfo += debugmsg("Last update "+Math.ceil((time()-last)/60000)+" minutes ago"); }
						if (last==null || (time()-last > (interval*60*60*1000))) {
							loadContent();
						}
						else {
							// Just show previous content!
							var c = options.get('friend_activity_content');
							if (DEBUG) { debuginfo += debugmsg('Showing cached content'); }
							html( $('better_fb_friends_pagelet'), ((DEBUG)?debuginfo:"")+c );
						}
					}
				}
			} catch(e) { add_error("Friend Activity Error",e.toString()); }
		})();
*/


		// =================================================
		// Show Ajax-Loaded Right Panels
		// =================================================
		function pagelet_box(col,pagelet_id,title,url,ttl,sidebar_options,use_cache,debug) {
			debug = debug || "";
			var display = function(content) {
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
				
//				appendhtml(section,'<div class="bfb_debug">'+debug+'</div>');
				insertFirst( col, section );
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
			}

			// Check for cached content
			var content_key = userid+'/cache/'+pagelet_id;
			var ttl_key = userid+'/cache_ttl/'+pagelet_id;
			getValue([content_key,ttl_key],[null,null],function(vals) {
				debug += "<br>userid="+userid;
				debug += "<br>pagelet_id="+pagelet_id;
				debug += "<br>use_cache="+use_cache;
				debug += "<br>time="+time();
				debug += "<br>stored ttl="+vals[ttl_key];
				if (use_cache && vals[ttl_key] && time()<vals[ttl_key]) {
					debug += "<br>CACHE USED";
					if (vals[content_key]) {
						display(vals[content_key]);
					}
				}
				else {
					ajax({'method':'GET','headers':{},'url':url,'onload':function(res) { 
						if (res && typeof res.responseText!="undefined") {
							debug += "<br>Ajax response received";
							var s = trim(res.responseText);
							setValue(content_key,s);
							setValue(ttl_key, "" + (time()+(ttl*60*1000)));
							if (s) {
								display(s);
							}
						}
					}});
				
				}
			});
		}

		// Insert a "Donate" box on the right every so often
		// -------------------------------------------------
		var sfx_donate_check_time = options.get('sfx_donate_check_time');
		var show_donate = true;
		if (sfx_donate_check_time==0) {
			sfx_donate_check_time = time() + 1000*60*60*24*7; // 1 week
			options.set('sfx_donate_check_time',sfx_donate_check_time);
			show_donate = false;
		}
		if (!options.get('sfx_no_donate') && !options.get('sfx_donated') && show_donate && (sfx_donate_check_time>0) && (time() > sfx_donate_check_time)) {
			pagelet_box(feed_right_column,'bfb_donate_pagelet','Support Social Fixer!',protocol+'//SocialFixer.com/pagelet_donate.php?donate_check_time='+time(),1);
		}
		
		// Check for new SFX Messages
		// --------------------------
		if (options.get('check_for_messages')) {
			var t = time();
			var message_check_interval = options.get('message_check_interval');
			var show_message = options.get('show_message');
			var min_since_last_check = (t-options.get('last_message_check'))/ (1000*60);
			var use_cache = true;
			if (options.get('last_message_check')==0) {
				// Initial install, wait 1 day
				options.set('last_message_check',time()+(1000*60*60*24), false);
				options.set('show_message',false,false);
				options.save();
				show_message = false;
			}
			else if (show_message || (min_since_last_check > message_check_interval)) {
				var last_message_id = options.get('last_message_id');
				if (min_since_last_check > message_check_interval) {
					options.set('last_message_check',time(),false);
					options.set('show_message',true,false);
					options.save();
					use_cache = false;
				}
				pagelet_box(feed_right_column,'bfb_message_pagelet','Social Fixer Message',protocol+'//SocialFixer.com/pagelet_message.php?last_message_check='+t+'&last_message_id='+last_message_id, (message_check_interval-.01), null, use_cache );
			}
		}
	
		// Tips of the Day
		// ---------------
		if (options.get('tips_of_the_day')) {
			var t = time();
			var tip_check_interval = 60*24;
			var show_current_tip = options.get('show_current_tip');
			var min_since_last_check = (t-options.get('last_tip_check'))/ (1000*60);
			var use_cache = true;
			var debug = "<br>show_current_tip="+show_current_tip;
			debug += "<br>tip_check_interval="+tip_check_interval;
			debug += "<br>min_since_last_check="+min_since_last_check;
			if (show_current_tip || (min_since_last_check > tip_check_interval)) {
				var last_tip_id = options.get('last_tip_id');
				debug += "<br>last_tip_id="+last_tip_id;
				if (min_since_last_check > tip_check_interval) {
					options.set('last_tip_check',time(),false);
					options.set('show_current_tip',true,false);
					options.save();
					use_cache = false;
				}
				var close_options = {'close_pref':'tips_of_the_day', 'close_msg':'Are you sure you want to close and no longer see any Social Fixer Tips of the Day? If you only want to hide this tip, click the Close button instead!'};
				pagelet_box(feed_right_column,'bfb_tip_pagelet','Social Fixer Tip of the Day',protocol+'//SocialFixer.com/pagelet_tip.php?last_tip_id='+last_tip_id, (tip_check_interval-1), close_options, use_cache, debug );
			}
		}
		
		/*UPDATECHECK*/
		// For update checking
		if (options.get('check_for_updates')) {
			var t = time();
			var update_check_interval = options.get('update_check_interval');
			var show_update = options.get('show_update');
			var hrs_since_last_check = (t-options.get('last_update_check'))/ (1000*60*60);
			var use_cache = true;
			var debug = "<br>show_update="+show_update;
			debug += "<br>update_check_interval="+update_check_interval;
			debug += "<br>hrs_since_last_check="+hrs_since_last_check;
			if (show_update || (hrs_since_last_check > update_check_interval)) {

				if (hrs_since_last_check > update_check_interval) {
					options.set('last_update_check',time(),false);
					options.set('show_update',true,false);
					options.save();
					use_cache = false;
				}
				var check_version = version;
				if (options.get('version_ack') > version) {
					check_version = options.get('version_ack');
				}
				var beta_check = options.get('check_for_beta_updates');

				var close_options = {'close_pref':'check_for_updates', 'close_msg':'Are you sure you want to close this message and NOT get notifications of updates? This is NOT recommended! You may end up using an old version of Social Fixer that stops working correctly as Facebook changes!'};
				pagelet_box(feed_right_column,'bfb_update_pagelet','Social Fixer Update Available!',protocol+'//SocialFixer.com/pagelet_update.php?update_type='+SCRIPT_TYPE+'&version='+check_version+'&beta='+beta_check, ((update_check_interval*60)-1), null, use_cache, debug );
			}
		}
		/*/UPDATECHECK*/		
		
	});

	// LEFT COLUMN CONTENT
	// ===================
	// This content is dependent on the "type-ahead" content being loaded, so do that right away
	function attachLeftColumnContent() {
		trace("attachLeftColumnContent()");
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
				var d = el('div','clearfix uiHeader uiHeaderNav uiHeaderTopBorder',{innerHTML: _template('<div id="bfb_nav_%1%" class="lfloat"></div><div class="rfloat" id="bfb_nav_rfloat_%1%"></div><ul class="uiSideNav uiSideNavSection uiFutureSideNavSection bfb_uiSideNav" id="bfb_nav_content_%1%" style="max-height:%4%px;overflow-y:auto;overflow-x:hidden !important;%3%"></ul>',id,title,(open?"":"display:none;"),max_height ) });
				append(d.firstChild,h4);
				insertAtPosition(nav,d,position);
				if (allowedit) {
					var rfloat = $('bfb_nav_rfloat_'+id);
					if (rfloat) {
						var a_id = 'bfb_nav_edit_'+id;
						var a = el('a',null,{id:a_id,innerHTML:'edit'},{click:function(e){editNavSection(e,id,type,sortprop,processfunc,imgclass);}});
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
			trace("Creating "+title);
			var target = options.get(id+'_new_window')?"_blank":"";
			var content = createNavSection(nav,id,title,type,allowedit,sortprop,processfunc,imgclass);
			if (content) {
				var count = populateConnectionSection(content,id,type,sortprop,processfunc,imgclass);
				var h4 = $('bfb_nav_title_'+id);
				if (h4) { h4.innerHTML += ' <span id="bfb_nav_count_'+id+'" class="countValue">('+count+')</span>'; }
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
						var div = el('div',null,{innerHTML:item.text});
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
			trace("Inserting side navigation items");
			try {
				var container = QS(nav,'.uiSideNav');
				if (container) {
					if (options.get('show_nav_all_connections')) {
						append(container, el('li','sideNavItem stat_elem',null,null,createNavLink('All Connections','/friends/?filter=ac',null,'navItem_ff','')) );
					}
					if (options.get('show_nav_edit_friends')) {
						append(container, el('li','sideNavItem stat_elem',null,null,createNavLink('Edit Friend Lists','/friends/?filter=afp',null,'navItem_ff','')) );
					}
					if (options.get('show_nav_write_a_note')) {
						append(container, el('li','sideNavItem stat_elem',null,null,createNavLink('Write A Note','/editnote.php?new',null,'navItem_2347471856','_blank')) );
					}
					if (options.get('show_nav_pages_i_admin')) {
						append(container, el('li','sideNavItem stat_elem',null,null,createNavLink('Pages I Admin','/pages/manage/',null,'navItem_app_2309869772','')) );
					}
					if (options.get('show_nav_unblock_applications')) {
						append(container, el('li','sideNavItem stat_elem',null,null,createNavLink('Unblock Applications','/settings/?tab=privacy&section=applications&field=blocked_apps',null,'navItem_apps','')) );
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
						trace("Payload not found in connections!"); 
						connections = null;
						return false;
					}
					if (connections) {
						if (connections.length==0) {
							trace("ERROR: 3rd Party cookies probably not allowed!");
						}
						trace("Making sure left column exists before continuing...");
						onIdLoad('leftCol',function(nav) {
							trace("leftCol loaded");
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
	function show_wizard(msg,data) {
		// Data should hold an array of wizard steps to show the user
		if (data.length>0) { // Intro step + "done" step are required
			(function() {
				var total_steps = data.length;
				var current_step = 1;
				var current_dialog = null;
				var show_step = function(step_number) {
					var step_data = data[step_number-1];
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
					current_dialog = show_dialog(content,"Social Fixer "+((installed_version>0 && installed_version<version)?"Update":"Setup")+" Wizard ("+(step_number)+" of "+(total_steps)+")",null,null,footer);
				};
				show_step(current_step);
			})();
		}
		else {
			options.set('version',version);
		}
	}
	guided_setup_action = function() { rpc("wizard",{current_version:0,upgrade:false},show_wizard); }
	var installed_version = options.get("version");
	if (installed_version==0) {
		rpc("wizard",{current_version:0,upgrade:false},show_wizard);
	}
	else if (options.get('show_version_changes') && installed_version<version) {
		// Display a message if the user has upgraded to the latest version
		rpc("wizard",{current_version:installed_version,new_version:version,upgrade:true},show_wizard);
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
	// Auto-expand Apps
	// ==================================================================
	if (options.get('expand_nav_apps')) {
		bind(window,'load',function() {
			onIdLoad("bookmarks_menu",function(bm) {
				if (bm.querySelector) {
					setTimeout( function(){clickLink(bm.querySelector(".navMoreLess .navMoreText"));}, 1000);
				}
			});
		});
	}

	// ==================================================================
	// Show some help if on the SFX Page
	// ==================================================================
	if (options.get('show_page_post_message')) {
		onIdLoad('profile_stream_composer',function(composer) {
			if ($('bfb_page_post_message')==null) {
				var retries = 10;
				var insert_message = function() {
					var page_id = QS(document,'input[name="user_id"],input[name="xhpc_targetid"],input[name="targetid"]','value');
					if (!page_id && --retries>0) { setTimeout(insert_message,500); return; }
					if (page_id && (page_id=="174424289341" || page_id=="119314224763738")) { // SFX, SFX Dev
						rpc('page_post_help',{page:page_id},function(message,data) {
							if (data.message && !($('bfb_page_post_message'))) {
								var insertPoint = QS(composer,'.showOnceInteracted');
								insertFirst( insertPoint, el('div','bfb_page_post_message',{id:'bfb_page_post_message'},null,data.message) );
							}
						});
					}
				};
				insert_message();
			};
		});
	}

	// ==================================================================
	// REMOVE RECENT ACTIVITY
	// ==================================================================
	if (options.get('remove_recent_activity') || options.get('auto_remove_recent_activity')) {
		var show_message = options.get('show_remove_recent_activity_message');
		var duration = options.get('remove_recent_activity_message_duration');
		var recent_activity_error_logged = false;
		onSelectorLoad('.UIRecentActivity_Header, .uiStreamMinistoryGroup .header',function(o) {
			var auto = options.get('auto_remove_recent_activity');
			var handler = function() {
				var total_removed = 0;
				QSA(o.parentNode,'.uiCloseButton, .uiSelectorButton',function(cb) {
					var ajaxify = cb.getAttribute('ajaxify');
					var ajaxify_args = ajaxify.split('?')[1];
					var li = getParentByClass(cb,'uiUnifiedStory');
					var msg = QS(li,'.uiStreamMessage[data-ft]');
					// If there is meta-data associated with this entry, check it
					if (msg) {
						var dataft = msg.getAttribute('data-ft');
						if (dataft) {
							dataft = JSON.parse(dataft);
							if (dataft && 47==dataft.sty && 174424289341==dataft.object_id) {
								trace("Found Recent Activity of liking SFX. Did not remove.");
								return;
							}
						}
					}
					// Figure out what kind of Recent Activity this is
					if (ajaxify) {
						var m = ajaxify.match(/story_type=(\d+)/i);
						if (m && m.length>0) {
							var sty = m[1];
							// Check to see if we should remove this type of story
							if (sty==20) { if (!options.get('remove_recent_activity_write_on_wall')) { return; } }
							else if (sty==107) { if (!options.get('remove_recent_activity_comment_on_status')) { return; } }
							else if (sty==46) { if (!options.get('remove_recent_activity_comment_on_photo')) { return; } }
							else if (sty==47) { if (!options.get('remove_recent_activity_like_page')) { return; } }
							else if (sty==32) { if (!options.get('remove_recent_activity_comment_on_link')) { return; } }
							else if (sty==21) { if (!options.get('remove_recent_activity_added_friend')) { return; } }
							else if (sty==3) { if (!options.get('remove_recent_activity_relationship_change')) { return; } }
							else { if (!options.get('remove_recent_activity_added_other')) { return; } }
						}
					}
					if (ajaxify && !QS(li,".reportHide") && (ajaxify.indexOf("remove_content")>0 || ajaxify.indexOf("action_key=remove_content")>0)) {
						var data = {
							'__a':1,
							'profile_fbid':url_param(ajaxify,'profile_fbid'),
							'post_form_id':$Env('post_form_id'),
							'ministory_key':url_param(ajaxify,'ministory_key'),
							'story_type':url_param(ajaxify,'story_type'),
							'fb_dtsg':$Env('fb_dtsg'),
							'post_form_id_source':'AsyncRequest',
							'confirmed':1
						};
						var encoded_data = encode_url_params(data);
						li.style.opacity=.5;
						var remove_url = url_prefix+'/ajax/minifeed.php';
						trace("Removing recent activity: "+remove_url);
						ajax({'method':'POST',headers:{'Content-type':'application/x-www-form-urlencoded','Connection':'close'},'url':remove_url,'data':encoded_data,'onload':function(res) {
							var story_text = QS(li,'.ministoryMessage,.UIRecentActivity_Body','innerHTML');
							if (res && res.responseText && res.responseText.indexOf('"success":1')>0) {
								if (show_message) {
									quickmessage("Recent Activity removed: "+story_text,duration);
								}
								var body = QS(li,'.uiStreamMessage, .UIRecentActivity_Body');
								if (body && !options.get('erase_after_recent_activity_remove')) {
									li.style.opacity=1;
									li.style.textDecoration="line-through";
									body.style.textDecoration="line-through";
								}
								else {
									removeChild(li);
								}
							}
							else {
								if (!res) { trace("Recent Activity removal error: No response!"); }
								if (res && !res.responseText) { trace("Recent Activity removal error: No responseText!"); }
								li.style.backgroundColor='red';
								li.style.opacity=1;
								var remove_url_with_params = remove_url+'?'+encode_url_params(data);
								var cookies_msg = "";
								if (res.responseText && res.responseText.toLowerCase() && res.responseText.toLowerCase().indexOf("not logged in")>-1) {
									cookies_msg = "<br><div style=\"border:1px solid white;\"><b>This may be caused by 3rd party cookies being disabled in your browser! Please enable to let this feature work!<br>See <a href=\"http://SocialFixer.com/faq.php#3rdpartycookies\">this FAQ entry</a></b></div><br>";
								}
								if (!recent_activity_error_logged) {
									recent_activity_error_logged = true;
									add_error("Error removing Recent Activity: "+story_text+cookies_msg+"<br><div style=\"font-size:10px;background-color:#eee;font-family:arial;max-height:100px;overflow:auto;color:black;\">(data-ft:"+msg.getAttribute('data-ft')+")<br>The request sent was:<br><a href=\""+remove_url_with_params+"\">"+remove_url_with_params+"</a><br>The response from the server was:<br>"+res.status+":"+htmlescape(res.responseText)+"</div>");
								}
							}
						}});
						total_removed++;
					}
					else {
						if (!ajaxify) { trace("Recent Activity removal error: ajaxify attribute on X"); }
						if (QS(li,".reportHide")) { trace("Recent Activity removal error: reportHide element found under X"); }
						if (ajaxify.indexOf("remove_content%5D=1")<0) { trace("Recent Activity removal error: ajaxify attribute does not have remove_content section:"+ajaxify); }
						trace(li.innerHTML);
					}
				});
			}
			if (auto) { setTimeout( function() { handler(o); }, 500); }
			else if (QS(o.parentNode,'.uiCloseButton')) {
				append(o,el('a',null,null,{click:handler},' - remove all activity'));
			}
		},true);
	}

	// ==================================================================
	// Change CHAT images to NAME
	// ==================================================================
	if (options.get('chat_images_to_names')) {
		watchDOMNodeInserted('.fbChatMessageGroup .img',function(img) {
			var name=img.title;
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
		var image_preview_click = function(){ 
			if (image_preview_link) {
				try{ window.location.href=image_preview_link; }
				catch(e){}
			}
		};
		var last_preview_src = null;
		var capture = true;
		bind(document,'mouseover',function(e) {
			image_preview_target = target(e);
			var delayed_image_preview_target = image_preview_target;
			var tn = image_preview_target.tagName;
			var src = null;
			if (tn && (tn=="IMG" || tn=="I")) {
				var src=null;
				var preview_src = null;
				if (tn=="IMG") {
					src = image_preview_target.src;
				}
				else if (tn=="I" && image_preview_target.style && image_preview_target.style.backgroundImage) {
					src = image_preview_target.style.backgroundImage.replace(/^\s*url\s*\(\s*['"]?/,'').replace(/(\.jpg)['"]?.*$/,'$1');
				}
				// See if the parent node is a link to go to the actual pic
				if (/s320x320/.test(src)) {
					preview_src = src.replace(/s320x320/,"s720x720");
				}
				else if (/\d+\/[aqts][\d_]+\.jpg/.test(src)) {
					preview_src = src.replace(/(\d+)\/[asqt]([\d_]+\.jpg)/,"$1/n$2");
				}
				else if (/\d+_([asqt])\.jpg/.test(src)) {
					preview_src = src.replace(/(\d+)_([astq])\.jpg/,"$1_n.jpg");
				}
				else if (/safe_image.php/.test(src)) {
					preview_src = url_param(src,"url");
				}
				else if (/app_full_proxy.php/.test(src)) {
					preview_src = url_param(src,"src");
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
							image_preview_loading = el('div','bfb_image_preview_msg',null,null,'Loading preview...');
							append(image_preview,image_preview_loading);
							img_image_preview = el('img','bfb_image_preview_img bfb_window_height100',{'src':preview_src});
							img_image_preview.style.display="none";
							bind(img_image_preview,'load',function(){image_preview_loading.style.display="none";img_image_preview.style.display="block";});
							bind(img_image_preview,'click',image_preview_click);
							append(image_preview,img_image_preview);
							append(document.body,image_preview);
							last_preview_src = preview_src;
						}
						else {
							image_preview.style.display="block";
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
				if (image_preview!=null) {
					image_preview.style.display="none";
				}
				image_preview_target = null;
			}
		},capture);
	}
	
	// ========================================================
	// Fix Comments
	// ========================================================
	if (options.get('fix_comments')) {
		onSelectorLoad('textarea.enter_submit',function(ta) {
			if (!parent(ta,'.tickerDialogContent') && !parent(ta,'.uiContextualDialog')) {
				removeClass(ta,'enter_submit');
			}
		},'both');
	}
	
	// ========================================================
	// Reply To Comments
	// ========================================================
	if (options.get('comment_reply')) {
		(function() {
			var float_textarea = options.get('comment_reply_float_textarea');
			var first_name_only = options.get('comment_reply_first_name_only');
			
			var restore_textarea = function() { if(!add_comment){return;} removeClass(add_comment,"bfb_floating_comment"); add_comment.style.left = add_comment.style.top = ""; add_comment=null; }
			var last_reply_text = null;
			var selected_text = null;
			var restore_ta = true;
			var comment = null, add_comment = null;
			bind(document,'keydown',function(e) { if(e.keyCode==27) { removeClass(comment,"bfb_reply_active_comment"); restore_textarea(); } })
			var do_reply = function(e) {
				var a = target(e), text;
				var new_comment = getParentByClass(a,'uiUfiComment');
				var replying_to_same_comment = (new_comment==comment);
				comment = new_comment;
				var post = parent(a,'.uiUnifiedStory,.mall_post,#photocomment');
				if (!post) { 
					post = parent(a,'form.commentable_item');
					if (!post) { return; }
				}
				QS(post,'.uiUfiAddComment',function(ac) {
					add_comment = ac;
					if (float_textarea) {
						var anchor_position = offset(a);
						var offsetparent_position = offset(post);
						addClass(ac,"bfb_floating_comment");
						var left = anchor_position.left - 50;
						var top = anchor_position.top + 12;
						if (current_style(post,'position')!="static") {
							left = left - offsetparent_position.left;
							top = top - offsetparent_position.top;
						}
						ac.style.left = left+"px";
						ac.style.top = top+"px";
					}
					var actor_name = QS(comment,'.actorName','innerHTML');
					if (first_name_only) {
						actor_name = actor_name.replace(/\s.*/,'');
					}
					text = replying_to_same_comment ? '' : '@'+actor_name+' : ';
					var quoted = false;
					if (selected_text && selected_text.replace) {
						// "Quote" text
						quoted = true;
						selected_text = selected_text.replace(/([^\n]{45,45}.*?\s)/gm,"$1\n");
						selected_text = selected_text.replace(/^/gm,"> ");
						if (trim(selected_text).length>0) {
							text += (replying_to_same_comment?"":"\n")+selected_text+"\n\n";
						}
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
								ta.value = ta.value+prefix+text;
							}
							last_reply_text = text;
							setCaretToPos(ta,ta.value.length);
							press_key(ta,' ','keydown');
						}
						wait_for_focus();
						var comment_box = getParentByClass(ta,'commentBox');
						if (comment_box && !QS(ac,'.bfb_reply_note_first')) {
							insertAfter( el('div','bfb_reply_note bfb_reply_note_first',null,null,'<input type="checkbox" style="height:10px;width:10px;padding:0;" tabindex="-1" class="comment_reply_first_name_only" '+(first_name_only?'checked':'')+'>Reply with first names only'), comment_box );
							QS(ac,'.comment_reply_first_name_only',function(a) {
								bind(a,'click',function(){ 
									first_name_only=!first_name_only;
									if (first_name_only) {
										ta.value = ta.value.replace(/(\@\w+)(\s+[^:]+):/g,"$1:");
									}
									options.set('comment_reply_first_name_only',first_name_only);
								}); 
							});
						}
						if (float_textarea) {
							if (comment_box && !QS(ac,'.bfb_reply_note_esc')) {
								insertAfter( el('div','bfb_reply_note bfb_reply_note_esc',null,null,'(Presione Esc para retorna la ventana de comentario a su localización original) <a class="bfb_stop_floating" style="text-decoration:underline;" tabindex="-1" href="#">Disable floating replies</a>'), comment_box );
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
							bind(QS(ac,'.enter_submit_target'),'click', function() { restore_textarea(); } );
						}
					});
				});
			}
			onSelectorLoad('.commentActions',function(ca) { 
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
	// Auto-expand all Questions comments
	// ========================================================
	if (options.get('auto_expand_questions_comments')) {
		onSelectorLoad('#fbQuestionRepliesPager a.uiMorePagerPrimary',function(a) {
			clickLink(a);
		});
	}

	// ========================================================
	// Anonymize Screens
	// ========================================================
	if (options.get('enable_anonymize')) {
		if (!$('bfb_anonymize_screen')) {
			var a = el('a',null,{href:'#',title:'Change the screen to anonymize all users (for screenshots, etc)',id:'bfb_anonymize_screen'},{
				click:function() { 
					var namehash = {};
					var namecount = 1;
					var grouphash = {};
					var groupcount = 1;
					var eventhash = {};
					var eventcount = 1;
					QSA(document,'.uiProfilePhoto,.profilePic,img.bfb_friend_activity_img,.UIImageBlock_MED_Image img,#navAccountPic img,a.UIImageBlock_ENT_Image img',function(i) {
						if (i.parentNode && i.parentNode.href && i.parentNode.href.indexOf("photo.php")>=0) { return; } // photo, not profile pic
						if (i.src && i.src.indexOf("external.ak.fbcdn")>=0) { return; } // External img
						i.src=protocol+"//"+host+"/images/wizard/nuxwizard_profile_picture.gif";
					});
					QSA(document,'.actorName a,a.actorName,a.ego_title,span.blueName,a.passiveName,.fbxWelcomeBoxName,*[data-hovercard*="user"],a[href*="/profile.php"],#navAccountName',function(o) {
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
					hide_bfb_menu();
					return false; 
				}
			},'Anonymize Screen');
			var li = el('li');
			append(li,a);
			add_option_item(li,null,null,'middle');
		}
	}
	
	// ========================================================
	// Make elements Hideable
	// ========================================================
	bind(window,'click',function() {
		QSA(document,'.bfb_show_menu',function(o) { removeClass(o,'bfb_show_menu'); });
	});
	function make_hideable(selector,friendly_name,pref,inverse) {
		onSelectorLoad(selector,function(o) {
			add_hideable(o,friendly_name,pref,inverse);
		});
	}
	function add_hideable(o,friendly_name,pref,inverse,frame_element,top,left) {
		if (pref && (!inverse && options.get(pref)) || (inverse && !options.get(pref)) ) { hide(o); return; }
		if (typeof hidden_elements[friendly_name]!="undefined") { hide(o); return; }
		if (typeof hidden_elements_x[friendly_name]!="undefined") { return; }
		addClass(o,'bfb_hideable');
		var position = current_style(o,'position');
		bind(o,'mouseover',function() { 
			if (position!="relative" && position!="absolute" && position!="fixed") {
				o.style.position="relative";
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
				if (confirm('Are you sure you want to hide "'+friendly_name+'"?\nTo show it again, go into Options->Hidden and enable it')) {
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

	// ========================================================
	// Undo link redirection
	// ========================================================
	if (options.get('prevent_link_redirection')) {
		window.addEventListener('mousedown',function(e){
			var a = parent(target(e),'a');
			if (a && a.tagName && a.tagName=="A" && a.removeAttribute) {
				a.removeAttribute('onmousedown');
			}
		},true);
	}

	// ========================================================
	// Tickers
	// ========================================================
//	make_hideable('#pagelet_rhc_ticker .fbFeedTicker','Live Activity Ticker','hide_happening_now');
	make_hideable('#rightCol .fixedAux .canvasSidebar','Game Icon Sidebar','hide_game_sidebar');
	make_hideable('#rightCol .fixedAux .canvasTicker','Game Ticker','hide_game_ticker');
	
	// ========================================================
	// Chat
	// ========================================================
	subscribe('chat-options/initialized',function(a,chat_options){
		// Disable Sidebar
		if (options.get('chat_disable_sidebar')) {
			subscribe('sidebar/initialized',function(a,ChatSidebar){
				if (ChatSidebar && ChatSidebar.isViewportCapable && ChatSidebar.disable) {
					ChatSidebar.isViewportCapable = function(){return false;};
					ChatSidebar.disable();
				}
			});
		}

		// Force Offline
		if (options.get('chat_force_offline') && chat_options.sendVisibility) {
			chat_options.sendVisibility(false);
		}

		// Show all online users
		var order_by_online_status = options.get('chat_group_by_status');
		if (options.get('chat_show_all_online')) {
			subscribe('chat-display/loaded',function(a,display){
				var compact = options.get('chat_compact');
				onSelectorLoad('ul.fbChatOrderedList',function(list){ 
					list.style.display="none";
					var bfb_chat_list = null;
					var previous_status;
					var render_chat_item = function(id) {
						var uinfo = unsafeWindow.ChatUserInfos[id];
						var status = unsafeWindow.AvailableList.get(id);
						
						if (status==1) { status = 'idle'; }
						else if (status==3) { status='mobile'; return; }
						else { status='active'; }
						
						if (uinfo) {
							var style = '';
							if (order_by_online_status && previous_status!=null && status!=previous_status) {
								style = "border-top:1px solid #aaa;";
							}
							previous_status=status;
							var h = '<a style="'+style+'" class="clearfix" href="javascript:void(chatDisplay._focusTab('+id+'))" rel="ignore"><img class="pic" src="'+uinfo.thumbSrc+'"/><span class="name">'+uinfo.name+'</span><i class="status img sp_3xd8gf sx_94f6be"></i></a>';
							return el('li','item '+status,null,{click:function(){display._focusTab('+id+');}},h);
						}
						return null;
					};
					var update_chat_list = function() {
						if (!bfb_chat_list) {
							bfb_chat_list = el('ul','fbChatOrderedList bfb_chat_ordered_list'+(compact?' compact':''));
							append(list.parentNode,bfb_chat_list);
						}
						var ids = unsafeWindow.AvailableList.getAvailableIDs().sort( function(a,b) {
							try {
								var status_a = unsafeWindow.AvailableList.get(a);
								var status_b = unsafeWindow.AvailableList.get(b);
								if (!order_by_online_status || (status_a==status_b)) {
									// Sort by name
									return (unsafeWindow.ChatUserInfos[a].name < unsafeWindow.ChatUserInfos[b].name) ? -1: 1;
								}
								// Sort by status
								return (status_a > status_b) ? -1 : 1;
							}
							catch(e) { return 1; }
						} );
						html(bfb_chat_list,'');
						previous_status=null;
						for (var i=0; i<ids.length; i++) {
							var li = render_chat_item(ids[i]);
							if (li) { append(bfb_chat_list,li); }
						}
						resize_chat();
						// Update the count of users online
						var count = ids.length;
						var label = QS(document,'#fbDockChatBuddylistNub .fbNubButton .label');
						if (label) {
							var label_count = QS(label,'.count');
							if (!label_count) {
								label_count = el('span','count');
								append(label,label_count);
							}
							html(label_count,' (<strong>'+count+'</strong>)');
						}
					}
					var resize_chat = function() {
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
					bind(window,'resize',resize_chat);
					update_chat_list();
					subscribe(['buddylist/count-changed','buddlyist/availability-changed','buddylist/updated'], update_chat_list);

				},false);
			});
		}
		
		// Add an "Options" link to the chat title bar
		var title = QS(document,'#fbDockChatBuddylistNub .titlebarTextWrapper');
		if (title) {
			var a = el('a',null,null,{click:function(e){better_fb_options('tab_chat');e.stopPropagation();}},'[options]',{'color':'white','cssFloat':'right','marginRight':'20px'});
			append(title,a);
		}
	});

	// ========================================================
	// Arbiter Logging
	// ========================================================
	if (false) {
		unsafeWindow.ArbiterMonitor = {
			record: function(type,i,c,a) {
				if ( unsafeWindow.console && type!='done' && !/^function_ext/.test(i) && !(/^bootload/.test(i)) && !(/^phase/.test(i)) ) {
					unsafeWindow.console.log('Arbiter Event:',type,i,c,a);
				}
			},
			customReport:function(){},initUE:function(){},getInternRef:function(){},
			pause:function(){}, 
			resume:function(){},
			initUA:function(){},
			getActFields:function(){}
		};
	}

	// Stop scrolling in the ticker preview from bubbling up and scrolling the page
	var ticker_scroll_handler = function(e){
		var d = e.detail || e.wheelDelta || 0;
		var o = target(e);
		var s = parent(o,'.uiScrollableAreaWrap');
		if (d<0 && s.scrollTop==0) {
			e.preventDefault();  
		}
		else if (d>0 &&  s.scrollTop==s.scrollHeight-s.offsetHeight) {
			e.preventDefault()  
		}
	}
	onSelectorLoad('.tickerDialogContent',function(scrollable) {
		bind(scrollable,'DOMMouseScroll',ticker_scroll_handler );
		bind(scrollable,'mousewheel',ticker_scroll_handler );
	},false);

	
}); // End of load() function

})(); // End of wrapper anonymous function
