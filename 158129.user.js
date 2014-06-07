// ==UserScript==
// @name           niconicoCloser
// @namespace      http://www.nicovideo.jp/watch/
// @include        http://www.nicovideo.jp/watch/*
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
        var isActive = true;
        jQ(window).blur(function () {
            isActive = false;
        });
        jQ(window).focus(function () {
            isActive = true;
        });

        var id = 0;
        id = setInterval(function () {
            var player = WatchApp.namespace.model.player.NicoPlayerConnector
            if (player.getVpos() >= player.getVideoLength()) {
                clearInterval(id);
                if (isActive) {
                    setTimeout(function () {
                        if (isActive) {
                            jQ("head").empty();
                            jQ("body").empty();
                        }
                    }, 10 * 60 * 1000);
                }
            }
        }, 60 * 1000);
    }
    addJQuery(main);
})();