// XmlHttpRequestTracing
// version 0.1
// 2005-05-10 (last update 2006-01-12)
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "XmlHttpRequestTracing", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Traces XmlHttpRequest calls to the javascript console.
// More info at http://blog.monstuff.com/archives/000250.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            XmlHttpRequestTracing
// @namespace       http://blog.monstuff.com
// @description     Traces XmlHttpRequest calls to the Javascript console
//
// @include         http://select.some.domains/*
// ==/UserScript==

// todo: implement some configuration options to choose what to log
// todo: log the domain name (in addition to the path) when tracing the "open" call
// todo: log into a separate window or a pane
// todo: let users replay callbacks (maybe allowing to modify the response)
// todo: let users intercept and modify requests and responses as they go (breakpoint)

if (!GM_log) {
    alert("You need Greasemonkey 0.3 or above to use the XmlHttpRequestTracing user script");
}

var XMLHttpRequest = unsafeWindow.XMLHttpRequest;

// mystery: for some reason, doing "var oldSend = XMLHttpRequest.prototype.send;" and 
//  calling it at the end of "newSend" doesn't work...
var startTracing = function () {
    XMLHttpRequest.prototype.uniqueID = function() {
        // each XMLHttpRequest gets assigned a unique ID and memorizes it 
        //  in the "uniqueIDMemo" property
        if (!this.uniqueIDMemo) {
            this.uniqueIDMemo = Math.floor(Math.random() * 1000);
        }
        return this.uniqueIDMemo;
    }

    // backup original "open" function reference
    XMLHttpRequest.prototype.oldOpen = XMLHttpRequest.prototype.open;

    var newOpen = function(method, url, async, user, password) {
        GM_log("[" + this.uniqueID() + "] intercepted open (" + 
                    method + " , " + 
                    url + " , " + 
                    async + " , " + 
                    user + " , " + 
                    password + ")");
        this.oldOpen(method, url, async, user, password);
    }

    XMLHttpRequest.prototype.open = newOpen;

    // backup original "send" function reference
    XMLHttpRequest.prototype.oldSend = XMLHttpRequest.prototype.send;

    var newSend = function(a) {
        GM_log("[" + this.uniqueID() + "] intercepted send (" + a + ")");
        var xhr = this;
        var onload = function() { 
            GM_log("[" + xhr.uniqueID() + "] intercepted load: " + 
                    xhr.status + 
                    " " + xhr.responseText); 
        };
        
        var onerror = function() { 
            GM_log("[" + xhr.uniqueID() + "] intercepted error: " + 
                    xhr.status); 
        };
        
        xhr.addEventListener("load", onload, false);
        xhr.addEventListener("error", onerror, false);

        this.oldSend(a);
    }
    XMLHttpRequest.prototype.send = newSend;
}

// GM_registerMenuCommand("Trace XmlHttpRequest", startTracing);
startTracing();