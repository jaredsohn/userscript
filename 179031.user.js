// ==UserScript==
// @name        Cross-Origin Requests For jQuery
// @namespace   http://tampermonkey.net/
// @version     0.1
// @author      Jan Biniok <jan@biniok.net>
// ==/UserScript==

(function() {

var GM_XHR = function() {
    var that = this;

    that.type = null;
    that.url = null;
    that.async = null;
    that.username = null;
    that.password = null;
    that.status = null;
    that.headers = {};
    that.readyState = null;

    var createEventHandlers = function(details) {
        ['load', 'error', 'timeout', 'abort', 'readystatechange' ].forEach(function(event) {
            var one = 'on' + event;
            details[one] = function(r) {
                if (one !== 'onabort' && that.aborted) return;
                if (!that[one] || typeof that[one] !== 'function') return;
                
                Object.getOwnPropertyNames(r).forEach(function(k) {
                    that[k] = r[k];
                });
                that[one].apply(that, arguments);
            };
        });
        return details;
    };

    var proto = function XHR() {};
    Object.defineProperties(proto,
        { "open":
            { enumerable: true, writable: true, configurable: true, value:
                function(type, url, async, username, password) {
                    that.type = type ? type : null;
                    that.url = url ? url : null;
                    that.async = async ? async : null;
                    that.timeout = null;
                    that.username = username ? username : null;
                    that.password = password ? password : null;
                    that.readyState = 1;
                }
            },
          "setRequestHeader":
            { enumerable: true, writable: true, configurable: true, value:
                function(name, value) {
                    that.headers[name] = value;
                }
            },
          "overrideMimeType":
            { enumerable: true, writable: true, configurable: true, value:
                function(value) {
                    that.overrideMimeType = value;
                }
            },
          "abort":
            { enumerable: true, writable: true, configurable: true, value:
                function() {
                    that.aborted = true;
                    that.readyState = 0;

                    ['abort', 'readystatechange' ].forEach(function(event) {
                                                               var one = 'on' + event;
                                                               if (!that[one]) return;
                                                               that[one].apply(that, [ that ]);
                                                           });
                }
            },
          "getAllResponseHeaders":
            { enumerable: true, writable: true, configurable: true, value:
                function() {
                    return that.headers;
                }
            },
          "getResponseHeader":
            { enumerable: true, writable: true, configurable: true, value:
                function(name) {
                    return that.headers[name];
                }
            },
          "send":
            { enumerable: true, writable: true, configurable: true, value:
                function(data) {
                    that.data = data;
                    var details = createEventHandlers({
                        method: that.type,
                        url: that.url,
                        headers: that.headers,
                        data: that.data,
                        timeout: that.timeout,
                    });
                    GM_xmlhttpRequest(details);
                }
            }
        });
    that.__proto__ = proto;
};

// publish to jQuery
$.ajaxSetup({
    xhr: function(){ return new GM_XHR; }
});

})();