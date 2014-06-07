// ==UserScript==
// @name           Bigresource.com Bypass
// @author         eXtraMaster
// @namespace      bigresourceisspam
// @copyright      2013, Andy Tran (http://twitter.com/extramaster)
// @license        Licensed under the MIT license - http://opensource.org/licenses/mit-license.php
// @description    A script that will automatically bypass Bigresource.com, so that an accidental click on Google will still lead you straight to your answers
// @include        http*://*.bigresource.com/*
// @version        1.0
// @encoding       UTF-8
// @run-at document-start
// ==/UserScript==


(function () {
    if (location.href.search(/bigresource\.com/i) !== -1) {
        try {
            window.stop();
        } catch (err) {
            if (window.attachEvent) {
                window.attachEvent('onload', navButtonClick);
            } else {
                if (window.onload) {
                    var curronload = window.onload;
                    var newonload = function () {
                        curronload();
                        navButtonClick();
                    };
                    window.onload = newonload;
                } else {
                    window.onload = navButtonClick;
                }
            }
        }



        function returnGotoNext(r) {
            if (r.responseText.search(/<a rel="nofollow" class="navbutton" href="(.*?)" target="_blank">/i) !== -1) {
                self.location = r.responseText.match(/<a rel="nofollow" class="navbutton" href="(.*?)" target="_blank">/i)[1];
            }
        }
        try {
            GM_xmlhttpRequest({
                method: 'GET',
                url: self.location,
                onload: returnGotoNext
            });
        } catch (err) {
            var r;
            if (window.XMLHttpRequest) {
                r = new XMLHttpRequest();
            } else {
                r = new ActiveXObject("Microsoft.XMLHTTP");
            }
            r.onreadystatechange = function () {
                if (r.readyState == 4 && r.status == 200) {
                    returnGotoNext(r);
                }
            }
            r.open("GET", location.href, true);
            r.send();
        }
    }
})();



function navButtonClick() {
    if (document.getElementsByClassName("navbutton")) {
        document.getElementsByClassName("navbutton")[0].setAttribute("target", null);
        document.getElementsByClassName("navbutton")[0].click();
    } else {
        self.location = "http://stackoverflow.com/search?q=";
    }
}