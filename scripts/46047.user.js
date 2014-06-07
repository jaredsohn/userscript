// ==UserScript==
// @name           Anti Diggbar
// @namespace      Quickredfox
// @description    This script is to cure the internets of Diggbar. 
// @include        *
// ==/UserScript==

/*
I wrote this script on a whim, it sucks... please help improve it or make a better version and share!
*/

(function() {
    // First try to break out of digg bar
    var i = document.getElementById('diggiFrame');
    if (i) {
        window.top.location.href = i.src
    };
    // This crap code rewrites urls or calls
    // digg api, depending... very stupid regex full error prone.
    var unDiggbarize = function unDiggbarize(linkElement) {
        var m = linkElement.href.match(/^\http\:\/\/digg.com\/(http\:\/\/.+)$|^\http\:\/\/digg.com\/([A-Z0-9]+)$/i);
        if (m) {
            var m = m[2];
            if (/http/.test(m)) {
                linkElement.href = m;
            } else if ((/\d/).test(m) && !(/page/).test(m)) {
                function clickHandler(evt) {
                    evt.preventDefault();
                    GM_xmlhttpRequest(
                    {
                        method: 'get',
                        url: 'http://services.digg.com/url/short/' + m + '?type=json&appkey=http://userscripts.org/antibar',
                        onload: function(responseDetails) {
                            eval('var json = ' + responseDetails.responseText);
                            if (json.shorturls && json.shorturls[0] && json.shorturls[0].link) {
                                window.location.href = json.shorturls[0].link;
                            }
                        }
                    },
                    true)
                    return false;
                }
                linkElement.addEventListener('click', clickHandler, false);
            }
        } else {
            return false;
        }
    };
    // wait for it...
    setTimeout(function() {
        var anchors = document.getElementsByTagName('a');
        if (anchors.length > 0) {
            for (var i = anchors.length - 1; i >= 0; i--) {
                unDiggbarize(anchors[i]);
            };
        }

    },
    100)
})()