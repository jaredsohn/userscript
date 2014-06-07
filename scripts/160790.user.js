// ==UserScript==
// @name         WebScript CrossDomain-Request
// @namespace    http://jixun.org/
// @version      1.0.0.3
// @description  Allow webpage to cross-domain.
// @include      *
// @copyright    2012+, Jixun
// @run-at       document-start
// ==/UserScript==

(function(){
    
    var w = unsafeWindow,
        l = location,
        h = l.hostname,
        c = w.confirm,
        a = w.alert,
        g = GM_getValue,
        s = GM_setValue,
        x = GM_xmlhttpRequest,
        o = w.console,
        ww= h + '.whitelist';
    
    function validDomain (z) {
        return (z.replace(/[a-z0-9.-]+/i, '') == '');
    }
    
    function list (host, op) {
        /*
        *   op
        *    1: Add
        *    2: Del
        *    3: Check
        */
        
        var noc = 0,
            arr = host.toLowerCase().split ('|'),
            old = '|' + (g(ww)||'').toLowerCase() + '|';
        
        for (var i=0; i<arr.length; i++) {
            if (validDomain(arr[i])) {
                if (old.indexOf('|' + arr[i] + '|') >= 0) {
                    // Already exist
                    if (op == 1) {
                        break;
                    } else if (op == 2){
                        old = old.replace (arr[i], '');
                    } else if (op == 3) {
                        noc++;
                    }
                } else {
                    // Not exist
                    if (op == 1) {
                        old += arr[i] + '|';
                    } else if (op == 2){
                        break
                    }
                }
            }
        }
        if (op == 3) {
            return (noc==arr.length && noc != 0);
        } else {
            old = old.replace (/\|\|/g, '|');
            s (ww, old);
            return true;
        }
    }
    /*
    *   xHttp: the class name, can be used as following:
    * 
    *     if (window.xHttp) {
    * 	      var x = new xHttp(), useXhttp = true;
    *     }
    */
    w.xHttp = function () { };
    w.xHttp.prototype = {
        /*
        *   Version name, 
        *     console.log (x.ver);
        */
        ver: '1.0.0.3',
        /*
        *   Add target domain to white list, can be seperated using '|'
        *    @ret: True, accepted; False, refused.
        * 
        *     x.addWhitelist ('example.com|mydomain.com');
        */
        addWhitelist: function (z) {
            if (!z) {return false;}
            if (this.isWhiteListed (z)) {return true;}
            if(!c ('Allow ' + h + ' access to ' + z + '?')) {
                return false;
            }
            return (list (z, 1));
        },
        /*
        *   Remove target domain from white list, can be seperated using '|'
        *    @ret: True, accepted; False, refused.
        * 
        *     x.removeFromWhitelist ('example.com|mydomain.com');
        */
        removeFromWhitelist: function (z) {
            if (!z) {return false;}
            if (!this.isWhiteListed (z)) {return true;}
            if(!c ('Disallow ' + h + ' access to ' + z + '?')) {
                return false;
            }
            return (list (z, 2));
        },
        /*
        *   Check if the input has been whitelisted, can be seperated using '|'
        *    @ret: True, all are in the list; False, one or more not in the list.
        * 
        *     x.isWhiteListed ('example.com|mydomain.com');
        */
        isWhiteListed: function (z) { if (!z) {return false}; return (list (z, 3)); },
        /*
        *   Load the webpage, method can be ignored as it will add "GET" if is not "POST"
        *    @ret: False, not whitelisted or invalid args;
        * 		   Check here: http://wiki.greasespot.net/GM_xmlhttpRequest#Returns
        * 
        *     x.load ({url: 'http://my-domain.com/example.html', onload: function (r) {
        *       alert (response.responseText);
        *     }});
        */
        load: function (z) {
            if (!z || !z.url) {return false};
            if (z.url.substr(0,2)=='//') { z.url = l.protocol + z.url; }
            if (!z.method || z.method.toLowerCase() != 'post') {
                z.method = 'GET';
            }
            if (!z.onload) { z.onload = function () {} }
            try {
                o.log ('Internet request: ' + (z.url));
                var host = (z.url.match (/\/\/(.+?)\//)||[,''])[1];
                if (host=='' || list (host, 3)) {
                    return x (z)
                }
                o.error ('Domain ' + host + ' not allowed.');
                return false;
            } catch (y) {
                o.error (y);
            }
        },
        /*
        *   Return the document, can be used with jQuery or standalone
        *    @ret: Document, or undefined if something wrong with it.
        * 
        *     $(x.parseHTML(response.responseText)).find('a#download');
        *     x.parseHTML(response.responseText).querySelector ('a#download');
        */
        parseHTML: function (responseText) {
            // For Firefox
            var ret = (new DOMParser()).parseFromString(responseText, "text/html");
            
            // For Chrome
            if (ret == undefined) {
                var ret = document.implementation.createHTMLDocument("");
                ret.querySelector('html').innerHTML = responseText;
            }
            return ret;
        },
        /*
        *   Return the string, without all the html tags.
        *    @ret: String
        * 
        *     x.ripHTML(x.parseHTML(response.responseText).querySelector('#description'));
        */
        ripHTML: function (responseText) {
            var ret = responseText.replace (/(<.+>|\r|^\n)/g, '') + '\n',
                reg = /(\n\n|\t)/g;
            
            while ( reg.test(ret) ) {
                ret = ret.replace (reg, '');
            }
            return ret.substr(0, ret.length - 1);
        }
    }
})();