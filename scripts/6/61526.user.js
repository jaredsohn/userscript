// ==UserScript==
// @name           NicoWatchlist AddButton
// @author         favril
// @namespace      http://d.hatena.ne.jp/favril/
// @description    動画ページにウォッチリスト登録ボタンを追加するスクリプト
// @version        0.1.0
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

(function(){
    var vid = unsafeWindow.video_id.substring(2);
    GM_xmlhttpRequest({
        method: 'GET',
        url:    'http://www.smilevideo.jp/view/' + vid,
        headers: {'User-Agent':   'Mozilla/5.0 Greasemonkey (NicoWatchlist AddButton)'},
        onload: function (res) {
            var nickname = ''; // can't get nickname
            if(/<strong>(.+?)<\/strong> が投稿した動画/.test(res.responseText)) {
                nickname = decodeURIComponent(RegExp.$1);
            }
            
            var inpos = document.evaluate('id("des_2")/table[@width="984"]//td/p[@class="font12"]/span', document, null, 7, null);
            if (!inpos.snapshotLength) return;
            inpos = inpos.snapshotItem(0);
            
            var owner_id = inpos.getElementsByTagName('a');
            if (!owner_id.length) return;
            owner_id = owner_id[0].href.substring(29);  // http://www.nicovideo.jp/user/******

            var a  = document.createElement('a');
            a.href = 'javascript:;';
            a.style.marginLeft = '3px';
            a.innerHTML = '<strong>' + nickname + '</strong> をウォッチリストに追加';
            a.addEventListener('click', function(){
                var url    = 'http://www.nicovideo.jp/api/watchitem/add';
                var params = 'item_id=' + owner_id + '&item_type=1&token=';
                var self   = this;
                GM_xmlhttpRequest({
                    method:  'POST',
                    url:     url,
                    data:    params,
                    headers: {'User-Agent':   'Mozilla/5.0 Greasemonkey (NicoWatchlist AddButton)',
                              'Content-type': 'application/x-www-form-urlencoded'},
                    onload: function (res) {
                        var json = eval('(' + res.responseText + ')');
                        var msg  = document.createElement('span');
                        msg.style.color = 'red';
                        if (json.status == 'ok') {
                            msg.innerHTML = '登録完了';
                        } else {
                            // json.status == 'fail'
                            msg.innerHTML = '登録失敗(' + json.error.description + ')';
                        }
                        self.parentNode.replaceChild(msg, self);
                        
                        console.log(json);
                    }
                });
            }, false);
            inpos.appendChild(a);
            inpos.appendChild(document.createTextNode(' |'));
        }
    });
})();
