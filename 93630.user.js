// ==UserScript==
// @name           favstar_user_tooltip
// @namespace      http://d.hatena.ne.jp/phithon/
// @version        1.0.1
// @description    Add tooltip which link to user related pages on Favstar. / Favstarにユーザの関連ページへリンクするツールチップを追加します。
// @include        http://favstar.fm/*
// @include        http://de.favstar.fm/*
// @include        http://es.favstar.fm/*
// @include        http://ja.favstar.fm/*
// ==/UserScript==
(function () {
    var services = [
        ['Recent', '/users/{id}/recent']
       ,['Twitter', 'http://twitter.com/{id}']
    ];
    var div = document.createElement('div');
    with(div.style) {
        padding = '5px';
        fontSize = '85%';
        fontFamily = 'Helvetica, sans-serif';
        fontWeight = 'bold';
        backgroundColor = '#FFFFFF';
        position = 'absolute';
        display = 'none';
    }
    for (var i = -1, service; service = services[++i]; ) {
        if (i) {
            div.appendChild(document.createElement('br'));
        }
        var a = document.createElement('a');
        a.innerHTML = service[0];
        service.push(a);
        div.appendChild(a);
    }
    document.body.appendChild(div);
    var lastInvoked = null;
    var tweetBottomNodes = document.getElementsByClassName('tweetBottom');
    for (var i = -1, tb; tb = tweetBottomNodes[++i]; ) {
        tb.addEventListener('mouseout', function (e) {
            if (e.target == this) {
                div.style.display = 'none';
                lastInvoked = null;
            }
        }, false);
    }
    function setTooltip(dom) {
        var avatarNodes = document.getElementsByClassName('avatar');
        for (var i = -1, avatar; avatar = avatarNodes[++i]; ) {
            var img = avatar.getElementsByTagName('img')[0];
            img.addEventListener('mouseover', function (e) {
                if (this == lastInvoked) {
                    return;
                }
                lastInvoked = this;
                var screenName = this.alt;
                for (var j = -1, service; service = services[++j]; ) {
                    service[2].href = service[1].replace('{id}', screenName);
                }
                with (div.style) {
                    display = 'block';
                    left = this.offsetLeft + 'px';
                    top = this.offsetTop + this.offsetHeight + 'px';
                }
            }, false);
        }
    }
    setTooltip(document);
    document.addEventListener('DOMNodeInserted', function (e) {
        setTooltip(e.target);
    }, false);
})();
