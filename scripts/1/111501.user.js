// ==UserScript==
// @name           What.CD better.php - Show Tags for Firefox
// @namespace      http://what.cd
// @description    What.CD better.php - Show Tags for Firefox
// @include        http*://*what.cd/better.php?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version        0.2
// ==/UserScript==

/*
 * Does not work with Transcode Search Enhancer (aka better.php filter)
 * on better.php?method=snatch
 */
(function (){
    var re = /torrents\.php\?taglist=[\w\.]+/g;

    $('a[href^="torrents.php?id="]').each(function(i, node) {
        $.get(node.toString(), function(response) { addTags(node, response); });
    });

    function addTags(node, response) {
        var tags = $.map(response.match(re), function(s) {
            return s.split("=")[1];
        });
        $(node).parent().append('<div>' + tags.join(', ') + '</div>');
    }
})();

