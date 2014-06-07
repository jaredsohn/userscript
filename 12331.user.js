// ==UserScript==
// @name           pageinfo lightbox
// @namespace      http://blog.f99aq8ove.net/
// @description    [Ctrl]+double click!!!
// @include        http://*
// ==/UserScript==

(function() {
    var service_url = "http://app.muumoo.jp/page/#";

    document.addEventListener("dblclick", function(e) {
        if (e.ctrlKey) show_lightbox();
    }, false);

    function show_lightbox() {
        var background_elm = document.createElement("div");
        background_elm.setAttribute("style", "background:#000;height:100%;left:0;opacity:0.5;position:fixed;top:0;width:100%;z-index:50000;margin:0;padding:0");
        background_elm.addEventListener("click", function() {
            document.body.removeChild(background_elm);
            document.body.removeChild(container_elm);
        }, false);
        document.body.appendChild(background_elm);

        var container_elm = document.createElement("div");
        container_elm.setAttribute("style", "-moz-border-radius:20px;background:#fff;color:#000;margin:0;padding:10px;position:fixed;z-index:50001");
        document.body.appendChild(container_elm);

        function resize() {
            var ww = window.innerWidth - 20;
            var wh = window.innerHeight - 20;
            // oops...
            container_elm.style.width = ww * 0.9 + "px";
            container_elm.style.height = wh * 0.9 + "px";
            container_elm.style.left = (ww * 0.1) / 2 + "px";
            container_elm.style.top = (wh * 0.1) / 2 + "px";
        }
        resize();
        window.addEventListener("resize", resize, false);

        var pageinfo = document.createElement("iframe");
        pageinfo.style.width = "99%";
        pageinfo.style.height = "99%";
        pageinfo.src = service_url + encodeURIComponent(document.URL);
        container_elm.appendChild(pageinfo);
    }
})();
