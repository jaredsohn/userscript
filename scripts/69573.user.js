//{{GM}}<source lang="javascript">
// GMHttpRequest
// version 0.1
// Copyright (c) 2007, Jim R. Wilson (wilson.jim.r at gmail)
// Released under The MIT License (http://www.opensource.org/licenses/mit-license.php)
//
// Purpose:
//    This userscript injects a class called GMHttpRequest which behaves
//    like the native XMLHttpRequest, except with none of the cross-domain
//    limitations.
//
// WARNING:
//    This script must be kept limited to TRUSTED PAGES ONLY.  Allowing
//    GMHttpRequest to execute within arbitrary pages is DANGEROUS since
//    it opens the user to all kinds of cross-domain vulnerabilities.
//    GMHttpRequest is designed as a proof-of-concept only, and should
//    not be relied upon directly for anything other than development
//    work and research.
//
// --------------------------------------------------------------------
// Copyright (c) 2007 Jim R. Wilson
// 
// Permission is hereby granted, free of charge, to any person 
// obtaining a copy of this software and associated documentation 
// files (the "Software"), to deal in the Software without 
// restriction, including without limitation the rights to use, 
// copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the 
// Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be 
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
// OTHER DEALINGS IN THE SOFTWARE.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           GMHttpRequest
// @namespace      com.jimbojw
// @include        http://jimbojw.com/examples/gmhttprequest_demo.html
// ==/UserScript==

// Inject a reference to the GM_xmlhttpRequest function directly into the TRUSTED PAGE
// Note: This is what makes the script so dangerous - please see the WARNING above for more info.
unsafeWindow.GM_xmlhttpRequest = GM_xmlhttpRequest;

// Inject the GMHttpRequest Class
var script = document.createElement('script');
script.appendChild(document.createTextNode(new String( (function() { (function() {

// Class code borrowed from Mootools (with modifications)
// See: http://docs.mootools.net/Class/Class.js
var Class = function(properties){
    var klass = function(){
        if (this.initialize) return this.initialize.apply( this, arguments[0] !== null ? arguments : null );
        return this.abort ? this.abort.apply(this) : this;
    };
    klass.prototype = properties;
    klass.constructor = arguments.callee;
    return klass;
};

var GMXHRWrapper = new Class({
    headers: { },
    initialize: function( instance, method, url ) {
        this.instance = instance;
        this.method = method;
        this.url = url;
    },
    request: function( options ) {
        if (!options) options = { data: null };
        var instance = this.instance;
        options.url = this.url;
        options.method = this.method.toUpperCase();
        options.headers = this.headers;
        options.onreadystatechange = function(responseDetails) {
            var ghr = window.GMHttpRequest.instances[instance];
            if (!ghr) return;
            for (var i in responseDetails) ghr[i] = responseDetails[i];
            if (ghr.readyState==4) {
                ghr.responseXML = null;
                try {
                    var ctype = ghr.getResponseHeader('Content-type').match( /^(.*?)(;|$)/ )[1];
                    if ( ctype=='text/xml' || ctype=='application/xml' || ctype.match(/\+xml$/) ) {
                        var dp = new DOMParser();
                        ghr.responseXML = dp.parseFromString( ghr.responseText, ctype );
                    }
                } catch (err) { }
            }
            if (ghr.onreadystatechange) ghr.onreadystatechange();
        };
        if (options.method.match( /^(GET|HEAD)$/ ) && options.data) {
            var ch = options.url.indexOf('?')==-1 ? '?' : '&';
            options.url += ch + options.data;
        }
        GM_xmlhttpRequest( options );
    },
    setRequestHeader: function( header, value ) {
        header = header.toLowerCase();
        this.headers[header] = value;
    }
});

window.GMHttpRequest = new Class({
    abort: function(){
        if (typeof this._ghrwrapper != 'undefined') delete this._ghrwrapper;
        if (typeof this.instance != 'undefined') {
            window.GMHttpRequest.instances[this.instance] = null;
            delete this.instance;
        }
        this.readyState = this.status = 0;
        this.responseText = this.statusText = this.responseHeaders = '';
        this.responseXML = null;
    },
    getAllResponseHeaders: function(){ return this.responseHeaders; },
    getResponseHeader: function( header ){
        header = header.toLowerCase();
        var pairs = this.responseHeaders.split("\n");
        for (var i=0; i<pairs.length; i++) {
            if (pairs[i].substr(0,header.length).toLowerCase() == header) {
                var m = pairs[i].match( /.*: (.*)/ );
                return m ? m[1] : null;
            }
        }
        return null;
    },
    onreadystatechange: null,
    open: function(method, url, async, user, password){
        this.abort();
        this.readyState = 1;
        this.instance = window.GMHttpRequest.instances.length;
        window.GMHttpRequest.instances.push( this );
        if (this._ghrwrapper) delete this._ghrwrapper;
        this._ghrwrapper = new GMXHRWrapper( this.instance, method, url );
        if (method.toLowerCase()=='post') this.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
    },
    send: function( data ){
        this._ghrwrapper.request( { data : data } );
    },
    setRequestHeader: function(header, value){
        if (this.readyState != 1 || !header || !value) return;
        this._ghrwrapper.setRequestHeader( header, value );
    }
});
window.GMHttpRequest.instances = [];
window.GMHttpRequest.version = '0.1';

})() }) ).replace( /^function \(\) \{\s([\s\S]*)\s\}/m, '$1' )));
document.getElementsByTagName('head')[0].appendChild(script);

// </source>