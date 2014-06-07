// ==UserScript==
// @name       	FB Unseen
// @namespace  	NONE
// @version    	1.0
// @description	Prevents Facebook from sending 'currently typing' and 'seen' chat notifications
// @match      	http://www.facebook.com/*
// @match      	https://www.facebook.com/*
// @run-at	document-start
// @copyright  	
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