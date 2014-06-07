// ==UserScript==
// @name          Kongregate Chat-scripts Framework
// @namespace     tag://kongregate
// @description   Required by all of my Kongregate scripts!
// @include       http://www.kongregate.com/*
// @author        Ventero
// @version       1.9
// @date          05.04.2013
// @require       http://kong.ventero.de/updates/54245.js
// @grant         unsafeWindow
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 07/22/09
// Copyright (c) 2009-2012 Ventero, licensed under MIT/X11 license
// http://www.opensource.org/licenses/mit-license.php
var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);
var ready = false;

// cross window communication
window.addEventListener("message", function onMessage(e) {
	if(e.data != "__scripts_ready" || e.origin != location.origin) return;

	ready = true;
	window.removeEventListener("message", onMessage);
}, false);

injectScript(function bootstrap(dom){
	var target = ("holodeck" in dom ? "holodeck:ready" : "dom:javascript_loaded");
	document.addEventListener("dataavailable", function listener(e) {
		if(e.eventName != target) return;

		ready = true;
		window.postMessage("__scripts_ready", location.origin);
		document.removeEventListener("dataavailable", listener);
	}, false);
}, 0, true);

function injectScript(fn, to, force){
	if(!ready && !force) {
		setTimeout(function(){injectScript(fn, to)}, 100);
		return;
	}
	try{
		var inject;
		if(force ||
			 /Chrome/i.test(navigator.appVersion) ||
			 typeof unsafeWindow === "undefined"){
			var script = document.createElement("script");
			var source = fn.toString();
			if(source[source.length - 1] == ";"){
				source = source.substring(0, source.length - 1);
			}

			script.type = "text/javascript";
			script.textContent = "//<![CDATA[\n" +
			                   "(" + source + ")(window);\n" +
			                   "//]]>";

			setTimeout(function(){document.body.appendChild(script)}, to);
		}else{
			setTimeout(function(){fn(unsafeWindow);}, to);
		}

	}catch(e){console.log("Framework script: " + e)};
}
dom.injectScript = injectScript;

function init_framework(){
	if(dom.holodeck){
		dom.CDprototype = dom.ChatDialogue.prototype;
		dom.CWprototype = dom.ChatWindow.prototoype;
		dom.CRprototype = dom.ChatRoom.prototype;
		dom.Holoprototype = dom.Holodeck.prototype;
	}

	addScript = document.createElement("script");
	addScript.innerHTML = "function ajax(a, b){new Ajax.Request(a,b)};\n";
	addScript.innerHTML+= "function wrap(a, b){return a.wrap(b)};\n";
	document.body.appendChild(addScript);
}

if(window.opera){
	if(window.localStorage){
		window.GM_setValue = function(a, b){
			localStorage.setItem(a, b);
		}
		window.GM_getValue = function(a, b){
			var ret = localStorage.getItem(a);
			return (ret == null?b:ret)
		}
		window.GM_deleteValue = function(a){
			localStorage.removeItem(a);
		}
	} else {
		window.GM_setValue = function(){};
		window.GM_getValue = function(){};
		window.GM_deleteValue = function(){};
	}
}else if(/Chrome/i.test(navigator.appVersion) || typeof unsafeWindow === "undefined"){
	var s = document.createElement("script");
	s.id = "injectScriptDiv";
	s.innerHTML = "dom = window;\n";
	s.innerHTML+= "if(typeof GM_setValue === 'undefined'){\n";
	s.innerHTML+= "	window.GM_setValue = function(a,b){localStorage.setItem(a,b)}\n";
	s.innerHTML+= "	window.GM_getValue = function(a,b){var r=localStorage.getItem(a);return (r==null?b:r)}\n";
	s.innerHTML+= "	window.GM_deleteValue = function(a){localStorage.removeItem(a)}\n";
	s.innerHTML+= "}";
	s.onclick = function(){return dom.injectScript};
	document.body.appendChild(s);
}

injectScript(init_framework, 0);
