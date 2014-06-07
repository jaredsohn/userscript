// ==UserScript==
// @name           douban 只看楼主
// @author         wenbob@gmail.com
// @namespace      http://userscripts.org/users/wenbob
// @description    douban只看楼主功能 by wenbob@gmail.com
// @include        http://www.douban.com/group/topic/*
// ==/UserScript==
var script = document.createElement("script");
script.type = "application/javascript";
script.innerHTML = "(function($){\
    $('div.article div.topic-content div.topic-doc h3 span.pl20 a')\
    .after('<button class=\"btnone\">只看楼主</button>&nbsp;<button class=\"btnall\">查看全部</button>');\
    $('div.article ul.topic-reply li h4 a').after('<button class=\"btnone\">只看此人</button>&nbsp;<button class=\"btnall\">查看全部</button>');\
    $('.btnone').click(function(){\
        $('.autoPagerS').remove();\
        var guy = $(this).prev().attr('href');\
        $('div.article ul.topic-reply li').each(function(i){\
            if (guy != $(this).find('h4 a').attr('href')) {\
                $(this).hide();\
            }\
        });\
    });\
    $('.btnall').click(function(){\
        $('.autoPagerS').html('');\
        $('div.article ul.topic-reply li').show();\
    });\
})(jQuery);";
document.body.appendChild(script);