// ==UserScript==
// @name           JihouAlert
// @namespace      gm.hakobe.jp
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==


var l = window.location.pathname;
l.match(/([^\/]+)\/?$/);
var id = RegExp.$1;

GM_xmlhttpRequest({
    method : 'GET', 
    url : 'http://www.nicovideo.jp/api/getflv?v=' + id, 
    onload : function(res){
        var text = res.responseText;
        text.match(/&l=(\d+)/);
        var length = parseInt(RegExp.$1);
        
        var now = new Date();
        var end = new Date(now);
            end.setTime(end.getTime() + length * 1000);
            
        var now_h = now.getHours();
        var end_h = end.getHours();
        
        if ( (   2 <= now_h && now_h <= 18  &&  end_h >= 19   ) ||
             (  19 <= now_h && now_h <= 23  &&  now_h > end_h ) ||
             (   0 <= now_h && now_h <= 1   &&  end_h >= 2    )    ) {
            alert("動画再生中に時報が再生される可能性があります．")
        }        
    }
});