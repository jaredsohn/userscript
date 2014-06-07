// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui (cuimingda(at)126(dot)com || http://cuimingda.com)
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Youku Similar Playlist Search
// @namespace       http://cuimingda.com
// @description     one click to search similar playlist quickly
// @include         http://*.youku.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @resource        searchImage http://cuimingda.googlecode.com/svn/trunk/scripts/39739/search.png
// ==/UserScript==
//
// 0.1 @ 2009/01/04 # Initial Release
// --------------------------------------------------------------------------------

;(function() {
    var searchImage = "<a href=''><img src='" + GM_getResourceURL("searchImage") + "'/></a>";
    var conditions = [
        /^http:\/\/www\.youku\.com\/playlist_show\//,
        /^http:\/\/v\.youku\.com\/v_playlist\//,
        /\/search_playlist\//,
        /\/search_video\//,
        /^http:\/\/v\.youku\.com\/v_show\//,
        /^http:\/\/www\.youku\.com\/channels_index\//
    ];
    
    var exceptions = [
        "本专辑全部视频列表",
        "全部播放",
        "上一页",
        "下一页"
    ];
    
    var isSearch = function(url) {
        for(var i=0; i<conditions.length; i++) {
            if(conditions[i].test(url)) return true;
        }
        return false;
    };
    
    $("a[href]:not(:has(img))").each(function() {
        if(!isSearch($(this).attr("href"))) return;

        var words = $.trim($(this).text().replace(/[#\:\/\(\)\[\]\u2000-\u3F00\uFF00-\uFFEE]/g, " ")).split(/\s+/).reverse();
        for(var i=0; i<words.length; i++) {
            if($.inArray(words[i], exceptions) !== -1) continue;
            if(/^\d+$/.test(words[i])) continue;
            
            $(searchImage)
                .attr("title", words[i])
                .insertAfter($(this))
                .click(function(event) {
                    event.preventDefault();
                    location.href = "http://so.youku.com/search_playlist/q_" + $(this).attr("title");
                });        
        }
    });

})();