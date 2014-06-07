// ==UserScript==
// @name           NicoVideo MyList RSS
// @namespace      http://endflow.net/
// @description    injects mylist rss/atom feeds to NicoVideo watch page .
// @version        0.1.0
// @include        http://*.nicovideo.jp/watch/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-06-17] 0.1.0 initial release

(function(){
setTimeout(function(){
    var head = $x('//head')[0];
    var mylists = $x('id("WATCHHEADER")//p[@class="video_des"]//a[contains(text(), "mylist/")]');
    var urls = mylists.map(function(l)l.href.toString());
    var rx = /<title>(.*)<\/title>/i;
    for(var i = 0; i < urls.length; i++){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', urls[i], false);
        xhr.send(null);
        if(xhr.status == 200){
            var m = xhr.responseText.match(rx);
            if(m){
                var link = document.createElement('link');
                link.title = m[1];
                link.href = urls[i] + '?rss=2.0';
                link.type = 'application/rss+xml';
                link.charset = 'utf-8';
                link.rel = 'alternate';
                head.appendChild(link);
            }
        }
    }
}, 1000);

function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();
