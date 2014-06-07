// ==UserScript==
// @name           hatena_antenna_direct_updater
// @version        1.1.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Add buttons which update the pages directly on hatena antenna. / はてなアンテナに直接更新を行うボタンを追加します。
// @include        http://a.hatena.ne.jp/*
// ==/UserScript==
(function () {
    var refresher =  function (e) {
        var target = e.target;
        target.disabled = true;
        target.innerHTML  = '更新確認中...';
        var li = target.parentNode;
        var jumpLink = li.getElementsByTagName('a')[0];
        var modified = li.getElementsByClassName('modified')[0];
        var url = jumpLink.href.split('?').slice(1).join('?').slice(0, -14);
        var checkUrl = 'http://a.hatena.ne.jp/check?url=' + encodeURIComponent(url);
        var request = new XMLHttpRequest();
        request.open('GET', checkUrl);
        request.onreadystatechange = function () {
            if (request.readyState != 4) {
            } else if (request.status != 200) {
                target.innerHTML = 'エラー発生';
            } else {
                var div = document.createElement('div');
                div.innerHTML = request.responseText;
                var tableConfig = div.getElementsByClassName('table-config')[0];
                var td = tableConfig.getElementsByTagName('td')[0];
                var isRefresh = td.firstChild.textContent.slice(0, -1);
                target.innerHTML = isRefresh;
                if (isRefresh == '内容が更新されました') {
                    var regex = /更新時刻：((\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}))/;
                    var matched = td.childNodes[2].textContent.match(regex);
                    var diff = li.getElementsByClassName('diff')[0];
                    if (diff) {
                        var diff2 = td.getElementsByClassName('diff')[0];
                        while (diff.childNodes.length > 2) {
                            diff.removeChild(diff.childNodes[2]);
                        }
                        diff.innerHTML = '\n' + diff.innerHTML + '\n' + diff2.innerHTML + '\n';
                        jumpLink.href = 'http://a.hatena.ne.jp/go?' + url + matched.slice(2).join('');
                        modified.innerHTML = matched[1];
                    }
                }
                target.disabled = false;
            }
        };
        request.send(null);
    };
    var button = document.createElement('button');
    with (button.style) {
        border = 'none';
        MozBorderRadius = '4px';
        WebkitBorderRadius = '4px';
        padding = '1px 2px';
        background = '#DDDDDD';
        fontSize = '9pt';
    }
    button.innerHTML = 'Refresh';
    var modifieds = document.getElementsByClassName('modified');
    for (var i = -1, n = modifieds.length; ++i < n; ) {
        var btn = button.cloneNode(true);
        btn.addEventListener('click', refresher, false);
        var li = modifieds[i].parentNode;
        var p = li.getElementsByTagName('p')[0];
        if (p) {
            li.insertBefore(btn, p);
        } else {
            li.appendChild(btn);
        }
    }
})();
