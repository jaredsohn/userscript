// ==UserScript==
// @name           outlawingMe
// @namespace      http://gakufu.gakki.me/m/data/                                                                                                                   
// @include        http://gakufu.gakki.me/m/data/*                                                                                                                  
// ==/UserScript==
(function () {
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
        script.addEventListener('load', function () {
            var script = document.createElement("script");
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    function main() {
        jQ("body").removeAttr("oncopy")
        jQ("body").removeAttr("onkeydown")
        jQ("body").removeAttr("oncontextmenu")
        jQ("body").removeAttr("onselectstart")
    }

    addJQuery(main);
})();