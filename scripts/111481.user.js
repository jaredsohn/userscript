// ==UserScript==
// @name           better.php - get tags for Firefox
// @namespace      http://what.cd
// @description    better.php - get tags for Firefox
// @include        http*://*what.cd/better.php?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version        0.1
// ==/UserScript==

(function (){
    var re = /torrents\.php\?taglist=[\w\.]+/g;
    $.each($('a[href^="torrents.php?id="]'), function(j, n) {
        $.get(n.toString(), function(response) {
            $(n.parentNode).append("<div>" + $.map(response.match(re), function(x) { return x.split("=")[1]; }).join(', ') + "</div>");
        });
    });
})();
