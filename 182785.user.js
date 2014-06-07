// ==UserScript==
// @name        Spiegel.de RSS Feed - Skip intermediate page (#AI)
// @namespace   www.spiegel.de/#ai=*
// @description Skips the annoying intermediate page (#AI). Whose stupid idea was this, anyway?
// @include     http://www.spiegel.de/#ai=*
// @version     21.0
// @grant       none
// ==/UserScript==

/*global console, unsafeWindow, window, prompt, escape */
/*global GM_log, opera, XPathResult */

if(typeof unsafeWindow === 'undefined') {
   unsafeWindow = window;
}

(function(SPRSS, $, undefined) {
        
    SPRSS.Helpers = {
        Trim: function(str) {
            var a = str.replace(/^\s+/, '');
            return a.replace(/\s+$/, '');
        },
        
        // XPath helper
        // (we could also @require jquery, but better keep it cross-browser compatible)
        XPath: function () {
        
            var x = '';
            var node = document;
            var type = 0;
            var fix = true;
            var i = 0;
            var cur;

            function toArray(xp) {
                var finl = [];
                var next;
                    SPRSS.Browser.Log('toarray ' + xp);
                while(next = xp.iterateNext()) {
                    SPRSS.Browser.Log('iterating ' + next);
                    finl.push(next);
                }
                return finl;
            }

            while(cur = arguments[i++]) {
                switch (typeof cur) {
                    case "string":
                        x += (x === '') ? cur : " | " + cur;
                        continue;
                    case "number":
                        type = cur;
                        continue;
                    case "object":
                        node = cur;
                        continue;
                    case "boolean":
                        fix = cur;
                        continue;
                }
            }

            if(fix) {
                if(type == 6) {
                    type = 4;
                }
                if(type == 7) {
                    type = 5;
                }
            }
            if(!type) { type = XPathResult.ANY_TYPE; }

            // selection mistake helper
            if(!/^\//.test(x)) { x = "//" + x; }

            // context mistake helper
            if(node != document && !/^\./.test(x)) { x = "." + x; }

            var result = document.evaluate(x, node, null, type, null);
            if(fix) {
                // automatically return special type
                switch (result.resultType) {
                    case 1:
                        return result.numberValue;
                    case 2:
                        return result.stringValue;
                    case 3:
                        return result.booleanValue;
                    case 8:
                    case 9:
                        return result.singleNodeValue;
                }
            }

            return fix ? toArray(result) : result;
        },
        BaseUrl: 'http://' + document.location.host,
        EnsureAbsoluteUrl: function(url) {
            if(!url) {
                return url;
            }
            if(url.match(/^\//)) {
                url = this.BaseUrl + url;
            }
            return url;
        }
    };

    
    SPRSS.Browser = {
        Log: function(msg) {
            if(typeof console !== 'undefined') {
                if(typeof console.log !== 'undefined') {
                    console.log(msg);
                }
            }
            else if(typeof GM_log !== 'undefined') {
                GM_log(msg);
            }
            else if(typeof opera !== 'undefined') {
                opera.postError(msg);
            }
        },
        AjaxRequest: function(url, callback, args) {
            var xmlHttp = new XMLHttpRequest();
            
            url = SPRSS.Page.EnsureAbsoluteUrl(url);
            
            xmlHttp.open('GET', url, true);
            xmlHttp.onreadystatechange = function () {
                if(xmlHttp.readyState === 4 &&
                   xmlHttp.status     === 200) {
                    callback(url, xmlHttp.responseText, args);
               }
            };
            
            xmlHttp.send(null);
        }
    };

    SPRSS.Spiegel = {
        RedirectToArticle: function() {
            var url = SPRSS.Helpers.XPath("//div[@class='top-poster-ai']//a[1]/@href", XPathResult.STRING_TYPE);
            if(url)
            {
                SPRSS.Browser.Log('Found redirection URL: ' + url);
                window.location.href = url;
                return true;
            }
            else
            {
                return false;
            }
        }
    };
    
    SPRSS.Main = function() {
        
        SPRSS.Browser.Log('SPRSS: waiting for #ai fragment to appear...');
        
        // dirty and ill programmed way of waiting for
        // pages "fragment" ajax request to complete
        var stop = false;
        setInterval(function() {
            if(stop) { return; } 
            if(SPRSS.Spiegel.RedirectToArticle()){
                stop = true;
            }
        }, 100);
        
    };

    // let's do it!
    SPRSS.Main();

}( window.SPRSS = window.SPRSS || {} ) );
