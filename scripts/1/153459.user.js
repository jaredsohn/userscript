// ==UserScript==
// @name           Better Facebook
// @namespace      http://userscripts.org/users/86416
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
Better Facebook
(c) 2009-2011 Matt Kruse
http://BetterFacebook.net
*/
var version = 5.951;
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
//	unsafeWindow.console.log(JSON.stringify(props),props);
	GM_xmlhttpRequest(props);
}

// If showing the "Likebox" for BFB in FB, add some styles to control it before exiting
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
var showerror_container;
var show_errors = true;
function showexception(e) { var str = e.toString(); if(e.lineNumber){ str+=" line #"+e.lineNumber; } showerror(str); }
function showerror(msg,data) { if (show_errors) { if (data){msg+='<div class="bfb_data">'+(htmlescape(data).replace(/\n/g,"<br>"))+'</div>';} showusermessage(msg); } }
function showusermessage(msg) {
	if (!showerror_container) {
		addGlobalStyle('.bfb_error_container { position:fixed; z-index:999; top:5px; right:5px; width:300px; background-color:#cc5555; border:1px solid black; -moz-border-radius: 10px; -webkit-border-radius: 10px; border-radius: 10px; padding:5px; font-size:18px; color:white; text-align:center; max-height:800px; overflow:auto; } '+
			'.bfb_error_container .bfb_note { font-size:12px; } '+
			'#bfb_error_close { float:right; cursor:pointer; } '+
			'.bfb_error { border:1px solid #ccc; padding:2px; margin:5px; background-color:white; -moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px; font-size:12px; color:black; text-align:left; } '+
			'.bfb_error .bfb_data { max-height:150px; overflow:auto; font-size:10px; border:1px solid #ccc; } '+
			'#bfb_error_link { text-decoration:underline; color:#ccccff; }');
		showerror_container = el('div','bfb_error_container',{id:'bfb_error_container'},null,"<img src=\""+delete_img+"\" id=\"bfb_error_close\">Better Facebook Error!<br><div class=\"bfb_note\">(These errors may be disabled in Options-&gt;Debug)</div><div class=\"bfb_note\">See the <a href=\"http://BetterFacebook.net/faq.php\">FAQ</a> for help!</div>");
		append(document.body,showerror_container);
		bind('bfb_error_close','click',function() { showerror_container.style.display="none"; });
	}
	var m = el('div','bfb_error',null,null,msg);
	append(showerror_container, m);
	showerror_container.style.display="block";
	m.scrollIntoView();
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
		var content = '<div id="bfb_trace_window_header">BFB Debug Window <img src="https://s3.amazonaws.com/BFB/close_red_x.gif" style="cursor:pointer;float:right;" onclick="w=document.getElementById(\'bfb_trace_window\');if(w){w.style.display=\'none\';}"><br>';
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
function removeClass(o,re) {if(!o){return;} if (!hasClass(o,re)) { return; } if (typeof re=="string") { re = new RegExp("(^|\\s)"+re+"(\\s|$)"); } o.className = o.className.replace(re,' '); }function getParentByTag(el,tn){ tn=tn.toLowerCase();while(el=el.parentNode) { if(el && el.tagName && tn==el.tagName.toLowerCase()) { return el; } } return null; }
function toggleClass(o,cn) {if(!o){return;} if(hasClass(o,cn)) { removeClass(o,cn); } else { addClass(o,cn); } }function getParentByClass(el,cn){ if (hasClass(el,cn)){return el;} while(el=el.parentNode) { if(hasClass(el,cn)) { return el; } } return null; }
function parent(el,selector){ if (!el||!el.parentNode){return null;} if(!selector){return el.parentNode;} if (matchesSelector(el,selector)){return el;} while(el=el.parentNode) { if(matchesSelector(el,selector)) { return el; } } return null; }
function parentChain(o){var s="";while(o){s+=outerHTML(o);o=o.parentNode;}return s;}function prev(o,tag){if(!o){return null;}while(o=o.previousSibling){if(o.tagName==tag){return o;}}return null;}
function outerHTML(o,esc){if(!o || !o.tagName){return (esc?"&lt;&gt;":"<>");}return (esc?"&lt;":"<")+o.tagName+(o.id?" id="+o.id:"")+(o.className?" class="+o.className:"")+(esc?"&gt;":">");}
function innerText(o){if(!o){return"";}if(typeof o.textContent!="undefined"){return o.textContent;} if(typeof o.innerText!="undefined"){return o.innerText;} return o.innerHTML;}
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
function minimessage(str,okFunc) {
	okFunc = okFunc || (function(){});
	return el('div','better_fb_mini_message',{innerHTML:str,title:'Click to close message'},{click:function() { okFunc(); this.style.display='none'; }} );
}
function quickmessage(str,duration,style) {
	duration = duration||5;
	var container = $('bfb_quickmessages');
	if (!container) {
		container = el('div',null,{id:'bfb_quickmessages'});
		append(document.body,container);
		container = $('bfb_quickmessages');
	}
	var msg = el('div','bfb_quickmessage',null,null,str);
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
	typeahead: { type:'xhr', url:url_prefix+'/ajax/typeahead_search.php?__a=1', headers:{'Content-type':'application/x-www-form-urlencoded'}, ttl:3600 }
	,friend_lists: { type:'xhr', url:url_prefix+'/friends/ajax/superfriends.php?__a=1&all_lists=true', headers:{'Content-type':'application/x-www-form-urlencoded'}, ttl:3600 }
	,group_activity: { type:'iframe', url:url_prefix+'/groups.php', ttl:3600 }
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
	//								showerror("No response received for remote content: "+type);
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
							showerror('An error occurred while trying to retrieve remote data from url: <a href="'+url+'">'+url+'</a>. The error is:<br>'+e.toString());
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
							catch (e) { showexception(e); }
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
		catch (e) { showexception(e); }
	},false);
	append(document.body,iframe);
}
function get_friend_lists(func) {
	get_remote_content('friend_lists', function(result) {
		var friend_lists = parse(result.substring(9),"Friend Lists");
		if (!friend_lists.payload || !friend_lists.payload.collections) { 
			func(null); 
			return false; 
		}
		return func(friend_lists.payload.collections);
	});
}

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
var nofbidcount = 0;
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
	if (m=a.href.match(/facebook\.[^\/]+\/(.*)/)) {
		userid = m[1];
	}
}
if (userid=="anonymous") { return; }

