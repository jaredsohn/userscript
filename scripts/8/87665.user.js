// ==UserScript==
// @name           NicoSound link for NicoVideo
// @namespace      http://endflow.net/
// @description    Puts a link to jump to NicoSound (http://nicosound.anyap.info/) of the video.
// @version        0.1.2
// @include        http://*.nicovideo.jp/watch/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2010-10-08] 0.1.0 first version
//                 [2010-11-04] 0.1.1 fix to catch up new HTML structure
//                 [2011-01-09] 0.1.2 fix markups

(function(){
// generate destination URL and anchor tag
var baseUrl = 'http://nicosound.anyap.info/sound/',
    videoId = location.href.toString().split('/').pop(),
    link = document.createElement('a'),
    nobr = document.createElement('nobr');
link.href = baseUrl + videoId;
link.innerHTML = 'にこ☆さうんど♯で変換';
nobr.appendChild(link);

// insert anchor tag
var p = $x('id("WATCHFOOTER")//td[@class="font12"]')[0];
p.appendChild(document.createTextNode('| '));
p.appendChild(nobr);

function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();
