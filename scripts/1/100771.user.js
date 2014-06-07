// ==UserScript==
// @name           fanfou-reply-to-all
// @namespace      fanfou
// @include        http://fanfou.com/*
// ==/UserScript==

(function() {
    var $i = function(id) { return document.getElementById(id); };
    var $n = function(name) { return document.getElementsByName(name); };
    var processItem = function(item) {
        var $op = item.getElementsByClassName('op')[0];
        if (! $op) return;
        var $reply = $op.getElementsByClassName('reply')[0];
        if (! $reply) return;
        var $content = item.getElementsByClassName('content')[0];
        if (! $content) return;
        var $formers = $content.getElementsByClassName('former');
        if (! $formers.length) return;
        var ffname = $reply.getAttribute('ffname');
        var msg = '@' + ffname + ' ';
        var added_person = { };
        added_person[ffname] = true;
        for (var i = 0; i < $formers.length; ++i) {
            var $former = $formers[i];
            if ($former.href == myurl) continue;
            var name = $former.textContent;
            if (added_person[name]) continue;
            msg += '@' + name + ' ';
            added_person[name] = true;
        }
        var ffid = $reply.getAttribute('ffid');
        $reply.href = '/home?status=' + encodeURIComponent(msg) +
            '&in_reply_to_status_id=' + encodeURIComponent(ffid);
        if (! quick_reply) return;
        $reply.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $textarea.value = msg + $textarea.value;
            $repost.value = '';
            $in_reply.value = ffid;
            window.scrollTo(0, 0);
            $textarea.focus();
            $textarea.setSelectionRange(ffname.length + 2, msg.length);
        }, false);
    };
    var myurl = $i('navigation').getElementsByTagName('li')[1].getElementsByTagName('a')[0].href;
    var $msg = $i('message');
    if ($msg) {
        var $textarea = $msg.getElementsByTagName('textarea')[0];
        var cur_value = $textarea.value;
        if (cur_value && cur_value.charAt(0) == '@') {
            var pos = cur_value.indexOf('@', 1);
            if (pos > 0)
                $textarea.setSelectionRange(pos, cur_value.length);
        }
        var $in_reply = $n('in_reply_to_status_id')[0];
        var $repost = $n('repost_status_id')[0];
    }
    var quick_reply = ($textarea && $in_reply && $repost);
    var $ol = $i('stream').getElementsByTagName('ol')[0];
    $ol.addEventListener('DOMNodeInserted',
        function(e) { processItem(e.target); }, false);
    var $items = $ol.getElementsByTagName('li');
    for (var i = 0; i < $items.length; ++i)
        processItem($items[i]);
})();