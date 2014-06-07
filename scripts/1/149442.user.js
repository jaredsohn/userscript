// ==UserScript==
// @name       Facebook Auto Poker
// @version    0.1
// @description  Open up facebook.com/pokes and it'll auto poke people as they poke you
// @match      *facebook.com/pokes*
// @copyright  2012+, You
// ==/UserScript==


(function () {
 
    function loadScript(url, callback) {
 
        var script = document.createElement("script")
        script.type = "text/javascript";
 
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }
 
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
 
    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
 
        var $ = (unsafeWindow && unsafeWindow.jQuery) || window.jQuery;
        if ($) {
            window.setInterval(function() {
                var $poke = $('li[id^="poke"]');
                if ($poke[0]) {
                    var text = $poke.find('a.uiIconText');
                    if(text[0]) {
                        text[0].click();
                        window.setTimeout(function() {
                            $poke.find('a.uiCloseButton')[0].click();
                        }, 1000);
                    }
                }
            }, 2000);
        }
            
    });
 
})();