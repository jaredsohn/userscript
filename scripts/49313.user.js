// ==UserScript==
// @name          Replace a URL with shortened bit.ly version.
// @namespace     http://yboyacigil.blogspot.com
// @description   Auto replace a URL written in twitter box with bit.ly URL by selecting the URL and pressing Alt+Shift+B
// @include       http://twitter.com*
// @include       https://twitter.com*
// ==/UserScript==

(function() {
    // alert("loaded");

    var BITLY_API_URL = "http://api.bit.ly/shorten?version=2.0.1&login=bitlyapidemo&apiKey=R_0da49e0a9118ff35f52f629d2d71bf07&longUrl=";
    var rBitly = /http(s)?:\/\/(?!bit.ly*)\S.*/i;
    var inputElm;

    function replaceWithBitlyUrl(e) { 
        if (e.altKey && e.shiftKey && e.which == 66 /* 'B' */) {
            field = e.target;
            stp = field.selectionStart;
            enp = field.selectionEnd;
            bef = field.value.substr(0, stp);
            sel = field.value.substr(stp, (enp - stp));
            aft = field.value.substr(enp, (field.value.length - enp));
            if (rBitly.test(sel)) {
                GM_xmlhttpRequest(
                    { 
                        method: 'GET',
                        url: BITLY_API_URL + sel,
                        headers: {
                            "User-Agent":"Mozilla/5.0"
                        },    
                        onload: function(res) {
                            var result = eval('(' + res.responseText + ')');
                            if (result.errorCode == 0) {
                                shortUrl = result.results[sel].shortUrl;
                                inputElm.value = bef + shortUrl + aft;
                                inputElm.setSelectionRange(bef.length, bef.length + shortUrl.length);
                            }
                        }
                });
                return true;
            }
        }
        return false;
    }

    inputElm = document.getElementById("status");
    inputElm.addEventListener("keypress", replaceWithBitlyUrl, false);
})();

