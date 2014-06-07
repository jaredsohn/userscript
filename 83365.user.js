// ==UserScript==
// @name           twitter_check_if_follows_you_on_user_list
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Dim users who doesn't follow you on user list. / Twitterのユーザ一覧で自分をフォローしていないユーザの背景色を暗くします。
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function () {
    if (document.getElementById('follow_grid') == null) {
        return;
    }
    var dim = function (dom) {
        var users = dom.getElementsByClassName('user');
        for (var i = 0; i < users.length; i++) {
            if (users[i].className.split(' ').indexOf('direct-messageable') == -1) {
                users[i].style.backgroundColor = '#EEEEEE';
            }
        }
    }
    dim(document);
    document.addEventListener('AutoPagerize_DOMNodeInserted', function(e) {
        dim(e.target);
    }, false);
})();
