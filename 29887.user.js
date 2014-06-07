// ==UserScript==
// @name           Flickr Menu Mouseover
// @namespace      http://endflow.net/
// @description    popup submenu on mouseover.
// @include        http://www.flickr.com/*
// @include        http://flickr.com/*
// ==/UserScript==
// @author         Yuki KODAMA (twitter:kuy, skype:netkuy)
// @version        0.1.0 [2008-07-10]
// @history        [2008-07-10] 0.1.0 first release

(function(){
var w = this.unsafeWindow || window;
var carets = $x('//img[@class="nav_button_caret"]');
carets.forEach(function(caret){
    caret.addEventListener('mouseover', function(){with(w){
        carets.forEach(function(c){
            if(c.src.indexOf('selected') != -1){
                c.dispatchEvent($e());
                c.src = c.src.replace('hover', 'default');
            }
        });
        caret.dispatchEvent($e());
    }}, false);
});
function $e(){var e=document.createEvent('MouseEvents');e.initMouseEvent('click',
true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);return e}
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();
