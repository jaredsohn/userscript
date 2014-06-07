// ==UserScript==
// @name           twitter_add_links_on_the_sidebar
// @version        2.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Add related services' links on the sidebar on twitter. / Twitterの右側部分に関連サービスのリンクを追加します。
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function (d) {
    /*
     * "service name" : "service url"
     * "{id}" in service names or urls will be replaced with each user's screen_name
     * "サービス名" : "サービスのURL"
     * "{id}"がサービス名やサービスのURLに含まれている場合はそのページのユーザ名に変換します。
     */
    var links = {
        'search @{id}' : 'http://search.twitter.com/search?q=%40{id}&lang=all',
        'Twilog' : 'http://twilog.org/{id}',
        'Favstar.fm' : 'http://ja.favstar.fm/users/{id}/recent',
        'ふぁぼったー': 'http://favotter.net/user/{id}',
        '共通フォロー' : 'http://twtrfrnd.com/phithon/{id}',
        'Togetter' : 'http://www.google.com/search?q=site%3Atogetter.com+{id}&nfpr=1',
        'Twitpic' : 'http://twitpic.com/photos/{id}',
    };
    if (d.getElementById('doc')) {
        function handleSimpleProfile(moreLink) { // サイドバーに出た場合
            var id = moreLink.href.split('/').pop();
            var html = [], h = -1;
            html[++h] = '<ul style="list-style: disc outside none">';
            for (var i in links) {
                html[++h] = '<li style="';
                html[++h] = 'float:left;';
                html[++h] = 'overflow:hidden;';
                html[++h] = 'border-right:1px solid rgba(0, 0, 0, 0.1);';
                html[++h] = 'margin-left:0;';
                html[++h] = 'padding:0 12px;';
                html[++h] = '"><a href="';
                html[++h] = links[i].replace(/{id}/g, id);
                html[++h] = '"><span>';
                html[++h] = i.replace(/{id}/g, id);
                html[++h] = '</span></a></li>';
            }
            html[++h] = '</ul>';
            var div = d.createElement('div');
            div.className = 'component';
            div.innerHTML = html.join('');
            var recentTweets = moreLink.parentNode;
            recentTweets.parentNode.insertBefore(div, recentTweets);
        }
        function handleFullProfile(child, id) { // 直接開いたとき
            var spacer = child.getElementsByClassName('component-spacer')[1];
            var parentComponent = spacer.parentNode;
            if (parentComponent.getElementsByClassName('related-services').length) {
                return;
            }
            parentComponent.insertBefore(spacer.cloneNode(true), spacer);
            var html = [], h = -1;
            html[++h] = '<h2>Related Services</h2><ul class="related-services">';
            for (var k in links) {
                html[++h] = '<li><a href="';
                html[++h] = links[k].replace(/{id}/g, id);
                html[++h] = '"><span>';
                html[++h] = k.replace(/{id}/g, id);
                html[++h] = '</span></a></li>';
            }
            html[++h] = '</ul>';
            var div = d.createElement('div');
            div.className = 'component';
            div.innerHTML = html.join('');
            parentComponent.insertBefore(div, spacer);
        }
        function handleTransitionalProfile(child) { // 遷移して開いたとき
            var id = child.getElementsByClassName('title-link')[0].href.split('/');
            id = id[id.length-2];
            var html = [], h = -1;
            html[++h] = '<h2>Related Services</h2><ul>';
            for (var i in links) {
                html[++h] = '<li><a href="';
                html[++h] = links[i].replace(/{id}/g, id);
                html[++h] = '"><span>';
                html[++h] = i.replace(/{id}/g, id);
                html[++h] = '</span></a></li>';
            }
            html[++h] = '</ul><hr class="component-spacer"/>';
            var div = d.createElement('div');
            div.className = 'component';
            div.innerHTML = html.join('');
            var component = child.parentNode;
            component.parentNode.insertBefore(div, component.nextSibling);
        }
        function handleTransitionalHome(newFollowersActivity) {
            var id = newFollowersActivity.getElementsByClassName('title-link')[0].href.split('/');
            var id = id[id.length-2];
            var dashboard = newFollowersActivity.parentNode.parentNode;
            var html = [], h = -1;
            html[++h] = '<h2>Related Services</h2><ul>';
            for (var i in links) {
                html[++h] = '<li><a href="';
                html[++h] = links[i].replace(/{id}/g, id);
                html[++h] = '"><span>';
                html[++h] = i.replace(/{id}/g, id);
                html[++h] = '</span></a></li>';
            }
            html[++h] = '</ul><hr class="component-spacer"/>';
            var div = d.createElement('div');
            div.className = 'component';
            div.innerHTML = html.join('');
            dashboard.appendChild(div);
        }
        d.addEventListener('DOMNodeInserted', function (e) {
            var target = e.target;
            if (target.tagName != 'DIV') {
                return;
            }
            var childNodes = target.childNodes;
            /*
            unsafeWindow.console.log('parent node: ' + target.className);
            var arr = [];
            for (var i = -1, child; child = childNodes[++i]; ) {
                arr[i] = child.className;
            }
            unsafeWindow.console.log('child nodes: ' + arr.join(', '));
            */
            for (var i = -1, child; child = childNodes[++i]; ) {
                var classNames = child.className;
                if (classNames == undefined) {
                    continue;
                }
                classNames = classNames.split(' ');
                var type = 0;
                for (var j = -1, n = classNames.length; ++j < n; ) {
                    if (classNames[j] == 'dashboard') {
                        type = 1; // Twitterホーム
                    } else if (classNames[j] == 'profile-dashboard') {
                        type = 2; // ユーザのホーム（確定）
                        handleFullProfile(child, d.getElementsByClassName('user-stats-count')[0].href.split('/')[4]);
                        return;
                    } else if (classNames[j] == 'more-link') {
                        handleSimpleProfile(child);
                        return;
                    } else if (classNames[j] == 'following15') {
                        handleTransitionalProfile(child);
                        return;
                    } else if (classNames[j] == 'new-followers-activity') {
                        handleTransitionalHome(child);
                        return;
                    }
                }
                if (type) {
                    handleFullProfile(child, d.getElementsByClassName('latest-tweet')[0].getAttribute('data-screen-name'));
                    break;
                }
            }
        }, false);
    } else {
        var id = d.getElementsByName('page-user-screen_name')[0];
        id = id ? id.content : d.getElementById('me_name').textContent;
        var primaryNav = d.getElementById('primary_nav');
        for (var i in links) {
            var li = d.createElement('li');
            li.innerHTML = ['<a href="'
                            ,links[i].replace(/{id}/g, id)
                            ,'"><span>'
                            ,i.replace(/{id}/g, id)
                            ,'</span></a>'].join('');
            primaryNav.appendChild(li);
        }
    }
})(document);
