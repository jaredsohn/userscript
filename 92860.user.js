// ==UserScript==
// @name           hatena_antenna_direct_remover
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Add buttons which remove the sites directly on hatena antenna. / はてなアンテナに直接サイトの削除を行うボタンを追加します。
// @include        http://a.hatena.ne.jp/*/*
// ==/UserScript==
(function () {
    function check(e) {
        var target = e.target;
        target.innerHTML  = '本当に削除しますか？';
        e.target.removeEventListener('click', check, false);
        e.target.addEventListener('click', remove, false);
    }
    function remove(e) {
        var target = e.target;
        target.disabled = true;
        target.innerHTML  = '確認中...';
        var links = target.parentNode.getElementsByTagName('a');
        for (var i = -1, link; link = links[++i]; ) {
            if (!link.href.indexOf(location.href.split('/').slice(0, 5).join('/') + 'editpage?cid=')) {
                var url = link.href;
                break;
            }
        }
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onreadystatechange = function () {
            if (request.readyState != 4) {
            } else if (request.status != 200) {
                target.innerHTML = '失敗しました';
                target.disabled = false;
            } else {
                var rsHTML = document.createElement('div');
                rsHTML.innerHTML = request.responseText;
                var pager = rsHTML.getElementsByClassName('pager')[0];
                var post = new XMLHttpRequest();
                post.open('POST', pager.getElementsByTagName('form')[0].action);
                post.onreadystatechange = function () {
                    if (post.readyState != 4) {
                    } else if (post.status != 200) {
                        target.innerHTML = '失敗しました';
                        target.disabled = disableKey = false;
                    } else {
                        var rsHTML = document.createElement('div');
                        rsHTML.innerHTML = post.responseText;
                        var pager = rsHTML.getElementsByClassName('pager')[0];
                        var confirm = new XMLHttpRequest();
                        confirm.open('POST', pager.getElementsByTagName('form')[0].action);
                        confirm.onreadystatechange = function () {
                            if (confirm.readyState != 4) {
                            } else if (confirm.status != 200) {
                                target.innerHTML = '失敗しました';
                                target.disabled = false;
                            } else {
                                target.innerHTML = '削除しました';
                            }
                        }
                        confirm.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        var inputs = pager.getElementsByTagName('input');
                        var data = [];
                        for (var i = -1, input; input = inputs[++i]; ) {
                            if (input.type != 'submit') {
                                data[i] = encodeURIComponent(input.name) + '=' + encodeURIComponent(input.value);
                            }
                        }
                        confirm.send(data.join('&'));
                    }
                };
                post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                var inputs = pager.getElementsByTagName('input');
                var data = [];
                for (var i = -1, input; input = inputs[++i]; ) {
                    data[i] = encodeURIComponent(input.name) + '=' + encodeURIComponent(input.value);
                }
                post.send(data.join('&'));
                target.innerHTML = '削除中...';
            }
        }
        request.send(null);
    }
    var button = document.createElement('button');
    with (button.style) {
        border = 'none';
        margin = '1px 2px';
        MozBorderRadius = '4px';
        WebkitBorderRadius = '4px';
        padding = '1px 2px';
        background = '#DDDDDD';
        fontSize = '9pt';
    }
    button.innerHTML = 'Remove';
    var modifieds = document.getElementsByClassName('modified');
    for (var i = -1, n = modifieds.length; ++i < n; ) {
        var btn = button.cloneNode(true);
        btn.addEventListener('click', check, false);
        var li = modifieds[i].parentNode;
        var p = li.getElementsByTagName('p')[0];
        if (p) {
            li.insertBefore(btn, p);
        } else {
            li.appendChild(btn);
        }
    }
})();
