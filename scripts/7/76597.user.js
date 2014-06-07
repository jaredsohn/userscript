// ==UserScript==
// @name           Mylist TagCloud
// @namespace      http://efcl.info/
// @description    ニコニコ動画のマイリストページにタグクラウドを表示
// @include        http://www.nicovideo.jp/mylist/*
// ==/UserScript==
evalInPage(function() {
    var version = '1.0.3';

    var as = my.currentItems
    var ids = "";
    if (as.length > 1) {
        insertcallback();
        for (var i = 0; i < as.length; i++) {
            var smid = as[i].item_data.video_id;
            ids += smid + "+";
        }
        // console.log(ids);
        // http://nicotag.sakura.ne.jp/getcollocationtag.php
        var uri = "http://nicotag.sakura.ne.jp/getcollocationtag/php/getcollocationtag_multi.php?smid=" + ids + "&version=" + version + "&rand=" + Math.floor(Math.random() * 1000);
        calljsonp(uri);
    }


    function calljsonp(uri) {
        var scr = document.createElement('script');
        scr.type = "text/javascript";
        scr.src = uri;
        document.body.appendChild(scr);
    }

    function insertcallback() {
        var callscr = document.createElement('script');
        callscr.type = "text/javascript";
        callscr.text = ''
                + 'function callback(val){'
                + 'var footer = document.querySelectorAll("div#SYS_box_mylist_body");'
                + 'var foot = footer[0];'
                + 'var div = document.createElement("div");'
                + 'div.id = "TagCloud";'
                + 'div.innerHTML = val;'
                + 'foot.parentNode.insertBefore(div, foot);'
                + '}';
        document.body.appendChild(callscr);
    }
})
GM_addStyle(<>
    <![CDATA[
    #TagCloud > div {
        width:100%!important;
    }
]]></>);
function evalInPage(fun) {
    location.href = "javascript:void (" + fun + ")()";
}
