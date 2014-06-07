// ==UserScript==
// @name           XmlHttpRequest - Bypass Security
// @namespace      http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Helps bypassing the "same domain" policy, during development.
// @include        file://*
// ==/UserScript==
//
// More information at http://blog.monstuff.com/archives/000262.html

// update (2005-01-12):
// Fixed to run in Firefox 1.5 with Greasemonkey 0.6.4. Older versions are not supported anymore.

/*

// Here's a sample cross-browser code, where unsafeXMLHttpRequest can be 
// used to replace XMLHttpRequest transparently:

var req;
if(window.XMLHttpRequest) {
    req = new XMLHttpRequest();
} else if(window.ActiveXObject) {
    req = new ActiveXObject(...);
}
if(req) {
    req.onload = function() { ... use req.status, req.statusText, req.responseText and req.responseXML ... }
    req.onerror = function() { ... use req.status and req.statusText ... }
    req.open("GET", url, true);
    req.send(true);
}
*/


document.title += " - with unsafe XMLHttpRequest";


function unsafeXMLHttpRequest() {
    var self = this;
    
    self.headers = new Array();

    self.open = function(_method, _url) {
        self.method = _method;

        if (!_url.match(/^http/)) {
            alert("You need to specify absolute urls when using the 'XMLHttpRequest - Security Bypass' script");
            throw("You need to specify absolute urls when using the 'XMLHttpRequest - Security Bypass' script");
        }

        self.url = _url;
    }

    self.setRequestHeader = function(_header, _value) {
        self.headers[_header] = _value;
    }

    self.send = function(_data) {
        self.oldOnload = self.onload;
        self.oldOnerror = self.onerror;
        self.oldOnreadystatechange = self.onreadystatechange;

        self.data = _data;

        self.onload = function(responseDetails) {
            copyValues(responseDetails);
            if (self.oldOnload) { self.oldOnload(); }
        }

        self.onerror = function(responseDetails) {
            copyValues(responseDetails);
            if (self.oldOnerror) { self.oldOnerror(); }
        }

        self.onreadystatechange = function(responseDetails) {
            copyValues(responseDetails);
            if (self.oldOnreadystatechange) { self.oldOnreadystatechange(); }
        }

        function copyValues(responseDetails) {
            if (responseDetails.readyState) {
                self.readyState = responseDetails.readyState;
            }

            if (responseDetails.status) {
                self.status = responseDetails.status;
            }

            if (responseDetails.statusText) {
                self.statusText = responseDetails.statusText;
            }

            if (responseDetails.responseText) {
                self.responseText = responseDetails.responseText;
            }
            if (responseDetails.responseHeaders) {
                self.responseHeaders = responseDetails.responseHeaders;
            }
            if (self.responseText) {
                try {
                    var dp = new XPCNativeWrapper(window, "DOMParser()");
                    var parser = new dp.DOMParser();
                    self.responseXML = parser.parseFromString(self.responseText, 'text/xml');
                } catch (ex) { }
            }
        }

        GM_xmlhttpRequest(self);
    }
    
    self.abort = function() {
        alert("XMLHttpRequest - Bypass Security doesn't support the 'abort' method yet.");
    }
    
    self.getAllResponseHeaders = function() {
        alert("XMLHttpRequest - Bypass Security doesn't support the 'getAllResponseHeaders' method yet.");
    }
    
    self.getResponseHeader = function(_header) {
        var headers = self.parseHeaders(self.responseHeaders);
        var value = headers[_header];
        return value;
    }
    
    self.overrideMimeType = function() {
        alert("XMLHttpRequest - Bypass Security doesn't support the 'overrideMimeType' method yet.");
    }

    self.parseHeaders = function (headers) {
        if (self._responseHeaders) { return self._responseHeaders; }

        var ret = new Array();
        var lines = headers.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var sepIndex = lines[i].indexOf(':');
            if (sepIndex > 0) {
                var header = lines[i].substring(0, sepIndex);
                var value = lines[i].substring(sepIndex + 1);
                value = value.replace(/^\s+/, '');
                ret[header] = value;
            }
        }

        self._responseHeaders = ret;
        return ret;
    }
}

unsafeWindow.XMLHttpRequest = unsafeXMLHttpRequest;

