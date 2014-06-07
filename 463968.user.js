// ==UserScript==
// @name        vB5 Message Alert Popup
// @namespace   http://porkchopsandwiches.com
// @include     http://corpus-scientia.com/*
// @version     1
// ==/UserScript==

var match = /search|\/forum\/$/.test(location.pathname);
if (match) { //don't prompt when in the PM page itself
    var legit = 0;
    var total = 0;
    GM_xmlhttpRequest ({
        method: "GET",
        url: "/forum/privatemessage/index",
        onload: function (response) {
            
            // Get the response and stuff it into a DIV, then parse the DIV for private message links.  Ignore any
            // from the Thanks plugin.
            
            var responsediv = document.createElement ('div');
            responsediv.setAttribute('id', 'responsediv');
            responsediv.innerHTML=response.responseText;
            var links = responsediv.getElementsByTagName("a");
            for (var count=0; count < links.length; count++) {
                var href = links[count].href,
                    text = links[count].innerHTML,
                    matchURL = /forum\/privatemessage\/view/.test(href),
                    matchText = /New\sThanks\sReceived/.test(text);
                if (matchURL) {
                    total++;
                    if (!matchText) {
                        legit++;
                    }
                }
            }
            if (legit > 0) {
			var conf = confirm ("You have "+legit+" new message(s) in the Message Center.  Would you like to open it now?");
                if (conf) {
                    var baseURL = window.location.protocol + "//" + window.location.host;
                    var w = window.open(baseURL + '/forum/privatemessage/index', '_blank');
                }
            }
        }
    });
}   