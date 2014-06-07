// ==UserScript==
// @name           Flickr Activate In-Place Editing for AutoPagerize
// @namespace      http://endflow.net/
// @description    Activates in-place editing of the pages loaded by AutoPagerize.
// @include        http://www.flickr.com/photos/*/
// @include        http://flickr.com/photos/*/
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Flickr: netkuy)
// @version        0.1.1 [2008-07-16]
// @history        [2008-06-20] 0.1.0 first version
//                 [2008-07-16] 0.1.1 small bugfix
//                 [2008-09-20] 0.1.2 bugfix

(function(){
function onFetch(nodes){
    $x('id("Main")//div[@class="StreamView"]//script').forEach(function(s){with(unsafeWindow){
        eval.call(unsafeWindow, s.innerHTML);
    }});
}
(function(callback, count){
    arguments.callee.count = count || 4;
    if(window.AutoPagerize && window.AutoPagerize.addFilter){
        window.AutoPagerize.addFilter(callback);
    }else if (0 < arguments.callee.count) {
        setTimeout(arguments.callee, 1000, callback, arguments.callee.count - 1);
    }
})(onFetch);
function $x(x,c){ c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes;}
})();
