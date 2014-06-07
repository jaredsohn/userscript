// ==UserScript==
// @name        Weibo.com: Adding Original Feed to Favourite
// @grant       none
// @version     v2.0
// @include     http://weibo.com/*
// @include     http://www.weibo.com/*
// @namespace   http://techlivezheng.me
// ==/UserScript==

(function() {
    function action() {
        var feeds = document.getElementsByClassName('WB_feed_type');
        for (var index = 0; index < feeds.length; index++) {
            var origin = feeds[index].getElementsByClassName('WB_media_expand')[0];
            if (!origin) continue;
            
            var origin_handle = origin.getElementsByClassName('WB_handle')[0];
            if(!origin_handle) continue;
            
            var added = Array.filter(origin_handle.childNodes, function(e){
                return e.attributes && e.attributes['action-type'] && e.attributes['action-type'].value == 'feed_list_favorite';
            })[0];
            if(added) continue;
            
            var origin_handles = origin_handle.getElementsByClassName('S_func4');
            var insertPoint = origin_handles[origin_handles.length - 1];
            
            var a = document.createElement('a');
            var aText = document.createTextNode("收藏");
            a.appendChild(aText);
            a.setAttribute('href', 'javascript:void(0);');
            a.setAttribute('suda-data', 'key=smart_feed&amp;value=time_sort_collect');
            a.setAttribute('action-type', 'feed_list_favorite');
            origin_handle.insertBefore(a,insertPoint);
            
            var i = document.createElement('i');
            var iText = document.createTextNode('|');
            i.setAttribute('class','S_txt3');
            i.appendChild(iText);
            origin_handle.insertBefore(i,insertPoint);
        }
    }
    
    action();

    //Feed 区域改变的时候再追加一次检查
    var hasSetup = false;
    function changed(e) {
        e.addEventListener('DOMNodeInserted', function() {
            if (!hasSetup) {
                setTimeout(function() {
                    action();
                    hasSetup = false;
                }, 2000);
                hasSetup = true;
            }
        });
    }
    
    var myFeed = document.getElementById('pl_content_myFeed');
    if (myFeed) changed(myFeed);

    var homeFeed = document.getElementById('pl_content_homeFeed');
    if (homeFeed) changed(homeFeed);
})();