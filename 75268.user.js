// ==UserScript==
// @name           All Reddit to the Hypnotoad!
// @namespace      CrazyDrumGuy
// @version        0.01
// @description    Adds "ALL GLORY TO THE HYPNOTOAD" to all Reddit comments.
// @include        http://*.reddit.*
// ==/UserScript==
/*

(function(){
$("div.md").each(function(i){
    t=$(this).text().split(/\s+/);
    t .pop();
    $(this).replaceWith("<div class=\"md\"><p>" + t.join(" ") + "... ALL GLORY TO THE HYPNOTOAD!" + "</p></div>")
     })()

}();