// ==================================================================
// GRAPH API
// ==================================================================
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
		showerror("Error retrieving Token");
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
						showerror("Graph API Error for ["+url+"]:\n"+response.error.message);
					}
				}
			} catch(e) { showexception(e); }
		}});
	};
	get_graph_token(make_request);

}

// ==================================================================
// "Reusable" Options interface
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
						showerror("Your stored preferences could not be read because they have become corrupt. Sorry, but your options been reset! This shouldn't happen again! The error was:",e.toString());
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
				<div class="bfb_tabs" id="bfb_tabs">
					<div class="bfb_tab" id="bfb_t_popular">Popular</div>
					<div class="bfb_tab" id="bfb_t_layout">Layout</div>
					<div class="bfb_tab" id="bfb_t_posts">Posts</div>
					<div class="bfb_tab" id="bfb_t_display">Display</div>
					<div class="bfb_tab" id="bfb_t_hidden">Hidden</div>
					<div class="bfb_tab" id="bfb_t_chat">Chat</div>
					<div class="bfb_tab" id="bfb_t_theme">Theme</div>
					<div class="bfb_tab" id="bfb_t_filter">Filtering</div>
					<div class="bfb_tab bfb_option_advanced" id="bfb_t_advanced">Advanced</div>
					<div class="bfb_tab bfb_option_advanced" id="bfb_t_css">CSS</div>
					<div class="bfb_tab bfb_option_advanced" id="bfb_t_debug">Debug</div>
					<div class="bfb_tab" id="bfb_t_prefs">User Prefs</div>
					<div class="bfb_tab" id="bfb_t_about">About</div>
				</div>
				<div id="bfb_options_body">
					<div class="bfb_option_body" id="bfb_t_popular_body" style="display:block;vertical-align:bottom;">
						<div class="no_hover">
							<div class="bfb_featured_option">
								<help>When you move your mouse over thumbnail images, Better Facebook will show the full-sized image in a popup, so you don't have to click on the picture to see the whole thing.</help>
								<img src="https://s3.amazonaws.com/BFB/options/image_hover.gif">
								<div class="desc">
									%show_image_previews% Show full images when hovering over thumbnails
									<br style="clear:both;">
								</div>
							</div>
							<div class="bfb_featured_option">
								<help>In February 2011, Facebook introduced a new "Light Box" photo viewer with a black background when you click on photos. If you don't like this new photo viewer, check this option to disable it.</help>
								<img src="https://s3.amazonaws.com/BFB/options/lightbox.gif">
								<div class="desc">
									%disable_theater_view% Disable the "Lightbox" (aka "Theater") photo viewer
									<br style="clear:both;">
								</div>
							</div>
							<div class="bfb_featured_option">
								<help>If you (or your friends) play Facebook games or often use Facebook applications, Better Facebook can automatically move those posts to their own tab, so they don't interrupt the flow of the rest of your feed.</help>
								<img src="https://s3.amazonaws.com/BFB/options/app.gif">
								<div class="desc">
									%tab_all_apps% Automatically move posts from Apps into their own tabs
									<br style="clear:both;">
								</div>
							</div>
							<div class="bfb_featured_option">
								<help>Facebook changed their default font size from 13px to 12px in 2010. Many users find the new font size to be too small. You can use this option to set any font size you wish.
									<br><br>
									To restore sizes to the old settings, enter a value of 13.
								</help>
								<img src="https://s3.amazonaws.com/BFB/options/fontsize.gif">
								<div class="desc">
									%enable_font_size% Change font size to %post_font_size%px for posts and %comment_font_size%px for comments
									<br style="clear:both;">
								</div>
							</div>
							<div class="bfb_featured_option">
								<help>When you post comments on friends' status, like pages, or take other actions on Facebook, one-line "Recent Activity" posts will appear in your profile and let others know what you are up to. Enable this option to automatically remove these posts every time you visit your profile.<br><br>In the Display tab, you can select exactly which types of stories to delete, while preserving others.</help>
								<img src="https://s3.amazonaws.com/BFB/options/recent_activity.gif">
								<div class="desc">
									%auto_remove_recent_activity% Auto-remove Recent Activity posts from my profile
									<br style="clear:both;">
								</div>
							</div>
							<div class="bfb_featured_option">
								<help>By default, when entering comments, clicking Enter will submit the comment. Enable this option to restore the old functionality, where Enter = New Line, and a Comment button exists to post the message.</help>
								<img src="https://s3.amazonaws.com/BFB/options/comments.gif">
								<div class="desc">
									%fix_comments% Fix "Enter" key behavior to be a newline when adding comments
									<br style="clear:both;">
								</div>
							</div>

							<div class="bfb_featured_option">
								<help>Facebook groups "Top Stories" into a section at the top of the page. This option gets you back to a purely chronological feed, and removed the section headers like "Top Stories" or "Earlier Today", etc.</help>
								<img src="https://s3.amazonaws.com/BFB/options/most_recent.gif">
								<div class="desc">
									%chronological% Force the news feed to be chronological and hide "Top Stories"
									<br style="clear:both;">
								</div>
							</div>

							<br style="clear:both;">

							<div class="bfb_featured_option">
								<help>When enabled, a "reply" link will appear in each post comment next to Like. When clicked, you will easily be able to reply to a specific comment, tag the person you are replying to, and even quote part of their message.</help>
								<img src="https://s3.amazonaws.com/BFB/options/reply.gif">
								<div class="desc">
									%comment_reply% Add "Reply" links to comments and %comment_reply_float_textarea% float the reply box up to the comment
									<br style="clear:both;">
								</div>
							</div>
							<div class="bfb_featured_option">
								<help></help>
								<img src="https://s3.amazonaws.com/BFB/options/staticheader.gif">
								<div class="desc">
									%static_header% <b>Lock</b> the header bar at the top so it scrolls</th>
									<br style="clear:both;">
								</div>
							</div>
							<div class="bfb_featured_option">
								<help>By default, Facebook shows you 15 posts. In the footer of the page is a link to "Older Posts" which retrieves more posts. Better Facebok can auto-click this link any number of times to retrieve more posts, so you won't miss anything.</help>
								<img src="https://s3.amazonaws.com/BFB/options/older_posts.gif">
								<div class="desc">
									%auto_click_older_posts% Auto-click "Older Posts" %auto_click_more_times% times to get more posts
									<br style="clear:both;">
								</div>
							</div>
							<div class="bfb_featured_option">
								<help>
									When friends or pages post multiple posts in a small amount of time, Facebook will show just the first one, with a link to "show similar posts".<br>
									This option automatically clicks to expand these groupings of posts wherever they occur.
								</help>
								<img src="https://s3.amazonaws.com/BFB/options/expand.gif">
								<div class="desc">
									%expand_similar_posts% Automatically expand "SHOW X SIMILAR POSTS" links
									<br style="clear:both;">
								</div>
							</div>
							<div class="bfb_featured_option">
								<help>Friends change their profile pictures often, and it can be difficult to tell who is who.<br><br>Select this option to revert to names instead of pictures.</help>
								<img src="https://s3.amazonaws.com/BFB/options/chat.gif">
								<div class="desc">
									%chat_images_to_names% Change profile images in Chat to names
									<br style="clear:both;">
								</div>
							</div>
							<div class="bfb_featured_option">
								<help>When someone unfriends you, the Friend Tracker panel in the right column will alert you!</help>
								<img src="https://s3.amazonaws.com/BFB/options/unfriend.gif">
								<div class="desc">
									%show_friend_tracker% Show "Friend Tracker" to get Unfriend notifications
									<br style="clear:both;">
								</div>
							</div>
							<div class="bfb_featured_option">
								<help>Turn this option on to DISABLE all Better Facebook's features temporarily. In place of the "Options" link in the header will be an "Enable BFB" link that will restore normal operation (and access to these options)<br><br>After saving Options, the page must be refreshed for this to take effect.</help>
								<img src="https://s3.amazonaws.com/BFB/options/power.gif">
								<div class="desc">
									%disabled% POWER OFF - Disable all Better Facebook functionality (requires refresh)
									<br style="clear:both;">
								</div>
							</div>
						<br style="clear:both;">
						</div>
						%disabled_on_apps% Prevent BFB from running when playing games on apps.facebook.com<br>
						<div style="font-weight:bold;color:#880000;">Run the <a id="bfb_guided_setup" style="text-decoration:underline;" href="#" onclick="return false;">Guided Setup Wizard</a> to familiarize yourself with popular features!</div>
					</div>
					
					<div class="bfb_option_body" id="bfb_t_layout_body" style="vertical-align:bottom;">
						<table border="0">
							<tr>
								<th colspan="3" style="background-color:#3B5998;color:white;">%static_header% Lock the blue header bar so it scrolls with the page</th>
							</tr>
							<tr style="background-color:#3B5998;color:white;">
								<th style="width:200px;border:1px solid #ccc;text-align:center;">Left Column</th>
								<th style="width:300px;border:1px solid #ccc;text-align:center;">Content Area</th>
								<th style="width:250px;border:1px solid #ccc;text-align:center;">Right Column</th>
							</tr>
							<tr>
								<td style="width:200px;border:1px solid #ccc;vertical-align:top;background-color:white;">
									<div>
										<help>This makes the left column stay static on the screen so it doesn't scroll along with the page, giving you easy access to menu items</help>
										%static_left_col% Lock the left column in place
									</div>
									<div>
										<help>These links are added to the top left navigation area, under "News Feed", "Messages", etc</help>
										<b>Add Useful Links</b>:
										<div class="bfb_sub_option " style="font-family:lucida grande,tahoma,verdana,arial,sans-serif;font-size:11px;">
											%show_nav_all_connections% All Connections<br>
											%show_nav_edit_friends% Edit Friends <br>
											%show_nav_write_a_note% Write A Note <br>
											%show_nav_pages_i_admin% Pages I Admin <br>
											%show_nav_unblock_applications% Unblock Applications<br>
										</div>
									</div>
									<div>
										<b>Hide</b>:
										<div class="bfb_sub_option" style="font-family:lucida grande,tahoma,verdana,arial,sans-serif;font-size:11px;">
											%hide_left_nav_groups% Groups<br>
											<div class="bfb_sub_option">
												%hide_left_nav_groups_create% Create Group
											</div>
											%hide_left_nav_pages% Pages<br>
											%hide_left_nav_apps% Apps<br>
											%hide_chat_panel% Friends on Chat<br>
											%hide_status_updater% Name and picture
										</div>
									</div>
									<div>
										<help>These navigation sections on the left side expand to show the sub-categories when you click on them. If you want them expanded by default (for example, to see the count of "Other" messages at all times), you can do that here</help>
										<b>Auto-expand</b>:
										<div class="bfb_sub_option" style="font-family:lucida grande,tahoma,verdana,arial,sans-serif;font-size:11px;">
											%expand_nav_messages% Messages<br>
											%expand_nav_events% Events<br>
											%expand_nav_photos% Photos<br>
											%expand_nav_apps% Apps<br>
											%expand_nav_friends% Friends
												<div>&nbsp;&nbsp;&nbsp;%expand_nav_friends_full% Auto-expand all friend groups</div>
										</div>
									</div>
									<div class="">
										<help>These are handy boxes that Better Facebook can add to help you quickly jump to your favorite pages, events, etc. You can click the box title to collapse/expand them, and you can even click "edit" on each box to choose which items you don't want to see listed.</help>
										<b>Add Quick-Link Boxes</b>:
										<div class="bfb_sub_option" style="font-family:lucida grande,tahoma,verdana,arial,sans-serif;font-size:11px;">
											%show_my_pages% "My Pages"<br>
											%show_my_events% "My Events"<br>
											%show_my_groups% "My Groups"<br>
											%show_my_apps% "My Apps"
										</div>
									</div>
								</td>
								<td style="vertical-align:top;background-color:white;">
									<div>
										<help>
											The "control" panel is the box that appears at the top of feeds.<br>
											This is convenient because it holds controls to mark the entire feed as read or muted in one click. The status line shows you a count of different actions performed by Better Facebook.
										</help>
										%display_control_panel% Display the "<b>Control Panel</b>" at the top.<br>
										<img src="https://s3.amazonaws.com/Wizard/cp.png" style="width:295px;"><br>
										<help>
											As you scroll down the page, the control panel can float down with you. This is useful because when you reach the bottom of the page, you can access the control panel to mark everything as read without having to scroll back to the top of the page.
										</help>
										%float_control_panel% Float it down the page as you scroll</div>
									</div>
									<br><hr><br>
									<div>
										<img src="https://s3.amazonaws.com/Wizard/post_actions.png"><br>
										<help>When you hover over individual posts, a "tray" of action icons appears in the upper right of the post.<br>
										This option controls which icons you want to appear in the icon tray and how they should appear.
										</help>
										%show_post_actions% Show <b>Post Action Icons</b> on each post. 
									</div>
									<br><hr><br>
									<div>%stretch_wide% <b>&lt;--- Stretch the layout</b> to full screen width ---&gt;</div>

								</td>
								<td style="width:250px;border:1px solid #ccc;vertical-align:top;background-color:white;">
									<div>%hide_happening_now% Hide the "ticker" feed of friends activity</div>
									<div>%hide_game_sidebar% Hide the Game icon sidebar</div>
									<div>%hide_game_ticker% Hide friends' real-time Game activity</div>
									<div>%ticker_scroll% Scroll the ticker down with the page rather than keeping it static</div>
									<div>%unlock_right_col% Unlock the right column so it scrolls with the page</div>
									<div>
										<div style="background-color:#f3f3f3;color:#333;font-weight:bold;padding:2px;">
											<help>These are the boxes you have hidden from the right column by clicking the "X" in the title bar. To add them back to your page, click the "x" here to remove them from the "hidden" list.</help>
											Hide these boxes (click the X to unhide):
										</div>
										<div class="bfb_sub_option">%right_panels_hidden_list%</div>
									</div>
									<br>
									<div class="">
										<div style="background-color:#f3f3f3;color:#333;font-weight:bold;padding:2px;">Add these boxes:</div>
										<div>
					<!--					<div>%show_sticky_note% Show Sticky Note</div> -->
											<div>
												<help>Friend Tracker monitors your friend list and informs you when someone goes missing - usually a sign that they have unfriended you!</help>
												%show_friend_tracker% Friend Tracker (Unfriend Notifier)
												<div class="bfb_sub_option bfb_option_advanced">Refresh every %friend_tracker_interval% hours</div>
											</div>
											<div>
												<help>This box will let you know when a friend changes their profile information, such as address, favorite quotes, etc.</help>
												%show_friend_activity% Friend Activity
												<div class="bfb_sub_option bfb_option_advanced">Refresh every %friend_activity_interval% hours</div>
											</div>
											<div>
												<help>Tips of the day will appear at most once every day or two, and will tell you about features or options you may not know about!</help>
												%tips_of_the_day% Tips of the Day
											</div>
										</div>
									</div>
								</td>
							</tr>
						</table>
					</div>

					<div class="bfb_option_body" id="bfb_t_posts_body" style="vertical-align:bottom;">
						<div>
							<help>These are the action icons to show in the upper right corner of posts when you hover over them.<br><br>If you want the icons to be invisible until you hover, check the "Hid euntil hover" box.<br>When you hover over a post, the icons are semi-transparent, which is the opacity. 0=invisible, 1=no transparency. (When you move your mouse over the icons themselves, they will be fully visible). The "zoom" setting makes the icons bigger, for those browsers that support it.</help>
							%show_post_actions% Show <b>Post Action Icons</b> on each post. <br>
							Post Action Icons: %hide_post_actions_until_hover% Hide until hover / Opacity=%post_action_opacity2% / Zoom=%post_action_zoom%%
							<div>Show: 
								%show_post_action_info% Post Info
								%show_post_action_google% Google It
								%show_post_action_info_add_app% Add App
								%show_post_action_mark_unread% Mark Unread
								%show_post_action_info_mute% Mute
								%show_post_action_info_mark_read% Mark Read
							</div>
						</div>
						<div>%fix_timestamps% Fix timestamps to show actual date/time ("one hour ago" becomes "12:34am (one hour ago)")</div>
						<div>
							<help>Facebook indicates which posts it considers to be "Top Story" by a shaded triangle in the upper left posts. If you don't care which posts it thinks are Top Stories, you can hide them by enabling this option.</help>
							%hide_top_story_indicator% Hide the "Top Story" triangle indicators in the upper left of posts
						</div>
						<div>
							<help>Due to a bug in Facebook's code, some users don't see a cursor when they focus into a comment box to add a comment. This fix puts the cursor back again.</help>
							%fix_comment_cursor% Fix the missing cursor problem in comment boxes
						</div>
						<div>
							<help>Due to a bug in Facebook's code, when typing comments some users don't see text wrap to the next line until they type more characters past the end of the line. This makes it hard to see what you're typing on tne next line. This fixes that problem.</help>
							%fix_comment_wrap% Fix the line wrap problem in comments as you type past the end of line
						</div>
						<div>
							<help>Facebook has a feature built in that watches your page scroll and automatically loads new posts when you get near the bottom. This cause cause Facebook to slow down, and in particular when Better Facebook is running. By default, BFB turns this feature off.</help>
							%disable_scroll_load% Disable Facebook's auto-loading of more posts as you scroll down
						</div>
						<div>
							<help>Posts by applications like games often have a link to claim a gift or item. With this option, you can force those links to open in a new tab, so you don't lose your place in the feed.<br><br>If you enable the second option, the post will also be marked as read and disappear from view, so you can concentrate on the unclaimed posts that are left.</help>
							When clicking a link in an application post, %open_app_link_in_tab% open in a new browser tab/window and %open_app_link_marks_read% automatically mark the story as read
						</div>
						<div>
							<help>Often after you comment on a post, you want it to disappear unless someone else posts a followup. This is also a great way to manage a Page if you are Admin. As you reply to user posts, they will disappear from the wall until your wall is empty and you're done!</help>
							%mark_read_on_comment% Automatically mark a post as "read" after commenting on it
						</div>
						<div>%auto_expand_comments% Auto-expand collapsed comment threads on posts by Pages so all comments are visible</div>
						<div>
							<help>When someone posts multiple times in a row, Facebook groups those together under a "Similar Posts" link. When you expand this, all the posts are shown in a group. Instead, this option will re-order those inserted posts to the correct place in the feed timeline.</help>
							%reorder% Put expanded "similar" posts in proper chronological order after expanding
						</div>
						<div>
							<help>If you only want to mark posts as read on your news feed, and not on Pages or Profiles, you can disable that here. This will make the control panel go away at the top.</help>
							%process_profiles% Process posts on Profiles and Pages, add control panel, and allow Mark As Read
							<div>(But %dont_hide_posts_on_profiles% don't hide read posts on pages/profiles)</div>
						</div>
						<div>
							<help>If you don't want to process posts on Groups, you can disable that here</help>
							%process_groups% Process posts on Group Walls, add control panel, and allow Mark As Read
						</div>
						<div>%process_recent_activity% Add post icons to "Recent Activity" posts so they can be marked read individually</div>
						<div>%expand_see_more% Auto-expand "see more" links in posts to show the full post</div>
						<div>
							<help>"Read" posts re-appear if new comments are made. You can turn that feature off entirely, or set a threshold for a number of posts to trigger it to be turned off. This is useful on posts by Pages, for example. If a post gets more than 100 comments, for example, you can automatically make it stop re-appearing in your news feed.</help>
							Hide new notification of comments (%auto_mute_all% always) or when there are more than %auto_mute_count% comments
						</div>
						<div>%hide_old_comments% Hide old (read) comments when new comments are found on a post</div>
						<div>%undo_ctrl_z% Map Ctrl+z to "undo"</div>
						<div>
							<help>When you click links to external sites from within Facebook, it first sends you through a redirection service that checks for malicious links and logs the site you are going to, then redirects you there. You should not disable this unless you are sure of what you're doing.</help>
							%prevent_link_redirection% Prevent external link redirection
						</div>
					</div>
					
					<div class="bfb_option_body" id="bfb_t_display_body" style="vertical-align:bottom;">
						<div class="">%remove_recent_activity% Add a "remove all activity" link to <b>RECENT ACTIVITY</b> blocks
								<div>
									<help>You can select only specific types of "Recent Activity" posts to remove</help>
									<b>Auto-Remove Types</b>: 
									%remove_recent_activity_write_on_wall% Wall posts 
									%remove_recent_activity_comment_on_status% Status comments
									%remove_recent_activity_comment_on_photo% Photo comments
									%remove_recent_activity_comment_on_link% Link comments
									%remove_recent_activity_like_page% "Liking" a Page 
									%remove_recent_activity_added_friend% Adding a friend 
									%remove_recent_activity_relationship_change% Relationship changes
									%remove_recent_activity_added_other% Others 
								</div>
							<div>
								<help>After Recent Activity posts are removed, a yellow message box will appear in the upper right telling you what was removed. You can disable that here.<br><br>Also, by default, the removed posts on your wall are crossed out to show they have been removed (they will be completely gone when you refresh). Instead, you can choose to completely remove them from view.</help>
								%show_remove_recent_activity_message% Show message for %remove_recent_activity_message_duration% seconds when successful
							    (%erase_after_recent_activity_remove% Erase removed items rather than cross them out)
							</div>
						</div>
						<div>
							<help>Many users have wider screens and find it convenient to always have their notifications list handy. This option puts the Notifications list on the right side of the screen on every page, for quick access. You don't have to click the Notifications icon to view the list.</help>
							<b>Pin the notifications</b> panel to the %pin_notifications_right_panel% right sidebar or the %pin_notifications% far right
						</div>
						<div>
							<help>The comments list on Questions pages is in chronological order, so in order to see new comments you have to continually expand 10 at a time. Enabling this option will auto-expand these links for you.</help>
							%auto_expand_questions_comments% Auto-expand comments on Questions post pages
						</div>
						<div>
							<help>When you move your mouse over Notification items, this option will show you a popup view of the post or picture referenced in the notification so you don't need to click the notification to navigate to the page.</help>
							%show_notification_previews% Show previews when hovering over notification list items
						</div>
						<div>%tab_count% Show post count in tabs</div>
						<div>%hide_options_icon% Hide the icon next to the Better Facebook "Options" button in the header</div>
						<div>%options_in_account% Put the "Options" link under the "Account" menu</div>
						<div>%left_align% Left align the page rather than center</div>
<!--
						<div>
							<help>The "Top News" view picks the posts it thinks you would be most interested in, so you may miss out on posts by friends. The "Most Recent" view shows you all posts, in reverse chronological order. This is the view most people prefer, and Better Facebook by default switches you there if Facebook moved you back to Top News.</help>
							%force_most_recent_feed% Force the main news feed to be "<b>Most Recent</b>" instead of "Top News"
						</div>
-->
						<div>%alternate_read_display% Show old stories as grayed out rather than hiding them completely</div>
						<div>%reload_when_mark_all_read% Reload automatically when Mark All Read is clicked</div>
						<div>
							<help>This notification box only shows up for some users</help>
							%hide_update_email% Hide the "Please update your email address" box that appears repeatedly
						</div>
						<div>%show_char_counter% Add a character count down in status update boxes with a max of %char_counter_max% characters</div>
						<div>%hide_notification_pictures% Hide profile pictures in the notification list</div>
						<div>
							<help>By default, Facebook will show you a preview of a person or Page's profile when you hover over their name. You can disable that.</help>
							%hide_hovercard% Hide information popup when hovering over user name links
						</div>
						<div>
							<help>When taking a screenshot to post ina  public place, you may not want to reveal all of your friends' names and profile pictures. The anonymizer gets added to the Account dropdown in the blue header bar, and lets you anonymize the screen. If you do not want this added, uncheck this box.</help>
							%enable_anonymize% Add an "Anonymize Screen" option to the "Account" dropdown
						</div>
					</div>
					<div class="bfb_option_body" id="bfb_t_advanced_body" style="vertical-align:bottom;">
						<div><b>These options give you complete control over lots of settings! Tweak it all you want!</b></div>
						<div>"Older Posts" selector:%older_posts_selector%</div>
						<div>
							<help>Each post on Facebook has an FBID that uniquely identifies it. Better Facebook uses this to remember which posts have been read. Unfortunately, some post types have their FBID change with each reload (I don't know why) which causes BFB to "forget" those posts. This is a list of story types that have this problem.</help>
							Story types requiring alternate FBID: %alt_fbid_types4%
						</div>
						<div>Notification preview Image max-width:%preview_img_max_width2% max-height:%preview_img_max_height2%</div>
						<div>%show_options_save_message% Show "Refresh the page" alert after saving Options</div>
						<div>Clean out data for individual posts after %comment_expire_days% days (per post) to save space in preferences</div>
						<div>%show_version_changes% Show changes after installing a new version</div>
<!-- /*UPDATECHECK*/-->
						<div>%check_for_updates% Check for script updates every %update_check_interval% hours
							<div>%check_for_beta_updates% Also check for BETA updates</div>
						</div>
<!-- /*/UPDATECHECK*/-->
						<div>%check_for_messages% Check for important Better Facebook messages every %message_check_interval% minutes</div>
						<div>%show_page_post_message% Show the Help message for new posts on the Better Facebook Page</div>
						<div>%allow_bfb_formatting% Allow posts by Better Facebook to retain html formatting</div>
						<div>Pause for %expand_similar_posts_delay%ms between clicks when expanding "Similar Posts" links</div>
						<div>Wait for %image_preview_delay% seconds before showing thumbnail previews on hover</div>
						<div>When Notifications are pinned to the right side, force it to be %pin_notifications_width% wide (ex:200px)</div>
						<div>Floating control panel opacity: %floating_cp_opacity% / Manual offset: %floating_cp_offset%px</div>
						<div>
							<help>
								When you click the Facebook logo in the upper left or any "Home" navigation item to return to your home page, Facebook actually uses an internal navigation mechanism that confuses Better Facebook and sometimes causes features to malfunction.
								 <br><br>
								 Enabling this option fixes this problem by redirecting you to the proper home page url when clicking these links.
							</help>
							</span>
							%fix_logo2% Fix navigation on the upper left logo and "News Feed" links to go to %home_url%
						</div>
						<div>%pagelet_toggle% Enable collapse/expand of boxes in right panel by clicking their headers</div>
						<div>Hide right column panels:<br>%right_panels_hidden%</div>
						<div>Hide these page sections:<br>%hidden_elements%</div>
						<div>Hide the "x" option from these page sections:<br>%hidden_elements_x%</div>
						<div>My Pages: %my_pages_new_window% Open in a new window | %my_pages_max_height%px high in position %my_pages_position%</div> 
						<div>My Events %my_events_new_window% Open in a new window | %my_events_max_height%px high in position %my_events_position%</div> 
						<div>My Groups: %my_groups_new_window% Open in a new window | %my_groups_max_height%px high in position %my_groups_position%</div> 
						<div>My Apps: %my_apps_new_window% Open in a new window | %my_apps_max_height%px high in position %my_apps_position%</div>
						<div>%show_friend_tracker_no_activity_msg% Show Friend Tracker message when there is no activity</div>
						<div>Show unfriends in Friend Tracker for %friend_tracker_duration% days</div>
						<div>%friend_activity_show_pics% Show small profile pictures in Friend Activity</div>
						<div>Hide Friend Activity if it matches pattern: %friend_activity_hide_text%</div>
						<div>Show control panel buttons: %cp_button_mark_all_read%Mark All Read
																		%cp_button_show_hide_all%Show/Hide All
																		%cp_button_mute_all%Mute All
																		%cp_button_reload%Reload
																		%cp_button_help%Help
																		%cp_show_status%Status
																		%cp_button_undo%Undo
						</div>
					</div>
					<div class="bfb_option_body" id="bfb_t_filter_body">
						<div>
							<help>Disabling filters entirely lets you debug problems or temporarily switch to an unfiltered view</help>
							%filters_enabled% Enable Filters
						</div>
						<div>
							<help>If you have defined tabs in filter rules, they will only be created if there are actually posts to move there. This is to conserve space. If you would rather have all your tabs created - every time - then enable this.</help>
							%always_show_tabs% Always show all defined tabs (even if no posts are moved there)
						</div>
						<div>
							<help>If you don't want tabs created or "hiding" rules to run on profiles and pages, disable this option</help>
							%filter_profiles% Filter posts on pages and profiles
						</div>
						<div class="bfb_option_advanced">Don't auto-tab these apps: %untab_apps%</div>
						<div class="bfb_option_advanced">Custom App list: (format:  app_id:app_name,app_id:app_name&nbsp;&nbsp;&nbsp;&nbsp;ex: 12345:MyFarm)<br>%custom_apps%</div>
						<div class="no_hover">
							<table class="bfb_filter_list" border=1 width=100%>
							<thead>
								<tr>
									<th colspan="6" id="bfb_filter_add_row">Click to add another filter: </th>
								</tr>
								<tr>
									<th><help>Select one or more specific authors to filter (hold Ctrl when clicking to select multiple). If no authors are selected, then the filter applies to post by anyone. See <a href="http://betterfacebook.net/#ff" target="_blank">Documentation</a></help>
										Author
									</th>
									<th><help>Select one or more types of posts (hold Ctrl when clicking to select multiple). If no types are selected, then the filter applies to all types of posts.  See <a href="http://betterfacebook.net/#ff" target="_blank">Documentation</a></help>
										Type
									</th>
									<th><help>Select one or more Applications (hold Ctrl when clicking to select multiple). If no applications are selected, then the filter applies to all applications.  See <a href="http://betterfacebook.net/#ff" target="_blank">Documentation</a></help>
										Application
									</th>
									<th><help>Match any text in the post body itself. For example, type in "politics" (without the quotes) to select all posts with the word politics in them. Regular expressions may also be used, for expert users. See <a href="http://betterfacebook.net/#ff" target="_blank">Documentation</a></help>
										Other
									</th>
									<th><help>Select what to do with the posts that match your critieria. For a full explanation, see the <a href="http://betterfacebook.net/#ff" target="_blank">Documentation</a>.</help>
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
					<div class="bfb_option_body" id="bfb_t_hidden_body">
						<div class="no_hover">
						Some sections of the page may be hidden by hovering over them, and clicking on the "x" that appears. You can unhide sections by removing them from the list here.
						</div>
						<div class="no_hover"><b>Hidden Page Elements</b></div>
						<div class="no_hover" style="padding:10px 0px;">
							%hidden_elements_list%
						</div>
						<div class="no_hover"><b>Page Elements With "x" Removed</b></div>
						<div class="no_hover" style="padding:10px 0px;">
							%hidden_elements_x_list%
						</div>
					</div>
					<div class="bfb_option_body" id="bfb_t_chat_body">
						<div>
							<help>Not all users have this, but many see a tall sidebar on the far right that goes all the way from the top to the bottom of the screen - but only when the screen is wide enough. This option lets you stop that bar from appearing, and instead revert to the "pop up" chat box.</help>
							%chat_disable_sidebar% Turn off the chat sidebar on the far right (if it exists) and go back to popup chat list
						</div>
						<div>
							<help>Facebook by default now shows friends it thinks you want to chat with. This restores previous behavior where all online friends are shown.</help>
							%chat_show_all_online% Show all online friends in chat list
						</div>
						<div>
							<help>Group friends by online status (active on top, idle below)</help>
							%chat_group_by_status% Group friends by online status (active on top, idle below)
						</div>
						<div>
							<help>If your chat list is tall, this will hide the profile pictures so the list is more compact.</help>
							%chat_compact% Use compact chat list (no thumbnail images)
						</div>
						<div>
							<help>If you never want to chat, but Facebook puts you back online for some reason, this will force it to logout every time you load a page.</help>
							%chat_force_offline% Automatically force chat logout on every page load		
						</div>
						<div>
							<help>If you never chat at all, you can hide the whole chat dock so you never have to see it!</help>
							%chat_hide% Hide the chat dock entirely (if you are logged in, this will NOT log you out!)
						</div>
					</div>
					<div class="bfb_option_body" id="bfb_t_theme_body">
						<div class="no_hover">
							Select a theme to change the style of Facebook. Only you will see these changes in your browser. Others visiting your page or profile will not see your theme. For questions or to develop your own theme, see <a href="http://www.facebook.com/pages/ThemesSkins-with-Better-Face-book/187087164651628">Themes/Skins with Better Face book</a>.<br>
							<iframe src="http://BetterFacebook.net/themes/select.php?current_theme=%escaped_theme_url%" style="height:270px;width:90%;border:1px solid #ccc;" frameBorder="0"></iframe>
							<br>
							<span class="bfb_option_advanced">Theme URL: %theme_url% </span><input type="button" id="bfb_minimize_options" value="Click to preview"><br>
							Note: Not all themes may be compatible with all Better Facebook options. Some themes are created by third party authors. Try them out and see what works for you!
						</div> 
					</div>
					<div class="bfb_option_body" id="bfb_t_css_body">
						<div>Insert a reference to an external stylesheet:<br>%css_url%</div> 
						<div>Custom post action "sprite" url: %sprite_url%</div>
						<div class="no_hover">Add any arbitrary CSS rules to insert into the page:<br>
						For some useful CSS code to do common things, see: <a href="http://BetterFacebook.net/css_snippets.php">CSS Snippets</a> on BetterFacebook.net<br>
						%css%</div> 
					</div>
					<div class="bfb_option_body" id="bfb_t_prefs_body">
						<div class="no_hover">All of your stored preferences, story "read" statuses, comment counts, etc are stored in the JSON format below. This can be useful for backing up your preferences. You may also copy preferences into the box and import.</div> 
						<div class="no_hover"><textarea id="bfb_user_prefs"></textarea></div> 
					</div>
					<div class="bfb_option_body" id="bfb_t_debug_body">
						<div>If things aren't working right, this is where we'll fix it!</div>
						<div>%debug% Enable Debug Mode</div>
						<div>%performance_monitor% Enable Performance Monitoring: %performance_monitor_auto_scroll% Auto-Scroll %performance_monitor_dom_insertions% Show DOM Inserts %performance_monitor_show_messages% Show Messages</div>
						<div>%show_errors% Show errors</div>
						<div>Test setting/getting preferences: <input type="button" id="bfb_debug_test_set" value="Set Pref"> <input type="button" id="bfb_debug_test_get" value="Get Pref"></div>
						<div class="no_hover">Trace Log: <i>(Copy the contents of this box along with bug reports, please!)</i></div>
						<div class="no_hover" id="bfb_tracelog">%tracelog%</div>
					</div>
					<div class="bfb_option_body" id="bfb_t_about_body">
						<div class="no_hover" style="font-size:16px !important;">
							<img src="https://s3.amazonaws.com/BFB/matt.jpg" style="float:left;margin:10px;border:1px solid black;">
							My name is <a href="http://MattKruse.com">Matt Kruse</a>, and I am the author of Better Facebook.<br><br>
							To learn more about me, my family, and this project, visit the <a href="http://BetterFacebook.net/about.php">About Me</a> page on <a href="http://BetterFacebook.net">BetterFacebook.net</a>!
							<br><br>
							<a href="http://BetterFacebook.net/donate.php" target="_blank"><img border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif"></a> to support development!
							<br><br>
							The Facebook logo under the "Better" sign in the Better Facebook logo was originally designed by <a href="http://chris.ivarson.name/">Chris Ivarson</a>.
							<br><br>
							Special thanks to the members of the <a href="http://Facebook.com/bfbdev">Better Facebook Dev</a> page for helping to find problems, helping debug them, and tirelessly testing new features!
						</div> 
					</div>
				</div>
			]]></>).toString());
			content = content.replace("%tracelog%",tracelog);
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
			if (options.get('feed_filter_show_help')) {
				var div = tbody.parentNode.parentNode;
				insertFirst( div, message('<b>Feed Filters</b> allow you to control which posts you see and how they are displayed. This powerful interface gives you full control.<br><br>When a post is displayed, it will first be checked against each filter rule below. If it matches the selections for Author, Type, Application, and Other, then the Action will be taken. You can find <b>full documentation</b> of how to use the Feed Filter <b><a href="http://BetterFacebook.net/#ff" target="_blank">on the Better Facebook web site</a></b>.<br><br><b>NOTE!</b> Using filters may slow down Facebook while posts are being processed. Using many filters may cause increased slowdown on slower computers.', function() { options.set('feed_filter_show_help',false); }) );
			}
			get_remote_content('typeahead',function(response) {
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
					var json = parse(response.substring(9),"Typeahead content");
					if (json.payload) {
						var connections = json.payload.entries;
						if (connections) {
							connections = connections.sort( function(a,b) { return (a.t>b.t)?1:-1; } );
							for (var i=0; i<connections.length; i++) {
								var c = connections[i];
								if (c.ty=="u") { friends.push(c); }
								if (c.ty=="p") { pages.push(c); }
							}
							friends = friends.sort( function(a,b) { return (a.t>b.t)?1:-1; } );
							pages = pages.sort( function(a,b) { return (a.t>b.t)?1:-1; } );
							var renderAuthorOptions = function(friendlist,pagelist,filter) {
								if (!filter || !filter.criteria) { filter = {criteria:{},actions:{}}; }
								var list = '<optgroup label="Friends">';
								for (var i=0; i<friends.length; i++) {
									list += renderOption(friends[i].i,friends[i].t,(filter.criteria.actrs && (friends[i].i in filter.criteria.actrs)));
								}
								list += '</optgroup>';
								list += '<optgroup label="Pages">';
								for (var i=0; i<pages.length; i++) {
									list += renderOption(pages[i].i,pages[i].t,(filter.criteria.actrs && (pages[i].i in filter.criteria.actrs)));
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
							showerror("No connections");
						}
					}
					else {
						showerror("No json.payload");
					}
				}
				else {
					showerror("No response!");
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
				append($('bfb_filter_add_row'),button('Add at the Top', function(){ add_filter('top'); },null));
				append($('bfb_filter_add_row'),button('Add at the Bottom',function(){ add_filter('bottom'); },null));
			});
		});
			
		this.displayOptions = function(tab_id) {
			var doc = document;
			// Scroll to the top
			scroll_to_top();
			var optionsContent = this.render(tab_id);
			var optionsWrapper = _template( ''+
		'		<div class="GM_options_wrapper_inner">'+
		'			<form name="%key%" id="form_%key%">		\n'+
		'				<div class="GM_options_header">		\n'+
		'					<div class="GM_options_buttons bfb_options_minimized_hide">		\n'+
		'						<input type="button" name="GM_options_save" id="GM_options_save" value="Save">		\n'+
		'						<input type="button" name="GM_options_cancel" id="GM_options_cancel" value="Cancel">\n'+
		'					</div>		\n'+
		'					<img id="bfb_options_icon" src="https://s3.amazonaws.com/BFB/thumb.png" style="max-height:50px;margin-right:20px;cursor:pointer;" align="left" border="0" title="Click to minimize/maximize options">		\n'+
		'					<div class="bfb_options_minimized_hide"><i>Version '+version+'</i><span style="padding-left:50px;">Official Site: <b><a href="http://BetterFacebook.net" target="_blank">BetterFacebook.net</a></b></span><br>What\'s New? See <b><a href="http://betterfacebook.net/blog/blog/category/releasenotes/" target="_blank">Release Notes</a></b></div>'+
		'					<div class="bfb_options_minimized_hide"><input id="bfb_show_advanced_options" type="checkbox" name="show_advanced_options" '+(this.get('show_advanced_options')?'checked':'')+'> <label for="bfb_show_advanced_options"><b>Advanced Options Mode</b></label></div>'+
		'				</div>		\n'+
		'				<div class="GM_options_body bfb_options_minimized_hide">		\n'+
		'						%options%		\n'+
		'				</div>		\n'+
		'				<div class="bfb_options_minimized_hide" style="text-align:center;">		\n'+
		'					<div class="GM_options_buttons" style="float:none;text-align:center;width:auto;">		\n'+
		'						<input type="button" name="GM_options_save" id="GM_options_save2" value="Save">		\n'+
		'						<input type="button" name="GM_options_cancel" id="GM_options_cancel2" value="Cancel">		\n'+
		'					</div>		\n'+
		'				</div>		\n'+
		'				<div style="float:right;" class="bfb_options_minimized_hide"><a href="http://BetterFacebook.net/faq.php#uninstall" onclick="alert(\'Before uninstalling, please review the FAQ if you are having any problems or issues. You may find the solution there. Also, I would appreciate an email at matt@mattkruse.com letting me know why you uninstalled, so I can improve BFB in the future!\');">Uninstall</a></div><div style="clear:both;"></div> \n'+
		'			</form>		\n'+
		'		</div>', {'options':optionsContent,'key':this.key} );

			var div = this.optionsDiv;
			var self = this;
			if (div==null) {
				this.optionsDiv = doc.createElement('div');
				div = this.optionsDiv;
				div.className = 'GM_options_wrapper bfb_window_height100 '+this.key+'_wrapper '+(!this.get('show_advanced_options')?'bfb_options_simple_mode':'');
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
			bind('bfb_show_advanced_options','click',function(e){ var c='bfb_options_simple_mode'; if ($('bfb_show_advanced_options').checked) { removeClass($('bfb_options'),c); } else { addClass($('bfb_options'),c); } });
			bind('bfb_options_icon','click',minimize_options);
			bind('bfb_minimize_options','click',minimize_options);
			bind('GM_options_save','click',function() { self.saveOptions(); });
			bind('GM_options_cancel','click',function() { self.cancelOptions(); apply_theme(undef,options.get('theme_url')); });
			bind('GM_options_save2','click',function() { self.saveOptions(); });
			bind('GM_options_cancel2','click',function() { self.cancelOptions(); apply_theme(undef,options.get('theme_url')); });
			bind('bfb_guided_setup','click',function(){ if(typeof guided_setup_action=="function"){guided_setup_action();} });
			append($('bfb_t_prefs_body'), button("Export Options",function(){ var json=JSON.stringify(self.prefs,function(k,v){if(k=="story_data"){return undefined;}return v;},1); if(confirm("The text box above will now be populated with your current preferences ("+json.length+" bytes). Continue?")) { $('bfb_user_prefs').value=json;} },"bfb_prefs_export_options") );
			append($('bfb_t_prefs_body'), button("Export All (including story data)",function(){ var json=JSON.stringify(self.prefs,null,1); if(confirm("The text box above will now be populated with your current preferences ("+json.length+" bytes). Continue?")) { $('bfb_user_prefs').value=json;} },"bfb_prefs_export_all") );
			append($('bfb_t_prefs_body'), button("Import",function(){ 
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
			append($('bfb_t_prefs_body'), button("Clean Story Data",function(){ if(confirm('This will prune old story data from your preferences. (This is also done automatically once a day!)')){clean_prefs();}},"bfb_prefs_clean") );
			append($('bfb_t_prefs_body'), button("Reset Prefs",function(){ 
				if(confirm('ALL OPTIONS WILL BE RESET TO THEIR DEFAULT VALUES! ARE YOU SURE?')){
					options.options.forEach(function(opt,i) {
						if (opt.name) {
							options.set(opt.name,opt['default'],false);
						}
					});
					options.save();
				}
			},"bfb_prefs_reset") );
			bind('bfb_debug_test_set','click',function() { self.set('debugtest',time()); alert("Test preference saved"); });
			bind('bfb_debug_test_get','click',function() { var v=self.get('debugtest'); if(v){ alert("Test preference set on:"+((new Date(v)).toString())); }else{alert("No saved preference found"); } });
			// Keep check boxes in sync!
			var cb_sync = function(cb) { 
				if (cb && cb.name && cb.name!="action") { QSA(document,'#bfb_options input[name="'+cb.name+'"]',function(cb2){cb2.checked=cb.checked;}); }
			};
			QSA(this.optionsDiv,'.bfb_featured_option',function(fo) {
				bind(fo,'click',function(e){ var o=e.target; if(o&&o.tagName&&o.tagName=="INPUT"){return;}; QSA(this,'input[type="checkbox"]',function(cb){ cb.checked=!cb.checked; cb_sync(cb); }); });
			});
			bind(this.optionsDiv,'click',function(e) { var o=e.target; if(o&&o.tagName&&o.tagName=="INPUT"&&o.type&&o.type=="checkbox") { cb_sync(o); } });
			
			// Add an event listener for switching tabs
			var showtab = function(e) { 
				var tabs = $('bfb_tabs');
				if (typeof e=="string") {
					var tabid = $(e).id;
				}
				else {
					var tabid = target(e).id
				}
				for(var i=0;i<tabs.childNodes.length;i++){
					removeClass(tabs.childNodes[i],'bfb_tab_selected');
				}
				addClass($(tabid),"bfb_tab_selected"); 
				$$('bfb_option_body',"this.style.display='none';",$('bfb_options_body'));
				$(tabid+"_body").style.display="block";
			}
			bind($('bfb_tabs'),'click',showtab);

			tab_id = tab_id || 'bfb_t_popular';
			showtab(tab_id);
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
}});
