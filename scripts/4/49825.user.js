// ==UserScript==
// @name           Hotentry + Web Gyotaku
// @version        0.1
// @description    はてブのhotentryページに、web魚拓の有無をチェックするボタンを追加する
// @include        http://b.hatena.ne.jp/hotentry*
// @namespace      http://d.hatena.ne.jp/favril/
// @author         favril
// ==/UserScript==

(function(){
    /**********************************
       powered by
       web魚拓: http://megalodon.jp/
     **********************************/

    var infos = document.evaluate('//ul[@class="entry-info"]', document, null, 7, null);
    var links = document.evaluate('//div[@class="entry-body"]/h3/a', document, null, 7, null);
    for(var i=0,len=infos.snapshotLength; i<len; i++) {
        var li = document.createElement('li');
        
        var a = document.createElement('a');
        a.id = 'gyotaku' + i;
        a.href = 'javascript:void(0);';
        a.setAttribute('url', encodeURIComponent(links.snapshotItem(i).href));
        a.style.textDecoration = 'none';
        a.innerHTML = '[魚拓]';
        a.addEventListener('click', function(){
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://megalodon.jp/?url=' + this.getAttribute('url'),
                headers: { 'User-Agent': 'Mozilla/5.0 Greasemonkey (web gyotaku checker)' },
                elemId: this.id,
                onload: function(res){
                    if (res.responseText.indexOf('urllist') != -1) {
                        window.open(this.url);
                    } else {
                        var thisLi = document.getElementById(this.elemId);
                        if(!thisLi) return;
                        thisLi = thisLi.parentNode;
                        
                        thisLi.innerHTML = 'なし';
                    }
                },
                onerror: function(res){ GM_log(res.status + ':' + res.statusText); }
            });
        }, false);
        li.appendChild(a);
        infos.snapshotItem(i).appendChild(li);
    }
})();
