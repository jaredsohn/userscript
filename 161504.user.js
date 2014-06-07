// ==UserScript==
// @name           Ober-haus.lt link fixer
// @namespace      http://m.jakstys.lt/
// @include        http://www.ober-haus.lt/*
// @description    Make links in deals pages properly clickable
// ==/UserScript==

$(".offerblock_list_locname").each(function() {
    var onclick = $(this).attr('onclick');
    var urls = /.*'(.+)'/.exec(onclick);
    if (urls) {
        var label = this.innerHTML.trim();
        var a = "<a href='" + urls[1] + "'>" + label + "</a>";
        $(this).html(a).attr('onclick', '');
    }
});
