// ==UserScript==
// @name           Printable Attach Fix for discuz
// @namespace      discuz
// @description    Fix attachment images
// @include        http://www.chiphell.com/forum.php?mod=viewthread&action=printable&tid=*
// ==/UserScript==

function loadJQuery(callback) {
    if(typeof(jQuery) === 'undefined'){
        var script = document.createElement("script");
        script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
        script.addEventListener('load', function () {
            var script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }else{
        jQuery(callback);
    }
}
function main() {
    $("img[file]").each(function(){
      var img = $(this);
      img.attr('src', img.attr('file'));
    });
}
loadJQuery(main);
