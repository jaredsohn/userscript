// ==UserScript==
// @name           NicoVideo Thumbnail for Google
// @namespace      http://endflow.net/
// @description    insert NicoVideo thumbnail into search results of Google.
// @include        http://*.google.*/search?*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Flickr: netkuy)
// @version        0.1.2
// @history        [2008-08-09] 0.1.0 first release
//                 [2008-11-29] 0.1.1 supported new format
//                 [2008-11-29] 0.1.2 supported AutoPagerize

(function(){
function proc(){
    var w = this.unsafeWindow || window;
    var rx = /nicovideo\.jp\/watch\/(\w+)/;
    $x('//a[@class="l"]').forEach(function(a){
        var res = rx.exec(a.href);
        if(res){
            var li = parentLI(a);
            li.innerHTML = '';
            var iframe = document.createElement('IFRAME');
            iframe.src = 'http://ext.nicovideo.jp/thumb/' + res[1];
            iframe.scrolling = 'no';
            iframe.frameborder = '0';
            iframe.width = '400';
            iframe.height = '160';
            iframe.style.border = '1px solid rgb(204, 204, 204)';
            li.appendChild(iframe);
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
function parentLI(el){while((el&&el.nodeName!='LI')
&&(el=el.parentNode));return el}
function $x(x,c){c=c||document;var r=document.evaluate(x,c,null,4,null);
for(var i,n=[];i=r.iterateNext();n.push(i));return n}
})();
