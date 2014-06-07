// ==UserScript==
// @name           Twitter NicoVideo Thumbnail
// @namespace      http://endflow.net/
// @description    replace video links to NicoVideo thumbnail.
// @include        http://twitter.com/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Flickr: netkuy)
// @version        0.1.1
// @history        [2008-09-18] 0.1.0 first release
//                 [2008-11-29] 0.1.1 supported AutoPagerize

(function(){
function proc(){
    var rx = /nicovideo\.jp\/watch\/(\w+)/;
    $x('//a[contains(@href,"nicovideo.jp")]').forEach(function(a){
        var res = rx.exec(a.href);
        if(res){
            var parent = a.parentNode;
            parent.innerHTML = '';
            var iframe = document.createElement('IFRAME');
            iframe.src = 'http://ext.nicovideo.jp/thumb/' + res[1];
            iframe.scrolling = 'no';
            iframe.frameborder = '0';
            iframe.width = '400';
            iframe.height = '160';
            iframe.style.border = '1px solid rgb(204, 204, 204)';
            parent.appendChild(iframe);
            parent.style.display = 'block';
        }
    });
}
(function(callback, count){
    arguments.callee.count = count || 4;
    if(window.AutoPagerize && window.AutoPagerize.addFilter){
        window.AutoPagerize.addFilter(callback);
    }else if (0 < arguments.callee.count) {
        setTimeout(arguments.callee, 1000, callback, arguments.callee.count - 1);
    }
})(proc);
proc();
function $x(x,c){c=c||document;var r=document.evaluate(x,c,null,4,null);
for(var i,n=[];i=r.iterateNext();n.push(i));return n}
})();
