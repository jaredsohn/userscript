// ==UserScript==
// @name	installer safari test
// @namespace	http://userscripts.org/scripts/show/98710
// @include	http://*.the-west.*/game.php*
// @include	http://userscripts.org/scripts/review/98710
// @include	http://userscripts.org/scripts/source/98710.meta.js      
// ==/UserScript==


function handler(meta){
	var name = document.getElementById('script-name');
	var includes = document.getElementById('includes');
	var excludes = document.getElementById('excludes');
	var install = document.getElementById('install');
	var view_source = document.getElementById('view_source');
	var cancel = document.getElementById('cancel');
	name.textContent = meta.name;
	if (meta.description) {
        	var description = document.getElementById('description');
        	description.textContent = meta.description;
	}
    	meta.include && meta.include.forEach(function(rule){
        	var dd = document.createElement('dd');
        	dd.textContent = rule;
        	includes.appendChild(dd);
    	});
    	meta.exclude && meta.exclude.forEach(function(rule){
        	var dd = document.createElement('dd');
        	dd.textContent = rule;
        	excludes.appendChild(dd);
    	});
    	install.disabled = false;
    	install.onclick = function(){
        	n.safari && sendRequest({type:'install',meta:meta},end);
        	window.parent.postMessage({type:'install',meta:meta},'*');
    	};
    	view_source.onclick = function(){
        	n.safari && sendRequest({type:'view_source',meta:meta},end);
        	window.parent.postMessage({type:'view_source',meta:meta},'*');
    	};
    	cancel.onclick = function(){
        	window.parent.postMessage({type:'cancel',meta:meta},'*');
    	};
   	function end(){
        	window.parent.postMessage({type:'end',meta:meta},'*');
    	}
}

function install_response(meta) {
	window.onmessage = function (evt) {
		if (evt.data.type === 'install') {
			if (meta_json === JSON.stringify(evt.data.meta)) {
				!n.safari && sendRequest({
					type: 'install',
					meta: meta
				}, installed_response);
			}
		} else if (evt.data.type === 'view_source') {
			if (meta_json === JSON.stringify(evt.data.meta)) {
				!n.safari && sendRequest({
					type: 'view_source',
					meta: meta
				});
			}
			installed_response();
		} else if (evt.data.type === 'cancel') {
			installed_response();
		} else if (evt.data.type === 'end') {
			installed_response();
		}
	};
}

function installed_response(meta) {
	document.body.removeChild(iframe);
	iframe = null;
}


var n = this;
//alert(n.location.href);
if ((n.safari) && (n.location.href.indexOf('userscripts.org') == '-1')) { 
	var sendRequest = n.chrome ? function(data,callback)	{
	chrome.extension.sendRequest(data,callback);
		} : (function(){
	    		var eventData = {};
	  		safari.self.addEventListener('message',function(evt){
	        		(evt.name in eventData) && eventData[evt.name](evt.message);
			},false);
			return function(data, callback, name){
	        	name = name || (Date.now() + Math.random().toString(36));
	        	callback && (eventData[name] = callback);
	        	safari.self.tab.dispatchMessage(name,data);
		}
	})();
	n.safari && safari.self.addEventListener('message',function(evt){
		if(evt.name.indexOf('NinjaKit.install') === 0 && evt.message && evt.message.source){
			handler(evt.message);
		}
	},false);

	if (typeof(iframe) ==  "undefined"){
	 	var iframe = document.createElement('iframe');
		var href = "http://userscripts.org/scripts/source/98710.user.js";
		iframe.name = 'grease-installer';
		iframe.id = 'grease-installer';
		iframe.src =(n.chrome && chrome.extension.getURL('grease.html')) || (n.safari.extension.baseURI + 'grease.html');
		document.body.appendChild(iframe);
	}
	iframe.onload = function () {
		var data = {
			type: '.user.js',
			original: 'http://userscripts.org/scripts/review/98710',
			src: href
		};
		sendRequest(data, install_response, "NinjaKit.install");
	};
		//evt.preventDefault();
	var top = (window.innerHeight - 350) / 2;
	var left = (window.innerWidth - 500) / 2;
	iframe.setAttribute('style', '-webkit-box-shadow: 4px 4px 4px rgba(0,0,0,0.5);z-index:300;border-radius:10px;background:-webkit-gradient(linear, left top, left bottom, from(rgba(246,246,246,0.7)), to(rgba(202,202,202,0.7)));position:fixed;height:350px;width:500px;left:' + left + 'px;top:' + top + 'px;');
}

