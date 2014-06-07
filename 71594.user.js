// ==UserScript==
// @name        Yam Album Expander
// @version     20120131.0
// @namespace   http://blog.gslin.org/plugins/yam-album-expander
// @description Expand Yam Album
// @homepage    http://github.com/gslin/albumexpander
// @include     http://album.blog.yam.com/*
// ==/UserScript==

(function(){
    if (!document.location.href.match(/&folder=\d+/)) {
        return;
    }

    var go = function(res){
        eval(res.responseText);

        var itemHtmls = [];

        var items = jQuery('.photoimg a');
        items.each(function(){
            var me = jQuery(this);
            var href = me.attr('href');
            var src = me.find('img').attr('src').replace('t_', '');
            itemHtmls.push('<a href="' + href + '"><img src="' + src + '"></a>');
        });

        jQuery('#photobody').html(itemHtmls.join('<br>'));
    };

    // Load jQuery 1.7.1
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
        onload: go
    });
})();
