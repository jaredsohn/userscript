// ==UserScript==
// @name           expand-replies
// @namespace      fanfou
// @include        http://fanfou.com/*
// @exclude        http://fanfou.com/
// @exclude        http://fanfou.com/login
// @exclude        http://fanfou.com/finder
// @exclude        http://fanfou.com/search
// @exclude        http://fanfou.com/photo/*
// @exclude        http://fanfou.com/album/*
// @exclude        http://fanfou.com/friends/*
// @exclude        http://fanfou.com/settings
// @exclude        http://fanfou.com/settings/*
// @exclude        http://fanfou.com/statuses/*
// @exclude        http://fanfou.com/followers/*
// @exclude        http://fanfou.com/privatemsg
// @exclude        http://fanfou.com/privatemsg/*
// ==/UserScript==

(function() {
    var $t = function(text) { return document.createTextNode(text); };
    var $c = function(tagname) { return document.createElement(tagname); };
    var $style = $c('style');
    $style.innerHTML = 
        '#stream .buffered + li.reply { display: none; }' +
        '#stream li.reply { border-left: 5px solid #ccc; }' +
        '#stream li.reply.last { border-bottom: 5px solid #ccc; }' +
        '#stream li.reply.more {' + 
            'font-size: 90%; height: 1.3em !important; line-height: 1.3em; ' +
            'background: #ccc; color: #fff; text-align: center; padding: 0; ' +
            'width: 100%; min-height: 0; margin-top: -.8em; cursor: pointer; ' +
            'border: none;' +
        '}' +
        '#stream li.reply.more:hover { background: #eee; color: #666; }' +
        '#stream li.reply.waiting {' +
            'height: 17px !important; min-height: 0; margin-top: -10px; ' +
            'background: url("http://static1.fanfou.com/img/ajax.gif") ' +
            'no-repeat scroll 50% 50% #eee; border: none;' +
        '}';
    document.getElementsByTagName('head')[0].appendChild($style);
    var showWaiting = function(e) {
        var $wait = $c('li');
        $wait.className = 'reply waiting';
        $ol.replaceChild($wait, e);
        return $wait;
    };
    var displayReplyList = function(url, before, num) {
        if (num == 0) {
            var $more = $c('li');
            $more.setAttribute('href', url);
            $more.className = 'reply more';
            $more.appendChild($t('继续展开'));
            $ol.insertBefore($more, before);
            $ol.removeChild(before);
            return;
        }
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState != 4) return;
            if (req.status != 200) {
                var $error = $c('li');
                $error.className = 'error';
                $error.appendChild(
                        $t('获取回复时发生错误 ' + req.status));
                $ol.insertBefore($error, before);
                url = '';
                return;
            }
            var content = req.responseText;
            var avatar = /<div id="avatar">(.+?)<\/div>/.exec(content)[1];
            var author_exp = /<h1>(.+?)<\/h1>/g;
            author_exp.lastIndex = content.indexOf('<div id="latest">');
            var author = author_exp.exec(content)[1];
            var content = /<h2>([\s\S]+?)<\/h2>/.exec(content);
            if (! content) {
                content = '<strong>此消息已被删除</strong>';
                spans = '';
            } else {
                content = content[1];
                var stamp_pos = content.indexOf('<span class="stamp">');
                var spans;
                if (stamp_pos == -1) {
                    content = '<strong>用户设置了隐私保护</strong>';
                    spans = '';
                } else {
                    spans = content.substring(stamp_pos);
                    content = content.substring(0, stamp_pos);
                }
            }
            var $li = $c('li');
            $li.setAttribute('expended', 'expended');
            $li.className = 'reply unlight';
            $li.innerHTML = avatar + author +
                '<span class="content">' + content + '</span>' + spans;
            $li.addEventListener('mouseover', function() {
                this.className =
                    this.className.replace(/\bunlight\b/, 'light');
            }, true);
            $li.addEventListener('mouseout', function() {
                this.className =
                    this.className.replace(/\blight\b/, 'unlight');
            }, true);
            var $links = $li.getElementsByTagName('a');
            $links[0].className = 'avatar';
            $links[1].className = 'author';
            var $stamp = $li.getElementsByClassName('stamp')[0];
            if (! $stamp) {
                url = '';
            } else {
                var $reply = $stamp.getElementsByClassName('reply');
                if ($reply.length == 0) {
                    url = '';
                } else {
                    $reply = $reply[0];
                    url = $reply.getElementsByTagName('a')[0].href;
                }
            }
            $ol.insertBefore($li, before);
            if (! url) {
                $li.className += ' last';
                $ol.removeChild(before);
            } else {
                displayReplyList(url, before, num - 1);
            }
        };
        req.open('GET', url, true);
        req.send(null);
    };
    var showExpand = function($item) {
        if ($item.hasAttribute('expended')) return;
        var $stamp = $item.getElementsByClassName('stamp')[0];
        if (! $stamp) return;
        var $reply = $stamp.getElementsByClassName('reply')[0];
        if (! $reply) return;
        $item.setAttribute('expended', 'expended');
        var $expand = $c('li');
        $expand.setAttribute('href',
                $reply.getElementsByTagName('a')[0].href);
        $expand.className = 'reply more';
        $expand.appendChild($t('展开回复'));
        $ol.insertBefore($expand, $item.nextSibling);
    };
    var processItem = function($item) {
        if (! $item.hasAttribute('href')) {
            showExpand($item);
        } else {
            $item.addEventListener('click', function() {
                var $before = showWaiting(this);
                displayReplyList($item.getAttribute('href'), $before, 5);
            }, true);
        }
    };
    var $ol = document.getElementById('stream').getElementsByTagName('ol')[0];
    var $statuses = $ol.getElementsByTagName('li');
    $ol.addEventListener('DOMNodeInserted',
            function(e) { processItem(e.target); }, false);
    for (var i = 0; i < $statuses.length; ++i)
        showExpand($statuses[i]);
})();