/*
//----------------------------

var g = this;
var sendRequest = g.chrome ? function(data,callback)	{
chrome.extension.sendRequest(data,callback);
} : (function(){
		var eventData = {};
	safari.self.addEventListener('message',function(evt){
    		(evt.name in eventData) && eventData[evt.name](evt.message);
	},false);
	return function(data, callback, name){
    	name = name || (Date.now() + Math.random().toString(36));
    	callback && (eventData[name] = callback);
    	safari.self.tab.dispatchMessage(name,data);
}
})();
g.chrome && (window.onmessage = function(evt){
	if (evt.data) {
		handler(evt.data);
	}
});
g.safari && safari.self.addEventListener('message',function(evt){
	if(evt.name.indexOf('NinjaKit.install') === 0 && evt.message && evt.message.source){
		handler(evt.message);
	}
},false);
function handler(meta){
	var name = document.getElementById('script-name');
	var includes = document.getElementById('includes');
	var excludes = document.getElementById('excludes');
	var install = document.getElementById('install');
	var view_source = document.getElementById('view_source');
	var cancel = document.getElementById('cancel');
	name.textContent = meta.name;
	if (meta.description) {
        	var description = document.getElementById('description');
        	description.textContent = meta.description;
	}
    	meta.include && meta.include.forEach(function(rule){
        	var dd = document.createElement('dd');
        	dd.textContent = rule;
        	includes.appendChild(dd);
    	});
    	meta.exclude && meta.exclude.forEach(function(rule){
        	var dd = document.createElement('dd');
        	dd.textContent = rule;
        	excludes.appendChild(dd);
    	});
    	install.disabled = false;
    	install.onclick = function(){
        	g.safari && sendRequest({type:'install',meta:meta},end);
        	window.parent.postMessage({type:'install',meta:meta},'*');
    	};
    	view_source.onclick = function(){
        	g.safari && sendRequest({type:'view_source',meta:meta},end);
        	window.parent.postMessage({type:'view_source',meta:meta},'*');
    	};
    	cancel.onclick = function(){
        	window.parent.postMessage({type:'cancel',meta:meta},'*');
    	};
   	function end(){
        	window.parent.postMessage({type:'end',meta:meta},'*');
    	}
}

if (typeof(iframe) ==  "undefined"){
	 	var iframe = document.createElement('iframe');
		var href = "http://userscripts.org/scripts/source/92414.user.js";
		iframe.name = 'grease-installer';
		iframe.id = 'grease-installer';
		iframe.src =(g.chrome && chrome.extension.getURL('grease.html')) || (g.safari.extension.baseURI + 'grease.html');
		document.body.appendChild(iframe);
}
		iframe.onload = function () {
			var data = {
				type: '.user.js',
				original: 'http://userscripts.org/',
				src: href
			};
			sendRequest(data, install_response, "NinjaKit.install");
		};
	

	//evt.preventDefault();

	var top = (window.innerHeight - 350) / 2;
	var left = (window.innerWidth - 500) / 2;
	iframe.setAttribute('style', '-webkit-box-shadow: 4px 4px 4px rgba(0,0,0,0.5);z-index:300;border-radius:10px;background:-webkit-gradient(linear, left top, left bottom, from(rgba(246,246,246,0.7)), to(rgba(202,202,202,0.7)));position:fixed;height:350px;width:500px;left:' + left + 'px;top:' + top + 'px;');

	function install_response(meta) {
		if (g.safari) { //safari.self.tab.dispatchMessage('ninjakit.install.meta', meta); 
		} else {
			var meta_json = JSON.stringify(meta);
			var s = document.createElement('script');
			s.textContent = '(' +
			function (meta) {
				var i = document.getElementById('grease-installer');
				i.contentWindow.postMessage(meta, 'chrome-extension://gpbepnljaakggeobkclonlkhbdgccfek');
			} + ')(' + meta_json + ');';
			document.body.appendChild(s);
		}
		window.onmessage = function (evt) {
			if (evt.data.type === 'install') {
				if (meta_json === JSON.stringify(evt.data.meta)) {
					!g.safari && sendRequest({
						type: 'install',
						meta: meta
					}, installed_response);
				}
			} else if (evt.data.type === 'view_source') {
				if (meta_json === JSON.stringify(evt.data.meta)) {
					!g.safari && sendRequest({
						type: 'view_source',
						meta: meta
					});
				}
				installed_response();
			} else if (evt.data.type === 'cancel') {
				installed_response();
			} else if (evt.data.type === 'end') {
				installed_response();
			}
		};
	}
	function installed_response(meta) {
		document.body.removeChild(iframe);
		iframe = null;
	}

 
 */