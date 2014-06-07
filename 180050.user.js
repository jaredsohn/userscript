// ==UserScript==
// @name        Ingress Intel: Portal photo full size
// @description Click photo in Ingress Intel to see full size
// @namespace   free
// @include     http://www.ingress.com/intel
// @include     https://www.ingress.com/intel
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     0.14
// ==/UserScript==

(function() {
    $("body").on("mouseup", "#portal_image img", function (e) {
        //alert(1);
        var bi = $(this).attr("src");
        var picUrl = "http://" + bi.substr(2, bi.length - 2);
        
        // panoramio
        picUrl = picUrl.replace(
            /www\.panoramio\.com\/photos\/small\//g,
            "static.panoramio.com/photos/original/");
            
        // picasa
        if (/lh\d+\.ggpht\.com\/.+$/.test(picUrl)) {
            picUrl = picUrl.replace("=s130", "=s4096");
        }
            
        window.open(picUrl, "_blank");
    });

})();
