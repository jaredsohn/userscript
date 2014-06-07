// ==UserScript==
// @name       	FB Unseen
// @namespace  	NONE
// @version    	1.0
// @description	Empeche le "Vu" du facebook
// @match      	http://www.facebook.com/*
// @match      	https://www.facebook.com/*
// @run-at	document-start
// @copyright  	
// ==/UserScript==

//  On intercepte l'ecriture du msg pour le rappeler a l envoyeur

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

//  Maintenant on fait croire au serveur que on est hors ligne

var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + Interceptor + ")(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);";

document.documentElement.appendChild(script);
document.documentElement.removeChild(script);