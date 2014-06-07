// ==UserScript==
// @name           NicoVideo Global Tag Icon
// @namespace      http://endflow.net/
// @description    replace country indication to icon
// @include        http://*.nicovideo.jp/watch/*
// ==/UserScript==
// @author         Yuki KODAMA (twitter:kuy, skype:netkuy)
// @version        0.1.3 [2008-09-06]
// @history        [2008-07-22] 0.1.0 first release
//                 [2008-08-21] 0.1.1 supported new tag structures
//                 [2008-08-21] 0.1.2 some improvements
//                 [2008-09-06] 0.1.3 fixed bug

(function(){
var w = this.unsafeWindow || window;
w._showGlobalTags = w.showGlobalTags;
w.showGlobalTags = function(url){
    var cnt = 0;
    setTimeout(function(){
        if($x('//p[@class="tag_txt"]//span[@class="tag_area"]').map(function(span){
            var icon = $n('IMG');
            icon.setAttribute('style', 'vertical-align:bottom; margin-left:2px;');
            var code = span.innerHTML.slice(1, -1);
            icon.src = 'http://res.nicovideo.jp/img/base/user/ww_' + code + '.gif';
            span.parentNode.insertBefore(icon, span);
            span.parentNode.removeChild(span);
        }).length === 0){
            (cnt++ < 5) && setTimeout(arguments.callee, 50 * cnt);
        }
    }, 10);
    w._showGlobalTags(url);
};
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
function $n(tag){return document.createElement(tag)}
})();
