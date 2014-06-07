// ==UserScript==
// @name           Last.fm DJ Makai patch
// @namespace      http://endflow.net/
// @description    for great DJ Makai in Japan.
// @include        http://www.last.fm/home
// @include        http://www.last.fm/user/*
// @include        http://www.last.fm/music/*
// ==/UserScript==

(function(){
$x('//img[contains(@src,"/243309.jpg")]').forEach(function(img){
    img.src = img.src.replace('243309', '3911082');
});
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();
