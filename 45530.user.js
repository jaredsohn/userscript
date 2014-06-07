// ==UserScript==
// @name           ParasiteStage Media URL Fetcher
// @namespace      http://endflow.net/
// @description    Acquire media URL and insert to current page in playlist page.
// @include        http://parasitestage.dip.jp/Page/PlayList.aspx?ListId=*
// ==/UserScript==

(function(){
var button = $n('input');
button.setAttribute('type', 'button');
button.setAttribute('value', 'Show DL links');
button.addEventListener('click', function(){
    button.parentNode.removeChild(button);
    $x('//h4/a[@class="video"]').forEach(function(a){
        var url = a.getAttribute('href');
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send(null);
        if(req.status == 200){
            var spos = req.responseText.indexOf('ctl00_CPH1_RowLink');
            spos = req.responseText.indexOf('href="', spos) + 'href="'.length;
            var epos = req.responseText.indexOf('"', spos);
            var murl = req.responseText.slice(spos, epos);
            murl = murl.replace('&amp;', '&', 'g');
            var link = $n('a');
            link.setAttribute('href', murl);
            link.setAttribute('target', '_blank');
            link.innerHTML = '[DL]';
            a.parentNode.appendChild(link);
        }
    })
}, false);
var title = $x('//h2[@class="contents_title"]')[0];
title.appendChild(button);

function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
function $n(n){return document.createElement(n)}
})();
