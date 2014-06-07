// ==UserScript==
// @name           自动沙发
// @namespace      http://vvtommy.com/douban_sha
// @description    专门给Bell做的……其他人不要用 ... by 小刺@douban
// @version        1.0
// @author         vvtommy
// @include        http://www.douban.com/group/xiandouban/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
(function(window){
	var HTTP;
	if (HTTP && (typeof HTTP != "object" || HTTP.NAME))
		throw new Error("Namespace 'HTTP' already exists");

	HTTP = {};
	HTTP.NAME = "HTTP";  
	HTTP.VERSION = 1.0; 

	HTTP._factories = [
		function() { return new XMLHttpRequest(); },
		function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
		function() { return new ActiveXObject("Microsoft.XMLHTTP"); }
	];

	HTTP._factory = null;

	HTTP.newRequest = function() {
		if (HTTP._factory != null) return HTTP._factory();

		for(var i = 0; i < HTTP._factories.length; i++) {
			try {
				var factory = HTTP._factories[i];
				var request = factory();
				if (request != null) {
					HTTP._factory = factory;
					return request;
				}
			}
			catch(e) {
				continue;
			}
		}

		HTTP._factory = function() {
			throw new Error("XMLHttpRequest not supported");
		}
		HTTP._factory(); 
	}

	HTTP.getText = function(url, callback) {
		var request = HTTP.newRequest();
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200)
				callback(request.responseText);
		}
		request.open("GET", url);
		request.send(null);
	};
	HTTP.getXML = function(url, callback) {
		var request = HTTP.newRequest();
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200)
				callback(request.responseXML);
		}
		request.open("GET", url);
		request.send(null);
	};

	HTTP.getHeaders = function(url, callback, errorHandler) {
		var request = HTTP.newRequest();
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200) {
					callback(HTTP.parseHeaders(request));
				}
				else {
					if (errorHandler) errorHandler(request.status,
												   request.statusText);
					else callback(null);
				}
			}
		}
		request.open("HEAD", url);
		request.send(null);
	};
	HTTP.parseHeaders = function(request) {
		var headerText = request.getAllResponseHeaders();
		var headers = {};
		var ls = /^\s*/;
		var ts = /\s*$/;

		var lines = headerText.split("\n");
		for(var i = 0; i < lines.length; i++) {
			var line = lines[i];
			if (line.length == 0) continue;
			var pos = line.indexOf(':');     
			var name = line.substring(0, pos).replace(ls, "").replace(ts, "");
			var value = line.substring(pos+1).replace(ls, "").replace(ts, "");
			headers[name] = value;
		}
		return headers;
	};


	HTTP.post = function(url, values, callback, errorHandler) {
		var request = HTTP.newRequest();
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200) {
					callback(HTTP._getResponse(request));
				}
				else {
					if (errorHandler) errorHandler(request.status,
												   request.statusText);
					else callback(null);
				}
			}
		}

		request.open("POST", url);
		request.setRequestHeader("Content-Type",
								 "application/x-www-form-urlencoded");
		request.send(HTTP.encodeFormData(values));
	};
	HTTP.encodeFormData = function(data) {
		var pairs = [];
		var regexp = /%20/g; 

		for(var name in data) {
			var value = data[name].toString();
			var pair = encodeURIComponent(name).replace(regexp,"+") + '=' +
				encodeURIComponent(value).replace(regexp,"+");
			pairs.push(pair);
		}

		return pairs.join('&');
	};

	HTTP._getResponse = function(request) {
		switch(request.getResponseHeader("Content-Type")) {
		case "text/xml":
			return request.responseXML;

		case "text/json":
		case "application/json": 
		case "text/javascript":
		case "application/javascript":
		case "application/x-javascript":
			return eval(request.responseText);

		default:
			return request.responseText;
		}
	};
	HTTP.get = function(url, callback, options) {
		var request = HTTP.newRequest();
		var n = 0;
		var timer;
		if (options.timeout)
			timer = setTimeout(function() {
								   request.abort();
								   if (options.timeoutHandler)
									   options.timeoutHandler(url);
							   },
							   options.timeout);

		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (timer) clearTimeout(timer);
				if (request.status == 200) {
					callback(HTTP._getResponse(request));
				}
				else {
					if (options.errorHandler)
						options.errorHandler(request.status,
											 request.statusText);
					else callback(null);
				}
			}
			else if (options.progressHandler) {
				options.progressHandler(++n);
			}
		}

		var target = url;
		if (options.parameters)
			target += "?" + HTTP.encodeFormData(options.parameters)
		request.open("GET", target);
		request.send(null);
	};

	HTTP.getTextWithScript = function(url, callback) {
		var script = document.createElement("script");
		document.body.appendChild(script);
		var funcname = "func" + HTTP.getTextWithScript.counter++;
		HTTP.getTextWithScript[funcname] = function(text) {
			callback(text);
			document.body.removeChild(script);
			delete HTTP.getTextWithScript[funcname];
		}
		script.src = "jsquoter.php" +
					 "?url=" + encodeURIComponent(url) + "&func=" +
					 encodeURIComponent("HTTP.getTextWithScript." + funcname);
	}

	HTTP.getTextWithScript.counter = 0;
	function Cookie(name) {
		this.$name = name;
		var allcookies = document.cookie;
		if (allcookies == "") return;
		var cookies = allcookies.split(';');
		var cookie = null;
		for(var i = 0; i < cookies.length; i++) {
			if (cookies[i].substring(0, name.length+1) == (name + "=")) {
				cookie = cookies[i];
				break;
			}
		}
		if (cookie == null) return;
		var cookieval = cookie.substring(name.length+1);
		var a = cookieval.split('&');
		for(var i=0; i < a.length; i++)
			a[i] = a[i].split(':');
		for(var i = 0; i < a.length; i++) {
			this[a[i][0]] = decodeURIComponent(a[i][1]);
		}
	}
	Cookie.prototype.store = function(daysToLive, path, domain, secure) {
		var cookieval = "";
		for(var prop in this) {
			if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function')) 
				continue;
			if (cookieval != "") cookieval += '&';
			cookieval += prop + ':' + encodeURIComponent(this[prop]);
		}
		var cookie = this.$name + '=' + cookieval;
		if (daysToLive || daysToLive == 0) { 
			cookie += "; max-age=" + (daysToLive*24*60*60);
		}

		if (path) cookie += "; path=" + path;
		if (domain) cookie += "; domain=" + domain;
		if (secure) cookie += "; secure";
		document.cookie = cookie;
	}
	Cookie.prototype.remove = function(path, domain, secure) {
		for(var prop in this) {
			if (prop.charAt(0) != '$' && typeof this[prop] != 'function') 
				delete this[prop];
		}

		this.store(0, path, domain, secure);
	}
	Cookie.enabled = function() {
		if (navigator.cookieEnabled != undefined) return navigator.cookieEnabled;
		if (Cookie.enabled.cache != undefined) return Cookie.enabled.cache;
		document.cookie = "testcookie=test; max-age=10000";  // Set cookie
		var cookies = document.cookie;
		if (cookies.indexOf("testcookie=test") == -1) {
			return Cookie.enabled.cache = false;
		}
		else {
			document.cookie = "testcookie=test; max-age=0"; 
			return Cookie.enabled.cache = true;
		}
	}
	var t=document.getElementsByClassName('olt')[0].getElementsByTagName('td'),i=6,getCookie=function (c_name){
			if (document.cookie.length>0){
				c_start=document.cookie.indexOf(c_name + "=");
				if (c_start!=-1){
					c_start=c_start + c_name.length+1;
					c_end=document.cookie.indexOf(";",c_start);
					if (c_end==-1){
						c_end=document.cookie.length;
					}
					return unescape(document.cookie.substring(c_start,c_end));
				}
			}
		return "";
		};
	var shafaStr=['杀花','杀','杀那个发','杀那个画','杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀','认真你就输了\r\n还是杀~','灭零','杀的就是速度','我又来鸟','这速度才能杀'];
	var dataStore=new Cookie('db_date_store'),time=new Date();
	
	if(!dataStore.last_post || ((time.getTime()-parseInt(dataStore.last_post))/1000)>30){
		while(t[i]){
			id=(t[i].previousSibling.previousSibling.previousSibling.getElementsByTagName('a')[0].href.match(/http:\/\/www\.douban\.com\/group\/topic\/([0-9]+)\//));
			if(t[i].innerHTML===''){
				HTTP.post('http://www.douban.com/group/topic/'+id[1]+'/add_comment',{ck:getCookie('ck').replace(/"/g,""),rv_comment:(shafaStr[parseInt(Math.random()*shafaStr.length)]),start:0},function(d){});
				dataStore.last_post=time.getTime();
				dataStore.store();
				break;
			}else if(parseInt(t[i].innerHTML)>98 && (parseInt(t[i].innerHTML)-99)%100===0){
				HTTP.post('http://www.douban.com/group/topic/'+id[1]+'/add_comment',{ck:getCookie('ck').replace(/"/g,""),rv_comment:'翻页',start:0},function(d){});
				dataStore.last_post=time.getTime();
				dataStore.store();
				break;
			}
			i+=4;
		}
	}
	
	setTimeout(function(){window.location=window.location;},4000);
})(window);