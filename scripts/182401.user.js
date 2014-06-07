// ==UserScript==
// @name       iBood hunt update interval increaser
// @namespace  http://wol.ph/
// @version    0.1
// @description  Makes the iBood Hunt update faster (instead of every 5 seconds, every 0.5 seconds)
// @match      http://m.ibood.com/nl/nl/
// @copyright  2013+, Wolph
// ==/UserScript==

window.addEventListener('load', setInterval(function() {
        $.ajax({
            type:     "GET",
            url:      JS_DIR + "stock/" + ibood.variant + ".js",
            dataType: "jsonp",
            cache:    false,
            timeout:  (500 - 100)
        });
    }, 500);
);