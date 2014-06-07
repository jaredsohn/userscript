// ==UserScript==
// @name        Wretch Album Expander
// @version     20120201.0
// @namespace   http://blog.gslin.org/plugins/wretch-album-expander
// @description Expand wretch album
// @homepage    http://github.com/gslin/albumexpander
// @include     http://www.wretch.cc/album/album.php*
// ==/UserScript==

(function(){
    // Google Chrome cannot parse @include fully-correctly
    if (!document.location.href.match('/album.php')) {
        return;
    }

    var go = function(res){
        eval(res.responseText);

        var count = 0, itemHtmls = [], itemObjs = [];

        var items = jQuery('.side a');
        items.each(function(){
            var i = count++;

            var me = jQuery(this);
            var href = me.attr('href');
            itemObjs.push(jQuery.get(href, [], function(data){
                var target = jQuery(data);
                var newSrc = target.find('#DisplayImage, .displayimg').attr('src');
                itemHtmls[i] = '<a href="' + href + '"><img alt="" src="' + newSrc + '"></a>';
            }));
        });

        jQuery.when.apply(this, itemObjs).always(function(){
            jQuery('#ad_square').html(itemHtmls.join('<br>'));
        });
    };

    // Load jQuery 1.7.1
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
        onload: go
    });
})();
