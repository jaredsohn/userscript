// ==UserScript==
// @name       RGHost pics
// @namespace  http://ivynet.tk
// @version    0.1
// @description  RGHost pics
// @match      http://rghost.ru/search*
// @copyright  2013+, Juribiyan
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

addJQuery(main);

function main() {
    $("ol li a").each(function(){$(this).html('<img src="http://rghost.ru'+$(this).attr('href')+'/thumb.png"/>')});
}

